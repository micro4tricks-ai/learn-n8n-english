// n8n week 29 — CRMs and sales systems.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('أنظمة الـ CRM والمبيعات', 'CRMs and sales systems'),
  goal: B('تبني نظام مبيعات مؤتمت حوالين CRM: استقبال العملاء المحتملين من كل مكان، وتنضيفهم، وتقييمهم، وتوزيعهم، ومتابعة الصفقات، ومزامنة وتقارير.',
          'Build an automated sales system around a CRM: capture leads from everywhere, clean them, score them, assign them, follow deals, sync and report.'),
  days: [
    { title: B('نموذج بيانات الـ CRM', 'The CRM data model'),
      goal: B('تفهم الكيانات الأساسية في أي CRM وتربط بياناتك بيها.', 'Understand the core entities in any CRM and map your data to them.'),
      learn: [
        L(B('الكيانات الأساسية', 'The core entities'),
          B('أغلب الـ CRMs (HubSpot، Pipedrive، Zoho) فيها نفس الفكرة: **contacts** (أشخاص)، **companies** (شركات)، **deals** (صفقات بمبلغ ومرحلة)، و**activities** (مكالمات، إيميلات، مهام). الصفقة مربوطة بشخص وشركة، والـ activities مربوطة بيهم.', 'Most CRMs (HubSpot, Pipedrive, Zoho) share the same idea: **contacts** (people), **companies**, **deals** (with an amount and a stage), and **activities** (calls, emails, tasks). A deal is linked to a person and a company, and activities are linked to them.'),
          'Company: Nile Clinic\n  └ Contact: Dr. Sara (owner)\n      └ Deal: "Booking automation" 15,000 EGP · stage: Proposal sent\n          └ Activities: call 3/10, email 5/10, task "follow up 8/10"'),
        L(B('مراحل الـ pipeline', 'Pipeline stages'),
          B('الـ pipeline سلسلة مراحل الصفقة: New lead ← Contacted ← Discovery call ← Proposal sent ← Negotiation ← Won / Lost. كل مرحلة ليها معنى واضح ومين بيحرّكها. الأتمتة بتتعلّق بالانتقال بين المراحل.', 'The pipeline is the chain of deal stages: New lead → Contacted → Discovery call → Proposal sent → Negotiation → Won / Lost. Each stage has a clear meaning and an owner who moves it. Automation hangs on moving between stages.'),
          'stage change → Proposal sent → create task "follow up in 3 days"\nstage change → Won → start onboarding workflow'),
        L(B('خانات مخصصة وربط البيانات', 'Custom properties and mapping'),
          B('اللي مش موجود في الـ CRM اعمله **custom property** (مثلًا `lead_source`، `service_interest`، `budget_range`). قبل أي أتمتة اكتب جدول ربط: الحقل عندك ← الحقل في الـ CRM ← النوع. ده بيمنع بيانات في خانات غلط.', 'Whatever the CRM lacks, create as a **custom property** (e.g. `lead_source`, `service_interest`, `budget_range`). Before any automation, write a mapping table: your field → the CRM field → its type. This stops data landing in the wrong fields.'),
          'form.full_name   → contact.firstname + lastname (split)\nform.phone       → contact.phone (E.164)\nform.utm_source  → contact.lead_source (custom, dropdown)')
      ],
      practice: [
        B('اعمل حساب CRM مجاني (HubSpot أو غيره) وشوف الكيانات الأربعة.', 'Open a free CRM account (HubSpot or another) and look at the four entities.'),
        B('صمّم pipeline من 6 مراحل لبيزنس تعرفه، ومعنى كل مرحلة.', 'Design a 6-stage pipeline for a business you know, with each stage’s meaning.'),
        B('اكتب جدول ربط بين فورم عندك والـ CRM.', 'Write a mapping table between one of your forms and the CRM.'),
        B('اعمل 3 custom properties محتاجها.', 'Create 3 custom properties you need.')
      ],
      words: [
        W('crm', 'نظام إدارة علاقات العملاء', 'a customer relationship management system', 'Every lead goes into the CRM.'),
        W('contact record', 'سجل شخص في الـ CRM', 'a person’s record in the CRM', 'Update the contact record with the phone.'),
        W('deal stage', 'المرحلة اللي الصفقة واقفة فيها', 'the step a deal is currently at', 'Move the deal stage to Proposal sent.'),
        W('sales pipeline', 'سلسلة مراحل الصفقات من أول تواصل للبيع', 'the chain of deal stages from first contact to sale', 'The sales pipeline has six stages.'),
        W('custom property', 'خانة إضافية بتعملها في الـ CRM', 'an extra field you create in the CRM', 'Add a custom property for the lead source.')
      ],
      read: ['lib:n8n Docs: HubSpot node', { t: 'HubSpot Knowledge Base: Set up and customize pipelines', url: 'https://knowledge.hubspot.com/object-settings/set-up-and-customize-pipelines', what: B('اقرا فكرة المراحل وإعدادها.', 'Read about stages and how to set them up.') }],
      challenge: B('صمّم نموذج بيانات CRM كامل لبيزنس حقيقي: الكيانات، الـ pipeline، 5 custom properties، وجدول ربط لكل مصدر بيانات عنده.', 'Design a full CRM data model for a real business: entities, the pipeline, 5 custom properties, and a mapping table for each of its data sources.'),
      quiz: [
        Q(B('الصفقة (deal) فيها عادةً:', 'A deal usually has:'), [['مبلغ ومرحلة', 'an amount and a stage'], ['صورة', 'a photo'], ['كلمة سر', 'a password']], 0, B('وبتتربط بشخص وشركة.', 'And links to a person and company.')),
        Q(B('لو الـ CRM مفيهوش خانة محتاجها:', 'If the CRM lacks a field you need:'), [['تعمل custom property', 'create a custom property'], ['تحطها في الاسم', 'put it in the name'], ['تسيبها', 'skip it']], 0, B('خانة مخصصة.', 'A custom field.')),
        Q(B('جدول الربط قبل الأتمتة بيمنع:', 'A mapping table before automating prevents:'), [['بيانات في خانات غلط', 'data in the wrong fields'], ['السرعة', 'speed'], ['الأخطاء الشبكية', 'network errors']], 0, B('كل حقل في مكانه.', 'Every field in its place.'))
      ] },

    { title: B('استقبال العملاء المحتملين', 'Capturing leads'),
      goal: B('كل lead من أي مكان يوصل الـ CRM نضيف ومن غير تكرار في دقيقة.', 'Every lead from anywhere reaches the CRM clean and without duplicates within a minute.'),
      learn: [
        L(B('مصادر كتير ← شكل واحد', 'Many sources → one shape'),
          B('الـ leads بتيجي من فورم الموقع، وإعلانات فيسبوك، وواتساب، وإيميل، ومعارض. كل مصدر ليه workflow صغير بيحوّل البيانات لـ **شكل موحد** (`name, phone, email, source, message`) ويبعته لـ `svc: upsert lead`. كده المنطق المهم في مكان واحد.', 'Leads come from the website form, Facebook ads, WhatsApp, email and events. Each source has a small workflow that turns the data into **one shape** (`name, phone, email, source, message`) and sends it to `svc: upsert lead`. The important logic then lives in one place.'),
          'Website form ─┐\nFacebook Lead Ads ─┼→ normalise → svc: upsert lead → CRM\nWhatsApp ─┘'),
        L(B('منع التكرار في الـ CRM', 'Avoiding duplicates in the CRM'),
          B('قبل الإنشاء دوّر: بالإيميل (lowercase) ثم بالموبايل (E.164). لو موجود حدّثه وضيف activity «تواصل تاني من مصدر كذا»، لو مش موجود اعمله. ومتكتبش فوق قيمة موجودة بقيمة فاضية.', 'Before creating, search: by email (lowercase), then by phone (E.164). If found, update it and add an activity «contacted again from source X»; if not, create it. And never overwrite an existing value with an empty one.'),
          'search by email → found? update : search by phone → found? update : create\nupdate rule: only fill empty fields, never blank out existing ones'),
        L(B('UTM ومصدر الـ lead', 'UTM and lead source'),
          B('الروابط في الإعلانات فيها **UTM** (`utm_source=facebook&utm_campaign=ramadan`). احفظهم في hidden fields في الفورم وابعتهم للـ CRM. كده تعرف أنهي حملة جابت عملاء فعلًا، مش بس clicks.', 'Ad links carry **UTM parameters** (`utm_source=facebook&utm_campaign=ramadan`). Save them in hidden form fields and send them to the CRM. You then know which campaign brought real customers, not just clicks.'),
          'https://site.com/book?utm_source=facebook&utm_medium=cpc&utm_campaign=ramadan\n→ lead_source = facebook · campaign = ramadan')
      ],
      practice: [
        B('ابني `svc: upsert lead` بالبحث بالإيميل ثم الموبايل.', 'Build `svc: upsert lead` searching by email, then phone.'),
        B('اعمل مصدرين (فورم n8n + إيميل) بيحوّلوا للشكل الموحد.', 'Create two sources (an n8n form + email) converting to the shared shape.'),
        B('ابعت نفس العميل من المصدرين واتأكد إنه سجل واحد بـ activity.', 'Send the same customer from both sources and check it is one record with an activity.'),
        B('ضيف UTM لفورم وتأكد إنه وصل الـ CRM.', 'Add UTM fields to a form and check they reach the CRM.')
      ],
      words: [
        W('lead', 'شخص مهتم ممكن يبقى عميل', 'a person interested who might become a customer', 'A new lead came from the website.'),
        W('lead source', 'المكان اللي العميل المحتمل جه منه', 'where a lead came from', 'Save the lead source as facebook.'),
        W('lead enrichment', 'تكميل بيانات العميل المحتمل من مصادر تانية', 'completing a lead’s data from other sources', 'Lead enrichment added the company size.'),
        W('utm parameters', 'خانات في الرابط بتقول الزيارة جت منين', 'link fields that say where a visit came from', 'Keep the UTM parameters in hidden fields.'),
        W('duplicate contact', 'نفس الشخص متسجّل أكتر من مرة', 'the same person recorded more than once', 'Search by email to avoid a duplicate contact.')
      ],
      read: ['lib:n8n Docs: n8n Form Trigger', { t: 'Google Analytics Help: Collect campaign data with custom URLs', url: 'https://support.google.com/analytics/answer/10917952', what: B('اقرا معنى كل خانة UTM.', 'Read what each UTM field means.') }],
      challenge: B('اربط 3 مصادر leads بـ `svc: upsert lead`: من غير تكرار، بمصدر وحملة، وactivity لكل تواصل، وتنبيه للفريق في أقل من دقيقة.', 'Connect 3 lead sources to `svc: upsert lead`: no duplicates, with source and campaign, an activity per contact, and a team alert within a minute.'),
      quiz: [
        Q(B('ترتيب البحث عن عميل موجود:', 'The order to search for an existing customer:'), [['الإيميل ثم الموبايل', 'email, then phone'], ['الاسم بس', 'the name only'], ['مفيش بحث', 'no search']], 0, B('الاسم بيتكرر.', 'Names repeat.')),
        Q(B('عميل موجود وجه بخانة موبايل فاضية:', 'An existing customer arrives with an empty phone field:'), [['متمسحش الموبايل القديم', 'do not erase the old phone'], ['امسحه', 'erase it'], ['اعمل سجل جديد', 'create a new record']], 0, B('متكتبش فاضي فوق موجود.', 'Never blank out existing values.')),
        Q(B('UTM بيقولك:', 'UTM tells you:'), [['الحملة والمصدر', 'the campaign and source'], ['سعر المنتج', 'the product price'], ['اسم العميل', 'the customer’s name']], 0, B('أنهي إعلان جاب العميل.', 'Which ad brought the customer.'))
      ] },

    { title: B('التقييم والتوزيع', 'Scoring and assignment'),
      goal: B('أحسن العملاء المحتملين يوصلوا لأنسب مندوب بسرعة.', 'The best leads reach the right salesperson fast.'),
      learn: [
        L(B('تقييم بالقواعد', 'Rule-based scoring'),
          B('اعمل نقط: ميزانية فوق 10 آلاف +30، شركة مش فرد +20، طلب «عايز عرض سعر» +25، إيميل شخصي (gmail) −5، رسالة فاضية −10. المجموع بيحدد: **hot** (≥60)، **warm**، **cold**. القواعد البسيطة الواضحة أحسن من موديل معقد مش مفهوم.', 'Assign points: budget above 10k +30, a company not an individual +20, «I want a quote» +25, a personal email (gmail) −5, an empty message −10. The total decides: **hot** (≥60), **warm**, **cold**. Simple clear rules beat a complex model nobody understands.'),
          "let score = 0;\nif ($json.budget >= 10000) score += 30;\nif ($json.company) score += 20;\nif (/quote|عرض سعر/i.test($json.message)) score += 25;\nconst tier = score >= 60 ? 'hot' : score >= 30 ? 'warm' : 'cold';"),
        L(B('تصنيف بالـ AI', 'AI-assisted classification'),
          B('للرسايل الحرة، نود AI بـ structured output يطلّع: الاهتمام (أنهي خدمة)، الاستعجال، والميزانية لو مذكورة — كأرقام تدخل في القواعد. الـ AI بيساعد القواعد، مش بيحل محلها، ونتيجته بتتسجّل للمراجعة.', 'For free-text messages, an AI node with structured output extracts: interest (which service), urgency, and budget if mentioned — as values that feed the rules. The AI helps the rules rather than replacing them, and its result is logged for review.'),
          '{"interest": "booking automation", "urgency": "high", "budget_egp": 15000, "language": "ar"}'),
        L(B('التوزيع والسرعة', 'Assignment and speed'),
          B('**round-robin**: كل lead للمندوب اللي عليه الدور (عدّاد في جدول). أو حسب التخصص أو المنطقة. والأهم **speed to lead**: العميل الـ hot لازم حد يكلمه في دقايق. لو عدّت 15 دقيقة من غير activity، تنبيه للمدير ونقل لمندوب تاني.', '**Round-robin**: each lead goes to the next salesperson in turn (a counter in a table). Or by specialty or region. Most important is **speed to lead**: a hot lead must be contacted within minutes. If 15 minutes pass with no activity, alert the manager and reassign.'),
          'hot lead → assign next rep (round-robin) → Telegram to rep\nWait 15 min → IF no activity → alert manager + reassign')
      ],
      practice: [
        B('اكتب قواعد تقييم لبيزنس تعرفه وجرّبها على 10 leads وهمية.', 'Write scoring rules for a business you know and test them on 10 fake leads.'),
        B('ضيف تصنيف AI للرسالة بـ structured output.', 'Add AI classification of the message with structured output.'),
        B('اعمل round-robin بعدّاد في جدول لـ 3 مندوبين.', 'Build round-robin with a counter in a table for 3 salespeople.'),
        B('اعمل تنبيه speed to lead بعد 15 دقيقة.', 'Add a speed-to-lead alert after 15 minutes.')
      ],
      words: [
        W('lead scoring', 'تقييم العملاء المحتملين بنقط حسب أهميتهم', 'rating leads with points by how promising they are', 'Lead scoring puts hot leads first.'),
        W('round-robin', 'توزيع بالدور على أشخاص', 'sharing out in turn among people', 'Assign leads round-robin.'),
        W('speed to lead', 'سرعة الرد على العميل المحتمل', 'how fast a lead gets a reply', 'Speed to lead under 5 minutes doubles bookings.'),
        W('hot lead', 'عميل محتمل جاهز يشتري قريب', 'a lead ready to buy soon', 'Call every hot lead within minutes.'),
        W('reassign', 'تنقل المسؤولية لشخص تاني', 'to move the responsibility to another person', 'Reassign the lead after 15 minutes of silence.')
      ],
      read: ['lib:n8n Docs: AI Agent node', { lib: 'n8n Docs: Wait node', what: B('اقرا وضع الانتظار بوقت محدد.', 'Read the wait-for-a-time mode.') }],
      challenge: B('ابني نظام توزيع كامل: تقييم بالقواعد + AI، round-robin حسب التخصص، تنبيه فوري للمندوب، ومتابعة speed to lead بنقل تلقائي، وتقرير يومي بمتوسط وقت الرد.', 'Build a full assignment system: rules + AI scoring, round-robin by specialty, an instant alert to the rep, speed-to-lead tracking with automatic reassignment, and a daily report of average response time.'),
      quiz: [
        Q(B('تقييم بقواعد واضحة ميزته:', 'The advantage of clear rule-based scoring:'), [['مفهوم وسهل يتعدّل', 'understood and easy to adjust'], ['أذكى دايمًا', 'always smarter'], ['مش محتاج بيانات', 'needs no data']], 0, B('الفريق يثق فيه.', 'The team trusts it.')),
        Q(B('round-robin معناه:', 'Round-robin means:'), [['بالدور', 'in turn'], ['عشوائي', 'random'], ['للأقدم دايمًا', 'always to the most senior']], 0, B('عدّاد بيلف.', 'A rotating counter.')),
        Q(B('lead hot ومحدش كلمه 15 دقيقة:', 'A hot lead with no contact for 15 minutes:'), [['تنبيه ونقل لمندوب تاني', 'alert and reassign'], ['استنى بكرة', 'wait until tomorrow'], ['امسحه', 'delete it']], 0, B('السرعة بتفرق.', 'Speed matters.'))
      ] },

    { title: B('أتمتة الـ pipeline', 'Pipeline automation'),
      goal: B('كل تغيير مرحلة يطلّع الخطوة الجاية لوحده، ومفيش صفقة تتنسي.', 'Each stage change triggers the next step by itself, and no deal is forgotten.'),
      learn: [
        L(B('تريجر تغيير المرحلة', 'The stage-change trigger'),
          B('الـ CRMs بتبعت webhook (أو فيه تريجر n8n) لما الصفقة تتغير. اعمل موزّع على المرحلة الجديدة: Proposal sent ← مهمة متابعة بعد 3 أيام. Won ← workflow الـ onboarding (فاتورة، ترحيب، إنشاء مشروع). Lost ← سؤال عن السبب.', 'CRMs send a webhook (or there is an n8n trigger) when a deal changes. Build a router on the new stage: Proposal sent → a follow-up task in 3 days. Won → the onboarding workflow (invoice, welcome, create project). Lost → ask for the reason.'),
          'CRM webhook (deal updated) → Switch on stage\n  proposal_sent → task "follow up" due +3 days\n  won  → svc: onboarding\n  lost → email "may we ask why?" + lost_reason'),
        L(B('الصفقات الراكدة', 'Stale deals'),
          B('صفقة في نفس المرحلة أكتر من X يوم من غير activity = **stale**. workflow يومي بيدوّر عليها ويبعت للمندوب قايمته الصبح: «5 صفقات محتاجة خطوة». ده بيرفع نسبة الإغلاق أكتر من أي أداة.', 'A deal in the same stage for more than X days with no activity is **stale**. A daily workflow finds them and sends each rep a morning list: «5 deals need a next step». This raises the close rate more than any tool.'),
          'Daily 8:00 → get deals where stage_changed < now − 7 days and no activity 7 days\n→ group by owner → Telegram list per rep'),
        L(B('من الصفقة للتنفيذ', 'From deal to delivery'),
          B('لما الصفقة تبقى Won، الأتمتة بتسلّمها للتنفيذ من غير نسخ ولصق: تعمل فاتورة أولى، وتبعت إيميل ترحيب، وتعمل مشروع في أداة المهام، وتجهّز فولدر Drive، وتسجّل كل ده كـ activities على الصفقة.', 'When a deal is Won, automation hands it to delivery without copy and paste: create the first invoice, send a welcome email, create a project in the task tool, prepare a Drive folder, and log all of this as activities on the deal.'),
          'Won → invoice (50% upfront) → welcome email → project in task tool\n→ Drive folder "Clients/Nile Clinic" → activities on the deal')
      ],
      practice: [
        B('اربط webhook تغيير الصفقة (أو polling) بموزّع على المرحلة.', 'Connect the deal-change webhook (or polling) to a router on the stage.'),
        B('اعمل مهمة متابعة تلقائية بعد Proposal sent.', 'Create an automatic follow-up task after Proposal sent.'),
        B('ابني تقرير الصفقات الراكدة اليومي لكل مندوب.', 'Build the daily stale-deals report per rep.'),
        B('اعمل onboarding بسيط لما الصفقة Won.', 'Build simple onboarding when a deal is Won.')
      ],
      words: [
        W('deal', 'صفقة بيع محتملة بمبلغ', 'a potential sale with an amount', 'The deal moved to Negotiation.'),
        W('stale deal', 'صفقة واقفة من غير حركة فترة طويلة', 'a deal with no movement for a long time', 'Send each rep their stale deal list.'),
        W('follow-up task', 'مهمة متابعة بميعاد', 'a reminder task with a due date', 'Create a follow-up task for Thursday.'),
        W('win rate', 'نسبة الصفقات اللي اتقفلت بيع', 'the share of deals that were won', 'Our win rate rose to 30%.'),
        W('onboarding', 'خطوات استقبال عميل جديد بعد البيع', 'the steps of welcoming a new customer after the sale', 'Onboarding starts the moment a deal is won.')
      ],
      read: [{ t: 'n8n Docs: HubSpot Trigger', url: 'https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.hubspottrigger/', what: B('اقرا الأحداث اللي التريجر بيسمعها (زي تغيير الصفقة).', 'Read the events the trigger listens to (such as a deal change).') }, 'lib:n8n Docs: Switch node'],
      challenge: B('أتمت pipeline كامل: مهام لكل مرحلة، تقرير راكد يومي، onboarding لـ Won، سؤال السبب لـ Lost، وكل خطوة متسجلة activity على الصفقة.', 'Automate a full pipeline: tasks per stage, a daily stale report, onboarding for Won, a reason request for Lost, and every step logged as an activity on the deal.'),
      quiz: [
        Q(B('صفقة stale:', 'A stale deal:'), [['واقفة فترة من غير activity', 'stuck for a while with no activity'], ['اتقفلت بيع', 'was won'], ['جديدة', 'is new']], 0, B('محتاجة خطوة.', 'It needs a next step.')),
        Q(B('لما الصفقة Won:', 'When a deal is Won:'), [['onboarding تلقائي', 'automatic onboarding'], ['ولا حاجة', 'nothing'], ['تتمسح', 'it is deleted']], 0, B('تسليم من غير نسخ ولصق.', 'Hand-off without copy and paste.')),
        Q(B('ليه تسجّل خطوات الأتمتة كـ activities؟', 'Why log automation steps as activities?'), [['المندوب يشوف كل اللي حصل', 'the rep sees everything that happened'], ['عشان الحجم', 'for size'], ['مش مهم', 'it does not matter']], 0, B('تاريخ كامل للعميل.', 'A complete customer history.'))
      ] },

    { title: B('المزامنة والتقارير', 'Syncing and reporting'),
      goal: B('الـ CRM وباقي الأنظمة متفقين، والإدارة شايفة الأرقام كل أسبوع.', 'The CRM and other systems agree, and management sees the numbers every week.'),
      learn: [
        L(B('مين المرجع؟', 'Who is the source of truth?'),
          B('قبل أي مزامنة اتنين اتجاه (two-way sync)، قرّر لكل حقل: مين المرجع؟ الموبايل؟ الـ CRM. حالة الدفع؟ نظام الفواتير. لو الحقل بيتغيّر في الاتنين، محتاج قاعدة تعارض: آخر تعديل يكسب (last write wins) أو مصدر معيّن يكسب دايمًا.', 'Before any two-way sync, decide for each field: who is the reference? The phone? The CRM. Payment status? The invoicing system. If a field changes in both, you need a conflict rule: last write wins, or one source always wins.'),
          'field          source of truth\nphone          CRM\npayment_status invoices\nnotes          last write wins (compare updated_at)'),
        L(B('منع الحلقات', 'Avoiding loops'),
          B('مزامنة اتنين اتجاه ممكن تعمل حلقة: A يحدّث B ← B يبعت webhook ← يحدّث A ← … علّم التعديلات اللي جاية من الأتمتة (حقل `updated_by = "n8n"` أو مستخدم API مخصص) وتجاهلها في الاتجاه التاني، وقارن القيم: لو مفيش تغيير فعلي، متحدّثش.', 'A two-way sync can create a loop: A updates B → B sends a webhook → updates A → … Mark changes made by the automation (a field `updated_by = "n8n"` or a dedicated API user) and ignore them in the other direction, and compare values: if nothing really changed, do not update.'),
          'IF $json.updated_by == "n8n" → stop (our own change)\nIF new value == old value → stop (no real change)'),
        L(B('تقرير المبيعات الأسبوعي', 'The weekly sales report'),
          B('الأرقام اللي الإدارة محتاجاها: leads جديدة حسب المصدر، متوسط speed to lead، صفقات اتفتحت واتقفلت، win rate، قيمة الـ pipeline حسب المرحلة، وأعلى أسباب الخسارة. تتحسب بـ Summarize وتتبعت HTML كل أحد.', 'The numbers management needs: new leads by source, average speed to lead, deals opened and closed, the win rate, pipeline value by stage, and the top loss reasons. Compute them with Summarize and send as HTML every Sunday.'),
          'Leads: 84 (facebook 41 · site 30 · whatsapp 13) · speed to lead 9 min\nWon 7 / Lost 5 → win rate 58% · pipeline 420k EGP\nTop loss reason: "price" (3)')
      ],
      practice: [
        B('اكتب جدول «المرجع» لـ 8 حقول بين الـ CRM ونظام تاني.', 'Write a «source of truth» table for 8 fields between the CRM and another system.'),
        B('اعمل مزامنة اتجاه واحد CRM ← شيت كل ساعة.', 'Build a one-way CRM → sheet sync every hour.'),
        B('ضيف حماية من الحلقات بـ updated_by ومقارنة القيم.', 'Add loop protection with updated_by and value comparison.'),
        B('ابني تقرير المبيعات الأسبوعي بالأرقام الستة.', 'Build the weekly sales report with the six numbers.')
      ],
      words: [
        W('two-way sync', 'مزامنة التغييرات في الاتجاهين بين نظامين', 'syncing changes in both directions between two systems', 'A two-way sync needs conflict rules.'),
        W('last write wins', 'قاعدة إن آخر تعديل هو اللي يتحفظ', 'a rule that the latest change is kept', 'Notes use last write wins.'),
        W('conflict resolution', 'إزاي تقرر لما نظامين غيّروا نفس الحقل', 'how to decide when two systems changed the same field', 'Write the conflict resolution rules first.'),
        W('sync loop', 'حلقة تحديثات بين نظامين ملهاش نهاية', 'an endless cycle of updates between two systems', 'updated_by stops the sync loop.'),
        W('pipeline velocity', 'سرعة حركة الصفقات للبيع', 'how fast deals move to a sale', 'Pipeline velocity improved after the reminders.')
      ],
      read: ['lib:n8n Docs: Compare Datasets', 'lib:n8n Docs: Summarize'],
      challenge: B('ابني مزامنة CRM ↔ قاعدة بيانات (أو شيت) لحقلين في الاتجاهين بقواعد تعارض وحماية من الحلقات، وتقرير مبيعات أسبوعي كامل.', 'Build a CRM ↔ database (or sheet) sync for two fields in both directions with conflict rules and loop protection, and a full weekly sales report.'),
      quiz: [
        Q(B('قبل المزامنة في الاتجاهين لازم:', 'Before a two-way sync you must:'), [['تحدد المرجع لكل حقل', 'decide the reference for each field'], ['تمسح البيانات', 'delete the data'], ['تزوّد السيرفر', 'upgrade the server']], 0, B('مين يكسب.', 'Who wins.')),
        Q(B('حلقة مزامنة بتتمنع بـ:', 'A sync loop is prevented by:'), [['تعليم تعديلات الأتمتة ومقارنة القيم', 'marking automation changes and comparing values'], ['زيادة السرعة', 'more speed'], ['Wait طويل', 'a long Wait']], 0, B('تجاهل تعديلك انت.', 'Ignore your own changes.')),
        Q(B('win rate =', 'Win rate ='), [['الصفقات الكسبانة ÷ الصفقات المقفولة', 'won deals ÷ closed deals'], ['عدد الـ leads', 'the number of leads'], ['قيمة الـ pipeline', 'the pipeline value']], 0, B('Won / (Won + Lost).', 'Won / (Won + Lost).'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('نظام مبيعات مؤتمت من أول lead لحد التسليم.', 'An automated sales system from the first lead to delivery.'),
      review: [
        B('الكيانات: contacts وcompanies وdeals وactivities، والـ pipeline والـ custom properties.', 'Entities: contacts, companies, deals and activities, the pipeline and custom properties.'),
        B('مصادر كتير لشكل واحد، ومنع التكرار، وUTM.', 'Many sources into one shape, avoiding duplicates, and UTM.'),
        B('التقييم بالقواعد والـ AI، وround-robin، وspeed to lead.', 'Scoring with rules and AI, round-robin, and speed to lead.'),
        B('أتمتة المراحل، والصفقات الراكدة، والـ onboarding.', 'Stage automation, stale deals and onboarding.'),
        B('المرجع لكل حقل، ومنع الحلقات، والتقرير الأسبوعي.', 'The reference per field, avoiding loops, and the weekly report.')
      ],
      project: B('ابني «نظام مبيعات» لوكالة أو عيادة: 3 مصادر leads، svc: upsert lead من غير تكرار، تقييم وتوزيع، speed to lead، أتمتة الـ pipeline (مهام، راكد، onboarding، أسباب الخسارة)، مزامنة لقاعدة بيانات، وتقرير أسبوعي. استخدم CRM مجاني وبيانات وهمية.', 'Build a «sales system» for an agency or clinic: 3 lead sources, svc: upsert lead without duplicates, scoring and assignment, speed to lead, pipeline automation (tasks, stale deals, onboarding, loss reasons), a database sync and a weekly report. Use a free CRM and fake data.'),
      test: [
        Q(B('الكيان اللي فيه مبلغ ومرحلة:', 'The entity with an amount and a stage:'), [['deal', 'deal'], ['contact', 'contact'], ['task', 'task']], 0, B('الصفقة.', 'The deal.')),
        Q(B('custom property بتتعمل لما:', 'A custom property is created when:'), [['الـ CRM مفيهوش الخانة', 'the CRM lacks the field'], ['دايمًا', 'always'], ['أبدًا', 'never']], 0, B('خانة مخصصة.', 'A custom field.')),
        Q(B('ليه كل المصادر تروح لـ svc: upsert lead؟', 'Why do all sources go to svc: upsert lead?'), [['المنطق المهم في مكان واحد', 'the key logic is in one place'], ['أسرع', 'faster'], ['أرخص', 'cheaper']], 0, B('تصليح واحد.', 'One fix.')),
        Q(B('البحث عن عميل موجود يبدأ بـ:', 'Searching for an existing customer starts with:'), [['الإيميل', 'the email'], ['الاسم', 'the name'], ['المدينة', 'the city']], 0, B('ثم الموبايل.', 'Then the phone.')),
        Q(B('utm_campaign بيقولك:', 'utm_campaign tells you:'), [['الحملة', 'the campaign'], ['السعر', 'the price'], ['المندوب', 'the rep']], 0, B('مين جاب العميل.', 'What brought the customer.')),
        Q(B('lead score 70:', 'A lead score of 70:'), [['hot', 'hot'], ['cold', 'cold'], ['مرفوض', 'rejected']], 0, B('≥60 = hot.', '≥60 = hot.')),
        Q(B('الـ AI في التقييم دوره:', 'The AI’s role in scoring:'), [['يطلّع معلومات تساعد القواعد', 'extract information that feeds the rules'], ['يقرر لوحده من غير تسجيل', 'decide alone without logging'], ['ولا حاجة', 'nothing']], 0, B('مساعد مش بديل.', 'A helper, not a replacement.')),
        Q(B('speed to lead بيقيس:', 'Speed to lead measures:'), [['سرعة أول رد', 'how fast the first reply is'], ['عدد الـ leads', 'the number of leads'], ['سعر الصفقة', 'the deal price']], 0, B('دقايق.', 'Minutes.')),
        Q(B('صفقة في Proposal sent:', 'A deal in Proposal sent:'), [['مهمة متابعة بعد أيام', 'a follow-up task in a few days'], ['فاتورة نهائية', 'a final invoice'], ['تتقفل Lost', 'close it as Lost']], 0, B('متابعة.', 'Follow up.')),
        Q(B('الصفقات الراكدة بتتبعت:', 'Stale deals are sent:'), [['لكل مندوب قايمته الصبح', 'to each rep as a morning list'], ['للعميل', 'to the customer'], ['مش بتتبعت', 'never']], 0, B('خطوة جاية.', 'A next step.')),
        Q(B('last write wins معناها:', 'Last write wins means:'), [['آخر تعديل يتحفظ', 'the latest change is kept'], ['أول تعديل يتحفظ', 'the first change is kept'], ['محدش يكسب', 'nobody wins']], 0, B('بمقارنة الوقت.', 'By comparing times.')),
        Q(B('updated_by = "n8n" بيستخدم عشان:', 'updated_by = "n8n" is used to:'), [['تمنع حلقة المزامنة', 'prevent the sync loop'], ['تعرف المندوب', 'identify the rep'], ['الأمان', 'security']], 0, B('تتجاهل تعديلك.', 'Ignore your own change.'))
      ] }
  ]
};
