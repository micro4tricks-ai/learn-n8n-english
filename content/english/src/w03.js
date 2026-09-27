// Week 3 — Simple tenses: present, past and future.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'A1 → A2',
  title: B('الأزمنة البسيطة: الحاضر والماضي والمستقبل', 'Simple tenses: present, past and future'),
  goal: B('تحكي عن شغلك في أي وقت: اللي بيحصل دايمًا، واللي حصل، واللي هيحصل، واللي شغال دلوقتي، وتقول المواعيد صح.',
          'Talk about your work at any time: what always happens, what happened, what will happen, what is happening now, and say times and dates correctly.'),
  days: [
    { title: B('Present simple: الحقايق والتوثيق', 'Present simple: facts and documentation'),
      goal: B('تستخدم المضارع البسيط للحقايق والعادات والتوثيق، ومتنساش s مع he/she/it.', 'Use the present simple for facts, habits and documentation, and never forget the s with he/she/it.'),
      learn: [
        'g:Present simple للحقايق والتوثيق',
        { h: B('s الغايبة', 'The third-person s'),
          p: B('مع he وshe وit (وأي اسم مفرد) الفعل بياخد s: The function returns، The user clicks. ومع I/you/we/they من غيرها.', 'With he, she, it (and any singular noun) the verb takes s: The function returns, The user clicks. With I/you/we/they, no s.'),
          ex: 'The script runs every hour.\nThe scripts run every hour.\nThis method raises an error if the list is empty.' },
        { h: B('الروتين اليومي', 'Your daily routine'),
          p: B('المضارع البسيط هو زمن الروتين: I start work at 9. I check my email first. We have a stand-up every day.', 'The present simple is the tense of routines: I start work at 9. I check my email first. We have a stand-up every day.'),
          ex: 'I usually commute by bus.\nOn weekdays, I code for two hours.\nAt the weekend, I rest.' }
      ],
      practice: [
        B('اكتب يومك من الصبح لبالليل في 10 جمل بالمضارع البسيط.', 'Write your day from morning to night in 10 present-simple sentences.'),
        B('اوصف 5 دوال من كودك بجملة واحدة لكل دالة: This function takes… and returns…', 'Describe 5 functions from your code in one sentence each: This function takes… and returns…'),
        B('حط s في مكانها: `The API return JSON.` و`She write tests.` و`The job run at night.`', 'Add the missing s: `The API return JSON.`, `She write tests.` and `The job run at night.`'),
        B('اقرا أول فقرة في توثيق أي مكتبة، ولوّن كل فعل في المضارع البسيط.', 'Read the first paragraph of any library\'s docs and highlight every present-simple verb.')
      ],
      words: ['present simple', 'auxiliary verb', 'routine', 'weekday / weekend', 'from time to time', 'commute', 'workplace'],
      read: [{ lib: 'Python Tutorial (الرسمي)', what: B('اقرا أول صفحتين من الـ tutorial ولاحظ إزاي التوثيق مكتوب بالمضارع البسيط.', 'Read the first two pages of the tutorial and notice how documentation is written in the present simple.') }],
      challenge: B('اكتب README صغير لسكربت عندك: 5 جمل بالمضارع البسيط تشرح هو بيعمل إيه ومحتاج إيه.', 'Write a small README for one of your scripts: 5 present-simple sentences explaining what it does and what it needs.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The function return a list.', 'The function returns a list.', 'The function returning a list.'], a: 1, why: B('الفاعل مفرد (The function)، فالفعل بياخد s.', 'The subject is singular (The function), so the verb takes s.') },
        { q: B('إمتى نستخدم present simple؟', 'When do we use the present simple?'), o: [B('للحقايق والعادات والتوثيق', 'For facts, habits and documentation'), B('للي بيحصل في اللحظة دي بس', 'Only for what is happening right now'), B('للي حصل امبارح', 'For what happened yesterday')], a: 0, why: B('التوثيق والروتين والحقايق كلها بالمضارع البسيط.', 'Documentation, routines and facts all use the present simple.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We has a meeting every Monday.', 'We have a meeting every Monday.', 'We haves a meeting every Monday.'], a: 1, why: B('مع we الفعل من غير s: have.', 'With we the verb has no s: have.') }
      ] },

    { title: B('does وdon\'t والمواعيد', 'does, don\'t, and telling the time'),
      goal: B('تسأل وتنفي في المضارع بـ do/does، وتحط كلمات التكرار في مكانها، وتقول الساعة والمواعيد.', 'Ask and negate in the present with do/does, put frequency words in the right place, and say times and appointments.'),
      learn: [
        'g:does + الفعل من غير s',
        'g:مكان ظروف التكرار',
        'g:حروف الجر للوقت: in / on / at',
        { h: B('قول الساعة', 'Telling the time'),
          p: B('9:15 = a quarter past nine، و9:30 = half past nine، و9:45 = a quarter to ten. وفي الشغل بنقول الأرقام عادي: nine fifteen.', '9:15 = a quarter past nine, 9:30 = half past nine, 9:45 = a quarter to ten. At work we often just say the numbers: nine fifteen.'),
          ex: 'The meeting starts at half past ten.\nThe backup runs at midnight.\nLet\'s talk at noon.' }
      ],
      practice: [
        B('اكتب 5 أسئلة بـ Does وجاوبها بإجابة قصيرة عن أدوات بتستخدمها.', 'Write 5 questions with Does and answer them with short answers about tools you use.'),
        B('اكتب 6 جمل عن عاداتك في الشغل بـ always / usually / sometimes / never في مكانها الصح.', 'Write 6 sentences about your work habits with always / usually / sometimes / never in the right place.'),
        B('اكتب جدول أسبوعك (meetings، مواعيد، deadlines) بـ in / on / at: on Monday، at 10، in the morning.', 'Write your weekly schedule (meetings, appointments, deadlines) with in / on / at: on Monday, at 10, in the morning.'),
        B('قول بصوت عالي 8 مواعيد: 7:15، 8:30، 11:45، 12:00 بالليل وبالنهار…', 'Say 8 times out loud: 7:15, 8:30, 11:45, 12:00 day and night…')
      ],
      words: ['noon / midnight', 'a quarter past / to', 'half past', 'alarm', 'calendar', 'reminder', 'on time / in time'],
      read: [{ lib: 'EnglishClub', what: B('دوّر على «telling the time» واقرا الدرس وجرب التمرين.', 'Search for "telling the time", read the lesson and try the exercise.') }],
      challenge: B('ابعت لنفسك (أو لزميل) رسالة بالإنجليزي بتحدد فيها ميعاد اجتماع: اليوم والساعة والمدة، باستخدام on/at/for.', 'Send yourself (or a teammate) an English message setting up a meeting: the day, the time and how long, using on/at/for.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Does the script sends emails?', 'Does the script send emails?', 'Do the script send emails?'], a: 1, why: B('Does مع المفرد، والفعل بعدها من غير s.', 'Does with a singular subject, and the verb after it has no s.') },
        { q: B('فين always؟', 'Where does always go?'), o: ['I check always the logs.', 'I always check the logs.', 'Always I check the logs always.'], a: 1, why: B('ظرف التكرار قبل الفعل العادي: I always check.', 'The frequency adverb goes before the main verb: I always check.') },
        { q: B('اختار حرف الجر: `The demo is ___ Friday ___ 3 pm.`', 'Choose the prepositions: `The demo is ___ Friday ___ 3 pm.`'), o: ['in / on', 'on / at', 'at / in'], a: 1, why: B('on مع الأيام، وat مع الساعة.', 'on with days, at with clock times.') }
      ] },

    { title: B('Past simple: اللي حصل', 'Past simple: what happened'),
      goal: B('تحكي اللي حصل امبارح أو في آخر sprint بالماضي البسيط، بالأفعال المنتظمة والشاذة، وتسأل وتنفي بـ did.', 'Tell what happened yesterday or in the last sprint in the past simple, with regular and irregular verbs, and ask and negate with did.'),
      learn: [
        'g:Past simple للي حصل',
        'g:did + الفعل في المصدر',
        'g:تصريف الأفعال الشاذة',
        { h: B('نطق ed', 'How to say -ed'),
          p: B('ed ليها 3 أصوات: /t/ بعد الأصوات المكتومة (fixed، pushed)، و/d/ بعد الباقي (deployed، called)، و/ɪd/ بعد t وd بس (tested، updated).', '-ed has 3 sounds: /t/ after voiceless sounds (fixed, pushed), /d/ after the others (deployed, called), and /ɪd/ only after t and d (tested, updated).'),
          ex: 'fixed /fɪkst/   deployed /dɪˈplɔɪd/   tested /ˈtestɪd/' }
      ],
      practice: [
        B('اكتب اللي عملته امبارح في الشغل أو المذاكرة في 8 جمل بالماضي البسيط.', 'Write what you did yesterday at work or while studying in 8 past-simple sentences.'),
        B('اكتب ماضي 15 فعل شاذ بتستخدمها: write, run, find, build, send, get, make, take…', 'Write the past of 15 irregular verbs you use: write, run, find, build, send, get, make, take…'),
        B('حوّل 4 جمل لسؤال ونفي بـ did: `The deploy failed.` ← `Did the deploy fail?` / `The deploy didn\'t fail.`', 'Turn 4 sentences into questions and negatives with did: `The deploy failed.` → `Did the deploy fail?` / `The deploy didn\'t fail.`'),
        B('قول 10 أفعال ماضي بصوت عالي وقسّمهم على الأصوات التلاتة لـ ed.', 'Say 10 past-tense verbs out loud and sort them by the three -ed sounds.')
      ],
      code: [
        { u: B('ملخص «امبارح عملت إيه»', 'A "what I did yesterday" summary'), p: 'Yesterday I fixed the login bug.\nI wrote two unit tests.\nI didn\'t finish the report, so I will do it today.' }
      ],
      words: ['past simple', 'irregular verb', 'early / late', 'launch', 'timestamp', 'duration', 'delay / pause'],
      read: [{ lib: 'Perfect English Grammar', what: B('اقرا درس «Past simple» وافتح جدول الأفعال الشاذة واحفظ منه 10.', 'Read the "Past simple" lesson, open the irregular verbs list and learn 10 of them.') }],
      challenge: B('اكتب «قصة bug» حصلت لك في 8 جمل بالماضي: إيه اللي حصل، ولقيت السبب إزاي، وصلّحته إزاي.', 'Write the story of a bug you had in 8 past-tense sentences: what happened, how you found the cause, and how you fixed it.'),
      quiz: [
        { q: B('ماضي build إيه؟', 'What is the past of build?'), o: ['builded', 'built', 'build'], a: 1, why: B('build فعل شاذ: build ← built.', 'build is irregular: build → built.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Did you pushed the fix?', 'Did you push the fix?', 'Do you pushed the fix?'], a: 1, why: B('بعد did الفعل بيرجع لأصله: push.', 'After did, the verb returns to its base form: push.') },
        { q: B('ed في tested بتتنطق إزاي؟', 'How is -ed in tested pronounced?'), o: ['/t/', '/d/', '/ɪd/'], a: 2, why: B('بعد t وd بس بتتنطق مقطع كامل /ɪd/.', 'Only after t and d is it a full syllable, /ɪd/.') }
      ] },

    { title: B('المستقبل: will وgoing to', 'The future: will and going to'),
      goal: B('تتكلم عن الخطط والوعود والتوقعات، وتظبط المواعيد: تحجز وتأجل وتلغي.', 'Talk about plans, promises and predictions, and handle appointments: book, reschedule and cancel.'),
      learn: [
        'g:Will و going to',
        'g:المستقبل بعد when وif',
        { h: B('وعد في الشغل', 'Promises at work'),
          p: B('will بتستخدمها للوعد أو القرار اللحظي: I\'ll check it. I\'ll send it by 5. وgoing to للخطة اللي قررتها قبل كده: We\'re going to migrate next month.', 'Use will for promises and decisions made now: I\'ll check it. I\'ll send it by 5. Use going to for a plan you already decided: We\'re going to migrate next month.'),
          ex: 'A: The build is red.\nB: I\'ll look into it.\n\nWe\'re going to release version 2 on Monday.' }
      ],
      practice: [
        B('اكتب 5 خطط للشهر ده بـ going to و5 وعود لزميل بـ will.', 'Write 5 plans for this month with going to and 5 promises to a teammate with will.'),
        B('صلّح: `When the build will finish, I will deploy.` و`If it will fail, call me.`', 'Fix: `When the build will finish, I will deploy.` and `If it will fail, call me.`'),
        B('اكتب 3 رسايل قصيرة: تحجز ميعاد، وتأجله، وتلغيه بأدب.', 'Write 3 short messages: book an appointment, reschedule it, and cancel it politely.'),
        B('اكتب توقعاتك (predictions) لمشروعك بعد 6 شهور في 5 جمل بـ will.', 'Write 5 predictions with will about your project six months from now.')
      ],
      words: ['future (will / going to)', 'schedule', 'timezone', 'appointment', 'reschedule', 'postpone / cancel', 'available / busy'],
      read: [{ lib: 'British Council LearnEnglish', what: B('اقرا درس «Future forms» في مستوى A2 وحل التمرين.', 'Read the A2 "Future forms" lesson and do the exercise.') }],
      challenge: B('اكتب إيميل قصير لعميل في منطقة زمنية تانية تقترح فيه ميعادين لمكالمة، وتذكر الساعة بتوقيته هو.', 'Write a short email to a client in another timezone suggesting two times for a call, giving the time in their timezone.'),
      quiz: [
        { q: B('زميلك قال «التست واقع». ترد تقول:', 'Your teammate says "the test is failing". You reply:'), o: ['I look at it.', 'I\'ll look at it.', 'I\'m going to looking at it.'], a: 1, why: B('قرار في اللحظة أو وعد: I\'ll.', 'A decision made now, or a promise: I\'ll.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['When the tests will pass, I\'ll merge.', 'When the tests pass, I\'ll merge.', 'When the tests passed, I merge.'], a: 1, why: B('بعد when وif بنستخدم المضارع حتى لو الكلام عن المستقبل.', 'After when and if we use the present even when we mean the future.') },
        { q: B('reschedule معناها إيه؟', 'What does reschedule mean?'), o: [B('تلغي نهائيًا', 'Cancel for good'), B('تحط ميعاد جديد', 'Set a new time'), B('تحضر في الميعاد', 'Be there on time')], a: 1, why: B('reschedule = تغيّر الميعاد لوقت تاني.', 'reschedule = move it to another time.') }
      ] },

    { title: B('Present continuous: الشغل الجاري', 'Present continuous: work in progress'),
      goal: B('تقول إنت شغال على إيه دلوقتي والفترة دي، وتفرّق بين الشغل الجاري والعادة.', 'Say what you are working on now and these days, and tell work in progress from a habit.'),
      learn: [
        'g:Present continuous للشغل الجاري',
        'g:أفعال مبتجيش في المستمر',
        { h: B('الجاري مقابل العادة', 'In progress vs. habit'),
          p: B('I\'m fixing the bug (دلوقتي). I fix bugs every day (عادة). وفي الـ stand-up بنقول: Today I\'m working on…', 'I\'m fixing the bug (now). I fix bugs every day (habit). In the stand-up we say: Today I\'m working on…'),
          ex: 'Right now I\'m writing the tests.\nThis week we\'re migrating the database.\nThe server is restarting, please wait.' }
      ],
      practice: [
        B('اكتب 6 جمل عن اللي بتعمله الأسبوع ده بـ I\'m / We\'re + ing.', 'Write 6 sentences about what you are doing this week with I\'m / We\'re + ing.'),
        B('اكتب 5 أزواج جمل: عادة ضد شغل جاري (I usually… / Right now I\'m…).', 'Write 5 pairs of sentences: a habit vs. something in progress (I usually… / Right now I\'m…).'),
        B('صلّح: `I am knowing the answer.` و`She is needing access.` و`I working on it.`', 'Fix: `I am knowing the answer.`, `She is needing access.` and `I working on it.`'),
        B('اكتب رسالة حالة (status update) من 3 سطور عن مهمة شغال عليها.', 'Write a 3-line status update about a task you are working on.')
      ],
      words: ['present continuous', 'participle', 'infinitive', 'in advance', 'as soon as possible', 'book (a table / a flight)', 'ASAP'],
      read: [{ lib: 'EnglishPage', what: B('اقرا صفحة «Present Continuous» وحل أول تمرين.', 'Read the "Present Continuous" page and do the first exercise.') }],
      challenge: B('سجّل صوتك وانت بتقول «status update» لمدة دقيقة: شغال على إيه، خلصت إيه، وهتعمل إيه بعد كده.', 'Record a one-minute status update: what you are working on, what you finished, and what you will do next.'),
      quiz: [
        { q: B('اختار الصح لشغل بيحصل دلوقتي:', 'Choose the correct sentence for work happening now:'), o: ['I work on the API right now.', 'I\'m working on the API right now.', 'I\'m work on the API right now.'], a: 1, why: B('دلوقتي = am/is/are + ing.', 'Now = am/is/are + ing.') },
        { q: B('أنهي جملة صح؟', 'Which sentence is correct?'), o: ['I\'m needing more time.', 'I need more time.', 'I needing more time.'], a: 1, why: B('need من الأفعال اللي مبتجيش في المستمر.', 'need is one of the verbs we don\'t use in the continuous.') },
        { q: B('ASAP معناها إيه؟', 'What does ASAP mean?'), o: ['as soon as possible', 'always send a present', 'after sending a patch'], a: 0, why: B('ASAP = في أسرع وقت ممكن.', 'ASAP = as soon as possible.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 4 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 4 opens when you score 70% or more.'),
      review: [
        B('المضارع البسيط للحقايق والتوثيق، وs مع he/she/it.', 'Present simple for facts and docs, and s with he/she/it.'),
        B('does/doesn\'t والفعل بعدهم من غير s، وظرف التكرار قبل الفعل.', 'does/doesn\'t with the base verb after them, and frequency adverbs before the verb.'),
        B('الماضي البسيط والأفعال الشاذة، وdid + الفعل في أصله.', 'Past simple and irregular verbs, and did + the base verb.'),
        B('will للوعد والقرار اللحظي، وgoing to للخطة، والمضارع بعد when/if.', 'will for promises and quick decisions, going to for plans, and the present after when/if.'),
        B('المضارع المستمر للشغل الجاري، ومن غير need/know/want في المستمر.', 'Present continuous for work in progress, and no need/know/want in the continuous.')
      ],
      project: B('اكتب «weekly update» كامل لنفسك بالإنجليزي: اللي عملته الأسبوع ده (past simple)، واللي شغال عليه دلوقتي (present continuous)، واللي هتعمله الأسبوع الجاي (going to / will)، وروتينك اليومي (present simple). 15 جملة على الأقل، وسجّله بصوتك.',
                 'Write a full weekly update for yourself in English: what you did this week (past simple), what you are working on now (present continuous), what you will do next week (going to / will), and your daily routine (present simple). At least 15 sentences, and record it in your own voice.'),
      test: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The job run every night.', 'The job runs every night.', 'The job running every night.'], a: 1, why: B('حقيقة متكررة، والفاعل مفرد: runs.', 'A repeated fact with a singular subject: runs.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['She don\'t use Docker.', 'She doesn\'t use Docker.', 'She doesn\'t uses Docker.'], a: 1, why: B('doesn\'t مع she، والفعل بعدها من غير s.', 'doesn\'t with she, and the verb after it has no s.') },
        { q: B('فين usually؟', 'Where does usually go?'), o: ['I review usually the PRs in the morning.', 'I usually review the PRs in the morning.', 'Usually I review usually the PRs.'], a: 1, why: B('قبل الفعل العادي.', 'Before the main verb.') },
        { q: B('اختار حرف الجر: `The release is ___ March.`', 'Choose the preposition: `The release is ___ March.`'), o: ['on', 'at', 'in'], a: 2, why: B('in مع الشهور والسنين.', 'in with months and years.') },
        { q: B('ماضي send إيه؟', 'What is the past of send?'), o: ['sended', 'sent', 'send'], a: 1, why: B('send ← sent.', 'send → sent.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I didn\'t found the file.', 'I didn\'t find the file.', 'I not found the file.'], a: 1, why: B('didn\'t + الفعل في أصله.', 'didn\'t + the base verb.') },
        { q: B('خطة اتقررت من الأسبوع اللي فات:', 'A plan decided last week:'), o: ['We will to move to AWS.', 'We\'re going to move to AWS.', 'We going to move to AWS.'], a: 1, why: B('خطة متقررة = be going to.', 'A decided plan = be going to.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['If the server will crash, restart it.', 'If the server crashes, restart it.', 'If the server crash, restart it.'], a: 1, why: B('بعد if المضارع البسيط، وs مع المفرد.', 'Present simple after if, with s for a singular subject.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Please wait, the page loads.', 'Please wait, the page is loading.', 'Please wait, the page loading.'], a: 1, why: B('حاجة بتحصل في اللحظة دي: is loading.', 'Something happening right now: is loading.') },
        { q: B('أنهي جملة صح؟', 'Which sentence is correct?'), o: ['I am understanding the problem now.', 'I understand the problem now.', 'I understanding the problem now.'], a: 1, why: B('understand مبتجيش في المستمر.', 'understand is not used in the continuous.') },
        { q: B('9:45 بنقولها:', '9:45 is said as:'), o: ['a quarter past nine', 'a quarter to ten', 'half past nine'], a: 1, why: B('ربع ساعة قبل عشرة: a quarter to ten.', 'Fifteen minutes before ten: a quarter to ten.') },
        { q: B('postpone معناها:', 'postpone means:'), o: [B('تأجّل لوقت بعدين', 'Move to a later time'), B('تبدأ بدري', 'Start early'), B('تحجز مكان', 'Book a place')], a: 0, why: B('postpone = تأجيل.', 'postpone = put off until later.') }
      ] }
  ]
};
