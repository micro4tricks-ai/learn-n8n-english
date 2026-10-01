// Python week 8 — Errors, debugging and logging.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الأخطاء والـ Debugging والـ Logging', 'Errors, debugging and logging'),
  goal: B('تمسك الأخطاء المتوقعة بـ try/except من غير ما تخبّي الغلط الحقيقي، وتطلّع أخطاء واضحة بـ raise، وتلاقي أي bug بالـ debugger، وتسجّل اللي سكربتك بيعمله بـ logging — عشان السكربت يشتغل لوحده بالليل وانت مطمّن.',
          'Catch expected errors with try/except without hiding real bugs, raise clear errors, find any bug with the debugger, and record what your script does with logging — so a script can run alone at night while you sleep easy.'),
  days: [
    { title: B('try وexcept', 'try and except'),
      goal: B('تمسك أخطاء معيّنة وتتصرف فيها، وتستخدم else وfinally، ومتمسكش كل حاجة على العميانى.', 'Catch specific errors and handle them, use else and finally, and never catch everything blindly.'),
      learn: [
        { h: B('امسك الخطأ اللي متوقعه', 'Catch the error you expect'),
          p: B('`try:` فيها الكود اللي ممكن يقع، و`except ValueError:` بتتنفّذ لو حصل الخطأ ده بالذات. حط في try أقل كود ممكن، وامسك نوع محدد. `except ValueError as e:` بتديك الخطأ نفسه تطبع رسالته.', '`try:` holds the code that may fail, and `except ValueError:` runs only when that particular error happens. Put as little code as possible in try, and catch a specific type. `except ValueError as e:` gives you the error itself to print its message.'),
          ex: 'for text in ["42", "4.5", "abc", ""]:\n    try:\n        qty = int(text)\n    except ValueError as e:\n        print(f"{text!r}: not a whole number ({e})")\n        continue\n    print(f"{text!r}: ok -> {qty * 2}")', run: 1 },
        { h: B('أكتر من except، وelse وfinally', 'Several excepts, else and finally'),
          p: B('تقدر تحط كذا except لأنواع مختلفة، أو tuple: `except (KeyError, IndexError):`. `else` بتتنفّذ لو مفيش خطأ حصل (حط فيها الكود اللي يكمّل)، و`finally` بتتنفّذ **دايمًا** خطأ أو لأ (تقفل ملف، تطبع «خلصت»).', 'You can have several excepts for different types, or a tuple: `except (KeyError, IndexError):`. `else` runs when no error happened (put the follow-up code there), and `finally` runs **always**, error or not (close a file, print «done»).'),
          ex: 'def safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print("cannot divide by zero")\n        return None\n    except TypeError as e:\n        print("bad types:", e)\n        return None\n    else:\n        return round(result, 2)\n    finally:\n        print(f"tried {a!r} / {b!r}")\n\nprint(safe_divide(10, 4))\nprint(safe_divide(10, 0))\nprint(safe_divide("10", 2))', run: 1 },
        { h: B('متمسكش كل حاجة', 'Do not catch everything'),
          p: B('`except:` لوحدها أو `except Exception: pass` بتبلع كل الأخطاء، حتى الـ bugs الحقيقية (غلطة كتابة في اسم متغير)، والسكربت يكمّل بنتايج غلط من غير ما تعرف. لو لازم تمسك كله (في الطبقة الأعلى)، سجّل الخطأ كامل وماتسكتش عليه.', 'A bare `except:` or `except Exception: pass` swallows every error, even real bugs (a misspelt variable), and the script carries on with wrong results without you knowing. If you must catch everything (at the top level), log the full error and never stay silent.'),
          ex: 'prices = {"pen": 7.5}\n\ndef price_of(item):\n    try:\n        return prices[itme]      # typo: a real bug\n    except Exception:\n        return 0                 # hides the bug!\n\nprint(price_of("pen"))   # prints 0 and you never learn why', run: 1 }
      ],
      practice: [
        B('اكتب `to_number(text)` بترجّع int أو float أو None من غير ما تقع، واختبرها على 6 نصوص.', 'Write `to_number(text)` returning an int, a float or None without crashing, and test it on 6 strings.'),
        B('اقرا مفتاح من dict وعنصر من قايمة في نفس try، وامسك الخطأين بـ except واحدة.', 'Read a dict key and a list item in one try, and catch both errors with a single except.'),
        B('استخدم else وfinally في مثال واحد واطبع ترتيب التنفيذ.', 'Use else and finally in one example and print the order things run in.'),
        B('صلّح مثال «متمسكش كل حاجة»: خليه يمسك KeyError بس، وشوف الـ bug بيبان.', 'Fix the «do not catch everything» example: catch only KeyError and watch the bug appear.')
      ],
      code: [
        { u: B('قراءة أرقام من مدخلات متلخبطة', 'Reading numbers from messy input'), p: 'rows = ["Sara,1200", "Omar,abc", "Mona", "Hany,450.5"]\ngood, bad = [], []\nfor line in rows:\n    try:\n        name, amount = line.split(",")\n        good.append((name, float(amount)))\n    except ValueError as e:\n        bad.append((line, str(e)))\nprint("ok:", good)\nprint("skipped:", bad)', run: 1 }
      ],
      words: [
        { t: 'exception', m: B('خطأ بيحصل وقت التشغيل وبيوقف البرنامج لو محدش مسكه', 'an error at run time that stops the program unless caught'), ex: 'ValueError, KeyError' },
        { t: 'try/except', m: B('جملة بتجرّب كود وتمسك أخطاء معيّنة منه', 'a statement that tries code and catches given errors'), ex: 'try: ... except ValueError: ...' },
        { t: 'finally', m: B('جزء بيتنفّذ دايمًا بعد try، خطأ أو لأ', 'a part that always runs after try, error or not'), ex: 'finally: f.close()' },
        { t: 'ZeroDivisionError', m: B('خطأ القسمة على صفر', 'the error for dividing by zero'), ex: '10 / 0' },
        { t: 'bare except', m: B('except من غير نوع: بتمسك كل حاجة وتخبي الـ bugs', 'an except with no type: catches everything and hides bugs'), ex: 'except:  # avoid' },
        { t: 'swallow an error', m: B('تمسك خطأ ومتعملش بيه حاجة فيضيع', 'catching an error and doing nothing, so it is lost'), ex: 'except Exception: pass' }
      ],
      read: [{ lib: 'Errors and Exceptions (tutorial)', what: B('اقرا 8.3 Handling Exceptions و8.7 Defining Clean-up Actions.', 'Read 8.3 Handling Exceptions and 8.7 Defining Clean-up Actions.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Functions: جزء Exception Handling.', 'The Functions chapter: the Exception Handling part.') }],
      challenge: B('رجّع لمشروع «كاشير المحل» (أسبوع 3) وخليه مستحيل يقع من أي مدخل: سعر حروف، كمية سالبة، رقم سطر مش موجود في remove — وفي كل حالة رسالة واضحة.', 'Go back to the «shop cashier» project (week 3) and make it impossible to crash with any input: letters for a price, a negative quantity, a missing line number in remove — each with a clear message.'),
      quiz: [
        { q: B('`else` في try/except بتتنفّذ امتى؟', 'When does `else` in try/except run?'), o: [B('لو مفيش خطأ حصل', 'when no error happened'), B('لو حصل خطأ', 'when an error happened'), B('دايمًا', 'always')], a: 0, why: B('finally هي اللي دايمًا.', 'finally is the one that always runs.') },
        { q: B('ليه `except Exception: pass` خطر؟', 'Why is `except Exception: pass` dangerous?'), o: [B('بيخبّي الـ bugs الحقيقية', 'it hides real bugs'), B('بيبطّأ الكود', 'it slows the code'), B('مش مسموح في Python', 'Python forbids it')], a: 0, why: B('الغلط بيعدّي من غير ما تعرف.', 'Mistakes slip by unnoticed.') },
        { q: B('عشان تمسك KeyError وIndexError مع بعض:', 'To catch KeyError and IndexError together:'), o: ['except (KeyError, IndexError):', 'except KeyError or IndexError:', 'except KeyError, IndexError:'], a: 0, why: B('tuple من الأنواع.', 'A tuple of types.') }
      ] },

    { title: B('raise وأخطاؤك انت', 'raise and your own errors'),
      goal: B('تطلّع أخطاء واضحة من دوالك بـ raise، وتعمل نوع خطأ خاص بيك، وتربط الأخطاء ببعض، وتختار بين «اسأل الأول» و«جرّب واتصرف».', 'Raise clear errors from your functions, define your own error type, chain errors, and choose between «look before you leap» and «try and handle».'),
      learn: [
        { h: B('raise برسالة واضحة', 'raise with a clear message'),
          p: B('لو دالتك جالها مدخل مينفعش، متطبعش وترجّع None وخلاص؛ اطلّع خطأ: `raise ValueError(f"quantity must be positive, got {qty}")`. اللي نادى الدالة يقرر يتصرف إزاي، والرسالة بتقول المشكلة بالظبط والقيمة اللي جت.', 'When your function receives unusable input, do not print and return None; raise an error: `raise ValueError(f"quantity must be positive, got {qty}")`. The caller decides what to do, and the message states the exact problem and the value received.'),
          ex: 'def add_item(cart, name, qty):\n    if not name:\n        raise ValueError("item name is empty")\n    if qty <= 0:\n        raise ValueError(f"quantity must be positive, got {qty}")\n    cart[name] = cart.get(name, 0) + qty\n\ncart = {}\nadd_item(cart, "pen", 2)\ntry:\n    add_item(cart, "bag", 0)\nexcept ValueError as e:\n    print("rejected:", e)\nprint(cart)', run: 1 },
        { h: B('نوع خطأ خاص بيك', 'Your own error type'),
          p: B('`class PaymentError(Exception): pass` — بقى عندك خطأ باسم بيوصف مشكلتك، واللي بيستخدم كودك يقدر يمسكه لوحده من غير ما يمسك أخطاء Python العادية. ممكن تعمل عيلة: `class ShopError(Exception)` وتحتها `class OutOfStock(ShopError)`.', '`class PaymentError(Exception): pass` — now you have an error named after your problem, and users of your code can catch it alone without catching Python’s ordinary errors. You can build a family: `class ShopError(Exception)` with `class OutOfStock(ShopError)` below it.'),
          ex: 'class ShopError(Exception):\n    """Base error for the shop."""\n\nclass OutOfStock(ShopError):\n    pass\n\nstock = {"pen": 3}\n\ndef take(item, qty):\n    if stock.get(item, 0) < qty:\n        raise OutOfStock(f"{item}: wanted {qty}, have {stock.get(item, 0)}")\n    stock[item] -= qty\n\nfor item, qty in [("pen", 2), ("pen", 5), ("bag", 1)]:\n    try:\n        take(item, qty)\n        print("ok", item, qty)\n    except ShopError as e:\n        print(type(e).__name__, "-", e)', run: 1 },
        { h: B('raise from، وEAFP مقابل LBYL', 'raise from, and EAFP versus LBYL'),
          p: B('لما تمسك خطأ وتطلّع خطأ أوضح منه: `raise ConfigError("bad port") from e` بيحفظ الخطأ الأصلي في الـ traceback. وفيه أسلوبين: «اسأل الأول» `if key in d:` (LBYL)، و«جرّب واتصرف» `try: d[key]` (EAFP). في Python التاني شائع، خصوصًا مع الملفات والشبكة لأن الحال ممكن يتغير بين السؤال والتنفيذ.', 'When you catch an error and raise a clearer one: `raise ConfigError("bad port") from e` keeps the original in the traceback. There are two styles: «look before you leap» `if key in d:` (LBYL) and «easier to ask forgiveness» `try: d[key]` (EAFP). Python favours the second, especially with files and the network, because things can change between the check and the action.'),
          ex: 'class ConfigError(Exception):\n    pass\n\ndef read_port(settings):\n    try:\n        return int(settings["PORT"])\n    except (KeyError, ValueError) as e:\n        raise ConfigError("PORT must be set to a number") from e\n\nfor s in [{"PORT": "8080"}, {"PORT": "eighty"}, {}]:\n    try:\n        print(read_port(s))\n    except ConfigError as e:\n        print("config problem:", e, "| caused by", repr(e.__cause__))', run: 1 }
      ],
      practice: [
        B('اكتب `parse_date(text)` بتطلّع ValueError برسالة فيها النص الغلط لو مش `YYYY-MM-DD`.', 'Write `parse_date(text)` raising ValueError with the bad text in the message when it is not `YYYY-MM-DD`.'),
        B('اعمل عيلة أخطاء لمشروع المصاريف: `ExpenseError` وتحتها `BadAmount` و`BadDate`.', 'Make an error family for the expense project: `ExpenseError` with `BadAmount` and `BadDate` under it.'),
        B('اكتب نفس الفحص مرتين: LBYL وEAFP، وقول أنهي أوضح هنا.', 'Write the same check twice, LBYL and EAFP, and say which is clearer here.'),
        B('استخدم `raise ... from e` واقرا الـ traceback الكامل في التيرمنال (الجزء «The above exception was the direct cause»).', 'Use `raise ... from e` and read the full traceback in the terminal (the «The above exception was the direct cause» part).')
      ],
      code: [
        { u: B('التحقق في أول الدالة', 'Validating at the top of a function'), p: 'def transfer(balance: float, amount: float) -> float:\n    if not isinstance(amount, (int, float)):\n        raise TypeError(f"amount must be a number, got {type(amount).__name__}")\n    if amount <= 0:\n        raise ValueError("amount must be positive")\n    if amount > balance:\n        raise ValueError(f"insufficient balance: {balance} < {amount}")\n    return balance - amount\n\nfor amt in [200, -5, 5000, "100"]:\n    try:\n        print(transfer(1000, amt))\n    except (TypeError, ValueError) as e:\n        print(f"{amt!r}: {e}")', run: 1 }
      ],
      words: [
        { t: 'raise', m: B('بتطلّع خطأ بنفسك لما حاجة غلط', 'throws an error yourself when something is wrong'), ex: 'raise ValueError("empty name")' },
        { t: 'custom exception', m: B('نوع خطأ انت بتعمله بكلاس يورث Exception', 'an error type you define with a class inheriting Exception'), ex: 'class OutOfStock(Exception): pass' },
        { t: 'exception chaining', m: B('ربط خطأ جديد بالخطأ الأصلي بـ from', 'linking a new error to the original with from'), ex: 'raise ConfigError(...) from e' },
        { t: 'EAFP', m: B('أسلوب «جرّب واتصرف لو وقع» بـ try', 'the «try it and handle failure» style with try'), ex: 'try: d[k] except KeyError: ...' },
        { t: 'LBYL', m: B('أسلوب «اسأل الأول» بـ if قبل التنفيذ', 'the «check first» style with if before acting'), ex: 'if k in d: d[k]' },
        { t: 'error message', m: B('النص اللي بيوصف الخطأ؛ لازم يقول المشكلة والقيمة', 'the text describing an error; it should state the problem and the value'), ex: '"quantity must be positive, got 0"' }
      ],
      read: [{ lib: 'Errors and Exceptions (tutorial)', what: B('اقرا 8.4 Raising Exceptions و8.5 Exception Chaining و8.6 User-defined Exceptions.', 'Read 8.4 Raising Exceptions, 8.5 Exception Chaining and 8.6 User-defined Exceptions.') }, { lib: 'Python Glossary', what: B('دوّر على EAFP وLBYL.', 'Look up EAFP and LBYL.') }],
      challenge: B('اكتب `validate_order(order: dict)` بتتأكد من 6 حاجات (customer وemail فيه @ وitems مش فاضية وكل qty موجب وكل price رقم وstatus من قايمة مسموحة) وتطلّع `InvalidOrder` برسالة بتجمع كل المشاكل مرة واحدة مش أول واحدة بس.', 'Write `validate_order(order: dict)` that checks 6 things (customer, an email with @, non-empty items, every qty positive, every price a number, status from an allowed list) and raises `InvalidOrder` with a message listing every problem at once, not only the first.'),
      quiz: [
        { q: B('دالة جالها مدخل غلط، الأحسن:', 'A function gets bad input; the best response:'), o: [B('raise خطأ برسالة واضحة', 'raise an error with a clear message'), B('print ورجّع None', 'print and return None'), B('تكمّل عادي', 'carry on as usual')], a: 0, why: B('اللي نادى يقرر يتصرف إزاي.', 'The caller decides what to do.') },
        { q: B('الخطأ الخاص بيك بيورث من:', 'Your own error class inherits from:'), o: ['Exception', 'Error', B('object بس', 'object only')], a: 0, why: B('Exception أو أي نوع تحتها.', 'Exception or one of its subclasses.') },
        { q: B('`try: x = d["k"]` بدل `if "k" in d:` ده أسلوب:', 'Using `try: x = d["k"]` instead of `if "k" in d:` is:'), o: ['EAFP', 'LBYL', 'OOP'], a: 0, why: B('جرّب واتصرف.', 'Try it and handle failure.') }
      ] },

    { title: B('الـ Debugging: تلاقي الغلطة', 'Debugging: finding the bug'),
      goal: B('تلاقي أي bug بطريقة منظمة: تقرا الـ traceback، وتصغّر المشكلة، وتستخدم print بذكاء، وbreakpoint()، وdebugger بتاع VS Code.', 'Find any bug methodically: read the traceback, shrink the problem, use print wisely, breakpoint(), and the VS Code debugger.'),
      learn: [
        { h: B('طريقة مش تخمين', 'A method, not guessing'),
          p: B('1) اقرا الـ traceback كله (آخر سطر والسطر اللي في ملفك). 2) كرّر الغلطة بأصغر مدخل ممكن. 3) اسأل: كنت متوقع إيه، وحصل إيه؟ 4) اطبع أو وقّف قبل مكان الخطأ وشوف القيم. 5) غيّر حاجة واحدة بس واختبر. واشرح المشكلة بصوت عالي لحد (أو لبطة على المكتب) — بتلاقي الحل وانت بتتكلم.', '1) Read the whole traceback (the last line and the line in your file). 2) Reproduce the bug with the smallest possible input. 3) Ask: what did I expect, and what happened? 4) Print or pause just before the failure and look at the values. 5) Change one thing only, then test. And explain the problem out loud to someone (or a rubber duck on your desk) — you often find the answer while talking.'),
          ex: 'def average(values):\n    total = 0\n    for v in values:\n        total += v\n    return total / len(values)\n\nscores = [80, 95, 70]\nprint(average(scores))\nprint(average([]))      # step 2: the smallest input that breaks it', run: 1, err: 1 },
        { h: B('print بذكاء و`{x=}`', 'Smart printing and `{x=}`'),
          p: B('اطبع القيمة **ونوعها** قبل السطر اللي بيقع: `print(f"{price=} {type(price)=}")`. كتير جدًا المشكلة إن القيمة نص "120" مش رقم 120، أو None. شيل الـ prints دي بعد ما تخلص (أو حوّلها logging بكرة).', 'Print the value **and its type** just before the failing line: `print(f"{price=} {type(price)=}")`. Very often the problem is that the value is the text "120", not the number 120, or None. Remove those prints when done (or turn them into logging tomorrow).'),
          ex: 'row = {"price": "120", "qty": 3}\nprice = row["price"]\nprint(f"{price=} {type(price)=}")\nprint(price * row["qty"])      # "120120120" — the clue!\nprint(float(price) * row["qty"])', run: 1 },
        { h: B('breakpoint() والـ debugger', 'breakpoint() and the debugger'),
          p: B('`breakpoint()` في أي سطر بتوقّف البرنامج هناك وتفتح pdb في التيرمنال: `p x` اطبع، `n` السطر الجاي، `s` ادخل جوه الدالة، `c` كمّل، `q` اخرج. في VS Code أسهل: دوس على يمين رقم السطر تحط نقطة حمرا، وشغّل بـ F5، وشوف كل المتغيرات على الشمال، وامشي بـ F10 وF11.', '`breakpoint()` on any line pauses the program there and opens pdb in the terminal: `p x` print, `n` next line, `s` step into the function, `c` continue, `q` quit. VS Code is easier: click left of a line number to set a red dot, run with F5, see every variable on the left, and step with F10 and F11.'),
          ex: 'def total(lines):\n    result = 0\n    for price, qty in lines:\n        breakpoint()        # pdb: p price, p qty, n, c\n        result += price * qty\n    return result\n\nprint(total([(10, 2), ("5", 3)]))', show: 1 }
      ],
      practice: [
        B('صلّح `average([])` بطريقتين: ترجّع 0، أو تطلّع ValueError واضح — واختار.', 'Fix `average([])` two ways — return 0, or raise a clear ValueError — and choose one.'),
        B('شغّل مثال breakpoint في التيرمنال وجرّب p وn وc.', 'Run the breakpoint example in the terminal and try p, n and c.'),
        B('حط نقطة توقف في VS Code في لوب وتابع قيمة المتغير في كل لفة بـ F10.', 'Set a breakpoint in VS Code inside a loop and follow a variable on each round with F10.'),
        B('خد bug حصلك الأسبوع ده واكتبه كمثال صغير من 5 سطور بيكرّره (minimal example).', 'Take a bug you hit this week and write it as a 5-line example that reproduces it (a minimal example).')
      ],
      code: [
        { u: B('3 bugs تلاقيهم', '3 bugs to find'), p: 'def apply_discount(prices, percent):\n    for i in range(1, len(prices)):          # bug 1\n        prices[i] = prices[i] * percent / 100   # bug 2\n    return prices\n\ndef count_words(text):\n    counts = {}\n    for w in text.split():\n        counts[w] = counts.get(w, 1) + 1      # bug 3\n    return counts\n\nprint(apply_discount([100, 200, 300], 10))\nprint(count_words("a b a"))', run: 1 }
      ],
      words: [
        { t: 'bug', m: B('غلطة في الكود بتخلّي النتيجة غلط أو البرنامج يقع', 'a mistake in code that gives wrong results or a crash'), ex: 'range(1, n) skips the first item' },
        { t: 'debugger', m: B('أداة بتوقّف البرنامج وتخليك تشوف قيمه سطر سطر', 'a tool that pauses a program so you can inspect it line by line'), ex: 'VS Code F5' },
        { t: 'breakpoint', m: B('نقطة توقف: السطر اللي البرنامج يقف عنده', 'a pause point: the line where the program stops'), ex: 'breakpoint()' },
        { t: 'pdb', m: B('الـ debugger اللي جاي مع Python في التيرمنال', 'the debugger that ships with Python, in the terminal'), ex: '(Pdb) p total' },
        { t: 'step over', m: B('تنفيذ السطر الجاي كله من غير ما تدخل جوه الدوال', 'running the next line without going inside functions'), ex: 'F10 / n' },
        { t: 'minimal reproducible example', m: B('أصغر كود بيكرّر المشكلة، تسأل بيه أو تصلّح منه', 'the smallest code that shows the problem, to ask about or fix'), ex: 'five lines instead of the whole app' },
        { t: 'rubber duck debugging', m: B('تشرح الكود سطر سطر بصوت عالي فتلاقي الغلطة', 'explaining code line by line out loud until you spot the bug'), ex: 'talk it through with a duck' }
      ],
      read: ['lib:pdb — The Python Debugger', { lib: 'Python in Visual Studio Code', what: B('افتح جزء Configure and run the debugger.', 'Open the Configure and run the debugger part.') }],
      challenge: B('لاقي وصلّح الـ 3 bugs في «3 bugs تلاقيهم» بالـ debugger (مش بالتخمين)، واكتب لكل bug: كنت متوقع إيه، وحصل إيه، والسبب.', 'Find and fix the 3 bugs in «3 bugs to find» with the debugger (not by guessing), and write for each: what you expected, what happened, and the cause.'),
      quiz: [
        { q: B('أول خطوة لما الكود يقع:', 'The first step when code crashes:'), o: [B('تقرا الـ traceback كله', 'read the whole traceback'), B('تمسح الكود وتبدأ من الأول', 'delete the code and start over'), B('تحط try حوالين كله', 'wrap everything in try')], a: 0, why: B('فيه نوع الخطأ والسطر.', 'It has the error type and the line.') },
        { q: B('في pdb الأمر `n` بيعمل:', 'In pdb the `n` command:'), o: [B('ينفّذ السطر الجاي', 'runs the next line'), B('يخرج', 'quits'), B('يطبع n', 'prints n')], a: 0, why: B('next.', 'next.') },
        { q: B('`"120" * 3` بيطلع `"120120120"`. ده معناه:', '`"120" * 3` gives `"120120120"`. That means:'), o: [B('السعر نص مش رقم', 'the price is text, not a number'), B('Python فيها bug', 'Python has a bug'), B('الضرب غلط', 'multiplication is wrong')], a: 0, why: B('حوّله float الأول.', 'Convert it to float first.') }
      ] },

    { title: B('الـ Logging بدل print', 'Logging instead of print'),
      goal: B('تسجّل اللي سكربتك بيعمله بمستويات (DEBUG وINFO وWARNING وERROR)، في التيرمنال وفي ملف، بالوقت والمكان، وتسجّل الأخطاء كاملة.', 'Record what your script does with levels (DEBUG, INFO, WARNING, ERROR), in the terminal and in a file, with the time and place, and log errors in full.'),
      learn: [
        { h: B('ليه logging؟', 'Why logging?'),
          p: B('السكربت اللي بيشتغل لوحده الساعة 3 الفجر محدش بيشوف الـ print بتاعه. الـ logging بيكتب كل سطر بالوقت والمستوى، وتقدر تخليه يكتب في ملف، وتغيّر قد إيه تفاصيل من غير ما تمسح سطور. `logging.basicConfig(level=logging.INFO)` وبعدين `logging.info("...")`.', 'A script running alone at 3 a.m. has nobody reading its prints. Logging writes every line with the time and level, can write to a file, and lets you change how much detail you see without deleting lines. `logging.basicConfig(level=logging.INFO)` then `logging.info("...")`.'),
          ex: 'import logging, sys\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)-7s %(message)s", datefmt="%H:%M:%S", stream=sys.stdout, force=True)\nlogging.debug("not shown: below INFO")\nlogging.info("starting the report")\nlogging.warning("3 rows had no email")\nlogging.error("could not reach the API")', run: 1 },
        { h: B('المستويات', 'The levels'),
          p: B('`DEBUG` تفاصيل للتصحيح، `INFO` الشغل ماشي («بعت 42 إيميل»)، `WARNING` حاجة غريبة بس كمّلنا، `ERROR` حاجة فشلت، `CRITICAL` السكربت مش هيقدر يكمّل. في الشغل العادي خلي المستوى INFO، ولما تدوّر على مشكلة خليه DEBUG.', '`DEBUG` is detail for fixing, `INFO` normal progress («sent 42 emails»), `WARNING` something odd but we carried on, `ERROR` something failed, `CRITICAL` the script cannot go on. Run at INFO normally and switch to DEBUG when hunting a problem.'),
          ex: 'import logging, sys\nlogging.basicConfig(level=logging.DEBUG, format="%(levelname)s:%(name)s: %(message)s", stream=sys.stdout, force=True)\nlog = logging.getLogger("invoices")\nfor amount in [1200, 0, -50]:\n    log.debug("checking amount=%s", amount)\n    if amount == 0:\n        log.warning("zero invoice skipped")\n    elif amount < 0:\n        log.error("negative invoice: %s", amount)\n    else:\n        log.info("invoice ok: %s", amount)', run: 1 },
        { h: B('ملف لوج والأخطاء كاملة', 'A log file and full errors'),
          p: B('`filename="app.log"` في basicConfig بيكتب في ملف. `log.exception("...")` جوه except بيسجّل الرسالة **والـ traceback كامل** — أهم سطر في أي سكربت أتمتة. و`getLogger(__name__)` في كل موديول بيوضح السطر جه منين.', '`filename="app.log"` in basicConfig writes to a file. `log.exception("...")` inside an except records the message **and the full traceback** — the most important line in any automation script. `getLogger(__name__)` in each module shows where a line came from.'),
          ex: 'import logging, sys\nlogging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s", stream=sys.stdout, force=True)\nlog = logging.getLogger("sync")\n\ndef sync(order):\n    return 100 / order["qty"]\n\nfor order in [{"id": 1, "qty": 4}, {"id": 2, "qty": 0}]:\n    try:\n        sync(order)\n        log.info("order %s synced", order["id"])\n    except Exception:\n        log.exception("order %s failed", order["id"])', run: 1 }
      ],
      practice: [
        B('حوّل كل الـ print في سكربت قديم لـ logging بمستويات مناسبة.', 'Turn every print in an old script into logging at suitable levels.'),
        B('خلي اللوج يتكتب في `app.log` وفي التيرمنال مع بعض (handlers اتنين).', 'Write the log to `app.log` and the terminal at the same time (two handlers).'),
        B('اعمل خطأ جوه try وسجّله بـ `log.exception` وافتح ملف اللوج وشوف الـ traceback.', 'Cause an error inside try, record it with `log.exception`, then open the log file and see the traceback.'),
        B('غيّر المستوى من INFO لـ DEBUG بمتغير بيئة `LOG_LEVEL` من غير ما تعدّل الكود.', 'Switch the level from INFO to DEBUG with a `LOG_LEVEL` environment variable without editing the code.')
      ],
      code: [
        { u: B('إعداد لوج لأي سكربت', 'A logging setup for any script'), p: 'import logging, os\n\ndef setup_logging(name: str = "app") -> logging.Logger:\n    level = os.environ.get("LOG_LEVEL", "INFO").upper()\n    fmt = logging.Formatter("%(asctime)s %(levelname)-7s %(name)s: %(message)s")\n    log = logging.getLogger(name)\n    log.setLevel(level)\n    for handler in (logging.StreamHandler(), logging.FileHandler(f"{name}.log", encoding="utf-8")):\n        handler.setFormatter(fmt)\n        log.addHandler(handler)\n    return log\n\nlog = setup_logging("invoice-bot")\nlog.info("ready")' }
      ],
      words: [
        { t: 'logging', m: B('تسجيل أحداث البرنامج بالوقت والمستوى بدل print', 'recording a program’s events with time and level instead of print'), ex: 'logging.info("sent 42 emails")' },
        { t: 'log level', m: B('درجة أهمية السطر: DEBUG لحد CRITICAL', 'how important a line is: DEBUG up to CRITICAL'), ex: 'logging.WARNING' },
        { t: 'logger', m: B('كائن بيسجّل باسم معيّن', 'an object that logs under a given name'), ex: 'logging.getLogger(__name__)' },
        { t: 'handler', m: B('المكان اللي اللوج بيروحله: شاشة أو ملف', 'where log lines go: the screen or a file'), ex: 'logging.FileHandler("app.log")' },
        { t: 'log file', m: B('ملف بيتكتب فيه سجل البرنامج', 'a file the program writes its log into'), ex: 'app.log' },
        { t: 'log.exception', m: B('بتسجّل رسالة خطأ ومعاها الـ traceback كامل', 'logs an error message with the full traceback'), ex: 'except Exception: log.exception("failed")' }
      ],
      read: [{ lib: 'logging HOWTO', what: B('اقرا Basic Logging Tutorial كله.', 'Read the whole Basic Logging Tutorial.') }, { lib: 'Real Python Tutorials', what: B('دوّر على «logging in python».', 'Search for «logging in python».') }],
      challenge: B('اكتب سكربت «معالجة طلبات» بيلف على 10 طلبات (منهم 3 بمشاكل مختلفة)، ويسجّل INFO لكل نجاح، وWARNING للحاجات الغريبة، وexception للفشل، وفي الآخر سطر INFO بالملخص (كام نجح وكام فشل). اللوج في ملف وفي التيرمنال.', 'Write an «order processing» script that loops over 10 orders (3 with different problems), logging INFO for each success, WARNING for odd things and an exception for failures, ending with an INFO summary line (how many succeeded and failed). Log to a file and the terminal.'),
      quiz: [
        { q: B('سطر «فيه 3 صفوف ملهاش إيميل بس كمّلنا» مستواه:', 'A line «3 rows had no email but we carried on» is level:'), o: ['WARNING', 'ERROR', 'DEBUG'], a: 0, why: B('غريب بس مش فشل.', 'Odd, but not a failure.') },
        { q: B('`log.exception` فرقها عن `log.error`:', 'How `log.exception` differs from `log.error`:'), o: [B('بتضيف الـ traceback كامل', 'it adds the full traceback'), B('أسرع', 'it is faster'), B('مفيش فرق', 'no difference')], a: 0, why: B('استخدمها جوه except.', 'Use it inside except.') },
        { q: B('المستوى INFO، سطر `log.debug(...)`:', 'At level INFO, a `log.debug(...)` line:'), o: [B('مش بيظهر', 'is not shown'), B('بيظهر', 'is shown'), B('بيطلّع خطأ', 'raises an error')], a: 0, why: B('DEBUG أقل من INFO.', 'DEBUG is below INFO.') }
      ] },

    { title: B('سكربتات متينة', 'Robust scripts'),
      goal: B('تكتب سكربت أتمتة يتحمل الفشل: يعيد المحاولة بانتظار متزايد، ينضّف وراه بـ with، يخرج بكود صح، ويتعامل مع Ctrl+C بأدب.', 'Write an automation script that survives failure: retries with growing waits, cleans up with with, exits with the right code, and handles Ctrl+C politely.'),
      learn: [
        { h: B('إعادة المحاولة بانتظار متزايد', 'Retries with exponential backoff'),
          p: B('الشبكة والـ APIs بتفشل أحيانًا لثواني. الحل: جرّب تاني بعد 1 ثانية، وبعدين 2، وبعدين 4 (backoff)، ومعاهم شوية عشوائية (jitter) عشان مليون سكربت ميرجعوش في نفس اللحظة. وحدد عدد محاولات أقصى، وأعد المحاولة للأخطاء المؤقتة بس (timeout و429 و503)، مش لـ 401 مثلًا.', 'Networks and APIs fail for a few seconds now and then. The fix: retry after 1 second, then 2, then 4 (backoff), with a little randomness (jitter) so a million scripts do not come back at the same instant. Cap the number of attempts, and retry only temporary errors (timeouts, 429, 503), never a 401, for example.'),
          ex: 'import random, time\nrandom.seed(5)\n\nclass TemporaryError(Exception):\n    pass\n\ndef call_api():\n    if random.random() < 0.7:\n        raise TemporaryError("503 Service Unavailable")\n    return {"ok": True}\n\ndef with_retry(func, attempts=5, base=0.1):\n    for n in range(1, attempts + 1):\n        try:\n            return func()\n        except TemporaryError as e:\n            if n == attempts:\n                raise\n            wait = base * 2 ** (n - 1) + random.uniform(0, base)\n            print(f"attempt {n} failed ({e}); waiting {wait:.2f}s")\n            time.sleep(wait)\n\nprint(with_retry(call_api))', run: 1 },
        { h: B('with: نضّف وراك دايمًا', 'with: always clean up'),
          p: B('`with open("f.txt") as f:` بيقفل الملف لوحده حتى لو حصل خطأ في النص. أي حاجة بتتفتح وتتقفل (ملف، اتصال قاعدة بيانات، قفل) بتتعمل بـ with. وتقدر تعمل واحد بنفسك بـ `contextlib.contextmanager` — زي مؤقت بيقيس أي block.', '`with open("f.txt") as f:` closes the file by itself even if an error happens midway. Anything opened and closed (a file, a database connection, a lock) goes in a with. You can make your own with `contextlib.contextmanager` — like a timer for any block.'),
          ex: 'import time\nfrom contextlib import contextmanager\n\n@contextmanager\ndef timer(label):\n    start = time.perf_counter()\n    try:\n        yield\n    finally:\n        print(f"{label}: {time.perf_counter() - start:.3f}s")\n\nwith timer("build list"):\n    data = [n * n for n in range(300_000)]\ntry:\n    with timer("failing block"):\n        1 / 0\nexcept ZeroDivisionError:\n    print("error handled, and the timer still printed")', run: 1 },
        { h: B('كود الخروج وCtrl+C', 'Exit codes and Ctrl+C'),
          p: B('السكربت اللي بيخلص صح بيخرج بـ 0، واللي فشل بـ رقم تاني: `sys.exit(1)`. ده اللي cron وTask Scheduler وGitHub Actions وn8n (Execute Command) بيشوفوه عشان يعرفوا نجح ولا لأ. و`except KeyboardInterrupt:` في main بيخليك تقفل بأدب لما المستخدم يدوس Ctrl+C (تحفظ اللي خلص وتخرج).', 'A script that ends well exits with 0, and a failed one with another number: `sys.exit(1)`. That is what cron, Task Scheduler, GitHub Actions and n8n (Execute Command) look at to know whether it worked. `except KeyboardInterrupt:` in main lets you stop politely when the user presses Ctrl+C (save what is done and exit).'),
          ex: 'import sys, logging\n\nlog = logging.getLogger("job")\n\ndef run() -> int:\n    done = 0\n    try:\n        for i in range(3):\n            done += 1\n        return 0\n    except KeyboardInterrupt:\n        log.warning("stopped by user after %s items", done)\n        return 130\n    except Exception:\n        log.exception("job failed")\n        return 1\n\nif __name__ == "__main__":\n    code = run()\n    print("exit code", code)\n    sys.exit(code)', run: 1 }
      ],
      practice: [
        B('استخدم `with_retry` على دالة بتفشل عشوائيًا واطبع عدد المحاولات.', 'Use `with_retry` on a randomly failing function and print the number of attempts.'),
        B('اعمل context manager بيطبع «بداية» و«نهاية» حوالين أي block حتى لو حصل خطأ.', 'Make a context manager that prints «start» and «end» around any block, even when an error happens.'),
        B('شغّل سكربت بيخرج بـ `sys.exit(2)` واعرض الكود في التيرمنال (`$LASTEXITCODE` أو `echo $?`).', 'Run a script that exits with `sys.exit(2)` and show the code in the terminal (`$LASTEXITCODE` or `echo $?`).'),
        B('اعمل لوب طويل فيه `time.sleep` ووقّفه بـ Ctrl+C، وخليه يطبع «اتحفظ X عنصر» قبل ما يخرج.', 'Write a long loop with `time.sleep`, stop it with Ctrl+C, and make it print «saved X items» before exiting.')
      ],
      code: [
        { u: B('هيكل سكربت أتمتة متين', 'The skeleton of a robust automation script'), p: '"""nightly_sync.py — run by cron / Task Scheduler."""\nimport logging, sys\n\nlog = logging.getLogger("nightly_sync")\n\ndef main() -> int:\n    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s",\n                        handlers=[logging.FileHandler("nightly_sync.log", encoding="utf-8"), logging.StreamHandler()])\n    log.info("start")\n    try:\n        # 1. fetch  2. transform  3. save  (each in its own function)\n        log.info("done")\n        return 0\n    except KeyboardInterrupt:\n        log.warning("interrupted")\n        return 130\n    except Exception:\n        log.exception("failed")\n        return 1\n\nif __name__ == "__main__":\n    sys.exit(main())' }
      ],
      words: [
        { t: 'retry', m: B('إعادة محاولة عملية فشلت لسبب مؤقت', 'trying a failed operation again after a temporary error'), ex: 'retry on 503 and timeouts' },
        { t: 'exponential backoff', m: B('الانتظار بيتضاعف بين المحاولات: 1 ثم 2 ثم 4', 'the wait doubles between attempts: 1, then 2, then 4'), ex: 'wait = base * 2 ** n' },
        { t: 'jitter', m: B('شوية عشوائية تتزاد على الانتظار', 'a little randomness added to the wait'), ex: '+ random.uniform(0, 1)' },
        { t: 'context manager', m: B('حاجة بتتستخدم مع with وبتنضّف وراها لوحدها', 'something used with with that cleans up after itself'), ex: 'with open(path) as f:' },
        { t: 'exit code', m: B('الرقم اللي البرنامج بيخرج بيه: 0 نجاح وغيره فشل', 'the number a program exits with: 0 success, anything else failure'), ex: 'sys.exit(1)' },
        { t: 'KeyboardInterrupt', m: B('الخطأ اللي بيحصل لما تدوس Ctrl+C', 'the error raised when you press Ctrl+C'), ex: 'except KeyboardInterrupt:' },
        { t: 'transient error', m: B('خطأ مؤقت بيروح لوحده لو استنيت وجربت تاني', 'a temporary error that goes away if you wait and retry'), ex: '429 Too Many Requests' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 8.8 Predefined Clean-up Actions.', 'Read 8.8 Predefined Clean-up Actions.') }, { lib: 'The Python Standard Library', what: B('افتح contextlib واقرا @contextmanager.', 'Open contextlib and read @contextmanager.') }],
      challenge: B('اكتب decorator اسمه `@retry(attempts=4, on=(TimeoutError, ConnectionError))` بانتظار متزايد وjitter وبيسجّل كل محاولة بالـ logging، وبيطلّع آخر خطأ لو كل المحاولات فشلت. اختبره على دالة وهمية.', 'Write a decorator `@retry(attempts=4, on=(TimeoutError, ConnectionError))` with backoff and jitter that logs each attempt and re-raises the last error when every attempt fails. Test it on a fake function.'),
      quiz: [
        { q: B('أنهي خطأ تعيد المحاولة عليه؟', 'Which error is worth retrying?'), o: [B('503 أو timeout', '503 or a timeout'), B('401 مفتاح غلط', '401 wrong key'), B('400 بيانات غلط', '400 bad data')], a: 0, why: B('المؤقت بس؛ الباقي هيفشل تاني.', 'Only temporary ones; the rest will just fail again.') },
        { q: B('`with open(...)` ميزتها:', 'The benefit of `with open(...)`:'), o: [B('الملف بيتقفل حتى لو حصل خطأ', 'the file closes even if an error happens'), B('أسرع في القراءة', 'faster reading'), B('بتقرا الملف كله', 'it reads the whole file')], a: 0, why: B('context manager.', 'A context manager.') },
        { q: B('سكربت فشل المفروض يخرج بـ:', 'A failed script should exit with:'), o: [B('رقم غير الصفر', 'a non-zero number'), '0', B('من غير كود', 'no code at all')], a: 0, why: B('عشان الجدولة تعرف إنه فشل.', 'So the scheduler knows it failed.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تحوّل مشروع لسكربت يشتغل لوحده من غير ما يقع ويسجّل كل حاجة، وتعدّي الاختبار وامتحان الشهر يفتح.', 'Turn a project into a script that runs alone without crashing and logs everything, pass the test, and open the month exam.'),
      review: [
        B('try/except بنوع محدد، وelse وfinally، ومتبلعش الأخطاء.', 'try/except with specific types, else and finally, and never swallowing errors.'),
        B('raise برسالة واضحة، وأخطاؤك الخاصة، وfrom، وEAFP وLBYL.', 'raise with a clear message, your own errors, from, and EAFP and LBYL.'),
        B('الـ debugging: الطريقة، و`{x=}`، وbreakpoint، وdebugger بتاع VS Code.', 'Debugging: the method, `{x=}`, breakpoint and the VS Code debugger.'),
        B('logging بالمستويات والملفات وlog.exception.', 'logging with levels, files and log.exception.'),
        B('retry وbackoff وwith وكود الخروج وCtrl+C.', 'Retries, backoff, with, exit codes and Ctrl+C.')
      ],
      project: B('**متتبع المصاريف المتين** (من أسبوع 6): زوّد أخطاء خاصة (`BadAmount` و`BadDate`) بتتطلّع من دوال الـ parse ومبتتمسكش غير في main، وlogging لملف `expenses.log` (INFO لكل عملية، WARNING للمدخلات الغلط، exception لأي حاجة مش متوقعة)، و`with timer(...)` حوالين تقرير by-cat، وخروج بأدب على Ctrl+C بكود 130، و`LOG_LEVEL` من البيئة. اكتب 5 tests جديدة بـ assert بتتأكد إن الأخطاء الصح بتطلع (`try: ... except BadDate: pass else: assert False`).', '**The robust expense tracker** (from week 6): add your own errors (`BadAmount` and `BadDate`) raised by the parse functions and caught only in main, logging to `expenses.log` (INFO for each action, WARNING for bad input, an exception for anything unexpected), `with timer(...)` around the by-cat report, a polite Ctrl+C exit with code 130, and `LOG_LEVEL` from the environment. Write 5 new assert tests checking the right errors are raised (`try: ... except BadDate: pass else: assert False`).'),
      test: [
        { q: B('ناتج `try: int("x")` `except ValueError: print("A")` `finally: print("B")`:', 'Output of `try: int("x")` `except ValueError: print("A")` `finally: print("B")`:'), o: ['A B', 'B', 'A'], a: 0, why: B('except ثم finally.', 'except, then finally.') },
        { q: B('`{}["k"]` بيطلّع:', '`{}["k"]` raises:'), o: ['KeyError', 'IndexError', 'ValueError'], a: 0, why: B('مفتاح مش موجود.', 'A missing key.') },
        { q: B('`[1][3]` بيطلّع:', '`[1][3]` raises:'), o: ['IndexError', 'KeyError', 'TypeError'], a: 0, why: B('فهرس برّه القايمة.', 'An index outside the list.') },
        { q: B('عشان تطلّع خطأ بنفسك:', 'To throw an error yourself:'), o: ['raise ValueError("...")', 'throw ValueError("...")', 'error("...")'], a: 0, why: B('raise في Python.', 'raise in Python.') },
        { q: B('`class AppError(Exception): pass` ده:', '`class AppError(Exception): pass` is:'), o: [B('خطأ خاص بيك', 'your own error type'), B('دالة', 'a function'), B('موديول', 'a module')], a: 0, why: B('كلاس بيورث Exception.', 'A class inheriting Exception.') },
        { q: B('في pdb عشان تطبع قيمة x:', 'In pdb, to print x:'), o: ['p x', 'n x', 'c x'], a: 0, why: B('p = print.', 'p = print.') },
        { q: B('المستوى الافتراضي لـ logging لو مظبطتوش:', 'logging’s default level when not configured:'), o: ['WARNING', 'INFO', 'DEBUG'], a: 0, why: B('عشان كده info مش بيظهر من غير basicConfig.', 'That is why info does not show without basicConfig.') },
        { q: B('أحسن مكان لـ `log.exception`:', 'The best place for `log.exception`:'), o: [B('جوه except', 'inside an except'), B('أول الملف', 'at the top of the file'), B('جوه finally دايمًا', 'always inside finally')], a: 0, why: B('عشان يكون فيه خطأ يتسجّل.', 'So there is an error to record.') },
        { q: B('انتظار 1 ثم 2 ثم 4 ثواني اسمه:', 'Waiting 1, then 2, then 4 seconds is called:'), o: ['exponential backoff', 'jitter', 'timeout'], a: 0, why: B('بيتضاعف.', 'It doubles.') },
        { q: B('سكربت خلص صح بيخرج بـ:', 'A script that succeeded exits with:'), o: ['0', '1', '130'], a: 0, why: B('صفر = نجاح.', 'Zero means success.') },
        { q: B('`raise NewError(...) from e` فايدتها:', 'What `raise NewError(...) from e` is for:'), o: [B('تحفظ الخطأ الأصلي كسبب', 'keeps the original error as the cause'), B('تمسح الخطأ القديم', 'deletes the old error'), B('تعيد المحاولة', 'retries')], a: 0, why: B('exception chaining.', 'Exception chaining.') },
        { q: B('`average([])` بيطلّع:', '`average([])` raises:'), o: ['ZeroDivisionError', 'IndexError', 'ValueError'], a: 0, why: B('القسمة على len = 0.', 'Dividing by len, which is 0.') }
      ] }
  ]
};
