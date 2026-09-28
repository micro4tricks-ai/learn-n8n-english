// Week 13 — Slack and short messages.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('Slack والرسائل القصيرة', 'Slack and short messages'),
  goal: B('تكتب رسايل شات شغل قصيرة وواضحة: تسأل وتطلب مساعدة وتدي تحديث، وتفهم الاختصارات والأفعال المركبة، وتختار النبرة الصح.',
          'Write short, clear work chat messages — ask, request help, give updates — understand the abbreviations and phrasal verbs, and choose the right tone.'),
  days: [
    { title: B('اختصارات الشات', 'Chat abbreviations'),
      goal: B('تفهم وتستخدم أشهر اختصارات الشات في الشغل من غير ما تبالغ.', 'Understand and use the most common work chat abbreviations without overdoing it.'),
      learn: [
        { h: B('الاختصارات الأساسية', 'The core abbreviations'),
          p: B('FYI = للعلم، TL;DR = الخلاصة، IMO = في رأيي، EOD = آخر اليوم، OOO = مش موجود (أجازة)، AFAIK = على حد علمي، TBD = لسه هيتحدد.', 'FYI = for your information, TL;DR = the short version, IMO = in my opinion, EOD = end of day, OOO = out of office, AFAIK = as far as I know, TBD = to be decided.'),
          ex: 'FYI: the staging DB is down until 3 pm.\nTL;DR: we\'re moving the release to Monday.\nI\'ll send it by EOD.' },
        { h: B('امتى متستخدمهاش', 'When not to use them'),
          p: B('مع العملاء الجداد، وفي الإيميلات الرسمية، ولو مش متأكد إن الطرف التاني فاهمها. اكتب الكلمة كاملة.', 'With new clients, in formal emails, or when you\'re not sure the other person knows them. Write the full words.'),
          ex: 'Team chat: OOO tomorrow.\nClient email: I will be out of the office tomorrow.' },
        'g:a lot مش alot'
      ],
      practice: [
        B('اكتب 7 رسايل شات، كل واحدة فيها اختصار من كلمات النهارده.', 'Write 7 chat messages, each using one abbreviation from today\'s words.'),
        B('حوّل 4 رسايل شات لإيميل رسمي من غير اختصارات.', 'Turn 4 chat messages into a formal email without abbreviations.'),
        B('اكتب رسالة TL;DR لخبر طويل (3 سطور → سطر).', 'Write a TL;DR of a long update (3 lines → 1 line).'),
        B('اكتب status لو هتبقى OOO: التاريخ، ومين يغطّي، وإزاي يوصلولك في الطوارئ.', 'Write an OOO status: the dates, who is covering, and how to reach you in an emergency.')
      ],
      words: ['FYI', 'TL;DR', 'IMO / IMHO', 'EOD', 'OOO', 'AFAIK', 'TBD'],
      read: [{ lib: 'DEV Community', what: B('دوّر على مقال عن «async communication» أو «remote work Slack» واقراه.', 'Find an article about "async communication" or "remote work on Slack" and read it.') }],
      challenge: B('اقضي يوم كامل بتكتب كل رسايل الشات بتاعتك بالإنجليزي (مع فريق أو مجموعة مذاكرة).', 'Spend a whole day writing all your chat messages in English (with a team or a study group).'),
      quiz: [
        { q: B('EOD معناها:', 'EOD means:'), o: ['end of day', 'every other day', 'end of deal'], a: 0, why: B('آخر اليوم.', 'By the end of the working day.') },
        { q: B('AFAIK معناها:', 'AFAIK means:'), o: ['as far as I know', 'always for all keys', 'ask for a key'], a: 0, why: B('على حد علمي.', 'as far as I know.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Thanks alot!', 'Thanks a lot!', 'Thanks allot!'], a: 1, why: B('a lot كلمتين.', 'a lot is two words.') }
      ] },

    { title: B('اختصارات المنتج والنبرة', 'Product shorthand and tone'),
      goal: B('تفهم اختصارات المنتج (MVP، POC، SLA، KPI) وتكتب رسايل بنبرة ودودة ومحترفة.', 'Understand product shorthand (MVP, POC, SLA, KPI) and write friendly, professional messages.'),
      learn: [
        { h: B('اختصارات المنتج', 'Product shorthand'),
          p: B('MVP = أبسط نسخة تنفع، POC = تجربة تثبت إن الفكرة ممكنة، SLA = اتفاق مستوى الخدمة (زي 99.9% uptime)، KPI = مؤشر أداء.', 'MVP = minimum viable product, POC = proof of concept, SLA = service-level agreement (e.g. 99.9% uptime), KPI = key performance indicator.'),
          ex: 'Let\'s build a POC first, then decide on the MVP scope.\nOur SLA says we reply within 4 hours.' },
        { h: B('النبرة في الشات', 'Tone in chat'),
          p: B('الكتابة بتوصل أنشف من الكلام. زوّد كلمة ودودة: Thanks!، No rush.، Happy to help. وقلّل الأوامر: «Can you…?» أحسن من «Do this».', 'Writing sounds harsher than speech. Add a friendly word: Thanks!, No rush., Happy to help. Soften commands: "Can you…?" is better than "Do this".'),
          ex: '✗ Why is this broken?\n✓ Hey, the export seems to fail on my side. Any idea what changed?' },
        'g:الكليشيهات'
      ],
      practice: [
        B('اكتب 6 جمل فيها MVP وPOC وSLA وKPI عن مشروعك.', 'Write 6 sentences with MVP, POC, SLA and KPI about your project.'),
        B('أعد كتابة 5 رسايل ناشفة بنبرة ودودة ومحترفة.', 'Rewrite 5 blunt messages in a friendly, professional tone.'),
        B('اكتب رسالة DM لزميل مش تعرفه بتطلب فيه مساعدة صغيرة.', 'Write a DM to a colleague you don\'t know asking for a small favour.'),
        B('اكتب «BTW» رسالتين بتضيف فيها معلومة جانبية.', 'Write two "BTW" messages adding a side note.')
      ],
      words: ['BTW', 'DM', 'MVP', 'POC', 'SLA', 'KPI', 'excited'],
      read: [{ lib: 'freeCodeCamp News', what: B('دوّر على مقال عن «MVP» واقراه.', 'Search for an article about "MVP" and read it.') }],
      challenge: B('اكتب رسالة إعلان في قناة الفريق عن ميزة جديدة: إيه هي، وليه، وعايزين feedback على إيه، بنبرة متحمسة ومحترفة.', 'Write an announcement in the team channel about a new feature: what it is, why, and what feedback you want, in an excited but professional tone.'),
      quiz: [
        { q: B('MVP معناها:', 'MVP means:'), o: ['minimum viable product', 'most valuable player', 'main version plan'], a: 0, why: B('في المنتج: أبسط نسخة تنفع.', 'In product work: the simplest useful version.') },
        { q: B('أحسن رسالة:', 'The best message:'), o: ['Fix this now.', 'Hey, could you take a look at this when you have a moment? Thanks!', 'WHY IS IT BROKEN'], a: 1, why: B('ودودة وواضحة.', 'Friendly and clear.') },
        { q: B('SLA بتحدد:', 'An SLA defines:'), o: [B('مستوى الخدمة المتفق عليه', 'the agreed level of service'), B('سعر المنتج', 'the product price'), B('اسم السيرفر', 'the server name')], a: 0, why: B('service-level agreement.', 'service-level agreement.') }
      ] },

    { title: B('أفعال مركبة للحسابات والسيرفرات', 'Phrasal verbs for accounts and servers'),
      goal: B('تستخدم الأفعال المركبة الشائعة في الشغل التقني صح، ومنها الفرق بين login وlog in.', 'Use common technical phrasal verbs correctly, including login vs. log in.'),
      learn: [
        { h: B('فعل ولا اسم', 'Verb or noun'),
          p: B('الفعل كلمتين: log in، set up، back up، sign up. والاسم أو الصفة كلمة واحدة: the login page، the setup، a backup، the signup form.', 'The verb is two words: log in, set up, back up, sign up. The noun or adjective is one word: the login page, the setup, a backup, the signup form.'),
          ex: 'Please log in to continue. (verb)\nThe login page is slow. (noun)\nBack up the database before you upgrade. / The backup finished.' },
        'g:كلام بيتكرر من غير لزوم',
        { h: B('أفعال السيرفرات', 'Server verbs'),
          p: B('spin up a server (تشغّل سيرفر جديد)، shut down (تقفل)، scale up (تكبّر)، come up with (تطلع بفكرة)، find out (تكتشف).', 'spin up a server (start a new one), shut down, scale up, come up with (think of an idea), find out (discover).'),
          ex: 'We spun up two new servers for the launch.\nI found out why the job was slow.' }
      ],
      practice: [
        B('اكتب 7 جمل، واحدة بكل فعل من كلمات النهارده.', 'Write 7 sentences, one with each verb from today\'s words.'),
        B('اكتب 5 أزواج فعل/اسم: log in / login، set up / setup، back up / backup…', 'Write 5 verb/noun pairs: log in / login, set up / setup, back up / backup…'),
        B('اكتب خطوات «backup and restore» لقاعدة بياناتك بالأفعال المركبة.', 'Write "backup and restore" steps for your database using phrasal verbs.'),
        B('اكتب رسالة للفريق إنك اكتشفت (found out) سبب مشكلة وجالك (came up with) حل.', 'Write a team message saying you found out the cause of a problem and came up with a fix.')
      ],
      words: ['log in / log out', 'sign up', 'back up', 'shut down', 'come up with', 'find out', 'spin up'],
      read: [{ lib: 'EnglishClub', what: B('دوّر على «phrasal verbs» واقرا صفحة الشرح الأساسية.', 'Search for "phrasal verbs" and read the main explanation page.') }],
      challenge: B('راجع كل الأزرار والعناوين في تطبيقك: login ولا log in؟ setup ولا set up؟ وصلّح الغلط.', 'Check every button and heading in your app: login or log in? setup or set up? Fix the wrong ones.'),
      quiz: [
        { q: B('اختار الصح لزرار:', 'Choose the correct button text:'), o: ['Login to continue', 'Log in to continue', 'Log-in to continue'], a: 1, why: B('فعل = كلمتين.', 'A verb = two words.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The backup failed last night.', 'The back up failed last night.', 'The back-up it failed.'], a: 0, why: B('اسم = كلمة واحدة.', 'A noun = one word.') },
        { q: B('«spin up a server» معناها:', '"spin up a server" means:'), o: [B('تشغّل سيرفر جديد', 'start a new server'), B('تلف السيرفر', 'rotate the server'), B('تمسح السيرفر', 'delete the server')], a: 0, why: B('تجهيز وتشغيل.', 'Create and start.') }
      ] },

    { title: B('طلب المساعدة وتحديث الحالة', 'Asking for help and giving status'),
      goal: B('تكتب رسالة طلب مساعدة كاملة في رسالة واحدة، وتحديث حالة من غير ما حد يسألك.', 'Write a complete help request in one message, and a status update before anyone asks.'),
      learn: [
        { h: B('متكتبش «Hi» لوحدها', 'Don\'t just say "Hi"'),
          p: B('اكتب الطلب كله في رسالة واحدة: إيه اللي بتعمله، وإيه اللي حصل، وجربت إيه، وعايز إيه. «Hi» لوحدها بتخلي الطرف التاني يستنى.', 'Put the whole request in one message: what you\'re doing, what happened, what you tried, what you need. A bare "Hi" leaves the other person waiting.'),
          ex: 'Hi Ali, I\'m trying to run the migrations locally but I get "relation does not exist".\nI\'ve reset the DB and pulled main. Any idea what I\'m missing? No rush.' },
        { h: B('الأفعال بتاعة المشاكل', 'Verbs for problems'),
          p: B('work out (تحل/تنجح)، give up (تستسلم)، put off (تأجل)، carry out (تنفّذ)، fall back on (ترجع لحل احتياطي)، look up (تدوّر على معلومة).', 'work out (solve / succeed), give up, put off (postpone), carry out (do), fall back on (use a backup option), look up (search for information).'),
          ex: 'If the API is down, we fall back on the cached data.\nWe put off the migration until next week.' },
        'g:fewer و less'
      ],
      practice: [
        B('اكتب 3 رسايل طلب مساعدة كاملة لمشاكل حقيقية.', 'Write 3 complete help-request messages for real problems.'),
        B('اكتب 7 جمل بالأفعال المركبة بتاعة النهارده.', 'Write 7 sentences with today\'s phrasal verbs.'),
        B('اكتب تحديث حالة من غير ما حد يسأل: «Quick update on X:…».', 'Write an unprompted status update: "Quick update on X:…".'),
        B('اختار fewer ولا less في 6 جمل: fewer errors، less memory.', 'Choose fewer or less in 6 sentences: fewer errors, less memory.')
      ],
      words: ['fall back (on)', 'carry out', 'put off', 'turn on / turn off', 'work out', 'give up', 'look up'],
      read: [{ lib: 'n8n Community', what: B('افتح 3 أسئلة في المنتدى وقارن بين السؤال الواضح والمش واضح.', 'Open 3 forum questions and compare a clear question with an unclear one.') }],
      challenge: B('اسأل سؤال حقيقي في منتدى أو مجموعة (n8n Community أو Stack Overflow) بالشكل الكامل، وتابع الرد.', 'Ask a real question in a forum or group (n8n Community or Stack Overflow) in the complete form, and follow the replies.'),
      quiz: [
        { q: B('أحسن أول رسالة:', 'The best first message:'), o: ['Hi', 'Hi, are you there?', 'Hi Sara, the deploy fails with "permission denied" on step 3. I\'ve checked the SSH key. Any idea?'], a: 2, why: B('كل المعلومات في رسالة واحدة.', 'All the information in one message.') },
        { q: B('«We put off the release» معناها:', '"We put off the release" means:'), o: [B('أجّلنا الإصدار', 'we postponed the release'), B('ألغينا الإصدار', 'we cancelled it'), B('نشرنا الإصدار', 'we published it')], a: 0, why: B('put off = أجّل.', 'put off = postpone.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We have less bugs now.', 'We have fewer bugs now.', 'We have fewer memory now.'], a: 1, why: B('bugs معدودة: fewer.', 'bugs are countable: fewer.') }
      ] },

    { title: B('المشاعر في الشغل', 'Feelings at work'),
      goal: B('تقول إحساسك في الشغل بكلمات مناسبة: متوتر، واثق، فخور، قلقان، من غير ما تبالغ.', 'Say how you feel at work with suitable words — nervous, confident, proud, worried — without overdoing it.'),
      learn: [
        { h: B('إحساس + حرف جر', 'Feeling + preposition'),
          p: B('nervous about، worried about، proud of، excited about، annoyed with (شخص) / about (حاجة)، confident in / about.', 'nervous about, worried about, proud of, excited about, annoyed with (a person) / about (a thing), confident in / about.'),
          ex: 'I\'m a bit nervous about the demo.\nWe\'re proud of this release.\nI\'m worried about the deadline.' },
        { h: B('تقول القلق بشكل محترف', 'Saying you\'re worried, professionally'),
          p: B('بدل «I can\'t do it» قول: I\'m concerned we won\'t finish by Friday. Can we talk about the scope?', 'Instead of "I can\'t do it", say: I\'m concerned we won\'t finish by Friday. Can we talk about the scope?'),
          ex: 'I\'m a little worried about the test coverage. Could we add a day for testing?' },
        'g:the same as و different from'
      ],
      practice: [
        B('اكتب 7 جمل عن إحساسك بمشروعك بالحروف الجر الصح.', 'Write 7 sentences about how you feel about your project with the right prepositions.'),
        B('اكتب رسالة لمديرك بتقول فيها إنك قلقان من موعد تسليم وبتقترح حل.', 'Write a message to your manager saying you\'re worried about a deadline and suggesting a solution.'),
        B('اكتب رسالة تهنئة لزميل على إنجاز (proud of you / great work on…).', 'Write a message congratulating a teammate on an achievement (proud of you / great work on…).'),
        B('اكتب 4 جمل بـ the same as و4 بـ different from.', 'Write 4 sentences with the same as and 4 with different from.')
      ],
      words: ['nervous', 'motivated', 'confident', 'annoyed', 'worried', 'relaxed', 'proud of'],
      read: [{ lib: '6 Minute English (BBC)', what: B('اختار حلقة عن الشغل أو المشاعر واسمعها مرتين.', 'Pick an episode about work or feelings and listen twice.') }],
      challenge: B('اكتب «retro note» شخصية عن آخر أسبوع: إيه اللي فرّحك، وإيه اللي قلقك، وإيه اللي هتغيّره، بالإنجليزي.', 'Write a personal "retro note" about last week in English: what made you happy, what worried you, and what you\'ll change.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I\'m nervous for the demo.', 'I\'m nervous about the demo.', 'I\'m nervous of the demo.'], a: 1, why: B('nervous about.', 'nervous about.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We\'re proud about this release.', 'We\'re proud of this release.', 'We\'re proud with this release.'], a: 1, why: B('proud of.', 'proud of.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['This version is different than the old one from.', 'This version is different from the old one.', 'This version is different of the old one.'], a: 1, why: B('different from.', 'different from.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 14 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 14 opens when you score 70% or more.'),
      review: [
        B('FYI / TL;DR / EOD / OOO / AFAIK / TBD، ومتستخدمهاش مع العملاء الجداد.', 'FYI / TL;DR / EOD / OOO / AFAIK / TBD, and not with new clients.'),
        B('MVP / POC / SLA / KPI، والنبرة الودودة في الشات.', 'MVP / POC / SLA / KPI, and a friendly tone in chat.'),
        B('الفعل كلمتين والاسم كلمة: log in / login، back up / backup.', 'Verb = two words, noun = one word: log in / login, back up / backup.'),
        B('طلب مساعدة كامل في رسالة واحدة، وput off / fall back on / work out.', 'A complete help request in one message, and put off / fall back on / work out.'),
        B('الإحساس + حرف الجر: nervous about، proud of.', 'Feeling + preposition: nervous about, proud of.')
      ],
      project: B('اكتب «أسبوع في Slack» لمشروعك: 10 رسايل حقيقية أو واقعية (إعلان، سؤال، تحديث حالة، OOO، شكر، قلق من موعد، رد على سؤال زميل)، كل واحدة بنبرة مناسبة، ومعاهم نسخة إيميل رسمي لرسالتين منهم لعميل.',
                 'Write "a week on Slack" for your project: 10 real or realistic messages (an announcement, a question, a status update, OOO, thanks, a deadline worry, a reply to a teammate), each in a suitable tone, plus a formal client-email version of two of them.'),
      test: [
        { q: B('TL;DR معناها:', 'TL;DR means:'), o: [B('الخلاصة', 'the short summary'), B('عاجل', 'urgent'), B('للعلم', 'for information')], a: 0, why: B('too long; didn\'t read.', 'too long; didn\'t read.') },
        { q: B('OOO في الـ status معناها:', 'OOO in a status means:'), o: [B('مش في الشغل', 'out of office'), B('مشغول جدًا', 'very busy'), B('في اجتماع', 'in a meeting')], a: 0, why: B('out of office.', 'out of office.') },
        { q: B('POC معناها:', 'POC means:'), o: ['proof of concept', 'point of contact only', 'price of change'], a: 0, why: B('تجربة تثبت الفكرة.', 'A small test that proves the idea.') },
        { q: B('أنهي رسالة لعميل جديد مناسبة؟', 'Which message suits a new client?'), o: ['FYI, OOO till EOD.', 'I will be out of the office until the end of the day.', 'OOO lol'], a: 1, why: B('من غير اختصارات.', 'No abbreviations.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Please login again.', 'Please log in again.', 'Please log-in again.'], a: 1, why: B('فعل = log in.', 'Verb = log in.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Set up the project first.', 'Setup the project first.', 'Set-up the project first.'], a: 0, why: B('فعل = set up.', 'Verb = set up.') },
        { q: B('«We came up with a new plan» معناها:', '"We came up with a new plan" means:'), o: [B('طلعنا بخطة جديدة', 'we thought of a new plan'), B('طلعنا لفوق', 'we went upstairs'), B('ألغينا الخطة', 'we cancelled the plan')], a: 0, why: B('come up with = يفكر في.', 'come up with = think of.') },
        { q: B('«If the API fails, we fall back on the cache» معناها:', '"If the API fails, we fall back on the cache" means:'), o: [B('بنستخدم الكاش كبديل', 'we use the cache instead'), B('بنمسح الكاش', 'we clear the cache'), B('بنقع', 'we fall')], a: 0, why: B('fall back on = ترجع لبديل.', 'fall back on = use a backup option.') },
        { q: B('أحسن طلب مساعدة:', 'The best help request:'), o: ['Hi', 'Anyone here?', 'Hi team, `npm install` fails with EACCES on Ubuntu 24. I tried sudo and it\'s the same. Any idea?'], a: 2, why: B('كل حاجة في رسالة واحدة.', 'Everything in one message.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['It uses fewer memory.', 'It uses less memory.', 'It uses lesser memorys.'], a: 1, why: B('memory مش معدودة: less.', 'memory is uncountable: less.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I\'m worried about the deadline.', 'I\'m worried for the deadline about.', 'I\'m worried of the deadline.'], a: 0, why: B('worried about.', 'worried about.') },
        { q: B('أحسن طريقة تقول إنك قلقان:', 'The best way to say you are worried:'), o: ['This is impossible.', 'I\'m concerned we won\'t finish by Friday. Can we review the scope?', 'I give up.'], a: 1, why: B('محترف ومعاه اقتراح.', 'Professional, with a suggestion.') }
      ] }
  ]
};
