// n8n week 23 — Scaling, monitoring and custom nodes.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('التوسّع والمراقبة والـ nodes المخصّصة', 'Scaling, monitoring and custom nodes'),
  goal: B('تشغّل n8n تحت حِمل كبير: queue mode بـ workers، ومراقبة وتنبيهات، والتحكم فيه بالـ API، ولما مفيش node للخدمة، تبني node بنفسك.',
          'Run n8n under heavy load: queue mode with workers, monitoring and alerts, controlling it through its API, and building your own node when a service has none.'),
  days: [
    { title: B('queue mode والـ workers', 'Queue mode and workers'),
      goal: B('تفهم إمتى n8n الواحد مبيكفيش، وتشغّل main + Redis + workers.', 'Understand when a single n8n isn\'t enough, and run main + Redis + workers.'),
      learn: [
        { h: B('المشكلة', 'The problem'),
          p: B('n8n العادي بيشغّل كل حاجة في process واحد: الواجهة والـ webhooks والتنفيذ. لو فيه آلاف التنفيذات أو workflows تقيلة، كله بيبطّأ.', 'Regular n8n runs everything in one process: the editor, the webhooks and the executions. With thousands of executions or heavy workflows, everything slows down.'),
          ex: '1 process: UI + webhooks + 500 executions/min → slow editor, timeouts' },
        { h: B('الحل: queue mode', 'The fix: queue mode'),
          p: B('الـ main بيستقبل الـ triggers ويحط التنفيذات في طابور على Redis، والـ workers (processes منفصلة) بتسحب منه وتنفّذ. محتاج Postgres (مش SQLite) ونفس N8N_ENCRYPTION_KEY في الكل.', 'The main instance receives triggers and puts executions in a queue on Redis; workers (separate processes) pull from it and execute. You need Postgres (not SQLite) and the same N8N_ENCRYPTION_KEY everywhere.'),
          ex: 'EXECUTIONS_MODE=queue\nQUEUE_BULL_REDIS_HOST=redis\ncommand: worker --concurrency=10' },
        { h: B('التوسّع', 'Scaling'),
          p: B('زوّد workers لما الطابور يطوّل (horizontal scaling). وكل worker ليه concurrency: عدد التنفيذات في نفس الوقت. وممكن webhook processors منفصلين لو الـ webhooks كتير.', 'Add workers when the queue grows (horizontal scaling). Each worker has a concurrency: how many executions run at once. You can add separate webhook processors if webhooks are heavy.'),
          ex: 'docker compose up -d --scale n8n-worker=3' }
      ],
      practice: [
        B('ارسم الفرق بين الوضع العادي وqueue mode.', 'Draw the difference between regular mode and queue mode.'),
        B('اعمل compose فيه n8n main + worker + Redis + Postgres.', 'Write a compose file with n8n main + worker + Redis + Postgres.'),
        B('شغّل workflow 50 مرة وشوف الـ worker بينفّذ (docker logs).', 'Run a workflow 50 times and watch the worker execute (docker logs).'),
        B('زوّد الـ workers لـ 3 بـ --scale وقارن الوقت.', 'Scale to 3 workers with --scale and compare the time.')
      ],
      words: [
        { t: 'queue mode', m: B('وضع n8n بيوزّع التنفيذ على workers', 'the n8n mode distributing executions across workers'), ex: 'EXECUTIONS_MODE=queue' },
        { t: 'worker', m: B('process بيسحب تنفيذات من الطابور وينفّذها', 'a process pulling executions from the queue and running them'), ex: 'n8n worker' },
        { t: 'Redis', m: B('قاعدة بيانات في الذاكرة بتستخدم كطابور', 'an in-memory database used as the queue'), ex: 'redis:7-alpine' },
        { t: 'concurrency', m: B('عدد التنفيذات في نفس الوقت', 'how many executions run at the same time'), ex: '--concurrency=10' },
        { t: 'horizontal scaling', m: B('التوسّع بزيادة عدد النسخ مش حجمها', 'scaling by adding more instances, not bigger ones'), ex: '--scale n8n-worker=3' }],
      read: [{ t: 'n8n Docs: Queue mode', url: 'https://docs.n8n.io/hosting/scaling/queue-mode/', what: B('اقرا الإعداد والمتغيّرات.', 'Read the setup and variables.') }],
      challenge: B('اعمل load test: webhook بيتنادى 1000 مرة (بـ loop في n8n تاني أو سكريبت)، وقارن الوقت بـ worker واحد وبـ 3 workers، واكتب النتيجة.', 'Run a load test: call a webhook 1000 times (from another n8n loop or a script), compare the time with one worker and with 3, and write up the result.'),
      quiz: [
        { q: B('في queue mode، مين بينفّذ؟', 'In queue mode, who executes?'), o: [B('الـ workers', 'the workers'), B('الـ main بس', 'only main'), B('Redis', 'Redis')], a: 0, why: B('main بيوزّع.', 'Main distributes.') },
        { q: B('queue mode محتاج:', 'Queue mode needs:'), o: ['Redis + Postgres', 'SQLite only', 'nothing'], a: 0, why: B('طابور وقاعدة مشتركة.', 'A queue and a shared DB.') },
        { q: B('الطابور بيطوّل:', 'The queue keeps growing:'), o: [B('زوّد workers', 'add workers'), B('امسح Redis', 'delete Redis'), B('وقّف الـ main', 'stop main')], a: 0, why: B('horizontal scaling.', 'horizontal scaling.') }
      ] },

    { title: B('المراقبة والتنبيهات', 'Monitoring and alerts'),
      goal: B('تعرف السيرفر عامل إيه قبل ما العميل يقولك.', 'Know how the server is doing before the client tells you.'),
      learn: [
        { h: B('healthcheck', 'Healthcheck'),
          p: B('n8n عنده /healthz بيرد 200 لو شغال. خدمة خارجية (زي Uptime Kuma أو UptimeRobot) تنادي عليه كل دقيقة وتنبّهك لو وقع.', 'n8n has /healthz, which returns 200 when it\'s up. An external service (like Uptime Kuma or UptimeRobot) calls it every minute and alerts you if it goes down.'),
          ex: 'curl -I https://n8n.example.com/healthz  → 200' },
        { h: B('المقاييس', 'Metrics'),
          p: B('N8N_METRICS=true بيفتح /metrics بصيغة Prometheus: عدد التنفيذات، الفاشلة، الذاكرة. Grafana بترسمها dashboard وتنبّه لو في حاجة غريبة.', 'N8N_METRICS=true exposes /metrics in Prometheus format: execution counts, failures, memory. Grafana draws a dashboard and alerts on anything unusual.'),
          ex: 'N8N_METRICS=true\nGET /metrics → n8n_workflow_failed_total 3' },
        { h: B('الـ logs', 'Logs'),
          p: B('N8N_LOG_LEVEL (info أو debug وقت المشكلة) وN8N_LOG_OUTPUT=file عشان تحفظها. ودايمًا عندك error workflow مركزي بيبعت الفشل على Telegram/Slack.', 'N8N_LOG_LEVEL (info, or debug while troubleshooting) and N8N_LOG_OUTPUT=file to keep them. Always keep a central error workflow sending failures to Telegram/Slack.'),
          ex: 'N8N_LOG_LEVEL=info\nN8N_LOG_OUTPUT=console,file' }
      ],
      practice: [
        B('نادي /healthz بـ curl.', 'Call /healthz with curl.'),
        B('اعمل monitor في Uptime Kuma أو UptimeRobot بتنبيه.', 'Create a monitor in Uptime Kuma or UptimeRobot with an alert.'),
        B('فعّل N8N_METRICS وشوف /metrics.', 'Enable N8N_METRICS and look at /metrics.'),
        B('اعمل workflow يومي بيبعتلك: عدد التنفيذات والفاشلة امبارح.', 'Build a daily workflow that sends you yesterday\'s execution and failure counts.')
      ],
      words: [
        { t: 'healthcheck (/healthz)', m: B('رابط بيرد لو الخدمة شغالة', 'an endpoint that responds when the service is up'), ex: '200 OK' },
        { t: 'uptime monitoring', m: B('مراقبة إن الخدمة شغالة طول الوقت', 'watching that a service stays up'), ex: 'Uptime Kuma, UptimeRobot' },
        { t: 'Prometheus metrics', m: B('أرقام بصيغة Prometheus عن حالة الخدمة', 'numbers about service health in Prometheus format'), ex: 'N8N_METRICS=true' },
        { t: 'Grafana dashboard', m: B('لوحة رسوم بيانية للمقاييس', 'a board of charts for metrics'), ex: 'Executions per hour' },
        { t: 'N8N_LOG_LEVEL', m: B('مستوى تفاصيل الـ logs', 'how detailed the logs are'), ex: 'info, warn, debug' }],
      read: [{ t: 'n8n Docs: Monitoring', url: 'https://docs.n8n.io/hosting/logging-monitoring/monitoring/', what: B('اقرا healthz وmetrics.', 'Read healthz and metrics.') }],
      challenge: B('اعمل «ops dashboard» لسيرفرك: uptime monitor، وتقرير يومي بالتنفيذات، وerror workflow، وتنبيه لو الديسك فوق 80% (Execute Command أو node exporter).', 'Build an "ops dashboard" for your server: an uptime monitor, a daily execution report, an error workflow, and an alert when disk use is above 80% (Execute Command or node exporter).'),
      quiz: [
        { q: B('تعرف إن n8n شغال من برّه:', 'Check from outside that n8n is up:'), o: ['/healthz', '/admin', '/login'], a: 0, why: B('healthcheck.', 'healthcheck.') },
        { q: B('N8N_METRICS=true بيفتح:', 'N8N_METRICS=true exposes:'), o: ['/metrics', '/debug', '/api/v2'], a: 0, why: B('Prometheus.', 'Prometheus.') },
        { q: B('مشكلة غريبة وعايز تفاصيل:', 'A strange problem and you need details:'), o: ['N8N_LOG_LEVEL=debug', 'restart forever', 'delete logs'], a: 0, why: B('debug مؤقتًا.', 'debug temporarily.') }
      ] },

    { title: B('n8n API والـ CLI', 'The n8n API and CLI'),
      goal: B('تتحكم في n8n بالكود: تجيب وتعدّل workflows وتنفيذات من برّه.', 'Control n8n with code: fetch and change workflows and executions from outside.'),
      learn: [
        { h: B('الـ public API', 'The public API'),
          p: B('من Settings → n8n API اعمل API key. بعدين /api/v1/workflows وexecutions وcredentials وtags. الـ key في header اسمه X-N8N-API-KEY.', 'In Settings → n8n API, create an API key. Then use /api/v1/workflows, executions, credentials and tags. The key goes in the X-N8N-API-KEY header.'),
          ex: 'curl -H "X-N8N-API-KEY: $KEY" https://n8n.example.com/api/v1/workflows?active=true' },
        { h: B('استخدامات حقيقية', 'Real uses'),
          p: B('تقرير بالـ workflows الفاشلة، وتفعيل/إيقاف workflows من سكريبت، ونقل workflows من staging للإنتاج، وnode «n8n» جوه n8n نفسه بيعمل ده.', 'Reports of failing workflows, activating/deactivating workflows from a script, moving workflows from staging to production — and the "n8n" node inside n8n itself does this.'),
          ex: 'GET /api/v1/executions?status=error&limit=50' },
        { h: B('الـ CLI', 'The CLI'),
          p: B('أوامر زي import:workflow وupdate:workflow --active=false وexecute --id. مفيدة في الـ deploy والسكريبتات.', 'Commands like import:workflow, update:workflow --active=false and execute --id. Useful in deploys and scripts.'),
          ex: 'n8n import:workflow --input=wf.json\nn8n update:workflow --id=12 --active=true' }
      ],
      practice: [
        B('اعمل API key وهات قائمة الـ workflows بـ curl.', 'Create an API key and list workflows with curl.'),
        B('هات آخر 20 تنفيذ فاشل.', 'Fetch the last 20 failed executions.'),
        B('استخدم node الـ n8n جوه workflow يعمل تقرير.', 'Use the n8n node inside a workflow to build a report.'),
        B('انقل workflow من instance لتاني بـ export/import.', 'Move a workflow between instances with export/import.')
      ],
      words: [
        { t: 'n8n API', m: B('API رسمي للتحكم في n8n', 'the official API for controlling n8n'), ex: '/api/v1/workflows' },
        { t: 'X-N8N-API-KEY', m: B('الـ header اللي فيه مفتاح n8n API', 'the header carrying the n8n API key'), ex: '-H "X-N8N-API-KEY: …"' },
        { t: 'n8n import:workflow', m: B('أمر CLI بيستورد workflow من JSON', 'a CLI command importing a workflow from JSON'), ex: '--input=wf.json' },
        { t: 'promote to production', m: B('نقل workflow من التجربة للإنتاج', 'moving a workflow from testing to production'), ex: 'staging → prod' },
        { t: 'n8n node', m: B('node جوه n8n بيكلّم n8n API', 'a node inside n8n that calls the n8n API'), ex: 'Get many executions' }],
      read: [{ t: 'n8n Docs: Public API', url: 'https://docs.n8n.io/api/', what: B('اقرا المصادقة والـ endpoints.', 'Read authentication and endpoints.') }],
      challenge: B('اعمل workflow «promote»: ياخد ID من staging، يصدّره بالـ API، ويستورده في الإنتاج، ويفعّله، ويبعتلك تأكيد.', 'Build a "promote" workflow: take an ID from staging, export it via the API, import it into production, activate it, and send you a confirmation.'),
      quiz: [
        { q: B('مفتاح n8n API بيتبعت في:', 'The n8n API key is sent in:'), o: ['X-N8N-API-KEY', 'the URL', 'the body'], a: 0, why: B('header.', 'A header.') },
        { q: B('التنفيذات الفاشلة:', 'Failed executions:'), o: ['/api/v1/executions?status=error', '/errors', '/fail'], a: 0, why: B('فلتر status.', 'The status filter.') },
        { q: B('تستورد workflow من ملف بالـ CLI:', 'Import a workflow from a file with the CLI:'), o: ['n8n import:workflow', 'n8n get', 'n8n pull'], a: 0, why: B('import.', 'import.') }
      ] },

    { title: B('بناء node مخصّص', 'Building a custom node'),
      goal: B('تبني community node بـ TypeScript لخدمة مالهاش node.', 'Build a community node in TypeScript for a service that has no node.'),
      learn: [
        { h: B('إمتى تبني node؟', 'When to build a node?'),
          p: B('لو HTTP Request بيكفي، استخدمه. ابني node لما الخدمة هتتستخدم كتير، أو عايز واجهة سهلة لعميل مش تقني، أو هتنشره للناس.', 'If HTTP Request is enough, use it. Build a node when the service is used a lot, when a non-technical client needs an easy interface, or when you\'ll publish it.'),
          ex: 'HTTP Request ×20 workflows → a node saves time' },
        { h: B('الشكل', 'The structure'),
          p: B('ابدأ من n8n-nodes-starter. الـ node ملف TypeScript فيه description (الاسم والـ properties اللي بتظهر) وexecute() أو «declarative routing». والـ credentials في ملف منفصل.', 'Start from n8n-nodes-starter. A node is a TypeScript file with a description (its name and the properties shown) and execute(), or declarative routing. Credentials live in a separate file.'),
          ex: 'nodes/Weather/Weather.node.ts\ncredentials/WeatherApi.credentials.ts' },
        { h: B('التجربة والنشر', 'Testing and publishing'),
          p: B('npm run build وnpm link وشغّل n8n محلي تشوفه. للنشر: اسم الحزمة يبدأ بـ n8n-nodes-، والـ keyword n8n-community-node-package، وnpm publish.', 'npm run build, npm link, and run n8n locally to see it. To publish: the package name starts with n8n-nodes-, add the keyword n8n-community-node-package, then npm publish.'),
          ex: '"name": "n8n-nodes-weather",\n"keywords": ["n8n-community-node-package"]' }
      ],
      practice: [
        B('نزّل n8n-nodes-starter واقرا الـ node المثال.', 'Clone n8n-nodes-starter and read the example node.'),
        B('غيّر المثال لـ node بيجيب الطقس من API مجاني (Open-Meteo).', 'Change the example into a node that fetches weather from a free API (Open-Meteo).'),
        B('اعمل build وجرّبه في n8n محلي.', 'Build it and try it in a local n8n.'),
        B('اكتب README فيه الاستخدام ومثال.', 'Write a README with usage and an example.')
      ],
      words: [
        { t: 'community node', m: B('node من برّه n8n الرسمي بتتثبّت كحزمة', 'a node outside core n8n installed as a package'), ex: 'Settings → Community nodes' },
        { t: 'n8n-nodes-starter', m: B('قالب رسمي لبدء node جديد', 'the official template for starting a new node'), ex: 'git clone …/n8n-nodes-starter' },
        { t: 'TypeScript', m: B('JavaScript بأنواع (types)', 'JavaScript with types'), ex: 'const n: number = 5;' },
        { t: 'declarative routing', m: B('node بتوصف الطلبات بدل ما تكتب execute', 'a node that describes requests instead of writing execute'), ex: 'routing: { request: { url: "/weather" } }' },
        { t: 'npm link', m: B('تربط حزمة محلية عشان تجرّبها', 'link a local package to try it'), ex: 'npm link n8n-nodes-weather' }],
      read: [{ t: 'n8n Docs: Creating nodes', url: 'https://docs.n8n.io/integrations/creating-nodes/overview/', what: B('اقرا الـ tutorial الأول (declarative).', 'Read the first (declarative) tutorial.') }],
      challenge: B('خلّص node الطقس بعمليتين (current و forecast)، وcredentials (لو الخدمة محتاجة)، وأيقونة، وارفعه على GitHub.', 'Finish the weather node with two operations (current and forecast), credentials (if the service needs them) and an icon, and push it to GitHub.'),
      quiz: [
        { q: B('خدمة هتستخدمها مرة واحدة:', 'A service you\'ll use once:'), o: ['HTTP Request', B('ابني node', 'build a node'), B('ابني n8n جديد', 'build a new n8n')], a: 0, why: B('أبسط.', 'Simpler.') },
        { q: B('اسم حزمة community node بيبدأ بـ:', 'A community node package name starts with:'), o: ['n8n-nodes-', 'node-', 'my-'], a: 0, why: B('قاعدة النشر.', 'The publishing rule.') },
        { q: B('الـ nodes بتتكتب بـ:', 'Nodes are written in:'), o: ['TypeScript', 'SQL', 'CSS'], a: 0, why: B('TS.', 'TS.') }
      ] },

    { title: B('الأداء والتكلفة', 'Performance and cost'),
      goal: B('تخلّي الـ workflows أسرع وأرخص: ذاكرة، وbatches، وطلبات أقل، وتكلفة AI.', 'Make workflows faster and cheaper: memory, batches, fewer requests and AI cost.'),
      learn: [
        { h: B('الذاكرة', 'Memory'),
          p: B('بيانات ضخمة في تنفيذ واحد = ذاكرة كتير وممكن crash. قسّم بـ Loop Over Items أو sub-workflows، واستخدم binary data mode=filesystem للملفات بدل الذاكرة.', 'Huge data in one execution = lots of memory and possible crashes. Split with Loop Over Items or sub-workflows, and use binary data mode=filesystem for files instead of memory.'),
          ex: 'N8N_DEFAULT_BINARY_DATA_MODE=filesystem' },
        { h: B('الطلبات', 'Requests'),
          p: B('بدل ما تنادي API 1000 مرة: استخدم bulk endpoints لو موجودة، وcache للنتايج اللي مبتتغيرش، وجدولة أقل تكرار (كل ساعة بدل كل دقيقة لو كفاية).', 'Instead of calling an API 1000 times: use bulk endpoints where available, cache results that don\'t change, and schedule less often (hourly instead of every minute if that\'s enough).'),
          ex: 'POST /contacts/batch (100 per call) instead of 100 calls' },
        { h: B('تكلفة الـ AI', 'AI cost'),
          p: B('الـ tokens بفلوس. استخدم موديل أصغر للمهام السهلة (تصنيف)، وقصّر الـ prompt، وخزّن النتايج المتكررة، وحط حد أقصى للـ tokens، وسجّل الاستهلاك.', 'Tokens cost money. Use a smaller model for easy tasks (classification), shorten prompts, cache repeated results, set a max-token limit and log usage.'),
          ex: 'classify → small model · long reasoning → big model' }
      ],
      practice: [
        B('خد workflow بطيء وقيس وقته قبل وبعد تقسيمه.', 'Take a slow workflow and time it before and after splitting it.'),
        B('فعّل binary data mode=filesystem وجرّب ملف كبير.', 'Enable binary data mode=filesystem and try a big file.'),
        B('بدّل 100 طلب بطلب bulk واحد (لو الخدمة بتدعم).', 'Replace 100 requests with one bulk request (if the service supports it).'),
        B('احسب تكلفة AI workflow في الشهر وقلّلها للنص.', 'Calculate an AI workflow\'s monthly cost and cut it in half.')
      ],
      words: [
        { t: 'memory leak', m: B('ذاكرة بتزيد ومبتتحررش لحد ما السيرفر يقع', 'memory that keeps growing and is never freed until the server crashes'), ex: 'RAM 95% after 3 days' },
        { t: 'bulk endpoint', m: B('endpoint بياخد عناصر كتير في طلب واحد', 'an endpoint taking many items in one request'), ex: '/contacts/batch' },
        { t: 'cache', m: B('تخزين نتيجة عشان متطلبهاش تاني', 'storing a result so you don\'t fetch it again'), ex: 'Exchange rates cached for 1 hour' },
        { t: 'token cost', m: B('تكلفة الـ AI حسب عدد الـ tokens', 'AI cost based on the number of tokens'), ex: 'input + output tokens' },
        { t: 'bottleneck', m: B('أبطأ جزء بيأخّر كل حاجة', 'the slowest part holding everything back'), ex: 'One slow API call' }],
      read: [{ t: 'n8n Docs: Memory-related errors', url: 'https://docs.n8n.io/hosting/scaling/memory-errors/', what: B('اقرا الأسباب والحلول.', 'Read the causes and fixes.') }],
      challenge: B('اعمل «performance review» لأتقل 3 workflows عندك: الوقت، والذاكرة، والطلبات، والتكلفة — قبل وبعد التحسين في جدول.', 'Do a "performance review" of your 3 heaviest workflows: time, memory, requests and cost — before and after optimisation, in a table.'),
      quiz: [
        { q: B('ملفات كبيرة بتوقّع n8n:', 'Big files crash n8n:'), o: ['binary data mode=filesystem', B('زوّد الملفات', 'add more files'), B('امسح n8n', 'delete n8n')], a: 0, why: B('بدل الذاكرة.', 'Instead of memory.') },
        { q: B('100 طلب لنفس الـ API:', '100 requests to the same API:'), o: [B('bulk endpoint لو موجود', 'a bulk endpoint if available'), B('1000 طلب', '1000 requests'), B('مفيش حل', 'no fix')], a: 0, why: B('طلبات أقل.', 'Fewer requests.') },
        { q: B('تصنيف رسائل بسيط:', 'Simple message classification:'), o: [B('موديل صغير', 'a small model'), B('أكبر موديل', 'the biggest model'), B('بدون حد', 'no limit')], a: 0, why: B('تكلفة.', 'Cost.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 24 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 24 opens when you score 70% or more.'),
      review: [
        B('queue mode: main وRedis وworkers وconcurrency.', 'Queue mode: main, Redis, workers and concurrency.'),
        B('المراقبة: /healthz وmetrics وlogs وتنبيهات.', 'Monitoring: /healthz, metrics, logs and alerts.'),
        B('n8n API والـ CLI.', 'The n8n API and CLI.'),
        B('community node بـ TypeScript.', 'A community node in TypeScript.'),
        B('الأداء: الذاكرة، والـ bulk، والـ cache، وتكلفة AI.', 'Performance: memory, bulk, cache and AI cost.')
      ],
      project: B('حوّل سيرفرك لـ «production-grade»: queue mode بـ 2 workers، وuptime monitor، وmetrics، وتقرير يومي من n8n API، وnode مخصّص منشور على GitHub، وperformance review. واكتب «architecture doc» بصفحة واحدة فيها رسم.',
                 'Make your server "production-grade": queue mode with 2 workers, an uptime monitor, metrics, a daily report from the n8n API, a custom node published on GitHub, and a performance review. Write a one-page "architecture doc" with a diagram.'),
      test: [
        { q: B('queue mode بيحط التنفيذات في:', 'Queue mode puts executions in:'), o: [B('طابور على Redis', 'a queue on Redis'), B('ملف', 'a file'), B('الإيميل', 'email')], a: 0, why: B('Redis.', 'Redis.') },
        { q: B('في queue mode لازم كل النسخ تشارك:', 'In queue mode all instances must share:'), o: [B('نفس الـ encryption key وPostgres', 'the same encryption key and Postgres'), B('نفس اللون', 'the same colour'), B('ولا حاجة', 'nothing')], a: 0, why: B('عشان الـ credentials.', 'For credentials.') },
        { q: B('--concurrency=10 يعني:', '--concurrency=10 means:'), o: [B('10 تنفيذات في نفس الوقت', '10 executions at once'), B('10 workers', '10 workers'), B('10 دقايق', '10 minutes')], a: 0, why: B('لكل worker.', 'Per worker.') },
        { q: B('horizontal scaling:', 'Horizontal scaling:'), o: [B('نسخ أكتر', 'more instances'), B('سيرفر أكبر', 'a bigger server'), B('كود أقل', 'less code')], a: 0, why: B('أفقي.', 'Horizontal.') },
        { q: B('/healthz بيرد:', '/healthz returns:'), o: [B('200 لو شغال', '200 when up'), B('كل الـ workflows', 'all workflows'), B('الباسورد', 'the password')], a: 0, why: B('healthcheck.', 'healthcheck.') },
        { q: B('رسوم المقاييس بتتعمل في:', 'Metric charts are built in:'), o: ['Grafana', 'Gmail', 'Git'], a: 0, why: B('dashboards.', 'dashboards.') },
        { q: B('مفتاح n8n API:', 'The n8n API key:'), o: ['X-N8N-API-KEY header', B('في الرابط', 'in the URL'), B('مش محتاج', 'not needed')], a: 0, why: B('header.', 'header.') },
        { q: B('تقفل workflow من سكريبت:', 'Deactivate a workflow from a script:'), o: ['n8n update:workflow --active=false', 'rm -rf', 'git revert'], a: 0, why: B('CLI.', 'CLI.') },
        { q: B('بداية node جديد:', 'Starting a new node:'), o: ['n8n-nodes-starter', 'create-react-app', 'Django'], a: 0, why: B('القالب الرسمي.', 'The official template.') },
        { q: B('تجرّب node محلي:', 'Try a node locally:'), o: ['npm run build + npm link', 'npm publish', 'git push'], a: 0, why: B('قبل النشر.', 'Before publishing.') },
        { q: B('نتيجة مبتتغيرش كل شوية:', 'A result that rarely changes:'), o: ['cache', B('اطلبها كل ثانية', 'fetch it every second'), B('امسحها', 'delete it')], a: 0, why: B('طلبات أقل.', 'Fewer requests.') },
        { q: B('bottleneck يعني:', 'A bottleneck is:'), o: [B('أبطأ جزء', 'the slowest part'), B('أسرع جزء', 'the fastest part'), B('خطأ إملائي', 'a typo')], a: 0, why: B('بيأخّر الكل.', 'It holds everything back.') }
      ] }
  ]
};
