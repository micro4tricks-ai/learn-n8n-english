// JavaScript week 27 — testing with Vitest (examples run with Node's built-in node:test, which has the same shape).
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الاختبارات بـ Vitest', 'Testing with Vitest'),
  goal: B('تكتب اختبارات بتديك ثقة تغيّر الكود: unit وintegration، كود async ووقت وهمي، mocks للـ APIs، اختبار سيرفرات HTTP والـ webhooks، والتغطية وTDD وCI — بـ Vitest وبـ node:test المدمج.',
          'Write tests that give you the confidence to change code: unit and integration tests, async code and fake time, mocks for APIs, testing HTTP servers and webhooks, coverage, TDD and CI — with Vitest and the built-in node:test.'),
  days: [
    { title: B('أول اختبارات', 'First tests'),
      goal: B('تكتب اختبارات واضحة لدوال نقية.', 'Write clear tests for pure functions.'),
      learn: [
        L(B('ليه نختبر؟', 'Why test?'),
          B('**unit test** = كود صغير بيشغّل دالة ويتأكد من النتيجة. فايدته الحقيقية مش «الكود شغال النهارده» — هي إنك تقدر **تغيّر** بكرة من غير خوف: لو كسرت حاجة، الاختبار يقولك في ثانية. ومجموعة الاختبارات = **test suite**. **vitest** إطار سريع حديث، وNode فيه `node:test` مدمج بنفس الشكل تقريبًا.', 'A **unit test** = a little code that runs a function and checks the result. Its real value is not «the code works today» — it is that you can **change** it tomorrow without fear: if you break something, a test tells you in a second. A group of tests = a **test suite**. **vitest** is a fast modern framework, and Node has a built-in `node:test` of nearly the same shape.'),
          'import { describe, it } from "node:test";\nimport assert from "node:assert/strict";\n\nfunction vat(total, rate = 0.14) {\n  if (!(total >= 0)) throw new RangeError("total must be ≥ 0");\n  return Math.round(total * rate * 100) / 100;\n}\n\ndescribe("vat", () => {\n  it("uses 14% by default", () => assert.equal(vat(100), 14));\n  it("rounds to 2 decimals", () => assert.equal(vat(10.55), 1.48));\n  it("accepts another rate", () => assert.equal(vat(200, 0.15), 30));\n  it("rejects negative totals", () => assert.throws(() => vat(-1), RangeError));\n});', N()),
        L(B('نفس الكلام بـ Vitest', 'The same in Vitest'),
          B('في Vitest: `describe` و`it` (أو `test`) و`expect(x).toBe(y)` — نفس الفكرة بـ **assertion library** أغنى: `toEqual` (مقارنة عميقة للكائنات)، `toContain`، `toThrow`، `toMatchObject`. `npm i -D vitest` وscript `"test": "vitest"` — وبيشغّل TS مباشرة وبيعيد لوحده عند الحفظ.', 'In Vitest: `describe`, `it` (or `test`) and `expect(x).toBe(y)` — the same idea with a richer **assertion library**: `toEqual` (deep comparison of objects), `toContain`, `toThrow`, `toMatchObject`. `npm i -D vitest` and a `"test": "vitest"` script — it runs TS directly and re-runs on save.'),
          'import { describe, it, expect } from "vitest";\nimport { vat, summarize } from "../src/money.ts";\n\ndescribe("summarize", () => {\n  it("totals orders and VAT", () => {\n    expect(summarize([{ id: 1, total: 100 }, { id: 2, total: 50 }])).toEqual({ count: 2, total: 150, vat: 21 });\n  });\n  it("handles an empty list", () => {\n    expect(summarize([])).toMatchObject({ count: 0, total: 0 });\n  });\n  it("throws on negative totals", () => {\n    expect(() => vat(-1)).toThrow(RangeError);\n  });\n});', S),
        L(B('شكل الاختبار الكويس', 'The shape of a good test'),
          B('**arrange act assert**: جهّز البيانات، نفّذ الفعل، اتأكد من النتيجة — بالترتيب ده وبفاصل واضح. اسم الاختبار جملة بتقول السلوك («rejects negative totals»)، واختبار واحد = سلوك واحد. واختبر الحدود (**edge-case test**): صفر، فاضي، null، عربي، أرقام كبيرة.', '**arrange act assert**: prepare the data, perform the action, check the result — in that order with clear separation. A test name is a sentence stating behaviour («rejects negative totals»), and one test = one behaviour. And test the boundaries (each **edge-case test**): zero, empty, null, Arabic, huge numbers.'),
          'import { test } from "node:test";\nimport assert from "node:assert/strict";\nconst normalizePhone = raw => {\n  const d = String(raw ?? "").replace(/[\\u0660-\\u0669]/g, c => c.charCodeAt(0) - 0x660).replace(/[\\s\\-()]/g, "");\n  const m = d.match(/^(?:\\+?20|0)?(1[0125]\\d{8})$/);\n  return m ? "+20" + m[1] : null;\n};\nfor (const [input, expected] of [["01001234567", "+201001234567"], ["+20 100 123 4567", "+201001234567"], ["٠١٠٠١٢٣٤٥٦٧", "+201001234567"], ["", null], [null, null], ["0100123", null]]) {\n  test(`normalizePhone(${JSON.stringify(input)}) → ${expected}`, () => {\n    // arrange: the table row · act: call · assert: compare\n    assert.equal(normalizePhone(input), expected);\n  });\n}', N())
      ],
      practice: [
        B('اكتب 5 اختبارات لـ formatEGP.', 'Write 5 tests for formatEGP.'),
        B('ثبّت Vitest وشغّله في watch mode.', 'Install Vitest and run it in watch mode.'),
        B('حوّل اختبارات لجدول (test.each أو loop).', 'Turn tests into a table (test.each or a loop).'),
        B('اكتب 3 اختبارات حدود لدالة عندك.', 'Write 3 edge-case tests for one of your functions.')
      ],
      words: [
        W('unit test', 'اختبار لدالة أو جزء صغير لوحده', 'a test of one small piece on its own', 'Each mapper has a unit test.'),
        W('test suite', 'مجموعة الاختبارات', 'the collection of tests', 'The test suite runs in 2 seconds.'),
        W('vitest', 'إطار اختبارات سريع لـ JS وTS', 'a fast test framework for JS and TS', 'Vitest re-runs on save.'),
        W('describe', 'تجميع اختبارات تحت اسم', 'grouping tests under a name', 'describe("vat") holds four tests.'),
        W('assertion library', 'أدوات التأكد من النتايج', 'tools for checking results', 'expect is Vitest’s assertion library.'),
        W('toequal', 'مقارنة عميقة للقيم', 'a deep comparison of values', 'toEqual compares the objects’ contents.'),
        W('arrange act assert', 'جهّز، نفّذ، اتأكد', 'prepare, perform, check', 'Follow arrange act assert in every test.'),
        W('edge-case test', 'اختبار للحالات الطرفية', 'a test of boundary cases', 'Add an edge-case test for empty input.')
      ],
      read: [{ lib: 'Vitest', what: B('اقرا Getting Started وWriting Tests.', 'Read Getting Started and Writing Tests.') }, { lib: 'Node.js test runner', what: B('اقرا describe/it وassert.', 'Read describe/it and assert.') }],
      challenge: B('اكتب test suite لموديول arabic.mjs (أسبوع 20): 25 اختبار بجداول للتطبيع والأرقام والترتيب والبحث، بأسماء واضحة — وخليه ينجح في Vitest وnode:test.', 'Write a test suite for the arabic.mjs module (week 20): 25 table-driven tests for normalisation, digits, sorting and search, with clear names — passing in both Vitest and node:test.'),
      quiz: [
        Q(B('أكبر فايدة للاختبارات:', 'The biggest benefit of tests:'), [['تغيّر الكود من غير خوف', 'changing code without fear'], ['أسرع تشغيل', 'faster runs'], ['كود أقصر', 'shorter code']], 0, B('أمان.', 'Safety.')),
        Q(B('مقارنة كائنين بمحتواهم:', 'Comparing two objects by content:'), ['toEqual', 'toBe', '==='], 0, B('عميقة.', 'Deep.')),
        Q(B('اسم اختبار كويس:', 'A good test name:'), ['"rejects negative totals"', '"test 3"', '"works"'], 0, B('سلوك.', 'Behaviour.'))
      ] },

    { title: B('الكود غير المتزامن والوقت', 'Async code and time'),
      goal: B('تختبر Promises والمهلات والـ retry بسرعة.', 'Test promises, timeouts and retries quickly.'),
      learn: [
        L(B('اختبارات async', 'Async tests'),
          B('**async test**: خلّي دالة الاختبار async واعمل await. وللأخطاء: `await assert.rejects(promise, /message/)` أو في Vitest `await expect(p).rejects.toThrow()`. أكبر غلطة: تنسى await — الاختبار بينجح حتى لو الـ Promise فشل!', 'An **async test**: make the test function async and await. For errors: `await assert.rejects(promise, /message/)` or in Vitest `await expect(p).rejects.toThrow()`. The biggest mistake: forgetting await — the test passes even when the promise fails!'),
          'import { test } from "node:test";\nimport assert from "node:assert/strict";\nconst sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function getCustomer(id) {\n  await sleep(10);\n  if (id <= 0) throw new Error(`invalid id ${id}`);\n  return { id, name: "Sara" };\n}\ntest("loads a customer", async () => {\n  assert.deepEqual(await getCustomer(7), { id: 7, name: "Sara" });\n});\ntest("rejects bad ids", async () => {\n  await assert.rejects(getCustomer(0), /invalid id 0/);\n});', N()),
        L(B('الوقت الوهمي', 'Fake time'),
          B('retry بانتظار 30 ثانية أو تقرير «كل يوم 7 الصبح» — مش هتستنى بجد! **fake timers** بتخلّيك تحرّك الساعة بإيدك: `mock.timers.tick(30000)` (node:test) أو `vi.advanceTimersByTime` (Vitest). الاختبار بياخد ملّي ثواني.', 'A retry waiting 30 seconds or a «daily at 7 a.m.» report — you will not really wait! **fake timers** let you move the clock by hand: `mock.timers.tick(30000)` (node:test) or `vi.advanceTimersByTime` (Vitest). The test takes milliseconds.'),
          'import { test, mock } from "node:test";\nimport assert from "node:assert/strict";\n\nfunction debounce(fn, ms) {\n  let t;\n  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };\n}\ntest("debounce sends only the last call after the quiet period", () => {\n  mock.timers.enable({ apis: ["setTimeout"] });\n  const calls = [];\n  const save = debounce(v => calls.push(v), 30_000);\n  save("a"); save("ab"); save("abc");\n  mock.timers.tick(29_999);\n  assert.deepEqual(calls, []);\n  mock.timers.tick(1);\n  assert.deepEqual(calls, ["abc"]);\n  mock.timers.reset();\n});', N()),
        L(B('العزل', 'Isolation'),
          B('**test isolation**: كل اختبار يبدأ نضيف ومش معتمد على ترتيب الاختبارات. استخدم **beforeeach** لتجهيز حالة جديدة (ملف مؤقت، قاعدة في الذاكرة، mock نضيف)، وafterEach للتنضيف. اختبار بيعدّي لوحده ويفشل مع الباقي = مشكلة عزل.', '**test isolation**: each test starts clean and does not depend on test order. Use **beforeeach** to prepare fresh state (a temp file, an in-memory database, a clean mock), and afterEach to tidy up. A test that passes alone but fails with the others = an isolation problem.'),
          'import { describe, it, beforeEach, afterEach } from "node:test";\nimport assert from "node:assert/strict";\nimport { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";\nimport os from "node:os"; import path from "node:path";\n\ndescribe("state file", () => {\n  let dir;\n  beforeEach(async () => { dir = await mkdtemp(path.join(os.tmpdir(), "t-")); });\n  afterEach(async () => { await rm(dir, { recursive: true, force: true }); });\n  it("starts empty", async () => { await assert.rejects(readFile(path.join(dir, "state.json")), { code: "ENOENT" }); });\n  it("saves the last id", async () => {\n    await writeFile(path.join(dir, "state.json"), JSON.stringify({ lastId: 7 }));\n    assert.equal(JSON.parse(await readFile(path.join(dir, "state.json"), "utf8")).lastId, 7);\n  });\n});', N())
      ],
      practice: [
        B('اختبر withTimeout بوقت وهمي.', 'Test withTimeout with fake time.'),
        B('اختبر retry إنه بيستسلم بعد 4 محاولات.', 'Test that retry gives up after 4 attempts.'),
        B('انسى await في اختبار rejects وشوف إنه بينجح غلط.', 'Forget await in a rejects test and see it pass wrongly.'),
        B('ضيف beforeEach بفولدر مؤقت.', 'Add a beforeEach with a temp folder.')
      ],
      words: [
        W('async test', 'اختبار بيستنى Promise', 'a test that awaits a promise', 'Mark the async test with async.'),
        W('rejects', 'التأكد إن Promise فشل', 'checking that a promise fails', 'await assert.rejects(p, /invalid/).'),
        W('fake timers', 'ساعة وهمية بتتحرك بإيدك', 'a pretend clock you move by hand', 'Fake timers skip the 30-second wait.'),
        W('test isolation', 'كل اختبار مستقل عن التاني', 'each test independent of the others', 'Test isolation removes order bugs.'),
        W('beforeeach', 'كود بيشتغل قبل كل اختبار', 'code run before every test', 'beforeEach creates a fresh folder.')
      ],
      read: [{ t: 'Node.js: Mocking timers', url: 'https://nodejs.org/api/test.html#timers', what: B('اقرا mock.timers.', 'Read mock.timers.') }, { t: 'Vitest: Fake timers', url: 'https://vitest.dev/guide/mocking/timers', what: B('اقرا vi.useFakeTimers.', 'Read vi.useFakeTimers.') }],
      challenge: B('اختبر أدوات أسبوع 13 كلها (sleep، withTimeout، retry، mapLimit) بوقت وهمي وrejects، بحيث الـ suite كلها تخلص في أقل من ثانية.', 'Test all the week 13 tools (sleep, withTimeout, retry, mapLimit) with fake time and rejects, so the whole suite finishes in under a second.'),
      quiz: [
        Q(B('نسيت await قدام assert.rejects:', 'You forgot await before assert.rejects:'), [['الاختبار ممكن ينجح غلط', 'the test may pass wrongly'], ['بيفشل دايمًا', 'it always fails'], ['عادي', 'no difference']], 0, B('await دايمًا.', 'Always await.')),
        Q(B('retry بينتظر دقيقة:', 'A retry waiting a minute:'), ['fake timers', B('استنى دقيقة', 'wait a minute'), B('متختبرهوش', 'skip the test')], 0, B('tick.', 'tick.')),
        Q(B('اختبار بيعدّي لوحده بس:', 'A test passing only alone:'), [['مشكلة عزل', 'an isolation problem'], ['تمام', 'fine'], ['Vitest بايظ', 'Vitest is broken']], 0, B('beforeEach.', 'beforeEach.'))
      ] },

    { title: B('الـ mocks والـ fakes', 'Mocks and fakes'),
      goal: B('تختبر كود بيكلّم APIs من غير ما يكلّمها فعلًا.', 'Test code that calls APIs without really calling them.'),
      learn: [
        L(B('بدائل الاختبار', 'Test doubles'),
          B('**test double** = بديل لحاجة حقيقية في الاختبار: **stub** بيرجّع رد ثابت، **spy** بيسجّل اتنادى إزاي، **mock** stub + spy مع توقعات، وfake = نسخة بسيطة شغالة (Notifier من أسبوع 36 بايثون، قاعدة في الذاكرة). الهدف: الاختبار سريع ومن غير إنترنت ومن غير ما يبعت إيميل حقيقي.', 'A **test double** = a stand-in for something real in a test: a **stub** returns a fixed answer, a **spy** records how it was called, a **mock** is stub + spy with expectations, and a fake = a simple working version (an in-memory database, a fake notifier). The goal: fast tests, offline, with no real email sent.'),
          'import { test, mock } from "node:test";\nimport assert from "node:assert/strict";\n\nasync function notifyLateOrders(orders, send) {\n  const late = orders.filter(o => o.daysLate > 2);\n  for (const o of late) await send(`Order ${o.id} is ${o.daysLate} days late`);\n  return late.length;\n}\ntest("sends one message per late order", async () => {\n  const send = mock.fn(async () => ({ ok: true }));        // a spy + stub\n  const n = await notifyLateOrders([{ id: 1, daysLate: 5 }, { id: 2, daysLate: 1 }, { id: 3, daysLate: 3 }], send);\n  assert.equal(n, 2);\n  assert.equal(send.mock.callCount(), 2);\n  assert.deepEqual(send.mock.calls.map(c => c.arguments[0]), ["Order 1 is 5 days late", "Order 3 is 3 days late"]);\n});', N()),
        L(B('mock لـ fetch', 'Mocking fetch'),
          B('عشان تختبر عميل API: بدّل `fetch` بـ mock بيرجّع ردود محضّرة (نجاح، 429، 500، JSON بايظ) وتأكد إن الكود بيتصرف صح. `mock.method(globalThis, "fetch", …)` في node:test، أو `vi.spyOn(globalThis, "fetch")` في Vitest — ورجّعه في الآخر.', 'To test an API client: replace `fetch` with a mock returning prepared replies (success, 429, 500, broken JSON) and check the code behaves right. `mock.method(globalThis, "fetch", …)` in node:test, or `vi.spyOn(globalThis, "fetch")` in Vitest — and restore it at the end.'),
          'import { test, mock } from "node:test";\nimport assert from "node:assert/strict";\nconst sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function getJson(url, tries = 3) {\n  for (let i = 1; ; i++) {\n    const res = await fetch(url);\n    if (res.ok) return res.json();\n    if (res.status !== 429 || i === tries) throw new Error(`HTTP ${res.status}`);\n    await sleep(Number(res.headers.get("Retry-After") ?? 0) * 1000);\n  }\n}\ntest("retries after a 429 and then succeeds", async () => {\n  const replies = [new Response("", { status: 429, headers: { "Retry-After": "0" } }), Response.json({ id: 7 })];\n  const f = mock.method(globalThis, "fetch", async () => replies.shift());\n  assert.deepEqual(await getJson("https://api.example.com/x"), { id: 7 });\n  assert.equal(f.mock.callCount(), 2);\n  f.mock.restore();\n});\ntest("does not retry a 404", async () => {\n  const f = mock.method(globalThis, "fetch", async () => new Response("", { status: 404 }));\n  await assert.rejects(getJson("https://api.example.com/x"), /HTTP 404/);\n  assert.equal(f.mock.callCount(), 1);\n  f.mock.restore();\n});', N()),
        L(B('صمّم عشان يتختبر', 'Design for testing'),
          B('**dependency injection**: بدل ما الدالة تعمل `fetch` أو `new Date()` أو `sendEmail` من جواها، خليها **تاخدهم كمعاملات** (بقيم افتراضية). الاختبار يبعت نسخ وهمية بسهولة، والكود بيبقى أوضح. ده أهم من أي مكتبة mocks.', '**dependency injection**: instead of a function calling `fetch`, `new Date()` or `sendEmail` from the inside, let it **take them as parameters** (with defaults). Tests pass fakes easily, and the code is clearer. This matters more than any mocking library.'),
          '// ✗ hard to test: hidden dependencies\nasync function dailyReport() {\n  const orders = await (await fetch(API + "/orders")).json();\n  if (new Date().getHours() < 7) return;\n  await sendEmail("boss@example.com", summarize(orders));\n}\n\n// ✓ easy to test: everything comes in\nasync function dailyReport({ loadOrders, now = () => new Date(), send }) {\n  const orders = await loadOrders();\n  if (now().getHours() < 7) return "too early";\n  await send(summarize(orders));\n  return "sent";\n}', S)
      ],
      practice: [
        B('اكتب spy لـ send واتأكد من الرسايل.', 'Write a spy for send and check the messages.'),
        B('اختبر عميل API بـ 4 ردود وهمية.', 'Test the API client with 4 fake replies.'),
        B('حوّل دالة لـ dependency injection.', 'Refactor a function to dependency injection.'),
        B('اكتب fake notifier بدل mock.', 'Write a fake notifier instead of a mock.')
      ],
      words: [
        W('test double', 'بديل لحاجة حقيقية في الاختبار', 'a stand-in for a real thing in a test', 'The email sender is a test double.'),
        W('stub', 'بديل بيرجّع رد ثابت', 'a stand-in returning a fixed answer', 'The stub returns two orders.'),
        W('spy', 'بديل بيسجّل النداءات', 'a stand-in recording calls', 'The spy saw two calls.'),
        W('mock', 'بديل بيرد ويتسجل ويتأكد', 'a stand-in that answers, records and checks', 'Mock fetch to return 429.'),
        W('dependency injection', 'تمرير الاعتماديات كمعاملات', 'passing dependencies in as parameters', 'Dependency injection makes tests easy.'),
        W('mock.fn', 'دالة وهمية في node:test', 'a fake function in node:test', 'mock.fn records each call.'),
        W('vi.fn', 'دالة وهمية في Vitest', 'a fake function in Vitest', 'vi.fn() replaces the sender.')
      ],
      read: [{ t: 'Vitest: Mocking', url: 'https://vitest.dev/guide/mocking', what: B('اقرا Functions وGlobals.', 'Read Functions and Globals.') }, { t: 'Node.js: Mocking', url: 'https://nodejs.org/api/test.html#mocking', what: B('اقرا mock.fn وmock.method.', 'Read mock.fn and mock.method.') }],
      challenge: B('اختبر createClient (أسبوع 14) بالكامل بـ fetch وهمي: نجاح، 404، 429 بـ Retry-After، 500 ثم نجاح، مهلة، JSON بايظ، كاش — من غير ولا طلب حقيقي.', 'Fully test createClient (week 14) with a fake fetch: success, 404, 429 with Retry-After, 500 then success, a timeout, broken JSON and caching — without a single real request.'),
      quiz: [
        Q(B('بديل بيسجّل اتنادى كام مرة:', 'A stand-in recording how often it was called:'), ['spy', 'stub', 'fixture'], 0, B('بيتجسس.', 'It watches.')),
        Q(B('دالة بتعمل new Date() جواها:', 'A function calling new Date() inside:'), [['خليها تاخد now كمعامل', 'let it take now as a parameter'], ['متختبرهاش', 'do not test it'], ['غيّر ساعة الجهاز', 'change the machine clock']], 0, B('injection.', 'Injection.')),
        Q(B('بعد mock.method على fetch:', 'After mock.method on fetch:'), [['restore', 'restore it'], ['سيبه', 'leave it'], ['امسح fetch', 'delete fetch']], 0, B('عزل.', 'Isolation.'))
      ] },

    { title: B('اختبار السيرفرات والـ webhooks', 'Testing servers and webhooks'),
      goal: B('تختبر الـ API كامل من الطلب للرد.', 'Test the API end to end, from request to reply.'),
      learn: [
        L(B('integration test', 'Integration tests'),
          B('**integration test** بيختبر أجزاء مع بعض: route + validation + خدمة + قاعدة وهمية. شغّل السيرفر على port 0، ابعتله fetch حقيقي، وتأكد من الـ status والجسم. ده بيمسك مشاكل الـ unit tests مبتشوفهاش (middleware ناقص، JSON parser).', 'An **integration test** tests parts together: route + validation + service + a fake database. Start the server on port 0, send it a real fetch, and check status and body. This catches what unit tests miss (a missing middleware, the JSON parser).'),
          'import { describe, it, before, after } from "node:test";\nimport assert from "node:assert/strict";\nimport { createServer } from "node:http";\n\nfunction app() {\n  const orders = new Map();\n  return createServer(async (req, res) => {\n    const send = (s, b) => res.writeHead(s, { "Content-Type": "application/json" }).end(JSON.stringify(b));\n    if (req.method === "POST" && req.url === "/orders") {\n      let body = ""; for await (const c of req) body += c;\n      let o; try { o = JSON.parse(body); } catch { return send(400, { error: "invalid JSON" }); }\n      if (!(o.qty > 0)) return send(422, { error: "qty must be > 0" });\n      const id = orders.size + 1; orders.set(id, o); return send(201, { id });\n    }\n    send(404, { error: "not found" });\n  });\n}\ndescribe("POST /orders", () => {\n  let server, base;\n  before(async () => { server = app().listen(0); await new Promise(r => server.once("listening", r)); base = `http://localhost:${server.address().port}`; });\n  after(() => server.close());\n  const post = body => fetch(base + "/orders", { method: "POST", body });\n  it("creates an order", async () => { const r = await post(\'{"qty": 2}\'); assert.equal(r.status, 201); assert.deepEqual(await r.json(), { id: 1 }); });\n  it("rejects bad JSON with 400", async () => assert.equal((await post("{oops")).status, 400));\n  it("rejects qty 0 with 422", async () => assert.equal((await post(\'{"qty": 0}\')).status, 422));\n});', N()),
        L(B('اختبار webhook بتوقيع', 'Testing a signed webhook'),
          B('**fixture** = بيانات اختبار ثابتة: جسم webhook حقيقي (من غير بيانات شخصية) محفوظ في `test/fixtures/order-paid.json`. الاختبار بيوقّعه بالسر التجريبي ويبعته: صح ← 200، توقيع غلط ← 401، نفس الحدث مرتين ← اتعالج مرة.', 'A **fixture** = fixed test data: a real webhook body (without personal data) saved in `test/fixtures/order-paid.json`. The test signs it with the test secret and sends it: valid → 200, bad signature → 401, the same event twice → handled once.'),
          'import { createHmac } from "node:crypto";\nimport { readFile } from "node:fs/promises";\n\nconst raw = await readFile(new URL("./fixtures/order-paid.json", import.meta.url));\nconst sign = body => "sha256=" + createHmac("sha256", "test-secret").update(body).digest("hex");\nconst send = (body, sig) => fetch(base + "/webhooks/shop", { method: "POST", headers: { "Content-Type": "application/json", "X-Signature": sig }, body });\n\nit("accepts a valid signature", async () => assert.equal((await send(raw, sign(raw))).status, 200));\nit("rejects a bad signature", async () => assert.equal((await send(raw, "sha256=bad")).status, 401));\nit("handles a duplicate once", async () => {\n  await send(raw, sign(raw)); await send(raw, sign(raw));\n  assert.equal(queue.size(), 1);\n});', S),
        L(B('supertest وVitest', 'supertest and Vitest'),
          B('مع Express، **supertest** بيبعت طلبات للـ app من غير ما تفتح port: `request(app).post("/orders").send({...}).expect(201)`. ونفس الاختبارات في Vitest بنفس الشكل. المهم: كل اختبار بقاعدة وmocks نضيفة (beforeEach).', 'With Express, **supertest** sends requests to the app without opening a port: `request(app).post("/orders").send({...}).expect(201)`. The same tests work in Vitest the same way. What matters: every test with a clean database and mocks (beforeEach).'),
          'import request from "supertest";\nimport { describe, it, expect, beforeEach } from "vitest";\nimport { createApp } from "../src/app.ts";\n\ndescribe("orders API", () => {\n  let app;\n  beforeEach(() => { app = createApp({ db: new MemoryDb(), notify: vi.fn() }); });\n  it("returns 422 with field errors", async () => {\n    const res = await request(app).post("/orders").send({ customer: "S", items: [] });\n    expect(res.status).toBe(422);\n    expect(res.body.fields).toHaveProperty("customer");\n  });\n});', S)
      ],
      practice: [
        B('شغّل اختبار POST /orders وضيف حالة 404.', 'Run the POST /orders test and add a 404 case.'),
        B('احفظ fixture لـ webhook من n8n (من غير بيانات حقيقية).', 'Save a webhook fixture from n8n (with no real data).'),
        B('اكتب 3 اختبارات توقيع.', 'Write 3 signature tests.'),
        B('جرّب supertest على Express.', 'Try supertest on Express.')
      ],
      words: [
        W('integration test', 'اختبار أجزاء كتير مع بعض', 'a test of several parts together', 'The integration test sends real HTTP.'),
        W('end-to-end test', 'اختبار النظام كامل زي المستخدم', 'testing the whole system like a user', 'Playwright runs the end-to-end test.'),
        W('fixture', 'بيانات اختبار ثابتة', 'fixed test data', 'Load the webhook fixture.'),
        W('supertest', 'مكتبة لاختبار تطبيقات HTTP', 'a library for testing HTTP apps', 'supertest posts to the Express app.'),
        W('test pyramid', 'unit كتير، integration أقل، e2e قليل', 'many unit, fewer integration, few e2e tests', 'Follow the test pyramid.')
      ],
      read: [{ t: 'supertest', url: 'https://github.com/forwardemail/supertest', what: B('اقرا الأمثلة.', 'Read the examples.') }, { t: 'Martin Fowler: The Practical Test Pyramid', url: 'https://martinfowler.com/articles/practical-test-pyramid.html', what: B('اقرا The Test Pyramid.', 'Read The Test Pyramid.') }],
      challenge: B('اكتب integration tests لـ «بوابة الطلبات»: كل routes بحالاتها (201، 400، 401، 404، 409، 422، 429)، وwebhook بـ 3 fixtures، وmock لـ n8n — في أقل من 3 ثواني.', 'Write integration tests for the «orders gateway»: every route with its cases (201, 400, 401, 404, 409, 422, 429), the webhook with 3 fixtures, and a mock for n8n — in under 3 seconds.'),
      quiz: [
        Q(B('سيرفر في الاختبار:', 'A server in a test:'), [['listen(0) وfetch', 'listen(0) and fetch'], ['port 80', 'port 80'], ['مستحيل', 'impossible']], 0, B('port فاضي.', 'A free port.')),
        Q(B('بيانات webhook ثابتة للاختبار:', 'Fixed webhook data for tests:'), ['fixture', 'mock', 'spy'], 0, B('ملف.', 'A file.')),
        Q(B('الهرم:', 'The pyramid:'), [['unit كتير وe2e قليل', 'many unit tests, few e2e'], ['e2e كتير', 'many e2e'], ['بالتساوي', 'equal']], 0, B('سرعة وثبات.', 'Speed and stability.'))
      ] },

    { title: B('التغطية وTDD وCI', 'Coverage, TDD and CI'),
      goal: B('تعرف اختباراتك غطّت إيه، وتكتب بالاختبار أول، وتشغّله أوتوماتيك.', 'Know what your tests cover, write the test first, and run it automatically.'),
      learn: [
        L(B('code coverage', 'Code coverage'),
          B('**code coverage** = نسبة السطور والفروع اللي الاختبارات شغّلتها. `vitest --coverage` أو `node --test --experimental-test-coverage`. 80% رقم معقول — بس التغطية بتقولك إيه **متختبرش**، مش إن المختبر صح. ركّز على المنطق المهم (فلوس، صلاحيات، تحويلات).', '**code coverage** = the share of lines and branches the tests ran. `vitest --coverage` or `node --test --experimental-test-coverage`. 80% is a reasonable number — but coverage tells you what is **not** tested, not that what is tested is right. Focus on important logic (money, permissions, transformations).'),
          'npx vitest run --coverage\n#  File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s\n#  money.ts      |   100   |   100    |   100   |   100   |\n#  client.ts     |   86.4  |   75.0   |   90.0  |   86.4  | 41-44, 67\n#  ← lines 41-44 = the timeout branch: add a test for it', T),
        L(B('TDD', 'TDD'),
          B('**tdd**: اكتب الاختبار **الأول** (يفشل — أحمر)، اكتب أقل كود يخليه ينجح (أخضر)، نضّف (**red green refactor**). مفيد جدًا لمنطق واضح القواعد (حساب الخصم، تطبيع، parsers)، وبيخلّيك تفكر في الاستخدام قبل التنفيذ. مش لازم لكل حاجة.', '**tdd**: write the test **first** (it fails — red), write the least code to pass (green), then tidy up (**red green refactor**). Very useful for logic with clear rules (discount calculation, normalisation, parsers), and it makes you think about usage before implementation. Not required for everything.'),
          'import { test } from "node:test";\nimport assert from "node:assert/strict";\n// 1 RED: the rules as tests, before the code existed\n// 2 GREEN: the smallest discount() that passes\n// 3 REFACTOR: tidy, tests still green\nfunction discount(total, { vip = false, coupon } = {}) {\n  let rate = vip ? 0.1 : 0;\n  if (coupon === "WELCOME") rate = Math.max(rate, 0.15);\n  if (total >= 2000) rate += 0.05;\n  return Math.round(total * Math.min(rate, 0.2) * 100) / 100;\n}\ntest("no discount by default", () => assert.equal(discount(500), 0));\ntest("VIP gets 10%", () => assert.equal(discount(500, { vip: true }), 50));\ntest("WELCOME beats VIP", () => assert.equal(discount(500, { vip: true, coupon: "WELCOME" }), 75));\ntest("big orders add 5%", () => assert.equal(discount(2000, { vip: true }), 300));\ntest("never more than 20%", () => assert.equal(discount(3000, { coupon: "WELCOME" }), 600));', N()),
        L(B('في CI', 'In CI'),
          B('**ci pipeline**: مع كل push، GitHub Actions يثبّت ويشغّل lint وtypecheck والاختبارات — ولو فشل، الـ PR ميتدمجش. و**flaky test** (بينجح ساعات ويفشل ساعات) أخطر من مفيش: صلّحه فورًا أو اعزله، وإلا الفريق هيتجاهل الاختبارات كلها.', 'A **ci pipeline**: on every push, GitHub Actions installs and runs lint, typecheck and tests — and if they fail, the PR is not merged. A **flaky test** (passing sometimes, failing sometimes) is worse than none: fix or quarantine it at once, or the team learns to ignore every test.'),
          'name: test\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 24, cache: npm }\n      - run: npm ci\n      - run: npm run typecheck\n      - run: npm test -- --coverage', T)
      ],
      practice: [
        B('شغّل التغطية وضيف اختبار لأول سطر مش متغطي.', 'Run coverage and add a test for the first uncovered line.'),
        B('اكتب دالة شحن بـ TDD (3 دورات أحمر/أخضر).', 'Write a shipping-fee function with TDD (3 red/green cycles).'),
        B('اعمل workflow GitHub Actions للاختبارات.', 'Create a GitHub Actions workflow for the tests.'),
        B('اكتشف اختبار flaky (بيعتمد على الوقت) وصلّحه.', 'Find a flaky test (depending on time) and fix it.')
      ],
      words: [
        W('code coverage', 'نسبة الكود اللي الاختبارات شغّلته', 'the share of code the tests ran', 'Code coverage is 86%.'),
        W('tdd', 'كتابة الاختبار قبل الكود', 'writing the test before the code', 'Use TDD for the discount rules.'),
        W('red green refactor', 'فشل، نجاح، تنضيف', 'fail, pass, tidy', 'Each TDD cycle is red green refactor.'),
        W('ci pipeline', 'خطوات آلية مع كل تغيير', 'automatic steps on every change', 'The CI pipeline blocks the merge.'),
        W('flaky test', 'اختبار مش ثابت النتيجة', 'a test with unstable results', 'Quarantine the flaky test.')
      ],
      read: [{ t: 'Vitest: Coverage', url: 'https://vitest.dev/guide/coverage', what: B('اقرا Coverage Setup.', 'Read Coverage Setup.') }, { lib: 'GitHub Actions docs', what: B('اقرا Building and testing Node.js.', 'Read Building and testing Node.js.') }],
      challenge: B('في مشروع automation-kit (أسبوع 26): وصّل التغطية لـ 90% في الموديولات المهمة، اكتب ميزة جديدة بـ TDD، وخلّي CI يمنع الدمج لو الاختبارات أو الأنواع فشلت.', 'In the automation-kit project (week 26): bring coverage to 90% in key modules, write a new feature with TDD, and make CI block merges when tests or types fail.'),
      quiz: [
        Q(B('تغطية 100%:', '100% coverage:'), [['مش معناها مفيش bugs', 'does not mean no bugs'], ['مفيش bugs', 'means no bugs'], ['إجباري', 'is required']], 0, B('اللي متختبرش.', 'What is untested.')),
        Q(B('أول خطوة في TDD:', 'The first TDD step:'), [['اختبار بيفشل', 'a failing test'], ['الكود', 'the code'], ['التنضيف', 'refactoring']], 0, B('red.', 'Red.')),
        Q(B('اختبار flaky:', 'A flaky test:'), [['صلّحه أو اعزله فورًا', 'fix or quarantine it at once'], ['سيبه', 'leave it'], ['أعد التشغيل لحد ما ينجح', 'rerun until it passes']], 0, B('الثقة.', 'Trust.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مشروع بثقة كاملة في التغيير.', 'A project you can change with full confidence.'),
      review: [
        B('unit tests بـ node:test وVitest، وAAA، والحالات الطرفية.', 'Unit tests with node:test and Vitest, AAA and edge cases.'),
        B('async tests وrejects والوقت الوهمي والعزل.', 'Async tests, rejects, fake time and isolation.'),
        B('stubs وspies وmocks لـ fetch، وdependency injection.', 'Stubs, spies and fetch mocks, and dependency injection.'),
        B('integration tests للسيرفرات والـ webhooks بـ fixtures.', 'Integration tests for servers and webhooks with fixtures.'),
        B('التغطية وTDD وCI والاختبارات الـ flaky.', 'Coverage, TDD, CI and flaky tests.')
      ],
      project: B('خلّي «بوابة الطلبات» بالـ TS مشروع بثقة: unit tests للتطبيع والتحقق والخصومات (بعضها بـ TDD)، tests للأدوات async بوقت وهمي، mocks لـ fetch وn8n، integration tests لكل routes والـ webhook بـ fixtures، تغطية ≥ 85% للمنطق، وGitHub Actions بيشغّل typecheck والاختبارات ويمنع الدمج — والـ suite كلها أقل من 10 ثواني.', 'Make the TS «orders gateway» a confident project: unit tests for normalisation, validation and discounts (some via TDD), tests for the async tools with fake time, mocks for fetch and n8n, integration tests for every route and the webhook with fixtures, ≥ 85% coverage of the logic, and GitHub Actions running typecheck and tests and blocking merges — with the whole suite under 10 seconds.'),
      test: [
        Q(B('unit test بيختبر:', 'A unit test tests:'), [['جزء صغير لوحده', 'one small piece alone'], ['النظام كامل', 'the whole system'], ['السيرفر الحقيقي', 'the real server']], 0, B('سريع.', 'Fast.')),
        Q(B('toBe مقابل toEqual لكائنين:', 'toBe vs toEqual for two objects:'), [['toEqual للمحتوى', 'toEqual for contents'], ['toBe للمحتوى', 'toBe for contents'], ['زي بعض', 'the same']], 0, B('مرجع مقابل قيمة.', 'Reference vs value.')),
        Q(B('AAA:', 'AAA:'), ['arrange, act, assert', 'add, and, again', 'async, await, all'], 0, B('ترتيب.', 'Order.')),
        Q(B('Promise المفروض يفشل:', 'A promise that should fail:'), ['await assert.rejects(p)', 'assert.throws(p)', 'p.catch()'], 0, B('await.', 'await.')),
        Q(B('اختبار تقرير «بعد 24 ساعة»:', 'Testing a report «after 24 hours»:'), ['fake timers', B('استنى يوم', 'wait a day'), 'sleep'], 0, B('tick.', 'tick.')),
        Q(B('stub:', 'A stub:'), [['بيرجّع رد ثابت', 'returns a fixed answer'], ['بيسجّل بس', 'only records'], ['قاعدة حقيقية', 'a real database']], 0, B('بديل.', 'A stand-in.')),
        Q(B('اختبار عميل API من غير نت:', 'Testing an API client offline:'), [['mock لـ fetch', 'a fetch mock'], ['VPN', 'a VPN'], ['مستحيل', 'impossible']], 0, B('ردود محضّرة.', 'Prepared replies.')),
        Q(B('دالة سهلة الاختبار:', 'An easy-to-test function:'), [['بتاخد اعتمادياتها كمعاملات', 'takes its dependencies as parameters'], ['بتعمل كل حاجة جواها', 'does everything inside'], ['global variables', 'uses global variables']], 0, B('injection.', 'Injection.')),
        Q(B('integration test لـ API:', 'An integration test for an API:'), [['سيرفر حقيقي وطلبات HTTP', 'a real server and HTTP requests'], ['دالة واحدة', 'one function'], ['screenshot', 'a screenshot']], 0, B('أجزاء مع بعض.', 'Parts together.')),
        Q(B('fixture لـ webhook:', 'A webhook fixture:'), [['جسم ثابت من غير بيانات شخصية', 'a fixed body without personal data'], ['بيانات عملاء حقيقية', 'real customer data'], ['كلمة سر', 'a password']], 0, B('آمن.', 'Safe.')),
        Q(B('TDD:', 'TDD:'), ['red → green → refactor', 'code → test → ship', 'ship → fix'], 0, B('اختبار أول.', 'Test first.')),
        Q(B('CI بيعمل:', 'CI does:'), [['يشغّل الفحوص مع كل push ويمنع الدمج لو فشلت', 'runs checks on every push and blocks merges on failure'], ['ينشر بس', 'only deploys'], ['يكتب الكود', 'writes the code']], 0, B('آلي.', 'Automatic.'))
      ] }
  ]
};
