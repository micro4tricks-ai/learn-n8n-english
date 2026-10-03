// English week 38 — The language of contracts and scope.
// Language learning, not legal advice: important contracts are reviewed by a lawyer.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('لغة العقود ونطاق العمل', 'The language of contracts and scope'),
  goal: B('تقرا وتكتب عقود ونطاقات عمل بالإنجليزي كمحترف حر: تفهم هيكل العقد وكلماته الثابتة (shall وmay وmust)، تكتب نطاق عمل واضح بمعايير قبول وافتراضات، تفهم بنود الدفع والإنهاء، وتعرف معنى بنود المخاطر (المسؤولية والسرية والملكية) — وتعرف إمتى لازم محامي.',
          'Read and write contracts and scopes of work in English as a professional freelancer: understand a contract’s structure and fixed words (shall, may, must), write a clear scope with acceptance criteria and assumptions, understand payment and termination clauses, and know what risk clauses mean (liability, confidentiality, ownership) — and when you need a lawyer.'),
  days: [
    { title: B('هيكل العقد', 'The structure of a contract'),
      goal: B('تعرف أجزاء العقد وتلاقي اللي يهمك بسرعة.', 'Know a contract’s parts and find what matters quickly.'),
      learn: [
        L(B('الأجزاء', 'The parts'),
          B('أغلب عقود الخدمات: الأطراف (**party** / parties)، التعريفات، الخدمات و**scope of work**، المدة، الأتعاب والدفع، الالتزامات، السرية، الملكية الفكرية، المسؤولية، الإنهاء، القانون الحاكم، والتوقيعات (**signatory**). العقد الإطاري (MSA) فيه **terms and conditions** العامة، والـ SOW فيه تفاصيل كل مشروع.', 'Most services contracts have: the parties (each **party**), definitions, the services and **scope of work**, the term, fees and payment, obligations, confidentiality, intellectual property, liability, termination, governing law, and signatures (each **signatory**). A framework contract (MSA) holds the general **terms and conditions**, and the SOW holds each project’s details.'),
          'SERVICES AGREEMENT\nThis Agreement is made on 4 October 2026 between:\n(1) Nile Shop LLC, a company registered in Egypt ("the Client"); and\n(2) Omar Hassan, trading as Flow Automation ("the Provider").\n1. Definitions  2. Services  3. Term  4. Fees and Payment  5. Confidentiality\n6. Intellectual Property  7. Liability  8. Termination  9. Governing Law\nSigned by the authorised signatory of each party.'),
        L(B('الأسلوب', 'The style'),
          B('لغة العقود رسمية وثابتة: «the Client» بحرف كبير (اسم معرّف)، جمل طويلة، وكلمات زي «hereinafter» و«pursuant to». النهارده الاتجاه لـ **plain english**: جمل أقصر وكلمات عادية — أوضح وأقل نزاعات. انت كفري لانسر اكتب ببساطة واقرا القديم بصبر.', 'Contract language is formal and fixed: «the Client» capitalised (a defined term), long sentences, and words like «hereinafter» and «pursuant to». The trend today is **plain english**: shorter sentences and ordinary words — clearer and fewer disputes. As a freelancer, write simply and read the old style patiently.'),
          'legalese: "The Provider shall, pursuant to the terms hereof, deliver the Deliverables to the Client forthwith upon completion thereof."\nplain English: "The Provider will deliver the Deliverables to the Client as soon as they are complete."'),
        L(B('التعديل والتفاوض', 'Changes and negotiation'),
          B('العقد مش «خده أو سيبه». تقدر تطلب تعديل: **redline** = نسخة بالتعديلات ظاهرة (Track Changes)، و**counter-proposal** = اقتراح بديل. وأي تغيير بعد التوقيع = **amendment** مكتوبة وموقّعة. ومهم: **ده مش استشارة قانونية** — العقود الكبيرة لمحامي.', 'A contract is not «take it or leave it». You can ask for changes: a **redline** = a version showing the edits (Track Changes), and a **counter-proposal** = an alternative suggestion. Any change after signing = a written, signed **amendment**. And importantly: **this is not legal advice** — big contracts go to a lawyer.'),
          '"Thanks for sending the agreement. I’ve attached a redline with two small changes:\n1. Clause 4.2 — we’d propose payment within 30 days rather than 60.\n2. Clause 7.1 — could we cap liability at the fees paid in the previous 12 months?\nHappy to discuss on a quick call."')
      ],
      practice: [
        B('اقرا عقد خدمات نموذجي وعلّم الأقسام.', 'Read a sample services contract and label its sections.'),
        B('حوّل 3 جمل legalese لـ plain English.', 'Turn 3 legalese sentences into plain English.'),
        B('اكتب إيميل redline بتعديلين.', 'Write a redline email with two changes.'),
        B('اكتب فقرة الأطراف لعقدك.', 'Write the parties paragraph for your contract.')
      ],
      words: [
        W('party', 'طرف في العقد', 'a side in a contract', 'Each party signs the agreement.'),
        W('terms and conditions', 'الشروط والأحكام العامة', 'the general rules of an agreement', 'Read the terms and conditions carefully.'),
        W('scope of work', 'نطاق العمل', 'the work to be done', 'The scope of work lists four workflows.'),
        W('signatory', 'الشخص المخوّل بالتوقيع', 'the person authorised to sign', 'Who is the authorised signatory?'),
        W('amendment', 'تعديل رسمي على العقد', 'a formal change to a contract', 'Any change needs a signed amendment.'),
        W('plain english', 'لغة بسيطة وواضحة', 'clear, simple language', 'Write the contract in plain English.'),
        W('redline', 'نسخة بالتعديلات ظاهرة', 'a version showing edits', 'I’ve attached a redline.'),
        W('counter-proposal', 'اقتراح بديل', 'an alternative offer', 'We sent a counter-proposal on payment.')
      ],
      read: [{ lib: 'Plain Language Guidelines', what: B('اقرا Use simple words and phrases.', 'Read Use simple words and phrases.') }, { lib: 'Cambridge Dictionary', what: B('دوّر على كل كلمة قانونية جديدة.', 'Look up every new legal word.') }],
      challenge: B('خد عقد خدمات نموذجي (موجود أونلاين مجانًا)، اكتب ملخص صفحة بالإنجليزي البسيط لكل قسم، وعلّم 3 بنود عايز تعدلها واكتب إيميل redline مهذب.', 'Take a free sample services contract, write a one-page plain-English summary of each section, mark 3 clauses you would change and write a polite redline email.'),
      quiz: [
        Q(B('«the Client» بحرف كبير:', '«the Client» capitalised:'), ['a defined term', 'a spelling mistake', 'a company name'], 0, B('تعريف.', 'Definition.')),
        Q(B('تعديل بعد التوقيع:', 'A change after signing:'), ['a written amendment', 'a phone call', 'nothing'], 0, B('مكتوب.', 'Written.')),
        Q(B('redline:', 'A redline:'), ['a version showing proposed edits', 'a red signature', 'a late payment'], 0, B('تعديلات.', 'Edits.'))
      ] },

    { title: B('shall وmay وmust', 'shall, may and must'),
      goal: B('تفرق بين الالتزام والحق والمنع.', 'Tell obligation, right and prohibition apart.'),
      learn: [
        L(B('الالتزام والحق', 'Obligation and right'),
          B('في العقود: **shall** و**must** = التزام («The Provider shall deliver…»)، **may** = حق أو اختيار مش إلزام («The Client may terminate…»)، **shall not**/must not = منع. الفرق ده بيفرق جدًا: «may provide support» = مش مجبر! والاتجاه الحديث: must بدل shall للوضوح.', 'In contracts: **shall** and **must** = an obligation («The Provider shall deliver…»), **may** = a right or option, not a duty («The Client may terminate…»), **shall not**/must not = a prohibition. The difference matters a lot: «may provide support» = not obliged! The modern trend: must instead of shall for clarity.'),
          '"The Provider shall respond to Severity 1 issues within 4 hours."   → obligation\n"The Client may request up to two rounds of revisions."             → right (optional)\n"The Provider shall not share Client data with third parties."      → prohibition\n⚠ "The Provider may provide monthly reports." → reports are optional!'),
        L(B('كتابة واضحة', 'Clear wording'),
          B('**in writing** = لازم يكون مكتوب (إيميل غالبًا كفاية لو العقد بيقول كده)، و«written notice» = إخطار مكتوب. وكلمات قديمة زي **hereby** («the parties hereby agree» = بموجب ده) بتظهر كتير — افهمها ومتستخدمهاش في كتابتك.', '**in writing** = it must be written (email is usually enough if the contract says so), and «written notice» = a written notification. Old words like **hereby** («the parties hereby agree» = by this document) appear often — understand them but avoid them in your own writing.'),
          '"Any change to the Scope must be agreed in writing (email is sufficient)."\n"Either party may terminate this Agreement by giving 30 days’ written notice."\n"The Client hereby grants the Provider access to the systems listed in Schedule 1."'),
        L(B('الغموض', 'Ambiguity'),
          B('أخطر حاجة في عقد = كلمة ليها معنيين. «reasonable time»، «as soon as possible»، «support» من غير تعريف، «the system» من غير تحديد. استبدلها بأرقام وتعريفات: «within 5 business days»، «support means fixing defects in the Deliverables».', 'The most dangerous thing in a contract = a word with two meanings. «reasonable time», «as soon as possible», «support» without a definition, «the system» without specifying. Replace them with numbers and definitions: «within 5 business days», «support means fixing defects in the Deliverables».'),
          'vague → clear\n"as soon as possible"        → "within 5 business days"\n"ongoing support"            → "fixing defects reported within 30 days of go-live"\n"the integration"            → "the integration between Shopify and Odoo described in Schedule 1"\n"regular reports"            → "a written report on the first business day of each month"')
      ],
      practice: [
        B('صنّف 10 جمل عقد: التزام ولا حق ولا منع.', 'Classify 10 contract sentences: obligation, right or prohibition.'),
        B('اكتب 5 بنود بـ must وmay بوضوح.', 'Write 5 clauses clearly with must and may.'),
        B('دوّر على 4 كلمات غامضة في عقد وبدّلها.', 'Find 4 vague words in a contract and replace them.'),
        B('اكتب بند «written notice».', 'Write a «written notice» clause.')
      ],
      words: [
        W('shall', 'لازم (التزام في العقود)', 'must (an obligation in contracts)', 'The Provider shall keep data confidential.'),
        W('may', 'يجوز (حق مش التزام)', 'is allowed to (a right, not a duty)', 'The Client may cancel with notice.'),
        W('must', 'لازم (التزام واضح)', 'has to (a clear obligation)', 'Invoices must be paid within 30 days.'),
        W('in writing', 'مكتوب', 'written down', 'Changes must be agreed in writing.'),
        W('hereby', 'بموجب هذا (رسمي)', 'by this document (formal)', 'The parties hereby agree as follows.')
      ],
      read: [{ lib: 'RFC 2119 (MUST, SHOULD, MAY)', what: B('نفس الفكرة في المواصفات التقنية.', 'The same idea in technical specs.') }],
      challenge: B('اكتب «بنود الالتزامات» لعقد أتمتة (8 بنود): 5 التزامات عليك بـ must، 2 حقوق للعميل بـ may، ومنع واحد — من غير ولا كلمة غامضة.', 'Write the «obligations» clauses of an automation contract (8 clauses): 5 duties for you with must, 2 client rights with may, and one prohibition — with not a single vague word.'),
      quiz: [
        Q(B('«The Provider may send reports»:', '«The Provider may send reports»:'), ['reports are optional', 'reports are required', 'reports are forbidden'], 0, B('حق.', 'A right.')),
        Q(B('التزام واضح:', 'A clear obligation:'), ['must', 'may', 'might'], 0, B('لازم.', 'Required.')),
        Q(B('أوضح من «as soon as possible»:', 'Clearer than «as soon as possible»:'), ['within 5 business days', 'quickly', 'soon'], 0, B('رقم.', 'A number.'))
      ] },

    { title: B('نطاق العمل والقبول', 'Scope and acceptance'),
      goal: B('نطاق يمنع الخلاف قبل ما يبدأ.', 'A scope that prevents disputes before they start.'),
      learn: [
        L(B('معايير القبول', 'Acceptance criteria'),
          B('**acceptance criteria** = الاختبار المتفق عليه اللي بيقول «الشغل خلص ومقبول». اكتبها قابلة للقياس: «50 test orders processed end to end with no errors in the staging environment». ومعاها: مدة المراجعة («the Client will review within 5 business days»)، وإيه يحصل لو مفيش رد.', '**acceptance criteria** = the agreed test saying «the work is done and accepted». Write them measurably: «50 test orders processed end to end with no errors in the staging environment». Plus the review period («the Client will review within 5 business days»), and what happens if there is no reply.'),
          '"Acceptance: The Deliverables will be accepted when 50 test orders are processed end to end without errors in the staging environment. The Client will review within 5 business days of delivery. If the Client does not report a defect within that period, the Deliverables are deemed accepted."'),
        L(B('الافتراضات والتغييرات', 'Assumptions and changes'),
          B('**assumption** = حاجة النطاق والسعر مبنيين عليها: «The Client will provide API access within 3 days», «Odoo’s API supports creating invoices». لو اتكسرت، السعر أو المدة ممكن يتغيروا. وأي حاجة جديدة = **change request**: وصف، تقدير، موافقة مكتوبة قبل الشغل.', 'An **assumption** = something the scope and price rely on: «The Client will provide API access within 3 days», «Odoo’s API supports creating invoices». If it breaks, the price or timeline may change. And anything new = a **change request**: a description, an estimate, written approval before work.'),
          'Assumptions\n• The Client will provide admin access to Shopify and an Odoo test database within 3 business days.\n• The Odoo API supports creating invoices and reading stock levels.\nIf an assumption proves incorrect, the Provider will notify the Client and the parties will agree any change to the fees or timeline in writing.\nChange requests: any work outside Schedule 1 requires a written change request with an estimate, approved by the Client before work begins.'),
        L(B('الضمان والتجديد', 'Warranty and renewal'),
          B('**warranty** = وعد إن الشغل هيشتغل زي الموصوف لمدة (مثلًا 30 يوم تصليح عيوب مجانًا)، مع استثناءات (تعديل العميل، خدمات طرف تالت). و**renewal** = تجديد عقد الصيانة (تلقائي ولا يدوي؟ بإخطار قد إيه؟). اقراهم كويس — ده اللي بيحدد شغلك بعد التسليم.', 'A **warranty** = a promise the work will perform as described for a period (e.g. 30 days of free defect fixes), with exclusions (client edits, third-party services). And **renewal** = renewing the maintenance contract (automatic or manual? with how much notice?). Read them carefully — they define your work after delivery.'),
          '"Warranty: For 30 days after acceptance, the Provider will fix, free of charge, any defect that causes the Deliverables not to perform as described in Schedule 1. This warranty does not cover changes made by the Client or failures of third-party services."\n"Renewal: The maintenance plan renews automatically each month unless either party gives 30 days’ written notice."')
      ],
      practice: [
        B('اكتب acceptance criteria قابلة للقياس لـ 3 مخرجات.', 'Write measurable acceptance criteria for 3 deliverables.'),
        B('اكتب 4 assumptions لمشروع.', 'Write 4 assumptions for a project.'),
        B('اكتب بند change request.', 'Write a change-request clause.'),
        B('اكتب بند warranty باستثناءات.', 'Write a warranty clause with exclusions.')
      ],
      words: [
        W('acceptance criteria', 'شروط قبول الشغل', 'the conditions for accepting work', 'Agree the acceptance criteria before building.'),
        W('assumption', 'حاجة الخطة مبنية عليها', 'something the plan relies on', 'One assumption was API access in 3 days.'),
        W('change request', 'طلب تغيير في النطاق', 'a request to change the scope', 'New features need a change request.'),
        W('warranty', 'ضمان', 'a promise of performance for a period', 'The warranty lasts 30 days.'),
        W('renewal', 'تجديد', 'continuing a contract for a new period', 'The renewal is automatic each month.')
      ],
      read: [{ lib: 'Microsoft Writing Style Guide', what: B('اقرا Use simple sentences.', 'Read Use simple sentences.') }],
      challenge: B('اكتب Schedule 1 (نطاق العمل) لمشروع أتمتة بالإنجليزي: المخرجات بالتفصيل، acceptance criteria، assumptions، change requests، warranty — صفحة واحدة واضحة.', 'Write Schedule 1 (the scope of work) for an automation project in English: detailed deliverables, acceptance criteria, assumptions, change requests and a warranty — one clear page.'),
      quiz: [
        Q(B('معيار قبول كويس:', 'A good acceptance criterion:'), ['50 test orders processed with no errors', 'the client is happy', 'it works well'], 0, B('قابل للقياس.', 'Measurable.')),
        Q(B('«API access within 3 days»:', '«API access within 3 days»:'), ['an assumption', 'a warranty', 'a penalty'], 0, B('افتراض.', 'Assumption.')),
        Q(B('ميزة جديدة في النص:', 'A new feature midway:'), ['a change request', 'free extra work', 'ignore it'], 0, B('نطاق.', 'Scope.'))
      ] },

    { title: B('الفلوس والمدة والإنهاء', 'Money, term and termination'),
      goal: B('بنود الدفع والإنهاء متفهومة ومحمية.', 'Payment and termination clauses understood and protected.'),
      learn: [
        L(B('الدفع', 'Payment'),
          B('**payment terms** بتقول إمتى وإزاي: **deposit** (مقدم قبل البدء)، دفعات على مراحل، **net 30** (خلال 30 يوم من الفاتورة)، العملة، طريقة الدفع، و**late fee** (رسوم التأخير) أو حق إيقاف الشغل. اكتبها بأرقام واضحة.', '**payment terms** say when and how: a **deposit** (paid before starting), staged payments, **net 30** (within 30 days of the invoice), the currency, the method, and a **late fee** or the right to pause work. Write them with clear numbers.'),
          '"Fees: EGP 24,000, payable as follows:\n(a) 40% deposit on signing;\n(b) 40% on acceptance in the staging environment;\n(c) 20% on go-live.\nInvoices are payable net 30. Late payments incur a fee of 2% per month. If an invoice is more than 15 days overdue, the Provider may pause work after giving written notice."'),
        L(B('المدة والإنهاء', 'Term and termination'),
          B('**termination** = إنهاء العقد: بإشعار (**notice period** — مثلًا 30 يوم من غير سبب)، أو فورًا لسبب (مخالفة جسيمة مش اتصلحت). ومهم: إيه يحصل بعد الإنهاء — الدفع عن الشغل اللي اتعمل، تسليم الملفات، ومسح البيانات.', '**termination** = ending the contract: with notice (a **notice period** — e.g. 30 days without cause), or immediately for cause (a serious breach not fixed). And importantly: what happens after — payment for work done, handover of files, and deleting data.'),
          '"Either party may terminate this Agreement:\n(a) for any reason, by giving 30 days’ written notice; or\n(b) immediately by written notice if the other party commits a material breach and fails to remedy it within 14 days of being asked to do so.\nOn termination, the Client will pay for all work performed up to the termination date, and the Provider will hand over all Deliverables and delete Client data within 30 days."'),
        L(B('التفاوض على الشروط', 'Negotiating terms'),
          B('عملاء كبار ممكن يطلبوا net 60 أو 90. اقترح بدايل بأدب: «We’d be happy to accept net 60 with a 30% deposit» أو «Could we agree net 30 for the first project?». ولو التأخير ممكن يأثر عليك: اربط الدفعات بالمراحل مش بنهاية المشروع.', 'Big clients may ask for net 60 or 90. Suggest alternatives politely: «We’d be happy to accept net 60 with a 30% deposit» or «Could we agree net 30 for the first project?». And if delays would hurt you: tie payments to milestones, not the end of the project.'),
          '"Thanks for the draft. On payment terms, net 90 is quite long for a small studio like ours. Would you be open to net 45, or net 60 with a 30% deposit on signing? That would let us start immediately."')
      ],
      practice: [
        B('اكتب بند payment terms بـ 3 دفعات.', 'Write a payment-terms clause with 3 instalments.'),
        B('اكتب بند termination بنوعيه.', 'Write a termination clause with both types.'),
        B('اكتب رد مهذب على طلب net 90.', 'Write a polite reply to a net-90 request.'),
        B('ترجم بند دفع من عقد عربي لإنجليزي واضح.', 'Translate a payment clause from an Arabic contract into clear English.')
      ],
      words: [
        W('payment terms', 'شروط الدفع', 'when and how payment is made', 'Our payment terms are net 30.'),
        W('deposit', 'دفعة مقدمة', 'an advance payment', 'A 40% deposit is due on signing.'),
        W('net 30', 'الدفع خلال 30 يوم من الفاتورة', 'payment within 30 days of the invoice', 'Invoices are payable net 30.'),
        W('late fee', 'رسوم التأخير', 'a charge for paying late', 'A 2% late fee applies monthly.'),
        W('termination', 'إنهاء العقد', 'ending a contract', 'Termination needs 30 days’ notice.'),
        W('notice period', 'مدة الإخطار قبل الإنهاء', 'the warning time before ending', 'The notice period is 30 days.')
      ],
      read: [{ lib: 'Plain Language Guidelines', what: B('اقرا Use lists.', 'Read Use lists.') }],
      challenge: B('اكتب قسم «Fees, Payment and Termination» لعقدك بالإنجليزي البسيط، وإيميل تفاوض مهذب على مدة دفع أطول طلبها عميل.', 'Write the «Fees, Payment and Termination» section of your contract in plain English, and a polite negotiation email about a longer payment term requested by a client.'),
      quiz: [
        Q(B('net 30:', 'Net 30:'), ['pay within 30 days of the invoice', 'a 30% discount', '30 instalments'], 0, B('مدة.', 'A period.')),
        Q(B('إنهاء لسبب:', 'Termination for cause:'), ['after a material breach not remedied', 'any time without reason', 'never'], 0, B('مخالفة.', 'A breach.')),
        Q(B('رد على net 90:', 'Answering net 90:'), ['Would you be open to net 45?', 'No way.', 'Fine, net 180.'], 0, B('بديل مهذب.', 'A polite alternative.'))
      ] },

    { title: B('بنود المخاطر', 'Risk clauses'),
      goal: B('تفهم البنود اللي ممكن تكلّفك كتير.', 'Understand the clauses that could cost you a lot.'),
      learn: [
        L(B('المسؤولية والتعويض', 'Liability and indemnity'),
          B('**liability** = مسؤوليتك عن الأضرار. بند حد المسؤولية بيحطلها سقف (مثلًا الأتعاب في آخر 12 شهر) ويستبعد الخسائر غير المباشرة. **indemnify** = تعوّض الطرف التاني عن مطالبات من طرف تالت — بند خطير؛ اقراه كويس وخلّيه محدود ومتبادل. **ده مش استشارة قانونية**.', '**liability** = your responsibility for damage. A limitation clause caps it (e.g. the fees in the last 12 months) and excludes indirect losses. To **indemnify** = to compensate the other party for third-party claims — a dangerous clause; read it carefully and keep it limited and mutual. **This is not legal advice**.'),
          '"Each party’s total liability under this Agreement is limited to the fees paid in the 12 months before the claim. Neither party is liable for indirect or consequential losses, including lost profits."\n⚠ "The Provider shall indemnify the Client against any and all claims…" → ask for a cap and mutual wording, and a lawyer’s review.'),
        L(B('السرية والملكية', 'Confidentiality and ownership'),
          B('**confidentiality** = متكشفش معلومات الطرف التاني (وغالبًا بيكمل بعد العقد سنتين مثلًا). و**non-disclosure agreement** (NDA) عقد منفصل قبل ما تبدأوا تتكلموا في تفاصيل. و**intellectual property**: مين يملك اللي بنيته؟ الشائع: العميل يملك الـ workflows بتاعته، وانت بتحتفظ بالأدوات والقوالب العامة.', '**confidentiality** = do not reveal the other party’s information (often continuing two years after the contract). A **non-disclosure agreement** (NDA) is a separate contract signed before detailed talks. And **intellectual property**: who owns what you build? Common practice: the client owns their workflows, and you keep your general tools and templates.'),
          '"Intellectual property: On full payment, the Client owns the workflows and documents created specifically for the Client. The Provider keeps ownership of its pre-existing tools, templates and know-how, and grants the Client a licence to use them as part of the Deliverables."'),
        L(B('البنود الختامية', 'The boilerplate'),
          B('**force majeure** = ظروف قاهرة خارج سيطرة الطرفين (كوارث، انقطاعات كبيرة) بتعفي من الالتزام مؤقتًا. **governing law** = قانون أنهي بلد بيحكم العقد ومحاكم مين. و**notwithstanding** = «بالرغم من» — بيقدّم بند على بند تاني. البنود دي بيسموها boilerplate بس متتجاهلهاش.', '**force majeure** = extraordinary events beyond both parties’ control (disasters, major outages) that suspend obligations temporarily. **governing law** = which country’s law governs the contract and which courts. And **notwithstanding** = «despite» — it gives one clause priority over another. These are called boilerplate, but do not ignore them.'),
          '"Force majeure: Neither party is liable for delay caused by events beyond its reasonable control, such as natural disasters or widespread internet outages."\n"Governing law: This Agreement is governed by the laws of the Arab Republic of Egypt, and the courts of Cairo have exclusive jurisdiction."\n"Notwithstanding clause 7.1, the liability cap does not apply to breaches of confidentiality."')
      ],
      practice: [
        B('اشرح بند liability cap بكلامك.', 'Explain a liability-cap clause in your own words.'),
        B('اكتب بند IP بيحميك وبيحمي العميل.', 'Write an IP clause protecting you and the client.'),
        B('اقرا NDA نموذجي ولخّصه.', 'Read a sample NDA and summarise it.'),
        B('علّم 3 بنود محتاج فيها محامي.', 'Mark 3 clauses where you need a lawyer.')
      ],
      words: [
        W('liability', 'المسؤولية القانونية', 'legal responsibility', 'Liability is capped at 12 months of fees.'),
        W('indemnify', 'يعوّض عن مطالبات', 'to compensate for claims', 'Do not agree to indemnify without a cap.'),
        W('confidentiality', 'السرية', 'keeping information private', 'Confidentiality lasts two years after the contract.'),
        W('non-disclosure agreement', 'اتفاقية عدم إفصاح', 'an agreement not to share information', 'Sign a non-disclosure agreement first.'),
        W('intellectual property', 'الملكية الفكرية', 'ownership of creations and ideas', 'Who owns the intellectual property?'),
        W('force majeure', 'القوة القاهرة', 'events beyond anyone’s control', 'The outage counted as force majeure.'),
        W('governing law', 'القانون الحاكم للعقد', 'the law that governs a contract', 'The governing law is Egyptian law.'),
        W('notwithstanding', 'بالرغم من', 'despite', 'Notwithstanding clause 7, confidentiality survives.')
      ],
      read: [{ lib: 'Cambridge Dictionary', what: B('دوّر على indemnify وliability بأمثلة.', 'Look up indemnify and liability with examples.') }],
      challenge: B('اكتب «دليل قراءة عقد» صفحة لنفسك بالإنجليزي: 8 بنود خطر، معنى كل واحد ببساطة، إيه تطلب تعديله، وإمتى تروح لمحامي.', 'Write yourself a one-page «contract reading guide» in English: 8 risk clauses, each one’s meaning simply, what to ask to change, and when to see a lawyer.'),
      quiz: [
        Q(B('liability cap:', 'A liability cap:'), ['a maximum amount of responsibility', 'an unlimited promise', 'a discount'], 0, B('سقف.', 'A ceiling.')),
        Q(B('قبل ما تتكلم في تفاصيل سرية:', 'Before discussing confidential details:'), ['sign an NDA', 'send an invoice', 'nothing'], 0, B('سرية.', 'Confidentiality.')),
        Q(B('notwithstanding:', 'Notwithstanding:'), ['despite', 'because', 'therefore'], 0, B('بالرغم.', 'Despite.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('عقد ونطاق عمل بالإنجليزي من غير خوف.', 'A contract and scope of work in English without fear.'),
      review: [
        B('هيكل العقد والأطراف والتعريفات وplain English وredlines.', 'Contract structure, parties, definitions, plain English and redlines.'),
        B('shall وmust (التزام) وmay (حق) والكلام الغامض.', 'shall and must (obligation), may (right) and vague wording.'),
        B('النطاق: acceptance criteria وassumptions وchange requests وwarranty.', 'Scope: acceptance criteria, assumptions, change requests and warranty.'),
        B('الدفع (deposit وnet 30 وlate fee) والإنهاء والـ notice.', 'Payment (deposit, net 30, late fee), termination and notice.'),
        B('المسؤولية والتعويض والسرية والملكية والقوة القاهرة والقانون الحاكم.', 'Liability, indemnity, confidentiality, ownership, force majeure and governing law.')
      ],
      project: B('اكتب «باكدج تعاقد» بالإنجليزي لخدمتك: قالب SOW صفحتين (مخرجات، قبول، افتراضات، تغييرات، ضمان، دفع، إنهاء)، ملخص plain-English لعقد إطاري نموذجي، إيميل redline بـ 3 تعديلات، ودليل بنود المخاطر — مع ملاحظة إن المراجعة النهائية لمحامي.', 'Write an English «contracting pack» for your service: a two-page SOW template (deliverables, acceptance, assumptions, changes, warranty, payment, termination), a plain-English summary of a sample framework contract, a redline email with 3 changes, and a risk-clauses guide — noting that final review is by a lawyer.'),
      test: [
        Q(B('signatory:', 'A signatory:'), ['the person authorised to sign', 'a signature font', 'a witness only'], 0, B('توقيع.', 'Signing.')),
        Q(B('plain English:', 'Plain English:'), ['short, clear sentences', 'old legal words', 'Latin phrases'], 0, B('وضوح.', 'Clarity.')),
        Q(B('«The Client may request revisions»:', '«The Client may request revisions»:'), ['the Client is allowed to', 'the Client must', 'the Client cannot'], 0, B('حق.', 'A right.')),
        Q(B('أوضح بند:', 'The clearest clause:'), ['The Provider must reply within 4 business hours.', 'The Provider will reply soon.', 'Reasonable support is provided.'], 0, B('رقم.', 'A number.')),
        Q(B('in writing:', 'In writing:'), ['written, e.g. by email if agreed', 'spoken', 'optional'], 0, B('مكتوب.', 'Written.')),
        Q(B('acceptance criteria:', 'Acceptance criteria:'), ['an agreed, measurable test of done', 'a payment date', 'a logo'], 0, B('قبول.', 'Acceptance.')),
        Q(B('assumption اتكسر:', 'A broken assumption:'), ['fees or timeline may change by agreement', 'the contract is void', 'nothing happens'], 0, B('تعديل.', 'Adjustment.')),
        Q(B('deposit:', 'A deposit:'), ['an advance payment before work', 'a late fee', 'a refund'], 0, B('مقدم.', 'Advance.')),
        Q(B('notice period:', 'A notice period:'), ['the warning time before ending', 'a holiday', 'a payment'], 0, B('إخطار.', 'Notice.')),
        Q(B('indemnify:', 'To indemnify:'), ['to compensate for claims', 'to sign', 'to cancel'], 0, B('تعويض.', 'Compensation.')),
        Q(B('IP عادةً:', 'IP usually:'), ['the client owns their workflows; you keep general tools', 'you own everything', 'nobody owns it'], 0, B('توازن.', 'Balance.')),
        Q(B('force majeure:', 'Force majeure:'), ['events beyond both parties’ control', 'a big payment', 'a deadline'], 0, B('قاهرة.', 'Extraordinary.'))
      ] }
  ]
};
