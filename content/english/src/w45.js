// English week 45 — Writing for executives.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C2',
  title: B('الكتابة للمديرين التنفيذيين', 'Writing for executives'),
  goal: B('تكتب لمدير تنفيذي معندوش غير دقيقتين: الخلاصة في الأول، رسالة واحدة واضحة، قضية بيزنس بالأرقام، مذكرة قرار باختيارات وتوصية، وتحديث ربع سنوي يتقري في نظرة — بإنجليزي مستوى C2.',
          'Write for an executive who has two minutes: the bottom line first, one clear message, a business case in numbers, a decision memo with options and a recommendation, and a quarterly update readable at a glance — in C2-level English.'),
  days: [
    { title: B('عقلية المدير التنفيذي', 'The executive mindset'),
      goal: B('تفهم المدير التنفيذي بيقرا إزاي وليه.', 'Understand how and why executives read.'),
      learn: [
        L(B('الخلاصة في الأول', 'Bottom line up front'),
          B('**BLUF** (bottom line up front) = أول جملة فيها الخلاصة أو الطلب. المديرين **time-poor** (وقتهم ضيق جدًا) وبيقروا أول سطرين بس غالبًا. القصة والتفاصيل بعدين لمن يحب. اسأل نفسك: لو قرا سطر واحد، هيعرف المطلوب؟', '**BLUF** (bottom line up front) = the first sentence contains the conclusion or the request. Executives are **time-poor** and often read only the first two lines. The story and details come later for anyone who wants them. Ask yourself: if they read one line, will they know what is needed?'),
          '✗ "Over the past three months, our team has been looking at different ways to handle invoices, and after many meetings…"\n✓ "I recommend we automate invoice processing for USD 18,000; it will save USD 60,000 a year and needs your approval by 20 October."'),
        L(B('وإيه يعني؟', 'So what?'),
          B('كل معلومة لازم تعدّي اختبار **so what** (وإيه يعني؟): «Response time dropped to 2 hours» ← so what? ← «so we can handle Ramadan peaks without hiring». المدير مهتم بالأثر: فلوس، مخاطر، عملاء، وقت، استراتيجية.', 'Every fact must pass the **so what** test: «Response time dropped to 2 hours» → so what? → «so we can handle Ramadan peaks without hiring». Executives care about impact: money, risk, customers, time, strategy.'),
          'fact:     The new workflow processes 500 orders a minute.\nso what?: We can run the Black Friday sale without extra staff, protecting about USD 40,000 in revenue.'),
        L(B('جاهز للقرار', 'Decision-ready'),
          B('المستند **decision-ready** = فيه كل اللي المدير محتاجه عشان يقرر من غير اجتماع: الطلب، الاختيارات، التوصية، التكلفة، المخاطر، والميعاد. لو هيرد بسؤال، المستند ناقص. ورسالة واحدة: **key message** واحدة واضحة مش خمسة.', 'A **decision-ready** document contains everything an executive needs to decide without a meeting: the request, the options, the recommendation, the cost, the risks and the deadline. If they reply with a question, the document was incomplete. And one message: one clear **key message**, not five.'),
          'decision-ready checklist\n☐ the ask in the first line\n☐ the cost and the return\n☐ 2–3 options with a recommendation\n☐ the main risk and how we reduce it\n☐ the deadline for the decision\n☐ one key message')
      ],
      practice: [
        B('أعد كتابة 3 إيميلات بصيغة BLUF.', 'Rewrite 3 emails in BLUF form.'),
        B('طبّق «so what» على 5 حقايق من شغلك.', 'Apply «so what» to 5 facts from your work.'),
        B('اكتب key message لمشروعك في جملة.', 'Write your project’s key message in one sentence.'),
        B('راجع مستند بقايمة decision-ready.', 'Check a document against the decision-ready checklist.')
      ],
      words: [
        W('BLUF', 'الخلاصة في الأول', 'bottom line up front', 'Use BLUF in every executive email.'),
        W('time-poor', 'وقته ضيق جدًا', 'having very little time', 'Executives are time-poor.'),
        W('so what', 'وإيه يعني؟ (اختبار الأثر)', 'the test of why a fact matters', 'Every number needs a «so what».'),
        W('decision-ready', 'جاهز لاتخاذ قرار', 'containing everything needed to decide', 'Make the memo decision-ready.'),
        W('key message', 'الرسالة الأساسية', 'the one main point', 'What’s your key message?'),
        W('bottom line', 'الخلاصة', 'the essential conclusion', 'The bottom line: we save USD 60,000.')
      ],
      read: [{ lib: 'Plain Language Guidelines', what: B('دوّر على «put the main message first».', 'Search for «put the main message first».') }],
      challenge: B('خد أطول إيميل شغل كتبته بالإنجليزي وحوّله لإيميل تنفيذي: BLUF في السطر الأول، كل معلومة عدّت «so what»، وطوله تلت الأصلي.', 'Take the longest work email you wrote in English and turn it into an executive email: BLUF in the first line, every fact passing «so what», and a third of the original length.'),
      quiz: [
        Q(B('BLUF:', 'BLUF:'), ['the conclusion or request first', 'the background first', 'a long story'], 0, B('الخلاصة.', 'The bottom line.')),
        Q(B('«so what» لـ «Response time is 2 hours»:', '«So what» for «Response time is 2 hours»:'), ['so we handle peaks without hiring', 'so it is 2 hours', 'so we measured it'], 0, B('أثر.', 'Impact.')),
        Q(B('decision-ready:', 'Decision-ready:'), ['they can decide without a meeting', 'they need more meetings', 'it has no numbers'], 0, B('كامل.', 'Complete.'))
      ] },

    { title: B('الصفحة الواحدة', 'The one-pager'),
      goal: B('تبني أي فكرة في صفحة واحدة منطقية.', 'Build any idea into one logical page.'),
      learn: [
        L(B('مبدأ الهرم', 'The pyramid principle'),
          B('**pyramid principle** = الفكرة الرئيسية فوق، تحتها 3 أسباب، وتحت كل سبب الأدلة. القارئ ممكن يوقف عند أي مستوى ويكون فاهم. عكس طريقة المدرسة (مقدمة ← أدلة ← نتيجة).', 'The **pyramid principle** = the main idea at the top, 3 reasons under it, and the evidence under each reason. The reader can stop at any level and still understand. The opposite of the school method (introduction → evidence → conclusion).'),
          'TOP: Automate invoice processing this quarter.\n  1. It saves money — USD 60,000 a year in staff time.\n     · 3 staff spend 40% of their time re-typing invoices.\n  2. It reduces risk — errors fall from 4% to under 0.5%.\n     · 18 payment disputes last year came from typos.\n  3. It is ready now — the same tools run our order flow.'),
        L(B('SCQA', 'SCQA'),
          B('**SCQA** = هيكل للمقدمة: **situation** (الوضع المتفق عليه) ← **complication** (اللي اتغيّر أو المشكلة) ← question (السؤال الطبيعي) ← answer (توصيتك). بيخلي القارئ يوافق خطوة بخطوة.', '**SCQA** = a structure for an introduction: **situation** (the agreed context) → **complication** (what changed or the problem) → question (the natural question) → answer (your recommendation). It leads the reader to agree step by step.'),
          'S: We process 4,000 supplier invoices a month by hand.\nC: Volume will double next year after the Riyadh expansion, and hiring takes six months.\nQ: How do we handle double the volume without delays?\nA: Automate invoice processing now, for USD 18,000.'),
        L(B('شكل الصفحة', 'The page layout'),
          B('**one-pager**: عنوان هو الرسالة نفسها («Automating invoices saves USD 60K a year» مش «Invoice project»)، فقرة SCQA، 3 نقط بالأرقام، جدول تكلفة صغير، المخاطر، والطلب بميعاد. مساحة بيضا كتير، ومن غير مصطلحات تقنية.', 'A **one-pager**: a title that is the message itself («Automating invoices saves USD 60K a year», not «Invoice project»), an SCQA paragraph, 3 points with numbers, a small cost table, the risks, and the request with a deadline. Plenty of white space, and no technical jargon.'),
          '# Automating invoices saves USD 60K a year\nSituation · complication · recommendation (4 lines)\nWhy: 1 money · 2 risk · 3 readiness\nCost: USD 18,000 once + USD 300/month\nRisk: supplier formats vary → 2-week pilot first\nDecision needed: approval by 20 October')
      ],
      practice: [
        B('ارسم هرم لفكرة عندك (1 + 3 + أدلة).', 'Draw a pyramid for one of your ideas (1 + 3 + evidence).'),
        B('اكتب SCQA لـ 3 مواضيع.', 'Write SCQA for 3 topics.'),
        B('حوّل 5 عناوين وصفية لعناوين رسالة.', 'Turn 5 descriptive titles into message titles.'),
        B('اكتب one-pager أول نسخة.', 'Write a first-draft one-pager.')
      ],
      words: [
        W('pyramid principle', 'مبدأ الهرم (الفكرة فوق)', 'main idea first, then support', 'Structure the memo with the pyramid principle.'),
        W('SCQA', 'وضع، تعقيد، سؤال، إجابة', 'situation, complication, question, answer', 'Open with SCQA.'),
        W('situation', 'الوضع الحالي', 'the current context', 'Start with the situation everyone agrees on.'),
        W('complication', 'المشكلة أو التغيير', 'what changed or went wrong', 'The complication is doubling volume.'),
        W('one-pager', 'مستند صفحة واحدة', 'a one-page summary document', 'Send a one-pager before the meeting.')
      ],
      read: [{ lib: 'NN/g: How users read on the web', what: B('اقرا عن القراءة بالمسح السريع.', 'Read about scanning when reading.') }],
      challenge: B('اكتب one-pager حقيقي بالإنجليزي لفكرة automation عند عميل أو شغلك: عنوان رسالة، SCQA، هرم 3 أسباب بالأرقام، تكلفة، مخاطرة، وطلب بميعاد — وادّيه لحد يقراه في دقيقة ويقولك فهم إيه.', 'Write a real English one-pager for an automation idea at a client or your job: a message title, SCQA, a 3-reason pyramid with numbers, cost, a risk, and a request with a deadline — then ask someone to read it in one minute and tell you what they understood.'),
      quiz: [
        Q(B('عنوان رسالة:', 'A message title:'), ['Automating invoices saves USD 60K a year', 'Invoice project', 'Update'], 0, B('الرسالة.', 'The message.')),
        Q(B('ترتيب SCQA:', 'The SCQA order:'), ['situation → complication → question → answer', 'answer → situation → question', 'question → answer → situation'], 0, B('ترتيب.', 'Order.')),
        Q(B('pyramid principle:', 'The pyramid principle:'), ['main idea first, then reasons, then evidence', 'evidence first', 'conclusion last'], 0, B('من فوق.', 'Top-down.'))
      ] },

    { title: B('قضية البيزنس', 'The business case'),
      goal: B('تبرر أي مشروع بلغة الفلوس.', 'Justify any project in the language of money.'),
      learn: [
        L(B('العائد', 'The return'),
          B('**business case** = الحجة المالية للمشروع. **ROI** (return on investment) = (المكسب − التكلفة) ÷ التكلفة. **payback period** = إمتى الاستثمار يرجع. اكتب الرقم والطريقة: «ROI of 230% in year one (USD 60K saved ÷ USD 18K cost)».', 'A **business case** = the financial argument for a project. **ROI** (return on investment) = (gain − cost) ÷ cost. The **payback period** = when the investment pays for itself. Give the number and the method: «ROI of 230% in year one (USD 60K saved − USD 18K cost, ÷ USD 18K)».'),
          'cost:     USD 18,000 setup + USD 3,600/year running\nsaving:   USD 60,000/year in staff time\nROI yr 1: (60,000 − 21,600) ÷ 21,600 ≈ 178%\npayback:  about 4 months'),
        L(B('تكلفة عدم الفعل', 'The cost of doing nothing'),
          B('**cost of inaction** = تمن إننا منعملش حاجة (أخطاء، توظيف، عملاء بيمشوا) — غالبًا أقوى حجة. **opportunity cost** = اللي بنخسره لما نختار ده بدل حاجة تانية. **run-rate** = الرقم الحالي محسوب على سنة («a run-rate of USD 5,000 a month»).', 'The **cost of inaction** = the price of doing nothing (errors, hiring, lost customers) — often the strongest argument. **opportunity cost** = what we lose by choosing this instead of something else. A **run-rate** = the current figure projected over a year («a run-rate of USD 5,000 a month»).'),
          '"If we do nothing, we will need two more staff by June (USD 48,000 a year), and error-related disputes are running at a run-rate of USD 9,000 a year. The opportunity cost of manual work: our finance team has no time for cash-flow analysis."'),
        L(B('السيناريوهات', 'Scenarios'),
          B('المديرين بيحبوا يشوفوا **base case** (المتوقع)، **best case**، و**worst case**. **upside** = المكسب المحتمل الإضافي، **downside** = الخسارة المحتملة. وكن صادق في الافتراضات — المدير الشاطر بيدوّر على الرقم المتفائل زيادة.', 'Executives like to see the **base case** (expected), the **best case** and the **worst case**. The **upside** = the potential extra gain, the **downside** = the potential loss. And be honest about assumptions — a good executive looks for the over-optimistic number.'),
          '                 savings/yr   payback\nworst case       USD 30,000   8 months\nbase case        USD 60,000   4 months\nbest case        USD 75,000   3 months\nDownside is limited: even in the worst case, the project pays back within a year.')
      ],
      practice: [
        B('احسب ROI وpayback لمشروع حقيقي واكتبهم بالإنجليزي.', 'Calculate ROI and payback for a real project and write them in English.'),
        B('اكتب فقرة cost of inaction.', 'Write a cost-of-inaction paragraph.'),
        B('اعمل جدول worst/base/best.', 'Build a worst/base/best table.'),
        B('اكتب الافتراضات بصراحة.', 'Write the assumptions honestly.')
      ],
      words: [
        W('business case', 'الحجة المالية للمشروع', 'the financial argument for a project', 'The business case convinced the CFO.'),
        W('ROI', 'العائد على الاستثمار', 'return on investment', 'The ROI is 178% in year one.'),
        W('payback period', 'مدة استرداد التكلفة', 'the time to recover the cost', 'The payback period is four months.'),
        W('cost of inaction', 'تكلفة إننا منعملش حاجة', 'the price of doing nothing', 'Show the cost of inaction first.'),
        W('opportunity cost', 'تكلفة الفرصة البديلة', 'what you give up by choosing', 'Manual work has an opportunity cost.'),
        W('run-rate', 'المعدل الحالي محسوب سنويًا', 'the current figure projected yearly', 'Our run-rate is USD 9,000 a year.'),
        W('base case', 'السيناريو المتوقع', 'the expected scenario', 'In the base case we save USD 60K.'),
        W('worst case', 'أسوأ سيناريو', 'the worst likely scenario', 'Even in the worst case it pays back.'),
        W('best case', 'أحسن سيناريو', 'the best likely scenario', 'The best case assumes full adoption.'),
        W('upside', 'المكسب المحتمل', 'the potential benefit', 'The upside is faster month-end closing.'),
        W('downside', 'الخسارة المحتملة', 'the potential loss', 'The downside is limited.')
      ],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «business English: money».', 'Search for «business English: money».') }],
      challenge: B('اكتب business case بالإنجليزي (صفحة) لمشروع automation: التكلفة، التوفير، ROI وpayback بالطريقة، cost of inaction، جدول 3 سيناريوهات، والافتراضات — وخلّي حد يحاول ينتقد أرقامك.', 'Write an English business case (one page) for an automation project: cost, saving, ROI and payback with the method, the cost of inaction, a 3-scenario table and the assumptions — and ask someone to challenge your numbers.'),
      quiz: [
        Q(B('payback period:', 'The payback period:'), ['the time to recover the cost', 'the salary date', 'a refund'], 0, B('استرداد.', 'Recovery.')),
        Q(B('cost of inaction:', 'The cost of inaction:'), ['the price of doing nothing', 'a cheap action', 'a fine'], 0, B('عدم الفعل.', 'Doing nothing.')),
        Q(B('مدير شاطر بيدوّر على:', 'A good executive looks for:'), ['over-optimistic assumptions', 'colours', 'long paragraphs'], 0, B('صدق.', 'Honesty.'))
      ] },

    { title: B('مذكرة القرار', 'The decision memo'),
      goal: B('تطلب قرار وتاخده.', 'Ask for a decision and get it.'),
      learn: [
        L(B('هيكل المذكرة', 'The memo structure'),
          B('**decision memo**: الطلب (BLUF) ← الخلفية في 3 سطور ← 2–3 اختيارات (مع «do nothing») ← مقارنة ← **recommendation** وليه ← المخاطر ← اللي هيحصل بعد الموافقة. الاختيارات لازم تكون حقيقية مش اختيار واحد كويس واتنين وحشين.', 'A **decision memo**: the request (BLUF) → background in 3 lines → 2–3 options (including «do nothing») → comparison → the **recommendation** and why → risks → what happens after approval. The options must be real, not one good option and two straw men.'),
          'Decision needed: approve Option B by 20 October.\nOption A — do nothing: USD 0 now; 2 hires (USD 48K/yr) by June.\nOption B — automate in phases: USD 18K; saves USD 60K/yr; 2-week pilot first.\nOption C — buy an off-the-shelf tool: USD 25K/yr licence; less control of data.\nRecommendation: B — lowest cost over 3 years, and the pilot limits risk.'),
        L(B('المخاطر', 'Risks'),
          B('**risk register** = جدول المخاطر: المخاطرة، الاحتمال، الأثر، صاحبها، والحل. **contingency** = خطة بديلة لو المخاطرة حصلت. المدير بيثق فيك أكتر لو انت اللي ذكرت المخاطر قبله.', 'A **risk register** = a table of risks: the risk, its likelihood, impact, owner and response. A **contingency** = a backup plan if the risk happens. Executives trust you more when you raise the risks before they do.'),
          'risk                         likelihood  impact  owner   response\nsupplier formats vary         high        medium  Laila   2-week pilot with top 20 suppliers\nfinance team resists change   medium      high    Omar    training + keep manual option 1 month\ncontingency: if accuracy < 98% after the pilot, we pause and review before full rollout.'),
        L(B('صياغة الطلب', 'Wording the ask'),
          B('الطلب لازم يبقى محدد ونعم/لأ: «**approval** of USD 18,000 for Option B by 20 October». واكتب **budget request** بالرقم والبند. ولو مفيش رد: متابعة قصيرة بنفس الطلب والأثر لو اتأخر.', 'The request must be specific and yes/no: «**approval** of USD 18,000 for Option B by 20 October». Write a **budget request** with the amount and the line item. And if there is no reply: a short follow-up with the same request and the impact of a delay.'),
          'ask:       "I’m asking for approval of USD 18,000 from the Q4 operations budget for Option B, by 20 October."\nfollow-up: "Following up on the invoice automation memo: a decision by Monday keeps the pilot before the year-end close. Happy to take any questions in 10 minutes this week."')
      ],
      practice: [
        B('اكتب 3 اختيارات حقيقية لقرار في شغلك.', 'Write 3 real options for a decision at work.'),
        B('اعمل risk register بـ 4 مخاطر.', 'Build a risk register with 4 risks.'),
        B('اكتب جملة طلب نعم/لأ محددة.', 'Write a specific yes/no request sentence.'),
        B('اكتب متابعة قصيرة لطلب متأخر.', 'Write a short follow-up for a delayed request.')
      ],
      words: [
        W('decision memo', 'مذكرة قرار', 'a document requesting a decision', 'Send the decision memo on Sunday.'),
        W('recommendation', 'توصية', 'the option you advise', 'My recommendation is Option B.'),
        W('risk register', 'سجل المخاطر', 'a table of risks and responses', 'Update the risk register weekly.'),
        W('contingency', 'خطة طوارئ بديلة', 'a backup plan', 'We have a contingency for low accuracy.'),
        W('approval', 'موافقة', 'official permission', 'We need approval by Thursday.'),
        W('budget request', 'طلب ميزانية', 'a formal request for money', 'The budget request is USD 18,000.')
      ],
      read: [{ lib: 'Google Developer Documentation Style Guide', what: B('راجع قسم الإيجاز والوضوح.', 'Review the section on concision and clarity.') }],
      challenge: B('اكتب decision memo بالإنجليزي (صفحة) لقرار حقيقي: BLUF، 3 اختيارات منهم do nothing، مقارنة بالأرقام، توصية، risk register، contingency، وطلب نعم/لأ بميعاد.', 'Write an English decision memo (one page) for a real decision: BLUF, 3 options including do nothing, a numeric comparison, a recommendation, a risk register, a contingency and a yes/no request with a deadline.'),
      quiz: [
        Q(B('اختيار لازم يكون موجود:', 'An option that should be included:'), ['do nothing', 'a joke option', 'none'], 0, B('مقارنة عادلة.', 'A fair comparison.')),
        Q(B('contingency:', 'A contingency:'), ['a backup plan', 'a contract', 'a country'], 0, B('بديل.', 'Backup.')),
        Q(B('طلب كويس:', 'A good request:'), ['Approval of USD 18,000 for Option B by 20 October.', 'Let me know your thoughts sometime.', 'What do you think?'], 0, B('محدد.', 'Specific.'))
      ] },

    { title: B('التحديثات الدورية', 'Regular updates'),
      goal: B('تحديث يتقري في نظرة ويبني الثقة.', 'An update readable at a glance that builds trust.'),
      learn: [
        L(B('حالة RAG', 'RAG status'),
          B('**RAG status** = أحمر/أصفر/أخضر لكل مشروع: Green (ماشي)، Amber (فيه خطر ومحتاج انتباه)، Red (متعطل ومحتاج قرار أو مساعدة). المهم: الأحمر لازم يجي معاه «what I need from you». ومتخبيش الأصفر لحد ما يبقى أحمر.', 'A **RAG status** = red/amber/green for each project: Green (on track), Amber (at risk, needs attention), Red (blocked, needs a decision or help). The key: red must come with «what I need from you». And do not hide amber until it turns red.'),
          'Invoice automation   GREEN  Pilot complete, 99.1% accuracy.\nWhatsApp campaigns   AMBER  Templates under Meta review; launch may slip one week.\nOdoo migration       RED    Blocked on API access — need IT approval by Thursday.'),
        L(B('الربع سنوي', 'The quarterly review'),
          B('**QBR** (quarterly business review) = مراجعة ربع سنوية مع العميل أو الإدارة. قارن **quarter-over-quarter** (بالربع اللي فات) و**year-over-year** (بنفس الربع السنة اللي فاتت، بيشيل أثر المواسم). وابدأ بالـ **at a glance**: 3–4 أرقام في صندوق.', 'A **QBR** (quarterly business review) = a quarterly review with a client or management. Compare **quarter-over-quarter** (with the last quarter) and **year-over-year** (with the same quarter last year, removing seasonal effects). And open with an **at a glance** box: 3–4 numbers.'),
          'Q3 at a glance\n· 38,400 orders automated (+22% quarter-over-quarter)\n· 1,150 staff hours saved (+40% year-over-year)\n· 99.6% success rate (target 99.5%)\n· 1 incident, resolved in 18 minutes'),
        L(B('من الأرقام للقصة', 'From numbers to a story'),
          B('التحديث مش قايمة أرقام — هو إيه اللي اتغيّر، ليه، وإيه الجاي. اكتب: اللي اتحقق، اللي متحققش وليه (بصراحة)، **strategic** ربط بأهداف الشركة، والخطوة الجاية. وخليه ثابت الشكل كل مرة عشان المدير يعرف يلاقي المعلومة.', 'An update is not a list of numbers — it is what changed, why, and what is next. Write: what was achieved, what was not and why (honestly), a **strategic** link to company goals, and the next step. And keep the same format every time so the executive knows where to look.'),
          '"Automation now covers 80% of orders, up from 55%. We missed the target for returns (40% vs 60%) because the warehouse system has no API; we’re testing a CSV workaround. This keeps us on track for the strategic goal of handling twice the volume without new hires in 2027."')
      ],
      practice: [
        B('اكتب RAG status لـ 4 مشاريع.', 'Write a RAG status for 4 projects.'),
        B('احسب نسب QoQ وYoY لأرقام عندك.', 'Calculate QoQ and YoY percentages for your numbers.'),
        B('اكتب صندوق at a glance.', 'Write an at-a-glance box.'),
        B('اكتب فقرة «ما تحققش وليه» بصدق.', 'Write an honest «what we missed and why» paragraph.')
      ],
      words: [
        W('RAG status', 'حالة أحمر/أصفر/أخضر', 'red, amber or green project status', 'The RAG status is amber this week.'),
        W('QBR', 'مراجعة ربع سنوية', 'quarterly business review', 'Prepare the QBR slides.'),
        W('quarter-over-quarter', 'مقارنة بالربع اللي فات', 'compared with the previous quarter', 'Orders grew 22% quarter-over-quarter.'),
        W('year-over-year', 'مقارنة بنفس الفترة السنة اللي فاتت', 'compared with the same period last year', 'Year-over-year growth was 40%.'),
        W('at a glance', 'في نظرة سريعة', 'quickly, in a short view', 'Q3 at a glance: four numbers.'),
        W('strategic', 'استراتيجي', 'related to long-term goals', 'Link the update to strategic goals.')
      ],
      read: [{ lib: 'Microsoft Writing Style Guide', what: B('دوّر على «scannable content».', 'Search for «scannable content».') }],
      challenge: B('اكتب QBR تمثيلي بالإنجليزي لعميل automation (صفحة): at a glance، RAG لكل workflow، QoQ وYoY، اللي ما تحققش وليه، الربط الاستراتيجي، و3 أولويات للربع الجاي.', 'Write a mock English QBR for an automation client (one page): at a glance, RAG for each workflow, QoQ and YoY, what was missed and why, the strategic link, and 3 priorities for next quarter.'),
      quiz: [
        Q(B('Amber:', 'Amber:'), ['at risk, needs attention', 'finished', 'cancelled'], 0, B('خطر.', 'At risk.')),
        Q(B('year-over-year:', 'Year-over-year:'), ['compared with the same period last year', 'compared with last week', 'every year forever'], 0, B('موسمي.', 'Seasonal.')),
        Q(B('Red لازم يجي معاه:', 'A red status must come with:'), ['what I need from you', 'an apology only', 'nothing'], 0, B('طلب.', 'A request.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('بتكتب بلغة الإدارة العليا.', 'You write in the language of senior management.'),
      review: [
        B('BLUF و«so what» والمستند الجاهز للقرار.', 'BLUF, «so what» and the decision-ready document.'),
        B('مبدأ الهرم وSCQA والـ one-pager.', 'The pyramid principle, SCQA and the one-pager.'),
        B('ROI وpayback وcost of inaction والسيناريوهات.', 'ROI, payback, the cost of inaction and scenarios.'),
        B('مذكرة القرار وrisk register وصياغة الطلب.', 'The decision memo, the risk register and wording the ask.'),
        B('RAG وQBR وQoQ وYoY وتحويل الأرقام لقصة.', 'RAG, QBR, QoQ, YoY and turning numbers into a story.')
      ],
      project: B('ابني «حقيبة المدير التنفيذي» بالإنجليزي لمشروع automation واحد: one-pager، business case بـ 3 سيناريوهات، decision memo بـ risk register، تحديث أسبوعي RAG، وQBR — بنفس الأرقام والرسالة في الكل، وكل مستند يتقري في دقيقتين.', 'Build an English «executive pack» for one automation project: a one-pager, a business case with 3 scenarios, a decision memo with a risk register, a weekly RAG update and a QBR — with the same numbers and message throughout, each readable in two minutes.'),
      test: [
        Q(B('أول سطر لمدير:', 'The first line for an executive:'), ['the recommendation and the ask', 'the history of the project', 'a greeting paragraph'], 0, B('BLUF.', 'BLUF.')),
        Q(B('time-poor:', 'Time-poor:'), ['having very little time', 'paid little', 'always late'], 0, B('وقت.', 'Time.')),
        Q(B('key message:', 'A key message:'), ['one main point', 'five equal points', 'a password'], 0, B('واحدة.', 'One.')),
        Q(B('S في SCQA:', 'The S in SCQA:'), ['situation', 'solution', 'summary'], 0, B('الوضع.', 'Situation.')),
        Q(B('complication:', 'A complication:'), ['what changed or went wrong', 'a difficult word', 'a compliment'], 0, B('مشكلة.', 'Problem.')),
        Q(B('ROI:', 'ROI:'), ['(gain − cost) ÷ cost', 'cost × 2', 'revenue only'], 0, B('عائد.', 'Return.')),
        Q(B('run-rate:', 'A run-rate:'), ['the current figure projected over a year', 'a running speed', 'a daily limit'], 0, B('سنوي.', 'Annualised.')),
        Q(B('opportunity cost:', 'Opportunity cost:'), ['what you give up by choosing', 'a sale price', 'a job offer'], 0, B('بديل.', 'Alternative.')),
        Q(B('risk register:', 'A risk register:'), ['a table of risks, owners and responses', 'a cash register', 'a log file'], 0, B('مخاطر.', 'Risks.')),
        Q(B('اختيارات مذكرة القرار:', 'Decision-memo options:'), ['real options including do nothing', 'one good and two silly', 'only one'], 0, B('عادل.', 'Fair.')),
        Q(B('QBR:', 'A QBR:'), ['quarterly business review', 'quick bug report', 'quality budget rule'], 0, B('ربع سنوي.', 'Quarterly.')),
        Q(B('هدف ما تحققش:', 'A missed target:'), ['say it honestly with the reason and the plan', 'hide it', 'change the target silently'], 0, B('صدق.', 'Honesty.'))
      ] }
  ]
};
