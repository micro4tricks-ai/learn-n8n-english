// Runs ALL the Python examples of one week (runnable or not; show: 1 marks a display-only snippet such as a file layout,
// lang: 'html'/'css'/'js' a snippet in another language, run: 'html'/'js' a browser example) in order, in one temp folder, with the local Python,
// so examples that build on each other (make sales.xlsx, then read it) can be checked. Shell snippets are skipped.
// usage: node tools/run_week_examples.js 11 [--keep]   (needs the week's third-party packages installed locally)
//        node tools/run_week_examples.js 11 --syntax   only checks that every Python snippet parses (no packages needed)
//        PYTHON=path/to/venv/python node tools/run_week_examples.js 12   runs with another interpreter
const fs = require('fs'), path = require('path'), vm = require('vm'), os = require('os'), { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const n = String(process.argv[2] || '').padStart(2, '0');
let wk; vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'content/python/weeks/w' + n + '.js'), 'utf8'), { JOURNEY: { week: w => { wk = w; } } });
const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'pyweek-'));
const SHELL = /^(\s*(#.*)?\n)*\s*(python|py|pip|uv|cd|mkdir|source|\.venv|git|npm|npx|docker|curl|set|export|\$env|echo|cp|deactivate|playwright|pytest|ruff|mypy|fastapi|uvicorn)\b/;
// optional: SETUP=fixtures.py runs first in the temp folder (to create sample inputs such as product.jpg)
if(process.env.SETUP) spawnSync(process.env.PYTHON || 'python', ['-X', 'utf8', path.resolve(process.env.SETUP)], { cwd, stdio: 'inherit' });
let ok = 0, fail = 0, skip = 0;
wk.days.forEach(d => [].concat(d.learn || [], d.code || []).forEach((x, i) => {
  const code = String(typeof (x.ex || x.p) === 'object' ? (x.ex || x.p).en : (x.ex || x.p) || '');
  const where = 'day ' + d.d + ' #' + (i + 1);
  if(!code || x.show || x.lang || typeof x.run === 'string' || SHELL.test(code) || x.err || /^[A-Za-z_-]+\/\n|├──/.test(code)){ skip++; return; }
  const r = process.argv.includes('--syntax')
    ? spawnSync('python', ['-X', 'utf8', '-c', 'import ast, sys; ast.parse(sys.stdin.read())'], { input: code, encoding: 'utf8' })
    : spawnSync(process.env.PYTHON || 'python', ['-X', 'utf8', '-c', code], { input: x.stdin || '', encoding: 'utf8', timeout: 60000, cwd });
  if(r.status === 0){ ok++; return; }
  fail++;
  console.log('FAIL ' + where + ':\n' + (r.stderr || '').trim().split('\n').slice(-4).join('\n') + '\n');
}));
console.log('week ' + n + ': ' + ok + ' ran, ' + fail + ' failed, ' + skip + ' skipped (shell, errors on purpose, layouts)');
if(!process.argv.includes('--keep')) fs.rmSync(cwd, { recursive: true, force: true }); else console.log('kept', cwd);
process.exit(fail ? 1 : 0);
