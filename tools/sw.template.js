/* The offline app. Pages are network-first (fresh when online, cached copy when offline); versioned
 * assets (?v=…) are cache-first since a new release changes their URL. Only this site's own files are
 * cached: accounts (Supabase), CDNs and other sites always go to the network. */
var VERSION = '__VERSION__';
var CACHE = 'site-' + VERSION;
var FILES = __FILES__;   // the shared shell, kept on install
var LAZY = __LAZY__;     // page data and scripts: kept when used, or all at once on «Download for offline»

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return /^site-/.test(k) && k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
function put(req, res){
  if(res && res.ok && res.type === 'basic'){ var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
  return res;
}
self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  var url = new URL(req.url);
  if(url.origin !== self.location.origin) return;
  if(req.mode === 'navigate' || /\.html$|\/$/.test(url.pathname)){
    e.respondWith(fetch(req).then(function(res){ return put(req, res); }).catch(function(){
      return caches.match(req, { ignoreSearch: true }).then(function(r){ return r || caches.match('index.html'); });
    }));
    return;
  }
  e.respondWith(caches.match(req).then(function(hit){
    return hit || fetch(req).then(function(res){ return put(req, res); });
  }));
});
// the review page asks for the whole site to be kept offline: every page's files plus the week files it sends
self.addEventListener('message', function(e){
  if(!e.data || e.data.type !== 'cache-all' || !e.data.urls) return;
  // only this site's own files (relative paths), never another origin
  var asked = [].concat(e.data.urls).filter(function(u){ return typeof u === 'string' && /^[\w-]+(\/[\w.-]+)*(\?v=\w+)?$/.test(u); });
  var urls = LAZY.concat(asked), done = 0, port = e.ports && e.ports[0];
  caches.open(CACHE).then(function(c){
    return Promise.all(urls.map(function(u){
      return c.match(u).then(function(hit){ return hit || c.add(u); }).catch(function(){}).then(function(){ done++; if(port) port.postMessage({ done: done, total: urls.length }); });
    }));
  }).then(function(){ if(port) port.postMessage({ done: urls.length, total: urls.length, end: true }); });
});
