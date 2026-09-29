// Runs every lab challenge's solution against its own check, so no challenge ships unsolvable, and
// checks the workflow checker on the samples. JavaScript and expressions run in node, SQL through the
// sql.js package, Python through the local `python` (skipped with a note when it is not installed).
// usage: node tools/test_lab.js
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const secs = [];
const ctx = { SECTIONS: { add: s => secs.push(s) } }; ctx.window = ctx;
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'content/sections/lab.js'), 'utf8'), ctx);
const sec = id => secs.find(s => s.id === id);
let failed = 0;
const fail = m => { failed++; console.log('  FAIL:', m); };
function canon(v){
  if(Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if(v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  return JSON.stringify(v);
}
const ids = new Set();
secs.forEach(s => (s.items || []).forEach(it => { if(ids.has(it.id)) fail('duplicate challenge id ' + it.id); ids.add(it.id); if(!it.t || !it.t.ar || !it.t.en || !it.task || !it.task.ar || !it.task.en) fail(it.id + ': needs t and task in both languages'); }));

// ---- expressions (in their own realm, as in the worker) ----
{
  const realm = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js/lab-expr.js'), 'utf8') + '\nlabExprInstall(this);', realm);
  sec('expr').items.forEach(it => {
    let v;
    const inRealm = () => vm.runInContext('JSON', realm).parse(JSON.stringify(it.input || [{}]));   // as the worker gets it (structured clone)
    try{ v = realm.LAB_EXPR.evaluate(it.solution, inRealm(), 0); }catch(e){ return fail('expr ' + it.id + ': ' + e.message); }
    const got = v && v.toFormat ? v.toString() : JSON.parse(JSON.stringify(v === undefined ? null : v));
    const ok = it.match ? new RegExp(it.match).test(String(got)) : canon(got) === canon(it.expect);
    if(!ok) fail('expr ' + it.id + ': got ' + JSON.stringify(got) + ', expected ' + JSON.stringify(it.expect || it.match));
    if(it.starter && it.starter !== it.solution){
      let s; try{ s = realm.LAB_EXPR.evaluate(it.starter, inRealm(), 0); }catch(e){ s = e; }
      if(!(s instanceof Error) && canon(s) === canon(it.expect)) fail('expr ' + it.id + ': the starter already passes');
    }
  });
  // the extra methods do not leak into node's own String
  if(''.extractDomain) fail('expression helpers leaked into the host realm');
}
// ---- JavaScript ----
sec('js').items.forEach(it => {
  const body = it.solution + '\n;return [' + it.tests.map(t => '(' + t[0] + ')').join(',') + '];';
  let r;
  try{ r = new Function(body)(); }catch(e){ return fail('js ' + it.id + ': ' + e.message); }
  it.tests.forEach((t, i) => { if(canon(r[i]) !== canon(t[1])) fail('js ' + it.id + ' ' + t[0] + ': got ' + JSON.stringify(r[i]) + ', expected ' + JSON.stringify(t[1])); });
  let st; try{ st = new Function('console', it.starter + '\n;return [' + it.tests.map(t => '(' + t[0] + ')').join(',') + '];')({ log(){} }); }catch(e){ st = null; }
  if(st && it.tests.every((t, i) => canon(st[i]) === canon(t[1]))) fail('js ' + it.id + ': the starter already passes');
});
// ---- SQL ----
(async () => {
  const initSqlJs = require('sql.js');
  const SQL = await initSqlJs();
  const s = sec('sql');
  s.items.forEach(it => {
    const db = new SQL.Database();
    db.run(s.schema.join('\n'));
    let r;
    try{ r = db.exec(it.solution); }catch(e){ return fail('sql ' + it.id + ': ' + e.message); }
    const last = r[r.length - 1];
    if(!last || !last.values.length) fail('sql ' + it.id + ': the solution returns no rows');
    db.close();
  });
  // a few known answers, so the data and the solutions agree with the task texts
  const one = q => { const db = new SQL.Database(); db.run(s.schema.join('\n')); const r = db.exec(q); db.close(); return r[r.length - 1].values; };
  const get = id => one(s.items.find(i => i.id === id).solution);
  if(get('s8')[0][0] !== 135 + 60 + 890 + 650 + 410 + 890 + 120) fail('sql s8: revenue ' + get('s8')[0][0]);
  if(JSON.stringify(get('s7')) !== JSON.stringify([['Karim']])) fail('sql s7: ' + JSON.stringify(get('s7')));
  if(get('s2').length !== 3 || get('s2')[0][0] !== 'USB-C Hub Pro') fail('sql s2: ' + JSON.stringify(get('s2')));
  // ---- Python ----
  let pyOk = true;
  try{ cp.execFileSync('python', ['--version'], { stdio: 'pipe' }); }catch(e){ pyOk = false; console.log('  (python not found: Python challenges not checked)'); }
  if(pyOk) sec('py').items.forEach(it => {
    let out;
    try{ out = cp.execFileSync('python', ['-c', it.solution], { encoding: 'utf8', env: Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8' }) }); }
    catch(e){ return fail('py ' + it.id + ': ' + e.message); }
    if(out.replace(/\r\n/g, '\n').trim() !== it.out.trim()) fail('py ' + it.id + ': printed ' + JSON.stringify(out.trim()) + ', expected ' + JSON.stringify(it.out));
  });
  // ---- the workflow checker on the samples ----
  const w = { SITE: { B: (a, b) => b, L: x => typeof x === 'object' ? x.en : x, esc: x => x, inline: x => x, get: () => ({}), setItem(){}, loadScript(){ return Promise.resolve(); } }, SECTIONS: { type(){}, lvl(){ return ''; } } };
  w.window = w;
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/js/lab.js'), 'utf8'), w);
  const samples = sec('workflow').samples;
  samples.forEach(smp => {
    const wf = w.LAB.parseWorkflow(JSON.stringify(smp.json));
    const lint = w.LAB.lint(wf), steps = w.LAB.steps(wf);
    const levels = lint.map(r => r[0]);
    if(smp.id === 'bad'){
      ['bad', 'warn'].forEach(l => { if(!levels.includes(l)) fail('workflow sample «bad» should report ' + l); });
      const text = lint.map(r => r[1].en).join(' ');
      ['Credentials', 'open to anyone', 'not connected', 'pinned data', 'error handling'].forEach(k => { if(text.indexOf(k) === -1) fail('workflow sample «bad»: the check for «' + k + '» is missing'); });
    }else if(levels.includes('bad')) fail('workflow sample ' + smp.id + ' reports a problem: ' + JSON.stringify(lint));
    if(steps.length < 2) fail('workflow sample ' + smp.id + ': ' + steps.length + ' steps');
  });
  // the template answer shape (templates API) is accepted
  const t = w.LAB.parseWorkflow({ workflow: { id: 1, name: 'T', workflow: { nodes: [{ name: 'A', type: 'n8n-nodes-base.manualTrigger', position: [0, 0] }], connections: {} } } });
  if(t.nodes.length !== 1) fail('template JSON not parsed');
  console.log(failed ? failed + ' lab problem(s)' : 'lab OK (' + ids.size + ' challenges, ' + samples.length + ' workflow samples)');
  process.exit(failed ? 1 : 0);
})();
