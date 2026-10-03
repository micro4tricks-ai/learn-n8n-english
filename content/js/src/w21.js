// JavaScript week 21 — JavaScript in the n8n Code node in depth.
// Runnable examples include a tiny stand-in for $input so the Code-node body runs in the page.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('جافاسكريبت في Code node بتاع n8n بعمق', 'JavaScript in the n8n Code node in depth'),
  goal: B('تكتب Code node زي المحترفين: تفهم شكل الـ items والوضعين، وتشاور على nodes تانية، وتحوّل وتجمّع وتدمج، وتشتغل بالتواريخ بـ Luxon، وتحفظ حالة بين التشغيلات، وتتعامل مع الأخطاء والملفات — وتعرف إمتى متكتبش كود أصلًا.',
          'Write Code nodes like a pro: understand the shape of items and the two modes, reference other nodes, transform, aggregate and merge, work with dates in Luxon, keep state between runs, handle errors and files — and know when not to write code at all.'),
  days: [
    { title: B('الـ items والوضعين', 'Items and the two modes'),
      goal: B('تفهم إيه اللي داخل وإيه اللازم يطلع.', 'Understand what goes in and what must come out.'),
      learn: [
        L(B('شكل البيانات', 'The shape of the data'),
          B('كل اللي بيعدّي بين nodes في n8n = مصفوفة **n8n item**؛ كل item = `{ json: {...}, binary?: {...}, pairedItem? }`. الـ **json key** إجباري وفيه بياناتك. و**code node** لازم **يرجّع** مصفوفة بنفس الشكل — غلطة الشكل دي أشهر خطأ للمبتدئين.', 'Everything passed between n8n nodes = an array, each element an **n8n item**; each item = `{ json: {...}, binary?: {...}, pairedItem? }`. The **json key** is required and holds your data. A **code node** must **return** an array of the same shape — getting this shape wrong is the most common beginner error.'),
          '// a stand-in for what n8n gives the Code node\nconst items = [{ json: { id: 1, name: " sara ", total: "250" } }, { json: { id: 2, name: "OMAR", total: "90.5" } }];\nconst $input = { all: () => items, first: () => items[0] };\n\n// ── the Code node body ("Run Once for All Items") ──\nfunction codeNode() {\n  return $input.all().map(item => ({\n    json: {\n      id: item.json.id,\n      name: item.json.name.trim().toLowerCase().replace(/^\\w/, c => c.toUpperCase()),\n      total: Number(item.json.total),\n    },\n  }));\n}\nconsole.log(JSON.stringify(codeNode(), null, 1));', J),
        L(B('Run Once for All ولا for Each؟', 'Run Once for All or for Each?'),
          B('**run once for all items**: الكود بيشتغل مرة، و`$input.all()` فيه كل الـ items — للتجميع والترتيب والمقارنة. **run once for each item**: الكود بيشتغل لكل item لوحده، و`$json` = بياناته، وترجّع كائن واحد `{ json }`. القاعدة: لو محتاج تشوف أكتر من item مع بعض ← All.', '**run once for all items**: the code runs once, and `$input.all()` holds every item — for totals, sorting and comparing. **run once for each item**: the code runs per item, `$json` = its data, and you return one `{ json }` object. The rule: if you need to see several items together → All.'),
          '// "Run Once for Each Item": $json is the current item\nconst total = Number($json.total);\nreturn {\n  json: {\n    ...$json,\n    total,\n    vip: total > 1000,\n    vat: Math.round(total * 0.14 * 100) / 100,\n  },\n};', S),
        L(B('أخطاء الشكل الشائعة', 'Common shape mistakes'),
          B('n8n الحديث بيصلّح شوية لوحده (لو رجّعت كائنات من غير json)، بس اعرف الأخطاء: رجّعت كائن مش مصفوفة في وضع All؛ نسيت return؛ رجّعت `undefined` لـ item؛ رجّعت قيمة مش كائن (`[1, 2]`). والكود ده بيتحقق من الشكل زي ما n8n بيعمل:', 'Recent n8n fixes a little by itself (if you return objects without json), but know the mistakes: returning an object, not an array, in All mode; forgetting return; returning `undefined` for an item; returning non-objects (`[1, 2]`). This code checks the shape like n8n does:'),
          'function checkOutput(out) {\n  if (!Array.isArray(out)) return "✗ must return an array of items";\n  const bad = out.findIndex(i => !i || typeof i !== "object" || typeof i.json !== "object" || i.json === null);\n  return bad === -1 ? `✓ ${out.length} item(s)` : `✗ item ${bad} has no json object`;\n}\nconsole.log(checkOutput([{ json: { a: 1 } }]));\nconsole.log(checkOutput({ json: { a: 1 } }));\nconsole.log(checkOutput([{ a: 1 }]));\nconsole.log(checkOutput([1, 2]));\nconsole.log(checkOutput(undefined));', J)
      ],
      practice: [
        B('اعمل Code node بينضّف أسماء وأرقام 5 items.', 'Write a Code node cleaning the names and numbers of 5 items.'),
        B('اكتب نفس المنطق في الوضعين وقارن.', 'Write the same logic in both modes and compare.'),
        B('ارجّع كائن بدل مصفوفة وشوف رسالة n8n.', 'Return an object instead of an array and read n8n’s message.'),
        B('افتح Output كـ JSON وشوف json وpairedItem.', 'Open the Output as JSON and look at json and pairedItem.')
      ],
      words: [
        W('code node', 'node بيشغّل كود JS أو بايثون في n8n', 'an n8n node running JS or Python code', 'Clean the data in a Code node.'),
        W('n8n item', 'وحدة بيانات بتعدّي بين nodes', 'one unit of data passed between nodes', 'Each row becomes one n8n item.'),
        W('json key', 'المفتاح json اللي فيه بيانات الـ item', 'the json key holding an item’s data', 'Put your fields under the json key.'),
        W('run once for all items', 'الكود يشتغل مرة على كل الـ items', 'the code runs once over all items', 'Use Run Once for All Items to total.'),
        W('run once for each item', 'الكود يشتغل لكل item لوحده', 'the code runs separately per item', 'Run Once for Each Item exposes $json.'),
        W('$input', 'مدخل الـ Code node', 'the Code node’s input', '$input.all() returns every item.'),
        W('$json', 'بيانات الـ item الحالي', 'the current item’s data', '$json.total is the order total.')
      ],
      read: [{ lib: 'n8n Docs: Code node', what: B('اقرا Choose a mode وUsage.', 'Read Choose a mode and Usage.') }, { t: 'n8n Docs: Data structure', url: 'https://docs.n8n.io/build/work-with-data/understand-n8ns-data-structure', what: B('اقرا شكل الـ items.', 'Read the shape of items.') }],
      challenge: B('اعمل workflow: Manual Trigger ← Code (يولّد 20 طلب وهمي) ← Code (All: ينضّف ويحسب الضريبة) ← Code (Each: يضيف vip) — وقارن وقت التنفيذ بين الوضعين.', 'Build a workflow: Manual Trigger → Code (generates 20 fake orders) → Code (All: cleans and adds VAT) → Code (Each: adds vip) — and compare execution time between the modes.'),
      quiz: [
        Q(B('Code node في وضع All لازم يرجّع:', 'A Code node in All mode must return:'), [['مصفوفة items', 'an array of items'], ['كائن', 'an object'], ['نص', 'a string']], 0, B('[{ json }].', '[{ json }].')),
        Q(B('ترتيب كل الطلبات حسب الإجمالي:', 'Sorting all orders by total:'), ['Run Once for All Items', 'Run Once for Each Item', B('أي واحد', 'either')], 0, B('محتاج الكل.', 'Needs them all.')),
        Q(B('$json في وضع Each:', '$json in Each mode:'), [['بيانات الـ item الحالي', 'the current item’s data'], ['كل الـ items', 'all items'], ['الـ workflow', 'the workflow']], 0, B('item واحد.', 'One item.'))
      ] },

    { title: B('الإشارة لـ nodes تانية والـ expressions', 'Referencing other nodes and expressions'),
      goal: B('تجيب بيانات من أي node قبلك وتعرف الفرق بين الكود والـ expression.', 'Pull data from any earlier node and know code from expressions.'),
      learn: [
        L(B('$(\'اسم الـ node\')', '$(\'Node name\')'),
          B('**node reference**: `$("Get Customer").first().json` = أول item من node بالاسم ده، و`.all()` = كلهم، و`.item` = الـ item **المرتبط** بالحالي (عن طريق pairedItem). كده تقدر تجمع بيانات من 3 nodes قبلك من غير Merge. غيّر اسم الـ node = لازم تغيّر الكود (n8n بيعمل ده لوحده في الأغلب).', 'A **node reference**: `$("Get Customer").first().json` = the first item of the node with that name, `.all()` = all of them, and `.item` = the item **linked** to the current one (through pairedItem). So you can combine data from 3 earlier nodes without a Merge. Rename the node = update the code (n8n mostly does this for you).'),
          '// Code node, Run Once for All Items\nconst settings = $("Settings").first().json;            // e.g. { vatRate: 0.14, currency: "EGP" }\nconst customers = new Map($("Get Customers").all().map(i => [i.json.id, i.json]));\nreturn $input.all().map(order => ({\n  json: {\n    ...order.json,\n    customerName: customers.get(order.json.customerId)?.name ?? "unknown",\n    totalWithVat: order.json.total * (1 + settings.vatRate),\n    currency: settings.currency,\n  },\n}));', S),
        L(B('المتغيرات المدمجة', 'Built-in variables'),
          B('n8n بيدّيك: `$workflow.id/name`، و`$execution.id` (حطه في اللوج والرسايل — correlation id جاهز!)، و`$execution.mode` (test ولا production)، و`$now` و`$today` (Luxon)، و`$env` (لو مسموح)، و`$vars`. وفي وضع Each: `$itemIndex`.', 'n8n gives you: `$workflow.id/name`, `$execution.id` (put it in logs and messages — a ready correlation id!), `$execution.mode` (test or production), `$now` and `$today` (Luxon), `$env` (when allowed) and `$vars`. And in Each mode: `$itemIndex`.'),
          'return [{\n  json: {\n    workflow: $workflow.name,\n    run: $execution.id,\n    isTest: $execution.mode === "manual",\n    at: $now.setZone("Africa/Cairo").toFormat("yyyy-LL-dd HH:mm"),\n    count: $input.all().length,\n  },\n}];', S),
        L(B('expression ولا Code node؟', 'Expression or Code node?'),
          B('**expression** = `{{ … }}` جوه أي خانة: سطر JS صغير بيرجّع قيمة (`{{ $json.name.trim() }}`، `{{ $json.total > 1000 ? "VIP" : "" }}`). استخدمه للحاجات الصغيرة. Code node لما: منطق أكتر من سطرين، أو تجميع، أو loops، أو حاجة هتتعاد. والـ expression ممكن يستخدم نفس الـ $ helpers.', 'An **expression** = `{{ … }}` inside any field: a small JS line returning a value (`{{ $json.name.trim() }}`, `{{ $json.total > 1000 ? "VIP" : "" }}`). Use it for small things. A Code node when: logic beyond two lines, aggregation, loops, or something reused. Expressions can use the same $ helpers.'),
          'Subject:   Order {{ $json.id }} — {{ $json.total.toFixed(2) }} {{ $("Settings").first().json.currency }}\nTo:        {{ $json.email.toLowerCase().trim() }}\nPriority:  {{ $json.total > 1000 ? "high" : "normal" }}\nWhen:      {{ $now.plus({ days: 2 }).toFormat("cccc d LLL") }}\n→ more than this? use a Code node', T)
      ],
      practice: [
        B('اجمع بيانات من node «Settings» و«Customers» في Code node.', 'Combine data from a «Settings» node and a «Customers» node in a Code node.'),
        B('حط $execution.id في رسالة تنبيه.', 'Put $execution.id into an alert message.'),
        B('حوّل 3 Code nodes صغيرين لـ expressions.', 'Turn 3 tiny Code nodes into expressions.'),
        B('جرّب .item وشوف الربط بين items.', 'Try .item and look at the link between items.')
      ],
      words: [
        W('node reference', 'الإشارة لـ node بالاسم', 'pointing to a node by name', '$("Settings") is a node reference.'),
        W('expression', 'كود صغير جوه {{ }} في خانة', 'a small piece of code inside {{ }} in a field', 'Use an expression for the subject line.'),
        W('$execution', 'معلومات التشغيل الحالي', 'information about the current run', 'Log $execution.id with errors.'),
        W('$now', 'الوقت الحالي كـ Luxon DateTime', 'the current time as a Luxon DateTime', '$now.toISO() gives the timestamp.'),
        W('$vars', 'متغيرات مشتركة على مستوى n8n', 'shared variables across n8n', 'Read the API base from $vars.')
      ],
      read: [{ lib: 'n8n Docs: Built-in methods and variables', what: B('اقرا Current node input وOutput of other nodes.', 'Read Current node input and Output of other nodes.') }, { t: 'n8n Docs: Expressions versus data nodes', url: 'https://docs.n8n.io/build/work-with-data/expressions-versus-data-nodes', what: B('اقرا الأمثلة.', 'Read the examples.') }],
      challenge: B('اعمل workflow فيه Settings (Set node) وCustomers وOrders، وCode node واحد بيدمجهم ويحسب لكل عميل: عدد الطلبات والإجمالي بالضريبة والعملة، ويحط $execution.id في كل item.', 'Build a workflow with Settings (a Set node), Customers and Orders, and one Code node merging them and computing per customer: order count, total with VAT and currency, adding $execution.id to every item.'),
      quiz: [
        Q(B('أول item من node اسمه Settings:', 'The first item of a node named Settings:'), ['$("Settings").first().json', '$json.Settings', '$input.Settings'], 0, B('بالاسم.', 'By name.')),
        Q(B('سطر واحد في خانة الـ Subject:', 'One line in the Subject field:'), ['expression', 'Code node', 'Function'], 0, B('{{ }}.', '{{ }}.')),
        Q(B('correlation id جاهز في n8n:', 'A ready-made correlation id in n8n:'), ['$execution.id', '$json.id', 'Math.random()'], 0, B('لكل تشغيل.', 'Per run.'))
      ] },

    { title: B('التحويلات الشائعة', 'Common transformations'),
      goal: B('تقسّم وتجمّع وتدمج items بثقة.', 'Split, aggregate and merge items with confidence.'),
      learn: [
        L(B('تقسيم item لـ items', 'Splitting one item into many'),
          B('**split into items**: طلب واحد فيه مصفوفة منتجات ← item لكل منتج (عشان كل منتج يروح للـ CRM لوحده). استخدم `flatMap`، وحط **paireditem** عشان n8n يعرف كل item جديد جه من أنهي item قديم (**item linking**) — مهم لـ `.item` بعد كده.', '**split into items**: one order containing an array of products → one item per product (so each product goes to the CRM separately). Use `flatMap`, and set **paireditem** so n8n knows which old item each new one came from (**item linking**) — important for `.item` later.'),
          'const items = [\n  { json: { orderId: 101, customer: "Sara", lines: [{ sku: "A1", qty: 2 }, { sku: "B2", qty: 1 }] } },\n  { json: { orderId: 102, customer: "Omar", lines: [{ sku: "A1", qty: 5 }] } },\n];\nconst $input = { all: () => items };\n// ── Code node body ──\nconst out = $input.all().flatMap((item, index) =>\n  item.json.lines.map(line => ({\n    json: { orderId: item.json.orderId, customer: item.json.customer, ...line },\n    pairedItem: { item: index },\n  }))\n);\nconsole.log(out.map(i => `${i.json.orderId}/${i.json.sku}×${i.json.qty} ← item ${i.pairedItem.item}`).join("\\n"));', J),
        L(B('تجميع items', 'Aggregating items'),
          B('**aggregate items**: العكس — كل الـ items لـ item واحد (ملخص لرسالة Slack، أو body واحد لـ API بيقبل batch). ومجموعات: إجمالي لكل مدينة. ممكن تستخدم Aggregate وSummarize nodes — بس Code أمرن لما المنطق يكبر.', '**aggregate items**: the reverse — all items into one (a summary for a Slack message, or one body for an API accepting batches). And groups: a total per city. The Aggregate and Summarize nodes can do it — but Code is more flexible when the logic grows.'),
          'const items = [["Cairo", 250], ["Giza", 90.5], ["Cairo", 1200], ["Alex", 45], ["Giza", 300]].map(([city, total], i) => ({ json: { id: 100 + i, city, total } }));\nconst $input = { all: () => items };\n// ── Code node body ──\nconst byCity = {};\nfor (const { json } of $input.all()) {\n  const c = (byCity[json.city] ??= { city: json.city, orders: 0, total: 0 });\n  c.orders++; c.total += json.total;\n}\nconst summary = Object.values(byCity).sort((a, b) => b.total - a.total);\nconst text = summary.map(c => `• ${c.city}: ${c.orders} orders, ${c.total.toFixed(2)} EGP`).join("\\n");\nconsole.log(JSON.stringify([{ json: { summary, text } }], null, 1));', J),
        L(B('دمج مصدرين بـ lookup', 'Merging two sources with a lookup'),
          B('عندك طلبات من Shopify وعملاء من شيت — عايز تضيف بيانات العميل لكل طلب. بدل loop جوه loop (بطيء مع الآلاف)، اعمل **lookup map** (`new Map`) من المصدر التاني مرة واحدة، وبعدين `get` لكل طلب. ده اللي Merge node بيعمله في وضع «by key».', 'You have orders from Shopify and customers from a sheet — you want customer data on each order. Instead of a loop inside a loop (slow with thousands), build a **lookup map** (`new Map`) from the second source once, then `get` per order. That is what the Merge node does in «by key» mode.'),
          'const customers = [{ json: { phone: "+201001234567", name: "Sara", tier: "gold" } }, { json: { phone: "+201112223334", name: "Omar", tier: "silver" } }];\nconst orders = [{ json: { id: 1, phone: "+201001234567", total: 250 } }, { json: { id: 2, phone: "+201550000000", total: 90 } }];\nconst $ = name => ({ all: () => (name === "Customers" ? customers : orders) });\n// ── Code node body ──\nconst byPhone = new Map($("Customers").all().map(c => [c.json.phone, c.json]));\nconst out = $("Orders").all().map(o => {\n  const c = byPhone.get(o.json.phone);\n  return { json: { ...o.json, name: c?.name ?? null, tier: c?.tier ?? "new", matched: Boolean(c) } };\n});\nconsole.log(out.map(i => i.json));', J)
      ],
      practice: [
        B('قسّم طلبات فيها منتجات لـ item لكل منتج بـ pairedItem.', 'Split orders with products into one item per product with pairedItem.'),
        B('اعمل ملخص Slack لكل مدينة.', 'Build a per-city Slack summary.'),
        B('ادمج طلبات وعملاء بـ Map.', 'Merge orders and customers with a Map.'),
        B('قارن الـ Code بـ Aggregate/Merge nodes.', 'Compare the Code with the Aggregate/Merge nodes.')
      ],
      words: [
        W('split into items', 'تحويل مصفوفة جوه item لـ items منفصلة', 'turning an array inside one item into separate items', 'Split into items before the CRM node.'),
        W('paireditem', 'ربط item جديد بالـ item اللي جه منه', 'linking a new item to the one it came from', 'Set pairedItem when creating items.'),
        W('item linking', 'تتبع أصل كل item بين nodes', 'tracing each item’s origin across nodes', 'Item linking makes .item work.'),
        W('aggregate items', 'دمج items كتير في item واحد', 'combining many items into one', 'Aggregate items into one Slack message.'),
        W('lookup map', 'Map للبحث السريع بمفتاح', 'a Map for fast lookup by key', 'Build a lookup map of customers by phone.')
      ],
      read: [{ t: 'n8n Docs: Item linking in the Code node', url: 'https://docs.n8n.io/build/work-with-data/reference-data/link-data-items/preserving-linking-in-the-code-node', what: B('اقرا pairedItem.', 'Read about pairedItem.') }],
      challenge: B('workflow «طلبات اليوم»: يجيب طلبات (HTTP) وعملاء (شيت)، Code يدمجهم بـ Map، Code يقسّم لسطور منتجات بـ pairedItem، وCode يجمّع ملخص لكل مدينة لرسالة واحدة.', 'A «today’s orders» workflow: fetch orders (HTTP) and customers (sheet), a Code node merging them with a Map, a Code node splitting into product lines with pairedItem, and a Code node aggregating a per-city summary into one message.'),
      quiz: [
        Q(B('دمج 5000 طلب مع 5000 عميل:', 'Merging 5000 orders with 5000 customers:'), [['Map مرة وget', 'build a Map once and get'], ['loop جوه loop', 'a loop inside a loop'], ['يدوي', 'by hand']], 0, B('أسرع بكتير.', 'Much faster.')),
        Q(B('pairedItem بيقول:', 'pairedItem says:'), [['الـ item ده جه من أنهي item', 'which item this one came from'], ['ترتيب الطباعة', 'the print order'], ['اللون', 'the colour']], 0, B('linking.', 'Linking.')),
        Q(B('رسالة Slack واحدة لكل الطلبات:', 'One Slack message for all orders:'), ['aggregate', 'split', 'filter'], 0, B('items ← item.', 'Items → one item.'))
      ] },

    { title: B('التواريخ والحالة والأدوات', 'Dates, state and helpers'),
      goal: B('تستخدم Luxon والحالة المحفوظة والمساعدات المدمجة.', 'Use Luxon, saved state and the built-in helpers.'),
      learn: [
        L(B('Luxon', 'Luxon'),
          B('n8n بيدّيك **luxon** جاهز: `DateTime` و`$now` و`$today`. `DateTime.fromISO(s, { zone })`، `.plus({ days: 3 })`، `.diff(other, "days")`، `.startOf("month")`، `.toFormat("dd/LL/yyyy")`، و`.setZone("Asia/Riyadh")`. والـ **datetime** بتاعه immutable — كل عملية بترجّع نسخة جديدة.', 'n8n gives you **luxon** ready: `DateTime`, `$now` and `$today`. `DateTime.fromISO(s, { zone })`, `.plus({ days: 3 })`, `.diff(other, "days")`, `.startOf("month")`, `.toFormat("dd/LL/yyyy")` and `.setZone("Asia/Riyadh")`. Its **datetime** values are immutable — each operation returns a new copy.'),
          '// Code node, Run Once for Each Item\nconst created = DateTime.fromISO($json.createdAt, { zone: "utc" }).setZone("Africa/Cairo");\nconst due = created.plus({ days: 3 }).endOf("day");\nconst lateDays = Math.floor($now.diff(due, "days").days);\nreturn {\n  json: {\n    ...$json,\n    createdLocal: created.toFormat("dd/LL/yyyy HH:mm"),\n    due: due.toISODate(),\n    late: lateDays > 0,\n    lateDays: Math.max(0, lateDays),\n    monthKey: created.toFormat("yyyy-LL"),\n  },\n};', S),
        L(B('حالة بين التشغيلات', 'State between runs'),
          B('`$getWorkflowStaticData("global")` = **static data**: كائن صغير n8n بيحفظه بعد كل تشغيل **production** (مش التشغيل اليدوي!). مثالي لـ cursor (آخر id أو آخر وقت) أو dedupe بسيط — زي state.json في أسبوع 16. لحاجات كبيرة: قاعدة بيانات أو Data Table.', '`$getWorkflowStaticData("global")` = **static data**: a small object n8n saves after each **production** run (not manual runs!). Perfect for a cursor (the last id or time) or simple dedupe — like state.json in week 16. For bigger needs: a database or a Data Table.'),
          '// Code node after "Get new orders" — only pass orders not seen before\nconst state = $getWorkflowStaticData("global");\nconst lastId = state.lastId ?? 0;\nconst fresh = $input.all().filter(i => i.json.id > lastId);\nif (fresh.length) state.lastId = Math.max(...fresh.map(i => i.json.id));   // saved after a production run\nreturn fresh;', S),
        L(B('JMESPath ومساعدات تانية', 'JMESPath and other helpers'),
          B('**jmespath** (`$jmespath(obj, query)`) بيستعلم في JSON متداخل بسطر. و`$env.MY_VAR` لو الأدمن سمح. ولو n8n self-hosted ومسموح (`NODE_FUNCTION_ALLOW_BUILTIN=crypto`) تقدر `require("crypto")` — مثلًا عشان توقّع طلب أو تعمل hash. الكود ده بيعمل اللي jmespath بيعمله بـ JS عادي:', '**jmespath** (`$jmespath(obj, query)`) queries nested JSON in one line. `$env.MY_VAR` if the admin allows it. And on self-hosted n8n where allowed (`NODE_FUNCTION_ALLOW_BUILTIN=crypto`) you can `require("crypto")` — for example to sign a request or hash. This code does what that jmespath query does, in plain JS:'),
          'const data = { shop: "demo", orders: [{ id: 1, total: 250, tags: ["vip"] }, { id: 2, total: 90, tags: [] }, { id: 3, total: 1200, tags: ["vip", "cairo"] }] };\n// $jmespath(data, "orders[?total > `100`].id")  →  [1, 3]\nconsole.log(data.orders.filter(o => o.total > 100).map(o => o.id));\n// $jmespath(data, "orders[?contains(tags, \'vip\')].{id: id, total: total}")\nconsole.log(data.orders.filter(o => o.tags.includes("vip")).map(({ id, total }) => ({ id, total })));', J)
      ],
      practice: [
        B('احسب «متأخر كام يوم» لطلبات بـ Luxon بتوقيت القاهرة.', 'Compute «days late» for orders with Luxon in Cairo time.'),
        B('اعمل cursor بـ static data وجرّبه في production.', 'Build a cursor with static data and test it in production.'),
        B('استعلم بـ $jmespath في رد API متداخل.', 'Query a nested API reply with $jmespath.'),
        B('اعرف إعدادات NODE_FUNCTION_ALLOW_BUILTIN في n8n عندك.', 'Find the NODE_FUNCTION_ALLOW_BUILTIN setting on your n8n.')
      ],
      words: [
        W('luxon', 'مكتبة التواريخ المدمجة في n8n', 'the date library built into n8n', 'Luxon handles the time zones.'),
        W('datetime', 'كائن تاريخ ووقت في Luxon', 'a date-and-time object in Luxon', 'DateTime.fromISO parses the date.'),
        W('static data', 'بيانات صغيرة محفوظة بين التشغيلات', 'small data saved between runs', 'Static data keeps the last id.'),
        W('jmespath', 'لغة استعلام في JSON', 'a query language for JSON', '$jmespath filters nested arrays.'),
        W('$env', 'متغيرات البيئة في n8n', 'environment variables in n8n', '$env may be blocked for security.')
      ],
      read: [{ t: 'n8n Docs: Work with dates and times', url: 'https://docs.n8n.io/build/work-with-data/handle-special-data-types/work-with-dates-and-times', what: B('اقرا الأمثلة.', 'Read the examples.') }, { t: 'n8n Docs: getWorkflowStaticData', url: 'https://docs.n8n.io/build/code-in-n8n/cookbook/built-in-methods-and-variables-examples/getworkflowstaticdata', what: B('اقرا الملاحظة عن التشغيل اليدوي.', 'Read the note about manual runs.') }],
      challenge: B('workflow مجدول كل ساعة: يجيب طلبات جديدة بس (cursor في static data)، يحسب SLA بـ Luxon (متأخر/في الميعاد بتوقيتك)، ويبعت تنبيه للمتأخر — وجرّبه في production مش يدوي.', 'An hourly scheduled workflow: fetch only new orders (a cursor in static data), compute SLA with Luxon (late/on time in your zone), and alert on late ones — tested in production, not manually.'),
      quiz: [
        Q(B('static data بيتحفظ في:', 'Static data is saved on:'), [['تشغيل production', 'production runs'], ['التشغيل اليدوي', 'manual runs'], ['أبدًا', 'never']], 0, B('مش في الاختبار.', 'Not in tests.')),
        Q(B('$now.plus({ days: 3 }):', '$now.plus({ days: 3 }):'), [['نسخة جديدة بعد 3 أيام', 'a new copy 3 days later'], ['بيغيّر $now', 'changes $now'], ['خطأ', 'an error']], 0, B('immutable.', 'Immutable.')),
        Q(B('require("crypto") في Code node:', 'require("crypto") in a Code node:'), [['لو الأدمن سمح', 'if the admin allows it'], ['دايمًا', 'always'], ['مستحيل', 'never']], 0, B('allowlist.', 'An allowlist.'))
      ] },

    { title: B('الأخطاء والملفات والأداء', 'Errors, files and performance'),
      goal: B('Code node بيفشل بوضوح، وبيتعامل مع الملفات، وبيتختبر برة n8n.', 'A Code node that fails clearly, handles files and is tested outside n8n.'),
      learn: [
        L(B('الأخطاء', 'Errors'),
          B('`throw new Error("…")` بيوقّف الـ node برسالة واضحة (وبيشغّل Error Workflow). لو عايز تكمّل بالباقي: فعّل **continue on fail** أو **error output** في إعدادات الـ node، أو جوه الكود افصل السليم عن الفاشل وارجّع الفاشل بعلامة. ودايمًا الرسالة فيها id العنصر.', '`throw new Error("…")` stops the node with a clear message (and triggers the Error Workflow). To carry on with the rest: enable **continue on fail** or an **error output** in the node settings, or in code separate good from bad and return the bad ones flagged. Always include the item’s id in the message.'),
          'const items = [{ json: { id: 1, email: "sara@example.com" } }, { json: { id: 2, email: "not-an-email" } }, { json: { id: 3 } }];\nconst $input = { all: () => items };\n// ── Code node body ──\nconst ok = [], bad = [];\nfor (const item of $input.all()) {\n  const email = item.json.email?.trim().toLowerCase();\n  if (email && /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) ok.push({ json: { ...item.json, email } });\n  else bad.push({ json: { ...item.json, _error: `item ${item.json.id}: invalid or missing email` } });\n}\nif (ok.length === 0) throw new Error(`No valid emails in ${bad.length} item(s)`);\nconsole.log("pass on:", ok.map(i => i.json.id), "| flagged:", bad.map(i => i.json._error));', J),
        L(B('الملفات (binary)', 'Files (binary)'),
          B('الملفات في n8n بتتخزن في `binary` مش `json`: `item.binary.data` فيه `mimeType` و`fileName` والمحتوى. في Code node: `await this.helpers.getBinaryDataBuffer(i, "data")` يجيب Buffer، ولعمل ملف جديد: `await this.helpers.prepareBinaryData(buffer, "report.csv")`. **binary data** كـ **base64** ممكن تكبر 33%.', 'Files in n8n live in `binary`, not `json`: `item.binary.data` holds `mimeType`, `fileName` and the content. In a Code node: `await this.helpers.getBinaryDataBuffer(i, "data")` gets a Buffer, and to make a new file: `await this.helpers.prepareBinaryData(buffer, "report.csv")`. **binary data** as **base64** grows by 33%.'),
          '// Code node (All): read an uploaded CSV, count rows, and output a cleaned CSV file\nconst out = [];\nfor (let i = 0; i < $input.all().length; i++) {\n  const buf = await this.helpers.getBinaryDataBuffer(i, "data");\n  const text = buf.toString("utf8").replace(/^\\uFEFF/, "");\n  const lines = text.split(/\\r?\\n/).filter(Boolean);\n  const cleaned = "\\uFEFF" + lines.map(l => l.trim()).join("\\r\\n");\n  out.push({\n    json: { file: $input.all()[i].binary.data.fileName, rows: lines.length - 1 },\n    binary: { data: await this.helpers.prepareBinaryData(Buffer.from(cleaned, "utf8"), "cleaned.csv", "text/csv") },\n  });\n}\nreturn out;', S),
        L(B('اختبر برة n8n', 'Test outside n8n'),
          B('الكود الكبير في Code node صعب تختبره. حطّ المنطق في دالة نقية (بتاخد مصفوفة وترجّع مصفوفة) — اختبرها بـ node:test على جهازك، وبعدين الصقها في الـ node. واعرف حدود Code node: الذاكرة، والوقت، و**task runner** المعزول — للشغل التقيل: سيرفر Express بتاعك (أسبوع 18) وn8n ينادي عليه.', 'Big code in a Code node is hard to test. Put the logic in a pure function (array in, array out) — test it with node:test on your machine, then paste it into the node. And know the Code node’s limits: memory, time and the isolated **task runner** — for heavy work: your own Express server (week 18) with n8n calling it.'),
          'import { test } from "node:test";\nimport assert from "node:assert/strict";\n\n// the same function you paste into the Code node\nfunction enrich(rows, vat = 0.14) {\n  return rows.map(r => ({ ...r, total: Number(r.total), withVat: Math.round(Number(r.total) * (1 + vat) * 100) / 100 }));\n}\ntest("adds VAT and converts text totals", () => {\n  assert.deepEqual(enrich([{ id: 1, total: "100" }]), [{ id: 1, total: 100, withVat: 114 }]);\n});\ntest("keeps other fields", () => {\n  assert.equal(enrich([{ id: 2, total: 50, city: "Giza" }])[0].city, "Giza");\n});', N())
      ],
      practice: [
        B('اعمل Code node بيفصل السليم والفاشل.', 'Write a Code node separating good and bad items.'),
        B('فعّل error output ووصّل الفاشل لـ Slack.', 'Enable the error output and route failures to Slack.'),
        B('اقرا CSV مرفوع من Form Trigger في Code node.', 'Read a CSV uploaded via the Form Trigger in a Code node.'),
        B('انقل منطق Code node لدالة واختبرها بـ node:test.', 'Move a Code node’s logic into a function and test it with node:test.')
      ],
      words: [
        W('continue on fail', 'إعداد بيخلي الـ workflow يكمّل بعد خطأ', 'a setting letting the workflow continue after an error', 'Turn on continue on fail for the CRM node.'),
        W('error output', 'مخرج منفصل للـ items الفاشلة', 'a separate output for failed items', 'Route the error output to a review sheet.'),
        W('binary data', 'ملفات جوه الـ items', 'files carried inside items', 'The PDF is in the binary data.'),
        W('base64', 'تحويل bytes لنص', 'turning bytes into text', 'The image arrives as base64.'),
        W('task runner', 'العملية المعزولة اللي بتشغّل كود n8n', 'the isolated process running n8n code', 'The task runner limits memory.')
      ],
      read: [{ t: 'n8n Docs: Work with files and images', url: 'https://docs.n8n.io/build/work-with-data/handle-special-data-types/work-with-files-and-images', what: B('اقرا Process binary data in the Code node.', 'Read Process binary data in the Code node.') }, { t: 'n8n Docs: Handle errors gracefully', url: 'https://docs.n8n.io/build/flow-logic/handle-errors-gracefully', what: B('اقرا Error workflows.', 'Read Error workflows.') }],
      challenge: B('workflow «منظف ملفات العملاء»: Form Trigger يرفع CSV، Code يقرا الـ binary وينضّف (عربي، تليفونات، BOM)، ويطلّع ملفين (سليم ومرفوض) كـ binary — والمنطق نفسه مختبر بـ node:test على جهازك.', 'A «customer file cleaner» workflow: a Form Trigger uploads a CSV, a Code node reads the binary and cleans it (Arabic, phones, BOM), and outputs two files (valid and rejected) as binary — with the same logic tested with node:test on your machine.'),
      quiz: [
        Q(B('throw في Code node:', 'throw in a Code node:'), [['يوقف الـ node ويشغّل Error Workflow', 'stops the node and triggers the Error Workflow'], ['بيتجاهل', 'is ignored'], ['يمسح البيانات', 'deletes data']], 0, B('واضح.', 'Clear.')),
        Q(B('الملف المرفوع في:', 'An uploaded file is in:'), ['item.binary', 'item.json', '$env'], 0, B('binary.', 'binary.')),
        Q(B('شغل تقيل جدًا:', 'Very heavy work:'), [['سيرفر بتاعك وn8n ينادي', 'your own server called by n8n'], ['Code node أكبر', 'a bigger Code node'], ['expression', 'an expression']], 0, B('حدود الـ runner.', 'Runner limits.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('workflow احترافي بأكواد نضيفة ومختبرة.', 'A professional workflow with clean, tested code.'),
      review: [
        B('شكل الـ items، والوضعين، والـ return الصح.', 'The shape of items, the two modes and the right return.'),
        B('$("Node")، و$execution، وexpression مقابل Code.', '$("Node"), $execution, and expressions vs Code.'),
        B('split وaggregate وlookup map وpairedItem.', 'Split, aggregate, lookup maps and pairedItem.'),
        B('Luxon وstatic data وjmespath والـ builtins.', 'Luxon, static data, jmespath and builtins.'),
        B('الأخطاء، والـ binary، والاختبار برة n8n، والحدود.', 'Errors, binary data, testing outside n8n, and limits.')
      ],
      project: B('ابني workflow «تقرير المبيعات اليومي» في n8n: Schedule ← HTTP (طلبات جديدة بس بـ cursor في static data) ← Code (تنضيف وتطبيع عربي وتليفونات) ← Google Sheets (عملاء) ← Code (دمج بـ Map وتقسيم لسطور منتجات بـ pairedItem) ← Code (تجميع حسب المدينة والمنتج وSLA بـ Luxon) ← Code (CSV بـ BOM كـ binary) ← Slack/Email بالملخص والملف — مع error output لمراجعة، و$execution.id في كل رسالة، وكل دوال الـ Code مختبرة بـ node:test في ريبو.', 'Build a «daily sales report» n8n workflow: Schedule → HTTP (only new orders via a cursor in static data) → Code (cleaning, Arabic and phone normalisation) → Google Sheets (customers) → Code (merge with a Map and split into product lines with pairedItem) → Code (aggregate by city and product, SLA with Luxon) → Code (a BOM CSV as binary) → Slack/Email with the summary and file — with an error output to review, $execution.id in every message, and every Code function tested with node:test in a repo.'),
      test: [
        Q(B('item في n8n:', 'An n8n item:'), ['{ json, binary?, pairedItem? }', '{ data }', '[json]'], 0, B('json إجباري.', 'json is required.')),
        Q(B('وضع Each بيرجّع:', 'Each mode returns:'), [['{ json } واحد', 'one { json }'], ['مصفوفة لازم', 'an array, always'], ['نص', 'text']], 0, B('للـ item الحالي.', 'For the current item.')),
        Q(B('$input.all() موجود في:', '$input.all() is available in:'), [['وضع All', 'All mode'], ['وضع Each بس', 'Each mode only'], ['expressions بس', 'expressions only']], 0, B('كل الـ items.', 'All items.')),
        Q(B('$("Get Customer").item:', '$("Get Customer").item:'), [['الـ item المرتبط بالحالي', 'the item linked to the current one'], ['أول item', 'the first item'], ['آخر item', 'the last item']], 0, B('pairedItem.', 'pairedItem.')),
        Q(B('{{ $json.name.trim() }}:', '{{ $json.name.trim() }}:'), ['expression', 'Code node', 'regex'], 0, B('سطر في خانة.', 'One line in a field.')),
        Q(B('طلب بـ 3 منتجات ← 3 items:', 'An order with 3 products → 3 items:'), ['flatMap + pairedItem', 'reduce', 'filter'], 0, B('split.', 'Split.')),
        Q(B('ملخص واحد لكل الطلبات:', 'One summary for all orders:'), ['aggregate', 'split', 'sort'], 0, B('item واحد.', 'One item.')),
        Q(B('بعد 3 أيام بتوقيت الرياض:', 'Three days later in Riyadh time:'), ['$now.setZone("Asia/Riyadh").plus({ days: 3 })', 'new Date() + 3', '$today + 3'], 0, B('Luxon.', 'Luxon.')),
        Q(B('آخر id بين التشغيلات:', 'The last id between runs:'), ['$getWorkflowStaticData("global")', 'localStorage', B('متغير عادي', 'a plain variable')], 0, B('static data.', 'Static data.')),
        Q(B('items فاشلة من غير ما توقف الكل:', 'Failed items without stopping everything:'), [['error output أو فصلها في الكود', 'an error output or separating them in code'], ['throw', 'throw'], ['تجاهلها', 'ignore them']], 0, B('مراجعة.', 'Review.')),
        Q(B('Buffer لملف مرفوع:', 'A Buffer for an uploaded file:'), ['this.helpers.getBinaryDataBuffer', 'item.json.file', 'fs.readFile'], 0, B('helper.', 'A helper.')),
        Q(B('اختبار منطق Code node:', 'Testing Code-node logic:'), [['دالة نقية + node:test', 'a pure function + node:test'], ['يدوي بس', 'only by hand'], ['مستحيل', 'impossible']], 0, B('برة n8n.', 'Outside n8n.'))
      ] }
  ]
};
