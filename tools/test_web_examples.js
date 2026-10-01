// Checks the browser examples of the Python journey:
//   run: 'js'    runs in jsdom (with its `html` page) and must log no error (fetch goes to the real network; skip with --offline)
//   run: 'html'  every inline <script> must parse
//   lang: 'js'   must parse (a snippet shown, not run)
// usage: node tools/test_web_examples.js [--offline]
const fs = require('fs'), path = require('path'), vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');
const acorn = require('acorn');
const ROOT = path.resolve(__dirname, '..'), dir = path.join(ROOT, 'content/python/weeks');
const offline = process.argv.includes('--offline');
const problems = []; let ran = 0, parsed = 0;
const parse = (code, where) => {
  try{ acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowAwaitOutsideFunction: false }); parsed++; }
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
  try{ w.eval(code); }catch(e){ errors.push(e.message); }
  await new Promise(r => setTimeout(r, offline ? 50 : 4000));
  w.close();
  ran++;
  // an example may log a handled error on purpose (console.error in a catch) — those mention "failed:"
  errors.filter(m => !/^failed:/.test(m)).forEach(m => problems.push(where + ': ' + m));
}
(async () => {
  for(const f of fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /^w\d\d\.js$/.test(f)).sort() : []){
    let wk; vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { JOURNEY: { week: w => { wk = w; } } });
    for(const d of wk.days){
      for(const [i, x] of [].concat(d.learn || [], d.code || []).entries()){
        const code = String((x.ex && (x.ex.en || x.ex)) || (x.p && (x.p.en || x.p)) || '');
        const where = 'python/' + f + ' day ' + d.d + ' #' + (i + 1);
        if(x.run === 'js') await runJs(code, x.html, where);
        else if(x.run === 'html') [...code.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m, k) => parse(m[1], where + ' script ' + (k + 1)));
        else if(x.lang === 'js') parse('(async function(){\n' + code + '\n})', where);   // snippets may use return/await at the top (n8n Code node)
      }
    }
  }
  if(problems.length){ console.log(problems.join('\n')); process.exit(1); }
  console.log('web examples OK (' + ran + ' run, ' + parsed + ' parsed)');
})();
