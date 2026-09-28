// Week 20 — Demos and explaining your project (end of month 5).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B2',
  title: B('الـ Demos وشرح المشروع', 'Demos and explaining your project'),
  goal: B('تعمل demo لايف بالإنجليزي: تشرح وانت بتعمل، وتوصف البيانات وتنضيفها، وتتعامل مع المشاكل اللي بتحصل وقت العرض بهدوء، وتشرح مشروعك لأي حد تقني أو مش تقني.',
          'Run a live demo in English: narrate as you go, describe data and how you clean it, handle problems during the demo calmly, and explain your project to technical and non-technical people.'),
  days: [
    { title: B('احكي وانت بتعمل', 'Narrate as you go'),
      goal: B('تشرح خطواتك وانت بتعملها بالمضارع المستمر والأمر، وتوصف جداول البيانات.', 'Describe your steps while you do them, with the present continuous and the imperative, and describe spreadsheets.'),
      learn: [
        { h: B('لغة الـ demo', 'Demo language'),
          p: B('Now I\'m opening… / Here you can see… / I\'ll click on… / Notice that… / Let\'s see what happens when… / And there it is.', 'Now I\'m opening… / Here you can see… / I\'ll click on… / Notice that… / Let\'s see what happens when… / And there it is.'),
          ex: 'Now I\'m adding a new row to the sheet.\nNotice that the workflow starts on its own.\nAnd there it is: the message arrives in Telegram.' },
        { h: B('وصف جدول', 'Describing a spreadsheet'),
          p: B('workbook = الملف، worksheet / sheet = التبويب، cell = الخانة، formula = المعادلة، freeze panes = تثبيت الصف الأول، merge cells = دمج خانات.', 'workbook = the file, worksheet / sheet = the tab, cell = a box, formula = a calculation, freeze panes = keep the top row visible, merge cells = join cells.'),
          ex: 'Column C has a formula that adds up the totals.\nI froze the header row, so it stays visible when I scroll.' },
        { h: B('قول القصة مش الأزرار', 'Tell the story, not the buttons'),
          p: B('ابدأ بالمشكلة اللي الـ demo بيحلها، وبعدين وري الحل، وفي الآخر النتيجة. متشرحش كل زرار.', 'Start with the problem the demo solves, then show the solution, then the result. Don\'t explain every button.'),
          ex: 'Every Monday Sara copies 200 orders by hand. Let me show you how this workflow does it in 10 seconds.' }
      ],
      practice: [
        B('اعمل demo لـ workflow أو سكربت واكتب الكلام اللي هتقوله في كل خطوة.', 'Demo a workflow or script and write what you will say at each step.'),
        B('اوصف شيت Excel أو Google Sheets عندك في 6 جمل بكلمات النهارده.', 'Describe one of your Excel or Google Sheets files in 6 sentences with today\'s words.'),
        B('اكتب جملة مشكلة وجملة نتيجة لـ demo بتاعك.', 'Write a problem sentence and a result sentence for your demo.'),
        B('سجّل شاشتك وانت بتعمل الـ demo وبتتكلم (دقيقتين).', 'Record your screen while you give the demo and talk (two minutes).')
      ],
      words: ['spreadsheet', 'worksheet / sheet', 'workbook', 'cell', 'formula', 'freeze panes', 'merge cells'],
      read: [{ lib: 'Traversy Media', what: B('شوف 5 دقايق من فيديو بيبني حاجة لايف، ولاحظ الجمل اللي بيقولها وهو بيشتغل.', 'Watch 5 minutes of a live-build video and notice the phrases he says while working.') }],
      challenge: B('اعمل screencast دقيقتين بالإنجليزي لحاجة عملتها، بالقصة: مشكلة ← حل ← نتيجة.', 'Make a two-minute English screencast of something you built, as a story: problem → solution → result.'),
      quiz: [
        { q: B('أحسن بداية للـ demo:', 'The best way to start a demo:'), o: ['First I click File.', 'Every week, Sara copies 200 orders by hand. Let me show you a faster way.', 'This is a button.'], a: 1, why: B('ابدأ بالمشكلة.', 'Start with the problem.') },
        { q: B('cell في جدول هي:', 'A cell in a spreadsheet is:'), o: [B('خانة واحدة', 'one box'), B('الملف كله', 'the whole file'), B('تبويب', 'a tab')], a: 0, why: B('تقاطع صف وعمود.', 'Where a row meets a column.') },
        { q: B('«Notice that…» بتستخدمها:', '"Notice that…" is used to:'), o: [B('تلفت الانتباه لحاجة مهمة', 'draw attention to something important'), B('تنهي العرض', 'end the demo'), B('تعتذر', 'apologise')], a: 0, why: B('ركّزوا هنا.', 'Look here.') }
      ] },

    { title: B('تنضيف البيانات', 'Cleaning data'),
      goal: B('توصف مشاكل البيانات وتنضيفها: مكرر، فاضي، مش متطابق، ومش متسق.', 'Describe data problems and cleanup: duplicates, blanks, mismatches and inconsistencies.'),
      learn: [
        { h: B('مشاكل البيانات', 'Data problems'),
          p: B('duplicates (مكرر)، blank cells (فاضي)، mismatches (مش متطابق بين ملفين)، inconsistent formats (تواريخ بأشكال مختلفة)، typos، extra spaces.', 'duplicates, blank cells, mismatches (between two files), inconsistent formats (dates written differently), typos, extra spaces.'),
          ex: 'About 5% of the rows are duplicates.\nThe dates are inconsistent: some are 01/10/26, some are 2026-10-01.' },
        { h: B('خطوات التنضيف', 'Cleanup steps'),
          p: B('Remove duplicates. Fill or flag blank cells. Trim extra spaces. Convert all dates to one format. Double-check the totals.', 'Remove duplicates. Fill or flag blank cells. Trim extra spaces. Convert all dates to one format. Double-check the totals.'),
          ex: 'I flagged 12 rows with a missing email instead of deleting them.' },
        'g:lie و lay'
      ],
      practice: [
        B('خد شيت فيه بيانات حقيقية ولاقي 3 مشاكل واكتبهم بجملة لكل واحدة.', 'Take a sheet with real data, find 3 problems and write one sentence for each.'),
        B('اكتب خطوات تنضيف لنفس الشيت في 5 خطوات بالأمر.', 'Write the cleanup steps for the same sheet in 5 imperative steps.'),
        B('اعمل workflow أو سكربت بيشيل المكرر واشرحه في 4 جمل.', 'Build a workflow or script that removes duplicates and explain it in 4 sentences.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['clean up (data)', 'duplicate', 'blank / empty cell', 'mismatch', 'inconsistent', 'flag', 'verify / double-check'],
      read: [{ lib: 'Real Python', what: B('دوّر على «data cleaning with pandas» واقرا المقدمة.', 'Search for "data cleaning with pandas" and read the introduction.') }],
      challenge: B('اكتب «data quality report» لشيت عندك: عدد الصفوف، والمشاكل بالأرقام، واللي عملته، واللي محتاج قرار.', 'Write a data-quality report for one of your sheets: row count, problems with numbers, what you did, and what needs a decision.'),
      quiz: [
        { q: B('inconsistent format يعني:', 'An inconsistent format means:'), o: [B('نفس البيانات مكتوبة بأشكال مختلفة', 'the same data written in different ways'), B('بيانات ناقصة', 'missing data'), B('بيانات صح', 'correct data')], a: 0, why: B('زي التواريخ.', 'Like dates.') },
        { q: B('flag a row يعني:', 'flag a row means:'), o: [B('تعلّم عليه عشان يتراجع', 'mark it for review'), B('تمسحه', 'delete it'), B('ترسم علم', 'draw a flag')], a: 0, why: B('تعليم مش حذف.', 'Mark, don\'t delete.') },
        { q: B('duplicate يعني:', 'duplicate means:'), o: [B('مكرر', 'repeated'), B('فاضي', 'empty'), B('غلط إملائي', 'misspelled')], a: 0, why: B('نفس الصف مرتين.', 'The same row twice.') }
      ] },

    { title: B('التأكد والمطابقة', 'Checking and reconciling'),
      goal: B('تشرح إزاي بتتأكد من صحة الأرقام، وتطابق بين مصدرين، وتصدّر وتستورد.', 'Explain how you check that numbers are right, reconcile two sources, and export and import.'),
      learn: [
        { h: B('sanity check', 'Sanity checks'),
          p: B('فحص سريع إن النتيجة منطقية: The total should be around last month\'s. / No price should be negative. / Every order should have a customer.', 'A quick check that the result makes sense: The total should be around last month\'s. / No price should be negative. / Every order should have a customer.'),
          ex: 'As a sanity check, I compared the total with the bank statement.' },
        { h: B('المطابقة', 'Reconciling'),
          p: B('reconcile = تطابق مصدرين وتفسر الفرق: The CRM shows 1,204 orders and the sheet shows 1,198. The 6 missing orders were refunded.', 'reconcile = match two sources and explain the difference: The CRM shows 1,204 orders and the sheet shows 1,198. The 6 missing orders were refunded.'),
          ex: 'After reconciling, the difference is USD 0.' },
        { h: B('التقريب والمعايير', 'Rounding and criteria'),
          p: B('round to two decimal places، round up / down. والمعايير: Filter the rows that meet these criteria: paid, in October, over USD 100.', 'round to two decimal places, round up / down. Criteria: Filter the rows that meet these criteria: paid, in October, over USD 100.'),
          ex: '12.456 rounded to two decimal places is 12.46.' }
      ],
      practice: [
        B('اكتب 5 sanity checks لتقرير أو workflow عندك.', 'Write 5 sanity checks for one of your reports or workflows.'),
        B('طابق بين مصدرين (أي ملفين) واكتب الفرق وسببه في 3 جمل.', 'Reconcile two sources (any two files) and write the difference and its cause in 3 sentences.'),
        B('اكتب معايير فلترة لـ 3 تقارير.', 'Write filter criteria for 3 reports.'),
        B('اشرح macro أو add-in بتستخدمه (أو متخيّل) في 3 جمل.', 'Explain a macro or add-in you use (or imagine) in 3 sentences.')
      ],
      words: ['reconcile', 'export / import', 'add-in', 'macro', 'criteria', 'sanity check', 'round (a number)'],
      read: [{ lib: 'W3Schools', what: B('افتح قسم Excel واقرا صفحة عن الـ functions الأساسية.', 'Open the Excel section and read a page about the basic functions.') }],
      challenge: B('ضيف لـ workflow عندك خطوة sanity check بتبعت تنبيه لو الرقم غريب، واشرحها في README.', 'Add a sanity-check step to one of your workflows that sends an alert when a number looks wrong, and explain it in the README.'),
      quiz: [
        { q: B('sanity check هو:', 'A sanity check is:'), o: [B('فحص سريع إن النتيجة منطقية', 'a quick check that the result makes sense'), B('اختبار نفسي', 'a psychology test'), B('نسخة احتياطية', 'a backup')], a: 0, why: B('منطقي ولا لأ.', 'Does it make sense?') },
        { q: B('reconcile يعني:', 'reconcile means:'), o: [B('تطابق مصدرين وتفسر الفرق', 'match two sources and explain the difference'), B('تصالح حد', 'make peace with someone'), B('تمسح', 'delete')], a: 0, why: B('في المحاسبة والبيانات.', 'In accounting and data.') },
        { q: B('12.456 مقربة لرقمين عشريين:', '12.456 rounded to two decimal places:'), o: ['12.45', '12.46', '12.5'], a: 1, why: B('6 بتقرّب لفوق.', 'The 6 rounds up.') }
      ] },

    { title: B('لما الـ demo يقع', 'When the demo breaks'),
      goal: B('تتعامل بهدوء مع مشاكل العرض اللايف: النت، والشاشة، والجهاز، وتكمّل.', 'Stay calm when a live demo goes wrong — internet, screen, device — and keep going.'),
      learn: [
        { h: B('جمل الطوارئ', 'Emergency phrases'),
          p: B('Looks like the connection dropped — give me a second. / That\'s not what I expected; let me try again. / While this loads, let me explain what\'s happening. / I have a recording as a backup.', 'Looks like the connection dropped — give me a second. / That\'s not what I expected; let me try again. / While this loads, let me explain what\'s happening. / I have a recording as a backup.'),
          ex: 'The screen froze. While I restart the browser, let me show you the result on this slide.' },
        { h: B('خطة ب', 'Plan B'),
          p: B('قبل أي demo: جهّز screenshots أو فيديو احتياطي، وبيانات تجريبية جاهزة، وجرب النت والشاشة، وشحن اللابتوب.', 'Before any demo: have backup screenshots or a video, ready-made test data, test the internet and the screen, and charge the laptop.'),
          ex: 'Checklist: charger plugged in, notifications off, test account logged in, backup video ready.' },
        { h: B('أجهزة وأعطال', 'Devices and faults'),
          p: B('frozen screen، out of order (عطلان)، reset your password، fix / repair، plug in / unplug، connection، decimal (في الأرقام: point).', 'a frozen screen, out of order, reset your password, fix / repair, plug in / unplug, connection, decimal (in numbers, "point").'),
          ex: 'The projector is out of order, so I\'ll share my screen instead.' }
      ],
      practice: [
        B('اكتب 6 جمل طوارئ لمواقف مختلفة وقولها بهدوء.', 'Write 6 emergency phrases for different situations and say them calmly.'),
        B('اكتب checklist قبل الـ demo من 8 بنود.', 'Write an 8-item pre-demo checklist.'),
        B('جهّز «backup» للـ demo بتاعك: screenshots أو فيديو.', 'Prepare a backup for your demo: screenshots or a video.'),
        B('قول 5 أرقام عشرية بصوت عالي: 3.14 = three point one four.', 'Say 5 decimal numbers out loud: 3.14 = three point one four.')
      ],
      words: ['decimal', 'connection', 'frozen (screen)', 'out of order', 'fix / repair', 'reset (password)', 'plug in / unplug'],
      read: [{ lib: 'Syntax', what: B('اسمع جزء من حلقة فيها live coding ولاحظ بيتصرفوا إزاي لما حاجة تقع.', 'Listen to part of an episode with live coding and notice how they react when something breaks.') }],
      challenge: B('اعمل الـ demo قدام حد، واطلب منه يقطع النت أو يقفل حاجة فجأة، وكمّل بخطة ب.', 'Give your demo to someone and ask them to cut the internet or close something suddenly; carry on with Plan B.'),
      quiz: [
        { q: B('لو الـ demo وقع:', 'If the demo breaks:'), o: ['Oh no, it\'s broken, sorry sorry.', 'That\'s not what I expected — let me show you the recording instead.', 'Leave the call.'], a: 1, why: B('هادي ومعاك بديل.', 'Calm, with a backup.') },
        { q: B('out of order يعني:', 'out of order means:'), o: [B('عطلان', 'not working'), B('مش مرتب', 'not sorted'), B('مش مطلوب', 'not ordered')], a: 0, why: B('للأجهزة.', 'For machines.') },
        { q: B('3.5 بتتقري:', '3.5 is read as:'), o: ['three point five', 'three comma five', 'three dot five hundred'], a: 0, why: B('point للعلامة العشرية.', 'point for the decimal mark.') }
      ] },

    { title: B('اشرح لأي حد', 'Explaining to anyone'),
      goal: B('تشرح نفس المشروع لحد تقني ولحد مش تقني، وتتكلم عن الصور والتصميم.', 'Explain the same project to a technical person and a non-technical one, and talk about images and design.'),
      learn: [
        { h: B('مستويين من الشرح', 'Two levels of explanation'),
          p: B('لغير التقني: المشكلة والفايدة بالأرقام، من غير مصطلحات. للتقني: المعمارية والأدوات والقرارات. ابدأ بسؤال: How technical should I go?', 'For non-technical people: the problem and the benefit in numbers, without jargon. For technical people: the architecture, tools and decisions. Start by asking: How technical should I go?'),
          ex: 'Non-technical: It saves the team 5 hours a week.\nTechnical: A webhook triggers an n8n workflow that writes to Postgres.' },
        { h: B('التشبيه', 'Analogies'),
          p: B('التشبيه بيسهّل: A webhook is like a doorbell: the app rings us when something happens. An API is like a waiter between you and the kitchen.', 'Analogies help: A webhook is like a doorbell: the app rings us when something happens. An API is like a waiter between you and the kitchen.'),
          ex: 'A cache is like keeping your keys by the door instead of in the drawer.' },
        { h: B('كلام الصور', 'Image words'),
          p: B('resize، crop، rotate، pixel، RGB، coordinate (x, y)، overlay (طبقة فوق الصورة)، thumbnail.', 'resize, crop, rotate, pixel, RGB, coordinate (x, y), overlay (a layer on top), thumbnail.'),
          ex: 'The script resizes each photo to 800 pixels wide and adds a logo overlay.' }
      ],
      practice: [
        B('اكتب شرح مشروعك مرتين: لمدير مش تقني (4 جمل) ولمبرمج (6 جمل).', 'Explain your project twice: to a non-technical manager (4 sentences) and to a developer (6 sentences).'),
        B('اكتب 4 تشبيهات لمفاهيم تقنية.', 'Write 4 analogies for technical concepts.'),
        B('اوصف سكربت بيعدّل صور في 5 جمل بكلمات النهارده.', 'Describe a script that edits images in 5 sentences with today\'s words.'),
        B('قول «How technical should I go?» و3 أسئلة تانية تعرف بيها مستوى السامع.', 'Say "How technical should I go?" and 3 other questions to learn your listener\'s level.')
      ],
      words: ['pixel', 'resize', 'crop', 'rotate', 'RGB', 'coordinate', 'overlay'],
      read: [{ lib: 'Crash Course', what: B('شوف فيديو من Crash Course Computer Science ولاحظ التشبيهات.', 'Watch a Crash Course Computer Science video and notice the analogies.') }],
      challenge: B('اشرح مشروعك لحد من عيلتك أو صاحب مش مبرمج بالإنجليزي (أو اتخيّل) في دقيقة، واسأله فهم إيه.', 'Explain your project in English to a family member or a non-programmer friend (or imagine it) in one minute, and ask what they understood.'),
      quiz: [
        { q: B('لحد مش تقني ابدأ بـ:', 'For a non-technical person, start with:'), o: [B('المشكلة والفايدة', 'the problem and the benefit'), B('الـ database schema', 'the database schema'), B('الكود', 'the code')], a: 0, why: B('المعنى قبل التفاصيل.', 'Meaning before details.') },
        { q: B('«A webhook is like a doorbell» ده:', '"A webhook is like a doorbell" is:'), o: [B('تشبيه', 'an analogy'), B('كود', 'code'), B('خطأ', 'an error')], a: 0, why: B('بيسهّل الفكرة.', 'It makes the idea easy.') },
        { q: B('crop يعني:', 'crop means:'), o: [B('تقص جزء من الصورة', 'cut out part of an image'), B('تكبّر الصورة', 'enlarge the image'), B('تلف الصورة', 'rotate the image')], a: 0, why: B('قص.', 'Trim.') }
      ] },

    { title: B('مراجعة الشهر الخامس والاختبار', 'Month 5 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 21 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 21 opens when you score 70% or more.'),
      review: [
        B('الاستماع: 3 مرات، والتدوين، والـ signposts، والـ shadowing.', 'Listening: three listens, notes, signposts and shadowing.'),
        B('النطق: الضغط، والأصوات، والرموز، والنغمة.', 'Pronunciation: stress, sounds, symbols and intonation.'),
        B('العرض: الهيكل، والتريندات، والجرافات، والأسئلة.', 'Presenting: structure, trends, charts and questions.'),
        B('الـ demo: احكي وانت بتعمل، ومشكلة ← حل ← نتيجة.', 'Demos: narrate as you go; problem → solution → result.'),
        B('البيانات: duplicates، inconsistent، sanity check، reconcile.', 'Data: duplicates, inconsistent, sanity check, reconcile.'),
        B('اشرح لمستويين، واستخدم التشبيه.', 'Explain at two levels, and use analogies.')
      ],
      project: B('مشروع الشهر: اعمل «demo day» لمشروعك: فيديو 5 دقايق بالإنجليزي فيه عرض قصير بسلايدين (المشكلة والنتيجة بالأرقام)، وdemo لايف بتحكي فيه وانت بتعمل، وشرح بتشبيه لغير التقنيين، وجزء أسئلة. ومعاه صفحة ملخص مكتوبة وقايمة خطة ب.',
                 'Month project: hold a "demo day" for your project: a 5-minute English video with a short two-slide talk (the problem and the result in numbers), a live demo narrated as you go, an analogy for non-technical viewers, and a Q&A part. Include a written one-page summary and your Plan B checklist.'),
      test: [
        { q: B('في أول مرة استماع:', 'On the first listen:'), o: [B('الفكرة العامة', 'the main idea'), B('كل رقم', 'every number'), B('ترجمة كل كلمة', 'translate every word')], a: 0, why: B('gist.', 'the gist.') },
        { q: B('الضغط في deploy على:', 'The stress in deploy is on:'), o: ['DE-', '-PLOY'], a: 1, why: B('dePLOY.', 'dePLOY.') },
        { q: B('cache بتتنطق زي:', 'cache sounds like:'), o: ['cash', 'catch', 'cake'], a: 0, why: B('/kæʃ/.', '/kæʃ/.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Costs rose by 15%.', 'Costs rose with 15%.', 'Costs rose of 15%.'], a: 0, why: B('by للمقدار.', 'by for the amount.') },
        { q: B('للمقارنة بين فئات أحسن:', 'To compare categories, the best is a:'), o: ['bar chart', 'line chart', 'pie chart only'], a: 0, why: B('الأعمدة للمقارنة.', 'Bars for comparison.') },
        { q: B('أحسن بداية demo:', 'The best demo opening:'), o: ['I click here, then here.', 'Every week the team loses 5 hours on this. Let me show you the fix.', 'Hello, this is software.'], a: 1, why: B('المشكلة الأول.', 'The problem first.') },
        { q: B('blank cell هي:', 'A blank cell is:'), o: [B('خانة فاضية', 'an empty cell'), B('خانة سودا', 'a black cell'), B('خانة فيها خطأ', 'a cell with an error')], a: 0, why: B('blank = فاضي.', 'blank = empty.') },
        { q: B('sanity check هو:', 'A sanity check is:'), o: [B('فحص سريع إن النتيجة منطقية', 'a quick check that a result makes sense'), B('اختبار طويل', 'a long test'), B('حذف البيانات', 'deleting data')], a: 0, why: B('منطقي ولا لأ.', 'Does it make sense?') },
        { q: B('لو الشاشة علّقت في العرض:', 'If the screen freezes during a demo:'), o: ['Panic.', 'While I restart it, let me show you the result on this slide.', 'End the meeting.'], a: 1, why: B('هدوء وخطة ب.', 'Calm and Plan B.') },
        { q: B('0.25 بتتقري:', '0.25 is read as:'), o: ['zero point two five', 'zero comma twenty-five', 'point zero two five'], a: 0, why: B('point + الأرقام واحد واحد.', 'point + each digit.') },
        { q: B('«How technical should I go?» بتسألها عشان:', 'You ask "How technical should I go?" to:'), o: [B('تعرف مستوى السامع', 'learn the listener\'s level'), B('تنهي الكلام', 'end the talk'), B('تغيّر الموضوع', 'change the subject')], a: 0, why: B('عشان تختار مستوى الشرح.', 'To choose the level of detail.') },
        { q: B('resize يعني:', 'resize means:'), o: [B('تغيّر المقاس', 'change the size'), B('تغيّر اللون', 'change the colour'), B('تمسح', 'delete')], a: 0, why: B('size = مقاس.', 'size = dimensions.') }
      ] }
  ]
};
