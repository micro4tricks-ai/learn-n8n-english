// Week 23 — Your portfolio and LinkedIn.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B2 → C1',
  title: B('البورتفوليو وLinkedIn', 'Your portfolio and LinkedIn'),
  goal: B('تبني بورتفوليو وبروفايل LinkedIn بالإنجليزي بيبيع شغلك، وتكتب case study لمشروع، وتعمل networking ودردشة عادية مع زمايل من بلاد تانية.',
          'Build an English portfolio and LinkedIn profile that sell your work, write a project case study, and network and make small talk with colleagues from other countries.'),
  days: [
    { title: B('البورتفوليو', 'The portfolio'),
      goal: B('تختار 3–5 مشاريع وتعرض كل واحد بعنوان ووصف ونتيجة وصورة.', 'Choose 3–5 projects and present each with a title, a description, a result and an image.'),
      learn: [
        { h: B('كارت المشروع', 'The project card'),
          p: B('عنوان بيقول الفايدة، وسطرين: المشكلة والحل، والأدوات، والنتيجة بالأرقام، وصورة (thumbnail) ولينك للكود أو الـ demo.', 'A title that says the benefit, two lines — the problem and the solution — the tools, the result in numbers, a thumbnail, and a link to the code or demo.'),
          ex: 'Invoice Reminder Bot\nA small business lost money on late invoices. I built an n8n workflow that reminds customers automatically.\nTools: n8n, Google Sheets, Gmail · Result: 30% fewer late payments.' },
        { h: B('اختار صح', 'Choose well'),
          p: B('3 مشاريع قوية أحسن من 10 نص نص. نوّع: أتمتة، API، واجهة، بيانات. وحط الأحسن الأول.', 'Three strong projects beat ten half-finished ones. Vary them: automation, an API, a front end, data. Put the best first.'),
          ex: 'Pinned on GitHub: 1) invoice-bot 2) weather-api 3) sales-dashboard' },
        'g:التوازي في القوايم'
      ],
      practice: [
        B('اكتب 3 كروت مشاريع بالقالب.', 'Write 3 project cards with the template.'),
        B('اعمل thumbnail أو screenshot لكل مشروع.', 'Make a thumbnail or screenshot for each project.'),
        B('اكتب قسم «About me» للبورتفوليو في 4 جمل.', 'Write an "About me" section for the portfolio in 4 sentences.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['portfolio', 'hobbies / interests', 'application (app)', 'content(s)', 'store', 'drive', 'thumbnail'],
      read: [{ lib: 'GitHub Pages', what: B('اقرا صفحة البداية وفكّر تنشر البورتفوليو عليها.', 'Read the getting-started page and consider publishing your portfolio there.') }],
      challenge: B('انشر صفحة بورتفوليو بسيطة (GitHub Pages أو README في بروفايلك) فيها 3 مشاريع بالإنجليزي.', 'Publish a simple portfolio page (GitHub Pages or your profile README) with 3 projects in English.'),
      quiz: [
        { q: B('أحسن عنوان مشروع في البورتفوليو:', 'The best portfolio project title:'), o: ['Project 1', 'Invoice Reminder Bot — 30% fewer late payments', 'My code'], a: 1, why: B('بيقول الفايدة.', 'It states the benefit.') },
        { q: B('في البورتفوليو الأحسن:', 'In a portfolio it is better to have:'), o: [B('3 مشاريع قوية', '3 strong projects'), B('20 مشروع صغير', '20 tiny projects'), B('ولا مشروع', 'no projects')], a: 0, why: B('الجودة أهم.', 'Quality matters more.') },
        { q: B('thumbnail هي:', 'A thumbnail is:'), o: [B('صورة صغيرة للمعاينة', 'a small preview image'), B('ضافر', 'a fingernail'), B('ملف كود', 'a code file')], a: 0, why: B('معاينة.', 'A preview.') }
      ] },

    { title: B('بروفايل LinkedIn', 'The LinkedIn profile'),
      goal: B('تكتب headline وAbout وExperience وSkills بالإنجليزي بتظهر في البحث.', 'Write a headline, About, Experience and Skills in English that show up in search.'),
      learn: [
        { h: B('الـ headline', 'The headline'),
          p: B('مش بس اسم الوظيفة: الدور + الأدوات + الفايدة. «Automation Developer | n8n · Python · APIs | I help small businesses save hours every week».', 'Not just a job title: role + tools + value. "Automation Developer | n8n · Python · APIs | I help small businesses save hours every week".'),
          ex: 'Backend Developer | Node.js · PostgreSQL | Building reliable payment systems' },
        { h: B('قسم About', 'The About section'),
          p: B('3 فقرات قصيرة بصيغة I: بتعمل إيه ولمين، وأهم إنجازين، وبتدوّر على إيه. واختم بطريقة التواصل.', 'Three short first-person paragraphs: what you do and for whom, your two best achievements, and what you\'re looking for. End with how to contact you.'),
          ex: 'I build automations that remove boring, manual work.\nRecently I cut a client\'s reporting time from 3 hours to 10 minutes.\nI\'m open to remote roles. Feel free to message me.' },
        { h: B('المهارات التقنية', 'Technical skills'),
          p: B('اكتب المهارات اللي الـ recruiters بيدوّروا عليها بأسمائها المظبوطة: object-oriented programming، configuration management، multitasking… ومتكتبش مهارة مش عارف تتكلم فيها في مقابلة.', 'List the skills recruiters search for, by their exact names: object-oriented programming, configuration management, multitasking… Don\'t list a skill you can\'t discuss in an interview.'),
          ex: 'Skills: Python · n8n · REST APIs · PostgreSQL · Docker · Git' }
      ],
      practice: [
        B('اكتب 3 نسخ headline واختار الأحسن.', 'Write 3 versions of your headline and pick the best.'),
        B('اكتب قسم About كامل (3 فقرات).', 'Write a complete About section (3 paragraphs).'),
        B('اكتب Experience لوظيفة أو مشروع بـ 3 سطور إنجاز.', 'Write an Experience entry for a job or project with 3 achievement lines.'),
        B('اكتب 7 جمل تشرح فيها المهارات التقنية في كلمات النهارده.', 'Write 7 sentences explaining the technical skills in today\'s words.')
      ],
      words: ['object-oriented programming (OOP)', 'configuration management', 'multitasking', 'entity', 'kernel', 'virtual memory', 'greedy / non-greedy'],
      read: [{ lib: 'LinkedIn Jobs', what: B('افتح 3 بروفايلات لناس في وظيفتك اللي بتحلم بيها ولاحظ الـ headlines.', 'Open 3 profiles of people in your dream role and study their headlines.') }],
      challenge: B('حدّث بروفايل LinkedIn بتاعك فعلًا بالإنجليزي (headline وAbout وتجربة واحدة).', 'Actually update your LinkedIn profile in English (headline, About and one experience entry).'),
      quiz: [
        { q: B('أحسن headline:', 'The best headline:'), o: ['Looking for a job', 'Automation Developer | n8n · Python | I help teams save time', 'Developer'], a: 1, why: B('دور + أدوات + فايدة.', 'Role + tools + value.') },
        { q: B('قسم About بيتكتب:', 'The About section is written:'), o: [B('بصيغة I وفقرات قصيرة', 'in the first person, in short paragraphs'), B('بصيغة He', 'in the third person'), B('كلمات متفرقة', 'as random keywords')], a: 0, why: B('شخصي ومباشر.', 'Personal and direct.') },
        { q: B('greedy regex بيطابق:', 'A greedy regex matches:'), o: [B('أطول نص ممكن', 'as much text as possible'), B('أقصر نص', 'as little as possible'), B('ولا حاجة', 'nothing')], a: 0, why: B('non-greedy عكسه.', 'non-greedy is the opposite.') }
      ] },

    { title: B('الـ networking والدردشة', 'Networking and small talk'),
      goal: B('تبدأ دردشة مع حد جديد في event أو مكالمة، وتتكلم عن الهوايات، وتكمّل التواصل.', 'Start a chat with someone new at an event or on a call, talk about hobbies, and keep in touch.'),
      learn: [
        { h: B('ابدأ الكلام', 'Starting a conversation'),
          p: B('Hi, I\'m… What brings you here? / What are you working on these days? / How did you get into automation? / That sounds interesting — how does it work?', 'Hi, I\'m… What brings you here? / What are you working on these days? / How did you get into automation? / That sounds interesting — how does it work?'),
          ex: 'A: What do you do in your free time?\nB: I\'m really into hiking. What about you?' },
        { h: B('الهوايات والرأي', 'Hobbies and opinions'),
          p: B('I\'m into…، I\'m interested in…، I enjoy…، I can\'t stand… (مش بطيق)، It\'s not really my thing. وبعد like/enjoy/can\'t stand: ing.', 'I\'m into…, I\'m interested in…, I enjoy…, I can\'t stand…, It\'s not really my thing. After like/enjoy/can\'t stand: -ing.'),
          ex: 'I\'m interested in AI, but I can\'t stand long meetings.' },
        { h: B('كمّل التواصل', 'Following up'),
          p: B('It was great talking to you. Can I add you on LinkedIn? / Let\'s keep in touch. / I\'m looking forward to it. وابعت رسالة في نفس اليوم فيها حاجة اتكلمتوا فيها.', 'It was great talking to you. Can I add you on LinkedIn? / Let\'s keep in touch. / I\'m looking forward to it. Message them the same day, mentioning something you discussed.'),
          ex: 'Hi Nour, great meeting you at the meetup. Here\'s the article about webhooks I mentioned.' }
      ],
      practice: [
        B('اكتب 6 أسئلة تبدأ بيهم كلام مع حد جديد.', 'Write 6 questions to start a conversation with someone new.'),
        B('اكتب 5 جمل عن هواياتك بالتعبيرات بتاعة النهارده.', 'Write 5 sentences about your hobbies with today\'s expressions.'),
        B('اكتب رسالة LinkedIn بعد مقابلة حد في event.', 'Write a LinkedIn message after meeting someone at an event.'),
        B('اكتب 4 ردود على «How\'s it going?» و«What do you do?».', 'Write 4 replies to "How\'s it going?" and "What do you do?".')
      ],
      words: ['free time', 'hobby', 'interested in', 'into (something)', 'can\'t stand', 'looking forward to it', 'bored / boring'],
      read: [{ lib: 'All Ears English', what: B('اسمع حلقة عن «small talk» أو «networking».', 'Listen to an episode about small talk or networking.') }],
      challenge: B('احضر event أونلاين أو meetup بالإنجليزي (أو اتكلم في مجتمع تقني)، واتكلم مع حد واحد وابعتله رسالة بعدها.', 'Attend an English online event or meetup (or join a tech community chat), talk to one person, and message them afterwards.'),
      quiz: [
        { q: B('سؤال كويس لحد جديد:', 'A good question for someone new:'), o: ['How much do you earn?', 'What are you working on these days?', 'How old are you?'], a: 1, why: B('عن الشغل ومش شخصي زيادة.', 'About work, not too personal.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I can\'t stand to wait.', 'I can\'t stand waiting.', 'I can\'t stand wait.'], a: 1, why: B('can\'t stand + ing.', 'can\'t stand + -ing.') },
        { q: B('«I\'m into photography» معناها:', '"I\'m into photography" means:'), o: [B('بحب التصوير', 'I like photography a lot'), B('أنا جوه التصوير', 'I am inside a photo'), B('بكره التصوير', 'I hate photography')], a: 0, why: B('into = مهتم جدًا.', 'into = keen on.') }
      ] },

    { title: B('الأكل والكافيهات مع الزمايل', 'Food and cafés with colleagues'),
      goal: B('تطلب أكل وقهوة، وتتكلم عن الأكل والحساسية، وتعزم زميل على غدا شغل.', 'Order food and coffee, talk about food and allergies, and invite a colleague to a work lunch.'),
      learn: [
        { h: B('الطلب', 'Ordering'),
          p: B('Could I see the menu, please? / I\'d like the chicken, please. / Can I get a coffee to go? / Is this vegetarian? / I\'m allergic to nuts.', 'Could I see the menu, please? / I\'d like the chicken, please. / Can I get a coffee to go? / Is this vegetarian? / I\'m allergic to nuts.'),
          ex: 'Two coffees, please — one to have here and one takeaway.' },
        { h: B('غدا شغل', 'A work lunch'),
          p: B('Are you free for lunch on Thursday? / Let\'s grab a coffee after the meeting. / My treat. (أنا عازمك) / Shall we split the bill?', 'Are you free for lunch on Thursday? / Let\'s grab a coffee after the meeting. / My treat. / Shall we split the bill?'),
          ex: 'Let\'s take a coffee break and talk about it away from the screen.' },
        'g:would like'
      ],
      practice: [
        B('اكتب حوار طلب في مطعم (8 سطور) فيه سؤال عن الحساسية.', 'Write an 8-line restaurant ordering dialogue that includes an allergy question.'),
        B('اكتب رسالة تعزم فيها زميل على قهوة.', 'Write a message inviting a colleague for coffee.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.'),
        B('قول طلبك في كافيه بصوت عالي 3 مرات بسرعة طبيعية.', 'Say your café order out loud 3 times at natural speed.')
      ],
      words: ['menu', 'order (food)', 'takeaway / to go', 'coffee break', 'snack', 'vegetarian', 'allergic to'],
      read: [{ lib: '6 Minute English (BBC)', what: B('اختار حلقة عن الأكل واسمعها.', 'Pick an episode about food and listen to it.') }],
      challenge: B('اطلب طلبك الجاي في كافيه بالإنجليزي (لو ينفع) أو مثّله، واكتب الجمل اللي قلتها.', 'Order your next café order in English (if possible) or role-play it, and write down what you said.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I\'m allergic from nuts.', 'I\'m allergic to nuts.', 'I\'m allergic with nuts.'], a: 1, why: B('allergic to.', 'allergic to.') },
        { q: B('«to go» في كافيه معناها:', '"to go" in a café means:'), o: [B('تيك أواي', 'takeaway'), B('امشي', 'leave'), B('هنا', 'to have here')], a: 0, why: B('هتاخده معاك.', 'You take it with you.') },
        { q: B('«My treat» معناها:', '"My treat" means:'), o: [B('أنا عازمك', 'I\'ll pay'), B('ده أكلي', 'this is my food'), B('عندي حساسية', 'I have an allergy')], a: 0, why: B('انت اللي هتدفع.', 'You are paying.') }
      ] },

    { title: B('العيشة في بلد تانية', 'Living abroad'),
      goal: B('تتكلم عن السكن والجيران، وتحجز مطعم، وتدوّر على شقة بالإنجليزي.', 'Talk about housing and neighbours, book a restaurant, and look for a flat in English.'),
      learn: [
        { h: B('السكن', 'Housing'),
          p: B('I\'m looking for a one-bedroom apartment near the office. / How much is the rent? / Are bills included? / Is it furnished? / The flat is next to a park, opposite a supermarket.', 'I\'m looking for a one-bedroom apartment near the office. / How much is the rent? / Are bills included? / Is it furnished? / The flat is next to a park, opposite a supermarket.'),
          ex: 'The rent is USD 900 a month, and electricity is not included.' },
        { h: B('الجيران والحجز', 'Neighbours and bookings'),
          p: B('Hi, I\'ve just moved in next door. / I\'d like to make a reservation for two at 8. / The food was delicious, thank you.', 'Hi, I\'ve just moved in next door. / I\'d like to make a reservation for two at 8. / The food was delicious, thank you.'),
          ex: 'Could I book a table for four on Friday evening?' },
        'g:حروف الجر للمكان'
      ],
      practice: [
        B('اكتب إيميل لصاحب شقة بتسأل فيه 5 أسئلة.', 'Write an email to a landlord asking 5 questions.'),
        B('اكتب حوار حجز مطعم بالتليفون (6 سطور).', 'Write a 6-line phone dialogue booking a restaurant.'),
        B('اوصف مكان بيتك بحروف جر المكان في 5 جمل.', 'Describe where your home is with place prepositions in 5 sentences.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['delicious', 'reservation (restaurant)', 'I\'d like…', 'rent', 'apartment / flat', 'neighbor', 'next to / opposite'],
      read: [{ lib: 'Simple English Wikipedia', what: B('اقرا صفحة عن مدينة نفسك تشتغل فيها.', 'Read the page about a city you would like to work in.') }],
      challenge: B('دوّر على إعلان شقة حقيقي بالإنجليزي في مدينة تانية، واكتب ملخصه، وإيميل تسأل فيه صاحبه.', 'Find a real English flat listing in another city, summarise it, and write an email with questions to the owner.'),
      quiz: [
        { q: B('«Are bills included?» معناها:', '"Are bills included?" means:'), o: [B('الفواتير ضمن الإيجار؟', 'is the rent including utility bills?'), B('في فاتورة؟', 'is there an invoice?'), B('الأكل مجاني؟', 'is food free?')], a: 0, why: B('كهربا ومية ونت.', 'Electricity, water, internet.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I\'d like to make a reservation for two.', 'I\'d like make reservation two.', 'I like to reservation for two.'], a: 0, why: B('I\'d like to + فعل.', 'I\'d like to + verb.') },
        { q: B('neighbor هو:', 'A neighbor is:'), o: [B('جار', 'someone who lives next to you'), B('صاحب الشقة', 'the landlord'), B('زميل', 'a colleague')], a: 0, why: B('الناس اللي جنبك.', 'The people next door.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 24 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 24 opens when you score 70% or more.'),
      review: [
        B('كارت المشروع: فايدة + مشكلة وحل + أدوات + نتيجة + صورة.', 'The project card: benefit + problem and solution + tools + result + image.'),
        B('LinkedIn: headline بالدور والأدوات والفايدة، وAbout بصيغة I.', 'LinkedIn: a headline with role, tools and value, and an About in the first person.'),
        B('الدردشة: What are you working on…?، I\'m into…، Let\'s keep in touch.', 'Small talk: What are you working on…?, I\'m into…, Let\'s keep in touch.'),
        B('الأكل: I\'d like…، to go، allergic to، My treat.', 'Food: I\'d like…, to go, allergic to, My treat.'),
        B('السكن: rent، bills included، next to / opposite.', 'Housing: rent, bills included, next to / opposite.')
      ],
      project: B('انشر «online presence» كامل بالإنجليزي: صفحة بورتفوليو بـ 3 مشاريع (كروت كاملة)، وبروفايل LinkedIn محدّث (headline وAbout وتجربتين)، وcase study من صفحة لأحسن مشروع (Problem، Solution، Result، What I learned)، وبوست LinkedIn قصير بتعلن فيه عن المشروع.',
                 'Publish a complete English online presence: a portfolio page with 3 projects (full cards), an updated LinkedIn profile (headline, About and two experience entries), a one-page case study of your best project (Problem, Solution, Result, What I learned), and a short LinkedIn post announcing the project.'),
      test: [
        { q: B('كارت المشروع لازم فيه:', 'A project card must include:'), o: [B('النتيجة بالأرقام', 'the result in numbers'), B('عمرك', 'your age'), B('كل الكود', 'all the code')], a: 0, why: B('الفايدة الملموسة.', 'The tangible benefit.') },
        { q: B('أحسن headline:', 'The best headline:'), o: ['Open to work!!!', 'Data Engineer | Python · Airflow · SQL | Clean, reliable pipelines', 'Engineer'], a: 1, why: B('دور + أدوات + فايدة.', 'Role + tools + value.') },
        { q: B('في LinkedIn متكتبش مهارة:', 'On LinkedIn, don\'t list a skill:'), o: [B('مش عارف تتكلم فيها في مقابلة', 'you can\'t discuss in an interview'), B('بتستخدمها كل يوم', 'you use every day'), B('في مشاريعك', 'that is in your projects')], a: 0, why: B('هتتسأل فيها.', 'You will be asked about it.') },
        { q: B('سؤال بداية كويس في event:', 'A good opener at an event:'), o: ['What brings you here?', 'Why are you here?!', 'Give me a job.'], a: 0, why: B('مفتوح وودود.', 'Open and friendly.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I\'m interested in automation.', 'I\'m interested on automation.', 'I\'m interesting in automation.'], a: 0, why: B('interested in.', 'interested in.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I enjoy to build tools.', 'I enjoy building tools.', 'I enjoy build tools.'], a: 1, why: B('enjoy + ing.', 'enjoy + -ing.') },
        { q: B('بعد ما تقابل حد جديد:', 'After meeting someone new:'), o: [B('ابعت رسالة نفس اليوم فيها حاجة اتكلمتوا فيها', 'message them the same day mentioning something you discussed'), B('استنى سنة', 'wait a year'), B('متعملش حاجة', 'do nothing')], a: 0, why: B('عشان يفتكروك.', 'So they remember you.') },
        { q: B('vegetarian هو:', 'A vegetarian:'), o: [B('مش بياكل لحمة', 'doesn\'t eat meat'), B('بياكل كل حاجة', 'eats everything'), B('طباخ', 'is a cook')], a: 0, why: B('نباتي.', 'Plant-based diet.') },
        { q: B('«Shall we split the bill?» معناها:', '"Shall we split the bill?" means:'), o: [B('نقسم الحساب؟', 'shall we share the cost?'), B('نمشي؟', 'shall we leave?'), B('نطلب تاني؟', 'shall we order again?')], a: 0, why: B('كل واحد يدفع نصيبه.', 'Each pays a share.') },
        { q: B('rent هو:', 'rent is:'), o: [B('الإيجار', 'what you pay to live in a place'), B('تمن الشقة كلها', 'the price of buying the flat'), B('فاتورة الكهربا', 'the electricity bill')], a: 0, why: B('شهري غالبًا.', 'Usually monthly.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The flat is opposite of the park.', 'The flat is opposite the park.', 'The flat is opposite to the park of.'], a: 1, why: B('opposite من غير of.', 'opposite without of.') },
        { q: B('case study بتحكي:', 'A case study tells:'), o: [B('المشكلة والحل والنتيجة واتعلمت إيه', 'the problem, solution, result and what you learned'), B('سيرتك الذاتية', 'your life story'), B('قايمة أدوات بس', 'only a list of tools')], a: 0, why: B('قصة مشروع كاملة.', 'The full story of a project.') }
      ] }
  ]
};
