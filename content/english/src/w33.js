// English week 33 — Running meetings.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('إدارة الاجتماعات', 'Running meetings'),
  goal: B('تدير اجتماع بالإنجليزي من أوله لآخره: تحضير بهدف وجدول، افتتاح وإدارة الوقت، مشاركة الكل، الوصول لقرار، وختام بمحضر وخطوات واضحة.',
          'Run a meeting in English from start to finish: preparation with an objective and agenda, opening and managing time, involving everyone, reaching a decision, and closing with minutes and clear actions.'),
  days: [
    { title: B('قبل الاجتماع', 'Before the meeting'),
      goal: B('تحضّر اجتماع ليه هدف واضح ومحدش يحس إنه ضيّع وقته.', 'Prepare a meeting with a clear objective so nobody feels it wasted their time.'),
      learn: [
        L(B('الهدف والنتيجة', 'Objective and outcome'),
          B('كل اجتماع يبدأ بسؤال: لازم يتعمل اجتماع؟ (ممكن رسالة تكفي). لو أيوه، اكتب **objective** (ليه بنتقابل) و**outcome** (هنخرج بإيه: قرار، خطة، أفكار). «By the end of this meeting, we will have decided which queue to use.»', 'Every meeting starts with a question: do we need a meeting? (a message may be enough). If yes, write the **objective** (why we are meeting) and the **outcome** (what we will leave with: a decision, a plan, ideas). «By the end of this meeting, we will have decided which queue to use.»'),
          'Objective: choose a queue for order intake\nOutcome: a decision + owner for the design doc'),
        L(B('جدول بمواعيد', 'A timeboxed agenda'),
          B('اكتب البنود بوقت لكل واحد (**timebox**) ومسؤول عنه، وحط الأهم الأول. «10 min — context (Sara) · 20 min — options (Omar) · 10 min — decision (all) · 5 min — next steps».', 'List the items with a time for each (a **timebox**) and an owner, most important first. «10 min — context (Sara) · 20 min — options (Omar) · 10 min — decision (all) · 5 min — next steps».'),
          '45 min · Queue decision\n10 Context (Sara) · 20 Options (Omar) · 10 Decision (all) · 5 Next steps (me)'),
        L(B('الدعوة والقراءة المسبقة', 'The invitation and pre-reads'),
          B('في الدعوة: الهدف، الجدول، وأي **pre-read** (مستند يتقري قبل): «Please read the two-page design doc before Thursday so we can use the meeting to decide, not to read.» وادعي اللي لازم يكونوا بس.', 'In the invitation: the objective, the agenda, and any **pre-read** (a document to read beforehand): «Please read the two-page design doc before Thursday so we can use the meeting to decide, not to read.» Invite only those who need to be there.'),
          'Subject: Decide the order queue — Thu 11:00 (45 min)\nPre-read: design doc v2 (5 min read). Please come ready to choose.')
      ],
      practice: [
        B('خد اجتماع جاي واكتب له objective وoutcome.', 'Take an upcoming meeting and write its objective and outcome.'),
        B('اكتب agenda بـ timeboxes ومسؤولين.', 'Write an agenda with timeboxes and owners.'),
        B('اكتب دعوة فيها pre-read.', 'Write an invitation with a pre-read.'),
        B('قرر: الاجتماع ده ممكن يبقى رسالة؟ واكتب الرسالة.', 'Decide: could this meeting be a message? Write the message.')
      ],
      words: [
        W('objective', 'هدف الاجتماع', 'the purpose of a meeting', 'State the objective in the invite.'),
        W('outcome', 'النتيجة المطلوبة', 'the result you want to leave with', 'The outcome is a decision.'),
        W('timebox', 'وقت محدد لبند', 'a fixed amount of time for an item', 'Timebox the options discussion to 20 minutes.'),
        W('pre-read', 'مستند يتقري قبل الاجتماع', 'a document to read before a meeting', 'Please read the pre-read first.'),
        W('attendees', 'الحاضرين', 'the people taking part', 'Keep the attendees to five.')
      ],
      read: [{ t: 'Atlassian: How to run effective meetings', url: 'https://www.atlassian.com/blog/teamwork/how-to-run-effective-meetings', what: B('اقرا نصايح الجدول والهدف.', 'Read the tips on agenda and objective.') }, 'lib:The Scrum Guide'],
      challenge: B('حضّر اجتماع حقيقي أو متخيل: objective، outcome، agenda بـ timeboxes، دعوة بالإنجليزي بـ pre-read — وخلّي AI يراجعها كأنه مدير مشغول.', 'Prepare a real or imagined meeting: objective, outcome, a timeboxed agenda, and an English invitation with a pre-read — have an AI review it as a busy manager.'),
      quiz: [
        Q(B('أول سؤال قبل أي اجتماع:', 'The first question before any meeting:'), ['Do we need a meeting at all?', 'What should we eat?', 'Who is late?'], 0, B('ممكن رسالة.', 'A message may do.')),
        Q(B('outcome مثال:', 'An example outcome:'), ['a decision on the queue', 'a nice chat', '45 minutes'], 0, B('نتيجة.', 'A result.')),
        Q(B('pre-read هدفه:', 'A pre-read aims to:'), ['use the meeting to decide, not read', 'make the meeting longer', 'replace the agenda'], 0, B('وقت أحسن.', 'Better use of time.'))
      ] },

    { title: B('الافتتاح والإدارة', 'Opening and facilitating'),
      goal: B('تفتح الاجتماع بثقة وتمشّيه في وقته.', 'Open the meeting confidently and keep it on time.'),
      learn: [
        L(B('جمل الافتتاح', 'Opening phrases'),
          B('**facilitator** (اللي بيدير) بيفتح كده: «Thanks for joining. The goal today is to… We have 45 minutes. First, Sara will give us the context.» افتتاح في 30 ثانية: شكر، هدف، وقت، أول بند.', 'The **facilitator** opens like this: «Thanks for joining. The goal today is to… We have 45 minutes. First, Sara will give us the context.» A 30-second opening: thanks, goal, time, first item.'),
          '"Thanks, everyone. Today we need to decide on the order queue.\n We have 45 minutes. Sara, could you start with the context?"'),
        L(B('خلّيه على المسار', 'Keep it on track'),
          B('لو النقاش راح بعيد: «That’s a good point, but it’s outside today’s scope. Let’s put it in the **parking lot** and come back to it.» أو «Can we **take this offline**?» (نكمّلها بره الاجتماع). وراقب الوقت: «We have five minutes left on this item.»', 'If the discussion drifts: «That’s a good point, but it’s outside today’s scope. Let’s put it in the **parking lot** and come back to it.» Or «Can we **take this offline**?» (continue outside the meeting). Watch the time: «We have five minutes left on this item.»'),
          'parking lot: SMS orders · pricing of the CRM\n"Let’s take the pricing question offline — Omar, can you and Sara sync tomorrow?"'),
        L(B('انتقالات', 'Transitions'),
          B('بين البنود لخّص وانتقل: «So, to recap: we have three options. Let’s move on to comparing them.» «Before we move on, does anyone have a quick question?» الانتقالات الواضحة بتخلّي الكل عارف احنا فين.', 'Between items, summarise and move on: «So, to recap: we have three options. Let’s move on to comparing them.» «Before we move on, does anyone have a quick question?» Clear transitions keep everyone oriented.'),
          '"To recap: Postgres is simplest, Redis is fastest. Moving on to the decision…"')
      ],
      practice: [
        B('سجّل افتتاح 30 ثانية لاجتماعك.', 'Record a 30-second opening for your meeting.'),
        B('اكتب 5 جمل ترجّع النقاش للمسار.', 'Write 5 sentences that bring the discussion back on track.'),
        B('اكتب 4 جمل انتقال بين البنود.', 'Write 4 transition sentences between items.'),
        B('اعمل role-play مع AI بيحاول يخرج عن الموضوع.', 'Role-play with an AI that keeps going off topic.')
      ],
      words: [
        W('facilitator', 'اللي بيدير النقاش', 'the person who guides the discussion', 'The facilitator keeps time.'),
        W('parking lot', 'قايمة مواضيع نأجلها لبعدين', 'a list of topics postponed for later', 'Add SMS orders to the parking lot.'),
        W('take offline', 'نكمّل النقاش بره الاجتماع', 'to continue a discussion outside the meeting', 'Let’s take that offline.'),
        W('going off topic', 'الخروج عن الموضوع', 'drifting away from the subject', 'We are going off topic.'),
        W('recap', 'تلخيص سريع', 'a quick summary', 'Let me recap before we move on.')
      ],
      read: ['lib:BBC Learning English', { lib: 'Toastmasters', what: B('شوف نصايح إدارة الكلام.', 'Look at tips on leading discussion.') }],
      challenge: B('أدر اجتماع 20 دقيقة (مع زملاء أو أصحاب أو AI) بالإنجليزي: افتتاح، 3 بنود بـ timeboxes، parking lot، انتقالات — وسجّله واسمعه.', 'Run a 20-minute English meeting (with colleagues, friends or an AI): an opening, 3 timeboxed items, a parking lot and transitions — record it and listen back.'),
      quiz: [
        Q(B('فكرة كويسة بس بره الموضوع:', 'A good idea but off topic:'), ['put it in the parking lot', 'discuss it for 20 minutes', 'ignore the person'], 0, B('نرجعلها بعدين.', 'Come back later.')),
        Q(B('«take this offline»:', '«take this offline»:'), ['discuss it outside the meeting', 'turn off the internet', 'cancel it'], 0, B('بره.', 'Elsewhere.')),
        Q(B('افتتاح كويس فيه:', 'A good opening has:'), ['thanks, goal, time and the first item', 'a long story', 'no goal'], 0, B('30 ثانية.', '30 seconds.'))
      ] },

    { title: B('مشاركة الكل', 'Involving everyone'),
      goal: B('تخلّي كل صوت يتسمع، وتتعامل مع المقاطعة واللهجات.', 'Make every voice heard, and handle interruptions and accents.'),
      learn: [
        L(B('الصامتين', 'The quiet ones'),
          B('مش كل الناس بتتكلم من نفسها. اسأل بالاسم وبلطف: «Mona, you worked on the WhatsApp side — what do you think?» أو عمل **round-robin** (كل واحد يقول رأيه بالدور). ده بيطلّع أفكار مكانتش هتتقال.', 'Not everyone speaks up. Ask by name, kindly: «Mona, you worked on the WhatsApp side — what do you think?» Or do a **round-robin** (everyone gives their view in turn). This brings out ideas that would never be said.'),
          '"Let’s go round the table — one minute each. Mona, would you like to start?"'),
        L(B('المسيطرين والمقاطعة', 'Dominant speakers and interrupting'),
          B('لو حد بيتكلم كتير: «Thanks, Omar — let’s hear from someone who hasn’t spoken yet.» ولو انت محتاج تقاطع: «Sorry to interrupt, but…» أو «Can I just add something quickly?» ولو حد قاطعك: «If I could just finish my point…».', 'If someone talks too much: «Thanks, Omar — let’s hear from someone who hasn’t spoken yet.» If you need to interrupt: «Sorry to interrupt, but…» or «Can I just add something quickly?» If someone interrupts you: «If I could just finish my point…».'),
          '"Sorry to jump in — just a quick fact: the CRM limit is 100 requests a minute."\n"If I could just finish — the key point is the cost."'),
        L(B('التأكد من الفهم', 'Checking understanding'),
          B('في فرق دولية اللهجات مختلفة. **paraphrase** اللي اتقال قبل ما ترد: «So what you’re saying is…»، واسأل: «Could you say that again more slowly?» من غير إحراج. ولخّص القرارات بالكتابة في الشات.', 'International teams have different accents. Restate what was said before replying: «So what you’re saying is…», and ask: «Could you say that again more slowly?» without embarrassment. Summarise decisions in writing in the chat.'),
          '"Just to check I understood: you prefer Redis because of the burst size, right?"')
      ],
      practice: [
        B('اكتب 4 طرق تدعو بيها شخص صامت للكلام.', 'Write 4 ways to invite a quiet person to speak.'),
        B('اكتب جمل مقاطعة مهذبة وجمل «خليني أكمّل».', 'Write polite interrupting phrases and «let me finish» phrases.'),
        B('اكتب 5 جمل للتأكد من الفهم.', 'Write 5 phrases for checking understanding.'),
        B('اسمع فيديو بلهجة مختلفة ولخّص اللي فهمته.', 'Listen to a video in a different accent and summarise what you understood.')
      ],
      words: [
        W('quiet participant', 'حد مش بيتكلم كتير في الاجتماع', 'someone who says little in a meeting', 'Invite the quiet participant by name.'),
        W('interrupt politely', 'تقاطع بأدب', 'to cut in courteously', 'Interrupt politely with «Sorry to jump in».'),
        W('jump in', 'تدخل في الكلام', 'to join a conversation suddenly', 'Can I jump in here?'),
        W('go round the table', 'كل واحد يتكلم بالدور', 'let each person speak in turn', 'Let’s go round the table.'),
        W('just to check', 'عبارة للتأكد من الفهم', 'a phrase used to confirm understanding', 'Just to check: Thursday, not Friday?')
      ],
      read: ['lib:BBC Learning English', { lib: 'YouGlish', what: B('دوّر على «sorry to interrupt» واسمع النطق.', 'Search «sorry to interrupt» and listen.') }],
      challenge: B('في اجتماعك الجاي (أو تمثيل)، طبّق: round-robin، دعوة الصامت، مقاطعة مهذبة، و3 جمل تأكد — وسجّل مين اتكلم قد إيه.', 'In your next meeting (or a role-play), apply: a round-robin, inviting a quiet person, a polite interruption and 3 checking phrases — note who spoke for how long.'),
      quiz: [
        Q(B('حد بيتكلم كتير:', 'Someone is talking too much:'), ['«Thanks — let’s hear from others.»', '«Stop talking!»', 'mute them silently'], 0, B('بأدب.', 'Politely.')),
        Q(B('مقاطعة مهذبة:', 'A polite interruption:'), ['«Sorry to interrupt, but…»', '«Wrong!»', 'talking over them'], 0, B('اعتذار.', 'An apology.')),
        Q(B('مفهمتش بسبب اللهجة:', 'You did not understand because of the accent:'), ['«Could you say that again more slowly?»', 'pretend you understood', 'leave'], 0, B('من غير إحراج.', 'No embarrassment.'))
      ] },

    { title: B('الوصول لقرار', 'Reaching a decision'),
      goal: B('تخرج من الاجتماع بقرار واضح حتى لو فيه اختلاف.', 'Leave the meeting with a clear decision even when people disagree.'),
      learn: [
        L(B('اقترح', 'Propose'),
          B('بعد النقاش، حد لازم يقترح: «I propose we go with Postgres for now and revisit at 50k orders a day.» «What if we…?» «How about…?». الاقتراح الواضح بيحوّل النقاش لقرار.', 'After discussion, someone must propose: «I propose we go with Postgres for now and revisit at 50k orders a day.» «What if we…?» «How about…?». A clear proposal turns discussion into a decision.'),
          '"I’d like to propose: Postgres queue now, review in three months."'),
        L(B('اختبر التوافق', 'Test for consensus'),
          B('**consensus** مش إن الكل متحمس؛ هو إن محدش عنده اعتراض قوي. اسأل: «Can everyone live with this?» أو «Any strong objections?» ولو فيه: «What would it take for you to agree?».', '**Consensus** is not everyone being excited; it is nobody having a strong objection. Ask: «Can everyone live with this?» or «Any strong objections?» If there are: «What would it take for you to agree?».'),
          '"Can everyone live with this? … Omar, you look unsure — what would it take for you to agree?"'),
        L(B('اختلف والتزم', 'Disagree and commit'),
          B('لو مفيش توافق كامل، صاحب القرار يقرر، والباقي **disagree and commit**: «I still prefer Redis, but I’ll support this decision.» وسجّل القرار وسببه في **decision log** عشان محدش يفتحه تاني من غير معلومة جديدة.', 'If full consensus is not possible, the decision owner decides and the others **disagree and commit**: «I still prefer Redis, but I’ll support this decision.» Record the decision and its reason in a **decision log** so nobody reopens it without new information.'),
          'Decision log — 2026-10-09: Postgres queue. Reason: already in our stack.\nRevisit if > 50k orders/day. Decided by: Sara. Dissent: Omar (prefers Redis).')
      ],
      practice: [
        B('اكتب 5 صيغ اقتراح.', 'Write 5 ways to make a proposal.'),
        B('اكتب 4 أسئلة لاختبار التوافق.', 'Write 4 questions to test for consensus.'),
        B('اكتب جملة disagree and commit بأسلوبك.', 'Write a disagree-and-commit sentence in your own style.'),
        B('ابدأ decision log لمشروعك بـ 3 قرارات.', 'Start a decision log for your project with 3 decisions.')
      ],
      words: [
        W('propose', 'يقترح', 'to suggest formally', 'I propose we start with Postgres.'),
        W('consensus', 'توافق من غير اعتراض قوي', 'agreement with no strong objection', 'We reached consensus quickly.'),
        W('can live with', 'مقبول عندي حتى لو مش المفضّل', 'acceptable even if not my favourite', 'I can live with that decision.'),
        W('disagree and commit', 'تعترض بس تلتزم بالقرار', 'to object but still support the decision', 'Omar chose to disagree and commit.'),
        W('decision log', 'سجل القرارات وأسبابها', 'a record of decisions and their reasons', 'Add it to the decision log.')
      ],
      read: [{ t: 'Amazon Leadership Principles (Have Backbone; Disagree and Commit)', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', what: B('اقرا مبدأ disagree and commit.', 'Read the disagree-and-commit principle.') }],
      challenge: B('أدر نقاش قرار (حقيقي أو تمثيل) لحد ما توصل: اقتراح، اختبار توافق، disagree and commit لو لزم، وسطر في decision log.', 'Lead a decision discussion (real or role-played) to the end: a proposal, a consensus test, disagree-and-commit if needed, and a decision-log entry.'),
      quiz: [
        Q(B('consensus معناها:', 'Consensus means:'), ['no strong objection', 'everyone is thrilled', 'a vote of 51%'], 0, B('مقبول للكل.', 'Acceptable to all.')),
        Q(B('«Can everyone live with this?» بتسأل عن:', '«Can everyone live with this?» asks about:'), ['strong objections', 'where people live', 'the agenda'], 0, B('اعتراض.', 'Objections.')),
        Q(B('decision log فايدته:', 'A decision log helps:'), ['avoid reopening decisions without new information', 'hide decisions', 'replace the agenda'], 0, B('ذاكرة.', 'Memory.'))
      ] },

    { title: B('الختام والمحضر', 'Closing and minutes'),
      goal: B('تختم الاجتماع بمسؤوليات واضحة ومحضر في نفس اليوم.', 'Close the meeting with clear responsibilities and minutes on the same day.'),
      learn: [
        L(B('جمل الختام', 'Closing phrases'),
          B('قبل الآخر بـ 5 دقايق: «Let’s wrap up.» لخّص القرارات، واقرا الخطوات بأسمائها: «So, Sara will update the design doc by Monday, and Omar will run the load test by Wednesday.» واختم: «Thanks, everyone — that was productive.»', 'Five minutes before the end: «Let’s wrap up.» Summarise the decisions and read the actions with names: «So, Sara will update the design doc by Monday, and Omar will run the load test by Wednesday.» Close: «Thanks, everyone — that was productive.»'),
          '"Let’s wrap up. We decided on Postgres. Actions: Sara — doc by Mon; Omar — load test by Wed.\n Parking lot items go to next week. Thanks, everyone."'),
        L(B('المحضر', 'The minutes'),
          B('**minutes** (محضر) قصير يتبعت في نفس اليوم: التاريخ والحاضرين، القرارات، الخطوات (مين، إيه، إمتى)، الـ parking lot، والاجتماع الجاي. مش نص كل اللي اتقال.', 'Short **minutes** sent the same day: the date and attendees, the decisions, the actions (who, what, when), the parking lot, and the next meeting. Not a transcript of everything said.'),
          'Minutes — Queue decision · 9 Oct · Sara, Omar, Mona, me\nDecision: Postgres queue (revisit > 50k/day)\nActions: Sara doc (Mon) · Omar load test (Wed)\nParking lot: SMS orders · Next: 16 Oct'),
        L(B('اجتماعات أونلاين', 'Online meetings'),
          B('أونلاين: ابدأ في الميعاد، «Can everyone hear me?»، اطلب الكاميرا لو مناسب، استخدم الشات للينكات والقرارات، و«You’re on mute» بلطف. ولو فيه **chair** (رئيس اجتماع) وحد بيكتب المحضر، حدّدهم من الأول.', 'Online: start on time, «Can everyone hear me?», ask for cameras if appropriate, use the chat for links and decisions, and say «You’re on mute» kindly. If there is a **chair** and someone taking minutes, assign them at the start.'),
          '"Mona will take notes today. I’ll paste the decisions in the chat as we go."')
      ],
      practice: [
        B('اكتب ختام اجتماع في 6 جمل.', 'Write a meeting close in 6 sentences.'),
        B('اكتب محضر لاجتماع حقيقي أو متخيّل.', 'Write minutes for a real or imagined meeting.'),
        B('اكتب 6 جمل للاجتماعات الأونلاين.', 'Write 6 phrases for online meetings.'),
        B('ابعت المحضر لنفسك كإيميل منسق.', 'Send yourself the minutes as a formatted email.')
      ],
      words: [
        W('closing remarks', 'كلمة الختام', 'the final words of a meeting or talk', 'Keep your closing remarks short.'),
        W('minutes', 'محضر الاجتماع', 'the written record of a meeting', 'I’ll send the minutes today.'),
        W('chair', 'رئيس/مدير الاجتماع', 'the person in charge of a meeting', 'Sara will chair the meeting.'),
        W('action owner', 'المسؤول عن خطوة', 'the person responsible for an action', 'Every action needs an action owner.'),
        W('productive', 'مثمر ومفيد', 'achieving useful results', 'Thanks, that was productive.')
      ],
      read: ['lib:The Scrum Guide', { lib: 'BBC Learning English', what: B('دوّر على «business English meetings».', 'Search for «business English meetings».') }],
      challenge: B('أدر اجتماع كامل (20–30 دقيقة) من التحضير للمحضر: دعوة، افتتاح، بنود، قرار، ختام، ومحضر في نفس اليوم — وقيّم نفسك بـ 5 أسئلة.', 'Run a complete meeting (20–30 minutes) from preparation to minutes: invitation, opening, items, a decision, a close and same-day minutes — and assess yourself with 5 questions.'),
      quiz: [
        Q(B('المحضر بيتبعت:', 'Minutes are sent:'), ['the same day', 'a month later', 'never'], 0, B('والأحداث طازة.', 'While fresh.')),
        Q(B('المحضر فيه:', 'Minutes include:'), ['decisions and actions with owners', 'every word said', 'jokes'], 0, B('مختصر.', 'Short.')),
        Q(B('«Let’s wrap up» معناها:', '«Let’s wrap up» means:'), ['let us finish and summarise', 'let us start', 'let us pause'], 0, B('ختام.', 'Closing.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تدير اجتماعات بالإنجليزي بثقة.', 'Run meetings in English confidently.'),
      review: [
        B('الهدف والنتيجة والـ agenda بـ timeboxes والـ pre-read.', 'Objective, outcome, a timeboxed agenda and the pre-read.'),
        B('الافتتاح والـ parking lot وtake offline والانتقالات.', 'The opening, the parking lot, taking things offline and transitions.'),
        B('دعوة الصامتين، المقاطعة المهذبة، والتأكد من الفهم.', 'Inviting quiet people, polite interruption and checking understanding.'),
        B('الاقتراح، اختبار التوافق، disagree and commit، وdecision log.', 'Proposing, testing for consensus, disagree and commit, and the decision log.'),
        B('الختام والمحضر والاجتماعات الأونلاين.', 'Closing, minutes and online meetings.')
      ],
      project: B('أدر 2 اجتماعات بالإنجليزي (مع زملاء أو مجموعة تعلّم أو role-play مع AI): واحد لاتخاذ قرار تقني وواحد لتخطيط أسبوع. لكل واحد: دعوة بـ agenda، تسجيل صوتي، decision log، ومحضر — واكتب تقييم ذاتي بنقطتين تحسّنهم.', 'Run 2 English meetings (with colleagues, a study group or an AI role-play): one to make a technical decision and one to plan a week. For each: an invitation with an agenda, an audio recording, a decision-log entry and minutes — and write a self-assessment with two points to improve.'),
      test: [
        Q(B('objective:', 'An objective is:'), ['why we are meeting', 'the room', 'the attendees'], 0, B('الهدف.', 'The purpose.')),
        Q(B('timebox:', 'A timebox is:'), ['a fixed time for an item', 'a calendar app', 'a break'], 0, B('وقت محدد.', 'Fixed time.')),
        Q(B('pre-read يتقري:', 'A pre-read is read:'), ['before the meeting', 'after the meeting', 'never'], 0, B('قبل.', 'Before.')),
        Q(B('parking lot:', 'The parking lot:'), ['topics postponed for later', 'where cars go', 'the agenda'], 0, B('مؤجل.', 'Postponed.')),
        Q(B('«Can I just jump in?»:', '«Can I just jump in?»:'), ['a polite way to interrupt', 'a rude command', 'an exit line'], 0, B('مقاطعة مهذبة.', 'A polite interruption.')),
        Q(B('round-robin في اجتماع:', 'A round-robin in a meeting:'), ['everyone speaks in turn', 'one person speaks', 'nobody speaks'], 0, B('بالدور.', 'In turn.')),
        Q(B('«So what you’re saying is…» لـ:', '«So what you’re saying is…» is for:'), ['checking understanding', 'ending the meeting', 'disagreeing'], 0, B('تأكد.', 'Checking.')),
        Q(B('اقتراح واضح:', 'A clear proposal:'), ['«I propose we use Postgres for now.»', '«Hmm, maybe something.»', 'silence'], 0, B('اقتراح.', 'A proposal.')),
        Q(B('disagree and commit:', 'Disagree and commit:'), ['object but support the decision', 'leave the team', 'block the decision'], 0, B('التزام.', 'Commitment.')),
        Q(B('decision log فيه:', 'A decision log holds:'), ['the decision, reason and date', 'everyone’s salaries', 'only the title'], 0, B('سجل.', 'A record.')),
        Q(B('الختام:', 'The close:'), ['summarise decisions and read actions with names', 'leave without a word', 'start a new topic'], 0, B('مسؤوليات.', 'Responsibilities.')),
        Q(B('minutes:', 'Minutes are:'), ['a short written record of decisions and actions', 'a full transcript', 'a timer'], 0, B('محضر.', 'A record.'))
      ] }
  ]
};
