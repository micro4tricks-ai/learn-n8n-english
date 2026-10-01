// Python week 3 — Conditions and loops.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الشروط والتكرار', 'Conditions and loops'),
  goal: B('تخلّي برنامجك ياخد قرارات بـ if وelif وelse، ويكرّر الشغل بـ while وfor وrange، ويتحكم في التكرار بـ break وcontinue — ده قلب أي أتمتة.',
          'Make your program decide with if, elif and else, repeat work with while, for and range, and control loops with break and continue — the heart of any automation.'),
  days: [
    { title: B('if وelif وelse', 'if, elif and else'),
      goal: B('تكتب شروط بفروع، وتفهم المسافة في أول السطر (indentation) وإنها جزء من اللغة.', 'Write conditions with branches and understand that indentation is part of the language.'),
      learn: [
        { h: B('الشرط والـ block', 'A condition and its block'),
          p: B('`if total > 1000:` وبعدها سطور داخلة لجوه 4 مسافات؛ دول الـ block اللي بيتنفذ لو الشرط True. أول سطر يرجع لورا يبقى برّه الـ if. مفيش أقواس `{}` في Python: المسافة هي اللي بتحدد.', '`if total > 1000:` followed by lines indented 4 spaces; they form the block that runs when the condition is True. The first line back at the left edge is outside the if. There are no `{}` braces in Python: indentation decides.'),
          ex: 'total = 1350\nif total > 1000:\n    print("Free shipping!")\n    shipping = 0\nelse:\n    shipping = 60\nprint("Shipping:", shipping)', run: 1 },
        { h: B('elif لأكتر من فرعين', 'elif for more than two branches'),
          p: B('Python بتجرّب الشروط من فوق لتحت وبتنفّذ **أول** واحد يطلع True بس، والباقي بتتخطاه. عشان كده رتّب من الأضيق للأوسع. `else` في الآخر اختيارية وبتمسك أي حاجة تانية.', 'Python tests the conditions from top to bottom and runs **only the first** that is True, skipping the rest. So order them from the narrowest to the widest. A final `else` is optional and catches everything else.'),
          ex: 'score = 78\nif score >= 90:\n    grade = "A"\nelif score >= 75:\n    grade = "B"\nelif score >= 60:\n    grade = "C"\nelse:\n    grade = "F"\nprint(score, "->", grade)', run: 1 },
        { h: B('غلطات الـ indentation', 'Indentation mistakes'),
          p: B('مسافات مش متساوية بتطلّع `IndentationError`، ونسيان `:` بعد الشرط بيطلّع `SyntaxError`. VS Code بيحط 4 مسافات لما تدوس Tab؛ متخلطش Tab ومسافات في نفس الملف.', 'Uneven spaces raise `IndentationError` and a missing `:` after the condition raises `SyntaxError`. VS Code inserts 4 spaces when you press Tab; never mix tabs and spaces in one file.'),
          ex: 'stock = 0\nif stock == 0:\n    print("Out of stock")\n      print("Notify the supplier")   # one space too many', run: 1, err: 1 }
      ],
      practice: [
        B('اكتب برنامج ياخد درجة حرارة ويطبع: «برد» تحت 15، «معتدل» لحد 28، «حر» فوق كده.', 'Write a program that takes a temperature and prints «cold» below 15, «mild» up to 28 and «hot» above.'),
        B('احسب الشحن: مجاني فوق 1000، 30 جنيه لو المدينة Cairo، و60 لأي مدينة تانية.', 'Compute shipping: free above 1000, 30 EGP when the city is Cairo, 60 for any other city.'),
        B('اعمل الغلطتين (`:` ناقصة ومسافات غلط) واقرا الرسالتين.', 'Make both mistakes (a missing `:` and wrong spaces) and read the two messages.'),
        B('بدّل ترتيب شروط الدرجات (ابدأ بـ `>= 60`) وشوف ليه النتيجة بقت غلط.', 'Swap the order of the grade conditions (start with `>= 60`) and see why the result becomes wrong.')
      ],
      code: [
        { u: B('تصنيف تذكرة دعم', 'Classifying a support ticket'), p: 'subject = "URGENT: payment failed"\nlow = subject.lower()\nif "urgent" in low or "failed" in low:\n    priority = "high"\nelif "question" in low:\n    priority = "low"\nelse:\n    priority = "normal"\nprint(f"{subject!r} -> {priority}")', run: 1 }
      ],
      words: [
        { t: 'condition', m: B('سؤال نتيجته True أو False بيتحكم في اللي هيتنفّذ', 'a question that is True or False and decides what runs'), ex: 'if total > 1000:' },
        { t: 'branch', m: B('واحد من الطرق اللي البرنامج ممكن يمشي فيها حسب الشرط', 'one of the paths a program can take depending on a condition'), ex: 'the else branch' },
        { t: 'elif', m: B('اختصار else if: شرط تاني لو اللي قبله طلع False', 'short for else if: another condition when the previous ones were False'), ex: 'elif score >= 75:' },
        { t: 'indentation', m: B('المسافات في أول السطر؛ في Python بتحدد الـ block', 'the spaces at the start of a line; in Python they define the block'), ex: '    print("inside the if")' },
        { t: 'code block', m: B('مجموعة سطور بنفس المسافة بتتنفّذ مع بعض', 'a group of lines at the same indentation that run together'), ex: 'the lines under if: form a block' },
        { t: 'IndentationError', m: B('خطأ لما المسافات في أول السطور مش مظبوطة', 'an error when the leading spaces are inconsistent'), ex: 'unexpected indent' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 4.1 if Statements.', 'Read 4.1 if Statements.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Flow Control: الجزء الخاص بـ if وelse وelif.', 'The Flow Control chapter: the part on if, else and elif.') }],
      challenge: B('اكتب «حاسبة شرائح الكهرباء»: أول 50 كيلووات بسعر، اللي بعدها لحد 200 بسعر أعلى، والزيادة بسعر أعلى كمان. البرنامج ياخد الاستهلاك ويطبع الفاتورة والتفصيل.', 'Write an «electricity tiers calculator»: the first 50 kWh at one price, up to 200 at a higher price, and the rest higher still. Take the usage and print the bill and its breakdown.'),
      quiz: [
        { q: B('لو أكتر من شرط في if/elif طلعوا True، Python بتنفّذ:', 'If several if/elif conditions are True, Python runs:'), o: [B('أول واحد بس', 'only the first one'), B('كلهم', 'all of them'), B('آخر واحد', 'the last one')], a: 0, why: B('بعد أول فرع True بيتخطى الباقي.', 'After the first True branch it skips the rest.') },
        { q: B('إيه اللي بيحدد السطور اللي جوه الـ if؟', 'What decides which lines are inside the if?'), o: [B('المسافات في أول السطر', 'the indentation'), B('الأقواس {}', 'braces {}'), B('كلمة end', 'an end keyword')], a: 0, why: B('Python بتعتمد على الـ indentation.', 'Python relies on indentation.') },
        { q: B('`if x > 5` من غير `:` بيطلّع:', '`if x > 5` without `:` raises:'), o: ['SyntaxError', 'NameError', 'IndentationError'], a: 0, why: B('الـ `:` جزء من كتابة الجملة.', 'The `:` is part of the syntax.') }
      ] },

    { title: B('and وor وnot والصح والغلط', 'and, or, not and truthiness'),
      goal: B('تجمع الشروط بـ and وor وnot، وتفهم القيم «الصح» و«الغلط» من غير مقارنة، وتكتب شرط في سطر واحد.', 'Combine conditions with and, or and not, understand truthy and falsy values, and write a one-line condition.'),
      learn: [
        { h: B('and وor وnot', 'and, or and not'),
          p: B('`and` لازم الاتنين True، `or` يكفي واحد، `not` بيعكس. Python بتوقف بدري: في `a and b` لو a طلعت False مش بتبص على b — مفيد عشان تتجنب أخطاء: `if user and user.email:`.', '`and` needs both True, `or` needs one, `not` flips. Python stops early: in `a and b`, if a is False it never looks at b — useful to avoid errors: `if user and user.email:`.'),
          ex: 'age, has_id, is_vip = 22, True, False\nprint(age >= 18 and has_id)\nprint(is_vip or age > 60)\nprint(not is_vip)\nprint(18 <= age < 30)   # a chained comparison', run: 1 },
        { h: B('Truthy وFalsy', 'Truthy and falsy'),
          p: B('أي قيمة ينفع تبقى شرط. القيم «الغلط»: `0` و`0.0` و`""` و`[]` و`{}` و`None` و`False`. أي حاجة تانية «صح». عشان كده بتكتب `if name:` بدل `if name != "":`، و`if not items:` يعني القايمة فاضية.', 'Any value can be a condition. The falsy values are `0`, `0.0`, `""`, `[]`, `{}`, `None` and `False`; everything else is truthy. That is why you write `if name:` instead of `if name != "":`, and `if not items:` means the list is empty.'),
          ex: 'for value in [0, 7, "", "hi", [], [1], None]:\n    print(repr(value), "->", "truthy" if value else "falsy")', run: 1 },
        { h: B('شرط في سطر واحد', 'A condition in one line'),
          p: B('`label = "VIP" if total > 5000 else "regular"` — نفس if/else بس بترجّع قيمة. استخدمها للحاجات القصيرة بس. و`x = name or "Guest"` بتدي قيمة بديلة لو name فاضي.', '`label = "VIP" if total > 5000 else "regular"` — the same as if/else, but it returns a value. Use it only for short things. `x = name or "Guest"` gives a fallback when name is empty.'),
          ex: 'total = 7200\nlabel = "VIP" if total > 5000 else "regular"\nname = ""\nshown = name or "Guest"\nprint(label, shown)', run: 1 }
      ],
      practice: [
        B('اكتب شرط قبول طلب: العميل عنده حساب، والمبلغ أقل من رصيده أو هو VIP.', 'Write an order check: the customer has an account, and the amount is below their balance or they are VIP.'),
        B('اطبع لـ 8 قيم مختلفة هل هي truthy ولا falsy، وخمّن قبل ما تشغّل.', 'Print whether 8 different values are truthy or falsy — guess before running.'),
        B('حوّل if/else من 4 سطور لسطر واحد بالـ conditional expression.', 'Turn a 4-line if/else into one line with a conditional expression.'),
        B('اكتب `18 <= age <= 60` بطريقتين (متسلسلة وبـ and) واتأكد إنهم بيدوا نفس النتيجة.', 'Write `18 <= age <= 60` two ways (chained and with and) and check they agree.')
      ],
      code: [
        { u: B('هل الطلب مقبول؟', 'Is the order allowed?'), p: 'has_account = True\nbalance = 800\namount = 1200\nis_vip = True\nblocked = False\nallowed = has_account and not blocked and (amount <= balance or is_vip)\nprint("allowed" if allowed else "rejected")', run: 1 }
      ],
      words: [
        { t: 'boolean operator', m: B('and وor وnot لجمع الشروط', 'and, or and not, which combine conditions'), ex: 'a and not b' },
        { t: 'truthy', m: B('قيمة بتتعامل كـ True في الشرط', 'a value treated as True in a condition'), ex: '"hello", 5, [1]' },
        { t: 'falsy', m: B('قيمة بتتعامل كـ False: صفر وفاضي وNone', 'a value treated as False: zero, empty and None'), ex: '0, "", [], None' },
        { t: 'short-circuit', m: B('Python بتوقف تقييم الشرط أول ما النتيجة تبان', 'Python stops evaluating as soon as the result is known'), ex: 'user and user.email' },
        { t: 'chained comparison', m: B('مقارنات ورا بعض في سطر واحد', 'several comparisons in one line'), ex: '0 < x < 10' },
        { t: 'conditional expression', m: B('if/else في سطر واحد بترجّع قيمة', 'an if/else on one line that returns a value'), ex: '"yes" if ok else "no"' }
      ],
      read: [{ lib: 'Built-in Types', what: B('اقرا 4.1 Truth Value Testing و4.2 Boolean Operations.', 'Read 4.1 Truth Value Testing and 4.2 Boolean Operations.') }, 'lib:Python Tutor'],
      challenge: B('اكتب «فلتر طلبات»: لكل طلب (مبلغ، مدفوع؟، مدينة)، الطلب يتشحن النهارده لو مدفوع والمبلغ فوق 0 والمدينة واحدة من 3 مدن. اطبع السبب لو مرفوض.', 'Write an «order filter»: for each order (amount, paid?, city) it ships today if paid, the amount is above 0 and the city is one of 3 cities. Print the reason when rejected.'),
      quiz: [
        { q: B('`bool([])` بيدي:', '`bool([])` gives:'), o: ['False', 'True', 'None'], a: 0, why: B('القايمة الفاضية falsy.', 'An empty list is falsy.') },
        { q: B('`"" or "Guest"` بيدي:', '`"" or "Guest"` gives:'), o: ['"Guest"', '""', 'True'], a: 0, why: B('`or` بترجّع أول قيمة truthy.', '`or` returns the first truthy value.') },
        { q: B('`not (5 > 3 and 2 > 4)`:', '`not (5 > 3 and 2 > 4)`:'), o: ['True', 'False', B('خطأ', 'an error')], a: 0, why: B('اللي جوه False، وnot بتعكسها.', 'The inside is False and not flips it.') }
      ] },

    { title: B('while: كرّر لحد ما', 'while: repeat until'),
      goal: B('تكرّر شغل لحد ما شرط يتحقق، وتتحقق من مدخلات المستخدم، وتخرج من اللوب بـ break وتتخطى بـ continue.', 'Repeat work until a condition is met, validate user input, leave a loop with break and skip with continue.'),
      learn: [
        { h: B('اللوب بشرط', 'A loop with a condition'),
          p: B('`while condition:` بتعيد الـ block طول ما الشرط True. لازم حاجة جوه اللوب تغيّر الشرط، وإلا هتلف للأبد (infinite loop) — وقّفها بـ `Ctrl+C`. هنا في الصفحة بيتوقف لوحده بعد 15 ثانية.', '`while condition:` repeats the block as long as the condition is True. Something inside must change the condition, or it loops forever (an infinite loop) — stop it with `Ctrl+C`. On this page it stops by itself after 15 seconds.'),
          ex: 'balance = 1000\nmonth = 0\nwhile balance < 1500:\n    balance = balance * 1.05\n    month += 1\nprint(f"After {month} months: {balance:.2f}")', run: 1 },
        { h: B('اسأل لحد ما الإجابة تبقى صح', 'Ask until the answer is valid'),
          p: B('النمط ده هتستخدمه كتير: `while True:` واسأل، ولو الإجابة سليمة `break`. ده بيحمي برنامجك من المدخلات الغلط.', 'You will use this pattern a lot: `while True:`, ask, and `break` once the answer is valid. It protects your program from bad input.'),
          ex: 'while True:\n    text = input("Quantity (1-99): ")\n    if text.isdigit() and 1 <= int(text) <= 99:\n        qty = int(text)\n        break\n    print("Please type a number from 1 to 99.")\nprint("OK, quantity =", qty)', run: 1, stdin: 'ten\n150\n12' },
        { h: B('break وcontinue', 'break and continue'),
          p: B('`break` بيخرج من اللوب كله فورًا، و`continue` بيسيب باقي اللفة دي ويروح للي بعدها. `+=` اختصار: `count += 1` يعني `count = count + 1`.', '`break` leaves the whole loop at once; `continue` skips the rest of this round and goes to the next. `+=` is a shortcut: `count += 1` means `count = count + 1`.'),
          ex: 'n = 0\nwhile n < 10:\n    n += 1\n    if n % 3 == 0:\n        continue     # skip multiples of 3\n    if n == 8:\n        break        # stop completely\n    print(n, end=" ")\nprint()', run: 1 }
      ],
      practice: [
        B('اكتب لوب بيعد تنازلي من 10 لـ 1 وبعدين يطبع «انطلق!».', 'Write a loop that counts down from 10 to 1 and then prints «Go!».'),
        B('اسأل المستخدم عن إيميل لحد ما يكتب واحد فيه `@` و`.`.', 'Ask the user for an email until they type one containing `@` and `.`.'),
        B('احسب كام سنة محتاج عشان مبلغ يتضاعف بفايدة 12% في السنة.', 'Compute how many years an amount needs to double at 12% a year.'),
        B('اعمل infinite loop بقصد في التيرمنال ووقّفه بـ `Ctrl+C` واقرا `KeyboardInterrupt`.', 'Make an infinite loop on purpose in the terminal, stop it with `Ctrl+C` and read `KeyboardInterrupt`.')
      ],
      code: [
        { u: B('إعادة المحاولة 3 مرات', 'Retry up to 3 times'), p: 'import random\nrandom.seed(3)\nattempt = 0\nwhile attempt < 3:\n    attempt += 1\n    ok = random.random() > 0.6      # pretend to call a flaky API\n    print(f"attempt {attempt}:", "ok" if ok else "failed")\n    if ok:\n        break\nelse:\n    print("Gave up after 3 attempts")', run: 1 }
      ],
      words: [
        { t: 'while loop', m: B('لوب بيتكرر طول ما الشرط True', 'a loop that repeats while a condition is True'), ex: 'while balance < 1500:' },
        { t: 'infinite loop', m: B('لوب مبيخلصش لأن شرطه عمره ما بيبقى False', 'a loop that never ends because its condition never becomes False'), ex: 'while True: (with no break)' },
        { t: 'break', m: B('بيخرج من اللوب فورًا', 'leaves the loop at once'), ex: 'if found: break' },
        { t: 'continue', m: B('بيتخطى باقي اللفة ويروح للي بعدها', 'skips the rest of this round and goes to the next'), ex: 'if not line: continue' },
        { t: 'augmented assignment', m: B('عملية وتخزين مع بعض: += و-= و*=', 'an operation and assignment together: +=, -=, *='), ex: 'count += 1' },
        { t: 'input validation', m: B('التأكد إن اللي المستخدم كتبه سليم قبل ما تستخدمه', 'checking user input is valid before using it'), ex: 'while not text.isdigit(): ...' }
      ],
      read: [{ lib: 'Automate the Boring Stuff with Python', what: B('فصل Flow Control: الجزء الخاص بـ while وbreak وcontinue.', 'The Flow Control chapter: the part on while, break and continue.') }, { lib: 'Python Tutorial (python.org)', what: B('اقرا 4.4 break and continue Statements.', 'Read 4.4 break and continue Statements.') }],
      challenge: B('اكتب لعبة «خمّن الرقم»: الكمبيوتر يختار رقم من 1 لـ 50، والمستخدم عنده 6 محاولات، والبرنامج يقول «أكبر» أو «أصغر»، ويرفض أي مدخل مش رقم من غير ما يقع.', 'Write a «guess the number» game: the computer picks 1–50, the player has 6 tries, the program says «higher» or «lower», and it rejects anything that is not a number without crashing.'),
      quiz: [
        { q: B('إيه اللي بيمنع while من إنها تلف للأبد؟', 'What stops a while loop from running forever?'), o: [B('حاجة جوه اللوب بتغيّر الشرط أو break', 'something inside changes the condition, or a break'), B('Python بتوقفها لوحدها', 'Python stops it by itself'), B('else', 'else')], a: 0, why: B('لازم الشرط يتغير أو تخرج بـ break.', 'The condition must change or you leave with break.') },
        { q: B('`continue` بتعمل إيه؟', 'What does `continue` do?'), o: [B('تروح للفة اللي بعدها', 'go to the next round'), B('تخرج من اللوب', 'leave the loop'), B('توقف البرنامج', 'stop the program')], a: 0, why: B('بتسيب باقي اللفة الحالية بس.', 'It skips only the rest of the current round.') },
        { q: B('`x = 5; x *= 3` قيمة x:', '`x = 5; x *= 3` makes x:'), o: ['15', '8', '53'], a: 0, why: B('x = x * 3.', 'x = x * 3.') }
      ] },

    { title: B('for وrange', 'for and range'),
      goal: B('تلف على أي مجموعة (نص أو قايمة أو أرقام) بـ for، وتستخدم range وenumerate، وتجمّع نتايج في لوب.', 'Loop over any collection (a string, a list or numbers) with for, use range and enumerate, and build up results in a loop.'),
      learn: [
        { h: B('for على مجموعة', 'for over a collection'),
          p: B('`for item in collection:` بياخد العناصر واحد واحد. بتشتغل على النصوص (حرف حرف) والقوايم والملفات (سطر سطر) وأي حاجة iterable. مش محتاج عدّاد ولا شرط توقف.', '`for item in collection:` takes the items one by one. It works on strings (character by character), lists, files (line by line) and anything iterable. You need no counter and no stop condition.'),
          ex: 'cities = ["Cairo", "Giza", "Aswan"]\nfor city in cities:\n    print(city, len(city))\nfor ch in "EGP":\n    print(ch, end=" ")', run: 1 },
        { h: B('range للأرقام', 'range for numbers'),
          p: B('`range(5)` = 0 لـ 4، `range(1, 6)` = 1 لـ 5، `range(0, 20, 5)` = 0 و5 و10 و15، `range(10, 0, -1)` تنازلي. النهاية دايمًا مش داخلة، زي التقطيع.', '`range(5)` is 0 to 4, `range(1, 6)` is 1 to 5, `range(0, 20, 5)` is 0, 5, 10 and 15, and `range(10, 0, -1)` counts down. The end is never included, just like slicing.'),
          ex: 'for n in range(1, 6):\n    print(f"Page {n} of 5")\nprint(list(range(0, 20, 5)))\nprint(list(range(5, 0, -1)))', run: 1 },
        { h: B('التجميع وenumerate', 'Accumulating and enumerate'),
          p: B('نمط «المجمّع»: ابدأ بـ `total = 0` قبل اللوب وزوّد جواه. `enumerate(items, 1)` بيديك الرقم والعنصر مع بعض، أحسن من `range(len(items))`.', 'The accumulator pattern: start with `total = 0` before the loop and add inside it. `enumerate(items, 1)` gives you the number and the item together — better than `range(len(items))`.'),
          ex: 'prices = [120, 85.5, 300, 42]\ntotal = 0\nfor p in prices:\n    total += p\nprint("Total:", total)\nfor i, p in enumerate(prices, 1):\n    print(f"{i}. {p:>7.2f}")', run: 1 }
      ],
      practice: [
        B('اطبع جدول الضرب للرقم 7 من 1 لـ 12 بأعمدة مستقيمة.', 'Print the 7 times table from 1 to 12 in straight columns.'),
        B('عدّ الحروف المتحركة (a e i o u) في جملة إنجليزي بـ for.', 'Count the vowels (a e i o u) in an English sentence with a for loop.'),
        B('من قايمة أسعار، احسب المجموع والمتوسط وأكبر سعر من غير `sum` و`max`.', 'From a list of prices, compute the total, the average and the largest price without `sum` and `max`.'),
        B('اطبع قايمة مهام مترقمة من 1 بـ `enumerate`.', 'Print a numbered task list starting at 1 with `enumerate`.')
      ],
      code: [
        { u: B('أسماء ملفات متسلسلة', 'Sequential file names'), p: 'for month in range(1, 13):\n    print(f"sales_2026-{month:02}.xlsx")', run: 1 },
        { u: B('لوب جوه لوب', 'A loop inside a loop'), p: 'sizes = ["S", "M", "L"]\ncolors = ["black", "white"]\nfor color in colors:\n    for size in sizes:\n        print(f"TSHIRT-{color[:3].upper()}-{size}")', run: 1 }
      ],
      words: [
        { t: 'for loop', m: B('لوب بياخد عناصر مجموعة واحد واحد', 'a loop that takes the items of a collection one by one'), ex: 'for city in cities:' },
        { t: 'iterable', m: B('أي حاجة ينفع تلف عليها بـ for', 'anything you can loop over with for'), ex: 'strings, lists, range(), files' },
        { t: 'range()', m: B('سلسلة أرقام من غير ما تكتبها', 'a sequence of numbers without writing them out'), ex: 'range(1, 11)' },
        { t: 'accumulator', m: B('متغير بتجمّع فيه نتيجة جوه اللوب', 'a variable that collects a result inside a loop'), ex: 'total += price' },
        { t: 'enumerate()', m: B('بتديك رقم كل عنصر معاه في اللوب', 'gives you each item’s number with it in a loop'), ex: 'for i, x in enumerate(items, 1):' },
        { t: 'nested loop', m: B('لوب جوه لوب', 'a loop inside another loop'), ex: 'for row in rows: for cell in row:' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 4.2 for Statements و4.3 The range() Function.', 'Read 4.2 for Statements and 4.3 The range() Function.') }, { lib: 'Google’s Python Class', what: B('في صفحة Python Lists: جزء For and IN.', 'On the Python Lists page: the For and IN part.') }],
      challenge: B('اطبع «تقويم شهر» بسيط: 30 يوم في 5 صفوف كل صف 7 أيام (آخر صف أقل)، كل رقم بعرض 3، بلوب جوه لوب أو بـ `%`.', 'Print a simple «month calendar»: 30 days in rows of 7 (the last row shorter), each number 3 characters wide, using a nested loop or `%`.'),
      quiz: [
        { q: B('`list(range(2, 8, 2))`:', '`list(range(2, 8, 2))`:'), o: ['[2, 4, 6]', '[2, 4, 6, 8]', '[2, 8]'], a: 0, why: B('النهاية 8 مش داخلة.', 'The end 8 is not included.') },
        { q: B('أحسن طريقة تاخد الرقم والعنصر:', 'The best way to get the number and the item:'), o: ['enumerate(items)', 'range(len(items))', 'items.index()'], a: 0, why: B('enumerate أوضح وأسرع.', 'enumerate is clearer and faster.') },
        { q: B('`for ch in "abc"` بيلف كام مرة؟', 'How many times does `for ch in "abc"` loop?'), o: ['3', '1', '0'], a: 0, why: B('مرة لكل حرف.', 'Once per character.') }
      ] },

    { title: B('match وبرامج القوايم', 'match and menu programs'),
      goal: B('تستخدم `match` للاختيارات الكتير، وتبني برنامج بقايمة أوامر بيفضل شغال لحد ما المستخدم يخرج.', 'Use `match` for many choices, and build a menu-driven program that keeps running until the user quits.'),
      learn: [
        { h: B('match/case', 'match/case'),
          p: B('من Python 3.10: `match command:` وبعدها `case "add":` و`case "list":`. `case _:` بتمسك أي حاجة تانية. أوضح من سلسلة elif طويلة لما بتقارن نفس القيمة بكذا اختيار، وتقدر تجمع: `case "q" | "quit":`.', 'Since Python 3.10: `match command:` followed by `case "add":` and `case "list":`. `case _:` catches anything else. Clearer than a long elif chain when you compare one value against many choices, and you can combine: `case "q" | "quit":`.'),
          ex: 'for code in [200, 404, 429, 503]:\n    match code:\n        case 200:\n            msg = "OK"\n        case 401 | 403:\n            msg = "check your key"\n        case 429:\n            msg = "slow down and retry"\n        case _ if code >= 500:\n            msg = "server problem, retry later"\n        case _:\n            msg = "see the docs"\n    print(code, msg)', run: 1 },
        { h: B('برنامج بقايمة أوامر', 'A menu-driven program'),
          p: B('`while True:` تعرض القايمة، تاخد الاختيار، تنفّذه بـ match، و`break` لما يختار خروج. ده شكل أي أداة سطر أوامر صغيرة هتعملها.', '`while True:` shows the menu, reads the choice, runs it with match, and breaks when the user chooses to quit. This is the shape of any small command-line tool you will make.'),
          ex: 'tasks = []\nwhile True:\n    cmd = input("add / list / quit: ").strip().lower()\n    match cmd:\n        case "add":\n            tasks.append(input("Task: "))\n        case "list":\n            for i, t in enumerate(tasks, 1):\n                print(i, t)\n        case "quit" | "q":\n            break\n        case _:\n            print("Unknown command")\nprint("Bye,", len(tasks), "tasks")', run: 1, stdin: 'add\nSend invoices\nadd\nBackup files\nlist\nhelp\nq' },
        { h: B('else في اللوب', 'else on a loop'),
          p: B('`for ... else:` الـ else بتتنفّذ لو اللوب خلص **من غير break**. مفيدة في البحث: لو لقيت break، ولو ملقيتش الـ else تقول «مش موجود».', 'In `for ... else:` the else runs when the loop ends **without a break**. Useful for searching: break when found, and the else says «not found».'),
          ex: 'orders = ["A-11", "B-27", "C-03"]\nwanted = "B-99"\nfor o in orders:\n    if o == wanted:\n        print("found", o)\n        break\nelse:\n    print(wanted, "not found")', run: 1 }
      ],
      practice: [
        B('حوّل سلسلة elif بتاعة الدرجات لـ match فيه case بشرط (`case s if s >= 90`).', 'Turn the grade elif chain into a match with guarded cases (`case s if s >= 90`).'),
        B('زوّد أمر `done <رقم>` في برنامج المهام يشيل مهمة من القايمة.', 'Add a `done <number>` command to the task program that removes a task.'),
        B('ابحث عن أول رقم يقبل القسمة على 7 و11 بين 100 و500 بـ for/break/else.', 'Find the first number divisible by 7 and 11 between 100 and 500 with for/break/else.'),
        B('اكتب FizzBuzz من 1 لـ 30 (Fizz للـ 3، Buzz للـ 5، FizzBuzz للاتنين).', 'Write FizzBuzz from 1 to 30 (Fizz for 3, Buzz for 5, FizzBuzz for both).')
      ],
      code: [
        { u: B('FizzBuzz', 'FizzBuzz'), p: 'for n in range(1, 16):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)', run: 1 }
      ],
      words: [
        { t: 'match statement', m: B('بيقارن قيمة بأكتر من شكل ويختار أول واحد مطابق', 'compares a value with several patterns and picks the first that fits'), ex: 'match status:' },
        { t: 'case', m: B('اختيار واحد جوه match', 'one choice inside a match'), ex: 'case "quit":' },
        { t: 'wildcard', m: B('الـ _ في case: بتمسك أي حاجة', 'the _ in a case: matches anything'), ex: 'case _:' },
        { t: 'guard', m: B('شرط إضافي جنب case', 'an extra condition next to a case'), ex: 'case n if n > 100:' },
        { t: 'menu loop', m: B('لوب بيعرض اختيارات وينفّذ لحد ما المستخدم يخرج', 'a loop that shows choices and runs them until the user quits'), ex: 'while True: ... match cmd:' },
        { t: 'loop else', m: B('else بعد لوب بتتنفّذ لو مفيش break', 'an else after a loop that runs when there was no break'), ex: 'for ...: ... else: print("not found")' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 4.5 else Clauses on Loops و4.7 match Statements.', 'Read 4.5 else Clauses on Loops and 4.7 match Statements.') }, { lib: 'Exercism: Python track', what: B('حل تمرينين من الـ Conditionals والـ Loops.', 'Solve two exercises from Conditionals and Loops.') }],
      challenge: B('اعمل «ماكينة صرف» بقايمة: رصيد، إيداع، سحب (يرفض لو المبلغ أكبر من الرصيد أو مش رقم)، خروج — وفي الآخر يطبع عدد العمليات.', 'Build an «ATM» menu: balance, deposit, withdraw (refuse if more than the balance or not a number), quit — and print the number of operations at the end.'),
      quiz: [
        { q: B('`case _:` معناها:', '`case _:` means:'), o: [B('أي قيمة تانية', 'any other value'), B('قيمة فاضية', 'an empty value'), B('خطأ', 'an error')], a: 0, why: B('_ هي الـ wildcard.', '_ is the wildcard.') },
        { q: B('الـ else بتاعة for بتتنفّذ امتى؟', 'When does a for loop’s else run?'), o: [B('لما اللوب يخلص من غير break', 'when the loop ends without a break'), B('دايمًا', 'always'), B('لما يحصل خطأ', 'when there is an error')], a: 0, why: B('break بيمنعها.', 'A break skips it.') },
        { q: B('`case 401 | 403:` بتمسك:', '`case 401 | 403:` matches:'), o: [B('401 أو 403', '401 or 403'), B('401 بس', 'only 401'), B('القسمة', 'a division')], a: 0, why: B('`|` = أو جوه case.', '`|` means or inside a case.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تبني برنامج كامل بقرارات وتكرار، وتعدّي اختبار الأسبوع.', 'Build a complete program with decisions and loops, and pass the weekly test.'),
      review: [
        B('if/elif/else والترتيب من الأضيق للأوسع، والـ indentation.', 'if/elif/else ordered from narrowest to widest, and indentation.'),
        B('and/or/not والـ truthy والـ falsy والشرط في سطر.', 'and/or/not, truthy and falsy, and one-line conditions.'),
        B('while مع break وcontinue والتحقق من المدخلات.', 'while with break and continue, and input validation.'),
        B('for مع range وenumerate ونمط المجمّع واللوب المتداخل.', 'for with range and enumerate, the accumulator pattern and nested loops.'),
        B('match/case وبرامج القوايم وelse في اللوب.', 'match/case, menu programs and else on loops.')
      ],
      project: B('**كاشير المحل** (`cashier.py`): برنامج بقايمة أوامر: `add` يسأل عن اسم المنتج والسعر والكمية (ويرفض الأرقام الغلط ويعيد السؤال)، و`list` يطبع السلة كجدول مترقّم، و`remove <رقم>` يشيل منتج، و`pay` يطبع الفاتورة (خصم 10% لو الإجمالي فوق 2000، وضريبة 14%) ويخرج، و`quit` يخرج من غير دفع. خلّي الأسعار في متغيرات منفصلة لحد ما نتعلم القوايم بعمق الأسبوع الجاي، أو استخدم list بسيطة بـ append.', '**The shop cashier** (`cashier.py`): a menu program: `add` asks for a product name, price and quantity (rejecting bad numbers and asking again), `list` prints the basket as a numbered table, `remove <number>` removes a product, `pay` prints the invoice (10% off above 2000, and 14% VAT) and exits, and `quit` leaves without paying. Keep it simple with a list and append — we go deep into lists next week.'),
      test: [
        { q: B('ناتج: `x = 7` ثم `if x > 5: print("A")` `elif x > 3: print("B")`', 'Output of `x = 7`, then `if x > 5: print("A")` `elif x > 3: print("B")`'), o: ['A', 'B', B('A وB', 'A and B')], a: 0, why: B('أول شرط True بس.', 'Only the first True branch.') },
        { q: B('`bool("0")` بيدي:', '`bool("0")` gives:'), o: ['True', 'False', B('خطأ', 'an error')], a: 0, why: B('نص مش فاضي = truthy حتى لو فيه "0".', 'A non-empty string is truthy, even "0".') },
        { q: B('`0 or None or "x"`:', '`0 or None or "x"`:'), o: ['"x"', '0', 'None'], a: 0, why: B('أول قيمة truthy.', 'The first truthy value.') },
        { q: B('`list(range(3))`:', '`list(range(3))`:'), o: ['[0, 1, 2]', '[1, 2, 3]', '[0, 1, 2, 3]'], a: 0, why: B('يبدأ من صفر والنهاية مش داخلة.', 'Starts at 0; the end is excluded.') },
        { q: B('عدد اللفات: `for i in range(2, 10, 3)`', 'How many rounds: `for i in range(2, 10, 3)`'), o: ['3', '8', '4'], a: 0, why: B('2 و5 و8.', '2, 5 and 8.') },
        { q: B('عشان تخرج من `while True` تستخدم:', 'To leave `while True` you use:'), o: ['break', 'continue', 'pass'], a: 0, why: B('break بيخرج.', 'break leaves.') },
        { q: B('`continue` جوه لوب:', '`continue` inside a loop:'), o: [B('يتخطى باقي اللفة', 'skips the rest of the round'), B('يخرج', 'leaves'), B('يعيد من الأول', 'restarts the loop')], a: 0, why: B('بيروح للفة اللي بعدها.', 'It goes to the next round.') },
        { q: B('`"VIP" if 300 > 500 else "std"`:', '`"VIP" if 300 > 500 else "std"`:'), o: ['"std"', '"VIP"', 'False'], a: 0, why: B('الشرط False.', 'The condition is False.') },
        { q: B('المسافات الغلط في أول السطر بتطلّع:', 'Wrong leading spaces raise:'), o: ['IndentationError', 'ValueError', 'IndexError'], a: 0, why: B('خطأ indentation.', 'An indentation error.') },
        { q: B('`for/else`: الـ else اتنفذت. معنى كده:', '`for/else`: the else ran. That means:'), o: [B('مفيش break حصل', 'no break happened'), B('حصل break', 'a break happened'), B('اللوب فاضي بس', 'only that the loop was empty')], a: 0, why: B('else = خلص من غير break.', 'else = ended without break.') },
        { q: B('أنسب حاجة لمقارنة قيمة بـ 6 اختيارات ثابتة:', 'The neatest way to compare one value with 6 fixed choices:'), o: ['match/case', B('6 جمل if منفصلة', '6 separate ifs'), 'while'], a: 0, why: B('match أوضح لاختيارات كتير لنفس القيمة.', 'match is clearer for many choices on one value.') },
        { q: B('`total` بعد: `total = 0` و`for n in [2, 4, 6]: total += n`', '`total` after `total = 0` and `for n in [2, 4, 6]: total += n`'), o: ['12', '6', '0'], a: 0, why: B('2+4+6.', '2+4+6.') }
      ] }
  ]
};
