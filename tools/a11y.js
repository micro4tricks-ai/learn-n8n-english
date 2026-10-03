// Accessibility audit (axe-core) of every page in a real Chrome, all sections opened. Fails on any
// serious or critical violation (contrast, labels, roles, keyboard access…). usage: npm run a11y
const { chromium } = require('playwright-core');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const srv = http.createServer((q, r) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0]).replace(/\/$/, '/index.html')); if(!fs.existsSync(f)){ r.writeHead(404); return r.end(); } r.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'text/javascript' : f.endsWith('.css') ? 'text/css' : f.endsWith('.svg') ? 'image/svg+xml' : 'text/html' }); fs.createReadStream(f).pipe(r); });
srv.listen(0, async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  // bypassCSP: the pages' Content-Security-Policy would block axe, which is injected as an inline script
  const p = await b.newPage({ viewport: { width: 1280, height: 900 }, bypassCSP: true });
  const seen = {};
  for(const pg of ['index', 'n8n', 'english', 'review', 'lab', 'speak', 'prompts', 'sheets']){
    await p.goto('http://127.0.0.1:' + srv.address().port + '/' + pg + '.html');
    await p.waitForTimeout(800);
    // open every section so its content is checked too
    await p.evaluate(() => document.querySelectorAll('section.fold.closed > h2 > .fold-btn').forEach(b => b.click()));
    await p.waitForTimeout(300);
    await p.addScriptTag({ content: AXE });
    const r = await p.evaluate(async () => (await axe.run(document, { resultTypes: ['violations'] })).violations.filter(v => ['serious', 'critical'].includes(v.impact)).map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help, eg: v.nodes.slice(0, 3).map(x => x.target.join(' ') + ' :: ' + (x.failureSummary || '').split('\n')[1]) })));
    r.forEach(v => { const k = v.id; (seen[k] = seen[k] || []).push(pg + ':' + v.n); if(seen[k].length === 1) console.log(v.impact, v.id, '-', v.help, '\n   ', v.eg.join('\n    ')); });
  }
  const n = Object.keys(seen).length;
  console.log(n ? '\n' + n + ' kind(s) of violation: ' + JSON.stringify(seen) : 'a11y OK: no serious or critical violations on any page');
  await b.close(); srv.close();
  process.exit(n ? 1 : 0);
});
