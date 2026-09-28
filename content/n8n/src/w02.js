// n8n week 2 — Terminal, Git and JSON for automators.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الطرفية وGit وJSON للي بيأتمت', 'Terminal, Git and JSON for automators'),
  goal: B('تشتغل من الطرفية براحتك (PowerShell أو Bash)، وتشغّل n8n وتحدّثه منها، وتحفظ الـ workflows في Git، وتقرا وتكتب JSON من غير أخطاء، وتختبر APIs بـ curl.',
          'Work comfortably in the terminal (PowerShell or Bash), run and update n8n from it, keep your workflows in Git, read and write JSON without errors, and test APIs with curl.'),
  days: [
    { title: B('الطرفية: تتحرك وتشغّل', 'The terminal: moving around and running things'),
      goal: B('تتنقل بين الفولدرات، وتعمل وتمسح ملفات، وتشغّل n8n وأوامر بأمان.', 'Move between folders, create and delete files, and run n8n and other commands safely.'),
      learn: [
        { h: B('الأوامر الأساسية', 'The basic commands'),
          p: B('`pwd` انت فين، `ls` (أو `dir`) إيه اللي هنا، `cd folder` ادخل، `cd ..` ارجع، `mkdir` اعمل فولدر، `cat file` اقرا ملف. نفس الفكرة في PowerShell وBash مع اختلافات بسيطة.', '`pwd` where you are, `ls` (or `dir`) what is here, `cd folder` go in, `cd ..` go up, `mkdir` make a folder, `cat file` read a file. The same ideas work in PowerShell and Bash with small differences.'),
          ex: 'mkdir n8n-projects\ncd n8n-projects\nls\ncat notes.txt' },
        { h: B('تشغيل n8n من الطرفية', 'Running n8n from the terminal'),
          p: B('`npx n8n` بيشغّل آخر نسخة من غير تثبيت دايم، و`npm install -g n8n` بيثبّتها. الطرفية لازم تفضل مفتوحة، و`Ctrl+C` بيوقف n8n.', '`npx n8n` runs the latest version without a permanent install, and `npm install -g n8n` installs it. The terminal must stay open; `Ctrl+C` stops n8n.'),
          ex: 'node -v        # check Node.js is installed\nnpx n8n        # start n8n on http://localhost:5678\nCtrl+C         # stop it' },
        { h: B('متغيّرات البيئة', 'Environment variables'),
          p: B('n8n بيتظبط بمتغيّرات بيئة. في PowerShell: `$env:GENERIC_TIMEZONE="Africa/Cairo"`، وفي Bash: `export GENERIC_TIMEZONE=Africa/Cairo`، وبعدين شغّل n8n في نفس الطرفية.', 'n8n is configured with environment variables. In PowerShell: `$env:GENERIC_TIMEZONE="Africa/Cairo"`; in Bash: `export GENERIC_TIMEZONE=Africa/Cairo`; then start n8n in the same terminal.'),
          ex: '$env:GENERIC_TIMEZONE = "Africa/Cairo"   # PowerShell\nexport GENERIC_TIMEZONE=Africa/Cairo     # Bash\nnpx n8n' }
      ],
      practice: [
        B('اعمل فولدر `n8n-projects` وجواه 3 فولدرات، وادخل واطلع منهم بالأوامر بس.', 'Create an `n8n-projects` folder with 3 folders inside, and move in and out of them using commands only.'),
        B('اتأكد إن Node.js متثبت (`node -v`) وشغّل n8n بـ `npx n8n` ووقّفه بـ Ctrl+C.', 'Check Node.js is installed (`node -v`), start n8n with `npx n8n` and stop it with Ctrl+C.'),
        B('ظبّط `GENERIC_TIMEZONE` على توقيتك وشغّل n8n، واتأكد إن `{{ $now }}` بيطلع الساعة الصح.', 'Set `GENERIC_TIMEZONE` to your timezone, start n8n and check that `{{ $now }}` shows the right time.'),
        B('اكتب ملف `commands.md` فيه 10 أوامر وجنب كل واحد بيعمل إيه.', 'Write a `commands.md` file with 10 commands and what each one does.')
      ],
      code: [
        { u: B('أوامر مكافئة', 'Equivalent commands'), p: 'Task            PowerShell            Bash\nlist files      Get-ChildItem (ls)    ls -la\nread a file     Get-Content f.txt     cat f.txt\nset a variable  $env:X="1"            export X=1\nclear screen    cls                   clear' }
      ],
      words: ['terminal', 'environment variable',
        { t: 'npx', m: B('بيشغّل حزمة npm من غير ما تثبتها دايمًا', 'runs an npm package without installing it permanently'), ex: 'npx n8n' },
        { t: 'path', m: B('مسار ملف أو فولدر على الجهاز', 'the location of a file or folder on the computer'), ex: 'C:\\Users\\me\\n8n-projects' },
        { t: 'working directory', m: B('الفولدر اللي الطرفية واقفة فيه دلوقتي', 'the folder the terminal is currently in'), ex: 'pwd shows the working directory.' }],
      read: ['lib:PowerShell 101 (Microsoft Learn)', { lib: 'explainshell', what: B('الزق فيه 3 أوامر Bash بتستخدمها وشوف كل جزء بيعمل إيه.', 'Paste 3 Bash commands you use and see what each part does.') }],
      challenge: B('اكتب سكربت صغير (`start-n8n.ps1` أو `start-n8n.sh`) بيظبط التوقيت ويشغّل n8n، وشغّله.', 'Write a small script (`start-n8n.ps1` or `start-n8n.sh`) that sets the timezone and starts n8n, and run it.'),
      quiz: [
        { q: B('`cd ..` بيعمل إيه؟', 'What does `cd ..` do?'), o: [B('يرجع فولدر لفوق', 'goes up one folder'), B('يمسح الفولدر', 'deletes the folder'), B('يعرض الملفات', 'lists the files')], a: 0, why: B('`..` = الفولدر الأب.', '`..` = the parent folder.') },
        { q: B('إزاي توقف n8n اللي شغال في الطرفية؟', 'How do you stop n8n running in the terminal?'), o: ['Ctrl+C', 'Ctrl+S', B('تقفل المتصفح', 'close the browser')], a: 0, why: B('Ctrl+C بيوقف البرنامج الشغال.', 'Ctrl+C stops the running program.') },
        { q: B('في Bash، تعمل متغيّر بيئة بـ:', 'In Bash you set an environment variable with:'), o: ['export X=1', '$env:X="1"', 'set-var X 1'], a: 0, why: B('`$env:` ده PowerShell.', '`$env:` is PowerShell.') }
      ] },

    { title: B('JSON بإيدك', 'JSON by hand'),
      goal: B('تكتب JSON صحيح، وتلاقي الغلط فيه، وتفهم الفرق بين object وarray، وإزاي n8n بيشوفه.', 'Write valid JSON, find mistakes in it, understand objects vs. arrays, and see how n8n reads it.'),
      learn: [
        { h: B('قواعد JSON', 'JSON rules'),
          p: B('المفاتيح والنصوص بين علامات تنصيص مزدوجة "، مفيش فاصلة بعد آخر عنصر، والقيم: string أو number أو true/false أو null أو object {} أو array [].', 'Keys and strings use double quotes ", no comma after the last item, and values are a string, number, true/false, null, an object {} or an array [].'),
          ex: '{\n  "name": "Ali",\n  "age": 30,\n  "active": true,\n  "tags": ["vip", "cairo"],\n  "address": { "city": "Cairo" }\n}' },
        { h: B('أشهر 4 أخطاء', 'The four most common mistakes'),
          p: B('فاصلة زيادة في الآخر، علامات تنصيص مفردة \'، مفتاح من غير تنصيص، وتعليقات // (JSON مفيهوش تعليقات).', 'A trailing comma, single quotes \', a key without quotes, and // comments (JSON has no comments).'),
          ex: '✗ { name: \'Ali\', }\n✓ { "name": "Ali" }' },
        { h: B('JSON جوه n8n', 'JSON inside n8n'),
          p: B('كل item في n8n هو object، والبيانات كلها array من items. تقدر تلزق JSON في Code node أو Edit Fields (JSON mode) أو في Pin Data.', 'Every n8n item is an object, and the data is an array of items. You can paste JSON into a Code node, Edit Fields (JSON mode) or Pin Data.'),
          ex: '[\n  { "json": { "name": "Ali" } },\n  { "json": { "name": "Sara" } }\n]' }
      ],
      practice: [
        B('اكتب بإيدك JSON لعميل فيه اسم وإيميل وقايمة طلبات (كل طلب object).', 'Write JSON by hand for a customer with a name, an email and a list of orders (each order an object).'),
        B('صلّح 5 JSON غلط (هتلاقيهم في قسم «انسخ واستخدم») واتأكد بـ JSONLint.', 'Fix 5 broken JSON snippets (in "Copy and use") and check them with JSONLint.'),
        B('الزق الـ JSON بتاعك في Edit Fields بـ JSON mode، وشوفه في Table وJSON وSchema.', 'Paste your JSON into Edit Fields in JSON mode, and view it as Table, JSON and Schema.'),
        B('اقرا بـ Expression قيمة جوه nested object: `{{ $json.address.city }}` وقيمة من array: `{{ $json.tags[0] }}`.', 'Read a nested value with an expression: `{{ $json.address.city }}`, and one from an array: `{{ $json.tags[0] }}`.')
      ],
      code: [
        { u: B('JSON فيه أخطاء تصلحها', 'Broken JSON to fix'), p: '{ "name": "Ali", }\n{ \'city\': \'Cairo\' }\n{ age: 30 }\n{ "items": [1, 2, 3,] }\n{ "ok": True }' }
      ],
      words: ['array / object', 'key / value',
        { t: 'JSON validator', m: B('أداة بتقولك الـ JSON صح ولا فيه غلط وفين', 'a tool that tells you whether JSON is valid and where the error is'), ex: 'Paste it into JSONLint before using it.' },
        { t: 'trailing comma', m: B('فاصلة زيادة بعد آخر عنصر، بتبوّظ JSON', 'an extra comma after the last item; it breaks JSON'), ex: '[1, 2, 3,]  ← trailing comma' },
        { t: 'JSON schema (shape)', m: B('شكل البيانات: المفاتيح وأنواعها', 'the shape of the data: the keys and their types'), ex: 'The Schema view shows the shape of each item.' }],
      read: ['lib:JSON.org', 'lib:JSONLint'],
      challenge: B('خد response حقيقي من أي API عام (JSONPlaceholder مثلًا)، واكتب لكل حقل مهم الـ Expression اللي يقراه في n8n.', 'Take a real response from any public API (JSONPlaceholder, for example) and write the n8n expression that reads each important field.'),
      quiz: [
        { q: B('أنهي JSON صحيح؟', 'Which JSON is valid?'), o: ['{ "a": 1, }', '{ "a": 1 }', "{ 'a': 1 }"], a: 1, why: B('من غير فاصلة زيادة وبعلامات تنصيص مزدوجة.', 'No trailing comma, and double quotes.') },
        { q: B('إزاي تقرا أول tag في `{"tags":["vip","new"]}`؟', 'How do you read the first tag in `{"tags":["vip","new"]}`?'), o: ['{{ $json.tags[0] }}', '{{ $json.tags[1] }}', '{{ $json.tags.first }}'], a: 0, why: B('الـ array بيبدأ من 0.', 'Arrays start at 0.') },
        { q: B('JSON بيسمح بالتعليقات؟', 'Does JSON allow comments?'), o: [B('لأ', 'No'), B('أيوه بـ //', 'Yes, with //'), B('أيوه بـ #', 'Yes, with #')], a: 0, why: B('JSON مفيهوش تعليقات خالص.', 'JSON has no comments at all.') }
      ] },

    { title: B('Git للـ workflows', 'Git for workflows'),
      goal: B('تعمل repo للـ workflows بتاعتك، وتحفظ كل workflow كملف JSON، وتعمل commit وpush.', 'Create a repo for your workflows, save each workflow as a JSON file, and commit and push.'),
      learn: [
        { h: B('ليه Git مع n8n', 'Why Git with n8n'),
          p: B('عشان ترجع لنسخة قديمة لو حاجة باظت، وتعرف مين غيّر إيه، وتنقل workflows بين أجهزة. كل workflow بيتصدّر كملف JSON (Download) ويتحط في Git.', 'To go back to an old version when something breaks, see who changed what, and move workflows between machines. Each workflow exports as a JSON file (Download) that goes into Git.'),
          ex: 'workflows/\n  lead-alert.json\n  daily-report.json\nREADME.md' },
        { h: B('الدورة الأساسية', 'The basic cycle'),
          p: B('`git init` مرة واحدة، وبعدين كل مرة: `git add` ← `git commit -m "…"` ← `git push`. و`git status` بيقولك إيه اللي اتغيّر، و`git log --oneline` التاريخ.', '`git init` once, then every time: `git add` → `git commit -m "…"` → `git push`. `git status` shows what changed and `git log --oneline` shows the history.'),
          ex: 'git init\ngit add workflows/lead-alert.json\ngit commit -m "Add lead alert workflow"\ngit push' },
        { h: B('متحطش أسرار في Git', 'Keep secrets out of Git'),
          p: B('ملف الـ workflow مفيهوش الـ credentials نفسها (بيشاور عليها بالاسم)، بس ممكن يكون فيه URLs أو IDs حساسة. وملفات زي `.env` لازم في `.gitignore`.', 'An exported workflow doesn\'t contain the credentials themselves (it points to them by name), but it may hold sensitive URLs or IDs. Files like `.env` must go into `.gitignore`.'),
          ex: '# .gitignore\n.env\n*.sqlite\nnode_modules/' }
      ],
      practice: [
        B('اعمل repo اسمه `my-n8n-workflows` على GitHub ونزّله على جهازك.', 'Create a repo called `my-n8n-workflows` on GitHub and clone it.'),
        B('صدّر 2 workflows من n8n (Download) وحطهم في فولدر `workflows/` واعمل commit.', 'Export 2 workflows from n8n (Download), put them in a `workflows/` folder and commit.'),
        B('غيّر حاجة في workflow وصدّره تاني، وشوف الفرق بـ `git diff`.', 'Change something in a workflow, export it again, and look at the difference with `git diff`.'),
        B('اعمل `.gitignore` فيه `.env` واتأكد بـ `git status` إن الملف مش ظاهر.', 'Create a `.gitignore` with `.env` and check with `git status` that the file is not listed.')
      ],
      words: ['repository', 'commit', 'push / pull / clone', '.gitignore',
        { t: 'git diff', m: B('بيعرض الفرق بين نسختين من الملفات', 'shows the difference between two versions of files'), ex: 'git diff workflows/lead-alert.json' }],
      read: ['lib:Pro Git', 'lib:Oh Shit, Git!?!'],
      challenge: B('اعمل README للـ repo فيه جدول: اسم كل workflow، وبيعمل إيه، والـ trigger بتاعه، والـ credentials اللي محتاجها.', 'Write a README for the repo with a table: each workflow\'s name, what it does, its trigger and the credentials it needs.'),
      quiz: [
        { q: B('الترتيب الصح:', 'The correct order:'), o: ['commit → add → push', 'add → commit → push', 'push → add → commit'], a: 1, why: B('تجهّز، تسجّل، ترفع.', 'Stage, record, upload.') },
        { q: B('ملف الـ workflow المتصدّر فيه الباسوردات؟', 'Does an exported workflow contain the passwords?'), o: [B('لأ، بيشاور على الـ credential بالاسم', 'No, it refers to the credential by name'), B('أيوه دايمًا', 'Yes, always'), B('أيوه مشفّرة', 'Yes, encrypted')], a: 0, why: B('الـ credentials بتفضل جوه n8n.', 'Credentials stay inside n8n.') },
        { q: B('`.gitignore` بيعمل إيه؟', 'What does `.gitignore` do?'), o: [B('بيقول لـ Git يتجاهل ملفات معينة', 'tells Git to ignore certain files'), B('بيمسح الملفات', 'deletes files'), B('بيخبي الـ repo', 'hides the repo')], a: 0, why: B('زي .env وnode_modules.', 'Like .env and node_modules.') }
      ] },

    { title: B('curl واختبار الـ APIs', 'curl and testing APIs'),
      goal: B('تبعت طلبات HTTP من الطرفية بـ curl، وتستورد أمر curl في HTTP Request node.', 'Send HTTP requests from the terminal with curl, and import a curl command into the HTTP Request node.'),
      learn: [
        { h: B('curl في سطر', 'curl in one line'),
          p: B('`curl URL` = GET. `-X POST` نوع الطلب، `-H` header، `-d` body. وعلى Windows استخدم `curl.exe` عشان PowerShell عنده alias اسمه curl بيعمل حاجة تانية.', '`curl URL` = GET. `-X POST` sets the method, `-H` a header, `-d` the body. On Windows use `curl.exe`, because PowerShell has a different command aliased as curl.'),
          ex: 'curl.exe https://jsonplaceholder.typicode.com/users/1\ncurl.exe -X POST https://httpbin.org/post -H "Content-Type: application/json" -d "{\\"name\\":\\"Ali\\"}"' },
        { h: B('Import cURL', 'Import cURL'),
          p: B('في HTTP Request node فيه زرار Import cURL: الزق أي أمر curl من التوثيق وهو بيملى الـ method والـ URL والـ headers والـ body لوحده.', 'The HTTP Request node has an Import cURL button: paste any curl command from API docs and it fills in the method, URL, headers and body for you.'),
          ex: 'Docs: curl -H "Authorization: Bearer TOKEN" https://api.example.com/me\n→ HTTP Request: GET, URL, header Authorization' },
        { h: B('اقرا الرد', 'Reading the response'),
          p: B('`curl -i` بيعرض الـ status code والـ headers. والـ status أول حاجة تبصلها: 2xx تمام، 4xx غلط منك، 5xx غلط من السيرفر.', '`curl -i` shows the status code and headers. The status is the first thing to check: 2xx is fine, 4xx is your mistake, 5xx is the server\'s.'),
          ex: 'HTTP/1.1 200 OK\nContent-Type: application/json' }
      ],
      practice: [
        B('اعمل GET بـ curl لـ JSONPlaceholder وشوف الرد.', 'Make a GET request to JSONPlaceholder with curl and read the response.'),
        B('اعمل POST لـ httpbin بـ body JSON وشوف إنه رجّعلك البيانات.', 'POST a JSON body to httpbin and see it echo your data back.'),
        B('خد أمر curl من توثيق أي API واعمله Import في HTTP Request node.', 'Take a curl command from any API\'s docs and import it into an HTTP Request node.'),
        B('اعمل Webhook (Test URL) في n8n وابعتله طلب بـ curl.', 'Create a Webhook (test URL) in n8n and send it a request with curl.')
      ],
      words: [
        { t: 'Accept header', m: B('header بيقول للسيرفر انت عايز الرد بأنهي شكل', 'a header telling the server which response format you want'), ex: 'Accept: application/json' },
        { t: '-d (data)', m: B('في curl: الـ body اللي هيتبعت', 'in curl: the body to send'), ex: 'curl.exe -d "{\\"a\\":1}" …' },
        { t: '-i (include)', m: B('في curl: اعرض الـ status والـ headers مع الرد', 'in curl: show the status and headers with the response'), ex: 'curl.exe -i https://httpbin.org/get' },
        { t: 'echo endpoint', m: B('endpoint بيرجّعلك نفس اللي بعته، مفيد للتجربة', 'an endpoint that sends back what you sent; useful for testing'), ex: 'httpbin.org/post echoes your request.' },
        { t: 'status line', m: B('أول سطر في الرد فيه الـ status code', 'the first line of a response, with the status code'), ex: 'HTTP/1.1 404 Not Found' }],
      read: ['lib:Everything curl', { lib: 'httpbin', what: B('جرّب /get و/post و/status/404 بـ curl.', 'Try /get, /post and /status/404 with curl.') }],
      challenge: B('اعمل workflow فيه Webhook بيستقبل POST ويرد بنفس البيانات + وقت الاستلام، واختبره بـ 3 أوامر curl مختلفة.', 'Build a workflow whose Webhook receives a POST and replies with the same data plus the time it arrived, and test it with 3 different curl commands.'),
      quiz: [
        { q: B('على Windows PowerShell تكتب:', 'In Windows PowerShell you type:'), o: ['curl.exe', 'curl-win', 'wget.ps'], a: 0, why: B('عشان curl لوحدها alias لأمر تاني.', 'Because curl alone is an alias for another command.') },
        { q: B('`-H` في curl بيضيف:', '`-H` in curl adds:'), o: ['a header', 'a host', 'a hash'], a: 0, why: B('H = header.', 'H = header.') },
        { q: B('Import cURL في n8n بيعمل إيه؟', 'What does Import cURL in n8n do?'), o: [B('يملى إعدادات HTTP Request من أمر curl', 'fills HTTP Request settings from a curl command'), B('يثبّت curl', 'installs curl'), B('يمسح الـ headers', 'removes headers')], a: 0, why: B('بيوفر وقت ويقلل الأخطاء.', 'It saves time and avoids mistakes.') }
      ] },

    { title: B('تنظيم شغلك', 'Organising your work'),
      goal: B('تنظّم الـ workflows بأسماء وtags وsticky notes، وتستخدم الـ templates والـ canvas صح.', 'Organise workflows with names, tags and sticky notes, and use templates and the canvas well.'),
      learn: [
        { h: B('التسمية', 'Naming'),
          p: B('اسم الـ workflow = بيعمل إيه: «Leads → Sheet + Telegram alert». واسم كل node = دوره: «Get new leads» مش «HTTP Request3».', 'A workflow name says what it does: "Leads → Sheet + Telegram alert". Each node name says its role: "Get new leads", not "HTTP Request3".'),
          ex: 'Workflow: Daily sales report → Email\nNodes: Every day 8am · Get yesterday\'s orders · Sum totals · Send report' },
        { h: B('tags وsticky notes', 'Tags and sticky notes'),
          p: B('tags بتجمّع الـ workflows (client-x، reports، prod). والـ sticky note على الـ canvas بتشرح الجزء المعقد: ليه، ومحتاج إيه، ولو وقع تعمل إيه.', 'Tags group workflows (client-x, reports, prod). A sticky note on the canvas explains a tricky part: why, what it needs, and what to do if it fails.'),
          ex: 'Sticky note: "This sheet must have columns name, email, phone. Owner: Mahmoud."' },
        { h: B('الـ templates', 'Templates'),
          p: B('مكتبة n8n فيها آلاف الـ templates. خد واحد قريب من اللي عايزه، وافهمه node node، وبعدين عدّله. متشغلوش على بيانات حقيقية قبل ما تفهمه.', 'n8n\'s library has thousands of templates. Take one close to what you need, understand it node by node, then adapt it. Don\'t run it on real data before you understand it.'),
          ex: 'n8n.io/workflows → search "telegram google sheets"' }
      ],
      practice: [
        B('غيّر أسماء كل الـ workflows والـ nodes عندك بالقاعدة.', 'Rename all your workflows and nodes with the rule.'),
        B('ضيف tags لكل workflow (نوعه والعميل والحالة).', 'Add tags to every workflow (type, client and status).'),
        B('حط sticky note في أعقد workflow عندك تشرح 3 حاجات.', 'Add a sticky note to your most complex workflow explaining 3 things.'),
        B('استورد template من مكتبة n8n واكتب شرح كل node في جملة.', 'Import a template from the n8n library and explain each node in one sentence.')
      ],
      words: ['canvas', 'sticky note', 'tags', 'template', 'connection'],
      read: ['lib:n8n Workflow Templates', 'lib:n8n Docs: Keyboard shortcuts'],
      challenge: B('اعمل «workflow index»: workflow واحد فيه sticky notes بتشرح كل workflows عندك ولينكاتها، وحفظه في Git.', 'Build a "workflow index": one workflow whose sticky notes explain all your workflows with links to them, and save it in Git.'),
      quiz: [
        { q: B('أحسن اسم node:', 'The best node name:'), o: ['HTTP Request3', 'Get new orders from Shopify', 'node'], a: 1, why: B('بيقول دوره.', 'It states its role.') },
        { q: B('sticky note بتستخدم لـ:', 'A sticky note is used to:'), o: [B('شرح جزء من الـ workflow على الـ canvas', 'explain part of the workflow on the canvas'), B('تشغيل الـ workflow', 'run the workflow'), B('حفظ الباسوردات', 'store passwords')], a: 0, why: B('توثيق جوه الـ canvas.', 'Documentation on the canvas.') },
        { q: B('قبل ما تشغّل template على بيانات حقيقية:', 'Before running a template on real data:'), o: [B('افهمه node node', 'understand it node by node'), B('شغّله على طول', 'run it right away'), B('امسح الـ nodes', 'delete the nodes')], a: 0, why: B('عشان متبوّظش بيانات.', 'So you don\'t damage data.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 3 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 3 opens when you score 70% or more.'),
      review: [
        B('أوامر الطرفية، وتشغيل n8n، ومتغيّرات البيئة.', 'Terminal commands, running n8n, and environment variables.'),
        B('JSON: علامات تنصيص مزدوجة، من غير فاصلة زيادة، object وarray.', 'JSON: double quotes, no trailing comma, objects and arrays.'),
        B('Git: add ← commit ← push، و.gitignore للأسرار.', 'Git: add → commit → push, and .gitignore for secrets.'),
        B('curl وImport cURL وقراءة الـ status.', 'curl, Import cURL and reading the status.'),
        B('التسمية والـ tags والـ sticky notes والـ templates.', 'Naming, tags, sticky notes and templates.')
      ],
      project: B('اعمل repo «my-n8n-workflows» كامل: فيه 3 workflows متصدّرة بأسماء واضحة، وREADME بجدول الـ workflows، و.gitignore، وسكربت يشغّل n8n بالتوقيت الصح، وملف `api-tests.md` فيه 5 أوامر curl جربتها على الـ Webhooks بتاعتك.',
                 'Build a complete "my-n8n-workflows" repo: 3 exported workflows with clear names, a README with a workflow table, a .gitignore, a script that starts n8n with the right timezone, and an `api-tests.md` file with 5 curl commands you ran against your webhooks.'),
      test: [
        { q: B('`pwd` بيعرض:', '`pwd` shows:'), o: [B('الفولدر الحالي', 'the current folder'), B('الباسورد', 'the password'), B('الملفات', 'the files')], a: 0, why: B('print working directory.', 'print working directory.') },
        { q: B('`npx n8n` بيعمل:', '`npx n8n`:'), o: [B('يشغّل n8n من غير تثبيت دايم', 'runs n8n without a permanent install'), B('يمسح n8n', 'removes n8n'), B('يحدّث Node', 'updates Node')], a: 0, why: B('npx بيشغّل حزمة مباشرة.', 'npx runs a package directly.') },
        { q: B('أنهي JSON صحيح؟', 'Which JSON is valid?'), o: ['{ "ok": true }', '{ "ok": True }', "{ ok: true }"], a: 0, why: B('true بحروف صغيرة والمفتاح بين "".', 'Lowercase true and a quoted key.') },
        { q: B('في `{"user":{"email":"a@b.c"}}` الإيميل بيتقري:', 'In `{"user":{"email":"a@b.c"}}` the email is read with:'), o: ['{{ $json.user.email }}', '{{ $json.email }}', '{{ $json[user] }}'], a: 0, why: B('nested: user ثم email.', 'Nested: user, then email.') },
        { q: B('`git status` بيقولك:', '`git status` tells you:'), o: [B('إيه اللي اتغيّر ولسه متسجّلش', 'what changed and isn\'t committed yet'), B('سرعة النت', 'internet speed'), B('الباسورد', 'the password')], a: 0, why: B('حالة الـ repo.', 'The state of the repo.') },
        { q: B('فين تحط `.env`؟', 'Where should `.env` go?'), o: [B('في .gitignore', 'in .gitignore'), B('في README', 'in the README'), B('في commit', 'in a commit')], a: 0, why: B('فيه أسرار.', 'It holds secrets.') },
        { q: B('`curl -X POST` معناها:', '`curl -X POST` means:'), o: [B('ابعت طلب POST', 'send a POST request'), B('امسح', 'delete'), B('اطبع', 'print')], a: 0, why: B('-X = method.', '-X = method.') },
        { q: B('500 Internal Server Error معناها:', '500 Internal Server Error means:'), o: [B('مشكلة في السيرفر', 'a problem on the server'), B('الـ URL غلط', 'the URL is wrong'), B('مفيش صلاحية', 'no permission')], a: 0, why: B('5xx = السيرفر.', '5xx = the server.') },
        { q: B('أحسن اسم workflow:', 'The best workflow name:'), o: ['My workflow 7', 'New invoices → Telegram alert', 'test'], a: 1, why: B('بيقول بيعمل إيه.', 'It says what it does.') },
        { q: B('tags في n8n بتفيد في:', 'Tags in n8n help to:'), o: [B('تجميع وتصنيف الـ workflows', 'group and filter workflows'), B('تسريع التشغيل', 'speed up runs'), B('الأمان', 'security')], a: 0, why: B('تنظيم.', 'Organisation.') },
        { q: B('Download في n8n بيصدّر الـ workflow كـ:', 'Download in n8n exports the workflow as:'), o: ['JSON', 'PDF', 'CSV'], a: 0, why: B('ملف JSON تحطه في Git.', 'A JSON file you can put in Git.') },
        { q: B('`GENERIC_TIMEZONE` بيأثر على:', '`GENERIC_TIMEZONE` affects:'), o: [B('التوقيت في Schedule و$now', 'the time used by Schedule and $now'), B('لغة n8n', 'n8n\'s language'), B('البورت', 'the port')], a: 0, why: B('عشان المواعيد تبقى صح.', 'So schedules run at the right time.') }
      ] }
  ]
};
