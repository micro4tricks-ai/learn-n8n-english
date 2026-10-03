/* run.html, inside <iframe sandbox="allow-scripts">: the frame's origin is opaque, so code started here can't read
 * this site's localStorage (progress, sign-in), IndexedDB or the offline cache, and can't call its pages.
 *   run.html#host — makes workers from source text the parent sends: {cmd: 'new'|'post'|'kill', wid, src, module, data};
 *                   every worker message goes back as {wid, data} (or {wid, error}).
 *   run.html#page — shows one HTML document the parent sends ({page: '<!doctype html>…'}), for the HTML/JS examples.
 * Messages are accepted only from the page that holds the frame. */
(function(){
  if(window.parent === window) return;   // opened on its own: nothing to do
  var mode = location.hash.slice(1);
  function up(m){ try{ parent.postMessage(m, '*'); }catch(e){} }
  if(mode === 'page'){
    window.addEventListener('message', function once(e){
      if(e.source !== parent || !e.data || typeof e.data.page !== 'string') return;
      window.removeEventListener('message', once);
      document.open(); document.write(e.data.page); document.close();
    });
    up({ hostReady: true });
    return;
  }
  var W = {};
  window.addEventListener('message', function(e){
    if(e.source !== parent) return;
    var m = e.data || {};
    if(m.cmd === 'new' && typeof m.src === 'string' && !W[m.wid]){
      try{
        // an opaque-origin frame can't start a module worker from a blob: URL, so module workers come from a data: URL
        var w = m.module ? new Worker('data:text/javascript;charset=utf-8,' + encodeURIComponent(m.src), { type: 'module' })
          : new Worker(URL.createObjectURL(new Blob([m.src], { type: 'text/javascript' })));
        W[m.wid] = w;
        w.onmessage = function(ev){ up({ wid: m.wid, data: ev.data }); };
        w.onerror = function(ev){ if(ev.preventDefault) ev.preventDefault(); up({ wid: m.wid, error: ev.message || 'worker error' }); };
      }catch(err){ up({ wid: m.wid, error: String(err && err.message || err) }); }
    }else if(m.cmd === 'post' && W[m.wid]) W[m.wid].postMessage(m.data);
    else if(m.cmd === 'kill' && W[m.wid]){ W[m.wid].terminate(); delete W[m.wid]; }
  });
  up({ hostReady: true });
})();
