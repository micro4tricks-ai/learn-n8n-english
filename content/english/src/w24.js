// Week 24 — Long professional writing and the capstone (end of the journey).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'C1',
  title: B('الكتابة الاحترافية الطويلة ومشروع التخرج', 'Long professional writing and the capstone project'),
  goal: B('تكتب نص طويل احترافي (مقال تقني أو case study أو design doc) من غير الأغلاط الشائعة، ومنظم بفقرات وعناوين، وتسلّم مشروع تخرج بيجمع كل اللي اتعلمته في 6 شهور.',
          'Write a long professional text — a technical article, a case study or a design doc — free of the common mistakes and organised with paragraphs and headings, and deliver a capstone that brings together six months of learning.'),
  days: [
    { title: B('الكلمات اللي بتتلخبط (1)', 'Confusing words (1)'),
      goal: B('تفرّق بين أكتر الكلمات اللي بتتلخبط في الكتابة: its/it\'s، your/you\'re، their/there/they\'re، then/than.', 'Tell apart the most confused words in writing: its/it\'s, your/you\'re, their/there/they\'re, then/than.'),
      learn: [
        { h: B('اختبار الاختصار', 'The contraction test'),
          p: B('لو تقدر تقول «it is» أو «you are» أو «they are» مكانها، يبقى معاها apostrophe: it\'s، you\'re، they\'re. لو لأ، من غير: its، your، their.', 'If you can say "it is", "you are" or "they are" instead, use the apostrophe: it\'s, you\'re, they\'re. If not, no apostrophe: its, your, their.'),
          ex: 'It\'s ready. / The app and its settings.\nYou\'re right. / Your PR is merged.\nThey\'re online. / Their API is down. / The file is over there.' },
        { h: B('then/than وaffect/effect', 'then/than and affect/effect'),
          p: B('then = بعدين، than = من (مقارنة). affect فعل (يأثر)، effect اسم (تأثير). lose = يخسر/يضيّع، loose = سايب. accept = يقبل، except = ما عدا.', 'then = after that; than = for comparisons. affect is a verb; effect is a noun. lose = misplace or fail to win; loose = not tight. accept = agree to; except = apart from.'),
          ex: 'Python is slower than Go, but then again it\'s easier.\nThe change affects every user. The effect was huge.' },
        'g:its و it\'s'
      ],
      practice: [
        B('اكتب جملة لكل زوج من كلمات النهارده.', 'Write a sentence for each pair in today\'s words.'),
        B('صلّح 10 جمل فيها الأغلاط دي (هتلاقيها في رسايل قديمة أو اكتبها).', 'Fix 10 sentences with these mistakes (find them in old messages or write them).'),
        B('دوّر في README بتاعك على its/it\'s وyour/you\'re وصلّح.', 'Search your README for its/it\'s and your/you\'re and fix them.'),
        B('اكتب فقرة 6 جمل فيها كل الأزواج صح.', 'Write a 6-sentence paragraph using every pair correctly.')
      ],
      words: ['its / it\'s', 'your / you\'re', 'their / there / they\'re', 'then / than', 'lose / loose', 'affect / effect', 'accept / except'],
      read: [{ lib: 'Grammar Monster', what: B('دوّر على «easily confused words» وحل الاختبار.', 'Search for "easily confused words" and take the test.') }],
      challenge: B('خلّي LanguageTool أو Grammarly يراجع آخر 5 نصوص كتبتها وعدّ كام مرة غلطت في الأزواج دي.', 'Let LanguageTool or Grammarly check the last 5 texts you wrote and count how often you mixed up these pairs.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Your right.', 'You\'re right.', 'Youre right.'], a: 1, why: B('you are = you\'re.', 'you are = you\'re.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Go is faster then Python.', 'Go is faster than Python.', 'Go is faster that Python.'], a: 1, why: B('مقارنة: than.', 'Comparison: than.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The bug effects all users.', 'The bug affects all users.', 'The bug affect all users.'], a: 1, why: B('affect فعل، وs مع المفرد.', 'affect is the verb, with s for a singular subject.') }
      ] },

    { title: B('الكلمات اللي بتتلخبط (2)', 'Confusing words (2)'),
      goal: B('تكمّل الأزواج الصعبة: advice/advise، principle/principal، ensure/insure، weather/whether، who\'s/whose.', 'Master more hard pairs: advice/advise, principle/principal, ensure/insure, weather/whether, who\'s/whose.'),
      learn: [
        { h: B('اسم ولا فعل', 'Noun or verb'),
          p: B('advice (اسم، مش معدود) / advise (فعل). practice (اسم) / practise (فعل بريطاني). والنطق مختلف: advice /s/، advise /z/.', 'advice (an uncountable noun) / advise (a verb). practice (noun) / practise (British verb). The pronunciation differs: advice /s/, advise /z/.'),
          ex: 'Thanks for the advice. I advise you to back up first.' },
        { h: B('أزواج تانية', 'Other pairs'),
          p: B('principle = مبدأ، principal = رئيسي/مدير. ensure = تتأكد إن، insure = تأمّن. weather = الطقس، whether = إذا/لو. who\'s = who is، whose = بتاع مين. borrow = تستلف، lend = تسلّف.', 'principle = a rule or belief; principal = main / a head. ensure = make sure; insure = buy insurance. weather = climate conditions; whether = if. who\'s = who is; whose = belonging to whom. borrow = take for a while; lend = give for a while.'),
          ex: 'Please ensure the tests pass.\nI\'m not sure whether the API supports it.\nWhose laptop is this? Who\'s presenting?' },
        { h: B('complement / compliment', 'complement / compliment'),
          p: B('complement = يكمّل (The two tools complement each other). compliment = مدح (Thanks for the compliment!).', 'complement = complete or go well with (The two tools complement each other). compliment = praise (Thanks for the compliment!).'),
          ex: 'n8n complements our Python scripts.' }
      ],
      practice: [
        B('اكتب جملة لكل زوج من كلمات النهارده.', 'Write a sentence for each pair in today\'s words.'),
        B('اكتب إيميل فيه نصيحة لزميل (advice/advise) وتأكيد (ensure).', 'Write an email giving a teammate advice (advice/advise) and a reminder (ensure).'),
        B('اكتب 4 جمل بـ whether في سؤال غير مباشر.', 'Write 4 sentences with whether in indirect questions.'),
        B('اعمل flashcards لكل الأزواج واتمرّن عليها 10 دقايق.', 'Make flashcards for every pair and practise for 10 minutes.')
      ],
      words: ['advice / advise', 'principle / principal', 'complement / compliment', 'ensure / insure', 'weather / whether', 'who\'s / whose', 'borrow / lend'],
      read: [{ lib: 'Merriam-Webster', what: B('دوّر على «ensure vs insure» واقرا الشرح.', 'Look up "ensure vs insure" and read the explanation.') }],
      challenge: B('اكتب «style sheet» شخصي: 20 زوج كلمات بتلخبط فيهم مع جملة لكل واحد، وحطه جنب مكان الكتابة.', 'Write a personal style sheet: 20 word pairs you mix up, each with a sentence, and keep it where you write.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Can you give me an advise?', 'Can you give me some advice?', 'Can you give me an advice?'], a: 1, why: B('advice اسم مش معدود.', 'advice is an uncountable noun.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I don\'t know weather it works.', 'I don\'t know whether it works.', 'I don\'t know wether it works.'], a: 1, why: B('whether = إذا.', 'whether = if.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Who\'s code is this?', 'Whose code is this?', 'Whos code is this?'], a: 1, why: B('whose = بتاع مين.', 'whose = belonging to whom.') }
      ] },

    { title: B('الكلمات اللي بتتلخبط (3)', 'Confusing words (3)'),
      goal: B('تقفل آخر الأزواج: setup/set up، login/log in، every day/everyday، maybe/may be، to/too/two.', 'Close the last pairs: setup/set up, login/log in, every day/everyday, maybe/may be, to/too/two.'),
      learn: [
        { h: B('كلمة ولا كلمتين', 'One word or two'),
          p: B('everyday (صفة: عادي) / every day (كل يوم). maybe (يمكن) / may be (ممكن يكون). setup, login, backup (اسم) / set up, log in, back up (فعل).', 'everyday (an adjective: ordinary) / every day (each day). maybe (perhaps) / may be (might be). setup, login, backup (nouns) / set up, log in, back up (verbs).'),
          ex: 'I use it every day. It\'s an everyday tool.\nMaybe it\'s the cache. It may be the cache.' },
        { h: B('to / too / two', 'to / too / two'),
          p: B('to = لـ / إلى، too = كمان أو أكتر من اللازم، two = اتنين. وstationary = واقف مش بيتحرك، stationery = أدوات مكتبية. further = أكتر (مجازي)، farther = أبعد (مسافة).', 'to = toward / infinitive, too = also or excessively, two = 2. stationary = not moving; stationery = paper and pens. further = more (figurative); farther = more distant.'),
          ex: 'Send the two files to me too.\nThe queue is too long.' },
        'g:a lot مش alot'
      ],
      practice: [
        B('اكتب جملة لكل زوج من كلمات النهارده.', 'Write a sentence for each pair in today\'s words.'),
        B('راجع أزرار ورسايل تطبيقك لـ setup/login/backup.', 'Check your app\'s buttons and messages for setup/login/backup.'),
        B('صلّح 8 جمل فيها to/too/two وmaybe/may be.', 'Fix 8 sentences with to/too/two and maybe/may be.'),
        B('اعمل اختبار لنفسك من 20 سؤال على كل الأزواج بتاعة الأسبوع.', 'Make yourself a 20-question test on all of this week\'s pairs.')
      ],
      words: ['setup / set up', 'login / log in', 'everyday / every day', 'maybe / may be', 'to / too / two', 'stationary / stationery', 'further / farther'],
      read: [{ lib: 'LanguageTool', what: B('حط فيه آخر إيميل كتبته واتأكد من الكلمات دي.', 'Paste your latest email and check these words.') }],
      challenge: B('اكتب «error log» للكتابة: كل غلطة لقيتها الأسبوع ده في كتابتك وصحّتها، وبصّ عليه قبل ما تكتب أي نص مهم.', 'Write a writing "error log": every mistake you found in your writing this week and its correction, and check it before any important text.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I check the logs everyday.', 'I check the logs every day.', 'I check the logs every-day.'], a: 1, why: B('every day = كل يوم.', 'every day = each day.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The file is to big.', 'The file is too big.', 'The file is two big.'], a: 1, why: B('too = أكتر من اللازم.', 'too = more than is good.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Maybe the server is down.', 'May be the server is down.', 'Maybe the server maybe down.'], a: 0, why: B('maybe = يمكن (في أول الجملة).', 'maybe = perhaps (at the start of the sentence).') }
      ] },

    { title: B('المقال التقني الطويل', 'The long technical article'),
      goal: B('تكتب مقال أو design doc طويل: عنوان، ومقدمة، وأقسام بعناوين، وفقرات بجملة موضوع، وخاتمة.', 'Write a long article or design doc: a title, an introduction, headed sections, paragraphs with topic sentences, and a conclusion.'),
      learn: [
        { h: B('الفقرة', 'The paragraph'),
          p: B('جملة موضوع (الفكرة) ← 2–4 جمل دعم (أمثلة، أرقام، كود) ← جملة ربط. فقرة = فكرة واحدة، وطولها 3–6 جمل.', 'A topic sentence (the idea) → 2–4 supporting sentences (examples, numbers, code) → a linking sentence. One paragraph = one idea, 3–6 sentences long.'),
          ex: 'Webhooks are faster than polling. With polling, the workflow checks the API every five minutes, even when nothing has changed. With a webhook, the API calls us the moment an order arrives. As a result, customers get their confirmation in seconds.' },
        { h: B('design doc', 'The design doc'),
          p: B('Context (ليه)، Goals / Non-goals، Proposal، Alternatives considered (والـ trade-offs)، Risks، Plan. ده أهم نص بيكتبه المبرمج الكبير.', 'Context (why), Goals / Non-goals, Proposal, Alternatives considered (with trade-offs), Risks, Plan. It\'s the most important document a senior developer writes.'),
          ex: '## Alternatives considered\nPolling every minute: simpler, but 1,440 API calls a day and up to 60 s delay.' },
        { h: B('كلام عن الملفات والـ APIs', 'Talking about files and APIs'),
          p: B('read / write a file، the file path، the API returns JSON، fewer requests، less data، the user whom we contacted (رسمي).', 'read / write a file, the file path, the API returns JSON, fewer requests, less data, the user whom we contacted (formal).'),
          ex: 'The script reads the CSV file from the input path and writes a JSON file for the API.' }
      ],
      practice: [
        B('اكتب outline لمقال تقني عن حاجة عملتها (عنوان + 4 أقسام).', 'Write an outline for a technical article about something you built (title + 4 sections).'),
        B('اكتب 3 فقرات بالقالب (جملة موضوع + دعم + ربط).', 'Write 3 paragraphs with the template (topic sentence + support + link).'),
        B('اكتب design doc صغير (صفحة) لتغيير في مشروعك.', 'Write a small one-page design doc for a change in your project.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['fewer / less', 'who / whom', 'file', 'path', 'read / write', 'API', 'JSON'],
      read: [{ lib: 'Write the Docs Guide', what: B('اقرا صفحة عن «Writing a design doc» أو «Beginner\'s guide to writing documentation».', 'Read a page about writing design docs, or the "Beginner\'s guide to writing documentation".') }],
      challenge: B('اكتب مقال تقني كامل (800+ كلمة) بالإنجليزي عن مشروعك، وانشره على DEV أو Medium أو مدونتك.', 'Write a complete English technical article (800+ words) about your project and publish it on DEV, Medium or your blog.'),
      quiz: [
        { q: B('الفقرة الكويسة بتبدأ بـ:', 'A good paragraph starts with:'), o: [B('جملة موضوع', 'a topic sentence'), B('مثال', 'an example'), B('سؤال عشوائي', 'a random question')], a: 0, why: B('الفكرة الأول.', 'The idea first.') },
        { q: B('في design doc، «Non-goals» هي:', 'In a design doc, "Non-goals" are:'), o: [B('حاجات مش هنعملها قصدًا', 'things we deliberately won\'t do'), B('أخطاء', 'mistakes'), B('أهداف فشلت', 'failed goals')], a: 0, why: B('بتحدد النطاق.', 'They define the scope.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The new version sends less requests.', 'The new version sends fewer requests.', 'The new version sends lesser requests.'], a: 1, why: B('requests معدودة: fewer.', 'requests are countable: fewer.') }
      ] },

    { title: B('مشروع التخرج', 'The capstone project'),
      goal: B('تخطط وتنفّذ مشروع التخرج اللي بيجمع الكتابة والكلام والاستماع، وتتكلم عن حياتك اليومية بإنجليزي طبيعي.', 'Plan and deliver the capstone that combines writing, speaking and listening, and talk about everyday life in natural English.'),
      learn: [
        { h: B('مكونات مشروع التخرج', 'Capstone parts'),
          p: B('مشروع تقني واحد (أي حاجة بنيتها) ومعاه: README احترافي، ومقال أو case study، وdemo فيديو 5 دقايق، وPR بوصف كامل، وإيميل لعميل متخيّل بيعرض المشروع، ومقابلة تجريبية بتتكلم فيها عنه.', 'One technical project (anything you built) with: a professional README, an article or case study, a 5-minute demo video, a PR with a full description, an email pitching it to an imagined client, and a mock interview in which you talk about it.'),
          ex: 'Capstone checklist:\n[ ] README  [ ] Article  [ ] Demo video\n[ ] PR  [ ] Client email  [ ] Mock interview' },
        { h: B('قيّم نفسك', 'Assess yourself'),
          p: B('قارن أول تسجيل عملته في الأسبوع 1 بتسجيل النهارده، وأول README بآخر واحد. واعمل اختبار مستوى مجاني (EF SET) عشان تعرف وصلت لفين.', 'Compare your first recording from week 1 with one from today, and your first README with your latest. Take a free level test (EF SET) to see where you are now.'),
          ex: 'Week 1: "This error happen when…"\nWeek 24: "This error happens when the token expires; I fixed it by refreshing it automatically."' },
        { h: B('الإنجليزي بتاع كل يوم', 'Everyday English'),
          p: B('الطلاقة مش في الشغل بس: The weather forecast says it\'ll be rainy. / I need to do the laundry and buy groceries. / My laptop is charging. / We\'re planning a trip in the summer.', 'Fluency isn\'t only for work: The weather forecast says it\'ll be rainy. / I need to do the laundry and buy groceries. / My laptop is charging. / We\'re planning a trip in the summer.'),
          ex: 'Keep going after the journey: one English podcast, one article and one piece of writing every week.' }
      ],
      practice: [
        B('اكتب خطة مشروع التخرج بالـ checklist ومواعيد لكل جزء.', 'Write your capstone plan with the checklist and a date for each part.'),
        B('سجّل نفسك دقيقتين عن مشروعك وقارن بتسجيل الأسبوع 1.', 'Record two minutes about your project and compare it with your week-1 recording.'),
        B('اعمل اختبار EF SET أو Cambridge وسجّل نتيجتك.', 'Take the EF SET or Cambridge test and write down your result.'),
        B('اكتب 7 جمل عن يومك العادي بكلمات النهارده.', 'Write 7 sentences about your ordinary day with today\'s words.')
      ],
      words: ['electricity', 'household chores', 'groceries', 'supermarket', 'delivery (food / parcel)', 'laundry', 'weather forecast', 'sunny / cloudy / rainy', 'healthy', 'trip / vacation', 'laptop / tablet', 'printer', 'delivery'],
      read: [{ lib: 'EF SET', what: B('خد الاختبار المجاني (15 أو 50 دقيقة) وقارن مستواك بـ CEFR.', 'Take the free test (15 or 50 minutes) and compare your level with the CEFR.') }],
      challenge: B('اكتب خطة «بعد الرحلة» لـ 3 شهور: بتسمع إيه، وبتقرا إيه، وبتكتب إيه كل أسبوع، وهتتكلم مع مين.', 'Write an "after the journey" plan for 3 months: what you will listen to, read and write each week, and who you will talk with.'),
      quiz: [
        { q: B('مشروع التخرج بيجمع:', 'The capstone combines:'), o: [B('الكتابة والكلام والاستماع على مشروع واحد', 'writing, speaking and listening around one project'), B('اختبار واحد بس', 'a single test'), B('قراءة بس', 'reading only')], a: 0, why: B('كل المهارات.', 'All the skills.') },
        { q: B('أحسن طريقة تعرف اتحسنت قد إيه:', 'The best way to see how much you improved:'), o: [B('تقارن تسجيلاتك وكتابتك الأولى بالأخيرة', 'compare your first recordings and writing with your latest'), B('تسأل حد عشوائي', 'ask a random person'), B('تحس بس', 'just feel it')], a: 0, why: B('دليل حقيقي.', 'Real evidence.') },
        { q: B('groceries هي:', 'groceries are:'), o: [B('طلبات البيت من السوبرماركت', 'food and household items from the supermarket'), B('فواتير', 'bills'), B('هدوم', 'clothes')], a: 0, why: B('مشتريات البيت.', 'Household shopping.') }
      ] },

    { title: B('المراجعة النهائية واختبار التخرج', 'Final review and graduation test'),
      goal: B('راجع الـ 6 شهور، وسلّم مشروع التخرج، وخد اختبار التخرج. لما تجيب 70% أو أكتر تبقى خلّصت رحلة الإنجليزي كلها.', 'Review the six months, hand in the capstone, and take the graduation test. Score 70% or more and you have finished the whole English journey.'),
      review: [
        B('الشهر 1: الجملة، والأزمنة البسيطة، وكلمات الكود، ورسايل الأخطاء.', 'Month 1: the sentence, simple tenses, code words and error messages.'),
        B('الشهر 2: التوثيق، والتسمية، وpresent perfect، والـ passive.', 'Month 2: docs, naming, the present perfect and the passive.'),
        B('الشهر 3: commits وPRs وREADME وbug reports والإيميلات.', 'Month 3: commits, PRs, READMEs, bug reports and emails.'),
        B('الشهر 4: Slack، والاجتماعات، والريفيو، والتفاوض.', 'Month 4: Slack, meetings, review and negotiation.'),
        B('الشهر 5: الاستماع، والنطق، والعروض، والـ demos.', 'Month 5: listening, pronunciation, presentations and demos.'),
        B('الشهر 6: المقابلات، والعرض الوظيفي، والبورتفوليو، والكتابة الطويلة.', 'Month 6: interviews, job offers, the portfolio and long writing.')
      ],
      project: B('مشروع التخرج: اختار مشروع تقني عملته وسلّم معاه بالإنجليزي: README احترافي، ومقال أو case study منشور (800+ كلمة)، وفيديو demo 5 دقايق، وPR بوصف كامل، وإيميل لعميل بيعرض المشروع، وmock interview مسجّلة 20 دقيقة بتتكلم فيها عنه. وفي الآخر اكتب «What I learned in 24 weeks» في 10 جمل.',
                 'Capstone: choose a technical project you built and deliver, in English: a professional README, a published article or case study (800+ words), a 5-minute demo video, a PR with a full description, an email pitching the project to a client, and a recorded 20-minute mock interview about it. Finish with "What I learned in 24 weeks" in 10 sentences.'),
      test: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The server slow today.', 'The server is slow today.', 'The server are slow today.'], a: 1, why: B('is قبل الصفة مع المفرد.', 'is before an adjective with a singular subject.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Does the job runs at night?', 'Does the job run at night?', 'Do the job run at night?'], a: 1, why: B('does + الفعل في أصله.', 'does + base verb.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I have deployed it yesterday.', 'I deployed it yesterday.', 'I deploy it yesterday.'], a: 1, why: B('وقت محدد = past simple.', 'A specific time = past simple.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The data is stored in Postgres.', 'The data stored in Postgres is.', 'The data is store in Postgres.'], a: 0, why: B('passive: is + stored.', 'passive: is + stored.') },
        { q: B('`items[-1]` معناها:', '`items[-1]` means:'), o: ['the first item', 'the last item', 'no item'], a: 1, why: B('آخر عنصر.', 'The last item.') },
        { q: B('401 Unauthorized غالبًا معناها:', '401 Unauthorized usually means:'), o: [B('الـ token ناقص أو غلط', 'a missing or wrong token'), B('الصفحة مش موجودة', 'page not found'), B('السيرفر واقع', 'server down')], a: 0, why: B('مش عارفين انت مين.', 'The server doesn\'t know who you are.') },
        { q: B('أحسن عنوان commit:', 'The best commit subject:'), o: ['fixed stuff.', 'Fix crash when the cart is empty', 'Fixing'], a: 1, why: B('أمر، محدد، من غير نقطة.', 'Imperative, specific, no full stop.') },
        { q: B('في bug report، «Actual» هو:', 'In a bug report, "Actual" is:'), o: [B('اللي حصل فعلًا', 'what really happened'), B('اللي المفروض يحصل', 'what should happen'), B('الحل', 'the fix')], a: 0, why: B('عكس Expected.', 'The opposite of Expected.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I look forward to hear from you.', 'I look forward to hearing from you.', 'I look forward hearing you.'], a: 1, why: B('to + ing.', 'to + -ing.') },
        { q: B('EOD معناها:', 'EOD means:'), o: ['end of day', 'every other day', 'end of deal'], a: 0, why: B('آخر اليوم.', 'End of the working day.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['She said me it was fixed.', 'She told me it was fixed.', 'She told it was fixed me.'], a: 1, why: B('tell + شخص.', 'tell + person.') },
        { q: B('أحسن تعليق ريفيو:', 'The best review comment:'), o: ['This is bad.', 'Could we move this query out of the loop? It runs 100 times.', 'Rewrite it.'], a: 1, why: B('اقتراح + سبب.', 'A suggestion + a reason.') },
        { q: B('تنازل ذكي:', 'A smart concession:'), o: ['OK, half price.', 'We can offer 10% off if you sign for a year.', 'Free!'], a: 1, why: B('مقابل حاجة.', 'In return for something.') },
        { q: B('الضغط في developer على:', 'The stress in developer is on:'), o: ['DE-', '-VEL-', '-ER'], a: 1, why: B('deVELoper.', 'deVELoper.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Sales rose by 20%.', 'Sales rose with 20%.', 'Sales rose of 20%.'], a: 0, why: B('by للمقدار.', 'by for the amount.') },
        { q: B('أطول جزء في STAR:', 'The longest part of STAR:'), o: ['Situation', 'Action', 'Result'], a: 1, why: B('عملت إيه انت.', 'What you did.') },
        { q: B('أحسن سطر CV:', 'The best CV line:'), o: ['Responsible for reports.', 'Automated weekly reports, saving 5 hours a week.', 'I did reports.'], a: 1, why: B('فعل + نتيجة بالأرقام.', 'Verb + result in numbers.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Its a great tool.', 'It\'s a great tool.', 'Its\' a great tool.'], a: 1, why: B('it is = it\'s.', 'it is = it\'s.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I don\'t know weather the API supports it.', 'I don\'t know whether the API supports it.', 'I don\'t know wether the API support it.'], a: 1, why: B('whether = إذا.', 'whether = if.') },
        { q: B('الفقرة الكويسة فيها:', 'A good paragraph has:'), o: [B('فكرة واحدة بجملة موضوع', 'one idea with a topic sentence'), B('5 أفكار', 'five ideas'), B('جملة واحدة طويلة', 'one long sentence')], a: 0, why: B('فقرة = فكرة.', 'One paragraph = one idea.') }
      ] }
  ]
};
