// Python week 1 — Getting started: Python, variables and types.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('البداية: Python والمتغيرات والأنواع', 'Getting started: Python, variables and types'),
  goal: B('تثبّت Python وVS Code، وتكتب وتشغّل أول برامجك، وتفهم المتغيرات والأنواع الأساسية والعمليات الحسابية، وتاخد مدخلات من المستخدم، وتقرا رسالة الخطأ بدل ما تخاف منها.',
          'Install Python and VS Code, write and run your first programs, understand variables, the basic types and arithmetic, take input from the user, and read an error message instead of fearing it.'),
  days: [
    { title: B('Python إيه، وأول برنامج', 'What Python is, and your first program'),
      goal: B('تعرف Python بتستخدم في إيه في الأتمتة، وتثبّته، وتشغّل كود من الـ REPL ومن ملف.', 'Know what Python is used for in automation, install it, and run code from the REPL and from a file.'),
      learn: [
        { h: B('ليه Python للي بيأتمت؟', 'Why Python for automation?'),
          p: B('Python لغة سهلة القراية، ومعاها مكتبات جاهزة لكل حاجة: ملفات وExcel وإيميل ومواقع وAPIs وبيانات وذكاء اصطناعي. نفس اللغة بتشتغل جوه n8n (Code node)، وعلى السيرفر، وعلى جهازك. هدفنا في الرحلة دي: أي شغلانة بتتكرر على الكمبيوتر، تكتبلها سكربت يعملها لوحده.', 'Python reads easily and comes with ready libraries for everything: files, Excel, email, websites, APIs, data and AI. The same language runs inside n8n (the Code node), on a server and on your computer. The goal of this journey: any task you repeat on a computer, you write a script that does it for you.'),
          ex: '# a whole script that renames 300 photos is about 6 lines:\nfrom pathlib import Path\nfor i, f in enumerate(sorted(Path("photos").glob("*.jpg")), 1):\n    f.rename(f.with_name(f"trip-{i:03}.jpg"))' },
        { h: B('التثبيت والتأكد', 'Installing and checking'),
          p: B('نزّل آخر إصدار من python.org. على Windows علّم على «Add python.exe to PATH» في أول شاشة. بعدها افتح الطرفية واكتب `python --version` (أو `py --version` على Windows، أو `python3 --version` على Mac/Linux). لو طلع رقم الإصدار يبقى تمام.', 'Download the latest version from python.org. On Windows tick «Add python.exe to PATH» on the first screen. Then open a terminal and type `python --version` (or `py --version` on Windows, or `python3 --version` on Mac/Linux). If you see a version number you are set.'),
          ex: 'python --version\nPython 3.14.0\n\npy --version        # Windows launcher\npython3 --version   # macOS / Linux' },
        { h: B('الـ REPL والملف', 'The REPL and a file'),
          p: B('اكتب `python` لوحدها هيفتح الـ REPL (العلامة `>>>`): بتكتب سطر وتشوف نتيجته فورًا، ممتاز للتجربة. للبرامج الحقيقية بتكتب الكود في ملف `.py` وتشغّله بـ `python hello.py`. `exit()` بيخرّجك من الـ REPL.', 'Typing `python` alone opens the REPL (the `>>>` prompt): you type a line and see its result right away — great for trying things. Real programs go in a `.py` file you run with `python hello.py`. `exit()` leaves the REPL.'),
          ex: 'print("Hello, automation!")\nprint("Python can do maths:", 7 * 6)\nprint("This line runs after the one above it.")', run: 1 }
      ],
      practice: [
        B('ثبّت Python وتأكد من الإصدار بـ `python --version` (أو `py`).', 'Install Python and check the version with `python --version` (or `py`).'),
        B('افتح الـ REPL وجرّب 5 عمليات حسابية، وبعدين اخرج بـ `exit()`.', 'Open the REPL, try 5 calculations, then leave with `exit()`.'),
        B('اعمل فولدر `python-journey` وجواه ملف `hello.py` بيطبع اسمك ومدينتك في سطرين، وشغّله من الطرفية.', 'Create a `python-journey` folder with a `hello.py` file that prints your name and city on two lines, and run it from the terminal.'),
        B('شغّل المثال اللي فوق جوه الصفحة (▶ شغّل)، وبعدين دوس «عدّل الكود» وغيّر الرسالة وشغّله تاني.', 'Run the example above on the page (▶ Run), then press «Edit the code», change the message and run it again.')
      ],
      code: [
        { u: B('أول ملف بايثون', 'A first Python file'), p: '# hello.py\nprint("Hello! My name is Sara.")\nprint("I live in Cairo.")\nprint("I am learning Python to automate my work.")', run: 1 }
      ],
      words: [
        { t: 'interpreter', m: B('البرنامج اللي بيقرا كود Python وينفّذه سطر سطر', 'the program that reads Python code and runs it line by line'), ex: 'python hello.py runs hello.py with the interpreter.' },
        { t: 'REPL', m: B('شاشة تكتب فيها سطر وتشوف نتيجته فورًا (Read-Eval-Print Loop)', 'a prompt where you type a line and see its result at once (Read-Eval-Print Loop)'), ex: '>>> 2 + 3\n5' },
        { t: 'script', m: B('ملف كود بيتشغّل من أوله لآخره عشان يعمل مهمة', 'a code file that runs from top to bottom to do a task'), ex: 'python rename_photos.py' },
        { t: 'print()', m: B('دالة بتطبع اللي بتديهولها على الشاشة', 'a function that shows what you give it on the screen'), ex: 'print("Done!")' },
        { t: 'PATH', m: B('قايمة الفولدرات اللي النظام بيدوّر فيها على البرامج لما تكتب اسمها', 'the list of folders the system searches for a program when you type its name'), ex: "'python' is not recognized → Python is not on PATH." }
      ],
      read: ['lib:Python Setup and Usage', { lib: 'Python Tutorial (python.org)', what: B('اقرا الفصل 1 «Whetting Your Appetite» والفصل 2 «Using the Python Interpreter».', 'Read chapter 1 «Whetting Your Appetite» and chapter 2 «Using the Python Interpreter».') }],
      challenge: B('اكتب `about_me.py` بيطبع «كارت تعريف» من 5 سطور بين سطرين من علامة `=`، زي `print("=" * 30)`.', 'Write `about_me.py` that prints a 5-line «business card» between two lines of `=`, like `print("=" * 30)`.'),
      quiz: [
        { q: B('إزاي تشغّل ملف اسمه `report.py` من الطرفية؟', 'How do you run a file called `report.py` from the terminal?'), o: ['python report.py', 'run report.py', 'open report.py'], a: 0, why: B('بتدي الملف للـ interpreter بالأمر `python`.', 'You hand the file to the interpreter with the `python` command.') },
        { q: B('العلامة `>>>` معناها إيه؟', 'What does the `>>>` prompt mean?'), o: [B('انت جوه الـ REPL', 'you are in the REPL'), B('فيه خطأ', 'there is an error'), B('البرنامج خلص', 'the program finished')], a: 0, why: B('الـ REPL مستني تكتب سطر.', 'The REPL is waiting for a line.') },
        { q: B('ظهرلك `\'python\' is not recognized` على Windows. السبب الغالب؟', "Windows says `'python' is not recognized`. The usual cause?"), o: [B('Python مش على الـ PATH', 'Python is not on PATH'), B('الكود فيه غلط', 'the code has a bug'), B('النت فاصل', 'no internet')], a: 0, why: B('علّم «Add to PATH» وانت بتثبّت، أو استخدم `py`.', 'Tick «Add to PATH» when installing, or use `py`.') }
      ] },

    { title: B('المتغيرات والأنواع', 'Variables and types'),
      goal: B('تحفظ قيم في متغيرات بأسماء واضحة، وتعرف الأنواع الأساسية: int وfloat وstr وbool وNone.', 'Store values in clearly named variables and know the basic types: int, float, str, bool and None.'),
      learn: [
        { h: B('المتغير = اسم على قيمة', 'A variable is a name for a value'),
          p: B('`price = 120` معناها: اعمل اسم `price` وخليه يشاور على القيمة 120. تقدر تغيّره بعدين: `price = 150`. الاسم بالحروف الإنجليزي الصغيرة والـ `_` بين الكلمات (`total_price`)، ومينفعش يبدأ برقم ولا يكون فيه مسافة.', '`price = 120` means: make a name `price` that points at the value 120. You can change it later: `price = 150`. Names use lowercase letters with `_` between words (`total_price`); they cannot start with a digit or contain spaces.'),
          ex: 'customer_name = "Mona"\norders_count = 3\nprice = 120\nprice = price + 30   # now 150\nprint(customer_name, orders_count, price)', run: 1 },
        { h: B('الأنواع الأساسية', 'The basic types'),
          p: B('`int` رقم صحيح (5)، `float` رقم بكسر (5.5)، `str` نص بين علامات تنصيص ("Cairo")، `bool` صح أو غلط (`True`/`False`)، و`None` يعني «مفيش قيمة». الدالة `type()` بتقولك نوع أي قيمة.', '`int` is a whole number (5), `float` a number with a fraction (5.5), `str` text in quotes ("Cairo"), `bool` true or false (`True`/`False`), and `None` means «no value». `type()` tells you the type of any value.'),
          ex: 'print(type(5))\nprint(type(5.5))\nprint(type("Cairo"))\nprint(type(True))\nprint(type(None))', run: 1 },
        { h: B('Python بتعرف النوع لوحدها', 'Python works out the type itself'),
          p: B('مش بتكتب النوع قبل المتغير؛ Python بتعرفه من القيمة. نفس الاسم ممكن يشاور على نوع تاني بعدين، بس ده بيلخبط، فخلي كل متغير بنوع واحد. `"5"` نص و`5` رقم: `"5" + 5` غلط، و`"5" * 3` بيدي `"555"`.', 'You do not write the type before a variable; Python knows it from the value. A name could later point at another type, but that confuses readers, so keep one type per variable. `"5"` is text and `5` a number: `"5" + 5` fails, and `"5" * 3` gives `"555"`.'),
          ex: 'qty = 5\nlabel = "5"\nprint(qty * 3)     # 15\nprint(label * 3)   # 555\nprint(qty + int(label))  # 10', run: 1 }
      ],
      practice: [
        B('اعمل متغيرات لمنتج: الاسم والسعر والكمية وهل متاح (`bool`)، واطبع كل واحد مع `type()` بتاعه.', 'Make variables for a product: name, price, quantity and whether it is available (`bool`), and print each one with its `type()`.'),
        B('اكتب 5 أسماء متغيرات غلط (زي `2name` و`total price`) وجنبها الاسم الصح.', 'Write 5 wrong variable names (like `2name` and `total price`) and the right name next to each.'),
        B('غيّر قيمة متغير 3 مرات واطبعه بعد كل مرة عشان تشوف إن الاسم بيشاور على آخر قيمة.', 'Change a variable 3 times and print it after each change to see that the name points at the latest value.'),
        B('جرّب في الـ REPL `"5" + 5` واقرا رسالة الخطأ، وبعدين صلّحها بطريقتين.', 'Try `"5" + 5` in the REPL, read the error, then fix it in two ways.')
      ],
      code: [
        { u: B('بيانات طلب في متغيرات', 'An order as variables'), p: 'order_id = 1042\ncustomer = "Omar Adel"\nitem = "USB-C cable"\nunit_price = 85.5\nquantity = 2\npaid = False\nnotes = None\nprint(order_id, customer, item, unit_price * quantity, paid, notes)', run: 1 }
      ],
      words: [
        { t: 'variable', m: B('اسم بيشاور على قيمة محفوظة في الذاكرة', 'a name that points at a value in memory'), ex: 'total = 250' },
        { t: 'assignment', m: B('إنك تدي قيمة لمتغير بعلامة =', 'giving a variable a value with ='), ex: 'city = "Giza"' },
        { t: 'int', m: B('نوع الأرقام الصحيحة', 'the whole-number type'), ex: 'orders = 12' },
        { t: 'float', m: B('نوع الأرقام اللي فيها كسر عشري', 'the type for numbers with a decimal part'), ex: 'price = 99.75' },
        { t: 'str', m: B('نوع النصوص، بين علامات تنصيص', 'the text type, written in quotes'), ex: 'name = "Laila"' },
        { t: 'bool', m: B('نوع ليه قيمتين بس: True أو False', 'a type with only two values: True or False'), ex: 'is_paid = True' },
        { t: 'None', m: B('قيمة خاصة معناها «مفيش قيمة»', 'a special value meaning «no value»'), ex: 'discount = None' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 3.1.1 Numbers و3.1.2 Text من الفصل 3.', 'Read 3.1.1 Numbers and 3.1.2 Text in chapter 3.') }, 'lib:Python Tutor'],
      challenge: B('اكتب `profile.py` فيه 6 متغيرات عن نفسك من 4 أنواع مختلفة على الأقل، واطبعهم في جملة واحدة مع `print`.', 'Write `profile.py` with 6 variables about you of at least 4 different types, and print them in one `print` call.'),
      quiz: [
        { q: B('نوع `3.0` إيه؟', 'What is the type of `3.0`?'), o: ['float', 'int', 'str'], a: 0, why: B('فيه علامة عشرية، يبقى float.', 'It has a decimal point, so it is a float.') },
        { q: B('أنهي اسم متغير صحيح؟', 'Which variable name is valid?'), o: ['total_price', '2total', 'total price'], a: 0, why: B('مينفعش يبدأ برقم ولا فيه مسافة.', 'It cannot start with a digit or contain a space.') },
        { q: B('`"7" * 2` بيدي إيه؟', 'What does `"7" * 2` give?'), o: ['"77"', '14', B('خطأ', 'an error')], a: 0, why: B('ضرب نص في رقم بيكرّره.', 'Multiplying text by a number repeats it.') },
        { q: B('القيمة اللي معناها «مفيش قيمة» هي:', 'The value that means «no value» is:'), o: ['None', '0', '""'], a: 0, why: B('0 رقم و"" نص فاضي، لكن None معناها مفيش قيمة خالص.', '0 is a number and "" an empty text; None means no value at all.') }
      ] },

    { title: B('الحساب والمقارنة', 'Arithmetic and comparison'),
      goal: B('تستخدم العمليات الحسابية كلها (ومنها // و% و**)، وترتيبها، وتقارن قيم وتاخد True أو False.', 'Use every arithmetic operator (including //, % and **) and their order, and compare values to get True or False.'),
      learn: [
        { h: B('العمليات الحسابية', 'Arithmetic operators'),
          p: B('`+ - * /` زي ما انت عارف، و`/` دايمًا بترجّع float. `//` قسمة صحيحة (من غير الكسر)، و`%` باقي القسمة، و`**` أس. `%` مفيدة جدًا: `n % 2 == 0` يعني الرقم زوجي.', '`+ - * /` work as you expect, and `/` always returns a float. `//` is whole division (no fraction), `%` the remainder and `**` a power. `%` is very handy: `n % 2 == 0` means the number is even.'),
          ex: 'print(17 / 5)    # 3.4\nprint(17 // 5)   # 3\nprint(17 % 5)    # 2\nprint(2 ** 10)   # 1024\nminutes = 135\nprint(minutes // 60, "h", minutes % 60, "min")', run: 1 },
        { h: B('الترتيب والأقواس والتقريب', 'Order, brackets and rounding'),
          p: B('الضرب والقسمة قبل الجمع والطرح، والأس قبلهم كلهم. لو مش متأكد حط أقواس. `round(x, 2)` بيقرّب لرقمين بعد العلامة، مهم في الفلوس. الـ float مش دقيق 100%: `0.1 + 0.2` بيطلع `0.30000000000000004`.', 'Multiplication and division come before addition and subtraction, and powers before all of them. When unsure, add brackets. `round(x, 2)` rounds to two decimals — important for money. Floats are not exact: `0.1 + 0.2` gives `0.30000000000000004`.'),
          ex: 'print(2 + 3 * 4)       # 14\nprint((2 + 3) * 4)     # 20\nprint(0.1 + 0.2)\nprice = 199.99\nprint(round(price * 1.14, 2))', run: 1 },
        { h: B('المقارنة بترجّع bool', 'Comparisons return a bool'),
          p: B('`==` يساوي (اتنين `=`)، `!=` مش يساوي، و`< > <= >=`. النتيجة دايمًا `True` أو `False`، ودي اللي هنبني عليها الشروط الأسبوع الجاي. ماتلخبطش `=` (تخزين) مع `==` (مقارنة).', '`==` equals (two `=`), `!=` not equal, and `< > <= >=`. The result is always `True` or `False` — the base of next week’s conditions. Do not mix up `=` (store) and `==` (compare).'),
          ex: 'total = 1250\nprint(total > 1000)     # True\nprint(total == 1000)    # False\nprint("cairo" == "Cairo")  # False: case matters\nprint(3 != 4)', run: 1 }
      ],
      practice: [
        B('اكتب سكربت بيحوّل عدد ثواني (مثلًا 7384) لساعات ودقايق وثواني بـ `//` و`%`.', 'Write a script that turns a number of seconds (say 7384) into hours, minutes and seconds with `//` and `%`.'),
        B('احسب سعر منتج بعد خصم 15% وضريبة 14% وقرّب لرقمين.', 'Compute a product price after a 15% discount and 14% tax, rounded to two decimals.'),
        B('اطبع 5 مقارنات مختلفة ونتيجتها، منهم مقارنة نصين بحروف كبيرة وصغيرة.', 'Print 5 different comparisons and their results, including two texts that differ in case.'),
        B('اكتب ترتيب العمليات لـ `10 - 2 * 3 ** 2` على ورقة، وبعدين اتأكد في Python.', 'Work out the order of `10 - 2 * 3 ** 2` on paper, then check it in Python.')
      ],
      code: [
        { u: B('حاسبة مدة', 'A duration calculator'), p: 'seconds = 7384\nhours = seconds // 3600\nminutes = seconds % 3600 // 60\nrest = seconds % 60\nprint(hours, "h", minutes, "m", rest, "s")', run: 1 },
        { u: B('فاتورة صغيرة', 'A small invoice'), p: 'subtotal = 3 * 45 + 2 * 30\ndiscount = subtotal * 0.10\ntax = (subtotal - discount) * 0.14\nprint("Total:", round(subtotal - discount + tax, 2))', run: 1 }
      ],
      words: [
        { t: 'operator', m: B('رمز بيعمل عملية على قيم، زي + أو ==', 'a symbol that does an operation on values, like + or =='), ex: '7 * 6' },
        { t: 'floor division', m: B('قسمة بترجّع الجزء الصحيح بس (//)', 'division that keeps only the whole part (//)'), ex: '17 // 5  →  3' },
        { t: 'modulo', m: B('باقي القسمة (%)', 'the remainder of a division (%)'), ex: '17 % 5  →  2' },
        { t: 'expression', m: B('أي حاجة Python تحسبها وتطلع منها قيمة', 'anything Python evaluates to a value'), ex: 'price * qty + shipping' },
        { t: 'precedence', m: B('ترتيب تنفيذ العمليات في نفس السطر', 'the order operations run in within one line'), ex: '2 + 3 * 4 == 14' },
        { t: 'comparison', m: B('مقارنة بين قيمتين نتيجتها True أو False', 'a test between two values that gives True or False'), ex: 'age >= 18' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('ارجع لـ 3.1.1 Numbers وجرّب كل مثال في الـ REPL.', 'Go back to 3.1.1 Numbers and try every example in the REPL.') }, { lib: 'Built-in Functions', what: B('اقرا round وabs وdivmod.', 'Read round, abs and divmod.') }],
      challenge: B('اكتب `split_bill.py`: حساب مطعم 1340 جنيه، خدمة 12%، و5 أصحاب. اطبع نصيب كل واحد متقرّب لرقمين.', 'Write `split_bill.py`: a 1340 EGP restaurant bill, a 12% service charge and 5 friends. Print each share rounded to two decimals.'),
      quiz: [
        { q: B('`17 % 5` بيساوي:', '`17 % 5` equals:'), o: ['2', '3', '3.4'], a: 0, why: B('17 = 5×3 + 2، والباقي 2.', '17 = 5×3 + 2, so the remainder is 2.') },
        { q: B('`10 / 2` نوعه إيه؟', 'What type is `10 / 2`?'), o: ['float', 'int', 'str'], a: 0, why: B('`/` دايمًا بترجّع float: 5.0.', '`/` always returns a float: 5.0.') },
        { q: B('عشان تسأل «x يساوي 5؟» تكتب:', 'To ask «is x equal to 5?» you write:'), o: ['x == 5', 'x = 5', 'x := 5'], a: 0, why: B('`=` بيخزّن، و`==` بيقارن.', '`=` stores and `==` compares.') },
        { q: B('`2 + 3 * 4` بيساوي:', '`2 + 3 * 4` equals:'), o: ['14', '20', '24'], a: 0, why: B('الضرب الأول: 3×4=12 وبعدين +2.', 'Multiplication first: 3×4=12, then +2.') }
      ] },

    { title: B('المدخلات وتحويل الأنواع', 'Input and type conversion'),
      goal: B('تاخد بيانات من المستخدم بـ `input()`، وتحوّلها للنوع الصح، وتطبع نتايج واضحة بـ f-string.', 'Take data from the user with `input()`, convert it to the right type, and print clear results with an f-string.'),
      learn: [
        { h: B('input() بترجّع نص دايمًا', 'input() always returns text'),
          p: B('`name = input("Your name: ")` بتعرض الرسالة وتستنى المستخدم يكتب ويدوس Enter، والنتيجة **نص** حتى لو كتب رقم. عشان تحسب بيها لازم تحوّلها: `int()` أو `float()`. في الصفحة هنا، اللي هتكتبه لـ input() موجود في الخانة اللي تحت الكود.', '`name = input("Your name: ")` shows the message, waits for the user to type and press Enter, and the result is **text** even if they typed a number. To calculate with it you convert it: `int()` or `float()`. On this page, what input() reads is in the box under the code.'),
          ex: 'name = input("Your name: ")\nage = int(input("Your age: "))\nprint("Hello", name)\nprint("Next year you will be", age + 1)', run: 1, stdin: 'Sara\n27' },
        { h: B('التحويل بين الأنواع', 'Converting between types'),
          p: B('`int("42")` → 42، `float("3.5")` → 3.5، `str(42)` → "42"، `bool("")` → False. لو النص مش رقم، `int("abc")` بيطلّع `ValueError`. `int(3.9)` بيقص الكسر ويدي 3 (مش بيقرّب).', '`int("42")` → 42, `float("3.5")` → 3.5, `str(42)` → "42", `bool("")` → False. If the text is not a number, `int("abc")` raises `ValueError`. `int(3.9)` drops the fraction and gives 3 (it does not round).'),
          ex: 'print(int("42") + 8)\nprint(float("3.5") * 2)\nprint("Order #" + str(1042))\nprint(int(3.9), round(3.9))\nprint(bool(""), bool("no"))', run: 1 },
        { h: B('f-string: نص فيه قيم', 'f-strings: text with values in it'),
          p: B('حط `f` قبل علامة التنصيص واكتب أي متغير أو حسبة بين `{}`. `{price:.2f}` بيطبع رقمين بعد العلامة، و`{n:,}` بيحط فواصل الآلاف. دي أحسن طريقة تطبع بيها نتايج مفهومة.', 'Put `f` before the quote and write any variable or calculation inside `{}`. `{price:.2f}` shows two decimals and `{n:,}` adds thousands separators. This is the best way to print readable results.'),
          ex: 'item = "Laptop"\nprice = 23999.5\nqty = 2\nprint(f"{qty} x {item} = {price * qty:,.2f} EGP")\nprint(f"{item!r} has {len(item)} letters")', run: 1 }
      ],
      practice: [
        B('اكتب سكربت بيسأل عن اسم المنتج وسعره وكميته، ويطبع الإجمالي بـ f-string ورقمين بعد العلامة.', 'Write a script that asks for a product name, price and quantity, and prints the total with an f-string and two decimals.'),
        B('شغّل `int("12.5")` واقرا الخطأ. إزاي تحوّل "12.5" لـ 12؟ (تلميح: خطوتين).', 'Run `int("12.5")` and read the error. How do you turn "12.5" into 12? (Hint: two steps.)'),
        B('اكتب محوّل درجات حرارة: ياخد درجة مئوية ويطبع الفهرنهايت (`c * 9 / 5 + 32`).', 'Write a temperature converter: take Celsius and print Fahrenheit (`c * 9 / 5 + 32`).'),
        B('اطبع رقم كبير (1234567.891) بـ 3 أشكال: عادي، وبفواصل، وبرقمين بعد العلامة.', 'Print a big number (1234567.891) in 3 ways: plain, with separators, and with two decimals.')
      ],
      code: [
        { u: B('حاسبة تكلفة شحن', 'A shipping cost calculator'), p: 'weight = float(input("Parcel weight in kg: "))\nper_kg = 18.5\nbase = 40\ncost = base + weight * per_kg\nprint(f"Shipping {weight} kg costs {cost:.2f} EGP")', run: 1, stdin: '3.2' }
      ],
      words: [
        { t: 'input()', m: B('دالة بتاخد نص من المستخدم من لوحة المفاتيح', 'a function that reads text the user types'), ex: 'city = input("City: ")' },
        { t: 'type conversion', m: B('تحويل قيمة من نوع لنوع تاني (casting)', 'turning a value of one type into another (casting)'), ex: 'int("15")  →  15' },
        { t: 'f-string', m: B('نص يبدأ بـ f وبتحط جواه قيم بين {}', 'a string starting with f with values inside {}'), ex: 'f"Total: {total:.2f}"' },
        { t: 'format specifier', m: B('اللي بعد : جوه {} عشان تحدد شكل الرقم', 'what follows : inside {} to set how a value looks'), ex: '{price:,.2f}' },
        { t: 'ValueError', m: B('خطأ لما القيمة نوعها صح بس محتواها ميتقبلش', 'an error when a value has the right type but an unusable content'), ex: 'int("abc")' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 7.1.1 Formatted String Literals.', 'Read 7.1.1 Formatted String Literals.') }, { lib: 'Automate the Boring Stuff with Python', what: B('الفصل 1: الجزء الخاص بـ input() وstr() وint() وfloat().', 'Chapter 1: the part on input(), str(), int() and float().') }],
      challenge: B('اكتب `loan.py`: ياخد مبلغ القرض وعدد الشهور، ويطبع القسط الشهري بفائدة ثابتة 10% على المبلغ كله، بفواصل ورقمين.', 'Write `loan.py`: take a loan amount and a number of months, and print the monthly payment with a flat 10% interest on the whole amount, with separators and two decimals.'),
      quiz: [
        { q: B('المستخدم كتب 5 في `x = input()`. `x + x` بيدي:', 'The user types 5 for `x = input()`. `x + x` gives:'), o: ['"55"', '10', B('خطأ', 'an error')], a: 0, why: B('input بترجّع نص، وجمع نصين بيلزقهم.', 'input returns text, and adding two texts joins them.') },
        { q: B('`int(7.8)` بيدي:', '`int(7.8)` gives:'), o: ['7', '8', '7.8'], a: 0, why: B('int بيقص الكسر، مش بيقرّب.', 'int drops the fraction; it does not round.') },
        { q: B('عشان تطبع 1234.5 كده `1,234.50` تكتب:', 'To print 1234.5 as `1,234.50` you write:'), o: ['f"{x:,.2f}"', 'f"{x:.2}"', 'str(x, 2)'], a: 0, why: B('`,` للفواصل و`.2f` لرقمين بعد العلامة.', '`,` adds separators and `.2f` two decimals.') }
      ] },

    { title: B('التعليقات والأخطاء وVS Code', 'Comments, errors and VS Code'),
      goal: B('تشتغل في VS Code براحتك، وتكتب تعليقات مفيدة، وتقرا الـ traceback وتعرف أشهر 4 أخطاء.', 'Work comfortably in VS Code, write useful comments, and read a traceback and recognise the four most common errors.'),
      learn: [
        { h: B('VS Code للبايثون', 'VS Code for Python'),
          p: B('نزّل VS Code وثبّت extension اسمه Python (من Microsoft). افتح فولدر المشروع (File → Open Folder)، واختار الـ interpreter من تحت على اليمين. زرار ▶ فوق على اليمين بيشغّل الملف، والناتج بيظهر في الـ Terminal تحت.', 'Install VS Code and the Python extension (by Microsoft). Open your project folder (File → Open Folder) and pick the interpreter at the bottom right. The ▶ button at the top right runs the file and the output appears in the terminal below.'),
          ex: 'Ctrl+`        open the terminal\nCtrl+S        save\nF5            run with the debugger\nCtrl+/        comment / uncomment lines\nShift+Alt+F   format the file', show: 1 },
        { h: B('التعليقات', 'Comments'),
          p: B('أي حاجة بعد `#` Python بتتجاهلها. التعليق الكويس بيشرح **ليه** مش **إيه**: الكود نفسه بيقول إيه. ومتسيبش كود قديم متعلّق عليه؛ Git بيفتكره ليك.', 'Python ignores anything after `#`. A good comment explains **why**, not **what** — the code already says what. Do not leave old code commented out; Git remembers it for you.'),
          ex: '# bad: add 14 to tax\ntax = price * 0.14\n\n# good: VAT in Egypt is 14% since 2017\nVAT = 0.14\ntax = price * VAT', show: 1 },
        { h: B('اقرا الـ traceback من تحت', 'Read a traceback from the bottom'),
          p: B('لما الكود يقع، Python بتطبع traceback. **آخر سطر** فيه نوع الخطأ والسبب، واللي فوقه بيقولك الملف ورقم السطر. أشهر أربعة: `SyntaxError` (كتابة غلط زي قوس ناقص)، `NameError` (اسم مش معرّف أو مكتوب غلط)، `TypeError` (عملية على نوع غلط)، `ValueError` (قيمة مينفعش تتحول).', 'When code crashes, Python prints a traceback. The **last line** has the error type and the reason; the lines above give the file and line number. The four most common: `SyntaxError` (a typo such as a missing bracket), `NameError` (an undefined or misspelt name), `TypeError` (an operation on the wrong type), `ValueError` (a value that cannot be converted).'),
          ex: 'price = 120\nprint(prise * 2)', run: 1, err: 1 }
      ],
      practice: [
        B('ثبّت VS Code وextension الـ Python، وافتح فولدر `python-journey` وشغّل `hello.py` من زرار ▶.', 'Install VS Code and the Python extension, open the `python-journey` folder and run `hello.py` with the ▶ button.'),
        B('اعمل الأربع أخطاء بإيدك (SyntaxError وNameError وTypeError وValueError) واكتب آخر سطر من كل traceback.', 'Cause the four errors yourself (SyntaxError, NameError, TypeError and ValueError) and write down the last line of each traceback.'),
        B('شغّل المثال الأخير فوق، واقرا الخطأ، وصلّحه بزرار «عدّل الكود».', 'Run the last example above, read the error, and fix it with «Edit the code».'),
        B('ارجع لسكربتات الأسبوع وحط تعليق «ليه» واحد على الأقل في كل ملف.', 'Go back to this week’s scripts and add at least one «why» comment to each file.')
      ],
      code: [
        { u: B('أخطاء تصلّحها', 'Errors to fix'), p: 'print("Total:" 250)\nqty = int("3 items")\nprint("Items: " + 3)\nprint(totl)', show: 1 }
      ],
      words: [
        { t: 'comment', m: B('سطر أو جزء بعد # بيتجاهله Python، للشرح', 'text after # that Python ignores, for explaining'), ex: '# prices include VAT' },
        { t: 'traceback', m: B('تقرير الخطأ: الملف والسطر ونوع الخطأ', 'the error report: the file, the line and the error type'), ex: 'NameError: name \'prise\' is not defined' },
        { t: 'SyntaxError', m: B('خطأ في كتابة الكود نفسه قبل ما يشتغل', 'a mistake in how the code is written, found before it runs'), ex: 'print("hi"' },
        { t: 'NameError', m: B('استخدمت اسم Python متعرفهوش', 'you used a name Python does not know'), ex: 'print(totl)' },
        { t: 'TypeError', m: B('عملية على نوع مينفعش معاه', 'an operation on a type that does not support it'), ex: '"Items: " + 3' },
        { t: 'IDE', m: B('برنامج لكتابة الكود وتشغيله وتصحيحه في مكان واحد', 'a program to write, run and debug code in one place'), ex: 'VS Code, PyCharm' }
      ],
      read: ['lib:Python in Visual Studio Code', { lib: 'Errors and Exceptions (tutorial)', what: B('اقرا 8.1 Syntax Errors و8.2 Exceptions بس.', 'Read only 8.1 Syntax Errors and 8.2 Exceptions.') }],
      challenge: B('صلّح الأربع سطور في «أخطاء تصلّحها» وخلّيها تشتغل كلها، وجنب كل سطر تعليق باسم الخطأ اللي كان فيه.', 'Fix the four lines in «Errors to fix» so they all run, with a comment on each naming the error it had.'),
      quiz: [
        { q: B('في الـ traceback، نوع الخطأ بيبقى فين؟', 'Where is the error type in a traceback?'), o: [B('آخر سطر', 'the last line'), B('أول سطر', 'the first line'), B('مش بيتكتب', 'it is not shown')], a: 0, why: B('اقرا من تحت لفوق.', 'Read from the bottom up.') },
        { q: B('`print(totl)` و`totl` مش معرّف. الخطأ:', '`print(totl)` with `totl` undefined. The error:'), o: ['NameError', 'TypeError', 'ValueError'], a: 0, why: B('الاسم مش موجود (غالبًا غلطة كتابة).', 'The name does not exist (usually a typo).') },
        { q: B('التعليق الكويس بيشرح:', 'A good comment explains:'), o: [B('ليه الكود كده', 'why the code is that way'), B('كل سطر بيعمل إيه', 'what every line does'), B('اسم المبرمج', 'the programmer’s name')], a: 0, why: B('الكود بيقول إيه؛ التعليق يقول ليه.', 'The code says what; the comment says why.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تجمع كل اللي اتعلمته في برنامج حقيقي صغير، وتعدّي اختبار الأسبوع.', 'Bring everything together in a small real program and pass the weekly test.'),
      review: [
        B('تشغّل Python من الطرفية ومن VS Code، وتعرف الفرق بين الـ REPL والملف.', 'You run Python from the terminal and from VS Code, and know the REPL from a file.'),
        B('تختار أسماء متغيرات واضحة، وتعرف int وfloat وstr وbool وNone.', 'You pick clear variable names and know int, float, str, bool and None.'),
        B('تستخدم `//` و`%` و`**` و`round()`، وتفرّق بين `=` و`==`.', 'You use `//`, `%`, `**` and `round()`, and tell `=` from `==`.'),
        B('بتحوّل نتيجة `input()` للنوع الصح، وبتطبع بـ f-string منسّق.', 'You convert `input()` to the right type and print with a formatted f-string.'),
        B('بتقرا آخر سطر في الـ traceback وتعرف أشهر 4 أخطاء.', 'You read the last line of a traceback and know the four most common errors.')
      ],
      project: B('**حاسبة فاتورة المحل** (`invoice.py`): البرنامج يسأل عن اسم العميل، وأسماء وأسعار وكميات 3 منتجات، ونسبة الخصم. بعدين يطبع فاتورة منسّقة: كل منتج في سطر بالإجمالي بتاعه، وبعدها الإجمالي قبل الخصم، والخصم، وضريبة 14%، والمطلوب دفعه، كل الأرقام بفواصل ورقمين بعد العلامة. حط تعليقات «ليه»، وجرّب تكتب كمية غلط (حروف) واقرا الخطأ اللي هيطلع — هنعالجه في أسبوع 8.', '**The shop invoice calculator** (`invoice.py`): the program asks for the customer name, the names, prices and quantities of 3 products, and a discount percentage. It then prints a formatted invoice: each product on a line with its total, then the subtotal, the discount, 14% VAT and the amount due, every number with separators and two decimals. Add «why» comments, and try typing a wrong quantity (letters) and read the error — we will handle it in week 8.'),
      test: [
        { q: B('أنهي أمر بيشغّل ملف Python؟', 'Which command runs a Python file?'), o: ['python app.py', 'pip app.py', 'run app'], a: 0, why: B('الـ interpreter اسمه python.', 'The interpreter is called python.') },
        { q: B('نوع `"3.14"` إيه؟', 'What type is `"3.14"`?'), o: ['str', 'float', 'int'], a: 0, why: B('بين علامات تنصيص، يبقى نص.', 'It is in quotes, so it is text.') },
        { q: B('`20 // 6` بيساوي:', '`20 // 6` equals:'), o: ['3', '3.33', '2'], a: 0, why: B('قسمة صحيحة من غير كسر.', 'Whole division with no fraction.') },
        { q: B('`20 % 6` بيساوي:', '`20 % 6` equals:'), o: ['2', '3', '0'], a: 0, why: B('20 = 6×3 + 2.', '20 = 6×3 + 2.') },
        { q: B('`input()` بترجّع دايمًا:', '`input()` always returns:'), o: ['str', 'int', B('حسب اللي اتكتب', 'whatever was typed')], a: 0, why: B('نص، وانت اللي بتحوّله.', 'Text; you convert it.') },
        { q: B('`f"{9.5:.2f}"` بيطبع:', '`f"{9.5:.2f}"` prints:'), o: ['9.50', '9.5', '10'], a: 0, why: B('`.2f` = رقمين بعد العلامة.', '`.2f` = two decimals.') },
        { q: B('`"10" + 5` بيطلّع:', '`"10" + 5` raises:'), o: ['TypeError', 'ValueError', 'NameError'], a: 0, why: B('مينفعش تجمع نص على رقم.', 'You cannot add text and a number.') },
        { q: B('`int("ten")` بيطلّع:', '`int("ten")` raises:'), o: ['ValueError', 'TypeError', 'SyntaxError'], a: 0, why: B('النوع نص (مقبول) بس المحتوى مش رقم.', 'Text is an accepted type, but the content is not a number.') },
        { q: B('`bool(0)` بيدي:', '`bool(0)` gives:'), o: ['False', 'True', 'None'], a: 0, why: B('الصفر والنص الفاضي والـ None كلهم False.', 'Zero, empty text and None are all False.') },
        { q: B('أنهي سطر بيقارن؟', 'Which line compares?'), o: ['total == 100', 'total = 100', 'total -> 100'], a: 0, why: B('`==` للمقارنة.', '`==` compares.') },
        { q: B('`2 ** 3 * 2` بيساوي:', '`2 ** 3 * 2` equals:'), o: ['16', '64', '12'], a: 0, why: B('الأس الأول: 8، وبعدين ×2.', 'The power first: 8, then ×2.') },
        { q: B('اسم المتغير الأنسب لإجمالي الطلب:', 'The best variable name for an order total:'), o: ['order_total', 'OrderTotal!', 'x'], a: 0, why: B('حروف صغيرة و_ واسم بيوصف القيمة.', 'Lowercase, underscores and a descriptive name.') }
      ] }
  ]
};
