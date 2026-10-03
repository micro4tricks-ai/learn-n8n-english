// English week 48 — The C2 capstone: proving and keeping your English.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C2',
  title: B('مشروع التخرج النهائي: تثبت إنجليزيك وتحافظ عليه', 'The final capstone: proving and keeping your English'),
  goal: B('تجمع 12 شهر في مشروع تخرج: تقيّم مستواك بأمانة بمقاييس CEFR، تبني حافظة كتابة احترافية، تسجّل عرض ومحادثات صعبة، تعالج الأخطاء المتجذرة، وتحط نظام يحافظ على مستوى C2 ويطوّره — وتبدأ تعلّم غيرك.',
          'Bring 12 months together in a capstone: assess your level honestly against CEFR, build a professional writing portfolio, record a presentation and difficult conversations, treat your fossilised errors, and set up a system to keep and grow your C2 level — and start teaching others.'),
  days: [
    { title: B('انت فين بالظبط؟', 'Where exactly are you?'),
      goal: B('تقييم أمين بمقاييس دولية.', 'An honest assessment against international standards.'),
      learn: [
        L(B('مقاييس CEFR', 'The CEFR scales'),
          B('**CEFR** (الإطار الأوروبي المرجعي) بيوصف المستويات من A1 لـ C2 بـ **can-do statement** («I can…»). C2 مش «زي الناطق الأصلي» — هو **proficiency** (تمكّن): تفهم تقريبًا كل حاجة بسهولة، وتعبّر بطلاقة ودقة وتفرق بين الفروق الدقيقة في المواقف المعقدة.', 'The **CEFR** (Common European Framework of Reference) describes levels A1 to C2 with a **can-do statement** («I can…»). C2 is not «like a native speaker» — it is **proficiency**: you understand virtually everything with ease and express yourself fluently and precisely, distinguishing fine shades of meaning in complex situations.'),
          'C2 can-do statements (paraphrased)\n☐ I can follow a fast technical discussion between native speakers.\n☐ I can write a complex report with a clear, logical structure.\n☐ I can rephrase smoothly when I can’t find a word.\n☐ I can adapt my tone to any audience — executive, client, friend.'),
        L(B('أبعاد التقييم', 'What gets assessed'),
          B('الامتحانات الدولية بتقيّم على أبعاد: **fluency** (الطلاقة من غير وقفات كتير)، الدقة، **complexity** (تنوع التراكيب)، **coherence** (منطق الأفكار) و**cohesion** (ربط الجمل بالروابط)، و**intelligibility** (إن كلامك يتفهم بسهولة — أهم من الـ **accent**). اعمل **self-assessment** على كل بُعد من 1–5.', 'International exams assess on dimensions: **fluency** (speaking without many pauses), accuracy, **complexity** (variety of structures), **coherence** (the logic of ideas) and **cohesion** (linking sentences with connectors), and **intelligibility** (being easily understood — more important than your **accent**). Do a **self-assessment** of each dimension from 1–5.'),
          'self-assessment (1–5)\nfluency          4  still pause when tired\naccuracy         4  articles, prepositions\ncomplexity       4  avoid inversion in speech\ncoherence        5\ncohesion         4  overuse «also»\nintelligibility  5'),
        L(B('اختبار تجريبي', 'A mock test'),
          B('اعمل **mock test** بعينات رسمية مجانية (Cambridge C2 Proficiency أو IELTS) بتوقيت حقيقي. **band score** = درجة IELTS من 9 (C2 تقريبًا 8.5–9). الهدف مش الشهادة — الهدف تعرف نقط ضعفك بأرقام. والشهادة مفيدة لو وظيفة أو هجرة بتطلبها.', 'Do a **mock test** with free official samples (Cambridge C2 Proficiency or IELTS) under real timing. A **band score** = an IELTS score out of 9 (C2 is roughly 8.5–9). The goal is not the certificate — it is knowing your weak points in numbers. A certificate is useful if a job or visa requires it.'),
          'mock test log\ndate        part        score   weakest area\n2026-10-04  reading     38/40   inference questions\n2026-10-04  listening   35/40   numbers in fast speech\n2026-10-05  writing     7.5     cohesion: too many «also»\n2026-10-05  speaking    8       long pauses in part 3')
      ],
      practice: [
        B('اقرا can-do statements لـ C1 وC2 وعلّم.', 'Read the C1 and C2 can-do statements and tick them.'),
        B('اعمل self-assessment على 6 أبعاد.', 'Do a self-assessment on 6 dimensions.'),
        B('اعمل mock test reading وlistening بتوقيت.', 'Take a timed reading and listening mock test.'),
        B('سجّل جزء speaking واسمعه بقايمة الأبعاد.', 'Record a speaking part and review it against the dimensions.')
      ],
      words: [
        W('CEFR', 'الإطار الأوروبي لمستويات اللغة', 'the European scale of language levels', 'C2 is the top CEFR level.'),
        W('can-do statement', 'جملة «أقدر أعمل»', 'a description of what a learner can do', 'Tick each can-do statement honestly.'),
        W('proficiency', 'التمكّن', 'a high level of skill', 'C2 is called Proficiency.'),
        W('fluency', 'الطلاقة', 'speaking smoothly without many pauses', 'Fluency improves with daily speaking.'),
        W('complexity', 'تنوع وتعقيد التراكيب', 'the variety of structures you use', 'Add complexity with inversion and clefts.'),
        W('coherence', 'منطق وترابط الأفكار', 'the logical flow of ideas', 'Coherence comes from a clear plan.'),
        W('cohesion', 'ترابط الجمل بالروابط', 'linking sentences together', 'Use varied linkers for cohesion.'),
        W('intelligibility', 'سهولة فهم كلامك', 'being easily understood', 'Intelligibility matters more than accent.'),
        W('accent', 'اللكنة', 'the way you pronounce a language', 'Your accent is part of who you are.'),
        W('self-assessment', 'تقييم ذاتي', 'judging your own level', 'Repeat the self-assessment every quarter.'),
        W('mock test', 'اختبار تجريبي', 'a practice exam', 'Take a mock test under real timing.'),
        W('band score', 'درجة IELTS', 'an IELTS score out of 9', 'She got a band score of 8.5.')
      ],
      read: [{ lib: 'British Council LearnEnglish', what: B('اقرا وصف مستويات CEFR.', 'Read the CEFR level descriptions.') }],
      challenge: B('اعمل mock test كامل (reading، listening، writing، speaking متسجّل) بعينات رسمية مجانية وبتوقيت حقيقي، واملا جدول self-assessment و«أضعف 3 نقط» بأرقام.', 'Take a full mock test (reading, listening, writing, recorded speaking) with free official samples under real timing, and fill in a self-assessment table and your «3 weakest points» with numbers.'),
      quiz: [
        Q(B('C2 يعني:', 'C2 means:'), ['proficiency: precise, fluent, nuanced', 'exactly like a native speaker', 'perfect accent'], 0, B('تمكّن.', 'Proficiency.')),
        Q(B('أهم من اللكنة:', 'More important than accent:'), ['intelligibility', 'speed', 'slang'], 0, B('الفهم.', 'Being understood.')),
        Q(B('cohesion:', 'Cohesion:'), ['linking sentences with connectors', 'a team meeting', 'grammar only'], 0, B('ربط.', 'Linking.'))
      ] },

    { title: B('الأخطاء المتجذرة', 'Fossilised errors'),
      goal: B('تكسر الأخطاء اللي ثابتة من سنين.', 'Break the errors that have stuck for years.'),
      learn: [
        L(B('يعني إيه متجذر', 'What fossilised means'),
          B('**fossilised error** = غلط بقى «متحجر» من كتر التكرار ومش بيتصلح لوحده حتى في مستوى متقدم. عند المتحدثين بالعربي أشهرها: the زيادة أو ناقصة، prepositions، «discuss about»، «I am agree»، ونطق p/b وv/f.', 'A **fossilised error** = a mistake that has become «fossilised» through repetition and does not fix itself, even at an advanced level. For Arabic speakers, the most common: extra or missing «the», prepositions, «discuss about», «I am agree», and pronouncing p/b and v/f.'),
          '✗ discuss about the price     → ✓ discuss the price\n✗ I am agree                  → ✓ I agree\n✗ the life is busy            → ✓ life is busy\n✗ depend of                   → ✓ depend on\n✗ more better                 → ✓ better\n✗ "barking" (for parking)     → ✓ /p/ with a puff of air'),
        L(B('سجل الأخطاء', 'The error log'),
          B('**error log** = سجل لكل غلط متكرر: الغلط، الصح، 3 جمل من شغلك، وتاريخ آخر مرة. مصادره: تصحيحات الناس، تسجيلاتك، وأدوات المراجعة. ركّز على 5 أخطاء بس في الشهر لحد ما تختفي.', 'An **error log** = a record of each recurring mistake: the error, the correction, 3 sentences from your work, and the date it last happened. Sources: people’s corrections, your recordings, and checking tools. Focus on just 5 errors a month until they disappear.'),
          'error log\nerror              correct          my sentences                           last seen\ndiscuss about      discuss          "Let’s discuss the scope."             2026-09-28\nthe + general noun  no article       "Automation saves time."               2026-10-01\nresponsible of     responsible for  "I’m responsible for the integration."  2026-10-03'),
        L(B('علاج مركّز', 'Targeted treatment'),
          B('العلاج: (1) الوعي — تعرف الغلط بالاسم، (2) **redraft** — تعيد كتابة جمل حقيقية صح، (3) تمرين شفهي بطيء ثم سريع، (4) مراقبة — حد يصحّحلك الغلط ده بس لمدة أسبوعين. والطلاقة متتأخرش: صحّح بعد الكلام مش في نصّه.', 'The treatment: (1) awareness — name the error, (2) **redraft** — rewrite real sentences correctly, (3) spoken drilling, slow then fast, (4) monitoring — someone corrects only that error for two weeks. And keep fluency: correct after speaking, not in the middle.'),
          'two-week plan for «discuss about»\nday 1   find it in 5 old emails, redraft them\nday 2–7 say 10 sentences with «discuss» aloud daily\nday 8   ask a colleague to flag it in meetings\nday 14  record a 5-minute talk — count occurrences (target: 0)')
      ],
      practice: [
        B('دوّر على 10 أخطاء متكررة في إيميلاتك وتسجيلاتك.', 'Find 10 recurring errors in your emails and recordings.'),
        B('ابدأ error log بأهم 5.', 'Start an error log with the top 5.'),
        B('redraft 10 جمل حقيقية.', 'Redraft 10 real sentences.'),
        B('اعمل خطة أسبوعين لغلط واحد.', 'Make a two-week plan for one error.')
      ],
      words: [
        W('fossilised error', 'غلط متجذر', 'a mistake fixed by long repetition', '«Discuss about» is a fossilised error.'),
        W('error log', 'سجل الأخطاء', 'a record of recurring mistakes', 'Update your error log weekly.'),
        W('redraft', 'تعيد كتابة', 'to write again, improved', 'Redraft the email without the error.'),
        W('final draft', 'النسخة النهائية', 'the finished version', 'Send only the final draft.'),
        W('style sheet', 'دليل أسلوب شخصي', 'a list of your writing rules', 'My style sheet says «email», not «e-mail».')
      ],
      read: [{ lib: 'Cambridge Dictionary', what: B('دوّر على الكلمات اللي بتغلط فيها وشوف أمثلتها.', 'Look up the words you get wrong and study their examples.') }],
      challenge: B('ابني error log بأكتر 5 أخطاء متجذرة عندك (من إيميلات وتسجيلات حقيقية)، ونفّذ خطة الأسبوعين لأول غلط، وسجّل محاضرة 5 دقايق في الآخر وعدّ.', 'Build an error log of your 5 most fossilised errors (from real emails and recordings), carry out the two-week plan for the first one, and record a 5-minute talk at the end and count.'),
      quiz: [
        Q(B('الصح:', 'Correct:'), ['Let’s discuss the price.', 'Let’s discuss about the price.', 'Let’s discuss on the price.'], 0, B('من غير about.', 'No «about».')),
        Q(B('الصح:', 'Correct:'), ['I agree.', 'I am agree.', 'I agreeing.'], 0, B('فعل.', 'A verb.')),
        Q(B('علاج الغلط وقت الكلام:', 'Treating errors while speaking:'), ['correct after speaking, keep fluency', 'stop every sentence', 'never correct'], 0, B('توازن.', 'Balance.'))
      ] },

    { title: B('حافظة الكتابة', 'The writing portfolio'),
      goal: B('أحسن شغلك المكتوب في مكان واحد.', 'Your best written work in one place.'),
      learn: [
        L(B('الاختيار', 'Selecting'),
          B('خلال الرحلة كتبت عشرات المستندات. اختار 8–10 بيمثلوا مدى واسع: إيميل لعميل غاضب، عرض سعر، SOW، تقرير تقني، design doc، one-pager تنفيذي، مقال، PR description، وcase study. التنوع بيبيّن الـ range بتاعك (مدى الأساليب).', 'During the journey you wrote dozens of documents. Choose 8–10 representing a wide spread: an email to an angry client, a quote, an SOW, a technical report, a design doc, an executive one-pager, an article, a PR description, and a case study. Variety shows your stylistic range.'),
          'portfolio contents\n1 Support reply + sincere apology        (week 40)\n2 Quote with three options              (week 39)\n3 Statement of work                      (week 38)\n4 Design doc                             (week 29)\n5 Executive one-pager + decision memo    (week 45)\n6 Technical article                      (week 31)\n7 PR description                         (week 47)\n8 Case study                             (week 47)'),
        L(B('التحرير النهائي', 'The final edit'),
          B('كل مستند يعدّي بمراجعة من 4 مراحل: المحتوى (BLUF ورسالة واحدة)، الهيكل (هرم، عناوين)، الجمل (إيجاز، توازي، ضماير)، والتفاصيل (error log والـ **style sheet** بتاعك). اقرا بصوت عالي في الآخر.', 'Each document goes through a 4-stage edit: content (BLUF, one message), structure (pyramid, headings), sentences (concision, parallelism, pronouns), and details (your error log and your **style sheet**). Read it aloud at the end.'),
          'style sheet (sample)\n- UK or US spelling? → US (organize, color) for Gulf clients using US English\n- dates: 4 October 2026\n- numbers: words for one to nine, digits for 10+\n- «email», «website», «log in» (verb) / «login» (noun)\n- product names exactly as the vendor writes them: n8n, GitHub, WhatsApp'),
        L(B('قبل وبعد', 'Before and after'),
          B('أقوى دليل على تطورك: مستند من أول شهر جنب نفس النوع من آخر شهر. اكتب جنبهم 5 فروق محددة (طول الجمل، الروابط، النبرة، الدقة). ده بيفيدك في المقابلات وفي ثقتك بنفسك.', 'The strongest proof of progress: a document from month one beside the same type from the last month. Write 5 specific differences next to them (sentence length, linkers, tone, precision). This helps in interviews and in your own confidence.'),
          'month 1:  "Hello sir, I want to ask about the problem of the invoices because it is not working good."\nmonth 12: "Hi Daniel, 12 invoices failed this morning because of a new tax code. I’ve fixed the mapping and re-sent them; all 12 are now in Odoo."')
      ],
      practice: [
        B('اختار 8–10 مستندات للحافظة.', 'Choose 8–10 documents for the portfolio.'),
        B('اكتب style sheet شخصي من 10 قواعد.', 'Write a 10-rule personal style sheet.'),
        B('عدّي مستندين بالمراحل الأربعة.', 'Put two documents through the four stages.'),
        B('اعمل مقارنة قبل وبعد.', 'Make a before-and-after comparison.')
      ],
      words: [
        W('writing portfolio', 'حافظة كتابة', 'a collection of your best writing', 'Share your writing portfolio with clients.'),
        W('final edit', 'التحرير النهائي', 'the last revision before publishing', 'The final edit cut 15% of the words.'),
        W('before and after', 'قبل وبعد', 'a comparison showing change', 'The before and after shows real progress.'),
        W('stylistic range', 'تنوع الأساليب', 'the variety of styles you can write in', 'The portfolio shows my stylistic range.'),
        W('progress evidence', 'دليل على التطور', 'proof that you have improved', 'A before-and-after pair is strong progress evidence.')
      ],
      read: [{ lib: 'Google Developer Documentation Style Guide', what: B('خد منه قواعد لـ style sheet بتاعك.', 'Borrow rules for your own style sheet.') }],
      challenge: B('اعمل writing portfolio بالإنجليزي: 8 مستندات بعد التحرير النهائي، style sheet، مقارنة قبل وبعد بـ 5 فروق، وصفحة مقدمة قصيرة — وانشرها (GitHub Pages أو PDF) من غير أي بيانات عملاء حقيقية.', 'Build an English writing portfolio: 8 documents after the final edit, a style sheet, a before-and-after comparison with 5 differences, and a short intro page — and publish it (GitHub Pages or PDF) with no real client data.'),
      quiz: [
        Q(B('الحافظة لازم تبيّن:', 'The portfolio should show:'), ['a wide range of document types', 'ten emails of the same type', 'only grammar exercises'], 0, B('تنوع.', 'Variety.')),
        Q(B('style sheet:', 'A style sheet:'), ['your personal writing rules', 'a CSS file only', 'a spreadsheet'], 0, B('قواعد.', 'Rules.')),
        Q(B('قبل النشر:', 'Before publishing:'), ['remove real client data', 'add client passwords', 'nothing'], 0, B('خصوصية.', 'Privacy.'))
      ] },

    { title: B('الأداء الشفهي', 'The spoken performance'),
      goal: B('تثبت إنجليزيك وانت بتتكلم تحت ضغط.', 'Prove your English while speaking under pressure.'),
      learn: [
        L(B('العرض المتسجّل', 'The recorded presentation'),
          B('سجّل عرض 15 دقيقة عن مشروع حقيقي (البروفة **rehearsal** مرتين قبلها): BLUF، قصة، أرقام، ديمو، وخاتمة. بعدها 10 دقايق أسئلة حقيقية من حد. اسمع واحسب: وقفات، أخطاء error log، وإزاي رديت على سؤال صعب.', 'Record a 15-minute presentation on a real project (do the **rehearsal** twice beforehand): BLUF, story, numbers, demo, and close. Then 10 minutes of real questions from someone. Listen and count: pauses, error-log mistakes, and how you handled a hard question.'),
          'review sheet\n☐ BLUF in the first 30 seconds\n☐ 3 numbers that matter\n☐ fewer than 5 long pauses\n☐ 0 «discuss about»\n☐ hard question: paused, rephrased, answered, checked'),
        L(B('الكلام المرتجل', 'Impromptu speaking'),
          B('C2 بيبان في **impromptu** speaking (من غير تحضير): حد يديك موضوع وتتكلم دقيقتين. الصيغة: رأي ← سبب ← مثال ← رجوع للرأي. ولو الكلمة هربت: لف حواليها («the thing that…»، «what you might call…») — ده مهارة C2 مش ضعف.', 'C2 shows in **impromptu** speaking (without preparation): someone gives you a topic and you speak for two minutes. The formula: opinion → reason → example → back to the opinion. And if a word escapes you: talk around it («the thing that…», «what you might call…») — that is a C2 skill, not a weakness.'),
          'topic: "Should small companies use AI agents?"\n"I’d say yes — but only for narrow tasks at first. The reason is that small teams can’t afford a public mistake. For example, one of my clients started with an agent that only drafts replies, and a person sends them. So: yes, but start small and keep a human in charge."'),
        L(B('محادثات صعبة متسجّلة', 'Recorded difficult conversations'),
          B('سجّل 3 تمثيليات مع حد (أو بالأدوار): عميل غاضب، تفاوض سعر، ومقابلة سينيور. كن **articulate** (بتعبّر بوضوح وسلاسة) تحت الضغط. قيّم بنفس الأبعاد، وقارن بتسجيل من الشهور الأولى لو عندك.', 'Record 3 role-plays with someone (or playing both roles): an angry client, a price negotiation, and a senior interview. Be **articulate** (expressing yourself clearly and smoothly) under pressure. Assess with the same dimensions, and compare with a recording from the early months if you have one.'),
          'role-play cards\n1 angry client: "Third outage this month — I’m considering cancelling."\n2 negotiation:   "Your quote is 40% above the other offer."\n3 interview:     "Tell me about a decision you got wrong."')
      ],
      practice: [
        B('اعمل rehearsal مرتين للعرض.', 'Rehearse the presentation twice.'),
        B('اتكلم impromptu في 5 مواضيع عشوائية دقيقتين.', 'Speak impromptu on 5 random topics for two minutes each.'),
        B('تمرّن على اللف حوالين 10 كلمات صعبة.', 'Practise talking around 10 hard words.'),
        B('سجّل التمثيليات الـ 3.', 'Record the 3 role-plays.')
      ],
      words: [
        W('rehearsal', 'بروفة', 'a practice performance', 'Do a full rehearsal with a timer.'),
        W('impromptu', 'مرتجل من غير تحضير', 'without preparation', 'Give an impromptu two-minute answer.'),
        W('articulate', 'بيعبّر بوضوح وسلاسة', 'able to express ideas clearly', 'She is articulate under pressure.'),
        W('talk around', 'تلف حوالين الكلمة', 'to describe a word you can’t recall', 'If you forget a word, talk around it.'),
        W('spoken performance', 'الأداء الشفهي', 'how well you speak in a test or task', 'The spoken performance was recorded.')
      ],
      read: [{ lib: 'Toastmasters', what: B('اقرا عن Table Topics للكلام المرتجل.', 'Read about Table Topics for impromptu speaking.') }],
      challenge: B('سجّل «الأداء الشفهي النهائي»: عرض 15 دقيقة + 10 دقايق أسئلة، 3 مواضيع impromptu، و3 تمثيليات صعبة — وقيّمهم بالأبعاد الستة وقارنهم بأول تسجيل في الرحلة.', 'Record your «final spoken performance»: a 15-minute presentation + 10 minutes of questions, 3 impromptu topics and 3 difficult role-plays — assess them on the six dimensions and compare with your first recording of the journey.'),
      quiz: [
        Q(B('صيغة impromptu:', 'An impromptu formula:'), ['opinion → reason → example → opinion', 'silence → apology', 'reading a script'], 0, B('هيكل.', 'Structure.')),
        Q(B('الكلمة هربت منك:', 'A word escapes you:'), ['talk around it', 'stop the talk', 'switch to Arabic'], 0, B('مهارة.', 'A skill.')),
        Q(B('articulate:', 'Articulate:'), ['expressing ideas clearly', 'an article', 'very loud'], 0, B('وضوح.', 'Clarity.'))
      ] },

    { title: B('الحفاظ على C2 وتطويره', 'Keeping and growing C2'),
      goal: B('نظام مدى الحياة مش امتحان واحد.', 'A lifelong system, not a single exam.'),
      learn: [
        L(B('نظامك الغذائي اللغوي', 'Your input diet'),
          B('اللغة بتضعف من غير استخدام. **input diet** = خليط ثابت من اللي بتسمعه وتقراه: بودكاست تقني، كتاب، أخبار، فيديوهات مؤتمرات. **immersion** = تحيط نفسك بالإنجليزي (لغة الموبايل، الملاحظات، التفكير). 30–45 دقيقة يوميًا كفاية للحفاظ.', 'A language weakens without use. An **input diet** = a steady mix of what you listen to and read: tech podcasts, a book, news, conference videos. **immersion** = surrounding yourself with English (phone language, notes, thinking). 30–45 minutes a day is enough to maintain it.'),
          'weekly input diet\ndaily    20 min podcast on the commute · 15 min tech blog\n3×/week  one conference talk (GOTO, TED)\nweekly   one long article + one book chapter\nmonthly  one novel or non-fiction book in English'),
        L(B('المراجعة المتباعدة', 'Spaced repetition'),
          B('**spaced repetition** = تراجع الكلمة على فترات بتكبر (يوم، 3، أسبوع، شهر) — أحسن طريقة علميًا للحفظ طويل المدى (Anki مثلًا). حط فيها كلمات الرحلة اللي لسه مش طبيعية في كلامك، وجمل الـ phrase bank، والـ error log.', '**spaced repetition** = reviewing a word at growing intervals (a day, 3 days, a week, a month) — the most effective method for long-term memory (e.g. Anki). Put in the journey words that are not yet natural in your speech, your phrase-bank sentences and your error log.'),
          'card front: "the price of doing nothing" (2 words)\ncard back:  cost of inaction — "The cost of inaction is two new hires by June."\nintervals:  1d → 3d → 7d → 21d → 2 months'),
        L(B('خطة السنة والمساءلة', 'The year plan and accountability'),
          B('اكتب **learning plan** للسنة الجاية بأهداف قابلة للقياس (محاضرة دولية، 12 مقال، شهادة لو محتاجها). **accountability partner** = حد بتتابعوا بعض كل أسبوعين. و**language exchange**: تعلّم حد عربي ويعلّمك إنجليزي. والأهم: **teach to learn** — لما تشرح لغيرك بتثبت أكتر. انت دلوقتي **lifelong learner**.', 'Write a **learning plan** for next year with measurable goals (an international talk, 12 articles, a certificate if you need one). An **accountability partner** = someone you check in with every two weeks. And a **language exchange**: teach someone Arabic while they help you with English. Most importantly: **teach to learn** — explaining to others deepens your own knowledge. You are now a **lifelong learner**.'),
          'learning plan 2027\nQ1  give a talk at an online meetup · 3 articles\nQ2  mock C2 exam: target 8.5 · contribute 2 PRs\nQ3  speak at a regional conference · start a newsletter\nQ4  mentor 2 Arabic speakers learning tech English\ncheck-in: every other Sunday with my accountability partner')
      ],
      practice: [
        B('اكتب input diet أسبوعي.', 'Write a weekly input diet.'),
        B('اعمل 50 بطاقة spaced repetition من الرحلة.', 'Make 50 spaced-repetition cards from the journey.'),
        B('اكتب learning plan للسنة الجاية.', 'Write a learning plan for next year.'),
        B('دوّر على accountability partner أو language exchange.', 'Find an accountability partner or a language exchange.')
      ],
      words: [
        W('input diet', 'نظامك من الاستماع والقراءة', 'your regular listening and reading mix', 'A rich input diet keeps C2 alive.'),
        W('immersion', 'الانغماس في اللغة', 'surrounding yourself with a language', 'Immersion doesn’t require travel.'),
        W('spaced repetition', 'المراجعة المتباعدة', 'reviewing at growing intervals', 'Spaced repetition beats cramming.'),
        W('learning plan', 'خطة تعلّم', 'a plan for what to learn and when', 'My learning plan has four quarterly goals.'),
        W('accountability partner', 'شريك متابعة', 'someone who checks your progress', 'My accountability partner keeps me honest.'),
        W('language exchange', 'تبادل لغوي', 'helping each other learn languages', 'I teach Arabic in a language exchange.'),
        W('teach to learn', 'تعلّم بالتعليم', 'learning deeply by teaching others', 'Teach to learn: run a free workshop.'),
        W('lifelong learner', 'متعلم مدى الحياة', 'someone who keeps learning always', 'Every expert is a lifelong learner.')
      ],
      read: [{ lib: '6 Minute English (BBC)', what: B('خليها جزء ثابت من الـ input diet.', 'Make it a fixed part of your input diet.') }],
      challenge: B('اكتب «نظام C2 مدى الحياة» بالإنجليزي: input diet أسبوعي، 100 بطاقة spaced repetition، learning plan بأهداف ربع سنوية، accountability partner متفق معاه — واعمل أول جلسة شرح مجانية لحد بيتعلم (teach to learn).', 'Write your English «lifelong C2 system»: a weekly input diet, 100 spaced-repetition cards, a learning plan with quarterly goals, an agreed accountability partner — and run your first free explanation session for a learner (teach to learn).'),
      quiz: [
        Q(B('spaced repetition:', 'Spaced repetition:'), ['reviewing at growing intervals', 'reviewing everything daily forever', 'reading fast'], 0, B('فترات.', 'Intervals.')),
        Q(B('للحفاظ على المستوى:', 'To maintain your level:'), ['30–45 minutes of English daily', 'one exam and stop', 'nothing'], 0, B('استمرار.', 'Consistency.')),
        Q(B('teach to learn:', 'Teach to learn:'), ['explaining to others deepens your knowledge', 'teachers don’t learn', 'only teachers learn'], 0, B('تعليم.', 'Teaching.'))
      ] },

    { title: B('مراجعة الرحلة واختبار التخرج', 'Journey review and graduation test'),
      goal: B('من «Hello sir, I want to ask» لإنجليزي C2 محترف.', 'From «Hello sir, I want to ask» to professional C2 English.'),
      review: [
        B('الأساس والقواعد والنطق والكتابة اليومية (شهور 1–3).', 'Foundations, grammar, pronunciation and everyday writing (months 1–3).'),
        B('الاجتماعات والمقابلات والتوثيق والقراءة التقنية (شهور 4–6).', 'Meetings, interviews, documentation and technical reading (months 4–6).'),
        B('المواصفات والملخصات والتصميم والقيادة والمحاضرات (شهور 7–9).', 'Specifications, summaries, design, leadership and talks (months 7–9).'),
        B('إنجليزي الفري لانسرز: البيع والعقود والفلوس والدعم (شهر 10).', 'Freelancer English: sales, contracts, money and support (month 10).'),
        B('الدقة والنبرة والإدارة العليا والمقابلات والحضور العام (شهور 11–12).', 'Precision, tone, senior management, interviews and public presence (months 11–12).')
      ],
      project: B('مشروع التخرج النهائي: (1) mock test كامل وجدول self-assessment، (2) error log بخطة علاج ونتيجتها، (3) writing portfolio منشور بـ 8 مستندات وstyle sheet ومقارنة قبل وبعد، (4) أداء شفهي متسجّل (عرض + أسئلة + impromptu + 3 تمثيليات)، (5) نظام C2 مدى الحياة وlearning plan للسنة الجاية، و(6) جلسة شرح لحد بيتعلم. وفي الآخر: رسالة بالإنجليزي لنفسك في أول يوم من الرحلة.', 'The final capstone: (1) a full mock test and a self-assessment table, (2) an error log with a treatment plan and its result, (3) a published writing portfolio of 8 documents with a style sheet and a before-and-after comparison, (4) a recorded spoken performance (presentation + questions + impromptu + 3 role-plays), (5) a lifelong C2 system and a learning plan for next year, and (6) a session teaching a learner. And finally: a letter in English to yourself on day one of the journey.'),
      test: [
        Q(B('أول سطر في إيميل لمدير تنفيذي:', 'The first line of an email to an executive:'), ['the recommendation and the ask', 'a long background', 'Hope you are well, I am writing to…'], 0, B('BLUF.', 'BLUF.')),
        Q(B('الصح:', 'Correct:'), ['We discussed the scope.', 'We discussed about the scope.', 'We discussed on the scope.'], 0, B('غلط متجذر.', 'A fossilised error.')),
        Q(B('اعتذار حقيقي:', 'A sincere apology:'), ['I’m sorry — I didn’t test it; I’ve fixed it and added a check.', 'Sorry if you feel that way.', 'Mistakes happen.'], 0, B('مسؤولية.', 'Ownership.')),
        Q(B('«may» في عقد:', '«may» in a contract:'), ['a right, not an obligation', 'an obligation', 'a prohibition'], 0, B('حق.', 'A right.')),
        Q(B('تخمين ملطّف:', 'A hedged guess:'), ['It appears that the token expired.', 'The token 100% expired.', 'Token. Expired. Done.'], 0, B('دقة.', 'Precision.')),
        Q(B('inversion رسمية:', 'Formal inversion:'), ['Under no circumstances should keys be shared.', 'Under no circumstances keys should be shared.', 'Keys never share.'], 0, B('قلب.', 'Inversion.')),
        Q(B('لجمهور دولي:', 'For an international audience:'), ['plain English over idioms', 'as many idioms as possible', 'only slang'], 0, B('وضوح.', 'Clarity.')),
        Q(B('system design أول خطوة:', 'The first step in system design:'), ['scope the problem and gather requirements', 'draw the database', 'pick a cloud'], 0, B('تحديد.', 'Scoping.')),
        Q(B('PR description:', 'A PR description:'), ['what, why, the issue, how it was tested', 'just «fix»', 'an apology'], 0, B('كامل.', 'Complete.')),
        Q(B('C2:', 'C2:'), ['precise, fluent and nuanced English', 'a perfect native accent', 'knowing every word'], 0, B('تمكّن.', 'Proficiency.')),
        Q(B('intelligibility:', 'Intelligibility:'), ['being easily understood', 'intelligence tests', 'a strong accent'], 0, B('فهم.', 'Being understood.')),
        Q(B('بعد الرحلة:', 'After the journey:'), ['a lifelong system: input, review, teaching', 'stop using English', 'one exam and done'], 0, B('مدى الحياة.', 'Lifelong.'))
      ] }
  ]
};
