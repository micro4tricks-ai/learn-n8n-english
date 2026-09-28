// n8n week 6 — APIs and authentication.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ ← متوسط', 'Beginner → Intermediate'),
  title: B('الـ APIs والمصادقة: API keys وOAuth2', 'APIs and authentication: API keys and OAuth2'),
  goal: B('توصل أي API مالوش node جاهزة: تقرا التوثيق، وتختار المصادقة (key أو OAuth2)، وتبعت كل أنواع الطلبات والـ bodies، وتتعامل مع الـ rate limits والأخطاء.',
          'Connect any API that has no ready node: read the docs, choose the authentication (a key or OAuth2), send every kind of request and body, and handle rate limits and errors.'),
  days: [
    { title: B('من التوثيق للطلب', 'From the docs to the request'),
      goal: B('تحوّل صفحة API reference لـ HTTP Request شغال في دقايق.', 'Turn an API reference page into a working HTTP Request in minutes.'),
      learn: [
        { h: B('4 أسئلة قبل أي API', 'Four questions before any API'),
          p: B('إيه الـ base URL؟ المصادقة إيه؟ الـ endpoint اللي محتاجه إيه (method + path)؟ شكل الرد إيه؟ لو عرفت الأربعة، الباقي سهل.', 'What is the base URL? What is the authentication? Which endpoint do I need (method + path)? What does the response look like? Once you know these four, the rest is easy.'),
          ex: 'Base URL: https://api.example.com/v1\nAuth: header X-Api-Key\nEndpoint: GET /customers?limit=50\nResponse: { "data": [ … ], "next": "…" }' },
        { h: B('REST باختصار', 'REST in short'),
          p: B('الـ resources أسماء (customers، orders)، والـ method هو الفعل: GET تقرا، POST تعمل، PUT/PATCH تعدّل، DELETE تمسح. `/orders/42` = order واحد.', 'Resources are nouns (customers, orders) and the method is the verb: GET reads, POST creates, PUT/PATCH updates, DELETE removes. `/orders/42` = one order.'),
          ex: 'GET    /orders        list orders\nPOST   /orders        create an order\nPATCH  /orders/42     change order 42\nDELETE /orders/42     delete order 42' },
        { h: B('ابدأ في sandbox', 'Start in a sandbox'),
          p: B('خدمات كتير (دفع، شحن) عندها test mode أو sandbox. جرّب هناك الأول ومتلمسش بيانات حقيقية لحد ما الـ workflow يثبت.', 'Many services (payments, shipping) have a test mode or sandbox. Try there first and don\'t touch real data until the workflow is stable.'),
          ex: 'https://api.sandbox.example.com → later https://api.example.com' }
      ],
      practice: [
        B('اختار API مجاني من Public APIs وجاوب على الـ 4 أسئلة.', 'Pick a free API from Public APIs and answer the four questions.'),
        B('اعمل GET لقايمة وGET لعنصر واحد بالـ ID.', 'Make a GET for a list and a GET for one item by ID.'),
        B('اعمل POST وPATCH وDELETE على JSONPlaceholder وشوف الردود.', 'Make a POST, a PATCH and a DELETE on JSONPlaceholder and read the responses.'),
        B('اكتب «API card» للخدمة: base URL وauth و3 endpoints.', 'Write an "API card" for the service: base URL, auth and 3 endpoints.')
      ],
      words: [
        { t: 'base URL', m: B('الجزء الثابت في أول كل روابط الـ API', 'the fixed start of every URL in an API'), ex: 'https://api.example.com/v1' },
        { t: 'resource', m: B('الحاجة اللي الـ API بيتعامل معاها (orders، users)', 'the thing an API deals with (orders, users)'), ex: '/customers is a resource.' },
        { t: 'REST', m: B('أسلوب تصميم APIs: resources وmethods بمعاني ثابتة', 'a style of API design: resources and methods with fixed meanings'), ex: 'GET /orders/42' },
        { t: 'sandbox / test mode', m: B('بيئة تجربة ببيانات مش حقيقية', 'a test environment with fake data'), ex: 'Use Stripe test mode first.' },
        { t: 'API reference', m: B('صفحة التوثيق اللي فيها كل الـ endpoints بالتفصيل', 'the docs page listing every endpoint in detail'), ex: 'Check the API reference for required fields.' }],
      read: ['lib:Public APIs', 'lib:JSONPlaceholder'],
      challenge: B('وصّل API مالوش node في n8n (طقس، عملات، أو أي حاجة)، واعمل workflow بيجيب بيانات يوميًا ويحفظها في Sheet.', 'Connect an API that has no n8n node (weather, currencies or anything) and build a workflow that fetches data daily into a sheet.'),
      quiz: [
        { q: B('تعدّل حقل واحد في order بـ:', 'To change one field of an order use:'), o: ['PATCH', 'GET', 'DELETE'], a: 0, why: B('PATCH = تعديل جزئي.', 'PATCH = a partial update.') },
        { q: B('base URL هو:', 'The base URL is:'), o: [B('الجزء الثابت في أول الروابط', 'the fixed start of the URLs'), B('الـ API key', 'the API key'), B('آخر جزء', 'the last part')], a: 0, why: B('وبتضيف عليه الـ path.', 'You add the path to it.') },
        { q: B('ليه sandbox الأول؟', 'Why a sandbox first?'), o: [B('عشان متبوّظش بيانات حقيقية', 'so you don\'t damage real data'), B('أسرع', 'faster'), B('أرخص دايمًا', 'always cheaper')], a: 0, why: B('تجربة آمنة.', 'Safe testing.') }
      ] },

    { title: B('API keys في n8n', 'API keys in n8n'),
      goal: B('تحفظ المفاتيح في credentials صح، وتعرف Predefined وGeneric، وHeader وQuery.', 'Store keys in credentials properly, and know predefined vs. generic, and header vs. query auth.'),
      learn: [
        { h: B('Predefined ولا Generic', 'Predefined or generic'),
          p: B('لو الخدمة ليها credential جاهز في n8n (Predefined Credential Type)، استخدمه حتى مع HTTP Request. لو لأ: Generic Credential Type ← Header Auth أو Query Auth أو Basic.', 'If the service has a ready credential in n8n (Predefined Credential Type), use it even with HTTP Request. If not: Generic Credential Type → Header Auth, Query Auth or Basic.'),
          ex: 'HTTP Request → Authentication: Generic → Header Auth\nName: X-Api-Key   Value: ••••••' },
        { h: B('Header ولا Query', 'Header or query'),
          p: B('أغلب الـ APIs بتاخد المفتاح في header. بعضها في الـ URL (`?api_key=…`) — ده أضعف لأنه ممكن يتسجّل في logs. Query Auth في n8n بيحطه لك من غير ما يبان في الـ workflow.', 'Most APIs take the key in a header. Some take it in the URL (`?api_key=…`), which is weaker because URLs can end up in logs. Query Auth in n8n adds it without exposing it in the workflow.'),
          ex: 'Query Auth → Name: api_key  Value: ••••' },
        { h: B('متكتبش المفتاح في الـ node', 'Never type the key into the node'),
          p: B('لو كتبت المفتاح في header عادي، هيتصدّر مع الـ workflow ويروح Git. الـ credentials بتتشفّر بـ N8N_ENCRYPTION_KEY ومش بتتصدّر.', 'If you type the key into a plain header, it gets exported with the workflow and ends up in Git. Credentials are encrypted with N8N_ENCRYPTION_KEY and aren\'t exported.'),
          ex: '✗ Header "Authorization: Bearer sk_live_…"\n✓ Credential: My Service API' }
      ],
      practice: [
        B('اعمل credential بـ Header Auth لـ API حقيقي واستخدمه في HTTP Request.', 'Create a Header Auth credential for a real API and use it in HTTP Request.'),
        B('جرّب Query Auth مع API بياخد المفتاح في الـ URL.', 'Try Query Auth with an API that takes the key in the URL.'),
        B('استخدم Predefined credential (مثلًا Telegram أو Google) جوه HTTP Request لـ endpoint مش موجود في الـ node.', 'Use a predefined credential (e.g. Telegram or Google) inside HTTP Request for an endpoint the node lacks.'),
        B('صدّر الـ workflow واتأكد إن المفتاح مش في الملف.', 'Export the workflow and confirm the key is not in the file.')
      ],
      words: ['N8N_ENCRYPTION_KEY',
        { t: 'Query Auth', m: B('مصادقة بتحط المفتاح كـ query parameter', 'authentication that adds the key as a query parameter'), ex: '?api_key=••••' },
        { t: 'Predefined Credential Type', m: B('credential جاهز لخدمة معروفة تستخدمه في HTTP Request', 'a ready credential for a known service, usable in HTTP Request'), ex: 'Use the Google credential for an extra endpoint.' },
        { t: 'Generic Credential Type', m: B('مصادقة عامة (Header، Query، Basic، OAuth2) لأي API', 'generic auth (Header, Query, Basic, OAuth2) for any API'), ex: 'Generic → Header Auth' },
        { t: 'X-Api-Key', m: B('اسم header شائع للمفتاح', 'a common header name for an API key'), ex: 'X-Api-Key: ••••' }],
      read: ['lib:n8n Docs: Credentials', 'lib:n8n Docs: HTTP Request node'],
      challenge: B('نضّف كل workflows عندك: أي مفتاح مكتوب في node يتنقل لـ credential، واكتب في README اسم كل credential محتاجه.', 'Clean all your workflows: move any key typed into a node into a credential, and list every required credential in the README.'),
      quiz: [
        { q: B('المفتاح المكتوب في header عادي:', 'A key typed into a plain header:'), o: [B('بيتصدّر مع الـ workflow', 'gets exported with the workflow'), B('بيتشفّر', 'is encrypted'), B('بيختفي', 'disappears')], a: 0, why: B('استخدم credential.', 'Use a credential.') },
        { q: B('الخدمة ليها credential في n8n وانت محتاج endpoint مش في الـ node:', 'The service has an n8n credential but you need an endpoint the node lacks:'), o: [B('HTTP Request بـ Predefined Credential', 'HTTP Request with the predefined credential'), B('مستحيل', 'impossible'), B('تكتب المفتاح يدوي', 'type the key manually')], a: 0, why: B('أسهل وأأمن.', 'Easier and safer.') },
        { q: B('الـ credentials بتتشفّر بـ:', 'Credentials are encrypted with:'), o: ['N8N_ENCRYPTION_KEY', 'WEBHOOK_URL', 'GENERIC_TIMEZONE'], a: 0, why: B('احتفظ بيه، لو ضاع الـ credentials مش هتتقري.', 'Keep it; if lost, credentials can\'t be read.') }
      ] },

    { title: B('OAuth2 في n8n', 'OAuth2 in n8n'),
      goal: B('تعمل OAuth2 credential لخدمة زي Google أو أي API، وتفهم الـ tokens بتتجدد إزاي.', 'Create an OAuth2 credential for a service such as Google or any API, and understand how tokens renew.'),
      learn: [
        { h: B('الخطوات', 'The steps'),
          p: B('تعمل app في لوحة الخدمة ← تحط الـ Redirect URL اللي n8n بيديهولك ← تاخد Client ID وClient Secret ← تحطهم في n8n ← Sign in / Connect ← توافق على الصلاحيات.', 'Create an app in the service\'s console → paste the redirect URL n8n gives you → copy the Client ID and Client Secret → enter them in n8n → Sign in / Connect → approve the permissions.'),
          ex: 'Google Cloud → OAuth client (Web) → Authorized redirect URI: https://n8n.example.com/rest/oauth2-credential/callback' },
        { h: B('الـ tokens', 'Tokens'),
          p: B('access token قصير العمر (ساعة مثلًا) بيتبعت مع كل طلب، وrefresh token بيجيب access token جديد. n8n بيجدد لوحده؛ لو وقف فجأة غالبًا الـ refresh token اتلغى أو الـ app لسه في وضع Testing.', 'The access token is short-lived (say an hour) and sent with every request; the refresh token gets a new access token. n8n renews it automatically; if it suddenly stops, the refresh token was probably revoked or the app is still in Testing mode.'),
          ex: 'Google apps in "Testing" issue refresh tokens that expire after 7 days.' },
        { h: B('consent screen والصلاحيات', 'The consent screen and scopes'),
          p: B('اطلب أقل صلاحيات محتاجها. والـ consent screen اللي المستخدم بيشوفه لازم فيه اسم app واضح وإيميل دعم.', 'Ask for the fewest scopes you need. The consent screen users see needs a clear app name and a support email.'),
          ex: 'gmail.send instead of full Gmail access' }
      ],
      practice: [
        B('اعمل OAuth2 credential لـ Google (Sheets أو Gmail) من الأول.', 'Create a Google OAuth2 credential (Sheets or Gmail) from scratch.'),
        B('اكتب الخطوات اللي عملتها في 8 سطور عشان ترجعلها.', 'Write the steps you followed in 8 lines for future reference.'),
        B('اعمل Generic OAuth2 credential لـ API تاني (GitHub مثلًا).', 'Create a generic OAuth2 credential for another API (GitHub, for example).'),
        B('غيّر الـ scopes لأقل حاجة ممكنة واتأكد إن الـ workflow لسه شغال.', 'Reduce the scopes to the minimum and confirm the workflow still works.')
      ],
      words: [
        { t: 'client ID', m: B('معرّف عام لتطبيقك عند الخدمة', 'the public identifier of your app at the service'), ex: 'Paste the Client ID into n8n.' },
        { t: 'client secret', m: B('سر التطبيق، زي الباسورد', 'the app\'s secret, like a password'), ex: 'Never share the client secret.' },
        { t: 'refresh token', m: B('token بيجيب access tokens جديدة من غير تسجيل دخول', 'a token that gets new access tokens without logging in again'), ex: 'n8n uses it to renew access.' },
        { t: 'consent screen', m: B('الشاشة اللي بتطلب موافقة المستخدم على الصلاحيات', 'the screen asking the user to approve permissions'), ex: 'Set the app name and support email.' },
        { t: 'access token expiry', m: B('مدة صلاحية الـ access token قبل ما يتجدد', 'how long an access token lasts before renewal'), ex: 'Usually about one hour.' }],
      read: ['lib:n8n Docs: Google credentials', { lib: 'n8n Docs: Credentials', what: B('اقرا صفحة OAuth2 العامة.', 'Read the generic OAuth2 page.') }],
      challenge: B('اكتب «OAuth runbook» بالعربي والإنجليزي: خطوات إنشاء credential لـ Google، وأشهر 3 أخطاء (redirect_uri_mismatch، access_denied، token expired) وحلها.', 'Write an "OAuth runbook" in Arabic and English: the steps to create a Google credential, and the 3 most common errors (redirect_uri_mismatch, access_denied, token expired) with fixes.'),
      quiz: [
        { q: B('redirect_uri_mismatch معناها:', 'redirect_uri_mismatch means:'), o: [B('الـ Redirect URL في لوحة الخدمة مش زي اللي في n8n', 'the redirect URL in the console doesn\'t match n8n\'s'), B('الباسورد غلط', 'wrong password'), B('النت قاطع', 'no internet')], a: 0, why: B('لازم يتطابقوا بالحرف.', 'They must match exactly.') },
        { q: B('الـ refresh token بيعمل:', 'The refresh token:'), o: [B('يجيب access token جديد', 'gets a new access token'), B('يمسح الحساب', 'deletes the account'), B('يغيّر الـ scopes', 'changes scopes')], a: 0, why: B('تجديد تلقائي.', 'Automatic renewal.') },
        { q: B('الأحسن في الـ scopes:', 'Best practice for scopes:'), o: [B('أقل صلاحيات محتاجها', 'the fewest you need'), B('كل الصلاحيات', 'all of them'), B('ولا واحدة', 'none')], a: 0, why: B('least privilege.', 'least privilege.') }
      ] },

    { title: B('الأخطاء والـ rate limits', 'Errors and rate limits'),
      goal: B('تتعامل مع 429 و5xx والـ timeouts من غير ما الـ workflow يقع.', 'Handle 429s, 5xx errors and timeouts without the workflow failing.'),
      learn: [
        { h: B('اقرا الخطأ', 'Read the error'),
          p: B('HTTP Request بيقولك الـ status والرسالة. 400 = الطلب غلط (شوف الـ body)، 401/403 = مصادقة، 404 = مش موجود، 429 = كتير، 5xx = السيرفر. ومع «Include Response Headers and Status» تشوف كل حاجة.', 'HTTP Request shows the status and message. 400 = a bad request (check the body), 401/403 = auth, 404 = not found, 429 = too many, 5xx = server. With "Include Response Headers and Status" you see everything.'),
          ex: '429 Too Many Requests\nRetry-After: 30' },
        { h: B('Retry وbackoff', 'Retry and backoff'),
          p: B('Settings ← Retry On Fail (مثلًا 3 مرات بين كل مرة 5 ثواني) للأخطاء المؤقتة. ولو الـ API بيقول Retry-After، استنى المدة دي. وexponential backoff = تزوّد الانتظار كل مرة.', 'Settings → Retry On Fail (e.g. 3 tries, 5 seconds apart) for temporary errors. If the API sends Retry-After, wait that long. Exponential backoff = wait longer each time.'),
          ex: 'Try 1 → wait 2s → try 2 → wait 4s → try 3 → wait 8s' },
        { h: B('Batching وTimeout', 'Batching and timeout'),
          p: B('في HTTP Request options: Batching (Items per Batch + Batch Interval) عشان متتخطاش الـ limit، وTimeout عشان طلب واقف ميعلّقش الـ workflow.', 'In the HTTP Request options: Batching (Items per Batch + Batch Interval) to stay within limits, and Timeout so a stuck request doesn\'t hang the workflow.'),
          ex: 'Batching: 10 items per batch, 1000 ms interval\nTimeout: 30000 ms' }
      ],
      practice: [
        B('اعمل طلب لـ httpbin /status/429 و/status/500 وشوف n8n بيعمل إيه.', 'Call httpbin /status/429 and /status/500 and see what n8n does.'),
        B('فعّل Retry On Fail (3 مرات، 3 ثواني) وجرّب تاني.', 'Enable Retry On Fail (3 tries, 3 seconds) and try again.'),
        B('ابعت 50 item لـ API بـ Batching عشان متعدّيش 10 في الثانية.', 'Send 50 items to an API with batching so you stay under 10 per second.'),
        B('حط Timeout 10 ثواني وجرّب httpbin /delay/15.', 'Set a 10-second timeout and try httpbin /delay/15.')
      ],
      words: [
        { t: 'Retry-After', m: B('header بيقول تستنى قد إيه قبل ما تحاول تاني', 'a header saying how long to wait before trying again'), ex: 'Retry-After: 30' },
        { t: 'exponential backoff', m: B('الانتظار بيتضاعف بين كل محاولة', 'the wait doubles between attempts'), ex: '2s, 4s, 8s' },
        { t: 'Batching (HTTP Request)', m: B('إرسال الـ items على دفعات بفاصل زمني', 'sending items in groups with a delay between them'), ex: '10 items per batch, 1 s apart' },
        { t: 'timeout (request)', m: B('أقصى وقت تستنى فيه الرد', 'the longest time to wait for a response'), ex: 'Timeout: 30000 ms' },
        { t: 'transient error', m: B('خطأ مؤقت بيروح لوحده (زي 503)', 'a temporary error that goes away (like 503)'), ex: 'Retry transient errors; don\'t retry 400s.' }],
      read: ['lib:httpbin', 'lib:MDN: HTTP status codes'],
      challenge: B('اعمل «safe API caller» sub-workflow: بياخد method وURL وbody، ويعمل retry للأخطاء المؤقتة بس، ويرجّع نتيجة موحّدة {ok, status, data, error}.', 'Build a "safe API caller" sub-workflow: it takes a method, URL and body, retries only transient errors, and returns a uniform result {ok, status, data, error}.'),
      quiz: [
        { q: B('تعمل retry لـ 400 Bad Request؟', 'Should you retry a 400 Bad Request?'), o: [B('لأ، صلّح الطلب', 'No, fix the request'), B('أيوه 10 مرات', 'Yes, 10 times'), B('أيوه دايمًا', 'Yes, always')], a: 0, why: B('مش مؤقت.', 'It isn\'t temporary.') },
        { q: B('Retry-After: 60 معناها:', 'Retry-After: 60 means:'), o: [B('استنى 60 ثانية', 'wait 60 seconds'), B('60 محاولة', '60 tries'), B('الساعة 60', 'at 60 o\'clock')], a: 0, why: B('بالثواني.', 'In seconds.') },
        { q: B('Batching في HTTP Request مفيد لـ:', 'Batching in HTTP Request helps with:'), o: [B('احترام الـ rate limit', 'respecting the rate limit'), B('التشفير', 'encryption'), B('التصميم', 'design')], a: 0, why: B('دفعات بفاصل.', 'Spaced groups.') }
      ] },

    { title: B('أنواع الـ body', 'Body types'),
      goal: B('تبعت JSON وform-data وurlencoded وملفات، وتعرف كل API عايز إيه.', 'Send JSON, form-data, urlencoded and files, and know which one each API expects.'),
      learn: [
        { h: B('الأنواع', 'The types'),
          p: B('JSON (الأشهر)، Form URLencoded (زي فورم الويب)، Form-Data / multipart (فيها ملفات)، وRaw. التوثيق بيقولك في Content-Type.', 'JSON (most common), Form URL-encoded (like a web form), Form-Data / multipart (with files), and raw. The docs tell you via Content-Type.'),
          ex: 'application/json\napplication/x-www-form-urlencoded\nmultipart/form-data' },
        { h: B('JSON في n8n', 'JSON in n8n'),
          p: B('Send Body ← JSON ← Using Fields (حقل حقل) أو Using JSON (تكتب الـ JSON بـ expressions). انتبه: النصوص جوه JSON بين علامات تنصيص، والأرقام من غير.', 'Send Body → JSON → Using Fields (field by field) or Using JSON (write the JSON with expressions). Note: strings in JSON take quotes; numbers don\'t.'),
          ex: '{\n  "name": "{{ $json.name }}",\n  "amount": {{ $json.amount }}\n}' },
        { h: B('رفع ملف', 'Uploading a file'),
          p: B('Form-Data ← parameter نوعه n8n Binary File ← اسم الـ binary property. ده اللي بتستخدمه لما API عايز ملف.', 'Form-Data → a parameter of type n8n Binary File → the binary property name. Use it when an API expects a file.'),
          ex: 'Body: Form-Data\nfile = (n8n Binary File) data\ndescription = "Invoice September"' }
      ],
      practice: [
        B('ابعت نفس البيانات لـ httpbin بـ JSON ومرة urlencoded وقارن.', 'Send the same data to httpbin as JSON and as urlencoded, and compare.'),
        B('اكتب body بـ Using JSON فيه نص ورقم وboolean وarray من expressions.', 'Write a Using JSON body with a string, a number, a boolean and an array from expressions.'),
        B('ارفع ملف لـ httpbin بـ Form-Data.', 'Upload a file to httpbin with Form-Data.'),
        B('صلّح body JSON واقع بسبب علامات تنصيص حوالين رقم أو ناقصة حوالين نص.', 'Fix a JSON body that fails because of quotes around a number or missing quotes around text.')
      ],
      words: [
        { t: 'PUT vs PATCH', m: B('PUT يبدّل الحاجة كلها، PATCH يعدّل جزء', 'PUT replaces the whole thing; PATCH changes part of it'), ex: 'PATCH /users/1 { "email": "…" }' },
        { t: 'multipart/form-data', m: B('نوع body بيسمح برفع ملفات', 'a body type that allows file uploads'), ex: 'Upload the PDF as form-data.' },
        { t: 'x-www-form-urlencoded', m: B('body زي فورم الويب: key=value&key2=value2', 'a body like a web form: key=value&key2=value2'), ex: 'name=Ali&city=Cairo' },
        { t: 'Using JSON', m: B('طريقة تكتب بيها الـ body كـ JSON كامل في HTTP Request', 'a way to write the whole body as JSON in HTTP Request'), ex: '{ "id": {{ $json.id }} }' },
        { t: 'n8n Binary File', m: B('نوع parameter بيرفع ملف من الـ binary', 'a parameter type that uploads a file from binary data'), ex: 'file = data' }],
      read: ['lib:MDN: HTTP request methods', 'lib:Postman Learning Center'],
      challenge: B('وصّل API فيه عمليات CRUD كاملة (JSONPlaceholder أو خدمة حقيقية): اعمل workflow بيعمل create ثم update ثم read ثم delete ويسجّل كل رد.', 'Connect an API with full CRUD (JSONPlaceholder or a real service): build a workflow that creates, updates, reads and deletes, logging every response.'),
      quiz: [
        { q: B('ترفع ملف لـ API بـ:', 'Upload a file to an API with:'), o: ['Form-Data (n8n Binary File)', 'JSON text', 'query string'], a: 0, why: B('multipart.', 'multipart.') },
        { q: B('في Using JSON، رقم زي amount:', 'In Using JSON, a number such as amount:'), o: ['"amount": {{ $json.amount }}', '"amount": "{{ $json.amount }}"', 'amount = 5'], a: 0, why: B('من غير علامات تنصيص عشان يفضل رقم.', 'No quotes, so it stays a number.') },
        { q: B('PUT بيعمل:', 'PUT:'), o: [B('يبدّل الحاجة كلها', 'replaces the whole resource'), B('يمسح', 'deletes'), B('يقرا', 'reads')], a: 0, why: B('PATCH للجزئي.', 'PATCH is partial.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 7 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 7 opens when you score 70% or more.'),
      review: [
        B('الـ 4 أسئلة: base URL، auth، endpoint، response، وsandbox.', 'The four questions: base URL, auth, endpoint, response — and a sandbox.'),
        B('المفاتيح في credentials: Predefined / Generic، Header / Query.', 'Keys in credentials: predefined / generic, header / query.'),
        B('OAuth2: Client ID/Secret، Redirect URL، refresh token، scopes.', 'OAuth2: Client ID/Secret, redirect URL, refresh token, scopes.'),
        B('429 وRetry-After وbackoff وBatching وTimeout.', '429, Retry-After, backoff, batching and timeouts.'),
        B('JSON وurlencoded وform-data والملفات.', 'JSON, urlencoded, form-data and files.')
      ],
      project: B('ابني «integration» حقيقي لخدمة مالهاش node: credential صح، وworkflow بيجيب بيانات بـ pagination، ويحترم الـ rate limit بـ Batching، ويعمل retry للأخطاء المؤقتة بس، ويكتب النتيجة في Sheet، ويبعتلك تنبيه لو حصل خطأ دائم. ومعاه «API card» في README.',
                 'Build a real integration for a service without a node: a proper credential, a workflow that fetches data with pagination, respects the rate limit with batching, retries only transient errors, writes the result to a sheet, and alerts you on permanent errors. Include an "API card" in the README.'),
      test: [
        { q: B('GET /orders/42 بيعمل:', 'GET /orders/42:'), o: [B('يجيب order رقم 42', 'gets order 42'), B('يعمل order', 'creates an order'), B('يمسح 42', 'deletes 42')], a: 0, why: B('GET = قراءة.', 'GET = read.') },
        { q: B('أول حاجة قبل ما تلمس API دفع حقيقي:', 'Before touching a real payment API:'), o: ['test mode / sandbox', 'production', B('تمسح الحساب', 'delete the account')], a: 0, why: B('تجربة آمنة.', 'Safe testing.') },
        { q: B('مكان الـ API key الصح:', 'Where an API key belongs:'), o: ['credential', B('اسم الـ node', 'the node name'), B('sticky note', 'a sticky note')], a: 0, why: B('مشفّر ومش بيتصدّر.', 'Encrypted, not exported.') },
        { q: B('API بياخد المفتاح في ?api_key=:', 'An API takes the key as ?api_key=:'), o: ['Query Auth', 'Basic Auth', 'OAuth2'], a: 0, why: B('في الـ query.', 'In the query.') },
        { q: B('في OAuth2، Redirect URL بتاخده من:', 'In OAuth2 you get the redirect URL from:'), o: ['n8n', B('العميل', 'the client'), B('Gmail', 'Gmail')], a: 0, why: B('وتحطه في لوحة الخدمة.', 'And paste it into the service console.') },
        { q: B('Google OAuth بيقف بعد أسبوع. السبب غالبًا:', 'Google OAuth stops after a week. Usually because:'), o: [B('الـ app في وضع Testing', 'the app is in Testing mode'), B('n8n قديم', 'n8n is old'), B('الشيت كبير', 'the sheet is big')], a: 0, why: B('refresh tokens بتنتهي.', 'Refresh tokens expire.') },
        { q: B('429 معناها:', '429 means:'), o: ['Too Many Requests', 'Not Found', 'Created'], a: 0, why: B('عدّيت الحد.', 'You exceeded the limit.') },
        { q: B('تعمل retry لـ:', 'Retry:'), o: [B('503 و429 والـ timeouts', '503, 429 and timeouts'), B('400 و404', '400 and 404'), B('ولا حاجة', 'nothing')], a: 0, why: B('الأخطاء المؤقتة.', 'Transient errors.') },
        { q: B('exponential backoff:', 'Exponential backoff:'), o: [B('الانتظار بيزيد كل مرة', 'the wait grows each time'), B('انتظار ثابت', 'a fixed wait'), B('من غير انتظار', 'no wait')], a: 0, why: B('2، 4، 8…', '2, 4, 8…') },
        { q: B('Timeout في HTTP Request بيحمي من:', 'A timeout in HTTP Request protects against:'), o: [B('طلب واقف يعلّق الـ workflow', 'a stuck request hanging the workflow'), B('الفيروسات', 'viruses'), B('الأخطاء الإملائية', 'typos')], a: 0, why: B('بيقطع بعد مدة.', 'It gives up after a time.') },
        { q: B('body فيه ملف:', 'A body that includes a file:'), o: ['multipart/form-data', 'application/json', 'text/plain'], a: 0, why: B('form-data.', 'form-data.') },
        { q: B('`"amount": "{{ $json.amount }}"` بيبعت amount كـ:', '`"amount": "{{ $json.amount }}"` sends amount as:'), o: [B('نص', 'text'), B('رقم', 'a number'), B('boolean', 'a boolean')], a: 0, why: B('علامات التنصيص بتخليه string.', 'The quotes make it a string.') }
      ] }
  ]
};
