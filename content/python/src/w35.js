// Python week 35 — Advanced FastAPI: auth, background tasks and WebSockets.
// FastAPI examples are display-only; the security building blocks run with the standard library.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('FastAPI المتقدم: المصادقة والمهام الخلفية والـ WebSockets', 'Advanced FastAPI: auth, background tasks and WebSockets'),
  goal: B('تبني API بمستوى إنتاج: هيكل نضيف بـ Depends والإعدادات، مصادقة آمنة (API keys وJWT وكلمات سر مشفّرة)، مهام خلفية وطوابير، تحديثات لحظية بـ WebSockets وSSE، وmiddleware واختبارات.',
          'Build a production-level API: a clean structure with Depends and settings, secure authentication (API keys, JWT and hashed passwords), background tasks and queues, real-time updates with WebSockets and SSE, and middleware and tests.'),
  days: [
    { title: B('الهيكل والإعدادات', 'Structure and settings'),
      goal: B('تنظّم API كبير بحيث يفضل سهل الفهم والاختبار.', 'Organise a big API so it stays easy to understand and test.'),
      learn: [
        L(B('Depends للمشترك', 'Depends for shared things'),
          B('`Depends` بيحقن حاجات مشتركة في الـ endpoints: جلسة قاعدة بيانات، المستخدم الحالي، الإعدادات. الميزة: في الاختبار تبدّلها بنسخة وهمية بـ `app.dependency_overrides`. والـ **lifespan** بيفتح الموارد (pool، client) مرة واحدة ويقفلها في الآخر.', '`Depends` injects shared things into endpoints: a database session, the current user, the settings. The benefit: in tests you swap them for fakes with `app.dependency_overrides`. And the **lifespan** opens resources (a pool, a client) once and closes them at the end.'),
          'from contextlib import asynccontextmanager\nfrom fastapi import Depends, FastAPI\n\n@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    app.state.http = httpx.AsyncClient(timeout=10)\n    yield\n    await app.state.http.aclose()\n\napp = FastAPI(lifespan=lifespan)\n\ndef get_db():\n    with SessionLocal() as s:\n        yield s\n\n@app.get("/orders/{order_id}")\ndef read_order(order_id: int, db = Depends(get_db)):\n    return db.get(Order, order_id)'),
        L(B('الإعدادات بـ pydantic-settings', 'Settings with pydantic-settings'),
          B('**pydantic-settings** بيقرا الإعدادات من متغيرات البيئة و`.env`، ويتحقق من أنواعها، ويطلّع خطأ واضح لو حاجة ناقصة وقت التشغيل (مش بعد ساعة في نص طلب). كائن إعدادات واحد بيتحقن بـ Depends.', '**pydantic-settings** reads settings from environment variables and `.env`, checks their types, and raises a clear error at startup if something is missing (not an hour later mid-request). One settings object is injected with Depends.'),
          'from functools import cache\nfrom pydantic_settings import BaseSettings, SettingsConfigDict\n\nclass Settings(BaseSettings):\n    model_config = SettingsConfigDict(env_file=".env")\n    database_url: str\n    jwt_secret: str\n    allowed_origins: list[str] = ["https://app.example.com"]\n\n@cache\ndef get_settings() -> Settings:\n    return Settings()'),
        L(B('routers بالمجال', 'Routers by domain'),
          B('قسّم الـ API حسب المجال: `routers/orders.py`، `routers/customers.py`، `routers/webhooks.py` — كل واحد `APIRouter` بـ prefix وtags. والمنطق الحقيقي في `services/` بعيد عن HTTP، عشان تختبره من غير سيرفر.', 'Split the API by domain: `routers/orders.py`, `routers/customers.py`, `routers/webhooks.py` — each an `APIRouter` with a prefix and tags. The real logic lives in `services/`, away from HTTP, so you can test it without a server.'),
          'app/\n  main.py            # app = FastAPI(); app.include_router(orders.router)\n  settings.py\n  routers/orders.py  # APIRouter(prefix="/orders", tags=["orders"])\n  services/orders.py # create_order(db, data) — no HTTP here\n  models.py · schemas.py', T)
      ],
      practice: [
        B('قسّم API الرحلة (أسبوع 21) لـ routers وservices.', 'Split the journey API (week 21) into routers and services.'),
        B('اعمل Settings بـ pydantic-settings وجرّب متغير ناقص.', 'Create Settings with pydantic-settings and try a missing variable.'),
        B('اعمل lifespan لـ httpx.AsyncClient.', 'Add a lifespan for an httpx.AsyncClient.'),
        B('بدّل get_db في اختبار بـ dependency_overrides.', 'Swap get_db in a test with dependency_overrides.')
      ],
      words: [
        W('depends', 'آلية FastAPI لحقن الاعتماديات', 'FastAPI’s way of injecting dependencies', 'Inject the session with Depends.'),
        W('pydantic-settings', 'مكتبة إعدادات من البيئة بأنواع', 'a library for typed settings from the environment', 'pydantic-settings fails fast on a missing secret.'),
        W('lifespan', 'كود بيشتغل عند بداية ونهاية التطبيق', 'code running at application start-up and shutdown', 'Open the HTTP client in the lifespan.'),
        W('dependency_overrides', 'تبديل اعتمادية في الاختبار', 'replacing a dependency in tests', 'Use dependency_overrides for a fake database.'),
        W('service layer', 'طبقة المنطق بعيد عن HTTP', 'the logic layer away from HTTP', 'Test the service layer without a server.')
      ],
      read: ['lib:FastAPI documentation', { t: 'FastAPI: Settings and environment variables', url: 'https://fastapi.tiangolo.com/advanced/settings/', what: B('اقرا استخدام pydantic-settings.', 'Read how to use pydantic-settings.') }],
      challenge: B('أعد هيكلة API أسبوع 21: routers بالمجال، services، Settings، lifespan، واختبار واحد على الأقل بـ dependency_overrides.', 'Restructure the week 21 API: domain routers, services, Settings, a lifespan, and at least one test using dependency_overrides.'),
      quiz: [
        Q(B('Depends ميزته في الاختبار:', 'The benefit of Depends in tests:'), [['تبدّل الاعتمادية بنسخة وهمية', 'you swap a dependency for a fake'], ['أسرع', 'faster'], ['مفيش', 'none']], 0, B('dependency_overrides.', 'dependency_overrides.')),
        Q(B('سر ناقص في pydantic-settings:', 'A missing secret in pydantic-settings:'), [['خطأ عند التشغيل', 'an error at start-up'], ['بيشتغل عادي', 'runs normally'], ['قيمة عشوائية', 'a random value']], 0, B('fail fast.', 'Fail fast.')),
        Q(B('المنطق الحقيقي مكانه:', 'The real logic belongs in:'), [['services', 'services'], ['الـ router نفسه', 'the router itself'], ['main.py', 'main.py']], 0, B('بعيد عن HTTP.', 'Away from HTTP.'))
      ] },

    { title: B('المصادقة الآمنة', 'Secure authentication'),
      goal: B('تحمي الـ API من غير ما تخترع تشفير بنفسك.', 'Protect the API without inventing your own cryptography.'),
      learn: [
        L(B('تشفير كلمات السر', 'Hashing passwords'),
          B('كلمة السر **عمرها ما تتخزّن نص**. **password hashing** بخوارزمية بطيئة مخصوصة (argon2 أو bcrypt، أو scrypt في المكتبة القياسية) مع **salt** عشوائي لكل مستخدم. وللمقارنة `hmac.compare_digest` (ثابت الوقت).', 'A password is **never stored as text**. Use **password hashing** with a deliberately slow algorithm (argon2 or bcrypt, or scrypt in the standard library) with a random **salt** per user. Compare with `hmac.compare_digest` (constant time).'),
          'import hashlib, hmac, os\n\ndef hash_password(password: str) -> str:\n    salt = os.urandom(16)\n    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1)\n    return salt.hex() + ":" + digest.hex()\n\ndef verify(password: str, stored: str) -> bool:\n    salt_hex, digest_hex = stored.split(":")\n    digest = hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt_hex), n=2**14, r=8, p=1)\n    return hmac.compare_digest(digest.hex(), digest_hex)\n\nstored = hash_password("correct horse")\nprint(stored[:20] + "…", verify("correct horse", stored), verify("wrong", stored))', R),
        L(B('JWT من جوه', 'JWT from the inside'),
          B('**JWT** = header.payload.signature بـ base64url. الـ payload مش سري (أي حد يقراه!) — التوقيع بس بيضمن إنه متعدّلش. عشان كده: متحطش أسرار فيه، وخليه قصير العمر (`exp`)، واستخدم مكتبة (PyJWT) في الشغل الحقيقي. المثال ده بيوريك الفكرة بالمكتبة القياسية.', 'A **JWT** = header.payload.signature in base64url. The payload is not secret (anyone can read it!) — only the signature guarantees it was not changed. So: put no secrets in it, keep it short-lived (`exp`), and use a library (PyJWT) for real work. This example shows the idea with the standard library.'),
          'import base64, hashlib, hmac, json, time\nb64 = lambda b: base64.urlsafe_b64encode(b).rstrip(b"=").decode()\nSECRET = b"demo-secret-change-me"\n\ndef sign(payload):\n    head = b64(json.dumps({"alg": "HS256", "typ": "JWT"}).encode())\n    body = b64(json.dumps(payload).encode())\n    sig = b64(hmac.new(SECRET, f"{head}.{body}".encode(), hashlib.sha256).digest())\n    return f"{head}.{body}.{sig}"\n\ndef verify(token):\n    head, body, sig = token.split(".")\n    good = b64(hmac.new(SECRET, f"{head}.{body}".encode(), hashlib.sha256).digest())\n    if not hmac.compare_digest(sig, good):\n        return None\n    data = json.loads(base64.urlsafe_b64decode(body + "=" * (-len(body) % 4)))\n    return data if data["exp"] > time.time() else None\n\nt = sign({"sub": "user-7", "exp": time.time() + 900})\nprint(verify(t)["sub"], verify(t[:-2] + "xx"))', R),
        L(B('access وrefresh', 'Access and refresh'),
          B('**access token** قصير (15 دقيقة) بيتبعت مع كل طلب، و**refresh token** طويل (أيام) بيتخزّن بأمان ويستخدم بس عشان تجيب access جديد — وتقدر تلغيه من قاعدة البيانات. ولـ API بين أنظمة (n8n ← API بتاعك) غالبًا **API key** في header أبسط.', 'A short **access token** (15 minutes) is sent with each request, and a long **refresh token** (days) is stored safely and used only to get a new access token — and it can be revoked in the database. For system-to-system APIs (n8n → your API), an **API key** in a header is often simpler.'),
          'from fastapi import Header, HTTPException\n\ndef require_api_key(x_api_key: str = Header()):\n    if not hmac.compare_digest(x_api_key, get_settings().api_key):\n        raise HTTPException(status_code=401, detail="invalid API key")\n\n@app.post("/webhooks/orders", dependencies=[Depends(require_api_key)])\ndef receive(order: OrderIn): ...')
      ],
      practice: [
        B('شغّل مثال scrypt وجرّب كلمة سر غلط.', 'Run the scrypt example and try a wrong password.'),
        B('شغّل مثال JWT وغيّر حرف في التوقيع.', 'Run the JWT example and change one character of the signature.'),
        B('فك payload JWT بـ base64 واتأكد إنه مش سري.', 'Decode a JWT payload with base64 and confirm it is not secret.'),
        B('اعمل API key dependency لـ endpoint بيستقبل من n8n.', 'Create an API-key dependency for an endpoint receiving from n8n.')
      ],
      words: [
        W('password hashing', 'تحويل كلمة السر لبصمة مش بترجع', 'turning a password into a one-way fingerprint', 'Use password hashing, never plain text.'),
        W('salt', 'قيمة عشوائية بتتضاف لكل كلمة سر قبل التشفير', 'a random value added to each password before hashing', 'Each user gets a unique salt.'),
        W('jwt', 'توكن موقّع فيه بيانات مقروءة', 'a signed token holding readable data', 'The JWT expires after 15 minutes.'),
        W('refresh token', 'توكن طويل بيجيب access جديد', 'a long-lived token used to get new access tokens', 'Store the refresh token securely.'),
        W('api key header', 'مفتاح API بيتبعت في header', 'an API key sent in a header', 'n8n sends the API key header.')
      ],
      read: [{ t: 'FastAPI: OAuth2 with Password (and hashing), Bearer with JWT tokens', url: 'https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/', what: B('اقرا المثال الكامل.', 'Read the full example.') }, { t: 'OWASP: Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', what: B('اقرا الخوارزميات الموصى بيها.', 'Read the recommended algorithms.') }],
      challenge: B('ضيف لـ API بتاعك: مستخدمين بكلمات سر مشفّرة (argon2 أو bcrypt)، تسجيل دخول بيرجّع access وrefresh (PyJWT)، endpoints محمية، وAPI key لـ webhooks n8n — مع اختبارات.', 'Add to your API: users with hashed passwords (argon2 or bcrypt), a login returning access and refresh tokens (PyJWT), protected endpoints, and an API key for n8n webhooks — with tests.'),
      quiz: [
        Q(B('كلمة السر تتخزّن:', 'A password is stored:'), [['hash بطيء بـ salt', 'as a slow salted hash'], ['نص', 'as text'], ['base64', 'as base64']], 0, B('مش بترجع.', 'One-way.')),
        Q(B('payload الـ JWT:', 'A JWT payload:'), [['مقروء لأي حد', 'is readable by anyone'], ['مشفّر وسري', 'is encrypted and secret'], ['مخفي', 'is hidden']], 0, B('موقّع بس.', 'Only signed.')),
        Q(B('API بين n8n وسيرفرك:', 'An API between n8n and your server:'), [['API key في header غالبًا يكفي', 'an API key in a header is often enough'], ['من غير حماية', 'no protection'], ['كلمة السر في الرابط', 'the password in the URL']], 0, B('بسيط وآمن.', 'Simple and safe.'))
      ] },

    { title: B('المهام الخلفية والطوابير', 'Background tasks and queues'),
      goal: B('ترد بسرعة وتخلّي الشغل التقيل يكمّل بعدين بأمان.', 'Reply quickly and let heavy work continue later, safely.'),
      learn: [
        L(B('BackgroundTasks للصغير', 'BackgroundTasks for small things'),
          B('`BackgroundTasks` بيشغّل دالة بعد ما الرد يتبعت — مناسب لحاجة صغيرة (إيميل تأكيد، لوج). بس لو السيرفر وقع، المهمة بتضيع، ومفيش إعادة محاولة. للشغل المهم أو التقيل: طابور.', '`BackgroundTasks` runs a function after the reply is sent — fine for something small (a confirmation email, a log). But if the server crashes, the task is lost, and there is no retry. For important or heavy work: a queue.'),
          '@app.post("/orders", status_code=201)\ndef create(order: OrderIn, background: BackgroundTasks, db = Depends(get_db)):\n    saved = services.create_order(db, order)\n    background.add_task(send_confirmation, saved.id)   # after the response\n    return {"id": saved.id}'),
        L(B('طابور مهام', 'A task queue'),
          B('**task queue** (arq أو Celery أو RQ مع Redis، أو جدول Postgres بـ SKIP LOCKED من n8n أسبوع 25): الـ endpoint بيحط المهمة ويرد 202، وworker منفصل بيعالج بإعادة محاولة وحدود. المهمة بتفضل لو السيرفر وقع.', 'A **task queue** (arq, Celery or RQ with Redis, or a Postgres table with SKIP LOCKED from n8n week 25): the endpoint enqueues the task and replies 202, and a separate worker processes it with retries and limits. The task survives a server crash.'),
          '@app.post("/reports", status_code=202)\nasync def request_report(req: ReportIn):\n    job = await redis.enqueue_job("build_report", req.model_dump(), _job_id=f"report:{req.month}")\n    return {"job_id": job.job_id, "status_url": f"/jobs/{job.job_id}"}\n\n# worker.py: async def build_report(ctx, data): … (retries configured on the worker)'),
        L(B('حالة المهمة', 'The job status'),
          B('مع 202 رجّع `job_id` ورابط حالة `/jobs/{id}` (queued / running / done / failed + النتيجة). العميل أو n8n يسأل عليه، أو تبعتله webhook لما يخلص. و`_job_id` ثابت = idempotent: طلب نفس التقرير مرتين مش بيعمل شغلين.', 'With the 202 return a `job_id` and a status link `/jobs/{id}` (queued / running / done / failed + the result). The client or n8n polls it, or you send a webhook when done. A fixed `_job_id` = idempotent: requesting the same report twice does not create two jobs.'),
          'GET /jobs/report:2026-09 → {"status": "done", "result_url": "/files/report-2026-09.xlsx"}', T)
      ],
      practice: [
        B('ضيف BackgroundTasks لإيميل تأكيد.', 'Add BackgroundTasks for a confirmation email.'),
        B('اعمل endpoint تقرير بيرد 202 وjob_id.', 'Create a report endpoint replying 202 with a job_id.'),
        B('اعمل worker (arq أو جدول بسيط) بإعادة محاولة.', 'Build a worker (arq or a simple table) with retries.'),
        B('اعمل /jobs/{id} للحالة واطلبه من n8n.', 'Create /jobs/{id} for the status and poll it from n8n.')
      ],
      words: [
        W('task queue', 'طابور مهام بيتعالج بعمّال منفصلين', 'a queue of tasks processed by separate workers', 'Heavy reports go to the task queue.'),
        W('202 accepted', 'رد بيقول «استلمنا وهنعالج بعدين»', 'a reply meaning «received; will process later»', 'Return 202 Accepted with a job id.'),
        W('job status', 'حالة مهمة في الطابور', 'the state of a queued task', 'Poll the job status every 10 seconds.'),
        W('arq', 'مكتبة طوابير async بـ Redis', 'an async task queue library using Redis', 'arq retries failed jobs.'),
        W('celery', 'نظام طوابير مهام شهير في بايثون', 'a popular task queue system in Python', 'Celery suits large deployments.')
      ],
      read: [{ t: 'FastAPI: Background Tasks', url: 'https://fastapi.tiangolo.com/tutorial/background-tasks/', what: B('اقرا الحدود والملاحظة عن الأدوات الأكبر.', 'Read the limits and the note about bigger tools.') }, { t: 'arq documentation', url: 'https://arq-docs.helpmanual.io/', what: B('اقرا مثال worker.', 'Read the worker example.') }],
      challenge: B('اعمل «مولّد تقارير» في الـ API: POST يرد 202 بـ job_id ثابت، worker يبني XLSX بإعادة محاولة، /jobs/{id} للحالة، وwebhook لـ n8n لما يخلص.', 'Build a «report generator» in the API: POST replies 202 with a stable job_id, a worker builds an XLSX with retries, /jobs/{id} gives the status, and a webhook notifies n8n when done.'),
      quiz: [
        Q(B('BackgroundTasks لو السيرفر وقع:', 'BackgroundTasks if the server crashes:'), [['المهمة بتضيع', 'the task is lost'], ['المهمة بتفضل', 'the task survives'], ['بتتعاد', 'it retries']], 0, B('للصغير بس.', 'Small things only.')),
        Q(B('الرد المناسب لمهمة هتخلص بعدين:', 'The right reply for work finishing later:'), [['202', '202'], ['200 بالنتيجة', '200 with the result'], ['500', '500']], 0, B('Accepted.', 'Accepted.')),
        Q(B('job_id ثابت لنفس الطلب:', 'A stable job_id for the same request:'), [['يمنع تكرار الشغل', 'prevents duplicate work'], ['بيبطّأ', 'slows things'], ['مش مهم', 'is irrelevant']], 0, B('idempotent.', 'Idempotent.'))
      ] },

    { title: B('التحديثات اللحظية', 'Real-time updates'),
      goal: B('تبعت تحديثات فورية للمتصفح أو لوحة تحكم.', 'Push instant updates to a browser or dashboard.'),
      learn: [
        L(B('WebSocket', 'WebSocket'),
          B('**WebSocket** اتصال مفتوح في الاتجاهين: السيرفر يبعت أول ما حاجة تحصل (طلب جديد، حالة اتغيرت) من غير ما المتصفح يسأل كل شوية. مفيد للوحات التحكم والشات.', 'A **WebSocket** is an open two-way connection: the server sends as soon as something happens (a new order, a status change) without the browser asking repeatedly. Useful for dashboards and chat.'),
          'from fastapi import WebSocket, WebSocketDisconnect\n\n@app.websocket("/ws/orders")\nasync def orders_ws(ws: WebSocket):\n    await manager.connect(ws)\n    try:\n        while True:\n            await ws.receive_text()   # keep the connection alive\n    except WebSocketDisconnect:\n        manager.disconnect(ws)'),
        L(B('مدير الاتصالات', 'The connection manager'),
          B('**connection manager**: قايمة بالاتصالات المفتوحة و`broadcast(msg)` بيبعت للكل، وبيشيل اللي قفل. مع أكتر من سيرفر، استخدم Redis pub/sub عشان كل السيرفرات توصل الرسالة لعملائها.', 'A **connection manager**: a list of open connections and `broadcast(msg)` that sends to all, removing closed ones. With several servers, use Redis pub/sub so every server delivers the message to its clients.'),
          'class Manager:\n    def __init__(self):\n        self.active: set[WebSocket] = set()\n    async def connect(self, ws):\n        await ws.accept(); self.active.add(ws)\n    def disconnect(self, ws):\n        self.active.discard(ws)\n    async def broadcast(self, data: dict):\n        for ws in list(self.active):\n            try:\n                await ws.send_json(data)\n            except Exception:\n                self.disconnect(ws)\n\nmanager = Manager()'),
        L(B('SSE للاتجاه الواحد', 'SSE for one direction'),
          B('لو المتصفح بيستقبل بس (لوحة أرقام، تقدم مهمة)، **server-sent events** أبسط: HTTP عادي بيفضل مفتوح والسيرفر يبعت سطور `data: …`. بيعيد الاتصال لوحده، وبيعدّي من الـ proxies بسهولة. وفي المتصفح: `new EventSource("/events")`.', 'If the browser only receives (a numbers dashboard, task progress), **server-sent events** are simpler: a normal HTTP response that stays open while the server sends `data: …` lines. It reconnects by itself and passes through proxies easily. In the browser: `new EventSource("/events")`.'),
          'from fastapi.responses import StreamingResponse\nimport asyncio, json\n\n@app.get("/jobs/{job_id}/events")\nasync def job_events(job_id: str):\n    async def stream():\n        while (s := await job_status(job_id))["status"] not in ("done", "failed"):\n            yield f"data: {json.dumps(s)}\\n\\n"\n            await asyncio.sleep(1)\n        yield f"data: {json.dumps(s)}\\n\\n"\n    return StreamingResponse(stream(), media_type="text/event-stream")')
      ],
      practice: [
        B('اعمل WebSocket بيبعت «طلب جديد» للوحة HTML بسيطة.', 'Build a WebSocket sending «new order» to a simple HTML board.'),
        B('اعمل connection manager بـ broadcast.', 'Write a connection manager with broadcast.'),
        B('اعمل SSE لتقدم مهمة التقرير.', 'Add SSE for the report job’s progress.'),
        B('اكتب سطرين: إمتى WebSocket وإمتى SSE.', 'Write two lines: when WebSocket and when SSE.')
      ],
      words: [
        W('websocket', 'اتصال مفتوح في الاتجاهين', 'an open two-way connection', 'The dashboard uses a WebSocket.'),
        W('connection manager', 'كائن بيدير الاتصالات المفتوحة', 'an object managing open connections', 'The connection manager broadcasts updates.'),
        W('broadcast', 'تبعت رسالة لكل المتصلين', 'to send a message to everyone connected', 'Broadcast the new order to all screens.'),
        W('server-sent events', 'تحديثات من السيرفر في اتجاه واحد', 'one-way updates from the server', 'Server-sent events show job progress.'),
        W('pub/sub', 'نشر واشتراك بين خدمات', 'publish/subscribe between services', 'Redis pub/sub links several servers.')
      ],
      read: [{ t: 'FastAPI: WebSockets', url: 'https://fastapi.tiangolo.com/advanced/websockets/', what: B('اقرا المثال ومدير الاتصالات.', 'Read the example and the connection manager.') }, { t: 'MDN: Using server-sent events', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events', what: B('اقرا EventSource.', 'Read about EventSource.') }],
      challenge: B('اعمل «لوحة طلبات حية»: webhook الطلبات يعمل broadcast بـ WebSocket لصفحة HTML، وصفحة تقارير بتعرض تقدم المهمة بـ SSE.', 'Build a «live orders board»: the orders webhook broadcasts over a WebSocket to an HTML page, and a reports page shows job progress with SSE.'),
      quiz: [
        Q(B('لوحة بتستقبل بس:', 'A board that only receives:'), [['SSE أبسط', 'SSE is simpler'], ['WebSocket لازم', 'WebSocket is required'], ['polling كل ثانية', 'polling every second']], 0, B('اتجاه واحد.', 'One direction.')),
        Q(B('broadcast:', 'Broadcast:'), [['رسالة لكل المتصلين', 'a message to everyone connected'], ['رسالة لواحد', 'a message to one'], ['حفظ', 'saving']], 0, B('الكل.', 'Everyone.')),
        Q(B('أكتر من سيرفر وWebSockets:', 'Several servers with WebSockets:'), [['Redis pub/sub', 'Redis pub/sub'], ['مستحيل', 'impossible'], ['سيرفر واحد بس', 'only one server']], 0, B('توزيع.', 'Distribution.'))
      ] },

    { title: B('جاهز للإنتاج', 'Production-ready'),
      goal: B('API آمن ومراقَب ومختبر.', 'A safe, monitored and tested API.'),
      learn: [
        L(B('middleware', 'Middleware'),
          B('**middleware** بيلف كل طلب: request id لكل طلب (في الرد واللوج)، قياس الوقت، تسجيل. والـ CORS لأصول محددة بس (مش `*` مع الكوكيز). وrate limit لكل مفتاح أو IP على الـ endpoints الحساسة (تسجيل الدخول).', '**Middleware** wraps every request: a request id per request (in the reply and the logs), timing, logging. CORS for specific origins only (not `*` with cookies). And a rate limit per key or IP on sensitive endpoints (login).'),
          'import time, uuid\n\n@app.middleware("http")\nasync def request_context(request, call_next):\n    rid = request.headers.get("X-Request-ID", uuid.uuid4().hex[:12])\n    start = time.perf_counter()\n    response = await call_next(request)\n    response.headers["X-Request-ID"] = rid\n    log.info("%s %s %s %.0fms", rid, request.method, request.url.path, (time.perf_counter() - start) * 1000)\n    return response'),
        L(B('أخطاء موحّدة', 'Uniform errors'),
          B('خلّي كل الأخطاء بنفس الشكل (زي n8n أسبوع 7): `{"error": {"code", "message", "request_id"}}` بـ exception handlers. ومتطلّعش stack traces للعميل في الإنتاج — سجّلها في اللوج بالـ request id.', 'Give every error the same shape (as in n8n week 7): `{"error": {"code", "message", "request_id"}}` via exception handlers. Never show stack traces to clients in production — log them with the request id.'),
          '@app.exception_handler(OrderNotFound)\nasync def not_found(request, exc):\n    return JSONResponse(status_code=404, content={"error": {"code": "order_not_found", "message": str(exc)}})'),
        L(B('اختبارات الـ API', 'API tests'),
          B('`TestClient` (أو httpx.AsyncClient مع ASGITransport) بيختبر الـ API كامل من غير سيرفر حقيقي: الحالات الناجحة، التحقق 422، المصادقة 401، الحدود 429. مع dependency_overrides لقاعدة اختبار. شغّلهم في CI.', '`TestClient` (or httpx.AsyncClient with ASGITransport) tests the full API without a real server: successes, validation 422, auth 401, limits 429. With dependency_overrides for a test database. Run them in CI.'),
          'def test_requires_key(client):\n    assert client.post("/webhooks/orders", json=VALID).status_code == 401\n\ndef test_creates_order(client):\n    r = client.post("/webhooks/orders", json=VALID, headers={"X-API-Key": "test"})\n    assert r.status_code == 201 and "id" in r.json()')
      ],
      practice: [
        B('ضيف middleware بـ request id وتوقيت.', 'Add middleware with a request id and timing.'),
        B('وحّد شكل الأخطاء بـ exception handlers.', 'Unify the error shape with exception handlers.'),
        B('اكتب 6 اختبارات (201، 401، 422، 404، 429، 202).', 'Write 6 tests (201, 401, 422, 404, 429, 202).'),
        B('اضبط CORS لأصل واحد.', 'Configure CORS for one origin.')
      ],
      words: [
        W('middleware', 'كود بيلف كل طلب ورد', 'code wrapping every request and reply', 'The middleware adds a request id.'),
        W('request id', 'معرّف لكل طلب بيظهر في الرد واللوج', 'an identifier per request in the reply and logs', 'Search the logs by request id.'),
        W('exception handler', 'دالة بتحوّل خطأ لرد موحّد', 'a function turning an error into a uniform reply', 'An exception handler returns our error shape.'),
        W('asgi', 'المعيار اللي FastAPI بيشتغل عليه', 'the standard FastAPI runs on', 'Test the ASGI app without a server.'),
        W('allowed origins', 'المواقع المسموحلها تنادي الـ API من المتصفح', 'the sites allowed to call the API from a browser', 'Set the allowed origins explicitly.')
      ],
      read: ['lib:FastAPI documentation', 'lib:pytest documentation'],
      challenge: B('خلّي الـ API جاهز للإنتاج: middleware (request id، توقيت)، أخطاء موحدة، CORS محدد، rate limit لتسجيل الدخول، و15 اختبار في CI — وشغّله في Docker.', 'Make the API production-ready: middleware (request id, timing), uniform errors, specific CORS, a login rate limit, and 15 tests in CI — and run it in Docker.'),
      quiz: [
        Q(B('request id فايدته:', 'A request id helps to:'), [['تربط شكوى العميل باللوج', 'link a client complaint to the logs'], ['السرعة', 'speed'], ['الأمان فقط', 'security only']], 0, B('تتبع.', 'Tracing.')),
        Q(B('stack trace في رد الإنتاج:', 'A stack trace in a production reply:'), [['لأ؛ في اللوج بس', 'no; only in the logs'], ['عادي', 'fine'], ['مطلوب', 'required']], 0, B('أمان.', 'Security.')),
        Q(B('CORS مع الكوكيز:', 'CORS with cookies:'), [['أصول محددة مش *', 'specific origins, not *'], ['* دايمًا', 'always *'], ['مش مهم', 'irrelevant']], 0, B('حماية.', 'Protection.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('API احترافي بمصادقة وطوابير وتحديثات لحظية.', 'A professional API with auth, queues and real-time updates.'),
      review: [
        B('Depends وpydantic-settings وlifespan والـ routers والـ services.', 'Depends, pydantic-settings, the lifespan, routers and services.'),
        B('تشفير كلمات السر، JWT، access/refresh، وAPI keys.', 'Password hashing, JWT, access/refresh and API keys.'),
        B('BackgroundTasks والطوابير و202 وحالة المهمة.', 'BackgroundTasks, queues, 202 and the job status.'),
        B('WebSockets وconnection manager وSSE.', 'WebSockets, the connection manager and SSE.'),
        B('middleware والأخطاء الموحدة والاختبارات.', 'Middleware, uniform errors and tests.')
      ],
      project: B('ابني «API عمليات» لمتجر: هيكل routers/services، Settings، مستخدمين بكلمات سر مشفّرة وJWT، API key لـ webhooks n8n، تقارير بطابور و202، لوحة طلبات حية بـ WebSocket، تقدم بـ SSE، middleware وأخطاء موحدة، 20 اختبار، وDocker.', 'Build an «operations API» for a shop: routers/services structure, Settings, users with hashed passwords and JWT, an API key for n8n webhooks, queued reports with 202, a live orders board over WebSocket, progress via SSE, middleware and uniform errors, 20 tests, and Docker.'),
      test: [
        Q(B('Depends بيحقن:', 'Depends injects:'), [['اعتماديات مشتركة', 'shared dependencies'], ['CSS', 'CSS'], ['صور', 'images']], 0, B('DB، مستخدم، إعدادات.', 'DB, user, settings.')),
        Q(B('lifespan:', 'The lifespan:'), [['يفتح ويقفل الموارد مرة', 'opens and closes resources once'], ['لكل طلب', 'per request'], ['للاختبار بس', 'only for tests']], 0, B('بداية ونهاية.', 'Start and end.')),
        Q(B('salt:', 'A salt is:'), [['قيمة عشوائية لكل كلمة سر', 'a random value per password'], ['كلمة سر ثانية', 'a second password'], ['مفتاح API', 'an API key']], 0, B('ضد الجداول الجاهزة.', 'Against precomputed tables.')),
        Q(B('JWT بيضمن:', 'A JWT guarantees:'), [['إن البيانات متعدلتش', 'the data was not altered'], ['إنها سرية', 'that it is secret'], ['إنها للأبد', 'that it lasts forever']], 0, B('توقيع.', 'A signature.')),
        Q(B('access token عمره:', 'An access token’s lifetime:'), [['قصير', 'short'], ['سنة', 'a year'], ['للأبد', 'forever']], 0, B('دقايق.', 'Minutes.')),
        Q(B('مقارنة الأسرار:', 'Comparing secrets:'), [['hmac.compare_digest', 'hmac.compare_digest'], ['==', '=='], ['in', 'in']], 0, B('ثابت الوقت.', 'Constant time.')),
        Q(B('تقرير بياخد 5 دقايق:', 'A report taking 5 minutes:'), [['طابور و202', 'a queue and 202'], ['BackgroundTasks', 'BackgroundTasks'], ['انتظار في الطلب', 'waiting in the request']], 0, B('آمن.', 'Safe.')),
        Q(B('حالة المهمة من:', 'The job status comes from:'), [['/jobs/{id}', '/jobs/{id}'], ['اللوج', 'the logs'], ['التخمين', 'guessing']], 0, B('أو webhook.', 'Or a webhook.')),
        Q(B('WebSocket:', 'A WebSocket is:'), [['اتصال مفتوح في الاتجاهين', 'an open two-way connection'], ['طلب عادي', 'a normal request'], ['ملف', 'a file']], 0, B('لحظي.', 'Real time.')),
        Q(B('SSE في المتصفح:', 'SSE in the browser:'), [['EventSource', 'EventSource'], ['fetch كل ثانية', 'fetch every second'], ['iframe', 'an iframe']], 0, B('بيعيد الاتصال لوحده.', 'Reconnects by itself.')),
        Q(B('middleware بيضيف:', 'Middleware adds:'), [['request id وتوقيت', 'a request id and timing'], ['قاعدة بيانات', 'a database'], ['صفحات', 'pages']], 0, B('لكل طلب.', 'Per request.')),
        Q(B('اختبار 401:', 'A 401 test checks:'), [['إن الطلب من غير مفتاح اترفض', 'that a request without a key is refused'], ['النجاح', 'success'], ['البطء', 'slowness']], 0, B('مصادقة.', 'Auth.'))
      ] }
  ]
};
