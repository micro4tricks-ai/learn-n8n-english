// Week 19 — Presentations.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B2',
  title: B('الـ Presentations', 'Presentations'),
  goal: B('تقدّم عرض قصير بالإنجليزي: هيكل واضح، وجمل انتقال، ووصف أرقام وتريندات وجرافات بدقة، والرد على الأسئلة بثقة.',
          'Give a short presentation in English: a clear structure, transitions, precise descriptions of numbers, trends and charts, and confident answers to questions.'),
  days: [
    { title: B('هيكل العرض', 'Presentation structure'),
      goal: B('تبني عرض من مقدمة وجسم وخاتمة، وتستخدم جمل الانتقال بين السلايدز.', 'Build a talk with an introduction, a body and a conclusion, and use transitions between slides.'),
      learn: [
        { h: B('3 أجزاء', 'Three parts'),
          p: B('Intro: مين انت + الموضوع + ليه يهمهم + خطة العرض. Body: 3 نقط بحد أقصى. Close: الخلاصة + المطلوب منهم + أسئلة.', 'Intro: who you are + the topic + why it matters to them + the plan. Body: three points at most. Close: the summary + what you want from them + questions.'),
          ex: 'Today I\'ll show you how we cut our report time from 3 hours to 10 minutes.\nI\'ll cover three things: the problem, the workflow, and the results.' },
        { h: B('جمل الانتقال', 'Transitions'),
          p: B('Let\'s start with… / Moving on to… / This brings me to… / As you can see on this slide,… / To sum up,… / Any questions?', 'Let\'s start with… / Moving on to… / This brings me to… / As you can see on this slide,… / To sum up,… / Any questions?'),
          ex: 'That\'s the problem. This brings me to our solution.' },
        { h: B('سلايد واحد = فكرة واحدة', 'One slide = one idea'),
          p: B('عنوان السلايد جملة بتقول الرسالة: «Reports now take 10 minutes» أحسن من «Results». وقلّل الكلام: السلايد مش ورقة قراءة.', 'The slide title is a sentence that states the message: "Reports now take 10 minutes" beats "Results". Keep text short: a slide isn\'t a script.'),
          ex: 'Title: Most errors come from missing emails\nBody: one chart + one number' }
      ],
      practice: [
        B('اكتب outline لعرض 5 دقايق عن مشروعك: Intro، 3 نقط، Close.', 'Write an outline for a 5-minute talk about your project: intro, 3 points, close.'),
        B('اكتب 6 عناوين سلايدز كل واحد جملة بالرسالة.', 'Write 6 slide titles, each a sentence with the message.'),
        B('اكتب وقول 6 جمل انتقال مختلفة.', 'Write and say 6 different transitions.'),
        B('اكتب مقدمة العرض كاملة (4 جمل) وسجّلها.', 'Write the full introduction (4 sentences) and record it.')
      ],
      words: ['presentation', 'slide / deck', 'handout', 'summary', 'breakdown', 'dashboard', 'raw data'],
      read: [{ lib: 'TED Talks', what: B('شوف أول 3 دقايق من talk تقني ولاحظ المقدمة بتعمل إيه.', 'Watch the first 3 minutes of a technical talk and notice what the introduction does.') }],
      challenge: B('اعمل 5 سلايدز حقيقية لمشروعك بعناوين جمل، وقدّم أول دقيقتين قدام المراية أو الكاميرا.', 'Make 5 real slides for your project with sentence titles, and present the first two minutes to a mirror or camera.'),
      quiz: [
        { q: B('أحسن عنوان سلايد:', 'The best slide title:'), o: ['Results', 'Reports now take 10 minutes instead of 3 hours', 'Slide 4'], a: 1, why: B('بيقول الرسالة.', 'It states the message.') },
        { q: B('«This brings me to…» بتستخدمها:', '"This brings me to…" is used:'), o: [B('للانتقال لنقطة جديدة', 'to move to a new point'), B('للنهاية', 'to end'), B('للاعتذار', 'to apologise')], a: 0, why: B('جملة انتقال.', 'A transition.') },
        { q: B('المقدمة الكويسة فيها:', 'A good introduction has:'), o: [B('الموضوع وليه يهمهم وخطة العرض', 'the topic, why it matters and the plan'), B('كل التفاصيل', 'every detail'), B('نكتة بس', 'only a joke')], a: 0, why: B('خريطة للسامع.', 'A map for the listener.') }
      ] },

    { title: B('التريندات: طلوع ونزول', 'Trends: up and down'),
      goal: B('توصف تغيّر الأرقام: زاد، قل، وصل للقمة، ثابت، متذبذب.', 'Describe how numbers change: increase, decrease, peak, stay stable, fluctuate.'),
      learn: [
        { h: B('أفعال التريند', 'Trend verbs'),
          p: B('↑ increase, rise, grow, go up. ↓ decrease, fall, drop, go down, decline. ↑↓ fluctuate. → remain stable / stay steady. ⤒ peak at / reach a peak of.', '↑ increase, rise, grow, go up. ↓ decrease, fall, drop, go down, decline. ↑↓ fluctuate. → remain stable / stay steady. ⤒ peak at / reach a peak of.'),
          ex: 'Sign-ups rose from 200 to 350 in March.\nErrors dropped to almost zero after the fix.\nTraffic peaked at 5,000 visits on Friday.' },
        { h: B('حروف الجر مع الأرقام', 'Prepositions with numbers'),
          p: B('from X to Y (من لـ)، by X (بمقدار)، to X (لحد)، at X (عند)، of X (مقدارها). Revenue rose by 20% to USD 12,000.', 'from X to Y, by X (the amount of change), to X (the new level), at X (a point), of X (a size). Revenue rose by 20% to USD 12,000.'),
          ex: 'Response time fell by 40 ms to 120 ms.\nThere was an increase of 15% in active users.' },
        { h: B('فعل ولا اسم', 'Verb or noun'),
          p: B('Sales increased by 10%. = There was a 10% increase in sales. الشكلين صح، والاسم بيخلي الجملة أرسم.', 'Sales increased by 10%. = There was a 10% increase in sales. Both are correct; the noun form sounds more formal.'),
          ex: 'a sharp rise in errors / a steady decline in costs' }
      ],
      practice: [
        B('اكتب 7 جمل عن أرقام حقيقية (زيارات، أخطاء، وقت تشغيل) بأفعال مختلفة.', 'Write 7 sentences about real numbers (visits, errors, run time) with different verbs.'),
        B('اكتب 5 جمل بـ from / to / by صح.', 'Write 5 sentences using from / to / by correctly.'),
        B('حوّل 4 جمل فعل لجمل اسم (There was a…).', 'Turn 4 verb sentences into noun sentences (There was a…).'),
        B('خد أرقام أسبوعين من أي حاجة (خطوات، ساعات نوم) ووصف التريند في 4 جمل.', 'Take two weeks of numbers from anything (steps, sleep) and describe the trend in 4 sentences.')
      ],
      words: ['increase / decrease', 'rise / fall', 'peak', 'drop', 'fluctuate', 'remain stable / steady', 'trend'],
      read: [{ lib: 'British Council LearnEnglish', what: B('دوّر على «describing trends» أو «describing graphs» واقرا الدرس.', 'Search for "describing trends" or "describing graphs" and read the lesson.') }],
      challenge: B('اوصف في دقيقة بصوت عالي رسم بياني لأي حاجة (سعر عملة، زيارات موقع) من غير ما تقرا من ورقة.', 'Describe a chart of anything (a currency price, site visits) out loud for one minute without notes.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Revenue rose with 20%.', 'Revenue rose by 20%.', 'Revenue rose of 20%.'], a: 1, why: B('by = مقدار التغيير.', 'by = the amount of change.') },
        { q: B('fluctuate معناها:', 'fluctuate means:'), o: [B('يطلع وينزل', 'go up and down'), B('يثبت', 'stay the same'), B('يختفي', 'disappear')], a: 0, why: B('تذبذب.', 'Change irregularly.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Traffic peaked at 5,000 visits.', 'Traffic peaked on 5,000 visits.', 'Traffic peaked by 5,000 visits.'], a: 0, why: B('peak at.', 'peak at.') }
      ] },

    { title: B('الدقة في الأرقام', 'Precision with numbers'),
      goal: B('توصف سرعة وحجم التغيير (sharply، slightly)، والنسب والمتوسطات والتوقعات.', 'Describe the speed and size of change (sharply, slightly), and percentages, averages and forecasts.'),
      learn: [
        { h: B('قد إيه وبأي سرعة', 'How much and how fast'),
          p: B('كبير وسريع: sharply, dramatically, significantly. صغير: slightly, marginally. بالتدريج: gradually, steadily. والصفة قبل الاسم: a sharp increase، a slight drop.', 'Big and fast: sharply, dramatically, significantly. Small: slightly, marginally. Over time: gradually, steadily. As adjectives before a noun: a sharp increase, a slight drop.'),
          ex: 'Costs rose sharply in Q2.\nThere was a slight drop in errors.\nUsage grew steadily over the year.' },
        { h: B('النسب والمتوسط', 'Percentages and averages'),
          p: B('percent (مع رقم: 20 percent)، percentage (من غير رقم: a high percentage). On average, … / The average response time is… / In total, …', 'percent goes with a number (20 percent); percentage without one (a high percentage). On average, … / The average response time is… / In total, …'),
          ex: 'On average, each workflow runs 40 times a day.\nA large percentage of errors come from one node.' },
        { h: B('التوقعات', 'Forecasts'),
          p: B('We expect… / We forecast… / It is likely to… / If the trend continues, we will… وقول درجة التأكد: probably، likely، might.', 'We expect… / We forecast… / It is likely to… / If the trend continues, we will… Show how sure you are: probably, likely, might.'),
          ex: 'If the trend continues, we\'ll reach 10,000 users by December.' }
      ],
      practice: [
        B('اكتب 6 جمل بظروف وصفات الدرجة (sharply، a slight…).', 'Write 6 sentences with adverbs and adjectives of degree (sharply, a slight…).'),
        B('احسب متوسط ونسبة من بيانات عندك واكتبهم في 4 جمل.', 'Calculate an average and a percentage from your data and write them in 4 sentences.'),
        B('اكتب توقع (forecast) لمشروعك في 3 جمل بدرجات تأكد مختلفة.', 'Write a 3-sentence forecast for your project with different degrees of certainty.'),
        B('اختار percent ولا percentage في 5 جمل.', 'Choose percent or percentage in 5 sentences.')
      ],
      words: ['sharply / dramatically', 'gradually / slightly', 'forecast', 'percentage', 'average', 'total / subtotal', 'figure'],
      read: [{ lib: 'News in Levels', what: B('اقرا خبر فيه أرقام ولوّن كل جملة بتوصف تغيير.', 'Read a story with numbers and highlight every sentence that describes a change.') }],
      challenge: B('اكتب فقرة «monthly report» بأرقام مشروعك: الإجمالي، والمتوسط، وأكبر تغيير، والتوقع.', 'Write a "monthly report" paragraph with your project\'s numbers: the total, the average, the biggest change and the forecast.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['A high percent of users…', 'A high percentage of users…', '20 percentage of users…'], a: 1, why: B('percentage من غير رقم.', 'percentage without a number.') },
        { q: B('slightly معناها:', 'slightly means:'), o: [B('شوية صغيرين', 'a little'), B('جدًا', 'a lot'), B('فجأة', 'suddenly')], a: 0, why: B('تغيير بسيط.', 'A small change.') },
        { q: B('أنسب جملة توقع:', 'The best forecast sentence:'), o: ['We will 100% have 1 million users.', 'If the trend continues, we are likely to reach 5,000 users.', 'Users forecast.'], a: 1, why: B('توقع بدرجة تأكد معقولة.', 'A forecast with sensible certainty.') }
      ] },

    { title: B('وصف الجرافات', 'Describing charts'),
      goal: B('تقدّم جراف: نوعه، وبيوري إيه، وأهم ملاحظة، والرقم التقريبي.', 'Present a chart: its type, what it shows, the key point, and approximate figures.'),
      learn: [
        { h: B('قدّم الجراف في 3 خطوات', 'Present a chart in three steps'),
          p: B('1) This bar chart shows… (إيه). 2) As you can see,… (أهم حاجة). 3) This means… (المعنى). ومتقراش كل رقم.', '1) This bar chart shows… (what). 2) As you can see,… (the key point). 3) This means… (the meaning). Don\'t read out every number.'),
          ex: 'This line chart shows daily errors over the last month.\nAs you can see, they dropped by half after the release.\nThis means the fix worked.' },
        { h: B('تقريبًا', 'Approximately'),
          p: B('about, around, roughly, approximately, nearly (أقل شوية), just over (أكتر شوية), almost double, half of.', 'about, around, roughly, approximately, nearly (a bit less), just over (a bit more), almost double, half of.'),
          ex: 'Roughly a third of the orders come from mobile.\nThe cost almost doubled.' },
        { h: B('أنواع الجرافات', 'Chart types'),
          p: B('bar chart (أعمدة، للمقارنة)، line chart/graph (خط، للتغيير مع الوقت)، pie chart (دائرة، للأجزاء من الكل)، table، dashboard.', 'bar chart (compare), line chart/graph (change over time), pie chart (parts of a whole), table, dashboard.'),
          ex: 'Use a line chart for trends and a bar chart for comparisons.' }
      ],
      practice: [
        B('اعمل جراف واحد من بياناتك وقدّمه بالتلات خطوات.', 'Make one chart from your data and present it in the three steps.'),
        B('اكتب 6 جمل بكلمات التقريب.', 'Write 6 sentences with approximation words.'),
        B('اختار نوع الجراف المناسب لـ 4 مواقف واكتب ليه.', 'Choose the right chart type for 4 situations and write why.'),
        B('اشرح dashboard بتستخدمه (أو متخيّل) في 5 جمل.', 'Explain a dashboard you use (or imagine) in 5 sentences.')
      ],
      words: ['double / half', 'approximately / roughly', 'estimate (verb)', 'growth', 'decline', 'chart / graph', 'bar / line / pie chart'],
      read: [{ lib: 'Kurzgesagt', what: B('شوف فيديو ولاحظ إزاي بيقدّموا الأرقام الكبيرة بتشبيهات.', 'Watch a video and notice how they present big numbers with comparisons.') }],
      challenge: B('قدّم جراف من شغلك في 90 ثانية مسجّلة، من غير ما تقرا أرقام كتير.', 'Present a chart from your work in a recorded 90 seconds, without reading lots of numbers.'),
      quiz: [
        { q: B('للتغيير مع الوقت أحسن:', 'For change over time, the best is a:'), o: ['line chart', 'pie chart', 'table'], a: 0, why: B('الخط بيوري التريند.', 'A line shows the trend.') },
        { q: B('أول جملة في وصف جراف:', 'The first sentence when presenting a chart:'), o: ['This bar chart shows monthly sign-ups.', 'Look.', 'Numbers are here.'], a: 0, why: B('نوعه وبيوري إيه.', 'Its type and what it shows.') },
        { q: B('nearly 100 معناها:', 'nearly 100 means:'), o: [B('أقل من 100 شوية', 'a little under 100'), B('أكتر من 100', 'over 100'), B('100 بالظبط', 'exactly 100')], a: 0, why: B('قرب يوصل.', 'Close to, but not quite.') }
      ] },

    { title: B('الأسئلة بعد العرض', 'Questions after the talk'),
      goal: B('ترد على الأسئلة: تشكر، وتعيد صياغة، وتقول «مش عارف» باحتراف، وتتكلم عن بيانات Excel.', 'Handle questions: thank, rephrase, say "I don\'t know" professionally, and talk about Excel data.'),
      learn: [
        { h: B('جمل الأسئلة', 'Q&A phrases'),
          p: B('Good question. / So you\'re asking whether… (إعادة صياغة) / I\'m not sure, but I\'ll find out and get back to you. / Let me show you on the dashboard. / Does that answer your question?', 'Good question. / So you\'re asking whether… (rephrase) / I\'m not sure, but I\'ll find out and get back to you. / Let me show you on the dashboard. / Does that answer your question?'),
          ex: 'Q: Why did errors peak on Friday?\nA: Good question. We deployed a new node that day. Let me show you the log.' },
        { h: B('كلام الجداول', 'Spreadsheet words'),
          p: B('pivot table (جدول ملخص)، lookup (VLOOKUP/XLOOKUP)، filter، sort ascending / descending، drop-down list، tracker، template.', 'pivot table, lookup (VLOOKUP/XLOOKUP), filter, sort ascending / descending, drop-down list, tracker, template.'),
          ex: 'I used a pivot table to group the errors by node.\nSort the list in descending order to see the biggest first.' },
        'g:between you and me'
      ],
      practice: [
        B('اكتب 5 أسئلة ممكن تتسألها عن عرضك وردود عليها.', 'Write 5 questions you might get about your talk and your answers.'),
        B('اكتب 3 طرق تقول «مش عارف» باحتراف.', 'Write 3 professional ways to say "I don\'t know".'),
        B('اعمل pivot table من بيانات عندك واشرحها في 4 جمل.', 'Build a pivot table from your data and explain it in 4 sentences.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['pivot table', 'lookup (VLOOKUP / XLOOKUP)', 'filter', 'sort (ascending / descending)', 'drop-down list', 'tracker', 'template'],
      read: [{ lib: 'Luke’s English Podcast', what: B('اسمع 10 دقايق من حلقة ولاحظ إزاي بيرد على أسئلة المستمعين.', 'Listen to 10 minutes of an episode and notice how he answers listeners\' questions.') }],
      challenge: B('خلّي حد يسألك 3 أسئلة مفاجئة بعد عرض قصير عن مشروعك، ورد بالجمل الجاهزة.', 'Have someone ask you 3 surprise questions after a short talk about your project, and answer with the ready-made phrases.'),
      quiz: [
        { q: B('أحسن رد لو مش عارف:', 'The best reply if you don\'t know:'), o: ['I don\'t know.', 'I\'m not sure, but I\'ll find out and get back to you.', 'Next question.'], a: 1, why: B('صريح ومعاه وعد.', 'Honest, with a promise.') },
        { q: B('sort descending يعني:', 'sort descending means:'), o: [B('من الأكبر للأصغر', 'from largest to smallest'), B('من الأصغر للأكبر', 'from smallest to largest'), B('عشوائي', 'random')], a: 0, why: B('نازل.', 'Going down.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Between you and I, it\'s late.', 'Between you and me, it\'s late.', 'Between me and I, it\'s late.'], a: 1, why: B('بعد between ضمير مفعول.', 'After between, an object pronoun.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 20 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 20 opens when you score 70% or more.'),
      review: [
        B('Intro / 3 نقط / Close، وعناوين السلايدز جمل.', 'Intro / 3 points / close, and slide titles as sentences.'),
        B('rise / fall / peak / fluctuate، وfrom / to / by.', 'rise / fall / peak / fluctuate, and from / to / by.'),
        B('sharply / slightly / gradually، وpercent / percentage، والتوقعات.', 'sharply / slightly / gradually, percent / percentage, and forecasts.'),
        B('الجراف: shows ← As you can see ← This means، والتقريب.', 'Charts: shows → As you can see → This means, and approximation.'),
        B('الأسئلة: Good question، إعادة الصياغة، I\'ll get back to you.', 'Q&A: Good question, rephrasing, I\'ll get back to you.')
      ],
      project: B('قدّم عرض 5 دقايق بالإنجليزي عن مشروعك أو workflow عملته: 6 سلايدز بعناوين جمل، وجراف واحد على الأقل بتوصفه بالتلات خطوات، وجمل انتقال، وخاتمة فيها المطلوب. سجّله فيديو، وجهّز 3 أسئلة وإجاباتهم.',
                 'Give a 5-minute English presentation about your project or a workflow you built: 6 slides with sentence titles, at least one chart described in the three steps, transitions, and a closing with a clear ask. Record it on video, and prepare 3 questions with answers.'),
      test: [
        { q: B('العرض الكويس في الجسم فيه:', 'A good talk body has:'), o: [B('3 نقط بحد أقصى', 'three points at most'), B('20 نقطة', '20 points'), B('ولا نقطة', 'no points')], a: 0, why: B('السامع يفتكر.', 'So listeners remember.') },
        { q: B('«Moving on to…» بتستخدمها:', '"Moving on to…" is used:'), o: [B('للانتقال للنقطة الجاية', 'to go to the next point'), B('للبداية', 'to start'), B('للاعتذار', 'to apologise')], a: 0, why: B('transition.', 'a transition.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Errors dropped from 50 to 10.', 'Errors dropped of 50 in 10.', 'Errors dropped at 50 by 10.'], a: 0, why: B('from… to…', 'from… to…') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['There was a 10% increase in sales.', 'There was a 10% increase of sales by.', 'There was increase 10% sales.'], a: 0, why: B('an increase in.', 'an increase in.') },
        { q: B('remain stable معناها:', 'remain stable means:'), o: [B('يفضل ثابت', 'stay the same'), B('يزيد جدًا', 'rise sharply'), B('يقع', 'crash')], a: 0, why: B('مفيش تغيير كبير.', 'No big change.') },
        { q: B('a sharp rise هي:', 'a sharp rise is:'), o: [B('زيادة كبيرة وسريعة', 'a big, fast increase'), B('زيادة صغيرة', 'a small increase'), B('نزول', 'a fall')], a: 0, why: B('sharp = حاد.', 'sharp = steep.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['20 percentage of users', '20 percent of users', '20 percents of users'], a: 1, why: B('percent مع رقم.', 'percent with a number.') },
        { q: B('للأجزاء من الكل أحسن:', 'For parts of a whole, the best is a:'), o: ['pie chart', 'line chart', 'timeline'], a: 0, why: B('الدائرة بتقسم الكل.', 'A pie splits the whole.') },
        { q: B('«roughly half» معناها:', '"roughly half" means:'), o: [B('حوالي النص', 'about half'), B('النص بالظبط', 'exactly half'), B('الضعف', 'double')], a: 0, why: B('تقريبًا.', 'approximately.') },
        { q: B('ترتيب وصف الجراف:', 'The order for describing a chart:'), o: [B('بيوري إيه ← أهم ملاحظة ← المعنى', 'what it shows → key point → meaning'), B('كل الأرقام', 'all the numbers'), B('المعنى بس', 'the meaning only')], a: 0, why: B('التلات خطوات.', 'The three steps.') },
        { q: B('«So you\'re asking whether…» بتستخدمها:', '"So you\'re asking whether…" is used to:'), o: [B('تعيد صياغة السؤال تتأكد', 'rephrase the question to check it'), B('ترفض السؤال', 'refuse the question'), B('تنهي العرض', 'end the talk')], a: 0, why: B('تتأكد إنك فاهم.', 'Make sure you understood.') },
        { q: B('pivot table بتعمل:', 'A pivot table:'), o: [B('تلخّص وتجمّع البيانات', 'summarises and groups data'), B('تمسح بيانات', 'deletes data'), B('ترسم صورة', 'draws a picture')], a: 0, why: B('تجميع حسب عمود.', 'Groups by a column.') }
      ] }
  ]
};
