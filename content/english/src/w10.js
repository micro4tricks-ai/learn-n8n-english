// Week 10 — READMEs and documentation.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('README والتوثيق', 'READMEs and documentation'),
  goal: B('تكتب README كامل بـ Markdown: عنوان ووصف وتثبيت واستخدام وأمثلة وصور، بعلامات ترقيم سليمة وكلام مختصر مكتوب للقارئ.',
          'Write a complete README in Markdown — title, description, installation, usage, examples and screenshots — with correct punctuation and concise text written for the reader.'),
  days: [
    { title: B('هيكل الـ README وMarkdown', 'README structure and Markdown'),
      goal: B('تعرف أقسام README الأساسية وتكتبها بـ Markdown صح.', 'Know the core README sections and write them in correct Markdown.'),
      learn: [
        { h: B('الأقسام بالترتيب', 'The sections in order'),
          p: B('Title + سطر وصف، Features، Installation، Usage، Configuration، Contributing، License. أول 3 سطور أهم حاجة: القارئ بيقرر يكمّل ولا لأ منهم.', 'Title + a one-line description, Features, Installation, Usage, Configuration, Contributing, License. The first three lines matter most: readers decide from them whether to go on.'),
          ex: '# invoice-bot\n\nSend payment reminders for overdue invoices from a Google Sheet.\n\n## Installation\n## Usage\n## License' },
        { h: B('Markdown بالكلام', 'Markdown in words'),
          p: B('`#` عنوان، `-` نقطة في قايمة، `**bold**` تقيل، `*italics*` مايل، و3 backticks لكتلة كود. واقراهم بالإنجليزي: hash، dash، asterisks، backticks.', '`#` is a heading, `-` a bullet point, `**bold**`, `*italics*`, and three backticks for a code block. Say them in English: hash, dash, asterisks, backticks.'),
          ex: '## Features\n- **Fast**: processes 1,000 rows in 2 seconds\n- Works with *any* Google Sheet' },
        'g:الحروف الكبيرة في العناوين والأسماء'
      ],
      practice: [
        B('اكتب هيكل README فاضي لمشروعك بكل العناوين.', 'Write an empty README outline for your project with all the headings.'),
        B('اكتب أول 3 سطور (عنوان + وصف في جملة + badge أو رابط).', 'Write the first three lines (title + one-sentence description + a badge or link).'),
        B('اكتب قسم Features فيه 5 نقط، كل نقطة بتبدأ بكلمة بالخط التقيل.', 'Write a Features section with 5 bullet points, each starting with a bold word.'),
        B('اكتب 4 عناوين بطريقة Title Case وSentence case وقارن.', 'Write 4 headings in Title Case and in Sentence case and compare them.')
      ],
      words: ['heading / title', 'paragraph', 'bullet point', 'bold / italics', 'code block', 'hash / pound sign #', 'ampersand &'],
      read: [{ lib: 'Make a README', what: B('اقرا الصفحة كلها واستخدم القالب اللي في الآخر.', 'Read the whole page and use the template at the end.') }],
      challenge: B('خد README مشروع مشهور على GitHub وحلّل أقسامه، واكتب 5 حاجات هتاخدها منه.', 'Take the README of a popular GitHub project, analyse its sections, and write 5 things you will borrow from it.'),
      quiz: [
        { q: B('أهم جزء في README:', 'The most important part of a README:'), o: [B('أول 3 سطور', 'the first three lines'), B('الـ License', 'the License'), B('قسم Contributing', 'the Contributing section')], a: 0, why: B('منهم القارئ بيقرر.', 'Readers decide from them.') },
        { q: B('`-` في Markdown بتعمل:', 'In Markdown, `-` makes:'), o: [B('نقطة في قايمة', 'a bullet point'), B('عنوان', 'a heading'), B('خط تقيل', 'bold text')], a: 0, why: B('dash = bullet.', 'dash = bullet.') },
        { q: B('`#` بتتقري:', '`#` is read as:'), o: ['hash', 'dash', 'star'], a: 0, why: B('hash أو pound sign.', 'hash, or pound sign.') }
      ] },

    { title: B('علامات الترقيم في الكتابة التقنية', 'Punctuation in technical writing'),
      goal: B('تستخدم الـ apostrophe وits/it\'s وعلامات التنصيص والشرطة والفاصلة المنقوطة صح.', 'Use apostrophes, its/it\'s, quotation marks, hyphens and semicolons correctly.'),
      learn: [
        'g:الـ apostrophe للملكية',
        'g:its و it\'s',
        'g:الشرطة في الصفات المركّبة',
        'g:الفاصلة المنقوطة (;)'
      ],
      practice: [
        B('صلّح 6 جمل: `the users data`، `its broken`، `a well known library`، `The app is fast, it uses a cache.`', 'Fix 6 sentences: `the users data`, `its broken`, `a well known library`, `The app is fast, it uses a cache.`'),
        B('اكتب 4 جمل بـ it\'s و4 بـ its عن كودك.', 'Write 4 sentences with it\'s and 4 with its about your code.'),
        B('اكتب 5 صفات مركبة بشرطة: open-source، user-friendly، real-time…', 'Write 5 hyphenated compound adjectives: open-source, user-friendly, real-time…'),
        B('راجع README مشروعك كله للترقيم بس.', 'Check your whole project README for punctuation only.')
      ],
      words: ['apostrophe \'', 'quotation marks " "', 'exclamation mark !', 'ellipsis …', 'colon / semicolon', 'hyphen / dash -', 'underscore _'],
      read: [{ lib: 'Grammar Monster', what: B('اقرا صفحات «Apostrophes» و«Semicolons» وحل تمرين كل واحدة.', 'Read the "Apostrophes" and "Semicolons" pages and do each exercise.') }],
      challenge: B('اكتب فقرة 6 جمل عن مشروعك فيها: apostrophe ملكية، وits، وit\'s، وصفة بشرطة، وفاصلة منقوطة، وعلامات تنصيص.', 'Write a 6-sentence paragraph about your project that uses a possessive apostrophe, its, it\'s, a hyphenated adjective, a semicolon and quotation marks.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The function and it\'s tests.', 'The function and its tests.', 'The function and its\' tests.'], a: 1, why: B('its = بتاعه، it\'s = it is.', 'its = belonging to it; it\'s = it is.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['the user\'s settings (one user)', 'the users settings (one user)', 'the user\'s\' settings'], a: 0, why: B('مفرد + \'s.', 'singular + \'s.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['an open source tool', 'an open-source tool', 'an open-source-tool'], a: 1, why: B('صفة مركبة قبل الاسم بشرطة.', 'A compound adjective before a noun takes a hyphen.') }
      ] },

    { title: B('قسم الاستخدام والأمثلة', 'The Usage section and examples'),
      goal: B('تكتب قسم Usage بأمثلة كود حقيقية، وتقرا الرموز بالإنجليزي، وتكتب تعليمات خطوة خطوة.', 'Write a Usage section with real code examples, read symbols in English, and write step-by-step instructions.'),
      learn: [
        { h: B('مثال قبل الشرح', 'Example before explanation'),
          p: B('في Usage: جملة واحدة بتقول هتعمل إيه، وبعدها الكود على طول، وبعدها النتيجة. متشرحش كتير قبل ما القارئ يشوف مثال.', 'In Usage: one sentence saying what you will do, then the code right away, then the output. Don\'t explain too much before the reader sees an example.'),
          ex: 'To send reminders for invoices older than 7 days:\n\n    python bot.py --days 7\n\nOutput:\n    Sent 3 reminders.' },
        { h: B('اقرا الرموز', 'Read the symbols'),
          p: B('( ) parentheses، [ ] square brackets، { } curly braces، < > angle brackets، * asterisk، \\ backslash، / slash، | pipe، ~ tilde.', '( ) parentheses, [ ] square brackets, { } curly braces, < > angle brackets, * asterisk, \\ backslash, / slash, | pipe, ~ tilde.'),
          ex: 'config["port"]   → config, square bracket, quote, port…\n{ "name": "Ali" } → curly braces' },
        'g:علامات التنصيص'
      ],
      practice: [
        B('اكتب قسم Usage فيه 3 أمثلة، كل مثال: جملة ← كود ← نتيجة.', 'Write a Usage section with 3 examples, each: sentence → code → output.'),
        B('اقرا بصوت عالي 5 سطور كود مليانة رموز وسجّلها.', 'Read 5 symbol-heavy lines of code out loud and record them.'),
        B('اكتب جدول Configuration: المتغيّر، القيمة الافتراضية، الوصف.', 'Write a Configuration table: the variable, the default value, the description.'),
        B('اكتب تعليمات «Quick start» في 4 خطوات مرقمة.', 'Write "Quick start" instructions in 4 numbered steps.')
      ],
      words: ['parentheses ( )', 'square brackets [ ]', 'curly braces { }', 'asterisk *', 'backslash \\', 'keyword', 'instructions'],
      read: [{ lib: 'GitHub ReadME Guides', what: B('اختار دليل عن كتابة التوثيق واقراه.', 'Pick a guide about writing documentation and read it.') }],
      challenge: B('اكتب README كامل لسكربت صغير فيه Usage بـ 3 أمثلة حقيقية جربتها، وجدول Configuration.', 'Write a complete README for a small script, with a Usage section of 3 real examples you ran and a Configuration table.'),
      quiz: [
        { q: B('{ } اسمها:', '{ } are called:'), o: ['square brackets', 'curly braces', 'parentheses'], a: 1, why: B('curly braces.', 'curly braces.') },
        { q: B('في قسم Usage، الأحسن:', 'In a Usage section, it is best to:'), o: [B('مثال بسرعة وبعدين شرح قصير', 'show an example quickly, then a short explanation'), B('صفحة شرح قبل أي كود', 'write a page of explanation before any code'), B('من غير أمثلة', 'give no examples')], a: 0, why: B('القارئ عايز يشوف.', 'Readers want to see it.') },
        { q: B('\\ اسمها:', '\\ is called:'), o: ['slash', 'backslash', 'pipe'], a: 1, why: B('backslash (المايلة لورا).', 'backslash (leaning back).') }
      ] },

    { title: B('الكتابة المختصرة الواضحة', 'Concise, clear writing'),
      goal: B('تشيل الكلام الزيادة، وتخلّي كل جملة فيها فكرة واحدة، وتكتب للقارئ، وتراجع قبل ما تنشر.', 'Cut the extra words, keep one idea per sentence, write for the reader, and proofread before publishing.'),
      learn: [
        'g:شيل الكلام الزيادة (fluff)',
        'g:فكرة واحدة في الجملة',
        'g:اكتب للقارئ',
        { h: B('e.g. وi.e.', 'e.g. and i.e.'),
          p: B('e.g. = for example (أمثلة من كتير)، i.e. = that is (يعني بالظبط). وبعدهم فاصلة في الأمريكي: e.g., Python, Go.', 'e.g. = for example (some of many); i.e. = that is (exactly). In American English a comma follows: e.g., Python, Go.'),
          ex: 'Use a scripting language, e.g., Python or Ruby.\nRun it as root, i.e., with sudo.' }
      ],
      practice: [
        B('اختصر 5 جمل طويلة من توثيقك لنص طولها.', 'Cut 5 long sentences from your docs to half their length.'),
        B('قسّم فقرة فيها 3 أفكار لـ 3 جمل.', 'Split a paragraph with 3 ideas into 3 sentences.'),
        B('اكتب 3 جمل بـ e.g. و3 بـ i.e.', 'Write 3 sentences with e.g. and 3 with i.e.'),
        B('حط README بتاعك في Hemingway Editor وصلّح الجمل الصعبة.', 'Put your README into Hemingway Editor and fix the hard sentences.')
      ],
      words: ['concise', 'wordy', 'proofread', 'capitalization', 'abbreviation / acronym', 'e.g. / i.e.', 'N/A'],
      read: [{ lib: 'Hemingway Editor', what: B('الزق فيه فقرة من توثيقك وشوف الجمل الملونة.', 'Paste a paragraph of your docs and look at the highlighted sentences.') }],
      challenge: B('خد أطول صفحة توثيق عندك وخلّيها أقصر بـ 30% من غير ما تشيل أي معلومة مهمة.', 'Take your longest docs page and make it 30% shorter without losing any important information.'),
      quiz: [
        { q: B('أوضح جملة:', 'The clearest sentence:'), o: ['In order to be able to run the tool, you will need to install Node.', 'To run the tool, install Node.', 'It is necessary that Node is installed for running.'], a: 1, why: B('مختصرة ومباشرة.', 'Short and direct.') },
        { q: B('«Supported databases, i.e., Postgres and MySQL» معناها:', '"Supported databases, i.e., Postgres and MySQL" means:'), o: [B('دول بس المدعومين', 'these are the only ones supported'), B('أمثلة من كتير', 'examples of many'), B('مش مدعومين', 'not supported')], a: 0, why: B('i.e. = يعني بالظبط.', 'i.e. = that is, exactly.') },
        { q: B('proofread يعني:', 'proofread means:'), o: [B('تراجع النص للأخطاء قبل النشر', 'check a text for mistakes before publishing'), B('تثبت إن الكود شغال', 'prove the code works'), B('تترجم', 'translate')], a: 0, why: B('مراجعة لغوية.', 'A language check.') }
      ] },

    { title: B('الصور والواجهة في التوثيق', 'Screenshots and UI in docs'),
      goal: B('توصف عناصر الواجهة والصور في التوثيق: click the button، select from the menu، in the window.', 'Describe UI elements and screenshots in docs: click the button, select from the menu, in the window.'),
      learn: [
        { h: B('أفعال الواجهة', 'UI verbs'),
          p: B('click a button، select an option، choose from a menu، enter a value in a field، check a checkbox، open a window، close a tab، drag and drop.', 'click a button, select an option, choose from a menu, enter a value in a field, check a checkbox, open a window, close a tab, drag and drop.'),
          ex: '1. Open Settings.\n2. Select the Integrations tab.\n3. Enter your API key in the Key field.\n4. Click Save.' },
        { h: B('الكتابة تحت صورة', 'Captions'),
          p: B('تحت الصورة: جملة قصيرة بتقول القارئ هيشوف إيه: The dashboard after the first sync. وaltText للصورة يوصفها لمن لا يراها.', 'Under a screenshot: a short sentence saying what the reader sees: The dashboard after the first sync. Alt text describes the image for people who can\'t see it.'),
          ex: '![The Settings page with the API key field highlighted](docs/settings.png)' },
        'g:كتابة التاريخ والوقت'
      ],
      practice: [
        B('اكتب 6 خطوات استخدام لتطبيق بتستخدمه، كل خطوة بفعل واجهة.', 'Write 6 usage steps for an app you use, each with a UI verb.'),
        B('خد 3 screenshots لمشروعك واكتب لكل واحدة caption وalt text.', 'Take 3 screenshots of your project and write a caption and alt text for each.'),
        B('اكتب 4 تواريخ وأوقات بالشكل الدولي: 2026-09-28، 14:30 UTC.', 'Write 4 dates and times in the international format: 2026-09-28, 14:30 UTC.'),
        B('اوصف الـ IDE بتاعك في 5 جمل: فين الـ terminal، والملفات، والـ debugger.', 'Describe your IDE in 5 sentences: where the terminal, the files and the debugger are.')
      ],
      words: ['screenshot', 'editor / IDE', 'shell / interactive shell', 'window', 'button', 'element', 'select'],
      read: [{ lib: 'Microsoft Writing Style Guide', what: B('دوّر على «Describing interactions with UI» واقرا الأفعال المقترحة.', 'Search for "Describing interactions with UI" and read the recommended verbs.') }],
      challenge: B('ضيف لـ README مشروعك قسم «Screenshots» فيه صورتين بـ captions وalt text، وقسم «Quick start» بخطوات واجهة.', 'Add a "Screenshots" section with two captioned images and alt text to your README, plus a "Quick start" with UI steps.'),
      quiz: [
        { q: B('الفعل الصح مع قايمة منسدلة:', 'The right verb for a drop-down menu:'), o: ['select', 'push', 'write'], a: 0, why: B('select an option from the menu.', 'select an option from the menu.') },
        { q: B('alt text هو:', 'Alt text is:'), o: [B('وصف للصورة للي مش شايفها', 'a description of the image for people who can\'t see it'), B('اسم الملف', 'the file name'), B('حجم الصورة', 'the image size')], a: 0, why: B('للقارئات الصوتية ولو الصورة موصلتش.', 'For screen readers, or if the image fails to load.') },
        { q: B('أوضح كتابة لتاريخ في توثيق دولي:', 'The clearest date format for international docs:'), o: ['09/10/26', '2026-10-09', '9-10'], a: 1, why: B('ISO: سنة-شهر-يوم، ملهاش لخبطة.', 'ISO year-month-day is never ambiguous.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 11 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 11 opens when you score 70% or more.'),
      review: [
        B('أقسام الـ README، وأول 3 سطور، وMarkdown.', 'README sections, the first three lines, and Markdown.'),
        B('الـ apostrophe وits/it\'s والشرطة والفاصلة المنقوطة.', 'Apostrophes, its/it\'s, hyphens and semicolons.'),
        B('Usage: جملة ← كود ← نتيجة، وأسماء الرموز.', 'Usage: sentence → code → output, and the names of symbols.'),
        B('مختصر، وفكرة في الجملة، وe.g. / i.e.', 'Concise, one idea per sentence, and e.g. / i.e.'),
        B('أفعال الواجهة، وcaptions وalt text، والتاريخ ISO.', 'UI verbs, captions and alt text, and ISO dates.')
      ],
      project: B('اكتب README احترافي كامل لمشروعك وانشره على GitHub: عنوان ووصف في سطر، Features، Installation، Usage بأمثلة مجرّبة، Configuration، Screenshots، Contributing، License. وراجعه بـ LanguageTool وHemingway، واطلب من حد يمشي عليه.',
                 'Write a complete, professional README for your project and publish it on GitHub: a title and one-line description, Features, Installation, Usage with tested examples, Configuration, Screenshots, Contributing and License. Check it with LanguageTool and Hemingway, and ask someone to follow it.'),
      test: [
        { q: B('أول حاجة بعد عنوان الـ README:', 'Right after the README title comes:'), o: [B('وصف في جملة', 'a one-sentence description'), B('الـ License', 'the License'), B('قايمة المساهمين', 'the contributors list')], a: 0, why: B('القارئ لازم يعرف المشروع بيعمل إيه.', 'Readers must know what the project does.') },
        { q: B('في Markdown، `**text**` بيخلّي الكلام:', 'In Markdown, `**text**` makes text:'), o: ['bold', 'italic', 'a heading'], a: 0, why: B('نجمتين = bold.', 'Two asterisks = bold.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The library and it\'s dependencies.', 'The library and its dependencies.', 'The library and its\' dependencies.'], a: 1, why: B('its للملكية.', 'its for possession.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The API is slow, we added a cache.', 'The API is slow; we added a cache.', 'The API is slow we added a cache.'], a: 1, why: B('جملتين كاملتين: فاصلة منقوطة أو نقطة.', 'Two full sentences: a semicolon or a full stop.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['a user friendly interface', 'a user-friendly interface', 'a user-friendly-interface'], a: 1, why: B('صفة مركبة قبل الاسم.', 'A compound adjective before the noun.') },
        { q: B('[ ] اسمها:', '[ ] are called:'), o: ['curly braces', 'square brackets', 'angle brackets'], a: 1, why: B('square brackets.', 'square brackets.') },
        { q: B('ترتيب مثال في Usage:', 'The order of an example in Usage:'), o: [B('جملة ← كود ← نتيجة', 'sentence → code → output'), B('نتيجة ← جملة', 'output → sentence'), B('كود بس', 'code only')], a: 0, why: B('القارئ يعرف الهدف ويشوف الكود والنتيجة.', 'The reader sees the goal, the code and the result.') },
        { q: B('أوضح جملة:', 'The clearest sentence:'), o: ['It should be noted that the file is required.', 'The file is required.', 'Please note that it is required that the file is present.'], a: 1, why: B('من غير كلام زيادة.', 'No extra words.') },
        { q: B('«Use a cloud provider, e.g., AWS» معناها:', '"Use a cloud provider, e.g., AWS" means:'), o: [B('AWS مثال', 'AWS is one example'), B('AWS بس', 'only AWS'), B('مش AWS', 'not AWS')], a: 0, why: B('e.g. = for example.', 'e.g. = for example.') },
        { q: B('الفعل الصح: `___ the Save button.`', 'The right verb: `___ the Save button.`'), o: ['Click', 'Enter', 'Write'], a: 0, why: B('click a button.', 'click a button.') },
        { q: B('N/A في جدول معناها:', 'N/A in a table means:'), o: [B('مش منطبق / مش متاح', 'not applicable / not available'), B('جديد', 'new'), B('خطأ', 'an error')], a: 0, why: B('not applicable.', 'not applicable.') },
        { q: B('capitalization معناها:', 'capitalization means:'), o: [B('استخدام الحروف الكبيرة', 'the use of capital letters'), B('تمويل', 'funding'), B('العنوان الرئيسي', 'the main heading')], a: 0, why: B('capital letters.', 'capital letters.') }
      ] }
  ]
};
