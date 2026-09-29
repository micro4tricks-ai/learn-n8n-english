// Sections of sheets.html: printable cheat sheets (type sheets). Each sheet: id, t, sub, groups [{t, rows [[code, meaning]]}].
// The code column is shown left-to-right as is; the meaning is {ar, en}.
(function(){
function R(code, ar, en){ return [code, { ar: ar, en: en }]; }
SECTIONS.add({
  page: 'sheets', id: 'sheets', order: 1, type: 'sheets', kind: 's',
  title: { ar: 'ورق الملخصات', en: 'Cheat sheets' },
  desc: {
    ar: 'كل ملخص صفحة واحدة تتطبع A4 وتتعلّق جنب الشاشة. اختار الملخص ودوس «اطبع»، أو اطبعهم كلهم مرة واحدة (كل ملخص في صفحة). من نافذة الطباعة تقدر تختار «Save as PDF».',
    en: 'Each sheet is one A4 page to print and keep by your screen. Pick a sheet and press «Print», or print them all at once (one sheet per page). In the print window you can choose «Save as PDF».'
  },
  items: [
    { id: 'expr', t: { ar: 'Expressions في n8n', en: 'n8n expressions' }, sub: { ar: 'أي حقل يبدأ بـ `=` والكود جوه `{{ }}`.', en: 'Any field starting with `=` with the code inside `{{ }}`.' }, groups: [
      { t: { ar: 'الوصول للبيانات', en: 'Getting data' }, rows: [
        R('{{ $json.email }}', 'حقل من الـ item الحالي', 'A field of the current item'),
        R('{{ $json.body.name }}', 'بيانات Webhook جوه body', 'Webhook data inside body'),
        R("{{ $json['first name'] }}", 'حقل اسمه فيه مسافة', 'A field whose name has a space'),
        R("{{ $('Get customer').item.json.id }}", 'حقل من نود معيّنة بالاسم', 'A field from a named node'),
        R('{{ $input.first().json.id }}', 'أول item داخل', 'The first incoming item'),
        R('{{ $input.all().length }}', 'عدد الـ items', 'The number of items'),
        R('{{ $json.items[0].price }}', 'أول عنصر في array', 'The first element of an array'),
        R('{{ $json.user?.phone }}', 'من غير خطأ لو user مش موجود', 'No error when user is missing')
      ] },
      { t: { ar: 'شروط وقيم بديلة', en: 'Conditions and fallbacks' }, rows: [
        R("{{ $json.total > 1000 ? 'VIP' : 'normal' }}", 'شرط في سطر', 'An inline condition'),
        R("{{ $ifEmpty($json.phone, 'none') }}", 'قيمة بديلة لو فاضي', 'A fallback when empty'),
        R("{{ $json.city ?? 'Cairo' }}", 'قيمة بديلة لو null أو undefined', 'A fallback when null or undefined'),
        R("{{ $if($json.paid, 'yes', 'no') }}", 'شرط بدالة n8n', 'A condition with the n8n helper')
      ] },
      { t: { ar: 'نصوص وأرقام', en: 'Text and numbers' }, rows: [
        R('{{ $json.name.trim().toLowerCase() }}', 'تنضيف نص', 'Clean a text'),
        R('{{ $json.email.extractDomain() }}', 'الدومين من إيميل', 'The domain of an email'),
        R('{{ $json.email.isEmail() }}', 'إيميل صحيح؟', 'A valid email?'),
        R("{{ $json.tags.join(', ') }}", 'Array لنص', 'An array to text'),
        R('{{ $json.prices.sum() }}', 'مجموع array', 'The sum of an array'),
        R('{{ ($json.price * 1.14).round(2) }}', 'تقريب لرقمين', 'Round to two decimals'),
        R('{{ JSON.stringify($json) }}', 'الـ item كنص JSON', 'The item as JSON text')
      ] },
      { t: { ar: 'التواريخ (Luxon)', en: 'Dates (Luxon)' }, rows: [
        R("{{ $now.toFormat('yyyy-MM-dd') }}", 'تاريخ النهارده', "Today's date"),
        R('{{ $now.minus({ days: 7 }).toISO() }}', 'من أسبوع', 'A week ago'),
        R("{{ $today.plus({ days: 1 }).toFormat('cccc') }}", 'اسم يوم بكرة', "Tomorrow's weekday"),
        R("{{ DateTime.fromISO($json.date).toFormat('dd/MM/yyyy') }}", 'تحويل شكل تاريخ', 'Reformat a date'),
        R("{{ $now.setZone('Africa/Cairo').toFormat('HH:mm') }}", 'الساعة بتوقيت القاهرة', 'The time in Cairo')
      ] },
      { t: { ar: 'معلومات التشغيل', en: 'About the run' }, rows: [
        R('{{ $execution.id }}', 'رقم التشغيل', 'The execution id'),
        R('{{ $workflow.name }}', 'اسم الـ Workflow', 'The workflow name'),
        R('{{ $itemIndex }}', 'رقم الـ item الحالي', 'The current item index'),
        R("{{ $vars.API_BASE }}", 'متغير من Variables', 'A variable from Variables')
      ] }
    ] },
    { id: 'nodes', t: { ar: 'أهم نودات n8n', en: 'The main n8n nodes' }, sub: { ar: 'تعرف تعمل بيهم 80% من أي شغل.', en: 'Enough for 80% of any job.' }, groups: [
      { t: { ar: 'البداية (Triggers)', en: 'Starting (triggers)' }, rows: [
        R('Webhook', 'طلب HTTP من برّه يبدأ التشغيل', 'An HTTP request from outside starts a run'),
        R('Schedule Trigger', 'مواعيد ثابتة (كل ساعة، كل يوم 9)', 'A fixed schedule (hourly, daily at 9)'),
        R('n8n Form Trigger', 'فورم جاهز من n8n', 'A form hosted by n8n'),
        R('Chat Trigger', 'رسايل شات لوكيل AI', 'Chat messages for an AI agent'),
        R('Error Trigger', 'لما Workflow تاني يقع', 'When another workflow fails'),
        R('<App> Trigger', 'حدث في خدمة (صف جديد، رسالة…)', 'An event in a service (new row, message…)')
      ] },
      { t: { ar: 'تعديل البيانات', en: 'Changing data' }, rows: [
        R('Edit Fields (Set)', 'ضيف / غيّر / شيل حقول', 'Add / change / remove fields'),
        R('Code', 'JavaScript أو Python على الـ items', 'JavaScript or Python on the items'),
        R('Split Out', 'Array جوه item ← items', 'An array inside an item → items'),
        R('Aggregate', 'items كتير ← item واحد', 'Many items → one item'),
        R('Remove Duplicates', 'شيل المكرر', 'Remove duplicates'),
        R('Date & Time', 'حسابات وتحويل تواريخ', 'Date maths and formats'),
        R('Sort / Limit', 'ترتيب / أول كام item', 'Sort / keep the first N items')
      ] },
      { t: { ar: 'التحكم في المسار', en: 'Controlling the flow' }, rows: [
        R('If', 'فرعين: صح وغلط', 'Two branches: true and false'),
        R('Switch', 'فروع كتير حسب قيمة', 'Many branches by a value'),
        R('Filter', 'سيب اللي بيحقق الشرط بس', 'Keep only matching items'),
        R('Merge', 'اجمع فرعين', 'Join two branches'),
        R('Loop Over Items', 'دفعات واحدة واحدة', 'Batches, one at a time'),
        R('Wait', 'استنى وقت أو webhook', 'Wait for a time or a webhook'),
        R('Execute Workflow', 'شغّل Sub-workflow', 'Run a sub-workflow')
      ] },
      { t: { ar: 'الكلام مع الخدمات', en: 'Talking to services' }, rows: [
        R('HTTP Request', 'أي API (GET / POST…)', 'Any API (GET / POST…)'),
        R('Respond to Webhook', 'ارجع رد للي نادى', 'Reply to the caller'),
        R('Google Sheets / Gmail', 'جداول وإيميل', 'Sheets and email'),
        R('Telegram / Slack', 'رسايل وتنبيهات', 'Messages and alerts'),
        R('Postgres / MySQL', 'قواعد بيانات', 'Databases'),
        R('AI Agent', 'وكيل بموديل وأدوات وذاكرة', 'An agent with a model, tools and memory'),
        R('Basic LLM Chain', 'برومبت ← رد (من غير أدوات)', 'Prompt → reply (no tools)')
      ] },
      { t: { ar: 'إعدادات أي نود', en: 'Settings on any node' }, rows: [
        R('Retry On Fail', 'يعيد لو فشل (3 مرات مثلًا)', 'Retry on failure (3 times, say)'),
        R('On Error → Continue', 'كمّل ولو النود وقعت', 'Continue even when the node fails'),
        R('Always Output Data', 'طلّع item فاضي بدل ولا حاجة', 'Output an empty item instead of nothing'),
        R('Execute Once', 'اشتغل مرة لأول item بس', 'Run once, for the first item only')
      ] }
    ] },
    { id: 'js', t: { ar: 'JavaScript لنود Code', en: 'JavaScript for the Code node' }, sub: { ar: 'الأساسيات اللي هتكتبها كل يوم.', en: 'The basics you will write every day.' }, groups: [
      { t: { ar: 'نود Code', en: 'The Code node' }, rows: [
        R('return $input.all().map(i => ({ json: { ...i.json, ok: true } }));', 'All Items: عدّل كل الـ items', 'All items: change every item'),
        R('return { json: { ...$json, total: $json.a + $json.b } };', 'Each Item: item واحد في المرة', 'Each item: one item at a time'),
        R("const rows = $('Sheet').all();", 'بيانات نود تانية', "Another node's data"),
        R("console.log($json);", 'اطبع في الـ console بتاع المتصفح', "Print to the browser's console")
      ] },
      { t: { ar: 'Arrays', en: 'Arrays' }, rows: [
        R('arr.map(x => x * 2)', 'حوّل كل عنصر', 'Transform each element'),
        R("arr.filter(o => o.status === 'paid')", 'سيب اللي بيحقق شرط', 'Keep matching elements'),
        R('arr.find(o => o.id === 7)', 'أول عنصر مطابق', 'The first match'),
        R('arr.reduce((s, x) => s + x, 0)', 'اجمع لقيمة واحدة', 'Reduce to one value'),
        R('arr.some(...) / arr.every(...)', 'فيه واحد؟ / كلهم؟', 'Any? / all?'),
        R('[...new Set(arr)]', 'شيل المكرر', 'Remove duplicates'),
        R('arr.sort((a, b) => a.price - b.price)', 'ترتيب بالرقم', 'Sort by a number'),
        R('arr.slice(0, 10)', 'أول 10', 'The first 10')
      ] },
      { t: { ar: 'Objects ونصوص', en: 'Objects and text' }, rows: [
        R('const { name, email } = obj;', 'طلّع حقول', 'Take fields out'),
        R('{ ...obj, city: "Cairo" }', 'نسخة بحقل جديد', 'A copy with a new field'),
        R('Object.keys(obj) / Object.entries(obj)', 'المفاتيح / الأزواج', 'The keys / the pairs'),
        R('obj?.a?.b ?? "none"', 'وصول آمن + قيمة بديلة', 'Safe access + fallback'),
        R('`Hi ${name}`', 'نص فيه متغير', 'A template string'),
        R("s.split(',').map(x => x.trim())", 'قسّم نص', 'Split a text'),
        R("s.replace(/\\s+/g, ' ')", 'Regex استبدال', 'A regex replace'),
        R('JSON.parse(s) / JSON.stringify(o)', 'نص ↔ object', 'Text ↔ object')
      ] },
      { t: { ar: 'Async والأخطاء', en: 'Async and errors' }, rows: [
        R('const r = await this.helpers.httpRequest({ url });', 'طلب HTTP جوه Code', 'An HTTP request inside Code'),
        R('try { ... } catch (e) { ... }', 'امسك الخطأ', 'Catch the error'),
        R("throw new Error('Missing email');", 'وقّف بخطأ واضح', 'Stop with a clear error'),
        R('Number(x) / parseFloat(x) / String(x)', 'تحويل أنواع', 'Convert types')
      ] }
    ] },
    { id: 'python', t: { ar: 'Python بسرعة', en: 'Python quickly' }, sub: { ar: 'للسكربتات ونود Code بـ Python.', en: 'For scripts and the Python Code node.' }, groups: [
      { t: { ar: 'الأساسيات', en: 'Basics' }, rows: [
        R("name = 'Sara'  # str", 'متغير نص', 'A text variable'),
        R("f'Hello {name}'", 'f-string', 'An f-string'),
        R('nums = [1, 2, 3]', 'list', 'A list'),
        R("user = {'name': 'Sara', 'age': 30}", 'dict', 'A dict'),
        R("user.get('phone', 'none')", 'قيمة بديلة', 'A fallback'),
        R('for i, x in enumerate(nums):', 'loop برقم', 'A loop with an index'),
        R('if x > 10: ... elif ...: ... else: ...', 'شروط', 'Conditions')
      ] },
      { t: { ar: 'Comprehensions ودوال', en: 'Comprehensions and functions' }, rows: [
        R('[x * 2 for x in nums if x > 1]', 'list comprehension', 'A list comprehension'),
        R('{k: v for k, v in d.items()}', 'dict comprehension', 'A dict comprehension'),
        R('def total(items, tax=0.14):', 'دالة بقيمة افتراضية', 'A function with a default'),
        R("sorted(rows, key=lambda r: r['price'], reverse=True)", 'ترتيب بمفتاح', 'Sort by a key'),
        R('sum(o["qty"] for o in orders)', 'مجموع', 'A sum')
      ] },
      { t: { ar: 'ملفات وJSON وطلبات', en: 'Files, JSON and requests' }, rows: [
        R("with open('a.txt', encoding='utf-8') as f:", 'فتح ملف', 'Open a file'),
        R('json.loads(s) / json.dumps(o, ensure_ascii=False)', 'JSON ↔ Python', 'JSON ↔ Python'),
        R("requests.get(url, timeout=10).json()", 'طلب API', 'An API request'),
        R("csv.DictReader(f)", 'قراية CSV', 'Read a CSV'),
        R('try: ... except ValueError as e: ...', 'امسك خطأ', 'Catch an error'),
        R('python -m venv .venv', 'بيئة افتراضية', 'A virtual environment'),
        R('pip install requests', 'تثبيت مكتبة', 'Install a package')
      ] }
    ] },
    { id: 'sql', t: { ar: 'SQL', en: 'SQL' }, sub: { ar: 'اللي بتحتاجه مع Postgres أو MySQL في n8n.', en: 'What you need with Postgres or MySQL in n8n.' }, groups: [
      { t: { ar: 'قراية', en: 'Reading' }, rows: [
        R('SELECT name, city FROM customers;', 'أعمدة من جدول', 'Columns from a table'),
        R("WHERE city = 'Cairo' AND joined >= '2026-01-01'", 'شروط', 'Conditions'),
        R("WHERE name LIKE '%pro%'", 'جزء من نص', 'Part of a text'),
        R('WHERE id IN (1, 2, 3)', 'ضمن قايمة', 'In a list'),
        R('WHERE phone IS NULL', 'فاضي', 'Empty'),
        R('ORDER BY price DESC LIMIT 10', 'ترتيب وعدد', 'Sort and limit'),
        R('SELECT DISTINCT city FROM customers;', 'من غير تكرار', 'Without duplicates')
      ] },
      { t: { ar: 'تجميع', en: 'Grouping' }, rows: [
        R('SELECT COUNT(*) FROM orders;', 'عدد', 'A count'),
        R('SUM(x) / AVG(x) / MIN(x) / MAX(x)', 'دوال التجميع', 'Aggregate functions'),
        R('GROUP BY status', 'تجميع حسب عمود', 'Group by a column'),
        R('HAVING COUNT(*) > 5', 'شرط على المجموعات', 'A condition on groups')
      ] },
      { t: { ar: 'الربط', en: 'Joins' }, rows: [
        R('JOIN customers c ON c.id = o.customer_id', 'الصفوف المتطابقة بس', 'Matching rows only'),
        R('LEFT JOIN orders o ON o.customer_id = c.id', 'كل الشمال حتى لو مفيش تطابق', 'All left rows even without a match'),
        R('WITH t AS (SELECT ...) SELECT ... FROM t', 'CTE (استعلام مؤقت)', 'A CTE (a named subquery)')
      ] },
      { t: { ar: 'كتابة', en: 'Writing' }, rows: [
        R("INSERT INTO t (a, b) VALUES (1, 'x');", 'إضافة صف', 'Insert a row'),
        R("UPDATE t SET b = 'y' WHERE id = 1;", 'تعديل (متنساش WHERE!)', 'Update (never forget WHERE!)'),
        R('DELETE FROM t WHERE id = 1;', 'مسح', 'Delete'),
        R('... ON CONFLICT (email) DO UPDATE SET ...', 'Upsert في Postgres', 'Upsert in Postgres'),
        R('CREATE INDEX ON orders (customer_id);', 'Index يسرّع البحث', 'An index to speed up lookups'),
        R('SELECT * FROM t WHERE id = $1', 'Query parameters (ضد SQL injection)', 'Query parameters (against SQL injection)')
      ] }
    ] },
    { id: 'git', t: { ar: 'Git وGitHub', en: 'Git and GitHub' }, sub: { ar: 'احفظ شغلك واعرضه كبورتفوليو.', en: 'Save your work and show it as a portfolio.' }, groups: [
      { t: { ar: 'كل يوم', en: 'Every day' }, rows: [
        R('git status', 'إيه اللي اتغيّر', 'What changed'),
        R('git add file.js  /  git add .', 'جهّز للحفظ', 'Stage for commit'),
        R('git commit -m "Add retry to webhook"', 'احفظ نسخة', 'Save a version'),
        R('git push', 'ارفع على GitHub', 'Upload to GitHub'),
        R('git pull', 'نزّل آخر تعديلات', 'Download the latest changes'),
        R('git log --oneline', 'تاريخ مختصر', 'A short history'),
        R('git diff', 'الفرق قبل الحفظ', 'The changes before commit')
      ] },
      { t: { ar: 'Branches', en: 'Branches' }, rows: [
        R('git switch -c feature/login', 'فرع جديد', 'A new branch'),
        R('git switch main', 'ارجع للرئيسي', 'Back to main'),
        R('git merge feature/login', 'ادمج فرع', 'Merge a branch'),
        R('git branch -d feature/login', 'امسح فرع اتدمج', 'Delete a merged branch')
      ] },
      { t: { ar: 'إنقاذ', en: 'Rescue' }, rows: [
        R('git restore file.js', 'الغي تعديل ملف لسه ماتحفظش', 'Undo unsaved changes in a file'),
        R('git restore --staged file.js', 'شيله من التجهيز', 'Unstage a file'),
        R('git commit --amend', 'عدّل آخر commit (قبل الـ push)', 'Change the last commit (before pushing)'),
        R('git revert <sha>', 'commit بيلغي commit قديم', 'A commit that undoes an old one'),
        R('git stash / git stash pop', 'خبّي التعديلات مؤقتًا', 'Put changes aside for now')
      ] },
      { t: { ar: 'متعملش', en: 'Never' }, rows: [
        R('.env', 'متحطش أسرار في Git: ضيفه في .gitignore', 'Keep secrets out of Git: add it to .gitignore'),
        R('git push --force', 'بيمسح شغل غيرك على الفرع', "Erases other people's work on the branch")
      ] }
    ] },
    { id: 'docker', t: { ar: 'Docker لـ n8n', en: 'Docker for n8n' }, sub: { ar: 'تشغيل n8n على سيرفر وصيانته.', en: 'Running and maintaining n8n on a server.' }, groups: [
      { t: { ar: 'تشغيل', en: 'Running' }, rows: [
        R('docker run -it --rm -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n', 'n8n بسرعة للتجربة', 'n8n quickly for testing'),
        R('docker compose up -d', 'شغّل من compose.yaml في الخلفية', 'Start from compose.yaml in the background'),
        R('docker compose down', 'وقّف (البيانات فاضلة في الـ volume)', 'Stop (data stays in the volume)'),
        R('docker compose pull && docker compose up -d', 'حدّث n8n', 'Update n8n'),
        R('docker compose restart n8n', 'إعادة تشغيل', 'Restart')
      ] },
      { t: { ar: 'متابعة', en: 'Checking' }, rows: [
        R('docker ps', 'اللي شغال', "What's running"),
        R('docker compose logs -f n8n', 'الـ logs على الهوا', 'Live logs'),
        R('docker stats', 'الذاكرة والمعالج', 'Memory and CPU'),
        R('docker exec -it n8n sh', 'ادخل جوه الـ container', 'Get a shell inside the container'),
        R('docker volume ls', 'الـ volumes (البيانات)', 'Volumes (the data)')
      ] },
      { t: { ar: 'متغيرات مهمة في n8n', en: 'Important n8n variables' }, rows: [
        R('N8N_ENCRYPTION_KEY', 'احفظه! من غيره الـ Credentials مش هتتفتح', 'Keep it! Without it credentials cannot be decrypted'),
        R('WEBHOOK_URL=https://n8n.example.com/', 'عنوان الـ webhooks الحقيقي', 'The real webhook address'),
        R('GENERIC_TIMEZONE=Africa/Cairo', 'توقيت الـ Schedule', 'The schedule time zone'),
        R('DB_TYPE=postgresdb', 'Postgres بدل SQLite للإنتاج', 'Postgres instead of SQLite for production'),
        R('EXECUTIONS_DATA_PRUNE=true', 'امسح التشغيلات القديمة', 'Delete old executions')
      ] }
    ] },
    { id: 'http', t: { ar: 'HTTP وAPIs', en: 'HTTP and APIs' }, sub: { ar: 'تفهم أي رد من أي API.', en: 'Understand any reply from any API.' }, groups: [
      { t: { ar: 'Methods', en: 'Methods' }, rows: [
        R('GET', 'هات بيانات', 'Get data'),
        R('POST', 'ابعت / اعمل جديد', 'Send / create'),
        R('PUT / PATCH', 'استبدل / عدّل جزء', 'Replace / change part'),
        R('DELETE', 'امسح', 'Delete')
      ] },
      { t: { ar: 'Status codes', en: 'Status codes' }, rows: [
        R('200 OK / 201 Created', 'تمام / اتعمل', 'OK / created'),
        R('204 No Content', 'تمام ومفيش رد', 'OK with no body'),
        R('400 Bad Request', 'الطلب نفسه غلط (شكل البيانات)', 'The request itself is wrong (data shape)'),
        R('401 Unauthorized', 'مفيش أو غلط في بيانات الدخول', 'Missing or wrong credentials'),
        R('403 Forbidden', 'داخل بس مش مسموحلك', 'Signed in but not allowed'),
        R('404 Not Found', 'الرابط أو العنصر مش موجود', 'The URL or the item does not exist'),
        R('409 Conflict', 'تعارض (موجود قبل كده)', 'A conflict (already exists)'),
        R('422 Unprocessable', 'البيانات مش مقبولة (validation)', 'The data is not accepted (validation)'),
        R('429 Too Many Requests', 'بعت كتير: استنى وقلّل (rate limit)', 'Too many: wait and slow down (rate limit)'),
        R('500 / 502 / 503', 'مشكلة عند السيرفر: جرّب تاني بعدين', 'A server problem: retry later')
      ] },
      { t: { ar: 'Headers ومصادقة', en: 'Headers and auth' }, rows: [
        R('Content-Type: application/json', 'الجسم JSON', 'The body is JSON'),
        R('Authorization: Bearer <token>', 'Token (حطه في Credentials)', 'A token (keep it in Credentials)'),
        R('X-API-Key: <key>', 'مفتاح في هيدر', 'A key in a header'),
        R('?page=2&limit=50', 'Pagination في query', 'Pagination in the query'),
        R('curl -X POST url -H "Content-Type: application/json" -d \'{"a":1}\'', 'جرّب من الطرفية (وImport cURL في n8n)', 'Try from the terminal (and Import cURL in n8n)')
      ] }
    ] },
    { id: 'regex', t: { ar: 'Regex', en: 'Regex' }, sub: { ar: 'تنضيف وتطليع بيانات من النصوص.', en: 'Cleaning and extracting data from text.' }, groups: [
      { t: { ar: 'الرموز', en: 'Symbols' }, rows: [
        R('.', 'أي حرف', 'Any character'),
        R('\\d  \\w  \\s', 'رقم، حرف أو رقم أو _، مسافة', 'A digit, a word character, a space'),
        R('[abc]  [^abc]  [a-z]', 'واحد من / مش من / مدى', 'One of / none of / a range'),
        R('*  +  ?  {3}  {2,5}', 'صفر أو أكتر، واحد أو أكتر، اختياري، عدد', 'Zero or more, one or more, optional, a count'),
        R('^  $', 'أول / آخر السطر', 'Start / end of line'),
        R('( )  (?: )  |', 'مجموعة، مجموعة من غير حفظ، أو', 'A group, a non-capturing group, or'),
        R('\\b', 'حدود كلمة', 'A word boundary')
      ] },
      { t: { ar: 'جاهزة', en: 'Ready-made' }, rows: [
        R('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', 'إيميل (تقريبي)', 'An email (roughly)'),
        R('^01[0125]\\d{8}$', 'موبايل مصري', 'An Egyptian mobile'),
        R('\\d{4}-\\d{2}-\\d{2}', 'تاريخ 2026-09-30', 'A date like 2026-09-30'),
        R('https?:\\/\\/[^\\s]+', 'رابط', 'A link'),
        R('<[^>]+>', 'HTML tags (للتشيل)', 'HTML tags (to remove)')
      ] },
      { t: { ar: 'في JavaScript', en: 'In JavaScript' }, rows: [
        R('/\\d+/.test(s)', 'فيه تطابق؟', 'Is there a match?'),
        R('s.match(/\\d+/g)', 'كل التطابقات', 'Every match'),
        R("s.replace(/\\s+/g, ' ')", 'استبدال', 'Replace'),
        R('/abc/i', 'i: من غير حالة الحروف', 'i: ignore case'),
        R('regex101.com', 'جرّب واشرح أي Regex', 'Try and explain any regex')
      ] }
    ] },
    { id: 'tenses', t: { ar: 'أزمنة الإنجليزي للشغل', en: 'English tenses for work' }, sub: { ar: 'كل زمن ومتى تستخدمه في الشغل، بمثال.', en: 'Each tense and when to use it at work, with an example.' }, groups: [
      { t: { ar: 'الحاضر', en: 'Present' }, rows: [
        R('The script runs every night.', 'Present simple: حقيقة أو عادة', 'Present simple: a fact or habit'),
        R('I am fixing the login bug.', 'Present continuous: شغال فيه دلوقتي', 'Present continuous: happening now'),
        R('I have deployed the fix.', 'Present perfect: خلص والنتيجة مهمة دلوقتي', 'Present perfect: done, the result matters now'),
        R('I have been testing it since 9.', 'Present perfect continuous: من وقت لحد دلوقتي', 'Present perfect continuous: from a time until now')
      ] },
      { t: { ar: 'الماضي', en: 'Past' }, rows: [
        R('I fixed it yesterday.', 'Past simple: وقت محدد خلص', 'Past simple: a finished, known time'),
        R('I was testing when it crashed.', 'Past continuous: كان شغال لما حصل حاجة', 'Past continuous: in progress when something happened'),
        R('It had failed before I restarted it.', 'Past perfect: قبل حاجة تانية في الماضي', 'Past perfect: before another past event')
      ] },
      { t: { ar: 'المستقبل', en: 'Future' }, rows: [
        R('I will send it tonight.', 'will: قرار أو وعد', 'will: a decision or promise'),
        R('I am going to refactor this module.', 'going to: خطة', 'going to: a plan'),
        R('The release is on Monday.', 'Present simple لجدول ثابت', 'Present simple for a timetable'),
        R('I am meeting the client at 3.', 'Present continuous لميعاد متفق عليه', 'Present continuous for an arranged meeting')
      ] },
      { t: { ar: 'جمل شرطية ومبني للمجهول', en: 'Conditionals and the passive' }, rows: [
        R('If the API fails, the workflow retries.', 'Zero: قاعدة دايمة', 'Zero: always true'),
        R('If you send the file, I will check it.', 'First: احتمال حقيقي', 'First: a real possibility'),
        R('If we had more time, we would add tests.', 'Second: افتراض', 'Second: imagined'),
        R('The data is stored in Postgres.', 'Passive: المهم الفعل مش الفاعل', 'Passive: the action matters, not who did it'),
        R('The bug was reported by a client.', 'Passive في الماضي', 'Passive in the past')
      ] }
    ] },
    { id: 'phrases', t: { ar: 'جمل جاهزة للشغل', en: 'Ready phrases for work' }, sub: { ar: 'انسخ واستخدم في الإيميلات والاجتماعات والـ PRs.', en: 'Copy and use in emails, meetings and PRs.' }, groups: [
      { t: { ar: 'إيميلات ورسايل', en: 'Emails and messages' }, rows: [
        R('Just a quick update on…', 'تحديث سريع عن…', 'A quick update on…'),
        R('Could you please…?', 'ممكن لو سمحت…؟', 'A polite request'),
        R('I will get back to you by…', 'هرد عليك قبل…', 'I will reply by…'),
        R('Please find attached…', 'مرفق…', 'Attached is…'),
        R('Let me know if you have any questions.', 'قولّي لو عندك أسئلة', 'Tell me if you have questions'),
        R('Sorry for the delay.', 'آسف على التأخير', 'Sorry for the late reply')
      ] },
      { t: { ar: 'اجتماعات', en: 'Meetings' }, rows: [
        R('Can you hear me?  /  You are on mute.', 'سامعني؟ / المايك مقفول', 'Can you hear me? / Your mic is off'),
        R('Could you repeat that, please?', 'ممكن تعيد؟', 'Could you say it again?'),
        R('Just to confirm, …', 'بس عشان أتأكد…', 'To confirm…'),
        R('Let us take it offline.', 'نتكلم فيها بعدين', 'We will discuss it later'),
        R('I will share my screen.', 'هشارك الشاشة', 'I will share my screen')
      ] },
      { t: { ar: 'الكود والمراجعة', en: 'Code and review' }, rows: [
        R('LGTM', 'شكله تمام وموافق', 'Looks good to me'),
        R('Nit: …', 'ملاحظة صغيرة', 'A small, optional note'),
        R('WIP', 'لسه شغال عليه', 'Work in progress'),
        R('It works on my machine.', 'شغال عندي (والمشكلة في البيئة)', 'Works for me (the environment differs)'),
        R('Could you add a test for this?', 'ممكن تضيف اختبار؟', 'Please add a test'),
        R('Good catch!', 'لقطة حلوة', 'Nice find')
      ] },
      { t: { ar: 'مع العملاء', en: 'With clients' }, rows: [
        R('What is the most painful part of…?', 'إيه أكتر حاجة متعباك في…؟', 'Ask for the real problem'),
        R('As a next step, I will…', 'الخطوة الجاية هعمل…', 'State the next step'),
        R('That is out of scope, but I can quote it separately.', 'ده برّه الاتفاق، وأقدر أسعّره لوحده', 'Handle scope creep'),
        R('The estimate is between… and…', 'التقدير ما بين… و…', 'Give a range')
      ] }
    ] }
  ]
});
})();
