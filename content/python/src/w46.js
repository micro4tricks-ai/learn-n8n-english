// Python week 46 — Cloud and serverless.
// Handlers are called locally with sample events; cost, capacity, URL-signing, queue and IAM-policy examples run
// with the standard library (prices are placeholders — check each provider's pricing page). Cloud SDK calls,
// Terraform and deploy commands are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('السحابة والـ serverless', 'Cloud and serverless'),
  goal: B('تشغّل Python على السحابة صح: تعرف إمتى الـ serverless مناسب وتكلفته، تكتب Lambda handlers وتنشر containers بتنزل لصفر، تشتغل بالتخزين والأحداث، تبني طوابير موثوقة بـ dead-letter queues، وتضبط الصلاحيات والتكلفة والبنية ككود.',
          'Run Python in the cloud properly: know when serverless fits and what it costs, write Lambda handlers and deploy containers that scale to zero, work with storage and events, build reliable queues with dead-letter queues, and control permissions, cost and infrastructure as code.'),
  days: [
    { title: B('الـ serverless', 'Serverless'),
      goal: B('دالة بتشتغل لما حدث يحصل وبتدفع على قدها.', 'A function that runs on events and costs what it uses.'),
      learn: [
        L(B('الفكرة والـ handler', 'The idea and the handler'),
          B('**serverless** / **function as a service**: بتكتب دالة، والمزود بيشغّلها لما **event source** يبعت **event payload** (طلب HTTP، ملف اترفع، رسالة في طابور، جدول زمني)، وبتدفع لكل تشغيل. في **aws lambda** الدالة اسمها **lambda handler**: `handler(event, context)`. ميزة كبيرة: تقدر تختبرها محليًا بـ event نموذجي.', '**serverless** / **function as a service**: you write a function, and the provider runs it when an **event source** sends an **event payload** (an HTTP request, an uploaded file, a queue message, a schedule), billing per run. In **aws lambda** the function is a **lambda handler**: `handler(event, context)`. A big plus: you can test it locally with a sample event.'),
          'import json, base64, hmac, hashlib\n\nSECRET = b"example-webhook-secret"          # from Secrets Manager / env in real life\n\ndef handler(event, context=None):\n    """API Gateway (HTTP API) → Lambda: verify a webhook and acknowledge fast."""\n    body = event.get("body") or ""\n    if event.get("isBase64Encoded"):\n        body = base64.b64decode(body).decode()\n    sig = (event.get("headers") or {}).get("x-signature", "")\n    good = hmac.new(SECRET, body.encode(), hashlib.sha256).hexdigest()\n    if not hmac.compare_digest(sig, good):\n        return {"statusCode": 401, "body": json.dumps({"error": "bad signature"})}\n    order = json.loads(body)\n    # enqueue for a worker instead of doing slow work here\n    return {"statusCode": 202, "headers": {"content-type": "application/json"},\n            "body": json.dumps({"accepted": order["id"]})}\n\npayload = json.dumps({"id": 1042, "total": 650})\nevent = {"body": payload, "isBase64Encoded": False,\n         "headers": {"x-signature": hmac.new(SECRET, payload.encode(), hashlib.sha256).hexdigest()}}\nprint(handler(event))\nprint(handler({**event, "headers": {"x-signature": "forged"}}))', R),
        L(B('cold start وحدود', 'Cold starts and limits'),
          B('**cold start** = أول تشغيل بعد سكون: المزود بيجهّز بيئة ويحمّل الكود والمكتبات (من 100ms لثواني). بعدها **warm start** سريع. قلّله: مكتبات أقل، imports تقيلة جوه الدالة لو نادرة، واتصالات بتتعمل برّه الـ handler عشان تتعاد. وفيه **timeout limit** (Lambda: 15 دقيقة كحد أقصى) و**memory setting** (بيحدد CPU كمان).', 'A **cold start** = the first run after idling: the provider prepares an environment and loads code and libraries (100 ms to seconds). Then a **warm start** is fast. Reduce it: fewer libraries, heavy imports inside the function if rarely needed, and connections created outside the handler so they are reused. There is a **timeout limit** (Lambda: 15 minutes maximum) and a **memory setting** (which also sets CPU).'),
          'import time\n\n_t0 = time.perf_counter()\nCLIENT = {"connected_at": time.time()}        # module level: runs once per cold start, then reused\nINIT_MS = (time.perf_counter() - _t0) * 1000\ncalls = {"n": 0}\n\ndef handler(event, context=None):\n    calls["n"] += 1\n    kind = "cold" if calls["n"] == 1 else "warm"\n    return f"{kind} start #{calls[\'n\']}, reusing client from {CLIENT[\'connected_at\']:.0f}"\n\nfor _ in range(3):\n    print(handler({}))\nprint(f"init took {INIT_MS:.3f} ms here; heavy imports (pandas…) can take seconds")', R),
        L(B('نموذج التكلفة', 'The cost model'),
          B('**cost model** الـ serverless = **pay per request** + وقت التنفيذ × الذاكرة، وفيه **free tier**. رخيص جدًا للحمل القليل أو المتقطع، وممكن يغلى للحمل الثابت العالي — ساعتها VPS أو container دايم أرخص. احسب قبل ما تقرر (الأسعار في المثال أمثلة؛ راجع صفحة التسعير).', 'The serverless **cost model** = **pay per request** + execution time × memory, with a **free tier**. Very cheap for low or bursty load, and it can get expensive for steady high load — then a VPS or an always-on container is cheaper. Calculate before deciding (prices in the example are placeholders; check the pricing page).'),
          'PRICE_PER_MILLION_REQ = 0.20        # placeholder USD — check the provider\'s pricing page\nPRICE_PER_GB_SECOND = 0.0000167      # placeholder\nVPS_MONTHLY = 12.0                   # placeholder: a small always-on server\n\ndef lambda_monthly(requests, avg_ms, memory_mb):\n    gb_s = requests * (avg_ms / 1000) * (memory_mb / 1024)\n    return requests / 1e6 * PRICE_PER_MILLION_REQ + gb_s * PRICE_PER_GB_SECOND\n\nfor monthly_requests in (50_000, 1_000_000, 20_000_000, 100_000_000):\n    cost = lambda_monthly(monthly_requests, avg_ms=120, memory_mb=256)\n    better = "serverless" if cost < VPS_MONTHLY else "VPS/container"\n    print(f"{monthly_requests:>12,} req/month → ${cost:8.2f}  (cheaper: {better})")', R)
      ],
      practice: [
        B('اكتب handler لـ webhook واختبره بـ event نموذجي.', 'Write a webhook handler and test it with a sample event.'),
        B('انقل الاتصالات برّه الـ handler.', 'Move connections outside the handler.'),
        B('احسب تكلفة workflow عندك على serverless وVPS.', 'Compute the cost of one of your workflows on serverless and a VPS.'),
        B('اعرف حدود timeout وmemory عند مزودك.', 'Learn your provider’s timeout and memory limits.')
      ],
      words: [
        W('serverless', 'تشغيل من غير إدارة سيرفرات', 'running code without managing servers', 'The webhook runs serverless.'),
        W('function as a service', 'دوال كخدمة', 'running single functions on demand', 'Lambda is function as a service.'),
        W('aws lambda', 'خدمة الدوال في AWS', 'Amazon’s function-as-a-service', 'AWS Lambda handles the uploads.'),
        W('lambda handler', 'الدالة اللي Lambda بتناديها', 'the function Lambda invokes', 'The lambda handler returns statusCode 202.'),
        W('event source', 'مصدر الحدث', 'what triggers a function', 'S3 is the event source.'),
        W('event payload', 'بيانات الحدث', 'the data passed to the function', 'Log the event payload size.'),
        W('cold start', 'تأخير أول تشغيل بعد سكون', 'the delay of the first run after idle', 'Heavy imports lengthen the cold start.'),
        W('warm start', 'تشغيل سريع لبيئة جاهزة', 'a fast run on a ready environment', 'Warm starts reuse the database client.'),
        W('timeout limit', 'أقصى مدة تشغيل', 'the maximum run time', 'The timeout limit is 15 minutes.'),
        W('memory setting', 'إعداد الذاكرة (والـ CPU)', 'the memory size, which also sets CPU', 'Raise the memory setting to get more CPU.'),
        W('pay per request', 'دفع لكل طلب', 'billing for each invocation', 'Pay per request suits bursty traffic.'),
        W('cost model', 'طريقة حساب التكلفة', 'how a service is priced', 'Compare the cost model before choosing.'),
        W('free tier', 'استخدام مجاني محدود', 'a limited free allowance', 'The free tier covers our test traffic.')
      ],
      read: [{ t: 'AWS Lambda: Building with Python', url: 'https://docs.aws.amazon.com/lambda/latest/dg/lambda-python.html', what: B('اقرا Handler وBest practices.', 'Read Handler and Best practices.') }],
      challenge: B('حوّل webhook الطلبات لـ Lambda handler: تحقق توقيع، رد 202 سريع، الشغل التقيل في طابور، اتصالات برّه الـ handler، اختبارات محلية بـ 5 events نموذجية — وحساب تكلفة شهرية مقارنة بـ VPS بأرقام مزودك.', 'Turn the orders webhook into a Lambda handler: signature check, a fast 202, heavy work queued, connections outside the handler, local tests with 5 sample events — and a monthly cost comparison with a VPS using your provider’s numbers.'),
      quiz: [
        Q(B('الـ handler بياخد:', 'The handler receives:'), [['event وcontext', 'event and context'], ['request وresponse', 'request and response'], ['ولا حاجة', 'nothing']], 0, B('Lambda.', 'Lambda.')),
        Q(B('اتصال قاعدة البيانات يتعمل:', 'The database connection is created:'), [['برّه الـ handler عشان يتعاد', 'outside the handler so it is reused'], ['جوه كل نداء', 'inside every call'], ['مرة في الشهر', 'once a month']], 0, B('warm.', 'Warm.')),
        Q(B('حمل ثابت وعالي جدًا:', 'Steady, very high load:'), [['container دايم أو VPS غالبًا أرخص', 'an always-on container or VPS is often cheaper'], ['serverless دايمًا أرخص', 'serverless is always cheaper'], ['مجاني', 'free']], 0, B('احسب.', 'Calculate.'))
      ] },

    { title: B('containers بتنزل لصفر', 'Containers that scale to zero'),
      goal: B('FastAPI على السحابة من غير سيرفر دايم.', 'FastAPI in the cloud without an always-on server.'),
      learn: [
        L(B('Cloud Run وأمثاله', 'Cloud Run and friends'),
          B('**container service** زي **cloud run** (Google) أو Azure Container Apps أو AWS App Runner: بتدّيه صورة Docker (أسبوع 45) وهو بيشغّلها ويوسّعها، ومعاه **scale to zero** = مفيش طلبات = مفيش تكلفة. أسهل من Lambda لتطبيق FastAPI كامل، ومن غير قيود الـ handler.', 'A **container service** like **cloud run** (Google), Azure Container Apps or AWS App Runner: you give it a Docker image (week 45) and it runs and scales it, with **scale to zero** = no requests = no cost. Easier than Lambda for a full FastAPI app, without handler restrictions.'),
          '# build once (week 45), then deploy the same image\ngcloud run deploy shop-api \\\n  --image=europe-west1-docker.pkg.dev/acme/shop/shop-api@sha256:4f1c… \\\n  --region=me-central2 \\\n  --min-instances=0 --max-instances=10 \\\n  --concurrency=40 --cpu=1 --memory=512Mi --timeout=60 \\\n  --set-secrets=DATABASE_URL=shop-db-url:latest \\\n  --service-account=shop-api@acme.iam.gserviceaccount.com', T),
        L(B('كام instance محتاج؟', 'How many instances?'),
          B('قانون Little: الطلبات المتزامنة = الطلبات في الثانية × زمن الطلب. لو 50 طلب/ثانية × 0.4 ثانية = 20 طلب في نفس الوقت؛ بـ concurrency 40 لكل instance = instance واحدة تكفي (مع هامش). ده بيحدد max-instances والتكلفة وحدود اتصالات قاعدة البيانات.', 'Little’s law: concurrent requests = requests per second × request time. 50 req/s × 0.4 s = 20 requests at once; with a concurrency of 40 per instance = one instance is enough (with headroom). This sets max-instances, the cost and the database connection limits.'),
          'import math\n\ndef instances_needed(rps, latency_s, concurrency_per_instance, headroom=0.7):\n    in_flight = rps * latency_s                                # Little\'s law\n    return in_flight, max(1, math.ceil(in_flight / (concurrency_per_instance * headroom)))\n\nfor rps, lat in ((5, 0.3), (50, 0.4), (400, 0.4), (400, 1.5)):\n    in_flight, n = instances_needed(rps, lat, concurrency_per_instance=40)\n    print(f"{rps:>4} req/s × {lat}s = {in_flight:6.1f} in flight → {n} instance(s)")\nprint("each instance holds a DB pool → instances × pool size must stay under the DB connection limit")', R),
        L(B('FastAPI على Lambda', 'FastAPI on Lambda'),
          B('لو عايز FastAPI على Lambda بالذات: **mangum** بيلف التطبيق كـ handler. مناسب لـ APIs صغيرة؛ للتطبيقات الكبيرة أو اللي فيها WebSockets أو مهام طويلة، container service أسهل. وفي الحالتين: الحالة في قاعدة بيانات أو كاش، مش في ذاكرة الـ instance (ممكن تختفي أي وقت).', 'If you want FastAPI on Lambda specifically: **mangum** wraps the app as a handler. Fine for small APIs; for big apps, WebSockets or long tasks a container service is easier. Either way: state lives in a database or cache, never in instance memory (it can vanish at any time).'),
          '# pip install mangum\nfrom fastapi import FastAPI\nfrom mangum import Mangum\n\napp = FastAPI()\n\n@app.get("/orders/{order_id}")\ndef get_order(order_id: int):\n    return repo.get(order_id)          # state in Postgres/DynamoDB, not in memory\n\nhandler = Mangum(app)                  # Lambda entry point: shop.api.handler')
      ],
      practice: [
        B('انشر صورتك على Cloud Run (أو مثيله) بـ min-instances=0.', 'Deploy your image to Cloud Run (or similar) with min-instances=0.'),
        B('احسب عدد الـ instances لحملك بـ Little.', 'Compute the instance count for your load with Little’s law.'),
        B('اتأكد إن مفيش حالة في الذاكرة بين الطلبات.', 'Make sure no state lives in memory between requests.'),
        B('قارن cold start لـ container وLambda.', 'Compare cold starts for a container and Lambda.')
      ],
      words: [
        W('container service', 'خدمة بتشغّل صور Docker', 'a managed service running container images', 'We moved to a container service.'),
        W('cloud run', 'خدمة containers من Google', 'Google’s serverless container service', 'Cloud Run scales the API to zero at night.'),
        W('scale to zero', 'ينزل لصفر instances لما مفيش طلبات', 'running no instances when idle', 'Scale to zero keeps staging almost free.'),
        W('mangum', 'مكتبة بتشغّل FastAPI على Lambda', 'an adapter running ASGI apps on Lambda', 'Mangum wraps the FastAPI app.'),
        W('portability', 'سهولة النقل بين المزودين', 'ease of moving between providers', 'Containers give us portability.')
      ],
      read: [{ t: 'Cloud Run: Deploy a Python service', url: 'https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-fastapi-service', what: B('اقرا الخطوات.', 'Read the steps.') }],
      challenge: B('انشر API المتجر على container service بـ scale to zero: نفس الصورة من أسبوع 45، أسرار من secret manager، حساب instances وconcurrency بـ Little، حد اتصالات القاعدة — وقيس cold start وتكلفة أسبوع.', 'Deploy the shop API to a container service with scale to zero: the same image from week 45, secrets from a secret manager, instances and concurrency computed with Little’s law, a database connection cap — and measure the cold start and a week’s cost.'),
      quiz: [
        Q(B('scale to zero:', 'Scale to zero:'), [['مفيش طلبات = مفيش instances ولا تكلفة', 'no requests = no instances and no cost'], ['حذف التطبيق', 'deleting the app'], ['أسرع دايمًا', 'always faster']], 0, B('توفير.', 'Saving.')),
        Q(B('100 طلب/ث × 0.5 ث:', '100 req/s × 0.5 s:'), [['50 طلب متزامن', '50 concurrent requests'], ['200', '200'], ['5', '5']], 0, B('Little.', 'Little.')),
        Q(B('الحالة بين الطلبات:', 'State between requests:'), [['في قاعدة بيانات أو كاش', 'in a database or cache'], ['في متغير global', 'in a global variable'], ['في ملف محلي', 'in a local file']], 0, B('مؤقت.', 'Ephemeral.'))
      ] },

    { title: B('التخزين والأحداث', 'Storage and events'),
      goal: B('ملفات كبيرة من غير ما تعدّي على سيرفرك.', 'Big files without passing through your server.'),
      learn: [
        L(B('Object storage', 'Object storage'),
          B('**object storage** (**s3** وGCS وR2): ملفات (فواتير، صور، تقارير) بمفاتيح، رخيصة وغير محدودة تقريبًا. متخزنش الملفات في قاعدة البيانات أو على قرص الـ container (بيختفي). القاعدة فيها المسار والـ metadata، والملف في الـ bucket — وbucket خاص دايمًا.', '**object storage** (**s3**, GCS, R2): files (invoices, images, reports) under keys, cheap and practically unlimited. Do not store files in the database or on the container’s disk (it disappears). The database holds the path and metadata, the file lives in the bucket — and the bucket is always private.'),
          '# pip install boto3\nimport boto3\n\ns3 = boto3.client("s3", region_name="me-central-1")       # credentials from the IAM role, never in code\nkey = "invoices/2026/10/INV-2041.pdf"\ns3.upload_file("INV-2041.pdf", "acme-shop-private", key,\n               ExtraArgs={"ContentType": "application/pdf", "ServerSideEncryption": "AES256"})\ndb.execute("UPDATE invoices SET file_key = %s WHERE number = %s", (key, "INV-2041"))'),
        L(B('روابط موقّعة', 'Presigned URLs'),
          B('**presigned url** = رابط مؤقت موقّع لملف واحد (تحميل أو رفع) بينتهي بعد دقايق. العميل بيحمّل الفاتورة من الـ bucket مباشرة من غير ما الملف يعدّي على سيرفرك، والـ bucket يفضل خاص. المثال بيبني نفس الفكرة بـ HMAC (S3 بيستخدم توقيع SigV4 أعقد، والـ SDK بيعمله: `generate_presigned_url`).', 'A **presigned url** = a short-lived signed link to one file (download or upload) expiring after minutes. The customer downloads the invoice straight from the bucket without the file passing through your server, and the bucket stays private. The example builds the same idea with HMAC (S3 uses the more complex SigV4 signature, which the SDK does: `generate_presigned_url`).'),
          'import hmac, hashlib, time\nfrom urllib.parse import urlencode, urlsplit, parse_qs\n\nKEY = b"example-signing-key"\n\ndef presign(path, expires_in=300, now=None):\n    exp = int((now or time.time()) + expires_in)\n    sig = hmac.new(KEY, f"{path}|{exp}".encode(), hashlib.sha256).hexdigest()\n    return f"https://files.example.com{path}?" + urlencode({"exp": exp, "sig": sig})\n\ndef verify(url, now=None):\n    u = urlsplit(url); q = parse_qs(u.query)\n    exp, sig = int(q["exp"][0]), q["sig"][0]\n    good = hmac.new(KEY, f"{u.path}|{exp}".encode(), hashlib.sha256).hexdigest()\n    if not hmac.compare_digest(sig, good):\n        return "403 bad signature"\n    return "200 ok" if (now or time.time()) <= exp else "403 expired"\n\nt = 1_760_000_000\nurl = presign("/invoices/INV-2041.pdf", now=t)\nprint(url)\nprint(verify(url, now=t + 60), "|", verify(url, now=t + 600), "|", verify(url.replace("2041", "2042"), now=t + 60))', R),
        L(B('معماريات بالأحداث', 'Event-driven designs'),
          B('**event-driven**: رفع ملف في bucket ← حدث ← دالة بتعالجه (OCR للفاتورة، تصغير صورة) ← تكتب النتيجة وتبعت حدث تاني. كل خطوة صغيرة ومستقلة. و**scheduled job** (EventBridge أو **cloud scheduler**) = cron سحابي بيشغّل دالة أو endpoint في ميعاد.', '**event-driven**: a file uploaded to a bucket → an event → a function processes it (invoice OCR, image resize) → writes the result and emits another event. Each step is small and independent. And a **scheduled job** (EventBridge or **cloud scheduler**) = a cloud cron that runs a function or endpoint on a schedule.'),
          'supplier uploads INV.pdf ──▶ s3://acme-inbox/ (ObjectCreated event)\n        ──▶ Lambda extract_invoice  (Claude extraction, week 23)\n        ──▶ SQS queue "invoices-to-post"\n        ──▶ Lambda post_to_odoo      (idempotent by invoice number)\n        ──▶ Slack message to finance\n\nEventBridge schedule  cron(0 4 * * ? *)  ──▶ Lambda daily_report  (06:00 Cairo = 04:00 UTC)', T)
      ],
      practice: [
        B('خزّن ملفات تطبيقك في bucket خاص.', 'Store your app’s files in a private bucket.'),
        B('ولّد presigned URL لتحميل فاتورة بـ 5 دقايق.', 'Generate a 5-minute presigned URL to download an invoice.'),
        B('اعمل دالة بتشتغل لما ملف يترفع.', 'Build a function that runs when a file is uploaded.'),
        B('حط scheduled job لتقرير يومي.', 'Add a scheduled job for a daily report.')
      ],
      words: [
        W('object storage', 'تخزين ملفات بمفاتيح', 'storing files as objects under keys', 'Invoices live in object storage.'),
        W('s3', 'خدمة تخزين الملفات في AWS', 'Amazon’s object storage service', 'Upload the PDF to S3.'),
        W('presigned url', 'رابط موقّع مؤقت لملف', 'a temporary signed link to a file', 'Email a presigned URL valid for 5 minutes.'),
        W('event-driven', 'مبني على الأحداث', 'triggered by events', 'The invoice pipeline is event-driven.'),
        W('scheduled job', 'مهمة مجدولة', 'a task run on a schedule', 'A scheduled job sends the daily report.'),
        W('cloud scheduler', 'cron سحابي', 'a cloud service running jobs on a schedule', 'Cloud Scheduler calls /reports/daily.'),
        W('eventbridge', 'خدمة أحداث وجداول في AWS', 'AWS’s event bus and scheduler', 'EventBridge triggers the job at 04:00 UTC.')
      ],
      read: [{ t: 'Boto3: Presigned URLs', url: 'https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-presigned-urls.html', what: B('اقرا Generating a presigned URL.', 'Read Generating a presigned URL.') }],
      challenge: B('ابني «صندوق فواتير الموردين» event-driven: رفع على bucket خاص بـ presigned upload URL، دالة بتستخرج البيانات وتحطها في طابور، دالة تانية بتسجّلها، رابط تحميل موقّع للمالية، وتقرير يومي مجدول.', 'Build an event-driven «supplier invoice inbox»: uploads to a private bucket via a presigned upload URL, a function extracting the data into a queue, a second function recording it, a signed download link for finance, and a scheduled daily report.'),
      quiz: [
        Q(B('ملفات العملاء تتخزن في:', 'Customer files are stored in:'), [['bucket خاص', 'a private bucket'], ['قرص الـ container', 'the container disk'], ['bucket عام', 'a public bucket']], 0, B('خاص.', 'Private.')),
        Q(B('presigned URL:', 'A presigned URL:'), [['رابط مؤقت موقّع لملف واحد', 'a temporary signed link to one file'], ['كلمة سر الـ bucket', 'the bucket password'], ['رابط دائم عام', 'a permanent public link']], 0, B('مؤقت.', 'Temporary.')),
        Q(B('تقرير كل يوم 6 الصبح:', 'A report every day at 6 am:'), [['scheduled job', 'a scheduled job'], ['WebSocket', 'a WebSocket'], ['يدوي', 'by hand']], 0, B('جدول.', 'Schedule.'))
      ] },

    { title: B('طوابير موثوقة', 'Reliable queues'),
      goal: B('ولا رسالة تضيع ولا تتنفذ مرتين.', 'No message lost and none processed twice.'),
      learn: [
        L(B('SQS والـ visibility timeout', 'SQS and the visibility timeout'),
          B('**queue** مُدارة زي **sqs**: الـ worker بياخد رسالة، بتختفي عن الباقيين لمدة **visibility timeout**، ولو خلّص بيمسحها؛ لو وقع أو اتأخر، الرسالة بترجع تظهر وworker تاني ياخدها. يعني **at-least-once delivery**: الرسالة ممكن توصل مرتين — فلازم **idempotent handler**.', 'A managed **queue** like **sqs**: a worker receives a message, it is hidden from others for the **visibility timeout**, and on success the worker deletes it; if it crashes or is too slow, the message reappears for another worker. That is **at-least-once delivery**: a message may arrive twice — so you need an **idempotent handler**.'),
          'from collections import deque\n\nclass FakeSQS:\n    def __init__(self, visibility=30, max_receives=3):\n        self.q, self.inflight, self.dlq = deque(), {}, []\n        self.visibility, self.max_receives, self.receives = visibility, max_receives, {}\n    def send(self, mid, body): self.q.append((mid, body))\n    def receive(self, now):\n        for mid, (body, until) in list(self.inflight.items()):    # timed-out messages come back\n            if now >= until:\n                del self.inflight[mid]; self.q.append((mid, body))\n        if not self.q: return None\n        mid, body = self.q.popleft()\n        self.receives[mid] = self.receives.get(mid, 0) + 1\n        if self.receives[mid] > self.max_receives:\n            self.dlq.append((mid, body)); return self.receive(now)\n        self.inflight[mid] = (body, now + self.visibility)\n        return mid, body\n    def delete(self, mid): self.inflight.pop(mid, None)\n\nprocessed = set()\ndef handle(mid, body):                      # idempotent: a duplicate does nothing\n    if mid in processed:\n        return "duplicate ignored"\n    if body == "poison": raise ValueError("cannot parse")\n    processed.add(mid); return "invoice posted"\n\nsqs = FakeSQS(visibility=30)\nfor mid, body in (("m1", "INV-1"), ("m2", "poison"), ("m3", "INV-3")):\n    sqs.send(mid, body)\nsqs.send("m1", "INV-1")                    # the producer retried: a duplicate\nnow = 0\nwhile (msg := sqs.receive(now)) is not None:\n    mid, body = msg\n    try:\n        print(f"t={now:>3} {mid}: {handle(mid, body)}"); sqs.delete(mid)\n    except ValueError as e:\n        print(f"t={now:>3} {mid}: failed ({e}), will reappear")\n    now += 31 if body == "poison" else 1\nprint("dead-letter queue:", sqs.dlq)', R),
        L(B('Dead-letter queue', 'The dead-letter queue'),
          B('رسالة «مسمومة» (بيانات بايظة) بتفشل كل مرة وبترجع للأبد. **dead-letter queue** = بعد N محاولات بتتنقل لطابور جانبي. حط تنبيه على الـ DLQ (أي رسالة فيه = حد يبص)، وأداة تعيد تشغيل الرسايل بعد الإصلاح. ده نفس فكرة error workflow في n8n.', 'A «poison» message (bad data) fails every time and returns forever. A **dead-letter queue** = after N attempts it moves to a side queue. Put an alert on the DLQ (any message there = someone looks), and a tool to redrive messages after the fix. It is the same idea as an n8n error workflow.'),
          '# Terraform excerpt: queue + DLQ + alarm\nresource "aws_sqs_queue" "invoices_dlq" { name = "invoices-dlq"  message_retention_seconds = 1209600 }\nresource "aws_sqs_queue" "invoices" {\n  name                       = "invoices"\n  visibility_timeout_seconds = 180          # > the worker\'s max processing time\n  redrive_policy = jsonencode({ deadLetterTargetArn = aws_sqs_queue.invoices_dlq.arn, maxReceiveCount = 5 })\n}\nresource "aws_cloudwatch_metric_alarm" "dlq_not_empty" {\n  alarm_name = "invoices-dlq-not-empty"   namespace = "AWS/SQS"   metric_name = "ApproximateNumberOfMessagesVisible"\n  dimensions = { QueueName = aws_sqs_queue.invoices_dlq.name }\n  statistic = "Maximum"   period = 300   evaluation_periods = 1   threshold = 0   comparison_operator = "GreaterThanThreshold"\n}', T),
        L(B('ظبط المهلة', 'Tuning the timeout'),
          B('الـ visibility timeout لازم يبقى أكبر من أطول وقت معالجة (وإلا الرسالة ترجع وworker تاني يبدأ فيها وانت لسه شغال = تكرار). ولو المعالجة أحيانًا طويلة، مدّد المهلة أثناء الشغل. ودفعات (batch) من 10 رسايل بتقلل التكلفة والنداءات.', 'The visibility timeout must exceed the longest processing time (otherwise the message reappears and another worker starts while you are still working = duplicates). If processing is sometimes long, extend the timeout while working. And batches of 10 messages cut cost and calls.'),
          'import boto3\nsqs = boto3.client("sqs")\nresp = sqs.receive_message(QueueUrl=URL, MaxNumberOfMessages=10, WaitTimeSeconds=20)   # long polling, batch of 10\nfor m in resp.get("Messages", []):\n    if looks_slow(m):\n        sqs.change_message_visibility(QueueUrl=URL, ReceiptHandle=m["ReceiptHandle"], VisibilityTimeout=600)\n    process(m)                                  # idempotent by invoice number\n    sqs.delete_message(QueueUrl=URL, ReceiptHandle=m["ReceiptHandle"])')
      ],
      practice: [
        B('شغّل الـ FakeSQS وغيّر visibility وmax_receives.', 'Run FakeSQS and change visibility and max_receives.'),
        B('اعمل handler idempotent بمفتاح من البيانات.', 'Make a handler idempotent with a key from the data.'),
        B('حط DLQ وتنبيه على طابور عندك.', 'Add a DLQ and an alert to one of your queues.'),
        B('اكتب أداة redrive للـ DLQ.', 'Write a DLQ redrive tool.')
      ],
      words: [
        W('queue', 'طابور رسايل', 'a list of messages waiting to be processed', 'Put slow work on a queue.'),
        W('sqs', 'خدمة الطوابير في AWS', 'Amazon’s managed queue service', 'The invoices queue runs on SQS.'),
        W('visibility timeout', 'مدة اختفاء الرسالة أثناء المعالجة', 'how long a received message stays hidden', 'Set the visibility timeout above the max processing time.'),
        W('at-least-once delivery', 'الرسالة توصل مرة أو أكتر', 'delivery that may repeat messages', 'At-least-once delivery means duplicates happen.'),
        W('idempotent handler', 'معالج تكراره ميعملش أثر زيادة', 'a handler safe to run twice', 'An idempotent handler checks the invoice number.'),
        W('dead-letter queue', 'طابور الرسايل اللي فشلت', 'a queue for messages that keep failing', 'Alert when the dead-letter queue is not empty.')
      ],
      read: [{ t: 'Amazon SQS: Visibility timeout', url: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html', what: B('اقرا الصفحة كلها.', 'Read the whole page.') }],
      challenge: B('ابني طابور الفواتير على SQS (أو FakeSQS محليًا): workers idempotent بمفتاح الفاتورة، visibility timeout مظبوط، DLQ بعد 5 محاولات وتنبيه، long polling ودفعات، وأداة redrive — مع اختبارات للتكرار والرسالة المسمومة.', 'Build the invoices queue on SQS (or FakeSQS locally): idempotent workers keyed by invoice, a tuned visibility timeout, a DLQ after 5 attempts with an alert, long polling and batches, and a redrive tool — with tests for duplicates and a poison message.'),
      quiz: [
        Q(B('at-least-once معناها:', 'At-least-once means:'), [['ممكن الرسالة توصل مرتين', 'a message may arrive twice'], ['مرة بالظبط', 'exactly once'], ['ممكن متوصلش', 'it may never arrive']], 0, B('تكرار.', 'Duplicates.')),
        Q(B('visibility timeout أقصر من المعالجة:', 'A visibility timeout shorter than processing:'), [['تكرار المعالجة', 'duplicate processing'], ['أسرع', 'faster'], ['مفيش مشكلة', 'no problem']], 0, B('مهلة.', 'Timeout.')),
        Q(B('رسالة بتفشل كل مرة:', 'A message failing every time:'), [['تروح الـ dead-letter queue', 'goes to the dead-letter queue'], ['تتعاد للأبد', 'retries forever'], ['تتمسح بصمت', 'is silently deleted']], 0, B('DLQ.', 'DLQ.'))
      ] },

    { title: B('الصلاحيات والتكلفة والبنية ككود', 'Permissions, cost and infrastructure as code'),
      goal: B('سحابة آمنة ومتوقعة التكلفة ومكتوبة ككود.', 'A cloud that is safe, cost-predictable and written as code.'),
      learn: [
        L(B('IAM بأقل صلاحية', 'IAM with least privilege'),
          B('كل دالة أو خدمة ليها **iam role** خاص بيها بالصلاحيات اللي محتاجاها بالظبط (قراية من bucket معين، كتابة في طابور معين) — مش `*`. والأسرار في **secrets manager** والدالة بتقراها بالـ role. المثال بيفحص policy عن wildcards خطيرة.', 'Each function or service has its own **iam role** with exactly the permissions it needs (read from one bucket, write to one queue) — not `*`. Secrets live in **secrets manager** and the function reads them through its role. The example audits a policy for dangerous wildcards.'),
          'import json\n\npolicy = json.loads("""{\n  "Statement": [\n    {"Effect": "Allow", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::acme-inbox/*"},\n    {"Effect": "Allow", "Action": "sqs:*", "Resource": "*"},\n    {"Effect": "Allow", "Action": ["secretsmanager:GetSecretValue"], "Resource": "arn:aws:secretsmanager:me-central-1:123456789012:secret:shop/db-*"},\n    {"Effect": "Allow", "Action": "*", "Resource": "*"}\n  ]\n}""")\n\nfor i, st in enumerate(policy["Statement"], 1):\n    actions = st["Action"] if isinstance(st["Action"], list) else [st["Action"]]\n    problems = []\n    if any(a == "*" for a in actions): problems.append("all actions (admin!)")\n    elif any(a.endswith(":*") for a in actions): problems.append(f"every {actions[0].split(\':\')[0]} action")\n    if st["Resource"] == "*": problems.append("every resource")\n    print(f"statement {i}:", "; ".join(problems) or "ok — scoped")', R),
        L(B('قاعدة البيانات والمنطقة', 'The database and the region'),
          B('**managed database** (RDS، Cloud SQL، Neon…) = نسخ احتياطي وتحديثات من غير ما تديرها. لكن فيه **connection limit**: 200 instance serverless × pool 10 = 2000 اتصال = القاعدة تقع. الحل: pool صغير، وproxy زي **rds proxy** أو PgBouncer. واختار **region** قريبة من عملائك ومناسبة لـ **data residency** (السعودية والإمارات عندهم قواعد — مش استشارة قانونية).', 'A **managed database** (RDS, Cloud SQL, Neon…) = backups and updates without managing them. But there is a **connection limit**: 200 serverless instances × a pool of 10 = 2,000 connections = the database falls over. The fix: a small pool and a proxy like **rds proxy** or PgBouncer. And choose a **region** close to your customers and suitable for **data residency** (Saudi Arabia and the UAE have rules — not legal advice).'),
          'max instances  pool/instance  connections  db limit (small instance ≈ 100–200)\n      10            5              50       ok\n     100            5             500       ✗ too many → use a proxy / smaller pool\n     100            1 via proxy    100      ✓ the proxy multiplexes onto ~20 real connections\n\nregion: me-central-1 (UAE) / me-central2 (Dammam) for Gulf customers → lower latency, residency-friendly', T),
        L(B('التكلفة والبنية ككود', 'Cost and infrastructure as code'),
          B('حط **budget alert** من أول يوم (تنبيه عند 50% و80% و100% من الميزانية)، وtags على كل مورد (المشروع، العميل). والبنية كلها **infrastructure as code** بـ **terraform** (أو **aws cdk** بـ Python أو Pulumi): متكررة، متراجعة في PR، وبتتشال كلها بأمر. ده كمان بيقلل **vendor lock-in** لأنك عارف بالظبط إيه اللي عندك.', 'Set a **budget alert** from day one (alerts at 50%, 80% and 100% of budget), and tags on every resource (project, client). And all infrastructure as **infrastructure as code** with **terraform** (or **aws cdk** in Python, or Pulumi): repeatable, reviewed in a PR, and removable with one command. It also reduces **vendor lock-in** because you know exactly what you have.'),
          '# AWS CDK in Python (excerpt) — cdk deploy\nfrom aws_cdk import Stack, Duration, aws_lambda as lambda_, aws_sqs as sqs, aws_budgets as budgets\nfrom constructs import Construct\n\nclass ShopStack(Stack):\n    def __init__(self, scope: Construct, id: str, **kw):\n        super().__init__(scope, id, **kw)\n        dlq = sqs.Queue(self, "InvoicesDLQ", retention_period=Duration.days(14))\n        queue = sqs.Queue(self, "Invoices", visibility_timeout=Duration.minutes(3),\n                          dead_letter_queue=sqs.DeadLetterQueue(max_receive_count=5, queue=dlq))\n        fn = lambda_.Function(self, "PostInvoice", runtime=lambda_.Runtime.PYTHON_3_13,\n                              handler="shop.post_invoice.handler", code=lambda_.Code.from_asset("dist"),\n                              timeout=Duration.seconds(60), memory_size=256)\n        queue.grant_consume_messages(fn)          # least privilege generated for you\n        budgets.CfnBudget(self, "Budget", budget={"budgetType": "COST", "timeUnit": "MONTHLY",\n                          "budgetLimit": {"amount": 50, "unit": "USD"}})')
      ],
      practice: [
        B('افحص policies عندك عن * وصلّحها.', 'Audit your policies for * and fix them.'),
        B('احسب الاتصالات القصوى لقاعدتك.', 'Compute your database’s maximum connections.'),
        B('حط budget alert النهارده.', 'Set a budget alert today.'),
        B('اكتب مورد واحد بـ Terraform أو CDK.', 'Write one resource with Terraform or CDK.')
      ],
      words: [
        W('iam role', 'هوية بصلاحيات لخدمة', 'an identity with permissions for a service', 'Each Lambda has its own IAM role.'),
        W('secrets manager', 'خدمة خزن الأسرار السحابية', 'a cloud service storing secrets', 'Read the DB URL from Secrets Manager.'),
        W('managed database', 'قاعدة بيانات مُدارة', 'a database run by the provider', 'A managed database handles backups.'),
        W('connection limit', 'أقصى عدد اتصالات', 'the maximum number of connections', 'We hit the connection limit at peak.'),
        W('rds proxy', 'وسيط اتصالات لقواعد AWS', 'a connection pooler for AWS databases', 'RDS Proxy shares connections between Lambdas.'),
        W('region', 'منطقة سحابية', 'a geographic cloud location', 'Deploy in a Gulf region.'),
        W('data residency', 'بقاء البيانات في بلد معين', 'keeping data in a specific country', 'Data residency decided the region.'),
        W('budget alert', 'تنبيه الميزانية', 'a warning when spending passes a threshold', 'The budget alert fired at 80%.'),
        W('infrastructure as code', 'البنية مكتوبة ككود', 'infrastructure defined in code', 'Infrastructure as code lives in the repo.'),
        W('terraform', 'أداة البنية ككود', 'a tool for infrastructure as code', 'terraform plan shows the changes.'),
        W('aws cdk', 'البنية ككود بلغات برمجة في AWS', 'AWS infrastructure in programming languages', 'We use the AWS CDK in Python.'),
        W('vendor lock-in', 'الارتباط بمزود واحد', 'dependence on one provider', 'Containers reduce vendor lock-in.')
      ],
      read: [{ t: 'AWS CDK: Working with Python', url: 'https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-python.html', what: B('اقرا Prerequisites وCreating a project.', 'Read Prerequisites and Creating a project.') }],
      challenge: B('اكتب بنية «صندوق الفواتير» ككود (Terraform أو CDK): bucket خاص، طابور وDLQ وتنبيه، دالتين بـ roles بأقل صلاحية، سر من secrets manager، region مناسبة، tags وbudget alert — وشغّل plan واستعرضه في PR.', 'Write the «invoice inbox» infrastructure as code (Terraform or CDK): a private bucket, a queue with DLQ and alarm, two functions with least-privilege roles, a secret from secrets manager, a suitable region, tags and a budget alert — run plan and review it in a PR.'),
      quiz: [
        Q(B('"Action": "*", "Resource": "*":', '"Action": "*", "Resource": "*":'), [['صلاحية admin كاملة: خطر', 'full admin rights: dangerous'], ['أقل صلاحية', 'least privilege'], ['مفيش صلاحيات', 'no permissions']], 0, B('أقل صلاحية.', 'Least privilege.')),
        Q(B('200 دالة × pool 10 على قاعدة صغيرة:', '200 functions × a pool of 10 on a small database:'), [['proxy أو pool أصغر', 'a proxy or a smaller pool'], ['تمام', 'fine'], ['زوّد الدوال', 'add functions']], 0, B('اتصالات.', 'Connections.')),
        Q(B('من أول يوم في السحابة:', 'From day one in the cloud:'), [['budget alert', 'a budget alert'], ['مفيش حدود', 'no limits'], ['admin للكل', 'admin for everyone']], 0, B('تكلفة.', 'Cost.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('Python على السحابة بثقة ومن غير مفاجآت.', 'Python in the cloud with confidence and no surprises.'),
      review: [
        B('الـ serverless والـ handlers والـ cold start والتكلفة.', 'Serverless, handlers, cold starts and cost.'),
        B('containers بتنزل لصفر وقانون Little وmangum.', 'Scale-to-zero containers, Little’s law and mangum.'),
        B('object storage وpresigned URLs والأحداث والجدولة.', 'Object storage, presigned URLs, events and scheduling.'),
        B('SQS والـ visibility timeout والـ idempotency والـ DLQ.', 'SQS, the visibility timeout, idempotency and the DLQ.'),
        B('IAM والأسرار وحدود القاعدة والميزانية والبنية ككود.', 'IAM, secrets, database limits, budgets and infrastructure as code.')
      ],
      project: B('مشروع الأسبوع «صندوق فواتير الموردين على السحابة»: رفع بـ presigned URL لـ bucket خاص، Lambda بتستخرج البيانات (Claude أو fake)، SQS بـ DLQ وتنبيه، worker idempotent بيسجّل في قاعدة مُدارة عبر proxy، API المتجر على container service بـ scale to zero، تقرير يومي مجدول، كل الموارد بـ Terraform أو CDK بصلاحيات أقل وbudget alert، وتقدير تكلفة شهرية — مع اختبارات محلية للـ handlers.', 'Week project «supplier invoice inbox in the cloud»: uploads via presigned URL to a private bucket, a Lambda extracting the data (Claude or a fake), SQS with a DLQ and alarm, an idempotent worker recording to a managed database through a proxy, the shop API on a container service with scale to zero, a scheduled daily report, every resource in Terraform or CDK with least privilege and a budget alert, and a monthly cost estimate — with local tests for the handlers.'),
      test: [
        Q(B('serverless:', 'Serverless:'), [['كود بيشتغل على أحداث من غير إدارة سيرفر', 'code running on events without managing servers'], ['من غير سيرفرات خالص', 'no servers at all'], ['مجاني دايمًا', 'always free']], 0, B('مُدار.', 'Managed.')),
        Q(B('event payload:', 'An event payload:'), [['بيانات الحدث للدالة', 'the event data for the function'], ['فاتورة السحابة', 'the cloud bill'], ['صورة Docker', 'a Docker image']], 0, B('مدخل.', 'Input.')),
        Q(B('cold start بيطوّله:', 'A cold start is lengthened by:'), [['مكتبات تقيلة', 'heavy libraries'], ['كود قصير', 'short code'], ['ذاكرة كتير', 'lots of memory']], 0, B('تحميل.', 'Loading.')),
        Q(B('Cloud Run بـ min-instances=0:', 'Cloud Run with min-instances=0:'), [['scale to zero', 'scale to zero'], ['instance دايمة', 'an always-on instance'], ['مستحيل', 'impossible']], 0, B('صفر.', 'Zero.')),
        Q(B('قانون Little:', 'Little’s law:'), [['المتزامن = rps × زمن الطلب', 'concurrent = rps × request time'], ['السرعة × الحجم', 'speed × size'], ['ثابت', 'a constant']], 0, B('سعة.', 'Capacity.')),
        Q(B('ملف فاتورة كبير للعميل:', 'A large invoice file for a customer:'), [['presigned URL من الـ bucket', 'a presigned URL from the bucket'], ['يعدّي على السيرفر', 'pass it through the server'], ['bucket عام', 'a public bucket']], 0, B('مباشر.', 'Direct.')),
        Q(B('SQS بيوصّل:', 'SQS delivers:'), [['at-least-once', 'at least once'], ['exactly-once دايمًا', 'always exactly once'], ['مرة كل يوم', 'once a day']], 0, B('تكرار.', 'Duplicates.')),
        Q(B('idempotent handler:', 'An idempotent handler:'), [['تكراره ميعملش أثر زيادة', 'repeating it adds no extra effect'], ['أسرع', 'faster'], ['مشفّر', 'encrypted']], 0, B('أمان.', 'Safety.')),
        Q(B('visibility timeout لازم يبقى:', 'The visibility timeout must be:'), [['أكبر من أطول معالجة', 'longer than the longest processing'], ['ثانية', 'one second'], ['صفر', 'zero']], 0, B('مهلة.', 'Timeout.')),
        Q(B('IAM role لكل دالة:', 'An IAM role per function:'), [['بالصلاحيات اللي محتاجاها بس', 'with only the permissions it needs'], ['admin', 'admin'], ['من غير صلاحيات', 'with no permissions']], 0, B('أقل صلاحية.', 'Least privilege.')),
        Q(B('دوال كتير وقاعدة صغيرة:', 'Many functions and a small database:'), [['connection limit؛ استخدم proxy', 'the connection limit; use a proxy'], ['مفيش مشكلة', 'no problem'], ['قاعدة لكل دالة', 'a database per function']], 0, B('اتصالات.', 'Connections.')),
        Q(B('terraform plan:', 'terraform plan:'), [['بيوريك التغييرات قبل التطبيق', 'shows changes before applying'], ['بيمسح كل حاجة', 'deletes everything'], ['بيكتب كود Python', 'writes Python code']], 0, B('مراجعة.', 'Review.'))
      ] }
  ]
};
