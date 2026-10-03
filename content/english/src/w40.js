// English week 40 — Customer support, hard conversations and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('دعم العملاء والمحادثات الصعبة ومشروع الشهر', 'Customer support, hard conversations and the month project'),
  goal: B('تتعامل مع أصعب لحظات الشغل الحر بالإنجليزي: ردود دعم إنسانية ومحددة، عميل غاضب تهدّيه، أخبار وحشة تقولها بصراحة، «لأ» بتحمي حدودك من غير ما تخسر العميل، واعتذار حقيقي — وتسلّم مشروع شهر الإنجليزي للفري لانسرز.',
          'Handle the hardest moments of freelance work in English: human and specific support replies, calming an angry client, delivering bad news honestly, a «no» that protects your boundaries without losing the client, and a sincere apology — and deliver the freelancer-English month project.'),
  days: [
    { title: B('ردود الدعم', 'Support replies'),
      goal: B('رد بيحل المشكلة وبيحسس العميل إنه مهم.', 'A reply that solves the problem and makes the client feel valued.'),
      learn: [
        L(B('هيكل الرد', 'The structure of a reply'),
          B('**support reply** كويس: شكر/تعاطف قصير، تأكيد المشكلة بكلامهم، اللي حصل (ببساطة)، اللي عملته أو هتعمله بميعاد، وإيه المطلوب منهم لو فيه. **empathy statement** حقيقي ومحدد («I can see how frustrating it is to see orders stuck right before the weekend») مش «We apologise for any inconvenience».', 'A good **support reply**: brief thanks/empathy, the problem confirmed in their words, what happened (simply), what you did or will do with a time, and anything you need from them. A real, specific **empathy statement** («I can see how frustrating it is to see orders stuck right before the weekend»), not «We apologise for any inconvenience».'),
          'Hi Mona,\n\nThanks for flagging this so quickly — I can see how frustrating it is to have orders stuck right before the weekend.\n\nWhat happened: Odoo rejected 12 invoices this morning because a new tax code was added.\nWhat I’ve done: I’ve updated the mapping and re-sent all 12; they’re now in Odoo.\nNext: I’ll add an alert so a new tax code never blocks invoices silently again (done by Monday).\n\nNothing needed from you. I’ll confirm on Monday.\n\nLaila'),
        L(B('رد الانتظار', 'The holding reply'),
          B('لو الحل هياخد وقت، ابعت **holding reply** فورًا: استلمنا، فاهمين الأثر، بنشتغل، والتحديث الجاي إمتى. وبعدين **follow through**: ابعت التحديث في ميعاده حتى لو مفيش جديد. وخلّي الـ **resolution** واضح: اتحل إيه بالظبط.', 'If the fix will take time, send a **holding reply** at once: received, we understand the impact, we are working on it, and when the next update comes. Then **follow through**: send the update on time even with no news. And make the **resolution** clear: exactly what was solved.'),
          'holding: "Thanks, Daniel — I’m looking into this now. I understand payments aren’t being confirmed, which affects your customers directly. I’ll update you by 2 pm."\nupdate: "Quick update: I’ve found the cause (the payment webhook changed format). Fix in progress; next update by 4 pm."\nresolution: "Resolved: confirmations are working again, and the 17 missed ones were sent at 3:40 pm."'),
        L(B('قوالب بلمسة شخصية', 'Templates with a personal touch'),
          B('**canned response** (أو **saved reply**) بيوفر وقت للأسئلة المتكررة — بس **personalise** دايمًا: اسم العميل، تفصيلة من رسالته، وجملة مخصوصة. القالب البارد بيبان، والعميل بيحس إنه رقم. و**positive language**: قول اللي تقدر تعمله مش اللي ماتقدرش.', 'A **canned response** (or **saved reply**) saves time on repeated questions — but always **personalise** it: the client’s name, a detail from their message, and one tailored sentence. A cold template shows, and the client feels like a number. And **positive language**: say what you can do, not what you cannot.'),
          '✗ "We can’t change the report until next month."\n✓ "I can add that column to next month’s report — and in the meantime I’ll send you a quick export today."\n✗ "As per our policy, …"\n✓ "To keep your data safe, we …"')
      ],
      practice: [
        B('اكتب support reply كامل لمشكلة حقيقية.', 'Write a complete support reply to a real problem.'),
        B('اكتب holding reply وتحديث وresolution.', 'Write a holding reply, an update and a resolution.'),
        B('خصص canned response لـ 3 عملاء مختلفين.', 'Personalise a canned response for 3 different clients.'),
        B('حوّل 5 جمل سلبية لـ positive language.', 'Turn 5 negative sentences into positive language.')
      ],
      words: [
        W('support reply', 'رد دعم', 'a reply to a support request', 'A good support reply ends with the next step.'),
        W('empathy statement', 'جملة تعاطف', 'a sentence showing you understand feelings', 'Start with a specific empathy statement.'),
        W('holding reply', 'رد مؤقت لحد الحل', 'a quick reply before the full answer', 'Send a holding reply within 30 minutes.'),
        W('follow through', 'تنفّذ اللي وعدت بيه', 'to do what you promised', 'Always follow through on your update times.'),
        W('resolution', 'الحل النهائي', 'the final fix', 'The resolution email lists what changed.'),
        W('canned response', 'رد جاهز', 'a prepared standard reply', 'Personalise every canned response.'),
        W('personalise', 'تخصص للشخص', 'to tailor to the person', 'Personalise the template with their details.'),
        W('positive language', 'لغة بتركز على الممكن', 'wording that focuses on what is possible', 'Use positive language in support replies.')
      ],
      read: [{ lib: 'Mailchimp Content Style Guide', what: B('اقرا Voice and tone.', 'Read Voice and tone.') }],
      challenge: B('اكتب 3 ردود دعم حقيقية بالإنجليزي (مشكلة تقنية، سؤال متكرر، طلب مش ممكن): تعاطف محدد، الحالة، الحل، الخطوة — وراجعهم بـ Hemingway Editor.', 'Write 3 real support replies in English (a technical problem, a repeated question, an impossible request): a specific empathy statement, the status, the fix, the next step — and check them in Hemingway Editor.'),
      quiz: [
        Q(B('جملة تعاطف أحسن:', 'A better empathy statement:'), ['I can see how frustrating it is to have orders stuck before the weekend.', 'We apologise for any inconvenience.', 'It happens.'], 0, B('محددة.', 'Specific.')),
        Q(B('الحل هياخد ساعات:', 'The fix will take hours:'), ['send a holding reply with an update time', 'wait until it’s fixed', 'say nothing'], 0, B('طمأنة.', 'Reassurance.')),
        Q(B('positive language:', 'Positive language:'), ['I can add it next month and send an export today.', 'We can’t do that.', 'It’s against policy.'], 0, B('الممكن.', 'What’s possible.'))
      ] },

    { title: B('العميل الغاضب', 'The angry client'),
      goal: B('تهدّي الموقف وتحوّله لحل.', 'Calm the situation and turn it into a solution.'),
      learn: [
        L(B('التهدئة', 'De-escalating'),
          B('**de-escalate**: متردش على الغضب بغضب أو بدفاع. سيبه **vent** (يطلّع اللي جواه)، **acknowledge feelings** («I understand why you’re upset»)، ركّز على المشكلة مش على الأسلوب، وانقل للحل. وفي الإيميل: متردش وانت متضايق — **cool down** 20 دقيقة.', 'To **de-escalate**: never answer anger with anger or defensiveness. Let them **vent**, **acknowledge feelings** («I understand why you’re upset»), focus on the problem, not the tone, and move to the solution. By email: do not reply while upset — **cool down** for 20 minutes.'),
          'Client (angry): "This is the third time this month! Your system is useless."\nYou: "I understand why you’re upset — three problems in a month isn’t acceptable, and I’m sorry. Let me look at all three together so we fix the cause, not just today’s issue. Can you give me 20 minutes to check?"'),
        L(B('الاعتذار الحقيقي', 'A sincere apology'),
          B('**sincere apology** = اعتراف محدد بالغلط + المسؤولية + الإصلاح + المنع. عكسها **non-apology**: «I’m sorry if you feel that way» أو «Mistakes happen» — بتزوّد الغضب. **take ownership**: «I should have tested the tax codes» مش «The system failed».', 'A **sincere apology** = a specific admission + responsibility + the fix + prevention. Its opposite is a **non-apology**: «I’m sorry if you feel that way» or «Mistakes happen» — it makes anger worse. **take ownership**: «I should have tested the tax codes», not «The system failed».'),
          '✗ "We’re sorry if the delay caused any inconvenience."\n✓ "I’m sorry — I didn’t test the new tax codes before the update, and that blocked 12 invoices. I’ve fixed it, re-sent them, and added a check so it can’t happen again."'),
        L(B('بعد ما يهدا', 'Once it calms down'),
          B('لما الموقف يهدا: لخّص اللي اتفقتوا عليه كتابة، ونفّذ في الميعاد. لو الغضب في مكالمة، ابعت إيميل بعدها. ولو العميل تجاوز (إهانات، تهديد)، حط حد بهدوء: «I want to help, and I’d find it easier to do that if we keep this conversation respectful.»', 'Once things calm down: summarise what you agreed in writing, and deliver on time. If the anger was on a call, send an email afterwards. And if the client crosses a line (insults, threats), set a limit calmly: «I want to help, and I’d find it easier to do that if we keep this conversation respectful.»'),
          'after the call:\n"Thanks for talking it through, Daniel. To confirm what we agreed:\n1. I’ll review all three incidents and send a short report by Thursday.\n2. Until then, I’ll check the order flow twice a day.\n3. This month’s maintenance fee will be reduced by 20%."')
      ],
      practice: [
        B('رد على رسالة غاضبة من غير دفاع.', 'Reply to an angry message without being defensive.'),
        B('حوّل 3 non-apologies لاعتذارات حقيقية.', 'Turn 3 non-apologies into sincere apologies.'),
        B('اكتب ملخص اتفاق بعد مكالمة صعبة.', 'Write an agreement summary after a hard call.'),
        B('اكتب جملة حد لعميل تجاوز.', 'Write a boundary sentence for a client who crossed a line.')
      ],
      words: [
        W('de-escalate', 'تهدّي الموقف', 'to calm a tense situation', 'Listening helped de-escalate the call.'),
        W('vent', 'يطلّع غضبه', 'to express strong feelings', 'Let the client vent first.'),
        W('acknowledge feelings', 'تعترف بمشاعر الشخص', 'to recognise someone’s emotions', 'Acknowledge feelings before solutions.'),
        W('cool down', 'تهدا قبل الرد', 'to calm yourself before replying', 'Cool down before answering the email.'),
        W('sincere apology', 'اعتذار حقيقي', 'a genuine apology', 'A sincere apology names the mistake.'),
        W('non-apology', 'اعتذار شكلي بيلوم الطرف التاني', 'a fake apology that shifts blame', '«Sorry if you feel that way» is a non-apology.'),
        W('take ownership', 'تتحمل المسؤولية', 'to accept responsibility', 'Take ownership of the missed test.'),
        W('angry customer', 'عميل غاضب', 'an upset client', 'An angry customer needs to feel heard.')
      ],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «how to apologise».', 'Search for «how to apologise».') }],
      challenge: B('اعمل تمثيل مكالمة مع «عميل غاضب» 10 دقايق بالإنجليزي: سيبه يطلّع، اعترف بمشاعره، اعتذر اعتذار حقيقي، اقترح حل — وابعت ملخص الاتفاق.', 'Role-play a 10-minute call with an «angry client» in English: let them vent, acknowledge their feelings, give a sincere apology, propose a fix — then send the agreement summary.'),
      quiz: [
        Q(B('أول رد على غضب:', 'The first response to anger:'), ['I understand why you’re upset.', 'Calm down.', 'That’s not my fault.'], 0, B('اعتراف.', 'Acknowledgement.')),
        Q(B('اعتذار حقيقي:', 'A sincere apology:'), ['I’m sorry — I didn’t test it, I’ve fixed it, and added a check.', 'Sorry if you feel that way.', 'Mistakes happen.'], 0, B('محدد.', 'Specific.')),
        Q(B('إيميل غاضب جالك:', 'An angry email arrives:'), ['cool down, then reply', 'reply immediately in anger', 'forward it to everyone'], 0, B('هدوء.', 'Calm.'))
      ] },

    { title: B('الأخبار الوحشة', 'Bad news'),
      goal: B('تقول الحقيقة بدري وبوضوح ومعاها خطة.', 'Tell the truth early, clearly and with a plan.'),
      learn: [
        L(B('بدري أحسن', 'Early is better'),
          B('**bad news** (تأخير، مشكلة تقنية، تكلفة أعلى) بتبقى أسوأ كل ما تتأخر. **delay notice** أول ما تعرف، مش يوم التسليم. والصيغة: الخبر مباشرة (من غير مقدمة طويلة)، السبب باختصار، الأثر، والخطة/الاختيارات.', '**bad news** (a delay, a technical problem, a higher cost) gets worse the longer you wait. Send a **delay notice** as soon as you know, not on delivery day. The format: the news directly (no long preamble), the reason briefly, the impact, and the plan/options.'),
          'Subject: Odoo integration — new go-live date\n\nHi Daniel,\n\nI need to let you know that the Odoo integration will be ready on 23 October, not 16 October as planned.\n\nThe reason: Odoo’s API limits how many invoices we can create per minute, so I need to add a queue. Everything else is on track.\n\nTwo options:\n1. Go live on the 16th with invoices sent by email only, and switch on Odoo on the 23rd.\n2. Go live with everything on the 23rd.\n\nI’d recommend option 1. Let me know which you prefer.\n\nLaila'),
        L(B('صياغة رسمية', 'Formal wording'),
          B('في المواقف الرسمية: «**we regret** to inform you that…» و«**unfortunately**, …». بس متكترش في الدبلوماسية لدرجة إن الخبر يضيع — الجملة الأولى أو التانية لازم فيها الخبر. وبعد الخبر: «**going forward**, we will…» = إيه هيتغير.', 'In formal situations: «**we regret** to inform you that…» and «**unfortunately**, …». But do not soften so much that the news gets lost — the first or second sentence must contain it. After the news: «**going forward**, we will…» = what will change.'),
          '"Unfortunately, the WhatsApp templates were rejected by Meta this morning, so campaign messages can’t be sent on Friday."\n"Going forward, we will submit templates one week before each campaign."'),
        L(B('إعادة الصياغة', 'Reframing'),
          B('**reframe** = تعرض نفس الحقيقة من زاوية بناءة (من غير كذب): «The delay gives us time to test with real orders» أو «We found this in staging, not with your customers». ركّز على الاختيارات اللي في إيد العميل — بيحس بالسيطرة.', 'To **reframe** = present the same truth from a constructive angle (without lying): «The delay gives us time to test with real orders» or «We found this in staging, not with your customers». Focus on the choices the client has — they feel in control.'),
          '"The good news is we caught this in staging, before any customer was affected."\n"This gives us a chance to add the queue now, which also protects you during sales."\n"You have two options, and either one keeps invoices going out on time."')
      ],
      practice: [
        B('اكتب delay notice بخيارين.', 'Write a delay notice with two options.'),
        B('اكتب خبر وحش رسمي في جملتين.', 'Write formal bad news in two sentences.'),
        B('اعمل reframe لـ 3 أخبار وحشة بصدق.', 'Reframe 3 pieces of bad news honestly.'),
        B('اكتب «going forward» لكل واحدة.', 'Write a «going forward» line for each.')
      ],
      words: [
        W('bad news', 'خبر وحش', 'unwelcome information', 'Share bad news early.'),
        W('delay notice', 'إشعار تأخير', 'a message announcing a delay', 'Send the delay notice today, not Friday.'),
        W('we regret', 'نأسف (رسمي)', 'we are sorry (formal)', 'We regret to inform you of a delay.'),
        W('unfortunately', 'للأسف', 'sadly', 'Unfortunately, the templates were rejected.'),
        W('going forward', 'من دلوقتي ورايح', 'from now on', 'Going forward, we will test every update.'),
        W('reframe', 'تعيد الصياغة من زاوية بناءة', 'to present from a constructive angle', 'Reframe the delay as extra testing time.')
      ],
      read: [{ lib: 'Purdue OWL', what: B('دوّر على «negative messages».', 'Search for «negative messages».') }],
      challenge: B('اكتب 3 رسايل أخبار وحشة بالإنجليزي (تأخير، تكلفة أعلى، ميزة مش ممكنة): الخبر في أول جملتين، السبب، الأثر، اختيارات، going forward — ومن غير كذب.', 'Write 3 bad-news messages in English (a delay, a higher cost, an impossible feature): the news in the first two sentences, the reason, the impact, options, going forward — and no lies.'),
      quiz: [
        Q(B('إمتى تبلّغ بالتأخير؟', 'When to announce a delay?'), ['as soon as you know', 'on the delivery day', 'after delivery'], 0, B('بدري.', 'Early.')),
        Q(B('مكان الخبر في الرسالة:', 'Where the news goes in the message:'), ['in the first sentence or two', 'at the very end', 'in an attachment'], 0, B('مباشر.', 'Direct.')),
        Q(B('reframe صادق:', 'An honest reframe:'), ['We caught it in staging, before any customer was affected.', 'Nothing went wrong.', 'It’s your fault.'], 0, B('حقيقي.', 'True.'))
      ] },

    { title: B('قول «لأ» والحدود', 'Saying no and boundaries'),
      goal: B('ترفض بأدب وتحمي وقتك وجودة شغلك.', 'Refuse politely and protect your time and quality.'),
      learn: [
        L(B('«لأ» بأدب', 'A polite no'),
          B('**say no** من غير «No» جافة: اشكر، ارفض بوضوح، سبب قصير (اختياري)، وبديل لو موجود. «Thanks for thinking of me. I won’t be able to take this on this month, but I could start on 1 November, or recommend a colleague.» الوضوح أحسن من «maybe» اللي بتعلّق العميل.', 'To **say no** without a blunt «No»: thank them, decline clearly, a short reason (optional), and an alternative if possible. «Thanks for thinking of me. I won’t be able to take this on this month, but I could start on 1 November, or recommend a colleague.» Clarity beats a «maybe» that leaves the client hanging.'),
          '"I’m afraid that’s outside what we agreed, but I’d be happy to quote for it as a separate piece of work."\n"I won’t be able to deliver it by Friday without cutting testing — could we aim for Tuesday instead?"\n"That’s not something I specialise in, so I’d rather not take it on — but I know someone who’s excellent at it."'),
        L(B('الحدود', 'Boundaries'),
          B('**boundary** = قاعدة بتحمي وقتك وجودة شغلك: ساعات الدعم، قنوات التواصل، وقت الرد، اللي في النطاق. قولها بدري (في الـ onboarding)، بهدوء، ومن غير اعتذار، وكررها بلطف لو اتكسرت.', 'A **boundary** = a rule protecting your time and quality: support hours, contact channels, reply times, what is in scope. State it early (during onboarding), calmly, without apology, and repeat it kindly if it is crossed.'),
          'onboarding: "I reply to emails within one business day, Sunday to Thursday. For urgent production issues, please use the support form — that alerts me straight away."\ncrossed (WhatsApp at 11 pm about a new idea): "Thanks for the idea! I’ll look at it tomorrow morning and send you a short estimate."'),
        L(B('الخلاف المهني', 'Professional disagreement'),
          B('**disagreement** مع عميل على حل تقني أو قرار: احترم رأيه، وضّح المخاطر بأرقام، اقترح بديل، وفي الآخر هو بيقرر — بس سجّل التحذير كتابة. **difficult conversation** = ادخل بنية الفهم، ابحث عن **common ground** («We both want orders to never get lost»).', 'A **disagreement** with a client about a technical solution or decision: respect their view, explain the risks with numbers, propose an alternative, and in the end they decide — but record your warning in writing. A **difficult conversation** = go in to understand, look for **common ground** («We both want orders never to get lost»).'),
          '"I understand why you’d like to skip the staging environment — it saves time. My concern is that last month two updates would have broken invoicing in production. Could we keep a lighter staging step, just for invoice changes? If you’d still prefer to skip it, that’s your call — I’ll note the risk in our project log."')
      ],
      practice: [
        B('اكتب 4 «لأ» مهذبة ببدايل.', 'Write 4 polite refusals with alternatives.'),
        B('اكتب حدودك في فقرة onboarding.', 'Write your boundaries in an onboarding paragraph.'),
        B('اكتب رد على رسالة بالليل بيحترم الحد.', 'Write a reply to a late-night message that keeps the boundary.'),
        B('اكتب تحذير مهني لقرار مش موافق عليه.', 'Write a professional warning about a decision you disagree with.')
      ],
      words: [
        W('say no', 'ترفض', 'to refuse', 'It’s okay to say no politely.'),
        W('boundary', 'حد بيحمي وقتك', 'a limit protecting your time', 'Set a boundary on support hours.'),
        W('disagreement', 'اختلاف في الرأي', 'a difference of opinion', 'We had a professional disagreement about staging.'),
        W('difficult conversation', 'محادثة صعبة', 'a hard, sensitive talk', 'Prepare notes for the difficult conversation.'),
        W('common ground', 'أرضية مشتركة', 'shared interests or views', 'Start from common ground.')
      ],
      read: [{ lib: 'Speak English with Vanessa', what: B('دوّر على «how to say no politely».', 'Search for «how to say no politely».') }],
      challenge: B('اكتب «كتيّب الحدود» بالإنجليزي: 5 حدود بتاعتك بصياغة onboarding، 5 «لأ» مهذبة ببدايل، وقالب تحذير مكتوب لقرار عميل خطر.', 'Write an English «boundaries booklet»: 5 of your boundaries in onboarding wording, 5 polite refusals with alternatives, and a written warning template for a risky client decision.'),
      quiz: [
        Q(B('رفض مهذب:', 'A polite refusal:'), ['I won’t be able to take this on, but I could start in November.', 'No.', 'Maybe, we’ll see.'], 0, B('واضح وبديل.', 'Clear with an alternative.')),
        Q(B('الحدود تتقال:', 'Boundaries are stated:'), ['early, during onboarding', 'only after problems', 'never'], 0, B('بدري.', 'Early.')),
        Q(B('عميل قرر حاجة خطر:', 'A client chose something risky:'), ['respect it and record the warning in writing', 'refuse to work', 'ignore it'], 0, B('توثيق.', 'Documentation.'))
      ] },

    { title: B('الصورة الكاملة', 'The full picture'),
      goal: B('تراجع الشهر في سيناريوهات حقيقية متصلة.', 'Review the month through connected real scenarios.'),
      learn: [
        L(B('رحلة عميل', 'A client journey'),
          B('شهر الإنجليزي للفري لانسرز كله في رحلة عميل واحد: مكالمة اكتشاف (37) ← عرض سعر بقيمة (39) ← تفاوض (39) ← عقد ونطاق (38) ← تسليم ← مشكلة ورد دعم (40) ← فاتورة ومتابعة (39) ← تجديد. كل محطة ليها لغة وقوالب.', 'The whole freelancer-English month in one client journey: a discovery call (37) → a value-based quote (39) → negotiation (39) → a contract and scope (38) → delivery → a problem and a support reply (40) → an invoice and chasing (39) → renewal. Each stop has its language and templates.'),
          'Daniel (Dubai shop) — the journey\n1 discovery call · walk me through · reflect back · next step Thursday\n2 quote with three options · value framing · valid 30 days\n3 negotiation: net 60 → met halfway at net 45 with a 40% deposit\n4 SOW: acceptance criteria, assumptions, change requests\n5 issue in week 2 → holding reply → resolution → sincere apology\n6 invoice + PO · reminder → paid · renewal of the care plan'),
        L(B('النبرة عبر المراحل', 'Tone across stages'),
          B('النبرة بتتغير حسب الموقف: دافية ومرنة في المبيعات، دقيقة ورسمية في العقود، هادية ومتعاطفة في المشاكل، حازمة ومهذبة في الفلوس. الثابت: الوضوح والاحترام والأرقام.', 'Tone changes with the situation: warm and flexible in sales, precise and formal in contracts, calm and empathetic in problems, firm but polite with money. The constant: clarity, respect and numbers.'),
          'sales:      "Would something like that make a difference for you?"\ncontract:   "Changes to the Scope must be agreed in writing."\nsupport:    "I can see how frustrating this is — here’s what I’ve done."\nmoney:      "The invoice is now 10 days overdue. Could you confirm the payment date?"'),
        L(B('مكتبة الجمل', 'The phrase bank'),
          B('اعمل **phrase bank** شخصي: جمل جاهزة لكل موقف بتستخدمها وتعدّلها. ده مش غش — المحترفين الناطقين بالإنجليزي عندهم نفس الشي. رتّبه بالمواقف، وزوّد عليه كل ما تلاقي جملة حلوة في إيميل أو مكالمة.', 'Build a personal **phrase bank**: ready sentences for each situation that you reuse and adapt. It is not cheating — native-speaking professionals have the same. Organise it by situation, and add to it whenever you meet a good sentence in an email or call.'),
          'phrase bank — sections\nopening calls · discovery questions · checking understanding · value & numbers · closing\nquotes · negotiation · contracts (must/may) · invoices · reminders · price increases\nsupport replies · apologies · bad news · saying no · boundaries')
      ],
      practice: [
        B('ارسم رحلة عميل حقيقي بالمحطات واللغة.', 'Map a real client’s journey with the stops and language.'),
        B('اكتب جملة لكل نبرة من الأربعة.', 'Write a sentence for each of the four tones.'),
        B('ابدأ phrase bank بـ 10 أقسام.', 'Start a phrase bank with 10 sections.'),
        B('ضيف 5 جمل من إيميلات حقيقية جاتلك.', 'Add 5 sentences from real emails you received.')
      ],
      words: [
        W('client journey', 'رحلة العميل من أول تواصل للتجديد', 'the client’s path from first contact to renewal', 'Map the client journey in eight stops.'),
        W('phrase bank', 'مكتبة جمل جاهزة', 'a collection of ready phrases', 'My phrase bank has 200 sentences.'),
        W('renewal email', 'إيميل تجديد', 'an email about continuing a contract', 'Send the renewal email a month early.'),
        W('tone shift', 'تغيير النبرة حسب الموقف', 'changing tone for the situation', 'Notice the tone shift from sales to contracts.'),
        W('client onboarding', 'استقبال العميل وتجهيزه', 'welcoming and setting up a new client', 'Client onboarding states your boundaries.')
      ],
      read: [{ lib: 'Using English', what: B('دوّر على business phrases.', 'Search for business phrases.') }],
      challenge: B('اكتب «رحلة عميل كاملة» بالإنجليزي كسلسلة رسايل حقيقية (10 رسايل من الاكتشاف للتجديد) بالنبرة الصح في كل محطة — وضيف أحسن جملها لـ phrase bank.', 'Write a «complete client journey» in English as a series of realistic messages (10 messages from discovery to renewal) with the right tone at each stop — and add the best sentences to your phrase bank.'),
      quiz: [
        Q(B('نبرة العقود:', 'The tone of contracts:'), ['precise and formal', 'casual and funny', 'emotional'], 0, B('دقيقة.', 'Precise.')),
        Q(B('نبرة المشاكل:', 'The tone for problems:'), ['calm and empathetic', 'defensive', 'silent'], 0, B('هادية.', 'Calm.')),
        Q(B('phrase bank:', 'A phrase bank:'), ['ready sentences you adapt', 'a bank account', 'a dictionary only'], 0, B('جاهز.', 'Ready-made.'))
      ] },

    { title: B('مراجعة الشهر العاشر ومشروعه', 'Month 10 review and project'),
      goal: B('إنجليزي البيزنس للفري لانسرز بثقة.', 'Business English for freelancers with confidence.'),
      review: [
        B('مكالمات البيع: الافتتاح والاكتشاف والسماع والقيمة والقفل (أسبوع 37).', 'Sales calls: opening, discovery, listening, value and closing (week 37).'),
        B('العقود: shall/may/must، النطاق، الدفع، الإنهاء، بنود المخاطر (أسبوع 38).', 'Contracts: shall/may/must, scope, payment, termination, risk clauses (week 38).'),
        B('التسعير والتفاوض والفواتير والمتابعة (أسبوع 39).', 'Pricing, negotiation, invoices and chasing (week 39).'),
        B('ردود الدعم والعميل الغاضب والاعتذار الحقيقي.', 'Support replies, the angry client and the sincere apology.'),
        B('الأخبار الوحشة و«لأ» والحدود والخلاف المهني.', 'Bad news, saying no, boundaries and professional disagreement.')
      ],
      project: B('مشروع الشهر العاشر «عميل دولي كامل» بالإنجليزي: مكالمة اكتشاف مسجلة 20 دقيقة، عرض سعر بـ 3 اختيارات وإيميله، تفاوض تمثيلي بملخص اتفاق، SOW صفحتين، رد دعم + اعتذار حقيقي، delay notice بخيارين، فاتورة وتذكيرين، ورفض مهذب لطلب خارج النطاق — مع phrase bank بـ 100 جملة، وكل حاجة مراجعة لغويًا.', 'Month 10 project «a complete international client» in English: a recorded 20-minute discovery call, a quote with 3 options and its email, a role-played negotiation with an agreement summary, a two-page SOW, a support reply + a sincere apology, a delay notice with two options, an invoice and two reminders, and a polite refusal of an out-of-scope request — with a 100-sentence phrase bank, all proofread.'),
      test: [
        Q(B('افتتاح المكالمة:', 'Opening a call:'), ['Thanks for making the time — shall we dive in?', 'Tell me your budget.', 'Hurry, I’m busy.'], 0, B('دافي ومنظم.', 'Warm and structured.')),
        Q(B('سؤال غير مباشر:', 'An indirect question:'), ['Do you mind me asking what budget you have in mind?', 'What is your budget?', 'Budget?'], 0, B('مهذب.', 'Polite.')),
        Q(B('«may» في العقد:', '«may» in a contract:'), ['a right, not an obligation', 'a must', 'a ban'], 0, B('حق.', 'A right.')),
        Q(B('معيار قبول:', 'An acceptance criterion:'), ['50 orders processed with no errors', 'the client likes it', 'it looks good'], 0, B('قياس.', 'Measurable.')),
        Q(B('عرض مضاد:', 'A counter-offer:'), ['If you pay 50% upfront, I can take 5% off.', 'Fine, whatever.', 'Never.'], 0, B('تبادل.', 'Exchange.')),
        Q(B('فاتورة لشركة كبيرة:', 'An invoice for a big company:'), ['include the PO number', 'no reference needed', 'send by WhatsApp only'], 0, B('PO.', 'PO.')),
        Q(B('أول تذكير بالدفع:', 'The first payment reminder:'), ['Just a friendly reminder that…', 'Final warning!', 'Pay or else.'], 0, B('ودّي.', 'Friendly.')),
        Q(B('رد الانتظار:', 'A holding reply:'), ['I’m on it — next update by 2 pm.', 'Wait.', 'No reply.'], 0, B('طمأنة.', 'Reassurance.')),
        Q(B('اعتذار حقيقي:', 'A sincere apology:'), ['I’m sorry — I didn’t test it; I’ve fixed it and added a check.', 'Sorry if you feel upset.', 'Things happen.'], 0, B('مسؤولية.', 'Ownership.')),
        Q(B('خبر وحش:', 'Bad news:'), ['early, direct, with options', 'late and vague', 'hidden'], 0, B('صراحة.', 'Honesty.')),
        Q(B('«لأ» كويسة:', 'A good «no»:'), ['clear, polite and with an alternative', 'a long excuse', 'silence'], 0, B('بديل.', 'Alternative.')),
        Q(B('عميل غاضب:', 'An angry client:'), ['let them vent, acknowledge, then solve', 'argue back', 'hang up'], 0, B('تهدئة.', 'De-escalation.'))
      ] }
  ]
};
