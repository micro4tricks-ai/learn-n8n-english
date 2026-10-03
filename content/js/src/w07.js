// JavaScript week 7 — array methods: map, filter and reduce.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('دوال المصفوفات: map وfilter وreduce', 'Array methods: map, filter and reduce'),
  goal: B('تحوّل وتفلتر وتلخّص البيانات بـ map وfilter وreduce وfind وsome وevery وflatMap، وتربطهم في سلاسل مقرية، وتعرف إمتى تستخدم Set وMap — نفس الكود اللي هتكتبه في Code node كل يوم.',
          'Transform, filter and summarise data with map, filter, reduce, find, some, every and flatMap, chain them into readable pipelines, and know when to use Set and Map — the code you will write in a Code node every day.'),
  days: [
    { title: B('map: حوّل كل عنصر', 'map: transform every item'),
      goal: B('تعمل مصفوفة جديدة من مصفوفة بتحويل كل عنصر، من غير ما تغيّر الأصل.', 'Make a new array from an array by transforming each item, without changing the original.'),
      learn: [
        { h: B('map بدل لوب + push', 'map instead of a loop + push'),
          p: B('`arr.map(fn)` بينادي fn على كل عنصر ويحط الناتج في **مصفوفة جديدة بنفس الطول**. بدل: `const out = []; for (const x of arr) out.push(x * 2);` تكتب `const out = arr.map(x => x * 2);`. الأصل مبيتغيرش. الـ callback بياخد `(item, index, array)` — غالبًا محتاج item بس.',
            '`arr.map(fn)` calls fn on every item and puts each result in a **new array of the same length**. Instead of `const out = []; for (const x of arr) out.push(x * 2);` you write `const out = arr.map(x => x * 2);`. The original stays as it is. The callback receives `(item, index, array)` — usually you only need item.'),
          ex: 'const prices = [100, 250, 40];\nconst withVat = prices.map(p => Math.round(p * 1.14 * 100) / 100);\nconsole.log(prices, withVat);\nconst numbered = ["Sara", "Omar"].map((name, i) => `${i + 1}. ${name}`);\nconsole.log(numbered);', run: 'js' },
        { h: B('map على كائنات', 'map over objects'),
          p: B('أكتر استخدام: تحويل كل كائن لشكل جديد: تضيف حقل محسوب، أو تختار حقول، أو تغيّر أسماء. استخدم الـ spread عشان تعمل كائن **جديد** بدل ما تعدّل القديم: `orders.map(o => ({ ...o, total: o.qty * o.price }))`. متكتبش `o.total = ...` جوه map — ده بيغيّر الأصل.',
            'The most common use: turning each object into a new shape: add a computed field, pick fields, or rename. Use spread to build a **new** object instead of editing the old one: `orders.map(o => ({ ...o, total: o.qty * o.price }))`. Do not write `o.total = ...` inside map — that changes the original.'),
          ex: 'const orders = [{ id: 1, qty: 2, price: 45 }, { id: 2, qty: 1, price: 650 }];\nconst withTotal = orders.map(o => ({ ...o, total: o.qty * o.price }));\nconst ids = orders.map(o => o.id);\nconst forSheet = orders.map(({ id, qty }) => ({ "Order ID": id, Quantity: qty }));\nconsole.log(withTotal, ids, forSheet);\nconsole.log("original:", orders[0]);', run: 'js' },
        { h: B('map في Code node', 'map in a Code node'),
          p: B('في n8n كل item شكله `{ json: {...} }`، والـ Code node لازم يرجّع مصفوفة بنفس الشكل. `return $input.all().map(item => ({ json: { ...item.json, email: item.json.email.toLowerCase() } }));` — سطر واحد بيعدّل كل الـ items. ده أكتر سطر هتكتبه في n8n.',
            'In n8n every item looks like `{ json: {...} }`, and the Code node must return an array of the same shape. `return $input.all().map(item => ({ json: { ...item.json, email: item.json.email.toLowerCase() } }));` — one line edits every item. It is the line you will write most in n8n.'),
          ex: 'const $input = { all: () => [{ json: { name: "sara", email: "SARA@X.COM" } }, { json: { name: "omar", email: "Omar@X.com" } }] };\nconst result = $input.all().map(item => ({\n  json: { ...item.json, email: item.json.email.toLowerCase(), name: item.json.name[0].toUpperCase() + item.json.name.slice(1) }\n}));\nconsole.log(JSON.stringify(result, null, 2));', run: 'js' },
        { h: B('map مش لكل حاجة', 'map is not for everything'),
          p: B('map للـ**تحويل**: مدخل → مخرج لكل عنصر. لو مش محتاج المصفوفة الجديدة (بتطبع بس، أو بتبعت طلبات)، استخدم `for...of` أو `forEach`. ولو عايز تشيل عناصر، ده `filter` مش map (map دايمًا نفس الطول — العنصر اللي ترجّع له undefined بيفضل undefined).',
            'map is for **transforming**: input → output for every item. If you do not need the new array (you only print or send requests), use `for...of` or `forEach`. And if you want to drop items, that is `filter`, not map (map always keeps the length — an item for which you return undefined stays undefined).'),
          ex: 'const nums = [1, 2, 3, 4];\nconsole.log(nums.map(n => (n % 2 === 0 ? n : undefined)));   // still 4 items!\nconsole.log(nums.filter(n => n % 2 === 0));\nnums.forEach(n => { if (n > 2) console.log("big", n); });', run: 'js' },
        { h: B('Array.from وkeys/entries مع map', 'Array.from and keys/entries with map'),
          p: B('`Array.from({ length: 12 }, (_, i) => i + 1)` بيعمل [1..12] (شهور السنة). `Array.from(nodeList)` بيحوّل عناصر الصفحة لمصفوفة حقيقية. ومع كائنات: `Object.entries(byCity).map(([city, total]) => ...)` تحوّل كائن تجميع لصفوف تقرير.',
            '`Array.from({ length: 12 }, (_, i) => i + 1)` makes [1..12] (the months of the year). `Array.from(nodeList)` turns page elements into a real array. And with objects: `Object.entries(byCity).map(([city, total]) => ...)` turns a grouping object into report rows.'),
          ex: 'const months = Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2026, i, 1)).toLocaleString("en", { month: "short", timeZone: "UTC" }));\nconsole.log(months.join(" "));\nconst byCity = { Cairo: 1450, Giza: 400, Alex: 2500 };\nconst rows = Object.entries(byCity).map(([city, total]) => `${city.padEnd(6)} ${String(total).padStart(6)}`);\nconsole.log(rows.join("\\n"));', run: 'js' }
      ],
      practice: [
        B('حوّل 6 أسعار لأسعار بالضريبة بـ map.', 'Turn 6 prices into prices with VAT using map.'),
        B('ضيف حقل `total` و`vip` لكل طلب بـ map والـ spread.', 'Add `total` and `vip` fields to each order with map and spread.'),
        B('حوّل مصفوفة كائنات لأسماء أعمدة شيت عربي بـ map.', 'Map an array of objects to Arabic sheet column names.'),
        B('اكتب سطر Code node بيعمل lowercase للإيميلات في كل الـ items.', 'Write a Code node line that lower-cases the emails of every item.'),
        B('أثبت إن map بيحتفظ بالطول حتى لو رجّعت undefined.', 'Show that map keeps the length even when you return undefined.'),
        B('اعمل مصفوفة أيام الشهر من 1 لـ 30 بـ Array.from.', 'Make an array of the month’s days 1 to 30 with Array.from.')
      ],
      code: [
        { u: B('اختار حقول بس', 'Pick only some fields'), p: 'const pick = (obj, keys) => Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));\nconst rows = [{ id: 1, name: "Sara", password: "x", city: "Cairo" }];\nconsole.log(rows.map(r => pick(r, ["id", "name", "city"])));' }
      ],
      words: [
        { t: 'map', m: B('يحوّل كل عنصر ويرجّع مصفوفة جديدة بنفس الطول', 'transforms each item into a new array of the same length'), ex: 'arr.map(x => x * 2)' },
        { t: 'transform', m: B('تحويل قيمة لشكل تاني', 'turning a value into another shape'), ex: 'transform each order' },
        { t: 'forEach', m: B('يلف على كل عنصر من غير ما يرجّع حاجة', 'loops over each item without returning anything'), ex: 'arr.forEach(x => …)' },
        { t: 'immutable update', m: B('تعديل بعمل نسخة جديدة بدل تغيير الأصل', 'updating by making a new copy instead of changing the original'), ex: '({ ...o, total })' },
        { t: 'Array.from', m: B('يعمل مصفوفة من أي حاجة شبهها أو من طول', 'makes an array from anything array-like, or from a length'), ex: 'Array.from({ length: 5 })' },
        { t: 'item', m: B('عنصر واحد في n8n: كائن فيه json', 'one n8n element: an object holding json'), ex: '{ json: { … } }' },
        { t: 'computed field', m: B('حقل بيتحسب من حقول تانية', 'a field calculated from other fields'), ex: 'total = qty * price' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Array methods: Transform an array: map.', 'Array methods: Transform an array: map.') },
        { lib: 'MDN: Array', what: B('Array.prototype.map() وArray.from().', 'Array.prototype.map() and Array.from().') }],
      challenge: B('اكتب Code node (كدالة تجربها هنا) بياخد items طلبات فيها `lines` ويرجّع items جديدة: لكل طلب الإجمالي والضريبة وعدد القطع وأسماء المنتجات في نص واحد، ومن غير ما يغيّر الـ items الأصلية — وأثبت إن الأصل متغيرش.', 'Write a Code node (as a function you test here) taking order items with `lines` and returning new items: for each order the total, VAT, number of units and the product names in one string, without changing the original items — and prove the originals are unchanged.'),
      quiz: [
        { q: B('`[1, 2, 3].map(x => x * 10)`:', '`[1, 2, 3].map(x => x * 10)`:'), o: ['[10, 20, 30]', '60', '[1, 2, 3]'], a: 0, why: B('كل عنصر × 10.', 'Each item × 10.') },
        { q: B('طول ناتج map دايمًا:', 'The length of map’s result is always:'), o: [B('نفس طول الأصل', 'the same as the original'), B('أقل', 'smaller'), B('حسب الشرط', 'depends on a condition')], a: 0, why: B('لشيل عناصر استخدم filter.', 'Use filter to drop items.') },
        { q: B('تضيف حقل من غير ما تغيّر الأصل:', 'Adding a field without changing the original:'), o: ['o => ({ ...o, total })', 'o => { o.total = 1; return o; }', 'o => o.total'], a: 0, why: B('كائن جديد.', 'A new object.') },
        { q: B('Code node لازم يرجّع:', 'A Code node must return:'), o: [B('مصفوفة items فيها json', 'an array of items holding json'), B('نص', 'a string'), B('رقم', 'a number')], a: 0, why: B('نفس شكل n8n.', 'The n8n shape.') }
      ] },

    { title: B('filter وfind وsome وevery', 'filter, find, some and every'),
      goal: B('تختار العناصر اللي تحقق شرط، وتلاقي أول واحد، وتسأل «فيه؟» و«كلهم؟».', 'Pick the items that pass a test, find the first one, and ask «is there any?» and «are they all?».'),
      learn: [
        { h: B('filter: سيب اللي يحقق الشرط', 'filter: keep what passes the test'),
          p: B('`arr.filter(fn)` بيرجّع مصفوفة جديدة فيها العناصر اللي `fn` رجّعت لها truthy بس. `orders.filter(o => o.paid)` المدفوع، و`filter(o => o.total >= 1000)` الكبير. الطول ممكن يقل لحد صفر. ومع Boolean: `arr.filter(Boolean)` بيشيل كل القيم الفاضية (null و"" و0 وundefined) في سطر.',
            '`arr.filter(fn)` returns a new array holding only the items for which `fn` returned something truthy. `orders.filter(o => o.paid)` gives the paid ones, `filter(o => o.total >= 1000)` the big ones. The length can drop to zero. With Boolean: `arr.filter(Boolean)` removes every empty value (null, "", 0, undefined) in one line.'),
          ex: 'const orders = [\n  { id: 1, total: 300, paid: true }, { id: 2, total: 1800, paid: false },\n  { id: 3, total: 1200, paid: true }, { id: 4, total: 50, paid: true }\n];\nconsole.log(orders.filter(o => o.paid).map(o => o.id));\nconsole.log(orders.filter(o => o.paid && o.total >= 1000).map(o => o.id));\nconsole.log(["a", "", null, "b", undefined, 0].filter(Boolean));', run: 'js' },
        { h: B('find وfindLast وfindIndex', 'find, findLast and findIndex'),
          p: B('`find(fn)` بيرجّع **أول** عنصر يحقق الشرط (أو undefined) وبيقف بدري — أسرع من filter لما محتاج واحد. `findLast` آخر واحد (مثلًا آخر دفعة). `findIndex` مكانه أو -1. افتكر تتعامل مع undefined: `orders.find(o => o.id === 9)?.total ?? 0`.',
            '`find(fn)` returns the **first** item that passes (or undefined) and stops early — faster than filter when you need one. `findLast` gives the last one (say, the latest payment). `findIndex` gives its position or -1. Remember to handle undefined: `orders.find(o => o.id === 9)?.total ?? 0`.'),
          ex: 'const payments = [\n  { id: "p1", customer: "Sara", amount: 300, at: "2026-09-01" },\n  { id: "p2", customer: "Omar", amount: 900, at: "2026-09-12" },\n  { id: "p3", customer: "Sara", amount: 450, at: "2026-09-20" }\n];\nconsole.log(payments.find(p => p.customer === "Sara").id);\nconsole.log(payments.findLast(p => p.customer === "Sara").id);\nconsole.log(payments.findIndex(p => p.amount > 500), payments.find(p => p.customer === "Mona")?.amount ?? 0);', run: 'js' },
        { h: B('some وevery: أسئلة نعم/لا', 'some and every: yes/no questions'),
          p: B('`some(fn)` true لو **عنصر واحد على الأقل** يحقق (زي any في بايثون)، و`every(fn)` true لو **كلهم** (زي all). بيقفوا بدري. مفيدين في التحقق: «فيه سطر كميته صفر؟» `lines.some(l => l.qty <= 0)`، «كل الإيميلات سليمة؟» `rows.every(r => isValidEmail(r.email))`. خلي بالك: `[].every(...)` بيرجّع true.',
            '`some(fn)` is true when **at least one** item passes (like Python’s any), and `every(fn)` when **all** do (like all). They stop early. Handy for checks: «is any line’s quantity zero?» `lines.some(l => l.qty <= 0)`, «are all emails valid?» `rows.every(r => isValidEmail(r.email))`. Careful: `[].every(...)` returns true.'),
          ex: 'const lines = [{ sku: "A", qty: 2 }, { sku: "B", qty: 0 }, { sku: "C", qty: 5 }];\nconsole.log("any empty?", lines.some(l => l.qty <= 0));\nconsole.log("all in stock?", lines.every(l => l.qty > 0));\nconsole.log("empty list every:", [].every(x => x > 100), "some:", [].some(x => x > 100));', run: 'js' },
        { h: B('filter بشروط من برّه', 'filter with conditions from outside'),
          p: B('الفلتر الحقيقي بيجي من المستخدم أو الإعدادات: مدينة، وحد أدنى، وحالة. اعمل دالة `matches(order, criteria)` بتطبّق كل شرط **لو موجود بس** (لو المستخدم مختارش مدينة متفلترش بيها)، وبعدين `orders.filter(o => matches(o, criteria))`. ده بالظبط اللي بيعمله فلتر في شيت أو بحث في صفحة.',
            'Real filters come from the user or the settings: a city, a minimum and a status. Write `matches(order, criteria)` applying each condition **only if it is set** (if the user picked no city, do not filter by city), then `orders.filter(o => matches(o, criteria))`. Exactly what a sheet filter or a page search does.'),
          ex: 'function matches(o, { city, min, status, q } = {}) {\n  if (city && o.city !== city) return false;\n  if (min != null && o.total < min) return false;\n  if (status && o.status !== status) return false;\n  if (q && !o.customer.toLowerCase().includes(q.toLowerCase())) return false;\n  return true;\n}\nconst orders = [\n  { id: 1, city: "Cairo", total: 300, status: "paid", customer: "Sara" },\n  { id: 2, city: "Giza", total: 1800, status: "new", customer: "Omar" },\n  { id: 3, city: "Cairo", total: 1200, status: "paid", customer: "Samar" }\n];\nconsole.log(orders.filter(o => matches(o, { city: "Cairo" })).map(o => o.id));\nconsole.log(orders.filter(o => matches(o, { min: 1000, q: "sa" })).map(o => o.id));\nconsole.log(orders.filter(o => matches(o)).length);', run: 'js' },
        { h: B('includes وSet للبحث في قايمة', 'includes and Set for searching a list'),
          p: B('«الطلبات اللي عملاؤها في قايمة الـ VIP»: `orders.filter(o => vipEmails.includes(o.email))`. لو القايمتين كبار (آلاف)، includes بيبقى بطيء (كل مرة بيلف على القايمة كلها). حوّل القايمة لـ **Set** مرة واحدة: `const vip = new Set(vipEmails);` و`vip.has(email)` فوري. ده فرق ثواني ودقايق في الأتمتة.',
            '«The orders whose customers are on the VIP list»: `orders.filter(o => vipEmails.includes(o.email))`. When both lists are big (thousands), includes gets slow (it scans the whole list each time). Turn the list into a **Set** once: `const vip = new Set(vipEmails);` and `vip.has(email)` is instant. That is the difference between seconds and minutes in automation.'),
          ex: 'const vipEmails = ["sara@x.com", "mona@x.com"];\nconst vip = new Set(vipEmails);\nconst orders = [{ email: "sara@x.com" }, { email: "omar@x.com" }, { email: "mona@x.com" }];\nconsole.log(orders.filter(o => vip.has(o.email)).length);\nconst unsubscribed = new Set(["omar@x.com"]);\nconsole.log(orders.filter(o => !unsubscribed.has(o.email)).map(o => o.email));', run: 'js' }
      ],
      practice: [
        B('فلتر الطلبات المدفوعة والكبيرة والمدينة، كل واحد لوحده وبعدين مع بعض.', 'Filter paid, big and by-city orders, each alone, then together.'),
        B('شيل القيم الفاضية من مصفوفة بـ filter(Boolean) وافهم ليه الـ 0 اتشال.', 'Drop the empty values from an array with filter(Boolean) and see why 0 went too.'),
        B('لاقي أول وآخر دفعة لعميل بـ find وfindLast.', 'Find a customer’s first and last payment with find and findLast.'),
        B('اكتب 3 أسئلة some و3 every على سطور طلب.', 'Write 3 some and 3 every questions on an order’s lines.'),
        B('اكتب `matches(order, criteria)` بـ 4 شروط اختيارية.', 'Write `matches(order, criteria)` with 4 optional conditions.'),
        B('فلتر قايمة 10 عملاء ضد قايمة إلغاء اشتراك بـ Set.', 'Filter a list of 10 customers against an unsubscribe list with a Set.')
      ],
      code: [
        { u: B('فلترة الـ items في Code node', 'Filtering items in a Code node'), p: '// n8n Code node: keep only paid orders with an email\nreturn $input.all().filter(item => item.json.paid && item.json.email);', show: 1, lang: 'js' }
      ],
      words: [
        { t: 'filter', m: B('يسيب العناصر اللي بتحقق شرط في مصفوفة جديدة', 'keeps the items that pass a test in a new array'), ex: 'orders.filter(o => o.paid)' },
        { t: 'predicate', m: B('دالة بترجّع true أو false لعنصر', 'a function returning true or false for an item'), ex: 'o => o.total > 1000' },
        { t: 'find', m: B('يرجّع أول عنصر يحقق الشرط', 'returns the first item that passes'), ex: 'list.find(x => x.id === 7)' },
        { t: 'some', m: B('هل فيه عنصر واحد على الأقل يحقق الشرط؟', 'does at least one item pass?'), ex: 'lines.some(l => l.qty === 0)' },
        { t: 'every', m: B('هل كل العناصر بتحقق الشرط؟', 'do all items pass?'), ex: 'rows.every(isValid)' },
        { t: 'criteria', m: B('شروط الفلترة', 'the filter conditions'), ex: '{ city, min, status }' },
        { t: 'Set', m: B('مجموعة قيم فريدة بسؤال has سريع', 'a set of unique values with a fast has'), ex: 'new Set(emails).has(e)' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Array methods: Searching in array (find, filter).', 'Array methods: Searching in array (find, filter).') },
        { lib: 'MDN: Array', what: B('filter وfind وfindLast وsome وevery.', 'filter, find, findLast, some and every.') }],
      challenge: B('اعمل صفحة بحث للطلبات: خانة بحث بالاسم، وقايمة مدن، وحد أدنى للمبلغ، وcheckbox «المدفوع بس»، وكل تغيير يعيد رسم الجدول من مصفوفة 20 طلب بـ filter وmatches — مع عدد النتايج وإجماليها.', 'Build an orders search page: a name search box, a city list, a minimum amount and a «paid only» checkbox, with every change redrawing the table from an array of 20 orders using filter and matches — plus the result count and total.'),
      quiz: [
        { q: B('`[5, 15, 25].filter(x => x > 10)`:', '`[5, 15, 25].filter(x => x > 10)`:'), o: ['[15, 25]', 'true', '[5]'], a: 0, why: B('اللي فوق 10.', 'Those above 10.') },
        { q: B('`[1, 2].find(x => x > 5)`:', '`[1, 2].find(x => x > 5)`:'), o: ['undefined', '[]', '-1'], a: 0, why: B('مفيش عنصر.', 'No item.') },
        { q: B('`[].every(x => false)`:', '`[].every(x => false)`:'), o: ['true', 'false', 'undefined'], a: 0, why: B('مفيش عنصر يكسر الشرط.', 'No item breaks the rule.') },
        { q: B('للبحث في قايمة كبيرة جدًا مرات كتير:', 'For searching a very big list many times:'), o: ['new Set(list).has(x)', 'list.includes(x)', 'list.indexOf(x)'], a: 0, why: B('has فوري.', 'has is instant.') }
      ] },

    { title: B('reduce: لخّص لقيمة واحدة', 'reduce: summarise to one value'),
      goal: B('تستخدم reduce للمجموع والعدّ والتجميع وبناء كائنات، وتعرف إمتى لوب عادي أوضح.', 'Use reduce for sums, counts, grouping and building objects, and know when a plain loop is clearer.'),
      learn: [
        { h: B('reduce خطوة بخطوة', 'reduce step by step'),
          p: B('`arr.reduce((acc, x) => newAcc, start)`: بيبدأ بـ `start`، ولكل عنصر بينادي الدالة بالـ **accumulator** الحالي والعنصر، والقيمة اللي ترجّعها بتبقى الـ acc الجديد. في الآخر بيرجّع آخر acc. المجموع: `reduce((sum, x) => sum + x, 0)`. **حط قيمة البداية دايمًا** — من غيرها مصفوفة فاضية بترمي خطأ.',
            '`arr.reduce((acc, x) => newAcc, start)`: it starts with `start`, calls the function for each item with the current **accumulator** and the item, and whatever you return becomes the new acc. At the end it returns the last acc. A sum: `reduce((sum, x) => sum + x, 0)`. **Always give a start value** — without one an empty array throws an error.'),
          ex: 'const totals = [300, 1250, 90];\nconst sum = totals.reduce((acc, x) => {\n  console.log("acc", acc, "+ x", x);\n  return acc + x;\n}, 0);\nconsole.log("sum", sum);\nconsole.log([].reduce((a, b) => a + b, 0));\ntry { [].reduce((a, b) => a + b); } catch (err) { console.log("no start value:", err.message); }', run: 'js' },
        { h: B('المجموع والأكبر والعدّ', 'Sum, maximum and counting'),
          p: B('مجموع حقل: `orders.reduce((s, o) => s + o.total, 0)`. الأكبر: `reduce((best, o) => o.total > best.total ? o : best)` (هنا البداية أول عنصر — ومع مصفوفة ممكن تبقى فاضية افحص الأول). العدّ بشرط: `reduce((n, o) => n + (o.paid ? 1 : 0), 0)` — بس `filter(...).length` أوضح.',
            'Summing a field: `orders.reduce((s, o) => s + o.total, 0)`. The largest: `reduce((best, o) => o.total > best.total ? o : best)` (here the start is the first item — and when the array may be empty, check first). Counting with a condition: `reduce((n, o) => n + (o.paid ? 1 : 0), 0)` — although `filter(...).length` is clearer.'),
          ex: 'const orders = [{ id: 1, total: 300, paid: true }, { id: 2, total: 1800, paid: false }, { id: 3, total: 1200, paid: true }];\nconst revenue = orders.reduce((s, o) => s + o.total, 0);\nconst biggest = orders.reduce((best, o) => (o.total > best.total ? o : best));\nconst paidCount = orders.reduce((n, o) => n + (o.paid ? 1 : 0), 0);\nconsole.log(revenue, biggest.id, paidCount, orders.filter(o => o.paid).length);', run: 'js' },
        { h: B('reduce لبناء كائن', 'reduce to build an object'),
          p: B('أقوى استخدام: بناء كائن تجميع: `reduce((acc, o) => { acc[o.city] = (acc[o.city] ?? 0) + o.total; return acc; }, {})`. **متنساش `return acc`** — أكتر غلطة. وبيبني كائن lookup بالـ id: `reduce((acc, c) => ({ ...acc, [c.id]: c }), {})` — للقوايم الكبيرة الأحسن تعدّل acc مباشرة بدل الـ spread كل لفة.',
            'The strongest use: building a grouping object: `reduce((acc, o) => { acc[o.city] = (acc[o.city] ?? 0) + o.total; return acc; }, {})`. **Do not forget `return acc`** — the most common mistake. It also builds an id lookup: `reduce((acc, c) => ({ ...acc, [c.id]: c }), {})` — for big lists, change acc directly instead of spreading every round.'),
          ex: 'const sales = [{ city: "Cairo", total: 300 }, { city: "Giza", total: 400 }, { city: "Cairo", total: 900 }];\nconst byCity = sales.reduce((acc, s) => {\n  acc[s.city] = (acc[s.city] ?? 0) + s.total;\n  return acc;\n}, {});\nconsole.log(byCity);\nconst customers = [{ id: "c1", name: "Sara" }, { id: "c2", name: "Omar" }];\nconst byId = customers.reduce((acc, c) => { acc[c.id] = c; return acc; }, {});\nconsole.log(byId.c2.name);', run: 'js' },
        { h: B('reduce لأكتر من رقم مرة واحدة', 'reduce for several numbers at once'),
          p: B('بدل 4 لوبات للمجموع والعدد والأكبر والأصغر، reduce واحدة بـ acc كائن: `{ sum, count, min, max }`. ده بيلف على البيانات **مرة واحدة** — مهم لما البيانات كبيرة. وفي الآخر احسب المتوسط من sum وcount.',
            'Instead of 4 loops for sum, count, max and min, one reduce with an object acc: `{ sum, count, min, max }`. It passes over the data **once** — important when the data is big. At the end compute the mean from sum and count.'),
          ex: 'const amounts = [300, 1250, 90, 640];\nconst s = amounts.reduce((acc, x) => ({\n  sum: acc.sum + x,\n  count: acc.count + 1,\n  min: Math.min(acc.min, x),\n  max: Math.max(acc.max, x)\n}), { sum: 0, count: 0, min: Infinity, max: -Infinity });\nconsole.log({ ...s, mean: s.count ? s.sum / s.count : 0 });', run: 'js' },
        { h: B('إمتى لوب عادي أوضح', 'When a plain loop is clearer'),
          p: B('reduce قوية بس سهل تبقى مش مقرية: لو جوه الـ callback بقى فيه if وif وتعديل 3 حاجات، اكتبها `for...of` بمتغيرات واضحة. القاعدة: **map وfilter دايمًا مقريين؛ reduce للمجموع والتجميع البسيط؛ أي حاجة أعقد → لوب**. الكود اللي زميلك يفهمه في 10 ثواني أحسن من السطر الذكي.',
            'reduce is powerful but easily unreadable: once the callback holds if after if and updates three things, write a `for...of` with clear variables. The rule: **map and filter are always readable; reduce for sums and simple grouping; anything harder → a loop**. Code a colleague understands in 10 seconds beats a clever one-liner.'),
          ex: '// clever but hard to read:\nconst r1 = [3, -1, 8].reduce((a, x) => (x > 0 ? { ...a, pos: [...a.pos, x], sum: a.sum + x } : { ...a, neg: a.neg + 1 }), { pos: [], neg: 0, sum: 0 });\n// clear:\nconst r2 = { pos: [], neg: 0, sum: 0 };\nfor (const x of [3, -1, 8]) {\n  if (x > 0) { r2.pos.push(x); r2.sum += x; }\n  else r2.neg++;\n}\nconsole.log(JSON.stringify(r1) === JSON.stringify(r2), r2);', run: 'js' }
      ],
      practice: [
        B('اكتب reduce بتطبع acc في كل خطوة على 4 أرقام وافهم الخطوات.', 'Write a reduce that prints acc at every step over 4 numbers and follow the steps.'),
        B('احسب مجموع ومتوسط حقل total في 8 طلبات بـ reduce.', 'Compute the sum and mean of the total field across 8 orders with reduce.'),
        B('اعمل كائن تجميع بالمدينة وكائن lookup بالـ id بـ reduce.', 'Build a by-city grouping object and an id lookup object with reduce.'),
        B('احسب sum وcount وmin وmax في reduce واحدة.', 'Compute sum, count, min and max in a single reduce.'),
        B('انسى `return acc` عمدًا وشوف إيه اللي بيحصل، وصلّح.', 'Forget `return acc` on purpose, see what happens, and fix it.'),
        B('خد reduce معقدة واكتبها كلوب أوضح.', 'Take a complex reduce and rewrite it as a clearer loop.')
      ],
      code: [
        { u: B('countBy بـ reduce', 'countBy with reduce'), p: 'const countBy = (list, key) => list.reduce((acc, x) => { const k = key(x); acc[k] = (acc[k] ?? 0) + 1; return acc; }, {});\nconsole.log(countBy(["pen", "bag", "pen"], x => x));\nconsole.log(countBy([{ s: "new" }, { s: "paid" }, { s: "new" }], o => o.s));' }
      ],
      words: [
        { t: 'reduce', m: B('يلخّص المصفوفة لقيمة واحدة خطوة بخطوة', 'summarises an array to one value step by step'), ex: 'arr.reduce((a, x) => a + x, 0)' },
        { t: 'initial value', m: B('القيمة اللي reduce بتبدأ بيها', 'the value reduce starts from'), ex: 'reduce(fn, 0)' },
        { t: 'running total', m: B('إجمالي بيكبر مع كل عنصر', 'a total growing with each item'), ex: 'acc + x' },
        { t: 'lookup object', m: B('كائن مفاتيحه IDs للوصول السريع', 'an object keyed by IDs for fast access'), ex: 'byId["c2"]' },
        { t: 'single pass', m: B('لفة واحدة على البيانات بدل كذا لفة', 'one pass over the data instead of several'), ex: 'sum and count together' },
        { t: 'Infinity', m: B('قيمة «لا نهاية» تنفع بداية للأصغر', 'an «infinite» value, handy as the start for a minimum'), ex: 'min: Infinity' },
        { t: 'clever code', m: B('كود ذكي بس صعب يتفهم', 'smart but hard-to-follow code'), ex: 'prefer clear over clever' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Array methods: reduce/reduceRight بالتمارين.', 'Array methods: reduce/reduceRight, with the exercises.') },
        { lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 5: Higher-Order Functions (Summarizing with reduce).', 'Chapter 5: Higher-Order Functions (Summarizing with reduce).') }],
      challenge: B('اكتب `summarise(orders)` بـ reduce واحدة بترجّع: الإجمالي، وعدد الطلبات، وعدد المدفوع، والإجمالي حسب المدينة، والإجمالي حسب الشهر (من التاريخ)، وأكبر طلب — وبعدين اكتب نفس الحاجة بلوب وقارن أنهي أوضح.', 'Write `summarise(orders)` with one reduce returning: the total, the order count, the paid count, totals by city, totals by month (from the date) and the biggest order — then write the same with a loop and compare which reads better.'),
      quiz: [
        { q: B('`[1, 2, 3].reduce((a, x) => a + x, 10)`:', '`[1, 2, 3].reduce((a, x) => a + x, 10)`:'), o: ['16', '6', '10'], a: 0, why: B('بداية 10 + 6.', 'Start 10 + 6.') },
        { q: B('reduce على مصفوفة فاضية من غير قيمة بداية:', 'reduce on an empty array without a start value:'), o: ['TypeError', '0', 'undefined'], a: 0, why: B('حط بداية دايمًا.', 'Always give a start.') },
        { q: B('أكتر غلطة في reduce بتبني كائن:', 'The commonest mistake when reduce builds an object:'), o: [B('نسيان return acc', 'forgetting return acc'), B('استخدام const', 'using const'), B('اسم acc', 'the name acc')], a: 0, why: B('الـ acc بيبقى undefined.', 'acc becomes undefined.') },
        { q: B('reduce معقد جدًا الأحسن:', 'A very complex reduce is better as:'), o: [B('لوب عادي واضح', 'a clear plain loop'), B('سطر أطول', 'a longer one-liner'), B('reduce جوه reduce', 'a reduce inside a reduce')], a: 0, why: B('الوضوح أهم.', 'Clarity matters more.') }
      ] },

    { title: B('السلاسل وflat وflatMap وSet وMap', 'Chains, flat, flatMap, Set and Map'),
      goal: B('تربط map وfilter وreduce في سلسلة مقرية، وتفك المصفوفات المتداخلة بـ flatMap، وتستخدم Set وMap صح.', 'Chain map, filter and reduce into a readable pipeline, unpack nested arrays with flatMap, and use Set and Map correctly.'),
      learn: [
        { h: B('سلسلة: filter ← map ← reduce', 'A chain: filter → map → reduce'),
          p: B('كل method بترجّع مصفوفة، فتقدر تكمّل وراها: `orders.filter(o => o.paid).map(o => o.total).reduce((s, x) => s + x, 0)` = «مجموع إجماليات المدفوع». اكتب كل خطوة في سطر لوحده عشان تتقري زي خطوات وصفة. **فلتر الأول** عشان باقي الخطوات تشتغل على بيانات أقل.',
            'Each method returns an array, so you can keep going: `orders.filter(o => o.paid).map(o => o.total).reduce((s, x) => s + x, 0)` = «the sum of the paid totals». Put each step on its own line so it reads like a recipe. **Filter first**, so the later steps work on less data.'),
          ex: 'const orders = [\n  { id: 1, city: "Cairo", total: 300, paid: true },\n  { id: 2, city: "Giza", total: 1800, paid: false },\n  { id: 3, city: "Cairo", total: 1200, paid: true }\n];\nconst paidCairo = orders\n  .filter(o => o.paid)\n  .filter(o => o.city === "Cairo")\n  .map(o => o.total)\n  .reduce((s, x) => s + x, 0);\nconsole.log(paidCairo);', run: 'js' },
        { h: B('flat وflatMap للمصفوفات المتداخلة', 'flat and flatMap for nested arrays'),
          p: B('`[[1, 2], [3]].flat()` بيدّي `[1, 2, 3]`. `flatMap(fn)` = map وبعدين flat مستوى واحد: مثالي لـ «سطر لكل منتج» من طلبات فيها items: `orders.flatMap(o => o.items.map(i => ({ order: o.id, ...i })))`. ولو الدالة رجّعت `[]` العنصر بيختفي — يعني flatMap ممكن تفلتر وتحوّل مع بعض.',
            '`[[1, 2], [3]].flat()` gives `[1, 2, 3]`. `flatMap(fn)` = map then flat one level: perfect for «one line per product» from orders with items: `orders.flatMap(o => o.items.map(i => ({ order: o.id, ...i })))`. And when the function returns `[]` the item disappears — so flatMap can filter and transform at once.'),
          ex: 'const orders = [\n  { id: 1, items: [{ sku: "NB", qty: 2 }, { sku: "PN", qty: 5 }] },\n  { id: 2, items: [{ sku: "BG", qty: 1 }] },\n  { id: 3, items: [] }\n];\nconst lines = orders.flatMap(o => o.items.map(i => ({ order: o.id, ...i })));\nconsole.log(lines);\nconst tags = ["vip,new", "", "cairo"].flatMap(t => (t ? t.split(",") : []));\nconsole.log(tags);', run: 'js' },
        { h: B('Set: قيم فريدة', 'Set: unique values'),
          p: B('`new Set(arr)` بيحتفظ بكل قيمة مرة واحدة. `set.add(x)` و`set.has(x)` و`set.delete(x)` و`set.size`. `[...set]` ترجع مصفوفة. أنفع حاجة: شيل المكرر، وسؤال «موجود؟» السريع، والعمليات بين قايمتين (اللي في الاتنين، اللي في واحدة بس). خلي بالك: Set بيقارن بـ === فالكائنات المختلفة مش متساوية.',
            '`new Set(arr)` keeps each value once. `set.add(x)`, `set.has(x)`, `set.delete(x)` and `set.size`. `[...set]` turns it back into an array. Most useful for: removing duplicates, fast «is it there?» checks, and operations between two lists (in both, in one only). Careful: Set compares with ===, so different objects are not equal.'),
          ex: 'const lastMonth = new Set(["sara", "omar", "mona"]);\nconst thisMonth = new Set(["omar", "hany", "sara"]);\nconst returning = [...thisMonth].filter(c => lastMonth.has(c));\nconst newOnes = [...thisMonth].filter(c => !lastMonth.has(c));\nconst lost = [...lastMonth].filter(c => !thisMonth.has(c));\nconsole.log({ returning, newOnes, lost, size: thisMonth.size });', run: 'js' },
        { h: B('Map: مفاتيح من أي نوع', 'Map: keys of any type'),
          p: B('`new Map()` زي الكائن بس أحسن للـ lookups: المفاتيح ممكن تكون أي نوع (أرقام فعلًا، أو كائنات)، وبيحفظ ترتيب الإضافة، و`map.size` جاهز، ومفيش مفاتيح موروثة غريبة. `map.set(k, v)` و`map.get(k)` و`map.has(k)`. استخدمه للـ cache، وللربط بين قايمتين بالـ id، وللعدّ.',
            '`new Map()` is like an object but better for lookups: keys can be any type (real numbers, or objects), it keeps insertion order, `map.size` is built in, and there are no odd inherited keys. `map.set(k, v)`, `map.get(k)` and `map.has(k)`. Use it for caches, for joining two lists by id, and for counting.'),
          ex: 'const customers = [{ id: 1, name: "Sara" }, { id: 2, name: "Omar" }];\nconst byId = new Map(customers.map(c => [c.id, c]));\nconst orders = [{ id: "o1", customerId: 2, total: 900 }, { id: "o2", customerId: 1, total: 300 }, { id: "o3", customerId: 9, total: 50 }];\nconst joined = orders.map(o => ({ ...o, customer: byId.get(o.customerId)?.name ?? "unknown" }));\nconsole.log(joined);\nconsole.log(byId.size, byId.has(9));', run: 'js' },
        { h: B('الربط بين قايمتين (join)', 'Joining two lists'),
          p: B('مشكلة يومية: طلبات فيها customerId، وعملاء في قايمة تانية. الطريقة البطيئة: `orders.map(o => customers.find(c => c.id === o.customerId))` (لكل طلب بيلف على كل العملاء). الطريقة الصح: **ابني Map مرة** وبعدين get فوري. ده نفس اللي بيعمله Merge node في n8n بـ «Merge by key»، ونفس JOIN في SQL.',
            'A daily problem: orders holding a customerId, and customers in another list. The slow way: `orders.map(o => customers.find(c => c.id === o.customerId))` (each order scans every customer). The right way: **build a Map once**, then get is instant. It is what n8n’s Merge node does with «merge by key», and what JOIN does in SQL.'),
          ex: 'const products = [{ sku: "NB", name: "Notebook", price: 45 }, { sku: "BG", name: "Backpack", price: 650 }];\nconst catalog = new Map(products.map(p => [p.sku, p]));\nconst lines = [{ sku: "BG", qty: 2 }, { sku: "NB", qty: 10 }, { sku: "XX", qty: 1 }];\nconst priced = lines.map(l => {\n  const p = catalog.get(l.sku);\n  return p ? { ...l, name: p.name, sum: p.price * l.qty } : { ...l, problem: "unknown sku" };\n});\nconsole.log(priced);', run: 'js' }
      ],
      practice: [
        B('اكتب سلسلة filter ← map ← reduce لسؤال حقيقي (إجمالي الكبير المدفوع في مدينة).', 'Write a filter → map → reduce chain for a real question (the paid big total in one city).'),
        B('اعمل «سطر لكل منتج» بـ flatMap من 5 طلبات.', 'Make «one line per product» from 5 orders with flatMap.'),
        B('فك تاجز مكتوبة بفواصل في مصفوفة واحدة بـ flatMap.', 'Unpack comma-separated tags into one array with flatMap.'),
        B('احسب العملاء الجداد والراجعين والمفقودين بين شهرين بـ Set.', 'Work out the new, returning and lost customers between two months with Sets.'),
        B('اربط طلبات بعملاء بـ Map وعلّم اللي عميله مش موجود.', 'Join orders to customers with a Map and flag those with an unknown customer.'),
        B('سعّر سطور من كتالوج بـ Map مع مشكلة لكل sku مش معروف.', 'Price lines from a catalogue with a Map, flagging every unknown sku.')
      ],
      code: [
        { u: B('indexBy بـ Map', 'indexBy with a Map'), p: 'const indexBy = (list, key) => new Map(list.map(x => [key(x), x]));\nconst users = indexBy([{ email: "a@x.com", n: 1 }, { email: "b@x.com", n: 2 }], u => u.email);\nconsole.log(users.get("b@x.com")?.n, users.has("c@x.com"));' }
      ],
      words: [
        { t: 'method chain', m: B('methods ورا بعض كل واحدة على ناتج اللي قبلها', 'methods one after another, each on the previous result'), ex: '.filter().map().reduce()' },
        { t: 'flatMap', m: B('map وبعدين يفك مستوى واحد', 'map, then flatten one level'), ex: 'orders.flatMap(o => o.items)' },
        { t: 'flat', m: B('بيفك مصفوفات جوه مصفوفات لمصفوفة واحدة', 'unpacks arrays inside arrays into one array'), ex: '[[1], [2]].flat()' },
        { t: 'Map', m: B('مفاتيح وقيم بأي نوع مفاتيح وسؤال سريع', 'keys and values with any key type and fast lookups'), ex: 'new Map([[1, "a"]])' },
        { t: 'join', m: B('ربط قايمتين بمفتاح مشترك', 'linking two lists by a shared key'), ex: 'orders + customers by id' },
        { t: 'intersection', m: B('القيم الموجودة في القايمتين', 'the values present in both lists'), ex: 'returning customers' },
        { t: 'difference', m: B('القيم اللي في قايمة ومش في التانية', 'the values in one list but not the other'), ex: 'new customers' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Map and Set (كله).', 'Map and Set (all of it).') },
        { lib: 'MDN: Array', what: B('flat() وflatMap().', 'flat() and flatMap().') }],
      challenge: B('عندك 3 قوايم: عملاء، ومنتجات، وطلبات فيها customerId وسطور بـ sku. اعمل تقرير بسلاسل وMaps: سطر لكل منتج فيه اسم العميل واسم المنتج والمبلغ، وأكتر 3 عملاء صرفًا، والمنتجات اللي محدش اشتراها، وأي طلب فيه عميل أو منتج مش معروف.', 'You have 3 lists: customers, products, and orders with a customerId and lines by sku. Build a report with chains and Maps: one line per product with the customer’s name, the product’s name and the amount; the top 3 spenders; the products nobody bought; and any order with an unknown customer or product.'),
      quiz: [
        { q: B('`[[1, 2], [3]].flat()`:', '`[[1, 2], [3]].flat()`:'), o: ['[1, 2, 3]', '[[1, 2, 3]]', '6'], a: 0, why: B('مستوى واحد اتفك.', 'One level unpacked.') },
        { q: B('`new Set([1, 1, 2]).size`:', '`new Set([1, 1, 2]).size`:'), o: ['2', '3', '1'], a: 0, why: B('قيم فريدة.', 'Unique values.') },
        { q: B('أسرع طريقة تربط 10,000 طلب بـ 5,000 عميل:', 'The fastest way to join 10,000 orders to 5,000 customers:'), o: [B('Map بالـ id مرة واحدة', 'a Map by id, built once'), B('find جوه map', 'find inside map'), B('sort الاتنين', 'sort both')], a: 0, why: B('get فوري.', 'get is instant.') },
        { q: B('في السلسلة تحط filter:', 'In a chain you put filter:'), o: [B('في الأول', 'first'), B('في الآخر', 'last'), B('مش مهم', 'anywhere')], a: 0, why: B('عشان الباقي يشتغل على أقل.', 'So the rest works on less.') }
      ] },

    { title: B('مشروع: لوحة طلبات من JSON', 'A project: an orders dashboard from JSON'),
      goal: B('تبني صفحة بتقرا JSON طلبات وتعرض ملخص وجدول بفلترة وترتيب وتجميع، كلها بـ map وfilter وreduce وSet وMap.', 'Build a page that reads orders JSON and shows a summary and a table with filtering, sorting and grouping, all with map, filter, reduce, Set and Map.'),
      learn: [
        { h: B('البيانات والحالة', 'The data and the state'),
          p: B('الصفحة عندها **بيانات** (مصفوفة الطلبات، مبتتغيرش) و**حالة** (الفلاتر والترتيب اللي المستخدم اختارهم). كل ما الحالة تتغيّر: احسب «الطلبات الظاهرة» من البيانات بالحالة (filter + sort)، وارسم من جديد. متخلّيش الرسم يغيّر البيانات أبدًا. ده نفس فكرة React بعدين بالظبط.',
            'The page has **data** (the orders array, which never changes) and **state** (the filters and sort the user picked). Whenever the state changes: compute «the visible orders» from the data with the state (filter + sort), then redraw. Never let drawing change the data. It is exactly the idea behind React later.'),
          ex: 'const data = [\n  { id: 1, customer: "Sara", city: "Cairo", total: 300, status: "paid" },\n  { id: 2, customer: "Omar", city: "Giza", total: 1800, status: "new" },\n  { id: 3, customer: "Mona", city: "Cairo", total: 1200, status: "paid" },\n  { id: 4, customer: "Hany", city: "Alex", total: 650, status: "shipped" }\n];\nconst state = { city: "", status: "", sort: "total-desc", q: "" };\nfunction visible(data, s) {\n  const list = data.filter(o => (!s.city || o.city === s.city) && (!s.status || o.status === s.status) && (!s.q || o.customer.toLowerCase().includes(s.q)));\n  const [field, dir] = s.sort.split("-");\n  return list.toSorted((a, b) => (dir === "desc" ? -1 : 1) * (a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0));\n}\nconsole.log(visible(data, state).map(o => o.id));\nconsole.log(visible(data, { ...state, city: "Cairo", sort: "customer-asc" }).map(o => o.customer));', run: 'js' },
        { h: B('الملخص فوق الجدول', 'The summary above the table'),
          p: B('من «الطلبات الظاهرة» (مش كل البيانات) احسب: العدد، والإجمالي، والمتوسط، وعدد العملاء المختلفين (Set)، والإجمالي حسب الحالة (reduce). كده الملخص بيتغيّر مع الفلتر — المستخدم يشوف «إجمالي القاهرة المدفوع» من غير ما يحسب.',
            'From «the visible orders» (not all the data) compute: the count, the total, the mean, the number of distinct customers (Set) and the total by status (reduce). That way the summary follows the filter — the user sees «Cairo’s paid total» without calculating it.'),
          ex: 'function summary(list) {\n  const total = list.reduce((s, o) => s + o.total, 0);\n  return {\n    count: list.length,\n    total,\n    mean: list.length ? Math.round(total / list.length) : 0,\n    customers: new Set(list.map(o => o.customer)).size,\n    byStatus: list.reduce((acc, o) => { acc[o.status] = (acc[o.status] ?? 0) + o.total; return acc; }, {})\n  };\n}\nconsole.log(summary([{ customer: "A", total: 300, status: "paid" }, { customer: "B", total: 900, status: "new" }, { customer: "A", total: 100, status: "paid" }]));', run: 'js' },
        { h: B('رسم الجدول بأمان', 'Drawing the table safely'),
          p: B('حوّل كل طلب لصف بـ map و`join("")`. **أهم قاعدة أمان**: أي نص جاي من البيانات (اسم عميل مثلًا) ممكن يكون فيه HTML خبيث — متحطّوش في innerHTML مباشرة. اعمل دالة `esc` بتحوّل `<` و`>` و`&` و`"` لرموز آمنة، أو ابني العناصر بـ createElement وtextContent. هنتعمّق في ده في أسبوع الـ DOM.',
            'Turn each order into a row with map and `join("")`. **The key safety rule**: any text from the data (a customer’s name, say) may contain malicious HTML — never put it straight into innerHTML. Write an `esc` function turning `<`, `>`, `&` and `"` into safe codes, or build elements with createElement and textContent. We go deeper in the DOM week.'),
          ex: 'const esc = s => String(s ?? "").replace(/[&<>"\']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\\"": "&quot;", "\'": "&#39;" }[c]));\nconst rows = [{ id: 1, customer: "Sara", total: 300 }, { id: 2, customer: "<img src=x onerror=alert(1)>", total: 900 }];\nconst html = rows.map(o => `<tr><td>${o.id}</td><td>${esc(o.customer)}</td><td>${o.total}</td></tr>`).join("");\ndocument.querySelector("#t").innerHTML = html;\nconsole.log(document.querySelectorAll("#t img").length, "images injected");\nconsole.log(document.querySelector("#t").textContent);', run: 'js', html: '<table><tbody id="t"></tbody></table>' },
        { h: B('الفلاتر والأحداث', 'Filters and events'),
          p: B('كل فلتر (select أو input) ليه event listener بيحدّث الحالة ويرسم: `select.addEventListener("change", e => { state.city = e.target.value; render(); })`. قايمة المدن نفسها اتولّدت من البيانات: `[...new Set(data.map(o => o.city))].sort()`. كده لو جت مدينة جديدة في البيانات، بتظهر في الفلتر لوحدها.',
            'Each filter (a select or an input) has an event listener updating the state and redrawing: `select.addEventListener("change", e => { state.city = e.target.value; render(); })`. The city list itself is generated from the data: `[...new Set(data.map(o => o.city))].sort()`. That way a new city in the data shows up in the filter by itself.'),
          ex: 'const data = [{ city: "Giza" }, { city: "Cairo" }, { city: "Giza" }, { city: "Alex" }];\nconst cities = [...new Set(data.map(o => o.city))].sort();\nconst sel = document.querySelector("#city");\nsel.innerHTML = `<option value="">All cities</option>` + cities.map(c => `<option>${c}</option>`).join("");\nlet chosen = "";\nsel.addEventListener("change", e => { chosen = e.target.value; console.log("filter by", chosen || "(all)"); });\nsel.value = "Giza";\nsel.dispatchEvent(new Event("change"));\nconsole.log(sel.options.length, "options");', run: 'js', html: '<select id="city"></select>' },
        { h: B('الصفحة كاملة مع بعض', 'The whole page together'),
          p: B('`render()` واحدة بتعمل كل حاجة: تحسب الظاهر، وترسم الملخص، وترسم الجدول. كل حدث بيغيّر الحالة وينادي render. ده بسيط ومفهوم وكفاية لصفحات الأتمتة الصغيرة (لوحة تقارير، صفحة متابعة طلبات). شغّل المثال وشوف الجدول بيتغيّر.',
            'A single `render()` does everything: computes what is visible, draws the summary and draws the table. Every event changes the state and calls render. Simple, understandable and enough for small automation pages (a report board, an order-tracking page). Run the example and watch the table change.'),
          ex: 'const data = [\n  { id: 1, customer: "Sara", city: "Cairo", total: 300 }, { id: 2, customer: "Omar", city: "Giza", total: 1800 },\n  { id: 3, customer: "Mona", city: "Cairo", total: 1200 }, { id: 4, customer: "Hany", city: "Alex", total: 650 }\n];\nconst state = { city: "" };\nconst $ = s => document.querySelector(s);\nfunction render() {\n  const list = data.filter(o => !state.city || o.city === state.city).toSorted((a, b) => b.total - a.total);\n  const total = list.reduce((s, o) => s + o.total, 0);\n  $("#sum").textContent = `${list.length} orders · ${total.toLocaleString("en")} EGP`;\n  $("#rows").innerHTML = list.map(o => `<tr><td>${o.id}</td><td>${o.customer}</td><td>${o.city}</td><td>${o.total}</td></tr>`).join("");\n}\n$("#city").addEventListener("change", e => { state.city = e.target.value; render(); });\nrender();\nconsole.log($("#sum").textContent);\n$("#city").value = "Cairo"; $("#city").dispatchEvent(new Event("change"));\nconsole.log($("#sum").textContent);', run: 'js',
          html: '<select id="city"><option value="">All</option><option>Cairo</option><option>Giza</option><option>Alex</option></select><p id="sum"></p><table border="1" cellpadding="4"><thead><tr><th>#</th><th>Customer</th><th>City</th><th>Total</th></tr></thead><tbody id="rows"></tbody></table>' }
      ],
      practice: [
        B('اكتب `visible(data, state)` بـ 3 فلاتر وترتيب.', 'Write `visible(data, state)` with 3 filters and a sort.'),
        B('اكتب `summary(list)` بـ 5 أرقام منهم عدد العملاء المختلفين.', 'Write `summary(list)` with 5 numbers, including the number of distinct customers.'),
        B('اكتب `esc` وجرّبها على نص فيه وسوم HTML.', 'Write `esc` and try it on text containing HTML tags.'),
        B('ولّد قايمة مدن وحالات من البيانات بـ Set.', 'Generate the city and status lists from the data with Sets.'),
        B('اعمل render واحدة وكل فلتر بيناديها.', 'Write a single render that every filter calls.'),
        B('ضيف زرار يرتّب بالعميل أو بالمبلغ.', 'Add a button that sorts by customer or by amount.')
      ],
      code: [
        { u: B('هيكل صفحة بيانات', 'A data page skeleton'), p: 'const data = [/* … */];\nconst state = { city: "", status: "", q: "", sort: "total-desc" };\nfunction visible() { /* filter + sort from data and state */ }\nfunction render() { /* summary + table from visible() */ }\n// every control: change state → render()\nrender();', show: 1, lang: 'js' }
      ],
      words: [
        { t: 'state', m: B('اختيارات المستخدم الحالية اللي بتحدد الشكل', 'the user’s current choices that decide what is shown'), ex: '{ city: "Cairo" }' },
        { t: 'render', m: B('رسم الصفحة (أو جزء منها) من البيانات والحالة', 'drawing the page (or part of it) from data and state'), ex: 'render()' },
        { t: 'dashboard', m: B('لوحة بتعرض أرقام وجداول مهمة', 'a board showing key numbers and tables'), ex: 'an orders dashboard' },
        { t: 'escape', m: B('تحويل رموز HTML لرموز آمنة قبل العرض', 'turning HTML characters into safe codes before display'), ex: 'esc("<b>")' },
        { t: 'XSS', m: B('هجوم بيحقن كود في صفحة عن طريق بيانات', 'an attack injecting code into a page through data'), ex: 'never innerHTML raw input' },
        { t: 'derived data', m: B('بيانات محسوبة من بيانات تانية (مش متخزنة)', 'data computed from other data (not stored)'), ex: 'visible orders' },
        { t: 'dropdown', m: B('قايمة اختيار منسدلة', 'a drop-down list'), ex: '<select>' }
      ],
      read: [{ lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 5: Filtering arrays وTransforming with map وComposability.', 'Chapter 5: Filtering arrays, Transforming with map and Composability.') },
        { lib: 'OWASP Cheat Sheet Series', what: B('Cross Site Scripting Prevention: الجزء الأول (Output Encoding).', 'Cross Site Scripting Prevention: the first part (Output Encoding).') }],
      challenge: B('كمّل اللوحة: بحث بالاسم، وفلتر حالة، وفلتر حد أدنى، وترتيب بالضغط على عنوان العمود (مرة تصاعدي ومرة تنازلي)، وملخص حسب الحالة، وزرار «صدّر CSV» بيطبع CSV للطلبات الظاهرة في الـ Console — وكل نص من البيانات متحوّل بـ esc.', 'Complete the dashboard: a name search, a status filter, a minimum filter, sorting by clicking a column title (ascending, then descending), a summary by status, and an «export CSV» button printing a CSV of the visible orders to the Console — with every text from the data passed through esc.'),
      quiz: [
        { q: B('الـ render بيشتغل على:', 'render works from:'), o: [B('البيانات + الحالة', 'the data + the state'), B('اللي في الصفحة دلوقتي', 'what is on the page now'), B('الحالة بس', 'the state only')], a: 0, why: B('مصدر الحقيقة البيانات.', 'The data is the source of truth.') },
        { q: B('اسم عميل فيه `<script>` يتعرض إزاي؟', 'How is a customer name containing `<script>` shown?'), o: [B('بعد esc أو textContent', 'after esc or with textContent'), B('في innerHTML مباشرة', 'straight into innerHTML'), B('متتعرضش', 'it is never shown')], a: 0, why: B('عشان XSS.', 'Because of XSS.') },
        { q: B('قايمة المدن في الفلتر الأحسن تيجي:', 'The filter’s city list is best:'), o: [B('من البيانات بـ Set', 'from the data with a Set'), B('مكتوبة بإيدك', 'typed by hand'), B('من الـ URL', 'from the URL')], a: 0, why: B('بتتحدّث لوحدها.', 'It updates by itself.') },
        { q: B('الملخص يتحسب من:', 'The summary is computed from:'), o: [B('الطلبات الظاهرة', 'the visible orders'), B('كل البيانات دايمًا', 'always all the data'), B('أول 10', 'the first 10')], a: 0, why: B('عشان يتغيّر مع الفلتر.', 'So it follows the filter.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تراجع methods المصفوفات وتسلّم أداة بيانات بسلاسل نضيفة، وتعدّي اختبار الأسبوع.', 'Review array methods, deliver a data tool with clean chains, and pass the weekly test.'),
      review: [
        B('map: نفس الطول، كل عنصر متحوّل، وكائن جديد بالـ spread.', 'map: same length, each item transformed, a new object with spread.'),
        B('filter: اللي يحقق الشرط بس؛ filter(Boolean) للفاضي.', 'filter: only what passes; filter(Boolean) for empty values.'),
        B('find/findLast/findIndex لعنصر واحد، وsome/every لأسئلة نعم/لا.', 'find/findLast/findIndex for one item, some/every for yes/no questions.'),
        B('reduce بقيمة بداية دايمًا وreturn acc؛ للمجموع والتجميع.', 'reduce always with a start value and return acc; for sums and grouping.'),
        B('السلسلة: filter الأول، وكل خطوة في سطر.', 'Chains: filter first, one step per line.'),
        B('flatMap لـ «سطر لكل منتج» وللفلترة والتحويل مع بعض.', 'flatMap for «one line per product», and for filtering and transforming together.'),
        B('Set لقيم فريدة وhas سريع؛ Map للربط بالـ id.', 'Set for unique values and fast has; Map for joining by id.'),
        B('أي نص من البيانات للصفحة: esc أو textContent.', 'Any text from data to the page: esc or textContent.')
      ],
      project: B('**مشروع الأسبوع: «محلل سلة المتجر».** عندك JSON فيه: 15 منتج (sku، اسم، سعر، قسم)، و12 عميل (id، اسم، مدينة)، و40 طلب (id، customerId، تاريخ، status، lines بـ sku وqty). اكتبهم انت.\n1. ابني Maps للمنتجات والعملاء.\n2. بـ flatMap اعمل سطر لكل منتج فيه الطلب والعميل والمدينة والقسم والمبلغ، وعلّم السطور اللي فيها sku أو عميل مش معروف.\n3. بسلاسل احسب: الإيراد الكلي والمدفوع بس، وأحسن 5 منتجات وأحسن 3 أقسام، والإيراد حسب المدينة والشهر، ومتوسط الطلب ووسيطه.\n4. بـ Set: العملاء اللي اشتروا من قسمين أو أكتر، والمنتجات اللي محدش اشتراها.\n5. اعرض كل ده في صفحة HTML بجداول (بـ esc) وفلتر شهر وقسم بـ render واحدة.',
        '**Weekly project: «the shop basket analyser».** You have JSON holding: 15 products (sku, name, price, department), 12 customers (id, name, city) and 40 orders (id, customerId, date, status, lines with sku and qty). Write them yourself.\n1. Build Maps for products and customers.\n2. With flatMap make one line per product holding the order, customer, city, department and amount, flagging lines with an unknown sku or customer.\n3. With chains compute: total and paid-only revenue, the top 5 products and top 3 departments, revenue by city and by month, and the order mean and median.\n4. With Sets: the customers who bought from two or more departments, and the products nobody bought.\n5. Show all of it on an HTML page with tables (through esc) and month and department filters driven by a single render.'),
      test: [
        { q: B('`["a", "b"].map((x, i) => x + i)`:', '`["a", "b"].map((x, i) => x + i)`:'), o: ['["a0", "b1"]', '["a", "b"]', '"a0b1"'], a: 0, why: B('i هو الفهرس.', 'i is the index.') },
        { q: B('`[0, 1, "", "x"].filter(Boolean)`:', '`[0, 1, "", "x"].filter(Boolean)`:'), o: ['[1, "x"]', '[0, 1, "", "x"]', '["x"]'], a: 0, why: B('0 و"" falsy.', '0 and "" are falsy.') },
        { q: B('`[3, 8, 12].find(x => x > 5)`:', '`[3, 8, 12].find(x => x > 5)`:'), o: ['8', '[8, 12]', 'true'], a: 0, why: B('أول واحد بس.', 'The first one only.') },
        { q: B('`[2, 4].every(x => x % 2 === 0)`:', '`[2, 4].every(x => x % 2 === 0)`:'), o: ['true', 'false', '[2, 4]'], a: 0, why: B('كلهم زوجي.', 'All even.') },
        { q: B('`[1, 2, 3].reduce((a, x) => a * x, 1)`:', '`[1, 2, 3].reduce((a, x) => a * x, 1)`:'), o: ['6', '7', '0'], a: 0, why: B('1×1×2×3.', '1×1×2×3.') },
        { q: B('reduce بتبني كائن ونسيت `return acc`:', 'A reduce building an object, with `return acc` forgotten:'), o: [B('الناتج undefined أو خطأ', 'the result is undefined or an error'), B('شغال عادي', 'works fine'), B('أسرع', 'faster')], a: 0, why: B('acc الجديد undefined.', 'The new acc is undefined.') },
        { q: B('`[[1], [2, 3]].flatMap(x => x)`:', '`[[1], [2, 3]].flatMap(x => x)`:'), o: ['[1, 2, 3]', '[[1], [2, 3]]', '[1, [2, 3]]'], a: 0, why: B('مستوى واحد.', 'One level.') },
        { q: B('`new Set("aabbc").size`:', '`new Set("aabbc").size`:'), o: ['3', '5', '1'], a: 0, why: B('a وb وc.', 'a, b and c.') },
        { q: B('`new Map([[1, "x"]]).get(1)`:', '`new Map([[1, "x"]]).get(1)`:'), o: ['"x"', 'undefined', '1'], a: 0, why: B('المفتاح رقم 1.', 'The key is the number 1.') },
        { q: B('أنسب حاجة تعرف «العملاء الجداد هذا الشهر»:', 'The best fit for «this month’s new customers»:'), o: [B('Set للشهر اللي فات وfilter بـ !has', 'a Set of last month and filter with !has'), B('sort', 'sort'), B('reduce جوه reduce', 'reduce inside reduce')], a: 0, why: B('difference.', 'A difference.') },
        { q: B('ترتيب السلسلة الأحسن:', 'The best chain order:'), o: [B('filter ← map ← reduce', 'filter → map → reduce'), B('map ← reduce ← filter', 'map → reduce → filter'), B('reduce ← filter', 'reduce → filter')], a: 0, why: B('فلتر الأول.', 'Filter first.') },
        { q: B('في Code node الناتج:', 'In a Code node the result is:'), o: ['items.map(i => ({ json: { … } }))', 'items.json', 'JSON.stringify(items)'], a: 0, why: B('مصفوفة items بـ json.', 'An array of items with json.') }
      ] }
  ]
};
