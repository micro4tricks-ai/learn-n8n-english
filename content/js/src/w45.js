// JavaScript week 45 — Docker and deploying Node.
// The Dockerfile linter, graceful HTTP shutdown, env parsing, health-gated rollout and tag builder run in Node;
// Dockerfiles, compose files and server configuration are shown only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('Docker ونشر Node', 'Docker and deploying Node'),
  goal: B('تنشر تطبيقات Node بثقة: صور Docker صغيرة وآمنة وسريعة البناء، Node بيتصرف صح جوه container (إشارات، ذاكرة، لوج، صحة)، compose للتطوير والإنتاج، نشر على VPS بـ HTTPS وتحديثات من غير توقف، ونظافة الصور.',
          'Deploy Node apps with confidence: small, secure, fast-building Docker images, Node behaving correctly inside a container (signals, memory, logs, health), compose for development and production, deployment to a VPS with HTTPS and zero-downtime updates, and image hygiene.'),
  days: [
    { title: B('Dockerfile لـ Node', 'A Dockerfile for Node'),
      goal: B('صورة صغيرة وآمنة وسريعة.', 'A small, secure, fast image.'),
      learn: [
        L(B('multi-stage', 'Multi-stage'),
          B('**dockerfile** محترف لـ Node: **multi-stage build** — مرحلة بتثبّت كل الاعتماديات وتبني TypeScript، ومرحلة نهائية فيها `dist/` واعتماديات الإنتاج بس (`npm ci --omit=dev`). **base image**: `node:22-slim` بداية كويسة؛ **alpine** أصغر بس بـ musl (مشاكل مع مكتبات native أحيانًا)؛ **distroless** أصغر وأأمن (مفيش shell). وشغّل كـ **non-root user** (`USER node`).', 'A professional Node **dockerfile**: a **multi-stage build** — one stage installs all dependencies and builds TypeScript, and a final stage contains only `dist/` and production dependencies (`npm ci --omit=dev`). **base image**: `node:22-slim` is a good start; **alpine** is smaller but uses musl (sometimes trouble with native modules); **distroless** is smaller and safer (no shell). And run as a **non-root user** (`USER node`).'),
          '# syntax=docker/dockerfile:1\nFROM node:22-slim AS build\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN --mount=type=cache,target=/root/.npm npm ci\nCOPY tsconfig.json ./\nCOPY src ./src\nRUN npm run build && npm prune --omit=dev\n\nFROM node:22-slim\nENV NODE_ENV=production\nWORKDIR /app\nCOPY --from=build --chown=node:node /app/node_modules ./node_modules\nCOPY --from=build --chown=node:node /app/dist ./dist\nCOPY --chown=node:node package.json ./\nUSER node\nEXPOSE 3000\nHEALTHCHECK --interval=15s --timeout=3s CMD ["node", "dist/healthcheck.js"]\nCMD ["node", "dist/server.js"]', T),
        L(B('ترتيب الطبقات و.dockerignore', 'Layer order and .dockerignore'),
          B('**layer caching**: انسخ `package.json` و`package-lock.json` وثبّت قبل ما تنسخ الكود — تعديل سطر كود ميعيدش `npm ci`. و**.dockerignore** بيمنع `node_modules` و`.env` و`.git` إنها تدخل الـ build (أسرع، وأسرار متتسربش جوه الصورة).', '**layer caching**: copy `package.json` and `package-lock.json` and install before copying the code — editing one line of code does not rerun `npm ci`. And **.dockerignore** keeps `node_modules`, `.env` and `.git` out of the build (faster, and no secrets leak into the image).'),
          '# .dockerignore\nnode_modules\ndist\n.git\n.env\n.env.*\n!.env.example\ncoverage\n*.log\nDockerfile*\ndocker-compose*.yml\n\nrebuild after editing src/orders.ts:\n  FROM node:22-slim            CACHED\n  COPY package*.json           CACHED\n  RUN npm ci                   CACHED   ← no reinstall\n  COPY src                     re-run\n  RUN npm run build            re-run (6 s)', T),
        L(B('فاحص Dockerfile', 'A Dockerfile checker'),
          B('أخطاء شائعة في Dockerfiles بتاعة Node: `node:latest`، `npm install` بدل `npm ci`، `COPY . .` قبل التثبيت، أسرار في `ENV`، تشغيل كـ root، و`CMD npm start` (npm بيبلع إشارة SIGTERM). المثال فاحص صغير؛ في الحقيقة استخدم hadolint.', 'Common mistakes in Node Dockerfiles: `node:latest`, `npm install` instead of `npm ci`, `COPY . .` before installing, secrets in `ENV`, running as root, and `CMD npm start` (npm swallows the SIGTERM signal). The example is a tiny checker; in practice use hadolint.'),
          'const dockerfile = `FROM node:latest\nWORKDIR /app\nCOPY . .\nRUN npm install\nENV STRIPE_SECRET=abc123\nCMD npm start`;\nconst lines = dockerfile.split("\\n");\nconst issues = [];\nlines.forEach((l, i) => {\n  const n = i + 1;\n  if (/^FROM\\s+node(:latest)?\\s*$/.test(l)) issues.push([n, "pin the Node version, e.g. node:22-slim"]);\n  if (/npm install(?!\\s+-g)/.test(l)) issues.push([n, "use npm ci (exact lockfile, faster)"]);\n  if (/^ENV\\s+\\w*(SECRET|TOKEN|PASSWORD|KEY)\\w*=/i.test(l)) issues.push([n, "secret baked into the image — pass it at runtime"]);\n  if (/^CMD\\s+npm\\b/.test(l) || /^CMD\\s+[^\\[]/.test(l)) issues.push([n, "use CMD [\\"node\\", \\"dist/server.js\\"] so SIGTERM reaches Node"]);\n});\nconst copyAll = lines.findIndex(l => l.startsWith("COPY . .")), install = lines.findIndex(l => /npm (ci|install)/.test(l));\nif (copyAll !== -1 && copyAll < install) issues.push([copyAll + 1, "copy package*.json and install before copying the code"]);\nif (!lines.some(l => l.startsWith("USER "))) issues.push([lines.length, "add USER node — don\'t run as root"]);\nfor (const [n, msg] of issues.sort((a, b) => a[0] - b[0])) console.log(`line ${n}: ${msg}`);', N())
      ],
      practice: [
        B('اكتب Dockerfile multi-stage لخدمة Express عندك.', 'Write a multi-stage Dockerfile for one of your Express services.'),
        B('قارن حجم slim وalpine وdistroless.', 'Compare slim, alpine and distroless sizes.'),
        B('اعمل .dockerignore وقيس زمن إعادة البناء.', 'Create a .dockerignore and time a rebuild.'),
        B('شغّل hadolint (أو الفاحص) وصلّح.', 'Run hadolint (or the checker) and fix.')
      ],
      words: [
        W('dockerfile', 'ملف وصف بناء الصورة', 'the file describing how to build an image', 'The Dockerfile has two stages.'),
        W('multi-stage build', 'بناء على مراحل', 'a build with separate build and runtime stages', 'A multi-stage build dropped 600 MB.'),
        W('base image', 'الصورة الأساسية', 'the image a build starts from', 'node:22-slim is our base image.'),
        W('alpine', 'توزيعة لينكس صغيرة جدًا', 'a tiny Linux distribution', 'Alpine uses musl instead of glibc.'),
        W('distroless', 'صورة من غير نظام كامل', 'an image with only the runtime', 'Distroless images have no shell.'),
        W('layer caching', 'إعادة استخدام طبقات البناء', 'reusing unchanged build layers', 'Layer caching skips npm ci.'),
        W('.dockerignore', 'ملف استبعاد من الـ build', 'files excluded from the build context', 'Add .env to .dockerignore.'),
        W('non-root user', 'مستخدم عادي مش root', 'a user without admin rights', 'Run Node as a non-root user.')
      ],
      read: [{ lib: 'Docker: Node.js guide', what: B('اقرا Containerize وDevelop.', 'Read Containerize and Develop.') }],
      challenge: B('اعمل Dockerfile إنتاج لخدمة المتجر: multi-stage بـ TypeScript، npm ci بكاش، slim مثبّتة، USER node، HEALTHCHECK، CMD بصيغة exec، و.dockerignore — وقارن الحجم وزمن إعادة البناء بنسخة ساذجة.', 'Write a production Dockerfile for the shop service: multi-stage with TypeScript, cached npm ci, a pinned slim base, USER node, a HEALTHCHECK, an exec-form CMD and a .dockerignore — and compare size and rebuild time with a naive version.'),
      quiz: [
        Q(B('npm install ولا npm ci في الصورة؟', 'npm install or npm ci in the image?'), [['npm ci', 'npm ci'], ['npm install', 'npm install'], ['yarn global', 'yarn global']], 0, B('lockfile.', 'Lockfile.')),
        Q(B('CMD npm start:', 'CMD npm start:'), [['npm ممكن يبلع SIGTERM', 'npm may swallow SIGTERM'], ['أحسن صيغة', 'the best form'], ['أسرع', 'faster']], 0, B('إشارات.', 'Signals.')),
        Q(B('.env جوه الصورة:', '.env inside the image:'), [['غلط: .dockerignore', 'wrong: use .dockerignore'], ['ضروري', 'necessary'], ['عادي', 'fine']], 0, B('أسرار.', 'Secrets.'))
      ] },

    { title: B('Node جوه الـ container', 'Node inside the container'),
      goal: B('بيقفل بأدب وميقعش من الذاكرة.', 'Shuts down gracefully and never runs out of memory.'),
      learn: [
        L(B('PID 1 والإشارات', 'PID 1 and signals'),
          B('في الـ container، Node بيبقى **pid 1** — وPID 1 مش بيتعامل مع الإشارات افتراضيًا زي العمليات العادية. يعني `docker stop` بيستنى 10 ثواني ويقتل. الحل: `docker run --init` (أو **tini**) وCMD بصيغة exec، وhandler لـ **sigterm** في الكود.', 'In a container, Node becomes **pid 1** — and PID 1 does not handle signals by default like normal processes. So `docker stop` waits 10 seconds and kills. The fix: `docker run --init` (or **tini**) and an exec-form CMD, plus a **sigterm** handler in the code.'),
          '# compose.yaml\nservices:\n  api:\n    image: ghcr.io/acme/shop-api@sha256:…\n    init: true                     # tini as PID 1: forwards signals, reaps zombies\n    stop_grace_period: 30s         # time between SIGTERM and SIGKILL\n    environment:\n      NODE_OPTIONS: "--max-old-space-size=384"   # heap below the container memory limit\n    deploy:\n      resources: { limits: { memory: 512M } }', T),
        L(B('الإقفال بأدب لـ HTTP', 'Graceful HTTP shutdown'),
          B('لما SIGTERM ييجي: بطّل تاخد اتصالات جديدة (`server.close()`)، سيب الطلبات الجارية تخلص، اقفل keep-alive الفاضية (`closeIdleConnections`)، اقفل قاعدة البيانات، واخرج — ومعاك سقف وقت. المثال بيشغّل سيرفر حقيقي وطلب بطيء، ويبعت SIGTERM في النص.', 'When SIGTERM arrives: stop accepting new connections (`server.close()`), let in-flight requests finish, close idle keep-alive connections (`closeIdleConnections`), close the database and exit — with a time cap. The example runs a real server and a slow request, and sends SIGTERM midway.'),
          'import { createServer } from "node:http";\nconst server = createServer(async (req, res) => {\n  if (req.url === "/slow") await new Promise(r => setTimeout(r, 300));     // e.g. generating an invoice\n  res.end(`done ${req.url}\\n`);\n});\nawait new Promise(r => server.listen(0, "127.0.0.1", r));\nconst base = `http://127.0.0.1:${server.address().port}`;\n\nlet shuttingDown = false;\nprocess.on("SIGTERM", () => {\n  shuttingDown = true;\n  console.log("SIGTERM: stop accepting, finish in-flight requests");\n  server.close(() => { console.log("all requests finished — closing DB and exiting"); });\n  server.closeIdleConnections();\n  setTimeout(() => { console.log("forced exit after 10 s"); process.exit(1); }, 10_000).unref();\n});\n\nconst slow = fetch(base + "/slow").then(r => r.text());\nawait new Promise(r => setTimeout(r, 50));\nprocess.emit("SIGTERM");                         // what docker stop sends\nconsole.log("slow request got:", (await slow).trim());\nconst late = await fetch(base + "/new").then(r => r.status, e => "refused (" + e.cause?.code + ")");\nconsole.log("new request after SIGTERM:", late, "| shuttingDown =", shuttingDown);', N()),
        L(B('الذاكرة واللوج والصحة', 'Memory, logs and health'),
          B('V8 مش عارف حد ذاكرة الـ container لوحده دايمًا — حدّد **max-old-space-size** (بـ **node_options**) أقل من الحد (~75%) عشان GC يشتغل قبل ما الـ container يتقتل OOM. واللوج JSON على stdout (الـ orchestrator بيجمعه). وendpoints `/livez` (العملية عايشة) و`/readyz` (القاعدة متوصلة ومش بنقفل).', 'V8 does not always know the container’s memory limit — set **max-old-space-size** (via **node_options**) below the limit (~75%) so GC runs before the container is OOM-killed. Log JSON to stdout (the orchestrator collects it). And `/livez` (the process is alive) and `/readyz` (the database is connected and we are not shutting down) endpoints.'),
          'app.get("/livez", (req, res) => res.json({ ok: true }));\napp.get("/readyz", async (req, res) => {\n  if (shuttingDown) return res.status(503).json({ ready: false, reason: "shutting down" });\n  try { await pool.query("SELECT 1"); res.json({ ready: true }); }\n  catch { res.status(503).json({ ready: false, reason: "db" }); }\n});\n// memory: container limit 512M → NODE_OPTIONS=--max-old-space-size=384\nsetInterval(() => {\n  const { heapUsed, rss } = process.memoryUsage();\n  log.info({ event: "memory", heapMB: Math.round(heapUsed / 1e6), rssMB: Math.round(rss / 1e6) });\n}, 60_000).unref();', S)
      ],
      practice: [
        B('شغّل الـ container بـ --init وجرّب docker stop.', 'Run the container with --init and try docker stop.'),
        B('ضيف graceful shutdown لسيرفرك.', 'Add graceful shutdown to your server.'),
        B('حدّد max-old-space-size حسب حد الذاكرة.', 'Set max-old-space-size from the memory limit.'),
        B('اعمل /livez و/readyz منفصلين.', 'Create separate /livez and /readyz endpoints.')
      ],
      words: [
        W('pid 1', 'أول عملية في الـ container', 'the first process in a container', 'Node as PID 1 ignores signals by default.'),
        W('tini', 'init صغير بيوصّل الإشارات', 'a tiny init forwarding signals', 'init: true runs tini.'),
        W('sigterm', 'إشارة طلب الإقفال', 'the signal asking a process to stop', 'Handle SIGTERM to finish requests.'),
        W('closeidleconnections', 'قفل اتصالات keep-alive الفاضية', 'closing idle keep-alive connections', 'Call closeIdleConnections during shutdown.'),
        W('max-old-space-size', 'حد ذاكرة V8', 'the V8 heap size limit', 'Set max-old-space-size to 384.'),
        W('node_options', 'خيارات Node من البيئة', 'Node flags set via the environment', 'NODE_OPTIONS carries the heap limit.'),
        W('oom kill', 'قتل العملية لنفاد الذاكرة', 'a process killed for using too much memory', 'The worker died by OOM kill.')
      ],
      read: [{ lib: 'Node.js best practices', what: B('اقرا Docker Best Practices.', 'Read Docker Best Practices.') }],
      challenge: B('خلّي خدمة Node «صديقة للـ containers»: init، SIGTERM بيقفل HTTP والقاعدة والـ workers بأدب، max-old-space-size مظبوط، لوج JSON، livez وreadyz — وجرّب نشر جديد وانت بتبعت طلبات مستمرة ومفيش طلب واحد يفشل.', 'Make a Node service «container-friendly»: init, SIGTERM closing HTTP, the database and workers gracefully, a tuned max-old-space-size, JSON logs, livez and readyz — then test a new deploy under continuous requests with not one request failing.'),
      quiz: [
        Q(B('docker stop بياخد 10 ثواني:', 'docker stop takes 10 seconds:'), [['Node كـ PID 1 مش بيستقبل SIGTERM: init', 'Node as PID 1 ignores SIGTERM: use init'], ['طبيعي', 'normal'], ['Docker بطيء', 'Docker is slow']], 0, B('إشارات.', 'Signals.')),
        Q(B('بعد SIGTERM:', 'After SIGTERM:'), [['خلّص الطلبات الجارية ومتقبلش جديد', 'finish in-flight requests, accept no new ones'], ['اقفل فورًا', 'exit at once'], ['تجاهل', 'ignore it']], 0, B('أدب.', 'Graceful.')),
        Q(B('container بـ 512M:', 'A 512M container:'), [['max-old-space-size ≈ 384', 'max-old-space-size ≈ 384'], ['4096', '4096'], ['مش مهم', 'irrelevant']], 0, B('OOM.', 'OOM.'))
      ] },

    { title: B('docker compose', 'docker compose'),
      goal: B('البيئة كلها بأمر واحد.', 'The whole environment with one command.'),
      learn: [
        L(B('compose للتطوير', 'Compose for development'),
          B('**docker compose** بيشغّل التطبيق وPostgres وRedis وn8n مع بعض بإعدادات ثابتة لكل الفريق. `depends_on` بـ `condition: service_healthy` بيستنى القاعدة تبقى جاهزة فعلًا، والـ **volumes** بتحفظ البيانات، وفي التطوير volume للكود مع `node --watch`.', '**docker compose** runs the app, Postgres, Redis and n8n together with the same settings for the whole team. `depends_on` with `condition: service_healthy` waits until the database is really ready, **volumes** keep the data, and in development a code volume with `node --watch`.'),
          'services:\n  api:\n    build: .\n    command: ["node", "--watch", "src/server.js"]          # dev only\n    volumes: ["./src:/app/src"]\n    env_file: .env\n    ports: ["3000:3000"]\n    depends_on:\n      db: { condition: service_healthy }\n  db:\n    image: postgres:17\n    environment: { POSTGRES_DB: shop, POSTGRES_USER: shop, POSTGRES_PASSWORD_FILE: /run/secrets/db_password }\n    secrets: [db_password]\n    volumes: ["pgdata:/var/lib/postgresql/data"]\n    healthcheck: { test: ["CMD", "pg_isready", "-U", "shop"], interval: 5s, retries: 10 }\n  n8n:\n    image: docker.n8n.io/n8nio/n8n:1.110.1\n    ports: ["5678:5678"]\n    volumes: ["n8ndata:/home/node/.n8n"]\nvolumes: { pgdata: {}, n8ndata: {} }\nsecrets: { db_password: { file: ./secrets/db_password.txt } }', T),
        L(B('متغيرات البيئة', 'Environment variables'),
          B('الإعدادات من البيئة (twelve-factor). Node فيه `process.loadEnvFile()` و`util.parseEnv()` لقراية ملفات `.env` من غير مكتبات. قاعدة: `.env.example` في Git بأسماء المتغيرات بس، و`.env` الحقيقي برّه Git، والأسرار في الإنتاج من secret manager أو Docker secrets.', 'Configuration comes from the environment (twelve-factor). Node has `process.loadEnvFile()` and `util.parseEnv()` to read `.env` files without libraries. The rule: `.env.example` in Git with variable names only, the real `.env` outside Git, and production secrets from a secret manager or Docker secrets.'),
          'import { parseEnv } from "node:util";\n\nconst example = `# .env.example (committed)\\nDATABASE_URL=\\nN8N_WEBHOOK_URL=\\nPORT=3000\\nLOG_LEVEL=info`;\nconst real = `# .env (never committed)\\nDATABASE_URL=postgres://shop:dev-only@db:5432/shop\\nN8N_WEBHOOK_URL=https://n8n.example.com/webhook/orders\\nLOG_LEVEL=debug\\nEXTRA="quoted value"`;\n\nconst want = Object.keys(parseEnv(example));\nconst have = parseEnv(real);\nconst missing = want.filter(k => !(k in have) && !parseEnv(example)[k]);\nconst unknown = Object.keys(have).filter(k => !want.includes(k));\nconsole.log("parsed:", { ...have, DATABASE_URL: have.DATABASE_URL.replace(/:[^:@/]+@/, ":***@") });\nconsole.log("missing (no default):", missing, "| not in .env.example:", unknown);', N()),
        L(B('compose للإنتاج', 'Compose for production'),
          B('لـ VPS واحد compose كفاية جدًا للإنتاج: ملف منفصل (`compose.prod.yaml`) بالصور المبنية بالـ digest (مش build)، `restart: unless-stopped`، حدود ذاكرة، لوج بحجم محدود، ومفيش ports مفتوحة غير الـ reverse proxy. وbackups يومية لـ volume القاعدة لبرّه السيرفر.', 'For a single VPS, compose is quite enough for production: a separate file (`compose.prod.yaml`) using built images by digest (not build), `restart: unless-stopped`, memory limits, size-capped logs, and no open ports except the reverse proxy. And daily backups of the database volume to somewhere off the server.'),
          '# compose.prod.yaml\nservices:\n  caddy:\n    image: caddy:2\n    ports: ["80:80", "443:443"]\n    volumes: ["./Caddyfile:/etc/caddy/Caddyfile", "caddydata:/data"]\n    restart: unless-stopped\n  api:\n    image: ghcr.io/acme/shop-api@sha256:4f1c…           # built in CI, never on the server\n    init: true\n    env_file: /etc/shop/api.env\n    restart: unless-stopped\n    deploy: { resources: { limits: { memory: 512M } } }\n    logging: { driver: json-file, options: { max-size: "20m", max-file: "5" } }\n    # no ports: only Caddy talks to it over the compose network\n  db:\n    image: postgres:17\n    volumes: ["pgdata:/var/lib/postgresql/data"]\n    restart: unless-stopped\nvolumes: { caddydata: {}, pgdata: {} }', T)
      ],
      practice: [
        B('اعمل compose للتطوير بـ api وdb وn8n.', 'Write a dev compose with api, db and n8n.'),
        B('استخدم depends_on بـ service_healthy.', 'Use depends_on with service_healthy.'),
        B('اعمل .env.example وتحقق من الناقص.', 'Create .env.example and check for missing variables.'),
        B('اكتب compose.prod.yaml بالـ digest.', 'Write compose.prod.yaml using digests.')
      ],
      words: [
        W('docker compose', 'تشغيل كذا container مع بعض', 'running multi-container apps', 'docker compose up starts everything.'),
        W('volumes', 'تخزين دائم للـ containers', 'persistent storage for containers', 'Postgres data lives in volumes.'),
        W('service_healthy', 'استنى الخدمة تبقى سليمة', 'waiting until a service passes its healthcheck', 'depends_on uses service_healthy.'),
        W('parseenv', 'فك ملف .env في Node', 'parsing .env text in Node', 'util.parseEnv reads the example file.'),
        W('docker secrets', 'أسرار بتتحط كملفات في الـ container', 'secrets mounted as files', 'The DB password comes from Docker secrets.')
      ],
      read: [{ t: 'Docker: Compose file reference', url: 'https://docs.docker.com/reference/compose-file/', what: B('اقرا services وhealthcheck وdepends_on.', 'Read services, healthcheck and depends_on.') }],
      challenge: B('اعمل بيئة compose كاملة للمتجر: dev (api بـ watch، Postgres، Redis، n8n، Mailpit) وprod (Caddy، api بالـ digest، db، backups) — وREADME «شغّل المشروع في 5 دقايق» وفحص .env ضد .env.example.', 'Build a full compose environment for the shop: dev (api with watch, Postgres, Redis, n8n, Mailpit) and prod (Caddy, api by digest, db, backups) — plus a «run the project in 5 minutes» README and a check of .env against .env.example.'),
      quiz: [
        Q(B('الـ API يبدأ قبل ما القاعدة تجهز:', 'The API starts before the database is ready:'), [['depends_on بـ service_healthy', 'depends_on with service_healthy'], ['sleep 30', 'sleep 30'], ['أعد التشغيل يدوي', 'restart by hand']], 0, B('صحة.', 'Health.')),
        Q(B('.env في Git:', '.env in Git:'), [['لأ: .env.example بس', 'no: only .env.example'], ['أيوه', 'yes'], ['مضغوط', 'compressed']], 0, B('أسرار.', 'Secrets.')),
        Q(B('الإنتاج على VPS:', 'Production on a VPS:'), [['صور بالـ digest من CI', 'images by digest from CI'], ['build على السيرفر', 'build on the server'], ['git pull وnode', 'git pull and node']], 0, B('ثبات.', 'Reproducible.'))
      ] },

    { title: B('النشر على VPS', 'Deploying to a VPS'),
      goal: B('HTTPS وتحديثات من غير توقف.', 'HTTPS and zero-downtime updates.'),
      learn: [
        L(B('Caddy وHTTPS', 'Caddy and HTTPS'),
          B('**caddy** = reverse proxy بيجيب شهادة HTTPS من Let’s Encrypt ويجدّدها لوحده. Caddyfile بسطرين بيوجّه الدومين للـ API، وبيضيف ضغط وheaders. بديل: nginx + certbot. وعلى الـ **vps**: firewall (ufw) يفتح 22/80/443 بس، ودخول SSH بمفاتيح.', '**caddy** = a reverse proxy that obtains and renews HTTPS certificates from Let’s Encrypt by itself. A two-line Caddyfile routes the domain to the API and adds compression and headers. Alternative: nginx + certbot. And on the **vps**: a firewall (ufw) opening only 22/80/443, and SSH login with keys.'),
          '# Caddyfile\napi.shop.example.com {\n    encode zstd gzip\n    reverse_proxy api:3000 {\n        health_uri /readyz\n        health_interval 5s\n    }\n    header {\n        Strict-Transport-Security "max-age=31536000"\n        -Server\n    }\n}\nn8n.shop.example.com {\n    reverse_proxy n8n:5678\n}\n\n# server basics\nufw allow 22,80,443/tcp && ufw enable\n# /etc/ssh/sshd_config: PasswordAuthentication no', T),
        L(B('pm2 ولا systemd ولا Docker', 'pm2, systemd or Docker'),
          B('3 طرق تشغّل Node دايم على VPS: **pm2** (process manager لـ Node: إعادة تشغيل، cluster، لوج)، **systemd** (مدمج في Linux، بسيط وموثوق)، أو Docker/compose (نفس البيئة في كل مكان). للمشاريع الجديدة: Docker + compose. pm2 لسه كويس للمشاريع البسيطة من غير containers.', 'Three ways to run Node permanently on a VPS: **pm2** (a Node process manager: restarts, cluster, logs), **systemd** (built into Linux, simple and reliable), or Docker/compose (the same environment everywhere). For new projects: Docker + compose. pm2 is still fine for simple projects without containers.'),
          '# systemd unit: /etc/systemd/system/shop-api.service\n[Unit]\nDescription=Shop API\nAfter=network-online.target\n\n[Service]\nUser=shop\nWorkingDirectory=/opt/shop-api\nEnvironmentFile=/etc/shop/api.env\nExecStart=/usr/bin/node dist/server.js\nRestart=on-failure\nKillSignal=SIGTERM\nTimeoutStopSec=30\n\n[Install]\nWantedBy=multi-user.target\n\n# pm2 alternative:  pm2 start dist/server.js -i 2 --name shop-api && pm2 save && pm2 startup', T),
        L(B('تحديث من غير توقف', 'Zero-downtime updates'),
          B('**zero-downtime** على VPS واحد: شغّل النسخة الجديدة جنب القديمة، استنى `/readyz` يبقى أخضر، حوّل الـ proxy، وبعدين اقفل القديمة بأدب (**rolling update**). لو الجديدة مسلمتش الفحص: متحوّلش وارجع. المثال بيمثّل الخطوات دي.', '**zero-downtime** on a single VPS: start the new version beside the old one, wait for `/readyz` to turn green, switch the proxy, then stop the old one gracefully (a **rolling update**). If the new one fails the check: do not switch, and roll back. The example simulates these steps.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function deploy(current, next, readyChecks) {\n  console.log(`start ${next} beside ${current}`);\n  for (let i = 0; i < readyChecks.length; i++) {\n    await sleep(10);\n    console.log(`  /readyz on ${next}: ${readyChecks[i] ? "200" : "503"}`);\n    if (readyChecks[i]) {\n      console.log(`  switch proxy → ${next}; SIGTERM ${current} (finishes in-flight requests)`);\n      return next;\n    }\n  }\n  console.log(`  ${next} never became ready → stop it, traffic stays on ${current}`);\n  return current;\n}\nlet live = "api@sha256:aa11";\nlive = await deploy(live, "api@sha256:bb22", [false, false, true]);\nlive = await deploy(live, "api@sha256:cc33", [false, false, false, false]);\nconsole.log("live:", live);', N())
      ],
      practice: [
        B('اعمل Caddyfile لـ API وn8n.', 'Write a Caddyfile for the API and n8n.'),
        B('أمّن الـ VPS: ufw وSSH بمفاتيح.', 'Secure the VPS: ufw and key-only SSH.'),
        B('اكتب systemd unit (أو pm2) كبديل.', 'Write a systemd unit (or pm2) as an alternative.'),
        B('اكتب سكربت نشر بفحص readyz.', 'Write a deploy script with a readyz check.')
      ],
      words: [
        W('caddy', 'reverse proxy بـ HTTPS تلقائي', 'a reverse proxy with automatic HTTPS', 'Caddy renewed the certificate itself.'),
        W('let’s encrypt', 'شهادات HTTPS مجانية', 'a free certificate authority', 'Let’s Encrypt issues 90-day certificates.'),
        W('vps', 'سيرفر افتراضي خاص', 'a virtual private server', 'One VPS runs the API, n8n and Postgres.'),
        W('pm2', 'مدير عمليات لـ Node', 'a process manager for Node', 'pm2 restarts the app after a crash.'),
        W('systemd', 'مدير الخدمات في Linux', 'Linux’s service manager', 'A systemd unit runs the API at boot.'),
        W('zero-downtime', 'تحديث من غير توقف', 'deploying without interrupting users', 'The proxy switch gives zero-downtime.'),
        W('rolling update', 'تبديل تدريجي للنسخ', 'replacing instances gradually', 'A rolling update keeps one copy serving.')
      ],
      read: [{ lib: 'pm2', what: B('اقرا Quick Start وStartup Script.', 'Read Quick Start and Startup Script.') }],
      challenge: B('انشر خدمة المتجر على VPS (أو VM محلية): Caddy بـ HTTPS، compose.prod بالـ digest، ufw وSSH بمفاتيح، سكربت نشر بفحص readyz ورجوع، backup يومي للقاعدة لبرّه السيرفر — وتجربة restore موثّقة.', 'Deploy the shop service to a VPS (or a local VM): Caddy with HTTPS, compose.prod by digest, ufw and key-only SSH, a deploy script with a readyz check and rollback, a daily database backup off the server — and a documented restore test.'),
      quiz: [
        Q(B('HTTPS تلقائي:', 'Automatic HTTPS:'), [['Caddy', 'Caddy'], ['node --https', 'node --https'], ['مش ممكن', 'not possible']], 0, B('Let’s Encrypt.', 'Let’s Encrypt.')),
        Q(B('النسخة الجديدة مسلمتش readyz:', 'The new version fails readyz:'), [['متحوّلش وارجع', 'don’t switch; roll back'], ['حوّل على أي حال', 'switch anyway'], ['امسح القديمة', 'delete the old one']], 0, B('أمان.', 'Safety.')),
        Q(B('SSH على VPS:', 'SSH on a VPS:'), [['مفاتيح بس', 'keys only'], ['كلمة سر بسيطة', 'a simple password'], ['مفتوح للكل', 'open to all']], 0, B('أمان.', 'Security.'))
      ] },

    { title: B('نظافة الصور', 'Image hygiene'),
      goal: B('صور معروف أصلها ونظيفة.', 'Images of known origin, kept clean.'),
      learn: [
        L(B('tags وdigests', 'Tags and digests'),
          B('**image tag** (`1.8.2`، `main`) اسم ممكن يتنقل لصورة تانية؛ **image digest** (`sha256:…`) بصمة ثابتة للأبد. انشر بالـ digest وخلّي الـ tags للبشر: الإصدار من package.json، والـ commit. المثال بيولّد الـ tags.', 'An **image tag** (`1.8.2`, `main`) is a name that can move to another image; an **image digest** (`sha256:…`) is a fingerprint fixed forever. Deploy by digest and keep tags for humans: the version from package.json, and the commit. The example generates the tags.'),
          'const pkg = { name: "shop-api", version: "1.8.2" };\nconst git = { sha: "4f1c9a2e7b3d", branch: "main", dirty: false };\n\nfunction tags({ name, version }, { sha, branch, dirty }, registry = "ghcr.io/acme") {\n  if (dirty) throw new Error("refusing to tag a build from uncommitted changes");\n  if (!/^\\d+\\.\\d+\\.\\d+$/.test(version)) throw new Error(`not semver: ${version}`);\n  const [major, minor] = version.split(".");\n  const list = [version, `${major}.${minor}`, `sha-${sha.slice(0, 7)}`];\n  if (branch === "main") list.push("main");\n  return list.map(t => `${registry}/${name}:${t}`);\n}\nconsole.log(tags(pkg, git).join("\\n"));\ntry { tags(pkg, { ...git, dirty: true }); } catch (e) { console.log("✗", e.message); }\nconsole.log("deploy: ghcr.io/acme/shop-api@sha256:… (the digest printed by docker build --push)");', N()),
        L(B('الحجم والفحص', 'Size and scanning'),
          B('**image size** أصغر = نشر أسرع وثغرات أقل. قيس بـ `docker images` وشوف الطبقات بـ `docker history` أو dive. وافحص الصورة بـ **trivy** في CI (ثغرات النظام وحزم npm) وفشّل البناء على الحرج. وحدّث الـ base image بانتظام (ثغرات بتتصلح فيها كل أسبوع تقريبًا).', 'A smaller **image size** = faster deploys and fewer vulnerabilities. Measure with `docker images` and inspect layers with `docker history` or dive. Scan the image with **trivy** in CI (OS and npm package vulnerabilities) and fail the build on critical ones. And update the base image regularly (vulnerabilities in it get fixed almost weekly).'),
          'image                           size     critical/high CVEs (example scan)\nnode:22 (full)                  1.1 GB   9 / 41\nnode:22-slim, multi-stage       210 MB   0 / 3\nnode:22-alpine, multi-stage     150 MB   0 / 1\ndistroless/nodejs22             140 MB   0 / 0\n\n# CI\n- uses: aquasecurity/trivy-action@0.33.1\n  with: { image-ref: "ghcr.io/acme/shop-api@${{ steps.build.outputs.digest }}", severity: "CRITICAL,HIGH", exit-code: "1" }\n# Renovate/Dependabot: bump node:22-slim digests weekly', T),
        L(B('البناء في CI', 'Building in CI'),
          B('الصورة بتتبني في CI مش على السيرفر ومش على جهازك: buildx بكاش، push لـ GHCR بالـ tags، والـ digest يطلع كـ output يستخدمه الـ deploy. اختياري: توقيع بـ cosign. كده كل نشر = صورة معروف اتبنت من أنهي commit.', 'The image is built in CI, not on the server and not on your laptop: buildx with caching, push to GHCR with the tags, and the digest output used by the deploy. Optional: signing with cosign. Then every deploy = an image known to come from a specific commit.'),
          'jobs:\n  image:\n    runs-on: ubuntu-latest\n    permissions: { contents: read, packages: write }\n    outputs: { digest: "${{ steps.build.outputs.digest }}" }\n    steps:\n      - uses: actions/checkout@v5\n      - uses: docker/setup-buildx-action@v3\n      - uses: docker/login-action@v3\n        with: { registry: ghcr.io, username: "${{ github.actor }}", password: "${{ secrets.GITHUB_TOKEN }}" }\n      - id: build\n        uses: docker/build-push-action@v6\n        with:\n          push: true\n          tags: ghcr.io/acme/shop-api:sha-${{ github.sha }}\n          cache-from: type=gha\n          cache-to: type=gha,mode=max', T)
      ],
      practice: [
        B('اعمل tags من package.json والـ commit.', 'Generate tags from package.json and the commit.'),
        B('انشر بالـ digest.', 'Deploy by digest.'),
        B('شغّل trivy على صورتك.', 'Run trivy on your image.'),
        B('ابني الصورة في GitHub Actions بكاش.', 'Build the image in GitHub Actions with caching.')
      ],
      words: [
        W('image tag', 'اسم قابل للتحريك للصورة', 'a movable label for an image', 'The image tag main moves every merge.'),
        W('image digest', 'بصمة الصورة الثابتة', 'the immutable sha256 of an image', 'Production pins the image digest.'),
        W('image size', 'حجم الصورة', 'how large an image is', 'Image size fell from 1.1 GB to 210 MB.'),
        W('trivy', 'أداة فحص ثغرات الصور', 'a container vulnerability scanner', 'trivy failed the build on a critical CVE.'),
        W('ghcr', 'سجل صور GitHub', 'GitHub Container Registry', 'Push the image to GHCR.'),
        W('buildx', 'أداة البناء المتقدمة في Docker', 'Docker’s advanced builder', 'buildx caches layers in CI.')
      ],
      read: [{ lib: 'GitHub Actions docs', what: B('دوّر على Publishing Docker images.', 'Search for Publishing Docker images.') }],
      challenge: B('اعمل pipeline صور لخدمة المتجر: بناء في CI بـ buildx وكاش، tags (إصدار، minor، sha، main)، push لـ GHCR، trivy بيفشّل على الحرج، والـ digest بيتمرر للـ deploy — وRenovate لتحديث الـ base image.', 'Build an image pipeline for the shop service: a CI build with buildx and caching, tags (version, minor, sha, main), a push to GHCR, trivy failing on critical issues, and the digest passed to the deploy — plus Renovate to update the base image.'),
      quiz: [
        Q(B('النشر للإنتاج بـ:', 'Deploy to production by:'), [['digest', 'digest'], ['latest', 'latest'], ['main', 'main']], 0, B('ثابت.', 'Immutable.')),
        Q(B('الصورة بتتبني:', 'The image is built:'), [['في CI', 'in CI'], ['على السيرفر', 'on the server'], ['على جهاز المطوّر', 'on a developer laptop']], 0, B('مصدر معروف.', 'Known origin.')),
        Q(B('ثغرة حرجة في الـ base image:', 'A critical CVE in the base image:'), [['حدّث الـ base وأعد البناء', 'update the base and rebuild'], ['تجاهل', 'ignore it'], ['احذف Docker', 'remove Docker']], 0, B('تحديث.', 'Update.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('Node في الإنتاج باحتراف.', 'Node in production, professionally.'),
      review: [
        B('Dockerfile multi-stage وslim وnon-root والطبقات.', 'Multi-stage Dockerfiles, slim, non-root and layers.'),
        B('PID 1 والإشارات والإقفال بأدب والذاكرة.', 'PID 1, signals, graceful shutdown and memory.'),
        B('compose للتطوير والإنتاج والبيئة.', 'Compose for dev and prod, and the environment.'),
        B('Caddy والـ VPS والتحديث من غير توقف.', 'Caddy, the VPS and zero-downtime updates.'),
        B('tags وdigests والفحص والبناء في CI.', 'Tags, digests, scanning and CI builds.')
      ],
      project: B('مشروع الأسبوع «نشر خدمة المتجر»: Dockerfile إنتاج (multi-stage، slim، USER node، HEALTHCHECK)، graceful shutdown وmax-old-space-size وlivez/readyz، compose للتطوير (api، Postgres، n8n) وللإنتاج (Caddy، الصورة بالـ digest)، صورة تتبني في CI وتتفحص بـ trivy، نشر على VPS بـ HTTPS وسكربت rolling بفحص صحة، وbackup وrestore متجرّب — مع runbook.', 'Week project «deploying the shop service»: a production Dockerfile (multi-stage, slim, USER node, HEALTHCHECK), graceful shutdown, max-old-space-size and livez/readyz, compose for dev (api, Postgres, n8n) and prod (Caddy, image by digest), an image built in CI and scanned by trivy, a VPS deploy with HTTPS and a health-checked rolling script, and a tested backup and restore — with a runbook.'),
      test: [
        Q(B('multi-stage بيفيد في:', 'Multi-stage helps:'), [['صورة نهائية من غير أدوات البناء', 'a final image without build tools'], ['CPU أسرع', 'a faster CPU'], ['تشفير', 'encryption']], 0, B('حجم.', 'Size.')),
        Q(B('alpine:', 'Alpine:'), [['صغيرة بس بـ musl', 'small but uses musl'], ['أكبر صورة', 'the biggest image'], ['Windows', 'Windows']], 0, B('native.', 'Native modules.')),
        Q(B('npm ci --omit=dev:', 'npm ci --omit=dev:'), [['اعتماديات الإنتاج بس', 'production dependencies only'], ['كل حاجة', 'everything'], ['ولا حاجة', 'nothing']], 0, B('حجم.', 'Size.')),
        Q(B('USER node:', 'USER node:'), [['تشغيل من غير root', 'run without root'], ['اسم الصورة', 'the image name'], ['متغير بيئة', 'an env var']], 0, B('أمان.', 'Security.')),
        Q(B('init: true:', 'init: true:'), [['tini كـ PID 1 بيوصّل الإشارات', 'tini as PID 1 forwarding signals'], ['يبدأ أسرع', 'starts faster'], ['يمسح البيانات', 'wipes data']], 0, B('إشارات.', 'Signals.')),
        Q(B('server.close():', 'server.close():'), [['بطّل اتصالات جديدة وخلّص الجارية', 'stop new connections, finish current ones'], ['اقفل فورًا', 'kill at once'], ['أعد التشغيل', 'restart']], 0, B('أدب.', 'Graceful.')),
        Q(B('readyz أثناء الإقفال:', 'readyz during shutdown:'), [['503', '503'], ['200', '200'], ['301', '301']], 0, B('تصريف.', 'Draining.')),
        Q(B('volumes في compose:', 'Volumes in compose:'), [['تخزين دائم', 'persistent storage'], ['صوت', 'sound'], ['شبكة', 'a network']], 0, B('بيانات.', 'Data.')),
        Q(B('util.parseEnv:', 'util.parseEnv:'), [['يفك نص .env', 'parses .env text'], ['يشفّر', 'encrypts'], ['ينشر', 'deploys']], 0, B('بيئة.', 'Environment.')),
        Q(B('Caddy:', 'Caddy:'), [['reverse proxy بـ HTTPS تلقائي', 'a reverse proxy with automatic HTTPS'], ['قاعدة بيانات', 'a database'], ['مكتبة npm', 'an npm library']], 0, B('HTTPS.', 'HTTPS.')),
        Q(B('rolling update:', 'A rolling update:'), [['الجديدة تجهز ثم تحويل ثم قفل القديمة', 'new ready, then switch, then stop old'], ['قفل الكل ثم تشغيل', 'stop all, then start'], ['من غير فحص', 'without checks']], 0, B('zero-downtime.', 'Zero-downtime.')),
        Q(B('trivy:', 'trivy:'), [['فحص ثغرات الصور', 'scanning images for vulnerabilities'], ['بناء الصور', 'building images'], ['تشغيل الاختبارات', 'running tests']], 0, B('أمان.', 'Security.'))
      ] }
  ]
};
