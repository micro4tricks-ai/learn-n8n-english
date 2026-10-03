// n8n week 25 — Design patterns and workflow architecture.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('أنماط التصميم ومعمارية الـ workflows', 'Design patterns and workflow architecture'),
  goal: B('تبطّل تبني workflow واحد عملاق، وتصمّم أنظمة من أجزاء صغيرة واضحة: أنماط جاهزة، وsub-workflows كخدمات، وإعدادات في مكان واحد، وطوابير بين الأجزاء، وتوثيق للمعمارية.',
          'Stop building one giant workflow and design systems from small, clear parts: ready patterns, sub-workflows as services, settings in one place, queues between parts, and architecture documentation.'),
  days: [
    { title: B('الأنماط الأساسية', 'The core patterns'),
      goal: B('تعرف 5 أنماط بتتكرر في كل نظام أتمتة وتختار المناسب.', 'Know 5 patterns that repeat in every automation system and pick the right one.'),
      learn: [
        L(B('الخط المستقيم (pipeline)', 'The pipeline'),
          B('تريجر ← تحقق ← معالجة ← إخراج. أبسط نمط وأوضحه. كل خطوة بتعمل حاجة واحدة واسمها بيقول هي إيه. أغلب الـ workflows لازم تبدأ كده، ومتتعقدش إلا لو فيه سبب.', 'Trigger → validate → process → output. The simplest and clearest pattern. Each step does one thing and its name says what. Most workflows should start like this and only get complex for a reason.'),
          'Webhook → Validate input → Enrich customer → Save to DB → Notify'),
        L(B('الموزّع (router)', 'The router'),
          B('مدخل واحد بيوصل أنواع مختلفة (طلب، شكوى، استفسار)، وSwitch بيوزّعها كل نوع على sub-workflow مخصص. الموزّع نفسه يفضل صغير: بيقرر بس، مش بيعالج.', 'One entry receives different kinds of input (order, complaint, question), and a Switch routes each kind to a dedicated sub-workflow. The router itself stays small: it decides, it does not process.'),
          'Inbox trigger → Classify → Switch\n  order     → [Handle order]\n  complaint → [Handle complaint]\n  other     → [Human review]'),
        L(B('المنسّق والعمّال (orchestrator/workers)', 'Orchestrator and workers'),
          B('workflow «منسّق» بيقسم الشغل الكبير لقطع ويبعت كل قطعة لـ sub-workflow «عامل»، ويجمع النتايج. مفيد لما الشغل طويل أو بيتكرر على عناصر كتير، وبيخلّي كل عامل سهل يتختبر لوحده.', 'An «orchestrator» workflow splits big work into pieces, sends each to a «worker» sub-workflow, and collects the results. Useful when the work is long or repeats over many items, and it keeps each worker easy to test alone.'),
          'Orchestrator: get 500 invoices → split in batches of 50\n  → Execute Workflow [Process batch] ×10 → merge results → report')
      ],
      practice: [
        B('ارسم 3 workflows عندك وحدد كل واحد ماشي بأنهي نمط.', 'Draw 3 of your workflows and say which pattern each follows.'),
        B('حوّل workflow فيه Switch كبير لموزّع صغير + sub-workflows.', 'Turn a workflow with a big Switch into a small router + sub-workflows.'),
        B('اكتب لكل نمط: إمتى تستخدمه وإمتى لأ (سطرين).', 'Write for each pattern: when to use it and when not to (two lines).'),
        B('صمّم على الورق نظام فواتير بنمط المنسّق والعمّال.', 'Design on paper an invoice system using orchestrator/workers.')
      ],
      words: [
        W('pipeline', 'خطوات ورا بعض كل واحدة بتسلّم اللي بعدها', 'steps in a row, each handing over to the next', 'A pipeline: trigger, validate, process, output.'),
        W('router', 'جزء بيوزّع المدخلات على الأجزاء المناسبة', 'a part that sends inputs to the right handlers', 'The router only decides; it never processes.'),
        W('orchestrator', 'workflow بينظّم شغل workflows تانية', 'a workflow that coordinates other workflows', 'The orchestrator collects the workers’ results.'),
        W('worker workflow', 'workflow بيعمل قطعة واحدة من الشغل', 'a workflow that does one piece of the work', 'Each worker workflow processes one batch.'),
        W('design pattern', 'حل متكرر لمشكلة بتتكرر', 'a reusable solution to a recurring problem', 'The router is a common design pattern.')
      ],
      read: ['lib:n8n Docs: Sub-workflows', { lib: 'n8n Workflow Templates', what: B('افتح 3 قوالب كبيرة وحدد النمط في كل واحد.', 'Open 3 big templates and identify the pattern in each.') }],
      challenge: B('خُد أكبر workflow عندك وارسم له نسخة جديدة بنمطين على الأقل (موزّع + عمّال)، من غير ما تغيّر نتيجته.', 'Take your biggest workflow and draw a new version using at least two patterns (router + workers), without changing its result.'),
      quiz: [
        Q(B('الموزّع (router) المفروض:', 'A router should:'), [['يقرر بس ويوزّع', 'only decide and route'], ['يعالج كل حاجة', 'process everything'], ['يخزّن البيانات', 'store the data']], 0, B('المعالجة في الأجزاء المخصصة.', 'Processing lives in the dedicated parts.')),
        Q(B('شغل كبير على 500 عنصر يناسبه:', 'Big work on 500 items suits:'), [['منسّق وعمّال', 'orchestrator and workers'], ['نود Code واحد ضخم', 'one huge Code node'], ['تشغيل يدوي', 'manual runs']], 0, B('قطع صغيرة سهلة الاختبار.', 'Small pieces that are easy to test.')),
        Q(B('أبسط نمط تبدأ بيه:', 'The simplest pattern to start with:'), [['الخط المستقيم', 'the pipeline'], ['المنسّق', 'the orchestrator'], ['الطابور', 'the queue']], 0, B('متعقدش إلا لسبب.', 'Only add complexity for a reason.'))
      ] },

    { title: B('الـ sub-workflows كخدمات', 'Sub-workflows as services'),
      goal: B('تبني مكتبة sub-workflows يتنادوا من أي مكان بعقد واضح.', 'Build a library of sub-workflows callable from anywhere with a clear contract.'),
      learn: [
        L(B('خدمة صغيرة = sub-workflow', 'A small service = a sub-workflow'),
          B('بدل ما كل workflow يكرر «ابعت رسالة تليجرام» أو «دوّر على العميل»، اعمل sub-workflow واحد لكل خدمة: `svc: notify`، `svc: find customer`، `svc: format phone`. التصليح بيبقى في مكان واحد.', 'Instead of every workflow repeating «send a Telegram message» or «find the customer», build one sub-workflow per service: `svc: notify`, `svc: find customer`, `svc: format phone`. Fixes then happen in one place.'),
          'svc: notify (channel, text, priority)\nsvc: find customer (phone | email) → { found, customer }\nsvc: format phone (raw) → { ok, phone_e164 }'),
        L(B('المدخلات المحددة', 'Defined inputs'),
          B('في **When Executed by Another Workflow** حدّد المدخلات (الاسم والنوع) بدل «accept all data». كده اللي بينادي بيشوف الخانات قدامه، والأخطاء بتظهر بدري. ورجّع دايمًا نفس الشكل: `{ ok, data, error }`.', 'In **When Executed by Another Workflow**, define the inputs (name and type) instead of «accept all data». Callers then see the fields in front of them, and mistakes show early. Always return the same shape: `{ ok, data, error }`.'),
          'Input data mode: Define using fields below\n  phone: string\n  country: string (default "EG")\nReturn: { ok: true, data: {...} } | { ok: false, error: "..." }'),
        L(B('الإصدارات من غير ما تكسر', 'Versions without breaking'),
          B('لو محتاج تغيّر عقد خدمة بشكل يكسر، متغيّرش القديمة: اعمل `svc: notify v2`، وانقل اللي بينادوا واحد واحد، وبعدين ارمي القديمة. واكتب في وصف كل خدمة مين بيستخدمها.', 'If a service’s contract must change in a breaking way, do not edit the old one: create `svc: notify v2`, move the callers one by one, then retire the old one. Write in each service’s description who uses it.'),
          'svc: notify      (used by: Orders, Bookings)  → deprecated\nsvc: notify v2   (adds attachments)           → new callers')
      ],
      practice: [
        B('طلّع 3 حاجات متكررة عندك لـ 3 sub-workflows خدمات.', 'Extract 3 repeated things of yours into 3 service sub-workflows.'),
        B('حدّد المدخلات بالاسم والنوع في كل واحد.', 'Define the inputs by name and type in each.'),
        B('خلّي كل خدمة ترجّع `{ ok, data, error }`.', 'Make each service return `{ ok, data, error }`.'),
        B('اعمل tag اسمه `service` وصفحة توثيق قصيرة بقايمة الخدمات.', 'Create a `service` tag and a short docs page listing the services.')
      ],
      words: [
        W('service', 'جزء صغير بيقدّم وظيفة واحدة لباقي النظام', 'a small part offering one function to the rest of the system', 'svc: notify is a service.'),
        W('callee', 'الـ workflow اللي بيتنادي', 'the workflow being called', 'The callee returns { ok, data }.'),
        W('deprecated', 'لسه شغال بس هيتشال، متستخدموش في الجديد', 'still working but being retired; do not use it in new work', 'notify v1 is deprecated.'),
        W('response shape', 'الشكل الثابت للرد', 'the fixed form of a reply', 'Every service has the same response shape.'),
        W('reuse', 'تستخدم نفس الجزء في أكتر من مكان', 'to use the same part in more than one place', 'Reuse the phone formatter everywhere.')
      ],
      read: ['lib:n8n Docs: Execute Workflow', { lib: 'n8n Docs: Sub-workflows', what: B('اقرا جزء تحديد المدخلات (input data mode).', 'Read the part on defining inputs (input data mode).') }],
      challenge: B('ابني 3 خدمات بمدخلات محددة وشكل رد ثابت، وخلّي workflowين مختلفين يستخدموهم، وصلّح غلطة في خدمة واحدة واتأكد إن الاتنين استفادوا.', 'Build 3 services with defined inputs and a fixed response shape, use them from two different workflows, fix a bug in one service and check both benefit.'),
      quiz: [
        Q(B('ليه تحدد المدخلات بدل accept all data؟', 'Why define inputs instead of accept all data?'), [['الأخطاء تظهر بدري واللي بينادي يشوف الخانات', 'mistakes show early and callers see the fields'], ['أسرع في التشغيل', 'it runs faster'], ['مفيش فرق', 'no difference']], 0, B('عقد واضح.', 'A clear contract.')),
        Q(B('عايز تغيّر عقد خدمة بشكل يكسر:', 'You must change a service contract in a breaking way:'), [['اعمل v2 وانقل الناس تدريجيًا', 'make v2 and move callers gradually'], ['عدّل القديمة على طول', 'edit the old one directly'], ['امسحها', 'delete it']], 0, B('من غير ما تكسر اللي شغال.', 'Without breaking what works.')),
        Q(B('شكل الرد الموحد مفيد عشان:', 'A shared response shape helps because:'), [['اللي بينادي يتعامل مع كل الخدمات بنفس الطريقة', 'callers handle every service the same way'], ['بيقلل الـ nodes', 'it reduces nodes'], ['بيخفي الأخطاء', 'it hides errors']], 0, B('كود واحد للتعامل.', 'One way of handling.'))
      ] },

    { title: B('الإعدادات والحالة', 'Configuration and state'),
      goal: B('تشيل القيم الثابتة من جوه النودز، وتحفظ الحالة بين التشغيلات صح.', 'Move fixed values out of nodes and keep state between runs correctly.'),
      learn: [
        L(B('الإعدادات في مكان واحد', 'Settings in one place'),
          B('أرقام وإيميلات ومعرّفات (sheet id، chat id، نسبة الضريبة) متتكتبش جوه 20 نود. حطها في workflow إعدادات (`svc: config`) أو جدول (Data Table أو شيت) أو متغيّرات بيئة `$env` للأسرار والبيئة. كده تغيّرها مرة واحدة.', 'Numbers, emails and IDs (sheet id, chat id, tax rate) should not be typed into 20 nodes. Put them in a settings workflow (`svc: config`), a table (a Data Table or a sheet), or environment variables `$env` for secrets and environment. Change them once.'),
          '✗ chat id typed in 12 Telegram nodes\n✓ svc: config → { alerts_chat: "...", vat: 0.14, sheet_id: "..." }\n✓ {{ $env.ALERTS_CHAT_ID }}'),
        L(B('الحالة بين التشغيلات', 'State between runs'),
          B('محتاج تفتكر «آخر ID اتعالج» أو «آخر وقت»؟ اختيارات: `$getWorkflowStaticData(\'global\')` (بسيط، بيتحفظ مع الـ workflow في التشغيلات الحقيقية بس)، أو جدول في قاعدة بيانات (أوضح وأأمن لو أكتر من workflow محتاجه). متعتمدش على الذاكرة بين تشغيلين.', 'Need to remember «the last processed ID» or «the last time»? Options: `$getWorkflowStaticData(\'global\')` (simple, saved with the workflow in production runs only), or a table in a database (clearer and safer if several workflows need it). Never rely on memory between two runs.'),
          "const state = $getWorkflowStaticData('global');\nconst since = state.lastId ?? 0;\n// … process items with id > since …\nstate.lastId = Math.max(since, ...$input.all().map(i => i.json.id));"),
        L(B('feature flags', 'Feature flags'),
          B('خانة في الإعدادات زي `send_whatsapp: false` بتخلّيك تقفل جزء من النظام من غير ما تعدّل الـ workflow: IF على الـ flag قبل الجزء ده. مفيد لتجربة حاجة جديدة على عميل واحد، أو قفل قناة فيها مشكلة بسرعة.', 'A settings field like `send_whatsapp: false` lets you switch off part of the system without editing the workflow: an IF on the flag before that part. Useful for trying something new with one client, or quickly shutting a channel that has a problem.'),
          'config: { send_whatsapp: false, new_pricing_for: ["clinic-7"] }\nIF {{ $("Config").first().json.send_whatsapp }} → WhatsApp')
      ],
      practice: [
        B('دوّر على كل القيم الثابتة المكررة في workflows عندك واطلعها لمكان واحد.', 'Find every repeated fixed value in your workflows and move it to one place.'),
        B('اعمل `svc: config` يرجّع الإعدادات، وناديه في أول 2 workflows.', 'Build `svc: config` returning the settings, and call it at the start of 2 workflows.'),
        B('احفظ آخر ID اتعالج بـ static data وجرّب تشغيلين.', 'Store the last processed ID in static data and test two runs.'),
        B('ضيف flag يقفل الإشعارات واختبره.', 'Add a flag that turns notifications off and test it.')
      ],
      words: [
        W('configuration', 'الإعدادات اللي بتتحكم في سلوك النظام', 'the settings that control how a system behaves', 'Keep configuration out of the nodes.'),
        W('static data', 'بيانات صغيرة بتتحفظ مع الـ workflow بين التشغيلات', 'small data saved with a workflow between runs', 'Store lastId in static data.'),
        W('feature flag', 'مفتاح تشغيل/إيقاف لجزء من النظام', 'an on/off switch for part of a system', 'Turn the WhatsApp feature flag off.'),
        W('hard-coded', 'قيمة مكتوبة جوه الكود أو النود مباشرة', 'a value typed directly into code or a node', 'The chat id is hard-coded in 12 nodes.'),
        W('single source of truth', 'مكان واحد هو المرجع لقيمة', 'one place that is the reference for a value', 'The config table is the single source of truth.')
      ],
      read: ['lib:n8n Docs: Environment variables', { lib: 'n8n Docs: Built-in methods and variables', what: B('دوّر على getWorkflowStaticData واقرا ملاحظاته.', 'Find getWorkflowStaticData and read its notes.') }],
      challenge: B('اجمع كل إعدادات مشروع كامل في مكان واحد، وضيف flag لكل قناة إرسال، وخلّي الحالة (آخر عنصر) في جدول بدل static data لو أكتر من workflow بيستخدمها.', 'Gather all settings of one project in one place, add a flag per sending channel, and keep the state (last item) in a table instead of static data if several workflows use it.'),
      quiz: [
        Q(B('static data بتتحفظ في:', 'Static data is saved in:'), [['التشغيلات الحقيقية (مش اليدوية)', 'production runs (not manual ones)'], ['كل تشغيل', 'every run'], ['ولا مرة', 'never']], 0, B('التجربة اليدوية مش بتحفظها.', 'Manual test runs do not save it.')),
        Q(B('أنسب مكان لـ API key:', 'The best place for an API key:'), [['credential أو $env', 'a credential or $env'], ['workflow الإعدادات العادي', 'the plain settings workflow'], ['اسم النود', 'the node name']], 0, B('الأسرار مش في الإعدادات العادية.', 'Secrets do not go in plain settings.')),
        Q(B('feature flag مفيد عشان:', 'A feature flag helps to:'), [['تقفل جزء من غير تعديل الـ workflow', 'switch part off without editing the workflow'], ['تسرّع النظام', 'speed up the system'], ['تحفظ البيانات', 'store data']], 0, B('تحكم سريع.', 'Quick control.'))
      ] },

    { title: B('الطوابير والفصل بين الأجزاء', 'Queues and decoupling'),
      goal: B('تستقبل بسرعة وتعالج على مهلك، من غير ما حاجة تضيع لو جزء وقع.', 'Receive quickly and process at your own pace, without losing anything if a part goes down.'),
      learn: [
        L(B('استقبل ← طابور ← عالج', 'Receive → queue → process'),
          B('الـ webhook بيستقبل ويحفظ الحدث في **طابور** (جدول Postgres فيه status، أو Redis، أو RabbitMQ) ويرد 200 على طول. workflow تاني بيسحب من الطابور ويعالج. لو المعالجة وقعت، الأحداث مستنية في الطابور مش ضايعة.', 'The webhook receives, saves the event in a **queue** (a Postgres table with a status, Redis, or RabbitMQ) and answers 200 at once. Another workflow pulls from the queue and processes. If processing goes down, events wait in the queue instead of being lost.'),
          'Webhook → INSERT INTO events (payload, status) VALUES (…, \'new\') → 200\nSchedule (1 min) → SELECT … WHERE status = \'new\' LIMIT 50 → process → status = \'done\''),
        L(B('طابور بسيط في جدول', 'A simple table-based queue'),
          B('جدول `events(id, payload jsonb, status, attempts, created_at)`. العامل بياخد دفعة `status = \'new\'`، يعلّمها `processing`، ويعالج، ويحطها `done` أو `failed` ويزوّد `attempts`. بعد 5 محاولات تروح dead letter. مع Postgres استخدم `FOR UPDATE SKIP LOCKED` لو فيه أكتر من عامل.', 'A table `events(id, payload jsonb, status, attempts, created_at)`. The worker takes a batch with `status = \'new\'`, marks it `processing`, handles it, then sets `done` or `failed` and increases `attempts`. After 5 attempts it goes to the dead letter. With Postgres use `FOR UPDATE SKIP LOCKED` if there are several workers.'),
          "UPDATE events SET status = 'processing'\nWHERE id IN (SELECT id FROM events WHERE status = 'new'\n             ORDER BY id LIMIT 50 FOR UPDATE SKIP LOCKED)\nRETURNING id, payload;"),
        L(B('إمتى تحتاج طابور', 'When you need a queue'),
          B('لما: الأحداث بتيجي على دفعات كبيرة فجأة، أو المعالجة بطيئة (AI، PDF)، أو الخدمة اللي بعدك ليها حد طلبات، أو مينفعش تضيع أي حدث. لو workflow صغير وبسيط، الطابور تعقيد زيادة.', 'When: events arrive in sudden big bursts, processing is slow (AI, PDF), the next service has a rate limit, or no event may ever be lost. For a small simple workflow, a queue is extra complexity.'),
          'burst of 2,000 form posts in 5 min → queue → steady 50/min to the CRM')
      ],
      practice: [
        B('اعمل جدول events في Postgres (أو Supabase) وwebhook بيحفظ فيه بس.', 'Create an events table in Postgres (or Supabase) and a webhook that only saves into it.'),
        B('اعمل عامل كل دقيقة بياخد 10 ويعالج ويعلّم الحالة.', 'Build a worker that runs every minute, takes 10, processes and marks the status.'),
        B('اقفل العامل وابعت 30 حدث، وبعدين شغّله وشوف إنه لحقهم كلهم.', 'Stop the worker and send 30 events, then start it and see it catch up on all of them.'),
        B('ضيف عمود attempts وdead letter بعد 3 فشل.', 'Add an attempts column and a dead letter after 3 failures.')
      ],
      words: [
        W('message queue', 'طابور بيحفظ الرسايل لحد ما تتعالج', 'a line that holds messages until they are processed', 'Put each webhook event in a message queue.'),
        W('decouple', 'تفصل جزئين عشان كل واحد يشتغل لوحده', 'to separate two parts so each works on its own', 'A queue decouples receiving from processing.'),
        W('burst', 'كمية كبيرة جاية فجأة في وقت قصير', 'a large amount arriving suddenly in a short time', 'The queue absorbs the burst.'),
        W('skip locked', 'تتخطى الصفوف اللي عامل تاني ماسكها', 'skipping rows another worker has locked', 'SKIP LOCKED lets two workers share the queue.'),
        W('backlog', 'الشغل المتراكم اللي لسه متعالجش', 'work piled up and not yet processed', 'The worker cleared the backlog in ten minutes.')
      ],
      read: ['lib:n8n Docs: Postgres node', { t: 'PostgreSQL: SELECT … FOR UPDATE SKIP LOCKED', url: 'https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE', what: B('اقرا فقرة SKIP LOCKED بس.', 'Read only the SKIP LOCKED paragraph.') }],
      challenge: B('ابني نظام استقبال طلبات بطابور في جدول: webhook سريع، عامل بدفعات، حالات (new/processing/done/failed)، محاولات، وdead letter، وجرّبه بـ 200 طلب مرة واحدة.', 'Build an order intake system with a table queue: a fast webhook, a batch worker, statuses (new/processing/done/failed), attempts and a dead letter, and test it with 200 orders at once.'),
      quiz: [
        Q(B('ميزة الطابور الأساسية:', 'The main benefit of a queue:'), [['الأحداث مش بتضيع لو المعالجة وقعت', 'events are not lost if processing goes down'], ['أقل كود', 'less code'], ['من غير قاعدة بيانات', 'no database']], 0, B('بيستنوا في الطابور.', 'They wait in the queue.')),
        Q(B('`FOR UPDATE SKIP LOCKED` مفيد لما:', '`FOR UPDATE SKIP LOCKED` helps when:'), [['أكتر من عامل بيسحب من نفس الطابور', 'several workers pull from the same queue'], ['عامل واحد بس', 'there is one worker'], ['مفيش جدول', 'there is no table']], 0, B('كل عامل ياخد صفوف مختلفة.', 'Each worker gets different rows.')),
        Q(B('workflow صغير بـ 5 أحداث في اليوم:', 'A small workflow with 5 events a day:'), [['غالبًا مش محتاج طابور', 'probably needs no queue'], ['لازم RabbitMQ', 'must use RabbitMQ'], ['لازم 3 عمّال', 'needs 3 workers']], 0, B('متعقدش من غير سبب.', 'No complexity without a reason.'))
      ] },

    { title: B('توثيق المعمارية', 'Documenting the architecture'),
      goal: B('أي حد (أو انت بعد 6 شهور) يفهم النظام في 10 دقايق.', 'Anyone (or you in 6 months) understands the system in 10 minutes.'),
      learn: [
        L(B('رسمة النظام', 'The system diagram'),
          B('مربعات للأجزاء (workflows، قواعد بيانات، خدمات خارجية) وأسهم لاتجاه البيانات، ومكتوب على كل سهم إيه اللي بيمشي. أداة نصية زي Mermaid بتتحفظ في Git جنب الـ workflows وبتتحدّث بسهولة.', 'Boxes for the parts (workflows, databases, outside services) and arrows for the direction of data, with what flows written on each arrow. A text tool like Mermaid lives in Git next to the workflows and is easy to update.'),
          'flowchart LR\n  Form -->|booking| Intake[Intake webhook]\n  Intake -->|event| Q[(events table)]\n  Q --> Worker[Booking worker]\n  Worker -->|reminder| Telegram'),
        L(B('صفحة لكل workflow', 'A page per workflow'),
          B('في الوصف أو README قصير: بيعمل إيه (سطر)، التريجر والجدولة، المدخلات والمخرجات، الخدمات اللي بيستخدمها، مين المسؤول، وإيه اللي يحصل لو فشل. ده بيوفّر ساعات وقت الأعطال.', 'In the description or a short README: what it does (one line), trigger and schedule, inputs and outputs, services it uses, who owns it, and what happens if it fails. This saves hours during incidents.'),
          'Booking worker · every minute\nIn: events (status new) · Out: Telegram reminders, bookings table\nUses: svc: notify, svc: format phone · Owner: Mahmoud\nOn failure: Error workflow → #alerts'),
        L(B('سجل القرارات (ADR)', 'Decision records (ADR)'),
          B('لما تاخد قرار مهم (طابور في Postgres بدل Redis مثلًا)، اكتب صفحة قصيرة: السياق، القرار، البدائل اللي رفضتها وليه، والنتايج. بعد سنة محدش هيسأل «ليه عملنا كده؟».', 'When you make an important decision (a Postgres queue instead of Redis, for example), write a short page: the context, the decision, the alternatives you rejected and why, and the consequences. A year later nobody asks «why did we do this?».'),
          'ADR-003: Queue in Postgres\nContext: 2k events/day, Postgres already running\nDecision: table queue with SKIP LOCKED\nRejected: Redis (one more service to run)\nConsequence: simple ops; revisit above 50k/day')
      ],
      practice: [
        B('ارسم نظام مشروعك بـ Mermaid واحفظه في Git.', 'Draw your project’s system in Mermaid and save it in Git.'),
        B('اكتب صفحة لكل workflow بالخانات دي.', 'Write a page for each workflow with these fields.'),
        B('اكتب ADR واحد لقرار أخدته في الأسبوع ده.', 'Write one ADR for a decision you made this week.'),
        B('ادّي التوثيق لحد يقراه وسجّل الأسئلة اللي سألها.', 'Give the docs to someone to read and note the questions they ask.')
      ],
      words: [
        W('architecture', 'الشكل العام للنظام وأجزاءه وعلاقاتها', 'the overall shape of a system, its parts and their relations', 'Draw the architecture before you build.'),
        W('diagram', 'رسمة بتوضح أجزاء وعلاقات', 'a drawing that shows parts and relations', 'Keep the diagram in Git.'),
        W('adr', 'سجل قرار معماري: السياق والقرار والبدائل', 'an architecture decision record: context, decision, alternatives', 'Write an ADR for the queue choice.'),
        W('owner', 'الشخص المسؤول عن جزء', 'the person responsible for a part', 'Every workflow needs an owner.'),
        W('mermaid', 'لغة نصية لرسم المخططات', 'a text language for drawing diagrams', 'GitHub renders Mermaid diagrams.')
      ],
      read: [{ t: 'Mermaid: Flowchart syntax', url: 'https://mermaid.js.org/syntax/flowchart.html', what: B('اقرا أول جزء واعمل رسمة بسيطة.', 'Read the first part and draw a simple chart.') }, { t: 'Architecture decision records (adr.github.io)', url: 'https://adr.github.io/', what: B('شوف قالب ADR بسيط.', 'Look at a simple ADR template.') }],
      challenge: B('وثّق مشروع كامل: رسمة Mermaid، وصفحة لكل workflow، و2 ADR، واتأكد إن حد غيرك فهمه من التوثيق بس.', 'Document a whole project: a Mermaid diagram, a page per workflow and 2 ADRs, and check someone else understood it from the docs alone.'),
      quiz: [
        Q(B('ADR بيكتب فيه:', 'An ADR records:'), [['السياق والقرار والبدائل', 'the context, decision and alternatives'], ['كل الكود', 'all the code'], ['كلمات السر', 'passwords']], 0, B('ليه عملنا كده.', 'Why we did it.')),
        Q(B('ليه Mermaid بدل صورة؟', 'Why Mermaid instead of an image?'), [['نص في Git سهل يتحدّث ويتراجع', 'text in Git, easy to update and review'], ['أجمل', 'prettier'], ['أسرع في التشغيل', 'runs faster']], 0, B('بيتعامل زي الكود.', 'It is treated like code.')),
        Q(B('أهم خانة وقت العطل:', 'The most useful field during an incident:'), [['إيه اللي يحصل لو فشل والمسؤول', 'what happens on failure and the owner'], ['لون الـ workflow', 'the workflow colour'], ['تاريخ الإنشاء', 'the creation date']], 0, B('توصل للحل بسرعة.', 'Reach the fix fast.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تجمع الأنماط والخدمات والإعدادات والطوابير والتوثيق في نظام واحد.', 'Combine patterns, services, settings, queues and documentation in one system.'),
      review: [
        B('الأنماط: خط مستقيم، موزّع، منسّق وعمّال — وإمتى كل واحد.', 'Patterns: pipeline, router, orchestrator and workers — and when to use each.'),
        B('الـ sub-workflows كخدمات بمدخلات محددة ورد ثابت وإصدارات.', 'Sub-workflows as services with defined inputs, a fixed response and versions.'),
        B('الإعدادات في مكان واحد، والحالة بين التشغيلات، والـ feature flags.', 'Settings in one place, state between runs, and feature flags.'),
        B('الطابور: استقبل بسرعة، عالج بدفعات، حالات ومحاولات وdead letter.', 'The queue: receive fast, process in batches, statuses, attempts and a dead letter.'),
        B('التوثيق: رسمة، صفحة لكل workflow، وADR.', 'Docs: a diagram, a page per workflow, and ADRs.')
      ],
      project: B('أعد بناء نظام حجوزات (أو طلبات) بالمعمارية الجديدة: webhook استقبال بطابور في جدول، عامل بدفعات، موزّع حسب نوع الطلب، 3 خدمات (notify، find customer، format phone)، إعدادات وflags في مكان واحد، وتوثيق كامل (Mermaid + صفحات + ADR). اختبره بـ 200 حدث.', 'Rebuild a booking (or order) system with the new architecture: an intake webhook with a table queue, a batch worker, a router by request type, 3 services (notify, find customer, format phone), settings and flags in one place, and full docs (Mermaid + pages + ADR). Test it with 200 events.'),
      test: [
        Q(B('نمط مناسب لمدخل واحد بأنواع كتير:', 'A pattern for one entry with many kinds of input:'), [['الموزّع', 'the router'], ['الخط المستقيم بس', 'only the pipeline'], ['مفيش', 'none']], 0, B('Switch بيوزّع.', 'A Switch routes.')),
        Q(B('المنسّق بيعمل:', 'The orchestrator:'), [['يقسم الشغل ويجمع النتايج', 'splits the work and collects results'], ['يعالج كل عنصر لوحده', 'processes every item itself'], ['يخزّن الإعدادات', 'stores settings']], 0, B('العمّال بيعالجوا.', 'Workers do the processing.')),
        Q(B('خدمة بترجّع شكل مختلف كل مرة:', 'A service returning a different shape each time:'), [['بتصعّب على اللي بينادي', 'makes life hard for callers'], ['عادي', 'is fine'], ['أسرع', 'is faster']], 0, B('رد ثابت.', 'Keep a fixed response.')),
        Q(B('تغيير يكسر في خدمة:', 'A breaking change to a service:'), [['اعمل v2', 'create v2'], ['عدّل وخلاص', 'just edit it'], ['امسح القديمة فورًا', 'delete the old one at once']], 0, B('نقل تدريجي.', 'Gradual move.')),
        Q(B('نسبة الضريبة مكتوبة في 15 نود. الحل:', 'The tax rate is typed in 15 nodes. Fix:'), [['مكان إعدادات واحد', 'one settings place'], ['تسيبها', 'leave it'], ['تكتبها في 16', 'type it in a 16th']], 0, B('مصدر واحد.', 'A single source.')),
        Q(B('static data مش بتتحفظ في:', 'Static data is not saved in:'), [['التشغيل اليدوي من المحرر', 'manual runs from the editor'], ['التشغيل بالتريجر', 'trigger runs'], ['الإنتاج', 'production']], 0, B('للتجربة استخدم جدول.', 'Use a table for tests.')),
        Q(B('الـ feature flag بيتعمل بـ:', 'A feature flag is built with:'), [['IF على قيمة في الإعدادات', 'an IF on a settings value'], ['تعديل الـ workflow كل مرة', 'editing the workflow each time'], ['نود Wait', 'a Wait node']], 0, B('تشغيل/إيقاف من الإعدادات.', 'On/off from settings.')),
        Q(B('الـ webhook في نظام بطابور:', 'The webhook in a queue system:'), [['يحفظ ويرد بسرعة', 'saves and replies quickly'], ['يعالج كل حاجة الأول', 'processes everything first'], ['ميردّش', 'never replies']], 0, B('المعالجة بعدين.', 'Processing comes later.')),
        Q(B('بعد 5 محاولات فاشلة الحدث يروح:', 'After 5 failed attempts the event goes to:'), [['dead letter', 'the dead letter'], ['يتمسح', 'deletion'], ['يتعاد للأبد', 'endless retries']], 0, B('ترجعله بعد الإصلاح.', 'Come back after the fix.')),
        Q(B('طابور مفيد لما:', 'A queue is useful when:'), [['فيه دفعات كبيرة فجأة أو معالجة بطيئة', 'there are sudden bursts or slow processing'], ['دايمًا', 'always'], ['أبدًا', 'never']], 0, B('حسب الحاجة.', 'When needed.')),
        Q(B('ADR بيجاوب على:', 'An ADR answers:'), [['ليه اخترنا ده', 'why we chose this'], ['الكود فين', 'where the code is'], ['مين أجازته إمتى', 'who is on leave when']], 0, B('القرار وسياقه.', 'The decision and its context.')),
        Q(B('صفحة الـ workflow لازم فيها:', 'A workflow page must include:'), [['المسؤول وإيه يحصل لو فشل', 'the owner and what happens on failure'], ['كل الـ JSON', 'all the JSON'], ['ولا حاجة', 'nothing']], 0, B('لوقت الأعطال.', 'For incidents.'))
      ] }
  ]
};
