// Python week 45 — CI/CD and containers.
// The Dockerfile linter, graceful-shutdown worker, tag builder, blue-green switch, expand/contract migration and
// changelog generator run with the standard library; Dockerfiles and workflow YAML are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('CI/CD والـ containers', 'CI/CD and containers'),
  goal: B('تنقل النشر من «شغّال على جهازي» لخط إنتاج محترف: صور Docker صغيرة وآمنة، خدمات بتقفل بأدب، pipelines سريعة بمصفوفات وكاش ومن غير أسرار طويلة العمر، نشر من غير توقف بـ blue-green وترحيلات expand/contract، وإصدارات بأرقام وchangelog.',
          'Move deployment from «works on my machine» to a professional pipeline: small, secure Docker images, services that shut down gracefully, fast pipelines with matrices, caching and no long-lived secrets, zero-downtime deploys with blue-green and expand/contract migrations, and numbered releases with a changelog.'),
  days: [
    { title: B('Dockerfile للإنتاج', 'A production Dockerfile'),
      goal: B('صورة صغيرة وسريعة البناء وآمنة.', 'A small, fast-building, secure image.'),
      learn: [
        L(B('multi-stage', 'Multi-stage'),
          B('**multi-stage build** = مرحلة بتبني (فيها compilers وuv) ومرحلة نهائية فيها اللي محتاجه وقت التشغيل بس. **base image** صغيرة (**slim image** زي python:3.13-slim، أو **distroless**) = حجم أقل وثغرات أقل. وشغّل كـ **non-root user** دايمًا.', 'A **multi-stage build** = a stage that builds (with compilers and uv) and a final stage containing only what runtime needs. A small **base image** (a **slim image** like python:3.13-slim, or **distroless**) = smaller size and fewer vulnerabilities. And always run as a **non-root user**.'),
          '# syntax=docker/dockerfile:1\nFROM python:3.13-slim AS build\nCOPY --from=ghcr.io/astral-sh/uv:0.8 /uv /bin/uv\nWORKDIR /app\nCOPY pyproject.toml uv.lock ./\nRUN --mount=type=cache,target=/root/.cache/uv uv sync --locked --no-dev --no-install-project\nCOPY src ./src\nRUN --mount=type=cache,target=/root/.cache/uv uv sync --locked --no-dev\n\nFROM python:3.13-slim\nRUN useradd --create-home --uid 10001 app\nWORKDIR /app\nCOPY --from=build --chown=app:app /app /app\nENV PATH="/app/.venv/bin:$PATH" PYTHONUNBUFFERED=1\nUSER app\nEXPOSE 8000\nCMD ["uvicorn", "shop.api:app", "--host", "0.0.0.0", "--port", "8000"]', T),
        L(B('ترتيب الطبقات', 'Layer order'),
          B('كل سطر في Dockerfile طبقة، والـ **layer caching** بيعيد استخدام الطبقات اللي مدخلاتها متغيرتش. لذلك: انسخ ملفات الاعتماديات (pyproject وuv.lock) وثبّت الأول، وبعدين انسخ الكود. تعديل سطر كود ميعيدش تثبيت المكتبات. **uv in docker** بكاش mount بيخلي البناء ثواني.', 'Each Dockerfile line is a layer, and **layer caching** reuses layers whose inputs did not change. So: copy the dependency files (pyproject and uv.lock) and install first, then copy the code. Editing one line of code does not reinstall the libraries. **uv in docker** with a cache mount makes builds take seconds.'),
          'build after editing src/shop/api.py:\n  ✓ FROM python:3.13-slim            CACHED\n  ✓ COPY pyproject.toml uv.lock      CACHED\n  ✓ RUN uv sync --no-install-project CACHED   ← libraries not reinstalled\n  ✗ COPY src ./src                   re-run (code changed)\n  ✗ RUN uv sync                      re-run (2 s)\n\nwrong order (COPY . . first) → every code change reinstalls everything (2 min)', T),
        L(B('فحص الـ Dockerfile', 'Linting the Dockerfile'),
          B('**dockerfile linting** (أداة زي **hadolint**) بتمسك أخطاء شائعة: `latest`، تشغيل كـ root، `apt-get` من غير تنظيف، `COPY . .` قبل الاعتماديات، أسرار في `ENV`. المثال فاحص صغير بقواعد زي دي.', '**dockerfile linting** (a tool like **hadolint**) catches common mistakes: `latest`, running as root, `apt-get` without cleanup, `COPY . .` before dependencies, secrets in `ENV`. The example is a tiny linter with rules like these.'),
          'import re\n\nDOCKERFILE = """FROM python:latest\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nENV API_TOKEN=abc123\nCMD python app.py\n"""\n\ndef lint(text):\n    lines = text.splitlines()\n    issues = []\n    for n, line in enumerate(lines, 1):\n        if re.match(r"FROM\\s+\\S+:latest|FROM\\s+[^:\\s]+\\s*$", line):\n            issues.append((n, "pin the base image version (no latest)"))\n        if re.match(r"ENV\\s+\\w*(TOKEN|SECRET|PASSWORD|KEY)\\w*=", line, re.I):\n            issues.append((n, "secret in ENV: pass it at runtime"))\n        if line.startswith("CMD ") and not line[4:].lstrip().startswith("["):\n            issues.append((n, "use exec form CMD [\\"…\\"] so signals reach the app"))\n    copy_all = next((n for n, l in enumerate(lines, 1) if l.startswith("COPY . .")), None)\n    install = next((n for n, l in enumerate(lines, 1) if "install" in l), None)\n    if copy_all and install and copy_all < install:\n        issues.append((copy_all, "COPY . . before installing deps breaks layer caching"))\n    if not any(l.startswith("USER ") for l in lines):\n        issues.append((len(lines), "no USER: the container runs as root"))\n    return sorted(issues)\n\nfor n, msg in lint(DOCKERFILE):\n    print(f"line {n}: {msg}")', R)
      ],
      practice: [
        B('حوّل Dockerfile عندك لـ multi-stage وقارن الحجم.', 'Convert one of your Dockerfiles to multi-stage and compare sizes.'),
        B('رتّب الطبقات وقيس زمن البناء بعد تعديل كود.', 'Reorder the layers and time a rebuild after a code edit.'),
        B('شغّل الصورة كـ non-root واتأكد بـ `whoami`.', 'Run the image as non-root and check with `whoami`.'),
        B('شغّل hadolint (أو الفاحص) وصلّح النتايج.', 'Run hadolint (or the linter) and fix the findings.')
      ],
      words: [
        W('multi-stage build', 'بناء على مراحل', 'a Dockerfile with separate build and runtime stages', 'A multi-stage build cut the image to 140 MB.'),
        W('base image', 'الصورة الأساسية', 'the image a Dockerfile starts from', 'Pin the base image version.'),
        W('slim image', 'صورة مصغّرة', 'a minimal variant of an official image', 'python:3.13-slim is a slim image.'),
        W('distroless', 'صورة من غير نظام تشغيل كامل', 'an image with only the app and its runtime', 'Distroless images have no shell.'),
        W('non-root user', 'مستخدم عادي مش root', 'a user without admin rights', 'The container runs as a non-root user.'),
        W('layer caching', 'إعادة استخدام طبقات البناء', 'reusing unchanged build layers', 'Layer caching makes rebuilds fast.'),
        W('uv in docker', 'استخدام uv جوه Docker', 'installing dependencies with uv in an image', 'uv in docker with a cache mount takes seconds.'),
        W('dockerfile linting', 'فحص الـ Dockerfile', 'checking a Dockerfile for mistakes', 'Dockerfile linting runs in CI.'),
        W('hadolint', 'أداة فحص Dockerfile', 'a Dockerfile linter', 'hadolint warned about latest.')
      ],
      read: [{ t: 'uv: Using uv in Docker', url: 'https://docs.astral.sh/uv/guides/integration/docker/', what: B('اقرا Intermediate layers وCaching.', 'Read Intermediate layers and Caching.') }],
      challenge: B('اعمل Dockerfile إنتاج لخدمة المتجر: multi-stage بـ uv وcache mount، slim مثبّتة، non-root، exec-form CMD، HEALTHCHECK — وقارن الحجم وزمن إعادة البناء بالنسخة القديمة، ونظّف كل تحذيرات hadolint.', 'Write a production Dockerfile for the shop service: multi-stage with uv and a cache mount, a pinned slim base, non-root, exec-form CMD, a HEALTHCHECK — compare size and rebuild time with the old version, and clear every hadolint warning.'),
      quiz: [
        Q(B('multi-stage بيفيد في:', 'Multi-stage helps:'), [['صورة نهائية أصغر من غير أدوات البناء', 'a smaller final image without build tools'], ['أسرع CPU', 'a faster CPU'], ['تشفير', 'encryption']], 0, B('حجم.', 'Size.')),
        Q(B('ترتيب صح:', 'The right order:'), [['الاعتماديات وبعدين الكود', 'dependencies, then code'], ['COPY . . الأول', 'COPY . . first'], ['مش فارق', 'it doesn’t matter']], 0, B('caching.', 'Caching.')),
        Q(B('FROM python:latest:', 'FROM python:latest:'), [['ثبّت النسخة', 'pin the version'], ['ممتاز', 'excellent'], ['إجباري', 'required']], 0, B('ثبات.', 'Reproducibility.'))
      ] },

    { title: B('Python جوّه الـ container', 'Python inside a container'),
      goal: B('خدمة بتبدأ وتقفل صح.', 'A service that starts and stops properly.'),
      learn: [
        L(B('الإقفال بأدب', 'Graceful shutdown'),
          B('أثناء النشر أو التوسع، Docker/Kubernetes بيبعت **sigterm** وبيستنى (عادة 10–30 ثانية) قبل ما يقتل. **graceful shutdown** = تبطّل تاخد شغل جديد، تخلّص اللي في إيدك، تقفل الاتصالات، وتخرج. worker بيتقتل في نص مهمة = طلب ناقص أو مكرر. ولازم CMD بصيغة exec عشان الإشارة توصل لـ Python.', 'During deploys or scaling, Docker/Kubernetes sends **sigterm** and waits (usually 10–30 seconds) before killing. **graceful shutdown** = stop taking new work, finish what is in hand, close connections and exit. A worker killed mid-task = a half-done or duplicated order. And CMD must use exec form so the signal reaches Python.'),
          'import signal\n\nclass Worker:\n    def __init__(self, jobs):\n        self.jobs, self.stopping, self.done = list(jobs), False, []\n\n    def request_stop(self, signum=None, frame=None):   # installed with signal.signal(signal.SIGTERM, …)\n        print("  SIGTERM received: finishing the current job, taking no new ones")\n        self.stopping = True\n\n    def run(self, stop_after=None):\n        while self.jobs and not self.stopping:\n            job = self.jobs.pop(0)\n            self.done.append(job)                      # the whole job completes\n            print("  done", job)\n            if stop_after and len(self.done) == stop_after:\n                self.request_stop(signal.SIGTERM)       # simulate the orchestrator\n        print(f"  exit cleanly; {len(self.jobs)} job(s) left in the queue for the next worker")\n\n# real code: signal.signal(signal.SIGTERM, worker.request_stop)\nWorker(["order-1", "order-2", "order-3", "order-4"]).run(stop_after=2)', R),
        L(B('صحة وجاهزية', 'Health and readiness'),
          B('فرق مهم: **liveness probe** = «البرنامج عايش؟» (لو لأ أعد تشغيله)، و**readiness probe** = «جاهز ياخد طلبات؟» (قاعدة البيانات متوصلة، الكاش دافي). أثناء الإقفال الـ readiness يرجّع 503 فورًا عشان الـ load balancer يبطّل يبعت. ومتخليش liveness يعتمد على خدمات خارجية — وقوع Postgres مش سبب تعيد تشغيل كل حاجة.', 'An important difference: a **liveness probe** = «is the program alive?» (if not, restart it), and a **readiness probe** = «ready to take requests?» (database connected, cache warm). During shutdown readiness returns 503 at once so the load balancer stops sending traffic. And never make liveness depend on external services — Postgres going down is not a reason to restart everything.'),
          'from fastapi import FastAPI, Response\n\napp = FastAPI()\nstate = {"shutting_down": False}\n\n@app.get("/livez")\ndef livez():\n    return {"ok": True}                         # the process answers: alive\n\n@app.get("/readyz")\nasync def readyz(response: Response):\n    if state["shutting_down"] or not await db_ping(timeout=0.5):\n        response.status_code = 503\n        return {"ready": False}\n    return {"ready": True}\n\n@app.on_event("shutdown")\nasync def on_shutdown():\n    state["shutting_down"] = True               # readiness fails first; in-flight requests finish'),
        L(B('العمّال والإعدادات', 'Workers and config'),
          B('`uvicorn --workers N` أو gunicorn بـ uvicorn workers: ابدأ بـ عدد الأنوية (أو 2×+1 للـ I/O الكتير) وقيس. config من متغيرات البيئة (twelve-factor، أسبوع 24) — نفس الصورة بإعدادات مختلفة لكل بيئة. واللوج على stdout بـ JSON والـ orchestrator بيجمعه.', '`uvicorn --workers N` or gunicorn with uvicorn workers: start with the number of cores (or 2×+1 for I/O-heavy work) and measure. Config from environment variables (twelve-factor, week 24) — the same image with different settings per environment. And logs to stdout as JSON, collected by the orchestrator.'),
          '# compose.prod.yaml (excerpt)\nservices:\n  api:\n    image: ghcr.io/acme/shop-api@sha256:4f1c…            # an immutable digest\n    command: ["uvicorn", "shop.api:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]\n    env_file: .env.production                             # DATABASE_URL, LOG_LEVEL, …\n    stop_grace_period: 30s                                # time between SIGTERM and SIGKILL\n    healthcheck:\n      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen(\'http://localhost:8000/livez\')"]\n      interval: 15s\n      retries: 3\n    deploy:\n      resources: {limits: {memory: 512M}}', T)
      ],
      practice: [
        B('ضيف SIGTERM handler لـ worker عندك.', 'Add a SIGTERM handler to one of your workers.'),
        B('اعمل /livez و/readyz منفصلين.', 'Create separate /livez and /readyz endpoints.'),
        B('جرّب `docker stop` وشوف المهمة الجارية بتخلص.', 'Try `docker stop` and watch the current job finish.'),
        B('ظبّط عدد الـ workers بقياس.', 'Tune the worker count by measurement.')
      ],
      words: [
        W('sigterm', 'إشارة طلب الإقفال', 'the signal asking a process to stop', 'Docker sends SIGTERM before SIGKILL.'),
        W('graceful shutdown', 'إقفال بأدب', 'stopping after finishing current work', 'Graceful shutdown prevents half-done orders.'),
        W('liveness probe', 'فحص «البرنامج عايش؟»', 'a check that the process is alive', 'The liveness probe ignores the database.'),
        W('readiness probe', 'فحص «جاهز ياخد طلبات؟»', 'a check that the service can take traffic', 'The readiness probe fails during shutdown.'),
        W('stop grace period', 'مهلة الإقفال قبل القتل', 'the wait between SIGTERM and SIGKILL', 'Set the stop grace period to 30 seconds.')
      ],
      read: [{ t: 'Docker: docker container stop', url: 'https://docs.docker.com/reference/cli/docker/container/stop/', what: B('اقرا الوصف والـ timeout.', 'Read the description and the timeout.') }],
      challenge: B('خلّي خدمة المتجر «صديقة للـ containers»: graceful shutdown للـ API والـ workers، livez وreadyz صح، stop_grace_period مناسب، لوج JSON على stdout، وإعدادات من env — وجرّب `docker compose up --scale worker=3` ثم نشر جديد من غير ما طلب يضيع.', 'Make the shop service «container-friendly»: graceful shutdown for the API and workers, correct livez and readyz, a suitable stop_grace_period, JSON logs on stdout and config from env — then try `docker compose up --scale worker=3` and a new deploy without losing a single order.'),
      quiz: [
        Q(B('SIGTERM وصل والـ worker في نص مهمة:', 'SIGTERM arrives mid-task:'), [['يخلّص المهمة ويخرج', 'finish the task, then exit'], ['يقفل فورًا', 'quit immediately'], ['يتجاهله', 'ignore it']], 0, B('أدب.', 'Graceful.')),
        Q(B('liveness يعتمد على Postgres:', 'Liveness depending on Postgres:'), [['غلط: هيعيد تشغيل كل حاجة', 'wrong: it restarts everything'], ['صح', 'right'], ['إجباري', 'required']], 0, B('عزل.', 'Isolation.')),
        Q(B('CMD python app.py (shell form):', 'CMD python app.py (shell form):'), [['الإشارة ممكن متوصلش لـ Python', 'the signal may not reach Python'], ['أحسن صيغة', 'the best form'], ['أسرع', 'faster']], 0, B('exec form.', 'Exec form.'))
      ] },

    { title: B('Pipelines متقدمة', 'Advanced pipelines'),
      goal: B('CI سريع وآمن وبيغطي كل حاجة.', 'Fast, safe CI that covers everything.'),
      learn: [
        L(B('مصفوفة وكاش', 'Matrix and cache'),
          B('**ci pipeline** كويس: سريع (أقل من 10 دقايق)، **matrix build** على نسخ Python وأنظمة اللي بتدعمها، كاش للاعتماديات، و**artifact** للنتايج (تقارير، صورة). و**required check** في GitHub = مفيش merge غير لما الـ CI ينجح. و**concurrency group** بيلغي التشغيل القديم لنفس الفرع.', 'A good **ci pipeline**: fast (under 10 minutes), a **matrix build** over the Python versions and systems you support, a dependency cache, and an **artifact** for outputs (reports, an image). A **required check** in GitHub = no merge until CI passes. And a **concurrency group** cancels older runs for the same branch.'),
          'name: ci\non: [push, pull_request]\nconcurrency: {group: "ci-${{ github.ref }}", cancel-in-progress: true}\njobs:\n  test:\n    runs-on: ${{ matrix.os }}\n    strategy:\n      matrix:\n        os: [ubuntu-latest, windows-latest]\n        python: ["3.12", "3.13"]\n    steps:\n      - uses: actions/checkout@v5\n      - uses: astral-sh/setup-uv@v6\n        with: {python-version: "${{ matrix.python }}", enable-cache: true}\n      - run: uv sync --locked\n      - run: uv run pytest -m "not integration" --junitxml=report.xml\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with: {name: "report-${{ matrix.os }}-${{ matrix.python }}", path: report.xml}', T),
        L(B('من غير أسرار طويلة العمر', 'No long-lived secrets'),
          B('بدل ما تحط مفتاح السحابة في GitHub secrets للأبد: **oidc** = GitHub بيدّي الـ job توكن مؤقت موقّع، والسحابة (AWS/GCP/Azure) بتثق فيه لريبو وفرع محددين بس. التوكن بيعيش دقايق — لو اتسرب مبيفرقش. ولـ GHCR: `GITHUB_TOKEN` بصلاحية `packages: write` كفاية.', 'Instead of keeping a cloud key in GitHub secrets forever: **oidc** = GitHub gives the job a short-lived signed token, and the cloud (AWS/GCP/Azure) trusts it only for a specific repo and branch. The token lives minutes — a leak barely matters. For GHCR: `GITHUB_TOKEN` with `packages: write` is enough.'),
          'jobs:\n  deploy:\n    needs: [test, image]\n    if: github.ref == \'refs/heads/main\'\n    environment: production                  # approval gate configured in repo settings\n    permissions:\n      id-token: write                        # allow OIDC\n      contents: read\n    runs-on: ubuntu-latest\n    steps:\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::123456789012:role/shop-deploy   # trusts only this repo + main\n          aws-region: me-central-1\n      - run: ./deploy.sh "${{ needs.image.outputs.digest }}"', T),
        L(B('ابني مرة وانشر كتير', 'Build once, deploy many'),
          B('**build once deploy many** = نفس الصورة بالظبط بتعدّي staging وبعدين production — مش بتتبني تاني. اربطها بـ **image digest** (`sha256:…` ثابت للأبد) مش **image tag** (ممكن يتنقل). والـ tags للبشر: الإصدار، الـ commit، و`main`. المثال بيبني الـ tags من pyproject والـ commit.', '**build once deploy many** = exactly the same image goes through staging then production — it is not rebuilt. Pin it by **image digest** (`sha256:…`, fixed forever), not by **image tag** (which can move). Tags are for humans: the version, the commit and `main`. The example builds tags from pyproject and the commit.'),
          'import tomllib, re\n\nPYPROJECT = b"""\n[project]\nname = "shop-api"\nversion = "1.8.2"\n"""\n\ndef image_tags(pyproject: bytes, sha: str, branch: str, registry="ghcr.io/acme"):\n    meta = tomllib.loads(pyproject.decode())["project"]\n    name, version = meta["name"], meta["version"]\n    if not re.fullmatch(r"\\d+\\.\\d+\\.\\d+", version):\n        raise ValueError(f"not a semantic version: {version}")\n    major, minor, _ = version.split(".")\n    tags = [version, f"{major}.{minor}", f"sha-{sha[:7]}"]\n    if branch == "main":\n        tags.append("main")\n    return [f"{registry}/{name}:{t}" for t in tags]\n\nfor t in image_tags(PYPROJECT, "4f1c9a2e7b", "main"):\n    print(t)\nprint("deploy by digest:", "ghcr.io/acme/shop-api@sha256:4f1c…  (from the build step output)")', R)
      ],
      practice: [
        B('ضيف matrix لنسختين Python ونظامين.', 'Add a matrix for two Python versions and two systems.'),
        B('فعّل required checks على main.', 'Enable required checks on main.'),
        B('استبدل مفتاح سحابة بـ OIDC لو بتنشر على سحابة.', 'Replace a cloud key with OIDC if you deploy to a cloud.'),
        B('انشر بالـ digest مش بالـ tag.', 'Deploy by digest, not by tag.')
      ],
      words: [
        W('ci pipeline', 'خط التكامل المستمر', 'the automated checks on every change', 'The CI pipeline runs in eight minutes.'),
        W('matrix build', 'تشغيل على تركيبات نسخ وأنظمة', 'running jobs across version/OS combinations', 'The matrix build covers 3.12 and 3.13.'),
        W('artifact', 'ناتج محفوظ من الـ pipeline', 'a file saved from a pipeline run', 'Download the test report artifact.'),
        W('required check', 'فحص لازم ينجح قبل الدمج', 'a CI status needed before merging', 'Make tests a required check.'),
        W('concurrency group', 'مجموعة بتلغي التشغيل القديم', 'a group cancelling older runs', 'A concurrency group saves CI minutes.'),
        W('oidc', 'توكن مؤقت موقّع بدل المفاتيح', 'short-lived signed identity tokens', 'OIDC removed the long-lived AWS key.'),
        W('build once deploy many', 'ابني مرة وانشر نفس الصورة', 'promoting one build through environments', 'Build once deploy many avoids surprises.'),
        W('image digest', 'بصمة الصورة الثابتة', 'the immutable sha256 of an image', 'Pin production to the image digest.'),
        W('image tag', 'اسم قابل للتحريك للصورة', 'a movable label for an image', 'An image tag like main can move.')
      ],
      read: [{ t: 'GitHub Docs: About security hardening with OpenID Connect', url: 'https://docs.github.com/en/actions/concepts/security/openid-connect', what: B('اقرا Overview وBenefits.', 'Read the Overview and Benefits.') }],
      challenge: B('ابني pipeline كامل لخدمة المتجر: lint وtypes وتيست في matrix، integration بـ Postgres service، بناء صورة مرة واحدة بـ tags وdigest، فحص أمان (pip-audit وtrivy)، نشر لـ staging تلقائي وproduction بموافقة — ومن غير أي مفتاح سحابة طويل العمر.', 'Build a full pipeline for the shop service: lint, types and tests in a matrix, integration with a Postgres service, one image build with tags and a digest, security scans (pip-audit and trivy), automatic deploy to staging and to production with approval — and no long-lived cloud key.'),
      quiz: [
        Q(B('digest ولا tag للإنتاج؟', 'Digest or tag for production?'), [['digest: ثابت', 'digest: immutable'], ['tag latest', 'the latest tag'], ['مش فارق', 'no difference']], 0, B('ثبات.', 'Immutability.')),
        Q(B('OIDC بيشيل:', 'OIDC removes:'), [['المفاتيح طويلة العمر', 'long-lived keys'], ['الاختبارات', 'the tests'], ['Docker', 'Docker']], 0, B('مؤقت.', 'Short-lived.')),
        Q(B('build once deploy many:', 'Build once, deploy many:'), [['نفس الصورة لكل البيئات', 'the same image for every environment'], ['بناء لكل بيئة', 'a build per environment'], ['من غير بناء', 'no build']], 0, B('ترقية.', 'Promotion.'))
      ] },

    { title: B('النشر من غير توقف', 'Zero-downtime deploys'),
      goal: B('نسخة جديدة والعملاء مش حاسين.', 'A new version without customers noticing.'),
      learn: [
        L(B('البيئات وبوابة الموافقة', 'Environments and the approval gate'),
          B('**staging** = نسخة شبه الإنتاج ببيانات تجربة؛ كل merge بيتنشر عليها لوحده. production بعد **approval gate** (شخص بيوافق في GitHub environments) أو تلقائي لو الاختبارات والـ canary تمام. **continuous deployment** = كل تغيير ناجح بيوصل الإنتاج من غير تدخل — بيحتاج اختبارات ومراقبة قوية.', '**staging** = a near-production copy with test data; every merge deploys there automatically. Production after an **approval gate** (a person approves in GitHub environments) or automatically if tests and the canary look good. **continuous deployment** = every successful change reaches production without intervention — it needs strong tests and monitoring.'),
          'merge to main\n  → CI (tests, scans, image sha256:4f1c…)\n  → staging: deploy 4f1c…, run smoke tests + e2e\n  → production: approval gate (or automatic with a canary)\n        → deploy the SAME 4f1c… → watch error rate & p95 for 15 min → done or roll back', T),
        L(B('Blue-green وrolling', 'Blue-green and rolling'),
          B('**rolling update** = بتبدّل الـ instances واحد واحد (Kubernetes بيعمل كده افتراضيًا). **blue-green** = نسخة كاملة جديدة (green) جنب القديمة (blue)، تتأكد إن green سليمة، وتحوّل الـ traffic مرة واحدة — والرجوع = تحويل تاني. ده **zero-downtime** بشرط إن النسختين يشتغلوا مع نفس قاعدة البيانات.', 'A **rolling update** = replace instances one by one (Kubernetes does this by default). **blue-green** = a full new copy (green) beside the old one (blue); check green is healthy and switch traffic at once — rolling back = switching again. This is **zero-downtime**, provided both versions work with the same database.'),
          'class Router:\n    def __init__(self):\n        self.live = "blue"\n        self.versions = {"blue": "1.8.1", "green": None}\n\n    def deploy(self, version, healthy_checks):\n        idle = "green" if self.live == "blue" else "blue"\n        self.versions[idle] = version\n        print(f"deployed {version} to {idle}; checking health…")\n        if not all(healthy_checks):\n            print(f"  {idle} unhealthy → traffic stays on {self.live} ({self.versions[self.live]})")\n            self.versions[idle] = None\n            return\n        self.live = idle\n        print(f"  switched traffic to {idle} ({version})")\n\n    def rollback(self):\n        other = "green" if self.live == "blue" else "blue"\n        if not self.versions[other]:\n            print("nothing to roll back to")\n            return\n        self.live = other\n        print(f"rolled back to {self.live} ({self.versions[self.live]})")\n\nr = Router()\nr.deploy("1.8.2", healthy_checks=[True, True, True])\nr.deploy("1.9.0", healthy_checks=[True, False, True])\nr.deploy("1.9.1", healthy_checks=[True, True, True])\nprint("errors rise after the switch…")\nr.rollback()', R),
        L(B('ترحيلات expand/contract', 'Expand/contract migrations'),
          B('أخطر جزء: قاعدة البيانات. لو النسخة الجديدة شالت عمود والقديمة لسه شغالة = أعطال. **expand and contract**: (1) expand — ضيف العمود الجديد، النسختين شغالين؛ (2) اكتب في الاتنين واملا القديم؛ (3) النسخة الجديدة بتقرا الجديد؛ (4) contract — شيل القديم في نشر بعدها. كل خطوة آمنة لوحدها.', 'The most dangerous part: the database. If the new version drops a column while the old one still runs = failures. **expand and contract**: (1) expand — add the new column, both versions work; (2) write to both and backfill; (3) the new version reads the new column; (4) contract — drop the old one in a later deploy. Each step is safe on its own.'),
          'import sqlite3\n\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT)")\ndb.executemany("INSERT INTO customers(name) VALUES (?)", [("Mona Ali",), ("Omar Saad",)])\n\n# release 1 — expand: add columns; old code keeps using name\ndb.execute("ALTER TABLE customers ADD COLUMN first_name TEXT")\ndb.execute("ALTER TABLE customers ADD COLUMN last_name TEXT")\n# backfill (in batches in real life)\ndb.execute("UPDATE customers SET first_name = substr(name, 1, instr(name, \' \') - 1), last_name = substr(name, instr(name, \' \') + 1)")\n\nold_code = lambda: [r[0] for r in db.execute("SELECT name FROM customers")]\nnew_code = lambda: [f"{f} {l}" for f, l in db.execute("SELECT first_name, last_name FROM customers")]\nprint("both versions work during the switch:", old_code() == new_code(), new_code())\n\n# release 2 (days later, old code gone) — contract\ndb.execute("ALTER TABLE customers DROP COLUMN name")\nprint("columns now:", [c[1] for c in db.execute("PRAGMA table_info(customers)")])', R)
      ],
      practice: [
        B('اعمل بيئة staging لمشروعك بنشر تلقائي.', 'Set up a staging environment with automatic deploys.'),
        B('ضيف approval gate لـ production.', 'Add an approval gate for production.'),
        B('خطّط تغيير عمود بـ expand/contract.', 'Plan a column change with expand/contract.'),
        B('جرّب rollback فعلي على staging.', 'Try a real rollback on staging.')
      ],
      words: [
        W('staging', 'بيئة تجربة شبه الإنتاج', 'a near-production test environment', 'Every merge deploys to staging.'),
        W('approval gate', 'بوابة موافقة قبل النشر', 'a manual approval before a deploy', 'Production has an approval gate.'),
        W('continuous deployment', 'نشر تلقائي لكل تغيير ناجح', 'automatically releasing every passing change', 'Continuous deployment needs strong monitoring.'),
        W('rolling update', 'تبديل الـ instances واحد واحد', 'replacing instances one at a time', 'Kubernetes uses a rolling update.'),
        W('blue-green', 'نسختين كاملتين وتحويل الـ traffic', 'two full environments with a traffic switch', 'Blue-green makes rollback instant.'),
        W('zero-downtime', 'نشر من غير توقف', 'deploying without interrupting users', 'Zero-downtime needs compatible migrations.'),
        W('expand and contract', 'توسيع ثم تقليص لتغيير القاعدة بأمان', 'a safe multi-step schema change', 'Rename the column with expand and contract.')
      ],
      read: [{ t: 'GitHub Docs: Deployments and environments', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments', what: B('اقرا Required reviewers.', 'Read Required reviewers.') }],
      challenge: B('نفّذ نشر من غير توقف لخدمة المتجر: staging تلقائي، production بموافقة، blue-green (أو rolling) بفحص صحة قبل التحويل، تغيير قاعدة بيانات حقيقي بـ expand/contract على نشرتين، وتجربة rollback موثّقة.', 'Carry out a zero-downtime deploy for the shop service: automatic staging, production with approval, blue-green (or rolling) with a health check before switching, a real database change with expand/contract across two deploys, and a documented rollback drill.'),
      quiz: [
        Q(B('blue-green rollback:', 'Blue-green rollback:'), [['تحويل الـ traffic للنسخة القديمة', 'switch traffic back to the old copy'], ['إعادة بناء', 'a rebuild'], ['مستحيل', 'impossible']], 0, B('سريع.', 'Instant.')),
        Q(B('شيل عمود والنسخة القديمة شغالة:', 'Dropping a column while the old version runs:'), [['أعطال؛ استخدم expand/contract', 'failures; use expand/contract'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('توافق.', 'Compatibility.')),
        Q(B('staging:', 'Staging:'), [['نسخة شبه الإنتاج للتجربة', 'a near-production copy for testing'], ['الإنتاج', 'production'], ['جهازك', 'your laptop']], 0, B('تجربة.', 'Rehearsal.'))
      ] },

    { title: B('الإصدارات وأمان الصور', 'Releases and image security'),
      goal: B('كل إصدار ليه رقم وقصة وفحص.', 'Every release has a number, a story and a scan.'),
      learn: [
        L(B('الأرقام والـ commits', 'Numbers and commits'),
          B('**semantic versioning**: MAJOR (تغيير بيكسر)، MINOR (ميزة)، PATCH (إصلاح). و**conventional commits** (`feat:`، `fix:`، `feat!:`) بيخلّي الأدوات تحسب الرقم الجاي وتكتب **changelog** لوحدها. **release** = tag في Git + صورة + ملاحظات.', '**semantic versioning**: MAJOR (a breaking change), MINOR (a feature), PATCH (a fix). And **conventional commits** (`feat:`, `fix:`, `feat!:`) let tools compute the next number and write the **changelog** for you. A **release** = a Git tag + an image + notes.'),
          'import re\nfrom collections import defaultdict\n\ncommits = ["feat(api): add WhatsApp order status endpoint",\n           "fix: round VAT half-up on credit notes",\n           "chore: bump ruff",\n           "feat!: rename /orders/{id}/pay to /orders/{id}/payments",\n           "fix(worker): stop retrying 4xx from Paymob",\n           "docs: deployment guide"]\n\ndef next_version(current, msgs):\n    major, minor, patch = map(int, current.split("."))\n    kinds = [re.match(r"(\\w+)(\\(.+\\))?(!)?:", m) for m in msgs]\n    if any(k and k.group(3) for k in kinds):\n        return f"{major + 1}.0.0"\n    if any(k and k.group(1) == "feat" for k in kinds):\n        return f"{major}.{minor + 1}.0"\n    if any(k and k.group(1) == "fix" for k in kinds):\n        return f"{major}.{minor}.{patch + 1}"\n    return current\n\ndef changelog(version, msgs):\n    groups = defaultdict(list)\n    for m in msgs:\n        k = re.match(r"(\\w+)(\\(.+\\))?(!)?:\\s*(.*)", m)\n        if not k: continue\n        title = "Breaking" if k.group(3) else {"feat": "Added", "fix": "Fixed"}.get(k.group(1))\n        if title: groups[title].append(k.group(4))\n    out = [f"## {version}"]\n    for title in ("Breaking", "Added", "Fixed"):\n        out += [f"### {title}"] + [f"- {x}" for x in groups[title]] if groups[title] else []\n    return "\\n".join(out)\n\nv = next_version("1.8.2", commits)\nprint(changelog(v, commits))', R),
        L(B('فحص وتوقيع الصور', 'Scanning and signing images'),
          B('**image scanning** بأداة زي **trivy** بيلاقي ثغرات معروفة في مكتبات النظام وPython جوه الصورة — شغّله في CI وفشّل البناء على الحرج. و**image signing** بـ **cosign**: الصورة بتتوقّع في CI والسيرفر مبيشغّلش غير صور موقّعة. ونشر الصور على **ghcr** (GitHub Container Registry) جنب الكود.', '**image scanning** with a tool like **trivy** finds known vulnerabilities in the OS and Python packages inside the image — run it in CI and fail the build on critical ones. **image signing** with **cosign**: the image is signed in CI and the server only runs signed images. And publish images to **ghcr** (GitHub Container Registry) next to the code.'),
          '- name: Build and push\n  id: build\n  uses: docker/build-push-action@v6\n  with: {push: true, tags: "${{ steps.meta.outputs.tags }}"}\n- name: Scan\n  uses: aquasecurity/trivy-action@0.33.1\n  with:\n    image-ref: ghcr.io/acme/shop-api@${{ steps.build.outputs.digest }}\n    severity: CRITICAL,HIGH\n    exit-code: "1"\n- name: Sign (keyless, via OIDC)\n  run: cosign sign --yes ghcr.io/acme/shop-api@${{ steps.build.outputs.digest }}', T),
        L(B('workflows قابلة لإعادة الاستخدام', 'Reusable workflows'),
          B('عندك 5 خدمات بنفس الـ pipeline؟ **reusable workflow** (`workflow_call`) = pipeline واحد تتشارك فيه كل الريبوهات، وتعديله مرة بيوصل للكل. و**workflow_dispatch** = زرار تشغيل يدوي بمدخلات (نشر نسخة معينة، rollback).', 'Five services with the same pipeline? A **reusable workflow** (`workflow_call`) = one pipeline shared by all repositories; editing it once reaches all of them. And **workflow_dispatch** = a manual run button with inputs (deploy a specific version, roll back).'),
          '# .github/workflows/rollback.yml\non:\n  workflow_dispatch:\n    inputs:\n      digest: {description: "image digest to restore (sha256:…)", required: true}\njobs:\n  rollback:\n    uses: acme/platform/.github/workflows/deploy.yml@v3     # the shared, reviewed deploy workflow\n    with: {environment: production, digest: "${{ inputs.digest }}"}\n    secrets: inherit', T)
      ],
      practice: [
        B('اكتب commits بصيغة conventional لأسبوع.', 'Write conventional commits for a week.'),
        B('ولّد changelog ورقم إصدار بالمثال.', 'Generate a changelog and version number with the example.'),
        B('شغّل trivy على صورتك.', 'Run trivy on your image.'),
        B('اعمل workflow_dispatch للـ rollback.', 'Create a workflow_dispatch for rollbacks.')
      ],
      words: [
        W('semantic versioning', 'ترقيم MAJOR.MINOR.PATCH', 'MAJOR.MINOR.PATCH version numbers', 'We follow semantic versioning.'),
        W('conventional commits', 'صيغة رسايل commits منظمة', 'a structured commit message format', 'Conventional commits drive the changelog.'),
        W('changelog', 'سجل التغييرات', 'a list of changes per version', 'Read the changelog before upgrading.'),
        W('release', 'إصدار: tag وصورة وملاحظات', 'a tagged, published version', 'Release 1.9.0 shipped on Tuesday.'),
        W('image scanning', 'فحص الصورة عن ثغرات', 'checking an image for known vulnerabilities', 'Image scanning blocked a critical CVE.'),
        W('trivy', 'أداة فحص صور الـ containers', 'a container image vulnerability scanner', 'trivy runs after every build.'),
        W('image signing', 'توقيع الصورة رقميًا', 'cryptographically signing an image', 'Image signing proves where it was built.'),
        W('cosign', 'أداة توقيع الصور', 'a tool for signing container images', 'cosign signs keylessly with OIDC.'),
        W('reusable workflow', 'pipeline مشترك بين ريبوهات', 'a workflow called by other workflows', 'All services use the reusable workflow.'),
        W('workflow_dispatch', 'تشغيل يدوي بمدخلات', 'a manual trigger with inputs', 'Roll back with workflow_dispatch.')
      ],
      read: [{ t: 'Conventional Commits', url: 'https://www.conventionalcommits.org/en/v1.0.0/', what: B('اقرا Summary.', 'Read the Summary.') }],
      challenge: B('اعمل عملية إصدار كاملة: conventional commits، رقم وchangelog بيتولّدوا تلقائي، tag وrelease على GitHub، صورة على GHCR متفحوصة بـ trivy وموقّعة بـ cosign، وworkflow_dispatch لنشر أو rollback لأي digest.', 'Build a full release process: conventional commits, an automatically generated number and changelog, a tag and a GitHub release, an image on GHCR scanned with trivy and signed with cosign, and a workflow_dispatch to deploy or roll back any digest.'),
      quiz: [
        Q(B('feat!: في commit:', 'feat!: in a commit:'), [['تغيير بيكسر → MAJOR', 'a breaking change → MAJOR'], ['إصلاح', 'a fix'], ['توثيق', 'docs']], 0, B('!', '!')),
        Q(B('trivy:', 'trivy:'), [['فحص ثغرات الصور', 'scanning images for vulnerabilities'], ['بناء الصور', 'building images'], ['قاعدة بيانات', 'a database']], 0, B('أمان.', 'Security.')),
        Q(B('rollback يدوي لنسخة معينة:', 'A manual rollback to a specific version:'), [['workflow_dispatch بالـ digest', 'workflow_dispatch with the digest'], ['ssh وتعديل يدوي', 'ssh and manual edits'], ['مستحيل', 'impossible']], 0, B('أتمتة.', 'Automation.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('من commit للإنتاج بأمان ومن غير توقف.', 'From commit to production, safely and without downtime.'),
      review: [
        B('multi-stage وslim وnon-root وترتيب الطبقات وhadolint.', 'Multi-stage, slim, non-root, layer order and hadolint.'),
        B('graceful shutdown وliveness وreadiness والـ workers.', 'Graceful shutdown, liveness, readiness and workers.'),
        B('matrix وcache وrequired checks وOIDC والـ digest.', 'Matrices, caching, required checks, OIDC and digests.'),
        B('staging والموافقة وblue-green وexpand/contract.', 'Staging, approval, blue-green and expand/contract.'),
        B('semver وconventional commits وtrivy وcosign.', 'Semver, conventional commits, trivy and cosign.')
      ],
      project: B('مشروع الأسبوع «خط إنتاج كامل» لخدمة المتجر: Dockerfile إنتاج (multi-stage، uv، non-root)، graceful shutdown وprobes، CI بـ matrix وكاش وintegration، صورة واحدة على GHCR بـ digest متفحوصة وموقّعة، staging تلقائي وproduction بموافقة وOIDC، blue-green بفحص صحة، ترحيل expand/contract حقيقي، إصدارات بـ conventional commits وchangelog، وworkflow للـ rollback — مع runbook.', 'Week project «a complete delivery pipeline» for the shop service: a production Dockerfile (multi-stage, uv, non-root), graceful shutdown and probes, CI with a matrix, caching and integration tests, one image on GHCR by digest, scanned and signed, automatic staging and approved production with OIDC, blue-green with a health check, a real expand/contract migration, releases with conventional commits and a changelog, and a rollback workflow — with a runbook.'),
      test: [
        Q(B('distroless:', 'Distroless:'), [['صورة فيها التطبيق وبيئته بس', 'an image with only the app and its runtime'], ['نظام تشغيل كامل', 'a full OS'], ['أداة CI', 'a CI tool']], 0, B('صغير.', 'Minimal.')),
        Q(B('USER في Dockerfile:', 'USER in a Dockerfile:'), [['شغّل كـ non-root', 'run as non-root'], ['اسم المطوّر', 'the developer’s name'], ['مش مهم', 'not important']], 0, B('أمان.', 'Security.')),
        Q(B('سر في ENV جوه Dockerfile:', 'A secret in ENV inside a Dockerfile:'), [['غلط: مرّره وقت التشغيل', 'wrong: pass it at runtime'], ['صح', 'right'], ['أسرع', 'faster']], 0, B('الصورة بتتشارك.', 'Images get shared.')),
        Q(B('readiness أثناء الإقفال:', 'Readiness during shutdown:'), [['503 فورًا', '503 immediately'], ['200 لحد الآخر', '200 until the end'], ['ولا رد', 'no reply']], 0, B('تصريف.', 'Draining.')),
        Q(B('stop_grace_period:', 'stop_grace_period:'), [['المهلة بين SIGTERM وSIGKILL', 'the wait between SIGTERM and SIGKILL'], ['زمن البناء', 'build time'], ['عمر الكاش', 'cache age']], 0, B('مهلة.', 'Grace.')),
        Q(B('concurrency group:', 'A concurrency group:'), [['يلغي التشغيل القديم لنفس الفرع', 'cancels older runs on the same branch'], ['يشغّل أكتر', 'runs more'], ['يمسح الفرع', 'deletes the branch']], 0, B('توفير.', 'Saving.')),
        Q(B('OIDC token:', 'An OIDC token:'), [['مؤقت وموقّع لريبو وفرع', 'short-lived and signed for a repo and branch'], ['كلمة سر دائمة', 'a permanent password'], ['ملف Docker', 'a Docker file']], 0, B('مؤقت.', 'Short-lived.')),
        Q(B('image tag «main»:', 'The image tag «main»:'), [['ممكن يتنقل لصورة تانية', 'can move to another image'], ['ثابت للأبد', 'fixed forever'], ['digest', 'a digest']], 0, B('متحرك.', 'Movable.')),
        Q(B('rolling update:', 'A rolling update:'), [['تبديل الـ instances واحد واحد', 'replacing instances one by one'], ['كله مرة واحدة', 'all at once'], ['من غير نشر', 'no deploy']], 0, B('تدريجي.', 'Gradual.')),
        Q(B('أول خطوة في expand/contract:', 'The first step of expand/contract:'), [['ضيف العمود الجديد', 'add the new column'], ['شيل القديم', 'drop the old one'], ['وقّف الخدمة', 'stop the service']], 0, B('توسيع.', 'Expand.')),
        Q(B('fix: في commit:', 'fix: in a commit:'), [['PATCH', 'PATCH'], ['MAJOR', 'MAJOR'], ['مفيش تغيير', 'no change']], 0, B('إصلاح.', 'A fix.')),
        Q(B('cosign:', 'cosign:'), [['توقيع الصور', 'signing images'], ['فحص الكود', 'scanning code'], ['تشغيل الاختبارات', 'running tests']], 0, B('توقيع.', 'Signing.'))
      ] }
  ]
};
