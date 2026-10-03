// n8n week 39 — Performance: workers, Redis and scaling out.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الأداء: الـ workers وRedis والتوسّع', 'Performance: workers, Redis and scaling out'),
  goal: B('تشغّل n8n تحت حمل حقيقي (آلاف التشغيلات في الساعة): تفهم معمارية queue mode بالتفصيل، تضبط concurrency وRedis وPostgres، تتعامل مع الملفات الكبيرة، تقيس بـ load test، وتلاقي عنق الزجاجة قبل ما يلاقيك.',
          'Run n8n under real load (thousands of executions an hour): understand queue-mode architecture in detail, tune concurrency, Redis and Postgres, handle big files, measure with a load test, and find the bottleneck before it finds you.'),
  days: [
    { title: B('المعمارية من جوه', 'The architecture inside'),
      goal: B('تعرف كل جزء بيعمل إيه في queue mode.', 'Know what each part does in queue mode.'),
      learn: [
        L(B('الأجزاء', 'The parts'),
          B('في queue mode: **main process** (الواجهة، الـ API، الـ triggers المجدولة، توزيع المهام)، و**webhook processor** (نسخ بتستقبل الـ webhooks بس — تتكبّر لوحدها)، و**worker** (بينفّذ الـ executions)، و**bull queue** في Redis بيوصّل بينهم، وPostgres فيه الـ workflows ونتايج التشغيل. كل جزء بيتكبّر لوحده حسب الضغط عليه.', 'In queue mode: the **main process** (UI, API, scheduled triggers, dispatching), the **webhook processor** (instances that only receive webhooks — scaled on their own), the **worker** (runs executions), the **bull queue** in Redis linking them, and Postgres holding workflows and run results. Each part scales on its own according to its load.'),
          'internet ─▶ load balancer ─┬─▶ /webhook/*  → webhook processors ×N ─┐\n                            └─▶ UI, /rest, /api → main (1)          ─┤─▶ Redis (Bull queue) ─▶ workers ×M ─▶ APIs\n                                                                       └─────────── Postgres (workflows, executions) ◀─┘'),
        L(B('الإعدادات الأساسية', 'The key settings'),
          B('`EXECUTIONS_MODE=queue` على الكل، ونفس `N8N_ENCRYPTION_KEY` ونفس قاعدة Postgres ونفس Redis على كل النسخ (وإلا الـ credentials مش هتتفك). والـ webhook processors بـ `n8n webhook`، والـ workers بـ `n8n worker --concurrency=10`. و`OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true` عشان التجارب متتقلش الـ main.', '`EXECUTIONS_MODE=queue` everywhere, and the same `N8N_ENCRYPTION_KEY`, Postgres database and Redis on every instance (or credentials cannot be decrypted). Webhook processors run `n8n webhook`, workers run `n8n worker --concurrency=10`. And `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true` so test runs do not load the main.'),
          '# shared by all instances (.env)\nEXECUTIONS_MODE=queue\nDB_TYPE=postgresdb · DB_POSTGRESDB_HOST=pg · DB_POSTGRESDB_POOL_SIZE=10\nQUEUE_BULL_REDIS_HOST=redis\nN8N_ENCRYPTION_KEY=<same everywhere, from the secret store>\nOFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true\n# processes\nmain:     n8n start\nwebhook:  n8n webhook          (×2 behind the load balancer)\nworker:   n8n worker --concurrency=10   (×3)'),
        L(B('ليه الفصل؟', 'Why separate?'),
          B('من غير فصل: workflow تقيل (PDF، AI) بياكل CPU الـ main والواجهة تتقل والـ webhooks تتأخر وShopify يعيد الإرسال. مع الفصل: الـ webhook processors بترد في ملّي ثواني وبتحط في الطابور، والـ workers بتشتغل بسرعتها، والواجهة خفيفة. ولو worker وقع، المهمة ترجع للطابور.', 'Without separation: a heavy workflow (PDF, AI) eats the main’s CPU, the UI slows, webhooks lag and Shopify retries. With separation: webhook processors reply in milliseconds and enqueue, workers run at their own pace, and the UI stays light. If a worker dies, its job returns to the queue.'),
          'symptom                                   → part to scale\nwebhooks slow to answer (shop retries)     → webhook processors\nqueue keeps growing, runs start late       → workers (or worker concurrency)\nUI slow, schedules late                    → main (CPU/RAM), move manual runs to workers\nall slow, DB CPU 100%                      → Postgres (indexes, pruning, bigger instance)')
      ],
      practice: [
        B('ارسم معمارية n8n بتاعتك الحالية واللي محتاجها.', 'Draw your current n8n architecture and the one you need.'),
        B('شغّل queue mode بـ Docker Compose (main + webhook + 2 workers).', 'Run queue mode with Docker Compose (main + webhook + 2 workers).'),
        B('اتأكد إن مفتاح التشفير متطابق.', 'Make sure the encryption key matches everywhere.'),
        B('اعمل جدول «عرض ← جزء نكبّره».', 'Write a «symptom → part to scale» table.')
      ],
      words: [
        W('main process', 'نسخة n8n الرئيسية بالواجهة والـ triggers', 'the main n8n instance with the UI and triggers', 'Keep the main process light.'),
        W('webhook processor', 'نسخة n8n بتستقبل webhooks بس', 'an n8n instance that only receives webhooks', 'Add a second webhook processor.'),
        W('bull queue', 'طابور Redis اللي n8n بيستخدمه', 'the Redis queue n8n uses', 'Jobs wait in the Bull queue.'),
        W('worker concurrency', 'عدد التشغيلات المتوازية لكل worker', 'parallel executions per worker', 'Set worker concurrency to 10.'),
        W('offload', 'نقل شغل لجزء تاني', 'moving work to another part', 'Offload manual runs to workers.')
      ],
      read: [{ t: 'n8n Docs: Queue mode', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode', what: B('اقرا Webhook processors وConfigure workers.', 'Read Webhook processors and Configure workers.') }],
      challenge: B('اعمل Docker Compose لـ queue mode كامل: main، 2 webhook processors ورا Caddy، 3 workers، Redis، Postgres — وشغّل workflow تقيل واتأكد إن الواجهة فاضلة سريعة.', 'Write a Docker Compose for full queue mode: main, 2 webhook processors behind Caddy, 3 workers, Redis and Postgres — then run a heavy workflow and confirm the UI stays fast.'),
      quiz: [
        Q(B('الـ webhooks بتتأخر وShopify بيعيد:', 'Webhooks are slow and Shopify retries:'), [['زوّد webhook processors', 'add webhook processors'], ['زوّد workers بس', 'only add workers'], ['اقفل الواجهة', 'shut the UI']], 0, B('الاستقبال.', 'Receiving.')),
        Q(B('مفتاح تشفير مختلف على worker:', 'A different encryption key on a worker:'), [['الـ credentials متتفكش', 'credentials cannot be decrypted'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('متطابق.', 'Identical.')),
        Q(B('الطابور بيكبر والتشغيلات بتتأخر:', 'The queue grows and runs start late:'), [['workers أو concurrency', 'workers or concurrency'], ['webhook processors', 'webhook processors'], ['Redis أكبر بس', 'just a bigger Redis']], 0, B('التنفيذ.', 'Execution.'))
      ] },

    { title: B('ضبط Redis وPostgres', 'Tuning Redis and Postgres'),
      goal: B('القاعدة والطابور ميبقوش عنق الزجاجة.', 'The database and the queue never become the bottleneck.'),
      learn: [
        L(B('Postgres', 'Postgres'),
          B('Postgres بيشيل كل execution (المدخل والمخرج لكل node!) — أكبر مصدر بطء مع الوقت. **postgres tuning**: pruning (أسبوع 26)، و`EXECUTIONS_DATA_SAVE_ON_SUCCESS=none` للـ workflows الكتيرة الناجحة، و**connection limit** (كل نسخة × pool size < `max_connections`)، وفهارس من التحديثات، وVACUUM بيشتغل.', 'Postgres stores every execution (each node’s input and output!) — the biggest source of slowness over time. **postgres tuning**: pruning (week 26), `EXECUTIONS_DATA_SAVE_ON_SUCCESS=none` for high-volume successful workflows, a **connection limit** (instances × pool size < `max_connections`), indexes from updates, and VACUUM running.'),
          '-- how big is n8n’s data?\nSELECT relname, pg_size_pretty(pg_total_relation_size(relid)) FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC LIMIT 5;\n-- connections: 1 main + 2 webhook + 3 workers = 6 × DB_POSTGRESDB_POOL_SIZE 10 = 60  (< max_connections 100)\n-- per-workflow setting: Save successful production executions → «Do not save» for the 50k/day webhook'),
        L(B('Redis', 'Redis'),
          B('Redis هنا طابور مش كاش: لازم **persistence** (AOF) عشان المهام متضيعش لو اتعمل restart، و**redis memory** كفاية (المهام بتتمسح بعد ما تخلص، بس الطابور ممكن يكبر في زحمة)، و`maxmemory-policy noeviction` — عشان Redis ميمسحش مهام لما الذاكرة تتملي.', 'Redis is a queue here, not a cache: it needs **persistence** (AOF) so jobs survive a restart, enough **redis memory** (jobs are removed when done, but the queue can grow during a rush), and `maxmemory-policy noeviction` — so Redis never deletes jobs when memory fills.'),
          'redis:\n  image: redis:7-alpine\n  command: ["redis-server", "--appendonly", "yes", "--maxmemory", "1gb", "--maxmemory-policy", "noeviction"]\n  volumes: ["redis-data:/data"]\n# watch: redis-cli info memory | grep used_memory_human · redis-cli llen bull:jobs:wait'),
        L(B('أحجام البيانات', 'Data sizes'),
          B('الـ items الكبيرة بتتقل كل حاجة: كل item بيتخزن في القاعدة بين الـ nodes. متمررش ملف PDF كـ base64 في json (استخدم binary في S3)، ومتجيبش 50 ألف صف في item واحد (صفحات + Loop)، وشيل الحقول اللي مش محتاجها بدري بـ Edit Fields. أصغر بيانات = أسرع وأرخص.', 'Big items slow everything: each item is stored in the database between nodes. Do not pass a PDF as base64 in json (use binary in S3), do not load 50,000 rows into one item (pages + Loop), and drop unneeded fields early with Edit Fields. Smaller data = faster and cheaper.'),
          'N8N_DEFAULT_BINARY_DATA_MODE=s3   (or filesystem on one server)\nN8N_EXTERNAL_STORAGE_S3_HOST=s3.eu-central-1.amazonaws.com · …_BUCKET_NAME=n8n-binary\nrules of thumb\n- an item ≲ 1 MB of json · files as binary, never base64 strings in json\n- > 5,000 rows → Loop Over Items in batches of 500 or a sub-workflow per batch\n- Edit Fields → keep only the 6 fields you need right after the trigger')
      ],
      practice: [
        B('قيس حجم جداول n8n في Postgres.', 'Measure the size of n8n’s tables in Postgres.'),
        B('اوقف حفظ النجاح لـ workflow كتير التشغيل.', 'Stop saving successes for a high-volume workflow.'),
        B('اضبط Redis بـ AOF وnoeviction.', 'Configure Redis with AOF and noeviction.'),
        B('حوّل base64 في json لـ binary.', 'Turn base64 in json into binary.')
      ],
      words: [
        W('postgres tuning', 'ضبط Postgres للأداء', 'adjusting Postgres for performance', 'Postgres tuning halved the run time.'),
        W('connection limit', 'أقصى عدد اتصالات بالقاعدة', 'the maximum number of database connections', 'Stay under the connection limit.'),
        W('redis memory', 'ذاكرة Redis المستخدمة', 'the memory Redis uses', 'Alert when Redis memory passes 80%.'),
        W('persistence', 'حفظ البيانات على الـ disk', 'keeping data on disk', 'AOF persistence keeps queued jobs.'),
        W('s3 storage', 'تخزين الملفات في S3', 'storing files in S3', 'Binary files go to S3 storage.')
      ],
      read: [{ t: 'n8n Docs: Binary data', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/handle-binary-data', what: B('اقرا S3.', 'Read S3.') }, { t: 'Redis: Persistence', url: 'https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/', what: B('اقرا AOF.', 'Read AOF.') }],
      challenge: B('اعمل «فحص صحة البيانات» لـ n8n بتاعك: أحجام الجداول، أكبر 5 workflows في الحفظ، إعدادات الحفظ لكل workflow، الاتصالات مقابل الحد، إعدادات Redis — واكتب 5 تحسينات وطبّقها وقِس الفرق.', 'Run a «data health check» on your n8n: table sizes, the 5 workflows storing the most, save settings per workflow, connections vs the limit, Redis settings — then write 5 improvements, apply them and measure the difference.'),
      quiz: [
        Q(B('workflow بيتشغّل 50 ألف مرة يوميًا وناجح:', 'A workflow running 50,000 times a day, successfully:'), [['متحفظش النجاح', 'do not save successes'], ['احفظ كل حاجة', 'save everything'], ['اقفله', 'turn it off']], 0, B('القاعدة.', 'The database.')),
        Q(B('Redis كطابور n8n:', 'Redis as n8n’s queue:'), [['AOF + noeviction', 'AOF + noeviction'], ['كاش بيمسح القديم', 'a cache evicting old keys'], ['من غير disk', 'no disk']], 0, B('ميضيعش مهام.', 'No lost jobs.')),
        Q(B('PDF في json كـ base64:', 'A PDF in json as base64:'), [['حوّله binary في S3', 'move it to binary in S3'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('حجم.', 'Size.'))
      ] },

    { title: B('القياس: load test', 'Measuring: load tests'),
      goal: B('تعرف حدود نظامك بالأرقام.', 'Know your system’s limits in numbers.'),
      learn: [
        L(B('إيه اللي نقيسه', 'What to measure'),
          B('**throughput** (تشغيلات في الدقيقة)، و**p95** لزمن رد الـ webhook (95% من الطلبات أسرع من كده — المتوسط بيخبّي البطء)، ونسبة الأخطاء، وطول الطابور، وCPU/RAM لكل جزء، وCPU القاعدة. **load test** = تبعت حمل متزايد وتشوف أنهي رقم بيتكسر الأول.', '**throughput** (executions per minute), **p95** webhook reply time (95% of requests are faster — averages hide slowness), the error rate, queue length, CPU/RAM per part, and database CPU. A **load test** = send increasing load and see which number breaks first.'),
          'targets for the shop webhook\n- p95 reply < 300 ms at 50 req/s (the shop retries after 5 s)\n- error rate < 0.1%\n- queue drains within 2 min after a 10× spike\n- worker CPU < 70% at normal load'),
        L(B('k6', 'k6'),
          B('**k6** أداة load test بسكربت JS: بتحدد مراحل (ramp up، ثبات، ramp down) وthresholds بتفشل الاختبار لو p95 عدّى الحد. اختبر على **staging** بنفس حجم الإنتاج وبـ X-Test (أسبوع 38) عشان متبعتش إيميلات حقيقية — عمرك ما تعمل load test على الإنتاج من غير اتفاق.', '**k6** is a load-testing tool with JS scripts: you set stages (ramp up, hold, ramp down) and thresholds that fail the test if p95 exceeds the limit. Test on **staging** sized like production and with X-Test (week 38) so no real emails go out — never load-test production without agreement.'),
          'import http from "k6/http";\nimport { check } from "k6";\nexport const options = {\n  stages: [{ duration: "1m", target: 20 }, { duration: "3m", target: 50 }, { duration: "1m", target: 0 }],\n  thresholds: { http_req_duration: ["p(95)<300"], http_req_failed: ["rate<0.001"] },\n};\nexport default function () {\n  const res = http.post("https://staging-n8n.example.com/webhook/shop-paid", JSON.stringify({ id: `T-${__VU}-${__ITER}`, total: 250 }),\n    { headers: { "Content-Type": "application/json", "X-Test": "1" } });\n  check(res, { "status 200": r => r.status === 200 });\n}'),
        L(B('اقرا النتيجة', 'Read the result'),
          B('الأرقام بتحكي قصة: p95 عالي بس CPU الـ webhook واطي = مستني حاجة (DB؟ Redis؟)؛ الطابور بيكبر وworkers على 100% CPU = محتاج workers؛ أخطاء 502 = الـ load balancer أو مهلة. غيّر **حاجة واحدة** وأعد القياس — مش 5 مرة واحدة.', 'The numbers tell a story: high p95 but low webhook CPU = waiting on something (the DB? Redis?); a growing queue with workers at 100% CPU = more workers needed; 502 errors = the load balancer or a timeout. Change **one thing** and measure again — not five at once.'),
          'run 1: 50 req/s → p95 820 ms ✗ · webhook CPU 15% · DB CPU 95%   → the DB is the bottleneck\nfix:   EXECUTIONS_DATA_SAVE_ON_SUCCESS=none for this workflow + prune\nrun 2: 50 req/s → p95 140 ms ✓ · DB CPU 30% · queue drains in 40 s')
      ],
      practice: [
        B('ثبّت k6 واختبر webhook تجريبي.', 'Install k6 and test a demo webhook.'),
        B('حط thresholds لـ p95 والأخطاء.', 'Set thresholds for p95 and errors.'),
        B('راقب CPU كل جزء أثناء الاختبار.', 'Watch each part’s CPU during the test.'),
        B('غيّر حاجة واحدة وأعد القياس.', 'Change one thing and measure again.')
      ],
      words: [
        W('load test', 'اختبار بحمل متزايد', 'a test under increasing load', 'The load test found the limit at 70 req/s.'),
        W('k6', 'أداة load test بسكربت JS', 'a load-testing tool scripted in JS', 'k6 failed the p95 threshold.'),
        W('throughput', 'كمية الشغل في وقت', 'the amount of work per time', 'Throughput reached 3,000 runs a minute.'),
        W('p95', 'الزمن اللي 95% أسرع منه', 'the time 95% of requests beat', 'Report p95, not the average.'),
        W('ramp up', 'زيادة الحمل تدريجيًا', 'raising the load gradually', 'Ramp up to 50 users in a minute.')
      ],
      read: [{ t: 'Grafana k6 documentation', url: 'https://grafana.com/docs/k6/latest/', what: B('اقرا Get started وThresholds.', 'Read Get started and Thresholds.') }],
      challenge: B('اعمل load test على staging لأهم webhook: 3 مراحل لحد 50 طلب/ثانية، thresholds، مراقبة كل جزء — واكتب تقرير: الحد الحالي، عنق الزجاجة، والتحسين اللي جرّبته بالأرقام.', 'Load-test the most important webhook on staging: 3 stages up to 50 req/s, thresholds, monitoring of every part — and write a report: the current limit, the bottleneck, and the improvement you tried, in numbers.'),
      quiz: [
        Q(B('متوسط 100ms وp95 2s:', 'Average 100 ms and p95 2 s:'), [['5% من المستخدمين بيعانوا', '5% of users suffer'], ['كله تمام', 'all is fine'], ['مستحيل', 'impossible']], 0, B('المتوسط بيخبّي.', 'Averages hide.')),
        Q(B('load test مكانه:', 'Where to load-test:'), [['staging بحجم الإنتاج', 'staging sized like production'], ['الإنتاج فجأة', 'production, unannounced'], ['جهازك', 'your laptop']], 0, B('أمان.', 'Safety.')),
        Q(B('بعد ما لقيت عنق الزجاجة:', 'After finding the bottleneck:'), [['غيّر حاجة واحدة وأعد', 'change one thing and re-test'], ['غيّر كل حاجة', 'change everything'], ['متعملش حاجة', 'do nothing']], 0, B('سبب ونتيجة.', 'Cause and effect.'))
      ] },

    { title: B('workflows سريعة', 'Fast workflows'),
      goal: B('نفس النتيجة بربع الوقت والتكلفة.', 'The same result in a quarter of the time and cost.'),
      learn: [
        L(B('أقل طلبات', 'Fewer requests'),
          B('أغلب البطء = طلبات HTTP كتير. استخدم bulk endpoints (100 عميل في طلب)، وجمّع قبل ما تبعت، وكاش للبيانات الثابتة (قايمة المنتجات مرة في الساعة في static data أو Data Table)، ومتجيبش بيانات مش هتستخدمها. ده **bottleneck analysis**: إيه أبطأ node في الـ execution؟', 'Most slowness = many HTTP requests. Use bulk endpoints (100 customers per request), aggregate before sending, cache stable data (the product list hourly in static data or a Data Table), and do not fetch data you will not use. This is **bottleneck analysis**: which node is slowest in the execution?'),
          'before: 500 items → HTTP Request per item (500 calls, 6 min, 3 rate-limit errors)\nafter:  Loop in batches of 100 → 1 bulk call per batch (5 calls, 9 s)\n        product list from a Data Table refreshed hourly (0 calls per order)'),
        L(B('التوازي الصح', 'Parallelism done right'),
          B('n8n بيشغّل الـ items جوه node بالترتيب. للتوازي: قسّم على sub-workflows بتتنفذ في workers مختلفة («Execute Workflow» بـ wait off أو webhook داخلي)، أو batches بحجم مناسب. بس احترم حدود الـ API (5/ثانية؟) — التوازي من غير حدود = 429 وحظر.', 'n8n processes items inside a node in order. For parallelism: split into sub-workflows executed on different workers («Execute Workflow» without waiting, or an internal webhook), or suitably sized batches. But respect API limits (5/second?) — unlimited parallelism = 429s and bans.'),
          'orders (1,000) → Split into batches of 50\n→ Execute Workflow "Process batch" (Wait for completion: off) ×20 → queued → 3 workers × concurrency 10\n→ each batch: bulk API call (limit: 5 req/s per worker key) → write results to a Data Table\n→ a final check workflow (every 5 min) reports done/failed batches'),
        L(B('التكلفة', 'Cost'),
          B('كل execution بيكلّف: CPU، تخزين، وفي n8n Cloud عدد التشغيلات من الباقة. **capacity planning**: احسب التشغيلات المتوقعة × مدة كل واحد = workers محتاجين. ونماذج AI غالبًا أكبر تكلفة — كاش للإجابات المتكررة، ونموذج أصغر للمهام البسيطة (أسبوع 34).', 'Every execution costs: CPU, storage, and on n8n Cloud the plan’s execution count. **capacity planning**: expected executions × duration of each = workers needed. AI models are often the biggest cost — cache repeated answers and use a smaller model for simple tasks (week 34).'),
          'peak: 6,000 orders/hour = 100/min · each run ~3 s of worker time\n→ 100 × 3 s = 300 worker-seconds per minute = 5 busy slots\n→ 2 workers × concurrency 5 + 50% headroom → 3 workers × concurrency 5\nAI: 6,000 × $0.002 = $12/hour → cache common questions (−40%), small model for tagging (−60%)')
      ],
      practice: [
        B('لاقي أبطأ node في 3 executions.', 'Find the slowest node in 3 executions.'),
        B('بدّل طلب لكل item بـ bulk.', 'Replace a per-item request with a bulk call.'),
        B('قسّم شغل كبير على sub-workflows متوازية.', 'Split a big job into parallel sub-workflows.'),
        B('احسب workers محتاجين لذروة متوقعة.', 'Calculate the workers needed for an expected peak.')
      ],
      words: [
        W('bottleneck analysis', 'تحديد أبطأ جزء', 'finding the slowest part', 'Bottleneck analysis pointed at the CRM node.'),
        W('per-item request', 'طلب منفصل لكل item', 'a separate request for each item', 'Replace each per-item request with a bulk call.'),
        W('capacity planning', 'تقدير الموارد المطلوبة للحمل', 'estimating resources for the load', 'Capacity planning says 3 workers.'),
        W('headroom', 'هامش زيادة فوق المتوقع', 'spare margin above the expected', 'Keep 50% headroom for peaks.'),
        W('fan-out batch', 'تقسيم شغل كبير على دفعات متوازية', 'splitting a big job into parallel batches', 'Each fan-out batch has 50 orders.')
      ],
      read: ['lib:n8n Docs: Loop Over Items', 'lib:n8n Docs: Execute Workflow'],
      challenge: B('خد أبطأ workflow عندك: bottleneck analysis، bulk بدل الطلبات المفردة، كاش للبيانات الثابتة، توازي بـ sub-workflows بحدود — وقِس قبل/بعد (الوقت، الطلبات، التكلفة).', 'Take your slowest workflow: a bottleneck analysis, bulk instead of single requests, caching of stable data, parallel sub-workflows with limits — and measure before/after (time, requests, cost).'),
      quiz: [
        Q(B('500 طلب لـ 500 item:', '500 requests for 500 items:'), [['bulk endpoint بدفعات', 'a bulk endpoint in batches'], ['تمام', 'fine'], ['زوّد RAM', 'add RAM']], 0, B('أقل طلبات.', 'Fewer requests.')),
        Q(B('توازي من غير حدود على API:', 'Unlimited parallelism against an API:'), [['429 وحظر', '429s and bans'], ['أسرع دايمًا', 'always faster'], ['أرخص', 'cheaper']], 0, B('احترم الحدود.', 'Respect limits.')),
        Q(B('عدد الـ workers:', 'The number of workers:'), [['تشغيلات × مدة + هامش', 'runs × duration + headroom'], ['تخمين', 'a guess'], ['دايمًا 1', 'always 1']], 0, B('capacity.', 'Capacity.'))
      ] },

    { title: B('التوسّع والمرونة', 'Scaling and resilience'),
      goal: B('n8n بيكبر ويصغر مع الضغط من غير ما يوقع.', 'n8n grows and shrinks with load without falling over.'),
      learn: [
        L(B('أفقي ولا رأسي؟', 'Horizontal or vertical?'),
          B('**vertical scaling** = سيرفر أكبر (أسهل، بس ليه سقف ونقطة فشل واحدة). horizontal = نسخ أكتر (workers وwebhook processors). n8n في queue mode بيتوسّع أفقيًا كويس — بس الـ main واحد (أو اتنين في HA بإصدار Enterprise)، وPostgres وRedis محتاجين خطة لوحدهم.', '**vertical scaling** = a bigger server (simpler, but with a ceiling and a single point of failure). Horizontal = more instances (workers and webhook processors). n8n in queue mode scales out well — but there is one main (or two in HA with Enterprise), and Postgres and Redis need their own plan.'),
          'small agency (≤ 20k runs/day): one VPS 4 vCPU/8 GB, queue mode in Compose, managed Postgres\ngrowing (≤ 300k/day): main + 2 webhook + 3–6 workers, managed Postgres + Redis\nlarge: Kubernetes, autoscaled workers on queue depth, HA main (Enterprise), read replicas for reporting'),
        L(B('توسّع آلي', 'Autoscaling'),
          B('زوّد workers لما **queue depth** يكبر، وقلّلهم لما يفضى — يدويًا بسكربت بسيط أو آليًا (Kubernetes KEDA على طول طابور Redis — أسبوع 44). والـ worker لازم يقفل بنظافة (SIGTERM ← يكمّل اللي في إيده) عشان التقليل ميقطعش تشغيلات.', 'Add workers when **queue depth** grows and remove them when it drains — by hand with a simple script or automatically (Kubernetes KEDA on Redis queue length — week 44). A worker must stop cleanly (SIGTERM → finish what it holds) so scaling down does not cut runs.'),
          'every minute:\n  waiting = LLEN bull:jobs:wait\n  if waiting > 200 and workers < 8 → docker compose up -d --scale worker=$((workers+1))\n  if waiting < 10 for 10 min and workers > 2 → scale down by 1 (worker gets SIGTERM, drains, exits)\nN8N_GRACEFUL_SHUTDOWN_TIMEOUT=60'),
        L(B('لما حاجة تقع', 'When something fails'),
          B('خطط للفشل: Redis وقع ← الـ webhooks بتفشل (Shopify هيعيد — كويس)؛ worker وقع ← المهمة ترجع؛ Postgres وقع ← كل حاجة واقفة (أهم جزء: managed بنسخ ونسخة احتياطية). اختبر ده: اقفل جزء في staging وشوف بيحصل إيه وبيرجع إزاي — قبل ما يحصل في الإنتاج الساعة 3 الفجر.', 'Plan for failure: Redis down → webhooks fail (Shopify will retry — good); a worker down → its job returns; Postgres down → everything stops (the most critical part: managed, replicated and backed up). Test it: kill a part in staging and see what happens and how it recovers — before it happens in production at 3 a.m.'),
          'chaos drill on staging (30 min, monthly)\n1. stop 1 of 3 workers mid-run   → jobs resume on others? queue drains?\n2. restart Redis                  → queued jobs survive (AOF)? webhooks recover?\n3. Postgres failover (managed)    → n8n reconnects? how long down?\n4. fill the disk to 95%           → do alerts fire before n8n breaks?')
      ],
      practice: [
        B('صنّف n8n بتاعك: صغير/متوسط/كبير وخطط الخطوة الجاية.', 'Classify your n8n: small/medium/large, and plan the next step.'),
        B('اكتب سكربت scale بسيط على طول الطابور.', 'Write a simple scale script on queue length.'),
        B('اضبط graceful shutdown للـ workers.', 'Configure graceful shutdown for workers.'),
        B('اعمل chaos drill واحد على staging.', 'Run one chaos drill on staging.')
      ],
      words: [
        W('vertical scaling', 'سيرفر أكبر', 'a bigger server', 'Vertical scaling hit its ceiling.'),
        W('autoscaling', 'زيادة وتقليل النسخ آليًا', 'adding and removing instances automatically', 'Autoscaling follows the queue length.'),
        W('queue depth', 'عدد المهام المستنية', 'how many jobs are waiting', 'Queue depth triggers a new worker.'),
        W('single point of failure', 'جزء لو وقع كل حاجة تقع', 'a part whose failure stops everything', 'One Postgres is a single point of failure.'),
        W('chaos drill', 'تجربة إيقاف أجزاء عمدًا', 'a deliberate test of killing parts', 'The chaos drill found a missing alert.')
      ],
      read: [{ t: 'n8n Docs: Scaling overview', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode', what: B('اقرا Multi-main setup.', 'Read Multi-main setup.') }],
      challenge: B('اكتب خطة توسّع لـ n8n عميل بيكبر 10 أضعاف في سنة: المراحل، متى تنتقل لكل مرحلة (بالأرقام)، سكربت scale، graceful shutdown، وchaos drill شهري بنتايجه.', 'Write a scaling plan for a client’s n8n growing 10× in a year: the stages, when to move to each (in numbers), a scale script, graceful shutdown, and a monthly chaos drill with results.'),
      quiz: [
        Q(B('أهم جزء يكون managed ومنسوخ:', 'The part most needing to be managed and replicated:'), [['Postgres', 'Postgres'], ['worker', 'a worker'], ['الواجهة', 'the UI']], 0, B('كل حاجة عليه.', 'Everything depends on it.')),
        Q(B('تقليل workers من غير قطع تشغيلات:', 'Removing workers without cutting runs:'), [['graceful shutdown', 'a graceful shutdown'], ['kill -9', 'kill -9'], ['restart الكل', 'restart everything']], 0, B('SIGTERM.', 'SIGTERM.')),
        Q(B('تختبر الفشل فين؟', 'Where to test failures?'), [['staging بانتظام', 'staging, regularly'], ['الإنتاج فجأة', 'production, suddenly'], ['متختبرش', 'never']], 0, B('chaos drill.', 'Chaos drill.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('n8n بيشيل حمل حقيقي بثقة.', 'n8n carrying real load with confidence.'),
      review: [
        B('main وwebhook processors وworkers وBull/Redis وPostgres.', 'Main, webhook processors, workers, Bull/Redis and Postgres.'),
        B('ضبط Postgres (pruning، الحفظ، الاتصالات) وRedis (AOF، noeviction).', 'Tuning Postgres (pruning, saving, connections) and Redis (AOF, noeviction).'),
        B('load tests بـ k6: throughput وp95 وthresholds وحاجة واحدة كل مرة.', 'Load tests with k6: throughput, p95, thresholds, one change at a time.'),
        B('workflows سريعة: bulk وكاش وتوازي بحدود وcapacity planning.', 'Fast workflows: bulk, caching, limited parallelism and capacity planning.'),
        B('التوسّع الأفقي والآلي وgraceful shutdown وchaos drills.', 'Horizontal and automatic scaling, graceful shutdown and chaos drills.')
      ],
      project: B('خد n8n (staging) لمستوى «جاهز للذروة»: queue mode كامل في Compose، Postgres وRedis مضبوطين، binary في S3 (أو MinIO)، load test بـ k6 بـ thresholds وتقرير، تحسين أبطأ workflow بالأرقام، سكربت scale على طول الطابور، chaos drill موثّق، وخطة capacity لـ 10× — في تقرير واحد للعميل.', 'Bring n8n (staging) to «peak-ready»: full queue mode in Compose, tuned Postgres and Redis, binary in S3 (or MinIO), a k6 load test with thresholds and a report, the slowest workflow improved in numbers, a scale script on queue length, a documented chaos drill and a 10× capacity plan — in one report for the client.'),
      test: [
        Q(B('مين بيستقبل الـ webhooks في queue mode:', 'Who receives webhooks in queue mode:'), [['webhook processors', 'webhook processors'], ['workers', 'workers'], ['Redis', 'Redis']], 0, B('استقبال سريع.', 'Fast intake.')),
        Q(B('مين بينفّذ الـ executions:', 'Who runs the executions:'), [['workers', 'workers'], ['main بس', 'only the main'], ['Postgres', 'Postgres']], 0, B('تنفيذ.', 'Execution.')),
        Q(B('لازم متطابق على كل النسخ:', 'Must match on every instance:'), [['N8N_ENCRYPTION_KEY', 'N8N_ENCRYPTION_KEY'], ['اسم الجهاز', 'the hostname'], ['الـ port', 'the port']], 0, B('credentials.', 'Credentials.')),
        Q(B('أكبر مصدر بطء مع الوقت:', 'The biggest source of slowness over time:'), [['بيانات الـ executions في Postgres', 'execution data in Postgres'], ['الواجهة', 'the UI'], ['الأيقونات', 'icons']], 0, B('pruning.', 'Pruning.')),
        Q(B('Redis لطابور n8n:', 'Redis for n8n’s queue:'), [['AOF وnoeviction', 'AOF and noeviction'], ['allkeys-lru', 'allkeys-lru'], ['من غير disk', 'no disk']], 0, B('مهام.', 'Jobs.')),
        Q(B('اتصالات القاعدة:', 'Database connections:'), [['النسخ × pool < max_connections', 'instances × pool < max_connections'], ['مفيش حد', 'no limit'], ['1 بس', 'only 1']], 0, B('حد.', 'A limit.')),
        Q(B('رقم الأداء الأهم:', 'The key performance number:'), [['p95', 'p95'], ['المتوسط', 'the average'], ['أسرع طلب', 'the fastest request']], 0, B('الذيل.', 'The tail.')),
        Q(B('load test على:', 'A load test runs on:'), [['staging بـ X-Test', 'staging with X-Test'], ['الإنتاج', 'production'], ['جهاز العميل', 'the client’s laptop']], 0, B('أمان.', 'Safety.')),
        Q(B('طلب لكل item:', 'A request per item:'), [['bulk بدفعات', 'bulk in batches'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('أقل طلبات.', 'Fewer requests.')),
        Q(B('الطابور بيكبر:', 'The queue keeps growing:'), [['workers أكتر (autoscale)', 'more workers (autoscale)'], ['Postgres أصغر', 'a smaller Postgres'], ['اقفل الـ webhooks', 'switch off webhooks']], 0, B('queue depth.', 'Queue depth.')),
        Q(B('سيرفر واحد لكل حاجة:', 'One server for everything:'), [['single point of failure', 'a single point of failure'], ['أأمن', 'safer'], ['أسرع دايمًا', 'always faster']], 0, B('خطر.', 'Risk.')),
        Q(B('chaos drill:', 'A chaos drill:'), [['إيقاف أجزاء عمدًا في staging', 'killing parts deliberately in staging'], ['حذف البيانات', 'deleting data'], ['اختبار CSS', 'a CSS test']], 0, B('استعداد.', 'Preparedness.'))
      ] }
  ]
};
