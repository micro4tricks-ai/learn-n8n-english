// Sections of js.html: the 48-week journey, the term bank, the cheat sheets, the automation projects, the common
// errors and the library. Section types: journey/pyterms/pylibrary (assets/js/code-app.js, with track 'js'),
// sheets/lessons/cards (assets/js/sections.js). Sheets, projects and errors live in content/sections/js-ref.js.
SECTIONS.add({
  page: 'js', id: 'journey', order: 1, type: 'journey', track: 'js', open: true,
  title: { ar: 'رحلة الـ 12 شهر', en: 'The 12-month journey' }, nav: { ar: 'رحلة 12 شهر', en: '12-month journey' },
  intro: {
    ar: 'رحلة من الصفر لمستوى الخبير في **جافاسكريبت والويب للأتمتة**: اللغة نفسها، وHTML وCSS والـ DOM، وNode.js، وTypeScript، وأتمتة المتصفح وGoogle وn8n، والذكاء الاصطناعي وMCP، والنشر. **أول 3 شهور مكثّفة: 3 ساعات في اليوم**، وبعدها ساعتين في اليوم من المتوسط للمحترف للخبير.\n\nكل يوم على نفس الترتيب: **افهم** الشرح وأمثلته (وشغّل الأمثلة اللي جنبها ▶ جوه الصفحة نفسها)، و**ابني** بإيدك على جهازك، و**احفظ** مصطلحات اليوم بالإنجليزي، و**اقرا** من المصادر الرسمية، وخلّص **باختبار قصير**. اليوم اللي بعده بيفتح لما تخلّص مهامك وتجاوب 60% صح، واليوم السادس مراجعة ومشروع واختبار أسبوعي تعدّيه بـ 70%.\n\nالرحلة متخطّطة على أشهر كتب HTML وCSS وجافاسكريبت وn8n، لكن كل شرح ومثال هنا مكتوب من الأول، وكل مصدر بنوديك له مجاني ورسمي. تقدمك بيتحفظ في المتصفح، وأونلاين لو عندك حساب.',
    en: 'A journey from zero to expert in **JavaScript and the web for automation**: the language itself, HTML, CSS and the DOM, Node.js, TypeScript, automating the browser, Google and n8n, AI and MCP, and deployment. **The first 3 months are intensive: 3 hours a day**, then 2 hours a day from intermediate to professional to expert.\n\nEvery day follows the same order: **understand** the explanation and its examples (run the ones marked ▶ right on the page), **build** it yourself on your computer, **learn** the day’s English terms, **read** from the official sources, and finish with a **short quiz**. The next day opens when your tasks are done and 60% of the answers are right; day 6 is a review, a project and a weekly test you pass at 70%.\n\nThe journey is planned around the well-known HTML, CSS, JavaScript and n8n books, but every explanation and example here is written from scratch, and every source we send you to is free and official. Your progress is saved in the browser, and online when you have an account.'
  },
  rhythm: [{ ar: '⏱ الشهور 1–3: 3 ساعات في اليوم', en: '⏱ Months 1–3: 3 hours a day' }, { ar: '⏱ الشهور 4–12: ساعتين في اليوم', en: '⏱ Months 4–12: 2 hours a day' },
    { ar: '🧭 مبتدئ ← متوسط ← محترف ← خبير', en: '🧭 Beginner → intermediate → professional → expert' }, { ar: '📝 اختبار كل أسبوع وامتحان كل شهر', en: '📝 A test every week, an exam every month' }]
});

SECTIONS.add({
  page: 'js', id: 'terms', order: 2, type: 'pyterms', track: 'js', placeholder: 'closure, promise, selector, flexbox…',
  reviewNote: { ar: 'كل المصطلحات دي بتدخل مراجعتك اليومية في [صفحة المراجعة](review.html) (فعّل «مصطلحات جافاسكريبت»).', en: 'All of these terms join your daily review on [the review page](review.html) (turn on «JavaScript terms»).' },
  title: { ar: 'بنك المصطلحات', en: 'The term bank' }, nav: { ar: 'المصطلحات', en: 'Terms' },
  desc: { ar: 'كل مصطلح إنجليزي اتعلّمته في الرحلة بمعناه ومثال، ومقسّمين بالشهور. دوس على رقم الأسبوع ترجع لدرسه.', en: 'Every English term from the journey with its meaning and an example, grouped by month. Click the week number to go back to its lesson.' }
});

SECTIONS.add({
  page: 'js', id: 'library', order: 6, type: 'pylibrary', data: 'JS_DATA', doneKey: 'jslib', libPlaceholder: 'fetch, flexbox, Playwright…',
  title: { ar: 'المكتبة', en: 'The library' }, nav: { ar: 'المكتبة', en: 'Library' },
  desc: {
    ar: 'مصادر مجانية بس: توثيق MDN وNode.js وTypeScript الرسمي، وكتب أصحابها نشروها مجانًا (زي The Modern JavaScript Tutorial وEloquent JavaScript)، وكورسات وألعاب وتمارين وأدوات، بالعربي والإنجليزي. كل مصدر بيقولك تقرا منه إيه بالظبط، وعلّم على اللي خلّصته.',
    en: 'Free sources only: the official MDN, Node.js and TypeScript docs, books their authors publish for free (such as The Modern JavaScript Tutorial and Eloquent JavaScript), courses, games, exercises and tools, in Arabic and English. Each one says exactly what to read; tick what you finish.'
  }
});
