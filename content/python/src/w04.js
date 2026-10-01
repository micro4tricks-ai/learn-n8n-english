// Python week 4 — Lists, tuples and the month project.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('القوايم والـ tuples ومشروع الشهر', 'Lists, tuples and the month project'),
  goal: B('تخزّن مجموعات بيانات في قوايم وtuples، تضيف وتشيل وترتّب وتفلتر، وتكتب list comprehensions، وتبني مشروع الشهر الأول: متتبع مصاريف.',
          'Store collections in lists and tuples, add, remove, sort and filter, write list comprehensions, and build the first month project: an expense tracker.'),
  days: [
    { title: B('القايمة: تعمل وتضيف', 'Lists: creating and adding'),
      goal: B('تعمل قايمة وتوصل لعناصرها وتضيف عليها، وتفهم إن القايمة بتتغير (mutable) عكس النص.', 'Create a list, reach its items and add to it, and understand that lists change (mutable), unlike strings.'),
      learn: [
        { h: B('قايمة = عناصر بالترتيب', 'A list is items in order'),
          p: B('`prices = [120, 85, 300]` بين قوسين مربعين ومفصولين بفاصلة. الفهرسة والتقطيع زي النصوص بالظبط: `prices[0]` و`prices[-1]` و`prices[1:]`. ممكن تخلط أنواع، بس الأحسن كل قايمة فيها نوع واحد من الحاجات.', '`prices = [120, 85, 300]` — square brackets, comma-separated. Indexing and slicing work exactly like strings: `prices[0]`, `prices[-1]`, `prices[1:]`. You can mix types, but it is better to keep one kind of thing per list.'),
          ex: 'cities = ["Cairo", "Giza", "Luxor", "Aswan"]\nprint(cities[0], cities[-1])\nprint(cities[1:3])\nprint(len(cities), "Luxor" in cities)', run: 1 },
        { h: B('append وinsert وextend', 'append, insert and extend'),
          p: B('`append(x)` يضيف في الآخر (أكتر واحدة هتستخدمها)، `insert(0, x)` يضيف في مكان معيّن، `extend(other)` يضيف كل عناصر قايمة تانية. ونمط مهم: تبدأ بقايمة فاضية `[]` وتملاها جوه لوب.', '`append(x)` adds at the end (the one you will use most), `insert(0, x)` adds at a position, `extend(other)` adds every item of another list. A key pattern: start with an empty list `[]` and fill it inside a loop.'),
          ex: 'big_orders = []\nfor amount in [120, 2400, 80, 5100, 990]:\n    if amount > 1000:\n        big_orders.append(amount)\nbig_orders.insert(0, 9999)\nbig_orders.extend([1500, 1700])\nprint(big_orders)', run: 1 },
        { h: B('القايمة بتتغير', 'Lists are mutable'),
          p: B('عكس النص، تقدر تغيّر عنصر مكانه: `prices[0] = 150`. وده معناه إن أي اسمين بيشاوروا على نفس القايمة بيشوفوا التغيير — هنرجعلها يوم 4.', 'Unlike a string, you can change an item in place: `prices[0] = 150`. That also means two names pointing at the same list both see the change — we come back to this on day 4.'),
          ex: 'prices = [120, 85, 300]\nprices[0] = 150\nprices[-1] += 20\nprint(prices)\nword = "cat"\n# word[0] = "b" would fail: strings are immutable', run: 1 }
      ],
      practice: [
        B('اعمل قايمة بـ 7 مهام النهارده واطبع أول 3 وآخر واحدة وعددهم.', 'Make a list of 7 tasks for today and print the first 3, the last one and how many there are.'),
        B('من قايمة 10 درجات، اعمل قايمة جديدة فيها الناجحين بس (60 فأكتر) بـ for وappend.', 'From a list of 10 scores, build a new list of passing scores only (60 or more) with for and append.'),
        B('ضيف عنصر في الأول وعنصر في النص وقايمة كاملة في الآخر.', 'Add an item at the start, one in the middle and a whole list at the end.'),
        B('غيّر سعر منتج في القايمة وزوّد كل الأسعار 10% بلوب على `range(len(...))`.', 'Change one price in the list, then raise all prices by 10% with a loop over `range(len(...))`.')
      ],
      code: [
        { u: B('جمع أسماء ملفات PDF', 'Collecting PDF file names'), p: 'files = ["a.pdf", "notes.txt", "Invoice.PDF", "logo.png", "report.pdf"]\npdfs = []\nfor name in files:\n    if name.lower().endswith(".pdf"):\n        pdfs.append(name)\nprint(len(pdfs), "PDFs:", pdfs)', run: 1 }
      ],
      words: [
        { t: 'list', m: B('مجموعة عناصر مترتبة بين [] وبتتغير', 'an ordered, changeable collection in []'), ex: '[120, 85, 300]' },
        { t: 'element', m: B('عنصر واحد جوه قايمة أو مجموعة', 'one item inside a list or collection'), ex: 'prices[0] is the first element' },
        { t: 'append()', m: B('بتضيف عنصر في آخر القايمة', 'adds an item to the end of a list'), ex: 'tasks.append("call Omar")' },
        { t: 'insert()', m: B('بتضيف عنصر في مكان معيّن', 'adds an item at a given position'), ex: 'tasks.insert(0, "urgent")' },
        { t: 'extend()', m: B('بتضيف كل عناصر قايمة تانية', 'adds every item of another list'), ex: 'a.extend([4, 5])' },
        { t: 'mutable', m: B('ينفع يتغير بعد ما يتعمل (زي القايمة)', 'can change after it is created (like a list)'), ex: 'prices[0] = 150' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 3.1.3 Lists.', 'Read 3.1.3 Lists.') }, { lib: 'Google’s Python Class', what: B('صفحة Python Lists كلها.', 'The whole Python Lists page.') }],
      challenge: B('اكتب سكربت بيطلب من المستخدم أسماء منتجات واحد ورا التاني لحد ما يكتب `done`، ويحطهم في قايمة، وفي الآخر يطبعهم مترقّمين ومن غير التكرار (لو الاسم موجود ميضيفوش تاني).', 'Write a script that asks for product names one after another until the user types `done`, stores them in a list, and finally prints them numbered and without duplicates (skip a name already in the list).'),
      quiz: [
        { q: B('`[1, 2, 3][-1]`:', '`[1, 2, 3][-1]`:'), o: ['3', '1', '-1'], a: 0, why: B('-1 آخر عنصر.', '-1 is the last item.') },
        { q: B('عشان تضيف عنصر في الآخر:', 'To add an item at the end:'), o: ['append', 'insert', 'extend'], a: 0, why: B('append لعنصر واحد في الآخر.', 'append adds one item at the end.') },
        { q: B('`a = [1]; a.extend([2, 3])` بعدها a:', '`a = [1]; a.extend([2, 3])` leaves a as:'), o: ['[1, 2, 3]', '[1, [2, 3]]', '[2, 3]'], a: 0, why: B('extend بيضيف العناصر نفسها (append كانت هتحط القايمة كعنصر).', 'extend adds the items themselves (append would nest the list).') }
      ] },

    { title: B('تشيل وترتّب وتحسب', 'Removing, sorting and summarising'),
      goal: B('تشيل عناصر بطرق مختلفة، وترتّب بـ sort وsorted وkey، وتلخّص بـ sum وmin وmax.', 'Remove items in different ways, sort with sort, sorted and key, and summarise with sum, min and max.'),
      learn: [
        { h: B('pop وremove وdel', 'pop, remove and del'),
          p: B('`pop()` بتشيل آخر عنصر وترجّعه (و`pop(0)` أول واحد)، `remove(x)` بتشيل أول ظهور للقيمة (ولو مش موجودة `ValueError`)، `del lst[i]` بيمسح بالفهرس. `lst.index(x)` مكان القيمة، و`lst.count(x)` عدد مراتها.', '`pop()` removes and returns the last item (`pop(0)` the first), `remove(x)` removes the first occurrence of a value (a missing one raises `ValueError`), `del lst[i]` deletes by index. `lst.index(x)` finds a value’s position and `lst.count(x)` counts it.'),
          ex: 'queue = ["order-1", "order-2", "order-3", "order-2"]\nfirst = queue.pop(0)\nprint("processing", first)\nqueue.remove("order-2")\nprint(queue, queue.count("order-2"))\ndel queue[-1]\nprint(queue)', run: 1 },
        { h: B('sort مقابل sorted', 'sort versus sorted'),
          p: B('`lst.sort()` بترتّب القايمة نفسها وترجّع `None` (متكتبش `x = lst.sort()`!)، و`sorted(lst)` بترجّع قايمة جديدة مترتبة وتسيب الأصلية. `reverse=True` للعكس، و`key=` بتحدد ترتيب على أساس إيه: `key=len` بالطول، `key=str.lower` من غير فرق الحروف.', '`lst.sort()` sorts the list itself and returns `None` (never write `x = lst.sort()`!), while `sorted(lst)` returns a new sorted list and leaves the original. `reverse=True` reverses, and `key=` decides what to sort by: `key=len` by length, `key=str.lower` ignoring case.'),
          ex: 'names = ["omar", "Sara", "mona", "Ali"]\nprint(sorted(names))\nprint(sorted(names, key=str.lower))\nprint(sorted(names, key=len, reverse=True))\nnames.sort()\nprint(names)', run: 1 },
        { h: B('sum وmin وmax', 'sum, min and max'),
          p: B('`sum(prices)` المجموع، `min` و`max` أصغر وأكبر، و`sum(x) / len(x)` المتوسط (اتأكد إن القايمة مش فاضية الأول). `max` بتاخد `key` برضه: `max(names, key=len)` أطول اسم.', '`sum(prices)` is the total, `min` and `max` the smallest and largest, and `sum(x) / len(x)` the average (check the list is not empty first). `max` also takes `key`: `max(names, key=len)` is the longest name.'),
          ex: 'prices = [120, 85.5, 300, 42]\nprint(sum(prices), min(prices), max(prices))\nprint(round(sum(prices) / len(prices), 2))\nprint(max(["Mo", "Laila", "Hany"], key=len))', run: 1 }
      ],
      practice: [
        B('اعمل «طابور» طلبات: ضيف 5، واخدم أول 2 بـ `pop(0)`، واطبع الباقي.', 'Make an order «queue»: add 5, serve the first 2 with `pop(0)`, and print the rest.'),
        B('جرّب `x = lst.sort()` واطبع x، وبعدين صلّحها بـ sorted.', 'Try `x = lst.sort()`, print x, then fix it with sorted.'),
        B('رتّب 8 كلمات إنجليزي أبجديًا من غير فرق الحروف، وبعدين بالطول.', 'Sort 8 English words alphabetically ignoring case, then by length.'),
        B('من قايمة مبيعات أسبوع، اطبع أعلى يوم وأقل يوم والمتوسط.', 'From a week of sales, print the highest day, the lowest day and the average.')
      ],
      code: [
        { u: B('أعلى 3 مبيعات', 'The top 3 sales'), p: 'sales = [1200, 450, 3100, 980, 2750, 600, 1900]\ntop3 = sorted(sales, reverse=True)[:3]\nprint("Top 3:", top3)\nprint("Share of total:", f"{sum(top3) / sum(sales):.0%}")', run: 1 }
      ],
      words: [
        { t: 'pop()', m: B('بتشيل عنصر (الأخير افتراضيًا) وترجّعه', 'removes an item (the last by default) and returns it'), ex: 'next_order = queue.pop(0)' },
        { t: 'remove()', m: B('بتشيل أول ظهور لقيمة معيّنة', 'removes the first occurrence of a value'), ex: 'tags.remove("old")' },
        { t: 'sort()', m: B('بترتّب القايمة نفسها وترجّع None', 'sorts the list in place and returns None'), ex: 'scores.sort(reverse=True)' },
        { t: 'sorted()', m: B('بترجّع نسخة جديدة مترتبة', 'returns a new sorted copy'), ex: 'sorted(names)' },
        { t: 'key function', m: B('دالة بتقول الترتيب أو المقارنة على أساس إيه', 'a function that says what to sort or compare by'), ex: 'sorted(words, key=len)' },
        { t: 'in place', m: B('التغيير بيحصل في نفس الكائن من غير نسخة جديدة', 'the change happens on the same object, with no new copy'), ex: 'list.sort() works in place' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 5.1 More on Lists.', 'Read 5.1 More on Lists.') }, { lib: 'Python HOWTOs', what: B('افتح Sorting HOWTO واقرا لحد Key Functions.', 'Open the Sorting HOWTO and read up to Key Functions.') }],
      challenge: B('عندك قايمة أسماء موظفين فيها تكرار وحروف متلخبطة. اطبعها نضيفة (Title Case)، من غير تكرار، مترتبة أبجديًا، ومعاها عدد مرات تكرار كل اسم كان في الأصل.', 'You have a list of employee names with duplicates and mixed case. Print it cleaned (Title Case), without duplicates, sorted alphabetically, with how many times each name appeared originally.'),
      quiz: [
        { q: B('`x = [3, 1, 2].sort()` قيمة x:', '`x = [3, 1, 2].sort()` sets x to:'), o: ['None', '[1, 2, 3]', '[3, 1, 2]'], a: 0, why: B('sort بتشتغل in place وترجّع None.', 'sort works in place and returns None.') },
        { q: B('`["b", "A", "c"]` مترتبة من غير فرق الحروف:', '`["b", "A", "c"]` sorted ignoring case:'), o: ['sorted(x, key=str.lower)', 'sorted(x)', 'x.sort(lower)'], a: 0, why: B('key=str.lower.', 'key=str.lower.') },
        { q: B('`[5, 7].pop()` بترجّع:', '`[5, 7].pop()` returns:'), o: ['7', '5', 'None'], a: 0, why: B('pop من غير رقم = آخر عنصر.', 'pop with no index takes the last item.') }
      ] },

    { title: B('List comprehensions وzip', 'List comprehensions and zip'),
      goal: B('تكتب لوب «اعمل قايمة» في سطر واحد بالـ comprehension، وتفلتر، وتستخدم any وall وzip.', 'Write a «build a list» loop in one line with a comprehension, filter it, and use any, all and zip.'),
      learn: [
        { h: B('القايمة في سطر', 'A list in one line'),
          p: B('`[expr for x in items]` = اعمل قايمة جديدة من كل x بعد ما تعمل عليه expr. `[p * 1.14 for p in prices]` بدل 3 سطور لوب وappend. ده بيتقرا «هات p×1.14 لكل p في prices».', '`[expr for x in items]` builds a new list from each x after applying expr. `[p * 1.14 for p in prices]` replaces a 3-line loop with append. Read it as «give p×1.14 for each p in prices».'),
          ex: 'prices = [100, 250, 80]\nwith_vat = [round(p * 1.14, 2) for p in prices]\nnames = [" sara ", "OMAR", "mona"]\nclean = [n.strip().title() for n in names]\nprint(with_vat, clean)', run: 1 },
        { h: B('فلتر بـ if', 'Filter with if'),
          p: B('`[x for x in items if condition]` بياخد العناصر اللي الشرط بتاعها True بس. تقدر تعمل الاتنين: تحوّل وتفلتر. لو الـ comprehension طولت أو بقى فيها شروط كتير، ارجع للوب العادي — الوضوح أهم.', '`[x for x in items if condition]` keeps only the items whose condition is True. You can transform and filter at once. If a comprehension gets long or has many conditions, go back to a normal loop — clarity wins.'),
          ex: 'orders = [120, 2400, 80, 5100, 990]\nbig = [o for o in orders if o >= 1000]\nbig_with_fee = [o + 25 for o in orders if o >= 1000]\nemails = ["a@x.com", "bad", "b@y.org"]\nvalid = [e for e in emails if "@" in e]\nprint(big, big_with_fee, valid)', run: 1 },
        { h: B('any وall وzip', 'any, all and zip'),
          p: B('`any(...)` True لو عنصر واحد على الأقل True، و`all(...)` لو كلهم. `zip(a, b)` بيمشي على قايمتين مع بعض زوج زوج — ممتاز لعمود أسماء وعمود أسعار.', '`any(...)` is True when at least one item is True, `all(...)` when every item is. `zip(a, b)` walks two lists together pair by pair — perfect for a column of names and a column of prices.'),
          ex: 'stock = [5, 0, 12]\nprint(any(s == 0 for s in stock), all(s > 0 for s in stock))\nitems = ["pen", "book", "bag"]\nprices = [7.5, 45, 650]\nfor item, price in zip(items, prices):\n    print(f"{item:<6}{price:>8.2f}")', run: 1 }
      ],
      practice: [
        B('حوّل 3 لوبات (فيها append) من اللي كتبتها الأسبوع ده لـ comprehensions.', 'Turn 3 loops with append that you wrote this week into comprehensions.'),
        B('من قايمة أسماء ملفات، اعمل قايمة بالامتدادات بس (`.split(".")[-1]`) من غير تكرار.', 'From a list of file names, build a list of extensions only (`.split(".")[-1]`) without duplicates.'),
        B('اتأكد بـ all إن كل الإيميلات في قايمة فيها `@`، وبـ any إن فيه واحد على الأقل من gmail.', 'Check with all that every email in a list has `@`, and with any that at least one is from gmail.'),
        B('اطبع كشف بأسماء الطلبة ودرجاتهم من قايمتين بـ zip.', 'Print a report of student names and their scores from two lists with zip.')
      ],
      code: [
        { u: B('تحويل وتفلتر في سطر', 'Transform and filter in one line'), p: 'raw = ["  01012345678", "0109-876-5432", "abc", "01155550000 "]\nphones = [p.strip().replace("-", "") for p in raw]\nvalid = [p for p in phones if p.isdigit() and len(p) == 11]\nprint(valid)', run: 1 }
      ],
      words: [
        { t: 'list comprehension', m: B('طريقة تعمل بيها قايمة من لوب في سطر واحد', 'a way to build a list from a loop in one line'), ex: '[p * 2 for p in prices]' },
        { t: 'filter condition', m: B('الـ if في آخر الـ comprehension اللي بتختار العناصر', 'the if at the end of a comprehension that picks items'), ex: '[x for x in xs if x > 0]' },
        { t: 'any()', m: B('True لو عنصر واحد على الأقل True', 'True if at least one item is True'), ex: 'any(s == 0 for s in stock)' },
        { t: 'all()', m: B('True لو كل العناصر True', 'True if every item is True'), ex: 'all("@" in e for e in emails)' },
        { t: 'zip()', m: B('بتمشي على أكتر من مجموعة مع بعض زوج زوج', 'walks several collections together, pair by pair'), ex: 'zip(names, prices)' },
        { t: 'generator expression', m: B('زي الـ comprehension بس من غير []، بيطلع القيم واحدة واحدة', 'like a comprehension without [], producing values one at a time'), ex: 'sum(p * q for p, q in items)' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 5.1.3 List Comprehensions.', 'Read 5.1.3 List Comprehensions.') }, { lib: 'Real Python Tutorials', what: B('دوّر على «list comprehension» واقرا جزء «when not to use».', 'Search for «list comprehension» and read the «when not to use» part.') }],
      challenge: B('من قايمة أسعار وقايمة كميات بنفس الطول: اطبع إجمالي كل سطر، والإجمالي الكلي في سطر واحد (`sum` + `zip` + generator)، وهل فيه أي سطر قيمته صفر.', 'From a list of prices and a list of quantities of the same length: print each line total, the grand total in one line (`sum` + `zip` + a generator), and whether any line is zero.'),
      quiz: [
        { q: B('`[n * 2 for n in range(3)]`:', '`[n * 2 for n in range(3)]`:'), o: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]'], a: 0, why: B('0و1و2 كل واحد ×2.', '0, 1 and 2, each ×2.') },
        { q: B('`all([])` بيدي:', '`all([])` gives:'), o: ['True', 'False', B('خطأ', 'an error')], a: 0, why: B('مفيش عنصر False، فبيرجّع True (معلومة بتفاجئ ناس كتير).', 'No item is False, so it returns True (it surprises many people).') },
        { q: B('`list(zip([1, 2, 3], ["a", "b"]))`:', '`list(zip([1, 2, 3], ["a", "b"]))`:'), o: ['[(1, "a"), (2, "b")]', '[(1, "a"), (2, "b"), (3, None)]', B('خطأ', 'an error')], a: 0, why: B('zip بتقف عند أقصر قايمة.', 'zip stops at the shortest list.') }
      ] },

    { title: B('الـ tuples والفك والنسخ', 'Tuples, unpacking and copying'),
      goal: B('تستخدم الـ tuple للبيانات الثابتة، وتفك القيم في متغيرات، وتتجنب أشهر فخ في القوايم: اسمين لنفس القايمة.', 'Use tuples for fixed data, unpack values into variables, and avoid the most common list trap: two names for the same list.'),
      learn: [
        { h: B('tuple = قايمة ثابتة', 'A tuple is a fixed list'),
          p: B('`point = (30.04, 31.24)` بين أقواس عادية ومبيتغيرش. استخدمه للحاجات اللي شكلها ثابت: إحداثيات، تاريخ (سنة، شهر، يوم)، سجل (اسم، سعر). tuple من عنصر واحد محتاج فاصلة: `(5,)`.', '`point = (30.04, 31.24)` uses round brackets and never changes. Use it for fixed shapes: coordinates, a date (year, month, day), a record (name, price). A one-item tuple needs a comma: `(5,)`.'),
          ex: 'cairo = (30.04, 31.24)\nrecord = ("Notebook", 45.0, 3)\nprint(cairo[0], record[1] * record[2])\nprint(type((5)), type((5,)))', run: 1 },
        { h: B('الفك (unpacking)', 'Unpacking'),
          p: B('`name, price, qty = record` بيوزّع القيم على متغيرات مرة واحدة (العدد لازم يساوي). `a, b = b, a` بيبدّل قيمتين. والنجمة بتاخد «الباقي»: `first, *rest = items`. وفي اللوب: `for name, price in pairs:`.', '`name, price, qty = record` spreads the values into variables at once (the counts must match). `a, b = b, a` swaps two values. A star takes «the rest»: `first, *rest = items`. In a loop: `for name, price in pairs:`.'),
          ex: 'record = ("Notebook", 45.0, 3)\nname, price, qty = record\nprint(name, price * qty)\na, b = 1, 2\na, b = b, a\nprint(a, b)\nhead, *rest = ["id", "name", "email", "city"]\nprint(head, rest)', run: 1 },
        { h: B('فخ: اسمين لقايمة واحدة', 'The trap: two names for one list'),
          p: B('`b = a` مش بتعمل نسخة؛ الاتنين بيشاوروا على **نفس** القايمة، فتعديل b بيغيّر a. للنسخة: `b = a.copy()` أو `b = a[:]` أو `list(a)`. ولو جوه القايمة قوايم، النسخة دي «سطحية»؛ للعميقة `copy.deepcopy`.', '`b = a` does not copy; both names point at the **same** list, so changing b changes a. To copy: `b = a.copy()`, `b = a[:]` or `list(a)`. If the list holds lists, that copy is «shallow»; for a deep one use `copy.deepcopy`.'),
          ex: 'a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)          # [1, 2, 3, 4]  surprise!\nc = a.copy()\nc.append(5)\nprint(a, c)\nprint(a is b, a is c)', run: 1 }
      ],
      practice: [
        B('اعمل قايمة tuples لـ 5 منتجات (اسم، سعر، كمية) واطبع إجمالي كل واحد بالفك في اللوب.', 'Make a list of 5 product tuples (name, price, qty) and print each total by unpacking in the loop.'),
        B('بدّل قيمتين من غير متغير تالت.', 'Swap two values without a third variable.'),
        B('من سطر CSV مقسوم، خد أول عنصر كـ id والباقي في قايمة بالنجمة.', 'From a split CSV line, take the first item as id and the rest into a list with a star.'),
        B('اعمل فخ `b = a` بإيدك، وبعدين صلّحه بـ `copy()` واتأكد بـ `is`.', 'Fall into the `b = a` trap on purpose, then fix it with `copy()` and check with `is`.')
      ],
      code: [
        { u: B('سجلات وفك', 'Records and unpacking'), p: 'orders = [("INV-1", "Sara", 1200.0), ("INV-2", "Omar", 450.5), ("INV-3", "Mona", 3100.0)]\nfor inv, customer, amount in orders:\n    flag = "big" if amount > 1000 else ""\n    print(f"{inv:<7}{customer:<6}{amount:>9.2f} {flag}")\ntotal = sum(amount for _, _, amount in orders)\nprint("total", total)', run: 1 }
      ],
      words: [
        { t: 'tuple', m: B('مجموعة مترتبة ثابتة بين ()', 'an ordered, unchangeable collection in ()'), ex: '(30.04, 31.24)' },
        { t: 'unpacking', m: B('توزيع عناصر مجموعة على متغيرات', 'spreading the items of a collection into variables'), ex: 'name, price = ("pen", 7.5)' },
        { t: 'star expression', m: B('*name بتاخد باقي العناصر في قايمة', '*name collects the remaining items into a list'), ex: 'first, *rest = row' },
        { t: 'aliasing', m: B('اسمين بيشاوروا على نفس الكائن', 'two names pointing at the same object'), ex: 'b = a  # not a copy' },
        { t: 'shallow copy', m: B('نسخة جديدة للقايمة بس العناصر اللي جواها مشتركة', 'a new list whose inner items are still shared'), ex: 'b = a.copy()' },
        { t: 'identity', m: B('هل اسمين لنفس الكائن بالظبط؟ (is)', 'whether two names are the very same object (is)'), ex: 'a is b' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 5.3 Tuples and Sequences.', 'Read 5.3 Tuples and Sequences.') }, { lib: 'Python Tutor', what: B('الزق مثال `b = a` وشوف الأسهم بتشاور على إيه.', 'Paste the `b = a` example and watch where the arrows point.') }],
      challenge: B('اكتب سكربت بيبدّل أول وآخر عنصر في قايمة من غير ما يبوّظ النسخة الأصلية، ويطبع الأصلية والجديدة عشان تثبت إنهم مختلفين.', 'Write a script that swaps the first and last items of a list without touching the original, printing both to prove they differ.'),
      quiz: [
        { q: B('tuple من عنصر واحد بيتكتب:', 'A one-item tuple is written:'), o: ['(5,)', '(5)', '[5]'], a: 0, why: B('`(5)` مجرد رقم بين قوسين.', '`(5)` is just a number in brackets.') },
        { q: B('`a = [1]; b = a; b.append(2)`، a بقت:', '`a = [1]; b = a; b.append(2)` leaves a as:'), o: ['[1, 2]', '[1]', '[2]'], a: 0, why: B('b وa نفس القايمة.', 'b and a are the same list.') },
        { q: B('`x, *y = [1, 2, 3]` قيمة y:', '`x, *y = [1, 2, 3]` sets y to:'), o: ['[2, 3]', '2', '(2, 3)'], a: 0, why: B('النجمة بتاخد الباقي كقايمة.', 'The star collects the rest as a list.') }
      ] },

    { title: B('قوايم جوه قوايم: الجداول', 'Lists inside lists: tables'),
      goal: B('تمثّل جدول (زي Excel) كقايمة صفوف، وتقرا الأعمدة، وترتّب بعمود بـ `key=lambda`.', 'Represent a table (like Excel) as a list of rows, read columns, and sort by a column with `key=lambda`.'),
      learn: [
        { h: B('الجدول = قايمة صفوف', 'A table is a list of rows'),
          p: B('`rows = [["Sara", "Cairo", 1200], ["Omar", "Giza", 450]]`: كل صف قايمة. `rows[0][2]` = الصف الأول العمود التالت. ده نفس شكل البيانات اللي هتقراها من CSV وExcel بعدين.', '`rows = [["Sara", "Cairo", 1200], ["Omar", "Giza", 450]]`: each row is a list. `rows[0][2]` is row one, column three. This is exactly the shape of the data you will read from CSV and Excel later.'),
          ex: 'header = ["name", "city", "spent"]\nrows = [["Sara", "Cairo", 1200], ["Omar", "Giza", 450], ["Mona", "Cairo", 3100]]\nprint(rows[2][0], rows[2][2])\nfor name, city, spent in rows:\n    print(f"{name:<6}{city:<7}{spent:>6}")', run: 1 },
        { h: B('عمود من الجدول', 'A column of the table'),
          p: B('عمود = comprehension على الصفوف: `[r[2] for r in rows]`. ومنه تحسب: `sum(r[2] for r in rows)`. وتفلتر صفوف: `[r for r in rows if r[1] == "Cairo"]`. و`zip(*rows)` بيقلب الصفوف لأعمدة (transpose).', 'A column is a comprehension over the rows: `[r[2] for r in rows]`. From it you compute: `sum(r[2] for r in rows)`. You filter rows: `[r for r in rows if r[1] == "Cairo"]`. `zip(*rows)` turns rows into columns (a transpose).'),
          ex: 'rows = [["Sara", "Cairo", 1200], ["Omar", "Giza", 450], ["Mona", "Cairo", 3100]]\nspent = [r[2] for r in rows]\ncairo = [r[0] for r in rows if r[1] == "Cairo"]\nprint(spent, sum(spent), cairo)\nnames, cities, amounts = zip(*rows)\nprint(cities)', run: 1 },
        { h: B('الترتيب بعمود: lambda', 'Sorting by a column: lambda'),
          p: B('`lambda r: r[2]` دالة صغيرة من غير اسم: «خد صف ورجّع العمود التالت». `sorted(rows, key=lambda r: r[2], reverse=True)` ترتيب بالأكبر صرف. هنفهم الدوال بعمق في أسبوع 6.', '`lambda r: r[2]` is a tiny nameless function: «take a row, return its third column». `sorted(rows, key=lambda r: r[2], reverse=True)` sorts by the biggest spender. Functions get their full week in week 6.'),
          ex: 'rows = [["Sara", "Cairo", 1200], ["Omar", "Giza", 450], ["Mona", "Cairo", 3100]]\nfor name, city, spent in sorted(rows, key=lambda r: r[2], reverse=True):\n    print(name, spent)\nprint(sorted(rows, key=lambda r: (r[1], -r[2])))', run: 1 }
      ],
      practice: [
        B('اعمل جدول 6 موظفين (اسم، قسم، مرتب) واطبعه بأعمدة مستقيمة مع سطر عناوين.', 'Make a table of 6 employees (name, department, salary) and print it in straight columns with a header row.'),
        B('اطبع مجموع المرتبات لكل قسم بلوب (من غير dict — هنتعلمه الأسبوع الجاي).', 'Print the salary total per department with loops (without a dict — that is next week).'),
        B('رتّب الموظفين بالقسم وبعدين بالمرتب من الأكبر.', 'Sort the employees by department, then by salary from the highest.'),
        B('اقلب جدول 3×4 لـ 4×3 بـ `zip(*rows)` واطبعه.', 'Turn a 3×4 table into 4×3 with `zip(*rows)` and print it.')
      ],
      code: [
        { u: B('تقرير من جدول', 'A report from a table'), p: 'rows = [\n    ["2026-09-01", "Cairo", 1200.0],\n    ["2026-09-01", "Giza", 450.0],\n    ["2026-09-02", "Cairo", 3100.0],\n    ["2026-09-02", "Alex", 980.0],\n]\ncities = sorted(set(r[1] for r in rows))\nfor city in cities:\n    total = sum(r[2] for r in rows if r[1] == city)\n    print(f"{city:<6}{total:>9,.2f}")', run: 1 }
      ],
      words: [
        { t: 'nested list', m: B('قايمة عناصرها قوايم', 'a list whose items are lists'), ex: '[[1, 2], [3, 4]]' },
        { t: 'row', m: B('سطر في جدول: سجل واحد', 'one line of a table: one record'), ex: 'rows[0]' },
        { t: 'column', m: B('نفس الحقل في كل الصفوف', 'the same field across all rows'), ex: '[r[2] for r in rows]' },
        { t: 'header', m: B('الصف الأول اللي فيه أسماء الأعمدة', 'the first row that names the columns'), ex: '["name", "city", "spent"]' },
        { t: 'lambda', m: B('دالة صغيرة في سطر من غير اسم', 'a tiny one-line function with no name'), ex: 'key=lambda r: r[2]' },
        { t: 'transpose', m: B('قلب الصفوف لأعمدة والعكس', 'turning rows into columns and back'), ex: 'list(zip(*rows))' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 5.1.4 Nested List Comprehensions.', 'Read 5.1.4 Nested List Comprehensions.') }, { lib: 'Think Python, 3rd edition', what: B('فصل Lists، والتمارين اللي في آخره.', 'The Lists chapter and the exercises at its end.') }],
      challenge: B('عندك جدول درجات (اسم + 4 مواد). اطبع لكل طالب مجموعه ومتوسطه وأعلى مادة، وفي الآخر ترتيب الطلبة بالمجموع، ومتوسط كل مادة على الفصل.', 'You have a grade table (name + 4 subjects). Print each student’s total, average and best subject, then rank the students by total, and give each subject’s class average.'),
      quiz: [
        { q: B('`rows = [[1, 2], [3, 4]]`، `rows[1][0]`:', '`rows = [[1, 2], [3, 4]]`, `rows[1][0]`:'), o: ['3', '2', '4'], a: 0, why: B('الصف التاني، العمود الأول.', 'Second row, first column.') },
        { q: B('`key=lambda r: r[1]` معناها:', '`key=lambda r: r[1]` means:'), o: [B('رتّب بالعمود التاني', 'sort by the second column'), B('رتّب بالصف التاني', 'sort by the second row'), B('خد أول عنصر', 'take the first item')], a: 0, why: B('لكل صف r رجّع r[1].', 'For each row r return r[1].') },
        { q: B('`list(zip(*[[1, 2], [3, 4]]))`:', '`list(zip(*[[1, 2], [3, 4]]))`:'), o: ['[(1, 3), (2, 4)]', '[(1, 2), (3, 4)]', '[1, 2, 3, 4]'], a: 0, why: B('zip(*rows) = أعمدة.', 'zip(*rows) gives the columns.') }
      ] },

    { title: B('مشروع الشهر الأول واختبار الأسبوع', 'The month 1 project and weekly test'),
      goal: B('تبني أداة كاملة من كل اللي فات في الشهر، وتعدّي اختبار الأسبوع عشان امتحان الشهر يفتح.', 'Build a complete tool from the whole month and pass the weekly test to open the month exam.'),
      review: [
        B('append وinsert وextend وpop وremove، وإن القايمة mutable.', 'append, insert, extend, pop, remove, and lists being mutable.'),
        B('sort مقابل sorted، وkey وreverse، وsum وmin وmax.', 'sort versus sorted, key and reverse, and sum, min and max.'),
        B('list comprehensions بالفلتر، وany وall وzip.', 'List comprehensions with filters, and any, all and zip.'),
        B('الـ tuples والفك والنجمة، وفخ `b = a` والنسخ.', 'Tuples, unpacking and the star, and the `b = a` trap and copies.'),
        B('الجداول كقوايم صفوف، والأعمدة، والترتيب بـ lambda.', 'Tables as lists of rows, columns, and sorting with lambda.')
      ],
      project: B('**مشروع الشهر: متتبع المصاريف** (`expenses.py`): برنامج بقايمة أوامر يحفظ المصاريف كقايمة tuples `(date, category, amount, note)`. الأوامر: `add` (يسأل ويتحقق إن المبلغ رقم موجب والتاريخ بالشكل `YYYY-MM-DD`)، و`list` (جدول مترقّم مترتب بالتاريخ)، و`top` (أكبر 5 مصاريف)، و`by-cat` (مجموع كل فئة ونسبتها من الكل)، و`delete <رقم>`، و`quit`. ابدأ بـ 8 مصاريف تجريبية مكتوبة في الكود. اكتب ملف `README.md` صغير بيشرح الأوامر. (هنحفظ البيانات في ملف حقيقي في أسبوع 9، وفي SQLite في أسبوع 18.)', '**Month project: the expense tracker** (`expenses.py`): a menu program that keeps expenses as a list of tuples `(date, category, amount, note)`. Commands: `add` (asks and checks the amount is a positive number and the date looks like `YYYY-MM-DD`), `list` (a numbered table sorted by date), `top` (the 5 largest expenses), `by-cat` (each category’s total and its share of the whole), `delete <number>`, and `quit`. Start with 8 sample expenses written in the code. Write a small `README.md` explaining the commands. (We save the data in a real file in week 9 and in SQLite in week 18.)'),
      test: [
        { q: B('`[10, 20, 30][1:]`:', '`[10, 20, 30][1:]`:'), o: ['[20, 30]', '[10]', '[10, 20]'], a: 0, why: B('من فهرس 1 للآخر.', 'From index 1 to the end.') },
        { q: B('`len([[1, 2], [3]])`:', '`len([[1, 2], [3]])`:'), o: ['2', '3', '1'], a: 0, why: B('عنصرين (قايمتين).', 'Two items (two lists).') },
        { q: B('`sorted([3, 1, 2], reverse=True)`:', '`sorted([3, 1, 2], reverse=True)`:'), o: ['[3, 2, 1]', '[1, 2, 3]', 'None'], a: 0, why: B('ترتيب تنازلي في قايمة جديدة.', 'Descending, in a new list.') },
        { q: B('`["a", "b"].remove("z")` بيطلّع:', '`["a", "b"].remove("z")` raises:'), o: ['ValueError', 'IndexError', 'KeyError'], a: 0, why: B('القيمة مش موجودة.', 'The value is not there.') },
        { q: B('`[x for x in range(6) if x % 2]`:', '`[x for x in range(6) if x % 2]`:'), o: ['[1, 3, 5]', '[0, 2, 4]', '[0, 1, 2, 3, 4, 5]'], a: 0, why: B('x % 2 = 1 (truthy) للفردي.', 'x % 2 is 1 (truthy) for odd numbers.') },
        { q: B('`any([0, "", None])`:', '`any([0, "", None])`:'), o: ['False', 'True', 'None'], a: 0, why: B('كلهم falsy.', 'All of them are falsy.') },
        { q: B('`a, b = (1, 2)` بعدها `a, b = b, a`. قيمة a:', '`a, b = (1, 2)`, then `a, b = b, a`. a is:'), o: ['2', '1', '(2, 1)'], a: 0, why: B('اتبدّلوا.', 'They swapped.') },
        { q: B('أي واحدة بتعمل نسخة مستقلة من القايمة a؟', 'Which makes an independent copy of list a?'), o: ['a.copy()', 'b = a', 'a.append()'], a: 0, why: B('`b = a` اسم تاني لنفس القايمة.', '`b = a` is another name for the same list.') },
        { q: B('ليه tuple بدل list لإحداثيات (lat, lon)؟', 'Why a tuple rather than a list for (lat, lon)?'), o: [B('شكلها ثابت ومش المفروض تتغير', 'its shape is fixed and should not change'), B('أسرع في الطباعة', 'it prints faster'), B('القوايم مبتقبلش أرقام عشرية', 'lists cannot hold decimals')], a: 0, why: B('الـ tuple للبيانات الثابتة.', 'Tuples are for fixed data.') },
        { q: B('`sum(p * q for p, q in [(10, 2), (5, 4)])`:', '`sum(p * q for p, q in [(10, 2), (5, 4)])`:'), o: ['40', '21', '30'], a: 0, why: B('20 + 20.', '20 + 20.') },
        { q: B('`max(["pen", "notebook", "bag"], key=len)`:', '`max(["pen", "notebook", "bag"], key=len)`:'), o: ['"notebook"', '"pen"', '8'], a: 0, why: B('الأطول، وبترجّع العنصر نفسه مش طوله.', 'The longest, and it returns the item itself, not its length.') },
        { q: B('`list(zip("ab", [1, 2]))`:', '`list(zip("ab", [1, 2]))`:'), o: ['[("a", 1), ("b", 2)]', '["a1", "b2"]', '[("ab", 1, 2)]'], a: 0, why: B('أزواج من الاتنين.', 'Pairs from both.') }
      ] }
  ]
};
