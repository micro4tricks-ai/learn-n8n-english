// JavaScript week 36 — queues, background jobs and the month 9 project.
// The database queue runs on node:sqlite; BullMQ/Redis and Postgres code is shown.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
const QUEUE = 'import { DatabaseSync } from "node:sqlite";\nconst db = new DatabaseSync(":memory:");\ndb.exec(`CREATE TABLE jobs (\n  id INTEGER PRIMARY KEY, type TEXT NOT NULL, payload TEXT NOT NULL,\n  status TEXT NOT NULL DEFAULT \'queued\', attempts INTEGER NOT NULL DEFAULT 0,\n  run_at INTEGER NOT NULL DEFAULT 0, last_error TEXT, idem_key TEXT UNIQUE)`);\nconst enqueue = (type, payload, { runAt = 0, key = null } = {}) =>\n  db.prepare("INSERT INTO jobs (type, payload, run_at, idem_key) VALUES (?, ?, ?, ?) ON CONFLICT (idem_key) DO NOTHING").run(type, JSON.stringify(payload), runAt, key).changes;\nconst claim = now => db.prepare(`UPDATE jobs SET status = \'running\', attempts = attempts + 1\n  WHERE id = (SELECT id FROM jobs WHERE status = \'queued\' AND run_at <= ? ORDER BY id LIMIT 1)\n  RETURNING *`).get(now);\n';
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الطوابير والمهام الخلفية ومشروع الشهر', 'Queues, background jobs and the month project'),
  goal: B('تفصل «استلمنا» عن «خلّصنا»: طوابير بعمّال، طابور في القاعدة بـ claim آمن، إعادة محاولة وdead letter وidempotency، BullMQ وRedis، ونمط الـ outbox والمهام المجدولة والمراقبة — وتسلّم مشروع الشهر التاسع.',
          'Separate «received» from «done»: queues with workers, a database queue with safe claiming, retries, dead letters and idempotency, BullMQ and Redis, the outbox pattern, scheduled jobs and monitoring — and deliver the ninth month’s project.'),
  days: [
    { title: B('ليه الطوابير؟', 'Why queues?'),
      goal: B('ترد بسرعة وتعالج بهدوء.', 'Reply quickly and process calmly.'),
      learn: [
        L(B('الفكرة', 'The idea'),
          B('webhook محتاج رد في ثواني، بس الشغل (PDF، إيميل، CRM، AI) بياخد دقيقة وممكن يفشل. **job queue**: الـ **producer** (الـ API) يحط **background job** ويرد 202 فورًا، و**worker** (**consumer**) منفصل ياخد المهام بالدور ويعالجها بحد توازي وإعادة محاولة. ولو جه 1000 طلب فجأة، الطابور بيمتصهم.', 'A webhook needs a reply within seconds, but the work (a PDF, an email, the CRM, AI) takes a minute and may fail. A **job queue**: the **producer** (the API) adds a **background job** and replies 202 at once, and a separate **worker** (the **consumer**) takes jobs in turn and processes them with a concurrency limit and retries. If 1000 requests arrive at once, the queue absorbs them.'),
          'webhook ─▶ API (producer): validate → save order → enqueue("send-invoice", { orderId }) → 202 in 50 ms\n                                    │\n                            jobs table / Redis\n                                    │\n           worker (consumer) × 3 ─▶ build PDF → email → CRM → mark done\n                                    └─ failed? retry later · too many failures → dead letter', T),
        L(B('طابور في الذاكرة', 'An in-memory queue'),
          B('أبسط طابور: مصفوفة وworker pool (أسبوع 13). بيوضّح الفكرة — بس لو السيرفر وقع، كل المهام اللي فيه **ضاعت**. عشان كده الطوابير الحقيقية بتتخزن في قاعدة أو Redis.', 'The simplest queue: an array and a worker pool (week 13). It shows the idea — but if the server crashes, every job in it is **lost**. That is why real queues live in a database or Redis.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nclass MemoryQueue {\n  #jobs = []; #waiters = [];\n  push(job) { const w = this.#waiters.shift(); w ? w(job) : this.#jobs.push(job); }\n  next() { return this.#jobs.length ? Promise.resolve(this.#jobs.shift()) : new Promise(r => this.#waiters.push(r)); }\n}\nconst q = new MemoryQueue();\nconst done = [];\nasync function worker(name) {\n  for (;;) {\n    const job = await q.next();\n    if (job === "stop") return;\n    await sleep(20 + (job.id % 3) * 15);\n    done.push(`${name}:#${job.id}`);\n  }\n}\nconst workers = ["w1", "w2"].map(worker);\nfor (let id = 1; id <= 6; id++) q.push({ id });          // the API replies at once; work continues\nconsole.log("API replied; queued 6 jobs");\nq.push("stop"); q.push("stop");\nawait Promise.all(workers);\nconsole.log(done.join(" "));', N()),
        L(B('إمتى طابور؟', 'When a queue?'),
          B('استخدم طابور لما: الشغل أبطأ من ثانيتين، أو بيكلّم خدمة ممكن تقع، أو محتاج إعادة محاولة، أو فيه حدود معدل (API بـ 5 طلبات/ثانية)، أو مجدول لبعدين. ومتستخدموش لحاجة سريعة لازم نتيجتها في الرد نفسه.', 'Use a queue when: the work takes over two seconds, calls a service that may fail, needs retries, faces rate limits (an API at 5 requests/second), or is scheduled for later. Do not use one for something quick whose result is needed in the reply itself.'),
          '✓ queue: invoices/PDF, emails & WhatsApp, CRM sync, AI calls, image processing, nightly reports\n✗ no queue: price lookup for the page, login, validating a form (the user waits for the answer)', T)
      ],
      practice: [
        B('ارسم مشروعك: إيه اللي يروح طابور.', 'Map your project: what goes into a queue.'),
        B('شغّل الطابور في الذاكرة وزوّد العمّال لـ 3.', 'Run the in-memory queue and raise workers to 3.'),
        B('اقفل البرنامج في النص وشوف المهام ضاعت.', 'Kill the program midway and see the jobs vanish.'),
        B('اكتب ليه 202 مش 200.', 'Write why 202, not 200.')
      ],
      words: [
        W('job queue', 'طابور مهام بيتعالج بعدين', 'a queue of tasks processed later', 'Put invoices on the job queue.'),
        W('background job', 'مهمة بتشتغل برة الطلب', 'a task running outside the request', 'Email sending is a background job.'),
        W('producer', 'اللي بيحط المهام في الطابور', 'what puts jobs into the queue', 'The API is the producer.'),
        W('consumer', 'اللي بياخد المهام من الطابور', 'what takes jobs from the queue', 'The worker is the consumer.'),
        W('worker', 'عملية بتعالج المهام', 'a process handling jobs', 'Run three workers.')
      ],
      read: [{ t: 'AWS: What is a message queue?', url: 'https://aws.amazon.com/message-queue/', what: B('اقرا Message queue basics.', 'Read Message queue basics.') }],
      challenge: B('اكتب لكل webhook/endpoint في «بوابة الطلبات»: يتعالج في الطلب ولا طابور، وليه، وأقصى وقت رد مقبول.', 'For each webhook/endpoint of the «orders gateway», write: handled in the request or queued, why, and the acceptable reply time.'),
      quiz: [
        Q(B('PDF بياخد دقيقة من webhook:', 'A minute-long PDF from a webhook:'), [['طابور ورد 202', 'a queue and a 202'], ['استنى وارد', 'wait, then reply'], ['متعملوش', 'skip it']], 0, B('رد سريع.', 'Fast reply.')),
        Q(B('طابور في الذاكرة والسيرفر وقع:', 'An in-memory queue and the server crashes:'), [['المهام ضاعت', 'the jobs are lost'], ['المهام موجودة', 'the jobs survive'], ['بتتعاد', 'they retry']], 0, B('خزّن.', 'Persist.')),
        Q(B('اللي بيحط المهمة:', 'Whoever adds the job is the:'), ['producer', 'consumer', 'broker'], 0, B('API.', 'The API.'))
      ] },

    { title: B('طابور في قاعدة البيانات', 'A queue in the database'),
      goal: B('طابور موثوق من غير خدمات إضافية.', 'A reliable queue with no extra services.'),
      learn: [
        L(B('جدول jobs', 'A jobs table'),
          B('أبسط طابور موثوق: جدول jobs في نفس القاعدة (status، attempts، run_at). الـ producer يعمل INSERT، والـ worker يعمل **claim**: يختار مهمة جاهزة ويعلّمها running **في أمر واحد** — عشان عاملين ميخدوش نفس المهمة. المثال بيشغّل طابور حقيقي في SQLite:', 'The simplest reliable queue: a jobs table in the same database (status, attempts, run_at). The producer INSERTs, and the worker **claims**: picks a ready job and marks it running **in one statement** — so two workers never take the same job. The example runs a real queue in SQLite:'),
          QUEUE + 'for (const id of [1042, 1043, 1044]) enqueue("send-invoice", { orderId: id });\nconst handlers = { "send-invoice": p => `invoice for #${p.orderId} emailed` };\nlet job;\nwhile ((job = claim(Date.now()))) {\n  const result = handlers[job.type](JSON.parse(job.payload));\n  db.prepare("UPDATE jobs SET status = \'done\' WHERE id = ?").run(job.id);\n  console.log(`job ${job.id} (attempt ${job.attempts}):`, result);\n}\nconsole.log(db.prepare("SELECT status, COUNT(*) n FROM jobs GROUP BY status").all().map(r => `${r.status}=${r.n}`).join(" "));', N()),
        L(B('SKIP LOCKED في Postgres', 'SKIP LOCKED in Postgres'),
          B('في Postgres مع عمّال كتير: **skip locked** — كل worker ياخد صف مش مقفول من حد تاني، من غير ما يستنى. ده بيحوّل Postgres لطابور ممتاز لآلاف المهام في الدقيقة (مكتبات زي pg-boss وGraphile Worker مبنية عليه). ونفس الفكرة استخدمناها في n8n أسبوع 25.', 'In Postgres with many workers: **skip locked** — each worker takes a row nobody else has locked, without waiting. This makes Postgres an excellent queue for thousands of jobs a minute (libraries such as pg-boss and Graphile Worker build on it). We used the same idea in n8n week 25.'),
          'const { rows: [job] } = await pool.query(`\n  UPDATE jobs SET status = \'running\', attempts = attempts + 1, locked_at = now()\n  WHERE id = (\n    SELECT id FROM jobs\n    WHERE status = \'queued\' AND run_at <= now()\n    ORDER BY priority DESC, id\n    FOR UPDATE SKIP LOCKED\n    LIMIT 1\n  )\n  RETURNING *`);\n// job is undefined when the queue is empty → sleep 1 s, or LISTEN for a NOTIFY', S),
        L(B('حلقة الـ worker', 'The worker loop'),
          B('الـ worker: claim ← عالج ← علّم done (أو failed) ← كرر؛ ولو الطابور فاضي استنى شوية (أو اسمع لـ NOTIFY). بحد توازي (`mapLimit`)، وlog لكل مهمة بـ id، ومهلة لكل مهمة، وإيقاف بنظافة (يكمّل اللي في إيده ويقف).', 'The worker: claim → process → mark done (or failed) → repeat; when the queue is empty wait a little (or LISTEN for NOTIFY). With a concurrency limit (`mapLimit`), a log line per job with its id, a timeout per job, and a clean stop (finish what is in hand, then stop).'),
          'let stopping = false;\nprocess.on("SIGTERM", () => { stopping = true; });\nasync function runWorker({ concurrency = 3 } = {}) {\n  const slots = Array.from({ length: concurrency }, async () => {\n    while (!stopping) {\n      const job = await claimJob();\n      if (!job) { await sleep(1000); continue; }\n      const log = logger.child({ jobId: job.id, type: job.type });\n      try {\n        await withTimeout(handlers[job.type](job.payload, log), 60_000);\n        await markDone(job.id);\n        log.info("done");\n      } catch (err) {\n        await markFailed(job, err);            // retry later or dead-letter (tomorrow)\n        log.warn("failed", { err: err.message, attempt: job.attempts });\n      }\n    }\n  });\n  await Promise.all(slots);                      // returns after SIGTERM once in-flight jobs finish\n}', S)
      ],
      practice: [
        B('شغّل طابور SQLite وضيف نوع مهمة تاني.', 'Run the SQLite queue and add a second job type.'),
        B('اعمل جدول jobs في Postgres بـ SKIP LOCKED.', 'Create a jobs table in Postgres with SKIP LOCKED.'),
        B('شغّل عاملين واتأكد مفيش مهمة اتعملت مرتين.', 'Run two workers and confirm no job ran twice.'),
        B('ضيف SIGTERM للـ worker.', 'Add SIGTERM handling to the worker.')
      ],
      words: [
        W('claim', 'أخذ مهمة وتعليمها مشغولة في خطوة واحدة', 'taking a job and marking it busy in one step', 'The worker claims the next job.'),
        W('skip locked', 'تخطّي الصفوف اللي حد تاني ماسكها', 'skipping rows someone else holds', 'FOR UPDATE SKIP LOCKED avoids waiting.'),
        W('worker loop', 'حلقة claim ومعالجة وتكرار', 'a loop of claim, process and repeat', 'The worker loop sleeps when idle.'),
        W('run_at', 'وقت تشغيل المهمة', 'when a job may run', 'Set run_at for delayed jobs.'),
        W('job status', 'حالة المهمة: queued/running/done/failed', 'a job’s state: queued/running/done/failed', 'Group jobs by job status.')
      ],
      read: [{ t: 'pg-boss', url: 'https://github.com/timgit/pg-boss', what: B('طابور جاهز فوق Postgres.', 'A ready queue on top of Postgres.') }, { t: 'PostgreSQL: SELECT … FOR UPDATE SKIP LOCKED', url: 'https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE', what: B('اقرا The Locking Clause.', 'Read The Locking Clause.') }],
      challenge: B('ضيف لـ «بوابة الطلبات» جدول jobs وworker منفصل (`node src/worker.ts`) بـ claim آمن وتوازي 3 ومهلة وSIGTERM — والـ webhook بقى يعمل enqueue ويرد 202.', 'Add a jobs table and a separate worker (`node src/worker.ts`) to the «orders gateway», with safe claiming, concurrency 3, timeouts and SIGTERM — and make the webhook enqueue and reply 202.'),
      quiz: [
        Q(B('عاملين خدوا نفس المهمة:', 'Two workers took the same job:'), [['claim مش atomic', 'the claim is not atomic'], ['عادي', 'normal'], ['أسرع', 'faster']], 0, B('أمر واحد.', 'One statement.')),
        Q(B('Postgres مع عمّال كتير:', 'Postgres with many workers:'), ['FOR UPDATE SKIP LOCKED', 'LIMIT 100', 'ORDER BY RANDOM()'], 0, B('مفيش انتظار.', 'No waiting.')),
        Q(B('الطابور فاضي:', 'The queue is empty:'), [['استنى شوية أو LISTEN', 'wait a little or LISTEN'], ['loop من غير توقف', 'loop non-stop'], ['اقفل البرنامج', 'exit the program']], 0, B('CPU.', 'CPU.'))
      ] },

    { title: B('إعادة المحاولة والفشل والتكرار', 'Retries, failure and duplicates'),
      goal: B('المهام الفاشلة بتتعاد بذكاء، والمكررة متتعملش مرتين.', 'Failed jobs retry smartly, and duplicates never run twice.'),
      learn: [
        L(B('retry وdead letter', 'Retry and dead letter'),
          B('**job retry**: لو فشلت، رجّعها queued بـ run_at بعد مدة بتزيد (30ث، 2د، 10د). بعد عدد محاولات معيّن: **dead letter queue** (status=dead) + تنبيه — إنسان يبص. و**poison message** = مهمة بتفشل دايمًا (بيانات بايظة) — من غير حد أقصى كانت هتلف للأبد.', 'A **job retry**: on failure, put it back to queued with a run_at after a growing delay (30 s, 2 min, 10 min). After a set number of attempts: the **dead letter queue** (status=dead) + an alert — a person looks. A **poison message** = a job that always fails (broken data) — without a cap it would loop forever.'),
          QUEUE + 'const MAX = 3, backoff = attempt => [0, 30, 120, 600][attempt] * 1000;\nfunction fail(job, err, now) {\n  if (job.attempts >= MAX) db.prepare("UPDATE jobs SET status = \'dead\', last_error = ? WHERE id = ?").run(err.message, job.id);\n  else db.prepare("UPDATE jobs SET status = \'queued\', run_at = ?, last_error = ? WHERE id = ?").run(now + backoff(job.attempts), err.message, job.id);\n}\nlet crmUp = false;\nconst handlers = {\n  "crm-sync": () => { if (!crmUp) throw new Error("CRM 503"); return "synced"; },\n  "parse": p => { if (!p.total) throw new Error("payload has no total"); return "ok"; },      // a poison message\n};\nenqueue("crm-sync", { orderId: 1042 });\nenqueue("parse", { orderId: 1043 });\nlet clock = 0;\nfor (let round = 1; round <= 6; round++) {\n  if (round === 3) crmUp = true;                       // the CRM recovers\n  let job;\n  while ((job = claim(clock))) {\n    try { handlers[job.type](JSON.parse(job.payload)); db.prepare("UPDATE jobs SET status = \'done\' WHERE id = ?").run(job.id); console.log(`t+${clock / 1000}s job ${job.id} ${job.type} ✓ (attempt ${job.attempts})`); }\n    catch (e) { fail(job, e, clock); console.log(`t+${clock / 1000}s job ${job.id} ${job.type} ✗ ${e.message} (attempt ${job.attempts})`); }\n  }\n  clock += 200_000;                                    // jump ahead in time\n}\nconsole.log(db.prepare("SELECT id, type, status, attempts, last_error FROM jobs").all().map(r => ({ ...r })));', N()),
        L(B('idempotency', 'Idempotency'),
          B('الطوابير بتضمن **at-least-once**: المهمة ممكن تتعمل **أكتر من مرة** (worker وقع بعد ما بعت الإيميل وقبل ما يعلّم done). **exactly-once** حقيقي مش موجود — الحل إن المهمة نفسها تبقى idempotent: **idempotency key** (`invoice:1042`) بقيد UNIQUE، وقبل الأثر الخارجي اتأكد إنه متعملش.', 'Queues guarantee **at-least-once**: a job may run **more than once** (a worker crashed after sending the email and before marking done). True **exactly-once** does not exist — the fix is making the job itself idempotent: an **idempotency key** (`invoice:1042`) with a UNIQUE constraint, and before any outside effect, check it was not already done.'),
          QUEUE + 'console.log("enqueue invoice:1042 →", enqueue("send-invoice", { orderId: 1042 }, { key: "invoice:1042" }), "row");\nconsole.log("enqueue invoice:1042 again →", enqueue("send-invoice", { orderId: 1042 }, { key: "invoice:1042" }), "rows (duplicate ignored)");\n\ndb.exec("CREATE TABLE sent_emails (key TEXT PRIMARY KEY, at TEXT)");\nfunction sendInvoiceOnce(orderId) {\n  const key = `invoice-email:${orderId}`;\n  const fresh = db.prepare("INSERT INTO sent_emails VALUES (?, datetime()) ON CONFLICT DO NOTHING").run(key).changes;\n  if (!fresh) return "already sent — skipping";\n  return "email sent";                                // the real side effect goes here\n}\nconsole.log(sendInvoiceOnce(1042), "|", sendInvoiceOnce(1042), "(a retry after a crash)");', N()),
        L(B('مراقبة الـ dead letters', 'Watching dead letters'),
          B('مهمة ماتت = حد لازم يعرف. workflow n8n كل ربع ساعة: لو فيه dead جديد ابعت Telegram بالنوع والخطأ ورابط «أعد المحاولة» (endpoint بيرجّعها queued). وراجع الأسباب أسبوعيًا: نفس الخطأ بيتكرر = bug تصلّحه، مش retry تزوّده.', 'A dead job = someone must know. An n8n workflow every 15 minutes: if there are new dead jobs, send Telegram the type, the error and a «retry» link (an endpoint putting it back to queued). And review the causes weekly: the same error repeating = a bug to fix, not more retries.'),
          'GET  /internal/jobs/dead?since=…     → n8n (Schedule, every 15 min) → Telegram: "3 dead jobs: crm-sync ×2 (CRM 401), parse ×1"\nPOST /internal/jobs/:id/retry        → status = queued, attempts = 0, run_at = now   (a button in the message)\nweekly: SELECT type, last_error, COUNT(*) FROM jobs WHERE status = \'dead\' GROUP BY 1, 2 ORDER BY 3 DESC;', T)
      ],
      practice: [
        B('شغّل مثال الـ retry وشوف المهمة السامة بتموت.', 'Run the retry example and watch the poison job die.'),
        B('ضيف idempotency key لكل enqueue.', 'Add an idempotency key to every enqueue.'),
        B('خلّي إرسال الإيميل idempotent بجدول.', 'Make email sending idempotent with a table.'),
        B('اعمل n8n workflow للـ dead letters.', 'Build an n8n workflow for dead letters.')
      ],
      words: [
        W('job retry', 'إعادة تشغيل مهمة فشلت', 'running a failed job again', 'The job retry waits two minutes.'),
        W('dead letter queue', 'مكان المهام اللي فشلت نهائيًا', 'where finally-failed jobs go', 'Check the dead letter queue daily.'),
        W('poison message', 'مهمة بتفشل دايمًا', 'a job that always fails', 'Cap retries to stop a poison message.'),
        W('at-least-once', 'المهمة بتتعمل مرة أو أكتر', 'a job runs once or more', 'Queues give at-least-once delivery.'),
        W('exactly-once', 'مرة واحدة بالظبط (صعب جدًا)', 'exactly one time (very hard)', 'Exactly-once comes from idempotent jobs.'),
        W('idempotency key', 'مفتاح بيمنع تكرار نفس الفعل', 'a key preventing the same action twice', 'invoice:1042 is the idempotency key.')
      ],
      read: [{ t: 'Stripe: Idempotent requests', url: 'https://docs.stripe.com/api/idempotent_requests', what: B('اقرا الفكرة.', 'Read the idea.') }, { t: 'AWS: Amazon SQS dead-letter queues', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html', what: B('اقرا Benefits.', 'Read Benefits.') }],
      challenge: B('ضيف للطابور: retry بـ backoff (3 محاولات)، dead letter بتنبيه n8n وزرار إعادة، idempotency key في enqueue، وكل أثر خارجي (إيميل، CRM) idempotent بجدول — واختبر «worker وقع بعد الإيميل».', 'Add to the queue: retries with backoff (3 attempts), dead letters with an n8n alert and a retry button, an idempotency key on enqueue, and every outside effect (email, CRM) idempotent through a table — and test «the worker crashed after the email».'),
      quiz: [
        Q(B('مهمة فشلت 10 مرات بنفس الخطأ:', 'A job failed 10 times with the same error:'), [['dead letter + تنبيه + تصليح', 'dead letter + alert + fix'], ['زوّد المحاولات', 'add more retries'], ['امسحها', 'delete it']], 0, B('poison.', 'Poison.')),
        Q(B('الطابور بيضمن:', 'A queue guarantees:'), ['at-least-once', 'exactly-once', 'never'], 0, B('ممكن تتكرر.', 'May repeat.')),
        Q(B('الإيميل اتبعت مرتين بعد crash:', 'The email went out twice after a crash:'), [['idempotency key', 'an idempotency key'], ['retry أقل', 'fewer retries'], ['سيرفر أسرع', 'a faster server']], 0, B('مرة واحدة.', 'Once.'))
      ] },

    { title: B('BullMQ وRedis', 'BullMQ and Redis'),
      goal: B('طابور سريع جاهز بمميزات كتير.', 'A fast ready-made queue with many features.'),
      learn: [
        L(B('Queue وWorker', 'Queue and Worker'),
          B('**bullmq** = مكتبة طوابير فوق **redis**: `queue.add(name, data, opts)` و`new Worker(name, handler, { concurrency })`. فيها retry وbackoff وتأخير وأولويات وتقدّم ومهام متكررة جاهزة — وأسرع من طابور القاعدة لآلاف المهام في الثانية. والتكلفة: خدمة Redis تراقبها.', '**bullmq** = a queue library on **redis**: `queue.add(name, data, opts)` and `new Worker(name, handler, { concurrency })`. Retries, backoff, delays, priorities, progress and repeatable jobs are built in — and it is faster than a database queue for thousands of jobs a second. The cost: a Redis service to watch.'),
          'import { Queue, Worker } from "bullmq";\nconst connection = { url: process.env.REDIS_URL };\nexport const invoices = new Queue("invoices", { connection });\n\n// producer (the API)\nawait invoices.add("send", { orderId: 1042 }, {\n  jobId: "invoice:1042",                         // idempotency: a second add with this id is ignored\n  attempts: 5, backoff: { type: "exponential", delay: 30_000 },\n  removeOnComplete: 1000, removeOnFail: 5000,\n});\n\n// worker (a separate process)\nnew Worker("invoices", async job => {\n  await job.updateProgress(10);\n  const pdf = await buildInvoice(job.data.orderId);\n  await job.updateProgress(70);\n  await emailInvoice(job.data.orderId, pdf);\n  return { sent: true };\n}, { connection, concurrency: 3, limiter: { max: 5, duration: 1000 } });   // max 5 jobs/second', S),
        L(B('مهام مجدولة ومتأخرة', 'Scheduled and delayed jobs'),
          B('**delayed job**: «ابعت تذكير الدفع بعد 24 ساعة» (`delay`). **repeatable job** / **scheduled job**: «كل يوم 7 الصبح» بـ cron pattern وtimezone. و**job priority**: الطلبات المدفوعة قبل المسودات. ده بيغني عن cron منفصل للحاجات المرتبطة بالتطبيق.', 'A **delayed job**: «send the payment reminder in 24 hours» (`delay`). A **repeatable job** / **scheduled job**: «every day at 7 a.m.» with a cron pattern and time zone. And **job priority**: paid orders before drafts. This replaces a separate cron for app-related schedules.'),
          'await reminders.add("payment-reminder", { orderId: 1043 }, { delay: 24 * 3600_000, jobId: "remind:1043" });\nawait reports.upsertJobScheduler("daily-sales", { pattern: "0 7 * * *", tz: "Africa/Cairo" }, { name: "build", data: { kind: "daily" } });\nawait invoices.add("send", { orderId: 1044, vip: true }, { priority: 1 });        // 1 = highest\nawait invoices.add("send", { orderId: 1045 }, { priority: 10 });\n// cancel a reminder when the customer pays:\nawait (await reminders.getJob("remind:1043"))?.remove();', S),
        L(B('المراقبة', 'Monitoring'),
          B('BullMQ بيطلّع أحداث (completed، failed، stalled) وأعداد (waiting، active، delayed، failed). **queue depth** (عدد المستنيين) أهم رقم: لو بيكبر باستمرار، العمّال مش ملاحقين — زوّدهم أو دوّر على البطء. ولوحة زي Bull Board بتوريك كل مهمة وتخليك تعيد الفاشلة.', 'BullMQ emits events (completed, failed, stalled) and counts (waiting, active, delayed, failed). The **queue depth** (how many are waiting) is the key number: if it keeps growing, workers cannot keep up — add more or find the slowness. And a dashboard such as Bull Board shows each job and lets you retry failures.'),
          'setInterval(async () => {\n  const c = await invoices.getJobCounts("waiting", "active", "delayed", "failed");\n  metrics.gauge("queue.invoices.waiting", c.waiting);\n  if (c.waiting > 500 || c.failed > 20)\n    await notify("warn", `invoices queue: ${c.waiting} waiting, ${c.failed} failed`);   // → n8n → Telegram\n}, 60_000);\n// npm i @bull-board/express → mount at /admin/queues (behind admin auth!)', S)
      ],
      practice: [
        B('شغّل Redis في Docker وجرّب BullMQ.', 'Run Redis in Docker and try BullMQ.'),
        B('اعمل تذكير دفع متأخر 24 ساعة يتلغي لو دفع.', 'Make a 24-hour payment reminder cancelled on payment.'),
        B('اعمل تقرير يومي بـ upsertJobScheduler.', 'Create a daily report with upsertJobScheduler.'),
        B('اعرض أعداد الطابور في لوحة.', 'Show the queue counts on a dashboard.')
      ],
      words: [
        W('bullmq', 'مكتبة طوابير Node فوق Redis', 'a Node queue library on Redis', 'BullMQ retries failed jobs.'),
        W('redis', 'مخزن بيانات سريع في الذاكرة', 'a fast in-memory data store', 'Redis backs the queue.'),
        W('delayed job', 'مهمة بتشتغل بعد مدة', 'a job that runs after a delay', 'The reminder is a delayed job.'),
        W('repeatable job', 'مهمة بتتكرر بجدول', 'a job repeating on a schedule', 'The daily report is a repeatable job.'),
        W('job priority', 'أولوية المهمة في الطابور', 'a job’s precedence in the queue', 'VIP orders get job priority 1.'),
        W('queue depth', 'عدد المهام المستنية', 'how many jobs are waiting', 'Alert when queue depth exceeds 500.')
      ],
      read: [{ lib: 'BullMQ', what: B('اقرا Quick Start وRetrying failing jobs.', 'Read Quick Start and Retrying failing jobs.') }, { t: 'Bull Board', url: 'https://github.com/felixmosh/bull-board', what: B('لوحة مراقبة للطوابير.', 'A dashboard for queues.') }],
      challenge: B('انقل طابور «بوابة الطلبات» لـ BullMQ (أو خليه في القاعدة لو الحجم صغير — واكتب قرارك في ADR): invoices بـ jobId idempotent وbackoff وlimiter، تذكير دفع متأخر، تقرير يومي مجدول، وتنبيه queue depth لـ n8n.', 'Move the «orders gateway» queue to BullMQ (or keep it in the database if volume is small — record the decision in an ADR): invoices with idempotent jobIds, backoff and a limiter, a delayed payment reminder, a scheduled daily report, and a queue-depth alert to n8n.'),
      quiz: [
        Q(B('jobId: "invoice:1042":', 'jobId: "invoice:1042":'), [['يمنع إضافة نفس المهمة مرتين', 'stops adding the same job twice'], ['اسم عشوائي', 'a random name'], ['أولوية', 'a priority']], 0, B('idempotent.', 'Idempotent.')),
        Q(B('API بيقبل 5 طلبات/ثانية:', 'An API accepting 5 requests/second:'), [['limiter في الـ worker', 'a limiter on the worker'], ['concurrency 100', 'concurrency 100'], ['من غير حد', 'no limit']], 0, B('rate limit.', 'Rate limit.')),
        Q(B('queue depth بيكبر باستمرار:', 'Queue depth keeps growing:'), [['العمّال مش ملاحقين', 'workers cannot keep up'], ['تمام', 'fine'], ['Redis بايظ', 'Redis is broken']], 0, B('زوّد/حسّن.', 'Scale or optimise.'))
      ] },

    { title: B('أنماط متقدمة', 'Advanced patterns'),
      goal: B('أحداث مضمونة، توزيع، وإيقاف آمن.', 'Guaranteed events, fan-out and safe shutdowns.'),
      learn: [
        L(B('نمط الـ outbox', 'The outbox pattern'),
          B('مشكلة: حفظت الطلب في القاعدة، وقبل ما تحط المهمة في Redis السيرفر وقع — الطلب موجود والفاتورة عمرها ما هتتبعت. **outbox pattern**: في **نفس الـ transaction** اكتب الطلب وصف في جدول outbox. relay منفصل بيقرا الـ outbox وينشر للطابور. يا الاتنين يتسجلوا يا ولا واحد.', 'The problem: you saved the order in the database, and before adding the job to Redis the server crashed — the order exists and the invoice is never sent. The **outbox pattern**: in **the same transaction** write the order and a row in an outbox table. A separate relay reads the outbox and publishes to the queue. Both are recorded or neither.'),
          'import { DatabaseSync } from "node:sqlite";\nconst db = new DatabaseSync(":memory:");\ndb.exec("CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT); CREATE TABLE outbox (id INTEGER PRIMARY KEY, topic TEXT, payload TEXT, sent INTEGER DEFAULT 0)");\nfunction createOrder(customer, crashBeforeCommit = false) {\n  db.exec("BEGIN");\n  try {\n    const { lastInsertRowid: id } = db.prepare("INSERT INTO orders (customer) VALUES (?)").run(customer);\n    db.prepare("INSERT INTO outbox (topic, payload) VALUES (?, ?)").run("order.created", JSON.stringify({ id }));\n    if (crashBeforeCommit) throw new Error("server crashed");\n    db.exec("COMMIT");\n  } catch (e) { db.exec("ROLLBACK"); console.log("✗", customer, "→", e.message, "(no order, no event)"); }\n}\nfunction relay(publish) {\n  for (const row of db.prepare("SELECT * FROM outbox WHERE sent = 0 ORDER BY id").all()) {\n    publish(row.topic, JSON.parse(row.payload));\n    db.prepare("UPDATE outbox SET sent = 1 WHERE id = ?").run(row.id);\n  }\n}\ncreateOrder("Sara"); createOrder("Omar", true); createOrder("Mona");\nrelay((topic, p) => console.log("published", topic, p));\nconsole.log("orders:", db.prepare("SELECT COUNT(*) n FROM orders").get().n, "| unsent events:", db.prepare("SELECT COUNT(*) n FROM outbox WHERE sent = 0").get().n);', N()),
        L(B('fan-out', 'Fan-out'),
          B('**fan-out**: حدث واحد («طلب اتدفع») ← مهام كتير مستقلة: فاتورة، إيميل، CRM، مخزون، تحليلات. كل واحدة في طابورها بـ retry لوحدها — فشل الـ CRM ميأخرش الفاتورة. ونفس الحدث ممكن يروح لـ n8n يعمل باقي الأتمتة.', '**fan-out**: one event («order paid») → many independent jobs: an invoice, an email, the CRM, stock, analytics. Each in its own queue with its own retries — a CRM failure does not delay the invoice. And the same event can go to n8n for the rest of the automation.'),
          'const subscribers = {\n  "order.paid": [\n    ["invoices", "send", o => ({ orderId: o.id })],\n    ["emails", "receipt", o => ({ to: o.email, orderId: o.id })],\n    ["crm", "upsert-deal", o => ({ orderId: o.id, amount: o.total })],\n    ["n8n", "webhook", o => ({ event: "order.paid", order: o })],\n  ],\n};\nconst queued = [];\nfunction fanOut(event, payload) {\n  for (const [queue, name, map] of subscribers[event] ?? [])\n    queued.push(`${queue}/${name} jobId=${event}:${payload.id}:${queue} data=${JSON.stringify(map(payload))}`);\n}\nfanOut("order.paid", { id: 1042, email: "sara@example.com", total: 250 });\nconsole.log(queued.join("\\n"));', N()),
        L(B('الإيقاف والنشر', 'Stopping and deploying'),
          B('عند النشر، الـ worker بياخد SIGTERM: **graceful shutdown worker** — بطّل تاخد مهام جديدة، كمّل الشغالة (بحد وقت)، واقفل الاتصالات. المهام اللي اتقطعت (stalled) بترجع للطابور تلقائي (BullMQ) أو بـ «locked من أكتر من 10 دقايق ← queued» (طابور القاعدة). وكده النشر ميضيّعش شغل.', 'On deploy, the worker receives SIGTERM: a **graceful shutdown worker** — stop taking new jobs, finish running ones (with a time limit), and close connections. Interrupted (stalled) jobs return to the queue automatically (BullMQ) or via «locked for over 10 minutes → queued» (the database queue). So deploys lose no work.'),
          'const worker = new Worker("invoices", handler, { connection, concurrency: 3 });\nasync function shutdown(signal) {\n  log.info(`${signal}: closing worker`);\n  const timer = setTimeout(() => process.exit(1), 60_000);    // hard stop after 60 s\n  await worker.close();                                        // waits for active jobs, takes no new ones\n  clearTimeout(timer);\n  process.exit(0);\n}\nprocess.on("SIGTERM", shutdown);\nprocess.on("SIGINT", shutdown);\n// database queue: a sweeper every minute\n// UPDATE jobs SET status = \'queued\' WHERE status = \'running\' AND locked_at < now() - interval \'10 minutes\';', S)
      ],
      practice: [
        B('شغّل مثال الـ outbox وشوف الطلب الفاشل مسابش حدث.', 'Run the outbox example and see the failed order left no event.'),
        B('اعمل fan-out لحدث order.paid في مشروعك.', 'Build a fan-out for order.paid in your project.'),
        B('ضيف graceful shutdown للـ worker وانشر في النص.', 'Add a graceful shutdown to the worker and deploy mid-job.'),
        B('اعمل sweeper للمهام العالقة.', 'Write a sweeper for stuck jobs.')
      ],
      words: [
        W('outbox pattern', 'تسجيل الحدث مع البيانات في نفس الـ transaction', 'recording the event with the data in one transaction', 'The outbox pattern stops lost events.'),
        W('fan-out', 'حدث واحد بيولّد مهام كتير', 'one event creating many jobs', 'order.paid fans out to four queues.'),
        W('graceful shutdown worker', 'إيقاف الـ worker بعد إنهاء شغله', 'stopping a worker after finishing its work', 'A graceful shutdown worker loses no jobs.'),
        W('stalled job', 'مهمة اتقطعت ومحدش كمّلها', 'a job interrupted and left unfinished', 'Stalled jobs return to the queue.'),
        W('relay', 'عملية بتنقل الأحداث من الـ outbox للطابور', 'a process moving events from the outbox to the queue', 'The relay runs every second.')
      ],
      read: [{ t: 'microservices.io: Transactional outbox', url: 'https://microservices.io/patterns/data/transactional-outbox.html', what: B('اقرا Problem وSolution.', 'Read Problem and Solution.') }, { t: 'n8n Docs: Queue mode', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode', what: B('شوف إزاي n8n نفسه بيستخدم Redis وworkers.', 'See how n8n itself uses Redis and workers.') }],
      challenge: B('ضيف لـ «بوابة الطلبات» outbox (الطلب والحدث في transaction واحدة) وrelay، وfan-out لـ order.paid على 4 طوابير، وgraceful shutdown لكل worker، وsweeper — واختبر crash بين الحفظ والنشر.', 'Add to the «orders gateway» an outbox (order and event in one transaction) and a relay, a fan-out of order.paid to 4 queues, a graceful shutdown for every worker, and a sweeper — and test a crash between saving and publishing.'),
      quiz: [
        Q(B('الطلب اتحفظ والحدث ضاع:', 'The order was saved but the event was lost:'), ['outbox pattern', B('retry أكتر', 'more retries'), 'cache'], 0, B('transaction واحدة.', 'One transaction.')),
        Q(B('فشل الـ CRM يأخر الفاتورة؟', 'Does a CRM failure delay the invoice?'), [['لأ مع fan-out بطوابير منفصلة', 'not with fan-out to separate queues'], ['أيوه دايمًا', 'always'], ['ساعات', 'sometimes']], 0, B('استقلال.', 'Independence.')),
        Q(B('SIGTERM للـ worker:', 'SIGTERM to a worker:'), [['يكمّل الشغال ويقف', 'finishes running jobs and stops'], ['يقف فورًا', 'stops at once'], ['يتجاهل', 'ignores it']], 0, B('graceful.', 'Graceful.'))
      ] },

    { title: B('مراجعة الشهر التاسع ومشروعه', 'Month 9 review and project'),
      goal: B('باك إند كامل بمستوى محترف.', 'A complete back end at a professional level.'),
      review: [
        B('قواعد البيانات: SQL والقيود والـ transactions والـ upsert وPostgres والـ migrations (أسبوع 33).', 'Databases: SQL, constraints, transactions, upserts, Postgres and migrations (week 33).'),
        B('الأمان: كلمات السر والجلسات وJWT وOAuth وRBAC وIDOR (أسبوع 34).', 'Security: passwords, sessions, JWT, OAuth, RBAC and IDOR (week 34).'),
        B('الوقت الحقيقي: SSE وWebSockets والغرف وpub/sub (أسبوع 35).', 'Real time: SSE, WebSockets, rooms and pub/sub (week 35).'),
        B('الطوابير: claim آمن وretry وdead letter وidempotency وBullMQ.', 'Queues: safe claiming, retries, dead letters, idempotency and BullMQ.'),
        B('outbox وfan-out والمهام المجدولة والإيقاف الآمن والمراقبة.', 'Outbox, fan-out, scheduled jobs, safe shutdowns and monitoring.')
      ],
      project: B('مشروع الشهر التاسع «منصة عمليات المتجر»: Postgres بـ migrations وقيود؛ مستخدمين بأدوار (جلسات أو Google) ومفاتيح API لـ n8n؛ webhooks متجر موقّعة ← upsert + outbox في transaction؛ relay ← fan-out لطوابير (فاتورة PDF، إيميل، CRM، n8n) بـ retry وdead letter وidempotency؛ تذكير دفع متأخر وتقرير يومي مجدول؛ لوحة حية بـ SSE (طلبات) وWebSocket (ملاحظات) بصلاحيات؛ مراقبة queue depth وdead letters بتنبيهات n8n؛ graceful shutdown؛ واختبارات integration وDocker Compose (api + worker + postgres + redis).', 'Month 9 project «shop operations platform»: Postgres with migrations and constraints; users with roles (sessions or Google) and API keys for n8n; signed shop webhooks → upsert + outbox in one transaction; a relay → fan-out to queues (PDF invoice, email, CRM, n8n) with retries, dead letters and idempotency; a delayed payment reminder and a scheduled daily report; a live board with SSE (orders) and WebSocket (notes) with permissions; queue-depth and dead-letter monitoring with n8n alerts; graceful shutdowns; and integration tests with Docker Compose (api + worker + postgres + redis).'),
      test: [
        Q(B('webhook وشغل دقيقة:', 'A webhook and a minute of work:'), [['enqueue ورد 202', 'enqueue and reply 202'], ['استنى', 'wait'], ['ارفض', 'refuse']], 0, B('طابور.', 'A queue.')),
        Q(B('اللي بيعالج المهام:', 'Whatever processes jobs is the:'), ['worker / consumer', 'producer', 'client'], 0, B('منفصل.', 'Separate.')),
        Q(B('عاملين ميخدوش نفس المهمة:', 'Two workers must not take the same job:'), [['claim في أمر واحد / SKIP LOCKED', 'claim in one statement / SKIP LOCKED'], ['sleep عشوائي', 'random sleeps'], ['عامل واحد بس', 'one worker only']], 0, B('atomic.', 'Atomic.')),
        Q(B('بعد 3 محاولات فاشلة:', 'After 3 failed attempts:'), ['dead letter + alert', B('للأبد', 'forever'), B('امسح', 'delete')], 0, B('إنسان يبص.', 'A person looks.')),
        Q(B('الانتظار بين المحاولات:', 'The wait between attempts:'), [['بيزيد (backoff)', 'grows (backoff)'], ['صفر', 'zero'], ['ثابت ساعة', 'a fixed hour']], 0, B('exponential.', 'Exponential.')),
        Q(B('الطوابير بتضمن:', 'Queues guarantee:'), ['at-least-once', 'exactly-once', 'at-most-zero'], 0, B('idempotency.', 'Idempotency.')),
        Q(B('مهمة اتعملت مرتين بعد crash:', 'A job ran twice after a crash:'), [['idempotency key', 'an idempotency key'], ['retry أقل', 'fewer retries'], ['Redis أسرع', 'a faster Redis']], 0, B('مرة واحدة.', 'Once.')),
        Q(B('BullMQ مبني على:', 'BullMQ is built on:'), ['Redis', 'SQLite', 'S3'], 0, B('سريع.', 'Fast.')),
        Q(B('«كل يوم 7 الصبح القاهرة»:', '«Every day at 7 a.m. Cairo»:'), [['repeatable job بـ pattern وtz', 'a repeatable job with pattern and tz'], ['setTimeout', 'setTimeout'], ['delay 7', 'delay 7']], 0, B('مجدول.', 'Scheduled.')),
        Q(B('الطلب اتحفظ والنشر فشل:', 'The order saved but publishing failed:'), ['outbox pattern', 'fan-out', 'polling'], 0, B('transaction.', 'A transaction.')),
        Q(B('order.paid ← فاتورة وإيميل وCRM:', 'order.paid → invoice, email and CRM:'), ['fan-out', 'outbox', 'cron'], 0, B('مستقلين.', 'Independent.')),
        Q(B('نشر الكود والـ worker شغال:', 'Deploying while the worker runs:'), [['graceful shutdown', 'a graceful shutdown'], ['kill -9', 'kill -9'], ['استنى بالليل', 'wait for night']], 0, B('مفيش ضياع.', 'Nothing lost.'))
      ] }
  ]
};
