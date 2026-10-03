// n8n week 40 — Observability: logs, metrics, alerts and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('المراقبة: اللوج والمقاييس والتنبيهات ومشروع الشهر', 'Observability: logs, metrics, alerts and the month project'),
  goal: B('تعرف اللي بيحصل جوه n8n من غير ما تفتح الواجهة: لوج منظم بيتجمع، مقاييس Prometheus ولوحات Grafana، تنبيهات بأهداف خدمة (SLO)، تتبّع تشغيل بعينه بـ id البيزنس، والتعامل مع الحوادث — وتسلّم مشروع الشهر العاشر.',
          'Know what happens inside n8n without opening the UI: structured, collected logs, Prometheus metrics and Grafana boards, alerts based on service objectives (SLOs), tracing a specific run by its business id, and handling incidents — and deliver the tenth month’s project.'),
  days: [
    { title: B('اللوج', 'Logs'),
      goal: B('لوج منظم بيتجمع في مكان واحد.', 'Structured logs collected in one place.'),
      learn: [
        L(B('مستويات وشكل', 'Levels and format'),
          B('**observability** = تقدر تسأل «إيه اللي حصل؟» وتلاقي إجابة. أول أداة: اللوج. `N8N_LOG_LEVEL` (**log level**: error/warn/info/debug — info في الإنتاج)، و`N8N_LOG_OUTPUT=console,file`، و**json logs** (`N8N_LOG_FORMAT=json` في الإصدارات الحديثة) عشان أي أداة تقراها وتفلترها.', '**observability** = you can ask «what happened?» and find the answer. The first tool: logs. `N8N_LOG_LEVEL` (the **log level**: error/warn/info/debug — info in production), `N8N_LOG_OUTPUT=console,file`, and **json logs** (`N8N_LOG_FORMAT=json` in recent versions) so any tool can read and filter them.'),
          'N8N_LOG_LEVEL=info\nN8N_LOG_OUTPUT=console\nN8N_LOG_FORMAT=json\n# a line: {"level":"error","message":"Workflow execution failed","workflowId":"42","executionId":"81231","timestamp":"2026-10-04T07:12:03.410Z"}'),
        L(B('تجميع اللوج', 'Collecting logs'),
          B('مع 6 نسخ (main وwebhooks وworkers) مينفعش تفتح لوج كل container. **log shipping**: أداة (Promtail/Alloy، Vector، Fluent Bit) بتقرا لوج الـ containers وتبعته لمكان واحد (**loki** مع Grafana، أو Elastic، أو خدمة مُدارة). وبعدين بحث واحد: `{app="n8n"} |= "executionId\\":\\"81231"`.', 'With 6 instances (main, webhooks, workers) you cannot open each container’s log. **log shipping**: a tool (Promtail/Alloy, Vector, Fluent Bit) reads container logs and sends them to one place (**loki** with Grafana, Elastic, or a managed service). Then one search: `{app="n8n"} |= "executionId\\":\\"81231"`.'),
          'services:\n  n8n-worker:\n    logging: { driver: json-file, options: { max-size: "20m", max-file: "5" } }   # local rotation\n    labels: { app: "n8n", role: "worker" }\n  alloy:   # ships container logs to Loki\n    image: grafana/alloy:latest\n    volumes: ["/var/run/docker.sock:/var/run/docker.sock:ro", "./alloy.river:/etc/alloy/config.river"]\n# Grafana → Explore → Loki: {app="n8n", role="worker"} | json | level="error"'),
        L(B('بث الأحداث', 'Streaming events'),
          B('**log streaming** (في n8n Enterprise) بيبعت أحداث منظمة (workflow اتعدل، مستخدم سجّل دخول، تشغيل فشل، credential اتعملت) لـ webhook أو syslog أو Sentry — مفيد للتدقيق والأمان (أسبوع 41). من غير Enterprise: Error Trigger وworkflow إداري بيبعتوا أحداثك المهمة بنفسك.', '**log streaming** (in n8n Enterprise) sends structured events (a workflow edited, a user signed in, a run failed, a credential created) to a webhook, syslog or Sentry — useful for audit and security (week 41). Without Enterprise: the Error Trigger and an admin workflow send your important events yourself.'),
          'event: n8n.workflow.failed   → Sentry (with workflowId, executionId, node, error)\nevent: n8n.audit.user.login  → syslog → SIEM (security)\nevent: n8n.audit.workflow.updated → webhook → Slack #n8n-changes ("Sara edited «Invoices»")')
      ],
      practice: [
        B('فعّل json logs بـ info.', 'Enable json logs at info level.'),
        B('اعمل Loki + Grafana محلي بـ Compose.', 'Run Loki + Grafana locally with Compose.'),
        B('دوّر على execution واحد في اللوج المجمّع.', 'Search one execution in the collected logs.'),
        B('اعمل workflow بيبعت «حد عدّل workflow» لـ Slack.', 'Build a workflow posting «someone edited a workflow» to Slack.')
      ],
      words: [
        W('observability', 'القدرة تفهم اللي بيحصل جوه النظام', 'being able to understand what happens inside a system', 'Observability starts with good logs.'),
        W('log level', 'مستوى تفصيل اللوج', 'how detailed the logs are', 'Use log level info in production.'),
        W('json logs', 'لوج بصيغة JSON منظمة', 'logs in structured JSON', 'JSON logs are easy to filter.'),
        W('log shipping', 'نقل اللوج لمكان مركزي', 'moving logs to a central place', 'Log shipping sends worker logs to Loki.'),
        W('loki', 'نظام تخزين وبحث لوج مع Grafana', 'a log store and search system with Grafana', 'Search errors in Loki.'),
        W('log streaming', 'بث أحداث n8n المنظمة لأنظمة تانية', 'sending n8n’s structured events elsewhere', 'Log streaming feeds the SIEM.')
      ],
      read: [{ t: 'n8n Docs: Logging', url: 'https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/set-up-logging', what: B('اقرا Setup.', 'Read Setup.') }, { t: 'n8n Docs: Log streaming', url: 'https://docs.n8n.io/administer/observe-and-log/stream-logs-to-external-systems', what: B('اقرا Events.', 'Read Events.') }],
      challenge: B('اعمل تجميع لوج لـ n8n في queue mode: json logs، rotation محلي، Alloy/Promtail ← Loki، ولوحة Grafana فيها «آخر 50 خطأ» وبحث بالـ executionId.', 'Set up log collection for n8n in queue mode: json logs, local rotation, Alloy/Promtail → Loki, and a Grafana board with «the last 50 errors» and search by executionId.'),
      quiz: [
        Q(B('مستوى اللوج في الإنتاج:', 'The log level in production:'), [['info', 'info'], ['debug دايمًا', 'always debug'], ['من غير لوج', 'no logs']], 0, B('توازن.', 'Balance.')),
        Q(B('6 containers ولوج كل واحد:', '6 containers, each with logs:'), [['log shipping لمكان واحد', 'log shipping to one place'], ['افتحهم واحد واحد', 'open them one by one'], ['امسحهم', 'delete them']], 0, B('مركزي.', 'Central.')),
        Q(B('json logs ميزتها:', 'The advantage of json logs:'), [['أي أداة تفلترها', 'any tool can filter them'], ['أجمل', 'prettier'], ['أصغر دايمًا', 'always smaller']], 0, B('منظم.', 'Structured.'))
      ] },

    { title: B('المقاييس واللوحات', 'Metrics and boards'),
      goal: B('أرقام بتقولك الحالة في نظرة.', 'Numbers that tell you the state at a glance.'),
      learn: [
        L(B('/metrics', '/metrics'),
          B('`N8N_METRICS=true` بيفتح **metrics endpoint** `/metrics` بصيغة **prometheus**: عدد التشغيلات ونتيجتها، طول الطابور، الـ CPU والذاكرة، وطلبات API. فعّل معاه `N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL` و`…_QUEUE_METRICS`. واحمي الـ endpoint (شبكة داخلية أو auth) — مينفعش يبقى عام.', '`N8N_METRICS=true` opens a **metrics endpoint** `/metrics` in **prometheus** format: execution counts and results, queue length, CPU and memory, API requests. Enable `N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL` and `…_QUEUE_METRICS` too. And protect the endpoint (an internal network or auth) — it must not be public.'),
          'N8N_METRICS=true\nN8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL=true\nN8N_METRICS_INCLUDE_QUEUE_METRICS=true\n# prometheus.yml\nscrape_configs:\n  - job_name: n8n\n    scrape_interval: 15s\n    static_configs: [{ targets: ["n8n-main:5678", "n8n-worker-1:5678", "n8n-worker-2:5678"] }]'),
        L(B('اللوحة', 'The board'),
          B('لوحة **grafana** فيها أهم 6 أرقام: تشغيلات/دقيقة، نسبة الفشل، p95 مدة التشغيل لأهم workflows، طول الطابور، CPU/RAM لكل جزء، وحجم القاعدة. كل **dashboard panel** ليه سؤال واضح بيجاوبه — مش 40 رسم محدش فاهمهم.', 'A **grafana** board with the 6 key numbers: executions/minute, failure rate, p95 run duration for key workflows, queue length, CPU/RAM per part, and database size. Each **dashboard panel** answers one clear question — not 40 charts nobody understands.'),
          'panel "Failure rate (5 min)":   sum(rate(n8n_workflow_failed_total[5m])) / sum(rate(n8n_workflow_executions_total[5m]))\npanel "Queue waiting":           n8n_scaling_mode_queue_jobs_waiting\npanel "Worker memory":           process_resident_memory_bytes{job="n8n", role="worker"}\n(metric names vary by version — check /metrics on yours)'),
        L(B('مقاييس البيزنس', 'Business metrics'),
          B('المقاييس التقنية مش كفاية: العميل يهمه «كام فاتورة اتبعتت؟ كام طلب اتأخر؟ كام عميل محتمل جالنا؟». workflow بيكتب أرقام البيزنس كل ساعة (Data Table أو Postgres أو Pushgateway) واللوحة تعرضها جنب التقنية. ده اللي بيخلّي العميل يشوف قيمة الأتمتة.', 'Technical metrics are not enough: the client cares about «how many invoices went out? how many orders were late? how many leads arrived?». A workflow writes business numbers hourly (a Data Table, Postgres or a Pushgateway) and the board shows them beside the technical ones. That is what lets the client see the automation’s value.'),
          'hourly workflow → INSERT INTO kpi (hour, invoices_sent, orders_late, leads_new, ai_cost_usd)\nGrafana panel (Postgres datasource): SELECT hour AS time, invoices_sent FROM kpi WHERE $__timeFilter(hour)\nweekly email to the client: "this week: 1,240 invoices sent automatically · 0 late · 37 h of staff time saved"')
      ],
      practice: [
        B('فعّل /metrics واتفرّج على الأرقام.', 'Enable /metrics and look at the numbers.'),
        B('اعمل Prometheus يقرا كل النسخ.', 'Make Prometheus scrape every instance.'),
        B('اعمل لوحة Grafana بـ 6 panels.', 'Build a Grafana board with 6 panels.'),
        B('ضيف panel لرقم بيزنس.', 'Add a panel with a business number.')
      ],
      words: [
        W('metrics endpoint', 'رابط بيطلّع المقاييس', 'a URL exposing metrics', 'Keep the metrics endpoint internal.'),
        W('prometheus', 'نظام جمع مقاييس بالوقت', 'a time-series metrics system', 'Prometheus scrapes n8n every 15 s.'),
        W('grafana', 'أداة لوحات ومراقبة', 'a dashboard and monitoring tool', 'Grafana shows the failure rate.'),
        W('dashboard panel', 'رسم واحد في لوحة', 'one chart on a board', 'Each dashboard panel answers one question.'),
        W('business metric', 'رقم بيقيس نتيجة للعميل', 'a number measuring a result for the client', 'Invoices sent is a business metric.')
      ],
      read: [{ t: 'n8n Docs: Enable Prometheus metrics', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/configuration-examples/enable-prometheus-metrics', what: B('اقرا الإعدادات.', 'Read the settings.') }, { t: 'Grafana: Dashboards best practices', url: 'https://grafana.com/docs/grafana/latest/visualizations/dashboards/build-dashboards/best-practices/', what: B('اقرا Strategies.', 'Read Strategies.') }],
      challenge: B('اعمل لوحة «صحة الأتمتة» لعميل: 4 panels تقنية (تشغيلات، فشل، طابور، ذاكرة) و3 بيزنس (فواتير، متأخر، وقت اتوفر) — وتقرير أسبوعي آلي بالإيميل من نفس الأرقام.', 'Build an «automation health» board for a client: 4 technical panels (runs, failures, queue, memory) and 3 business ones (invoices, late orders, time saved) — and an automatic weekly email report from the same numbers.'),
      quiz: [
        Q(B('/metrics مكانه:', '/metrics should be:'), [['داخلي أو محمي', 'internal or protected'], ['عام', 'public'], ['في README', 'in the README']], 0, B('معلومات حساسة.', 'Sensitive data.')),
        Q(B('لوحة كويسة:', 'A good board:'), [['أرقام قليلة كل واحد بيجاوب سؤال', 'few numbers, each answering a question'], ['40 رسم', '40 charts'], ['ألوان كتير', 'many colours']], 0, B('وضوح.', 'Clarity.')),
        Q(B('العميل يهمه:', 'The client cares about:'), [['أرقام البيزنس', 'business numbers'], ['CPU بس', 'only CPU'], ['اسم السيرفر', 'the server name']], 0, B('القيمة.', 'Value.'))
      ] },

    { title: B('التنبيهات وأهداف الخدمة', 'Alerts and service objectives'),
      goal: B('تتنبه للي يهم بس، قبل العميل.', 'Get alerted only to what matters, before the client.'),
      learn: [
        L(B('SLO', 'SLOs'),
          B('**slo** = هدف خدمة متفق عليه: «99% من الفواتير بتتبعت خلال 10 دقايق من الدفع». **error budget** = المسموح يفشل (1%) — طول ما الميزانية فاضل فيها، اشتغل على مميزات؛ لو خلصت، ركّز على الثبات. ده بيحوّل «كل حاجة لازم تبقى مثالية» لرقم عملي.', 'An **slo** = an agreed service objective: «99% of invoices are sent within 10 minutes of payment». The **error budget** = what may fail (1%) — while budget remains, work on features; when it is spent, focus on stability. It turns «everything must be perfect» into a practical number.'),
          'SLO "invoice sent ≤ 10 min after payment" ≥ 99% per 30 days\nmonthly volume 30,000 → error budget = 300 late/failed invoices\nweek 1: 40 used (13%) ✓ · week 2: a CRM outage used 210 (83%) → freeze risky changes, fix retries'),
        L(B('قواعد التنبيه', 'Alert rules'),
          B('**alert rule** على أعراض المستخدم مش الأسباب: «نسبة الفشل > 5% لمدة 10 دقايق» أحسن من «CPU 80%». كل تنبيه: شدة (warning/critical)، مدة قبل ما يضرب (عشان متتنبهش من ثانية بايظة)، رسالة بالسبب المحتمل ورابط **runbook**، ومين **on-call**. والتنبيه اللي محدش بيتصرف فيه — امسحه.', 'An **alert rule** on user symptoms, not causes: «failure rate > 5% for 10 minutes» beats «CPU 80%». Every alert: a severity (warning/critical), a duration before firing (so one bad second does not page you), a message with the likely cause and a **runbook** link, and who is **on-call**. An alert nobody acts on — delete it.'),
          'groups:\n- name: n8n\n  rules:\n  - alert: N8nHighFailureRate\n    expr: sum(rate(n8n_workflow_failed_total[10m])) / sum(rate(n8n_workflow_executions_total[10m])) > 0.05\n    for: 10m\n    labels: { severity: critical }\n    annotations:\n      summary: "n8n failure rate {{ $value | humanizePercentage }}"\n      runbook: "https://wiki.example.com/n8n/high-failure-rate"\n  - alert: N8nQueueBacklog\n    expr: n8n_scaling_mode_queue_jobs_waiting > 500\n    for: 15m\n    labels: { severity: warning }'),
        L(B('من برة', 'From outside'),
          B('**uptime** من برة الشبكة: خدمة (UptimeRobot، Better Stack، Healthchecks) بتنادي `/healthz` وwebhook اختبار كل دقيقة من أكتر من بلد، وheartbeats للـ workflows المجدولة (أسبوع 17 JS). لو السيرفر كله وقع، المراقبة الداخلية وقعت معاه — اللي برة هي اللي هتقولك.', '**uptime** from outside the network: a service (UptimeRobot, Better Stack, Healthchecks) calls `/healthz` and a test webhook every minute from several countries, plus heartbeats for scheduled workflows. If the whole server dies, the internal monitoring died with it — the outside check is what tells you.'),
          'external checks\n- GET https://n8n.example.com/healthz        every 1 min · 3 regions · alert after 2 failures\n- POST /webhook/health (X-Test) → expect 200 + {"ok":true} in < 2 s\n- heartbeat: "Daily Report" pings hc.example/abc after success · alert if no ping by 07:30')
      ],
      practice: [
        B('اكتب 2 SLO لأهم workflows.', 'Write 2 SLOs for your key workflows.'),
        B('اعمل 3 alert rules بأعراض مش أسباب.', 'Write 3 alert rules on symptoms, not causes.'),
        B('اعمل مراقبة uptime من برة.', 'Set up uptime monitoring from outside.'),
        B('امسح تنبيه محدش بيتصرف فيه.', 'Delete an alert nobody acts on.')
      ],
      words: [
        W('slo', 'هدف خدمة بنسبة', 'a service objective as a percentage', 'The SLO is 99% within 10 minutes.'),
        W('error budget', 'المسموح يفشل في الفترة', 'what may fail in the period', 'We spent 83% of the error budget.'),
        W('alert rule', 'شرط بيطلق تنبيه', 'a condition firing an alert', 'The alert rule waits 10 minutes.'),
        W('alertmanager', 'أداة توجيه تنبيهات Prometheus', 'the tool routing Prometheus alerts', 'Alertmanager sends critical alerts to Telegram.'),
        W('on-call', 'الشخص المسؤول يرد على التنبيهات', 'the person responsible for answering alerts', 'Sara is on-call this week.'),
        W('uptime', 'نسبة الوقت والخدمة شغالة', 'the share of time the service works', 'Uptime was 99.95% in September.')
      ],
      read: [{ t: 'Google SRE Book: Service Level Objectives', url: 'https://sre.google/sre-book/service-level-objectives/', what: B('اقرا Indicators وObjectives.', 'Read Indicators and Objectives.') }, { t: 'n8n Docs: Monitoring', url: 'https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/monitor-n8n', what: B('اقرا healthz.', 'Read healthz.') }],
      challenge: B('اعمل «عقد مراقبة» لعميل: 2 SLO بـ error budget، 4 alert rules بـ runbooks، مراقبة uptime من برة، heartbeats للمجدول، وجدول on-call — وجرّب كل تنبيه مرة إنه بيوصل.', 'Write a «monitoring contract» for a client: 2 SLOs with error budgets, 4 alert rules with runbooks, outside uptime checks, heartbeats for scheduled work, and an on-call rota — and test that each alert actually arrives once.'),
      quiz: [
        Q(B('تنبيه أحسن:', 'A better alert:'), [['نسبة الفشل > 5% لـ 10 دقايق', 'failure rate > 5% for 10 minutes'], ['CPU > 80% ثانية', 'CPU > 80% for a second'], ['كل خطأ', 'every error']], 0, B('أعراض.', 'Symptoms.')),
        Q(B('error budget خلص:', 'The error budget is spent:'), [['ركّز على الثبات', 'focus on stability'], ['مميزات أكتر', 'more features'], ['تجاهل', 'ignore it']], 0, B('SLO.', 'SLO.')),
        Q(B('السيرفر كله وقع، مين يقولك؟', 'The whole server is down — who tells you?'), [['مراقبة من برة', 'outside monitoring'], ['Grafana على نفس السيرفر', 'Grafana on the same server'], ['محدش', 'nobody']], 0, B('uptime.', 'Uptime.'))
      ] },

    { title: B('تتبّع تشغيل بعينه', 'Tracing one specific run'),
      goal: B('«طلب العميل ده حصله إيه؟» تجاوب في دقيقة.', 'Answer «what happened to this customer’s order?» in a minute.'),
      learn: [
        L(B('id البيزنس', 'The business id'),
          B('العميل بيسأل برقم الطلب، مش بـ executionId. حط **business id** (رقم الطلب، التليفون) في كل حاجة: **custom execution data** (`$execution.customData.set("orderId", …)`) عشان تبحث بيه في قايمة الـ executions، وفي اللوج، وفي الرسايل للأنظمة التانية (header أو حقل).', 'The customer asks by order number, not executionId. Put the **business id** (order number, phone) everywhere: **custom execution data** (`$execution.customData.set("orderId", …)`) so you can search the executions list by it, in logs, and in messages to other systems (a header or field).'),
          '// Code node right after the trigger\n$execution.customData.set("orderId", String($json.order_id));\n$execution.customData.set("customer", $json.phone.slice(-4));    // last 4 digits only\nreturn $input.all();\n// Executions list → filter by custom data: orderId = 1042  → every run that touched it\n// outgoing HTTP: header X-Correlation-Id: n8n-{{$execution.id}}-1042'),
        L(B('من الشكوى للسبب', 'From complaint to cause'),
          B('خطوات ثابتة: دوّر بالـ orderId في الـ executions ← افتح التشغيل وشوف كل node دخل وطلع إيه ← «Debug in editor» بيحمّل بيانات التشغيل في المحرر تجرّب عليها ← الـ correlation id في لوج الـ CRM أو الدفع. **mttr** (وقت الحل) بيقل جدًا لما الخطوات دي سهلة.', 'Fixed steps: search the executions by orderId → open the run and see each node’s input and output → «Debug in editor» loads the run’s data into the editor to experiment → the correlation id in the CRM or payment logs. **mttr** (time to resolve) drops sharply when these steps are easy.'),
          'complaint 14:05: "order 1042 paid, no invoice"\n14:06 executions filter orderId=1042 → 2 runs: 13:51 ✓ webhook, 13:51 ✗ "Create PDF" (timeout 30 s)\n14:08 Debug in editor → PDF service returns 504 for 120 items\n14:15 retry with batching → invoice sent · 14:20 reply to customer · ticket: raise PDF timeout + split big orders'),
        L(B('خصوصية في المراقبة', 'Privacy in monitoring'),
          B('اللوج والـ custom data والـ executions المحفوظة فيها بيانات عملاء. متحطش أسماء كاملة أو تليفونات أو عناوين في اللوج والمقاييس (آخر 4 أرقام كفاية)، وحدد مدة الاحتفاظ، وصلاحيات مين يشوف الـ executions. ده مقدمة لأسبوع 42 (الخصوصية).', 'Logs, custom data and saved executions contain customer data. Do not put full names, phones or addresses in logs and metrics (the last 4 digits are enough), set retention periods, and control who can view executions. This leads into week 42 (privacy).'),
          '✓ customData: orderId, phone last 4, country\n✗ customData: full name, full phone, address, card data\n✓ metrics labels: workflow, status (never customer ids — they explode cardinality and leak data)\n✓ executions: save errors 14 days, successes "do not save" for high-volume flows')
      ],
      practice: [
        B('ضيف customData بـ orderId لأهم 3 workflows.', 'Add orderId customData to your 3 key workflows.'),
        B('ابحث عن طلب بعينه في الـ executions.', 'Search for one specific order in the executions.'),
        B('جرّب Debug in editor على تشغيل فاشل.', 'Try Debug in editor on a failed run.'),
        B('راجع اللوج والـ customData من ناحية البيانات الشخصية.', 'Review logs and customData for personal data.')
      ],
      words: [
        W('business id', 'رقم البيزنس زي رقم الطلب', 'the business number such as the order id', 'Search runs by business id.'),
        W('custom execution data', 'بيانات مخصصة بتتحفظ مع التشغيل', 'custom data saved with a run', 'Set custom execution data for the order.'),
        W('correlation header', 'header بيربط الطلب بالتشغيل', 'a header linking a request to a run', 'Send a correlation header to the CRM.'),
        W('mttr', 'متوسط وقت حل المشكلة', 'mean time to resolve', 'Custom data cut our MTTR to 15 minutes.'),
        W('cardinality', 'عدد القيم المختلفة لـ label', 'how many different values a label has', 'Customer ids explode cardinality.')
      ],
      read: [{ t: 'n8n Docs: Custom executions data', url: 'https://docs.n8n.io/build/code-in-n8n/cookbook/built-in-methods-and-variables-examples/execution', what: B('اقرا customData.', 'Read customData.') }],
      challenge: B('اعمل «دليل تتبّع» لعميل: customData في كل workflow مهم، correlation header لكل نظام خارجي، خطوات البحث من شكوى لسبب، وجرّبه على 3 شكاوى وهمية وقِس الوقت.', 'Write a «tracing guide» for a client: customData in every key workflow, a correlation header for every outside system, steps from complaint to cause — and try it on 3 mock complaints, timing each.'),
      quiz: [
        Q(B('العميل سأل عن طلب 1042:', 'A customer asks about order 1042:'), [['filter بـ customData orderId', 'filter by customData orderId'], ['اقرا كل الـ executions', 'read every execution'], ['اسأله الـ executionId', 'ask for the executionId']], 0, B('business id.', 'Business id.')),
        Q(B('تليفون العميل في اللوج:', 'A customer’s phone in logs:'), [['آخر 4 أرقام بس', 'only the last 4 digits'], ['كامل', 'in full'], ['مشفّر base64', 'base64-encoded']], 0, B('خصوصية.', 'Privacy.')),
        Q(B('customer id كـ metric label:', 'A customer id as a metric label:'), [['لأ: cardinality وتسريب', 'no: cardinality and leakage'], ['ممتاز', 'excellent'], ['إجباري', 'required']], 0, B('labels قليلة.', 'Few labels.'))
      ] },

    { title: B('الحوادث', 'Incidents'),
      goal: B('لما حاجة كبيرة تقع، تتصرف بهدوء ونظام.', 'When something big breaks, act calmly and in order.'),
      learn: [
        L(B('الشدة والأدوار', 'Severity and roles'),
          B('**incident** = حاجة بتأثر على العميل دلوقتي. حدد **severity**: SEV1 (كل الطلبات واقفة)، SEV2 (جزء مهم)، SEV3 (مزعج بس فيه بديل). في SEV1: واحد يقود، واحد يصلّح، واحد يكلّم العميل — حتى لو انتوا اتنين، افصل الأدوار.', 'An **incident** = something affecting the client right now. Set the **severity**: SEV1 (all orders stopped), SEV2 (an important part), SEV3 (annoying but with a workaround). In SEV1: one leads, one fixes, one talks to the client — even if you are two people, separate the roles.'),
          'SEV1 — all webhooks failing (Redis down)\n14:02 alert fires → 14:04 lead declared (Sara), fixer (Omar), comms (Sara)\n14:05 client message: "We are aware orders are delayed; next update 14:30"\n14:12 Redis restarted, AOF intact → 14:15 queue draining → 14:31 all caught up\n14:35 client: "Resolved at 14:31; no orders lost; summary within 48 h"'),
        L(B('التواصل', 'Communication'),
          B('العميل بيستحمل المشكلة أكتر من الصمت. رسالة أولى خلال 15 دقيقة: «عارفين، الأثر، التحديث الجاي إمتى». تحديثات منتظمة حتى لو مفيش جديد. و**status page** بسيطة (صفحة أو قناة) بتوفر عليك 20 رسالة فردية. وبعد الحل: إيه حصل، اتأثر قد إيه، وإيه اللي هيمنع تكراره.', 'Clients tolerate a problem better than silence. A first message within 15 minutes: «we know, the impact, when the next update comes». Regular updates even with no news. A simple **status page** (a page or channel) saves you 20 individual messages. And after resolution: what happened, how much was affected, and what will prevent a repeat.'),
          'first message (≤ 15 min)\n"Since 14:02 new orders are not being processed. Payments are safe and will be processed once we recover. Next update by 14:30."\nupdate\n"Cause found (queue server). Recovery in progress; backlog of ~600 orders being processed now. Next update 15:00."'),
        L(B('بعد الحادثة', 'After the incident'),
          B('**postmortem** من غير لوم (زي الإنجليزي أسبوع 32): التسلسل الزمني، السبب الجذري، اللي نجح واللي معملش، وإجراءات بأصحاب وتواريخ. والإجراءات غالبًا: تنبيه أسرع، runbook أوضح، retry أحسن، أو إزالة نقطة فشل. وشاركه مع العميل بنسخة مختصرة — بيبني ثقة.', 'A blameless **postmortem** (like English week 32): the timeline, the root cause, what worked and what did not, and actions with owners and dates. Actions are usually: a faster alert, a clearer runbook, better retries, or removing a failure point. Share a short version with the client — it builds trust.'),
          '## Postmortem — 2026-10-04 SEV1 orders delayed 29 min\nImpact: 612 orders processed 5–29 min late; none lost; 0 duplicate invoices.\nRoot cause: Redis ran out of memory (maxmemory 256 MB, eviction policy allkeys-lru) during a sale spike.\nWhat helped: AOF persistence; queue-backlog alert fired in 10 min.\nActions: noeviction + 1 GB (Omar, 10-05) · alert at 70% Redis memory (Sara, 10-06) · load test the sale scenario (Omar, 10-12)')
      ],
      practice: [
        B('اكتب جدول شدة لعملائك.', 'Write a severity table for your clients.'),
        B('اكتب قوالب رسايل الحوادث (أولى وتحديث وحل).', 'Write incident message templates (first, update, resolved).'),
        B('اعمل status page بسيطة.', 'Create a simple status page.'),
        B('اكتب postmortem لمشكلة حصلتلك قبل كده.', 'Write a postmortem for a problem you had before.')
      ],
      words: [
        W('incident', 'مشكلة بتأثر على العميل دلوقتي', 'a problem affecting the client now', 'Declare an incident when orders stop.'),
        W('severity', 'درجة خطورة الحادثة', 'how serious an incident is', 'Severity 1 means all orders stopped.'),
        W('status page', 'صفحة حالة الخدمة للعملاء', 'a service status page for clients', 'Post updates on the status page.'),
        W('postmortem', 'تقرير بعد الحادثة من غير لوم', 'a blameless report after an incident', 'The postmortem lists three actions.'),
        W('root cause', 'السبب الأساسي للمشكلة', 'the underlying cause of a problem', 'The root cause was Redis memory.')
      ],
      read: [{ t: 'Atlassian: Incident management handbook', url: 'https://www.atlassian.com/incident-management/handbook', what: B('اقرا Incident response.', 'Read Incident response.') }, { t: 'Google SRE Book: Postmortem culture', url: 'https://sre.google/sre-book/postmortem-culture/', what: B('اقرا الفكرة.', 'Read the idea.') }],
      challenge: B('اعمل «دليل حوادث» لوكالتك: جدول شدة، أدوار، قوالب رسايل، status page، قالب postmortem — وجرّبه في تمرين (اقفل Redis في staging وتصرّف كأنه حقيقي).', 'Write an «incident handbook» for your agency: a severity table, roles, message templates, a status page and a postmortem template — and rehearse it (stop Redis in staging and act as if it were real).'),
      quiz: [
        Q(B('أول رسالة للعميل:', 'The first message to the client:'), [['خلال 15 دقيقة بالأثر وموعد التحديث', 'within 15 minutes, with impact and next update'], ['بعد الحل', 'after the fix'], ['مفيش', 'none']], 0, B('الصمت أسوأ.', 'Silence is worse.')),
        Q(B('postmortem:', 'A postmortem:'), [['من غير لوم بإجراءات', 'blameless with actions'], ['مين غلط', 'who was wrong'], ['سري', 'secret']], 0, B('تحسين.', 'Improvement.')),
        Q(B('SEV1:', 'SEV1:'), [['الخدمة الأساسية واقفة', 'the core service is down'], ['خطأ إملائي', 'a typo'], ['تحذير', 'a warning']], 0, B('شدة.', 'Severity.'))
      ] },

    { title: B('مراجعة الشهر العاشر ومشروعه', 'Month 10 review and project'),
      goal: B('n8n من جوه: مبني ومُدار ومقاس ومراقَب.', 'n8n from the inside: built, managed, measured and observed.'),
      review: [
        B('nodes مخصصة: declarative وprogrammatic وcredentials والنشر (أسبوع 37).', 'Custom nodes: declarative, programmatic, credentials and publishing (week 37).'),
        B('الـ API وworkflows as code والبيئات والترقية والاختبار (أسبوع 38).', 'The API, workflows as code, environments, promotion and testing (week 38).'),
        B('queue mode وضبط Redis/Postgres وk6 والتوسّع (أسبوع 39).', 'Queue mode, Redis/Postgres tuning, k6 and scaling (week 39).'),
        B('اللوج المجمّع والمقاييس واللوحات والـ SLOs والتنبيهات.', 'Collected logs, metrics, boards, SLOs and alerts.'),
        B('التتبّع بـ business id والحوادث والـ postmortems.', 'Tracing by business id, incidents and postmortems.')
      ],
      project: B('مشروع الشهر العاشر «n8n مُدار باحتراف» لعميل (حقيقي أو وهمي): node مخصص لخدمته منشور ومستخدم في workflows، الـ workflows في Git ببيئتين وترقية بسكربت وsmoke tests، queue mode مقاس بـ k6 وخطة capacity، لوج مجمّع ولوحة Grafana (تقنية + بيزنس)، 2 SLO و4 تنبيهات بـ runbooks ومراقبة من برة، customData للتتبّع، ودليل حوادث بتمرين — وتقرير شهري للعميل.', 'Month 10 project «professionally run n8n» for a client (real or mock): a custom node for their service, published and used in workflows; workflows in Git with two environments, script-based promotion and smoke tests; queue mode measured with k6 and a capacity plan; collected logs and a Grafana board (technical + business); 2 SLOs and 4 alerts with runbooks and outside monitoring; customData for tracing; and an incident handbook with a rehearsal — plus a monthly report for the client.'),
      test: [
        Q(B('json logs بتتجمع بـ:', 'JSON logs are collected with:'), [['log shipping (Alloy/Vector) لـ Loki', 'log shipping (Alloy/Vector) to Loki'], ['نسخ يدوي', 'manual copying'], ['email', 'email']], 0, B('مركزي.', 'Central.')),
        Q(B('أحداث تدقيق منظمة من n8n Enterprise:', 'Structured audit events from n8n Enterprise:'), [['log streaming', 'log streaming'], ['pinned data', 'pinned data'], ['Code node', 'a Code node']], 0, B('أحداث.', 'Events.')),
        Q(B('N8N_METRICS=true بيفتح:', 'N8N_METRICS=true opens:'), [['/metrics', '/metrics'], ['/healthz بس', 'only /healthz'], ['/admin', '/admin']], 0, B('Prometheus.', 'Prometheus.')),
        Q(B('panel كويس:', 'A good panel:'), [['بيجاوب سؤال واحد', 'answers one question'], ['كل الأرقام', 'shows every number'], ['ملوّن', 'is colourful']], 0, B('وضوح.', 'Clarity.')),
        Q(B('SLO مثال:', 'An example SLO:'), [['99% فواتير خلال 10 دقايق', '99% of invoices within 10 minutes'], ['السيرفر سريع', 'the server is fast'], ['مفيش أخطاء أبدًا', 'never any errors']], 0, B('رقم.', 'A number.')),
        Q(B('error budget = ', 'The error budget ='), [['المسموح يفشل', 'what may fail'], ['ميزانية فلوس', 'a money budget'], ['عدد الأخطاء في الكود', 'bugs in the code']], 0, B('100% − SLO.', '100% − SLO.')),
        Q(B('تنبيه بيضرب من ثانية بايظة:', 'An alert firing on one bad second:'), [['ضيف for: 10m', 'add for: 10m'], ['تمام', 'fine'], ['امسح المراقبة', 'remove monitoring']], 0, B('مدة.', 'Duration.')),
        Q(B('مراقبة uptime:', 'Uptime monitoring:'), [['من برة الشبكة', 'from outside the network'], ['من نفس السيرفر', 'from the same server'], ['مش لازم', 'not needed']], 0, B('مستقل.', 'Independent.')),
        Q(B('بحث برقم الطلب في الـ executions:', 'Searching executions by order number:'), [['customData', 'customData'], ['executionId', 'executionId'], ['مستحيل', 'impossible']], 0, B('business id.', 'Business id.')),
        Q(B('Debug in editor:', 'Debug in editor:'), [['يحمّل بيانات تشغيل قديم للتجربة', 'loads an old run’s data to experiment'], ['يمسح التشغيل', 'deletes the run'], ['ينشر', 'publishes']], 0, B('تشخيص.', 'Diagnosis.')),
        Q(B('أدوار SEV1:', 'SEV1 roles:'), [['قائد ومصلّح ومتواصل', 'a lead, a fixer and a communicator'], ['كله يصلّح', 'everyone fixes'], ['محدش', 'nobody']], 0, B('نظام.', 'Order.')),
        Q(B('postmortem يتشارك مع العميل:', 'Share a postmortem with the client:'), [['نسخة مختصرة تبني ثقة', 'a short version that builds trust'], ['أبدًا', 'never'], ['اللوج كله', 'all the logs']], 0, B('شفافية.', 'Transparency.'))
      ] }
  ]
};
