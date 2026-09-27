// Week 1 (built from the old intensive week by tools/migrate_week1.js, then edited by hand).
JOURNEY.week({
 "track": "n8n",
 "n": 1,
 "month": 1,
 "level": {
  "ar": "مبتدئ",
  "en": "Beginner"
 },
 "title": {
  "ar": "عقل n8n: البيانات والـ APIs والربط",
  "en": "How n8n thinks: data, APIs and connections"
 },
 "goal": {
  "ar": "أسبوع البداية: تفهم الـ items والـ Expressions، وتنادي APIs، وتربط Sheets وTelegram وGmail، وتحوّل البيانات، وتخلّي الـ Workflow يستحمل الأخطاء.",
  "en": "The starting week: understand items and expressions, call APIs, connect Sheets, Telegram and Gmail, transform data, and make a workflow survive errors."
 },
 "days": [
  {
   "d": 1,
   "title": {
    "ar": "عقل n8n: الـ Items وJSON والـ Expressions",
    "en": "The n8n mindset: items, JSON and expressions"
   },
   "goal": {
    "ar": "تفهم إزاي البيانات بتتحرك جوه n8n، وتكتب Expressions من غير تخمين، وتبني أول API صغيرة بـ Webhook.",
    "en": "Understand how data moves inside n8n, write expressions without guessing, and build your first small API with a webhook."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "كل حاجة عبارة عن items",
      "en": "Everything is items"
     },
     "p": {
      "ar": "البيانات بتتنقل بين النودات كـ array، وكل عنصر فيها item جواه مفتاح `json` (وممكن `binary` للملفات). مفيش «object واحد»؛ دايمًا قايمة.",
      "en": "Data moves between nodes as an array, and each element is an item holding a `json` key (and possibly `binary` for files). There's never “one object” — it's always a list."
     },
     "ex": "[\n  { \"json\": { \"name\": \"Ali\",  \"age\": 30 } },\n  { \"json\": { \"name\": \"Sara\", \"age\": 17 } }\n]"
    },
    {
     "h": {
      "ar": "النود بتشتغل على كل item لوحدها",
      "en": "A node runs on each item separately"
     },
     "p": {
      "ar": "لو دخل Edit Fields تلات items، هيخرج تلاتة، والـ Expression بيتحسب مرة لكل item. عشان كده مش محتاج Loop في 90% من الحالات.",
      "en": "If three items enter Edit Fields, three come out, and the expression is evaluated once per item. That's why you don't need a loop in 90% of cases."
     },
     "ex": "3 items ← Edit Fields ← 3 items\n{{ $json.name }}  →  \"Ali\" ثم \"Sara\" ثم \"Omar\""
    },
    {
     "h": {
      "ar": "الـ Expression هو JavaScript بين {{ }}",
      "en": "An expression is JavaScript between {{ }}"
     },
     "p": {
      "ar": "أي حقل تقدر تحوله من Fixed لـ Expression. جواه JavaScript عادي، و`$json` هو الـ item الحالي من النود اللي قبلها مباشرة.",
      "en": "You can switch any field from Fixed to Expression. Inside it is plain JavaScript, and `$json` is the current item from the node directly before."
     },
     "ex": "{{ $json.first + \" \" + $json.last }}\n{{ $json.age >= 18 ? \"adult\" : \"minor\" }}\n{{ $json.tags?.length ?? 0 }}"
    },
    {
     "h": {
      "ar": "القراءة من نود معيّنة",
      "en": "Reading from a specific node"
     },
     "p": {
      "ar": "لو محتاج بيانات من نود أبعد، استخدم اسمها. `.item` بيجيب الـ item المرتبط بالحالي (paired item)، و`.first()` بيجيب أول واحد.",
      "en": "If you need data from a node further back, use its name. `.item` gets the item linked to the current one (paired item), and `.first()` gets the first one."
     },
     "ex": "{{ $(\"Webhook\").item.json.body.email }}\n{{ $(\"Get Settings\").first().json.currency }}"
    },
    {
     "h": {
      "ar": "Test URL مقابل Production URL",
      "en": "Test URL vs Production URL"
     },
     "p": {
      "ar": "الـ Webhook ليه رابطين: رابط التجربة (فيه `/webhook-test/`) بيستقبل طلب واحد بعد ما تضغط Execute، ورابط الإنتاج (فيه `/webhook/`) شغال طول ما الـ Workflow متفعّل.",
      "en": "A webhook has two URLs: the test URL (containing `/webhook-test/`) accepts one request after you click Execute, and the production URL (containing `/webhook/`) works as long as the workflow is active."
     },
     "ex": "http://localhost:5678/webhook-test/hello\nhttp://localhost:5678/webhook/hello"
    },
    {
     "h": {
      "ar": "Pin Data: ثبّت وكمّل",
      "en": "Pin Data: pin it and keep going"
     },
     "p": {
      "ar": "بعد ما نود تطلّع بيانات، ثبّتها (Pin). النودات اللي بعدها هتشتغل على البيانات المثبتة من غير ما تنادي الـ API أو تستنى Webhook تاني.",
      "en": "Once a node outputs data, pin it. The nodes after it will run on the pinned data without calling the API or waiting for another webhook."
     },
     "ex": "Output ← أيقونة الدبوس 📌 ← Pinned"
    }
   ],
   "practice": [
    {
     "ar": "شغّل n8n (`npx n8n` أو n8n Cloud) واعمل Workflow اسمه `D1 - Items Lab`",
     "en": "Run n8n (`npx n8n` or n8n Cloud) and create a workflow called `D1 - Items Lab`"
    },
    {
     "ar": "Manual Trigger ← Code بيطلّع 3 items (name, age, email بحروف كبيرة ومسافات)",
     "en": "Manual Trigger → Code that outputs 3 items (name, age, email with capitals and spaces)"
    },
    {
     "ar": "Edit Fields: ضيف `fullName` و`emailClean` = `{{ $json.email.trim().toLowerCase() }}` و`isAdult` بـ ternary",
     "en": "Edit Fields: add `fullName`, `emailClean` = `{{ $json.email.trim().toLowerCase() }}` and `isAdult` with a ternary"
    },
    {
     "ar": "بدّل عرض الـ Output بين Table وJSON وSchema، واسحب حقل من Schema لحقل Expression (drag & drop)",
     "en": "Switch the output view between Table, JSON and Schema, and drag a field from Schema into an expression field (drag & drop)"
    },
    {
     "ar": "Workflow تاني: Webhook (GET، path = `hello`، Respond = Using Respond to Webhook Node)",
     "en": "A second workflow: Webhook (GET, path = `hello`, Respond = Using Respond to Webhook Node)"
    },
    {
     "ar": "Respond to Webhook ← Respond With: JSON ← `{ \"message\": \"Hello {{ $json.query.name }}\" }` وجرّبه من المتصفح بـ `?name=Ali`",
     "en": "Respond to Webhook → Respond With: JSON → `{ \"message\": \"Hello {{ $json.query.name }}\" }`, and test it from the browser with `?name=Ali`"
    },
    {
     "ar": "ثبّت (Pin) Output الـ Webhook وعدّل الرد 3 مرات من غير ما تبعت طلب جديد",
     "en": "Pin the webhook's output and change the reply 3 times without sending a new request"
    },
    {
     "ar": "صدّر الـ Workflow كملف JSON (Download) وافتحه واقرا `nodes` و`connections`",
     "en": "Export the workflow as a JSON file (Download), open it and read `nodes` and `connections`"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "Code node: إنشاء items تجريبية",
      "en": "Code node: creating test items"
     },
     "p": "return [\n  { json: { name: \"Ali\",  age: 30, email: \"  ALI@X.COM \" } },\n  { json: { name: \"Sara\", age: 17, email: \"sara@x.com\" } },\n  { json: { name: \"Omar\", age: 25, email: \"Omar@X.com  \" } }\n];"
    },
    {
     "u": {
      "ar": "Expressions أساسية في Edit Fields",
      "en": "Basic expressions in Edit Fields"
     },
     "p": "{{ $json.name.toUpperCase() }}\n{{ $json.email.trim().toLowerCase() }}\n{{ $json.age >= 18 ? \"adult\" : \"minor\" }}\n{{ $now.toFormat(\"yyyy-MM-dd HH:mm\") }}"
    },
    {
     "u": {
      "ar": "بيانات Webhook: فين بتلاقيها",
      "en": "Webhook data: where to find it"
     },
     "p": "GET  ?name=Ali      →  {{ $json.query.name }}\nPOST JSON body      →  {{ $json.body.name }}\nHeaders             →  {{ $json.headers[\"user-agent\"] }}"
    },
    {
     "u": {
      "ar": "رد JSON من Respond to Webhook",
      "en": "A JSON reply from Respond to Webhook"
     },
     "p": "{\n  \"ok\": true,\n  \"message\": \"Hello {{ $json.query.name }}\",\n  \"at\": \"{{ $now.toISO() }}\"\n}"
    }
   ],
   "words": [
    {
     "t": "workflow",
     "m": {
      "ar": "سير عمل — سلسلة نودات بتنفّذ مهمة كاملة",
      "en": "A chain of nodes that performs a complete task"
     },
     "ex": "Webhook → Clean Data → Google Sheets → Telegram"
    },
    {
     "t": "node",
     "m": {
      "ar": "نود — خطوة واحدة جوه الـ Workflow",
      "en": "A single step inside a workflow"
     },
     "ex": "HTTP Request, IF, Edit Fields…"
    },
    {
     "t": "trigger",
     "m": {
      "ar": "محفّز — النود اللي بيبدأ تشغيل الـ Workflow",
      "en": "The node that starts a workflow run"
     },
     "ex": "Schedule Trigger: every day at 09:00"
    },
    {
     "t": "execution",
     "m": {
      "ar": "تشغيلة — مرة تنفيذ واحدة، وليها سجل",
      "en": "One run of a workflow, with its own log"
     },
     "ex": "Execution #1532 · Succeeded · 1.2s"
    },
    {
     "t": "test vs production",
     "m": {
      "ar": "وضع التجربة مقابل التشغيل الفعلي",
      "en": "Test mode versus the live run"
     },
     "ex": "/webhook-test/lead  vs  /webhook/lead"
    },
    {
     "t": "export / import",
     "m": {
      "ar": "تصدير / استيراد Workflow كملف JSON",
      "en": "Export / import a workflow as a JSON file"
     },
     "ex": "Download → workflow.json → Import from File"
    },
    {
     "t": "Manual Trigger",
     "m": {
      "ar": "بتضغط Execute بإيدك — للتجربة",
      "en": "You click Execute yourself — for testing"
     },
     "ex": "Execute workflow ▶ (للتجربة)"
    },
    {
     "t": "Webhook",
     "m": {
      "ar": "رابط بيستقبل طلبات ويشغّل الـ Workflow",
      "en": "A URL that receives requests and starts the workflow"
     },
     "ex": "POST https://n8n.me/webhook/lead"
    },
    {
     "t": "item",
     "m": {
      "ar": "عنصر — سجل واحد من البيانات",
      "en": "A single record of data"
     },
     "ex": "{ \"json\": { \"name\": \"Ali\" } }"
    },
    {
     "t": "field",
     "m": {
      "ar": "حقل جوه الـ item (زي name)",
      "en": "A field inside the item (like name)"
     },
     "ex": "name, email, phone"
    },
    {
     "t": "expression",
     "m": {
      "ar": "تعبير بين {{ }} بيحسب قيمة ديناميكية",
      "en": "An expression between {{ }} that computes a dynamic value"
     },
     "ex": "{{ $json.price * 1.14 }}"
    },
    {
     "t": "nested",
     "m": {
      "ar": "متداخل — حاجة جوه حاجة",
      "en": "Nested — one thing inside another"
     },
     "ex": "$json.address.geo.lat"
    },
    {
     "t": "pin data",
     "m": {
      "ar": "تثبيت بيانات تجريبية في نود",
      "en": "Pinning test data on a node"
     },
     "ex": "📌 Output ثابت للتجربة"
    },
    {
     "t": "Edit Fields (Set)",
     "m": {
      "ar": "إضافة أو تعديل حقول",
      "en": "Add or edit fields"
     },
     "ex": "fullName = {{ $json.first }} {{ $json.last }}"
    },
    {
     "t": "Respond to Webhook",
     "m": {
      "ar": "بيرد على اللي كلّم الـ Webhook",
      "en": "Replies to whoever called the webhook"
     },
     "ex": "Respond With: JSON · Code: 200"
    },
    {
     "t": "paired item",
     "m": {
      "ar": "الربط بين الـ item الخارج والـ item اللي دخل وطلّعه",
      "en": "The link between an output item and the input item that produced it"
     },
     "ex": "{{ $(\"Webhook\").item.json.email }}"
    },
    {
     "t": "$json",
     "m": {
      "ar": "بيانات الـ item الحالي من النود اللي قبلها",
      "en": "The current item's data from the previous node"
     },
     "ex": "{{ $json.email }}"
    },
    {
     "t": "$input",
     "m": {
      "ar": "كل الـ items الداخلة للنود الحالية",
      "en": "All the items coming into the current node"
     },
     "ex": "$input.all() · $input.first()"
    },
    {
     "t": "$now / $today",
     "m": {
      "ar": "الوقت الحالي / بداية النهارده كـ DateTime",
      "en": "The current time / the start of today as a DateTime"
     },
     "ex": "{{ $today.toISODate() }}"
    },
    {
     "t": "parameter (node)",
     "m": {
      "ar": "إعداد جوه النود زي URL أو Operation",
      "en": "A setting inside the node, such as URL or Operation"
     },
     "ex": "Operation: Append Row"
    },
    {
     "t": "Fixed vs Expression",
     "m": {
      "ar": "قيمة ثابتة مقابل قيمة محسوبة لكل item",
      "en": "A fixed value versus a value computed per item"
     },
     "ex": "Fixed: Cairo · Expression: {{ $json.city }}"
    },
    {
     "t": "Schema view",
     "m": {
      "ar": "عرض أسماء الحقول وأنواعها، ومنه بتسحب لأي Expression",
      "en": "Shows field names and types, and you can drag from it into any expression"
     },
     "ex": "drag \"email\" → {{ $json.email }}"
    }
   ],
   "read": [
    {
     "t": "n8n Docs: Data structure",
     "url": "https://docs.n8n.io/data/data-structure/",
     "what": {
      "ar": "الصفحة كلها (10 دقايق). قارن الأمثلة باللي بتشوفه في Output بتاعك.",
      "en": "The whole page (10 minutes). Compare the examples with what you see in your own output."
     }
    },
    {
     "t": "n8n Docs: Expressions",
     "url": "https://docs.n8n.io/code/expressions/",
     "what": {
      "ar": "Expressions ← وبعدين صفحة Built-in methods and variables.",
      "en": "Expressions → then the Built-in methods and variables page."
     }
    },
    {
     "t": "n8n Course: Level 1",
     "url": "https://docs.n8n.io/courses/level-one/",
     "what": {
      "ar": "الفصول 1–4 في اليوم 1 و2، والباقي في اليوم 3.",
      "en": "Chapters 1–4 on days 1 and 2, and the rest on day 3."
     }
    },
    {
     "t": "n8n Docs: Webhook node",
     "url": "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/",
     "what": {
      "ar": "Node parameters و Webhook URLs و Respond.",
      "en": "Node parameters, Webhook URLs and Respond."
     }
    },
    {
     "t": "n8n Docs: Built-in methods and variables",
     "url": "https://docs.n8n.io/code/builtin/overview/",
     "what": {
      "ar": "Current node input و Output of other nodes و Date and time.",
      "en": "Current node input, Output of other nodes, and Date and time."
     }
    },
    {
     "t": "n8n Docs: Keyboard shortcuts",
     "url": "https://docs.n8n.io/keyboard-shortcuts/",
     "what": {
      "ar": "اطبعها أو احفظ أول 10.",
      "en": "Print them, or memorise the first 10."
     }
    },
    {
     "t": "JSON.org",
     "url": "https://www.json.org/json-en.html",
     "what": {
      "ar": "الرسومات بس (5 دقايق)، وهتفهم ليه JSON بيرفض فاصلة زيادة.",
      "en": "Just the diagrams (5 minutes) — you'll see why JSON rejects a trailing comma."
     }
    },
    {
     "t": "Webhook.site",
     "url": "https://webhook.site/",
     "what": {
      "ar": "افتحه وابعتله من HTTP Request وشوف الـ Body والـ Headers.",
      "en": "Open it, send to it from HTTP Request, and look at the body and headers."
     }
    },
    {
     "t": "JSONLint",
     "url": "https://jsonlint.com/",
     "what": {
      "ar": "الصق أي JSON مش شغال وشوف السطر اللي فيه المشكلة.",
      "en": "Paste any broken JSON and see the line with the problem."
     }
    }
   ],
   "challenge": {
    "ar": "Webhook بـ POST بيستقبل `{ \"name\": \"...\", \"age\": 20 }` ويرد بـ JSON فيه `greeting` و`isAdult`. ولو `name` فاضي: IF ← Respond to Webhook بـ Response Code = 400 ورسالة `name is required`. جرّبه بـ `curl.exe`.",
    "en": "A POST webhook that receives `{ \"name\": \"...\", \"age\": 20 }` and replies with JSON containing `greeting` and `isAdult`. If `name` is empty: IF → Respond to Webhook with Response Code = 400 and the message `name is required`. Test it with `curl.exe`."
   },
   "quiz": [
    {
     "q": {
      "ar": "البيانات اللي بتتنقل بين نودين في n8n شكلها إيه؟",
      "en": "What does the data passed between two nodes in n8n look like?"
     },
     "o": [
      {
       "ar": "object واحد فيه كل البيانات",
       "en": "One object holding all the data"
      },
      {
       "ar": "array من items وكل item فيه json",
       "en": "An array of items, each item holding json"
      },
      {
       "ar": "نص عادي",
       "en": "Plain text"
      },
      {
       "ar": "ملف CSV",
       "en": "A CSV file"
      }
     ],
     "a": 1,
     "why": {
      "ar": "دايمًا array من items، وكل item جواه json (وممكن binary).",
      "en": "Always an array of items, each containing json (and possibly binary)."
     }
    },
    {
     "q": {
      "ar": "دخل 5 items على نود Edit Fields. الـ Expression بيتحسب كام مرة؟",
      "en": "5 items enter an Edit Fields node. How many times is the expression evaluated?"
     },
     "o": [
      {
       "ar": "مرة واحدة",
       "en": "Once"
      },
      {
       "ar": "5 مرات، مرة لكل item",
       "en": "5 times, once per item"
      },
      {
       "ar": "مرتين",
       "en": "Twice"
      },
      {
       "ar": "لازم Loop عشان يشتغل",
       "en": "It needs a Loop to work"
      }
     ],
     "a": 1,
     "why": {
      "ar": "النودات بتشتغل على كل item تلقائيًا، فالـ Expression بيتحسب لكل item.",
      "en": "Nodes run on every item automatically, so the expression is evaluated for each item."
     }
    },
    {
     "q": {
      "ar": "`{{ $json.email }}` بيقرا القيمة منين؟",
      "en": "Where does `{{ $json.email }}` read the value from?"
     },
     "o": [
      {
       "ar": "من أول نود في الـ Workflow",
       "en": "From the first node in the workflow"
      },
      {
       "ar": "من الـ item الحالي اللي جاي من النود اللي قبلها مباشرة",
       "en": "From the current item coming from the node directly before"
      },
      {
       "ar": "من الـ Credentials",
       "en": "From the credentials"
      },
      {
       "ar": "من كل الـ items مع بعض",
       "en": "From all items at once"
      }
     ],
     "a": 1,
     "why": {
      "ar": "$json = بيانات الـ item الحالي من النود السابقة مباشرة.",
      "en": "$json = the current item's data from the node directly before."
     }
    }
   ]
  },
  {
   "d": 2,
   "title": {
    "ar": "APIs وHTTP والمنطق: IF وSwitch وMerge",
    "en": "APIs, HTTP and logic: IF, Switch and Merge"
   },
   "goal": {
    "ar": "تكلّم أي API حتى لو مالوش نود جاهزة، وتفهم ردوده وأخطاءه، وتوجّه البيانات في مسارات حسب شروط.",
    "en": "Call any API even when there's no ready-made node, understand its replies and errors, and route data down paths based on conditions."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "تشريح أي طلب HTTP",
      "en": "Anatomy of an HTTP request"
     },
     "p": {
      "ar": "أي طلب فيه: Method (GET للقراءة، POST للإرسال، PUT/PATCH للتعديل، DELETE للحذف) وURL وHeaders وBody. والرد فيه Status Code وBody.",
      "en": "Every request has a method (GET to read, POST to send, PUT/PATCH to update, DELETE to remove), a URL, headers and a body. The response has a status code and a body."
     },
     "ex": "POST https://api.example.com/v1/leads\nContent-Type: application/json\nAuthorization: Bearer sk_123\n\n{ \"name\": \"Ali\", \"email\": \"ali@x.com\" }"
    },
    {
     "h": {
      "ar": "Status Codes اللي لازم تحفظها",
      "en": "Status codes you must know"
     },
     "p": {
      "ar": "2xx نجاح، 4xx غلط منك، 5xx غلط من السيرفر. أهمهم 200 و201 و400 و401 و403 و404 و429 و500.",
      "en": "2xx success, 4xx your mistake, 5xx the server's mistake. The key ones are 200, 201, 400, 401, 403, 404, 429 and 500."
     },
     "ex": "401 = مين انت؟ (المفتاح غلط)\n403 = عارفك بس ممنوع\n429 = بالراحة، طلبات كتير"
    },
    {
     "h": {
      "ar": "Query مقابل Body",
      "en": "Query vs body"
     },
     "p": {
      "ar": "الـ Query في آخر الرابط بعد `?` وبيستخدم غالبًا مع GET للفلترة. الـ Body بيتبعت مع POST وفيه البيانات نفسها كـ JSON.",
      "en": "The query sits at the end of the URL after `?` and is mostly used with GET for filtering. The body is sent with POST and carries the data itself as JSON."
     },
     "ex": "GET /posts?userId=1&_limit=5\nPOST /posts   body: { \"title\": \"Hi\" }"
    },
    {
     "h": {
      "ar": "طرق المصادقة (Authentication)",
      "en": "Authentication methods"
     },
     "p": {
      "ar": "API Key في Header أو Query، أو Bearer Token، أو Basic (user/pass)، أو OAuth2. في n8n حطها دايمًا في Credential (Header Auth مثلاً) مش جوه الـ URL.",
      "en": "An API key in a header or the query, a Bearer token, Basic (user/pass), or OAuth2. In n8n always put it in a credential (Header Auth, for example), not in the URL."
     },
     "ex": "Header Auth →  Name: Authorization\n              Value: Bearer YOUR_TOKEN"
    },
    {
     "h": {
      "ar": "IF وFilter وSwitch",
      "en": "IF, Filter and Switch"
     },
     "p": {
      "ar": "IF بيقسم لمسارين true/false. Filter بيسيب اللي بيطابق بس ويرمي الباقي. Switch بيوزّع على أكتر من مسار بقواعد، وفيه Fallback للي مطابقش حاجة.",
      "en": "IF splits into two paths, true/false. Filter keeps what matches and drops the rest. Switch routes to several paths using rules, with a fallback for anything that matches none."
     },
     "ex": "IF:     {{ $json.total }} > 1000  → VIP / عادي\nSwitch: status = new | paid | refunded"
    },
    {
     "h": {
      "ar": "Merge: رجّع المسارات لبعض",
      "en": "Merge: bring the paths back together"
     },
     "p": {
      "ar": "Append بيحط الاتنين ورا بعض. Combine by Matching Fields بيعمل join على حقل مشترك (زي VLOOKUP). Combine by Position بيدمج الأول مع الأول.",
      "en": "Append puts both one after the other. Combine by Matching Fields joins on a shared field (like VLOOKUP). Combine by Position merges first with first."
     },
     "ex": "users.id  ⟷  posts.userId\n→ كل post معاه اسم صاحبه"
    }
   ],
   "practice": [
    {
     "ar": "HTTP Request: GET `https://jsonplaceholder.typicode.com/users` ← Filter (`id` > 5) ← Sort بالاسم ← Limit 3",
     "en": "HTTP Request: GET `https://jsonplaceholder.typicode.com/users` → Filter (`id` > 5) → Sort by name → Limit 3"
    },
    {
     "ar": "افتح docs أي API، انسخ مثال cURL، وفي HTTP Request اضغط Import cURL وشوف n8n ملاه لوحده",
     "en": "Open any API's docs, copy a cURL example, and in HTTP Request click Import cURL — watch n8n fill it in"
    },
    {
     "ar": "طقس القاهرة من Open-Meteo (من غير مفتاح)، وEdit Fields يطلّع `temp` و`wind` بس",
     "en": "Cairo weather from Open-Meteo (no key), with Edit Fields keeping only `temp` and `wind`"
    },
    {
     "ar": "Switch على الحرارة: حر (> 30) / معتدل / برد، وكل مسار يضيف `advice` مختلف",
     "en": "Switch on the temperature: hot (> 30) / mild / cold, with each path adding a different `advice`"
    },
    {
     "ar": "POST على `https://jsonplaceholder.typicode.com/posts` بـ JSON Body جاي من Expressions",
     "en": "POST to `https://jsonplaceholder.typicode.com/posts` with a JSON body built from expressions"
    },
    {
     "ar": "Merge (Combine by Matching Fields): اربط `/posts` بـ `/users` على `userId` = `id`",
     "en": "Merge (Combine by Matching Fields): join `/posts` with `/users` on `userId` = `id`"
    },
    {
     "ar": "فعّل من Options: Include Response Headers and Status، وجرّب رابط غلط وشوف 404",
     "en": "Under Options enable Include Response Headers and Status, try a wrong URL and see the 404"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "رابط Open-Meteo للقاهرة",
      "en": "Open-Meteo URL for Cairo"
     },
     "p": "https://api.open-meteo.com/v1/forecast?latitude=30.04&longitude=31.24&current=temperature_2m,wind_speed_10m\n\n// في Edit Fields:\n{{ $json.current.temperature_2m }}\n{{ $json.current.wind_speed_10m }}"
    },
    {
     "u": {
      "ar": "JSON Body بـ Expressions (Specify Body: Using JSON)",
      "en": "A JSON body with expressions (Specify Body: Using JSON)"
     },
     "p": "{\n  \"title\": \"{{ $json.name }}\",\n  \"body\": \"Lead from {{ $json.address.city }}\",\n  \"userId\": {{ $json.id }}\n}"
    },
    {
     "u": {
      "ar": "شرط Switch/IF كـ Expression",
      "en": "A Switch/IF condition as an expression"
     },
     "p": "{{ $json.current.temperature_2m > 30 }}\n{{ [\"paid\", \"shipped\"].includes($json.status) }}\n{{ $json.email.endsWith(\"@gmail.com\") }}"
    },
    {
     "u": {
      "ar": "اختبار API من الطرفية قبل n8n",
      "en": "Test the API from the terminal before n8n"
     },
     "p": "curl.exe -s \"https://jsonplaceholder.typicode.com/users/1\"\ncurl.exe -X POST -H \"Content-Type: application/json\" -d \"{\\\"title\\\":\\\"hi\\\"}\" https://jsonplaceholder.typicode.com/posts"
    }
   ],
   "words": [
    {
     "t": "HTTP Request",
     "m": {
      "ar": "بيكلّم أي API",
      "en": "Calls any API"
     },
     "ex": "GET https://api.github.com/users/n8n-io"
    },
    {
     "t": "IF",
     "m": {
      "ar": "شرط بيقسم المسار لـ true وfalse",
      "en": "A condition that splits the path into true and false"
     },
     "ex": "{{ $json.total }} > 1000 → true / false"
    },
    {
     "t": "Filter",
     "m": {
      "ar": "بيكمّل بس بالـ items اللي بتحقق الشرط",
      "en": "Continues only with the items that meet the condition"
     },
     "ex": "Keep items where status = \"paid\""
    },
    {
     "t": "Switch",
     "m": {
      "ar": "بيوزّع الـ items على أكتر من مسار",
      "en": "Routes items to more than one path"
     },
     "ex": "Rules: new | paid | refunded | fallback"
    },
    {
     "t": "Merge",
     "m": {
      "ar": "دمج مسارين",
      "en": "Merges two paths"
     },
     "ex": "Combine by Matching Fields: id = userId"
    },
    {
     "t": "Sort / Limit",
     "m": {
      "ar": "ترتيب / تحديد عدد الـ items",
      "en": "Sort / limit the number of items"
     },
     "ex": "Sort: amount desc → Limit: 5"
    },
    {
     "t": "API",
     "m": {
      "ar": "واجهة بيتكلم بيها برنامج مع برنامج",
      "en": "An interface one program uses to talk to another"
     },
     "ex": "api.open-meteo.com/v1/forecast"
    },
    {
     "t": "endpoint",
     "m": {
      "ar": "عنوان محدد في الـ API",
      "en": "A specific address in an API"
     },
     "ex": "GET /v1/users/{id}"
    },
    {
     "t": "GET / POST",
     "m": {
      "ar": "طلب لجلب بيانات / لإرسال بيانات",
      "en": "A request to fetch data / to send data"
     },
     "ex": "GET /users  ·  POST /users { … }"
    },
    {
     "t": "query parameter",
     "m": {
      "ar": "قيمة في آخر الرابط بعد ؟",
      "en": "A value at the end of the URL after ?"
     },
     "ex": "?page=2&limit=50"
    },
    {
     "t": "status code",
     "m": {
      "ar": "رمز حالة الرد (200، 404…)",
      "en": "The response status code (200, 404…)"
     },
     "ex": "200 OK · 404 Not Found"
    },
    {
     "t": "API key",
     "m": {
      "ar": "مفتاح بيعرّفك للـ API",
      "en": "A key that identifies you to the API"
     },
     "ex": "X-API-Key: sk_live_…"
    },
    {
     "t": "header",
     "m": {
      "ar": "معلومات إضافية بتتبعت مع الطلب",
      "en": "Extra information sent with the request"
     },
     "ex": "Content-Type: application/json"
    },
    {
     "t": "body",
     "m": {
      "ar": "محتوى الطلب (JSON) في POST",
      "en": "The request content (JSON) in a POST"
     },
     "ex": "{ \"title\": \"Hi\", \"userId\": 1 }"
    },
    {
     "t": "cURL",
     "m": {
      "ar": "أمر لإرسال طلب — n8n بيستورده",
      "en": "A command for sending a request — n8n can import it"
     },
     "ex": "curl -H \"Authorization: Bearer X\" https://…"
    },
    {
     "t": "HTTP method",
     "m": {
      "ar": "نوع الطلب: GET وPOST وPUT وPATCH وDELETE",
      "en": "The request type: GET, POST, PUT, PATCH and DELETE"
     },
     "ex": "PATCH /users/5 { \"city\": \"Giza\" }"
    },
    {
     "t": "Bearer token",
     "m": {
      "ar": "توكن بيتبعت في Authorization header",
      "en": "A token sent in the Authorization header"
     },
     "ex": "Authorization: Bearer abc123"
    },
    {
     "t": "Header Auth",
     "m": {
      "ar": "Credential بتحط header ثابت في كل طلب",
      "en": "A credential that adds a fixed header to every request"
     },
     "ex": "Name: X-API-Key · Value: sk_…"
    },
    {
     "t": "Content-Type",
     "m": {
      "ar": "بيعرّف السيرفر شكل الـ body",
      "en": "Tells the server the format of the body"
     },
     "ex": "application/json · multipart/form-data"
    },
    {
     "t": "Import cURL",
     "m": {
      "ar": "لصق أمر curl من التوثيق فـ n8n يملا النود",
      "en": "Paste a curl command from the docs and n8n fills in the node"
     },
     "ex": "HTTP Request → Import cURL"
    },
    {
     "t": "Fallback Output",
     "m": {
      "ar": "مسار Switch للـ items اللي مطابقتش أي قاعدة",
      "en": "A Switch path for items that matched no rule"
     },
     "ex": "Switch → Options → Fallback Output: Extra Output"
    },
    {
     "t": "Combine by Matching Fields",
     "m": {
      "ar": "وضع في Merge بيعمل join على حقل مشترك",
      "en": "A Merge mode that joins on a shared field"
     },
     "ex": "Input1.id = Input2.userId"
    }
   ],
   "read": [
    {
     "t": "n8n Course: Level 1",
     "url": "https://docs.n8n.io/courses/level-one/",
     "what": {
      "ar": "الفصول 1–4 في اليوم 1 و2، والباقي في اليوم 3.",
      "en": "Chapters 1–4 on days 1 and 2, and the rest on day 3."
     }
    },
    {
     "t": "n8n Docs: HTTP Request node",
     "url": "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/",
     "what": {
      "ar": "Node parameters و Pagination.",
      "en": "Node parameters and Pagination."
     }
    },
    {
     "t": "n8n Docs: Splitting with conditionals",
     "url": "https://docs.n8n.io/flow-logic/splitting/",
     "what": {
      "ar": "الصفحة كلها (10 دقايق).",
      "en": "The whole page (10 minutes)."
     }
    },
    {
     "t": "n8n Docs: Merging data",
     "url": "https://docs.n8n.io/flow-logic/merging/",
     "what": {
      "ar": "الصفحة كلها، وجرّب كل وضع على بيانات صغيرة.",
      "en": "The whole page, and try each mode on a small dataset."
     }
    },
    {
     "t": "n8n Workflow Templates",
     "url": "https://n8n.io/workflows/",
     "what": {
      "ar": "كل يوم: افتح Template واحد في نفس موضوع اليوم، واستورده، واقرا كل نود فيه.",
      "en": "Every day: open one template on the day's topic, import it, and read every node in it."
     }
    },
    {
     "t": "MDN: An overview of HTTP",
     "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
     "what": {
      "ar": "الصفحة كلها (15 دقيقة).",
      "en": "The whole page (15 minutes)."
     }
    },
    {
     "t": "MDN: HTTP status codes",
     "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
     "what": {
      "ar": "اقرا 2xx و4xx كويس، والباقي مرجع.",
      "en": "Read 2xx and 4xx carefully; the rest is reference."
     }
    },
    {
     "t": "MDN: HTTP request methods",
     "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
     "what": {
      "ar": "الصفحة الرئيسية + GET و POST.",
      "en": "The main page + GET and POST."
     }
    },
    {
     "t": "Postman Learning Center",
     "url": "https://learning.postman.com/",
     "what": "Getting started ← Sending your first request."
    },
    {
     "t": "Everything curl",
     "url": "https://everything.curl.dev/",
     "what": {
      "ar": "HTTP with curl ← Method و Post و Headers.",
      "en": "HTTP with curl → Method, Post and Headers."
     }
    },
    {
     "t": "JSONPlaceholder",
     "url": "https://jsonplaceholder.typicode.com/",
     "what": {
      "ar": "Resources و Routes: جرّب كل واحد في HTTP Request.",
      "en": "Resources and Routes: try each one in HTTP Request."
     }
    },
    {
     "t": "httpbin",
     "url": "https://httpbin.org/",
     "what": {
      "ar": "/anything و /status/500 و /delay/5.",
      "en": "/anything, /status/500 and /delay/5."
     }
    },
    {
     "t": "Public APIs",
     "url": "https://github.com/public-apis/public-apis",
     "what": {
      "ar": "اختار API من غير Auth وابني عليه Workflow.",
      "en": "Pick an API with no auth and build a workflow on it."
     }
    }
   ],
   "challenge": {
    "ar": "Code يطلّع 3 مدن (name, lat, lon) ← HTTP Request واحد بيستخدم `{{ $json.lat }}` و`{{ $json.lon }}` ← Sort حسب الحرارة ← Aggregate ← Edit Fields يعمل رسالة واحدة فيها المدن التلاتة مرتبة.",
    "en": "Code outputs 3 cities (name, lat, lon) → one HTTP Request using `{{ $json.lat }}` and `{{ $json.lon }}` → Sort by temperature → Aggregate → Edit Fields builds one message listing the three cities in order."
   },
   "quiz": [
    {
     "q": {
      "ar": "الـ API رجّع 401. غالبًا المشكلة إيه؟",
      "en": "The API returned 401. What's most likely wrong?"
     },
     "o": [
      {
       "ar": "السيرفر واقع",
       "en": "The server is down"
      },
      {
       "ar": "المفتاح أو الـ Token غلط أو ناقص",
       "en": "The key or token is wrong or missing"
      },
      {
       "ar": "الرابط مش موجود",
       "en": "The URL doesn't exist"
      },
      {
       "ar": "بعت طلبات كتير",
       "en": "You sent too many requests"
      }
     ],
     "a": 1,
     "why": {
      "ar": "401 Unauthorized = السيرفر مش عارف انت مين. راجع الـ Credential.",
      "en": "401 Unauthorized = the server doesn't know who you are. Check the credential."
     }
    },
    {
     "q": {
      "ar": "عايز تقسم الطلبات على 4 مسارات حسب الحالة. هتستخدم إيه؟",
      "en": "You want to split requests into 4 paths by status. What do you use?"
     },
     "o": [
      "IF",
      "Filter",
      "Switch",
      "Merge"
     ],
     "a": 2,
     "why": {
      "ar": "Switch بيوزّع على أكتر من مسار. IF مساريْن بس.",
      "en": "Switch routes to more than two paths. IF has only two."
     }
    },
    {
     "q": {
      "ar": "الفرق بين Filter وIF؟",
      "en": "What's the difference between Filter and IF?"
     },
     "o": [
      {
       "ar": "مفيش فرق",
       "en": "There's no difference"
      },
      {
       "ar": "Filter بيسيب اللي بيطابق بس، وIF بيطلّع مسارين",
       "en": "Filter keeps only what matches, IF outputs two paths"
      },
      {
       "ar": "IF أسرع",
       "en": "IF is faster"
      },
      {
       "ar": "Filter بيشتغل على item واحد بس",
       "en": "Filter works on one item only"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Filter بيرمي اللي مبيطابقش، وIF بيوديه على مسار false.",
      "en": "Filter drops what doesn't match; IF sends it down the false path."
     }
    }
   ]
  },
  {
   "d": 3,
   "title": {
    "ar": "الربط بالخدمات: Sheets وTelegram وGmail والجدولة",
    "en": "Connecting services: Sheets, Telegram, Gmail and scheduling"
   },
   "goal": {
    "ar": "تربط n8n بالأدوات اللي الناس بتدفع عشان يتعمل فيها أتمتة، وتشغّل الـ Workflow لوحده على جدول أو مع أي حدث.",
    "en": "Connect n8n to the tools people pay to automate, and make workflows run by themselves on a schedule or on any event."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "Credentials وOAuth2",
      "en": "Credentials and OAuth2"
     },
     "p": {
      "ar": "Credential = بيانات دخول محفوظة مشفّرة. OAuth2 (جوجل مثلاً) بيفتحلك صفحة تسجيل دخول وترجع لـ n8n من غير ما تكتب باسوورد. لو n8n على جهازك محتاج Client ID وSecret من Google Cloud.",
      "en": "A credential = saved, encrypted login details. OAuth2 (Google, for example) opens a sign-in page and returns you to n8n without typing a password. If n8n runs on your machine you need a Client ID and Secret from Google Cloud."
     },
     "ex": "Google Cloud → APIs & Services → Credentials\n→ OAuth client ID → Web application\n→ Redirect URI (انسخه من n8n)"
    },
    {
     "h": {
      "ar": "أنواع الـ Triggers",
      "en": "Types of triggers"
     },
     "p": {
      "ar": "Webhook = الخدمة بتكلمك أول ما يحصل حدث. Polling = n8n بيسأل كل فترة «في جديد؟» (زي Google Sheets Trigger). Schedule = على وقت ثابت.",
      "en": "Webhook = the service calls you the moment something happens. Polling = n8n asks every so often “anything new?” (like the Google Sheets Trigger). Schedule = at a fixed time."
     },
     "ex": "Webhook: فوري\nPolling: كل دقيقة مثلاً\nSchedule: 0 9 * * *"
    },
    {
     "h": {
      "ar": "عمليات Google Sheets",
      "en": "Google Sheets operations"
     },
     "p": {
      "ar": "Get Row(s) بيقرا، Append Row بيضيف، Update Row بيعدّل بعمود مطابقة، وAppend or Update بيعدّل لو الصف موجود ويضيف لو مش موجود (upsert). الصف الأول لازم يكون أسماء الأعمدة.",
      "en": "Get Row(s) reads, Append Row adds, Update Row edits using a match column, and Append or Update edits the row if it exists and adds it if not (upsert). The first row must hold the column names."
     },
     "ex": "Operation: Append or Update Row\nColumn to match on: email"
    },
    {
     "h": "Telegram Bot",
     "p": {
      "ar": "من @BotFather بتاخد Token. عشان تبعت محتاج Chat ID: ابعت أي رسالة للبوت وشغّل Telegram Trigger وهتلاقيه في `message.chat.id`.",
      "en": "You get a token from @BotFather. To send messages you need a Chat ID: send the bot any message, run a Telegram Trigger, and you'll find it in `message.chat.id`."
     },
     "ex": "{{ $json.message.chat.id }}\n{{ $json.message.text }}"
    },
    {
     "h": {
      "ar": "Cron في Schedule Trigger",
      "en": "Cron in the Schedule Trigger"
     },
     "p": {
      "ar": "5 خانات: دقيقة، ساعة، يوم في الشهر، شهر، يوم في الأسبوع (0 = الأحد). اضبط الـ Timezone في Workflow Settings.",
      "en": "5 fields: minute, hour, day of month, month, day of week (0 = Sunday). Set the timezone in Workflow Settings."
     },
     "ex": "0 9 * * 0-4    الساعة 9، من الأحد للخميس\n*/15 * * * *   كل ربع ساعة\n0 8 1 * *      أول كل شهر 8 الصبح"
    },
    {
     "h": {
      "ar": "رسائل منسّقة",
      "en": "Formatted messages"
     },
     "p": {
      "ar": "في Telegram اختار Parse Mode = HTML عشان تستخدم <b> و<i>. وفي Gmail اختار Email Type = HTML. خلي الـ Expressions جوه النص.",
      "en": "In Telegram choose Parse Mode = HTML so you can use <b> and <i>. In Gmail choose Email Type = HTML. Keep the expressions inside the text."
     },
     "ex": "<b>عميل جديد</b>\nالاسم: {{ $json.name }}\nالمصدر: {{ $json.source }}"
    }
   ],
   "practice": [
    {
     "ar": "اعمل Sheet اسمه `Leads` بأعمدة: `name, email, phone, source, status, notified_at` و5 صفوف تجريبية",
     "en": "Create a Sheet called `Leads` with the columns `name, email, phone, source, status, notified_at` and 5 sample rows"
    },
    {
     "ar": "اعمل Google Sheets Credential (أو سجّل دخول مباشرة لو n8n Cloud)",
     "en": "Create a Google Sheets credential (or sign in directly on n8n Cloud)"
    },
    {
     "ar": "Get Row(s) بفلتر `status = new`",
     "en": "Get Row(s) filtered by `status = new`"
    },
    {
     "ar": "اعمل بوت من @BotFather، وTelegram Trigger ياخد منه Chat ID، وبعدين Send Message لنفسك",
     "en": "Create a bot with @BotFather, use a Telegram Trigger to get the Chat ID, then Send Message to yourself"
    },
    {
     "ar": "Append or Update Row بـ `email` كعمود مطابقة، وجرّب تبعت نفس الإيميل مرتين",
     "en": "Append or Update Row with `email` as the match column, and try sending the same email twice"
    },
    {
     "ar": "Gmail ← Send بـ Email Type = HTML فيه جدول صغير لبيانات العميل",
     "en": "Gmail → Send with Email Type = HTML containing a small table of the customer's data"
    },
    {
     "ar": "Schedule Trigger بـ Cron `0 9 * * 0-4` واضبط Timezone على Africa/Cairo من Settings",
     "en": "Schedule Trigger with Cron `0 9 * * 0-4`, and set the timezone to Africa/Cairo in Settings"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "رسالة Telegram (Parse Mode: HTML)",
      "en": "Telegram message (Parse Mode: HTML)"
     },
     "p": "<b>🔔 Lead جديد</b>\nالاسم: {{ $json.name }}\nالإيميل: {{ $json.email }}\nالمصدر: {{ $json.source }}\nالوقت: {{ $now.setZone(\"Africa/Cairo\").toFormat(\"dd/MM HH:mm\") }}"
    },
    {
     "u": {
      "ar": "إيميل HTML بسيط",
      "en": "A simple HTML email"
     },
     "p": "<h2>Hello {{ $json.name }}</h2>\n<p>Thanks for contacting us. Here is your request:</p>\n<table border=\"1\" cellpadding=\"6\">\n  <tr><td>Service</td><td>{{ $json.service }}</td></tr>\n  <tr><td>Date</td><td>{{ $now.toFormat(\"dd LLL yyyy\") }}</td></tr>\n</table>"
    },
    {
     "u": {
      "ar": "تعليم الصف بعد الإرسال (Update Row)",
      "en": "Marking the row after sending (Update Row)"
     },
     "p": "Column to match on: email\nemail:       {{ $json.email }}\nstatus:      notified\nnotified_at: {{ $now.toISO() }}"
    },
    {
     "u": {
      "ar": "Cron جاهز",
      "en": "Ready-made cron"
     },
     "p": "0 9 * * 0-4      كل يوم عمل 9 الصبح (أحد → خميس)\n0 */2 * * *      كل ساعتين\n30 17 * * 4      الخميس 5:30 العصر\n0 0 1 * *        أول كل شهر نص الليل"
    }
   ],
   "words": [
    {
     "t": "credentials",
     "m": {
      "ar": "بيانات الدخول المحفوظة مشفّرة",
      "en": "Saved login details, stored encrypted"
     },
     "ex": "Google Sheets OAuth2 account (مشفّرة)"
    },
    {
     "t": "Schedule Trigger",
     "m": {
      "ar": "تشغيل على جدول زمني",
      "en": "Runs on a time schedule"
     },
     "ex": "Cron: 0 9 * * 0-4"
    },
    {
     "t": "Google Sheets Trigger",
     "m": {
      "ar": "بيشتغل لما يتضاف صف جديد",
      "en": "Fires when a new row is added"
     },
     "ex": "Trigger On: Row Added · Poll: every minute"
    },
    {
     "t": "polling",
     "m": {
      "ar": "فحص دوري بيسأل «في جديد؟» — عكس الـ Webhook",
      "en": "A periodic check asking “anything new?” — the opposite of a webhook"
     },
     "ex": "كل دقيقة: «في صف جديد؟»"
    },
    {
     "t": "Telegram Trigger",
     "m": {
      "ar": "بيشتغل لما البوت يستقبل رسالة",
      "en": "Fires when the bot receives a message"
     },
     "ex": "Updates: message → {{ $json.message.text }}"
    },
    {
     "t": "mapping",
     "m": {
      "ar": "ربط أعمدة الشيت بحقول البيانات",
      "en": "Linking sheet columns to data fields"
     },
     "ex": "Sheet column \"Email\" ← {{ $json.email }}"
    },
    {
     "t": "Append / Update Row",
     "m": {
      "ar": "إضافة صف / تعديل صف",
      "en": "Add a row / update a row"
     },
     "ex": "Append or Update · match on: email"
    },
    {
     "t": "OAuth2",
     "m": {
      "ar": "تسجيل دخول آمن بيربط n8n بحسابك",
      "en": "Secure sign-in that connects n8n to your account"
     },
     "ex": "Sign in with Google → Allow"
    },
    {
     "t": "token",
     "m": {
      "ar": "رمز دخول",
      "en": "An access token"
     },
     "ex": "Bearer eyJhbGciOi…"
    },
    {
     "t": "Chat ID",
     "m": {
      "ar": "رقم محادثة تيليجرام",
      "en": "A Telegram chat number"
     },
     "ex": "message.chat.id = 123456789"
    },
    {
     "t": "cron",
     "m": {
      "ar": "جدولة أوامر على Linux",
      "en": "Scheduling commands on Linux"
     },
     "ex": "0 8 * * *"
    },
    {
     "t": "Redirect URI",
     "m": {
      "ar": "العنوان اللي جوجل بترجّعك عليه بعد تسجيل الدخول",
      "en": "The address Google sends you back to after signing in"
     },
     "ex": "http://localhost:5678/rest/oauth2-credential/callback"
    },
    {
     "t": "scope",
     "m": {
      "ar": "الصلاحيات اللي بتطلبها من الحساب",
      "en": "The permissions you request from the account"
     },
     "ex": "https://www.googleapis.com/auth/spreadsheets"
    },
    {
     "t": "Append or Update (upsert)",
     "m": {
      "ar": "يعدّل لو موجود ويضيف لو مش موجود",
      "en": "Updates if it exists, adds if it doesn't"
     },
     "ex": "Column to match on: email"
    },
    {
     "t": "Parse Mode",
     "m": {
      "ar": "تنسيق رسالة تيليجرام: HTML أو Markdown",
      "en": "Telegram message formatting: HTML or Markdown"
     },
     "ex": "<b>bold</b> · <i>italic</i>"
    },
    {
     "t": "Timezone",
     "m": {
      "ar": "منطقة التوقيت للـ Workflow أو الـ instance",
      "en": "The time zone of the workflow or instance"
     },
     "ex": "Settings → Timezone: Africa/Cairo"
    }
   ],
   "read": [
    {
     "t": "n8n Course: Level 1",
     "url": "https://docs.n8n.io/courses/level-one/",
     "what": {
      "ar": "الفصول 1–4 في اليوم 1 و2، والباقي في اليوم 3.",
      "en": "Chapters 1–4 on days 1 and 2, and the rest on day 3."
     }
    },
    {
     "t": "n8n Docs: Google credentials",
     "url": "https://docs.n8n.io/integrations/builtin/credentials/google/",
     "what": {
      "ar": "OAuth2 single service ← افتحها جنبك وانت بتعمل الإعداد.",
      "en": "OAuth2 single service → keep it open beside you while you set up."
     }
    },
    {
     "t": "n8n Docs: Schedule Trigger",
     "url": "https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/",
     "what": {
      "ar": "Custom (Cron) و Common issues.",
      "en": "Custom (Cron) and Common issues."
     }
    },
    {
     "t": "n8n Docs: Credentials",
     "url": "https://docs.n8n.io/credentials/",
     "what": {
      "ar": "Add and edit credentials و Credential sharing.",
      "en": "Add and edit credentials, and Credential sharing."
     }
    },
    {
     "t": "n8n Docs: Google Sheets node",
     "url": "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/",
     "what": {
      "ar": "Operations و Common issues.",
      "en": "Operations and Common issues."
     }
    },
    {
     "t": "n8n Docs: Telegram node",
     "url": "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/",
     "what": {
      "ar": "Message operations و Common issues.",
      "en": "Message operations and Common issues."
     }
    },
    {
     "t": "n8n Docs: Gmail node",
     "url": "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/",
     "what": "Message operations."
    },
    {
     "t": "crontab.guru",
     "url": "https://crontab.guru/",
     "what": {
      "ar": "جرّب فيه كل الـ Cron اللي في اليوم 3.",
      "en": "Try every cron from day 3 in it."
     }
    }
   ],
   "challenge": {
    "ar": "ملخص Leads يومي: Schedule الساعة 9 ← Get Rows (`status = new`) ← Aggregate ← رسالة Telegram واحدة فيها العدد وقايمة الأسماء ← Update Row لكل واحد: `status = notified`. ولو مفيش جديد، متبعتش رسالة (IF على العدد).",
    "en": "A daily leads digest: Schedule at 9 → Get Rows (`status = new`) → Aggregate → one Telegram message with the count and list of names → Update Row for each: `status = notified`. If there's nothing new, don't send a message (IF on the count)."
   },
   "quiz": [
    {
     "q": {
      "ar": "Google Sheets Trigger بيشتغل إزاي؟",
      "en": "How does the Google Sheets Trigger work?"
     },
     "o": [
      {
       "ar": "جوجل بتبعت Webhook فوري",
       "en": "Google sends an instant webhook"
      },
      {
       "ar": "Polling: n8n بيسأل كل فترة",
       "en": "Polling: n8n asks every so often"
      },
      {
       "ar": "لازم تضغط Execute",
       "en": "You have to click Execute"
      },
      {
       "ar": "بيشتغل مرة في اليوم بس",
       "en": "It runs once a day only"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Polling. عشان كده ممكن ياخد دقيقة لحد ما يلاحظ الصف الجديد.",
      "en": "Polling. That's why it can take a minute to notice the new row."
     }
    },
    {
     "q": {
      "ar": "Append or Update Row محتاج إيه عشان يعرف الصف موجود ولا لأ؟",
      "en": "What does Append or Update Row need to know whether a row exists?"
     },
     "o": [
      {
       "ar": "رقم الصف",
       "en": "The row number"
      },
      {
       "ar": "Column to match on زي email",
       "en": "A Column to match on, such as email"
      },
      {
       "ar": "اسم الشيت بس",
       "en": "Just the sheet name"
      },
      {
       "ar": "مفيش حاجة",
       "en": "Nothing"
      }
     ],
     "a": 1,
     "why": {
      "ar": "عمود مطابقة بقيمة فريدة (email أو id) بيحدد هل يعدّل ولا يضيف.",
      "en": "A match column with a unique value (email or id) decides whether to update or add."
     }
    },
    {
     "q": {
      "ar": "Cron `*/15 * * * *` معناه؟",
      "en": "What does the cron `*/15 * * * *` mean?"
     },
     "o": [
      {
       "ar": "الساعة 3 العصر",
       "en": "3 PM"
      },
      {
       "ar": "كل 15 دقيقة",
       "en": "Every 15 minutes"
      },
      {
       "ar": "يوم 15 في الشهر",
       "en": "The 15th of the month"
      },
      {
       "ar": "15 مرة في اليوم",
       "en": "15 times a day"
      }
     ],
     "a": 1,
     "why": {
      "ar": "الخانة الأولى هي الدقائق، و*/15 يعني كل 15 دقيقة.",
      "en": "The first field is minutes, and */15 means every 15 minutes."
     }
    }
   ]
  },
  {
   "d": 4,
   "title": {
    "ar": "تحويل البيانات: Code node والتواريخ والدوال الجاهزة",
    "en": "Transforming data: the Code node, dates and built-in functions"
   },
   "goal": {
    "ar": "تحوّل أي بيانات لأي شكل: بالنودات الجاهزة لما تكفي، وبـ JavaScript لما متكفيش، وتتعامل مع التواريخ صح.",
    "en": "Turn any data into any shape: with built-in nodes when they're enough and with JavaScript when they're not, and handle dates correctly."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "وضعين لنود Code",
      "en": "The Code node's two modes"
     },
     "p": {
      "ar": "Run Once for All Items: الكود بيشتغل مرة ويشوف كل الـ items بـ `$input.all()`، وبيرجّع array. Run Once for Each Item: بيشتغل لكل item لوحده بـ `$json`، وبيرجّع item واحد.",
      "en": "Run Once for All Items: the code runs once, sees every item via `$input.all()`, and returns an array. Run Once for Each Item: it runs for each item separately via `$json` and returns one item."
     },
     "ex": "// All Items\nreturn $input.all().map(i => ({ json: { n: i.json.name } }));\n\n// Each Item\nreturn { json: { ...$json, n: $json.name } };"
    },
    {
     "h": {
      "ar": "map وfilter وreduce",
      "en": "map, filter and reduce"
     },
     "p": {
      "ar": "map بتحوّل كل عنصر، filter بتختار، reduce بتجمّع لقيمة واحدة. دي 80% من شغل Code node.",
      "en": "map transforms each element, filter selects, reduce combines into one value. That's 80% of Code node work."
     },
     "ex": "const items = $input.all();\nconst paid  = items.filter(i => i.json.status === \"paid\");\nconst total = paid.reduce((s, i) => s + i.json.amount, 0);"
    },
    {
     "h": {
      "ar": "Aggregate وSplit Out وSummarize",
      "en": "Aggregate, Split Out and Summarize"
     },
     "p": {
      "ar": "Aggregate بيجمّع items كتير في item واحد فيه array. Split Out العكس: array جوه item بتتحول items. Summarize زي Pivot Table: Sum وCount وAverage مع Group By.",
      "en": "Aggregate gathers many items into one item holding an array. Split Out is the reverse: an array inside an item becomes items. Summarize is like a pivot table: Sum, Count and Average with Group By."
     },
     "ex": "5 items ← Aggregate ← 1 item { names: [...] }\n1 item { tags: [a,b,c] } ← Split Out ← 3 items"
    },
    {
     "h": {
      "ar": "التواريخ بـ Luxon",
      "en": "Dates with Luxon"
     },
     "p": {
      "ar": "`$now` و`$today` كائنات DateTime. تقدر تضيف وتطرح وتنسّق وتحسب الفرق. النص بتحوّله لتاريخ بـ `.toDateTime()`.",
      "en": "`$now` and `$today` are DateTime objects. You can add, subtract, format and calculate differences. Turn a string into a date with `.toDateTime()`."
     },
     "ex": "{{ $now.plus({ days: 3 }).toFormat(\"yyyy-MM-dd\") }}\n{{ $today.startOf(\"month\").toISODate() }}\n{{ $json.due.toDateTime().diff($now, \"days\").days.round(0) }}"
    },
    {
     "h": {
      "ar": "دوال n8n الجاهزة",
      "en": "n8n built-in functions"
     },
     "p": {
      "ar": "n8n بيضيف دوال مختصرة على النصوص والأرقام والمصفوفات جوه الـ Expressions، فبتوفر عليك كود كتير.",
      "en": "n8n adds shortcut functions for strings, numbers and arrays inside expressions, which saves you a lot of code."
     },
     "ex": "{{ $json.name.toTitleCase() }}\n{{ $json.text.extractEmail() }}\n{{ $json.prices.sum() }}\n{{ $json.list.removeDuplicates() }}"
    },
    {
     "h": {
      "ar": "Regex للتنضيف",
      "en": "Regex for cleaning"
     },
     "p": {
      "ar": "بتستخدمه لما البيانات مكتوبة بأشكال مختلفة. `replace(/\\D/g, \"\")` بيشيل أي حاجة مش رقم.",
      "en": "Use it when data is written in different formats. `replace(/\\D/g, \"\")` removes anything that isn't a digit."
     },
     "ex": "{{ $json.phone.replace(/\\D/g, \"\").replace(/^20/, \"0\") }}\n\"+20 100-123-4567\"  →  \"01001234567\""
    }
   ],
   "practice": [
    {
     "ar": "هات `/users` من JSONPlaceholder، وCode (All Items) يجمّعهم حسب `address.city` ويرجّع item لكل مدينة فيه العدد",
     "en": "Get `/users` from JSONPlaceholder, and have Code (All Items) group them by `address.city` and return one item per city with its count"
    },
    {
     "ar": "نفس النتيجة بنود Summarize (Count, Group By) وقارن بين الطريقتين",
     "en": "Get the same result with the Summarize node (Count, Group By) and compare the two approaches"
    },
    {
     "ar": "Code يرجّع item فيه `tags: [\"a\",\"b\",\"c\"]` ← Split Out ← Aggregate تاني",
     "en": "Code returns an item with `tags: [\"a\",\"b\",\"c\"]` → Split Out → Aggregate again"
    },
    {
     "ar": "Edit Fields فيه 5 تواريخ: النهارده، بعد أسبوع، أول الشهر، آخر الشهر، وعدد الأيام لحد تاريخ معيّن",
     "en": "Edit Fields with 5 dates: today, a week from now, start of the month, end of the month, and days until a given date"
    },
    {
     "ar": "نضّف 6 أرقام تليفون مكتوبة بأشكال مختلفة (`+20`، شرط، مسافات) لشكل موحد `01xxxxxxxxx`",
     "en": "Clean 6 phone numbers written in different ways (`+20`, dashes, spaces) into one format `01xxxxxxxxx`"
    },
    {
     "ar": "Code بيرمي Error واضح لو في item من غير email: `throw new Error(\"...\")`",
     "en": "Code throws a clear error if an item has no email: `throw new Error(\"...\")`"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "Group by + ترتيب (Run Once for All Items)",
      "en": "Group by + sort (Run Once for All Items)"
     },
     "p": "const counts = {};\nfor (const item of $input.all()) {\n  const city = item.json.address?.city ?? \"unknown\";\n  counts[city] = (counts[city] || 0) + 1;\n}\nreturn Object.entries(counts)\n  .sort((a, b) => b[1] - a[1])\n  .map(([city, count]) => ({ json: { city, count } }));"
    },
    {
     "u": {
      "ar": "تنضيف Leads كاملة",
      "en": "Full lead cleaning"
     },
     "p": "return $input.all().map(({ json }) => ({\n  json: {\n    name:  (json.name || \"\").trim().replace(/\\s+/g, \" \"),\n    email: (json.email || \"\").trim().toLowerCase(),\n    phone: String(json.phone || \"\").replace(/\\D/g, \"\").replace(/^20/, \"0\"),\n    valid: /^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$/i.test(json.email || \"\")\n  }\n}));"
    },
    {
     "u": {
      "ar": "إجمالي وتقرير في item واحد",
      "en": "A total and a report in one item"
     },
     "p": "const items = $input.all();\nconst total = items.reduce((s, i) => s + Number(i.json.amount || 0), 0);\nconst top = [...items].sort((a, b) => b.json.amount - a.json.amount)[0];\nreturn [{ json: { count: items.length, total, topCustomer: top?.json.name } }];"
    },
    {
     "u": {
      "ar": "تواريخ Luxon مفيدة",
      "en": "Useful Luxon dates"
     },
     "p": "{{ $now.minus({ hours: 24 }).toISO() }}\n{{ $today.endOf(\"month\").toFormat(\"dd/MM/yyyy\") }}\n{{ $now.setZone(\"Africa/Cairo\").toFormat(\"cccc HH:mm\") }}\n{{ $json.created_at.toDateTime() < $now.minus({ days: 7 }) }}"
    }
   ],
   "words": [
    {
     "t": "Remove Duplicates",
     "m": {
      "ar": "إزالة التكرار",
      "en": "Removes duplicates"
     },
     "ex": "Compare: Selected Fields → email"
    },
    {
     "t": "Aggregate",
     "m": {
      "ar": "تجميع عدة items في item واحد",
      "en": "Combines several items into one"
     },
     "ex": "10 items → 1 item { names: [...] }"
    },
    {
     "t": "Code node",
     "m": {
      "ar": "نود بتكتب فيها JavaScript",
      "en": "A node where you write JavaScript"
     },
     "ex": "return $input.all().filter(i => i.json.ok);"
    },
    {
     "t": "Split Out",
     "m": {
      "ar": "بيفتح array لـ items منفصلة",
      "en": "Turns an array into separate items"
     },
     "ex": "Field to Split Out: tags"
    },
    {
     "t": "Date & Time",
     "m": {
      "ar": "نود للتعامل مع التواريخ",
      "en": "A node for working with dates"
     },
     "ex": "Add to Date: 7 days"
    },
    {
     "t": "Summarize",
     "m": {
      "ar": "مجموع وعدد ومتوسط مع Group By",
      "en": "Sum, count and average with Group By"
     },
     "ex": "Sum amount · Group by city"
    },
    {
     "t": "map / filter / reduce",
     "m": {
      "ar": "تحويل / تصفية / تجميع مصفوفة",
      "en": "Transform / filter / combine an array"
     },
     "ex": "arr.map(x => x * 2)"
    },
    {
     "t": "spread",
     "m": {
      "ar": "نسخ ودمج بـ ...",
      "en": "Copy and merge with ..."
     },
     "ex": "{ ...$json, status: \"new\" }"
    },
    {
     "t": "optional chaining",
     "m": {
      "ar": "قراءة آمنة: a?.b?.c",
      "en": "Safe access: a?.b?.c"
     },
     "ex": "$json.user?.address?.city"
    },
    {
     "t": "regex",
     "m": {
      "ar": "التعبير النمطي — نمط للبحث في نص",
      "en": "A pattern for searching text"
     },
     "ex": "/01[0125]\\d{8}/"
    },
    {
     "t": "Run Once for All Items",
     "m": {
      "ar": "وضع Code بيشتغل مرة على كل الـ items",
      "en": "A Code mode that runs once over all items"
     },
     "ex": "const items = $input.all();"
    },
    {
     "t": "Run Once for Each Item",
     "m": {
      "ar": "وضع Code بيشتغل لكل item لوحده",
      "en": "A Code mode that runs for each item separately"
     },
     "ex": "return { json: { ...$json, ok: true } };"
    },
    {
     "t": "Luxon",
     "m": {
      "ar": "مكتبة التواريخ جوه n8n",
      "en": "The date library inside n8n"
     },
     "ex": "$now.plus({ days: 1 }).toFormat(\"dd/MM\")"
    },
    {
     "t": "ISO 8601",
     "m": {
      "ar": "الشكل القياسي للتاريخ والوقت",
      "en": "The standard date and time format"
     },
     "ex": "2026-09-23T14:30:00+03:00"
    },
    {
     "t": "data transformation functions",
     "m": {
      "ar": "دوال n8n الجاهزة على النصوص والمصفوفات",
      "en": "n8n's built-in functions for strings and arrays"
     },
     "ex": ".toTitleCase() · .sum() · .isEmail()"
    },
    {
     "t": "normalize",
     "m": {
      "ar": "توحيد شكل البيانات قبل المقارنة أو الحفظ",
      "en": "Making data consistent before comparing or saving it"
     },
     "ex": "\" Ali@X.com \" → \"ali@x.com\""
    },
    {
     "t": "type casting",
     "m": {
      "ar": "تحويل نوع لنوع (نص لرقم مثلاً)",
      "en": "Converting one type to another (text to number, for example)"
     },
     "ex": "Number(\"150\") · String(20)"
    },
    {
     "t": "null / undefined",
     "m": {
      "ar": "مفيش قيمة / الحقل مش موجود أصلاً",
      "en": "No value / the field doesn't exist at all"
     },
     "ex": "$json.phone ?? \"N/A\""
    }
   ],
   "read": [
    {
     "t": "n8n Docs: Expressions",
     "url": "https://docs.n8n.io/code/expressions/",
     "what": {
      "ar": "Expressions ← وبعدين صفحة Built-in methods and variables.",
      "en": "Expressions → then the Built-in methods and variables page."
     }
    },
    {
     "t": "n8n Course: Level 2",
     "url": "https://docs.n8n.io/courses/level-two/",
     "what": {
      "ar": "Understanding data structures و Processing different data types في اليوم 4، وError handling في اليوم 5.",
      "en": "Understanding data structures and Processing different data types on day 4, and Error handling on day 5."
     }
    },
    {
     "t": "n8n Docs: Code node",
     "url": "https://docs.n8n.io/code/code-node/",
     "what": {
      "ar": "الصفحة كلها + Code node cookbook.",
      "en": "The whole page + the Code node cookbook."
     }
    },
    {
     "t": "n8n Docs: Data transformation functions",
     "url": "https://docs.n8n.io/code/builtin/data-transformation-functions/",
     "what": {
      "ar": "Strings و Arrays الأول، والباقي مرجع.",
      "en": "Strings and Arrays first; the rest is reference."
     }
    },
    {
     "t": "n8n Docs: Luxon (التواريخ)",
     "url": "https://docs.n8n.io/code/cookbook/luxon/",
     "what": {
      "ar": "الصفحة كلها، وجرّب كل مثال في Edit Fields.",
      "en": "The whole page, and try every example in Edit Fields."
     }
    },
    {
     "t": "n8n Docs: Built-in methods and variables",
     "url": "https://docs.n8n.io/code/builtin/overview/",
     "what": {
      "ar": "Current node input و Output of other nodes و Date and time.",
      "en": "Current node input, Output of other nodes, and Date and time."
     }
    },
    {
     "t": "Eloquent JavaScript",
     "url": "https://eloquentjavascript.net/",
     "what": {
      "ar": "الفصول 1–5: القيم، والدوال، وData Structures، وHigher-order functions (map/filter/reduce).",
      "en": "Chapters 1–5: values, functions, data structures and higher-order functions (map/filter/reduce)."
     }
    },
    {
     "t": "The Modern JavaScript Tutorial",
     "url": "https://javascript.info/",
     "what": {
      "ar": "Part 1: الفصول 2 و4 و5 (Fundamentals، Objects، Data types). وابدأ بصفحة Array methods.",
      "en": "Part 1: chapters 2, 4 and 5 (Fundamentals, Objects, Data types). Start with the Array methods page."
     }
    },
    {
     "t": "javascript.info: Array methods",
     "url": "https://javascript.info/array-methods",
     "what": {
      "ar": "الصفحة كلها + التمارين في الآخر.",
      "en": "The whole page + the exercises at the end."
     }
    },
    {
     "t": "MDN JavaScript Reference",
     "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
     "what": {
      "ar": "Standard built-in objects ← Array و String.",
      "en": "Standard built-in objects → Array and String."
     }
    },
    {
     "t": "Luxon Docs",
     "url": "https://moment.github.io/luxon/",
     "what": {
      "ar": "A quick tour و Formatting.",
      "en": "A quick tour and Formatting."
     }
    },
    {
     "t": "RegexOne",
     "url": "https://regexone.com/",
     "what": {
      "ar": "الدروس 1–10 (ساعة واحدة).",
      "en": "Lessons 1–10 (one hour)."
     }
    },
    {
     "t": "regex101",
     "url": "https://regex101.com/",
     "what": {
      "ar": "اختار Flavor = ECMAScript (JavaScript) عشان يطابق n8n.",
      "en": "Choose Flavor = ECMAScript (JavaScript) so it matches n8n."
     }
    },
    {
     "t": "MDN: Regular expressions",
     "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
     "what": {
      "ar": "Writing a regular expression pattern و Using regular expressions.",
      "en": "Writing a regular expression pattern and Using regular expressions."
     }
    },
    {
     "t": "موسوعة حسوب: JavaScript",
     "url": "https://wiki.hsoub.com/JavaScript",
     "what": {
      "ar": "Array و String ← map وfilter وreduce.",
      "en": "Array and String → map, filter and reduce."
     }
    }
   ],
   "challenge": {
    "ar": "شيت فيه 20 طلب بيانات وسخة (أسماء بمسافات، إيميلات بحروف كبيرة، تليفونات بأشكال مختلفة، مبالغ نصية). ابني: Get Rows ← Code للتنضيف ← IF (valid) ← Summarize (Sum حسب المدينة) ← رسالة تقرير. والصفوف الغلط تروح شيت `Rejected`.",
    "en": "A sheet with 20 messy orders (names with extra spaces, capitalized emails, phones in different formats, amounts as text). Build: Get Rows → Code to clean → IF (valid) → Summarize (Sum by city) → a report message. Invalid rows go to a `Rejected` sheet."
   },
   "quiz": [
    {
     "q": {
      "ar": "في وضع Run Once for All Items، الكود لازم يرجّع إيه؟",
      "en": "In Run Once for All Items mode, what must the code return?"
     },
     "o": [
      {
       "ar": "نص",
       "en": "A string"
      },
      {
       "ar": "object واحد",
       "en": "A single object"
      },
      {
       "ar": "array من { json: {...} }",
       "en": "An array of { json: {...} }"
      },
      {
       "ar": "ولا حاجة",
       "en": "Nothing"
      }
     ],
     "a": 2,
     "why": {
      "ar": "n8n مستني قايمة items، وكل item جواه json.",
      "en": "n8n expects a list of items, each with json inside."
     }
    },
    {
     "q": {
      "ar": "عايز تحوّل 10 items لـ item واحد فيه قايمة الأسماء. أنهي نود؟",
      "en": "You want to turn 10 items into one item holding the list of names. Which node?"
     },
     "o": [
      "Split Out",
      "Aggregate",
      "Merge",
      "Filter"
     ],
     "a": 1,
     "why": {
      "ar": "Aggregate بيجمّع، وSplit Out بيعمل العكس.",
      "en": "Aggregate gathers; Split Out does the opposite."
     }
    },
    {
     "q": {
      "ar": "`[1,2,3].reduce((s, x) => s + x, 0)` بترجع كام؟",
      "en": "What does `[1,2,3].reduce((s, x) => s + x, 0)` return?"
     },
     "o": [
      "[1,2,3]",
      "6",
      "0",
      "123"
     ],
     "a": 1,
     "why": {
      "ar": "reduce بتجمّع العناصر لقيمة واحدة، والقيمة الابتدائية هنا 0.",
      "en": "reduce combines the elements into one value, and the starting value here is 0."
     }
    }
   ]
  },
  {
   "d": 5,
   "title": {
    "ar": "التحكم والموثوقية: Loops وSub-workflows والأخطاء",
    "en": "Control and reliability: loops, sub-workflows and errors"
   },
   "goal": {
    "ar": "تبني Workflow مبيقعش: بيحترم حدود الـ APIs، وبيتقسم لأجزاء بتتعاد، وبيبلّغك لما حاجة تفشل.",
    "en": "Build workflows that don't break: they respect API limits, split into reusable parts, and alert you when something fails."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "إمتى تحتاج Loop Over Items؟",
      "en": "When do you need Loop Over Items?"
     },
     "p": {
      "ar": "n8n بيلف لوحده على الـ items، فالـ Loop الصريح محتاجه بس للدفعات (Batch) عشان حدود الطلبات، أو لما نود مبتدعمش items كتير، أو لما تحتاج Wait بين كل دفعة.",
      "en": "n8n loops over items on its own, so you only need an explicit loop for batches because of rate limits, when a node doesn't support many items, or when you need a Wait between batches."
     },
     "ex": "Loop Over Items (Batch Size: 10)\n  └─ loop → HTTP Request → Wait 1s → (يرجع للـ Loop)\n  └─ done → تقرير نهائي"
    },
    {
     "h": "Sub-workflows",
     "p": {
      "ar": "Workflow صغير بيبدأ بـ Execute Workflow Trigger (When Executed by Another Workflow)، وبتناديه من أي Workflow بنود Execute Workflow. زي الدالة: اكتبها مرة واستخدمها كتير.",
      "en": "A small workflow that starts with Execute Workflow Trigger (When Executed by Another Workflow), which you call from any workflow with the Execute Workflow node. Like a function: write it once, use it many times."
     },
     "ex": "Main: … → Execute Workflow (\"Clean Phone\")\nSub:  Execute Workflow Trigger → Code → (آخر نود = الرد)"
    },
    {
     "h": {
      "ar": "إعدادات النود اللي بتنقذك",
      "en": "Node settings that save you"
     },
     "p": {
      "ar": "Retry On Fail (عدد المحاولات والانتظار)، وOn Error (Stop / Continue / Continue using error output)، وAlways Output Data، وExecute Once.",
      "en": "Retry On Fail (number of tries and wait), On Error (Stop / Continue / Continue using error output), Always Output Data, and Execute Once."
     },
     "ex": "HTTP Request → Settings\n  Retry On Fail: ✓  Max Tries: 3  Wait: 2000ms\n  On Error: Continue (using error output)"
    },
    {
     "h": "Error Workflow",
     "p": {
      "ar": "Workflow بيبدأ بـ Error Trigger، وبتختاره من Settings بتاع أي Workflow تاني. لما أي تشغيلة تفشل بيتنفذ ويبعتلك التفاصيل.",
      "en": "A workflow that starts with Error Trigger, which you select in any other workflow's Settings. Whenever a run fails it executes and sends you the details."
     },
     "ex": "{{ $json.workflow.name }}\n{{ $json.execution.error.message }}\n{{ $json.execution.url }}"
    },
    {
     "h": {
      "ar": "Validation قبل ما تكمّل",
      "en": "Validate before you continue"
     },
     "p": {
      "ar": "اتأكد من البيانات قبل ما تكتب في شيت أو تبعت لعميل. لو غلط: Stop and Error برسالة واضحة، أو مسار «مرفوض».",
      "en": "Check the data before writing to a sheet or sending to a client. If it's wrong: Stop and Error with a clear message, or a “rejected” path."
     },
     "ex": "IF: {{ $json.email.isEmail() && $json.name.trim() !== \"\" }}\n  false → Stop and Error: \"Invalid lead: missing email\""
    },
    {
     "h": {
      "ar": "سجل التشغيلات (Executions)",
      "en": "The executions log"
     },
     "p": {
      "ar": "كل تشغيلة ليها سجل فيه بيانات كل نود. من تشغيلة فاشلة اضغط Debug in editor (أو Copy to editor) عشان البيانات بتاعتها تتحمّل في الـ Editor وتصلّح عليها.",
      "en": "Every run has a log with each node's data. From a failed run click Debug in editor (or Copy to editor) to load its data into the editor and fix things against it."
     },
     "ex": "Executions → فاشلة → Debug in editor → صلّح → شغّل تاني"
    }
   ],
   "practice": [
    {
     "ar": "Code يطلّع 25 item ← Loop Over Items (Batch 5) ← HTTP Request ← Wait ثانية ← وشوف مسار done",
     "en": "Code outputs 25 items → Loop Over Items (batch 5) → HTTP Request → Wait 1 second → watch the done path"
    },
    {
     "ar": "اعمل Sub-workflow `Clean Phone` بيستقبل `phone` ويرجّعه منضّف، وناديه من Workflow تاني",
     "en": "Build a `Clean Phone` sub-workflow that receives `phone` and returns it cleaned, and call it from another workflow"
    },
    {
     "ar": "على HTTP Request برابط غلط: فعّل Retry On Fail (3 محاولات) وشوف الـ Execution",
     "en": "On an HTTP Request with a wrong URL: enable Retry On Fail (3 tries) and look at the execution"
    },
    {
     "ar": "غيّر On Error لـ Continue (using error output) ووجّه مسار الخطأ لشيت `Failures`",
     "en": "Change On Error to Continue (using error output) and send the error path to a `Failures` sheet"
    },
    {
     "ar": "اعمل Workflow `Error Alert` بـ Error Trigger ← Telegram، واربطه من Settings بـ Workflow بيفشل عمدًا",
     "en": "Build an `Error Alert` workflow with Error Trigger → Telegram, and link it in the Settings of a workflow that fails on purpose"
    },
    {
     "ar": "IF للتحقق من الإيميل ← Stop and Error برسالة إنجليزي واضحة",
     "en": "IF to validate the email → Stop and Error with a clear English message"
    },
    {
     "ar": "افتح تشغيلة فاشلة واستخدم Debug in editor",
     "en": "Open a failed run and use Debug in editor"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "رسالة Error Alert على Telegram",
      "en": "An Error Alert message on Telegram"
     },
     "p": "<b>⚠️ Workflow failed</b>\nName: {{ $json.workflow.name }}\nNode: {{ $json.execution.lastNodeExecuted }}\nError: {{ $json.execution.error.message }}\nLink: {{ $json.execution.url }}"
    },
    {
     "u": {
      "ar": "Validation في Code node",
      "en": "Validation in a Code node"
     },
     "p": "for (const item of $input.all()) {\n  const { email, name } = item.json;\n  if (!name?.trim()) throw new Error(`Missing name in row ${item.json.row_number}`);\n  if (!/^[^@\\s]+@[^@\\s]+\\.\\w+$/.test(email || \"\")) {\n    throw new Error(`Invalid email: ${email}`);\n  }\n}\nreturn $input.all();"
    },
    {
     "u": {
      "ar": "Retry يدوي بسيط في Code (لـ fetch خارجي)",
      "en": "A simple manual retry in Code (for an external fetch)"
     },
     "p": "// غالبًا Retry On Fail في إعدادات النود كفاية\nconst res = await this.helpers.httpRequest({\n  method: \"GET\",\n  url: \"https://jsonplaceholder.typicode.com/users/1\",\n  json: true\n});\nreturn [{ json: res }];"
    },
    {
     "u": {
      "ar": "Sub-workflow: آخر نود هو الرد",
      "en": "Sub-workflow: the last node is the response"
     },
     "p": "// في الـ Sub-workflow (Execute Workflow Trigger → Code):\nreturn $input.all().map(i => ({\n  json: { phone: String(i.json.phone).replace(/\\D/g, \"\") }\n}));\n\n// في الـ Main: {{ $json.phone }} بعد نود Execute Workflow"
    }
   ],
   "words": [
    {
     "t": "Error Trigger",
     "m": {
      "ar": "بيشتغل لما Workflow تاني يفشل",
      "en": "Fires when another workflow fails"
     },
     "ex": "{{ $json.execution.error.message }}"
    },
    {
     "t": "Loop Over Items",
     "m": {
      "ar": "المرور على الـ items على دفعات",
      "en": "Goes through items in batches"
     },
     "ex": "Batch Size: 10 → loop / done"
    },
    {
     "t": "Wait",
     "m": {
      "ar": "إيقاف مؤقت في نص الـ Workflow",
      "en": "Pauses in the middle of a workflow"
     },
     "ex": "Resume: After Time Interval · 2 seconds"
    },
    {
     "t": "Execute Workflow",
     "m": {
      "ar": "بينادي على Workflow تاني",
      "en": "Calls another workflow"
     },
     "ex": "Workflow: \"Clean Phone\" (sub-workflow)"
    },
    {
     "t": "rate limit",
     "m": {
      "ar": "حد أقصى لعدد الطلبات",
      "en": "A maximum number of requests"
     },
     "ex": "60 requests / minute"
    },
    {
     "t": "pagination",
     "m": {
      "ar": "تقسيم النتائج على صفحات",
      "en": "Splitting results across pages"
     },
     "ex": "?page=1 → ?page=2 → … empty"
    },
    {
     "t": "Retry On Fail",
     "m": {
      "ar": "إعادة المحاولة تلقائيًا",
      "en": "Retry automatically"
     },
     "ex": "Max Tries: 3 · Wait: 2000ms"
    },
    {
     "t": "On Error",
     "m": {
      "ar": "إعداد بيحدد إيه يحصل لو النود فشلت",
      "en": "A setting that decides what happens if the node fails"
     },
     "ex": "Continue (using error output)"
    },
    {
     "t": "Error Workflow",
     "m": {
      "ar": "Workflow بيتنفذ لما تاني يفشل",
      "en": "A workflow that runs when another one fails"
     },
     "ex": "Settings → Error Workflow: \"Error Alert\""
    },
    {
     "t": "Stop and Error",
     "m": {
      "ar": "إيقاف متعمّد برسالة خطأ",
      "en": "A deliberate stop with an error message"
     },
     "ex": "Error Message: \"Invalid email\""
    },
    {
     "t": "Executions log",
     "m": {
      "ar": "سجل التشغيلات ونتايجها",
      "en": "The log of runs and their results"
     },
     "ex": "Executions → Filter: Error"
    },
    {
     "t": "batch",
     "m": {
      "ar": "دفعة: مجموعة items بتتعالج مع بعض",
      "en": "A group of items processed together"
     },
     "ex": "Batch Size: 10"
    },
    {
     "t": "sub-workflow",
     "m": {
      "ar": "Workflow بيتنادى من Workflow تاني زي الدالة",
      "en": "A workflow called from another workflow, like a function"
     },
     "ex": "Execute Workflow Trigger → … → رد"
    },
    {
     "t": "error output",
     "m": {
      "ar": "مسار منفصل للـ items اللي فشلت",
      "en": "A separate path for items that failed"
     },
     "ex": "On Error: Continue (using error output)"
    },
    {
     "t": "validation",
     "m": {
      "ar": "التحقق من صحة البيانات قبل استخدامها",
      "en": "Checking data is valid before using it"
     },
     "ex": "{{ $json.email.isEmail() }}"
    },
    {
     "t": "idempotent",
     "m": {
      "ar": "تشغيله مرتين بيدي نفس النتيجة من غير تكرار",
      "en": "Running it twice gives the same result with no duplicates"
     },
     "ex": "Upsert on email بدل Append"
    },
    {
     "t": "Debug in editor",
     "m": {
      "ar": "تحميل بيانات تشغيلة قديمة في الـ Editor",
      "en": "Loading an old run's data into the editor"
     },
     "ex": "Executions → Debug in editor"
    },
    {
     "t": "Always Output Data",
     "m": {
      "ar": "النود تطلّع item فاضي بدل ما توقف المسار",
      "en": "The node outputs an empty item instead of stopping the path"
     },
     "ex": "Settings → Always Output Data ✓"
    },
    {
     "t": "Execute Once",
     "m": {
      "ar": "النود تشتغل على أول item بس",
      "en": "The node runs on the first item only"
     },
     "ex": "Settings → Execute Once ✓"
    }
   ],
   "read": [
    {
     "t": "n8n Course: Level 2",
     "url": "https://docs.n8n.io/courses/level-two/",
     "what": {
      "ar": "Understanding data structures و Processing different data types في اليوم 4، وError handling في اليوم 5.",
      "en": "Understanding data structures and Processing different data types on day 4, and Error handling on day 5."
     }
    },
    {
     "t": "n8n Docs: Looping",
     "url": "https://docs.n8n.io/flow-logic/looping/",
     "what": {
      "ar": "الصفحة كلها، وخصوصًا Node exceptions.",
      "en": "The whole page, especially Node exceptions."
     }
    },
    {
     "t": "n8n Docs: Error handling",
     "url": "https://docs.n8n.io/flow-logic/error-handling/",
     "what": {
      "ar": "الصفحة كلها.",
      "en": "The whole page."
     }
    },
    {
     "t": "n8n Docs: Sub-workflows",
     "url": "https://docs.n8n.io/flow-logic/subworkflows/",
     "what": {
      "ar": "Create a sub-workflow و Call a sub-workflow.",
      "en": "Create a sub-workflow and Call a sub-workflow."
     }
    },
    {
     "t": "httpbin",
     "url": "https://httpbin.org/",
     "what": {
      "ar": "/anything و /status/500 و /delay/5.",
      "en": "/anything, /status/500 and /delay/5."
     }
    }
   ],
   "challenge": {
    "ar": "خد تحدي اليوم 4 وخليه جاهز للإنتاج: Retry على كل نود خارجية، ومسار خطأ للصفوف الغلط، وError Workflow على Telegram، وتنضيف التليفون في Sub-workflow. وبعدين افصل النت دقيقة وشوف التنبيه بيوصل ولا لأ.",
    "en": "Take day 4's challenge and make it production-ready: Retry on every external node, an error path for bad rows, an Error Workflow on Telegram, and phone cleaning in a sub-workflow. Then disconnect the internet for a minute and see whether the alert arrives."
   },
   "quiz": [
    {
     "q": {
      "ar": "إمتى فعلاً محتاج Loop Over Items؟",
      "en": "When do you really need Loop Over Items?"
     },
     "o": [
      {
       "ar": "دايمًا مع أي items",
       "en": "Always, with any items"
      },
      {
       "ar": "لما تحتاج دفعات أو Wait بين الطلبات عشان حدود الـ API",
       "en": "When you need batches or a Wait between requests because of API limits"
      },
      {
       "ar": "عمره ما بيتحتاج",
       "en": "Never"
      },
      {
       "ar": "مع IF بس",
       "en": "Only with IF"
      }
     ],
     "a": 1,
     "why": {
      "ar": "n8n بيلف لوحده. الـ Loop الصريح للدفعات والتحكم في السرعة.",
      "en": "n8n loops by itself. The explicit loop is for batching and controlling speed."
     }
    },
    {
     "q": {
      "ar": "Error Trigger بيشتغل إمتى؟",
      "en": "When does the Error Trigger fire?"
     },
     "o": [
      {
       "ar": "كل ساعة",
       "en": "Every hour"
      },
      {
       "ar": "لما Workflow تاني مربوط بيه كـ Error Workflow يفشل",
       "en": "When another workflow that uses it as its Error Workflow fails"
      },
      {
       "ar": "لما تضغط Execute",
       "en": "When you click Execute"
      },
      {
       "ar": "لما الـ API يرد 200",
       "en": "When the API returns 200"
      }
     ],
     "a": 1,
     "why": {
      "ar": "بتربطه من Settings بتاع الـ Workflow الأصلي ← Error Workflow.",
      "en": "You link it from the original workflow's Settings → Error Workflow."
     }
    },
    {
     "q": {
      "ar": "عايز الـ Workflow يكمّل حتى لو نود فشلت ويسجّل الخطأ. تعمل إيه؟",
      "en": "You want the workflow to keep going even if a node fails, and log the error. What do you do?"
     },
     "o": [
      {
       "ar": "تمسح النود",
       "en": "Delete the node"
      },
      {
       "ar": "On Error: Continue (using error output) ووجّه مسار الخطأ",
       "en": "On Error: Continue (using error output) and route the error path"
      },
      {
       "ar": "تستخدم Wait",
       "en": "Use Wait"
      },
      {
       "ar": "تعطّل الـ Workflow",
       "en": "Deactivate the workflow"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Continue using error output بيديلك مسار منفصل للـ items اللي فشلت.",
      "en": "Continue using error output gives you a separate path for the items that failed."
     }
    }
   ]
  },
  {
   "d": 6,
   "title": {
    "ar": "مراجعة الأسبوع والاختبار",
    "en": "Week review and test"
   },
   "goal": {
    "ar": "راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 2 بيفتح لما تجيب 70% أو أكتر.",
    "en": "Review the five days, hand in the weekly project, and take the weekly test. Week 2 opens when you score 70% or more."
   },
   "minutes": 120,
   "review": [
    {
     "ar": "راجع اليوم 1: عقل n8n: الـ Items وJSON والـ Expressions",
     "en": "Review day 1: The n8n mindset: items, JSON and expressions"
    },
    {
     "ar": "راجع اليوم 2: APIs وHTTP والمنطق: IF وSwitch وMerge",
     "en": "Review day 2: APIs, HTTP and logic: IF, Switch and Merge"
    },
    {
     "ar": "راجع اليوم 3: الربط بالخدمات: Sheets وTelegram وGmail والجدولة",
     "en": "Review day 3: Connecting services: Sheets, Telegram, Gmail and scheduling"
    },
    {
     "ar": "راجع اليوم 4: تحويل البيانات: Code node والتواريخ والدوال الجاهزة",
     "en": "Review day 4: Transforming data: the Code node, dates and built-in functions"
    },
    {
     "ar": "راجع اليوم 5: التحكم والموثوقية: Loops وSub-workflows والأخطاء",
     "en": "Review day 5: Control and reliability: loops, sub-workflows and errors"
    }
   ],
   "project": {
    "ar": "ابني Workflow واحد بيجمع الأسبوع كله: Webhook بيستقبل طلب، وHTTP Request بيجيب بيانات من API، وIF بيفرز النتايج، وبيسجّل في Google Sheets، وبيبعت ملخص على Telegram، وليه Error Workflow. صدّره JSON واكتب README قصير بيشرح بيعمل إيه وإزاي تشغّله.",
    "en": "Build one workflow that combines the whole week: a Webhook receives a request, an HTTP Request gets data from an API, an IF sorts the results, it logs to Google Sheets, sends a summary on Telegram, and has an Error Workflow. Export it as JSON and write a short README that explains what it does and how to run it."
   },
   "test": [
    {
     "q": {
      "ar": "رابط الـ Webhook اللي فيه /webhook-test/ بيشتغل إمتى؟",
      "en": "When does the webhook URL containing /webhook-test/ work?"
     },
     "o": [
      {
       "ar": "طول الوقت",
       "en": "All the time"
      },
      {
       "ar": "بعد ما تضغط Execute، ولطلب واحد",
       "en": "After you click Execute, for one request"
      },
      {
       "ar": "لما الـ Workflow يتفعّل بس",
       "en": "Only when the workflow is active"
      },
      {
       "ar": "مبيشتغلش على localhost",
       "en": "It doesn't work on localhost"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Test URL للتجربة: بيستنى طلب واحد بعد Execute. الـ Production URL هو اللي بيشتغل مع التفعيل.",
      "en": "The Test URL is for testing: it waits for one request after Execute. The Production URL is the one that works when the workflow is active."
     }
    },
    {
     "q": {
      "ar": "فايدة Pin Data إيه؟",
      "en": "What is Pin Data for?"
     },
     "o": [
      {
       "ar": "بتحذف البيانات",
       "en": "It deletes the data"
      },
      {
       "ar": "بتثبت Output نود عشان تكمّل بناء من غير ما تعيد تشغيلها",
       "en": "It freezes a node's output so you can keep building without re-running it"
      },
      {
       "ar": "بتشفّر البيانات",
       "en": "It encrypts the data"
      },
      {
       "ar": "بتسرّع الـ Production",
       "en": "It speeds up production"
      }
     ],
     "a": 1,
     "why": {
      "ar": "بتثبت البيانات وقت البناء والتجربة بس، ومبتأثرش على التشغيل الفعلي.",
      "en": "It freezes data only while building and testing, and doesn't affect live runs."
     }
    },
    {
     "q": {
      "ar": "فين المكان الصح للـ API Key؟",
      "en": "Where is the right place for an API key?"
     },
     "o": [
      {
       "ar": "جوه الـ URL",
       "en": "Inside the URL"
      },
      {
       "ar": "في Credential (زي Header Auth)",
       "en": "In a credential (such as Header Auth)"
      },
      {
       "ar": "في Sticky Note",
       "en": "In a Sticky Note"
      },
      {
       "ar": "في اسم النود",
       "en": "In the node name"
      }
     ],
     "a": 1,
     "why": {
      "ar": "الـ Credentials بتتخزن مشفّرة ومبتطلعش لما تصدّر الـ Workflow.",
      "en": "Credentials are stored encrypted and aren't included when you export the workflow."
     }
    },
    {
     "q": {
      "ar": "429 Too Many Requests معناها إيه؟",
      "en": "What does 429 Too Many Requests mean?"
     },
     "o": [
      {
       "ar": "الطلب غلط",
       "en": "The request is wrong"
      },
      {
       "ar": "عدّيت حد الطلبات المسموح",
       "en": "You exceeded the allowed request limit"
      },
      {
       "ar": "البيانات كبيرة",
       "en": "The data is too big"
      },
      {
       "ar": "لازم تسجّل دخول",
       "en": "You need to log in"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Rate limit. الحل: دفعات صغيرة + Wait، أو Retry On Fail.",
      "en": "Rate limit. The fix: small batches + Wait, or Retry On Fail."
     }
    },
    {
     "q": {
      "ar": "منين بتجيب Chat ID بتاع تيليجرام؟",
      "en": "Where do you get a Telegram Chat ID?"
     },
     "o": [
      {
       "ar": "من @BotFather",
       "en": "From @BotFather"
      },
      {
       "ar": "من `message.chat.id` لما تبعت رسالة للبوت وتقراها بالـ Trigger",
       "en": "From `message.chat.id` when you message the bot and read it with the trigger"
      },
      {
       "ar": "من إعدادات الموبايل",
       "en": "From your phone settings"
      },
      {
       "ar": "من الـ Token",
       "en": "From the token"
      }
     ],
     "a": 1,
     "why": {
      "ar": "الـ Token بيعرّف البوت، والـ Chat ID بيعرّف المحادثة، وبتلاقيه في الرسالة الجاية.",
      "en": "The token identifies the bot, the Chat ID identifies the conversation, and you find it in the incoming message."
     }
    },
    {
     "q": {
      "ar": "الوقت في الرسائل بيطلع متأخر ساعتين أو 3. الحل؟",
      "en": "The time in your messages is 2 or 3 hours off. The fix?"
     },
     "o": [
      {
       "ar": "تغيّر الساعة في الجهاز",
       "en": "Change your computer's clock"
      },
      {
       "ar": "تضبط Timezone في Workflow Settings أو تستخدم setZone",
       "en": "Set the timezone in Workflow Settings or use setZone"
      },
      {
       "ar": "تستخدم Wait",
       "en": "Use Wait"
      },
      {
       "ar": "متعملش حاجة",
       "en": "Do nothing"
      }
     ],
     "a": 1,
     "why": {
      "ar": "n8n ممكن يكون شغال بـ UTC. اضبط Timezone أو استخدم `$now.setZone(\"Africa/Cairo\")`.",
      "en": "n8n may be running in UTC. Set the timezone or use `$now.setZone(\"Africa/Cairo\")`."
     }
    },
    {
     "q": {
      "ar": "إزاي تجيب تاريخ بعد 3 أيام؟",
      "en": "How do you get the date 3 days from now?"
     },
     "o": [
      "{{ $now + 3 }}",
      "{{ $now.plus({ days: 3 }) }}",
      "{{ $now.days(3) }}",
      "{{ Date(3) }}"
     ],
     "a": 1,
     "why": {
      "ar": "$now كائن Luxon DateTime، وplus بتاخد object فيه الوحدة.",
      "en": "$now is a Luxon DateTime, and plus takes an object with the unit."
     }
    },
    {
     "q": {
      "ar": "`\"+20 100-123\".replace(/\\D/g, \"\")` بترجع؟",
      "en": "What does `\"+20 100-123\".replace(/\\D/g, \"\")` return?"
     },
     "o": [
      "\"+20 100-123\"",
      "\"20100123\"",
      "\"100123\"",
      {
       "ar": "خطأ",
       "en": "An error"
      }
     ],
     "a": 1,
     "why": {
      "ar": "\\D = أي حاجة مش رقم، وg = كل التطابقات، فبتتشال كلها.",
      "en": "\\D = anything that isn't a digit, and g = every match, so they're all removed."
     }
    },
    {
     "q": {
      "ar": "الـ Sub-workflow بيرجّع إيه للـ Workflow الرئيسي؟",
      "en": "What does a sub-workflow return to the main workflow?"
     },
     "o": [
      {
       "ar": "ولا حاجة",
       "en": "Nothing"
      },
      {
       "ar": "Output آخر نود اتنفذت فيه",
       "en": "The output of the last node that ran in it"
      },
      {
       "ar": "أول نود بس",
       "en": "Only the first node"
      },
      {
       "ar": "رسالة Telegram",
       "en": "A Telegram message"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Output آخر نود في الـ Sub-workflow بيبقى Output نود Execute Workflow.",
      "en": "The output of the last node in the sub-workflow becomes the output of the Execute Workflow node."
     }
    },
    {
     "q": {
      "ar": "Debug in editor بيعمل إيه؟",
      "en": "What does Debug in editor do?"
     },
     "o": [
      {
       "ar": "بيمسح التشغيلة",
       "en": "Deletes the run"
      },
      {
       "ar": "بيحمّل بيانات تشغيلة قديمة في الـ Editor عشان تصلّح عليها",
       "en": "Loads an old run's data into the editor so you can fix things against it"
      },
      {
       "ar": "بيفعّل الـ Workflow",
       "en": "Activates the workflow"
      },
      {
       "ar": "بيبعت تقرير",
       "en": "Sends a report"
      }
     ],
     "a": 1,
     "why": {
      "ar": "بيجيب بيانات التشغيلة الفاشلة (كأنها Pinned) عشان تجرّب الحل على نفس البيانات.",
      "en": "It brings in the failed run's data (as if pinned) so you can test the fix on the same data."
     }
    }
   ]
  }
 ]
});
