// Every page of the site, in menu order. The top menu, the footer links, the home page cards and the
// search all read this list, so a new page is one entry here plus its HTML file (npm run new:page <id>).
//   nav: 'main' shows in the top bar, 'more' goes under the «More» menu.
//   scripts: page scripts from assets/js loaded after content/sections/<id>.js (their own section types).
window.SITE_PAGES = [
  { id: 'index', href: 'index.html', nav: 'main', icon: '🏠', title: { ar: 'الرئيسية', en: 'Home' } },
  { id: 'n8n', href: 'n8n.html', nav: 'main', icon: '⚙️', title: { ar: 'n8n', en: 'n8n' },
    desc: { ar: 'رحلة 12 شهر في الأتمتة واللغات اللي معاها، من مبتدئ لخبير.', en: 'A 12-month journey in automation and the languages around it, from beginner to expert.' } },
  { id: 'english', href: 'english.html', nav: 'main', icon: '🔤', title: { ar: 'الإنجليزي', en: 'English' },
    desc: { ar: 'رحلة 12 شهر في الإنجليزي اللي المبرمج بيحتاجه، من A1 لـ C2.', en: 'A 12-month journey in the English a developer needs, from A1 to C2.' } },
  { id: 'python', href: 'python.html', nav: 'main', icon: '🐍', tag: '--12-months --automation --web',
    scripts: ['content/sections/python-ref.js', 'content/library/python.js', 'journey.js', 'content/python/outline.js', 'content/python/terms.js', 'sandbox.js', 'pyrun.js', 'code-app.js'],
    title: { ar: 'بايثون', en: 'Python' }, h1: { ar: 'رحلة بايثون للأتمتة والويب', en: 'The Python journey: automation and the web' },
    desc: { ar: 'رحلة 12 شهر من الصفر للخبير: Python والأتمتة والملفات وExcel والـ APIs وHTML وCSS وJavaScript والـ scraping وpandas وSQL وFastAPI والذكاء الاصطناعي، وكود بتشغّله جوه الصفحة.', en: 'A 12-month journey from zero to expert: Python, automation, files, Excel, APIs, HTML, CSS, JavaScript, scraping, pandas, SQL, FastAPI and AI, with code you run right on the page.' } },
  { id: 'js', href: 'js.html', nav: 'main', icon: '🟨', tag: '--12-months --javascript --web --automation',
    scripts: ['content/sections/js-ref.js', 'content/library/js.js', 'journey.js', 'content/js/outline.js', 'content/js/terms.js', 'sandbox.js', 'pyrun.js', 'code-app.js'],
    title: { ar: 'جافاسكريبت', en: 'JavaScript' }, h1: { ar: 'رحلة جافاسكريبت والويب للأتمتة', en: 'The JavaScript journey: the web and automation' },
    desc: { ar: 'رحلة 12 شهر من الصفر للخبير: جافاسكريبت وHTML وCSS والـ DOM وNode.js وTypeScript وأتمتة المتصفح وGoogle وn8n والذكاء الاصطناعي وMCP، أول 3 شهور مكثّفة 3 ساعات في اليوم، وأمثلة بتشغّلها جوه الصفحة.', en: 'A 12-month journey from zero to expert: JavaScript, HTML, CSS, the DOM, Node.js, TypeScript, automating the browser, Google and n8n, AI and MCP — the first 3 months intensive at 3 hours a day, with examples you run right on the page.' } },
  { id: 'review', href: 'review.html', nav: 'more', icon: '🔁', scripts: ['vendor/ts-fsrs.umd.js', 'review.js'], title: { ar: 'مراجعتي', en: 'My review' },
    desc: { ar: 'مراجعة متباعدة بخوارزمية FSRS، ودفتر أخطائك، وإحصائياتك، ونسخة احتياطية من تقدّمك.', en: 'Spaced review with FSRS, your mistakes notebook, your stats, and a backup of your progress.' } },
  { id: 'lab', href: 'lab.html', nav: 'more', icon: '🧪', scripts: ['lab-expr.js', 'sandbox.js', 'pyrun.js', 'lab.js'], title: { ar: 'المعمل', en: 'Lab' },
    desc: { ar: 'اكتب وشغّل JavaScript وExpressions وPython وSQL في المتصفح، واعرض أي Workflow كرسمة وافحصه.', en: 'Write and run JavaScript, expressions, Python and SQL in the browser, and view and check any workflow as a diagram.' } },
  { id: 'speak', href: 'speak.html', nav: 'more', icon: '🎙️', scripts: ['speak.js'], title: { ar: 'تدريب الكلام', en: 'Speaking practice' },
    desc: { ar: 'نطق بتقييم، وShadowing، وإملاء، ومواقف شغل حقيقية بالإنجليزي.', en: 'Scored pronunciation, shadowing, dictation and real work situations in English.' } },
  { id: 'prompts', href: 'prompts.html', nav: 'more', icon: '🤖', scripts: ['content/sections/prompts-code.js', 'content/sections/prompts-automation.js', 'content/sections/prompts-english.js', 'content/sections/prompts-business.js', 'content/sections/prompts-data.js', 'content/sections/prompts-course.js', 'prompts.js'], title: { ar: 'البرومبتات', en: 'Prompts' },
    desc: { ar: 'مكتبة فيها 187 برومبت في 15 مجال (برمجة، ويب، أمان، n8n، أتمتة، وكلاء AI، إنجليزي، كتابة، عمل حر، دعم ومحتوى، بيانات، تفكير، مذاكرة، ومسار مهني) بمتغيرات تملاها وتنسخ، وكورس من 20 درس من الأساسيات للوكلاء والاختبار والحماية، وبرومبتاتك الخاصة.', en: 'A library of 187 prompts in 15 areas (coding, web, security, n8n, automation, AI agents, English, writing, freelancing, support and content, data, thinking, studying and career) with fill-in variables, a 20-lesson course from the basics to agents, evaluation and safety, and your own prompts.' } },
  { id: 'sheets', href: 'sheets.html', nav: 'more', icon: '📄', title: { ar: 'الملخصات', en: 'Cheat sheets' },
    desc: { ar: 'ورق ملخصات جاهز للطباعة: Expressions وأشهر النودات وJavaScript وSQL وDocker والجرامر.', en: 'Print-ready cheat sheets: expressions, the main nodes, JavaScript, SQL, Docker and grammar.' } }
];
