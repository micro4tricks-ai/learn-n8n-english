// Sections of python.html: the 24-week journey, the term bank, the cheat sheets, the automation projects,
// the common errors and the library. Section types: journey/pyterms/pylibrary (assets/js/python-app.js),
// sheets/lessons/cards (assets/js/sections.js). Sheets, projects and errors live in content/sections/python-ref.js.
SECTIONS.add({
  page: 'python', id: 'journey', order: 1, type: 'journey', open: true,
  title: { ar: 'رحلة الـ 24 أسبوع', en: 'The 24-week journey' }, nav: { ar: 'رحلة 24 أسبوع', en: '24-week journey' },
  intro: {
    ar: 'كل يوم على نفس الترتيب: **افهم** الشرح وأمثلته (وشغّل الأمثلة اللي جنبها ▶ جوه الصفحة نفسها)، و**ابني** بإيدك على جهازك، و**احفظ** مصطلحات اليوم، و**اقرا** من المصادر الرسمية، وفي الآخر **اختبار قصير**. اليوم اللي بعده بيفتح لما تخلّص مهامك وتجاوب صح على 60%، واليوم السادس مراجعة ومشروع واختبار أسبوعي لازم تعدّي فيه بـ 70%.\n\nالرحلة مكتوبة على أساس كتب Python والويب المعروفة (أتمتة الشغل اليومي، والـ APIs، والبيانات، والـ DevOps، والذكاء الاصطناعي)، بس كل الشرح والأمثلة مكتوبة من جديد هنا، والمصادر اللي بنحيلك ليها كلها مجانية ورسمية. تقدّمك بيتحفظ في المتصفح، ولو عملت حساب بيتحفظ أونلاين.',
    en: 'Every day follows the same order: **understand** the explanation and its examples (run the ones marked ▶ right on the page), **build** it yourself on your computer, **learn** the day’s terms, **read** from the official sources, and finish with a **short quiz**. The next day opens when your tasks are done and 60% of the answers are right; day 6 is a review, a project and a weekly test you pass at 70%.\n\nThe journey is planned around the well-known Python and web books (automating daily work, APIs, data, DevOps and AI), but every explanation and example here is written from scratch, and every source we send you to is free and official. Your progress is saved in the browser, and online when you have an account.'
  },
  rhythm: [{ ar: '⏱ 30 دقيقة: افهم', en: '⏱ 30 min: understand' }, { ar: '⏱ 50 دقيقة: ابني', en: '⏱ 50 min: build' }, { ar: '⏱ 15 دقيقة: مصطلحات', en: '⏱ 15 min: terms' },
    { ar: '⏱ 15 دقيقة: اقرا', en: '⏱ 15 min: read' }, { ar: '⏱ 10 دقايق: الاختبار', en: '⏱ 10 min: quiz' }]
});

SECTIONS.add({
  page: 'python', id: 'terms', order: 2, type: 'pyterms',
  title: { ar: 'بنك المصطلحات', en: 'The term bank' }, nav: { ar: 'المصطلحات', en: 'Terms' },
  desc: { ar: 'كل مصطلح اتعلّمته في الرحلة بمعناه ومثال، ومقسّمين بالشهور. دوس على رقم الأسبوع ترجع لدرسه.', en: 'Every term from the journey with its meaning and an example, grouped by month. Click the week number to go back to its lesson.' }
});

SECTIONS.add({
  page: 'python', id: 'library', order: 6, type: 'pylibrary',
  title: { ar: 'المكتبة', en: 'The library' }, nav: { ar: 'المكتبة', en: 'Library' },
  desc: {
    ar: 'مصادر مجانية بس: توثيق Python الرسمي، وكتب أصحابها نشروها مجانًا على مواقعهم (زي Automate the Boring Stuff وThink Python وEloquent JavaScript)، وكورسات وتمارين وأدوات، بالعربي والإنجليزي. جنب كل مصدر مكتوب تقرا منه إيه بالظبط. علّم على اللي خلّصته.',
    en: 'Free sources only: the official Python docs, books their authors publish for free on their sites (such as Automate the Boring Stuff, Think Python and Eloquent JavaScript), courses, exercises and tools, in Arabic and English. Each one says exactly what to read. Tick what you finish.'
  }
});
