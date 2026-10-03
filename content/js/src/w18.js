// JavaScript week 18 — HTTP servers and webhooks with Express.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('خوادم HTTP والـ Webhooks بـ Express', 'HTTP servers and webhooks with Express'),
  goal: B('تعمل سيرفر بيستقبل طلبات: الأول بـ node:http عشان تفهم اللي بيحصل، وبعدين بـ Express (routes، middleware، أخطاء)، وتستقبل webhooks من Stripe وShopify وn8n بأمان (توقيع، تكرار، رد سريع)، وتتحقق من البيانات، وتشغّل السيرفر صح.',
          'Build a server that receives requests: first with node:http to understand what happens, then with Express (routes, middleware, errors); receive webhooks from Stripe, Shopify and n8n safely (signatures, duplicates, fast replies); validate the data; and run the server properly.'),
  days: [
    { title: B('سيرفر بـ node:http', 'A server with node:http'),
      goal: B('تفهم الطلب والرد من غير أي مكتبة.', 'Understand request and response with no library.'),
      learn: [
        L(B('أول سيرفر', 'The first server'),
          B('**createserver** بياخد دالة بتتنادى مع كل طلب: `req` (الطريقة، الرابط، الـ headers، الجسم) و`res` (الـ status، الـ headers، الجسم). و`listen(port)` بيفتح الـ **port**. المثال بيشغّل سيرفر على port فاضي، ويكلّمه بـ fetch، ويقفله — كل ده في سكربت واحد:', '**createserver** takes a function called for every request: `req` (method, URL, headers, body) and `res` (status, headers, body). `listen(port)` opens the **port**. The example starts a server on a free port, calls it with fetch and closes it — all in one script:'),
          'import { createServer } from "node:http";\nconst server = createServer((req, res) => {\n  const url = new URL(req.url, "http://localhost");\n  if (req.method === "GET" && url.pathname === "/health") {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    return res.end(JSON.stringify({ ok: true, time: new Date().toISOString().slice(0, 19) }));\n  }\n  res.writeHead(404, { "Content-Type": "application/json" });\n  res.end(JSON.stringify({ error: "not found", path: url.pathname }));\n});\nserver.listen(0);                                   // 0 = any free port\nawait new Promise(r => server.once("listening", r));\nconst base = `http://localhost:${server.address().port}`;\nfor (const p of ["/health", "/orders"]) {\n  const res = await fetch(base + p);\n  console.log(p, res.status, await res.json());\n}\nserver.close();', N()),
        L(B('قراءة جسم الطلب', 'Reading the request body'),
          B('الجسم بييجي **قطع** (stream)؛ لازم تجمعها. وحط **body size limit** — وإلا حد يبعتلك 2GB ويوقّع السيرفر. وبعدين `JSON.parse` جوه try وارجع **400 bad request** لو JSON بايظ. ده بالظبط اللي `express.json()` بيعمله بدالك.', 'The body arrives **in chunks** (a stream); you must collect them. Set a **body size limit** — or someone sends you 2 GB and brings the server down. Then `JSON.parse` inside try and return **400 bad request** for broken JSON. This is exactly what `express.json()` does for you.'),
          'import { createServer } from "node:http";\nasync function readJson(req, limit = 100_000) {\n  let size = 0; const chunks = [];\n  for await (const c of req) {\n    size += c.length;\n    if (size > limit) throw Object.assign(new Error("body too large"), { status: 413 });\n    chunks.push(c);\n  }\n  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }\n  catch { throw Object.assign(new Error("invalid JSON"), { status: 400 }); }\n}\nconst server = createServer(async (req, res) => {\n  try {\n    const order = await readJson(req);\n    res.writeHead(201, { "Content-Type": "application/json" }).end(JSON.stringify({ saved: order.id }));\n  } catch (e) {\n    res.writeHead(e.status ?? 500, { "Content-Type": "application/json" }).end(JSON.stringify({ error: e.message }));\n  }\n}).listen(0);\nawait new Promise(r => server.once("listening", r));\nconst url = `http://localhost:${server.address().port}/orders`;\nfor (const body of [\'{"id": 101}\', "{oops", "x".repeat(200_000)]) {\n  const res = await fetch(url, { method: "POST", body });\n  console.log(res.status, await res.json());\n}\nserver.close();', N()),
        L(B('الـ route', 'The route'),
          B('**route** = طريقة + مسار ← دالة: `GET /orders`، `POST /orders`، `GET /orders/:id`. السيرفر الخام بيخليك تكتب if كتير؛ عشان كده بنستخدم Express. بس دلوقتي انت عارف إن Express مجرد طبقة مريحة فوق node:http.', 'A **route** = method + path → function: `GET /orders`, `POST /orders`, `GET /orders/:id`. A raw server makes you write many ifs; that is why we use Express. But now you know Express is just a comfortable layer over node:http.'),
          'GET    /health          → { ok: true }\nGET    /orders?status=  → list (filter by query)\nGET    /orders/:id      → one order (404 if missing)\nPOST   /orders          → create (201) · validate (400/422)\nPOST   /webhooks/shop   → receive a webhook (verify, dedupe, 200 fast)', T)
      ],
      practice: [
        B('شغّل السيرفر الأول وضيف route /time.', 'Run the first server and add a /time route.'),
        B('ابعت JSON بايظ وجسم كبير وشوف الأكواد.', 'Send broken JSON and a huge body and look at the codes.'),
        B('افتح http://localhost:3000/health من المتصفح.', 'Open http://localhost:3000/health in the browser.'),
        B('اكتب جدول routes لمشروع صغير.', 'Write a route table for a small project.')
      ],
      words: [
        W('http server', 'برنامج بيستقبل طلبات HTTP ويرد', 'a program that receives HTTP requests and replies', 'Node can be an HTTP server.'),
        W('createserver', 'دالة Node لعمل سيرفر', 'Node’s function for making a server', 'createServer gets req and res.'),
        W('port', 'رقم الباب اللي السيرفر بيسمع عليه', 'the number the server listens on', 'The API runs on port 3000.'),
        W('route', 'طريقة ومسار مربوطين بدالة', 'a method and path tied to a function', 'Add a route for POST /orders.'),
        W('body size limit', 'أقصى حجم مسموح للجسم', 'the largest body allowed', 'Set a body size limit of 100 KB.'),
        W('400 bad request', 'الطلب نفسه غلط', 'the request itself is malformed', 'Broken JSON returns 400 Bad Request.')
      ],
      read: [{ lib: 'Node.js: Learn', what: B('اقرا Anatomy of an HTTP Transaction.', 'Read Anatomy of an HTTP Transaction.') }, { t: 'Node.js: HTTP', url: 'https://nodejs.org/api/http.html', what: B('لف على createServer.', 'Skim createServer.') }],
      challenge: B('اعمل سيرفر node:http فيه GET /orders وGET /orders/:id وPOST /orders (في الذاكرة)، بحد حجم ورسائل أخطاء JSON موحدة — واختبره بسكربت fetch.', 'Build a node:http server with GET /orders, GET /orders/:id and POST /orders (in memory), with a size limit and uniform JSON error messages — and test it with a fetch script.'),
      quiz: [
        Q(B('listen(0):', 'listen(0):'), [['أي port فاضي', 'any free port'], ['port صفر', 'port zero'], ['ميسمعش', 'does not listen']], 0, B('مفيد للاختبار.', 'Handy for tests.')),
        Q(B('جسم 2GB من غير حد:', 'A 2 GB body with no limit:'), [['ممكن يوقّع السيرفر', 'can bring the server down'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('413.', '413.')),
        Q(B('JSON بايظ:', 'Broken JSON:'), ['400', '200', '500'], 0, B('غلطة العميل.', 'The client’s fault.'))
      ] },

    { title: B('Express', 'Express'),
      goal: B('تبني API منظم بـ routes وmiddleware.', 'Build a tidy API with routes and middleware.'),
      learn: [
        L(B('routes ومعاملات', 'Routes and parameters'),
          B('**express**: `app.get(path, handler)`. الـ **route parameter** (`/orders/:id`) في `req.params`، والـ query في `req.query`، والجسم بعد **express.json** في `req.body`. والرد بـ `res.status(201).json(obj)`. و`express.Router()` يقسّم الـ routes لملفات.', '**express**: `app.get(path, handler)`. A **route parameter** (`/orders/:id`) is in `req.params`, the query in `req.query`, and the body after **express.json** in `req.body`. Reply with `res.status(201).json(obj)`. And `express.Router()` splits routes into files.'),
          'import express from "express";\nconst app = express();\napp.use(express.json({ limit: "100kb" }));\n\nconst orders = new Map([[101, { id: 101, total: 250, status: "paid" }]]);\napp.get("/orders", (req, res) => {\n  const list = [...orders.values()].filter(o => !req.query.status || o.status === req.query.status);\n  res.json(list);\n});\napp.get("/orders/:id", (req, res) => {\n  const order = orders.get(Number(req.params.id));\n  if (!order) return res.status(404).json({ error: "order not found" });\n  res.json(order);\n});\napp.post("/orders", (req, res) => {\n  const id = Math.max(0, ...orders.keys()) + 1;\n  orders.set(id, { id, ...req.body, status: "new" });\n  res.status(201).json(orders.get(id));\n});\napp.listen(process.env.PORT ?? 3000);', S),
        L(B('middleware', 'Middleware'),
          B('**middleware** = دالة `(req, res, next)` بتشتغل قبل الـ route: لوج، مصادقة، CORS، قياس الوقت. يا ترد وتوقف، يا تنادي **next** عشان اللي بعدها يكمل. الترتيب مهم: `app.use` بيتطبّق بالترتيب اللي اتكتب بيه. الفكرة دي بتشتغل فعلًا هنا بكود صغير:', '**middleware** = a `(req, res, next)` function running before the route: logging, auth, CORS, timing. It either replies and stops, or calls **next** so the following one continues. Order matters: `app.use` applies in the order written. The idea really runs here in a few lines:'),
          'function compose(stack) {                     // what Express does inside, simplified\n  return (req, res) => { let i = 0; const next = err => { const fn = stack[i++]; if (fn) fn(req, res, next, err); }; next(); };\n}\nconst log = (req, res, next) => { const t = Date.now(); next(); console.log(`${req.method} ${req.url} → ${res.status} (${Date.now() - t} ms)`); };\nconst auth = (req, res, next) => req.headers["x-api-key"] === "demo-key" ? next() : (res.status = 401, res.body = { error: "missing key" });\nconst route = (req, res) => { res.status = 200; res.body = { orders: 3 }; };\nconst app = compose([log, auth, route]);\nfor (const headers of [{ "x-api-key": "demo-key" }, {}]) {\n  const res = {};\n  app({ method: "GET", url: "/orders", headers }, res);\n  console.log("  body:", res.body);\n}', N()),
        L(B('معالج الأخطاء', 'The error handler'),
          B('Express 5 بيمسك الأخطاء من الـ handlers الـ async لوحده ويوديها لـ **error handler**: middleware بـ 4 معاملات `(err, req, res, next)` في **آخر** الملف. هناك حوّل كل الأخطاء لشكل واحد، وسجّل التفاصيل في اللوج بس — مش للعميل.', 'Express 5 catches errors from async handlers by itself and sends them to the **error handler**: a 4-argument middleware `(err, req, res, next)` at the **end** of the file. There, turn every error into one shape, and log the details only — not for the client.'),
          'class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }\n\napp.get("/orders/:id", async (req, res) => {\n  const order = await db.findOrder(req.params.id);       // a rejection reaches the handler below\n  if (!order) throw new HttpError(404, "order not found");\n  res.json(order);\n});\n\n// last: the error handler\napp.use((err, req, res, next) => {\n  const status = err.status ?? 500;\n  if (status >= 500) log.error("unhandled", { err: err.stack, path: req.path, rid: req.id });\n  res.status(status).json({ error: status >= 500 ? "internal error" : err.message, requestId: req.id });\n});', S)
      ],
      practice: [
        B('ثبّت express وشغّل مثال الطلبات.', 'Install express and run the orders example.'),
        B('ضيف middleware بيقيس الوقت ويطبعه.', 'Add a middleware that measures and prints the time.'),
        B('ضيف middleware API key لـ /orders بس.', 'Add an API-key middleware for /orders only.'),
        B('ارمي خطأ وشوف الـ error handler بيرد إزاي.', 'Throw an error and see how the error handler replies.')
      ],
      words: [
        W('express', 'أشهر إطار سيرفرات لـ Node', 'the best-known server framework for Node', 'Build the webhook receiver with Express.'),
        W('route parameter', 'جزء متغير في المسار زي :id', 'a variable part of a path such as :id', 'Read the route parameter from req.params.'),
        W('express.json', 'middleware بيقرا جسم JSON', 'middleware that parses a JSON body', 'Add express.json before the routes.'),
        W('middleware', 'دالة بتشتغل قبل الـ route', 'a function running before the route', 'The auth middleware checks the key.'),
        W('next', 'دالة بتعدّي للـ middleware اللي بعده', 'the function passing control to the next middleware', 'Call next() to continue.'),
        W('error handler', 'middleware بيحوّل الأخطاء لرد', 'middleware turning errors into a reply', 'The error handler hides stack traces.')
      ],
      read: [{ lib: 'Express', what: B('اقرا Routing وUsing middleware وError handling.', 'Read Routing, Using middleware and Error handling.') }],
      challenge: B('حوّل سيرفر node:http بتاع امبارح لـ Express: Router للطلبات، middleware للوج وللـ API key، error handler بشكل موحّد، و404 لأي مسار مش موجود.', 'Turn yesterday’s node:http server into Express: a Router for orders, middleware for logging and the API key, a uniform error handler, and a 404 for any unknown path.'),
      quiz: [
        Q(B('/orders/:id ← الـ id في:', '/orders/:id → the id is in:'), ['req.params.id', 'req.query.id', 'req.body.id'], 0, B('route parameter.', 'A route parameter.')),
        Q(B('middleware نسي ينادي next ومردش:', 'A middleware forgot next and did not reply:'), [['الطلب يعلق', 'the request hangs'], ['يكمّل عادي', 'it continues'], ['خطأ 500', 'a 500 error']], 0, B('رد أو next.', 'Reply or next.')),
        Q(B('error handler مكانه:', 'The error handler goes:'), [['في الآخر', 'at the end'], ['في الأول', 'at the start'], ['أي مكان', 'anywhere']], 0, B('بعد كل الـ routes.', 'After all routes.'))
      ] },

    { title: B('استقبال الـ webhooks بأمان', 'Receiving webhooks safely'),
      goal: B('تتأكد إن الـ webhook حقيقي، وتعالجه مرة واحدة، وترد بسرعة.', 'Make sure a webhook is genuine, process it once and reply fast.'),
      learn: [
        L(B('التحقق من التوقيع', 'Verifying the signature'),
          B('Stripe وShopify وGitHub بيوقّعوا كل webhook بـ **hmac** على **raw body** (الـ bytes بالظبط قبل أي JSON.parse) بـ **shared secret**، ويبعتوا النتيجة في **signature header**. انت تحسب نفس الحساب وتقارن بـ **timingsafeequal** — لو مختلف: 401. لازم الجسم الخام، لأن parse وstringify ممكن يغيّروا المسافات.', 'Stripe, Shopify and GitHub sign each webhook with an **hmac** over the **raw body** (the exact bytes before any JSON.parse) using a **shared secret**, and send it in a **signature header**. You compute the same and compare with **timingsafeequal** — if different: 401. You need the raw body, because parse and stringify can change the spacing.'),
          'import { createHmac, timingSafeEqual } from "node:crypto";\nconst SECRET = "demo-webhook-secret";\nconst sign = raw => "sha256=" + createHmac("sha256", SECRET).update(raw).digest("hex");\n\nfunction verify(raw, header = "") {\n  const expected = Buffer.from(sign(raw));\n  const given = Buffer.from(header);\n  return given.length === expected.length && timingSafeEqual(given, expected);\n}\nconst raw = Buffer.from(\'{"id":"evt_1","type":"order.paid","total":250}\');\nconst header = sign(raw);\nconsole.log("genuine:", verify(raw, header));\nconsole.log("tampered:", verify(Buffer.from(raw.toString().replace("250", "2")), header));\nconsole.log("re-serialised:", verify(Buffer.from(JSON.stringify(JSON.parse(raw), null, 1)), header));', N()),
        L(B('Express والجسم الخام', 'Express and the raw body'),
          B('`express.json()` بيحوّل الجسم لكائن ويضيّع الـ bytes الأصلية. للـ webhook route استخدم `express.raw({ type: "application/json" })` عشان `req.body` يبقى Buffer، اتحقق، وبعدين parse بنفسك. وحط الـ route ده **قبل** `app.use(express.json())`.', '`express.json()` turns the body into an object and loses the original bytes. For the webhook route use `express.raw({ type: "application/json" })` so `req.body` is a Buffer; verify, then parse it yourself. And register this route **before** `app.use(express.json())`.'),
          'app.post("/webhooks/shop", express.raw({ type: "application/json", limit: "1mb" }), async (req, res) => {\n  if (!verify(req.body, req.get("X-Signature"))) return res.status(401).end();\n  const event = JSON.parse(req.body);\n  if (await seen(event.id)) return res.sendStatus(200);      // a duplicate: acknowledge and ignore\n  await queue.add(event);                                      // do the work later\n  res.sendStatus(200);                                          // reply within a few seconds\n});\napp.use(express.json());                                        // the other routes', S),
        L(B('التكرار والرد السريع', 'Duplicates and fast replies'),
          B('المرسل بيعيد الـ webhook لو ردّك اتأخر أو فشل — فنفس الحدث ممكن يوصل مرتين. **deduplication** بالـ **event id**: سجّل كل id عالجته، ولو جه تاني رد 200 وتجاهله. ورد في ثواني: احفظ الحدث وعالجه بعدين (طابور)، وإلا المرسل يعتبره فشل ويعيد.', 'The sender retries a webhook if your reply is late or fails — so the same event may arrive twice. **deduplication** by **event id**: record each id you handled, and if it comes again reply 200 and ignore it. Reply within seconds: store the event and process it later (a queue), or the sender counts a failure and retries.'),
          'const seen = new Map();                     // in production: a database table with a unique id\nconst TTL = 24 * 3600_000;\nfunction firstTime(id, now = Date.now()) {\n  for (const [k, t] of seen) if (now - t > TTL) seen.delete(k);   // forget very old ids\n  if (seen.has(id)) return false;\n  seen.set(id, now);\n  return true;\n}\nconst arrivals = ["evt_1", "evt_2", "evt_1", "evt_3", "evt_2"];\nconst handled = arrivals.filter(id => firstTime(id));\nconsole.log("arrived", arrivals.length, "→ handled", handled);', N())
      ],
      practice: [
        B('شغّل مثال التوقيع وغيّر حرف في السر.', 'Run the signature example and change one letter of the secret.'),
        B('اعمل webhook route بـ express.raw وتحقق.', 'Build a webhook route with express.raw and verification.'),
        B('ابعت نفس الحدث مرتين واتأكد إنه اتعالج مرة.', 'Send the same event twice and confirm it was handled once.'),
        B('اقرا إزاي Stripe بيوقّع webhooks.', 'Read how Stripe signs webhooks.')
      ],
      words: [
        W('hmac', 'بصمة بسر مشترك بتثبت إن البيانات متعدلتش', 'a keyed fingerprint proving data was not altered', 'Shopify signs webhooks with HMAC.'),
        W('raw body', 'جسم الطلب بالـ bytes الأصلية', 'the request body as the original bytes', 'Verify the raw body, not the parsed one.'),
        W('shared secret', 'سر معروف للطرفين بس', 'a secret known only to both sides', 'Store the shared secret in .env.'),
        W('signature header', 'header فيه التوقيع', 'a header carrying the signature', 'Read the signature header.'),
        W('timingsafeequal', 'مقارنة ثابتة الوقت', 'a constant-time comparison', 'Compare signatures with timingSafeEqual.'),
        W('deduplication', 'منع معالجة نفس الحاجة مرتين', 'preventing the same thing being processed twice', 'Deduplication uses the event id.'),
        W('event id', 'معرّف فريد للحدث', 'a unique identifier of an event', 'Save every event id you processed.')
      ],
      read: [{ t: 'Stripe: Check the webhook signatures', url: 'https://docs.stripe.com/webhooks#verify-events', what: B('اقرا ليه الجسم الخام.', 'Read why the raw body matters.') }, { t: 'GitHub: Validating webhook deliveries', url: 'https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries', what: B('اقرا مثال JavaScript.', 'Read the JavaScript example.') }],
      challenge: B('اعمل مستقبل webhook كامل: توقيع HMAC بـ express.raw، dedupe بالـ event id في ملف JSON، رد 200 فوري، معالجة في الخلفية، ولوج — واختبره بسكربت بيبعت حدث صح وحدث متلاعب فيه وحدث مكرر.', 'Build a full webhook receiver: HMAC signatures via express.raw, dedupe by event id in a JSON file, an immediate 200, background processing and logs — and test it with a script sending a genuine, a tampered and a duplicate event.'),
      quiz: [
        Q(B('التوقيع بيتحسب على:', 'The signature is computed over:'), [['الجسم الخام', 'the raw body'], ['الكائن بعد parse', 'the parsed object'], ['الرابط', 'the URL']], 0, B('الـ bytes بالظبط.', 'The exact bytes.')),
        Q(B('نفس الحدث وصل مرتين:', 'The same event arrives twice:'), [['200 وتجاهل التاني', '200 and ignore the second'], ['عالجه مرتين', 'process it twice'], ['500', '500']], 0, B('dedupe.', 'Dedupe.')),
        Q(B('معالجة بتاخد دقيقة:', 'Processing taking a minute:'), [['رد 200 وعالج بعدين', 'reply 200 and process later'], ['استنى وبعدين رد', 'wait, then reply'], ['متردش', 'do not reply']], 0, B('وإلا يعيد.', 'Or it retries.'))
      ] },

    { title: B('التحقق من البيانات', 'Validating the data'),
      goal: B('ترفض البيانات الغلط برسالة مفيدة قبل ما توصل لقاعدتك.', 'Reject bad data with a helpful message before it reaches your database.'),
      learn: [
        L(B('schema بـ Zod', 'A schema with Zod'),
          B('**zod** بيوصف شكل البيانات (**schema**): نوع كل حقل وحدوده. `schema.safeParse(body)` بيرجّع `{ success, data, error }` من غير ما يرمي — ولو نجح، `data` بالأنواع المنضفة. ده الحارس على باب كل API وwebhook.', '**zod** describes the shape of data (a **schema**): each field’s type and limits. `schema.safeParse(body)` returns `{ success, data, error }` without throwing — and on success, `data` holds the cleaned types. It is the guard at the door of every API and webhook.'),
          'import { z } from "zod";\nconst OrderIn = z.object({\n  customer: z.string().trim().min(2).max(80),\n  phone: z.string().regex(/^\\+?\\d{9,15}$/),\n  items: z.array(z.object({ sku: z.string(), qty: z.number().int().positive() })).min(1),\n  note: z.string().max(500).optional(),\n});\n\napp.post("/orders", (req, res) => {\n  const parsed = OrderIn.safeParse(req.body);\n  if (!parsed.success) return res.status(422).json({ error: "invalid order", fields: z.flattenError(parsed.error).fieldErrors });\n  const order = parsed.data;          // typed and trimmed\n  // … save it and reply 201\n});', S),
        L(B('نفس الفكرة من غير مكتبة', 'The same idea without a library'),
          B('عشان تفهم Zod بيعمل إيه: دالة validate بترجّع قايمة أخطاء لكل حقل بدل أول خطأ بس — عشان العميل يصلّح كل حاجة مرة واحدة. وده الشكل اللي الواجهة أو n8n يقدروا يعرضوه:', 'To understand what Zod does: a validate function returns a list of errors per field instead of only the first — so the client fixes everything at once. And it is a shape the front-end or n8n can display:'),
          'function validateOrder(o) {\n  const errors = {};\n  const add = (f, m) => (errors[f] ??= []).push(m);\n  if (typeof o.customer !== "string" || o.customer.trim().length < 2) add("customer", "at least 2 characters");\n  if (!/^\\+?\\d{9,15}$/.test(o.phone ?? "")) add("phone", "9–15 digits, optional +");\n  if (!Array.isArray(o.items) || o.items.length === 0) add("items", "at least one item");\n  else o.items.forEach((it, i) => { if (!Number.isInteger(it.qty) || it.qty < 1) add(`items.${i}.qty`, "a whole number ≥ 1"); });\n  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value: { ...o, customer: o.customer.trim() } };\n}\nconsole.log(validateOrder({ customer: " Sara ", phone: "+201001234567", items: [{ sku: "A1", qty: 2 }] }));\nconsole.log(JSON.stringify(validateOrder({ customer: "S", phone: "12ab", items: [{ sku: "A1", qty: 0 }, { sku: "B2", qty: 1.5 }] }), null, 1));', N()),
        L(B('400 ولا 422؟ وشكل الأخطاء', '400 or 422? And the error shape'),
          B('400 = الطلب نفسه مش مفهوم (JSON بايظ، نوع محتوى غلط). 422 = مفهوم بس البيانات مش صح (تليفون غلط). خلّي كل أخطاء الـ API بشكل واحد ثابت، وحط فيه الحقول — نفس الشكل في كل endpoint بيسهّل الواجهة وn8n.', '400 = the request itself cannot be understood (broken JSON, wrong content type). 422 = understood but the data is wrong (a bad phone). Keep every API error in one fixed shape that includes the fields — the same shape on every endpoint makes life easy for the front-end and n8n.'),
          '{\n  "error": "invalid order",\n  "fields": { "phone": ["9–15 digits, optional +"], "items.0.qty": ["a whole number ≥ 1"] },\n  "requestId": "r-7f3a"\n}', T)
      ],
      practice: [
        B('شغّل validateOrder على 5 طلبات مختلفة.', 'Run validateOrder on 5 different orders.'),
        B('اكتب نفس القواعد بـ Zod وقارن.', 'Write the same rules in Zod and compare.'),
        B('اعرض أخطاء الحقول تحت كل خانة في فورم.', 'Show field errors under each input in a form.'),
        B('خلّي كل أخطاء الـ API بشكل واحد.', 'Give every API error one shape.')
      ],
      words: [
        W('zod', 'مكتبة لوصف البيانات والتحقق منها', 'a library for describing and validating data', 'Zod checks the webhook body.'),
        W('schema', 'وصف شكل البيانات المسموح', 'a description of the allowed data shape', 'The schema requires a phone.'),
        W('safeparse', 'تحقق بيرجّع نتيجة من غير ما يرمي', 'validation returning a result without throwing', 'safeParse returns success: false.'),
        W('field error', 'خطأ خاص بحقل معين', 'an error tied to one field', 'Show each field error under its input.'),
        W('422 unprocessable', 'البيانات مفهومة بس مش صحيحة', 'the data is understood but invalid', 'A bad phone returns 422.')
      ],
      read: [{ lib: 'Zod', what: B('اقرا Basic usage وError formatting.', 'Read Basic usage and Error formatting.') }],
      challenge: B('ضيف Zod لكل routes الـ API بتاعك، بشكل أخطاء موحد فيه الحقول، واعمل فورم HTML بيعرض كل خطأ تحت الخانة بتاعته.', 'Add Zod to every route of your API with a uniform error shape listing fields, and build an HTML form showing each error under its input.'),
      quiz: [
        Q(B('تليفون غلط:', 'A wrong phone:'), ['422', '500', '200'], 0, B('بيانات غلط.', 'Bad data.')),
        Q(B('safeParse لما يفشل:', 'safeParse on failure:'), [['يرجّع success: false', 'returns success: false'], ['يرمي', 'throws'], ['يرجّع null', 'returns null']], 0, B('من غير exception.', 'No exception.')),
        Q(B('ليه نرجّع كل الأخطاء مرة واحدة؟', 'Why return every error at once?'), [['العميل يصلّح كله مرة', 'the client fixes everything in one go'], ['أسرع للسيرفر', 'faster for the server'], ['مش مهم', 'it does not matter']], 0, B('تجربة أحسن.', 'Better experience.'))
      ] },

    { title: B('تشغيل السيرفر صح', 'Running the server properly'),
      goal: B('سيرفر بيقوم ويقفل وينكشف للنت بأمان.', 'A server that starts, stops and goes online safely.'),
      learn: [
        L(B('health والإيقاف بنظافة', 'Health and a clean stop'),
          B('**health check** (`GET /health`) بيقول السيرفر شغال (وممكن يفحص قاعدة البيانات). والمراقبة وDocker بيستخدموه. وعند SIGTERM: `server.close()` بيبطّل يستقبل جديد ويستنى الطلبات اللي شغالة تخلص — زي الأسبوع اللي فات.', 'A **health check** (`GET /health`) says the server is up (and may check the database). Monitoring and Docker use it. On SIGTERM: `server.close()` stops accepting new requests and waits for running ones to finish — like last week.'),
          'import { createServer } from "node:http";\nconst sleep = ms => new Promise(r => setTimeout(r, ms));\nconst server = createServer(async (req, res) => {\n  if (req.url === "/health") return res.end("ok");\n  await sleep(200);                               // a slow request\n  res.end("slow job done");\n}).listen(0);\nawait new Promise(r => server.once("listening", r));\nconst base = `http://localhost:${server.address().port}`;\n\nconst slow = fetch(base + "/report").then(r => r.text());\nawait sleep(50);\nserver.close(() => console.log("closed after in-flight requests finished"));   // like on SIGTERM\nconsole.log("in-flight:", await slow);\ntry { await fetch(base + "/health"); } catch { console.log("new requests refused ✓"); }', N()),
        L(B('أمان أساسي', 'Basic security'),
          B('**security headers** بسطر واحد بـ `helmet`، وrate limit على المسارات الحساسة (`express-rate-limit`)، وCORS لأصول محددة، و`app.disable("x-powered-by")`، وحد حجم الجسم، ومتطلعش stack traces. والأسرار في .env.', '**security headers** in one line with `helmet`, a rate limit on sensitive paths (`express-rate-limit`), CORS for specific origins, `app.disable("x-powered-by")`, a body size limit, and no stack traces. And secrets in .env.'),
          'import helmet from "helmet";\nimport cors from "cors";\nimport { rateLimit } from "express-rate-limit";\n\napp.disable("x-powered-by");\napp.use(helmet());\napp.use(cors({ origin: ["https://shop.example.com"] }));\napp.use("/webhooks", rateLimit({ windowMs: 60_000, limit: 120 }));\napp.use("/login", rateLimit({ windowMs: 15 * 60_000, limit: 10 }));\napp.use(express.json({ limit: "100kb" }));', S),
        L(B('من جهازك للنت', 'From your machine to the internet'),
          B('عشان Stripe أو Shopify يبعتولك webhook وانت بتطوّر، محتاج رابط عام: **tunnel** (Cloudflare Tunnel أو ngrok) بيوصّل رابط HTTPS لـ localhost. وفي الإنتاج: السيرفر ورا **reverse proxy** (Caddy أو Nginx) بيعمل HTTPS ويوزّع — والسيرفر نفسه يسمع على localhost بس.', 'For Stripe or Shopify to send you webhooks while developing, you need a public URL: a **tunnel** (Cloudflare Tunnel or ngrok) links an HTTPS URL to localhost. In production: the server sits behind a **reverse proxy** (Caddy or Nginx) handling HTTPS and routing — and the server itself listens on localhost only.'),
          'development:  Shopify ──HTTPS──▶ tunnel (https://abc.trycloudflare.com) ──▶ localhost:3000\nproduction:   Shopify ──HTTPS──▶ Caddy :443 (certificates) ──▶ 127.0.0.1:3000 (Node)\n              # Caddyfile:  api.example.com { reverse_proxy 127.0.0.1:3000 }', T)
      ],
      practice: [
        B('ضيف /health بيفحص ملف أو قاعدة.', 'Add a /health that checks a file or database.'),
        B('ضيف SIGTERM بـ server.close.', 'Add SIGTERM handling with server.close.'),
        B('ضيف helmet وrate limit وشوف الـ headers.', 'Add helmet and a rate limit and look at the headers.'),
        B('اعمل tunnel واستقبل webhook حقيقي من n8n.', 'Open a tunnel and receive a real webhook from n8n.')
      ],
      words: [
        W('health check', 'endpoint بيقول السيرفر سليم', 'an endpoint saying the server is healthy', 'Docker calls the health check.'),
        W('server.close', 'إيقاف استقبال طلبات جديدة', 'stopping new requests', 'server.close waits for in-flight requests.'),
        W('security headers', 'headers بتحمي المتصفح من هجمات', 'headers protecting browsers from attacks', 'helmet sets the security headers.'),
        W('helmet', 'middleware بيضيف security headers', 'middleware adding security headers', 'Add helmet first.'),
        W('tunnel', 'رابط عام بيوصل لجهازك', 'a public URL reaching your machine', 'Use a tunnel to test webhooks.'),
        W('reverse proxy', 'سيرفر قدام تطبيقك بيعمل HTTPS ويوزّع', 'a server in front of your app handling HTTPS and routing', 'Caddy is our reverse proxy.')
      ],
      read: [{ t: 'Express: Production best practices: security', url: 'https://expressjs.com/en/advanced/best-practice-security/', what: B('اقرا القايمة.', 'Read the list.') }, { t: 'Cloudflare Tunnel', url: 'https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/', what: B('اقرا Quick tunnels.', 'Read Quick tunnels.') }],
      challenge: B('جهّز سيرفر الـ webhooks للإنتاج: /health، SIGTERM، helmet، rate limit، CORS محدد، حد جسم، لوج JSON بـ request id — وجرّبه من برة بـ tunnel.', 'Make the webhook server production-ready: /health, SIGTERM, helmet, a rate limit, specific CORS, a body limit, JSON logs with a request id — and try it from outside with a tunnel.'),
      quiz: [
        Q(B('server.close():', 'server.close():'), [['يرفض الجديد ويكمّل الشغال', 'refuses new and finishes running requests'], ['يقطع كل حاجة فورًا', 'cuts everything at once'], ['يعيد التشغيل', 'restarts']], 0, B('graceful.', 'Graceful.')),
        Q(B('Node في الإنتاج يسمع على:', 'Node in production listens on:'), [['127.0.0.1 ورا proxy', '127.0.0.1 behind a proxy'], ['0.0.0.0:80 مباشرة', '0.0.0.0:80 directly'], ['أي port', 'any port']], 0, B('الـ proxy يعمل HTTPS.', 'The proxy does HTTPS.')),
        Q(B('اختبار webhook من Stripe على جهازك:', 'Testing a Stripe webhook on your machine:'), ['tunnel', B('مستحيل', 'impossible'), 'localhost URL'], 0, B('رابط عام.', 'A public URL.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مستقبل webhooks حقيقي جاهز للإنتاج.', 'A real, production-ready webhook receiver.'),
      review: [
        B('node:http: req وres وقراءة الجسم بحد.', 'node:http: req, res and reading the body with a limit.'),
        B('Express: routes وparams وmiddleware وnext وerror handler.', 'Express: routes, params, middleware, next and the error handler.'),
        B('Webhooks: HMAC على الجسم الخام، dedupe بالـ event id، رد سريع.', 'Webhooks: HMAC over the raw body, dedupe by event id, fast replies.'),
        B('التحقق بـ Zod و400 مقابل 422 وشكل أخطاء موحد.', 'Validation with Zod, 400 vs 422 and a uniform error shape.'),
        B('health وإيقاف بنظافة وأمان أساسي وtunnel وreverse proxy.', 'Health, clean stops, basic security, tunnels and reverse proxies.')
      ],
      project: B('ابني «بوابة الطلبات»: سيرفر Express بـ POST /webhooks/shop (توقيع HMAC بالجسم الخام، dedupe، رد 200 فوري، طابور في الذاكرة بيبعت لـ n8n بـ retry)، وPOST /orders (Zod، 201/422)، وGET /orders بفلتر، وAPI key لـ n8n، وhelmet وrate limit وCORS، و/health، وSIGTERM، ولوج JSON بـ request id — وسكربت اختبار بيبعت 10 حالات (صح، توقيع غلط، مكرر، بيانات غلط، جسم كبير…) ويتأكد من كل رد.', 'Build an «orders gateway»: an Express server with POST /webhooks/shop (HMAC over the raw body, dedupe, an immediate 200, an in-memory queue forwarding to n8n with retries), POST /orders (Zod, 201/422), GET /orders with a filter, an API key for n8n, helmet, a rate limit and CORS, /health, SIGTERM and JSON logs with a request id — plus a test script sending 10 cases (valid, bad signature, duplicate, bad data, huge body…) and checking every reply.'),
      test: [
        Q(B('createServer بياخد دالة بـ:', 'createServer takes a function with:'), ['(req, res)', '(a, b, c)', '()'], 0, B('طلب ورد.', 'Request and response.')),
        Q(B('الجسم في node:http بيوصل:', 'In node:http the body arrives:'), [['قطع stream', 'as stream chunks'], ['كائن جاهز', 'as a ready object'], ['في الرابط', 'in the URL']], 0, B('تجمعها.', 'Collect them.')),
        Q(B('req.query في Express:', 'req.query in Express:'), [['قيم ?key=value', 'the ?key=value values'], ['الجسم', 'the body'], ['الـ headers', 'the headers']], 0, B('query string.', 'Query string.')),
        Q(B('middleware بيكمّل بـ:', 'Middleware continues with:'), ['next()', 'return true', 'continue'], 0, B('أو يرد.', 'Or replies.')),
        Q(B('Express 5 وhandler async رمى:', 'Express 5 and an async handler that throws:'), [['يوصل للـ error handler', 'reaches the error handler'], ['السيرفر يقع', 'the server crashes'], ['يتجاهل', 'is ignored']], 0, B('تلقائي.', 'Automatic.')),
        Q(B('webhook route بيستخدم:', 'A webhook route uses:'), ['express.raw', 'express.static', B('من غير parser', 'no parser')], 0, B('للتوقيع.', 'For the signature.')),
        Q(B('مقارنة التوقيعات:', 'Comparing signatures:'), ['timingSafeEqual', '==', 'includes'], 0, B('ثابت الوقت.', 'Constant time.')),
        Q(B('الـ webhook اتبعت تاني:', 'A webhook re-sent:'), [['dedupe بالـ event id', 'dedupe by event id'], ['عالجه تاني', 'process it again'], ['ارجع 500', 'return 500']], 0, B('مرة واحدة.', 'Once.')),
        Q(B('JSON بايظ مقابل تليفون غلط:', 'Broken JSON vs a bad phone:'), ['400 / 422', '422 / 400', '500 / 500'], 0, B('مفهوم ولا لأ.', 'Understood or not.')),
        Q(B('helmet بيضيف:', 'helmet adds:'), [['security headers', 'security headers'], ['قاعدة بيانات', 'a database'], ['routes', 'routes']], 0, B('حماية المتصفح.', 'Browser protection.')),
        Q(B('/health بيستخدمه:', '/health is used by:'), [['المراقبة وDocker', 'monitoring and Docker'], ['العملاء للشراء', 'customers to buy'], ['SEO', 'SEO']], 0, B('حالة السيرفر.', 'Server state.')),
        Q(B('HTTPS في الإنتاج غالبًا من:', 'HTTPS in production usually comes from:'), [['reverse proxy زي Caddy', 'a reverse proxy such as Caddy'], ['Express نفسه', 'Express itself'], ['المتصفح', 'the browser']], 0, B('شهادات تلقائية.', 'Automatic certificates.'))
      ] }
  ]
};
