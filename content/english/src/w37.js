// English week 37 — Sales calls and discovery.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('مكالمات البيع والاكتشاف', 'Sales calls and discovery'),
  goal: B('تدير مكالمة بيع بالإنجليزي مع عميل أجنبي بثقة: تفتح بشكل دافي ومنظم، تسأل أسئلة اكتشاف مهذبة وعميقة، تسمع وتتأكد إنك فهمت، تعرض قيمتك بلغة الفوايد مش المميزات، وتقفل بخطوة جاية وإيميل متابعة احترافي.',
          'Run a sales call in English with an international client confidently: open warmly and with structure, ask polite and deep discovery questions, listen and confirm you understood, present your value in the language of benefits not features, and close with a next step and a professional follow-up email.'),
  days: [
    { title: B('فتح المكالمة', 'Opening the call'),
      goal: B('أول دقيقتين بيبنوا الثقة ويحددوا الشكل.', 'The first two minutes build trust and set the shape.'),
      learn: [
        L(B('الترحيب والعلاقة', 'Greeting and rapport'),
          B('**rapport** = إحساس بالراحة والثقة بينكم. ابدأ بشكر قصير على الوقت، و**ice-breaker** خفيف ومناسب (مش أسئلة شخصية)، وبعدين ادخل في الموضوع. الأجانب غالبًا بيقدّروا الدخول السريع في الشغل — **warm-up** دقيقة كفاية.', '**rapport** = a feeling of ease and trust between you. Start with a short thank-you for their time, a light, appropriate **ice-breaker** (not personal questions), then move to business. International clients usually appreciate getting to the point — a one-minute **warm-up** is enough.'),
          '"Hi Sarah, thanks for making the time today."\n"How’s your week going so far?" / "I saw you just launched the new store — congratulations."\n"Great. Shall we dive in?"'),
        L(B('تحديد الأجندة', 'Setting the agenda'),
          B('بعد الترحيب، **set expectations**: إيه هيحصل في المكالمة ومدتها، واسأل لو موافقين. ده بيوريهم إنك منظم وبيديهم فرصة يضيفوا حاجة. واعمل **time check** في الأول («معانا 30 دقيقة لسه؟»).', 'After the greeting, **set expectations**: what will happen in the call and how long it takes, and ask if that works. It shows you are organised and lets them add something. And do a **time check** at the start («do we still have 30 minutes?»).'),
          '"Just to check, do we still have about 30 minutes?"\n"Here’s what I had in mind: I’d like to ask a few questions about how you handle orders today, then I’ll share how we’ve helped similar shops, and we’ll agree on next steps. Does that work for you?"\n"Is there anything you’d like to add to that?"'),
        L(B('نبرة مهذبة ومباشرة', 'A polite but direct tone'),
          B('في الإنجليزي المهني، الطلبات بتبقى أنعم بـ «Shall we…?» و«Would it be OK if…?» و«I’d like to…». متقولش «Tell me about your company» كأمر — قول «Could you tell me a bit about…?». ونفس الوقت كون واضح ومحدد.', 'In professional English, requests are softened with «Shall we…?», «Would it be OK if…?» and «I’d like to…». Do not say «Tell me about your company» as an order — say «Could you tell me a bit about…?». At the same time, be clear and specific.'),
          '✗ "Tell me your problem."\n✓ "Could you tell me a bit about what prompted you to reach out?"\n✗ "I will now explain our service."\n✓ "Would it be OK if I shared how we usually approach this?"')
      ],
      practice: [
        B('اكتب 3 جمل افتتاح طبيعية.', 'Write 3 natural opening lines.'),
        B('اكتب أجندة مكالمة 30 دقيقة واسأل الموافقة.', 'Write a 30-minute call agenda and ask for agreement.'),
        B('حوّل 5 أوامر مباشرة لطلبات مهذبة.', 'Turn 5 direct orders into polite requests.'),
        B('سجّل نفسك بتفتح مكالمة واسمعها.', 'Record yourself opening a call and listen back.')
      ],
      words: [
        W('rapport', 'علاقة ثقة وراحة', 'a relationship of trust and ease', 'Building rapport takes a minute, not ten.'),
        W('ice-breaker', 'جملة خفيفة بتكسر الجمود', 'a light remark that eases the start', 'A short ice-breaker relaxes everyone.'),
        W('warm-up', 'كلام قصير قبل الموضوع', 'short talk before the main topic', 'Keep the warm-up under a minute.'),
        W('set expectations', 'توضيح اللي هيحصل مقدمًا', 'to explain in advance what will happen', 'Set expectations about the call length.'),
        W('time check', 'التأكد من الوقت المتاح', 'confirming the time available', 'Start with a quick time check.')
      ],
      read: ['lib:Speak English with Vanessa', { lib: 'BBC Learning English', what: B('دوّر على Business English: meetings.', 'Search for Business English: meetings.') }],
      challenge: B('اعمل تمثيل مكالمة مع صاحب (أو سجّل لوحدك): أول دقيقتين — ترحيب، ice-breaker مناسب، time check، أجندة بموافقة — بالإنجليزي وبنبرة مهذبة.', 'Role-play a call with a friend (or record yourself): the first two minutes — greeting, a suitable ice-breaker, a time check, an agenda with agreement — in English with a polite tone.'),
      quiz: [
        Q(B('أنسب افتتاح:', 'The best opening:'), ['Thanks for making the time today.', 'Tell me your budget.', 'Let’s go.'], 0, B('شكر وتقدير.', 'Thanks and respect.')),
        Q(B('سؤال الأجندة:', 'Asking about the agenda:'), ['Does that work for you?', 'Understand?', 'OK?'], 0, B('مهذب.', 'Polite.')),
        Q(B('طلب مهذب:', 'A polite request:'), ['Could you tell me a bit about your team?', 'Tell me about your team.', 'Your team?'], 0, B('Could you.', 'Could you.'))
      ] },

    { title: B('أسئلة الاكتشاف', 'Discovery questions'),
      goal: B('أسئلة بتطلّع المشكلة الحقيقية وتأثيرها.', 'Questions that bring out the real problem and its impact.'),
      learn: [
        L(B('أسئلة مفتوحة', 'Open questions'),
          B('أقوى أسئلة الاكتشاف بتبدأ بـ «**walk me through**…» و«How do you currently…?» و«What happens when…?». بتخلّي العميل يحكي تفاصيل الـ **current process** بكلامه — وهناك بيظهر الـ **pain point**.', 'The strongest discovery questions begin with «**walk me through**…», «How do you currently…?» and «What happens when…?». They let the client describe the details of their **current process** in their own words — that is where the **pain point** appears.'),
          '"Could you walk me through what happens when a new order comes in?"\n"How do you currently handle invoices?"\n"What happens when an item is out of stock?"\n"Where does it usually get stuck?"'),
        L(B('الأسئلة غير المباشرة', 'Indirect questions'),
          B('**indirect question** أنعم وأكثر احترافية خصوصًا في المواضيع الحساسة (فلوس، مشاكل). الترتيب بيتغير: «How many orders do you get?» ← «Could you tell me how many orders **you get**?» (الفاعل قبل الفعل، من غير do).', 'An **indirect question** is softer and more professional, especially on sensitive topics (money, problems). The word order changes: «How many orders do you get?» → «Could you tell me how many orders **you get**?» (subject before verb, no do).'),
          'direct: "What is your budget?"\nindirect: "Do you mind me asking what budget you have in mind?"\ndirect: "Why did the last project fail?"\nindirect: "I’m curious what made the last project difficult."\ndirect: "When do you need it?"\nindirect: "Could you tell me when you’d ideally like this to be live?"'),
        L(B('الأسئلة المتتابعة', 'Follow-up questions'),
          B('الإجابة الأولى غالبًا سطحية. **follow-up question** بيروح أعمق: «Could you say more about that?» و«What does that cost you?» و«How often does that happen?» و«What have you tried so far?». ده اللي بيطلّع الأرقام اللي هتحسب بيها العائد.', 'The first answer is usually shallow. A **follow-up question** goes deeper: «Could you say more about that?», «What does that cost you?», «How often does that happen?» and «What have you tried so far?». That brings out the numbers you will use to calculate the return.'),
          'Client: "Invoicing is a bit slow."\nYou: "Could you say more about that?"\nClient: "Someone types each one manually."\nYou: "Roughly how long does that take each week?"\nClient: "Maybe fifteen hours."\nYou: "And what happens when there’s a mistake?"')
      ],
      practice: [
        B('اكتب 8 أسئلة مفتوحة لاكتشاف عملية طلبات.', 'Write 8 open questions to discover an order process.'),
        B('حوّل 5 أسئلة مباشرة لغير مباشرة.', 'Turn 5 direct questions into indirect ones.'),
        B('اكتب سلسلة 4 أسئلة متتابعة.', 'Write a chain of 4 follow-up questions.'),
        B('اسمع مكالمة على YouGlish بـ «walk me through».', 'Listen to «walk me through» on YouGlish.')
      ],
      words: [
        W('walk me through', 'اشرحلي خطوة بخطوة', 'explain to me step by step', 'Could you walk me through your process?'),
        W('current process', 'الطريقة الحالية للشغل', 'the way the work is done now', 'Let’s map the current process first.'),
        W('pain point', 'المشكلة اللي بتوجع', 'the problem that hurts', 'Manual invoicing is their main pain point.'),
        W('indirect question', 'سؤال بصيغة مهذبة غير مباشرة', 'a question in a polite, indirect form', 'Use an indirect question about budget.'),
        W('follow-up question', 'سؤال بيكمل على إجابة', 'a question building on an answer', 'A good follow-up question finds the numbers.')
      ],
      read: [{ lib: 'Cambridge Dictionary', what: B('دوّر على indirect questions في Grammar.', 'Look up indirect questions in Grammar.') }, 'lib:YouGlish'],
      challenge: B('اعمل مكالمة اكتشاف تجريبية 15 دقيقة بالإنجليزي: 70% أسئلة، سؤال غير مباشر عن الميزانية، و3 أسئلة متتابعة لحد ما توصل لرقم (ساعات أو تكلفة).', 'Hold a 15-minute mock discovery call in English: 70% questions, an indirect question about budget, and 3 follow-up questions until you reach a number (hours or cost).'),
      quiz: [
        Q(B('سؤال غير مباشر صحيح:', 'A correct indirect question:'), ['Could you tell me how many orders you get?', 'Could you tell me how many orders do you get?', 'How many orders you get?'], 0, B('من غير do.', 'No do.')),
        Q(B('أحسن سؤال مفتوح:', 'The best open question:'), ['Walk me through what happens when an order comes in.', 'Do you get orders?', 'Is it slow?'], 0, B('بيطلّع تفاصيل.', 'Brings out details.')),
        Q(B('بعد «It’s a bit slow»:', 'After «It’s a bit slow»:'), ['Could you say more about that?', 'OK, next question.', 'That’s normal.'], 0, B('أعمق.', 'Deeper.'))
      ] },

    { title: B('السماع والتأكد', 'Listening and checking'),
      goal: B('العميل يحس إنك فهمته بالظبط.', 'The client feels you understood exactly.'),
      learn: [
        L(B('إشارات السماع', 'Listening signals'),
          B('**back-channelling** = إشارات قصيرة بتقول «أنا معاك» من غير ما تقاطع: «Right», «I see», «Mm-hmm», «That makes sense». وخصوصًا في المكالمات الأونلاين، الصمت الطويل بيخلّي العميل يفتكر إنك مش سامع. بس متكترش لدرجة إنها تبقى تقاطع.', '**back-channelling** = short signals saying «I am with you» without interrupting: «Right», «I see», «Mm-hmm», «That makes sense». Especially on online calls, long silence makes the client think you are not listening. But do not overdo it to the point of interrupting.'),
          '"Right." · "I see." · "Mm-hmm." · "That makes sense." · "Interesting."\n"Got it." · "Sure." · "Absolutely."'),
        L(B('التأكد من الفهم', 'Checking understanding'),
          B('**check understanding** و**reflect back**: لخّص اللي سمعته بكلامك واسأل لو صح. ده بيمنع سوء الفهم، وبيوري العميل إنك مهتم، وغالبًا بيصحح حاجة مهمة. «So if I understand correctly…» و«Let me check I’ve got this right…».', 'To **check understanding** and **reflect back**: summarise what you heard in your own words and ask if it is right. It prevents misunderstandings, shows the client you care, and often brings out an important correction. «So if I understand correctly…» and «Let me check I’ve got this right…».'),
          '"So if I understand correctly, the main issue isn’t the number of orders, it’s the time spent fixing mistakes — is that right?"\n"Let me check I’ve got this right: about 35 orders a week, each takes 25 minutes, and roughly one in ten has an error?"\n"It sounds like the real priority is speed at night, when no one is online."'),
        L(B('أسئلة التوضيح والمقاطعة', 'Clarifying and interrupting'),
          B('**clarifying question** لما مفهمتش مصطلح أو رقم: «Sorry, could you clarify what you mean by ‘manual sync’?». ولو لازم تقاطع (الوقت أو سوء فهم)، **interrupt** بأدب: «Sorry to jump in, but…» و«Can I just ask about that point?». ومتكملش جملة العميل عنه.', 'A **clarifying question** when you did not understand a term or number: «Sorry, could you clarify what you mean by ‘manual sync’?». And if you must **interrupt** (time or a misunderstanding), do it politely: «Sorry to jump in, but…» and «Can I just ask about that point?». And never finish the client’s sentence for them.'),
          '"Sorry, could you clarify what you mean by ‘the old system’?"\n"When you say ‘a lot’, roughly how many are we talking about?"\n"Sorry to jump in — I just want to make sure we cover pricing before we run out of time."')
      ],
      practice: [
        B('اسمع بودكاست 10 دقايق ولاحظ الـ back-channelling.', 'Listen to 10 minutes of a podcast and notice the back-channelling.'),
        B('اكتب 3 ملخصات «So if I understand correctly».', 'Write 3 «So if I understand correctly» summaries.'),
        B('اكتب 4 أسئلة توضيح لمصطلحات غامضة.', 'Write 4 clarifying questions for vague terms.'),
        B('تدرّب على مقاطعة مهذبة في تمثيل.', 'Practise a polite interruption in a role-play.')
      ],
      words: [
        W('back-channelling', 'إشارات سماع قصيرة', 'short listening signals', 'Back-channelling shows you are engaged.'),
        W('check understanding', 'التأكد إنك فهمت صح', 'to confirm you understood correctly', 'Always check understanding before proposing.'),
        W('reflect back', 'تكرار كلام العميل بكلامك', 'to repeat the client’s point in your words', 'Reflect back the main problem.'),
        W('clarifying question', 'سؤال للتوضيح', 'a question asking for clarity', 'Ask a clarifying question about numbers.'),
        W('interrupt', 'يقاطع', 'to cut in while someone is speaking', 'Interrupt politely only when needed.')
      ],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «checking understanding».', 'Search for «checking understanding».') }],
      challenge: B('في مكالمة تجريبية: استخدم 5 إشارات سماع، لخّص مرتين بـ «So if I understand correctly»، واسأل سؤالين توضيح — وخلّي صاحبك يقيّم: حس إنك فهمته؟', 'In a mock call: use 5 listening signals, summarise twice with «So if I understand correctly», and ask two clarifying questions — then have your friend rate it: did they feel understood?'),
      quiz: [
        Q(B('إشارة سماع:', 'A listening signal:'), ['That makes sense.', 'Wait, stop.', 'No.'], 0, B('back-channelling.', 'Back-channelling.')),
        Q(B('تلخيص للتأكد:', 'A summary to check:'), ['So if I understand correctly, …?', 'You said a lot.', 'OK.'], 0, B('reflect back.', 'Reflect back.')),
        Q(B('مقاطعة مهذبة:', 'A polite interruption:'), ['Sorry to jump in, but…', 'Stop talking.', 'Listen to me.'], 0, B('أدب.', 'Politeness.'))
      ] },

    { title: B('عرض القيمة', 'Presenting value'),
      goal: B('تتكلم عن اللي العميل هيكسبه مش عن أدواتك.', 'Talk about what the client gains, not your tools.'),
      learn: [
        L(B('الفايدة مش الميزة', 'Benefit, not feature'),
          B('الـ **feature** = إيه اللي الحاجة بتعملها («n8n queue mode»). الفايدة = إيه اللي ده بيعمله للعميل («your orders are never lost, even during a sale»). الجسر بينهم: «**which means**…». العميل بيشتري الفايدة.', 'A **feature** = what the thing does («n8n queue mode»). The benefit = what that does for the client («your orders are never lost, even during a sale»). The bridge between them: «**which means**…». The client buys the benefit.'),
          'feature: "We use a queue in front of n8n,"\nbridge: "which means"\nbenefit: "you won’t lose orders during a flash sale."\nfeature: "The bot drafts replies with AI and a pharmacist approves them,"\nbenefit: "so customers get answers in minutes, and nothing goes out unchecked."'),
        L(B('أرقام بحذر', 'Numbers with care'),
          B('اربط العرض بأرقام العميل نفسها، بس متوعدش بالظبط: «roughly», «in the region of», «we’d expect», «typically», «based on what you’ve told me». و**ballpark** = تقدير تقريبي — «Just to give you a ballpark, similar projects are around…».', 'Link the offer to the client’s own numbers, but do not promise exactly: «roughly», «in the region of», «we’d expect», «typically», «based on what you’ve told me». A **ballpark** = a rough estimate — «Just to give you a ballpark, similar projects are around…».'),
          '"Based on what you’ve told me, that’s roughly 55 hours a month."\n"We’d typically expect to automate about 80% of that."\n"Just to give you a ballpark, similar projects are in the region of 15 to 25 thousand pounds, depending on the integrations."'),
        L(B('الإثبات', 'Proof'),
          B('الـ **track record** بيقنع أكتر من الوعود: قصة عميل شبيه بنتيجة («A pharmacy chain we worked with went from losing 15% of night orders to zero»). وقول الـ **value statement** في جملة واحدة: إيه بتعمل ولمين وبأي نتيجة.', 'A **track record** persuades more than promises: a story of a similar client with a result («A pharmacy chain we worked with went from losing 15% of night orders to zero»). And say the **value statement** in one sentence: what you do, for whom, with what result.'),
          'value statement: "We help online shops in the Gulf stop doing orders by hand, so their teams save around 50 hours a month."\nproof: "A similar shop in Dubai now sends invoices within two minutes of payment, without anyone touching them."\n"Would something like that make a difference for you?"')
      ],
      practice: [
        B('حوّل 6 features لـ benefits بـ «which means».', 'Turn 6 features into benefits with «which means».'),
        B('اكتب 3 جمل أرقام بحذر.', 'Write 3 careful number sentences.'),
        B('اكتب value statement في جملة.', 'Write a one-sentence value statement.'),
        B('احكي قصة عميل في 3 جمل.', 'Tell a client story in 3 sentences.')
      ],
      words: [
        W('feature', 'ميزة/خاصية في المنتج', 'something a product does', 'Don’t lead with the feature.'),
        W('which means', 'وده معناه (جسر للفايدة)', 'a bridge from feature to benefit', 'It runs at night, which means no lost orders.'),
        W('ballpark', 'تقدير تقريبي', 'a rough estimate', 'Can you give me a ballpark figure?'),
        W('track record', 'سجل نجاحات سابقة', 'a history of past results', 'Our track record with shops is strong.'),
        W('value statement', 'جملة بتلخص قيمتك', 'a sentence summarising your value', 'Open with your value statement.')
      ],
      read: [{ lib: 'Ozdic collocations', what: B('دوّر على collocations لـ benefit وvalue.', 'Look up collocations for benefit and value.') }],
      challenge: B('اكتب «عرض دقيقتين» بالإنجليزي لخدمتك: value statement، 3 features بفوايدها، أرقام بحذر، وقصة عميل — وسجّله.', 'Write a two-minute English pitch for your service: a value statement, 3 features with their benefits, careful numbers and a client story — and record it.'),
      quiz: [
        Q(B('فايدة مش ميزة:', 'A benefit, not a feature:'), ['You won’t lose orders during a sale.', 'We use a Redis queue.', 'It has webhooks.'], 0, B('للعميل.', 'For the client.')),
        Q(B('تقدير تقريبي:', 'A rough estimate:'), ['a ballpark figure', 'an exact quote', 'a final invoice'], 0, B('ballpark.', 'Ballpark.')),
        Q(B('وعد بحذر:', 'A careful promise:'), ['We’d typically expect around 80%.', 'We guarantee 100%.', 'It will be perfect.'], 0, B('hedging.', 'Hedging.'))
      ] },

    { title: B('القفل والمتابعة', 'Closing and following up'),
      goal: B('كل مكالمة بتخلص بخطوة جاية واضحة.', 'Every call ends with a clear next step.'),
      learn: [
        L(B('الخطوة الجاية', 'The next step'),
          B('**close the call** بخطوة محددة بميعاد، مش «we’ll be in touch». اسأل: «What would be a good next step from your side?» واقترح: «How does Thursday sound for a 20-minute follow-up?». واعرف مين الـ **decision maker** والـ **timeline**: «Who else would be involved in the decision?».', '**close the call** with a specific step and a date, not «we’ll be in touch». Ask: «What would be a good next step from your side?» and suggest: «How does Thursday sound for a 20-minute follow-up?». And find out the **decision maker** and the **timeline**: «Who else would be involved in the decision?».'),
          '"What would be a good next step from your side?"\n"Who else would be involved in the decision?"\n"What timeline are you working towards?"\n"How about I send a short proposal by Wednesday, and we go through it on Thursday at 3?"'),
        L(B('إيميل المتابعة', 'The follow-up email'),
          B('**follow-up email** خلال ساعات: شكر، ملخص اللي فهمته (المشكلة والأرقام بكلامهم)، الخطوة الجاية بالميعاد، وأي مرفقات. قصير وواضح — العميل بيقراه على الموبايل، وبيبعته لمديره.', 'A **follow-up email** within hours: thanks, a summary of what you understood (the problem and numbers in their words), the next step with the date, and any attachments. Short and clear — the client reads it on a phone and forwards it to their manager.'),
          'Subject: Order automation — summary and next steps\n\nHi Sarah,\n\nThanks again for your time today. Here’s a quick summary:\n• About 35 wholesale orders a week, each taking ~25 minutes by hand\n• Roughly one in ten has a pricing error\n• Priority: invoices out within minutes of payment\n\nNext step: I’ll send a short proposal by Wednesday, and we’ll review it together on Thursday at 3 pm (Dubai time).\n\nBest regards,\nOmar'),
        L(B('المتابعة بلطف', 'Following up gently'),
          B('لو مفيش رد: **nudge** مهذب بعد 3–4 أيام، ومعاه قيمة (مقال، فكرة، سؤال سهل) مش «just checking in» بس. وبعد محاولتين أو تلاتة، سيب الباب مفتوح بلطف — الصبر بيكسب صفقات أكتر من الإلحاح.', 'If there is no reply: a polite **nudge** after 3–4 days, carrying value (an article, an idea, an easy question), not just «just checking in». After two or three attempts, leave the door open kindly — patience wins more deals than pressure.'),
          'nudge 1: "Hi Sarah, I thought this short case study might be useful — it’s a shop very similar to yours. Happy to discuss on Thursday if that still works."\nnudge 2: "Just a quick one: would it help if I split the proposal into a smaller first phase?"\nclose the loop: "I don’t want to fill your inbox, so I’ll leave it here for now. If the timing changes, I’d be glad to pick this up again."')
      ],
      practice: [
        B('اكتب 4 جمل قفل بخطوة وميعاد.', 'Write 4 closing lines with a step and a date.'),
        B('اكتب إيميل متابعة بعد مكالمة.', 'Write a follow-up email after a call.'),
        B('اكتب nudge بقيمة مضافة.', 'Write a nudge that adds value.'),
        B('اكتب إيميل «close the loop» مهذب.', 'Write a polite «close the loop» email.')
      ],
      words: [
        W('close the call', 'تنهي المكالمة بخطوة واضحة', 'to end a call with a clear step', 'Always close the call with a date.'),
        W('decision maker', 'الشخص اللي بيقرر', 'the person who decides', 'Is the owner the decision maker?'),
        W('timeline', 'الجدول الزمني المطلوب', 'the expected schedule', 'What timeline are you working towards?'),
        W('follow-up email', 'إيميل متابعة بعد المكالمة', 'an email after the call', 'Send the follow-up email the same day.'),
        W('nudge', 'تذكير لطيف', 'a gentle reminder', 'A nudge with a case study works well.')
      ],
      read: [{ lib: 'English with Lucy', what: B('دوّر على «email phrases».', 'Search for «email phrases».') }],
      challenge: B('بعد مكالمة تجريبية: اقفل بخطوة وميعاد، ابعت follow-up email خلال ساعة، وجهّز nudge وclose-the-loop — والأربعة بالإنجليزي من غير أخطاء (راجع بـ LanguageTool).', 'After a mock call: close with a step and a date, send a follow-up email within an hour, and prepare a nudge and a close-the-loop email — all four in error-free English (check with LanguageTool).'),
      quiz: [
        Q(B('أحسن قفل:', 'The best close:'), ['How does Thursday at 3 sound?', 'We’ll be in touch.', 'Bye.'], 0, B('ميعاد.', 'A date.')),
        Q(B('مين بيقرر؟', 'Who decides?'), ['Who else would be involved in the decision?', 'Are you the boss?', 'Can you decide now?'], 0, B('مهذب.', 'Polite.')),
        Q(B('nudge كويس:', 'A good nudge:'), ['shares something useful', 'says only «any update?»', 'complains about the delay'], 0, B('قيمة.', 'Value.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('مكالمة بيع كاملة بالإنجليزي.', 'A complete sales call in English.'),
      review: [
        B('الافتتاح: rapport وice-breaker وtime check وأجندة بموافقة.', 'Opening: rapport, an ice-breaker, a time check and an agreed agenda.'),
        B('أسئلة مفتوحة وغير مباشرة ومتتابعة.', 'Open, indirect and follow-up questions.'),
        B('السماع: back-channelling وreflect back والتوضيح والمقاطعة المهذبة.', 'Listening: back-channelling, reflecting back, clarifying and polite interruptions.'),
        B('الفايدة بـ «which means»، والأرقام بحذر، والإثبات.', 'Benefits with «which means», careful numbers and proof.'),
        B('القفل بميعاد، إيميل المتابعة، والـ nudges.', 'Closing with a date, the follow-up email and nudges.')
      ],
      project: B('سجّل مكالمة اكتشاف كاملة 25 دقيقة بالإنجليزي (مع صاحب يمثّل دور عميل أجنبي): افتتاح، 10+ أسئلة (منها غير مباشرة ومتتابعة)، تلخيصين، عرض قيمة دقيقتين، قفل بميعاد — وبعدها إيميل متابعة. راجع التسجيل واكتب 5 تحسينات.', 'Record a complete 25-minute discovery call in English (a friend playing an international client): opening, 10+ questions (including indirect and follow-up ones), two summaries, a two-minute value pitch, a close with a date — then a follow-up email. Review the recording and write 5 improvements.'),
      test: [
        Q(B('rapport:', 'Rapport:'), ['trust and ease between people', 'a sales report', 'a price list'], 0, B('علاقة.', 'Relationship.')),
        Q(B('time check:', 'A time check:'), ['Do we still have about 30 minutes?', 'What time is it?', 'Hurry up.'], 0, B('مهذب.', 'Polite.')),
        Q(B('سؤال مفتوح:', 'An open question:'), ['How do you currently handle invoices?', 'Do you have invoices?', 'Is it OK?'], 0, B('تفاصيل.', 'Details.')),
        Q(B('صيغة غير مباشرة صحيحة:', 'A correct indirect form:'), ['Could you tell me when you need it?', 'Could you tell me when do you need it?', 'When you need it?'], 0, B('ترتيب.', 'Word order.')),
        Q(B('سؤال متتابع:', 'A follow-up question:'), ['Roughly how long does that take each week?', 'Next topic.', 'I see.'], 0, B('رقم.', 'A number.')),
        Q(B('back-channelling:', 'Back-channelling:'), ['Mm-hmm, that makes sense.', 'Let me finish.', 'No comment.'], 0, B('سماع.', 'Listening.')),
        Q(B('تأكيد الفهم:', 'Checking understanding:'), ['Let me check I’ve got this right…', 'You’re wrong.', 'Whatever.'], 0, B('reflect back.', 'Reflect back.')),
        Q(B('جسر الفايدة:', 'The benefit bridge:'), ['which means', 'because of', 'in spite of'], 0, B('فايدة.', 'Benefit.')),
        Q(B('ballpark figure:', 'A ballpark figure:'), ['a rough estimate', 'an exact price', 'a discount'], 0, B('تقريبي.', 'Rough.')),
        Q(B('value statement:', 'A value statement:'), ['what you do, for whom, with what result', 'your CV', 'your logo'], 0, B('جملة.', 'One sentence.')),
        Q(B('قفل المكالمة:', 'Closing the call:'), ['a specific next step and date', '«we’ll be in touch»', 'hanging up'], 0, B('خطوة.', 'A step.')),
        Q(B('إيميل المتابعة فيه:', 'A follow-up email contains:'), ['thanks, a summary and the next step', 'only the price', 'a long history of your company'], 0, B('مختصر.', 'Concise.'))
      ] }
  ]
};
