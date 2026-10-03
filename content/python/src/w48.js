// Python week 48 — The expert capstone project.
// The idea scorer, definition-of-done checker, release gates, README builder and impact calculator run with the
// standard library; everything else is the plan for your own capstone.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('مشروع الخبير النهائي', 'The expert capstone project'),
  goal: B('تجمع 12 شهر Python في مشروع واحد على مستوى خبير: نظام حقيقي (AI + أتمتة + API + بيانات) من تعريف المشكلة للتشغيل — مصمم بقرارات مكتوبة، متبني على شرائح، مختبر ومراقَب وآمن، متسلّم بتوثيق، ومعروض كقصة نجاح — مع خطة سنتك الجاية.',
          'Bring 12 months of Python together in one expert-level project: a real system (AI + automation + API + data) from problem statement to operation — designed with written decisions, built in slices, tested, monitored and secure, handed over with documentation, and presented as a success story — with a plan for your next year.'),
  days: [
    { title: B('الاختيار والتصميم', 'Choosing and designing'),
      goal: B('مشروع يستاهل، ومحدد كويس.', 'A project worth doing, well defined.'),
      learn: [
        L(B('اختار المشروع', 'Pick the project'),
          B('أحسن مشروع تخرج: مشكلة حقيقية عند عميل أو شغلك (مش todo app)، بتستخدم أغلب اللي اتعلمته، وتقدر تخلّصها في أسبوعين لتلاتة كـ MVP. قيّم أفكارك بأرقام: القيمة، الجدوى، التعلّم، وإمكانية العرض.', 'The best capstone: a real problem for a client or your job (not a todo app), using most of what you learned, finishable as an MVP in two or three weeks. Score your ideas with numbers: value, feasibility, learning and how showable it is.'),
          'ideas = {\n    "supplier invoice inbox (OCR + Odoo + Slack)":   {"value": 5, "feasible": 4, "learning": 5, "showable": 5},\n    "WhatsApp order assistant with RAG + MCP":        {"value": 5, "feasible": 3, "learning": 5, "showable": 5},\n    "personal finance dashboard":                    {"value": 2, "feasible": 5, "learning": 2, "showable": 3},\n    "price watcher for 3 competitors":                {"value": 4, "feasible": 5, "learning": 3, "showable": 4},\n}\nweights = {"value": 0.35, "feasible": 0.25, "learning": 0.2, "showable": 0.2}\nscored = sorted(((sum(s[k] * w for k, w in weights.items()), name) for name, s in ideas.items()), reverse=True)\nfor score, name in scored:\n    print(f"{score:4.2f}  {name}")', R),
        L(B('بيان المشكلة والمقاييس', 'Problem statement and metrics'),
          B('ابدأ بـ **problem statement** في جملتين (مين، المشكلة، تكلفتها)، و**success metric** بأرقام («وقت تسجيل الفاتورة من 6 دقايق لـ 30 ثانية، دقة ≥ 98%»)، و**non-goal** (اللي مش هتعمله — بيحميك من التوسع). ده يبقى أول صفحة في الـ README.', 'Start with a **problem statement** in two sentences (who, the problem, its cost), a **success metric** with numbers («invoice entry from 6 minutes to 30 seconds, accuracy ≥ 98%»), and a **non-goal** (what you will not do — it protects you from scope creep). This becomes the README’s first page.'),
          'Problem   The finance team (3 people) types 1,200 supplier invoices a month into Odoo by hand:\n          ~6 minutes each, 4% errors, invoices paid late.\nSuccess   • median entry time ≤ 30 s (human review only)  • field accuracy ≥ 98% on a 100-invoice golden set\n          • 0 lost invoices (DLQ empty or handled within 1 day)  • cost ≤ $0.03 per invoice\nNon-goals payments, supplier onboarding, scanned handwritten invoices (phase 2)', T),
        L(B('قرارات مكتوبة', 'Written decisions'),
          B('ارسم المعمارية (مستوى **c4 model**: السياق ثم الحاويات) واكتب كل قرار مهم في **architecture decision record** (ADR): السياق، القرار، البدائل، والنتايج. بعد 6 شهور هتعرف ليه عملت كده — ونفس الكلام لأي حد هيمسك المشروع.', 'Draw the architecture (at **c4 model** level: context, then containers) and record each important decision in an **architecture decision record** (ADR): context, decision, alternatives and consequences. Six months later you will know why — and so will anyone who takes over.'),
          'docs/adr/0003-queue-between-extraction-and-odoo.md\n\n# 3. Put SQS between extraction and Odoo\nStatus: accepted (2026-10-05)\nContext: Odoo’s API limits writes; extraction (Claude) is bursty when suppliers upload batches.\nDecision: extraction writes to an SQS queue; an idempotent worker posts to Odoo at ≤ 2 req/s; DLQ after 5 tries.\nAlternatives: direct calls (simple, but fails on bursts); n8n queue mode (good, but the team wants code).\nConsequences: +1 component to monitor; no lost invoices on Odoo outages; replay is possible.', T)
      ],
      practice: [
        B('قيّم 4 أفكار وختار واحدة.', 'Score 4 ideas and choose one.'),
        B('اكتب problem statement ومقاييس وnon-goals.', 'Write the problem statement, metrics and non-goals.'),
        B('ارسم C4 مستوى 1 و2.', 'Draw C4 levels 1 and 2.'),
        B('اكتب 3 ADRs.', 'Write 3 ADRs.')
      ],
      words: [
        W('problem statement', 'بيان المشكلة', 'a short description of the problem and its cost', 'Start the README with the problem statement.'),
        W('success metric', 'مقياس النجاح', 'a number defining success', 'Our success metric is 30 seconds per invoice.'),
        W('non-goal', 'حاجة مش هنعملها', 'something explicitly out of scope', 'Payments are a non-goal for phase 1.'),
        W('c4 model', 'طريقة رسم المعمارية بمستويات', 'a layered way to draw architecture', 'Draw the C4 model context diagram first.'),
        W('architecture decision record', 'سجل قرار معماري', 'a short document recording one design decision', 'Write an architecture decision record for the queue.'),
        W('adr', 'اختصار سجل القرار المعماري', 'an architecture decision record', 'ADR 3 explains why we chose SQS.')
      ],
      read: [{ t: 'ADR GitHub organisation', url: 'https://adr.github.io/', what: B('اقرا الفكرة والقوالب.', 'Read the idea and templates.') }],
      challenge: B('اكتب «ملف المشروع» لمشروع تخرجك: تقييم الأفكار، problem statement، 4 success metrics، non-goals، رسم C4 لمستويين، 3 ADRs، وقايمة مخاطر — وخلّي عميل أو زميل يراجعه.', 'Write the «project brief» for your capstone: the idea scoring, a problem statement, 4 success metrics, non-goals, a two-level C4 diagram, 3 ADRs and a risk list — and have a client or colleague review it.'),
      quiz: [
        Q(B('مشروع تخرج كويس:', 'A good capstone:'), [['مشكلة حقيقية بتكلفة واضحة', 'a real problem with a clear cost'], ['todo app', 'a todo app'], ['كل التقنيات مرة واحدة من غير هدف', 'every technology at once with no goal']], 0, B('قيمة.', 'Value.')),
        Q(B('non-goal:', 'A non-goal:'), [['حاجة مش هنعملها صراحة', 'something we explicitly won’t do'], ['هدف فاشل', 'a failed goal'], ['باج', 'a bug']], 0, B('حدود.', 'Boundaries.')),
        Q(B('ADR بيسجّل:', 'An ADR records:'), [['قرار وسياقه وبدايله ونتايجه', 'a decision, its context, alternatives and consequences'], ['كل سطر كود', 'every line of code'], ['المرتبات', 'salaries']], 0, B('ليه.', 'Why.'))
      ] },

    { title: B('البناء على شرائح', 'Building in slices'),
      goal: B('حاجة شغالة من أول يوم وبتكبر.', 'Something working from day one that grows.'),
      learn: [
        L(B('الهيكل الماشي', 'The walking skeleton'),
          B('**walking skeleton** = أرفع نسخة من النظام بتعدّي من أوله لآخره: webhook ← قاعدة ← طابور ← worker ← Slack، كل خطوة بأبسط شكل، منشورة على staging بـ CI. بعدها كل ميزة **vertical slice**: شريحة رفيعة من الواجهة للقاعدة بتدّي قيمة كاملة — مش «كل الـ DB الأسبوع ده وكل الـ API الجاي».', 'A **walking skeleton** = the thinnest version of the system running end to end: webhook → database → queue → worker → Slack, each step in its simplest form, deployed to staging with CI. Then each feature is a **vertical slice**: a thin slice from interface to database that delivers complete value — not «all the DB this week and all the API next».'),
          'week 1  skeleton: upload → bucket → queue → worker prints «got INV.pdf» → Slack «received»   (deployed, CI green)\nslice 1 extract 5 fields with Claude (structured output) → show in Slack\nslice 2 validate + human review button (approval queue)\nslice 3 post to Odoo idempotently; DLQ + alert\nslice 4 golden-set evals in CI; dashboard; daily report\nslice 5 MCP server so the finance assistant can ask «which invoices are waiting?»', T),
        L(B('تعريف «خلص»', 'Definition of done'),
          B('**definition of done** = قايمة لازم كل شريحة تعدّيها قبل ما تقول «خلصت»: اختبارات، types، لوج ومقاييس، توثيق، أمان، منشورة على staging. من غيرها «خلصت» معناها «شغالة على جهازي». المثال بيفحص الشرائح على القايمة.', 'A **definition of done** = a list every slice must pass before you say «done»: tests, types, logs and metrics, docs, security, deployed to staging. Without it, «done» means «works on my machine». The example checks slices against the list.'),
          'DONE = ["tests (unit + integration)", "mypy clean", "structured logs + metrics", "docs/README updated",\n        "security checklist", "deployed to staging", "demo recorded"]\n\nslices = {\n    "skeleton":           set(DONE),\n    "extract with Claude": set(DONE) - {"demo recorded"},\n    "human review":        {"tests (unit + integration)", "mypy clean", "deployed to staging"},\n}\nfor name, have in slices.items():\n    missing = [d for d in DONE if d not in have]\n    print(f"{name:<20} {\'DONE\' if not missing else \'not done — missing: \' + \', \'.join(missing)}")', R),
        L(B('خلّيه بسيط', 'Keep it simple'),
          B('كل اللي اتعلمته مش لازم يدخل. استخدم الأداة الأبسط اللي تكفي: SQLite/Postgres قبل vector DB منفصلة، n8n للربط البسيط وPython للمنطق، agent بس لو الخطوات مش معروفة. واتتبع وقتك بـ **milestone** أسبوعية؛ لو اتأخرت، قصّ ميزة مش جودة.', 'Not everything you learned must go in. Use the simplest tool that suffices: SQLite/Postgres before a separate vector DB, n8n for simple wiring and Python for logic, an agent only if the steps are unknown. Track time with a weekly **milestone**; if you slip, cut a feature, not quality.'),
          'choose the simplest that works\nneed                          first choice                      only if needed\nsearch over 2,000 policy chunks pgvector in the same Postgres      a dedicated vector DB\nwire Odoo → Slack → Sheets     n8n workflow                      Python service\nextract invoice fields          one Claude call + Pydantic        an agent with tools\nrun every 15 min                cron / scheduler + heartbeat      a workflow engine', T)
      ],
      practice: [
        B('ابني الـ walking skeleton وانشره على staging.', 'Build the walking skeleton and deploy it to staging.'),
        B('اكتب definition of done بتاعتك.', 'Write your definition of done.'),
        B('قسّم المشروع لـ 5 vertical slices.', 'Split the project into 5 vertical slices.'),
        B('حط milestones أسبوعية.', 'Set weekly milestones.')
      ],
      words: [
        W('walking skeleton', 'أرفع نسخة شغالة من أول لآخر', 'the thinnest end-to-end working version', 'The walking skeleton was deployed on day two.'),
        W('vertical slice', 'شريحة كاملة من الواجهة للقاعدة', 'a thin feature across all layers', 'Each vertical slice delivers user value.'),
        W('definition of done', 'تعريف «خلص»', 'the checklist a task must pass to be done', 'Docs are part of our definition of done.'),
        W('milestone', 'محطة زمنية', 'a dated checkpoint', 'Milestone 2 is human review by Thursday.'),
        W('mvp', 'أقل منتج مفيد', 'minimum viable product', 'The MVP posts invoices to Odoo.')
      ],
      read: [{ lib: 'Architecture Patterns with Python', what: B('راجع الفصول اللي محتاجها لمعمارية مشروعك.', 'Revisit the chapters your project’s architecture needs.') }],
      challenge: B('ابني الـ walking skeleton لمشروعك ونشره على staging بـ CI، وبعدين أول شريحتين كاملتين بالـ definition of done — وسجّل ديمو 2 دقيقة لكل شريحة.', 'Build your project’s walking skeleton and deploy it to staging with CI, then the first two complete slices meeting the definition of done — and record a 2-minute demo of each slice.'),
      quiz: [
        Q(B('walking skeleton:', 'A walking skeleton:'), [['نسخة رفيعة شغالة من أولها لآخرها', 'a thin version working end to end'], ['تصميم على ورق', 'a design on paper'], ['قاعدة البيانات بس', 'only the database']], 0, B('من أول يوم.', 'From day one.')),
        Q(B('vertical slice:', 'A vertical slice:'), [['ميزة رفيعة عبر كل الطبقات', 'a thin feature across all layers'], ['طبقة كاملة لوحدها', 'one whole layer alone'], ['commit', 'a commit']], 0, B('قيمة.', 'Value.')),
        Q(B('اتأخرت في الجدول:', 'You are behind schedule:'), [['قصّ ميزة مش جودة', 'cut a feature, not quality'], ['شيل الاختبارات', 'drop the tests'], ['متعملش deploy', 'skip deploying']], 0, B('جودة.', 'Quality.'))
      ] },

    { title: B('الجودة والتشغيل', 'Quality and operations'),
      goal: B('جاهز للإنتاج بأدلة.', 'Production-ready, with evidence.'),
      learn: [
        L(B('بوابات الإطلاق', 'Release gates'),
          B('**quality gate** = شرط رقمي لازم يتحقق قبل الإطلاق: الاختبارات، الـ evals، الأداء، الأمان، المراقبة. **acceptance test** = اختبار بيثبت إن success metric اتحقق فعلًا (مثلًا 100 فاتورة حقيقية). **release readiness** = كل البوابات خضرا. المثال بيقيّمها.', 'A **quality gate** = a numeric condition that must hold before release: tests, evals, performance, security, monitoring. An **acceptance test** = a test proving a success metric was actually met (e.g. 100 real invoices). **release readiness** = every gate is green. The example evaluates them.'),
          'gates = {  # name: (actual, comparator, threshold)\n    "unit+integration tests passing":  (1.00, ">=", 1.00),\n    "field accuracy on golden set":     (0.984, ">=", 0.98),\n    "p95 extraction time (s)":          (7.8, "<=", 10),\n    "cost per invoice ($)":             (0.021, "<=", 0.03),\n    "critical/high vulnerabilities":    (0, "<=", 0),\n    "alerts tested (fired + resolved)": (3, ">=", 3),\n    "DLQ redrive drill done":           (0, ">=", 1),\n}\nops = {">=": lambda a, b: a >= b, "<=": lambda a, b: a <= b}\nfailed = []\nfor name, (actual, op, thr) in gates.items():\n    ok = ops[op](actual, thr)\n    failed += [] if ok else [name]\n    print(f"{\'✓\' if ok else \'✗\'} {name:<36} {actual} {op} {thr}")\nprint("\\nRELEASE READY" if not failed else f"\\nNOT READY: {failed}")', R),
        L(B('اختبارات القبول', 'Acceptance tests'),
          B('اختبر النظام زي ما العميل هيستخدمه: 100 فاتورة حقيقية (مجهّلة) من أنواع مختلفة، حمل يوم الذروة، Odoo واقع ساعة، فاتورة مكررة، ملف بايظ، ومحاولة prompt injection في PDF. كل سيناريو بنتيجة متوقعة ومكتوبة.', 'Test the system as the client will use it: 100 real (anonymised) invoices of different kinds, peak-day load, Odoo down for an hour, a duplicate invoice, a corrupt file, and a prompt-injection attempt inside a PDF. Each scenario with a written expected result.'),
          'acceptance matrix\nscenario                          expected                                        result\n100 real invoices                 ≥ 98% fields correct, 0 lost                     98.4% ✓\npeak: 300 uploads in 10 min       all processed < 30 min, no Odoo 429 storms       22 min ✓\nOdoo down 60 min                  queue holds; all posted after recovery; 0 dupes  ✓\nsame invoice uploaded twice       posted once (idempotent by supplier+number)      ✓\ncorrupt PDF                       DLQ + Slack alert within 5 min                   ✓\nPDF text «ignore instructions…»   extracted as data; no tool called                ✓', T),
        L(B('جاهزية التشغيل', 'Operational readiness'),
          B('قبل الإطلاق: **launch checklist** (backups متجرّبة، أسرار، تنبيهات، rollback، صلاحيات)، **risk log** محدّث، و**operations manual** (runbook) للأعطال المعروفة. وخطة أول أسبوعين بعد الإطلاق (hypercare): مراقبة يومية وتواصل سريع مع العميل.', 'Before launch: a **launch checklist** (tested backups, secrets, alerts, rollback, permissions), an updated **risk log**, and an **operations manual** (runbook) for known failures. And a plan for the first two weeks after launch (hypercare): daily monitoring and fast contact with the client.'),
          'launch checklist\n☐ restore from backup tested (date: ____)      ☐ secrets in secret manager, rotated\n☐ alerts fire and resolve (tested)             ☐ rollback by digest rehearsed\n☐ least-privilege roles reviewed               ☐ PII redaction verified in logs\n☐ runbook: Odoo down · DLQ not empty · Claude errors · cost spike\n☐ hypercare: daily check 09:00 for 14 days; client WhatsApp group; weekly report', T)
      ],
      practice: [
        B('اكتب quality gates لمشروعك وشغّلها.', 'Write quality gates for your project and run them.'),
        B('اعمل acceptance matrix بـ 6 سيناريوهات.', 'Build an acceptance matrix with 6 scenarios.'),
        B('اكتب launch checklist وrunbook.', 'Write a launch checklist and runbook.'),
        B('جرّب restore من backup فعلًا.', 'Actually test a restore from backup.')
      ],
      words: [
        W('quality gate', 'بوابة جودة رقمية', 'a numeric condition before release', 'The accuracy quality gate blocked the release.'),
        W('acceptance test', 'اختبار القبول', 'a test proving requirements are met', 'The acceptance test used 100 real invoices.'),
        W('release readiness', 'جاهزية الإطلاق', 'the state when every gate passes', 'Release readiness is reviewed on Friday.'),
        W('launch checklist', 'قايمة مراجعة الإطلاق', 'items to verify before going live', 'The launch checklist includes a restore test.'),
        W('risk log', 'سجل المخاطر', 'a list of risks with owners and responses', 'Update the risk log weekly.'),
        W('operations manual', 'دليل التشغيل', 'how to run and fix the system', 'The operations manual covers Odoo outages.'),
        W('hypercare', 'متابعة مكثفة بعد الإطلاق', 'intensive support right after launch', 'Hypercare lasts two weeks.')
      ],
      read: [{ t: 'Google SRE Book: Launch checklist', url: 'https://sre.google/sre-book/launch-checklist/', what: B('اقرا القايمة وخد منها اللي يناسبك.', 'Read the list and take what fits.') }],
      challenge: B('خلّي مشروعك جاهز للإنتاج بأدلة: quality gates في CI، acceptance matrix كاملة بنتايج، اختبارات حمل وفشل، launch checklist متعلّم عليها، runbook، وخطة hypercare — وقرار مكتوب «نطلق ولا لأ».', 'Make your project production-ready with evidence: quality gates in CI, a full acceptance matrix with results, load and failure tests, a ticked launch checklist, a runbook and a hypercare plan — and a written «launch or not» decision.'),
      quiz: [
        Q(B('quality gate:', 'A quality gate:'), [['شرط رقمي قبل الإطلاق', 'a numeric condition before release'], ['باب المكتب', 'the office door'], ['اختبار يدوي', 'a manual test']], 0, B('بوابة.', 'Gate.')),
        Q(B('Odoo وقع ساعة:', 'Odoo is down for an hour:'), [['الطابور يمسك والكل يتسجّل بعدها', 'the queue holds and all post afterwards'], ['الفواتير تضيع', 'invoices are lost'], ['النظام كله يقع', 'the whole system fails']], 0, B('مرونة.', 'Resilience.')),
        Q(B('backup مش متجرّب:', 'An untested backup:'), [['مش backup لحد ما تجرّب restore', 'not a backup until a restore is tested'], ['كفاية', 'enough'], ['أحسن', 'better']], 0, B('دليل.', 'Proof.'))
      ] },

    { title: B('التسليم والتوثيق', 'Delivery and documentation'),
      goal: B('حد غيرك يقدر يشغّله ويطوّره.', 'Someone else can run and extend it.'),
      learn: [
        L(B('التوثيق اللي بيتقري', 'Docs people read'),
          B('التوثيق على 4 طبقات: README (إيه وليه وإزاي تشغّله في 5 دقايق)، ADRs (ليه)، runbook (لما يقع)، وdocs للمطوّر (المعمارية، إزاي تضيف ميزة). اكتب للقارئ اللي جاي بعد سنة. المثال بيولّد هيكل README من بيانات المشروع.', 'Documentation in 4 layers: the README (what, why and running it in 5 minutes), ADRs (why), the runbook (when it breaks), and developer docs (architecture, how to add a feature). Write for the reader arriving a year from now. The example generates a README skeleton from project data.'),
          'project = {\n    "name": "invoice-inbox", "one_liner": "Supplier invoices from PDF to Odoo in 30 seconds, with human review.",\n    "problem": "Finance typed 1,200 invoices a month by hand (6 min each, 4% errors).",\n    "results": ["entry time 6 min → 24 s", "field accuracy 98.4%", "0 lost invoices in 6 weeks"],\n    "run": ["cp .env.example .env", "docker compose up -d", "open http://localhost:8000/docs"],\n    "docs": {"Architecture": "docs/architecture.md", "Decisions": "docs/adr/", "Runbook": "docs/runbook.md"},\n}\n\ndef readme(p):\n    out = [f"# {p[\'name\']}", "", p["one_liner"], "", "## Why", p["problem"], "", "## Results"]\n    out += [f"- {r}" for r in p["results"]] + ["", "## Run it locally", "```bash", *p["run"], "```", "", "## More"]\n    out += [f"- [{k}]({v})" for k, v in p["docs"].items()]\n    return "\\n".join(out)\n\nprint(readme(project))', R),
        L(B('التسليم', 'The handover'),
          B('لو المشروع لعميل: جلسة تسليم مسجّلة، صلاحيات بتتنقل لحساباتهم (مش حسابك)، أسرار بتتغير بعد التسليم، تدريب للفريق، وخطة دعم (care plan من شهر 10). ولو مشروعك الشخصي: **open source release** بـ README وlicense وCONTRIBUTING — بيبقى أقوى حاجة في الـ portfolio.', 'If the project is for a client: a recorded handover session, permissions moved to their accounts (not yours), secrets rotated after handover, team training and a support plan (the care plan from month 10). If it is personal: an **open source release** with a README, licence and CONTRIBUTING — the strongest item in a portfolio.'),
          'handover checklist (client project)\n☐ repo, cloud, Odoo app and Slack app owned by the client’s accounts\n☐ all secrets rotated after handover; my access removed (or limited by the care plan)\n☐ 60-min recorded walkthrough: architecture, runbook, how to add a supplier rule\n☐ 2 people on their side can deploy and roll back\n☐ care plan signed: monitoring, monthly updates, 4 h/month of changes', T),
        L(B('دراسة الحالة', 'The case study'),
          B('القصة اللي هتبيع شغلك الجاي: المشكلة بأرقام، الحل بالبسيط، النتايج بأرقام قبل وبعد، اقتباس من العميل (بإذن)، ورسم المعمارية. احسب الأثر بالفلوس — المدير بيفهم «وفّرنا 17,000 دولار في السنة» أكتر من «98.4% دقة».', 'The story that will sell your next job: the problem in numbers, the solution simply, results in before/after numbers, a client quote (with permission), and the architecture diagram. Compute the impact in money — a manager understands «we saved $17,000 a year» better than «98.4% accuracy».'),
          'invoices_per_month = 1200\nminutes_before, seconds_after = 6, 24\nhourly_cost = 9.0                    # loaded cost of a finance clerk, USD\nerror_rate_before, error_rate_after = 0.04, 0.005\ncost_per_error = 12.0                 # time to find and fix + late-payment fees\nrun_cost_month = 1200 * 0.021 + 45    # Claude + cloud\n\nhours_saved = invoices_per_month * (minutes_before - seconds_after / 60) / 60\nlabour = hours_saved * hourly_cost\nerrors = invoices_per_month * (error_rate_before - error_rate_after) * cost_per_error\nnet_year = (labour + errors - run_cost_month) * 12\nprint(f"hours saved per month: {hours_saved:.0f}")\nprint(f"monthly: labour ${labour:,.0f} + fewer errors ${errors:,.0f} - running ${run_cost_month:,.0f}")\nprint(f"net yearly impact ≈ ${net_year:,.0f}")', R)
      ],
      practice: [
        B('اكتب README بيشغّل المشروع في 5 دقايق.', 'Write a README that runs the project in 5 minutes.'),
        B('خلّي حد تاني يشغّله من الـ README بس.', 'Have someone else run it from the README alone.'),
        B('اكتب handover checklist.', 'Write a handover checklist.'),
        B('احسب الأثر بالفلوس.', 'Compute the impact in money.')
      ],
      words: [
        W('open source release', 'نشر المشروع كمصدر مفتوح', 'publishing a project as open source', 'The open source release got 40 stars.'),
        W('developer docs', 'توثيق المطوّرين', 'documentation for people changing the code', 'Developer docs explain how to add a rule.'),
        W('walkthrough', 'شرح عملي خطوة بخطوة', 'a step-by-step guided explanation', 'Record a 60-minute walkthrough.'),
        W('impact', 'الأثر', 'the measurable effect of the work', 'Show the impact in dollars.'),
        W('care plan', 'خطة الرعاية بعد التسليم', 'an ongoing support agreement', 'The care plan covers monthly updates.')
      ],
      read: [{ lib: 'Python Packaging User Guide', what: B('راجع نشر الحزمة لو هتطلقها مفتوحة.', 'Review packaging if you release it openly.') }],
      challenge: B('سلّم مشروعك: README وdeveloper docs وrunbook، جلسة walkthrough متسجلة، handover checklist (أو open source release بـ license وCONTRIBUTING)، ودراسة حالة صفحة واحدة بالأرقام والأثر بالفلوس.', 'Deliver your project: a README, developer docs and runbook, a recorded walkthrough, a handover checklist (or an open source release with a licence and CONTRIBUTING), and a one-page case study with numbers and the money impact.'),
      quiz: [
        Q(B('اختبار الـ README:', 'Testing the README:'), [['حد تاني يشغّل المشروع منه بس', 'someone else runs the project from it alone'], ['تقراه انت', 'you read it'], ['طوله', 'its length']], 0, B('قارئ حقيقي.', 'A real reader.')),
        Q(B('بعد تسليم مشروع لعميل:', 'After handing a project to a client:'), [['غيّر الأسرار وانقل الملكية', 'rotate secrets and transfer ownership'], ['احتفظ بكل الصلاحيات', 'keep all access'], ['امسح الريبو', 'delete the repo']], 0, B('ملكية.', 'Ownership.')),
        Q(B('المدير بيفهم أكتر:', 'A manager understands best:'), [['وفّرنا 17,000$ في السنة', 'we saved $17,000 a year'], ['F1 = 0.91', 'F1 = 0.91'], ['استخدمنا pgvector', 'we used pgvector']], 0, B('فلوس.', 'Money.'))
      ] },

    { title: B('العرض والخطوة الجاية', 'Presenting and what comes next'),
      goal: B('تعرض شغلك بثقة وتخطط سنتك.', 'Present your work confidently and plan your year.'),
      learn: [
        L(B('الديمو', 'The demo'),
          B('**demo day**: 10 دقايق — المشكلة (دقيقة)، ديمو حي لسيناريو حقيقي (4)، اللي تحت (المعمارية وقرار واحد صعب، 2)، النتايج (2)، الجاي (1). اكتب **demo script** وجهّز فيديو احتياطي لو الشبكة وقعت. وجهّز **elevator pitch** في 30 ثانية للمشروع.', '**demo day**: 10 minutes — the problem (1), a live demo of a real scenario (4), under the hood (the architecture and one hard decision, 2), results (2), what is next (1). Write a **demo script** and keep a backup video in case the network fails. And prepare a 30-second **elevator pitch** for the project.'),
          'elevator pitch (30 s)\n"Finance teams in the Gulf still type supplier invoices by hand. I built a system that reads the PDF,\n extracts the fields with Claude, lets a person approve in Slack, and posts to Odoo — safely, with no lost\n invoices. For my client it cut entry time from 6 minutes to 24 seconds and saves about $17,000 a year."\n\ndemo script\n0:00 problem: a pile of 30 PDFs · 1:00 upload → Slack card in 20 s · 2:30 approve → Odoo entry appears\n4:00 duplicate upload → ignored · 5:00 architecture + ADR «queue before Odoo» · 7:00 numbers · 9:00 next', T),
        L(B('الـ retrospective', 'The retrospective'),
          B('**retrospective** بعد المشروع: إيه اللي مشي كويس، إيه اللي متمشّاش، إيه اللي هتعمله مختلف — بأمثلة. وارجع للـ success metrics: اتحققت؟ وارجع لرحلة الـ 12 شهر: إيه أكتر 3 مهارات عملوا فرق، وإيه اللي لسه ضعيف.', 'A **retrospective** after the project: what went well, what did not, what you would do differently — with examples. Go back to the success metrics: were they met? And look back at the 12-month journey: which 3 skills made the biggest difference, and what is still weak.'),
          'retrospective — invoice-inbox\nwent well      walking skeleton on day 2; golden set caught 2 regressions; queue saved us during an Odoo outage\nwent badly     underestimated Arabic supplier names (+3 days); alerts too noisy in week 1\ndifferently    golden set before the first prompt; burn-rate alerts from the start\nmetrics        24 s ✓ · 98.4% ✓ · 0 lost ✓ · $0.021/invoice ✓\njourney        strongest: testing, evals, queues · weakest: frontend, Kubernetes', T),
        L(B('السنة الجاية', 'The next year'),
          B('**t-shaped**: عرض في كل حاجة اتعلمتها، وعمق في تخصص واحد (AI للأتمتة، هندسة البيانات، أو منصات). اكتب **learning plan** بأهداف ربع سنوية، **roadmap** للمشروع نفسه، واتعلّم بالتعليم: **mentoring** لحد بيبدأ — الرحلة دي نفسها بدأت كده.', '**t-shaped**: breadth across everything you learned, and depth in one specialty (AI for automation, data engineering, or platforms). Write a **learning plan** with quarterly goals, a **roadmap** for the project itself, and learn by teaching: **mentoring** someone starting out — this journey itself began that way.'),
          'learning plan 2027 (example: specialise in AI for automation)\nQ1  agents in production: 2 client projects with evals + tracing; read the MCP spec end to end\nQ2  fine-grained evals: build a reusable eval harness package; talk at a meetup\nQ3  data side: a dbt + Postgres pipeline feeding RAG; publish a case study\nQ4  mentor 2 juniors through months 1–3 of this journey; open-source the invoice-inbox core\n\nproject roadmap: v1.1 handwritten invoices (OCR) · v1.2 multi-company · v2 supplier self-service portal', T)
      ],
      practice: [
        B('اكتب elevator pitch وقوله في 30 ثانية.', 'Write an elevator pitch and say it in 30 seconds.'),
        B('اكتب demo script وسجّل فيديو احتياطي.', 'Write a demo script and record a backup video.'),
        B('اعمل retrospective بصدق.', 'Hold an honest retrospective.'),
        B('اكتب learning plan للسنة الجاية.', 'Write a learning plan for next year.')
      ],
      words: [
        W('demo day', 'يوم عرض المشاريع', 'a day for presenting projects', 'Demo day is a 10-minute slot.'),
        W('demo script', 'سيناريو الديمو', 'the planned steps of a demo', 'Follow the demo script, keep a backup video.'),
        W('elevator pitch', 'تعريف سريع في 30 ثانية', 'a 30-second summary', 'Practise the elevator pitch aloud.'),
        W('retrospective', 'مراجعة بعد المشروع', 'a review of what went well and badly', 'The retrospective found two process fixes.'),
        W('t-shaped', 'عرض في كل حاجة وعمق في حاجة', 'broad skills with one deep specialty', 'Aim to be T-shaped.'),
        W('learning plan', 'خطة تعلّم', 'a plan of what to learn and when', 'My learning plan has four quarterly goals.'),
        W('roadmap', 'خريطة طريق', 'a plan of future versions or steps', 'The roadmap lists v1.1 and v1.2.'),
        W('mentoring', 'الإرشاد', 'guiding someone’s growth', 'Mentoring juniors deepened my own skills.')
      ],
      read: [{ lib: 'Real Python Tutorials', what: B('اختار مسار التخصص بتاعك وابدأ أول درس.', 'Pick your specialisation path and start its first lesson.') }],
      challenge: B('اعرض مشروعك في «demo day» حقيقي (لزملاء، عميل، أو meetup أونلاين) أو سجّله: elevator pitch، ديمو 10 دقايق بـ script، أسئلة وإجابات — وانشر retrospective وlearning plan للسنة الجاية.', 'Present your project at a real «demo day» (to colleagues, a client or an online meetup) or record it: an elevator pitch, a 10-minute scripted demo, questions and answers — and publish your retrospective and your learning plan for next year.'),
      quiz: [
        Q(B('الشبكة وقعت في الديمو:', 'The network fails during the demo:'), [['فيديو احتياطي', 'a backup video'], ['ألغي العرض', 'cancel the talk'], ['اعتذر بس', 'just apologise']], 0, B('تحضير.', 'Preparation.')),
        Q(B('retrospective:', 'A retrospective:'), [['اللي مشي واللي متمشّاش واللي هيتغير', 'what went well, badly and what changes'], ['لوم الفريق', 'blaming the team'], ['احتفال بس', 'only a celebration']], 0, B('تعلّم.', 'Learning.')),
        Q(B('t-shaped:', 'T-shaped:'), [['عرض في كل حاجة وعمق في تخصص', 'breadth everywhere, depth in one specialty'], ['متخصص في كل حاجة', 'expert in everything'], ['من غير تخصص', 'no specialty']], 0, B('توازن.', 'Balance.'))
      ] },

    { title: B('مراجعة الرحلة واختبارها', 'Journey review and test'),
      goal: B('من أول print لنظام خبير في الإنتاج.', 'From the first print to an expert system in production.'),
      review: [
        B('الأساسيات والأتمتة والملفات والويب (شهور 1–4).', 'Basics, automation, files and the web (months 1–4).'),
        B('البيانات وSQL وFastAPI والجودة والـ AI الأولي (شهور 5–6).', 'Data, SQL, FastAPI, quality and first AI steps (months 5–6).'),
        B('Python المتقدم والبيانات بالحجم والـ scraping والتكاملات (شهور 7–9).', 'Advanced Python, data at scale, scraping and integrations (months 7–9).'),
        B('RAG والـ agents والتقييم وMCP (شهر 10).', 'RAG, agents, evaluation and MCP (month 10).'),
        B('الأداء والمعمارية والاختبارات والأمان والنشر والسحابة والمراقبة (شهور 11–12).', 'Performance, architecture, testing, security, delivery, cloud and observability (months 11–12).')
      ],
      project: B('مشروع الخبير النهائي: نظام Python حقيقي من بيان المشكلة للتشغيل — success metrics وnon-goals وADRs ورسم C4؛ walking skeleton وvertical slices بـ definition of done؛ AI (RAG أو agent أو استخراج منظم) بـ golden set وevals في CI؛ معمارية ports and adapters بـ repository وطابور idempotent وDLQ؛ حزمة اختبارات بهرم كامل وHypothesis؛ مراجعة أمان (حقن، أسرار، سلسلة توريد)؛ Docker إنتاج وCI/CD بـ digest وstaging وموافقة؛ لوج ومقاييس وتتبع وSLOs بتنبيهات burn rate؛ quality gates وacceptance matrix وlaunch checklist؛ README وrunbook وتسليم أو open source release؛ دراسة حالة بالأثر بالفلوس، demo day، retrospective، وlearning plan لسنة 2027.', 'The expert capstone: a real Python system from problem statement to operation — success metrics, non-goals, ADRs and a C4 diagram; a walking skeleton and vertical slices with a definition of done; AI (RAG, an agent or structured extraction) with a golden set and evals in CI; a ports-and-adapters architecture with a repository, an idempotent queue and a DLQ; a full-pyramid test suite with Hypothesis; a security review (injection, secrets, supply chain); a production Docker image and CI/CD with digests, staging and approval; logs, metrics, tracing and SLOs with burn-rate alerts; quality gates, an acceptance matrix and a launch checklist; a README, runbook and handover or open source release; a case study with the money impact, a demo day, a retrospective, and a learning plan for 2027.'),
      test: [
        Q(B('أول خطوة في مشروع خبير:', 'The first step in an expert project:'), [['بيان المشكلة ومقاييس النجاح', 'the problem statement and success metrics'], ['اختيار framework', 'choosing a framework'], ['كتابة الكود', 'writing code']], 0, B('لماذا.', 'Why.')),
        Q(B('ADR:', 'An ADR:'), [['سجل قرار معماري بسياقه وبدايله', 'a decision record with context and alternatives'], ['اختبار', 'a test'], ['مكتبة', 'a library']], 0, B('قرار.', 'Decision.')),
        Q(B('walking skeleton:', 'A walking skeleton:'), [['أرفع نسخة شغالة من أول لآخر', 'the thinnest end-to-end working version'], ['تصميم UI', 'a UI design'], ['هيكل عظمي', 'a skeleton']], 0, B('شغال.', 'Working.')),
        Q(B('RAG بيقلل الهلوسة بـ:', 'RAG reduces hallucination through:'), [['إجابات من مصادر باستشهادات', 'answers from sources with citations'], ['حرارة أعلى', 'a higher temperature'], ['برومبت أطول بس', 'just a longer prompt']], 0, B('grounding.', 'Grounding.')),
        Q(B('agent بيقرر refund لوحده:', 'An agent deciding a refund alone:'), [['لأ: guardrails وموافقة بشرية', 'no: guardrails and human approval'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('أمان.', 'Safety.')),
        Q(B('تغيير البرومبت والدقة نزلت في CI:', 'A prompt change lowered accuracy in CI:'), [['الـ regression eval يوقف الدمج', 'the regression eval blocks the merge'], ['ندمج', 'merge anyway'], ['نمسح الـ evals', 'delete the evals']], 0, B('evals.', 'Evals.')),
        Q(B('الـ domain يعمل import لـ FastAPI:', 'The domain importing FastAPI:'), [['يكسر ports and adapters', 'breaks ports and adapters'], ['صح', 'correct'], ['إجباري', 'required']], 0, B('حدود.', 'Boundaries.')),
        Q(B('رسالة طابور وصلت مرتين:', 'A queue message arriving twice:'), [['handler idempotent', 'an idempotent handler'], ['فاتورتين', 'two invoices'], ['خطأ في SQS', 'an SQS bug']], 0, B('at-least-once.', 'At least once.')),
        Q(B('سر في الكود:', 'A secret in the code:'), [['انقله لـ secret manager وغيّره', 'move it to a secret manager and rotate it'], ['عادي لو الريبو خاص', 'fine if the repo is private'], ['شفّره بـ base64', 'encode it in base64']], 0, B('أسرار.', 'Secrets.')),
        Q(B('النشر للإنتاج بـ:', 'Deploy to production by:'), [['image digest اتجرّب على staging', 'an image digest tested on staging'], ['latest', 'latest'], ['بناء جديد على السيرفر', 'a fresh build on the server']], 0, B('ثبات.', 'Immutability.')),
        Q(B('تنبيه يصحّي حد بالليل:', 'An alert that wakes someone at night:'), [['burn rate عالي على SLO', 'a high burn rate on an SLO'], ['CPU 70%', 'CPU at 70%'], ['أي warning', 'any warning']], 0, B('أعراض.', 'Symptoms.')),
        Q(B('بعد الرحلة:', 'After the journey:'), [['تخصص بعمق وعلّم غيرك', 'specialise deeply and teach others'], ['وقّف تتعلم', 'stop learning'], ['ابدأ من الأول', 'start over']], 0, B('مدى الحياة.', 'Lifelong.'))
      ] }
  ]
};
