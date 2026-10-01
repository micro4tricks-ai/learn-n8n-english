// Runs every runnable example of the Python journey (run: 1 in content/python/weeks) with the local Python,
// feeding `stdin` when the example has it. An example that shows an error on purpose is marked err: 1 and must fail.
// The page runs the same code with Pyodide (standard library only), so examples must not need the network or files.
// usage: node tools/test_python_examples.js   (skips with a note when no Python 3.10+ is installed)
const fs = require('fs'), path = require('path'), vm = require('vm'), { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const dir = path.join(ROOT, 'content/python/weeks');
const PY = process.env.PYTHON || ['python', 'python3', 'py'].find(c => { const r = spawnSync(c, ['-c', 'import sys; print(sys.version_info >= (3, 10))'], { encoding: 'utf8' }); return r.stdout && r.stdout.trim() === 'True'; });
if(!PY){ console.log('python examples: skipped (no Python 3.10+ found)'); process.exit(0); }
const problems = []; let n = 0, skipped = 0;
// examples that import a library this Python lacks (pandas, bs4… on a bare CI runner) are skipped, not failed
const have = {};
function importsAvailable(code){
  const mods = [...new Set([...code.matchAll(/^\s*(?:from|import)\s+([A-Za-z_]\w*)/gm)].map(m => m[1]))].filter(m => !(m in have));
  if(mods.length){
    const r = spawnSync(PY, ['-I', '-c', 'import importlib.util, sys; print(" ".join("1" if importlib.util.find_spec(m) else "0" for m in sys.argv[1:]))', ...mods], { encoding: 'utf8' });
    const flags = (r.stdout || '').trim().split(' ');
    mods.forEach((m, i) => { have[m] = flags[i] === '1'; });
  }
  return [...code.matchAll(/^\s*(?:from|import)\s+([A-Za-z_]\w*)/gm)].every(m => have[m[1]]);
}
for(const f of fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /^w\d\d\.js$/.test(f)).sort() : []){
  let wk; vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { JOURNEY: { week: w => { wk = w; } } });
  wk.days.forEach(d => [].concat(d.learn || [], d.code || []).forEach((x, i) => {
    if(x.run !== 1) return;   // 'html' and 'js' examples run in the page's sandboxed frame, not here
    const code = typeof (x.ex || x.p) === 'object' ? (x.ex || x.p).en : (x.ex || x.p);
    if(!importsAvailable(code)){ skipped++; return; }
    // each example runs in its own empty folder (examples may create files, like the page's in-browser file system)
    const cwd = fs.mkdtempSync(path.join(require('os').tmpdir(), 'pyex-'));
    const r = spawnSync(PY, ['-I', '-X', 'utf8', '-c', code], { input: x.stdin || '', encoding: 'utf8', timeout: 20000, cwd });
    fs.rmSync(cwd, { recursive: true, force: true });
    n++;
    const where = 'python/' + f + ' day ' + d.d + ' example ' + (i + 1);
    if(x.err){ if(r.status === 0) problems.push(where + ': expected an error but it ran'); return; }
    if(r.status !== 0) problems.push(where + ':\n' + (r.stderr || r.error || '').toString().trim().split('\n').slice(-3).join('\n'));
  }));
}
if(problems.length){ console.log(problems.join('\n\n')); process.exit(1); }
console.log('python examples OK (' + n + ' run' + (skipped ? ', ' + skipped + ' skipped: library not installed here' : '') + ')');
