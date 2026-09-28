// n8n week 4 — Expressions in depth and the month project (end of month 1).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الـ Expressions بعمق ومشروع الشهر', 'Expressions in depth and the month project'),
  goal: B('تكتب أي Expression بثقة: نصوص وشروط، وقراءة من أي node، وتواريخ بـ Luxon، ودوال n8n الجاهزة، وتصلّح أخطاء الـ expressions، وتسلّم مشروع الشهر الأول.',
          'Write any expression with confidence — strings and conditions, reading from any node, Luxon dates, n8n\'s built-in functions — fix expression errors, and deliver the first month\'s project.'),
  days: [
    { title: B('النصوص والشروط', 'Strings and conditions'),
      goal: B('تستخدم JavaScript جوه {{ }} للنصوص والشروط والحسابات.', 'Use JavaScript inside {{ }} for strings, conditions and calculations.'),
      learn: [
        { h: B('الـ Expression = JavaScript سطر واحد', 'An expression is one line of JavaScript'),
          p: B('جوه {{ }} تقدر تكتب أي expression في JavaScript: حسابات، ودوال نصوص، وشرط بـ ? :. مينفعش تكتب if أو for جوه {{ }}؛ ده مكانه Code node.', 'Inside {{ }} you can write any JavaScript expression: maths, string methods, and a condition with ? :. You can\'t write if or for statements inside {{ }}; that belongs in a Code node.'),
          ex: '{{ $json.price * 1.14 }}\n{{ $json.name.trim().toUpperCase() }}\n{{ $json.total > 1000 ? "VIP" : "regular" }}' },
        { h: B('النصوص', 'Strings'),
          p: B('`.trim()` يشيل المسافات، `.toLowerCase()`، `.includes("x")`، `.split(",")`، `.replace("a","b")`، `.slice(0, 50)` أول 50 حرف. وتقدر تجمع نص بـ template literal: `Hi ${name}`.', '`.trim()` removes spaces, `.toLowerCase()`, `.includes("x")`, `.split(",")`, `.replace("a","b")`, `.slice(0, 50)` the first 50 characters. Build text with a template literal: `Hi ${name}`.'),
          ex: '{{ `Order #${$json.id} — ${$json.items.length} items` }}\n{{ $json.note.slice(0, 100) }}' },
        { h: B('الـ expression editor', 'The expression editor'),
          p: B('افتح المحرر الكبير (Expression) وشوف النتيجة تحت على طول. الأخضر يعني تمام، والأحمر فيه غلط، ولو النتيجة [undefined] يبقى الحقل مش موجود.', 'Open the full expression editor and watch the result below as you type. Green means fine, red means an error, and [undefined] means the field doesn\'t exist.'),
          ex: 'Result: "Order #1042 — 3 items"' }
      ],
      practice: [
        B('اكتب 5 expressions بتنضّف نص (مسافات، حروف، أول 50 حرف).', 'Write 5 expressions that clean text (spaces, case, first 50 characters).'),
        B('اكتب 3 شروط بـ ? : (VIP/عادي، متأخر/في الميعاد، فاضي/مليان).', 'Write 3 conditions with ? : (VIP/regular, late/on time, empty/filled).'),
        B('اعمل رسالة Telegram كاملة بـ template literal فيها 4 حقول.', 'Build a full Telegram message with a template literal using 4 fields.'),
        B('اكتب expression بيحسب الضريبة والإجمالي ويقرّب لرقمين عشريين.', 'Write an expression that calculates tax and total and rounds to two decimals.')
      ],
      words: ['template literal',
        { t: 'ternary operator', m: B('شرط في سطر: شرط ? لو صح : لو غلط', 'a one-line condition: condition ? if true : if false'), ex: '{{ $json.paid ? "✅" : "⏳" }}' },
        { t: 'string method', m: B('دالة بتشتغل على نص: trim وreplace وsplit…', 'a function that works on text: trim, replace, split…'), ex: '$json.email.trim().toLowerCase()' },
        { t: 'expression editor', m: B('المحرر اللي بتكتب فيه الـ expression وتشوف نتيجته', 'the editor where you write an expression and see its result'), ex: 'Open it with the expand icon.' },
        { t: 'toFixed()', m: B('يقرّب رقم لعدد خانات عشرية ويرجّعه نص', 'rounds a number to a number of decimals and returns text'), ex: '{{ ($json.total * 1.14).toFixed(2) }}' }],
      read: ['lib:n8n Docs: Expressions', { lib: 'javascript.info: Array methods', what: B('اقرا جزء الـ strings المرتبط (أو Strings في نفس الموقع).', 'Read the related strings part (or the Strings chapter on the same site).') }],
      challenge: B('اعمل «message builder»: Edit Fields بيبني 3 رسايل مختلفة (عميل، مدير، أرشيف) من نفس البيانات بـ expressions بس.', 'Build a "message builder": an Edit Fields node that creates 3 different messages (customer, manager, archive) from the same data using only expressions.'),
      quiz: [
        { q: B('ينفع تكتب for loop جوه {{ }}؟', 'Can you write a for loop inside {{ }}?'), o: [B('لأ، ده في Code node', 'No, use a Code node'), B('أيوه', 'Yes'), B('أيوه لو قصير', 'Yes, if short')], a: 0, why: B('الـ expression سطر واحد بيرجّع قيمة.', 'An expression is one line that returns a value.') },
        { q: B('`{{ $json.total > 100 ? "big" : "small" }}` لو total = 50:', '`{{ $json.total > 100 ? "big" : "small" }}` when total = 50:'), o: ['"small"', '"big"', 'undefined'], a: 0, why: B('الشرط غلط فبياخد التاني.', 'The condition is false, so it takes the second.') },
        { q: B('النتيجة [undefined] في المحرر غالبًا معناها:', 'An [undefined] result in the editor usually means:'), o: [B('الحقل مش موجود أو اسمه غلط', 'the field doesn\'t exist or is misspelled'), B('n8n واقع', 'n8n is down'), B('كله تمام', 'all fine')], a: 0, why: B('راجع اسم الحقل.', 'Check the field name.') }
      ] },

    { title: B('القراءة من أي node', 'Reading from any node'),
      goal: B('تقرا بيانات من node مش قبلك مباشرة، وتفهم item وfirst وall، ومعلومات التنفيذ.', 'Read data from a node that isn\'t directly before you, understand item, first and all, and use execution information.'),
      learn: [
        { h: B('$("Node")', '$("Node")'),
          p: B('`$("Get order").item.json.id` = الـ item المرتبط بالحالي. `.first()` = أول item. `.last()` = آخر واحد. `.all()` = كلهم (array). اسم الـ node لازم مظبوط بالحرف.', '`$("Get order").item.json.id` = the item linked to the current one. `.first()` = the first item. `.last()` = the last one. `.all()` = all of them (an array). The node name must match exactly.'),
          ex: '{{ $("Webhook").item.json.body.email }}\n{{ $("Get settings").first().json.currency }}\n{{ $("Get orders").all().length }}' },
        { h: B('item ولا first', 'item or first'),
          p: B('`.item` بيمشي مع كل item (paired item). `.first()` بيجيب نفس القيمة لكل الـ items، مفيد لإعدادات عامة. لو .item مش شغال، غالبًا الربط اتقطع بسبب Code node أو Merge.', '`.item` follows each item (paired item). `.first()` gives the same value to every item, useful for global settings. If .item fails, the link was probably broken by a Code node or Merge.'),
          ex: 'Settings (1 item) + Orders (20 items): use $("Settings").first() inside the orders branch.' },
        { h: B('معلومات التنفيذ', 'Execution information'),
          p: B('`$execution.id` رقم التشغيل، `$workflow.name` اسم الـ workflow، `$prevNode.name` اسم الـ node اللي قبلك، و`$now` الوقت. مفيدة في الـ logs والتنبيهات.', '`$execution.id` the run ID, `$workflow.name` the workflow name, `$prevNode.name` the previous node, and `$now` the time. Useful in logs and alerts.'),
          ex: '{{ `${$workflow.name} failed in execution ${$execution.id}` }}' }
      ],
      practice: [
        B('اعمل workflow فيه Webhook ← HTTP Request ← Edit Fields، واقرا في آخر node حقل من الـ Webhook.', 'Build Webhook → HTTP Request → Edit Fields, and read a Webhook field in the last node.'),
        B('اعمل node «Settings» فيها item واحد، واقرا منها في فرع فيه 10 items بـ .first().', 'Create a "Settings" node with one item and read from it in a branch of 10 items with .first().'),
        B('اعرض عدد الـ items في node تانية بـ .all().length.', 'Show the number of items of another node with .all().length.'),
        B('ضيف سطر log فيه $workflow.name و$execution.id و$now.', 'Add a log line with $workflow.name, $execution.id and $now.')
      ],
      words: [
        { t: '$prevNode.name', m: B('اسم الـ node اللي قبلك مباشرة', 'the name of the node right before this one'), ex: '{{ $prevNode.name }}' },
        { t: '$("Node").first()', m: B('أول item من node معينة', 'the first item of a given node'), ex: '$("Settings").first().json.currency' },
        { t: '.all()', m: B('كل الـ items من node كـ array', 'all items of a node, as an array'), ex: '$("Get orders").all().length' },
        { t: '$execution.id', m: B('رقم التشغيل الحالي', 'the ID of the current run'), ex: 'Include it in error alerts.' },
        { t: '$workflow.name', m: B('اسم الـ workflow الحالي', 'the name of the current workflow'), ex: '{{ $workflow.name }} failed' }],
      read: ['lib:n8n Docs: Built-in methods and variables', 'lib:n8n Docs: Data structure'],
      challenge: B('اعمل workflow «order summary» بياخد إعدادات (عملة، ضريبة) من node واحدة، ويحسب لكل طلب الإجمالي، ويبعت ملخص فيه عدد الطلبات واسم الـ workflow ورقم التنفيذ.', 'Build an "order summary" workflow that takes settings (currency, tax) from one node, calculates each order\'s total, and sends a summary with the order count, the workflow name and the execution ID.'),
      quiz: [
        { q: B('عشان تجيب نفس الإعداد لكل الـ items:', 'To get the same setting for every item:'), o: ['$("Settings").first()', '$("Settings").item', '$json'], a: 0, why: B('first ثابت لكل items.', 'first is the same for every item.') },
        { q: B('`$("Get orders").all()` بيرجّع:', '`$("Get orders").all()` returns:'), o: [B('array بكل الـ items', 'an array of all items'), B('أول item', 'the first item'), B('عدد', 'a number')], a: 0, why: B('.length يديك العدد.', '.length gives the count.') },
        { q: B('.item بطّل يشتغل بعد Code node. السبب غالبًا:', '.item stopped working after a Code node. Usually because:'), o: [B('الربط بين الـ items اتقطع', 'the link between items was broken'), B('n8n قديم', 'n8n is old'), B('النت', 'the internet')], a: 0, why: B('paired item.', 'paired items.') }
      ] },

    { title: B('التواريخ بـ Luxon', 'Dates with Luxon'),
      goal: B('تحسب وتنسّق وتقارن التواريخ بـ Luxon جوه الـ expressions.', 'Calculate, format and compare dates with Luxon inside expressions.'),
      learn: [
        { h: B('حساب التواريخ', 'Date maths'),
          p: B('`$now.plus({ days: 7 })` بعد أسبوع، `.minus({ hours: 2 })`، `.startOf("month")` أول الشهر، `.endOf("day")` آخر اليوم. وتحويل نص لتاريخ: `$json.due.toDateTime()`.', '`$now.plus({ days: 7 })` a week later, `.minus({ hours: 2 })`, `.startOf("month")` the start of the month, `.endOf("day")` the end of the day. Turn text into a date: `$json.due.toDateTime()`.'),
          ex: '{{ $today.minus({ days: 1 }).toISODate() }}   // yesterday\n{{ $now.startOf("week").toISO() }}' },
        { h: B('التنسيق', 'Formatting'),
          p: B('`.toFormat("yyyy-MM-dd")`، `"dd/MM/yyyy HH:mm"`، `"cccc"` اسم اليوم، `"LLL"` اسم الشهر المختصر. و`.setZone("Africa/Cairo")` لتوقيت معيّن.', '`.toFormat("yyyy-MM-dd")`, `"dd/MM/yyyy HH:mm"`, `"cccc"` the weekday name, `"LLL"` the short month name. `.setZone("Africa/Cairo")` for a specific timezone.'),
          ex: '{{ $now.setZone("Africa/Cairo").toFormat("cccc dd LLL, HH:mm") }}' },
        { h: B('الفرق بين تاريخين', 'The difference between two dates'),
          p: B('`$now.diff($json.due.toDateTime(), "days").days` عدد الأيام. استخدم `Math.floor` عشان رقم صحيح. مفيد للفواتير المتأخرة والتذكيرات.', '`$now.diff($json.due.toDateTime(), "days").days` gives the number of days. Use `Math.floor` for a whole number. Useful for overdue invoices and reminders.'),
          ex: '{{ Math.floor($now.diff($json.due_date.toDateTime(), "days").days) }} days late' }
      ],
      practice: [
        B('اكتب expressions لـ: امبارح، بكرة، أول الشهر، آخر الشهر، بعد 30 يوم.', 'Write expressions for: yesterday, tomorrow, the start of the month, the end of the month, 30 days from now.'),
        B('نسّق نفس التاريخ بـ 4 أشكال مختلفة.', 'Format the same date in 4 different ways.'),
        B('احسب عدد أيام التأخير لقايمة فواتير فيها due_date.', 'Calculate days overdue for a list of invoices with a due_date.'),
        B('فلتر الـ items اللي تاريخها في آخر 7 أيام بس.', 'Filter the items whose date is within the last 7 days.')
      ],
      words: [
        { t: 'plus() / minus()', m: B('تزود أو تنقص مدة من تاريخ', 'add or subtract a duration from a date'), ex: '$now.plus({ days: 3 })' },
        { t: 'toFormat()', m: B('ينسّق التاريخ بالشكل اللي تحدده', 'formats a date the way you specify'), ex: 'toFormat("dd/MM/yyyy")' },
        { t: 'diff()', m: B('الفرق بين تاريخين بوحدة تختارها', 'the difference between two dates in a unit you choose'), ex: '$now.diff(due, "days").days' },
        { t: 'startOf() / endOf()', m: B('أول أو آخر يوم/شهر/أسبوع', 'the start or end of a day, month or week'), ex: '$now.startOf("month")' },
        { t: 'setZone()', m: B('يحوّل التاريخ لتوقيت منطقة معينة', 'converts a date to a specific timezone'), ex: 'setZone("Asia/Riyadh")' }],
      read: ['lib:n8n Docs: Luxon (التواريخ)', 'lib:Luxon Docs'],
      challenge: B('اعمل «due date checker»: كل يوم الساعة 9 يقرا مهام من Sheet، ويبعت اللي ميعادها النهارده، واللي متأخرة بعدد الأيام، واللي فاضل عليها يومين.', 'Build a "due date checker": every day at 9 it reads tasks from a sheet and sends those due today, the overdue ones with the number of days, and those due in two days.'),
      quiz: [
        { q: B('إزاي تجيب تاريخ امبارح؟', 'How do you get yesterday\'s date?'), o: ['$today.minus({ days: 1 })', '$today - 1', '$today.yesterday()'], a: 0, why: B('Luxon: minus بـ object.', 'Luxon: minus with an object.') },
        { q: B('`toFormat("cccc")` بيرجّع:', '`toFormat("cccc")` returns:'), o: [B('اسم اليوم كامل', 'the full weekday name'), B('السنة', 'the year'), B('الساعة', 'the hour')], a: 0, why: B('cccc = Monday…', 'cccc = Monday…') },
        { q: B('تحوّل نص "2026-10-01" لتاريخ بـ:', 'Turn the text "2026-10-01" into a date with:'), o: ['.toDateTime()', '.toDate()', 'Date()'], a: 0, why: B('دالة n8n الجاهزة.', 'n8n\'s built-in helper.') }
      ] },

    { title: B('دوال n8n الجاهزة', 'n8n\'s built-in functions'),
      goal: B('تستخدم دوال n8n الجاهزة للنصوص والأرقام والقوايم بدل ما تكتب كود.', 'Use n8n\'s built-in functions for text, numbers and arrays instead of writing code.'),
      learn: [
        { h: B('دوال النصوص', 'Text functions'),
          p: B('`.isEmpty()` فاضي؟، `.isEmail()` إيميل صح؟، `.extractEmail()` يطلّع إيميل من نص، `.extractDomain()`، `.toTitleCase()`، `.removeTags()` يشيل HTML.', '`.isEmpty()` is it empty?, `.isEmail()` a valid email?, `.extractEmail()` pulls an email out of text, `.extractDomain()`, `.toTitleCase()`, `.removeTags()` strips HTML.'),
          ex: '{{ $json.message.extractEmail() }}\n{{ $json.name.toTitleCase() }}\n{{ $json.html.removeTags() }}' },
        { h: B('دوال القوايم', 'Array functions'),
          p: B('`.sum()` المجموع، `.average()`، `.pluck("price")` يطلّع حقل من كل object، `.removeDuplicates()`، `.first()`/`.last()`، `.chunk(10)` يقسّم لمجموعات.', '`.sum()`, `.average()`, `.pluck("price")` pulls one field from each object, `.removeDuplicates()`, `.first()`/`.last()`, `.chunk(10)` splits into groups.'),
          ex: '{{ $json.items.pluck("price").sum() }}\n{{ $json.tags.removeDuplicates().join(", ") }}' },
        { h: B('JavaScript للقوايم', 'JavaScript for arrays'),
          p: B('ولو محتاج أكتر: `.map(x => x.name)`، `.filter(x => x.paid)`، `.join(", ")`، `.length`. الـ arrow function بتكتب الدالة في سطر.', 'For more: `.map(x => x.name)`, `.filter(x => x.paid)`, `.join(", ")`, `.length`. An arrow function writes a function in one line.'),
          ex: '{{ $json.items.filter(i => i.qty > 0).map(i => i.name).join(", ") }}' }
      ],
      practice: [
        B('طلّع الإيميل من 5 رسايل نص حر بـ extractEmail.', 'Pull the email out of 5 free-text messages with extractEmail.'),
        B('احسب مجموع ومتوسط الأسعار في طلب بـ pluck وsum وaverage.', 'Calculate the total and average price of an order with pluck, sum and average.'),
        B('اعمل قايمة أسماء المنتجات المتاحة بس بـ filter وmap وjoin.', 'Make a list of available product names with filter, map and join.'),
        B('اتأكد إن حقل الإيميل صح بـ isEmail وحط النتيجة في حقل.', 'Check an email field with isEmail and store the result in a field.')
      ],
      words: ['arrow function', 'array / object (JS)',
        { t: 'isEmpty()', m: B('دالة n8n بتقول القيمة فاضية ولا لأ', 'an n8n function that tells whether a value is empty'), ex: '{{ $json.phone.isEmpty() }}' },
        { t: 'extractEmail()', m: B('بتطلّع أول إيميل من نص', 'pulls the first email address out of text'), ex: '{{ $json.body.extractEmail() }}' },
        { t: 'pluck()', m: B('بتطلّع حقل واحد من كل object في قايمة', 'pulls one field from each object in a list'), ex: 'items.pluck("price")' }],
      read: ['lib:n8n Docs: Data transformation functions', 'lib:javascript.info: Array methods'],
      challenge: B('اعمل «contact cleaner»: بياخد رسايل فيها أسماء وإيميلات متلخبطة، ويطلع لكل واحدة الإيميل والدومين والاسم بحروف مظبوطة، ويعلّم اللي إيميلها مش صحيح.', 'Build a "contact cleaner": it takes messy messages with names and emails, and for each one extracts the email, the domain and a properly capitalised name, flagging any invalid email.'),
      quiz: [
        { q: B('`[{p:5},{p:10}].pluck("p").sum()` =', '`[{p:5},{p:10}].pluck("p").sum()` ='), o: ['15', '[5,10]', '2'], a: 0, why: B('pluck ← [5,10] ← sum = 15.', 'pluck → [5,10] → sum = 15.') },
        { q: B('تشيل HTML من نص بـ:', 'Strip HTML from text with:'), o: ['.removeTags()', '.trim()', '.toHTML()'], a: 0, why: B('دالة n8n جاهزة.', 'A built-in n8n function.') },
        { q: B('`.filter(x => x.paid)` بيرجّع:', '`.filter(x => x.paid)` returns:'), o: [B('اللي paid فيهم true بس', 'only those where paid is true'), B('أول عنصر', 'the first item'), B('عدد', 'a count')], a: 0, why: B('filter بيسيب اللي الشرط صح.', 'filter keeps items where the condition is true.') }
      ] },

    { title: B('تصليح أخطاء الـ expressions', 'Fixing expression errors'),
      goal: B('تفهم أخطاء الـ expressions الشائعة وتحميها من القيم الفاضية والأنواع الغلط.', 'Understand common expression errors and protect against empty values and wrong types.'),
      learn: [
        { h: B('أشهر الأخطاء', 'The most common errors'),
          p: B('«Cannot read properties of undefined» = بتقرا حقل جوه حاجة مش موجودة. «Referenced node is unexecuted» = الـ node اللي بتقرا منها لسه متشغلتش. «Invalid syntax» = قوس أو علامة ناقصة.', '"Cannot read properties of undefined" = you read a field inside something that doesn\'t exist. "Referenced node is unexecuted" = the node you read from hasn\'t run yet. "Invalid syntax" = a missing bracket or quote.'),
          ex: '$json.customer.email   → customer is undefined\n$json.customer?.email  → undefined, no error' },
        { h: B('قيم افتراضية', 'Default values'),
          p: B('`??` يدي قيمة لو اللي قبله null أو undefined: `$json.city ?? "Unknown"`. و`$ifEmpty($json.phone, "—")` في n8n بيشتغل كمان للنص الفاضي.', '`??` gives a value if the left side is null or undefined: `$json.city ?? "Unknown"`. n8n\'s `$ifEmpty($json.phone, "—")` also covers empty strings.'),
          ex: '{{ $json.discount ?? 0 }}\n{{ $ifEmpty($json.phone, "no phone") }}' },
        { h: B('الأنواع', 'Types'),
          p: B('رقم جاي كنص؟ `Number($json.qty)`. عايز نص؟ `String(x)`. عايز تشوف object كامل؟ `JSON.stringify($json)`. و"5" + 1 = "51" مش 6!', 'A number arriving as text? `Number($json.qty)`. Need text? `String(x)`. Want to see a whole object? `JSON.stringify($json)`. And "5" + 1 = "51", not 6!'),
          ex: '{{ Number($json.qty) * Number($json.price) }}\n{{ JSON.stringify($json.address) }}' }
      ],
      practice: [
        B('اعمل 3 أخطاء expression بإيدك وصلّحهم، واكتب سبب كل واحد.', 'Cause 3 expression errors on purpose, fix them, and write the cause of each.'),
        B('احمي 5 expressions من القيم الفاضية بـ ?. و?? و$ifEmpty.', 'Protect 5 expressions against empty values with ?., ?? and $ifEmpty.'),
        B('اعمل حساب فيه أرقام جاية كنص وصلّحه بـ Number.', 'Do a calculation with numbers that arrive as text and fix it with Number.'),
        B('استخدم JSON.stringify عشان تشوف object كامل في رسالة debug.', 'Use JSON.stringify to see a whole object in a debug message.')
      ],
      words: [
        { t: 'nullish coalescing (??)', m: B('قيمة بديلة لو اللي قبلها null أو undefined', 'a fallback value when the left side is null or undefined'), ex: '$json.city ?? "Unknown"' },
        { t: '$ifEmpty()', m: B('دالة n8n بتدي قيمة بديلة لو الأولى فاضية', 'an n8n function that returns a fallback if the first value is empty'), ex: '$ifEmpty($json.phone, "—")' },
        { t: 'JSON.stringify()', m: B('بيحوّل object لنص JSON عشان تشوفه أو تبعته', 'turns an object into JSON text so you can see or send it'), ex: 'JSON.stringify($json.address)' },
        { t: 'Number() / String()', m: B('تحويل قيمة لرقم أو لنص', 'convert a value to a number or to text'), ex: 'Number("42") → 42' },
        { t: 'unexecuted node', m: B('node لسه متشغلتش في التنفيذ ده، فمينفعش تقرا منها', 'a node that hasn\'t run in this execution, so you can\'t read from it'), ex: 'Referenced node is unexecuted' }],
      read: [{ lib: 'n8n Community Forum', what: B('دوّر على «Cannot read properties of undefined» واقرا 3 حلول.', 'Search for "Cannot read properties of undefined" and read 3 solutions.') }, 'lib:MDN JavaScript Reference'],
      challenge: B('خد workflow عندك واعمله «hardening»: كل expression محمي من القيم الفاضية، وكل رقم متحوّل صح، واختبره ببيانات ناقصة.', 'Take one of your workflows and "harden" it: every expression protected against empty values, every number converted correctly, and test it with incomplete data.'),
      quiz: [
        { q: B('`"5" + 1` في JavaScript =', '`"5" + 1` in JavaScript ='), o: ['"51"', '6', 'error'], a: 0, why: B('نص + رقم = نص.', 'string + number = string.') },
        { q: B('`$json.city ?? "Unknown"` لو city مش موجود:', '`$json.city ?? "Unknown"` when city is missing:'), o: ['"Unknown"', 'undefined', 'error'], a: 0, why: B('?? بيدي البديل.', '?? gives the fallback.') },
        { q: B('«Referenced node is unexecuted» معناها:', '"Referenced node is unexecuted" means:'), o: [B('الـ node اللي بتقرا منها متشغلتش', 'the node you read from hasn\'t run'), B('الـ node اتمسحت', 'the node was deleted'), B('الإنترنت قاطع', 'no internet')], a: 0, why: B('غالبًا في فرع تاني.', 'Often it\'s in another branch.') }
      ] },

    { title: B('مراجعة الشهر الأول والاختبار', 'Month 1 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 5 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 5 opens when you score 70% or more.'),
      review: [
        B('الـ items والـ Expressions وHTTP والـ IF/Switch/Merge (الأسبوع 1).', 'Items, expressions, HTTP and IF/Switch/Merge (week 1).'),
        B('الطرفية وJSON وGit وcurl والتنظيم (الأسبوع 2).', 'The terminal, JSON, Git, curl and organisation (week 2).'),
        B('الـ triggers والـ cron والـ polling والـ webhooks والفورمز (الأسبوع 3).', 'Triggers, cron, polling, webhooks and forms (week 3).'),
        B('النصوص والشروط، و$("Node")، وLuxon، والدوال الجاهزة، والحماية من الأخطاء (الأسبوع 4).', 'Strings and conditions, $("Node"), Luxon, built-in functions, and error protection (week 4).')
      ],
      project: B('مشروع الشهر: «مساعد الفواتير»: فورم أو Sheet فيه فواتير (عميل، مبلغ، due_date، إيميل)، وكل يوم الساعة 9 (بالتوقيت الصح) يحسب المتأخر بعدد الأيام، ويبعت تذكير مؤدب لكل عميل متأخر، وملخص لك على Telegram فيه الإجمالي، وWebhook تسجّل بيه الدفع. كل expression محمي، والـ workflows في Git بـ README.',
                 'Month project: an "invoice assistant": a form or sheet of invoices (client, amount, due_date, email). Every day at 9 (correct timezone) it calculates the overdue ones in days, sends each late client a polite reminder, sends you a Telegram summary with the total, and offers a webhook to record payments. Every expression is protected, and the workflows are in Git with a README.'),
      test: [
        { q: B('`{{ $json.name.trim().toUpperCase() }}` بيعمل:', '`{{ $json.name.trim().toUpperCase() }}` does:'), o: [B('يشيل المسافات ويكبّر الحروف', 'removes spaces and uppercases'), B('يمسح الاسم', 'deletes the name'), B('يعد الحروف', 'counts letters')], a: 0, why: B('trim ثم toUpperCase.', 'trim, then toUpperCase.') },
        { q: B('template literal بيبدأ ويخلص بـ:', 'A template literal starts and ends with:'), o: ['` (backtick)', '" (double quote)', '# (hash)'], a: 0, why: B('وجواه ${…}.', 'With ${…} inside.') },
        { q: B('قيمة من node اسمها "Get user" للـ item الحالي:', 'A value from the node "Get user" for the current item:'), o: ['$("Get user").item.json.email', '$json("Get user").email', '$node.email'], a: 0, why: B('.item = المرتبط.', '.item = the linked item.') },
        { q: B('عدد الـ items في node "Orders":', 'The number of items in the "Orders" node:'), o: ['$("Orders").all().length', '$("Orders").count', '$json.length'], a: 0, why: B('all() ← array ← length.', 'all() → array → length.') },
        { q: B('أول يوم في الشهر الحالي:', 'The first day of the current month:'), o: ['$now.startOf("month")', '$now.first("month")', '$now - month'], a: 0, why: B('Luxon startOf.', 'Luxon startOf.') },
        { q: B('`$now.toFormat("yyyy-MM-dd")` مثال على نتيجته:', 'An example result of `$now.toFormat("yyyy-MM-dd")`:'), o: ['2026-09-28', '28/09/26', 'Monday'], a: 0, why: B('سنة-شهر-يوم.', 'year-month-day.') },
        { q: B('عدد أيام التأخير:', 'Days overdue:'), o: ['$now.diff(due, "days").days', 'due - $now', '$now.days(due)'], a: 0, why: B('diff بوحدة days.', 'diff in days.') },
        { q: B('مجموع الأسعار في items:', 'The sum of prices in items:'), o: ['items.pluck("price").sum()', 'items.sum', 'sum(items)'], a: 0, why: B('pluck ثم sum.', 'pluck, then sum.') },
        { q: B('`.extractEmail()` بيعمل:', '`.extractEmail()` does:'), o: [B('يطلّع إيميل من نص', 'pulls an email out of text'), B('يبعت إيميل', 'sends an email'), B('يمسح الإيميل', 'deletes the email')], a: 0, why: B('دالة نصوص جاهزة.', 'A built-in text function.') },
        { q: B('تحمي من حقل ناقص جوه object:', 'Protect against a missing nested field:'), o: ['$json.customer?.email', '$json.customer.email!', '$json[customer]'], a: 0, why: B('optional chaining.', 'optional chaining.') },
        { q: B('`Number("12") + 3` =', '`Number("12") + 3` ='), o: ['15', '"123"', 'error'], a: 0, why: B('اتحوّل لرقم الأول.', 'It becomes a number first.') },
        { q: B('`$ifEmpty($json.phone, "—")` لو phone = "":', '`$ifEmpty($json.phone, "—")` when phone = "":'), o: ['"—"', '""', 'undefined'], a: 0, why: B('النص الفاضي بيتحسب empty.', 'An empty string counts as empty.') }
      ] }
  ]
};
