// Validates every week file in content/<track>/weeks/wNN.js.
// Usage: node tools/test_content.js   → prints "content OK (N weeks)" or the problems and exits 1.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const AR = /[؀-ۿ]/;
const problems = []; let count = 0;
const seenUrl = {};

// A content string is either {ar, en} (both filled, en without Arabic) or a plain string without Arabic.
// Arabic is allowed inside `code` (rendered as code, e.g. lessons about processing Arabic text).
const noCode = s => String(s).replace(/`[^`]*`/g, '');
function bi(x, where, codeBlock){
  if(typeof x === 'string'){ if(!codeBlock && AR.test(noCode(x))) problems.push(where + ': Arabic text without {ar, en}'); return; }
  if(!x || !x.ar || !x.en){ problems.push(where + ': missing ar/en'); return; }
  if(!codeBlock && AR.test(noCode(x.en))) problems.push(where + ': Arabic left in en');
}
function question(x, where){
  bi(x.q, where + ' q'); bi(x.why, where + ' why');
  if(!Array.isArray(x.o) || x.o.length < 2 || x.o.length > 5){ problems.push(where + ': needs 2-5 options'); return; }
  x.o.forEach((o, i) => bi(o, where + ' option ' + i));
  if(!(Number.isInteger(x.a) && x.a >= 0 && x.a < x.o.length)) problems.push(where + ': bad answer index');
}
function atLeast(list, n, where){ if(!Array.isArray(list) || list.length < n) problems.push(where + ' < ' + n); }

for(const track of ['english', 'n8n', 'python', 'js']){
  const dir = path.join(ROOT, 'content', track, 'weeks');
  if(!fs.existsSync(dir)) continue;
  for(const f of fs.readdirSync(dir).filter(f => /^w\d\d\.js$/.test(f)).sort()){
    let wk = null;
    const W = track + '/' + f;
    try{
      vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { JOURNEY: { week: w => { wk = w; } } });
    }catch(e){ problems.push(W + ': ' + e.message); continue; }
    count++;
    if(!wk){ problems.push(W + ': no JOURNEY.week call'); continue; }
    if(wk.track !== track || 'w' + String(wk.n).padStart(2, '0') + '.js' !== f) problems.push(W + ': track/n mismatch');
    if(!(wk.month >= 1 && wk.month <= 12)) problems.push(W + ': month must be 1-12');
    bi(wk.title, W + ' title'); bi(wk.goal, W + ' goal'); bi(wk.level, W + ' level');
    if(!Array.isArray(wk.days) || wk.days.length !== 6){ problems.push(W + ': needs 6 days'); continue; }
    wk.days.forEach((d, i) => {
      const D = W + ' day ' + (i + 1);
      if(d.d !== i + 1) problems.push(D + ': d must be ' + (i + 1));
      bi(d.title, D + ' title'); bi(d.goal, D + ' goal');
      if(i < 5){
        atLeast(d.learn, 3, D + ': learn'); atLeast(d.practice, 3, D + ': practice');
        atLeast(d.words, 5, D + ': words'); atLeast(d.read, 1, D + ': read'); atLeast(d.quiz, 3, D + ': quiz');
        (d.learn || []).forEach((l, j) => { bi(l.h, D + ' learn ' + j + ' h'); bi(l.p, D + ' learn ' + j + ' p'); if(l.ex != null) bi(l.ex, D + ' learn ' + j + ' ex', true); });
        (d.practice || []).forEach((p, j) => bi(p, D + ' practice ' + j));
        (d.code || []).forEach((c, j) => { bi(c.u, D + ' code ' + j); if(c.p == null) problems.push(D + ' code ' + j + ': no snippet'); else bi(c.p, D + ' code ' + j + ' snippet', true); });
        (d.words || []).forEach((w, j) => { if(!w.t) problems.push(D + ' word ' + j + ': no term'); bi(w.m, D + ' word ' + j); if(w.ex != null) bi(w.ex, D + ' word ' + j + ' ex', true); });
        (d.read || []).forEach((r, j) => {
          // https, or another page of this site (python.html#journey)
          if(!/^https:\/\//.test(r.url || '') && !/^[a-z0-9-]+\.html(#[\w=&?-]*)?$/.test(r.url || '')) problems.push(D + ' read ' + j + ': url must be https or a page of this site');
          bi(r.t, D + ' read ' + j + ' title');
          bi(r.what, D + ' read ' + j);
        });
        if(d.challenge) bi(d.challenge, D + ' challenge');
        (d.quiz || []).forEach((x, j) => question(x, D + ' quiz ' + j));
      }else{
        atLeast(d.review, 3, D + ': review');
        (d.review || []).forEach((r, j) => bi(r, D + ' review ' + j));
        bi(d.project, D + ' project');
        atLeast(d.test, 10, D + ': test');
        (d.test || []).forEach((x, j) => question(x, D + ' test ' + j));
      }
    });
  }
}
if(problems.length){ console.log(problems.join('\n')); process.exit(1); }
console.log('content OK (' + count + ' weeks)');
