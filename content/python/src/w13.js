// Python week 13 — HTTP and APIs with requests.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('HTTP والـ APIs بـ requests', 'HTTP and APIs with requests'),
  goal: B('تفهم HTTP من جوه (الطلب والرد والـ status والـ headers)، وتنادي أي API بـ requests بأمان (timeout وأخطاء ومفاتيح في .env)، وتلف على الصفحات وتحترم حدود الطلبات، وتتحقق من توقيع webhook، وتبعت بيانات لـ n8n وTelegram — نفس اللي بتعمله HTTP Request node بس بالكود.',
          'Understand HTTP from the inside (request, response, status and headers), call any API with requests safely (timeouts, errors, keys in .env), page through results and respect rate limits, verify a webhook signature, and send data to n8n and Telegram — the same work as the HTTP Request node, in code.'),
  days: [
    { title: B('HTTP من جوه', 'HTTP from the inside'),
      goal: B('تقرا أي طلب ورد HTTP: الـ method والـ URL والـ query والـ headers والـ body والـ status، وتعرف الـ status codes المهمة.', 'Read any HTTP request and response: method, URL, query, headers, body and status, and know the important status codes.'),
      learn: [
        { h: B('طلب ورد', 'A request and a response'),
          p: B('كل API بيشتغل كده: انت بتبعت **طلب** (method زي GET أو POST، وURL، وheaders، وأحيانًا body)، والسيرفر بيرجّع **رد** (status code زي 200، وheaders، وbody غالبًا JSON). GET تجيب، POST تعمل جديد، PUT/PATCH تعدّل، DELETE تمسح.', 'Every API works like this: you send a **request** (a method such as GET or POST, a URL, headers and sometimes a body), and the server returns a **response** (a status code such as 200, headers and a body, usually JSON). GET reads, POST creates, PUT/PATCH update, DELETE removes.'),
          ex: 'POST /v1/orders?notify=true HTTP/1.1\nHost: api.shop.example.com\nAuthorization: Bearer <token>\nContent-Type: application/json\n\n{"customer_id": 42, "items": [{"sku": "P-1", "qty": 2}]}\n\n--- response ---\nHTTP/1.1 201 Created\nContent-Type: application/json\n\n{"id": 9910, "status": "new", "total": 1300.0}', show: 1 },
        { h: B('أجزاء الـ URL', 'The parts of a URL'),
          p: B('`https://api.example.com/v1/orders?status=paid&page=2`: البروتوكول، والدومين، والمسار (الـ endpoint)، والـ query string بعد `?` (أزواج `key=value` بينها `&`). متركّبش الـ query بإيدك (المسافات والعربي محتاجين ترميز)؛ `urlencode` أو `params=` في requests بيعملوها صح.', '`https://api.example.com/v1/orders?status=paid&page=2`: the scheme, the domain, the path (the endpoint) and the query string after `?` (`key=value` pairs joined by `&`). Do not build the query by hand (spaces and Arabic need encoding); `urlencode` or `params=` in requests do it right.'),
          ex: 'from urllib.parse import urlencode, urlparse, parse_qs, quote\nparams = {"q": "حقيبة جلد", "page": 2, "sort": "price"}\nurl = "https://shop.example.com/search?" + urlencode(params)\nprint(url)\nparts = urlparse(url)\nprint(parts.scheme, parts.netloc, parts.path)\nprint(parse_qs(parts.query))\nprint(quote("reports/سبتمبر 2026.pdf"))', run: 1 },
        { h: B('الـ status codes', 'Status codes'),
          p: B('2xx نجح (200 OK، 201 اتعمل، 204 مفيش محتوى). 3xx تحويل. 4xx الغلط عندك: 400 بيانات غلط، 401 مش متعرّف (المفتاح)، 403 ممنوع، 404 مش موجود، 422 البيانات مرفوضة، 429 طلبات كتير. 5xx الغلط عند السيرفر: 500 و502 و503 — دول بس اللي تعيد المحاولة عليهم (مع 429).', '2xx worked (200 OK, 201 Created, 204 No Content). 3xx redirects. 4xx is your mistake: 400 bad data, 401 not authenticated (the key), 403 forbidden, 404 not found, 422 data rejected, 429 too many requests. 5xx is the server’s problem: 500, 502 and 503 — the only ones worth retrying (along with 429).'),
          ex: 'from http import HTTPStatus\nRETRY = {429, 500, 502, 503, 504}\nfor code in [200, 201, 400, 401, 404, 422, 429, 503]:\n    s = HTTPStatus(code)\n    action = "retry later" if code in RETRY else "ok" if code < 300 else "fix the request"\n    print(f"{code} {s.phrase:<24} -> {action}")', run: 1 }
      ],
      practice: [
        B('افتح httpbin.org/get في المتصفح واقرا الـ headers اللي متصفحك بعتها.', 'Open httpbin.org/get in the browser and read the headers your browser sent.'),
        B('ابني URL بحث فيه كلمة عربي وصفحة وترتيب بـ urlencode وافتحه.', 'Build a search URL with an Arabic word, a page and a sort order using urlencode, and open it.'),
        B('افتح Network tab في DevTools على أي موقع وشوف 5 طلبات: الـ method والـ status والنوع.', 'Open the Network tab in DevTools on any site and look at 5 requests: method, status and type.'),
        B('اكتب جدول بـ 10 status codes ومعنى كل واحد وتعمل إيه لو جالك.', 'Write a table of 10 status codes, what each means and what you do when you get it.')
      ],
      code: [
        { u: B('طلب بـ urllib (من غير مكتبات)', 'A request with urllib (no libraries)'), p: 'import json\nfrom urllib.request import Request, urlopen\n\nreq = Request("https://jsonplaceholder.typicode.com/todos/1", headers={"Accept": "application/json", "User-Agent": "python-journey"})\nwith urlopen(req, timeout=10) as resp:\n    print(resp.status, resp.headers["Content-Type"])\n    data = json.loads(resp.read().decode("utf-8"))\nprint(data)' }
      ],
      words: [
        { t: 'HTTP', m: B('البروتوكول اللي المتصفحات والـ APIs بيتكلموا بيه', 'the protocol browsers and APIs talk in'), ex: 'GET /orders HTTP/1.1' },
        { t: 'HTTP method', m: B('نوع الطلب: GET وPOST وPUT وPATCH وDELETE', 'the kind of request: GET, POST, PUT, PATCH and DELETE'), ex: 'POST creates a new order' },
        { t: 'endpoint', m: B('عنوان معيّن في الـ API بيعمل حاجة واحدة', 'one address in an API that does one thing'), ex: '/v1/orders' },
        { t: 'query string', m: B('الجزء بعد ? في الـ URL بأزواج key=value', 'the part after ? in a URL, with key=value pairs'), ex: '?status=paid&page=2' },
        { t: 'status code', m: B('رقم في الرد بيقول الطلب نجح ولا لأ', 'the number in a response saying whether it worked'), ex: '200, 404, 429' },
        { t: 'HTTP header', m: B('معلومة إضافية مع الطلب أو الرد (اسم: قيمة)', 'extra information with a request or response (name: value)'), ex: 'Authorization: Bearer …' },
        { t: 'request body', m: B('البيانات اللي بتتبعت مع POST أو PUT، غالبًا JSON', 'the data sent with POST or PUT, usually JSON'), ex: '{"customer_id": 42}' }
      ],
      read: [{ lib: 'MDN: An overview of HTTP', what: B('اقرا الصفحة كلها.', 'Read the whole page.') }, 'lib:MDN: HTTP response status codes'],
      challenge: B('اكتب `inspect_url.py` بياخد URL ويطبع أجزاءه، والـ query كـ dict، وبعدين يعمل GET بـ urllib ويطبع الـ status وأهم 5 headers وأول 200 حرف من الرد — مع timeout ورسالة واضحة لو فشل.', 'Write `inspect_url.py` that takes a URL, prints its parts and the query as a dict, then does a GET with urllib and prints the status, the 5 key headers and the first 200 characters of the body — with a timeout and a clear message on failure.'),
      quiz: [
        { q: B('401 معناها:', '401 means:'), o: [B('مش متعرّف: المفتاح أو التوكن غلط', 'not authenticated: the key or token is wrong'), B('السيرفر وقع', 'the server is down'), B('مش موجود', 'not found')], a: 0, why: B('Unauthorized.', 'Unauthorized.') },
        { q: B('أنهي status تعيد المحاولة عليه؟', 'Which status is worth retrying?'), o: ['503', '400', '404'], a: 0, why: B('مشكلة مؤقتة عند السيرفر.', 'A temporary server problem.') },
        { q: B('عشان تبني query فيها مسافات وعربي:', 'To build a query with spaces and Arabic:'), o: ['urlencode', B('تلزق نصوص', 'join strings'), 'json.dumps'], a: 0, why: B('بيعمل الترميز صح.', 'It encodes properly.') }
      ] },

    { title: B('requests', 'requests'),
      goal: B('تعمل GET وPOST بـ requests، بـ params وjson وheaders، وtimeout دايمًا، وتتعامل مع الأخطاء بـ raise_for_status، وتستخدم Session.', 'Make GET and POST calls with requests, with params, json and headers, always a timeout, handle errors with raise_for_status, and use a Session.'),
      learn: [
        { h: B('GET وJSON', 'GET and JSON'),
          p: B('`r = requests.get(url, params={...}, timeout=10)`؛ `r.status_code` و`r.json()` و`r.text` و`r.headers`. **حط timeout دايمًا** — من غيره السكربت ممكن يستنى للأبد. `r.raise_for_status()` بيطلّع خطأ لو الـ status 4xx أو 5xx بدل ما تكمّل ببيانات غلط.', '`r = requests.get(url, params={...}, timeout=10)`; then `r.status_code`, `r.json()`, `r.text` and `r.headers`. **Always set a timeout** — without one a script can wait forever. `r.raise_for_status()` raises when the status is 4xx or 5xx instead of carrying on with bad data.'),
          ex: '# python -m pip install requests\nimport requests\n\nr = requests.get("https://jsonplaceholder.typicode.com/posts", params={"userId": 1}, timeout=10)\nr.raise_for_status()\nposts = r.json()\nprint(r.status_code, len(posts), "posts")\nprint(posts[0]["title"])\nprint(r.url)' },
        { h: B('POST وheaders', 'POST and headers'),
          p: B('`requests.post(url, json=data, headers={...}, timeout=10)` — `json=` بيحوّل الـ dict لـ JSON ويحط `Content-Type` لوحده. للفورمز `data=`، وللملفات `files=`. والـ headers للمفاتيح والنوع واسم برنامجك (`User-Agent`).', '`requests.post(url, json=data, headers={...}, timeout=10)` — `json=` turns the dict into JSON and sets `Content-Type` for you. Use `data=` for forms and `files=` for uploads. Headers carry keys, types and your program’s name (`User-Agent`).'),
          ex: 'import requests\n\npayload = {"title": "Restock pens", "body": "Order 200 pens", "userId": 7}\nr = requests.post("https://jsonplaceholder.typicode.com/posts", json=payload,\n                  headers={"User-Agent": "python-journey/1.0"}, timeout=10)\nprint(r.status_code)          # 201\nprint(r.json())\n\nwith open("report.csv", "rb") as f:\n    r = requests.post("https://httpbin.org/post", files={"file": ("report.csv", f, "text/csv")}, timeout=20)\nprint(r.json()["files"].keys())' },
        { h: B('الأخطاء وSession', 'Errors and Session'),
          p: B('امسك `requests.Timeout` و`requests.ConnectionError` (مؤقتين) و`requests.HTTPError` (من raise_for_status) لوحدهم. `requests.Session()` بيعيد استخدام الاتصال (أسرع) وبيحط headers مشتركة على كل الطلبات — اعمل واحدة لكل API.', 'Catch `requests.Timeout` and `requests.ConnectionError` (temporary) and `requests.HTTPError` (from raise_for_status) separately. `requests.Session()` reuses the connection (faster) and applies shared headers to every request — make one per API.'),
          ex: 'import requests\n\nsession = requests.Session()\nsession.headers.update({"User-Agent": "python-journey/1.0", "Accept": "application/json"})\n\ndef get_json(url, **params):\n    try:\n        r = session.get(url, params=params, timeout=(5, 20))\n        r.raise_for_status()\n        return r.json()\n    except requests.Timeout:\n        print("timed out:", url)\n    except requests.HTTPError as e:\n        print("HTTP error:", e.response.status_code, e.response.text[:200])\n    except requests.ConnectionError:\n        print("no connection")\n    return None\n\nprint(get_json("https://jsonplaceholder.typicode.com/users/1")["email"])\nprint(get_json("https://httpbin.org/status/404"))' }
      ],
      practice: [
        B('هات كل الـ todos من JSONPlaceholder واطبع نسبة اللي خلصانين.', 'Fetch every todo from JSONPlaceholder and print the share that are completed.'),
        B('ابعت POST لـ httpbin.org/post بـ JSON فيه عربي واقرا اللي رجع.', 'POST JSON with Arabic to httpbin.org/post and read what comes back.'),
        B('اطلب httpbin.org/delay/5 بـ timeout=2 وامسك الخطأ.', 'Request httpbin.org/delay/5 with timeout=2 and catch the error.'),
        B('اعمل Session بـ headers ثابتة واستخدمها في 3 طلبات.', 'Make a Session with fixed headers and use it for 3 requests.')
      ],
      code: [
        { u: B('طقس مدينتك (من غير مفتاح)', 'Your city’s weather (no key needed)'), p: 'import requests\n\nr = requests.get("https://api.open-meteo.com/v1/forecast", params={\n    "latitude": 30.04, "longitude": 31.24,\n    "daily": "temperature_2m_max,temperature_2m_min", "timezone": "Africa/Cairo",\n}, timeout=10)\nr.raise_for_status()\nd = r.json()["daily"]\nfor day, hi, lo in zip(d["time"], d["temperature_2m_max"], d["temperature_2m_min"]):\n    print(f"{day}  {lo:>5.1f}° – {hi:>5.1f}°")' }
      ],
      words: [
        { t: 'requests library', m: B('أشهر مكتبة HTTP في Python', 'the best-known HTTP library in Python'), ex: 'import requests' },
        { t: 'timeout', m: B('أقصى وقت تستنى فيه الرد', 'the longest you wait for a response'), ex: 'requests.get(url, timeout=10)' },
        { t: 'raise_for_status', m: B('بتطلّع خطأ لو الرد 4xx أو 5xx', 'raises an error for a 4xx or 5xx response'), ex: 'r.raise_for_status()' },
        { t: 'JSON body', m: B('بيانات JSON مبعوتة في الطلب بـ json=', 'JSON data sent in a request with json='), ex: 'requests.post(url, json=data)' },
        { t: 'Session', m: B('اتصال بيتعاد استخدامه بإعدادات مشتركة', 'a reused connection with shared settings'), ex: 'session = requests.Session()' },
        { t: 'User-Agent', m: B('header بيعرّف البرنامج اللي بيطلب', 'a header naming the program making the request'), ex: 'python-journey/1.0' }
      ],
      read: [{ lib: 'Requests documentation', what: B('اقرا Quickstart كله.', 'Read the whole Quickstart.') }, 'lib:JSONPlaceholder'],
      challenge: B('اكتب `api_client.py` فيه كلاس صغير أو دوال حوالين JSONPlaceholder: `get_users()` و`get_posts(user_id)` و`create_post(...)`، كلهم بـ Session وtimeout وraise_for_status ولوج، واطبع لكل مستخدم عدد بوستاته.', 'Write `api_client.py` with small functions (or a class) around JSONPlaceholder: `get_users()`, `get_posts(user_id)` and `create_post(...)`, all with a Session, timeout, raise_for_status and logging, and print each user’s post count.'),
      quiz: [
        { q: B('أهم معامل لازم يبقى في أي طلب requests:', 'The parameter every requests call must have:'), o: ['timeout', 'verify=False', 'stream=True'], a: 0, why: B('من غيره ممكن يستنى للأبد.', 'Without it, it may wait forever.') },
        { q: B('`json=data` في post بتعمل:', '`json=data` in post:'), o: [B('تحوّل لـ JSON وتحط Content-Type', 'converts to JSON and sets Content-Type'), B('تقرا JSON من الرد', 'reads JSON from the response'), B('تحفظ ملف', 'saves a file')], a: 0, why: B('للـ body.', 'For the body.') },
        { q: B('`r.raise_for_status()` على رد 200:', '`r.raise_for_status()` on a 200 response:'), o: [B('مبتعملش حاجة', 'does nothing'), B('بتطلّع خطأ', 'raises'), B('بترجّع JSON', 'returns JSON')], a: 0, why: B('بتطلّع بس مع 4xx/5xx.', 'It only raises on 4xx/5xx.') }
      ] },

    { title: B('المصادقة والأسرار والتوقيعات', 'Authentication, secrets and signatures'),
      goal: B('تبعت API key وBearer token وBasic auth صح، وتفهم OAuth2 بالكلام، وتحفظ الأسرار في .env، وتتحقق من توقيع webhook بـ HMAC.', 'Send an API key, a Bearer token and Basic auth correctly, understand OAuth2 in plain words, keep secrets in .env, and verify a webhook signature with HMAC.'),
      learn: [
        { h: B('أشكال المصادقة', 'Forms of authentication'),
          p: B('**API key**: نص سري في header (زي `X-API-Key`) أو في الـ query. **Bearer token**: `Authorization: Bearer <token>` — الأشهر. **Basic**: يوزر وباسورد، `auth=("user", "pass")` في requests. التوثيق الرسمي لكل API بيقولك هو عايز أنهي واحدة بالظبط واسم الـ header.', '**API key**: a secret string in a header (such as `X-API-Key`) or the query. **Bearer token**: `Authorization: Bearer <token>` — the most common. **Basic**: a username and password, `auth=("user", "pass")` in requests. Each API’s official docs tell you exactly which one and the header name.'),
          ex: 'import os, requests\nfrom dotenv import load_dotenv\nload_dotenv()\n\n# Bearer token\nr = requests.get("https://api.example.com/v1/me", headers={"Authorization": f"Bearer {os.environ[\'SHOP_TOKEN\']}"}, timeout=10)\n# API key in a header\nr = requests.get("https://api.example.com/v1/rates", headers={"X-API-Key": os.environ["RATES_KEY"]}, timeout=10)\n# Basic auth\nr = requests.get("https://httpbin.org/basic-auth/demo/demo-pass", auth=("demo", "demo-pass"), timeout=10)\nprint(r.status_code, r.json())' },
        { h: B('OAuth2 بالكلام', 'OAuth2 in plain words'),
          p: B('بدل ما تدي برنامجك باسوردك، الخدمة (Google مثلًا) بتسألك «توافق البرنامج ده يقرا شيتاتك؟»، وبعد الموافقة بتديه **access token** قصير العمر و**refresh token** يجدد بيه. للسكربتات اللي بتتكلم مع خدمة باسمها هي (مش باسم مستخدم) فيه «client credentials» أو service account. n8n بيعمل الرقصة دي عنك في الـ Credentials، وفي Python فيه مكتبات رسمية لكل خدمة.', 'Instead of handing your password to a program, the service (Google, say) asks you «allow this app to read your sheets?», and after approval gives it a short-lived **access token** and a **refresh token** to renew it. For scripts acting as themselves (not as a user) there are «client credentials» or a service account. n8n does this dance for you in Credentials, and in Python each service has an official library.'),
          ex: 'import os, time, requests\n\n_token = {"value": None, "expires": 0}\n\ndef access_token() -> str:\n    """Client-credentials flow: get a token, reuse it until a minute before it expires."""\n    if _token["value"] and time.time() < _token["expires"] - 60:\n        return _token["value"]\n    r = requests.post("https://auth.example.com/oauth/token", data={\n        "grant_type": "client_credentials",\n        "client_id": os.environ["CLIENT_ID"],\n        "client_secret": os.environ["CLIENT_SECRET"],\n    }, timeout=10)\n    r.raise_for_status()\n    body = r.json()\n    _token.update(value=body["access_token"], expires=time.time() + body["expires_in"])\n    return _token["value"]' },
        { h: B('توقيع الـ webhook بـ HMAC', 'Signing a webhook with HMAC'),
          p: B('لما خدمة (Stripe أو Shopify أو n8n) تبعتلك webhook، إزاي تتأكد إنه منها مش من حد مزيّف؟ بتوقّع الـ body بسر مشترك: `hmac.new(secret, body, sha256).hexdigest()` وتبعته في header. انت تحسب نفس التوقيع وتقارن بـ `hmac.compare_digest` (مش ==). ده بيتشغّل هنا في الصفحة.', 'When a service (Stripe, Shopify or n8n) sends you a webhook, how do you know it is really them and not an impostor? They sign the body with a shared secret: `hmac.new(secret, body, sha256).hexdigest()` sent in a header. You compute the same signature and compare with `hmac.compare_digest` (not ==). This runs right here on the page.'),
          ex: 'import hmac, hashlib, json\n\nSECRET = b"demo-shared-secret-not-real"\n\ndef sign(body: bytes) -> str:\n    return hmac.new(SECRET, body, hashlib.sha256).hexdigest()\n\ndef verify(body: bytes, signature: str) -> bool:\n    return hmac.compare_digest(sign(body), signature)\n\nbody = json.dumps({"event": "order.paid", "id": 9910}).encode()\nsig = sign(body)                      # what the sender puts in X-Signature\nprint(verify(body, sig))\nprint(verify(body.replace(b"9910", b"9911"), sig))   # tampered body', run: 1 }
      ],
      practice: [
        B('جرّب httpbin.org/bearer بتوكن وبدونه وشوف الـ status.', 'Try httpbin.org/bearer with and without a token and see the status.'),
        B('اعمل .env فيه مفتاح تجريبي واقراه في السكربت، وتأكد إن .env في .gitignore.', 'Make a .env with a test key, read it in the script, and confirm .env is in .gitignore.'),
        B('اقرا صفحة Authentication في توثيق API بتستخدمه (GitHub أو Telegram) واكتب نوعها.', 'Read the Authentication page of an API you use (GitHub or Telegram) and note its type.'),
        B('غيّر حرف في body الـ webhook وشوف التحقق بيفشل.', 'Change one character of the webhook body and see verification fail.')
      ],
      code: [
        { u: B('تحقق من webhook في سطرين', 'Webhook verification in two lines'), p: 'import hmac, hashlib\n\ndef is_genuine(raw_body: bytes, header_signature: str, secret: str) -> bool:\n    expected = hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()\n    return hmac.compare_digest(expected, header_signature.removeprefix("sha256="))\n\nprint(is_genuine(b\'{"ok":true}\', "sha256=" + hmac.new(b"s3", b\'{"ok":true}\', hashlib.sha256).hexdigest(), "s3"))', run: 1 }
      ],
      words: [
        { t: 'authentication', m: B('إثبات انت مين قدام الخدمة', 'proving who you are to a service'), ex: 'an API key or a token' },
        { t: 'API key', m: B('نص سري بيعرّف برنامجك للـ API', 'a secret string identifying your program to an API'), ex: 'X-API-Key: …' },
        { t: 'bearer token', m: B('توكن بيتبعت في Authorization: Bearer', 'a token sent in Authorization: Bearer'), ex: 'Authorization: Bearer eyJ…' },
        { t: 'OAuth2', m: B('طريقة تدي برنامج صلاحية من غير ما تديله باسوردك', 'a way to grant a program access without giving it your password'), ex: 'Sign in with Google' },
        { t: 'access token', m: B('توكن قصير العمر بيدي صلاحية مؤقتة', 'a short-lived token granting temporary access'), ex: 'expires_in: 3600' },
        { t: 'HMAC', m: B('توقيع بسر مشترك يثبت إن الرسالة متغيرتش ومن مصدرها', 'a signature with a shared secret proving a message is genuine and unchanged'), ex: 'hmac.new(secret, body, sha256)' },
        { t: 'webhook', m: B('خدمة بتنادي URL بتاعك لما حاجة تحصل', 'a service calling your URL when something happens'), ex: 'order.paid → your endpoint' }
      ],
      read: [{ lib: 'Requests documentation', what: B('اقرا Authentication في Advanced Usage.', 'Read Authentication in Advanced Usage.') }, { lib: 'The Python Standard Library', what: B('افتح صفحة hmac.', 'Open the hmac page.') }],
      challenge: B('اكتب `secure_client.py` بيقرا كل المفاتيح من .env، ويفشل برسالة واضحة لو مفتاح ناقص (قبل أي طلب)، ويطبع المفتاح مخفي (`sk_…a1b2`) في اللوج، ويختبر httpbin.org/bearer.', 'Write `secure_client.py` that reads every key from .env, fails with a clear message when one is missing (before any request), prints keys masked (`sk_…a1b2`) in the log, and tests httpbin.org/bearer.'),
      quiz: [
        { q: B('أشهر header للتوكن:', 'The most common header for a token:'), o: ['Authorization: Bearer …', 'Token-Here: …', 'Cookie: key=…'], a: 0, why: B('Bearer.', 'Bearer.') },
        { q: B('ليه `hmac.compare_digest` مش ==؟', 'Why `hmac.compare_digest` instead of ==?'), o: [B('بتاخد نفس الوقت دايمًا فمبتسرّبش معلومات', 'it takes constant time, so it leaks nothing'), B('أسرع', 'faster'), B('== مبتشتغلش على نصوص', '== does not work on strings')], a: 0, why: B('ضد timing attacks.', 'Against timing attacks.') },
        { q: B('الـ refresh token فايدته:', 'A refresh token is for:'), o: [B('تجديد الـ access token', 'renewing the access token'), B('تسجيل خروج', 'logging out'), B('تشفير البيانات', 'encrypting data')], a: 0, why: B('الـ access قصير العمر.', 'Access tokens are short-lived.') }
      ] },

    { title: B('الصفحات وحدود الطلبات وإعادة المحاولة', 'Pagination, rate limits and retries'),
      goal: B('تجيب كل البيانات من API بيقسّمها صفحات (page وoffset وcursor)، وتحترم 429 وRetry-After، وتعيد المحاولة أوتوماتيك بـ HTTPAdapter.', 'Fetch all the data from an API that splits it into pages (page, offset and cursor), respect 429 and Retry-After, and retry automatically with HTTPAdapter.'),
      learn: [
        { h: B('3 أشكال للصفحات', 'Three shapes of pagination'),
          p: B('**page**: `?page=1&per_page=100` لحد ما ترجع قايمة فاضية. **offset**: `?offset=200&limit=100`. **cursor**: الرد فيه `next_cursor` أو لينك `next` تبعته في الطلب الجاي لحد ما يبقى فاضي. اعمل generator بـ yield بيرجّع العناصر واحد واحد، والكود اللي بيستخدمه مش بيهمه الصفحات.', '**page**: `?page=1&per_page=100` until an empty list comes back. **offset**: `?offset=200&limit=100`. **cursor**: the response holds a `next_cursor` or a `next` link you send next time until it is empty. Write a generator with yield that returns items one by one, so the calling code does not care about pages.'),
          ex: 'def fake_api(cursor=None, limit=3):\n    data = [f"order-{i}" for i in range(1, 9)]\n    start = int(cursor or 0)\n    chunk = data[start:start + limit]\n    nxt = str(start + limit) if start + limit < len(data) else None\n    return {"items": chunk, "next_cursor": nxt}\n\ndef all_items():\n    cursor = None\n    while True:\n        page = fake_api(cursor)\n        yield from page["items"]\n        cursor = page["next_cursor"]\n        if not cursor:\n            break\n\nprint(list(all_items()))', run: 1 },
        { h: B('429 وRetry-After', '429 and Retry-After'),
          p: B('لما تبعت طلبات أسرع من المسموح الرد بيبقى 429، وغالبًا فيه header `Retry-After` بعدد الثواني. استنى المدة دي بالظبط (أو backoff لو مش موجود). وكمان راقب headers زي `X-RateLimit-Remaining`، ولو قربت من الصفر هدّي. وفي الأساس: حط `sleep` صغير بين الطلبات.', 'Send requests faster than allowed and you get 429, usually with a `Retry-After` header in seconds. Wait exactly that long (or back off when it is missing). Also watch headers like `X-RateLimit-Remaining` and slow down near zero. And in general: a small `sleep` between requests.'),
          ex: 'import time, requests\n\ndef polite_get(session, url, max_tries=5, **kw):\n    for attempt in range(1, max_tries + 1):\n        r = session.get(url, timeout=15, **kw)\n        if r.status_code != 429:\n            r.raise_for_status()\n            remaining = r.headers.get("X-RateLimit-Remaining")\n            if remaining is not None and int(remaining) < 5:\n                time.sleep(2)\n            return r\n        wait = float(r.headers.get("Retry-After", 2 ** attempt))\n        print(f"429: waiting {wait:.0f}s (attempt {attempt})")\n        time.sleep(wait)\n    raise RuntimeError("still rate-limited after retries")' },
        { h: B('إعادة المحاولة أوتوماتيك', 'Automatic retries'),
          p: B('بدل ما تكتب لوب الإعادة كل مرة، `HTTPAdapter` مع `Retry` من urllib3 بيعيد لوحده على 429 و5xx وأخطاء الاتصال بـ backoff، وبيحترم Retry-After. بتركّبه على الـ Session مرة. خليه للطلبات اللي تكرارها آمن (GET)؛ وPOST اللي بيعمل طلب جديد ممكن يتكرر مرتين!', 'Instead of writing the retry loop every time, `HTTPAdapter` with urllib3’s `Retry` retries 429, 5xx and connection errors with backoff by itself, honouring Retry-After. Mount it on the Session once. Use it for requests that are safe to repeat (GET); a POST that creates an order might happen twice!'),
          ex: 'import requests\nfrom requests.adapters import HTTPAdapter\nfrom urllib3.util.retry import Retry\n\ndef make_session() -> requests.Session:\n    retry = Retry(total=5, backoff_factor=1, status_forcelist=[429, 500, 502, 503, 504],\n                  allowed_methods=["GET", "HEAD"], respect_retry_after_header=True)\n    s = requests.Session()\n    s.mount("https://", HTTPAdapter(max_retries=retry))\n    s.headers["User-Agent"] = "python-journey/1.0"\n    return s\n\ns = make_session()\nprint(s.get("https://httpbin.org/get", timeout=10).status_code)' }
      ],
      practice: [
        B('هات كل الـ 100 بوست من JSONPlaceholder بـ `_page` و`_limit=20` (هو بيدعمهم) في generator.', 'Fetch all 100 posts from JSONPlaceholder with `_page` and `_limit=20` (it supports them) in a generator.'),
        B('اطلب httpbin.org/status/429 واتأكد إن دالتك بتستنى وتعيد.', 'Request httpbin.org/status/429 and check your function waits and retries.'),
        B('ركّب HTTPAdapter بـ Retry على Session واطلب httpbin.org/status/503 وشوف المحاولات في اللوج.', 'Mount HTTPAdapter with Retry on a Session, request httpbin.org/status/503 and watch the attempts in the log.'),
        B('اكتب ليه إعادة محاولة POST «اعمل طلب» خطر، وإزاي الـ idempotency key بيحل ده.', 'Write why retrying a «create order» POST is risky, and how an idempotency key solves it.')
      ],
      code: [
        { u: B('كل الصفحات لـ CSV', 'Every page into a CSV'), p: 'import csv, time, requests\n\ndef fetch_all(url, per_page=20):\n    page = 1\n    with requests.Session() as s:\n        while True:\n            r = s.get(url, params={"_page": page, "_limit": per_page}, timeout=10)\n            r.raise_for_status()\n            items = r.json()\n            if not items:\n                return\n            yield from items\n            page += 1\n            time.sleep(0.3)\n\nposts = list(fetch_all("https://jsonplaceholder.typicode.com/posts"))\nwith open("posts.csv", "w", newline="", encoding="utf-8") as f:\n    w = csv.DictWriter(f, fieldnames=["id", "userId", "title"], extrasaction="ignore")\n    w.writeheader(); w.writerows(posts)\nprint(len(posts), "posts saved")' }
      ],
      words: [
        { t: 'pagination', m: B('تقسيم النتايج الكتير لصفحات بتطلبها واحدة واحدة', 'splitting many results into pages fetched one by one'), ex: '?page=2&per_page=100' },
        { t: 'cursor', m: B('علامة من الرد بتقول الصفحة الجاية تبدأ منين', 'a marker from the response saying where the next page starts'), ex: 'next_cursor: "eyJpZCI6…"' },
        { t: '429 Too Many Requests', m: B('رد بيقول إنك بعت طلبات أسرع من المسموح', 'a response saying you sent requests too fast'), ex: 'Retry-After: 30' },
        { t: 'Retry-After', m: B('header بيقول تستنى قد إيه قبل ما تعيد', 'a header saying how long to wait before retrying'), ex: 'Retry-After: 30' },
        { t: 'HTTPAdapter', m: B('بيركّب إعدادات زي إعادة المحاولة على Session', 'mounts settings such as retries on a Session'), ex: 's.mount("https://", HTTPAdapter(...))' },
        { t: 'idempotent', m: B('عملية لو اتكررت النتيجة متتغيرش (زي GET)', 'an operation whose result does not change when repeated (like GET)'), ex: 'GET and PUT are idempotent' }
      ],
      read: [{ lib: 'Requests documentation', what: B('اقرا Advanced Usage: Session Objects وTransport Adapters.', 'Read Advanced Usage: Session Objects and Transport Adapters.') }, { lib: 'MDN: HTTP response status codes', what: B('اقرا صفحة 429 بالتفصيل.', 'Read the 429 page in detail.') }],
      challenge: B('اكتب `paginate.py` فيه 3 دوال generator (page وoffset وcursor) ودالة `fetch_all(style, url, ...)` بتختار، وجرّب الـ page على JSONPlaceholder، والـ cursor على `fake_api` بتاع الدرس، بـ Session فيها Retry ولوج بعدد الصفحات.', 'Write `paginate.py` with 3 generator functions (page, offset and cursor) and a `fetch_all(style, url, ...)` that picks one; try page on JSONPlaceholder and cursor on the lesson’s `fake_api`, using a Session with Retry and a log of the page count.'),
      quiz: [
        { q: B('API بيرجّع `next_cursor`. تقف امتى؟', 'An API returns `next_cursor`. When do you stop?'), o: [B('لما يبقى فاضي أو None', 'when it is empty or None'), B('بعد صفحة واحدة', 'after one page'), B('بعد 100 صفحة دايمًا', 'always after 100 pages')], a: 0, why: B('ده معناه مفيش صفحات تانية.', 'That means there are no more pages.') },
        { q: B('جالك 429 ومعاه Retry-After: 20:', 'You got 429 with Retry-After: 20:'), o: [B('استنى 20 ثانية وأعد', 'wait 20 seconds and retry'), B('أعد فورًا', 'retry immediately'), B('اقفل السكربت', 'stop the script')], a: 0, why: B('السيرفر قالك تستنى قد إيه.', 'The server told you how long.') },
        { q: B('ليه منعيدش POST «اعمل طلب» أوتوماتيك؟', 'Why not auto-retry a «create order» POST?'), o: [B('ممكن يتعمل الطلب مرتين', 'the order may be created twice'), B('POST مبيفشلش', 'POST never fails'), B('ممنوع في requests', 'requests forbids it')], a: 0, why: B('مش idempotent.', 'It is not idempotent.') }
      ] },

    { title: B('Python مع n8n وTelegram', 'Python with n8n and Telegram'),
      goal: B('تبعت بيانات من Python لـ workflow في n8n عن طريق Webhook، وتبعت رسايل Telegram من بوت، وتفهم امتى تكتب Python لوحده وامتى تخليه جزء من n8n.', 'Send data from Python to an n8n workflow through a Webhook, send Telegram messages from a bot, and understand when to write standalone Python and when to make it part of n8n.'),
      learn: [
        { h: B('Python → n8n Webhook', 'Python → an n8n Webhook'),
          p: B('اعمل workflow في n8n يبدأ بـ Webhook node (POST)، وخد الـ Test URL. من Python: `requests.post(url, json=data, timeout=15)`. البيانات بتوصل في `$json.body`. استخدم ده عشان سكربتك (بعد ما يعمل شغل تقيل زي تحليل Excel) يسلّم النتيجة لـ n8n يوزّعها على Sheets وSlack وإيميل. حط سر في header والـ Webhook يتأكد منه (Header Auth).', 'Create an n8n workflow starting with a Webhook node (POST) and copy its Test URL. From Python: `requests.post(url, json=data, timeout=15)`. The data arrives in `$json.body`. Use this so your script (after heavy work like analysing Excel) hands the result to n8n to spread across Sheets, Slack and email. Put a secret in a header and have the Webhook check it (Header Auth).'),
          ex: 'import os, requests\nfrom dotenv import load_dotenv\nload_dotenv()\n\nsummary = {"report": "sales", "month": "2026-09", "revenue": 245_910.25, "top_city": "Cairo", "orders": 85}\nr = requests.post(\n    os.environ["N8N_WEBHOOK_URL"],\n    json=summary,\n    headers={"X-Webhook-Secret": os.environ["N8N_WEBHOOK_SECRET"]},\n    timeout=15,\n)\nr.raise_for_status()\nprint("n8n answered:", r.status_code, r.text[:200])' },
        { h: B('Telegram Bot API', 'The Telegram Bot API'),
          p: B('اعمل بوت من @BotFather وخد التوكن (في .env!)، وابعت للبوت أي رسالة، وهات الـ chat id من `getUpdates`. بعدها `POST https://api.telegram.org/bot<TOKEN>/sendMessage` بـ `chat_id` و`text` (و`parse_mode: "HTML"` للتنسيق). ده أسرع طريقة سكربت يبلّغك إنه خلص أو فشل.', 'Create a bot with @BotFather and take its token (into .env!), send the bot any message, and get your chat id from `getUpdates`. Then `POST https://api.telegram.org/bot<TOKEN>/sendMessage` with `chat_id` and `text` (and `parse_mode: "HTML"` for formatting). The quickest way for a script to tell you it finished or failed.'),
          ex: 'import os, requests\nfrom dotenv import load_dotenv\nload_dotenv()\nTOKEN = os.environ["TELEGRAM_BOT_TOKEN"]\nAPI = f"https://api.telegram.org/bot{TOKEN}"\n\ndef notify(text: str) -> None:\n    r = requests.post(f"{API}/sendMessage", json={"chat_id": os.environ["TELEGRAM_CHAT_ID"], "text": text, "parse_mode": "HTML"}, timeout=10)\n    r.raise_for_status()\n\n# find your chat id once: send the bot a message, then\nprint(requests.get(f"{API}/getUpdates", timeout=10).json())\nnotify("✅ <b>Sales report</b> done: 85 orders, 245,910 EGP")' },
        { h: B('Python ولا n8n؟', 'Python or n8n?'),
          p: B('n8n أحسن في: الربط بين خدمات كتير، والـ triggers (webhooks وجدولة)، والـ credentials، وإن غيرك يفهم ويعدّل الـ workflow. Python أحسن في: الحسابات والتنضيف التقيل، والملفات الكبيرة، والمنطق المعقد، والمكتبات (pandas وPDF والصور). الأحسن غالبًا الاتنين: n8n يرتّب، وPython يعمل الشغل التقيل (في Code node، أو API صغير بـ FastAPI أسبوع 21، أو Execute Command).', 'n8n is better at: connecting many services, triggers (webhooks and schedules), credentials, and letting others read and edit the workflow. Python is better at: heavy calculations and cleaning, big files, complex logic, and libraries (pandas, PDF, images). Usually the best is both: n8n orchestrates and Python does the heavy lifting (in a Code node, a small FastAPI service in week 21, or Execute Command).'),
          ex: '# Python inside an n8n Code node (Language: Python) — items in, items out\nresults = []\nfor item in _input.all():\n    order = item.json\n    total = sum(i["qty"] * i["price"] for i in order["items"])\n    results.append({"json": {"id": order["id"], "total": round(total * 1.14, 2), "big": total > 5000}})\nreturn results', show: 1 }
      ],
      practice: [
        B('اعمل workflow في n8n: Webhook → Edit Fields → Google Sheets (أو Respond)، وابعتله بيانات من Python.', 'Build an n8n workflow: Webhook → Edit Fields → Google Sheets (or Respond), and send it data from Python.'),
        B('اعمل بوت Telegram وابعت لنفسك رسالة من Python بتنسيق HTML.', 'Create a Telegram bot and send yourself an HTML-formatted message from Python.'),
        B('زوّد Header Auth على الـ Webhook وجرّب تبعت من غير الـ header (لازم يرفض).', 'Add Header Auth to the Webhook and try sending without the header (it must refuse).'),
        B('اكتب نفس حسبة الإجمالي في Code node بـ Python وفي سكربت عادي وقارن.', 'Write the same total calculation in a Python Code node and in a normal script, and compare.')
      ],
      code: [
        { u: B('بلّغني لما السكربت يفشل', 'Tell me when the script fails'), p: 'import os, sys, logging, traceback, requests\n\nlog = logging.getLogger("job")\n\ndef alert(text: str) -> None:\n    token, chat = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CHAT_ID")\n    if not (token and chat):\n        log.warning("telegram not configured; alert was: %s", text)\n        return\n    try:\n        requests.post(f"https://api.telegram.org/bot{token}/sendMessage", json={"chat_id": chat, "text": text[:4000]}, timeout=10)\n    except requests.RequestException:\n        log.exception("could not send the alert")\n\ndef main() -> int:\n    try:\n        1 / 0     # the real work goes here\n        return 0\n    except Exception:\n        alert("❌ nightly job failed:\\n" + traceback.format_exc()[-1500:])\n        return 1\n\nif __name__ == "__main__":\n    sys.exit(main())' }
      ],
      words: [
        { t: 'Webhook node', m: B('نود في n8n بيستقبل طلب HTTP ويبدأ الـ workflow', 'an n8n node that receives an HTTP request and starts the workflow'), ex: 'POST /webhook/sales-report' },
        { t: 'payload', m: B('البيانات اللي في body الطلب', 'the data inside a request body'), ex: 'json=summary' },
        { t: 'Telegram Bot API', m: B('API تليجرام لإرسال رسايل من بوت', 'Telegram’s API for sending messages from a bot'), ex: '/sendMessage' },
        { t: 'chat id', m: B('رقم المحادثة اللي البوت يبعتلها', 'the number of the chat the bot sends to'), ex: 'getUpdates → message.chat.id' },
        { t: 'orchestration', m: B('ترتيب خطوات وخدمات كتير مع بعض', 'arranging many steps and services together'), ex: 'n8n orchestrates, Python computes' },
        { t: 'notification', m: B('رسالة بتبلّغك إن حاجة حصلت', 'a message telling you something happened'), ex: '✅ report done' }
      ],
      read: [{ lib: 'n8n Docs: Code node', what: B('اقرا جزء Python في الـ Code node والفرق عن JavaScript.', 'Read the Python part of the Code node and how it differs from JavaScript.') }, 'lib:Requests documentation'],
      challenge: B('اربط مشروع «تقرير المبيعات» (أسبوع 11) بـ n8n: السكربت بعد ما يطلّع ملف Excel يبعت ملخص JSON لـ Webhook، والـ workflow يحطه في شيت ويبعت Telegram — ولو السكربت فشل يبعت تنبيه Telegram بنفسه.', 'Connect the «sales report» project (week 11) to n8n: after producing the Excel file the script posts a JSON summary to a Webhook, and the workflow writes it to a sheet and sends Telegram — and if the script fails it sends a Telegram alert itself.'),
      quiz: [
        { q: B('البيانات اللي Python بعتها لـ Webhook بتوصل في n8n في:', 'Data Python posts to a Webhook arrives in n8n in:'), o: ['$json.body', '$json.headers.body', '$env'], a: 0, why: B('الـ body.', 'The body.') },
        { q: B('توكن بوت Telegram مكانه:', 'A Telegram bot token belongs in:'), o: ['.env', B('في الكود', 'the code'), B('في اسم البوت', 'the bot name')], a: 0, why: B('سر.', 'It is a secret.') },
        { q: B('حسابات تقيلة على ملف Excel كبير، الأنسب:', 'Heavy calculations on a big Excel file are best done in:'), o: ['Python', B('n8n nodes بس', 'n8n nodes alone'), B('إيميل', 'email')], a: 0, why: B('وn8n يرتّب الباقي.', 'And n8n arranges the rest.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تبني جامع بيانات من API حقيقي من أوله لآخره، وتعدّي الاختبار.', 'Build a complete data collector from a real API, end to end, and pass the test.'),
      review: [
        B('الطلب والرد والـ methods والـ URL والـ query والـ status codes.', 'Requests and responses, methods, URLs, queries and status codes.'),
        B('requests: params وjson وheaders وtimeout وraise_for_status وSession.', 'requests: params, json, headers, timeout, raise_for_status and Session.'),
        B('API key وBearer وBasic وOAuth2 وHMAC والأسرار في .env.', 'API keys, Bearer, Basic, OAuth2, HMAC and secrets in .env.'),
        B('page وoffset وcursor و429 وRetry-After وHTTPAdapter والـ idempotency.', 'page, offset and cursor, 429, Retry-After, HTTPAdapter and idempotency.'),
        B('Python → n8n Webhook وTelegram، وامتى Python وامتى n8n.', 'Python → n8n Webhook and Telegram, and when Python versus n8n.')
      ],
      project: B('**جامع البيانات** (`collector/`): سكربت بيجيب كل المستخدمين والبوستات والتعليقات من JSONPlaceholder (بالصفحات وSession فيها Retry وtimeout)، ويربطهم ببعض (كل مستخدم: عدد بوستاته، ومتوسط التعليقات على البوست، وأطول بوست)، ويحفظ النتيجة `data/users_summary.json` و`.csv` و`.xlsx` منسّق، ويبعت ملخص قصير لـ n8n Webhook (أو Telegram) — والاتنين في dry run افتراضيًا. الإعدادات في config.toml، والأسرار في .env، ولوج، و10 tests على دوال الربط والتحويل (بيانات وهمية من غير شبكة).', '**The data collector** (`collector/`): a script that fetches every user, post and comment from JSONPlaceholder (with pagination, a Session with Retry and timeouts), joins them (per user: post count, average comments per post, longest post), saves `data/users_summary.json`, `.csv` and a formatted `.xlsx`, and sends a short summary to an n8n Webhook (or Telegram) — both as a dry run by default. Settings in config.toml, secrets in .env, a log, and 10 tests on the join and transform functions (fake data, no network).'),
      test: [
        { q: B('GET معناها:', 'GET means:'), o: [B('تجيب بيانات', 'read data'), B('تمسح', 'delete'), B('تعمل جديد', 'create')], a: 0, why: B('قراءة.', 'Reading.') },
        { q: B('201 معناها:', '201 means:'), o: [B('اتعمل جديد', 'created'), B('مش موجود', 'not found'), B('ممنوع', 'forbidden')], a: 0, why: B('Created.', 'Created.') },
        { q: B('404 بعد ما غيّرت URL بإيدك. الغالب:', '404 after editing a URL by hand. Most likely:'), o: [B('المسار غلط', 'the path is wrong'), B('المفتاح غلط', 'the key is wrong'), B('السيرفر واقع', 'the server is down')], a: 0, why: B('Not Found.', 'Not Found.') },
        { q: B('`requests.get(url, params={"q": "a b"})` بيبعت:', '`requests.get(url, params={"q": "a b"})` sends:'), o: ['?q=a+b', '?q=a b', '{"q": "a b"}'], a: 0, why: B('بيرمّز المسافة.', 'It encodes the space.') },
        { q: B('`r.json()` على رد مش JSON:', '`r.json()` on a non-JSON response:'), o: [B('بتطلّع خطأ', 'raises an error'), B('بترجّع None', 'returns None'), B('بترجّع النص', 'returns the text')], a: 0, why: B('JSONDecodeError (requests.JSONDecodeError).', 'A JSONDecodeError (requests.JSONDecodeError).') },
        { q: B('`timeout=(5, 20)` معناها:', '`timeout=(5, 20)` means:'), o: [B('5 للاتصال و20 للقراءة', '5 to connect and 20 to read'), B('5 محاولات', '5 attempts'), B('20 طلب', '20 requests')], a: 0, why: B('connect وread.', 'Connect and read.') },
        { q: B('`Authorization: Bearer x` نوع:', '`Authorization: Bearer x` is:'), o: [B('توكن', 'a token'), B('Basic auth', 'Basic auth'), B('cookie', 'a cookie')], a: 0, why: B('Bearer token.', 'A bearer token.') },
        { q: B('توقيع HMAC بيثبت:', 'An HMAC signature proves:'), o: [B('الرسالة من صاحب السر ومتغيرتش', 'the message came from the secret holder and was not changed'), B('الرسالة مشفّرة', 'the message is encrypted'), B('الرسالة سريعة', 'the message is fast')], a: 0, why: B('سلامة ومصدر.', 'Integrity and origin.') },
        { q: B('API بالصفحات رجّع قايمة فاضية:', 'A paginated API returned an empty list:'), o: [B('خلصت الصفحات', 'the pages are finished'), B('أعد نفس الصفحة', 'retry the same page'), B('السيرفر واقع', 'the server is down')], a: 0, why: B('شرط الوقوف في page style.', 'The stop condition in page style.') },
        { q: B('Retry على POST «ادفع» ممكن:', 'Retrying a «pay» POST could:'), o: [B('يدفع مرتين', 'charge twice'), B('يبقى أسرع', 'be faster'), B('يرجّع 200 دايمًا', 'always return 200')], a: 0, why: B('مش idempotent.', 'Not idempotent.') },
        { q: B('أنسب حاجة تبلّغك إن سكربت الليل فشل:', 'The handiest way to hear that a night script failed:'), o: [B('رسالة Telegram أو Slack', 'a Telegram or Slack message'), B('print', 'print'), B('تفتكر تبص الصبح', 'remembering to check in the morning')], a: 0, why: B('بتوصلك على الموبايل.', 'It reaches your phone.') },
        { q: B('المكان الأحسن لمنطق معقد وحسابات تقيلة في workflow:', 'The best place for complex logic and heavy maths in a workflow:'), o: [B('Python (Code node أو API صغير)', 'Python (a Code node or a small API)'), B('20 IF node', '20 IF nodes'), B('Google Sheets formulas', 'Google Sheets formulas')], a: 0, why: B('أوضح وأسهل في الاختبار.', 'Clearer and easier to test.') }
      ] }
  ]
};
