// Checks the JavaScript examples of the Python and JavaScript journeys:
//   run: 'js'    runs in jsdom (with its `html` page) and must log no error (fetch goes to the real network; skip with --offline)
//   run: 'html'  every inline <script> must parse
//   node: 1      a Node.js script: runs with this Node in a fresh temp folder (as an ES module) and must exit 0;
//                `files: {name: text}` are written there first; `net: 1` examples are skipped with --offline; `err: 1` must fail
//   lang: 'js'   must parse (a snippet shown, not run)
//   lang: 'ts'   TypeScript, shown only (not checked here)
// usage: node tools/test_web_examples.js [--offline]
const fs = require('fs'), path = require('path'), vm = require('vm'), os = require('os');
const { spawnSync } = require('child_process');
const { JSDOM, VirtualConsole } = require('jsdom');
const acorn = require('acorn');
const ROOT = path.resolve(__dirname, '..');
const offline = process.argv.includes('--offline');
const problems = []; let ran = 0, parsed = 0, noded = 0, skipped = 0;
const parse = (code, where, module) => {
  try{ acorn.parse(code, { ecmaVersion: 'latest', sourceType: module ? 'module' : 'script', allowAwaitOutsideFunction: false }); parsed++; }
  catch(e){ problems.push(where + ': ' + e.message); }
};
async function runJs(code, html, where){
  const errors = [], vc = new VirtualConsole();
  vc.on('error', (...a) => errors.push(a.join(' ')));
  vc.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM('<!doctype html><body>' + (html || '') + '</body>', { runScripts: 'outside-only', virtualConsole: vc, url: 'https://example.org/' });
  const w = dom.window;
  if(typeof fetch === 'function') w.fetch = offline ? () => Promise.reject(new Error('offline')) : fetch;
  w.alert = () => {};
  if(!w.structuredClone) w.structuredClone = v => structuredClone(v);   // real browsers have it; jsdom does not
  try{ w.eval(code); }catch(e){ errors.push(e.message); }
  await new Promise(r => setTimeout(r, offline ? 50 : 4000));
  w.close();
  ran++;
  // an example may log a handled error on purpose (console.error in a catch) — those mention "failed:"
  errors.filter(m => !/^failed:/.test(m)).forEach(m => problems.push(where + ': ' + m));
}
function runNode(code, x, where){
  if(x.net && offline){ skipped++; return; }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsex-'));
  try{
    Object.entries(x.files || {}).forEach(([name, text]) => { fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true }); fs.writeFileSync(path.join(dir, name), text); });
    fs.writeFileSync(path.join(dir, 'main.mjs'), code);
    const r = spawnSync(process.execPath, ['main.mjs'].concat(x.args || []), { cwd: dir, encoding: 'utf8', timeout: 20000, input: x.stdin || '' });
    noded++;
    const failed = r.status !== 0 || r.error;
    if(failed && !x.err) problems.push(where + ' (node): ' + ((r.stderr || String(r.error || '')).trim().split('\n').slice(-3).join(' | ')));
    if(!failed && x.err) problems.push(where + ' (node): marked err but ran fine');
  }finally{ fs.rmSync(dir, { recursive: true, force: true }); }
}
(async () => {
  for(const track of ['python', 'js']){
    const dir = path.join(ROOT, 'content', track, 'weeks');
    for(const f of fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /^w\d\d\.js$/.test(f)).sort() : []){
      let wk; vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { JOURNEY: { week: w => { wk = w; } } });
      for(const d of wk.days){
        for(const [i, x] of [].concat(d.learn || [], d.code || []).entries()){
          const code = String((x.ex && (x.ex.en || x.ex)) || (x.p && (x.p.en || x.p)) || '');
          const where = track + '/' + f + ' day ' + d.d + ' #' + (i + 1);
          if(x.run === 'js') await runJs(code, x.html, where);
          else if(x.run === 'html') [...code.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m, k) => parse(m[1], where + ' script ' + (k + 1)));
          else if(x.node) runNode(code, x, where);
          else if(x.lang === 'js') parse('(async function(){\n' + code + '\n})', where);   // snippets may use return/await at the top (n8n Code node)
        }
      }
    }
  }
  if(problems.length){ console.log(problems.join('\n')); process.exit(1); }
  console.log('web examples OK (' + ran + ' run in jsdom, ' + noded + ' run in Node, ' + parsed + ' parsed' + (skipped ? ', ' + skipped + ' need the network' : '') + ')');
})();
