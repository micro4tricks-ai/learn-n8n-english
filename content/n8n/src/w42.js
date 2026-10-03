// n8n week 42 — Privacy and protecting personal data.
// General engineering guidance, not legal advice.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الخصوصية وحماية البيانات الشخصية', 'Privacy and protecting personal data'),
  goal: B('تبني أتمتة بتحترم الناس والقوانين: تعرف البيانات الشخصية وقوانينها في مصر والسعودية وأوروبا (كمهندس، مش محامي)، تقلل البيانات وتحدد مدة الاحتفاظ، تستجيب لطلبات الحذف، تخفي البيانات في اللوج والـ AI، وتعقد اتفاقيات المعالجة صح.',
          'Build automations that respect people and the law: know personal data and its laws in Egypt, Saudi Arabia and Europe (as an engineer, not a lawyer), minimise data and set retention, answer deletion requests, mask data in logs and AI, and handle processing agreements properly.'),
  days: [
    { title: B('البيانات الشخصية والقوانين', 'Personal data and the laws'),
      goal: B('تعرف إيه اللي محمي وإيه القوانين اللي بتنطبق.', 'Know what is protected and which laws apply.'),
      learn: [
        L(B('إيه هي البيانات الشخصية؟', 'What is personal data?'),
          B('**personal data** = أي معلومة عن شخص معروف أو ممكن يتعرف: اسم، تليفون، إيميل، عنوان، رقم قومي، IP، صورة، صوت، سجل مشتريات. وفيه بيانات **حساسة** حمايتها أعلى: صحة، دين، بيانات مالية وبطاقات، بيانات أطفال، بيومترية. أتمتة عيادة أو مدرسة = بيانات حساسة.', '**personal data** = any information about an identified or identifiable person: a name, phone, email, address, national id, IP, photo, voice, purchase history. Some data is **sensitive** with stronger protection: health, religion, financial and card data, children’s data, biometrics. Automating a clinic or a school = sensitive data.'),
          'personal:   name · phone · email · address · IP · order history · voice note\nsensitive:  diagnosis / prescriptions · card numbers · national id · children’s records · fingerprints\nnot personal (alone): total sales per city · product stock · anonymous counts'),
        L(B('القوانين اللي هتقابلها', 'The laws you will meet'),
          B('مصر: قانون حماية البيانات الشخصية رقم 151 لسنة 2020. السعودية: نظام حماية البيانات الشخصية (**pdpl**) وتشرف عليه سدايا. أوروبا: GDPR — بينطبق لو بتخدم ناس في أوروبا حتى لو انت في القاهرة. التفاصيل بتختلف، بس المبادئ متشابهة. **مش استشارة قانونية**: للعقود والحالات الصعبة، محامي متخصص.', 'Egypt: Personal Data Protection Law No. 151 of 2020. Saudi Arabia: the Personal Data Protection Law (**pdpl**), supervised by SDAIA. Europe: GDPR — it applies if you serve people in Europe even from Cairo. The details differ, but the principles are similar. **Not legal advice**: for contracts and hard cases, a specialist lawyer.'),
          'shared principles (Egypt 151/2020 · Saudi PDPL · EU GDPR)\n1. a lawful basis for every use (consent, contract, legal duty…)\n2. purpose limitation: use data only for what you said\n3. data minimisation: collect only what you need\n4. retention limits: delete when no longer needed\n5. security: protect it (week 41)\n6. people’s rights: access, correction, deletion\n7. cross-border rules and breach notification'),
        L(B('دورك كمهندس أتمتة', 'Your role as an automation engineer'),
          B('غالبًا انت **مُعالِج** (processor) بتشتغل لحساب العميل (المسؤول/المتحكم). يعني: تنفّذ تعليماته المكتوبة، تحمي البيانات، متستخدمهاش لحاجة تانية، تبلّغه بأي تسريب فورًا، وتمسحها في آخر العقد. والـ **data processing agreement** (DPA) بيكتب ده كله.', 'You are usually a **processor** working on behalf of the client (the controller). That means: follow their written instructions, protect the data, never use it for anything else, tell them about any breach at once, and delete it at the end of the contract. A **data processing agreement** (DPA) writes all this down.'),
          'controller (the clinic)  decides why and how data is used · answers patients · legal responsibility\nprocessor (your agency)  runs the automation on its instructions · security · confidentiality · deletion at the end\nsub-processors (OpenAI, Twilio, n8n Cloud, Supabase…) must be listed and approved by the controller')
      ],
      practice: [
        B('اعمل قايمة بكل البيانات الشخصية في workflows عميل.', 'List all the personal data in a client’s workflows.'),
        B('علّم الحساسة منها.', 'Mark the sensitive ones.'),
        B('حدد القوانين اللي بتنطبق (البلد والعملاء).', 'Identify which laws apply (country and customers).'),
        B('حدد دورك: مُعالج ولا متحكم.', 'Decide your role: processor or controller.')
      ],
      words: [
        W('personal data', 'معلومة عن شخص ممكن يتعرف', 'information about an identifiable person', 'A phone number is personal data.'),
        W('sensitive data', 'بيانات بحماية أعلى زي الصحة', 'specially protected data such as health', 'Prescriptions are sensitive data.'),
        W('pdpl', 'نظام حماية البيانات الشخصية السعودي', 'the Saudi personal data protection law', 'The PDPL applies to the Riyadh clinic.'),
        W('lawful basis', 'السبب القانوني لاستخدام البيانات', 'the legal reason for using data', 'Each use needs a lawful basis.'),
        W('data processing agreement', 'عقد بين المتحكم والمُعالج', 'a contract between controller and processor', 'Sign a data processing agreement first.')
      ],
      read: [{ t: 'SDAIA: Personal Data Protection Law (Saudi Arabia)', url: 'https://sdaia.gov.sa/en/SDAIA/about/Documents/Personal%20Data%20English%20V2-23April2023-%20Reviewed-.pdf', what: B('لف على المبادئ.', 'Skim the principles.') }, { t: 'European Commission: Data protection explained', url: 'https://commission.europa.eu/law/law-topic/data-protection/data-protection-explained_en', what: B('اقرا What is personal data?', 'Read What is personal data?') }],
      challenge: B('اعمل «خريطة بيانات» لعميل: كل نوع بيانات شخصية، جاي منين، رايح فين (أنهي node وأنهي خدمة)، ليه (الغرض)، وبيتحفظ قد إيه — جدول واحد.', 'Make a «data map» for a client: each kind of personal data, where it comes from, where it goes (which node and service), why (the purpose), and how long it is kept — one table.'),
      quiz: [
        Q(B('IP المستخدم:', 'A user’s IP address:'), [['بيانات شخصية', 'personal data'], ['مش شخصية', 'not personal'], ['حساسة دايمًا', 'always sensitive']], 0, B('ممكن يعرّف.', 'Can identify.')),
        Q(B('وكالة بتعمل أتمتة لعيادة:', 'An agency automating a clinic:'), [['مُعالج (processor)', 'a processor'], ['متحكم', 'the controller'], ['مالهاش دور', 'no role']], 0, B('بتعليمات العميل.', 'On the client’s instructions.')),
        Q(B('عملاء في أوروبا ووكالتك في القاهرة:', 'Customers in Europe, agency in Cairo:'), [['GDPR ممكن ينطبق', 'GDPR may apply'], ['مستحيل ينطبق', 'it cannot apply'], ['قانون مصر بس', 'only Egyptian law']], 0, B('حسب الأشخاص.', 'Follows the people.'))
      ] },

    { title: B('التصميم بالخصوصية', 'Privacy by design'),
      goal: B('تجمع أقل، وتحتفظ أقل، وتوصل لأقل ناس.', 'Collect less, keep less, and let fewer people see it.'),
      learn: [
        L(B('تقليل البيانات', 'Minimising data'),
          B('**data minimisation**: كل حقل في الفورم أو الـ webhook لازم يكون ليه سبب. محتاج تاريخ الميلاد ولا السن كفاية؟ العنوان كله ولا المدينة؟ وفي الـ workflow: Edit Fields بعد التريجر يشيل كل اللي مش محتاجه، فميوصلش لـ CRM ولا AI ولا اللوج. أقل بيانات = أقل خطر وأقل التزامات.', '**data minimisation**: every field in a form or webhook must have a reason. Do you need the date of birth, or is the age enough? The full address, or the city? In the workflow: Edit Fields right after the trigger drops everything unneeded, so it never reaches the CRM, AI or logs. Less data = less risk and fewer obligations.'),
          'Webhook (shop order: 47 fields) → Edit Fields (keep 7: order_id, total, items, city, phone, email, consent_marketing)\n→ CRM gets 6 (not consent) · AI classifier gets 2 (items, city) · logs get order_id only'),
        L(B('مدة الاحتفاظ', 'Retention'),
          B('حدد لكل نوع بيانات مدة (الفواتير قانونيًا سنين، الـ leads اللي مش متحوّلين 6 شهور، الرسايل الصوتية بعد التفريغ تتمسح). وطبّق ده آليًا: pruning في n8n، workflow شهري بيمسح من الشيت/القاعدة، lifecycle rules في S3. ده **privacy by design**: الخصوصية جزء من التصميم مش إضافة.', 'Set a period per data kind (invoices legally for years, unconverted leads 6 months, voice notes deleted after transcription). And enforce it automatically: n8n pruning, a monthly workflow deleting from the sheet/database, S3 lifecycle rules. That is **privacy by design**: privacy built into the design, not bolted on.'),
          'retention schedule\nleads (not converted)     180 days   → monthly workflow deletes from CRM + sheet\nvoice notes (audio)       7 days     → S3 lifecycle rule; transcript kept with the ticket\nn8n executions            14 days    → EXECUTIONS_DATA_MAX_AGE=336\ninvoices                  as the tax law requires → archive, restricted access'),
        L(B('الموافقة والشفافية', 'Consent and transparency'),
          B('**consent** لازم يكون واضح ومنفصل (checkbox مش متعلّم مسبقًا: «موافق على رسايل عروض واتساب»)، ومسجّل بتاريخه، وسهل يتسحب («اكتب stop»). وسياسة خصوصية بلغة بسيطة بتقول إيه بيتجمع وليه ومين بيشوفه (بما فيهم خدمات AI). والأتمتة لازم تحترم السحب فورًا.', '**consent** must be clear and separate (an unticked checkbox: «I agree to promotional WhatsApp messages»), recorded with its date, and easy to withdraw («reply stop»). A plain-language privacy notice says what is collected, why and who sees it (including AI services). And the automation must honour withdrawal at once.'),
          'form: [ ] I agree to receive offers on WhatsApp (optional, unticked)\nstore: consent_marketing=true, consent_at=2026-10-04T09:12Z, consent_text_version=v3, source=landing-page\nWhatsApp reply "stop" → workflow sets consent_marketing=false → excluded from every campaign within minutes')
      ],
      practice: [
        B('شيل 5 حقول مش محتاجها من فورم أو webhook.', 'Remove 5 unneeded fields from a form or webhook.'),
        B('اكتب جدول مدد احتفاظ.', 'Write a retention schedule.'),
        B('اعمل workflow مسح شهري.', 'Build a monthly deletion workflow.'),
        B('سجّل الموافقة بتاريخها ونص نسختها.', 'Record consent with its date and text version.')
      ],
      words: [
        W('data minimisation', 'جمع أقل بيانات لازمة', 'collecting the least data needed', 'Data minimisation removed 40 fields.'),
        W('privacy by design', 'الخصوصية جزء من التصميم', 'privacy built into the design', 'Privacy by design starts at the form.'),
        W('consent', 'موافقة واضحة ومسجّلة', 'clear and recorded agreement', 'Marketing needs separate consent.'),
        W('purpose limitation', 'استخدام البيانات للغرض المعلن بس', 'using data only for the stated purpose', 'Purpose limitation forbids reusing leads for ads.'),
        W('retention schedule', 'جدول مدد الاحتفاظ', 'a table of retention periods', 'The retention schedule deletes leads after 180 days.')
      ],
      read: [{ t: 'ICO: Data minimisation', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/data-minimisation/', what: B('اقرا How do we decide.', 'Read How do we decide.') }],
      challenge: B('أعد تصميم workflow عميل بالخصوصية: Edit Fields بعد التريجر، كل خدمة تاخد أقل حقول، موافقة مسجّلة وstop شغال، جدول احتفاظ بـ workflow مسح آلي — وجدول قبل/بعد بعدد الحقول في كل مكان.', 'Redesign a client workflow for privacy: Edit Fields after the trigger, each service getting the fewest fields, recorded consent with a working stop, a retention schedule with an automatic deletion workflow — and a before/after table of field counts per destination.'),
      quiz: [
        Q(B('AI classifier محتاج:', 'An AI classifier needs:'), [['الحقول اللي بيصنّف بيها بس', 'only the fields it classifies on'], ['كل بيانات العميل', 'all customer data'], ['الرقم القومي', 'the national id']], 0, B('minimisation.', 'Minimisation.')),
        Q(B('checkbox موافقة التسويق:', 'The marketing consent checkbox:'), [['مش متعلّم مسبقًا ومنفصل', 'unticked and separate'], ['متعلّم مسبقًا', 'pre-ticked'], ['مخفي', 'hidden']], 0, B('واضح.', 'Clear.')),
        Q(B('الرسايل الصوتية بعد التفريغ:', 'Voice notes after transcription:'), [['تتمسح بعد مدة قصيرة', 'deleted after a short period'], ['للأبد', 'kept forever'], ['تتنشر', 'published']], 0, B('retention.', 'Retention.'))
      ] },

    { title: B('حقوق الأشخاص', 'People’s rights'),
      goal: B('ترد على طلبات الوصول والحذف في أيام مش شهور.', 'Answer access and deletion requests in days, not months.'),
      learn: [
        L(B('الطلبات', 'The requests'),
          B('**data subject request**: الشخص من حقه يعرف إيه اللي عندك عنه (وصول)، يصحّحه، ويطلب مسحه (**right to erasure**)، ويعترض على التسويق. القوانين بتحدد مدد للرد (GDPR: شهر عادة). من غير أتمتة، ده بيبقى بحث يدوي في 7 أنظمة — ومع الأتمتة، workflow واحد.', 'A **data subject request**: a person may know what you hold about them (access), correct it, ask for its deletion (the **right to erasure**), and object to marketing. Laws set reply deadlines (GDPR: usually one month). Without automation it is a manual search across 7 systems — with automation, one workflow.'),
          'request types → what the workflow does\naccess      → search every system by email/phone → compile a report → send securely\ncorrection  → update in the source system → propagate to copies\nerasure     → delete or anonymise everywhere (except what law requires keeping) → confirm\nobjection   → marketing flag off everywhere → confirm'),
        L(B('workflow طلبات الحذف', 'An erasure workflow'),
          B('Form (أو إيميل) ← تحقق من الهوية (كود على نفس الإيميل/التليفون — متمسحش بيانات حد بطلب حد تاني!) ← دوّر في كل الأنظمة ← امسح أو **anonymisation** (لو لازم الأرقام للإحصاء) ← سجّل الطلب والنتيجة (من غير البيانات) ← رد. والفواتير اللي القانون بيلزم بيها: قيّد الوصول بدل المسح.', 'A form (or email) → verify identity (a code to the same email/phone — never delete someone’s data on another person’s request!) → search every system → delete or apply **anonymisation** (if numbers are needed for statistics) → log the request and result (without the data) → reply. Invoices required by law: restrict access instead of deleting.'),
          'Form "Delete my data" → send 6-digit code to the email on file → Wait for code (24 h)\n→ parallel: CRM search+delete · Google Sheet rows · Postgres (orders: anonymise name/phone, keep totals) · Mailchimp unsubscribe+delete · S3 voice notes\n→ n8n executions older than the request: pruned within 14 days (state this in the reply)\n→ log: request_id, date, systems done, no personal fields → reply within 7 days'),
        L(B('pseudonymisation', 'Pseudonymisation'),
          B('**pseudonymisation**: بدّل الاسم والتليفون بـ id (أو hash بسر) في التقارير والتحليلات — فريق التحليل يشتغل من غير ما يعرف مين. مختلف عن anonymisation الكامل (مستحيل ترجع للشخص). مثال: تقرير «أكتر 10 عملاء شراء» بـ customer_7f3a مش بالأسماء.', '**pseudonymisation**: replace the name and phone with an id (or a keyed hash) in reports and analytics — the analysis team works without knowing who is who. Different from full anonymisation (no way back to the person). Example: a «top 10 buyers» report with customer_7f3a instead of names.'),
          'Code node: pseudonym = HMAC-SHA256(secret, normalised_phone).slice(0, 8) → "c_7f3a91b2"\nanalytics sheet: c_7f3a91b2 · Cairo · 14 orders · 3,420 EGP   (no name, no phone)\nonly the CRM (restricted) can map c_7f3a91b2 back to a person')
      ],
      practice: [
        B('اعمل فورم «اطلب بياناتك/امسحها».', 'Build a «request/delete my data» form.'),
        B('ضيف تحقق هوية بكود.', 'Add identity verification with a code.'),
        B('اعمل workflow حذف يغطي 3 أنظمة.', 'Build an erasure workflow covering 3 systems.'),
        B('حوّل تقرير لـ pseudonyms.', 'Convert a report to pseudonyms.')
      ],
      words: [
        W('data subject request', 'طلب شخص بخصوص بياناته', 'a person’s request about their data', 'Log every data subject request.'),
        W('right to erasure', 'حق الشخص في مسح بياناته', 'a person’s right to have data deleted', 'The right to erasure has legal exceptions.'),
        W('anonymisation', 'إزالة أي ربط بالشخص نهائيًا', 'removing any link to the person for good', 'Anonymisation keeps the order totals.'),
        W('pseudonymisation', 'تبديل الهوية بمعرّف', 'replacing identity with an identifier', 'Analytics use pseudonymisation.'),
        W('identity verification', 'التأكد إن الطالب هو صاحب البيانات', 'confirming the requester owns the data', 'Identity verification uses a code.')
      ],
      read: [{ t: 'ICO: Right to erasure', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-erasure/', what: B('اقرا When does the right apply.', 'Read When does the right apply.') }],
      challenge: B('ابني «مركز طلبات الخصوصية» لعميل: فورم، تحقق بكود، workflow وصول بيجمع تقرير، workflow حذف بيغطي كل الأنظمة (مع استثناءات القانون)، سجل طلبات من غير بيانات، ورد في أقل من 7 أيام.', 'Build a «privacy request centre» for a client: a form, code verification, an access workflow compiling a report, an erasure workflow covering every system (with legal exceptions), a request log without personal data, and replies within 7 days.'),
      quiz: [
        Q(B('طلب حذف من إيميل غريب لعميل تاني:', 'A deletion request from a stranger’s email for another customer:'), [['تحقق من الهوية الأول', 'verify identity first'], ['امسح فورًا', 'delete at once'], ['تجاهل', 'ignore']], 0, B('مش أي حد.', 'Not just anyone.')),
        Q(B('فاتورة القانون بيلزم بيها:', 'An invoice the law requires keeping:'), [['قيّد الوصول ومتمسحش', 'restrict access, do not delete'], ['امسحها', 'delete it'], ['انشرها', 'publish it']], 0, B('استثناء.', 'An exception.')),
        Q(B('تقرير تحليل من غير أسماء:', 'An analytics report without names:'), [['pseudonymisation', 'pseudonymisation'], ['تشفير', 'encryption'], ['نسخ احتياطي', 'backup']], 0, B('id.', 'An id.'))
      ] },

    { title: B('البيانات في اللوج والـ AI', 'Data in logs and AI'),
      goal: B('البيانات الشخصية متتسربش من الأماكن المنسية.', 'Personal data does not leak from forgotten places.'),
      learn: [
        L(B('الأماكن المنسية', 'The forgotten places'),
          B('البيانات الشخصية بتتسرب من أماكن محدش بيفكر فيها: executions المحفوظة (كل node بمدخله ومخرجه!)، اللوج، رسايل الأخطاء في Slack، pinned data، ملفات الـ backup، الشيتات الوسيطة، والـ prompts لخدمات AI. راجعهم كلهم في خريطة البيانات.', 'Personal data leaks from places nobody thinks about: saved executions (every node’s input and output!), logs, error messages in Slack, pinned data, backup files, intermediate sheets, and prompts to AI services. Review them all in the data map.'),
          'checklist of hidden copies\n[ ] executions: save errors only, 14 days; "do not save" for flows full of health data\n[ ] error alerts: workflow + order_id, never the payload\n[ ] pinned data: test data only (fake names)\n[ ] backups: encrypted, retention like the source\n[ ] temp sheets/files: deleted by the same workflow'),
        L(B('masking', 'Masking'),
          B('**masking** قبل ما البيانات تخرج لمكان أقل حماية: `0100****567`، `s***@example.com`، آخر 4 أرقام من البطاقة بس. Code node صغير ممكن يعمل mask لأي payload قبل اللوج أو التنبيه أو الـ AI — بقواعد للحقول المعروفة وregex للتليفونات والإيميلات في النص الحر.', '**masking** before data leaves for a less protected place: `0100****567`, `s***@example.com`, only the card’s last 4 digits. A small Code node can mask any payload before logging, alerting or AI — with rules for known fields and regex for phones and emails in free text.'),
          'const maskPhone = p => String(p).replace(/(\\d{4})\\d+(\\d{3})/, "$1****$2");\nconst maskEmail = e => String(e).replace(/^(.).*(@.*)$/, "$1***$2");\nconst scrubText = t => String(t)\n  .replace(/\\b01[0125]\\d{8}\\b/g, m => maskPhone(m))\n  .replace(/[\\w.+-]+@[\\w-]+\\.[\\w.]+/g, m => maskEmail(m));\nreturn $input.all().map(i => ({ json: { ...i.json, phone: maskPhone(i.json.phone), email: maskEmail(i.json.email), note: scrubText(i.json.note) } }));'),
        L(B('الـ AI والبيانات الشخصية', 'AI and personal data'),
          B('بعت بيانات عميل لنموذج AI = نقلتها لـ **sub-processor** (وغالبًا **cross-border transfer** لبلد تاني). قبلها: هل محتاج الهوية أصلًا؟ (ابعت السؤال من غير الاسم والتليفون)، اختار مزوّد بسياسة متحفظش وتتدربش على بياناتك (API الشركات)، وحط ده في الـ DPA وسياسة الخصوصية. وللبيانات الحساسة جدًا: نموذج محلي أو منطقة داخل البلد.', 'Sending customer data to an AI model = passing it to a **sub-processor** (often a **cross-border transfer** to another country). Before that: do you even need the identity? (send the question without the name and phone), choose a provider whose terms say no retention or training on your data (business APIs), and put this in the DPA and privacy notice. For very sensitive data: a local model or an in-country region.'),
          'before → "Sara Hassan (01001234567, Maadi) asks if her diabetes medicine is in stock"\nafter  → "A customer asks if a diabetes medicine is in stock" + internal ticket id T-8812\nprovider check: API data not used for training ✓ · retention ≤ 30 days ✓ · region ✓ · listed in DPA ✓')
      ],
      practice: [
        B('دوّر على بيانات شخصية في executions وتنبيهات عندك.', 'Look for personal data in your executions and alerts.'),
        B('اعمل Code node للـ masking وحطه قبل التنبيهات.', 'Write a masking Code node and put it before alerts.'),
        B('شيل الهوية من prompts الـ AI.', 'Remove identities from AI prompts.'),
        B('اقرا شروط البيانات عند مزوّد AI بتستخدمه.', 'Read the data terms of an AI provider you use.')
      ],
      words: [
        W('masking', 'إخفاء جزء من القيمة', 'hiding part of a value', 'Masking shows 0100****567.'),
        W('sub-processor', 'خدمة بتعالج البيانات لحساب المُعالج', 'a service processing data for the processor', 'The AI provider is a sub-processor.'),
        W('cross-border transfer', 'نقل البيانات لبلد تاني', 'sending data to another country', 'A US AI API is a cross-border transfer.'),
        W('data residency', 'مكان تخزين البيانات جغرافيًا', 'where data is stored geographically', 'The client requires Saudi data residency.'),
        W('hidden copy', 'نسخة بيانات في مكان منسي', 'a copy of data in a forgotten place', 'Pinned data was a hidden copy.')
      ],
      read: [{ t: 'OpenAI: Data controls in the API', url: 'https://developers.openai.com/api/docs/guides/your-data', what: B('مثال لشروط بيانات API.', 'An example of API data terms.') }, { t: 'Anthropic: Privacy Center', url: 'https://privacy.claude.com/en/', what: B('اقرا عن بيانات الـ API.', 'Read about API data.') }],
      challenge: B('اعمل «تنضيف الأماكن المنسية» لـ n8n عميل: إعدادات حفظ الـ executions، masking قبل كل تنبيه ولوج، pinned data وهمية، prompts AI من غير هوية، ومراجعة شروط مزوّدي AI — وحدّث خريطة البيانات.', 'Do a «forgotten places clean-up» on a client’s n8n: execution-saving settings, masking before every alert and log, fake pinned data, identity-free AI prompts, and a review of AI providers’ terms — then update the data map.'),
      quiz: [
        Q(B('تنبيه خطأ في Slack فيه:', 'A Slack error alert contains:'), [['الـ workflow ورقم الطلب', 'the workflow and order id'], ['الـ payload كامل', 'the full payload'], ['التليفون والعنوان', 'the phone and address']], 0, B('أقل بيانات.', 'Least data.')),
        Q(B('سؤال لـ AI عن دواء عميل:', 'Asking AI about a customer’s medicine:'), [['من غير اسم وتليفون', 'without name and phone'], ['بكل البيانات', 'with all the data'], ['ممنوع تمامًا', 'completely forbidden']], 0, B('minimisation.', 'Minimisation.')),
        Q(B('مزوّد AI في بلد تاني:', 'An AI provider in another country:'), [['cross-border transfer لازم يتغطى', 'a cross-border transfer to cover'], ['مش مهم', 'irrelevant'], ['أأمن', 'safer']], 0, B('قوانين.', 'Laws.'))
      ] },

    { title: B('الاتفاقيات والتسريبات', 'Agreements and breaches'),
      goal: B('عقود واضحة وخطة جاهزة لو حصل تسريب.', 'Clear contracts and a ready plan if a breach happens.'),
      learn: [
        L(B('الـ DPA وقايمة الخدمات', 'The DPA and the services list'),
          B('قبل ما تلمس بيانات عميل: DPA بيحدد البيانات والغرض والأمان والمدة والـ sub-processors (n8n Cloud، Supabase، OpenAI، Twilio…) ومكانهم، وإزاي تبلّغ عن تسريب، وإيه بيحصل في آخر العقد. وأي خدمة جديدة = تحديث القايمة وموافقة العميل. نماذج DPA جاهزة موجودة — والمحامي يراجع.', 'Before touching client data: a DPA defines the data, purpose, security, duration and the sub-processors (n8n Cloud, Supabase, OpenAI, Twilio…) and where they are, how breaches are reported, and what happens at contract end. Any new service = an updated list and client approval. Ready DPA templates exist — and a lawyer reviews.'),
          'sub-processor list (annex to the DPA)\nservice        purpose                region       data\nn8n Cloud      workflow runs          EU (Frankfurt)  orders, contacts\nSupabase       database               EU              orders\nOpenAI API     classify messages      US              message text (no identities)\nTwilio         WhatsApp delivery      US/EU           phone, message\nchange → notify the client 30 days ahead → they may object'),
        L(B('تقييم الأثر', 'Impact assessment'),
          B('لمشروع فيه بيانات حساسة أو مراقبة واسعة أو AI بيقرر عن ناس: **dpia** (تقييم أثر حماية البيانات): إيه المخاطر على الناس، وإيه الحماية، والخطر المتبقي. مش ورق بيروقراطي: بيكشف مشاكل قبل البناء، وبيحميك قدام العميل والجهة الرقابية.', 'For a project with sensitive data, wide monitoring, or AI deciding about people: a **dpia** (data protection impact assessment): the risks to people, the safeguards, and the residual risk. Not bureaucratic paper: it reveals problems before building and protects you before the client and the regulator.'),
          'DPIA — WhatsApp triage bot for a clinic\nrisk: health details sent to an AI abroad          → strip identities; in-country model for symptoms; DPA annex\nrisk: wrong urgent/non-urgent decision             → AI suggests only; a nurse decides; audit sample weekly\nrisk: messages kept forever in executions          → do not save successful runs; errors 7 days, masked\nresidual risk: low–medium → approved by the clinic manager on 2026-10-04'),
        L(B('لو حصل تسريب', 'If a breach happens'),
          B('**breach notification**: القوانين بتلزم تبلّغ الجهة الرقابية (وأحيانًا الأشخاص) خلال مدة قصيرة (GDPR: 72 ساعة؛ مصر والسعودية فيهم مدد قصيرة كمان). والمُعالج يبلّغ العميل **فورًا**. خطوات: احتوي (غيّر المفاتيح، اقفل الوصول)، قيّم (أنهي بيانات، كام شخص)، بلّغ، سجّل، واتعلّم (postmortem).', '**breach notification**: laws require telling the regulator (and sometimes the people) within a short time (GDPR: 72 hours; Egypt and Saudi Arabia also set short deadlines). The processor tells the client **at once**. Steps: contain (rotate keys, cut access), assess (which data, how many people), notify, record, and learn (a postmortem).'),
          'breach runbook (processor side)\n0–1 h   contain: rotate the leaked credential, disable the workflow/user, preserve logs\n1–4 h   assess: data types, number of people, systems, how long exposed\n≤ 24 h  notify the client (controller) in writing with the facts so far\n        the client decides regulator/person notifications within the legal deadline\nafter   breach register entry · postmortem · fixes with owners')
      ],
      practice: [
        B('اعمل قايمة sub-processors لعميل.', 'Write a sub-processor list for a client.'),
        B('اقرا نموذج DPA جاهز.', 'Read a ready-made DPA template.'),
        B('اعمل DPIA لمشروع فيه AI أو بيانات حساسة.', 'Do a DPIA for a project with AI or sensitive data.'),
        B('اكتب breach runbook من ناحيتك.', 'Write a breach runbook for your side.')
      ],
      words: [
        W('dpia', 'تقييم أثر حماية البيانات', 'a data protection impact assessment', 'Run a DPIA before the clinic bot.'),
        W('breach notification', 'إبلاغ الجهة الرقابية والأشخاص بالتسريب', 'telling the regulator and people about a breach', 'Breach notification has a deadline.'),
        W('data breach', 'وصول غير مصرح لبيانات شخصية', 'unauthorised access to personal data', 'A leaked token is a data breach.'),
        W('controller', 'الجهة اللي بتقرر استخدام البيانات', 'the party deciding how data is used', 'The clinic is the controller.'),
        W('processor', 'الجهة اللي بتعالج البيانات لحساب غيرها', 'the party processing data on another’s behalf', 'Our agency is the processor.')
      ],
      read: [{ t: 'European Data Protection Board: Data breach guidelines', url: 'https://www.edpb.europa.eu/documents/guideline/guidelines-92022-on-personal-data-breach-notification-under-gdpr_en', what: B('لف على الأمثلة.', 'Skim the examples.') }],
      challenge: B('جهّز «باكدج خصوصية» لوكالتك: نموذج DPA (للمراجعة القانونية)، قالب قايمة sub-processors، قالب DPIA، breach runbook، وفقرة خصوصية للعروض — واستخدمها مع عميل حقيقي أو وهمي.', 'Prepare a «privacy pack» for your agency: a DPA template (for legal review), a sub-processor list template, a DPIA template, a breach runbook and a privacy paragraph for proposals — and use it with a real or mock client.'),
      quiz: [
        Q(B('ضفت خدمة AI جديدة:', 'You added a new AI service:'), [['حدّث قايمة sub-processors وبلّغ العميل', 'update the sub-processor list and notify the client'], ['محدش محتاج يعرف', 'nobody needs to know'], ['بعد سنة', 'after a year']], 0, B('شفافية.', 'Transparency.')),
        Q(B('المُعالج اكتشف تسريب:', 'The processor discovers a breach:'), [['يبلّغ العميل فورًا', 'tells the client at once'], ['يستنى يتأكد شهر', 'waits a month to be sure'], ['يخبي', 'hides it']], 0, B('مدد قانونية.', 'Legal deadlines.')),
        Q(B('DPIA بتتعمل:', 'A DPIA is done:'), [['قبل البناء للمشاريع العالية الخطورة', 'before building high-risk projects'], ['بعد التسريب', 'after a breach'], ['أبدًا', 'never']], 0, B('وقاية.', 'Prevention.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('أتمتة بتحترم الناس وجاهزة للمراجعة.', 'Automation that respects people and is ready for scrutiny.'),
      review: [
        B('البيانات الشخصية والحساسة، والقوانين (مصر 151/2020، PDPL، GDPR) — من غير استشارة قانونية.', 'Personal and sensitive data, and the laws (Egypt 151/2020, PDPL, GDPR) — not legal advice.'),
        B('المتحكم والمُعالج والـ sub-processors والـ DPA.', 'Controller, processor, sub-processors and the DPA.'),
        B('التقليل والغرض والاحتفاظ والموافقة.', 'Minimisation, purpose, retention and consent.'),
        B('طلبات الوصول والحذف وpseudonymisation.', 'Access and erasure requests and pseudonymisation.'),
        B('masking والأماكن المنسية والـ AI، والـ DPIA والتسريبات.', 'Masking, forgotten places and AI, DPIAs and breaches.')
      ],
      project: B('اعمل «مراجعة خصوصية» لأتمتة عميل وطبّقها: خريطة بيانات، دورك وقايمة sub-processors، Edit Fields للتقليل، جدول احتفاظ بمسح آلي، موافقة مسجّلة وstop، مركز طلبات (وصول/حذف) بتحقق هوية، masking في اللوج والتنبيهات، prompts AI من غير هوية، DPIA للجزء الأخطر، وbreach runbook — مع ملاحظة إن الصياغة القانونية النهائية لمحامي.', 'Run a «privacy review» of a client automation and apply it: a data map, your role and the sub-processor list, Edit Fields for minimisation, a retention schedule with automatic deletion, recorded consent with stop, a request centre (access/erasure) with identity verification, masking in logs and alerts, identity-free AI prompts, a DPIA for the riskiest part, and a breach runbook — noting that final legal wording is for a lawyer.'),
      test: [
        Q(B('سجل مشتريات شخص:', 'A person’s purchase history:'), [['بيانات شخصية', 'personal data'], ['مش شخصية', 'not personal'], ['عامة', 'public']], 0, B('مرتبطة بشخص.', 'Linked to a person.')),
        Q(B('بيانات صحية:', 'Health data:'), [['حساسة بحماية أعلى', 'sensitive, with stronger protection'], ['عادية', 'ordinary'], ['مسموحة لأي استخدام', 'allowed for any use']], 0, B('حساسة.', 'Sensitive.')),
        Q(B('قانون مصر لحماية البيانات:', 'Egypt’s data protection law:'), [['151 لسنة 2020', 'No. 151 of 2020'], ['مفيش', 'none'], ['GDPR', 'GDPR']], 0, B('مصر.', 'Egypt.')),
        Q(B('الوكالة اللي بتشغّل الأتمتة لعميل:', 'The agency running a client’s automation:'), [['processor', 'processor'], ['controller', 'controller'], ['مالهاش دور', 'no role']], 0, B('بتعليمات.', 'On instructions.')),
        Q(B('Edit Fields بعد التريجر:', 'Edit Fields after the trigger:'), [['تقليل البيانات', 'data minimisation'], ['تشفير', 'encryption'], ['نسخ احتياطي', 'backup']], 0, B('أقل.', 'Less.')),
        Q(B('موافقة التسويق:', 'Marketing consent:'), [['منفصلة ومسجّلة وقابلة للسحب', 'separate, recorded and withdrawable'], ['ضمنية', 'implied'], ['دايمًا', 'always assumed']], 0, B('واضحة.', 'Clear.')),
        Q(B('طلب حذف:', 'An erasure request:'), [['تحقق هوية ثم مسح في كل الأنظمة', 'verify identity, then delete everywhere'], ['امسح من الشيت بس', 'delete from the sheet only'], ['تجاهل', 'ignore']], 0, B('كل النسخ.', 'Every copy.')),
        Q(B('تقرير بـ c_7f3a91b2 بدل الاسم:', 'A report with c_7f3a91b2 instead of the name:'), [['pseudonymisation', 'pseudonymisation'], ['anonymisation', 'anonymisation'], ['تشفير', 'encryption']], 0, B('id.', 'An id.')),
        Q(B('0100****567:', '0100****567:'), [['masking', 'masking'], ['hashing', 'hashing'], ['تشفير', 'encryption']], 0, B('إخفاء جزئي.', 'Partial hiding.')),
        Q(B('مزوّد AI:', 'An AI provider:'), [['sub-processor', 'sub-processor'], ['controller', 'controller'], ['مش مهم', 'irrelevant']], 0, B('في القايمة.', 'On the list.')),
        Q(B('بوت فرز طبي بـ AI:', 'A medical triage bot with AI:'), [['DPIA قبل البناء', 'a DPIA before building'], ['ابني على طول', 'build straight away'], ['من غير توثيق', 'no documentation']], 0, B('خطر عالي.', 'High risk.')),
        Q(B('المُعالج اكتشف تسريب:', 'The processor finds a breach:'), [['يبلّغ المتحكم فورًا', 'informs the controller at once'], ['يبلّغ الصحافة', 'tells the press'], ['يستنى', 'waits']], 0, B('مدد.', 'Deadlines.'))
      ] }
  ]
};
