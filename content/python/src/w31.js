// Python week 31 — ETL pipelines and scheduling.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('خطوط ETL والجدولة', 'ETL pipelines and scheduling'),
  goal: B('تبني خطوط بيانات بتشتغل كل يوم لوحدها: استخراج بالتدريج، تحويل بدوال قابلة للاختبار، تحميل idempotent، جدولة مناسبة، ومراقبة بسجل تشغيل وتنبيهات وإعادة تشغيل لتواريخ قديمة.',
          'Build data pipelines that run every day by themselves: incremental extraction, transformations as testable functions, idempotent loading, the right scheduling, and monitoring with a run history, alerts and reruns for past dates.'),
  days: [
    { title: B('شكل خط البيانات', 'The shape of a pipeline'),
      goal: B('تصمّم خط ETL مقسوم لمراحل واضحة.', 'Design an ETL pipeline split into clear stages.'),
      learn: [
        L(B('ETL وELT', 'ETL and ELT'),
          B('**ETL**: استخرج ← حوّل ← حمّل (بتنضّف قبل التخزين). **ELT**: استخرج ← حمّل الخام ← حوّل جوه قاعدة البيانات بـ SQL (شائع مع DuckDB وPostgres). للمشاريع الصغيرة: احفظ الخام دايمًا، وحوّل بعدين — عشان تقدر تعيد التحويل.', '**ETL**: extract → transform → load (clean before storing). **ELT**: extract → load the raw data → transform inside the database with SQL (common with DuckDB and Postgres). For small projects: always keep the raw data and transform later — so you can redo the transformation.'),
          'extract  (API pages, files)  → raw/2026-10-03/orders.json\ntransform (clean, dedupe, types) → pure functions\nload     (upsert into Postgres) → orders table'),
        L(B('كل مرحلة دالة', 'Each stage a function'),
          B('خلّي كل مرحلة دالة لوحدها بمدخل ومخرج واضحين: `extract(day) -> list[dict]`، `transform(rows) -> list[Order]`، `load(orders) -> int`. كده تختبر كل واحدة لوحدها، وتعيد مرحلة من غير الباقي.', 'Make each stage its own function with clear input and output: `extract(day) -> list[dict]`, `transform(rows) -> list[Order]`, `load(orders) -> int`. You can then test each alone and rerun one stage without the others.'),
          'def extract(day):\n    return [{"id": "1", "total": "300", "city": " giza "}, {"id": "2", "total": "x", "city": "Cairo"}]\n\ndef transform(rows):\n    good, bad = [], []\n    for r in rows:\n        try:\n            good.append({"id": int(r["id"]), "total": float(r["total"]), "city": r["city"].strip().title()})\n        except ValueError:\n            bad.append(r)\n    return good, bad\n\ndef load(rows, table):\n    for r in rows:\n        table[r["id"]] = r   # upsert by id\n    return len(rows)\n\ntable = {}\ngood, bad = transform(extract("2026-10-03"))\nprint("loaded", load(good, table), "rejected", len(bad), table)', R),
        L(B('منطقة الخام', 'The raw zone'),
          B('احفظ اللي استخرجته زي ما هو في **staging area** (فولدر `raw/` بالتاريخ، أو جدول `raw_orders` بـ jsonb). لو التحويل طلع فيه bug، تصلّحه وتعيد التحويل من الخام من غير ما تطلب الـ API تاني.', 'Save what you extracted exactly as it was in a **staging area** (a dated `raw/` folder, or a `raw_orders` table with jsonb). If the transformation had a bug, fix it and rerun from the raw data without calling the API again.'),
          'raw/\n  2026-10-01/orders_p1.json\n  2026-10-01/orders_p2.json\n  2026-10-02/orders_p1.json', T)
      ],
      practice: [
        B('ارسم خط ETL لمصدر بيانات حقيقي عندك.', 'Draw an ETL pipeline for a real data source of yours.'),
        B('قسّمه لـ 3 دوال بمدخلات ومخرجات واضحة.', 'Split it into 3 functions with clear inputs and outputs.'),
        B('احفظ الخام في فولدر بالتاريخ.', 'Save the raw data in a dated folder.'),
        B('اكتب اختبار لـ transform بصفوف سليمة وبايظة.', 'Write a test for transform with good and bad rows.')
      ],
      words: [
        W('etl', 'استخراج ثم تحويل ثم تحميل', 'extract, then transform, then load', 'The nightly ETL fills the orders table.'),
        W('elt', 'استخراج ثم تحميل الخام ثم تحويل في القاعدة', 'extract, load raw, then transform in the database', 'With DuckDB we prefer ELT.'),
        W('staging area', 'مكان حفظ البيانات الخام قبل التحويل', 'where raw data is kept before transformation', 'Keep every API page in the staging area.'),
        W('data pipeline', 'سلسلة خطوات بتنقل وتجهّز البيانات', 'a chain of steps moving and preparing data', 'The data pipeline runs at 2 a.m.'),
        W('rejected rows', 'صفوف اترفضت في التحويل', 'rows refused during transformation', 'Save rejected rows for review.')
      ],
      read: [{ lib: 'Architecture Patterns with Python', what: B('اقرا الفكرة العامة لفصل الطبقات.', 'Read the general idea of separating layers.') }, 'lib:The Twelve-Factor App'],
      challenge: B('ابني خط ETL صغير لـ API عام (مثلًا JSONPlaceholder أو Open-Meteo): خام محفوظ بالتاريخ، transform نقية باختبارات، load بـ upsert في sqlite، وطباعة عدد المحمّل والمرفوض.', 'Build a small ETL pipeline for a public API (e.g. JSONPlaceholder or Open-Meteo): dated raw files, a pure, tested transform, an upsert load into sqlite, and printed counts of loaded and rejected rows.'),
      quiz: [
        Q(B('ليه نحفظ الخام؟', 'Why keep the raw data?'), [['نعيد التحويل من غير ما نطلب المصدر تاني', 'to redo the transform without calling the source again'], ['للزينة', 'for decoration'], ['مش لازم', 'no need']], 0, B('staging.', 'Staging.')),
        Q(B('ELT يعني التحويل:', 'In ELT the transformation happens:'), [['جوه قاعدة البيانات بعد التحميل', 'inside the database after loading'], ['قبل الاستخراج', 'before extraction'], ['مفيش تحويل', 'never']], 0, B('SQL.', 'In SQL.')),
        Q(B('كل مرحلة دالة لوحدها عشان:', 'Each stage as its own function so:'), [['تختبرها وتعيدها لوحدها', 'you can test and rerun it alone'], ['الكود أطول', 'the code is longer'], ['أبطأ', 'it is slower']], 0, B('عزل.', 'Isolation.'))
      ] },

    { title: B('الاستخراج بالتدريج', 'Incremental extraction'),
      goal: B('تجيب الجديد بس، من غير ما تفوّت ولا تكرر.', 'Fetch only what is new, without missing or repeating.'),
      learn: [
        L(B('كامل ولا تدريجي', 'Full or incremental'),
          B('**full refresh**: تجيب كل البيانات كل مرة (بسيط بس بطيء ومكلف). **incremental load**: تجيب اللي اتغير من آخر مرة بس، باستخدام `updated_since=آخر_وقت`. احفظ آخر وقت ناجح بعد التحميل مش قبله.', 'A **full refresh** fetches all the data every time (simple but slow and costly). An **incremental load** fetches only what changed since last time, using `updated_since=last_time`. Save the last successful time after loading, not before.'),
          'state = read_state()                     # {"last_success": "2026-10-02T02:00:00Z"}\nrows = api.get("/orders", params={"updated_since": state["last_success"]})\nload(transform(rows))\nwrite_state({"last_success": run_started_at})   # only after a successful load'),
        L(B('هامش أمان للتداخل', 'An overlap margin'),
          B('الساعات مش دايمًا متزامنة والأحداث ممكن توصل متأخرة. اسحب من `آخر_وقت − 10 دقايق` (تداخل بسيط)، والتحميل الـ idempotent (upsert) بيمنع التكرار. التداخل أحسن من إنك تفوّت صفوف.', 'Clocks are not always in sync and events can arrive late. Fetch from `last_time − 10 minutes` (a small overlap), and the idempotent load (upsert) prevents duplicates. Overlap is better than missing rows.'),
          'from datetime import datetime, timedelta, timezone\nlast = datetime(2026, 10, 2, 2, 0, tzinfo=timezone.utc)\nsince = last - timedelta(minutes=10)\nprint("fetch updated_since =", since.isoformat())', R),
        L(B('صفحات وحدود', 'Pages and limits'),
          B('الاستخراج من API: loop على الصفحات (cursor أو page)، احترم حد الطلبات (Retry-After والـ backoff من أسبوع 27)، واحفظ كل صفحة خام أول ما توصل — لو الخط وقع في الصفحة 40 تكمّل من هناك.', 'Extracting from an API: loop over pages (cursor or page), respect the rate limit (Retry-After and backoff from week 27), and save each raw page as soon as it arrives — if the pipeline fails at page 40, you continue from there.'),
          'def pages(client, since):\n    cursor = None\n    while True:\n        r = client.get("/orders", params={"updated_since": since, "cursor": cursor}, timeout=20)\n        r.raise_for_status()\n        body = r.json()\n        yield body["data"]\n        cursor = body.get("next_cursor")\n        if not cursor:\n            break', T)
      ],
      practice: [
        B('اعمل ملف state بآخر وقت ناجح.', 'Create a state file holding the last successful time.'),
        B('اسحب incremental بهامش 10 دقايق.', 'Pull incrementally with a 10-minute overlap.'),
        B('اكتب generator صفحات بـ cursor.', 'Write a page generator with a cursor.'),
        B('اوقع الخط في النص وكمّل من آخر صفحة محفوظة.', 'Crash the pipeline mid-way and resume from the last saved page.')
      ],
      words: [
        W('full refresh', 'تحميل كل البيانات من الأول كل مرة', 'reloading all the data from scratch each time', 'A full refresh takes 40 minutes.'),
        W('incremental load', 'تحميل الجديد بس من آخر مرة', 'loading only what is new since last time', 'The incremental load takes 30 seconds.'),
        W('last success', 'آخر وقت التحميل نجح فيه', 'the time of the last successful load', 'Update last success after loading.'),
        W('overlap', 'تداخل بسيط عشان متفوّتش حاجة', 'a small overlap so nothing is missed', 'A 10-minute overlap catches late events.'),
        W('resume', 'تكمّل من مكان ما وقفت', 'to continue from where you stopped', 'The pipeline can resume from page 40.')
      ],
      read: ['lib:Requests documentation', 'lib:HTTPX documentation'],
      challenge: B('حوّل خط الأسبوع لـ incremental: state بآخر نجاح، تداخل 10 دقايق، صفحات محفوظة خام، استكمال بعد وقوع، وupsert يمنع التكرار — واختبره بتشغيلتين ورا بعض.', 'Make this week’s pipeline incremental: state with the last success, a 10-minute overlap, saved raw pages, resuming after a crash, and an upsert preventing duplicates — test it with two runs in a row.'),
      quiz: [
        Q(B('آخر وقت نجاح يتحفظ:', 'The last success time is saved:'), [['بعد التحميل الناجح', 'after a successful load'], ['قبل الاستخراج', 'before extraction'], ['مش لازم', 'never']], 0, B('وإلا تفوّت صفوف.', 'Otherwise rows are missed.')),
        Q(B('التداخل بيسبب تكرار؟', 'Does the overlap cause duplicates?'), [['لأ لو التحميل upsert', 'not if the load is an upsert'], ['أيوه دايمًا', 'yes, always'], ['مش مهم', 'irrelevant']], 0, B('idempotent.', 'Idempotent.')),
        Q(B('full refresh عيبه:', 'A full refresh’s drawback:'), [['بطيء ومكلف', 'slow and costly'], ['معقد جدًا', 'very complex'], ['بيفوّت صفوف', 'it misses rows']], 0, B('كل مرة كله.', 'Everything each time.'))
      ] },

    { title: B('التحويل القابل للاختبار', 'Testable transformation'),
      goal: B('تكتب تحويلات نقية ومختبرة ومتتبعة.', 'Write pure, tested, traceable transformations.'),
      learn: [
        L(B('دوال نقية صغيرة', 'Small pure functions'),
          B('كل قاعدة تنضيف دالة صغيرة نقية: `clean_city`، `parse_total`، `normalize_phone`. والـ transform بيركّبهم. ده بيخلّي كل قاعدة ليها اختبار بأمثلة غريبة، وتعدّل قاعدة من غير ما تكسر الباقي.', 'Each cleaning rule is a small pure function: `clean_city`, `parse_total`, `normalize_phone`. The transform composes them. Each rule then gets a test with odd examples, and you can change one rule without breaking the rest.'),
          'def clean_city(s: str) -> str:\n    s = s.strip().title()\n    return {"Cai": "Cairo", "Gizah": "Giza"}.get(s, s)\n\ndef parse_total(s: str) -> float:\n    return round(float(s.replace(",", "").replace("EGP", "").strip()), 2)\n\nrows = [{"city": " gizah ", "total": "1,250.50 EGP"}, {"city": "cai", "total": "90"}]\nprint([{"city": clean_city(r["city"]), "total": parse_total(r["total"])} for r in rows])', R),
        L(B('اختبارات بجدول', 'Table-driven tests'),
          B('اختبر كل قاعدة بجدول أمثلة (`pytest.mark.parametrize`): المدخل والمتوقع، ومنها الحالات الغريبة اللي لقيتها في البيانات الحقيقية. كل bug في البيانات = سطر جديد في الجدول.', 'Test each rule with a table of examples (`pytest.mark.parametrize`): input and expected output, including the odd cases you found in real data. Every data bug = a new row in the table.'),
          '@pytest.mark.parametrize("raw, expected", [\n    (" gizah ", "Giza"), ("CAIRO", "Cairo"), ("cai", "Cairo"), ("Alex", "Alex"),\n])\ndef test_clean_city(raw, expected):\n    assert clean_city(raw) == expected', T),
        L(B('التتبّع (lineage)', 'Tracing (lineage)'),
          B('ضيف لكل صف محمّل: مصدره (`source_file`)، ووقت التشغيل (`run_id`)، وإصدار التحويل. لما رقم يطلع غلط في تقرير، تعرف جه منين بالظبط وتعيد الدفعة دي بس.', 'Add to each loaded row: its source (`source_file`), the run time (`run_id`) and the transform version. When a number is wrong in a report, you know exactly where it came from and can rerun just that batch.'),
          '{"id": 1042, "total": 300.0, "source_file": "raw/2026-10-03/orders_p2.json",\n "run_id": "2026-10-03T02:00Z", "transform_version": "1.4"}', T)
      ],
      practice: [
        B('قسّم transform لـ 4 دوال قواعد صغيرة.', 'Split transform into 4 small rule functions.'),
        B('اكتب parametrize لكل قاعدة بـ 5 أمثلة.', 'Write a parametrize test for each rule with 5 examples.'),
        B('ضيف source_file وrun_id للصفوف.', 'Add source_file and run_id to the rows.'),
        B('لاقي حالة غريبة في بيانات حقيقية وضيفها للاختبار.', 'Find an odd case in real data and add it to the tests.')
      ],
      words: [
        W('pure transform', 'تحويل نتيجته بتعتمد على مدخله بس', 'a transformation whose result depends only on its input', 'A pure transform is easy to test.'),
        W('cleaning rule', 'قاعدة تنضيف لقيمة معيّنة', 'a rule for cleaning a particular value', 'Each cleaning rule has its own tests.'),
        W('table-driven test', 'اختبار بيشتغل على جدول أمثلة', 'a test that runs over a table of examples', 'A table-driven test covers ten spellings.'),
        W('lineage', 'تتبّع مصدر البيانات ومسارها', 'tracing where data came from and its path', 'Lineage shows the source file of each row.'),
        W('run id', 'معرّف لكل تشغيل للخط', 'an identifier for each pipeline run', 'Rows carry the run id.')
      ],
      read: ['lib:pytest documentation', { lib: 'Architecture Patterns with Python', what: B('اقرا عن فصل منطق البيزنس.', 'Read about separating business logic.') }],
      challenge: B('أعد كتابة transform الخط بدوال نقية + 20 اختبار parametrize (منهم 5 من بيانات حقيقية غريبة) + lineage لكل صف، واتأكد إن الاختبارات بتشتغل في CI.', 'Rewrite the pipeline’s transform as pure functions + 20 parametrised tests (5 from odd real data) + lineage on every row, and make sure the tests run in CI.'),
      quiz: [
        Q(B('ميزة قواعد التنضيف كدوال صغيرة:', 'The benefit of cleaning rules as small functions:'), [['كل واحدة ليها اختبار', 'each has its own test'], ['أقصر ملف', 'a shorter file'], ['أسرع دايمًا', 'always faster']], 0, B('عزل.', 'Isolation.')),
        Q(B('bug في البيانات اتصلح:', 'A data bug was fixed:'), [['ضيف حالته لجدول الاختبار', 'add its case to the test table'], ['انساه', 'forget it'], ['امسح البيانات', 'delete the data']], 0, B('ميتكررش.', 'It will not return.')),
        Q(B('lineage بيقولك:', 'Lineage tells you:'), [['الصف جه منين', 'where a row came from'], ['حجم القاعدة', 'the database size'], ['اسم المبرمج', 'the developer’s name']], 0, B('تتبّع.', 'Tracing.'))
      ] },

    { title: B('التحميل والجدولة', 'Loading and scheduling'),
      goal: B('تحمّل بأمان وتشغّل الخط في ميعاده من غير ما تفتكر.', 'Load safely and run the pipeline on time without remembering.'),
      learn: [
        L(B('تحميل idempotent', 'An idempotent load'),
          B('**idempotent load**: تشغيل نفس اليوم مرتين = نفس النتيجة. يا upsert بالمفتاح (`ON CONFLICT DO UPDATE`)، يا «امسح بيانات اليوم ده وحمّل تاني» جوه transaction واحدة. كده إعادة التشغيل آمنة دايمًا.', 'An **idempotent load**: running the same day twice = the same result. Either an upsert by key (`ON CONFLICT DO UPDATE`), or «delete that day’s data and reload» inside one transaction. Reruns are then always safe.'),
          'import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE orders (id INTEGER PRIMARY KEY, total REAL)")\ndef load(rows):\n    with db:\n        db.executemany("INSERT INTO orders (id, total) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET total = excluded.total", rows)\nload([(1, 300), (2, 120)])\nload([(1, 300), (2, 125)])   # rerun with one corrected value\nprint(db.execute("SELECT * FROM orders").fetchall())', R),
        L(B('اختيار الجدولة', 'Choosing a scheduler'),
          B('اختيارات من البسيط للمعقد: cron أو Task Scheduler (سكربت على سيرفر)، **APScheduler** جوه برنامج بايثون شغال، GitHub Actions `schedule` (من غير سيرفر)، n8n Schedule ينادي السكربت (Execute Command أو HTTP)، وأدوات **orchestration** زي Prefect وDagster وAirflow لما الخطوط كتير ومترابطة.', 'Options from simple to complex: cron or Task Scheduler (a script on a server), **APScheduler** inside a running Python program, GitHub Actions `schedule` (no server), n8n Schedule calling the script (Execute Command or HTTP), and **orchestration** tools such as Prefect, Dagster and Airflow when pipelines are many and interdependent.'),
          '# crontab: every day at 02:00 Cairo time (server set to Africa/Cairo)\n0 2 * * * cd /srv/etl && .venv/bin/python -m etl.run >> logs/etl.log 2>&1\n\n# GitHub Actions\non:\n  schedule: [{ cron: "0 23 * * *" }]   # 02:00 Cairo = 23:00 UTC', T),
        L(B('اعتماديات بين المهام', 'Dependencies between tasks'),
          B('لما خط بيعتمد على خط تاني (التقرير بعد تحميل الطلبات والعملاء)، الترتيب بالوقت هش («التقرير الساعة 3 على أمل إن التحميل خلص»). الأحسن: الخط الأول ينادي التاني لما يخلص، أو أداة بتعرف **task dependency** (DAG).', 'When a pipeline depends on another (the report after loading orders and customers), ordering by time is fragile («the report at 3 hoping the load finished»). Better: the first pipeline triggers the next when done, or a tool that knows **task dependencies** (a DAG).'),
          'load_orders ─┐\n             ├─→ build_report → send_email\nload_customers┘\n(a DAG: build_report waits for both)', T)
      ],
      practice: [
        B('خلّي الـ load upsert وشغّله مرتين.', 'Make the load an upsert and run it twice.'),
        B('جدول الخط بـ cron أو Task Scheduler.', 'Schedule the pipeline with cron or Task Scheduler.'),
        B('جرّب GitHub Actions schedule لخط بسيط.', 'Try a GitHub Actions schedule for a simple pipeline.'),
        B('ارسم DAG لـ 4 مهام مترابطة.', 'Draw a DAG for 4 dependent tasks.')
      ],
      words: [
        W('idempotent load', 'تحميل تكراره مالوش أثر زيادة', 'a load whose repetition has no extra effect', 'An idempotent load makes reruns safe.'),
        W('apscheduler', 'مكتبة جدولة جوه برنامج بايثون', 'a scheduling library inside a Python program', 'APScheduler runs the job every hour.'),
        W('dag', 'رسم مهام موجّه من غير دوائر', 'a directed graph of tasks with no cycles', 'The DAG has four tasks.'),
        W('task dependency', 'مهمة لازم تستنى مهمة تانية', 'a task that must wait for another', 'The report has a task dependency on the load.'),
        W('prefect', 'أداة orchestration لخطوط بايثون', 'an orchestration tool for Python pipelines', 'Prefect retries failed tasks.')
      ],
      read: ['lib:crontab.guru', { lib: 'Windows Task Scheduler', what: B('اقرا إنشاء مهمة يومية.', 'Read how to create a daily task.') }],
      challenge: B('جدول الخط يوميًا (cron أو Task Scheduler أو GitHub Actions)، بتحميل idempotent، وخلّيه ينادي خطوة «تقرير» بعد ما يخلص بنجاح بس.', 'Schedule the pipeline daily (cron, Task Scheduler or GitHub Actions), with an idempotent load, and have it trigger a «report» step only after it succeeds.'),
      quiz: [
        Q(B('تشغيل نفس اليوم مرتين في idempotent load:', 'Running the same day twice with an idempotent load:'), [['نفس النتيجة', 'the same result'], ['صفوف مكررة', 'duplicate rows'], ['خطأ', 'an error']], 0, B('upsert.', 'Upsert.')),
        Q(B('02:00 القاهرة في cron بـ UTC:', '02:00 Cairo in a UTC cron:'), [['23:00 اليوم اللي قبله', '23:00 the day before'], ['02:00', '02:00'], ['05:00', '05:00']], 0, B('القاهرة +3 في الصيف.', 'Cairo is UTC+3 in summer.')),
        Q(B('تقرير بيعتمد على تحميلين:', 'A report depending on two loads:'), [['DAG أو تشغيل بعد النجاح', 'a DAG or triggering after success'], ['ميعاد ثابت وأمل', 'a fixed time and hope'], ['يدوي', 'manually']], 0, B('اعتماديات.', 'Dependencies.'))
      ] },

    { title: B('مراقبة الخطوط', 'Monitoring pipelines'),
      goal: B('تعرف كل يوم إن الخط اشتغل صح، وتعيد أي يوم بسهولة.', 'Know every day that the pipeline ran correctly, and rerun any day easily.'),
      learn: [
        L(B('سجل التشغيل', 'The run history'),
          B('جدول **run history**: run_id، التاريخ المعالج، البداية، النهاية، الحالة، **rows in** و**rows out** والمرفوض، والخطأ لو فيه. ده بيجاوب «الخط اشتغل امبارح؟ جاب كام؟» في ثانية.', 'A **run history** table: run_id, the date processed, start, end, status, **rows in**, **rows out** and rejected, and the error if any. It answers «did the pipeline run yesterday? how many rows?» in a second.'),
          'runs(run_id, for_date, started_at, finished_at, status, rows_in, rows_out, rows_rejected, error)\n2026-10-03T02:00Z · 2026-10-02 · success · in 4,812 · out 4,790 · rejected 22'),
        L(B('تنبيهات بالأرقام', 'Alerts by numbers'),
          B('مش بس «فشل»: نبّه لو **rows out** صفر، أو أقل من نص المتوسط، أو المرفوض فوق 5%، أو الخط مخلصش لحد الساعة 6. دي «أعطال صامتة» (أسبوع 27 في رحلة n8n) — الخط «نجح» بس البيانات ناقصة.', 'Not just «failed»: alert if **rows out** is zero, below half the average, rejected above 5%, or the pipeline has not finished by 6 a.m. These are «silent failures» (week 27 of the n8n journey) — the pipeline «succeeded» but data is missing.'),
          'avg = 4,700 rows/day\ntoday rows_out = 1,200 → < 50% of avg → alert "suspiciously low volume"\nrejected 9% → alert "rejection rate above 5%"', T),
        L(B('إعادة أيام قديمة', 'Rerunning past days'),
          B('**backfill date**: خلّي الخط ياخد التاريخ كمعامل (`python -m etl.run --date 2026-09-14`) بدل «النهارده» ثابت. وبما إن التحميل idempotent، تعيد أي يوم أو فترة (`--from --to`) لما تصلّح bug.', 'A **backfill date**: make the pipeline take the date as an argument (`python -m etl.run --date 2026-09-14`) instead of a hard-coded «today». Since the load is idempotent, you can rerun any day or range (`--from --to`) after fixing a bug.'),
          'import argparse\nfrom datetime import date, timedelta\np = argparse.ArgumentParser()\np.add_argument("--from", dest="start", type=date.fromisoformat)\np.add_argument("--to", dest="end", type=date.fromisoformat)\na = p.parse_args(["--from", "2026-09-28", "--to", "2026-10-01"])\nday = a.start\nwhile day <= a.end:\n    print("run pipeline for", day)\n    day += timedelta(days=1)', R)
      ],
      practice: [
        B('اعمل جدول runs وسجّل فيه كل تشغيل.', 'Create a runs table and record every run in it.'),
        B('اعمل 3 تنبيهات بالأرقام.', 'Create 3 number-based alerts.'),
        B('خلّي الخط ياخد --date و--from/--to.', 'Make the pipeline accept --date and --from/--to.'),
        B('اعمل backfill لأسبوع كامل.', 'Backfill a whole week.')
      ],
      words: [
        W('run history', 'سجل كل مرات تشغيل الخط', 'a record of every pipeline run', 'Check the run history each morning.'),
        W('rows in', 'عدد الصفوف الداخلة', 'the number of incoming rows', 'Rows in were 4,812.'),
        W('rows out', 'عدد الصفوف اللي اتحمّلت', 'the number of rows loaded', 'Rows out dropped to zero.'),
        W('backfill date', 'إعادة الخط لتاريخ قديم', 'rerunning the pipeline for a past date', 'Run a backfill date after the fix.'),
        W('volume alert', 'تنبيه لو كمية البيانات غريبة', 'an alert when the data volume looks odd', 'The volume alert fired at 6 a.m.')
      ],
      read: ['lib:logging HOWTO', { lib: 'The Twelve-Factor App', what: B('اقرا «Logs» و«Admin processes».', 'Read «Logs» and «Admin processes».') }],
      challenge: B('ضيف للخط: جدول runs كامل، 3 تنبيهات بالأرقام على تليجرام أو إيميل، أوامر --date و--from/--to، واعمل backfill لشهر وتأكد إن الأرقام متطابقة.', 'Add to the pipeline: a complete runs table, 3 number-based alerts via Telegram or email, --date and --from/--to options, and backfill a month, checking the numbers match.'),
      quiz: [
        Q(B('الخط نجح بس rows out = 0:', 'The pipeline succeeded but rows out = 0:'), [['عطل صامت؛ نبّه', 'a silent failure; alert'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('أرقام.', 'Numbers.')),
        Q(B('الخط ياخد التاريخ كمعامل عشان:', 'The pipeline takes the date as an argument so:'), [['تعيد أي يوم', 'you can rerun any day'], ['يبقى أسرع', 'it is faster'], ['مش لازم', 'no reason']], 0, B('backfill.', 'Backfills.')),
        Q(B('سجل التشغيل بيجاوب:', 'The run history answers:'), [['اشتغل؟ جاب كام؟ إمتى؟', 'did it run? how many? when?'], ['مين كتب الكود', 'who wrote the code'], ['السعر', 'the price']], 0, B('مراقبة.', 'Monitoring.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('خط بيانات يومي بيشتغل لوحده وبيقولك لو فيه مشكلة.', 'A daily data pipeline that runs by itself and tells you when something is wrong.'),
      review: [
        B('ETL وELT، المراحل كدوال، ومنطقة الخام.', 'ETL and ELT, stages as functions, and the raw zone.'),
        B('التحميل التدريجي، آخر نجاح، التداخل، والصفحات.', 'Incremental loads, the last success, overlap and pages.'),
        B('التحويل النقي، الاختبارات بجدول، وlineage.', 'Pure transformation, table-driven tests and lineage.'),
        B('التحميل idempotent والجدولة والاعتماديات.', 'Idempotent loading, scheduling and dependencies.'),
        B('سجل التشغيل، التنبيهات بالأرقام، والـ backfill.', 'The run history, number-based alerts and backfills.')
      ],
      project: B('ابني خط ETL يومي حقيقي (مثلًا طقس Open-Meteo لـ 5 مدن، أو طلبات API تجريبي): خام بالتاريخ، incremental بتداخل، transform نقي باختبارات، upsert في Postgres أو sqlite، جدولة، جدول runs، تنبيهات، وbackfill — مع README ورسمة DAG.', 'Build a real daily ETL pipeline (e.g. Open-Meteo weather for 5 cities, or a test API’s orders): dated raw data, incremental with overlap, a pure tested transform, upserts into Postgres or sqlite, scheduling, a runs table, alerts and backfills — with a README and a DAG diagram.'),
      test: [
        Q(B('ETL ترتيبه:', 'ETL’s order:'), [['extract، transform، load', 'extract, transform, load'], ['load، extract، transform', 'load, extract, transform'], ['transform، load', 'transform, load']], 0, B('اسمه.', 'Its name.')),
        Q(B('staging area فيها:', 'The staging area holds:'), [['البيانات الخام', 'the raw data'], ['التقارير', 'the reports'], ['الكود', 'the code']], 0, B('قبل التحويل.', 'Before transformation.')),
        Q(B('incremental load بيجيب:', 'An incremental load fetches:'), [['الجديد من آخر مرة', 'what is new since last time'], ['كل حاجة', 'everything'], ['ولا حاجة', 'nothing']], 0, B('updated_since.', 'updated_since.')),
        Q(B('هامش التداخل بيمنع:', 'The overlap margin prevents:'), [['فوات صفوف متأخرة', 'missing late rows'], ['التكرار', 'duplicates'], ['البطء', 'slowness']], 0, B('والتكرار بيمنعه upsert.', 'Upsert prevents duplicates.')),
        Q(B('transform نقي:', 'A pure transform:'), [['نتيجته من مدخله بس', 'depends only on its input'], ['بيكتب في القاعدة', 'writes to the database'], ['بينادي API', 'calls an API']], 0, B('سهل الاختبار.', 'Easy to test.')),
        Q(B('parametrize في pytest:', 'parametrize in pytest:'), [['اختبار بجدول أمثلة', 'a test over a table of examples'], ['اختبار سرعة', 'a speed test'], ['تثبيت', 'installing']], 0, B('حالات كتير.', 'Many cases.')),
        Q(B('lineage:', 'Lineage:'), [['مصدر كل صف', 'each row’s source'], ['اسم الجدول', 'the table name'], ['كلمة السر', 'the password']], 0, B('تتبّع.', 'Tracing.')),
        Q(B('إعادة يوم في idempotent load:', 'Rerunning a day with an idempotent load:'), [['آمنة', 'is safe'], ['بتكرر الصفوف', 'duplicates rows'], ['ممنوعة', 'is forbidden']], 0, B('نفس النتيجة.', 'Same result.')),
        Q(B('خطوط كتير مترابطة:', 'Many interdependent pipelines:'), [['أداة orchestration', 'an orchestration tool'], ['cron لكل واحد بمواعيد متخمّنة', 'cron for each with guessed times'], ['يدوي', 'by hand']], 0, B('DAG.', 'A DAG.')),
        Q(B('rows out أقل من نص المتوسط:', 'Rows out below half the average:'), [['تنبيه', 'an alert'], ['طبيعي', 'normal'], ['تجاهل', 'ignore']], 0, B('عطل صامت.', 'A silent failure.')),
        Q(B('--from/--to في الخط لـ:', '--from/--to in the pipeline is for:'), [['backfill فترة', 'backfilling a range'], ['الجدولة', 'scheduling'], ['التصحيح الإملائي', 'spell-checking']], 0, B('إعادة.', 'Reruns.')),
        Q(B('آخر وقت نجاح يتحفظ قبل التحميل:', 'Saving the last success time before loading:'), [['غلط؛ ممكن تفوّت بيانات', 'wrong; you may miss data'], ['صح', 'right'], ['مش مهم', 'irrelevant']], 0, B('بعده.', 'After it.'))
      ] }
  ]
};
