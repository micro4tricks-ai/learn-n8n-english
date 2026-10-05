// Runs the «Test yourself on your own n8n» exercises (content/sections/lab.js, type n8nlocal) against a real n8n:
// every solution workflow is imported and published into a throw-away n8n (its own folder and port), then each
// case is POSTed with a browser-like Origin header, so the answers, the CORS headers and the workflow JSON the
// site hands out are all checked. Each starter is imported too (under <path>-start) and must NOT pass yet.
// usage: N8N_BIN=<path to the n8n command> node tools/test_n8n_local.js      (npm run test:n8n)
//        N8N_TEST_PORT=5678 N8N_KEEP=1 … keeps it running afterwards, to try the lab page against it
// Not part of npm test: it needs n8n installed (npm i n8n in any folder) and takes a minute.
const fs = require('fs'), path = require('path'), os = require('os'), vm = require('vm'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const BIN = process.env.N8N_BIN || 'n8n';
const PORT = Number(process.env.N8N_TEST_PORT || 5699);
const ORIGIN = 'https://micro4tricks-ai.github.io';

const secs = [];
const ctx = { SECTIONS: { add: s => secs.push(s) } }; ctx.window = ctx;
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'content/sections/lab.js'), 'utf8'), ctx);
const sec = secs.find(s => s.type === 'n8nlocal');
const w = { SITE: { B: (a, b) => b, L: x => typeof x === 'object' ? x.en : x, esc: x => x, inline: x => x, get: () => ({}), setItem(){}, loadScript(){ return Promise.resolve(); } }, SECTIONS: { type(){}, lvl(){ return ''; } } };
w.window = w;
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/js/lab.js'), 'utf8'), w);
const LAB = w.LAB;

let failed = 0;
const fail = m => { failed++; console.log('  FAIL:', m); };
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'n8n-test-'));
const wfDir = path.join(dir, 'workflows');
fs.mkdirSync(wfDir);
const env = Object.assign({}, process.env, {
  N8N_USER_FOLDER: dir, N8N_PORT: String(PORT), N8N_DIAGNOSTICS_ENABLED: 'false', N8N_VERSION_NOTIFICATIONS_ENABLED: 'false',
  N8N_PERSONALIZATION_ENABLED: 'false', N8N_SECURE_COOKIE: 'false', N8N_LOG_LEVEL: 'warn', GENERIC_TIMEZONE: 'UTC'
});
const run = args => cp.execSync('"' + BIN + '" ' + args, { env, stdio: 'pipe', encoding: 'utf8', shell: true });

// ---- the workflows: solutions under their path, starters under <path>-start ----
const ids = [];
sec.items.forEach((ex, i) => {
  if(!ex.path || !/^[a-z0-9-]+$/.test(ex.path)) fail(ex.id + ': bad path');
  ex.cases.forEach(c => { if(!c[0] || !c[1] || !Object.keys(c[1]).length) fail(ex.id + ': a case needs a body and expected fields'); });
  [['sol', ex.path], ['start', ex.path + '-start']].forEach(([which, p], k) => {
    const wf = LAB.exWorkflow(Object.assign({}, ex, { path: p }), which);
    // the JSON the site copies must survive the viewer's own parser and checks
    LAB.parseWorkflow(JSON.stringify(wf));
    const id = ('rehlaTest' + String(i * 2 + k).padStart(7, '0')).slice(0, 16);
    ids.push(id);
    fs.writeFileSync(path.join(wfDir, id + '.json'), JSON.stringify(Object.assign({ id, active: false }, wf)));
  });
});

(async () => {
  try{
    run('import:workflow --separate --input="' + wfDir + '"');
    ids.forEach(id => run('publish:workflow --id=' + id));
  }catch(e){
    console.log((e.stdout || '') + (e.stderr || '') || e.message);
    console.log('n8n CLI failed (set N8N_BIN to the n8n command)');
    process.exit(1);
  }
  const srv = cp.spawn('"' + BIN + '" start', { env, shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
  let log = '';
  srv.stdout.on('data', d => { log += d; }); srv.stderr.on('data', d => { log += d; });
  const base = 'http://localhost:' + PORT;
  const stop = () => { try{ if(process.platform === 'win32') cp.execSync('taskkill /pid ' + srv.pid + ' /T /F', { stdio: 'ignore' }); else srv.kill('SIGTERM'); }catch(e){} };
  try{
    let up = false;
    for(let t = 0; t < 120 && !up; t++){
      // /healthz answers while n8n is still starting; readiness waits for the database and the webhooks
      // and the webhook routes come last: until then Express answers «Cannot POST»
      try{
        up = (await fetch(base + '/healthz/readiness')).ok &&
          !/Cannot POST/.test(await (await fetch(base + '/webhook/' + sec.items[0].path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sec.items[0].cases[0][0]) })).text());
      }catch(e){}
      if(!up) await new Promise(r => setTimeout(r, 1000));
    }
    if(!up){ console.log(log.slice(-3000)); throw new Error('n8n did not start'); }
    // a preflight from the site's origin, as a browser sends before a JSON POST
    const pre = await fetch(base + '/webhook/' + sec.items[0].path, { method: 'OPTIONS', headers: { Origin: ORIGIN, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' } });
    if(pre.headers.get('access-control-allow-origin') !== ORIGIN) fail('preflight: Access-Control-Allow-Origin is ' + pre.headers.get('access-control-allow-origin'));
    if(!/content-type/i.test(pre.headers.get('access-control-allow-headers') || '')) fail('preflight: content-type not allowed');
    const post = async (p, body) => {
      const r = await fetch(base + '/webhook/' + p, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: ORIGIN }, body: JSON.stringify(body) });
      const txt = await r.text();
      let data = txt; try{ data = JSON.parse(txt); }catch(e){}
      return { r, data };
    };
    for(const ex of sec.items){
      for(const [i, c] of ex.cases.entries()){
        const { r, data } = await post(ex.path, c[0]);
        if(r.headers.get('access-control-allow-origin') !== ORIGIN) fail(ex.id + ' #' + (i + 1) + ': no CORS header on the answer');
        if(!r.ok || !LAB.answerOk(data, c[1])) fail(ex.id + ' #' + (i + 1) + ': HTTP ' + r.status + ' ' + JSON.stringify(data) + ', expected ' + JSON.stringify(c[1]));
      }
      let all = true;
      for(const c of ex.cases){ const { r, data } = await post(ex.path + '-start', c[0]); if(!r.ok || !LAB.answerOk(data, c[1])) all = false; }
      if(all) fail(ex.id + ': the starter already passes every case');
    }
    if(failed && process.env.N8N_TEST_LOG) console.log(log.slice(-4000));
    console.log(failed ? failed + ' n8n exercise problem(s)' : 'n8n exercises OK (' + sec.items.length + ' exercises, ' + sec.items.reduce((n, e) => n + e.cases.length, 0) + ' cases on a real n8n)');
  }catch(e){ failed++; console.log(e.message); }
  finally{
    // N8N_KEEP=1 leaves this n8n running (with the solutions published) to try the lab page against it
    if(process.env.N8N_KEEP){ console.log('n8n kept running on ' + base + ' (Ctrl+C to stop)'); return; }
    stop();
    setTimeout(() => { try{ fs.rmSync(dir, { recursive: true, force: true }); }catch(e){} process.exit(failed ? 1 : 0); }, 1500);
  }
})();
