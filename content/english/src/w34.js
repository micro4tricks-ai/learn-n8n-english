// English week 34 — Persuasion and handling objections.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('الإقناع والرد على الاعتراضات', 'Persuasion and handling objections'),
  goal: B('تقنع بالإنجليزي من غير ضغط: حجة مرتبة، بلغة مصلحة اللي قدامك، ورد هادي على الاعتراضات، وتفاوض بمقايضات، و«لأ» مهذبة بتحافظ على العلاقة.',
          'Persuade in English without pressure: a well-ordered argument in the listener’s interests, calm answers to objections, negotiation through trade-offs, and a polite «no» that keeps the relationship.'),
  days: [
    { title: B('هيكل الحجة', 'The structure of an argument'),
      goal: B('ترتّب كلامك بحيث يتفهم ويقنع في دقيقة.', 'Order your words so they are understood and convincing in a minute.'),
      learn: [
        L(B('PREP', 'PREP'),
          B('**PREP structure**: **P**oint (رأيك في جملة)، **R**eason (ليه)، **E**xample (مثال أو رقم)، **P**oint (رأيك تاني). بسيط ومناسب للاجتماعات والرسايل. «I recommend a queue. Our bursts are 40× normal traffic. Last campaign we lost 60 orders. So a queue is the safest option.»', 'The **PREP structure**: **P**oint (your view in one sentence), **R**eason (why), **E**xample (an example or a number), **P**oint (your view again). Simple and good for meetings and messages. «I recommend a queue. Our bursts are 40× normal traffic. Last campaign we lost 60 orders. So a queue is the safest option.»'),
          'Point: I recommend a queue.\nReason: bursts are 40× normal traffic.\nExample: we lost 60 orders last campaign.\nPoint: so a queue is the safest option.'),
        L(B('الدليل', 'Evidence'),
          B('**supporting evidence** أقوى من الصفات: رقم من شغلك، تجربة صغيرة، أو مصدر محترم. «It’s much better» ضعيف؛ «It cut response time from 3 s to 0.8 s in our test» قوي. ولو مش متأكد، قول ده.', '**Supporting evidence** beats adjectives: a number from your work, a small experiment, or a respected source. «It’s much better» is weak; «It cut response time from 3 s to 0.8 s in our test» is strong. If you are unsure, say so.'),
          'weak: "It’s way faster."\nstrong: "In our test with 1,000 orders, it was 3.7× faster."'),
        L(B('الفايدة ليه', 'The benefit for them'),
          B('اختم الحجة بـ **benefit** للشخص اللي قدامك: «This means fewer angry customers on campaign nights» أو «You won’t need to check the sheet manually anymore». الناس بتقتنع بنتايج ليهم، مش بتقنيات.', 'End the argument with the **benefit** for the person in front of you: «This means fewer angry customers on campaign nights» or «You won’t need to check the sheet manually anymore». People are persuaded by results for them, not by technologies.'),
          '"…which means no more late-night calls about lost orders."')
      ],
      practice: [
        B('اكتب 3 حجج بـ PREP لقرارات في مشروعك.', 'Write 3 PREP arguments for decisions in your project.'),
        B('بدّل كل صفة في حجة بدليل أو رقم.', 'Replace every adjective in an argument with evidence or a number.'),
        B('اختم كل حجة بفايدة للمستمع.', 'End each argument with a benefit for the listener.'),
        B('قول حجة واحدة بصوت عالي في 45 ثانية.', 'Say one argument aloud in 45 seconds.')
      ],
      words: [
        W('persuade', 'يقنع', 'to convince', 'Use numbers to persuade the client.'),
        W('prep structure', 'نقطة، سبب، مثال، نقطة', 'point, reason, example, point', 'The PREP structure keeps you short.'),
        W('supporting evidence', 'الدليل اللي بيدعم الرأي', 'proof backing your view', 'Bring supporting evidence from the test.'),
        W('reasoning', 'طريقة التفكير اللي وراك', 'the logic behind your view', 'Explain your reasoning step by step.'),
        W('benefit', 'الفايدة', 'an advantage someone gets', 'The benefit is fewer angry customers.')
      ],
      read: ['lib:TED Talks', { lib: 'Toastmasters', what: B('دوّر على نصايح «persuasive speaking».', 'Look for tips on «persuasive speaking».') }],
      challenge: B('اختار قرار عايز تقنع بيه عميل أو مدير، واكتب حجة PREP بدليل وفايدة، وسجّلها في دقيقة، وأعد تسجيلها بعد ما تقلل الكلام 20%.', 'Choose a decision you want a client or manager to accept, write a PREP argument with evidence and a benefit, record it in one minute, then re-record it with 20% fewer words.'),
      quiz: [
        Q(B('PREP بتبدأ وتنتهي بـ:', 'PREP starts and ends with:'), ['your point', 'a joke', 'a question'], 0, B('النقطة.', 'The point.')),
        Q(B('أقوى دليل:', 'The strongest evidence:'), ['«3.7× faster in our 1,000-order test»', '«much better»', '«everyone says so»'], 0, B('رقم.', 'A number.')),
        Q(B('اختم بـ:', 'End with:'), ['the benefit for the listener', 'technical details', 'an apology'], 0, B('مصلحته.', 'Their interest.'))
      ] },

    { title: B('كلّم مصلحة المستمع', 'Speak to the listener’s interests'),
      goal: B('تغيّر نفس الحجة حسب اللي قدامك.', 'Adapt the same argument to the person in front of you.'),
      learn: [
        L(B('إيه اللي يهمه؟', 'What do they care about?'),
          B('اسأل: **what’s in it for them**؟ صاحب البيزنس: فلوس وعملاء. المدير المالي: تكلفة ومخاطرة. المدير التقني: صيانة وأمان. الموظف: وقت ومجهود أقل. نفس الحل، 4 حجج مختلفة.', 'Ask: **what’s in it for them**? A business owner: money and customers. A finance manager: cost and risk. A technical lead: maintenance and security. An employee: less time and effort. The same solution, four different arguments.'),
          'owner: "no lost orders on campaign nights"\nfinance: "$20/month instead of losing ≈ 18,000 EGP per campaign"\ntech lead: "uses Postgres we already run; no new service"'),
        L(B('اسمع قبل ما تقنع', 'Listen before persuading'),
          B('قبل الحجة، اسأل سؤالين: «What worries you most about this?» «What would success look like for you?». الإجابات بتقولك تحط الحجة إزاي. الإقناع من غير سماع = محاضرة.', 'Before the argument, ask two questions: «What worries you most about this?» «What would success look like for you?». The answers tell you how to frame the argument. Persuasion without listening = a lecture.'),
          '"Before I go into details — what worries you most about changing the intake?"'),
        L(B('التأييد (buy-in)', 'Getting buy-in'),
          B('**buy-in** = إن الناس تبقى مقتنعة ومشاركة، مش بس موافقة. اشركهم بدري: «I’d love your input on the rollout plan.» الناس بتدعم اللي ساعدت تبنيه.', '**Buy-in** = people being convinced and involved, not just agreeing. Involve them early: «I’d love your input on the rollout plan.» People support what they helped build.'),
          '"Could you review the rollout section? Your experience with the CRM would really help."')
      ],
      practice: [
        B('اكتب نفس الحجة لـ 4 أشخاص مختلفين.', 'Write the same argument for 4 different people.'),
        B('اكتب 5 أسئلة استماع قبل الإقناع.', 'Write 5 listening questions to ask before persuading.'),
        B('اكتب 3 طرق تطلب بيها رأي حد عشان buy-in.', 'Write 3 ways to ask for someone’s input to get buy-in.'),
        B('اعمل role-play مع AI بيلعب مدير مالي متشكك.', 'Role-play with an AI playing a sceptical finance manager.')
      ],
      words: [
        W('what\'s in it for them', 'الفايدة اللي هتعود عليهم', 'the benefit they will get', 'Always think about what’s in it for them.'),
        W('buy-in', 'اقتناع ومشاركة حقيقية', 'real agreement and involvement', 'Get buy-in from the support team early.'),
        W('concern', 'قلق أو تخوّف', 'a worry', 'Her main concern was cost.'),
        W('priorities', 'الأولويات', 'the things that matter most', 'Cost is high on his priorities.'),
        W('input', 'رأي أو مساهمة', 'an opinion or contribution', 'I’d value your input.')
      ],
      read: ['lib:engVid', { lib: 'BBC Learning English', what: B('دوّر على «persuading at work».', 'Search for «persuading at work».') }],
      challenge: B('قدّم نفس المقترح لتلات شخصيات (صاحب بيزنس، مدير مالي، مدير تقني) في role-play، وابدأ كل مرة بسؤالين استماع، وسجّل الفرق في كلامك.', 'Pitch the same proposal to three characters (business owner, finance manager, tech lead) in role-play, starting each time with two listening questions, and note how your words change.'),
      quiz: [
        Q(B('المدير المالي غالبًا بيهتم بـ:', 'A finance manager usually cares about:'), ['cost and risk', 'code style', 'fonts'], 0, B('فلوس.', 'Money.')),
        Q(B('قبل ما تقنع:', 'Before persuading:'), ['ask about their worries and goals', 'talk for 10 minutes', 'send a long document'], 0, B('اسمع.', 'Listen.')),
        Q(B('buy-in:', 'Buy-in is:'), ['real agreement and involvement', 'buying software', 'a discount'], 0, B('مشاركة.', 'Involvement.'))
      ] },

    { title: B('الرد على الاعتراضات', 'Answering objections'),
      goal: B('تستقبل الاعتراض بهدوء وترد عليه من غير جدال.', 'Receive an objection calmly and answer it without arguing.'),
      learn: [
        L(B('أربع خطوات', 'Four steps'),
          B('(1) **acknowledge** (اعترف بيه): «That’s a fair point.» (2) اسأل للتوضيح: «Can you tell me more about that?» (3) رد بدليل: «In our test…» (4) اتأكد: «Does that address your concern?». متقاطعش ومتقولش «You’re wrong».', '(1) **Acknowledge** it: «That’s a fair point.» (2) Ask to clarify: «Can you tell me more about that?» (3) Respond with evidence: «In our test…» (4) Confirm: «Does that address your concern?». Do not interrupt or say «You’re wrong».'),
          'Client: "It’s too expensive."\nYou: "I understand — budget matters. Which part feels high? … The monthly cost is $20,\n and last campaign you lost about 18,000 EGP. Does that change the picture?"'),
        L(B('feel-felt-found', 'Feel-felt-found'),
          B('أسلوب كلاسيكي للتعاطف: «I understand how you **feel**. Other clients **felt** the same at first. What they **found** was that…». مفيد مع القلق والخوف من التغيير، بس متستخدموش بشكل آلي.', 'A classic empathy pattern: «I understand how you **feel**. Other clients **felt** the same at first. What they **found** was that…». Useful with worry and fear of change, but do not use it mechanically.'),
          '"I understand how you feel about moving away from the sheet. Another clinic felt the same.\n What they found was that the team saved two hours a day."'),
        L(B('اعترف بالحق', 'Concede what is true'),
          B('لو الاعتراض صح جزئيًا، **concede** (اعترف): «You’re right that it adds one more step. However…». الاعتراف بالنقطة الصح بيزوّد ثقتك ويخلّي الرد على الباقي مقنع أكتر.', 'If the objection is partly right, **concede** it: «You’re right that it adds one more step. However…». Admitting the valid point increases trust and makes your answer to the rest more convincing.'),
          '"You’re right — the first month needs some training. However, the onboarding takes one hour."')
      ],
      practice: [
        B('اكتب 6 اعتراضات متوقعة على مشروعك وردود بالخطوات الأربعة.', 'Write 6 expected objections to your project with four-step answers.'),
        B('اكتب رد feel-felt-found لاعتراض واحد.', 'Write a feel-felt-found answer for one objection.'),
        B('اكتب 3 جمل concede + however.', 'Write 3 concede + however sentences.'),
        B('اعمل role-play بـ 5 اعتراضات ورا بعض.', 'Role-play 5 objections in a row.')
      ],
      words: [
        W('acknowledge', 'تعترف بكلام حد / تقدّره', 'to recognise someone’s point', 'Acknowledge the concern before answering.'),
        W('reassure', 'تطمّن', 'to remove someone’s worry', 'Reassure the client about data safety.'),
        W('feel felt found', 'أسلوب تعاطف: بتحس، حسّوا، لقوا', 'an empathy pattern: feel, felt, found', 'Use feel felt found with nervous clients.'),
        W('concede', 'تعترف بنقطة صحيحة', 'to admit a valid point', 'Concede the small point, defend the big one.'),
        W('counter-argument', 'حجة مضادة', 'an argument against yours', 'Prepare for the counter-argument on cost.')
      ],
      read: ['lib:Toastmasters', { lib: 'YouGlish', what: B('دوّر على «that’s a fair point» واسمع النبرة.', 'Search «that’s a fair point» and listen to the tone.') }],
      challenge: B('اعمل «بنك اعتراضات» لخدمتك: 10 اعتراضات بردودها المكتوبة (الخطوات الأربعة)، وسجّل رد صوتي لأصعب 3.', 'Build an «objection bank» for your service: 10 objections with written four-step answers, and record spoken answers to the hardest 3.'),
      quiz: [
        Q(B('أول خطوة مع الاعتراض:', 'The first step with an objection:'), ['acknowledge it', 'argue', 'change the subject'], 0, B('اعترف.', 'Acknowledge.')),
        Q(B('الاعتراض صح جزئيًا:', 'The objection is partly right:'), ['concede that part, then explain', 'deny everything', 'ignore it'], 0, B('ثقة.', 'Trust.')),
        Q(B('آخر خطوة:', 'The last step:'), ['«Does that address your concern?»', '«Any other complaints?»', 'silence'], 0, B('تأكيد.', 'Confirm.'))
      ] },

    { title: B('التفاوض في الشغل التقني', 'Negotiating in technical work'),
      goal: B('تتفاوض على سعر أو نطاق أو ميعاد بمقايضات واضحة.', 'Negotiate a price, scope or deadline through clear trade-offs.'),
      learn: [
        L(B('مقايضة مش تنازل', 'Trade, do not give away'),
          B('أي **concession** (تنازل) لازم يقابله حاجة: «If you can provide the API access by Monday, we can deliver a week earlier.» «If we reduce the scope to two channels, the price drops to…». صيغة If you…, we can… هي قلب التفاوض.', 'Every **concession** should be matched by something in return: «If you can provide the API access by Monday, we can deliver a week earlier.» «If we reduce the scope to two channels, the price drops to…». The form «If you…, we can…» is the heart of negotiation.'),
          '"If you can sign this week, we can include the WhatsApp channel at no extra cost."'),
        L(B('أول رقم', 'The first number'),
          B('أول رقم بيتقال بيبقى **anchor** (مرساة) للنقاش. لو انت بتسعّر، قول رقمك الأول بثقة ومعاه السبب. ولو اتقالك رقم واطي، متتجادلش حوالين الرقم — رجّع النقاش للقيمة والنطاق.', 'The first number said becomes the **anchor** for the discussion. When you price, state your number first, confidently, with the reason. If you hear a low number, do not argue about the number — bring the conversation back to value and scope.'),
          '"Based on the scope, the price is 25,000 EGP. That covers three channels, testing and one month of support."'),
        L(B('حدّك وبديلك', 'Your limit and your alternative'),
          B('قبل التفاوض اعرف **walk-away point** (أقل حاجة تقبلها) و**BATNA** (أحسن بديل لو مفيش اتفاق). ده بيخليك هادي ومش بتوافق على حاجة تضرّك. والهدف **win-win**: الطرفين مبسوطين وعايزين يكملوا.', 'Before negotiating, know your **walk-away point** (the least you will accept) and your **BATNA** (your best alternative if there is no deal). This keeps you calm and stops you agreeing to something that hurts you. The aim is **win-win**: both sides happy to continue.'),
          'walk-away: 18,000 EGP · BATNA: two other leads this month')
      ],
      practice: [
        B('اكتب 6 جمل «If you…, we can…».', 'Write 6 «If you…, we can…» sentences.'),
        B('اكتب سعر مشروع كـ anchor بسببه.', 'Write a project price as an anchor with its reason.'),
        B('حدّد walk-away point وBATNA لعرض حقيقي.', 'Set your walk-away point and BATNA for a real offer.'),
        B('اعمل role-play تفاوض 5 دقايق مع AI.', 'Role-play a 5-minute negotiation with an AI.')
      ],
      words: [
        W('concession', 'تنازل في التفاوض', 'something you give up in a negotiation', 'Never make a concession for nothing.'),
        W('anchor', 'أول رقم بيأثر على النقاش', 'the first number that shapes the discussion', 'Your price is the anchor.'),
        W('walk-away point', 'أقل حاجة تقبلها', 'the least you will accept', 'My walk-away point is 18,000 EGP.'),
        W('batna', 'أحسن بديل لو مفيش اتفاق', 'the best alternative if there is no deal', 'A strong BATNA keeps you calm.'),
        W('win-win', 'الطرفين كسبانين', 'good for both sides', 'Aim for a win-win agreement.')
      ],
      read: [{ t: 'Harvard PON: BATNA basics', url: 'https://www.pon.harvard.edu/tag/batna/', what: B('اقرا تعريف BATNA بأمثلة.', 'Read the definition of BATNA with examples.') }, 'lib:Speak English with Vanessa'],
      challenge: B('حضّر تفاوض لمشروع أتمتة: anchor بسببه، 4 مقايضات «If you… we can…»، walk-away وBATNA، و5 ردود على «It’s too expensive» — واعمل role-play 10 دقايق.', 'Prepare a negotiation for an automation project: an anchor with its reason, 4 «If you… we can…» trades, a walk-away point and BATNA, and 5 answers to «It’s too expensive» — then role-play for 10 minutes.'),
      quiz: [
        Q(B('تنازل كويس:', 'A good concession:'), ['comes with something in return', 'is free', 'is the first thing you offer'], 0, B('مقايضة.', 'A trade.')),
        Q(B('anchor:', 'An anchor is:'), ['the first number that shapes the talk', 'a final price', 'a contract'], 0, B('مرساة.', 'The reference point.')),
        Q(B('BATNA:', 'BATNA is:'), ['your best alternative without a deal', 'a discount', 'a law'], 0, B('بديلك.', 'Your alternative.'))
      ] },

    { title: B('الرفض المهذب', 'Saying no politely'),
      goal: B('تقول «لأ» أو تعترض على طلب من غير ما تخسر العلاقة.', 'Say «no» or push back on a request without losing the relationship.'),
      learn: [
        L(B('لأ + سبب + بديل', 'No + reason + alternative'),
          B('الرفض المحترم: اعتراف بالطلب، «لأ» واضحة ومهذبة، سبب قصير، و**alternative offer**: «I understand it’s urgent. I’m afraid I can’t add it this week because of the release. What I can do is start on Monday, or deliver a simpler version by Thursday.»', 'A respectful refusal: acknowledge the request, a clear polite «no», a short reason, and an **alternative offer**: «I understand it’s urgent. I’m afraid I can’t add it this week because of the release. What I can do is start on Monday, or deliver a simpler version by Thursday.»'),
          '"I’m afraid that’s not possible by Friday. What I can do is…"'),
        L(B('الاعتراض على المدير', 'Pushing back on a manager'),
          B('**push back** = تعترض بأدب على طلب أو ميعاد. «Before we commit, I want to flag a risk…» «If we add this, something else has to move. Which is more important: X or Y?» السؤال عن الأولوية أذكى من «مش هلحق».', 'To **push back** = to politely resist a request or deadline. «Before we commit, I want to flag a risk…» «If we add this, something else has to move. Which is more important: X or Y?» Asking about priority is smarter than «I can’t make it».'),
          '"Happy to take it on. If I do, the report will slip to next week. Which matters more right now?"'),
        L(B('إدارة التوقعات', 'Managing expectations'),
          B('**manage expectations** بدري: قول المخاطر والحدود قبل ما تبقى مشكلة. «This should be ready by Thursday, assuming the API access arrives on Monday.» ولو حاجة اتأخرت، قول بدري مش آخر يوم. **firm but polite** = واضح في المضمون، لطيف في الأسلوب.', '**Manage expectations** early: state risks and limits before they become problems. «This should be ready by Thursday, assuming the API access arrives on Monday.» If something slips, say so early, not on the last day. **Firm but polite** = clear in substance, kind in style.'),
          '"Just a heads-up: we’re one day behind because the API key arrived late. New date: Friday."')
      ],
      practice: [
        B('اكتب 5 رفض بالشكل: اعتراف + لأ + سبب + بديل.', 'Write 5 refusals in the form: acknowledge + no + reason + alternative.'),
        B('اكتب 3 جمل push back بسؤال أولوية.', 'Write 3 push-back sentences with a priority question.'),
        B('اكتب رسالة إدارة توقعات بافتراض.', 'Write an expectation-setting message with an assumption.'),
        B('سجّل رفض مهذب بصوت ثابت وهادي.', 'Record a polite refusal in a steady, calm voice.')
      ],
      words: [
        W('push back', 'تعترض بأدب', 'to resist politely', 'It’s fine to push back on unrealistic deadlines.'),
        W('i\'m afraid', 'عبارة مهذبة قبل خبر مش حلو', 'a polite phrase before unwelcome news', 'I’m afraid we can’t do it this week.'),
        W('alternative offer', 'عرض بديل', 'a different option you can provide', 'Always include an alternative offer.'),
        W('manage expectations', 'تظبط توقعات الناس بدري', 'to set people’s expectations early', 'Manage expectations about the deadline.'),
        W('firm but polite', 'واضح ومحترم في نفس الوقت', 'clear and respectful at once', 'Be firm but polite about the scope.')
      ],
      read: ['lib:BBC Learning English', { lib: 'English with Lucy', what: B('دوّر على «how to say no politely».', 'Search for «how to say no politely».') }],
      challenge: B('اكتب «دليل الرفض» الشخصي: 8 مواقف (عميل، مدير، زميل) ورد مكتوب لكل واحد بالشكل الصحيح، وسجّل 3 منهم بصوتك.', 'Write a personal «how to say no» guide: 8 situations (client, manager, colleague) with a written reply for each in the right form, and record 3 of them.'),
      quiz: [
        Q(B('رفض مهذب فيه:', 'A polite refusal includes:'), ['a reason and an alternative', 'only «No.»', 'a long apology'], 0, B('بديل.', 'An alternative.')),
        Q(B('push back ذكي:', 'Smart pushing back:'), ['ask which priority matters more', 'refuse without reason', 'agree to everything'], 0, B('أولوية.', 'Priority.')),
        Q(B('هتتأخر:', 'You will be late:'), ['say so early with a new date', 'say nothing until the deadline', 'blame others'], 0, B('توقعات.', 'Expectations.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تقنع وتتفاوض وترفض بالإنجليزي بثقة واحترام.', 'Persuade, negotiate and refuse in English with confidence and respect.'),
      review: [
        B('PREP والدليل والفايدة للمستمع.', 'PREP, evidence and the benefit for the listener.'),
        B('مصلحة كل شخص، الاستماع الأول، والـ buy-in.', 'Each person’s interests, listening first, and buy-in.'),
        B('الرد على الاعتراضات بالخطوات الأربعة وfeel-felt-found والـ concede.', 'Answering objections with the four steps, feel-felt-found and conceding.'),
        B('المقايضة، الـ anchor، walk-away وBATNA.', 'Trading, the anchor, walk-away point and BATNA.'),
        B('لأ + سبب + بديل، push back، وإدارة التوقعات.', 'No + reason + alternative, pushing back, and managing expectations.')
      ],
      project: B('حضّر «عرض بيع» لخدمة أتمتة بالإنجليزي: حجة PREP لـ 3 شخصيات، بنك 10 اعتراضات بردودها، خطة تفاوض (anchor، مقايضات، walk-away، BATNA)، و3 ردود رفض مهذبة — واعمل role-play مسجّل 15 دقيقة مع AI بيلعب عميل صعب، واكتب تقييم ذاتي.', 'Prepare an English «sales pitch» for an automation service: PREP arguments for 3 characters, a bank of 10 objections with answers, a negotiation plan (anchor, trades, walk-away, BATNA) and 3 polite refusals — run a recorded 15-minute role-play with an AI playing a tough client, and write a self-assessment.'),
      test: [
        Q(B('PREP:', 'PREP is:'), ['point, reason, example, point', 'plan, review, execute, publish', 'price, risk, estimate, profit'], 0, B('هيكل.', 'A structure.')),
        Q(B('دليل قوي:', 'Strong evidence:'), ['a number from a real test', 'an adjective', 'a feeling'], 0, B('رقم.', 'A number.')),
        Q(B('«what’s in it for them»:', '«what’s in it for them»:'), ['the benefit for the listener', 'your salary', 'the code'], 0, B('مصلحته.', 'Their benefit.')),
        Q(B('قبل ما تقنع:', 'Before persuading:'), ['ask what worries them', 'present for 20 minutes', 'send the price'], 0, B('اسمع.', 'Listen.')),
        Q(B('buy-in بيتبني بـ:', 'Buy-in is built by:'), ['involving people early', 'deciding alone', 'hiding the plan'], 0, B('مشاركة.', 'Involvement.')),
        Q(B('«That’s a fair point» خطوة:', '«That’s a fair point» is the step of:'), ['acknowledging', 'concluding', 'negotiating'], 0, B('اعتراف.', 'Acknowledging.')),
        Q(B('concede:', 'To concede is to:'), ['admit a valid point', 'win the argument', 'leave'], 0, B('ثقة.', 'Trust.')),
        Q(B('«If you sign this week, we can…»:', '«If you sign this week, we can…»:'), ['a trade in negotiation', 'a threat', 'a refusal'], 0, B('مقايضة.', 'A trade.')),
        Q(B('walk-away point:', 'A walk-away point:'), ['the least you will accept', 'the first offer', 'the exit door'], 0, B('حدّك.', 'Your limit.')),
        Q(B('win-win:', 'Win-win:'), ['both sides gain', 'you win, they lose', 'nobody wins'], 0, B('الطرفين.', 'Both sides.')),
        Q(B('«I’m afraid…»:', '«I’m afraid…»:'), ['softens unwelcome news', 'shows fear', 'starts a story'], 0, B('مهذب.', 'Polite.')),
        Q(B('firm but polite:', 'Firm but polite:'), ['clear in substance, kind in style', 'rude and clear', 'kind and vague'], 0, B('الاتنين.', 'Both.'))
      ] }
  ]
};
