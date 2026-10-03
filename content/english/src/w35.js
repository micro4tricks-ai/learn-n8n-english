// English week 35 — Giving feedback and mentoring.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('تقديم الملاحظات والإرشاد', 'Giving feedback and mentoring'),
  goal: B('تدّي وتستقبل ملاحظات بالإنجليزي بطريقة بتبني الناس مش بتجرحهم، وتدير جلسات إرشاد بأسئلة واستماع، ومقابلات فردية بتساعد في النمو.',
          'Give and receive feedback in English in a way that builds people up rather than hurts them, run mentoring sessions with questions and listening, and hold one-to-ones that support growth.'),
  days: [
    { title: B('نموذج SBI', 'The SBI model'),
      goal: B('تدّي ملاحظة محددة ومفيدة في 3 جمل.', 'Give specific, useful feedback in 3 sentences.'),
      learn: [
        L(B('موقف، سلوك، أثر', 'Situation, behaviour, impact'),
          B('**SBI model**: **Situation** (إمتى وفين)، **Behaviour** (اللي عمله بالظبط — حاجة اتشافت مش رأي في شخصيته)، **Impact** (الأثر). «In yesterday’s client call (S), you explained the queue with a diagram (B). The client understood it immediately and approved the budget (I).»', 'The **SBI model**: **Situation** (when and where), **Behaviour** (exactly what they did — something observed, not a judgement of character), **Impact** (the effect). «In yesterday’s client call (S), you explained the queue with a diagram (B). The client understood it immediately and approved the budget (I).»'),
          'S: In Monday’s stand-up\nB: you shared the blocker in the first minute\nI: Omar unblocked you before lunch'),
        L(B('سلوك مش شخصية', 'Behaviour, not personality'),
          B('«You’re careless» هجوم على الشخص. «The last two PRs had no tests» سلوك يتشاف ويتغيّر. اوصف اللي حصل بالظبط، من غير «always» و«never» اللي بتخلّي الشخص يدافع.', '«You’re careless» attacks the person. «The last two PRs had no tests» is a behaviour that can be seen and changed. Describe exactly what happened, without «always» and «never», which make people defensive.'),
          '✗ "You never test anything."\n✓ "The last two PRs were merged without tests."'),
        L(B('في وقتها ومتوازنة', 'Timely and balanced'),
          B('الملاحظة **timely** (قريبة من الحدث) أقوى من ملاحظة بعد شهرين. واِدّي **praise** محددة كتير — مش بس لما فيه مشكلة: الناس بتكرر اللي اتشكروا عليه بالتحديد. «Great job» ضعيفة؛ «The error messages you wrote are so clear that support tickets dropped» قوية.', '**Timely** feedback (close to the event) beats feedback two months later. Give specific **praise** often — not only when there is a problem: people repeat what they were specifically thanked for. «Great job» is weak; «The error messages you wrote are so clear that support tickets dropped» is strong.'),
          '"Thanks for the runbook — during last night’s alert I fixed it in five minutes because of it."')
      ],
      practice: [
        B('اكتب 3 ملاحظات إيجابية بـ SBI لناس حقيقيين.', 'Write 3 positive SBI feedback notes for real people.'),
        B('حوّل 5 جمل عن الشخصية لجمل عن السلوك.', 'Turn 5 personality sentences into behaviour sentences.'),
        B('شيل always وnever من 3 ملاحظات.', 'Remove always and never from 3 feedback notes.'),
        B('ابعت ملاحظة شكر محددة لحد النهارده.', 'Send someone a specific thank-you note today.')
      ],
      words: [
        W('sbi model', 'موقف، سلوك، أثر', 'situation, behaviour, impact', 'Use the SBI model for feedback.'),
        W('behaviour', 'السلوك اللي اتشاف', 'what someone observably did', 'Describe the behaviour, not the person.'),
        W('constructive', 'بنّاء وهدفه التحسين', 'helpful and aimed at improvement', 'Give constructive feedback in private.'),
        W('praise', 'مدح وتقدير', 'words of approval', 'Specific praise is remembered.'),
        W('timely', 'في وقته', 'happening at the right time', 'Feedback should be timely.')
      ],
      read: [{ t: 'Center for Creative Leadership: SBI feedback model', url: 'https://www.ccl.org/articles/leading-effectively-articles/closing-the-gap-between-intent-vs-impact-sbii/', what: B('اقرا النموذج والأمثلة.', 'Read the model and the examples.') }],
      challenge: B('اكتب 5 ملاحظات SBI (3 إيجابية و2 للتحسين) لزملاء أو لنفسك من مشاريع الرحلة، كلها سلوك محدد وفي وقتها.', 'Write 5 SBI feedback notes (3 positive, 2 for improvement) for colleagues or yourself from journey projects, all about specific, recent behaviour.'),
      quiz: [
        Q(B('في SBI حرف B:', 'In SBI, B stands for:'), ['behaviour', 'budget', 'bug'], 0, B('السلوك.', 'Behaviour.')),
        Q(B('ملاحظة أحسن:', 'Better feedback:'), ['«The last two PRs had no tests.»', '«You are lazy.»', '«You never test.»'], 0, B('سلوك.', 'Behaviour.')),
        Q(B('مدح قوي:', 'Strong praise:'), ['specific, with its impact', '«Good job»', 'only once a year'], 0, B('محدد.', 'Specific.'))
      ] },

    { title: B('صياغة النقد البنّاء', 'Wording constructive criticism'),
      goal: B('تقول ملاحظة صعبة بلطف ووضوح.', 'Say difficult feedback kindly and clearly.'),
      learn: [
        L(B('الملطّفات', 'Softeners'),
          B('**softeners** بتخفف من غير ما تخفي الرسالة: «I noticed that…»، «One thing that might help is…»، «I wonder if…»، «Have you considered…?»، «It might be worth…». الهدف: رسالة واضحة بنبرة مش هجومية.', '**Softeners** reduce the sting without hiding the message: «I noticed that…», «One thing that might help is…», «I wonder if…», «Have you considered…?», «It might be worth…». The goal: a clear message in a non-aggressive tone.'),
          '"I noticed the error handling only logs the message. It might be worth adding the order id, so we can trace failures faster."'),
        L(B('«and» بدل «but»', '«and» instead of «but»'),
          B('«Great work, but the tests are missing» — كلمة **but** بتمسح المدح. «Great work on the design, and adding tests would make it ready to merge» أحسن. أو افصلهم: مدح لوحده وملاحظة لوحدها.', '«Great work, but the tests are missing» — **but** erases the praise. «Great work on the design, and adding tests would make it ready to merge» is better. Or separate them: praise on its own and the note on its own.'),
          '✗ "Nice PR, but no tests."\n✓ "The structure is really clean. Adding tests for the empty-list case would make it ready."'),
        L(B('أسئلة بدل أوامر', 'Questions instead of orders'),
          B('سؤال بيخلّي الشخص يفكّر ويلاقي الحل بنفسه: «What happens if the API returns an empty list here?» أقوى من «Handle the empty list». وفي مراجعة الكود: «What do you think about…?».', 'A question makes the person think and find the fix themselves: «What happens if the API returns an empty list here?» is stronger than «Handle the empty list». In code review: «What do you think about…?».'),
          '"What do you think would happen if two webhooks arrived at the same time?"')
      ],
      practice: [
        B('أعد كتابة 6 ملاحظات حادة بملطفات.', 'Rewrite 6 harsh comments with softeners.'),
        B('صلّح 4 جمل «praise, but…».', 'Fix 4 «praise, but…» sentences.'),
        B('حوّل 5 أوامر مراجعة لأسئلة.', 'Turn 5 review orders into questions.'),
        B('سجّل ملاحظة صعبة بنبرة هادية.', 'Record a difficult piece of feedback in a calm tone.')
      ],
      words: [
        W('softener', 'كلمة بتخفف حدة الكلام', 'a word that makes a message gentler', '«Might» is a useful softener.'),
        W('i noticed', 'عبارة بتبدأ بيها ملاحظة بلطف', 'a gentle way to start a remark', 'I noticed the tests are failing.'),
        W('have you considered', 'عبارة بتقترح بلطف', 'a gentle way to suggest', 'Have you considered caching the result?'),
        W('it might be worth', 'ممكن يستاهل', 'it could be useful to', 'It might be worth adding a retry.'),
        W('harsh', 'قاسي/حاد', 'unkind or too strong', 'The comment sounded harsh.')
      ],
      read: ['lib:Conventional Comments', 'lib:Human code reviews'],
      challenge: B('راجع كود (بتاعك القديم أو مشروع مفتوح) واكتب 8 تعليقات مراجعة: ملطفات، أسئلة، مدح منفصل، ومن غير «but» اللي بتمسح.', 'Review some code (your old code or an open project) and write 8 review comments: softeners, questions, separate praise, and no erasing «but».'),
      quiz: [
        Q(B('ملاحظة بملطف:', 'A comment with a softener:'), ['«It might be worth adding a retry.»', '«Add a retry now.»', '«This is wrong.»'], 0, B('لطيفة وواضحة.', 'Gentle and clear.')),
        Q(B('«Nice work, but…» مشكلتها:', 'The problem with «Nice work, but…»:'), ['«but» erases the praise', 'it is too short', 'nothing'], 0, B('and أو افصل.', 'Use and, or separate.')),
        Q(B('سؤال بدل أمر:', 'A question instead of an order:'), ['«What happens if the list is empty?»', '«Fix the empty list.»', '«Bad code.»'], 0, B('يفكّر بنفسه.', 'They think it through.'))
      ] },

    { title: B('استقبال الملاحظات', 'Receiving feedback'),
      goal: B('تسمع النقد من غير ما تدافع، وتستفيد منه.', 'Hear criticism without getting defensive, and benefit from it.'),
      learn: [
        L(B('اشكر واسمع', 'Thank and listen'),
          B('أول رد على أي ملاحظة: «Thanks for telling me.» حتى لو مش موافق. متقاطعش، ومتبدأش بـ «Yes, but…». الشخص اللي ادّاك ملاحظة خاطر بعلاقته معاك عشانك.', 'The first reply to any feedback: «Thanks for telling me.» Even if you disagree. Do not interrupt, and do not start with «Yes, but…». The person giving feedback risked the relationship for your sake.'),
          '"Thanks for pointing that out — I hadn’t noticed."'),
        L(B('اسأل للتوضيح', 'Ask to clarify'),
          B('بدل ما تبقى **defensive** (تدافع)، اسأل: «Could you give me an example?» «What would you have done differently?» «What would good look like?». الأسئلة بتحوّل الملاحظة الغامضة لخطوة تقدر تعملها.', 'Instead of getting **defensive**, ask: «Could you give me an example?» «What would you have done differently?» «What would good look like?». Questions turn vague feedback into a step you can take.'),
          'Feedback: "Your updates are confusing."\nYou: "Thanks. Could you show me one that was confusing? What would have made it clearer?"'),
        L(B('خطة ومتابعة', 'Plan and follow up'),
          B('**take on board** (خد الملاحظة في الاعتبار) واكتب خطوة: «I’ll start each update with the status in one line.» وبعد أسبوعين ارجع: «I’ve been trying the one-line status. Is it better?». ده بيبني ثقة كبيرة.', '**Take it on board** and write a step: «I’ll start each update with the status in one line.» Two weeks later go back: «I’ve been trying the one-line status. Is it better?». This builds a lot of trust.'),
          '"I’ve taken that on board. Starting today, each update begins with the status. Can I check with you in two weeks?"')
      ],
      practice: [
        B('اكتب 5 ردود شكر على ملاحظات مختلفة.', 'Write 5 thank-you replies to different feedback.'),
        B('اكتب 6 أسئلة توضيح.', 'Write 6 clarifying questions.'),
        B('اطلب ملاحظة من حد على شغلك هذا الأسبوع.', 'Ask someone for feedback on your work this week.'),
        B('اكتب خطة ومتابعة لملاحظة استلمتها.', 'Write a plan and follow-up for feedback you received.')
      ],
      words: [
        W('receive feedback', 'تستقبل الملاحظات', 'to take in comments on your work', 'Learn to receive feedback calmly.'),
        W('defensive', 'بيدافع عن نفسه بزيادة', 'quick to protect yourself', 'Try not to be defensive.'),
        W('take on board', 'تاخد بالكلام وتعمل بيه', 'to accept and act on', 'I’ll take that on board.'),
        W('fair comment', 'ملاحظة في محلها', 'a criticism that is reasonable', 'Fair comment — I’ll fix the naming.'),
        W('blind spot', 'نقطة مش واخد بالك منها في نفسك', 'something about yourself you cannot see', 'Feedback reveals your blind spots.')
      ],
      read: ['lib:engVid', { lib: 'Toastmasters', what: B('دوّر على «evaluation» عندهم.', 'Look up their «evaluation» approach.') }],
      challenge: B('اطلب ملاحظات من 3 أشخاص على حاجة عملتها (كتابة، كود، عرض) بالإنجليزي، واستقبلها بالخطوات (شكر، أسئلة، خطة)، وتابع معاهم بعد أسبوع.', 'Ask 3 people for feedback in English on something you made (writing, code, a presentation), receive it with the steps (thanks, questions, plan), and follow up with them a week later.'),
      quiz: [
        Q(B('أول رد على ملاحظة:', 'The first reply to feedback:'), ['«Thanks for telling me.»', '«Yes, but…»', '«That’s not true.»'], 0, B('شكر.', 'Thanks.')),
        Q(B('ملاحظة غامضة:', 'Vague feedback:'), ['ask for an example', 'ignore it', 'argue'], 0, B('توضيح.', 'Clarify.')),
        Q(B('take on board:', '«Take on board» means:'), ['accept and act on it', 'get on a ship', 'reject it'], 0, B('تعمل بيه.', 'Act on it.'))
      ] },

    { title: B('جلسات الإرشاد', 'Mentoring sessions'),
      goal: B('ترشد حد أصغر منك بأسئلة واستماع مش بمحاضرة.', 'Mentor someone more junior with questions and listening, not lectures.'),
      learn: [
        L(B('مرشد ومتعلّم', 'Mentor and mentee'),
          B('**mentor** (المرشد) دوره يساعد **mentee** (المتعلّم) يفكّر ويلاقي طريقه، مش يحل مكانه. ابدأ كل جلسة بسؤال: «What would you like to focus on today?» الجلسة ملك المتعلّم.', 'The **mentor**’s role is to help the **mentee** think and find their way, not to solve things for them. Start each session with a question: «What would you like to focus on today?» The session belongs to the mentee.'),
          '"What would you like to get out of today’s session?"'),
        L(B('أسئلة الكوتشينج', 'Coaching questions'),
          B('**coaching questions** مفتوحة: «What have you tried so far?» «What options do you see?» «What’s stopping you?» «What would you do if you weren’t afraid of getting it wrong?» «What’s one small step for this week?». قلّل «Why didn’t you…?» لأنها بتبان لوم.', '**Coaching questions** are open: «What have you tried so far?» «What options do you see?» «What’s stopping you?» «What would you do if you weren’t afraid of getting it wrong?» «What’s one small step for this week?». Avoid «Why didn’t you…?» because it sounds like blame.'),
          'goal → reality → options → next step\n"What have you tried?" → "What else could you try?" → "Which will you do first?"'),
        L(B('الاستماع الفعّال', 'Active listening'),
          B('**active listening**: سيبه يخلّص، أعد بكلامك («So the hard part is…»)، اسأل عن الشعور مش بس الحقايق («How did that feel?»)، واستحمل الصمت. والنصيحة المباشرة مسموحة لما يطلبها: «Would it help if I shared what I did in a similar case?».', '**Active listening**: let them finish, restate in your words («So the hard part is…»), ask about feelings, not only facts («How did that feel?»), and tolerate silence. Direct advice is fine when invited: «Would it help if I shared what I did in a similar case?».'),
          '"So the hard part isn’t the code, it’s explaining delays to the client. Would it help if I shared how I handle that?"')
      ],
      practice: [
        B('اكتب 12 سؤال كوتشينج مرتّبين (هدف، واقع، خيارات، خطوة).', 'Write 12 coaching questions in order (goal, reality, options, step).'),
        B('اعمل جلسة 15 دقيقة مع زميل أو AI بيلعب متعلّم.', 'Hold a 15-minute session with a colleague or an AI playing a mentee.'),
        B('سجّل كام مرة سألت وكام مرة نصحت.', 'Count how often you asked versus advised.'),
        B('اكتب 4 جمل إعادة للتأكد من الفهم.', 'Write 4 restating sentences to check understanding.')
      ],
      words: [
        W('mentor', 'مرشد بيساعد حد أقل خبرة', 'an experienced guide who helps someone grow', 'My mentor helped me plan my career.'),
        W('mentee', 'الشخص اللي بيتعلم من مرشد', 'the person being mentored', 'The mentee chose today’s topic.'),
        W('coaching question', 'سؤال مفتوح بيخلّي الشخص يفكّر', 'an open question that helps someone think', 'Ask a coaching question instead of giving the answer.'),
        W('active listening', 'استماع بتركيز وإعادة وتأكد', 'listening with focus, restating and checking', 'Active listening builds trust.'),
        W('sounding board', 'حد بتجرّب أفكارك عليه', 'someone you test ideas on', 'A mentor can be a sounding board.')
      ],
      read: ['lib:Toastmasters', { lib: 'TED Talks', what: B('دوّر على talk عن الاستماع.', 'Find a talk about listening.') }],
      challenge: B('أدر 3 جلسات إرشاد قصيرة (لزميل أصغر، أو صاحب بيتعلم، أو AI) بالإنجليزي: سؤال الافتتاح، أسئلة كوتشينج، استماع فعّال، وخطوة واحدة في الآخر — واكتب ملاحظاتك عن نفسك.', 'Hold 3 short English mentoring sessions (with a junior colleague, a learning friend or an AI): the opening question, coaching questions, active listening and one step at the end — and write notes on your own performance.'),
      quiz: [
        Q(B('الجلسة ملك:', 'The session belongs to:'), ['the mentee', 'the mentor', 'the company'], 0, B('هو يحدد الموضوع.', 'They choose the topic.')),
        Q(B('سؤال كوتشينج:', 'A coaching question:'), ['«What have you tried so far?»', '«Why didn’t you do it?»', '«Do it my way.»'], 0, B('مفتوح.', 'Open.')),
        Q(B('النصيحة المباشرة:', 'Direct advice is best:'), ['when the mentee asks for it', 'always, first', 'never'], 0, B('بإذن.', 'When invited.'))
      ] },

    { title: B('المقابلات الفردية والنمو', 'One-to-ones and growth'),
      goal: B('تدير مقابلة فردية بتخلّي الشخص ينمو.', 'Run a one-to-one that helps the person grow.'),
      learn: [
        L(B('الـ 1:1', 'The 1:1'),
          B('**one-on-one** (1:1) = اجتماع منتظم قصير (30 دقيقة كل أسبوعين) بين مدير وفرد، أو بين زميلين. أجندته بتاعة الفرد: مشاكل، أفكار، نمو. مش تقرير حالة (ده في الـ stand-up).', 'A **one-on-one** (1:1) = a short regular meeting (30 minutes every two weeks) between a manager and a person, or two colleagues. The agenda belongs to the person: problems, ideas, growth. It is not a status report (that is the stand-up).'),
          '1:1 agenda (theirs): 1) the CRM migration feels stuck 2) want to learn TypeScript 3) feedback for me?'),
        L(B('أسئلة النمو', 'Growth questions'),
          B('اسأل عن الطاقة والاتجاه: «What has energised you lately? What drained you?» «Where do you want to be in a year?» واتفقوا على **stretch goal** (هدف صعب شوية بس ممكن): «Lead the next client demo.»', 'Ask about energy and direction: «What has energised you lately? What drained you?» «Where do you want to be in a year?» Agree on a **stretch goal** (a little hard but possible): «Lead the next client demo.»'),
          'career goal: become the team’s automation lead in a year\nstretch goal this month: run the client demo alone'),
        L(B('المتابعة المكتوبة', 'Written follow-up'),
          B('بعد الـ 1:1 اكتب في ملف مشترك: اللي اتكلمتوا فيه، الخطوات، وأي ملاحظة. وفي الـ 1:1 الجاية ابدأ بيها: «Last time we said you’d try X — how did it go?». ده بيوري إنك فاكر ومهتم.', 'After the 1:1, write in a shared file: what you discussed, the steps and any feedback. Start the next 1:1 with it: «Last time we said you’d try X — how did it go?». This shows you remember and care.'),
          '1:1 notes — 9 Oct\n- Wants TypeScript → pair on the next node (me)\n- Stretch goal: lead the demo on 20 Oct\nNext: check how the demo prep is going')
      ],
      practice: [
        B('اكتب أجندة 1:1 من وجهة نظر الفرد.', 'Write a 1:1 agenda from the person’s point of view.'),
        B('اكتب 8 أسئلة نمو.', 'Write 8 growth questions.'),
        B('اكتب stretch goal لنفسك ولزميل.', 'Write a stretch goal for yourself and a colleague.'),
        B('اكتب ملاحظات 1:1 بالشكل ده.', 'Write 1:1 notes in this format.')
      ],
      words: [
        W('one-on-one', 'اجتماع فردي منتظم', 'a regular meeting between two people', 'Our one-on-one is every other Monday.'),
        W('check in', 'تطمن على حد أو حاجة', 'to briefly ask how someone or something is', 'Let’s check in next week.'),
        W('career goal', 'هدف مهني', 'a goal for your working life', 'Her career goal is to lead a team.'),
        W('stretch goal', 'هدف صعب شوية بس ممكن', 'a challenging but reachable goal', 'Running the demo is a stretch goal.'),
        W('energised', 'متحمس ومليان طاقة', 'full of energy and motivation', 'The new project energised him.')
      ],
      read: ['lib:The Pragmatic Engineer (blog)', { lib: 'Joel on Software', what: B('دوّر على مقال عن إدارة الفرق.', 'Find an article on managing teams.') }],
      challenge: B('اعمل 1:1 حقيقي أو تمثيل 20 دقيقة بالإنجليزي: أجندة الفرد، أسئلة نمو، stretch goal، وملاحظات مكتوبة — وجهّز سؤال المتابعة للمرة الجاية.', 'Hold a real or role-played 20-minute 1:1 in English: the person’s agenda, growth questions, a stretch goal and written notes — and prepare the follow-up question for next time.'),
      quiz: [
        Q(B('أجندة الـ 1:1 ملك:', 'The 1:1 agenda belongs to:'), ['the person, not the manager', 'the manager', 'the client'], 0, B('الفرد.', 'The person.')),
        Q(B('stretch goal:', 'A stretch goal is:'), ['challenging but reachable', 'impossible', 'very easy'], 0, B('نمو.', 'Growth.')),
        Q(B('ابدأ الـ 1:1 الجاية بـ:', 'Start the next 1:1 with:'), ['the follow-up from last time', 'a status report', 'a complaint'], 0, B('متابعة.', 'Follow-up.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تبني الناس بكلامك بالإنجليزي.', 'Build people up with your words in English.'),
      review: [
        B('SBI، السلوك مش الشخصية، والمدح المحدد في وقته.', 'SBI, behaviour not personality, and specific, timely praise.'),
        B('الملطّفات، «and» بدل «but»، والأسئلة بدل الأوامر.', 'Softeners, «and» instead of «but», and questions instead of orders.'),
        B('استقبال الملاحظات: شكر، أسئلة، خطة، متابعة.', 'Receiving feedback: thanks, questions, a plan, follow-up.'),
        B('الإرشاد: أسئلة الكوتشينج والاستماع الفعّال.', 'Mentoring: coaching questions and active listening.'),
        B('الـ 1:1: أجندة الفرد، أسئلة النمو، stretch goal، والمتابعة.', 'The 1:1: the person’s agenda, growth questions, a stretch goal and follow-up.')
      ],
      project: B('اعمل «ملف قيادة» بالإنجليزي: 6 ملاحظات SBI مكتوبة، 10 تعليقات مراجعة كود بالأسلوب البنّاء، تسجيل جلسة إرشاد 15 دقيقة، ملاحظات 2 مقابلات 1:1، وتقييم ذاتي عن طريقتك في الملاحظات قبل وبعد الأسبوع ده.', 'Build an English «leadership file»: 6 written SBI notes, 10 constructive code review comments, a recorded 15-minute mentoring session, notes from two 1:1s, and a self-assessment of how you give feedback before and after this week.'),
      test: [
        Q(B('SBI:', 'SBI is:'), ['situation, behaviour, impact', 'start, build, improve', 'speed, bugs, issues'], 0, B('نموذج.', 'A model.')),
        Q(B('ملاحظة عن السلوك:', 'Feedback about behaviour:'), ['«The PR was merged without tests.»', '«You are careless.»', '«You always fail.»'], 0, B('اتشاف.', 'Observed.')),
        Q(B('ملاحظة في وقتها:', 'Timely feedback:'), ['close to the event', 'months later', 'never'], 0, B('timely.', 'Timely.')),
        Q(B('softener:', 'A softener:'), ['«It might be worth…»', '«Do this now.»', '«Wrong.»'], 0, B('لطيف.', 'Gentle.')),
        Q(B('بدل «Nice, but…»:', 'Instead of «Nice, but…»:'), ['use «and» or separate the two', 'use «however» louder', 'skip praise'], 0, B('المدح يفضل.', 'Keep the praise.')),
        Q(B('defensive:', 'Defensive means:'), ['quick to protect yourself', 'open to feedback', 'quiet'], 0, B('بيدافع.', 'Self-protective.')),
        Q(B('ملاحظة غامضة اتقالتلك:', 'You got vague feedback:'), ['ask for an example', 'deny it', 'leave'], 0, B('توضيح.', 'Clarify.')),
        Q(B('mentee:', 'A mentee is:'), ['the person being mentored', 'the mentor', 'a manager'], 0, B('المتعلّم.', 'The learner.')),
        Q(B('أحسن سؤال كوتشينج:', 'The best coaching question:'), ['«What options do you see?»', '«Why didn’t you think?»', '«Do you agree with me?»'], 0, B('مفتوح.', 'Open.')),
        Q(B('active listening فيه:', 'Active listening includes:'), ['restating what you heard', 'interrupting', 'checking your phone'], 0, B('إعادة.', 'Restating.')),
        Q(B('1:1 مش:', 'A 1:1 is not:'), ['a status report', 'about growth', 'regular'], 0, B('ده stand-up.', 'That is the stand-up.')),
        Q(B('stretch goal مثال:', 'An example stretch goal:'), ['lead the next client demo', 'come to work', 'do nothing'], 0, B('تحدي ممكن.', 'A reachable challenge.'))
      ] }
  ]
};
