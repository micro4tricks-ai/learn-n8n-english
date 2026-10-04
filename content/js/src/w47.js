// JavaScript week 47 — Freelancing as a JavaScript automation developer.
// Pricing, proposal, milestone, invoice and time-report helpers run in Node. Contract notes are general
// information, not legal advice.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الشغل الحر كمطوّر أتمتة JavaScript', 'Freelancing as a JavaScript automation developer'),
  goal: B('تحوّل مهاراتك لشغل حر مستدام: تختار تخصص وتعرض نفسك بـ portfolio ودراسات حالة، تسعّر بالقيمة وتكتب عروض بتتقبل، تدير المشروع بـ milestones وتغييرات مكتوبة، تسلّم بتوثيق وخطط صيانة، وتبني أدوات تخلّيك أسرع في كل مشروع جديد.',
          'Turn your skills into sustainable freelance work: pick a niche and present yourself with a portfolio and case studies, price by value and write proposals that win, run projects with milestones and written changes, deliver with documentation and care plans, and build tools that make you faster on every new project.'),
  days: [
    { title: B('التخصص والعرض', 'Niche and positioning'),
      goal: B('العميل يعرف إنت بتحل إيه بالظبط.', 'Clients know exactly what you solve.'),
      learn: [
        L(B('اختار تخصص', 'Choose a niche'),
          B('«مطوّر JavaScript» كلام عام. **niche** واضح بيبيع أحسن: «أتمتة الطلبات والفواتير لمتاجر Shopify وWooCommerce في الخليج بـ n8n وNode». ركّز على صناعة + مشكلة + أدوات. وفكّر في **productized service**: خدمة بنطاق وسعر ثابت («ربط متجرك بـ Odoo في أسبوعين بـ 1,500 دولار») — أسهل في البيع والتسليم.', '«JavaScript developer» is generic. A clear **niche** sells better: «order and invoice automation for Shopify and WooCommerce shops in the Gulf with n8n and Node». Focus on an industry + a problem + tools. And consider a **productized service**: a service with a fixed scope and price («connect your shop to Odoo in two weeks for $1,500») — easier to sell and deliver.'),
          'positioning statement (fill in yours)\nI help  [online shops in Egypt and the Gulf]\nwho    [lose hours re-typing orders and invoices]\nto     [process every order automatically from WhatsApp/Shopify to Odoo and the accountant]\nusing  [n8n, Node/TypeScript, Claude, and custom n8n nodes]\nproof  [3 case studies: 1,200 invoices/month automated · 30 h/week saved · 0 lost orders]\n\nproductized offers\n• Order-to-invoice setup — 2 weeks — fixed $1,500\n• WhatsApp order assistant (AI + human approval) — 3 weeks — fixed $2,400\n• Care plan — monitoring, updates, 4 h of changes — $220/month', T),
        L(B('الـ portfolio ودراسات الحالة', 'Portfolio and case studies'),
          B('**portfolio** قوي = 3 **case study** حقيقية (أو مشاريع تجربة واقعية لو لسه بادئ): المشكلة بأرقام، الحل برسم، النتايج قبل وبعد، واقتباس (**testimonial**) بإذن العميل. و**github profile** فيه مشروع مفتوح محترم (node n8n، MCP server، أداة CLI) بـ README كويس.', 'A strong **portfolio** = 3 real **case study** pages (or realistic demo projects if you are starting out): the problem in numbers, the solution with a diagram, before/after results, and a quote (**testimonial**) with the client’s permission. And a **github profile** with one solid open project (an n8n node, an MCP server, a CLI tool) with a good README.'),
          'const cs = { client: "a Riyadh electronics shop (anonymised)", hoursBefore: 32, hoursAfter: 3, ordersPerMonth: 1800, errorsBefore: 0.03, errorsAfter: 0.002, hourly: 12 };\nconst hoursSaved = cs.hoursBefore - cs.hoursAfter;\nconst monthlyValue = hoursSaved * 4.3 * cs.hourly + cs.ordersPerMonth * (cs.errorsBefore - cs.errorsAfter) * 15;\nconsole.log(`# Case study: ${cs.client}`);\nconsole.log(`Problem: ${cs.hoursBefore} h/week re-typing ${cs.ordersPerMonth} orders/month, ${cs.errorsBefore * 100}% errors.`);\nconsole.log(`Solution: Shopify → n8n → custom Odoo node, Claude extraction with human approval.`);\nconsole.log(`Result: ${hoursSaved} h/week saved, errors ${cs.errorsBefore * 100}% → ${cs.errorsAfter * 100}%, ≈ $${Math.round(monthlyValue).toLocaleString("en")}/month in value.`);', N()),
        L(B('أماكن العملاء', 'Where clients are'),
          B('منصات (Upwork، Contra، مستقل، خمسات للسوق العربي) كويسة للبداية — بس العمولة والمنافسة عالية. على المدى البعيد: **referral** من عملاء راضيين، محتوى على LinkedIn عن مشاكل التخصص (أسبوع 47 في الإنجليزي)، مجتمع n8n، وcold outreach مدروس لـ 10 شركات بمثال مخصص ليهم.', 'Platforms (Upwork, Contra, Mostaql and Khamsat for the Arabic market) are good to start — but fees and competition are high. Long term: a **referral** from happy clients, LinkedIn content about your niche’s problems (week 47 of the English journey), the n8n community, and thoughtful cold outreach to 10 companies with an example tailored to them.'),
          'weekly client-finding routine (4 h)\nMon  2 proposals on Upwork/Mostaql — only jobs matching the niche\nTue  1 LinkedIn post: a real problem + how you solved it (numbers, screenshot)\nWed  answer 3 questions in the n8n community forum\nThu  2 tailored outreach messages (a 2-minute Loom showing their own workflow improved)\nFri  ask 1 past client for a referral or testimonial', T)
      ],
      practice: [
        B('اكتب positioning statement بتاعك.', 'Write your positioning statement.'),
        B('صمّم عرضين productized بسعر ونطاق.', 'Design two productized offers with price and scope.'),
        B('اكتب case study واحدة بالأرقام.', 'Write one case study with numbers.'),
        B('نظّم github profile بمشروع مثبّت.', 'Tidy your GitHub profile with a pinned project.')
      ],
      words: [
        W('freelancing', 'الشغل الحر', 'working independently for clients', 'Freelancing pays when you specialise.'),
        W('niche', 'تخصص ضيق', 'a narrow specialisation', 'My niche is Gulf e-commerce automation.'),
        W('productized service', 'خدمة بنطاق وسعر ثابت', 'a service sold like a product', 'The Odoo setup is a productized service.'),
        W('portfolio', 'معرض أعمالك', 'a collection of your work', 'Put three case studies in your portfolio.'),
        W('case study', 'دراسة حالة', 'a detailed project story with results', 'The case study shows 29 hours saved.'),
        W('testimonial', 'شهادة عميل', 'a client’s quote', 'Ask for a testimonial at handover.'),
        W('github profile', 'صفحتك على GitHub', 'your public GitHub page', 'Pin your n8n node on your GitHub profile.'),
        W('referral', 'ترشيح من عميل', 'a recommendation bringing new clients', 'Half my work comes from referrals.')
      ],
      read: [{ lib: 'n8n Docs: Creating nodes', what: B('خد فكرة لمشروع مفتوح يقوّي الـ portfolio.', 'Pick an open-source idea to strengthen your portfolio.') }],
      challenge: B('ابني «حزمة العرض»: positioning statement، عرضين productized، 3 دراسات حالة (أو مشاريع تجربة واقعية) بالأرقام، صفحة portfolio (GitHub Pages)، وروتين أسبوعي لجلب العملاء — ونفّذ أول أسبوع منه.', 'Build your «positioning pack»: a positioning statement, two productized offers, 3 case studies (or realistic demo projects) with numbers, a portfolio page (GitHub Pages), and a weekly client-finding routine — and carry out its first week.'),
      quiz: [
        Q(B('عرض أقوى:', 'A stronger pitch:'), [['أتمتة طلبات متاجر Shopify في الخليج', 'order automation for Gulf Shopify shops'], ['مطوّر JavaScript', 'JavaScript developer'], ['بعمل أي حاجة', 'I do anything']], 0, B('تخصص.', 'Niche.')),
        Q(B('دراسة حالة كويسة فيها:', 'A good case study has:'), [['أرقام قبل وبعد', 'before/after numbers'], ['صور جميلة بس', 'just pretty pictures'], ['الكود كله', 'all the code']], 0, B('أثر.', 'Impact.')),
        Q(B('مصدر عملاء طويل المدى:', 'A long-term client source:'), [['referrals ومحتوى', 'referrals and content'], ['منصات بس', 'platforms only'], ['إعلانات مدفوعة بس', 'paid ads only']], 0, B('سمعة.', 'Reputation.'))
      ] },

    { title: B('التسعير والعروض', 'Pricing and proposals'),
      goal: B('سعر بيعكس القيمة وعرض بيتقبل.', 'A price reflecting value and a proposal that wins.'),
      learn: [
        L(B('نماذج التسعير', 'Pricing models'),
          B('**hourly rate** (بالساعة: عادل للمجهول، بس بيعاقبك لما تبقى أسرع)، **fixed price** (للنطاق الواضح)، **value-based pricing** (نسبة من القيمة اللي بتوفرها)، و**retainer** (اشتراك شهري لساعات أو صيانة). احسب أقل سعر ليك من التكاليف والساعات الحقيقية القابلة للفوترة (مش 160 ساعة في الشهر!).', 'An **hourly rate** (fair for unknowns, but it punishes you for getting faster), a **fixed price** (for a clear scope), **value-based pricing** (a share of the value you create), and a **retainer** (a monthly subscription for hours or maintenance). Compute your floor price from costs and real billable hours (not 160 hours a month!).'),
          'const monthlyNeed = 1800;          // living + taxes + savings, USD\nconst tools = 120;                 // n8n cloud, servers, AI APIs, software\nconst billableHours = 80;          // ~50% of working time: the rest is sales, admin, learning\nconst floorRate = (monthlyNeed + tools) / billableHours;\nconsole.log(`floor hourly rate: $${floorRate.toFixed(0)}`);\n\nconst project = { hours: 30, valuePerMonth: 1400 };       // client saves $1,400/month\nconst fixed = Math.round(project.hours * floorRate * 1.3 / 50) * 50;          // +30% for risk\nconst valueBased = Math.round(project.valuePerMonth * 3 / 50) * 50;          // ~3 months of savings\nconsole.log(`fixed (cost-based): $${fixed} · value-based: $${valueBased} · payback for the client: ${(valueBased / project.valuePerMonth).toFixed(1)} months`);', N()),
        L(B('العرض اللي بيتقبل', 'The winning proposal'),
          B('**proposal** كويس بعد **discovery call**: مشكلتهم بكلامهم، النتيجة المتوقعة بأرقام، النطاق (وإيه اللي مش فيه)، 3 اختيارات سعر (الأساسي، الموصى بيه، الكامل)، المدة، **milestone** بالدفعات، والخطوة الجاية. صفحة أو اتنين، مش 15. المثال بيولّد هيكل عرض.', 'A good **proposal** after a **discovery call**: their problem in their words, the expected result in numbers, the scope (and what is out of it), 3 price options (basic, recommended, complete), the timeline, a **milestone** schedule with payments, and the next step. One or two pages, not 15. The example generates a proposal outline.'),
          'const p = { client: "Nile Gadgets", problem: "32 hours a week re-typing Shopify orders into Odoo, with 3% errors", goal: "orders reach Odoo in under 2 minutes with no manual entry",\n  options: [{ name: "Essential", price: 1500, items: ["Shopify → Odoo orders", "error alerts"] },\n            { name: "Recommended", price: 2400, items: ["Essential", "invoices + VAT", "daily report", "30-day hypercare"] },\n            { name: "Complete", price: 3600, items: ["Recommended", "WhatsApp AI assistant with approval"] }],\n  weeks: 3 };\nconst lines = [`Proposal — ${p.client}`, "", `Today: ${p.problem}.`, `Goal: ${p.goal}.`, "", "Options:"];\nfor (const o of p.options) lines.push(`  ${o.name.padEnd(12)} $${o.price.toLocaleString("en")}  — ${o.items.join(", ")}`);\nlines.push("", `Timeline: ${p.weeks} weeks. Payments: 40% to start · 30% at test sign-off · 30% at go-live.`, "Not included: data migration of past years, Odoo licences.", "Next step: reply «go» with the option, and I\'ll send the agreement and first invoice.");\nconsole.log(lines.join("\\n"));', N()),
        L(B('الدفعات والعربون', 'Payments and deposits'),
          B('متبدأش من غير **deposit** (30–50%) — بيحميك وبيأكد جدية العميل. ربط الدفعات بـ milestones قابلة للقياس. وحدد **payment terms** (7 أو 14 يوم) وطريقة الدفع (تحويل، Wise، Payoneer) والعملة. ولو العميل اتأخر: تذكير ودّي ثم حازم (أسبوع 39 في الإنجليزي)، ووقّف الشغل الجديد لحد الدفع.', 'Never start without a **deposit** (30–50%) — it protects you and confirms the client is serious. Tie payments to measurable milestones. Set **payment terms** (7 or 14 days), the method (transfer, Wise, Payoneer) and the currency. If the client is late: a friendly then firm reminder (week 39 of the English journey), and pause new work until payment.'),
          'milestone plan — $2,400, 3 weeks\nM1  kickoff + access + design approved           → 40% deposit  ($960)   due before work starts\nM2  orders + invoices working on staging         → 30%          ($720)   due on test sign-off\nM3  go-live + documentation + handover           → 30%          ($720)   due within 7 days of go-live\nterms: USD by bank transfer or Wise · 7-day payment terms · work on new requests pauses if an invoice is 14+ days late', T)
      ],
      practice: [
        B('احسب أقل سعر ساعة ليك بأرقامك.', 'Compute your floor hourly rate with your numbers.'),
        B('سعّر مشروع بالتكلفة وبالقيمة وقارن.', 'Price a project by cost and by value and compare.'),
        B('اكتب proposal بـ 3 اختيارات.', 'Write a proposal with 3 options.'),
        B('اكتب خطة milestones بدفعات.', 'Write a milestone plan with payments.')
      ],
      words: [
        W('hourly rate', 'سعر الساعة', 'the price per hour', 'My hourly rate is for unclear work only.'),
        W('fixed price', 'سعر ثابت للنطاق', 'one price for a defined scope', 'Clear scopes get a fixed price.'),
        W('value-based pricing', 'تسعير حسب القيمة', 'pricing by the value delivered', 'Value-based pricing reflected the savings.'),
        W('retainer', 'اشتراك شهري', 'a recurring monthly arrangement', 'The retainer covers 8 hours a month.'),
        W('proposal', 'عرض المشروع', 'a written offer for a project', 'Send the proposal within 24 hours.'),
        W('discovery call', 'مكالمة فهم المشكلة', 'a call to understand the client’s needs', 'The discovery call revealed the real problem.'),
        W('milestone', 'محطة تسليم بدفعة', 'a delivery point tied to payment', 'Milestone 2 is the staging sign-off.'),
        W('deposit', 'عربون', 'an upfront partial payment', 'A 40% deposit starts the project.'),
        W('payment terms', 'شروط الدفع', 'when and how payment is due', 'Payment terms are 7 days.')
      ],
      read: [{ lib: 'Node.js best practices', what: B('اختار ممارسات تذكرها في العرض كقيمة مضافة.', 'Pick practices to mention in proposals as added value.') }],
      challenge: B('جهّز «حقيبة التسعير»: حساب سعرك الأدنى، جدول أسعار لعروضك الـ productized، قالب proposal بـ 3 اختيارات ومولّد بسيط بـ Node، وقالب milestones بالدفعات — واستخدمها في عرض حقيقي واحد.', 'Prepare your «pricing kit»: your floor-rate calculation, a price table for your productized offers, a 3-option proposal template with a simple Node generator, and a milestone-payment template — and use it in one real proposal.'),
      quiz: [
        Q(B('ساعات قابلة للفوترة في الشهر:', 'Billable hours per month:'), [['أقل بكتير من 160 (مبيعات وإدارة وتعلّم)', 'far fewer than 160 (sales, admin, learning)'], ['160 بالظبط', 'exactly 160'], ['240', '240']], 0, B('واقعية.', 'Realism.')),
        Q(B('3 اختيارات في العرض:', '3 options in a proposal:'), [['العميل يختار ومش «نعم/لأ»', 'the client chooses, not «yes/no»'], ['تلخبط العميل', 'confuse the client'], ['ممنوعة', 'forbidden']], 0, B('اختيار.', 'Choice.')),
        Q(B('تبدأ الشغل:', 'Start work:'), [['بعد العربون', 'after the deposit'], ['قبل أي اتفاق', 'before any agreement'], ['بعد التسليم بشهر', 'a month after delivery']], 0, B('حماية.', 'Protection.'))
      ] },

    { title: B('إدارة المشروع والعقد', 'Running the project and the contract'),
      goal: B('نطاق واضح وتغييرات مكتوبة.', 'A clear scope and written changes.'),
      learn: [
        L(B('النطاق والعقد', 'Scope and contract'),
          B('**statement of work** (أو **scope of work**): المطلوب بالظبط، معايير القبول، اللي مش مشمول، الافتراضات، والمواعيد. و**contract** فيه: الدفع، **ip assignment** (الملكية بتنتقل للعميل بعد الدفع الكامل — وأدواتك العامة بتفضل ليك)، السرية (**nda** لو لازم)، الضمان، والإنهاء. معلومات عامة مش استشارة قانونية — استعن بمحامي للعقود الكبيرة.', 'A **statement of work** (or **scope of work**): exactly what is required, acceptance criteria, exclusions, assumptions and dates. And a **contract** covering: payment, **ip assignment** (ownership passes to the client after full payment — your general tools stay yours), confidentiality (an **nda** if needed), warranty and termination. General information, not legal advice — use a lawyer for large contracts.'),
          'SOW excerpt — Nile Gadgets order automation\nIn scope     Shopify orders → Odoo sales orders + invoices (VAT 15%), error alerts to Slack, daily report\nAcceptance   50 consecutive real orders posted correctly within 2 minutes; 0 duplicates; alerts tested\nOut of scope historical data migration, Odoo customisation, new Shopify apps\nAssumptions  client provides Odoo API user and Shopify admin access by day 2; one review round per milestone\nIP           custom workflows/code transfer to the client on full payment; my reusable libraries and\n             templates remain mine with a perpetual licence for the client  (not legal advice)', T),
        L(B('طلبات التغيير', 'Change requests'),
          B('**scope creep** بيقتل الربح: «وحاجة صغيرة كمان...». أي طلب برّه النطاق = **change request** مكتوب: الوصف، الأثر على الوقت والسعر، والموافقة قبل التنفيذ. قول «أكيد، ده برّه النطاق المتفق عليه — هبعتلك تقدير». المثال بيتابع التغييرات وأثرها.', '**scope creep** kills profit: «and one small thing…». Any request outside the scope = a written **change request**: the description, the impact on time and price, and approval before work. Say «Sure — that is outside the agreed scope; I’ll send an estimate». The example tracks changes and their impact.'),
          'const base = { price: 2400, weeks: 3 };\nconst changes = [\n  { id: "CR-1", what: "Add WooCommerce store too", hours: 14, status: "approved" },\n  { id: "CR-2", what: "Arabic PDF invoices", hours: 6, status: "approved" },\n  { id: "CR-3", what: "Sync 3 years of old orders", hours: 20, status: "declined" },\n  { id: "CR-4", what: "Change Slack alert wording", hours: 0.5, status: "absorbed" },\n];\nconst rate = 30;\nconst approved = changes.filter(c => c.status === "approved");\nconst extra = approved.reduce((s, c) => s + c.hours * rate, 0);\nconst extraWeeks = Math.ceil(approved.reduce((s, c) => s + c.hours, 0) / 20 * 10) / 10;\nfor (const c of changes) console.log(`${c.id} ${c.status.padEnd(9)} ${c.what} (${c.hours} h${c.status === "approved" ? `, +$${c.hours * rate}` : ""})`);\nconsole.log(`new total: $${base.price + extra} · timeline: ${base.weeks} + ${extraWeeks} weeks`);', N()),
        L(B('التواصل والمتابعة', 'Communication and tracking'),
          B('تحديث أسبوعي ثابت (اللي خلص، اللي جاي، المحتاج من العميل، المخاطر)، قناة واحدة للمشروع، وحدود واضحة لأوقات الرد. وسجّل وقتك (**time tracking**) حتى في المشاريع الثابتة — بيعرّفك تسعيرك صح ولا لأ. والـ **client onboarding**: قايمة صلاحيات ومعلومات تاخدها أول يوم.', 'A fixed weekly update (done, next, needed from the client, risks), one channel for the project, and clear response-time boundaries. Track your time (**time tracking**) even on fixed-price projects — it tells you whether your pricing is right. And **client onboarding**: a checklist of access and information to collect on day one.'),
          'const entries = [\n  { day: "Sun", task: "M1 design", h: 3 }, { day: "Mon", task: "Shopify webhook", h: 4.5 }, { day: "Tue", task: "Odoo node", h: 6 },\n  { day: "Wed", task: "Odoo node", h: 3 }, { day: "Wed", task: "client call", h: 1 }, { day: "Thu", task: "tests + docs", h: 2.5 },\n];\nconst estimate = 30, price = 2400;\nconst used = entries.reduce((s, e) => s + e.h, 0);\nconst byTask = Object.entries(entries.reduce((m, e) => ({ ...m, [e.task]: (m[e.task] ?? 0) + e.h }), {}));\nconsole.log(byTask.map(([t, h]) => `${t}: ${h} h`).join(" · "));\nconsole.log(`used ${used}/${estimate} h (${Math.round(100 * used / estimate)}%) · effective rate so far if done now: $${Math.round(price / used)}/h`);\nconsole.log("weekly update: done M1 + webhook + Odoo node · next invoices & VAT · need: Odoo test company · risk: Shopify rate limits during sales");', N())
      ],
      practice: [
        B('اكتب SOW بمعايير قبول ومستبعدات.', 'Write an SOW with acceptance criteria and exclusions.'),
        B('اعمل قالب change request.', 'Create a change-request template.'),
        B('ابعت تحديث أسبوعي بالهيكل.', 'Send a weekly update with the structure.'),
        B('سجّل وقتك أسبوع كامل.', 'Track your time for a full week.')
      ],
      words: [
        W('statement of work', 'وثيقة نطاق العمل', 'a document defining the work', 'Both sides signed the statement of work.'),
        W('scope of work', 'نطاق العمل', 'the defined boundaries of the work', 'The scope of work excludes data migration.'),
        W('contract', 'عقد', 'a binding agreement', 'The contract sets payment terms.'),
        W('ip assignment', 'نقل الملكية الفكرية', 'transferring ownership of work', 'IP assignment happens on full payment.'),
        W('nda', 'اتفاقية عدم إفصاح', 'a non-disclosure agreement', 'Sign an NDA before seeing their data.'),
        W('scope creep', 'توسع النطاق من غير اتفاق', 'uncontrolled growth of scope', 'Change requests stop scope creep.'),
        W('change request', 'طلب تغيير مكتوب', 'a written request to change scope', 'CR-1 added WooCommerce.'),
        W('time tracking', 'تسجيل الوقت', 'recording time spent on work', 'Time tracking showed I underpriced.'),
        W('client onboarding', 'استقبال العميل وتجهيزه', 'setting up a new client', 'Client onboarding collects all access on day one.')
      ],
      read: [{ lib: 'Conventional Commits', what: B('استخدمه عشان changelog العميل يبقى واضح.', 'Use it so the client changelog is clear.') }],
      challenge: B('جهّز «حقيبة إدارة المشروع»: قالب SOW وعقد بسيط (بتنبيه «ليس استشارة قانونية»)، قالب change request ومتتبع، قالب تحديث أسبوعي، checklist للـ onboarding، وأداة Node صغيرة لتقرير الوقت مقابل التقدير.', 'Prepare your «project management kit»: an SOW template and a simple contract (with a «not legal advice» note), a change-request template and tracker, a weekly-update template, an onboarding checklist, and a small Node tool reporting time against the estimate.'),
      quiz: [
        Q(B('«وحاجة صغيرة كمان» برّه النطاق:', '«One more small thing» outside the scope:'), [['change request بتقدير', 'a change request with an estimate'], ['اعملها ببلاش دايمًا', 'always do it free'], ['ارفض بعصبية', 'refuse angrily']], 0, B('نطاق.', 'Scope.')),
        Q(B('معيار قبول كويس:', 'A good acceptance criterion:'), [['50 طلب متتالي صح في دقيقتين', '50 consecutive correct orders within 2 minutes'], ['شغال كويس', 'works well'], ['العميل مبسوط', 'the client is happy']], 0, B('قياس.', 'Measurable.')),
        Q(B('time tracking في مشروع ثابت:', 'Time tracking on a fixed-price project:'), [['يعرّفك تسعيرك صح ولا لأ', 'shows whether your pricing is right'], ['مش مهم', 'pointless'], ['للعميل بس', 'only for the client']], 0, B('تعلّم.', 'Learning.'))
      ] },

    { title: B('التسليم والصيانة', 'Delivery and maintenance'),
      goal: B('تسليم بيكسب ثقة وعقد صيانة.', 'A delivery that earns trust and a care plan.'),
      learn: [
        L(B('التسليم', 'The handover'),
          B('**handover** محترف: **documentation** (README، رسم المعمارية، runbook، إزاي تضيف قاعدة)، فيديو walkthrough، الصلاحيات والأسرار تنتقل لحسابات العميل (وتتغيّر بعد التسليم)، تدريب شخصين من عندهم، وفترة متابعة (hypercare) أسبوعين. وده أحسن وقت تطلب فيه testimonial.', 'A professional **handover**: **documentation** (README, architecture diagram, runbook, how to add a rule), a walkthrough video, access and secrets moved to the client’s accounts (and rotated after handover), training two of their people, and a two-week follow-up period (hypercare). It is also the best moment to ask for a testimonial.'),
          'handover checklist\n☐ repo, n8n instance, servers, domains, API apps owned by the client’s accounts\n☐ secrets rotated after handover; my access removed or limited to the care plan\n☐ docs: README (run it in 5 min) · architecture diagram · runbook (5 known failures) · «how to add a supplier rule»\n☐ 45-min recorded walkthrough · 2 client staff can restart a workflow and read the logs\n☐ 14-day hypercare: daily check, same-day fixes\n☐ final invoice · testimonial request · case-study permission', T),
        L(B('خطط الصيانة', 'Care plans'),
          B('الأتمتة محتاجة صيانة: APIs بتتغير، n8n بيتحدّث، الحجم بيكبر. **care plan** / **maintenance plan** شهري: مراقبة وتنبيهات، تحديثات، نسخ احتياطي، ساعات تعديلات، وتقرير شهري. دخل ثابت ليك وراحة بال للعميل. حدد اللي مشمول بالظبط ووقت الرد.', 'Automation needs maintenance: APIs change, n8n updates, volume grows. A monthly **care plan** / **maintenance plan**: monitoring and alerts, updates, backups, hours of changes, and a monthly report. Steady income for you and peace of mind for the client. Define exactly what is included and the response time.'),
          'const plans = [\n  { name: "Basic", price: 120, hours: 2, response: "2 business days", items: ["monitoring + alerts", "monthly updates", "backups"] },\n  { name: "Business", price: 220, hours: 4, response: "next business day", items: ["Basic", "monthly report", "API change fixes"] },\n  { name: "Priority", price: 450, hours: 10, response: "4 hours (business days)", items: ["Business", "on-call for outages", "quarterly review"] },\n];\nconst clients = { Basic: 3, Business: 5, Priority: 1 };\nfor (const p of plans) console.log(`${p.name.padEnd(9)} $${p.price}/mo · ${p.hours} h changes · response ${p.response} · ${p.items.join(", ")}`);\nconst mrr = plans.reduce((s, p) => s + p.price * (clients[p.name] ?? 0), 0);\nconsole.log(`\\n${Object.values(clients).reduce((a, b) => a + b, 0)} clients on care plans → $${mrr}/month recurring`);', N()),
        L(B('التقرير الشهري', 'The monthly report'),
          B('التقرير الشهري بيوري قيمتك: العمليات اللي اتنفذت، الوقت والفلوس اللي اتوفرت، الأعطال وإزاي اتحلت، التحديثات، والاقتراحات للشهر الجاي (فرصة لمشروع جديد). خليه آلي — n8n أو سكربت Node بيجمّع الأرقام من اللوج والقاعدة.', 'The monthly report shows your value: operations executed, time and money saved, incidents and how they were solved, updates, and suggestions for next month (an opening for a new project). Make it automatic — n8n or a Node script gathering the numbers from logs and the database.'),
          'const month = { orders: 1960, invoices: 1940, failed: 6, fixedSameDay: 6, minutesSavedPerOrder: 6, hourly: 12, uptime: 99.93, updates: ["n8n 1.110 → 1.112", "Shopify API 2026-07"] };\nconst hours = month.orders * month.minutesSavedPerOrder / 60;\nconsole.log(`Monthly report — September 2026`);\nconsole.log(`• ${month.orders} orders and ${month.invoices} invoices processed automatically (${month.uptime}% uptime)`);\nconsole.log(`• ${Math.round(hours)} staff hours saved ≈ $${Math.round(hours * month.hourly).toLocaleString("en")}`);\nconsole.log(`• ${month.failed} failures, all fixed the same day (Odoo maintenance window)`);\nconsole.log(`• updates: ${month.updates.join("; ")}`);\nconsole.log(`• suggestion: automate supplier invoices next (≈ 15 h/week of manual entry left)`);', N())
      ],
      practice: [
        B('اكتب handover checklist لمشروع.', 'Write a handover checklist for a project.'),
        B('صمّم 3 خطط صيانة بأسعار.', 'Design 3 care plans with prices.'),
        B('اعمل تقرير شهري آلي.', 'Build an automatic monthly report.'),
        B('اطلب testimonial من عميل.', 'Ask a client for a testimonial.')
      ],
      words: [
        W('handover', 'تسليم المشروع', 'transferring a finished project', 'The handover included a walkthrough video.'),
        W('documentation', 'التوثيق', 'written explanations of a system', 'Good documentation reduces support calls.'),
        W('care plan', 'خطة رعاية شهرية', 'an ongoing support subscription', 'The care plan includes monitoring.'),
        W('maintenance plan', 'خطة صيانة', 'a recurring maintenance agreement', 'Offer a maintenance plan at handover.'),
        W('monthly report', 'تقرير شهري', 'a recurring summary of results', 'The monthly report showed 196 hours saved.'),
        W('recurring revenue', 'دخل متكرر', 'income that repeats each month', 'Care plans give recurring revenue.')
      ],
      read: [{ lib: 'n8n Docs: Built-in methods and variables', what: B('استخدم $execution في التقارير الآلية.', 'Use $execution in automatic reports.') }],
      challenge: B('جهّز «حقيبة التسليم والصيانة»: handover checklist، قالب توثيق (README، runbook)، 3 خطط صيانة بشروط واضحة، وتقرير شهري آلي (n8n أو Node) بيطلع من بيانات حقيقية — وابعت عرض care plan لعميل.', 'Prepare your «delivery and maintenance kit»: a handover checklist, a documentation template (README, runbook), 3 care plans with clear terms, and an automatic monthly report (n8n or Node) built from real data — and send a care-plan offer to a client.'),
      quiz: [
        Q(B('بعد التسليم:', 'After handover:'), [['غيّر الأسرار وانقل الملكية', 'rotate secrets and transfer ownership'], ['احتفظ بكل الصلاحيات', 'keep all access'], ['امسح التوثيق', 'delete the docs']], 0, B('ملكية.', 'Ownership.')),
        Q(B('care plan بيدّي:', 'A care plan gives:'), [['دخل ثابت وراحة للعميل', 'steady income and peace of mind for the client'], ['شغل مجاني', 'free work'], ['ولا حاجة', 'nothing']], 0, B('متكرر.', 'Recurring.')),
        Q(B('التقرير الشهري يوري:', 'The monthly report shows:'), [['القيمة بالأرقام', 'the value in numbers'], ['الكود', 'the code'], ['كلمات السر', 'passwords']], 0, B('قيمة.', 'Value.'))
      ] },

    { title: B('أدواتك اللي بتسرّعك', 'Your tools that speed you up'),
      goal: B('كل مشروع أسرع من اللي قبله.', 'Every project faster than the last.'),
      learn: [
        L(B('مكتبة قوالب', 'A template library'),
          B('**templates** و**reusable components** هما سر الفري لانسر المربح: starter repo (TypeScript، اختبارات، Docker، CI، loadConfig، pino)، workflows n8n جاهزة (error handler، retries، approval)، نود مخصصة بتاعتك، وMCP servers. كل مشروع جديد بيبدأ من 60% خلصان.', '**templates** and **reusable components** are the secret of a profitable freelancer: a starter repo (TypeScript, tests, Docker, CI, loadConfig, pino), ready n8n workflows (error handler, retries, approval), your own custom nodes, and MCP servers. Every new project starts 60% done.'),
          'my-automation-kit/\n  starter-node-ts/        TS + node:test + Dockerfile + CI + loadConfig + pino + graceful shutdown\n  n8n-templates/\n    error-handler.json    Error Trigger → Slack/Telegram with execution link\n    approval-flow.json    Wait node + Telegram buttons\n    idempotent-webhook.json\n  n8n-nodes-odoo-plus/    my community node (published)\n  mcp-shop-tools/         MCP server: orders, invoices, reports\n  docs-templates/         README, runbook, SOW, handover checklist, monthly report\n  scripts/new-project.mjs copies the starter, renames, creates the repo', T),
        L(B('سكربت مشروع جديد', 'A new-project script'),
          B('أتمت بداية المشروع نفسها: سكربت Node بياخد اسم العميل ويعمل المجلد من القالب، يغيّر الأسماء، يولّد .env.example، ويطبع الخطوات الجاية. المثال بيعمل ده في مجلد مؤقت بـ `fs.cp` و`util.parseArgs`.', 'Automate the project start itself: a Node script taking the client name, creating the folder from the template, renaming things, generating .env.example and printing next steps. The example does this in a temporary folder with `fs.cp` and `util.parseArgs`.'),
          'import { mkdtemp, mkdir, writeFile, cp, readFile, readdir } from "node:fs/promises";\nimport { join } from "node:path";\nimport { tmpdir } from "node:os";\nimport { parseArgs } from "node:util";\n\nconst { values } = parseArgs({ args: ["--client", "Nile Gadgets", "--stack", "shopify-odoo"], options: { client: { type: "string" }, stack: { type: "string" } } });\nconst root = await mkdtemp(join(tmpdir(), "kit-"));\nconst starter = join(root, "starter");                       // pretend this is your starter repo\nawait mkdir(join(starter, "src"), { recursive: true });\nawait writeFile(join(starter, "package.json"), JSON.stringify({ name: "__SLUG__", version: "0.1.0" }, null, 1));\nawait writeFile(join(starter, "src", "config.js"), "export const SERVICE = \'__SLUG__\';\\n");\n\nconst slug = values.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");\nconst dest = join(root, `${slug}-automation`);\nawait cp(starter, dest, { recursive: true });\nfor (const f of ["package.json", join("src", "config.js")]) {\n  const p = join(dest, f);\n  await writeFile(p, (await readFile(p, "utf8")).replaceAll("__SLUG__", slug));\n}\nconst envVars = { "shopify-odoo": ["SHOPIFY_STORE", "SHOPIFY_TOKEN", "ODOO_URL", "ODOO_DB", "ODOO_USER", "ODOO_API_KEY"] }[values.stack] ?? [];\nawait writeFile(join(dest, ".env.example"), ["DATABASE_URL=", "LOG_LEVEL=info", ...envVars.map(v => v + "=")].join("\\n") + "\\n");\nconsole.log("created", dest.split(/[\\\\/]/).pop(), "→", (await readdir(dest)).sort().join(", "));\nconsole.log(JSON.parse(await readFile(join(dest, "package.json"), "utf8")).name);\nconsole.log("next: fill .env · git init · run the smoke workflow · book the kickoff call");', N()),
        L(B('الاستدامة', 'Sustainability'),
          B('الشغل الحر بيحرق بسرعة لو من غير **boundaries**: ساعات شغل وأيام راحة، أوقات رد محددة، رفض المشاريع برّه تخصصك أو بميزانية مش مناسبة، وحد أقصى لعدد العملاء في نفس الوقت. خصص وقت أسبوعي للتعلّم ولتحسين أدواتك — ده استثمار في سعرك الجاي. واحذر من **burnout**.', 'Freelancing burns out fast without **boundaries**: working hours and days off, set response times, declining projects outside your niche or with an unsuitable budget, and a cap on concurrent clients. Reserve weekly time for learning and improving your tools — an investment in your next price. And beware of **burnout**.'),
          'my rules (example)\n• work Sun–Thu 10:00–18:00; Friday off; replies within 1 business day (care-plan clients: per plan)\n• max 3 active projects + care plans; new projects start only when one ends\n• decline: budgets under $800, projects outside automation/integrations, «just copy competitor X»\n• every Thursday afternoon: improve the kit (one template, one doc, one test)\n• quarterly: raise prices 10% for new clients if the calendar is full', T)
      ],
      practice: [
        B('اعمل starter repo بتاعك.', 'Create your starter repo.'),
        B('جمّع 3 workflows n8n قابلة لإعادة الاستخدام.', 'Collect 3 reusable n8n workflows.'),
        B('اكتب سكربت new-project.', 'Write a new-project script.'),
        B('اكتب قواعد الحدود بتاعتك.', 'Write your boundary rules.')
      ],
      words: [
        W('templates', 'قوالب جاهزة', 'ready-made starting points', 'My templates save a week per project.'),
        W('reusable components', 'أجزاء قابلة لإعادة الاستخدام', 'parts used across projects', 'The error handler is a reusable component.'),
        W('starter repo', 'مستودع بداية جاهز', 'a template repository for new projects', 'Every project starts from my starter repo.'),
        W('boundaries', 'حدود تحمي وقتك', 'limits that protect your time', 'Clear boundaries prevent burnout.'),
        W('burnout', 'احتراق نفسي', 'exhaustion from long stress', 'Too many clients led to burnout.')
      ],
      read: [{ lib: 'Node.js: File system', what: B('راجع cp وmkdtemp.', 'Review cp and mkdtemp.') }],
      challenge: B('ابني «my-automation-kit»: starter repo بـ TypeScript واختبارات وDocker وCI، 3 workflows n8n جاهزة، قوالب الوثائق، وسكربت new-project — وابدأ مشروع تجربة منه وقيس الوقت لحد أول نشر على staging.', 'Build «my-automation-kit»: a starter repo with TypeScript, tests, Docker and CI, 3 ready n8n workflows, the document templates, and a new-project script — then start a demo project from it and time it until the first staging deploy.'),
      quiz: [
        Q(B('سر الفري لانسر المربح:', 'The secret of a profitable freelancer:'), [['قوالب وأجزاء قابلة لإعادة الاستخدام', 'templates and reusable components'], ['ساعات أكتر', 'more hours'], ['أسعار أقل', 'lower prices']], 0, B('سرعة.', 'Speed.')),
        Q(B('مشروع برّه تخصصك بميزانية قليلة:', 'A project outside your niche with a low budget:'), [['ارفض بأدب', 'decline politely'], ['اقبل دايمًا', 'always accept'], ['متردش', 'ignore it']], 0, B('حدود.', 'Boundaries.')),
        Q(B('الكالندر مليان دايمًا:', 'The calendar is always full:'), [['زوّد السعر للعملاء الجدد', 'raise prices for new clients'], ['اشتغل الويك إند', 'work weekends'], ['خفّض السعر', 'lower prices']], 0, B('طلب.', 'Demand.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('بيزنس شغل حر مستدام.', 'A sustainable freelance business.'),
      review: [
        B('التخصص والعرض والـ portfolio ودراسات الحالة.', 'Niche, positioning, portfolio and case studies.'),
        B('نماذج التسعير والعروض والـ milestones والعربون.', 'Pricing models, proposals, milestones and deposits.'),
        B('SOW والعقد وطلبات التغيير وتسجيل الوقت.', 'The SOW, the contract, change requests and time tracking.'),
        B('التسليم وخطط الصيانة والتقرير الشهري.', 'Handover, care plans and the monthly report.'),
        B('القوالب والأدوات والحدود.', 'Templates, tools and boundaries.')
      ],
      project: B('مشروع الأسبوع «بيزنس الأتمتة بتاعك»: positioning statement وعرضين productized، portfolio بـ 3 دراسات حالة، حقيبة تسعير (سعر أدنى، proposal بـ 3 اختيارات، milestones)، قوالب SOW وعقد (ليس استشارة قانونية) وchange requests وتحديث أسبوعي، handover checklist و3 خطط صيانة وتقرير شهري آلي، وmy-automation-kit بسكربت new-project — ونفّذ أول خطوتين لجلب عميل حقيقي.', 'Week project «your automation business»: a positioning statement and two productized offers, a portfolio with 3 case studies, a pricing kit (floor rate, a 3-option proposal, milestones), SOW and contract templates (not legal advice), change requests and a weekly update, a handover checklist, 3 care plans and an automatic monthly report, and my-automation-kit with a new-project script — and take the first two steps toward a real client.'),
      test: [
        Q(B('productized service:', 'A productized service:'), [['نطاق وسعر ثابت', 'a fixed scope and price'], ['منتج مادي', 'a physical product'], ['بالساعة دايمًا', 'always hourly']], 0, B('ثابت.', 'Fixed.')),
        Q(B('دراسة حالة:', 'A case study:'), [['مشكلة وحل ونتايج بالأرقام', 'problem, solution and results in numbers'], ['سيرة ذاتية', 'a CV'], ['كود', 'code']], 0, B('أثر.', 'Impact.')),
        Q(B('سعر بالقيمة:', 'Value-based price:'), [['جزء من اللي العميل بيوفره', 'a share of what the client saves'], ['ساعات × سعر', 'hours × rate'], ['أرخص سعر', 'the cheapest price']], 0, B('قيمة.', 'Value.')),
        Q(B('retainer:', 'A retainer:'), [['اشتراك شهري', 'a monthly subscription'], ['عربون', 'a deposit'], ['غرامة', 'a fine']], 0, B('متكرر.', 'Recurring.')),
        Q(B('discovery call:', 'A discovery call:'), [['فهم المشكلة قبل العرض', 'understanding the problem before proposing'], ['تسليم', 'delivery'], ['دفع', 'payment']], 0, B('فهم.', 'Understanding.')),
        Q(B('deposit:', 'A deposit:'), [['دفعة مقدمة قبل البدء', 'an upfront payment before starting'], ['خصم', 'a discount'], ['مكافأة', 'a bonus']], 0, B('حماية.', 'Protection.')),
        Q(B('IP assignment:', 'IP assignment:'), [['نقل ملكية الشغل بعد الدفع', 'transferring ownership after payment'], ['عنوان IP', 'an IP address'], ['فاتورة', 'an invoice']], 0, B('ملكية.', 'Ownership.')),
        Q(B('scope creep:', 'Scope creep:'), [['توسع النطاق من غير اتفاق', 'scope growing without agreement'], ['تسليم مبكر', 'early delivery'], ['خطأ برمجي', 'a bug']], 0, B('ربح.', 'Profit.')),
        Q(B('handover:', 'A handover:'), [['توثيق وصلاحيات وتدريب ومتابعة', 'docs, access, training and follow-up'], ['إرسال الكود بس', 'just sending code'], ['اختفاء', 'disappearing']], 0, B('ثقة.', 'Trust.')),
        Q(B('care plan:', 'A care plan:'), [['صيانة شهرية بشروط واضحة', 'monthly maintenance with clear terms'], ['تأمين صحي', 'health insurance'], ['خصم', 'a discount']], 0, B('صيانة.', 'Maintenance.')),
        Q(B('starter repo:', 'A starter repo:'), [['بداية جاهزة لكل مشروع', 'a ready start for each project'], ['مستودع فاضي', 'an empty repo'], ['نسخة احتياطية', 'a backup']], 0, B('سرعة.', 'Speed.')),
        Q(B('ضد الـ burnout:', 'Against burnout:'), [['حدود وحد أقصى للعملاء', 'boundaries and a client cap'], ['شغل كل يوم', 'working every day'], ['قبول كل مشروع', 'accepting every project']], 0, B('استدامة.', 'Sustainability.'))
      ] }
  ]
};
