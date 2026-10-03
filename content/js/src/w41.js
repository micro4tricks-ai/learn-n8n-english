// JavaScript week 41 — The event loop, streams and workers in depth.
// Everything runs in Node with built-ins (perf_hooks, stream, zlib, worker_threads, child_process).
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
const PRIME_WORKER = 'import { parentPort, workerData } from "node:worker_threads";\nconst isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };\nlet count = 0;\nfor (let n = workerData.from; n < workerData.to; n++) if (isPrime(n)) count++;\nparentPort.postMessage({ from: workerData.from, count });\n';
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الـ event loop والـ streams والـ workers بعمق', 'The event loop, streams and workers in depth'),
  goal: B('تفهم Node من جوّه عشان تبني خدمات سريعة ومستقرة: ترتيب المهام في الـ event loop وقياس تأخره، streams بتحترم الذاكرة وتتحكم في الضغط، Web Streams والضغط، worker threads للحسابات التقيلة، وعمليات وcluster — وإمتى تستخدم كل واحد.',
          'Understand Node from the inside to build fast, stable services: task ordering in the event loop and measuring its lag, memory-friendly streams with flow control, Web Streams and compression, worker threads for heavy computation, and processes and cluster — and when to use each.'),
  days: [
    { title: B('الـ event loop من جوّه', 'The event loop inside'),
      goal: B('تعرف أنهي سطر هيتنفذ إمتى.', 'Know which line runs when.'),
      learn: [
        L(B('المهام وترتيبها', 'Tasks and their order'),
          B('بعد ما الكود المتزامن يخلص: الـ **microtask** queue (promises و**queuemicrotask**) بتتفضى كلها، وقبلها في Node **process.nexttick**. بعدين الـ event loop بيعدّي على مراحله: timers (setTimeout) ← I/O ← check (**setimmediate**) — كل واحدة **macrotask**. المثال بيطبع الترتيب الحقيقي.', 'After synchronous code finishes: the **microtask** queue (promises and **queuemicrotask**) drains completely, and before it, in Node, **process.nexttick**. Then the event loop moves through its phases: timers (setTimeout) → I/O → check (**setimmediate**) — each a **macrotask**. The example prints the real order.'),
          'import { readFile } from "node:fs";\nconst inTimer = [], inIO = [];\n// an ES module\'s top level itself runs as a promise job, so we start inside a timer (a normal macrotask)\nsetTimeout(() => {\n  inTimer.push("sync");\n  Promise.resolve().then(() => inTimer.push("promise"));\n  queueMicrotask(() => inTimer.push("queueMicrotask"));\n  process.nextTick(() => inTimer.push("nextTick"));\n  setTimeout(() => inTimer.push("next timeout"), 0);\n}, 0);\nreadFile(import.meta.filename, () => {\n  setTimeout(() => inIO.push("timeout"), 0);\n  setImmediate(() => inIO.push("immediate"));          // inside an I/O callback, immediate always wins\n});\nsetTimeout(() => {\n  console.log("inside a timer:", inTimer.join(" → "));\n  console.log("inside I/O:    ", inIO.join(" → "));\n}, 60);', N()),
        L(B('متوقفش الـ loop', 'Don’t block the loop'),
          B('Node بيشغّل JavaScript على thread واحد: أي حساب طويل (JSON ضخم، regex تقيل، حلقة مليون) بيوقف كل الطلبات التانية. قيس **event loop lag** (قد إيه الـ loop متأخر) بـ **monitoreventloopdelay** من `perf_hooks` — لو الـ p99 بيعدّي 100ms، فيه حاجة بتعطّل.', 'Node runs JavaScript on one thread: any long computation (huge JSON, a heavy regex, a million-iteration loop) stops every other request. Measure the **event loop lag** (how late the loop is) with **monitoreventloopdelay** from `perf_hooks` — if p99 exceeds 100 ms, something is blocking.'),
          'import { monitorEventLoopDelay } from "node:perf_hooks";\nconst h = monitorEventLoopDelay({ resolution: 10 });\nh.enable();\nconst busy = ms => { const end = Date.now() + ms; while (Date.now() < end) {} };\n\nawait new Promise(r => setTimeout(r, 200));                 // quiet period\nconsole.log(`quiet:   p99 lag ${(h.percentile(99) / 1e6).toFixed(1)} ms`);\nh.reset();\nfor (let i = 0; i < 4; i++) { busy(120); await new Promise(r => setImmediate(r)); }   // 120 ms blocks\nconsole.log(`blocked: p99 lag ${(h.percentile(99) / 1e6).toFixed(1)} ms  ← every request waited this long`);\nh.disable();', N()),
        L(B('الـ libuv thread pool', 'The libuv thread pool'),
          B('مش كل حاجة على الـ thread الأساسي: **libuv** (المكتبة اللي تحت Node) عندها **thread pool** (4 افتراضيًا) لعمليات الملفات وcrypto التقيل (pbkdf2، scrypt) وzlib وdns.lookup. لو 10 طلبات بتعمل hash كلمات سر في نفس الوقت، 4 بس بيشتغلوا والباقي بيستنى. ظبطه بـ `UV_THREADPOOL_SIZE`.', 'Not everything runs on the main thread: **libuv** (the library under Node) has a **thread pool** (4 by default) for file operations, heavy crypto (pbkdf2, scrypt), zlib and dns.lookup. If 10 requests hash passwords at once, only 4 run and the rest wait. Tune it with `UV_THREADPOOL_SIZE`.'),
          'import { pbkdf2 } from "node:crypto";\nimport { promisify } from "node:util";\nconst hash = promisify(pbkdf2);\nconst t0 = performance.now();\nconst done = [];\nawait Promise.all(Array.from({ length: 8 }, (_, i) =>\n  hash("password", "salt", 60_000, 32, "sha256").then(() => done.push(`#${i} ${Math.round(performance.now() - t0)}ms`))));\nconsole.log(done.join("  "));\nconsole.log("with 4 pool threads, the jobs finish in waves — try UV_THREADPOOL_SIZE=8 node main.mjs");', N())
      ],
      practice: [
        B('توقّع ترتيب مثال الـ event loop قبل ما تشغّله.', 'Predict the event-loop example’s order before running it.'),
        B('قيس الـ lag في خدمة Express عندك.', 'Measure the lag in one of your Express services.'),
        B('دوّر على حلقة أو JSON تقيل بيعطّل الـ loop.', 'Find a heavy loop or JSON blocking the loop.'),
        B('جرّب UV_THREADPOOL_SIZE مع pbkdf2.', 'Try UV_THREADPOOL_SIZE with pbkdf2.')
      ],
      words: [
        W('macrotask', 'مهمة في مرحلة من مراحل الـ loop', 'a task run in one event-loop phase', 'setTimeout schedules a macrotask.'),
        W('queuemicrotask', 'إضافة microtask مباشرة', 'scheduling a microtask directly', 'queueMicrotask runs before the next timer.'),
        W('process.nexttick', 'دالة بتتنفذ قبل الـ microtasks', 'a callback run before microtasks', 'process.nextTick runs first.'),
        W('setimmediate', 'مهمة في مرحلة check', 'a callback in the check phase', 'Inside I/O, setImmediate beats setTimeout.'),
        W('event loop lag', 'تأخر الـ event loop', 'how late the event loop runs', 'Event loop lag hit 400 ms during the export.'),
        W('monitoreventloopdelay', 'أداة قياس تأخر الـ loop', 'a perf_hooks tool measuring loop delay', 'monitorEventLoopDelay reports p99.'),
        W('libuv', 'المكتبة اللي تحت Node', 'the C library under Node’s I/O', 'libuv runs file work in its thread pool.'),
        W('thread pool', 'مجموعة threads للعمليات التقيلة', 'a set of background threads', 'The thread pool has 4 threads by default.')
      ],
      read: [{ t: 'Node.js: The Node.js Event Loop', url: 'https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick', what: B('اقرا Phases Overview.', 'Read the Phases Overview.') }],
      challenge: B('ضيف مراقبة event loop lag لخدمة Express (مقياس p99 كل 10 ثواني)، اعمل endpoint بيعمل حساب تقيل وشوف الـ lag بيرتفع وكل الطلبات بتبطأ — وسجّل النتيجة قبل ما نصلّحها بـ workers يوم 4.', 'Add event-loop-lag monitoring to an Express service (a p99 metric every 10 seconds), create an endpoint doing heavy computation and watch the lag rise and every request slow down — and record the result before fixing it with workers on day 4.'),
      quiz: [
        Q(B('الأول: setTimeout ولا Promise.then؟', 'First: setTimeout or Promise.then?'), [['Promise.then (microtask)', 'Promise.then (a microtask)'], ['setTimeout', 'setTimeout'], ['عشوائي', 'random']], 0, B('microtasks أولًا.', 'Microtasks first.')),
        Q(B('حلقة مليون في handler:', 'A million-iteration loop in a handler:'), [['بتوقف كل الطلبات', 'stops every request'], ['بتشتغل في thread تاني', 'runs on another thread'], ['مش مهمة', 'doesn’t matter']], 0, B('thread واحد.', 'One thread.')),
        Q(B('pbkdf2 بيشتغل في:', 'pbkdf2 runs in:'), [['libuv thread pool', 'the libuv thread pool'], ['الـ main thread', 'the main thread'], ['المتصفح', 'the browser']], 0, B('pool.', 'Pool.'))
      ] },

    { title: B('الـ streams بعمق', 'Streams in depth'),
      goal: B('بيانات بأي حجم بذاكرة ثابتة.', 'Data of any size with flat memory.'),
      learn: [
        L(B('الأنواع الأربعة', 'The four kinds'),
          B('**readable** (مصدر: ملف، طلب HTTP)، **writable** (وجهة: ملف، response)، Transform (بتعدّل وهي بتعدّي)، و**duplex** (الاتنين: socket). `stream/promises` بيدّيك `pipeline` بيوصّلهم ويقفل كل حاجة لو حصل خطأ. و**readable.from** بيحوّل أي iterable أو async generator لـ stream.', '**readable** (a source: a file, an HTTP request), **writable** (a destination: a file, a response), Transform (modifies data as it passes), and **duplex** (both: a socket). `stream/promises` gives you `pipeline`, which connects them and closes everything on an error. And **readable.from** turns any iterable or async generator into a stream.'),
          'import { Readable, Transform, Writable } from "node:stream";\nimport { pipeline } from "node:stream/promises";\n\nasync function* orders() {                      // a source: could be pages from an API\n  for (let id = 1; id <= 6; id++) yield { id, total: id * 125, city: id % 2 ? "Cairo" : "Giza" };\n}\nconst onlyCairo = new Transform({ objectMode: true, transform(o, _enc, cb) { cb(null, o.city === "Cairo" ? o : undefined); } });\nconst toCsv = new Transform({ objectMode: true, transform(o, _enc, cb) { cb(null, `${o.id},${o.total}\\n`); } });\nconst lines = [];\nconst sink = new Writable({ write(chunk, _enc, cb) { lines.push(chunk.toString().trim()); cb(); } });\n\nawait pipeline(Readable.from(orders()), onlyCairo, toCsv, sink);\nconsole.log(lines);', N()),
        L(B('الضغط الراجع', 'Flow control'),
          B('لو المصدر أسرع من الوجهة، الذاكرة بتتملي. كل stream ليه **highwatermark** (حجم الـ buffer)؛ `write()` بترجّع false لما يتملي، والمفروض تستنى event `drain`. `pipeline` و**async iteration** (`for await`) بيعملوا ده لوحدهم — عشان كده استخدمهم بدل `.on("data")`.', 'If the source is faster than the destination, memory fills up. Each stream has a **highwatermark** (its buffer size); `write()` returns false when it is full, and you should wait for the `drain` event. `pipeline` and **async iteration** (`for await`) handle this for you — so use them instead of `.on("data")`.'),
          'import { Writable } from "node:stream";\nimport { once } from "node:events";\n\nconst slowDisk = new Writable({\n  highWaterMark: 4,                                      // tiny buffer: 4 bytes\n  write(chunk, _enc, cb) { setTimeout(cb, 5); },         // a slow destination\n});\nlet pauses = 0;\nfor (let i = 0; i < 20; i++) {\n  const ok = slowDisk.write("ab");                       // false when the buffer is full\n  if (!ok) { pauses++; await once(slowDisk, "drain"); }  // respect the signal → memory stays flat\n}\nslowDisk.end();\nawait once(slowDisk, "finish");\nconsole.log(`wrote 20 chunks, paused ${pauses} times for drain`);', N()),
        L(B('async generators كـ transforms', 'Async generators as transforms'),
          B('أسهل طريقة تكتب transform: async generator بياخد source ويعمل yield. `pipeline` بيقبله مباشرة. مثال عملي: تقسيم نص جاي حتت لسطور (السطر ممكن يتقطع بين chunks) — نفس المشكلة اللي قابلتها مع SSE.', 'The easiest way to write a transform: an async generator taking a source and yielding. `pipeline` accepts it directly. A practical example: splitting text arriving in pieces into lines (a line may be split across chunks) — the same problem you met with SSE.'),
          'import { Readable } from "node:stream";\nimport { pipeline } from "node:stream/promises";\n\nconst chunks = ["id,city,total\\n1,Cai", "ro,650\\n2,Giza,12", "0\\n3,Alex,90\\n"];   // lines split anywhere\nasync function* splitLines(source) {\n  let rest = "";\n  for await (const chunk of source) {\n    const parts = (rest + chunk).split("\\n");\n    rest = parts.pop();\n    yield* parts;\n  }\n  if (rest) yield rest;\n}\nasync function* parseCsv(lines) {\n  let header;\n  for await (const line of lines) {\n    const cells = line.split(",");\n    if (!header) { header = cells; continue; }\n    yield Object.fromEntries(header.map((h, i) => [h, cells[i]]));\n  }\n}\nconst rows = [];\nawait pipeline(Readable.from(chunks), splitLines, parseCsv, async source => { for await (const r of source) rows.push(r); });\nconsole.log(rows);', N())
      ],
      practice: [
        B('اعمل pipeline من async generator لـ CSV.', 'Build a pipeline from an async generator to CSV.'),
        B('جرّب write من غير ما تستنى drain وشوف الذاكرة.', 'Try write without waiting for drain and watch memory.'),
        B('اكتب transform بـ async generator.', 'Write a transform as an async generator.'),
        B('حوّل كود بـ on("data") لـ pipeline.', 'Convert on("data") code to pipeline.')
      ],
      words: [
        W('readable', 'stream مصدر', 'a stream you read from', 'The HTTP request is a Readable.'),
        W('writable', 'stream وجهة', 'a stream you write to', 'The response is a Writable.'),
        W('duplex', 'stream للقراية والكتابة', 'a stream both readable and writable', 'A TCP socket is a Duplex.'),
        W('readable.from', 'تحويل iterable لـ stream', 'creating a stream from an iterable', 'Readable.from wraps the async generator.'),
        W('highwatermark', 'حجم الـ buffer في الـ stream', 'the buffer threshold of a stream', 'A small highWaterMark limits memory.'),
        W('async iteration', 'المرور بـ for await', 'looping with for await', 'Async iteration handles flow control.'),
        W('objectmode', 'stream بيمرر كائنات', 'a stream passing objects, not bytes', 'Use objectMode for order objects.')
      ],
      read: [{ lib: 'Node.js: Streams', what: B('اقرا API for stream implementers وpipeline.', 'Read API for stream implementers and pipeline.') }],
      challenge: B('اكتب «مصدّر طلبات» بيقرا آلاف الصفحات من API (async generator)، يفلتر ويحوّل لـ CSV بـ transforms، ويكتب لملف بـ pipeline — والذاكرة ثابتة (قيسها بـ process.memoryUsage) حتى مع مليون صف.', 'Write an «orders exporter» reading thousands of API pages (an async generator), filtering and converting to CSV with transforms, and writing to a file with pipeline — with flat memory (measure with process.memoryUsage) even for a million rows.'),
      quiz: [
        Q(B('write() رجّعت false:', 'write() returned false:'), [['استنى drain', 'wait for drain'], ['اكتب أسرع', 'write faster'], ['خطأ', 'an error']], 0, B('flow control.', 'Flow control.')),
        Q(B('pipeline بيعمل:', 'pipeline does:'), [['يوصّل الـ streams ويقفلها لو خطأ', 'connects streams and closes them on error'], ['يمسح الملفات', 'deletes files'], ['تشفير', 'encryption']], 0, B('أمان.', 'Safety.')),
        Q(B('socket:', 'A socket:'), [['duplex', 'a duplex'], ['readable بس', 'readable only'], ['مش stream', 'not a stream']], 0, B('الاتنين.', 'Both.'))
      ] },

    { title: B('Web Streams والضغط', 'Web Streams and compression'),
      goal: B('نفس الـ streams في Node والمتصفح.', 'The same streams in Node and the browser.'),
      learn: [
        L(B('Web Streams', 'Web Streams'),
          B('**web streams** (`ReadableStream` و`WritableStream` و**transformstream**) هي المعيار في المتصفح وDeno وWorkers وكمان Node. `fetch` بيرجّع body كـ ReadableStream. و`pipeThrough` بيوصّل transforms. تقدر تحوّل بين النوعين بـ `Readable.toWeb` و`Readable.fromWeb`.', '**web streams** (`ReadableStream`, `WritableStream` and **transformstream**) are the standard in browsers, Deno, Workers and also Node. `fetch` returns a body as a ReadableStream. And `pipeThrough` connects transforms. Convert between the two kinds with `Readable.toWeb` and `Readable.fromWeb`.'),
          'const source = new ReadableStream({\n  start(controller) {\n    for (const word of ["طلب", "رقم", "1042", "اتشحن"]) controller.enqueue(word);\n    controller.close();\n  },\n});\nconst addSpace = new TransformStream({ transform(chunk, controller) { controller.enqueue(chunk + " "); } });\nconst upper = new TransformStream({ transform(chunk, controller) { controller.enqueue(chunk.replace(/\\d+/, n => `#${n}`)); } });\nlet out = "";\nawait source.pipeThrough(upper).pipeThrough(addSpace).pipeTo(new WritableStream({ write(c) { out += c; } }));\nconsole.log(out.trim());', N()),
        L(B('النص والضغط', 'Text and compression'),
          B('**textdecoderstream** بيحوّل bytes لنص من غير ما يكسر حروف عربي مقطوعة بين chunks. و**compressionstream** (gzip/deflate) بيضغط في المتصفح وNode من غير مكتبات. وفي Node كمان **zlib** بـ pipeline لملفات كبيرة. ضغط JSON بتاع اللوج أو التصدير بيوفر 80–90%.', '**textdecoderstream** turns bytes into text without breaking Arabic characters split across chunks. **compressionstream** (gzip/deflate) compresses in browsers and Node without libraries. And in Node, **zlib** with pipeline for large files. Compressing log or export JSON saves 80–90%.'),
          'const rows = Array.from({ length: 2000 }, (_, i) => ({ id: i, city: ["القاهرة", "الجيزة", "المنصورة"][i % 3], total: i * 7 }));\nconst json = JSON.stringify(rows);\nconst bytes = new TextEncoder().encode(json);\n\nconst gz = await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip"))).arrayBuffer();\nconsole.log(`json ${bytes.length} bytes → gzip ${gz.byteLength} bytes (${Math.round(100 - gz.byteLength / bytes.length * 100)}% smaller)`);\n\nlet back = "";\nfor await (const text of new Blob([gz]).stream().pipeThrough(new DecompressionStream("gzip")).pipeThrough(new TextDecoderStream())) back += text;\nconsole.log("round trip ok:", back === json, "| first city:", JSON.parse(back)[0].city);', N()),
        L(B('zlib لملفات كبيرة', 'zlib for big files'),
          B('في Node لملف لوج أو تصدير كبير: `pipeline(createReadStream, createGzip(), createWriteStream)` — ذاكرة ثابتة مهما كان الحجم. ولو بترد على HTTP: ضغط الـ response (أو خلّي reverse proxy يعمله). المثال بيضغط ويفك في الذاكرة بـ streams.', 'In Node, for a large log or export file: `pipeline(createReadStream, createGzip(), createWriteStream)` — flat memory whatever the size. When replying over HTTP: compress the response (or let a reverse proxy do it). The example compresses and decompresses in memory with streams.'),
          'import { Readable, Writable } from "node:stream";\nimport { pipeline } from "node:stream/promises";\nimport { createGzip, createGunzip } from "node:zlib";\n\nasync function* logLines() {\n  for (let i = 0; i < 5000; i++) yield JSON.stringify({ ts: 1760000000 + i, level: "info", event: "order_paid", order_id: 1000 + i }) + "\\n";\n}\nconst collect = arr => new Writable({ write(c, _e, cb) { arr.push(c); cb(); } });\nconst gzChunks = [];\nawait pipeline(Readable.from(logLines()), createGzip(), collect(gzChunks));\nconst gz = Buffer.concat(gzChunks);\nconst outChunks = [];\nawait pipeline(Readable.from([gz]), createGunzip(), collect(outChunks));\nconst text = Buffer.concat(outChunks).toString();\nconsole.log(`compressed ${gz.length} bytes; restored ${text.split("\\n").length - 1} lines`);', N())
      ],
      practice: [
        B('اعمل pipeline بـ TransformStream.', 'Build a pipeline with TransformStream.'),
        B('اضغط export JSON بـ CompressionStream.', 'Compress a JSON export with CompressionStream.'),
        B('اقرا fetch body بـ TextDecoderStream.', 'Read a fetch body with TextDecoderStream.'),
        B('اضغط ملف لوج كبير بـ zlib وpipeline.', 'Compress a big log file with zlib and pipeline.')
      ],
      words: [
        W('web streams', 'streams المعيار في الويب', 'the standard streams API of the web', 'Web Streams work in Workers and Node.'),
        W('transformstream', 'stream بيحوّل البيانات', 'a web stream that transforms chunks', 'A TransformStream adds a prefix to each chunk.'),
        W('pipethrough', 'تمرير عبر transform', 'passing a stream through a transform', 'pipeThrough chains transforms.'),
        W('textdecoderstream', 'تحويل bytes لنص كـ stream', 'decoding bytes to text as a stream', 'TextDecoderStream keeps Arabic intact.'),
        W('compressionstream', 'ضغط بالـ stream', 'compressing data as a stream', 'CompressionStream gzips the export.'),
        W('zlib', 'مكتبة الضغط في Node', 'Node’s compression module', 'zlib gzips the log file.')
      ],
      read: [{ t: 'MDN: Streams API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Streams_API', what: B('اقرا Concepts وUsing readable streams.', 'Read Concepts and Using readable streams.') }],
      challenge: B('اعمل endpoint تصدير بيبعت ملايين الصفوف كـ CSV مضغوط gzip بـ streams من القاعدة للمتصفح (من غير ما يحمّلهم في الذاكرة)، وصفحة بتحمّله وتعرض التقدم بـ ReadableStream.', 'Build an export endpoint sending millions of rows as gzip-compressed CSV with streams from the database to the browser (without loading them into memory), and a page downloading it and showing progress with a ReadableStream.'),
      quiz: [
        Q(B('fetch body:', 'A fetch body:'), [['ReadableStream', 'a ReadableStream'], ['string دايمًا', 'always a string'], ['Buffer', 'a Buffer']], 0, B('web.', 'Web.')),
        Q(B('ضغط في المتصفح من غير مكتبات:', 'Compressing in the browser without libraries:'), [['CompressionStream', 'CompressionStream'], ['zip.js بس', 'only zip.js'], ['مستحيل', 'impossible']], 0, B('مدمج.', 'Built-in.')),
        Q(B('ملف لوج 5GB للضغط:', 'A 5 GB log file to compress:'), [['pipeline مع createGzip', 'pipeline with createGzip'], ['readFile ثم gzipSync', 'readFile then gzipSync'], ['يدوي', 'by hand']], 0, B('ذاكرة.', 'Memory.'))
      ] },

    { title: B('worker threads', 'Worker threads'),
      goal: B('الحسابات التقيلة من غير ما توقف الخدمة.', 'Heavy computation without stopping the service.'),
      learn: [
        L(B('ليه workers', 'Why workers'),
          B('**cpu-bound** (حسابات، توليد PDF، ضغط صور، تحليل ملف ضخم) بيوقف الـ loop؛ أما **i/o-bound** (شبكة، قاعدة) الـ async كفاية. للـ CPU: **worker threads** (`node:worker_threads`) = thread منفصل بـ JavaScript engine خاص بيه. بتبعتله **workerdata** وبيرجّع نتيجة بـ **postmessage**.', '**cpu-bound** work (calculations, PDF generation, image compression, parsing a huge file) blocks the loop; for **i/o-bound** work (network, database) async is enough. For CPU: **worker threads** (`node:worker_threads`) = a separate thread with its own JavaScript engine. You send it **workerdata** and it returns a result with **postmessage**.'),
          'import { Worker } from "node:worker_threads";\nimport { availableParallelism } from "node:os";\n\nconst runWorker = data => new Promise((resolve, reject) => {\n  const w = new Worker(new URL("./worker.mjs", import.meta.url), { workerData: data });\n  w.once("message", resolve); w.once("error", reject);\n});\nconst N = 300_000, parts = Math.min(4, availableParallelism());\nconst size = Math.ceil(N / parts);\nlet ticks = 0; const timer = setInterval(() => ticks++, 10);      // proves the main loop stays free\nconst t0 = performance.now();\nconst results = await Promise.all(Array.from({ length: parts }, (_, i) => runWorker({ from: i * size, to: Math.min(N, (i + 1) * size) })));\nclearInterval(timer);\nconsole.log(results.map(r => `${r.from}: ${r.count}`).join(" | "));\nconsole.log(`primes below ${N}: ${results.reduce((s, r) => s + r.count, 0)} in ${Math.round(performance.now() - t0)} ms on ${parts} workers; main loop ticked ${ticks}×`);', N({ 'worker.mjs': PRIME_WORKER })),
        L(B('pool من الـ workers', 'A pool of workers'),
          B('إنشاء worker لكل طلب غالي (عشرات الملي ثانية). في الإنتاج: pool ثابت (عدد الأنوية) بياخد المهام من طابور — مكتبة زي Piscina بتعملها. وللبيانات الكبيرة: «transfer» الـ ArrayBuffer بدل نسخه، و**sharedarraybuffer** مع **atomics** للذاكرة المشتركة (نادرًا ما تحتاجها).', 'Creating a worker per request is costly (tens of milliseconds). In production: a fixed pool (the number of cores) taking tasks from a queue — a library like Piscina does it. For large data: «transfer» the ArrayBuffer instead of copying it, and **sharedarraybuffer** with **atomics** for shared memory (rarely needed).'),
          '// npm i piscina — a production worker pool\nimport Piscina from "piscina";\nimport express from "express";\n\nconst pool = new Piscina({ filename: new URL("./render-invoice.mjs", import.meta.url).href, maxThreads: 4 });\nconst app = express();\napp.post("/invoices/:id/pdf", async (req, res) => {\n  const order = await db.orders.get(req.params.id);\n  const pdf = await pool.run({ order });                 // heavy PDF work off the main thread\n  res.type("application/pdf").send(Buffer.from(pdf));\n});\n// render-invoice.mjs:  export default ({ order }) => buildPdfBytes(order)', S),
        L(B('Web Workers في المتصفح', 'Web Workers in the browser'),
          B('نفس الفكرة في المتصفح: **web worker** بيشغّل حساب تقيل (تحليل Excel كبير، فلترة 100 ألف صف) من غير ما الصفحة تهنج. الـ worker مالوش وصول للـ DOM، والتواصل بـ postMessage.', 'The same idea in the browser: a **web worker** runs heavy computation (parsing a big Excel file, filtering 100,000 rows) without freezing the page. The worker has no DOM access, and communication uses postMessage.'),
          '// main.js\nconst worker = new Worker("./filter-worker.js", { type: "module" });\nworker.onmessage = e => { table.render(e.data.rows); status.textContent = `${e.data.rows.length} rows · ${e.data.ms} ms`; };\nsearch.addEventListener("input", () => worker.postMessage({ query: search.value }));\n\n// filter-worker.js\nlet rows = [];\nself.onmessage = async e => {\n  if (!rows.length) rows = await (await fetch("/orders-100k.json")).json();\n  const t0 = performance.now();\n  const q = e.data.query.trim().toLowerCase();\n  const hits = q ? rows.filter(r => r.customer.toLowerCase().includes(q) || String(r.id).includes(q)) : rows.slice(0, 500);\n  self.postMessage({ rows: hits.slice(0, 500), ms: Math.round(performance.now() - t0) });\n};', S)
      ],
      practice: [
        B('انقل حساب تقيل لـ worker thread.', 'Move a heavy computation to a worker thread.'),
        B('قيس الـ event loop lag قبل وبعد.', 'Measure event-loop lag before and after.'),
        B('جرّب Piscina بـ pool.', 'Try Piscina with a pool.'),
        B('اعمل Web Worker لفلترة جدول كبير.', 'Build a Web Worker to filter a big table.')
      ],
      words: [
        W('cpu-bound', 'شغل تقيل على المعالج', 'work limited by CPU speed', 'PDF rendering is CPU-bound.'),
        W('i/o-bound', 'شغل بيستنى شبكة أو قرص', 'work limited by waiting for I/O', 'Calling APIs is I/O-bound.'),
        W('worker threads', 'threads منفصلة لـ JavaScript', 'separate JavaScript threads in Node', 'Worker threads keep the API responsive.'),
        W('workerdata', 'البيانات الأولى للـ worker', 'the initial data passed to a worker', 'Pass the range in workerData.'),
        W('postmessage', 'إرسال رسالة بين threads', 'sending a message between threads', 'The worker calls postMessage with the result.'),
        W('sharedarraybuffer', 'ذاكرة مشتركة بين threads', 'memory shared between threads', 'SharedArrayBuffer avoids copying.'),
        W('atomics', 'عمليات آمنة على الذاكرة المشتركة', 'safe operations on shared memory', 'Use Atomics to update shared counters.'),
        W('web worker', 'worker في المتصفح', 'a background thread in the browser', 'A web worker filters 100,000 rows.')
      ],
      read: [{ t: 'Node.js: Worker threads', url: 'https://nodejs.org/api/worker_threads.html', what: B('اقرا Worker وparentPort.', 'Read Worker and parentPort.') }],
      challenge: B('صلّح endpoint الحساب التقيل من يوم 1: انقل الشغل لـ worker pool (Piscina أو بتاعك)، وقيس event loop lag والـ p95 لطلبات تانية بالتوازي قبل وبعد — واعمل Web Worker لفلترة جدول الطلبات في لوحة التحكم.', 'Fix the heavy endpoint from day 1: move the work to a worker pool (Piscina or your own), and measure event-loop lag and the p95 of other concurrent requests before and after — and build a Web Worker to filter the orders table in the dashboard.'),
      quiz: [
        Q(B('توليد 1000 PDF في API:', 'Generating 1,000 PDFs in an API:'), [['worker threads', 'worker threads'], ['async بس', 'just async'], ['setTimeout', 'setTimeout']], 0, B('CPU.', 'CPU.')),
        Q(B('نداءات API كتير:', 'Many API calls:'), [['async كفاية (I/O)', 'async is enough (I/O)'], ['worker لكل نداء', 'a worker per call'], ['cluster إجباري', 'cluster required']], 0, B('I/O.', 'I/O.')),
        Q(B('Web Worker يقدر يعدّل الـ DOM؟', 'Can a Web Worker edit the DOM?'), [['لأ: postMessage للصفحة', 'no: postMessage to the page'], ['أيوه', 'yes'], ['أحيانًا', 'sometimes']], 0, B('معزول.', 'Isolated.'))
      ] },

    { title: B('العمليات والـ cluster', 'Processes and cluster'),
      goal: B('الأداة الصح لكل نوع توازي.', 'The right tool for each kind of parallelism.'),
      learn: [
        L(B('cluster', 'Cluster'),
          B('**cluster** بيشغّل نسخ من السيرفر (عملية لكل نواة) بتتشارك نفس الـ port. مفيد لو بتشغّل Node مباشرة على VPS. بس في Docker/Kubernetes أو pm2 الأحسن: عملية واحدة لكل container وزوّد الـ replicas — أبسط ومراقبة أسهل.', '**cluster** runs copies of the server (one process per core) sharing the same port. Useful when you run Node directly on a VPS. But in Docker/Kubernetes or with pm2 it is better: one process per container and more replicas — simpler and easier to monitor.'),
          'import cluster from "node:cluster";\nimport { availableParallelism } from "node:os";\nimport { createServer } from "node:http";\n\nif (cluster.isPrimary) {\n  for (let i = 0; i < availableParallelism(); i++) cluster.fork();\n  cluster.on("exit", (worker, code) => { console.error(`worker ${worker.process.pid} died (${code}); restarting`); cluster.fork(); });\n} else {\n  createServer((req, res) => res.end(`handled by ${process.pid}\\n`)).listen(3000);   // all workers share :3000\n}\n// in containers prefer: 1 process per container, scale replicas instead', S),
        L(B('عمليات فرعية', 'Child processes'),
          B('لما تحتاج برنامج تاني (ffmpeg، LibreOffice، Python) أو عزل كامل: child process. `execFile` (من غير shell) للأوامر القصيرة، و`spawn` بـ streams للمخرجات الكبيرة، و`fork` لسكربت Node تاني بقناة رسايل. واستخدم **events.once** وAbortSignal عشان تستنى أو تلغي.', 'When you need another program (ffmpeg, LibreOffice, Python) or full isolation: a child process. `execFile` (no shell) for short commands, `spawn` with streams for large output, and `fork` for another Node script with a message channel. Use **events.once** and an AbortSignal to wait or cancel.'),
          'import { fork } from "node:child_process";\nimport { once } from "node:events";\nimport { writeFile } from "node:fs/promises";\n\nawait writeFile("child.mjs", `process.on("message", m => { const sum = m.nums.reduce((a, b) => a + b, 0); process.send({ sum, pid: process.pid }); process.exit(0); });`);\nconst child = fork("child.mjs");\nchild.send({ nums: [650, 120, 300.5] });\nconst [reply] = await once(child, "message");\nconsole.log("child", reply.pid === child.pid ? "(same pid)" : "", "sum:", reply.sum);\nawait once(child, "exit");\n\nconst ac = new AbortController();\nconst slow = fork("child.mjs", { signal: ac.signal });   // never gets a message: would wait forever\nsetTimeout(() => ac.abort(), 50);\nconst [err] = await once(slow, "error").catch(e => [e]);\nconsole.log("slow child:", err.name);', N()),
        L(B('إلغاء العمليات الطويلة', 'Cancelling long work'),
          B('أي عملية طويلة (تصدير، استخراج AI، scraping) لازم تقبل AbortSignal: **abortsignal.timeout** لمهلة، و`AbortSignal.any` لدمج «المستخدم لغى» مع «المهلة خلصت». مرّر الـ signal لكل fetch وكل child process وكل حلقة طويلة (`signal.throwIfAborted()`).', 'Any long operation (an export, an AI extraction, scraping) must accept an AbortSignal: **abortsignal.timeout** for a deadline, and `AbortSignal.any` to combine «the user cancelled» with «the deadline passed». Pass the signal to every fetch, every child process and every long loop (`signal.throwIfAborted()`).'),
          'async function exportOrders({ signal }) {\n  const rows = [];\n  for (let page = 1; page <= 100; page++) {\n    signal.throwIfAborted();                              // check between pages\n    await new Promise(r => setTimeout(r, 10));            // pretend: fetch a page with { signal }\n    rows.push(page);\n  }\n  return rows.length;\n}\nconst user = new AbortController();\nconst signal = AbortSignal.any([user.signal, AbortSignal.timeout(80)]);\ntry {\n  console.log("exported", await exportOrders({ signal }), "pages");\n} catch (e) {\n  console.log("stopped:", e.name, "—", signal.reason?.name ?? e.message);\n}', N())
      ],
      practice: [
        B('شغّل cluster على جهازك وابعت طلبات.', 'Run cluster on your machine and send requests.'),
        B('شغّل برنامج خارجي بـ execFile وspawn.', 'Run an external program with execFile and spawn.'),
        B('ضيف AbortSignal لعملية تصدير طويلة.', 'Add an AbortSignal to a long export.'),
        B('اكتب جدول: إمتى async وworker وprocess وcluster.', 'Write a table: when async, worker, process and cluster.')
      ],
      words: [
        W('cluster', 'نسخ من السيرفر على نفس الـ port', 'server copies sharing one port', 'cluster forks one process per core.'),
        W('fork', 'تشغيل سكربت Node كعملية فرعية بقناة رسايل', 'starting a Node child with a message channel', 'fork the PDF converter.'),
        W('events.once', 'استنى حدث مرة واحدة كـ promise', 'awaiting one event as a promise', 'await events.once(child, "exit").'),
        W('abortsignal.timeout', 'signal بيلغي بعد مدة', 'a signal that aborts after a delay', 'AbortSignal.timeout(15000) caps the export.'),
        W('abortsignal.any', 'دمج كذا signal', 'combining several abort signals', 'AbortSignal.any joins the user and the timeout.')
      ],
      read: [{ t: 'Node.js: Child processes', url: 'https://nodejs.org/api/child_process.html', what: B('اقرا fork وspawn وexecFile.', 'Read fork, spawn and execFile.') }],
      challenge: B('اكتب «دليل التوازي» لخدمتك: جدول بكل نوع شغل (API calls، PDF، Excel كبير، برنامج خارجي، تصدير) والأداة المناسبة (async، worker pool، child process، replicas)، ونفّذ أهم 2 بقياس قبل وبعد، وكل عملية طويلة تقبل AbortSignal.', 'Write a «parallelism guide» for your service: a table of each kind of work (API calls, PDFs, a big Excel file, an external program, an export) and the right tool (async, a worker pool, a child process, replicas), implement the top 2 with before/after numbers, and make every long operation accept an AbortSignal.'),
      quiz: [
        Q(B('Node في Kubernetes:', 'Node in Kubernetes:'), [['عملية لكل container وزوّد replicas', 'one process per container, more replicas'], ['cluster جوه كل container دايمًا', 'always cluster inside each container'], ['عملية واحدة للكل', 'one process for everything']], 0, B('بساطة.', 'Simplicity.')),
        Q(B('تشغيل ffmpeg:', 'Running ffmpeg:'), [['child process (execFile/spawn)', 'a child process (execFile/spawn)'], ['worker thread', 'a worker thread'], ['eval', 'eval']], 0, B('برنامج تاني.', 'Another program.')),
        Q(B('مهلة + إلغاء المستخدم:', 'A deadline plus user cancellation:'), [['AbortSignal.any', 'AbortSignal.any'], ['setTimeout بس', 'just setTimeout'], ['try بس', 'just try']], 0, B('دمج.', 'Combining.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('Node بتفهمه من جوّه.', 'Node you understand from the inside.'),
      review: [
        B('ترتيب المهام وnextTick وsetImmediate وقياس الـ lag.', 'Task order, nextTick, setImmediate and measuring lag.'),
        B('Readable وWritable وDuplex وhighWaterMark وasync generators.', 'Readable, Writable, Duplex, highWaterMark and async generators.'),
        B('Web Streams وTextDecoderStream والضغط.', 'Web Streams, TextDecoderStream and compression.'),
        B('worker threads والـ pools وWeb Workers.', 'Worker threads, pools and Web Workers.'),
        B('cluster والعمليات الفرعية والإلغاء.', 'Cluster, child processes and cancellation.')
      ],
      project: B('مشروع الأسبوع «خدمة تقارير ثقيلة»: API بـ Express بيصدّر ملايين الطلبات كـ CSV مضغوط بـ streams (ذاكرة ثابتة)، يولّد PDFs في worker pool، يشغّل LibreOffice أو برنامج خارجي في child process بمهلة، كل عملية طويلة بـ AbortSignal، مراقبة event loop lag كمقياس، وتقرير أداء قبل وبعد.', 'Week project «heavy reports service»: an Express API exporting millions of orders as compressed CSV with streams (flat memory), generating PDFs in a worker pool, running LibreOffice or another program in a child process with a deadline, an AbortSignal for every long operation, event-loop-lag monitoring as a metric, and a before/after performance report.'),
      test: [
        Q(B('process.nextTick بيتنفذ:', 'process.nextTick runs:'), [['قبل الـ promise microtasks', 'before promise microtasks'], ['بعد setTimeout', 'after setTimeout'], ['آخر حاجة', 'last']], 0, B('أولوية.', 'Priority.')),
        Q(B('جوه callback I/O:', 'Inside an I/O callback:'), [['setImmediate قبل setTimeout(0)', 'setImmediate before setTimeout(0)'], ['setTimeout الأول دايمًا', 'setTimeout always first'], ['عشوائي', 'random']], 0, B('check phase.', 'Check phase.')),
        Q(B('p99 event loop lag = 400ms:', 'p99 event-loop lag = 400 ms:'), [['حاجة بتعطّل الـ thread', 'something is blocking the thread'], ['ممتاز', 'excellent'], ['طبيعي', 'normal']], 0, B('blocking.', 'Blocking.')),
        Q(B('UV_THREADPOOL_SIZE بيأثر على:', 'UV_THREADPOOL_SIZE affects:'), [['fs وcrypto التقيل وzlib', 'fs, heavy crypto and zlib'], ['الـ promises', 'promises'], ['CSS', 'CSS']], 0, B('libuv.', 'libuv.')),
        Q(B('Readable.from:', 'Readable.from:'), [['stream من iterable أو generator', 'a stream from an iterable or generator'], ['يقرا ملف بس', 'only reads files'], ['يكتب', 'writes']], 0, B('مصدر.', 'Source.')),
        Q(B('objectMode:', 'objectMode:'), [['stream بيمرر كائنات', 'a stream passing objects'], ['وضع مظلم', 'dark mode'], ['ضغط', 'compression']], 0, B('كائنات.', 'Objects.')),
        Q(B('async generator في pipeline:', 'An async generator in pipeline:'), [['بيشتغل كـ transform', 'works as a transform'], ['ممنوع', 'forbidden'], ['أبطأ دايمًا', 'always slower']], 0, B('بساطة.', 'Simplicity.')),
        Q(B('TextDecoderStream:', 'TextDecoderStream:'), [['bytes لنص من غير كسر الحروف', 'bytes to text without breaking characters'], ['تشفير', 'encryption'], ['ضغط', 'compression']], 0, B('UTF-8.', 'UTF-8.')),
        Q(B('worker thread بيرجّع نتيجة بـ:', 'A worker thread returns a result with:'), [['postMessage', 'postMessage'], ['return', 'return'], ['console.log', 'console.log']], 0, B('رسايل.', 'Messages.')),
        Q(B('worker لكل طلب:', 'A worker per request:'), [['غالي: استخدم pool', 'costly: use a pool'], ['مثالي', 'ideal'], ['إجباري', 'required']], 0, B('pool.', 'Pool.')),
        Q(B('fork:', 'fork:'), [['عملية Node بقناة رسايل', 'a Node process with a message channel'], ['نسخ ريبو', 'copying a repo'], ['thread', 'a thread']], 0, B('عملية.', 'Process.')),
        Q(B('signal.throwIfAborted():', 'signal.throwIfAborted():'), [['يوقف لو اتلغى', 'stops if cancelled'], ['يلغي كل حاجة دايمًا', 'always cancels everything'], ['ولا حاجة', 'nothing']], 0, B('إلغاء.', 'Cancellation.'))
      ] }
  ]
};
