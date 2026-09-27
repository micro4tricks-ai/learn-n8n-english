// Week 4 — Code words and error messages in depth (end of month 1).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'A2',
  title: B('كلمات الكود ورسائل الأخطاء بعمق', 'Code words and error messages in depth'),
  goal: B('تقرا الكود بصوت عالي بالإنجليزي وتشرحه: أنواع البيانات، والقوايم، والتكرار، والأصناف، وتقرا أي رسالة خطأ وتقول سببها في جملة.',
          'Read code aloud in English and explain it: data types, lists, loops and classes, and read any error message and say its cause in one sentence.'),
  days: [
    { title: B('أنواع البيانات والعمليات', 'Data types and operators'),
      goal: B('تسمّي أنواع البيانات والعمليات بالإنجليزي، وتقارن بين قيمتين بصيغ المقارنة.', 'Name data types and operators in English, and compare two values with comparatives.'),
      learn: [
        { h: B('اقرا السطر ده بصوت عالي', 'Read this line out loud'),
          p: B('`total = price * 2` بتتقري: total equals price times two. و`x += 1` بتتقري: add one to x. و`a != b` بتتقري: a is not equal to b.', '`total = price * 2` is read: total equals price times two. `x += 1` is read: add one to x. `a != b` is read: a is not equal to b.'),
          ex: 'x > 5        x is greater than five\nx <= 10      x is less than or equal to ten\nname == ""   name is an empty string' },
        'g:المقارنة',
        'g:التفضيل: the + est / the most',
        { h: B('أنواع البيانات', 'Data types'),
          p: B('string نص، وinteger رقم صحيح، وfloat رقم عشري، وboolean صح أو غلط (True/False). وبنقول: this variable is a string / holds an integer.', 'string is text, integer is a whole number, float is a decimal number, boolean is true or false. We say: this variable is a string / holds an integer.'),
          ex: 'age = 30          # an integer\nprice = 9.99      # a float\nname = "Sara"     # a string\nis_admin = False  # a boolean' }
      ],
      practice: [
        B('اقرا بصوت عالي 10 سطور من كودك وسجّلها، مع نطق العمليات (equals, plus, greater than…).', 'Read 10 lines of your code out loud and record them, saying the operators (equals, plus, greater than…).'),
        B('اكتب نوع كل متغيّر في 8 متغيّرات من مشروعك بجملة: `user_id is an integer.`', 'Write the type of 8 variables from your project in a sentence: `user_id is an integer.`'),
        B('اكتب 6 جمل مقارنة بين أدوات أو لغات (Python is easier than…, the fastest…).', 'Write 6 comparison sentences about tools or languages (Python is easier than…, the fastest…).'),
        B('صلّح: `This query is more fast.` و`It is the most easiest way.` و`Go is more faster than Python.`', 'Fix: `This query is more fast.`, `It is the most easiest way.` and `Go is more faster than Python.`')
      ],
      words: ['string', 'integer', 'float', 'boolean', 'data type', 'constant', 'operator'],
      read: [{ lib: 'Python Tutorial (الرسمي)', what: B('اقرا فصل «An Informal Introduction to Python» وردد الأمثلة بصوت عالي.', 'Read the chapter "An Informal Introduction to Python" and say the examples out loud.') }],
      challenge: B('اشرح لحد (أو لنفسك في تسجيل) 5 سطور كود فيها حسابات ومقارنات، بالإنجليزي من غير ما تقرا من ورقة.', 'Explain 5 lines of code with calculations and comparisons to someone (or in a recording) in English, without reading from notes.'),
      quiz: [
        { q: B('`count >= 3` بتتقري:', '`count >= 3` is read:'), o: ['count is greater than or equal to three', 'count equals three', 'count is less than three'], a: 0, why: B('>= = greater than or equal to.', '>= = greater than or equal to.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['SQLite is more simple than Postgres.', 'SQLite is simpler than Postgres.', 'SQLite is more simpler than Postgres.'], a: 1, why: B('الصفة القصيرة بتاخد er: simpler.', 'A short adjective takes -er: simpler.') },
        { q: B('True وFalse نوعهم إيه؟', 'What type are True and False?'), o: ['string', 'boolean', 'float'], a: 1, why: B('boolean = قيمة صح أو غلط.', 'boolean = a true-or-false value.') }
      ] },

    { title: B('القوايم والقواميس', 'Lists and dictionaries'),
      goal: B('توصف القوايم والقواميس وعناصرها بالإنجليزي، وتستخدم حروف الجر والكميات صح.', 'Describe lists, dictionaries and their items in English, and use prepositions and quantities correctly.'),
      learn: [
        { h: B('اتكلم عن قايمة', 'Talking about a list'),
          p: B('the first item، the last element، at index 0، the list contains 5 items، add an item to the list، remove it from the list.', 'the first item, the last element, at index 0, the list contains 5 items, add an item to the list, remove it from the list.'),
          ex: 'users[0]        the first user (at index zero)\nusers[-1]       the last user\nlen(users)      the number of users' },
        'g:Prepositions شائعة',
        'g:much و many',
        'g:a few و a little'
      ],
      practice: [
        B('اكتب 6 جمل تشرح قايمة وقاموس من كودك: فيها إيه، وعدد عناصرها، والمفاتيح إيه.', 'Write 6 sentences explaining a list and a dictionary from your code: what is in them, how many items, and what the keys are.'),
        B('اقرا بصوت عالي: `data["user"]["email"]` و`items[2:5]` و`config.get("port", 8080)`.', 'Read out loud: `data["user"]["email"]`, `items[2:5]` and `config.get("port", 8080)`.'),
        B('اكمل بحرف الجر الصح: add ___ the list، remove ___ the list، ___ index 3، a list ___ strings.', 'Fill in the right preposition: add ___ the list, remove ___ the list, ___ index 3, a list ___ strings.'),
        B('اكتب 4 جمل بـ much/many و4 بـ a few/a little عن بيانات مشروعك.', 'Write 4 sentences with much/many and 4 with a few/a little about your project\'s data.')
      ],
      words: ['list', 'dictionary', 'tuple', 'set', 'array', 'index', 'slice'],
      read: [{ lib: 'Python Tutorial (الرسمي)', what: B('اقرا فصل «Data Structures» لحد القواميس، ولاحظ الأفعال: append, remove, pop, contains.', 'Read the "Data Structures" chapter up to dictionaries, and notice the verbs: append, remove, pop, contains.') }],
      challenge: B('خد response JSON حقيقي من أي API واكتب 6 جمل تشرح شكله: The response contains a list of…, each item has…', 'Take a real JSON response from any API and write 6 sentences describing it: The response contains a list of…, each item has…'),
      quiz: [
        { q: B('`items[-1]` معناها:', '`items[-1]` means:'), o: ['the first item', 'the last item', 'no item'], a: 1, why: B('-1 = آخر عنصر.', '-1 = the last item.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['How many data do you have?', 'How much data do you have?', 'How many datas do you have?'], a: 1, why: B('data مش معدودة، فنقول how much.', 'data is uncountable, so we say how much.') },
        { q: B('اكمل: `Add the user ___ the list.`', 'Complete: `Add the user ___ the list.`'), o: ['to', 'at', 'from'], a: 0, why: B('add something to a list.', 'add something to a list.') }
      ] },

    { title: B('التكرار والشروط', 'Loops and conditions'),
      goal: B('تشرح التكرار والشرط بالإنجليزي: loop over، for each، if… then…، until.', 'Explain loops and conditions in English: loop over, for each, if… then…, until.'),
      learn: [
        'g:If للشروط',
        'g:الشرط zero (حقايق)',
        { h: B('اشرح loop', 'Explaining a loop'),
          p: B('for user in users بتتقري: for each user in the list. وwhile x < 10 بتتقري: while x is less than ten / until x reaches ten. وbreak = stop the loop، continue = skip to the next item.', '`for user in users` is read: for each user in the list. `while x < 10` is read: while x is less than ten / until x reaches ten. break = stop the loop, continue = skip to the next item.'),
          ex: 'The loop goes through every row.\nIf a row is empty, we skip it.\nWhen we find the user, we stop the loop.' },
        'g:Too و enough'
      ],
      practice: [
        B('اشرح 3 loops من كودك في 3 جمل لكل واحدة: بيلف على إيه، وبيعمل إيه في كل مرة، وبيقف إمتى.', 'Explain 3 loops from your code in 3 sentences each: what it goes through, what it does each time, and when it stops.'),
        B('اكتب 5 قواعد لكودك بالشرط zero: If the file is empty, the script stops.', 'Write 5 rules of your code as zero conditionals: If the file is empty, the script stops.'),
        B('اكتب 3 جمل بـ too و3 بـ enough عن الأداء: too slow، not fast enough.', 'Write 3 sentences with too and 3 with enough about performance: too slow, not fast enough.'),
        B('اكتب pseudocode بالإنجليزي لبرنامج بيفلتر قايمة أسماء (5 سطور).', 'Write English pseudocode for a program that filters a list of names (5 lines).')
      ],
      code: [
        { u: B('Pseudocode بالإنجليزي', 'Pseudocode in English'), p: 'For each order in the list:\n    If the order is paid, skip it.\n    Otherwise, send a reminder.\nStop when there are no more orders.' }
      ],
      words: ['loop', 'for loop', 'while loop', 'break', 'continue', 'iterate', 'infinite loop'],
      read: [{ lib: 'Automate the Boring Stuff (النسخة الإنجليزي)', what: B('اقرا فصل «Flow Control» وردد جمل الشرح عن if وwhile وfor.', 'Read the "Flow Control" chapter and repeat the sentences that explain if, while and for.') }],
      challenge: B('اكتب لعبة «خمّن الرقم» كـ pseudocode بالإنجليزي كامل، وبعدين اكتبها كود بأي لغة.', 'Write a "guess the number" game as full English pseudocode, then write it as code in any language.'),
      quiz: [
        { q: B('`continue` معناها:', '`continue` means:'), o: [B('وقف التكرار', 'stop the loop'), B('فوت العنصر ده وروح للي بعده', 'skip this item and go to the next'), B('ابدأ من الأول', 'start again')], a: 1, why: B('continue = skip to the next iteration.', 'continue = skip to the next iteration.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The server is too slow for our needs.', 'The server is enough slow.', 'The server is slow too much.'], a: 0, why: B('too قبل الصفة = أكتر من اللازم.', 'too before an adjective = more than is good.') },
        { q: B('infinite loop هي:', 'An infinite loop is:'), o: [B('تكرار ملوش نهاية', 'a loop that never ends'), B('تكرار سريع', 'a fast loop'), B('تكرار جوه تكرار', 'a loop inside a loop')], a: 0, why: B('infinite = ملوش نهاية.', 'infinite = without end.') }
      ] },

    { title: B('الأصناف والكائنات', 'Classes and objects'),
      goal: B('تشرح class وobject وmethod بالإنجليزي، وتستخدم who/which/that لوصفهم.', 'Explain classes, objects and methods in English, and use who/which/that to describe them.'),
      learn: [
        { h: B('class وobject بكلام بسيط', 'Classes and objects in plain words'),
          p: B('class هو القالب، وobject (instance) هو حاجة معمولة منه. والـ attribute معلومة جواه، والـ method حاجة بيعملها.', 'A class is the template, and an object (instance) is a thing made from it. An attribute is data inside it, and a method is something it does.'),
          ex: 'The User class has two attributes: name and email.\nIt has one method, send_welcome_email().\nEach user is an instance of the User class.' },
        'g:Relative clauses (who / which / that)',
        'g:each و every + مفرد',
        'g:one of the + جمع'
      ],
      practice: [
        B('اشرح class واحد من كودك (أو اعمل واحد صغير) في 6 جمل: attributes وmethods وبيورّث من مين.', 'Explain one class from your code (or make a small one) in 6 sentences: attributes, methods and what it inherits from.'),
        B('اكتب 5 جمل بـ that/which/who: `A function that returns…`، `A user who…`', 'Write 5 sentences with that/which/who: `A function that returns…`, `A user who…`'),
        B('صلّح: `Each users have an ID.` و`One of the method is slow.` و`Every files are saved.`', 'Fix: `Each users have an ID.`, `One of the method is slow.` and `Every files are saved.`'),
        B('ارسم (على ورق) 3 classes ليهم علاقة ببعض واكتب تحت كل واحد جملة بالإنجليزي.', 'Draw 3 related classes on paper and write one English sentence under each.')
      ],
      words: ['class', 'object', 'method', 'attribute', 'instance', 'inheritance', 'self'],
      read: [{ lib: 'Python Tutorial (الرسمي)', what: B('اقرا فصل «Classes» لحد «A First Look at Classes».', 'Read the "Classes" chapter up to "A First Look at Classes".') }],
      challenge: B('اكتب docstring بالإنجليزي لـ class كامل: سطر بيقول هو إيه، وقايمة attributes، وسطر لكل method.', 'Write an English docstring for a whole class: one line saying what it is, a list of attributes, and one line per method.'),
      quiz: [
        { q: B('instance معناها:', 'instance means:'), o: [B('قالب الكلاس', 'the class template'), B('كائن معمول من كلاس', 'an object made from a class'), B('دالة جوه الكلاس', 'a function inside a class')], a: 1, why: B('instance = object اتعمل من class.', 'instance = an object created from a class.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Each user have a role.', 'Each user has a role.', 'Each users has a role.'], a: 1, why: B('each + مفرد + فعل مفرد.', 'each + singular noun + singular verb.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['A function who validates emails.', 'A function that validates emails.', 'A function what validates emails.'], a: 1, why: B('للحاجات that أو which، وwho للناس.', 'that or which for things, who for people.') }
      ] },

    { title: B('رسايل الأخطاء بعمق', 'Error messages in depth'),
      goal: B('تقرا أي رسالة خطأ، وتشرح سببها في جملة، وتستخدم break point وassert وscope صح.', 'Read any error message, explain its cause in one sentence, and use breakpoint, assert and scope correctly.'),
      learn: [
        { h: B('قالب شرح أي خطأ', 'A template for any error'),
          p: B('[Error type]: this happens when [السبب]. In my case, [اللي حصل عندي]. I fixed it by [الحل].', '[Error type]: this happens when [the cause]. In my case, [what happened]. I fixed it by [the fix].'),
          ex: 'IndentationError: this happens when the spaces at the start of a line are wrong.\nIn my case, I mixed tabs and spaces.\nI fixed it by using four spaces everywhere.' },
        { h: B('scope ببساطة', 'Scope in simple words'),
          p: B('scope هو المكان اللي المتغيّر معروف فيه. «x is not defined» كتير معناها إن المتغيّر اتعمل جوه دالة وانت بتستخدمه برّه.', 'Scope is where a variable exists. "x is not defined" often means the variable was created inside a function and you used it outside.'),
          ex: 'def load():\n    data = read_file()\nprint(data)   # NameError: name \'data\' is not defined' },
        'g:Since و for'
      ],
      practice: [
        B('اعمل 5 أخطاء جديدة بإيدك (IndentationError، NameError، ZeroDivisionError، AttributeError، ValueError) واشرح كل واحد بالقالب.', 'Cause 5 new errors on purpose (IndentationError, NameError, ZeroDivisionError, AttributeError, ValueError) and explain each with the template.'),
        B('حط breakpoint في كود عندك، ومشّي الكود خطوة خطوة، واكتب 4 جمل باللي شفته.', 'Set a breakpoint in your code, step through it, and write 4 sentences about what you saw.'),
        B('اكتب 3 assert لدالة عندك، وجملة تشرح كل واحدة: `We assert that the total is positive.`', 'Write 3 asserts for one of your functions, with a sentence explaining each: `We assert that the total is positive.`'),
        B('اكتب 4 جمل بـ since و4 بـ for عن مشاكل: The job has been failing since Monday.', 'Write 4 sentences with since and 4 with for about problems: The job has been failing since Monday.')
      ],
      words: ['breakpoint', 'assert', 'expression', 'statement', 'scope', 'indentation', 'condition'],
      read: [{ lib: 'MDN: JavaScript error reference', what: B('اختار 3 أخطاء من القايمة واقرا شرحهم، ولاحظ إزاي كل صفحة بتقول «What went wrong?».', 'Pick 3 errors from the list and read their pages; notice how each page says "What went wrong?".') }],
      challenge: B('اكتب «دليل أخطاء» شخصي: 6 أخطاء قابلتهم الشهر ده، كل واحد بقالب «this happens when… I fixed it by…».', 'Write a personal "error guide": 6 errors you met this month, each with the "this happens when… I fixed it by…" template.'),
      quiz: [
        { q: B('`NameError: name \'data\' is not defined` غالبًا معناها:', '`NameError: name \'data\' is not defined` usually means:'), o: [B('المتغيّر مش معروف في المكان ده', 'the variable doesn\'t exist in this place'), B('الملف مش موجود', 'the file doesn\'t exist'), B('النوع غلط', 'the type is wrong')], a: 0, why: B('المتغيّر برّه الـ scope بتاعه أو اتكتب غلط.', 'The variable is out of its scope or misspelled.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The test fails since two days.', 'The test has been failing for two days.', 'The test is failing from two days.'], a: 1, why: B('for + مدة، ومع present perfect continuous.', 'for + a length of time, with the present perfect continuous.') },
        { q: B('breakpoint هي:', 'A breakpoint is:'), o: [B('مكان الكود بيقف عنده وقت الـ debug', 'a place where the code stops while debugging'), B('خطأ بيوقف البرنامج', 'an error that stops the program'), B('سطر فاضي', 'an empty line')], a: 0, why: B('بتوقف التشغيل عشان تفحص القيم.', 'It pauses execution so you can inspect values.') }
      ] },

    { title: B('مراجعة الشهر الأول والاختبار', 'Month 1 review and test'),
      goal: B('راجع الأسبوع وكمان الشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 5 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 5 opens when you score 70% or more.'),
      review: [
        B('اقرا العمليات بصوت عالي: equals, plus, greater than or equal to.', 'Read operators aloud: equals, plus, greater than or equal to.'),
        B('المقارنة: er/than للقصير، more/than للطويل، ومن غير ما تجمعهم.', 'Comparisons: -er/than for short words, more/than for long ones, never both.'),
        B('القوايم: at index، add to، remove from، contains، والكميات much/many.', 'Lists: at index, add to, remove from, contains, and the quantities much/many.'),
        B('التكرار والشرط: for each، until، if… then، والمضارع في الشرط zero.', 'Loops and conditions: for each, until, if… then, and the present in zero conditionals.'),
        B('الأصناف: class/object/method/attribute، وthat/which/who.', 'Classes: class/object/method/attribute, and that/which/who.'),
        B('قالب الأخطاء: this happens when… I fixed it by…', 'The error template: this happens when… I fixed it by…')
      ],
      project: B('مشروع الشهر: اختار سكربت عندك (أو اكتب واحد صغير) واعمل له «شرح كود» بالإنجليزي: README من 10 جمل، وتعليق فوق كل دالة، وقسم «Common errors» فيه 3 أخطاء بقالب الأسبوع، وسجّل فيديو أو صوت دقيقتين بتشرح فيه الكود سطر سطر.',
                 'Month project: pick one of your scripts (or write a small one) and create an English "code walkthrough": a 10-sentence README, a comment above every function, a "Common errors" section with 3 errors in this week\'s template, and a two-minute video or audio explaining the code line by line.'),
      test: [
        { q: B('`price * 2` بتتقري:', '`price * 2` is read:'), o: ['price plus two', 'price times two', 'price divided by two'], a: 1, why: B('* = times / multiplied by.', '* = times / multiplied by.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['This is the most fast solution.', 'This is the fastest solution.', 'This is the more faster solution.'], a: 1, why: B('fast قصيرة: the fastest.', 'fast is short: the fastest.') },
        { q: B('9.99 نوعها:', '9.99 is a:'), o: ['integer', 'float', 'boolean'], a: 1, why: B('رقم عشري = float.', 'A decimal number = float.') },
        { q: B('`users[0]` معناها:', '`users[0]` means:'), o: ['the last user', 'the first user', 'no users'], a: 1, why: B('العد بيبدأ من صفر: index 0 = الأول.', 'Counting starts at zero: index 0 = the first.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We have a little users.', 'We have a few users.', 'We have a much users.'], a: 1, why: B('users معدودة، فـ a few.', 'users is countable, so a few.') },
        { q: B('اكمل: `Remove the item ___ the list.`', 'Complete: `Remove the item ___ the list.`'), o: ['to', 'from', 'on'], a: 1, why: B('remove from.', 'remove from.') },
        { q: B('`break` جوه loop بيعمل إيه؟', 'What does `break` do inside a loop?'), o: [B('يوقف التكرار كله', 'stops the whole loop'), B('يفوت عنصر واحد', 'skips one item'), B('يعيد العنصر', 'repeats the item')], a: 0, why: B('break = اخرج من الـ loop.', 'break = exit the loop.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['If the list is empty, the function returns None.', 'If the list will be empty, the function returns None.', 'If the list empty, the function return None.'], a: 0, why: B('الشرط zero: مضارع في الاتنين، وis مع الصفة.', 'Zero conditional: present in both parts, and is before the adjective.') },
        { q: B('attribute في الكلاس هي:', 'An attribute in a class is:'), o: [B('معلومة جواه', 'a piece of data in it'), B('حاجة بيعملها', 'something it does'), B('خطأ فيه', 'an error in it')], a: 0, why: B('attribute = data، وmethod = behavior.', 'attribute = data; method = behaviour.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['One of the tests are failing.', 'One of the tests is failing.', 'One of the test is failing.'], a: 1, why: B('one of the + جمع + فعل مفرد.', 'one of the + plural noun + singular verb.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The API has been down since 9 am.', 'The API is down since 9 am.', 'The API has been down for 9 am.'], a: 0, why: B('since + نقطة بداية، مع present perfect.', 'since + a starting point, with the present perfect.') },
        { q: B('أحسن جملة تشرح `IndentationError`:', 'The best sentence to explain `IndentationError`:'), o: ['It happens when the spaces at the start of a line are wrong.', 'It happen when spaces wrong.', 'It is happening because space.'], a: 0, why: B('قالب «It happens when…» بجملة كاملة.', 'The "It happens when…" template as a full sentence.') }
      ] }
  ]
};
