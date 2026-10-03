// JavaScript week 1 — getting started: JavaScript in the browser and Node, variables and types.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('البداية: جافاسكريبت في المتصفح وNode والمتغيرات والأنواع', 'Getting started: JavaScript in the browser and Node, variables and types'),
  goal: B('تعرف جافاسكريبت بتشتغل فين (المتصفح وNode.js وCode node في n8n)، وتجهّز جهازك بـ VS Code وNode، وتكتب أول برامجك: تطبع، وتعلّق، وتعرّف متغيرات بـ let وconst، وتفهم الأنواع الأساسية وتحوّل بينها.',
          'Know where JavaScript runs (the browser, Node.js and the n8n Code node), set up VS Code and Node, and write your first programs: print, comment, declare variables with let and const, and understand the basic types and convert between them.'),
  days: [
    { title: B('جافاسكريبت إيه وبتشتغل فين؟', 'What JavaScript is and where it runs'),
      goal: B('تفهم إن جافاسكريبت لغة واحدة بتشتغل في 3 أماكن هتستخدمهم في الأتمتة، وتكتب أول سطور في الـ Console.', 'Understand that JavaScript is one language that runs in three places you will use for automation, and write your first lines in the Console.'),
      learn: [
        { h: B('لغة واحدة في 3 أماكن', 'One language in three places'),
          p: B('جافاسكريبت (JS) هي لغة الويب: كل زرار بيتفاعل وكل فورم بيتحقق قبل ما يتبعت فيه JS. نفس اللغة بتشتغل برّه المتصفح في **Node.js** (سكربتات على جهازك أو سيرفر: ملفات وAPIs وأتمتة)، وجوه **Code node في n8n** (n8n نفسه مبني بـ Node). يعني اللي هتتعلمه هنا هتستخدمه في الثلاثة. الكود بيتقري من فوق لتحت سطر سطر، وكل أمر اسمه **statement**.',
            'JavaScript (JS) is the language of the web: every button that reacts and every form that checks itself before sending uses JS. The same language runs outside the browser in **Node.js** (scripts on your computer or a server: files, APIs and automation) and inside the **n8n Code node** (n8n itself is built on Node). So what you learn here you will use in all three. Code is read from top to bottom, line by line, and each instruction is a **statement**.'),
          ex: 'console.log("Hello from JavaScript!");\nconsole.log("This runs in the browser, in Node.js and in n8n.");\nconsole.log(2 + 3);', run: 'js' },
        { h: B('console.log: عينك على الكود', 'console.log: your eye on the code'),
          p: B('`console.log(...)` بيطبع أي قيمة في الـ **Console** (زي print في بايثون). بتدّيه كذا قيمة بفاصلة وهو يطبعهم جنب بعض بمسافة. هتستخدمه طول الوقت عشان تشوف الكود بيعمل إيه — حتى المحترفين. وفيه أخوات: `console.error` للأخطاء (بيطلع أحمر)، و`console.warn` للتحذيرات، و`console.table` بيعرض قايمة كجدول.',
            '`console.log(...)` prints any value to the **Console** (like print in Python). Give it several values separated by commas and it prints them side by side with a space. You will use it all the time to see what your code is doing — professionals do too. It has siblings: `console.error` for errors (shown in red), `console.warn` for warnings, and `console.table`, which shows a list as a table.'),
          ex: 'console.log("Orders today:", 12);\nconsole.log("Customer", "Sara", "paid", 450, "EGP");\nconsole.warn("Stock is low for item A-17");\nconsole.error("failed: could not reach the payment API");', run: 'js' },
        { h: B('الـ Console في المتصفح', 'The browser Console'),
          p: B('افتح أي صفحة في Chrome أو Edge ودوس **F12** (أو Ctrl+Shift+J) واختار تبويب **Console**. اكتب سطر JS ودوس Enter: بيتنفّذ على طول وبيطبع النتيجة. ده أسرع مكان تجرّب فيه فكرة صغيرة. السهم لفوق بيرجّع آخر سطر، وShift+Enter بيعمل سطر جديد من غير تنفيذ. الأمثلة هنا في الصفحة بتشتغل بنفس الطريقة: دوس ▶ تحت أي مثال وشوف الناتج.',
            'Open any page in Chrome or Edge, press **F12** (or Ctrl+Shift+J) and pick the **Console** tab. Type a JS line and press Enter: it runs at once and prints the result. It is the fastest place to try a small idea. The up arrow brings back the last line, and Shift+Enter makes a new line without running. The examples on this page work the same way: press ▶ under any example and see the output.'),
          ex: 'console.log(10 * 12);\nconsole.log("abc".toUpperCase());\nconsole.log(new Date().getFullYear());\nconsole.log(Math.max(4, 19, 7));', run: 'js' },
        { h: B('التعليقات والفواصل المنقوطة', 'Comments and semicolons'),
          p: B('التعليق كلام للبشر مش للكمبيوتر: `//` لسطر واحد، و`/* ... */` لكذا سطر. اكتب **ليه** بتعمل حاجة، مش **إيه** (الكود بيقول إيه). كل statement بيخلص بـ `;` — JS ساعات بيحطها لوحده لو نسيتها، بس اكتبها دايمًا عشان تتجنب أخطاء غريبة. والمسافات والأسطر الفاضية مش بتفرق مع JS، فاستخدمها عشان الكود يبقى مقري.',
            'A comment is text for people, not the computer: `//` for one line and `/* ... */` for several. Write **why** you do something, not **what** (the code already says what). Each statement ends with `;` — JS sometimes adds it for you if you forget, but always write it to avoid strange bugs. Spaces and blank lines do not matter to JS, so use them to keep the code readable.'),
          ex: '// VAT in Egypt is 14% (why the number is here)\nconst vat = 0.14;\n/* The price comes from the shop sheet.\n   We keep two decimals for invoices. */\nconst price = 250;\nconsole.log(price * (1 + vat)); // 285', run: 'js' },
        { h: B('جافاسكريبت في الأتمتة', 'JavaScript in automation'),
          p: B('في n8n هتكتب JS في مكانين: **Expressions** جوه `{{ }}` (سطر واحد بيرجّع قيمة، زي `{{ $json.name.toUpperCase() }}`)، و**Code node** (كود كامل بيقرا الـ items ويرجّع items). في Node.js هتكتب سكربتات بتقرا ملفات Excel وتكلّم APIs وتبعت رسايل. وفي المتصفح هتعمل صفحات وفورمز بتبعت بيانات لـ n8n. كل ده نفس اللغة، فكل يوم هنا بيقربك من الثلاثة مع بعض.',
            'In n8n you write JS in two places: **expressions** inside `{{ }}` (one line that returns a value, like `{{ $json.name.toUpperCase() }}`) and the **Code node** (full code that reads items and returns items). In Node.js you write scripts that read Excel files, call APIs and send messages. In the browser you build pages and forms that send data to n8n. It is all the same language, so every day here brings you closer to all three at once.'),
          ex: '// What an n8n expression does with one item:\nconst json = { name: "sara ahmed", total: 1200 };\nconsole.log(json.name.toUpperCase());\nconsole.log(json.total > 1000 ? "VIP" : "normal");', run: 'js' }
      ],
      practice: [
        B('افتح Console في المتصفح (F12) واكتب 5 أسطر: حساب، ونص، و`Math.max`، و`new Date()`، و`"hi".length`.', 'Open the browser Console (F12) and type 5 lines: a sum, a string, `Math.max`, `new Date()` and `"hi".length`.'),
        B('دوس ▶ على كل مثال في الدرس وعدّل حاجة صغيرة في كل واحد (✎ عدّل الكود) وشغّله تاني.', 'Press ▶ on every example in the lesson, change something small in each one (✎ Edit the code) and run it again.'),
        B('اكتب 3 أسطر `console.log` بتطبع اسمك ومدينتك وسنة النهارده.', 'Write 3 `console.log` lines that print your name, your city and this year.'),
        B('اكتب سطر فيه `console.error` وسطر فيه `console.warn` وشوف الفرق في الـ Console.', 'Write one line with `console.error` and one with `console.warn`, and see the difference in the Console.'),
        B('اكتب كود 4 أسطر بتعليق `//` فوق كل سطر بيقول **ليه**.', 'Write 4 lines of code with a `//` comment above each one saying **why**.'),
        B('اكتب في ورقة 3 مهام في شغلك ممكن جافاسكريبت تعملها (في المتصفح أو Node أو n8n).', 'Write down 3 tasks from your work that JavaScript could do (in the browser, Node or n8n).')
      ],
      code: [
        { u: B('أول سكربت ليك', 'Your first script'), p: '// hello.js — run it in the Console, or save it and run: node hello.js\nconst name = "Sara";\nconsole.log("Hello, " + name + "!");\nconsole.log("Today is", new Date().toDateString());' }
      ],
      words: [
        { t: 'statement', m: B('أمر واحد كامل في الكود، غالبًا بيخلص بـ ;', 'one complete instruction in code, usually ending with ;'), ex: 'const total = 5;' },
        { t: 'console', m: B('المكان اللي الكود بيطبع فيه رسايله ونتايجه', 'the place where code prints its messages and results'), ex: 'console.log("hi")' },
        { t: 'browser', m: B('برنامج تصفح الويب (Chrome وEdge وFirefox)، وفيه محرك بيشغّل JS', 'a web browser (Chrome, Edge, Firefox), with an engine that runs JS'), ex: 'Open the browser console' },
        { t: 'Node.js', m: B('بيئة بتشغّل جافاسكريبت برّه المتصفح: على جهازك أو سيرفر', 'a runtime that runs JavaScript outside the browser: on your computer or a server'), ex: 'node hello.js' },
        { t: 'comment', m: B('كلام في الكود للبشر، الكمبيوتر بيتجاهله', 'text in code for people; the computer ignores it'), ex: '// why we round here' },
        { t: 'semicolon', m: B('الفاصلة المنقوطة ; في آخر الأمر', 'the ; mark at the end of a statement'), ex: 'let x = 1;' },
        { t: 'DevTools', m: B('أدوات المطوّر في المتصفح (F12): Console وElements وNetwork', 'the browser’s developer tools (F12): Console, Elements and Network'), ex: 'Press F12 to open DevTools' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Part 1: An introduction (كل الفصول)، وJavaScript Fundamentals: Hello, world! وCode structure.', 'Part 1: An introduction (all chapters), and JavaScript Fundamentals: Hello, world! and Code structure.') },
        { lib: 'Chrome DevTools docs', what: B('Console overview: إزاي تفتح الـ Console وتشغّل كود فيه.', 'Console overview: how to open the Console and run code in it.') }],
      challenge: B('اكتب برنامج 6 أسطر بيطبع «فاتورة» صغيرة: اسم المحل، واسم العميل، وسعر منتج، وكميته، والإجمالي (احسبه بالكود)، وسطر شكر — وكل سطر عليه تعليق بيقول ليه.', 'Write a 6-line program that prints a small «invoice»: the shop name, the customer name, a product price, its quantity, the total (calculated in code) and a thank-you line — with a comment on each line saying why.'),
      quiz: [
        { q: B('جافاسكريبت بتشتغل فين؟', 'Where does JavaScript run?'), o: [B('المتصفح وNode.js وn8n', 'The browser, Node.js and n8n'), B('المتصفح بس', 'Only the browser'), B('Excel بس', 'Only Excel')], a: 0, why: B('نفس اللغة في الثلاثة.', 'The same language runs in all three.') },
        { q: B('إيه اللي بيطبع قيمة في الـ Console؟', 'What prints a value to the Console?'), o: ['console.log()', 'print()', 'echo()'], a: 0, why: B('console.log هو print بتاع JS.', 'console.log is JS’s print.') },
        { q: B('التعليق اللي سطر واحد بيبدأ بـ:', 'A one-line comment starts with:'), o: ['//', '#', '--'], a: 0, why: B('# في بايثون، لكن JS بيستخدم //.', '# is Python; JS uses //.') },
        { q: B('تكتب في التعليق غالبًا:', 'In a comment you usually write:'), o: [B('ليه بتعمل الحاجة', 'why you do something'), B('نفس الكود بالكلام', 'the code again in words'), B('ولا حاجة', 'nothing')], a: 0, why: B('الكود بيقول إيه، والتعليق بيقول ليه.', 'The code says what; the comment says why.') }
      ] },

    { title: B('المتغيرات: let وconst', 'Variables: let and const'),
      goal: B('تخزّن قيم في متغيرات بأسماء واضحة، وتعرف إمتى تستخدم const وإمتى let، وليه منبعدش عن var.', 'Store values in clearly named variables, know when to use const and when let, and why we avoid var.'),
      learn: [
        { h: B('المتغير صندوق باسم', 'A variable is a named box'),
          p: B('المتغير اسم بيشاور على قيمة عشان تستخدمها بعدين. `const vat = 0.14;` يعني «اعمل صندوق اسمه vat وحط فيه 0.14». بعد كده تكتب `vat` في أي مكان بدل الرقم. ده بيخلي الكود مفهوم (`price * vat` أوضح من `price * 0.14`) وسهل التعديل (تغيّر القيمة في مكان واحد).',
            'A variable is a name that points to a value so you can use it later. `const vat = 0.14;` means «make a box called vat and put 0.14 in it». After that you write `vat` anywhere instead of the number. This makes code understandable (`price * vat` is clearer than `price * 0.14`) and easy to change (you change the value in one place).'),
          ex: 'const shopName = "Nile Store";\nconst vat = 0.14;\nconst price = 300;\nconsole.log(shopName, "price with VAT:", price * (1 + vat));', run: 'js' },
        { h: B('const افتراضيًا، وlet لما القيمة هتتغير', 'const by default, let when the value changes'),
          p: B('`const` بيعمل متغير **مينفعش تدّيله قيمة جديدة**. `let` بيعمل متغير **ينفع تغيّر قيمته**. القاعدة: ابدأ دايمًا بـ const، ولو احتجت تغيّر القيمة (عدّاد، إجمالي بيكبر) غيّرها لـ let. لو حاولت تغيّر const، JS هيقولك `TypeError: Assignment to constant variable.` — وده بيحميك من تغيير بالغلط.',
            '`const` makes a variable **you cannot give a new value**. `let` makes a variable **whose value can change**. The rule: always start with const, and if you need to change the value (a counter, a growing total) switch it to let. If you try to change a const, JS tells you `TypeError: Assignment to constant variable.` — which protects you from changing it by mistake.'),
          ex: 'let total = 0;\ntotal = total + 120;\ntotal += 80;      // same as total = total + 80\nconsole.log("total:", total);\nconst shop = "Nile Store";\ntry {\n  shop = "Other";\n} catch (err) {\n  console.log("Error:", err.message);\n}', run: 'js' },
        { h: B('ليه منستخدمش var', 'Why we do not use var'),
          p: B('`var` هي الطريقة القديمة قبل 2015. مشاكلها: ممكن تتعرّف مرتين بنفس الاسم من غير خطأ، ونطاقها مش البلوك `{ }` (بتعدّي برّه if وfor)، وبتتقري قبل سطر تعريفها كـ undefined. هتقابلها في كود قديم وأمثلة على النت، فاعرفها، بس في كودك استخدم const وlet بس.',
            '`var` is the old way from before 2015. Its problems: it can be declared twice with the same name without an error, its scope is not the `{ }` block (it leaks out of if and for), and it can be read before its declaration line as undefined. You will meet it in old code and online examples, so know it, but in your own code use only const and let.'),
          ex: 'if (true) {\n  var leaky = "I escape the block";\n  let safe = "I stay inside";\n}\nconsole.log(leaky);\nconsole.log(typeof safe); // "undefined": safe does not exist out here', run: 'js' },
        { h: B('قواعد الأسماء وcamelCase', 'Naming rules and camelCase'),
          p: B('الاسم ممكن يبقى فيه حروف وأرقام و`_` و`$`، ومينفعش يبدأ برقم أو يبقى كلمة محجوزة (`let` و`class` و`return`...). والحروف الكبيرة والصغيرة بتفرق: `total` غير `Total`. العُرف في JS اسمه **camelCase**: أول كلمة صغيرة وكل كلمة بعدها أول حرف كبير: `customerName` و`orderTotal` و`isPaid`. خلي الاسم يقول القيمة دي إيه، مش `x` و`data2`.',
            'A name may contain letters, digits, `_` and `$`, and it cannot start with a digit or be a reserved word (`let`, `class`, `return`...). Upper and lower case differ: `total` is not `Total`. The JS custom is **camelCase**: the first word in lower case and each following word with a capital: `customerName`, `orderTotal`, `isPaid`. Make the name say what the value is, not `x` or `data2`.'),
          ex: 'const customerName = "Omar";\nconst orderTotal = 1850;\nconst isPaid = true;\nconst MAX_ITEMS = 50; // a fixed setting: some teams write these in UPPER_CASE\nconsole.log(customerName, orderTotal, isPaid, MAX_ITEMS);', run: 'js' },
        { h: B('متغيرات بتتحسب من بعض', 'Variables computed from each other'),
          p: B('قوة المتغيرات إنك تبني قيمة من قيم: الإجمالي من السعر والكمية، والضريبة من الإجمالي، والمبلغ النهائي من الاتنين. لو غيّرت السعر في أول سطر، كل اللي بعده بيتحسب تاني لما تشغّل. ده بالظبط اللي بيحصل في Code node: بتقرا قيم من الـ item وتحسب منها قيم جديدة.',
            'The power of variables is building a value from values: the total from price and quantity, the tax from the total, and the final amount from both. If you change the price in the first line, everything after it is recalculated when you run. That is exactly what happens in a Code node: you read values from the item and compute new ones from them.'),
          ex: 'const unitPrice = 75;\nconst quantity = 4;\nconst subtotal = unitPrice * quantity;\nconst vat = subtotal * 0.14;\nconst total = subtotal + vat;\nconsole.log("subtotal", subtotal, "vat", vat, "total", total);', run: 'js' }
      ],
      practice: [
        B('اعمل 5 متغيرات const لبيانات منتج (الاسم، السعر، الكمية، المخزن، متاح ولا لأ) واطبعهم في سطر واحد.', 'Make 5 const variables for a product (name, price, quantity, warehouse, in stock or not) and print them on one line.'),
        B('اعمل عدّاد بـ let وزوّده 3 مرات بـ `+=` واطبعه بعد كل مرة.', 'Make a counter with let, increase it 3 times with `+=` and print it after each time.'),
        B('جرّب تغيّر قيمة const وشوف رسالة الخطأ، واكتبها في ورقة بمعناها.', 'Try to change a const value, see the error message, and write it down with its meaning.'),
        B('صحّح 6 أسماء وحشة لـ camelCase مفهوم: `x` و`d2` و`customer_name` و`Total` و`flag` و`temp1`.', 'Turn 6 bad names into clear camelCase: `x`, `d2`, `customer_name`, `Total`, `flag`, `temp1`.'),
        B('اكتب حسبة مرتب: الأساسي والحوافز والخصومات والصافي، كل واحد في متغير.', 'Write a salary calculation: base, bonus, deductions and net, each in a variable.'),
        B('حوّل مثال var من الدرس لـ let وشوف الفرق في الناتج.', 'Change the var example from the lesson to let and see how the output changes.')
      ],
      code: [
        { u: B('let ولا const؟', 'let or const?'), p: '// Ask: will this name ever point to a different value?\nconst taxRate = 0.14;     // no  → const\nconst customer = "Laila"; // no  → const\nlet attempts = 0;         // yes → let (it counts up)\nlet status = "new";       // yes → let (new → paid → shipped)' }
      ],
      words: [
        { t: 'variable', m: B('اسم بيشاور على قيمة في الذاكرة', 'a name that points to a value in memory'), ex: 'const price = 99;' },
        { t: 'declare', m: B('تعرّف متغير جديد بـ let أو const', 'to create a new variable with let or const'), ex: 'let count;' },
        { t: 'assign', m: B('تدّي متغير قيمة بعلامة =', 'to give a variable a value with the = sign'), ex: 'count = 3;' },
        { t: 'reassign', m: B('تدّي متغير قيمة جديدة بعد ما كان ليه قيمة', 'to give a variable a new value after it already had one'), ex: 'status = "paid";' },
        { t: 'let', m: B('تعريف متغير قيمته ممكن تتغير', 'declares a variable whose value may change'), ex: 'let total = 0;' },
        { t: 'camelCase', m: B('طريقة تسمية: أول كلمة صغيرة وكل كلمة بعدها حرفها الأول كبير', 'a naming style: first word lower case, each later word capitalised'), ex: 'orderTotal' },
        { t: 'reserved word', m: B('كلمة محجوزة للغة متنفعش اسم متغير', 'a word kept by the language that cannot be a variable name'), ex: 'class, return, let' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('JavaScript Fundamentals: The modern mode, "use strict" وVariables (بالتمارين).', 'JavaScript Fundamentals: The modern mode, "use strict" and Variables (with the exercises).') },
        { lib: 'MDN: JavaScript Guide', what: B('Grammar and types: الجزء الخاص بـ Declarations.', 'Grammar and types: the Declarations part.') }],
      challenge: B('اكتب برنامج «كشف حساب» لعميل: رصيد البداية، و3 عمليات (شرا، دفع، مرتجع)، والرصيد يتحدّث بعد كل عملية بـ let ويتطبع، وكل القيم الثابتة const بأسماء واضحة.', 'Write a «statement of account» program for a customer: an opening balance and 3 transactions (a purchase, a payment, a return), with the balance updated after each one using let and printed, and every fixed value a clearly named const.'),
      quiz: [
        { q: B('تستخدم const لما:', 'You use const when:'), o: [B('المتغير مش هيتدّاله قيمة جديدة', 'the variable will not get a new value'), B('القيمة رقم بس', 'the value is a number'), B('دايمًا بدل كل حاجة', 'always, for everything')], a: 0, why: B('const ممنوع تعيد تعيينه.', 'A const cannot be reassigned.') },
        { q: B('`let total = 0; total += 5;` قيمة total:', '`let total = 0; total += 5;` total is:'), o: ['5', '0', '05'], a: 0, why: B('+= بيجمع على القيمة الموجودة.', '+= adds to the current value.') },
        { q: B('أي اسم camelCase صح؟', 'Which name is proper camelCase?'), o: ['orderTotal', 'Order_total', 'ordertotal1'], a: 0, why: B('أول كلمة صغيرة وكل كلمة بعدها حرف كبير.', 'First word lower case, each later word capitalised.') },
        { q: B('ليه منستخدمش var؟', 'Why do we avoid var?'), o: [B('بتعدّي برّه البلوك وبتتعرّف مرتين بسهولة', 'it leaks out of blocks and is easy to declare twice'), B('أبطأ', 'it is slower'), B('مش شغالة في Chrome', 'it does not work in Chrome')], a: 0, why: B('نطاقها ومشاكلها القديمة.', 'Its scope and old pitfalls.') }
      ] },

    { title: B('الأنواع الأساسية والتحويل بينها', 'The basic types and converting between them'),
      goal: B('تعرف الأنواع السبعة الأساسية وأهمهم (number وstring وboolean وnull وundefined)، وتكشف النوع بـ typeof، وتحوّل بأمان.', 'Know the seven primitive types and the main ones (number, string, boolean, null and undefined), detect a type with typeof, and convert safely.'),
      learn: [
        { h: B('number وstring وboolean', 'number, string and boolean'),
          p: B('**number**: كل الأرقام، صحيحة وكسور (`7` و`3.5` و`-20`) — مفيش int وfloat منفصلين زي بايثون. **string**: نص بين علامات تنصيص `"..."` أو `\'...\'` أو backticks. **boolean**: `true` أو `false` بس (بحروف صغيرة). دول أكتر 3 أنواع هتستخدمهم: السعر رقم، والاسم نص، و«مدفوع؟» boolean.',
            '**number**: all numbers, whole and decimal (`7`, `3.5`, `-20`) — there are no separate int and float like Python. **string**: text inside quotes `"..."` or `\'...\'` or backticks. **boolean**: only `true` or `false` (lower case). These are the three types you will use most: a price is a number, a name is a string, and «paid?» is a boolean.'),
          ex: 'const price = 249.99;\nconst product = "USB cable";\nconst inStock = true;\nconsole.log(typeof price, typeof product, typeof inStock);\nconsole.log(7 / 2); // 3.5, not 3', run: 'js' },
        { h: B('null وundefined', 'null and undefined'),
          p: B('**undefined** معناها «لسه مفيش قيمة»: متغير اتعرّف من غير قيمة، أو خاصية مش موجودة في كائن. **null** معناها «مفيش قيمة **بقصد**»: انت اللي كتبتها عشان تقول «الحقل ده فاضي». في بيانات الـ APIs وn8n هتلاقي الاتنين كتير، وأغلب أخطاء المبتدئين بتيجي من قراية حاجة undefined.',
            '**undefined** means «no value yet»: a variable declared without a value, or a property that does not exist on an object. **null** means «no value **on purpose**»: you wrote it to say «this field is empty». In API and n8n data you will see both a lot, and most beginner errors come from reading something undefined.'),
          ex: 'let phone;\nconsole.log(phone);          // undefined: no value yet\nconst coupon = null;         // empty on purpose\nconsole.log(coupon);\nconst customer = { name: "Hany" };\nconsole.log(customer.email); // undefined: no such property', run: 'js' },
        { h: B('typeof: اعرف النوع', 'typeof: find the type'),
          p: B('`typeof x` بيرجّع اسم النوع كنص: `"number"` و`"string"` و`"boolean"` و`"undefined"` و`"object"` و`"function"`. خلي بالك من استثناءين قدام: `typeof null` بيرجّع `"object"` (غلطة قديمة في اللغة اتسابت)، و`typeof []` برضه `"object"` — للمصفوفة استخدم `Array.isArray(x)`. فيه كمان `bigint` و`symbol` بس نادر تحتاجهم.',
            '`typeof x` returns the type’s name as a string: `"number"`, `"string"`, `"boolean"`, `"undefined"`, `"object"` and `"function"`. Watch two exceptions: `typeof null` returns `"object"` (an old mistake left in the language), and `typeof []` is also `"object"` — for arrays use `Array.isArray(x)`. There are also `bigint` and `symbol`, but you will rarely need them.'),
          ex: 'console.log(typeof 42, typeof "42", typeof false);\nconsole.log(typeof undefined, typeof null);\nconsole.log(typeof [1, 2], Array.isArray([1, 2]));\nconsole.log(typeof console.log);', run: 'js' },
        { h: B('التحويل: Number وString وBoolean', 'Converting: Number, String and Boolean'),
          p: B('البيانات اللي جاية من فورم أو CSV أو API غالبًا **نص** حتى لو شكلها رقم: `"120"`. حوّل صراحةً: `Number("120")` يدّي 120، و`String(120)` يدّي `"120"`، و`Boolean(x)` يدّي true أو false. لو النص مش رقم، `Number("abc")` يدّي **NaN** (Not a Number) — افحصه بـ `Number.isNaN()`. و`parseInt("12px", 10)` بياخد الرقم من أول النص.',
            'Data from a form, a CSV or an API is often **text** even when it looks like a number: `"120"`. Convert explicitly: `Number("120")` gives 120, `String(120)` gives `"120"`, and `Boolean(x)` gives true or false. If the text is not a number, `Number("abc")` gives **NaN** (Not a Number) — check it with `Number.isNaN()`. And `parseInt("12px", 10)` takes the number from the start of the text.'),
          ex: 'const fromForm = "120";\nconsole.log(fromForm + 5);          // "1205": text joined!\nconsole.log(Number(fromForm) + 5);  // 125\nconsole.log(Number("abc"), Number.isNaN(Number("abc")));\nconsole.log(parseInt("12px", 10), String(99) + "!");', run: 'js' },
        { h: B('truthy وfalsy', 'Truthy and falsy'),
          p: B('في الشروط JS بيحوّل أي قيمة لـ true أو false. القيم اللي بتعتبر **false** (اسمها falsy) ست بس: `false` و`0` و`""` (نص فاضي) و`null` و`undefined` و`NaN`. أي حاجة تانية **truthy** — حتى `"0"` و`"false"` (نصوص مش فاضية) و`[]`. ده مهم لما تفحص «الحقل ده فيه قيمة؟».',
            'In conditions JS turns any value into true or false. The values that count as **false** (called falsy) are only six: `false`, `0`, `""` (empty text), `null`, `undefined` and `NaN`. Everything else is **truthy** — even `"0"` and `"false"` (non-empty text) and `[]`. This matters when you check «does this field have a value?».'),
          ex: 'const values = [0, "", null, undefined, NaN, "0", "false", [], 42];\nfor (const v of values) {\n  console.log(JSON.stringify(v) ?? String(v), "→", Boolean(v));\n}', run: 'js' }
      ],
      practice: [
        B('اطبع `typeof` لـ 8 قيم مختلفة منهم `null` و`[]` و`{}` و`"5"`.', 'Print `typeof` for 8 different values, including `null`, `[]`, `{}` and `"5"`.'),
        B('اعمل 5 أرقام جاية كنصوص من «فورم» وحوّلهم بـ `Number` واجمعهم.', 'Make 5 numbers that arrive as text from a «form», convert them with `Number` and add them up.'),
        B('جرّب `Number` على 6 نصوص: `"12"` و`" 12 "` و`"12.5"` و`"12px"` و`""` و`"abc"`، واكتب النتايج.', 'Try `Number` on 6 strings: `"12"`, `" 12 "`, `"12.5"`, `"12px"`, `""`, `"abc"`, and write down the results.'),
        B('اكتب في جدول: القيم الست الـ falsy، و5 قيم truthy ممكن تفتكرها falsy غلط.', 'Make a table: the six falsy values, and 5 truthy values you might wrongly think are falsy.'),
        B('اعمل كائن عميل ناقص فيه email واطبع `customer.email` وشوف undefined.', 'Make a customer object without an email, print `customer.email` and see undefined.'),
        B('اكتب سطر بيحوّل `"true"` النص لـ boolean صح (تلميح: قارن بـ `=== "true"`).', 'Write a line that turns the text `"true"` into a correct boolean (hint: compare with `=== "true"`).')
      ],
      code: [
        { u: B('تنضيف رقم جاي من برّه', 'Cleaning a number from outside'), p: 'function toNumber(value) {\n  const n = Number(String(value).trim());\n  return Number.isNaN(n) ? null : n;\n}\nconsole.log(toNumber(" 450 "), toNumber("4.5"), toNumber("n/a"));' }
      ],
      words: [
        { t: 'data type', m: B('نوع القيمة: رقم ولا نص ولا boolean...', 'the kind of a value: number, string, boolean...'), ex: 'typeof 5 → "number"' },
        { t: 'string', m: B('نص بين علامات تنصيص', 'text inside quotes'), ex: '"Cairo"' },
        { t: 'boolean', m: B('قيمة true أو false بس', 'a value that is only true or false'), ex: 'const isPaid = true;' },
        { t: 'null', m: B('قيمة فاضية بقصد', 'an intentionally empty value'), ex: 'const coupon = null;' },
        { t: 'NaN', m: B('«مش رقم»: ناتج عملية حسابية فشلت', '«Not a Number»: the result of a failed calculation'), ex: 'Number("abc") → NaN' },
        { t: 'type conversion', m: B('تحويل قيمة من نوع لنوع', 'changing a value from one type to another'), ex: 'Number("42")' },
        { t: 'falsy', m: B('قيمة بتعتبر false في الشروط', 'a value treated as false in conditions'), ex: '0, "", null, undefined, NaN' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('JavaScript Fundamentals: Data types وType Conversions.', 'JavaScript Fundamentals: Data types and Type Conversions.') },
        { lib: 'MDN: JavaScript Guide', what: B('Grammar and types: Data structures and types.', 'Grammar and types: Data structures and types.') }],
      challenge: B('اكتب دالة صغيرة `describe(value)` بتطبع القيمة ونوعها وهل هي truthy ولا falsy، وجرّبها على 10 قيم من بيانات حقيقية (سعر كنص، تليفون، حقل فاضي، null...).', 'Write a small function `describe(value)` that prints the value, its type and whether it is truthy or falsy, and try it on 10 values from real data (a price as text, a phone number, an empty field, null...).'),
      quiz: [
        { q: B('`typeof null` بيرجّع:', '`typeof null` returns:'), o: ['"object"', '"null"', '"undefined"'], a: 0, why: B('غلطة قديمة في اللغة.', 'An old mistake in the language.') },
        { q: B('`"10" + 5` بيدّي:', '`"10" + 5` gives:'), o: ['"105"', '15', 'NaN'], a: 0, why: B('+ مع نص بيلزق.', '+ with text joins.') },
        { q: B('أنهي قيمة truthy؟', 'Which value is truthy?'), o: ['"0"', '0', '""'], a: 0, why: B('نص مش فاضي = truthy.', 'A non-empty string is truthy.') },
        { q: B('`Number("abc")` بيدّي:', '`Number("abc")` gives:'), o: ['NaN', '0', 'null'], a: 0, why: B('مش رقم.', 'Not a number.') }
      ] },

    { title: B('تجهيز جهازك: VS Code وNode.js وملفات JS', 'Setting up: VS Code, Node.js and JS files'),
      goal: B('تثبّت VS Code وNode.js، وتشغّل ملف JS من الطرفية، وتربط ملف JS بصفحة HTML، وتعرف الفرق بين البيئتين.', 'Install VS Code and Node.js, run a JS file from the terminal, link a JS file to an HTML page, and know the difference between the two environments.'),
      learn: [
        { h: B('VS Code: المحرر', 'VS Code: the editor'),
          p: B('حمّل **Visual Studio Code** من code.visualstudio.com (مجاني). افتح فولدر لمشروعك من File → Open Folder. أهم اختصارات: Ctrl+S حفظ، وCtrl+` يفتح الطرفية جوه المحرر، وShift+Alt+F ينسّق الكود، وCtrl+/ يعمل تعليق. ثبّت إضافة **Prettier** للتنسيق و**ESLint** بعدين. المحرر بيلوّن الكود ويكمّل الكلام وبيعلّم على الأخطاء قبل ما تشغّل.',
            'Download **Visual Studio Code** from code.visualstudio.com (free). Open a folder for your project with File → Open Folder. Key shortcuts: Ctrl+S saves, Ctrl+` opens the terminal inside the editor, Shift+Alt+F formats the code, and Ctrl+/ comments a line. Install the **Prettier** extension for formatting, and **ESLint** later. The editor colours your code, completes words and marks mistakes before you run.'),
          ex: '// Save this as hello.js in your project folder:\nconst who = "world";\nconsole.log(`Hello, ${who}!`);\n// Then in the terminal (Ctrl+`):  node hello.js', show: 1, lang: 'js' },
        { h: B('Node.js: تشغيل JS على جهازك', 'Node.js: running JS on your computer'),
          p: B('حمّل نسخة **LTS** من nodejs.org وثبّتها. اتأكد من الطرفية: `node -v` و`npm -v` (لازم يطلعوا أرقام). بعدها أي ملف `.js` تشغّله بـ `node اسم_الملف.js`. Node ملوش صفحة ولا أزرار: مفيش `document` ولا `window`، لكن عنده الملفات والشبكة والعمليات — وده اللي محتاجينه للأتمتة. اكتب `node` لوحده وانت تدخل وضع تجريبي (REPL) زي الـ Console، وتخرج بـ Ctrl+C مرتين.',
            'Download the **LTS** version from nodejs.org and install it. Check in the terminal: `node -v` and `npm -v` (both should print numbers). Then run any `.js` file with `node file_name.js`. Node has no page and no buttons: there is no `document` or `window`, but it has files, the network and processes — which is what automation needs. Type `node` on its own to enter a try-out mode (the REPL), like the Console, and leave with Ctrl+C twice.'),
          ex: '// node-info.mjs — run with: node node-info.mjs\nconsole.log("Node version:", process.version);\nconsole.log("Platform:", process.platform);\nconsole.log("Folder:", process.cwd());', node: 1, lang: 'js' },
        { h: B('ربط JS بصفحة HTML', 'Linking JS to an HTML page'),
          p: B('في المتصفح JS بيتحط في الصفحة بوسم `<script>`. الأحسن تحطه في ملف لوحده: `<script src="app.js" defer></script>` في الـ head. `defer` يعني «استنى لما الصفحة كلها تتقري وبعدين شغّل»، فتقدر تلاقي عناصر الصفحة. افتح ملف الـ HTML في المتصفح بدبل كليك، وافتح F12 تشوف اللي اتطبع. لما تعدّل ملف JS، اعمل Refresh (F5).',
            'In the browser JS goes into the page with a `<script>` tag. It is better in a file of its own: `<script src="app.js" defer></script>` in the head. `defer` means «wait until the whole page is read, then run», so your code can find the page’s elements. Open the HTML file in the browser by double-clicking, and open F12 to see what was printed. When you change the JS file, refresh (F5).'),
          ex: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>My first script</title>\n  <script>\n    console.log("Running inside the page");\n    document.addEventListener("DOMContentLoaded", () => {\n      document.querySelector("h1").textContent = "Changed by JavaScript ✓";\n    });\n  </script>\n</head>\n<body>\n  <h1>Original title</h1>\n  <p>The heading above was written by HTML, then changed by JS.</p>\n</body>\n</html>', run: 'html' },
        { h: B('الفرق بين المتصفح وNode', 'Browser versus Node'),
          p: B('اللغة واحدة، بس **الأدوات حواليها مختلفة**. في المتصفح عندك `document` (الصفحة) و`window` و`localStorage` و`fetch`. في Node عندك `process` (البرنامج والمتغيرات) والموديولات `fs` (الملفات) و`path` و`http`، وكمان `fetch`. في n8n عندك `$json` و`$input` و`$now` جوه Code node. لما مثال يقولك `document is not defined` يبقى بتشغّل كود متصفح في Node.',
            'The language is the same, but **the tools around it differ**. In the browser you have `document` (the page), `window`, `localStorage` and `fetch`. In Node you have `process` (the program and its variables) and the modules `fs` (files), `path` and `http`, plus `fetch`. In n8n you have `$json`, `$input` and `$now` inside the Code node. When an example says `document is not defined`, you are running browser code in Node.'),
          ex: 'const inBrowser = typeof window !== "undefined" && typeof document !== "undefined";\nconst inNode = typeof process !== "undefined" && !!process.versions?.node;\nconsole.log("browser?", inBrowser, "node?", inNode);', run: 'js' },
        { h: B('فولدر مشروع منظّم', 'A tidy project folder'),
          p: B('اعمل فولدر لكل مشروع، وجواه: `index.html` و`style.css` و`app.js` للصفحات، أو `main.js` و`data/` لسكربتات Node. اكتب `npm init -y` في الطرفية يعمل ملف `package.json` بيوصف المشروع (هتحتاجه لما تثبّت مكتبات). سمّي الملفات بحروف صغيرة وشرطة: `price-report.js` مش `Price Report final2.js`. ولو حاطط أسرار (مفاتيح API) متكتبهاش في الكود — هنتعلّم `.env` بعدين.',
            'Make a folder for each project, holding `index.html`, `style.css` and `app.js` for pages, or `main.js` and `data/` for Node scripts. Type `npm init -y` in the terminal to create a `package.json` file describing the project (you will need it when you install libraries). Name files in lower case with dashes: `price-report.js`, not `Price Report final2.js`. And never write secrets (API keys) in the code — we will learn `.env` later.'),
          ex: 'my-first-project/\n  index.html     ← the page\n  style.css      ← how it looks\n  app.js         ← what it does\n  package.json   ← made by: npm init -y\n  scripts/\n    report.js    ← a Node script: node scripts/report.js', show: 1, lang: 'text' }
      ],
      practice: [
        B('ثبّت VS Code وافتح فولدر جديد اسمه `js-journey`.', 'Install VS Code and open a new folder called `js-journey`.'),
        B('ثبّت Node.js LTS واكتب `node -v` و`npm -v` وصوّر الناتج.', 'Install Node.js LTS, run `node -v` and `npm -v`, and take a screenshot of the output.'),
        B('اعمل `hello.js` وشغّله بـ `node hello.js`.', 'Create `hello.js` and run it with `node hello.js`.'),
        B('اعمل `index.html` و`app.js` مربوطين بـ `defer`، وخلي app.js يغيّر عنوان الصفحة.', 'Create `index.html` and `app.js` linked with `defer`, and make app.js change the page heading.'),
        B('اكتب `node` لوحده وجرّب 5 أسطر في الـ REPL وبعدين اخرج.', 'Type `node` on its own, try 5 lines in the REPL, then leave.'),
        B('اكتب `npm init -y` وافتح `package.json` واقرا الحقول اللي فيه.', 'Run `npm init -y`, open `package.json` and read its fields.')
      ],
      code: [
        { u: B('أوامر الطرفية اللي هتحتاجها', 'The terminal commands you will need'), p: 'node -v                 # is Node installed?\nnode hello.js           # run a file\nnode                    # the REPL (Ctrl+C twice to leave)\nnpm init -y             # create package.json\ncd my-project           # go into a folder\nls      (dir on Windows) # list the files' }
      ],
      words: [
        { t: 'editor', m: B('برنامج كتابة الكود (زي VS Code)', 'a program for writing code (like VS Code)'), ex: 'Open the folder in your editor' },
        { t: 'terminal', m: B('شاشة الأوامر النصية', 'the text command window'), ex: 'Run it from the terminal' },
        { t: 'runtime', m: B('البيئة اللي بتشغّل الكود (المتصفح أو Node)', 'the environment that runs the code (the browser or Node)'), ex: 'Node.js is a JavaScript runtime' },
        { t: 'LTS', m: B('نسخة مدعومة لفترة طويلة (Long-Term Support): الأكثر استقرارًا', 'a long-term support release: the most stable one'), ex: 'Install Node 22 LTS' },
        { t: 'REPL', m: B('وضع تجريبي بيقرا سطر وينفّذه ويطبع النتيجة', 'a try-out mode that reads a line, runs it and prints the result'), ex: 'Type node to open the REPL' },
        { t: 'script tag', m: B('وسم `<script>` اللي بيحط JS في صفحة HTML', 'the `<script>` tag that puts JS in an HTML page'), ex: '<script src="app.js" defer></script>' },
        { t: 'package.json', m: B('ملف بيوصف مشروع Node ومكتباته وأوامره', 'a file describing a Node project, its libraries and its commands'), ex: 'npm init -y' }
      ],
      read: [{ lib: 'Node.js: Learn', what: B('Getting Started: Introduction to Node.js وHow to install Node.js.', 'Getting Started: Introduction to Node.js and How to install Node.js.') },
        { lib: 'Visual Studio Code docs', what: B('Getting Started: Intro videos (أول فيديوهين) وJavaScript in VS Code.', 'Getting Started: the first two intro videos, and JavaScript in VS Code.') }],
      challenge: B('اعمل مشروع فيه صفحة HTML وملف `app.js` بيكتب في الصفحة التاريخ والوقت دلوقتي، وسكربت Node منفصل `info.js` بيطبع نسخة Node والفولدر الحالي — وشغّل الاتنين.', 'Build a project with an HTML page and an `app.js` file that writes the current date and time into the page, plus a separate Node script `info.js` that prints the Node version and the current folder — and run both.'),
      quiz: [
        { q: B('إزاي تشغّل ملف hello.js بـ Node؟', 'How do you run hello.js with Node?'), o: ['node hello.js', 'run hello.js', 'npm hello.js'], a: 0, why: B('node واسم الملف.', 'node and the file name.') },
        { q: B('`defer` في وسم script معناها:', '`defer` on a script tag means:'), o: [B('شغّل بعد ما الصفحة تتقري', 'run after the page is read'), B('متشغّلش خالص', 'never run'), B('شغّل مرتين', 'run twice')], a: 0, why: B('عشان تلاقي العناصر.', 'So the elements exist.') },
        { q: B('`document is not defined` بتظهر لما:', '`document is not defined` appears when:'), o: [B('تشغّل كود متصفح في Node', 'you run browser code in Node'), B('تنسى ;', 'you forget a ;'), B('الملف كبير', 'the file is big')], a: 0, why: B('Node ملوش صفحة.', 'Node has no page.') },
        { q: B('`npm init -y` بيعمل:', '`npm init -y` creates:'), o: ['package.json', 'index.html', 'node_modules'], a: 0, why: B('ملف وصف المشروع.', 'The project description file.') }
      ] },

    { title: B('أول برامج حقيقية: مدخلات ومخرجات', 'First real programs: input and output'),
      goal: B('تكتب برامج صغيرة بتاخد مدخلات (من خانة في صفحة أو من سطر الأوامر في Node) وتحسب وتطبع ناتج مرتّب.', 'Write small programs that take input (from a box on a page or from the command line in Node), calculate, and print a tidy result.'),
      learn: [
        { h: B('برنامج = مدخلات ← معالجة ← مخرجات', 'A program = input → processing → output'),
          p: B('أي أداة أتمتة بتمشي بنفس الشكل: **تاخد** بيانات (فورم، ملف، webhook)، **تعالجها** (تحسب، تنضّف، تقارن)، و**تطلّع** نتيجة (رسالة، ملف، طلب لـ API). قبل ما تكتب كود، اكتب في 3 أسطر: المدخلات إيه، هعمل فيها إيه، والمخرجات شكلها إيه. ده بيوفّر عليك نص الوقت.',
            'Every automation tool follows the same shape: it **takes** data (a form, a file, a webhook), **processes** it (calculates, cleans, compares) and **produces** a result (a message, a file, a request to an API). Before you write code, write three lines: what the input is, what I will do with it, and what the output looks like. It saves you half the time.'),
          ex: '// input\nconst celsius = 31;\n// processing\nconst fahrenheit = celsius * 9 / 5 + 32;\n// output\nconsole.log(`${celsius}°C is ${fahrenheit}°F`);', run: 'js' },
        { h: B('مدخلات من صفحة: خانة وزرار', 'Input from a page: a box and a button'),
          p: B('في المتصفح المستخدم بيكتب في `<input>` ويدوس زرار. JS بيقرا القيمة بـ `input.value` (ودايمًا **نص**، فحوّلها لرقم) ويكتب النتيجة في الصفحة بـ `textContent`. ده أول شكل لـ «أداة» بتعملها لزميل مش مبرمج: صفحة بتحسب حاجة بضغطة. هنتعمّق في الـ DOM في الشهر التالت.',
            'In the browser the user types into an `<input>` and presses a button. JS reads the value with `input.value` (always **text**, so convert it to a number) and writes the result into the page with `textContent`. This is the first shape of a «tool» you build for a colleague who does not code: a page that calculates something in one click. We go deep into the DOM in month 3.'),
          ex: 'const box = document.querySelector("#price");\nconst out = document.querySelector("#result");\ndocument.querySelector("#calc").addEventListener("click", () => {\n  const price = Number(box.value);\n  out.textContent = Number.isNaN(price) ? "Please type a number" : "With VAT: " + (price * 1.14).toFixed(2);\n});\nbox.value = "250";\ndocument.querySelector("#calc").click();\nconsole.log(out.textContent);', run: 'js',
          html: '<label>Price <input id="price"></label> <button id="calc">Calculate</button><p id="result"></p>' },
        { h: B('مدخلات في Node: process.argv', 'Input in Node: process.argv'),
          p: B('سكربت Node بياخد مدخلات من سطر الأوامر: `node vat.mjs 250 0.14`. القيم دي في `process.argv` (مصفوفة): أول اتنين هما مسار node والسكربت، والمدخلات من الخانة التالتة. `process.argv.slice(2)` بيدّيك مدخلاتك بس — وكلهم نصوص. كده تقدر تشغّل نفس السكربت بقيم مختلفة، أو n8n يشغّله بـ Execute Command.',
            'A Node script takes input from the command line: `node vat.mjs 250 0.14`. Those values are in `process.argv` (an array): the first two are the path of node and of the script, and your inputs start at the third. `process.argv.slice(2)` gives you only your inputs — all as text. This way you run the same script with different values, or n8n runs it with Execute Command.'),
          ex: '// vat.mjs — try: node vat.mjs 250 0.14\nconst [priceText = "100", rateText = "0.14"] = process.argv.slice(2);\nconst price = Number(priceText);\nconst rate = Number(rateText);\nconsole.log("price:", price, "rate:", rate);\nconsole.log("total:", (price * (1 + rate)).toFixed(2));', node: 1, lang: 'js', args: ['250', '0.14'] },
        { h: B('ناتج مرتّب: toFixed وpadEnd', 'Tidy output: toFixed and padEnd'),
          p: B('الأرقام في الفلوس لازم تتقرّب: `(285.5).toFixed(2)` بيدّي `"285.50"` (نص). عشان تعمل أعمدة مترتبة في الطرفية استخدم `padEnd(12)` (يكمّل بمسافات من اليمين) و`padStart(8)` (من الشمال). و`toLocaleString("en")` بيحط فواصل الآلاف: `1,234,567`. الناتج المرتّب بيخلي التقرير يتقري في ثانية.',
            'Money must be rounded: `(285.5).toFixed(2)` gives `"285.50"` (text). To line up columns in the terminal use `padEnd(12)` (fills with spaces on the right) and `padStart(8)` (on the left). And `toLocaleString("en")` adds thousands separators: `1,234,567`. Tidy output makes a report readable in a second.'),
          ex: 'const lines = [["Notebook", 3, 45], ["Pen Pro", 10, 30], ["Backpack", 1, 650]];\nlet total = 0;\nfor (const [name, qty, price] of lines) {\n  const sum = qty * price;\n  total += sum;\n  console.log(name.padEnd(10) + String(qty).padStart(4) + sum.toFixed(2).padStart(10));\n}\nconsole.log("TOTAL".padEnd(14) + total.toFixed(2).padStart(10));\nconsole.log((1234567.891).toLocaleString("en"));', run: 'js' },
        { h: B('حساب الوقت والتاريخ ببساطة', 'Simple time and date maths'),
          p: B('`new Date()` بيدّيك اللحظة دي. `Date.now()` بيدّي الوقت بالمللي ثانية من 1970 — مفيد تطرح وقتين. يوم = `24 * 60 * 60 * 1000` مللي ثانية. `getFullYear()` و`getMonth()` (بيبدأ من **0** يعني يناير = 0!) و`getDate()` لليوم. هنتعلم Intl وLuxon للتواريخ الجد بعدين، بس ده كفاية لحساب «فاضل كام يوم».',
            '`new Date()` gives you this moment. `Date.now()` gives the time in milliseconds since 1970 — handy for subtracting two times. One day = `24 * 60 * 60 * 1000` ms. `getFullYear()`, `getMonth()` (starts at **0**, so January = 0!) and `getDate()` for the day. We will learn Intl and Luxon for serious dates later, but this is enough to count «how many days are left».'),
          ex: 'const now = new Date();\nconsole.log(now.getFullYear(), now.getMonth() + 1, now.getDate());\nconst due = new Date("2026-12-31T00:00:00Z");\nconst days = Math.ceil((due - now) / (24 * 60 * 60 * 1000));\nconsole.log("Days until the end of 2026:", days);', run: 'js' }
      ],
      practice: [
        B('اعمل صفحة فيها خانتين (السعر والكمية) وزرار بيطبع الإجمالي بالضريبة في الصفحة.', 'Build a page with two boxes (price and quantity) and a button that prints the total with VAT on the page.'),
        B('اعمل سكربت Node بياخد اسم ومبلغ من سطر الأوامر ويطبع رسالة شكر بالمبلغ متقرّب.', 'Write a Node script that takes a name and an amount from the command line and prints a thank-you message with the amount rounded.'),
        B('اطبع جدول 5 منتجات بأعمدة مترتبة بـ padEnd وpadStart.', 'Print a table of 5 products with columns lined up using padEnd and padStart.'),
        B('احسب فاضل كام يوم على عيد ميلادك الجاي.', 'Work out how many days are left until your next birthday.'),
        B('اكتب قبل كل برنامج 3 أسطر تعليق: المدخلات، والمعالجة، والمخرجات.', 'Before each program write three comment lines: input, processing, output.'),
        B('خلي برنامج الصفحة يعرض رسالة واضحة لو المستخدم كتب حروف بدل أرقام.', 'Make the page program show a clear message when the user types letters instead of numbers.')
      ],
      code: [
        { u: B('قالب برنامج صغير', 'A small program template'), p: '// INPUT:      what comes in, and from where\n// PROCESS:    what we do with it\n// OUTPUT:     what comes out, and how it looks\nconst input = "…";\nconst result = input; // process here\nconsole.log(result);' }
      ],
      words: [
        { t: 'input', m: B('البيانات اللي داخلة للبرنامج', 'the data going into a program'), ex: 'input.value' },
        { t: 'output', m: B('النتيجة اللي البرنامج بيطلّعها', 'the result a program produces'), ex: 'console.log(result)' },
        { t: 'argument', m: B('قيمة بتتبعت لدالة أو لسكربت', 'a value passed to a function or a script'), ex: 'node vat.mjs 250' },
        { t: 'toFixed', m: B('بيقرّب رقم لعدد خانات عشرية ويرجّعه نص', 'rounds a number to a number of decimals and returns text'), ex: '(9.5).toFixed(2) → "9.50"' },
        { t: 'timestamp', m: B('لحظة زمنية متخزنة كرقم (مللي ثانية من 1970)', 'a moment stored as a number (ms since 1970)'), ex: 'Date.now()' },
        { t: 'event listener', m: B('كود بيستنى حدث (زي ضغطة) وينفّذ', 'code that waits for an event (like a click) and runs'), ex: 'btn.addEventListener("click", …)' },
        { t: 'command line', m: B('سطر الأوامر في الطرفية', 'the command line in the terminal'), ex: 'node report.js --month=9' }
      ],
      read: [{ lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 1: Values, Types, and Operators وأول نص من Chapter 2.', 'Chapter 1: Values, Types, and Operators, and the first half of Chapter 2.') },
        { lib: 'Node.js: Learn', what: B('Command Line: Run Node.js scripts from the command line وHow to read environment variables.', 'Command Line: Run Node.js scripts from the command line, and How to read environment variables.') }],
      challenge: B('اعمل «حاسبة عمولة مبيعات» بنسختين: صفحة HTML بخانات (المبيعات، ونسبة العمولة) وزرار، وسكربت Node بياخد نفس القيم من سطر الأوامر — والاتنين يطبعوا العمولة والصافي متقرّبين ومنسّقين، ويرفضوا المدخلات الغلط برسالة.', 'Build a «sales commission calculator» in two versions: an HTML page with boxes (sales and commission rate) and a button, and a Node script taking the same values from the command line — both printing the commission and the net amount rounded and formatted, and rejecting bad input with a message.'),
      quiz: [
        { q: B('`input.value` بيرجّع:', '`input.value` returns:'), o: [B('نص دايمًا', 'always text'), B('رقم دايمًا', 'always a number'), 'boolean'], a: 0, why: B('حوّله بـ Number.', 'Convert it with Number.') },
        { q: B('مدخلاتك في Node موجودة في:', 'Your inputs in Node are in:'), o: ['process.argv.slice(2)', 'process.input', 'window.args'], a: 0, why: B('أول خانتين لـ node والسكربت.', 'The first two are node and the script.') },
        { q: B('`(12.5).toFixed(2)` بيدّي:', '`(12.5).toFixed(2)` gives:'), o: ['"12.50"', '12.5', '13'], a: 0, why: B('نص بخانتين عشريتين.', 'Text with two decimals.') },
        { q: B('`new Date().getMonth()` لشهر يناير:', '`new Date().getMonth()` for January:'), o: ['0', '1', '12'], a: 0, why: B('الشهور بتبدأ من 0.', 'Months start at 0.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تجمع الأسبوع كله في أداة حقيقية صغيرة، وتعدّي اختبار الأسبوع.', 'Bring the whole week together in a small real tool, and pass the weekly test.'),
      review: [
        B('جافاسكريبت بتشتغل في المتصفح وNode.js وn8n، ونفس اللغة في الثلاثة.', 'JavaScript runs in the browser, Node.js and n8n — the same language in all three.'),
        B('`console.log` عينك على الكود، والـ Console (F12) أسرع مكان للتجربة.', '`console.log` is your eye on the code, and the Console (F12) is the fastest place to try things.'),
        B('const افتراضيًا، وlet لما القيمة هتتغير، وvar لأ.', 'const by default, let when the value changes, never var.'),
        B('الأنواع: number وstring وboolean وnull وundefined، و`typeof` يكشفهم (`typeof null` = "object").', 'Types: number, string, boolean, null and undefined, detected with `typeof` (`typeof null` is "object").'),
        B('البيانات اللي من برّه نص: حوّل بـ `Number()` وافحص NaN.', 'Data from outside is text: convert with `Number()` and check for NaN.'),
        B('الـ falsy ست قيم: false و0 و"" وnull وundefined وNaN.', 'The six falsy values: false, 0, "", null, undefined and NaN.'),
        B('Node: `node file.js`، والمدخلات في `process.argv.slice(2)`.', 'Node: `node file.js`, with inputs in `process.argv.slice(2)`.'),
        B('في الصفحة: `<script src defer>`، وinput.value نص، والناتج بـ textContent.', 'On a page: `<script src defer>`, input.value is text, output with textContent.')
      ],
      project: B('**مشروع الأسبوع: حاسبة عرض سعر لعميل.** اعمل نسختين:\n1. **صفحة HTML** فيها خانات: اسم العميل، وسعر الوحدة، والكمية، ونسبة الخصم. زرار «احسب» يكتب في الصفحة: الإجمالي قبل الخصم، والخصم، والضريبة 14%، والإجمالي النهائي — كلهم متقرّبين بخانتين، مع رسالة واضحة لو أي خانة مش رقم.\n2. **سكربت Node** `quote.mjs` بياخد نفس القيم من سطر الأوامر ويطبع عرض السعر كجدول مترتب بـ padEnd/padStart.\nاكتب تعليق المدخلات/المعالجة/المخرجات فوق كل نسخة، وكل القيم الثابتة const بأسماء camelCase.',
        '**Weekly project: a price-quote calculator for a customer.** Build two versions:\n1. **An HTML page** with boxes: customer name, unit price, quantity and discount rate. A «Calculate» button writes onto the page: the total before discount, the discount, the 14% VAT and the final total — all rounded to two decimals, with a clear message when any box is not a number.\n2. **A Node script** `quote.mjs` taking the same values from the command line and printing the quote as a table lined up with padEnd/padStart.\nWrite the input/processing/output comment above each version, and make every fixed value a camelCase const.'),
      test: [
        { q: B('أنهي واحدة **مش** مكان بتشتغل فيه جافاسكريبت؟', 'Which one is **not** a place JavaScript runs?'), o: ['Microsoft Word macros (VBA)', 'Node.js', B('Code node في n8n', 'the n8n Code node')], a: 0, why: B('ماكرو Word بيستخدم VBA.', 'Word macros use VBA.') },
        { q: B('`const x = 5; x = 6;` بيدّي:', '`const x = 5; x = 6;` gives:'), o: ['TypeError', '6', '5'], a: 0, why: B('const ممنوع تعيد تعيينه.', 'A const cannot be reassigned.') },
        { q: B('`typeof "42"`:', '`typeof "42"`:'), o: ['"string"', '"number"', '"text"'], a: 0, why: B('بين علامات تنصيص = نص.', 'In quotes, it is a string.') },
        { q: B('`Number(" 7 ")`:', '`Number(" 7 ")`:'), o: ['7', 'NaN', '" 7 "'], a: 0, why: B('Number بيتجاهل المسافات على الأطراف.', 'Number ignores spaces at the ends.') },
        { q: B('أنهي قيمة falsy؟', 'Which value is falsy?'), o: ['0', '"0"', '[]'], a: 0, why: B('صفر falsy، والنص "0" لأ.', 'Zero is falsy; the text "0" is not.') },
        { q: B('الخاصية الناقصة في كائن قيمتها:', 'A missing property on an object is:'), o: ['undefined', 'null', '0'], a: 0, why: B('undefined = لسه مفيش قيمة.', 'undefined means no value yet.') },
        { q: B('اسم المتغير الأحسن لإجمالي الطلب:', 'The best variable name for an order total:'), o: ['orderTotal', 'x', 'OrderTotal2'], a: 0, why: B('camelCase وبيقول القيمة إيه.', 'camelCase and says what it is.') },
        { q: B('`"5" + 3`:', '`"5" + 3`:'), o: ['"53"', '8', 'NaN'], a: 0, why: B('+ مع نص بيلزق.', '+ with text joins.') },
        { q: B('أول مدخل بتاعك في سكربت Node:', 'Your first input in a Node script:'), o: ['process.argv[2]', 'process.argv[0]', 'process.argv[1]'], a: 0, why: B('0 هو node و1 هو السكربت.', '0 is node and 1 is the script.') },
        { q: B('`defer` بيخلي السكربت:', '`defer` makes the script:'), o: [B('يستنى لما الصفحة تتقري', 'wait until the page is read'), B('يشتغل أسرع من الصفحة', 'run before the page'), B('ميشتغلش', 'not run')], a: 0, why: B('عشان العناصر تكون موجودة.', 'So the elements exist.') },
        { q: B('`(3.14159).toFixed(2)`:', '`(3.14159).toFixed(2)`:'), o: ['"3.14"', '3.14159', '"3.1"'], a: 0, why: B('خانتين عشريتين كنص.', 'Two decimals, as text.') },
        { q: B('التعليق الكويس بيقول:', 'A good comment says:'), o: [B('ليه الكود كده', 'why the code is so'), B('نفس الكود بالعربي', 'the same code in words'), B('اسمك', 'your name')], a: 0, why: B('الكود بيقول إيه.', 'The code says what.') }
      ] }
  ]
};
