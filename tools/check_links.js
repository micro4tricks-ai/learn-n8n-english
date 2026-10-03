// Checks every external link the site shows: both libraries, the English references, the week readings and
// the links on the tool pages. A link fails on 404/410, a DNS error or a refused connection; answers such as
// 403/429 (sites that block robots) are listed as warnings only. Writes a Markdown report to
// tools/links-report.md (and to the GitHub Actions summary when it runs there).
// usage: node tools/check_links.js [--all]   (--all also prints the links that work)
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const links = new Map();   // url → where it is used
function add(url, where){ if(!/^https?:\/\//.test(url || '')) return; if(!links.has(url)) links.set(url, new Set()); links.get(url).add(where); }

for(const [track, file, key] of [['n8n', 'n8n-data.js', 'N8N_DATA'], ['english', 'english-data.js', 'EN_DATA']]){
  const w = {}; w.window = w;
  vm.runInNewContext(read('assets/js/' + file), w);
  vm.runInNewContext(read('content/library/' + track + '.js'), w);
  const D = w[key];
  D.LIBRARY.forEach(b => add(b.url, track + ' library'));
  (D.REFS || []).forEach(g => (g[1] || []).forEach(r => add(r[2], 'english references')));
  const dir = path.join(ROOT, 'content', track, 'weeks');
  fs.readdirSync(dir).filter(f => /^w\d\d\.js$/.test(f)).forEach(f =>
    vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { JOURNEY: { week: wk => wk.days.forEach(d => (d.read || []).forEach(r => add(r.url, track + ' week ' + wk.n))) } }));
}
{
  const secs = [], ctx = { SECTIONS: { add: s => secs.push(s), extend: (page, id, m) => secs.push({ page, items: m.items || [] }) } }; ctx.window = ctx;
  fs.readdirSync(path.join(ROOT, 'content/sections')).filter(f => f.endsWith('.js')).forEach(f => vm.runInNewContext(read('content/sections/' + f), ctx));
  secs.forEach(s => (s.items || []).forEach(it => (it.links || []).forEach(l => add(l.url, s.page + ' page'))));
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
async function check(url){
  for(const method of ['HEAD', 'GET']){
    try{
      const r = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': UA, 'Accept': 'text/html,*/*' }, signal: AbortSignal.timeout(25000) });
      if(r.ok) return { ok: true, code: r.status };
      if(method === 'HEAD' && [403, 404, 405, 429, 500, 501, 503].includes(r.status)) continue;   // some servers only answer GET
      return { ok: false, code: r.status, soft: ![404, 410].includes(r.status) };
    }catch(e){
      if(method === 'HEAD') continue;
      const c = (e.cause && e.cause.code) || e.name;
      return { ok: false, code: c, soft: !/ENOTFOUND|ECONNREFUSED|CERT|EAI_AGAIN/.test(String(c)) };
    }
  }
}
(async () => {
  const urls = [...links.keys()], out = [];
  let i = 0;
  await Promise.all(Array.from({ length: 8 }, async () => { while(i < urls.length){ const u = urls[i++]; out.push([u, await check(u)]); } }));
  const bad = out.filter(([, r]) => !r.ok && !r.soft), warn = out.filter(([, r]) => !r.ok && r.soft);
  const row = ([u, r]) => '| ' + r.code + ' | ' + u + ' | ' + [...links.get(u)].join(', ') + ' |';
  let md = '# Link check\n\n' + urls.length + ' links: ' + (urls.length - bad.length - warn.length) + ' fine, ' + bad.length + ' broken, ' + warn.length + ' to look at.\n';
  if(bad.length) md += '\n## Broken\n\n| code | link | used in |\n|---|---|---|\n' + bad.map(row).join('\n') + '\n';
  if(warn.length) md += '\n## To look at (the site may just block robots)\n\n| code | link | used in |\n|---|---|---|\n' + warn.map(row).join('\n') + '\n';
  if(process.argv.includes('--all')) md += '\n## Fine\n\n' + out.filter(([, r]) => r.ok).map(([u]) => '- ' + u).join('\n') + '\n';
  fs.writeFileSync(path.join(__dirname, 'links-report.md'), md);
  if(process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  console.log(md.split('\n').slice(0, 3).join('\n'));
  if(bad.length) console.log(bad.map(row).join('\n'));
  process.exit(bad.length ? 1 : 0);
})();
