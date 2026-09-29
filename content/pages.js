// Every page of the site, in menu order. The top menu, the footer links, the home page cards and the
// search all read this list, so a new page is one entry here plus its HTML file (npm run new:page <id>).
//   nav: 'main' shows in the top bar, 'more' goes under the «More» menu.
//   scripts: page scripts from assets/js loaded after content/sections/<id>.js (their own section types).
window.SITE_PAGES = [
  { id: 'index', href: 'index.html', nav: 'main', icon: '🏠', title: { ar: 'الرئيسية', en: 'Home' } },
  { id: 'n8n', href: 'n8n.html', nav: 'main', icon: '⚙️', title: { ar: 'n8n', en: 'n8n' },
    desc: { ar: 'رحلة 24 أسبوع في الأتمتة واللغات اللي معاها.', en: 'A 24-week journey in automation and the languages around it.' } },
  { id: 'english', href: 'english.html', nav: 'main', icon: '🔤', title: { ar: 'الإنجليزي', en: 'English' },
    desc: { ar: 'رحلة 24 أسبوع في الإنجليزي اللي المبرمج بيحتاجه.', en: 'A 24-week journey in the English a developer needs.' } },
  { id: 'review', href: 'review.html', nav: 'more', icon: '🔁', scripts: ['vendor/ts-fsrs.umd.js', 'review.js'], title: { ar: 'مراجعتي', en: 'My review' },
    desc: { ar: 'مراجعة متباعدة بخوارزمية FSRS، ودفتر أخطائك، وإحصائياتك، ونسخة احتياطية من تقدّمك.', en: 'Spaced review with FSRS, your mistakes notebook, your stats, and a backup of your progress.' } },
  { id: 'lab', href: 'lab.html', nav: 'more', icon: '🧪', scripts: ['lab-expr.js', 'lab.js'], title: { ar: 'المعمل', en: 'Lab' },
    desc: { ar: 'اكتب وشغّل JavaScript وExpressions وPython وSQL في المتصفح، واعرض أي Workflow كرسمة وافحصه.', en: 'Write and run JavaScript, expressions, Python and SQL in the browser, and view and check any workflow as a diagram.' } },
  { id: 'speak', href: 'speak.html', nav: 'more', icon: '🎙️', scripts: ['speak.js'], title: { ar: 'تدريب الكلام', en: 'Speaking practice' },
    desc: { ar: 'نطق بتقييم، وShadowing، وإملاء، ومواقف شغل حقيقية بالإنجليزي.', en: 'Scored pronunciation, shadowing, dictation and real work situations in English.' } },
  { id: 'prompts', href: 'prompts.html', nav: 'more', icon: '🤖', scripts: ['prompts.js'], title: { ar: 'البرومبتات', en: 'Prompts' },
    desc: { ar: 'مكتبة برومبتات فيها متغيرات تملاها وتنسخ، وكورس قصير في كتابة البرومبت، وبرومبتاتك الخاصة.', en: 'A prompt library with fill-in variables, a short prompt-writing course, and your own prompts.' } },
  { id: 'sheets', href: 'sheets.html', nav: 'more', icon: '📄', title: { ar: 'الملخصات', en: 'Cheat sheets' },
    desc: { ar: 'ورق ملخصات جاهز للطباعة: Expressions وأشهر النودات وJavaScript وSQL وDocker والجرامر.', en: 'Print-ready cheat sheets: expressions, the main nodes, JavaScript, SQL, Docker and grammar.' } }
];
