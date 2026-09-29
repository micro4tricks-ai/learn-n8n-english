// Sets the asset version (?v=…) on every page and in the page template, so browsers and the offline app
// fetch the new files. The version is YYYYMMDD plus a release number for that day.
// usage: node tools/bump_version.js            → today's date, next number
//        node tools/bump_version.js 202610011  → an exact version
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).concat(['tools/page.template.html']);
const cur = (fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/\?v=(\d+)/) || [])[1] || '';
let next = process.argv[2];
if(!next){
  const d = new Date(), day = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  next = cur.startsWith(day) ? day + (Number(cur.slice(8)) + 1) : day + '1';
}
if(!/^\d{9,}$/.test(next)){ console.error('bad version: ' + next); process.exit(2); }
files.forEach(f => {
  const p = path.join(ROOT, f), s = fs.readFileSync(p, 'utf8');
  if(f.endsWith('template.html')) return;   // the template uses __V__
  fs.writeFileSync(p, s.replace(/\?v=\d+/g, '?v=' + next));
});
console.log('asset version ' + cur + ' → ' + next);
