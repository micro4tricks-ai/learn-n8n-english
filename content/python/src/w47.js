// Python week 47 — Observability and maintenance.
// JSON logging with contextvars, a histogram with Prometheus text output, a tiny tracer, error-budget and
// heartbeat checks and an end-of-life checker run with the standard library; prometheus_client,
// OpenTelemetry and Sentry are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('المراقبة والصيانة', 'Observability and maintenance'),
  goal: B('تعرف اللي بيحصل جوه أنظمتك قبل ما العميل يقولك: لوج منظم بمعرّف لكل طلب، مقاييس بالشكل اللي Prometheus بيفهمه، تتبع موزّع بـ OpenTelemetry، SLOs وميزانية أخطاء وتنبيهات على الأعراض، وصيانة مستمرة (نسخ Python، الديون التقنية، الحوادث والـ postmortems).',
          'Know what happens inside your systems before a client tells you: structured logs with an id per request, metrics in the shape Prometheus understands, distributed tracing with OpenTelemetry, SLOs, error budgets and symptom-based alerts, and ongoing maintenance (Python versions, technical debt, incidents and postmortems).'),
  days: [
    { title: B('لوج منظم', 'Structured logs'),
      goal: B('لوج تقدر تدوّر فيه وتربطه بطلب.', 'Logs you can search and tie to a request.'),
      learn: [
        L(B('JSON مش نص حر', 'JSON, not free text'),
          B('**observability** = تقدر تجاوب على أسئلة جديدة عن نظامك من بياناته (لوج، مقاييس، تتبع) من غير ما تضيف كود. أول خطوة: **structured logging** — كل سطر JSON بحقول ثابتة (الوقت، المستوى، الحدث، order_id) بدل جمل حرة. أدوات التجميع (**log aggregation** زي Loki أو CloudWatch) بتفلتر وتعد بالحقول.', '**observability** = being able to answer new questions about your system from its data (logs, metrics, traces) without adding code. The first step: **structured logging** — each line JSON with fixed fields (time, level, event, order_id) instead of free sentences. Aggregation tools (**log aggregation** like Loki or CloudWatch) filter and count by field.'),
          'import json, logging, sys, time\n\nclass JsonFormatter(logging.Formatter):\n    def format(self, record):\n        base = {"ts": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime(record.created)),\n                "level": record.levelname.lower(), "logger": record.name, "event": record.getMessage()}\n        base.update(getattr(record, "fields", {}))\n        return json.dumps(base, ensure_ascii=False)\n\nlog = logging.getLogger("shop")\nh = logging.StreamHandler(sys.stdout); h.setFormatter(JsonFormatter())\nlog.addHandler(h); log.setLevel(logging.INFO)\n\nlog.info("order_paid", extra={"fields": {"order_id": 1042, "total": 650, "gateway": "paymob"}})\nlog.warning("odoo_slow", extra={"fields": {"order_id": 1042, "ms": 3870}})\n# ✗ log.info(f"Order {id} paid {total} via paymob")  ← hard to filter and count', R),
        L(B('معرّف لكل طلب', 'An id per request'),
          B('**correlation id** = معرّف واحد بيتحط على كل سطر لوج خاص بطلب واحد (والطلبات اللي طلعت منه لخدمات تانية). في Python: **contextvars** بيخزّن القيمة للطلب الحالي حتى مع async، وfilter بيضيفها لكل سطر لوحده. وبعّته في header (`X-Request-ID`) للخدمات التانية وn8n.', 'A **correlation id** = one identifier on every log line of a single request (and the requests it makes to other services). In Python: **contextvars** stores the value for the current request even with async, and a filter adds it to every line automatically. Send it in a header (`X-Request-ID`) to other services and n8n.'),
          'import contextvars, logging, sys, uuid, asyncio\n\nrequest_id = contextvars.ContextVar("request_id", default="-")\n\nclass AddRequestId(logging.Filter):\n    def filter(self, record):\n        record.rid = request_id.get()\n        return True\n\nlog = logging.getLogger("api")\nh = logging.StreamHandler(sys.stdout)\nh.setFormatter(logging.Formatter("%(rid)s %(message)s")); h.addFilter(AddRequestId())\nlog.addHandler(h); log.setLevel(logging.INFO)\n\nasync def handle(order_id):\n    request_id.set(uuid.uuid4().hex[:8])          # in middleware: from X-Request-ID or new\n    log.info(f"start order {order_id}")\n    await asyncio.sleep(0.01 * order_id)            # requests interleave…\n    log.info(f"done order {order_id}")              # …but each line keeps its own id\n\nasync def main():\n    await asyncio.gather(handle(3), handle(1), handle(2))\n\nasyncio.run(main())', R),
        L(B('مستويات وإحتفاظ', 'Levels and retention'),
          B('اختار المستوى صح: debug (تفاصيل للتطوير)، info (أحداث بيزنس)، warning (حاجة غريبة بس شغالين)، error (فشل عملية)، critical (النظام في خطر). ومتسجلش كل حاجة — اللوج بفلوس. **log retention**: 30 يوم مثلًا للتشغيل، أطول للـ audit — ومن غير PII (أسبوع 44).', 'Pick levels properly: debug (development details), info (business events), warning (something odd but working), error (an operation failed), critical (the system is at risk). Do not log everything — logs cost money. **log retention**: e.g. 30 days for operations, longer for audit — and no PII (week 44).'),
          'level     example                                              who looks\ndebug     "mapping row 17: {…}"                                  only while developing\ninfo      order_paid order_id=1042 total=650                       dashboards, counts\nwarning   odoo_slow ms=3870 (threshold 3000)                       weekly review\nerror     invoice_failed order_id=1042 reason="tax code VAT-0"    alert if > 5 in 10 min\ncritical  db_unreachable for 60 s                                  page on-call now', T)
      ],
      practice: [
        B('حوّل لوج تطبيقك لـ JSON بحقول ثابتة.', 'Switch your app’s logs to JSON with fixed fields.'),
        B('ضيف correlation id بـ contextvars وmiddleware.', 'Add a correlation id with contextvars and middleware.'),
        B('ابعت X-Request-ID لـ n8n والخدمات التانية.', 'Pass X-Request-ID to n8n and other services.'),
        B('راجع مستويات اللوج وشيل الزيادة.', 'Review log levels and remove the excess.')
      ],
      words: [
        W('observability', 'القدرة على فهم النظام من بياناته', 'understanding a system from its outputs', 'Observability answers questions you didn’t plan for.'),
        W('structured logging', 'لوج بحقول منظمة', 'logging as fields, usually JSON', 'Structured logging made errors countable.'),
        W('log aggregation', 'تجميع اللوج في مكان واحد', 'collecting logs from many places', 'Log aggregation runs on Loki.'),
        W('correlation id', 'معرّف بيربط كل لوج الطلب', 'an id linking all logs of one request', 'Search by correlation id across services.'),
        W('contextvars', 'متغيرات خاصة بالسياق الحالي', 'context-local variables in Python', 'contextvars keeps the request id in async code.'),
        W('log retention', 'مدة الاحتفاظ باللوج', 'how long logs are kept', 'Log retention is 30 days.')
      ],
      read: [{ t: 'contextvars', url: 'https://docs.python.org/3/library/contextvars.html', what: B('اقرا الأمثلة مع asyncio.', 'Read the asyncio examples.') }],
      challenge: B('خلّي لوج خدمة المتجر قابل للتحقيق: JSON بحقول ثابتة، correlation id من middleware لحد الـ workers وn8n، مستويات مظبوطة، redaction (أسبوع 44)، وتجميع في مكان واحد (Loki أو ملف واحد على الأقل) — وجاوب «إيه اللي حصل لطلب 1042؟» في أقل من دقيقة.', 'Make the shop service’s logs investigable: JSON with fixed fields, a correlation id from middleware through workers and n8n, correct levels, redaction (week 44), and aggregation in one place (Loki or at least one file) — then answer «what happened to order 1042?» in under a minute.'),
      quiz: [
        Q(B('لوج أسهل في البحث:', 'Easier logs to search:'), [['JSON بحقول', 'JSON with fields'], ['جمل حرة', 'free sentences'], ['print', 'print']], 0, B('منظم.', 'Structured.')),
        Q(B('correlation id في async:', 'A correlation id with async:'), [['contextvars', 'contextvars'], ['متغير global', 'a global variable'], ['ملف', 'a file']], 0, B('سياق.', 'Context.')),
        Q(B('عملية فشلت:', 'An operation failed:'), [['error', 'error'], ['debug', 'debug'], ['info', 'info']], 0, B('مستوى.', 'Level.'))
      ] },

    { title: B('المقاييس', 'Metrics'),
      goal: B('أرقام بتوريك صحة النظام في نظرة.', 'Numbers showing system health at a glance.'),
      learn: [
        L(B('أنواع المقاييس', 'Kinds of metrics'),
          B('**metrics** = أرقام بتتجمع مع الوقت: **counter** (بيزيد بس: الطلبات، الأخطاء)، **gauge** (بيطلع وينزل: طول الطابور، الذاكرة)، و**histogram** (توزيع: زمن الاستجابة في buckets عشان تحسب **percentile** زي p95). **prometheus** بيسحب المقاييس من endpoint `/metrics` بصيغة نصية بسيطة.', '**metrics** = numbers aggregated over time: a **counter** (only goes up: requests, errors), a **gauge** (goes up and down: queue length, memory), and a **histogram** (a distribution: response time in buckets so you can compute a **percentile** like p95). **prometheus** scrapes metrics from a `/metrics` endpoint in a simple text format.'),
          'import random, bisect\n\nBUCKETS = [0.05, 0.1, 0.25, 0.5, 1, 2.5, 5]\nclass Histogram:\n    def __init__(self, name):\n        self.name, self.counts, self.sum, self.n = name, [0] * (len(BUCKETS) + 1), 0.0, 0\n    def observe(self, v):\n        self.counts[bisect.bisect_left(BUCKETS, v)] += 1; self.sum += v; self.n += 1\n    def render(self):\n        lines, cum = [], 0\n        for le, c in zip(BUCKETS + ["+Inf"], self.counts):\n            cum += c; lines.append(f\'{self.name}_bucket{{le="{le}"}} {cum}\')\n        return "\\n".join(lines + [f"{self.name}_sum {self.sum:.3f}", f"{self.name}_count {self.n}"])\n\nrng = random.Random(4)\nh = Histogram("http_request_duration_seconds")\nfor _ in range(1000):\n    h.observe(rng.lognormvariate(-2.3, 0.8))       # mostly fast, a slow tail\nprint("# TYPE http_request_duration_seconds histogram")\nprint(h.render())\nprint(\'orders_paid_total{gateway="paymob"} 412\')    # a counter\nprint("invoice_queue_depth 7")                       # a gauge', R),
        L(B('RED والإشارات الذهبية', 'RED and the golden signals'),
          B('إيه اللي تقيسه؟ لكل خدمة: **red method** = Rate (طلبات/ث)، Errors (**error rate**)، Duration (p95). ولكل مورد (قاعدة، طابور): USE = Utilisation، **saturation**، Errors. و**golden signals** (latency، traffic، errors، saturation) هي نفس الفكرة. ابدأ بيهم قبل أي مقياس تاني.', 'What should you measure? For each service: the **red method** = Rate (requests/s), Errors (the **error rate**), Duration (p95). For each resource (database, queue): USE = Utilisation, **saturation**, Errors. And the **golden signals** (latency, traffic, errors, saturation) are the same idea. Start with these before any other metric.'),
          '# PromQL for the shop API dashboard\nrate:     sum(rate(http_requests_total{service="shop-api"}[5m]))\nerrors:   sum(rate(http_requests_total{service="shop-api", status=~"5.."}[5m]))\n          / sum(rate(http_requests_total{service="shop-api"}[5m]))\nduration: histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))\nsaturation: invoice_queue_depth   and   pg_stat_activity_count / pg_settings_max_connections', T),
        L(B('في التطبيق', 'In the app'),
          B('في Python: `prometheus_client` (أو OpenTelemetry metrics). عرّف المقاييس مرة، وزوّدها في middleware ونقط البيزنس. خلي بالك من **cardinality**: label بقيم كتير (user_id، order_id) بيعمل ملايين سلاسل ويوقّع Prometheus — استخدم labels بقيم محدودة (status، gateway، route).', 'In Python: `prometheus_client` (or OpenTelemetry metrics). Define metrics once and update them in middleware and at business points. Beware of **cardinality**: a label with many values (user_id, order_id) creates millions of series and topples Prometheus — use labels with limited values (status, gateway, route).'),
          '# pip install prometheus-client\nfrom prometheus_client import Counter, Histogram, Gauge, make_asgi_app\n\nREQUESTS = Counter("http_requests_total", "HTTP requests", ["route", "status"])\nLATENCY = Histogram("http_request_duration_seconds", "Request time", ["route"])\nPAID = Counter("orders_paid_total", "Paid orders", ["gateway"])\nQUEUE = Gauge("invoice_queue_depth", "Invoices waiting")\n\napp.mount("/metrics", make_asgi_app())       # Prometheus scrapes this (keep it internal)\n\n@app.middleware("http")\nasync def measure(request, call_next):\n    route = request.scope.get("route").path if request.scope.get("route") else "unmatched"   # /orders/{id}, NOT /orders/1042\n    with LATENCY.labels(route).time():\n        response = await call_next(request)\n    REQUESTS.labels(route, str(response.status_code)).inc()\n    return response')
      ],
      practice: [
        B('اعمل /metrics بـ counter وhistogram وgauge.', 'Expose /metrics with a counter, a histogram and a gauge.'),
        B('اعمل dashboard RED في Grafana.', 'Build a RED dashboard in Grafana.'),
        B('راجع labels عن cardinality عالي.', 'Review labels for high cardinality.'),
        B('ضيف مقياس بيزنس (طلبات مدفوعة لكل بوابة).', 'Add a business metric (paid orders per gateway).')
      ],
      words: [
        W('metrics', 'مقاييس رقمية مع الوقت', 'numbers aggregated over time', 'Metrics show the trend; logs show the detail.'),
        W('gauge', 'مقياس بيطلع وينزل', 'a metric that can go up and down', 'Queue depth is a gauge.'),
        W('histogram', 'مقياس توزيع في buckets', 'a distribution of values in buckets', 'Latency is recorded as a histogram.'),
        W('percentile', 'شريحة مئوية', 'the value below which a share of data falls', 'The 95th percentile is 420 ms.'),
        W('prometheus', 'نظام مقاييس بيسحب من /metrics', 'a metrics system scraping /metrics', 'Prometheus scrapes every 15 seconds.'),
        W('red method', 'Rate وErrors وDuration', 'rate, errors and duration per service', 'Start dashboards with the RED method.'),
        W('error rate', 'نسبة الأخطاء', 'the share of failed requests', 'The error rate jumped to 4%.'),
        W('saturation', 'قد إيه المورد مليان', 'how full a resource is', 'Queue saturation warned us early.'),
        W('golden signals', 'الإشارات الأربعة الأساسية', 'latency, traffic, errors and saturation', 'Alert on the golden signals.'),
        W('cardinality', 'عدد القيم المختلفة لـ label', 'the number of distinct label values', 'order_id as a label explodes cardinality.')
      ],
      read: [{ t: 'Prometheus: Metric types', url: 'https://prometheus.io/docs/concepts/metric_types/', what: B('اقرا Counter وGauge وHistogram.', 'Read Counter, Gauge and Histogram.') }],
      challenge: B('ضيف مقاييس لخدمة المتجر: RED لكل route (labels محدودة)، gauge لطول طابور الفواتير، counter للطلبات المدفوعة لكل بوابة — وdashboard في Grafana بـ 6 لوحات، وتأكد إن /metrics مش عام.', 'Add metrics to the shop service: RED per route (limited labels), a gauge for the invoice queue length, a counter for paid orders per gateway — and a Grafana dashboard with 6 panels, making sure /metrics is not public.'),
      quiz: [
        Q(B('طول الطابور:', 'Queue length:'), [['gauge', 'a gauge'], ['counter', 'a counter'], ['log', 'a log']], 0, B('بيطلع وينزل.', 'Up and down.')),
        Q(B('p95 من:', 'p95 comes from:'), [['histogram', 'a histogram'], ['counter', 'a counter'], ['gauge', 'a gauge']], 0, B('توزيع.', 'Distribution.')),
        Q(B('order_id كـ label:', 'order_id as a label:'), [['cardinality عالي: غلط', 'high cardinality: wrong'], ['ممتاز', 'excellent'], ['إجباري', 'required']], 0, B('سلاسل.', 'Series.'))
      ] },

    { title: B('التتبع الموزّع', 'Distributed tracing'),
      goal: B('تشوف طلب واحد عبر كل الخدمات.', 'Follow one request across every service.'),
      learn: [
        L(B('Spans', 'Spans'),
          B('**distributed tracing** = طلب واحد بيتسجّل كشجرة **span** (عملية ليها بداية ونهاية وattributes): HTTP ← DB query ← نداء Odoo ← رسالة في طابور ← worker. بيوريك الوقت راح فين بالظبط حتى عبر خدمات مختلفة. المثال tracer صغير بـ context manager.', '**distributed tracing** = one request recorded as a tree of **span** entries (an operation with a start, an end and attributes): HTTP → DB query → Odoo call → queue message → worker. It shows exactly where time went, even across services. The example is a tiny tracer with a context manager.'),
          'import time, contextvars\nfrom contextlib import contextmanager\n\ncurrent = contextvars.ContextVar("span", default=None)\nfinished = []\n\n@contextmanager\ndef span(name, **attrs):\n    parent = current.get()\n    s = {"name": name, "parent": parent["name"] if parent else None, "depth": parent["depth"] + 1 if parent else 0, "attrs": attrs}\n    token = current.set(s); t0 = time.perf_counter()\n    try:\n        yield s\n    finally:\n        s["ms"] = (time.perf_counter() - t0) * 1000\n        current.reset(token); finished.append(s)\n\ndef busy(ms):\n    end = time.perf_counter() + ms / 1000\n    while time.perf_counter() < end: pass\n\nwith span("POST /webhooks/order", order_id=1042):\n    with span("validate"): busy(2)\n    with span("db.insert order"): busy(8)\n    with span("odoo.create_invoice", attempt=1): busy(40)\n    with span("queue.publish", queue="notify"): busy(3)\n\nfor s in sorted(finished, key=lambda s: s["depth"]):\n    print(f"{\'  \' * s[\'depth\']}{s[\'name\']:<26} {s[\'ms\']:6.1f} ms {s[\'attrs\'] or \'\'}")', R),
        L(B('OpenTelemetry', 'OpenTelemetry'),
          B('**opentelemetry** = المعيار المفتوح للتتبع والمقاييس واللوج. **instrumentation** تلقائي لـ FastAPI وhttpx وSQLAlchemy من غير ما تعدّل الكود تقريبًا، و**exporter** بيبعت لـ Jaeger أو Tempo أو أي خدمة. السياق بيتنقل بين الخدمات في header `traceparent` (**trace context**) — حتى n8n بيقدر يمرّره.', '**opentelemetry** = the open standard for traces, metrics and logs. Automatic **instrumentation** for FastAPI, httpx and SQLAlchemy with almost no code changes, and an **exporter** sends data to Jaeger, Tempo or any service. Context travels between services in the `traceparent` header (**trace context**) — even n8n can pass it along.'),
          '# pip install opentelemetry-distro opentelemetry-exporter-otlp\n# opentelemetry-bootstrap -a install          # installs instrumentations for the libraries you use\n#\n# run with auto-instrumentation, no code changes:\nOTEL_SERVICE_NAME=shop-api \\\nOTEL_EXPORTER_OTLP_ENDPOINT=http://tempo:4317 \\\nOTEL_TRACES_SAMPLER=parentbased_traceidratio OTEL_TRACES_SAMPLER_ARG=0.2 \\\nopentelemetry-instrument uvicorn shop.api:app --host 0.0.0.0\n\n# a custom span around business logic:\nfrom opentelemetry import trace\ntracer = trace.get_tracer("shop")\nwith tracer.start_as_current_span("decide_refund") as s:\n    s.set_attribute("order.id", 1042)\n    kind, amount = decide_refund(total, days, damaged)', T),
        L(B('trace context', 'Trace context'),
          B('الـ header `traceparent` فيه: نسخة، trace id (32 hex)، span id (16 hex)، وflags (sampled؟). كل خدمة بتقراه وتعمل span ابن، فالطلب كله بيتجمع في trace واحدة. و**sampling**: مش لازم تخزّن كل trace — 10–20% كفاية، والأخطاء دايمًا.', 'The `traceparent` header holds: a version, a trace id (32 hex), a span id (16 hex) and flags (sampled?). Each service reads it and creates a child span, so the whole request gathers into one trace. And sampling: you need not store every trace — 10–20% is enough, errors always.'),
          'import re, secrets\n\ndef new_traceparent(sampled=True):\n    return f"00-{secrets.token_hex(16)}-{secrets.token_hex(8)}-{\'01\' if sampled else \'00\'}"\n\ndef child_of(header):\n    m = re.fullmatch(r"00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})", header)\n    if not m:\n        return new_traceparent()                     # invalid → start a new trace\n    trace_id, parent_span, flags = m.groups()\n    return f"00-{trace_id}-{secrets.token_hex(8)}-{flags}"\n\nincoming = new_traceparent()\noutgoing = child_of(incoming)                         # send this to Odoo / n8n\nprint("incoming:", incoming)\nprint("outgoing:", outgoing)\nprint("same trace:", incoming.split("-")[1] == outgoing.split("-")[1])', R)
      ],
      practice: [
        B('شغّل الـ tracer الصغير وضيف span متداخل.', 'Run the tiny tracer and add a nested span.'),
        B('شغّل opentelemetry-instrument على API عندك.', 'Run opentelemetry-instrument on one of your APIs.'),
        B('شوف trace في Jaeger أو Grafana Tempo.', 'View a trace in Jaeger or Grafana Tempo.'),
        B('مرّر traceparent لنداء httpx.', 'Pass traceparent to an httpx call.')
      ],
      words: [
        W('distributed tracing', 'تتبع الطلب عبر الخدمات', 'following a request across services', 'Distributed tracing showed Odoo took 3 s.'),
        W('span', 'عملية واحدة في الـ trace', 'one timed operation in a trace', 'Each DB query is a span.'),
        W('opentelemetry', 'المعيار المفتوح للمراقبة', 'the open observability standard', 'OpenTelemetry exports to Tempo.'),
        W('instrumentation', 'إضافة القياس للكود', 'adding telemetry to code', 'Auto-instrumentation covers FastAPI and httpx.'),
        W('exporter', 'جزء بيبعت البيانات لخدمة', 'the component sending telemetry out', 'The OTLP exporter sends to the collector.'),
        W('trace context', 'سياق التتبع بين الخدمات', 'trace ids passed between services', 'Trace context travels in traceparent.'),
        W('traceparent', 'header سياق التتبع', 'the W3C header carrying trace context', 'n8n forwards the traceparent header.')
      ],
      read: [{ t: 'OpenTelemetry Python', url: 'https://opentelemetry.io/docs/languages/python/', what: B('اقرا Getting Started وAutomatic instrumentation.', 'Read Getting Started and Automatic instrumentation.') }],
      challenge: B('ضيف تتبع موزّع لخدمة المتجر: auto-instrumentation لـ FastAPI وhttpx وقاعدة البيانات، spans مخصصة لقرارات البيزنس، traceparent بيتمرر للـ workers عبر الطابور ولـ n8n، sampling 20% والأخطاء كلها — ولاقي أبطأ خطوة في طلب حقيقي.', 'Add distributed tracing to the shop service: auto-instrumentation for FastAPI, httpx and the database, custom spans for business decisions, traceparent passed to workers via the queue and to n8n, 20% sampling plus all errors — and find the slowest step of a real request.'),
      quiz: [
        Q(B('span:', 'A span:'), [['عملية ليها بداية ونهاية', 'an operation with a start and end'], ['ملف لوج', 'a log file'], ['مقياس', 'a metric']], 0, B('وقت.', 'Timing.')),
        Q(B('traceparent بيوصّل:', 'traceparent carries:'), [['trace id وspan id بين الخدمات', 'the trace id and span id between services'], ['كلمة السر', 'the password'], ['اللوج', 'the logs']], 0, B('سياق.', 'Context.')),
        Q(B('تخزين كل trace:', 'Storing every trace:'), [['مش لازم: sampling والأخطاء كلها', 'not needed: sample, keep all errors'], ['إجباري', 'required'], ['ممنوع', 'forbidden']], 0, B('تكلفة.', 'Cost.'))
      ] },

    { title: B('SLOs والتنبيهات', 'SLOs and alerts'),
      goal: B('تنبيهات قليلة ومهمة.', 'Few alerts that matter.'),
      learn: [
        L(B('SLI وSLO', 'SLI and SLO'),
          B('**sli** = مقياس من وجهة نظر المستخدم («نسبة الطلبات اللي اتعالجت في أقل من 5 دقايق»). **slo** = الهدف («99% في 30 يوم»). والفرق لـ 100% = **error budget**: 1% فشل مسموح. لو الميزانية بتخلص بسرعة، ركّز على الاعتمادية بدل ميزات جديدة.', 'An **sli** = a metric from the user’s view («the share of orders processed within 5 minutes»). An **slo** = the target («99% over 30 days»). The gap to 100% = the **error budget**: 1% failure allowed. If the budget is burning fast, focus on reliability instead of new features.'),
          'slo = 0.99\nwindow_orders = 30_000                 # orders in the 30-day window so far\nfailed_or_late = 210\nbudget = (1 - slo) * window_orders     # failures we may «spend»\nused = failed_or_late / budget\nprint(f"SLI: {(1 - failed_or_late / window_orders):.2%}  (target {slo:.0%})")\nprint(f"error budget: {budget:.0f} orders, used {failed_or_late} = {used:.0%}")\nprint("→ freeze risky releases, fix reliability" if used > 0.75 else "→ ok to ship features")', R),
        L(B('التنبيه على الأعراض', 'Alerting on symptoms'),
          B('نبّه على اللي العميل حاسس بيه (**symptom-based alert**: الطلبات بتفشل، بطيئة) مش على كل سبب (CPU 80%). أحسن طريقة: **burn rate** — الميزانية بتتصرف أسرع من الطبيعي بكام مرة؟ burn rate 14× لمدة ساعة = خطر فوري (page)، 3× لمدة 6 ساعات = تذكرة. كده التنبيهات قليلة وكلها مهمة.', 'Alert on what the customer feels (a **symptom-based alert**: orders failing, slow) not on every cause (CPU at 80%). The best method: **burn rate** — how many times faster than normal is the budget being spent? A burn rate of 14× for an hour = immediate danger (page); 3× for 6 hours = a ticket. That keeps alerts few and all meaningful.'),
          'def burn_rate(error_ratio, slo):\n    return error_ratio / (1 - slo)\n\nslo = 0.99\nfor window, error_ratio in (("last 1 h", 0.15), ("last 6 h", 0.035), ("last 3 d", 0.006)):\n    br = burn_rate(error_ratio, slo)\n    action = "PAGE now" if br >= 14 else "open a ticket" if br >= 3 else "fine"\n    print(f"{window:<9} errors {error_ratio:6.1%}  burn rate {br:5.1f}×  → {action}")', R),
        L(B('فحوصات من برّه', 'Checks from outside'),
          B('**synthetic check** = سكربت من برّه بيعمل اللي العميل بيعمله كل دقيقة (يفتح الصفحة، يعمل طلب تجربة). و**heartbeat** / **dead man’s switch** للمهام المجدولة: المهمة بتبعت «أنا اشتغلت» بعد ما تخلص؛ لو مجاش في الميعاد = تنبيه. ده بيمسك الـ cron اللي بطّل يشتغل بصمت — أخطر عطل في الأتمتة.', 'A **synthetic check** = a script from outside doing what a customer does every minute (open the page, place a test order). And a **heartbeat** / **dead man’s switch** for scheduled jobs: the job pings «I ran» when it finishes; if the ping does not arrive on time = an alert. This catches the cron that silently stopped — the most dangerous failure in automation.'),
          'from datetime import datetime, timedelta\n\njobs = {   # job: (expected every, last heartbeat)\n    "daily_report":     (timedelta(days=1),     datetime(2026, 10, 4, 4, 2)),\n    "sync_odoo":        (timedelta(minutes=15), datetime(2026, 10, 4, 9, 31)),\n    "backup_postgres":  (timedelta(days=1),     datetime(2026, 10, 2, 2, 0)),\n    "price_watcher":    (timedelta(hours=1),    datetime(2026, 10, 4, 8, 58)),\n}\nnow = datetime(2026, 10, 4, 9, 40)\ngrace = 0.25                                      # allow 25% lateness\nfor name, (every, last) in jobs.items():\n    late = now - last - every\n    status = "ALERT: missed" if late > every * grace else "ok"\n    print(f"{name:<16} last {last:%m-%d %H:%M}  {status}")', R)
      ],
      practice: [
        B('اكتب SLI وSLO لأهم workflow عندك.', 'Write an SLI and SLO for your most important workflow.'),
        B('احسب error budget للشهر.', 'Compute this month’s error budget.'),
        B('بدّل تنبيهات أسباب بتنبيهات burn rate.', 'Replace cause alerts with burn-rate alerts.'),
        B('ضيف heartbeat لكل cron عندك.', 'Add a heartbeat to every cron job you run.')
      ],
      words: [
        W('sli', 'مقياس مستوى الخدمة', 'a service level indicator', 'Our SLI is orders processed within 5 minutes.'),
        W('slo', 'هدف مستوى الخدمة', 'a service level objective', 'The SLO is 99% over 30 days.'),
        W('error budget', 'ميزانية الأخطاء المسموحة', 'the failure allowed by an SLO', 'We spent 80% of the error budget.'),
        W('burn rate', 'سرعة صرف ميزانية الأخطاء', 'how fast the error budget is used', 'A 14× burn rate pages on-call.'),
        W('symptom-based alert', 'تنبيه على اللي المستخدم حاسس بيه', 'an alert on user-visible problems', 'Prefer a symptom-based alert to a CPU alert.'),
        W('synthetic check', 'فحص بيقلّد المستخدم من برّه', 'an automated user-like check from outside', 'A synthetic check places a test order hourly.'),
        W('heartbeat', 'إشارة «أنا اشتغلت»', 'a regular «I am alive» signal', 'The backup job sends a heartbeat.'),
        W('dead man’s switch', 'تنبيه لما الإشارة متجيش', 'an alert fired when a signal stops', 'A dead man’s switch caught the stopped cron.')
      ],
      read: [{ t: 'Google SRE Workbook: Alerting on SLOs', url: 'https://sre.google/workbook/alerting-on-slos/', what: B('اقرا جزء Burn rate.', 'Read the burn-rate part.') }],
      challenge: B('اعمل نظام تنبيه لخدمة المتجر: 2 SLOs (معالجة الطلبات وزمن الـ API)، تنبيهات burn rate (page وticket)، synthetic check كل 5 دقايق، heartbeat لكل مهمة مجدولة، وصفحة حالة بسيطة — وشيل أي تنبيه مبيتصرفش عليه حد.', 'Build alerting for the shop service: 2 SLOs (order processing and API latency), burn-rate alerts (page and ticket), a synthetic check every 5 minutes, a heartbeat for every scheduled job, and a simple status page — and delete any alert nobody acts on.'),
      quiz: [
        Q(B('error budget لـ SLO 99.5%:', 'The error budget for a 99.5% SLO:'), [['0.5% فشل مسموح', '0.5% failure allowed'], ['99.5%', '99.5%'], ['صفر', 'zero']], 0, B('الفرق.', 'The gap.')),
        Q(B('تنبيه CPU 80% بالليل:', 'A CPU-80% alert at night:'), [['سبب مش عرض: غالبًا متصحّيش حد', 'a cause, not a symptom: usually don’t page'], ['page فورًا', 'page at once'], ['أهم تنبيه', 'the most important alert']], 0, B('أعراض.', 'Symptoms.')),
        Q(B('cron بطّل يشتغل بصمت:', 'A cron silently stopped:'), [['heartbeat / dead man’s switch', 'a heartbeat / dead man’s switch'], ['اللوج بس', 'just logs'], ['مستحيل يتكشف', 'undetectable']], 0, B('إشارة.', 'A signal.'))
      ] },

    { title: B('الحوادث والصيانة', 'Incidents and maintenance'),
      goal: B('نظام بيفضل صحي سنين.', 'A system that stays healthy for years.'),
      learn: [
        L(B('الحادثة والـ postmortem', 'The incident and the postmortem'),
          B('**incident**: أعلن، عيّن مسؤول، احتوي الأثر الأول (rollback، إيقاف workflow)، بلّغ العملاء، وبعدين صلّح. وقيس **mttr** (متوسط زمن الإصلاح). وبعدها **postmortem** **blameless**: إيه اللي حصل بالترتيب الزمني، ليه النظام سمح بيه (مش «مين غلط»)، وإجراءات بمسؤولين ومواعيد. و**error tracking** (Sentry) بيجمّع الأخطاء المتشابهة ويوريك الجديد.', 'An **incident**: declare it, assign a lead, contain the impact first (rollback, pause a workflow), inform customers, then fix. Measure **mttr** (mean time to recovery). Afterwards a **blameless** **postmortem**: what happened in timeline order, why the system allowed it (not «who erred»), and actions with owners and dates. And **error tracking** (Sentry) groups similar errors and shows what is new.'),
          'Postmortem — 2026-10-03 — invoices not created for 2 h 10 min (blameless)\nimpact     412 orders without invoices; 0 lost (all replayed); 3 customer tickets\ntimeline   09:14 Odoo added tax code VAT-0 · 09:20 first failures · 10:55 DLQ alert · 11:24 fix + replay\nroot cause unknown tax codes raised an exception that the worker retried, then dead-lettered\nwhy so long the DLQ alert had a 90-minute delay; no alert on invoice SLI\nactions    1. alert on invoice-processing burn rate (Omar, 10-10)\n           2. map unknown tax codes to «review» instead of failing (Laila, 10-08)\n           3. DLQ alert delay → 5 min (Omar, 10-06)\nMTTR       2 h 10 min → target < 30 min', T),
        L(B('نسخ Python والمكتبات', 'Python and library versions'),
          B('كل نسخة Python ليها **end of life** (EOL): بعدها مفيش تحديثات أمان. Python 3.10 بتوصل نهاية دعمها في أكتوبر 2026. خطّط **python upgrade** كل سنة لسنتين، و**dependency updates** شهريًا بالاختبارات، وماتسيبش مكتبة مهجورة. المثال بيفحص النسخ بتواريخ الدعم الرسمية.', 'Every Python version has an **end of life** (EOL): after it, no security updates. Python 3.10 reaches its end of support in October 2026. Plan a **python upgrade** every one or two years, **dependency updates** monthly with tests, and never keep an abandoned library. The example checks versions against the official support dates.'),
          'from datetime import date\n\nEOL = {"3.9": date(2025, 10, 31), "3.10": date(2026, 10, 31), "3.11": date(2027, 10, 31),\n       "3.12": date(2028, 10, 31), "3.13": date(2029, 10, 31), "3.14": date(2030, 10, 31)}\nservices = {"shop-api": "3.13", "invoice-worker": "3.11", "legacy-reports": "3.10", "old-scraper": "3.9"}\ntoday = date(2026, 10, 4)\nfor name, v in services.items():\n    days = (EOL[v] - today).days\n    status = "END OF LIFE — upgrade now" if days < 0 else f"{days} days left" + (" → plan the upgrade" if days < 365 else "")\n    print(f"{name:<15} Python {v:<5} {status}")', R),
        L(B('الديون التقنية', 'Technical debt'),
          B('**technical debt** = اختصارات أخدتها وهتدفع تمنها بعدين (كود مكرر، اختبارات ناقصة، مكتبة قديمة). متخبيهاش: **tech debt register** فيه البند، الأثر، التكلفة التقريبية، والأولوية — وخصص 15–20% من كل شهر ليه. و**deprecation**: لما تشيل ميزة أو endpoint، أعلن بميعاد وبديل ولوج لمين لسه بيستخدمها. وتقرير صحة شهري (**health report**) للعميل.', '**technical debt** = shortcuts you took and will pay for later (duplicated code, missing tests, an old library). Do not hide it: a **tech debt register** with the item, impact, rough cost and priority — and reserve 15–20% of each month for it. And **deprecation**: when removing a feature or endpoint, announce it with a date and an alternative, and log who still uses it. Plus a monthly **health report** for the client.'),
          'tech debt register\nitem                               impact                       effort  priority\nlegacy-reports on Python 3.10      no security fixes after Oct   2 d     HIGH\nno tests for refund rounding        money bugs possible           1 d     HIGH\n/v1/orders still used by 2 clients  double maintenance           3 d     MED  (deprecated, removal 2027-01-31)\nduplicated Arabic normalisation     fixes needed in 4 places      0.5 d   LOW\n\nmonthly health report: SLOs met? incidents, MTTR, error budget left, dependencies updated, debt paid this month', T)
      ],
      practice: [
        B('اكتب postmortem blameless لمشكلة حصلتلك.', 'Write a blameless postmortem for a problem you had.'),
        B('افحص نسخ Python في كل خدماتك.', 'Check the Python versions of all your services.'),
        B('اعمل tech debt register بـ 5 بنود.', 'Create a tech debt register with 5 items.'),
        B('ضيف Sentry (أو مثيله) لخدمة واحدة.', 'Add Sentry (or similar) to one service.')
      ],
      words: [
        W('incident', 'حادثة / عطل مؤثر', 'an event disrupting service', 'Declare an incident when orders fail.'),
        W('postmortem', 'تحليل ما بعد الحادثة', 'a written review after an incident', 'The postmortem listed three actions.'),
        W('blameless', 'من غير لوم أشخاص', 'focused on systems, not blaming people', 'Blameless reviews make people honest.'),
        W('mttr', 'متوسط زمن الإصلاح', 'mean time to recovery', 'MTTR fell to 25 minutes.'),
        W('error tracking', 'تتبع وتجميع الأخطاء', 'collecting and grouping errors', 'Error tracking showed a new exception.'),
        W('end of life', 'نهاية الدعم', 'the date support stops', 'Python 3.10 reaches end of life in October 2026.'),
        W('python upgrade', 'ترقية نسخة Python', 'moving a service to a newer Python', 'Schedule the Python upgrade for Q4.'),
        W('dependency updates', 'تحديث المكتبات', 'updating third-party packages', 'Dependency updates run monthly.'),
        W('technical debt', 'الديون التقنية', 'the cost of past shortcuts', 'Pay technical debt every month.'),
        W('tech debt register', 'سجل الديون التقنية', 'a list of known technical debt', 'The tech debt register has 12 items.'),
        W('deprecation', 'إعلان إيقاف ميزة لاحقًا', 'announcing a feature’s future removal', 'The deprecation notice gives three months.'),
        W('health report', 'تقرير صحة النظام', 'a periodic summary of system health', 'Clients get a monthly health report.')
      ],
      read: [{ t: 'Python release status', url: 'https://devguide.python.org/versions/', what: B('اقرا جدول النسخ.', 'Read the versions table.') }],
      challenge: B('اعمل «خطة صيانة سنوية» لخدماتك: فحص نسخ Python وخطة ترقية (خصوصًا 3.10)، سياسة تحديث مكتبات، tech debt register، قالب postmortem وتمرين حادثة تمثيلي بقياس MTTR، وأول health report شهري لعميل.', 'Build a «yearly maintenance plan» for your services: a Python version check and upgrade plan (especially 3.10), a dependency update policy, a tech debt register, a postmortem template and a simulated incident drill measuring MTTR, and the first monthly health report for a client.'),
      quiz: [
        Q(B('أول خطوة في الحادثة:', 'The first step in an incident:'), [['احتوي الأثر', 'contain the impact'], ['دوّر على المذنب', 'find who to blame'], ['اكتب postmortem', 'write the postmortem']], 0, B('احتواء.', 'Containment.')),
        Q(B('Python بعد EOL:', 'Python after EOL:'), [['مفيش تحديثات أمان', 'no security updates'], ['أسرع', 'faster'], ['مجاني أكتر', 'freer']], 0, B('ترقية.', 'Upgrade.')),
        Q(B('الديون التقنية:', 'Technical debt:'), [['سجّلها وادفع جزء كل شهر', 'record it and pay some monthly'], ['اخفيها', 'hide it'], ['تجاهلها للأبد', 'ignore it forever']], 0, B('سجل.', 'A register.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('أنظمة بتتراقب وبتتصان باحتراف.', 'Systems monitored and maintained professionally.'),
      review: [
        B('لوج JSON وcorrelation id وcontextvars والاحتفاظ.', 'JSON logs, correlation ids, contextvars and retention.'),
        B('counter وgauge وhistogram وRED وcardinality.', 'Counters, gauges, histograms, RED and cardinality.'),
        B('spans وOpenTelemetry وtraceparent والـ sampling.', 'Spans, OpenTelemetry, traceparent and sampling.'),
        B('SLI وSLO وerror budget وburn rate وheartbeats.', 'SLIs, SLOs, error budgets, burn rates and heartbeats.'),
        B('الحوادث والـ postmortems ونسخ Python والديون التقنية.', 'Incidents, postmortems, Python versions and technical debt.')
      ],
      project: B('مشروع الأسبوع «غرفة تحكم خدمة المتجر»: لوج JSON بـ correlation id من الـ API للـ workers لـ n8n، مقاييس RED وبيزنس على /metrics وdashboard في Grafana، تتبع OpenTelemetry بـ sampling، SLOs بتنبيهات burn rate، synthetic check وheartbeats لكل cron، Sentry للأخطاء، تمرين حادثة بـ postmortem blameless، وخطة صيانة (نسخ Python، مكتبات، ديون) — مع health report أول شهر.', 'Week project «shop service control room»: JSON logs with a correlation id from the API to workers to n8n, RED and business metrics on /metrics with a Grafana dashboard, OpenTelemetry tracing with sampling, SLOs with burn-rate alerts, a synthetic check and heartbeats for every cron, Sentry for errors, an incident drill with a blameless postmortem, and a maintenance plan (Python versions, libraries, debt) — with the first month’s health report.'),
      test: [
        Q(B('observability:', 'Observability:'), [['تجاوب أسئلة جديدة من بيانات النظام', 'answering new questions from system data'], ['شاشة كبيرة', 'a big screen'], ['اختبار وحدة', 'a unit test']], 0, B('فهم.', 'Understanding.')),
        Q(B('correlation id:', 'A correlation id:'), [['يربط كل لوج طلب واحد', 'links all logs of one request'], ['رقم الإصدار', 'the version number'], ['كلمة سر', 'a password']], 0, B('ربط.', 'Linking.')),
        Q(B('counter:', 'A counter:'), [['بيزيد بس', 'only goes up'], ['بيطلع وينزل', 'goes up and down'], ['توزيع', 'a distribution']], 0, B('تراكمي.', 'Cumulative.')),
        Q(B('RED:', 'RED:'), [['Rate وErrors وDuration', 'Rate, Errors, Duration'], ['Red, Green', 'Red, Green'], ['Read, Edit, Delete', 'Read, Edit, Delete']], 0, B('خدمة.', 'Per service.')),
        Q(B('cardinality عالي بييجي من:', 'High cardinality comes from:'), [['labels بقيم كتير زي order_id', 'labels with many values like order_id'], ['labels قليلة', 'few labels'], ['counters', 'counters']], 0, B('سلاسل.', 'Series.')),
        Q(B('span في trace:', 'A span in a trace:'), [['عملية بوقتها وattributes', 'an operation with timing and attributes'], ['سطر CSS', 'a CSS line'], ['تنبيه', 'an alert']], 0, B('شجرة.', 'Tree.')),
        Q(B('auto-instrumentation:', 'Auto-instrumentation:'), [['قياس من غير تعديل كود تقريبًا', 'telemetry with almost no code changes'], ['اختبار تلقائي', 'automatic tests'], ['نشر', 'deployment']], 0, B('OpenTelemetry.', 'OpenTelemetry.')),
        Q(B('SLO:', 'An SLO:'), [['هدف مستوى الخدمة', 'a service level target'], ['عقد قانوني', 'a legal contract'], ['مقياس CPU', 'a CPU metric']], 0, B('هدف.', 'Target.')),
        Q(B('burn rate 14× لساعة:', 'A 14× burn rate for an hour:'), [['page فوري', 'page immediately'], ['تجاهل', 'ignore'], ['تذكرة الشهر الجاي', 'a ticket next month']], 0, B('خطر.', 'Danger.')),
        Q(B('heartbeat:', 'A heartbeat:'), [['المهمة بتبلّغ إنها اشتغلت', 'the job reports that it ran'], ['نبض العميل', 'the client’s pulse'], ['اختبار حمل', 'a load test']], 0, B('إشارة.', 'Signal.')),
        Q(B('postmortem blameless:', 'A blameless postmortem:'), [['يركز على النظام مش الأشخاص', 'focuses on the system, not people'], ['يحدد مين يتعاقب', 'decides who is punished'], ['سري', 'secret']], 0, B('تعلّم.', 'Learning.')),
        Q(B('خدمة على Python 3.10 في أكتوبر 2026:', 'A service on Python 3.10 in October 2026:'), [['خطط الترقية فورًا', 'plan the upgrade now'], ['تمام للأبد', 'fine forever'], ['انزل لـ 3.8', 'downgrade to 3.8']], 0, B('EOL.', 'EOL.'))
      ] }
  ]
};
