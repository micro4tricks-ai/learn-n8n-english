// JavaScript week 4 — arrays and the month project.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('المصفوفات ومشروع الشهر', 'Arrays and the month project'),
  goal: B('تتحكم في المصفوفات: تعمل وتقرا وتضيف وتشيل وتدوّر وترتّب وتقطّع وتدمج، وتفهم الفرق بين النسخة والإشارة — وتسلّم مشروع الشهر الأول: أداة كاملة بتقرا بيانات وتنضّفها وتحسب وتطلّع تقرير.',
          'Master arrays: create, read, add, remove, search, sort, slice and merge, and understand copies versus references — then deliver the first month’s project: a complete tool that reads data, cleans it, calculates and produces a report.'),
  days: [
    { title: B('المصفوفة: قايمة مرتبة', 'The array: an ordered list'),
      goal: B('تعمل مصفوفات وتقرا وتغيّر عناصرها بالفهرس وتعرف طولها.', 'Create arrays, read and change their items by index, and know their length.'),
      learn: [
        { h: B('تعمل مصفوفة وتقرا منها', 'Creating an array and reading from it'),
          p: B('المصفوفة (**array**) قايمة قيم مرتبة بين `[ ]`: `const cities = ["Cairo", "Giza", "Alex"];`. أول عنصر فهرسه **0**: `cities[0]`، وآخر واحد `cities.at(-1)`. `cities.length` عدد العناصر. ممكن تحط فيها أي نوع، وحتى أنواع مختلفة، بس في الشغل خلّيها نوع واحد (كل العناصر أرقام، أو كلها كائنات طلبات).',
            'An **array** is an ordered list of values in `[ ]`: `const cities = ["Cairo", "Giza", "Alex"];`. The first item has index **0**: `cities[0]`, and the last is `cities.at(-1)`. `cities.length` is the number of items. You can store any type, even mixed ones, but in real work keep one type (all numbers, or all order objects).'),
          ex: 'const cities = ["Cairo", "Giza", "Alexandria"];\nconsole.log(cities[0], cities[2], cities.at(-1));\nconsole.log("count:", cities.length);\nconsole.log(cities[10]);   // undefined, not an error\nconst empty = [];\nconsole.log(empty.length, Array.isArray(empty));', run: 'js' },
        { h: B('const مع المصفوفة', 'const with an array'),
          p: B('`const cart = []` مش معناها إن المصفوفة مبتتغيرش — معناها إن **الاسم** cart هيفضل يشاور على **نفس** المصفوفة. تقدر تضيف وتشيل وتغيّر عناصرها عادي. اللي مينفعش: `cart = [...]` (مصفوفة جديدة لنفس الاسم). فاستخدم const للمصفوفات والكائنات دايمًا تقريبًا.',
            '`const cart = []` does not mean the array cannot change — it means the **name** cart keeps pointing at the **same** array. You can add, remove and change its items freely. What you cannot do is `cart = [...]` (a new array for the same name). So use const for arrays and objects almost always.'),
          ex: 'const cart = ["pen"];\ncart.push("notebook");\ncart[0] = "pen pro";\nconsole.log(cart);\ntry {\n  cart = [];\n} catch (err) {\n  console.log("cannot reassign:", err.message);\n}', run: 'js' },
        { h: B('تغيّر عنصر وتعرف الطول', 'Changing an item and the length'),
          p: B('`arr[i] = value` بيغيّر العنصر في المكان ده. لو كتبت في فهرس بعيد (`arr[10] = x` ومصفوفة طولها 3) هتعمل «خانات فاضية» — تجنّبها. `length` بيتحدّث لوحده. ولو عايز تفضّي مصفوفة: `arr.length = 0` (بيفضّي نفس المصفوفة لكل اللي بيشاور عليها).',
            '`arr[i] = value` changes the item at that position. Writing to a far index (`arr[10] = x` on an array of 3) creates «empty slots» — avoid it. `length` updates by itself. To empty an array: `arr.length = 0` (it empties the same array for everyone pointing at it).'),
          ex: 'const scores = [70, 85, 90];\nscores[1] = 88;\nconsole.log(scores, scores.length);\nconst holes = [1, 2, 3];\nholes[6] = 7;\nconsole.log(holes, holes.length);\nholes.length = 0;\nconsole.log(holes);', run: 'js' },
        { h: B('مصفوفة كائنات = جدول بيانات', 'An array of objects = a data table'),
          p: B('أهم شكل في الأتمتة: **مصفوفة كائنات**، كل كائن صف وكل خاصية عمود: `[{ name: "Sara", total: 300 }, ...]`. ده شكل الـ JSON اللي بيرجع من أي API، وشكل الـ items في n8n، وشكل صفوف الشيت بعد ما تتقري. `orders[0].total` يعني «إجمالي أول طلب». هتلف عليها بـ for...of أو methods الأسبوع ده.',
            'The most important shape in automation: an **array of objects**, each object a row and each property a column: `[{ name: "Sara", total: 300 }, ...]`. It is the shape of the JSON every API returns, of n8n items, and of sheet rows once read. `orders[0].total` means «the first order’s total». You loop over it with for...of or this week’s methods.'),
          ex: 'const orders = [\n  { id: 101, customer: "Sara", total: 300, paid: true },\n  { id: 102, customer: "Omar", total: 1250, paid: false },\n  { id: 103, customer: "Mona", total: 90, paid: true }\n];\nconsole.log(orders[1].customer, orders.at(-1).total);\nconsole.table(orders);', run: 'js' },
        { h: B('مصفوفات جوه مصفوفات', 'Arrays inside arrays'),
          p: B('المصفوفة ممكن عناصرها مصفوفات: جدول صفوف وأعمدة `[[...], [...]]`، زي شيت Excel لما تقراه من غير أسماء أعمدة. `grid[1][2]` يعني الصف التاني العمود التالت. أول صف غالبًا العناوين: `const [header, ...rows] = table;`. هنحوّل الشكل ده لمصفوفة كائنات في مشروع الأسبوع.',
            'An array’s items can be arrays: a table of rows and columns `[[...], [...]]`, like an Excel sheet read without column names. `grid[1][2]` means the second row, third column. The first row is often the headers: `const [header, ...rows] = table;`. In this week’s project we turn this shape into an array of objects.'),
          ex: 'const table = [\n  ["name", "city", "total"],\n  ["Sara", "Cairo", 300],\n  ["Omar", "Giza", 1250]\n];\nconsole.log(table[2][0], table[1][2]);\nconst [header, ...rows] = table;\nconsole.log(header, rows.length, "rows");', run: 'js' }
      ],
      practice: [
        B('اعمل مصفوفة 7 أيام الأسبوع واطبع أول يوم وآخر يوم وعدد الأيام.', 'Make an array of the 7 days of the week and print the first, the last and the count.'),
        B('غيّر عنصرين في مصفوفة const وأثبت إن ده مسموح، وجرّب تعيد تعيينها.', 'Change two items of a const array, prove it is allowed, and try to reassign it.'),
        B('اعمل مصفوفة 5 كائنات منتجات واطبعها بـ console.table.', 'Make an array of 5 product objects and print it with console.table.'),
        B('اقرا من جدول (مصفوفة مصفوفات) 3 خانات بالصف والعمود.', 'Read 3 cells from a table (an array of arrays) by row and column.'),
        B('افصل صف العناوين عن البيانات بـ destructuring.', 'Separate the header row from the data with destructuring.'),
        B('اكتب في تعليق 3 أماكن في شغلك البيانات فيها «مصفوفة كائنات».', 'Write in a comment 3 places in your work where data is an «array of objects».')
      ],
      code: [
        { u: B('items في n8n = مصفوفة كائنات', 'n8n items = an array of objects'), p: '// what $input.all() looks like in an n8n Code node:\nconst items = [\n  { json: { name: "Sara", total: 300 } },\n  { json: { name: "Omar", total: 1250 } }\n];\nconsole.log(items.length, items[0].json.name);' }
      ],
      words: [
        { t: 'array', m: B('قايمة قيم مرتبة بفهارس من 0', 'an ordered list of values indexed from 0'), ex: '["a", "b"]' },
        { t: 'element', m: B('عنصر واحد في المصفوفة', 'one item of an array'), ex: 'arr[0]' },
        { t: 'array of objects', m: B('مصفوفة كل عنصر فيها كائن: شكل جدول البيانات', 'an array whose items are objects: the shape of a data table'), ex: '[{ id: 1 }, { id: 2 }]' },
        { t: 'row', m: B('صف في جدول', 'a row in a table'), ex: 'each object is a row' },
        { t: 'column', m: B('عمود في جدول', 'a column in a table'), ex: 'each property is a column' },
        { t: 'header row', m: B('صف العناوين في أول الجدول', 'the row of titles at the top of a table'), ex: '["name", "city"]' },
        { t: 'reference', m: B('إشارة لنفس الكائن أو المصفوفة في الذاكرة', 'a pointer to the same object or array in memory'), ex: 'const b = a;' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Data types: Arrays (لحد Loops).', 'Data types: Arrays (up to Loops).') },
        { lib: 'MDN: Array', what: B('اقرا المقدمة وDescription وأمثلة Creating an array.', 'Read the introduction, Description and the Creating an array examples.') }],
      challenge: B('اكتب `toObjects(table)` بتاخد مصفوفة مصفوفات أول صف فيها العناوين، وترجّع مصفوفة كائنات (كل صف كائن بأسماء الأعمدة) — من غير methods غير for وlength، وجرّبها على جدول 4 أعمدة × 6 صفوف.', 'Write `toObjects(table)` taking an array of arrays whose first row is the headers, and returning an array of objects (each row an object keyed by column name) — with nothing but for and length, tested on a table of 4 columns × 6 rows.'),
      quiz: [
        { q: B('أول عنصر في arr:', 'The first item of arr:'), o: ['arr[0]', 'arr[1]', 'arr.first'], a: 0, why: B('الفهرس من 0.', 'Indexes start at 0.') },
        { q: B('`const a = [1]; a.push(2);`:', '`const a = [1]; a.push(2);`:'), o: [B('مسموح', 'allowed'), B('TypeError', 'TypeError'), B('بيعمل مصفوفة جديدة', 'makes a new array')], a: 0, why: B('const على الاسم مش المحتوى.', 'const is about the name, not the contents.') },
        { q: B('`["a", "b"][5]`:', '`["a", "b"][5]`:'), o: ['undefined', 'RangeError', '"b"'], a: 0, why: B('مفيش عنصر هناك.', 'There is no item there.') },
        { q: B('شكل الـ items في n8n:', 'The shape of n8n items:'), o: [B('مصفوفة كائنات', 'an array of objects'), B('نص', 'a string'), B('رقم', 'a number')], a: 0, why: B('كل item كائن فيه json.', 'Each item is an object with json.') }
      ] },

    { title: B('تضيف وتشيل: push وpop وsplice', 'Adding and removing: push, pop and splice'),
      goal: B('تضيف وتشيل عناصر من الآخر والأول والنص، وتعرف أنهي methods بتغيّر المصفوفة الأصلية.', 'Add and remove items at the end, the start and the middle, and know which methods change the original array.'),
      learn: [
        { h: B('push وpop: من الآخر', 'push and pop: at the end'),
          p: B('`arr.push(x)` بيضيف في **الآخر** (وممكن كذا عنصر: `push(a, b)`) وبيرجّع الطول الجديد. `arr.pop()` بيشيل **آخر** عنصر ويرجّعه. دول أسرع وأكتر اتنين هتستخدمهم: تجمّع نتايج في مصفوفة بـ push جوه لوب. الاتنين **بيغيّروا المصفوفة نفسها**.',
            '`arr.push(x)` adds at the **end** (several items too: `push(a, b)`) and returns the new length. `arr.pop()` removes the **last** item and returns it. These are the fastest and the two you will use most: collect results into an array with push inside a loop. Both **change the array itself**.'),
          ex: 'const queue = ["order-1"];\nqueue.push("order-2", "order-3");\nconsole.log(queue);\nconst last = queue.pop();\nconsole.log("removed", last, "left", queue);\nconst results = [];\nfor (const n of [3, 8, 12]) results.push(n * 10);\nconsole.log(results);', run: 'js' },
        { h: B('unshift وshift: من الأول', 'unshift and shift: at the start'),
          p: B('`unshift(x)` يضيف في **الأول**، و`shift()` يشيل **أول** عنصر ويرجّعه. مع push بيعملوا **طابور** (queue): تضيف في الآخر وتاخد من الأول — نفس فكرة طوابير المهام. ملحوظة: shift وunshift أبطأ مع مصفوفات ضخمة جدًا لأنهم بيحرّكوا كل العناصر.',
            '`unshift(x)` adds at the **start**, and `shift()` removes the **first** item and returns it. With push they make a **queue**: add at the end, take from the start — the same idea as job queues. Note: shift and unshift are slower on huge arrays because they move every item.'),
          ex: 'const jobs = [];\njobs.push("send invoice");\njobs.push("update sheet");\njobs.unshift("URGENT: refund");\nwhile (jobs.length) {\n  const job = jobs.shift();\n  console.log("doing:", job, "| left:", jobs.length);\n}', run: 'js' },
        { h: B('splice: تشيل أو تضيف من النص', 'splice: removing or adding in the middle'),
          p: B('`arr.splice(start, deleteCount, ...items)`: من مكان `start` يشيل `deleteCount` عنصر ويحط مكانهم `items` (لو فيه). بيرجّع اللي اتشال. `splice(2, 1)` يشيل العنصر رقم 2. `splice(1, 0, "x")` يحشر "x" في المكان 1 من غير ما يشيل. قوي بس بيغيّر الأصل — في كود البيانات غالبًا `filter` (الأسبوع 7) أوضح.',
            '`arr.splice(start, deleteCount, ...items)`: from position `start` it removes `deleteCount` items and puts `items` in their place (if any). It returns what was removed. `splice(2, 1)` removes item 2. `splice(1, 0, "x")` inserts "x" at position 1 without removing. Powerful, but it changes the original — in data code `filter` (week 7) is usually clearer.'),
          ex: 'const steps = ["receive", "check", "pack", "ship"];\nconst removed = steps.splice(1, 1);\nconsole.log(steps, "removed", removed);\nsteps.splice(1, 0, "check stock", "check payment");\nconsole.log(steps);\nsteps.splice(-1, 1, "ship with tracking");\nconsole.log(steps);', run: 'js' },
        { h: B('بيغيّر الأصل ولا بيرجّع جديد؟', 'Does it change the original or return a new one?'),
          p: B('**بيغيّروا الأصل (mutating)**: push وpop وshift وunshift وsplice وsort وreverse. **بيرجّعوا مصفوفة جديدة**: slice وconcat وmap وfilter و`[...arr]`، والأحدث toSorted وtoReversed وtoSpliced. القاعدة: لو المصفوفة جاية من برّه (items في n8n أو دالة تانية)، متغيّرهاش — اعمل نسخة.',
            '**They change the original (mutating)**: push, pop, shift, unshift, splice, sort and reverse. **They return a new array**: slice, concat, map, filter and `[...arr]`, plus the newer toSorted, toReversed and toSpliced. The rule: if the array comes from outside (n8n items or another function), do not change it — make a copy.'),
          ex: 'const original = [3, 1, 2];\nconst sortedCopy = original.toSorted();\nconsole.log(original, sortedCopy);\nconst reversed = [...original].reverse();\nconsole.log(original, reversed);\noriginal.sort();\nconsole.log("after sort():", original);', run: 'js' },
        { h: B('includes وindexOf وfind في المصفوفات', 'includes, indexOf and find on arrays'),
          p: B('`arr.includes(x)` موجود ولا لأ (أوضح سؤال). `indexOf(x)` مكانه أو -1. دول بيقارنوا بـ ===، فمش بيلاقوا كائن «شبه» كائن تاني. للكائنات استخدم `find(fn)` (أول عنصر الدالة بترجّع له true) و`findIndex(fn)` — هنتعمّق فيهم مع الدوال. وفي المصفوفات الكبيرة اللي بتدوّر فيها كتير، استخدم Set (الشهر الجاي).',
            '`arr.includes(x)` tells whether it is there (the clearest question). `indexOf(x)` gives its position or -1. Both compare with ===, so they will not find an object that merely looks like another one. For objects use `find(fn)` (the first item for which the function returns true) and `findIndex(fn)` — more on these with functions. For big arrays you search a lot, use a Set (next month).'),
          ex: 'const vip = ["sara@x.com", "omar@x.com"];\nconsole.log(vip.includes("omar@x.com"), vip.indexOf("mona@x.com"));\nconst orders = [{ id: 1, total: 300 }, { id: 2, total: 1250 }];\nconsole.log(orders.includes({ id: 2, total: 1250 }));   // false: a different object\nconsole.log(orders.find(o => o.id === 2), orders.findIndex(o => o.total > 1000));', run: 'js' }
      ],
      practice: [
        B('اعمل طابور مهام: ضيف 5 بـ push ونفّذهم بـ shift جوه while.', 'Build a job queue: add 5 with push and run them with shift inside while.'),
        B('اعمل «undo» بسيط: سجّل آخر 5 عمليات بـ push وارجع واحدة بـ pop.', 'Make a simple «undo»: record the last 5 actions with push and undo one with pop.'),
        B('استخدم splice تشيل عنصر من النص وتحشر عنصرين مكانه.', 'Use splice to remove an item in the middle and insert two in its place.'),
        B('اكتب جدول: 7 methods بيغيّروا الأصل و6 بيرجّعوا جديد.', 'Make a table: 7 methods that change the original and 6 that return a new array.'),
        B('رتّب مصفوفة بـ toSorted وأثبت إن الأصل متغيرش.', 'Sort an array with toSorted and prove the original did not change.'),
        B('دوّر على طلب بالـ id بـ find وعلى مكانه بـ findIndex.', 'Find an order by id with find, and its position with findIndex.')
      ],
      code: [
        { u: B('آخر 10 أحداث بس', 'Only the last 10 events'), p: 'const recent = [];\nfunction remember(event) {\n  recent.push({ event, at: new Date().toISOString() });\n  if (recent.length > 10) recent.shift();   // keep the newest 10\n}\nfor (let i = 1; i <= 13; i++) remember("event " + i);\nconsole.log(recent.length, recent[0].event);' }
      ],
      words: [
        { t: 'push', m: B('يضيف في آخر المصفوفة', 'adds to the end of an array'), ex: 'arr.push(x)' },
        { t: 'pop', m: B('يشيل آخر عنصر ويرجّعه', 'removes and returns the last item'), ex: 'arr.pop()' },
        { t: 'queue', m: B('طابور: أول داخل أول خارج', 'first in, first out'), ex: 'push + shift' },
        { t: 'stack', m: B('كومة: آخر داخل أول خارج', 'last in, first out'), ex: 'push + pop' },
        { t: 'splice', m: B('يشيل أو يضيف عناصر من أي مكان ويغيّر الأصل', 'removes or inserts items anywhere, changing the original'), ex: 'arr.splice(1, 1)' },
        { t: 'mutate', m: B('يغيّر نفس الكائن أو المصفوفة', 'to change the same object or array'), ex: 'sort() mutates' },
        { t: 'copy', m: B('نسخة منفصلة متأثرش في الأصل', 'a separate duplicate that does not affect the original'), ex: '[...arr]' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Arrays: Methods pop/push, shift/unshift وArray methods: splice.', 'Arrays: Methods pop/push, shift/unshift and Array methods: splice.') },
        { lib: 'MDN: Array', what: B('Copying methods and mutating methods (الجدول).', 'Copying methods and mutating methods (the table).') }],
      challenge: B('اكتب «سلة مشتريات» بأوامر: `add(sku, qty)` (لو المنتج موجود زوّد الكمية)، و`remove(sku)` بـ findIndex وsplice، و`undo()` بيرجّع آخر عملية بـ stack من العمليات، و`print()` بتطبع السلة والإجمالي — وجرّب سيناريو 10 أوامر.', 'Write a «shopping basket» with commands: `add(sku, qty)` (if the product is there, increase the quantity), `remove(sku)` with findIndex and splice, `undo()` reversing the last action using a stack of actions, and `print()` showing the basket and total — and run a scenario of 10 commands.'),
      quiz: [
        { q: B('`[1, 2, 3].pop()` بيرجّع:', '`[1, 2, 3].pop()` returns:'), o: ['3', '[1, 2]', '1'], a: 0, why: B('آخر عنصر.', 'The last item.') },
        { q: B('طابور مهام بيستخدم:', 'A job queue uses:'), o: ['push + shift', 'push + pop', 'splice + sort'], a: 0, why: B('أول داخل أول خارج.', 'First in, first out.') },
        { q: B('أنهي method بترجّع مصفوفة جديدة؟', 'Which method returns a new array?'), o: ['toSorted()', 'sort()', 'reverse()'], a: 0, why: B('sort وreverse بيغيّروا الأصل.', 'sort and reverse change the original.') },
        { q: B('`[{a:1}].includes({a:1})`:', '`[{a:1}].includes({a:1})`:'), o: ['false', 'true', B('خطأ', 'an error')], a: 0, why: B('كائن تاني في الذاكرة.', 'A different object in memory.') }
      ] },

    { title: B('القطع والدمج والنسخ', 'Slicing, merging and copying'),
      goal: B('تقطّع وتدمج وتنسخ مصفوفات بأمان بـ slice وconcat والـ spread وdestructuring، وتفهم النسخة السطحية.', 'Slice, merge and copy arrays safely with slice, concat, spread and destructuring, and understand shallow copies.'),
      learn: [
        { h: B('slice: جزء من غير ما تغيّر', 'slice: a part without changing anything'),
          p: B('`arr.slice(start, end)` زي النصوص بالظبط: من start لحد قبل end، والسالب من الآخر، ومبيغيّرش الأصل. `slice(0, 10)` أول 10 (صفحة أولى)، و`slice(-5)` آخر 5. و`slice()` من غير أرقام نسخة كاملة. ده اللي هتستخدمه للـ pagination وللـ «أعلى 10».',
            '`arr.slice(start, end)` works exactly like strings: from start up to before end, negatives from the end, and the original is untouched. `slice(0, 10)` gives the first 10 (page one), and `slice(-5)` the last 5. `slice()` with no numbers is a full copy. You will use it for pagination and «top 10» lists.'),
          ex: 'const ids = [11, 12, 13, 14, 15, 16, 17];\nconsole.log(ids.slice(0, 3), ids.slice(-2), ids.slice(2, 5));\nconst pageSize = 3;\nfor (let page = 0; page * pageSize < ids.length; page++) {\n  console.log("page", page + 1, ids.slice(page * pageSize, (page + 1) * pageSize));\n}\nconsole.log("original untouched:", ids);', run: 'js' },
        { h: B('الـ spread: ... للنسخ والدمج', 'Spread: ... for copying and merging'),
          p: B('`[...a]` نسخة جديدة. `[...a, ...b]` دمج اتنين. `[...a, x]` نسخة مضاف لها x من غير ما تلمس a. الـ spread كمان بيفك مصفوفة في دالة: `Math.max(...prices)`. أنضف من concat وبتستخدمه في كل حتة في JS الحديث وفي Code node.',
            '`[...a]` is a new copy. `[...a, ...b]` merges two. `[...a, x]` is a copy with x added, leaving a untouched. Spread also unpacks an array into a function: `Math.max(...prices)`. Cleaner than concat, and used everywhere in modern JS and in the Code node.'),
          ex: 'const cairo = ["Sara", "Omar"];\nconst giza = ["Mona"];\nconst all = [...cairo, ...giza, "Hany"];\nconsole.log(all, cairo);\nconst prices = [120, 45, 990, 300];\nconsole.log(Math.max(...prices), Math.min(...prices));\nconsole.log([1, 2].concat([3], [4, 5]));', run: 'js' },
        { h: B('destructuring للمصفوفات', 'Destructuring arrays'),
          p: B('`const [first, second] = arr;` ياخد أول عنصرين في متغيرين. `const [, , third] = arr;` يعدّي اللي مش عايزه. `const [head, ...rest] = arr;` الأول والباقي. وقيمة افتراضية: `const [a = 0] = []`. وتبديل متغيرين في سطر: `[a, b] = [b, a]`. مفيد جدًا مع `split` ومع ردود فيها [قيمة، خطأ].',
            '`const [first, second] = arr;` puts the first two items in two variables. `const [, , third] = arr;` skips what you do not want. `const [head, ...rest] = arr;` gives the first and the rest. A default: `const [a = 0] = []`. And swapping two variables in one line: `[a, b] = [b, a]`. Very handy with `split` and with results shaped like [value, error].'),
          ex: 'const [name, city, total = "0"] = "Sara,Cairo".split(",");\nconsole.log(name, city, total);\nconst [winner, ...others] = ["Mona", "Omar", "Hany"];\nconsole.log(winner, others);\nlet a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);', run: 'js' },
        { h: B('النسخة السطحية (shallow copy)', 'Shallow copies'),
          p: B('`[...orders]` بيعمل مصفوفة جديدة، بس **الكائنات اللي جواها هي نفسها**. لو غيّرت `copy[0].total` هيتغيّر في الأصل كمان! ده اسمه **shallow copy**. لو محتاج نسخة كاملة مستقلة لكل حاجة جوه: `structuredClone(orders)`. أو اعمل كائنات جديدة وانت بتنسخ: `orders.map(o => ({ ...o }))`.',
            '`[...orders]` makes a new array, but **the objects inside are the same ones**. Change `copy[0].total` and the original changes too! That is a **shallow copy**. For a fully independent copy of everything inside, use `structuredClone(orders)`. Or make new objects as you copy: `orders.map(o => ({ ...o }))`.'),
          ex: 'const orders = [{ id: 1, total: 100 }];\nconst shallow = [...orders];\nshallow[0].total = 999;\nconsole.log("original changed:", orders[0].total);\nconst deep = structuredClone(orders);\ndeep[0].total = 5;\nconsole.log("original kept:", orders[0].total, "deep copy:", deep[0].total);', run: 'js' },
        { h: B('الإشارة: متغيرين لنفس المصفوفة', 'References: two names, one array'),
          p: B('`const b = a;` مش نسخة — b وa اسمين لنفس المصفوفة؛ تغيّر في واحد يبان في التاني. ونفس الحاجة لما تبعت مصفوفة لدالة: الدالة لو غيّرتها، الأصل بيتغيّر. ولما تقارن: `[1] === [1]` false لأنهم مصفوفتين مختلفتين. عشان تقارن المحتوى: `JSON.stringify(a) === JSON.stringify(b)` للحالات البسيطة.',
            '`const b = a;` is not a copy — b and a are two names for the same array; a change through one shows in the other. The same happens when you pass an array to a function: if the function changes it, the original changes. And when comparing: `[1] === [1]` is false because they are two different arrays. To compare contents: `JSON.stringify(a) === JSON.stringify(b)` for simple cases.'),
          ex: 'const a = [1, 2];\nconst b = a;\nb.push(3);\nconsole.log(a, a === b);\nfunction addFee(list) { list.push("fee"); }\nconst lines = ["item"];\naddFee(lines);\nconsole.log(lines);\nconsole.log([1] === [1], JSON.stringify([1, 2]) === JSON.stringify([1, 2]));', run: 'js' }
      ],
      practice: [
        B('قسّم مصفوفة 23 عنصر لصفحات كل صفحة 5 بـ slice.', 'Split an array of 23 items into pages of 5 with slice.'),
        B('ادمج 3 قوايم عملاء بالـ spread من غير ما تغيّر أي واحدة.', 'Merge 3 customer lists with spread without changing any of them.'),
        B('فك سطر CSV لـ 4 متغيرات بـ destructuring مع قيمة افتراضية.', 'Unpack a CSV line into 4 variables with destructuring and a default.'),
        B('أثبت مشكلة الـ shallow copy وصلّحها بـ structuredClone.', 'Demonstrate the shallow-copy problem and fix it with structuredClone.'),
        B('اكتب دالة بتغيّر مصفوفة جاية ليها، وبعدين نسخة بترجّع مصفوفة جديدة بدل ما تغيّر.', 'Write a function that changes an array passed to it, then a version that returns a new array instead.'),
        B('بدّل قيمتين بـ destructuring في سطر واحد.', 'Swap two values with destructuring in one line.')
      ],
      code: [
        { u: B('أعلى 3 بدون ما تبوّظ الأصل', 'The top 3 without spoiling the original'), p: 'const sales = [{ who: "Sara", t: 900 }, { who: "Omar", t: 3200 }, { who: "Mona", t: 1500 }, { who: "Hany", t: 700 }];\nconst top3 = sales.toSorted((a, b) => b.t - a.t).slice(0, 3);\nconsole.log(top3.map(s => s.who), sales[0].who);' }
      ],
      words: [
        { t: 'spread syntax', m: B('... بيفك عناصر مصفوفة أو خصايص كائن', '... unpacks an array’s items or an object’s properties'), ex: '[...a, ...b]' },
        { t: 'destructuring', m: B('فك قيم من مصفوفة أو كائن لمتغيرات', 'unpacking values from an array or object into variables'), ex: 'const [a, b] = arr;' },
        { t: 'rest element', m: B('...rest بيجمّع الباقي في مصفوفة', '...rest gathers the remainder into an array'), ex: 'const [first, ...rest] = arr;' },
        { t: 'shallow copy', m: B('نسخة من البرّاني بس والعناصر جوه مشتركة', 'a copy of the outside only; inner items are shared'), ex: '[...orders]' },
        { t: 'deep copy', m: B('نسخة كاملة مستقلة لكل حاجة جوه', 'a fully independent copy of everything inside'), ex: 'structuredClone(x)' },
        { t: 'merge', m: B('دمج قايمتين أو أكتر في واحدة', 'combining two or more lists into one'), ex: '[...cairo, ...giza]' },
        { t: 'page size', m: B('عدد العناصر في كل صفحة', 'the number of items per page'), ex: 'pageSize = 20' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Destructuring assignment: Array destructuring.', 'Destructuring assignment: Array destructuring.') },
        { lib: 'MDN: JavaScript Reference', what: B('Spread syntax (...) وstructuredClone().', 'Spread syntax (...) and structuredClone().') }],
      challenge: B('اكتب `paginate(items, page, size)` بترجّع `{ page, totalPages, items, hasNext }` من غير ما تغيّر الأصل، وتتعامل مع صفحة برّه النطاق برسالة — واستخدمها تطبع 3 صفحات من 23 طلب كجدول.', 'Write `paginate(items, page, size)` returning `{ page, totalPages, items, hasNext }` without changing the original, handling an out-of-range page with a message — and use it to print 3 pages of 23 orders as a table.'),
      quiz: [
        { q: B('`[1,2,3,4].slice(1, 3)`:', '`[1,2,3,4].slice(1, 3)`:'), o: ['[2, 3]', '[2, 3, 4]', '[1, 2]'], a: 0, why: B('من 1 لحد قبل 3.', 'From 1 up to before 3.') },
        { q: B('`const b = a;` لمصفوفة:', '`const b = a;` for an array:'), o: [B('نفس المصفوفة باسمين', 'the same array under two names'), B('نسخة جديدة', 'a new copy'), B('خطأ', 'an error')], a: 0, why: B('إشارة مش نسخة.', 'A reference, not a copy.') },
        { q: B('نسخة كاملة مستقلة لمصفوفة كائنات:', 'A fully independent copy of an array of objects:'), o: ['structuredClone(arr)', '[...arr]', 'arr.slice()'], a: 0, why: B('التانيين shallow.', 'The other two are shallow.') },
        { q: B('`const [x, ...y] = [1, 2, 3]` قيمة y:', '`const [x, ...y] = [1, 2, 3]` y is:'), o: ['[2, 3]', '2', '[1, 2, 3]'], a: 0, why: B('rest بيجمّع الباقي.', 'rest gathers the remainder.') }
      ] },

    { title: B('الترتيب والبحث والإحصاء', 'Sorting, searching and statistics'),
      goal: B('ترتّب أرقام ونصوص وكائنات صح، وتحسب إحصاءات بسيطة (مجموع، متوسط، وسيط، أكبر وأصغر) من مصفوفات.', 'Sort numbers, text and objects correctly, and compute simple statistics (sum, mean, median, max and min) from arrays.'),
      learn: [
        { h: B('فخ sort مع الأرقام', 'The sort trap with numbers'),
          p: B('`[10, 9, 100].sort()` بيدّي `[10, 100, 9]`! لأن sort من غير دالة بيرتّب **كنصوص**. للأرقام لازم دالة مقارنة: `sort((a, b) => a - b)` تصاعدي و`(a, b) => b - a` تنازلي. الدالة بترجّع سالب لو a قبل b، وموجب لو بعده، وصفر لو متساويين. وافتكر إن sort بيغيّر الأصل — استخدم toSorted أو انسخ الأول.',
            '`[10, 9, 100].sort()` gives `[10, 100, 9]`! Because sort with no function sorts **as text**. Numbers need a compare function: `sort((a, b) => a - b)` ascending and `(a, b) => b - a` descending. The function returns a negative number if a comes first, a positive one if after, and zero if equal. And remember sort changes the original — use toSorted or copy first.'),
          ex: 'console.log([10, 9, 100, 25].sort());\nconsole.log([10, 9, 100, 25].toSorted((a, b) => a - b));\nconsole.log([10, 9, 100, 25].toSorted((a, b) => b - a));', run: 'js' },
        { h: B('ترتيب الكائنات بأكتر من مفتاح', 'Sorting objects by more than one key'),
          p: B('رتّب الطلبات بالإجمالي: `(a, b) => b.total - a.total`. ولو متساويين، بالتاريخ: `b.total - a.total || a.date.localeCompare(b.date)` — الـ `||` بيستخدم المقارنة التانية لو الأولى صفر. للنصوص `a.name.localeCompare(b.name, "ar")`، وللتواريخ ISO نفس localeCompare أو `new Date(a) - new Date(b)`.',
            'Sort orders by total: `(a, b) => b.total - a.total`. If equal, by date: `b.total - a.total || a.date.localeCompare(b.date)` — the `||` uses the second comparison when the first is zero. For text use `a.name.localeCompare(b.name, "ar")`, and for ISO dates the same localeCompare or `new Date(a) - new Date(b)`.'),
          ex: 'const orders = [\n  { id: 1, total: 500, date: "2026-10-02" },\n  { id: 2, total: 1200, date: "2026-10-01" },\n  { id: 3, total: 500, date: "2026-09-30" }\n];\nconst sorted = orders.toSorted((a, b) => b.total - a.total || a.date.localeCompare(b.date));\nconsole.log(sorted.map(o => o.id));', run: 'js' },
        { h: B('المجموع والمتوسط والأكبر', 'Sum, mean and the largest'),
          p: B('المجموع بلوب أو `reduce` (الأسبوع 7): `arr.reduce((s, x) => s + x, 0)`. المتوسط = المجموع ÷ العدد — **افحص إن المصفوفة مش فاضية** وإلا تقسم على صفر (`NaN`). الأكبر والأصغر: `Math.max(...arr)` — لكن مع مصفوفة فاضية بيرجّع `-Infinity`، ومع مصفوفة ضخمة جدًا (مئات الآلاف) استخدم لوب.',
            'Sum with a loop or `reduce` (week 7): `arr.reduce((s, x) => s + x, 0)`. Mean = sum ÷ count — **check the array is not empty**, or you divide by zero (`NaN`). Largest and smallest: `Math.max(...arr)` — but an empty array gives `-Infinity`, and for huge arrays (hundreds of thousands) use a loop.'),
          ex: 'const totals = [300, 1250, 90, 640, 2100];\nconst sum = totals.reduce((s, x) => s + x, 0);\nconst mean = totals.length ? sum / totals.length : 0;\nconsole.log({ sum, mean, max: Math.max(...totals), min: Math.min(...totals) });\nconsole.log(Math.max(...[]), [].length ? 1 : "empty list");', run: 'js' },
        { h: B('الوسيط ولماذا أصدق من المتوسط', 'The median, and why it can be more honest than the mean'),
          p: B('**الوسيط** هو القيمة اللي في النص بعد الترتيب. لو فيه طلب واحد ضخم (50,000) وسط طلبات 300، المتوسط هيطلع كبير وكداب، والوسيط يقولك «الطلب العادي». الحساب: رتّب نسخة، ولو العدد فردي خد اللي في النص، ولو زوجي خد متوسط الاتنين اللي في النص.',
            'The **median** is the middle value after sorting. If there is one huge order (50,000) among 300-pound orders, the mean comes out big and misleading, while the median tells you «the typical order». To compute it: sort a copy; if the count is odd take the middle one, if even take the average of the middle two.'),
          ex: 'function median(values) {\n  if (!values.length) return null;\n  const s = values.toSorted((a, b) => a - b);\n  const mid = Math.floor(s.length / 2);\n  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;\n}\nconst orders = [300, 280, 350, 310, 50000];\nconst mean = orders.reduce((a, b) => a + b, 0) / orders.length;\nconsole.log("mean", mean, "median", median(orders));\nconsole.log(median([4, 1, 3, 2]));', run: 'js' },
        { h: B('شيل المكرر وعدّ التكرار', 'Removing duplicates and counting repeats'),
          p: B('`[...new Set(arr)]` بيشيل المكرر من قيم بسيطة (أرقام ونصوص) في سطر. لعدّ كام مرة كل قيمة ظهرت: كائن عدّاد `counts[x] = (counts[x] ?? 0) + 1`. ولترتيب الأكتر تكرارًا: `Object.entries(counts).sort((a, b) => b[1] - a[1])`. ده أساس أي تقرير «أكتر 5 منتجات مبيعًا».',
            '`[...new Set(arr)]` removes duplicates from simple values (numbers and strings) in one line. To count how often each value appears: a counter object `counts[x] = (counts[x] ?? 0) + 1`. To sort by most frequent: `Object.entries(counts).sort((a, b) => b[1] - a[1])`. This is the base of every «top 5 products» report.'),
          ex: 'const sold = ["pen", "bag", "pen", "notebook", "pen", "bag"];\nconsole.log([...new Set(sold)]);\nconst counts = {};\nfor (const item of sold) counts[item] = (counts[item] ?? 0) + 1;\nconst ranking = Object.entries(counts).sort((a, b) => b[1] - a[1]);\nconsole.log(ranking);\nconsole.log("best seller:", ranking[0][0]);', run: 'js' }
      ],
      practice: [
        B('رتّب 10 أرقام تصاعدي وتنازلي بـ toSorted وأثبت إن sort() من غير دالة غلط.', 'Sort 10 numbers up and down with toSorted, and show that sort() without a function is wrong.'),
        B('رتّب 8 طلبات بالإجمالي وبعدين بالتاريخ لو متساويين.', 'Sort 8 orders by total, then by date when equal.'),
        B('رتّب 6 أسماء عربي بـ localeCompare.', 'Sort 6 Arabic names with localeCompare.'),
        B('احسب المجموع والمتوسط والوسيط والأكبر والأصغر لـ 12 قيمة.', 'Compute the sum, mean, median, max and min of 12 values.'),
        B('بيّن بمثال إمتى الوسيط أصدق من المتوسط.', 'Show with an example when the median is more honest than the mean.'),
        B('اطلع أكتر 3 منتجات تكرارًا من قايمة 20 عملية بيع.', 'Find the 3 most frequent products in a list of 20 sales.')
      ],
      code: [
        { u: B('إحصاءات سريعة', 'Quick statistics'), p: 'function stats(values) {\n  if (!values.length) return { count: 0 };\n  const s = values.toSorted((a, b) => a - b), sum = s.reduce((a, b) => a + b, 0);\n  const mid = Math.floor(s.length / 2);\n  return { count: s.length, sum, mean: sum / s.length, median: s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2, min: s[0], max: s.at(-1) };\n}\nconsole.log(stats([5, 1, 9, 3]));' }
      ],
      words: [
        { t: 'compare function', m: B('دالة بتقول لـ sort مين قبل مين', 'a function telling sort which comes first'), ex: '(a, b) => a - b' },
        { t: 'ascending', m: B('تصاعدي: من الأصغر للأكبر', 'from smallest to largest'), ex: '1, 2, 3' },
        { t: 'descending', m: B('تنازلي: من الأكبر للأصغر', 'from largest to smallest'), ex: '3, 2, 1' },
        { t: 'mean', m: B('المتوسط الحسابي', 'the arithmetic average'), ex: 'sum / count' },
        { t: 'median', m: B('القيمة اللي في النص بعد الترتيب', 'the middle value after sorting'), ex: 'median([1, 5, 9]) → 5' },
        { t: 'outlier', m: B('قيمة شاذة بعيدة جدًا عن الباقي', 'a value far away from the rest'), ex: 'one 50,000 order' },
        { t: 'duplicate', m: B('قيمة متكررة', 'a repeated value'), ex: '[...new Set(arr)]' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Array methods: sort(fn), reverse وتمارين الترتيب.', 'Array methods: sort(fn), reverse and the sorting exercises.') },
        { lib: 'MDN: Array', what: B('sort وtoSorted والفرق بينهم.', 'sort and toSorted and how they differ.') }],
      challenge: B('اكتب «تقرير مبيعات الأسبوع» من مصفوفة 30 عملية بيع (التاريخ والمنتج والمدينة والمبلغ): الإجمالي والمتوسط والوسيط، وأحسن يوم، وأكتر 3 منتجات بالعدد وأكتر 3 بالمبلغ، وترتيب المدن — والأصل متغيرش في الآخر.', 'Write a «week’s sales report» from an array of 30 sales (date, product, city, amount): the total, mean and median, the best day, the top 3 products by count and the top 3 by amount, and the cities ranked — with the original unchanged at the end.'),
      quiz: [
        { q: B('`[2, 10, 1].sort()`:', '`[2, 10, 1].sort()`:'), o: ['[1, 10, 2]', '[1, 2, 10]', '[10, 2, 1]'], a: 0, why: B('بيرتّب كنصوص.', 'It sorts as text.') },
        { q: B('ترتيب تنازلي لأرقام:', 'Descending order for numbers:'), o: ['(a, b) => b - a', '(a, b) => a - b', '(a, b) => a > b'], a: 0, why: B('الأكبر الأول.', 'Largest first.') },
        { q: B('وسيط [1, 3, 100]:', 'The median of [1, 3, 100]:'), o: ['3', '34.67', '100'], a: 0, why: B('اللي في النص.', 'The middle one.') },
        { q: B('`[...new Set([1, 1, 2])]`:', '`[...new Set([1, 1, 2])]`:'), o: ['[1, 2]', '[1, 1, 2]', '2'], a: 0, why: B('Set بيشيل المكرر.', 'Set removes duplicates.') }
      ] },

    { title: B('مشروع الشهر الأول: تقرير مبيعات من بيانات خام', 'The first month’s project: a sales report from raw data'),
      goal: B('تجمع كل الشهر في أداة واحدة: بتقرا جدول خام، وتحوّله لكائنات، وتنضّف، وتتحقق، وتحسب، وترتّب، وتطلّع تقرير.', 'Bring the whole month into one tool: read a raw table, turn it into objects, clean, validate, calculate, sort and produce a report.'),
      learn: [
        { h: B('الخطة: 6 خطوات', 'The plan: six steps'),
          p: B('أي أداة بيانات بتمشي بنفس الخطوات: **(1) اقرا** (هنا مصفوفة مصفوفات زي شيت)، **(2) حوّل** لكائنات بأسماء الأعمدة، **(3) نضّف** كل حقل، **(4) تحقق** واعزل الصفوف الغلط، **(5) احسب** الإجماليات والإحصاءات، **(6) اعرض** التقرير. اكتب الخطوات دي تعليقات في أول الملف، وكل خطوة دالة باسمها.',
            'Every data tool follows the same steps: **(1) read** (here an array of arrays, like a sheet), **(2) convert** to objects keyed by column name, **(3) clean** each field, **(4) validate** and set aside bad rows, **(5) calculate** totals and statistics, **(6) present** the report. Write these steps as comments at the top of the file, with a named function for each step.'),
          ex: 'const raw = [\n  ["date", "city", "product", "qty", "price"],\n  ["2026-09-28", " cairo ", "Notebook", "10", "45"],\n  ["2026-09-28", "GIZA", "Pen Pro", "x", "30"],\n  ["2026-09-29", "alexandria", "Backpack", "2", "650"],\n  ["2026-09-29", "Cairo", "Pen Pro", "5", "30"]\n];\nconsole.log("rows:", raw.length - 1, "columns:", raw[0].join(", "));', run: 'js' },
        { h: B('من جدول لكائنات', 'From a table to objects'),
          p: B('افصل العناوين عن الصفوف، ولكل صف اعمل كائن: لكل عمود `obj[header[i]] = row[i]`. ده بالظبط اللي n8n بيعمله لما يقرا شيت، واللي هتعمله لما تقرا CSV. بعدها كل الكود يقرا `r.qty` بدل `r[3]` — أوضح ومش بيتكسر لو حد غيّر ترتيب الأعمدة.',
            'Separate the headers from the rows, and make an object from each row: for each column `obj[header[i]] = row[i]`. This is exactly what n8n does when it reads a sheet, and what you will do when you read a CSV. From then on the code reads `r.qty` instead of `r[3]` — clearer, and it does not break when someone reorders the columns.'),
          ex: 'function toObjects(table) {\n  const [header, ...rows] = table;\n  const out = [];\n  for (const row of rows) {\n    const obj = {};\n    for (let i = 0; i < header.length; i++) obj[header[i]] = row[i];\n    out.push(obj);\n  }\n  return out;\n}\nconsole.log(toObjects([["a", "b"], [1, 2], [3, 4]]));', run: 'js' },
        { h: B('نضّف واتحقق في خطوة واحدة', 'Clean and validate in one step'),
          p: B('لكل صف: نضّف المدينة (trim + أول حرف كبير)، وحوّل الكمية والسعر لأرقام، واجمع **المشاكل** في قايمة. الصف السليم يروح لمصفوفة `good`، واللي فيه مشاكل لمصفوفة `bad` مع رقم الصف والسبب. متصلّحش بيانات بالتخمين (زي كمية «x» تخليها 1) — سجّلها.',
            'For each row: clean the city (trim + capitalise), convert quantity and price to numbers, and collect **problems** in a list. A good row goes to a `good` array; a row with problems goes to a `bad` array with its row number and reason. Never fix data by guessing (such as turning a quantity of «x» into 1) — record it.'),
          ex: 'const cap = s => s.trim().toLowerCase().replace(/^./, c => c.toUpperCase());\nfunction checkRow(r, n) {\n  const problems = [];\n  const qty = Number(r.qty), price = Number(r.price);\n  if (!Number.isInteger(qty) || qty <= 0) problems.push("bad qty «" + r.qty + "»");\n  if (!(price > 0)) problems.push("bad price «" + r.price + "»");\n  return { row: { ...r, city: cap(r.city), qty, price, sum: qty * price }, problems, n };\n}\nconsole.log(checkRow({ city: " cairo ", qty: "10", price: "45" }, 2));\nconsole.log(checkRow({ city: "GIZA", qty: "x", price: "30" }, 3).problems);', run: 'js' },
        { h: B('احسب وجمّع ورتّب', 'Calculate, group and sort'),
          p: B('من الصفوف السليمة: الإجمالي، والإجمالي حسب المدينة وحسب المنتج (كائنات تجميع)، وأكبر عملية، والوسيط. وبعدين حوّل كائنات التجميع لمصفوفات `[اسم، قيمة]` ورتّبها تنازلي. كل حسبة في سطرها ومتغيرها باسم واضح.',
            'From the good rows: the total, the total by city and by product (grouping objects), the biggest sale and the median. Then turn the grouping objects into `[name, value]` arrays and sort them descending. Each calculation on its own line in a clearly named variable.'),
          ex: 'const good = [\n  { city: "Cairo", product: "Notebook", sum: 450 },\n  { city: "Alexandria", product: "Backpack", sum: 1300 },\n  { city: "Cairo", product: "Pen Pro", sum: 150 }\n];\nconst byCity = {}, byProduct = {};\nfor (const r of good) {\n  byCity[r.city] = (byCity[r.city] ?? 0) + r.sum;\n  byProduct[r.product] = (byProduct[r.product] ?? 0) + r.sum;\n}\nconst rank = obj => Object.entries(obj).sort((a, b) => b[1] - a[1]);\nconsole.log(rank(byCity));\nconsole.log(rank(byProduct));', run: 'js' },
        { h: B('التقرير النهائي', 'The final report'),
          p: B('اعرض: سطر عنوان، والملخص (عدد الصفوف، السليمة، اللي فيها مشاكل، الإجمالي، المتوسط، الوسيط)، وجدول المدن، وجدول المنتجات، وقايمة المشاكل برقم الصف. استخدم padEnd وpadStart وtoLocaleString. ده التقرير اللي هتبعته إيميل أو Telegram لما نوصّل الأداة بـ n8n.',
            'Show: a title line, the summary (row count, good, with problems, total, mean, median), the cities table, the products table and the list of problems by row number. Use padEnd, padStart and toLocaleString. This is the report you will send by email or Telegram once the tool is connected to n8n.'),
          ex: 'const money = n => n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });\nconst line = (label, value) => console.log(label.padEnd(16) + String(value).padStart(14));\nconsole.log("SALES REPORT · 28–29 Sep".padEnd(30, " ") + "\\n" + "=".repeat(30));\nline("rows", 4); line("good", 3); line("problems", 1);\nline("total EGP", money(1900)); line("median EGP", money(450));', run: 'js' }
      ],
      practice: [
        B('اكتب الخطوات الست كتعليقات ودالة فاضية لكل خطوة.', 'Write the six steps as comments and an empty function for each.'),
        B('اكتب `toObjects` وجرّبها على جدول 5 أعمدة.', 'Write `toObjects` and try it on a 5-column table.'),
        B('اكتب `checkRow` بترجّع الصف المتنضّف والمشاكل.', 'Write `checkRow` returning the cleaned row and its problems.'),
        B('افصل السليم عن الغلط في مصفوفتين.', 'Separate the good rows from the bad ones into two arrays.'),
        B('اعمل التجميع بالمدينة والمنتج ورتّبهم.', 'Group by city and by product, and rank them.'),
        B('اطبع التقرير النهائي مترتب.', 'Print the final report, neatly lined up.')
      ],
      code: [
        { u: B('هيكل الأداة', 'The tool’s skeleton'), p: '// 1 read → 2 convert → 3 clean → 4 validate → 5 calculate → 6 present\nfunction run(table) {\n  const rows = toObjects(table);\n  const checked = rows.map((r, i) => checkRow(r, i + 2));\n  const good = checked.filter(c => !c.problems.length).map(c => c.row);\n  const bad = checked.filter(c => c.problems.length);\n  return report(good, bad);\n}' }
      ],
      words: [
        { t: 'pipeline', m: B('خطوات متتالية كل واحدة بتسلّم للي بعدها', 'steps in sequence, each handing over to the next'), ex: 'read → clean → report' },
        { t: 'raw data', m: B('بيانات خام زي ما جت من غير تنضيف', 'data exactly as it arrived, uncleaned'), ex: 'the raw sheet' },
        { t: 'aggregate', m: B('تجميع قيم كتير في رقم واحد (مجموع، متوسط)', 'combining many values into one number (sum, average)'), ex: 'total by city' },
        { t: 'group by', m: B('تجميع الصفوف حسب قيمة عمود', 'grouping rows by a column’s value'), ex: 'group by product' },
        { t: 'rank', m: B('ترتيب حسب القيمة', 'to order by value'), ex: 'rank cities by sales' },
        { t: 'report', m: B('ملخص منظم بالأرقام المهمة', 'an organised summary of the key numbers'), ex: 'the weekly report' },
        { t: 'row number', m: B('رقم الصف في الملف الأصلي عشان المراجعة', 'a row’s number in the source file, for review'), ex: 'row 3: bad qty' }
      ],
      read: [{ lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 4: Data Structures: Objects and Arrays (لحد Further arrayology).', 'Chapter 4: Data Structures: Objects and Arrays (up to Further arrayology).') },
        { lib: 'freeCodeCamp: JavaScript Algorithms and Data Structures', what: B('خلّص أول مشروعين في المنهج.', 'Finish the first two projects in the curriculum.') }],
      challenge: B('خلّي الأداة تقرا الجدول من **نص CSV** (سطور مفصولة بـ \\n وفواصل) بدل المصفوفة، وتتعامل مع سطر فاضي في الآخر ومسافات زيادة، وتطبع في التقرير أكتر يوم مبيعات ونسبة كل مدينة من الإجمالي.', 'Make the tool read the table from **CSV text** (lines separated by \\n and commas) instead of the array, handle an empty last line and extra spaces, and add the best sales day and each city’s share of the total to the report.'),
      quiz: [
        { q: B('أول خطوة في أي أداة بيانات:', 'The first step of any data tool:'), o: [B('اقرا البيانات', 'read the data'), B('اعرض التقرير', 'present the report'), B('رتّب', 'sort')], a: 0, why: B('اقرا ← حوّل ← نضّف...', 'Read → convert → clean...') },
        { q: B('ليه `r.qty` أحسن من `r[3]`؟', 'Why is `r.qty` better than `r[3]`?'), o: [B('أوضح ومش بيتكسر لو الأعمدة اترتبت', 'clearer, and survives reordered columns'), B('أسرع', 'faster'), B('مفيش فرق', 'no difference')], a: 0, why: B('الاسم بيوصف.', 'The name describes it.') },
        { q: B('كمية «x» في صف:', 'A quantity of «x» in a row:'), o: [B('تتسجّل كمشكلة', 'is recorded as a problem'), B('تتحوّل 1', 'becomes 1'), B('تتمسح', 'is deleted')], a: 0, why: B('متخمّنش.', 'Do not guess.') },
        { q: B('الإجمالي حسب المدينة بيتعمل بـ:', 'The total by city is built with:'), o: [B('كائن تجميع', 'a grouping object'), B('sort بس', 'only sort'), B('splice', 'splice')], a: 0, why: B('byCity[city] += sum.', 'byCity[city] += sum.') }
      ] },

    { title: B('مراجعة الشهر الأول ومشروعه والاختبار', 'Month 1 review, project and test'),
      goal: B('تراجع الشهر كله، وتسلّم مشروع الشهر الأول، وتعدّي اختبار الأسبوع (وبعده امتحان الشهر).', 'Review the whole month, deliver the first month’s project, and pass the weekly test (then the month exam).'),
      review: [
        B('المصفوفة قايمة مرتبة من 0، وconst عليها معناه الاسم مش المحتوى.', 'An array is an ordered list from 0; const on it fixes the name, not the contents.'),
        B('مصفوفة الكائنات هي شكل الجداول والـ APIs وitems في n8n.', 'An array of objects is the shape of tables, APIs and n8n items.'),
        B('push/pop من الآخر، وshift/unshift من الأول، وsplice من النص.', 'push/pop at the end, shift/unshift at the start, splice in the middle.'),
        B('sort وreverse وsplice بيغيّروا الأصل؛ toSorted وslice و... بيرجّعوا جديد.', 'sort, reverse and splice change the original; toSorted, slice and ... return new arrays.'),
        B('`[...a]` نسخة سطحية، وstructuredClone نسخة كاملة، و`b = a` نفس المصفوفة.', '`[...a]` is a shallow copy, structuredClone a full copy, and `b = a` the same array.'),
        B('sort للأرقام محتاج `(a, b) => a - b`.', 'Sorting numbers needs `(a, b) => a - b`.'),
        B('المتوسط مع فحص الفاضي، والوسيط أصدق مع القيم الشاذة.', 'The mean needs an empty check; the median is more honest with outliers.'),
        B('أداة البيانات: اقرا ← حوّل ← نضّف ← اتحقق ← احسب ← اعرض.', 'A data tool: read → convert → clean → validate → calculate → present.')
      ],
      project: B('**مشروع الشهر الأول: «محلل مبيعات الفرع».** سكربت Node `branch-report.mjs` (ونسخة صفحة اختيارية):\n1. **المدخل:** نص CSV فيه 40 سطر على الأقل (اكتبه بنفسك بأخطاء حقيقية: مسافات، حروف كبيرة، كميات نصوص، أسعار بفاصلة آلاف، سطور فاضية، تاريخ ناقص).\n2. حوّل لكائنات ونضّف كل حقل، واعزل الصفوف الغلط برقم الصف والسبب.\n3. احسب: الإجمالي والمتوسط والوسيط، والإجمالي حسب المدينة والمنتج واليوم، وأكتر 5 منتجات، ونسبة كل مدينة.\n4. طبّق قاعدة خصم موسمي (من محرك قواعد الأسبوع 3) على الإجمالي.\n5. اطبع تقرير مترتب بالكامل + قسم المشاكل.\n6. اكتب 6 حالات اختبار لدوال التنضيف والإحصاء كلها ✓.\nالكود كله const/let بأسماء واضحة، ودالة لكل خطوة، ومفيش حاجة بتغيّر البيانات الأصلية.',
        '**The first month’s project: «branch sales analyser».** A Node script `branch-report.mjs` (and an optional page version):\n1. **Input:** CSV text with at least 40 lines (write it yourself with real mistakes: spaces, capitals, quantities as words, prices with thousands separators, blank lines, missing dates).\n2. Convert to objects, clean every field, and set aside bad rows with their row number and reason.\n3. Calculate: total, mean and median; totals by city, product and day; the top 5 products; each city’s share.\n4. Apply a seasonal discount rule (from week 3’s rules engine) to the total.\n5. Print a fully lined-up report plus a problems section.\n6. Write 6 test cases for the cleaning and statistics functions, all ✓.\nAll code const/let with clear names, a function per step, and nothing that changes the original data.'),
      test: [
        { q: B('`[5, 6, 7].at(-1)`:', '`[5, 6, 7].at(-1)`:'), o: ['7', '5', 'undefined'], a: 0, why: B('السالب من الآخر.', 'Negatives count from the end.') },
        { q: B('`const list = []; list.push(1);` هيعمل:', '`const list = []; list.push(1);` will:'), o: [B('يضيف عادي', 'add normally'), B('TypeError', 'throw a TypeError'), B('ولا حاجة', 'do nothing')], a: 0, why: B('المحتوى بيتغيّر عادي.', 'The contents can change.') },
        { q: B('تاخد أول عنصر من طابور:', 'Taking the first item off a queue:'), o: ['shift()', 'pop()', 'slice(1)'], a: 0, why: B('shift من الأول.', 'shift takes from the start.') },
        { q: B('`["a","b","c"].splice(1, 1)` بيرجّع:', '`["a","b","c"].splice(1, 1)` returns:'), o: ['["b"]', '["a","c"]', '"b"'], a: 0, why: B('مصفوفة اللي اتشال.', 'An array of what was removed.') },
        { q: B('أنهي واحدة **مش** بتغيّر الأصل؟', 'Which one does **not** change the original?'), o: ['slice()', 'sort()', 'reverse()'], a: 0, why: B('slice بترجّع جديد.', 'slice returns a new array.') },
        { q: B('`[...orders]` لمصفوفة كائنات:', '`[...orders]` for an array of objects:'), o: [B('مصفوفة جديدة بنفس الكائنات', 'a new array holding the same objects'), B('نسخة كاملة مستقلة', 'a fully independent copy'), B('نفس المصفوفة', 'the same array')], a: 0, why: B('shallow copy.', 'A shallow copy.') },
        { q: B('`[3, 20, 100].sort((a, b) => a - b)`:', '`[3, 20, 100].sort((a, b) => a - b)`:'), o: ['[3, 20, 100]', '[100, 20, 3]', '[100, 20, 3].sort()'], a: 0, why: B('تصاعدي صح.', 'Correct ascending order.') },
        { q: B('`const [a, , c] = [1, 2, 3]` قيمة c:', '`const [a, , c] = [1, 2, 3]` c is:'), o: ['3', '2', 'undefined'], a: 0, why: B('عدّى التاني.', 'It skipped the second.') },
        { q: B('متوسط مصفوفة فاضية من غير فحص:', 'The mean of an empty array without a check:'), o: ['NaN', '0', 'null'], a: 0, why: B('0 ÷ 0.', '0 ÷ 0.') },
        { q: B('الوسيط أحسن من المتوسط لما:', 'The median beats the mean when:'), o: [B('فيه قيمة شاذة كبيرة', 'there is a big outlier'), B('كل القيم متساوية', 'all values are equal'), B('المصفوفة فاضية', 'the array is empty')], a: 0, why: B('القيمة الشاذة بتشد المتوسط.', 'An outlier pulls the mean.') },
        { q: B('أسهل طريقة تشيل المكرر من أسماء:', 'The easiest way to remove duplicate names:'), o: ['[...new Set(names)]', 'names.sort()', 'names.splice()'], a: 0, why: B('Set قيم فريدة.', 'A Set holds unique values.') },
        { q: B('الصف اللي فيه بيانات غلط في الأداة:', 'A row with bad data in the tool:'), o: [B('يتعزل برقمه وسببه', 'is set aside with its number and reason'), B('يتصلّح بالتخمين', 'is fixed by guessing'), B('يتجاهل بصمت', 'is silently ignored')], a: 0, why: B('المراجعة محتاجة السبب.', 'Review needs the reason.') },
        { q: B('ترتيب الخطوات الصح:', 'The right order of steps:'), o: [B('اقرا ← حوّل ← نضّف ← احسب ← اعرض', 'read → convert → clean → calculate → present'), B('اعرض ← اقرا ← احسب', 'present → read → calculate'), B('احسب ← اقرا ← نضّف', 'calculate → read → clean')], a: 0, why: B('pipeline بالترتيب.', 'The pipeline, in order.') }
      ] }
  ]
};
