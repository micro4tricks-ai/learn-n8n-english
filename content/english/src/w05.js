// Week 5 — Reading documentation and API docs.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'A2',
  title: B('قراءة التوثيق والـ API docs', 'Reading documentation and API docs'),
  goal: B('تفتح صفحة توثيق أو API reference وتلاقي بسرعة: تثبّت إزاي، تبعت إيه، هيرجع إيه، ومحتاج صلاحيات إيه، من غير ما تترجم كل كلمة.',
          'Open a docs page or an API reference and quickly find how to install, what to send, what comes back and what permissions you need, without translating every word.'),
  days: [
    { title: B('شكل صفحة التوثيق', 'How a docs page is built'),
      goal: B('تعرف أقسام التوثيق (tutorial، how-to، reference، explanation) وتقرا صفحة install.', 'Know the kinds of docs (tutorial, how-to, reference, explanation) and read an install page.'),
      learn: [
        { h: B('4 أنواع توثيق', 'Four kinds of docs'),
          p: B('Tutorial بيعلّمك من الصفر خطوة خطوة، وHow-to guide بيحل مشكلة واحدة، وReference فيه كل الدوال والباراميترز، وExplanation بيشرح «ليه». اعرف انت في أنهي نوع قبل ما تقرا.', 'A tutorial teaches from zero step by step, a how-to guide solves one problem, a reference lists every function and parameter, and an explanation covers the "why". Know which kind you are in before you read.'),
          ex: 'Getting started      → tutorial\nHow to send an email → how-to guide\nAPI reference        → reference\nArchitecture         → explanation' },
        { h: B('كلمات صفحة التثبيت', 'Words on an install page'),
          p: B('Prerequisites (محتاج إيه قبلها)، Requirements، Install، Quickstart، Verify the installation، Troubleshooting (حل المشاكل).', 'Prerequisites (what you need first), Requirements, Install, Quickstart, Verify the installation, Troubleshooting.'),
          ex: 'Prerequisites: Python 3.10 or later.\npip install requests\nTo verify the installation, run: python -c "import requests"' },
        'g:Can / should / must'
      ],
      practice: [
        B('افتح توثيق مكتبة بتستخدمها وحدد 4 صفحات: واحدة من كل نوع.', 'Open the docs of a library you use and find 4 pages: one of each kind.'),
        B('اقرا صفحة Install لمكتبة جديدة ونفّذها، واكتب الـ prerequisites في 3 جمل.', 'Read the install page of a new library, follow it, and write the prerequisites in 3 sentences.'),
        B('لوّن كل must وshould وcan في صفحة توثيق، واكتب الفرق بينهم بمثال من الصفحة.', 'Highlight every must, should and can on a docs page, and write the difference between them with an example from the page.'),
        B('اكتب 5 جمل «Before you start, you must…» لمشروعك.', 'Write 5 "Before you start, you must…" sentences for your project.')
      ],
      words: ['module', 'package', 'import', 'library', 'framework', 'dependency', 'install'],
      read: [{ lib: 'Diátaxis', what: B('اقرا الصفحة الرئيسية وافهم الأنواع الأربعة للتوثيق.', 'Read the home page and understand the four kinds of documentation.') }],
      challenge: B('اكتب صفحة «Getting started» لمشروعك: Prerequisites، Install، Verify، في 10 سطور.', 'Write a "Getting started" page for your project: Prerequisites, Install, Verify, in 10 lines.'),
      quiz: [
        { q: B('صفحة «How to upload a file» نوعها:', 'A page called "How to upload a file" is a:'), o: ['tutorial', 'how-to guide', 'reference'], a: 1, why: B('بتحل مهمة واحدة محددة.', 'It solves one specific task.') },
        { q: B('Prerequisites معناها:', 'Prerequisites means:'), o: [B('الحاجات اللي لازم تكون عندك الأول', 'what you need to have first'), B('الأخطاء الشائعة', 'common errors'), B('الإصدار الجديد', 'the new version')], a: 0, why: B('pre = قبل، requisite = مطلوب.', 'pre = before, requisite = required.') },
        { q: B('«You must set an API key» معناها:', '"You must set an API key" means:'), o: [B('اختياري', 'it\'s optional'), B('إجباري', 'it\'s required'), B('مش مستحسن', 'it\'s not recommended')], a: 1, why: B('must = لازم.', 'must = it is required.') }
      ] },

    { title: B('الطلب والرد في الـ API', 'Requests and responses in an API'),
      goal: B('تقرا صفحة endpoint: الـ method، والـ URL، والـ status codes، وشكل الـ response.', 'Read an endpoint page: the method, the URL, the status codes and the shape of the response.'),
      learn: [
        { h: B('صفحة endpoint', 'An endpoint page'),
          p: B('فيها: الـ method (GET/POST)، والـ path، والـ parameters، والـ request body، والـ responses (200، 400، 401، 404)، ومثال.', 'It has the method (GET/POST), the path, the parameters, the request body, the responses (200, 400, 401, 404), and an example.'),
          ex: 'GET /users/{id}\nReturns a single user.\nResponses:\n  200 OK         The user object.\n  404 Not Found  No user with this ID.' },
        { h: B('بنقول إيه عن الرد', 'Talking about the response'),
          p: B('The endpoint returns…، The response contains…، On success, it returns 201 Created.، If the ID is invalid, it returns 400.', 'The endpoint returns…, The response contains…, On success, it returns 201 Created., If the ID is invalid, it returns 400.'),
          ex: 'On success, the API returns 200 and a JSON object.\nThe response contains the user\'s name and email.' },
        'g:الأرقام والوحدات'
      ],
      practice: [
        B('افتح API reference لأي خدمة مجانية واختار 3 endpoints، واكتب لكل واحد: method، وpath، وبيرجع إيه.', 'Open the API reference of any free service, pick 3 endpoints, and write for each: method, path and what it returns.'),
        B('اعمل request حقيقي بـ curl أو المتصفح، واكتب 4 جمل عن الـ response.', 'Make a real request with curl or the browser, and write 4 sentences about the response.'),
        B('اكتب معنى 8 status codes بجملة: 201 means the resource was created.', 'Write the meaning of 8 status codes in a sentence: 201 means the resource was created.'),
        B('اكتب الأرقام والوحدات صح: 5 MB, 30 s, 100 ms, 2 GB (بمسافة ومن غير s).', 'Write numbers and units correctly: 5 MB, 30 s, 100 ms, 2 GB (with a space, no s).')
      ],
      code: [
        { u: B('وصف endpoint في 3 سطور', 'An endpoint in three lines'), p: 'POST /orders creates a new order.\nThe request body must contain the product ID and the quantity.\nOn success, it returns 201 Created and the new order.' }
      ],
      words: ['response', 'server', 'client', 'endpoint', 'status code', 'browser', 'download / upload'],
      read: [{ lib: 'MDN: HTTP response status codes', what: B('اقرا الفئات الخمسة (1xx إلى 5xx) واحفظ 10 أكواد.', 'Read the five classes (1xx to 5xx) and learn 10 codes.') }],
      challenge: B('اكتب «API cheat sheet» لخدمة واحدة: 5 endpoints، كل واحد في سطرين بالإنجليزي.', 'Write an "API cheat sheet" for one service: 5 endpoints, each in two lines of English.'),
      quiz: [
        { q: B('404 معناها:', '404 means:'), o: ['Not Found', 'Unauthorized', 'Created'], a: 0, why: B('404 = الحاجة مش موجودة.', '404 = the resource does not exist.') },
        { q: B('«The endpoint returns a list of orders» معناها:', '"The endpoint returns a list of orders" means:'), o: [B('بيرجّع قايمة طلبات', 'it gives back a list of orders'), B('بيحذف الطلبات', 'it deletes orders'), B('بيعمل طلب جديد', 'it creates an order')], a: 0, why: B('returns = بيرجّع.', 'returns = gives back.') },
        { q: B('أنهي كتابة صح؟', 'Which is written correctly?'), o: ['5MBs', '5 MB', '5 mbs'], a: 1, why: B('رقم + مسافة + الوحدة من غير s.', 'number + space + unit, no s.') }
      ] },

    { title: B('المصادقة والصلاحيات', 'Authentication and permissions'),
      goal: B('تقرا قسم Authentication في أي API: تبعت المفتاح فين، وإيه الفرق بين 401 و403، وتحافظ على الأسرار.', 'Read the Authentication section of any API: where to send the key, the difference between 401 and 403, and how to keep secrets safe.'),
      learn: [
        { h: B('المفتاح بيروح فين', 'Where the key goes'),
          p: B('أغلب الـ APIs بتقول: Pass your API key in the Authorization header. أو: Include the token as a Bearer token. ومتحطش المفتاح في الـ URL.', 'Most APIs say: Pass your API key in the Authorization header. Or: Include the token as a Bearer token. Never put the key in the URL.'),
          ex: 'Authorization: Bearer <your-token>\n\nKeep your API key secret. Do not commit it to Git.' },
        { h: B('401 مقابل 403', '401 vs. 403'),
          p: B('401 Unauthorized = السيرفر مش عارف انت مين (مفيش token أو غلط). 403 Forbidden = عارفك بس ممنوع. وauthentication = مين انت، وauthorization = مسموحلك بإيه.', '401 Unauthorized = the server doesn\'t know who you are (no token, or a wrong one). 403 Forbidden = it knows you but you are not allowed. Authentication = who you are; authorization = what you may do.'),
          ex: '401 → check the token\n403 → check the permissions (scopes)' },
        'g:have to و must'
      ],
      practice: [
        B('اقرا قسم Authentication في توثيق GitHub API أو أي API، واكتب الخطوات في 5 سطور.', 'Read the Authentication section of the GitHub API docs (or any API), and write the steps in 5 lines.'),
        B('اكتب 4 جمل تشرح الفرق بين authentication وauthorization بأمثلة.', 'Write 4 sentences explaining authentication vs. authorization with examples.'),
        B('اكتب «قواعد الأسرار» لفريقك في 5 جمل بـ must / must not / have to.', 'Write your team\'s "secrets rules" in 5 sentences with must / must not / have to.'),
        B('ترجم للعربي في دماغك بس (من غير ما تكتب) 3 رسايل خطأ auth حقيقية، وبعدين اكتب سببها بالإنجليزي.', 'Understand 3 real auth error messages without writing a translation, then write their cause in English.')
      ],
      words: ['authentication', 'token', 'API key', 'credentials', 'OAuth', 'access token', 'HTTPS / SSL certificate'],
      read: [{ lib: 'OWASP Cheat Sheet Series', what: B('افتح «Secrets Management Cheat Sheet» واقرا المقدمة وأول 3 نصايح.', 'Open the "Secrets Management Cheat Sheet" and read the introduction and the first 3 tips.') }],
      challenge: B('اكتب قسم «Authentication» لـ README مشروع بيستخدم API: تجيب المفتاح منين، وتحطه فين (.env)، وإيه اللي متعملوش.', 'Write an "Authentication" section for the README of a project that uses an API: where to get the key, where to put it (.env), and what not to do.'),
      quiz: [
        { q: B('401 Unauthorized غالبًا معناها:', '401 Unauthorized usually means:'), o: [B('الـ token ناقص أو غلط', 'the token is missing or wrong'), B('الصفحة مش موجودة', 'the page does not exist'), B('السيرفر واقع', 'the server is down')], a: 0, why: B('401 = مش عارفينك. راجع الـ token.', '401 = not recognised. Check the token.') },
        { q: B('authorization يعني:', 'authorization means:'), o: [B('مين انت', 'who you are'), B('مسموحلك تعمل إيه', 'what you are allowed to do'), B('تشفير البيانات', 'encrypting data')], a: 1, why: B('authentication = مين، authorization = مسموح بإيه.', 'authentication = who; authorization = what is allowed.') },
        { q: B('اختار النصيحة الصح:', 'Choose the correct advice:'), o: ['You must commit your API key.', 'You must not commit your API key.', 'You mustn\'t to commit your API key.'], a: 1, why: B('must not + الفعل في أصله.', 'must not + the base verb.') }
      ] },

    { title: B('الباراميترز والصفحات والحدود', 'Parameters, pagination and limits'),
      goal: B('تقرا جدول الباراميترز: required ولا optional، والقيمة الافتراضية، والـ pagination، والـ rate limit.', 'Read a parameter table: required or optional, default values, pagination and rate limits.'),
      learn: [
        { h: B('جدول الباراميترز', 'The parameter table'),
          p: B('كل سطر فيه: الاسم، والنوع (string/integer)، وrequired أو optional، وdefault، ووصف. «Defaults to 20» يعني لو مبعتهاش هتبقى 20.', 'Each row has: the name, the type (string/integer), required or optional, the default and a description. "Defaults to 20" means that if you don\'t send it, it will be 20.'),
          ex: 'limit    integer   optional   Defaults to 20. Maximum 100.\npage     integer   optional   The page number to return.\nq        string    required   The search query.' },
        { h: B('rate limit', 'Rate limits'),
          p: B('You can make up to 60 requests per minute. لو عدّيت: 429 Too Many Requests. واقرا الـ header اللي اسمه Retry-After.', 'You can make up to 60 requests per minute. If you go over: 429 Too Many Requests. Read the Retry-After header.'),
          ex: 'HTTP/1.1 429 Too Many Requests\nRetry-After: 30' },
        'g:النقطتين (:)'
      ],
      practice: [
        B('اختار endpoint فيه pagination واكتب إزاي تجيب الصفحة التانية والتالتة.', 'Pick an endpoint with pagination and write how to get the second and third pages.'),
        B('اكتب جدول باراميترز لدالة من كودك: اسم، نوع، required/optional، default، وصف.', 'Write a parameter table for one of your functions: name, type, required/optional, default, description.'),
        B('اقرا صفحة rate limits لخدمة حقيقية واكتب الحدود في 3 جمل.', 'Read the rate-limits page of a real service and write the limits in 3 sentences.'),
        B('اكتب 3 query strings بإيدك: `?q=python&limit=5&page=2` واشرح كل جزء.', 'Write 3 query strings by hand: `?q=python&limit=5&page=2` and explain each part.')
      ],
      words: ['header', 'payload', 'HTTP method (GET / POST)', 'query string', 'pagination', 'rate limit', 'retry'],
      read: [{ lib: 'GitHub Docs', what: B('افتح صفحة «Using pagination in the REST API» واقرا أول قسمين.', 'Open "Using pagination in the REST API" and read the first two sections.') }],
      challenge: B('اكتب سكربت صغير بيجيب كل الصفحات من endpoint، واكتب فوقه تعليق بالإنجليزي بيشرح الـ pagination والـ rate limit.', 'Write a small script that fetches every page from an endpoint, with an English comment above it explaining the pagination and the rate limit.'),
      quiz: [
        { q: B('«limit: optional, defaults to 20» معناها:', '"limit: optional, defaults to 20" means:'), o: [B('لازم تبعته', 'you must send it'), B('لو مبعتوش هيبقى 20', 'if you don\'t send it, it will be 20'), B('أقصى حاجة 20', 'the maximum is 20')], a: 1, why: B('default = القيمة لو محددتش.', 'default = the value when you don\'t set one.') },
        { q: B('429 معناها:', '429 means:'), o: ['Too Many Requests', 'Not Found', 'Server Error'], a: 0, why: B('عدّيت الـ rate limit.', 'You went over the rate limit.') },
        { q: B('في `?q=python&page=2`، الـ query string بيبدأ بـ:', 'In `?q=python&page=2`, the query string starts with:'), o: ['&', '?', '='], a: 1, why: B('? بتبدأ الـ query string، و& بتفصل بين الباراميترز.', '? starts the query string, and & separates the parameters.') }
      ] },

    { title: B('أدلة الإعداد وملفات النظام', 'Setup guides and the file system'),
      goal: B('تتبع دليل إعداد بالإنجليزي للآخر: المسارات، والصلاحيات، ومتغيّرات البيئة، والـ encoding.', 'Follow an English setup guide to the end: paths, permissions, environment variables and encoding.'),
      learn: [
        { h: B('أفعال الأدلة', 'Verbs in guides'),
          p: B('Clone the repo، navigate to the folder، create a file، set the variable، run the command، restart the service. كلها أوامر (imperative) من غير you.', 'Clone the repo, navigate to the folder, create a file, set the variable, run the command, restart the service. They are all commands (imperative) without you.'),
          ex: '1. Clone the repository.\n2. Navigate to the project folder: cd my-app\n3. Copy .env.example to .env and set API_KEY.' },
        'g:Imperative (الأمر) للخطوات والـ commits',
        'g:حروف الجر للمكان'
      ],
      practice: [
        B('اتبع دليل إعداد لمشروع مفتوح المصدر صغير للآخر، واكتب أي خطوة وقفت عندها بالإنجليزي.', 'Follow the setup guide of a small open-source project to the end, and write in English any step where you got stuck.'),
        B('اكتب 6 خطوات إعداد لمشروعك بالأمر (Clone…, Install…, Set…).', 'Write 6 setup steps for your project as commands (Clone…, Install…, Set…).'),
        B('اكتب 5 جمل بحروف جر المكان عن ملفات مشروعك: in the root folder، inside `src`، next to `README.md`.', 'Write 5 sentences with place prepositions about your project files: in the root folder, inside `src`, next to `README.md`.'),
        B('اقرا خطأ «Permission denied» أو «No such file or directory» واكتب 3 أسباب محتملة.', 'Read a "Permission denied" or "No such file or directory" error and write 3 possible causes.')
      ],
      words: ['extract', 'permission', 'extension', 'encoding', 'working directory', 'environment variable', 'directory / folder'],
      read: [{ lib: 'DigitalOcean Tutorials', what: B('اختار أي tutorial إعداد (مثلًا تثبيت Python على Ubuntu) واقراه وانت بتنفّذه.', 'Pick any setup tutorial (for example installing Python on Ubuntu) and read it while you follow it.') }],
      challenge: B('اكتب قسم «Installation» كامل لمشروعك بالإنجليزي، واطلب من حد يتبعه من غير ما يسألك.', 'Write a complete "Installation" section for your project in English, and ask someone to follow it without asking you anything.'),
      quiz: [
        { q: B('«Navigate to the project folder» معناها:', '"Navigate to the project folder" means:'), o: [B('روح لفولدر المشروع', 'go to the project folder'), B('امسح الفولدر', 'delete the folder'), B('اعمل فولدر', 'create the folder')], a: 0, why: B('navigate to = روح لـ (غالبًا بـ cd).', 'navigate to = go to (usually with cd).') },
        { q: B('environment variable هي:', 'An environment variable is:'), o: [B('قيمة في النظام البرنامج بيقراها', 'a value in the system that the program reads'), B('متغيّر جوه الكود', 'a variable in the code'), B('ملف log', 'a log file')], a: 0, why: B('زي API_KEY في .env أو النظام.', 'Like API_KEY in .env or the system.') },
        { q: B('أنهي خطوة مكتوبة بأسلوب الأدلة؟', 'Which step is written in guide style?'), o: ['You should maybe install the package.', 'Install the package.', 'The package installing.'], a: 1, why: B('الأدلة بتستخدم الأمر المباشر.', 'Guides use the direct imperative.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 6 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 6 opens when you score 70% or more.'),
      review: [
        B('أنواع التوثيق الأربعة، وكلمات صفحة التثبيت.', 'The four kinds of docs, and the words on an install page.'),
        B('صفحة endpoint: method وpath وresponses، وreturns / contains.', 'An endpoint page: method, path, responses, and returns / contains.'),
        B('authentication مقابل authorization، و401 مقابل 403، والأسرار.', 'Authentication vs. authorization, 401 vs. 403, and secrets.'),
        B('جدول الباراميترز: required / optional / defaults to، والـ pagination والـ rate limit.', 'The parameter table: required / optional / defaults to, pagination and rate limits.'),
        B('أدلة الإعداد بالأمر، وحروف جر المكان.', 'Setup guides in the imperative, and place prepositions.')
      ],
      project: B('اختار API مجاني (مثلًا GitHub أو أي API طقس) واكتب له «Quick guide» بالإنجليزي في صفحة واحدة: Authentication، و3 endpoints بجدول باراميترز، ومثال request وresponse، وقسم Errors (401، 404، 429). وجرّب كل مثال بنفسك.',
                 'Pick a free API (GitHub or any weather API) and write a one-page English "Quick guide" for it: Authentication, 3 endpoints with parameter tables, a request and response example, and an Errors section (401, 404, 429). Try every example yourself.'),
      test: [
        { q: B('صفحة فيها كل الدوال وباراميترز كل واحدة نوعها:', 'A page that lists every function and its parameters is a:'), o: ['tutorial', 'reference', 'explanation'], a: 1, why: B('reference = مرجع كامل.', 'reference = the complete list.') },
        { q: B('«Python 3.10 or later is required» معناها:', '"Python 3.10 or later is required" means:'), o: [B('لازم 3.10 أو أحدث', 'you need 3.10 or newer'), B('3.10 بس', 'only 3.10'), B('أي إصدار', 'any version')], a: 0, why: B('or later = أو أحدث.', 'or later = or newer.') },
        { q: B('201 Created بترجع لما:', '201 Created comes back when:'), o: [B('حاجة جديدة اتعملت', 'something new was created'), B('مفيش صلاحية', 'there is no permission'), B('الطلب غلط', 'the request is wrong')], a: 0, why: B('201 = اتعملت بنجاح.', '201 = created successfully.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The response contain two fields.', 'The response contains two fields.', 'The response containing two fields.'], a: 1, why: B('الفاعل مفرد: contains.', 'Singular subject: contains.') },
        { q: B('403 Forbidden معناها:', '403 Forbidden means:'), o: [B('معروف بس ممنوع', 'known but not allowed'), B('مش معروف', 'not recognised'), B('مش موجود', 'not found')], a: 0, why: B('403 = مفيش صلاحية.', '403 = no permission.') },
        { q: B('الـ API key المفروض يروح في:', 'The API key should go in:'), o: [B('الـ URL', 'the URL'), B('الـ Authorization header', 'the Authorization header'), B('اسم الملف', 'the file name')], a: 1, why: B('الـ header أأمن من الـ URL.', 'A header is safer than the URL.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['You have to rotate the key every 90 days.', 'You have rotate the key every 90 days.', 'You has to rotate the key every 90 days.'], a: 0, why: B('have to + الفعل.', 'have to + the verb.') },
        { q: B('«required» في جدول الباراميترز معناها:', '"required" in a parameter table means:'), o: [B('لازم تبعته', 'you must send it'), B('اختياري', 'optional'), B('ليه قيمة افتراضية', 'it has a default')], a: 0, why: B('required = إجباري.', 'required = mandatory.') },
        { q: B('pagination معناها:', 'pagination means:'), o: [B('تقسيم النتايج على صفحات', 'splitting results into pages'), B('تشفير الصفحة', 'encrypting the page'), B('تحميل صفحة واحدة', 'loading one page')], a: 0, why: B('page by page.', 'page by page.') },
        { q: B('أنهي خطوة أوضح في دليل؟', 'Which step is clearest in a guide?'), o: ['Copy .env.example to .env.', 'Maybe you can copy the example file.', 'The .env is copied maybe.'], a: 0, why: B('أمر مباشر ومحدد.', 'A direct, specific command.') },
        { q: B('اكمل: `The config file is ___ the root folder.`', 'Complete: `The config file is ___ the root folder.`'), o: ['in', 'on', 'at'], a: 0, why: B('جوه فولدر = in.', 'Inside a folder = in.') },
        { q: B('«Permission denied» غالبًا سببها:', '"Permission denied" is usually caused by:'), o: [B('مش مسموحلك تقرا أو تكتب الملف', 'you are not allowed to read or write the file'), B('الملف كبير', 'the file is too big'), B('النت قاطع', 'no internet')], a: 0, why: B('مشكلة صلاحيات.', 'A permissions problem.') }
      ] }
  ]
};
