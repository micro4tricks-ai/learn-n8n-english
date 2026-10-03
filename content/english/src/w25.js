// English week 25 — Reading specifications and RFCs.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2',
  title: B('قراءة المواصفات والـ RFCs', 'Reading specifications and RFCs'),
  goal: B('تقرا مواصفة تقنية رسمية (RFC أو spec لـ API) وتفهمها بدقة: كلمات الإلزام، وشكل المستند، والجمل الطويلة المعقدة، والمفردات الرسمية، وتطلع منها ملخص صحيح.',
          'Read an official technical specification (an RFC or an API spec) and understand it precisely: the words of obligation, the document’s structure, long complex sentences and formal vocabulary — and produce a correct summary of it.'),
  days: [
    { title: B('كلمات الإلزام: MUST وSHOULD وMAY', 'Words of obligation: MUST, SHOULD and MAY'),
      goal: B('تفهم الفرق الدقيق بين كلمات الإلزام في أي مواصفة.', 'Understand the exact difference between the obligation words in any specification.'),
      learn: [
        L(B('RFC 2119', 'RFC 2119'),
          B('أغلب المواصفات بتقول «الكلمات MUST وSHOULD وMAY زي ما في RFC 2119». يعني: **MUST** (أو REQUIRED، SHALL) إلزام مطلق. **MUST NOT** ممنوع تمامًا. **SHOULD** (RECOMMENDED) لازم إلا لو عندك سبب قوي ومفهوم. **MAY** (OPTIONAL) براحتك.', 'Most specs say «the key words MUST, SHOULD and MAY are to be interpreted as in RFC 2119». That means: **MUST** (or REQUIRED, SHALL) is an absolute requirement. **MUST NOT** is an absolute ban. **SHOULD** (RECOMMENDED) is required unless you have a strong, understood reason. **MAY** (OPTIONAL) is your choice.'),
          'A client MUST send a Host header.\nA server SHOULD send a Date header.\nA client MAY include a User-Agent header.'),
        L(B('مكتوبة كبيرة ولا صغيرة', 'Capitals or not'),
          B('في المواصفات الحديثة (RFC 8174) الكلمات ليها المعنى ده **بس لما تتكتب بحروف كبيرة**. «you should read section 3» بحروف صغيرة = نصيحة عادية، مش متطلب. خد بالك من الفرق ده وانت بتقرا.', 'In modern specs (RFC 8174) these words carry that meaning **only when written in capitals**. «you should read section 3» in lower case is ordinary advice, not a requirement. Watch for this difference while reading.'),
          '"The server MUST reject the request."      → requirement\n"You must be careful with caching."         → normal English advice'),
        L(B('اكتبها انت كمان', 'Use them yourself'),
          B('لما تكتب توثيق API أو قواعد لفريق، استخدم نفس الكلمات بنفس المعنى: «The webhook MUST respond within 5 seconds. Clients SHOULD retry with backoff.» ده بيمنع الخلاف «أنا فهمت إنها اختيارية».', 'When you write API docs or team rules, use the same words with the same meaning: «The webhook MUST respond within 5 seconds. Clients SHOULD retry with backoff.» This prevents the «I thought it was optional» argument.'),
          'Requests MUST include an Idempotency-Key header.\nClients SHOULD cache tokens until they expire.\nClients MAY request up to 100 items per page.')
      ],
      practice: [
        B('افتح RFC 2119 (صفحة واحدة) واكتب تعريف كل كلمة بكلامك.', 'Open RFC 2119 (one page) and write each word’s definition in your own words.'),
        B('دوّر على 10 جمل فيها MUST أو SHOULD في توثيق API تستخدمه.', 'Find 10 sentences with MUST or SHOULD in the docs of an API you use.'),
        B('صنّف الجمل: إلزام، توصية، اختيار.', 'Classify the sentences: requirement, recommendation, option.'),
        B('اكتب 6 قواعد لـ webhook بتاعك بالكلمات دي.', 'Write 6 rules for your webhook using these words.')
      ],
      words: [
        W('rfc', 'مستند رسمي بيحدد معيار من معايير الإنترنت', 'an official document defining an internet standard', 'HTTP is described in an RFC.'),
        W('specification', 'وصف رسمي دقيق لإزاي حاجة لازم تشتغل', 'a precise official description of how something must work', 'Read the specification before you build the client.'),
        W('normative', 'جزء ملزم في المواصفة', 'a binding part of a specification', 'Only normative sections contain requirements.'),
        W('conformance', 'الالتزام بمتطلبات المواصفة', 'following a specification’s requirements', 'Conformance tests check every MUST.'),
        W('recommended', 'مُوصى بيه (SHOULD)', 'advised; the SHOULD level', 'Compression is recommended but not required.')
      ],
      read: ['lib:RFC 2119 (MUST, SHOULD, MAY)', { t: 'RFC 8174: Ambiguity of uppercase vs lowercase', url: 'https://datatracker.ietf.org/doc/html/rfc8174', what: B('اقرا الملخص بس (صفحة).', 'Read only the summary (one page).') }],
      challenge: B('اكتب «مواصفة» قصيرة (نص صفحة) لـ webhook بتستقبله: المدخلات، والردود، والأخطاء، بكلمات MUST/SHOULD/MAY صح، وخلّي حد يقراها ويقولك فهم إيه إلزامي.', 'Write a short «spec» (half a page) for a webhook you receive: inputs, replies and errors, using MUST/SHOULD/MAY correctly; have someone read it and tell you what they understood as required.'),
      quiz: [
        Q(B('«The client SHOULD retry» معناها:', '«The client SHOULD retry» means:'), ['retry unless there is a good reason not to', 'retrying is forbidden', 'retrying is completely optional'], 0, B('توصية قوية.', 'A strong recommendation.')),
        Q(B('MAY بتعني:', 'MAY means:'), ['optional', 'required', 'forbidden'], 0, B('براحتك.', 'Your choice.')),
        Q(B('«you must restart» بحروف صغيرة في مواصفة حديثة:', 'Lower-case «you must restart» in a modern spec is:'), ['ordinary English, not an RFC 2119 requirement', 'an absolute requirement', 'a ban'], 0, B('RFC 8174.', 'RFC 8174.'))
      ] },

    { title: B('شكل المواصفة', 'The structure of a specification'),
      goal: B('تعرف تتنقّل في مستند طويل وتلاقي اللي محتاجه بسرعة.', 'Navigate a long document and find what you need quickly.'),
      learn: [
        L(B('الأجزاء الثابتة', 'The fixed parts'),
          B('أغلب المواصفات: **Abstract** (ملخص فقرة)، Status، Introduction، **Terminology** (تعريفات — اقراها الأول!)، الأقسام الأساسية، Security Considerations، IANA Considerations، References (normative وinformative)، وAppendices. الأرقام زي `Section 9.3.1` بتسهّل الإشارة.', 'Most specs have: an **Abstract** (a one-paragraph summary), Status, Introduction, **Terminology** (definitions — read it first!), the main sections, Security Considerations, IANA Considerations, References (normative and informative) and Appendices. Numbers like `Section 9.3.1` make referencing easy.'),
          '1. Introduction\n2. Terminology\n3. … main sections …\n9. Security Considerations\n10. References  (10.1 Normative · 10.2 Informative)'),
        L(B('ملزم ومعلوماتي', 'Normative and informative'),
          B('الأجزاء **normative** فيها المتطلبات. الأجزاء **informative** (أمثلة، ملاحظات، ملاحق كتير) للشرح بس. لو مثال تعارض مع نص ملزم، النص الملزم هو اللي يكسب. ودوّر على **errata** (أخطاء اتصلحت بعد النشر).', '**Normative** parts contain the requirements. **Informative** parts (examples, notes, many appendices) only explain. If an example conflicts with normative text, the normative text wins. And look for **errata** (mistakes corrected after publication).'),
          '"This section is non-normative." → explanation only\n"Note: …" → informative'),
        L(B('مستند قديم ولا جديد', 'Old or new document'),
          B('المواصفات بتتحدث: RFC جديد ممكن **obsolete** (يلغي) واحد قديم أو **update** (يعدّل) عليه. قبل ما تعتمد على RFC، شوف في أوله «Obsoletes:» و«Updated by:». مثال: HTTP/1.1 كان RFC 2616 وبقى دلوقتي RFC 9110 وRFC 9112.', 'Specs change: a new RFC may **obsolete** an old one or **update** it. Before relying on an RFC, check «Obsoletes:» and «Updated by:» at its top. Example: HTTP/1.1 was RFC 2616 and is now RFC 9110 and RFC 9112.'),
          'RFC 9110 — HTTP Semantics\nObsoletes: 2818, 7230, 7231, 7232, 7233, 7235, 7538, 7615, 7694')
      ],
      practice: [
        B('افتح RFC 9110 واكتب عناوين الأقسام الأساسية.', 'Open RFC 9110 and write down the main section titles.'),
        B('اقرا جزء Terminology وطلّع 10 تعريفات.', 'Read the Terminology part and extract 10 definitions.'),
        B('علّم 3 أجزاء informative في القسم اللي بتقراه.', 'Mark 3 informative parts in the section you are reading.'),
        B('دوّر على RFC قديم واعرف مين ألغاه.', 'Find an old RFC and discover which RFC obsoleted it.')
      ],
      words: [
        W('abstract', 'ملخص قصير في أول المستند', 'a short summary at the start of a document', 'Read the abstract to decide if the RFC is relevant.'),
        W('terminology', 'قسم المصطلحات وتعريفاتها', 'the section defining the terms', 'Always read the terminology section first.'),
        W('informative', 'للشرح بس ومش ملزم', 'for explanation only, not binding', 'The examples are informative.'),
        W('errata', 'أخطاء اتصلحت بعد نشر المستند', 'mistakes corrected after a document was published', 'Check the errata before quoting the spec.'),
        W('obsolete', 'يلغي مستند قديم ويحل محله (أو: قديم وملغي)', 'to replace an older document (or: replaced and out of date)', 'RFC 9110 obsoletes RFC 7231.')
      ],
      read: [{ t: 'RFC 9110: HTTP Semantics', url: 'https://datatracker.ietf.org/doc/html/rfc9110', what: B('اقرا الفهرس والـ Abstract والقسم 2.', 'Read the contents, the abstract and section 2.') }],
      challenge: B('اعمل «خريطة» لـ RFC 9110 في صفحة: الأقسام الأساسية، 15 مصطلح من Terminology، وأقسام informative، والـ RFCs اللي ألغاها.', 'Make a one-page «map» of RFC 9110: the main sections, 15 terms from Terminology, the informative parts, and the RFCs it obsoletes.'),
      quiz: [
        Q(B('أول قسم تقراه بعد الـ Abstract:', 'The first section to read after the abstract:'), ['Terminology', 'Appendices', 'References'], 0, B('التعريفات أساس الفهم.', 'Definitions are the basis.')),
        Q(B('مثال اتعارض مع نص normative:', 'An example conflicts with normative text:'), ['the normative text wins', 'the example wins', 'both are wrong'], 0, B('المثال informative.', 'Examples are informative.')),
        Q(B('«Obsoletes: 7231» معناها:', '«Obsoletes: 7231» means:'), ['this RFC replaces RFC 7231', 'RFC 7231 replaces this one', 'they are the same'], 0, B('الجديد بيلغي القديم.', 'The new one replaces the old.'))
      ] },

    { title: B('فك الجمل الطويلة', 'Unpacking long sentences'),
      goal: B('تفهم جملة من 50 كلمة من غير ما تتوه.', 'Understand a 50-word sentence without getting lost.'),
      learn: [
        L(B('دوّر على الفعل الأساسي', 'Find the main verb'),
          B('الجملة الطويلة فيها جملة أساسية (فاعل + فعل) وحواليها إضافات. اسأل: مين بيعمل إيه؟ شيل اللي بين فاصلتين أو أقواس الأول، واللي بعد which/that/when. هتلاقي الهيكل: «A server … MUST respond …».', 'A long sentence has a main clause (subject + verb) with additions around it. Ask: who does what? First remove what is between commas or brackets, and what follows which/that/when. You will find the skeleton: «A server … MUST respond …».'),
          'A server that receives a request with a method it does not recognise,\n(which may happen with newer clients), SHOULD respond with 501.\nskeleton: A server … SHOULD respond with 501.'),
        L(B('كلمات الشرط', 'Condition words'),
          B('المواصفات مليانة شروط: `if`، `unless` (= if not)، `provided that` (= بشرط)، `in which case` (= وفي الحالة دي)، `otherwise`، `only if`، `except when`. كل واحدة بتغيّر مين يعمل إيه — اقراها ببطء.', 'Specs are full of conditions: `if`, `unless` (= if not), `provided that` (= on condition that), `in which case`, `otherwise`, `only if`, `except when`. Each changes who does what — read them slowly.'),
          'The cache MAY reuse the response unless it is stale,\nin which case it MUST revalidate it first.'),
        L(B('اكتبها خطوات', 'Turn it into steps'),
          B('أحسن طريقة تتأكد إنك فهمت: حوّل الجملة لخطوات أو IF/ELSE. لو مقدرتش، فيه جزء مفهمتوش. ده كمان بيساعدك تحوّل المواصفة لكود صح.', 'The best way to check you understood: turn the sentence into steps or IF/ELSE. If you cannot, some part is unclear. This also helps you turn the spec into correct code.'),
          'IF response is stale → MUST revalidate before reuse\nELSE → MAY reuse')
      ],
      practice: [
        B('خد 5 جمل طويلة من RFC 9110 وطلّع الهيكل الأساسي لكل واحدة.', 'Take 5 long sentences from RFC 9110 and find each one’s skeleton.'),
        B('حوّل 3 جمل فيها unless/provided that لـ IF/ELSE.', 'Turn 3 sentences with unless/provided that into IF/ELSE.'),
        B('اكتب جملة طويلة انت (40 كلمة) وفكّها لجمل قصيرة.', 'Write a long sentence yourself (40 words) and break it into short ones.'),
        B('اقرا الجمل بصوت عالي مع وقفة عند كل فاصلة.', 'Read the sentences aloud, pausing at each comma.')
      ],
      words: [
        W('main clause', 'الجملة الأساسية اللي ممكن تقف لوحدها', 'the core sentence that can stand alone', 'Find the main clause first.'),
        W('provided that', 'بشرط إن', 'on condition that', 'You may cache it, provided that it is fresh.'),
        W('unless', 'إلا لو / لو مش', 'except if; if not', 'Retry unless the error is permanent.'),
        W('in which case', 'وفي الحالة دي', 'and if that happens', 'It may expire, in which case you must refresh it.'),
        W('parenthetical', 'إضافة جانبية بين أقواس أو فواصل', 'a side remark between brackets or commas', 'Skip the parenthetical on the first read.')
      ],
      read: ['lib:Purdue OWL', { lib: 'Plain Language Guidelines', what: B('شوف إزاي الجمل الطويلة بتتقسم.', 'See how long sentences are split.') }],
      challenge: B('اختار فقرة صعبة من RFC 9110 (أو توثيق OAuth) واكتبها من جديد بجمل قصيرة وخطوات IF/ELSE من غير ما يضيع معنى.', 'Pick a hard paragraph from RFC 9110 (or OAuth docs) and rewrite it in short sentences and IF/ELSE steps without losing meaning.'),
      quiz: [
        Q(B('«Retry unless the error is permanent» معناها:', '«Retry unless the error is permanent» means:'), ['retry if the error is not permanent', 'retry only permanent errors', 'never retry'], 0, B('unless = if not.', 'unless = if not.')),
        Q(B('أول خطوة لفهم جملة طويلة:', 'The first step to understand a long sentence:'), ['find the subject and main verb', 'translate every word', 'read only the last word'], 0, B('الهيكل.', 'The skeleton.')),
        Q(B('«provided that» قريبة من:', '«provided that» is close to:'), ['on condition that', 'because', 'although'], 0, B('شرط.', 'A condition.'))
      ] },

    { title: B('المفردات الرسمية', 'Formal vocabulary'),
      goal: B('تفهم الكلمات الرسمية اللي بتتكرر في المواصفات والعقود التقنية.', 'Understand the formal words that repeat in specs and technical agreements.'),
      learn: [
        L(B('الإشارة', 'Referring back'),
          B('`respectively` (بالترتيب): «A and B return 200 and 404 respectively» = A يرجّع 200 وB يرجّع 404. `the former / the latter` = الأول / التاني من اتنين اتذكروا. `thereof` = منه/بتاعه. `the aforementioned` = المذكور قبل كده.', '`respectively` (in that order): «A and B return 200 and 404 respectively» = A returns 200 and B returns 404. `the former / the latter` = the first / the second of two just mentioned. `thereof` = of it. `the aforementioned` = mentioned earlier.'),
          'GET and HEAD are safe; the former returns a body, the latter does not.'),
        L(B('اختصارات لاتيني', 'Latin abbreviations'),
          B('`i.e.` = يعني (توضيح نفس الحاجة). `e.g.` = مثلًا (مثال من أمثلة). `etc.` = إلى آخره. `cf.` = قارن بـ. `vs.` = مقابل. غلطة شائعة: استخدام i.e. مكان e.g. — «browsers, i.e. Chrome» معناها Chrome بس!', '`i.e.` = that is (restating the same thing). `e.g.` = for example (one of several). `etc.` = and so on. `cf.` = compare. `vs.` = versus. A common mistake: using i.e. for e.g. — «browsers, i.e. Chrome» means only Chrome!'),
          'Use a safe method, e.g. GET or HEAD.\nUse the default port, i.e. 443.'),
        L(B('كلمات العلاقة', 'Relationship words'),
          B('`whereby` (اللي بيه / اللي عن طريقه)، `subject to` (خاضع لـ)، `notwithstanding` (بالرغم من)، `as follows` (كالآتي)، `hereinafter` (من هنا ورايح). مش لازم تكتبهم كتير، بس لازم تفهمهم لما تقراهم.', '`whereby` (by which), `subject to` (depending on / limited by), `notwithstanding` (despite), `as follows` (like this:), `hereinafter` (from now on in this document). You need not write them often, but you must understand them when you read them.'),
          'A mechanism whereby clients prove their identity.\nAccess is subject to the rate limits in Section 5.')
      ],
      practice: [
        B('اعمل بطاقات لـ 12 كلمة رسمية بمثال تقني لكل واحدة.', 'Make cards for 12 formal words with a technical example each.'),
        B('صلّح 5 جمل فيها i.e. مكان e.g.', 'Fix 5 sentences using i.e. instead of e.g.'),
        B('اكتب 3 جمل بـ respectively.', 'Write 3 sentences with respectively.'),
        B('دوّر على 5 كلمات رسمية في شروط خدمة API واشرحها.', 'Find 5 formal words in an API’s terms of service and explain them.')
      ],
      words: [
        W('respectively', 'بالترتيب المذكور', 'in the order just given', 'They return 200 and 404 respectively.'),
        W('the former', 'الأول من اتنين اتذكروا', 'the first of two things mentioned', 'The former is faster.'),
        W('the latter', 'التاني من اتنين اتذكروا', 'the second of two things mentioned', 'The latter is easier to read.'),
        W('whereby', 'اللي عن طريقه / بيه', 'by which', 'A process whereby tokens are renewed.'),
        W('subject to', 'خاضع لـ / مقيّد بـ', 'depending on or limited by', 'Usage is subject to the fair-use policy.')
      ],
      read: ['lib:Merriam-Webster', { lib: 'Purdue OWL', what: B('دوّر على «i.e. vs e.g.».', 'Search for «i.e. vs e.g.».') }],
      challenge: B('اقرا شروط استخدام API مشهور (جزء واحد) واعمل قاموس صغير بـ 15 كلمة رسمية، وأعد كتابة الجزء بإنجليزي بسيط.', 'Read one part of a well-known API’s terms of use, build a small glossary of 15 formal words, and rewrite that part in plain English.'),
      quiz: [
        Q(B('«A and B cost $5 and $9 respectively»:', '«A and B cost $5 and $9 respectively»:'), ['A costs $5, B costs $9', 'both cost $14', 'A costs $9'], 0, B('بالترتيب.', 'In order.')),
        Q(B('الصح:', 'Correct:'), ['Use a tool, e.g. curl or Postman.', 'Use a tool, i.e. curl or Postman.', 'Use a tool, cf. curl.'], 0, B('e.g. = مثال.', 'e.g. = for example.')),
        Q(B('«subject to approval» معناها:', '«subject to approval» means:'), ['it depends on approval', 'it is already approved', 'it is the topic of approval'], 0, B('خاضع لـ.', 'Depending on.'))
      ] },

    { title: B('من المواصفة لملخص', 'From a spec to a summary'),
      goal: B('تطلّع من قسم مواصفة ملخص دقيق تستخدمه في الشغل.', 'Turn a spec section into an accurate summary you can use at work.'),
      learn: [
        L(B('ملخص بالمتطلبات', 'A summary of requirements'),
          B('الملخص الكويس لقسم مواصفة: سطر بيقول القسم عن إيه، وقايمة **MUST** (مرقّمة)، وقايمة **SHOULD**، واختياري **MAY**، وحالات الأطراف والأخطاء، ورقم القسم لكل نقطة عشان أي حد يراجع.', 'A good summary of a spec section: one line saying what it covers, a numbered list of **MUSTs**, a list of **SHOULDs**, optionally **MAYs**, edge cases and errors, and the section number for each point so anyone can check.'),
          'Section 9.3.1 GET\nMUST: … (9.3.1 ¶2)\nSHOULD: …\nErrors: 405 if not allowed (15.5.6)'),
        L(B('مسرد مصطلحات', 'A glossary'),
          B('اعمل **glossary** للمشروع من مصطلحات المواصفة: المصطلح، تعريف بإنجليزي بسيط، وترجمة عربي لو مفيدة، ومثال. الفريق كله يستخدم نفس الكلمات بنفس المعنى.', 'Build a project **glossary** from the spec’s terms: the term, a plain-English definition, an Arabic translation if useful, and an example. The whole team then uses the same words with the same meaning.'),
          'idempotent — repeating the request has the same effect as sending it once (e.g. PUT, DELETE)'),
        L(B('اسأل لما المواصفة غامضة', 'Ask when the spec is unclear'),
          B('أحيانًا المواصفة نفسها مش واضحة أو بتسكت عن حالة. متخمّنش: اكتب السؤال بدقة واقتبس الجملة: «Section 4.2 says X but does not cover Y. Should the client do A or B?». ده الأسلوب المحترم في الـ issues والمنتديات.', 'Sometimes the spec itself is unclear or silent about a case. Do not guess: write the question precisely and quote the sentence: «Section 4.2 says X but does not cover Y. Should the client do A or B?». That is the respected style for issues and forums.'),
          '"Section 4.2 states that tokens MUST be refreshed before expiry,\n but it does not say what happens if the refresh fails. Should the client retry or re-authenticate?"')
      ],
      practice: [
        B('لخّص قسم واحد من RFC 9110 بالشكل ده.', 'Summarise one section of RFC 9110 in this format.'),
        B('اعمل glossary بـ 20 مصطلح لمشروعك.', 'Build a 20-term glossary for your project.'),
        B('اكتب سؤال دقيق عن حالة مش واضحة في توثيق API.', 'Write a precise question about an unclear case in an API’s docs.'),
        B('قارن ملخصك بملخص AI وصحّح الاختلافات.', 'Compare your summary with an AI’s and fix the differences.')
      ],
      words: [
        W('mandatory', 'إجباري ولازم يتعمل', 'required; it must be done', 'Authentication is mandatory for every endpoint.'),
        W('glossary', 'قايمة مصطلحات بتعريفاتها', 'a list of terms with their definitions', 'Add the term to the project glossary.'),
        W('interoperability', 'قدرة أنظمة مختلفة تشتغل مع بعض', 'the ability of different systems to work together', 'Specs exist for interoperability.'),
        W('implementation', 'تطبيق المواصفة في كود حقيقي', 'turning a spec into real code', 'Our implementation follows RFC 9110.'),
        W('ambiguous wording', 'صياغة ممكن تتفهم بأكتر من طريقة', 'phrasing that can be read in more than one way', 'Quote the ambiguous wording in your question.')
      ],
      read: [{ t: 'RFC 9110 — Section 9: Methods', url: 'https://datatracker.ietf.org/doc/html/rfc9110#section-9', what: B('لخّص GET وPOST من القسم ده.', 'Summarise GET and POST from this section.') }],
      challenge: B('اكتب «ورقة متطلبات» لجزء من مواصفة تحتاجه في شغلك (HTTP، OAuth، webhook لخدمة): MUST/SHOULD/MAY بأرقام الأقسام، glossary، وسؤالين عن الغموض.', 'Write a «requirements sheet» for part of a spec you need at work (HTTP, OAuth, a service’s webhook): MUST/SHOULD/MAY with section numbers, a glossary, and two questions about unclear points.'),
      quiz: [
        Q(B('ملخص المواصفة لازم فيه:', 'A spec summary must include:'), ['section numbers for each point', 'only your opinion', 'no requirements'], 0, B('للمراجعة.', 'For checking.')),
        Q(B('المواصفة ساكتة عن حالة:', 'The spec is silent about a case:'), ['ask a precise question quoting the text', 'guess', 'ignore the case'], 0, B('متخمّنش.', 'Do not guess.')),
        Q(B('glossary بيساعد في:', 'A glossary helps:'), ['the team use words the same way', 'make the code faster', 'hide errors'], 0, B('معنى واحد.', 'One meaning.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تقرا مواصفة كاملة وتطلع منها مستند شغل.', 'Read a full spec and turn it into a working document.'),
      review: [
        B('MUST وSHOULD وMAY بمعانيهم الدقيقة (RFC 2119 وRFC 8174).', 'MUST, SHOULD and MAY with their exact meanings (RFC 2119 and RFC 8174).'),
        B('شكل المواصفة: Abstract وTerminology وnormative/informative وerrata وobsolete.', 'Spec structure: abstract, terminology, normative/informative, errata and obsolete.'),
        B('فك الجمل الطويلة: الهيكل وكلمات الشرط وIF/ELSE.', 'Unpacking long sentences: the skeleton, condition words and IF/ELSE.'),
        B('المفردات الرسمية: respectively والformer/latter وi.e./e.g. وsubject to.', 'Formal vocabulary: respectively, the former/latter, i.e./e.g. and subject to.'),
        B('الملخص بالمتطلبات والـ glossary والسؤال الدقيق.', 'The requirements summary, the glossary and the precise question.')
      ],
      project: B('اختار مواصفة حقيقية تستخدمها (جزء من HTTP، أو webhooks لخدمة دفع، أو OAuth): اقرا 5–8 صفحات، واكتب ورقة متطلبات (MUST/SHOULD/MAY بأرقام الأقسام)، وglossary بـ 20 مصطلح، و3 أسئلة غموض بصياغة احترافية، وملخص صوتي دقيقتين بالإنجليزي.', 'Choose a real spec you use (part of HTTP, a payment service’s webhooks, or OAuth): read 5–8 pages, write a requirements sheet (MUST/SHOULD/MAY with section numbers), a 20-term glossary, 3 professionally worded questions about unclear points, and a two-minute spoken summary in English.'),
      test: [
        Q(B('MUST NOT معناها:', 'MUST NOT means:'), ['an absolute ban', 'a recommendation', 'optional'], 0, B('ممنوع تمامًا.', 'Completely forbidden.')),
        Q(B('SHOULD:', 'SHOULD:'), ['required unless there is a strong reason', 'forbidden', 'meaningless'], 0, B('توصية قوية.', 'A strong recommendation.')),
        Q(B('REQUIRED زي:', 'REQUIRED is the same as:'), ['MUST', 'MAY', 'SHOULD NOT'], 0, B('إلزام.', 'An obligation.')),
        Q(B('الجزء informative:', 'An informative part:'), ['explains but does not require', 'contains the requirements', 'is always wrong'], 0, B('للشرح.', 'For explanation.')),
        Q(B('errata:', 'Errata are:'), ['corrections after publication', 'the abstract', 'examples'], 0, B('أخطاء اتصلحت.', 'Fixed mistakes.')),
        Q(B('«RFC 9110 obsoletes RFC 7231»:', '«RFC 9110 obsoletes RFC 7231»:'), ['use RFC 9110', 'use RFC 7231', 'use both equally'], 0, B('الجديد.', 'The new one.')),
        Q(B('«in which case» تيجي بعد:', '«in which case» follows:'), ['a possible situation', 'a list of names', 'a number'], 0, B('وفي الحالة دي.', 'And if that happens.')),
        Q(B('«unless the token expired»:', '«unless the token expired»:'), ['if the token has not expired', 'only if it expired', 'always'], 0, B('unless = if not.', 'unless = if not.')),
        Q(B('«the latter» بيشير لـ:', '«the latter» refers to:'), ['the second of two items', 'the first of two items', 'the last section'], 0, B('التاني.', 'The second.')),
        Q(B('الصح:', 'Correct:'), ['the default port, i.e. 443', 'the default port, e.g. 443 only', 'the default port, cf. 443'], 0, B('i.e. = يعني نفس الحاجة.', 'i.e. restates the same thing.')),
        Q(B('ملخص المتطلبات يتنظم:', 'A requirements summary is organised by:'), ['MUST, SHOULD, MAY with section numbers', 'random order', 'word count'], 0, B('بمستوى الإلزام.', 'By level of obligation.')),
        Q(B('سؤال كويس عن الغموض:', 'A good question about unclear text:'), ['quotes the section and asks between clear options', '«It doesn’t work, help»', 'no question at all'], 0, B('دقيق.', 'Precise.'))
      ] }
  ]
};
