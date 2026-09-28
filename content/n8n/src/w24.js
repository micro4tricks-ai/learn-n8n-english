// n8n week 24 — Freelancing and the capstone project.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('العمل الحر والمشروع النهائي', 'Freelancing and the capstone project'),
  goal: B('تحوّل اللي اتعلمته لشغل بفلوس: portfolio، وعروض، وتسعير، وعقد، وتسليم، وتختم الرحلة بمشروع نهائي كامل لعميل حقيقي أو تخيّلي.',
          'Turn what you learned into paid work: a portfolio, proposals, pricing, a contract and a handover — and finish the journey with a complete capstone project for a real or imagined client.'),
  days: [
    { title: B('الـ portfolio', 'The portfolio'),
      goal: B('تعرض شغلك بطريقة تقنع عميل في دقيقة.', 'Present your work so a client is convinced within a minute.'),
      learn: [
        { h: B('مش كود، نتايج', 'Results, not code'),
          p: B('العميل مش مهتم بعدد الـ nodes. اكتب لكل مشروع: المشكلة، والحل في جملة، والنتيجة بأرقام (وفّر 10 ساعات في الأسبوع، رد في دقيقة بدل يوم).', 'Clients don\'t care how many nodes you used. For each project write: the problem, the solution in one sentence, and the result in numbers (saved 10 hours a week, replies in a minute instead of a day).'),
          ex: 'Problem: leads answered after 24h\nFix: n8n + AI reply in 2 min\nResult: +30% booked calls' },
        { h: B('الـ case study', 'The case study'),
          p: B('3 مشاريع قوية أحسن من 15 ضعيفة. كل case study: screenshot للـ workflow، وفيديو قصير (Loom) دقيقتين، ومن غير بيانات عميل حقيقية.', 'Three strong projects beat fifteen weak ones. Each case study: a workflow screenshot, a short two-minute video (Loom), and no real client data.'),
          ex: 'Case study 1: Invoice automation (video 2:10)' },
        { h: B('فين تعرض', 'Where to show it'),
          p: B('صفحة بسيطة (GitHub Pages)، وLinkedIn، وقوالب منشورة في مكتبة n8n (n8n.io/workflows) — دي بتجيب عملاء لوحدها.', 'A simple page (GitHub Pages), LinkedIn, and templates published in the n8n library (n8n.io/workflows) — those bring clients on their own.'),
          ex: 'yourname.github.io/automation' }
      ],
      practice: [
        B('اختار أحسن 3 مشاريع عملتها في الرحلة.', 'Pick your 3 best projects from the journey.'),
        B('اكتب لكل واحد: مشكلة، حل، نتيجة بأرقام.', 'For each, write: problem, solution, result in numbers.'),
        B('سجّل فيديو دقيقتين لمشروع واحد.', 'Record a two-minute video of one project.'),
        B('اعمل صفحة portfolio على GitHub Pages.', 'Make a portfolio page on GitHub Pages.')
      ],
      words: [
        { t: 'portfolio', m: B('مجموعة شغلك اللي بتعرضها للعملاء', 'the collection of work you show clients'), ex: '3 strong case studies' },
        { t: 'case study', m: B('قصة مشروع: مشكلة وحل ونتيجة', 'a project story: problem, solution, result'), ex: 'Saved 10 hours a week' },
        { t: 'value proposition', m: B('جملة بتقول بتحل إيه ولمين', 'a sentence saying what you solve and for whom'), ex: 'I automate lead follow-up for clinics.' },
        { t: 'niche', m: B('مجال محدد بتتخصص فيه', 'a specific field you specialise in'), ex: 'Real estate automation' },
        { t: 'n8n template', m: B('workflow منشور يقدر أي حد يستخدمه', 'a published workflow anyone can use'), ex: 'n8n.io/workflows' }],
      read: [{ t: 'n8n workflow templates', url: 'https://n8n.io/workflows/', what: B('شوف إزاي القوالب الناجحة مكتوبة.', 'See how successful templates are written.') }],
      challenge: B('اكتب value proposition لـ niche واحد، وحط الـ portfolio على الإنترنت، وانشر قالب واحد (أو جهّزه للنشر) بوصف كويس.', 'Write a value proposition for one niche, put the portfolio online, and publish one template (or prepare it for publishing) with a good description.'),
      quiz: [
        { q: B('أهم حاجة في case study:', 'The most important part of a case study:'), o: [B('النتيجة بأرقام', 'the result in numbers'), B('عدد الـ nodes', 'the node count'), B('لون الـ canvas', 'the canvas colour')], a: 0, why: B('العميل عايز نتيجة.', 'Clients want results.') },
        { q: B('portfolio أحسن:', 'A better portfolio:'), o: [B('3 مشاريع قوية', '3 strong projects'), B('50 مشروع صغير', '50 tiny projects'), B('ولا مشروع', 'no projects')], a: 0, why: B('جودة.', 'Quality.') },
        { q: B('بيانات عميل حقيقي في فيديو عام:', 'Real client data in a public video:'), o: [B('لأ أبدًا', 'never'), B('عادي', 'fine'), B('لو كتيرة', 'if there\'s a lot')], a: 0, why: B('خصوصية.', 'Privacy.') }
      ] },

    { title: B('إيجاد العملاء والعروض', 'Finding clients and proposals'),
      goal: B('تلاقي شغل وتكتب عرض بيتقبل.', 'Find work and write proposals that get accepted.'),
      learn: [
        { h: B('فين الشغل', 'Where the work is'),
          p: B('Upwork وmostaql وخمسات، ومجتمع n8n (community.n8n.io وقسم Expert)، وLinkedIn، ومعارفك. أحسن عميل أول: شركة صغيرة تعرفها وفيها شغل يدوي متكرر.', 'Upwork, Mostaql and Khamsat, the n8n community (community.n8n.io and the Expert section), LinkedIn, and people you know. The best first client: a small business you know with repetitive manual work.'),
          ex: 'A clinic copying bookings from WhatsApp to a sheet by hand' },
        { h: B('العرض (proposal)', 'The proposal'),
          p: B('أول سطر يثبت إنك فهمت مشكلته هو (مش «أنا خبير»). بعدين: الحل بخطوات، ومشروع شبهه عملته، والمدة، والسعر، وسؤال واحد ذكي.', 'The first line proves you understood their problem (not "I am an expert"). Then: the solution in steps, a similar project you did, the timeline, the price and one smart question.'),
          ex: '"You\'re losing leads that arrive at night. I\'d…"' },
        { h: B('مكالمة الاكتشاف', 'The discovery call'),
          p: B('قبل ما تسعّر، اسأل: الوضع الحالي إيه؟ بياخد وقت قد إيه؟ الأدوات إيه؟ النجاح شكله إيه؟ مين هيستخدمه؟ واكتب الـ scope بعدها.', 'Before pricing, ask: what happens now? How long does it take? Which tools? What does success look like? Who will use it? Then write the scope.'),
          ex: '15 min · 5 questions · written scope the same day' }
      ],
      practice: [
        B('اعمل بروفايل على منصة عمل حر واحدة.', 'Create a profile on one freelancing platform.'),
        B('اختار 3 إعلانات شغل واكتب عرض لكل واحد (حتى لو متبعتوش).', 'Pick 3 job posts and write a proposal for each (even if you don\'t send them).'),
        B('اكتب 5 أسئلة لمكالمة الاكتشاف.', 'Write 5 discovery-call questions.'),
        B('اعرض على شركة صغيرة تعرفها تحليل مجاني لشغلها اليدوي.', 'Offer a small business you know a free review of its manual work.')
      ],
      words: [
        { t: 'proposal', m: B('عرض مكتوب للعميل بالحل والسعر', 'a written offer to a client with the solution and price'), ex: 'Start with their problem.' },
        { t: 'discovery call', m: B('مكالمة تفهم فيها احتياج العميل', 'a call to understand the client\'s needs'), ex: '15 minutes, 5 questions' },
        { t: 'scope creep', m: B('الشغل بيكبر شوية بشوية من غير اتفاق', 'work growing little by little without an agreement'), ex: '"Just one more small thing…"' },
        { t: 'lead generation', m: B('جذب عملاء محتملين', 'attracting potential clients'), ex: 'LinkedIn posts, templates' },
        { t: 'upwork', m: B('منصة عمل حر عالمية', 'a global freelancing platform'), ex: 'Search "n8n"' }],
      read: [{ t: 'n8n Community forum', url: 'https://community.n8n.io/', what: B('شوف أسئلة الناس — هي نفسها احتياجات عملاء.', 'Look at people\'s questions — they are client needs.') }],
      challenge: B('ابعت عرض حقيقي واحد على الأقل (أو اعرض على شركة تعرفها)، وسجّل: اتبعت إمتى، والرد، واتعلمت إيه.', 'Send at least one real proposal (or pitch a business you know), and record when you sent it, the reply and what you learned.'),
      quiz: [
        { q: B('أول سطر في العرض:', 'The first line of a proposal:'), o: [B('مشكلة العميل', 'the client\'s problem'), B('«أنا خبير»', '"I am an expert"'), B('السعر', 'the price')], a: 0, why: B('يثبت إنك فهمت.', 'It proves you understood.') },
        { q: B('قبل التسعير:', 'Before pricing:'), o: [B('مكالمة اكتشاف', 'a discovery call'), B('ابدأ تبني', 'start building'), B('خمّن', 'guess')], a: 0, why: B('تفهم الأول.', 'Understand first.') },
        { q: B('scope بيحدد:', 'Scope defines:'), o: [B('إيه جوه وإيه برّه الشغل', 'what\'s in and out of the work'), B('لون الموقع', 'the site colour'), B('الـ API key', 'the API key')], a: 0, why: B('يمنع زيادة الشغل ببلاش.', 'It prevents unpaid extra work.') }
      ] },

    { title: B('التسعير والعقود', 'Pricing and contracts'),
      goal: B('تسعّر بثقة وتحمي نفسك بعقد واضح.', 'Price with confidence and protect yourself with a clear contract.'),
      learn: [
        { h: B('طرق التسعير', 'Pricing models'),
          p: B('بالساعة (سهل بس بيعاقبك على السرعة)، أو بالمشروع (سعر ثابت لـ scope واضح)، أو على القيمة (جزء من اللي بيوفّره). وبعد التسليم: retainer شهري للصيانة.', 'Hourly (easy but punishes speed), per project (a fixed price for a clear scope), or value-based (a share of what it saves). After delivery: a monthly retainer for maintenance.'),
          ex: 'Saves 40h/month × $15 = $600/month → project $1,200 + $150/month retainer' },
        { h: B('الدفع', 'Payment'),
          p: B('خد مقدم (30–50%) قبل ما تبدأ، والباقي على milestones. وحدّد عدد التعديلات، وأي حاجة برّه الـ scope = change request بسعر جديد.', 'Take a deposit (30–50%) before starting, and the rest on milestones. Limit the number of revisions, and anything outside scope = a change request with a new price.'),
          ex: '50% upfront · 50% on delivery · 2 revision rounds' },
        { h: B('العقد', 'The contract'),
          p: B('حتى صفحة واحدة: الـ scope، والمدة، والسعر والدفع، والتعديلات، ومين يملك الـ workflows، والسرية، والدعم بعد التسليم. المنصات بتحميك جزئيًا، وبرّاها العقد أهم.', 'Even one page: scope, timeline, price and payment, revisions, who owns the workflows, confidentiality and post-delivery support. Platforms protect you partly; off-platform the contract matters more.'),
          ex: 'Support: 14 days of bug fixes included' }
      ],
      practice: [
        B('احسب سعرك بالساعة (المصاريف + الربح ÷ الساعات).', 'Calculate your hourly rate (costs + profit ÷ hours).'),
        B('سعّر مشروع بالطرق التلاتة وقارن.', 'Price one project with all three models and compare.'),
        B('اكتب عقد صفحة واحدة من الـ 7 بنود.', 'Write a one-page contract with the 7 clauses.'),
        B('اكتب عرض retainer شهري للصيانة.', 'Write a monthly maintenance retainer offer.')
      ],
      words: [
        { t: 'fixed price', m: B('سعر ثابت لمشروع كامل', 'one set price for the whole project'), ex: '$800 for the invoice bot' },
        { t: 'value-based pricing', m: B('تسعير حسب القيمة اللي العميل بيكسبها', 'pricing by the value the client gains'), ex: 'Saves $600/month' },
        { t: 'retainer', m: B('مبلغ شهري ثابت للدعم والصيانة', 'a fixed monthly fee for support and maintenance'), ex: '$150/month' },
        { t: 'milestone', m: B('مرحلة في المشروع ليها دفعة', 'a project stage with its own payment'), ex: 'Milestone 2: CRM sync' },
        { t: 'change request', m: B('طلب تعديل برّه الـ scope بسعر جديد', 'a request outside scope with a new price'), ex: '"Can it also post to Slack?"' }],
      read: [{ t: 'Upwork: Contract types', url: 'https://support.upwork.com/hc/en-us/articles/211068518', what: B('اقرا الفرق بين hourly وfixed-price.', 'Read the difference between hourly and fixed-price.') }],
      challenge: B('اعمل «price sheet» ليك: 3 باكدجات (Starter / Growth / Care) بالمحتوى والسعر والمدة، وعقد template جاهز.', 'Make your "price sheet": three packages (Starter / Growth / Care) with contents, price and timeline, plus a ready contract template.'),
      quiz: [
        { q: B('العميل طلب حاجة جديدة برّه الاتفاق:', 'The client asks for something new outside the agreement:'), o: ['change request', B('اعملها ببلاش', 'do it free'), B('اتجاهل', 'ignore it')], a: 0, why: B('scope.', 'scope.') },
        { q: B('قبل ما تبدأ:', 'Before you start:'), o: [B('مقدم', 'a deposit'), B('ولا حاجة', 'nothing'), B('الكل بعد سنة', 'everything after a year')], a: 0, why: B('حماية.', 'Protection.') },
        { q: B('صيانة شهرية:', 'Monthly maintenance:'), o: ['retainer', 'milestone', 'proposal'], a: 0, why: B('دخل ثابت.', 'Steady income.') }
      ] },

    { title: B('التسليم والدعم', 'Handover and support'),
      goal: B('تسلّم شغل العميل يقدر يعيش معاه من غيرك.', 'Deliver work the client can live with without you.'),
      learn: [
        { h: B('التسليم', 'Handover'),
          p: B('الـ workflows على سيرفر أو حساب العميل هو (مش بتاعك)، والـ credentials باسمه، وتوثيق: بيعمل إيه، وبيشتغل إمتى، ولو وقف يعمل إيه، ومين يكلّم.', 'Workflows on the client\'s own server or account (not yours), credentials in their name, and documentation: what it does, when it runs, what to do if it stops, and whom to contact.'),
          ex: 'handover.pdf: overview · diagram · runbook · contacts' },
        { h: B('التدريب', 'Training'),
          p: B('فيديو 5–10 دقايق للشخص اللي هيستخدمه: إزاي يشوف التنفيذات، ويعيد واحد فشل، ويعدّل حاجة بسيطة (زي نص رسالة). اتأكد إنه عملها بنفسه.', 'A 5–10 minute video for whoever will use it: how to view executions, retry a failed one, and change something simple (like a message text). Make sure they did it themselves.'),
          ex: 'Client retried a failed execution on the call ✔' },
        { h: B('بعد التسليم', 'After delivery'),
          p: B('SLA واضح: بترد في قد إيه، وإيه اللي مشمول. واطلب testimonial بعد أسبوعين لو مبسوط، واسأل عن الخطوة الجاية (عميل مبسوط = مشاريع تانية).', 'A clear SLA: how fast you respond and what\'s covered. Ask for a testimonial after two weeks if they\'re happy, and ask about the next step (a happy client = more projects).'),
          ex: 'SLA: reply within 1 business day, critical within 4h' }
      ],
      practice: [
        B('اكتب handover doc لمشروع من مشاريعك.', 'Write a handover doc for one of your projects.'),
        B('سجّل فيديو تدريب 5 دقايق.', 'Record a 5-minute training video.'),
        B('اكتب SLA بسيط.', 'Write a simple SLA.'),
        B('اكتب رسالة تطلب فيها testimonial.', 'Write a message asking for a testimonial.')
      ],
      words: [
        { t: 'handover', m: B('تسليم المشروع للعميل بكل اللي يحتاجه', 'handing the project over with everything the client needs'), ex: 'Docs + training + access' },
        { t: 'client onboarding', m: B('بداية الشغل مع عميل: وصول وحسابات ومعلومات', 'starting with a client: access, accounts and information'), ex: 'Access checklist' },
        { t: 'SLA', m: B('اتفاق على وقت الرد ومستوى الخدمة', 'an agreement on response time and service level'), ex: 'Reply within 1 business day' },
        { t: 'testimonial', m: B('رأي عميل مبسوط تعرضه', 'a happy client\'s review you can show'), ex: '"Saved us 10 hours a week."' },
        { t: 'upsell', m: B('عرض شغل إضافي لعميل حالي', 'offering extra work to an existing client'), ex: 'Add AI replies next month' }],
      read: ['lib:n8n Docs: Securing n8n'],
      challenge: B('اعمل «client kit»: onboarding checklist، وhandover template، وSLA، وإيميل طلب testimonial — جاهزين لأي عميل.', 'Build a "client kit": an onboarding checklist, a handover template, an SLA and a testimonial-request email — ready for any client.'),
      quiz: [
        { q: B('الـ workflows بعد التسليم تبقى على:', 'After delivery, workflows live on:'), o: [B('حساب العميل', 'the client\'s account'), B('لابتوبك', 'your laptop'), B('مكان مجهول', 'somewhere unknown')], a: 0, why: B('ملكه.', 'They own it.') },
        { q: B('SLA بيحدد:', 'An SLA defines:'), o: [B('وقت الرد ومستوى الخدمة', 'response time and service level'), B('لون الموقع', 'the site colour'), B('اسم الـ workflow', 'the workflow name')], a: 0, why: B('اتفاق.', 'An agreement.') },
        { q: B('التدريب ناجح لما:', 'Training works when:'), o: [B('العميل عمل الحاجة بنفسه', 'the client did it themselves'), B('الفيديو طويل', 'the video is long'), B('انت عملتها', 'you did it')], a: 0, why: B('استقلالية.', 'Independence.') }
      ] },

    { title: B('المشروع النهائي', 'The capstone project'),
      goal: B('تبني نظام أتمتة كامل لبيزنس من الصفر للتسليم، بكل اللي اتعلمته في 24 أسبوع.', 'Build a complete automation system for a business from scratch to handover, using everything from the 24 weeks.'),
      learn: [
        { h: B('المتطلبات', 'Requirements'),
          p: B('اختار بيزنس (عيادة، متجر، مكتب عقارات…). النظام لازم فيه: webhook أو form، وقاعدة بيانات، وAI agent بأداة واحدة على الأقل، وتنبيهات، وerror handling، وتقرير دوري، وسيرفر بـ HTTPS وbackup.', 'Pick a business (clinic, shop, real estate office…). The system must include: a webhook or form, a database, an AI agent with at least one tool, notifications, error handling, a scheduled report, and a server with HTTPS and backups.'),
          ex: 'Clinic: booking form → Postgres → AI confirms on WhatsApp → daily report' },
        { h: B('الخطة', 'The plan'),
          p: B('ابدأ بـ architecture diagram، وقسّم لـ milestones (يوم لكل جزء)، واختبر كل جزء لوحده بـ pinned data قبل ما تربط.', 'Start with an architecture diagram, split into milestones (a day per part), and test each part alone with pinned data before connecting them.'),
          ex: 'M1 intake · M2 DB · M3 AI · M4 alerts+errors · M5 report · M6 deploy' },
        { h: B('التقييم', 'Assessment'),
          p: B('قيّم نفسك: شغال end-to-end؟ الأخطاء متعاملة؟ الأسرار آمنة؟ فيه backup اتجرّب؟ التوثيق يكفي حد تاني يشغّله؟ الفيديو بيشرح القيمة في دقيقتين؟', 'Grade yourself: does it work end-to-end? Are errors handled? Are secrets safe? Is there a tested backup? Would the docs let someone else run it? Does the video explain the value in two minutes?'),
          ex: '6 checks × 1 point — aim for 6/6' }
      ],
      practice: [
        B('اختار البيزنس واكتب المشكلة في 3 جمل.', 'Pick the business and write the problem in 3 sentences.'),
        B('ارسم الـ architecture diagram.', 'Draw the architecture diagram.'),
        B('ابني أول milestone واختبره.', 'Build the first milestone and test it.'),
        B('اكتب قائمة الـ 6 معايير وقيّم نفسك في آخر اليوم.', 'Write the 6-point checklist and grade yourself at the end of the day.')
      ],
      words: [
        { t: 'capstone project', m: B('مشروع نهائي بيجمع كل اللي اتعلمته', 'a final project combining everything learned'), ex: 'Clinic automation system' },
        { t: 'architecture diagram', m: B('رسم بيوضح أجزاء النظام وإزاي بتتكلم', 'a drawing of the system parts and how they talk'), ex: 'Form → n8n → DB → AI → WhatsApp' },
        { t: 'end-to-end', m: B('من أول خطوة لآخر خطوة', 'from the first step to the last'), ex: 'Test the whole flow end-to-end.' },
        { t: 'requirements', m: B('الحاجات اللي النظام لازم يعملها', 'what the system must do'), ex: 'Must confirm within 5 minutes' },
        { t: 'demo', m: B('عرض عملي للنظام وهو شغال', 'a live showing of the system working'), ex: '2-minute demo video' }],
      read: [{ t: 'n8n Docs: Courses (Level 2)', url: 'https://docs.n8n.io/courses/level-two/', what: B('راجع المفاهيم المتقدمة قبل ما تبني.', 'Review advanced concepts before building.') }],
      challenge: B('خلّص المشروع end-to-end، واعمل handover doc، وفيديو demo دقيقتين، وحطه أول مشروع في الـ portfolio.', 'Finish the project end-to-end, write a handover doc and a two-minute demo video, and make it the first project in your portfolio.'),
      quiz: [
        { q: B('قبل ما تربط الأجزاء:', 'Before connecting the parts:'), o: [B('اختبر كل جزء لوحده', 'test each part alone'), B('اربط كله مرة واحدة', 'connect everything at once'), B('ابعت للعميل', 'send it to the client')], a: 0, why: B('أسهل في التصليح.', 'Easier to fix.') },
        { q: B('end-to-end يعني:', 'end-to-end means:'), o: [B('من أول خطوة لآخر خطوة', 'from first step to last'), B('آخر يوم', 'the last day'), B('نهاية الكود', 'the end of the code')], a: 0, why: B('التدفق كله.', 'The whole flow.') },
        { q: B('أول حاجة في المشروع:', 'The first thing in the project:'), o: [B('المشكلة والـ diagram', 'the problem and the diagram'), B('الـ nodes', 'the nodes'), B('الفاتورة', 'the invoice')], a: 0, why: B('تخطيط.', 'Planning.') }
      ] },

    { title: B('المراجعة النهائية والاختبار', 'Final review and test'),
      goal: B('راجع الأسبوع الأخير، وسلّم المشروع النهائي، وخد الاختبار. لو جبت 70% أو أكتر، خلّصت رحلة الـ 24 أسبوع.', 'Review the last week, hand in the capstone, and take the test. Score 70% or more and you\'ve completed the 24-week journey.'),
      review: [
        B('portfolio بـ 3 case studies بنتايج بأرقام.', 'A portfolio of 3 case studies with results in numbers.'),
        B('فين الشغل، والعرض، ومكالمة الاكتشاف، والـ scope.', 'Where work is, the proposal, the discovery call and scope.'),
        B('التسعير (ساعة/مشروع/قيمة)، والمقدم، والعقد، والـ retainer.', 'Pricing (hourly/project/value), deposits, the contract and retainers.'),
        B('التسليم والتدريب والـ SLA والـ testimonial.', 'Handover, training, SLA and testimonials.'),
        B('المشروع النهائي end-to-end.', 'The end-to-end capstone project.')
      ],
      project: B('سلّم المشروع النهائي كامل: النظام شغال على سيرفر بـ HTTPS، والـ workflows في Git، وhandover doc، وفيديو demo، وcase study في الـ portfolio، وعرض سعر لعميل حقيقي بنفس الفكرة. مبروك — انت جاهز تشتغل.',
                 'Deliver the full capstone: the system running on an HTTPS server, workflows in Git, a handover doc, a demo video, a case study in your portfolio, and a price proposal to a real client for the same idea. Congratulations — you\'re ready to work.'),
      test: [
        { q: B('case study قوي فيه:', 'A strong case study has:'), o: [B('مشكلة وحل ونتيجة بأرقام', 'problem, solution and a result in numbers'), B('كود بس', 'only code'), B('اسم العميل وبياناته', 'the client\'s name and data')], a: 0, why: B('نتيجة.', 'Results.') },
        { q: B('value proposition:', 'A value proposition:'), o: [B('بتحل إيه ولمين', 'what you solve and for whom'), B('سعرك', 'your price'), B('سيرتك الذاتية', 'your CV')], a: 0, why: B('جملة واحدة.', 'One sentence.') },
        { q: B('niche بيساعدك:', 'A niche helps you:'), o: [B('تبقى الخبير في مجال', 'become the expert in one field'), B('تشتغل في كل حاجة', 'do everything'), B('تغلّي من غير سبب', 'overcharge for no reason')], a: 0, why: B('تخصص.', 'Specialisation.') },
        { q: B('العرض يبدأ بـ:', 'A proposal starts with:'), o: [B('مشكلة العميل', 'the client\'s problem'), B('خبرتك', 'your experience'), B('السعر', 'the price')], a: 0, why: B('فهم.', 'Understanding.') },
        { q: B('مكالمة الاكتشاف قبل:', 'The discovery call comes before:'), o: [B('التسعير', 'pricing'), B('التسليم', 'handover'), B('الـ testimonial', 'the testimonial')], a: 0, why: B('تفهم الأول.', 'Understand first.') },
        { q: B('تسعير حسب اللي العميل بيوفّره:', 'Pricing by what the client saves:'), o: ['value-based pricing', 'hourly', 'free'], a: 0, why: B('قيمة.', 'Value.') },
        { q: B('دفعة مع كل مرحلة:', 'A payment with each stage:'), o: ['milestone', 'retainer', 'SLA'], a: 0, why: B('مراحل.', 'Stages.') },
        { q: B('طلب برّه الـ scope:', 'A request outside scope:'), o: ['change request', B('ببلاش', 'free'), B('اتجاهله', 'ignore it')], a: 0, why: B('سعر جديد.', 'A new price.') },
        { q: B('الـ credentials بعد التسليم تبقى:', 'After handover, credentials are:'), o: [B('باسم العميل', 'in the client\'s name'), B('باسمك', 'in your name'), B('في شات', 'in a chat')], a: 0, why: B('ملكه.', 'They own them.') },
        { q: B('SLA:', 'SLA:'), o: [B('اتفاق وقت الرد', 'a response-time agreement'), B('نوع سيرفر', 'a server type'), B('لغة برمجة', 'a programming language')], a: 0, why: B('خدمة.', 'Service.') },
        { q: B('عميل مبسوط بعد أسبوعين:', 'A happy client after two weeks:'), o: [B('اطلب testimonial', 'ask for a testimonial'), B('اختفي', 'disappear'), B('غلّي السعر', 'raise the price')], a: 0, why: B('سمعة.', 'Reputation.') },
        { q: B('المشروع النهائي لازم يتجرّب:', 'The capstone must be tested:'), o: ['end-to-end', B('جزء واحد', 'one part'), B('مش لازم', 'not at all')], a: 0, why: B('التدفق كله.', 'The whole flow.') }
      ] }
  ]
};
