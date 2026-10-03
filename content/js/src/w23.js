// JavaScript week 23 — browser automation with Playwright.
// Playwright needs a real browser, so its scripts are shown (and syntax-checked); run them on your machine.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('أتمتة المتصفح بـ Playwright', 'Browser automation with Playwright'),
  goal: B('تتحكم في متصفح حقيقي بالكود لما مفيش API: تفتح صفحات، تلاقي العناصر بطريقة ثابتة، تملا فورمز وترفع وتنزّل ملفات، تحفظ تسجيل الدخول، تلقط بيانات الشبكة، وتشغّل كل ده بشكل موثوق في السيرفر — بإذن وبأخلاق.',
          'Control a real browser with code when there is no API: open pages, find elements in a stable way, fill forms and upload and download files, keep logins, capture network data, and run it all reliably on a server — with permission and ethics.'),
  days: [
    { title: B('البداية', 'Getting started'),
      goal: B('تشغّل أول سكربت Playwright وتعرف إمتى تستخدمه.', 'Run your first Playwright script and know when to use it.'),
      learn: [
        L(B('ليه Playwright؟', 'Why Playwright?'),
          B('**playwright** بيتحكم في Chromium وFirefox وWebKit بالكود: **browser automation**. تستخدمه لما مفيش API: بوابة مورّد قديمة، تقرير بيتنزّل من لوحة تحكم، فورم حكومي متكرر. القاعدة الذهبية: لو فيه API — استخدمه (أسرع وأثبت). وPlaywright بإذن صاحب الموقع وشروطه.', '**playwright** drives Chromium, Firefox and WebKit from code: **browser automation**. Use it when there is no API: an old supplier portal, a report downloaded from a dashboard, a repetitive official form. The golden rule: if there is an API — use it (faster and more stable). And use Playwright with the site owner’s permission and within its terms.'),
          'npm init -y && npm pkg set type=module\nnpm i -D playwright\nnpx playwright install chromium     # downloads the browser once\nnode first.mjs', T),
        L(B('أول سكربت', 'The first script'),
          B('launch ← **browser context** (زي بروفايل جديد نضيف: كوكيز وتخزين لوحده) ← page ← goto. **headless** = من غير نافذة (للسيرفر)، **headed** = بنافذة (للتطوير، مع `slowMo` تشوف اللي بيحصل). ودايمًا اقفل المتصفح في finally.', 'launch → a **browser context** (like a fresh clean profile: its own cookies and storage) → page → goto. **headless** = no window (for servers), **headed** = with a window (for development, with `slowMo` to watch). And always close the browser in finally.'),
          'import { chromium } from "playwright";\n\nconst browser = await chromium.launch({ headless: false, slowMo: 200 });\ntry {\n  const context = await browser.newContext({ locale: "ar-EG", viewport: { width: 1280, height: 800 } });\n  const page = await context.newPage();\n  await page.goto("https://example.com/", { waitUntil: "domcontentloaded" });\n  console.log(await page.title());\n  console.log(await page.getByRole("heading", { level: 1 }).textContent());\n  await page.screenshot({ path: "home.png", fullPage: true });\n} finally {\n  await browser.close();\n}', S),
        L(B('codegen يكتبلك البداية', 'codegen writes the start for you'),
          B('**codegen** بيفتح متصفح ويسجّل اللي بتعمله ويحوّله كود بـ locators كويسة. ممتاز كبداية — بعدين نضّفه: سمّي الخطوات، شيل الـ clicks الزيادة، وحط البيانات في متغيرات. وفيه `page.pause()` يوقف السكربت ويفتح Inspector تجرّب منه.', '**codegen** opens a browser, records what you do and turns it into code with good locators. Great as a start — then tidy it: name the steps, remove extra clicks, and put the data in variables. And `page.pause()` stops the script and opens the Inspector so you can experiment.'),
          'npx playwright codegen --target javascript -o recorded.mjs https://demo.playwright.dev/todomvc\n# click around, then clean recorded.mjs:\n#   - group the steps into functions (login, createOrder, download)\n#   - move data into a config/CSV\n#   - keep the getByRole / getByLabel locators it chose', T)
      ],
      practice: [
        B('ثبّت Playwright وشغّل أول سكربت headed.', 'Install Playwright and run the first script headed.'),
        B('خد screenshot لصفحة كاملة.', 'Take a full-page screenshot.'),
        B('سجّل خطوات بـ codegen على demo.playwright.dev.', 'Record steps with codegen on demo.playwright.dev.'),
        B('اكتب 3 مهام عندك: API ولا Playwright؟', 'List 3 tasks of yours: API or Playwright?')
      ],
      words: [
        W('playwright', 'مكتبة للتحكم في المتصفحات بالكود', 'a library controlling browsers from code', 'Playwright downloads the daily report.'),
        W('browser automation', 'التحكم في متصفح بالكود', 'controlling a browser with code', 'Use browser automation only without an API.'),
        W('browser context', 'جلسة متصفح معزولة', 'an isolated browser session', 'Each user gets a new browser context.'),
        W('headless', 'من غير نافذة ظاهرة', 'without a visible window', 'Servers run Chromium headless.'),
        W('headed', 'بنافذة ظاهرة', 'with a visible window', 'Debug in headed mode.'),
        W('codegen', 'تسجيل خطوات وتحويلها كود', 'recording steps and turning them into code', 'codegen picked good locators.')
      ],
      read: [{ lib: 'Playwright docs', what: B('اقرا Installation وLibrary.', 'Read Installation and Library.') }, { t: 'Playwright: Test generator', url: 'https://playwright.dev/docs/codegen', what: B('اقرا Recording a test.', 'Read Recording a test.') }],
      challenge: B('اكتب سكربت يفتح 5 صفحات من موقعك (أو صفحات تجريبية)، ياخد screenshot لكل واحدة بالموبايل والكمبيوتر، ويطبع العنوان وعدد الروابط — ويقفل المتصفح حتى لو حصل خطأ.', 'Write a script that opens 5 pages of your site (or demo pages), takes mobile and desktop screenshots of each, prints the title and link count — and closes the browser even after an error.'),
      quiz: [
        Q(B('فيه API رسمي:', 'There is an official API:'), [['استخدم الـ API', 'use the API'], ['Playwright أحسن', 'Playwright is better'], ['الاتنين مع بعض دايمًا', 'always both']], 0, B('أسرع وأثبت.', 'Faster and stabler.')),
        Q(B('على السيرفر:', 'On a server:'), ['headless', 'headed', 'slowMo'], 0, B('مفيش شاشة.', 'No screen.')),
        Q(B('browser.close مكانه:', 'browser.close belongs in:'), ['finally', 'catch', B('أول السكربت', 'the start')], 0, B('دايمًا.', 'Always.'))
      ] },

    { title: B('الـ locators والانتظار التلقائي', 'Locators and auto-waiting'),
      goal: B('تلاقي العناصر بطريقة متكسرش مع كل تعديل في التصميم.', 'Find elements in a way that does not break with every design change.'),
      learn: [
        L(B('locators بالمعنى', 'Locators by meaning'),
          B('**locator** = وصف لعنصر بيتحسب وقت الاستخدام. الأحسن بالمعنى زي ما المستخدم شايفه: **getbyrole** (زرار باسم «حفظ»)، **getbylabel** (خانة اسمها «البريد»)، getByText، getByPlaceholder، و**getbytestid** (`data-testid` لو انت صاحب الموقع). الـ CSS زي `.btn-3 > div` آخر حل — بيتكسر مع أي تعديل.', 'A **locator** = a description of an element, evaluated when used. The best ones go by meaning, as a user sees it: **getbyrole** (a button named «Save»), **getbylabel** (a field labelled «Email»), getByText, getByPlaceholder, and **getbytestid** (`data-testid` if you own the site). CSS like `.btn-3 > div` is the last resort — it breaks with any change.'),
          'await page.getByLabel("Email").fill("buyer@example.com");\nawait page.getByRole("button", { name: "Search" }).click();\nconst row = page.getByRole("row").filter({ hasText: "ORD-1042" });\nawait row.getByRole("button", { name: "Download invoice" }).click();\nawait page.getByTestId("status-filter").selectOption("paid");\n// ✗ fragile: await page.locator("#app > div:nth-child(3) .btn.btn-primary").click();', S),
        L(B('الانتظار التلقائي', 'Auto-waiting'),
          B('**auto-waiting**: قبل click أو fill، Playwright بيستنى العنصر يظهر ويبقى ثابت وقابل للضغط — فمش محتاج `sleep(3000)` (اللي بيبطّأ ويخلّي السكربت **flaky**: ساعات يشتغل وساعات لأ). لو محتاج تستنى حاجة: `await expect(locator).toBeVisible()` أو `page.waitForURL`.', '**auto-waiting**: before a click or fill, Playwright waits until the element is visible, stable and clickable — so you do not need `sleep(3000)` (which is slow and makes scripts **flaky**: working sometimes and failing sometimes). To wait for something: `await expect(locator).toBeVisible()` or `page.waitForURL`.'),
          'import { expect } from "playwright/test";\n\nawait page.getByRole("button", { name: "Export" }).click();            // waits until clickable\nawait expect(page.getByText("Export ready")).toBeVisible({ timeout: 30_000 });\nawait page.waitForURL(/\\/orders\\?page=2/);\n// ✗ never: await page.waitForTimeout(5000);', S),
        L(B('strict mode والقوائم', 'Strict mode and lists'),
          B('**strict mode**: لو الـ locator لقى أكتر من عنصر وانت عايز click، Playwright بيرمي خطأ بدل ما يضغط على أي واحد — ده بيحميك. للقوايم: `locator.all()` أو `count()` و`nth(i)`، أو `allTextContents()`. وتقدر تفلتر: `filter({ hasText })` أو locator جوه locator.', '**strict mode**: if a locator finds several elements and you want a click, Playwright throws instead of clicking any one — that protects you. For lists: `locator.all()` or `count()` and `nth(i)`, or `allTextContents()`. And filter with `filter({ hasText })` or a locator inside a locator.'),
          'const rows = page.getByRole("row").filter({ has: page.getByRole("cell") });\nconsole.log("rows:", await rows.count());\nconst orders = [];\nfor (const row of await rows.all()) {\n  const cells = await row.getByRole("cell").allTextContents();\n  orders.push({ id: cells[0].trim(), customer: cells[1].trim(), total: Number(cells[2].replace(/[^\\d.]/g, "")) });\n}\nconsole.table(orders);', S)
      ],
      practice: [
        B('حوّل 5 CSS selectors لـ getByRole/getByLabel.', 'Convert 5 CSS selectors to getByRole/getByLabel.'),
        B('شيل كل waitForTimeout من سكربت.', 'Remove every waitForTimeout from a script.'),
        B('اعمل locator بيلاقي عنصرين وشوف خطأ strict.', 'Make a locator matching two elements and read the strict error.'),
        B('اقرا جدول كامل لمصفوفة كائنات.', 'Read a whole table into an array of objects.')
      ],
      words: [
        W('locator', 'وصف لعنصر في الصفحة', 'a description of an element on the page', 'The locator finds the Save button.'),
        W('getbyrole', 'إيجاد عنصر بدوره واسمه', 'finding an element by role and name', 'getByRole("button", { name: "Save" }).'),
        W('getbylabel', 'إيجاد خانة بعنوانها', 'finding a field by its label', 'getByLabel("Email") fills the field.'),
        W('getbytestid', 'إيجاد عنصر بـ data-testid', 'finding an element by data-testid', 'getByTestId survives redesigns.'),
        W('auto-waiting', 'انتظار تلقائي لحد ما العنصر يبقى جاهز', 'waiting automatically until an element is ready', 'Auto-waiting replaces sleeps.'),
        W('flaky', 'بيشتغل ساعات ويفشل ساعات', 'sometimes passing, sometimes failing', 'Fixed sleeps make scripts flaky.'),
        W('strict mode', 'رفض الفعل لو الـ locator لقى أكتر من عنصر', 'refusing an action when a locator matches several elements', 'Strict mode stopped the wrong click.')
      ],
      read: [{ t: 'Playwright: Locators', url: 'https://playwright.dev/docs/locators', what: B('اقرا Quick Guide وFiltering.', 'Read Quick Guide and Filtering.') }, { t: 'Playwright: Auto-waiting', url: 'https://playwright.dev/docs/actionability', what: B('اقرا الجدول.', 'Read the table.') }],
      challenge: B('اكتب سكربت على demo.playwright.dev/todomvc: يضيف 10 مهام من مصفوفة، يعلّم 3 خلصانين، يفلتر Completed، ويتأكد من العدد — بـ getByRole/getByPlaceholder بس ومن غير أي sleep.', 'Write a script on demo.playwright.dev/todomvc: add 10 todos from an array, mark 3 done, filter Completed and check the count — using only getByRole/getByPlaceholder and no sleeps.'),
      quiz: [
        Q(B('أثبت locator لزرار حفظ:', 'The most stable locator for a Save button:'), ['getByRole("button", { name: "Save" })', '"div > button:nth-child(2)"', '"//div[3]/button"'], 0, B('بالمعنى.', 'By meaning.')),
        Q(B('waitForTimeout(5000):', 'waitForTimeout(5000):'), [['بطيء وflaky', 'slow and flaky'], ['الأفضل', 'the best'], ['إجباري', 'required']], 0, B('auto-waiting.', 'Auto-waiting.')),
        Q(B('locator لقى 3 أزرار وطلبت click:', 'A locator found 3 buttons and you click:'), [['خطأ strict', 'a strict-mode error'], ['يضغط الأول', 'clicks the first'], ['يضغط الكل', 'clicks all']], 0, B('حماية.', 'Protection.'))
      ] },

    { title: B('الفورمز والملفات', 'Forms and files'),
      goal: B('تملا فورمز متعددة الخطوات وترفع وتنزّل ملفات.', 'Fill multi-step forms and upload and download files.'),
      learn: [
        L(B('ملا الفورم من بيانات', 'Filling a form from data'),
          B('`fill` للخانات، `selectOption` للقوائم، `check` للـ checkbox، `setInputFiles` لرفع ملف (**file upload**). الأحسن: البيانات من CSV أو n8n، ودالة لكل خطوة، وتأكيد بعد الإرسال (رسالة نجاح أو رقم طلب). ولو الفورم عام وبيسجّل بيانات ناس: إذن واضح بس.', '`fill` for fields, `selectOption` for lists, `check` for checkboxes, `setInputFiles` to upload a file (a **file upload**). Best: data from CSV or n8n, one function per step, and a confirmation after submit (a success message or reference number). And for public forms recording people’s data: only with clear permission.'),
          'async function submitClaim(page, claim) {\n  await page.goto("https://portal.example.com/claims/new");\n  await page.getByLabel("Order number").fill(claim.orderId);\n  await page.getByLabel("Reason").selectOption(claim.reason);\n  await page.getByLabel("Amount").fill(String(claim.amount));\n  await page.getByLabel("I confirm the details are correct").check();\n  await page.getByLabel("Invoice").setInputFiles(claim.invoicePath);\n  await page.getByRole("button", { name: "Submit" }).click();\n  const ref = await page.getByTestId("claim-reference").textContent();   // proof it worked\n  return ref.trim();\n}', S),
        L(B('التنزيلات', 'Downloads'),
          B('**download**: استنى حدث التنزيل **قبل** الضغط (`waitForEvent("download")`)، وبعدين احفظه باسمك. ده اللي بيخلّيك تنزّل تقرير كل يوم من لوحة تحكم مفيهاش API وتبعته لـ n8n.', 'A **download**: wait for the download event **before** clicking (`waitForEvent("download")`), then save it under your own name. This is how you fetch a daily report from a dashboard without an API and pass it to n8n.'),
          'const [download] = await Promise.all([\n  page.waitForEvent("download"),\n  page.getByRole("button", { name: "Export CSV" }).click(),\n]);\nconst file = `reports/sales-${new Date().toISOString().slice(0, 10)}.csv`;\nawait download.saveAs(file);\nconsole.log("saved", file, "(suggested name:", download.suggestedFilename() + ")");', S),
        L(B('النوافذ والإطارات', 'Dialogs and frames'),
          B('**dialog** (alert/confirm) بيوقف الصفحة: اسمع له بـ `page.on("dialog")` واقبله أو ارفضه. و**frame** (iframe — بوابات دفع، فورمز مدمجة): `page.frameLocator("iframe#pay")` وبعدين نفس الـ locators جواه. ونافذة جديدة (popup): `context.waitForEvent("page")`.', 'A **dialog** (alert/confirm) blocks the page: listen with `page.on("dialog")` and accept or dismiss it. A **frame** (an iframe — payment gateways, embedded forms): `page.frameLocator("iframe#pay")` and then the same locators inside it. A new window (popup): `context.waitForEvent("page")`.'),
          'page.on("dialog", async d => { console.log("dialog:", d.message()); await d.accept(); });\nawait page.getByRole("button", { name: "Delete draft" }).click();\n\nconst form = page.frameLocator("iframe[title=\'Supplier form\']");\nawait form.getByLabel("Tax number").fill("300000000000003");\n\nconst [popup] = await Promise.all([page.context().waitForEvent("page"), page.getByText("Open invoice").click()]);\nawait popup.waitForLoadState();\nconsole.log(await popup.title());', S)
      ],
      practice: [
        B('املا فورم من 3 صفوف CSV.', 'Fill a form from 3 CSV rows.'),
        B('نزّل ملف واحفظه باسم بالتاريخ.', 'Download a file and save it with a dated name.'),
        B('ارفع ملف PDF في فورم.', 'Upload a PDF to a form.'),
        B('اتعامل مع confirm dialog.', 'Handle a confirm dialog.')
      ],
      words: [
        W('fill', 'كتابة قيمة في خانة', 'typing a value into a field', 'fill replaces the old value.'),
        W('file upload', 'رفع ملف لموقع', 'sending a file to a website', 'setInputFiles handles the file upload.'),
        W('download', 'تنزيل ملف من الموقع', 'getting a file from the site', 'Wait for the download event first.'),
        W('dialog', 'نافذة alert أو confirm', 'an alert or confirm window', 'Accept the dialog to continue.'),
        W('frame', 'صفحة جوه صفحة (iframe)', 'a page inside a page (iframe)', 'The payment form is in a frame.')
      ],
      read: [{ t: 'Playwright: Actions', url: 'https://playwright.dev/docs/input', what: B('اقرا Text input وUpload files.', 'Read Text input and Upload files.') }, { t: 'Playwright: Downloads', url: 'https://playwright.dev/docs/downloads', what: B('اقرا المثال.', 'Read the example.') }],
      challenge: B('اكتب «مُدخل الطلبات»: يقرا CSV فيه 10 طلبات، ويدخل كل طلب في فورم (موقع تجريبي أو موقعك)، ويرفع ملف، ويسجّل رقم التأكيد لكل طلب في CSV نتايج — والفاشل يتسجل بسببه وscreenshot.', 'Write an «order entry bot»: read a CSV of 10 orders, enter each into a form (a demo site or your own), upload a file, and record each confirmation number in a results CSV — with failures logged with a reason and a screenshot.'),
      quiz: [
        Q(B('waitForEvent("download") يتنادى:', 'waitForEvent("download") is called:'), [['قبل الضغط (مع بعض)', 'before the click (together)'], ['بعد الضغط بثانية', 'a second after the click'], ['مش لازم', 'never']], 0, B('عشان ميفوتكش.', 'So you do not miss it.')),
        Q(B('فورم جوه iframe:', 'A form inside an iframe:'), ['frameLocator', 'getByRole', 'goto'], 0, B('frame.', 'Frame.')),
        Q(B('دليل إن الإرسال نجح:', 'Proof the submission worked:'), [['رقم تأكيد أو رسالة نجاح', 'a reference number or success message'], ['مفيش خطأ', 'no error'], ['الوقت', 'the time']], 0, B('اتأكد.', 'Verify.'))
      ] },

    { title: B('الجلسات والشبكة', 'Sessions and the network'),
      goal: B('متسجّلش دخول كل مرة، وتاخد البيانات من الشبكة مباشرة.', 'Avoid logging in every time, and take data straight from the network.'),
      learn: [
        L(B('حفظ تسجيل الدخول', 'Saving the login'),
          B('**storagestate**: سجّل دخول **مرة بإيدك** (headed)، واحفظ الكوكيز والتخزين في ملف، وكل تشغيل بعد كده يبدأ مسجّل (**session reuse**). كده مفيش كلمة سر في الكود، ومفيش تسجيل دخول كل 5 دقايق يعمل شك. الملف ده سري زي كلمة السر: في .gitignore.', '**storagestate**: log in **once by hand** (headed), save the cookies and storage to a file, and every later run starts logged in (**session reuse**). No password in the code, and no login every 5 minutes raising suspicion. That file is as secret as a password: in .gitignore.'),
          '// login-once.mjs — run it yourself, log in in the window, then press Enter in the terminal\nconst browser = await chromium.launch({ headless: false });\nconst context = await browser.newContext();\nawait (await context.newPage()).goto("https://portal.example.com/login");\nawait new Promise(r => process.stdin.once("data", r));\nawait context.storageState({ path: ".auth/portal.json" });\nawait browser.close();\n\n// daily.mjs — every run reuses the saved session\nconst ctx = await browser.newContext({ storageState: ".auth/portal.json" });', S),
        L(B('خد البيانات من الشبكة', 'Take the data from the network'),
          B('الصفحات الحديثة بتجيب بياناتها JSON من API داخلي. بدل ما تقرا الجدول من الـ HTML، اسمع للطلب ده بـ **waitforresponse** وخد الـ JSON نضيف ومنظّم. افتح Network في DevTools وشوف الطلب الأول — ساعات تكتشف إنك مش محتاج متصفح أصلًا!', 'Modern pages fetch their data as JSON from an internal API. Instead of reading the table from HTML, listen for that request with **waitforresponse** and take the clean, structured JSON. Open Network in DevTools and look first — sometimes you find you do not need a browser at all!'),
          'const [res] = await Promise.all([\n  page.waitForResponse(r => r.url().includes("/api/orders") && r.request().method() === "GET" && r.ok()),\n  page.getByRole("button", { name: "Load orders" }).click(),\n]);\nconst data = await res.json();\nconsole.log(data.items.length, "orders straight from the API the page uses");', S),
        L(B('اعتراض الطلبات', 'Intercepting requests'),
          B('**network interception** بـ `page.route`: امنع الصور والخطوط والإعلانات (أسرع بكتير)، أو رجّع بيانات وهمية في الاختبار (mock)، أو عدّل header. و**har** بيسجّل كل الشبكة لملف تراجعه أو تعيد تشغيله.', '**network interception** with `page.route`: block images, fonts and ads (much faster), return fake data in tests (a mock), or change a header. A **har** records all network traffic to a file you can review or replay.'),
          'await context.route("**/*", route => {\n  const type = route.request().resourceType();\n  return ["image", "font", "media"].includes(type) ? route.abort() : route.continue();\n});\n\nawait page.route("**/api/prices", route => route.fulfill({ json: { items: [{ sku: "A1", price: 45 }] } }));   // a mock for testing\n\nconst ctx2 = await browser.newContext({ recordHar: { path: "session.har" } });   // saved on ctx2.close()', S)
      ],
      practice: [
        B('احفظ storageState لموقع تجريبي واستخدمه.', 'Save storageState for a demo site and reuse it.'),
        B('دوّر في Network على API الصفحة.', 'Find the page’s API in the Network tab.'),
        B('خد JSON بـ waitForResponse بدل قراءة HTML.', 'Take JSON with waitForResponse instead of reading HTML.'),
        B('امنع الصور وقِس الفرق في السرعة.', 'Block images and measure the speed difference.')
      ],
      words: [
        W('storagestate', 'ملف كوكيز وتخزين جلسة المتصفح', 'a file of the browser session’s cookies and storage', 'storageState keeps us logged in.'),
        W('session reuse', 'استخدام تسجيل دخول محفوظ', 'reusing a saved login', 'Session reuse avoids daily logins.'),
        W('waitforresponse', 'انتظار رد شبكة معين', 'waiting for a specific network reply', 'waitForResponse grabs the orders JSON.'),
        W('network interception', 'التحكم في طلبات الصفحة', 'controlling the page’s requests', 'Network interception blocks images.'),
        W('har', 'ملف تسجيل كل طلبات الشبكة', 'a file recording all network requests', 'Open the HAR to see the calls.')
      ],
      read: [{ t: 'Playwright: Authentication', url: 'https://playwright.dev/docs/auth', what: B('اقرا Reuse signed in state.', 'Read Reuse signed in state.') }, { t: 'Playwright: Network', url: 'https://playwright.dev/docs/network', what: B('اقرا Handle requests وModify responses.', 'Read Handle requests and Modify responses.') }],
      challenge: B('على موقع تجريبي بتسجيل دخول: سجّل مرة وخزّن الجلسة، وسكربت يومي يدخل بالجلسة، يمنع الصور، ويلقط JSON الطلبات من الشبكة، ويحفظه NDJSON — ولو الجلسة انتهت يبعت تنبيه بدل ما يحاول يسجّل.', 'On a demo site with a login: sign in once and save the session; a daily script reuses it, blocks images, captures the orders JSON from the network and saves NDJSON — and if the session expired, it alerts instead of trying to log in.'),
      quiz: [
        Q(B('كلمة السر في السكربت:', 'A password in the script:'), [['لأ؛ storageState', 'no; storageState'], ['أيوه في متغير', 'yes, in a variable'], ['في التعليقات', 'in comments']], 0, B('مرة بإيدك.', 'Once by hand.')),
        Q(B('الجدول جاي من /api/orders:', 'The table comes from /api/orders:'), ['waitForResponse', B('قراءة HTML', 'reading HTML'), 'screenshot'], 0, B('JSON نضيف.', 'Clean JSON.')),
        Q(B('ملف .auth/portal.json:', 'The .auth/portal.json file:'), [['سري في .gitignore', 'secret, in .gitignore'], ['عام', 'public'], ['في README', 'in the README']], 0, B('زي كلمة السر.', 'Like a password.'))
      ] },

    { title: B('الموثوقية والتشغيل', 'Reliability and running it'),
      goal: B('سكربت متصفح يشتغل كل يوم ولما يفشل تعرف ليه.', 'A browser script that runs daily, and when it fails you know why.'),
      learn: [
        L(B('tracing وscreenshots', 'Tracing and screenshots'),
          B('**tracing** بيسجّل كل خطوة (screenshot، DOM، شبكة، console) في ملف zip تفتحه في **trace viewer** وتشوف اللحظة اللي فشل فيها. شغّله دايمًا واحفظه بس لو حصل فشل — ده أحسن أداة debugging للسكربتات اللي بتشتغل وانت مش موجود.', '**tracing** records every step (screenshot, DOM, network, console) in a zip you open in the **trace viewer** to see the moment it failed. Always start it and keep it only on failure — the best debugging tool for scripts that run while you are away.'),
          'await context.tracing.start({ screenshots: true, snapshots: true });\ntry {\n  await runDailyExport(page);\n  await context.tracing.stop();                                   // success: discard\n} catch (err) {\n  const stamp = new Date().toISOString().replace(/[:.]/g, "-");\n  await page.screenshot({ path: `failures/${stamp}.png`, fullPage: true });\n  await context.tracing.stop({ path: `failures/${stamp}-trace.zip` });\n  await notify("error", `export failed: ${err.message}`, { trace: `${stamp}-trace.zip` });\n  throw err;\n}\n// later: npx playwright show-trace failures/<stamp>-trace.zip', S),
        L(B('في السيرفر', 'On the server'),
          B('على لينكس: `npx playwright install --with-deps chromium`، أو صورة Docker الرسمية `mcr.microsoft.com/playwright`. شغّل headless، بحد وقت، ومتصفح واحد بأكتر من context بدل متصفحات كتير. وn8n؟ ينادي سكربتك بـ Execute Command، أو خليه خدمة Express صغيرة (أسبوع 18) بـ endpoint `/export`.', 'On Linux: `npx playwright install --with-deps chromium`, or the official Docker image `mcr.microsoft.com/playwright`. Run headless with a time limit, and one browser with several contexts rather than many browsers. And n8n? It calls your script via Execute Command, or make it a small Express service (week 18) with an `/export` endpoint.'),
          'FROM mcr.microsoft.com/playwright:v1.55.0-noble\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["node", "src/server.mjs"]          # POST /export → runs the browser job, returns the file path', T),
        L(B('اختبر موقعك انت', 'Test your own site'),
          B('نفس Playwright بيختبر مواقعك: **playwright test** بيدّيك runner، و**expect** بـ **web-first assertion** (بتستنى لحد ما الشرط يتحقق)، وأكتر من متصفح، وتقارير. ده اللي الموقع ده نفسه بيستخدمه في e2e. هنكمل الاختبارات في أسبوع 27.', 'The same Playwright tests your sites: **playwright test** gives you a runner, **expect** with each **web-first assertion** (waiting until the condition holds), several browsers and reports. This very site uses it for its e2e tests. We continue testing in week 27.'),
          'import { test, expect } from "@playwright/test";\n\ntest("order form shows field errors", async ({ page }) => {\n  await page.goto("http://localhost:5173/order");\n  await page.getByRole("button", { name: "Send" }).click();\n  await expect(page.getByText("Phone is required")).toBeVisible();\n  await expect(page).toHaveURL(/\\/order$/);\n});', S)
      ],
      practice: [
        B('ضيف tracing لسكربت وافتح trace بعد فشل متعمد.', 'Add tracing to a script and open the trace after a deliberate failure.'),
        B('شغّل سكربتك headless في Docker.', 'Run your script headless in Docker.'),
        B('خلّي n8n ينادي السكربت ويستلم الملف.', 'Have n8n call the script and receive the file.'),
        B('اكتب اختبار Playwright Test لفورم عندك.', 'Write a Playwright Test for one of your forms.')
      ],
      words: [
        W('tracing', 'تسجيل كل خطوات السكربت للمراجعة', 'recording every script step for review', 'Tracing showed the missing button.'),
        W('trace viewer', 'أداة عرض ملف الـ trace', 'the tool for viewing a trace file', 'Open the zip in the trace viewer.'),
        W('screenshot', 'صورة للصفحة', 'a picture of the page', 'Save a screenshot on failure.'),
        W('playwright test', 'إطار الاختبارات بتاع Playwright', 'Playwright’s test framework', 'Playwright Test runs in CI.'),
        W('expect', 'دالة التأكد في الاختبارات', 'the assertion function in tests', 'expect(page).toHaveURL checks the URL.'),
        W('web-first assertion', 'تأكيد بيستنى لحد ما الشرط يتحقق', 'an assertion that waits until the condition holds', 'toBeVisible is a web-first assertion.')
      ],
      read: [{ t: 'Playwright: Trace viewer', url: 'https://playwright.dev/docs/trace-viewer', what: B('اقرا Opening the trace.', 'Read Opening the trace.') }, { t: 'Playwright: Docker', url: 'https://playwright.dev/docs/docker', what: B('اقرا Usage.', 'Read Usage.') }],
      challenge: B('حوّل سكربت التنزيل اليومي لخدمة: Express بـ POST /export، Playwright headless بجلسة محفوظة وtracing عند الفشل، Docker، وn8n بيناديه كل يوم ويبعت الملف — مع تنبيه لو فشل.', 'Turn the daily download script into a service: Express with POST /export, headless Playwright with a saved session and tracing on failure, Docker, and n8n calling it daily and emailing the file — with an alert on failure.'),
      quiz: [
        Q(B('السكربت فشل الساعة 3 الفجر:', 'The script failed at 3 a.m.:'), [['افتح الـ trace', 'open the trace'], ['خمّن', 'guess'], ['شغّله تاني وبس', 'just rerun it']], 0, B('كل خطوة متسجلة.', 'Every step recorded.')),
        Q(B('Playwright على سيرفر لينكس:', 'Playwright on a Linux server:'), [['--with-deps أو صورة Docker الرسمية', '--with-deps or the official Docker image'], ['مستحيل', 'impossible'], ['headed بس', 'headed only']], 0, B('مكتبات النظام.', 'System libraries.')),
        Q(B('toBeVisible بـ expect:', 'expect(...).toBeVisible():'), [['بيستنى لحد ما يظهر', 'waits until it appears'], ['بيفحص مرة', 'checks once'], ['بيخفي', 'hides it']], 0, B('web-first.', 'Web-first.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('روبوت متصفح موثوق متصل بـ n8n.', 'A reliable browser robot connected to n8n.'),
      review: [
        B('إمتى Playwright (مفيش API) وبإذن، وlaunch/context/page.', 'When to use Playwright (no API) with permission, and launch/context/page.'),
        B('locators بالمعنى، auto-waiting، strict mode، ومن غير sleep.', 'Locators by meaning, auto-waiting, strict mode and no sleeps.'),
        B('فورمز ورفع وتنزيل وdialogs وframes.', 'Forms, uploads, downloads, dialogs and frames.'),
        B('storageState، وwaitForResponse، وroute، وHAR.', 'storageState, waitForResponse, route and HAR.'),
        B('tracing، Docker، خدمة لـ n8n، وPlaywright Test.', 'Tracing, Docker, a service for n8n and Playwright Test.')
      ],
      project: B('ابني «روبوت تقارير البوابة» (على موقع تجريبي أو موقع عندك إذن عليه): تسجيل دخول مرة بـ storageState، سكربت يومي headless يدخل، يغيّر فلتر التاريخ، يلقط JSON من الشبكة لو موجود أو يقرا الجدول بـ locators، ينزّل ملف Excel، ويرجّع ملخص — مع منع الصور، tracing وscreenshot عند الفشل، خدمة Express بـ POST /run، Docker، وworkflow n8n يناديه كل يوم 8 الصبح ويبعت الملف والملخص على Telegram.', 'Build a «portal report robot» (on a demo site or one you have permission for): a one-time login with storageState, a daily headless script that signs in, sets the date filter, captures the JSON from the network if available or reads the table with locators, downloads an Excel file and returns a summary — with images blocked, tracing and a screenshot on failure, an Express service with POST /run, Docker, and an n8n workflow calling it daily at 8 a.m. and sending the file and summary to Telegram.'),
      test: [
        Q(B('موقع عنده API رسمي:', 'A site with an official API:'), [['الـ API', 'the API'], ['Playwright', 'Playwright'], ['نسخ يدوي', 'manual copying']], 0, B('أثبت.', 'More stable.')),
        Q(B('browser context:', 'A browser context:'), [['جلسة معزولة بكوكيزها', 'an isolated session with its own cookies'], ['تبويب', 'a tab'], ['إضافة', 'an extension']], 0, B('بروفايل نضيف.', 'A clean profile.')),
        Q(B('codegen:', 'codegen:'), [['يسجّل خطواتك كود', 'records your steps as code'], ['يرسم', 'draws'], ['يختبر الأداء', 'tests performance']], 0, B('بداية.', 'A starting point.')),
        Q(B('أحسن locator لخانة البريد:', 'Best locator for the email field:'), ['getByLabel("Email")', '"input:nth-child(4)"', '"#f_23a"'], 0, B('بالمعنى.', 'By meaning.')),
        Q(B('بدل sleep:', 'Instead of sleep:'), [['auto-waiting وexpect', 'auto-waiting and expect'], ['sleep أطول', 'a longer sleep'], ['loop', 'a loop']], 0, B('مش flaky.', 'Not flaky.')),
        Q(B('3 عناصر وclick:', '3 matches and a click:'), [['خطأ strict', 'a strict-mode error'], ['الأول', 'the first'], ['عشوائي', 'random']], 0, B('حماية.', 'Protection.')),
        Q(B('رفع ملف:', 'Uploading a file:'), ['setInputFiles', 'fill', 'type'], 0, B('input file.', 'A file input.')),
        Q(B('تنزيل ملف:', 'Downloading a file:'), [['waitForEvent("download") مع الضغط', 'waitForEvent("download") with the click'], ['goto للرابط', 'goto the link'], ['screenshot', 'screenshot']], 0, B('Promise.all.', 'Promise.all.')),
        Q(B('تسجيل دخول كل يوم:', 'Logging in every day:'), [['storageState محفوظ', 'a saved storageState'], ['كلمة السر في الكود', 'the password in code'], ['captcha', 'a captcha']], 0, B('session reuse.', 'Session reuse.')),
        Q(B('البيانات من API داخلي للصفحة:', 'Data from the page’s internal API:'), ['waitForResponse', 'innerHTML', 'pdf'], 0, B('JSON.', 'JSON.')),
        Q(B('أسرع تحميل صفحات:', 'Faster page loads:'), [['route يمنع الصور والخطوط', 'route blocking images and fonts'], ['headed', 'headed'], ['slowMo', 'slowMo']], 0, B('أقل بيانات.', 'Less data.')),
        Q(B('ملف trace بيتفتح بـ:', 'A trace file opens with:'), ['npx playwright show-trace', 'node trace.zip', 'Excel'], 0, B('trace viewer.', 'The trace viewer.'))
      ] }
  ]
};
