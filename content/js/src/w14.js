// JavaScript week 14 — fetch and APIs.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('fetch والـ APIs', 'fetch and APIs'),
  goal: B('تكلّم أي API من جافاسكريبت: تجيب وتبعت JSON، وتفهم الـ status والـ headers والمصادقة والـ CORS، وتبني عميل API صغير بيتعامل مع الأخطاء والمهلة والحدود والصفحات — زي ما n8n بيعمل جوه HTTP Request node.',
          'Talk to any API from JavaScript: get and send JSON, understand status codes, headers, auth and CORS, and build a small API client that handles errors, timeouts, limits and pages — just like n8n does inside the HTTP Request node.'),
  days: [
    { title: B('fetch: أول طلب', 'fetch: the first request'),
      goal: B('تجيب بيانات من API وتتأكد إن الرد سليم.', 'Get data from an API and check the reply is sound.'),
      learn: [
        L(B('الطلب والرد', 'Request and response'),
          B('الـ **rest api** بيدّيك **endpoint** (رابط) لكل نوع بيانات: `/users/1`، `/orders?status=paid`. `fetch(url)` بيرجّع Promise بـ **Response** فيه `status` و`headers`، والجسم بتقراه بخطوة تانية: `await res.json()` (أو `.text()`). يعني خطوتين await.', 'A **rest api** gives you an **endpoint** (a URL) for each kind of data: `/users/1`, `/orders?status=paid`. `fetch(url)` returns a promise of a **Response** with `status` and `headers`, and you read the body in a second step: `await res.json()` (or `.text()`). So: two awaits.'),
          '(async () => {\n  try {\n    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");\n    console.log("status", res.status, res.headers.get("content-type"));\n    const user = await res.json();\n    console.log(user.name, "·", user.email, "·", user.address.city);\n  } catch (err) {\n    console.log("failed:", err.message);\n  }\n})();', J),
        L(B('fetch مبيفشلش على 404!', 'fetch does not fail on 404!'),
          B('أهم فخ: fetch بيرفض (reject) بس لو **مفيش رد خالص** (**network error**: مفيش نت، DNS، CORS). لو السيرفر رد 404 أو 500، fetch **بينجح** عادي! لازم تفحص `res.ok` (يعني status من 200 لـ 299) بنفسك وترمي خطأ.', 'The biggest trap: fetch rejects only when there is **no reply at all** (a **network error**: no internet, DNS, CORS). If the server answers 404 or 500, fetch **succeeds** as normal! You must check `res.ok` (status 200–299) yourself and throw.'),
          '(async () => {\n  try {\n    const res = await fetch("https://jsonplaceholder.typicode.com/users/9999");\n    console.log("fetch resolved anyway; status", res.status, "ok?", res.ok);\n    if (!res.ok) throw new Error(`HTTP ${res.status} for /users/9999`);\n  } catch (err) {\n    console.log("failed:", err.message);\n  }\n})();', J),
        L(B('الأكواد اللي هتقابلها', 'The codes you will meet'),
          B('**http status**: 2xx نجاح (200 تمام، 201 اتعمل، 204 مفيش جسم)؛ 3xx تحويل؛ 4xx غلطتك (400 بيانات غلط، 401 مش مسجّل، 403 ممنوع، 404 مش موجود، 409 تعارض، 422 تحقق فشل، 429 كتير قوي)؛ 5xx غلطة السيرفر (500، 502، 503). أول رقم بيقولك تعيد المحاولة ولا تصلّح طلبك.', '**http status** codes: 2xx success (200 OK, 201 created, 204 no body); 3xx redirect; 4xx your mistake (400 bad data, 401 not signed in, 403 forbidden, 404 not found, 409 conflict, 422 validation failed, 429 too many); 5xx the server’s mistake (500, 502, 503). The first digit tells you whether to retry or fix your request.'),
          'const advice = status =>\n  status < 300 ? "use the data" :\n  status === 429 || status >= 500 ? "wait and retry" :\n  status === 401 ? "refresh the token" :\n  "fix the request (do not retry)";\n[200, 201, 400, 401, 404, 422, 429, 503].forEach(s => console.log(s, "→", advice(s)));', J)
      ],
      practice: [
        B('هات /posts?userId=1 واطبع عناوين البوستات.', 'Get /posts?userId=1 and print the post titles.'),
        B('اطلب رابط غلط وتأكد إن res.ok بيمسكه.', 'Request a wrong URL and make sure res.ok catches it.'),
        B('افصل النت وشوف شكل الـ network error.', 'Turn off the internet and see what a network error looks like.'),
        B('افتح Network في DevTools وشوف الطلب والـ headers.', 'Open Network in DevTools and look at the request and headers.')
      ],
      words: [
        W('rest api', 'API بروابط لكل مورد وأفعال HTTP', 'an API with a URL per resource and HTTP verbs', 'The shop exposes a REST API.'),
        W('endpoint', 'رابط محدد في الـ API', 'a specific URL in an API', 'The /orders endpoint lists orders.'),
        W('res.ok', 'true لو الـ status من 200 لـ 299', 'true when the status is 200–299', 'Always check res.ok after fetch.'),
        W('response.json', 'قراءة جسم الرد كـ JSON', 'reading the reply body as JSON', 'await response.json() returns an object.'),
        W('network error', 'مفيش رد خالص من السيرفر', 'no reply from the server at all', 'fetch rejects only on a network error.'),
        W('http status', 'رقم بيوصف نتيجة الطلب', 'a number describing the request result', 'Log the HTTP status with every failure.')
      ],
      read: [{ lib: 'MDN: Using the Fetch API', what: B('اقرا Making a request وChecking response status.', 'Read Making a request and Checking response status.') }, { t: 'MDN: HTTP response status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status', what: B('لف على الأكواد الشائعة.', 'Skim the common codes.') }],
      challenge: B('اعمل صفحة بتجيب 10 مستخدمين من JSONPlaceholder وتعرضهم في جدول (اسم، مدينة، شركة)، بمؤشر تحميل، ورسالة واضحة لو حصل خطأ شبكة أو status غلط.', 'Build a page that loads 10 users from JSONPlaceholder and shows them in a table (name, city, company), with a loading indicator and a clear message on a network error or a bad status.'),
      quiz: [
        Q(B('السيرفر رد 404، fetch:', 'The server replied 404; fetch:'), [['بينجح وres.ok = false', 'resolves with res.ok = false'], ['بيرمي خطأ', 'throws'], ['بيرجع null', 'returns null']], 0, B('افحص res.ok.', 'Check res.ok.')),
        Q(B('قراءة الجسم JSON:', 'Reading a JSON body:'), ['await res.json()', 'res.body', 'JSON.parse(res)'], 0, B('خطوة تانية.', 'A second step.')),
        Q(B('401 معناها:', '401 means:'), [['مش مسجّل/توكن غلط', 'not signed in / bad token'], ['السيرفر واقع', 'the server is down'], ['تمام', 'OK']], 0, B('مصادقة.', 'Authentication.'))
      ] },

    { title: B('إرسال البيانات', 'Sending data'),
      goal: B('تبعت JSON وفورمز وparameters بالشكل الصح.', 'Send JSON, forms and parameters the right way.'),
      learn: [
        L(B('POST بـ JSON', 'POST with JSON'),
          B('**post request** بيبعت بيانات: `method: "POST"`، وheader `Content-Type: application/json`، والجسم `JSON.stringify(data)`. ده بالظبط اللي بتعمله لما تبعت لـ webhook بتاع n8n. الرد غالبًا 201 ومعاه الكائن الجديد بـ id.', 'A **post request** sends data: `method: "POST"`, the header `Content-Type: application/json`, and the body `JSON.stringify(data)`. This is exactly what you do when sending to an n8n webhook. The reply is usually 201 with the new object and its id.'),
          '(async () => {\n  try {\n    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({ title: "New order #101", body: "2 notebooks", userId: 7 }),\n    });\n    console.log("status", res.status);           // 201 created\n    console.log(await res.json());               // the saved object with an id\n  } catch (err) { console.log("failed:", err.message); }\n})();', J),
        L(B('الـ query string', 'The query string'),
          B('الفلاتر والبحث والصفحات بتتبعت في **query string** (`?status=paid&limit=20`). متركّبهاش بإيدك بـ `+` — النص العربي والمسافات والرموز لازم تتشفّر. **URLSearchParams** بيعمل ده صح، و`new URL()` بيبني الرابط كامل.', 'Filters, search and pages go in the **query string** (`?status=paid&limit=20`). Do not build it by hand with `+` — Arabic text, spaces and symbols must be encoded. **URLSearchParams** does this right, and `new URL()` builds the whole link.'),
          'const url = new URL("https://dummyjson.com/products/search");\nurl.search = new URLSearchParams({ q: "phone case", limit: 3, select: "title,price" });\nconsole.log(url.href);\nconsole.log(new URLSearchParams({ city: "القاهرة", note: "a&b=c" }).toString());\nconst back = new URL("https://x.test/?status=paid&page=2").searchParams;\nconsole.log(back.get("status"), Number(back.get("page")) + 1);', J),
        L(B('PUT وPATCH وDELETE', 'PUT, PATCH and DELETE'),
          B('**put** = استبدل الكائن كله، **patch** = عدّل حقول بس، و**delete request** = امسح. PUT وDELETE **idempotent**: تكرارهم بنفس النتيجة؛ POST لأ (مرتين = طلبين). وللفورمز بملفات: `FormData` من غير Content-Type (المتصفح بيحطه بالـ boundary).', 'A **put** replaces the whole object, a **patch** changes some fields, and a **delete request** removes it. PUT and DELETE are **idempotent**: repeating them gives the same result; POST is not (twice = two orders). For forms with files: `FormData` without a Content-Type (the browser sets it with the boundary).'),
          'await fetch(`${BASE}/orders/101`, { method: "PATCH", headers: JSON_HEADERS, body: JSON.stringify({ status: "shipped" }) });\nawait fetch(`${BASE}/orders/101`, { method: "DELETE" });\n\nconst form = new FormData();\nform.append("orderId", "101");\nform.append("invoice", fileInput.files[0]);        // a file from <input type="file">\nawait fetch(`${BASE}/invoices`, { method: "POST", body: form });   // no Content-Type header here', S)
      ],
      practice: [
        B('ابعت POST لـ JSONPlaceholder واطبع الـ id.', 'Send a POST to JSONPlaceholder and print the id.'),
        B('ابني رابط بحث فيه نص عربي بـ URLSearchParams.', 'Build a search URL with Arabic text using URLSearchParams.'),
        B('اعمل PATCH لتغيير عنوان بوست.', 'Send a PATCH changing a post’s title.'),
        B('ابعت فورم صغير لـ webhook n8n تجريبي.', 'Send a small form to a test n8n webhook.')
      ],
      words: [
        W('post request', 'طلب بيبعت بيانات جديدة', 'a request sending new data', 'The form makes a POST request.'),
        W('content-type', 'header بيقول نوع الجسم', 'a header saying the body’s type', 'Set Content-Type to application/json.'),
        W('query string', 'الجزء بعد ? في الرابط', 'the part after ? in a URL', 'Put the filters in the query string.'),
        W('urlsearchparams', 'أداة لبناء وقراءة الـ query string', 'a tool to build and read query strings', 'URLSearchParams encodes Arabic safely.'),
        W('put', 'استبدال كائن كامل', 'replacing a whole object', 'PUT sends the full record.'),
        W('patch', 'تعديل حقول محددة', 'changing some fields', 'PATCH only the status field.'),
        W('idempotent', 'تكراره بيدّي نفس النتيجة', 'repeating it gives the same result', 'DELETE is idempotent; POST is not.')
      ],
      read: [{ t: 'MDN: URLSearchParams', url: 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams', what: B('اقرا الأمثلة.', 'Read the examples.') }, { lib: 'JSONPlaceholder', what: B('اقرا Guide: كل الأفعال.', 'Read the Guide: every verb.') }],
      challenge: B('اعمل فورم «طلب جديد» بيبعت JSON لـ JSONPlaceholder (أو webhook n8n)، يعطّل الزرار أثناء الإرسال، ويعرض رقم الطلب من الرد أو رسالة الخطأ.', 'Build a «new order» form that sends JSON to JSONPlaceholder (or an n8n webhook), disables the button while sending, and shows the order id from the reply or the error.'),
      quiz: [
        Q(B('إرسال JSON محتاج:', 'Sending JSON needs:'), [['Content-Type وJSON.stringify', 'Content-Type and JSON.stringify'], ['كائن مباشرة', 'the object directly'], ['GET', 'GET']], 0, B('الجسم نص.', 'The body is text.')),
        Q(B('نص عربي في رابط:', 'Arabic text in a URL:'), ['URLSearchParams', B('+ عادي', 'plain +'), B('مينفعش', 'impossible')], 0, B('تشفير صح.', 'Correct encoding.')),
        Q(B('مين مش idempotent؟', 'Which is not idempotent?'), ['POST', 'PUT', 'DELETE'], 0, B('مرتين = طلبين.', 'Twice = two orders.'))
      ] },

    { title: B('الـ headers والمصادقة والـ CORS', 'Headers, auth and CORS'),
      goal: B('تبعت مفاتيح بأمان وتفهم أخطاء CORS.', 'Send keys safely and understand CORS errors.'),
      learn: [
        L(B('الـ headers والتوكن', 'Headers and tokens'),
          B('الـ **request header** بيحمل معلومات عن الطلب: نوعه، لغته، والمصادقة. أشهرها `Authorization: Bearer <token>` (**bearer token**) أو `X-API-Key`. والـ **response header** بيرجّع معلومات زي `Retry-After` و`X-RateLimit-Remaining`.', 'A **request header** carries information about the request: its type, language and auth. The most common: `Authorization: Bearer <token>` (a **bearer token**) or `X-API-Key`. A **response header** returns information such as `Retry-After` and `X-RateLimit-Remaining`.'),
          '(async () => {\n  try {\n    const res = await fetch("https://httpbin.org/headers", {\n      headers: { Authorization: "Bearer demo-token-not-real", "Accept-Language": "ar" },\n    });\n    const { headers } = await res.json();          // httpbin echoes what it received\n    console.log(headers.Authorization, "|", headers["Accept-Language"]);\n  } catch (err) { console.log("failed:", err.message); }\n})();', J),
        L(B('المفاتيح مكانها السيرفر', 'Keys belong on the server'),
          B('أي **api key** في كود المتصفح **مكشوف** — أي حد يفتح DevTools ياخده. القاعدة: المفاتيح السرية في السيرفر أو n8n بس، والمتصفح يكلّم **proxy** بتاعك (webhook n8n أو API صغير) وهو اللي يضيف المفتاح. المفاتيح العامة (زي Supabase anon مع RLS) استثناء متصمم لكده.', 'Any **api key** in browser code is **exposed** — anyone opening DevTools can take it. The rule: secret keys live only on the server or in n8n, and the browser calls your **proxy** (an n8n webhook or a small API) which adds the key. Public keys (like Supabase anon with RLS) are an exception designed for this.'),
          'browser ──POST /webhook/quote {product}──▶ n8n (holds the OpenAI/CRM key) ──▶ provider API\n        ◀────────── {price, text} ──────────────┘\n// the browser never sees the secret key', { lang: 'text' }),
        L(B('الـ CORS', 'CORS'),
          B('المتصفح بيمنع صفحة على `site-a` تقرا رد من `api-b` إلا لو `api-b` قال إنه موافق بـ header `Access-Control-Allow-Origin`. ده **cors**. لو الطلب مش بسيط (JSON، headers خاصة) المتصفح بيبعت **preflight** (OPTIONS) الأول. الخطأ ده في المتصفح بس — نفس الطلب من Node أو n8n بيشتغل. والحل في السيرفر مش في الـ fetch.', 'The browser stops a page on `site-a` from reading a reply from `api-b` unless `api-b` says it agrees with the `Access-Control-Allow-Origin` header. That is **cors**. If the request is not simple (JSON, custom headers) the browser first sends a **preflight** (OPTIONS). The error happens only in browsers — the same request from Node or n8n works. The fix is on the server, not in fetch.'),
          '// in the console: "blocked by CORS policy: No \'Access-Control-Allow-Origin\' header"\n// ✗ mode: "no-cors" does not fix it — you get an empty, unreadable reply\n// ✓ the API (or your proxy) answers with:\n//   Access-Control-Allow-Origin: https://my-site.example\n//   Access-Control-Allow-Headers: Content-Type, Authorization', S)
      ],
      practice: [
        B('ابعت header مخصوص لـ httpbin واتأكد إنه وصل.', 'Send a custom header to httpbin and confirm it arrived.'),
        B('دوّر في كود قديم عندك على مفتاح في الواجهة وانقله لـ n8n.', 'Find a key in your old front-end code and move it to n8n.'),
        B('اعمل طلب لـ API مش بيدعم CORS وشوف الخطأ في الكونسول.', 'Call an API without CORS support and read the console error.'),
        B('شوف طلب preflight في Network.', 'Find a preflight request in the Network tab.')
      ],
      words: [
        W('request header', 'معلومة مبعوتة مع الطلب', 'information sent with a request', 'Add the token as a request header.'),
        W('response header', 'معلومة راجعة مع الرد', 'information returned with a reply', 'Read the Retry-After response header.'),
        W('bearer token', 'توكن بيتبعت في Authorization', 'a token sent in Authorization', 'Send the bearer token on each call.'),
        W('api key', 'مفتاح سري للدخول على API', 'a secret key for an API', 'Never ship an API key to the browser.'),
        W('proxy', 'وسيط بيبعت الطلب بالنيابة عنك', 'a middleman sending the request for you', 'n8n acts as a proxy for the AI API.'),
        W('cors', 'قواعد المتصفح للطلبات بين المواقع', 'browser rules for cross-site requests', 'The API must allow CORS for our site.'),
        W('preflight', 'طلب OPTIONS قبل الطلب الحقيقي', 'an OPTIONS request before the real one', 'JSON requests trigger a preflight.')
      ],
      read: [{ t: 'MDN: Cross-Origin Resource Sharing (CORS)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS', what: B('اقرا Simple requests وPreflighted requests.', 'Read Simple requests and Preflighted requests.') }, { lib: 'MDN: HTTP overview', what: B('اقرا HTTP messages.', 'Read HTTP messages.') }],
      challenge: B('اعمل workflow n8n بـ webhook بيستقبل سؤال من صفحتك، ويضيف المفتاح السري، ويكلّم API، ويرجّع الرد — مع CORS مضبوط لموقعك بس. الصفحة نفسها من غير أي مفتاح.', 'Build an n8n workflow with a webhook that receives a question from your page, adds the secret key, calls an API and returns the reply — with CORS set for your site only. The page itself holds no key.'),
      quiz: [
        Q(B('مفتاح API سري في كود الصفحة:', 'A secret API key in page code:'), [['مكشوف لأي حد', 'is exposed to anyone'], ['آمن لو مخفي', 'is safe if hidden'], ['آمن بعد التصغير', 'is safe once minified']], 0, B('proxy.', 'Use a proxy.')),
        Q(B('خطأ CORS بيتحل في:', 'A CORS error is fixed in:'), [['السيرفر', 'the server'], ['fetch بـ no-cors', 'fetch with no-cors'], ['CSS', 'CSS']], 0, B('Allow-Origin.', 'Allow-Origin.')),
        Q(B('نفس الطلب من n8n:', 'The same request from n8n:'), [['مفيش CORS', 'has no CORS'], ['بيفشل برضه', 'fails too'], ['أبطأ', 'is slower']], 0, B('CORS في المتصفح بس.', 'CORS is browser-only.'))
      ] },

    { title: B('عميل API متين', 'A robust API client'),
      goal: B('دالة واحدة لكل طلباتك بالأخطاء والمهلة والحدود.', 'One function for all your requests with errors, timeouts and limits.'),
      learn: [
        L(B('wrapper واحد', 'One wrapper'),
          B('بدل ما تكرر نفس السطور في كل طلب، اعمل **api client** صغير: **base url**، headers ثابتة، مهلة، فحص `res.ok`، وقراءة JSON — وخطأ مخصوص **HttpError** فيه الـ status والجسم عشان اللي فوق يقرر.', 'Instead of repeating the same lines in every request, write a small **api client**: a **base url**, fixed headers, a timeout, a `res.ok` check and JSON reading — and a custom **HttpError** holding the status and body so the caller can decide.'),
          'class HttpError extends Error {\n  constructor(status, body) { super(`HTTP ${status}`); this.status = status; this.body = body; }\n}\nfunction createClient(base, { token, timeout = 8000 } = {}) {\n  return async function api(path, { method = "GET", body, query } = {}) {\n    const url = new URL(path, base);\n    if (query) url.search = new URLSearchParams(query);\n    const res = await fetch(url, {\n      method,\n      headers: { Accept: "application/json", ...(body && { "Content-Type": "application/json" }), ...(token && { Authorization: `Bearer ${token}` }) },\n      body: body && JSON.stringify(body),\n      signal: AbortSignal.timeout(timeout),\n    });\n    const data = res.status === 204 ? null : await res.json().catch(() => null);\n    if (!res.ok) throw new HttpError(res.status, data);\n    return data;\n  };\n}\nconst api = createClient("https://dummyjson.com/");\napi("products", { query: { limit: 2, select: "title,price" } })\n  .then(d => console.log(d.products))\n  .then(() => api("products/999999"))\n  .catch(e => console.log("failed:", e.message, e.status));', J),
        L(B('احترام Retry-After', 'Respecting Retry-After'),
          B('لما الـ API يرد **429** (كتير قوي) غالبًا بيقولك تستنى قد إيه في header **retry-after** (ثواني). العميل الكويس بيستنى المدة دي بالظبط ويعيد، بحد أقصى. المثال ده بـ fetch وهمي عشان تشوف السلوك من غير ما تضغط على API حقيقي:', 'When an API answers **429** (too many) it often says how long to wait in the **retry-after** header (seconds). A good client waits exactly that long and retries, up to a limit. This example uses a fake fetch so you can see the behaviour without hammering a real API:'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nlet hits = 0;\n// a stand-in for fetch: the first two calls are rate limited\nconst fakeFetch = async () => (++hits <= 2)\n  ? { status: 429, headers: new Map([["Retry-After", "0.1"]]) }\n  : { status: 200, headers: new Map(), json: async () => ({ saved: true, hits }) };\n\nasync function fetchWithRetry(doFetch, tries = 4) {\n  for (let i = 1; i <= tries; i++) {\n    const res = await doFetch();\n    if (res.status !== 429 && res.status < 500) return res;\n    const wait = Number(res.headers.get("Retry-After") ?? 2 ** i) * 1000;\n    console.log(`got ${res.status}, waiting ${wait} ms (try ${i})`);\n    await sleep(wait);\n  }\n  throw new Error("still limited after " + tries + " tries");\n}\nfetchWithRetry(fakeFetch).then(r => r.json()).then(console.log);', J),
        L(B('كاش بسيط', 'A simple cache'),
          B('لو بتطلب نفس البيانات كتير (أسعار العملة، قايمة المنتجات)، خزّنها مؤقتًا بـ **ttl** (مدة صلاحية). أقل طلبات = أسرع وأبعد عن الحدود. وخزّن الـ **Promise** نفسه مش النتيجة، عشان طلبين في نفس اللحظة يستخدموا طلب واحد.', 'If you ask for the same data often (exchange rates, the product list), keep it in a **cache** with a **ttl** (time to live). Fewer requests = faster and further from limits. Store the **promise** itself, not the result, so two calls at the same moment share one request.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nlet realCalls = 0;\nconst getRates = async () => { realCalls++; await sleep(50); return { USD: 48.5 }; };\nfunction cached(fn, ttlMs) {\n  let entry = null;\n  return () => {\n    if (entry && Date.now() - entry.at < ttlMs) return entry.promise;\n    entry = { at: Date.now(), promise: fn().catch(e => { entry = null; throw e; }) };\n    return entry.promise;\n  };\n}\nconst rates = cached(getRates, 60_000);\nPromise.all([rates(), rates(), rates()]).then(r => console.log(r[0], "real calls:", realCalls));', J)
      ],
      practice: [
        B('استخدم createClient مع JSONPlaceholder لـ GET وPOST.', 'Use createClient with JSONPlaceholder for GET and POST.'),
        B('خلّي fakeFetch يرجّع 429 خمس مرات وشوف الاستسلام.', 'Make fakeFetch return 429 five times and watch it give up.'),
        B('ضيف للعميل retry للـ 429 والـ 5xx.', 'Add retries for 429 and 5xx to the client.'),
        B('جرّب الكاش بـ ttl ثانية واحدة.', 'Try the cache with a one-second TTL.')
      ],
      words: [
        W('api client', 'كود موحّد لكل طلبات API', 'shared code for all API requests', 'The API client adds the token.'),
        W('base url', 'أول الرابط المشترك لكل الطلبات', 'the common start of every request URL', 'Change the base URL for staging.'),
        W('httperror', 'خطأ مخصوص فيه الـ status', 'a custom error holding the status', 'Catch HttpError and check status.'),
        W('retry-after', 'header بيقول تستنى قد إيه', 'a header saying how long to wait', 'Wait for Retry-After seconds.'),
        W('cache', 'تخزين مؤقت لنتايج متكررة', 'temporary storage of repeated results', 'The cache cut requests by 90%.'),
        W('ttl', 'مدة صلاحية الكاش', 'how long a cached value stays valid', 'Use a TTL of one minute for rates.')
      ],
      read: [{ t: 'MDN: Retry-After', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After', what: B('اقرا الصيغتين.', 'Read both formats.') }, { t: 'MDN: AbortSignal.timeout()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static', what: B('اقرا المثال.', 'Read the example.') }],
      challenge: B('حوّل createClient لموديول كامل: retry للـ 429/5xx باحترام Retry-After، مهلة، HttpError، كاش اختياري للـ GET، ولوج لكل طلب (الطريقة، الرابط، الـ status، الوقت).', 'Turn createClient into a full module: retries for 429/5xx respecting Retry-After, a timeout, HttpError, an optional GET cache, and a log line per request (method, URL, status, time).'),
      quiz: [
        Q(B('429 مع Retry-After: 30', '429 with Retry-After: 30'), [['استنى 30 ثانية وأعد', 'wait 30 seconds and retry'], ['أعد فورًا', 'retry at once'], ['استسلم', 'give up']], 0, B('احترم السيرفر.', 'Respect the server.')),
        Q(B('ليه نخزّن الـ Promise في الكاش؟', 'Why cache the promise?'), [['طلبين مع بعض = طلب واحد', 'two calls at once share one request'], ['أصغر', 'it is smaller'], ['أسهل في الطباعة', 'easier to print']], 0, B('مفيش تكرار.', 'No duplicates.')),
        Q(B('HttpError فايدته:', 'HttpError helps by:'), [['اللي فوق يقرر حسب الـ status', 'letting the caller decide by status'], ['يخفي الخطأ', 'hiding the error'], ['يسرّع', 'speeding up']], 0, B('معلومة كاملة.', 'Full information.'))
      ] },

    { title: B('الصفحات وتشكيل البيانات', 'Pages and shaping data'),
      goal: B('تجيب كل البيانات صفحة صفحة وتحوّلها لشكلك.', 'Fetch all the data page by page and shape it your way.'),
      learn: [
        L(B('skip وlimit', 'skip and limit'),
          B('أغلب الـ APIs مش بترجّع كل حاجة مرة واحدة: **limit** = كام عنصر في الصفحة، و**offset** (أو skip) = تبدأ منين. لف لحد ما الصفحة ترجع أقل من الـ limit أو توصل للـ total. ودايمًا حط حد أقصى للصفحات عشان متلفش للأبد.', 'Most APIs do not return everything at once: **limit** = how many per page, and **offset** (or skip) = where to start. Loop until a page comes back shorter than the limit or you reach the total. And always cap the pages so you never loop forever.'),
          'async function* allProducts(limit = 30, maxPages = 10) {\n  for (let page = 0, skip = 0; page < maxPages; page++, skip += limit) {\n    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,category`);\n    if (!res.ok) throw new Error(`HTTP ${res.status}`);\n    const { products, total } = await res.json();\n    yield products;\n    if (skip + products.length >= total) return;\n  }\n}\n(async () => {\n  try {\n    let count = 0, pages = 0;\n    for await (const batch of allProducts(50)) { count += batch.length; pages++; }\n    console.log(`${count} products in ${pages} pages`);\n  } catch (e) { console.log("failed:", e.message); }\n})();', J),
        L(B('شكل البيانات بتاعك', 'Your own data shape'),
          B('رد الـ API بشكله هو، مش بشكلك. اعمل دالة تحويل واحدة (mapper) بتطلّع الحقول اللي محتاجها بأسماءك، وتنضّف الأنواع (أرقام، تواريخ)، وتحط قيم افتراضية. باقي الكود يتعامل مع شكلك بس — ولو الـ API اتغير، بتعدّل مكان واحد.', 'An API reply has its shape, not yours. Write one mapping function that takes the fields you need under your names, cleans the types (numbers, dates) and sets defaults. The rest of the code deals only with your shape — and if the API changes, you edit one place.'),
          'const raw = [\n  { id: 1, title: "Phone Case", price: "12.50", category: "accessories", meta: { createdAt: "2026-09-01T10:00:00Z" } },\n  { id: 2, title: "Charger", price: 20, category: null, meta: {} },\n];\nconst toProduct = p => ({\n  sku: `P-${String(p.id).padStart(4, "0")}`,\n  name: p.title.trim(),\n  priceUsd: Number(p.price) || 0,\n  category: p.category ?? "uncategorised",\n  addedOn: p.meta?.createdAt?.slice(0, 10) ?? null,\n});\nconsole.log(raw.map(toProduct));', J),
        L(B('الإجماليات والعرض', 'Totals and display'),
          B('بعد ما البيانات بقت بشكلك، التجميع سهل بـ reduce وgroupBy، والعرض بـ Intl. وده نفس اللي هتعمله في Code node بتاع n8n: تجيب، تحوّل، تجمّع، وتبعت للخطوة اللي بعدها.', 'Once the data has your shape, totals are easy with reduce and grouping, and display with Intl. This is exactly what you will do in the n8n Code node: fetch, transform, aggregate and pass to the next step.'),
          'const products = [\n  { name: "Case", category: "accessories", priceUsd: 12.5 },\n  { name: "Charger", category: "accessories", priceUsd: 20 },\n  { name: "Laptop", category: "laptops", priceUsd: 899 },\n];\nconst byCat = Object.groupBy(products, p => p.category);\nconst usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });\nfor (const [cat, list] of Object.entries(byCat)) {\n  const total = list.reduce((s, p) => s + p.priceUsd, 0);\n  console.log(cat.padEnd(12), list.length, usd.format(total));\n}', J)
      ],
      practice: [
        B('هات كل المنتجات من DummyJSON بصفحات 25.', 'Fetch every DummyJSON product in pages of 25.'),
        B('اكتب toProduct لـ API تاني تختاره.', 'Write toProduct for another API of your choice.'),
        B('اجمع المنتجات حسب الفئة واطبع المتوسط.', 'Group products by category and print the average.'),
        B('ضيف حد أقصى للصفحات وجرّب يوصله.', 'Add a page cap and try reaching it.')
      ],
      words: [
        W('limit', 'عدد العناصر في الصفحة', 'how many items per page', 'Ask for limit=50.'),
        W('offset', 'تبدأ من عنصر رقم كام', 'which item to start from', 'Increase the offset by the page size.'),
        W('mapper', 'دالة بتحوّل شكل بيانات لشكل تاني', 'a function turning one data shape into another', 'The mapper renames the API fields.'),
        W('object.groupby', 'تقسيم عناصر لمجموعات بمفتاح', 'splitting items into groups by a key', 'Object.groupBy splits orders by city.'),
        W('intl.numberformat', 'تنسيق الأرقام والعملات حسب اللغة', 'formatting numbers and currencies by locale', 'Intl.NumberFormat shows EGP correctly.')
      ],
      read: [{ lib: 'DummyJSON', what: B('اقرا Products: limit وskip وselect.', 'Read Products: limit, skip and select.') }, { t: 'MDN: Object.groupBy()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy', what: B('اقرا المثال.', 'Read the example.') }],
      challenge: B('اعمل «كتالوج حي»: يجيب كل منتجات DummyJSON بالصفحات، يحوّلها بـ toProduct، يعرضها في جدول بفلتر فئة وبحث، ويعرض إجمالي وعدد كل فئة.', 'Build a «live catalogue»: fetch all DummyJSON products by pages, map them with toProduct, show them in a table with a category filter and search, and show each category’s count and total.'),
      quiz: [
        Q(B('آخر صفحة لما:', 'The last page is when:'), [['العناصر أقل من الـ limit أو وصلت للـ total', 'items are fewer than the limit or you reach the total'], ['أول 404', 'the first 404'], ['بعد 3 صفحات دايمًا', 'always after 3 pages']], 0, B('وحط حد أقصى.', 'And cap it.')),
        Q(B('mapper واحد فايدته:', 'One mapper helps because:'), [['تغيير الـ API = تعديل مكان واحد', 'an API change = one edit'], ['أسرع شبكة', 'faster network'], ['مفيش فايدة', 'no benefit']], 0, B('عزل.', 'Isolation.')),
        Q(B('تنسيق عملة:', 'Formatting a currency:'), ['Intl.NumberFormat', 'toUpperCase', 'parseInt'], 0, B('حسب اللغة.', 'By locale.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('لوحة بيانات حية من APIs حقيقية.', 'A live dashboard from real APIs.'),
      review: [
        B('fetch خطوتين، وres.ok، والـ network error مقابل الـ status.', 'fetch in two steps, res.ok, and network errors vs status codes.'),
        B('POST بـ JSON، وURLSearchParams، وPUT/PATCH/DELETE، وFormData.', 'POST with JSON, URLSearchParams, PUT/PATCH/DELETE and FormData.'),
        B('الـ headers والتوكن، والمفاتيح في السيرفر، والـ CORS.', 'Headers and tokens, keys on the server, and CORS.'),
        B('عميل API بـ HttpError ومهلة وRetry-After وكاش.', 'An API client with HttpError, a timeout, Retry-After and a cache.'),
        B('الصفحات بـ limit/offset، والـ mapper، والتجميع.', 'Pages with limit/offset, the mapper and aggregation.')
      ],
      project: B('ابني «لوحة متجر حية»: عميل API واحد (createClient) بيجيب المنتجات والمستخدمين والسلال من DummyJSON بالصفحات والتوازي المحدود، يحوّلهم لشكلك، ويعرض: إجمالي المبيعات، أكتر 5 منتجات، المبيعات حسب الفئة، وجدول بحث. مع مؤشر تحميل، ورسائل أخطاء واضحة، وكاش 5 دقايق، وزرار «ابعت ملخص» بيعمل POST لـ webhook n8n.', 'Build a «live shop board»: one API client (createClient) fetching products, users and carts from DummyJSON with pages and limited concurrency, mapping them to your shape, and showing: total sales, the top 5 products, sales by category and a searchable table. With a loading indicator, clear error messages, a 5-minute cache and a «send summary» button that POSTs to an n8n webhook.'),
      test: [
        Q(B('fetch بيرفض لما:', 'fetch rejects when:'), [['مفيش رد (شبكة)', 'there is no reply (network)'], ['404', '404'], ['500', '500']], 0, B('افحص res.ok للباقي.', 'Check res.ok for the rest.')),
        Q(B('res.ok يعني:', 'res.ok means:'), ['status 200–299', 'status 200 only', B('مفيش خطأ JSON', 'no JSON error')], 0, B('2xx.', '2xx.')),
        Q(B('422 معناها:', '422 means:'), [['البيانات فشلت في التحقق', 'the data failed validation'], ['السيرفر واقع', 'the server is down'], ['تم', 'done']], 0, B('صلّح الطلب.', 'Fix the request.')),
        Q(B('JSON في POST:', 'JSON in a POST:'), ['body: JSON.stringify(data)', 'body: data', 'query: data'], 0, B('نص.', 'Text.')),
        Q(B('بناء ?q=… بنص عربي:', 'Building ?q=… with Arabic text:'), ['URLSearchParams', B('جمع نصوص', 'string concatenation'), 'JSON.stringify'], 0, B('تشفير.', 'Encoding.')),
        Q(B('PATCH:', 'PATCH:'), [['تعديل حقول', 'changes some fields'], ['مسح', 'deletes'], ['قراءة', 'reads']], 0, B('جزئي.', 'Partial.')),
        Q(B('توكن سري للـ AI في صفحة عامة:', 'A secret AI token in a public page:'), [['ممنوع؛ proxy عبر n8n', 'never; proxy through n8n'], ['عادي', 'fine'], ['لو base64', 'fine if base64']], 0, B('مكشوف.', 'Exposed.')),
        Q(B('preflight هو:', 'A preflight is:'), [['طلب OPTIONS قبل الحقيقي', 'an OPTIONS request before the real one'], ['كاش', 'a cache'], ['خطأ', 'an error']], 0, B('CORS.', 'CORS.')),
        Q(B('مهلة لـ fetch:', 'A timeout for fetch:'), ['AbortSignal.timeout(ms)', '{ timeout: ms }', 'setTimeout(fetch)'], 0, B('signal.', 'A signal.')),
        Q(B('429:', '429:'), [['استنى (Retry-After) وأعد', 'wait (Retry-After) and retry'], ['صلّح البيانات', 'fix the data'], ['سجّل دخول', 'sign in']], 0, B('كتير قوي.', 'Too many.')),
        Q(B('الصفحات من غير حد أقصى:', 'Pages with no cap:'), [['ممكن تلف للأبد', 'may loop forever'], ['أسرع', 'faster'], ['أأمن', 'safer']], 0, B('حط maxPages.', 'Set maxPages.')),
        Q(B('API غيّر اسم حقل:', 'An API renamed a field:'), [['عدّل الـ mapper بس', 'edit only the mapper'], ['عدّل كل الملفات', 'edit every file'], ['ابدأ من الأول', 'start over']], 0, B('مكان واحد.', 'One place.'))
      ] }
  ]
};
