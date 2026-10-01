// Python week 15 — JavaScript in the browser.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('JavaScript في المتصفح', 'JavaScript in the browser'),
  goal: B('تكتب JavaScript بثقة من خلفيتك في Python: المتغيرات والدوال والـ arrays والـ objects (نفس اللي بتكتبه في Code node في n8n)، وتعدّل الصفحة بالـ DOM، وتتعامل مع الأحداث والفورمز، وتجيب بيانات بـ fetch وتبعتها لـ n8n، وترسم رسوم بيانية.',
          'Write JavaScript confidently from your Python background: variables, functions, arrays and objects (the same as in an n8n Code node), change the page through the DOM, handle events and forms, fetch data and send it to n8n, and draw charts.'),
  days: [
    { title: B('JavaScript لمبرمج Python', 'JavaScript for a Python programmer'),
      goal: B('تترجم اللي تعرفه من Python لـ JavaScript: const وlet، والأنواع، والنصوص بـ backticks، و===، والدوال والـ arrow functions، وif وfor.', 'Translate what you know from Python into JavaScript: const and let, types, backtick strings, ===, functions and arrow functions, if and for.'),
      learn: [
        { h: B('المتغيرات والأنواع', 'Variables and types'),
          p: B('`const` لقيمة مش هتتغير إشارتها (استخدمها افتراضيًا)، و`let` لقيمة هتتغير، ومتستخدمش `var`. الأنواع: number (مفيش فرق int وfloat)، وstring، وboolean (`true` بحرف صغير)، و`null` و`undefined`. النصوص بالـ backticks زي f-string: `` `Total: ${total}` ``. السطر بيخلص بـ `;` (اختياري بس شائع). دوس «شغّل» والناتج يطلع تحت.', '`const` for a value whose binding will not change (use it by default), `let` for one that will, and never `var`. Types: number (no int/float split), string, boolean (`true` in lowercase), `null` and `undefined`. Backtick strings work like f-strings: `` `Total: ${total}` ``. Lines end with `;` (optional but common). Press «Run» and the output appears below.'),
          ex: 'const name = "Sara";\nlet orders = 3;\norders += 1;\nconst price = 120.5;\nconsole.log(`${name} has ${orders} orders, total ${(orders * price).toFixed(2)} EGP`);\nconsole.log(typeof name, typeof orders, typeof true, typeof null, typeof undefined);\nconsole.log(0.1 + 0.2, 7 / 2, Math.floor(7 / 2), 7 % 2);', run: 'js' },
        { h: B('=== والشروط والتكرار', '=== , conditions and loops'),
          p: B('استخدم `===` و`!==` دايمًا: `==` بيحوّل الأنواع بطريقة غريبة (`"5" == 5` بتطلع true!). `&&` و`||` و`!` بدل and وor وnot. `if (x) {...} else if {...}`. التكرار: `for (const item of items)` زي for في Python، و`for (let i = 0; i < n; i++)` الكلاسيكي.', 'Always use `===` and `!==`: `==` converts types in odd ways (`"5" == 5` is true!). `&&`, `||` and `!` replace and, or and not. `if (x) {...} else if {...}`. Loops: `for (const item of items)` like Python’s for, and the classic `for (let i = 0; i < n; i++)`.'),
          ex: 'console.log("5" == 5, "5" === 5, null == undefined, null === undefined);\nconst totals = [1200, 0, 450, 5100];\nfor (const t of totals) {\n  if (t === 0) {\n    console.log("skip empty order");\n    continue;\n  }\n  const label = t > 1000 ? "big" : "normal";\n  console.log(t, label);\n}\nfor (let i = 3; i > 0; i--) console.log("countdown", i);', run: 'js' },
        { h: B('الدوال', 'Functions'),
          p: B('`function addVat(price, rate = 0.14) { return price * (1 + rate); }` أو arrow function: `const addVat = (price, rate = 0.14) => price * (1 + rate);` (سطر واحد = return تلقائي). الدوال قيم زي Python بالظبط: تتبعت لدوال تانية. دالة من غير return بترجّع `undefined`.', '`function addVat(price, rate = 0.14) { return price * (1 + rate); }` or an arrow function: `const addVat = (price, rate = 0.14) => price * (1 + rate);` (one line = an automatic return). Functions are values exactly as in Python: you pass them to other functions. A function without return gives `undefined`.'),
          ex: 'function cleanPhone(phone) {\n  return String(phone).replace(/\\D/g, "");\n}\nconst addVat = (price, rate = 0.14) => Math.round(price * (1 + rate) * 100) / 100;\nconst mask = p => p.slice(0, 3) + "*".repeat(p.length - 6) + p.slice(-3);\nconsole.log(cleanPhone("010-1234 5678"), addVat(100), addVat(100, 0.2));\nconsole.log(mask(cleanPhone("+20 100 222 3333")));', run: 'js' }
      ],
      practice: [
        B('اكتب في JavaScript 5 حاجات كتبتها قبل كده في Python (حساب فاتورة، تحويل حرارة، FizzBuzz…).', 'Write 5 things in JavaScript that you already wrote in Python (an invoice total, a temperature converter, FizzBuzz…).'),
        B('جرّب 6 مقارنات بـ == و=== واكتب ليه النتيجة كده.', 'Try 6 comparisons with == and === and write down why each result is what it is.'),
        B('افتح Console في DevTools (F12) على أي صفحة واكتب 5 أسطر JavaScript.', 'Open the Console in DevTools (F12) on any page and type 5 lines of JavaScript.'),
        B('حوّل 3 دوال عادية لـ arrow functions.', 'Turn 3 normal functions into arrow functions.')
      ],
      code: [
        { u: B('Python ↔ JavaScript', 'Python ↔ JavaScript'), p: 'Python                         JavaScript\nx = 5                          const x = 5;  /  let x = 5;\nf"Hi {name}"                   `Hi ${name}`\nTrue / False / None            true / false / null (and undefined)\nand  or  not                   &&  ||  !\n==                             ===\nlen(items)                     items.length\nitems.append(x)                items.push(x)\nfor x in items:                for (const x of items) { }\ndef f(a, b=2): return a + b    const f = (a, b = 2) => a + b;\nd["key"] / d.get("key")        d.key / d["key"] / d?.key\nprint(x)                       console.log(x)', lang: 'text' }
      ],
      words: [
        { t: 'JavaScript', m: B('لغة البرمجة اللي بتشتغل في المتصفح (وفي n8n وNode.js)', 'the programming language of the browser (also in n8n and Node.js)'), ex: 'console.log("hi")' },
        { t: 'const', m: B('تعريف متغير مش هيتعاد تعيينه', 'declaring a variable that will not be reassigned'), ex: 'const rate = 0.14;' },
        { t: 'template literal', m: B('نص بين backticks فيه ${} زي f-string', 'a backtick string with ${} like an f-string'), ex: '`Total: ${total}`' },
        { t: 'strict equality', m: B('=== بيقارن القيمة والنوع من غير تحويل', '=== compares value and type with no conversion'), ex: '"5" === 5  →  false' },
        { t: 'arrow function', m: B('دالة مختصرة بـ =>', 'a short function written with =>'), ex: 'const double = x => x * 2;' },
        { t: 'undefined', m: B('قيمة متغير أو خاصية ملهاش قيمة لسه', 'the value of a variable or property with no value yet'), ex: 'let x; console.log(x)' },
        { t: 'console.log', m: B('بيطبع في الـ Console زي print', 'prints to the Console, like print'), ex: 'console.log(total)' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Part 1 الفصل 2 (JavaScript Fundamentals) لحد Functions.', 'Part 1 chapter 2 (JavaScript Fundamentals) up to Functions.') }, { lib: 'MDN: JavaScript Guide', what: B('اقرا Grammar and types.', 'Read Grammar and types.') }],
      challenge: B('اكتب في JavaScript دالة `invoiceTotal(lines, discountPct = 0)` بتاخد array من [السعر، الكمية] وترجّع الإجمالي بعد الخصم والضريبة متقرّب لقرشين، وجرّبها على 4 حالات منهم قايمة فاضية.', 'Write a JavaScript `invoiceTotal(lines, discountPct = 0)` taking an array of [price, qty] and returning the total after discount and VAT rounded to cents, and test it on 4 cases including an empty list.'),
      quiz: [
        { q: B('`"5" == 5` في JavaScript:', '`"5" == 5` in JavaScript:'), o: ['true', 'false', B('خطأ', 'an error')], a: 0, why: B('== بيحوّل الأنواع؛ استخدم ===.', '== converts types; use ===.') },
        { q: B('مكافئ f"Hi {name}" في JS:', 'The JS equivalent of f"Hi {name}":'), o: ['`Hi ${name}`', '"Hi {name}"', "'Hi ' % name"], a: 0, why: B('template literal.', 'A template literal.') },
        { q: B('القيمة الافتراضية لمتغير اتعرّف من غير قيمة:', 'A variable declared with no value holds:'), o: ['undefined', 'null', '0'], a: 0, why: B('undefined.', 'undefined.') }
      ] },

    { title: B('Arrays وObjects (شكل بيانات n8n)', 'Arrays and objects (the shape of n8n data)'),
      goal: B('تشتغل بقوايم objects: map وfilter وreduce وfind وsort، والـ destructuring والـ spread، و?. و??، وJSON — نفس اللي هتكتبه في Code node.', 'Work with lists of objects: map, filter, reduce, find and sort, destructuring and spread, ?. and ??, and JSON — exactly what you write in a Code node.'),
      learn: [
        { h: B('map وfilter وreduce', 'map, filter and reduce'),
          p: B('`arr.map(x => ...)` بيعمل array جديدة (زي list comprehension)، و`filter` بيسيب اللي الشرط بتاعه true، و`reduce((acc, x) => acc + x, 0)` بيلخّص لقيمة واحدة، و`find` أول عنصر مطابق، و`some`/`every` زي any/all. بيترصّوا ورا بعض: `orders.filter(...).map(...)`.', '`arr.map(x => ...)` builds a new array (like a list comprehension), `filter` keeps items whose condition is true, `reduce((acc, x) => acc + x, 0)` sums up to one value, `find` returns the first match, and `some`/`every` are any/all. They chain: `orders.filter(...).map(...)`.'),
          ex: 'const orders = [\n  { id: 1, customer: "Sara", total: 1200, paid: true },\n  { id: 2, customer: "Omar", total: 450, paid: false },\n  { id: 3, customer: "Mona", total: 3100, paid: true },\n];\nconst paid = orders.filter(o => o.paid);\nconsole.log(paid.map(o => o.customer));\nconsole.log(paid.reduce((sum, o) => sum + o.total, 0));\nconsole.log(orders.find(o => o.total > 1000).customer, orders.some(o => !o.paid));\nconsole.log([...orders].sort((a, b) => b.total - a.total).map(o => o.id));', run: 'js' },
        { h: B('destructuring وspread', 'Destructuring and spread'),
          p: B('`const { name, city = "Cairo" } = customer;` بتفك خصائص في متغيرات (بقيمة افتراضية)، و`const [first, ...rest] = items;` زي `first, *rest` في Python. والـ spread `...`: `{ ...order, status: "paid" }` نسخة جديدة متعدلة (زي `{**d}`)، و`[...a, ...b]` بتدمج arrays.', '`const { name, city = "Cairo" } = customer;` unpacks properties into variables (with a default), and `const [first, ...rest] = items;` is like `first, *rest` in Python. Spread `...`: `{ ...order, status: "paid" }` is a new edited copy (like `{**d}`), and `[...a, ...b]` merges arrays.'),
          ex: 'const customer = { name: "Laila", email: "LAILA@Mail.com", tags: ["vip"] };\nconst { name, city = "Cairo", email } = customer;\nconsole.log(name, city, email.toLowerCase());\nconst updated = { ...customer, email: email.toLowerCase(), tags: [...customer.tags, "new"] };\nconsole.log(updated, customer.tags);\nconst [first, ...others] = ["INV-1", "INV-2", "INV-3"];\nconsole.log(first, others);', run: 'js' },
        { h: B('?. و?? وJSON', '?. , ?? and JSON'),
          p: B('`order.customer?.phone` بترجّع undefined بدل ما تقع لو customer مش موجود (زي `.get()` المتسلسلة)، و`x ?? "default"` قيمة بديلة لو x بـ null أو undefined بس (عكس `||` اللي بتعتبر 0 و"" فاضيين). و`JSON.stringify(obj, null, 2)` و`JSON.parse(text)` زي dumps وloads. ده كله بتستخدمه في expressions بتاعة n8n كل يوم.', '`order.customer?.phone` gives undefined instead of crashing when customer is missing (like chained `.get()`), and `x ?? "default"` falls back only when x is null or undefined (unlike `||`, which treats 0 and "" as empty). `JSON.stringify(obj, null, 2)` and `JSON.parse(text)` are dumps and loads. You use all of this daily in n8n expressions.'),
          ex: 'const order = { id: 7, qty: 0, customer: { name: "Hany" } };\nconsole.log(order.customer?.phone, order.coupon?.code);\nconsole.log(order.qty || 1, order.qty ?? 1);\nconst text = JSON.stringify(order, null, 2);\nconsole.log(text);\nconsole.log(JSON.parse(\'{"ok": true, "n": null}\').ok);', run: 'js' }
      ],
      practice: [
        B('حوّل مثال «تقرير طلبات المتجر» (أسبوع 5) لـ JavaScript بـ filter وmap وreduce.', 'Port the «shop order report» (week 5) to JavaScript with filter, map and reduce.'),
        B('اجمع الطلبات حسب المدينة بـ reduce في object.', 'Group orders by city with reduce into an object.'),
        B('استخدم ?. و?? على 5 objects ناقصها حاجات مختلفة.', 'Use ?. and ?? on 5 objects each missing something different.'),
        B('افتح Code node في n8n (JavaScript) وطبّق map على `$input.all()`.', 'Open a Code node in n8n (JavaScript) and apply map to `$input.all()`.')
      ],
      code: [
        { u: B('Code node في n8n بـ JavaScript', 'An n8n Code node in JavaScript'), p: '// Mode: Run Once for All Items\nreturn $input.all().map(item => {\n  const o = item.json;\n  const total = (o.items ?? []).reduce((s, i) => s + i.qty * i.price, 0);\n  return { json: { id: o.id, email: (o.email ?? "").trim().toLowerCase(), total: Math.round(total * 1.14 * 100) / 100, big: total > 5000 } };\n});', lang: 'js' }
      ],
      words: [
        { t: 'array', m: B('قايمة في JavaScript بين []', 'a list in JavaScript, in []'), ex: '[1, 2, 3].length' },
        { t: 'object', m: B('مجموعة خصائص key: value بين {} (زي dict)', 'a set of key: value properties in {} (like a dict)'), ex: '{ id: 7, total: 1200 }' },
        { t: 'Array.map', m: B('بتعمل array جديدة من كل عنصر بعد تحويله', 'builds a new array from each item after transforming it'), ex: 'orders.map(o => o.id)' },
        { t: 'reduce', m: B('بتلخّص array لقيمة واحدة', 'boils an array down to one value'), ex: 'arr.reduce((s, x) => s + x, 0)' },
        { t: 'destructuring', m: B('فك خصائص object أو عناصر array في متغيرات', 'unpacking object properties or array items into variables'), ex: 'const { name } = customer;' },
        { t: 'spread syntax', m: B('... بتفرد عناصر أو خصائص في array أو object جديد', '... spreads items or properties into a new array or object'), ex: '{ ...order, paid: true }' },
        { t: 'optional chaining', m: B('?. بترجّع undefined بدل ما تقع لو حاجة ناقصة', '?. returns undefined instead of crashing when something is missing'), ex: 'order.customer?.phone' },
        { t: 'nullish coalescing', m: B('?? قيمة بديلة لو null أو undefined بس', '?? a fallback only for null or undefined'), ex: 'qty ?? 1' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Part 1 الفصل 5: Arrays وArray methods وObject.keys وDestructuring.', 'Part 1 chapter 5: Arrays, Array methods, Object.keys and Destructuring.') }, { lib: 'n8n Docs: Code node', what: B('اقرا جزء JavaScript وإزاي ترجّع items.', 'Read the JavaScript part and how to return items.') }],
      challenge: B('اكتب في JS دالة `summarise(orders)` بترجّع object: الإجمالي المدفوع، وأفضل 3 عملاء، وعدد كل status، والمدن المختلفة — وحطها في Code node في n8n على بيانات Pin Data.', 'Write a JS `summarise(orders)` returning an object: the paid total, the top 3 customers, the count per status and the distinct cities — and use it in an n8n Code node on pinned data.'),
      quiz: [
        { q: B('`[1, 2, 3].map(x => x * 2)`:', '`[1, 2, 3].map(x => x * 2)`:'), o: ['[2, 4, 6]', '12', '[1, 2, 3]'], a: 0, why: B('array جديدة.', 'A new array.') },
        { q: B('`0 || 5` و`0 ?? 5`:', '`0 || 5` and `0 ?? 5`:'), o: [B('5 و 0', '5 and 0'), B('5 و 5', '5 and 5'), B('0 و 0', '0 and 0')], a: 0, why: B('?? بتعتبر 0 قيمة حقيقية.', '?? treats 0 as a real value.') },
        { q: B('`{ ...a, x: 1 }` بيعمل:', '`{ ...a, x: 1 }` creates:'), o: [B('نسخة جديدة من a وx فيها 1', 'a new copy of a with x set to 1'), B('بيغيّر a نفسها', 'changes a itself'), B('array', 'an array')], a: 0, why: B('زي {**a, "x": 1}.', 'Like {**a, "x": 1}.') }
      ] },

    { title: B('الـ DOM: تعدّل الصفحة', 'The DOM: changing the page'),
      goal: B('تلاقي عناصر في الصفحة بـ querySelector، وتغيّر نصها وكلاسها وخصائصها، وتبني جدول من بيانات بأمان (textContent مش innerHTML).', 'Find elements on the page with querySelector, change their text, classes and attributes, and build a table from data safely (textContent, not innerHTML).'),
      learn: [
        { h: B('تلاقي وتغيّر', 'Find and change'),
          p: B('الصفحة كشجرة objects اسمها DOM. `document.querySelector(".total")` أول عنصر يطابق CSS selector، و`querySelectorAll` كلهم. `el.textContent = "..."` يغيّر النص، و`el.classList.add("big")` يضيف class، و`el.setAttribute("href", url)`، و`el.style.color` لون (الأحسن class). الصفحة اللي بيتعدّل فيها تحت.', 'The page is a tree of objects called the DOM. `document.querySelector(".total")` returns the first element matching a CSS selector, and `querySelectorAll` all of them. `el.textContent = "..."` changes the text, `el.classList.add("big")` adds a class, `el.setAttribute("href", url)`, and `el.style.color` sets a colour (a class is better). The page being changed is below.'),
          ex: 'const total = document.querySelector("#total");\ntotal.textContent = "245,910 EGP";\ntotal.classList.add("big");\ndocument.querySelectorAll(".price").forEach(el => {\n  const v = Number(el.textContent);\n  el.textContent = v.toLocaleString("en", { minimumFractionDigits: 2 });\n  if (v > 500) el.style.color = "crimson";\n});\nconsole.log("prices changed:", document.querySelectorAll(".price").length);', run: 'js', html: '<style>.big{font-size:1.6rem;color:#3f8f63}</style><h3>Revenue: <span id="total">…</span></h3><ul><li>Backpack <span class="price">650</span></li><li>Notebook <span class="price">45</span></li><li>Sleeve <span class="price">320</span></li></ul>' },
        { h: B('تبني عناصر', 'Building elements'),
          p: B('`document.createElement("tr")` يعمل عنصر، و`parent.append(child)` يحطه. حط النص بـ `textContent` (آمن؛ أي `<script>` في البيانات يتعرض كنص). `innerHTML` بيفسّر HTML — استخدمه مع نصوص انت كاتبها بس، **عمره** ما يكون مع بيانات جاية من مستخدم أو API (نفس XSS بتاع الأسبوع اللي فات).', '`document.createElement("tr")` makes an element and `parent.append(child)` places it. Set text with `textContent` (safe: any `<script>` in the data shows as text). `innerHTML` parses HTML — use it only with strings you wrote yourself, **never** with data from a user or an API (the same XSS as last week).'),
          ex: 'const rows = [\n  { city: "Cairo", revenue: 128500.5 },\n  { city: "<b>Giza</b>", revenue: 40210 },\n  { city: "Alexandria", revenue: 77300.75 },\n];\nconst tbody = document.querySelector("#cities tbody");\nfor (const r of rows.sort((a, b) => b.revenue - a.revenue)) {\n  const tr = document.createElement("tr");\n  for (const value of [r.city, r.revenue.toLocaleString("en", { minimumFractionDigits: 2 })]) {\n    const td = document.createElement("td");\n    td.textContent = value;          // safe: "<b>Giza</b>" shows as text\n    tr.append(td);\n  }\n  tbody.append(tr);\n}\nconsole.log(tbody.children.length, "rows added");', run: 'js', html: '<table id="cities" border="1" cellpadding="6"><thead><tr><th>City</th><th>Revenue</th></tr></thead><tbody></tbody></table>' },
        { h: B('الـ data attributes والسكربت في الصفحة', 'data attributes and scripts on the page'),
          p: B('حط بيانات على العنصر بـ `data-id="42"` واقراها بـ `el.dataset.id`. والسكربت بيتحط في آخر الـ body أو `<script src="app.js" defer>` في الـ head عشان يشتغل بعد ما الصفحة تتبني. ولو بتجيب JavaScript من CDN، خليه من مصدر رسمي معروف.', 'Store data on an element with `data-id="42"` and read it with `el.dataset.id`. Put the script at the end of the body, or `<script src="app.js" defer>` in the head, so it runs after the page is built. When loading JavaScript from a CDN, use a known official source.'),
          ex: 'document.querySelectorAll("[data-stock]").forEach(li => {\n  const stock = Number(li.dataset.stock);\n  li.append(stock === 0 ? " — out of stock" : ` — ${stock} left`);\n  if (stock === 0) li.classList.add("out");\n});\nconsole.log([...document.querySelectorAll(".out")].map(li => li.dataset.sku));', run: 'js', html: '<style>.out{color:#999;text-decoration:line-through}</style><ul><li data-sku="P-1" data-stock="12">Pen</li><li data-sku="B-7" data-stock="0">Bag</li><li data-sku="N-3" data-stock="4">Notebook</li></ul>' }
      ],
      practice: [
        B('في صفحة «عني»، غيّر العنوان ولون الفقرات بـ JavaScript من الـ Console.', 'On your «About me» page, change the heading and paragraph colours with JavaScript from the Console.'),
        B('ابني قايمة `<ul>` من array أسماء بـ createElement وtextContent.', 'Build a `<ul>` from an array of names with createElement and textContent.'),
        B('جرّب تحط نص فيه `<img src=x onerror=alert(1)>` بـ innerHTML وبـ textContent في ملف محلي وشوف الفرق.', 'Try a string containing `<img src=x onerror=alert(1)>` with innerHTML and with textContent in a local file and see the difference.'),
        B('اقرا data attributes من 5 عناصر واطبعهم في الـ Console.', 'Read the data attributes of 5 elements and log them.')
      ],
      code: [
        { u: B('جدول من أي array of objects', 'A table from any array of objects'), p: 'function renderTable(table, rows, columns) {\n  table.replaceChildren();\n  const head = table.createTHead().insertRow();\n  for (const c of columns) {\n    const th = document.createElement("th");\n    th.textContent = c;\n    head.append(th);\n  }\n  const body = table.createTBody();\n  for (const r of rows) {\n    const tr = body.insertRow();\n    for (const c of columns) tr.insertCell().textContent = r[c] ?? "";\n  }\n}', lang: 'js' }
      ],
      words: [
        { t: 'DOM', m: B('الصفحة كشجرة objects بتقدر تعدّلها بـ JavaScript', 'the page as a tree of objects you can change with JavaScript'), ex: 'document.body' },
        { t: 'querySelector', m: B('بيرجّع أول عنصر بيطابق CSS selector', 'returns the first element matching a CSS selector'), ex: 'document.querySelector("#total")' },
        { t: 'textContent', m: B('نص العنصر (آمن لأي بيانات)', 'an element’s text (safe for any data)'), ex: 'el.textContent = name' },
        { t: 'innerHTML', m: B('الـ HTML اللي جوه العنصر؛ خطر مع بيانات من برّه', 'the HTML inside an element; dangerous with outside data'), ex: 'el.innerHTML = "<b>hi</b>"' },
        { t: 'createElement', m: B('بيعمل عنصر HTML جديد', 'creates a new HTML element'), ex: 'document.createElement("li")' },
        { t: 'classList', m: B('بتضيف وتشيل وتبدّل classes على العنصر', 'adds, removes and toggles an element’s classes'), ex: 'el.classList.toggle("open")' },
        { t: 'data attribute', m: B('بيانات على العنصر بـ data-*', 'data stored on an element with data-*'), ex: 'data-id="42" → el.dataset.id' }
      ],
      read: [{ lib: 'MDN: Introduction to the DOM', what: B('اقرا الصفحة كلها.', 'Read the whole page.') }, { lib: 'The Modern JavaScript Tutorial', what: B('Part 2 الفصل 1: Document (لحد Modifying the document).', 'Part 2 chapter 1: Document (up to Modifying the document).') }],
      challenge: B('اكتب صفحة فيها `<table>` فاضي و`const data = [...]` لـ 10 منتجات، وJavaScript بيرسم الجدول، ويلوّن الصفوف اللي مخزونها أقل من 5، ويكتب الإجمالي تحت — كله بـ textContent.', 'Write a page with an empty `<table>` and `const data = [...]` for 10 products, and JavaScript that draws the table, colours rows with stock under 5 and writes the total below — all with textContent.'),
      quiz: [
        { q: B('`document.querySelectorAll(".x")` بيرجّع:', '`document.querySelectorAll(".x")` returns:'), o: [B('كل العناصر اللي class بتاعها x', 'every element with class x'), B('أول واحد بس', 'only the first'), B('نص', 'text')], a: 0, why: B('NodeList.', 'A NodeList.') },
        { q: B('اسم عميل جاي من API هتحطه في الصفحة بـ:', 'A customer name from an API goes into the page with:'), o: ['textContent', 'innerHTML', 'eval'], a: 0, why: B('آمن من XSS.', 'Safe from XSS.') },
        { q: B('`data-sku="P-1"` بيتقري بـ:', '`data-sku="P-1"` is read with:'), o: ['el.dataset.sku', 'el.sku', 'el.data("sku")'], a: 0, why: B('dataset.', 'dataset.') }
      ] },

    { title: B('الأحداث والفورمز', 'Events and forms'),
      goal: B('ترد على ضغطات وكتابة المستخدم بـ addEventListener، وتمسك الفورم قبل الإرسال وتتحقق منه، وتعمل بحث فوري في جدول، وتحفظ تفضيلات في localStorage.', 'Respond to user clicks and typing with addEventListener, catch a form before it is sent and validate it, filter a table live, and save preferences in localStorage.'),
      learn: [
        { h: B('addEventListener', 'addEventListener'),
          p: B('`button.addEventListener("click", e => {...})` بيشغّل الدالة كل ما المستخدم يدوس. أحداث مهمة: `click` و`input` (كل حرف) و`change` و`submit` و`keydown`. الـ `e` فيه تفاصيل: `e.target` العنصر اللي حصل عليه الحدث. ومع عناصر كتير، حط listener واحد على الأب وشوف `e.target.closest(...)` (event delegation).', '`button.addEventListener("click", e => {...})` runs the function on every click. Key events: `click`, `input` (each keystroke), `change`, `submit` and `keydown`. `e` carries details: `e.target` is the element the event happened on. With many elements, put one listener on the parent and check `e.target.closest(...)` (event delegation).'),
          ex: 'let count = 0;\nconst out = document.querySelector("#count");\ndocument.querySelector("#add").addEventListener("click", () => {\n  count++;\n  out.textContent = count;\n  console.log("clicked", count);\n});\ndocument.querySelector("#list").addEventListener("click", e => {\n  const li = e.target.closest("li");\n  if (!li) return;\n  li.classList.toggle("done");\n  console.log("toggled", li.textContent);\n});\nconsole.log("click the button and the tasks below");', run: 'js', html: '<style>.done{text-decoration:line-through;color:#888}li{cursor:pointer}</style><button id="add">Add one</button> <b id="count">0</b><ul id="list"><li>Send invoices</li><li>Back up files</li><li>Call the supplier</li></ul>' },
        { h: B('الفورم قبل الإرسال', 'The form before sending'),
          p: B('`form.addEventListener("submit", e => { e.preventDefault(); ... })` بيوقف الإرسال العادي عشان تتحقق وتبعت بنفسك. `new FormData(form)` بيجمع كل الحقول، و`Object.fromEntries(...)` بيحوّلها object. اعرض الأخطاء جنب الحقل نفسه، مش alert.', '`form.addEventListener("submit", e => { e.preventDefault(); ... })` stops the normal submission so you can validate and send it yourself. `new FormData(form)` gathers every field and `Object.fromEntries(...)` turns it into an object. Show errors next to the field itself, not in an alert.'),
          ex: 'const form = document.querySelector("form");\nconst msg = document.querySelector("#msg");\nform.addEventListener("submit", e => {\n  e.preventDefault();\n  const data = Object.fromEntries(new FormData(form));\n  const phone = data.phone.replace(/\\D/g, "");\n  if (!/^01[0125]\\d{8}$/.test(phone)) {\n    msg.textContent = "Please enter an Egyptian mobile number.";\n    msg.style.color = "crimson";\n    return;\n  }\n  msg.textContent = `Thanks ${data.name}! (would send ${JSON.stringify({ ...data, phone })})`;\n  msg.style.color = "green";\n  console.log("valid", data);\n});', run: 'js', html: '<form><label>Name <input name="name" required></label><br><label>Mobile <input name="phone" value="010-1234-567"></label><br><button>Send</button></form><p id="msg"></p>' },
        { h: B('بحث فوري وlocalStorage', 'Live search and localStorage'),
          p: B('حدث `input` على خانة بحث + `hidden` على الصفوف اللي مش مطابقة = فلتر فوري من غير سيرفر. و`localStorage.setItem("key", value)` و`getItem` بيحفظوا نص في المتصفح يفضل بعد ما تقفل الصفحة (للتفضيلات زي آخر فلتر — مش للبيانات المهمة ولا الأسرار). في المعاينة هنا الحفظ مقفول للأمان.', 'An `input` event on a search box plus `hidden` on non-matching rows = an instant filter with no server. `localStorage.setItem("key", value)` and `getItem` keep text in the browser after the page closes (for preferences like the last filter — not for important data or secrets). In this preview storage is blocked for safety.'),
          ex: 'const box = document.querySelector("#q");\nconst rows = [...document.querySelectorAll("#t tbody tr")];\nbox.addEventListener("input", () => {\n  const q = box.value.trim().toLowerCase();\n  let shown = 0;\n  for (const tr of rows) {\n    tr.hidden = !tr.textContent.toLowerCase().includes(q);\n    if (!tr.hidden) shown++;\n  }\n  console.log(`"${q}": ${shown} of ${rows.length}`);\n});\nconsole.log("type in the search box");', run: 'js', html: '<input id="q" placeholder="Search…"><table id="t" border="1" cellpadding="5"><tbody><tr><td>Sara</td><td>Cairo</td></tr><tr><td>Omar</td><td>Giza</td></tr><tr><td>Mona</td><td>Cairo</td></tr><tr><td>Hany</td><td>Alexandria</td></tr></tbody></table>' }
      ],
      practice: [
        B('اعمل زرار «الوضع الليلي» بيبدّل class على الـ body، ويفتكر الاختيار في localStorage (في ملف محلي).', 'Make a «dark mode» button that toggles a class on the body and remembers the choice in localStorage (in a local file).'),
        B('اعمل قايمة مهام: input وزرار إضافة، وضغطة على المهمة تشطبها، وزرار مسح.', 'Build a to-do list: an input and an add button, a click to strike a task, and a delete button.'),
        B('ضيف تحقق بـ JavaScript لفورم أسبوع 14 قبل الإرسال برسايل جنب الحقول.', 'Add JavaScript validation to the week 14 form before sending, with messages next to the fields.'),
        B('ضيف بحث فوري لجدول المنتجات بتاع إمبارح.', 'Add a live search to yesterday’s product table.')
      ],
      code: [
        { u: B('event delegation لزراير كتير', 'Event delegation for many buttons'), p: 'document.querySelector("#orders").addEventListener("click", e => {\n  const btn = e.target.closest("button[data-action]");\n  if (!btn) return;\n  const id = btn.closest("[data-id]").dataset.id;\n  if (btn.dataset.action === "paid") markPaid(id);\n  if (btn.dataset.action === "delete") removeOrder(id);\n});', lang: 'js' }
      ],
      words: [
        { t: 'event', m: B('حاجة بتحصل في الصفحة: ضغطة أو كتابة أو إرسال', 'something that happens on the page: a click, typing or a submit'), ex: '"click", "input", "submit"' },
        { t: 'addEventListener', m: B('بيربط دالة بحدث على عنصر', 'attaches a function to an event on an element'), ex: 'btn.addEventListener("click", f)' },
        { t: 'event object', m: B('الـ e اللي فيه تفاصيل الحدث', 'the e holding the event’s details'), ex: 'e.target, e.key' },
        { t: 'preventDefault', m: B('بيوقف التصرف العادي للمتصفح (زي إرسال الفورم)', 'stops the browser’s normal action (like submitting a form)'), ex: 'e.preventDefault()' },
        { t: 'event delegation', m: B('listener واحد على الأب بدل واحد لكل عنصر', 'one listener on the parent instead of one per element'), ex: 'e.target.closest("li")' },
        { t: 'FormData', m: B('بيجمع قيم حقول الفورم', 'collects a form’s field values'), ex: 'Object.fromEntries(new FormData(form))' },
        { t: 'localStorage', m: B('مخزن نصوص صغير في المتصفح بيفضل بعد القفل', 'a small text store in the browser that survives closing'), ex: 'localStorage.setItem("theme", "dark")' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Part 2 الفصل 2: Introduction to Events (أول 4 دروس).', 'Part 2 chapter 2: Introduction to Events (the first 4 lessons).') }, { lib: 'MDN: Learn web development', what: B('اقرا Introduction to events.', 'Read Introduction to events.') }],
      challenge: B('اعمل «حاسبة تقسيط» في صفحة: مبلغ وعدد شهور وفايدة، والنتيجة بتتحدث مع كل حرف (input)، وجدول الأقساط بيترسم، والقيم الأخيرة بتتحفظ في localStorage وترجع لما تفتح الصفحة.', 'Build an «instalment calculator» page: amount, months and rate, with the result updating on every keystroke (input), the instalment table redrawn, and the last values saved to localStorage and restored when the page opens.'),
      quiz: [
        { q: B('عشان الفورم ميتبعتش وتتحقق الأول:', 'To stop a form sending so you can validate first:'), o: ['e.preventDefault()', B('return false في الـ HTML بس', 'only return false in the HTML'), 'form.remove()'], a: 0, why: B('في submit listener.', 'In the submit listener.') },
        { q: B('حدث بيحصل مع كل حرف بيتكتب:', 'The event fired on every typed character:'), o: ['input', 'change', 'submit'], a: 0, why: B('change بعد ما تسيب الخانة.', 'change fires after leaving the field.') },
        { q: B('localStorage مناسب لـ:', 'localStorage is suitable for:'), o: [B('تفضيلات بسيطة زي الثيم', 'simple preferences like the theme'), B('باسوردات', 'passwords'), B('بيانات العملاء المهمة', 'important customer data')], a: 0, why: B('مش آمن ومش مضمون.', 'Neither secure nor guaranteed.') }
      ] },

    { title: B('fetch وasync والرسوم', 'fetch, async and charts'),
      goal: B('تجيب بيانات من API بـ fetch وasync/await، وتبعت لـ n8n Webhook من الصفحة، وتفهم CORS، وترسم رسم بياني بـ Chart.js.', 'Fetch data from an API with fetch and async/await, post to an n8n Webhook from the page, understand CORS, and draw a chart with Chart.js.'),
      learn: [
        { h: B('fetch وasync/await', 'fetch and async/await'),
          p: B('الطلبات في JavaScript مش بتوقف الصفحة: `fetch(url)` بترجّع Promise (وعد بنتيجة بعدين). جوه دالة `async` تكتب `const r = await fetch(url)` و`const data = await r.json()` وكأنه كود عادي. `fetch` مش بتطلّع خطأ على 404/500 — اتأكد من `r.ok` بنفسك، وحط try/catch لأخطاء الشبكة.', 'Requests in JavaScript do not freeze the page: `fetch(url)` returns a Promise (a result that will come later). Inside an `async` function you write `const r = await fetch(url)` and `const data = await r.json()` as if it were normal code. `fetch` does not throw on 404/500 — check `r.ok` yourself, and use try/catch for network errors.'),
          ex: 'async function getUsers() {\n  try {\n    const r = await fetch("https://jsonplaceholder.typicode.com/users");\n    if (!r.ok) throw new Error(`HTTP ${r.status}`);\n    const users = await r.json();\n    console.log(users.length, "users");\n    for (const u of users.slice(0, 4)) console.log(u.name, "—", u.address.city);\n  } catch (err) {\n    console.error("failed:", err.message);\n  }\n}\ngetUsers();\nconsole.log("this prints first: fetch does not block");', run: 'js' },
        { h: B('ابعت لـ n8n من الصفحة، وCORS', 'Post to n8n from the page, and CORS'),
          p: B('`fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })`. المتصفح بيطبّق CORS: الصفحة متقدرش تقرا رد من دومين تاني غير لو السيرفر سامح بـ `Access-Control-Allow-Origin`. في n8n: Webhook node → Options → Allowed Origins (CORS). وعمرك ما تحط مفتاح API سري في JavaScript الصفحة — أي حد يقدر يشوفه؛ خلي n8n أو سيرفرك هو اللي يكلّم الخدمة.', '`fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })`. Browsers enforce CORS: a page cannot read a response from another domain unless the server allows it with `Access-Control-Allow-Origin`. In n8n: Webhook node → Options → Allowed Origins (CORS). And never put a secret API key in page JavaScript — anyone can see it; let n8n or your server talk to the service.'),
          ex: 'async function sendLead(data) {\n  const r = await fetch("https://YOUR-N8N/webhook/new-lead", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(data),\n  });\n  if (!r.ok) throw new Error(`n8n answered ${r.status}`);\n  return r.json();\n}\n\ndocument.querySelector("form").addEventListener("submit", async e => {\n  e.preventDefault();\n  const btn = e.target.querySelector("button");\n  btn.disabled = true;\n  try {\n    await sendLead(Object.fromEntries(new FormData(e.target)));\n    e.target.replaceWith("Thanks! We will call you.");\n  } catch (err) {\n    btn.disabled = false;\n    alert("Could not send, please try again.");\n  }\n});', lang: 'js' },
        { h: B('رسم بياني بـ Chart.js', 'A chart with Chart.js'),
          p: B('حمّل Chart.js من CDN رسمي، وحط `<canvas>`، و`new Chart(canvas, { type: "bar", data: { labels, datasets: [{ label, data }] } })`. الأنواع: bar وline وpie وdoughnut. البيانات ممكن تيجي من ملف JSON Python طلّعه (`fetch("data.json")`) — كده لوحتك بتتحدث لوحدها كل ما السكربت يشتغل.', 'Load Chart.js from an official CDN, add a `<canvas>`, then `new Chart(canvas, { type: "bar", data: { labels, datasets: [{ label, data }] } })`. Types: bar, line, pie and doughnut. The data can come from a JSON file Python produced (`fetch("data.json")`) — so your dashboard updates itself every time the script runs.'),
          ex: '<canvas id="c" height="160"></canvas>\n<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js"></script>\n<script>\n  const sales = { Cairo: 128500, Alexandria: 77300, Giza: 40210, Mansoura: 21900 };\n  new Chart(document.getElementById("c"), {\n    type: "bar",\n    data: { labels: Object.keys(sales), datasets: [{ label: "Revenue (EGP)", data: Object.values(sales), backgroundColor: "#3f8f63" }] },\n    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }\n  });\n  console.log("chart drawn");\n</script>', run: 'html' }
      ],
      practice: [
        B('هات بوستات مستخدم من JSONPlaceholder بـ fetch واعرضها في الصفحة بـ textContent.', 'Fetch a user’s posts from JSONPlaceholder and show them on the page with textContent.'),
        B('جرّب fetch على URL غلط وعلى httpbin.org/status/500 وشوف إمتى catch بتشتغل وإمتى r.ok.', 'Try fetch on a wrong URL and on httpbin.org/status/500 and see when catch fires and when r.ok matters.'),
        B('ابعت فورم أسبوع 14 لـ n8n بـ fetch وفعّل Allowed Origins في الـ Webhook.', 'Send the week 14 form to n8n with fetch and enable Allowed Origins on the Webhook.'),
        B('ارسم line chart للإيراد اليومي من بيانات أسبوع 11.', 'Draw a line chart of daily revenue from week 11’s data.')
      ],
      code: [
        { u: B('لوحة بتقرا data.json', 'A dashboard reading data.json'), p: '// Python writes out/data.json; the page reads it\nasync function load() {\n  const data = await (await fetch("data.json", { cache: "no-store" })).json();\n  document.querySelector("#updated").textContent = data.generated_at;\n  new Chart(document.querySelector("#byCity"), {\n    type: "bar",\n    data: { labels: data.cities.map(c => c.city), datasets: [{ label: "Revenue", data: data.cities.map(c => c.revenue) }] },\n  });\n}\nload().catch(err => console.error(err));', lang: 'js' }
      ],
      words: [
        { t: 'fetch', m: B('دالة المتصفح لعمل طلبات HTTP', 'the browser function for making HTTP requests'), ex: 'await fetch(url)' },
        { t: 'Promise', m: B('وعد بنتيجة هتيجي بعدين', 'a promise of a result that comes later'), ex: 'fetch(url).then(r => r.json())' },
        { t: 'async/await', m: B('طريقة تكتب كود بيستنى من غير ما يوقف الصفحة', 'a way to write waiting code without freezing the page'), ex: 'const data = await r.json()' },
        { t: 'CORS', m: B('قاعدة المتصفح اللي بتمنع قراية ردود دومين تاني إلا لو سمح', 'the browser rule blocking reads from another domain unless it allows it'), ex: 'Access-Control-Allow-Origin' },
        { t: 'Chart.js', m: B('مكتبة رسوم بيانية JavaScript مجانية', 'a free JavaScript charting library'), ex: 'new Chart(canvas, {...})' },
        { t: 'canvas', m: B('مساحة رسم في الصفحة', 'a drawing area on the page'), ex: '<canvas id="c"></canvas>' },
        { t: 'CDN', m: B('شبكة بتوزّع ملفات المكتبات بسرعة من أماكن كتير', 'a network serving library files quickly from many places'), ex: 'cdn.jsdelivr.net' }
      ],
      read: [{ lib: 'MDN: Using the Fetch API', what: B('اقرا Making a request وChecking response status وSending a request with JSON.', 'Read Making a request, Checking response status and sending JSON.') }, { lib: 'The Modern JavaScript Tutorial', what: B('Part 1 الفصل 11: Promises وAsync/await.', 'Part 1 chapter 11: Promises and Async/await.') }],
      challenge: B('اعمل صفحة «طقس 5 مدن» بتجيب من Open-Meteo بـ fetch (من غير مفتاح)، وترسم line chart بدرجات الحرارة الجاية لكل مدينة، وفيها select تختار المدينة، ورسالة واضحة لو النت فاصل.', 'Build a «weather for 5 cities» page that fetches from Open-Meteo (no key), draws a line chart of the coming temperatures per city, has a select to pick the city, and shows a clear message when offline.'),
      quiz: [
        { q: B('`fetch` على رد 404:', '`fetch` on a 404 response:'), o: [B('مبتطلّعش خطأ؛ r.ok بيبقى false', 'does not throw; r.ok is false'), B('بتطلّع خطأ', 'throws'), B('بترجّع null', 'returns null')], a: 0, why: B('اتأكد من r.ok.', 'Check r.ok.') },
        { q: B('مفتاح API سري في JavaScript الصفحة:', 'A secret API key in page JavaScript:'), o: [B('غلط: أي حد يشوفه', 'wrong: anyone can see it'), B('عادي لو الكود مضغوط', 'fine if minified'), B('عادي لو في متغير const', 'fine in a const')], a: 0, why: B('خليه في n8n أو السيرفر.', 'Keep it in n8n or on a server.') },
        { q: B('الصفحة مش قادرة تقرا رد Webhook بسبب CORS. الحل:', 'The page cannot read a Webhook response because of CORS. The fix:'), o: [B('تسمح بالدومين في Allowed Origins', 'allow the domain in Allowed Origins'), B('تشيل try/catch', 'remove try/catch'), B('تستخدم GET', 'use GET')], a: 0, why: B('السيرفر لازم يسمح.', 'The server must allow it.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تحوّل لوحة الأسبوع اللي فات لصفحة تفاعلية بـ JavaScript وبيانات من Python، وتعدّي الاختبار.', 'Turn last week’s dashboard into an interactive page with JavaScript and data from Python, and pass the test.'),
      review: [
        B('const وlet، والـ template literals، و===، والدوال والـ arrow functions.', 'const and let, template literals, ===, functions and arrow functions.'),
        B('map وfilter وreduce وfind وsort، والـ destructuring والـ spread، و?. و??، وJSON.', 'map, filter, reduce, find and sort; destructuring and spread; ?. and ??; JSON.'),
        B('الـ DOM: querySelector وtextContent (مش innerHTML) وcreateElement وclassList وdataset.', 'The DOM: querySelector, textContent (not innerHTML), createElement, classList and dataset.'),
        B('الأحداث: addEventListener وpreventDefault وFormData والـ delegation وlocalStorage.', 'Events: addEventListener, preventDefault, FormData, delegation and localStorage.'),
        B('fetch وasync/await وr.ok وCORS وChart.js، ومفيش أسرار في الصفحة.', 'fetch, async/await, r.ok, CORS and Chart.js, and no secrets in the page.')
      ],
      project: B('**لوحة المبيعات التفاعلية** (`dashboard/` من الأسبوع اللي فات): Python بيطلّع `out/data.json` (الطلبات والملخصات ووقت التحديث) بدل ما يكتب الأرقام في الـ HTML. الصفحة بتعمل fetch للملف، وترسم: كروت أرقام، وbar chart للمدن، وline chart يومي، وجدول طلبات فيه بحث فوري وفلتر بالمدينة (select) وترتيب بالضغط على العنوان، وكل ده بـ textContent. الفلتر الأخير بيتحفظ في localStorage. وزرار «ابعت ملخص لـ n8n» بيعمل POST لـ Webhook (بـ CORS مظبوط) ويظهر رسالة نجاح أو فشل. شغّلها بـ `python -m http.server` في فولدر out.', '**The interactive sales dashboard** (`dashboard/` from last week): Python writes `out/data.json` (the orders, the summaries and the update time) instead of writing numbers into the HTML. The page fetches the file and draws number cards, a bar chart of cities, a daily line chart, and an orders table with live search, a city filter (select) and sorting by clicking a header, all with textContent. The last filter is saved to localStorage. A «send summary to n8n» button POSTs to a Webhook (with CORS set up) and shows success or failure. Serve it with `python -m http.server` in the out folder.'),
      test: [
        { q: B('تعريف متغير مش هيتعاد تعيينه في JS:', 'Declaring a variable that will not be reassigned in JS:'), o: ['const', 'let', 'var'], a: 0, why: B('const افتراضيًا.', 'const by default.') },
        { q: B('`[3, 1, 2].sort((a, b) => a - b)`:', '`[3, 1, 2].sort((a, b) => a - b)`:'), o: ['[1, 2, 3]', '[3, 2, 1]', '[3, 1, 2]'], a: 0, why: B('تصاعدي.', 'Ascending.') },
        { q: B('`[1, 2, 3, 4].filter(n => n % 2 === 0)`:', '`[1, 2, 3, 4].filter(n => n % 2 === 0)`:'), o: ['[2, 4]', '[1, 3]', 'true'], a: 0, why: B('الزوجي.', 'The even ones.') },
        { q: B('`const { a, b = 5 } = { a: 1 }`؛ b:', '`const { a, b = 5 } = { a: 1 }`; b is:'), o: ['5', 'undefined', '1'], a: 0, why: B('قيمة افتراضية.', 'A default value.') },
        { q: B('`user?.address?.city` لو user = null:', '`user?.address?.city` when user is null:'), o: ['undefined', B('خطأ', 'an error'), 'null'], a: 0, why: B('optional chaining.', 'Optional chaining.') },
        { q: B('أأمن طريقة تحط اسم عميل في عنصر:', 'The safest way to put a customer name into an element:'), o: ['el.textContent = name', 'el.innerHTML = name', 'document.write(name)'], a: 0, why: B('مفيش تفسير HTML.', 'No HTML parsing.') },
        { q: B('عشان تجمع قيم فورم في object:', 'To gather a form’s values into an object:'), o: ['Object.fromEntries(new FormData(form))', 'form.values()', 'JSON.parse(form)'], a: 0, why: B('FormData.', 'FormData.') },
        { q: B('`await` ينفع يتكتب:', '`await` can be written:'), o: [B('جوه دالة async (أو أعلى module)', 'inside an async function (or a module’s top level)'), B('في أي مكان', 'anywhere'), B('في الـ HTML', 'in the HTML')], a: 0, why: B('async.', 'async.') },
        { q: B('`r.ok` بيبقى true لما:', '`r.ok` is true when:'), o: [B('الـ status من 200 لـ 299', 'the status is 200–299'), B('الرد JSON', 'the response is JSON'), B('مفيش نت', 'offline')], a: 0, why: B('2xx.', '2xx.') },
        { q: B('حدث بيحصل لما تدوس زرار:', 'The event fired when you press a button:'), o: ['click', 'input', 'load'], a: 0, why: B('click.', 'click.') },
        { q: B('listener واحد على الأب لكل الأولاد اسمه:', 'One listener on a parent for all its children is called:'), o: ['event delegation', 'event bubbling only', 'callback hell'], a: 0, why: B('delegation.', 'Delegation.') },
        { q: B('الـ CORS بيتظبط في:', 'CORS is configured on:'), o: [B('السيرفر/الـ Webhook', 'the server / the Webhook'), B('الـ CSS', 'the CSS'), B('localStorage', 'localStorage')], a: 0, why: B('السيرفر بيسمح.', 'The server grants it.') }
      ] }
  ]
};
