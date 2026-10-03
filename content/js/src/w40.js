// JavaScript week 40 — Browser extensions, and the month 10 project.
// chrome.* code is shown (it runs only inside an extension); a manifest checker, a content-script extractor in
// jsdom, a background router with a fake chrome API and an offline send queue run here.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
const ORDER_PAGE = '<main class="order"><h1 data-order-id="1042">Order #1042</h1><section class="customer"><span class="name">Mona Ali</span><a class="phone" href="tel:+201012345678">+20 101 234 5678</a><address>12 El-Gomhoreya St, Mansoura</address></section><table class="items"><tr><td class="sku">MUG</td><td class="qty">2</td><td class="price">EGP 120.00</td></tr><tr><td class="sku">BAG</td><td class="qty">1</td><td class="price">EGP 300.50</td></tr></table><p class="total">Total: EGP 540.50</p></main>';
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('إضافات المتصفح ومشروع الشهر', 'Browser extensions, and the month project'),
  goal: B('تبني إضافة Chrome (Manifest V3) بتربط الصفحات اللي فريقك بيشتغل عليها بالأتمتة: content scripts بتقرا البيانات، service worker ورسايل بين الأجزاء، تخزين وتنبيهات وقوايم سياق، إرسال آمن لـ n8n أو API بتاعك، واختبار ونشر — وتجمع شهر الـ AI والتكاملات في مشروع.',
          'Build a Chrome extension (Manifest V3) linking the pages your team works in to automation: content scripts that read data, a service worker and messaging between parts, storage, alarms and context menus, secure sending to n8n or your API, and testing and publishing — and bring the AI and integrations month together in one project.'),
  days: [
    { title: B('تشريح الإضافة', 'Extension anatomy'),
      goal: B('manifest وكل جزء ودوره.', 'The manifest and each part’s role.'),
      learn: [
        L(B('الأجزاء', 'The parts'),
          B('**browser extension** بـ **manifest v3**: ملف **manifest.json** بيعرّف كل حاجة؛ **service worker** (الخلفية — بيصحى على أحداث وبينام)؛ **content script** (بيشتغل جوه الصفحات ويقرا الـ DOM)؛ **popup** (لما تدوس الأيقونة)؛ **options page** للإعدادات؛ و**side panel** لواجهة جنب الصفحة. نفس الإضافة شغالة في Chrome وEdge، وFirefox بتغييرات بسيطة.', 'A **browser extension** with **manifest v3**: a **manifest.json** file defines everything; a **service worker** (the background — wakes on events and sleeps); a **content script** (runs inside pages and reads the DOM); a **popup** (when you click the icon); an **options page** for settings; and a **side panel** for UI beside the page. The same extension runs in Chrome and Edge, and in Firefox with small changes.'),
          'order-helper/\n  manifest.json        name, version, permissions, which scripts run where\n  background.js        service worker: messages, context menu, alarms, calls to n8n\n  content.js           runs on https://admin.example-shop.com/orders/* — reads the order\n  popup.html / .js     «Send to n8n» button + status\n  options.html / .js   n8n webhook URL + the user’s token\n  sidepanel.html       AI-drafted reply beside the order\n  icons/16.png 48.png 128.png', T),
        L(B('الـ manifest وأقل صلاحيات', 'The manifest and least permissions'),
          B('**permissions** بتحدد APIs الإضافة (storage، contextMenus، alarms)، و**host permissions** بتحدد المواقع اللي تقدر تقراها أو تبعتلها. اطلب أقل حاجة: موقع لوحة المتجر بس مش `<all_urls>`، و**activetab** (صلاحية مؤقتة للتاب الحالي لما المستخدم يدوس) بدل صلاحيات دايمة. المثال بيفحص manifest.', '**permissions** set the extension’s APIs (storage, contextMenus, alarms), and **host permissions** set the sites it may read or send to. Ask for the least: only the shop admin site, not `<all_urls>`, and **activetab** (temporary access to the current tab when the user clicks) instead of permanent access. The example checks a manifest.'),
          'const manifest = {\n  manifest_version: 3,\n  name: "Order Helper",\n  version: "1.0.0",\n  permissions: ["storage", "contextMenus", "alarms", "activeTab", "sidePanel"],\n  host_permissions: ["https://admin.example-shop.com/*", "https://n8n.example.com/webhook/*"],\n  background: { service_worker: "background.js", type: "module" },\n  content_scripts: [{ matches: ["https://admin.example-shop.com/orders/*"], js: ["content.js"] }],\n  action: { default_popup: "popup.html" },\n  options_page: "options.html",\n};\n\nfunction review(m) {\n  const notes = [];\n  if (m.manifest_version !== 3) notes.push("use Manifest V3");\n  const hosts = [...(m.host_permissions ?? []), ...(m.content_scripts ?? []).flatMap(c => c.matches)];\n  if (hosts.some(h => h === "<all_urls>" || h.startsWith("*://*/") || h === "https://*/*")) notes.push("too broad: list exact sites");\n  if (hosts.some(h => h.startsWith("http://"))) notes.push("http hosts: use https");\n  for (const p of ["tabs", "history", "cookies", "webRequest"]) if (m.permissions?.includes(p)) notes.push(`sensitive permission «${p}»: justify or remove`);\n  if (m.background?.scripts) notes.push("MV3 uses background.service_worker");\n  return notes.length ? notes : ["looks minimal"];\n}\nconsole.log("order helper:", review(manifest));\nconsole.log("greedy one:  ", review({ manifest_version: 2, permissions: ["tabs", "cookies"], host_permissions: ["<all_urls>", "http://example.com/*"], background: { scripts: ["bg.js"] } }));', N()),
        L(B('دورة حياة الـ service worker', 'The service worker lifecycle'),
          B('الـ service worker في MV3 مش شغال دايمًا: بيصحى على حدث (رسالة، alarm، ضغطة قايمة) وبينام بعد ثواني. فمتحطش حالة في متغيرات global (هتضيع) — خزّنها في `chrome.storage`، وسجّل الـ listeners في أول الملف (مش جوه async).', 'The MV3 service worker is not always running: it wakes on an event (a message, an alarm, a menu click) and sleeps seconds later. So never keep state in global variables (it will be lost) — store it in `chrome.storage`, and register listeners at the top level of the file (not inside async code).'),
          '// background.js — listeners registered synchronously at top level\nchrome.runtime.onInstalled.addListener(() => {\n  chrome.contextMenus.create({ id: "send-order", title: "Send this order to n8n", contexts: ["page"],\n                               documentUrlPatterns: ["https://admin.example-shop.com/orders/*"] });\n  chrome.alarms.create("retry-queue", { periodInMinutes: 5 });\n});\nchrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {\n  handle(msg, sender).then(sendResponse, e => sendResponse({ ok: false, error: e.message }));\n  return true;                                       // keep the channel open for the async reply\n});\n// ✗ let pending = [];   ← lost when the worker sleeps; use chrome.storage.local instead', S)
      ],
      practice: [
        B('اعمل manifest V3 لإضافة بسيطة وحمّلها unpacked.', 'Write an MV3 manifest for a simple extension and load it unpacked.'),
        B('قلّل الصلاحيات لأقل حاجة.', 'Cut the permissions to the minimum.'),
        B('اعمل popup بزرار ورسالة للـ service worker.', 'Build a popup with a button messaging the service worker.'),
        B('شوف الـ service worker بينام في chrome://extensions.', 'Watch the service worker sleep in chrome://extensions.')
      ],
      words: [
        W('browser extension', 'إضافة متصفح', 'an add-on extending the browser', 'Our browser extension sends orders to n8n.'),
        W('manifest v3', 'الإصدار الحالي لنظام الإضافات', 'the current extension platform version', 'Chrome requires Manifest V3.'),
        W('manifest.json', 'ملف تعريف الإضافة', 'the extension’s definition file', 'manifest.json lists the permissions.'),
        W('service worker', 'كود الخلفية اللي بيصحى على أحداث', 'background code woken by events', 'The service worker sleeps after 30 seconds.'),
        W('content script', 'سكربت جوه الصفحة', 'a script running inside web pages', 'The content script reads the order number.'),
        W('popup', 'النافذة الصغيرة للأيقونة', 'the small window under the toolbar icon', 'The popup has a Send button.'),
        W('options page', 'صفحة إعدادات الإضافة', 'the extension’s settings page', 'Enter the webhook URL on the options page.'),
        W('side panel', 'لوحة جانبية جنب الصفحة', 'a panel shown beside the page', 'The AI reply appears in the side panel.'),
        W('host permissions', 'صلاحيات المواقع', 'which sites an extension may access', 'Limit host permissions to the admin site.'),
        W('activetab', 'صلاحية مؤقتة للتاب الحالي', 'temporary access to the current tab', 'activeTab avoids permanent site access.')
      ],
      read: [{ lib: 'Chrome Extensions docs', what: B('اقرا Get started وManifest V3 overview.', 'Read Get started and the Manifest V3 overview.') }],
      challenge: B('ابني هيكل «Order Helper»: manifest V3 بأقل صلاحيات، popup بزرار، service worker بـ listeners في أول الملف، options page بتحفظ رابط n8n — وحمّلها unpacked واتأكد إن الفاحص بيقول «looks minimal».', 'Build the «Order Helper» skeleton: an MV3 manifest with minimal permissions, a popup with a button, a service worker with top-level listeners, an options page saving the n8n URL — load it unpacked and make sure the checker says «looks minimal».'),
      quiz: [
        Q(B('بيقرا الـ DOM بتاع الصفحة:', 'Reads the page’s DOM:'), [['content script', 'the content script'], ['service worker', 'the service worker'], ['manifest', 'the manifest']], 0, B('جوه الصفحة.', 'Inside the page.')),
        Q(B('host_permissions: ["<all_urls>"]:', 'host_permissions: ["<all_urls>"]:'), [['واسعة جدًا: حدد المواقع', 'far too broad: list the sites'], ['مثالي', 'ideal'], ['إجباري', 'required']], 0, B('أقل صلاحية.', 'Least privilege.')),
        Q(B('حالة في متغير global في الـ service worker:', 'State in a global in the service worker:'), [['بتضيع لما ينام: chrome.storage', 'lost when it sleeps: use chrome.storage'], ['آمنة للأبد', 'safe forever'], ['أسرع حل', 'the best option']], 0, B('دورة حياة.', 'Lifecycle.'))
      ] },

    { title: B('content scripts والرسايل', 'Content scripts and messaging'),
      goal: B('تقرا الصفحة وتبعت للخلفية.', 'Read the page and send it to the background.'),
      learn: [
        L(B('قراية الصفحة', 'Reading the page'),
          B('الـ content script بيشتغل في **isolated world**: بيشوف الـ DOM بتاع الصفحة بس مش متغيرات الـ JavaScript بتاعتها. اقرا البيانات بـ selectors ثابتة (data attributes أحسن من classes)، نظّفها، وتحقق منها. المثال بيستخرج طلب من صفحة لوحة تحكم.', 'A content script runs in an **isolated world**: it sees the page’s DOM but not its JavaScript variables. Read data with stable selectors (data attributes beat classes), clean it and validate it. The example extracts an order from an admin page.'),
          'const money = s => Number(String(s).replace(/[^\\d.]/g, ""));\nfunction extractOrder(doc = document) {\n  const root = doc.querySelector("main.order");\n  if (!root) return null;\n  const order = {\n    id: Number(root.querySelector("[data-order-id]")?.dataset.orderId),\n    customer: root.querySelector(".customer .name")?.textContent.trim(),\n    phone: root.querySelector(".customer .phone")?.getAttribute("href")?.replace("tel:", ""),\n    address: root.querySelector(".customer address")?.textContent.trim(),\n    items: [...root.querySelectorAll(".items tr")].map(tr => ({\n      sku: tr.querySelector(".sku")?.textContent.trim(),\n      qty: Number(tr.querySelector(".qty")?.textContent),\n      price: money(tr.querySelector(".price")?.textContent),\n    })),\n    total: money(root.querySelector(".total")?.textContent),\n  };\n  const sum = order.items.reduce((s, it) => s + it.qty * it.price, 0);\n  order.check = Math.abs(sum - order.total) < 0.01 ? "totals match" : `mismatch: items ${sum} vs total ${order.total}`;\n  return order;\n}\nconsole.log(JSON.stringify(extractOrder(), null, 1));', { run: 'js', html: ORDER_PAGE }),
        L(B('تبادل الرسايل', 'Message passing'),
          B('الأجزاء بتتكلم بـ **message passing**: الـ content script بيبعت بـ `chrome.runtime.sendMessage`، والـ popup بيكلّم تاب بـ `chrome.tabs.sendMessage`، والـ service worker بيرد. خلي الرسايل بأنواع واضحة (`{type: "ORDER_EXTRACTED", order}`) وتحقق منها في الخلفية — متثقش في أي رسالة جاية من صفحة.', 'The parts talk through **message passing**: the content script sends with `chrome.runtime.sendMessage`, the popup talks to a tab with `chrome.tabs.sendMessage`, and the service worker replies. Use clearly typed messages (`{type: "ORDER_EXTRACTED", order}`) and validate them in the background — never trust a message coming from a page.'),
          '// content.js\nconst order = extractOrder();\nif (order) chrome.runtime.sendMessage({ type: "ORDER_EXTRACTED", order });\n\nchrome.runtime.onMessage.addListener((msg, _sender, reply) => {\n  if (msg.type === "GET_ORDER") reply({ order: extractOrder() });   // the popup asks the page\n});\n\n// popup.js\nconst [tab] = await chrome.tabs.query({ active: true, currentWindow: true });\nconst { order: current } = await chrome.tabs.sendMessage(tab.id, { type: "GET_ORDER" });\ndocument.querySelector("#summary").textContent = current ? `#${current.id} · ${current.total} EGP` : "Open an order page";', S),
        L(B('router في الخلفية', 'A router in the background'),
          B('في الخلفية: router بيوجّه كل نوع رسالة لـ handler، ويتحقق من المرسل (الرسالة جاية من الإضافة نفسها ومن الموقع المسموح؟) ومن البيانات. المثال بيشغّل الـ router بـ chrome API وهمي.', 'In the background: a router sends each message type to a handler, checking the sender (does the message come from this extension and from the allowed site?) and the data. The example runs the router with a fake chrome API.'),
          'const EXT_ID = "abcdefghijklmnopabcdefghijklmnop";\nconst store = new Map();\nconst chrome = { runtime: { id: EXT_ID }, storage: { local: {\n  get: async k => ({ [k]: store.get(k) }), set: async o => Object.entries(o).forEach(([k, v]) => store.set(k, v)) } } };\n\nconst handlers = {\n  async ORDER_EXTRACTED({ order }) {\n    if (!Number.isInteger(order?.id) || !Array.isArray(order.items)) throw new Error("invalid order");\n    const { recent = [] } = await chrome.storage.local.get("recent");\n    await chrome.storage.local.set({ recent: [order.id, ...recent.filter(id => id !== order.id)].slice(0, 10) });\n    return { ok: true, saved: order.id };\n  },\n  async GET_RECENT() { return { recent: (await chrome.storage.local.get("recent")).recent ?? [] }; },\n};\nasync function route(msg, sender) {\n  if (sender.id !== chrome.runtime.id) return { ok: false, error: "foreign sender" };\n  if (sender.url && !sender.url.startsWith("https://admin.example-shop.com/")) return { ok: false, error: "page not allowed" };\n  const h = handlers[msg?.type];\n  if (!h) return { ok: false, error: `unknown message ${msg?.type}` };\n  try { return await h(msg); } catch (e) { return { ok: false, error: e.message }; }\n}\nconst fromPage = { id: EXT_ID, url: "https://admin.example-shop.com/orders/1042" };\nconsole.log(await route({ type: "ORDER_EXTRACTED", order: { id: 1042, items: [] } }, fromPage));\nconsole.log(await route({ type: "ORDER_EXTRACTED", order: { id: "x" } }, fromPage));\nconsole.log(await route({ type: "ORDER_EXTRACTED", order: { id: 7, items: [] } }, { id: EXT_ID, url: "https://evil.example/" }));\nconsole.log(await route({ type: "DELETE_ALL" }, fromPage));\nconsole.log(await route({ type: "GET_RECENT" }, { id: EXT_ID }));', N())
      ],
      practice: [
        B('اكتب content script بيستخرج بيانات من صفحة بتستخدمها.', 'Write a content script extracting data from a page you use.'),
        B('ابعت البيانات للخلفية برسالة بنوع.', 'Send the data to the background as a typed message.'),
        B('اعمل router بيتحقق من المرسل والبيانات.', 'Build a router that checks sender and data.'),
        B('خلي الـ popup يسأل التاب الحالي.', 'Make the popup ask the current tab.')
      ],
      words: [
        W('isolated world', 'بيئة معزولة للـ content script', 'the separate JS context of a content script', 'In its isolated world the script cannot see page variables.'),
        W('message passing', 'تبادل الرسايل بين الأجزاء', 'communication between extension parts', 'Message passing links the popup and the page.'),
        W('sendmessage', 'إرسال رسالة', 'the API call that sends a message', 'The content script calls sendMessage.'),
        W('chrome.runtime', 'API الإضافة الأساسية', 'the core extension runtime API', 'chrome.runtime.onMessage receives messages.'),
        W('message router', 'موجّه الرسايل في الخلفية', 'code dispatching messages to handlers', 'The message router rejects unknown types.')
      ],
      read: [{ lib: 'Chrome Extensions docs', what: B('اقرا Content scripts وMessage passing.', 'Read Content scripts and Message passing.') }],
      challenge: B('كمّل «Order Helper»: content script بيستخرج الطلب ويتحقق من الإجماليات، رسالة للخلفية، router بيتحقق من المرسل والبيانات ويحفظ آخر 10 طلبات، وpopup بيعرض الطلب الحالي — مع اختبارات للمستخرج على 3 صفحات HTML محفوظة.', 'Extend «Order Helper»: a content script extracting the order and checking totals, a message to the background, a router validating sender and data and storing the last 10 orders, and a popup showing the current order — with tests of the extractor on 3 saved HTML pages.'),
      quiz: [
        Q(B('content script يقدر يشوف:', 'A content script can see:'), [['الـ DOM بس مش متغيرات JS بتاعة الصفحة', 'the DOM but not the page’s JS variables'], ['كل حاجة', 'everything'], ['ولا حاجة', 'nothing']], 0, B('isolated world.', 'Isolated world.')),
        Q(B('رسالة جاية من صفحة:', 'A message coming from a page:'), [['تحقق من المرسل والبيانات', 'validate the sender and data'], ['نفّذها على طول', 'execute it at once'], ['تجاهل التحقق', 'skip checks']], 0, B('ثقة.', 'Trust.')),
        Q(B('selector أثبت:', 'A steadier selector:'), [['data attribute', 'a data attribute'], ['nth-child(7)', 'nth-child(7)'], ['class عشوائية', 'a random class']], 0, B('ثبات.', 'Stability.'))
      ] },

    { title: B('التخزين والتنبيهات والقوايم', 'Storage, alarms and menus'),
      goal: B('إضافة بتفتكر وبتشتغل في ميعاد.', 'An extension that remembers and works on schedule.'),
      learn: [
        L(B('chrome.storage', 'chrome.storage'),
          B('**chrome.storage** بيحفظ بيانات الإضافة: `local` (على الجهاز، أكبر)، `sync` (بيتزامن مع حساب المستخدم، صغير — للإعدادات)، و`session` (لحد ما المتصفح يتقفل). كلها async وبتشتغل من كل الأجزاء. ومتخزنش أسرار حساسة فيه بشكل مكشوف.', '**chrome.storage** saves extension data: `local` (on the device, larger), `sync` (synced with the user’s account, small — for settings), and `session` (until the browser closes). All async and usable from every part. And do not store sensitive secrets there in the clear.'),
          '// options.js — settings sync across the user\'s devices\nconst form = document.querySelector("form");\nconst { webhookUrl = "", language = "ar" } = await chrome.storage.sync.get(["webhookUrl", "language"]);\nform.webhookUrl.value = webhookUrl; form.language.value = language;\nform.addEventListener("submit", async e => {\n  e.preventDefault();\n  const url = new URL(form.webhookUrl.value);                      // throws on garbage\n  if (url.protocol !== "https:") return alert("https only");\n  await chrome.storage.sync.set({ webhookUrl: url.href, language: form.language.value });\n});\nchrome.storage.onChanged.addListener((changes, area) => console.log(area, Object.keys(changes)));', S),
        L(B('alarms وقوايم السياق', 'Alarms and context menus'),
          B('`setTimeout` مش موثوق في service worker بينام — استخدم **chrome.alarms** للمهام الدورية (إعادة إرسال الطابور كل 5 دقايق، تذكير). و**context menu** (`chrome.contextMenus`) بيضيف أمر للقايمة لما المستخدم يدوس كليك يمين («ابعت الطلب ده لـ n8n»، «لخّص النص المحدد»). و**badge** على الأيقونة بيوري عدد أو حالة.', '`setTimeout` is unreliable in a sleeping service worker — use **chrome.alarms** for periodic work (resending the queue every 5 minutes, reminders). A **context menu** (`chrome.contextMenus`) adds a right-click command («send this order to n8n», «summarise the selected text»). And a **badge** on the icon shows a count or status.'),
          'chrome.contextMenus.onClicked.addListener(async (info, tab) => {\n  if (info.menuItemId === "send-order") {\n    const { order } = await chrome.tabs.sendMessage(tab.id, { type: "GET_ORDER" });\n    await enqueue(order);\n  }\n  if (info.menuItemId === "draft-reply" && info.selectionText) {\n    await chrome.sidePanel.open({ tabId: tab.id });\n    await chrome.storage.session.set({ draftFor: info.selectionText.slice(0, 2000) });\n  }\n});\nchrome.alarms.onAlarm.addListener(async alarm => {\n  if (alarm.name === "retry-queue") await flushQueue();\n});\nasync function updateBadge() {\n  const { queue = [] } = await chrome.storage.local.get("queue");\n  await chrome.action.setBadgeText({ text: queue.length ? String(queue.length) : "" });\n}', S),
        L(B('طابور من غير نت', 'An offline queue'),
          B('الموظف ممكن يدوس «ابعت» والنت فاصل أو n8n واقع. الحل: طابور في chrome.storage، محاولة إرسال، ولو فشل يفضل ويتعاد مع الـ alarm بـ backoff، ومفتاح idempotency لكل طلب عشان n8n ميكررش. المثال بيشغّل المنطق ده بـ storage وhttp وهميين.', 'An employee may click «send» while offline or while n8n is down. The fix: a queue in chrome.storage, a send attempt, and on failure it stays and is retried with the alarm and backoff, plus an idempotency key per order so n8n does not duplicate. The example runs that logic with a fake storage and HTTP.'),
          'const storage = new Map([["queue", []]]);\nconst get = k => storage.get(k), set = (k, v) => storage.set(k, v);\nlet online = false, received = new Set();\nasync function post(item) {                         // fake n8n webhook\n  if (!online) throw new Error("network down");\n  received.add(item.key);                            // n8n de-duplicates by key\n  return 200;\n}\nasync function enqueue(order) {\n  const key = `order-${order.id}`;\n  const q = get("queue");\n  if (!q.some(x => x.key === key)) set("queue", [...q, { key, order, tries: 0 }]);\n  await flushQueue();\n}\nasync function flushQueue() {\n  const left = [];\n  for (const item of get("queue")) {\n    try { await post(item); }\n    catch (e) { left.push({ ...item, tries: item.tries + 1, lastError: e.message }); }\n  }\n  set("queue", left);\n  console.log(`queue: ${left.length} waiting`, left.map(x => `${x.key}×${x.tries}`).join(" "));\n}\nawait enqueue({ id: 1042 });\nawait enqueue({ id: 1043 });\nawait enqueue({ id: 1042 });                        // double click: not queued twice\nonline = true;\nawait flushQueue();                                 // the alarm fires later\nconsole.log("n8n received:", [...received]);', N())
      ],
      practice: [
        B('اعمل options page بـ chrome.storage.sync.', 'Build an options page with chrome.storage.sync.'),
        B('ضيف context menu «ابعت لـ n8n».', 'Add a «send to n8n» context menu.'),
        B('اعمل alarm كل 5 دقايق للطابور.', 'Create a 5-minute alarm for the queue.'),
        B('اعرض عدد الطابور على الـ badge.', 'Show the queue count on the badge.')
      ],
      words: [
        W('chrome.storage', 'تخزين بيانات الإضافة', 'the extension storage API', 'Save the queue in chrome.storage.local.'),
        W('chrome.alarms', 'تنبيهات مجدولة للإضافة', 'scheduled events for extensions', 'chrome.alarms wakes the worker every 5 minutes.'),
        W('context menu', 'قايمة الكليك اليمين', 'the right-click menu', 'Add «Send to n8n» to the context menu.'),
        W('badge', 'رقم أو نص صغير على الأيقونة', 'a small label on the toolbar icon', 'The badge shows 3 waiting orders.'),
        W('offline queue', 'طابور للإرسال لما النت يرجع', 'a queue sending once back online', 'The offline queue survived a Wi-Fi drop.')
      ],
      read: [{ lib: 'Chrome Extensions docs', what: B('اقرا chrome.storage وchrome.alarms.', 'Read chrome.storage and chrome.alarms.') }],
      challenge: B('كمّل «Order Helper»: إعدادات بـ storage.sync، context menu لإرسال الطلب، طابور offline في storage.local بمفتاح idempotency وalarm كل 5 دقايق، badge بعدد الطابور — وجرّب تفصل النت وترجّعه.', 'Extend «Order Helper»: settings in storage.sync, a context menu to send the order, an offline queue in storage.local with an idempotency key and a 5-minute alarm, a badge with the queue count — and test by switching the network off and on.'),
      quiz: [
        Q(B('إعدادات تتزامن مع أجهزة المستخدم:', 'Settings synced across the user’s devices:'), [['chrome.storage.sync', 'chrome.storage.sync'], ['localStorage', 'localStorage'], ['متغير global', 'a global variable']], 0, B('sync.', 'Sync.')),
        Q(B('مهمة كل 5 دقايق في MV3:', 'A task every 5 minutes in MV3:'), [['chrome.alarms', 'chrome.alarms'], ['setInterval', 'setInterval'], ['while(true)', 'while(true)']], 0, B('بينام.', 'It sleeps.')),
        Q(B('ضغط «ابعت» مرتين:', 'Clicking «send» twice:'), [['مفتاح idempotency', 'an idempotency key'], ['طلبين', 'two orders'], ['خطأ', 'an error']], 0, B('مرة واحدة.', 'Once.'))
      ] },

    { title: B('الربط بـ n8n والـ AI بأمان', 'Connecting to n8n and AI securely'),
      goal: B('الإضافة بتستخدم الأتمتة من غير ما تكشف أسرار.', 'The extension uses automation without exposing secrets.'),
      learn: [
        L(B('مفيش أسرار في الإضافة', 'No secrets in the extension'),
          B('أي حد يقدر يفك الإضافة ويقرا كودها. فمتحطش أبدًا مفتاح Claude أو مفتاح API رئيسي جواها. الإضافة بتكلّم **your backend** (API بتاعك أو webhook في n8n) بتوكن خاص بكل مستخدم يقدر يتلغي، والسيرفر هو اللي معاه المفاتيح والصلاحيات والحدود.', 'Anyone can unpack an extension and read its code. So never put a Claude key or a master API key inside it. The extension talks to **your backend** (your API or an n8n webhook) with a per-user token that can be revoked, and the server holds the keys, permissions and limits.'),
          '✗ extension → api.anthropic.com  with ANTHROPIC_API_KEY inside background.js   (anyone can copy it)\n✓ extension → https://n8n.example.com/webhook/order-helper\n      header: X-User-Token: <issued per employee, revocable, stored in chrome.storage.local>\n   n8n → validates the token → rate limit per user → Claude (key in n8n credentials) → Odoo\n   n8n → returns { draftReply, orderStatus }', T),
        L(B('الإرسال من الخلفية', 'Sending from the background'),
          B('الطلبات للسيرفر تطلع من الـ service worker (مش الـ content script — طلبات الـ content script بتخضع لقيود CORS بتاعة الصفحة). لازم الدومين يبقى في host_permissions. وابعت بيانات قليلة (اللي محتاجه بس)، وبـ timeout، وتعامل مع الأخطاء برسالة واضحة للمستخدم.', 'Requests to the server go out from the service worker (not the content script — content-script requests are subject to the page’s CORS limits). The domain must be in host_permissions. Send minimal data (only what is needed), with a timeout, and handle errors with a clear message to the user.'),
          'async function sendToN8n(order) {\n  const { webhookUrl, userToken } = { ...(await chrome.storage.sync.get("webhookUrl")), ...(await chrome.storage.local.get("userToken")) };\n  if (!webhookUrl || !userToken) throw new Error("Open the options page and connect your account first.");\n  const minimal = { id: order.id, total: order.total, items: order.items.map(({ sku, qty }) => ({ sku, qty })) };   // no address/phone unless needed\n  const res = await fetch(webhookUrl, {\n    method: "POST",\n    headers: { "content-type": "application/json", "x-user-token": userToken, "idempotency-key": `order-${order.id}` },\n    body: JSON.stringify(minimal),\n    signal: AbortSignal.timeout(15_000),\n  });\n  if (res.status === 401) throw new Error("Your token was revoked — reconnect in options.");\n  if (!res.ok) throw new Error(`n8n replied ${res.status}`);\n  return res.json();\n}', S),
        L(B('CSP وعرض ردود الـ AI', 'CSP and showing AI replies'),
          B('صفحات الإضافة عليها **csp** صارمة افتراضيًا: مفيش `eval` ولا scripts من CDN — كل الكود جوّه الإضافة. ولما تعرض نص جاي من AI أو من صفحة: `textContent` مش `innerHTML` (XSS جوه الإضافة أخطر لأن عندها صلاحيات). المثال بيوضح الفرق في jsdom.', 'Extension pages have a strict **csp** by default: no `eval` and no scripts from a CDN — all code ships inside the extension. And when showing text from AI or from a page: `textContent`, not `innerHTML` (XSS inside an extension is worse because it has permissions). The example shows the difference in jsdom.'),
          'const aiReply = \'أهلًا منى! طلبك هيوصل بكرة. <img src=x onerror="chrome.storage.local.get(null).then(steal)">\';\nconst unsafe = document.querySelector("#unsafe");\nconst safe = document.querySelector("#safe");\nunsafe.innerHTML = aiReply;                          // ✗ creates an <img> element with a handler\nsafe.textContent = aiReply;                          // ✓ shown as plain text\nconsole.log("innerHTML created images:", unsafe.querySelectorAll("img").length);\nconsole.log("textContent created images:", safe.querySelectorAll("img").length);\nconsole.log("safe text:", safe.textContent.slice(0, 40) + "…");', { run: 'js', html: '<div id="unsafe"></div><div id="safe"></div>' })
      ],
      practice: [
        B('دوّر على أي مفتاح جوه كود إضافتك وشيله.', 'Search your extension code for any key and remove it.'),
        B('اعمل webhook في n8n بيتحقق من توكن المستخدم.', 'Build an n8n webhook that checks the user token.'),
        B('ابعت بيانات قليلة بـ timeout من الخلفية.', 'Send minimal data with a timeout from the background.'),
        B('اعرض رد الـ AI بـ textContent.', 'Show the AI reply with textContent.')
      ],
      words: [
        W('your backend', 'السيرفر بتاعك اللي معاه المفاتيح', 'your own server holding the secrets', 'The extension calls your backend, never Claude directly.'),
        W('user token', 'توكن خاص بكل مستخدم', 'a revocable per-user credential', 'Revoke the user token when an employee leaves.'),
        W('csp', 'سياسة أمان المحتوى', 'content security policy', 'The extension CSP forbids eval.'),
        W('minimal data', 'أقل بيانات لازمة', 'only the data actually needed', 'Send minimal data: no addresses.'),
        W('cross-origin request', 'طلب لموقع تاني', 'a request to a different origin', 'Cross-origin requests go out from the service worker.')
      ],
      read: [{ lib: 'Chrome Extensions docs', what: B('اقرا Stay secure وCross-origin network requests.', 'Read Stay secure and Cross-origin network requests.') }],
      challenge: B('وصّل «Order Helper» بـ n8n: webhook بيتحقق من توكن المستخدم وبيحدد معدل، Claude في n8n بيكتب رد مقترح للعميل، الإضافة بتبعت بيانات قليلة من الخلفية وتعرض الرد في الـ side panel بـ textContent — ومن غير أي مفتاح جوه الإضافة.', 'Connect «Order Helper» to n8n: a webhook checking the user token and rate-limiting, Claude in n8n drafting a customer reply, the extension sending minimal data from the background and showing the reply in the side panel with textContent — and no key at all inside the extension.'),
      quiz: [
        Q(B('مفتاح Claude في الإضافة:', 'A Claude key inside the extension:'), [['لأ أبدًا: أي حد يقدر ينسخه', 'never: anyone can copy it'], ['عادي لو مشفّر', 'fine if encoded'], ['ضروري', 'required']], 0, B('سيرفر.', 'Server.')),
        Q(B('الطلب لـ n8n يطلع من:', 'The request to n8n goes out from:'), [['الـ service worker', 'the service worker'], ['الـ content script', 'the content script'], ['الـ manifest', 'the manifest']], 0, B('CORS.', 'CORS.')),
        Q(B('عرض رد AI:', 'Showing an AI reply:'), [['textContent', 'textContent'], ['innerHTML', 'innerHTML'], ['eval', 'eval']], 0, B('XSS.', 'XSS.'))
      ] },

    { title: B('الاختبار والنشر', 'Testing and publishing'),
      goal: B('إضافة في Chrome Web Store.', 'An extension in the Chrome Web Store.'),
      learn: [
        L(B('الاختبار', 'Testing'),
          B('اختبر المنطق (المستخرج، الـ router، الطابور) بـ node:test وjsdom زي ما عملنا. وللاختبار الكامل: Playwright بيقدر يشغّل Chromium والإضافة محمّلة (**unpacked extension**) ويفتح صفحة ويدوس الأزرار. وفي التطوير: chrome://extensions → Load unpacked → Inspect للـ service worker.', 'Test the logic (the extractor, the router, the queue) with node:test and jsdom as we did. For full tests: Playwright can launch Chromium with the extension loaded (an **unpacked extension**), open a page and click buttons. During development: chrome://extensions → Load unpacked → Inspect the service worker.'),
          'import { test, expect, chromium } from "@playwright/test";\nimport path from "node:path";\n\ntest("popup shows the current order", async () => {\n  const ext = path.resolve("dist");\n  const ctx = await chromium.launchPersistentContext("", {\n    channel: "chromium",\n    args: [`--disable-extensions-except=${ext}`, `--load-extension=${ext}`],\n  });\n  const [worker] = ctx.serviceWorkers().length ? ctx.serviceWorkers() : [await ctx.waitForEvent("serviceworker")];\n  const extensionId = new URL(worker.url()).host;\n  const page = await ctx.newPage();\n  await page.goto("http://localhost:4173/fixtures/order-1042.html");\n  const popup = await ctx.newPage();\n  await popup.goto(`chrome-extension://${extensionId}/popup.html`);\n  await expect(popup.locator("#summary")).toContainText("#1042");\n  await ctx.close();\n});', S),
        L(B('الإصدار والتغليف', 'Versioning and packaging'),
          B('رقم الإصدار في manifest.json لازم يزيد مع كل رفع للمتجر، ويفضل يطابق package.json. المثال بيتحقق من التطابق ويطلّع رقم الإصدار الجاي — وبعدين `zip` لمجلد dist هو اللي بيترفع.', 'The version in manifest.json must increase with every store upload, and should match package.json. The example checks they match and computes the next version — then a `zip` of the dist folder is what gets uploaded.'),
          'const manifest = { name: "Order Helper", version: "1.3.2" };\nconst pkg = { name: "order-helper", version: "1.3.2" };\nconst storeVersion = "1.3.1";                          // currently published\n\nconst cmp = (a, b) => { const x = a.split(".").map(Number), y = b.split(".").map(Number);\n  for (let i = 0; i < 4; i++) { if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0); } return 0; };\nconst bump = (v, kind) => { const [ma, mi, pa] = v.split(".").map(Number);\n  return kind === "major" ? `${ma + 1}.0.0` : kind === "minor" ? `${ma}.${mi + 1}.0` : `${ma}.${mi}.${pa + 1}`; };\n\nconsole.log("manifest matches package:", manifest.version === pkg.version);\nconsole.log("newer than the store:", cmp(manifest.version, storeVersion) > 0);\nconsole.log("next patch:", bump(manifest.version, "patch"), "| next minor:", bump(manifest.version, "minor"));\nconsole.log("upload:", `order-helper-${manifest.version}.zip  (zip -r of dist/)`);', N()),
        L(B('Chrome Web Store', 'The Chrome Web Store'),
          B('النشر على **chrome web store**: حساب مطوّر (رسوم مرة واحدة)، وصف وصور، **privacy policy** واضحة (إيه البيانات اللي بتتجمع وليه)، وتبرير لكل صلاحية — المراجعة بترفض الصلاحيات الزيادة. ولإضافة داخلية لشركة: «unlisted» أو نشر خاص للدومين. وFirefox بيستخدم نفس **webextensions api** تقريبًا.', 'Publishing on the **chrome web store**: a developer account (a one-time fee), a description and screenshots, a clear **privacy policy** (what data is collected and why), and a justification for each permission — review rejects excess permissions. For a company-internal extension: «unlisted» or private publishing to the domain. And Firefox uses almost the same **webextensions api**.'),
          'store listing — Order Helper 1.3.2\nsingle purpose   send shop orders to the team\'s n8n and draft customer replies\npermissions      storage (settings, queue) · contextMenus (send order) · alarms (retry queue)\n                 activeTab (read the open order on click) · sidePanel (show drafts)\n                 host: admin.example-shop.com (read orders) · n8n.example.com (send)\ndata use         order id, items, totals → the team\'s n8n only; no sale, no ads, no analytics\nprivacy policy   https://example.com/order-helper/privacy\nvisibility       unlisted (link shared with staff) or private to the company domain', T)
      ],
      practice: [
        B('اكتب اختبارات node:test للمستخرج والـ router.', 'Write node:test tests for the extractor and router.'),
        B('جرّب Playwright بالإضافة محمّلة.', 'Try Playwright with the extension loaded.'),
        B('اكتب privacy policy وتبرير صلاحيات.', 'Write a privacy policy and permission justifications.'),
        B('اعمل zip لـ dist وجهّز الـ listing.', 'Zip dist and prepare the listing.')
      ],
      words: [
        W('unpacked extension', 'إضافة محمّلة من مجلد للتطوير', 'an extension loaded from a folder', 'Load the unpacked extension from dist.'),
        W('chrome web store', 'متجر إضافات Chrome', 'Google’s extension marketplace', 'Submit the zip to the Chrome Web Store.'),
        W('privacy policy', 'سياسة الخصوصية', 'a statement of data use', 'The privacy policy lists what we collect.'),
        W('permission justification', 'تبرير الصلاحية', 'why an extension needs a permission', 'Write a permission justification for alarms.'),
        W('webextensions api', 'واجهة الإضافات المشتركة بين المتصفحات', 'the cross-browser extension API', 'Firefox supports the WebExtensions API.')
      ],
      read: [{ lib: 'Chrome Extensions docs', what: B('اقرا Publish in the Chrome Web Store.', 'Read Publish in the Chrome Web Store.') }],
      challenge: B('جهّز «Order Helper» للنشر: 10 اختبارات للمنطق، اختبار Playwright واحد بالإضافة محمّلة، أرقام إصدار متطابقة، privacy policy، تبرير لكل صلاحية، listing بصور — ونشر unlisted (أو جاهزية كاملة لو مش هتنشر).', 'Prepare «Order Helper» for release: 10 logic tests, one Playwright test with the extension loaded, matching version numbers, a privacy policy, a justification for each permission, a listing with screenshots — and an unlisted release (or full readiness if you will not publish).'),
      quiz: [
        Q(B('المراجعة في المتجر بترفض:', 'Store review rejects:'), [['صلاحيات زيادة من غير تبرير', 'excess permissions without justification'], ['الأيقونات', 'icons'], ['الأوصاف القصيرة', 'short descriptions']], 0, B('أقل صلاحية.', 'Least privilege.')),
        Q(B('إضافة لموظفي الشركة بس:', 'An extension for company staff only:'), [['unlisted أو private للدومين', 'unlisted or private to the domain'], ['public', 'public'], ['ترسلها بالإيميل', 'email it']], 0, B('خاص.', 'Private.')),
        Q(B('الإصدار في manifest:', 'The manifest version:'), [['يزيد مع كل رفع', 'increases with every upload'], ['ثابت', 'stays fixed'], ['عشوائي', 'random']], 0, B('ترقية.', 'Update.'))
      ] },

    { title: B('مراجعة الشهر العاشر ومشروعه', 'Month 10 review and project'),
      goal: B('JavaScript للـ AI والتكاملات على مستوى خبير.', 'JavaScript for AI and integrations at expert level.'),
      review: [
        B('Claude API: الـ SDK والـ streaming والأدوات والمخرجات المنظمة (أسبوع 37).', 'The Claude API: the SDK, streaming, tools and structured output (week 37).'),
        B('MCP servers بـ TypeScript: أدوات وresources وprompts وHTTP (أسبوع 38).', 'MCP servers in TypeScript: tools, resources, prompts and HTTP (week 38).'),
        B('نودز n8n مخصصة: declarative وprogrammatic ونشر (أسبوع 39).', 'Custom n8n nodes: declarative, programmatic and publishing (week 39).'),
        B('إضافات المتصفح: manifest وcontent scripts والرسايل والتخزين.', 'Browser extensions: manifest, content scripts, messaging and storage.'),
        B('الربط الآمن بـ n8n والاختبار والنشر.', 'Secure connection to n8n, testing and publishing.')
      ],
      project: B('مشروع الشهر العاشر «مساعد خدمة العملاء المتكامل»: إضافة Chrome بتقرا الطلب من لوحة المتجر وتبعته من الخلفية بتوكن مستخدم لـ n8n؛ n8n فيه نود مخصص بتاعك لـ API المتجر وAI Agent بيستخدم MCP server بتاعك (أدوات قراية + إلغاء بموافقة)؛ Claude بيكتب رد مقترح يظهر في الـ side panel وهو بيتكتب (streaming)؛ طابور offline وidempotency؛ اختبارات لكل جزء؛ ومن غير أي مفتاح جوه الإضافة.', 'Month 10 project «integrated customer-service assistant»: a Chrome extension reading the order from the shop admin and sending it from the background with a user token to n8n; n8n uses your own custom node for the shop API and an AI Agent using your MCP server (read tools + cancel with approval); Claude drafts a reply that appears in the side panel as it is written (streaming); an offline queue and idempotency; tests for every part; and no key at all inside the extension.'),
      test: [
        Q(B('streaming في الـ SDK:', 'Streaming in the SDK:'), [['messages.stream مع event text', 'messages.stream with a text event'], ['setInterval', 'setInterval'], ['مستحيل', 'impossible']], 0, B('حي.', 'Live.')),
        Q(B('أداة إجبارية للاستخراج:', 'A forced tool for extraction:'), [['tool_choice بالاسم', 'tool_choice by name'], ['temperature 0 بس', 'only temperature 0'], ['regex', 'a regex']], 0, B('schema.', 'Schema.')),
        Q(B('سيرفر MCP محلي بيتكلّم عبر:', 'A local MCP server talks over:'), [['stdio', 'stdio'], ['FTP', 'FTP'], ['البريد', 'email']], 0, B('stdin/stdout.', 'stdin/stdout.')),
        Q(B('نتيجة MCP لطلب مش موجود:', 'An MCP result for a missing order:'), [['isError مع رسالة', 'isError with a message'], ['crash', 'crash'], ['فاضية', 'empty']], 0, B('النموذج يفهم.', 'The model understands.')),
        Q(B('نود n8n لـ REST API عادي:', 'An n8n node for a plain REST API:'), [['declarative routing', 'declarative routing'], ['execute دايمًا', 'always execute'], ['Code node', 'a Code node']], 0, B('أقل كود.', 'Less code.')),
        Q(B('getNodeParameter(name, i):', 'getNodeParameter(name, i):'), [['قيمة الحقل للـ item i', 'the field value for item i'], ['كل الـ items', 'all items'], ['الـ credential', 'the credential']], 0, B('لكل item.', 'Per item.')),
        Q(B('manifest V3 الخلفية:', 'The MV3 background:'), [['service worker بيصحى وينام', 'a service worker that wakes and sleeps'], ['صفحة شغالة دايمًا', 'an always-on page'], ['مفيش خلفية', 'no background']], 0, B('أحداث.', 'Events.')),
        Q(B('activeTab:', 'activeTab:'), [['صلاحية مؤقتة للتاب الحالي', 'temporary access to the current tab'], ['كل التابات للأبد', 'all tabs forever'], ['الـ history', 'the history']], 0, B('أقل صلاحية.', 'Least privilege.')),
        Q(B('content script بيكلّم الخلفية بـ:', 'A content script talks to the background with:'), [['chrome.runtime.sendMessage', 'chrome.runtime.sendMessage'], ['fetch للـ worker', 'fetch to the worker'], ['localStorage', 'localStorage']], 0, B('رسايل.', 'Messages.')),
        Q(B('مهمة دورية في الإضافة:', 'A periodic task in the extension:'), [['chrome.alarms', 'chrome.alarms'], ['setInterval طويل', 'a long setInterval'], ['cron على الجهاز', 'a cron on the machine']], 0, B('بينام.', 'It sleeps.')),
        Q(B('مفتاح API جوه الإضافة:', 'An API key inside the extension:'), [['ممنوع: السيرفر بيمسك المفاتيح', 'forbidden: the server holds keys'], ['عادي', 'fine'], ['في manifest', 'in the manifest']], 0, B('أسرار.', 'Secrets.')),
        Q(B('عرض نص من صفحة أو AI:', 'Showing text from a page or AI:'), [['textContent', 'textContent'], ['innerHTML', 'innerHTML'], ['document.write', 'document.write']], 0, B('XSS.', 'XSS.'))
      ] }
  ]
};
