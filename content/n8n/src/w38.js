// n8n week 38 — The n8n API and managing workflows in code.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('n8n API وإدارة الـ workflows بالكود', 'The n8n API and managing workflows in code'),
  goal: B('تدير n8n كنظام هندسي مش كواجهة بس: الـ API العام، الـ workflows كملفات JSON في Git بمراجعة، بيئات dev/staging/prod بترقية آمنة، سكربتات إدارة (نسخ احتياطي، تنبيهات، تنضيف)، واختبار الـ workflows آليًا قبل الترقية.',
          'Run n8n as an engineering system, not just a UI: the public API, workflows as JSON files in Git with review, dev/staging/prod environments with safe promotion, admin scripts (backups, alerts, clean-ups), and automatic workflow tests before promotion.'),
  days: [
    { title: B('الـ API العام', 'The public API'),
      goal: B('تتحكم في n8n من سكربت.', 'Control n8n from a script.'),
      learn: [
        L(B('المفتاح والـ endpoints', 'The key and the endpoints'),
          B('**public api** بتاع n8n (Settings ← n8n API) بيدّيك REST للـ workflows والـ executions والـ credentials والـ tags والمستخدمين. المفتاح بيتبعت في **api key header** `X-N8N-API-KEY`. اعمل مفتاح لكل سكربت بصلاحيات (scopes) محدودة وتاريخ انتهاء، وخزّنه في secret store.', 'n8n’s **public api** (Settings → n8n API) gives you REST for workflows, executions, credentials, tags and users. The key goes in the **api key header** `X-N8N-API-KEY`. Create one key per script with limited scopes and an expiry, and keep it in a secret store.'),
          'GET  /api/v1/workflows?active=true&tags=billing&limit=100\nGET  /api/v1/workflows/{id}\nPOST /api/v1/workflows/{id}/activate · /deactivate\nGET  /api/v1/executions?status=error&workflowId={id}&limit=50&includeData=false\nheaders: X-N8N-API-KEY: <key from Settings → n8n API>'),
        L(B('الصفحات', 'Pages'),
          B('الردود بتيجي صفحات بـ `nextCursor`. السكربت لازم يلف لحد ما الـ cursor يخلص (نفس نمط أسبوع 16) — وإلا هتشوف أول 100 workflow بس وتفتكر ده كل حاجة. والـ **executions endpoint** ممكن يكون كبير جدًا: `includeData=false` إلا لو محتاج التفاصيل.', 'Replies come in pages with a `nextCursor`. A script must loop until the cursor ends (the week 16 pattern) — or you see only the first 100 workflows and think that is everything. The **executions endpoint** can be huge: use `includeData=false` unless you need the details.'),
          'async function* all(path, key) {\n  let cursor;\n  do {\n    const url = new URL(`https://n8n.example.com/api/v1/${path}`);\n    url.searchParams.set("limit", "100");\n    if (cursor) url.searchParams.set("cursor", cursor);\n    const res = await fetch(url, { headers: { "X-N8N-API-KEY": key } });\n    if (!res.ok) throw new Error(`n8n API ${res.status}`);\n    const page = await res.json();\n    yield* page.data;\n    cursor = page.nextCursor;\n  } while (cursor);\n}\nfor await (const wf of all("workflows", process.env.N8N_API_KEY)) console.log(wf.id, wf.active, wf.name);'),
        L(B('n8n بيدير n8n', 'n8n managing n8n'),
          B('مش لازم سكربت برة: الـ **n8n node** (n8n API node) جوه n8n نفسه بيعمل نفس الحاجات بواجهة. workflow «إداري» مجدول ممكن يراجع الـ workflows والـ executions ويبعت تقارير. بس خلّي workflows الإدارة في مشروع منفصل بصلاحيات أعلى ومحمية.', 'You do not need an outside script: the **n8n node** (the n8n API node) inside n8n does the same with a UI. A scheduled «admin» workflow can review workflows and executions and send reports. But keep admin workflows in a separate, protected project with higher permissions.'),
          'Schedule (daily 08:00) → n8n node: Get many executions (status = error, last 24 h)\n→ Code: group by workflow, count, first error message\n→ Slack/Telegram: "6 failed runs: Invoices ×4 (CRM 401), Leads ×2 (timeout)"')
      ],
      practice: [
        B('اعمل مفتاح API بصلاحيات محدودة وجرّب GET workflows.', 'Create a limited API key and try GET workflows.'),
        B('اكتب سكربت يلف على كل الصفحات.', 'Write a script looping over every page.'),
        B('اعمل workflow إداري يلخص أخطاء امبارح.', 'Build an admin workflow summarising yesterday’s errors.'),
        B('فعّل وعطّل workflow من الـ API.', 'Activate and deactivate a workflow through the API.')
      ],
      words: [
        W('public api', 'الـ REST API الرسمي لـ n8n', 'n8n’s official REST API', 'The public API lists the workflows.'),
        W('api key header', 'الـ header اللي فيه مفتاح API', 'the header carrying the API key', 'Send X-N8N-API-KEY as the API key header.'),
        W('executions endpoint', 'endpoint سجلات التشغيل', 'the endpoint for run records', 'Query the executions endpoint for errors.'),
        W('includedata', 'خيار جلب تفاصيل التشغيل كاملة', 'the option fetching full run details', 'Set includeData=false for speed.'),
        W('admin workflow', 'workflow بيدير n8n نفسه', 'a workflow that manages n8n itself', 'The admin workflow reports failures daily.')
      ],
      read: [{ t: 'n8n Docs: n8n public API', url: 'https://docs.n8n.io/connect/n8n-api', what: B('اقرا Authentication وPagination.', 'Read Authentication and Pagination.') }, 'lib:n8n Docs: n8n node (API)'],
      challenge: B('اكتب سكربت Node (أو workflow) «جرد n8n»: كل الـ workflows بالحالة والـ tags وآخر تشغيل ونسبة الفشل في 7 أيام، ويطلّع CSV ويبعته لك أسبوعيًا.', 'Write a Node script (or workflow) «n8n inventory»: every workflow with status, tags, last run and 7-day failure rate, output as CSV and sent to you weekly.'),
      quiz: [
        Q(B('مفتاح API لسكربت النسخ:', 'An API key for the backup script:'), [['خاص بيه بصلاحيات محدودة', 'its own, with limited scopes'], ['مفتاح الأدمن العام', 'the general admin key'], ['من غير مفتاح', 'no key']], 0, B('least privilege.', 'Least privilege.')),
        Q(B('سكربت شاف 100 workflow بس:', 'A script saw only 100 workflows:'), [['نسي nextCursor', 'it forgot nextCursor'], ['ده العدد كله', 'that is all'], ['n8n بايظ', 'n8n is broken']], 0, B('صفحات.', 'Pages.')),
        Q(B('جلب آلاف الـ executions بسرعة:', 'Fetching thousands of executions quickly:'), [['includeData=false', 'includeData=false'], ['includeData=true', 'includeData=true'], ['واحد واحد', 'one by one']], 0, B('أخف.', 'Lighter.'))
      ] },

    { title: B('الـ workflows ككود', 'Workflows as code'),
      goal: B('كل workflow ملف في Git بتاريخ ومراجعة.', 'Every workflow is a file in Git with history and review.'),
      learn: [
        L(B('ملف JSON', 'A JSON file'),
          B('**workflow json** فيه الـ nodes والـ connections والإعدادات — **من غير** قيم الـ credentials (بس الاسم والـ id). يعني تقدر تحفظه في Git بأمان وتشوف الـ diff بين نسختين. **workflows as code** = Git هو المرجع: أي تعديل في الإنتاج لازم يرجع للريبو.', 'A **workflow json** holds the nodes, connections and settings — **without** credential values (only names and ids). So you can keep it in Git safely and see the diff between versions. **workflows as code** = Git is the source of truth: any change in production must come back to the repo.'),
          '{\n  "name": "Invoices — send on payment",\n  "nodes": [\n    { "name": "Shop Webhook", "type": "n8n-nodes-base.webhook", "parameters": { "path": "shop-paid", "httpMethod": "POST" } },\n    { "name": "Create PDF", "type": "n8n-nodes-base.httpRequest", "credentials": { "httpHeaderAuth": { "id": "12", "name": "PDF service" } } }\n  ],\n  "connections": { "Shop Webhook": { "main": [[{ "node": "Create PDF", "type": "main", "index": 0 }]] } },\n  "settings": { "executionOrder": "v1", "errorWorkflow": "88" },\n  "tags": [{ "name": "billing" }]\n}'),
        L(B('التصدير والاستيراد بالـ CLI', 'Export and import with the CLI'),
          B('`n8n export:workflow --backup --output=workflows/` بيطلّع كل workflow في ملف (مرتب وجاهز لـ Git). و`n8n import:workflow --separate --input=workflows/` بيرجّعهم. ونفس الكلام للـ credentials (مشفّرة بمفتاح الـ instance — `--decrypted` خطر، متعملوش إلا لنقل آمن).', '`n8n export:workflow --backup --output=workflows/` writes each workflow to its own file (tidy and Git-ready). And `n8n import:workflow --separate --input=workflows/` brings them back. The same exists for credentials (encrypted with the instance key — `--decrypted` is dangerous; use it only for a secure transfer).'),
          '# on the n8n server (or: docker exec -u node n8n …)\nn8n export:workflow --backup --output=/backup/workflows/\nn8n export:credentials --backup --output=/backup/credentials/      # still encrypted\ncd /backup && git add -A && git commit -m "chore(n8n): nightly export $(date +%F)" && git push\n\n# restoring on a new server\nn8n import:workflow --separate --input=/backup/workflows/'),
        L(B('المراجعة', 'Review'),
          B('تعديلات الـ workflows المهمة تعدّي بـ PR: الـ diff بيوري إيه اتغير (node اتضاف، شرط اتعدل، URL اتغير). عشان الـ diff يبقى مقروء: أسماء nodes واضحة، ومتغيّرش أماكن الـ nodes على الشاشة من غير داعي. ودوّر في المراجعة على: أسرار مكتوبة في parameters، URLs إنتاج في dev، error workflow ناقص.', 'Important workflow changes go through a PR: the diff shows what changed (a node added, a condition edited, a URL changed). To keep diffs readable: clear node names, and do not move nodes around on the canvas needlessly. In review, look for: secrets typed into parameters, production URLs in dev, a missing error workflow.'),
          'PR: "Invoices: retry the PDF service 3×"\n  ~ Create PDF.parameters.options.retry: { maxTries: 3, waitBetweenTries: 5000 }\n  + node "Notify failure" (Telegram) connected to the error output\n  review checklist: no secrets in parameters · error workflow set · test run attached · tags updated')
      ],
      practice: [
        B('صدّر كل الـ workflows وحطها في ريبو خاص.', 'Export every workflow into a private repo.'),
        B('عدّل workflow وشوف الـ diff.', 'Edit a workflow and look at the diff.'),
        B('دوّر في الملفات على أي سر مكتوب.', 'Search the files for any secret written in.'),
        B('استورد workflow على n8n تاني.', 'Import a workflow into another n8n.')
      ],
      words: [
        W('workflow json', 'ملف الـ workflow بصيغة JSON', 'a workflow as a JSON file', 'Commit the workflow JSON to Git.'),
        W('export:workflow', 'أمر CLI لتصدير الـ workflows', 'the CLI command exporting workflows', 'export:workflow --backup writes one file each.'),
        W('import:workflow', 'أمر CLI لاستيراد الـ workflows', 'the CLI command importing workflows', 'import:workflow restores them.'),
        W('workflows as code', 'إدارة الـ workflows كملفات في Git', 'managing workflows as files in Git', 'Workflows as code give us history.'),
        W('diff noise', 'تغييرات ملهاش معنى في الـ diff', 'changes in a diff that mean nothing', 'Moving nodes creates diff noise.')
      ],
      read: [{ t: 'n8n Docs: CLI commands', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/use-the-command-line', what: B('اقرا Export وImport.', 'Read Export and Import.') }],
      challenge: B('اعمل ريبو «n8n-workflows»: تصدير ليلي آلي (cron أو workflow) بـ commit، README بقايمة الـ workflows، وفحص آلي بيرفض أي ملف فيه كلمات زي «sk-» أو «password» في parameters.', 'Create an «n8n-workflows» repo: an automatic nightly export (cron or a workflow) with a commit, a README listing the workflows, and an automatic check rejecting any file containing words like «sk-» or «password» in parameters.'),
      quiz: [
        Q(B('ملف export فيه قيم الـ credentials؟', 'Does an exported workflow contain credential values?'), [['لأ؛ الاسم والـ id بس', 'no; only name and id'], ['أيوه', 'yes'], ['ساعات', 'sometimes']], 0, B('آمن لـ Git.', 'Safe for Git.')),
        Q(B('مرجع الحقيقة في workflows as code:', 'The source of truth in workflows as code:'), [['Git', 'Git'], ['الإنتاج', 'production'], ['ذاكرة المطوّر', 'the developer’s memory']], 0, B('تاريخ.', 'History.')),
        Q(B('--decrypted في export:', '--decrypted on export:'), [['خطر؛ للنقل الآمن بس', 'dangerous; secure transfers only'], ['دايمًا', 'always'], ['لـ Git', 'for Git']], 0, B('أسرار.', 'Secrets.'))
      ] },

    { title: B('البيئات والترقية', 'Environments and promotion'),
      goal: B('تغيّر بأمان: dev ← staging ← prod.', 'Change safely: dev → staging → prod.'),
      learn: [
        L(B('3 بيئات', 'Three environments'),
          B('**environment** = نسخة n8n منفصلة بقاعدتها وcredentials بتاعتها: dev (تجارب)، staging (نسخة طبق الأصل للاختبار)، prod (العملاء). **promotion** = نقل workflow من بيئة للي بعدها بعد ما يتختبر — مش تعديل مباشر في prod. وn8n Enterprise فيه source control مدمج بفروع Git لكل بيئة.', 'An **environment** = a separate n8n with its own database and credentials: dev (experiments), staging (a copy for testing), prod (customers). **promotion** = moving a workflow from one environment to the next after testing — not editing prod directly. n8n Enterprise has built-in source control with a Git branch per environment.'),
          'dev n8n ──export──▶ Git branch dev ──PR + review──▶ branch staging ──pull──▶ staging n8n (tests)\n                                    ──PR──▶ branch production ──pull──▶ prod n8n\nrule: nobody edits prod workflows by hand; hotfix = same path, faster'),
        L(B('الفرق بين البيئات', 'What differs between environments'),
          B('الـ workflow نفسه لازم يبقى **متطابق** في كل البيئات؛ اللي بيختلف: الـ credentials (نفس الاسم، قيم مختلفة — **credential per environment**)، والـ **variables** (`$vars.SHOP_API_URL`)، وroutes الـ webhooks. متكتبش URL إنتاج جوه node — حطه في متغير.', 'The workflow itself must be **identical** in every environment; what differs: credentials (same name, different values — a **credential per environment**), **variables** (`$vars.SHOP_API_URL`), and webhook routes. Never type a production URL into a node — put it in a variable.'),
          'HTTP Request URL: ={{ $vars.CRM_BASE_URL }}/deals\ncredential: "CRM API" (dev → sandbox key · prod → live key)\n$vars per environment:\n  dev:     CRM_BASE_URL=https://sandbox.crm.example   ALERT_CHAT=dev-alerts\n  prod:    CRM_BASE_URL=https://api.crm.example       ALERT_CHAT=ops'),
        L(B('من غير Enterprise', 'Without Enterprise'),
          B('ممكن تعمل نفس الفكرة بإيدك: export من dev ← Git ← سكربت بيستورد في staging بـ API ويفعّل ← اختبار ← نفس الشي لـ prod. والـ ids بتختلف بين البيئات — اربط بالاسم (أو tag) مش بالـ id، وخلّي error workflow وsub-workflows بيتحددوا بالاسم في السكربت.', 'You can do the same by hand: export from dev → Git → a script imports into staging via the API and activates → tests → the same for prod. Ids differ between environments — match by name (or tag), not id, and let the script resolve the error workflow and sub-workflows by name.'),
          'promote.mjs <workflow-name> <target>\n1. read workflows/<name>.json from the target branch\n2. find the workflow on the target by name (GET /workflows?name=…)\n3. map credential and sub-workflow ids by name on the target\n4. PUT /workflows/{id} (or POST if new) → POST /workflows/{id}/activate\n5. run the smoke webhook → expect 200 → otherwise deactivate and alert')
      ],
      practice: [
        B('شغّل n8n تاني (Docker) كـ staging.', 'Run a second n8n (Docker) as staging.'),
        B('انقل كل URLs لـ $vars.', 'Move every URL into $vars.'),
        B('اعمل credentials بنفس الاسم في البيئتين.', 'Create credentials with the same names in both environments.'),
        B('اكتب خطوات الترقية في README.', 'Write the promotion steps in the README.')
      ],
      words: [
        W('environment', 'نسخة n8n منفصلة لغرض', 'a separate n8n copy for a purpose', 'Test in the staging environment.'),
        W('promotion', 'نقل workflow لبيئة أعلى بعد الاختبار', 'moving a workflow up after testing', 'Promotion happens through a PR.'),
        W('$vars', 'متغيرات n8n لكل بيئة', 'n8n variables per environment', 'Read the API URL from $vars.'),
        W('credential per environment', 'نفس اسم الـ credential بقيم مختلفة لكل بيئة', 'the same credential name with values per environment', 'A credential per environment keeps workflows identical.'),
        W('rollback plan', 'خطة الرجوع للنسخة القديمة', 'the plan for returning to the old version', 'Every promotion has a rollback plan.')
      ],
      read: [{ t: 'n8n Docs: Source control and environments', url: 'https://docs.n8n.io/administer/use-source-control-and-environments', what: B('اقرا Environments in n8n.', 'Read Environments in n8n.') }],
      challenge: B('اعمل بيئتين (dev وprod محليًا بـ Docker)، وسكربت promote بيستورد workflow بالاسم ويربط الـ credentials ويفعّل ويشغّل smoke test — وجرّب ترقية تعديل حقيقي.', 'Set up two environments (dev and prod locally with Docker) and a promote script that imports a workflow by name, maps credentials, activates and runs a smoke test — then promote a real change.'),
      quiz: [
        Q(B('URL الإنتاج مكانه:', 'The production URL belongs:'), [['$vars أو credential', 'in $vars or a credential'], ['جوه node', 'inside a node'], ['README', 'in the README']], 0, B('متطابق.', 'Identical workflows.')),
        Q(B('تعديل مباشر في prod:', 'Editing prod directly:'), [['لأ؛ promotion عبر Git', 'no; promotion through Git'], ['عادي', 'fine'], ['بالليل بس', 'only at night']], 0, B('مراجعة.', 'Review.')),
        Q(B('ربط sub-workflow بين البيئات:', 'Linking a sub-workflow across environments:'), [['بالاسم', 'by name'], ['بالـ id', 'by id'], ['مستحيل', 'impossible']], 0, B('الـ ids بتختلف.', 'Ids differ.'))
      ] },

    { title: B('سكربتات الإدارة', 'Admin scripts'),
      goal: B('n8n بينضّف نفسه ويبلّغ عن نفسه.', 'n8n cleans and reports on itself.'),
      learn: [
        L(B('النسخ والاسترجاع', 'Backup and restore'),
          B('**backup script** ليلي: export workflows وcredentials (مشفّرة) + dump قاعدة n8n (Postgres) + ملف `.env` ومفتاح التشفير `N8N_ENCRYPTION_KEY` في مكان آمن منفصل — من غير المفتاح، الـ credentials المنسوخة **مش هتتفك**. وجرّب الاسترجاع على سيرفر تاني كل شهر.', 'A nightly **backup script**: export workflows and credentials (encrypted) + a dump of n8n’s database (Postgres) + the `.env` file and the encryption key `N8N_ENCRYPTION_KEY` in a separate safe place — without the key, backed-up credentials **cannot be decrypted**. And test the restore on another server monthly.'),
          '#!/bin/sh  (nightly, cron 02:30)\nset -e\nD=/backup/$(date +%F)\nmkdir -p $D\ndocker exec -u node n8n n8n export:workflow --backup --output=/home/node/backup/wf/\ndocker exec -u node n8n n8n export:credentials --backup --output=/home/node/backup/cred/\npg_dump "$N8N_DB_URL" -Fc -f $D/n8n.dump\ncp -r /data/n8n-backup/* $D/ && find /backup -maxdepth 1 -mtime +30 -exec rm -rf {} +\n# N8N_ENCRYPTION_KEY lives in the password manager, NOT next to the backup'),
        L(B('تنضيف وتدقيق', 'Clean-up and audit'),
          B('مع الوقت بيتراكم: **stale workflow** (مشغّل بس متنفذش من 90 يوم)، workflows من غير tag أو صاحب، workflows من غير error workflow، executions قديمة بتكبّر القاعدة. **workflow audit** شهري بيلاقيهم: سكربت أو workflow بيطلّع تقرير، وإنسان يقرر.', 'Over time things pile up: a **stale workflow** (active but not run for 90 days), workflows without a tag or owner, workflows without an error workflow, old executions bloating the database. A monthly **workflow audit** finds them: a script or workflow produces a report, and a person decides.'),
          'for each workflow:\n  active && lastRun > 90 days         → "stale: deactivate?"\n  no tag "owner:*"                    → "no owner"\n  !settings.errorWorkflow             → "no error workflow"\n  parameters contain /https?:\\/\\/[^{]*prod/ in dev → "hard-coded prod URL"\nexecutions: EXECUTIONS_DATA_PRUNE=true · EXECUTIONS_DATA_MAX_AGE=336 (14 days)'),
        L(B('تنبيهات ذكية', 'Smart alerts'),
          B('الـ Error Trigger بيبلّغ عن كل فشل — ممكن يبقى إزعاج. اعمل تنبيهات بتجمّع: «Invoices فشل 5 مرات في ساعة»، و«مفيش تشغيل لـ Daily Report النهارده» (heartbeat — أسبوع 17 JS)، و«مدة التشغيل ضعف المعتاد». ورسالة فيها الرابط والسبب الأول والخطوة الجاية.', 'The Error Trigger reports every failure — that can be noise. Build aggregating alerts: «Invoices failed 5 times in an hour», «Daily Report did not run today» (a heartbeat), and «the run took twice as long as usual». A message with the link, the first cause and the next step.'),
          '🔴 Invoices — 5 failures in 60 min (first: CRM 401 Unauthorized)\n   likely: the CRM key expired · runbook: wiki/n8n/crm-key-rotation\n   open: https://n8n.example.com/workflow/42/executions?status=error\n🟡 Daily Report — no successful run since 07:00 (expected 07:05)')
      ],
      practice: [
        B('اعمل backup script وجرّب الاسترجاع على Docker تاني.', 'Write a backup script and test the restore on another Docker.'),
        B('احفظ N8N_ENCRYPTION_KEY في مدير كلمات السر.', 'Store N8N_ENCRYPTION_KEY in a password manager.'),
        B('اعمل تقرير audit شهري.', 'Build a monthly audit report.'),
        B('اعمل تنبيه «مفيش تشغيل النهارده».', 'Build a «no run today» alert.')
      ],
      words: [
        W('backup script', 'سكربت النسخ الاحتياطي', 'the backup script', 'The backup script runs at 02:30.'),
        W('restore drill', 'تجربة استرجاع النسخة', 'a practice run of restoring a backup', 'The monthly restore drill passed.'),
        W('stale workflow', 'workflow مشغّل ومبيستخدمش', 'an active workflow nobody uses', 'Deactivate the stale workflow.'),
        W('workflow audit', 'مراجعة دورية للـ workflows', 'a regular review of workflows', 'The workflow audit found 7 without owners.'),
        W('retention policy', 'سياسة مدة الاحتفاظ بالبيانات', 'how long data is kept', 'The retention policy keeps 14 days.')
      ],
      read: [{ t: 'n8n Docs: Manage execution data', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/manage-execution-data', what: B('اقرا Enable data pruning.', 'Read Enable data pruning.') }],
      challenge: B('اعمل «حارس n8n»: backup ليلي بتجربة استرجاع شهرية، audit شهري بتقرير، تنبيهات مجمّعة (فشل متكرر، مفيش تشغيل، بطء)، وpruning للـ executions — كله موثّق في runbook.', 'Build an «n8n guardian»: a nightly backup with a monthly restore drill, a monthly audit report, aggregated alerts (repeated failures, no run, slowness) and execution pruning — all documented in a runbook.'),
      quiz: [
        Q(B('backup من غير N8N_ENCRYPTION_KEY:', 'A backup without N8N_ENCRYPTION_KEY:'), [['الـ credentials مش هتتفك', 'credentials cannot be decrypted'], ['تمام', 'fine'], ['أصغر', 'smaller']], 0, B('احفظه منفصل.', 'Keep it separately.')),
        Q(B('workflow مشغّل ومتنفذش من 6 شهور:', 'Active but not run for 6 months:'), [['stale workflow', 'stale workflow'], ['hotfix', 'hotfix'], ['smoke test', 'smoke test']], 0, B('audit.', 'Audit.')),
        Q(B('تنبيه لكل فشل لوحده:', 'An alert for every single failure:'), [['ممكن يبقى إزعاج؛ جمّع', 'can be noise; aggregate'], ['الأحسن', 'the best'], ['إجباري', 'required']], 0, B('ذكي.', 'Smart.'))
      ] },

    { title: B('اختبار الـ workflows آليًا', 'Testing workflows automatically'),
      goal: B('الـ workflow بيتختبر قبل ما يتنقل للإنتاج.', 'A workflow is tested before it moves to production.'),
      learn: [
        L(B('بيانات اختبار ثابتة', 'Fixed test data'),
          B('**pinned data**: تثبّت خرج node (رد webhook أو API) عشان تطوّر وتختبر من غير ما تكلّم الخدمة كل مرة. و**test execution** يدوي على حالات متعددة: طلب عادي، بيانات ناقصة، عربي، رقم كبير. بس ده يدوي — عايزين حاجة بتشتغل لوحدها.', '**pinned data**: freeze a node’s output (a webhook or API reply) so you develop and test without calling the service each time. And a manual **test execution** on several cases: a normal order, missing data, Arabic, a big number. But that is manual — we want something automatic.'),
          'pin on "Shop Webhook": { "id": "T-1", "customer": "سارة", "total": 1250.5, "items": [{ "sku": "A1", "qty": 2 }] }\ncases: normal · no phone · total 0 · 200 items · Arabic + emoji name · duplicate event id'),
        L(B('smoke webhook', 'A smoke webhook'),
          B('أضف لكل workflow مهم مسار اختبار: نفس الـ webhook بـ header `X-Test: 1` بيمشي في المنطق كله بس بيبدّل الخدمات الخارجية بـ stubs (أو بيستخدم credentials sandbox) ويرجّع نتيجة متوقعة. **ci job** بعد الترقية لـ staging بيبعتله حالات ويتأكد من الردود.', 'Give each important workflow a test path: the same webhook with an `X-Test: 1` header runs the whole logic but swaps outside services for stubs (or uses sandbox credentials) and returns an expected result. A **ci job** after promoting to staging sends cases and checks the replies.'),
          '# .github/workflows/n8n-staging.yml (after the promote step)\n- run: node scripts/promote.mjs "Invoices — send on payment" staging\n- run: node scripts/smoke.mjs https://staging-n8n.example.com/webhook/shop-paid test/cases/*.json\n# smoke.mjs: POST each case with X-Test: 1 → expect { ok: true, invoice: "TEST-…" } within 10 s'),
        L(B('فحص ملفات الـ workflows', 'Checking workflow files'),
          B('**workflow linter** بسيط (سكربت Node على ملفات JSON) بيفرض قواعدك قبل الدمج: كل workflow ليه error workflow، كل HTTP Request ليه timeout وretry، مفيش credential مكتوبة في parameters، كل webhook ليه authentication، أسماء الـ nodes مش «HTTP Request1».', 'A simple **workflow linter** (a Node script over the JSON files) enforces your rules before merging: every workflow has an error workflow, every HTTP Request has a timeout and retries, no credential typed into parameters, every webhook has authentication, node names are not «HTTP Request1».'),
          'const rules = [\n  [wf => !wf.settings?.errorWorkflow, "no error workflow"],\n  [wf => wf.nodes.some(n => /^HTTP Request\\d*$/.test(n.name)), "rename default node names"],\n  [wf => wf.nodes.some(n => n.type.endsWith(".webhook") && !n.parameters.authentication), "webhook without authentication"],\n  [wf => wf.nodes.some(n => n.type.endsWith(".httpRequest") && !n.parameters.options?.timeout), "HTTP Request without timeout"],\n  [wf => /("password"|"apiKey"|sk-[A-Za-z0-9])/.test(JSON.stringify(wf.nodes.map(n => n.parameters))), "possible secret in parameters"],\n];\n// for each workflows/*.json → print file + failed rules → exit 1 if any')
      ],
      practice: [
        B('ثبّت بيانات 6 حالات على webhook وجرّبهم.', 'Pin 6 cases on a webhook and run them.'),
        B('ضيف مسار X-Test لـ workflow مهم.', 'Add an X-Test path to an important workflow.'),
        B('اكتب smoke.mjs يبعت الحالات ويتأكد.', 'Write smoke.mjs sending the cases and checking.'),
        B('اكتب workflow linter بـ 5 قواعد.', 'Write a workflow linter with 5 rules.')
      ],
      words: [
        W('pinned data', 'بيانات مثبّتة لخرج node للاختبار', 'frozen node output for testing', 'Use pinned data while building.'),
        W('test execution', 'تشغيل تجريبي للـ workflow', 'a trial run of a workflow', 'Run a test execution with the Arabic case.'),
        W('workflow linter', 'سكربت بيفحص قواعد ملفات الـ workflows', 'a script checking rules on workflow files', 'The workflow linter found a webhook with no auth.'),
        W('ci job', 'خطوة آلية في CI', 'an automatic step in CI', 'The CI job runs the smoke cases.'),
        W('test header', 'header بيحوّل الـ workflow لوضع الاختبار', 'a header switching a workflow to test mode', 'X-Test is the test header.')
      ],
      read: [{ t: 'n8n Docs: Test and improve AI workflows', url: 'https://docs.n8n.io/build/integrate-ai/test-and-improve-ai-workflows/understand-why-to-test', what: B('ربطها بالتقييمات (أسبوع 34).', 'Link it to evaluations (week 34).') }],
      challenge: B('اعمل pipeline لـ workflow مهم: linter على الـ JSON في كل PR، promote لـ staging، smoke بـ 6 حالات، وترقية prod بس لو كله نجح — مع تقرير في الـ PR.', 'Build a pipeline for an important workflow: the linter on the JSON in every PR, promotion to staging, a 6-case smoke run, and prod promotion only if everything passes — with a report on the PR.'),
      quiz: [
        Q(B('تطوير من غير ما تكلّم الخدمة كل مرة:', 'Developing without calling the service each time:'), [['pinned data', 'pinned data'], ['credentials إنتاج', 'production credentials'], ['مستحيل', 'impossible']], 0, B('ثابت.', 'Frozen.')),
        Q(B('اختبار بعد الترقية لـ staging:', 'Testing after promoting to staging:'), [['smoke webhook بحالات', 'a smoke webhook with cases'], ['استنى العملاء', 'wait for customers'], ['مش لازم', 'not needed']], 0, B('آلي.', 'Automatic.')),
        Q(B('webhook من غير authentication في PR:', 'A webhook without authentication in a PR:'), [['الـ linter يرفضه', 'the linter rejects it'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('قواعد.', 'Rules.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('n8n بتديره كمهندس.', 'n8n run by an engineer.'),
      review: [
        B('الـ API العام: المفاتيح والـ endpoints والصفحات والـ n8n node.', 'The public API: keys, endpoints, pages and the n8n node.'),
        B('workflows as code: JSON في Git، export/import، مراجعة PR.', 'Workflows as code: JSON in Git, export/import, PR review.'),
        B('البيئات والترقية و$vars وcredentials لكل بيئة.', 'Environments, promotion, $vars and per-environment credentials.'),
        B('النسخ والاسترجاع ومفتاح التشفير والـ audit والتنبيهات المجمّعة.', 'Backup and restore, the encryption key, audits and aggregated alerts.'),
        B('pinned data وsmoke webhooks وworkflow linter في CI.', 'Pinned data, smoke webhooks and a workflow linter in CI.')
      ],
      project: B('ابني «n8n كمنتج هندسي» لـ 3 workflows مهمة: ريبو بالـ JSON وتصدير ليلي، بيئتين (dev/prod) بـ $vars وcredentials بنفس الأسماء، سكربت promote بالاسم، workflow linter وsmoke في GitHub Actions، backup كامل بتجربة استرجاع، audit شهري وتنبيهات مجمّعة — وrunbook يشرح كل حاجة.', 'Build «n8n as an engineered product» for 3 important workflows: a repo of JSON with a nightly export, two environments (dev/prod) with $vars and same-name credentials, a promote-by-name script, a workflow linter and smoke tests in GitHub Actions, a full backup with a restore drill, a monthly audit and aggregated alerts — and a runbook explaining everything.'),
      test: [
        Q(B('header مفتاح الـ API:', 'The API key header:'), [['X-N8N-API-KEY', 'X-N8N-API-KEY'], ['Authorization: Basic', 'Authorization: Basic'], ['Cookie', 'Cookie']], 0, B('n8n.', 'n8n.')),
        Q(B('آخر صفحة لما:', 'The last page is when:'), [['nextCursor فاضي', 'nextCursor is empty'], ['100 عنصر', '100 items'], ['أول خطأ', 'the first error']], 0, B('cursor.', 'Cursor.')),
        Q(B('n8n يراجع n8n:', 'n8n reviewing n8n:'), [['n8n node في workflow إداري', 'the n8n node in an admin workflow'], ['Code node بس', 'only a Code node'], ['مستحيل', 'impossible']], 0, B('API.', 'The API.')),
        Q(B('ملف workflow في Git:', 'A workflow file in Git:'), [['آمن (من غير قيم أسرار)', 'safe (no secret values)'], ['فيه كل الأسرار', 'holds all secrets'], ['ممنوع', 'forbidden']], 0, B('أسماء فقط.', 'Names only.')),
        Q(B('تصدير كل workflow في ملف:', 'Exporting each workflow to a file:'), [['export:workflow --backup', 'export:workflow --backup'], ['import:workflow', 'import:workflow'], ['n8n start', 'n8n start']], 0, B('CLI.', 'CLI.')),
        Q(B('تعديل في الإنتاج:', 'A change in production:'), [['عبر Git وPR وترقية', 'through Git, a PR and promotion'], ['مباشر', 'directly'], ['بالتليفون', 'by phone']], 0, B('مراجعة.', 'Review.')),
        Q(B('بين البيئات بيختلف:', 'Between environments what differs is:'), [['credentials و$vars', 'credentials and $vars'], ['الـ workflow نفسه', 'the workflow itself'], ['كل حاجة', 'everything']], 0, B('متطابق.', 'Identical.')),
        Q(B('ids بين البيئات:', 'Ids across environments:'), [['بتختلف؛ اربط بالاسم', 'differ; match by name'], ['ثابتة', 'are fixed'], ['مش موجودة', 'do not exist']], 0, B('اسم.', 'Name.')),
        Q(B('مفتاح التشفير مكانه:', 'The encryption key belongs:'), [['مكان آمن منفصل عن الـ backup', 'somewhere safe, apart from the backup'], ['جنب الـ backup', 'next to the backup'], ['Git', 'in Git']], 0, B('أمان.', 'Safety.')),
        Q(B('workflow مالوش صاحب ولا تشغيل:', 'A workflow with no owner and no runs:'), [['audit يطلّعه وإنسان يقرر', 'the audit flags it and a person decides'], ['اتمسح آلي', 'auto-delete'], ['سيبه', 'leave it']], 0, B('تنضيف.', 'Clean-up.')),
        Q(B('X-Test: 1:', 'X-Test: 1:'), [['مسار اختبار بـ stubs', 'a test path with stubs'], ['تشغيل إنتاج', 'a production run'], ['خطأ', 'an error']], 0, B('smoke.', 'Smoke.')),
        Q(B('workflow linter بيفحص:', 'A workflow linter checks:'), [['قواعدك على ملفات JSON', 'your rules on JSON files'], ['سرعة السيرفر', 'server speed'], ['الـ CSS', 'the CSS']], 0, B('قبل الدمج.', 'Before merging.'))
      ] }
  ]
};
