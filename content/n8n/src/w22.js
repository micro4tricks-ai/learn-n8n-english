// n8n week 22 — Security and backups.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الأمان والنسخ الاحتياطي', 'Security and backups'),
  goal: B('تأمّن سيرفر n8n بتاع عميل كأنه بيانات بنك: المستخدمين والصلاحيات، والأسرار، والـ nodes الخطيرة، والنسخ الاحتياطي اللي اتجرّب استرجاعه، والتحديثات من غير كوارث، والخصوصية.',
          'Secure a client\'s n8n server as if it held bank data: users and permissions, secrets, dangerous nodes, backups whose restore has been tested, updates without disasters, and privacy.'),
  days: [
    { title: B('تأمين n8n نفسه', 'Securing n8n itself'),
      goal: B('تقفل الحاجات الخطيرة في n8n وتظبط المستخدمين.', 'Lock down the risky parts of n8n and set up users.'),
      learn: [
        { h: B('المستخدمين', 'Users'),
          p: B('حساب owner واحد، وباقي الناس members بصلاحيات أقل. فعّل 2FA لكل حساب. ومتشاركش حساب واحد بين أكتر من شخص.', 'One owner account, everyone else as members with fewer permissions. Enable 2FA for every account. Never share one account between people.'),
          ex: 'Owner: you · Members: client staff · 2FA: on' },
        { h: B('الـ nodes الخطيرة', 'Dangerous nodes'),
          p: B('Execute Command وRead/Write Files بيوصلوا للسيرفر نفسه. لو مش محتاجهم: NODES_EXCLUDE. وN8N_BLOCK_ENV_ACCESS_IN_NODE=true يمنع الـ workflows تقرا متغيّرات البيئة (اللي فيها أسرار).', 'Execute Command and Read/Write Files reach the server itself. If you don\'t need them: NODES_EXCLUDE. N8N_BLOCK_ENV_ACCESS_IN_NODE=true stops workflows from reading environment variables (which hold secrets).'),
          ex: 'NODES_EXCLUDE=["n8n-nodes-base.executeCommand"]\nN8N_BLOCK_ENV_ACCESS_IN_NODE=true' },
        { h: B('الـ security audit', 'The security audit'),
          p: B('`n8n audit` بيطلع تقرير بالمخاطر: credentials مش مستخدمة، webhooks من غير حماية، nodes خطيرة، ونسخة قديمة. اعمله كل شهر.', '`n8n audit` produces a risk report: unused credentials, unprotected webhooks, risky nodes and an outdated version. Run it monthly.'),
          ex: 'docker exec -it n8n n8n audit' }
      ],
      practice: [
        B('اعمل مستخدم member واتأكد إنه مش شايف كل حاجة.', 'Create a member user and confirm they can\'t see everything.'),
        B('فعّل 2FA لحسابك.', 'Enable 2FA on your account.'),
        B('اقفل Execute Command بـ NODES_EXCLUDE (لو مش محتاجه).', 'Disable Execute Command with NODES_EXCLUDE (if unused).'),
        B('شغّل n8n audit واكتب 3 حاجات هتصلحها.', 'Run n8n audit and write 3 things you\'ll fix.')
      ],
      words: [
        { t: 'user management', m: B('إدارة المستخدمين وصلاحياتهم في n8n', 'managing users and their permissions in n8n'), ex: 'owner, admin, member' },
        { t: '2FA (MFA)', m: B('دخول بخطوتين: باسورد + كود', 'two-step login: password + code'), ex: 'Enable it for every account.' },
        { t: 'NODES_EXCLUDE', m: B('متغيّر بيقفل nodes معينة', 'a variable that disables specific nodes'), ex: 'executeCommand' },
        { t: 'N8N_BLOCK_ENV_ACCESS_IN_NODE', m: B('بيمنع الـ workflows تقرا متغيّرات البيئة', 'stops workflows from reading environment variables'), ex: 'true' },
        { t: 'n8n audit', m: B('أمر بيعمل تقرير أمان للـ instance', 'a command producing a security report for the instance'), ex: 'Run it monthly.' }],
      read: ['lib:n8n Docs: Securing n8n'],
      challenge: B('اعمل «security baseline» لأي n8n بتسلّمه: 10 إعدادات (مستخدمين، 2FA، nodes، env، webhooks محمية، HTTPS…) وطبّقها على سيرفرك.', 'Write a "security baseline" for any n8n you deliver: 10 settings (users, 2FA, nodes, env, protected webhooks, HTTPS…) and apply it to your server.'),
      quiz: [
        { q: B('شخصين بيستخدموا نفس الحساب:', 'Two people sharing one account:'), o: [B('غلط؛ حساب لكل واحد', 'wrong; one account each'), B('عادي', 'fine'), B('أوفر', 'cheaper')], a: 0, why: B('مساءلة وأمان.', 'Accountability and security.') },
        { q: B('Execute Command مش محتاجه:', 'You don\'t need Execute Command:'), o: ['NODES_EXCLUDE', 'leave it', 'hide it on the canvas'], a: 0, why: B('بيوصل للسيرفر.', 'It reaches the server.') },
        { q: B('تقرير مخاطر n8n:', 'An n8n risk report:'), o: ['n8n audit', 'docker ps', 'git log'], a: 0, why: B('audit.', 'audit.') }
      ] },

    { title: B('الأسرار والـ credentials', 'Secrets and credentials'),
      goal: B('تدير الأسرار صح: مشاركة محدودة، وتغيير دوري، ومفاتيح بأقل صلاحية.', 'Manage secrets properly: limited sharing, regular rotation and least-privilege keys.'),
      learn: [
        { h: B('مشاركة الـ credentials', 'Sharing credentials'),
          p: B('في n8n تقدر تشارك credential مع مستخدم يستخدمه من غير ما يشوف قيمته. ده أحسن من إنك تبعت الباسورد في شات.', 'In n8n you can share a credential so a user can use it without seeing its value. Much better than sending the password in a chat.'),
          ex: 'Share "Stripe (live)" with Ali → he can use it, not read it' },
        { h: B('المفاتيح بأقل صلاحية', 'Least-privilege keys'),
          p: B('لما تعمل API key في أي خدمة، اختار صلاحيات محدودة (قراءة بس لو كفاية)، ومفتاح لكل عميل أو workflow، عشان لو واحد اتسرّب تقفله لوحده.', 'When you create an API key in any service, choose limited permissions (read-only if enough), and one key per client or workflow, so a leak can be revoked on its own.'),
          ex: 'Stripe restricted key: read charges only' },
        { h: B('التغيير الدوري والتسرب', 'Rotation and leaks'),
          p: B('غيّر المفاتيح المهمة كل فترة، وفورًا لو حد ساب الفريق أو لو المفتاح ظهر في Git أو لوج. والشركات الكبيرة بتستخدم external secrets (vault) بدل ما الأسرار تبقى في n8n.', 'Rotate important keys periodically, and immediately if someone leaves or a key shows up in Git or a log. Larger companies use external secrets (a vault) instead of keeping secrets in n8n.'),
          ex: 'Key leaked in a commit → revoke → create new → update credential' }
      ],
      practice: [
        B('شارك credential مع مستخدم تاني واتأكد إنه مش شايف القيمة.', 'Share a credential with another user and confirm they can\'t see its value.'),
        B('اعمل API key بصلاحيات محدودة في خدمة بتستخدمها.', 'Create a limited-permission API key in a service you use.'),
        B('اعمل «rotation» لمفتاح: اعمل جديد، حدّث الـ credential، الغي القديم.', 'Rotate a key: create a new one, update the credential, revoke the old one.'),
        B('اكتب «secret leak runbook» في 6 خطوات.', 'Write a 6-step "secret leak runbook".')
      ],
      words: [
        { t: 'credential sharing', m: B('تديك استخدام credential من غير ما تشوف قيمته', 'letting someone use a credential without seeing its value'), ex: 'Share, don\'t send passwords.' },
        { t: 'restricted API key', m: B('مفتاح بصلاحيات محدودة', 'a key with limited permissions'), ex: 'Read-only key' },
        { t: 'secret rotation', m: B('تغيير المفاتيح والباسوردات دوريًا', 'changing keys and passwords periodically'), ex: 'Every 90 days' },
        { t: 'revoke', m: B('تلغي مفتاح أو token فورًا', 'cancel a key or token immediately'), ex: 'Revoke the leaked key.' },
        { t: 'external secrets (vault)', m: B('خزنة أسرار برّه n8n بتقرا منها', 'a secrets store outside n8n that it reads from'), ex: 'HashiCorp Vault, AWS Secrets Manager' }],
      read: [{ t: 'GitHub Docs: Secret scanning', url: 'https://docs.github.com/en/code-security/secret-scanning', what: B('اقرا إزاي GitHub بيكتشف المفاتيح المتسربة.', 'Read how GitHub detects leaked keys.') }],
      challenge: B('راجع كل credentials عندك: مين بيستخدم إيه، والصلاحيات، وآخر تغيير. اعمل جدول واقفل أي حاجة زيادة.', 'Review all your credentials: who uses what, their permissions and last rotation. Make a table and remove anything unneeded.'),
      quiz: [
        { q: B('زميل محتاج يستخدم مفتاح Stripe:', 'A colleague needs to use the Stripe key:'), o: [B('شارك الـ credential', 'share the credential'), B('ابعتله المفتاح على واتساب', 'send the key on WhatsApp'), B('اكتبه في sticky note', 'write it in a sticky note')], a: 0, why: B('من غير ما يشوفه.', 'Without revealing it.') },
        { q: B('مفتاح ظهر في commit:', 'A key appeared in a commit:'), o: [B('revoke فورًا وجديد', 'revoke immediately and replace it'), B('امسح الـ commit بس', 'just delete the commit'), B('ولا حاجة', 'nothing')], a: 0, why: B('اتسرّب خلاص.', 'It\'s already leaked.') },
        { q: B('أحسن API key:', 'The best API key:'), o: [B('بأقل صلاحية ولكل عميل', 'least privilege, one per client'), B('admin لكل حاجة', 'admin for everything'), B('واحد للكل', 'one for all')], a: 0, why: B('least privilege.', 'least privilege.') }
      ] },

    { title: B('النسخ الاحتياطي', 'Backups'),
      goal: B('تعمل نسخ احتياطي كامل وتجرّب الاسترجاع فعلًا.', 'Make complete backups and actually test the restore.'),
      learn: [
        { h: B('إيه اللي تنسخه', 'What to back up'),
          p: B('قاعدة البيانات (workflows وcredentials وexecutions)، والـ volume (ملفات، إعدادات)، وN8N_ENCRYPTION_KEY (من غيره الـ credentials مش هتتقري)، والـ compose و.env.', 'The database (workflows, credentials, executions), the volume (files, settings), N8N_ENCRYPTION_KEY (without it credentials can\'t be read), and the compose file and .env.'),
          ex: 'pg_dump n8n > n8n.sql\n+ n8n_data volume\n+ .env (encryption key) in a password manager' },
        { h: B('تصدير الـ workflows', 'Exporting workflows'),
          p: B('`n8n export:workflow --all --output=backups/` بيصدّر كل الـ workflows JSON (تحطها في Git). و`export:credentials` بيصدّرها مشفّرة؛ متستخدمش --decrypted إلا لو فاهم الخطر.', '`n8n export:workflow --all --output=backups/` exports every workflow as JSON (put them in Git). `export:credentials` exports them encrypted; don\'t use --decrypted unless you understand the risk.'),
          ex: 'n8n export:workflow --all --separate --output=/backups/workflows/' },
        { h: B('قاعدة 3-2-1', 'The 3-2-1 rule'),
          p: B('3 نسخ، على نوعين تخزين، واحدة منهم برّه السيرفر (S3 أو Drive). والأهم: جرّب الاسترجاع على سيرفر تاني. نسخة متجربتش = مفيش نسخة.', '3 copies, on 2 kinds of storage, 1 off the server (S3 or Drive). Most importantly: test a restore on another server. An untested backup = no backup.'),
          ex: 'Daily: pg_dump → S3 · Weekly: restore test on a fresh VM' }
      ],
      practice: [
        B('اعمل pg_dump لقاعدة n8n.', 'Run pg_dump on the n8n database.'),
        B('صدّر كل الـ workflows بـ n8n export:workflow وحطهم في Git.', 'Export every workflow with n8n export:workflow and put them in Git.'),
        B('اعمل workflow يومي بيعمل backup ويرفعه لـ S3/Drive.', 'Build a daily workflow that backs up and uploads to S3/Drive.'),
        B('استرجع النسخة على سيرفر أو container جديد واتأكد إن كل حاجة شغالة.', 'Restore the backup on a new server or container and confirm everything works.')
      ],
      words: [
        { t: 'n8n export:workflow', m: B('أمر CLI بيصدّر الـ workflows JSON', 'a CLI command exporting workflows as JSON'), ex: '--all --separate --output=…' },
        { t: '3-2-1 backup rule', m: B('3 نسخ، نوعين تخزين، واحدة برّه', '3 copies, 2 storage types, 1 off-site'), ex: 'Server + S3 + Drive' },
        { t: 'restore test', m: B('تجربة استرجاع النسخة فعلًا', 'actually trying to restore a backup'), ex: 'Monthly on a fresh VM' },
        { t: 'off-site backup', m: B('نسخة برّه السيرفر الأساسي', 'a copy outside the main server'), ex: 'S3 bucket in another region' },
        { t: 'RPO / RTO', m: B('أقصى بيانات ممكن تضيع / أقصى وقت للرجوع', 'the most data you may lose / the longest time to recover'), ex: 'RPO 24h · RTO 2h' }],
      read: ['lib:n8n Docs: Environment variables', { t: 'n8n CLI commands', url: 'https://docs.n8n.io/hosting/cli-commands/', what: B('اقرا export وimport.', 'Read export and import.') }],
      challenge: B('اعمل «disaster recovery drill»: امسح container n8n (تجريبي!) واسترجع كل حاجة من النسخ، واحسب الوقت، واكتب الخطوات في runbook.', 'Run a "disaster recovery drill": delete a (test!) n8n container, restore everything from backups, time it, and write the steps in a runbook.'),
      quiz: [
        { q: B('من غير N8N_ENCRYPTION_KEY في النسخة:', 'Without N8N_ENCRYPTION_KEY in the backup:'), o: [B('الـ credentials مش هتتقري', 'credentials can\'t be read'), B('كله تمام', 'all fine'), B('الـ workflows بتضيع', 'workflows are lost')], a: 0, why: B('مشفّرة بيه.', 'They\'re encrypted with it.') },
        { q: B('نسخة متجربش استرجاعها:', 'A backup never restored:'), o: [B('ممكن متشتغلش وقت الحاجة', 'may fail when you need it'), B('مضمونة', 'is guaranteed'), B('أحسن', 'is better')], a: 0, why: B('جرّب.', 'Test it.') },
        { q: B('3-2-1:', '3-2-1:'), o: [B('3 نسخ، نوعين، واحدة برّه', '3 copies, 2 types, 1 off-site'), B('3 سيرفرات', '3 servers'), B('3 أيام', '3 days')], a: 0, why: B('قاعدة النسخ.', 'The backup rule.') }
      ] },

    { title: B('التحديثات', 'Updates'),
      goal: B('تحدّث n8n بأمان: تقرا الـ release notes، وتجرّب في staging، وتقدر ترجع.', 'Update n8n safely: read the release notes, test on staging, and be able to roll back.'),
      learn: [
        { h: B('اقرا قبل ما تحدّث', 'Read before you update'),
          p: B('release notes بتقول الجديد والـ breaking changes (حاجات ممكن تكسر workflows). التحديث الكبير (major) خصوصًا محتاج قراءة وتجربة.', 'Release notes list what\'s new and the breaking changes (things that may break workflows). Major updates in particular need reading and testing.'),
          ex: 'Breaking change: node X renamed → check workflows using it' },
        { h: B('ثبّت النسخة', 'Pin the version'),
          p: B('في compose اكتب رقم نسخة (n8nio/n8n:1.x.y) مش latest، عشان التحديث يحصل وقت ما انت تقرر مش بالصدفة بعد restart.', 'In compose, write a version number (n8nio/n8n:1.x.y), not latest, so updates happen when you decide, not by accident after a restart.'),
          ex: 'image: docker.n8n.io/n8nio/n8n:1.110.1   (not :latest)' },
        { h: B('staging والرجوع', 'Staging and rollback'),
          p: B('جرّب النسخة الجديدة على staging (نسخة من الإنتاج) الأول. وقبل تحديث الإنتاج: backup، ولو حاجة وقعت، ارجع للنسخة القديمة واسترجع القاعدة.', 'Try the new version on staging (a copy of production) first. Before updating production: back up, and if something breaks, go back to the old version and restore the database.'),
          ex: 'backup → update image tag → up -d → smoke tests → (fail) → old tag + restore' }
      ],
      practice: [
        B('اقرا آخر 3 release notes لـ n8n واكتب أي breaking changes.', 'Read the last 3 n8n release notes and write down any breaking changes.'),
        B('ثبّت رقم النسخة في compose.', 'Pin the version number in compose.'),
        B('اعمل staging (container تاني بنسخة من البيانات) وحدّثه.', 'Create a staging instance (another container with a data copy) and update it.'),
        B('اكتب «update runbook» بخطوات الرجوع.', 'Write an "update runbook" including rollback steps.')
      ],
      words: [
        { t: 'release notes', m: B('ملاحظات بكل الجديد والتغييرات في نسخة', 'notes listing what\'s new and changed in a version'), ex: 'Read them before updating.' },
        { t: 'breaking change', m: B('تغيير ممكن يكسر حاجة شغالة', 'a change that may break something that works'), ex: 'A renamed node' },
        { t: 'pinned version', m: B('رقم نسخة ثابت بدل latest', 'a fixed version number instead of latest'), ex: 'n8n:1.110.1' },
        { t: 'staging instance', m: B('نسخة تجربة من الإنتاج', 'a test copy of production'), ex: 'Update staging first.' },
        { t: 'rollback', m: B('الرجوع للنسخة القديمة لو التحديث فشل', 'going back to the old version if an update fails'), ex: 'Old image tag + DB restore' }],
      read: ['lib:n8n Release notes'],
      challenge: B('اعمل تحديث حقيقي لـ n8n بتاعك بالـ runbook: backup، staging، smoke tests (workflows تجربة)، إنتاج، ووثّق كل خطوة والوقت.', 'Perform a real n8n update with the runbook: backup, staging, smoke tests (test workflows), production — documenting every step and the time taken.'),
      quiz: [
        { q: B('image: n8n:latest في الإنتاج:', 'image: n8n:latest in production:'), o: [B('خطر؛ ثبّت رقم', 'risky; pin a version'), B('ممتاز', 'great'), B('إجباري', 'required')], a: 0, why: B('تحديث مفاجئ.', 'Surprise updates.') },
        { q: B('قبل تحديث الإنتاج:', 'Before updating production:'), o: [B('backup وتجربة على staging', 'back up and test on staging'), B('ولا حاجة', 'nothing'), B('امسح الـ workflows', 'delete workflows')], a: 0, why: B('أمان.', 'Safety.') },
        { q: B('breaking change:', 'A breaking change:'), o: [B('ممكن يكسر workflows', 'may break workflows'), B('إصلاح أمني', 'a security fix'), B('لون جديد', 'a new colour')], a: 0, why: B('اقرا الـ notes.', 'Read the notes.') }
      ] },

    { title: B('الخصوصية والاحتفاظ بالبيانات', 'Privacy and data retention'),
      goal: B('تتعامل مع البيانات الشخصية بمسؤولية: متحفظش أكتر من اللازم، وتمسح القديم، وتحمي الـ logs.', 'Handle personal data responsibly: don\'t keep more than needed, delete old data, and protect logs.'),
      learn: [
        { h: B('البيانات الشخصية', 'Personal data'),
          p: B('أسماء وإيميلات وتليفونات وعناوين = PII. القوانين (زي GDPR) بتطلب: تجمع اللي محتاجه بس، وتحميه، وتمسحه لما مبقاش محتاجه، وتقول للناس بتعمل بيه إيه.', 'Names, emails, phones and addresses = PII. Laws (such as GDPR) require you to collect only what you need, protect it, delete it when no longer needed, and tell people what you do with it.'),
          ex: 'Only store the phone if you actually call customers.' },
        { h: B('التنفيذات فيها بيانات', 'Executions contain data'),
          p: B('كل تنفيذ محفوظ فيه البيانات اللي عدّت. ظبّط EXECUTIONS_DATA_PRUNE=true وEXECUTIONS_DATA_MAX_AGE (مثلًا 336 ساعة = 14 يوم)، ومتحفظش الناجح في workflows حساسة.', 'Every saved execution contains the data that passed through it. Set EXECUTIONS_DATA_PRUNE=true and EXECUTIONS_DATA_MAX_AGE (e.g. 336 hours = 14 days), and don\'t save successful runs of sensitive workflows.'),
          ex: 'EXECUTIONS_DATA_PRUNE=true\nEXECUTIONS_DATA_MAX_AGE=336' },
        { h: B('الـ logs والتنبيهات', 'Logs and alerts'),
          p: B('متبعتش بيانات شخصية كاملة في تنبيهات Telegram أو logs: اخفي جزء (a***@x.com، ****1234). وسجّل مين عمل إيه في البيانات الحساسة.', 'Don\'t send full personal data in Telegram alerts or logs: mask part of it (a***@x.com, ****1234). Record who did what with sensitive data.'),
          ex: '{{ $json.email.replace(/^(.).*(@.*)$/, "$1***$2") }}' }
      ],
      practice: [
        B('اعمل جرد للبيانات الشخصية اللي workflows عندك بتخزّنها.', 'Inventory the personal data your workflows store.'),
        B('ظبّط execution pruning بمدة مناسبة.', 'Set execution pruning to a suitable age.'),
        B('اخفي الإيميلات والتليفونات في تنبيهات Telegram.', 'Mask emails and phones in Telegram alerts.'),
        B('اعمل workflow بيمسح بيانات أقدم من سنة من Postgres.', 'Build a workflow that deletes data older than a year from Postgres.')
      ],
      words: [
        { t: 'PII (personal data)', m: B('بيانات بتحدد شخص: اسم، إيميل، تليفون', 'data that identifies a person: name, email, phone'), ex: 'Protect and minimise it.' },
        { t: 'data retention', m: B('مدة الاحتفاظ بالبيانات قبل ما تتمسح', 'how long data is kept before deletion'), ex: 'Delete leads after 12 months.' },
        { t: 'GDPR', m: B('قانون حماية البيانات الأوروبي', 'the European data protection law'), ex: 'Applies to EU customers.' },
        { t: 'EXECUTIONS_DATA_MAX_AGE', m: B('أقصى عمر للتنفيذات المحفوظة بالساعات', 'the maximum age of saved executions, in hours'), ex: '336 = 14 days' },
        { t: 'data masking', m: B('إخفاء جزء من البيانات الحساسة', 'hiding part of sensitive data'), ex: 'a***@x.com' }],
      read: [{ t: 'GDPR: summary (gdpr.eu)', url: 'https://gdpr.eu/what-is-gdpr/', what: B('اقرا الملخص والمبادئ الأساسية.', 'Read the summary and core principles.') }],
      challenge: B('اكتب «data handling policy» لعميل: البيانات اللي بتتجمع، وليه، وفين، ومدة الاحتفاظ، ومين يشوفها، وطبّق الإعدادات على السيرفر.', 'Write a "data handling policy" for a client: what data is collected, why, where, retention, and who sees it — and apply the settings on the server.'),
      quiz: [
        { q: B('تنفيذات قديمة فيها بيانات عملاء:', 'Old executions containing customer data:'), o: [B('execution pruning بمدة', 'prune them by age'), B('احتفظ للأبد', 'keep them forever'), B('مش مهم', 'irrelevant')], a: 0, why: B('retention.', 'retention.') },
        { q: B('تنبيه Telegram فيه إيميل عميل:', 'A Telegram alert with a customer email:'), o: [B('اخفي جزء منه', 'mask part of it'), B('ابعته كامل', 'send it in full'), B('ابعت الباسورد كمان', 'send the password too')], a: 0, why: B('masking.', 'masking.') },
        { q: B('PII:', 'PII is:'), o: [B('بيانات بتحدد شخص', 'data identifying a person'), B('نوع ملف', 'a file type'), B('بروتوكول', 'a protocol')], a: 0, why: B('شخصية.', 'Personal.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 23 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 23 opens when you score 70% or more.'),
      review: [
        B('المستخدمين و2FA وNODES_EXCLUDE وn8n audit.', 'Users, 2FA, NODES_EXCLUDE and n8n audit.'),
        B('مشاركة الـ credentials والمفاتيح المحدودة والتغيير.', 'Credential sharing, limited keys and rotation.'),
        B('النسخ: القاعدة والـ volume والمفتاح، 3-2-1، وتجربة الاسترجاع.', 'Backups: database, volume and key, 3-2-1, and restore tests.'),
        B('release notes ونسخة ثابتة وstaging وrollback.', 'Release notes, pinned versions, staging and rollback.'),
        B('PII وretention وpruning وmasking.', 'PII, retention, pruning and masking.')
      ],
      project: B('اعمل «security & backup package» للسيرفر بتاعك: security baseline مطبّق، وn8n audit نظيف، وbackup يومي (DB + workflows + volume) برّه السيرفر، وتجربة استرجاع موثّقة بالوقت، وupdate runbook، وdata handling policy. سلّمهم كـ PDF أو صفحة لعميل.',
                 'Build a "security & backup package" for your server: an applied security baseline, a clean n8n audit, a daily off-server backup (database + workflows + volume), a documented and timed restore test, an update runbook and a data handling policy. Deliver them as a PDF or page for a client.'),
      test: [
        { q: B('كل حساب n8n لازم:', 'Every n8n account should have:'), o: ['2FA', 'the owner role', 'no password'], a: 0, why: B('أمان.', 'Security.') },
        { q: B('تمنع الـ workflows تقرا الأسرار من البيئة:', 'Stop workflows reading secrets from the environment:'), o: ['N8N_BLOCK_ENV_ACCESS_IN_NODE=true', 'WEBHOOK_URL', 'GENERIC_TIMEZONE'], a: 0, why: B('حماية.', 'Protection.') },
        { q: B('n8n audit بيطلع:', 'n8n audit produces:'), o: [B('تقرير مخاطر', 'a risk report'), B('backup', 'a backup'), B('تحديث', 'an update')], a: 0, why: B('أمان.', 'Security.') },
        { q: B('credential مع زميل:', 'A credential for a colleague:'), o: [B('شاركه في n8n', 'share it in n8n'), B('ابعت الباسورد', 'send the password'), B('صوّر الشاشة', 'screenshot it')], a: 0, why: B('من غير كشف.', 'Without revealing it.') },
        { q: B('مفتاح اتسرّب:', 'A leaked key:'), o: [B('revoke وجديد', 'revoke and replace'), B('استنى', 'wait'), B('غيّر اسمه', 'rename it')], a: 0, why: B('فورًا.', 'Immediately.') },
        { q: B('نسخة n8n كاملة فيها:', 'A complete n8n backup includes:'), o: [B('DB والـ volume والـ encryption key', 'the DB, the volume and the encryption key'), B('الـ workflows بس', 'only workflows'), B('screenshots', 'screenshots')], a: 0, why: B('كلها.', 'All of them.') },
        { q: B('off-site يعني:', 'off-site means:'), o: [B('برّه السيرفر الأساسي', 'outside the main server'), B('على نفس الديسك', 'on the same disk'), B('في الذاكرة', 'in memory')], a: 0, why: B('لو السيرفر ضاع.', 'In case the server is lost.') },
        { q: B('أهم حاجة في النسخ:', 'The most important thing about backups:'), o: [B('تجربة الاسترجاع', 'testing the restore'), B('الاسم', 'the name'), B('الحجم', 'the size')], a: 0, why: B('نسخة متجربتش = مفيش.', 'Untested = none.') },
        { q: B('قبل تحديث major:', 'Before a major update:'), o: [B('اقرا breaking changes وجرّب staging', 'read breaking changes and test on staging'), B('حدّث على طول', 'update right away'), B('امسح الـ backup', 'delete the backup')], a: 0, why: B('أمان.', 'Safety.') },
        { q: B('التحديث كسر حاجة:', 'An update broke something:'), o: ['rollback (old tag + restore)', 'panic', 'delete n8n'], a: 0, why: B('خطة رجوع.', 'A rollback plan.') },
        { q: B('EXECUTIONS_DATA_MAX_AGE=336:', 'EXECUTIONS_DATA_MAX_AGE=336:'), o: [B('14 يوم', '14 days'), B('336 تنفيذ', '336 executions'), B('336 دقيقة', '336 minutes')], a: 0, why: B('بالساعات.', 'In hours.') },
        { q: B('a***@x.com مثال على:', 'a***@x.com is an example of:'), o: ['data masking', 'encryption', 'hashing'], a: 0, why: B('إخفاء جزء.', 'Hiding part.') }
      ] }
  ]
};
