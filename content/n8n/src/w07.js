// n8n week 7 — Webhooks and building small APIs.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الـ Webhooks وبناء APIs صغيرة', 'Webhooks and building small APIs'),
  goal: B('تبني API صغير بـ n8n بمسارات واضحة، وتتحقق من المدخلات وترجّع أخطاء مفهومة، وتأمّنه بمفتاح أو توقيع، وتستقبل webhooks من خدمات حقيقية من غير تكرار، وتوثّقه.',
          'Build a small API with n8n with clear routes, validate input and return understandable errors, secure it with a key or a signature, receive webhooks from real services without duplicates, and document it.'),
  days: [
    { title: B('تصميم API صغير', 'Designing a small API'),
      goal: B('تعمل endpoints بمسارات وmethods منطقية، وتستقبل path وquery parameters.', 'Create endpoints with sensible paths and methods, and receive path and query parameters.'),
      learn: [
        { h: B('مسار لكل وظيفة', 'One route per job'),
          p: B('كل Webhook node = endpoint. سمّي المسار بالـ resource: `orders`، `orders/:id`. وحط رقم نسخة `v1` عشان لو غيّرت بعدين متكسرش اللي بيستخدمك.', 'Each Webhook node is one endpoint. Name the path after the resource: `orders`, `orders/:id`. Add a version like `v1` so later changes don\'t break your users.'),
          ex: 'GET  /webhook/v1/orders       → list\nGET  /webhook/v1/orders/:id   → one order\nPOST /webhook/v1/orders       → create' },
        { h: B('path وquery', 'Path and query'),
          p: B('Path parameter جوه المسار (`/orders/:id`) وبتوصل في `$json.params.id`. Query بعد ؟ (`?status=paid`) في `$json.query.status`. والـ body في `$json.body`.', 'A path parameter lives in the path (`/orders/:id`) and arrives in `$json.params.id`. The query comes after ? (`?status=paid`) in `$json.query.status`. The body is in `$json.body`.'),
          ex: 'GET /webhook/v1/orders/42?fields=total\n→ $json.params.id = "42"\n→ $json.query.fields = "total"' },
        { h: B('رد JSON ثابت الشكل', 'A consistent JSON response'),
          p: B('خلّي كل الردود بنفس الشكل: `{ "ok": true, "data": … }` أو `{ "ok": false, "error": { "code", "message" } }`. ده بيسهّل على اللي بيستخدم الـ API.', 'Give every response the same shape: `{ "ok": true, "data": … }` or `{ "ok": false, "error": { "code", "message" } }`. It makes the API easy to use.'),
          ex: '{ "ok": true, "data": { "id": 42, "total": 350 } }' }
      ],
      practice: [
        B('اعمل 3 endpoints لـ «orders» بـ Sheet كقاعدة بيانات.', 'Build 3 "orders" endpoints using a sheet as the database.'),
        B('استقبل id من الـ path وfilter من الـ query.', 'Receive id from the path and a filter from the query.'),
        B('رجّع كل الردود بشكل {ok, data} أو {ok, error}.', 'Return every response as {ok, data} or {ok, error}.'),
        B('اختبر الـ 3 بـ curl واكتب الأوامر في README.', 'Test all 3 with curl and write the commands in the README.')
      ],
      words: [
        { t: 'route', m: B('مسار + method بيحدد endpoint', 'a path + method that defines an endpoint'), ex: 'GET /v1/orders' },
        { t: 'path parameter', m: B('قيمة جوه المسار زي /orders/:id', 'a value inside the path, like /orders/:id'), ex: '$json.params.id' },
        { t: 'API versioning', m: B('رقم نسخة في المسار عشان التغييرات متكسرش المستخدمين', 'a version in the path so changes don\'t break users'), ex: '/v1/orders → /v2/orders' },
        { t: 'response envelope', m: B('شكل ثابت لكل الردود ({ok, data, error})', 'a fixed shape for every response ({ok, data, error})'), ex: '{ "ok": false, "error": {…} }' },
        { t: '$json.params', m: B('فين بتلاقي الـ path parameters في Webhook', 'where a webhook exposes path parameters'), ex: '$json.params.id' }],
      read: ['lib:n8n Docs: Webhook node', 'lib:MDN: An overview of HTTP'],
      challenge: B('اعمل «notes API»: POST تضيف ملاحظة، GET تجيبهم، GET /:id واحدة، DELETE /:id تمسح، والتخزين في Sheet.', 'Build a "notes API": POST adds a note, GET lists them, GET /:id returns one, DELETE /:id removes it, stored in a sheet.'),
      quiz: [
        { q: B('في `/orders/:id` الـ id بيوصل في:', 'In `/orders/:id` the id arrives in:'), o: ['$json.params.id', '$json.query.id', '$json.body.id'], a: 0, why: B('path parameter.', 'A path parameter.') },
        { q: B('ليه `v1` في المسار؟', 'Why `v1` in the path?'), o: [B('عشان تغيّر بعدين من غير ما تكسر المستخدمين', 'to change later without breaking users'), B('للشكل', 'for looks'), B('إجباري', 'required')], a: 0, why: B('versioning.', 'versioning.') },
        { q: B('`?status=paid` بتوصل في:', '`?status=paid` arrives in:'), o: ['$json.query.status', '$json.params.status', '$json.headers.status'], a: 0, why: B('query string.', 'the query string.') }
      ] },

    { title: B('التحقق والأخطاء', 'Validation and errors'),
      goal: B('تتحقق من كل مدخل قبل ما تعمل أي حاجة، وترجّع 400 أو 422 برسالة واضحة.', 'Check every input before doing anything, and return 400 or 422 with a clear message.'),
      learn: [
        { h: B('اتحقق الأول', 'Check first'),
          p: B('أول حاجة بعد الـ Webhook: IF أو Code بيتأكد إن الحقول المطلوبة موجودة وأنواعها صح (إيميل، رقم موجب، تاريخ). لو غلط: رد فورًا ومتكملش.', 'Right after the Webhook: an IF or Code node checks that required fields exist and have the right types (an email, a positive number, a date). If not, reply immediately and stop.'),
          ex: 'IF: {{ $json.body.email?.isEmail() && Number($json.body.qty) > 0 }}\n  true  → continue\n  false → Respond 422' },
        { h: B('400 ولا 422', '400 or 422'),
          p: B('400 = الطلب نفسه بايظ (JSON غلط). 422 = الشكل صح بس القيم مش مقبولة (إيميل غلط). ورسالة الخطأ تقول الحقل بالظبط.', '400 = the request itself is broken (bad JSON). 422 = the shape is fine but the values aren\'t acceptable (a bad email). The error message names the exact field.'),
          ex: '{ "ok": false, "error": { "code": "invalid_email", "field": "email", "message": "email must be a valid address" } }' },
        { h: B('جمّع كل الأخطاء', 'Collect all the errors'),
          p: B('بدل ما ترفض بأول غلط، جمّع كل الحقول الغلط في Code node وارجعهم مرة واحدة. اللي بيستخدم الـ API هيشكرك.', 'Instead of rejecting on the first problem, collect every invalid field in a Code node and return them together. Your API\'s users will thank you.'),
          ex: 'errors: ["email is required", "qty must be > 0"]' }
      ],
      practice: [
        B('ضيف تحقق لـ POST /orders: email وqty وproduct.', 'Add validation to POST /orders: email, qty and product.'),
        B('رجّع 422 برسالة بتسمّي الحقل.', 'Return 422 with a message naming the field.'),
        B('اكتب Code node بيجمع كل الأخطاء في array.', 'Write a Code node that collects all errors in an array.'),
        B('اختبر بـ 5 طلبات غلط مختلفة وطلب صح.', 'Test with 5 different bad requests and one good one.')
      ],
      words: [
        { t: '422 Unprocessable', m: B('الطلب شكله صح بس القيم مش مقبولة', 'the request is well-formed but its values are not acceptable'), ex: 'qty must be positive → 422' },
        { t: 'required field', m: B('حقل لازم يتبعت', 'a field that must be sent'), ex: 'email is required' },
        { t: 'error code', m: B('كود قصير ثابت بيوصف الخطأ للبرامج', 'a short fixed code that describes an error for programs'), ex: '"code": "invalid_email"' },
        { t: 'fail fast', m: B('ترفض بدري قبل ما تعمل شغل', 'reject early, before doing any work'), ex: 'Validate before writing to the sheet.' },
        { t: 'guard clause', m: B('شرط في الأول بيوقف لو المدخل غلط', 'an early check that stops when the input is wrong'), ex: 'if (!email) return error' }],
      read: [{ lib: 'MDN: HTTP status codes', what: B('اقرا 400 و401 و403 و404 و409 و422.', 'Read 400, 401, 403, 404, 409 and 422.') }],
      challenge: B('اعمل «validation sub-workflow» بياخد body وقواعد (required، email، number > 0) ويرجّع list أخطاء، واستخدمه في endpointين.', 'Build a "validation sub-workflow" that takes a body and rules (required, email, number > 0) and returns a list of errors; use it in two endpoints.'),
      quiz: [
        { q: B('إيميل مكتوب غلط في body صحيح الشكل:', 'A malformed email in a well-formed body:'), o: ['422', '500', '200'], a: 0, why: B('القيمة مش مقبولة.', 'The value isn\'t acceptable.') },
        { q: B('التحقق بيحصل:', 'Validation happens:'), o: [B('أول حاجة بعد الـ Webhook', 'right after the Webhook'), B('في الآخر', 'at the end'), B('مش مهم', 'never')], a: 0, why: B('fail fast.', 'fail fast.') },
        { q: B('رسالة الخطأ الكويسة:', 'A good error message:'), o: ['error', 'email must be a valid address', '???'], a: 1, why: B('بتسمّي الحقل والمشكلة.', 'It names the field and the problem.') }
      ] },

    { title: B('تأمين الـ webhook', 'Securing a webhook'),
      goal: B('تأمّن الـ API بمفتاح أو JWT أو توقيع HMAC، وتقصره على مصادر معينة.', 'Secure the API with a key, a JWT or an HMAC signature, and limit it to known sources.'),
      learn: [
        { h: B('3 مستويات', 'Three levels'),
          p: B('Header Auth (مفتاح ثابت) = بسيط. JWT = token موقّع فيه بيانات وتاريخ انتهاء. HMAC signature = الخدمة بتوقّع الـ body بسر مشترك وانت بتتأكد — ده اللي Stripe وGitHub بيعملوه.', 'Header Auth (a fixed key) = simple. JWT = a signed token with data and an expiry. HMAC signature = the service signs the body with a shared secret and you verify it — what Stripe and GitHub do.'),
          ex: 'X-Hub-Signature-256: sha256=…\n→ Crypto node: HMAC SHA256 of the raw body with the secret → compare' },
        { h: B('التحقق من التوقيع', 'Verifying a signature'),
          p: B('فعّل Raw Body في الـ Webhook، واحسب HMAC بـ Crypto node بنفس الـ secret، وقارن بالـ header. لو مختلف: 401 ومتكملش.', 'Turn on Raw Body in the Webhook, compute the HMAC with the Crypto node using the same secret, and compare with the header. If they differ: 401 and stop.'),
          ex: 'Crypto: Action Hmac, Type SHA256, Value = raw body, Secret = ••••' },
        { h: B('حماية إضافية', 'Extra protection'),
          p: B('Webhook options: IP(s) Whitelist (تقبل من عناوين معينة)، وAllowed Origins (CORS) للمتصفحات. ومتسيبش endpoint بيعدّل بيانات من غير مصادقة أبدًا.', 'Webhook options: IP(s) Whitelist (accept only certain addresses) and Allowed Origins (CORS) for browsers. Never leave an endpoint that changes data without authentication.'),
          ex: 'IP(s) Whitelist: 203.0.113.10' }
      ],
      practice: [
        B('أمّن endpoint بـ Header Auth واختبر من غير مفتاح (لازم 403).', 'Secure an endpoint with Header Auth and test without the key (must be refused).'),
        B('اعمل HMAC SHA256 بـ Crypto node لنص معين وقارن بأداة أونلاين.', 'Compute an HMAC SHA256 of a text with the Crypto node and compare with an online tool.'),
        B('اعمل webhook بيتحقق من توقيع بـ secret مشترك (ابعت الطلب من workflow تاني بيوقّع).', 'Build a webhook that verifies a signature with a shared secret (send the request from another workflow that signs it).'),
        B('جرّب IP(s) Whitelist بعنوانك.', 'Try the IP(s) Whitelist with your own address.')
      ],
      words: [
        { t: 'HMAC signature', m: B('توقيع للـ body بسر مشترك يثبت إن الطلب من المصدر الصح', 'a signature of the body with a shared secret proving who sent it'), ex: 'X-Hub-Signature-256' },
        { t: 'Crypto node', m: B('node بتعمل hash وHMAC وتوليد قيم عشوائية', 'a node that creates hashes, HMACs and random values'), ex: 'Crypto → Hmac → SHA256' },
        { t: 'JWT', m: B('token موقّع فيه بيانات وتاريخ انتهاء', 'a signed token carrying data and an expiry'), ex: 'Authorization: Bearer eyJ…' },
        { t: 'Raw Body', m: B('خيار في Webhook بيسيب الـ body زي ما هو (مهم للتوقيع)', 'a Webhook option that keeps the body exactly as sent (needed for signatures)'), ex: 'Enable Raw Body before verifying.' },
        { t: 'IP whitelist', m: B('قايمة عناوين مسموحلها بس تكلم الـ endpoint', 'a list of the only addresses allowed to call the endpoint'), ex: 'IP(s) Whitelist: 203.0.113.10' }],
      read: ['lib:n8n Docs: Securing n8n', { t: 'OWASP REST Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html', what: B('اقرا أقسام HTTPS والـ API keys والـ input validation.', 'Read the sections on HTTPS, API keys and input validation.') }],
      challenge: B('وصّل webhook حقيقي من GitHub (repo عندك) وتحقق من التوقيع، وابعت على Telegram كل push باسم الـ branch والـ commits.', 'Connect a real GitHub webhook (from one of your repos), verify its signature, and send each push to Telegram with the branch and commits.'),
      quiz: [
        { q: B('Stripe وGitHub بيأمّنوا الـ webhooks بـ:', 'Stripe and GitHub secure webhooks with:'), o: ['HMAC signature', B('باسورد في الـ URL', 'a password in the URL'), B('ولا حاجة', 'nothing')], a: 0, why: B('توقيع بسر مشترك.', 'A signature with a shared secret.') },
        { q: B('ليه Raw Body مهم للتوقيع؟', 'Why does Raw Body matter for signatures?'), o: [B('لازم تحسب على البايتات الأصلية بالظبط', 'you must hash the exact original bytes'), B('أسرع', 'faster'), B('مش مهم', 'it doesn\'t')], a: 0, why: B('أي تغيير بيبوّظ التوقيع.', 'Any change breaks the signature.') },
        { q: B('endpoint بيمسح بيانات من غير مصادقة:', 'An endpoint that deletes data without auth:'), o: [B('خطر، ممنوع', 'dangerous; never'), B('عادي', 'fine'), B('أسرع', 'faster')], a: 0, why: B('أي حد يقدر يمسح.', 'Anyone could delete.') }
      ] },

    { title: B('استقبال webhooks من خدمات', 'Receiving webhooks from services'),
      goal: B('تستقبل أحداث من خدمات (دفع، GitHub، فورمز)، وتفرز أنواعها، وتمنع معالجة نفس الحدث مرتين.', 'Receive events from services (payments, GitHub, forms), sort their types, and avoid processing the same event twice.'),
      learn: [
        { h: B('event types', 'Event types'),
          p: B('خدمة واحدة بتبعت أنواع كتير على نفس الـ URL: payment.succeeded، payment.failed، refund.created. Switch على `$json.body.type` يفرّقهم.', 'One service sends many event types to the same URL: payment.succeeded, payment.failed, refund.created. A Switch on `$json.body.type` separates them.'),
          ex: 'Switch on {{ $json.body.type }}\n  payment.succeeded → mark paid\n  payment.failed    → email customer\n  default           → log only' },
        { h: B('الخدمة بتعيد الإرسال', 'Services retry'),
          p: B('لو ردّيت متأخر أو بخطأ، الخدمة بتبعت نفس الحدث تاني. فلازم idempotency: خزّن event ID، ولو شفته قبل كده، رد 200 ومتعملش حاجة.', 'If you reply late or with an error, the service sends the same event again. So you need idempotency: store the event ID, and if you\'ve seen it, reply 200 and do nothing.'),
          ex: 'Event id evt_123 already in the "events" sheet → Respond 200 → stop' },
        { h: B('delivery log', 'The delivery log'),
          p: B('لوحة الخدمة فيها سجل بكل webhook اتبعت وردّك عليه. أول مكان تبص فيه لو حاجة موصلتش، ومنه تقدر تعيد الإرسال للتجربة.', 'The service dashboard has a log of every webhook sent and your reply. It\'s the first place to look when something didn\'t arrive, and you can resend from it for testing.'),
          ex: 'Stripe → Developers → Webhooks → Events → Resend' }
      ],
      practice: [
        B('اعمل webhook بيفرز 3 أنواع أحداث بـ Switch.', 'Build a webhook that sorts 3 event types with a Switch.'),
        B('خزّن event ID في Sheet وارفض التكرار.', 'Store the event ID in a sheet and reject duplicates.'),
        B('ابعت نفس الحدث مرتين واتأكد إنه اتعالج مرة واحدة.', 'Send the same event twice and confirm it was processed once.'),
        B('افتح delivery log لخدمة (GitHub مثلًا) وشوف ردودك.', 'Open a service\'s delivery log (GitHub, for example) and see your replies.')
      ],
      words: [
        { t: 'event type', m: B('نوع الحدث اللي الخدمة بتبلّغ عنه', 'the kind of event a service reports'), ex: 'payment.succeeded' },
        { t: 'event ID', m: B('رقم فريد لكل حدث، بتستخدمه تمنع التكرار', 'a unique ID for each event, used to avoid duplicates'), ex: 'evt_123' },
        { t: 'webhook retries (sender)', m: B('الخدمة بتعيد إرسال الحدث لو ردك اتأخر أو فشل', 'the service resends an event if your reply is slow or fails'), ex: 'Reply 200 quickly to stop retries.' },
        { t: 'delivery log', m: B('سجل في لوحة الخدمة بكل webhook اتبعت وردّه', 'a record in the service dashboard of every webhook sent and its reply'), ex: 'Check the delivery log first.' },
        { t: 'signing secret', m: B('السر اللي الخدمة بتوقّع بيه الـ webhooks', 'the secret a service uses to sign webhooks'), ex: 'whsec_•••' }],
      read: ['lib:Webhook.site', 'lib:n8n Docs: Splitting with conditionals'],
      challenge: B('اعمل «payments listener» (بـ Stripe test mode أو محاكاة): يتحقق من التوقيع، ويمنع التكرار، ويحدّث حالة الطلب في Sheet، ويبعت إيميل للعميل حسب نوع الحدث.', 'Build a "payments listener" (with Stripe test mode or a simulation): verify the signature, prevent duplicates, update the order status in a sheet, and email the customer according to the event type.'),
      quiz: [
        { q: B('نفس الحدث وصل مرتين. الحل:', 'The same event arrived twice. The fix:'), o: [B('خزّن event ID وتجاهل المكرر', 'store the event ID and skip repeats'), B('امسح الـ webhook', 'delete the webhook'), B('رد 500', 'reply 500')], a: 0, why: B('idempotency.', 'idempotency.') },
        { q: B('ليه الخدمة بعتت الحدث تاني؟', 'Why did the service resend the event?'), o: [B('ردك اتأخر أو كان خطأ', 'your reply was late or an error'), B('صدفة', 'by chance'), B('عشان تزهقك', 'to annoy you')], a: 0, why: B('webhook retries.', 'webhook retries.') },
        { q: B('تفرز أنواع الأحداث بـ:', 'Sort event types with:'), o: ['Switch on body.type', 'Wait', 'Merge'], a: 0, why: B('فرع لكل نوع.', 'One branch per type.') }
      ] },

    { title: B('اختبار وتوثيق الـ API', 'Testing and documenting the API'),
      goal: B('تعمل مجموعة اختبارات للـ API وتوثقه عشان أي حد يستخدمه من غير ما يسألك.', 'Build a test set for the API and document it so anyone can use it without asking you.'),
      learn: [
        { h: B('مجموعة اختبارات', 'A test set'),
          p: B('لكل endpoint: طلب صح، وطلب ناقص حقل، وطلب من غير مصادقة، وطلب بـ id مش موجود. احفظهم كـ Postman collection أو ملف curl، وشغّلهم بعد أي تعديل.', 'For each endpoint: a good request, one missing a field, one without auth, and one with an unknown id. Save them as a Postman collection or a curl file and run them after every change.'),
          ex: 'POST ok → 201\nPOST missing email → 422\nPOST no key → 403\nGET /orders/999 → 404' },
        { h: B('توثيق الـ API', 'API documentation'),
          p: B('لكل endpoint: method وpath، والمصادقة، والباراميترز (required/optional)، ومثال طلب ورد، والأخطاء الممكنة. زي أي API reference محترم.', 'For each endpoint: method and path, auth, parameters (required/optional), a sample request and response, and possible errors — like any proper API reference.'),
          ex: '### POST /v1/orders\nAuth: X-Api-Key\nBody: email (required), qty (required, > 0)\nErrors: 403, 422' },
        { h: B('CORS', 'CORS'),
          p: B('لو صفحة ويب (JavaScript في المتصفح) هتكلم الـ API بتاعك، المتصفح هيطلب CORS. في Webhook options: Allowed Origins = دومين موقعك بس، مش *.', 'If a web page (browser JavaScript) calls your API, the browser requires CORS. In the Webhook options: Allowed Origins = your site\'s domain only, not *.'),
          ex: 'Allowed Origins (CORS): https://mysite.com' }
      ],
      practice: [
        B('اعمل Postman collection أو ملف curl بـ 8 اختبارات لـ API بتاعك.', 'Build a Postman collection or curl file with 8 tests for your API.'),
        B('شغّلهم كلهم واكتب النتيجة جنب كل واحد.', 'Run them all and write the result next to each.'),
        B('اكتب docs لكل endpoint بالقالب.', 'Write docs for each endpoint with the template.'),
        B('نادي الـ API من صفحة HTML بسيطة وظبّط CORS.', 'Call the API from a simple HTML page and set up CORS.')
      ],
      words: [
        { t: 'Postman collection', m: B('مجموعة طلبات محفوظة لاختبار API', 'a saved set of requests for testing an API'), ex: 'Export the collection with the repo.' },
        { t: 'CORS', m: B('قواعد المتصفح لطلبات من موقع لموقع تاني', 'browser rules for requests from one site to another'), ex: 'Allowed Origins: https://mysite.com' },
        { t: 'regression test', m: B('اختبار بتعيده بعد أي تعديل عشان متكسرش حاجة كانت شغالة', 'a test you rerun after every change so working things don\'t break'), ex: 'Run the 8 tests after each edit.' },
        { t: 'sample request', m: B('مثال طلب جاهز في التوثيق', 'a ready example request in the docs'), ex: 'curl -X POST … -d \'{"email":"a@b.c","qty":1}\'' },
        { t: 'uptime check', m: B('فحص دوري إن الـ endpoint شغال', 'a periodic check that the endpoint is up'), ex: 'Ping /v1/health every 5 minutes.' }],
      read: ['lib:Postman Learning Center', 'lib:Everything curl'],
      challenge: B('اعمل endpoint `/v1/health` بيرد {ok:true, time}، وworkflow تاني كل 5 دقايق بيتأكد إنه شغال ويبعتلك لو وقع.', 'Create a `/v1/health` endpoint returning {ok:true, time}, and another workflow that checks it every 5 minutes and alerts you if it\'s down.'),
      quiz: [
        { q: B('اختبار لازم يكون في المجموعة:', 'A test that must be in the set:'), o: [B('طلب من غير مصادقة', 'a request without auth'), B('طلب بس صح', 'only good requests'), B('ولا واحد', 'none')], a: 0, why: B('تتأكد إن الحماية شغالة.', 'To confirm protection works.') },
        { q: B('Allowed Origins الأأمن:', 'The safest Allowed Origins:'), o: [B('دومين موقعك بس', 'only your site\'s domain'), B('*', '*'), B('فاضي', 'empty')], a: 0, why: B('* = أي موقع.', '* = any site.') },
        { q: B('توثيق endpoint لازم فيه:', 'Endpoint docs must include:'), o: [B('method وpath وauth وأمثلة وأخطاء', 'method, path, auth, examples and errors'), B('اسمك بس', 'just your name'), B('الكود كله', 'all the code')], a: 0, why: B('عشان حد يستخدمه لوحده.', 'So someone can use it alone.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 8 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 8 opens when you score 70% or more.'),
      review: [
        B('routes وpath/query parameters وv1 وشكل رد ثابت.', 'Routes, path/query parameters, v1 and a consistent response shape.'),
        B('تحقق بدري، 400 مقابل 422، ورسايل بتسمّي الحقل.', 'Early validation, 400 vs. 422, and messages that name the field.'),
        B('Header Auth وJWT وHMAC وRaw Body وIP whitelist.', 'Header Auth, JWT, HMAC, Raw Body and IP whitelist.'),
        B('event types وevent ID وretries من الخدمة.', 'Event types, event IDs and sender retries.'),
        B('اختبارات وتوثيق وCORS وhealth check.', 'Tests, docs, CORS and a health check.')
      ],
      project: B('ابني «Booking API» كامل: GET /v1/slots (مواعيد فاضية)، POST /v1/bookings (بتحقق وتمنع حجز نفس الميعاد مرتين)، GET /v1/bookings/:id، DELETE /v1/bookings/:id، محمي بمفتاح، ورسايل أخطاء واضحة، وhealth check، ومجموعة 10 اختبارات، وتوثيق كامل في README.',
                 'Build a complete "Booking API": GET /v1/slots (free times), POST /v1/bookings (validated, preventing double-booking the same slot), GET /v1/bookings/:id, DELETE /v1/bookings/:id — protected by a key, with clear errors, a health check, a set of 10 tests, and full documentation in the README.'),
      test: [
        { q: B('كل Webhook node بتمثل:', 'Each Webhook node represents:'), o: [B('endpoint واحد', 'one endpoint'), B('API كامل', 'a whole API'), B('credential', 'a credential')], a: 0, why: B('method + path.', 'method + path.') },
        { q: B('`$json.body` فيه:', '`$json.body` holds:'), o: [B('البيانات المبعوتة في الطلب', 'the data sent in the request'), B('الـ URL', 'the URL'), B('الـ headers', 'the headers')], a: 0, why: B('POST body.', 'the POST body.') },
        { q: B('طلب JSON بايظ (مش بيتقري):', 'An unreadable (broken) JSON request:'), o: ['400', '422', '201'], a: 0, why: B('الطلب نفسه غلط.', 'The request itself is broken.') },
        { q: B('fail fast يعني:', 'fail fast means:'), o: [B('ترفض بدري قبل أي شغل', 'reject early, before any work'), B('تشتغل بسرعة', 'work quickly'), B('تتجاهل الأخطاء', 'ignore errors')], a: 0, why: B('تحقق أولًا.', 'Validate first.') },
        { q: B('تتحقق من توقيع HMAC بـ:', 'Verify an HMAC signature with:'), o: ['Crypto node', 'Wait node', 'Merge node'], a: 0, why: B('HMAC SHA256.', 'HMAC SHA256.') },
        { q: B('JWT هو:', 'A JWT is:'), o: [B('token موقّع فيه بيانات وانتهاء', 'a signed token with data and an expiry'), B('ملف JSON عادي', 'a normal JSON file'), B('نوع قاعدة بيانات', 'a database type')], a: 0, why: B('JSON Web Token.', 'JSON Web Token.') },
        { q: B('IP(s) Whitelist بيعمل:', 'IP(s) Whitelist:'), o: [B('يقبل من عناوين معينة بس', 'accepts only certain addresses'), B('يمنع الكل', 'blocks everyone'), B('يسرّع', 'speeds up')], a: 0, why: B('قايمة مسموحين.', 'An allow list.') },
        { q: B('idempotency في الـ webhooks بتتحقق بـ:', 'Webhook idempotency relies on:'), o: ['event ID', 'the time only', 'the IP'], a: 0, why: B('معرّف فريد.', 'A unique identifier.') },
        { q: B('أول مكان تبص فيه لو webhook موصلش:', 'First place to look when a webhook didn\'t arrive:'), o: ['delivery log', 'Google', B('الـ README', 'the README')], a: 0, why: B('فيه كل محاولة إرسال.', 'It has every attempt.') },
        { q: B('regression test بيتعمل:', 'A regression test runs:'), o: [B('بعد أي تعديل', 'after every change'), B('مرة في السنة', 'once a year'), B('أبدًا', 'never')], a: 0, why: B('عشان متكسرش القديم.', 'So old things don\'t break.') },
        { q: B('CORS مهم لما:', 'CORS matters when:'), o: [B('صفحة في المتصفح بتكلم الـ API', 'a browser page calls the API'), B('curl بيكلمه', 'curl calls it'), B('n8n بيكلم نفسه', 'n8n calls itself')], a: 0, why: B('قواعد المتصفح.', 'Browser rules.') },
        { q: B('/v1/health بيستخدم لـ:', '/v1/health is used for:'), o: [B('فحص إن الخدمة شغالة', 'checking the service is up'), B('بيانات العملاء', 'customer data'), B('الدفع', 'payments')], a: 0, why: B('uptime check.', 'an uptime check.') }
      ] }
  ]
};
