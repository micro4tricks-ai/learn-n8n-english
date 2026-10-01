// Adds a page built from sections: the HTML file, a content file with one example section, and its
// entry in content/pages.js (so it shows in the «More» menu, the footer and the search).
// usage: node tools/new_page.js <id> "<Arabic title>" "<English title>" [page-script.js …]
//   extra page scripts (assets/js/<name>) are loaded after the content file, e.g. a script that adds its own section types;
//   for a page already in content/pages.js they come from its `scripts` field (a path starting with content/ is used as is).
// usage: node tools/new_page.js --all   rewrites every section page from the template
// Re-running for an existing id only rewrites the HTML (after a template change); content and menu stay.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
if(args[0] === '--all'){
  const c = {}; c.window = c; require('vm').runInNewContext(fs.readFileSync(path.join(ROOT, 'content/pages.js'), 'utf8'), c);
  c.SITE_PAGES.filter(p => fs.existsSync(path.join(ROOT, 'content/sections', p.id + '.js'))).forEach(p =>
    require('child_process').execFileSync(process.execPath, [__filename, p.id], { stdio: 'inherit' }));
  process.exit(0);
}
const [id, ar, en, ...extra] = args;
if(!/^[a-z][a-z0-9-]*$/.test(id || '')){ console.error('usage: node tools/new_page.js <id> "<Arabic title>" "<English title>" [script.js …]'); process.exit(2); }
const pagesFile = path.join(ROOT, 'content/pages.js');
let pages = fs.readFileSync(pagesFile, 'utf8');
const vm = require('vm'), ctx = {}; ctx.window = ctx; vm.runInNewContext(pages, ctx);
const entry = ctx.SITE_PAGES.find(p => p.id === id);
if(!entry && (!ar || !en)){ console.error('a new page needs its Arabic and English titles'); process.exit(2); }
const V = (fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/\?v=(\w+)/) || [])[1];
const title = entry ? entry.title.ar : ar;
const desc = entry && entry.desc ? entry.desc.ar : ar;
const scripts = ['content/sections/' + id + '.js'].concat((extra.length ? extra : (entry && entry.scripts) || []).map(f => /^content\//.test(f) ? f : 'assets/js/' + f))
  .map(s => '<script src="' + s + '?v=' + V + '"></script>\n').join('');
const html = fs.readFileSync(path.join(__dirname, 'page.template.html'), 'utf8')
  .replace(/__V__/g, V).replace(/__ID__/g, id).replace('__TITLE__', title).replace('__DESC__', desc.replace(/"/g, '&quot;')).replace('__SCRIPTS__', scripts);
fs.writeFileSync(path.join(ROOT, id + '.html'), html);
const content = path.join(ROOT, 'content/sections', id + '.js');
if(!fs.existsSync(content)){
  fs.mkdirSync(path.dirname(content), { recursive: true });
  fs.writeFileSync(content, `// Sections of ${id}.html (see docs/ARCHITECTURE.md for every section type and field).
SECTIONS.add({
  page: '${id}', id: '${id}-main', order: 1, kind: 'c',
  title: { ar: ${JSON.stringify(ar)}, en: ${JSON.stringify(en)} },
  desc: { ar: 'اكتب هنا وصف القسم.', en: 'Describe the section here.' },
  type: 'cards',
  cats: [{ id: 'one', t: { ar: 'تصنيف', en: 'Category' } }],
  items: [
    { id: 'first', cat: 'one', lvl: 'b', t: { ar: 'أول كارت', en: 'First card' },
      body: { ar: 'شرح قصير. يدعم \`code\` و**bold** وقوائم.', en: 'A short text. Supports \`code\`, **bold** and lists.' },
      code: 'Text to copy, with a {{variable}} filled from a form.' }
  ]
});
`);
}
if(!entry){
  pages = pages.replace(/\n\];\s*$/, `,\n  { id: '${id}', href: '${id}.html', nav: 'more', icon: '📌', title: { ar: ${JSON.stringify(ar)}, en: ${JSON.stringify(en)} },\n    desc: { ar: ${JSON.stringify(ar)}, en: ${JSON.stringify(en)} } }\n];\n`);
  fs.writeFileSync(pagesFile, pages);
}
console.log((entry ? 'rewrote ' : 'created ') + id + '.html' + (entry ? '' : ', content/sections/' + id + '.js and its menu entry') + '. Next: npm run build && npm test');
