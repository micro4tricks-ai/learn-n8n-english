// Python week 33 — Browser automation with Playwright.
// Playwright examples are display-only (they need a real browser); run them on your machine.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('أتمتة المتصفح بـ Playwright', 'Browser automation with Playwright'),
  goal: B('تأتمت أي موقع مفيهوش API بثبات: locators بالدور والنص، جلسات محفوظة، فورمات وملفات، اعتراض الشبكة، وأدوات تتبع وتصحيح، وتشغيل على سيرفر — وفي حدود الشروط والقانون.',
          'Automate any website without an API, reliably: locators by role and text, saved sessions, forms and files, network interception, tracing and debugging tools, and running on a server — within the terms and the law.'),
  days: [
    { title: B('locators مستقرة', 'Stable locators'),
      goal: B('تختار عناصر الصفحة بطريقة متتكسرش مع أول تحديث للموقع.', 'Select page elements in a way that does not break with the site’s first update.'),
      learn: [
        L(B('browser وcontext وpage', 'Browser, context and page'),
          B('**browser** (كروم/فايرفوكس)، و**browser context** (جلسة معزولة زي نافذة متخفية: كوكيز ومخزن خاص)، و**page** (تبويب). context لكل حساب أو مهمة = عزل كامل من غير ما تفتح متصفح جديد.', 'The **browser** (Chrome/Firefox), the **browser context** (an isolated session like a private window: its own cookies and storage), and the **page** (a tab). One context per account or task = full isolation without launching a new browser.'),
          'from playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=True)\n    context = browser.new_context(locale="ar-EG", timezone_id="Africa/Cairo")\n    page = context.new_page()\n    page.goto("https://books.toscrape.com/")\n    print(page.title())\n    browser.close()'),
        L(B('get_by_role وget_by_text', 'get_by_role and get_by_text'),
          B('أثبت locators هي اللي بيشوفها المستخدم: `page.get_by_role("button", name="Save")`، `get_by_label("Email")`، `get_by_text("Add to basket")`. أقل ثبات: CSS طويل زي `div > div:nth-child(3) span`. ولو المطوّرين حاطين `data-testid`، استخدمه.', 'The most stable locators are what the user sees: `page.get_by_role("button", name="Save")`, `get_by_label("Email")`, `get_by_text("Add to basket")`. Least stable: long CSS like `div > div:nth-child(3) span`. If developers added `data-testid`, use it.'),
          'page.get_by_label("Email").fill("demo@example.com")\npage.get_by_role("button", name="Sign in").click()\npage.get_by_test_id("order-total").inner_text()\n# ✗ page.locator("#app > div:nth-child(2) > form > button").click()'),
        L(B('الانتظار التلقائي وexpect', 'Auto-waiting and expect'),
          B('Playwright بيستنى لوحده (**auto-waiting**) لحد ما العنصر يظهر ويبقى قابل للضغط — متحطش `sleep`. وللتأكد استخدم `expect(locator).to_have_text(...)` اللي بيعيد المحاولة لحد مهلة. الـ sleep الثابت = بطء أو فشل عشوائي.', 'Playwright waits by itself (**auto-waiting**) until the element appears and is clickable — do not add `sleep`. To check, use `expect(locator).to_have_text(...)`, which retries up to a timeout. A fixed sleep = slowness or random failures.'),
          'from playwright.sync_api import expect\n\npage.get_by_role("button", name="Search").click()\nexpect(page.get_by_test_id("results-count")).to_have_text("24 results", timeout=10_000)\n# ✗ time.sleep(5)')
      ],
      practice: [
        B('افتح books.toscrape.com واطبع أسماء أول 5 كتب بـ locators بالدور والنص.', 'Open books.toscrape.com and print the first 5 book titles with role and text locators.'),
        B('اعمل contextين معزولين في نفس المتصفح.', 'Create two isolated contexts in the same browser.'),
        B('بدّل كل sleep في سكربت قديم بـ expect.', 'Replace every sleep in an old script with expect.'),
        B('قارن locator بالدور مع CSS طويل بعد تعديل HTML بسيط.', 'Compare a role locator with a long CSS one after a small HTML change.')
      ],
      words: [
        W('browser context', 'جلسة متصفح معزولة بكوكيز خاصة', 'an isolated browser session with its own cookies', 'Use one browser context per account.'),
        W('get_by_role', 'اختيار عنصر بدوره (زر، رابط) واسمه', 'selecting an element by its role (button, link) and name', 'get_by_role("button", name="Save") is stable.'),
        W('auto-waiting', 'انتظار تلقائي لحد ما العنصر يبقى جاهز', 'waiting automatically until an element is ready', 'Auto-waiting removes the need for sleep.'),
        W('expect assertion', 'تأكيد بيعيد المحاولة لحد مهلة', 'a check that retries up to a timeout', 'An expect assertion waits for the text.'),
        W('data-testid', 'خاصية HTML مخصوصة للاختبار والأتمتة', 'an HTML attribute meant for tests and automation', 'Ask developers to add data-testid.')
      ],
      read: ['lib:Playwright for Python', { t: 'Playwright Python: Locators', url: 'https://playwright.dev/python/docs/locators', what: B('اقرا الأولويات المقترحة للـ locators.', 'Read the recommended locator priorities.') }],
      challenge: B('اكتب سكربت Playwright لموقع تدريب (books.toscrape.com أو quotes.toscrape.com) بيجمع بيانات 3 صفحات بـ locators بالدور والنص وexpect، من غير ولا sleep.', 'Write a Playwright script for a practice site (books.toscrape.com or quotes.toscrape.com) that collects 3 pages of data with role/text locators and expect, with no sleep at all.'),
      quiz: [
        Q(B('أثبت locator:', 'The most stable locator:'), [['get_by_role("button", name="Save")', 'get_by_role("button", name="Save")'], ['div:nth-child(3) > span', 'div:nth-child(3) > span'], ['XPath طويل', 'a long XPath']], 0, B('اللي المستخدم بيشوفه.', 'What the user sees.')),
        Q(B('بدل time.sleep(5):', 'Instead of time.sleep(5):'), [['expect(...) أو الانتظار التلقائي', 'expect(...) or auto-waiting'], ['sleep(10)', 'sleep(10)'], ['ولا حاجة', 'nothing']], 0, B('ثابت وسريع.', 'Stable and fast.')),
        Q(B('browser context:', 'A browser context is:'), [['جلسة معزولة', 'an isolated session'], ['تبويب', 'a tab'], ['متصفح جديد', 'a new browser']], 0, B('كوكيز خاصة.', 'Its own cookies.'))
      ] },

    { title: B('تسجيل الدخول والجلسات', 'Logging in and sessions'),
      goal: B('تسجّل دخول مرة وتعيد استخدام الجلسة بأمان.', 'Log in once and reuse the session safely.'),
      learn: [
        L(B('storage state', 'Storage state'),
          B('سجّل الدخول مرة واحفظ **storage state** (الكوكيز والـ localStorage) في ملف، وبعدين كل تشغيل يبدأ بيه من غير ما يعيد الدخول. أسرع، وأقل احتمال إن الموقع يقفل حسابك لكتر الدخول. الملف ده سر: في `.gitignore`.', 'Log in once and save the **storage state** (cookies and localStorage) to a file, then start every run from it without logging in again. Faster, and less likely the site locks your account for too many logins. That file is a secret: put it in `.gitignore`.'),
          '# once (headed, you may solve 2FA by hand)\ncontext = browser.new_context()\npage = context.new_page()\npage.goto("https://portal.example.com/login")\n# … log in …\ncontext.storage_state(path="state/portal.json")\n\n# every later run\ncontext = browser.new_context(storage_state="state/portal.json")'),
        L(B('الأسرار والـ 2FA', 'Secrets and 2FA'),
          B('الباسورد من `.env` أو مدير أسرار، مش في الكود. لو فيه **two-factor** (2FA)، متحاولش تتحايل عليه: سجّل الدخول يدوي مرة واحفظ الجلسة، ولما تنتهي السكربت يبعتلك تنبيه «جدّد الدخول». ومتأتمتش حساب حد تاني من غير إذنه.', 'The password comes from `.env` or a secrets manager, never the code. If there is **two-factor** authentication (2FA), do not try to bypass it: log in by hand once and save the session, and when it expires the script alerts you to «renew the login». Never automate someone else’s account without permission.'),
          'if page.url.endswith("/login"):\n    notify("Portal session expired — please log in again and save the state.")\n    raise SystemExit(2)'),
        L(B('الشروط والقانون', 'Terms and the law'),
          B('قبل أي أتمتة: اقرا شروط الاستخدام (ToS). مواقع كتير بتمنع الأتمتة أو بتسمح بـ API بس. لو فيه API رسمي استخدمه. اشتغل على حساباتك أو بإذن مكتوب من العميل، وبمعدل مش بيضغط على الموقع.', 'Before any automation: read the terms of service (ToS). Many sites forbid automation or allow only an API. If there is an official API, use it. Work on your own accounts or with the client’s written permission, at a rate that does not strain the site.'),
          'checklist: official API? ToS allows automation? my account / written permission? polite rate?', T)
      ],
      practice: [
        B('سجّل دخول موقع تدريب (مثلًا the-internet.herokuapp.com/login) واحفظ الجلسة.', 'Log into a practice site (e.g. the-internet.herokuapp.com/login) and save the session.'),
        B('ابدأ تشغيلة جديدة من الجلسة المحفوظة.', 'Start a new run from the saved session.'),
        B('اعمل تنبيه لما الجلسة تنتهي.', 'Add an alert when the session expires.'),
        B('اكتب checklist الشروط لموقع عايز تأتمته.', 'Write the terms checklist for a site you want to automate.')
      ],
      words: [
        W('storage state', 'الكوكيز والتخزين المحفوظ لجلسة', 'the saved cookies and storage of a session', 'Reuse the storage state to skip login.'),
        W('two-factor', 'تأكيد دخول بخطوة تانية زي كود', 'a second login step such as a code', 'Do not bypass two-factor authentication.'),
        W('session expiry', 'انتهاء صلاحية جلسة الدخول', 'a login session ceasing to be valid', 'Alert on session expiry.'),
        W('written permission', 'إذن مكتوب من صاحب الحساب أو الموقع', 'written consent from the account or site owner', 'Automate a client portal only with written permission.'),
        W('headed mode', 'تشغيل المتصفح ظاهر', 'running the browser visibly', 'Use headed mode for the first login.')
      ],
      read: [{ t: 'Playwright Python: Authentication', url: 'https://playwright.dev/python/docs/auth', what: B('اقرا إعادة استخدام حالة الدخول.', 'Read reusing the signed-in state.') }, 'lib:Google: robots.txt introduction'],
      challenge: B('أتمت بوابة تجريبية بتسجيل دخول: الباسورد من .env، جلسة محفوظة في ملف متجاهل في Git، اكتشاف انتهاء الجلسة بتنبيه، وتقرير بيانات من صفحة داخلية.', 'Automate a practice portal with a login: the password from .env, the session saved in a file ignored by Git, session-expiry detection with an alert, and a data report from an inner page.'),
      quiz: [
        Q(B('ملف storage state:', 'The storage state file:'), [['سر؛ مكانه .gitignore', 'is a secret; it belongs in .gitignore'], ['يتنشر عادي', 'can be published'], ['مش مهم', 'is unimportant']], 0, B('فيه جلستك.', 'It holds your session.')),
        Q(B('موقع فيه 2FA:', 'A site with 2FA:'), [['دخول يدوي مرة وحفظ الجلسة', 'log in by hand once and save the session'], ['تحايل على الكود', 'bypass the code'], ['استسلم', 'give up']], 0, B('من غير تحايل.', 'No bypassing.')),
        Q(B('لو فيه API رسمي:', 'If there is an official API:'), [['استخدمه بدل المتصفح', 'use it instead of the browser'], ['تجاهله', 'ignore it'], ['استخدم الاتنين دايمًا', 'always use both']], 0, B('أثبت وأنضف.', 'More stable and cleaner.'))
      ] },

    { title: B('الفورمات والملفات', 'Forms and files'),
      goal: B('تملأ فورمات وترفع وتنزّل ملفات وتتعامل مع النوافذ.', 'Fill forms, upload and download files, and handle pop-ups.'),
      learn: [
        L(B('فورمات من بيانات', 'Forms from data'),
          B('اقرا البيانات من CSV أو قاعدة بيانات واملأ الفورم لكل صف: `fill` للنص، `select_option` للقوايم، `check` للمربعات. وبعد الإرسال اتأكد من رسالة النجاح بـ expect وسجّل النتيجة لكل صف — لو صف فشل كمّل الباقي.', 'Read the data from a CSV or database and fill the form for each row: `fill` for text, `select_option` for dropdowns, `check` for boxes. After submitting, confirm the success message with expect and log the result per row — if a row fails, continue with the rest.'),
          'for row in rows:\n    try:\n        page.goto(FORM_URL)\n        page.get_by_label("Name").fill(row["name"])\n        page.get_by_label("City").select_option(row["city"])\n        page.get_by_label("I agree").check()\n        page.get_by_role("button", name="Submit").click()\n        expect(page.get_by_text("Thank you")).to_be_visible()\n        log(row, "ok")\n    except Exception as e:\n        log(row, f"failed: {e}")'),
        L(B('رفع وتنزيل', 'Upload and download'),
          B('الرفع: `set_input_files("invoice.pdf")` على خانة الملف. التنزيل: `with page.expect_download() as d: ...click()` وبعدين `d.value.save_as(path)` باسم منظم. المتصفح الآلي مش بيحفظ لوحده في Downloads.', 'Upload: `set_input_files("invoice.pdf")` on the file field. Download: `with page.expect_download() as d: ...click()` then `d.value.save_as(path)` with a tidy name. The automated browser does not save to Downloads by itself.'),
          'page.get_by_label("Attachment").set_input_files("invoices/INV-778.pdf")\n\nwith page.expect_download() as info:\n    page.get_by_role("link", name="Export CSV").click()\ninfo.value.save_as(f"exports/orders_{date.today()}.csv")'),
        L(B('نوافذ وiframes', 'Dialogs and iframes'),
          B('رسايل التأكيد (`confirm`) بتتقفل لوحدها افتراضيًا؛ لو عايز توافق: `page.once("dialog", lambda d: d.accept())`. والعناصر جوه **iframe** (زي بوابات الدفع أو الخرايط) محتاجة `page.frame_locator("iframe#pay").get_by_label(...)`.', 'Confirmation dialogs (`confirm`) are dismissed by default; to accept: `page.once("dialog", lambda d: d.accept())`. Elements inside an **iframe** (like payment widgets or maps) need `page.frame_locator("iframe#pay").get_by_label(...)`.'),
          'page.once("dialog", lambda d: d.accept())\npage.get_by_role("button", name="Delete draft").click()\n\nframe = page.frame_locator("iframe[title=\'Address\']")\nframe.get_by_label("Street").fill("12 Tahrir St")')
      ],
      practice: [
        B('املأ فورم تدريب من CSV بـ 5 صفوف وسجّل النتيجة لكل صف.', 'Fill a practice form from a 5-row CSV and log the result per row.'),
        B('ارفع ملف وتأكد إنه وصل.', 'Upload a file and confirm it arrived.'),
        B('نزّل ملف واحفظه باسم فيه التاريخ.', 'Download a file and save it with the date in its name.'),
        B('تعامل مع confirm وiframe في the-internet.herokuapp.com.', 'Handle a confirm and an iframe on the-internet.herokuapp.com.')
      ],
      words: [
        W('select_option', 'اختيار قيمة من قايمة منسدلة', 'choosing a value from a dropdown', 'select_option picks the city.'),
        W('set_input_files', 'رفع ملف في خانة ملفات', 'putting a file into an upload field', 'set_input_files attaches the invoice.'),
        W('expect_download', 'انتظار تنزيل والإمساك بيه', 'waiting for and capturing a download', 'Use expect_download around the click.'),
        W('dialog', 'نافذة تنبيه أو تأكيد من المتصفح', 'a browser alert or confirmation window', 'Accept the dialog before deleting.'),
        W('frame_locator', 'اختيار عناصر جوه iframe', 'selecting elements inside an iframe', 'Use frame_locator for the payment form.')
      ],
      read: [{ t: 'Playwright Python: Downloads', url: 'https://playwright.dev/python/docs/downloads', what: B('اقرا الإمساك بالتنزيل وحفظه.', 'Read capturing and saving downloads.') }, 'lib:Playwright for Python'],
      challenge: B('اعمل «مدخّل بيانات» آلي: يقرا 20 صف من CSV، يملأ فورم تدريب، يرفع ملف لكل صف، يتأكد من النجاح، يسجّل النتيجة، ويكمّل لو صف فشل — وتقرير في الآخر.', 'Build an automated «data entry clerk»: read 20 rows from a CSV, fill a practice form, upload a file per row, confirm success, log each result, continue if a row fails — and a report at the end.'),
      quiz: [
        Q(B('صف فشل في الإدخال:', 'A row failed during entry:'), [['سجّل وكمّل الباقي', 'log it and continue'], ['وقّف كله', 'stop everything'], ['أعد للأبد', 'retry forever']], 0, B('مرونة.', 'Resilience.')),
        Q(B('عنصر جوه iframe:', 'An element inside an iframe:'), [['frame_locator', 'frame_locator'], ['locator عادي', 'a plain locator'], ['مستحيل', 'impossible']], 0, B('إطار.', 'A frame.')),
        Q(B('التنزيل بيتمسك بـ:', 'A download is captured with:'), [['expect_download', 'expect_download'], ['sleep', 'sleep'], ['screenshot', 'screenshot']], 0, B('حوالين الضغطة.', 'Around the click.'))
      ] },

    { title: B('الشبكة من جوه المتصفح', 'The network inside the browser'),
      goal: B('تطلع البيانات من طلبات الصفحة نفسها وتسرّع الأتمتة.', 'Get data from the page’s own requests and speed up automation.'),
      learn: [
        L(B('خد الـ JSON بدل الـ HTML', 'Take the JSON, not the HTML'),
          B('مواقع كتير بتجيب بياناتها بطلب API داخلي (افتح DevTools ← Network). بدل ما تقرا HTML، استنى الرد ده: `with page.expect_response(lambda r: "/api/orders" in r.url) as resp:` وخد `resp.value.json()`. أدق وأقل تكسّر.', 'Many sites load their data through an internal API request (open DevTools → Network). Instead of reading HTML, wait for that response: `with page.expect_response(lambda r: "/api/orders" in r.url) as resp:` and take `resp.value.json()`. More accurate and less fragile.'),
          'with page.expect_response(lambda r: "/api/products" in r.url and r.status == 200) as resp:\n    page.get_by_role("button", name="Load more").click()\ndata = resp.value.json()\nprint(len(data["items"]), "items")'),
        L(B('حجب اللي مش محتاجه', 'Block what you do not need'),
          B('**network interception** بـ `page.route`: احجب الصور والخطوط والإعلانات والتحليلات → الصفحة أسرع جدًا وبيانات أقل. وكمان تقدر ترجّع رد وهمي للاختبار.', '**Network interception** with `page.route`: block images, fonts, ads and analytics → the page is much faster and uses less data. You can also return a fake response for testing.'),
          'BLOCK = ("image", "font", "media")\npage.route("**/*", lambda route: route.abort() if route.request.resource_type in BLOCK else route.continue_())\npage.route("**/analytics/**", lambda route: route.abort())'),
        L(B('من المتصفح لـ requests', 'From the browser to requests'),
          B('أحيانًا أحسن خطة: استخدم المتصفح بس لتسجيل الدخول، وبعدين انقل الكوكيز لـ `requests.Session` أو httpx ونادي الـ API الداخلي مباشرة — أسرع 10×. (بشرط إن الشروط تسمح.)', 'Sometimes the best plan: use the browser only to log in, then move the cookies into a `requests.Session` or httpx and call the internal API directly — 10× faster. (Provided the terms allow it.)'),
          'cookies = {c["name"]: c["value"] for c in context.cookies()}\nwith httpx.Client(cookies=cookies, headers={"User-Agent": UA}) as client:\n    r = client.get("https://portal.example.com/api/orders?page=1", timeout=20)\n    r.raise_for_status()')
      ],
      practice: [
        B('افتح Network في DevTools لموقع ولاقي طلب البيانات.', 'Open Network in DevTools for a site and find the data request.'),
        B('خد الـ JSON بـ expect_response.', 'Capture the JSON with expect_response.'),
        B('احجب الصور وقيس الوقت قبل وبعد.', 'Block images and measure the time before and after.'),
        B('انقل كوكيز لـ httpx ونادي API داخلي (موقع تدريب).', 'Move cookies into httpx and call an internal API (practice site).')
      ],
      words: [
        W('network interception', 'التحكم في طلبات الصفحة (حجب، تعديل)', 'controlling a page’s requests (blocking, changing)', 'Network interception blocked the ads.'),
        W('expect_response', 'انتظار رد شبكة معيّن والإمساك بيه', 'waiting for and capturing a specific network reply', 'expect_response grabbed the products JSON.'),
        W('route', 'قاعدة بتقرر يحصل إيه لطلب', 'a rule deciding what happens to a request', 'page.route aborts image requests.'),
        W('resource type', 'نوع الطلب (صورة، سكربت، xhr)', 'the kind of request (image, script, xhr)', 'Block by resource type.'),
        W('internal api', 'API الموقع بيستخدمه لنفسه', 'an API a site uses for itself', 'The page loads products from an internal API.')
      ],
      read: [{ t: 'Playwright Python: Network', url: 'https://playwright.dev/python/docs/network', what: B('اقرا route وwaiting for responses.', 'Read route and waiting for responses.') }, 'lib:HTTPX documentation'],
      challenge: B('حوّل سكربت قراءة HTML لسكربت بياخد JSON من طلب الصفحة الداخلي، مع حجب الصور، وقارن الوقت والدقة.', 'Turn an HTML-reading script into one that takes JSON from the page’s internal request, with images blocked, and compare time and accuracy.'),
      quiz: [
        Q(B('أدق طريقة لبيانات بتتحمّل بـ API داخلي:', 'The most accurate way to get data loaded by an internal API:'), [['expect_response وjson()', 'expect_response and json()'], ['قراءة HTML', 'reading HTML'], ['screenshot', 'a screenshot']], 0, B('البيانات نفسها.', 'The data itself.')),
        Q(B('حجب الصور بيعمل:', 'Blocking images:'), [['صفحة أسرع وبيانات أقل', 'a faster page and less data'], ['أخطاء', 'errors'], ['تسجيل خروج', 'a logout']], 0, B('route.', 'route.')),
        Q(B('المتصفح للدخول وhttpx للـ API:', 'The browser to log in and httpx for the API:'), [['أسرع بكتير لو الشروط تسمح', 'much faster if the terms allow'], ['ممنوع دايمًا', 'always forbidden'], ['أبطأ', 'slower']], 0, B('أفضل الاتنين.', 'Best of both.'))
      ] },

    { title: B('الثبات والتصحيح والتشغيل', 'Reliability, debugging and running'),
      goal: B('سكربت متصفح بيشتغل كل يوم على سيرفر، ولو فشل تعرف ليه في دقيقة.', 'A browser script that runs daily on a server, and if it fails you know why in a minute.'),
      learn: [
        L(B('codegen وtrace', 'codegen and trace'),
          B('`playwright codegen URL` بيسجّل اللي بتعمله ويكتبه كود — بداية سريعة (نضّفه بعدين). و**trace viewer**: فعّل `context.tracing.start(screenshots=True, snapshots=True)` واحفظ لما يفشل؛ `playwright show-trace trace.zip` بيوريك كل خطوة بالصور والشبكة.', '`playwright codegen URL` records what you do and writes it as code — a quick start (clean it up later). And the **trace viewer**: enable `context.tracing.start(screenshots=True, snapshots=True)` and save it on failure; `playwright show-trace trace.zip` shows every step with screenshots and network.'),
          'context.tracing.start(screenshots=True, snapshots=True)\ntry:\n    run(page)\nexcept Exception:\n    context.tracing.stop(path=f"traces/fail_{datetime.now():%Y%m%d_%H%M}.zip")\n    page.screenshot(path="traces/last_error.png", full_page=True)\n    raise'),
        L(B('page object', 'The page object'),
          B('**page object pattern**: class لكل صفحة فيها locators ودوال بأسماء بيزنس (`OrdersPage.export_csv()`). لو الموقع اتغير، تصلّح في مكان واحد. والسكربت الرئيسي بيتقري زي خطوات بيزنس.', 'The **page object pattern**: one class per page holding locators and business-named methods (`OrdersPage.export_csv()`). If the site changes, you fix it in one place. The main script reads like business steps.'),
          'class OrdersPage:\n    def __init__(self, page):\n        self.page = page\n        self.export = page.get_by_role("link", name="Export CSV")\n    def open(self):\n        self.page.goto(f"{BASE}/orders")\n    def export_csv(self, path):\n        with self.page.expect_download() as d:\n            self.export.click()\n        d.value.save_as(path)\n\norders = OrdersPage(page); orders.open(); orders.export_csv("exports/today.csv")'),
        L(B('تشغيل على سيرفر', 'Running on a server'),
          B('على سيرفر لينكس: `playwright install --with-deps chromium` و`headless=True`، أو الصورة الرسمية لـ Docker. حط مهلات، وإعادة محاولة للخطوة اللي بتفشل أحيانًا، وتنبيه بالـ screenshot لو فشل، وجدولة بـ cron أو n8n.', 'On a Linux server: `playwright install --with-deps chromium` and `headless=True`, or the official Docker image. Add timeouts, a retry for the step that sometimes fails, an alert with the screenshot on failure, and schedule it with cron or n8n.'),
          'FROM mcr.microsoft.com/playwright/python:v1.48.0-noble\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "-m", "bot.export_orders"]', T)
      ],
      practice: [
        B('سجّل سكربت بـ codegen ونضّفه.', 'Record a script with codegen and clean it up.'),
        B('فعّل trace واحفظه لما يفشل وافتحه بـ show-trace.', 'Enable tracing, save it on failure and open it with show-trace.'),
        B('أعد كتابة سكربت بـ page objects.', 'Rewrite a script with page objects.'),
        B('شغّل السكربت headless في Docker.', 'Run the script headless in Docker.')
      ],
      words: [
        W('codegen', 'أداة بتسجّل خطواتك وتحوّلها كود', 'a tool that records your steps and turns them into code', 'Start with codegen, then clean up.'),
        W('trace viewer', 'أداة بتعرض كل خطوة في تشغيل فاشل', 'a tool showing every step of a failed run', 'The trace viewer showed a cookie banner.'),
        W('page object pattern', 'class لكل صفحة فيها عناصرها وأفعالها', 'a class per page holding its elements and actions', 'The page object pattern keeps locators in one place.'),
        W('headless', 'تشغيل المتصفح من غير واجهة', 'running the browser without a visible window', 'Servers run Chromium headless.'),
        W('full_page', 'لقطة للصفحة كلها مش الظاهر بس', 'a screenshot of the whole page, not just the visible part', 'Save a full_page screenshot on failure.')
      ],
      read: [{ t: 'Playwright Python: Trace viewer', url: 'https://playwright.dev/python/docs/trace-viewer-intro', what: B('اقرا تسجيل وفتح الـ trace.', 'Read recording and opening a trace.') }, 'lib:Docker: Python language guide'],
      challenge: B('خلّي سكربت المتصفح جاهز للإنتاج: page objects، trace وscreenshot عند الفشل، إعادة محاولة لخطوة، Docker headless، وجدولة يومية مع تنبيه.', 'Make your browser script production-ready: page objects, a trace and screenshot on failure, a retry for one step, headless Docker, and daily scheduling with an alert.'),
      quiz: [
        Q(B('trace viewer بيوريك:', 'The trace viewer shows:'), [['كل خطوة بالصور والشبكة', 'every step with screenshots and network'], ['الكود بس', 'only the code'], ['السعر', 'the price']], 0, B('تصحيح.', 'Debugging.')),
        Q(B('page object pattern ميزته:', 'The page object pattern’s benefit:'), [['تصليح في مكان واحد لما الموقع يتغيّر', 'one place to fix when the site changes'], ['أسرع تشغيل', 'faster runs'], ['من غير locators', 'no locators']], 0, B('تنظيم.', 'Organisation.')),
        Q(B('على سيرفر من غير شاشة:', 'On a server without a screen:'), [['headless=True', 'headless=True'], ['headed', 'headed'], ['مستحيل', 'impossible']], 0, B('من غير واجهة.', 'No window.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('أتمتة متصفح ثابتة ومسؤولة.', 'Stable, responsible browser automation.'),
      review: [
        B('browser/context/page، locators بالدور والنص، والانتظار التلقائي.', 'Browser/context/page, role and text locators, and auto-waiting.'),
        B('storage state، الأسرار والـ 2FA، والشروط.', 'Storage state, secrets and 2FA, and the terms.'),
        B('الفورمات، الرفع والتنزيل، النوافذ والـ iframes.', 'Forms, uploads and downloads, dialogs and iframes.'),
        B('expect_response، route، ونقل الكوكيز لـ httpx.', 'expect_response, route, and moving cookies to httpx.'),
        B('codegen وtrace وpage objects والتشغيل على سيرفر.', 'codegen, tracing, page objects and running on a server.')
      ],
      project: B('ابني «روبوت بوابة» لموقع تدريب (أو بوابة عندك إذن بيها): دخول بجلسة محفوظة، تصدير تقرير يومي (تنزيل أو JSON داخلي)، إدخال بيانات من CSV، حجب الموارد، page objects، trace عند الفشل، Docker headless، جدولة، وتنبيه — مع README فيه checklist الشروط.', 'Build a «portal robot» for a practice site (or a portal you have permission for): login with a saved session, a daily report export (download or internal JSON), data entry from a CSV, blocked resources, page objects, a trace on failure, headless Docker, scheduling and alerts — with a README containing the terms checklist.'),
      test: [
        Q(B('locator مستقر:', 'A stable locator:'), [['get_by_label("Email")', 'get_by_label("Email")'], ['nth-child(7)', 'nth-child(7)'], ['xpath مطلق', 'an absolute XPath']], 0, B('اللي المستخدم بيشوفه.', 'What users see.')),
        Q(B('auto-waiting بيغني عن:', 'Auto-waiting replaces:'), [['sleep ثابت', 'fixed sleeps'], ['locators', 'locators'], ['expect', 'expect']], 0, B('أسرع وأثبت.', 'Faster and steadier.')),
        Q(B('جلسة دخول محفوظة في:', 'A saved login session lives in:'), [['storage state file', 'a storage state file'], ['الكود', 'the code'], ['README', 'the README']], 0, B('سرية.', 'Secret.')),
        Q(B('2FA:', '2FA:'), [['متتحايلش؛ دخول يدوي مرة', 'do not bypass; log in by hand once'], ['اكسره', 'break it'], ['عطّله عند العميل', 'disable it for the client']], 0, B('أمان.', 'Security.')),
        Q(B('قبل الأتمتة اقرا:', 'Before automating, read:'), [['شروط الاستخدام', 'the terms of service'], ['الأخبار', 'the news'], ['ولا حاجة', 'nothing']], 0, B('قانون.', 'Legal.')),
        Q(B('رفع ملف:', 'Uploading a file:'), [['set_input_files', 'set_input_files'], ['fill', 'fill'], ['type', 'type']], 0, B('خانة ملف.', 'A file field.')),
        Q(B('عنصر جوه بوابة دفع:', 'An element inside a payment widget:'), [['frame_locator', 'frame_locator'], ['locator عادي', 'a plain locator'], ['dialog', 'dialog']], 0, B('iframe.', 'An iframe.')),
        Q(B('expect_response:', 'expect_response:'), [['يمسك رد شبكة معيّن', 'captures a specific network reply'], ['ينتظر نص', 'waits for text'], ['يحجب طلب', 'blocks a request']], 0, B('JSON.', 'JSON.')),
        Q(B('page.route لـ:', 'page.route is for:'), [['حجب أو تعديل الطلبات', 'blocking or changing requests'], ['التنقل', 'navigation'], ['الكوكيز بس', 'only cookies']], 0, B('interception.', 'Interception.')),
        Q(B('codegen:', 'codegen:'), [['بيسجّل خطواتك كود', 'records your steps as code'], ['بيصلّح الأخطاء', 'fixes bugs'], ['بيرفع الموقع', 'deploys the site']], 0, B('بداية سريعة.', 'A quick start.')),
        Q(B('عند الفشل احفظ:', 'On failure, save:'), [['trace وscreenshot', 'a trace and a screenshot'], ['ولا حاجة', 'nothing'], ['الباسورد', 'the password']], 0, B('للتصحيح.', 'For debugging.')),
        Q(B('page object:', 'A page object:'), [['class لكل صفحة بعناصرها وأفعالها', 'a class per page with its elements and actions'], ['صورة', 'an image'], ['فورم', 'a form']], 0, B('تنظيم.', 'Organisation.'))
      ] }
  ]
};
