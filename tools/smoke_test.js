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
  // week files load on demand in the browser; here they are added right after the outline so jsdom has them
  html = html.replace(/(<script src="content\/(\w+)\/outline\.js[^"]*"><\/script>)/, (tag, _, track) => tag +
    fs.readdirSync(path.join(ROOT, 'content', track, 'weeks')).filter(f => /^w\d\d\.js$/.test(f))
      .map(f => `<script src="content/${track}/weeks/${f}"></script>`).join(''));
  html = html.replace(/<link[^>]*>/g, '').replace(/<script src="([^"]+)"><\/script>/g,
    (_, src) => '<script>' + fs.readFileSync(path.join(ROOT, src.split('?')[0]), 'utf8').replace(/<\/script/g, '<\\/script') + '</script>');
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
function check(ok, what) { if (!ok) { failed = true; console.log('  FAIL:', what); } }
// The 24-week journey: map, locks, day view, and a full pass through week 1 and its weekly test.
function journeyChecks(doc, w, where) {
  const J = w.JOURNEY;
  check(!doc.getElementById('sprint'), where + ': old #sprint section is gone');
  check(doc.querySelectorAll('#journey .jr-week').length === 24, where + ': 24 week buttons');
  check(!doc.querySelector('.jr-week[data-week="1"]').classList.contains('locked'), where + ': week 1 open');
  check(doc.querySelector('.jr-week[data-week="2"]').classList.contains('locked'), where + ': week 2 locked');
  check(doc.querySelectorAll('#jrTabs .day-tab').length === 6, where + ': 6 day tabs');
  check(doc.querySelectorAll('#jrTabs .day-tab.locked').length === 5, where + ': days 2-6 locked at start');
  // finish days 1-5 through the UI
  const week = J.weeks[J.track()][1];
  for (const day of week.days.slice(0, 5)) {
    doc.querySelector('#jrTabs .day-tab[data-day="' + day.d + '"]').click();
    doc.querySelectorAll('#jrDay input[data-jdone^="p"]').forEach(cb => { cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true })); });
    day.quiz.forEach((q, i) => doc.querySelector('#jrDay .q-opt[data-jq="q' + day.key + '_' + i + '"][data-o="' + q.a + '"]').click());
    check(doc.querySelector('#jrDay [data-jnext]'), where + ': day ' + day.d + ' done');
  }
  doc.querySelector('#jrTabs .day-tab[data-day="6"]').click();
  check(!doc.querySelector('#jrTabs .day-tab[data-day="6"]').classList.contains('locked'), where + ': test day open');
  const test = week.days[5].test;
  // a failing attempt keeps week 2 locked
  test.forEach((q, i) => doc.querySelector('#jrDay .q-opt[data-jt="' + i + '"][data-o="' + ((q.a + 1) % q.o.length) + '"]').click());
  doc.querySelector('#jrDay [data-jsubmit]').click();
  check(doc.querySelector('.jr-result.fail'), where + ': low score fails');
  check(doc.querySelector('.jr-week[data-week="2"]').classList.contains('locked'), where + ': week 2 still locked after failing');
  doc.querySelector('#jrDay [data-jretake]').click();
  test.forEach((q, i) => doc.querySelector('#jrDay .q-opt[data-jt="' + i + '"][data-o="' + q.a + '"]').click());
  doc.querySelector('#jrDay [data-jsubmit]').click();
  check(doc.querySelector('.jr-result.pass'), where + ': full score passes');
  check(!doc.querySelector('.jr-week[data-week="2"]').classList.contains('locked'), where + ': week 2 opens after passing');
  check(J.getProgress().tests['w01-test'].length === 2, where + ': both attempts recorded');
  doc.querySelector('.jr-week[data-week="2"]').click();
  if (J.weeks[J.track()][2]) check(doc.querySelectorAll('#jrTabs .day-tab').length === 6, where + ': week 2 opens with 6 days');
  else check(doc.querySelector('.jr-main .sub-note'), where + ': week 2 shows coming soon');
  doc.querySelector('.jr-week[data-week="9"]').click();
  check(doc.querySelector('.jr-main .lock-note'), where + ': week 9 shows lock note');
  doc.querySelector('[data-jtoday]').click();
}
// Open every ready week and every day with all progress unlocked; report Arabic left on the English page.
function allWeeksChecks(doc, w, where) {
  const J = w.JOURNEY, track = J.track(), p = { done: {}, answers: {}, tests: {}, imported: true };
  Object.values(J.weeks[track]).forEach(week => {
    week.days.forEach(day => {
      (day.practice || []).forEach((_, i) => { p.done['p' + day.key + '_' + i] = true; });
      (day.quiz || []).forEach((q, i) => { p.answers['q' + day.key + '_' + i] = q.a; });
    });
    p.tests['w' + String(week.n).padStart(2, '0') + '-test'] = [{ score: 1, total: 1, at: 1 }];
  });
  J.setProgress(p);
  const left = new Set();
  let views = 0;
  Object.keys(J.weeks[track]).forEach(n => {
    doc.querySelector('.jr-week[data-week="' + n + '"]').click();
    for (let d = 1; d <= 6; d++) {
      const tab = doc.querySelector('#jrTabs .day-tab[data-day="' + d + '"]');
      check(tab && !tab.classList.contains('locked'), where + ': week ' + n + ' day ' + d + ' opens');
      if (!tab) continue;
      tab.click(); views++;
      const walker = doc.createTreeWalker(doc.getElementById('journeyApp'), w.NodeFilter.SHOW_TEXT);
      let t;
      while ((t = walker.nextNode())) if (AR.test(t.nodeValue) && !t.parentElement.closest('pre,code,.tex')) left.add('w' + n + 'd' + d + ': ' + t.nodeValue.trim().slice(0, 60));
    }
  });
  check(views >= 6, where + ': rendered ' + views + ' day views');
  // exams: with every week passed, a month exam and the final open, score, and the final shows the certificate
  if (Object.keys(J.weeks[track]).length === 24) {
    for (const [m, count] of [[1, 20], [6, 48]]) {
      doc.querySelector('.jr-exam[data-exam="' + m + '"]').click();
      const opts = doc.querySelectorAll('#journeyApp .q-opt[data-je]');
      const qs = [...new Set([...opts].map(b => b.dataset.je))];
      check(qs.length === count, where + ': exam ' + m + ' has ' + count + ' questions (got ' + qs.length + ')');
      qs.forEach(i => doc.querySelectorAll('#journeyApp .q-opt[data-je="' + i + '"]')[0].click());
      check(!doc.querySelector('[data-jesubmit]').disabled, where + ': exam ' + m + ' can be submitted');
      doc.querySelector('[data-jesubmit]').click();
      check(doc.querySelector('#journeyApp .jr-result'), where + ': exam ' + m + ' shows a result');
      check(J.getProgress().tests[J.rules.examId(m)].length === 1, where + ': exam ' + m + ' attempt recorded');
    }
    // force a pass on the final to render the certificate
    const p2 = J.getProgress();
    p2.tests['final-exam'].push({ score: 40, total: 48, at: 2 });
    J.setProgress(p2);
    doc.querySelector('.jr-exam[data-exam="6"]').click();
    check(doc.querySelector('#jrCert'), where + ': certificate shown after passing the final');
    const walker = doc.createTreeWalker(doc.getElementById('journeyApp'), w.NodeFilter.SHOW_TEXT);
    let t;
    while ((t = walker.nextNode())) if (AR.test(t.nodeValue) && !t.parentElement.closest('pre,code,.tex')) left.add('exam: ' + t.nodeValue.trim().slice(0, 60));
  }
  if (left.size) { failed = true; console.log('  Arabic left in journey (EN):', [...left].slice(0, 10)); }
}
for (const file of ['index.html', 'n8n.html', 'english.html']) {
  for (const lang of ['ar', 'en']) {
    const { doc, w, errors } = run(file, lang);
    const c = s => doc.querySelectorAll(s).length;
    const info = { dir: doc.documentElement.dir, title: doc.title, errors: errors.length,
      cards: c('.vocab-card'), quiz: c('.q-card'), map: c('.map-cell'), lib: c('.lib-card') };
    console.log(file, lang, JSON.stringify(info));
    if (errors.length) { failed = true; console.log('  ERRORS:', errors.slice(0, 5)); }
    if (file !== 'index.html') journeyChecks(doc, w, file + ' ' + lang);
    if (file !== 'index.html' && lang === 'en') allWeeksChecks(doc, w, file + ' ' + lang);
    if (lang === 'en') {
      // exercise the interactive parts too, so their strings are rendered
      doc.querySelectorAll('.day-tab').forEach(b => b.click());
      doc.querySelectorAll('.map-cell').forEach(b => b.click());
      doc.querySelectorAll('#quizTabs .cat-tab').forEach(b => b.click());
      // library filters narrow the list and reset cleanly
      if (doc.getElementById('libLevel')) {
        const all = c('.lib-card'), sel = (id, v) => { const el = doc.getElementById(id); el.value = v; el.dispatchEvent(new w.Event('change')); };
        sel('libLevel', 'a'); const adv = c('.lib-card');
        check(adv > 0 && adv < all, file + ': level filter narrows the library (' + adv + '/' + all + ')');
        sel('libLevel', ''); sel('libStatus', 'done');
        check(c('.lib-card') === 0, file + ': nothing marked done yet');
        sel('libStatus', '');
        if (doc.getElementById('libLang')) { sel('libLang', 'ar'); const n = c('.lib-card'); check(n > 0 && n < all, file + ': language filter works (' + n + ')'); sel('libLang', ''); }
        check(c('.lib-card') === all, file + ': filters reset');
      }
      const left = new Set();
      const walker = doc.createTreeWalker(doc.body, w.NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (AR.test(n.nodeValue) && !n.parentElement.closest('script,[data-lang-toggle],.passage,pre,code,.tex')) left.add(n.nodeValue.trim().slice(0, 80));
      }
      if (left.size) { failed = true; console.log('  Arabic left in EN:', [...left].slice(0, 15)); }
    }
  }
}
process.exit(failed ? 1 : 0);
