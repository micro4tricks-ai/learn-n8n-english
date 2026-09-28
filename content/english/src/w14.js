// Week 14 — Meetings and the stand-up.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('الاجتماعات والـ standup', 'Meetings and the stand-up'),
  goal: B('تشارك في اجتماع بالإنجليزي: تحضّر agenda، وتقول الـ stand-up في 60 ثانية، وتتعامل مع مشاكل المكالمة، وتوافق وتعترض بأدب، وتلخّص بالكلام المنقول.',
          'Take part in an English meeting: prepare an agenda, give a 60-second stand-up, handle call problems, agree and disagree politely, and summarise with reported speech.'),
  days: [
    { title: B('قبل الاجتماع', 'Before the meeting'),
      goal: B('تكتب دعوة اجتماع وagenda، وتعرّف نفسك ودورك في الفريق.', 'Write a meeting invite and an agenda, and introduce yourself and your role in the team.'),
      learn: [
        { h: B('الـ agenda', 'The agenda'),
          p: B('هدف الاجتماع في سطر، و3-5 بنود بالوقت، والمطلوب من الحاضرين قبلها. اجتماع من غير agenda غالبًا بيضيع وقت.', 'The goal in one line, 3–5 items with times, and what attendees should prepare. A meeting without an agenda usually wastes time.'),
          ex: 'Goal: agree on the Q4 roadmap.\n1. Last quarter in numbers (10 min)\n2. Proposed features (20 min)\n3. Decisions and owners (10 min)\nPlease read the proposal before the call.' },
        { h: B('تعرّف نفسك', 'Introducing yourself'),
          p: B('Hi everyone, I\'m Mahmoud. I\'m a backend developer on the payments team, and I report to Sara, the head of engineering.', 'Hi everyone, I\'m Mahmoud. I\'m a backend developer on the payments team, and I report to Sara, the head of engineering.'),
          ex: 'I work in the data department.\nI\'m responsible for the API integrations.' },
        'g:مكان ظروف التكرار'
      ],
      practice: [
        B('اكتب agenda لاجتماع حقيقي أو متخيّل: هدف + 4 بنود بالوقت.', 'Write an agenda for a real or imagined meeting: a goal + 4 items with times.'),
        B('اكتب دعوة اجتماع (invite) قصيرة فيها الميعاد والمدة والرابط والتحضير.', 'Write a short meeting invite with the time, the length, the link and the preparation.'),
        B('اكتب وقول تعريف بنفسك في 3 جمل لاجتماع أول مرة.', 'Write and say a 3-sentence self-introduction for a first meeting.'),
        B('اوصف هيكل فريقك أو شركة تعرفها في 5 جمل (manager، department، head of…).', 'Describe your team\'s structure (or a company you know) in 5 sentences (manager, department, head of…).')
      ],
      words: ['agenda', 'minutes (of a meeting)', 'conference call', 'colleague', 'manager / supervisor', 'department', 'head of (a team)'],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «meetings» في Business English واسمع درس.', 'Search for "meetings" in Business English and listen to a lesson.') }],
      challenge: B('سجّل تعريف بنفسك (30 ثانية) لاجتماع أول مرة مع فريق دولي، واسمعه وصلّح النطق.', 'Record a 30-second self-introduction for a first meeting with an international team, listen to it and fix your pronunciation.'),
      quiz: [
        { q: B('minutes of a meeting هي:', 'The minutes of a meeting are:'), o: [B('ملخص مكتوب للي اتقال واتقرر', 'a written summary of what was said and decided'), B('مدة الاجتماع', 'the length of the meeting'), B('الدقايق الأولى', 'the first minutes')], a: 0, why: B('محضر الاجتماع.', 'The meeting record.') },
        { q: B('agenda كويسة فيها:', 'A good agenda has:'), o: [B('هدف وبنود بالوقت', 'a goal and timed items'), B('قايمة الحاضرين بس', 'only the attendee list'), B('ولا حاجة', 'nothing')], a: 0, why: B('عشان الاجتماع يمشي.', 'So the meeting stays on track.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I report to Sara.', 'I report Sara.', 'I report for Sara.'], a: 0, why: B('report to = مديري المباشر.', 'report to = my direct manager.') }
      ] },

    { title: B('الـ stand-up وAgile', 'The stand-up and Agile'),
      goal: B('تقول الـ stand-up في 60 ثانية بالتلات أسئلة، وتفهم كلام Scrum.', 'Give a 60-second stand-up with the three questions, and understand Scrum vocabulary.'),
      learn: [
        { h: B('التلات أسئلة', 'The three questions'),
          p: B('Yesterday I… (past simple). Today I\'m going to… / I\'ll… Blockers: I\'m blocked by… / No blockers. واتكلم عن الشغل مش عن نفسك: أقل من دقيقة.', 'Yesterday I… (past simple). Today I\'m going to… / I\'ll… Blockers: I\'m blocked by… / No blockers. Talk about the work, not yourself — under a minute.'),
          ex: 'Yesterday I finished the invoice export.\nToday I\'ll write tests for it.\nI\'m blocked on the staging credentials — Ali, can you help after the call?' },
        { h: B('كلام Scrum', 'Scrum words'),
          p: B('sprint (فترة شغل أسبوعين غالبًا)، backlog، story points، velocity (سرعة الفريق)، sprint review، retrospective، product owner (بيحدد الأولويات).', 'sprint (usually two weeks), backlog, story points, velocity (the team\'s pace), sprint review, retrospective, product owner (sets priorities).'),
          ex: 'This ticket is 3 story points.\nOur velocity is about 30 points per sprint.' },
        'g:used to للعادة في الماضي'
      ],
      practice: [
        B('اكتب stand-up لـ 3 أيام متتالية وقوله بصوت عالي في أقل من دقيقة.', 'Write stand-ups for 3 days in a row and say each out loud in under a minute.'),
        B('اكتب 3 طرق تقول بيها إن عندك blocker ومحتاج مين.', 'Write 3 ways to say you have a blocker and who you need.'),
        B('اشرح الفرق بين Scrum وWaterfall في 5 جمل.', 'Explain the difference between Scrum and Waterfall in 5 sentences.'),
        B('اكتب 3 جمل بـ used to عن طريقة شغل قديمة (We used to deploy on Fridays.).', 'Write 3 sentences with used to about an old way of working (We used to deploy on Fridays.).')
      ],
      words: ['stand-up (daily)', 'scrum', 'agile', 'scrum master / product owner', 'velocity', 'waterfall', 'methodology'],
      read: [{ lib: 'The Scrum Guide', what: B('اقرا «Scrum Events» ← «Daily Scrum».', 'Read "Scrum Events" → "Daily Scrum".') }],
      challenge: B('اعمل stand-up يومي بالإنجليزي لمدة 5 أيام (لوحدك أو مع مجموعة) وسجّل آخر واحد.', 'Do a daily English stand-up for 5 days (alone or with a group) and record the last one.'),
      quiz: [
        { q: B('في الـ stand-up، «Yesterday…» بيتقال بـ:', 'In the stand-up, "Yesterday…" uses the:'), o: ['past simple', 'future', 'present perfect continuous'], a: 0, why: B('حاجات خلصت امبارح.', 'Things finished yesterday.') },
        { q: B('velocity في Scrum:', 'velocity in Scrum is:'), o: [B('الشغل اللي الفريق بيخلصه في sprint', 'how much work the team finishes per sprint'), B('سرعة السيرفر', 'server speed'), B('سرعة الكتابة', 'typing speed')], a: 0, why: B('بالنقط غالبًا.', 'Usually in story points.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We used to release every month.', 'We use to release every month before.', 'We used release every month.'], a: 0, why: B('used to + الفعل.', 'used to + verb.') }
      ] },

    { title: B('مكالمات الفيديو', 'Video calls'),
      goal: B('تتعامل مع مشاكل مكالمة الفيديو بالإنجليزي: الصوت، والكاميرا، ومشاركة الشاشة.', 'Handle video-call problems in English: audio, camera and screen sharing.'),
      learn: [
        { h: B('جمل المكالمة', 'Call phrases'),
          p: B('You\'re on mute. / Can you see my screen? / Let me share my screen. / Your camera is off. / There\'s an echo. / Sorry, my internet is unstable. / Can everyone hear me?', 'You\'re on mute. / Can you see my screen? / Let me share my screen. / Your camera is off. / There\'s an echo. / Sorry, my internet is unstable. / Can everyone hear me?'),
          ex: 'Sorry, I was on mute.\nI\'ll turn off my camera to save bandwidth.\nCould you make the text bigger? It\'s hard to read.' },
        { h: B('تقاطع بأدب', 'Interrupting politely'),
          p: B('Sorry to interrupt, but… / Can I add something? / Just a quick question before we move on. / Could you go back to the previous slide?', 'Sorry to interrupt, but… / Can I add something? / Just a quick question before we move on. / Could you go back to the previous slide?'),
          ex: 'Sorry to jump in — can I add one thing about the API?' },
        'g:can و could و be able to'
      ],
      practice: [
        B('اكتب 8 جمل مشاكل مكالمة وحلها.', 'Write 8 call-problem sentences and how to solve each.'),
        B('اعمل مكالمة تجريبية مع حد وشارك شاشتك واشرح حاجة بالإنجليزي 3 دقايق.', 'Have a practice call with someone, share your screen, and explain something in English for 3 minutes.'),
        B('اكتب 4 طرق تقاطع بيها بأدب.', 'Write 4 polite ways to interrupt.'),
        B('اوصف معداتك (مايك، كاميرا، سماعة، لابتوب) في 5 جمل.', 'Describe your equipment (mic, camera, headset, laptop) in 5 sentences.')
      ],
      words: ['mute / unmute', 'share (my) screen', 'camera / webcam', 'headphones / headset', 'echo', 'battery / charger', 'keyboard / mouse'],
      read: [{ lib: 'English with Lucy', what: B('دوّر على فيديو عن «online meetings English» واسمعه.', 'Find a video about "English for online meetings" and watch it.') }],
      challenge: B('اعمل «call checklist» بالإنجليزي حطه جنب الشاشة: 10 جمل هتحتاجها في أي مكالمة.', 'Make an English "call checklist" to keep next to your screen: 10 phrases you need in any call.'),
      quiz: [
        { q: B('«You\'re on mute» معناها:', '"You\'re on mute" means:'), o: [B('الصوت عندك مقفول', 'your microphone is off'), B('الكاميرا مقفولة', 'your camera is off'), B('النت قاطع', 'your internet is down')], a: 0, why: B('mute = كتم.', 'mute = sound off.') },
        { q: B('تقاطع بأدب:', 'Interrupting politely:'), o: ['Stop talking.', 'Sorry to interrupt, but can I add something?', 'Wait wait wait.'], a: 1, why: B('اعتذار + طلب.', 'An apology + a request.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I can\'t able to share my screen.', 'I\'m not able to share my screen.', 'I can\'t to share my screen.'], a: 1, why: B('not able to أو can\'t من غير to.', 'not able to, or can\'t without to.') }
      ] },

    { title: B('المناقشة والقرارات', 'Discussion and decisions'),
      goal: B('توافق وتعترض وتقترح وتتكلم عن الـ trade-offs، وتخلّص الاجتماع بـ action items.', 'Agree, disagree, suggest and discuss trade-offs, and end the meeting with action items.'),
      learn: [
        { h: B('توافق وتعترض', 'Agreeing and disagreeing'),
          p: B('I agree. / That makes sense. / I see your point, but… / I\'m not sure I agree, because… / What if we…? / Have we considered…?', 'I agree. / That makes sense. / I see your point, but… / I\'m not sure I agree, because… / What if we…? / Have we considered…?'),
          ex: 'I see your point about speed, but I\'m worried about maintenance.\nWhat if we start with a POC?' },
        'g:الشرط التاني (تخيّل)',
        { h: B('trade-off وaction items', 'Trade-offs and action items'),
          p: B('The trade-off is speed vs. cost. وآخر الاجتماع: Action items: Ali will update the docs by Monday. Sara will ask the client.', 'The trade-off is speed vs. cost. At the end: Action items: Ali will update the docs by Monday. Sara will ask the client.'),
          ex: 'Decision: we\'ll use Postgres.\nAction items:\n- Mahmoud: write the migration (Tue)\n- Nour: update the diagram (Wed)' }
      ],
      practice: [
        B('اكتب 5 طرق توافق و5 تعترض بأدب.', 'Write 5 ways to agree and 5 ways to disagree politely.'),
        B('اكتب trade-off لقرارين تقنيين (مثلًا SQL ولا NoSQL).', 'Write the trade-off for two technical decisions (for example SQL vs. NoSQL).'),
        B('اكتب 3 جمل بالشرط التاني: If we had more time, we would…', 'Write 3 second-conditional sentences: If we had more time, we would…'),
        B('اكتب «Decisions + Action items» لاجتماع متخيّل: 2 قرارات و4 مهام بأسماء ومواعيد.', 'Write "Decisions + Action items" for an imagined meeting: 2 decisions and 4 tasks with owners and dates.')
      ],
      words: ['action item', 'sync / sync-up', 'trade-off', 'scope creep', 'retrospective', 'onboarding', 'lifecycle'],
      read: [{ lib: 'Atlassian: Incident postmortems', what: B('اقرا الجزء بتاع «blameless» واكتب 3 جمل محايدة من غير لوم.', 'Read the "blameless" part and write 3 neutral sentences without blame.') }],
      challenge: B('مثّل مع حد (أو لوحدك بصوتين) نقاش 5 دقايق على قرار تقني، وفي الآخر اكتب القرار والـ action items.', 'Role-play a 5-minute discussion about a technical decision with someone (or alone, with two voices), then write the decision and the action items.'),
      quiz: [
        { q: B('اعتراض مؤدب:', 'A polite disagreement:'), o: ['You\'re wrong.', 'I see your point, but I\'m worried about the cost.', 'No way.'], a: 1, why: B('تقدّر رأيه وبعدين قلقك.', 'Acknowledge the view, then your concern.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['If we had more developers, we would finish sooner.', 'If we have more developers, we would finish sooner.', 'If we had more developers, we will finish sooner.'], a: 0, why: B('الشرط التاني: had + would.', 'Second conditional: had + would.') },
        { q: B('scope creep هو:', 'Scope creep is:'), o: [B('المتطلبات بتزيد شوية شوية', 'requirements slowly growing'), B('سرعة الفريق', 'the team\'s speed'), B('خطأ في الكود', 'a code bug')], a: 0, why: B('حاجات بتتضاف بره الخطة.', 'Things added outside the plan.') }
      ] },

    { title: B('بعد الاجتماع', 'After the meeting'),
      goal: B('تلخّص الاجتماع بالكلام المنقول، وتبعت follow-up، وتوصف زمايلك بصفات إيجابية.', 'Summarise the meeting with reported speech, send a follow-up, and describe colleagues with positive adjectives.'),
      learn: [
        'g:الكلام المنقول (reported speech)',
        'g:said و told',
        { h: B('إيميل ما بعد الاجتماع', 'The follow-up email'),
          p: B('Thanks for the meeting. Here\'s a quick summary: … Sara said the client needs the report by Friday. Action items: … Let me know if I missed anything.', 'Thanks for the meeting. Here\'s a quick summary: … Sara said the client needs the report by Friday. Action items: … Let me know if I missed anything.'),
          ex: 'Ali told us that the API would be ready on Monday.\nThe client asked whether we could add Arabic support.' }
      ],
      practice: [
        B('حوّل 6 جمل مباشرة لكلام منقول (He said that… / She told me that…).', 'Turn 6 direct sentences into reported speech (He said that… / She told me that…).'),
        B('اكتب إيميل follow-up لاجتماع: ملخص، وقرارات، وaction items.', 'Write a follow-up email for a meeting: summary, decisions and action items.'),
        B('اوصف 3 زمايل (حقيقيين أو متخيلين) بصفتين إيجابيتين وجملة مثال.', 'Describe 3 colleagues (real or imagined) with two positive adjectives and an example sentence.'),
        B('اختار said ولا told في 6 جمل.', 'Choose said or told in 6 sentences.')
      ],
      words: ['patient / impatient', 'friendly', 'organized', 'honest', 'hard-working', 'scale up', 'plug in'],
      read: [{ lib: 'Perfect English Grammar', what: B('اقرا «Reported speech» وحل التمرين الأول.', 'Read "Reported speech" and do the first exercise.') }],
      challenge: B('اكتب محضر (minutes) لاجتماع حضرته (أو فيديو اجتماع على YouTube) بالإنجليزي: الحاضرين، والنقاط، والقرارات، والمهام.', 'Write English minutes for a meeting you attended (or a meeting video on YouTube): attendees, points, decisions and tasks.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['She said me the build was green.', 'She told me the build was green.', 'She told that the build was green me.'], a: 1, why: B('tell + شخص، say من غير شخص.', 'tell + person; say without a person.') },
        { q: B('«I will fix it» في الكلام المنقول:', '"I will fix it" in reported speech:'), o: ['He said he will fixed it.', 'He said he would fix it.', 'He said he fix it.'], a: 1, why: B('will ← would.', 'will → would.') },
        { q: B('organized معناها:', 'organized means:'), o: [B('منظم', 'tidy and well planned'), B('متعصب', 'angry'), B('بطيء', 'slow')], a: 0, why: B('عكس messy.', 'The opposite of messy.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 15 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 15 opens when you score 70% or more.'),
      review: [
        B('agenda: هدف + بنود بالوقت، وتعريف نفسك ودورك.', 'An agenda: a goal + timed items, and introducing yourself and your role.'),
        B('stand-up: Yesterday / Today / Blockers في أقل من دقيقة.', 'Stand-up: Yesterday / Today / Blockers in under a minute.'),
        B('جمل مكالمة الفيديو، والمقاطعة بأدب.', 'Video-call phrases, and interrupting politely.'),
        B('I see your point, but…، والشرط التاني، وaction items.', 'I see your point, but…, the second conditional, and action items.'),
        B('الكلام المنقول: said / told، وwill ← would.', 'Reported speech: said / told, and will → would.')
      ],
      project: B('نظّم «اجتماع» حقيقي بالإنجليزي (مع زميل أو مجموعة مذاكرة أو حتى لوحدك بتسجيل): ابعت invite وagenda، واعمل stand-up، وناقش قرار واحد، واكتب بعدها إيميل follow-up فيه ملخص بالكلام المنقول وaction items.',
                 'Run a real meeting in English (with a colleague, a study group, or alone as a recording): send an invite and an agenda, do a stand-up, discuss one decision, and then write a follow-up email with a reported-speech summary and action items.'),
      test: [
        { q: B('أول حاجة في agenda:', 'The first thing in an agenda:'), o: [B('هدف الاجتماع', 'the meeting goal'), B('النكتة', 'a joke'), B('قايمة المشاكل', 'a list of complaints')], a: 0, why: B('عشان كله يعرف ليه.', 'So everyone knows why.') },
        { q: B('في الـ stand-up، Blockers هي:', 'In the stand-up, Blockers are:'), o: [B('حاجات موقفاك', 'things stopping you'), B('إنجازاتك', 'your achievements'), B('اجتماعاتك', 'your meetings')], a: 0, why: B('عشان حد يساعد.', 'So someone can help.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Today I\'ll work on the tests.', 'Today I worked on the tests tomorrow.', 'Today I have worked tomorrow.'], a: 0, why: B('خطة النهارده: will.', 'Today\'s plan: will.') },
        { q: B('retrospective هو:', 'A retrospective is:'), o: [B('اجتماع بنراجع فيه إزاي اشتغلنا', 'a meeting to review how we worked'), B('خطة المستقبل', 'the future plan'), B('اختبار', 'a test')], a: 0, why: B('إيه اللي مشي كويس وإيه نحسّنه.', 'What went well and what to improve.') },
        { q: B('«Can you see my screen?» بتقولها لما:', 'You say "Can you see my screen?" when:'), o: [B('بتشارك شاشتك', 'you share your screen'), B('الكاميرا مقفولة', 'your camera is off'), B('الصوت مقفول', 'you are muted')], a: 0, why: B('تتأكد إن المشاركة شغالة.', 'To check sharing works.') },
        { q: B('أحسن مقاطعة:', 'The best interruption:'), o: ['Excuse me, can I add a quick point?', 'Stop!', 'Hey you!'], a: 0, why: B('مؤدبة.', 'Polite.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['If I were you, I would test it first.', 'If I was you, I will test it first.', 'If I am you, I would test.'], a: 0, why: B('نصيحة بالشرط التاني.', 'Advice with the second conditional.') },
        { q: B('action item كويس فيه:', 'A good action item has:'), o: [B('مين وإيه وإمتى', 'who, what and when'), B('فكرة عامة', 'a general idea'), B('سؤال', 'a question')], a: 0, why: B('owner + task + date.', 'owner + task + date.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['He told that the API was ready.', 'He said that the API was ready.', 'He said me that the API was ready.'], a: 1, why: B('say من غير شخص.', 'say without a person.') },
        { q: B('«We can do it» بالكلام المنقول:', '"We can do it" in reported speech:'), o: ['They said they could do it.', 'They said they can did it.', 'They said we can doing it.'], a: 0, why: B('can ← could.', 'can → could.') },
        { q: B('trade-off معناها:', 'trade-off means:'), o: [B('مكسب في حاجة مقابل خسارة في حاجة', 'gaining one thing by giving up another'), B('صفقة تجارية', 'a business deal'), B('خطأ', 'a mistake')], a: 0, why: B('زي السرعة مقابل التكلفة.', 'Like speed vs. cost.') },
        { q: B('onboarding هو:', 'onboarding is:'), o: [B('تجهيز الموظف أو المستخدم الجديد', 'getting a new employee or user started'), B('ركوب الطيارة', 'boarding a plane'), B('فصل موظف', 'firing someone')], a: 0, why: B('أول أيام في الشغل أو المنتج.', 'The first days in a job or product.') }
      ] }
  ]
};
