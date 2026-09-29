// Builds the data the site loads on demand:
//   assets/data/search-index.js — every searchable thing on the site: [kind, title, snippet, url]
//   assets/data/deck.js         — the review cards (English words, n8n terms, grammar rules) for FSRS
// Texts are {ar, en}: Arabic from the page data, English from the page dictionaries (assets/js/*-en.js).
// Run it after changing any content: node tools/build_index.js  (npm run build does it with the rest)
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const AR = /[؀-ۿ]/;
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

function load(track){
  const win = {}; win.window = win;
  vm.runInNewContext(read('assets/js/' + (track === 'english' ? 'english-data.js' : 'n8n-data.js')), win);
  vm.runInNewContext(read('content/library/' + track + '.js'), win);
  const D = track === 'english' ? win.EN_DATA : win.N8N_DATA;
  const dict = {};
  const ctx = { I18N_ADD: d => Object.assign(dict, d) }; ctx.window = ctx;
  ['common-en.js', track + '-en.js'].forEach(f => vm.runInNewContext(read('assets/js/' + f), ctx));
  const terms = {}; const tw = { JOURNEY_TERMS: terms }; tw.window = tw;
  vm.runInNewContext(read('content/' + track + '/terms.js'), tw);
  const weeks = [];
  const wdir = path.join(ROOT, 'content', track, 'weeks');
  fs.readdirSync(wdir).filter(f => /^w\d\d\.js$/.test(f)).sort().forEach(f =>
    vm.runInNewContext(fs.readFileSync(path.join(wdir, f), 'utf8'), { JOURNEY: { week: w => weeks.push(w) } }));
  return { D, dict, extra: terms[track] || [], weeks };
}
// {ar, en} for a string from the data: English from the dictionary (or the text itself when it has no Arabic)
function biOf(dict){
  return function(s){
    if(s == null) return '';
    if(typeof s === 'object' && 'ar' in s) return s;
    s = String(s);
    if(!AR.test(s)) return s;
    const v = dict[s.trim()];
    return v == null ? { ar: s, en: s } : { ar: s, en: v };
  };
}
const short = x => {
  const cut = s => { s = String(s || '').replace(/\s+/g, ' ').replace(/[`*]/g, '').trim(); return s.length > 150 ? s.slice(0, 150) + '…' : s; };
  return x && typeof x === 'object' ? { ar: cut(x.ar), en: cut(x.en) } : cut(x);
};
const q = s => encodeURIComponent(String(s).replace(/\s+/g, ' ').trim()).replace(/%20/g, '+');
// a link that searches for the title in the page's language: {ar: url?q=عربي, en: url?q=English}
const link = (base, t) => typeof t === 'object' ? { ar: base + '?q=' + q(t.ar), en: base + '?q=' + q(t.en) } : base + '?q=' + q(t);

const index = [], deck = [];
const push = (k, t, s, u) => index.push([k, t, short(s), u]);

// ---------------- n8n ----------------
{
  const { D, dict, extra, weeks } = load('n8n');
  const bi = biOf(dict);
  D.TERMS.forEach(v => {
    push('t', v.t, bi(v.m), 'n8n.html#terms?q=' + q(v.t));
    deck.push({ id: 'n:' + v.t.toLowerCase(), tr: 'n8n', t: v.t, m: bi(v.m), ex: v.ex || '', w: v.w || 0, c: bi(v.c) });
  });
  const seen = new Set(D.TERMS.map(v => v.t.toLowerCase()));
  extra.forEach(v => {
    if(seen.has(v.t.toLowerCase())) return;
    seen.add(v.t.toLowerCase());
    push('t', v.t, v.m, 'n8n.html#terms?q=' + q(v.t));
    deck.push({ id: 'n:' + v.t.toLowerCase(), tr: 'n8n', t: v.t, m: v.m, ex: v.ex || '', w: v.w || 0 });
  });
  D.CHEATS.forEach(c => c.items.forEach(it => push('c', it.p, bi(it.u), 'n8n.html#ref?q=' + q(it.p))));
  D.ERRORS.forEach(e => push('e', e.m, bi(e.a), 'n8n.html#errors?q=' + q(e.m)));
  D.EXAMPLES.forEach(x => { const t = bi(x.t); push('x', t, bi(x.use), link('n8n.html#examples', t)); });
  D.LIBRARY.forEach(b => { const t = bi(b.t); push('l', t, bi(b.why), link('n8n.html#library', t)); });
  weeks.forEach(w => {
    push('w', w.title, w.goal, 'n8n.html#journey?w=' + w.n);
    w.days.forEach(d => push('d', d.title, d.goal, 'n8n.html#journey?w=' + w.n + '&d=' + d.d));
  });
}
// ---------------- English ----------------
{
  const { D, dict, extra, weeks } = load('english');
  const bi = biOf(dict);
  const seen = new Set();
  D.VOCAB.forEach(v => {
    const k = v.term.toLowerCase();
    if(seen.has(k)) return;
    seen.add(k);
    push('v', v.term, bi(v.mean), 'english.html#terms?q=' + q(v.term));
    deck.push({ id: 'e:' + k, tr: 'english', t: v.term, m: bi(v.mean), ex: v.ex || '', c: bi(v.cat) });
  });
  extra.forEach(v => {
    const k = v.t.toLowerCase();
    if(seen.has(k)) return;
    seen.add(k);
    push('v', v.t, v.m, 'english.html#terms?q=' + q(v.t));
    deck.push({ id: 'e:' + k, tr: 'english', t: v.t, m: v.m, ex: v.ex || '', w: v.w || 0 });
  });
  D.GRAMMAR.forEach(g => {
    push('g', bi(g.h), bi(g.p), 'english.html#grammar?q=' + q(g.good));
    deck.push({ id: 'g:' + g.h, tr: 'grammar', t: bi(g.h), m: bi(g.p), ex: '✗ ' + g.bad + '\n✓ ' + g.good, c: bi(g.c) });
  });
  D.PHRASES.forEach(p => push('p', p.p, bi(p.u), 'english.html#phrases?q=' + q(p.p)));
  D.ERRORS.forEach(e => push('e', e.msg, bi(e.meaning), 'english.html#errors?q=' + q(e.msg)));
  D.READINGS.forEach(r => { const t = bi(r.t); push('r', t, bi(r.cat), link('english.html#reading', t)); });
  D.LIBRARY.forEach(b => { const t = bi(b.t); push('l', t, bi(b.why), link('english.html#library', t)); });
  weeks.forEach(w => {
    push('w', w.title, w.goal, 'english.html#journey?w=' + w.n);
    w.days.forEach(d => push('d', d.title, d.goal, 'english.html#journey?w=' + w.n + '&d=' + d.d));
  });
}
// ---------------- pages built from content/sections ----------------
{
  const secs = [];
  const ctx = { SECTIONS: { add: s => secs.push(s), type() {} } }; ctx.window = ctx;
  const dir = path.join(ROOT, 'content', 'sections');
  if(fs.existsSync(dir)) fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort().forEach(f => vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx));
  secs.forEach(s => {
    if(!s.kind || !s.items) return;
    s.items.forEach(it => {
      const t = it.t;
      const snip = it.body || it.task || it.sub || (it.code ? String(typeof it.code === 'object' ? it.code.en : it.code) : '');
      push(s.kind, t, snip, link(s.page + '.html#' + s.id, t));
    });
  });
}

const out = path.join(ROOT, 'assets', 'data');
fs.mkdirSync(out, { recursive: true });
const js = (name, v) => fs.writeFileSync(path.join(out, name),
  '// Generated by tools/build_index.js — do not edit.\n' + v + '\n');
js('search-index.js', 'window.SITE_INDEX = ' + JSON.stringify(index) + ';');
js('deck.js', 'window.SITE_DECK = ' + JSON.stringify(deck) + ';');
const missing = index.filter(r => typeof r[1] === 'object' && r[1].ar === r[1].en && AR.test(r[1].ar)).length;
console.log('search index: ' + index.length + ' entries (' + Math.round(fs.statSync(path.join(out, 'search-index.js')).size / 1024) + ' KB)' +
  (missing ? ', ' + missing + ' titles without English' : '') + '; deck: ' + deck.length + ' cards (' + Math.round(fs.statSync(path.join(out, 'deck.js')).size / 1024) + ' KB)');
