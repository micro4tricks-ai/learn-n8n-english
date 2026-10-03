// n8n week 45 — Selling automation: discovery, pricing and proposals (expert level).
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('بيع الأتمتة: الاكتشاف والتسعير والعروض', 'Selling automation: discovery, pricing and proposals'),
  goal: B('تبيع الأتمتة كقيمة مش كساعات: ترسم عمليات العميل وتحسب العائد بأرقام مقنعة، تبني عروض جاهزة بباقات، تدير مسار مبيعات منظم، ترد على الاعتراضات بثقة، وتتعامل مع صفقات الشركات الكبيرة (المشتريات واستبيانات الأمان ونطاق العمل).',
          'Sell automation as value, not hours: map the client’s processes and calculate a convincing return, build productised offers with tiers, run an organised sales pipeline, answer objections with confidence, and handle large-company deals (procurement, security questionnaires and statements of work).'),
  days: [
    { title: B('الاكتشاف والعائد', 'Discovery and return'),
      goal: B('تلاقي الأتمتة اللي بتفرق وتحسب قيمتها.', 'Find the automation that matters and calculate its value.'),
      learn: [
        L(B('رسم العملية', 'Mapping the process'),
          B('**process mapping**: قبل أي حل، ارسم العملية زي ما هي فعلًا مع اللي بيعملها: الخطوات، مين، الأدوات، الوقت لكل خطوة، كام مرة في الأسبوع، وفين الأخطاء والتأخير. الـ **pain point** الحقيقي غالبًا مش اللي العميل قاله أول مرة — بيطلع من التفاصيل.', '**process mapping**: before any solution, map the process as it really is with the person doing it: the steps, who, the tools, the time per step, how often per week, and where errors and delays happen. The real **pain point** is often not what the client said first — it comes out of the details.'),
          'process: "new wholesale order"   (with the sales assistant, 40 min)\n1. order arrives by WhatsApp/email (35/week)          2 min   — often missing quantities\n2. copy into Excel price list, compute total          8 min   — 1 in 10 has a price error\n3. check stock in another sheet                       4 min\n4. write invoice in Word, export PDF, email           10 min\n5. log in the "orders" sheet, tell the warehouse      3 min\ntotal ≈ 27 min × 35 = 15.8 h/week · errors ≈ 3.5/week (refunds, angry calls)'),
        L(B('حساب العائد', 'Calculating the return'),
          B('**roi** بالأرقام اللي العميل نفسه اداها: **time saved** × تكلفة الساعة + تكلفة الأخطاء اللي هتقل + فرص (ردود أسرع = مبيعات أكتر) — مقابل تكلفة البناء والتشغيل. و**payback period** = البناء ÷ التوفير الشهري. رقم زي «بيرجع فلوسه في 3 شهور» بيبيع أحسن من أي وصف.', '**roi** using the numbers the client gave you: **time saved** × hourly cost + the cost of errors avoided + opportunities (faster replies = more sales) — against the build and running cost. And the **payback period** = build ÷ monthly saving. A line like «pays for itself in 3 months» sells better than any description.'),
          'time saved: 15.8 h/week × 80% automated = 12.6 h/week ≈ 55 h/month × 120 EGP/h = 6,600 EGP/month\nerrors: 3.5/week × 4 × 350 EGP average cost = 4,900 EGP/month (assume 70% fewer → 3,430)\ntotal value ≈ 10,030 EGP/month\ncost: build 24,000 EGP + run 1,500 EGP/month → net 8,530/month\npayback ≈ 24,000 ÷ 8,530 ≈ 2.8 months · year-1 net ≈ 78,000 EGP'),
        L(B('اختيار الأتمتة الصح', 'Choosing the right automation'),
          B('**opportunity scoring**: لكل فكرة أتمتة: القيمة (ساعات وأخطاء)، الصعوبة (أنظمة من غير API؟ قواعد غامضة؟)، المخاطرة (فلوس؟ عملاء؟)، والتكرار. ابدأ بالقيمة العالية والصعوبة الواطية — «مكسب سريع» يبني الثقة قبل المشاريع الكبيرة.', '**opportunity scoring**: for each automation idea: value (hours and errors), difficulty (systems without an API? vague rules?), risk (money? customers?), and frequency. Start with high value and low difficulty — a «quick win» builds trust before the big projects.'),
          'idea                         value  difficulty  risk   score  → plan\norder → invoice → warehouse    5      2           2      ★★★★   phase 1 (quick win)\nAI reply to WhatsApp leads     4      3           3      ★★★    phase 2 with human approval\nsync 3 accounting systems      5      5           4      ★★     paid discovery first\nweekly report email            2      1           1      ★★     bundle into phase 1')
      ],
      practice: [
        B('ارسم عملية حقيقية مع اللي بيعملها (30 دقيقة).', 'Map a real process with the person doing it (30 minutes).'),
        B('احسب الوقت والأخطاء الشهرية بالأرقام.', 'Calculate monthly time and errors in numbers.'),
        B('اعمل حساب ROI وpayback.', 'Build an ROI and payback calculation.'),
        B('رتّب 5 أفكار بـ opportunity scoring.', 'Rank 5 ideas with opportunity scoring.')
      ],
      words: [
        W('process mapping', 'رسم العملية خطوة بخطوة', 'drawing a process step by step', 'Process mapping found the real delay.'),
        W('pain point', 'المشكلة اللي بتوجع العميل', 'the problem that hurts the client', 'The pain point was price errors.'),
        W('roi', 'العائد على الاستثمار', 'return on investment', 'The ROI is 4× in the first year.'),
        W('time saved', 'الوقت اللي الأتمتة بتوفره', 'the time the automation saves', 'Time saved is 55 hours a month.'),
        W('payback period', 'المدة لحد ما المشروع يرجّع تكلفته', 'how long until a project pays for itself', 'The payback period is under 3 months.'),
        W('opportunity scoring', 'ترتيب أفكار الأتمتة بالقيمة والصعوبة', 'ranking automation ideas by value and difficulty', 'Opportunity scoring picked the quick win.')
      ],
      read: [{ t: 'n8n: ROI of automation (blog)', url: 'https://blog.n8n.io/', what: B('دوّر على مقالات قصص العملاء والعائد.', 'Look for customer stories and ROI posts.') }],
      challenge: B('اعمل «تقرير فرص الأتمتة» لشركة حقيقية (صاحب أو محل): رسم عمليتين، حساب ROI وpayback بأرقامهم، ترتيب 5 أفكار، واقتراح مرحلة أولى — في صفحتين.', 'Write an «automation opportunities report» for a real business (a friend’s or a shop): two process maps, ROI and payback with their numbers, 5 ranked ideas and a proposed phase 1 — in two pages.'),
      quiz: [
        Q(B('أحسن مصدر لأرقام العائد:', 'The best source of ROI numbers:'), [['أرقام العميل نفسه', 'the client’s own numbers'], ['تخمينك', 'your guess'], ['إعلانات', 'adverts']], 0, B('مقنع.', 'Convincing.')),
        Q(B('بناء 24 ألف وتوفير 8 آلاف شهريًا:', 'A 24k build saving 8k a month:'), [['payback ~3 شهور', 'payback ~3 months'], ['سنة', 'a year'], ['مستحيل', 'never']], 0, B('حساب.', 'Arithmetic.')),
        Q(B('تبدأ بـ:', 'Start with:'), [['قيمة عالية وصعوبة واطية', 'high value, low difficulty'], ['أصعب مشروع', 'the hardest project'], ['أرخص فكرة', 'the cheapest idea']], 0, B('quick win.', 'A quick win.'))
      ] },

    { title: B('باقات العروض', 'Packaged offers'),
      goal: B('عروض جاهزة بأسعار ثابتة بتتباع أسهل.', 'Ready offers with fixed prices that sell more easily.'),
      learn: [
        L(B('خدمة كمنتج', 'A service as a product'),
          B('**productized service**: بدل «قولّي عايز إيه وأقولّك السعر»، عرض محدد باسم وسعر ونطاق ومدة: «أتمتة الطلبات للمتاجر — 18,000 جنيه، أسبوعين، تشمل X وY». أسهل في البيع (العميل يقارن ويقرر)، أسهل في التنفيذ (بتتكرر)، وأربح (بتتحسّن كل مرة).', 'A **productized service**: instead of «tell me what you want and I will quote», a defined offer with a name, price, scope and timeline: «order automation for shops — 18,000 EGP, two weeks, includes X and Y». Easier to sell (the client compares and decides), easier to deliver (it repeats), and more profitable (it improves every time).'),
          '«Shop Orders Autopilot» — 18,000 EGP · 10 working days\nincludes: Shopify/WooCommerce orders → invoice PDF → WhatsApp + email to customer → stock sheet → daily summary\nincludes: setup on your n8n or ours · 2 revisions · training video · 30 days of fixes\nnot included: custom ERP integrations (quoted separately) · more than 2 shops'),
        L(B('الباقات', 'Tiers'),
          B('3 مستويات (أساسي، احترافي، متكامل) بتخلّي العميل يختار «ده ولا ده» بدل «أعمل ولا لأ». الأوسط غالبًا الأكتر مبيعًا — صمّمه كالاختيار الطبيعي. وكل مستوى بيضيف قيمة واضحة (مش بس «ساعات أكتر»).', 'Three tiers (basic, professional, complete) make the client choose «this or that» instead of «yes or no». The middle one usually sells most — design it as the natural choice. Each tier adds clear value (not just «more hours»).'),
          '               Starter 9,000      Pro 18,000 ★         Complete 32,000\norders → invoice  ✓                  ✓                    ✓\nWhatsApp updates  –                  ✓                    ✓\nstock + reorder   –                  ✓                    ✓ + supplier email\nAI replies        –                  –                    ✓ (with approval)\nsupport           14 days            30 days              90 days + monthly report'),
        L(B('الاكتشاف المدفوع والتجربة', 'Paid discovery and pilots'),
          B('للمشاريع الكبيرة أو الغامضة: **paid discovery** (أسبوع بسعر ثابت: رسم العمليات، تقرير فرص، معمارية، تقدير) — العميل ياخد قيمة حتى لو مكملش، وانت متتورطش في سعر غلط. أو **pilot project**: جزء صغير حقيقي بشهر بيثبت القيمة قبل العقد الكبير.', 'For big or unclear projects: **paid discovery** (a fixed-price week: process maps, an opportunities report, an architecture, an estimate) — the client gets value even if they stop, and you avoid a wrong price. Or a **pilot project**: a small real part in a month proving the value before the big contract.'),
          'Automation Discovery — 6,000 EGP · 5 days (credited against phase 1 if signed within 30 days)\nday 1–2: interviews + process maps · day 3: data & systems check (APIs, access)\nday 4: opportunities + ROI · day 5: architecture, phases, fixed-price quote, risks')
      ],
      practice: [
        B('صمّم productized service واحد لنيتش بتحبه.', 'Design one productized service for a niche you like.'),
        B('اعمل 3 باقات بالقيمة المضافة لكل واحدة.', 'Build 3 tiers with the value each adds.'),
        B('اكتب عرض paid discovery.', 'Write a paid-discovery offer.'),
        B('اعمل صفحة هبوط للخدمة (n8n Form للطلب).', 'Build a landing page for the service (an n8n Form for requests).')
      ],
      words: [
        W('productized service', 'خدمة باسم وسعر ونطاق ثابتين', 'a service with a fixed name, price and scope', 'Our productized service takes 10 days.'),
        W('pricing tier', 'مستوى سعر بمميزات', 'a price level with features', 'Most clients pick the middle pricing tier.'),
        W('paid discovery', 'مرحلة اكتشاف مدفوعة', 'a paid discovery phase', 'Start big projects with paid discovery.'),
        W('pilot project', 'مشروع تجريبي صغير يثبت القيمة', 'a small trial project proving value', 'The pilot project ran for a month.'),
        W('out of scope', 'خارج نطاق العرض', 'outside the offer’s scope', 'ERP integrations are out of scope.')
      ],
      read: [{ t: 'Brennan Dunn: Productized services (Double Your Freelancing)', url: 'https://doubleyourfreelancing.com/', what: B('دوّر على productized.', 'Search for productized.') }],
      challenge: B('اعمل «كتالوج خدمات» لوكالتك: productized service رئيسي بـ 3 باقات، عرض paid discovery، عرض صيانة شهرية، وصفحة هبوط واحدة بفورم n8n بيسجّل الطلبات في CRM.', 'Create a «service catalogue» for your agency: a main productized service with 3 tiers, a paid-discovery offer, a monthly maintenance offer, and one landing page with an n8n form logging requests in a CRM.'),
      quiz: [
        Q(B('ميزة الخدمة كمنتج:', 'The advantage of a productized service:'), [['أسهل في البيع والتنفيذ', 'easier to sell and deliver'], ['أغلى دايمًا', 'always pricier'], ['من غير نطاق', 'no scope']], 0, B('تكرار.', 'Repeatable.')),
        Q(B('3 باقات بتخلّي العميل:', 'Three tiers make the client:'), [['يختار بين اختيارات', 'choose between options'], ['يرفض', 'refuse'], ['يتلخبط', 'get confused']], 0, B('مقارنة.', 'Comparison.')),
        Q(B('مشروع كبير غامض:', 'A big unclear project:'), [['paid discovery', 'paid discovery'], ['سعر ثابت فورًا', 'a fixed price at once'], ['ساعات مفتوحة', 'open hours']], 0, B('وضوح.', 'Clarity.'))
      ] },

    { title: B('مسار المبيعات', 'The sales pipeline'),
      goal: B('عملاء جداد بانتظام مش بالصدفة.', 'New clients regularly, not by chance.'),
      learn: [
        L(B('العميل المثالي', 'The ideal client'),
          B('**ideal client profile**: مين بالظبط (مجال، حجم، أدوات، مشكلة) اللي بيكسب أكتر من شغلك وبيدفع بسهولة. مثال: «متاجر أونلاين في مصر والخليج، 300–3000 طلب شهريًا، على Shopify، فريق 3–15 شخص، بيعانوا من الطلبات اليدوي». التخصص بيخلّي الرسالة أقوى والتنفيذ أسرع.', 'An **ideal client profile**: exactly who (industry, size, tools, problem) gains most from your work and pays easily. Example: «online shops in Egypt and the Gulf, 300–3,000 orders a month, on Shopify, teams of 3–15, struggling with manual orders». Focus makes the message stronger and delivery faster.'),
          'ICP: online shops (EG/GCC) · 300–3,000 orders/month · Shopify or WooCommerce · 3–15 staff\nsignals: hiring an "order entry" assistant · complaints about late invoices · using WhatsApp for orders\nwhere they are: Shopify partner groups · e-commerce meetups · LinkedIn (founders/ops managers)'),
        L(B('جذب العملاء', 'Attracting clients'),
          B('**lead magnet**: حاجة مفيدة مجانًا بتجيب ناس مهتمة: template n8n جاهز، checklist «10 حاجات بتضيّع وقت فريق الطلبات»، فيديو 5 دقايق. ومحتوى منتظم (قصص عملاء، قبل/بعد بالأرقام). وشراكات (مطوّري Shopify، محاسبين) بيجيبوا عملاء مقابل نسبة.', 'A **lead magnet**: something useful for free that attracts interested people: a ready n8n template, a checklist «10 things wasting your order team’s time», a 5-minute video. Plus regular content (client stories, before/after numbers). And partnerships (Shopify developers, accountants) sending clients for a commission.'),
          'weekly content plan (2 h/week)\nMon: a 60-second screen recording "how this shop saves 12 h/week" (anonymised)\nWed: a free template on the n8n creators page + a LinkedIn post\nmonthly: one partner call (agency, accountant) · lead magnet: "Order automation checklist" (form → n8n → CRM → email sequence)'),
        L(B('المسار في n8n نفسه', 'The pipeline in n8n itself'),
          B('**sales pipeline**: مراحل واضحة (lead ← مؤهَّل ← مكالمة ← عرض ← تفاوض ← كسبنا/خسرنا) في CRM (HubSpot المجاني، Pipedrive، أو Airtable). وn8n يأتمت مبيعاتك انت: فورم ← CRM ← إيميل ترحيب ← تذكير متابعة بعد 3 أيام لو مفيش رد ← تقرير أسبوعي بالمسار. اشرب من نفس الكاس اللي بتبيعه.', 'A **sales pipeline**: clear stages (lead → qualified → call → proposal → negotiation → won/lost) in a CRM (free HubSpot, Pipedrive, or Airtable). And n8n automates your own sales: form → CRM → welcome email → a follow-up reminder after 3 days without reply → a weekly pipeline report. Drink your own medicine.'),
          'n8n "my agency sales"\nForm/Calendly → CRM deal (stage: lead) → AI summary of the request → Telegram to me\n+3 days no reply → follow-up email #1 · +7 days → #2 · +14 days → mark "nurture" (monthly newsletter)\nMonday 09:00 → pipeline report: 12 leads · 5 calls · 3 proposals (54,000 EGP) · win rate 33%')
      ],
      practice: [
        B('اكتب ideal client profile بإشارات.', 'Write an ideal client profile with signals.'),
        B('اعمل lead magnet واحد (template أو checklist).', 'Create one lead magnet (a template or checklist).'),
        B('اعمل pipeline في CRM مجاني.', 'Set up a pipeline in a free CRM.'),
        B('أتمت متابعة الـ leads بـ n8n.', 'Automate lead follow-ups with n8n.')
      ],
      words: [
        W('ideal client profile', 'وصف العميل اللي بيكسب أكتر من شغلك', 'a description of the client who gains most from your work', 'Our ideal client profile is Shopify stores.'),
        W('lead magnet', 'حاجة مجانية بتجذب مهتمين', 'a free resource attracting interested people', 'The checklist is our lead magnet.'),
        W('buying signal', 'علامة إن الشركة محتاجة حلك', 'a sign a company needs your solution', 'Hiring an order clerk is a buying signal.'),
        W('nurture sequence', 'رسايل متابعة طويلة للمهتمين مش جاهزين', 'a long series of messages for not-yet-ready leads', 'Cold leads enter the nurture sequence.'),
        W('partner referral', 'عميل جاي من شريك', 'a client sent by a partner', 'The accountant sent a partner referral.')
      ],
      read: [{ t: 'HubSpot: Sales pipeline guide', url: 'https://blog.hubspot.com/sales/sales-pipeline', what: B('اقرا Stages.', 'Read Stages.') }],
      challenge: B('ابني «ماكينة مبيعات» لوكالتك بـ n8n: lead magnet بفورم، CRM بمسار، إيميل ترحيب ومتابعتين آليين، إشعار ليك بملخص AI، وتقرير أسبوعي بالأرقام — وشغّلها شهر.', 'Build a «sales machine» for your agency with n8n: a lead magnet with a form, a CRM with a pipeline, a welcome email and two automatic follow-ups, a notification to you with an AI summary, and a weekly numbers report — and run it for a month.'),
      quiz: [
        Q(B('ICP كويس:', 'A good ICP:'), [['مجال وحجم وأدوات ومشكلة محددة', 'a specific industry, size, tools and problem'], ['«أي شركة»', '«any company»'], ['اللي بيدفع أكتر', 'whoever pays most']], 0, B('تخصص.', 'Focus.')),
        Q(B('معظم الصفقات بتتقفل:', 'Most deals close:'), [['بعد متابعات منتظمة', 'after regular follow-ups'], ['من أول رسالة', 'from the first message'], ['لوحدها', 'by themselves']], 0, B('follow-up.', 'Follow-up.')),
        Q(B('أتمتة مبيعات وكالتك:', 'Automating your agency’s sales:'), [['n8n نفسه', 'n8n itself'], ['مستحيل', 'impossible'], ['يدوي أحسن', 'manual is better']], 0, B('دليل حي.', 'A live demo.'))
      ] },

    { title: B('المكالمات والاعتراضات', 'Calls and objections'),
      goal: B('تدير مكالمة مبيعات بتسمع أكتر ما تتكلم.', 'Run a sales call where you listen more than you talk.'),
      learn: [
        L(B('أسئلة الاكتشاف', 'Discovery questions'),
          B('المكالمة الكويسة 70% العميل بيتكلم. أسئلة بترتيب: الوضع («إزاي بتستقبلوا الطلبات دلوقتي؟»)، المشكلة («إيه أكتر حاجة بتأخركم؟»)، الأثر («ده بيكلّفكم إيه في الشهر؟ حصل إن عميل زعل؟»)، والحل المطلوب («لو اتحلت، إيه اللي هيتغير؟»). الأثر هو اللي بيبيع.', 'A good call is 70% the client talking. Questions in order: situation («how do you receive orders now?»), problem («what delays you most?»), impact («what does that cost you a month? has a customer complained?»), and the desired outcome («if it were solved, what would change?»). Impact is what sells.'),
          'call plan (30 min)\n0–3   rapport + agenda ("I will ask questions, then share what we do, then next steps — ok?")\n3–18  situation → problem → impact → outcome (take notes in their words)\n18–25 relevant example + rough range ("similar shops: 15–25k, 2 weeks")\n25–30 next step with a date (discovery, proposal by Thursday, call with the owner)'),
        L(B('الاعتراضات', 'Objections'),
          B('**objection handling**: الاعتراض = سؤال مش رفض. «غالي» ← ارجع للعائد («بيرجع في 3 شهور، ممكن نبدأ بالباقة الأساسية»). «هنعمله داخلي» ← «ممتاز، ممكن نبنيه ونسلّمه لفريقكم بتدريب». «الأمان؟» ← خطة الأمان والـ DPA. «AI بيغلط» ← الموافقة البشرية. اسمع، أكّد، رد، اسأل.', '**objection handling**: an objection = a question, not a refusal. «Too expensive» → back to the return («pays back in 3 months; we could start with the basic tier»). «We will do it in-house» → «great, we can build it and hand it to your team with training». «Security?» → the security plan and DPA. «AI makes mistakes» → human approval. Listen, acknowledge, answer, ask.'),
          'objection                          answer pattern\n"too expensive"                    ROI + payback · smaller first phase · not a discount on the same scope\n"we can do it ourselves"           build-and-transfer option · maintenance included · time to value\n"what if it breaks?"               monitoring, SLA, 30-day fixes, runbook (week 46)\n"our data is sensitive"            self-hosted n8n, DPA, privacy design (week 42)\n"let me think"                     "what would you need to see to decide?" → agree a date'),
        L(B('القفل والمراجع', 'Closing and references'),
          B('القفل الطبيعي: «بناءً على اللي قلته، الأنسب الباقة الاحترافية. نبدأ الحد الجاي؟ محتاجين منك X وY». وخلّي الخطوة الجاية سهلة (توقيع إلكتروني، دفع مقدم بلينك). والعملاء الراضين = أقوى أداة: اطلب مرجع (reference call) أو شهادة بالأرقام بعد كل نجاح.', 'A natural close: «based on what you said, the Pro tier fits best. Shall we start next Sunday? We need X and Y from you». Make the next step easy (e-signature, a deposit by link). And happy clients = the strongest tool: ask for a reference call or a testimonial with numbers after every success.'),
          'close: "So: 18,000 EGP, start Sunday 12th, live by the 23rd. I will send the agreement and the 50% deposit link today — anything that would stop us?"\nafter go-live (+30 days): "Would you share the result in two lines? e.g. hours saved, errors avoided" → website + proposals\nreference: agree with 2 happy clients to take one short call a month')
      ],
      practice: [
        B('اكتب 10 أسئلة اكتشاف بالترتيب.', 'Write 10 discovery questions in order.'),
        B('اكتب ردود 5 اعتراضات.', 'Write answers to 5 objections.'),
        B('اعمل مكالمة تجريبية مع صاحب وسجّلها.', 'Do a mock call with a friend and record it.'),
        B('اكتب جملة قفل وطلب شهادة.', 'Write a closing line and a testimonial request.')
      ],
      words: [
        W('discovery questions', 'أسئلة بتكشف الوضع والمشكلة والأثر', 'questions revealing situation, problem and impact', 'Prepare ten discovery questions.'),
        W('objection handling', 'الرد على اعتراضات العميل', 'answering a client’s objections', 'Objection handling starts with listening.'),
        W('impact question', 'سؤال عن تكلفة المشكلة', 'a question about the problem’s cost', 'The impact question revealed 40 hours a month.'),
        W('next step', 'خطوة جاية محددة بميعاد', 'a specific follow-up action with a date', 'End every call with a next step.'),
        W('reference call', 'مكالمة مع عميل سابق للتزكية', 'a call with a past client vouching for you', 'The bank asked for a reference call.')
      ],
      read: [{ t: 'Gong: Sales call research (blog)', url: 'https://www.gong.io/blog', what: B('دوّر على talk-to-listen ratio.', 'Search for talk-to-listen ratio.') }],
      challenge: B('اعمل 3 مكالمات اكتشاف حقيقية أو تجريبية بالخطة دي، سجّل نسبة كلامك، اكتب الأثر بالأرقام لكل واحدة، وابعت next step مكتوب بعد كل مكالمة خلال ساعة.', 'Hold 3 real or mock discovery calls with this plan, record your talk ratio, write the impact in numbers for each, and send a written next step within an hour of each call.'),
      quiz: [
        Q(B('مكالمة الاكتشاف الكويسة:', 'A good discovery call:'), [['العميل بيتكلم أكتر', 'the client talks more'], ['انت بتعرض كتير', 'you present a lot'], ['من غير أسئلة', 'no questions']], 0, B('اسمع.', 'Listen.')),
        Q(B('«غالي»:', '«Too expensive»:'), [['ارجع للعائد أو مرحلة أصغر', 'back to ROI or a smaller phase'], ['خصم فوري', 'an instant discount'], ['اقفل المكالمة', 'end the call']], 0, B('قيمة.', 'Value.')),
        Q(B('آخر المكالمة:', 'The end of a call:'), [['خطوة جاية بميعاد', 'a dated next step'], ['«هنتواصل»', '«we’ll be in touch»'], ['لا شيء', 'nothing']], 0, B('حركة.', 'Momentum.'))
      ] },

    { title: B('صفقات الشركات', 'Enterprise deals'),
      goal: B('تعدّي المشتريات والأمان والقانوني من غير ما الصفقة تموت.', 'Get through procurement, security and legal without the deal dying.'),
      learn: [
        L(B('المشتريات', 'Procurement'),
          B('الشركات الكبيرة فيها **procurement**: موردين معتمدين، 3 عروض، ورق (سجل تجاري، بطاقة ضريبية، حساب بنكي)، ومدد دفع 30–60 يوم. اسأل بدري: «مين بيوقّع؟ إيه خطوات اعتماد مورد؟ إيه الورق؟ ميزانية السنة دي؟» عشان متتفاجئش بعد شهرين.', 'Large companies have **procurement**: approved vendors, 3 quotes, paperwork (commercial register, tax card, bank account), and 30–60-day payment terms. Ask early: «who signs? what are the vendor approval steps? what documents? this year’s budget?» so you are not surprised two months later.'),
          'ask in the first call with a large company\n- who else is involved in deciding? (IT, security, legal, finance)\n- how do you approve a new supplier, and how long does it take?\n- is there budget this quarter? which cost centre?\n- payment terms? (plan for 45 days → price and deposit accordingly)'),
        L(B('استبيانات الأمان', 'Security questionnaires'),
          B('**security questionnaire** (أحيانًا 100 سؤال): التشفير، الصلاحيات، النسخ، الحوادث، الموظفين، الموردين. جهّز **security pack** مرة واحدة من شغل الشهر اللي فات: معمارية، خطة أمان (أسبوع 41)، خصوصية وDPA (42)، استمرارية (43)، مراقبة (40). بيقصّر الرد من أسابيع لأيام وبيبان احترافي.', 'A **security questionnaire** (sometimes 100 questions): encryption, access, backups, incidents, staff, suppliers. Prepare a **security pack** once from last month’s work: architecture, the security plan (week 41), privacy and DPA (42), continuity (43), monitoring (40). It cuts replies from weeks to days and looks professional.'),
          'security pack (PDF + annexes)\n1. architecture diagram + data flow (where data lives, regions)\n2. access control: SSO/2FA, roles, joiners/leavers\n3. encryption: TLS, at rest, key management\n4. backups & DR: RPO/RTO, last drill date and result\n5. incident response & breach notification\n6. sub-processors list + DPA template\n7. secure development: reviews, tests, dependency scanning'),
        L(B('نطاق العمل', 'The statement of work'),
          B('**statement of work** (SOW) بيحمي الطرفين: الأهداف، المخرجات بالظبط، **assumptions** (العميل بيوفر الوصول في 3 أيام، الـ API بيدعم X)، اللي خارج النطاق، معايير القبول، الجدول والدفعات، الضمان والدعم، وإدارة التغيير. وdeposit قبل البدء (30–50%) مع الشركات الجديدة.', 'A **statement of work** (SOW) protects both sides: goals, exact deliverables, **assumptions** (the client gives access within 3 days, the API supports X), what is out of scope, acceptance criteria, schedule and payments, warranty and support, and change management. And a deposit before starting (30–50%) with new companies.'),
          'SOW — Order automation phase 1\ndeliverables: 4 workflows (list) · 1 custom node · runbook · 2 h training\nacceptance: 50 test orders processed end to end with 0 errors in staging\nassumptions: Shopify admin + ERP sandbox access by day 3; ERP API has /invoices\nout of scope: data migration of past orders · new ERP modules\npayments: 40% on signature · 40% on staging acceptance · 20% on go-live (net 30)\nchanges: written change request → estimate → approval before work')
      ],
      practice: [
        B('اكتب أسئلة المشتريات لأول مكالمة.', 'Write the procurement questions for a first call.'),
        B('جمّع security pack من شغلك.', 'Assemble a security pack from your work.'),
        B('جاوب 20 سؤال من استبيان أمان حقيقي (موجود أونلاين).', 'Answer 20 questions of a real security questionnaire (available online).'),
        B('اكتب SOW لمشروع.', 'Write a SOW for a project.')
      ],
      words: [
        W('procurement', 'إدارة المشتريات واعتماد الموردين', 'purchasing and supplier approval', 'Procurement needs our tax card.'),
        W('security questionnaire', 'أسئلة أمان من العميل للمورد', 'security questions from client to supplier', 'The security questionnaire had 90 questions.'),
        W('security pack', 'ملف جاهز بممارسات الأمان', 'a ready file of security practices', 'Send the security pack before they ask.'),
        W('statement of work', 'وثيقة نطاق العمل والمخرجات', 'a document of scope and deliverables', 'Both sides sign the statement of work.'),
        W('assumptions', 'شروط مفروض تتحقق عشان الخطة تمشي', 'conditions the plan relies on', 'List the assumptions in the SOW.'),
        W('payment terms', 'شروط ومدد الدفع', 'when and how payment is made', 'Their payment terms are net 45.')
      ],
      read: [{ t: 'CAIQ (Cloud Security Alliance questionnaire)', url: 'https://cloudsecurityalliance.org/artifacts/cloud-controls-matrix-v4', what: B('مثال لأسئلة الأمان.', 'An example of security questions.') }],
      challenge: B('جهّز «باكدج الشركات» لوكالتك: أسئلة المشتريات، security pack كامل، قالب SOW بدفعات ومعايير قبول، وردود جاهزة لأشهر 30 سؤال أمان.', 'Prepare an «enterprise pack» for your agency: procurement questions, a full security pack, a SOW template with payments and acceptance criteria, and ready answers to the 30 most common security questions.'),
      quiz: [
        Q(B('شركة كبيرة بتدفع بعد 45 يوم:', 'A big company paying after 45 days:'), [['خطّط السعر والمقدّم', 'plan the price and deposit'], ['اتفاجئ', 'be surprised'], ['ارفض', 'refuse']], 0, B('cash flow.', 'Cash flow.')),
        Q(B('security pack فايدته:', 'A security pack helps by:'), [['رد أسرع واحترافية', 'faster replies and professionalism'], ['زينة', 'decoration'], ['مش لازم', 'nothing']], 0, B('جاهز.', 'Ready.')),
        Q(B('SOW فيه:', 'A SOW contains:'), [['مخرجات وافتراضات وقبول ودفعات', 'deliverables, assumptions, acceptance and payments'], ['الكود', 'the code'], ['كلمات السر', 'passwords']], 0, B('حماية.', 'Protection.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('بيع قائم على القيمة وبنظام.', 'Value-based, systematic selling.'),
      review: [
        B('رسم العمليات والـ ROI والـ payback وترتيب الفرص.', 'Process mapping, ROI, payback and opportunity scoring.'),
        B('productized services والباقات والاكتشاف المدفوع والتجارب.', 'Productized services, tiers, paid discovery and pilots.'),
        B('ICP وlead magnets ومسار المبيعات المؤتمت.', 'ICP, lead magnets and an automated sales pipeline.'),
        B('أسئلة الاكتشاف والاعتراضات والقفل والمراجع.', 'Discovery questions, objections, closing and references.'),
        B('المشتريات واستبيانات الأمان والـ SOW والدفعات.', 'Procurement, security questionnaires, the SOW and payments.')
      ],
      project: B('ابني «نظام مبيعات» كامل لوكالتك: ICP مكتوب، productized service بـ 3 باقات وعرض paid discovery، lead magnet بفورم n8n، CRM بمسار ومتابعات آلية وتقرير أسبوعي، خطة مكالمة وردود اعتراضات، security pack وقالب SOW — واعمل 3 مكالمات حقيقية وسجّل النتايج.', 'Build a complete «sales system» for your agency: a written ICP, a productized service with 3 tiers and a paid-discovery offer, a lead magnet with an n8n form, a CRM with a pipeline, automatic follow-ups and a weekly report, a call plan and objection answers, a security pack and a SOW template — then hold 3 real calls and record the results.'),
      test: [
        Q(B('قبل أي حل:', 'Before any solution:'), [['ارسم العملية', 'map the process'], ['ابعت سعر', 'send a price'], ['ابني demo', 'build a demo']], 0, B('اكتشاف.', 'Discovery.')),
        Q(B('ROI بيتحسب من:', 'ROI is calculated from:'), [['وقت وأخطاء العميل مقابل التكلفة', 'the client’s time and errors vs the cost'], ['ساعاتك', 'your hours'], ['سعر المنافس', 'a competitor’s price']], 0, B('قيمة.', 'Value.')),
        Q(B('payback period:', 'The payback period:'), [['البناء ÷ التوفير الشهري', 'build ÷ monthly saving'], ['مدة المشروع', 'project duration'], ['مدة الضمان', 'the warranty']], 0, B('شهور.', 'Months.')),
        Q(B('خدمة بسعر ونطاق ثابتين:', 'A service with fixed price and scope:'), [['productized service', 'a productized service'], ['retainer مفتوح', 'an open retainer'], ['بالساعة', 'hourly']], 0, B('منتج.', 'A product.')),
        Q(B('الباقة الوسطى:', 'The middle tier:'), [['غالبًا الأكتر مبيعًا', 'usually sells most'], ['مالهاش لازمة', 'pointless'], ['الأرخص', 'the cheapest']], 0, B('اختيار طبيعي.', 'The natural choice.')),
        Q(B('مشروع مش واضح:', 'An unclear project:'), [['paid discovery', 'paid discovery'], ['سعر عشوائي', 'a random price'], ['مجاني', 'for free']], 0, B('وضوح.', 'Clarity.')),
        Q(B('template n8n مجاني لجذب عملاء:', 'A free n8n template to attract clients:'), [['lead magnet', 'a lead magnet'], ['SOW', 'a SOW'], ['DPA', 'a DPA']], 0, B('جذب.', 'Attraction.')),
        Q(B('أهم سؤال في الاكتشاف:', 'The key discovery question:'), [['المشكلة دي بتكلّفكم إيه؟', 'what does this problem cost you?'], ['ميزانيتكم كام؟ بس', 'only: what is your budget?'], ['تعرفوا n8n؟', 'do you know n8n?']], 0, B('أثر.', 'Impact.')),
        Q(B('«هنفكر»:', '«We’ll think about it»:'), [['اسأل إيه اللي محتاجينه للقرار وحدد ميعاد', 'ask what they need to decide and set a date'], ['استنى للأبد', 'wait forever'], ['خصم 50%', 'a 50% discount']], 0, B('خطوة.', 'A step.')),
        Q(B('الشركات الكبيرة بتطلب غالبًا:', 'Large companies usually ask for:'), [['استبيان أمان', 'a security questionnaire'], ['كود المصدر', 'the source code'], ['لا شيء', 'nothing']], 0, B('security pack.', 'Security pack.')),
        Q(B('معايير القبول في SOW:', 'Acceptance criteria in a SOW:'), [['اختبار متفق عليه للنجاح', 'an agreed test of success'], ['رأي العميل يوم التسليم', 'the client’s mood on delivery day'], ['مش لازم', 'unnecessary']], 0, B('وضوح.', 'Clarity.')),
        Q(B('دفعة مقدمة مع عميل جديد:', 'A deposit with a new client:'), [['30–50% قبل البدء', '30–50% before starting'], ['بعد التسليم بس', 'only after delivery'], ['مفيش', 'none']], 0, B('حماية.', 'Protection.'))
      ] }
  ]
};
