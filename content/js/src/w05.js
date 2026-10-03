// JavaScript week 5 — objects and JSON.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('الكائنات وJSON', 'Objects and JSON'),
  goal: B('تبني كائنات وتقرا وتغيّر خصايصها بالنقطة والأقواس، وتفك وتنسخ وتدمج بـ destructuring والـ spread، وتمشي في كائنات متداخلة بأمان، وتحوّل من وإلى JSON — نفس شكل كل بيانات APIs وn8n.',
          'Build objects and read and change their properties with dots and brackets, unpack, copy and merge with destructuring and spread, walk nested objects safely, and convert to and from JSON — the shape of all API and n8n data.'),
  days: [
    { title: B('الكائن: خصايص بأسماء', 'The object: named properties'),
      goal: B('تعمل كائن وتقرا وتضيف وتغيّر وتمسح خصايصه، وتعرف إمتى تستخدم النقطة وإمتى الأقواس.', 'Create an object and read, add, change and delete its properties, and know when to use dots and when brackets.'),
      learn: [
        { h: B('كائن = مفتاح: قيمة', 'An object = key: value'),
          p: B('الكائن (**object**) مجموعة خصايص، كل خاصية **مفتاح** (اسم) و**قيمة**: `const order = { id: 7, customer: "Sara", total: 1250, paid: true };`. المصفوفة بتسأل «العنصر رقم كام؟»، والكائن بيسأل «الحقل اسمه إيه؟». القيمة ممكن تبقى أي حاجة: رقم ونص ومصفوفة وكائن تاني ودالة.',
            'An **object** is a set of properties, each a **key** (a name) and a **value**: `const order = { id: 7, customer: "Sara", total: 1250, paid: true };`. An array asks «which item number?», an object asks «which field name?». A value can be anything: a number, a string, an array, another object, a function.'),
          ex: 'const order = {\n  id: 7,\n  customer: "Sara",\n  total: 1250,\n  paid: true,\n  tags: ["vip", "cairo"]\n};\nconsole.log(order.customer, order.total, order.tags[0]);\nconsole.log(order);', run: 'js' },
        { h: B('النقطة والأقواس', 'Dots and brackets'),
          p: B('`order.total` لما تعرف الاسم وهو كلمة عادية. `order["total"]` نفس الحاجة، بس **لازم** الأقواس لو: الاسم في متغير (`order[field]`)، أو فيه مسافة أو شرطة (`row["First Name"]` و`headers["Content-Type"]`)، أو بيبدأ برقم. أعمدة الشيتات وheaders الـ APIs غالبًا محتاجة أقواس.',
            '`order.total` when you know the name and it is an ordinary word. `order["total"]` is the same, but brackets are **required** when: the name is in a variable (`order[field]`), it has a space or dash (`row["First Name"]`, `headers["Content-Type"]`), or it starts with a digit. Sheet columns and API headers often need brackets.'),
          ex: 'const row = { "First Name": "Omar", "Order ID": 55, city: "Giza" };\nconsole.log(row["First Name"], row["Order ID"], row.city);\nconst field = "city";\nconsole.log(row[field]);\nfor (const f of ["First Name", "city"]) console.log(f, "→", row[f]);', run: 'js' },
        { h: B('تضيف وتغيّر وتمسح', 'Adding, changing and deleting'),
          p: B('`order.status = "shipped"` بتضيف خاصية لو مش موجودة أو تغيّرها لو موجودة. `delete order.secret` بتشيلها. الكائن const برضه بيتغيّر محتواه عادي (زي المصفوفة). قراية خاصية مش موجودة بترجّع `undefined` من غير خطأ — ودي مصدر أخطاء كتير، فاتأكد بـ `"field" in obj` أو `Object.hasOwn(obj, "field")`.',
            '`order.status = "shipped"` adds the property if it is missing or changes it if it exists. `delete order.secret` removes it. A const object can still have its contents changed (like an array). Reading a missing property returns `undefined` without an error — a source of many bugs — so check with `"field" in obj` or `Object.hasOwn(obj, "field")`.'),
          ex: 'const user = { name: "Mona", password: "do-not-log" };\nuser.city = "Alexandria";\nuser.name = "Mona Adel";\ndelete user.password;\nconsole.log(user);\nconsole.log("city" in user, Object.hasOwn(user, "password"), user.phone);', run: 'js' },
        { h: B('اختصارات الكتابة', 'Shorthand'),
          p: B('لو اسم المتغير زي اسم الخاصية: `{ name, total }` بدل `{ name: name, total: total }`. ومفتاح محسوب: `{ [field]: value }` بيحط اسم من متغير. ودوال جوه الكائن: `{ total() { return ... } }`. هتشوف الاختصارات دي في كل كود حديث وفي Code node.',
            'When the variable name matches the property name: `{ name, total }` instead of `{ name: name, total: total }`. A computed key: `{ [field]: value }` takes the name from a variable. And functions inside the object: `{ total() { return ... } }`. You will see these shorthands in all modern code and in the Code node.'),
          ex: 'const name = "Hany", total = 900, field = "city";\nconst o = { name, total, [field]: "Cairo", [`is_${field}_set`]: true };\nconsole.log(o);\nconst cart = { items: [100, 250], sum() { return this.items.reduce((a, b) => a + b, 0); } };\nconsole.log(cart.sum());', run: 'js' },
        { h: B('مقارنة الكائنات', 'Comparing objects'),
          p: B('زي المصفوفات: `{ a: 1 } === { a: 1 }` **false** لأنهم كائنين مختلفين في الذاكرة. `===` بيقارن الإشارة مش المحتوى. لو محتاج تعرف «نفس البيانات؟»، قارن الحقول المهمة (`a.id === b.id`)، أو لكائنات بسيطة `JSON.stringify(a) === JSON.stringify(b)` (بشرط نفس ترتيب المفاتيح).',
            'Like arrays: `{ a: 1 } === { a: 1 }` is **false**, because they are two different objects in memory. `===` compares the reference, not the contents. When you need «same data?», compare the important fields (`a.id === b.id`), or for simple objects `JSON.stringify(a) === JSON.stringify(b)` (as long as the keys are in the same order).'),
          ex: 'const a = { id: 1, total: 50 };\nconst b = { id: 1, total: 50 };\nconst c = a;\nconsole.log(a === b, a === c);\nconsole.log(a.id === b.id, JSON.stringify(a) === JSON.stringify(b));', run: 'js' }
      ],
      practice: [
        B('اعمل كائن منتج بـ 7 خصايص (منهم مصفوفة وboolean) واطبع 4 منهم.', 'Make a product object with 7 properties (including an array and a boolean) and print 4 of them.'),
        B('اقرا 3 أعمدة بأسماء فيها مسافات من «صف شيت» بالأقواس.', 'Read 3 columns with spaces in their names from a «sheet row» using brackets.'),
        B('ضيف خاصية وغيّر خاصية وامسح خاصية حساسة من كائن عميل.', 'Add a property, change one and delete a sensitive one from a customer object.'),
        B('اعمل كائن بالاختصار `{ name, total }` ومفتاح محسوب.', 'Build an object with the `{ name, total }` shorthand and a computed key.'),
        B('افحص 4 خصايص موجودة ولا لأ بـ in وObject.hasOwn.', 'Check whether 4 properties exist with in and Object.hasOwn.'),
        B('أثبت إن كائنين بنفس المحتوى مش === وقارنهم صح.', 'Show that two objects with the same contents are not ===, and compare them properly.')
      ],
      code: [
        { u: B('اقرا عمود باسم من متغير', 'Read a column named in a variable'), p: 'const columns = ["Customer Name", "Phone", "Total (EGP)"];\nconst row = { "Customer Name": "Laila", Phone: "01011112222", "Total (EGP)": "1,250" };\nfor (const c of columns) console.log(c.padEnd(14), row[c]);' }
      ],
      words: [
        { t: 'object', m: B('مجموعة خصايص كل واحدة مفتاح وقيمة', 'a set of properties, each a key and a value'), ex: '{ id: 7, total: 50 }' },
        { t: 'property', m: B('خاصية: اسم وقيمة جوه كائن', 'a name and a value inside an object'), ex: 'order.total' },
        { t: 'dot notation', m: B('قراية خاصية بالنقطة', 'reading a property with a dot'), ex: 'user.name' },
        { t: 'bracket notation', m: B('قراية خاصية بالأقواس والاسم كنص', 'reading a property with brackets and the name as text'), ex: 'row["First Name"]' },
        { t: 'computed key', m: B('اسم خاصية جاي من متغير', 'a property name coming from a variable'), ex: '{ [field]: value }' },
        { t: 'shorthand property', m: B('كتابة `{ name }` بدل `{ name: name }`', 'writing `{ name }` instead of `{ name: name }`'), ex: '{ name, total }' },
        { t: 'hasOwn', m: B('بيسأل: الكائن ده نفسه فيه الخاصية دي؟', 'asks: does this object itself have the property?'), ex: 'Object.hasOwn(o, "id")' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Objects: the basics: Objects (بالتمارين).', 'Objects: the basics: Objects (with the exercises).') },
        { lib: 'MDN: Working with objects', what: B('Creating new objects وAccessing properties.', 'Creating new objects and Accessing properties.') }],
      challenge: B('اكتب `pickColumns(row, map)` بتاخد صف شيت بأسماء أعمدة عربي أو بمسافات (`"اسم العميل"` و`"Total (EGP)"`) وجدول تحويل لأسماء نضيفة (`{ "اسم العميل": "name", ... }`) وترجّع كائن جديد بالأسماء النضيفة بس، وتطبع تحذير لو عمود مطلوب مش موجود.', 'Write `pickColumns(row, map)` taking a sheet row with Arabic or spaced column names (`"اسم العميل"`, `"Total (EGP)"`) and a table of clean names (`{ "اسم العميل": "name", ... }`), returning a new object with only the clean names, and printing a warning when a required column is missing.'),
      quiz: [
        { q: B('خاصية اسمها `"Order ID"` تتقري بـ:', 'A property named `"Order ID"` is read with:'), o: ['row["Order ID"]', 'row.Order ID', 'row.OrderID'], a: 0, why: B('فيها مسافة.', 'It has a space.') },
        { q: B('خاصية مش موجودة:', 'A missing property:'), o: ['undefined', 'null', 'ReferenceError'], a: 0, why: B('من غير خطأ.', 'No error.') },
        { q: B('`{ a: 1 } === { a: 1 }`:', '`{ a: 1 } === { a: 1 }`:'), o: ['false', 'true', B('خطأ', 'an error')], a: 0, why: B('كائنين مختلفين.', 'Two different objects.') },
        { q: B('`const name = "X"; const o = { name };` قيمة o:', '`const name = "X"; const o = { name };` o is:'), o: ['{ name: "X" }', '{ "X": "X" }', '{}'], a: 0, why: B('اختصار الخاصية.', 'Shorthand property.') }
      ] },

    { title: B('الكائنات المتداخلة والقراية الآمنة', 'Nested objects and safe reading'),
      goal: B('تمشي جوه كائنات ومصفوفات متداخلة زي ردود الـ APIs، وتقرا بأمان بـ ?. و??، وتطلّع قيم من عمق.', 'Walk nested objects and arrays like API responses, read safely with ?. and ??, and pull values out of the depths.'),
      learn: [
        { h: B('رد API حقيقي متداخل', 'A real, nested API response'),
          p: B('ردود الـ APIs نادرًا تبقى مسطّحة: الطلب جواه customer جواه address جواه city، وجواه items مصفوفة كائنات. القراية بالنقط ورا بعض: `order.customer.address.city`. ارسم الشكل الأول (أو اطبعه بـ `JSON.stringify(x, null, 2)`) قبل ما تكتب الكود، عشان تعرف الطريق لكل قيمة.',
            'API responses are rarely flat: an order holds a customer, which holds an address, which holds a city, plus items, an array of objects. You read with dots one after another: `order.customer.address.city`. Draw the shape first (or print it with `JSON.stringify(x, null, 2)`) before writing code, so you know the path to each value.'),
          ex: 'const order = {\n  id: "A-1001",\n  customer: { name: "Sara", address: { city: "Cairo", street: "Tahrir 5" } },\n  items: [{ sku: "NB", qty: 2, price: 45 }, { sku: "BG", qty: 1, price: 650 }],\n  meta: { source: "website", coupon: null }\n};\nconsole.log(order.customer.address.city, order.items[1].sku, order.items.length);\nconsole.log(JSON.stringify(order.customer, null, 2));', run: 'js' },
        { h: B('?. في كل خطوة ممكن تبقى ناقصة', '?. at every step that may be missing'),
          p: B('لو customer ممكن يبقى null، `order.customer.address` بيقع بـ `TypeError: Cannot read properties of null`. حط `?.` قبل كل خطوة **ممكن** تبقى ناقصة: `order.customer?.address?.city`. ومع المصفوفات: `order.items?.[0]?.sku`. ومع دوال ممكن متبقاش موجودة: `obj.callback?.()`. متحطّهاش في كل حتة من غير سبب — بتخبّي أخطاء حقيقية.',
            'If customer may be null, `order.customer.address` crashes with `TypeError: Cannot read properties of null`. Put `?.` before each step that **may** be missing: `order.customer?.address?.city`. With arrays: `order.items?.[0]?.sku`. With functions that may not exist: `obj.callback?.()`. Do not sprinkle it everywhere for no reason — it hides real bugs.'),
          ex: 'const orders = [\n  { id: 1, customer: { address: { city: "Giza" } }, items: [{ sku: "PN" }] },\n  { id: 2, customer: null, items: [] },\n  { id: 3 }\n];\nfor (const o of orders) {\n  const city = o.customer?.address?.city ?? "unknown";\n  const first = o.items?.[0]?.sku ?? "-";\n  console.log(o.id, city, first);\n}', run: 'js' },
        { h: B('دالة get بمسار نصي', 'A get function with a text path'),
          p: B('أحيانًا المسار نفسه جاي من إعدادات (`"customer.address.city"`). دالة `get(obj, path)` بتقطّع المسار بالنقط وتنزل خطوة خطوة، وترجّع قيمة افتراضية لو أي خطوة ناقصة. دي نفس الفكرة اللي ورا الـ expressions في n8n وورا مكتبات زي lodash.',
            'Sometimes the path itself comes from settings (`"customer.address.city"`). A `get(obj, path)` function splits the path at the dots and walks down step by step, returning a default when any step is missing. It is the same idea behind n8n expressions and libraries such as lodash.'),
          ex: 'function get(obj, path, fallback = undefined) {\n  let cur = obj;\n  for (const key of path.split(".")) {\n    if (cur == null) return fallback;\n    cur = cur[key];\n  }\n  return cur ?? fallback;\n}\nconst order = { customer: { address: { city: "Aswan" } }, items: [{ sku: "NB" }] };\nconsole.log(get(order, "customer.address.city"));\nconsole.log(get(order, "items.0.sku"));\nconsole.log(get(order, "customer.phone.mobile", "no phone"));', run: 'js' },
        { h: B('تسطيح كائن متداخل', 'Flattening a nested object'),
          p: B('عشان تكتب في شيت أو CSV لازم الصف يبقى **مسطّح**: `customer.address.city` يبقى عمود اسمه `"customer.address.city"` أو `"customer_city"`. اكتب الأعمدة اللي محتاجها صراحةً بدل ما تسطّح كل حاجة أوتوماتيك — الشيت هيبقى أنضف، ومش هتتفاجئ بعمود جديد لما الـ API يزوّد حقل.',
            'To write to a sheet or a CSV the row must be **flat**: `customer.address.city` becomes a column named `"customer.address.city"` or `"customer_city"`. Name the columns you need explicitly rather than flattening everything automatically — the sheet stays cleaner, and you will not be surprised by a new column when the API adds a field.'),
          ex: 'function toSheetRow(o) {\n  return {\n    order_id: o.id,\n    customer: o.customer?.name ?? "",\n    city: o.customer?.address?.city ?? "",\n    items: o.items?.length ?? 0,\n    total: (o.items ?? []).reduce((s, i) => s + i.qty * i.price, 0)\n  };\n}\nconst o = { id: "A-1", customer: { name: "Omar", address: { city: "Alex" } }, items: [{ qty: 2, price: 45 }, { qty: 1, price: 650 }] };\nconsole.log(toSheetRow(o));', run: 'js' },
        { h: B('اللف على مصفوفة جوه كائن جوه مصفوفة', 'Looping an array inside an object inside an array'),
          p: B('أكتر شكل هتقابله: طلبات (مصفوفة)، كل طلب فيه items (مصفوفة). عشان تعمل «سطر لكل منتج» (زي Split Out في n8n): لف على الطلبات وجوه كل واحد لف على items، واعمل كائن جديد فيه بيانات الطلب + بيانات المنتج. ده اللي هتكتبه في Code node لما node جاهزة متعملش اللي محتاجه.',
            'The shape you will meet most: orders (an array), each with items (an array). To make «one line per product» (like n8n’s Split Out): loop over the orders and, inside each, over its items, building a new object with the order’s data plus the product’s. You will write this in a Code node when a ready-made node does not do what you need.'),
          ex: 'const orders = [\n  { id: 1, city: "Cairo", items: [{ sku: "NB", qty: 2 }, { sku: "PN", qty: 5 }] },\n  { id: 2, city: "Giza", items: [{ sku: "BG", qty: 1 }] }\n];\nconst lines = [];\nfor (const o of orders) {\n  for (const it of o.items) lines.push({ order: o.id, city: o.city, ...it });\n}\nconsole.table(lines);', run: 'js' }
      ],
      practice: [
        B('ارسم (أو اطبع منسّق) شكل رد API متداخل فيه 3 مستويات.', 'Draw (or pretty-print) the shape of a nested API response with 3 levels.'),
        B('اقرا 5 قيم من عمق بالنقط، وبعدين بـ ?. و?? لنسخة ناقصة.', 'Read 5 deep values with dots, then with ?. and ?? from an incomplete copy.'),
        B('اكتب `get(obj, path, fallback)` وجرّبها على 6 مسارات منها مسارات ناقصة.', 'Write `get(obj, path, fallback)` and try it on 6 paths, some of them missing.'),
        B('حوّل 3 طلبات متداخلة لصفوف شيت مسطّحة بأعمدة محددة.', 'Turn 3 nested orders into flat sheet rows with chosen columns.'),
        B('اعمل «سطر لكل منتج» من 4 طلبات فيها items.', 'Make «one line per product» from 4 orders with items.'),
        B('اكتب تعليق إمتى ?. بتفيد وإمتى بتخبّي غلطة.', 'Write a comment on when ?. helps and when it hides a bug.')
      ],
      code: [
        { u: B('Split Out بإيدك في Code node', 'Split Out by hand in a Code node'), p: '// n8n Code node, Run Once for All Items\nconst out = [];\nfor (const item of $input.all()) {\n  const o = item.json;\n  for (const line of o.items ?? []) out.push({ json: { orderId: o.id, ...line } });\n}\nreturn out;' }
      ],
      words: [
        { t: 'nested object', m: B('كائن جوه كائن', 'an object inside an object'), ex: 'order.customer.address' },
        { t: 'path', m: B('الطريق لقيمة جوه كائن متداخل', 'the route to a value inside a nested object'), ex: '"customer.address.city"' },
        { t: 'flatten', m: B('تحويل كائن متداخل لصف مسطّح', 'turning a nested object into a flat row'), ex: 'customer_city' },
        { t: 'response', m: B('الرد اللي بيرجع من API', 'the reply an API sends back'), ex: 'the JSON response' },
        { t: 'payload', m: B('البيانات اللي بتتبعت أو بترجع في طلب', 'the data sent or returned in a request'), ex: 'the webhook payload' },
        { t: 'default value', m: B('قيمة بديلة لو الأصلية ناقصة', 'a value used when the original is missing'), ex: 'city ?? "unknown"' },
        { t: 'Split Out', m: B('node في n8n بتعمل item لكل عنصر في مصفوفة', 'an n8n node that makes one item per array element'), ex: 'Split Out on items' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Optional chaining \'?.\' (كله).', 'Optional chaining \'?.\' (all of it).') },
        { lib: 'n8n Docs: Code node', what: B('Using the Code node: الجزء الخاص بشكل الـ items والإرجاع.', 'Using the Code node: the part about the shape of items and returning them.') }],
      challenge: B('خد رد API وهمي لـ 5 طلبات (اكتبه انت، 3 مستويات، وفيه حقول ناقصة) واطلع منه: جدول سطر لكل منتج، وإجمالي كل مدينة، وقايمة الطلبات اللي ناقصها عنوان — بـ ?. و?? ومن غير ولا TypeError.', 'Take a fake API response for 5 orders (write it yourself: 3 levels, with missing fields) and produce: a one-line-per-product table, the total per city, and the list of orders missing an address — with ?. and ?? and not a single TypeError.'),
      quiz: [
        { q: B('`null.city`:', '`null.city`:'), o: ['TypeError', 'undefined', 'null'], a: 0, why: B('مينفعش تقرا من null.', 'You cannot read from null.') },
        { q: B('`order.items?.[0]?.sku` لو items فاضية:', '`order.items?.[0]?.sku` when items is empty:'), o: ['undefined', 'TypeError', '""'], a: 0, why: B('[0] بيرجّع undefined وبعدين ?. بيوقف.', '[0] is undefined, then ?. stops.') },
        { q: B('ليه تسمّي أعمدة الشيت صراحةً؟', 'Why name the sheet columns explicitly?'), o: [B('الشيت يفضل نضيف ومستقر', 'the sheet stays clean and stable'), B('أسرع', 'faster'), B('إجباري', 'required')], a: 0, why: B('مفيش أعمدة مفاجئة.', 'No surprise columns.') },
        { q: B('«سطر لكل منتج» محتاج:', '«One line per product» needs:'), o: [B('لوب جوه لوب', 'a loop inside a loop'), B('switch', 'a switch'), B('sort', 'a sort')], a: 0, why: B('الطلبات ثم المنتجات.', 'Orders, then products.') }
      ] },

    { title: B('Object.keys وvalues وentries وfromEntries', 'Object.keys, values, entries and fromEntries'),
      goal: B('تلف على الكائنات وتحوّلها لمصفوفات وترجّعها كائنات، وتعمل فلترة وتحويل لكل الخصايص مرة واحدة.', 'Loop over objects, turn them into arrays and back, and filter or transform every property at once.'),
      learn: [
        { h: B('keys وvalues وentries', 'keys, values and entries'),
          p: B('`Object.keys(o)` مصفوفة الأسماء، و`Object.values(o)` مصفوفة القيم، و`Object.entries(o)` مصفوفة أزواج `[اسم، قيمة]`. بيها تعرف عدد الخصايص (`keys(o).length`)، وتجمع القيم (`values(o).reduce(...)`)، وتلف على الاتنين (`for (const [k, v] of entries(o))`).',
            '`Object.keys(o)` is the array of names, `Object.values(o)` the array of values, and `Object.entries(o)` the array of `[name, value]` pairs. With them you count properties (`keys(o).length`), total values (`values(o).reduce(...)`) and loop over both (`for (const [k, v] of entries(o))`).'),
          ex: 'const stock = { notebook: 40, pen: 3, bag: 0 };\nconsole.log(Object.keys(stock), Object.values(stock));\nconsole.log(Object.entries(stock));\nconsole.log("kinds", Object.keys(stock).length, "units", Object.values(stock).reduce((a, b) => a + b, 0));', run: 'js' },
        { h: B('fromEntries: من أزواج لكائن', 'fromEntries: from pairs to an object'),
          p: B('`Object.fromEntries(pairs)` العكس: مصفوفة أزواج ترجع كائن. السحر في الجمع: `entries` ← غيّر أو فلتر المصفوفة ← `fromEntries`. كده تقدر «تشيل كل الحقول الفاضية» أو «تحوّل كل الأسعار لأرقام» أو «تخلي كل المفاتيح حروف صغيرة» في سطر واحد.',
            '`Object.fromEntries(pairs)` does the reverse: an array of pairs becomes an object. The magic is the combination: `entries` → change or filter the array → `fromEntries`. That way you can «drop every empty field», «turn every price into a number» or «lower-case every key» in one line.'),
          ex: 'const raw = { name: " Sara ", email: "", phone: null, city: "Cairo", notes: "  " };\nconst cleaned = Object.fromEntries(\n  Object.entries(raw)\n    .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])\n    .filter(([k, v]) => v !== "" && v != null)\n);\nconsole.log(cleaned);', run: 'js' },
        { h: B('تحويل أسماء المفاتيح', 'Renaming keys'),
          p: B('الـ APIs والشيتات كل واحد بيسمّي بطريقته: `"Customer Name"` و`customer_name` و`customerName`. اعمل دالة توحّد الأسماء: lowercase، والمسافات والشرط لـ `_`. أو جدول تحويل صريح للحقول المهمة. المهم إن كل الكود بعد كده يتعامل مع أسماء ثابتة.',
            'APIs and sheets each name things their own way: `"Customer Name"`, `customer_name`, `customerName`. Write a function that unifies the names: lower case, spaces and dashes to `_`. Or an explicit mapping table for the important fields. What matters is that all later code deals with stable names.'),
          ex: 'const snake = k => k.trim().toLowerCase().replace(/[\\s-]+/g, "_");\nconst row = { "Customer Name": "Omar", "Phone-Number": "0100", " City ": "Giza" };\nconst normal = Object.fromEntries(Object.entries(row).map(([k, v]) => [snake(k), v]));\nconsole.log(normal);', run: 'js' },
        { h: B('عدّ وجمّع بكائن', 'Counting and grouping with an object'),
          p: B('افتكر نمط العدّاد: `counts[key] = (counts[key] ?? 0) + 1`. ونمط التجميع في مصفوفات: `groups[key] ??= []; groups[key].push(x);` (`??=` يعني «لو مش موجود حط القيمة دي»). وفيه `Object.groupBy(arr, fn)` جاهزة في المتصفحات وNode الحديثين — بترجّع كائن كل مفتاح فيه مصفوفة.',
            'Remember the counter pattern: `counts[key] = (counts[key] ?? 0) + 1`. And the grouping pattern with arrays: `groups[key] ??= []; groups[key].push(x);` (`??=` means «if missing, set this value»). There is also a ready `Object.groupBy(arr, fn)` in modern browsers and Node — it returns an object whose every key holds an array.'),
          ex: 'const tickets = [\n  { id: 1, team: "support" }, { id: 2, team: "sales" },\n  { id: 3, team: "support" }, { id: 4, team: "billing" }\n];\nconst groups = {};\nfor (const t of tickets) {\n  groups[t.team] ??= [];\n  groups[t.team].push(t.id);\n}\nconsole.log(groups);\nif (Object.groupBy) console.log(Object.keys(Object.groupBy(tickets, t => t.team)));', run: 'js' },
        { h: B('دمج الإعدادات بالقيم الافتراضية', 'Merging settings with defaults'),
          p: B('نمط مهم: إعدادات افتراضية + إعدادات المستخدم: `const settings = { ...defaults, ...userSettings };` — اللي بعد بيكتب فوق اللي قبل. بس خلي بالك: الـ spread سطحي، فلو فيه كائن جوه (زي `email: { from, replyTo }`) هيتبدّل كله مش يتدمج. للمستوى التاني ادمجه لوحده.',
            'An important pattern: default settings + the user’s settings: `const settings = { ...defaults, ...userSettings };` — later ones overwrite earlier ones. But careful: spread is shallow, so a nested object (like `email: { from, replyTo }`) is replaced wholesale, not merged. Merge the second level separately.'),
          ex: 'const defaults = { currency: "EGP", vat: 0.14, email: { from: "shop@x.com", replyTo: "help@x.com" } };\nconst user = { vat: 0, email: { from: "me@y.com" } };\nconst shallow = { ...defaults, ...user };\nconsole.log(shallow.email);   // replyTo is gone!\nconst merged = { ...defaults, ...user, email: { ...defaults.email, ...user.email } };\nconsole.log(merged);', run: 'js' }
      ],
      practice: [
        B('اطبع عدد الخصايص ومجموع القيم لكائن مخزن.', 'Print the number of properties and the sum of values of a stock object.'),
        B('شيل كل الحقول الفاضية من كائن عميل بـ entries وfilter وfromEntries.', 'Drop every empty field from a customer object with entries, filter and fromEntries.'),
        B('وحّد أسماء 6 أعمدة شيت لـ snake_case.', 'Unify 6 sheet column names to snake_case.'),
        B('جمّع 10 تذاكر دعم حسب الفريق بـ ??= وpush.', 'Group 10 support tickets by team with ??= and push.'),
        B('ادمج إعدادات افتراضية مع إعدادات مستخدم، والمستوى التاني لوحده.', 'Merge default settings with user settings, handling the second level separately.'),
        B('حوّل كائن أسعار نصوص لأرقام في سطر واحد.', 'Turn an object of prices as text into numbers in one line.')
      ],
      code: [
        { u: B('mapValues', 'mapValues'), p: 'const mapValues = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));\nconsole.log(mapValues({ a: "10", b: "2.5" }, Number));\nconsole.log(mapValues({ cairo: 1200, giza: 400 }, v => v * 1.14));' }
      ],
      words: [
        { t: 'Object.keys', m: B('مصفوفة أسماء خصايص الكائن', 'the array of an object’s property names'), ex: 'Object.keys(o)' },
        { t: 'Object.values', m: B('مصفوفة قيم الكائن', 'the array of an object’s values'), ex: 'Object.values(o)' },
        { t: 'Object.entries', m: B('مصفوفة أزواج [اسم، قيمة]', 'the array of [name, value] pairs'), ex: 'Object.entries(o)' },
        { t: 'fromEntries', m: B('يعمل كائن من أزواج', 'builds an object from pairs'), ex: 'Object.fromEntries(pairs)' },
        { t: 'snake_case', m: B('أسماء بحروف صغيرة و_ بين الكلمات', 'names in lower case with _ between words'), ex: 'customer_name' },
        { t: 'defaults', m: B('القيم الافتراضية قبل ما المستخدم يغيّر', 'the default values before the user changes them'), ex: '{ ...defaults, ...user }' },
        { t: 'logical nullish assignment', m: B('??= : حط القيمة لو المتغير null أو undefined', '??=: set the value if the variable is null or undefined'), ex: 'groups[k] ??= []' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Object.keys, values, entries بالتمارين.', 'Object.keys, values, entries, with the exercises.') },
        { lib: 'MDN: JavaScript Reference', what: B('Object.fromEntries() وObject.groupBy().', 'Object.fromEntries() and Object.groupBy().') }],
      challenge: B('اكتب `normalizeRow(row, schema)`: schema بيقول لكل حقل نضيف: اسمه في الشيت، ونوعه (text/number/bool/date)، وهل هو مطلوب. الدالة ترجّع `{ data, problems }` بالأسماء النضيفة والأنواع الصح، وتجرّبها على 6 صفوف من شيتين بأسماء أعمدة مختلفة.', 'Write `normalizeRow(row, schema)`: the schema says, for each clean field, its name in the sheet, its type (text/number/bool/date) and whether it is required. The function returns `{ data, problems }` with clean names and correct types — try it on 6 rows from two sheets with different column names.'),
      quiz: [
        { q: B('`Object.entries({ a: 1 })`:', '`Object.entries({ a: 1 })`:'), o: ['[["a", 1]]', '["a", 1]', '{ a: 1 }'], a: 0, why: B('مصفوفة أزواج.', 'An array of pairs.') },
        { q: B('العكس بتاع entries:', 'The opposite of entries:'), o: ['Object.fromEntries', 'Object.keys', 'Object.assign'], a: 0, why: B('من أزواج لكائن.', 'From pairs to an object.') },
        { q: B('`{ ...{ a: 1 }, ...{ a: 2 } }.a`:', '`{ ...{ a: 1 }, ...{ a: 2 } }.a`:'), o: ['2', '1', '[1, 2]'], a: 0, why: B('اللي بعد بيكتب فوق.', 'The later one wins.') },
        { q: B('`x ??= 5` لو x قيمته 0:', '`x ??= 5` when x is 0:'), o: [B('تفضل 0', 'stays 0'), B('تبقى 5', 'becomes 5'), B('خطأ', 'an error')], a: 0, why: B('0 مش null.', '0 is not null.') }
      ] },

    { title: B('JSON: الشكل اللي كل الأنظمة بتتكلم بيه', 'JSON: the format every system speaks'),
      goal: B('تحوّل من كائن لنص JSON والعكس، وتعرف قواعده وأخطاءه، وتتعامل مع التواريخ والأرقام الكبيرة والحقول الحساسة.', 'Convert from object to JSON text and back, know its rules and errors, and handle dates, big numbers and sensitive fields.'),
      learn: [
        { h: B('JSON مش كائن: ده نص', 'JSON is not an object: it is text'),
          p: B('**JSON** (JavaScript Object Notation) طريقة تكتب بيانات **كنص** شكلها زي كائنات JS. ده اللي بيتبعت بين الأنظمة: APIs وwebhooks وملفات الإعدادات وn8n. قواعده أشد من JS: المفاتيح **لازم** بين `"` (مش \')، ومفيش فاصلة في آخر عنصر، ومفيش تعليقات ولا undefined ولا دوال. القيم: نص ورقم وtrue/false وnull ومصفوفة وكائن.',
            '**JSON** (JavaScript Object Notation) is a way to write data **as text** that looks like JS objects. It is what travels between systems: APIs, webhooks, settings files and n8n. Its rules are stricter than JS: keys **must** be in `"` (not \'), no comma after the last item, no comments, no undefined and no functions. Values: string, number, true/false, null, array and object.'),
          ex: 'const text = \'{"id": 7, "customer": "Sara", "tags": ["vip"], "paid": true, "coupon": null}\';\nconsole.log(typeof text, text.length);\nconst order = JSON.parse(text);\nconsole.log(typeof order, order.customer, order.tags[0], order.coupon);', run: 'js' },
        { h: B('JSON.stringify: من كائن لنص', 'JSON.stringify: from object to text'),
          p: B('`JSON.stringify(obj)` بيطلّع سطر واحد مضغوط (للإرسال). `JSON.stringify(obj, null, 2)` بيطلّع نص منسّق بمسافتين (للقراية والملفات واللوجات). اللي بيضيع: الخصايص اللي قيمتها undefined أو دالة بتختفي، والتواريخ بتتحوّل لنص ISO، وNaN بيبقى null.',
            '`JSON.stringify(obj)` produces one compact line (for sending). `JSON.stringify(obj, null, 2)` produces text indented with two spaces (for reading, files and logs). What gets lost: properties whose value is undefined or a function disappear, dates become ISO text, and NaN becomes null.'),
          ex: 'const o = { id: 1, when: new Date("2026-10-03T08:00:00Z"), note: undefined, total: NaN, fn() {} };\nconsole.log(JSON.stringify(o));\nconsole.log(JSON.stringify({ a: 1, b: [1, 2] }, null, 2));', run: 'js' },
        { h: B('JSON.parse والأخطاء', 'JSON.parse and its errors'),
          p: B('`JSON.parse(text)` بيرمي **SyntaxError** لو النص مش JSON سليم: علامة \' بدل "، أو فاصلة زيادة، أو صفحة HTML بدل JSON (`Unexpected token <`). البيانات اللي من برّه (body، ملف، رد API) لازم تتقري جوه try/catch. وفي n8n ساعات الـ JSON بيوصل كنص جوه حقل — لازم parse.',
            '`JSON.parse(text)` throws a **SyntaxError** when the text is not valid JSON: \' instead of ", an extra comma, or an HTML page instead of JSON (`Unexpected token <`). Data from outside (a body, a file, an API reply) must be parsed inside try/catch. In n8n, JSON sometimes arrives as text inside a field — it needs parsing.'),
          ex: 'function safeParse(text) {\n  try {\n    return { ok: true, data: JSON.parse(text) };\n  } catch (err) {\n    return { ok: false, error: err.message };\n  }\n}\nfor (const t of [\'{"a": 1}\', "{\'a\': 1}", \'{"a": 1,}\', "<html>error</html>"]) {\n  console.log(JSON.stringify(t), "→", JSON.stringify(safeParse(t)));\n}', run: 'js' },
        { h: B('اختار الحقول وخبّي الحساس', 'Choosing fields and hiding sensitive ones'),
          p: B('`JSON.stringify(obj, ["id", "total"])` بيطلّع الحقول دي بس. أو دالة replacer: `(key, value) => key === "password" ? undefined : value` بتشيل حقل من أي مستوى. استخدم ده قبل ما تحط أي كائن في لوج أو رسالة — متطبعش كلمات سر أو توكنز أو أرقام كروت أبدًا.',
            '`JSON.stringify(obj, ["id", "total"])` outputs only those fields. Or a replacer function: `(key, value) => key === "password" ? undefined : value` removes a field at any level. Use this before putting any object in a log or a message — never print passwords, tokens or card numbers.'),
          ex: 'const user = { id: 9, name: "Hany", password: "s3cret", api: { token: "tok_live_123", region: "eu" } };\nconsole.log(JSON.stringify(user, ["id", "name"]));\nconst HIDE = new Set(["password", "token"]);\nconsole.log(JSON.stringify(user, (k, v) => HIDE.has(k) ? "***" : v));', run: 'js' },
        { h: B('التواريخ والأرقام في JSON', 'Dates and numbers in JSON'),
          p: B('JSON ملوش نوع تاريخ: بيتبعت نص ISO (`"2026-10-03T08:00:00.000Z"`) وانت بترجّعه بـ `new Date(text)`. والأرقام الكبيرة جدًا (IDs من 19 رقم) ممكن تفقد دقتها لأن JS أكبر رقم صحيح دقيق عنده `Number.MAX_SAFE_INTEGER` (حوالي 9 مليون مليار) — الـ APIs بتبعتها كنص لنفس السبب، فخلّيها نص.',
            'JSON has no date type: dates travel as ISO text (`"2026-10-03T08:00:00.000Z"`) and you turn them back with `new Date(text)`. And very large numbers (19-digit IDs) can lose precision, because the largest exact integer in JS is `Number.MAX_SAFE_INTEGER` (about 9 quadrillion) — APIs send them as text for that reason, so keep them as text.'),
          ex: 'const text = JSON.stringify({ at: new Date("2026-10-03T08:00:00Z") });\nconst back = JSON.parse(text);\nconsole.log(typeof back.at, new Date(back.at).getUTCHours());\nconsole.log(Number.MAX_SAFE_INTEGER);\nconsole.log(JSON.parse(\'{"id": 1234567890123456789}\').id, JSON.parse(\'{"id": "1234567890123456789"}\').id);', run: 'js' }
      ],
      practice: [
        B('اكتب 3 نصوص JSON صح و3 غلط (علامة \'، فاصلة زيادة، تعليق) وجرّبهم بـ safeParse.', 'Write 3 valid JSON texts and 3 invalid ones (\' quotes, an extra comma, a comment) and try them with safeParse.'),
        B('اطبع كائن طلب مرة مضغوط ومرة منسّق.', 'Print an order object once compact and once indented.'),
        B('أثبت إن undefined والدوال بيختفوا في stringify وإن NaN بيبقى null.', 'Show that undefined and functions vanish in stringify and NaN becomes null.'),
        B('خبّي password وtoken في كائن متداخل بـ replacer قبل الطباعة.', 'Hide password and token in a nested object with a replacer before printing.'),
        B('ابعت تاريخ في JSON ورجّعه Date وقارن الساعة.', 'Send a date through JSON, turn it back into a Date, and compare the hour.'),
        B('افتح أي API عام في المتصفح (زي jsonplaceholder) واقرا شكل الـ JSON.', 'Open any public API in the browser (such as jsonplaceholder) and read the JSON’s shape.')
      ],
      code: [
        { u: B('لوج آمن', 'A safe log'), p: 'const SECRET = /pass|token|secret|authorization|card/i;\nconst safeLog = (label, obj) => console.log(label, JSON.stringify(obj, (k, v) => SECRET.test(k) ? "***" : v));\nsafeLog("request", { url: "/pay", headers: { Authorization: "Bearer abc" }, body: { card: "4111", amount: 50 } });' }
      ],
      words: [
        { t: 'JSON', m: B('صيغة نص للبيانات شكلها زي كائنات JS', 'a text format for data shaped like JS objects'), ex: '{"id": 1}' },
        { t: 'serialize', m: B('تحويل كائن لنص عشان يتبعت أو يتحفظ', 'turning an object into text to send or save'), ex: 'JSON.stringify(o)' },
        { t: 'deserialize', m: B('تحويل النص لكائن تاني', 'turning text back into an object'), ex: 'JSON.parse(text)' },
        { t: 'pretty-print', m: B('طباعة منسّقة بمسافات وأسطر', 'printing nicely with indentation and lines'), ex: 'JSON.stringify(o, null, 2)' },
        { t: 'replacer', m: B('دالة بتتحكم في stringify: تغيّر أو تشيل قيم', 'a function steering stringify: changes or removes values'), ex: '(k, v) => …' },
        { t: 'ISO 8601', m: B('الصيغة الدولية للتاريخ والوقت', 'the international date and time format'), ex: '2026-10-03T08:00:00Z' },
        { t: 'sensitive data', m: B('بيانات لازم متظهرش (كلمات سر، توكنز، كروت)', 'data that must not be shown (passwords, tokens, cards)'), ex: 'never log tokens' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('JSON methods, toJSON بالتمارين.', 'JSON methods, toJSON, with the exercises.') },
        { lib: 'JSONPlaceholder', what: B('افتح /users/1 و/posts?userId=1 في المتصفح واقرا شكل الرد.', 'Open /users/1 and /posts?userId=1 in the browser and read the shape of the reply.') }],
      challenge: B('اكتب «مستقبل webhook» تجريبي: دالة `receive(bodyText)` بتعمل safeParse، وتتحقق إن فيه `event` و`data.id`، وتحوّل `data.created_at` لتاريخ، وتخزّن الحدث في مصفوفة من غير الحقول الحساسة، وترجّع `{ status: 200 }` أو `{ status: 400, error }` — وجرّبها على 6 أجسام منها JSON بايظ وصفحة HTML.', 'Write a test «webhook receiver»: `receive(bodyText)` parses safely, checks there is an `event` and a `data.id`, turns `data.created_at` into a date, stores the event in an array without sensitive fields, and returns `{ status: 200 }` or `{ status: 400, error }` — tried on 6 bodies including broken JSON and an HTML page.'),
      quiz: [
        { q: B('أنهي JSON سليم؟', 'Which is valid JSON?'), o: ['{"a": 1}', "{'a': 1}", '{"a": 1,}'], a: 0, why: B('مفاتيح بـ " ومن غير فاصلة زيادة.', 'Keys in " and no extra comma.') },
        { q: B('`JSON.stringify({ a: undefined })`:', '`JSON.stringify({ a: undefined })`:'), o: ['"{}"', '"{\\"a\\":undefined}"', '"{\\"a\\":null}"'], a: 0, why: B('undefined بيختفي.', 'undefined disappears.') },
        { q: B('`Unexpected token <` في JSON.parse معناها غالبًا:', '`Unexpected token <` in JSON.parse usually means:'), o: [B('جالك HTML مش JSON', 'you got HTML, not JSON'), B('JSON طويل', 'the JSON is long'), B('رقم كبير', 'a big number')], a: 0, why: B('صفحة خطأ.', 'An error page.') },
        { q: B('ID من 19 رقم الأحسن يتبعت:', 'A 19-digit ID is best sent as:'), o: [B('نص', 'text'), B('رقم', 'a number'), B('مصفوفة', 'an array')], a: 0, why: B('عشان ميفقدش دقته.', 'So it keeps its precision.') }
      ] },

    { title: B('مشروع: بطاقة عميل من مصادر كتير', 'A project: one customer card from many sources'),
      goal: B('تدمج بيانات عميل جاية من 3 مصادر بأشكال مختلفة في بطاقة واحدة نضيفة، بقواعد أولوية واضحة، وتصدّرها JSON.', 'Merge a customer’s data from 3 sources in different shapes into one clean card, with clear priority rules, and export it as JSON.'),
      learn: [
        { h: B('3 مصادر، 3 أشكال', 'Three sources, three shapes'),
          p: B('الحالة الحقيقية: العميل موجود في **شيت المبيعات** (أعمدة عربي)، و**نظام الدفع** (JSON متداخل بأسماء إنجليزي)، و**CRM** (أسماء camelCase). كل مصدر فيه حقول ناقصة أو قديمة. المطلوب: بطاقة واحدة موحّدة. الخطوة الأولى: اكتب «الشكل الموحّد» اللي عايزه في الآخر.',
            'The real situation: the customer exists in **the sales sheet** (Arabic columns), **the payment system** (nested JSON with English names) and **the CRM** (camelCase names). Each source has missing or stale fields. The goal: one unified card. Step one: write down the «unified shape» you want at the end.'),
          ex: 'const fromSheet = { "اسم العميل": "سارة أحمد", "الموبايل": "010-1234-5678", "المدينة": " القاهرة " };\nconst fromPayments = { customer: { full_name: "Sara Ahmed", email: "SARA@mail.com" }, last_payment: { amount: 1250, at: "2026-09-28T10:00:00Z" } };\nconst fromCrm = { name: "Sara A.", phone: "+20 10 1234 5678", tags: ["vip"], updatedAt: "2026-07-01" };\nconst target = { name: "", nameAr: "", email: "", phone: "", city: "", tags: [], lastPayment: null, sources: [] };\nconsole.log(Object.keys(target));', run: 'js' },
        { h: B('محوّل لكل مصدر', 'An adapter per source'),
          p: B('بدل كود واحد بيعرف كل الأشكال، اعمل **adapter** صغير لكل مصدر: دالة بتاخد شكله الخاص وترجّع جزء من الشكل الموحّد. كده لو المصدر غيّر شكله، بتعدّل دالته بس. ده نمط اسمه Adapter وهتشوفه في كل تكامل بين أنظمة (وفي n8n: Set node بعد كل مصدر).',
            'Instead of one block of code that knows every shape, write a small **adapter** per source: a function taking its own shape and returning part of the unified one. If the source changes its shape, you only touch its function. The pattern is called Adapter and you will see it in every integration between systems (in n8n: a Set node after each source).'),
          ex: 'const digits = s => String(s ?? "").replace(/\\D/g, "").replace(/^20/, "0");\nconst fromSheetAdapter = r => ({ nameAr: r["اسم العميل"]?.trim(), phone: digits(r["الموبايل"]), city: r["المدينة"]?.trim() });\nconst fromPaymentsAdapter = p => ({ name: p.customer?.full_name, email: p.customer?.email?.toLowerCase(), lastPayment: p.last_payment ?? null });\nconst fromCrmAdapter = c => ({ name: c.name, phone: digits(c.phone), tags: c.tags ?? [] });\nconsole.log(fromSheetAdapter({ "اسم العميل": " سارة ", "الموبايل": "010-1234-5678", "المدينة": "Cairo" }));\nconsole.log(fromCrmAdapter({ name: "Sara", phone: "+20 10 1234 5678" }));', run: 'js' },
        { h: B('قواعد الأولوية', 'Priority rules'),
          p: B('لما مصدرين فيهم نفس الحقل بقيمتين مختلفتين، مين يكسب؟ اكتبها صريحة: «الاسم الإنجليزي من نظام الدفع (رسمي) وإلا الـ CRM»، «الموبايل من الشيت (أحدث) وإلا الـ CRM»، «التاجز اتحاد الاتنين». والقيم الفاضية (`""` أو undefined) **متغلبش** قيمة موجودة.',
            'When two sources hold the same field with different values, who wins? Write it explicitly: «the English name from payments (official), otherwise the CRM», «the phone from the sheet (newest), otherwise the CRM», «tags are the union of both». And empty values (`""` or undefined) **never beat** an existing value.'),
          ex: 'const firstFilled = (...values) => values.find(v => v !== undefined && v !== null && String(v).trim() !== "");\nconst sheet = { phone: "01012345678", city: "" };\nconst crm = { phone: "01099999999", city: "Giza", tags: ["vip"] };\nconst pay = { name: "Sara Ahmed" };\nconsole.log({\n  phone: firstFilled(sheet.phone, crm.phone),\n  city: firstFilled(sheet.city, crm.city, "Unknown"),\n  name: firstFilled(pay.name, crm.name),\n  tags: [...new Set([...(crm.tags ?? []), "new"])]\n});', run: 'js' },
        { h: B('سجّل المصدر لكل قيمة', 'Record the source of each value'),
          p: B('في الأنظمة الحقيقية حد هيسأل «الموبايل ده جه منين؟». خلي البطاقة فيها `sources`: لكل حقل اسم المصدر اللي جه منه. ده بيسهّل حل المشاكل، وبيخلّي العميل يصدّقك لما تقوله «الرقم ده من آخر فاتورة». وزوّد `mergedAt` بتاريخ الدمج.',
            'In real systems someone will ask «where did this phone number come from?». Give the card a `sources` record: for each field, the name of the source it came from. It makes troubleshooting easy and makes the customer believe you when you say «that number is from the last invoice». And add `mergedAt` with the merge date.'),
          ex: 'function pick(field, candidates) {\n  for (const [source, value] of candidates) {\n    if (value !== undefined && value !== null && String(value).trim() !== "") return { value, source };\n  }\n  return { value: null, source: null };\n}\nconst phone = pick("phone", [["sheet", ""], ["crm", "01099999999"]]);\nconst card = { phone: phone.value, sources: { phone: phone.source }, mergedAt: new Date("2026-10-03T08:00:00Z").toISOString() };\nconsole.log(JSON.stringify(card, null, 2));', run: 'js' },
        { h: B('تصدير واستيراد البطاقة', 'Exporting and importing the card'),
          p: B('البطاقة النهائية تتحفظ JSON (ملف، أو عمود في قاعدة بيانات، أو تتبعت لـ CRM). اكتب `exportCard(card)` بترجّع نص منسّق من غير حقول حساسة، و`importCard(text)` بتعمل safeParse وتتحقق من الحقول المطلوبة وترجّع البطاقة أو خطأ واضح. الاتنين مع بعض = «round trip» لازم يرجّع نفس البيانات.',
            'The final card is saved as JSON (a file, a database column, or sent to a CRM). Write `exportCard(card)` returning indented text without sensitive fields, and `importCard(text)` doing a safe parse, checking required fields and returning the card or a clear error. Together they make a «round trip» that must give back the same data.'),
          ex: 'const exportCard = card => JSON.stringify(card, (k, v) => k === "internalNotes" ? undefined : v, 2);\nfunction importCard(text) {\n  let c;\n  try { c = JSON.parse(text); } catch (err) { return { error: "not JSON: " + err.message }; }\n  for (const f of ["name", "phone"]) if (!c[f]) return { error: "missing " + f };\n  return { card: c };\n}\nconst card = { name: "Sara Ahmed", phone: "01012345678", internalNotes: "late payer" };\nconst text = exportCard(card);\nconsole.log(text);\nconsole.log(importCard(text), importCard("{}"));', run: 'js' }
      ],
      practice: [
        B('اكتب الشكل الموحّد لبطاقة عميل بـ 9 حقول.', 'Write the unified shape of a customer card with 9 fields.'),
        B('اكتب 3 adapters لـ 3 مصادر بأشكال مختلفة.', 'Write 3 adapters for 3 sources with different shapes.'),
        B('اكتب قواعد الأولوية لكل حقل كتعليقات ونفّذها بـ firstFilled.', 'Write the priority rule for each field as comments and implement it with firstFilled.'),
        B('سجّل مصدر كل قيمة في `sources`.', 'Record each value’s source in `sources`.'),
        B('اكتب exportCard وimportCard وجرّب round trip.', 'Write exportCard and importCard and try a round trip.'),
        B('جرّب الدمج على عميل ناقص من مصدرين.', 'Try the merge on a customer missing from two sources.')
      ],
      code: [
        { u: B('أول قيمة مليانة', 'The first filled value'), p: 'const isFilled = v => v !== undefined && v !== null && !(typeof v === "string" && v.trim() === "") && !(Array.isArray(v) && v.length === 0);\nconst firstFilled = (...values) => values.find(isFilled);\nconsole.log(firstFilled("", null, [], "Cairo"));' }
      ],
      words: [
        { t: 'adapter', m: B('دالة بتحوّل شكل مصدر لشكل موحّد', 'a function turning a source’s shape into the unified one'), ex: 'fromCrmAdapter(c)' },
        { t: 'unified schema', m: B('الشكل الموحّد اللي كل المصادر بتتحوّل له', 'the single shape every source is converted to'), ex: '{ name, email, phone }' },
        { t: 'priority', m: B('مين يكسب لما قيمتين يختلفوا', 'which one wins when two values differ'), ex: 'payments before CRM' },
        { t: 'source of truth', m: B('المصدر اللي بنعتمده كأصح قيمة', 'the source treated as the correct value'), ex: 'payments is the source of truth for names' },
        { t: 'union', m: B('اتحاد: كل القيم من الاتنين من غير تكرار', 'union: all values from both, without repeats'), ex: '[...new Set([...a, ...b])]' },
        { t: 'round trip', m: B('تصدير ثم استيراد ويرجع نفس البيانات', 'export then import, getting the same data back'), ex: 'importCard(exportCard(c))' },
        { t: 'record linkage', m: B('ربط سجلات نفس الشخص من مصادر مختلفة', 'linking records of the same person from different sources'), ex: 'match by phone or email' }
      ],
      read: [{ lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 4: Objects وMutability وThe lycanthrope’s log.', 'Chapter 4: Objects, Mutability and The lycanthrope’s log.') },
        { lib: 'MDN: Working with objects', what: B('Comparing objects وObject destructuring (من صفحة Destructuring).', 'Comparing objects, and Object destructuring (from the Destructuring page).') }],
      challenge: B('وسّع الدمج لـ 10 عملاء من 3 مصادر (اكتب البيانات)، اربط السجلات ببعض بالموبايل بعد التنضيف أو الإيميل، وطلّع: البطاقات الموحّدة، والعملاء اللي في مصدر واحد بس، والتعارضات (نفس العميل بموبايلين مختلفين) في تقرير منفصل.', 'Extend the merge to 10 customers from 3 sources (write the data), linking records by cleaned phone number or email, and produce: the unified cards, the customers found in only one source, and the conflicts (the same customer with two different phones) in a separate report.'),
      quiz: [
        { q: B('الـ adapter بيعمل:', 'An adapter:'), o: [B('يحوّل شكل مصدر للشكل الموحّد', 'turns a source’s shape into the unified one'), B('يحذف البيانات', 'deletes data'), B('يرتّب', 'sorts')], a: 0, why: B('دالة لكل مصدر.', 'One function per source.') },
        { q: B('قيمة فاضية من المصدر الأعلى أولوية:', 'An empty value from the highest-priority source:'), o: [B('متغلبش قيمة موجودة', 'does not beat an existing value'), B('تكسب دايمًا', 'always wins'), B('تمسح الحقل', 'erases the field')], a: 0, why: B('خد أول قيمة مليانة.', 'Take the first filled value.') },
        { q: B('ليه تسجّل مصدر كل قيمة؟', 'Why record each value’s source?'), o: [B('عشان تعرف جت منين وتحل المشاكل', 'to know where it came from and fix problems'), B('عشان الملف يكبر', 'to make the file bigger'), B('إجباري في JSON', 'JSON requires it')], a: 0, why: B('الثقة والمتابعة.', 'Trust and tracing.') },
        { q: B('round trip ناجح يعني:', 'A successful round trip means:'), o: [B('التصدير والاستيراد رجّعوا نفس البيانات', 'export then import gave the same data'), B('الملف اتمسح', 'the file was deleted'), B('JSON أسرع', 'JSON is faster')], a: 0, why: B('مفيش بيانات ضاعت.', 'No data was lost.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تراجع الكائنات وJSON وتسلّم أداة تكامل حقيقية، وتعدّي اختبار الأسبوع.', 'Review objects and JSON, deliver a real integration tool, and pass the weekly test.'),
      review: [
        B('الكائن خصايص مفتاح: قيمة؛ النقطة للأسماء العادية والأقواس للمسافات والمتغيرات.', 'An object is key: value properties; dots for ordinary names, brackets for spaces and variables.'),
        B('خاصية ناقصة = undefined من غير خطأ؛ افحص بـ in أو Object.hasOwn.', 'A missing property is undefined with no error; check with in or Object.hasOwn.'),
        B('`{ name }` اختصار، و`{ [key]: v }` مفتاح محسوب.', '`{ name }` is shorthand, and `{ [key]: v }` a computed key.'),
        B('?. في كل خطوة ممكن تبقى ناقصة، و?? للقيمة البديلة.', '?. at each step that may be missing, and ?? for the fallback.'),
        B('entries ← map/filter ← fromEntries لتحويل كل الخصايص.', 'entries → map/filter → fromEntries to transform every property.'),
        B('`{ ...defaults, ...user }` سطحي: ادمج المستوى التاني لوحده.', '`{ ...defaults, ...user }` is shallow: merge the second level separately.'),
        B('JSON نص بقواعد أشد: مفاتيح بـ "، ومن غير فاصلة زيادة، ومن غير undefined.', 'JSON is text with stricter rules: keys in ", no extra comma, no undefined.'),
        B('JSON.parse جوه try/catch دايمًا، وخبّي الحساس قبل أي لوج.', 'Always JSON.parse inside try/catch, and hide sensitive fields before any log.')
      ],
      project: B('**مشروع الأسبوع: «موحِّد طلبات المتاجر».** عندك طلبات من 3 قنوات بأشكال مختلفة (اكتب 4 طلبات لكل قناة كنصوص JSON): موقع (camelCase متداخل)، وصفحة فيسبوك (شيت بأعمدة عربي)، وتطبيق توصيل (snake_case وأسعار نصوص).\n1. safeParse لكل نص، واعزل البايظ.\n2. adapter لكل قناة بيطلّع الشكل الموحّد: `{ id, channel, customer: { name, phone, city }, items: [{ sku, qty, price }], total, createdAt }`.\n3. احسب total من items دايمًا (متثقش في total اللي جاي).\n4. سطّح لصفوف شيت (سطر لكل منتج) بأعمدة محددة.\n5. صدّر الطلبات الموحّدة JSON منسّق من غير أرقام الموبايل الكاملة (خبّي النص).\n6. تقرير: عدد الطلبات لكل قناة، والإجمالي، والطلبات البايظة بالسبب.',
        '**Weekly project: a «shop-orders unifier».** You have orders from 3 channels in different shapes (write 4 orders per channel as JSON text): a website (nested camelCase), a Facebook page (a sheet with Arabic columns) and a delivery app (snake_case with prices as text).\n1. Safely parse each text and set aside the broken ones.\n2. An adapter per channel producing the unified shape: `{ id, channel, customer: { name, phone, city }, items: [{ sku, qty, price }], total, createdAt }`.\n3. Always compute total from items (never trust the incoming total).\n4. Flatten into sheet rows (one line per product) with chosen columns.\n5. Export the unified orders as indented JSON without full phone numbers (mask the middle).\n6. A report: orders per channel, the grand total, and the broken orders with their reasons.'),
      test: [
        { q: B('`({ a: { b: 1 } }).a.b`:', '`({ a: { b: 1 } }).a.b`:'), o: ['1', 'undefined', '{ b: 1 }'], a: 0, why: B('نقطتين ورا بعض.', 'Two dots in a row.') },
        { q: B('قراية عمود `"Total (EGP)"`:', 'Reading the column `"Total (EGP)"`:'), o: ['row["Total (EGP)"]', 'row.Total (EGP)', 'row.total_egp'], a: 0, why: B('أقواس ونص.', 'Brackets and text.') },
        { q: B('`delete o.x` بيعمل:', '`delete o.x` does:'), o: [B('يشيل الخاصية x', 'removes the property x'), B('يمسح الكائن', 'deletes the object'), B('يخلي x = null', 'sets x to null')], a: 0, why: B('الخاصية بس.', 'Just the property.') },
        { q: B('`a?.b?.c` لو a = {}:', '`a?.b?.c` when a = {}:'), o: ['undefined', 'TypeError', 'null'], a: 0, why: B('b مش موجود فبيوقف.', 'b is missing, so it stops.') },
        { q: B('`Object.keys({ x: 1, y: 2 }).length`:', '`Object.keys({ x: 1, y: 2 }).length`:'), o: ['2', '3', '1'], a: 0, why: B('مفتاحين.', 'Two keys.') },
        { q: B('`Object.fromEntries([["a", 1]])`:', '`Object.fromEntries([["a", 1]])`:'), o: ['{ a: 1 }', '[["a", 1]]', '"a1"'], a: 0, why: B('أزواج لكائن.', 'Pairs to an object.') },
        { q: B('`{ ...a, ...b }` لو الاتنين فيهم نفس المفتاح:', '`{ ...a, ...b }` when both have the same key:'), o: [B('قيمة b تكسب', 'b’s value wins'), B('قيمة a تكسب', 'a’s value wins'), B('خطأ', 'an error')], a: 0, why: B('اللي بعد بيكتب فوق.', 'The later one overwrites.') },
        { q: B('`JSON.parse("{\'a\': 1}")`:', '`JSON.parse("{\'a\': 1}")`:'), o: ['SyntaxError', '{ a: 1 }', 'null'], a: 0, why: B('JSON محتاج ".', 'JSON needs ".') },
        { q: B('`JSON.stringify(new Date("2026-01-01T00:00:00Z"))` بيدّي:', '`JSON.stringify(new Date("2026-01-01T00:00:00Z"))` gives:'), o: ['"\\"2026-01-01T00:00:00.000Z\\""', '{}', 'NaN'], a: 0, why: B('نص ISO.', 'ISO text.') },
        { q: B('قبل ما تطبع كائن فيه توكن:', 'Before printing an object holding a token:'), o: [B('خبّيه بـ replacer', 'hide it with a replacer'), B('اطبعه عادي', 'print it as is'), B('حوّله لأرقام', 'turn it into numbers')], a: 0, why: B('متطبعش أسرار.', 'Never print secrets.') },
        { q: B('أحسن مصدر للـ total في طلب جاي من برّه:', 'The best source for the total of an incoming order:'), o: [B('احسبه من items', 'compute it from the items'), B('صدّق الـ total اللي جاي', 'trust the incoming total'), B('تجاهله', 'ignore it')], a: 0, why: B('متثقش في بيانات برّه.', 'Do not trust outside data.') },
        { q: B('أول قيمة مليانة من ["", null, "Giza"]:', 'The first filled value of ["", null, "Giza"]:'), o: ['"Giza"', '""', 'null'], a: 0, why: B('الفاضي مش بيكسب.', 'Empty values never win.') }
      ] }
  ]
};
