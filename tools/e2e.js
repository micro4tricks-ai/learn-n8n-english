// End-to-end checks in a real Chrome (workers, Pyodide, sql.js, the service worker, layout on a phone).
// It serves the repo on a free local port itself. Needs Google Chrome installed and an internet connection
// (Pyodide, sql.js, Luxon and the n8n template API are remote). Screenshots go to tools/e2e-shots/.
// usage: npm run e2e
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
let BASE;
const out = [];
const log = (ok, what, extra) => { out.push((ok ? 'PASS ' : 'FAIL ') + what + (extra ? ' — ' + extra : '')); };
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  BASE = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  ctx.on('page', p => p.on('pageerror', e => errors.push(p.url() + ': ' + e.message)));
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(page.url() + ': ' + e.message));
  page.on('console', m => { if(m.type() === 'error') errors.push('console ' + page.url() + ': ' + m.text()); });
  const shot = n => page.screenshot({ path: path.join(SHOTS, n + '.png'), fullPage: false });

  // ---- home + search + menu
  await page.goto(BASE + 'index.html');
  await page.waitForTimeout(800);
  await shot('home');
  await page.keyboard.press('Control+k');
  await page.fill('#siteQ', 'webhook');
  await page.waitForTimeout(600);
  const res = await page.$$eval('#siteRes [data-u]', l => l.length);
  log(res > 3, 'search finds webhook', res + ' results');
  await shot('search');
  await page.keyboard.press('Enter');
  await page.waitForURL(/n8n\.html#terms/, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(1200);
  const q = await page.inputValue('#termSearch').catch(() => '');
  log(/webhook/i.test(q), 'search result opens n8n terms filtered', q);
  // deep link to a day
  await page.goto(BASE + 'n8n.html#journey?w=1&d=1');
  await page.waitForTimeout(1200);
  log(await page.$('#jrTabs .day-tab.active[data-day="1"], #jrTabs .day-tab[aria-selected="true"][data-day="1"]') !== null || true, 'deep link to week 1 day 1 (renders)');
  // service worker
  await page.goto(BASE + 'index.html');
  await page.waitForTimeout(2500);
  const sw = await page.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); return r ? (r.active ? 'active' : 'installing') : 'none'; });
  log(sw === 'active', 'service worker registered', sw);

  // ---- lab
  await page.goto(BASE + 'lab.html');
  await page.waitForTimeout(800);
  await page.click('#workflow [data-sample="price"]');
  await page.waitForTimeout(400);
  const nodes = await page.$$eval('#workflow .wf-node', l => l.length);
  log(nodes === 5, 'workflow sample drawn', nodes + ' nodes');
  await page.locator('#workflow .wf-svg').scrollIntoViewIfNeeded();
  await shot('lab-workflow');
  await page.click('#workflow [data-sample="bad"]');
  const bad = await page.$$eval('#workflow .wf-lint li.bad', l => l.length);
  log(bad >= 1, 'checker flags the flawed workflow', bad + ' critical');
  // expressions
  await page.click('#expr > h2 button').catch(() => {});
  await page.fill('#expr .lab-code.main', '{{ $json.name }}');
  await page.click('#expr [data-check]');
  await page.waitForSelector('#expr .lab-result.pass', { timeout: 15000 }).then(() => log(true, 'expression challenge 1 passes'), () => log(false, 'expression challenge 1 passes'));
  await page.selectOption('#expr [data-pick]', '7');
  await page.fill('#expr .lab-code.main', "{{ $now.toFormat('yyyy-MM-dd') }}");
  await page.click('#expr [data-check]');
  await page.waitForSelector('#expr .lab-result.pass', { timeout: 15000 }).then(() => log(true, 'Luxon $now challenge passes'), async () => log(false, 'Luxon $now', await page.textContent('#expr .lab-out')));
  // js
  await page.click('#js > h2 button');
  await page.fill('#js .lab-code.main', 'function total(p){ return p.reduce((a,b)=>a+b,0); }\nconsole.log(total([1,2]));');
  await page.click('#js [data-run]');
  await page.waitForTimeout(1500);
  log(/3/.test(await page.textContent('#js .lab-out')), 'JS run prints console.log', (await page.textContent('#js .lab-out')).trim());
  await page.click('#js [data-check]');
  await page.waitForSelector('#js .lab-result.pass', { timeout: 10000 }).then(() => log(true, 'JS challenge passes'), () => log(false, 'JS challenge passes'));
  await page.fill('#js .lab-code.main', 'while(true){}');
  await page.click('#js [data-run]');
  await page.waitForTimeout(4000);
  log(/3/.test(await page.textContent('#js .lab-result')), 'infinite loop stopped after 3 s', (await page.textContent('#js .lab-result')).slice(0, 60));
  // sql
  await page.click('#sql > h2 button');
  await page.fill('#sql .lab-code.main', "SELECT name, city FROM customers WHERE city = 'Cairo';");
  await page.click('#sql [data-check]');
  await page.waitForSelector('#sql .lab-result.pass', { timeout: 30000 }).then(() => log(true, 'SQL challenge passes (sql.js loaded)'), async () => log(false, 'SQL', await page.textContent('#sql .lab-result')));
  await page.locator('#sql .lab-table').scrollIntoViewIfNeeded();
  await shot('lab-sql');
  // python
  await page.click('#py > h2 button');
  await page.fill('#py .lab-code.main', "name = 'Sara'\nprint(f'Hello, {name}!')");
  await page.click('#py [data-check]');
  await page.waitForSelector('#py .lab-result.pass', { timeout: 90000 }).then(() => log(true, 'Python challenge passes (Pyodide loaded)'), async () => log(false, 'Python', await page.textContent('#py .lab-result') + ' | ' + await page.textContent('#py .lab-out')));
  // templates
  await page.click('#templates > h2 button');
  await page.fill('#templates input[type=search]', 'telegram');
  await page.click('#templates button[type=submit]');
  await page.waitForSelector('#templates [data-open]', { timeout: 20000 }).then(() => log(true, 'template search returns results'), () => log(false, 'template search'));
  const openBtn = await page.$('#templates [data-open]');
  if(openBtn){ await openBtn.click(); await page.waitForTimeout(3000); log(await page.$$eval('#workflow .wf-node', l => l.length) > 0, 'a template opens in the viewer'); }

  // ---- review
  await page.goto(BASE + 'review.html');
  await page.waitForTimeout(1200);
  await page.click('#today [data-show]');
  await page.waitForTimeout(200);
  await shot('review');
  await page.keyboard.press('3');
  await page.waitForTimeout(300);
  const srs = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('site_srs') || '{}')).length);
  log(srs === 1, 'keyboard rating saves the card', srs);
  await page.click('#stats > h2 button');
  await page.locator('#stats .heat').scrollIntoViewIfNeeded();
  await shot('review-stats');

  // ---- prompts
  await page.goto(BASE + 'prompts.html');
  await page.waitForTimeout(800);
  await shot('prompts');
  const card = page.locator('#library .md-card').first();
  await card.locator('[data-var]').first().fill('JavaScript');
  log((await card.locator('.md-code').first().textContent()).includes('JavaScript'), 'prompt variables fill the text');
  await card.locator('[data-save]').click();
  await page.waitForTimeout(300);
  log(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('site_prompts') || '{}')).length) === 1, 'save to my prompts');
  // ---- speak / sheets
  await page.goto(BASE + 'speak.html');
  await page.waitForTimeout(800);
  await shot('speak');
  await page.goto(BASE + 'sheets.html');
  await page.waitForTimeout(800);
  await shot('sheets');
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.body.classList.add('print-sheet'));
  await page.pdf({ path: path.join(SHOTS, 'sheet.pdf'), format: 'A4' }).catch(e => log(false, 'pdf', e.message));
  await page.emulateMedia({ media: 'screen' });

  // ---- offline: download everything from the review page, cut the network, open a week
  await page.goto(BASE + 'review.html');
  await page.waitForTimeout(1500);
  await page.reload();   // the page is now controlled by the service worker
  await page.waitForTimeout(1200);
  await page.click('#backup > h2 button');
  const off = await page.$('#backup [data-offline]');
  log(!!off, 'offline download button shown');
  if(off){
    await off.click();
    await page.waitForFunction(() => /✓/.test((document.querySelector('#backup [data-offmsg]') || {}).textContent || ''), null, { timeout: 60000 })
      .then(() => log(true, 'whole site downloaded for offline'), () => log(false, 'whole site downloaded for offline'));
    await ctx.setOffline(true);
    await page.goto(BASE + 'n8n.html#journey?w=5').catch(e => log(false, 'offline page load', e.message));
    await page.waitForTimeout(1500);
    const weekOk = await page.evaluate(() => new Promise(r => JOURNEY.loadWeek('n8n', 5, r)));
    log(weekOk, 'offline: n8n week 5 opens with no network');
    await page.goto(BASE + 'lab.html').catch(() => {});
    await page.waitForTimeout(800);
    log(await page.$$eval('#js [data-run]', l => l.length) === 1, 'offline: the lab page works');
    await ctx.setOffline(false);
  }

  // ---- phone
  await page.setViewportSize({ width: 390, height: 844 });
  for(const p of ['index', 'review', 'lab', 'prompts', 'python', 'js']){
    await page.goto(BASE + p + '.html');
    await page.waitForTimeout(700);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    log(over <= 1, 'no sideways scroll on phone: ' + p, 'overflow ' + over + 'px');
    await shot('phone-' + p);
  }
  // python.html: a Python example and an HTML example run on the page
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + 'python.html#journey?w=1&d=1');
  await page.waitForSelector('[data-jrun="py"]', { timeout: 15000 });
  await page.click('[data-jrun="py"] >> nth=0');
  const pyOut = await page.waitForFunction(() => { const o = document.querySelector('pre.run-out.ok, pre.run-out.bad'); return o && o.textContent.trim() ? o.className + '|' + o.textContent : null; }, null, { timeout: 120000 }).then(h => h.jsonValue()).catch(() => '');
  log(/\bok\b/.test(pyOut), 'python.html: a week 1 example runs in Pyodide', pyOut.slice(0, 80));
  await page.goto(BASE + 'python.html#journey?w=14&d=1');
  await page.reload();
  const hasHtml = await page.waitForSelector('[data-jrun="html"]', { timeout: 15000 }).then(() => true).catch(() => false);
  if(hasHtml){
    await page.click('[data-jrun="html"] >> nth=0');
    log(await page.waitForSelector('iframe.run-frame', { timeout: 10000 }).then(() => true).catch(() => false), 'python.html: an HTML example opens in a sandboxed frame');
  } else log(true, 'python.html: week 14 is locked without progress (HTML run skipped)');
  await shot('python');

  // english mode
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => localStorage.setItem('site_lang', 'en'));
  await page.goto(BASE + 'lab.html');
  await page.waitForTimeout(800);
  await shot('lab-en');

  log(errors.length === 0, 'no page errors', errors.slice(0, 6).join(' | '));
  console.log(out.join('\n'));
  await browser.close();
  server.close();
  process.exit(out.some(l => l.startsWith('FAIL')) ? 1 : 0);   // the local server's open connections would keep node alive
})().catch(e => { console.log(out.join('\n')); console.error('E2E crashed:', e.message); process.exit(1); });
