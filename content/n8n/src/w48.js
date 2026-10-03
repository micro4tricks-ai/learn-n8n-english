// n8n week 48 — The expert capstone project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('مشروع الخبير النهائي', 'The expert capstone project'),
  goal: B('تجمع الـ 12 شهر في مشروع واحد بمستوى خبير: نظام أتمتة حقيقي لعميل (أو منتج لنيتش) من الاكتشاف للتسليم والتشغيل والبيع — مبني ومختبر ومراقَب ومؤمَّن وموثّق — وتقدّمه كقصة نجاح، وتحط خطة السنة الجاية.',
          'Bring the 12 months together in one expert-level project: a real automation system for a client (or a product for a niche) from discovery to delivery, operations and sales — built, tested, monitored, secured and documented — presented as a success story, with a plan for the year ahead.'),
  days: [
    { title: B('الاختيار والتصميم', 'Choosing and designing'),
      goal: B('مشروع حقيقي بنطاق واضح ومعمارية متفق عليها.', 'A real project with a clear scope and an agreed architecture.'),
      learn: [
        L(B('اختيار المشروع', 'Choosing the project'),
          B('**capstone brief**: مشكلة حقيقية (عميل، شركة صاحب، أو منتج لنيتش بتعرفه) فيها: أكتر من نظام، بيانات شخصية، webhooks، AI بموافقة بشرية، وحجم يبرر queue mode. اكتب صفحة: المشكلة، المستخدمين، **success metric** بالأرقام، والقيود (ميزانية، قوانين، وقت).', 'A **capstone brief**: a real problem (a client, a friend’s company, or a product for a niche you know) involving: several systems, personal data, webhooks, AI with human approval, and enough volume to justify queue mode. Write one page: the problem, the users, a **success metric** in numbers, and constraints (budget, laws, time).'),
          'capstone brief — "WhatsApp orders for a 6-branch pharmacy chain"\nproblem: 15% of night orders lost · 4 h average reply · stock errors\nusers: customers (WhatsApp), pharmacists (approval), managers (dashboard)\nsuccess: 0 lost orders · reply < 10 min · 30 h/month saved · SLO 99% within 10 min\nconstraints: health data (week 42) · Egypt law 151/2020 · budget 60k EGP + 4k/month · live in 4 weeks'),
        L(B('المتطلبات', 'Requirements'),
          B('اكتب المتطلبات الوظيفية (بيعمل إيه) و**non-functional requirement** (الأداء، التوافر، الأمان، الخصوصية، التكلفة، الصيانة) — دي اللي بتفرق الخبير. كل متطلب قابل للاختبار: «الرد خلال 10 دقايق لـ 99%» مش «سريع».', 'Write the functional requirements (what it does) and each **non-functional requirement** (performance, availability, security, privacy, cost, maintainability) — these distinguish the expert. Every requirement must be testable: «reply within 10 minutes for 99%», not «fast».'),
          'functional: receive WhatsApp text/voice/photo · extract items · check stock (ERP) · pharmacist approves · confirm + payment link · branch notified\nnon-functional:\n- p95 webhook reply < 300 ms · SLO 99% confirmed within 10 min (week 40)\n- RTO 30 min · RPO 5 min (week 43) · zero lost messages (inbox + replay)\n- PII masked in logs · AI gets no identities · DPIA approved (week 42)\n- SSO/2FA, authenticated webhooks, secrets in a store (week 41)\n- run cost < 4,000 EGP/month at 3,000 orders (week 39)'),
        L(B('المعمارية', 'The architecture'),
          B('ارسم المعمارية واكتب **architecture decision** لكل قرار مهم (ADR): Compose ولا Kubernetes، أنهي نموذج AI وفين، Postgres مُدار، queue mode، node مخصص للـ ERP. وابدأ بـ **walking skeleton**: أنحف مسار كامل شغال من أوله لآخره (رسالة ← رد) قبل ما تكمّل التفاصيل.', 'Draw the architecture and write an **architecture decision** record for each important choice (ADR): Compose or Kubernetes, which AI model and where, managed Postgres, queue mode, a custom node for the ERP. And start with a **walking skeleton**: the thinnest complete path working end to end (message → reply) before filling in the details.'),
          'WhatsApp Cloud API ─▶ inbox service (HMAC, store, 200) ─▶ n8n webhooks ×2 ─▶ Redis ─▶ workers ×3\nworkers: transcribe voice · OCR prescription (in-region model) · extract items · ERP node (custom) · approval form\nPostgres (managed, PITR) · S3 (binary, 7-day lifecycle) · Grafana/Loki · Alertmanager → on-call\nADRs: 001 Compose on 2 VPS (not K8s) · 002 in-region model for images · 003 custom ERP node')
      ],
      practice: [
        B('اختار مشروعك واكتب الـ brief.', 'Choose your project and write the brief.'),
        B('اكتب 6 متطلبات غير وظيفية قابلة للاختبار.', 'Write 6 testable non-functional requirements.'),
        B('ارسم المعمارية واكتب 3 ADRs.', 'Draw the architecture and write 3 ADRs.'),
        B('ابني walking skeleton في يوم.', 'Build a walking skeleton in a day.')
      ],
      words: [
        W('capstone brief', 'وصف مشروع التخرج في صفحة', 'a one-page description of the capstone', 'The capstone brief fits on one page.'),
        W('success metric', 'رقم بيثبت نجاح المشروع', 'a number proving project success', 'Our success metric is zero lost orders.'),
        W('non-functional requirement', 'متطلب جودة زي الأداء والأمان', 'a quality requirement such as performance or security', 'Availability is a non-functional requirement.'),
        W('architecture decision', 'قرار معماري موثّق بأسبابه', 'a documented design decision with its reasons', 'Record each architecture decision as an ADR.'),
        W('walking skeleton', 'أنحف نسخة كاملة شغالة من النظام', 'the thinnest complete working version of a system', 'The walking skeleton replied to one message.')
      ],
      read: [{ t: 'Michael Nygard: Documenting architecture decisions', url: 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions', what: B('أصل فكرة الـ ADR.', 'The origin of the ADR idea.') }],
      challenge: B('سلّم «حزمة التصميم»: brief، متطلبات وظيفية وغير وظيفية قابلة للاختبار، معمارية مرسومة، 3–5 ADRs، خطة 4 أسابيع، وwalking skeleton شغال — واعرضها على حد (عميل أو زميل) وخد ملاحظاته.', 'Deliver the «design pack»: the brief, testable functional and non-functional requirements, an architecture diagram, 3–5 ADRs, a 4-week plan and a working walking skeleton — and present it to someone (a client or colleague) for feedback.'),
      quiz: [
        Q(B('متطلب غير وظيفي:', 'A non-functional requirement:'), [['p95 أقل من 300ms', 'p95 under 300 ms'], ['يستقبل رسايل', 'receives messages'], ['يبعت فاتورة', 'sends an invoice']], 0, B('جودة.', 'Quality.')),
        Q(B('walking skeleton:', 'A walking skeleton:'), [['مسار كامل رفيع شغال', 'a thin complete working path'], ['كل التفاصيل الأول', 'all details first'], ['رسم بس', 'a drawing only']], 0, B('من الأول للآخر.', 'End to end.')),
        Q(B('«سريع» كمتطلب:', '«Fast» as a requirement:'), [['مش قابل للاختبار؛ اكتب رقم', 'not testable; write a number'], ['كفاية', 'enough'], ['ممتاز', 'excellent']], 0, B('قياس.', 'Measurable.'))
      ] },

    { title: B('البناء', 'Building'),
      goal: B('النظام الأساسي مبني بمعايير الخبير.', 'The core system built to expert standards.'),
      learn: [
        L(B('مراحل رأسية', 'Vertical slices'),
          B('ابني بـ **vertical slice**: كل مرحلة ميزة كاملة من أولها لآخرها (رسالة نصية ← طلب ← موافقة ← تأكيد) قبل الصوت والصور. كده كل أسبوع فيه حاجة العميل يشوفها ويجرّبها، والمخاطر بتبان بدري. وكل slice بيعدّي الـ DoD (أسبوع 46).', 'Build in **vertical slice** steps: each stage a complete feature end to end (a text message → order → approval → confirmation) before voice and images. Every week the client sees and tries something, and risks appear early. Each slice passes the DoD (week 46).'),
          'slice 1 (week 1): text order → items extracted → pharmacist approves in a form → customer confirmation\nslice 2 (week 2): stock check via the custom ERP node · payment link · branch notification\nslice 3 (week 3): voice notes (transcription) · prescription photos (in-region OCR) · dashboard\nslice 4 (week 4): hardening, load test, DR drill, docs, go-live'),
        L(B('استخدم اللي بنيته', 'Use what you built'),
          B('المشروع ده بيستخدم كل الأدوات اللي بنيتها في السنة: الـ node المخصص (أسبوع 37)، مكتبة الـ sub-workflows (47: notify، dead letter، audit)، القوالب (47)، المعايير والـ linter (38، 47)، والـ promote script (38). لو لقيت نفسك بتبني حاجة من الصفر، اسأل: «ينفع تبقى في المكتبة؟».', 'This project uses every tool you built this year: the custom node (week 37), the sub-workflow library (47: notify, dead letter, audit), the templates (47), the standards and linter (38, 47), and the promote script (38). If you find yourself building something from scratch, ask: «should this go into the library?».'),
          'reuse map\n- ERP: n8n-nodes-pharma-erp (week 37) with load options for branches\n- errors: lib · dead letter + lib · notify (week 47)\n- audit: lib · audit for every approval (week 41)\n- deploy: promote.mjs + smoke.mjs + workflow linter (week 38)\n- new for the library: lib · mask pii (week 42) → shared with other clients'),
        L(B('AI بأمان', 'AI safely'),
          B('الأجزاء اللي فيها AI (استخراج الأصناف من رسالة أو روشتة) بقواعد الشهر التاسع: structured output بـ schema، موافقة بشرية قبل أي أثر (الصيدلي بيوافق)، guardrails ومن غير هوية في الـ prompt، تقييمات بمجموعة اختبار (أسبوع 34)، وبديل لو النموذج وقع (طابور + رسالة «هنرد عليك خلال دقايق»).', 'The AI parts (extracting items from a message or prescription) follow month 9’s rules: structured output with a schema, human approval before any effect (the pharmacist approves), guardrails and no identity in the prompt, evaluations on a test set (week 34), and a fallback if the model fails (a queue + «we will reply in a few minutes»).'),
          'AI extraction contract\ninput: message text (identities stripped) · output schema: { items: [{ name, strength, qty }], confidence, needs_human }\nrules: confidence < 0.8 or any controlled drug → needs_human = true\neval set: 120 real (anonymised) messages · target 95% item accuracy · run on every prompt change\nfallback: model error → queue + polite holding reply · pharmacist sees the raw message')
      ],
      practice: [
        B('قسّم مشروعك لـ 4 vertical slices.', 'Split your project into 4 vertical slices.'),
        B('ابني slice 1 بالـ DoD كامل.', 'Build slice 1 to the full DoD.'),
        B('اعمل reuse map من مكتبتك.', 'Make a reuse map from your library.'),
        B('اكتب عقد AI بـ schema وeval set.', 'Write an AI contract with a schema and eval set.')
      ],
      words: [
        W('vertical slice', 'ميزة كاملة من أولها لآخرها', 'a complete feature from end to end', 'Ship one vertical slice per week.'),
        W('reuse map', 'خريطة المكونات الجاهزة المستخدمة', 'a map of ready components reused', 'The reuse map saved a week.'),
        W('ai contract', 'وصف مدخل ومخرج وقواعد جزء AI', 'the input, output and rules of an AI part', 'The AI contract sets confidence rules.'),
        W('eval set', 'مجموعة اختبار لقياس دقة AI', 'a test set measuring AI accuracy', 'Run the eval set on every prompt change.'),
        W('human approval', 'موافقة إنسان قبل الأثر', 'a person’s approval before any effect', 'Human approval is required for medicines.')
      ],
      read: ['lib:n8n Docs: AI Agent node', { t: 'n8n Docs: Test and improve AI workflows', url: 'https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/understand-why-to-test', what: B('للتقييمات.', 'For evaluations.') }],
      challenge: B('ابني slices 1 و2 بالكامل على staging: كل workflow بالـ DoD، الـ node المخصص، مكتبة الـ sub-workflows، عقد AI بـ eval set ≥ 95% — واعرض demo للعميل في آخر كل أسبوع.', 'Build slices 1 and 2 fully on staging: every workflow to the DoD, the custom node, the sub-workflow library, an AI contract with an eval set ≥ 95% — and demo to the client at the end of each week.'),
      quiz: [
        Q(B('أول أسبوع بناء:', 'The first build week:'), [['ميزة كاملة رفيعة', 'one thin complete feature'], ['كل الأجزاء نص نص', 'every part half done'], ['التصميم بس', 'design only']], 0, B('vertical.', 'Vertical.')),
        Q(B('لقيت نفسك بتبني notify من الصفر:', 'You are building notify from scratch:'), [['استخدم المكتبة', 'use the library'], ['كمّل', 'continue'], ['انسخ وعدّل', 'copy and edit']], 0, B('reuse.', 'Reuse.')),
        Q(B('النموذج مش واثق (0.6):', 'The model is unsure (0.6):'), [['needs_human', 'needs_human'], ['نفّذ', 'execute'], ['ارفض العميل', 'reject the customer']], 0, B('موافقة.', 'Approval.'))
      ] },

    { title: B('الجودة والتشغيل', 'Quality and operations'),
      goal: B('النظام بيتقاس ويتراقب ومؤمَّن قبل ما يتشغّل.', 'The system is measured, monitored and secured before go-live.'),
      learn: [
        L(B('الاختبار', 'Testing'),
          B('**acceptance test** لكل متطلب: حالات وظيفية (smoke بـ X-Test — أسبوع 38)، load test بـ k6 لحد ضعف الذروة (39)، chaos drill (39)، اختبارات أمان (webhook من غير توقيع، IDOR في الداشبورد، env في Code — 41)، وطلب حذف بيانات من أوله لآخره (42).', 'An **acceptance test** for each requirement: functional cases (smoke with X-Test — week 38), a k6 load test up to twice the peak (39), a chaos drill (39), security tests (an unsigned webhook, IDOR in the dashboard, env in Code — 41), and a data-deletion request end to end (42).'),
          'acceptance matrix\nrequirement                         test                                   result\np95 < 300 ms at 2× peak (20 req/s)   k6 10 min                              182 ms ✓\n0 lost messages during worker kill   chaos: kill 1 of 3 workers mid-load    0 lost ✓\nunsigned webhook rejected           curl without HMAC                      401 ✓\nPII masked in logs                  grep logs for phone patterns           0 hits ✓\nerasure end to end                  request → code → 5 systems → confirm   2 h 10 min ✓'),
        L(B('المراقبة والتنبيهات', 'Monitoring and alerts'),
          B('قبل التشغيل: لوحة (تقنية + بيزنس — أسبوع 40)، SLO بـ error budget، تنبيهات بـ runbooks، customData بـ orderId للتتبع، heartbeats للمجدول، ومراقبة من برة. واختبر كل تنبيه إنه بيوصل للشخص الصح فعلًا — تنبيه محدش شافه = مفيش تنبيه.', 'Before go-live: a board (technical + business — week 40), an SLO with an error budget, alerts with runbooks, customData with orderId for tracing, heartbeats for scheduled jobs, and outside monitoring. And test that each alert really reaches the right person — an alert nobody sees = no alert.'),
          'go-live gate (all ✓ before switching the WhatsApp number)\n[ ] board: orders/h, approval time p95, lost=0, AI accuracy, cost/day\n[ ] SLO 99% ≤ 10 min · error budget panel\n[ ] 5 alerts tested end to end (fired → on-call phone) · runbook links work\n[ ] customData orderId on all flows · trace a test order in < 2 min\n[ ] outside uptime check + heartbeats'),
        L(B('الاستمرارية والأمان', 'Continuity and security'),
          B('PITR وnسخة immutable وverification يومي (43)، DR runbook بتمرين مقاس، ترقية من غير توقف مجرّبة، SSO/2FA وprojects وأسرار في store (41)، n8n audit نضيف، DPA وDPIA موقّعين (42). ده الـ **launch checklist** — مفيش go-live قبل ما يكمل.', 'PITR, an immutable copy and daily verification (43), a DR runbook with a measured drill, a rehearsed zero-downtime upgrade, SSO/2FA, projects and secrets in a store (41), a clean n8n audit, a signed DPA and DPIA (42). This is the **launch checklist** — no go-live until it is complete.'),
          'launch checklist (security · privacy · continuity)\n[ ] n8n audit: 0 high findings · webhooks authenticated · env blocked · nodes excluded\n[ ] DPA signed · sub-processors listed · DPIA approved · retention jobs live\n[ ] PITR on · immutable off-site copy · verification heartbeat green 7 days\n[ ] DR drill: 41 min (RTO 30 ✗ → fixed DNS TTL, re-drill 27 min ✓)\n[ ] upgrade rehearsal on staging · rollback steps written')
      ],
      practice: [
        B('اعمل acceptance matrix لكل متطلباتك.', 'Build an acceptance matrix for all your requirements.'),
        B('شغّل load test وchaos drill.', 'Run a load test and a chaos drill.'),
        B('اختبر كل تنبيه لحد التليفون.', 'Test every alert all the way to the phone.'),
        B('كمّل launch checklist.', 'Complete the launch checklist.')
      ],
      words: [
        W('acceptance test', 'اختبار بيثبت إن متطلب اتحقق', 'a test proving a requirement is met', 'Each requirement has an acceptance test.'),
        W('acceptance matrix', 'جدول المتطلبات والاختبارات والنتايج', 'a table of requirements, tests and results', 'The acceptance matrix is all green.'),
        W('go-live gate', 'شروط لازم تكمل قبل التشغيل', 'conditions to meet before go-live', 'The go-live gate blocked the launch.'),
        W('launch checklist', 'قايمة التشغيل النهائية', 'the final launch list', 'Sign off the launch checklist.'),
        W('re-drill', 'إعادة تمرين بعد تصليح', 'repeating a drill after a fix', 'The re-drill met the RTO.')
      ],
      read: [{ t: 'Google SRE: Launch checklist', url: 'https://sre.google/sre-book/launch-checklist/', what: B('قارنه بقايمتك.', 'Compare it with your list.') }],
      challenge: B('خلّي المشروع «جاهز للتشغيل»: acceptance matrix كلها ✓، load وchaos وأمان وحذف متجرّبين، لوحة وSLO وتنبيهات متجرّبة، وlaunch checklist كاملة بتوقيع العميل.', 'Make the project «launch-ready»: an all-green acceptance matrix, load, chaos, security and erasure tested, a board, SLO and tested alerts, and a complete launch checklist signed off by the client.'),
      quiz: [
        Q(B('متطلب من غير اختبار:', 'A requirement without a test:'), [['مش متأكد إنه اتحقق', 'not known to be met'], ['اتحقق', 'met'], ['مش مهم', 'unimportant']], 0, B('اثبت.', 'Prove it.')),
        Q(B('تنبيه محدش استلمه:', 'An alert nobody received:'), [['زي مفيش تنبيه', 'the same as no alert'], ['تمام', 'fine'], ['أحسن', 'better']], 0, B('اختبر.', 'Test it.')),
        Q(B('DR drill أبطأ من RTO:', 'A DR drill slower than the RTO:'), [['صلّح وأعد التمرين', 'fix and re-drill'], ['غيّر RTO بصمت', 'quietly change the RTO'], ['شغّل كده', 'launch anyway']], 0, B('re-drill.', 'Re-drill.'))
      ] },

    { title: B('التسليم والتوثيق', 'Delivery and documentation'),
      goal: B('تشغيل ناجح وفريق العميل قادر.', 'A successful launch and a capable client team.'),
      learn: [
        L(B('يوم التشغيل', 'Launch day'),
          B('تشغيل في maintenance window (43)، بخطوات مكتوبة وأوقات، وخطة رجوع، وحد زمني. ابدأ بفرع أو نسبة صغيرة (canary) قبل الكل. وراقب اللوحة أول ساعات، وhypercare أسبوعين (46). و**post-launch review** بعد أسبوع: الأرقام مقابل المتطلبات، واللي اتعلمناه.', 'Launch in a maintenance window (43), with written steps and times, a rollback plan and a time box. Start with one branch or a small share (canary) before everyone. Watch the board for the first hours, and run hypercare for two weeks (46). And a **post-launch review** after a week: numbers against requirements, and lessons learned.'),
          'launch plan — Sunday 01:00\n01:00 backup mark · 01:05 switch WhatsApp webhook to the inbox (branch 1 only) · 01:15 smoke tests\n08:00–10:00 branch 1 live with pharmacists watching · 10:00 go/no-go → all 6 branches\nrollback: point the number back to the old inbox (2 min) · replay from the inbox\npost-launch review (day 7): lost 0 · p95 confirm 6.5 min · AI accuracy 96% · 2 SEV3 fixed'),
        L(B('التوثيق والتدريب', 'Documentation and training'),
          B('الـ client wiki كامل (46)، catalogue، runbooks (حوادث، DR، ترقية، تسريب)، Loom لكل workflow مهم، وورشة للصيادلة والمديرين (47) — مش «إزاي n8n بيشتغل» لكن «إزاي توافقوا، تتابعوا، تبلّغوا عن مشكلة». ووثيقة handover لو العميل عنده فريق.', 'The complete client wiki (46), the catalogue, runbooks (incidents, DR, upgrades, breaches), a Loom for each key workflow, and a workshop for pharmacists and managers (47) — not «how n8n works» but «how to approve, track and report a problem». And a handover document if the client has a team.'),
          'documentation set\n- wiki: overview · systems map · workflow catalogue · credentials register (names) · contacts\n- runbooks: SEV1 incident · DR (tested 27 min) · upgrade · leaked secret · erasure request\n- Looms: 7 × 3 min · workshop: pharmacists (approve on mobile, 20 min) · managers (dashboard, SLA)\n- ADRs 001–005 · DPIA · acceptance matrix'),
        L(B('علاقة مستمرة', 'An ongoing relationship'),
          B('المشروع بيخلص، العلاقة لأ: باقة صيانة مناسبة (46) بتقرير شهري، اجتماع ربع سنوي بأفكار جديدة (اللي اتأجل: تذكير الأدوية المزمنة، تقارير الفروع)، وطلب case study وشهادة بالأرقام بعد 30 يوم. ده بيحوّل مشروع واحد لسنين شغل.', 'The project ends; the relationship does not: a fitting care plan (46) with a monthly report, a quarterly meeting with new ideas (what was deferred: chronic-medicine reminders, branch reports), and a request for a case study and testimonial with numbers after 30 days. That turns one project into years of work.'),
          'after launch\nday 14: hypercare ends → Business care plan (3,500/month)\nday 30: monthly report #1 + testimonial request ("lost orders 15% → 0")\nday 90: quarterly review → proposal: chronic-medicine refill reminders (est. +8% repeat sales)')
      ],
      practice: [
        B('اكتب launch plan بأوقات وخطة رجوع.', 'Write a launch plan with times and a rollback.'),
        B('شغّل canary على جزء صغير.', 'Run a canary on a small part.'),
        B('سلّم مجموعة التوثيق كاملة.', 'Deliver the full documentation set.'),
        B('اعمل post-launch review بعد أسبوع.', 'Hold a post-launch review after a week.')
      ],
      words: [
        W('canary', 'تشغيل على جزء صغير الأول', 'launching on a small part first', 'Branch 1 was the canary.'),
        W('go/no-go', 'قرار الاستمرار أو التوقف', 'the decision to proceed or stop', 'The 10:00 go/no-go said go.'),
        W('post-launch review', 'مراجعة بعد التشغيل بالأرقام', 'a review after launch in numbers', 'The post-launch review met every target.'),
        W('documentation set', 'كل الوثايق المسلّمة', 'all delivered documents', 'The documentation set includes five runbooks.'),
        W('quarterly review', 'اجتماع ربع سنوي بالنتايج والأفكار', 'a quarterly meeting on results and ideas', 'The quarterly review led to a new project.')
      ],
      read: [{ t: 'Atlassian: Post-launch review', url: 'https://www.atlassian.com/team-playbook/plays/retrospective', what: B('قالب مراجعة.', 'A review template.') }],
      challenge: B('شغّل المشروع (أو محاكاة كاملة على staging مع «عميل» زميل): launch plan، canary، go/no-go، hypercare، توثيق كامل، ورشة، post-launch review بالأرقام، وعرض صيانة.', 'Launch the project (or a full simulation on staging with a colleague as «client»): a launch plan, canary, go/no-go, hypercare, full documentation, a workshop, a post-launch review in numbers, and a care-plan offer.'),
      quiz: [
        Q(B('canary:', 'A canary:'), [['جزء صغير الأول', 'a small part first'], ['الكل مرة واحدة', 'everyone at once'], ['من غير مراقبة', 'no monitoring']], 0, B('أمان.', 'Safety.')),
        Q(B('تدريب الصيادلة عن:', 'Training pharmacists covers:'), [['إزاي يوافقوا ويبلّغوا', 'how to approve and report'], ['داخل n8n', 'n8n internals'], ['Docker', 'Docker']], 0, B('دورهم.', 'Their role.')),
        Q(B('بعد التسليم:', 'After delivery:'), [['صيانة وتقرير ومراجعة ربع سنوية', 'a care plan, reports and quarterly reviews'], ['اختفي', 'disappear'], ['فاتورة وخلاص', 'an invoice and goodbye']], 0, B('علاقة.', 'Relationship.'))
      ] },

    { title: B('العرض والخطوة الجاية', 'Presenting and what comes next'),
      goal: B('تحوّل المشروع لقصة ودليل وخطة سنة.', 'Turn the project into a story, proof and a one-year plan.'),
      learn: [
        L(B('العرض', 'The presentation'),
          B('**demo script** (10 دقايق): المشكلة بأرقامها (دقيقة)، ديمو حي للمسار الأساسي (4 دقايق)، المعمارية والقرارات (دقيقتين)، الجودة: SLO وأمان وخصوصية واستمرارية (دقيقتين)، النتايج والدرس (دقيقة). اعرضه على العميل، وعلى meetup، ونسخة فيديو لموقعك.', 'A **demo script** (10 minutes): the problem in numbers (1 minute), a live demo of the main path (4), the architecture and decisions (2), quality: SLO, security, privacy, continuity (2), results and the lesson (1). Present it to the client, at a meetup, and as a video for your site.'),
          'demo script — "From lost night orders to zero"\n0:00 problem: 15% lost, 4 h replies (one slide, real numbers)\n1:00 live: send a WhatsApp voice note → pharmacist approves on mobile → customer gets confirmation + link\n5:00 architecture in one diagram · 3 decisions and why\n7:00 quality: SLO 99%, DR 27 min, DPIA, audit clean\n9:00 results after 30 days · the lesson: human approval earned trust'),
        L(B('المحفظة', 'The portfolio'),
          B('المشروع ده **portfolio piece** رئيسي: case study (47)، قالب منشور من جزء عام (47)، فيديو الديمو، والكود (الـ node المخصص لو ينفع ينتشر). واطلب **expert review** و**peer feedback** من حد أخبر — النقد بدري أرخص من النقد من العميل.', 'This project is a main **portfolio piece**: a case study (47), a published template from a general part (47), the demo video, and code (the custom node if it can be shared). And ask for an **expert review** and **peer feedback** from someone more experienced — early criticism is cheaper than a client’s.'),
          'portfolio entry\n- title: "Pharmacy WhatsApp ordering — 0 lost orders, 6-min confirmations"\n- 600-word case study (permission ✓) · 2-min demo video · architecture diagram\n- public template: "WhatsApp voice note → transcript → structured order (with approval)"\n- what I would do differently (honest) · stack: n8n queue mode, custom node, Postgres PITR, Grafana'),
        L(B('السنة الجاية', 'The year ahead'),
          B('خلصت الرحلة — ده بداية مش نهاية. اختار **specialisation** (نيتش أو صناعة أو تقنية: الصحة، التجارة، AI agents، enterprise)، و**career path** (وكالة، استشاري، موظف في شركة، منتج SaaS)، وخطة **lifelong learning**: الـ changelog بتاع n8n شهريًا، مشروع جانبي، مجتمع، وإنجليزي ولغة برمجة كمان (الرحلات التانية في الموقع!).', 'The journey is complete — a beginning, not an end. Choose a **specialisation** (a niche, an industry or a technology: health, commerce, AI agents, enterprise), a **career path** (an agency, consulting, employment, a SaaS product), and a **lifelong learning** plan: n8n’s changelog monthly, a side project, the community, plus English and a programming language (the site’s other journeys!).'),
          'next 12 months (one page)\nspecialise: pharmacies & clinics in Egypt/KSA (regulated data = fewer competitors)\ncareer: agency with 3 care-plan clients by month 6, 8 by month 12\nlearn: Python journey (AI/data) · English months 10–12 (sales calls, contracts)\ncommunity: 1 talk per quarter · 1 template per month\nreview: every 3 months — revenue, recurring share, happiness')
      ],
      practice: [
        B('اكتب demo script 10 دقايق واتدرّب عليه.', 'Write a 10-minute demo script and rehearse it.'),
        B('سجّل فيديو ديمو دقيقتين.', 'Record a 2-minute demo video.'),
        B('اطلب expert review لمشروعك.', 'Ask for an expert review of your project.'),
        B('اكتب خطة الـ 12 شهر الجاية.', 'Write your plan for the next 12 months.')
      ],
      words: [
        W('demo script', 'سيناريو العرض بالدقايق', 'the presentation plan by minutes', 'Rehearse the demo script twice.'),
        W('portfolio piece', 'مشروع بيمثّلك في المحفظة', 'a project representing you in the portfolio', 'The capstone is my main portfolio piece.'),
        W('expert review', 'مراجعة من حد أخبر', 'a review by someone more experienced', 'The expert review found a DR gap.'),
        W('peer feedback', 'ملاحظات من زميل', 'comments from a colleague', 'Peer feedback improved the demo.'),
        W('specialisation', 'التخصص في مجال', 'focusing on one field', 'My specialisation is regulated health data.'),
        W('career path', 'المسار المهني', 'the professional route', 'Choose a career path for next year.'),
        W('lifelong learning', 'التعلم المستمر طول الحياة', 'learning continuously throughout life', 'Lifelong learning keeps experts current.')
      ],
      read: [{ t: 'n8n Community', url: 'https://community.n8n.io/', what: B('شارك مشروعك وخد آراء.', 'Share your project and get feedback.') }],
      challenge: B('اعرض مشروعك على 3 جماهير (العميل، meetup أو مجتمع أونلاين، وفيديو لموقعك)، خد expert review وpeer feedback واكتب التحسينات، وانشر portfolio entry وخطة سنتك الجاية.', 'Present your project to 3 audiences (the client, a meetup or online community, and a video for your site), get an expert review and peer feedback and write up the improvements, and publish a portfolio entry and your next-year plan.'),
      quiz: [
        Q(B('الديمو الكويس بيبدأ بـ:', 'A good demo starts with:'), [['المشكلة بأرقامها', 'the problem in numbers'], ['شرح n8n', 'explaining n8n'], ['المعمارية', 'the architecture']], 0, B('قصة.', 'A story.')),
        Q(B('expert review قبل العميل:', 'An expert review before the client:'), [['أرخص من نقد العميل', 'cheaper than the client’s criticism'], ['مضيعة', 'a waste'], ['ممنوع', 'forbidden']], 0, B('بدري.', 'Early.')),
        Q(B('بعد الرحلة:', 'After the journey:'), [['تخصص وخطة تعلم مستمر', 'a specialisation and a learning plan'], ['خلاص', 'done forever'], ['ابدأ من الأول', 'start over']], 0, B('بداية.', 'A beginning.'))
      ] },

    { title: B('مراجعة الرحلة واختبارها', 'Journey review and test'),
      goal: B('من أول Webhook لمنصة مؤسسية — انت خبير.', 'From the first webhook to an enterprise platform — you are an expert.'),
      review: [
        B('الأساسيات: nodes وexpressions وبيانات وتحكم في المسار (شهور 1–3).', 'The basics: nodes, expressions, data and flow control (months 1–3).'),
        B('التكاملات والـ APIs والـ AI والوكلاء (شهور 4–9).', 'Integrations, APIs, AI and agents (months 4–9).'),
        B('n8n من جوه: nodes مخصصة، API، أداء، مراقبة (شهر 10).', 'n8n from the inside: custom nodes, the API, performance, observability (month 10).'),
        B('المؤسسات: أمان، خصوصية، استمرارية، Kubernetes (شهر 11).', 'Enterprise: security, privacy, continuity, Kubernetes (month 11).'),
        B('الخبير: البيع، الوكالة، القيادة، ومشروع التخرج (شهر 12).', 'The expert: selling, the agency, leadership and the capstone (month 12).')
      ],
      project: B('مشروع الخبير النهائي: نظام أتمتة حقيقي من الاكتشاف للتشغيل — brief ومتطلبات قابلة للاختبار ومعمارية بـ ADRs، بناء بـ vertical slices من مكتبتك وnode مخصص، AI بموافقة بشرية وتقييمات، acceptance matrix (حمل، chaos، أمان، حذف)، مراقبة بـ SLO وتنبيهات متجرّبة، أمان وخصوصية واستمرارية بـ launch checklist، تشغيل canary وhypercare وتوثيق وورشة، صيانة بتقرير، وعرض وcase study وخطة سنة.', 'The expert capstone: a real automation system from discovery to operation — a brief, testable requirements and an architecture with ADRs, built in vertical slices from your library with a custom node, AI with human approval and evaluations, an acceptance matrix (load, chaos, security, erasure), monitoring with an SLO and tested alerts, security, privacy and continuity via a launch checklist, a canary launch with hypercare, documentation and a workshop, a care plan with reports, and a presentation, case study and one-year plan.'),
      test: [
        Q(B('success metric كويس:', 'A good success metric:'), [['«0 طلبات ضايعة، تأكيد < 10 دقايق»', '«0 lost orders, confirmation < 10 min»'], ['«نظام أحسن»', '«a better system»'], ['«عميل مبسوط»', '«a happy client»']], 0, B('رقم.', 'A number.')),
        Q(B('أول حاجة تبنيها:', 'The first thing to build:'), [['walking skeleton', 'a walking skeleton'], ['اللوحة', 'the dashboard'], ['الـ AI', 'the AI']], 0, B('من الأول للآخر.', 'End to end.')),
        Q(B('node مخصص لـ ERP بيتكرر:', 'A custom node for a repeated ERP:'), [['شهر 10 (أسبوع 37)', 'month 10 (week 37)'], ['مش مهم', 'irrelevant'], ['Code في كل مكان', 'Code everywhere']], 0, B('reuse.', 'Reuse.')),
        Q(B('AI بيقرر صرف دوا:', 'AI deciding to dispense medicine:'), [['لأ؛ اقتراح وموافقة صيدلي', 'no; a suggestion with pharmacist approval'], ['أيوه لو واثق', 'yes if confident'], ['لو رخيص', 'if cheap']], 0, B('إنسان.', 'Human.')),
        Q(B('اختبار «0 رسايل ضايعة»:', 'Testing «0 lost messages»:'), [['chaos: اقتل worker تحت حمل', 'chaos: kill a worker under load'], ['اسأل العميل', 'ask the client'], ['مش لازم', 'not needed']], 0, B('اثبت.', 'Prove it.')),
        Q(B('بيانات صحية في prompt:', 'Health data in a prompt:'), [['من غير هوية + DPIA', 'identity-free + a DPIA'], ['كاملة', 'in full'], ['ممنوع AI خالص', 'no AI at all']], 0, B('خصوصية.', 'Privacy.')),
        Q(B('SLO 99% ≤ 10 دقايق:', 'SLO 99% ≤ 10 minutes:'), [['هدف قابل للقياس بـ error budget', 'a measurable target with an error budget'], ['شعار', 'a slogan'], ['مستحيل', 'impossible']], 0, B('مراقبة.', 'Monitoring.')),
        Q(B('DR drill 41 دقيقة وRTO 30:', 'A 41-minute DR drill with RTO 30:'), [['صلّح وأعد التمرين', 'fix and re-drill'], ['شغّل كده', 'launch anyway'], ['RTO 60 بهدوء', 'quietly make RTO 60']], 0, B('أمانة.', 'Honesty.')),
        Q(B('يوم التشغيل:', 'Launch day:'), [['canary + go/no-go + خطة رجوع', 'canary + go/no-go + rollback plan'], ['الكل مرة واحدة', 'everyone at once'], ['من غير خطة', 'no plan']], 0, B('تحكم.', 'Control.')),
        Q(B('بعد التشغيل بأسبوع:', 'One week after launch:'), [['post-launch review بالأرقام', 'a post-launch review in numbers'], ['إجازة', 'a holiday'], ['مشروع جديد فورًا', 'a new project at once']], 0, B('تعلّم.', 'Learning.')),
        Q(B('الديمو الكويس:', 'A good demo:'), [['مشكلة ← ديمو حي ← قرارات ← جودة ← نتايج', 'problem → live demo → decisions → quality → results'], ['شرايح كتير', 'many slides'], ['كود بس', 'code only']], 0, B('قصة.', 'A story.')),
        Q(B('الخبير الحقيقي:', 'A real expert:'), [['بيتعلم باستمرار وبيشارك', 'keeps learning and sharing'], ['خلص التعلم', 'has finished learning'], ['بيعرف كل حاجة', 'knows everything']], 0, B('lifelong.', 'Lifelong.'))
      ] }
  ]
};
