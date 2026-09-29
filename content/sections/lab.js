// Sections of lab.html. The types (workflow, templates, playground) live in assets/js/lab.js.
// Challenge fields: id, lvl (b/i/a), t {ar,en}, task {ar,en} (small markdown), starter, solution, and a check:
//   js:   tests: [[call, expected], …]        — the call runs after the code, results compared as JSON
//   expr: input (the items), expect (value) or match (regex for the result as text)
//   py:   out (expected printed text, trimmed)
//   sql:  the result must equal the solution's (same rows; same order only when the solution has ORDER BY)
// tools/test_lab.js runs every solution against its check.

SECTIONS.add({
  page: 'lab', id: 'workflow', order: 1, type: 'workflow',
  title: { ar: 'اعرض أي Workflow وافحصه', en: 'View and check any workflow' },
  nav: { ar: 'عارض الـ Workflow', en: 'Workflow viewer' },
  desc: {
    ar: 'الصق JSON أي Workflow (من n8n: اختار النودات أو كل الـ Workflow ← Ctrl+C) أو افتح مثال. هترسمه رسمة تقدر تكبّرها وتحركها، وتشرح كل خطوة بتعمل إيه، وتفحصه: أسرار مكتوبة في النودات، Webhook من غير حماية، نودات مش متوصلة، ومن غير معالجة أخطاء. كل ده جوه المتصفح بتاعك: الـ JSON مش بيتبعت لأي مكان.',
    en: 'Paste any workflow JSON (in n8n: select the nodes or the whole workflow → Ctrl+C) or open a sample. It is drawn as a diagram you can zoom and move, each step is explained, and it is checked: secrets typed into nodes, unprotected webhooks, unconnected nodes, no error handling. All of it runs in your browser: the JSON is not sent anywhere.'
  },
  samples: [
    { id: 'api', t: { ar: 'API بسيطة بـ Webhook', en: 'A simple API with a webhook' }, json: {
      name: 'Hello API',
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'hello', httpMethod: 'POST', responseMode: 'responseNode', authentication: 'headerAuth' }, credentials: { httpHeaderAuth: { name: 'API key header' } } },
        { name: 'Build greeting', type: 'n8n-nodes-base.set', position: [240, 0], parameters: { assignments: { assignments: [{ name: 'greeting', value: '=Hello {{ $json.body.name }}', type: 'string' }] } } },
        { name: 'Respond', type: 'n8n-nodes-base.respondToWebhook', position: [480, 0], parameters: { respondWith: 'json' } }
      ],
      connections: { 'Webhook': { main: [[{ node: 'Build greeting', type: 'main', index: 0 }]] }, 'Build greeting': { main: [[{ node: 'Respond', type: 'main', index: 0 }]] } },
      settings: { errorWorkflow: 'errors' }
    } },
    { id: 'price', t: { ar: 'متابعة سعر كل ساعة وتنبيه', en: 'Hourly price check with an alert' }, json: {
      name: 'Price watch',
      nodes: [
        { name: 'Every hour', type: 'n8n-nodes-base.scheduleTrigger', position: [0, 0], parameters: { rule: { interval: [{ field: 'hours' }] } } },
        { name: 'Get price', type: 'n8n-nodes-base.httpRequest', position: [240, 0], parameters: { url: 'https://api.example.com/price?sku=A12', options: { timeout: 10000 } }, retryOnFail: true, maxTries: 3 },
        { name: 'Below target?', type: 'n8n-nodes-base.if', position: [480, 0], parameters: { conditions: { conditions: [{ leftValue: '={{ $json.price }}', rightValue: 500, operator: { type: 'number', operation: 'lt' } }] } } },
        { name: 'Alert on Telegram', type: 'n8n-nodes-base.telegram', position: [720, -100], parameters: { text: '=Price dropped to {{ $json.price }}' }, credentials: { telegramApi: { name: 'My bot' } } },
        { name: 'Log to sheet', type: 'n8n-nodes-base.googleSheets', position: [720, 100], parameters: { operation: 'append' }, credentials: { googleSheetsOAuth2Api: { name: 'Google' } } },
        { name: 'Note', type: 'n8n-nodes-base.stickyNote', position: [200, -260], parameters: { content: 'Checks the price every hour. Alerts when it is under 500, logs every check.' } }
      ],
      connections: {
        'Every hour': { main: [[{ node: 'Get price', type: 'main', index: 0 }]] },
        'Get price': { main: [[{ node: 'Below target?', type: 'main', index: 0 }]] },
        'Below target?': { main: [[{ node: 'Alert on Telegram', type: 'main', index: 0 }], [{ node: 'Log to sheet', type: 'main', index: 0 }]] }
      },
      settings: { errorWorkflow: 'errors' }
    } },
    { id: 'agent', t: { ar: 'مساعد ذكاء اصطناعي بأدوات وذاكرة', en: 'An AI assistant with tools and memory' }, json: {
      name: 'Support agent',
      nodes: [
        { name: 'Chat', type: '@n8n/n8n-nodes-langchain.chatTrigger', position: [0, 0], parameters: { public: false } },
        { name: 'AI Agent', type: '@n8n/n8n-nodes-langchain.agent', position: [260, 0], parameters: { options: { systemMessage: 'You answer questions about our orders. Use the tools. If you are not sure, say so.' } } },
        { name: 'Chat model', type: '@n8n/n8n-nodes-langchain.lmChatOpenAi', position: [140, 220], parameters: { model: 'gpt-4o-mini' }, credentials: { openAiApi: { name: 'OpenAI' } } },
        { name: 'Memory', type: '@n8n/n8n-nodes-langchain.memoryBufferWindow', position: [300, 220], parameters: { contextWindowLength: 10 } },
        { name: 'Order lookup', type: '@n8n/n8n-nodes-langchain.toolHttpRequest', position: [460, 220], parameters: { url: 'https://api.example.com/orders/{id}', toolDescription: 'Look up an order by its id' } }
      ],
      connections: {
        'Chat': { main: [[{ node: 'AI Agent', type: 'main', index: 0 }]] },
        'Chat model': { ai_languageModel: [[{ node: 'AI Agent', type: 'ai_languageModel', index: 0 }]] },
        'Memory': { ai_memory: [[{ node: 'AI Agent', type: 'ai_memory', index: 0 }]] },
        'Order lookup': { ai_tool: [[{ node: 'AI Agent', type: 'ai_tool', index: 0 }]] }
      }
    } },
    { id: 'bad', t: { ar: 'اكتشف المشاكل (Workflow فيه أخطاء)', en: 'Spot the problems (a flawed workflow)' }, json: {
      name: 'Lead form',
      nodes: [
        { name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [0, 0], parameters: { path: 'lead', httpMethod: 'POST' } },
        { name: 'HTTP Request', type: 'n8n-nodes-base.httpRequest', position: [240, 0], parameters: { url: 'https://api.example-crm.com/leads', sendHeaders: true, headerParameters: { parameters: [{ name: 'Authorization', value: 'Bearer demo-token-typed-in-the-node-1234' }] } } },
        { name: 'Code', type: 'n8n-nodes-base.code', position: [480, 0], parameters: { jsCode: 'return $input.all();' } },
        { name: 'Send Email1', type: 'n8n-nodes-base.emailSend', position: [720, 0], parameters: {}, disabled: true },
        { name: 'Edit Fields', type: 'n8n-nodes-base.set', position: [240, 200], parameters: {} }
      ],
      connections: {
        'Webhook': { main: [[{ node: 'HTTP Request', type: 'main', index: 0 }]] },
        'HTTP Request': { main: [[{ node: 'Code', type: 'main', index: 0 }]] },
        'Code': { main: [[{ node: 'Send Email1', type: 'main', index: 0 }]] }
      },
      pinData: { 'Webhook': [{ json: { name: 'Mona', phone: '01000000000' } }] }
    } }
  ]
});

SECTIONS.add({
  page: 'lab', id: 'templates', order: 2, type: 'templates',
  title: { ar: 'مكتبة قوالب n8n الرسمية', en: 'The official n8n template library' },
  nav: { ar: 'القوالب', en: 'Templates' },
  desc: {
    ar: 'دوّر في آلاف القوالب اللي على n8n.io، وافتح أي قالب هنا كرسمة وشوف خطواته وفحصه قبل ما تستورده. ابحث بالإنجليزي: telegram، invoice، AI agent… (البحث بيوصل لـ api.n8n.io مباشرة.)',
    en: 'Search the thousands of templates on n8n.io, and open any of them here as a diagram with its steps and checks before you import it. Search in English: telegram, invoice, AI agent… (The search goes straight to api.n8n.io.)'
  }
});

SECTIONS.add({
  page: 'lab', id: 'expr', order: 3, type: 'playground', lang: 'expr', kind: 'ch',
  title: { ar: 'تدريب Expressions بتاعة n8n', en: 'n8n expressions practice' },
  nav: { ar: 'Expressions', en: 'Expressions' },
  desc: {
    ar: 'اكتب Expression زي اللي بتكتبها في أي حقل في n8n، على بيانات item جاهزة (تقدر تعدّلها). فيه `$json` و`$input` و`$now` (Luxon) وأشهر الدوال الإضافية زي `.extractDomain()` و`.sum()` و`$ifEmpty()`. ده محاكي تقريبي للتدريب، والنتيجة النهائية دايمًا جرّبها في n8n نفسه.',
    en: 'Write an expression the way you would in any n8n field, on ready item data (you can edit it). You get `$json`, `$input`, `$now` (Luxon) and the common extra functions such as `.extractDomain()`, `.sum()` and `$ifEmpty()`. This is an approximate simulator for practice; always confirm the final result in n8n itself.'
  },
  items: [
    { id: 'e1', lvl: 'b', t: { ar: 'قيمة حقل', en: 'A field value' }, task: { ar: 'رجّع اسم العميل من الحقل `name`.', en: 'Return the customer name from the `name` field.' },
      input: [{ name: 'Sara', city: 'Cairo' }], starter: '{{ $json. }}', solution: '{{ $json.name }}', expect: 'Sara' },
    { id: 'e2', lvl: 'b', t: { ar: 'نص كبير', en: 'Upper case' }, task: { ar: 'رجّع المدينة بحروف كبيرة: `CAIRO`.', en: 'Return the city in capitals: `CAIRO`.' },
      input: [{ name: 'Sara', city: 'Cairo' }], starter: '{{ $json.city }}', solution: '{{ $json.city.toUpperCase() }}', expect: 'CAIRO' },
    { id: 'e3', lvl: 'b', t: { ar: 'دمج حقلين', en: 'Join two fields' }, task: { ar: 'ابني الاسم الكامل: `Omar Ali` (من `first` و`last` بمسافة بينهم).', en: 'Build the full name `Omar Ali` from `first` and `last` with a space between.' },
      input: [{ first: 'Omar', last: 'Ali' }], starter: '', solution: '{{ $json.first }} {{ $json.last }}', expect: 'Omar Ali' },
    { id: 'e4', lvl: 'b', t: { ar: 'بيانات Webhook', en: 'Webhook data' }, task: { ar: 'بيانات الـ Webhook بتيجي جوه `body`. رجّع الإيميل.', en: 'Webhook data arrives inside `body`. Return the email.' },
      input: [{ headers: { host: 'example.com' }, body: { email: 'mona@shop.com', plan: 'pro' } }], starter: '{{ $json }}', solution: '{{ $json.body.email }}', expect: 'mona@shop.com' },
    { id: 'e5', lvl: 'b', t: { ar: 'عدد العناصر في Array', en: 'Items in an array' }, task: { ar: 'رجّع عدد المنتجات في الطلب (رقم).', en: 'Return how many products the order has (a number).' },
      input: [{ order: 17, products: ['pen', 'book', 'bag'] }], starter: '', solution: '{{ $json.products.length }}', expect: 3 },
    { id: 'e6', lvl: 'i', t: { ar: 'شرط في سطر', en: 'An inline condition' }, task: { ar: 'لو `total` أكبر من 1000 رجّع `VIP`، غير كده `normal`.', en: 'If `total` is over 1000 return `VIP`, otherwise `normal`.' },
      input: [{ total: 1450 }], starter: "{{ $json.total > 1000 ? '' : '' }}", solution: "{{ $json.total > 1000 ? 'VIP' : 'normal' }}", expect: 'VIP' },
    { id: 'e7', lvl: 'i', t: { ar: 'قيمة بديلة لو فاضي', en: 'A fallback when empty' }, task: { ar: 'التليفون ممكن يبقى فاضي. رجّعه، ولو فاضي رجّع `no phone` (استخدم `$ifEmpty`).', en: 'The phone may be empty. Return it, or `no phone` when it is empty (use `$ifEmpty`).' },
      input: [{ name: 'Hany', phone: '' }], starter: '{{ $ifEmpty() }}', solution: "{{ $ifEmpty($json.phone, 'no phone') }}", expect: 'no phone' },
    { id: 'e8', lvl: 'i', t: { ar: 'تاريخ النهارده', en: "Today's date" }, task: { ar: 'رجّع تاريخ النهارده بالشكل `2026-09-30` باستخدام `$now.toFormat()`.', en: "Return today's date shaped like `2026-09-30` with `$now.toFormat()`." },
      input: [{}], starter: '{{ $now }}', solution: "{{ $now.toFormat('yyyy-MM-dd') }}", match: '^\\d{4}-\\d{2}-\\d{2}$' },
    { id: 'e9', lvl: 'i', t: { ar: 'أول item', en: 'The first item' }, task: { ar: 'فيه 3 items. رجّع `id` بتاع أول واحد باستخدام `$input.first()`.', en: 'There are 3 items. Return the `id` of the first one with `$input.first()`.' },
      input: [{ id: 'A1' }, { id: 'B2' }, { id: 'C3' }], starter: '', solution: '{{ $input.first().json.id }}', expect: 'A1' },
    { id: 'e10', lvl: 'i', t: { ar: 'مجموع أسعار', en: 'A sum of prices' }, task: { ar: 'رجّع مجموع الأسعار في `prices` (رقم).', en: 'Return the sum of `prices` (a number).' },
      input: [{ prices: [120, 80, 45.5] }], starter: '', solution: '{{ $json.prices.sum() }}', expect: 245.5 },
    { id: 'e11', lvl: 'i', t: { ar: 'الدومين من الإيميل', en: 'The domain of an email' }, task: { ar: 'رجّع الدومين بتاع الإيميل: `shop.com`.', en: 'Return the domain of the email: `shop.com`.' },
      input: [{ email: 'mona@shop.com' }], starter: '', solution: '{{ $json.email.extractDomain() }}', expect: 'shop.com' },
    { id: 'e12', lvl: 'a', t: { ar: 'Array لنص', en: 'An array to text' }, task: { ar: 'رجّع التاجز مفصولة بفاصلة ومسافة: `new, vip, cairo`.', en: 'Return the tags joined with a comma and a space: `new, vip, cairo`.' },
      input: [{ tags: ['new', 'vip', 'cairo'] }], starter: '', solution: "{{ $json.tags.join(', ') }}", expect: 'new, vip, cairo' },
    { id: 'e13', lvl: 'a', t: { ar: 'فلترة جوه Expression', en: 'Filtering inside an expression' }, task: { ar: 'رجّع عدد الطلبات اللي حالتها `paid` بس (رقم).', en: 'Return how many orders have the status `paid` (a number).' },
      input: [{ orders: [{ id: 1, status: 'paid' }, { id: 2, status: 'new' }, { id: 3, status: 'paid' }] }], starter: '', solution: "{{ $json.orders.filter(o => o.status === 'paid').length }}", expect: 2 },
    { id: 'e14', lvl: 'a', t: { ar: 'تقريب رقم', en: 'Rounding a number' }, task: { ar: 'رجّع السعر بعد خصم 15% متقرّب لرقمين عشريين (`84.99` → `72.24`).', en: 'Return the price after a 15% discount rounded to two decimals (`84.99` → `72.24`).' },
      input: [{ price: 84.99 }], starter: '', solution: '{{ ($json.price * 0.85).round(2) }}', expect: 72.24 }
  ]
});

SECTIONS.add({
  page: 'lab', id: 'js', order: 4, type: 'playground', lang: 'js', kind: 'ch',
  title: { ar: 'JavaScript لنود Code', en: 'JavaScript for the Code node' },
  nav: { ar: 'JavaScript', en: 'JavaScript' },
  desc: {
    ar: 'تحديات بتتكرر في شغل n8n الحقيقي: تنضيف بيانات، تجميع، وتحويل لشكل الـ items. اكتب الدالة ودوس «شغّل» (Ctrl+Enter) عشان تشوف الـ `console.log`، و«اتأكد من الحل» عشان تتجرّب على حالات اختبار. الكود بيشتغل في Worker معزول في المتصفح، وبيقف لوحده لو علّق.',
    en: 'Challenges that come up in real n8n work: cleaning data, grouping, and reshaping into items. Write the function and press «Run» (Ctrl+Enter) to see your `console.log` output, and «Check» to test it against cases. The code runs in an isolated worker in your browser and stops by itself if it hangs.'
  },
  items: [
    { id: 'j1', lvl: 'b', t: { ar: 'مجموع الأسعار', en: 'Total of prices' }, task: { ar: 'اكتب `total(prices)` ترجّع مجموع الأرقام.', en: 'Write `total(prices)` returning the sum of the numbers.' },
      starter: 'function total(prices) {\n  \n}\n\nconsole.log(total([10, 20, 5]));', solution: 'function total(prices) {\n  return prices.reduce((sum, p) => sum + p, 0);\n}',
      tests: [['total([10, 20, 5])', 35], ['total([])', 0], ['total([2.5, 2.5])', 5]] },
    { id: 'j2', lvl: 'b', t: { ar: 'تنضيف إيميل', en: 'Clean an email' }, task: { ar: 'اكتب `cleanEmail(e)` تشيل المسافات من الأول والآخر وتخلي الحروف صغيرة.', en: 'Write `cleanEmail(e)` that trims spaces and lower-cases it.' },
      starter: 'function cleanEmail(e) {\n  \n}', solution: 'function cleanEmail(e) {\n  return e.trim().toLowerCase();\n}',
      tests: [["cleanEmail('  Mona@Shop.COM ')", 'mona@shop.com'], ["cleanEmail('a@b.c')", 'a@b.c']] },
    { id: 'j3', lvl: 'b', t: { ar: 'الطلبات المدفوعة', en: 'Paid orders' }, task: { ar: 'اكتب `paid(orders)` ترجّع الطلبات اللي `status` بتاعها `paid` بس.', en: 'Write `paid(orders)` returning only the orders whose `status` is `paid`.' },
      starter: 'function paid(orders) {\n  \n}', solution: "function paid(orders) {\n  return orders.filter(o => o.status === 'paid');\n}",
      tests: [["paid([{id:1,status:'paid'},{id:2,status:'new'}])", [{ id: 1, status: 'paid' }]], ['paid([])', []]] },
    { id: 'j4', lvl: 'b', t: { ar: 'شكل الـ items في n8n', en: 'The n8n item shape' }, task: { ar: 'نود Code لازم ترجّع `[{ json: {...} }]`. اكتب `toItems(rows)` تحوّل كل object لـ `{ json: row }`.', en: 'A Code node must return `[{ json: {...} }]`. Write `toItems(rows)` wrapping each object as `{ json: row }`.' },
      starter: 'function toItems(rows) {\n  \n}', solution: 'function toItems(rows) {\n  return rows.map(row => ({ json: row }));\n}',
      tests: [["toItems([{a:1},{a:2}])", [{ json: { a: 1 } }, { json: { a: 2 } }]]] },
    { id: 'j5', lvl: 'i', t: { ar: 'عدّ حسب المدينة', en: 'Count by city' }, task: { ar: 'اكتب `byCity(customers)` ترجّع object فيه عدد العملاء في كل مدينة.', en: 'Write `byCity(customers)` returning an object with the number of customers per city.' },
      starter: 'function byCity(customers) {\n  \n}', solution: 'function byCity(customers) {\n  const out = {};\n  for (const c of customers) out[c.city] = (out[c.city] || 0) + 1;\n  return out;\n}',
      tests: [["byCity([{city:'Cairo'},{city:'Giza'},{city:'Cairo'}])", { Cairo: 2, Giza: 1 }], ['byCity([])', {}]] },
    { id: 'j6', lvl: 'i', t: { ar: 'رقم موبايل مصري دولي', en: 'An Egyptian mobile in international form' }, task: { ar: 'اكتب `intlPhone(p)`: تشيل المسافات والشَرط، ولو الرقم بيبدأ بـ `0` خليه يبدأ بـ `+20`. مثال: `010 1234-5678` → `+201012345678`.', en: 'Write `intlPhone(p)`: remove spaces and dashes, and if it starts with `0` make it start with `+20`. Example: `010 1234-5678` → `+201012345678`.' },
      starter: 'function intlPhone(p) {\n  \n}', solution: "function intlPhone(p) {\n  const d = p.replace(/[\\s-]/g, '');\n  return d.startsWith('0') ? '+20' + d.slice(1) : d;\n}",
      tests: [["intlPhone('010 1234-5678')", '+201012345678'], ["intlPhone('+201112223334')", '+201112223334']] },
    { id: 'j7', lvl: 'i', t: { ar: 'شيل المكرر بالإيميل', en: 'Remove duplicates by email' }, task: { ar: 'اكتب `dedupe(rows)` تسيب أول صف لكل إيميل (من غير اعتبار لحالة الحروف).', en: 'Write `dedupe(rows)` keeping the first row for each email (ignoring letter case).' },
      starter: 'function dedupe(rows) {\n  \n}', solution: 'function dedupe(rows) {\n  const seen = new Set();\n  return rows.filter(r => {\n    const k = r.email.toLowerCase();\n    if (seen.has(k)) return false;\n    seen.add(k);\n    return true;\n  });\n}',
      tests: [["dedupe([{email:'A@x.com',n:1},{email:'a@x.com',n:2},{email:'b@x.com',n:3}])", [{ email: 'A@x.com', n: 1 }, { email: 'b@x.com', n: 3 }]]] },
    { id: 'j8', lvl: 'i', t: { ar: 'تقسيم لدفعات', en: 'Split into batches' }, task: { ar: 'اكتب `chunk(arr, size)` تقسّم الـ array لمجموعات حجمها `size` (زي Loop Over Items).', en: 'Write `chunk(arr, size)` splitting the array into groups of `size` (like Loop Over Items).' },
      starter: 'function chunk(arr, size) {\n  \n}', solution: 'function chunk(arr, size) {\n  const out = [];\n  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));\n  return out;\n}',
      tests: [['chunk([1,2,3,4,5], 2)', [[1, 2], [3, 4], [5]]], ['chunk([], 3)', []]] },
    { id: 'j9', lvl: 'i', t: { ar: 'Query string لـ object', en: 'A query string to an object' }, task: { ar: 'اكتب `parseQuery(q)`: `a=1&b=hi` → `{ a: "1", b: "hi" }`.', en: 'Write `parseQuery(q)`: `a=1&b=hi` → `{ a: "1", b: "hi" }`.' },
      starter: 'function parseQuery(q) {\n  \n}', solution: "function parseQuery(q) {\n  const out = {};\n  for (const part of q.split('&')) {\n    if (!part) continue;\n    const [k, v = ''] = part.split('=');\n    out[decodeURIComponent(k)] = decodeURIComponent(v);\n  }\n  return out;\n}",
      tests: [["parseQuery('a=1&b=hi')", { a: '1', b: 'hi' }], ["parseQuery('name=Sara%20Ali')", { name: 'Sara Ali' }], ["parseQuery('')", {}]] },
    { id: 'j10', lvl: 'a', t: { ar: 'قيمة جوه object متداخل', en: 'A value deep in an object' }, task: { ar: 'اكتب `pick(obj, path)`: `pick({a:{b:{c:5}}}, "a.b.c")` → `5`، ولو المسار مش موجود ترجّع `null`.', en: 'Write `pick(obj, path)`: `pick({a:{b:{c:5}}}, "a.b.c")` → `5`, and `null` when the path does not exist.' },
      starter: 'function pick(obj, path) {\n  \n}', solution: "function pick(obj, path) {\n  let cur = obj;\n  for (const k of path.split('.')) {\n    if (cur == null || !(k in Object(cur))) return null;\n    cur = cur[k];\n  }\n  return cur;\n}",
      tests: [["pick({a:{b:{c:5}}}, 'a.b.c')", 5], ["pick({a:{}}, 'a.b.c')", null], ["pick({a:[10,20]}, 'a.1')", 20]] },
    { id: 'j11', lvl: 'a', t: { ar: 'فرق الأيام بين تاريخين', en: 'Days between two dates' }, task: { ar: 'اكتب `daysBetween(a, b)` لتاريخين بالشكل `2026-09-01` ترجّع عدد الأيام بينهم.', en: 'Write `daysBetween(a, b)` for two dates like `2026-09-01` returning the number of days between them.' },
      starter: 'function daysBetween(a, b) {\n  \n}', solution: 'function daysBetween(a, b) {\n  return Math.round(Math.abs(new Date(b) - new Date(a)) / 86400000);\n}',
      tests: [["daysBetween('2026-09-01', '2026-09-30')", 29], ["daysBetween('2026-03-01', '2026-02-01')", 28]] },
    { id: 'j12', lvl: 'a', t: { ar: 'تقرير مبيعات', en: 'A sales report' }, task: { ar: 'اكتب `report(orders)` ترجّع `{ count, revenue, top }`: عدد الطلبات، ومجموع `amount`، واسم العميل صاحب أكبر مجموع.', en: 'Write `report(orders)` returning `{ count, revenue, top }`: the number of orders, the sum of `amount`, and the customer with the largest total.' },
      starter: 'function report(orders) {\n  \n}', solution: 'function report(orders) {\n  const per = {};\n  let revenue = 0;\n  for (const o of orders) {\n    revenue += o.amount;\n    per[o.customer] = (per[o.customer] || 0) + o.amount;\n  }\n  const top = Object.keys(per).sort((a, b) => per[b] - per[a])[0] || null;\n  return { count: orders.length, revenue, top };\n}',
      tests: [["report([{customer:'Sara',amount:100},{customer:'Omar',amount:250},{customer:'Sara',amount:200}])", { count: 3, revenue: 550, top: 'Sara' }], ['report([])', { count: 0, revenue: 0, top: null }]] }
  ]
});

SECTIONS.add({
  page: 'lab', id: 'py', order: 5, type: 'playground', lang: 'py', kind: 'ch',
  title: { ar: 'Python في المتصفح', en: 'Python in the browser' },
  nav: { ar: 'Python', en: 'Python' },
  desc: {
    ar: 'Python حقيقي (CPython عن طريق Pyodide) شغّال جوه المتصفح. أول تشغيل بيحمّل حوالي 10 ميجا مرة واحدة وبعدين بيبقى سريع. المطلوب في كل تحدي إن اللي بيتطبع يطابق الناتج المتوقع.',
    en: 'Real Python (CPython through Pyodide) running in your browser. The first run downloads about 10 MB once, then it is quick. Each challenge passes when what you print matches the expected output.'
  },
  items: [
    { id: 'p1', lvl: 'b', t: { ar: 'f-string', en: 'An f-string' }, task: { ar: 'اطبع `Hello, Sara!` باستخدام f-string والمتغير `name`.', en: 'Print `Hello, Sara!` using an f-string and the `name` variable.' },
      starter: "name = 'Sara'\n", solution: "name = 'Sara'\nprint(f'Hello, {name}!')", out: 'Hello, Sara!' },
    { id: 'p2', lvl: 'b', t: { ar: 'List comprehension', en: 'A list comprehension' }, task: { ar: 'اطبع مربعات الأرقام الزوجية من 1 لـ 10: `[4, 16, 36, 64, 100]`.', en: 'Print the squares of the even numbers from 1 to 10: `[4, 16, 36, 64, 100]`.' },
      starter: '', solution: 'print([n * n for n in range(1, 11) if n % 2 == 0])', out: '[4, 16, 36, 64, 100]' },
    { id: 'p3', lvl: 'b', t: { ar: 'قراءة JSON', en: 'Reading JSON' }, task: { ar: 'حوّل النص لـ dict واطبع المدينة.', en: 'Turn the text into a dict and print the city.' },
      starter: "import json\ntext = '{\"name\": \"Omar\", \"city\": \"Alexandria\"}'\n", solution: "import json\ntext = '{\"name\": \"Omar\", \"city\": \"Alexandria\"}'\nprint(json.loads(text)['city'])", out: 'Alexandria' },
    { id: 'p4', lvl: 'i', t: { ar: 'عدّ الكلمات', en: 'Counting words' }, task: { ar: 'اطبع عدد مرات كل كلمة كـ dict مترتب بالظهور: `{\'error\': 2, \'at\': 1, \'line\': 1}`.', en: "Print how many times each word appears, as a dict in order of appearance: `{'error': 2, 'at': 1, 'line': 1}`." },
      starter: "text = 'error at line error'\n", solution: "text = 'error at line error'\ncounts = {}\nfor w in text.split():\n    counts[w] = counts.get(w, 0) + 1\nprint(counts)", out: "{'error': 2, 'at': 1, 'line': 1}" },
    { id: 'p5', lvl: 'i', t: { ar: 'مجموع من قايمة dicts', en: 'A total from a list of dicts' }, task: { ar: 'اطبع مجموع `price × qty` لكل الطلبات: `560.0`.', en: 'Print the total of `price × qty` over the orders: `560.0`.' },
      starter: "orders = [{'price': 120.0, 'qty': 2}, {'price': 80.0, 'qty': 4}]\n", solution: "orders = [{'price': 120.0, 'qty': 2}, {'price': 80.0, 'qty': 4}]\nprint(sum(o['price'] * o['qty'] for o in orders))", out: '560.0' },
    { id: 'p6', lvl: 'i', t: { ar: 'ترتيب بمفتاح', en: 'Sorting by a key' }, task: { ar: 'اطبع أسماء العملاء مترتبين من الأكبر للأصغر في `spent`، كل اسم في سطر.', en: 'Print the customer names from the largest to the smallest `spent`, one per line.' },
      starter: "customers = [{'name': 'Sara', 'spent': 300}, {'name': 'Omar', 'spent': 900}, {'name': 'Hany', 'spent': 450}]\n",
      solution: "customers = [{'name': 'Sara', 'spent': 300}, {'name': 'Omar', 'spent': 900}, {'name': 'Hany', 'spent': 450}]\nfor c in sorted(customers, key=lambda c: c['spent'], reverse=True):\n    print(c['name'])", out: 'Omar\nHany\nSara' },
    { id: 'p7', lvl: 'i', t: { ar: 'try/except', en: 'try/except' }, task: { ar: 'اقسم `total` على `count`، ولو `count` صفر اطبع `no orders yet` بدل ما البرنامج يقع.', en: 'Divide `total` by `count`, and when `count` is zero print `no orders yet` instead of crashing.' },
      starter: 'total = 500\ncount = 0\n', solution: "total = 500\ncount = 0\ntry:\n    print(total / count)\nexcept ZeroDivisionError:\n    print('no orders yet')", out: 'no orders yet' },
    { id: 'p8', lvl: 'a', t: { ar: 'Regex للإيميلات', en: 'Regex for emails' }, task: { ar: 'طلّع كل الإيميلات من النص واطبعها كـ list.', en: 'Extract every email from the text and print them as a list.' },
      starter: "import re\ntext = 'Contact mona@shop.com or sales@example.org, not me@'\n", solution: "import re\ntext = 'Contact mona@shop.com or sales@example.org, not me@'\nprint(re.findall(r'[\\w.+-]+@[\\w-]+\\.[\\w.]+', text))", out: "['mona@shop.com', 'sales@example.org']" },
    { id: 'p9', lvl: 'a', t: { ar: 'دالة بقيمة افتراضية', en: 'A function with a default' }, task: { ar: 'اكتب `price_with_tax(price, rate=0.14)` واطبع `price_with_tax(100)` و`price_with_tax(100, 0.2)` في سطرين: `114.0` و`120.0`.', en: 'Write `price_with_tax(price, rate=0.14)` and print `price_with_tax(100)` and `price_with_tax(100, 0.2)` on two lines: `114.0` and `120.0`.' },
      starter: '', solution: 'def price_with_tax(price, rate=0.14):\n    return round(price * (1 + rate), 2)\n\nprint(price_with_tax(100))\nprint(price_with_tax(100, 0.2))', out: '114.0\n120.0' }
  ]
});

SECTIONS.add({
  page: 'lab', id: 'sql', order: 6, type: 'playground', lang: 'sql', kind: 'ch',
  title: { ar: 'SQL على قاعدة بيانات متجر', en: 'SQL on a shop database' },
  nav: { ar: 'SQL', en: 'SQL' },
  desc: {
    ar: 'قاعدة بيانات SQLite حقيقية جوه المتصفح لمتجر صغير: `customers` و`products` و`orders` و`order_items`. اكتب الاستعلام وشغّله وشوف الجدول. الحل صح لما نتيجتك تطابق نتيجة الحل. تقدر تعدّل البيانات براحتك، وزرار «رجّع البيانات» بيرجّعها زي الأول.',
    en: 'A real SQLite database in your browser for a small shop: `customers`, `products`, `orders` and `order_items`. Write the query, run it and see the table. You pass when your result matches the solution’s. Change the data as you like; «Reset data» puts it back.'
  },
  schema: [
    'CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, city TEXT, joined TEXT);',
    'CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL);',
    'CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), created TEXT, status TEXT);',
    'CREATE TABLE order_items (order_id INTEGER REFERENCES orders(id), product_id INTEGER REFERENCES products(id), qty INTEGER);',
    "INSERT INTO customers VALUES (1,'Sara','Cairo','2026-01-10'),(2,'Omar','Alexandria','2026-02-02'),(3,'Mona','Cairo','2026-03-15'),(4,'Hany','Giza','2026-04-01'),(5,'Laila','Cairo','2026-06-20'),(6,'Karim','Mansoura','2026-08-05');",
    "INSERT INTO products VALUES (1,'Notebook','stationery',45),(2,'Pen Pro','stationery',30),(3,'Backpack','bags',650),(4,'Laptop Sleeve','bags',320),(5,'USB-C Hub Pro','electronics',890),(6,'Mouse','electronics',410);",
    "INSERT INTO orders VALUES (1,1,'2026-08-02','paid'),(2,2,'2026-08-15','paid'),(3,1,'2026-09-03','paid'),(4,3,'2026-09-10','new'),(5,4,'2026-09-12','cancelled'),(6,5,'2026-09-20','paid');",
    'INSERT INTO order_items VALUES (1,1,3),(1,2,2),(2,5,1),(3,3,1),(3,6,1),(4,4,2),(5,1,1),(6,5,1),(6,2,4);'
  ],
  items: [
    { id: 's1', lvl: 'b', t: { ar: 'عملاء القاهرة', en: 'Customers in Cairo' }, task: { ar: 'اعرض اسم ومدينة كل العملاء اللي في `Cairo`.', en: 'Show the name and city of every customer in `Cairo`.' },
      starter: 'SELECT * FROM customers;', solution: "SELECT name, city FROM customers WHERE city = 'Cairo';" },
    { id: 's2', lvl: 'b', t: { ar: 'أغلى 3 منتجات', en: 'The 3 most expensive products' }, task: { ar: 'اعرض اسم وسعر أغلى 3 منتجات من الأغلى للأرخص.', en: 'Show the name and price of the 3 most expensive products, highest first.' },
      starter: 'SELECT name, price FROM products', solution: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 3;' },
    { id: 's3', lvl: 'b', t: { ar: 'بحث بجزء من الاسم', en: 'Search by part of a name' }, task: { ar: 'اعرض أسماء المنتجات اللي فيها كلمة `Pro`.', en: 'Show the names of the products that contain `Pro`.' },
      starter: '', solution: "SELECT name FROM products WHERE name LIKE '%Pro%';" },
    { id: 's4', lvl: 'i', t: { ar: 'عدد الطلبات لكل حالة', en: 'Orders per status' }, task: { ar: 'اعرض كل `status` وعدد الطلبات فيها (سمّي العمود `n`).', en: 'Show each `status` with its number of orders (name the column `n`).' },
      starter: '', solution: 'SELECT status, COUNT(*) AS n FROM orders GROUP BY status;' },
    { id: 's5', lvl: 'i', t: { ar: 'طلبات شهر سبتمبر', en: 'September orders' }, task: { ar: 'اعرض رقم وتاريخ كل الطلبات اللي اتعملت في سبتمبر 2026.', en: 'Show the id and date of every order made in September 2026.' },
      starter: '', solution: "SELECT id, created FROM orders WHERE created BETWEEN '2026-09-01' AND '2026-09-30';" },
    { id: 's6', lvl: 'i', t: { ar: 'اسم العميل مع طلبه', en: 'The customer name with each order' }, task: { ar: 'اعرض رقم الطلب واسم العميل وحالته، بـ JOIN بين `orders` و`customers`.', en: 'Show the order id, the customer name and the status, with a JOIN of `orders` and `customers`.' },
      starter: '', solution: 'SELECT o.id, c.name, o.status FROM orders o JOIN customers c ON c.id = o.customer_id;' },
    { id: 's7', lvl: 'i', t: { ar: 'عملاء من غير طلبات', en: 'Customers with no orders' }, task: { ar: 'اعرض أسماء العملاء اللي معملوش أي طلب (LEFT JOIN).', en: 'Show the names of the customers who never ordered (LEFT JOIN).' },
      starter: '', solution: 'SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;' },
    { id: 's8', lvl: 'a', t: { ar: 'إجمالي المبيعات المدفوعة', en: 'Total paid revenue' }, task: { ar: 'احسب إجمالي `qty × price` للطلبات اللي حالتها `paid` بس (عمود واحد اسمه `revenue`).', en: 'Compute the total `qty × price` for `paid` orders only (one column named `revenue`).' },
      starter: '', solution: "SELECT SUM(oi.qty * p.price) AS revenue FROM order_items oi JOIN orders o ON o.id = oi.order_id JOIN products p ON p.id = oi.product_id WHERE o.status = 'paid';" },
    { id: 's9', lvl: 'a', t: { ar: 'المبيعات لكل مدينة', en: 'Revenue per city' }, task: { ar: 'اعرض كل مدينة وإجمالي مبيعاتها المدفوعة من الأكبر للأصغر (`city`, `revenue`).', en: 'Show each city and its paid revenue, largest first (`city`, `revenue`).' },
      starter: '', solution: "SELECT c.city, SUM(oi.qty * p.price) AS revenue FROM order_items oi JOIN orders o ON o.id = oi.order_id JOIN products p ON p.id = oi.product_id JOIN customers c ON c.id = o.customer_id WHERE o.status = 'paid' GROUP BY c.city ORDER BY revenue DESC;" },
    { id: 's10', lvl: 'a', t: { ar: 'متوسط قيمة الطلب', en: 'The average order value' }, task: { ar: 'احسب متوسط قيمة الطلب المدفوع متقرّب لرقمين (`avg_order`). محتاج subquery أو CTE.', en: 'Compute the average paid order value rounded to two decimals (`avg_order`). You need a subquery or a CTE.' },
      starter: '', solution: "WITH totals AS (SELECT oi.order_id, SUM(oi.qty * p.price) AS total FROM order_items oi JOIN products p ON p.id = oi.product_id JOIN orders o ON o.id = oi.order_id WHERE o.status = 'paid' GROUP BY oi.order_id) SELECT ROUND(AVG(total), 2) AS avg_order FROM totals;" }
  ]
});
