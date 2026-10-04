// JavaScript week 46 — CI/CD and monitoring for Node.
// A version bump from commits, AsyncLocalStorage request ids, a JSON logger, a Prometheus histogram, error-budget
// maths and a heartbeat checker run in Node; workflow YAML, pino, prom-client, OpenTelemetry and Sentry are shown.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('CI/CD والمراقبة لـ Node', 'CI/CD and monitoring for Node'),
  goal: B('من commit لإنتاج مراقَب: pipelines سريعة بمصفوفات وكاش وحماية للفروع، نشر لبيئات بموافقة ومن غير مفاتيح طويلة العمر، إصدارات آلية، ولوج ومقاييس وتتبع وتتبع أخطاء، وSLOs وتنبيهات بتصحّي حد بس لما يستاهل.',
          'From commit to monitored production: fast pipelines with matrices, caching and branch protection, deploys to environments with approval and no long-lived keys, automated releases, logs, metrics, tracing and error tracking, and SLOs with alerts that wake someone only when it matters.'),
  days: [
    { title: B('CI سريع وموثوق', 'Fast, reliable CI'),
      goal: B('كل PR بيتفحص في دقايق.', 'Every PR checked in minutes.'),
      learn: [
        L(B('workflow كامل', 'A complete workflow'),
          B('**github actions**: lint وtypes وtests في **matrix** (نسخ Node وأنظمة)، كاش npm، و**artifact** للتقارير. **required check** مع **branch protection** = مفيش merge على main غير لما الـ CI ينجح ومراجعة. واقسم الـ jobs عشان تشتغل بالتوازي.', '**github actions**: lint, types and tests in a **matrix** (Node versions and systems), an npm cache, and an **artifact** for reports. A **required check** with **branch protection** = no merge to main until CI passes and a review. And split jobs so they run in parallel.'),
          'name: ci\non: { pull_request: {}, push: { branches: [main] } }\nconcurrency: { group: "ci-${{ github.ref }}", cancel-in-progress: true }\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v5\n      - uses: actions/setup-node@v5\n        with: { node-version: 22, cache: npm }\n      - run: npm ci --ignore-scripts\n      - run: npm run lint && npx tsc --noEmit\n  test:\n    strategy: { matrix: { node: [22, 24], os: [ubuntu-latest, windows-latest] } }\n    runs-on: ${{ matrix.os }}\n    steps:\n      - uses: actions/checkout@v5\n      - uses: actions/setup-node@v5\n        with: { node-version: "${{ matrix.node }}", cache: npm }\n      - run: npm ci --ignore-scripts\n      - run: node --test --test-reporter=junit --test-reporter-destination=report.xml\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with: { name: "report-${{ matrix.os }}-${{ matrix.node }}", path: report.xml }', T),
        L(B('اختبارات تكامل في CI', 'Integration tests in CI'),
          B('خدمات حقيقية في CI بـ `services:` (Postgres، Redis) — نفس نسخة الإنتاج. وشغّل الترحيلات قبل الاختبارات. والاختبارات البطيئة (e2e بـ Playwright) في job منفصل أو كل ليلة عشان الـ PR يفضل سريع.', 'Real services in CI with `services:` (Postgres, Redis) — the same version as production. Run migrations before the tests. And keep slow tests (Playwright e2e) in a separate job or nightly so PRs stay fast.'),
          'integration:\n  runs-on: ubuntu-latest\n  services:\n    postgres:\n      image: postgres:17\n      env: { POSTGRES_PASSWORD: ci-only, POSTGRES_DB: shop_test }\n      ports: ["5432:5432"]\n      options: --health-cmd "pg_isready" --health-interval 5s --health-retries 10\n  env: { DATABASE_URL: "postgres://postgres:ci-only@localhost:5432/shop_test" }\n  steps:\n    - uses: actions/checkout@v5\n    - uses: actions/setup-node@v5\n      with: { node-version: 22, cache: npm }\n    - run: npm ci --ignore-scripts\n    - run: npm run migrate\n    - run: node --test test/integration/', T),
        L(B('إصدارات آلية', 'Automated releases'),
          B('مع conventional commits (أسبوع 28) أداة زي **release please** بتفتح PR فيه رقم الإصدار الجاي والـ changelog، ولما تدمجه بيعمل tag وrelease. المثال بيحسب الرقم الجاي من الـ commits — نفس المنطق.', 'With conventional commits (week 28), a tool like **release please** opens a PR with the next version number and the changelog, and merging it creates a tag and a release. The example computes the next number from the commits — the same logic.'),
          'const commits = ["feat(orders): WhatsApp status endpoint", "fix: VAT rounding on credit notes", "chore(deps): bump pino", "docs: deploy guide"];\nfunction nextVersion(current, msgs) {\n  let [major, minor, patch] = current.split(".").map(Number);\n  const kinds = msgs.map(m => m.match(/^(\\w+)(\\([^)]*\\))?(!)?:/) ?? []);\n  if (kinds.some(k => k[3]) || msgs.some(m => m.includes("BREAKING CHANGE"))) return `${major + 1}.0.0`;\n  if (kinds.some(k => k[1] === "feat")) return `${major}.${minor + 1}.0`;\n  if (kinds.some(k => k[1] === "fix")) return `${major}.${minor}.${patch + 1}`;\n  return current;\n}\nconsole.log("1.8.2 →", nextVersion("1.8.2", commits));\nconsole.log("1.8.2 →", nextVersion("1.8.2", ["fix: typo in email"]));\nconsole.log("1.8.2 →", nextVersion("1.8.2", ["feat!: new /v2 orders API"]));\nconsole.log("1.8.2 →", nextVersion("1.8.2", ["chore: lint"]), "(nothing to release)");', N())
      ],
      practice: [
        B('اعمل workflow بـ lint وtypes وmatrix.', 'Create a workflow with lint, types and a matrix.'),
        B('فعّل branch protection وrequired checks.', 'Enable branch protection and required checks.'),
        B('ضيف Postgres service لاختبارات التكامل.', 'Add a Postgres service for integration tests.'),
        B('جرّب release-please على ريبو.', 'Try release-please on a repo.')
      ],
      words: [
        W('github actions', 'نظام CI/CD في GitHub', 'GitHub’s CI/CD platform', 'GitHub Actions runs the tests on every PR.'),
        W('matrix', 'تشغيل على تركيبات نسخ وأنظمة', 'running jobs across combinations', 'The matrix covers Node 22 and 24.'),
        W('artifact', 'ملف ناتج من الـ pipeline', 'a file saved from a CI run', 'Download the coverage artifact.'),
        W('required check', 'فحص لازم ينجح قبل الدمج', 'a status that must pass before merging', 'Tests are a required check.'),
        W('branch protection', 'حماية الفرع من الدمج المباشر', 'rules guarding a branch', 'Branch protection needs one review.'),
        W('release please', 'أداة إصدارات آلية', 'a tool automating versions and changelogs', 'release-please opened the 1.9.0 PR.')
      ],
      read: [{ lib: 'GitHub Actions docs', what: B('اقرا Building and testing Node.js.', 'Read Building and testing Node.js.') }],
      challenge: B('ابني CI لخدمة المتجر: lint وtsc وunit في matrix، integration بـ Postgres service، e2e كل ليلة، artifacts للتقارير، branch protection بـ required checks، وrelease-please بيعمل الإصدارات — والـ PR العادي يخلص في أقل من 8 دقايق.', 'Build CI for the shop service: lint, tsc and unit tests in a matrix, integration with a Postgres service, nightly e2e, report artifacts, branch protection with required checks, and release-please making releases — with a normal PR finishing in under 8 minutes.'),
      quiz: [
        Q(B('مفيش merge من غير CI:', 'No merge without CI:'), [['branch protection + required check', 'branch protection + a required check'], ['ثقة', 'trust'], ['إيميل', 'an email']], 0, B('حماية.', 'Protection.')),
        Q(B('e2e بطيئة:', 'Slow e2e tests:'), [['job منفصل أو كل ليلة', 'a separate job or nightly'], ['في كل خطوة', 'in every step'], ['احذفها', 'delete them']], 0, B('سرعة.', 'Speed.')),
        Q(B('feat: في commit:', 'feat: in a commit:'), [['minor', 'minor'], ['major', 'major'], ['مفيش إصدار', 'no release']], 0, B('ميزة.', 'Feature.'))
      ] },

    { title: B('النشر للبيئات', 'Deploying to environments'),
      goal: B('staging تلقائي وإنتاج بموافقة.', 'Automatic staging, approved production.'),
      learn: [
        L(B('البيئات والموافقة', 'Environments and approval'),
          B('GitHub **environment** (staging، production) بأسرار خاصة بكل واحدة و**approval** (مراجع لازم يوافق) لـ production. كل merge على main بيروح **staging** لوحده بنفس الصورة (الـ digest)، وبعد الموافقة نفس الـ digest يروح production. و**continuous deployment** الكامل لو الاختبارات والمراقبة قوية كفاية.', 'A GitHub **environment** (staging, production) with its own secrets and an **approval** (a reviewer must approve) for production. Every merge to main goes to **staging** automatically with the same image (the digest), and after approval the same digest goes to production. Full **continuous deployment** if tests and monitoring are strong enough.'),
          'deploy-staging:\n  needs: [image]\n  environment: staging\n  runs-on: ubuntu-latest\n  steps:\n    - run: ./deploy.sh staging "${{ needs.image.outputs.digest }}"\n    - run: npx playwright test --config e2e/smoke.config.ts      # smoke tests against staging\ndeploy-production:\n  needs: [deploy-staging]\n  environment: production                     # required reviewers → waits for approval\n  runs-on: ubuntu-latest\n  steps:\n    - run: ./deploy.sh production "${{ needs.image.outputs.digest }}"   # the SAME digest', T),
        L(B('من غير مفاتيح طويلة العمر', 'No long-lived keys'),
          B('**oidc**: الـ job بياخد توكن مؤقت من GitHub والسحابة بتثق فيه لريبو وفرع وبيئة محددين — مفيش مفتاح AWS/GCP محفوظ للأبد. ولـ VPS: مفتاح SSH مخصص للنشر بصلاحيات محدودة (أمر واحد) في أسرار الـ environment.', '**oidc**: the job gets a short-lived token from GitHub that the cloud trusts only for a specific repo, branch and environment — no AWS/GCP key stored forever. For a VPS: a dedicated deploy SSH key with limited rights (one command) in the environment’s secrets.'),
          '# AWS: trust policy condition for the deploy role (only this repo, only the production environment)\n"Condition": {\n  "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },\n  "StringLike":   { "token.actions.githubusercontent.com:sub": "repo:acme/shop:environment:production" }\n}\n\n# VPS: ~/.ssh/authorized_keys on the server — the deploy key can run ONE command\ncommand="/opt/shop/deploy.sh",no-port-forwarding,no-agent-forwarding,no-pty ssh-ed25519 AAAA… github-deploy', T),
        L(B('بيئات معاينة', 'Preview environments'),
          B('**preview deployment** = كل PR بياخد رابط مؤقت بالنسخة دي (Vercel وNetlify وCloudflare Pages بيعملوها لوحدهم للواجهات). المراجع بيجرّب بدل ما يقرا الكود بس، والعميل يشوف قبل الدمج. واتأكد إنها بتستخدم بيانات تجربة مش بيانات حقيقية، وبتتمسح بعد الدمج.', 'A **preview deployment** = each PR gets a temporary URL with that version (Vercel, Netlify and Cloudflare Pages do it automatically for front ends). Reviewers try it instead of only reading code, and the client sees it before merging. Make sure it uses test data, not real data, and is removed after merge.'),
          'PR #142 «new checkout»\n  CI ✓  → preview: https://pr-142.shop-preview.example.com   (seeded test data, payment sandbox)\n  reviewer comments with screenshots · client approves the flow\n  merge → preview destroyed → staging deploy → production after approval', T)
      ],
      practice: [
        B('اعمل environments staging وproduction.', 'Create staging and production environments.'),
        B('ضيف required reviewers لـ production.', 'Add required reviewers for production.'),
        B('استبدل مفتاح سحابة بـ OIDC.', 'Replace a cloud key with OIDC.'),
        B('فعّل preview deployments للواجهة.', 'Enable preview deployments for the front end.')
      ],
      words: [
        W('environment', 'بيئة نشر بأسرارها', 'a deployment target with its own secrets', 'The production environment needs approval.'),
        W('approval', 'موافقة قبل النشر', 'a manual sign-off before deploying', 'The approval came from the tech lead.'),
        W('staging', 'بيئة تجربة شبه الإنتاج', 'a near-production test environment', 'Every merge goes to staging.'),
        W('continuous deployment', 'نشر تلقائي لكل تغيير ناجح', 'releasing every passing change automatically', 'Continuous deployment needs good alerts.'),
        W('oidc', 'توكن مؤقت بدل المفاتيح', 'short-lived identity tokens for CI', 'OIDC removed the stored AWS key.'),
        W('preview deployment', 'نسخة معاينة لكل PR', 'a temporary deployment per pull request', 'The client tested the preview deployment.')
      ],
      read: [{ lib: 'GitHub Actions docs', what: B('اقرا Deployments and environments.', 'Read Deployments and environments.') }],
      challenge: B('كمّل الـ pipeline: صورة واحدة بـ digest، staging تلقائي بـ smoke tests، production بموافقة بنفس الـ digest، OIDC أو مفتاح نشر محدود، وpreview لكل PR في الواجهة — ووثّق خطة الرجوع.', 'Complete the pipeline: one image by digest, automatic staging with smoke tests, approved production with the same digest, OIDC or a restricted deploy key, and a preview per PR for the front end — and document the rollback plan.'),
      quiz: [
        Q(B('production بيستخدم:', 'Production uses:'), [['نفس الـ digest اللي اتجرّب على staging', 'the same digest tested on staging'], ['بناء جديد', 'a fresh build'], ['latest', 'latest']], 0, B('ثبات.', 'Consistency.')),
        Q(B('مفتاح AWS محفوظ في GitHub للأبد:', 'An AWS key stored in GitHub forever:'), [['استبدله بـ OIDC', 'replace it with OIDC'], ['عادي', 'fine'], ['أحسن', 'better']], 0, B('مؤقت.', 'Short-lived.')),
        Q(B('preview deployment:', 'A preview deployment:'), [['رابط مؤقت لكل PR ببيانات تجربة', 'a temporary URL per PR with test data'], ['الإنتاج', 'production'], ['صورة PNG', 'a PNG']], 0, B('معاينة.', 'Preview.'))
      ] },

    { title: B('اللوج المنظم', 'Structured logs'),
      goal: B('لوج تقدر تدوّر فيه بـ request id.', 'Logs searchable by request id.'),
      learn: [
        L(B('pino واللوج JSON', 'pino and JSON logs'),
          B('**structured logging** = كل سطر JSON بحقول (الوقت، المستوى، الحدث، orderId). في Node **pino** الأسرع والأشهر؛ بيكتب JSON على stdout، والـ orchestrator أو Loki بيجمعوه. ومتسجلش أسرار ولا PII — pino فيه `redact` بمسارات.', '**structured logging** = every line JSON with fields (time, level, event, orderId). In Node **pino** is the fastest and most popular; it writes JSON to stdout, and the orchestrator or Loki collects it. And never log secrets or PII — pino has `redact` with paths.'),
          'import pino from "pino";\nimport pinoHttp from "pino-http";\n\nexport const log = pino({\n  level: process.env.LOG_LEVEL ?? "info",\n  redact: { paths: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.cardNumber"], censor: "***" },\n  base: { service: "shop-api", version: process.env.APP_VERSION },\n});\napp.use(pinoHttp({ logger: log, genReqId: req => req.headers["x-request-id"] ?? crypto.randomUUID() }));\n\nlog.info({ event: "order_paid", orderId: 1042, total: 650, gateway: "paymob" }, "order paid");', S),
        L(B('request id بـ AsyncLocalStorage', 'Request ids with AsyncLocalStorage'),
          B('عايز كل سطر لوج (حتى جوه دوال عميقة وفي callbacks async) فيه الـ request id من غير ما تمرره يدوي؟ **asynclocalstorage** (`node:async_hooks`) بيخزّن قيمة للطلب الحالي عبر كل الـ async. المثال logger بيضيف الـ id لوحده لطلبات متداخلة.', 'Want every log line (even deep in functions and async callbacks) to carry the request id without passing it by hand? **asynclocalstorage** (`node:async_hooks`) stores a value for the current request across all async work. The example is a logger adding the id automatically for interleaved requests.'),
          'import { AsyncLocalStorage } from "node:async_hooks";\nimport { randomUUID } from "node:crypto";\n\nconst als = new AsyncLocalStorage();\nconst log = (level, event, fields = {}) =>\n  console.log(JSON.stringify({ level, event, requestId: als.getStore()?.requestId ?? "-", ...fields }));\n\nasync function chargeCard(orderId) {               // deep in the code: no id parameter\n  await new Promise(r => setTimeout(r, Math.random() * 20));\n  log("info", "payment_captured", { orderId });\n}\nasync function handleRequest(orderId) {\n  return als.run({ requestId: randomUUID().slice(0, 8) }, async () => {\n    log("info", "request_start", { orderId });\n    await chargeCard(orderId);\n    log("info", "request_end", { orderId });\n  });\n}\nawait Promise.all([handleRequest(1042), handleRequest(1043), handleRequest(1044)]);', N()),
        L(B('المستويات والتكلفة', 'Levels and cost'),
          B('info للأحداث المهمة، warn للحاجات الغريبة، error للفشل، debug للتطوير بس (اقفله في الإنتاج أو اعمله sampling). اللوج بفلوس (تخزين وفهرسة) — 1 مليون طلب × 10 سطور debug = فاتورة. وسجّل الأحداث بأسماء ثابتة (`order_paid`) عشان تعدّ وتعمل dashboards.', 'info for important events, warn for odd things, error for failures, debug only during development (switch it off in production or sample it). Logs cost money (storage and indexing) — 1 million requests × 10 debug lines = a bill. And log events with stable names (`order_paid`) so you can count them and build dashboards.'),
          'log levels in production\nerror   invoice_failed {orderId, reason, err}            → alert if > 5 in 10 min\nwarn    odoo_slow {orderId, ms}                          → weekly review\ninfo    order_paid / order_shipped / refund_requested    → business dashboards\ndebug   off (LOG_LEVEL=info) · enable per request with a header for support cases\n\nnever: passwords, tokens, full card numbers, full addresses, whole request bodies', T)
      ],
      practice: [
        B('حوّل console.log لـ pino بحقول.', 'Switch console.log to pino with fields.'),
        B('ضيف redact لـ authorization وpassword.', 'Add redact for authorization and password.'),
        B('استخدم AsyncLocalStorage للـ request id.', 'Use AsyncLocalStorage for the request id.'),
        B('سمّي الأحداث بأسماء ثابتة.', 'Give events stable names.')
      ],
      words: [
        W('structured logging', 'لوج JSON بحقول', 'logging as fields, usually JSON', 'Structured logging made errors countable.'),
        W('pino', 'logger سريع لـ Node', 'a fast JSON logger for Node', 'pino writes JSON to stdout.'),
        W('redact', 'إخفاء حقول حساسة في اللوج', 'masking sensitive fields in logs', 'redact hides the authorization header.'),
        W('asynclocalstorage', 'تخزين لكل طلب عبر الـ async', 'per-request storage across async calls', 'AsyncLocalStorage carries the request id.'),
        W('log sampling', 'تسجيل نسبة من اللوج', 'keeping only a share of log lines', 'Log sampling cut costs by 80%.')
      ],
      read: [{ t: 'Node.js: Asynchronous context tracking', url: 'https://nodejs.org/api/async_context.html', what: B('اقرا AsyncLocalStorage.', 'Read AsyncLocalStorage.') }],
      challenge: B('خلّي لوج خدمة المتجر قابل للتحقيق: pino بـ redact، request id من header أو جديد عبر AsyncLocalStorage لحد الـ workers، أحداث بأسماء ثابتة، ومستويات مظبوطة — وجاوب «إيه اللي حصل لطلب 1042؟» من اللوج في دقيقة.', 'Make the shop service’s logs investigable: pino with redact, a request id from a header or new via AsyncLocalStorage reaching the workers, stable event names and correct levels — then answer «what happened to order 1042?» from the logs in a minute.'),
      quiz: [
        Q(B('request id من غير ما تمرره:', 'A request id without passing it around:'), [['AsyncLocalStorage', 'AsyncLocalStorage'], ['متغير global', 'a global variable'], ['ملف', 'a file']], 0, B('سياق.', 'Context.')),
        Q(B('authorization header في اللوج:', 'An authorization header in logs:'), [['redact', 'redact it'], ['سجّله كامل', 'log it in full'], ['اطبعه مرتين', 'print it twice']], 0, B('أسرار.', 'Secrets.')),
        Q(B('debug في الإنتاج:', 'debug in production:'), [['مقفول أو sampling', 'off or sampled'], ['دايمًا شغال', 'always on'], ['إجباري', 'required']], 0, B('تكلفة.', 'Cost.'))
      ] },

    { title: B('المقاييس والتتبع والأخطاء', 'Metrics, tracing and errors'),
      goal: B('تعرف صحة الخدمة في نظرة.', 'Know the service’s health at a glance.'),
      learn: [
        L(B('مقاييس Prometheus', 'Prometheus metrics'),
          B('**metrics**: counter (الطلبات، الأخطاء)، gauge (طول الطابور)، و**histogram** (زمن الاستجابة في buckets للـ p95). في Node **prom-client** بيعرض `/metrics` بصيغة **prometheus**، ومعاه مقاييس Node الافتراضية (event loop lag، الذاكرة، GC). المثال بيبني histogram ويطبع الصيغة.', '**metrics**: a counter (requests, errors), a gauge (queue length), and a **histogram** (response time in buckets for p95). In Node **prom-client** exposes `/metrics` in **prometheus** format, with Node’s default metrics (event-loop lag, memory, GC). The example builds a histogram and prints the format.'),
          'const buckets = [0.05, 0.1, 0.25, 0.5, 1, 2.5];\nconst h = { counts: Array(buckets.length + 1).fill(0), sum: 0, n: 0 };\nconst observe = s => { const i = buckets.findIndex(b => s <= b); h.counts[i === -1 ? buckets.length : i]++; h.sum += s; h.n++; };\nlet seed = 7; const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;\nfor (let i = 0; i < 1000; i++) observe(Math.exp(-2.4 + rand() * 2.2) * (rand() < 0.02 ? 6 : 1));   // fast, with a slow tail\n\nlet cum = 0;\nconst lines = buckets.map((b, i) => `http_request_duration_seconds_bucket{route="/orders/:id",le="${b}"} ${(cum += h.counts[i])}`);\nlines.push(`http_request_duration_seconds_bucket{route="/orders/:id",le="+Inf"} ${h.n}`);\nlines.push(`http_request_duration_seconds_sum{route="/orders/:id"} ${h.sum.toFixed(2)}`, `http_request_duration_seconds_count{route="/orders/:id"} ${h.n}`);\nconsole.log("# TYPE http_request_duration_seconds histogram\\n" + lines.join("\\n"));\nconst p95bucket = buckets.find((b, i) => h.counts.slice(0, i + 1).reduce((a, c) => a + c, 0) >= 0.95 * h.n);\nconsole.log(`≈ p95 ≤ ${p95bucket}s`);', N()),
        L(B('OpenTelemetry', 'OpenTelemetry'),
          B('**opentelemetry** لـ Node: auto-instrumentation لـ http وExpress وpg وundici (fetch) — بتشوف كل طلب كشجرة spans عبر الخدمات (API ← Odoo ← worker). ابدأه قبل أي import تاني (`--import ./otel.mjs`)، وابعت لـ Tempo/Jaeger أو Grafana Cloud، بـ sampling.', '**opentelemetry** for Node: auto-instrumentation for http, Express, pg and undici (fetch) — you see each request as a span tree across services (API → Odoo → worker). Start it before any other import (`--import ./otel.mjs`), and export to Tempo/Jaeger or Grafana Cloud, with sampling.'),
          '// otel.mjs — loaded with: node --import ./otel.mjs dist/server.js\nimport { NodeSDK } from "@opentelemetry/sdk-node";\nimport { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";\nimport { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";\nimport { TraceIdRatioBasedSampler, ParentBasedSampler } from "@opentelemetry/sdk-trace-base";\n\nnew NodeSDK({\n  serviceName: "shop-api",\n  traceExporter: new OTLPTraceExporter({ url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + "/v1/traces" }),\n  sampler: new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(0.2) }),\n  instrumentations: [getNodeAutoInstrumentations({ "@opentelemetry/instrumentation-fs": { enabled: false } })],\n}).start();', S),
        L(B('تتبع الأخطاء', 'Error tracking'),
          B('**error tracking** (**sentry** أو بدائل مفتوحة زي GlitchTip): كل exception بيتجمّع مع أمثاله، ومعاه الـ stack والطلب والإصدار، وبتعرف «خطأ جديد بعد نشر 1.9.0». ارفع **source maps** عشان الـ stack يبان بأسطر TypeScript الأصلية — ومتنشرهاش للعامة.', '**error tracking** (**sentry** or open alternatives like GlitchTip): every exception is grouped with similar ones, with the stack, the request and the release, so you know «a new error after deploying 1.9.0». Upload **source maps** so stacks show original TypeScript lines — and do not publish them publicly.'),
          'import * as Sentry from "@sentry/node";\n\nSentry.init({\n  dsn: process.env.SENTRY_DSN,\n  release: process.env.APP_VERSION,            // «new in 1.9.0» alerts\n  environment: process.env.APP_ENV,\n  tracesSampleRate: 0.1,\n  beforeSend(event) {                         // never send PII\n    delete event.request?.cookies;\n    if (event.request?.headers) delete event.request.headers.authorization;\n    return event;\n  },\n});\nSentry.setupExpressErrorHandler(app);          // after the routes\n// CI: upload source maps for this release, then delete them from the deployed image', S)
      ],
      practice: [
        B('اعرض /metrics بـ prom-client ومقاييس Node.', 'Expose /metrics with prom-client and Node metrics.'),
        B('اعمل dashboard RED في Grafana.', 'Build a RED dashboard in Grafana.'),
        B('شغّل OpenTelemetry وشوف trace لطلب.', 'Run OpenTelemetry and view a request trace.'),
        B('ضيف Sentry بـ beforeSend وsource maps.', 'Add Sentry with beforeSend and source maps.')
      ],
      words: [
        W('metrics', 'مقاييس رقمية مع الوقت', 'numbers tracked over time', 'Metrics show the trend.'),
        W('histogram', 'توزيع قيم في buckets', 'a distribution in buckets', 'Latency is a histogram.'),
        W('prometheus', 'نظام مقاييس بيسحب من /metrics', 'a metrics system scraping /metrics', 'Prometheus scrapes every 15 s.'),
        W('prom-client', 'مكتبة مقاييس Prometheus لـ Node', 'the Prometheus client for Node', 'prom-client exposes event-loop lag.'),
        W('opentelemetry', 'معيار المراقبة المفتوح', 'the open observability standard', 'OpenTelemetry traces the Odoo call.'),
        W('error tracking', 'تجميع وتتبع الأخطاء', 'grouping and tracking exceptions', 'Error tracking flagged a new bug.'),
        W('sentry', 'خدمة تتبع أخطاء', 'an error-tracking service', 'Sentry groups the TypeError.'),
        W('source maps', 'خرايط للكود الأصلي', 'maps from built code to source', 'Upload source maps privately.')
      ],
      read: [{ lib: 'OpenTelemetry JavaScript', what: B('اقرا Getting Started (Node.js).', 'Read Getting Started (Node.js).') }],
      challenge: B('ضيف المراقبة لخدمة المتجر: /metrics بـ RED لكل route ومقاييس Node وbusiness counters، dashboard في Grafana، OpenTelemetry بـ sampling 20%، وSentry بالإصدار وsource maps خاصة — ولاقي أبطأ نداء في trace حقيقي.', 'Add monitoring to the shop service: /metrics with RED per route, Node metrics and business counters, a Grafana dashboard, OpenTelemetry with 20% sampling, and Sentry with the release and private source maps — and find the slowest call in a real trace.'),
      quiz: [
        Q(B('p95 من:', 'p95 comes from:'), [['histogram', 'a histogram'], ['counter', 'a counter'], ['اللوج بس', 'logs only']], 0, B('توزيع.', 'Distribution.')),
        Q(B('OpenTelemetry يتحمّل:', 'OpenTelemetry is loaded:'), [['قبل أي import تاني', 'before any other import'], ['آخر حاجة', 'last'], ['في المتصفح بس', 'only in the browser']], 0, B('instrumentation.', 'Instrumentation.')),
        Q(B('source maps:', 'Source maps:'), [['ترفعها لـ Sentry ومتنشرهاش للعامة', 'upload to Sentry, don’t publish'], ['انشرها للكل', 'publish to all'], ['متعملهاش', 'never create them']], 0, B('خاص.', 'Private.'))
      ] },

    { title: B('SLOs والتنبيهات', 'SLOs and alerts'),
      goal: B('تنبيهات قليلة وكلها مهمة.', 'Few alerts, all meaningful.'),
      learn: [
        L(B('SLO وميزانية الأخطاء', 'SLO and error budget'),
          B('**slo** = هدف من وجهة نظر المستخدم («99.5% من طلبات الدفع تنجح في أقل من ثانية خلال 30 يوم»). الفرق لـ 100% = **error budget**. لو الميزانية بتخلص: وقّف الميزات الخطرة وركّز على الاعتمادية. والتنبيه على سرعة صرف الميزانية (burn rate) مش على CPU.', 'An **slo** = a target from the user’s view («99.5% of payment requests succeed in under a second over 30 days»). The gap to 100% = the **error budget**. If the budget is running out: pause risky features and focus on reliability. And alert on how fast the budget burns (burn rate), not on CPU.'),
          'const slo = 0.995;\nconst windowRequests = 420_000, bad = 1_470;\nconst budget = Math.round((1 - slo) * windowRequests);\nconsole.log(`SLI ${(100 * (1 - bad / windowRequests)).toFixed(2)}% · budget ${budget} bad requests · used ${(100 * bad / budget).toFixed(0)}%`);\n\nconst burn = (errorRatio) => errorRatio / (1 - slo);\nfor (const [window, ratio] of [["5 min", 0.09], ["1 h", 0.075], ["6 h", 0.02], ["3 days", 0.004]]) {\n  const b = burn(ratio);\n  console.log(`${window.padEnd(6)} error ratio ${(ratio * 100).toFixed(1)}% → burn ${b.toFixed(1)}× → ${b >= 14 ? "PAGE" : b >= 3 ? "ticket" : "ok"}`);\n}', N()),
        L(B('فحوصات من برّه وheartbeats', 'External checks and heartbeats'),
          B('**uptime monitoring** و**synthetic check**: سكربت من برّه بيعمل اللي العميل بيعمله كل دقيقة (يفتح الصفحة، يعمل طلب تجربة). وللمهام المجدولة: heartbeat بعد كل تشغيل ناجح؛ لو اتأخر = تنبيه — ده بيمسك cron وقف بصمت. المثال بيفحص heartbeats.', '**uptime monitoring** and a **synthetic check**: a script from outside doing what a customer does every minute (open the page, place a test order). For scheduled jobs: a heartbeat after each successful run; if it is late = an alert — this catches a cron that stopped silently. The example checks heartbeats.'),
          'const now = Date.parse("2026-10-04T09:40:00Z");\nconst jobs = [\n  { name: "daily-report", everyMin: 1440, last: "2026-10-04T04:01:00Z" },\n  { name: "sync-odoo", everyMin: 15, last: "2026-10-04T09:31:00Z" },\n  { name: "backup-db", everyMin: 1440, last: "2026-10-02T02:00:00Z" },\n  { name: "price-watch", everyMin: 60, last: "2026-10-04T08:10:00Z" },\n];\nfor (const j of jobs) {\n  const lateMin = (now - Date.parse(j.last)) / 60000 - j.everyMin;\n  const status = lateMin > j.everyMin * 0.25 ? `ALERT: ${Math.round(lateMin)} min overdue` : "ok";\n  console.log(j.name.padEnd(13), status);\n}', N()),
        L(B('on-call والـ postmortem', 'On-call and the postmortem'),
          B('**alert** واحد = حد هيعمل حاجة؛ لو محدش بيتصرف عليه، امسحه. **on-call**: مين بيستلم بالليل، وrunbook لكل تنبيه. وبعد أي حادثة: **postmortem** من غير لوم — الترتيب الزمني، ليه النظام سمح بيه، وإجراءات بمسؤولين ومواعيد.', 'One **alert** = someone will act; if nobody acts on it, delete it. **on-call**: who receives it at night, and a runbook for each alert. And after any incident: a blameless **postmortem** — the timeline, why the system allowed it, and actions with owners and dates.'),
          'alert: payments-burn-rate-fast\nwhen      burn rate ≥ 14× over 5 min AND 1 h\nwho       on-call (PagerDuty / Telegram group)\nrunbook   1. check Paymob status page  2. check last deploy → roll back by digest if < 2 h old\n          3. switch checkout banner «card payments delayed — cash on delivery available»\npostmortem (blameless) within 3 days: timeline · impact · why the system allowed it · 3 actions with owners', T)
      ],
      practice: [
        B('اكتب SLO لأهم مسار (الدفع أو الطلب).', 'Write an SLO for the most important path (payment or ordering).'),
        B('حط تنبيهات burn rate بدل CPU.', 'Set burn-rate alerts instead of CPU alerts.'),
        B('ضيف synthetic check وheartbeat لكل cron.', 'Add a synthetic check and a heartbeat for every cron.'),
        B('اكتب runbook لكل تنبيه.', 'Write a runbook for each alert.')
      ],
      words: [
        W('slo', 'هدف مستوى الخدمة', 'a service level objective', 'Our SLO is 99.5% over 30 days.'),
        W('error budget', 'ميزانية الأخطاء المسموحة', 'the failures an SLO allows', 'We used 70% of the error budget.'),
        W('burn rate', 'سرعة صرف الميزانية', 'how fast the error budget is spent', 'A 14× burn rate pages on-call.'),
        W('uptime monitoring', 'مراقبة إن الخدمة شغالة', 'checking a service is reachable', 'Uptime monitoring pings /livez.'),
        W('synthetic check', 'فحص بيقلّد المستخدم', 'a scripted user journey check', 'A synthetic check places a test order.'),
        W('alert', 'تنبيه', 'a notification needing action', 'Every alert has a runbook.'),
        W('on-call', 'المناوبة', 'being responsible for responding to alerts', 'On-call rotates weekly.'),
        W('postmortem', 'تحليل ما بعد الحادثة', 'a review after an incident', 'The postmortem listed three actions.')
      ],
      read: [{ t: 'Google SRE Workbook: Alerting on SLOs', url: 'https://sre.google/workbook/alerting-on-slos/', what: B('اقرا Burn rate.', 'Read Burn rate.') }],
      challenge: B('اعمل نظام تنبيهات لخدمة المتجر: SLO للدفع وواحد للـ API، تنبيهات burn rate (page وticket)، synthetic check كل 5 دقايق، heartbeat لكل cron، runbook لكل تنبيه، وتمرين حادثة بـ postmortem — وامسح أي تنبيه محدش بيتصرف عليه.', 'Build alerting for the shop service: an SLO for payments and one for the API, burn-rate alerts (page and ticket), a 5-minute synthetic check, a heartbeat for every cron, a runbook for every alert, and an incident drill with a postmortem — and delete any alert nobody acts on.'),
      quiz: [
        Q(B('SLO 99.5% على 400 ألف طلب:', 'A 99.5% SLO over 400,000 requests:'), [['ميزانية 2000 طلب فاشل', 'a budget of 2,000 failed requests'], ['صفر', 'zero'], ['200 ألف', '200,000']], 0, B('0.5%.', '0.5%.')),
        Q(B('تنبيه CPU 80% بالليل:', 'A CPU-80% alert at night:'), [['غالبًا متصحّيش حد', 'usually don’t page'], ['page فورًا', 'page at once'], ['أهم تنبيه', 'the most important alert']], 0, B('أعراض.', 'Symptoms.')),
        Q(B('cron وقف بصمت:', 'A cron stopped silently:'), [['heartbeat', 'a heartbeat'], ['اللوج بس', 'only logs'], ['مستحيل يتكشف', 'undetectable']], 0, B('إشارة.', 'Signal.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('من commit لإنتاج مراقَب.', 'From commit to monitored production.'),
      review: [
        B('CI بـ matrix وكاش وخدمات وbranch protection وrelease-please.', 'CI with matrices, caching, services, branch protection and release-please.'),
        B('البيئات والموافقة وOIDC والـ previews.', 'Environments, approval, OIDC and previews.'),
        B('pino وredact وAsyncLocalStorage.', 'pino, redact and AsyncLocalStorage.'),
        B('prom-client وOpenTelemetry وSentry.', 'prom-client, OpenTelemetry and Sentry.'),
        B('SLOs وburn rate وheartbeats والـ postmortems.', 'SLOs, burn rates, heartbeats and postmortems.')
      ],
      project: B('مشروع الأسبوع «خط تسليم ومراقبة» لخدمة المتجر: CI بـ lint وtsc وmatrix وintegration بـ Postgres، branch protection، release-please، صورة بـ digest لـ staging تلقائي وproduction بموافقة وOIDC، pino بـ redact وrequest id عبر AsyncLocalStorage، /metrics وdashboard، OpenTelemetry وSentry، SLOs بتنبيهات burn rate وheartbeats وrunbooks — وتمرين حادثة بـ postmortem.', 'Week project «delivery and monitoring pipeline» for the shop service: CI with lint, tsc, a matrix and integration with Postgres, branch protection, release-please, an image by digest to automatic staging and approved production with OIDC, pino with redact and a request id via AsyncLocalStorage, /metrics and a dashboard, OpenTelemetry and Sentry, SLOs with burn-rate alerts, heartbeats and runbooks — and an incident drill with a postmortem.'),
      test: [
        Q(B('matrix:', 'A matrix:'), [['تشغيل على تركيبات نسخ وأنظمة', 'runs across version/OS combinations'], ['جدول بيانات', 'a data table'], ['فيلم', 'a film']], 0, B('تغطية.', 'Coverage.')),
        Q(B('concurrency بـ cancel-in-progress:', 'concurrency with cancel-in-progress:'), [['يلغي التشغيل القديم لنفس الفرع', 'cancels older runs on the same branch'], ['يشغّل أكتر', 'runs more'], ['يمسح الفرع', 'deletes the branch']], 0, B('توفير.', 'Saving.')),
        Q(B('services: postgres في CI:', 'services: postgres in CI:'), [['قاعدة حقيقية لاختبارات التكامل', 'a real database for integration tests'], ['إنتاج', 'production'], ['mock', 'a mock']], 0, B('تكامل.', 'Integration.')),
        Q(B('release please:', 'release please:'), [['PR بالإصدار والـ changelog', 'a PR with the version and changelog'], ['يطلب إذن', 'asks permission'], ['يحذف الإصدارات', 'deletes releases']], 0, B('آلي.', 'Automated.')),
        Q(B('production environment بـ reviewers:', 'A production environment with reviewers:'), [['بيستنى موافقة', 'waits for approval'], ['بينشر فورًا', 'deploys at once'], ['مش بينشر', 'never deploys']], 0, B('بوابة.', 'Gate.')),
        Q(B('OIDC:', 'OIDC:'), [['توكن مؤقت لريبو وبيئة', 'a short-lived token for a repo and environment'], ['مفتاح دائم', 'a permanent key'], ['كلمة سر', 'a password']], 0, B('مؤقت.', 'Short-lived.')),
        Q(B('pino:', 'pino:'), [['logger JSON سريع', 'a fast JSON logger'], ['قاعدة بيانات', 'a database'], ['framework', 'a framework']], 0, B('لوج.', 'Logs.')),
        Q(B('AsyncLocalStorage:', 'AsyncLocalStorage:'), [['قيمة لكل طلب عبر الـ async', 'a per-request value across async work'], ['localStorage في Node', 'localStorage in Node'], ['كاش', 'a cache']], 0, B('سياق.', 'Context.')),
        Q(B('label بقيمة orderId في Prometheus:', 'A label holding orderId in Prometheus:'), [['غلط: cardinality عالي', 'wrong: high cardinality'], ['ممتاز', 'excellent'], ['إجباري', 'required']], 0, B('سلاسل.', 'Series.')),
        Q(B('Sentry release:', 'The Sentry release:'), [['يعرّف «خطأ جديد بعد نشر»', 'reveals «new error after a deploy»'], ['اسم الشركة', 'the company name'], ['مش مهم', 'unimportant']], 0, B('إصدار.', 'Version.')),
        Q(B('burn rate 14×:', 'A 14× burn rate:'), [['page', 'page'], ['تجاهل', 'ignore'], ['إيميل الشهر الجاي', 'an email next month']], 0, B('خطر.', 'Danger.')),
        Q(B('تنبيه محدش بيتصرف عليه:', 'An alert nobody acts on:'), [['امسحه', 'delete it'], ['ضاعفه', 'duplicate it'], ['سيبه', 'keep it']], 0, B('ضوضاء.', 'Noise.'))
      ] }
  ]
};
