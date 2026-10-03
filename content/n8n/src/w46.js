// n8n week 46 — Running an automation agency: maintenance, SLAs and docs.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('إدارة وكالة أتمتة: الصيانة والـ SLAs والتوثيق', 'Running an automation agency: maintenance, SLAs and docs'),
  goal: B('تحوّل المشاريع لدخل متكرر وعلاقات طويلة: باقات صيانة بقيمة واضحة، SLA بيتوفى بيه، توثيق لكل عميل يخلّي أي حد في الفريق يقدر يشتغل، عملية تسليم بجودة ثابتة، وأرقام الوكالة (الهامش، الاستغلال، التدفق النقدي) تحت السيطرة.',
          'Turn projects into recurring income and long relationships: maintenance plans with clear value, an SLA you can keep, per-client documentation letting anyone on the team work, a delivery process with steady quality, and the agency’s numbers (margin, utilisation, cash flow) under control.'),
  days: [
    { title: B('باقات الصيانة', 'Maintenance plans'),
      goal: B('دخل شهري متكرر مقابل راحة بال العميل.', 'Recurring monthly income in exchange for the client’s peace of mind.'),
      learn: [
        L(B('ليه صيانة؟', 'Why maintenance?'),
          B('الأتمتة مش «بتتعمل وتنتهي»: الـ APIs بتتغير، التوكنات بتنتهي، n8n بيتحدّث، البيانات بتكبر، والبيزنس بيتغير. **maintenance plan** (أو **care plan**) بيحوّل ده لخدمة شهرية: مراقبة، تحديثات، تصليحات، تحسينات صغيرة، وتقرير — دخل ثابت ليك وأمان للعميل.', 'Automation is not «built once and done»: APIs change, tokens expire, n8n updates, data grows, and the business changes. A **maintenance plan** (or **care plan**) turns this into a monthly service: monitoring, updates, fixes, small improvements and a report — steady income for you and safety for the client.'),
          'why clients pay monthly\n- the WhatsApp token expires every 60 days → renewed before it breaks\n- Shopify API version retired → workflows migrated in advance\n- n8n security update → tested on staging, applied in the window\n- "can you add the new branch?" → 2 h of improvements included'),
        L(B('الباقات', 'The plans'),
          B('3 باقات بحسب حجم الأتمتة والحساسية — وكل باقة بتقول بوضوح: كام workflow، المراقبة، وقت الرد، ساعات تحسين شهرية، التحديثات، التقرير. وسعّر على القيمة والمخاطرة مش ساعات: workflow بيلمس فلوس أغلى من تقرير أسبوعي.', 'Three plans by automation size and sensitivity — each stating clearly: how many workflows, monitoring, response time, monthly improvement hours, updates, the report. Price on value and risk, not hours: a workflow touching money costs more than a weekly report.'),
          '                Essential 1,500/mo   Business 3,500/mo ★    Critical 8,000/mo\nworkflows       up to 5              up to 15               unlimited + custom nodes\nmonitoring      daily check          24/7 alerts            24/7 + on-call\nresponse SEV1   next business day    4 h (business hours)   1 h, 7 days\nimprovements    –                    3 h/month              8 h/month\nreport          quarterly            monthly                monthly + quarterly review\nupdates/DR      updates              updates + backup check updates + DR drill twice a year'),
        L(B('التقرير الشهري', 'The monthly report'),
          B('**monthly report** هو اللي بيخلّي العميل يجدد: أرقام البيزنس (فواتير اتبعتت، ساعات اتوفرت)، الصحة (نسبة نجاح، حوادث وحلها)، اللي اتعمل (تحديثات، تحسينات)، والتوصيات الجاية (فرص أتمتة جديدة = upsell). ولّده آليًا من نفس الأرقام (أسبوع 40).', 'The **monthly report** is what makes clients renew: business numbers (invoices sent, hours saved), health (success rate, incidents and resolution), what was done (updates, improvements), and next recommendations (new automation opportunities = upsell). Generate it automatically from the same numbers (week 40).'),
          'September report — Client A (auto-generated, reviewed in 10 min)\n✅ 2,940 orders processed · 2,912 invoices sent · ≈ 61 h of staff time saved\n✅ success rate 99.3% · 1 SEV3 (supplier API slow, auto-retried)\n🔧 done: n8n 1.112 update · WhatsApp token renewed · new branch added (2 h)\n💡 next: automate supplier reorders (est. 9 h/month saved) — proposal attached')
      ],
      practice: [
        B('اكتب 3 باقات صيانة بأسعار ومحتوى.', 'Write 3 maintenance plans with prices and contents.'),
        B('اعمل قايمة «حاجات بتبوظ مع الوقت» لعميل.', 'List «things that break over time» for a client.'),
        B('اعمل workflow يولّد تقرير شهري.', 'Build a workflow generating a monthly report.'),
        B('ضيف «التوصيات الجاية» للتقرير.', 'Add «next recommendations» to the report.')
      ],
      words: [
        W('maintenance plan', 'خدمة صيانة شهرية', 'a monthly maintenance service', 'Every project ends with a maintenance plan offer.'),
        W('care plan', 'اسم تاني لباقة الصيانة', 'another name for a maintenance plan', 'The care plan includes monitoring.'),
        W('monthly report', 'تقرير شهري بالأرقام والإنجازات', 'a monthly report of numbers and work done', 'The monthly report drives renewals.'),
        W('recurring revenue', 'دخل متكرر كل شهر', 'income that repeats monthly', 'Care plans give recurring revenue.'),
        W('upsell path', 'المسار الطبيعي لخدمات أكبر', 'the natural route to bigger services', 'The report’s ideas are our upsell path.')
      ],
      read: [{ t: 'n8n: Partner program', url: 'https://n8n.io/partners/', what: B('شوف إزاي الوكالات بتقدّم نفسها.', 'See how agencies present themselves.') }],
      challenge: B('اعمل «عرض صيانة» لعميل حقيقي أو وهمي: 3 باقات، قايمة المخاطر اللي بتغطيها، وعينة تقرير شهري متولّدة آليًا من workflow.', 'Write a «maintenance offer» for a real or mock client: 3 plans, the list of risks they cover, and a sample monthly report generated automatically by a workflow.'),
      quiz: [
        Q(B('ليه الأتمتة محتاجة صيانة؟', 'Why does automation need maintenance?'), [['APIs وتوكنات وبيانات بتتغير', 'APIs, tokens and data change'], ['مش محتاجة', 'it does not'], ['عشان الوكالة تكسب بس', 'only so the agency earns']], 0, B('تغيير.', 'Change.')),
        Q(B('سعر الباقة على:', 'A plan is priced on:'), [['القيمة والمخاطرة', 'value and risk'], ['ساعات فقط', 'hours only'], ['عشوائي', 'random']], 0, B('حساسية.', 'Sensitivity.')),
        Q(B('اللي بيخلّي العميل يجدد:', 'What makes a client renew:'), [['تقرير بقيمة واضحة', 'a report with clear value'], ['الصمت', 'silence'], ['فاتورة بس', 'just an invoice']], 0, B('أرقام.', 'Numbers.'))
      ] },

    { title: B('الـ SLA', 'The SLA'),
      goal: B('وعود واضحة تقدر توفي بيها.', 'Clear promises you can keep.'),
      learn: [
        L(B('الرد والحل', 'Response and resolution'),
          B('الـ SLA (أسبوع 24 كان مقدمة) لازم يفرّق: **response window** (إمتى هترد وتبدأ) و**resolution time** (إمتى المشكلة تتحل أو يبقى فيه حل مؤقت). وحسب **severity matrix**: SEV1 (الطلبات واقفة) غير SEV3 (تقرير متأخر). ومتوعدش بحل في ساعة لحاجة معتمدة على API طرف تالت مش في إيدك.', 'An SLA (introduced in week 24) must separate the **response window** (when you reply and start) from the **resolution time** (when the problem is solved or worked around). Per a **severity matrix**: SEV1 (orders stopped) differs from SEV3 (a late report). And never promise a fix in an hour for something depending on a third-party API outside your control.'),
          'severity matrix (Business plan)\nSEV1  core flow down (orders/invoices)        response 4 h (business hours)   workaround target 8 h\nSEV2  a key flow degraded / partial            next business day               2 business days\nSEV3  minor, workaround exists                 2 business days                 next release\nexcluded: outages of third-party services (we monitor and retry, we cannot fix them)'),
        L(B('الساعات والتعويض', 'Hours and credits'),
          B('حدد **support hours** (الأحد–الخميس 9–6 بتوقيت القاهرة؟ أو 24/7 للباقة الحرجة)، وقنوات الدعم (بوابة/إيميل، مش واتساب شخصي الساعة 2 الفجر). و**service credit**: لو مقدرتش توفي، العميل ياخد خصم من الشهر الجاي — بيخلّي الوعد جدي ومحدود.', 'Set **support hours** (Sunday–Thursday 9–6 Cairo time? or 24/7 for the critical plan) and support channels (a portal/email, not personal WhatsApp at 2 a.m.). And a **service credit**: if you miss the target, the client gets a discount on next month — it makes the promise serious and bounded.'),
          'support: help@agency.example or the portal · Sun–Thu 09:00–18:00 Cairo\nSEV1 outside hours: Critical plan only, via the on-call number\nservice credits: monthly response targets met < 95% → 10% credit · < 90% → 25% (max 25% of the monthly fee)\nmeasured from our ticket system timestamps'),
        L(B('اللي بره الـ SLA', 'Outside the SLA'),
          B('الـ SLA بيحمي الطرفين لما يقول اللي **مش** مشمول: طلبات جديدة (دي change requests)، مشاكل من تعديل العميل نفسه في الـ workflows، أعطال خدمات خارجية، بيانات غلط من العميل. ومن غير ده، الـ SLA بيبقى «اعملّي أي حاجة في أي وقت».', 'The SLA protects both sides by stating what is **not** included: new requests (those are change requests), problems caused by the client editing workflows, third-party outages, and bad data from the client. Without this, the SLA becomes «do anything for me at any time».'),
          'not covered by the SLA\n- new features or workflows → change request + quote (improvement hours may apply)\n- issues caused by client edits to production workflows (we can fix at the hourly rate)\n- third-party outages (Shopify, Meta, the ERP) — we monitor, retry and inform you\n- incorrect source data (wrong prices in your sheet)')
      ],
      practice: [
        B('اكتب severity matrix لباقتين.', 'Write a severity matrix for two plans.'),
        B('حدد ساعات وقنوات الدعم.', 'Set support hours and channels.'),
        B('اكتب قواعد service credits.', 'Write service-credit rules.'),
        B('اكتب «مش مشمول» بوضوح.', 'Write «not covered» clearly.')
      ],
      words: [
        W('response window', 'المدة القصوى لأول رد', 'the longest time to a first reply', 'The SEV1 response window is 4 hours.'),
        W('resolution time', 'المدة لحل المشكلة', 'the time to solve the problem', 'Resolution time depends on the vendor.'),
        W('severity matrix', 'جدول درجات المشاكل ومواعيدها', 'a table of problem levels and targets', 'The severity matrix defines SEV1.'),
        W('service credit', 'خصم لو الوعد متحققش', 'a discount when a promise is missed', 'We owe a 10% service credit.'),
        W('support hours', 'ساعات الدعم المتفق عليها', 'the agreed support hours', 'Support hours are Sunday to Thursday.')
      ],
      read: [{ t: 'Atlassian: What is an SLA?', url: 'https://www.atlassian.com/itsm/service-request-management/slas', what: B('اقرا SLA examples.', 'Read SLA examples.') }],
      challenge: B('اكتب SLA كامل لباقة Business: severity matrix، ساعات وقنوات، service credits، مش مشمول، وإزاي بتتقاس — وخلّي نظام تذاكر بسيط (n8n فورم ← جدول ← تنبيه) يقيس وقت الرد آليًا.', 'Write a full SLA for the Business plan: a severity matrix, hours and channels, service credits, exclusions, and how it is measured — with a simple ticket system (n8n form → table → alert) measuring response time automatically.'),
      quiz: [
        Q(B('response مقابل resolution:', 'Response vs resolution:'), [['أول رد مقابل الحل', 'first reply vs the fix'], ['نفس الحاجة', 'the same thing'], ['resolution أسرع دايمًا', 'resolution is always faster']], 0, B('فرق.', 'Different.')),
        Q(B('Shopify واقع:', 'Shopify is down:'), [['بره الـ SLA؛ بنراقب ونبلّغ', 'outside the SLA; we monitor and inform'], ['service credit', 'a service credit'], ['خطأ الوكالة', 'the agency’s fault']], 0, B('طرف تالت.', 'Third party.')),
        Q(B('ميزة exclusions:', 'The value of exclusions:'), [['بتمنع «أي حاجة أي وقت»', 'they prevent «anything at any time»'], ['بتزعّل العميل', 'they upset clients'], ['مش لازمة', 'unnecessary']], 0, B('حدود.', 'Boundaries.'))
      ] },

    { title: B('التوثيق لكل عميل', 'Documentation per client'),
      goal: B('أي حد في الفريق يقدر يشتغل على أي عميل.', 'Anyone on the team can work on any client.'),
      learn: [
        L(B('wiki العميل', 'The client wiki'),
          B('**client wiki** (Notion، Confluence، أو Markdown في ريبو) لكل عميل: نظرة عامة على البيزنس، خريطة الأنظمة، **workflow catalogue** (كل workflow: بيعمل إيه، تريجر، صاحبه، SLA)، الـ credentials (اسم ومين صاحبها — من غير قيم!)، runbooks، جهات الاتصال، وسجل التغييرات. لو المهندس غاب أسبوع، الشغل ميقفش.', 'A **client wiki** (Notion, Confluence or Markdown in a repo) per client: a business overview, a systems map, a **workflow catalogue** (each workflow: what it does, trigger, owner, SLA), credentials (names and owners — no values!), runbooks, contacts and a change history. If the engineer is away a week, work does not stop.'),
          'Client A wiki\n1. overview: online shop, 2,900 orders/month, Shopify + Odoo + WhatsApp\n2. systems map (diagram) + environments (staging/prod URLs)\n3. workflow catalogue\n   | name                    | trigger        | does                          | SLA  | owner |\n   | Orders → Invoice        | Shopify webhook| PDF, email, Odoo invoice      | SEV1 | Sara  |\n   | Daily stock report      | 07:00          | sheet + Telegram              | SEV3 | Omar  |\n4. credentials register (names only) · 5. runbooks · 6. contacts · 7. changes'),
        L(B('توثيق جوه n8n', 'Documentation inside n8n'),
          B('جوه الـ workflow: sticky notes بتشرح الأجزاء («ليه بنعمل retry هنا»)، أسماء nodes واضحة، وصف الـ workflow في الإعدادات، وtags (العميل، الحساسية، الصاحب). ولكل workflow مهم: **loom** (فيديو 3 دقايق بيشرحه) — أسرع طريقة لتسليم معرفة.', 'Inside the workflow: sticky notes explaining the parts («why we retry here»), clear node names, a workflow description in settings, and tags (client, sensitivity, owner). And for each key workflow: a **loom** (a 3-minute video walking through it) — the fastest way to hand over knowledge.'),
          'conventions\n- name: "[ClientA] Orders → Invoice (prod)"\n- tags: client:a · sev1 · owner:sara · pii\n- sticky note per section: purpose · inputs · outputs · gotchas\n- node names: "Get order lines (Shopify)", not "HTTP Request3"\n- a 3-minute Loom link in the workflow description'),
        L(B('التسليم والخروج', 'Handover and offboarding'),
          B('**handover document** لما المشروع يخلص أو العميل يمشي: كل اللي فوق + نقل الملكية (حسابات، credentials، الـ n8n نفسه لو عندهم)، وتصدير الـ workflows، وجلسة تدريب. والـ **offboarding** المحترم (حتى لو العميل زعلان) بيحمي سمعتك: نقل منظم، ومسح بياناتهم عندك (أسبوع 42).', 'A **handover document** when a project ends or a client leaves: everything above + ownership transfer (accounts, credentials, the n8n instance itself if theirs), a workflow export and a training session. And a respectful **offboarding** (even with an unhappy client) protects your reputation: an orderly transfer, and deleting their data on your side (week 42).'),
          'offboarding checklist\n[ ] export workflows + credentials list (names) + wiki to the client\n[ ] transfer accounts/ownership (n8n instance, API apps, domains) — confirm in writing\n[ ] 1-hour handover call (recorded) with their new owner\n[ ] revoke our access everywhere · delete their data from our systems (DPA)\n[ ] final invoice + a short thank-you note (doors stay open)')
      ],
      practice: [
        B('اعمل wiki لعميل بالأقسام السبعة.', 'Create a client wiki with the seven sections.'),
        B('اعمل workflow catalogue كامل.', 'Write a full workflow catalogue.'),
        B('ضيف sticky notes وtags لـ 3 workflows.', 'Add sticky notes and tags to 3 workflows.'),
        B('سجّل Loom 3 دقايق لـ workflow مهم.', 'Record a 3-minute Loom for a key workflow.')
      ],
      words: [
        W('client wiki', 'مرجع كل معلومات العميل', 'the reference for everything about a client', 'Check the client wiki first.'),
        W('workflow catalogue', 'قايمة كل الـ workflows بتفاصيلها', 'a list of every workflow with details', 'The workflow catalogue lists owners.'),
        W('workflow description', 'وصف الـ workflow في إعداداته', 'the description in a workflow’s settings', 'The workflow description links the Loom.'),
        W('loom', 'فيديو شرح قصير بتسجيل الشاشة', 'a short screen-recorded explainer', 'Each workflow has a Loom.'),
        W('offboarding', 'إنهاء العلاقة مع عميل بنظام', 'ending a client relationship in order', 'Offboarding includes deleting their data.')
      ],
      read: [{ t: 'n8n Docs: Add notes and documentation', url: 'https://docs.n8n.io/build/understand-workflows/workflow-components/add-notes-and-documentation', what: B('اقرا Markdown in sticky notes.', 'Read Markdown in sticky notes.') }, { t: 'Write the Docs: Documentation guide', url: 'https://www.writethedocs.org/guide/', what: B('اقرا Docs as Code.', 'Read Docs as Code.') }],
      challenge: B('خلّي عميل واحد «موثّق بالكامل»: wiki بالأقسام، catalogue، conventions في كل workflow، Loom لأهم 3، وhandover document — واختبر: زميل يصلّح مشكلة وهمية من التوثيق بس.', 'Make one client «fully documented»: a wiki with all sections, a catalogue, conventions in every workflow, Looms for the top 3, and a handover document — then test: a colleague fixes a mock problem using only the docs.'),
      quiz: [
        Q(B('الـ credentials في الـ wiki:', 'Credentials in the wiki:'), [['الأسماء والأصحاب بس', 'names and owners only'], ['القيم', 'the values'], ['مش مكتوبة خالص', 'not written at all']], 0, B('أمان.', 'Safety.')),
        Q(B('أسرع تسليم معرفة:', 'The fastest knowledge handover:'), [['فيديو قصير + catalogue', 'a short video + a catalogue'], ['اجتماع 4 ساعات', 'a 4-hour meeting'], ['ذاكرة المهندس', 'the engineer’s memory']], 0, B('Loom.', 'Loom.')),
        Q(B('عميل ماشي وزعلان:', 'A leaving, unhappy client:'), [['offboarding منظم ومحترم', 'an orderly, respectful offboarding'], ['اقفل كل حاجة فجأة', 'shut everything suddenly'], ['تجاهل', 'ignore']], 0, B('سمعة.', 'Reputation.'))
      ] },

    { title: B('عملية التسليم', 'The delivery process'),
      goal: B('كل مشروع بنفس الجودة مهما مين نفّذه.', 'Every project at the same quality whoever builds it.'),
      learn: [
        L(B('مراحل ثابتة', 'Fixed stages'),
          B('عملية واحدة لكل المشاريع: kickoff (وصول، أهداف، جهات اتصال) ← تصميم (معمارية + موافقة) ← بناء على staging ← اختبار بحالات حقيقية ← UAT (العميل يجرّب) ← go-live بخطة رجوع ← hypercare (أسبوعين مراقبة مكثفة) ← تسليم للصيانة. قوالب جاهزة لكل مرحلة.', 'One process for every project: kickoff (access, goals, contacts) → design (architecture + approval) → build on staging → testing with real cases → UAT (the client tries it) → go-live with a rollback plan → hypercare (two weeks of close monitoring) → handover to maintenance. Ready templates for each stage.'),
          'week 0  kickoff (template: access checklist, success metrics, contacts)\nweek 1  design doc + client approval (architecture, data map, risks)\nweek 1–2 build on staging · conventions · tests (week 38)\nweek 2  UAT: 20 real cases with the client · sign-off\nweek 3  go-live (window, rollback plan) → hypercare 14 days → maintenance plan'),
        L(B('تعريف «خلص»', 'The definition of done'),
          B('**definition of done**: الـ workflow مش «خلص» لما يشتغل مرة. خلص لما: الحالات الطرفية متجرّبة، error workflow وتنبيهات شغالة، conventions متطبّقة، linter نضيف (أسبوع 38)، مراجعة من زميل، توثيق في الـ wiki، وLoom. **delivery checklist** ثابتة بتمنع «نسيت».', 'The **definition of done**: a workflow is not «done» when it runs once. It is done when: edge cases are tested, the error workflow and alerts work, conventions are applied, the linter is clean (week 38), a colleague reviewed it, the wiki is updated, and a Loom exists. A fixed **delivery checklist** prevents «I forgot».'),
          'definition of done (per workflow)\n[ ] 10 test cases incl. edge cases (empty, Arabic, duplicates, API down)\n[ ] error workflow + alert routed to the right channel\n[ ] retries/timeouts on every external call · idempotent where needed\n[ ] naming, tags, sticky notes · linter passes\n[ ] peer review done (PR or a 20-min walkthrough)\n[ ] catalogue + runbook + Loom updated'),
        L(B('التقدير والتعلّم', 'Estimating and learning'),
          B('سجّل الوقت الفعلي لكل مشروع مقابل التقدير (**estimate accuracy**). بعد 5 مشاريع هتعرف إنك بتقلل التكاملات مع ERP بـ 60% مثلًا — وتصلّح أسعارك. واعمل retrospective قصير بعد كل مشروع: إيه نفع، إيه منفعش، إيه نغيّره في القوالب.', 'Record the actual time of each project against the estimate (**estimate accuracy**). After 5 projects you will learn, say, that you underestimate ERP integrations by 60% — and fix your prices. And hold a short retrospective after each project: what worked, what did not, what to change in the templates.'),
          'project log\nproject          estimate  actual  diff    lesson\nShop A orders    24 h      27 h    +12%    fine\nClinic triage    30 h      52 h    +73%    clinical rules unclear → paid discovery next time\nERP sync         40 h      64 h    +60%    ERP API quirks → add 50% for unknown ERPs\n→ new rule: unknown ERP = discovery first + 1.5× estimate')
      ],
      practice: [
        B('اكتب مراحل التسليم بقوالب.', 'Write the delivery stages with templates.'),
        B('اكتب definition of done لوكالتك.', 'Write your agency’s definition of done.'),
        B('سجّل تقدير مقابل فعلي لآخر 3 مشاريع.', 'Log estimate vs actual for your last 3 projects.'),
        B('اعمل retrospective لمشروع.', 'Hold a retrospective for a project.')
      ],
      words: [
        W('definition of done', 'شروط اعتبار الشغل خلصان', 'the conditions for calling work finished', 'The definition of done includes a Loom.'),
        W('delivery checklist', 'قايمة ثابتة لكل تسليم', 'a fixed list for every delivery', 'Follow the delivery checklist.'),
        W('uat', 'تجربة العميل وقبوله قبل التشغيل', 'the client’s testing and acceptance before go-live', 'UAT uses 20 real cases.'),
        W('hypercare', 'فترة مراقبة مكثفة بعد التشغيل', 'a period of close monitoring after go-live', 'Hypercare lasts two weeks.'),
        W('estimate accuracy', 'دقة التقدير مقابل الفعلي', 'how close estimates are to actuals', 'Track estimate accuracy per project type.'),
        W('retrospective', 'مراجعة بعد المشروع للتحسين', 'a review after a project to improve', 'The retrospective changed our template.')
      ],
      read: [{ t: 'Atlassian: Definition of done', url: 'https://www.atlassian.com/agile/project-management/definition-of-done', what: B('اقرا الأمثلة.', 'Read the examples.') }],
      challenge: B('اعمل «دليل التسليم» لوكالتك: المراحل بقوالب (kickoff، design doc، UAT sign-off، go-live plan)، definition of done، سجل تقديرات، وقالب retrospective — وطبّقه على المشروع الجاي.', 'Create a «delivery playbook» for your agency: stages with templates (kickoff, design doc, UAT sign-off, go-live plan), a definition of done, an estimates log and a retrospective template — and apply it to the next project.'),
      quiz: [
        Q(B('workflow اشتغل مرة:', 'A workflow ran once:'), [['مش خلصان لحد ما DoD يكمل', 'not done until the DoD is met'], ['خلص', 'done'], ['انشره', 'ship it']], 0, B('جودة.', 'Quality.')),
        Q(B('العميل بيجرّب قبل التشغيل:', 'The client tests before go-live:'), [['UAT', 'UAT'], ['hypercare', 'hypercare'], ['retainer', 'retainer']], 0, B('قبول.', 'Acceptance.')),
        Q(B('بتقلل تقدير مشاريع ERP دايمًا:', 'You always underestimate ERP projects:'), [['عدّل القاعدة من السجل', 'adjust the rule from the log'], ['اشتغل أسرع', 'work faster'], ['اقبل الخسارة', 'accept the loss']], 0, B('تعلّم.', 'Learn.'))
      ] },

    { title: B('أرقام الوكالة', 'The agency’s numbers'),
      goal: B('وكالة بتكسب فعلًا مش بس مشغولة.', 'An agency that actually profits, not just stays busy.'),
      learn: [
        L(B('الهامش والاستغلال', 'Margin and utilisation'),
          B('**gross margin** = (الإيراد − تكلفة التنفيذ) ÷ الإيراد — للخدمات هدف 50–70%. **utilization** = الساعات المدفوعة ÷ الساعات المتاحة (60–75% صحي؛ 100% = مفيش وقت للمبيعات والتطوير). مشروع «كبير» بهامش 15% أسوأ من صغير بـ 60%.', '**gross margin** = (revenue − delivery cost) ÷ revenue — for services aim for 50–70%. **utilization** = billable hours ÷ available hours (60–75% is healthy; 100% = no time for sales and improvement). A «big» project at 15% margin is worse than a small one at 60%.'),
          'September\nrevenue            92,000 EGP (projects 54,000 · care plans 38,000)\ndelivery cost      35,000 (team time 29,000 · tools/hosting 6,000)\ngross margin       62% ✓\nutilisation        Sara 71% · Omar 84% (overloaded) · junior 48% (needs projects)\nrecurring share    41% of revenue (target 50% — sell more care plans)'),
        L(B('التدفق النقدي', 'Cash flow'),
          B('**cash flow**: الوكالات بتقفل بسبب الفلوس اللي متأخرة مش بسبب الخسارة. مقدمات (40%)، دفعات على مراحل، فواتير الصيانة أول الشهر، متابعة الفواتير المتأخرة آليًا (n8n!)، واحتياطي 3 شهور مصاريف. والمشاريع بمدد دفع 60 يوم محتاجة سعر أعلى.', '**cash flow**: agencies die from late money, not losses. Deposits (40%), milestone payments, care-plan invoices at the start of the month, automatic chasing of late invoices (n8n!), and a 3-month expense reserve. Projects with 60-day payment terms need a higher price.'),
          'n8n "accounts receivable"\nevery morning → invoices due/overdue from the accounting app\n+3 days overdue → friendly reminder email · +10 → second reminder + WhatsApp to the contact\n+20 → pause non-critical work (per contract) + call · weekly: cash forecast for 90 days'),
        L(B('الفريق والعقود', 'The team and contracts'),
          B('لما تكبر: أدوار واضحة (مبيعات، تسليم، دعم)، توظيف juniors بتدريب (الرحلة دي نفسها!) ومراجعة شغلهم، وقوالب. وقانونيًا: **master services agreement** (MSA) واحد مع كل عميل وتحته SOWs، فيه **liability cap** (المسؤولية القصوى = مثلًا قيمة آخر 12 شهر)، الملكية الفكرية، السرية، والإنهاء — بمراجعة محامي.', 'As you grow: clear roles (sales, delivery, support), hiring juniors with training (this very journey!) and reviewing their work, and templates. Legally: one **master services agreement** (MSA) per client with SOWs under it, including a **liability cap** (maximum liability = e.g. the last 12 months’ fees), intellectual property, confidentiality and termination — reviewed by a lawyer.'),
          'MSA (once per client, lawyer-reviewed)\n- services under SOWs · change control · acceptance\n- fees, invoicing, late payment, suspension rights\n- IP: client owns workflows built for them; agency keeps reusable templates/know-how\n- confidentiality + DPA annex (week 42)\n- liability cap: fees paid in the last 12 months; no indirect losses\n- term & termination: 30 days’ notice; handover assistance (paid)')
      ],
      practice: [
        B('احسب gross margin وutilization لشهرك.', 'Calculate your month’s gross margin and utilisation.'),
        B('اعمل workflow متابعة فواتير متأخرة.', 'Build an overdue-invoice workflow.'),
        B('اعمل توقع cash لـ 90 يوم.', 'Make a 90-day cash forecast.'),
        B('اقرا نموذج MSA وعلّم الأقسام المهمة.', 'Read an MSA template and mark the key sections.')
      ],
      words: [
        W('gross margin', 'نسبة الربح بعد تكلفة التنفيذ', 'the profit share after delivery cost', 'Gross margin was 62%.'),
        W('utilization', 'نسبة الساعات المدفوعة', 'the share of billable hours', 'Omar’s utilization is too high.'),
        W('cash flow', 'حركة الفلوس الداخلة والخارجة', 'the movement of money in and out', 'Late invoices hurt cash flow.'),
        W('master services agreement', 'عقد إطاري واحد مع العميل', 'one framework contract with a client', 'Each SOW sits under the master services agreement.'),
        W('liability cap', 'الحد الأقصى للمسؤولية', 'the maximum liability', 'The liability cap is 12 months of fees.')
      ],
      read: [{ t: 'Wikipedia: Gross margin', url: 'https://en.wikipedia.org/wiki/Gross_margin', what: B('اقرا التعريف والمثال.', 'Read the definition and example.') }],
      challenge: B('اعمل «لوحة الوكالة»: إيراد (مشاريع/صيانة)، gross margin، utilization لكل شخص، فواتير متأخرة، cash لـ 90 يوم — متحدثة آليًا بـ n8n من أداة المحاسبة وتتبع الوقت.', 'Build an «agency dashboard»: revenue (projects/care plans), gross margin, utilisation per person, overdue invoices and a 90-day cash view — updated automatically by n8n from the accounting and time-tracking tools.'),
      quiz: [
        Q(B('utilization 100%:', '100% utilisation:'), [['مفيش وقت مبيعات وتطوير', 'no time for sales and improvement'], ['مثالي', 'ideal'], ['مستحيل', 'impossible']], 0, B('60–75%.', '60–75%.')),
        Q(B('الوكالات بتقفل غالبًا بسبب:', 'Agencies usually die from:'), [['فلوس متأخرة', 'late money'], ['مشاريع صغيرة', 'small projects'], ['n8n', 'n8n']], 0, B('cash flow.', 'Cash flow.')),
        Q(B('liability cap:', 'A liability cap:'), [['حد أقصى للمسؤولية في العقد', 'a contractual maximum liability'], ['خصم', 'a discount'], ['سعر الساعة', 'the hourly rate']], 0, B('حماية.', 'Protection.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('وكالة مستقرة بدخل متكرر وجودة ثابتة.', 'A stable agency with recurring income and steady quality.'),
      review: [
        B('باقات الصيانة والتقرير الشهري والدخل المتكرر.', 'Care plans, the monthly report and recurring revenue.'),
        B('SLA: severity matrix والرد والحل والساعات والتعويض والاستثناءات.', 'The SLA: severity matrix, response, resolution, hours, credits and exclusions.'),
        B('wiki العميل والـ catalogue والـ conventions والـ Loom والتسليم والخروج.', 'The client wiki, catalogue, conventions, Looms, handover and offboarding.'),
        B('مراحل التسليم وDoD وUAT وhypercare والتقديرات.', 'Delivery stages, DoD, UAT, hypercare and estimates.'),
        B('الهامش والاستغلال والتدفق النقدي والـ MSA.', 'Margin, utilisation, cash flow and the MSA.')
      ],
      project: B('ابني «نظام تشغيل الوكالة»: 3 باقات صيانة بتقرير شهري آلي، SLA بنظام تذاكر بيقيس الرد، wiki عميل كامل بقوالب، دليل تسليم بـ DoD، workflow فواتير متأخرة، ولوحة أرقام (هامش، استغلال، cash) — كله مبني بـ n8n وأدوات مجانية.', 'Build an «agency operating system»: 3 care plans with an automatic monthly report, an SLA with a ticket system measuring response, a full client wiki with templates, a delivery playbook with a DoD, an overdue-invoices workflow, and a numbers dashboard (margin, utilisation, cash) — all built with n8n and free tools.'),
      test: [
        Q(B('باقة الصيانة بتغطي:', 'A care plan covers:'), [['مراقبة وتحديثات وتصليحات وتقرير', 'monitoring, updates, fixes and a report'], ['مشاريع جديدة مجانًا', 'free new projects'], ['لا شيء', 'nothing']], 0, B('راحة بال.', 'Peace of mind.')),
        Q(B('التقرير الشهري فيه:', 'The monthly report contains:'), [['أرقام بيزنس وصحة وإنجازات وتوصيات', 'business numbers, health, work done and recommendations'], ['فاتورة بس', 'only an invoice'], ['لوج كامل', 'full logs']], 0, B('قيمة.', 'Value.')),
        Q(B('SEV1:', 'SEV1:'), [['الخدمة الأساسية واقفة', 'the core flow is down'], ['تقرير متأخر', 'a late report'], ['سؤال', 'a question']], 0, B('أعلى.', 'Highest.')),
        Q(B('service credit:', 'A service credit:'), [['خصم لو الـ SLA متحققش', 'a discount when the SLA is missed'], ['هدية', 'a gift'], ['غرامة مفتوحة', 'an open-ended penalty']], 0, B('محدود.', 'Bounded.')),
        Q(B('ميزة جديدة يطلبها عميل صيانة:', 'A new feature from a care-plan client:'), [['change request (أو ساعات التحسين)', 'a change request (or improvement hours)'], ['ضمن SLA مجانًا', 'free within the SLA'], ['ارفض', 'refuse']], 0, B('نطاق.', 'Scope.')),
        Q(B('workflow catalogue:', 'A workflow catalogue:'), [['كل workflow بوظيفته وتريجره وصاحبه', 'every workflow with its job, trigger and owner'], ['كود', 'code'], ['كلمات سر', 'passwords']], 0, B('مرجع.', 'Reference.')),
        Q(B('اسم node كويس:', 'A good node name:'), [['Get order lines (Shopify)', 'Get order lines (Shopify)'], ['HTTP Request3', 'HTTP Request3'], ['node', 'node']], 0, B('وضوح.', 'Clarity.')),
        Q(B('hypercare:', 'Hypercare:'), [['مراقبة مكثفة بعد التشغيل', 'close monitoring after go-live'], ['خصم', 'a discount'], ['تدريب', 'training']], 0, B('أسبوعين.', 'Two weeks.')),
        Q(B('سجل تقدير مقابل فعلي:', 'An estimate-vs-actual log:'), [['بيصلّح أسعارك', 'fixes your prices'], ['ملوش لازمة', 'is pointless'], ['للعميل', 'is for the client']], 0, B('تعلّم.', 'Learning.')),
        Q(B('هامش خدمات صحي:', 'A healthy services margin:'), [['50–70%', '50–70%'], ['5%', '5%'], ['100%', '100%']], 0, B('ربح.', 'Profit.')),
        Q(B('فواتير متأخرة:', 'Late invoices:'), [['متابعة آلية بـ n8n', 'automatic chasing with n8n'], ['استنى', 'wait'], ['انسى', 'forget']], 0, B('cash.', 'Cash.')),
        Q(B('عقد إطاري وتحته نطاقات:', 'A framework contract with scopes under it:'), [['MSA + SOWs', 'MSA + SOWs'], ['SLA بس', 'only an SLA'], ['إيميل', 'an email']], 0, B('قانوني.', 'Legal.'))
      ] }
  ]
};
