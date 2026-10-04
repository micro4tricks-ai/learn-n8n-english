// JavaScript week 44 — Serverless and the edge, and the month 11 project.
// fetch(request, env, ctx) handlers run in Node with the standard Request/Response globals and fake bindings;
// wrangler, Hono and Lambda code is shown only. Prices are placeholders — check each pricing page.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الـ serverless والـ edge ومشروع الشهر', 'Serverless and the edge, and the month project'),
  goal: B('تشغّل JavaScript قريب من المستخدمين ومن غير سيرفرات: handlers بـ Web APIs القياسية، Cloudflare Workers وتخزينها (KV وD1 وR2) وجداولها وطوابيرها، أنماط الكاش والـ webhooks على الـ edge، كود محمول بين المنصات، وحسابات التكلفة والحدود — وتجمع شهر الهندسة المتقدمة في مشروع.',
          'Run JavaScript close to users and without servers: handlers using the standard Web APIs, Cloudflare Workers with their storage (KV, D1, R2), schedules and queues, caching and webhook patterns at the edge, code portable across platforms, and cost and limit calculations — and bring the advanced-engineering month together in one project.'),
  days: [
    { title: B('handler بـ Web APIs', 'A handler with Web APIs'),
      goal: B('دالة واحدة بتشتغل في أي مكان.', 'One function that runs anywhere.'),
      learn: [
        L(B('serverless والـ edge', 'Serverless and the edge'),
          B('**serverless** = بتكتب دالة والمنصة بتشغّلها على الطلب وتوسّعها وبتدفع على الاستخدام. و**edge function** = نفس الفكرة بس في مئات المدن قريب من المستخدم (Cloudflare Workers، Vercel Edge، Deno Deploy). بتشتغل في **v8 isolate** (مش container) فالـ cold start بالملي ثانية — بس من غير fs كامل وبحد للـ CPU.', '**serverless** = you write a function and the platform runs it per request, scales it and bills by usage. An **edge function** = the same idea but in hundreds of cities close to the user (Cloudflare Workers, Vercel Edge, Deno Deploy). It runs in a **v8 isolate** (not a container), so cold starts are milliseconds — but there is no full fs and CPU time is limited.'),
          'request from Cairo ──▶ nearest edge location (e.g. Cairo/Jeddah) ──▶ your Worker (V8 isolate, ~5 ms start)\n                                                       ├─ cache hit? return immediately\n                                                       ├─ KV / D1 / R2 (data at the edge)\n                                                       └─ origin API / n8n only when needed\ncontainer serverless (Lambda, Cloud Run): seconds of cold start, full Node, any library\nedge isolates (Workers): ms cold start, Web APIs, CPU-time limits, some Node APIs via compat', T),
        L(B('fetch handler', 'The fetch handler'),
          B('**web standard apis**: الـ handler بياخد `Request` ويرجّع `Response` (نفس كلاسات المتصفح وNode 18+). في Workers الشكل `export default { fetch(request, env, ctx) }`، و`env` فيه الـ bindings (أسرار، KV، D1). الكود ده بيشتغل في Node زي ما هو — المثال بيشغّله بطلبات حقيقية.', '**web standard apis**: the handler takes a `Request` and returns a `Response` (the same classes as browsers and Node 18+). In Workers the shape is `export default { fetch(request, env, ctx) }`, and `env` holds the bindings (secrets, KV, D1). This code runs in Node as is — the example runs it with real requests.'),
          'const worker = {\n  async fetch(request, env, ctx) {\n    const url = new URL(request.url);\n    if (url.pathname === "/health") return new Response("ok");\n    if (url.pathname.startsWith("/orders/") && request.method === "GET") {\n      const id = Number(url.pathname.split("/")[2]);\n      if (!Number.isInteger(id)) return Response.json({ error: "bad id" }, { status: 400 });\n      const order = await env.ORDERS.get(id);\n      return order ? Response.json(order, { headers: { "cache-control": "max-age=30" } }) : Response.json({ error: "not found" }, { status: 404 });\n    }\n    return new Response("Not found", { status: 404 });\n  },\n};\nconst env = { ORDERS: { get: async id => ({ 1042: { id: 1042, status: "shipped" } })[id] } };\nfor (const path of ["/health", "/orders/1042", "/orders/9", "/orders/abc", "/x"]) {\n  const res = await worker.fetch(new Request("https://api.example.com" + path), env, {});\n  console.log(path.padEnd(14), res.status, await res.text());\n}', N()),
        L(B('الحدود', 'The limits'),
          B('الـ edge مش لكل حاجة: حد لوقت الـ CPU لكل طلب (مللي ثواني لثواني حسب الخطة)، حجم الكود، ومفيش اتصالات TCP طويلة لقاعدة بيانات تقليدية من غير proxy. مناسب لـ: APIs خفيفة، webhooks، redirects، كاش، تحقق وتوجيه. مش مناسب لـ: توليد PDF تقيل، معالجة ملفات ضخمة، شغل دقايق.', 'The edge is not for everything: a CPU-time limit per request (milliseconds to seconds depending on the plan), code size, and no long-lived TCP connections to a traditional database without a proxy. Good for: light APIs, webhooks, redirects, caching, validation and routing. Not good for: heavy PDF generation, huge file processing, minutes-long work.'),
          'fits the edge                         better elsewhere\nwebhook verify → enqueue (5 ms)       render 500 PDF invoices (worker/container)\nshort-link redirects, A/B routing     export 2 GB CSV (container + streams)\nauth checks, geo rules, rate limits   long AI agent runs (queue + worker)\ncached product API with KV            Postgres with many queries (use a pooler/Hyperdrive or a region server)', T)
      ],
      practice: [
        B('اكتب fetch handler وشغّله في Node بطلبات.', 'Write a fetch handler and run it in Node with requests.'),
        B('رجّع JSON وstatus وheaders صح.', 'Return JSON, statuses and headers correctly.'),
        B('صنّف 6 مهام عندك: edge ولا مكان تاني.', 'Classify 6 of your tasks: edge or elsewhere.'),
        B('اقرا حدود الخطة المجانية لـ Workers.', 'Read the Workers free-plan limits.')
      ],
      words: [
        W('serverless', 'تشغيل من غير إدارة سيرفرات', 'running code without managing servers', 'The webhook runs serverless.'),
        W('edge function', 'دالة بتشتغل قريب من المستخدم', 'a function running near the user', 'An edge function answers in 20 ms.'),
        W('v8 isolate', 'بيئة تشغيل خفيفة جوه V8', 'a lightweight sandbox inside V8', 'A V8 isolate starts in milliseconds.'),
        W('web standard apis', 'Request وResponse وfetch القياسية', 'the standard Request, Response and fetch', 'Web standard APIs make the handler portable.'),
        W('fetch handler', 'دالة بتاخد Request وترجّع Response', 'a function from Request to Response', 'The fetch handler routes by path.'),
        W('environment bindings', 'موارد بتتحقن في env', 'resources injected into env', 'KV and secrets arrive as environment bindings.'),
        W('cpu time limit', 'حد وقت المعالج لكل طلب', 'the CPU time allowed per request', 'PDF rendering hit the CPU time limit.')
      ],
      read: [{ lib: 'Cloudflare Workers', what: B('اقرا Get started وLimits.', 'Read Get started and Limits.') }],
      challenge: B('اكتب API منتجات كـ fetch handler (قايمة، منتج، 404، تحقق من المدخلات، cache-control) واختبره بـ node:test بطلبات Request حقيقية — من غير أي مكتبة.', 'Write a products API as a fetch handler (list, item, 404, input validation, cache-control) and test it with node:test using real Request objects — with no library.'),
      quiz: [
        Q(B('الـ edge cold start:', 'Edge cold start:'), [['ملي ثواني (isolate)', 'milliseconds (an isolate)'], ['دقايق', 'minutes'], ['مفيش تشغيل', 'no start']], 0, B('V8.', 'V8.')),
        Q(B('توليد 500 PDF:', 'Rendering 500 PDFs:'), [['worker أو container', 'a worker or container'], ['edge function', 'an edge function'], ['المتصفح', 'the browser']], 0, B('CPU.', 'CPU.')),
        Q(B('handler بيرجّع:', 'A handler returns:'), [['Response', 'a Response'], ['res.send', 'res.send'], ['console.log', 'console.log']], 0, B('قياسي.', 'Standard.'))
      ] },

    { title: B('Cloudflare Workers عمليًا', 'Cloudflare Workers in practice'),
      goal: B('Worker كامل بتخزين وجداول.', 'A complete Worker with storage and schedules.'),
      learn: [
        L(B('wrangler والـ bindings', 'wrangler and bindings'),
          B('**wrangler** = أداة Workers: `npx wrangler dev` (محلي) و`deploy`. الإعدادات في `wrangler.jsonc`: الـ bindings اللي بتظهر في `env` — **workers kv** (key-value سريع للقراية، متزامن عالميًا بتأخير)، **d1** (SQLite)، **r2** (ملفات زي S3 من غير رسوم خروج)، والأسرار بـ `wrangler secret put`.', '**wrangler** = the Workers tool: `npx wrangler dev` (local) and `deploy`. Settings live in `wrangler.jsonc`: the bindings that appear in `env` — **workers kv** (fast-read key-value, globally replicated with delay), **d1** (SQLite), **r2** (S3-like files with no egress fees), and secrets via `wrangler secret put`.'),
          '// wrangler.jsonc\n{\n  "name": "shop-edge",\n  "main": "src/index.js",\n  "compatibility_date": "2026-09-01",\n  "compatibility_flags": ["nodejs_compat"],\n  "kv_namespaces": [{ "binding": "CACHE", "id": "…" }],\n  "d1_databases": [{ "binding": "DB", "database_name": "shop", "database_id": "…" }],\n  "r2_buckets": [{ "binding": "FILES", "bucket_name": "shop-invoices" }],\n  "queues": { "producers": [{ "binding": "JOBS", "queue": "shop-jobs" }], "consumers": [{ "queue": "shop-jobs" }] },\n  "triggers": { "crons": ["0 4 * * *"] }          // 04:00 UTC = 06:00/07:00 Cairo\n}\n// secrets (never in this file):  npx wrangler secret put N8N_WEBHOOK_TOKEN', T),
        L(B('Worker بتخزين', 'A Worker with storage'),
          B('الـ handler بيستخدم `env.DB` (D1 بـ SQL مع parameters) و`env.CACHE` (KV بـ TTL). و`ctx.waitUntil(promise)` بيخلّي شغل يكمّل بعد ما الرد يتبعت (تسجيل، تحديث كاش) من غير ما المستخدم يستنى. المثال بيشغّل نفس الكود بـ bindings وهمية في Node.', 'The handler uses `env.DB` (D1 with parameterised SQL) and `env.CACHE` (KV with a TTL). And `ctx.waitUntil(promise)` lets work continue after the response is sent (logging, cache refresh) without the user waiting. The example runs the same code with fake bindings in Node.'),
          'const kvStore = new Map();\nconst env = {\n  CACHE: { get: async (k, type) => { const e = kvStore.get(k); if (!e || e.exp < Date.now()) return null; return type === "json" ? JSON.parse(e.v) : e.v; },\n           put: async (k, v, { expirationTtl } = {}) => kvStore.set(k, { v, exp: Date.now() + (expirationTtl ?? 1e9) * 1000 }) },\n  DB: { prepare: sql => ({ bind: (...args) => ({ first: async () => { env.DB.queries++; return { id: args[0], name: "Leather backpack", price: 850 }; } }) }), queries: 0 },\n};\nconst pending = [];\nconst ctx = { waitUntil: p => pending.push(p) };\n\nconst worker = { async fetch(request, env, ctx) {\n  const id = Number(new URL(request.url).pathname.split("/").pop());\n  const key = `product:${id}`;\n  const cached = await env.CACHE.get(key, "json");\n  if (cached) return Response.json(cached, { headers: { "x-cache": "HIT" } });\n  const row = await env.DB.prepare("SELECT id, name, price FROM products WHERE id = ?").bind(id).first();\n  ctx.waitUntil(env.CACHE.put(key, JSON.stringify(row), { expirationTtl: 300 }));   // after the response\n  return Response.json(row, { headers: { "x-cache": "MISS" } });\n} };\nfor (let i = 0; i < 3; i++) {\n  const res = await worker.fetch(new Request("https://shop.example.com/products/17"), env, ctx);\n  await Promise.all(pending.splice(0));\n  console.log(res.headers.get("x-cache"), await res.text());\n}\nconsole.log("database queries:", env.DB.queries);', N()),
        L(B('جداول وطوابير', 'Schedules and queues'),
          B('Workers فيها **cron trigger** (`scheduled` handler) للمهام الدورية (تقرير يومي، تنظيف)، وQueues: الـ fetch handler يحط رسالة ويرد فورًا، و`queue` handler بيعالج دفعات بإعادة محاولة. نفس نمط «استلمنا» و«خلّصنا» من أسبوع 36 — بس من غير سيرفر.', 'Workers have a **cron trigger** (a `scheduled` handler) for periodic jobs (a daily report, cleanup), and Queues: the fetch handler enqueues a message and replies at once, and a `queue` handler processes batches with retries. The same «received» vs «done» pattern from week 36 — without a server.'),
          'export default {\n  async fetch(request, env) {\n    const order = await request.json();\n    await env.JOBS.send({ type: "invoice", orderId: order.id });     // enqueue, reply fast\n    return Response.json({ accepted: order.id }, { status: 202 });\n  },\n  async queue(batch, env) {\n    for (const msg of batch.messages) {\n      try { await createInvoice(msg.body.orderId, env); msg.ack(); }\n      catch (e) { msg.retry({ delaySeconds: 60 }); }                  // retried later; dead-letter after max retries\n    }\n  },\n  async scheduled(event, env, ctx) {\n    ctx.waitUntil(sendDailyReport(env));                              // cron "0 4 * * *"\n  },\n};', S)
      ],
      practice: [
        B('اعمل Worker بـ wrangler dev وشغّله محليًا.', 'Create a Worker with wrangler dev and run it locally.'),
        B('ضيف KV كاش بـ TTL وD1 للبيانات.', 'Add a KV cache with a TTL and D1 for data.'),
        B('استخدم ctx.waitUntil لشغل بعد الرد.', 'Use ctx.waitUntil for work after the response.'),
        B('ضيف cron trigger لتقرير يومي.', 'Add a cron trigger for a daily report.')
      ],
      words: [
        W('wrangler', 'أداة تطوير ونشر Workers', 'the CLI for building and deploying Workers', 'Run npx wrangler dev locally.'),
        W('workers kv', 'تخزين key-value على الـ edge', 'Cloudflare’s edge key-value store', 'Cache products in Workers KV.'),
        W('d1', 'قاعدة SQLite على Cloudflare', 'Cloudflare’s serverless SQLite', 'Orders live in D1.'),
        W('r2', 'تخزين ملفات من Cloudflare', 'Cloudflare’s object storage', 'Invoices are stored in R2.'),
        W('waituntil', 'كمّل شغل بعد الرد', 'continue work after responding', 'ctx.waitUntil refreshes the cache.'),
        W('cron trigger', 'تشغيل Worker بجدول', 'running a Worker on a schedule', 'A cron trigger sends the daily report.'),
        W('nodejs_compat', 'علامة توافق مع APIs Node', 'a flag enabling Node APIs in Workers', 'Enable nodejs_compat for node:crypto.')
      ],
      read: [{ lib: 'Cloudflare Workers', what: B('اقرا Bindings وKV وD1.', 'Read Bindings, KV and D1.') }],
      challenge: B('ابني «shop-edge» على Workers: API منتجات من D1 بكاش KV وwaitUntil، رفع فواتير لـ R2 بروابط موقّعة، طابور للمهام التقيلة، cron لتقرير يومي لـ n8n — وكل الأسرار بـ wrangler secret.', 'Build «shop-edge» on Workers: a products API from D1 with a KV cache and waitUntil, invoice uploads to R2 with signed links, a queue for heavy jobs, a cron for a daily report to n8n — with every secret via wrangler secret.'),
      quiz: [
        Q(B('KV مناسب لـ:', 'KV suits:'), [['قراية سريعة لبيانات بتتغير قليل', 'fast reads of rarely changing data'], ['عدّاد بيتحدث 1000 مرة في الثانية', 'a counter updated 1,000 times a second'], ['ملفات ضخمة', 'huge files']], 0, B('قراية.', 'Reads.')),
        Q(B('شغل بعد الرد من غير ما المستخدم يستنى:', 'Work after the response without the user waiting:'), [['ctx.waitUntil', 'ctx.waitUntil'], ['setTimeout', 'setTimeout'], ['مستحيل', 'impossible']], 0, B('بعد.', 'After.')),
        Q(B('مهمة كل يوم 6 الصبح:', 'A job every day at 6 am:'), [['cron trigger', 'a cron trigger'], ['while(true)', 'while(true)'], ['المستخدم يدوس', 'a user click']], 0, B('جدول.', 'Schedule.'))
      ] },

    { title: B('أنماط الـ edge', 'Edge patterns'),
      goal: B('سرعة وحماية قبل ما الطلب يوصل للسيرفر.', 'Speed and protection before requests reach the server.'),
      learn: [
        L(B('stale-while-revalidate', 'Stale-while-revalidate'),
          B('**stale-while-revalidate**: لو الكاش قديم شوية، رجّعه فورًا وحدّثه في الخلفية (waitUntil). المستخدم دايمًا بياخد رد سريع، والبيانات بتتجدد. و**edge caching** بـ `Cache-Control` و**cache api** بتاع Workers بيقلل الطلبات على السيرفر الأصلي لـ 1% أحيانًا.', '**stale-while-revalidate**: if the cache is a little old, return it at once and refresh it in the background (waitUntil). The user always gets a fast reply, and the data stays fresh. And **edge caching** with `Cache-Control` and the Workers **cache api** sometimes cuts origin requests to 1%.'),
          'const cache = new Map();                          // stands in for caches.default / KV\nlet originCalls = 0, now = 0;\nconst origin = async path => { originCalls++; return { path, price: 850 + originCalls, at: now }; };\nconst pending = [];\nasync function swr(path, { fresh = 60, stale = 600 } = {}) {\n  const hit = cache.get(path);\n  const age = hit ? now - hit.at : Infinity;\n  if (age < fresh) return { ...hit.v, cache: "fresh" };\n  if (age < stale) {                                 // serve stale now, refresh in the background\n    pending.push(origin(path).then(v => cache.set(path, { v, at: now })));\n    return { ...hit.v, cache: "stale (refreshing)" };\n  }\n  const v = await origin(path); cache.set(path, { v, at: now });\n  return { ...v, cache: "miss" };\n}\nfor (const t of [0, 30, 90, 95, 2000]) {\n  now = t;\n  const r = await swr("/products/17");\n  await Promise.all(pending.splice(0));\n  console.log(`t=${String(t).padStart(4)}s price ${r.price} (${r.cache})`);\n}\nconsole.log("origin calls:", originCalls);', N()),
        L(B('الجغرافيا والحدود على الـ edge', 'Geography and limits at the edge'),
          B('الـ edge عارف بلد المستخدم (`request.cf.country` في Workers): عملة وأسعار ولغة افتراضية، أو منع دول لأسباب قانونية. و**rate limiting at the edge** بيوقف الإساءة قبل ما توصل لسيرفرك (Cloudflare فيها Rate Limiting binding، أو Durable Objects للعدادات الدقيقة).', 'The edge knows the user’s country (`request.cf.country` in Workers): currency, prices and a default language, or blocking countries for legal reasons. And **rate limiting at the edge** stops abuse before it reaches your server (Cloudflare has a Rate Limiting binding, or Durable Objects for exact counters).'),
          'const PRICES = { EG: { currency: "EGP", rate: 1 }, SA: { currency: "SAR", rate: 0.077 }, AE: { currency: "AED", rate: 0.075 } };\nconst limits = new Map();\nfunction allow(ip, now, max = 5, windowMs = 60_000) {\n  const hits = (limits.get(ip) ?? []).filter(t => now - t < windowMs);\n  if (hits.length >= max) return false;\n  hits.push(now); limits.set(ip, hits); return true;\n}\nconst worker = { async fetch(request) {\n  const ip = request.headers.get("cf-connecting-ip") ?? "0.0.0.0";\n  if (!allow(ip, Number(request.headers.get("x-test-now")))) return new Response("Too many requests", { status: 429, headers: { "retry-after": "60" } });\n  const country = request.cf?.country ?? "EG";\n  const p = PRICES[country] ?? PRICES.EG;\n  return Response.json({ product: "backpack", price: Math.round(850 * p.rate * 100) / 100, currency: p.currency });\n} };\nfor (const [country, i] of [["EG", 1], ["SA", 2], ["AE", 3], ["EG", 4], ["EG", 5], ["EG", 6]]) {\n  const req = new Request("https://shop.example.com/price", { headers: { "cf-connecting-ip": "203.0.113.9", "x-test-now": String(i * 1000) } });\n  req.cf = { country };                              // Workers fills this in for you\n  const res = await worker.fetch(req);\n  console.log(country, res.status, await res.text());\n}', N()),
        L(B('webhooks على الـ edge', 'Webhooks at the edge'),
          B('**webhook at the edge**: Worker بيستقبل webhooks Shopify/Paymob، يتحقق من التوقيع (Web Crypto `crypto.subtle`)، يحط الحدث في طابور، ويرد 200 في ملي ثواني — حتى لو n8n أو سيرفرك واقع. ده بيحل مشكلة «المزود بيلغي الـ webhook لو الرد اتأخر».', 'A **webhook at the edge**: a Worker receives Shopify/Paymob webhooks, verifies the signature (Web Crypto `crypto.subtle`), puts the event on a queue, and replies 200 in milliseconds — even if n8n or your server is down. This solves «the provider disables the webhook when replies are slow».'),
          'const enc = new TextEncoder();\nasync function hmacHex(secret, body) {\n  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);\n  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(body));\n  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, "0")).join("");\n}\nconst queue = [];\nconst env = { SECRET: "example-webhook-secret", JOBS: { send: async m => queue.push(m) } };\nconst worker = { async fetch(request, env) {\n  const raw = await request.text();                                   // the raw body, before any parsing\n  const expected = await hmacHex(env.SECRET, raw);\n  if (request.headers.get("x-signature") !== expected) return new Response("bad signature", { status: 401 });\n  const event = JSON.parse(raw);\n  await env.JOBS.send({ id: event.id, type: event.type });\n  return new Response("ok");                                          // n8n can be down: the queue holds it\n} };\nconst body = JSON.stringify({ id: "evt_77", type: "order.paid" });\nconst good = new Request("https://edge.example.com/hooks", { method: "POST", body, headers: { "x-signature": await hmacHex(env.SECRET, body) } });\nconst bad = new Request("https://edge.example.com/hooks", { method: "POST", body, headers: { "x-signature": "00" } });\nconsole.log((await worker.fetch(good, env)).status, (await worker.fetch(bad, env)).status, queue);', N())
      ],
      practice: [
        B('اعمل SWR لـ API منتجات.', 'Build SWR for a products API.'),
        B('اعرض الأسعار حسب بلد المستخدم.', 'Show prices by the user’s country.'),
        B('ضيف rate limit على endpoint عام.', 'Add a rate limit to a public endpoint.'),
        B('انقل webhook Shopify لـ Worker بطابور.', 'Move a Shopify webhook to a Worker with a queue.')
      ],
      words: [
        W('stale-while-revalidate', 'رجّع القديم وحدّث في الخلفية', 'serve stale data while refreshing', 'Stale-while-revalidate keeps pages fast.'),
        W('edge caching', 'الكاش على الـ edge', 'caching responses at edge locations', 'Edge caching cut origin traffic by 90%.'),
        W('cache api', 'API الكاش في Workers', 'the Workers caches API', 'Store the response with the cache API.'),
        W('geolocation', 'معرفة مكان المستخدم', 'knowing the user’s location', 'Geolocation picks the currency.'),
        W('rate limiting at the edge', 'تحديد الطلبات على الـ edge', 'blocking excess requests before the origin', 'Rate limiting at the edge stopped the bot.'),
        W('webhook at the edge', 'استقبال webhooks على الـ edge', 'receiving webhooks in an edge function', 'A webhook at the edge never times out.'),
        W('crypto.subtle', 'تشفير Web القياسي', 'the standard Web Crypto API', 'crypto.subtle signs the HMAC in Workers.')
      ],
      read: [{ lib: 'Cloudflare Workers', what: B('اقرا Cache API وQueues.', 'Read Cache API and Queues.') }],
      challenge: B('ضيف طبقة edge قدام متجرك: SWR للمنتجات والأسعار، أسعار وعملة حسب البلد، rate limit على البحث والـ login، وwebhooks Shopify/Paymob على Worker بتوقيع وطابور لـ n8n — وقيس زمن الرد قبل وبعد.', 'Put an edge layer in front of your shop: SWR for products and prices, country-based prices and currency, rate limits on search and login, and Shopify/Paymob webhooks on a Worker with signatures and a queue to n8n — and measure response time before and after.'),
      quiz: [
        Q(B('SWR:', 'SWR:'), [['رجّع القديم فورًا وحدّث في الخلفية', 'serve stale at once and refresh behind'], ['استنى الجديد دايمًا', 'always wait for fresh'], ['متخزنش', 'never cache']], 0, B('سرعة.', 'Speed.')),
        Q(B('التحقق من HMAC في Workers:', 'Verifying HMAC in Workers:'), [['crypto.subtle', 'crypto.subtle'], ['md5', 'md5'], ['مستحيل', 'impossible']], 0, B('Web Crypto.', 'Web Crypto.')),
        Q(B('webhook وn8n واقع:', 'A webhook while n8n is down:'), [['الطابور بيمسكه والـ Worker يرد 200', 'the queue holds it; the Worker replies 200'], ['يضيع', 'it is lost'], ['المزود يستنى للأبد', 'the provider waits forever']], 0, B('طابور.', 'Queue.'))
      ] },

    { title: B('كود محمول', 'Portable code'),
      goal: B('نفس الكود على Workers وNode وLambda.', 'The same code on Workers, Node and Lambda.'),
      learn: [
        L(B('Hono', 'Hono'),
          B('**hono** = framework صغير مبني على Web APIs، بيشتغل على Workers وNode وDeno وBun وLambda وVercel من غير تعديل. Routing وmiddleware وvalidation زي Express، بس بـ Request/Response القياسية. ده بيقلل الـ vendor lock-in: تبدأ على Workers وتنقل لـ Node لو احتجت.', '**hono** = a small framework built on Web APIs, running on Workers, Node, Deno, Bun, Lambda and Vercel unchanged. Routing, middleware and validation like Express, but with standard Request/Response. This reduces vendor lock-in: start on Workers and move to Node if you need to.'),
          'import { Hono } from "hono";\nimport { bearerAuth } from "hono/bearer-auth";\n\nconst app = new Hono();\napp.get("/health", c => c.text("ok"));\napp.use("/admin/*", async (c, next) => bearerAuth({ token: c.env.ADMIN_TOKEN })(c, next));\napp.get("/orders/:id", async c => {\n  const order = await c.env.DB.prepare("SELECT * FROM orders WHERE id = ?").bind(c.req.param("id")).first();\n  return order ? c.json(order) : c.json({ error: "not found" }, 404);\n});\n\nexport default app;                              // Workers / Bun / Deno\n// Node:   import { serve } from "@hono/node-server"; serve({ fetch: app.fetch, port: 3000 });\n// Lambda: import { handle } from "hono/aws-lambda"; export const handler = handle(app);', S),
        L(B('router بالـ Web APIs', 'A router on Web APIs'),
          B('عشان تشوف ليه الكود ده محمول: router صغير بـ URLPattern-like matching بياخد Request ويرجّع Response — مفيش أي حاجة خاصة بمنصة. نفس الدالة تتحط في Workers أو Node (`http` + adapter) أو Deno.', 'To see why this code is portable: a tiny router with path matching takes a Request and returns a Response — nothing platform-specific. The same function can be dropped into Workers, Node (`http` + an adapter) or Deno.'),
          'function router() {\n  const routes = [];\n  const add = method => (path, handler) => { routes.push({ method, re: new RegExp("^" + path.replace(/:(\\w+)/g, "(?<$1>[^/]+)") + "$"), handler }); return api; };\n  const api = { get: add("GET"), post: add("POST"),\n    async fetch(req, env = {}) {\n      const { pathname } = new URL(req.url);\n      for (const r of routes) { const m = pathname.match(r.re); if (m && r.method === req.method) return r.handler(req, m.groups ?? {}, env); }\n      return new Response("Not found", { status: 404 });\n    } };\n  return api;\n}\nconst app = router()\n  .get("/orders/:id", (req, { id }) => Response.json({ id: Number(id), status: "shipped" }))\n  .post("/orders", async req => Response.json({ created: (await req.json()).items.length + " items" }, { status: 201 }));\n\nconsole.log(await (await app.fetch(new Request("https://x/orders/1042"))).json());\nconsole.log((await app.fetch(new Request("https://x/orders", { method: "POST", body: JSON.stringify({ items: [1, 2] }) }))).status);\nconsole.log((await app.fetch(new Request("https://x/nope"))).status);\n// Node: http.createServer(async (req, res) => { const r = await app.fetch(toWebRequest(req)); … })', N()),
        L(B('Lambda وVercel', 'Lambda and Vercel'),
          B('**aws lambda** بـ Node: `export const handler = async (event) => {...}` بشكل الـ event الخاص بـ API Gateway (أو Hono adapter). **vercel functions** و**netlify functions**: ملف في `api/` بيعمل export لـ handler بـ Request/Response. اختار حسب مكان باقي نظامك — المهم المنطق يفضل في دوال عادية مستقلة عن المنصة.', '**aws lambda** with Node: `export const handler = async (event) => {...}` with API Gateway’s event shape (or a Hono adapter). **vercel functions** and **netlify functions**: a file in `api/` exporting a handler with Request/Response. Choose by where the rest of your system lives — what matters is that the logic stays in plain, platform-independent functions.'),
          '// AWS Lambda (Node 22) — API Gateway HTTP API\nexport const handler = async event => {\n  const id = Number(event.pathParameters?.id);\n  if (!Number.isInteger(id)) return { statusCode: 400, body: JSON.stringify({ error: "bad id" }) };\n  const order = await getOrder(id);                      // the same domain function used everywhere\n  return { statusCode: order ? 200 : 404, headers: { "content-type": "application/json" }, body: JSON.stringify(order ?? { error: "not found" }) };\n};\n\n// Vercel / Netlify (web-standard signature) — api/orders/[id].js\nexport default async function (request) {\n  const id = Number(new URL(request.url).pathname.split("/").pop());\n  return Response.json(await getOrder(id));\n}', S)
      ],
      practice: [
        B('اكتب API بـ Hono وشغّله على Node وWorkers.', 'Write an API with Hono and run it on Node and Workers.'),
        B('اعمل router بالـ Web APIs واختبره.', 'Build a Web-API router and test it.'),
        B('اكتب نفس الـ endpoint كـ Lambda handler.', 'Write the same endpoint as a Lambda handler.'),
        B('افصل المنطق عن المنصة في دوال عادية.', 'Separate logic from the platform into plain functions.')
      ],
      words: [
        W('hono', 'framework صغير على Web APIs', 'a small framework on web standards', 'Hono runs on Workers and Node.'),
        W('aws lambda', 'خدمة الدوال في AWS', 'Amazon’s function service', 'The export runs on AWS Lambda.'),
        W('lambda handler', 'دالة Lambda الأساسية', 'the function Lambda calls', 'The lambda handler returns statusCode 200.'),
        W('vercel functions', 'دوال serverless على Vercel', 'serverless functions on Vercel', 'Vercel functions live in api/.'),
        W('netlify functions', 'دوال serverless على Netlify', 'serverless functions on Netlify', 'Netlify functions handle the form.'),
        W('vendor lock-in', 'الارتباط بمنصة واحدة', 'dependence on one platform', 'Web APIs reduce vendor lock-in.')
      ],
      read: [{ t: 'Hono', url: 'https://hono.dev/docs/', what: B('اقرا Getting Started وأي runtime بتستخدمه.', 'Read Getting Started and the runtime you use.') }],
      challenge: B('اكتب API الطلبات مرة واحدة بـ Hono والمنطق في دوال domain مستقلة، وانشره على Workers وشغّله على Node محليًا بنفس الكود — واكتب adapter Lambda من غير ما تلمس المنطق.', 'Write the orders API once with Hono and the logic in independent domain functions, deploy it to Workers and run it on Node locally with the same code — and write a Lambda adapter without touching the logic.'),
      quiz: [
        Q(B('Hono بيشتغل على:', 'Hono runs on:'), [['Workers وNode وDeno وBun وLambda', 'Workers, Node, Deno, Bun and Lambda'], ['Workers بس', 'Workers only'], ['المتصفح بس', 'the browser only']], 0, B('محمول.', 'Portable.')),
        Q(B('Lambda handler بيرجّع:', 'A Lambda handler returns:'), [['{ statusCode, body }', '{ statusCode, body }'], ['res.json', 'res.json'], ['console.log', 'console.log']], 0, B('API Gateway.', 'API Gateway.')),
        Q(B('عشان تقلل lock-in:', 'To reduce lock-in:'), [['المنطق في دوال مستقلة وWeb APIs', 'logic in independent functions and Web APIs'], ['كل حاجة بـ APIs المنصة', 'everything via platform APIs'], ['متكتبش اختبارات', 'skip tests']], 0, B('حدود.', 'Boundaries.'))
      ] },

    { title: B('التكلفة والاختيار', 'Cost and choice'),
      goal: B('المنصة الصح بالأرقام.', 'The right platform, by the numbers.'),
      learn: [
        L(B('نموذج التكلفة', 'The cost model'),
          B('serverless = **pay per request** + وقت التشغيل، وفيه **free tier** كبير غالبًا، و**scale to zero** (مفيش طلبات = مفيش فلوس). رخيص جدًا للحمل القليل أو المتقطع، وممكن يغلى للحمل الثابت العالي جدًا — ساعتها VPS أو container دايم أرخص. احسب (الأسعار في المثال أمثلة).', 'Serverless = **pay per request** + run time, often with a generous **free tier**, and **scale to zero** (no requests = no money). Very cheap for low or bursty load, and it can get expensive for very high steady load — then a VPS or always-on container is cheaper. Calculate (the prices in the example are placeholders).'),
          'const plans = {   // placeholder prices — check each provider\'s pricing page\n  "edge (Workers paid)": req => 5 + Math.max(0, req - 10e6) / 1e6 * 0.30,\n  "lambda (128 MB, 50 ms)": req => req / 1e6 * 0.20 + req * 0.05 * (128 / 1024) * 0.0000166667,\n  "small VPS": () => 6,\n  "container (always on)": () => 15,\n};\nfor (const req of [100_000, 5e6, 50e6, 500e6]) {\n  const costs = Object.entries(plans).map(([name, f]) => [name, f(req)]);\n  const best = costs.reduce((a, b) => (b[1] < a[1] ? b : a));\n  console.log(`${req.toLocaleString("en").padStart(11)} req/month → ` + costs.map(([n, c]) => `${n.split(" ")[0]} $${c.toFixed(2)}`).join(" · ") + `  ⇒ ${best[0]}`);\n}', N()),
        L(B('اختار المنصة', 'Choosing the platform'),
          B('اسأل: الحمل شكله إيه (قليل، متقطع، ثابت عالي)؟ زمن الشغل (ملي ثواني ولا دقايق)؟ محتاج Node كامل ومكتبات (Playwright، sharp)؟ البيانات فين (Postgres في منطقة معينة)؟ قيود قانونية على مكان البيانات؟ الفريق يعرف إيه؟ وغالبًا الحل خليط: edge للدخول والكاش، وcontainer أو worker للشغل التقيل.', 'Ask: what does the load look like (low, bursty, steady high)? How long does work take (milliseconds or minutes)? Do you need full Node and libraries (Playwright, sharp)? Where is the data (Postgres in a region)? Legal limits on data location? What does the team know? Often the answer is a mix: the edge for entry and caching, a container or worker for heavy work.'),
          'decision guide\nwebhooks, redirects, light APIs, auth/geo rules       → edge (Workers)\nAPI with Postgres in one region, steady traffic        → container near the DB (Cloud Run / VPS + Docker)\nbursty batch jobs (nightly exports, OCR)               → Lambda / queue consumers\nPlaywright, LibreOffice, big native libraries          → container or VM\nn8n itself                                             → VPS/container (queue mode for scale)\ntypical mix: Worker (webhooks + cache) → queue → container workers → Postgres', T),
        L(B('الحدود ومراقبة التكلفة', 'Limits and cost monitoring'),
          B('اعرف حدود كل منصة قبل ما تتفاجئ: وقت الطلب، الذاكرة، حجم الـ body، عدد الـ subrequests، الـ CPU. وحط تنبيه ميزانية من أول يوم، وراقب «طلبات غريبة» (bot أو لفة بين خدمتين ممكن تكلّفك آلاف في يوم). والـ scale to zero سلاح ذو حدين: رخيص، بس الهجوم كمان بيـscale.', 'Know each platform’s limits before they surprise you: request time, memory, body size, subrequest count, CPU. Set a budget alert from day one, and watch for «odd traffic» (a bot or a loop between two services can cost thousands in a day). And scale to zero cuts both ways: cheap, but an attack scales too.'),
          'guard rails for serverless\n☐ budget alerts at 50% / 80% / 100%            ☐ rate limits on every public route\n☐ max retries + dead-letter on every queue       ☐ no function calling itself (recursion loops!)\n☐ alarms on invocation count anomalies            ☐ request body size limits\n☐ timeouts shorter than the platform maximum      ☐ log sampling (logs cost money too)', T)
      ],
      practice: [
        B('احسب تكلفة خدمتك على 4 منصات.', 'Compute your service’s cost on 4 platforms.'),
        B('املا decision guide لمشروعك.', 'Fill in the decision guide for your project.'),
        B('اقرا حدود المنصة اللي هتستخدمها.', 'Read the limits of the platform you will use.'),
        B('حط budget alert النهارده.', 'Set a budget alert today.')
      ],
      words: [
        W('pay per request', 'دفع لكل طلب', 'billing for each invocation', 'Pay per request suits bursty traffic.'),
        W('free tier', 'استخدام مجاني محدود', 'a limited free allowance', 'The free tier covers our staging.'),
        W('scale to zero', 'صفر تشغيل لما مفيش طلبات', 'running nothing when idle', 'Scale to zero keeps nights free.'),
        W('subrequest', 'طلب من جوه الـ function لخدمة تانية', 'a request made from inside a function', 'Workers limit subrequests per request.'),
        W('budget alert', 'تنبيه الميزانية', 'a warning when spending passes a threshold', 'The budget alert caught a retry loop.')
      ],
      read: [{ lib: 'Cloudflare Workers', what: B('اقرا Pricing وLimits.', 'Read Pricing and Limits.') }],
      challenge: B('اكتب «قرار منصة» لمشروع حقيقي: حساب تكلفة على 4 خيارات لـ 3 مستويات حمل، decision guide متملي، المعمارية المختلطة المقترحة برسم، الحدود اللي ممكن تقابلها، والـ guard rails — صفحة واحدة لعميل أو مدير.', 'Write a «platform decision» for a real project: a cost calculation for 4 options at 3 load levels, a filled decision guide, the proposed mixed architecture with a diagram, the limits you may hit, and the guard rails — one page for a client or manager.'),
      quiz: [
        Q(B('حمل قليل ومتقطع:', 'Low, bursty load:'), [['serverless غالبًا أرخص', 'serverless is usually cheaper'], ['VPS كبير', 'a big VPS'], ['3 سيرفرات', 'three servers']], 0, B('scale to zero.', 'Scale to zero.')),
        Q(B('Playwright في الإنتاج:', 'Playwright in production:'), [['container أو VM', 'a container or VM'], ['edge function', 'an edge function'], ['المتصفح', 'the browser']], 0, B('مكتبات.', 'Libraries.')),
        Q(B('function بتنادي نفسها في لفة:', 'A function calling itself in a loop:'), [['ممكن تكلّف آلاف في يوم', 'can cost thousands in a day'], ['مجاني', 'free'], ['أسرع', 'faster']], 0, B('guard rails.', 'Guard rails.'))
      ] },

    { title: B('مراجعة الشهر الحادي عشر ومشروعه', 'Month 11 review and project'),
      goal: B('هندسة JavaScript على مستوى خبير.', 'JavaScript engineering at expert level.'),
      review: [
        B('الـ event loop والـ streams والـ workers والعمليات (أسبوع 41).', 'The event loop, streams, workers and processes (week 41).'),
        B('المعمارية: الحدود وDI والأنماط والأخطاء والـ monorepo (أسبوع 42).', 'Architecture: boundaries, DI, patterns, errors and the monorepo (week 42).'),
        B('الأمان: XSS والثغرات الخاصة بـ JS وSSRF وسلسلة التوريد (أسبوع 43).', 'Security: XSS, JS-specific flaws, SSRF and the supply chain (week 43).'),
        B('الـ serverless والـ edge: handlers وWorkers والتخزين والطوابير.', 'Serverless and the edge: handlers, Workers, storage and queues.'),
        B('أنماط الـ edge والكود المحمول والتكلفة.', 'Edge patterns, portable code and cost.')
      ],
      project: B('مشروع الشهر الحادي عشر «منصة المتجر بمعايير خبير»: monorepo بـ TypeScript (domain مشترك، API، worker)، Worker على الـ edge لاستقبال webhooks موقّعة وطابور وكاش SWR وrate limit، API بـ Hono محمول (Workers وNode)، worker pool لتوليد PDFs وتصدير CSV مضغوط بـ streams، أخطاء بأنواع وloadConfig، مراجعة أمان كاملة (CSP بـ nonce، prototype pollution، SSRF، SRI، gitleaks)، وحساب تكلفة وقرار منصة — مع 40 اختبار.', 'Month 11 project «an expert-grade shop platform»: a TypeScript monorepo (shared domain, API, worker), an edge Worker receiving signed webhooks with a queue, SWR caching and rate limits, a portable Hono API (Workers and Node), a worker pool for PDFs and compressed CSV exports with streams, typed errors and loadConfig, a full security review (nonce CSP, prototype pollution, SSRF, SRI, gitleaks), and a cost calculation and platform decision — with 40 tests.'),
      test: [
        Q(B('process.nextTick جوه timer:', 'process.nextTick inside a timer:'), [['قبل الـ promises', 'before promises'], ['بعد setTimeout تاني', 'after another setTimeout'], ['مش بيتنفذ', 'never runs']], 0, B('أولوية.', 'Priority.')),
        Q(B('write() رجّعت false:', 'write() returned false:'), [['استنى drain', 'wait for drain'], ['اكتب أكتر', 'write more'], ['اقفل', 'close']], 0, B('flow control.', 'Flow control.')),
        Q(B('حساب تقيل في API:', 'Heavy computation in an API:'), [['worker threads', 'worker threads'], ['async بس', 'just async'], ['setTimeout', 'setTimeout']], 0, B('CPU.', 'CPU.')),
        Q(B('composition root:', 'The composition root:'), [['مكان واحد بيوصّل الأجزاء', 'one place wiring the parts'], ['كل ملف', 'every file'], ['قاعدة البيانات', 'the database']], 0, B('توصيل.', 'Wiring.')),
        Q(B('error cause:', 'Error cause:'), [['الخطأ الأصلي جوه الجديد', 'the original error inside the new one'], ['رقم سطر', 'a line number'], ['حل', 'a fix']], 0, B('سياق.', 'Context.')),
        Q(B('href = javascript:…:', 'href = javascript:…:'), [['ارفض البروتوكول', 'reject the protocol'], ['escape يكفي', 'escaping is enough'], ['عادي', 'fine']], 0, B('XSS.', 'XSS.')),
        Q(B('__proto__ في JSON مستخدم:', '__proto__ in user JSON:'), [['ارفضه (prototype pollution)', 'reject it (prototype pollution)'], ['اقبله', 'accept it'], ['حوّله لرقم', 'convert it to a number']], 0, B('pollution.', 'Pollution.')),
        Q(B('fetch لرابط مستخدم:', 'Fetching a user-supplied URL:'), [['BlockList للعناوين الداخلية', 'a BlockList for internal addresses'], ['مباشرة', 'directly'], ['eval', 'eval']], 0, B('SSRF.', 'SSRF.')),
        Q(B('fetch handler بيرجّع:', 'A fetch handler returns:'), [['Response', 'a Response'], ['res.send', 'res.send'], ['undefined', 'undefined']], 0, B('Web APIs.', 'Web APIs.')),
        Q(B('ctx.waitUntil:', 'ctx.waitUntil:'), [['شغل بعد الرد', 'work after the response'], ['يوقف الطلب', 'stops the request'], ['تأخير', 'a delay']], 0, B('بعد.', 'After.')),
        Q(B('SWR:', 'SWR:'), [['القديم فورًا وتحديث في الخلفية', 'stale at once, refresh behind'], ['دايمًا من الأصل', 'always from origin'], ['من غير كاش', 'no cache']], 0, B('سرعة.', 'Speed.')),
        Q(B('حمل ثابت عالي جدًا:', 'Very high steady load:'), [['container أو VPS ممكن أرخص', 'a container or VPS may be cheaper'], ['serverless دايمًا أرخص', 'serverless is always cheaper'], ['مجاني', 'free']], 0, B('احسب.', 'Calculate.'))
      ] }
  ]
};
