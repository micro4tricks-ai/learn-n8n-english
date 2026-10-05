/* SANDBOX: runs the learner's code away from the site, in run.html inside <iframe sandbox="allow-scripts">.
 * That frame has no origin of its own, so the code can't read localStorage (progress, the sign-in session),
 * IndexedDB or the offline cache, even if someone talks a learner into running a hostile snippet.
 *   SANDBOX.worker({src, module}) → a stand-in for `new Worker(…)`: postMessage, terminate, onmessage, onerror.
 *                                   The workers live in one hidden frame (assets/js/runhost.js).
 *   SANDBOX.page(iframe, html)    → shows a whole HTML document in that (already sandboxed) frame. */
(function(){
  var me = document.currentScript, v = me && (me.src.match(/[?&]v=(\w+)/) || [])[1];
  var URL_ = 'run.html' + (v ? '?v=' + v : '');
  function frame(hash){
    var f = document.createElement('iframe');
    f.setAttribute('sandbox', 'allow-scripts');   // never allow-same-origin: that would give the code this site's storage
    f.src = URL_ + '#' + hash;
    return f;
  }
  // one hidden frame for all the workers; it is made the first time code runs
  var host = null;
  function getHost(){
    if(host) return host;
    var f = frame('host'), h = { f: f, seq: 0, cbs: {} };
    f.hidden = true; f.tabIndex = -1; f.title = 'code runner'; f.setAttribute('aria-hidden', 'true');
    h.ready = new Promise(function(res){ h.res = res; });
    window.addEventListener('message', function(e){
      if(e.source !== f.contentWindow) return;
      var d = e.data || {};
      if(d.hostReady){ h.res(); return; }
      if(d.net != null){ if(window.SITE && SITE.netAdd) SITE.netAdd('w' + d.wid, Number(d.net) || 0); return; }   // bytes a worker downloaded
      var cb = d.wid != null && h.cbs[d.wid];
      if(cb) cb(d);
    });
    document.body.appendChild(f);
    host = h;
    return h;
  }
  function worker(opts){
    var h = getHost(), wid = ++h.seq, dead = false;
    var proxy = { onmessage: null, onerror: null };
    function send(m){ h.ready.then(function(){ h.f.contentWindow.postMessage(m, '*'); }); }
    h.cbs[wid] = function(d){
      if(dead) return;
      if('data' in d){ if(proxy.onmessage) proxy.onmessage({ data: d.data }); }
      else if(proxy.onerror) proxy.onerror({ message: d.error, preventDefault: function(){} });
    };
    send({ cmd: 'new', wid: wid, src: String(opts.src), module: !!opts.module });
    proxy.postMessage = function(data){ if(!dead) send({ cmd: 'post', wid: wid, data: data }); };
    proxy.terminate = function(){ if(dead) return; dead = true; delete h.cbs[wid]; send({ cmd: 'kill', wid: wid }); };
    return proxy;
  }
  // an HTML example: the frame loads run.html#page, then gets the document to show
  function page(f, html){
    f.setAttribute('sandbox', 'allow-scripts');
    function onMsg(e){
      if(e.source !== f.contentWindow || !e.data || !e.data.hostReady) return;
      window.removeEventListener('message', onMsg);
      f.contentWindow.postMessage({ page: String(html) }, '*');
    }
    window.addEventListener('message', onMsg);
    f.src = URL_ + '#page';
    return f;
  }
  window.SANDBOX = { worker: worker, page: page, frame: frame };
})();
