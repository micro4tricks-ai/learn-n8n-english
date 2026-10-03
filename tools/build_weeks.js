// Builds content/<track>/weeks/wNN.js from the week sources in content/<track>/src/wNN.js,
// then updates `ready` in content/<track>/outline.js to the weeks that exist.
//
// A source file is a Node module exporting the week (see docs/CONTENT.md). To keep the content
// consistent with the reference sections of the page, a source may point at existing entries
// instead of repeating them:
//   words: ['variable', …]            → the bank entry (English vocabulary / n8n glossary): meaning + example
//   learn: ['g:Past simple للي حصل']  → an English grammar rule (heading, explanation, wrong → right)
//   read:  ['lib:BBC Learning English', {lib:'…', what:{ar,en}}] → a library entry (its own note, or `what`)
// English for bank entries comes from the page dictionaries (assets/js/<track>-en.js); a missing one stops the build.
//
// The python and js tracks have no page data file: their words are written in the weeks and their library is
// content/library/<track>.js (window.PY_DATA / window.JS_DATA).
//
// The intensive start: weeks 1–12 are 3 hours a day. A week of n8n, English or Python (written for 2 hours) gets its
// extra hour from content/<track>/intensive/wNN.js — {days: [{learn, practice, code, words}, … ×5, {review}]} —
// appended to each day and marked `deep` (shown as «⚡ ساعة التكثيف»). Days of weeks 1–12 default to 180 minutes.
//
// usage: node tools/build_weeks.js english|n8n|python|js [--check]
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const track = process.argv[2];
const CODE = track === 'python' || track === 'js';   // tracks whose words and library live in content/
if (!['english', 'n8n', 'python', 'js'].includes(track)) { console.error('usage: node tools/build_weeks.js english|n8n|python|js'); process.exit(2); }
const js = f => fs.readFileSync(path.join(ROOT, 'assets/js', f), 'utf8');
const AR = /[\u0600-\u06FF]/;

// ---- the page data and its English dictionary ----
const win = {}; win.window = win;
if (!CODE) vm.runInNewContext(js(track === 'english' ? 'english-data.js' : 'n8n-data.js'), win);
const dict = {};
const ctx = { I18N_ADD: d => Object.assign(dict, d) };
ctx.window = { I18N_ADD: ctx.I18N_ADD };
['common-en.js'].concat(CODE ? [] : [track + '-en.js']).forEach(f => vm.runInNewContext(js(f), ctx));

const problems = [];
function en(ar, where) {
  if (ar == null || !AR.test(ar)) return ar;
  const k = ar.trim();
  if (dict[k] == null) { problems.push(where + ': no English for «' + k.slice(0, 80) + '»'); return { ar, en: '' }; }
  return { ar, en: dict[k] };
}
// the extra bilingual entries in content/library/<track>.js join the library (title/read may be {ar, en})
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'content/library', track + '.js'), 'utf8'), win);
const D = track === 'english' ? win.EN_DATA : track === 'n8n' ? win.N8N_DATA : { TERMS: [], LIBRARY: (track === 'js' ? win.JS_DATA : win.PY_DATA).LIBRARY };
const bank = Object.create(null);
(track === 'english' ? D.VOCAB.map(v => ({ t: v.term, m: v.mean, ex: v.ex })) : D.TERMS.map(v => ({ t: v.t, m: v.m, ex: v.ex })))
  .forEach(v => { if (!bank[v.t.toLowerCase()]) bank[v.t.toLowerCase()] = v; });
const grammar = Object.create(null);
(D.GRAMMAR || []).forEach(g => { grammar[g.h] = g; });
const library = Object.create(null);
D.LIBRARY.forEach(b => { if (typeof b.t === 'object') { library[b.t.en] = b; library[b.t.ar] = b; } else library[b.t] = b; });

function word(w, where) {
  if (typeof w !== 'string') return w;
  const v = bank[w.toLowerCase()];
  if (!v) { problems.push(where + ': word not in the bank: ' + w); return { t: w, m: { ar: '', en: '' } }; }
  return { t: v.t, m: en(v.m, where + ' ' + w), ex: en(v.ex, where + ' ' + w) };
}
function learn(l, where) {
  if (typeof l !== 'string') return l;
  const g = grammar[l.replace(/^g:/, '')];
  if (!g) { problems.push(where + ': grammar rule not found: ' + l); return { h: l, p: l }; }
  return { h: en(g.h, where), p: en(g.p, where), ex: '✗ ' + g.bad + '\n✓ ' + g.good };
}
function read(r, where) {
  const ref = typeof r === 'string' ? r : r.lib;
  if (!ref) return r;
  const b = library[ref.replace(/^lib:/, '')];
  if (!b) { problems.push(where + ': library entry not found: ' + ref); return { t: ref, url: 'https://', what: { ar: '', en: '' } }; }
  const bi = x => (x && typeof x === 'object') ? x : en(x, where);
  return { t: bi(b.t), url: b.url, what: (typeof r === 'object' && r.what) || bi(b.read) };
}

const pad = n => String(n).padStart(2, '0');
const srcDir = path.join(ROOT, 'content', track, 'src');
const outDir = path.join(ROOT, 'content', track, 'weeks');
const deepDir = path.join(ROOT, 'content', track, 'intensive');
fs.mkdirSync(outDir, { recursive: true });
const seenWords = Object.create(null);
// words already used in the ready weeks that have no source (week 1)
fs.readdirSync(outDir).filter(f => /^w\d\d\.js$/.test(f)).forEach(f => {
  if (fs.existsSync(path.join(srcDir, f))) return;
  vm.runInNewContext(fs.readFileSync(path.join(outDir, f), 'utf8'), { JOURNEY: { week: w => w.days.forEach(d => (d.words || []).forEach(x => { seenWords[x.t.toLowerCase()] = f; })) } });
});
const files = fs.existsSync(srcDir) ? fs.readdirSync(srcDir).filter(f => /^w\d\d\.js$/.test(f)).sort() : [];
const check = process.argv.includes('--check');
for (const f of files) {
  // a grammar reference must be a plain string, not an expression left behind while editing
  if (/'g:[^']*'\s*(===|&&|\?)/.test(fs.readFileSync(path.join(srcDir, f), 'utf8'))) problems.push(track + '/src/' + f + ': a grammar reference is inside an expression');
  // in a JS string a single backslash before d, w, s, b… is lost (\d becomes d, \b a backspace): regex samples need \\d
  const lost = fs.readFileSync(path.join(srcDir, f), 'utf8').split('\n').findIndex(l => /(^|[^\\])\\[dwsbDWSB.]/.test(l));
  if (lost !== -1) problems.push(track + '/src/' + f + ':' + (lost + 1) + ': write \\\\d (two backslashes) in a regex sample, a single one is lost');
  delete require.cache[require.resolve(path.join(srcDir, f))];
  const src = require(path.join(srcDir, f));
  const n = Number(f.slice(1, 3));
  const W = track + '/src/' + f;
  // the intensive hour of weeks 1–12, kept in its own file
  const deepFile = path.join(deepDir, f);
  let deep = null;
  if (fs.existsSync(deepFile)) {
    const dsrc = fs.readFileSync(deepFile, 'utf8');
    const dl = dsrc.split('\n').findIndex(l => /(^|[^\\])\\[dwsbDWSB.]/.test(l));
    if (dl !== -1) problems.push(track + '/intensive/' + f + ':' + (dl + 1) + ': write \\\\d (two backslashes) in a regex sample, a single one is lost');
    delete require.cache[require.resolve(deepFile)];
    deep = require(deepFile);
    if (n > 12) problems.push(track + '/intensive/' + f + ': only weeks 1–12 are intensive');
  }
  const mark = x => (x && typeof x === 'object' && !Array.isArray(x)) ? Object.assign({}, x, { deep: 1 }) : x;
  const days = src.days.map((d0, i) => {
    const w = W + ' day ' + (i + 1);
    const x = deep && deep.days && deep.days[i];
    const d = Object.assign({}, d0);
    if (x) {
      ['learn', 'practice', 'code', 'review'].forEach(k => { if (x[k]) d[k] = (d[k] || []).concat(x[k].map(mark)); });
      if (x.words) d.words = (d.words || []).concat(x.words);
      if (x.quiz) d.quiz = (d.quiz || []).concat(x.quiz);
      if (x.test) d.test = (d.test || []).concat(x.test);
    }
    const out = Object.assign({ d: i + 1 }, d, { minutes: d.minutes || (n <= 12 ? 180 : 120) });
    if (d.learn) out.learn = d.learn.map(l => learn(l, w));
    if (d.words) out.words = d.words.map(x => word(x, w));
    if (d.read) out.read = d.read.map(r => read(r, w));
    (out.words || []).forEach(x => {
      const k = x.t.toLowerCase();
      if (seenWords[k] && seenWords[k] !== f) problems.push(w + ': word already used in ' + seenWords[k] + ': ' + x.t);
      seenWords[k] = f;
    });
    return out;
  });
  const week = { track, n, month: src.month || Math.ceil(n / 4), level: src.level, title: src.title, goal: src.goal, days };
  if (!check) fs.writeFileSync(path.join(outDir, f),
    '// Week ' + n + ' — generated by tools/build_weeks.js from content/' + track + '/src/' + f + '. Edit the source, not this file.\n' +
    'JOURNEY.week(' + JSON.stringify(week, null, 1) + ');\n');
}
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
// Words written inside the weeks (not taken from the bank) also go to the page's word bank.
if (!check) {
  const extra = [];
  const seen = Object.create(null);
  fs.readdirSync(outDir).filter(f => /^w\d\d\.js$/.test(f)).sort().forEach(f => {
    vm.runInNewContext(fs.readFileSync(path.join(outDir, f), 'utf8'), { JOURNEY: { week: w => w.days.forEach(d => (d.words || []).forEach(x => {
      const k = x.t.toLowerCase();
      if (bank[k] || seen[k]) return;
      seen[k] = 1;
      extra.push({ w: w.n, t: x.t, m: x.m, ex: x.ex });
    })) } });
  });
  fs.writeFileSync(path.join(ROOT, 'content', track, 'terms.js'),
    '// Words introduced in the journey weeks that are not in the page\'s own bank. Generated by tools/build_weeks.js.\n' +
    'window.JOURNEY_TERMS = window.JOURNEY_TERMS || {};\nJOURNEY_TERMS[' + JSON.stringify(track) + '] = ' + JSON.stringify(extra, null, 1) + ';\n');
  console.log(track + ': ' + extra.length + ' journey words added to the word bank');
}
// ready = every week that has a file
const ready = fs.readdirSync(outDir).filter(f => /^w\d\d\.js$/.test(f)).map(f => Number(f.slice(1, 3))).sort((a, b) => a - b);
const outlineFile = path.join(ROOT, 'content', track, 'outline.js');
if (!check) fs.writeFileSync(outlineFile, fs.readFileSync(outlineFile, 'utf8').replace(/ready: \[[^\]]*\]/, 'ready: [' + ready.join(', ') + ']'));
console.log(track + ': built ' + files.length + ' week(s); ready: ' + ready.join(', '));
