// JavaScript week 42 — Architecture and patterns for Node/TypeScript projects.
// The import-boundary checker, composition root, patterns, error classes and config loader run in Node.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('المعمارية والأنماط في مشاريع Node وTypeScript', 'Architecture and patterns for Node and TypeScript projects'),
  goal: B('تنظّم مشاريع JavaScript الكبيرة بحيث تفضل سهلة التعديل: حدود واضحة بين الأجزاء واتجاه اعتماد صح، حقن الاعتماديات من غير frameworks، الأنماط اللي JavaScript بيعملها بشكل طبيعي، أخطاء بأنواع وأسباب، وmonorepo وإعدادات بتتحقق من أول ثانية.',
          'Organise large JavaScript projects so they stay easy to change: clear boundaries between parts and the right dependency direction, dependency injection without frameworks, the patterns JavaScript does naturally, typed errors with causes, and a monorepo with configuration validated from the first second.'),
  days: [
    { title: B('الحدود واتجاه الاعتماد', 'Boundaries and dependency direction'),
      goal: B('كل جزء عارف مكانه.', 'Every part knows its place.'),
      learn: [
        L(B('تنظيم بالميزات', 'Organising by feature'),
          B('بدل مجلدات بالنوع (controllers/، models/، services/) فيها كل حاجة: **feature folder** لكل ميزة (orders/، invoices/) فيه الـ domain والـ routes والـ repository بتاعتها. وجوه كل ميزة: **hexagonal architecture** (**ports and adapters**): المنطق في النص من غير Express ولا Postgres، والأدوات على الأطراف.', 'Instead of folders by type (controllers/, models/, services/) holding everything: a **feature folder** per feature (orders/, invoices/) with its own domain, routes and repository. Inside each feature: **hexagonal architecture** (**ports and adapters**): logic in the centre without Express or Postgres, tools at the edges.'),
          'src/\n  orders/\n    domain.ts          pure: Order, totals, rules (no imports from express/pg)\n    use-cases.ts       placeOrder(deps), cancelOrder(deps) — depend on ports\n    ports.ts           interface OrderRepo { … } · interface Notifier { … }\n    adapters/\n      pg-order-repo.ts telegram-notifier.ts  fake-order-repo.ts\n    http.ts            Express routes → use cases\n  invoices/ …\n  main.ts              composition root: build adapters, wire use cases, start the server\n\nrule: domain ← use-cases ← adapters/http/main   (dependencies point inward)', T),
        L(B('افحص الحدود آليًا', 'Check boundaries automatically'),
          B('**dependency direction** غلط (الـ domain بيعمل import لـ pg) بيدخل بهدوء ويبوّظ المعمارية. افحصه في CI: أدوات زي dependency-cruiser أو قاعدة ESLint، والمثال فاحص صغير بيقرا الـ imports ويطبّق القواعد — وبيكشف كمان **circular dependency**.', 'A wrong **dependency direction** (the domain importing pg) creeps in quietly and ruins the architecture. Check it in CI: tools like dependency-cruiser or an ESLint rule; the example is a tiny checker reading imports and applying the rules — and it also detects a **circular dependency**.'),
          'const files = {\n  "orders/domain.ts":      `import { money } from "../shared/money.ts";`,\n  "orders/use-cases.ts":   `import { total } from "./domain.ts"; import type { OrderRepo } from "./ports.ts";`,\n  "orders/ports.ts":       `import type { Order } from "./domain.ts";`,\n  "orders/adapters/pg.ts": `import pg from "pg"; import type { OrderRepo } from "../ports.ts";`,\n  "invoices/domain.ts":    `import { Pool } from "pg"; import { total } from "../orders/domain.ts";`,\n  "shared/money.ts":       `import { fmt } from "./format.ts";`,\n  "shared/format.ts":      `import { money } from "./money.ts";`,\n};\nconst layer = f => f.includes("/adapters/") ? "adapter" : f.endsWith("domain.ts") ? "domain" : f.endsWith("use-cases.ts") ? "use-case" : "other";\nconst imports = src => [...src.matchAll(/from "([^"]+)"/g)].map(m => m[1]);\nconst resolve = (from, spec) => spec.startsWith(".") ? new URL(spec, "file:///src/" + from).pathname.replace("/src/", "") : spec;\n\nfor (const [file, src] of Object.entries(files))\n  for (const spec of imports(src)) {\n    const target = resolve(file, spec);\n    if (layer(file) === "domain" && !spec.startsWith(".")) console.log(`✗ ${file}: domain imports the library «${spec}»`);\n    if (file.split("/")[0] !== target.split("/")[0] && target.includes("/") && !target.startsWith("shared/")) console.log(`✗ ${file}: reaches into another feature (${target}) — go through its public API`);\n  }\nconst graph = Object.fromEntries(Object.entries(files).map(([f, s]) => [f, imports(s).filter(x => x.startsWith(".")).map(x => resolve(f, x))]));\nfor (const f of Object.keys(graph)) for (const g of graph[f]) if (graph[g]?.includes(f) && f < g) console.log(`✗ circular: ${f} ⇄ ${g}`);', N()),
        L(B('الـ barrel files', 'Barrel files'),
          B('**barrel file** (`index.ts` بيعمل export لكل حاجة) مريح، بس بيعمل مشاكل: imports دايرية، تحميل كود مش محتاجه، وصعوبة tree-shaking. استخدمه كـ «API عام» للميزة بس (اللي الميزات التانية مسموحلها تستخدمه)، ومتعملش barrel لكل مجلد. و**module boundary** = الميزات بتتكلم عبر الـ API العام ده بس.', 'A **barrel file** (`index.ts` re-exporting everything) is convenient but causes problems: circular imports, loading unneeded code, and poor tree-shaking. Use it only as a feature’s «public API» (what other features may use), and do not create a barrel for every folder. A **module boundary** = features talk only through that public API.'),
          '// src/orders/index.ts — the ONLY file other features may import from\nexport { placeOrder, cancelOrder } from "./use-cases.ts";\nexport type { Order, OrderId } from "./domain.ts";\n// NOT exported: adapters, internal helpers, the repository\n\n// src/invoices/use-cases.ts\nimport { type Order } from "../orders/index.ts";      // ✓ through the public API\n// import { pgOrderRepo } from "../orders/adapters/pg-order-repo.ts";   ✗ reaching inside', { lang: 'ts' })
      ],
      practice: [
        B('أعد تنظيم مشروع عندك بـ feature folders.', 'Reorganise one of your projects into feature folders.'),
        B('شغّل الفاحص (أو dependency-cruiser) على مشروعك.', 'Run the checker (or dependency-cruiser) on your project.'),
        B('اعمل index.ts كـ API عام لميزة واحدة.', 'Create an index.ts as one feature’s public API.'),
        B('صلّح أي circular dependency.', 'Fix any circular dependency.')
      ],
      words: [
        W('feature folder', 'مجلد لكل ميزة', 'a folder grouping one feature’s code', 'Each feature folder owns its routes and repo.'),
        W('hexagonal architecture', 'المنطق في النص والأدوات على الأطراف', 'logic at the core, tools at the edges', 'Hexagonal architecture keeps Express out of the domain.'),
        W('ports and adapters', 'واجهات وتنفيذاتها', 'interfaces and their implementations', 'With ports and adapters, Telegram is replaceable.'),
        W('dependency direction', 'اتجاه الاعتماد', 'which way imports point', 'Dependency direction must point inward.'),
        W('circular dependency', 'اعتماد دايري', 'two modules importing each other', 'The barrel file caused a circular dependency.'),
        W('barrel file', 'ملف index بيعيد التصدير', 'an index file re-exporting a folder', 'Use one barrel file per feature at most.'),
        W('module boundary', 'حدود الموديول', 'the edge a module exposes to others', 'Respect the module boundary of orders.')
      ],
      read: [{ lib: 'Node.js best practices', what: B('اقرا Project Architecture Practices.', 'Read Project Architecture Practices.') }],
      challenge: B('أعد هيكلة خدمة Express عندك: feature folders، ports.ts وadapters لكل ميزة، index.ts كـ API عام، وفحص حدود في CI (dependency-cruiser أو الفاحص الصغير) بيفشّل الـ build لو الـ domain عمل import لمكتبة.', 'Restructure one of your Express services: feature folders, a ports.ts and adapters per feature, an index.ts as each public API, and a boundary check in CI (dependency-cruiser or the tiny checker) failing the build if a domain imports a library.'),
      quiz: [
        Q(B('الـ domain بيعمل import لـ pg:', 'The domain imports pg:'), [['اتجاه اعتماد غلط', 'a wrong dependency direction'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('للداخل.', 'Inward.')),
        Q(B('ميزة بتستخدم ميزة تانية:', 'One feature using another:'), [['عبر الـ API العام (index.ts)', 'through its public API (index.ts)'], ['import من جوّه adapters', 'import from inside its adapters'], ['نسخ الكود', 'copy the code']], 0, B('حدود.', 'Boundary.')),
        Q(B('a بيستورد b وb بيستورد a:', 'a imports b and b imports a:'), [['circular dependency', 'a circular dependency'], ['تصميم ممتاز', 'excellent design'], ['tree-shaking', 'tree-shaking']], 0, B('دايري.', 'Circular.'))
      ] },

    { title: B('حقن الاعتماديات من غير framework', 'Dependency injection without a framework'),
      goal: B('أجزاء بتتبدّل بسهولة وتتختبر.', 'Parts that swap easily and test easily.'),
      learn: [
        L(B('الـ composition root', 'The composition root'),
          B('في JavaScript مش محتاج framework للـ DI: الدوال بتاخد اعتمادياتها كمعاملات، ومكان واحد بس — **composition root** (`main.ts`) — بيبني الحاجات الحقيقية ويوصّلها. الاختبارات بتعمل نفس الحاجة بـ fakes. ده كفاية لأغلب المشاريع.', 'In JavaScript you need no framework for DI: functions take their dependencies as parameters, and one place only — the **composition root** (`main.ts`) — builds the real things and wires them. Tests do the same with fakes. That is enough for most projects.'),
          '// ports (as JSDoc/TS interfaces): repo.get/save, notifier.send, clock.now\nfunction makeCancelOrder({ repo, notifier, clock }) {\n  return async function cancelOrder(id, reason) {\n    const order = await repo.get(id);\n    if (!order) return { ok: false, error: "not found" };\n    if (order.status === "paid") return { ok: false, error: "paid orders need a refund" };\n    await repo.save({ ...order, status: "cancelled", reason, cancelledAt: clock.now() });\n    await notifier.send(order.phone, `Order ${id} was cancelled.`);\n    return { ok: true };\n  };\n}\n\n// composition root for a test (main.ts does the same with Postgres + Telegram)\nconst db = new Map([[1, { id: 1, status: "new", phone: "0100" }], [2, { id: 2, status: "paid", phone: "0111" }]]);\nconst sent = [];\nconst cancelOrder = makeCancelOrder({\n  repo: { get: async id => db.get(id), save: async o => db.set(o.id, o) },\n  notifier: { send: async (to, text) => sent.push({ to, text }) },\n  clock: { now: () => "2026-10-04T10:00:00Z" },\n});\nconsole.log(await cancelOrder(1, "customer asked"), await cancelOrder(2, "x"), await cancelOrder(9, "x"));\nconsole.log(db.get(1), sent);', N()),
        L(B('Interfaces في TypeScript', 'Interfaces in TypeScript'),
          B('في TypeScript الـ port = `interface` صغيرة، والـ adapter كلاس أو object بيطبّقها. TypeScript بيتأكد إن الـ fake والحقيقي ليهم نفس الشكل (structural typing). ومتعملش interface لكل حاجة — بس للحدود اللي فعلًا بتتبدّل (قاعدة، رسايل، دفع، وقت).', 'In TypeScript a port = a small `interface`, and an adapter is a class or object implementing it. TypeScript ensures the fake and the real one have the same shape (structural typing). Do not make an interface for everything — only for boundaries that really change (database, messaging, payments, time).'),
          'export interface OrderRepo {\n  get(id: number): Promise<Order | undefined>;\n  save(order: Order): Promise<void>;\n}\nexport interface Notifier { send(to: string, text: string): Promise<void>; }\n\nexport class PgOrderRepo implements OrderRepo {\n  constructor(private pool: Pool) {}\n  async get(id: number) { const { rows } = await this.pool.query("SELECT * FROM orders WHERE id = $1", [id]); return rows[0]; }\n  async save(o: Order) { await this.pool.query("UPDATE orders SET status = $2, reason = $3 WHERE id = $1", [o.id, o.status, o.reason]); }\n}\n\n// main.ts — the only place that knows about Pool and Telegram\nconst deps = { repo: new PgOrderRepo(new Pool()), notifier: new TelegramNotifier(env.TG_TOKEN), clock: { now: () => new Date().toISOString() } };\napp.post("/orders/:id/cancel", handleCancel(makeCancelOrder(deps)));', { lang: 'ts' }),
        L(B('الإعدادات في الـ root', 'Configuration at the root'),
          B('الإعدادات (متغيرات البيئة) بتتقري وتتحقق في الـ composition root مرة واحدة، وبتتمرر للأجزاء كقيم عادية — مش `process.env` متفرق في كل ملف. كده الاختبار بيدّي إعدادات من غير ما يلعب في البيئة، والخطأ بيبان أول ما البرنامج يبدأ.', 'Configuration (environment variables) is read and validated once in the composition root and passed to parts as plain values — not `process.env` scattered across files. Then tests supply settings without touching the environment, and errors surface the moment the program starts.'),
          '// ✗ scattered: every module reads the environment whenever it likes\n// export const send = text => fetch(process.env.TG_URL, …)\n\n// ✓ main.ts\nconst config = loadConfig(process.env);            // validated once (day 5)\nconst notifier = makeTelegramNotifier({ url: config.telegramUrl, token: config.telegramToken });\nconst app = makeApp({ orders: makeOrderUseCases({ repo, notifier, clock }) });\napp.listen(config.port);', S)
      ],
      practice: [
        B('حوّل use case لدالة بتاخد deps.', 'Turn a use case into a function taking deps.'),
        B('اعمل main.ts كـ composition root.', 'Create main.ts as the composition root.'),
        B('اكتب interface لـ 3 حدود في TypeScript.', 'Write interfaces for 3 boundaries in TypeScript.'),
        B('شيل process.env من كل الملفات ما عدا الـ root.', 'Remove process.env from every file except the root.')
      ],
      words: [
        W('composition root', 'المكان الوحيد اللي بيوصّل الأجزاء', 'the single place wiring dependencies', 'main.ts is the composition root.'),
        W('structural typing', 'الأنواع حسب الشكل مش الاسم', 'type compatibility by shape', 'Structural typing lets a fake replace the real repo.'),
        W('fake adapter', 'adapter وهمي للاختبار', 'a test implementation of a port', 'The fake adapter stores orders in a Map.'),
        W('wiring', 'توصيل الأجزاء ببعض', 'connecting components together', 'Keep all wiring in main.ts.'),
        W('use case', 'عملية بيزنس واحدة', 'one business operation', 'cancelOrder is a use case.')
      ],
      read: [{ lib: 'TypeScript Handbook', what: B('اقرا Interfaces وType Compatibility.', 'Read Interfaces and Type Compatibility.') }],
      challenge: B('طبّق DI من غير framework على خدمة عندك: كل use case factory بتاخد deps، interfaces للحدود، composition root واحد، fakes لكل port، و10 اختبارات من غير قاعدة ولا شبكة.', 'Apply framework-free DI to one of your services: every use case a factory taking deps, interfaces for boundaries, a single composition root, fakes for every port, and 10 tests without a database or network.'),
      quiz: [
        Q(B('DI في JavaScript محتاج:', 'DI in JavaScript needs:'), [['دوال بتاخد deps وroot واحد', 'functions taking deps and one root'], ['framework إجباري', 'a mandatory framework'], ['global', 'globals']], 0, B('بساطة.', 'Simplicity.')),
        Q(B('process.env يتقري في:', 'process.env is read in:'), [['الـ composition root مرة', 'the composition root, once'], ['كل ملف', 'every file'], ['المتصفح', 'the browser']], 0, B('مكان واحد.', 'One place.')),
        Q(B('fake وحقيقي ليهم نفس الشكل:', 'A fake and the real one share a shape:'), [['structural typing بيتأكد', 'structural typing checks it'], ['صدفة', 'by chance'], ['مستحيل', 'impossible']], 0, B('TypeScript.', 'TypeScript.'))
      ] },

    { title: B('أنماط JavaScript الطبيعية', 'JavaScript’s natural patterns'),
      goal: B('أنماط بسطور قليلة.', 'Patterns in a few lines.'),
      learn: [
        L(B('Strategy وObserver', 'Strategy and Observer'),
          B('**strategy pattern** في JavaScript = object فيه دوال (`carriers[name](weight)`). و**observer pattern** = **eventemitter** في Node أو **eventtarget** في المتصفح وNode: حدث «order:paid» وأي عدد مستمعين (فاتورة، مخزون، رسالة) من غير ما الكود الأصلي يعرفهم.', 'The **strategy pattern** in JavaScript = an object of functions (`carriers[name](weight)`). And the **observer pattern** = **eventemitter** in Node or **eventtarget** in browsers and Node: an «order:paid» event and any number of listeners (invoice, stock, message) without the original code knowing them.'),
          'import { EventEmitter } from "node:events";\n\nconst carriers = {                                       // strategies\n  bosta:  w => 45 + 15 * Math.max(0, w - 1),\n  aramex: w => 60 + 12 * Math.max(0, w - 1),\n  pickup: () => 0,\n};\nconst shipping = (carrier, weight) => (carriers[carrier] ?? carriers.bosta)(weight);\n\nconst events = new EventEmitter({ captureRejections: true });\nevents.on("order:paid", o => console.log(`  invoice for #${o.id}`));\nevents.on("order:paid", o => console.log(`  stock −${o.items.length} items`));\nevents.on("order:paid", async () => { throw new Error("Telegram down"); });\nevents.on("error", e => console.log("  listener failed:", e.message));   // one failure must not crash the app\n\nconst order = { id: 1042, items: ["MUG", "BAG"], weight: 2.5 };\nconsole.log("shipping:", shipping("bosta", order.weight), "|", shipping("pickup", order.weight));\nevents.emit("order:paid", order);\nawait new Promise(r => setTimeout(r, 10));', N()),
        L(B('Middleware وcompose', 'Middleware and compose'),
          B('**compose**: سلسلة دوال كل واحدة بتعمل حاجة وتنادي `next()` — ده قلب Express وKoa وn8n نفسه. تقدر تستخدمه لأي pipeline: تحقق ← تطبيع ← حساب ← حفظ، كل خطوة مستقلة وقابلة للاختبار. المثال بيبني compose في 6 سطور.', '**compose**: a chain of functions, each doing something and calling `next()` — the heart of Express, Koa and n8n itself. Use it for any pipeline: validate → normalise → compute → save, each step independent and testable. The example builds compose in 6 lines.'),
          'const compose = fns => ctx => {\n  const run = i => (i === fns.length ? Promise.resolve() : Promise.resolve(fns[i](ctx, () => run(i + 1))));\n  return run(0);\n};\nconst timing = async (ctx, next) => { const t0 = performance.now(); await next(); ctx.log.push(`took ${(performance.now() - t0).toFixed(1)}ms`); };\nconst validate = async (ctx, next) => { if (!ctx.order.items?.length) { ctx.log.push("rejected: no items"); return; } await next(); };\nconst normalisePhone = async (ctx, next) => { ctx.order.phone = ctx.order.phone.replace(/\\D/g, "").replace(/^20/, "0"); await next(); };\nconst total = async (ctx, next) => { ctx.order.total = ctx.order.items.reduce((s, i) => s + i.qty * i.price, 0); await next(); };\nconst save = async (ctx, next) => { ctx.log.push(`saved #${ctx.order.id} total ${ctx.order.total} phone ${ctx.order.phone}`); await next(); };\n\nconst pipeline = compose([timing, validate, normalisePhone, total, save]);\nfor (const order of [{ id: 1, phone: "+20 101 234 5678", items: [{ qty: 2, price: 120 }] }, { id: 2, phone: "0100", items: [] }]) {\n  const ctx = { order, log: [] };\n  await pipeline(ctx);\n  console.log(ctx.log.join(" | "));\n}', N()),
        L(B('Decorator بالدوال', 'Decorators with functions'),
          B('**decorator pattern** في JavaScript = دالة بتلف دالة وتزوّد سلوك: `withRetry(fetchOrder)`، `withCache(rates, 600)`، `withTiming(handler)`. بتركّبهم فوق بعض، والدالة الأصلية متتغيرش. (TypeScript فيه decorators للكلاسات كمان، بس الدوال أبسط وأوضح.)', 'The **decorator pattern** in JavaScript = a function wrapping a function to add behaviour: `withRetry(fetchOrder)`, `withCache(rates, 600)`, `withTiming(handler)`. You stack them, and the original function stays unchanged. (TypeScript also has class decorators, but functions are simpler and clearer.)'),
          'const withCache = (fn, ttlMs) => { const cache = new Map();\n  return async (...args) => { const k = JSON.stringify(args), hit = cache.get(k);\n    if (hit && Date.now() - hit.t < ttlMs) return { ...hit.v, cached: true };\n    const v = await fn(...args); cache.set(k, { v, t: Date.now() }); return v; }; };\nconst withRetry = (fn, tries = 3) => async (...args) => {\n  for (let i = 1; ; i++) { try { return await fn(...args); } catch (e) { if (i >= tries) throw e; console.log(`  retry ${i}: ${e.message}`); } } };\nconst withTiming = (name, fn) => async (...args) => { const t0 = performance.now(); try { return await fn(...args); } finally { console.log(`  ${name} ${(performance.now() - t0).toFixed(1)}ms`); } };\n\nlet calls = 0;\nconst getRate = async (from, to) => { calls++; if (calls === 1) throw new Error("timeout"); return { from, to, rate: 48.7 }; };\nconst rate = withTiming("rate", withCache(withRetry(getRate), 60_000));\nconsole.log(await rate("USD", "EGP"));\nconsole.log(await rate("USD", "EGP"));\nconsole.log("real API calls:", calls);', N())
      ],
      practice: [
        B('حوّل switch على النوع لـ object strategies.', 'Turn a switch on type into an object of strategies.'),
        B('استخدم EventEmitter لحدث order:paid.', 'Use EventEmitter for an order:paid event.'),
        B('اعمل pipeline بـ compose لمعالجة طلب.', 'Build an order-processing pipeline with compose.'),
        B('لف دالة API بـ withRetry وwithCache.', 'Wrap an API function with withRetry and withCache.')
      ],
      words: [
        W('strategy pattern', 'نمط خوارزميات قابلة للتبديل', 'interchangeable algorithms behind one call', 'The strategy pattern picks the carrier formula.'),
        W('observer pattern', 'نمط المستمعين للأحداث', 'listeners reacting to events', 'The observer pattern decouples invoicing.'),
        W('eventemitter', 'باعث الأحداث في Node', 'Node’s event emitter class', 'EventEmitter notifies three listeners.'),
        W('eventtarget', 'معيار الأحداث في الويب وNode', 'the web-standard event target', 'EventTarget works in browsers and Node.'),
        W('compose', 'تركيب دوال في سلسلة', 'chaining functions into one pipeline', 'compose runs middleware in order.'),
        W('decorator pattern', 'نمط لف دالة بسلوك إضافي', 'wrapping a function to add behaviour', 'withRetry is the decorator pattern.')
      ],
      read: [{ lib: 'Refactoring.Guru: Design patterns', what: B('اقرا Strategy وObserver وDecorator وChain of Responsibility.', 'Read Strategy, Observer, Decorator and Chain of Responsibility.') }],
      challenge: B('أعد كتابة معالجة الطلبات في مشروعك: strategies للشحن والدفع، EventEmitter لأحداث الطلب (مستمع بيفشل ميوقفش الباقي)، pipeline بـ compose للتحقق والحساب والحفظ، وdecorators للـ retry والكاش والتوقيت على نداءات الـ APIs.', 'Rewrite order processing in your project: strategies for shipping and payment, an EventEmitter for order events (a failing listener must not stop the rest), a compose pipeline for validation, calculation and saving, and decorators for retry, caching and timing on API calls.'),
      quiz: [
        Q(B('strategy في JavaScript غالبًا:', 'A strategy in JavaScript is usually:'), [['object فيه دوال', 'an object of functions'], ['10 كلاسات', '10 classes'], ['switch طويل', 'a long switch']], 0, B('بساطة.', 'Simplicity.')),
        Q(B('compose بيوصّل:', 'compose chains:'), [['middleware بـ next()', 'middleware with next()'], ['ملفات CSS', 'CSS files'], ['قواعد بيانات', 'databases']], 0, B('سلسلة.', 'Chain.')),
        Q(B('withCache(withRetry(fn)):', 'withCache(withRetry(fn)):'), [['decorators متركّبة', 'stacked decorators'], ['خطأ', 'an error'], ['وراثة', 'inheritance']], 0, B('لف.', 'Wrapping.'))
      ] },

    { title: B('الأخطاء بأنواع', 'Typed errors'),
      goal: B('أخطاء بتقول إيه اللي حصل وليه.', 'Errors that say what happened and why.'),
      learn: [
        L(B('كلاسات أخطاء', 'Error classes'),
          B('متعملش `throw "error"` (string) أبدًا. اعمل **custom error class** لكل نوع مهم (`NotFoundError`، `ValidationError`، `UpstreamError`) فيه بيانات (الـ id، الحقل)، واستخدم **error cause** (`new Error(msg, { cause })`) عشان تحتفظ بالخطأ الأصلي وانت بتضيف سياق. كده الـ handler يقرر الـ status ويسجّل السلسلة كلها.', 'Never `throw "error"` (a string). Create a **custom error class** for each important kind (`NotFoundError`, `ValidationError`, `UpstreamError`) carrying data (the id, the field), and use **error cause** (`new Error(msg, { cause })`) to keep the original error while adding context. Then the handler decides the status and logs the whole chain.'),
          'class AppError extends Error {\n  constructor(message, { status = 500, code = "internal", cause, details } = {}) {\n    super(message, { cause }); this.name = new.target.name; this.status = status; this.code = code; this.details = details;\n  }\n}\nclass NotFoundError extends AppError { constructor(what, id) { super(`${what} ${id} not found`, { status: 404, code: "not_found", details: { what, id } }); } }\nclass UpstreamError extends AppError { constructor(service, cause) { super(`${service} failed`, { status: 502, code: "upstream", cause }); } }\n\nasync function getInvoice(id) {\n  try { throw Object.assign(new Error("ECONNRESET"), { code: "ECONNRESET" }); }   // pretend: the Odoo call\n  catch (e) { throw new UpstreamError("odoo", e); }\n}\nconst chain = e => { const out = []; for (let x = e; x; x = x.cause) out.push(`${x.name}: ${x.message}`); return out.join("  ←  "); };\nfor (const fn of [() => getInvoice(7), async () => { throw new NotFoundError("order", 9); }]) {\n  try { await fn(); } catch (e) { console.log(e.status, e.code, "|", chain(e)); }\n}', N()),
        L(B('أخطاء الدومين وحدود الأخطاء', 'Domain errors and error boundaries'),
          B('**domain error** = قاعدة بيزنس اتكسرت (طلب مدفوع مينفعش يتلغي) — متوقعة، بترجع للمستخدم برسالة واضحة. والأخطاء غير المتوقعة (باج، قاعدة واقعة) بتتسجل كاملة وبترجع رسالة عامة. **error boundary** = مكان واحد (middleware أخير في Express) بيترجم الأخطاء لردود — مش try/catch في كل route.', 'A **domain error** = a business rule was broken (a paid order cannot be cancelled) — expected, returned to the user with a clear message. Unexpected errors (a bug, a database down) are logged in full and return a generic message. An **error boundary** = one place (a final Express middleware) translating errors into responses — not try/catch in every route.'),
          'import express from "express";\nconst app = express();\n\napp.post("/orders/:id/cancel", async (req, res) => {             // Express 5 forwards async errors\n  const result = await cancelOrder(Number(req.params.id), req.body.reason);\n  res.json(result);\n});\n\n// the error boundary: one place, last\napp.use((err, req, res, _next) => {\n  if (err instanceof AppError && err.status < 500) {\n    return res.status(err.status).json({ error: err.code, message: err.message });     // expected: show it\n  }\n  req.log.error({ err, requestId: req.id }, "unexpected error");                        // full chain with causes\n  res.status(err.status ?? 500).json({ error: "internal", requestId: req.id });         // no internals leaked\n});', S),
        L(B('Result للأخطاء المتوقعة', 'Result for expected failures'),
          B('للعمليات اللي فشلها جزء طبيعي من البيزنس (تحقق من فاتورة، مطابقة دفع): رجّع result (`{ ok: true, value } | { ok: false, error }`) بدل exceptions — الـ TypeScript بيجبرك تتعامل مع الحالتين. والـ exceptions للحاجات الاستثنائية فعلًا.', 'For operations whose failure is a normal part of the business (validating an invoice, matching a payment): return a result (`{ ok: true, value } | { ok: false, error }`) instead of exceptions — TypeScript forces you to handle both cases. Keep exceptions for truly exceptional things.'),
          'type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };\ntype MatchError = "amount_mismatch" | "unknown_reference" | "already_paid";\n\nfunction matchPayment(p: Payment, invoices: Map<string, Invoice>): Result<Invoice, MatchError> {\n  const inv = invoices.get(p.reference);\n  if (!inv) return { ok: false, error: "unknown_reference" };\n  if (inv.paid) return { ok: false, error: "already_paid" };\n  if (Math.abs(inv.total - p.amount) > 0.01) return { ok: false, error: "amount_mismatch" };\n  return { ok: true, value: inv };\n}\n\nconst r = matchPayment(payment, invoices);\nif (!r.ok) reviewQueue.push({ payment, reason: r.error });   // TypeScript knows r.error exists here\nelse await markPaid(r.value);', { lang: 'ts' })
      ],
      practice: [
        B('اعمل AppError و3 أنواع منه.', 'Create AppError and 3 subclasses.'),
        B('استخدم cause لما تلف خطأ.', 'Use cause when wrapping an error.'),
        B('اعمل error boundary واحد في Express.', 'Create one error boundary in Express.'),
        B('حوّل دالة تحقق لـ Result.', 'Convert a validation function to a Result.')
      ],
      words: [
        W('custom error class', 'كلاس خطأ خاص', 'an error type you define', 'NotFoundError is a custom error class.'),
        W('error cause', 'الخطأ الأصلي جوه خطأ جديد', 'the original error inside a new one', 'Keep the error cause when wrapping.'),
        W('domain error', 'خطأ قاعدة بيزنس', 'a broken business rule', 'Cancelling a paid order is a domain error.'),
        W('error boundary', 'مكان واحد بيترجم الأخطاء', 'one place translating errors into responses', 'The error boundary hides internals.'),
        W('expected failure', 'فشل متوقع وطبيعي', 'a normal, anticipated failure case', 'An unknown reference is an expected failure.')
      ],
      read: [{ t: 'MDN: Error: cause', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause', what: B('اقرا الأمثلة.', 'Read the examples.') }],
      challenge: B('نظّم الأخطاء في خدمتك: AppError بأنواع وstatus وcode، cause في كل لف، error boundary واحد بيسجّل السلسلة ويخبّي التفاصيل، وResult لمطابقة المدفوعات — مع اختبارات لكل نوع.', 'Organise errors in your service: AppError with kinds, status and code, cause on every wrap, one error boundary logging the chain and hiding internals, and a Result for payment matching — with tests for each kind.'),
      quiz: [
        Q(B('throw "failed":', 'throw "failed":'), [['غلط: مفيش stack ولا نوع', 'wrong: no stack, no type'], ['صح', 'right'], ['أسرع', 'faster']], 0, B('Error.', 'Error.')),
        Q(B('cause:', 'cause:'), [['يحتفظ بالخطأ الأصلي', 'keeps the original error'], ['يمسحه', 'deletes it'], ['يعيد المحاولة', 'retries']], 0, B('سلسلة.', 'Chain.')),
        Q(B('خطأ 500 للمستخدم:', 'A 500 error for the user:'), [['رسالة عامة وrequestId', 'a generic message and a requestId'], ['الـ stack كامل', 'the full stack'], ['SQL', 'the SQL']], 0, B('تسريب.', 'Leakage.'))
      ] },

    { title: B('Monorepo والإعدادات', 'Monorepo and configuration'),
      goal: B('كذا تطبيق بيتشاركوا كود بنظام.', 'Several apps sharing code in an orderly way.'),
      learn: [
        L(B('npm workspaces', 'npm workspaces'),
          B('عندك API وworker وإضافة متصفح وnode n8n بيتشاركوا أنواع ومنطق؟ **monorepo** بـ **npm workspaces**: ريبو واحد، `apps/` و`packages/`، و**shared package** (`@shop/domain`) بتعمله import زي أي مكتبة. تغيير واحد في الأنواع بيبان أثره في كل التطبيقات في نفس الـ PR.', 'An API, a worker, a browser extension and an n8n node sharing types and logic? A **monorepo** with **npm workspaces**: one repo, `apps/` and `packages/`, and a **shared package** (`@shop/domain`) imported like any library. One change to the types shows its effect on every app in the same PR.'),
          '// package.json (root)\n{\n  "private": true,\n  "workspaces": ["apps/*", "packages/*"],\n  "scripts": { "build": "npm run build -ws --if-present", "test": "npm test -ws --if-present" }\n}\n\napps/api/             package.json → "dependencies": { "@shop/domain": "*" }\napps/worker/\napps/extension/\npackages/domain/      "name": "@shop/domain" — Order types, totals, VAT rules (pure, no I/O)\npackages/config/      "name": "@shop/config" — loadConfig()\n\nnpm install            # links packages/* into node_modules\nnpm test -w apps/api   # one workspace', T),
        L(B('تحقق الإعدادات من البداية', 'Validate config at startup'),
          B('**config validation** = أول حاجة البرنامج بيعملها: يقرا متغيرات البيئة، يحوّلها لأنواع (رقم، رابط، قايمة)، ويتأكد إن المطلوب موجود — ولو فيه غلط يقف فورًا برسالة واضحة بكل المشاكل مرة واحدة. أحسن من خطأ غامض بعد ساعة في نص الليل. (zod في المشروع الحقيقي.)', '**config validation** = the first thing the program does: read environment variables, convert them to types (number, URL, list), and make sure what is required exists — and on any error stop immediately with a clear message listing all problems at once. Better than a cryptic error an hour later in the middle of the night. (zod in a real project.)'),
          'function loadConfig(env) {\n  const errors = [], c = {};\n  const req = (k, conv = v => v) => { if (!env[k]) { errors.push(`${k} is required`); return; } try { return conv(env[k]); } catch (e) { errors.push(`${k}: ${e.message}`); } };\n  const url = v => { const u = new URL(v); if (u.protocol !== "https:" && !u.hostname.match(/^(localhost|127\\.0\\.0\\.1)$/)) throw new Error("must be https"); return u.href; };\n  const int = (min, max) => v => { const n = Number(v); if (!Number.isInteger(n) || n < min || n > max) throw new Error(`must be an integer ${min}–${max}`); return n; };\n  const opt = (k, conv, fallback) => { if (!env[k]) return fallback; try { return conv(env[k]); } catch (e) { errors.push(`${k}: ${e.message}`); } };\n  c.port = opt("PORT", int(1, 65535), 3000);\n  c.databaseUrl = req("DATABASE_URL");\n  c.n8nWebhook = req("N8N_WEBHOOK_URL", url);\n  c.workers = opt("WORKERS", int(1, 32), 2);\n  c.features = new Set((env.FEATURES ?? "").split(",").map(s => s.trim()).filter(Boolean));\n  if (errors.length) throw new Error("invalid configuration:\\n  - " + errors.join("\\n  - "));\n  return Object.freeze(c);\n}\nconsole.log(loadConfig({ DATABASE_URL: "postgres://app@db/shop", N8N_WEBHOOK_URL: "https://n8n.example.com/webhook/x", FEATURES: "ai_replies, new_checkout" }));\ntry { loadConfig({ N8N_WEBHOOK_URL: "http://n8n.example.com", WORKERS: "100" }); } catch (e) { console.log(e.message); }', N()),
        L(B('Feature flags', 'Feature flags'),
          B('**feature flag** = مفتاح بيشغّل ميزة جديدة من غير نشر (لعميل واحد، 10% من الطلبات، أو فريقك بس). بيخليك تدمج كود لسه مش جاهز ومقفول، وتجرّب بأمان، وتقفل بسرعة لو حصلت مشكلة. ونضّف الـ flags القديمة — كل flag بعد شهرين = دين تقني.', 'A **feature flag** = a switch turning on a new feature without a deploy (for one client, 10% of orders, or just your team). It lets you merge unfinished code switched off, experiment safely, and switch off fast on trouble. And clean up old flags — every flag after two months is technical debt.'),
          'const flags = {\n  ai_replies:   { enabled: true, clients: ["acme"], percent: 0 },\n  new_checkout: { enabled: true, clients: [], percent: 10 },\n  old_export:   { enabled: false },\n};\nconst bucket = id => [...String(id)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 100, 7);   // stable 0–99 per id\nfunction isOn(name, { client, orderId }) {\n  const f = flags[name];\n  if (!f?.enabled) return false;\n  if (f.clients?.includes(client)) return true;\n  return bucket(orderId) < (f.percent ?? 0);\n}\nconst sample = Array.from({ length: 1000 }, (_, i) => i + 5000);\nconsole.log("ai_replies for acme:", isOn("ai_replies", { client: "acme", orderId: 1 }), "| for beta:", isOn("ai_replies", { client: "beta", orderId: 1 }));\nconsole.log("new_checkout share:", sample.filter(id => isOn("new_checkout", { client: "x", orderId: id })).length / 10 + "%");\nconsole.log("same order, same answer:", isOn("new_checkout", { orderId: 5123 }) === isOn("new_checkout", { orderId: 5123 }));', N())
      ],
      practice: [
        B('حوّل مشروعين لـ monorepo بـ workspaces.', 'Turn two projects into a monorepo with workspaces.'),
        B('انقل الأنواع المشتركة لـ shared package.', 'Move shared types into a shared package.'),
        B('اعمل loadConfig بيقف بكل الأخطاء.', 'Build a loadConfig that stops with every error listed.'),
        B('ضيف feature flag لميزة جديدة.', 'Add a feature flag for a new feature.')
      ],
      words: [
        W('monorepo', 'ريبو واحد لكذا تطبيق', 'one repository holding several projects', 'The API and worker live in one monorepo.'),
        W('npm workspaces', 'إدارة حزم متعددة في ريبو', 'npm’s multi-package support', 'npm workspaces link packages locally.'),
        W('shared package', 'حزمة مشتركة بين التطبيقات', 'a package used by several apps', '@shop/domain is a shared package.'),
        W('config validation', 'التحقق من الإعدادات', 'checking configuration at startup', 'Config validation caught a missing URL.'),
        W('feature flag', 'مفتاح تشغيل ميزة', 'a switch enabling a feature at run time', 'Turn the feature flag on for acme only.')
      ],
      read: [{ lib: 'npm Docs', what: B('اقرا Workspaces.', 'Read Workspaces.') }],
      challenge: B('اعمل monorepo لمشاريع المتجر: apps (api، worker، extension) وpackages (domain، config)، loadConfig مشترك بيتحقق من كل حاجة، feature flags بنسبة وعملاء، وCI بيشغّل build وtest لكل workspace.', 'Build a monorepo for the shop projects: apps (api, worker, extension) and packages (domain, config), a shared loadConfig validating everything, feature flags by percentage and client, and CI running build and test for every workspace.'),
      quiz: [
        Q(B('أنواع مشتركة بين API وworker:', 'Types shared by the API and worker:'), [['shared package في monorepo', 'a shared package in a monorepo'], ['نسخ ولصق', 'copy and paste'], ['ملف على Drive', 'a file on Drive']], 0, B('مصدر واحد.', 'One source.')),
        Q(B('متغير بيئة ناقص:', 'A missing environment variable:'), [['البرنامج يقف أول ما يبدأ برسالة واضحة', 'stop at startup with a clear message'], ['يشتغل ويقع بعدين', 'run and fail later'], ['قيمة افتراضية غلط', 'a wrong default']], 0, B('fail fast.', 'Fail fast.')),
        Q(B('feature flag:', 'A feature flag:'), [['تشغيل ميزة من غير نشر', 'turning a feature on without a deploy'], ['علم الشركة', 'the company flag'], ['خطأ', 'an error']], 0, B('أمان.', 'Safety.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مشاريع JavaScript كبيرة ومنظمة.', 'Large, well-organised JavaScript projects.'),
      review: [
        B('feature folders وhexagonal وفحص الحدود والـ barrels.', 'Feature folders, hexagonal, boundary checks and barrels.'),
        B('DI بالدوال والـ composition root والـ interfaces.', 'DI with functions, the composition root and interfaces.'),
        B('strategy وobserver وcompose وdecorators.', 'Strategy, observer, compose and decorators.'),
        B('كلاسات أخطاء وcause وerror boundary وResult.', 'Error classes, cause, the error boundary and Result.'),
        B('monorepo والإعدادات والـ feature flags.', 'Monorepo, configuration and feature flags.')
      ],
      project: B('مشروع الأسبوع «إعادة معمارية خدمة المتجر» بـ TypeScript: monorepo بـ workspaces (api، worker، packages/domain، packages/config)، feature folders بـ ports وadapters وfakes، composition root واحد، فحص حدود في CI، EventEmitter لأحداث الطلب، compose للمعالجة، decorators للـ APIs، أخطاء بأنواع وerror boundary، loadConfig وfeature flags — و30 اختبار من غير شبكة.', 'Week project «re-architecting the shop service» in TypeScript: a workspaces monorepo (api, worker, packages/domain, packages/config), feature folders with ports, adapters and fakes, a single composition root, a boundary check in CI, an EventEmitter for order events, compose for processing, decorators for APIs, typed errors and an error boundary, loadConfig and feature flags — and 30 tests without network.'),
      test: [
        Q(B('feature folder:', 'A feature folder:'), [['كود ميزة واحدة مع بعض', 'one feature’s code together'], ['كل الـ controllers', 'all controllers'], ['مجلد صور', 'an images folder']], 0, B('cohesion.', 'Cohesion.')),
        Q(B('الـ domain يعرف Express؟', 'Does the domain know Express?'), [['لأ', 'no'], ['أيوه', 'yes'], ['أحيانًا', 'sometimes']], 0, B('مستقل.', 'Independent.')),
        Q(B('barrel لكل مجلد:', 'A barrel for every folder:'), [['بيعمل imports دايرية وتحميل زيادة', 'causes circular imports and extra loading'], ['مثالي', 'ideal'], ['إجباري', 'required']], 0, B('اعتدال.', 'Moderation.')),
        Q(B('composition root:', 'The composition root:'), [['المكان الوحيد اللي بيوصّل الأجزاء', 'the only place wiring the parts'], ['ملف CSS', 'a CSS file'], ['قاعدة بيانات', 'a database']], 0, B('توصيل.', 'Wiring.')),
        Q(B('اختبار use case:', 'Testing a use case:'), [['fakes للـ ports', 'fakes for the ports'], ['Postgres حقيقي دايمًا', 'always a real Postgres'], ['يدوي', 'by hand']], 0, B('سرعة.', 'Speed.')),
        Q(B('EventEmitter وlistener async بيفشل:', 'EventEmitter with a failing async listener:'), [['captureRejections وevent error', 'captureRejections and an error event'], ['البرنامج يقع', 'the program crashes'], ['يتجاهل', 'ignored']], 0, B('عزل.', 'Isolation.')),
        Q(B('compose:', 'compose:'), [['سلسلة middleware', 'a middleware chain'], ['ضغط ملفات', 'file compression'], ['Docker Compose', 'Docker Compose']], 0, B('next().', 'next().')),
        Q(B('decorator بالدوال:', 'A function decorator:'), [['دالة بتلف دالة', 'a function wrapping a function'], ['CSS', 'CSS'], ['تعليق', 'a comment']], 0, B('لف.', 'Wrapping.')),
        Q(B('error cause:', 'Error cause:'), [['السلسلة الأصلية للخطأ', 'the original error chain'], ['رقم الخطأ', 'the error number'], ['حل الخطأ', 'the fix']], 0, B('سياق.', 'Context.')),
        Q(B('Result بدل exception لـ:', 'Result instead of an exception for:'), [['فشل متوقع في البيزنس', 'expected business failures'], ['كل حاجة', 'everything'], ['ولا حاجة', 'nothing']], 0, B('متوقع.', 'Expected.')),
        Q(B('npm workspaces:', 'npm workspaces:'), [['حزم متعددة في ريبو واحد', 'several packages in one repo'], ['مساحات عمل مكتب', 'office spaces'], ['سحابة', 'a cloud']], 0, B('monorepo.', 'Monorepo.')),
        Q(B('flag عمره 6 شهور:', 'A 6-month-old flag:'), [['نضّفه: دين تقني', 'clean it up: technical debt'], ['سيبه للأبد', 'keep it forever'], ['ضاعفه', 'duplicate it']], 0, B('تنظيف.', 'Cleanup.'))
      ] }
  ]
};
