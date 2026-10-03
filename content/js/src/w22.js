// JavaScript week 22 — automating Google with Apps Script.
// Apps Script runs on Google's servers: its snippets are shown (and syntax-checked); pure logic runs in the page.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('أتمتة Google بـ Apps Script', 'Automating Google with Apps Script'),
  goal: B('تكتب جافاسكريبت بيشتغل جوه Google نفسه: تقرا وتكتب Sheets بسرعة، وتعمل قوائم ومحفزات، وتكلّم n8n وتستقبل منه، وتتحكم في Gmail وDrive وDocs وCalendar — وتعرف إمتى Apps Script أحسن من n8n وإمتى العكس.',
          'Write JavaScript that runs inside Google itself: read and write Sheets fast, add menus and triggers, call n8n and receive from it, control Gmail, Drive, Docs and Calendar — and know when Apps Script beats n8n and when it is the other way round.'),
  days: [
    { title: B('Sheets من جوه', 'Sheets from the inside'),
      goal: B('تقرا وتكتب الشيت بالطريقة السريعة.', 'Read and write the sheet the fast way.'),
      learn: [
        L(B('أول سكربت', 'The first script'),
          B('**apps script** = جافاسكريبت على سيرفرات Google. **bound script** مربوط بشيت (Extensions ← Apps Script) و**standalone script** لوحده. **spreadsheetapp** هو الباب: الشيت ← الورقة ← **range** (`"A2:D"`) ← **getvalues** بيرجّع مصفوفة 2D (صفوف × أعمدة).', '**apps script** = JavaScript on Google’s servers. A **bound script** is tied to a sheet (Extensions → Apps Script) and a **standalone script** lives alone. **spreadsheetapp** is the door: spreadsheet → sheet → **range** (`"A2:D"`) → **getvalues** returns a 2D array (rows × columns).'),
          'function listOrders() {\n  const sheet = SpreadsheetApp.getActive().getSheetByName("Orders");\n  const values = sheet.getRange("A1:D" + sheet.getLastRow()).getValues();   // one call\n  const [header, ...rows] = values;\n  Logger.log("%s orders; columns: %s", rows.length, header.join(", "));\n  return rows;\n}', S),
        L(B('من 2D لكائنات وراجع', 'From 2D to objects and back'),
          B('اشتغل في JS العادي على كائنات، مش على `row[3]`. حوّل الـ 2D لكائنات بأسماء الأعمدة، عالج، ورجّعها 2D واكتبها بـ **setvalues** **مرة واحدة**. المنطق ده جافاسكريبت عادي — بيشتغل هنا:', 'Work in plain JS on objects, not on `row[3]`. Turn the 2D array into objects keyed by column names, process, turn them back into 2D and write with **setvalues** **once**. This logic is ordinary JavaScript — it runs here:'),
          'const values = [\n  ["id", "customer", "total", "status"],\n  [101, "Sara", 250, "paid"],\n  [102, "Omar", 90.5, "new"],\n  [103, "Mona", 1200, "paid"],\n];\nconst [header, ...rows] = values;\nconst objects = rows.map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])));\nconst updated = objects.map(o => ({ ...o, vip: o.total > 1000 ? "yes" : "", vat: Math.round(o.total * 14) / 100 }));\nconst outHeader = [...header, "vip", "vat"];\nconst out = [outHeader, ...updated.map(o => outHeader.map(h => o[h] ?? ""))];\nconsole.log(out.map(r => r.join(" | ")).join("\\n"));\n// in Apps Script: sheet.getRange(1, 1, out.length, out[0].length).setValues(out);', J),
        L(B('الـ batch أهم قاعدة', 'Batching: the key rule'),
          B('كل `getValue`/`setValue` = رحلة لسيرفر Google. 1000 خلية واحدة واحدة = دقايق (وممكن تعدّي حد الـ 6 دقايق). **batch operation**: اقرا كله مرة، اكتب كله مرة. ونفس الكلام للتنسيق (`setBackgrounds` بمصفوفة). ده أكبر فرق بين سكربت بطيء وسريع.', 'Every `getValue`/`setValue` = a trip to Google’s server. 1000 cells one by one = minutes (and maybe over the 6-minute limit). A **batch operation**: read everything once, write everything once. Same for formatting (`setBackgrounds` with an array). This is the biggest difference between slow and fast scripts.'),
          '// ✗ slow: 1000 round trips\nfor (let r = 2; r <= 1001; r++) sheet.getRange(r, 5).setValue(sheet.getRange(r, 3).getValue() * 0.14);\n\n// ✓ fast: 2 round trips\nconst totals = sheet.getRange(2, 3, 1000, 1).getValues();\nsheet.getRange(2, 5, 1000, 1).setValues(totals.map(([t]) => [Math.round(t * 14) / 100]));', S)
      ],
      practice: [
        B('اعمل bound script بيطبع عدد الصفوف في Logger.', 'Make a bound script that logs the row count.'),
        B('حوّل الصفوف لكائنات وارجّعها بعمود جديد.', 'Turn rows into objects and write them back with a new column.'),
        B('قارن وقت setValue في loop وsetValues مرة.', 'Compare setValue in a loop with one setValues.'),
        B('افتح Executions وشوف مدة كل تشغيل.', 'Open Executions and see each run’s duration.')
      ],
      words: [
        W('apps script', 'جافاسكريبت على سيرفرات Google', 'JavaScript running on Google’s servers', 'An Apps Script fills the report.'),
        W('bound script', 'سكربت مربوط بملف Google معين', 'a script tied to one Google file', 'The bound script adds a menu.'),
        W('standalone script', 'سكربت لوحده مش مربوط بملف', 'a script not tied to a file', 'A standalone script handles many sheets.'),
        W('spreadsheetapp', 'خدمة Apps Script للـ Sheets', 'the Apps Script service for Sheets', 'SpreadsheetApp.getActive() opens the file.'),
        W('getvalues', 'قراءة نطاق كمصفوفة 2D', 'reading a range as a 2D array', 'getValues reads all rows at once.'),
        W('setvalues', 'كتابة مصفوفة 2D في نطاق', 'writing a 2D array into a range', 'setValues writes in one call.'),
        W('batch operation', 'عملية واحدة على بيانات كتير', 'one operation on lots of data', 'Batch operations keep scripts fast.')
      ],
      read: [{ lib: 'Google Apps Script', what: B('اقرا Overview وBest practices.', 'Read Overview and Best practices.') }, { t: 'Apps Script: Best practices', url: 'https://developers.google.com/apps-script/guides/support/best-practices', what: B('اقرا Minimize calls to other services.', 'Read Minimize calls to other services.') }],
      challenge: B('اعمل سكربت «تنضيف الطلبات»: يقرا ورقة Orders مرة، ينضّف الأسماء والتليفونات ويحسب الضريبة وVIP، ويكتب النتيجة مرة واحدة في ورقة Clean — في أقل من 5 ثواني لـ 5000 صف.', 'Write an «orders cleaner» script: read the Orders sheet once, clean names and phones, compute VAT and VIP, and write the result once to a Clean sheet — under 5 seconds for 5000 rows.'),
      quiz: [
        Q(B('getValues بيرجّع:', 'getValues returns:'), [['مصفوفة 2D', 'a 2D array'], ['كائن', 'an object'], ['نص', 'text']], 0, B('صفوف × أعمدة.', 'Rows × columns.')),
        Q(B('1000 setValue في loop:', '1000 setValue calls in a loop:'), [['بطيء جدًا', 'very slow'], ['أسرع طريقة', 'the fastest way'], ['ممنوع', 'forbidden']], 0, B('batch.', 'Batch.')),
        Q(B('سكربت مربوط بشيت:', 'A script tied to a sheet:'), ['bound', 'standalone', 'web app'], 0, B('Extensions.', 'Extensions.'))
      ] },

    { title: B('القوائم والمحفزات', 'Menus and triggers'),
      goal: B('تخلّي السكربت يشتغل لوحده أو بزرار.', 'Make the script run by itself or from a button.'),
      learn: [
        L(B('simple triggers وقايمة', 'Simple triggers and a menu'),
          B('**simple trigger** = دالة باسم محجوز بتشتغل لوحدها: **onopen** (لما الملف يتفتح — مكان مثالي لـ **custom menu**) و**onedit** (لما حد يعدّل خلية). بس صلاحياتها محدودة (متقدرش تبعت إيميل أو تكلّم URL) ولازم تخلص في 30 ثانية.', 'A **simple trigger** = a function with a reserved name that runs by itself: **onopen** (when the file opens — the perfect place for a **custom menu**) and **onedit** (when someone edits a cell). But its permissions are limited (no email, no URL calls) and it must finish in 30 seconds.'),
          'function onOpen() {\n  SpreadsheetApp.getUi().createMenu("⚙ Automation")\n    .addItem("Clean orders", "cleanOrders")\n    .addItem("Send to n8n", "sendToN8n")\n    .addToUi();\n}\n\nfunction onEdit(e) {\n  const r = e.range;\n  if (r.getSheet().getName() !== "Orders" || r.getColumn() !== 4) return;      // only the status column\n  r.offset(0, 1).setValue(new Date());                                            // stamp when the status changed\n}', S),
        L(B('installable triggers', 'Installable triggers'),
          B('**installable trigger** بيشتغل بصلاحياتك كاملة: **time-driven trigger** (كل ساعة، كل يوم 7 الصبح)، و**onformsubmit** (لما فورم يتبعت)، وonEdit قوي. بتعمله من Triggers في المحرر أو بالكود — وخلّي بالك متعملوش مرتين.', 'An **installable trigger** runs with your full permissions: a **time-driven trigger** (every hour, daily at 7 a.m.), **onformsubmit** (when a form is submitted), and a powerful onEdit. Create it from Triggers in the editor or in code — and be careful not to create it twice.'),
          'function installTriggers() {\n  const existing = ScriptApp.getProjectTriggers().map(t => t.getHandlerFunction());\n  if (!existing.includes("dailyReport"))\n    ScriptApp.newTrigger("dailyReport").timeBased().everyDays(1).atHour(7).inTimezone("Africa/Cairo").create();\n  if (!existing.includes("onFormSubmitted"))\n    ScriptApp.newTrigger("onFormSubmitted").forSpreadsheet(SpreadsheetApp.getActive()).onFormSubmit().create();\n}\n\nfunction onFormSubmitted(e) {\n  const answers = e.namedValues;          // { "Name": ["Sara"], "Phone": ["010…"] }\n  sendToN8n({ name: answers["Name"][0], phone: answers["Phone"][0] });\n}', S),
        L(B('الحدود والقفل', 'Limits and locking'),
          B('Apps Script ليه **execution time limit** (6 دقايق للتشغيل) وحصص يومية (إيميلات، طلبات URL). للشغل الكبير: قسّمه على دفعات واحفظ مكانك. ولو trigger ممكن يشتغل مرتين مع بعض (فورمين في نفس الثانية): **lockservice** — نفس فكرة lock file في أسبوع 17.', 'Apps Script has an **execution time limit** (6 minutes per run) and daily quotas (emails, URL calls). For big jobs: split into batches and save your place. And if a trigger may run twice at once (two forms in the same second): **lockservice** — the same idea as the lock file in week 17.'),
          'function onFormSubmitted(e) {\n  const lock = LockService.getScriptLock();\n  if (!lock.tryLock(20000)) throw new Error("busy — try again");    // wait up to 20 s\n  try {\n    const sheet = SpreadsheetApp.getActive().getSheetByName("Queue");\n    const nextId = sheet.getLastRow();                                 // safe: no one else writes now\n    sheet.appendRow([nextId, new Date(), e.namedValues["Name"][0]]);\n  } finally {\n    lock.releaseLock();\n  }\n}', S)
      ],
      practice: [
        B('اعمل قايمة Automation بـ 2 أوامر.', 'Add an Automation menu with 2 commands.'),
        B('اعمل onEdit بيكتب وقت تغيير الحالة.', 'Write an onEdit stamping the time a status changes.'),
        B('اعمل time-driven trigger يومي بتوقيتك.', 'Create a daily time-driven trigger in your zone.'),
        B('ضيف LockService لـ onFormSubmit.', 'Add LockService to onFormSubmit.')
      ],
      words: [
        W('simple trigger', 'محفز باسم محجوز بصلاحيات محدودة', 'a reserved-name trigger with limited permissions', 'onOpen is a simple trigger.'),
        W('onopen', 'دالة بتشتغل لما الملف يتفتح', 'a function running when the file opens', 'onOpen builds the menu.'),
        W('onedit', 'دالة بتشتغل لما خلية تتعدل', 'a function running when a cell is edited', 'onEdit stamps the date.'),
        W('custom menu', 'قايمة مخصصة في الشيت', 'a custom menu in the sheet', 'The custom menu runs the cleaner.'),
        W('installable trigger', 'محفز بصلاحياتك الكاملة', 'a trigger with your full permissions', 'An installable trigger can send email.'),
        W('time-driven trigger', 'محفز بالوقت', 'a trigger based on time', 'A time-driven trigger runs at 7 a.m.'),
        W('onformsubmit', 'محفز إرسال فورم', 'the form-submission trigger', 'onFormSubmit forwards answers to n8n.'),
        W('lockservice', 'خدمة قفل تمنع التشغيل المتزامن', 'a locking service preventing concurrent runs', 'LockService avoids duplicate ids.'),
        W('execution time limit', 'أقصى مدة للتشغيل', 'the maximum run time', 'The execution time limit is 6 minutes.')
      ],
      read: [{ t: 'Apps Script: Simple triggers', url: 'https://developers.google.com/apps-script/guides/triggers', what: B('اقرا Restrictions.', 'Read Restrictions.') }, { t: 'Apps Script: Quotas', url: 'https://developers.google.com/apps-script/guides/services/quotas', what: B('اعرف حدودك.', 'Know your limits.') }],
      challenge: B('اعمل «متابعة الطلبات» في شيت: قايمة بأوامر، onEdit يختم وقت تغيير الحالة ويلوّن الصف، وtrigger يومي 7 الصبح يبعت ملخص المتأخر (أكتر من 3 أيام في «new»).', 'Build an «order follow-up» sheet: a menu with commands, an onEdit stamping status changes and colouring the row, and a daily 7 a.m. trigger emailing a summary of late orders (over 3 days in «new»).'),
      quiz: [
        Q(B('onEdit البسيط يقدر يبعت إيميل؟', 'Can a simple onEdit send email?'), [['لأ', 'no'], ['أيوه', 'yes'], ['لو قصير', 'if it is short']], 0, B('installable.', 'Use installable.')),
        Q(B('سكربت محتاج 20 دقيقة:', 'A script needing 20 minutes:'), [['قسّمه دفعات واحفظ مكانك', 'split into batches and save your place'], ['استنى', 'wait'], ['مستحيل يتعمل', 'it cannot be done']], 0, B('6 دقايق.', '6 minutes.')),
        Q(B('فورمين في نفس الثانية:', 'Two forms in the same second:'), ['LockService', 'Logger', 'onOpen'], 0, B('قفل.', 'A lock.'))
      ] },

    { title: B('الكلام مع n8n والعالم', 'Talking to n8n and the world'),
      goal: B('Apps Script يبعت لـ n8n ويستقبل منه بأمان.', 'Apps Script sends to n8n and receives from it safely.'),
      learn: [
        L(B('UrlFetchApp', 'UrlFetchApp'),
          B('**urlfetchapp** = fetch بتاع Apps Script (متزامن، مش Promise). ابعت JSON لـ webhook n8n، وحط `muteHttpExceptions: true` عشان تقرا رد 4xx/5xx بنفسك بدل ما يرمي. والأسرار (رابط الـ webhook، توكن) في **propertiesservice** — **script properties** مش في الكود.', '**urlfetchapp** = Apps Script’s fetch (synchronous, not a promise). Send JSON to an n8n webhook, and set `muteHttpExceptions: true` so you read 4xx/5xx replies yourself instead of throwing. Secrets (the webhook URL, a token) go in **propertiesservice** — **script properties**, not in the code.'),
          'function sendToN8n(payload) {\n  const props = PropertiesService.getScriptProperties();\n  const res = UrlFetchApp.fetch(props.getProperty("N8N_WEBHOOK_URL"), {\n    method: "post",\n    contentType: "application/json",\n    headers: { "X-Api-Key": props.getProperty("N8N_KEY") },\n    payload: JSON.stringify({ source: "sheets", sentAt: new Date().toISOString(), ...payload }),\n    muteHttpExceptions: true,\n  });\n  const code = res.getResponseCode();\n  if (code >= 300) throw new Error(`n8n replied ${code}: ${res.getContentText().slice(0, 200)}`);\n  return JSON.parse(res.getContentText() || "{}");\n}', S),
        L(B('Web app يستقبل', 'A web app that receives'),
          B('**dopost** (و`doGet`) بيخلّي السكربت **web app** برابط: n8n يبعتله POST، والسكربت يكتب في الشيت ويرد JSON بـ **contentservice**. انشره من Deploy ← New deployment، واختار مين يقدر يوصله — وحط سر في الـ payload وقارنه لأن الرابط ممكن يتسرب.', '**dopost** (and `doGet`) makes the script a **web app** with a URL: n8n POSTs to it, the script writes to the sheet and replies JSON via **contentservice**. Publish it from Deploy → New deployment and choose who can reach it — and include a secret in the payload and compare it, since the URL can leak.'),
          'function doPost(e) {\n  const body = JSON.parse(e.postData.contents);\n  const secret = PropertiesService.getScriptProperties().getProperty("INBOUND_SECRET");\n  if (body.secret !== secret) return json({ ok: false, error: "unauthorized" });\n  const sheet = SpreadsheetApp.getActive().getSheetByName("From n8n");\n  sheet.appendRow([new Date(), body.orderId, body.customer, body.total]);\n  return json({ ok: true, row: sheet.getLastRow() });\n}\nfunction json(obj) {\n  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);\n}', S),
        L(B('n8n ولا Apps Script يكتب في الشيت؟', 'Should n8n or Apps Script write the sheet?'),
          B('n8n عنده Google Sheets node كويس — استخدمه للعادي. Apps Script أحسن لما: محتاج حاجة جوه الملف (قوائم، onEdit، تنسيق معقد، Custom functions)، أو حدث بيبدأ من الشيت نفسه، أو الشغل كله جوه Google. والاتنين مع بعض: الشيت يبعت حدث لـ n8n، وn8n يعمل الباقي.', 'n8n has a good Google Sheets node — use it for the ordinary. Apps Script is better when you need something inside the file (menus, onEdit, complex formatting, custom functions), an event starting in the sheet itself, or work entirely inside Google. Both together: the sheet sends an event to n8n, and n8n does the rest.'),
          'event inside the sheet (edit, menu, form) ──▶ Apps Script ──UrlFetchApp──▶ n8n webhook\nn8n (orders from Shopify, AI, CRM)        ──▶ Google Sheets node (append/update)\nn8n needs a sheet-only feature            ──▶ Apps Script web app (doPost)', T)
      ],
      practice: [
        B('خزّن رابط webhook n8n في Script Properties.', 'Store the n8n webhook URL in Script Properties.'),
        B('ابعت صف من الشيت لـ n8n من القايمة.', 'Send a row from the sheet to n8n from the menu.'),
        B('انشر doPost واطلبه من n8n بـ HTTP Request.', 'Deploy a doPost and call it from n8n’s HTTP Request.'),
        B('جرّب طلب بسر غلط.', 'Try a request with a wrong secret.')
      ],
      words: [
        W('urlfetchapp', 'خدمة طلبات HTTP في Apps Script', 'the HTTP request service in Apps Script', 'UrlFetchApp posts to n8n.'),
        W('muteHttpExceptions', 'خيار يخلّي الأخطاء ترجع رد بدل ما ترمي', 'an option returning error replies instead of throwing', 'Set muteHttpExceptions to read the 400 body.'),
        W('propertiesservice', 'خدمة حفظ إعدادات وأسرار السكربت', 'the service storing a script’s settings and secrets', 'PropertiesService holds the key.'),
        W('script properties', 'إعدادات محفوظة للسكربت', 'saved settings for a script', 'Put the webhook URL in script properties.'),
        W('web app', 'سكربت منشور برابط بيستقبل طلبات', 'a script published at a URL that receives requests', 'The web app receives orders from n8n.'),
        W('dopost', 'دالة بتستقبل POST في web app', 'the function receiving a POST in a web app', 'doPost writes the row.'),
        W('contentservice', 'خدمة الرد بنص أو JSON', 'the service for replying with text or JSON', 'ContentService returns JSON.')
      ],
      read: [{ t: 'Apps Script: UrlFetchApp', url: 'https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app', what: B('اقرا fetch(url, params).', 'Read fetch(url, params).') }, { t: 'Apps Script: Web Apps', url: 'https://developers.google.com/apps-script/guides/web', what: B('اقرا Request parameters وDeploying.', 'Read Request parameters and Deploying.') }],
      challenge: B('اعمل دايرة كاملة: زرار في الشيت يبعت الطلبات المختارة لـ n8n، وn8n يكلّم API ويرجّع النتيجة لـ doPost اللي يكتبها في عمود «الحالة» — والأسرار كلها في Script Properties.', 'Build a full loop: a sheet button sends the selected orders to n8n, n8n calls an API and returns the result to a doPost that writes it to a «status» column — with every secret in Script Properties.'),
      quiz: [
        Q(B('UrlFetchApp.fetch بيرجّع:', 'UrlFetchApp.fetch returns:'), [['الرد مباشرة (متزامن)', 'the response directly (synchronous)'], ['Promise', 'a promise'], ['callback', 'a callback']], 0, B('مفيش await.', 'No await.')),
        Q(B('رابط webhook n8n مكانه:', 'The n8n webhook URL belongs in:'), ['Script Properties', B('الكود', 'the code'), B('خلية في الشيت', 'a sheet cell')], 0, B('سر.', 'A secret.')),
        Q(B('n8n يكتب في الشيت مع منطق جوه الملف:', 'n8n writes to the sheet with logic inside the file:'), ['Apps Script web app', 'CSS', 'Gmail'], 0, B('doPost.', 'doPost.'))
      ] },

    { title: B('Gmail وDrive وDocs وCalendar', 'Gmail, Drive, Docs and Calendar'),
      goal: B('تأتمت باقي خدمات Google من نفس السكربت.', 'Automate the rest of Google from the same script.'),
      learn: [
        L(B('Gmail', 'Gmail'),
          B('**gmailapp**: تدوّر بنفس بحث Gmail (`from:supplier@x.com has:attachment newer_than:1d`)، تقرا الرسايل والمرفقات، تحط labels، وترد. مثال: «كل فاتورة مورد توصل ← احفظ المرفق في Drive وسجّل في الشيت وحط label processed» — عشان متتعالجش مرتين.', '**gmailapp**: search with the same query as Gmail (`from:supplier@x.com has:attachment newer_than:1d`), read messages and attachments, add labels and reply. Example: «each supplier invoice that arrives → save the attachment to Drive, log it in the sheet and add a processed label» — so it is never handled twice.'),
          'function collectInvoices() {\n  const done = GmailApp.getUserLabelByName("invoices/processed") || GmailApp.createLabel("invoices/processed");\n  const folder = DriveApp.getFolderById(PropertiesService.getScriptProperties().getProperty("INVOICE_FOLDER"));\n  const log = SpreadsheetApp.getActive().getSheetByName("Invoices");\n  const threads = GmailApp.search("has:attachment filename:pdf subject:invoice -label:invoices/processed newer_than:7d", 0, 50);\n  for (const thread of threads) {\n    for (const msg of thread.getMessages()) {\n      for (const att of msg.getAttachments().filter(a => a.getContentType() === "application/pdf")) {\n        const file = folder.createFile(att.copyBlob()).setName(`${Utilities.formatDate(msg.getDate(), "Africa/Cairo", "yyyy-MM-dd")} ${att.getName()}`);\n        log.appendRow([new Date(), msg.getFrom(), msg.getSubject(), file.getUrl()]);\n      }\n    }\n    thread.addLabel(done);\n  }\n}', S),
        L(B('Docs قالب ← PDF', 'Docs template → PDF'),
          B('**documentapp**: اعمل نسخة من مستند قالب فيه `{{name}}` و`{{total}}`، استبدل النصوص، احفظه PDF في Drive بـ **driveapp**، وابعته. ده بيطلّع عقود وشهادات وعروض أسعار بالعربي بشكل ممتاز (Google بيعمل الـ shaping).', '**documentapp**: copy a template document containing `{{name}}` and `{{total}}`, replace the text, save it as PDF in Drive with **driveapp**, and send it. This produces contracts, certificates and quotes in Arabic beautifully (Google does the shaping).'),
          'function makeQuote(q) {\n  const props = PropertiesService.getScriptProperties();\n  const copy = DriveApp.getFileById(props.getProperty("QUOTE_TEMPLATE")).makeCopy(`Quote ${q.no}`);\n  const doc = DocumentApp.openById(copy.getId());\n  const body = doc.getBody();\n  for (const [key, value] of Object.entries(q)) body.replaceText(`{{${key}}}`, String(value));\n  doc.saveAndClose();\n  const pdf = DriveApp.getFolderById(props.getProperty("QUOTES_FOLDER")).createFile(copy.getAs(MimeType.PDF)).setName(`Quote ${q.no}.pdf`);\n  copy.setTrashed(true);              // keep only the PDF\n  return pdf.getUrl();\n}', S),
        L(B('Calendar ودوال الشيت', 'Calendar and sheet functions'),
          B('**calendarapp** بيعمل مواعيد من صفوف (زيارات صيانة، مواعيد عملاء). و**custom function**: دالة JS تستخدمها في الشيت زي `=VAT(C2)` أو `=NORMALIZE_PHONE(B2)` — بتاخد قيم وترجّع قيمة (أو 2D)، ومينفعش تعمل حاجات بصلاحيات.', '**calendarapp** creates events from rows (maintenance visits, client meetings). And a **custom function**: a JS function you use in the sheet like `=VAT(C2)` or `=NORMALIZE_PHONE(B2)` — it takes values and returns a value (or 2D), and cannot do things that need permissions.'),
          '/**\n * Egyptian/Saudi mobile in international form.\n * @param {string} raw the phone as typed\n * @return the normalised number or "?"\n * @customfunction\n */\nfunction NORMALIZE_PHONE(raw) {\n  const d = String(raw).replace(/[\\u0660-\\u0669]/g, c => c.charCodeAt(0) - 0x660).replace(/[\\s\\-().]/g, "");\n  let m;\n  if ((m = d.match(/^(?:\\+?20|0)?(1[0125]\\d{8})$/))) return "+20" + m[1];\n  if ((m = d.match(/^(?:\\+?966|0)?(5\\d{8})$/))) return "+966" + m[1];\n  return "?";\n}\n\nfunction scheduleVisit(row) {\n  CalendarApp.getDefaultCalendar().createEvent(`Visit: ${row.customer}`, row.start, row.end, { location: row.address, description: `Order ${row.orderId}` });\n}', S)
      ],
      practice: [
        B('اعمل بحث Gmail بيجمع مرفقات PDF في فولدر.', 'Write a Gmail search collecting PDF attachments into a folder.'),
        B('اعمل قالب عرض سعر Docs وطلّعه PDF.', 'Build a Docs quote template and output it as PDF.'),
        B('اعمل =NORMALIZE_PHONE واستخدمه في عمود.', 'Create =NORMALIZE_PHONE and use it in a column.'),
        B('اعمل مواعيد Calendar من 5 صفوف.', 'Create Calendar events from 5 rows.')
      ],
      words: [
        W('gmailapp', 'خدمة Gmail في Apps Script', 'the Gmail service in Apps Script', 'GmailApp.search finds the invoices.'),
        W('driveapp', 'خدمة Drive في Apps Script', 'the Drive service in Apps Script', 'DriveApp saves the PDF.'),
        W('documentapp', 'خدمة Docs في Apps Script', 'the Docs service in Apps Script', 'DocumentApp fills the template.'),
        W('calendarapp', 'خدمة Calendar في Apps Script', 'the Calendar service in Apps Script', 'CalendarApp books the visit.'),
        W('custom function', 'دالة بتتكتب في خلية زي =VAT()', 'a function used in a cell like =VAT()', 'The custom function cleans phones.')
      ],
      read: [{ t: 'Apps Script: Gmail service', url: 'https://developers.google.com/apps-script/reference/gmail', what: B('اقرا GmailApp.search.', 'Read GmailApp.search.') }, { t: 'Apps Script: Custom functions', url: 'https://developers.google.com/apps-script/guides/sheets/functions', what: B('اقرا Restrictions.', 'Read Restrictions.') }],
      challenge: B('اعمل «مكتب فواتير»: كل ساعة يجمع فواتير PDF من Gmail لـ Drive بأسماء منظمة ويسجّلها، وزرار في الشيت يطلّع عرض سعر PDF من قالب Docs ويبعته للعميل.', 'Build an «invoice office»: hourly, collect PDF invoices from Gmail into Drive with tidy names and log them; and a sheet button producing a quote PDF from a Docs template and emailing it to the customer.'),
      quiz: [
        Q(B('علشان رسالة متتعالجش مرتين:', 'So a message is not processed twice:'), [['label وتستثنيه في البحث', 'a label excluded in the search'], ['تمسحها', 'delete it'], ['تفتكرها', 'remember it']], 0, B('-label:processed.', '-label:processed.')),
        Q(B('عقد عربي PDF جميل:', 'A beautiful Arabic PDF contract:'), [['قالب Docs ← PDF', 'a Docs template → PDF'], ['CSV', 'CSV'], ['Logger', 'Logger']], 0, B('Google يعمل الشكل.', 'Google handles shaping.')),
        Q(B('custom function يقدر يبعت إيميل؟', 'Can a custom function send email?'), [['لأ', 'no'], ['أيوه', 'yes'], ['ساعات', 'sometimes']], 0, B('من غير صلاحيات.', 'No permissions.'))
      ] },

    { title: B('الشغل الاحترافي على Apps Script', 'Professional Apps Script work'),
      goal: B('تطوّر محليًا بـ Git وتنشر بإصدارات وتختار الأداة الصح.', 'Develop locally with Git, deploy by version and pick the right tool.'),
      learn: [
        L(B('clasp وGit', 'clasp and Git'),
          B('**clasp** (أداة Google) بيسحب المشروع لجهازك: تكتب في VS Code، تحفظ في Git، و`clasp push` يرفع. وبتقدر تكتب بـ ES modules محليًا وتجمعهم. ده بيخلّي سكربتات Apps Script مشروع حقيقي مش كود في متصفح.', '**clasp** (a Google tool) pulls the project to your machine: write in VS Code, keep it in Git, and `clasp push` uploads. You can write ES modules locally and bundle them. This makes Apps Script a real project, not code in a browser tab.'),
          'npm i -g @google/clasp\nclasp login\nclasp clone <scriptId>          # or: clasp create --type sheets --title "Orders tools"\n# edit .js files in VS Code, commit to Git\nclasp push                       # upload\nclasp deploy -d "v3: phone cleaner"   # a numbered deployment for the web app', T),
        L(B('النشر والصلاحيات', 'Deployment and permissions'),
          B('كل **deployment** ليه رقم إصدار ثابت — الـ web app رابطه بيفضل شغال على الإصدار ده لحد ما تحدّثه، فتقدر تجرّب من غير ما تكسر n8n. وراجع **oauth scope** في `appsscript.json`: اطلب أقل صلاحيات (مثلًا `spreadsheets.currentonly`) — المستخدمين بيشوفوها في شاشة الموافقة.', 'Each **deployment** has a fixed version number — the web app URL keeps running that version until you update it, so you can experiment without breaking n8n. And review each **oauth scope** in `appsscript.json`: ask for the least (e.g. `spreadsheets.currentonly`) — users see them on the consent screen.'),
          '{\n  "timeZone": "Africa/Cairo",\n  "runtimeVersion": "V8",\n  "oauthScopes": [\n    "https://www.googleapis.com/auth/spreadsheets.currentonly",\n    "https://www.googleapis.com/auth/script.external_request"\n  ],\n  "webapp": { "executeAs": "USER_DEPLOYING", "access": "ANYONE_ANONYMOUS" }\n}', T),
        L(B('Apps Script ولا n8n ولا Node؟', 'Apps Script, n8n or Node?'),
          B('Apps Script: الشغل جوه Google، أحداث من الشيت، مجاني، بس حدود 6 دقايق وحصص. n8n: ربط أنظمة كتير، مراقبة ولوج، من غير كود كتير. Node (سيرفرك): شغل تقيل، مكتبات npm، تحكم كامل. وغالبًا الحل الأحسن خليط: كل أداة في مكانها.', 'Apps Script: work inside Google, events from the sheet, free, but a 6-minute limit and quotas. n8n: connecting many systems, monitoring and logs, without much code. Node (your server): heavy work, npm packages, full control. The best answer is often a mix: each tool in its place.'),
          'a button / onEdit in a sheet       → Apps Script\nSheets + Gmail only, small volume  → Apps Script (free)\nmany systems, retries, monitoring  → n8n\nheavy processing, npm, long jobs   → Node service called by n8n', T)
      ],
      practice: [
        B('ثبّت clasp واسحب مشروعك لـ Git.', 'Install clasp and pull your project into Git.'),
        B('اعمل deployment بإصدار وجرّب تعديل من غير ما يتأثر.', 'Create a versioned deployment and test a change without affecting it.'),
        B('قلّل الـ oauthScopes لأقل حاجة.', 'Reduce the oauthScopes to the minimum.'),
        B('اكتب جدول: مهامك ← أنهي أداة.', 'Write a table: your tasks → which tool.')
      ],
      words: [
        W('clasp', 'أداة سطر أوامر لمشاريع Apps Script', 'a command-line tool for Apps Script projects', 'clasp push uploads the code.'),
        W('deployment', 'نسخة منشورة برقم إصدار', 'a published copy with a version number', 'The web app deployment is v3.'),
        W('oauth scope', 'صلاحية محددة بيطلبها السكربت', 'a specific permission the script requests', 'Ask for the narrowest OAuth scope.'),
        W('appsscript.json', 'ملف إعدادات مشروع Apps Script', 'the Apps Script project settings file', 'Set the time zone in appsscript.json.'),
        W('v8 runtime', 'محرك جافاسكريبت الحديث في Apps Script', 'the modern JavaScript engine in Apps Script', 'Set runtimeVersion to the V8 runtime.')
      ],
      read: [{ t: 'clasp', url: 'https://github.com/google/clasp', what: B('اقرا Install وCommands.', 'Read Install and Commands.') }, { t: 'Apps Script: Authorization scopes', url: 'https://developers.google.com/apps-script/concepts/scopes', what: B('اقرا Setting explicit scopes.', 'Read Setting explicit scopes.') }],
      challenge: B('انقل مشروع «متابعة الطلبات» لـ clasp وGit، بـ README وappsscript.json بأقل صلاحيات وdeployment ثابت للـ web app — واكتب صفحة «مين بيعمل إيه» بين Apps Script وn8n.', 'Move the «order follow-up» project to clasp and Git, with a README, an appsscript.json with minimal scopes and a stable web app deployment — and write a «who does what» page between Apps Script and n8n.'),
      quiz: [
        Q(B('تطوير Apps Script في VS Code:', 'Developing Apps Script in VS Code:'), ['clasp', 'npm start', B('مستحيل', 'impossible')], 0, B('push/pull.', 'push/pull.')),
        Q(B('تجرّب تعديل من غير ما تكسر n8n:', 'Try a change without breaking n8n:'), [['deployment بإصدار ثابت', 'a fixed-version deployment'], ['عدّل علطول', 'edit live'], ['اقفل الـ web app', 'shut the web app']], 0, B('إصدارات.', 'Versions.')),
        Q(B('تحويل فيديوهات ساعة:', 'An hour of video conversion:'), [['Node service', 'a Node service'], ['Apps Script', 'Apps Script'], ['custom function', 'a custom function']], 0, B('حدود 6 دقايق.', 'The 6-minute limit.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('شيت شغّال كتطبيق متصل بـ n8n.', 'A sheet working as an app connected to n8n.'),
      review: [
        B('SpreadsheetApp وgetValues/setValues والـ batch.', 'SpreadsheetApp, getValues/setValues and batching.'),
        B('القوائم وsimple/installable triggers وLockService والحدود.', 'Menus, simple/installable triggers, LockService and limits.'),
        B('UrlFetchApp لـ n8n، وdoPost web app، والأسرار في Properties.', 'UrlFetchApp to n8n, a doPost web app, and secrets in Properties.'),
        B('Gmail وDrive وDocs ← PDF وCalendar وcustom functions.', 'Gmail, Drive, Docs → PDF, Calendar and custom functions.'),
        B('clasp وGit والـ deployments والـ scopes واختيار الأداة.', 'clasp, Git, deployments, scopes and choosing the tool.')
      ],
      project: B('ابني «نظام عروض الأسعار» على Google Sheets: ورقة طلبات عروض (من Google Form بـ onFormSubmit وLockService)، قايمة Automation، custom functions للتليفون والضريبة، زرار «اعمل العرض» بيملا قالب Docs ويطلّعه PDF في Drive ويبعته Gmail، وكل حدث بيتبعت لـ webhook n8n (اللي يسجّل في CRM ويبعت واتساب)، وdoPost يستقبل حالة الدفع من n8n — بـ clasp وGit وأقل صلاحيات.', 'Build a «quote system» on Google Sheets: a quote-requests sheet (from a Google Form via onFormSubmit and LockService), an Automation menu, custom functions for phone and VAT, a «make quote» button filling a Docs template, saving a PDF to Drive and emailing it via Gmail, every event sent to an n8n webhook (which logs to a CRM and sends WhatsApp), and a doPost receiving the payment status from n8n — with clasp, Git and minimal scopes.'),
      test: [
        Q(B('Apps Script بيشتغل على:', 'Apps Script runs on:'), [['سيرفرات Google', 'Google’s servers'], ['جهازك', 'your machine'], ['n8n', 'n8n']], 0, B('cloud.', 'Cloud.')),
        Q(B('قراءة 5000 صف:', 'Reading 5000 rows:'), [['getValues مرة', 'one getValues'], ['getValue لكل خلية', 'getValue per cell'], ['نسخ يدوي', 'copying by hand']], 0, B('batch.', 'Batch.')),
        Q(B('قايمة في الشيت تتعمل في:', 'A sheet menu is built in:'), ['onOpen', 'onEdit', 'doPost'], 0, B('لما الملف يتفتح.', 'When the file opens.')),
        Q(B('تقرير كل يوم 7 الصبح:', 'A report every day at 7 a.m.:'), [['time-driven trigger', 'a time-driven trigger'], ['onEdit', 'onEdit'], ['custom function', 'a custom function']], 0, B('installable.', 'Installable.')),
        Q(B('أقصى مدة تشغيل:', 'Maximum run time:'), [['6 دقايق', '6 minutes'], ['ساعة', 'an hour'], ['مفيش', 'no limit']], 0, B('قسّم الشغل.', 'Split the work.')),
        Q(B('رد 500 من n8n مع muteHttpExceptions:', 'A 500 from n8n with muteHttpExceptions:'), [['تقرا الكود وتقرر', 'you read the code and decide'], ['يرمي', 'it throws'], ['بيتجاهل', 'it is ignored']], 0, B('getResponseCode.', 'getResponseCode.')),
        Q(B('n8n يكتب في شيت عن طريق سكربت:', 'n8n writes to a sheet through a script:'), ['doPost web app', 'onOpen', 'Logger'], 0, B('رابط.', 'A URL.')),
        Q(B('سر في web app:', 'A secret for a web app:'), [['في Properties ويتقارن مع الطلب', 'in Properties, compared with the request'], ['في الرابط', 'in the URL'], ['مش لازم', 'not needed']], 0, B('الرابط بيتسرب.', 'URLs leak.')),
        Q(B('رسالة Gmail اتعالجت:', 'A processed Gmail message:'), [['label واستثناء في البحث', 'a label excluded from the search'], ['مسح', 'deletion'], ['نجمة', 'a star']], 0, B('مرة واحدة.', 'Once.')),
        Q(B('=VAT(C2) هو:', '=VAT(C2) is:'), ['a custom function', 'a trigger', 'a web app'], 0, B('في الخلية.', 'In a cell.')),
        Q(B('clasp push:', 'clasp push:'), [['يرفع الكود من جهازك', 'uploads code from your machine'], ['ينشر web app', 'deploys a web app'], ['يمسح', 'deletes']], 0, B('Git + VS Code.', 'Git + VS Code.')),
        Q(B('ربط 6 أنظمة بإعادة محاولة ومراقبة:', 'Connecting 6 systems with retries and monitoring:'), ['n8n', 'Apps Script', 'custom function'], 0, B('الأداة الصح.', 'The right tool.'))
      ] }
  ]
};
