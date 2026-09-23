// Renders every page in Arabic and English (jsdom), reports script errors,
// counts the main UI pieces, and lists any Arabic text left on the English pages.
// usage: node tools/smoke_test.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');
const AR = /[؀-ۿ]/;
function run(file, lang) {
  let html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  html = html.replace(/<link[^>]*>/g, '').replace(/<script src="([^"]+)"><\/script>/g,
    (_, src) => '<script>' + fs.readFileSync(path.join(ROOT, src), 'utf8') + '</script>');
  const errors = [];
  const dom = new JSDOM(html, {
    runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/' + file,
    beforeParse(w) {
      w.localStorage.setItem('site_lang', lang);
      w.IntersectionObserver = class { observe() {} };
      w.HTMLElement.prototype.scrollIntoView = function () {};
      w.addEventListener('error', e => errors.push(e.message));
    }
  });
  return { doc: dom.window.document, w: dom.window, errors };
}
let failed = false;
for (const file of ['index.html', 'n8n.html', 'english.html']) {
  for (const lang of ['ar', 'en']) {
    const { doc, w, errors } = run(file, lang);
    const c = s => doc.querySelectorAll(s).length;
    const info = { dir: doc.documentElement.dir, title: doc.title, errors: errors.length,
      cards: c('.vocab-card'), quiz: c('.q-card'), map: c('.map-cell'), lib: c('.lib-card') };
    console.log(file, lang, JSON.stringify(info));
    if (errors.length) { failed = true; console.log('  ERRORS:', errors.slice(0, 5)); }
    if (lang === 'en') {
      // exercise the interactive parts too, so their strings are rendered
      doc.querySelectorAll('.day-tab').forEach(b => b.click());
      doc.querySelectorAll('.map-cell').forEach(b => b.click());
      doc.querySelectorAll('#quizTabs .cat-tab').forEach(b => b.click());
      const left = new Set();
      const walker = doc.createTreeWalker(doc.body, w.NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (AR.test(n.nodeValue) && !n.parentElement.closest('script,[data-lang-toggle],.passage')) left.add(n.nodeValue.trim().slice(0, 80));
      }
      if (left.size) { console.log('  Arabic left in EN:', [...left].slice(0, 15)); }
    }
  }
}
process.exit(failed ? 1 : 0);
