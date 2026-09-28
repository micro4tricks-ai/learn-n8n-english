// n8n week 9 — The Code node and intermediate JavaScript.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('Code node وJavaScript المتوسط', 'The Code node and intermediate JavaScript'),
  goal: B('تكتب Code node نظيف: تقرا الـ items وترجّعها بالشكل الصح، وتستخدم دوال الـ arrays المتقدمة، وتنادي APIs بـ await، وتتعامل مع الملفات والتواريخ، وتعرف إمتى متكتبش كود.',
          'Write clean Code nodes: read items and return them in the right shape, use advanced array methods, call APIs with await, handle files and dates, and know when not to write code.'),
  days: [
    { title: B('هيكل Code node', 'The shape of a Code node'),
      goal: B('تقرا المدخلات وترجّع items صح، وتعمل debug بـ console.log.', 'Read the input and return items correctly, and debug with console.log.'),
      learn: [
        { h: B('المدخل والمخرج', 'Input and output'),
          p: B('في Run Once for All Items: `$input.all()` بيرجّع array من items، وكل item فيه `.json`. ولازم ترجّع array من objects كل واحد `{ json: {...} }`.', 'In Run Once for All Items: `$input.all()` returns an array of items, each with `.json`. You must return an array of objects, each `{ json: {...} }`.'),
          ex: 'const out = [];\nfor (const item of $input.all()) {\n  out.push({ json: { name: item.json.name.toUpperCase() } });\n}\nreturn out;' },
        { h: B('item واحد', 'One item'),
          p: B('في Run Once for Each Item: `$input.item.json` هو الـ item الحالي، وترجّع object واحد `{ json: … }`. أبسط لو كل item مستقل.', 'In Run Once for Each Item: `$input.item.json` is the current item, and you return a single `{ json: … }`. Simpler when items are independent.'),
          ex: 'const j = $input.item.json;\nreturn { json: { ...j, total: j.qty * j.price } };' },
        { h: B('debug', 'Debugging'),
          p: B('`console.log(x)` بيظهر في console بتاع المتصفح (F12) وانت بتشغّل من المحرر. وJSON.stringify للـ objects الكبيرة.', '`console.log(x)` appears in the browser console (F12) when you run from the editor. Use JSON.stringify for large objects.'),
          ex: 'console.log("items:", $input.all().length);\nconsole.log(JSON.stringify($input.first().json, null, 2));' }
      ],
      practice: [
        B('اكتب Code (All Items) بيضيف حقل total لكل item.', 'Write a Code node (All Items) that adds a total field to each item.'),
        B('اكتب نفس الحاجة بـ Each Item وقارن.', 'Write the same with Each Item and compare.'),
        B('اعمل خطأ return (ترجّع object من غير json) وشوف رسالة n8n.', 'Make a return mistake (an object without json) and read n8n\'s message.'),
        B('استخدم console.log وشوفه في F12.', 'Use console.log and find it with F12.')
      ],
      words: [
        { t: '$input.all()', m: B('كل الـ items الداخلة للـ Code node', 'every item coming into the Code node'), ex: 'for (const item of $input.all())' },
        { t: '$input.item', m: B('الـ item الحالي في وضع Each Item', 'the current item in Each Item mode'), ex: '$input.item.json.email' },
        { t: 'return format', m: B('شكل اللي لازم ترجّعه: array من { json }', 'what you must return: an array of { json }'), ex: 'return [{ json: {...} }];' },
        { t: 'console.log()', m: B('يطبع قيمة في console المتصفح للـ debug', 'prints a value to the browser console for debugging'), ex: 'console.log(items.length)' },
        { t: 'DevTools (F12)', m: B('أدوات المطور في المتصفح', 'the browser\'s developer tools'), ex: 'Open the Console tab.' }],
      read: ['lib:n8n Docs: Code node'],
      challenge: B('حوّل Edit Fields معقد عندك لـ Code node، وبعدين رجّعه nodes، واكتب أنهي أحسن وليه.', 'Turn one of your complex Edit Fields nodes into a Code node, then back into nodes, and write which is better and why.'),
      quiz: [
        { q: B('Code (All Items) لازم يرجّع:', 'A Code node (All Items) must return:'), o: ['[{ json: {...} }]', '{ name: "Ali" }', '"done"'], a: 0, why: B('array من items.', 'An array of items.') },
        { q: B('في Each Item، الـ item الحالي:', 'In Each Item mode the current item is:'), o: ['$input.item.json', '$input.all()', '$json.all'], a: 0, why: B('item واحد.', 'One item.') },
        { q: B('console.log بيظهر في:', 'console.log shows up in:'), o: [B('console المتصفح', 'the browser console'), B('الـ Sheet', 'the sheet'), B('Telegram', 'Telegram')], a: 0, why: B('F12.', 'F12.') }
      ] },

    { title: B('دوال الـ arrays المتقدمة', 'Advanced array methods'),
      goal: B('تجمّع وترتّب وتدوّر وتعدّ بـ reduce وsort وfind وsome/every.', 'Group, sort, search and count with reduce, sort, find and some/every.'),
      learn: [
        { h: B('reduce للتجميع', 'reduce for grouping'),
          p: B('reduce بيمشي على القايمة ويجمّع في قيمة: مجموع، أو object مجمّع حسب حقل.', 'reduce walks the list and builds one value: a sum, or an object grouped by a field.'),
          ex: 'const byCity = items.reduce((acc, i) => {\n  const c = i.json.city;\n  acc[c] = (acc[c] || 0) + i.json.total;\n  return acc;\n}, {});' },
        { h: B('sort بـ comparator', 'sort with a comparator'),
          p: B('`arr.sort((a, b) => b.total - a.total)` من الأكبر للأصغر. وللنصوص: `a.name.localeCompare(b.name)`. sort بيغيّر الـ array الأصلي.', '`arr.sort((a, b) => b.total - a.total)` largest first. For text: `a.name.localeCompare(b.name)`. sort changes the original array.'),
          ex: 'rows.sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first' },
        { h: B('find وsome وevery وObject.entries', 'find, some, every and Object.entries'),
          p: B('find = أول عنصر مطابق. some = في واحد على الأقل؟ every = الكل؟ Object.entries = يحوّل object لقايمة [مفتاح، قيمة] تقدر تحوّلها items.', 'find = the first match. some = is there at least one? every = do all match? Object.entries = turns an object into [key, value] pairs you can turn into items.'),
          ex: 'return Object.entries(byCity).map(([city, total]) => ({ json: { city, total } }));' }
      ],
      practice: [
        B('جمّع المبيعات حسب المدينة بـ reduce وطلّعها items.', 'Group sales by city with reduce and output them as items.'),
        B('رتّب الطلبات من الأحدث بالتاريخ.', 'Sort orders newest first by date.'),
        B('استخدم find تجيب أول طلب أكبر من 1000.', 'Use find to get the first order above 1000.'),
        B('استخدم every تتأكد إن كل الإيميلات صحيحة.', 'Use every to check that all emails are valid.')
      ],
      words: [
        { t: 'reduce()', m: B('يجمّع القايمة في قيمة واحدة', 'combines a list into one value'), ex: 'items.reduce((sum, i) => sum + i.json.total, 0)' },
        { t: 'sort comparator', m: B('دالة بتقول sort يرتّب إزاي', 'a function telling sort how to order'), ex: '(a, b) => b.total - a.total' },
        { t: 'find()', m: B('يرجّع أول عنصر مطابق للشرط', 'returns the first element matching a condition'), ex: 'orders.find(o => o.total > 1000)' },
        { t: 'some() / every()', m: B('في عنصر مطابق؟ / الكل مطابق؟', 'does any element match? / do all match?'), ex: 'emails.every(e => e.includes("@"))' },
        { t: 'Object.entries()', m: B('يحوّل object لأزواج [مفتاح، قيمة]', 'turns an object into [key, value] pairs'), ex: 'Object.entries({a:1}) → [["a",1]]' }],
      read: ['lib:javascript.info: Array methods', 'lib:Eloquent JavaScript'],
      challenge: B('اعمل Code node واحد بيطلع «تقرير مبيعات»: الإجمالي، والمتوسط، وأعلى 3 مدن، وأكبر طلب، وهل كل الطلبات مدفوعة.', 'Write one Code node that produces a "sales report": total, average, the top 3 cities, the biggest order, and whether all orders are paid.'),
      quiz: [
        { q: B('`[3,1,2].sort((a,b)=>b-a)` =', '`[3,1,2].sort((a,b)=>b-a)` ='), o: ['[3,2,1]', '[1,2,3]', '[3,1,2]'], a: 0, why: B('b-a = تنازلي.', 'b-a = descending.') },
        { q: B('أول عنصر مطابق:', 'The first matching element:'), o: ['find()', 'filter()', 'every()'], a: 0, why: B('filter بيرجّع كلهم.', 'filter returns all of them.') },
        { q: B('`[1,2,3].some(x => x > 2)` =', '`[1,2,3].some(x => x > 2)` ='), o: ['true', 'false', '3'], a: 0, why: B('في واحد أكبر من 2.', 'One is greater than 2.') }
      ] },

    { title: B('async وAPIs جوه الكود', 'async and APIs in code'),
      goal: B('تنادي APIs من Code node بـ await، وتعمل طلبات متوازية بحذر، وتمسك الأخطاء.', 'Call APIs from a Code node with await, run parallel requests carefully, and catch errors.'),
      learn: [
        { h: B('this.helpers.httpRequest', 'this.helpers.httpRequest'),
          p: B('جوه Code node تقدر `await this.helpers.httpRequest({ method, url, headers, body, json: true })`. بس الأحسن غالبًا HTTP Request node (retry وcredentials وlogs). استخدم الكود لما تحتاج منطق معقد بين الطلبات.', 'Inside a Code node you can `await this.helpers.httpRequest({ method, url, headers, body, json: true })`. But the HTTP Request node is usually better (retries, credentials, logs). Use code when you need complex logic between calls.'),
          ex: 'const res = await this.helpers.httpRequest({\n  method: "GET",\n  url: "https://api.example.com/rates",\n  json: true,\n});' },
        { h: B('Promise.all بحذر', 'Promise.all, carefully'),
          p: B('`await Promise.all(list.map(...))` بيبعت الطلبات كلها مرة واحدة. أسرع، بس ممكن يكسر الـ rate limit. قسّم لمجموعات صغيرة.', '`await Promise.all(list.map(...))` sends every request at once. Faster, but it can break the rate limit. Split into small batches.'),
          ex: 'for (const group of chunks(ids, 5)) {\n  await Promise.all(group.map(fetchOne));\n}' },
        { h: B('try / catch', 'try / catch'),
          p: B('حوّط الطلب بـ try/catch عشان خطأ واحد ميوقعش الكل، وسجّل الخطأ في الـ item: `{ ok: false, error: e.message }`.', 'Wrap the request in try/catch so one failure doesn\'t stop everything, and record the error on the item: `{ ok: false, error: e.message }`.'),
          ex: 'try { … } catch (e) {\n  out.push({ json: { id, ok: false, error: e.message } });\n}' }
      ],
      practice: [
        B('نادي API بـ this.helpers.httpRequest ورجّع النتيجة.', 'Call an API with this.helpers.httpRequest and return the result.'),
        B('اعمل 10 طلبات على مجموعات من 3 بـ Promise.all.', 'Make 10 requests in groups of 3 with Promise.all.'),
        B('حوّط طلب بـ try/catch ورجّع ok/error لكل item.', 'Wrap a request in try/catch and return ok/error per item.'),
        B('قارن نفس الشغل بـ HTTP Request node واكتب الفروق.', 'Compare the same job with the HTTP Request node and write the differences.')
      ],
      words: ['async / await',
        { t: 'this.helpers.httpRequest', m: B('دالة لطلبات HTTP جوه Code node', 'a function for HTTP requests inside the Code node'), ex: 'await this.helpers.httpRequest({ url })' },
        { t: 'Promise.all', m: B('يستنى مجموعة طلبات متوازية تخلص', 'waits for a group of parallel requests to finish'), ex: 'await Promise.all(urls.map(get))' },
        { t: 'try / catch (JS)', m: B('يمسك الخطأ عشان الكود يكمّل', 'catches an error so the code can continue'), ex: 'try { … } catch (e) { … }' },
        { t: 'e.message', m: B('نص رسالة الخطأ', 'the text of an error message'), ex: 'error: e.message' }],
      read: ['lib:The Modern JavaScript Tutorial', 'lib:MDN JavaScript Guide'],
      challenge: B('اعمل Code node بيجيب تفاصيل 20 منتج من API على مجموعات، ويكمّل لو واحد فشل، ويرجّع ملخص (نجح كام، فشل كام، والأسباب).', 'Write a Code node that fetches 20 product details from an API in batches, carries on when one fails, and returns a summary (how many succeeded, failed, and why).'),
      quiz: [
        { q: B('ليه HTTP Request node أحسن غالبًا من الكود؟', 'Why is the HTTP Request node usually better than code?'), o: [B('retry وcredentials وlogs جاهزة', 'retries, credentials and logs built in'), B('أسرع دايمًا', 'always faster'), B('مفيش فرق', 'no difference')], a: 0, why: B('أقل كود = أقل أخطاء.', 'Less code = fewer bugs.') },
        { q: B('Promise.all على 500 طلب مرة واحدة:', 'Promise.all on 500 requests at once:'), o: [B('ممكن يكسر الـ rate limit', 'may break the rate limit'), B('آمن دايمًا', 'always safe'), B('مستحيل', 'impossible')], a: 0, why: B('قسّم لمجموعات.', 'Split into batches.') },
        { q: B('عشان خطأ واحد ميوقفش الباقي:', 'So one error doesn\'t stop the rest:'), o: ['try / catch per item', 'return early', 'console.log'], a: 0, why: B('امسك وكمّل.', 'Catch and continue.') }
      ] },

    { title: B('الملفات والتواريخ في الكود', 'Files and dates in code'),
      goal: B('تقرا وتكتب binary في Code node، وتستخدم Luxon وDate صح.', 'Read and write binary data in a Code node, and use Luxon and Date correctly.'),
      learn: [
        { h: B('قراءة binary', 'Reading binary'),
          p: B('`await this.helpers.getBinaryDataBuffer(0, "data")` بيرجّع Buffer للملف (بيشتغل في كل أوضاع التخزين). وبعدين `.toString("utf8")` لو نص.', '`await this.helpers.getBinaryDataBuffer(0, "data")` returns a Buffer for the file (works in every storage mode). Then `.toString("utf8")` for text.'),
          ex: 'const buf = await this.helpers.getBinaryDataBuffer(0, "data");\nconst text = buf.toString("utf8");' },
        { h: B('كتابة binary', 'Writing binary'),
          p: B('`await this.helpers.prepareBinaryData(Buffer.from(text), "report.csv", "text/csv")` بيعمل binary تحطه في `item.binary.data`. أو ببساطة استخدم Convert to File.', '`await this.helpers.prepareBinaryData(Buffer.from(text), "report.csv", "text/csv")` creates binary you put in `item.binary.data`. Or simply use Convert to File.'),
          ex: 'return [{ json: {}, binary: { data: await this.helpers.prepareBinaryData(Buffer.from(csv), "out.csv", "text/csv") } }];' },
        { h: B('التواريخ في الكود', 'Dates in code'),
          p: B('`DateTime` من Luxon متاح في Code node: `DateTime.now().setZone("Africa/Cairo")`. وتجنّب `new Date("28/09/2026")` لأنه مش بيفهم الشكل ده؛ استخدم ISO.', 'Luxon\'s `DateTime` is available in the Code node: `DateTime.now().setZone("Africa/Cairo")`. Avoid `new Date("28/09/2026")`, which doesn\'t understand that format; use ISO.'),
          ex: 'const d = DateTime.fromFormat("28/09/2026", "dd/MM/yyyy");\nd.toISODate(); // "2026-09-28"' }
      ],
      practice: [
        B('اقرا CSV من binary في Code node وعدّ السطور.', 'Read a CSV from binary in a Code node and count the lines.'),
        B('اعمل ملف نص من الكود وابعته على Telegram.', 'Create a text file from code and send it on Telegram.'),
        B('حوّل 5 تواريخ بأشكال مختلفة لـ ISO بـ DateTime.fromFormat.', 'Convert 5 dates in different formats to ISO with DateTime.fromFormat.'),
        B('اعرض التاريخ بتوقيتين مختلفين.', 'Show a date in two different timezones.')
      ],
      words: [
        { t: 'Buffer', m: B('بيانات الملف كبايتات في Node.js', 'a file\'s data as bytes in Node.js'), ex: 'Buffer.from("hello")' },
        { t: 'getBinaryDataBuffer', m: B('دالة بتقرا ملف الـ item كـ Buffer', 'a helper that reads an item\'s file as a Buffer'), ex: 'await this.helpers.getBinaryDataBuffer(0, "data")' },
        { t: 'prepareBinaryData', m: B('دالة بتحوّل Buffer لـ binary item', 'a helper that turns a Buffer into item binary data'), ex: 'prepareBinaryData(buf, "a.csv")' },
        { t: 'base64', m: B('طريقة تكتب بايتات كنص', 'a way of writing bytes as text'), ex: 'aGVsbG8= → "hello"' },
        { t: 'DateTime.fromFormat', m: B('يقرا تاريخ بشكل تحدده', 'reads a date in a format you specify'), ex: 'fromFormat("28/09/2026", "dd/MM/yyyy")' }],
      read: ['lib:n8n Docs: Code node', 'lib:Luxon Docs'],
      challenge: B('اعمل Code node بياخد CSV فيه تواريخ بأشكال مختلطة، ويوحّدها ISO، ويطلع CSV جديد نظيف كملف.', 'Write a Code node that takes a CSV with mixed date formats, standardises them to ISO, and outputs a clean new CSV file.'),
      quiz: [
        { q: B('تقرا ملف الـ item كبايتات بـ:', 'Read an item\'s file as bytes with:'), o: ['this.helpers.getBinaryDataBuffer', 'fs.readFile', '$json.file'], a: 0, why: B('بيشتغل في كل أوضاع التخزين.', 'It works in every storage mode.') },
        { q: B('`new Date("28/09/2026")`:', '`new Date("28/09/2026")`:'), o: [B('غالبًا Invalid Date', 'usually Invalid Date'), B('صح دايمًا', 'always correct'), B('بيرجّع 2026', 'returns 2026')], a: 0, why: B('استخدم ISO أو fromFormat.', 'Use ISO or fromFormat.') },
        { q: B('base64 هي:', 'base64 is:'), o: [B('بايتات مكتوبة كنص', 'bytes written as text'), B('نوع ضغط', 'a compression type'), B('تشفير قوي', 'strong encryption')], a: 0, why: B('ترميز مش تشفير.', 'Encoding, not encryption.') }
      ] },

    { title: B('كود نظيف وإمتى متكتبش كود', 'Clean code and when not to code'),
      goal: B('تكتب Code node مقروء، وتعرف إمتى الـ nodes العادية أحسن.', 'Write readable Code nodes, and know when regular nodes are better.'),
      learn: [
        { h: B('كود مقروء', 'Readable code'),
          p: B('أسماء واضحة، ودوال صغيرة (helper functions) فوق، وearly return للحالات الغلط، ومفيش أرقام سحرية: `const TAX = 0.14;` بدل 0.14 في النص.', 'Clear names, small helper functions at the top, early returns for bad cases, and no magic numbers: `const TAX = 0.14;` instead of 0.14 in the middle.'),
          ex: 'const TAX = 0.14;\nconst net = (p) => p * (1 - TAX);\nfunction isValid(o) { return o.email && o.qty > 0; }' },
        { h: B('إمتى node وإمتى كود', 'Node or code'),
          p: B('لو في node بتعمل الحاجة (Filter، Sort، Aggregate، Date & Time)، استخدمها: أوضح لأي حد يفتح الـ workflow. الكود للمنطق اللي محتاج 5 nodes أو أكتر.', 'If a node does the job (Filter, Sort, Aggregate, Date & Time), use it: clearer for anyone who opens the workflow. Code is for logic that would need 5+ nodes.'),
          ex: 'Filter by status → Filter node\nGroup, rank and format a report → one Code node' },
        { h: B('pure functions', 'Pure functions'),
          p: B('دالة pure بترجّع نفس النتيجة لنفس المدخل ومش بتغيّر حاجة برّه. أسهل في الاختبار. خلّي الطلبات والملفات في الأطراف، والحسابات في الوسط pure.', 'A pure function returns the same result for the same input and changes nothing outside. It\'s easier to test. Keep requests and files at the edges and the calculations pure in the middle.'),
          ex: 'function priceWithTax(p) { return Math.round(p * 1.14 * 100) / 100; }' }
      ],
      practice: [
        B('أعد كتابة Code node قديم عندك بـ helper functions وconstants.', 'Rewrite an old Code node with helper functions and constants.'),
        B('بدّل Code node بسيط بـ nodes عادية.', 'Replace a simple Code node with regular nodes.'),
        B('اكتب 3 pure functions واختبرهم بـ 3 مدخلات.', 'Write 3 pure functions and test each with 3 inputs.'),
        B('ضيف تعليق في أول كل Code node بيقول بيعمل إيه.', 'Add a comment at the top of every Code node saying what it does.')
      ],
      words: [
        { t: 'helper function', m: B('دالة صغيرة بتعمل حاجة واحدة وبتتكرر', 'a small reusable function that does one thing'), ex: 'function cleanEmail(e) { … }' },
        { t: 'magic number', m: B('رقم في الكود من غير اسم بيشرح معناه', 'a number in code with no name explaining it'), ex: '0.14 → const TAX = 0.14' },
        { t: 'early return', m: B('ترجع بدري لو الحالة غلط', 'return early when the case is invalid'), ex: 'if (!email) return [];' },
        { t: 'pure function', m: B('دالة نتيجتها بتعتمد على مدخلها بس', 'a function whose result depends only on its input'), ex: 'add(a, b) → a + b' },
        { t: 'code smell', m: B('علامة إن الكود محتاج تنضيف', 'a sign that code needs cleaning up'), ex: 'A 200-line Code node is a smell.' }],
      read: ['lib:Exercism: JavaScript', 'lib:You Don\'t Know JS Yet'],
      challenge: B('خد أطول Code node عندك واعمله refactor: helpers، constants، early returns، تعليق فوق، واطلب من حد يقراه ويشرحه.', 'Refactor your longest Code node: helpers, constants, early returns, a top comment — then ask someone to read and explain it.'),
      quiz: [
        { q: B('فلترة بسيطة بحقل:', 'A simple filter on one field:'), o: ['Filter node', 'Code node with 50 lines', 'Merge'], a: 0, why: B('أوضح.', 'Clearer.') },
        { q: B('magic number:', 'A magic number is:'), o: [B('رقم من غير اسم في الكود', 'an unnamed number in code'), B('رقم عشوائي', 'a random number'), B('نوع بيانات', 'a data type')], a: 0, why: B('سمّيه constant.', 'Name it as a constant.') },
        { q: B('pure function:', 'A pure function:'), o: [B('نفس المدخل = نفس النتيجة', 'same input = same result'), B('بتبعت إيميل', 'sends an email'), B('بتغيّر ملفات', 'changes files')], a: 0, why: B('من غير آثار جانبية.', 'No side effects.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 10 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 10 opens when you score 70% or more.'),
      review: [
        B('$input.all() و$input.item وreturn [{ json }] وconsole.log.', '$input.all(), $input.item, return [{ json }] and console.log.'),
        B('reduce وsort وfind وsome/every وObject.entries.', 'reduce, sort, find, some/every and Object.entries.'),
        B('this.helpers.httpRequest وPromise.all بحذر وtry/catch.', 'this.helpers.httpRequest, careful Promise.all, and try/catch.'),
        B('getBinaryDataBuffer وprepareBinaryData وDateTime.', 'getBinaryDataBuffer, prepareBinaryData and DateTime.'),
        B('helpers وconstants وpure functions، والـ node قبل الكود.', 'Helpers, constants and pure functions — and nodes before code.')
      ],
      project: B('ابني «تقرير أسبوعي ذكي»: بيقرا مبيعات من Sheet، وCode node واحد نظيف بيحسب (إجمالي، متوسط، أعلى منتجات ومدن، مقارنة بالأسبوع اللي فات بالنسبة)، ويجيب سعر صرف من API بـ await، ويطلع CSV مرفق وإيميل HTML. الكود فيه helpers وconstants وتعليقات، ومعاه 3 اختبارات بمدخلات مختلفة.',
                 'Build a "smart weekly report": it reads sales from a sheet; one clean Code node calculates the total, average, top products and cities, and the change versus last week in percent; it fetches an exchange rate with await; and it outputs an attached CSV and an HTML email. The code has helpers, constants and comments, plus 3 tests with different inputs.'),
      test: [
        { q: B('`$input.all()` بيرجّع:', '`$input.all()` returns:'), o: [B('array من items', 'an array of items'), B('item واحد', 'one item'), B('عدد', 'a number')], a: 0, why: B('كل الداخل.', 'Everything coming in.') },
        { q: B('return صح من Code:', 'A correct Code return:'), o: ['return [{ json: { a: 1 } }];', 'return { a: 1 };', 'return "a";'], a: 0, why: B('في وضع All Items.', 'In All Items mode.') },
        { q: B('المجموع بـ reduce:', 'A sum with reduce:'), o: ['items.reduce((s, i) => s + i.json.x, 0)', 'items.sum', 'reduce(items)'], a: 0, why: B('قيمة بداية 0.', 'Start value 0.') },
        { q: B('ترتيب تنازلي بالـ total:', 'Sort descending by total:'), o: ['(a, b) => b.total - a.total', '(a, b) => a.total - b.total', 'sort()'], a: 0, why: B('b - a.', 'b - a.') },
        { q: B('`Object.entries({x:1,y:2})` =', '`Object.entries({x:1,y:2})` ='), o: ['[["x",1],["y",2]]', '["x","y"]', '[1,2]'], a: 0, why: B('أزواج.', 'Pairs.') },
        { q: B('طلب HTTP جوه الكود:', 'An HTTP request inside code:'), o: ['await this.helpers.httpRequest({...})', 'fetch.now()', '$http.get()'], a: 0, why: B('helper جاهز.', 'A built-in helper.') },
        { q: B('خطأ في طلب واحد ميوقفش الكل:', 'So one failed request doesn\'t stop all:'), o: ['try / catch', 'Promise.all without catch', 'console.log'], a: 0, why: B('امسك الخطأ.', 'Catch the error.') },
        { q: B('ملف من الكود لـ binary:', 'A file from code as binary:'), o: ['this.helpers.prepareBinaryData', 'Buffer.save', 'JSON.stringify'], a: 0, why: B('وتحطه في binary.data.', 'Put it in binary.data.') },
        { q: B('تاريخ "28/09/2026" تقراه بـ:', 'Read the date "28/09/2026" with:'), o: ['DateTime.fromFormat(s, "dd/MM/yyyy")', 'new Date(s)', 'Number(s)'], a: 0, why: B('الشكل مش ISO.', 'The format isn\'t ISO.') },
        { q: B('فلترة بسيطة الأحسن:', 'A simple filter is best done with:'), o: ['Filter node', 'Code node', 'Wait node'], a: 0, why: B('أوضح.', 'Clearer.') },
        { q: B('`const TAX = 0.14;` أحسن من 0.14 في النص لأن:', '`const TAX = 0.14;` beats 0.14 inline because:'), o: [B('بيشرح معنى الرقم', 'it explains what the number means'), B('أسرع', 'faster'), B('إجباري', 'required')], a: 0, why: B('مفيش magic numbers.', 'No magic numbers.') },
        { q: B('console.log من Code بيظهر لما:', 'console.log from Code shows when:'), o: [B('تشغّل من المحرر وتفتح F12', 'you run from the editor with F12 open'), B('الـ workflow active بس', 'only when active'), B('أبدًا', 'never')], a: 0, why: B('في المتصفح.', 'In the browser.') }
      ] }
  ]
};
