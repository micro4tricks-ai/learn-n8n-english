// Quick look at python.html in real Chrome: unlocks every week in a fresh profile, opens a week/day, runs its examples,
// prints their output and saves screenshots to tools/e2e-shots/. usage: node tools/shot_python.js [week] [day] [track=python]
const { chromium } = require('playwright-core');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'e2e-shots');
fs.mkdirSync(SHOTS, { recursive: true });
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0].replace(/\/$/, '/index.html')));
  if(!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()){ res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
const W = Number(process.argv[2] || 1), D = Number(process.argv[3] || 1), TRACK = process.argv[4] || 'python';
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
  await page.goto(BASE + TRACK + '.html');
  // every week passed and every day done, so any week/day can be opened
  await page.evaluate(TRACK => {
    const p = { done: {}, answers: {}, tests: {}, updatedAt: Date.now() };
    for(let n = 1; n <= 48; n++) p.tests['w' + String(n).padStart(2, '0') + '-test'] = [{ score: 10, total: 10, at: Date.now() }];
    localStorage.setItem('journey_' + TRACK + '_v1', JSON.stringify(p));
  }, TRACK);
  await page.goto(BASE + TRACK + '.html#journey?w=' + W + '&d=' + D);
  await page.reload();   // a hash-only goto keeps the old page (and the progress it loaded)
  await page.waitForTimeout(1500);
  const runs = page.locator('#journey [data-jrun]');
  const n = await runs.count();
  for(let i = 0; i < n; i++){
    await runs.nth(i).scrollIntoViewIfNeeded();
    await runs.nth(i).click();
    await page.waitForTimeout(i === 0 ? 2500 : 900);
  }
  await page.waitForTimeout(3000);
  const outs = await page.$$eval('#journey .run-out', l => l.map(o => (o.hidden ? '[hidden] ' : '') + o.textContent.slice(0, 160)));
  outs.forEach((o, i) => console.log('#' + (i + 1), JSON.stringify(o)));
  const firstFrame = await page.$('#journey .run-frame:not([hidden])');
  if (firstFrame) { await firstFrame.scrollIntoViewIfNeeded(); await page.waitForTimeout(600); await firstFrame.screenshot({ path: path.join(SHOTS, TRACK + '-frame.png') }); }
  // what each example frame shows (the HTML/JS previews)
  for (const fr of page.frames().slice(1)) { try { console.log('frame text:', JSON.stringify((await fr.evaluate(() => document.body ? document.body.innerText : '')).slice(0, 70))); } catch (e) { console.log('frame:', e.message.slice(0, 60)); } }
  console.log('frames:', await page.$$eval('#journey .run-frame', l => l.length));
  const first = page.locator('#journey .learn-card').first();
  await first.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(SHOTS, TRACK + '-w' + W + 'd' + D + '.png'), fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  console.log('phone overflow', await page.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  await page.screenshot({ path: path.join(SHOTS, TRACK + '-phone.png') });
  console.log('errors:', errors);
  await browser.close(); server.close();
})();
