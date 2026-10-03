// n8n week 27 — Reliability: retries, idempotency and dead-letter queues.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الاعتمادية: إعادة المحاولة والـ idempotency وطوابير الرسايل الفاشلة', 'Reliability: retries, idempotency and dead-letter queues'),
  goal: B('تبني أنظمة بتكمّل شغلها لما الشبكة تقطع أو خدمة تقع: تعرف أنواع الفشل، وتعيد بذكاء، ومتكررش أفعال، وتحجز الرسايل اللي بتبوّظ، وتوقف الطلبات لخدمة واقعة لحد ما ترجع.',
          'Build systems that keep working when the network drops or a service goes down: know the kinds of failure, retry wisely, never repeat actions, quarantine messages that break things, and stop calling a dead service until it recovers.'),
  days: [
    { title: B('أنواع الفشل والمهلات', 'Failure modes and timeouts'),
      goal: B('تصنّف أي فشل وتعرف التصرف المناسب ليه.', 'Classify any failure and know the right response.'),
      learn: [
        L(B('أربع عائلات', 'Four families'),
          B('**مؤقت** (شبكة، 429، 503): أعد بعد شوية. **دائم** (400، 404، بيانات غلط): متعدش؛ صلّح أو ابعت لإنسان. **جزئي** (من 100 عنصر فشل 3): كمّل الباقي وسجّل الـ 3. **صامت** (نجح بس النتيجة غلط): ده الأخطر — محتاج فحص للنتيجة نفسها.', '**Temporary** (network, 429, 503): retry later. **Permanent** (400, 404, bad data): do not retry; fix it or send it to a person. **Partial** (3 of 100 items failed): finish the rest and record the 3. **Silent** (it «succeeded» but the result is wrong): the most dangerous — it needs a check of the result itself.'),
          'temporary → retry with backoff\npermanent → no retry → human queue\npartial   → continue + record failed items\nsilent    → validate the output (count, totals)'),
        L(B('كل طلب ليه مهلة', 'Every request has a timeout'),
          B('من غير مهلة، طلب معلّق ممكن يقعد دقايق ويحجز التنفيذ. في HTTP Request: Options ← Timeout (مثلًا 15000 ms). اختار المهلة حسب الخدمة: API سريع 10 ثواني، خدمة AI أو PDF ممكن 60. ولو المهلة عدّت، اعتبره فشل مؤقت.', 'Without a timeout, a hanging request can sit for minutes and block the run. In HTTP Request: Options → Timeout (e.g. 15000 ms). Pick it per service: a fast API 10 seconds, an AI or PDF service maybe 60. When it passes, treat it as a temporary failure.'),
          'HTTP Request → Options → Timeout: 15000\nAI node → Options → Timeout: 60000'),
        L(B('الفشل المتسلسل', 'Cascading failure'),
          B('خدمة واحدة بطيئة ← كل التنفيذات بتستناها ← الطابور بيكبر ← السيرفر يتملي ← كل حاجة تقع. المهلات القصيرة، وحدود التوازي، وفصل الأجزاء بطوابير بيمنعوا عطل واحد يوقّع النظام كله.', 'One slow service → every run waits for it → the queue grows → the server fills up → everything falls. Short timeouts, concurrency limits, and separating parts with queues stop one failure from bringing down the whole system.'),
          'slow CRM (30 s) × 200 runs in parallel → server overload\nfix: timeout 10 s + max 10 parallel + queue in front')
      ],
      practice: [
        B('صنّف آخر 10 أخطاء في Executions عندك للعائلات الأربعة.', 'Classify your last 10 errors in Executions into the four families.'),
        B('حط Timeout لكل نود HTTP في workflow مهم.', 'Set a Timeout on every HTTP node in an important workflow.'),
        B('اكتب فحص «فشل صامت» لتقرير (العدد والمجموع منطقيين؟).', 'Write a «silent failure» check for a report (are the count and total sensible?).'),
        B('جرّب `https://httpbin.org/delay/20` بمهلة 5 ثواني وشوف الخطأ.', 'Try `https://httpbin.org/delay/20` with a 5-second timeout and read the error.')
      ],
      words: [
        W('failure mode', 'طريقة معيّنة ممكن النظام يفشل بيها', 'a particular way a system can fail', 'List the failure modes of each workflow.'),
        W('request timeout', 'أقصى وقت تستنى فيه رد الطلب', 'the longest you wait for a request’s reply', 'Set a 15-second request timeout.'),
        W('silent failure', 'فشل محدش بياخد باله منه لأن مفيش خطأ ظاهر', 'a failure nobody notices because no error shows', 'An empty report was a silent failure.'),
        W('cascading failure', 'عطل في جزء بيوقّع أجزاء تانية ورا بعض', 'a fault in one part that brings down others in turn', 'Timeouts prevent cascading failure.'),
        W('permanent error', 'خطأ مش هيتصلّح بإعادة المحاولة', 'an error that retrying will not fix', 'A 404 is a permanent error.')
      ],
      read: ['lib:n8n Docs: HTTP Request node', { lib: 'n8n Docs: Error handling', what: B('اقرا الفرق بين التعامل مع الخطأ في النود وفي الـ workflow.', 'Read the difference between handling errors in a node and in the workflow.') }],
      challenge: B('اعمل «تقرير صحة» يومي لـ workflow مهم: عدد التنفيذات، الفاشلة مصنّفة بالعائلة، وفحص فشل صامت على النتيجة، ويبعت تنبيه لو حاجة غريبة.', 'Build a daily «health report» for an important workflow: run count, failures by family, and a silent-failure check on the result, sending an alert if something looks wrong.'),
      quiz: [
        Q(B('خطأ 404 من API:', 'A 404 from an API:'), [['دائم: متعدش', 'permanent: do not retry'], ['مؤقت: أعد', 'temporary: retry'], ['تجاهله', 'ignore it']], 0, B('مش هيتصلّح لوحده.', 'It will not fix itself.')),
        Q(B('أخطر نوع فشل:', 'The most dangerous kind of failure:'), [['الصامت', 'the silent one'], ['المؤقت', 'the temporary one'], ['اللي ليه رسالة واضحة', 'one with a clear message']], 0, B('محدش بياخد باله.', 'Nobody notices it.')),
        Q(B('من غير timeout، طلب معلّق:', 'Without a timeout, a hanging request:'), [['ممكن يحجز التنفيذ دقايق', 'can block the run for minutes'], ['بيفشل على طول', 'fails at once'], ['مش بيأثر', 'has no effect']], 0, B('حط مهلة دايمًا.', 'Always set one.'))
      ] },

    { title: B('إعادة المحاولة بذكاء', 'Retrying wisely'),
      goal: B('تعيد بفواصل بتزيد وعشوائية، وتحترم طلب الخدمة إنك تستنى.', 'Retry with growing gaps and randomness, and respect a service asking you to wait.'),
      learn: [
        L(B('backoff أُسّي', 'Exponential backoff'),
          B('بدل ما تعيد كل ثانيتين، ضاعف الانتظار: 1، 2، 4، 8، 16 ثانية. ده بيدّي الخدمة فرصة ترجع، ومش بيزوّد الضغط عليها. وحط حد أقصى للانتظار (مثلًا 60 ثانية) وحد لعدد المحاولات.', 'Instead of retrying every two seconds, double the wait: 1, 2, 4, 8, 16 seconds. This gives the service time to recover without adding pressure. Set a maximum wait (e.g. 60 seconds) and a maximum number of tries.'),
          'attempt 1 → wait 1 s · attempt 2 → 2 s · attempt 3 → 4 s · attempt 4 → 8 s · give up'),
        L(B('jitter: شوية عشوائية', 'Jitter: a little randomness'),
          B('لو 500 تنفيذ فشلوا مع بعض وكلهم أعادوا بعد 4 ثواني بالظبط، هيضربوا الخدمة مع بعض تاني. **jitter** بيضيف وقت عشوائي صغير لكل واحد (مثلًا 4 ثواني ± ثانية) فيتوزّعوا.', 'If 500 runs failed together and all retry after exactly 4 seconds, they hit the service together again. **Jitter** adds a small random amount to each (e.g. 4 seconds ± 1) so they spread out.'),
          "const base = 1000 * 2 ** attempt;          // 2, 4, 8 s…\nconst wait = Math.min(60000, base) * (0.5 + Math.random());"),
        L(B('Retry-After والـ loop المخصص', 'Retry-After and a custom loop'),
          B('Retry On Fail في النود سهل بس بفاصل ثابت. لما الخدمة بترد 429 ومعاها header `Retry-After: 30`، استنى الوقت ده بالظبط. اعمل loop مخصص: HTTP (On Error: error output) ← Code يحسب الانتظار ← Wait ← رجوع، مع عدّاد.', 'Retry On Fail in a node is easy but has a fixed gap. When a service answers 429 with a `Retry-After: 30` header, wait exactly that long. Build a custom loop: HTTP (On Error: error output) → Code computes the wait → Wait → back, with a counter.'),
          "const ra = Number($json.error?.headers?.['retry-after']);\nconst attempt = ($json.attempt ?? 0) + 1;\nconst wait = ra ? ra * 1000 : Math.min(60000, 1000 * 2 ** attempt) * (0.5 + Math.random());\nreturn { json: { ...$json, attempt, waitMs: Math.round(wait) } };")
      ],
      practice: [
        B('اعمل loop إعادة مخصص بـ backoff وjitter وحد 5 محاولات.', 'Build a custom retry loop with backoff, jitter and a 5-try limit.'),
        B('جرّبه على `https://httpbin.org/status/503` وسجّل أوقات الانتظار.', 'Test it on `https://httpbin.org/status/503` and log the wait times.'),
        B('اقرا Retry-After من رد 429 (httpbin بيرجّع headers تقدر تحددها).', 'Read Retry-After from a 429 reply (httpbin can return headers you set).'),
        B('حوّله لـ sub-workflow `svc: call with retry` تستخدمه في أي مكان.', 'Turn it into a `svc: call with retry` sub-workflow to use anywhere.')
      ],
      words: [
        W('backoff', 'انتظار بيزيد بين كل محاولة والتانية', 'a wait that grows between one try and the next', 'Double the backoff after each 503.'),
        W('jitter', 'وقت عشوائي صغير بيتضاف للانتظار', 'a small random time added to a wait', 'Jitter spreads the retries out.'),
        W('retry budget', 'أقصى عدد محاولات أو وقت مسموح للإعادة', 'the most tries or time allowed for retrying', 'The retry budget is 5 tries or 2 minutes.'),
        W('max wait', 'أطول انتظار مسموح بين محاولتين', 'the longest wait allowed between two tries', 'Cap the max wait at 60 seconds.'),
        W('thundering herd', 'طلبات كتير بتضرب خدمة في نفس اللحظة', 'many requests hitting a service at the same moment', 'Jitter prevents a thundering herd.')
      ],
      read: [{ t: 'MDN: Retry-After header', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After', what: B('اقرا الشكلين (ثواني وتاريخ).', 'Read the two forms (seconds and a date).') }, { t: 'AWS Builders’ Library: Timeouts, retries and backoff with jitter', url: 'https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter', what: B('اقرا الأفكار الأساسية بس.', 'Read just the main ideas.') }],
      challenge: B('ابني `svc: call with retry`: بياخد طلب HTTP، يعيد لـ 429/5xx بـ backoff وjitter، يحترم Retry-After، يقف على 4xx التانية، ويرجّع `{ ok, attempts, status }`.', 'Build `svc: call with retry`: it takes an HTTP request, retries 429/5xx with backoff and jitter, respects Retry-After, stops on other 4xx, and returns `{ ok, attempts, status }`.'),
      quiz: [
        Q(B('backoff أُسّي يعني الانتظار:', 'Exponential backoff means the wait:'), [['بيتضاعف', 'doubles'], ['ثابت', 'is fixed'], ['بيقل', 'shrinks']], 0, B('1، 2، 4، 8…', '1, 2, 4, 8…')),
        Q(B('jitter بيمنع:', 'Jitter prevents:'), [['كل الإعادات تحصل في نفس اللحظة', 'all retries happening at the same moment'], ['الأخطاء', 'errors'], ['الـ timeout', 'timeouts']], 0, B('بيوزّعهم.', 'It spreads them.')),
        Q(B('الخدمة ردت `Retry-After: 30`:', 'The service replied `Retry-After: 30`:'), [['استنى 30 ثانية', 'wait 30 seconds'], ['أعد فورًا', 'retry at once'], ['متعدش خالص', 'never retry']], 0, B('احترم طلبها.', 'Respect its request.'))
      ] },

    { title: B('الـ idempotency في التطبيق', 'Idempotency in practice'),
      goal: B('أي خطوة ممكن تتكرر من غير ما تعمل أثر مرتين.', 'Any step may repeat without causing its effect twice.'),
      learn: [
        L(B('مفتاح idempotency للـ APIs', 'Idempotency keys for APIs'),
          B('APIs زي Stripe بتقبل header `Idempotency-Key`: لو بعت نفس الطلب بنفس المفتاح مرتين (بسبب retry)، الخدمة بتنفّذه مرة وترجّع نفس النتيجة. استخدم مفتاح ثابت من بياناتك، زي `refund-{{ order_id }}`، مش رقم عشوائي كل مرة.', 'APIs like Stripe accept an `Idempotency-Key` header: if you send the same request with the same key twice (because of a retry), the service performs it once and returns the same result. Use a stable key from your data, like `refund-{{ order_id }}`, not a new random number each time.'),
          'POST /v1/refunds\nIdempotency-Key: refund-{{ $json.order_id }}\n→ second call with the same key returns the first result, no second refund'),
        L(B('جدول «اتعمل قبل كده»', 'A «done before» table'),
          B('للخدمات اللي مش بتدعم المفتاح ده: جدول `processed(key PRIMARY KEY, done_at)`. قبل الفعل اعمل `INSERT … ON CONFLICT DO NOTHING RETURNING key`: لو رجّع صف، كمّل؛ لو مرجّعش، ده اتعمل قبل كده — اقف. قاعدة البيانات هي اللي بتضمن مفيش اتنين يعدّوا.', 'For services without such a key: a table `processed(key PRIMARY KEY, done_at)`. Before the action run `INSERT … ON CONFLICT DO NOTHING RETURNING key`: if a row comes back, continue; if not, it was done before — stop. The database guarantees two runs cannot both pass.'),
          "INSERT INTO processed (key) VALUES ('welcome-email:' || $1)\nON CONFLICT (key) DO NOTHING\nRETURNING key;   -- no row → already sent → skip"),
        L(B('مرة على الأقل، مش مرة بالظبط', 'At least once, not exactly once'),
          B('أغلب الخدمات بتضمن **at-least-once**: الرسالة هتوصل مرة أو أكتر. «exactly-once» صعب جدًا في الحقيقة. فالحل العملي: خلّي المعالجة نفسها idempotent، فالتكرار مالوش أثر.', 'Most services guarantee **at-least-once**: a message arrives once or more. «Exactly-once» is very hard in reality. The practical answer: make the handling itself idempotent, so repeats have no effect.'),
          'webhook delivered twice → dedupe by event id → effect happens once')
      ],
      practice: [
        B('اعمل جدول processed في Postgres أو Supabase.', 'Create a processed table in Postgres or Supabase.'),
        B('خلّي إيميل الترحيب يتبعت مرة واحدة بس حتى لو الـ workflow اشتغل 3 مرات.', 'Make the welcome email go out only once even if the workflow runs 3 times.'),
        B('ابعت Idempotency-Key لـ API تجريبي (Stripe test mode لو عندك).', 'Send an Idempotency-Key to a test API (Stripe test mode if you have it).'),
        B('اكتب لكل فعل في نظامك: مفتاح الـ idempotency بتاعه إيه؟', 'Write for each action in your system: what is its idempotency key?')
      ],
      words: [
        W('idempotency key', 'مفتاح ثابت بيخلي الطلب المكرر يتنفّذ مرة', 'a stable key that makes a repeated request run once', 'Send an idempotency key with every refund.'),
        W('at-least-once', 'ضمان إن الرسالة توصل مرة أو أكتر', 'a guarantee that a message arrives once or more', 'Webhooks are at-least-once.'),
        W('exactly-once', 'ضمان إن الحاجة تحصل مرة بالظبط (صعب جدًا)', 'a guarantee something happens exactly one time (very hard)', 'Do not promise exactly-once delivery.'),
        W('dedupe table', 'جدول بيسجّل اللي اتعمل عشان ميتكررش', 'a table recording what was done so it is not repeated', 'Check the dedupe table before sending.'),
        W('on conflict', 'جزء في SQL بيحدد يحصل إيه لو المفتاح موجود', 'an SQL clause saying what to do if the key exists', 'ON CONFLICT DO NOTHING skips duplicates.')
      ],
      read: [{ t: 'Stripe: Idempotent requests', url: 'https://docs.stripe.com/api/idempotent_requests', what: B('اقرا إزاي المفتاح بيشتغل ومدته.', 'Read how the key works and how long it lasts.') }, { t: 'PostgreSQL: INSERT … ON CONFLICT', url: 'https://www.postgresql.org/docs/current/sql-insert.html', what: B('اقرا جزء ON CONFLICT.', 'Read the ON CONFLICT part.') }],
      challenge: B('خُد نظام فيه 4 أفعال مهمة (إيميل، فاتورة، رسالة واتساب، تسجيل في CRM) وخلّي كل واحد idempotent بمفتاح واضح، واختبر بتشغيل كل حاجة 3 مرات.', 'Take a system with 4 important actions (email, invoice, WhatsApp message, CRM record) and make each idempotent with a clear key; test by running everything 3 times.'),
      quiz: [
        Q(B('مفتاح idempotency كويس:', 'A good idempotency key:'), [['ثابت من البيانات زي refund-1042', 'stable from the data, like refund-1042'], ['رقم عشوائي كل مرة', 'a new random number each time'], ['الوقت الحالي', 'the current time']], 0, B('نفس الطلب = نفس المفتاح.', 'Same request = same key.')),
        Q(B('`ON CONFLICT DO NOTHING RETURNING` مرجّعش صف:', '`ON CONFLICT DO NOTHING RETURNING` returned no row:'), [['الحاجة اتعملت قبل كده', 'it was done before'], ['خطأ', 'an error'], ['الجدول فاضي', 'the table is empty']], 0, B('اقف.', 'Stop.')),
        Q(B('الضمان العملي في أغلب الخدمات:', 'The practical guarantee in most services:'), [['at-least-once', 'at-least-once'], ['exactly-once', 'exactly-once'], ['never', 'never']], 0, B('فخلي المعالجة idempotent.', 'So make handling idempotent.'))
      ] },

    { title: B('الحجز والإعادة (DLQ)', 'Quarantine and replay (DLQ)'),
      goal: B('الرسايل اللي بتبوّظ تتعزل، وتتعاد بأمان بعد الإصلاح.', 'Messages that break things are isolated, and replayed safely after the fix.'),
      learn: [
        L(B('الرسالة السامة', 'The poison message'),
          B('رسالة واحدة بيانات غريبة (تاريخ بشكل مش متوقع، حقل ناقص) بتفشل كل مرة. لو فضلت تعيدها، بتسد الطابور وتوقف الرسايل السليمة. بعد عدد محاولات، **اعزلها** (quarantine) في dead-letter queue وكمّل.', 'A single message with odd data (an unexpected date format, a missing field) fails every time. If you keep retrying it, it blocks the queue and stops healthy messages. After a number of tries, **quarantine** it in a dead-letter queue and move on.'),
          'events: status new → processing → failed (attempts 1..3)\nattempts ≥ 3 → status dead → dead_letter table (+ error, last_payload)'),
        L(B('شكل جدول الـ DLQ', 'The DLQ table'),
          B('احفظ كل اللي هتحتاجه للتصليح: المصدر، الـ payload كامل، رسالة الخطأ، النود اللي فشل، عدد المحاولات، أول وآخر وقت، ورابط التنفيذ. ومن غير بيانات حساسة زيادة عن اللازم.', 'Save everything you need to fix it: the source, the full payload, the error message, the failed node, the attempt count, first and last time, and the execution link. And no more sensitive data than needed.'),
          'dead_letter(id, source, payload jsonb, error text, node text,\n            attempts int, first_seen, last_seen, execution_url, replayed_at)'),
        L(B('أداة الإعادة', 'The replay tool'),
          B('workflow يدوي (أو فورم) بياخد فلتر (المصدر، الفترة، نوع الخطأ)، ويعيد إدخال الرسايل في الطابور الأصلي بحالة new، ويحط `replayed_at`. ولأن المعالجة idempotent، الإعادة آمنة. وتنبيه لو الـ DLQ عدّى حد معيّن (مثلًا 20 رسالة).', 'A manual workflow (or a form) takes a filter (source, period, error type), puts the messages back into the original queue with status new, and sets `replayed_at`. Because handling is idempotent, replay is safe. And an alert if the DLQ passes a limit (e.g. 20 messages).'),
          'Form (source=shop, error like "%date%") → SELECT from dead_letter\n→ INSERT INTO events (payload, status) … \'new\' → UPDATE dead_letter SET replayed_at = now()')
      ],
      practice: [
        B('ضيف للطابور بتاعك حالة dead وجدول dead_letter.', 'Add a dead status and a dead_letter table to your queue.'),
        B('ابعت رسالة سامة عمدًا واتأكد إنها اتعزلت والباقي كمّل.', 'Send a poison message on purpose and check it was isolated while the rest continued.'),
        B('ابني فورم إعادة بفلتر المصدر والفترة.', 'Build a replay form filtered by source and period.'),
        B('اعمل تنبيه لو الـ DLQ فيه أكتر من 20.', 'Create an alert when the DLQ holds more than 20.')
      ],
      words: [
        W('poison message', 'رسالة بتفشل كل مرة وبتسد الطابور', 'a message that fails every time and blocks the queue', 'Quarantine the poison message after 3 tries.'),
        W('quarantine', 'تعزل حاجة بايظة بعيد عن الباقي', 'to isolate something broken away from the rest', 'Failed events go to quarantine.'),
        W('dead-letter queue', 'طابور للرسايل اللي فشلت نهائيًا', 'a queue for messages that failed for good', 'Check the dead-letter queue every morning.'),
        W('replay tool', 'أداة بتعيد إدخال رسايل للمعالجة', 'a tool that puts messages back for processing', 'Use the replay tool after the fix.'),
        W('payload', 'محتوى الرسالة أو الطلب نفسه', 'the content of a message or request itself', 'Store the full payload in the DLQ.')
      ],
      read: ['lib:n8n Docs: Error Trigger', { lib: 'n8n Docs: Executions', what: B('اقرا عن إعادة التشغيل من صفحة التنفيذات.', 'Read about retrying from the executions page.') }],
      challenge: B('اكمل طابور الأسبوع اللي فات: حالات كاملة، dead letter بكل التفاصيل، فورم إعادة بفلاتر، تنبيه بحد، واختبار بـ 3 أنواع رسايل سامة.', 'Complete last week’s queue: full statuses, a dead letter with all details, a replay form with filters, an alert threshold, and a test with 3 kinds of poison message.'),
      quiz: [
        Q(B('ليه تعزل الرسالة السامة؟', 'Why quarantine a poison message?'), [['عشان متسدّش الطابور', 'so it does not block the queue'], ['عشان تمسحها', 'to delete it'], ['عشان تبعتها للعميل', 'to send it to the client']], 0, B('الباقي يكمّل.', 'The rest continue.')),
        Q(B('أهم حاجة تتحفظ في DLQ:', 'The most important thing to keep in a DLQ:'), [['الـ payload والخطأ', 'the payload and the error'], ['لون الـ workflow', 'the workflow colour'], ['اسمك', 'your name']], 0, B('عشان تصلّح وتعيد.', 'To fix and replay.')),
        Q(B('الإعادة آمنة لأن:', 'Replay is safe because:'), [['المعالجة idempotent', 'handling is idempotent'], ['الرسايل اتمسحت', 'messages were deleted'], ['n8n بيمنع التكرار لوحده', 'n8n prevents repeats by itself']], 0, B('التكرار مالوش أثر.', 'Repeats have no effect.'))
      ] },

    { title: B('قاطع الدائرة والتدهور المقبول', 'Circuit breakers and graceful degradation'),
      goal: B('توقف ضرب خدمة واقعة، وتقدّم أحسن خدمة ممكنة لحد ما ترجع.', 'Stop hitting a dead service, and give the best service possible until it returns.'),
      learn: [
        L(B('قاطع الدائرة', 'The circuit breaker'),
          B('لو خدمة فشلت مثلًا 5 مرات ورا بعض، **افتح الدائرة**: بطّل تبعتلها خالص لمدة (5 دقايق)، وحط الشغل في الطابور. بعد المدة جرّب طلب واحد (half-open): لو نجح، اقفل الدائرة ورجّع؛ لو فشل، افتحها تاني. الحالة تتحفظ في جدول أو static data.', 'If a service fails, say, 5 times in a row, **open the circuit**: stop sending to it at all for a period (5 minutes), and queue the work. After the period try one request (half-open): if it works, close the circuit and resume; if not, open it again. Keep the state in a table or static data.'),
          'closed → 5 failures → open (5 min: no calls, queue work)\nopen → time passed → half-open (1 test call)\nhalf-open → success → closed · failure → open'),
        L(B('التدهور المقبول', 'Graceful degradation'),
          B('لما جزء يقع، قدّم نسخة أبسط بدل ما كله يقع: الـ AI واقع؟ رد برسالة جاهزة «استلمنا طلبك وهنرد خلال ساعة». واتساب واقع؟ ابعت SMS أو إيميل (قناة بديلة). الـ CRM بطيء؟ احفظ في شيت وزامن بعدين.', 'When a part fails, offer a simpler version instead of failing completely: AI down? Reply with a ready message «we received your request and will answer within an hour». WhatsApp down? Send an SMS or email (a fallback channel). CRM slow? Save to a sheet and sync later.'),
          'IF circuit("ai") = open → reply template "We got your message…"\nIF circuit("whatsapp") = open → email instead'),
        L(B('فحص الصحة وصفحة الحالة', 'Health checks and a status page'),
          B('workflow كل 5 دقايق بيعمل **health check** لكل خدمة مهمة (طلب خفيف زي `/me` أو `/health`) ويسجّل النتيجة. منها تعمل صفحة حالة بسيطة للفريق أو العميل، وتنبيه لو خدمة وقعت قبل ما العملاء يحسّوا.', 'A workflow every 5 minutes runs a **health check** on each important service (a light call like `/me` or `/health`) and records the result. From it build a simple status page for the team or client, and an alert when a service goes down before customers notice.'),
          'Schedule 5 min → for each service: GET /health (timeout 5 s)\n→ upsert service_status → IF down for 10 min → alert + open circuit')
      ],
      practice: [
        B('اعمل جدول circuit_state(service, state, failures, opened_at).', 'Create a circuit_state(service, state, failures, opened_at) table.'),
        B('ضيف قاطع دائرة قدام API واحد واختبره بـ httpbin 503.', 'Put a circuit breaker in front of one API and test it with httpbin 503.'),
        B('اعمل قناة بديلة لما التليجرام يفشل (إيميل).', 'Add a fallback channel when Telegram fails (email).'),
        B('اعمل health check لـ 3 خدمات بتستخدمها.', 'Create health checks for 3 services you use.')
      ],
      words: [
        W('circuit breaker', 'آلية بتوقف الطلبات لخدمة بتفشل لفترة', 'a mechanism that stops calls to a failing service for a while', 'The circuit breaker opened after 5 failures.'),
        W('half-open', 'حالة تجربة طلب واحد بعد فترة الإيقاف', 'the state of trying one call after the pause', 'In half-open we send a single test call.'),
        W('graceful degradation', 'تقديم خدمة أبسط بدل ما كله يقع', 'offering a simpler service instead of failing completely', 'A template reply is graceful degradation.'),
        W('fallback channel', 'قناة بديلة لما الأساسية تفشل', 'a backup channel when the main one fails', 'Email is the fallback channel for WhatsApp.'),
        W('health check', 'طلب خفيف بيتأكد إن خدمة شغالة', 'a light request checking a service is up', 'Run a health check every 5 minutes.')
      ],
      read: [{ t: 'Martin Fowler: CircuitBreaker', url: 'https://martinfowler.com/bliki/CircuitBreaker.html', what: B('اقرا الفكرة والرسمة.', 'Read the idea and the diagram.') }, 'lib:Uptime Kuma'],
      challenge: B('ابني `svc: call service` بيجمع: timeout، وإعادة بـ backoff، وقاطع دائرة لكل خدمة، وقناة بديلة، وتسجيل في جدول الحالة — وخلّي workflowين يستخدموه.', 'Build `svc: call service` combining a timeout, backoff retries, a circuit breaker per service, a fallback channel and status logging — and have two workflows use it.'),
      quiz: [
        Q(B('الدائرة مفتوحة (open) يعني:', 'An open circuit means:'), [['مش بنبعت للخدمة لفترة', 'we do not call the service for a while'], ['الخدمة شغالة', 'the service is up'], ['بنبعت أكتر', 'we send more']], 0, B('نحمي الخدمة ونفسنا.', 'Protect the service and ourselves.')),
        Q(B('الـ AI واقع. التدهور المقبول:', 'The AI is down. Graceful degradation:'), [['رد جاهز مهذب ومتابعة بعدين', 'a polite ready reply and follow-up later'], ['متردش', 'do not reply'], ['رسالة خطأ تقنية', 'a technical error message']], 0, B('العميل يحس إنه اتسمع.', 'The customer feels heard.')),
        Q(B('health check كويس:', 'A good health check:'), [['طلب خفيف بمهلة قصيرة', 'a light call with a short timeout'], ['طلب تقيل كل ثانية', 'a heavy call every second'], ['يدوي', 'manual']], 0, B('خفيف ومنتظم.', 'Light and regular.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('نظام بيصمد قدام الأعطال الحقيقية.', 'A system that survives real failures.'),
      review: [
        B('أنواع الفشل الأربعة والمهلات والفشل المتسلسل.', 'The four failure families, timeouts and cascading failure.'),
        B('backoff أُسّي وjitter وRetry-After وحد للمحاولات.', 'Exponential backoff, jitter, Retry-After and a retry limit.'),
        B('مفاتيح idempotency وجدول processed وat-least-once.', 'Idempotency keys, a processed table and at-least-once.'),
        B('الرسايل السامة والـ DLQ وأداة الإعادة.', 'Poison messages, the DLQ and the replay tool.'),
        B('قاطع الدائرة والقناة البديلة وفحص الصحة.', 'Circuit breakers, fallback channels and health checks.')
      ],
      project: B('خلّي نظام الأسبوع اللي فات «مقاوم للأعطال»: مهلات لكل طلب، `svc: call with retry`، كل الأفعال idempotent، DLQ وفورم إعادة، قاطع دائرة وقناة بديلة، health checks وتقرير صحة يومي. واختبره بـ «يوم فوضى»: اقفل خدمة، ابعت رسايل سامة، وكرّر webhooks — ومحدش من العملاء المفروض يحس.', 'Make last week’s system «failure-proof»: timeouts on every request, `svc: call with retry`, every action idempotent, a DLQ and replay form, a circuit breaker and fallback channel, health checks and a daily health report. Test it with a «chaos day»: switch off a service, send poison messages and repeat webhooks — no customer should notice.'),
      test: [
        Q(B('خطأ 503:', 'A 503 error:'), [['مؤقت: أعد بـ backoff', 'temporary: retry with backoff'], ['دائم', 'permanent'], ['صامت', 'silent']], 0, B('الخدمة مشغولة.', 'The service is busy.')),
        Q(B('خطأ 400 بسبب بيانات غلط:', 'A 400 caused by bad data:'), [['متعدش؛ صلّح أو لإنسان', 'do not retry; fix it or send to a person'], ['أعد 10 مرات', 'retry 10 times'], ['تجاهل', 'ignore']], 0, B('مش هيتصلّح لوحده.', 'It will not fix itself.')),
        Q(B('ليه timeout قصير؟', 'Why a short timeout?'), [['عشان خدمة بطيئة متوقعش الكل', 'so a slow service does not bring everything down'], ['عشان أسرع دايمًا', 'always faster'], ['مش مهم', 'it does not matter']], 0, B('ضد الفشل المتسلسل.', 'Against cascading failure.')),
        Q(B('jitter بيضيف:', 'Jitter adds:'), [['وقت عشوائي صغير', 'a small random time'], ['محاولات أكتر', 'more tries'], ['header جديد', 'a new header']], 0, B('يوزّع الإعادات.', 'It spreads retries.')),
        Q(B('Retry-After: 20 معناها:', 'Retry-After: 20 means:'), [['استنى 20 ثانية', 'wait 20 seconds'], ['20 محاولة', '20 tries'], ['20 طلب في الدقيقة', '20 requests a minute']], 0, B('ثواني.', 'Seconds.')),
        Q(B('مفتاح idempotency لاسترجاع طلب 1042:', 'An idempotency key for refunding order 1042:'), [['refund-1042', 'refund-1042'], ['Math.random()', 'Math.random()'], ['$now', '$now']], 0, B('ثابت.', 'Stable.')),
        Q(B('الويبهوك وصل مرتين. الضمان العادي اسمه:', 'The webhook arrived twice. The usual guarantee is:'), [['at-least-once', 'at-least-once'], ['exactly-once', 'exactly-once'], ['at-most-once دايمًا', 'always at-most-once']], 0, B('مرة أو أكتر.', 'Once or more.')),
        Q(B('الرسالة السامة بتتعامل معاها بـ:', 'A poison message is handled by:'), [['عزلها في DLQ بعد عدد محاولات', 'quarantining it in a DLQ after some tries'], ['إعادتها للأبد', 'retrying forever'], ['مسح الطابور', 'clearing the queue']], 0, B('والباقي يكمّل.', 'And the rest continue.')),
        Q(B('الـ DLQ لازم فيه:', 'A DLQ must hold:'), [['الـ payload والخطأ والوقت', 'the payload, error and time'], ['الباسوردات', 'passwords'], ['ولا حاجة', 'nothing']], 0, B('للتصليح والإعادة.', 'For fixing and replay.')),
        Q(B('half-open معناها:', 'Half-open means:'), [['تجربة طلب واحد', 'trying one call'], ['الدائرة مقفولة', 'the circuit is closed'], ['كل الطلبات مسموحة', 'all calls allowed']], 0, B('قبل ما ترجع طبيعي.', 'Before returning to normal.')),
        Q(B('واتساب واقع. القناة البديلة:', 'WhatsApp is down. The fallback channel:'), [['إيميل أو SMS', 'email or SMS'], ['مفيش', 'none'], ['نفس واتساب بإصرار', 'WhatsApp again, harder']], 0, B('العميل يوصله الخبر.', 'The customer still gets the news.')),
        Q(B('health check كل:', 'A health check runs every:'), [['بضع دقايق بطلب خفيف', 'few minutes with a light call'], ['ثانية بطلب تقيل', 'second with a heavy call'], ['شهر', 'month']], 0, B('منتظم وخفيف.', 'Regular and light.'))
      ] }
  ]
};
