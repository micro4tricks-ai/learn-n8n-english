// n8n week 47 — Leading, teaching and templates.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('القيادة والتعليم والقوالب', 'Leading, teaching and templates'),
  goal: B('تضاعف أثرك من خلال الناس والأدوات: تقود فريق أتمتة بمعايير ومراجعة وتوجيه، تعلّم موظفي العملاء يبنوا بأمان، تبني مكتبة قوالب وsub-workflows بتتعاد، تحط حوكمة للـ citizen developers، وتبني اسمك في مجتمع n8n.',
          'Multiply your impact through people and tools: lead an automation team with standards, review and mentoring, teach clients’ staff to build safely, build a library of reusable templates and sub-workflows, set governance for citizen developers, and build your name in the n8n community.'),
  days: [
    { title: B('قيادة فريق أتمتة', 'Leading an automation team'),
      goal: B('فريق بيشتغل بنفس الجودة من غيرك.', 'A team that works at the same quality without you.'),
      learn: [
        L(B('المعايير', 'Standards'),
          B('**engineering standards** مكتوبة (صفحة أو اتنين): التسمية والـ tags، error handling، retries، الأسرار، الـ environments، الـ DoD (أسبوع 46)، والـ linter (أسبوع 38). المعايير بتشيل النقاش من «ذوق كل واحد» وبتخلّي المراجعة سريعة. وحدّثها لما الفريق يتعلم حاجة جديدة.', 'Written **engineering standards** (a page or two): naming and tags, error handling, retries, secrets, environments, the DoD (week 46) and the linter (week 38). Standards take the debate out of «personal taste» and make review fast. Update them when the team learns something new.'),
          'Automation standards v3 (1 page)\n1. names: "[Client] Verb Object (env)" · tags: client, owner, sev, pii\n2. every external call: timeout, retry 3× with backoff, error output handled\n3. every workflow: error workflow set · idempotent on webhooks (dedupe key)\n4. secrets only in credentials/vault · no URLs typed in nodes ($vars)\n5. DoD + linter before review · Loom for SEV1/SEV2 workflows'),
        L(B('ثقافة المراجعة', 'A review culture'),
          B('**review culture**: كل workflow مهم بيعدّي على عين تانية قبل الإنتاج — مش عشان «نمسك غلط» لكن عشان نتعلم من بعض ونوزّع المعرفة. المراجعة تركّز على: الصحة، الأمان، الأخطاء، الوضوح. واطلب من الـ juniors يراجعوا شغلك كمان — بيتعلموا أسرع.', 'A **review culture**: every important workflow passes a second pair of eyes before production — not «to catch mistakes» but to learn from each other and spread knowledge. Review focuses on: correctness, security, errors, clarity. And ask juniors to review your work too — they learn faster.'),
          'review comment style\n✗ "this is wrong"\n✓ "If the CRM returns 429 here, the item is lost — could we route the error output to the retry queue?"\n✓ "Nice use of the dedupe key 👍 — let us add it to the template library."\nrule: approve or comment within one working day'),
        L(B('التوجيه والتفويض', 'Mentoring and delegating'),
          B('**mentoring** الـ juniors: مشروع بحجمهم، **pair building** (تبنوا مع بعض ساعة)، أسئلة بدل إجابات («تفتكر هيحصل إيه لو الـ API وقع؟»)، و**one-on-one** أسبوعي 30 دقيقة. و**delegation**: سلّم النتيجة مش الخطوات («العميل محتاج فواتير تتبعت قبل 5 دقايق من الدفع») وراجع النقط المهمة بس.', '**mentoring** juniors: a project their size, **pair building** (build together for an hour), questions instead of answers («what do you think happens if the API goes down?»), and a weekly 30-minute **one-on-one**. And **delegation**: hand over the outcome, not the steps («the client needs invoices sent within 5 minutes of payment») and review only the critical points.'),
          'junior growth plan (12 weeks)\nweeks 1–4: this site’s n8n journey months 1–3 + shadow 2 client calls\nweeks 5–8: build one SEV3 workflow end to end with pair sessions\nweeks 9–12: own a client’s care plan with weekly review\none-on-one: what went well · where stuck · one skill to grow next week')
      ],
      practice: [
        B('اكتب معايير فريقك في صفحة.', 'Write your team’s standards on one page.'),
        B('راجع workflow زميل بأسلوب السؤال.', 'Review a colleague’s workflow in the question style.'),
        B('اعمل خطة نمو لـ junior.', 'Draft a growth plan for a junior.'),
        B('فوّض مهمة بالنتيجة مش الخطوات.', 'Delegate a task by outcome, not steps.')
      ],
      words: [
        W('engineering standards', 'قواعد الشغل المكتوبة للفريق', 'the team’s written ways of working', 'Our engineering standards fit on one page.'),
        W('review culture', 'عادة المراجعة للتعلم والجودة', 'a habit of reviewing for learning and quality', 'A healthy review culture spreads knowledge.'),
        W('mentoring', 'توجيه حد أقل خبرة', 'guiding someone less experienced', 'Mentoring juniors takes an hour a week.'),
        W('pair building', 'بناء workflow مع زميل مع بعض', 'building a workflow together with a colleague', 'Pair building fixed the design fast.'),
        W('delegation', 'تسليم مسؤولية نتيجة لحد', 'handing someone responsibility for an outcome', 'Good delegation states the outcome.'),
        W('one-on-one', 'اجتماع أسبوعي فردي مع عضو الفريق', 'a weekly individual meeting with a team member', 'Ask about blockers in the one-on-one.')
      ],
      read: [{ t: 'Google re:Work: Manager guides', url: 'https://rework.withgoogle.com/intl/en/guides', what: B('اقرا Coaching.', 'Read Coaching.') }],
      challenge: B('اكتب «دليل الفريق»: معايير صفحة، أسلوب المراجعة بأمثلة، خطة نمو junior لـ 12 أسبوع، وقالب one-on-one — وطبّقه أسبوعين على فريقك (أو مع زميل).', 'Write a «team handbook»: one-page standards, the review style with examples, a 12-week junior growth plan and a one-on-one template — and apply it for two weeks with your team (or a colleague).'),
      quiz: [
        Q(B('فايدة المعايير المكتوبة:', 'The value of written standards:'), [['مراجعة أسرع ومفيش نقاش ذوق', 'faster reviews, no taste debates'], ['بيروقراطية', 'bureaucracy'], ['مش مهمة', 'none']], 0, B('اتفاق.', 'Agreement.')),
        Q(B('تعليق مراجعة كويس:', 'A good review comment:'), [['بيشرح الخطر ويقترح', 'explains the risk and suggests'], ['«غلط»', '«wrong»'], ['مفيش تعليق', 'no comment']], 0, B('تعلّم.', 'Learning.')),
        Q(B('تفويض كويس:', 'Good delegation:'), [['النتيجة والمعايير', 'the outcome and the standards'], ['كل خطوة بالتفصيل', 'every step in detail'], ['من غير متابعة خالص', 'no follow-up at all']], 0, B('ثقة.', 'Trust.'))
      ] },

    { title: B('تعليم موظفي العملاء', 'Teaching clients’ staff'),
      goal: B('موظفين العميل يبنوا أتمتة بسيطة بأمان.', 'Clients’ staff build simple automations safely.'),
      learn: [
        L(B('الـ citizen developers', 'Citizen developers'),
          B('**citizen developer** = موظف مش مبرمج (محاسب، مسؤول عمليات) بيبني أتمتة لنفسه. ده فرصة (العميل ينمو، وانت بتبيع تدريب ودعم) وخطر (workflows بأسرار مكشوفة، من غير أخطاء). دورك: تعلّمهم البناء الصح وتحط حدود (يوم 4).', 'A **citizen developer** = a non-programmer employee (an accountant, an operations officer) building automations for themselves. An opportunity (the client grows, and you sell training and support) and a risk (workflows with exposed secrets and no error handling). Your role: teach them to build properly and set limits (day 4).'),
          'who to train first: people with repetitive work + curiosity (ops, finance, support leads)\nwhat they build: personal/team automations (reports, reminders, sheet updates)\nwhat they do not build alone: payments, customer-facing messages, anything touching PII at scale'),
        L(B('ورشة عملية', 'A practical workshop'),
          B('**workshop** فعّال: قصير (3 ساعات × 3 أيام أحسن من يوم كامل)، **hands-on lab** على مشاكلهم الحقيقية (مش أمثلة عامة)، كل واحد بيطلع بـ workflow شغال لشغله، وورقة «إزاي أطلب مساعدة». واستخدم الرحلة دي (الأسابيع الأولى) كمادة متابعة.', 'An effective **workshop**: short (3 hours × 3 days beats one full day), a **hands-on lab** on their real problems (not generic examples), each person leaves with a working workflow for their job, and a «how to ask for help» sheet. Use this journey (the early weeks) as follow-up material.'),
          'Workshop "n8n for operations teams" — 3 × 3 h\nday 1: what to automate · triggers, Edit Fields, IF · lab: daily orders email from a sheet\nday 2: HTTP Request, credentials, error workflow · lab: their own report automation\nday 3: safe building (standards light), sharing, asking for review · lab: present + review\nfollow-up: weekly 30-min office hours for 1 month · learning path = this site’s n8n months 1–3'),
        L(B('قياس التعلم', 'Measuring learning'),
          B('التدريب الكويس بيتقاس بالنتيجة: كام workflow اتبنى بعده وبيشتغل بعد شهر، كام ساعة اتوفرت، وجودة الشغل (عدّى المراجعة؟). اعمل **learning path** بمستويات (مبتدئ ← مستقل ← مراجِع) وشهادة داخلية، و**training plan** للعميل كخدمة ربع سنوية.', 'Good training is measured by results: how many workflows were built afterwards and still run a month later, how many hours saved, and work quality (did it pass review?). Create a **learning path** with levels (beginner → independent → reviewer) and an internal certificate, and a **training plan** for the client as a quarterly service.'),
          'training results (after 30 days)\nparticipants 8 · workflows built 11 · still running 9 (82%)\nhours saved (self-reported, checked) ≈ 46 h/month\nreview pass rate first time 55% → common gaps: error workflow, naming\nnext quarter: level 2 (APIs + sub-workflows) for 4 people')
      ],
      practice: [
        B('حدد 3 أشخاص مناسبين عند عميل.', 'Identify 3 suitable people at a client.'),
        B('صمّم ورشة 3 × 3 ساعات بـ labs حقيقية.', 'Design a 3 × 3-hour workshop with real labs.'),
        B('اعمل ورقة «إزاي أطلب مساعدة».', 'Create a «how to ask for help» sheet.'),
        B('حدد مقاييس نجاح التدريب.', 'Define the training’s success measures.')
      ],
      words: [
        W('citizen developer', 'موظف مش مبرمج بيبني أتمتة', 'a non-programmer employee who builds automations', 'The accountant became a citizen developer.'),
        W('workshop', 'ورشة تدريب عملية', 'a practical training session', 'The workshop runs over three mornings.'),
        W('hands-on lab', 'تمرين عملي على مشكلة حقيقية', 'a practical exercise on a real problem', 'Each hands-on lab uses their own sheet.'),
        W('learning path', 'مسار تعلم بمستويات', 'a learning route with levels', 'The learning path ends at reviewer level.'),
        W('training plan', 'خطة تدريب للفريق', 'a training plan for a team', 'Sell a quarterly training plan.')
      ],
      read: [{ t: 'n8n Learn: courses', url: 'https://learn.n8n.io/', what: B('مادة رسمية تبني عليها.', 'Official material to build on.') }],
      challenge: B('نفّذ ورشة (حتى لـ 2 أشخاص): 3 جلسات بـ labs من شغلهم، ورقة مساعدة، office hours أسبوعية — وبعد شهر قيس: workflows شغالة، ساعات اتوفرت، ونسبة النجاح في المراجعة.', 'Run a workshop (even for 2 people): 3 sessions with labs from their own work, a help sheet, weekly office hours — and after a month measure: running workflows, hours saved and the review pass rate.'),
      quiz: [
        Q(B('citizen developers:', 'Citizen developers:'), [['فرصة وخطر محتاج حدود', 'an opportunity and a risk needing limits'], ['ممنوعين', 'forbidden'], ['مش مهمين', 'unimportant']], 0, B('توازن.', 'Balance.')),
        Q(B('أحسن تمارين الورشة:', 'The best workshop exercises:'), [['مشاكلهم الحقيقية', 'their real problems'], ['أمثلة عامة', 'generic examples'], ['محاضرة', 'a lecture']], 0, B('عملي.', 'Practical.')),
        Q(B('نجاح التدريب بيتقاس بـ:', 'Training success is measured by:'), [['workflows شغالة بعد شهر', 'workflows still running a month later'], ['عدد الشرايح', 'slide count'], ['الحضور بس', 'attendance only']], 0, B('نتيجة.', 'Results.'))
      ] },

    { title: B('مكتبة القوالب', 'The template library'),
      goal: B('متبنيش نفس الحاجة مرتين.', 'Never build the same thing twice.'),
      learn: [
        L(B('sub-workflows قابلة لإعادة الاستخدام', 'Reusable sub-workflows'),
          B('**reusable sub-workflow** = workflow صغير بمدخلات ومخرجات واضحة بيتنادى من أي مكان (Execute Workflow): «ابعت تنبيه» (Telegram/Slack حسب الإعداد)، «طبّع تليفون مصري/سعودي»، «retry مع dead letter»، «سجّل في الـ audit». تصليح واحد = كل الـ workflows اتصلحت.', 'A **reusable sub-workflow** = a small workflow with clear inputs and outputs called from anywhere (Execute Workflow): «send alert» (Telegram/Slack per setting), «normalise an Egyptian/Saudi phone», «retry with dead letter», «write to the audit log». One fix = every workflow fixed.'),
          'lib/ (a project of shared workflows, read-only for most)\nlib · notify          in: { level, text, client } → routes to the client’s channel\nlib · normalize phone in: { phone, country }        → { e164, valid }\nlib · dead letter     in: { workflow, item, error }  → table + alert + replay link\nlib · audit           in: { actor, action, ref }     → append-only table\nversioned by name suffix: "lib · notify v2" (v1 kept until all callers move)'),
        L(B('مكتبة القوالب الداخلية', 'The internal template library'),
          B('**template library**: workflows كاملة نظيفة بتبدأ منها مشاريع شبه بعض («طلبات Shopify ← فاتورة»، «leads ← CRM ← متابعة»، «تقرير يومي»)، بـ sticky notes «غيّر هنا»، وcredentials placeholders، وREADME. كل مشروع ناجح = قالب جديد (بعد ما تشيل أي بيانات عميل).', 'A **template library**: complete clean workflows to start similar projects from («Shopify orders → invoice», «leads → CRM → follow-up», «daily report»), with «change here» sticky notes, credential placeholders and a README. Every successful project = a new template (after removing any client data).'),
          'templates/\n  shop-orders-to-invoice/   workflow.json · README.md (setup in 30 min) · test-cases/ · loom.txt\n  lead-capture-crm/         …\n  daily-kpi-report/         …\nrule: before saving a template — remove client names, URLs, ids, pinned data; keep placeholders'),
        L(B('النشر في مجتمع n8n', 'Publishing to the n8n community'),
          B('n8n عنده **creator hub** (صفحة قوالب n8n.io) — انشر قوالب مجانية من شغلك (من غير بيانات عملاء): بتجيب عملاء (lead magnet — أسبوع 45)، وبتبني سمعة، وممكن تبيع قوالب premium. القالب المنشور لازم يكون نضيف وموثّق وبيشتغل من أول مرة.', 'n8n has a **creator hub** (the n8n.io templates page) — publish free templates from your work (without client data): they bring clients (a lead magnet — week 45), build reputation, and you may sell premium templates. A published template must be clean, documented and work the first time.'),
          'publishing checklist\n[ ] works on a fresh n8n with only the credentials it lists\n[ ] sticky notes: what it does · setup steps · what to change\n[ ] no secrets, no client data, no hard-coded ids\n[ ] clear title: "Send PDF invoices for new Shopify orders via WhatsApp"\n[ ] a 60-second demo video · link back to your site')
      ],
      practice: [
        B('اعمل 3 sub-workflows مكتبة (notify، phone، dead letter).', 'Build 3 library sub-workflows (notify, phone, dead letter).'),
        B('حوّل مشروع ناجح لقالب نضيف.', 'Turn a successful project into a clean template.'),
        B('اكتب README «setup في 30 دقيقة».', 'Write a «setup in 30 minutes» README.'),
        B('انشر قالب مجاني على n8n.io.', 'Publish a free template on n8n.io.')
      ],
      words: [
        W('reusable sub-workflow', 'workflow صغير بيتنادى من أماكن كتير', 'a small workflow called from many places', 'The reusable sub-workflow sends alerts.'),
        W('template library', 'مكتبة workflows جاهزة للبدء منها', 'a library of ready workflows to start from', 'Start from the template library.'),
        W('workflow template', 'workflow جاهز قابل للتعديل', 'a ready, adaptable workflow', 'The workflow template saves two days.'),
        W('creator hub', 'منصة n8n لنشر القوالب', 'n8n’s platform for publishing templates', 'We published three on the creator hub.'),
        W('setup readme', 'ملف شرح تجهيز القالب', 'a file explaining how to set up a template', 'The setup README takes 30 minutes to follow.')
      ],
      read: [{ t: 'n8n: Workflow templates', url: 'https://n8n.io/workflows/', what: B('شوف أحسن القوالب وإزاي متوثّقة.', 'See the best templates and how they are documented.') }, { t: 'n8n: Creators', url: 'https://n8n.io/creators/', what: B('اقرا إزاي تبقى creator.', 'Read how to become a creator.') }],
      challenge: B('ابني «مكتبة الوكالة»: project lib بـ 4 sub-workflows بإصدارات، 3 قوالب كاملة بـ README وtest cases، وانشر قالب واحد مجاني على n8n.io بفيديو 60 ثانية.', 'Build the «agency library»: a lib project with 4 versioned sub-workflows, 3 complete templates with READMEs and test cases, and publish one free template on n8n.io with a 60-second video.'),
      quiz: [
        Q(B('ميزة sub-workflow مكتبة:', 'The benefit of a library sub-workflow:'), [['تصليح واحد لكل الـ workflows', 'one fix for every workflow'], ['أبطأ', 'slower'], ['أعقد', 'more complex']], 0, B('إعادة استخدام.', 'Reuse.')),
        Q(B('قبل حفظ قالب:', 'Before saving a template:'), [['شيل بيانات العميل والـ ids', 'remove client data and ids'], ['سيب كل حاجة', 'keep everything'], ['شفّره', 'encrypt it']], 0, B('نضافة.', 'Clean.')),
        Q(B('قالب منشور لازم:', 'A published template must:'), [['يشتغل من أول مرة وموثّق', 'work first time and be documented'], ['فيه credentials', 'include credentials'], ['معقد', 'be complex']], 0, B('جودة.', 'Quality.'))
      ] },

    { title: B('الحوكمة', 'Governance'),
      goal: B('العميل يبني كتير من غير فوضى.', 'The client builds a lot without chaos.'),
      learn: [
        L(B('مين يبني إيه', 'Who builds what'),
          B('**governance** = قواعد بتسمح بالسرعة والأمان مع بعض. مستويات: «شخصي» (citizen developers يبنوا بحرية في project خاص، من غير بيانات حساسة)، «فريق» (مراجعة قبل التشغيل)، «حرج» (فريق الأتمتة بس + كل المعايير). **review gate** بين كل مستوى والتاني.', '**governance** = rules allowing speed and safety together. Levels: «personal» (citizen developers build freely in a personal project, without sensitive data), «team» (review before go-live), «critical» (the automation team only + all standards). A **review gate** between each level.'),
          'tier        who builds           data allowed            gate to production\npersonal    anyone trained       own data, no PII        none (personal project, no external sharing)\nteam        trained + reviewer   team data, limited PII   peer review + error workflow\ncritical    automation team      payments, PII at scale  full DoD, staging, smoke tests, owner sign-off'),
        L(B('مركز التميّز', 'A centre of excellence'),
          B('في الشركات الكبيرة: **center of excellence** صغير (2–4 أشخاص) بيمسك المنصة (n8n نفسه)، المعايير، المكتبة، التدريب، المراجعة، ورصد الاستخدام. مش «بوليس» — خدمة بتسهّل على الناس يبنوا صح. وده دور ممكن وكالتك تلعبه للعميل كخدمة.', 'In large companies: a small **center of excellence** (2–4 people) owns the platform (n8n itself), the standards, the library, training, reviews and usage monitoring. Not «police» — a service making it easy to build right. And your agency can play this role for a client as a service.'),
          'CoE services (monthly)\n- platform: n8n upgrades, security, backups (weeks 41–43)\n- enablement: workshops, office hours, the template library\n- review: team-tier workflows within 2 days\n- insight: usage report — 64 active workflows, 22 builders, top time savers, risky patterns found'),
        L(B('رصد الاستخدام', 'Watching usage'),
          B('الحوكمة الكويسة بتشوف من غير ما توقف: workflow إداري (أسبوع 38) بيطلّع: مين بيبني، workflows جديدة الأسبوع ده، أنماط خطر (webhook من غير auth، بيانات شخصية في project شخصي، HTTP لعناوين غريبة) — ويبعت للـ CoE يتواصلوا بلطف ويساعدوا.', 'Good governance watches without blocking: an admin workflow (week 38) reports who is building, new workflows this week, and risky patterns (an unauthenticated webhook, personal data in a personal project, HTTP calls to odd addresses) — and sends them to the CoE to reach out kindly and help.'),
          'weekly governance digest\nnew workflows: 7 (personal 5 · team 2)\n⚠ "Sales sheet → WhatsApp" in a personal project sends to customers → move to team tier + review\n⚠ webhook without authentication in "Leads intake (Mona)" → offer the template with header auth\n👏 "Invoice reminder (Karim)" saves ~6 h/week → candidate for the template library')
      ],
      practice: [
        B('اكتب جدول مستويات الحوكمة لعميل.', 'Write a governance tiers table for a client.'),
        B('حدد review gates بين المستويات.', 'Define the review gates between tiers.'),
        B('اعمل workflow ملخص حوكمة أسبوعي.', 'Build a weekly governance digest workflow.'),
        B('صمّم خدمة CoE كعرض شهري.', 'Design a CoE service as a monthly offer.')
      ],
      words: [
        W('governance', 'قواعد السرعة والأمان مع بعض', 'rules for speed and safety together', 'Governance lets staff build safely.'),
        W('review gate', 'مراجعة لازمة قبل الانتقال لمستوى أعلى', 'a review required before moving up a tier', 'Team workflows pass a review gate.'),
        W('center of excellence', 'فريق صغير بيمكّن الشركة من الأتمتة', 'a small team enabling a company’s automation', 'The center of excellence runs office hours.'),
        W('usage report', 'تقرير مين بيستخدم وبيبني إيه', 'a report of who uses and builds what', 'The usage report found 22 builders.'),
        W('risky pattern', 'نمط بناء فيه خطر', 'a building pattern carrying risk', 'An open webhook is a risky pattern.')
      ],
      read: [{ t: 'Microsoft: Power Platform CoE (an example of governance)', url: 'https://learn.microsoft.com/en-us/power-platform/guidance/coe/starter-kit', what: B('أفكار تنطبق على n8n.', 'Ideas that apply to n8n.') }],
      challenge: B('اكتب «إطار حوكمة» لشركة عميل: 3 مستويات بحدود البيانات والـ gates، دور CoE، ملخص أسبوعي آلي بالأنماط الخطرة، وخطة تواصل لطيفة مع البنّائين.', 'Write a «governance framework» for a client company: 3 tiers with data limits and gates, the CoE’s role, an automatic weekly digest of risky patterns, and a friendly outreach plan for builders.'),
      quiz: [
        Q(B('موظف بيبعت رسايل لعملاء من project شخصي:', 'An employee messaging customers from a personal project:'), [['انقله لمستوى فريق بمراجعة', 'move it to the team tier with review'], ['امسحه فورًا', 'delete it at once'], ['تجاهل', 'ignore']], 0, B('gate.', 'Gate.')),
        Q(B('الـ CoE:', 'The CoE:'), [['خدمة بتسهّل البناء الصح', 'a service making right-building easy'], ['بوليس', 'police'], ['مالوش لازمة', 'pointless']], 0, B('تمكين.', 'Enablement.')),
        Q(B('الحوكمة الكويسة:', 'Good governance:'), [['بتشوف وتساعد من غير ما توقف', 'watches and helps without blocking'], ['بتمنع كل حاجة', 'blocks everything'], ['مش موجودة', 'does not exist']], 0, B('توازن.', 'Balance.'))
      ] },

    { title: B('المجتمع واسمك', 'The community and your name'),
      goal: B('تبني سمعة بتجيبلك فرص من غير ما تدوّر.', 'Build a reputation that brings opportunities without searching.'),
      learn: [
        L(B('المساهمة في n8n', 'Contributing to n8n'),
          B('**contribution** للمشروع: **bug report** كويس (خطوات إعادة، إصدار، workflow مصغّر)، تصليح في الوثائق، community node مفيد، أو إجابات في **community forum**. كل مساهمة = تعلّم أعمق + اسمك قدام فريق n8n والمجتمع. وتقرير bug واحد ممتاز أحسن من 10 شكاوى.', 'A **contribution** to the project: a good **bug report** (repro steps, version, a minimal workflow), a docs fix, a useful community node, or answers in the **community forum**. Each contribution = deeper learning + your name in front of the n8n team and community. One excellent bug report beats 10 complaints.'),
          'bug report template (GitHub n8n-io/n8n)\ntitle: HTTP Request: pagination stops after page 2 when "Complete expression" uses $response.headers\nversion: 1.112.4 (self-hosted, queue mode) · Node 22 · Postgres 16\nsteps: 1) import attached workflow 2) run 3) see 2 pages instead of 7\nexpected/actual · attached: minimal workflow JSON (no secrets), screenshot\nworkaround found: …'),
        L(B('الكتابة والكلام', 'Writing and speaking'),
          B('**thought leadership** مش «أنا خبير»، هو مشاركة اللي اتعلمته بصدق: **case study write-up** (المشكلة، الحل، الأرقام، الدرس)، مقالات «إزاي حلينا X»، فيديوهات قصيرة، و**talk proposal** لـ meetup أو مؤتمر (رحلة الإنجليزي أسبوع 47). بالعربي والإنجليزي = جمهورين.', '**thought leadership** is not «I am an expert»; it is honestly sharing what you learned: a **case study write-up** (the problem, solution, numbers, lesson), «how we solved X» articles, short videos, and a **talk proposal** for a meetup or conference (English journey week 47). In Arabic and English = two audiences.'),
          'case study write-up (600 words)\nproblem: a pharmacy chain lost 15% of WhatsApp orders at night\nsolution: n8n + WhatsApp Cloud API + AI triage with pharmacist approval (diagram)\nresults: 0 lost orders · reply time 4 h → 6 min · 38 h/month saved\nlesson: human approval kept trust; dedupe saved us from double orders\n(published with the client’s written permission, numbers rounded)'),
        L(B('خطة سنة', 'A one-year plan'),
          B('السمعة بتتبني بالاستمرار مش بالانتشار المفاجئ: محتوى أسبوعي صغير، مقال/قالب شهري، talk أو ورشة كل ربع، ومساهمة مفتوحة شهرية. وقيس: عملاء جم من المحتوى، دعوات، متابعين مهتمين (مش عدد بس). وخلّيها مستدامة: ساعتين في الأسبوع أحسن من أسبوع كل سنة.', 'Reputation is built by consistency, not sudden virality: a small weekly post, a monthly article/template, a talk or workshop each quarter, and a monthly open contribution. Measure: clients who came from content, invitations, engaged followers (not just counts). And keep it sustainable: two hours a week beats one week a year.'),
          'year plan (2 h/week)\nweekly: one post/short video (AR + EN alternating)\nmonthly: one case study or free template · one forum/docs contribution\nquarterly: one talk/workshop (local meetup → online → conference)\nreview every quarter: what brought clients? double down on that')
      ],
      practice: [
        B('جاوب 3 أسئلة في community forum.', 'Answer 3 questions in the community forum.'),
        B('اكتب bug report نموذجي لمشكلة قابلتها.', 'Write a model bug report for a problem you met.'),
        B('اكتب case study 600 كلمة (بإذن العميل).', 'Write a 600-word case study (with the client’s permission).'),
        B('اعمل خطة محتوى سنة بساعتين أسبوعيًا.', 'Make a one-year content plan at two hours a week.')
      ],
      words: [
        W('community forum', 'منتدى مستخدمي n8n', 'the n8n users’ forum', 'Answer one community forum question a week.'),
        W('contribution', 'مساهمة في مشروع مفتوح', 'a contribution to an open project', 'A docs fix is a real contribution.'),
        W('bug report', 'تقرير مشكلة بخطوات إعادة', 'a problem report with repro steps', 'Attach a minimal workflow to the bug report.'),
        W('thought leadership', 'مشاركة خبرة حقيقية بتبني سمعة', 'sharing real expertise that builds reputation', 'Case studies are honest thought leadership.'),
        W('case study write-up', 'مقال قصة نجاح بالأرقام', 'an article telling a success story with numbers', 'The case study write-up brought two clients.'),
        W('talk proposal', 'اقتراح محاضرة لمؤتمر', 'a talk submission to an event', 'Send the talk proposal to the meetup.')
      ],
      read: [{ t: 'n8n Community forum', url: 'https://community.n8n.io/', what: B('ادخل وجاوب سؤال.', 'Join and answer a question.') }, { t: 'n8n: Contributing guide', url: 'https://github.com/n8n-io/n8n/blob/master/CONTRIBUTING.md', what: B('اقرا قبل أي PR.', 'Read before any PR.') }],
      challenge: B('شهر «اسمك»: 4 منشورات، case study واحدة، قالب مجاني منشور، 5 إجابات في المنتدى، وbug report أو docs fix واحد — وسجّل اللي جالك من الشهر ده.', 'A «your name» month: 4 posts, one case study, one published free template, 5 forum answers, and one bug report or docs fix — and record what came of it.'),
      quiz: [
        Q(B('bug report كويس فيه:', 'A good bug report has:'), [['خطوات إعادة وإصدار وworkflow مصغّر', 'repro steps, version and a minimal workflow'], ['«مش شغال»', '«it doesn’t work»'], ['credentials', 'credentials']], 0, B('قابل للإعادة.', 'Reproducible.')),
        Q(B('case study منشورة:', 'A published case study:'), [['بإذن العميل وأرقام مقربة', 'with the client’s permission and rounded numbers'], ['بأسماء وبيانات حقيقية من غير إذن', 'with real names and data, no permission'], ['من غير أرقام', 'without numbers']], 0, B('ثقة.', 'Trust.')),
        Q(B('السمعة بتتبني بـ:', 'Reputation is built by:'), [['استمرار صغير', 'small consistency'], ['منشور viral مرة', 'one viral post'], ['إعلانات بس', 'ads only']], 0, B('نَفَس طويل.', 'The long game.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('أثرك بقى أكبر من ساعاتك.', 'Your impact now exceeds your hours.'),
      review: [
        B('معايير الفريق وثقافة المراجعة والتوجيه والتفويض.', 'Team standards, review culture, mentoring and delegation.'),
        B('تعليم citizen developers بورش عملية وقياس النتيجة.', 'Teaching citizen developers with practical workshops and measured results.'),
        B('sub-workflows مكتبة وقوالب داخلية ونشر على n8n.io.', 'Library sub-workflows, internal templates and publishing on n8n.io.'),
        B('الحوكمة بمستويات وgates وCoE ورصد الاستخدام.', 'Governance with tiers, gates, a CoE and usage monitoring.'),
        B('المساهمة والمحتوى والسمعة بالاستمرار.', 'Contribution, content and reputation through consistency.')
      ],
      project: B('ابني «مضاعف الأثر»: دليل فريق (معايير ومراجعة وخطة junior)، ورشة 3 جلسات منفّذة بنتايج بعد شهر، مكتبة (4 sub-workflows + 3 قوالب) وقالب منشور، إطار حوكمة لعميل بملخص أسبوعي آلي، وشهر محتوى ومساهمات — مع تقرير «اللي اتغير».', 'Build an «impact multiplier»: a team handbook (standards, review, junior plan), a delivered 3-session workshop with results after a month, a library (4 sub-workflows + 3 templates) and one published template, a governance framework for a client with an automatic weekly digest, and a month of content and contributions — with a «what changed» report.'),
      test: [
        Q(B('المعايير المكتوبة:', 'Written standards:'), [['صفحة أو اتنين بتتحدث', 'a page or two, kept updated'], ['كتاب 200 صفحة', 'a 200-page book'], ['في دماغ القائد', 'in the lead’s head']], 0, B('عملي.', 'Practical.')),
        Q(B('هدف المراجعة:', 'The purpose of review:'), [['تعلّم وجودة وتوزيع معرفة', 'learning, quality and shared knowledge'], ['مسك الغلط ولوم', 'catching and blaming'], ['تأخير', 'delay']], 0, B('ثقافة.', 'Culture.')),
        Q(B('pair building:', 'Pair building:'), [['بناء مع زميل مع بعض', 'building together with a colleague'], ['مراجعة بعد التشغيل', 'review after go-live'], ['اجتماع', 'a meeting']], 0, B('توجيه.', 'Mentoring.')),
        Q(B('ورشة فعّالة:', 'An effective workshop:'), [['جلسات قصيرة بمشاكلهم الحقيقية', 'short sessions on their real problems'], ['يوم كامل محاضرة', 'a full-day lecture'], ['فيديو بس', 'a video only']], 0, B('عملي.', 'Hands-on.')),
        Q(B('citizen developer يبني لوحده:', 'A citizen developer builds alone:'), [['أتمتة شخصية من غير بيانات حساسة', 'personal automation without sensitive data'], ['مدفوعات', 'payments'], ['رسايل لكل العملاء', 'messages to all customers']], 0, B('مستويات.', 'Tiers.')),
        Q(B('lib · notify:', 'lib · notify:'), [['sub-workflow مكتبة', 'a library sub-workflow'], ['credential', 'a credential'], ['تريجر', 'a trigger']], 0, B('إعادة استخدام.', 'Reuse.')),
        Q(B('تغيير كاسر في sub-workflow مكتبة:', 'A breaking change in a library sub-workflow:'), [['إصدار v2 والقديم يفضل', 'a v2 while v1 stays'], ['عدّله وخلاص', 'just edit it'], ['امسحه', 'delete it']], 0, B('توافق.', 'Compatibility.')),
        Q(B('قالب منشور:', 'A published template:'), [['من غير بيانات عملاء وبـ placeholders', 'without client data, with placeholders'], ['نسخة مشروع العميل', 'a copy of the client project'], ['فيه credentials', 'with credentials']], 0, B('نضيف.', 'Clean.')),
        Q(B('review gate:', 'A review gate:'), [['مراجعة قبل مستوى أعلى', 'a review before a higher tier'], ['بوابة شبكة', 'a network gateway'], ['firewall', 'a firewall']], 0, B('حوكمة.', 'Governance.')),
        Q(B('CoE بيعمل:', 'A CoE does:'), [['منصة ومعايير وتدريب ومراجعة', 'platform, standards, training and review'], ['يمنع البناء', 'block building'], ['مبيعات', 'sales']], 0, B('تمكين.', 'Enablement.')),
        Q(B('ملخص الحوكمة لقى webhook مكشوف:', 'The governance digest found an open webhook:'), [['تواصل بلطف وقدّم قالب صح', 'reach out kindly and offer a correct template'], ['اقفل حساب الموظف', 'disable the employee’s account'], ['تجاهل', 'ignore']], 0, B('مساعدة.', 'Help.')),
        Q(B('السمعة:', 'Reputation:'), [['محتوى صادق مستمر ومساهمات', 'honest, consistent content and contributions'], ['ادعاءات', 'claims'], ['إعلانات مكثفة', 'heavy ads']], 0, B('ثقة.', 'Trust.'))
      ] }
  ]
};
