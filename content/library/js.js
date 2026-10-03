// The JavaScript page library: free official docs, free books their authors publish online, free courses and practice.
// Row: [category, title, url, type, level (b/i/a), whyAr, whyEn, readAr, readEn, lang ('ar' when Arabic)]
// Weeks point at an entry with read: ['lib:<title>'] (see tools/build_weeks.js).
(function(){
  var TYPE = {
    doc: { ar: 'توثيق رسمي', en: 'Official docs' }, course: { ar: 'كورس مجاني', en: 'Free course' },
    book: { ar: 'كتاب مجاني أونلاين', en: 'Free online book' }, video: { ar: 'فيديوهات', en: 'Videos' },
    tool: { ar: 'أداة', en: 'Tool' }, guide: { ar: 'دليل مجاني', en: 'Free guide' },
    practice: { ar: 'تمارين مجانية', en: 'Free exercises' }, article: { ar: 'مقالات', en: 'Articles' }, api: { ar: 'API للتجربة', en: 'Practice API' }
  };
  var CAT = {
    start: { ar: 'البداية', en: 'Getting started' }, core: { ar: 'اللغة نفسها', en: 'The language' },
    html: { ar: 'HTML', en: 'HTML' }, css: { ar: 'CSS', en: 'CSS' }, dom: { ar: 'الـ DOM والمتصفح', en: 'The DOM and the browser' },
    async: { ar: 'الكود غير المتزامن والـ APIs', en: 'Async code and APIs' }, node: { ar: 'Node.js', en: 'Node.js' },
    ts: { ar: 'TypeScript', en: 'TypeScript' }, auto: { ar: 'الأتمتة', en: 'Automation' }, quality: { ar: 'الاختبار والجودة', en: 'Testing and quality' },
    ui: { ar: 'الواجهات وReact', en: 'UI and React' }, data: { ar: 'البيانات وقواعد البيانات', en: 'Data and databases' },
    sec: { ar: 'الأمان', en: 'Security' }, ai: { ar: 'الذكاء الاصطناعي', en: 'AI' }, deploy: { ar: 'النشر والتشغيل', en: 'Deployment and operations' },
    practice: { ar: 'تمرين', en: 'Practice' }, ar: { ar: 'بالعربي', en: 'In Arabic' }
  };
  var MDN = 'https://developer.mozilla.org/en-US/docs/';
  var NODE = 'https://nodejs.org/api/';
  var rows = [
    // ---- getting started ----
    ['start', 'The Modern JavaScript Tutorial', 'https://javascript.info/', 'book', 'b', 'أوضح كتاب مجاني لجافاسكريبت من الصفر للمتقدم، بتمارين بحلولها.', 'The clearest free JavaScript book from zero to advanced, with solved exercises.', 'Part 1 بالترتيب، فصل كل يوم.', 'Part 1 in order, a chapter a day.'],
    ['start', 'Eloquent JavaScript, 4th edition', 'https://eloquentjavascript.net/', 'book', 'b', 'كتاب كلاسيكي مجاني بيعلّمك تفكّر كمبرمج بجافاسكريبت، ومعاه محرر بيشغّل الأمثلة.', 'A classic free book that teaches you to think like a programmer in JavaScript, with an editor that runs the examples.', 'الفصول 1–6 في أول شهرين.', 'Chapters 1–6 in the first two months.'],
    ['start', 'MDN: JavaScript Guide', MDN + 'Web/JavaScript/Guide', 'doc', 'b', 'الدليل الرسمي لموزيلا: كل جزء من اللغة بأمثلة قصيرة.', 'Mozilla’s official guide: every part of the language with short examples.', 'Grammar and types لحد Functions.', 'Grammar and types up to Functions.'],
    ['start', 'MDN: Learn web development', MDN + 'Learn_web_development', 'course', 'b', 'منهج موزيلا المجاني للويب: HTML وCSS وJavaScript بمشاريع.', 'Mozilla’s free web curriculum: HTML, CSS and JavaScript with projects.', 'Core modules بالترتيب.', 'The core modules in order.'],
    ['start', 'You Don’t Know JS Yet (2nd edition)', 'https://github.com/getify/You-Dont-Know-JS', 'book', 'i', 'سلسلة مجانية بتشرح ليه جافاسكريبت بتشتغل كده: النطاق والـ closures والكائنات.', 'A free series on why JavaScript works the way it does: scope, closures and objects.', 'Get Started ثم Scope & Closures.', 'Get Started, then Scope & Closures.'],
    ['start', 'freeCodeCamp: JavaScript Algorithms and Data Structures', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/', 'course', 'b', 'منهج مجاني بمشاريع بتتصحح لوحدها في المتصفح.', 'A free curriculum with projects that are checked in the browser.', 'الأقسام الأولى مع الشهر الأول.', 'The first sections during month 1.'],
    ['start', 'The Odin Project: Full Stack JavaScript', 'https://www.theodinproject.com/paths/full-stack-javascript', 'course', 'b', 'مسار مجاني كامل بمشاريع حقيقية من HTML لحد Node.', 'A complete free path with real projects, from HTML to Node.', 'Foundations ثم JavaScript.', 'Foundations, then JavaScript.'],
    ['start', 'CS50’s Web Programming with Python and JavaScript', 'https://cs50.harvard.edu/web/', 'course', 'i', 'كورس هارفارد المجاني للويب: HTML وCSS وJavaScript وAPIs.', 'Harvard’s free web course: HTML, CSS, JavaScript and APIs.', 'محاضرة JavaScript والـ User Interfaces.', 'The JavaScript and User Interfaces lectures.'],
    ['start', 'Visual Studio Code docs', 'https://code.visualstudio.com/docs', 'doc', 'b', 'المحرر اللي هتكتب فيه: الاختصارات والـ debugging والـ extensions.', 'The editor you will write in: shortcuts, debugging and extensions.', 'Getting Started وJavaScript in VS Code.', 'Getting Started and JavaScript in VS Code.'],
    ['start', 'Chrome DevTools docs', 'https://developer.chrome.com/docs/devtools', 'doc', 'b', 'أدوات المطوّر: Console وSources وNetwork وElements.', 'The developer tools: Console, Sources, Network and Elements.', 'Console overview وDebug JavaScript.', 'Console overview and Debug JavaScript.'],
    // ---- the language ----
    ['core', 'MDN: JavaScript Reference', MDN + 'Web/JavaScript/Reference', 'doc', 'i', 'المرجع الكامل لكل دالة وكائن مدمج في اللغة.', 'The full reference for every built-in function and object.', 'Array وString وObject وMath وDate.', 'Array, String, Object, Math and Date.'],
    ['core', 'MDN: Array', MDN + 'Web/JavaScript/Reference/Global_Objects/Array', 'doc', 'b', 'كل methods المصفوفات: map وfilter وreduce وfind وsort وغيرهم.', 'Every array method: map, filter, reduce, find, sort and more.', 'اقرا 3 methods كل يوم مع أمثلتها.', 'Read 3 methods a day with their examples.'],
    ['core', 'MDN: String', MDN + 'Web/JavaScript/Reference/Global_Objects/String', 'doc', 'b', 'تقطيع وبحث وتنضيف النصوص.', 'Slicing, searching and cleaning text.', 'slice وsplit وreplaceAll وpadStart وtrim.', 'slice, split, replaceAll, padStart and trim.'],
    ['core', 'MDN: Working with objects', MDN + 'Web/JavaScript/Guide/Working_with_objects', 'doc', 'b', 'إزاي تبني الكائنات وتقرا وتغيّر خصايصها.', 'How to build objects and read and change their properties.', 'الصفحة كلها.', 'The whole page.'],
    ['core', 'MDN: Closures', MDN + 'Web/JavaScript/Guide/Closures', 'doc', 'i', 'أهم فكرة في دوال جافاسكريبت، بأمثلة عملية.', 'The key idea behind JavaScript functions, with practical examples.', 'الصفحة كلها مرتين.', 'The whole page, twice.'],
    ['core', 'MDN: Regular expressions', MDN + 'Web/JavaScript/Guide/Regular_expressions', 'doc', 'i', 'الـ Regex في جافاسكريبت: الأعلام والمجموعات والـ named groups.', 'Regex in JavaScript: flags, groups and named groups.', 'Writing a regular expression pattern.', 'Writing a regular expression pattern.'],
    ['core', 'MDN: Intl', MDN + 'Web/JavaScript/Reference/Global_Objects/Intl', 'doc', 'i', 'تنسيق الأرقام والعملات والتواريخ بالعربي والإنجليزي.', 'Formatting numbers, currencies and dates in Arabic and English.', 'NumberFormat وDateTimeFormat.', 'NumberFormat and DateTimeFormat.'],
    ['core', 'ECMAScript Language Specification', 'https://tc39.es/ecma262/', 'doc', 'a', 'المواصفة الرسمية للغة؛ ترجعلها لما تحتاج الإجابة الدقيقة.', 'The official specification of the language; for when you need the exact answer.', 'دوّر على أي عملية لما تختلف النتايج.', 'Look up any operation when results surprise you.'],
    ['core', 'TC39 proposals', 'https://github.com/tc39/proposals', 'doc', 'a', 'الميزات الجاية للغة وفي أنهي مرحلة.', 'The language features on the way and their stage.', 'Stage 3 والـ finished proposals.', 'Stage 3 and the finished proposals.'],
    // ---- HTML ----
    ['html', 'MDN: HTML basics', MDN + 'Learn_web_development/Getting_started/Your_first_website/Creating_the_content', 'doc', 'b', 'أول صفحة HTML خطوة بخطوة.', 'Your first HTML page, step by step.', 'الصفحة كلها.', 'The whole page.'],
    ['html', 'MDN: HTML elements reference', MDN + 'Web/HTML/Reference/Elements', 'doc', 'b', 'كل عنصر HTML ومعناه وإمتى تستخدمه.', 'Every HTML element, what it means and when to use it.', 'Content sectioning وText content.', 'Content sectioning and Text content.'],
    ['html', 'MDN: Web forms', MDN + 'Learn_web_development/Extensions/Forms', 'course', 'b', 'الفورمز: الحقول والتحقق وإرسال البيانات.', 'Forms: fields, validation and sending data.', 'Your first form وClient-side form validation.', 'Your first form and Client-side form validation.'],
    ['html', 'HTML Living Standard', 'https://html.spec.whatwg.org/multipage/', 'doc', 'a', 'المواصفة الرسمية لـ HTML.', 'The official HTML specification.', 'Forms لما تحتاج تفاصيل دقيقة.', 'Forms, when you need exact details.'],
    ['html', 'W3C Markup Validation Service', 'https://validator.w3.org/', 'tool', 'b', 'بيفحص صفحتك ويقولك الأخطاء.', 'Checks your page and lists its errors.', 'افحص كل صفحة تعملها.', 'Check every page you build.'],
    ['html', 'web.dev: Learn HTML', 'https://web.dev/learn/html', 'course', 'b', 'كورس جوجل المجاني لـ HTML الحديث.', 'Google’s free course on modern HTML.', 'Document structure لحد Forms.', 'Document structure through Forms.'],
    // ---- CSS ----
    ['css', 'MDN: CSS styling basics', MDN + 'Learn_web_development/Core/Styling_basics', 'course', 'b', 'أساسيات CSS: المحددات والـ cascade والـ box model.', 'CSS basics: selectors, the cascade and the box model.', 'بالترتيب في الأسبوع 10.', 'In order during week 10.'],
    ['css', 'MDN: CSS layout', MDN + 'Learn_web_development/Core/CSS_layout', 'course', 'b', 'Flexbox وGrid والتصميم المتجاوب.', 'Flexbox, Grid and responsive design.', 'Flexbox وGrids وResponsive design.', 'Flexbox, Grids and Responsive design.'],
    ['css', 'web.dev: Learn CSS', 'https://web.dev/learn/css', 'course', 'b', 'كورس جوجل المجاني لـ CSS من الصفر للمتقدم.', 'Google’s free CSS course from zero to advanced.', 'Box Model وSelectors وFlexbox وGrid.', 'Box Model, Selectors, Flexbox and Grid.'],
    ['css', 'CSS-Tricks: A Complete Guide to Flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 'guide', 'b', 'المرجع اللي كل الناس بترجعله في Flexbox.', 'The guide everyone goes back to for Flexbox.', 'الصفحة كلها مع الرسومات.', 'The whole page, with the drawings.'],
    ['css', 'CSS-Tricks: A Complete Guide to CSS Grid', 'https://css-tricks.com/snippets/css/complete-guide-grid/', 'guide', 'i', 'مرجع Grid بالرسومات.', 'The Grid guide, with drawings.', 'الصفحة كلها.', 'The whole page.'],
    ['css', 'Flexbox Froggy', 'https://flexboxfroggy.com/', 'practice', 'b', 'لعبة بتعلّمك Flexbox في 24 مرحلة.', 'A game that teaches Flexbox in 24 levels.', 'كل المراحل.', 'Every level.'],
    ['css', 'Grid Garden', 'https://cssgridgarden.com/', 'practice', 'b', 'لعبة بتعلّمك CSS Grid.', 'A game that teaches CSS Grid.', 'كل المراحل.', 'Every level.'],
    ['css', 'CSS Diner', 'https://flukeout.github.io/', 'practice', 'b', 'لعبة لمحددات CSS.', 'A game for CSS selectors.', 'كل المراحل.', 'Every level.'],
    ['css', 'Every Layout', 'https://every-layout.dev/', 'guide', 'a', 'أنماط تخطيط ذكية بتشتغل في كل المقاسات.', 'Smart layout patterns that work at every size.', 'المقالات المجانية في Rudiments.', 'The free articles in Rudiments.'],
    ['css', 'Can I use', 'https://caniuse.com/', 'tool', 'i', 'أنهي ميزة CSS أو JS شغالة في أنهي متصفح.', 'Which CSS or JS feature works in which browser.', 'دوّر على أي ميزة قبل ما تستخدمها.', 'Look up any feature before you use it.'],
    // ---- DOM and browser ----
    ['dom', 'MDN: Introduction to the DOM', MDN + 'Web/API/Document_Object_Model/Introduction', 'doc', 'b', 'إزاي جافاسكريبت بتشوف الصفحة وتغيّرها.', 'How JavaScript sees the page and changes it.', 'الصفحة كلها.', 'The whole page.'],
    ['dom', 'MDN: Introduction to events', MDN + 'Learn_web_development/Core/Scripting/Events', 'doc', 'b', 'الأحداث: click وinput وsubmit والـ bubbling.', 'Events: click, input, submit and bubbling.', 'الصفحة كلها.', 'The whole page.'],
    ['dom', 'javascript.info: Browser: Document, Events, Interfaces', 'https://javascript.info/ui', 'book', 'i', 'الجزء التاني من الكتاب: الـ DOM والأحداث والفورمز بالتفصيل.', 'The book’s second part: the DOM, events and forms in detail.', 'Document ثم Introduction to Events.', 'Document, then Introduction to Events.'],
    ['dom', 'MDN: Web Storage API', MDN + 'Web/API/Web_Storage_API', 'doc', 'b', 'localStorage وsessionStorage لحفظ بيانات صغيرة في المتصفح.', 'localStorage and sessionStorage for keeping small data in the browser.', 'Using the Web Storage API.', 'Using the Web Storage API.'],
    ['dom', 'MDN: Web APIs', MDN + 'Web/API', 'doc', 'i', 'كل اللي المتصفح بيقدّمه: Clipboard وNotifications وGeolocation وغيرهم.', 'Everything the browser offers: Clipboard, Notifications, Geolocation and more.', 'اقرا أي API محتاجه.', 'Read whichever API you need.'],
    ['dom', 'web.dev: Accessibility', 'https://web.dev/learn/accessibility', 'course', 'i', 'إزاي تعمل صفحات يقدر يستخدمها الكل.', 'How to build pages everyone can use.', 'Semantic HTML وKeyboard focus.', 'Semantic HTML and Keyboard focus.'],
    ['dom', 'WAI-ARIA Authoring Practices', 'https://www.w3.org/WAI/ARIA/apg/', 'guide', 'a', 'أنماط المكوّنات اللي بتشتغل بالكيبورد وقارئ الشاشة.', 'Component patterns that work with the keyboard and screen readers.', 'Patterns: Dialog وTabs وCombobox.', 'Patterns: Dialog, Tabs and Combobox.'],
    // ---- async and APIs ----
    ['async', 'MDN: Using promises', MDN + 'Web/JavaScript/Guide/Using_promises', 'doc', 'i', 'الـ Promises من الأول لحد الأخطاء والتسلسل.', 'Promises from the start through errors and chaining.', 'الصفحة كلها.', 'The whole page.'],
    ['async', 'MDN: async function', MDN + 'Web/JavaScript/Reference/Statements/async_function', 'doc', 'i', 'async وawait بأمثلة.', 'async and await, with examples.', 'Description والأمثلة.', 'Description and the examples.'],
    ['async', 'MDN: Using the Fetch API', MDN + 'Web/API/Fetch_API/Using_Fetch', 'doc', 'b', 'تجيب وتبعت بيانات لأي API.', 'Fetching and sending data to any API.', 'الصفحة كلها.', 'The whole page.'],
    ['async', 'javascript.info: Promises, async/await', 'https://javascript.info/async', 'book', 'i', 'فصل الكتاب عن الكود غير المتزامن، بتمارين.', 'The book’s chapter on async code, with exercises.', 'كل الفصول.', 'Every chapter.'],
    ['async', 'MDN: HTTP overview', MDN + 'Web/HTTP/Guides/Overview', 'doc', 'b', 'إزاي الطلبات والردود بتشتغل.', 'How requests and responses work.', 'الصفحة كلها.', 'The whole page.'],
    ['async', 'JSONPlaceholder', 'https://jsonplaceholder.typicode.com/', 'api', 'b', 'API وهمي مجاني للتجربة.', 'A free fake API for practice.', 'جرّب /users و/posts.', 'Try /users and /posts.'],
    ['async', 'DummyJSON', 'https://dummyjson.com/', 'api', 'b', 'API للتجربة فيه منتجات وطلبات وتسجيل دخول.', 'A practice API with products, carts and login.', 'Docs: Products وAuth.', 'Docs: Products and Auth.'],
    ['async', 'httpbin', 'https://httpbin.org/', 'api', 'b', 'بيرجّعلك الطلب اللي بعته: headers وbody.', 'Echoes the request you send: headers and body.', '/get و/post و/status.', '/get, /post and /status.'],
    ['async', 'Public APIs list', 'https://github.com/public-apis/public-apis', 'guide', 'b', 'قايمة كبيرة بـ APIs مجانية تجرّب عليها.', 'A big list of free APIs to practise on.', 'اختار 3 من غير auth.', 'Pick 3 with no auth.'],
    // ---- Node.js ----
    ['node', 'Node.js: Learn', 'https://nodejs.org/en/learn', 'course', 'b', 'الدروس الرسمية لـ Node.js.', 'The official Node.js lessons.', 'Getting Started بالترتيب.', 'Getting Started in order.'],
    ['node', 'Node.js API documentation', NODE, 'doc', 'i', 'كل موديولات Node: fs وpath وhttp وchild_process.', 'Every Node module: fs, path, http and child_process.', 'fs وpath وprocess.', 'fs, path and process.'],
    ['node', 'Node.js: File system', NODE + 'fs.html', 'doc', 'b', 'قراية وكتابة الملفات والمجلدات.', 'Reading and writing files and folders.', 'Promises API.', 'The Promises API.'],
    ['node', 'Node.js: Streams', NODE + 'stream.html', 'doc', 'a', 'معالجة ملفات كبيرة من غير ما تملا الذاكرة.', 'Processing big files without filling memory.', 'Stream ثم pipeline.', 'Stream, then pipeline.'],
    ['node', 'npm Docs', 'https://docs.npmjs.com/', 'doc', 'b', 'package.json والـ scripts وتثبيت الحزم.', 'package.json, scripts and installing packages.', 'Getting started وpackage.json.', 'Getting started and package.json.'],
    ['node', 'Express', 'https://expressjs.com/', 'doc', 'i', 'أشهر framework لعمل خوادم HTTP وwebhooks.', 'The best-known framework for HTTP servers and webhooks.', 'Getting started وRouting.', 'Getting started and Routing.'],
    ['node', 'Node.js best practices', 'https://github.com/goldbergyoni/nodebestpractices', 'guide', 'a', 'أكبر دليل مجاني لكتابة Node في الإنتاج.', 'The biggest free guide to Node in production.', 'Error handling وSecurity.', 'Error handling and Security.'],
    ['node', 'Commander.js', 'https://github.com/tj/commander.js', 'doc', 'i', 'تبني أدوات سطر أوامر بخيارات وأوامر فرعية.', 'Build command-line tools with options and subcommands.', 'README.', 'The README.'],
    // ---- TypeScript ----
    ['ts', 'TypeScript Handbook', 'https://www.typescriptlang.org/docs/handbook/intro.html', 'book', 'i', 'الدليل الرسمي لـ TypeScript.', 'The official TypeScript handbook.', 'The Basics لحد Generics.', 'The Basics through Generics.'],
    ['ts', 'TypeScript Playground', 'https://www.typescriptlang.org/play', 'tool', 'b', 'تكتب TypeScript وتشوف الأخطاء والناتج في المتصفح.', 'Write TypeScript and see errors and output in the browser.', 'جرّب كل مثال هناك.', 'Try every example there.'],
    ['ts', 'Total TypeScript: free tutorials', 'https://www.totaltypescript.com/tutorials', 'course', 'i', 'تمارين TypeScript مجانية تفاعلية.', 'Free interactive TypeScript exercises.', 'Beginner’s TypeScript.', 'Beginner’s TypeScript.'],
    ['ts', 'Type Challenges', 'https://github.com/type-challenges/type-challenges', 'practice', 'a', 'تحديات أنواع من السهل للصعب جدًا.', 'Type puzzles from easy to very hard.', 'Easy ثم Medium.', 'Easy, then Medium.'],
    ['ts', 'Zod', 'https://zod.dev/', 'doc', 'i', 'تتحقق من شكل البيانات وقت التشغيل وتطلع منها أنواع.', 'Validate data at run time and get types from it.', 'Basic usage.', 'Basic usage.'],
    // ---- automation ----
    ['auto', 'n8n Docs: Code node', 'https://docs.n8n.io/build/code-in-n8n/using-the-code-node', 'doc', 'b', 'جافاسكريبت جوه n8n: $input وitems والإرجاع.', 'JavaScript inside n8n: $input, items and returning.', 'Using the Code node.', 'Using the Code node.'],
    ['auto', 'n8n Docs: Built-in methods and variables', 'https://docs.n8n.io/build/code-in-n8n/use-built-in-shortcuts', 'doc', 'i', 'كل اللي متاح في الـ Code node والـ expressions.', 'Everything available in the Code node and expressions.', 'Current node input وDate and time.', 'Current node input and Date and time.'],
    ['auto', 'n8n Docs: Creating nodes', 'https://docs.n8n.io/connect/create-nodes/overview', 'doc', 'a', 'تبني node خاصة بـ TypeScript.', 'Build your own node in TypeScript.', 'Build a declarative-style node.', 'Build a declarative-style node.'],
    ['auto', 'Playwright docs', 'https://playwright.dev/docs/intro', 'doc', 'i', 'تتحكم في متصفح حقيقي: تدوس وتملا فورمز وتاخد screenshots.', 'Drive a real browser: click, fill forms and take screenshots.', 'Installation وWriting tests وLocators.', 'Installation, Writing tests and Locators.'],
    ['auto', 'Puppeteer docs', 'https://pptr.dev/', 'doc', 'i', 'مكتبة جوجل للتحكم في Chrome.', 'Google’s library for driving Chrome.', 'Getting started.', 'Getting started.'],
    ['auto', 'Google Apps Script', 'https://developers.google.com/apps-script', 'doc', 'b', 'جافاسكريبت بتأتمت Sheets وGmail وDrive من غير سيرفر.', 'JavaScript that automates Sheets, Gmail and Drive with no server.', 'Quickstart: Custom functions وTriggers.', 'Quickstart: custom functions and triggers.'],
    ['auto', 'Cheerio', 'https://cheerio.js.org/', 'doc', 'i', 'تقرا HTML وتطلّع منه بيانات في Node.', 'Parse HTML and pull data out of it in Node.', 'Loading وSelecting.', 'Loading and Selecting.'],
    ['auto', 'Chrome Extensions docs', 'https://developer.chrome.com/docs/extensions', 'doc', 'a', 'تبني إضافة للمتصفح تأتمت شغلك اليومي.', 'Build a browser extension that automates your daily work.', 'Get started: Hello world.', 'Get started: Hello world.'],
    ['auto', 'SheetJS Community Edition', 'https://docs.sheetjs.com/', 'doc', 'i', 'تقرا وتكتب Excel وCSV بجافاسكريبت.', 'Read and write Excel and CSV in JavaScript.', 'Getting Started.', 'Getting Started.'],
    ['auto', 'PDF-LIB', 'https://pdf-lib.js.org/', 'doc', 'i', 'تعمل وتعدّل ملفات PDF بجافاسكريبت.', 'Create and edit PDF files in JavaScript.', 'Examples.', 'The examples.'],
    ['auto', 'Luxon', 'https://moment.github.io/luxon/', 'doc', 'i', 'مكتبة التواريخ اللي n8n بيستخدمها.', 'The date library n8n uses.', 'Formatting وMath.', 'Formatting and Math.'],
    // ---- quality ----
    ['quality', 'Vitest', 'https://vitest.dev/guide/', 'doc', 'i', 'اختبارات سريعة لكود جافاسكريبت وTypeScript.', 'Fast tests for JavaScript and TypeScript code.', 'Getting Started وMocking.', 'Getting Started and Mocking.'],
    ['quality', 'Node.js test runner', NODE + 'test.html', 'doc', 'i', 'اختبارات من غير أي مكتبة: node --test.', 'Tests with no library at all: node --test.', 'test() وassert.', 'test() and assert.'],
    ['quality', 'ESLint', 'https://eslint.org/docs/latest/', 'doc', 'i', 'بيمسك الأخطاء والكود المريب قبل ما يشتغل.', 'Catches mistakes and suspicious code before it runs.', 'Getting Started.', 'Getting Started.'],
    ['quality', 'Prettier', 'https://prettier.io/docs/', 'doc', 'b', 'بينسّق الكود لوحده.', 'Formats your code for you.', 'Install وOptions.', 'Install and Options.'],
    ['quality', 'Pro Git (book)', 'https://git-scm.com/book/en/v2', 'book', 'b', 'كتاب Git الرسمي المجاني.', 'The official free Git book.', 'الفصول 1–3.', 'Chapters 1–3.'],
    ['quality', 'Conventional Commits', 'https://www.conventionalcommits.org/', 'guide', 'b', 'طريقة ثابتة لكتابة رسائل الـ commits.', 'A consistent way to write commit messages.', 'الصفحة كلها.', 'The whole page.'],
    ['quality', 'Refactoring.Guru: Design patterns', 'https://refactoring.guru/design-patterns', 'guide', 'a', 'أنماط التصميم بالرسومات وأمثلة TypeScript.', 'Design patterns with drawings and TypeScript examples.', 'Strategy وObserver وFactory وAdapter.', 'Strategy, Observer, Factory and Adapter.'],
    // ---- UI and React ----
    ['ui', 'React: Learn', 'https://react.dev/learn', 'doc', 'i', 'التوثيق الرسمي الجديد لـ React بتمارين.', 'React’s new official docs, with exercises.', 'Quick Start ثم Thinking in React.', 'Quick Start, then Thinking in React.'],
    ['ui', 'web.dev: Learn Performance', 'https://web.dev/learn/performance', 'course', 'a', 'إزاي تخلي صفحتك تفتح بسرعة.', 'How to make your page load fast.', 'Why speed matters لحد Image performance.', 'Why speed matters through Image performance.'],
    ['ui', 'MDN: Web Components', MDN + 'Web/API/Web_components', 'doc', 'a', 'مكوّنات واجهة من غير framework: Custom elements وShadow DOM.', 'UI components with no framework: custom elements and the shadow DOM.', 'Using custom elements.', 'Using custom elements.'],
    ['ui', 'Lighthouse', 'https://developer.chrome.com/docs/lighthouse/overview', 'tool', 'i', 'بيقيس الأداء وإمكانية الوصول ويديك نصايح.', 'Measures performance and accessibility and gives advice.', 'Run Lighthouse in DevTools.', 'Run Lighthouse in DevTools.'],
    // ---- data ----
    ['data', 'node-postgres', 'https://node-postgres.com/', 'doc', 'i', 'تكلّم PostgreSQL من Node بأمان.', 'Talk to PostgreSQL from Node, safely.', 'Getting started وQueries.', 'Getting started and Queries.'],
    ['data', 'PostgreSQL Tutorial (official)', 'https://www.postgresql.org/docs/current/tutorial.html', 'doc', 'b', 'الدرس الرسمي لـ SQL في Postgres.', 'The official SQL tutorial in Postgres.', 'The SQL Language.', 'The SQL Language.'],
    ['data', 'SQLBolt', 'https://sqlbolt.com/', 'practice', 'b', 'دروس SQL تفاعلية قصيرة.', 'Short interactive SQL lessons.', 'كل الدروس.', 'Every lesson.'],
    ['data', 'Drizzle ORM', 'https://orm.drizzle.team/docs/overview', 'doc', 'a', 'ORM لـ TypeScript قريب من SQL.', 'A TypeScript ORM that stays close to SQL.', 'Get started with PostgreSQL.', 'Get started with PostgreSQL.'],
    ['data', 'BullMQ', 'https://docs.bullmq.io/', 'doc', 'a', 'طوابير مهام فوق Redis للشغل الخلفي.', 'Job queues on Redis for background work.', 'Guide: Queues وWorkers.', 'Guide: Queues and Workers.'],
    ['data', 'MDN: WebSockets API', MDN + 'Web/API/WebSockets_API', 'doc', 'i', 'اتصال دايم بين المتصفح والسيرفر.', 'A lasting connection between browser and server.', 'Writing WebSocket client applications.', 'Writing WebSocket client applications.'],
    ['data', 'MDN: Server-sent events', MDN + 'Web/API/Server-sent_events', 'doc', 'i', 'السيرفر يبعت تحديثات للمتصفح على طول.', 'The server streams updates to the browser.', 'Using server-sent events.', 'Using server-sent events.'],
    // ---- security ----
    ['sec', 'OWASP Top 10', 'https://owasp.org/www-project-top-ten/', 'guide', 'i', 'أشهر 10 مخاطر أمنية في تطبيقات الويب.', 'The ten best-known security risks in web apps.', 'كل بند ومثاله.', 'Each item and its example.'],
    ['sec', 'OWASP Cheat Sheet Series', 'https://cheatsheetseries.owasp.org/', 'guide', 'i', 'ملخصات عملية لكل موضوع أمني.', 'Practical summaries for every security topic.', 'XSS Prevention وNode.js Security.', 'XSS Prevention and Node.js Security.'],
    ['sec', 'MDN: Content Security Policy', MDN + 'Web/HTTP/Guides/CSP', 'doc', 'a', 'سياسة بتمنع الكود المحقون من إنه يشتغل.', 'A policy that stops injected code from running.', 'الصفحة كلها.', 'The whole page.'],
    ['sec', 'JWT introduction', 'https://jwt.io/introduction', 'guide', 'i', 'إيه الـ JWT وإزاي تتحقق منه.', 'What a JWT is and how to verify it.', 'الصفحة كلها.', 'The whole page.'],
    ['sec', 'OAuth 2.0 simplified', 'https://www.oauth.com/', 'book', 'a', 'كتاب مجاني يشرح OAuth 2.0 خطوة بخطوة.', 'A free book that explains OAuth 2.0 step by step.', 'Getting Ready وAuthorization Code.', 'Getting Ready and Authorization Code.'],
    ['sec', 'npm audit', 'https://docs.npmjs.com/cli/commands/npm-audit', 'doc', 'b', 'بيفحص الحزم اللي مثبتها من الثغرات المعروفة.', 'Checks your installed packages for known vulnerabilities.', 'Description والأمثلة.', 'Description and the examples.'],
    // ---- AI ----
    ['ai', 'Claude API docs', 'https://docs.claude.com/en/docs/intro', 'doc', 'i', 'توثيق Claude API: الرسائل والأدوات والـ streaming.', 'The Claude API docs: messages, tools and streaming.', 'Get started وTool use.', 'Get started and Tool use.'],
    ['ai', 'Anthropic TypeScript SDK', 'https://github.com/anthropics/anthropic-sdk-typescript', 'doc', 'i', 'المكتبة الرسمية لـ Claude في جافاسكريبت وTypeScript.', 'The official Claude library for JavaScript and TypeScript.', 'README: Usage وStreaming.', 'README: Usage and Streaming.'],
    ['ai', 'Model Context Protocol', 'https://modelcontextprotocol.io/', 'doc', 'i', 'المعيار اللي بيوصّل الـ AI بالأدوات والبيانات.', 'The standard that connects AI to tools and data.', 'Introduction وBuild a server.', 'Introduction and Build a server.'],
    ['ai', 'MCP TypeScript SDK', 'https://github.com/modelcontextprotocol/typescript-sdk', 'doc', 'a', 'تبني خادم MCP بـ TypeScript.', 'Build an MCP server in TypeScript.', 'README: Quick Start.', 'README: Quick Start.'],
    ['ai', 'Anthropic Cookbook', 'https://github.com/anthropics/anthropic-cookbook', 'code', 'i', 'أمثلة جاهزة لأفكار حقيقية بـ Claude.', 'Ready examples of real ideas with Claude.', 'tool_use وmisc.', 'tool_use and misc.'],
    // ---- deployment and operations ----
    ['deploy', 'Docker: Get started', 'https://docs.docker.com/get-started/', 'doc', 'i', 'تشغّل تطبيقك في حاوية بنفس الشكل في كل مكان.', 'Run your app in a container, the same everywhere.', 'Get started بالترتيب.', 'Get started in order.'],
    ['deploy', 'Docker: Node.js guide', 'https://docs.docker.com/guides/nodejs/', 'doc', 'i', 'تحط تطبيق Node في Docker صح.', 'Put a Node app in Docker the right way.', 'Containerize ثم Develop.', 'Containerize, then Develop.'],
    ['deploy', 'GitHub Actions docs', 'https://docs.github.com/en/actions', 'doc', 'i', 'اختبار ونشر أوتوماتيك مع كل push.', 'Automatic testing and deploys on every push.', 'Quickstart وBuilding and testing Node.js.', 'Quickstart and Building and testing Node.js.'],
    ['deploy', 'Cloudflare Workers', 'https://developers.cloudflare.com/workers/', 'doc', 'a', 'كود جافاسكريبت بيشتغل على الـ edge من غير سيرفر.', 'JavaScript that runs at the edge with no server.', 'Get started.', 'Get started.'],
    ['deploy', 'GitHub Pages', 'https://docs.github.com/en/pages', 'doc', 'b', 'تنشر موقع ثابت مجانًا.', 'Publish a static site for free.', 'Quickstart.', 'Quickstart.'],
    ['deploy', 'pm2', 'https://pm2.keymetrics.io/docs/usage/quick-start/', 'doc', 'i', 'يشغّل سكربتات Node طول الوقت ويرجّعها لو وقعت.', 'Keeps Node scripts running and restarts them if they crash.', 'Quick Start.', 'Quick Start.'],
    ['deploy', 'OpenTelemetry JavaScript', 'https://opentelemetry.io/docs/languages/js/', 'doc', 'a', 'Logs وtraces وmetrics لتطبيقات Node.', 'Logs, traces and metrics for Node apps.', 'Getting Started.', 'Getting Started.'],
    // ---- practice ----
    ['practice', 'Exercism: JavaScript track', 'https://exercism.org/tracks/javascript', 'practice', 'b', 'تمارين مجانية بمرشدين بيراجعوا كودك.', 'Free exercises with mentors who review your code.', 'تمرين كل يوم.', 'One exercise a day.'],
    ['practice', 'Exercism: TypeScript track', 'https://exercism.org/tracks/typescript', 'practice', 'i', 'نفس الفكرة بـ TypeScript.', 'The same, in TypeScript.', 'مع شهر TypeScript.', 'During the TypeScript month.'],
    ['practice', 'Codewars', 'https://www.codewars.com/', 'practice', 'b', 'تمارين قصيرة وتشوف حلول الناس بعدها.', 'Short exercises, then other people’s solutions.', 'kata كل يوم.', 'A kata a day.'],
    ['practice', 'Frontend Mentor', 'https://www.frontendmentor.io/challenges', 'practice', 'b', 'تصاميم حقيقية تبنيها بـ HTML وCSS وJS.', 'Real designs to build with HTML, CSS and JS.', 'التحديات المجانية Newbie.', 'The free Newbie challenges.'],
    ['practice', 'JavaScript30', 'https://javascript30.com/', 'course', 'b', '30 مشروع صغير بجافاسكريبت من غير مكتبات.', '30 small plain-JavaScript projects.', 'مشروع كل يومين.', 'A project every two days.'],
    ['practice', 'Advent of Code', 'https://adventofcode.com/', 'practice', 'i', 'ألغاز برمجة سنوية ممتعة.', 'Fun yearly programming puzzles.', 'أول 10 أيام من أي سنة.', 'The first 10 days of any year.'],
    // ---- Arabic ----
    ['ar', { ar: 'موسوعة حسوب: JavaScript', en: 'Hsoub Wiki: JavaScript' }, 'https://wiki.hsoub.com/JavaScript', 'doc', 'b', 'مرجع جافاسكريبت مترجم بالعربي.', 'A JavaScript reference translated into Arabic.', 'الكائنات الأساسية.', 'The core objects.', 'ar'],
    ['ar', { ar: 'موسوعة حسوب: CSS', en: 'Hsoub Wiki: CSS' }, 'https://wiki.hsoub.com/CSS', 'doc', 'b', 'مرجع CSS بالعربي.', 'A CSS reference in Arabic.', 'الخاصيات الأساسية.', 'The core properties.', 'ar'],
    ['ar', { ar: 'موسوعة حسوب: HTML', en: 'Hsoub Wiki: HTML' }, 'https://wiki.hsoub.com/HTML', 'doc', 'b', 'مرجع HTML بالعربي.', 'An HTML reference in Arabic.', 'العناصر الأساسية.', 'The core elements.', 'ar'],
    ['ar', { ar: 'أكاديمية حسوب: JavaScript', en: 'Hsoub Academy: JavaScript' }, 'https://academy.hsoub.com/programming/javascript/', 'article', 'b', 'سلاسل جافاسكريبت بالعربي.', 'JavaScript series in Arabic.', 'سلسلة المبتدئين.', 'The beginner series.', 'ar'],
    ['ar', { ar: 'أكاديمية حسوب: Node.js', en: 'Hsoub Academy: Node.js' }, 'https://academy.hsoub.com/programming/javascript/nodejs/', 'article', 'i', 'مقالات Node.js بالعربي.', 'Node.js articles in Arabic.', 'مقالات البداية.', 'The introductory articles.', 'ar'],
    ['ar', { ar: 'Elzero Web School (يوتيوب)', en: 'Elzero Web School (YouTube)' }, 'https://www.youtube.com/@ElzeroWebSchool', 'video', 'b', 'كورسات فيديو مجانية بالعربي لـ HTML وCSS وJavaScript.', 'Free Arabic video courses for HTML, CSS and JavaScript.', 'كورس JavaScript بالترتيب.', 'The JavaScript course in order.', 'ar']
  ];
  var LVL = { b: 'b', bi: 'b', i: 'i', ia: 'i', a: 'a' };
  TYPE.code = { ar: 'كود مفتوح', en: 'Open source' };
  window.JS_DATA = window.JS_DATA || {};
  window.JS_DATA.CATS = CAT;
  window.JS_DATA.LIBRARY = rows.map(function(r){
    var t = r[1];
    return { id: r[2].replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, ''), cat: r[0], c: CAT[r[0]], t: t, url: r[2], type: TYPE[r[3]], lvl: LVL[r[4]] || 'b', lang: r[9] || 'en',
      why: { ar: r[5], en: r[6] }, read: { ar: r[7], en: r[8] } };
  });
})();
