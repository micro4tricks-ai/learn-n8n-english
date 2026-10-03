// Security check in a real Chrome: puts HTML/JS payloads everywhere data comes from outside the code
// (saved stores and journey progress — what a synced account or an imported backup can hold —, the URL hash,
// the site search, pasted workflow JSON, and the answers of the n8n template API) and fails if any of it runs
// or turns into live markup. Needs Google Chrome; no internet (remote requests are answered locally or blocked).
// usage: node tools/xss_fuzz.js
const { chromium } = require('playwright-core');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/json', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0].replace(/\/$/, '/index.html')));
  if(!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});

// every payload marks window.__xss when it runs; the markup ones also leave a [data-xss] element if parsed
const P = '"\'><img src=x data-xss onerror="window.__xss=(window.__xss||[]).concat(1)"><svg data-xss onload="window.__xss=(window.__xss||[]).concat(2)"></svg>';
const PJ = 'javascript:window.__xss=(window.__xss||[]).concat(3)';
const PAGES = ['index', 'n8n', 'english', 'python', 'review', 'lab', 'speak', 'prompts', 'sheets'];

function evilItem(i){
  return { id: P + i, t: P, m: P, ex: P, q: P, a: 0, o: [P, P, P], why: P, from: { ar: P, en: P }, tr: 'n8n', text: P + ' {{' + P + '}}',
    tags: [P], v: [{ text: P, at: 1 }], name: P, n: 2, at: Date.now(), score: 50, word: P, said: P, heard: P, code: P, url: PJ, h: P, p: P,
    due: Date.now() - 1000, state: 2, stability: 1, difficulty: 5, reps: 1, lapses: 0, last_review: Date.now() - 86400000, on: 1 };
}
function seed(){
  const ls = {};
  ['srs', 'mistakes', 'lab', 'prompts', 'fav', 'speak', 'done'].forEach(k => {
    const m = {};
    for(let i = 0; i < 3; i++) m[(i === 0 ? 'n:webhook' : k + ':' + P + i)] = evilItem(i);
    ls['site_' + k] = JSON.stringify(m);
  });
  ls.site_activity = JSON.stringify({ [P]: P, '2026-10-01': 3 });
  const prog = { v: 1, done: { [P]: 1, w01d1: 1 }, quiz: { [P]: [0, 1] }, notes: { [P]: P },
    tests: { 'w01-test': [{ score: 9, total: 10, at: Date.now(), answers: [P] }], [P]: [{ score: P, total: P, at: P, answers: [P] }] }, last: P };
  ['n8n', 'english', 'python'].forEach(t => { ls['journey_' + t + '_v1'] = JSON.stringify(prog); });
  ls.site_review_prefs = JSON.stringify({ decks: { [P]: true }, perDay: P });
  return ls;
}
const EVIL_WF = {
  name: P, nodes: [
    { id: '1', name: P, type: 'n8n-nodes-base.webhook' + P, typeVersion: P, position: ['0" onmouseover="window.__xss=1" x="', P], parameters: { path: P, authentication: P }, credentials: { [P]: { name: P } } },
    { id: '2', name: 'B' + P, type: 'n8n-nodes-base.stickyNote', position: [P, 300], parameters: { content: P, width: '1" onload="window.__xss=1', height: P } },
    { id: '3', name: '[x](javascript:alert(1)) **' + P + '**', type: 'n8n-nodes-base.if', position: [300, 0], parameters: { password: P } }
  ],
  connections: { [P]: { main: [[{ node: 'B' + P, type: 'main', index: 0 }], [{ node: P + 'missing', type: 'main', index: 0 }]], [P]: [[{ node: P }]] } },
  pinData: { [P]: [P] }, settings: { errorWorkflow: P }
};

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
  const problems = [], errors = [];
  // remote calls: the template API answers with payloads; everything else remote is blocked (no CDN needed here)
  await ctx.route(/^https?:\/\//, route => {
    const u = route.request().url();
    if(u.startsWith(BASE)) return route.continue();
    if(/api\.n8n\.io\/templates\/search/.test(u)) return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ totalWorkflows: 1, workflows: [{ id: '1" data-xss onclick="window.__xss=1', name: P, totalViews: P, price: 0, nodes: [{ displayName: P, name: P }] }] }) });
    if(/api\.n8n\.io\/templates\/workflows\//.test(u)) return route.fulfill({ contentType: 'application/json', body: JSON.stringify({ workflow: EVIL_WF }) });
    return route.abort();
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(page.url().replace(BASE, '') + ': ' + e.message));
  page.on('dialog', d => { problems.push('dialog opened on ' + page.url() + ': ' + d.message()); d.dismiss(); });
  const ls = seed();
  await page.addInitScript(data => {
    try{ if(!sessionStorage.getItem('fz')){ Object.keys(data).forEach(k => localStorage.setItem(k, data[k])); sessionStorage.setItem('fz', '1'); } }catch(e){}
  }, ls);

  async function check(where){
    await page.waitForTimeout(250);
    const r = await page.evaluate(() => ({ ran: window.__xss || null, nodes: document.querySelectorAll('[data-xss]').length,
      js: [...document.querySelectorAll('a[href^="javascript:" i], [href^="javascript:" i], [src^="javascript:" i]')].length,
      handlers: [...document.querySelectorAll('*')].filter(e => [...e.attributes].some(a => /^on/i.test(a.name) && /__xss/.test(a.value))).length }));
    if(r.ran || r.nodes || r.js || r.handlers) problems.push(where + ': ' + JSON.stringify(r));
    await page.evaluate(() => { window.__xss = null; document.querySelectorAll('[data-xss]').forEach(e => e.remove()); });
  }
  async function hover(){
    // mouse over and focus everything clickable-looking, so handlers that need an event get one
    await page.evaluate(() => document.querySelectorAll('*').forEach(e => { ['mouseover', 'focus', 'click'].forEach(t => { if(t === 'click' && !e.closest('.wf-svg, .tpl-grid')) return; try{ e.dispatchEvent(new Event(t, { bubbles: false })); }catch(x){} }); }));
  }

  for(const p of PAGES){
    for(const lang of ['ar', 'en']){
      await page.goto(BASE + p + '.html');
      await page.evaluate(l => localStorage.setItem('site_lang', l), lang);
      await page.reload();
      await page.waitForTimeout(700);
      await check(p + ' ' + lang + ' load');
      const ids = await page.evaluate(() => [...document.querySelectorAll('main section[id], section[id]')].map(s => s.id));
      for(const id of ids){
        await page.evaluate(h => { location.hash = h; }, '#' + id);
        await page.waitForTimeout(150);
        await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));
        await check(p + ' ' + lang + ' #' + id);
      }
      // hash payloads
      for(const h of ['#' + encodeURIComponent(P), '#terms?q=' + encodeURIComponent(P), '#journey?w=' + encodeURIComponent(P) + '&d=' + encodeURIComponent(P), '#journey?w=1&d=' + encodeURIComponent(P), '#x?%E0%A4%A=1', '#library?q=' + encodeURIComponent(P)]){
        await page.evaluate(x => { location.hash = x; }, h);
        await page.waitForTimeout(150);
        await check(p + ' ' + lang + ' hash ' + h.slice(0, 20));
      }
    }
  }
  // site search with a payload
  await page.goto(BASE + 'n8n.html');
  await page.keyboard.press('Control+k');
  await page.waitForTimeout(500);
  const q = await page.$('#siteQ');
  if(q){ await q.fill(P); await page.waitForTimeout(400); await check('site search'); } else problems.push('site search did not open');
  await page.keyboard.press('Escape');

  // lab: pasted workflow and the template API
  await page.goto(BASE + 'lab.html');
  await page.waitForTimeout(700);
  await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));
  const ta = await page.$('.wf-paste textarea');
  await ta.fill(JSON.stringify(EVIL_WF));
  await page.click('[data-show]');
  await page.waitForTimeout(300);
  await hover();
  const node = await page.$('.wf-node');
  if(node){ await node.click(); }
  await check('lab pasted workflow');
  const tq = await page.$('.tpl-form input');
  await tq.fill('x'); await page.click('.tpl-form button[type="submit"]');
  await page.waitForTimeout(500);
  await hover();
  await check('lab template search');
  const open = await page.$('[data-open]');
  if(open){ await open.click(); await page.waitForTimeout(500); await hover(); await check('lab template opened'); }

  // the code runners are isolated: a learner's code can't reach this site's storage, offline cache or page
  const iso = await page.evaluate(() => new Promise(res => {
    const out = {};
    const probe = 'var r = {};\n' +
      'try{ r.idb = typeof indexedDB !== "undefined" && !!indexedDB.open("x") ? "open" : "none"; }catch(e){ r.idb = "blocked"; }\n' +
      'Promise.resolve().then(function(){ return caches.keys(); }).then(function(k){ r.caches = "read " + k.length; }, function(){ r.caches = "blocked"; })\n' +
      '.then(function(){ return fetch(' + JSON.stringify(location.origin + '/sw.js') + ').then(function(x){ return x.text(); }).then(function(t){ r.fetch = t.length ? "read" : "empty"; }, function(){ r.fetch = "blocked"; }); })\n' +
      '.then(function(){ postMessage(r); });';
    const w = SANDBOX.worker({ src: probe });
    w.onmessage = e => { out.worker = e.data; w.terminate(); next(); };
    w.onerror = e => { out.worker = 'error ' + e.message; next(); };
    function next(){
      const f = document.createElement('iframe'); document.body.appendChild(f);
      window.addEventListener('message', function on(e){
        if(e.source !== f.contentWindow || !e.data || !e.data.iso) return;
        window.removeEventListener('message', on); out.page = e.data.iso; f.remove(); res(out);
      });
      SANDBOX.page(f, '<script>var r = {};try{ localStorage.getItem("journey-auth"); r.ls = "read"; }catch(e){ r.ls = "blocked"; }' +
        'try{ r.parent = parent.document ? "read" : "none"; }catch(e){ r.parent = "blocked"; }try{ document.cookie; r.cookie = "read"; }catch(e){ r.cookie = "blocked"; }' +
        'parent.postMessage({ iso: r }, "*");<\/script>');
    }
    setTimeout(() => res(out), 20000);
  }));
  const isoOk = iso.worker && iso.worker.idb !== 'open' && iso.worker.caches === 'blocked' && iso.page && iso.page.ls === 'blocked' && iso.page.parent === 'blocked' && iso.page.cookie === 'blocked';
  if(!isoOk) problems.push('code runner is not isolated: ' + JSON.stringify(iso));
  else console.log('runner isolation OK: ' + JSON.stringify(iso));

  // review: rate cards and go through the mistakes
  await page.goto(BASE + 'review.html#today');
  await page.waitForTimeout(700);
  for(let i = 0; i < 4; i++){ const b = await page.$('#today [data-show]'); if(!b) break; await b.click(); await page.waitForTimeout(120); const r = await page.$('#today [data-rate]'); if(r) await r.click(); await page.waitForTimeout(120); }
  await check('review session');

  console.log(problems.length ? 'XSS FUZZ FAIL\n' + problems.join('\n') : 'xss fuzz OK: no payload ran or became markup (' + PAGES.length + ' pages × 2 languages, stores, hash, search, lab, template API)');
  if(errors.length) console.log('page errors with hostile data (' + errors.length + '):\n' + [...new Set(errors)].slice(0, 25).join('\n'));
  await browser.close(); server.close();
  process.exit(problems.length ? 1 : 0);
})().catch(e => { console.error('fuzz crashed:', e); process.exit(1); });
