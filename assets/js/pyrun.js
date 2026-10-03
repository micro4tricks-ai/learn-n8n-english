/* Python in the browser (CPython through Pyodide) for the lab and the Python journey.
 * PYRUN.run(code, onStatus, stdin) → Promise<{ok, out, error, timeout, images}>. One module worker keeps Pyodide loaded;
 * packages the code imports that Pyodide ships (sqlite3, pandas, numpy, bs4, matplotlib…) are loaded first (up to 2 min),
 * then the run itself may take 15 s, after which the worker is replaced. `stdin` is the text input() reads, one line per call.
 * Images the code saves in its folder (plt.savefig("chart.png"), an SVG…) come back as images [{name, type, data}]. */
(function(){
  var B = function(ar, en){ return window.SITE ? window.SITE.B(ar, en) : (window.LANG === 'en' ? en : ar); };
  var CDN = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/';

  // Runs inside the worker (its source is copied into the worker as text, so it must not use anything from this file).
  function workerMain(loadPyodide, indexURL){
    var IMG = /\.(png|jpe?g|svg)$/i;
    var ready = loadPyodide({ indexURL: indexURL });
    ready.then(function(){ postMessage({ ready: true }); }, function(err){ postMessage({ ok: false, load: true, error: String(err) }); });
    function stamps(p){ var m = {}; try{ p.FS.readdir('.').forEach(function(f){ if(IMG.test(f)) m[f] = +p.FS.stat(f).mtime; }); }catch(e){} return m; }
    self.onmessage = function(e){
      ready.then(async function(p){
        var out = [], lines = String(e.data.stdin || '').split('\n');
        if(lines.length && lines[lines.length - 1] === '') lines.pop();
        try{
          await p.loadPackagesFromImports(e.data.code, {
            messageCallback: function(m){ if(/^Loading /.test(m)) postMessage({ status: m }); }, errorCallback: function(){}
          });
        }catch(err){}
        postMessage({ started: true });
        var before = stamps(p);
        p.setStdout({ batched: function(s){ out.push(s); } });
        p.setStderr({ batched: function(s){ out.push(s); } });
        p.setStdin({ stdin: function(){ return lines.length ? lines.shift() : undefined; } });
        try{ p.runPython('import os\nos.environ.setdefault("MPLBACKEND", "Agg")'); }catch(err){}
        function images(){
          var after = stamps(p), list = [];
          Object.keys(after).forEach(function(f){
            if(before[f] === after[f]) return;
            list.push({ name: f, type: /svg$/i.test(f) ? 'image/svg+xml' : /png$/i.test(f) ? 'image/png' : 'image/jpeg', data: p.FS.readFile(f) });
          });
          return list.slice(0, 6);
        }
        try{
          p.runPython(e.data.code, { globals: p.toPy({}) });
          postMessage({ ok: true, out: out.join('\n'), images: images() });
        }catch(err){
          var m = String(err && err.message || err);
          var shown = m.split('\n').filter(function(l){ return l && !/^  File "\/lib|^    |_pyodide|pyodide\/|Traceback/.test(l); });
          postMessage({ ok: false, out: out.join('\n'), error: shown.slice(-3).join('\n') || m, images: images() });
        }
      }, function(err){ postMessage({ ok: false, load: true, error: String(err) }); });
    };
  }

  var py = null;
  function worker(){
    // a module worker: Pyodide's current builds load as an ES module
    var src = 'import { loadPyodide } from ' + JSON.stringify(CDN + 'pyodide.mjs') + ';\n(' + workerMain.toString() + ')(loadPyodide, ' + JSON.stringify(CDN) + ');';
    // it lives in the sandboxed runner frame (sandbox.js), away from this site's storage and sign-in
    var w = window.SANDBOX.worker({ src: src, module: true });
    var st = { w: w, ready: false, wait: [], onStatus: null, onStart: null };
    st.readyP = new Promise(function(res, rej){
      w.onmessage = function(e){
        var d = e.data;
        if(d.ready){ st.ready = true; res(); return; }
        if(d.load){ rej(new Error(d.error)); return; }
        if(d.status){ if(st.onStatus) st.onStatus(B('بيحمّل مكتبة: ', 'Loading a library: ') + d.status.replace(/^Loading /, '')); return; }
        if(d.started){ if(st.onStart) st.onStart(); return; }
        var cb = st.wait.shift(); if(cb) cb(d);
      };
      w.onerror = function(e){ rej(new Error(e.message || 'worker')); };
    });
    return st;
  }
  function run(code, onStatus, stdin){
    if(!py) py = worker();
    var mine = py;
    mine.onStatus = onStatus || null;
    if(!mine.ready && onStatus) onStatus(B('بيحمّل Python (حوالي 10 ميجا، أول مرة بس)…', 'Loading Python (about 10 MB, first time only)…'));
    return mine.readyP.then(function(){
      return new Promise(function(resolve){
        var done = false, t = null;
        function arm(ms){
          clearTimeout(t);
          t = setTimeout(function(){
            if(done) return;
            done = true; mine.w.terminate(); if(py === mine) py = null;
            resolve({ ok: false, timeout: true, error: B('الكود أخد أكتر من 15 ثانية ووقفناه (هنحمّل Python تاني في التشغيل الجاي).', 'The code took more than 15 seconds and was stopped (Python reloads on the next run).') });
          }, ms);
        }
        arm(120000);   // loading libraries (pandas is ~20 MB) gets 2 minutes…
        mine.onStart = function(){ if(onStatus) onStatus(B('بيشغّل…', 'Running…')); arm(15000); };   // …the code itself 15 s
        mine.wait.push(function(r){ if(done) return; done = true; clearTimeout(t); resolve(r); });
        mine.w.postMessage({ code: code, stdin: stdin || '' });
      });
    }, function(err){ if(py === mine) py = null; return { ok: false, error: B('مقدرناش نحمّل Python. اتأكد من النت وجرّب تاني.', 'Could not load Python. Check your connection and try again.') + ' (' + err.message + ')' }; });
  }
  window.PYRUN = { run: run, cdn: CDN };
})();
