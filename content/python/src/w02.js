// Python week 2 — Text and numbers.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('النصوص والأرقام', 'Text and numbers'),
  goal: B('تتحكم في النصوص: تقطّعها وتنضّفها وتدوّر فيها وتنسّقها، وتشتغل بالأرقام صح (التقريب والفلوس والعشوائي) — وده نص شغل الأتمتة الحقيقي.',
          'Master text: slice it, clean it, search it and format it, and handle numbers properly (rounding, money and randomness) — half of real automation work.'),
  days: [
    { title: B('النصوص من جوه', 'Strings from the inside'),
      goal: B('تكتب نصوص بكل الأشكال، وتستخدم الرموز الخاصة، وتعرف طول النص وتدوّر فيه بـ `in`.', 'Write strings in every form, use special characters, and get a string’s length and search it with `in`.'),
      learn: [
        { h: B('علامات التنصيص', 'Quotes'),
          p: B('`"..."` و`\'...\'` نفس الحاجة؛ استخدم واحدة وجواها التانية: `"It\'s ok"`. التلات علامات `"""..."""` لنص من كذا سطر، مفيد للرسايل والإيميلات.', '`"..."` and `\'...\'` are the same; use one with the other inside: `"It\'s ok"`. Triple quotes `"""..."""` make a multi-line string — handy for messages and emails.'),
          ex: 'title = "Monthly report"\nnote = \'Use "quotes" freely\'\nemail = """Hello Sara,\nYour order has shipped.\nThanks!"""\nprint(note)\nprint(email)', run: 1 },
        { h: B('الرموز الخاصة والـ raw strings', 'Escape characters and raw strings'),
          p: B('`\\n` سطر جديد، `\\t` مسافة tab، `\\\\` شرطة مايلة واحدة. في مسارات Windows والـ Regex استخدم raw string بـ `r` قبل النص عشان الشرطة متتفهمش رمز: `r"C:\\new\\files"`.', '`\\n` is a new line, `\\t` a tab, `\\\\` one backslash. For Windows paths and regex use a raw string with `r` in front so backslashes stay literal: `r"C:\\new\\files"`.'),
          ex: 'print("Name\\tCity\\nSara\\tCairo")\nprint("C:\\new\\files")    # \\n became a new line!\nprint(r"C:\\new\\files")   # raw: printed as written', run: 1 },
        { h: B('الطول والبحث والتكرار', 'Length, searching and repeating'),
          p: B('`len(s)` عدد الحروف (العربي بيتعد حرف حرف عادي). `"x" in s` بيقولك النص موجود ولا لأ (حساس للحروف الكبيرة). `+` بيلزق نصين و`*` بيكرّر.', '`len(s)` counts the characters (Arabic letters count normally too). `"x" in s` tells you whether a text is inside (case-sensitive). `+` joins two strings and `*` repeats.'),
          ex: 'msg = "Invoice INV-2026-0042 is overdue"\nprint(len(msg))\nprint("overdue" in msg)\nprint("Paid" in msg)\nprint("-" * 20)\nprint(len("مرحبا"))', run: 1 }
      ],
      practice: [
        B('اكتب رسالة ترحيب لعميل من 4 سطور بـ `"""` واطبعها.', 'Write a 4-line welcome message for a customer with `"""` and print it.'),
        B('اطبع جدول صغير (اسم ومدينة لـ 3 أشخاص) باستخدام `\\t` و`\\n` في `print` واحدة.', 'Print a small table (name and city for 3 people) using `\\t` and `\\n` in one `print`.'),
        B('اكتب مسار ملف على Windows مرة عادي ومرة raw واطبعهم، ولاحظ الفرق.', 'Write a Windows file path once normally and once as a raw string, print both and notice the difference.'),
        B('خد عنوان إيميل في متغير واطبع: طوله، وهل فيه `@`، وهل فيه `.com`.', 'Put an email address in a variable and print its length, whether it contains `@`, and whether it contains `.com`.')
      ],
      code: [
        { u: B('إيصال بسيط', 'A simple receipt'), p: 'shop = "Nile Books"\nline = "=" * 28\nprint(line)\nprint(f"{shop}\\nReceipt #0091")\nprint(line)\nprint("Notebook\\t2 x 45\\nPen\\t3 x 30")', run: 1 }
      ],
      words: [
        { t: 'string', m: B('النص في البرمجة: سلسلة حروف', 'text in programming: a sequence of characters'), ex: '"Cairo"' },
        { t: 'escape character', m: B('شرطة مايلة \\ قبل حرف عشان يبقى رمز خاص', 'a backslash before a character that makes it special'), ex: '"Line 1\\nLine 2"' },
        { t: 'newline', m: B('رمز بداية سطر جديد \\n', 'the new-line character \\n'), ex: 'print("a\\nb")' },
        { t: 'raw string', m: B('نص بيبدأ بـ r والشرطة المايلة فيه بتفضل زي ما هي', 'a string starting with r where backslashes stay as written'), ex: 'r"C:\\Users\\me"' },
        { t: 'len()', m: B('دالة بترجّع طول نص أو عدد عناصر', 'a function that returns the length of a text or the number of items'), ex: 'len("hello")  →  5' },
        { t: 'membership test', m: B('اختبار بـ in: الحاجة دي موجودة جوه دي؟', 'a test with in: is this inside that?'), ex: '"@" in email' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 3.1.2 Text كامل وجرّب أمثلته.', 'Read all of 3.1.2 Text and try its examples.') }, { lib: 'Google’s Python Class', what: B('اقرا صفحة Python Strings.', 'Read the Python Strings page.') }],
      challenge: B('اكتب سكربت بيطبع «لافتة» بالشكل ده لأي كلمة في متغير: خط نجوم فوق وتحت بنفس طول الكلمة + 4، والكلمة في النص بين `* ` و` *`.', 'Write a script that prints a «banner» for any word in a variable: a line of stars above and below as long as the word + 4, with the word between `* ` and ` *`.'),
      quiz: [
        { q: B('`len("Hi\\n")` بيساوي:', '`len("Hi\\n")` equals:'), o: ['3', '4', '2'], a: 0, why: B('`\\n` حرف واحد.', '`\\n` is one character.') },
        { q: B('عشان تكتب مسار Windows من غير ما الشرطة تتفهم رمز:', 'To write a Windows path without backslashes becoming special:'), o: [B('raw string بـ r', 'a raw string with r'), B('f-string', 'an f-string'), B('علامات تنصيص تلاتة', 'triple quotes')], a: 0, why: B('r بيخلي الشرطة زي ما هي.', 'r keeps backslashes as written.') },
        { q: B('`"pay" in "Payment"` بيدي:', '`"pay" in "Payment"` gives:'), o: ['False', 'True', B('خطأ', 'an error')], a: 0, why: B('`in` حساس للحروف الكبيرة: "Pay" مش "pay".', '`in` is case-sensitive: "Pay" is not "pay".') }
      ] },

    { title: B('الفهرسة والتقطيع', 'Indexing and slicing'),
      goal: B('تجيب أي حرف أو جزء من نص بالفهرس والتقطيع، وتفهم إن النص مبيتغيرش (immutable).', 'Get any character or part of a string by index and slice, and understand that strings cannot change (immutable).'),
      learn: [
        { h: B('الفهرس يبدأ من صفر', 'Indexes start at zero'),
          p: B('أول حرف `s[0]`، والتاني `s[1]`. من الآخر بالسالب: `s[-1]` آخر حرف، `s[-2]` اللي قبله. لو طلبت فهرس برّه النص بيطلع `IndexError`.', 'The first character is `s[0]`, the second `s[1]`. From the end use negatives: `s[-1]` is the last character, `s[-2]` the one before. An index outside the string raises `IndexError`.'),
          ex: 'code = "EG-CAI-2026"\nprint(code[0])    # E\nprint(code[3])    # C\nprint(code[-1])   # 6\nprint(code[-4])   # 2', run: 1 },
        { h: B('التقطيع [start:stop:step]', 'Slicing [start:stop:step]'),
          p: B('`s[a:b]` من a لحد قبل b. لو سبت البداية فاضية يبقى من الأول، والنهاية فاضية يبقى للآخر. `s[::2]` حرف وحرف لأ، و`s[::-1]` النص بالمقلوب. التقطيع عمره ما بيطلّع خطأ حتى لو الأرقام كبيرة.', '`s[a:b]` runs from a up to, but not including, b. An empty start means from the beginning and an empty end means to the end. `s[::2]` takes every other character and `s[::-1]` reverses the string. Slicing never raises an error, even with big numbers.'),
          ex: 'code = "EG-CAI-2026"\nprint(code[:2])     # EG\nprint(code[3:6])    # CAI\nprint(code[-4:])    # 2026\nprint(code[::-1])\nprint(code[:100])   # no error', run: 1 },
        { h: B('النص مبيتغيرش', 'Strings are immutable'),
          p: B('مينفعش تعمل `s[0] = "X"`؛ النص نفسه مبيتغيرش. بدل كده بتعمل نص **جديد** وتخزّنه: `s = "X" + s[1:]`. وكل methods النصوص (الأسبوع ده) بترجّع نص جديد ومبتغيرش القديم.', 'You cannot do `s[0] = "X"`; the string itself never changes. Instead you build a **new** string and store it: `s = "X" + s[1:]`. Every string method this week also returns a new string and leaves the old one alone.'),
          ex: 'sku = "ab-1001"\nsku = sku[:2].upper() + sku[2:]\nprint(sku)\ntry:\n    sku[0] = "X"\nexcept TypeError as e:\n    print("TypeError:", e)', run: 1 }
      ],
      practice: [
        B('من رقم موبايل `"01012345678"` طلّع كود الشبكة (أول 3 أرقام) وآخر 4 أرقام.', 'From the phone number `"01012345678"` take the network code (first 3 digits) and the last 4 digits.'),
        B('من اسم ملف `"report_2026-09-30.xlsx"` طلّع التاريخ والامتداد بالتقطيع بس.', 'From the file name `"report_2026-09-30.xlsx"` take the date and the extension with slicing only.'),
        B('اعكس 3 كلمات بـ `[::-1]` واعرف هل كلمة زي `"level"` بتتقري زي ما هي من الناحيتين.', 'Reverse 3 words with `[::-1]` and check whether a word like `"level"` reads the same both ways.'),
        B('اخفي رقم كارت: اطبع `**** **** **** 1234` من `"4111222233331234"`.', 'Mask a card number: print `**** **** **** 1234` from `"4111222233331234"`.')
      ],
      code: [
        { u: B('إخفاء بيانات حساسة', 'Masking sensitive data'), p: 'card = "4111222233331234"\nphone = "01012345678"\nprint("**** **** **** " + card[-4:])\nprint(phone[:3] + "*" * 5 + phone[-3:])', run: 1 }
      ],
      words: [
        { t: 'index', m: B('رقم مكان العنصر، وبيبدأ من صفر', 'the position number of an item, starting at zero'), ex: 'name[0]' },
        { t: 'negative index', m: B('فهرس بالسالب بيعد من الآخر', 'a negative index that counts from the end'), ex: 'name[-1]  # last' },
        { t: 'slicing', m: B('إنك تاخد جزء من نص أو قايمة بـ [start:stop]', 'taking part of a string or list with [start:stop]'), ex: 'date[:4]' },
        { t: 'step', m: B('الرقم التالت في التقطيع: بيقفز كام', 'the third number in a slice: how far to jump'), ex: 's[::2]' },
        { t: 'immutable', m: B('مينفعش يتغير بعد ما يتعمل؛ بتعمل نسخة جديدة', 'cannot change after it is created; you make a new one'), ex: 'strings and tuples are immutable' },
        { t: 'IndexError', m: B('خطأ لما تطلب فهرس مش موجود', 'an error when you ask for an index that does not exist'), ex: '"abc"[5]' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('في 3.1.2 Text: جزء indexing وslicing والرسمة بتاعته.', 'In 3.1.2 Text: the indexing and slicing part and its diagram.') }, 'lib:Python Tutor'],
      challenge: B('اكتب سكربت ياخد كود شحنة زي `"SHP-EG-ALX-000731"` ويطبع: البلد، والمدينة، ورقم الشحنة كرقم من غير الأصفار اللي على الشمال (تلميح: `int()`).', 'Write a script that takes a shipment code such as `"SHP-EG-ALX-000731"` and prints the country, the city, and the shipment number as a number without leading zeros (hint: `int()`).'),
      quiz: [
        { q: B('`"Python"[1:4]` بيدي:', '`"Python"[1:4]` gives:'), o: ['"yth"', '"Pyth"', '"ytho"'], a: 0, why: B('من فهرس 1 لحد قبل 4.', 'From index 1 up to, not including, 4.') },
        { q: B('آخر حرف في `s`:', 'The last character of `s`:'), o: ['s[-1]', 's[len(s)]', 's[last]'], a: 0, why: B('`s[len(s)]` برّه النص بواحد.', '`s[len(s)]` is one past the end.') },
        { q: B('`s[0] = "A"` على نص بيطلّع:', '`s[0] = "A"` on a string raises:'), o: ['TypeError', 'IndexError', B('بيشتغل عادي', 'nothing, it works')], a: 0, why: B('النصوص immutable.', 'Strings are immutable.') }
      ] },

    { title: B('methods النصوص والتنضيف', 'String methods and cleaning'),
      goal: B('تنضّف بيانات متلخبطة (مسافات وحروف كبيرة وفواصل) بـ methods النصوص، وتقسّم وتجمع النصوص.', 'Clean messy data (spaces, case and separators) with string methods, and split and join text.'),
      learn: [
        { h: B('الحروف والمسافات', 'Case and spaces'),
          p: B('`strip()` بتشيل المسافات من الأول والآخر (و`lstrip`/`rstrip` من ناحية واحدة)، و`lower()` و`upper()` و`title()` بيغيروا الحروف. البيانات اللي جاية من فورم أو Excel دايمًا محتاجة `strip().lower()` قبل ما تقارن.', '`strip()` removes spaces at both ends (`lstrip`/`rstrip` one side only); `lower()`, `upper()` and `title()` change the case. Data from a form or Excel almost always needs `strip().lower()` before you compare.'),
          ex: 'raw = "   SARA.Ahmed@Mail.COM  "\nemail = raw.strip().lower()\nprint(repr(raw))\nprint(email)\nprint("  mona  ali ".strip().title())', run: 1 },
        { h: B('split وjoin وreplace', 'split, join and replace'),
          p: B('`s.split(",")` بيقسّم النص لقايمة عند كل فاصلة (من غير قيمة يقسّم عند المسافات). `", ".join(parts)` العكس: يجمع قايمة نصوص بفاصل. `s.replace("a", "b")` يبدّل كل مرة.', '`s.split(",")` splits a string into a list at each comma (with no argument it splits on whitespace). `", ".join(parts)` does the opposite: joins a list of strings with a separator. `s.replace("a", "b")` swaps every occurrence.'),
          ex: 'line = "Sara;Cairo;0101 234 5678"\nname, city, phone = line.split(";")\nphone = phone.replace(" ", "")\nprint(name, city, phone)\ntags = ["vip", "cairo", "new"]\nprint(" | ".join(tags))', run: 1 },
        { h: B('البحث والفحص', 'Searching and checking'),
          p: B('`startswith`/`endswith` لبداية ونهاية النص (ممتازين لامتدادات الملفات)، `find` بترجّع مكان أول ظهور أو `-1`، `count` بتعد. و`isdigit()` و`isalpha()` بيفحصوا نوع الحروف — مفيد قبل `int()`.', '`startswith`/`endswith` check the start and end (great for file extensions), `find` returns the first position or `-1`, `count` counts. `isdigit()` and `isalpha()` check the kind of characters — useful before `int()`.'),
          ex: 'name = "invoice_0931.PDF"\nprint(name.lower().endswith(".pdf"))\nprint(name.find("_"), name.find("#"))\nprint("a-b-c".count("-"))\nqty = "12"\nif qty.isdigit():\n    print(int(qty) * 2)', run: 1 }
      ],
      practice: [
        B('نضّف 5 أسماء متلخبطة (مسافات زيادة وحروف عشوائية) لشكل `Title Case`.', 'Clean 5 messy names (extra spaces, random case) into `Title Case`.'),
        B('خد سطر CSV `"Omar,Giza,42,paid"` وقسّمه لـ 4 متغيرات، وحوّل الرقم لـ int.', 'Take the CSV line `"Omar,Giza,42,paid"`, split it into 4 variables and turn the number into an int.'),
        B('اكتب رقم موبايل بشرط وفواصل `"010-1234 5678"` وطلّعه أرقام بس.', 'Take a phone written with dashes and spaces `"010-1234 5678"` and keep the digits only.'),
        B('اطبع هل اسم ملف صورة (ينتهي بـ .jpg أو .png بأي حروف كبيرة/صغيرة).', 'Print whether a file name is an image (ends in .jpg or .png in any case).')
      ],
      code: [
        { u: B('تنضيف سطر بيانات عميل', 'Cleaning one customer line'), p: 'raw = "  MONA  hassan ; MONA@Shop.COM ;  0100 111 2222 "\nname, email, phone = [part.strip() for part in raw.split(";")]\nname = " ".join(name.split()).title()\nemail = email.lower()\nphone = phone.replace(" ", "")\nprint(name, "|", email, "|", phone)', run: 1 }
      ],
      words: [
        { t: 'method', m: B('دالة تابعة لقيمة، بتتنادى بنقطة', 'a function that belongs to a value, called with a dot'), ex: 'name.upper()' },
        { t: 'strip()', m: B('بتشيل المسافات من أول وآخر النص', 'removes spaces from both ends of a string'), ex: '"  hi ".strip()' },
        { t: 'split()', m: B('بتقسّم النص لقايمة عند فاصل', 'splits a string into a list at a separator'), ex: '"a,b".split(",")' },
        { t: 'join()', m: B('بتجمع قايمة نصوص في نص واحد بفاصل', 'joins a list of strings into one with a separator'), ex: '", ".join(names)' },
        { t: 'replace()', m: B('بتبدّل كل ظهور لنص بنص تاني', 'swaps every occurrence of a text with another'), ex: 'phone.replace("-", "")' },
        { t: 'method chaining', m: B('إنك تنادي methods ورا بعض على نفس السطر', 'calling methods one after another on one line'), ex: 'raw.strip().lower()' }
      ],
      read: [{ lib: 'Built-in Types', what: B('اقرا جزء String Methods وعلّم على 10 methods هتستخدمها.', 'Read the String Methods part and mark 10 methods you will use.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Text and String Manipulation (أو Manipulating Strings في الطبعات الأقدم).', 'The chapter on text and string manipulation.') }],
      challenge: B('عندك نص فيه 5 إيميلات مفصولين بفواصل ومسافات ومتلخبطين في الحروف. طلّع قايمة إيميلات نضيفة بحروف صغيرة، واطبعها مفصولة بـ `; `.', 'You have a text with 5 emails separated by commas and spaces in mixed case. Produce a clean lowercase list and print it separated by `; `.'),
      quiz: [
        { q: B('`"a,b,,c".split(",")` بيدي:', '`"a,b,,c".split(",")` gives:'), o: ['["a", "b", "", "c"]', '["a", "b", "c"]', '"abc"'], a: 0, why: B('فاصلتين جنب بعض = نص فاضي بينهم.', 'Two commas in a row leave an empty string between them.') },
        { q: B('`"-".join(["2026", "09", "30"])` بيدي:', '`"-".join(["2026", "09", "30"])` gives:'), o: ['"2026-09-30"', '["2026-09-30"]', '"-2026-09-30-"'], a: 0, why: B('الفاصل بيتحط بين العناصر بس.', 'The separator goes only between items.') },
        { q: B('ليه بنعمل `strip().lower()` قبل ما نقارن إيميلات؟', 'Why do we `strip().lower()` emails before comparing?'), o: [B('عشان المسافات والحروف الكبيرة متخليش نفس الإيميل يبان مختلف', 'so spaces and case do not make the same email look different'), B('عشان يبقى أسرع', 'to make it faster'), B('Python بتطلب كده', 'Python requires it')], a: 0, why: B('" A@x.com" و"a@x.com" نفس الشخص.', '" A@x.com" and "a@x.com" are the same person.') }
      ] },

    { title: B('تنسيق النصوص والتقارير', 'Formatting text and reports'),
      goal: B('تطبع جداول وتقارير متظبطة بالمحاذاة والعرض والنِسب والأصفار، بالـ f-string.', 'Print neat tables and reports with alignment, width, percentages and zero padding using f-strings.'),
      learn: [
        { h: B('العرض والمحاذاة', 'Width and alignment'),
          p: B('`{name:<12}` شمال بعرض 12، `{price:>8}` يمين بعرض 8، `{title:^20}` في النص. تقدر تختار حرف الملء: `{title:*^20}`. كده تعمل أعمدة مستقيمة في التيرمنال أو في ملف نصي.', '`{name:<12}` left-aligns in 12 characters, `{price:>8}` right-aligns in 8, `{title:^20}` centres. You can choose the fill character: `{title:*^20}`. This is how you print straight columns in a terminal or a text file.'),
          ex: 'items = [("Notebook", 45, 3), ("Backpack", 650, 1), ("Pen", 7.5, 12)]\nprint(f"{\'Item\':<10}{\'Price\':>8}{\'Qty\':>5}")\nfor name, price, qty in items:\n    print(f"{name:<10}{price:>8.2f}{qty:>5}")\nprint(f"{\' END \':=^23}")', run: 1 },
        { h: B('أرقام بأشكال', 'Numbers in different shapes'),
          p: B('`{n:05}` أصفار على الشمال (00042)، `{x:.1%}` نسبة مئوية (0.256 → 25.6%)، `{n:,}` فواصل آلاف، `{n:+}` يحط الإشارة دايمًا، و`{n:e}` شكل علمي. أرقام الفواتير والنسب في التقارير كلها من هنا.', '`{n:05}` pads with zeros (00042), `{x:.1%}` is a percentage (0.256 → 25.6%), `{n:,}` adds thousands separators, `{n:+}` always shows the sign, and `{n:e}` is scientific. Invoice numbers and report percentages all come from here.'),
          ex: 'n = 42\nprint(f"INV-{n:05}")\nprint(f"Growth: {0.256:.1%}")\nprint(f"Change: {-3.5:+} / {12:+}")\nprint(f"Revenue: {1234567:,} EGP")', run: 1 },
        { h: B('f-string للتصحيح و.format', 'f-strings for debugging and .format'),
          p: B('`f"{total=}"` بيطبع اسم المتغير وقيمته (`total=250`)، ممتاز وانت بتدوّر على غلطة. هتشوف في كود قديم `"{} {}".format(a, b)` و`"%s" % a`؛ اعرفهم لما تقراهم، بس اكتب f-string.', '`f"{total=}"` prints the variable name and its value (`total=250`) — great while hunting a bug. In older code you will see `"{} {}".format(a, b)` and `"%s" % a`; recognise them when you read them, but write f-strings.'),
          ex: 'subtotal = 600\ndiscount = 0.1\ntotal = subtotal * (1 - discount)\nprint(f"{subtotal=} {discount=:.0%} {total=:.2f}")\nprint("{} owes {:.2f}".format("Omar", total))', run: 1 }
      ],
      practice: [
        B('اطبع جدول من 4 منتجات بـ 3 أعمدة مستقيمة (الاسم شمال والأرقام يمين).', 'Print a table of 4 products with 3 straight columns (names on the left, numbers on the right).'),
        B('اعمل أرقام فواتير من 1 لـ 5 بالشكل `INV-2026-00001`.', 'Make invoice numbers 1 to 5 in the form `INV-2026-00001`.'),
        B('احسب نسبة الطلبات المدفوعة (37 من 52) واطبعها كنسبة مئوية برقم عشري واحد.', 'Compute the share of paid orders (37 of 52) and print it as a percentage with one decimal.'),
        B('استخدم `f"{x=}"` في سكربت فيه 3 حسابات عشان تشوف القيم وهي بتتغير.', 'Use `f"{x=}"` in a script with 3 calculations to watch the values change.')
      ],
      code: [
        { u: B('تقرير مبيعات يومي', 'A daily sales report'), p: 'sales = [("Cairo", 18250.5, 0.12), ("Giza", 9400, -0.05), ("Alexandria", 13125.75, 0.31)]\nprint(f"{\'City\':<12}{\'Sales\':>12}{\'Change\':>9}")\nprint("-" * 33)\nfor city, amount, change in sales:\n    print(f"{city:<12}{amount:>12,.2f}{change:>+9.0%}")', run: 1 }
      ],
      words: [
        { t: 'alignment', m: B('محاذاة النص: شمال أو يمين أو في النص', 'where text sits: left, right or centre'), ex: '{name:<12}' },
        { t: 'padding', m: B('ملء المساحة الفاضية بحرف لحد عرض معيّن', 'filling empty room with a character up to a width'), ex: '{n:05}  →  00042' },
        { t: 'width', m: B('عدد الخانات اللي القيمة بتاخدها في التنسيق', 'how many characters a value takes when formatted'), ex: '{price:>10}' },
        { t: 'percentage format', m: B('تنسيق بيضرب في 100 ويحط %', 'a format that multiplies by 100 and adds %'), ex: '{0.25:.0%}  →  25%' },
        { t: 'thousands separator', m: B('الفاصلة اللي بين كل 3 أرقام', 'the comma between every three digits'), ex: '{1500000:,}' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 7.1 Fancier Output Formatting كله.', 'Read all of 7.1 Fancier Output Formatting.') }, { lib: 'Real Python Tutorials', what: B('دوّر على «f-strings» واقرا المقال الأساسي.', 'Search for «f-strings» and read the main article.') }],
      challenge: B('اكتب «كشف حساب» لـ 5 عمليات (تاريخ، وصف، مبلغ بالسالب للمصروف) بأعمدة مستقيمة، وفي الآخر الرصيد بفواصل وإشارة.', 'Write a «bank statement» of 5 transactions (date, description, amount negative for spending) with straight columns, ending with the balance with separators and a sign.'),
      quiz: [
        { q: B('`f"{7:03}"` بيطبع:', '`f"{7:03}"` prints:'), o: ['007', '7.000', '  7'], a: 0, why: B('عرض 3 بأصفار على الشمال.', 'Width 3 padded with zeros.') },
        { q: B('`f"{0.5:.0%}"` بيطبع:', '`f"{0.5:.0%}"` prints:'), o: ['50%', '0.5%', '5%'], a: 0, why: B('% بيضرب في 100.', '% multiplies by 100.') },
        { q: B('عشان تحط نص على اليمين بعرض 10:', 'To right-align a value in 10 characters:'), o: ['{x:>10}', '{x:<10}', '{x:^10}'], a: 0, why: B('> يمين، < شمال، ^ في النص.', '> right, < left, ^ centre.') }
      ] },

    { title: B('الأرقام بعمق: math وDecimal وrandom', 'Numbers in depth: math, Decimal and random'),
      goal: B('تستخدم موديول `math` للتقريب لفوق وتحت، و`Decimal` للفلوس من غير أخطاء الـ float، و`random` للعينات والتجارب.', 'Use the `math` module to round up and down, `Decimal` for money without float errors, and `random` for samples and tests.'),
      learn: [
        { h: B('موديول math', 'The math module'),
          p: B('`import math` وبعدين: `math.ceil` لفوق (عدد الصناديق اللي محتاجها)، `math.floor` لتحت، `math.sqrt` جذر، و`math.isclose` لمقارنة floats بأمان. والدوال الجاهزة `abs` و`min` و`max` من غير import.', '`import math` then: `math.ceil` rounds up (how many boxes you need), `math.floor` down, `math.sqrt` square root, and `math.isclose` compares floats safely. The built-ins `abs`, `min` and `max` need no import.'),
          ex: 'import math\nitems, per_box = 53, 12\nprint("boxes:", math.ceil(items / per_box))\nprint(math.floor(7.9), math.sqrt(144))\nprint(0.1 + 0.2 == 0.3, math.isclose(0.1 + 0.2, 0.3))\nprint(abs(-40), min(3, 9, 1), max(3, 9, 1))', run: 1 },
        { h: B('الفلوس: Decimal', 'Money: Decimal'),
          p: B('الـ float بيخزن الأرقام بالتقريب، فالقروش بتضيع في الحسابات الكتير. `Decimal("19.99")` (من نص، مش من float) دقيق، و`quantize(Decimal("0.01"))` بيقرّب لقرشين. وخد بالك: `round(2.675, 2)` بيدي 2.67 مش 2.68 بسبب الـ float.', 'A float stores numbers approximately, so cents get lost across many calculations. `Decimal("19.99")` (from a string, not a float) is exact, and `quantize(Decimal("0.01"))` rounds to cents. Note: `round(2.675, 2)` gives 2.67, not 2.68, because of floats.'),
          ex: 'from decimal import Decimal, ROUND_HALF_UP\nprint(0.1 * 3)\nprint(Decimal("0.1") * 3)\nprice = Decimal("2.675")\nprint(round(2.675, 2), price.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))', run: 1 },
        { h: B('العشوائي: random', 'Randomness: random'),
          p: B('`random.randint(1, 6)` رقم من 1 لـ 6، `random.choice(list)` عنصر عشوائي، `random.sample(list, 3)` 3 من غير تكرار، `random.shuffle(list)` يلخبط القايمة. `random.seed(1)` بيخلي النتيجة تتكرر نفسها (مفيد في الاختبارات). للباسوردات والأكواد السرية استخدم `secrets` مش `random`.', '`random.randint(1, 6)` gives 1 to 6, `random.choice(list)` a random item, `random.sample(list, 3)` three without repeats, `random.shuffle(list)` shuffles a list. `random.seed(1)` makes results repeatable (useful in tests). For passwords and secret codes use `secrets`, not `random`.'),
          ex: 'import random, secrets\nrandom.seed(7)\nprint(random.randint(1, 100))\nprint(random.choice(["Sara", "Omar", "Mona"]))\nprint(random.sample(range(1, 50), 6))\nprint(secrets.token_hex(8))', run: 1 }
      ],
      practice: [
        B('احسب عدد الأتوبيسات اللي محتاجها لـ 137 شخص لو الأتوبيس 30 كرسي.', 'Work out how many buses 137 people need if a bus has 30 seats.'),
        B('اجمع 0.10 عشر مرات بالـ float ومرة بـ Decimal واطبع الفرق.', 'Add 0.10 ten times with floats and once with Decimal and print the difference.'),
        B('اختار فايز عشوائي من 10 أسماء، واعمل «سحب» يتكرر نفس النتيجة بـ `seed`.', 'Pick a random winner from 10 names, and make a «draw» that repeats the same result with `seed`.'),
        B('اعمل كود خصم عشوائي آمن من 8 حروف بـ `secrets`.', 'Generate a secure random 8-character discount code with `secrets`.')
      ],
      code: [
        { u: B('تقسيط بالقرش', 'Instalments to the cent'), p: 'from decimal import Decimal, ROUND_HALF_UP\ntotal = Decimal("10000.00")\nmonths = 3\nper_month = (total / months).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)\nlast = total - per_month * (months - 1)\nprint(f"{months - 1} x {per_month} + last {last}")', run: 1 }
      ],
      words: [
        { t: 'module', m: B('ملف كود جاهز بتستورده بـ import', 'a ready code file you bring in with import'), ex: 'import math' },
        { t: 'import', m: B('أمر بيجيب موديول عشان تستخدم دواله', 'the statement that loads a module so you can use it'), ex: 'from decimal import Decimal' },
        { t: 'Decimal', m: B('نوع أرقام عشرية دقيقة، للفلوس', 'an exact decimal number type, for money'), ex: 'Decimal("19.99")' },
        { t: 'rounding error', m: B('فرق صغير بيحصل لأن الـ float مش بيخزن الكسور بالظبط', 'a tiny difference because floats cannot store fractions exactly'), ex: '0.1 + 0.2 != 0.3' },
        { t: 'random seed', m: B('رقم بداية بيخلي النتايج العشوائية تتكرر نفسها', 'a starting number that makes random results repeatable'), ex: 'random.seed(42)' },
        { t: 'secrets', m: B('موديول للأرقام العشوائية الآمنة (باسوردات وتوكنز)', 'a module for secure random values (passwords and tokens)'), ex: 'secrets.token_urlsafe(16)' }
      ],
      read: [{ lib: 'The Python Standard Library', what: B('افتح صفحات math وdecimal (أول جزء Quick-start) وrandom.', 'Open the math, decimal (the Quick-start part) and random pages.') }, { lib: 'Python Tutorial (python.org)', what: B('اقرا 15. Floating-Point Arithmetic: Issues and Limitations.', 'Read 15. Floating-Point Arithmetic: Issues and Limitations.') }],
      challenge: B('اكتب «مولّد كوبونات»: 5 أكواد بالشكل `SALE-XXXX` (حروف وأرقام كبيرة عشوائية بـ `secrets.choice`)، وجنب كل كود قيمة خصم عشوائية من 5% لـ 25% بخطوات 5.', 'Write a «coupon generator»: 5 codes like `SALE-XXXX` (random uppercase letters and digits with `secrets.choice`), each with a random discount from 5% to 25% in steps of 5.'),
      quiz: [
        { q: B('100 قطعة و12 في الكرتونة. عدد الكراتين:', '100 pieces, 12 per carton. Cartons needed:'), o: ['math.ceil(100 / 12)', 'math.floor(100 / 12)', 'round(100 / 12)'], a: 0, why: B('لازم كرتونة زيادة للباقي: ceil = 9.', 'The leftovers need one more: ceil gives 9.') },
        { q: B('للفلوس الأحسن تستخدم:', 'For money it is best to use:'), o: ['Decimal("12.50")', 'float(12.50)', 'Decimal(12.50)'], a: 0, why: B('من نص، عشان متورّثش تقريب الـ float.', 'From a string, so it does not inherit float rounding.') },
        { q: B('توكن سري لرابط استرجاع باسورد:', 'A secret token for a password-reset link:'), o: ['secrets.token_urlsafe()', 'random.random()', 'random.randint(1, 9999)'], a: 0, why: B('random مش آمن للأسرار.', 'random is not safe for secrets.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تستخدم كل أدوات النصوص والأرقام في أداة تنضيف بيانات حقيقية، وتعدّي اختبار الأسبوع.', 'Use every text and number tool in a real data-cleaning tool and pass the weekly test.'),
      review: [
        B('الرموز الخاصة والـ raw strings والنصوص متعددة السطور.', 'Escape characters, raw strings and multi-line strings.'),
        B('الفهرسة بالموجب والسالب والتقطيع بالـ step، والنص immutable.', 'Positive and negative indexes, slicing with a step, and immutable strings.'),
        B('strip وlower وsplit وjoin وreplace وstartswith وisdigit.', 'strip, lower, split, join, replace, startswith and isdigit.'),
        B('f-string بالمحاذاة والعرض والأصفار والنسب والفواصل و`{x=}`.', 'f-strings with alignment, width, zeros, percentages, separators and `{x=}`.'),
        B('math.ceil وDecimal للفلوس وrandom وsecrets.', 'math.ceil, Decimal for money, random and secrets.')
      ],
      project: B('**منظّف قايمة العملاء** (`clean_contacts.py`): عندك نص متعدد السطور فيه 6 عملاء، كل سطر `name ; email ; phone ; city` بمسافات زيادة وحروف متلخبطة وأرقام موبايل فيها شرط ومسافات. السكربت يطبع جدول نضيف بأعمدة مستقيمة: الاسم Title Case، والإيميل صغير، والموبايل أرقام بس ومخفي نصه (`010*****678`)، والمدينة. وفي الآخر سطر ملخص: عدد العملاء، وعدد اللي إيميلاتهم على gmail كنسبة مئوية. (هنعمل نفس الحاجة على ملف CSV حقيقي في أسبوع 11.)', '**The customer list cleaner** (`clean_contacts.py`): you have a multi-line string with 6 customers, each line `name ; email ; phone ; city` with extra spaces, mixed case and phone numbers with dashes and spaces. The script prints a clean table with straight columns: the name in Title Case, the email in lowercase, the phone as digits only with its middle hidden (`010*****678`), and the city. End with a summary line: the number of customers and the share with gmail addresses as a percentage. (We do the same on a real CSV file in week 11.)'),
      test: [
        { q: B('`"Report"[::-1]` بيدي:', '`"Report"[::-1]` gives:'), o: ['"tropeR"', '"Report"', '"R"'], a: 0, why: B('step -1 بيعكس.', 'A step of -1 reverses.') },
        { q: B('`"  hi  ".strip()` بيدي:', '`"  hi  ".strip()` gives:'), o: ['"hi"', '"  hi"', '"hi  "'], a: 0, why: B('بتشيل من الناحيتين.', 'It trims both ends.') },
        { q: B('`"a b  c".split()` بيدي:', '`"a b  c".split()` gives:'), o: ['["a", "b", "c"]', '["a", "b", "", "c"]', '["a b  c"]'], a: 0, why: B('من غير فاصل بيقسّم على أي مسافات ويتجاهل التكرار.', 'With no separator it splits on any run of whitespace.') },
        { q: B('`"x" * 0` بيدي:', '`"x" * 0` gives:'), o: ['""', '"x"', B('خطأ', 'an error')], a: 0, why: B('صفر تكرار = نص فاضي.', 'Zero repeats is an empty string.') },
        { q: B('`f"{3.14159:.2f}"`:', '`f"{3.14159:.2f}"`:'), o: ['3.14', '3.1', '3.14159'], a: 0, why: B('رقمين بعد العلامة.', 'Two decimals.') },
        { q: B('`f"{12:>5}"` طوله كام حرف؟', 'How long is `f"{12:>5}"`?'), o: ['5', '2', '3'], a: 0, why: B('العرض 5 بمسافات على الشمال.', 'Width 5 with spaces on the left.') },
        { q: B('`"photo.JPG".lower().endswith(".jpg")`:', '`"photo.JPG".lower().endswith(".jpg")`:'), o: ['True', 'False', B('خطأ', 'an error')], a: 0, why: B('حوّلنا لحروف صغيرة الأول.', 'We lowercased it first.') },
        { q: B('`"abc".find("z")` بيرجّع:', '`"abc".find("z")` returns:'), o: ['-1', '0', B('خطأ', 'an error')], a: 0, why: B('find بترجّع -1 لو مش موجود (index هي اللي بتطلّع خطأ).', 'find returns -1 when missing (index is the one that raises).') },
        { q: B('أنهي واحدة بتعمل نص جديد من غير ما تغيّر القديم؟', 'Which creates a new string without changing the old one?'), o: ['s.upper()', 's[0] = "A"', B('ولا واحدة', 'neither')], a: 0, why: B('كل methods النصوص بترجّع نص جديد.', 'Every string method returns a new string.') },
        { q: B('`math.floor(-2.5)` بيدي:', '`math.floor(-2.5)` gives:'), o: ['-3', '-2', '-2.5'], a: 0, why: B('floor = أقرب رقم صحيح أصغر.', 'floor is the nearest smaller whole number.') },
        { q: B('ليه `Decimal("0.1")` مش `Decimal(0.1)`؟', 'Why `Decimal("0.1")` rather than `Decimal(0.1)`?'), o: [B('عشان الـ float 0.1 أصلًا مش دقيق', 'because the float 0.1 is already inexact'), B('الاتنين واحد', 'they are the same'), B('النص أسرع', 'text is faster')], a: 0, why: B('Decimal(0.1) بيورّث التقريب بتاع الـ float.', 'Decimal(0.1) inherits the float’s approximation.') },
        { q: B('أنسب حاجة لاختيار عينة 5 عملاء من غير تكرار:', 'The best way to pick 5 customers without repeats:'), o: ['random.sample(customers, 5)', 'random.choice(customers)', 'random.shuffle(5)'], a: 0, why: B('sample بيرجّع عدد من غير تكرار.', 'sample returns several without repeats.') }
      ] }
  ]
};
