// Renders the pages built from sections (review, lab, speak, prompts, sheets) and the search in Arabic
// and English with jsdom, loading the site's own files (anything remote is skipped), then exercises
// each page's main interactions. Reports script errors and Arabic left on the English pages.
// usage: node tools/smoke_pages.js
const fs = require('fs'), path = require('path');
const { JSDOM, VirtualConsole, requestInterceptor } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');
const AR = /[؀-ۿ]/;

const BASE = 'https://site.test/';
// the site's own files come from disk; anything else (fonts, CDNs, accounts) gets an empty answer
const local = requestInterceptor(request => {
  const u = new URL(request.url);
  if(u.origin + '/' !== BASE) return new Response('', { status: 200 });
  const f = path.join(ROOT, decodeURIComponent(u.pathname));
  if(!fs.existsSync(f)) return new Response('not found', { status: 404 });
  const type = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'application/octet-stream';
  return new Response(fs.readFileSync(f), { headers: { 'Content-Type': type } });
});
function open(file, lang, before){
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, file), 'utf8'), {
    url: BASE + file, runScripts: 'dangerously', resources: { interceptors: [local] }, pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w){
      w.localStorage.setItem('site_lang', lang);
      w.IntersectionObserver = class { observe(){} };
      w.HTMLElement.prototype.scrollIntoView = function(){};
      w.HTMLDialogElement.prototype.showModal = function(){ this.setAttribute('open', ''); };
      w.HTMLDialogElement.prototype.close = function(){ this.removeAttribute('open'); };
      w.print = function(){};
      w.addEventListener('error', e => errors.push(e.message));
      if(before) before(w);
    }
  });
  return Promise.resolve(dom).then(dom => new Promise(r => dom.window.addEventListener('load', () => setTimeout(() => r({ dom, w: dom.window, doc: dom.window.document, errors }), 50))));
}
const wait = ms => new Promise(r => setTimeout(r, ms));
let failed = false;
function check(ok, what){ if(!ok){ failed = true; console.log('  FAIL:', what); } }
function arabicLeft(doc, w, skip){
  const left = new Set(), walker = doc.createTreeWalker(doc.body, w.NodeFilter.SHOW_TEXT);
  let t;
  while((t = walker.nextNode())) if(AR.test(t.nodeValue) && !t.parentElement.closest('script,[data-lang-toggle],pre,code' + (skip ? ',' + skip : ''))) left.add(t.nodeValue.trim().slice(0, 70));
  return [...left];
}
const pages = JSON.parse(JSON.stringify((() => { const c = {}; c.window = c; require('vm').runInNewContext(fs.readFileSync(path.join(ROOT, 'content/pages.js'), 'utf8'), c); return c.SITE_PAGES; })()));

// page-specific checks, run once per language
const checks = {
  async review({ doc, w }, where){
    await wait(100);
    check(doc.querySelectorAll('main#page > section').length === 4, where + ': 4 sections');
    const show = doc.querySelector('#today [data-show]');
    check(show, where + ': a review card with «show answer»');
    if(!show) return;
    show.click();
    const rates = doc.querySelectorAll('#today [data-rate]');
    check(rates.length === 4, where + ': 4 rating buttons');
    rates[2].click();
    check(Object.keys(JSON.parse(w.localStorage.getItem('site_srs') || '{}')).length === 1, where + ': a rating is saved in the srs store');
    // a mistake answered right twice leaves the notebook
    w.SITE.mistake('n8n', 'n8n:w01d1q0', { q: { ar: 'س', en: 'Q' }, o: [{ ar: 'أ', en: 'A' }, { ar: 'ب', en: 'B' }], a: 1, why: { ar: 'لأن', en: 'Because' } }, 0, { ar: 'الأسبوع 1', en: 'Week 1' });
    doc.querySelector('#mistakes [data-tab="all"]').click();
    for(let i = 0; i < 2; i++){
      const opt = doc.querySelector('#mistakes .q-opt[data-o="1"]');
      check(opt, where + ': the mistake is asked (' + (i + 1) + ')');
      if(!opt) return;
      opt.click();
      const nx = doc.querySelector('#mistakes [data-next]'); if(nx) nx.click();
    }
    check(w.SITE.items('mistakes').length === 0, where + ': two right answers clear the mistake');
    check(doc.querySelector('#stats svg.heat') && doc.querySelectorAll('#stats svg.bars').length === 2, where + ': heatmap and two score charts');
    check(doc.querySelector('#backup [data-export]'), where + ': backup button');
  },
  async lab({ doc }, where){
    check(doc.querySelectorAll('main#page > section').length >= 5, where + ': lab sections');
    const sample = doc.querySelector('#workflow [data-sample]');
    check(sample, where + ': workflow samples');
    if(sample){ sample.click(); await wait(20); }
    check(doc.querySelectorAll('#workflow svg .wf-node').length >= 2, where + ': a sample workflow is drawn');
    check(doc.querySelector('#workflow .wf-lint li'), where + ': the checker lists findings');
    check(doc.querySelector('#js [data-run]'), where + ': JavaScript playground');
  },
  async speak({ doc }, where){
    check(doc.querySelectorAll('main#page > section').length >= 4, where + ': speak sections');
    check(doc.querySelector('#dictation [data-check]'), where + ': dictation check button');
    const inp = doc.querySelector('#dictation textarea');
    if(inp){ inp.value = 'hello'; doc.querySelector('#dictation [data-check]').click(); check(doc.querySelector('#dictation .diff'), where + ': dictation shows a diff'); }
    check(doc.querySelectorAll('#situations details.lesson').length >= 8, where + ': work situations');
  },
  async prompts({ doc, w }, where){
    const cards = doc.querySelectorAll('#library .md-card');
    check(cards.length >= 30, where + ': prompt library (' + cards.length + ')');
    const v = doc.querySelector('#library [data-var]');
    check(v, where + ': a prompt with variables');
    if(v){
      v.value = 'ZZTEST'; v.dispatchEvent(new w.Event('input', { bubbles: true }));
      check(v.closest('.md-card').querySelector('.md-code').textContent.indexOf('ZZTEST') !== -1, where + ': typing fills the prompt');
    }
    const search = doc.querySelector('#library input[type="search"]');
    search.value = 'zzzz-nothing'; search.dispatchEvent(new w.Event('input', { bubbles: true }));
    check(doc.querySelectorAll('#library .md-card').length === 0, where + ': search filters the cards');
    check(doc.querySelectorAll('#course details.lesson').length >= 8, where + ': prompt course lessons');
    const add = doc.querySelector('#mine [data-new]');
    check(add, where + ': «new prompt» button');
    if(add){
      add.click();
      doc.querySelector('#mine [name="t"]').value = 'My test';
      doc.querySelector('#mine [name="text"]').value = 'Hello {{name}}';
      doc.querySelector('#mine form').dispatchEvent(new w.Event('submit', { cancelable: true, bubbles: true }));
      check(w.SITE.items('prompts').length === 1, where + ': a saved prompt');
      check(doc.querySelector('#mine [data-var="name"]'), where + ': own prompt variables become a form');
    }
  },
  async sheets({ doc }, where){
    const n = doc.querySelectorAll('#sheets .sheet').length;
    check(n >= 8, where + ': sheets (' + n + ')');
    check(doc.querySelectorAll('#sheets .sheet.on').length === 1, where + ': one sheet shown');
    doc.querySelector('#sheets [data-print]').click();
  }
};

(async () => {
  for(const p of pages.filter(p => fs.existsSync(path.join(ROOT, 'content/sections', p.id + '.js')))){
    for(const lang of ['ar', 'en']){
      const where = p.href + ' ' + lang;
      const ctx = await open(p.href, lang);
      const { doc, w, errors } = ctx;
      console.log(where, JSON.stringify({ title: doc.title, sections: doc.querySelectorAll('main#page > section').length, errors: errors.length }));
      if(checks[p.id]) await checks[p.id](ctx, where);
      await wait(30);
      if(errors.length){ failed = true; console.log('  ERRORS:', errors.slice(0, 5)); }
      if(lang === 'en'){ const left = arabicLeft(doc, w, '.mine-user'); if(left.length){ failed = true; console.log('  Arabic left in EN:', left.slice(0, 12)); } }
      w.close();
    }
  }
  // site search: index loads, Arabic and English queries find things, results link somewhere
  {
    const { doc, w, errors } = await open('index.html', 'ar');
    w.SITE.openSearch();
    await wait(300);
    const inp = doc.getElementById('siteQ');
    for(const [q, want] of [['webhook', 'n8n.html'], ['متغير', ''], ['past simple', 'english.html'], ['docker', ''], ['برومبت', '']]){
      inp.value = q; inp.dispatchEvent(new w.Event('input'));
      const res = doc.querySelectorAll('#siteRes [data-u]');
      check(res.length > 0, 'search «' + q + '» finds results');
      if(want && res.length) check([...res].some(li => li.getAttribute('data-u').startsWith(want)), 'search «' + q + '» links to ' + want);
    }
    check(doc.querySelectorAll('.topbar .more-menu a').length >= 5, 'the More menu lists the tool pages');
    if(errors.length){ failed = true; console.log('  ERRORS (index):', errors.slice(0, 5)); }
    w.close();
  }
  process.exit(failed ? 1 : 0);
})();
