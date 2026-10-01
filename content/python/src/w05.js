// Python week 5 — Dicts, sets and JSON.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الـ dict والـ set وJSON', 'Dicts, sets and JSON'),
  goal: B('تخزّن البيانات بالاسم في dict، وتعد وتجمّع بيه، وتشتغل بقوايم dicts (شكل أي API وأي item في n8n)، وتستخدم الـ set للحاجات المميزة، وتحوّل من وإلى JSON.',
          'Store data by name in a dict, count and group with it, work with lists of dicts (the shape of every API and every n8n item), use sets for unique things, and convert to and from JSON.'),
  days: [
    { title: B('الـ dict: مفتاح وقيمة', 'The dict: keys and values'),
      goal: B('تعمل dict وتقرا منه بأمان بـ get، وتضيف وتعدّل وتمسح، وتلف على المفاتيح والقيم.', 'Create a dict, read from it safely with get, add, change and delete, and loop over keys and values.'),
      learn: [
        { h: B('بيانات بالاسم بدل الرقم', 'Data by name instead of by number'),
          p: B('`customer = {"name": "Sara", "city": "Cairo", "orders": 3}`: كل مفتاح ليه قيمة. بتقرا بالاسم `customer["city"]` بدل ما تفتكر إن المدينة العمود التاني. المفتاح غالبًا نص، والقيمة أي حاجة (حتى قايمة أو dict تاني).', '`customer = {"name": "Sara", "city": "Cairo", "orders": 3}`: each key has a value. You read by name, `customer["city"]`, instead of remembering the city is column two. Keys are usually strings and values can be anything (even a list or another dict).'),
          ex: 'customer = {"name": "Sara", "city": "Cairo", "orders": 3}\nprint(customer["name"], customer["orders"])\ncustomer["orders"] += 1          # change\ncustomer["vip"] = True            # add a new key\ndel customer["city"]              # delete\nprint(customer, len(customer))', run: 1 },
        { h: B('get بدل الأقواس لما مش متأكد', 'get instead of brackets when unsure'),
          p: B('`customer["phone"]` لو المفتاح مش موجود بيطلّع `KeyError` والبرنامج يقع. `customer.get("phone")` بترجّع `None`، و`customer.get("phone", "-")` بترجّع قيمة بديلة. `"phone" in customer` بيسأل عن المفتاح.', '`customer["phone"]` raises `KeyError` when the key is missing and the program crashes. `customer.get("phone")` returns `None`, and `customer.get("phone", "-")` returns a fallback. `"phone" in customer` asks about the key.'),
          ex: 'customer = {"name": "Sara", "city": "Cairo"}\nprint(customer.get("phone"))\nprint(customer.get("phone", "no phone"))\nprint("city" in customer, "phone" in customer)\ntry:\n    customer["phone"]\nexcept KeyError as e:\n    print("KeyError:", e)', run: 1 },
        { h: B('keys وvalues وitems', 'keys, values and items'),
          p: B('`for key in d:` بيلف على المفاتيح. `d.values()` القيم بس، و`d.items()` أزواج (مفتاح، قيمة) — أكتر واحدة هتستخدمها: `for name, price in prices.items():`. والـ dict بيحافظ على ترتيب الإضافة.', '`for key in d:` loops over the keys. `d.values()` gives only the values, and `d.items()` the (key, value) pairs — the one you will use most: `for name, price in prices.items():`. A dict keeps insertion order.'),
          ex: 'prices = {"pen": 7.5, "notebook": 45, "bag": 650}\nfor item, price in prices.items():\n    print(f"{item:<9}{price:>7.2f}")\nprint(list(prices.keys()), sum(prices.values()))\nprices.update({"pen": 8, "ruler": 12})\nprint(prices)', run: 1 }
      ],
      practice: [
        B('اعمل dict لمنتج فيه 5 مفاتيح، واطبع كل مفتاح وقيمته بـ items.', 'Make a product dict with 5 keys and print each key and value with items.'),
        B('اقرا مفتاح مش موجود بالأقواس وبعدين بـ get بقيمة بديلة.', 'Read a missing key with brackets, then with get and a fallback.'),
        B('اعمل dict أسعار لـ 6 منتجات، وزوّد كلهم 5% بلوب على items.', 'Make a price dict for 6 products and raise them all by 5% with a loop over items.'),
        B('استخدم `update` تضيف منتجين وتغيّر سعر واحد في سطر.', 'Use `update` to add two products and change one price in one line.')
      ],
      code: [
        { u: B('فاتورة من dict أسعار', 'An invoice from a price dict'), p: 'prices = {"pen": 7.5, "notebook": 45, "bag": 650}\ncart = [("pen", 4), ("bag", 1), ("eraser", 2)]\ntotal = 0\nfor item, qty in cart:\n    price = prices.get(item)\n    if price is None:\n        print("unknown item:", item)\n        continue\n    total += price * qty\nprint("total:", total)', run: 1 }
      ],
      words: [
        { t: 'dictionary', m: B('مجموعة أزواج مفتاح وقيمة بين {} (dict)', 'a collection of key-value pairs in {} (dict)'), ex: '{"name": "Sara"}' },
        { t: 'key', m: B('الاسم اللي بتوصل بيه للقيمة في dict', 'the name you use to reach a value in a dict'), ex: 'customer["city"]' },
        { t: 'value', m: B('البيانات المحفوظة تحت مفتاح', 'the data stored under a key'), ex: '"Cairo"' },
        { t: 'get()', m: B('بتقرا مفتاح من غير خطأ لو مش موجود', 'reads a key without an error when it is missing'), ex: 'd.get("phone", "-")' },
        { t: 'KeyError', m: B('خطأ لما تطلب مفتاح مش موجود بالأقواس', 'an error when you ask for a missing key with brackets'), ex: 'd["nope"]' },
        { t: 'items()', m: B('بترجّع أزواج (مفتاح، قيمة) للّف عليها', 'returns (key, value) pairs to loop over'), ex: 'for k, v in d.items():' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 5.5 Dictionaries و5.6 Looping Techniques.', 'Read 5.5 Dictionaries and 5.6 Looping Techniques.') }, { lib: 'Google’s Python Class', what: B('صفحة Python Dict and File: جزء Dict بس.', 'The Python Dict and File page: the Dict part only.') }],
      challenge: B('اعمل «دليل تليفونات» بقايمة أوامر: add وfind (بجزء من الاسم ومن غير فرق الحروف) وdelete وlist مترتب أبجديًا، والبيانات في dict اسم → رقم.', 'Make a «phone book» menu: add, find (by part of the name, ignoring case), delete and an alphabetical list, with the data in a name → number dict.'),
      quiz: [
        { q: B('`{"a": 1}.get("b", 0)`:', '`{"a": 1}.get("b", 0)`:'), o: ['0', 'None', 'KeyError'], a: 0, why: B('القيمة البديلة.', 'The fallback.') },
        { q: B('`"Cairo" in {"city": "Cairo"}`:', '`"Cairo" in {"city": "Cairo"}`:'), o: ['False', 'True', B('خطأ', 'an error')], a: 0, why: B('`in` على dict بيدوّر في المفاتيح مش القيم.', '`in` on a dict searches the keys, not the values.') },
        { q: B('عشان تلف على المفتاح والقيمة مع بعض:', 'To loop over keys and values together:'), o: ['d.items()', 'd.keys()', 'd.values()'], a: 0, why: B('items بترجّع أزواج.', 'items returns pairs.') }
      ] },

    { title: B('العد والتجميع', 'Counting and grouping'),
      goal: B('تعد التكرارات وتجمّع البيانات في مجموعات بالـ dict، وتستخدم Counter وdefaultdict، وترتّب dict بالقيمة.', 'Count occurrences and group data with dicts, use Counter and defaultdict, and sort a dict by value.'),
      learn: [
        { h: B('نمط العدّاد', 'The counter pattern'),
          p: B('`counts[x] = counts.get(x, 0) + 1` جوه لوب = عد كل قيمة اتكررت كام مرة. أسهل منه `Counter` من `collections`: بيعد في سطر و`most_common(3)` بيديك الأكتر.', '`counts[x] = counts.get(x, 0) + 1` inside a loop counts how often each value appears. Easier still: `Counter` from `collections` counts in one line, and `most_common(3)` gives the top ones.'),
          ex: 'from collections import Counter\nstatuses = ["paid", "new", "paid", "cancelled", "paid", "new"]\ncounts = {}\nfor s in statuses:\n    counts[s] = counts.get(s, 0) + 1\nprint(counts)\nprint(Counter(statuses).most_common(2))', run: 1 },
        { h: B('التجميع في قوايم', 'Grouping into lists'),
          p: B('عشان تجمّع العناصر حسب حاجة (الطلبات حسب المدينة): dict قيمته قايمة. `groups.setdefault(city, []).append(order)`، أو `defaultdict(list)` اللي بيعمل القايمة الفاضية لوحده.', 'To group items by something (orders by city): a dict whose values are lists. `groups.setdefault(city, []).append(order)`, or `defaultdict(list)`, which creates the empty list for you.'),
          ex: 'from collections import defaultdict\norders = [("Cairo", 1200), ("Giza", 450), ("Cairo", 3100), ("Alex", 980), ("Giza", 70)]\nby_city = defaultdict(list)\nfor city, amount in orders:\n    by_city[city].append(amount)\nfor city, amounts in by_city.items():\n    print(city, amounts, sum(amounts))', run: 1 },
        { h: B('dict comprehension والترتيب بالقيمة', 'Dict comprehensions and sorting by value'),
          p: B('`{k: v for k, v in pairs}` زي list comprehension بس بيعمل dict. والترتيب بالقيمة: `sorted(d.items(), key=lambda kv: kv[1], reverse=True)` بيرجّع قايمة أزواج مترتبة، وتقدر ترجّعها dict بـ `dict(...)`.', '`{k: v for k, v in pairs}` is like a list comprehension but builds a dict. To sort by value: `sorted(d.items(), key=lambda kv: kv[1], reverse=True)` returns sorted pairs, which `dict(...)` turns back into a dict.'),
          ex: 'sales = {"Cairo": 4300, "Giza": 520, "Alex": 980}\nwith_vat = {city: round(v * 1.14) for city, v in sales.items()}\nranked = dict(sorted(sales.items(), key=lambda kv: kv[1], reverse=True))\nbig = {c: v for c, v in sales.items() if v > 900}\nprint(with_vat, ranked, big, sep="\\n")', run: 1 }
      ],
      practice: [
        B('عدّ الكلمات في فقرة إنجليزي (بعد lower وشيل علامات الترقيم) واطبع أكتر 5.', 'Count the words in an English paragraph (after lower and removing punctuation) and print the top 5.'),
        B('جمّع قايمة موظفين (اسم، قسم) في dict قسم → أسماء.', 'Group a list of employees (name, department) into a department → names dict.'),
        B('اعمل dict بالمجموع لكل قسم من جدول مرتبات أسبوع 4، المرة دي بالـ dict.', 'Build a total-per-department dict from the week 4 salary table, this time with a dict.'),
        B('رتّب dict مبيعات من الأكبر واطبع الترتيب بأرقام.', 'Sort a sales dict from the largest and print the ranking with numbers.')
      ],
      code: [
        { u: B('أكتر المنتجات مبيعًا', 'The best-selling products'), p: 'from collections import Counter\nlines = ["pen", "bag", "pen", "notebook", "pen", "bag", "ruler"]\nfor product, n in Counter(lines).most_common(3):\n    print(f"{product:<9}{n}")', run: 1 }
      ],
      words: [
        { t: 'counter pattern', m: B('عدّ التكرارات في dict بـ get(x, 0) + 1', 'counting occurrences in a dict with get(x, 0) + 1'), ex: 'counts[w] = counts.get(w, 0) + 1' },
        { t: 'Counter', m: B('dict جاهز للعد من collections', 'a ready-made counting dict from collections'), ex: 'Counter(words).most_common(5)' },
        { t: 'defaultdict', m: B('dict بيعمل قيمة افتراضية لأي مفتاح جديد', 'a dict that creates a default value for any new key'), ex: 'defaultdict(list)' },
        { t: 'setdefault()', m: B('بترجّع قيمة المفتاح، ولو مش موجود بتحط قيمة افتراضية', 'returns a key’s value, inserting a default when missing'), ex: 'g.setdefault(k, []).append(x)' },
        { t: 'dict comprehension', m: B('طريقة تعمل dict من لوب في سطر', 'a way to build a dict from a loop in one line'), ex: '{k: v * 2 for k, v in d.items()}' },
        { t: 'grouping', m: B('تقسيم العناصر لمجموعات حسب قيمة مشتركة', 'splitting items into groups by a shared value'), ex: 'orders by city' }
      ],
      read: [{ lib: 'The Python Standard Library', what: B('افتح صفحة collections واقرا Counter وdefaultdict.', 'Open the collections page and read Counter and defaultdict.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Dictionaries and Structuring Data.', 'The Dictionaries and Structuring Data chapter.') }],
      challenge: B('من قايمة 15 طلب (عميل، منتج، كمية)، اطبع: لكل عميل إجمالي القطع، وأكتر منتج اتباع، والعملاء اللي اشتروا أكتر من منتج مختلف.', 'From a list of 15 orders (customer, product, qty), print each customer’s total pieces, the best-selling product, and the customers who bought more than one different product.'),
      quiz: [
        { q: B('`Counter("banana")["a"]`:', '`Counter("banana")["a"]`:'), o: ['3', '2', '1'], a: 0, why: B('a اتكررت 3 مرات.', 'a appears 3 times.') },
        { q: B('ميزة defaultdict(list):', 'What defaultdict(list) gives you:'), o: [B('مفيش KeyError؛ بيعمل قايمة فاضية للمفتاح الجديد', 'no KeyError; it creates an empty list for a new key'), B('بيرتّب المفاتيح', 'sorted keys'), B('أسرع في الطباعة', 'faster printing')], a: 0, why: B('بيجهز القيمة الافتراضية.', 'It prepares the default value.') },
        { q: B('`{n: n * n for n in range(3)}`:', '`{n: n * n for n in range(3)}`:'), o: ['{0: 0, 1: 1, 2: 4}', '[0, 1, 4]', '{0, 1, 4}'], a: 0, why: B('dict comprehension.', 'A dict comprehension.') }
      ] },

    { title: B('البيانات المتداخلة: قوايم dicts', 'Nested data: lists of dicts'),
      goal: B('تشتغل بقايمة dicts (شكل ردود الـ APIs وitems بتوع n8n)، وتوصل لبيانات جوه بيانات بأمان، وتطبعها بشكل مقروء.', 'Work with a list of dicts (the shape of API responses and n8n items), reach data inside data safely, and print it readably.'),
      learn: [
        { h: B('قايمة dicts = جدول بأسماء', 'A list of dicts is a table with names'),
          p: B('`orders = [{"id": 1, "customer": "Sara", "total": 1200}, ...]` نفس الجدول بتاع أسبوع 4 بس كل عمود باسمه. ده الشكل اللي هتلاقيه في أي API وفي n8n (كل item هو `{"json": {...}}`). اللف والفلترة والترتيب بنفس الطرق.', '`orders = [{"id": 1, "customer": "Sara", "total": 1200}, ...]` is the week 4 table with each column named. It is the shape you will meet in every API and in n8n (each item is `{"json": {...}}`). Looping, filtering and sorting work the same way.'),
          ex: 'orders = [\n    {"id": 1, "customer": "Sara", "total": 1200, "paid": True},\n    {"id": 2, "customer": "Omar", "total": 450, "paid": False},\n    {"id": 3, "customer": "Mona", "total": 3100, "paid": True},\n]\npaid = [o for o in orders if o["paid"]]\nprint(sum(o["total"] for o in paid))\nfor o in sorted(orders, key=lambda o: o["total"], reverse=True):\n    print(o["id"], o["customer"], o["total"])', run: 1 },
        { h: B('بيانات جوه بيانات', 'Data inside data'),
          p: B('`order["customer"]["address"]["city"]` بتمشي خطوة خطوة. لو أي خطوة ممكن تكون ناقصة، استخدم `get` مع dict فاضي: `order.get("customer", {}).get("phone")` — زي `?.` في JavaScript وn8n.', '`order["customer"]["address"]["city"]` walks step by step. If any step may be missing, use `get` with an empty dict: `order.get("customer", {}).get("phone")` — like `?.` in JavaScript and n8n.'),
          ex: 'order = {"id": 7, "customer": {"name": "Laila", "address": {"city": "Mansoura"}}, "items": [{"sku": "P-1", "qty": 2}]}\nprint(order["customer"]["address"]["city"])\nprint(order["items"][0]["qty"])\nprint(order.get("customer", {}).get("phone", "no phone"))\nprint(order.get("coupon", {}).get("code"))', run: 1 },
        { h: B('الطباعة المقروءة', 'Readable printing'),
          p: B('بيانات متداخلة طويلة بتطلع في سطر واحد صعب يتقري. `pprint` من موديول `pprint` بيقسّمها على سطور، و`json.dumps(data, indent=2)` بيطبعها JSON منسّق (أكتر عنه بكرة).', 'Long nested data prints on one hard-to-read line. `pprint` from the `pprint` module spreads it over lines, and `json.dumps(data, indent=2)` prints formatted JSON (more tomorrow).'),
          ex: 'from pprint import pprint\nuser = {"id": 9, "name": "Hany", "roles": ["admin", "sales"], "address": {"city": "Giza", "zip": "12511"}, "active": True}\nprint(user)\npprint(user, width=40)', run: 1 }
      ],
      practice: [
        B('اعمل قايمة 6 منتجات كـ dicts (name, category, price, stock) واطبع اللي مخزونه أقل من 5.', 'Make a list of 6 products as dicts (name, category, price, stock) and print those with stock under 5.'),
        B('احسب قيمة المخزون كله `price * stock` لكل الفئات مجمعة.', 'Compute the stock value `price * stock` grouped by category.'),
        B('اكتب dict متداخل لعميل فيه عنوان وقايمة طلبات، واقرا 4 قيم من جواه منهم واحدة مش موجودة بأمان.', 'Write a nested customer dict with an address and a list of orders, and read 4 values from inside it — one missing, safely.'),
        B('حوّل قايمة tuples من أسبوع 4 لقايمة dicts بـ comprehension.', 'Turn a list of tuples from week 4 into a list of dicts with a comprehension.')
      ],
      code: [
        { u: B('items بشكل n8n', 'n8n-shaped items'), p: 'items = [\n    {"json": {"name": "Sara", "email": "SARA@MAIL.COM "}},\n    {"json": {"name": "Omar", "email": None}},\n]\nout = []\nfor item in items:\n    data = item["json"]\n    email = (data.get("email") or "").strip().lower()\n    out.append({"json": {**data, "email": email, "has_email": bool(email)}})\nprint(out)', run: 1 }
      ],
      words: [
        { t: 'record', m: B('مجموعة حقول عن حاجة واحدة (عميل أو طلب)', 'a group of fields about one thing (a customer or an order)'), ex: '{"id": 1, "total": 1200}' },
        { t: 'nested data', m: B('بيانات جواها بيانات: dicts وقوايم جوه بعض', 'data inside data: dicts and lists inside each other'), ex: 'order["customer"]["address"]["city"]' },
        { t: 'pprint', m: B('طباعة منسّقة للبيانات الطويلة', 'pretty-printing for long data'), ex: 'from pprint import pprint' },
        { t: 'dict unpacking', m: B('**d بيفرد مفاتيح dict جوه dict تاني', '**d spreads a dict’s keys into another dict'), ex: '{**data, "email": email}' },
        { t: 'safe access', m: B('القراءة من غير ما البرنامج يقع لو حاجة ناقصة', 'reading without crashing when something is missing'), ex: 'd.get("a", {}).get("b")' }
      ],
      read: [{ lib: 'Real Python Tutorials', what: B('دوّر على «dictionaries in python» واقرا جزء nested dictionaries.', 'Search for «dictionaries in python» and read the nested dictionaries part.') }, { lib: 'JSONPlaceholder', what: B('افتح /users في المتصفح وشوف شكل قايمة dicts حقيقية.', 'Open /users in the browser and see a real list of dicts.') }],
      challenge: B('خد رد API حقيقي متخزّن كـ نص (افتح jsonplaceholder.typicode.com/users وانسخ أول 3 مستخدمين في الكود)، واطبع لكل مستخدم: الاسم والمدينة واسم الشركة والدومين بتاع إيميله.', 'Take a real API response stored as text (open jsonplaceholder.typicode.com/users and copy the first 3 users into your code) and print each user’s name, city, company name and email domain.'),
      quiz: [
        { q: B('`[{"a": 1}, {"a": 5}][1]["a"]`:', '`[{"a": 1}, {"a": 5}][1]["a"]`:'), o: ['5', '1', 'KeyError'], a: 0, why: B('العنصر التاني، المفتاح a.', 'The second item, key a.') },
        { q: B('أأمن طريقة تقرا `d["user"]["phone"]` لو user ممكن يكون ناقص:', 'The safest way to read `d["user"]["phone"]` when user may be missing:'), o: ['d.get("user", {}).get("phone")', 'd["user"].get("phone")', 'd.user.phone'], a: 0, why: B('get بـ dict فاضي كبديل.', 'get with an empty dict as fallback.') },
        { q: B('`{**{"a": 1}, "a": 2}`:', '`{**{"a": 1}, "a": 2}`:'), o: ['{"a": 2}', '{"a": 1}', '{"a": [1, 2]}'], a: 0, why: B('اللي بعده بيكتب فوق اللي قبله.', 'The later value overrides the earlier.') }
      ] },

    { title: B('الـ set: القيم المميزة', 'Sets: unique values'),
      goal: B('تشيل التكرار بالـ set، وتقارن مجموعات (المشترك والفرق)، وتعرف إن البحث في set سريع جدًا.', 'Remove duplicates with a set, compare groups (common and different), and know that searching a set is very fast.'),
      learn: [
        { h: B('set = من غير تكرار ومن غير ترتيب', 'A set: no duplicates, no order'),
          p: B('`set(["a", "b", "a"])` = `{"a", "b"}`. مفيش فهرسة (مفيش `s[0]`) والترتيب مش مضمون. `add` تضيف، `discard` تشيل من غير خطأ. لو عايز تشيل التكرار وتحافظ على الترتيب: `list(dict.fromkeys(items))`.', '`set(["a", "b", "a"])` is `{"a", "b"}`. There is no indexing (no `s[0]`) and the order is not guaranteed. `add` adds and `discard` removes without an error. To remove duplicates and keep the order: `list(dict.fromkeys(items))`.'),
          ex: 'emails = ["a@x.com", "b@y.com", "a@x.com", "c@z.com", "b@y.com"]\nunique = set(emails)\nprint(len(emails), len(unique))\nprint(list(dict.fromkeys(emails)))   # keeps the order\ntags = {"vip"}\ntags.add("cairo"); tags.add("vip"); tags.discard("nope")\nprint(sorted(tags))', run: 1 },
        { h: B('عمليات المجموعات', 'Set operations'),
          p: B('`a | b` الاتنين مع بعض (union)، `a & b` المشترك (intersection)، `a - b` اللي في a ومش في b (difference)، `a ^ b` اللي في واحدة بس. أسئلة زي «مين اشترك الشهر ده ومكانش الشهر اللي فات؟» بقت سطر.', '`a | b` is both together (union), `a & b` what they share (intersection), `a - b` what is in a but not b (difference), `a ^ b` what is in only one. Questions like «who subscribed this month and not last month?» become one line.'),
          ex: 'last_month = {"sara", "omar", "mona", "hany"}\nthis_month = {"sara", "mona", "laila", "karim"}\nprint("new:", this_month - last_month)\nprint("left:", last_month - this_month)\nprint("stayed:", this_month & last_month)\nprint("all:", len(this_month | last_month))', run: 1 },
        { h: B('البحث السريع وhashable', 'Fast lookups and hashable values'),
          p: B('`x in some_set` سريع جدًا حتى مع مليون عنصر، عكس `x in some_list` اللي بيلف على الكل. عناصر الـ set (ومفاتيح الـ dict) لازم تكون **hashable**: أرقام ونصوص وtuples أه، قوايم ودicts لأ.', '`x in some_set` is very fast even with a million items, unlike `x in some_list`, which scans everything. Set items (and dict keys) must be **hashable**: numbers, strings and tuples yes, lists and dicts no.'),
          ex: 'import time\nbig_list = list(range(2_000_000))\nbig_set = set(big_list)\nt = time.perf_counter(); 1_999_999 in big_list; a = time.perf_counter() - t\nt = time.perf_counter(); 1_999_999 in big_set; b = time.perf_counter() - t\nprint(f"list {a*1000:.2f} ms, set {b*1000:.4f} ms")\nseen = {("Sara", "Cairo")}\nprint(("Sara", "Cairo") in seen)', run: 1 }
      ],
      practice: [
        B('من قايمة 20 مدينة فيها تكرار، اطبع المدن المختلفة مترتبة وعددها.', 'From a list of 20 cities with repeats, print the distinct cities sorted and their count.'),
        B('عندك قايمتين إيميلات (عملاء ومشتركين في النشرة). اطبع العملاء اللي مش مشتركين.', 'You have two email lists (customers and newsletter subscribers). Print the customers who are not subscribed.'),
        B('شيل التكرار من قايمة مع الحفاظ على الترتيب بـ `dict.fromkeys`.', 'Remove duplicates from a list while keeping the order with `dict.fromkeys`.'),
        B('جرّب تحط قايمة جوه set واقرا الخطأ، وبعدين حوّلها tuple.', 'Try putting a list inside a set, read the error, then turn it into a tuple.')
      ],
      code: [
        { u: B('مين لسه ما دفعش؟', 'Who has not paid yet?'), p: 'invoiced = {"INV-1", "INV-2", "INV-3", "INV-4", "INV-5"}\npaid = {"INV-2", "INV-5", "INV-9"}\nprint("unpaid:", sorted(invoiced - paid))\nprint("paid but unknown:", paid - invoiced)', run: 1 }
      ],
      words: [
        { t: 'set', m: B('مجموعة قيم مميزة من غير ترتيب بين {}', 'a collection of unique values with no order, in {}'), ex: '{"a", "b"}' },
        { t: 'union', m: B('كل العناصر اللي في المجموعتين (|)', 'every item in either set (|)'), ex: 'a | b' },
        { t: 'intersection', m: B('العناصر المشتركة بين المجموعتين (&)', 'the items both sets share (&)'), ex: 'a & b' },
        { t: 'difference', m: B('اللي في الأولى ومش في التانية (-)', 'what is in the first but not the second (-)'), ex: 'a - b' },
        { t: 'hashable', m: B('قيمة مبتتغيرش ينفع تبقى مفتاح dict أو عنصر set', 'an unchanging value that can be a dict key or a set item'), ex: 'tuples yes, lists no' },
        { t: 'deduplicate', m: B('شيل التكرار من بيانات', 'remove duplicates from data'), ex: 'list(dict.fromkeys(items))' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 5.4 Sets.', 'Read 5.4 Sets.') }, { lib: 'Built-in Types', what: B('جزء Set Types: الجدول بتاع العمليات.', 'The Set Types part: the table of operations.') }],
      challenge: B('عندك حضور 3 أيام كورس كقوايم أسماء. اطبع: اللي حضروا الـ 3 أيام، واللي حضروا يوم واحد بس، واللي غابوا عن آخر يوم بعد ما حضروا أول يوم.', 'You have 3 days of course attendance as name lists. Print who attended all 3 days, who attended only one day, and who missed the last day after attending the first.'),
      quiz: [
        { q: B('`len({1, 1, 2, 2, 3})`:', '`len({1, 1, 2, 2, 3})`:'), o: ['3', '5', '2'], a: 0, why: B('التكرار بيتشال.', 'Duplicates are removed.') },
        { q: B('`{1, 2, 3} & {2, 3, 4}`:', '`{1, 2, 3} & {2, 3, 4}`:'), o: ['{2, 3}', '{1, 2, 3, 4}', '{1, 4}'], a: 0, why: B('& = المشترك.', '& is the intersection.') },
        { q: B('أنهي واحدة ينفع تبقى عنصر في set؟', 'Which can be a set item?'), o: ['("a", 1)', '["a", 1]', '{"a": 1}'], a: 0, why: B('الـ tuple hashable.', 'A tuple is hashable.') }
      ] },

    { title: B('JSON: لغة تبادل البيانات', 'JSON: the data exchange language'),
      goal: B('تحوّل Python لـ JSON والعكس، وتتعامل مع العربي فيه، وتفهم الفرق بين أنواع JSON وأنواع Python.', 'Convert Python to JSON and back, handle Arabic in it, and understand how JSON types map to Python types.'),
      learn: [
        { h: B('dumps وloads', 'dumps and loads'),
          p: B('JSON نص بيتبعت بين البرامج (APIs وn8n وملفات الإعدادات). `json.dumps(data)` بيحوّل dict/list لنص JSON، و`json.loads(text)` العكس. `indent=2` يخليه مقروء. ركّز: dumps بترجّع **نص**، وloads بترجّع **dict/list**.', 'JSON is text sent between programs (APIs, n8n, config files). `json.dumps(data)` turns a dict/list into JSON text, and `json.loads(text)` does the reverse. `indent=2` makes it readable. Remember: dumps returns **text**, loads returns a **dict/list**.'),
          ex: 'import json\norder = {"id": 7, "items": ["pen", "bag"], "paid": True, "coupon": None}\ntext = json.dumps(order)\nprint(type(text), text)\nback = json.loads(text)\nprint(type(back), back["items"][1])\nprint(json.dumps(order, indent=2))', run: 1 },
        { h: B('الأنواع بين اللغتين', 'Types between the two'),
          p: B('object ↔ dict، array ↔ list، string ↔ str، number ↔ int/float، `true`/`false` ↔ `True`/`False`، `null` ↔ `None`. الـ tuple بيتحول array، والـ set والتواريخ مش بيتحولوا لوحدهم (TypeError) — حوّلها list أو نص الأول.', 'object ↔ dict, array ↔ list, string ↔ str, number ↔ int/float, `true`/`false` ↔ `True`/`False`, `null` ↔ `None`. A tuple becomes an array, while sets and dates do not convert by themselves (TypeError) — turn them into a list or text first.'),
          ex: 'import json\nprint(json.loads(\'{"ok": true, "n": null, "list": [1, 2.5]}\'))\nprint(json.dumps({"point": (30, 31)}))\ntry:\n    json.dumps({"tags": {"a", "b"}})\nexcept TypeError as e:\n    print("TypeError:", e)\nprint(json.dumps({"tags": sorted({"b", "a"})}))', run: 1 },
        { h: B('العربي وأخطاء JSON', 'Arabic and JSON errors'),
          p: B('افتراضيًا العربي بيتكتب كأكواد `\\u0633`. `ensure_ascii=False` بيكتبه حروف عادية. ولو النص مش JSON سليم (فاصلة زيادة، علامات تنصيص مفردة)، `loads` بتطلّع `json.JSONDecodeError` ومعاها رقم السطر والعمود.', 'By default Arabic is written as codes like `\\u0633`. `ensure_ascii=False` writes the actual letters. If the text is not valid JSON (a trailing comma, single quotes), `loads` raises `json.JSONDecodeError` with the line and column.'),
          ex: 'import json\ncity = {"city": "القاهرة"}\nprint(json.dumps(city))\nprint(json.dumps(city, ensure_ascii=False))\ntry:\n    json.loads("{\'name\': \'Ali\',}")\nexcept json.JSONDecodeError as e:\n    print("bad JSON:", e)', run: 1 }
      ],
      practice: [
        B('حوّل قايمة منتجات (dicts) لـ JSON منسّق بـ indent=2 واطبعه.', 'Turn a list of product dicts into JSON formatted with indent=2 and print it.'),
        B('خد نص JSON لمستخدم من JSONPlaceholder (انسخه من المتصفح) وطلّع منه 4 قيم بـ loads.', 'Take a user’s JSON text from JSONPlaceholder (copy it from the browser) and read 4 values from it with loads.'),
        B('اعمل JSON فيه أسماء عربي واطبعه مرة عادي ومرة بـ `ensure_ascii=False`.', 'Make JSON with Arabic names and print it once normally and once with `ensure_ascii=False`.'),
        B('صلّح 3 نصوص JSON غلط واتأكد إن loads بتقبلهم.', 'Fix 3 broken JSON texts and confirm that loads accepts them.')
      ],
      code: [
        { u: B('JSON رايح جاي', 'JSON round trip'), p: 'import json\npayload = \'{"event": "order.created", "data": {"id": 991, "total": "1250.50", "customer": {"email": "Mona@Shop.com"}}}\'\nevent = json.loads(payload)\ndata = event["data"]\nsummary = {"id": data["id"], "total": float(data["total"]), "email": data["customer"]["email"].lower()}\nprint(json.dumps(summary, indent=2))', run: 1 }
      ],
      words: [
        { t: 'JSON', m: B('شكل نصي لتبادل البيانات بين البرامج', 'a text format for exchanging data between programs'), ex: '{"id": 7, "paid": true}' },
        { t: 'serialize', m: B('تحويل بيانات البرنامج لنص تقدر تبعته أو تحفظه', 'turning program data into text you can send or save'), ex: 'json.dumps(order)' },
        { t: 'deserialize', m: B('تحويل نص (زي JSON) لبيانات في البرنامج', 'turning text (such as JSON) back into program data'), ex: 'json.loads(text)' },
        { t: 'json.dumps()', m: B('بتحوّل dict/list لنص JSON', 'turns a dict/list into JSON text'), ex: 'json.dumps(d, indent=2)' },
        { t: 'json.loads()', m: B('بتحوّل نص JSON لـ dict/list', 'turns JSON text into a dict/list'), ex: 'json.loads(body)' },
        { t: 'ensure_ascii', m: B('خيار لو False بيكتب العربي حروف مش أكواد', 'an option that, when False, writes Arabic as letters, not codes'), ex: 'json.dumps(d, ensure_ascii=False)' },
        { t: 'JSONDecodeError', m: B('خطأ لما النص مش JSON سليم', 'an error when the text is not valid JSON'), ex: "json.loads(\"{'a': 1}\")" }
      ],
      read: ['lib:json', { lib: 'Automate the Boring Stuff with Python', what: B('الفصل الخاص بـ CSV وJSON (جزء JSON).', 'The chapter on CSV and JSON (the JSON part).') }],
      challenge: B('اكتب «محوّل webhook»: نص JSON فيه طلب من متجر (عميل وعنوان ومنتجات بأسعار كنصوص). طلّع منه JSON جديد نضيف: الأرقام أرقام، الإيميل صغير، الإجمالي محسوب، وعدد القطع — وده بالظبط اللي هتعمله في Code node في n8n.', 'Write a «webhook converter»: a JSON text with a shop order (customer, address, products with prices as text). Produce clean new JSON: numbers as numbers, the email lowercased, the total computed and the piece count — exactly what you would do in an n8n Code node.'),
      quiz: [
        { q: B('`json.dumps({"a": True})` بيطلع:', '`json.dumps({"a": True})` produces:'), o: ['\'{"a": true}\'', '\'{"a": True}\'', '{"a": True}'], a: 0, why: B('نص، وTrue بقت true.', 'Text, with True written as true.') },
        { q: B('null في JSON بيبقى في Python:', 'JSON null becomes in Python:'), o: ['None', '0', '"null"'], a: 0, why: B('null ↔ None.', 'null ↔ None.') },
        { q: B('`json.loads` بترجّع:', '`json.loads` returns:'), o: [B('dict أو list (أو قيمة بسيطة)', 'a dict or list (or a simple value)'), B('نص', 'a string'), B('ملف', 'a file')], a: 0, why: B('بتحوّل النص لبيانات.', 'It turns text into data.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تحلّل بيانات طلبات حقيقية الشكل بكل أدوات الأسبوع، وتعدّي الاختبار.', 'Analyse realistic order data with every tool of the week and pass the test.'),
      review: [
        B('الـ dict: الأقواس مقابل get، وitems، وupdate، وdel.', 'Dicts: brackets versus get, items, update and del.'),
        B('العد والتجميع: get(x, 0) + 1 وCounter وdefaultdict والترتيب بالقيمة.', 'Counting and grouping: get(x, 0) + 1, Counter, defaultdict and sorting by value.'),
        B('قوايم الـ dicts والقراءة الآمنة من البيانات المتداخلة.', 'Lists of dicts and safe reads from nested data.'),
        B('الـ set: شيل التكرار، و| و& و-، والـ hashable.', 'Sets: removing duplicates, | & and -, and hashable values.'),
        B('JSON: dumps وloads وindent وensure_ascii والأنواع.', 'JSON: dumps, loads, indent, ensure_ascii and types.')
      ],
      project: B('**تقرير طلبات المتجر** (`orders_report.py`): في أول الملف نص JSON فيه 15 طلب (id، customer: {name, email, city}، items: [{sku, name, price, qty}]، status). السكربت يطبع: إجمالي المبيعات المدفوعة، وأفضل 3 عملاء بالمبلغ، وأكتر 3 منتجات بالقطع، والمدن المختلفة، وعدد الطلبات لكل status، والعملاء اللي عندهم طلب ملغي ومفيش ولا طلب مدفوع. وفي الآخر يطبع كل ده كـ JSON منسّق بـ `ensure_ascii=False` (هنحفظه في ملف أسبوع 9 ونبعته لـ n8n أسبوع 13).', '**The shop order report** (`orders_report.py`): at the top of the file is a JSON text with 15 orders (id, customer: {name, email, city}, items: [{sku, name, price, qty}], status). The script prints the total paid sales, the top 3 customers by amount, the top 3 products by pieces, the distinct cities, the number of orders per status, and the customers with a cancelled order and no paid one. Finally it prints all of this as formatted JSON with `ensure_ascii=False` (we save it to a file in week 9 and send it to n8n in week 13).'),
      test: [
        { q: B('`d = {"a": 1}; d["b"]` بيطلّع:', '`d = {"a": 1}; d["b"]` raises:'), o: ['KeyError', 'IndexError', 'None'], a: 0, why: B('مفتاح مش موجود.', 'A missing key.') },
        { q: B('`len({"a": 1, "b": 2})`:', '`len({"a": 1, "b": 2})`:'), o: ['2', '4', '1'], a: 0, why: B('عدد المفاتيح.', 'The number of keys.') },
        { q: B('`list({"x": 1, "y": 2})`:', '`list({"x": 1, "y": 2})`:'), o: ['["x", "y"]', '[1, 2]', '[("x", 1), ("y", 2)]'], a: 0, why: B('الـ dict لما تلف عليه بيدي المفاتيح.', 'Iterating a dict gives its keys.') },
        { q: B('`Counter(["a", "b", "a"]).most_common(1)`:', '`Counter(["a", "b", "a"]).most_common(1)`:'), o: ['[("a", 2)]', '["a"]', '{"a": 2}'], a: 0, why: B('قايمة أزواج (قيمة، عدد).', 'A list of (value, count) pairs.') },
        { q: B('`{1, 2} | {2, 3}`:', '`{1, 2} | {2, 3}`:'), o: ['{1, 2, 3}', '{2}', '{1, 3}'], a: 0, why: B('union.', 'The union.') },
        { q: B('`{1, 2, 3} - {3}`:', '`{1, 2, 3} - {3}`:'), o: ['{1, 2}', '{3}', '{1, 2, 3}'], a: 0, why: B('الفرق.', 'The difference.') },
        { q: B('`json.loads("[1, 2]")[1]`:', '`json.loads("[1, 2]")[1]`:'), o: ['2', '"2"', '1'], a: 0, why: B('بقت list أرقام.', 'It became a list of numbers.') },
        { q: B('عشان العربي يتكتب حروف في JSON:', 'To write Arabic as letters in JSON:'), o: ['ensure_ascii=False', 'indent=2', 'sort_keys=True'], a: 0, why: B('ensure_ascii=False.', 'ensure_ascii=False.') },
        { q: B('أنسب شكل لبيانات «طلبات كل عميل»:', 'The best shape for «each customer’s orders»:'), o: [B('dict: عميل → قايمة طلبات', 'a dict: customer → list of orders'), B('set', 'a set'), B('نص طويل', 'one long string')], a: 0, why: B('تجميع = dict قيمته قايمة.', 'Grouping = a dict of lists.') },
        { q: B('`{"a": 1, "a": 2}`:', '`{"a": 1, "a": 2}`:'), o: ['{"a": 2}', '{"a": 1}', 'SyntaxError'], a: 0, why: B('المفتاح بيتكرر مرة واحدة وآخر قيمة بتكسب.', 'A key exists once and the last value wins.') },
        { q: B('`json.dumps({"s": {1, 2}})` بيطلّع:', '`json.dumps({"s": {1, 2}})` raises:'), o: ['TypeError', 'ValueError', B('مفيش خطأ', 'nothing')], a: 0, why: B('الـ set مش نوع JSON.', 'A set is not a JSON type.') },
        { q: B('`d.get("k", [])` لو k مش موجود:', '`d.get("k", [])` when k is missing:'), o: ['[]', 'None', 'KeyError'], a: 0, why: B('القيمة البديلة.', 'The fallback.') }
      ] }
  ]
};
