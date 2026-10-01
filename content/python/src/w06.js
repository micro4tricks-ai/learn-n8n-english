// Python week 6 — Functions.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الدوال', 'Functions'),
  goal: B('تقسّم برنامجك لدوال صغيرة بتعمل حاجة واحدة: بمعاملات وقيم افتراضية وقيمة راجعة، وتفهم الـ scope، وتمرّر دوال لدوال، وتختبر دوالك بـ assert.',
          'Split your program into small functions that do one thing each: with parameters, defaults and a return value; understand scope; pass functions to functions; and test your functions with assert.'),
  days: [
    { title: B('def وreturn', 'def and return'),
      goal: B('تعرّف دالة وتناديها، وتفرّق بين اللي بتطبعه واللي بترجّعه، وتكتب docstring.', 'Define and call a function, tell printing from returning, and write a docstring.'),
      learn: [
        { h: B('دالة = اسم لخطوات', 'A function is a name for steps'),
          p: B('`def add_vat(price):` وتحتها الكود داخل لجوه. بعد كده `add_vat(100)` بتشغّل الخطوات دي. اكتب الكود مرة واستخدمه 100 مرة، ولو اتغيرت نسبة الضريبة بتعدّل مكان واحد.', '`def add_vat(price):` followed by the indented code. Then `add_vat(100)` runs those steps. Write the code once and use it 100 times; if the VAT rate changes, you edit one place.'),
          ex: 'def add_vat(price):\n    return round(price * 1.14, 2)\n\nprint(add_vat(100))\nprint(add_vat(59.99))\ntotals = [add_vat(p) for p in [10, 20, 30]]\nprint(totals)', run: 1 },
        { h: B('return مقابل print', 'return versus print'),
          p: B('`return` بيرجّع قيمة للي نادى الدالة يكمّل بيها حساب، و`print` بيعرض على الشاشة بس. دالة من غير return بترجّع `None`. القاعدة: الدالة الحسابية ترجّع، والجزء اللي بيكلّم المستخدم هو اللي يطبع.', '`return` hands a value back to the caller to keep calculating with; `print` only shows it on screen. A function without return returns `None`. The rule: calculating functions return, and only the part that talks to the user prints.'),
          ex: 'def show_total(a, b):\n    print(a + b)\n\ndef get_total(a, b):\n    return a + b\n\nx = show_total(2, 3)\ny = get_total(2, 3)\nprint("x =", x, "| y =", y, "| y * 10 =", y * 10)', run: 1 },
        { h: B('الـ docstring', 'The docstring'),
          p: B('أول سطر جوه الدالة بين `"""` بيشرح هي بتعمل إيه وبتاخد إيه وبترجّع إيه. `help(add_vat)` بيعرضه، وVS Code بيظهره لما تقف على اسم الدالة. اكتبه لأي دالة هتستخدمها تاني.', 'The first line inside a function, in `"""`, explains what it does, what it takes and what it returns. `help(add_vat)` shows it, and VS Code displays it when you hover over the name. Write one for any function you will reuse.'),
          ex: 'def mask_phone(phone):\n    """Hide the middle of a phone number: 01012345678 -> 010*****678."""\n    digits = "".join(ch for ch in phone if ch.isdigit())\n    return digits[:3] + "*" * (len(digits) - 6) + digits[-3:]\n\nprint(mask_phone("010-1234 5678"))\nprint(mask_phone.__doc__)', run: 1 }
      ],
      practice: [
        B('اكتب `celsius_to_f(c)` و`f_to_celsius(f)` واختبرهم على 3 قيم.', 'Write `celsius_to_f(c)` and `f_to_celsius(f)` and test them on 3 values.'),
        B('اكتب `is_even(n)` بترجّع True/False، واستخدمها في comprehension تفلتر قايمة.', 'Write `is_even(n)` returning True/False, and use it in a comprehension to filter a list.'),
        B('حوّل حسبة الفاتورة من مشروع أسبوع 1 لدالة `invoice_total(subtotal, discount)`.', 'Turn the invoice calculation from the week 1 project into a function `invoice_total(subtotal, discount)`.'),
        B('اكتب docstring لكل دالة واطبعه بـ `help()`.', 'Write a docstring for each function and print it with `help()`.')
      ],
      code: [
        { u: B('دوال تنضيف صغيرة', 'Small cleaning functions'), p: 'def clean_name(name):\n    """Trim, collapse spaces and use Title Case."""\n    return " ".join(name.split()).title()\n\ndef clean_email(email):\n    """Trim and lowercase an email."""\n    return email.strip().lower()\n\nprint(clean_name("  mona   HASSAN "), clean_email(" Mona@Shop.COM "))', run: 1 }
      ],
      words: [
        { t: 'function', m: B('مجموعة خطوات ليها اسم بتناديها وقت ما تحتاج', 'a named set of steps you call whenever you need them'), ex: 'def add_vat(price):' },
        { t: 'def', m: B('الكلمة اللي بتعرّف بيها دالة', 'the keyword that defines a function'), ex: 'def greet(name):' },
        { t: 'call', m: B('تشغيل الدالة باسمها وأقواس', 'running a function by its name with brackets'), ex: 'greet("Sara")' },
        { t: 'return value', m: B('القيمة اللي الدالة بترجّعها للي ناداها', 'the value a function hands back to its caller'), ex: 'return total' },
        { t: 'docstring', m: B('نص الشرح في أول الدالة بين """', 'the explanation at the top of a function, in """'), ex: '"""Return the price with VAT."""' },
        { t: 'help()', m: B('بتعرض شرح أي دالة أو موديول', 'shows the documentation of any function or module'), ex: 'help(len)' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 4.8 Defining Functions.', 'Read 4.8 Defining Functions.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Functions لحد The None Value.', 'The Functions chapter up to The None Value.') }],
      challenge: B('اكتب 3 دوال لمتجر: `line_total(price, qty)` و`discount(total)` (10% فوق 2000) و`receipt(lines)` بترجّع نص الفاتورة كله (مش بتطبعه)، والجزء الرئيسي يطبعه.', 'Write 3 shop functions: `line_total(price, qty)`, `discount(total)` (10% above 2000) and `receipt(lines)`, which returns the whole receipt text (without printing it); the main part prints it.'),
      quiz: [
        { q: B('دالة مفيهاش return بترجّع:', 'A function without return returns:'), o: ['None', '0', '""'], a: 0, why: B('None افتراضيًا.', 'None by default.') },
        { q: B('الأحسن لدالة بتحسب ضريبة:', 'Best for a function that calculates VAT:'), o: [B('return للقيمة', 'return the value'), B('print للقيمة', 'print the value'), B('الاتنين دايمًا', 'always both')], a: 0, why: B('ترجّع عشان تتستخدم في حسابات تانية.', 'Return it so other calculations can use it.') },
        { q: B('`def f(): return 1` ثم `f` من غير أقواس:', '`def f(): return 1`, then `f` without brackets:'), o: [B('الدالة نفسها، مش 1', 'the function itself, not 1'), '1', B('خطأ', 'an error')], a: 0, why: B('الأقواس هي اللي بتشغّلها.', 'Brackets are what call it.') }
      ] },

    { title: B('المعاملات: افتراضي وبالاسم وأي عدد', 'Parameters: defaults, by name and any number'),
      goal: B('تدي قيم افتراضية، وتنادي بالاسم، وتاخد أي عدد معاملات بـ *args و**kwargs، وتتجنب فخ القايمة الافتراضية.', 'Give default values, call by name, accept any number of arguments with *args and **kwargs, and avoid the mutable-default trap.'),
      learn: [
        { h: B('افتراضي وبالاسم', 'Defaults and keywords'),
          p: B('`def price_with_tax(price, rate=0.14):` الـ rate ليها قيمة لو مبعتهاش. وقت النداء تقدر تكتب الاسم: `price_with_tax(100, rate=0.2)` — أوضح بكتير من رقم لوحده. المعاملات اللي ليها قيمة افتراضية بتيجي في الآخر.', '`def price_with_tax(price, rate=0.14):` — rate has a value when you do not pass one. When calling you can write the name: `price_with_tax(100, rate=0.2)` — much clearer than a bare number. Parameters with defaults go last.'),
          ex: 'def price_with_tax(price, rate=0.14, rounding=2):\n    return round(price * (1 + rate), rounding)\n\nprint(price_with_tax(100))\nprint(price_with_tax(100, rate=0.2))\nprint(price_with_tax(rounding=0, price=99.5))', run: 1 },
        { h: B('*args و**kwargs', '*args and **kwargs'),
          p: B('`*args` بتلم أي عدد قيم في tuple، و`**kwargs` بتلم أي عدد قيم بالاسم في dict. هتشوفهم كتير في المكتبات. والعكس وقت النداء: `f(*my_list)` و`f(**my_dict)` بيفردوهم.', '`*args` collects any number of values into a tuple and `**kwargs` collects any number of named values into a dict. Libraries use them a lot. At call time the reverse works: `f(*my_list)` and `f(**my_dict)` spread them out.'),
          ex: 'def total(*amounts):\n    return sum(amounts)\n\ndef make_tag(name, **attrs):\n    extra = " ".join(f\'{k}="{v}"\' for k, v in attrs.items())\n    return f"<{name} {extra}>"\n\nprint(total(10, 20, 30), total(*[1, 2, 3]))\nprint(make_tag("a", href="https://python.org", target="_blank"))', run: 1 },
        { h: B('فخ القيمة الافتراضية المتغيرة', 'The mutable default trap'),
          p: B('`def add(item, items=[]):` القايمة الافتراضية بتتعمل **مرة واحدة** وبتفضل من نداء للتاني، فبتتراكم. الحل: `items=None` وجوه الدالة `if items is None: items = []`.', '`def add(item, items=[]):` — the default list is created **once** and kept between calls, so it piles up. The fix: `items=None` and inside the function `if items is None: items = []`.'),
          ex: 'def bad_add(item, items=[]):\n    items.append(item)\n    return items\n\ndef good_add(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\nprint(bad_add("a"), bad_add("b"))\nprint(good_add("a"), good_add("b"))', run: 1 }
      ],
      practice: [
        B('اكتب `format_money(amount, currency="EGP", decimals=2)` ونادها بـ 4 طرق.', 'Write `format_money(amount, currency="EGP", decimals=2)` and call it 4 ways.'),
        B('اكتب `average(*nums)` ترجّع None لو مفيش أرقام.', 'Write `average(*nums)` that returns None when given no numbers.'),
        B('اكتب `build_url(base, **params)` تبني `https://x.com/search?q=pen&page=2`.', 'Write `build_url(base, **params)` that builds `https://x.com/search?q=pen&page=2`.'),
        B('جرّب فخ القايمة الافتراضية واطبع النتيجة بعد 3 نداءات، وبعدين صلّحه.', 'Try the mutable default trap, print the result after 3 calls, then fix it.')
      ],
      code: [
        { u: B('رسالة بقالب', 'A templated message'), p: 'def message(name, amount, due="end of month", *, currency="EGP"):\n    return f"Hi {name}, your invoice of {amount:,.2f} {currency} is due {due}."\n\nprint(message("Sara", 1250))\nprint(message("Omar", 980.5, "Friday", currency="USD"))', run: 1 }
      ],
      words: [
        { t: 'parameter', m: B('الاسم اللي في تعريف الدالة بيستقبل قيمة', 'the name in a function definition that receives a value'), ex: 'def f(price):' },
        { t: 'argument', m: B('القيمة اللي بتبعتها وقت النداء', 'the value you pass when calling'), ex: 'f(120)' },
        { t: 'default argument', m: B('معامل ليه قيمة لو متبعتش', 'a parameter with a value used when none is passed'), ex: 'rate=0.14' },
        { t: 'keyword argument', m: B('قيمة بتبعتها بالاسم وقت النداء', 'a value passed by name when calling'), ex: 'f(100, rate=0.2)' },
        { t: '*args', m: B('بتلم أي عدد قيم موضعية في tuple', 'collects any number of positional values into a tuple'), ex: 'def total(*args):' },
        { t: '**kwargs', m: B('بتلم أي عدد قيم بالاسم في dict', 'collects any number of named values into a dict'), ex: 'def tag(name, **kwargs):' },
        { t: 'mutable default', m: B('قيمة افتراضية متغيرة (زي []) بتفضل بين النداءات', 'a changeable default (like []) that persists between calls'), ex: 'def f(x=[]):  # trap' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 4.9 More on Defining Functions لحد 4.9.4.', 'Read 4.9 More on Defining Functions up to 4.9.4.') }, { lib: 'Real Python Tutorials', what: B('دوّر على «*args and **kwargs».', 'Search for «*args and **kwargs».') }],
      challenge: B('اكتب `log(message, *values, level="INFO", **context)` بتطبع سطر بالشكل `[INFO] message values... key=value` ونادها 4 مرات بأشكال مختلفة.', 'Write `log(message, *values, level="INFO", **context)` that prints a line like `[INFO] message values... key=value`, and call it 4 different ways.'),
      quiz: [
        { q: B('`def f(a, b=2): return a + b` و`f(1)`:', '`def f(a, b=2): return a + b`, then `f(1)`:'), o: ['3', '1', 'TypeError'], a: 0, why: B('b أخدت 2.', 'b defaulted to 2.') },
        { q: B('`def f(*args): return args` و`f(1, 2)`:', '`def f(*args): return args`, then `f(1, 2)`:'), o: ['(1, 2)', '[1, 2]', '3'], a: 0, why: B('args tuple.', 'args is a tuple.') },
        { q: B('القيمة الافتراضية الصح لقايمة:', 'The right default for a list parameter:'), o: ['items=None', 'items=[]', 'items=list'], a: 0, why: B('None وجوه الدالة تعمل قايمة جديدة.', 'None, then build a new list inside.') }
      ] },

    { title: B('الـ scope والدوال النضيفة', 'Scope and clean functions'),
      goal: B('تفهم المتغيرات جوه وبرّه الدالة، وتتجنب global، وترجّع أكتر من قيمة، وتكتب دوال «نضيفة» سهلة الاختبار.', 'Understand variables inside and outside a function, avoid global, return several values, and write «pure» functions that are easy to test.'),
      learn: [
        { h: B('محلي وعام', 'Local and global'),
          p: B('المتغير اللي بتعمله جوه الدالة «محلي»: بيتولد مع النداء ويموت بعده، ومحدش برّه يشوفه. الدالة تقدر **تقرا** متغير عام، بس لو عملت `x = ...` جواها بيبقى متغير محلي جديد. `global x` موجودة بس تجنّبها: ابعت القيمة كمعامل ورجّع النتيجة.', 'A variable you create inside a function is «local»: born with the call and gone after it, invisible outside. A function can **read** a global variable, but `x = ...` inside makes a new local one. `global x` exists, but avoid it: pass values in as parameters and return the result.'),
          ex: 'rate = 0.14            # global\n\ndef tax(price):\n    amount = price * rate   # local; reads the global rate\n    return amount\n\nprint(tax(100))\ntry:\n    print(amount)\nexcept NameError as e:\n    print("NameError:", e)', run: 1 },
        { h: B('أكتر من قيمة راجعة', 'Returning several values'),
          p: B('`return low, high` بترجّع tuple، وبتفكه وقت النداء: `lo, hi = min_max(prices)`. ولو القيم كتير أو ليها أسماء، رجّع dict.', '`return low, high` returns a tuple that you unpack when calling: `lo, hi = min_max(prices)`. When there are many named values, return a dict.'),
          ex: 'def stats(values):\n    if not values:\n        return None, None, None\n    return min(values), max(values), sum(values) / len(values)\n\nlo, hi, avg = stats([120, 85, 300, 42])\nprint(lo, hi, round(avg, 2))\nprint(stats([]))', run: 1 },
        { h: B('الدالة النضيفة', 'The pure function'),
          p: B('الدالة «النضيفة» نتيجتها بتعتمد على مدخلاتها بس، ومبتغيرش حاجة برّه (مبتطبعش ولا بتعدّل قايمة جت لها). دي أسهل في الاختبار والاستخدام. الحاجات اللي ليها «أثر جانبي» (ملفات وشبكة وطباعة) خليها في دوال قليلة واضحة.', 'A «pure» function’s result depends only on its inputs, and it changes nothing outside (no printing, no editing a list it received). Such functions are the easiest to test and reuse. Keep side effects (files, network, printing) in a few clear functions.'),
          ex: 'def add_discount_bad(prices):\n    for i in range(len(prices)):\n        prices[i] *= 0.9          # changes the caller\'s list!\n\ndef add_discount(prices):\n    return [round(p * 0.9, 2) for p in prices]   # returns a new list\n\noriginal = [100, 200]\nnew = add_discount(original)\nprint(original, new)\nadd_discount_bad(original)\nprint(original)', run: 1 }
      ],
      practice: [
        B('اعمل متغير جوه دالة وحاول تطبعه برّه، واقرا الخطأ.', 'Create a variable inside a function, try to print it outside, and read the error.'),
        B('اكتب `split_name(full)` ترجّع (الاسم الأول، اسم العيلة) وفكّها في متغيرين.', 'Write `split_name(full)` returning (first name, last name) and unpack it into two variables.'),
        B('خد دالة من الأسبوع بتستخدم global وغيّرها تاخد معامل وترجّع قيمة.', 'Take a function from this week that uses global and change it to take a parameter and return a value.'),
        B('اكتب `summary(orders)` ترجّع dict فيه count وtotal وavg.', 'Write `summary(orders)` returning a dict with count, total and avg.')
      ],
      code: [
        { u: B('دالة بترجّع dict', 'A function returning a dict'), p: 'def summary(amounts):\n    count = len(amounts)\n    total = sum(amounts)\n    return {"count": count, "total": total, "avg": round(total / count, 2) if count else 0}\n\nprint(summary([1200, 450, 3100]))\nprint(summary([]))', run: 1 }
      ],
      words: [
        { t: 'scope', m: B('المكان اللي الاسم معروف ومتاح فيه', 'where a name is known and usable'), ex: 'a variable inside a function has local scope' },
        { t: 'local variable', m: B('متغير بيتعمل جوه دالة ومش موجود برّاها', 'a variable created inside a function, not visible outside'), ex: 'def f(): x = 1' },
        { t: 'global variable', m: B('متغير معمول برّه أي دالة، في الملف كله', 'a variable created outside any function, for the whole file'), ex: 'RATE = 0.14' },
        { t: 'pure function', m: B('دالة نتيجتها من مدخلاتها بس ومبتغيرش حاجة برّه', 'a function whose result depends only on its inputs, changing nothing outside'), ex: 'def add(a, b): return a + b' },
        { t: 'side effect', m: B('أي تغيير الدالة بتعمله برّاها: طباعة، ملف، تعديل قايمة', 'any change a function makes outside itself: printing, a file, editing a list'), ex: 'print() is a side effect' },
        { t: 'constant', m: B('قيمة مش المفروض تتغير، بتتكتب بحروف كبيرة', 'a value that should not change, written in capitals'), ex: 'VAT_RATE = 0.14' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 9.2 Python Scopes and Namespaces (أول جزء بس).', 'Read 9.2 Python Scopes and Namespaces (just the first part).') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Functions: جزء Local and Global Scope.', 'The Functions chapter: the Local and Global Scope part.') }],
      challenge: B('خد كود مشروع «منظّف قايمة العملاء» (أسبوع 2) وقسّمه لدوال نضيفة (`parse_line` و`clean_*` و`format_row`) + دالة واحدة بس بتطبع.', 'Take the «customer list cleaner» project (week 2) and split it into pure functions (`parse_line`, `clean_*`, `format_row`) plus a single function that prints.'),
      quiz: [
        { q: B('متغير اتعمل جوه دالة:', 'A variable created inside a function:'), o: [B('مش ظاهر برّه الدالة', 'is not visible outside it'), B('ظاهر في الملف كله', 'is visible in the whole file'), B('بيتحفظ للنداء الجاي', 'is kept for the next call')], a: 0, why: B('محلي.', 'It is local.') },
        { q: B('`def f(): return 1, 2` و`a, b = f()`، قيمة b:', '`def f(): return 1, 2`, `a, b = f()`; b is:'), o: ['2', '(1, 2)', '1'], a: 0, why: B('الـ tuple اتفك.', 'The tuple was unpacked.') },
        { q: B('أنهي دالة «نضيفة»؟', 'Which function is «pure»?'), o: ['def double(x): return x * 2', 'def show(x): print(x)', 'def add(lst): lst.append(1)'], a: 0, why: B('مفيش أثر برّه الدالة.', 'No effect outside the function.') }
      ] },

    { title: B('الدوال كقيم: lambda وmap والـ decorators', 'Functions as values: lambda, map and decorators'),
      goal: B('تمرّر دالة لدالة، وتستخدم lambda وmap وfilter، وتفهم الـ closure، وتكتب أول decorator بيقيس الوقت.', 'Pass a function to a function, use lambda, map and filter, understand closures, and write your first decorator that measures time.'),
      learn: [
        { h: B('الدالة قيمة زي أي قيمة', 'A function is a value like any other'),
          p: B('تقدر تحط دالة في متغير أو في قايمة أو تبعتها لدالة تانية: `sorted(items, key=get_price)` بتبعت الدالة نفسها (من غير أقواس). الدالة اللي بتاخد أو بترجّع دالة اسمها higher-order.', 'You can put a function in a variable or a list, or pass it to another function: `sorted(items, key=get_price)` passes the function itself (no brackets). A function that takes or returns a function is called higher-order.'),
          ex: 'def get_price(item):\n    return item["price"]\n\nitems = [{"n": "bag", "price": 650}, {"n": "pen", "price": 7.5}]\nprint([i["n"] for i in sorted(items, key=get_price)])\nops = {"add": lambda a, b: a + b, "mul": lambda a, b: a * b}\nprint(ops["mul"](6, 7))', run: 1 },
        { h: B('map وfilter', 'map and filter'),
          p: B('`map(f, items)` بتطبّق f على كل عنصر، و`filter(f, items)` بتسيب اللي f بتاعه True. بيرجّعوا iterator فحطهم في `list()`. في الغالب الـ comprehension أوضح، بس هتقابلهم في كود الناس.', '`map(f, items)` applies f to every item and `filter(f, items)` keeps those where f is True. They return iterators, so wrap them in `list()`. A comprehension is usually clearer, but you will meet them in other people’s code.'),
          ex: 'prices = ["120", "85.5", "x", "300"]\nnumbers = list(map(float, filter(lambda s: s.replace(".", "", 1).isdigit(), prices)))\nprint(numbers)\nprint([float(s) for s in prices if s.replace(".", "", 1).isdigit()])', run: 1 },
        { h: B('closure وdecorator', 'Closures and decorators'),
          p: B('دالة جوه دالة بتفتكر متغيرات اللي عملتها (closure): `make_tax(0.14)` بترجّع دالة ضريبة جاهزة. والـ decorator دالة بتلف دالة تانية وتزوّد عليها شغل (قياس وقت، لوج، إعادة محاولة)، وبتتحط بـ `@` فوق الدالة.', 'A function inside a function remembers the variables of the one that made it (a closure): `make_tax(0.14)` returns a ready VAT function. A decorator is a function that wraps another to add work (timing, logging, retries), applied with `@` above the function.'),
          ex: 'import time\n\ndef make_tax(rate):\n    def apply(price):\n        return round(price * (1 + rate), 2)\n    return apply\n\nvat = make_tax(0.14)\nprint(vat(100))\n\ndef timed(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} took {(time.perf_counter() - start) * 1000:.1f} ms")\n        return result\n    return wrapper\n\n@timed\ndef slow_sum(n):\n    return sum(range(n))\n\nprint(slow_sum(1_000_000))', run: 1 }
      ],
      practice: [
        B('رتّب قايمة dicts موظفين مرة بالاسم ومرة بالمرتب بدوال key منفصلة.', 'Sort a list of employee dicts by name and by salary with separate key functions.'),
        B('حوّل قايمة نصوص لأرقام بـ map، وبعدين بـ comprehension، وقارن الوضوح.', 'Convert a list of strings to numbers with map, then with a comprehension, and compare clarity.'),
        B('اعمل `make_greeting(greeting)` بترجّع دالة بتسلّم بالكلمة دي على أي اسم.', 'Make `make_greeting(greeting)` that returns a function greeting any name with that word.'),
        B('حط `@timed` على دالتين من الأسبوع وشوف مين أبطأ.', 'Put `@timed` on two functions from this week and see which is slower.')
      ],
      code: [
        { u: B('decorator لإعادة المحاولة', 'A retry decorator'), p: 'import random\n\ndef retry(times):\n    def deco(func):\n        def wrapper(*args, **kwargs):\n            for attempt in range(1, times + 1):\n                try:\n                    return func(*args, **kwargs)\n                except ConnectionError as e:\n                    print(f"attempt {attempt} failed: {e}")\n            raise ConnectionError(f"gave up after {times} attempts")\n        return wrapper\n    return deco\n\nrandom.seed(2)\n\n@retry(4)\ndef fetch():\n    if random.random() < 0.6:\n        raise ConnectionError("timeout")\n    return "data"\n\nprint(fetch())', run: 1 }
      ],
      words: [
        { t: 'higher-order function', m: B('دالة بتاخد دالة أو بترجّع دالة', 'a function that takes or returns a function'), ex: 'sorted(items, key=get_price)' },
        { t: 'map()', m: B('بتطبّق دالة على كل عنصر', 'applies a function to every item'), ex: 'list(map(float, values))' },
        { t: 'filter()', m: B('بتسيب العناصر اللي الدالة بتاعتها True', 'keeps the items for which a function is True'), ex: 'list(filter(str.isdigit, xs))' },
        { t: 'closure', m: B('دالة داخلية بتفتكر متغيرات الدالة اللي عملتها', 'an inner function that remembers the variables of the one that made it'), ex: 'make_tax(0.14)' },
        { t: 'decorator', m: B('دالة بتلف دالة تانية وتزوّد عليها شغل، بـ @', 'a function that wraps another to add behaviour, applied with @'), ex: '@timed' },
        { t: 'wrapper', m: B('الدالة اللي جوه الـ decorator اللي بتنادي الأصلية', 'the function inside a decorator that calls the original'), ex: 'def wrapper(*args, **kwargs):' }
      ],
      read: [{ lib: 'Real Python Tutorials', what: B('دوّر على «Primer on Python Decorators» واقرا لحد Simple Decorators.', 'Search for «Primer on Python Decorators» and read up to Simple Decorators.') }, { lib: 'Built-in Functions', what: B('اقرا map وfilter وsorted.', 'Read map, filter and sorted.') }],
      challenge: B('اكتب decorator اسمه `log_calls` بيطبع اسم الدالة ومعاملاتها والقيمة اللي رجعت، وحطه على 3 دوال من مشاريعك.', 'Write a `log_calls` decorator that prints the function name, its arguments and the returned value, and apply it to 3 functions from your projects.'),
      quiz: [
        { q: B('`sorted(items, key=f)` بنكتب f من غير أقواس لأن:', 'In `sorted(items, key=f)` we write f without brackets because:'), o: [B('بنبعت الدالة نفسها مش نتيجتها', 'we pass the function itself, not its result'), B('الأقواس ممنوعة في sorted', 'brackets are not allowed in sorted'), B('f لازم تكون lambda', 'f must be a lambda')], a: 0, why: B('sorted هي اللي هتناديها لكل عنصر.', 'sorted calls it for each item.') },
        { q: B('`list(map(lambda x: x * 2, [1, 2]))`:', '`list(map(lambda x: x * 2, [1, 2]))`:'), o: ['[2, 4]', '[1, 2, 1, 2]', '<map object>'], a: 0, why: B('list() بتفك الـ iterator.', 'list() consumes the iterator.') },
        { q: B('الـ `@timed` فوق دالة معناها:', '`@timed` above a function means:'), o: ['func = timed(func)', 'timed()', B('تعليق', 'a comment')], a: 0, why: B('ده تعريف الـ decorator.', 'That is what a decorator is.') }
      ] },

    { title: B('تصميم الدوال واختبارها', 'Designing and testing functions'),
      goal: B('تكتب دوال صغيرة بمسؤولية واحدة، وتحط type hints، وتختبرها بـ assert، وتنظّم السكربت بـ main و`if __name__ == "__main__"`.', 'Write small single-purpose functions with type hints, test them with assert, and organise a script with main and `if __name__ == "__main__"`.'),
      learn: [
        { h: B('دالة واحدة = مهمة واحدة', 'One function, one job'),
          p: B('لو اسم الدالة فيه «و» (`read_and_clean_and_save`) يبقى قسّمها. الدالة الكويسة قصيرة (أقل من 20 سطر غالبًا)، اسمها فعل واضح (`clean_phone`، `send_invoice`)، وبتاخد اللي محتاجاه بس كمعاملات.', 'If a function’s name has an «and» in it (`read_and_clean_and_save`), split it. A good function is short (usually under 20 lines), named with a clear verb (`clean_phone`, `send_invoice`), and takes only what it needs as parameters.'),
          ex: 'def parse_amount(text):\n    return float(text.replace(",", "").strip())\n\ndef is_big(amount, limit=1000):\n    return amount >= limit\n\nraw = ["1,200.50", " 80", "3,100"]\namounts = [parse_amount(t) for t in raw]\nprint(amounts, [is_big(a) for a in amounts])', run: 1 },
        { h: B('type hints', 'Type hints'),
          p: B('`def total(prices: list[float], rate: float = 0.14) -> float:` بتوضح الأنواع المتوقعة. Python مبتفرضهاش وقت التشغيل، بس VS Code بيستخدمها في الإكمال والتحذيرات، وبتوثّق الكود. هنعمق فيها أسبوع 22.', '`def total(prices: list[float], rate: float = 0.14) -> float:` states the expected types. Python does not enforce them at run time, but VS Code uses them for completion and warnings, and they document the code. We go deeper in week 22.'),
          ex: 'def total(prices: list[float], rate: float = 0.14) -> float:\n    """Sum the prices and add VAT."""\n    return round(sum(prices) * (1 + rate), 2)\n\ndef find_user(users: dict[str, str], name: str) -> str | None:\n    return users.get(name)\n\nprint(total([10.0, 20.0]))\nprint(find_user({"sara": "s@x.com"}, "omar"))', run: 1 },
        { h: B('assert وmain', 'assert and main'),
          p: B('`assert clean_phone("010-123") == "010123"` لو الشرط غلط بيطلّع `AssertionError` — أبسط اختبار. وفي آخر السكربت: `def main():` فيها الشغل، و`if __name__ == "__main__": main()` عشان الكود يشتغل لما تشغّل الملف، ومايشتغلش لما ملف تاني يعمله import.', '`assert clean_phone("010-123") == "010123"` raises `AssertionError` when false — the simplest test. At the end of a script: `def main():` holds the work, and `if __name__ == "__main__": main()` makes it run when you run the file, but not when another file imports it.'),
          ex: 'def clean_phone(phone: str) -> str:\n    return "".join(ch for ch in phone if ch.isdigit())\n\ndef test_clean_phone():\n    assert clean_phone("010-1234 5678") == "01012345678"\n    assert clean_phone("") == ""\n    print("tests passed")\n\ndef main():\n    test_clean_phone()\n    print(clean_phone("+20 100 222 3333"))\n\nif __name__ == "__main__":\n    main()', run: 1 }
      ],
      practice: [
        B('اكتب 3 assert لكل دالة كتبتها الأسبوع ده، منهم حالة طرفية (فاضي أو صفر).', 'Write 3 asserts for each function you wrote this week, including an edge case (empty or zero).'),
        B('حط type hints على 5 دوال وشوف VS Code بيقترح إيه وانت بتكتب.', 'Add type hints to 5 functions and see what VS Code suggests as you type.'),
        B('خد سكربت قديم كله كود متكوم وقسّمه لدوال + `main()` + سطر `__name__`.', 'Take an old script that is one big block and split it into functions + `main()` + the `__name__` line.'),
        B('اعمل assert غلط بقصد واقرا `AssertionError`.', 'Write a failing assert on purpose and read the `AssertionError`.')
      ],
      code: [
        { u: B('شكل السكربت المرتب', 'A tidy script layout'), p: '"""report.py: print a sales summary."""\n\nVAT = 0.14\n\ndef parse(line: str) -> tuple[str, float]:\n    city, amount = line.split(",")\n    return city.strip(), float(amount)\n\ndef summarise(rows: list[tuple[str, float]]) -> dict[str, float]:\n    out: dict[str, float] = {}\n    for city, amount in rows:\n        out[city] = out.get(city, 0) + amount\n    return out\n\ndef main() -> None:\n    lines = ["Cairo, 1200", "Giza, 450", "Cairo, 3100"]\n    for city, total in summarise([parse(l) for l in lines]).items():\n        print(f"{city:<6}{total * (1 + VAT):>10,.2f}")\n\nif __name__ == "__main__":\n    main()', run: 1 }
      ],
      words: [
        { t: 'single responsibility', m: B('كل دالة بتعمل حاجة واحدة بس', 'each function does exactly one thing'), ex: 'parse(), summarise(), main()' },
        { t: 'type hint', m: B('كتابة النوع المتوقع للمعاملات والقيمة الراجعة', 'writing the expected types of parameters and the return value'), ex: 'def f(x: int) -> str:' },
        { t: 'assert', m: B('بيتأكد إن شرط صح، ولو غلط بيطلّع AssertionError', 'checks a condition is true and raises AssertionError if not'), ex: 'assert total(0) == 0' },
        { t: 'edge case', m: B('حالة طرفية: فاضي أو صفر أو أكبر قيمة', 'a boundary case: empty, zero or the largest value'), ex: 'average([])' },
        { t: 'refactor', m: B('إعادة ترتيب الكود من غير ما تغيّر اللي بيعمله', 'reorganising code without changing what it does'), ex: 'split a long script into functions' },
        { t: '__name__', m: B('متغير قيمته "__main__" لما الملف يتشغّل مباشرة', 'a variable equal to "__main__" when the file is run directly'), ex: 'if __name__ == "__main__":' }
      ],
      read: [{ lib: 'PEP 8 – Style Guide for Python Code', what: B('اقرا جزء Function and Variable Names.', 'Read the Function and Variable Names part.') }, { lib: 'Beyond the Basic Stuff with Python', what: B('الفصل عن Functions (تصميم الدوال).', 'The chapter on Functions (designing functions).') }],
      challenge: B('اعمل ملف `text_tools.py` فيه 6 دوال مفيدة ليك (clean_phone وmask وslugify وclean_email وsplit_name وformat_money) بـ type hints وdocstrings، ودالة `run_tests()` فيها 15 assert، وشغّلها من `main`.', 'Create `text_tools.py` with 6 functions useful to you (clean_phone, mask, slugify, clean_email, split_name and format_money) with type hints and docstrings, and a `run_tests()` with 15 asserts, run from `main`.'),
      quiz: [
        { q: B('`if __name__ == "__main__":` فايدتها:', 'What `if __name__ == "__main__":` is for:'), o: [B('الكود يشتغل لما تشغّل الملف بس، مش لما يتعمله import', 'the code runs when you run the file, not when it is imported'), B('بتسرّع البرنامج', 'it speeds the program up'), B('لازمة في كل ملف', 'every file must have it')], a: 0, why: B('عشان الملف ينفع كأداة وكموديول.', 'So the file works as both a tool and a module.') },
        { q: B('الـ type hints في Python:', 'Type hints in Python:'), o: [B('مش بتتفرض وقت التشغيل', 'are not enforced at run time'), B('بتطلّع خطأ لو النوع غلط', 'raise an error on a wrong type'), B('بتغيّر النوع لوحدها', 'convert the type by themselves')], a: 0, why: B('للتوضيح والأدوات.', 'They are for clarity and tools.') },
        { q: B('اسم دالة أحسن:', 'A better function name:'), o: ['send_invoice', 'do_stuff', 'x2'], a: 0, why: B('فعل واضح بيقول بتعمل إيه.', 'A clear verb that says what it does.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تعيد تنظيم مشروع حقيقي بالدوال وتختبره، وتعدّي اختبار الأسبوع.', 'Reorganise a real project with functions and test it, and pass the weekly test.'),
      review: [
        B('def وreturn مقابل print، والـ docstring.', 'def, return versus print, and the docstring.'),
        B('الافتراضي وبالاسم و*args و**kwargs، وفخ القايمة الافتراضية.', 'Defaults, keywords, *args and **kwargs, and the mutable default trap.'),
        B('الـ scope المحلي والعام، والدوال النضيفة، والقيم الراجعة المتعددة.', 'Local and global scope, pure functions, and multiple return values.'),
        B('الدوال كقيم: key وlambda وmap وfilter وclosures وdecorators.', 'Functions as values: key, lambda, map, filter, closures and decorators.'),
        B('التصميم: مهمة واحدة، type hints، assert، main، __name__.', 'Design: one job, type hints, assert, main and __name__.')
      ],
      project: B('**إعادة بناء متتبع المصاريف بالدوال** (`expenses.py` من أسبوع 4): قسّمه لدوال: `parse_date(text)` و`parse_amount(text)` (بترجّع None لو غلط)، و`add_expense(expenses, ...)` اللي بترجّع قايمة جديدة، و`by_category(expenses) -> dict`، و`top(expenses, n=5)`، و`format_table(expenses) -> str`، وmain فيها قايمة الأوامر بس. حط type hints وdocstrings، واكتب `tests()` فيها 12 assert على الدوال اللي مبتطبعش، وتتشغل بأمر `test`. البرنامج لازم يشتغل زي الأول بالظبط من برّه.', '**Rebuild the expense tracker with functions** (`expenses.py` from week 4): split it into `parse_date(text)` and `parse_amount(text)` (returning None when invalid), `add_expense(expenses, ...)` returning a new list, `by_category(expenses) -> dict`, `top(expenses, n=5)`, `format_table(expenses) -> str`, and a main that only holds the command menu. Add type hints and docstrings, and write `tests()` with 12 asserts on the non-printing functions, run by a `test` command. From the outside the program must behave exactly as before.'),
      test: [
        { q: B('`def f(x): x + 1` و`f(1)` بترجّع:', '`def f(x): x + 1`, then `f(1)` returns:'), o: ['None', '2', '1'], a: 0, why: B('مفيش return.', 'There is no return.') },
        { q: B('`def f(a, b=1, *c, **d)`؛ `f(1, 2, 3, x=4)`، قيمة c:', '`def f(a, b=1, *c, **d)`; for `f(1, 2, 3, x=4)` c is:'), o: ['(3,)', '[3]', '{"x": 4}'], a: 0, why: B('الموضعي الزيادة يروح لـ c كـ tuple.', 'Extra positional values go to c as a tuple.') },
        { q: B('نفس السؤال: قيمة d:', 'Same call: d is:'), o: ['{"x": 4}', '(4,)', 'None'], a: 0, why: B('بالاسم يروح لـ d.', 'Named values go to d.') },
        { q: B('ليه `def f(x, items=[])` غلط؟', 'Why is `def f(x, items=[])` wrong?'), o: [B('القايمة بتتشارك بين كل النداءات', 'the list is shared by every call'), B('ممنوع قوايم في المعاملات', 'lists are not allowed as parameters'), B('مش غلط', 'it is not wrong')], a: 0, why: B('القيمة الافتراضية بتتعمل مرة واحدة.', 'The default is created once.') },
        { q: B('`(lambda x, y: x * y)(3, 4)`:', '`(lambda x, y: x * y)(3, 4)`:'), o: ['12', '7', 'lambda'], a: 0, why: B('اتنادت على طول.', 'It is called right away.') },
        { q: B('`list(filter(None, [0, 1, "", "a"]))`:', '`list(filter(None, [0, 1, "", "a"]))`:'), o: ['[1, "a"]', '[0, ""]', '[0, 1, "", "a"]'], a: 0, why: B('None = سيب الـ truthy بس.', 'None keeps only truthy items.') },
        { q: B('متغير اتعمل جوه دالة بقيمة، وبعد ما خلصت:', 'A variable set inside a function, after the call ends:'), o: [B('مش موجود برّه', 'does not exist outside'), B('موجود بنفس القيمة', 'exists with the same value'), B('بقى global', 'became global')], a: 0, why: B('محلي.', 'It is local.') },
        { q: B('الـ decorator بياخد:', 'A decorator takes:'), o: [B('دالة ويرجّع دالة', 'a function and returns a function'), B('رقم', 'a number'), B('ملف', 'a file')], a: 0, why: B('بيلف الدالة.', 'It wraps the function.') },
        { q: B('`assert 1 + 1 == 3` بيطلّع:', '`assert 1 + 1 == 3` raises:'), o: ['AssertionError', 'ValueError', B('مفيش حاجة', 'nothing')], a: 0, why: B('الشرط غلط.', 'The condition is false.') },
        { q: B('`def make(n): return lambda x: x + n` و`make(5)(1)`:', '`def make(n): return lambda x: x + n`, then `make(5)(1)`:'), o: ['6', '5', '1'], a: 0, why: B('closure فاكرة n=5.', 'A closure remembering n=5.') },
        { q: B('أنسب قيمة راجعة لدالة بترجّع count وtotal وavg:', 'The best return for a function giving count, total and avg:'), o: [B('dict بأسماء', 'a named dict'), B('تطبعهم وخلاص', 'print them and stop'), B('global variables', 'global variables')], a: 0, why: B('قيم كتير بأسماء = dict.', 'Many named values = a dict.') },
        { q: B('`f(price=10, 0.2)` بيطلّع:', '`f(price=10, 0.2)` raises:'), o: ['SyntaxError', 'TypeError', B('بيشتغل', 'nothing, it works')], a: 0, why: B('الموضعي لازم قبل اللي بالاسم.', 'Positional arguments must come before keyword ones.') }
      ] }
  ]
};
