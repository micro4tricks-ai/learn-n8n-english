// n8n week 41 — Security in depth: secrets, access and audit.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الأمان بعمق: الأسرار والصلاحيات والتدقيق', 'Security in depth: secrets, access and audit'),
  goal: B('تحمي n8n زي ما تحمي بنك صغير — لأنه ماسك مفاتيح كل أنظمة العميل: نموذج تهديد، أسرار في secret store، صلاحيات ومشاريع وSSO و2FA، webhooks محمية، Code node والـ community nodes بحدود، تشفير وTLS، وتدقيق دوري وسجل أحداث.',
          'Protect n8n like a small bank — because it holds the keys to all of a client’s systems: a threat model, secrets in a secret store, permissions, projects, SSO and 2FA, protected webhooks, limits on the Code node and community nodes, encryption and TLS, and regular audits with an event log.'),
  days: [
    { title: B('نموذج التهديد', 'The threat model'),
      goal: B('تعرف مين ممكن يهاجم وإزاي، قبل ما تحمي.', 'Know who could attack and how, before protecting.'),
      learn: [
        L(B('ليه n8n هدف ثمين', 'Why n8n is a valuable target'),
          B('n8n فيه credentials لـ CRM والإيميل والدفع والقاعدة — اللي يدخله بياخد كل حاجة. **threat model**: إيه اللي بنحميه (credentials، بيانات العملاء، الـ workflows)، مين ممكن يهاجم (حد من برة، موظف، community node مضروب)، ومنين (**attack surface**: الواجهة، الـ webhooks، الـ API، الـ Code node، السيرفر).', 'n8n holds credentials for the CRM, email, payments and the database — whoever gets in takes everything. A **threat model**: what we protect (credentials, customer data, workflows), who might attack (an outsider, an employee, a compromised community node), and from where (the **attack surface**: the UI, webhooks, the API, the Code node, the server).'),
          'asset              threat                                   control\ncredentials        stolen admin password → all keys          SSO + 2FA, few owners, external secrets\nwebhooks           fake orders / flooding                   auth header or HMAC, rate limit at the proxy\nCode node          a user reads env vars or the filesystem  block env access, task runners, review\ncommunity nodes    malicious package update                 allow-list, pin versions, review\nserver             open SSH / old Docker image              firewall, updates, no root, backups'),
        L(B('الدفاع في طبقات', 'Defence in depth'),
          B('مفيش قفل واحد كفاية: شبكة (firewall، الواجهة ورا VPN أو IP allowlist)، هوية (SSO، 2FA)، صلاحيات (مشاريع وأدوار)، تطبيق (webhooks محمية، Code محدود)، بيانات (تشفير، أسرار برة)، مراقبة (تدقيق وتنبيهات). لو طبقة اتكسرت، اللي بعدها يوقف.', 'No single lock is enough: network (a firewall, the UI behind a VPN or IP allow-list), identity (SSO, 2FA), permissions (projects and roles), application (protected webhooks, a limited Code node), data (encryption, secrets outside), monitoring (audits and alerts). If one layer breaks, the next stops the attacker.'),
          'internet → Caddy (TLS, rate limit, /webhook/* only public)\n         → UI and /rest only from office IPs or Tailscale\n         → n8n: SSO + 2FA, projects per client, Member role by default\n         → credentials from Vault, Code node without env access, blocked nodes\n         → Postgres private network · backups encrypted · audit log → SIEM'),
        L(B('أخطر 5 غلطات', 'The 5 worst mistakes'),
          B('من واقع الحوادث: (1) واجهة n8n مفتوحة للنت بكلمة سر ضعيفة من غير 2FA، (2) webhooks من غير أي مصادقة، (3) Code/Execute Command بيقروا `.env` أو ينفّذوا أوامر سيرفر، (4) community node من غير مراجعة، (5) نسخة n8n قديمة فيها ثغرات معروفة.', 'From real incidents: (1) the n8n UI open to the internet with a weak password and no 2FA, (2) webhooks with no authentication, (3) Code/Execute Command reading `.env` or running server commands, (4) an unreviewed community node, (5) an old n8n version with known vulnerabilities.'),
          'quick self-check (yes/no)\n[ ] UI reachable from the internet? → restrict\n[ ] owner/admin accounts have 2FA?\n[ ] every production webhook authenticated?\n[ ] Execute Command / env access disabled?\n[ ] n8n updated in the last 30 days? (security advisories on GitHub)')
      ],
      practice: [
        B('اكتب threat model لـ n8n عندك (جدول الأصول والتهديدات).', 'Write a threat model for your n8n (assets and threats table).'),
        B('ارسم طبقات الدفاع الحالية والناقصة.', 'Draw the current and missing defence layers.'),
        B('جاوب الـ self-check بصراحة.', 'Answer the self-check honestly.'),
        B('اشترك في GitHub security advisories لـ n8n.', 'Subscribe to n8n’s GitHub security advisories.')
      ],
      words: [
        W('threat model', 'تحليل الأصول والتهديدات والحماية', 'an analysis of assets, threats and controls', 'Start with a threat model.'),
        W('attack surface', 'كل الأماكن اللي ممكن يتهاجم منها النظام', 'every place a system can be attacked from', 'Public webhooks widen the attack surface.'),
        W('defence in depth', 'حماية بطبقات كتير', 'protection in many layers', 'Defence in depth stops a single failure.'),
        W('security advisory', 'إعلان رسمي عن ثغرة وتصليحها', 'an official notice of a vulnerability and its fix', 'Read the latest security advisory.'),
        W('ip allowlist', 'قايمة عناوين مسموح لها بس', 'a list of the only allowed addresses', 'The UI has an IP allowlist.')
      ],
      read: [{ t: 'n8n Docs: Securing n8n', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security', what: B('اقرا القايمة كلها.', 'Read the whole list.') }, { t: 'OWASP: Threat Modeling Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html', what: B('اقرا الخطوات الأربعة.', 'Read the four steps.') }],
      challenge: B('اعمل threat model كامل لـ n8n عميل: الأصول، المهاجمين، سطح الهجوم، الحماية الحالية، والفجوات بأولويات — صفحة واحدة يفهمها صاحب الشركة.', 'Write a full threat model for a client’s n8n: assets, attackers, the attack surface, current controls and prioritised gaps — one page the business owner understands.'),
      quiz: [
        Q(B('ليه n8n هدف ثمين؟', 'Why is n8n a valuable target?'), [['فيه مفاتيح كل الأنظمة', 'it holds keys to every system'], ['شكله حلو', 'it looks nice'], ['مجاني', 'it is free']], 0, B('credentials.', 'Credentials.')),
        Q(B('defence in depth:', 'Defence in depth:'), [['طبقات حماية كتير', 'many layers of protection'], ['كلمة سر قوية بس', 'just a strong password'], ['firewall بس', 'just a firewall']], 0, B('طبقات.', 'Layers.')),
        Q(B('الواجهة مفتوحة للنت من غير 2FA:', 'The UI open to the internet without 2FA:'), [['من أخطر الغلطات', 'one of the worst mistakes'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('اقفل.', 'Restrict it.'))
      ] },

    { title: B('الأسرار', 'Secrets'),
      goal: B('الأسرار متتسربش ومتتنسخش وبتتغير بسهولة.', 'Secrets do not leak, do not get copied, and rotate easily.'),
      learn: [
        L(B('أماكن الأسرار', 'Where secrets live'),
          B('3 أنواع: مفتاح التشفير `N8N_ENCRYPTION_KEY` (أهم سر)، أسرار التشغيل (DB، Redis، SMTP) في متغيرات بيئة، والـ credentials جوه n8n. القاعدة: مفيش سر في Git ولا في parameters ولا في Docker image؛ متغيرات البيئة من ملف بصلاحيات `600` أو من **secret store**.', 'Three kinds: the encryption key `N8N_ENCRYPTION_KEY` (the most important secret), runtime secrets (DB, Redis, SMTP) in environment variables, and credentials inside n8n. The rule: no secret in Git, in parameters, or in a Docker image; environment variables from a file with `600` permissions or from a **secret store**.'),
          '/opt/n8n/.env          owner root, chmod 600, NOT in Git (an .env.example is)\nN8N_ENCRYPTION_KEY=…   also stored in the password manager (needed to restore backups)\nDB_POSTGRESDB_PASSWORD_FILE=/run/secrets/db_password   # _FILE variants read from Docker secrets\ndocker compose: secrets: [db_password] → mounted at /run/secrets, not visible in `docker inspect`'),
        L(B('External secrets', 'External secrets'),
          B('**external secrets** (n8n Enterprise): الـ credentials بتقرا القيم من **vault** (HashiCorp Vault، AWS Secrets Manager، Azure Key Vault، Infisical) وقت التشغيل بـ `{{ $secrets.vault.crm_key }}`. السر بيتغير في مكان واحد، ومحدش جوه n8n بيشوفه، وفيه سجل مين قرا إيه. من غير Enterprise: Docker secrets وتدوير منظم.', '**external secrets** (n8n Enterprise): credentials read values from a **vault** (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, Infisical) at run time with `{{ $secrets.vault.crm_key }}`. A secret changes in one place, nobody inside n8n sees it, and there is a record of who read what. Without Enterprise: Docker secrets and organised rotation.'),
          'Settings → External Secrets → Vault (URL, auth method, namespace)\ncredential "CRM API" → API Key field: ={{ $secrets.vault.crm_live_key }}\nrotation: update the value in Vault → next execution uses the new key → no workflow edits'),
        L(B('التدوير والتسريب', 'Rotation and leaks'),
          B('**secret rotation**: كل مفتاح ليه تاريخ تغيير (90 يوم، أو فورًا لو موظف مشي)، وجدول بالأسرار وأصحابها وأماكنها. ولو سر اتسرب (اتلصق في شات، اترفع لـ GitHub): غيّره فورًا — المسح مش كفاية، النسخة موجودة في مكان ما. وفعّل secret scanning في GitHub.', '**secret rotation**: every key has a change date (90 days, or immediately when an employee leaves), and a table of secrets with owners and locations. If a secret leaks (pasted in a chat, pushed to GitHub): rotate it at once — deleting is not enough, a copy exists somewhere. And enable secret scanning on GitHub.'),
          'secrets register (no values!)\nname              where used                 owner   rotated      next\nCRM live key      credential "CRM API"       Sara    2026-08-01   2026-10-30\nSMTP password     .env (N8N_SMTP_PASS)       Omar    2026-09-15   2026-12-14\nWhatsApp token    credential "WA Cloud"      Sara    2026-07-20   2026-10-18  ← due soon\nleak runbook: revoke → create new → update store → test → check logs for misuse → note in register')
      ],
      practice: [
        B('اتأكد إن .env بصلاحيات 600 ومش في Git.', 'Make sure .env is chmod 600 and not in Git.'),
        B('انقل كلمة سر القاعدة لـ Docker secret.', 'Move the database password into a Docker secret.'),
        B('اعمل سجل أسرار (من غير قيم).', 'Create a secrets register (without values).'),
        B('اكتب runbook تسريب سر.', 'Write a leaked-secret runbook.')
      ],
      words: [
        W('secret store', 'خزنة أسرار مركزية', 'a central vault for secrets', 'Keys live in the secret store.'),
        W('external secrets', 'ميزة n8n لقراءة الأسرار من خزنة خارجية', 'n8n’s feature reading secrets from an outside vault', 'External secrets pull keys from Vault.'),
        W('vault', 'خزنة أسرار زي HashiCorp Vault', 'a secret vault such as HashiCorp Vault', 'Store the CRM key in the vault.'),
        W('secrets register', 'سجل الأسرار من غير قيمها', 'a list of secrets without their values', 'The secrets register shows the next rotation.'),
        W('secret scanning', 'فحص الكود عن أسرار متسربة', 'scanning code for leaked secrets', 'GitHub secret scanning caught a key.')
      ],
      read: [{ t: 'n8n Docs: External secrets', url: 'https://docs.n8n.io/administer/manage-credentials/use-external-secret-stores', what: B('اقرا Connect n8n to your secrets store.', 'Read Connect n8n to your secrets store.') }, { t: 'OWASP: Secrets Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html', what: B('اقرا Rotation.', 'Read Rotation.') }],
      challenge: B('اعمل «إدارة أسرار» لـ n8n: .env محمي أو Docker secrets، مفتاح التشفير في مدير كلمات سر، سجل أسرار بمواعيد تدوير، runbook تسريب، وworkflow بيفكّرك قبل ميعاد كل تدوير بأسبوع.', 'Set up «secrets management» for n8n: a protected .env or Docker secrets, the encryption key in a password manager, a secrets register with rotation dates, a leak runbook, and a workflow reminding you a week before each rotation.'),
      quiz: [
        Q(B('أهم سر في n8n:', 'The most important secret in n8n:'), [['N8N_ENCRYPTION_KEY', 'N8N_ENCRYPTION_KEY'], ['اسم المستخدم', 'the user name'], ['الـ port', 'the port']], 0, B('كل الـ credentials.', 'Every credential.')),
        Q(B('سر اتلصق في شات:', 'A secret pasted in a chat:'), [['غيّره فورًا', 'rotate it at once'], ['امسح الرسالة بس', 'just delete the message'], ['تجاهل', 'ignore']], 0, B('النسخة موجودة.', 'A copy exists.')),
        Q(B('سجل الأسرار فيه:', 'A secrets register holds:'), [['أسماء وأماكن وأصحاب ومواعيد', 'names, places, owners and dates'], ['القيم', 'the values'], ['كلمات السر', 'passwords']], 0, B('من غير قيم.', 'No values.'))
      ] },

    { title: B('الهوية والصلاحيات', 'Identity and permissions'),
      goal: B('كل شخص يشوف ويعدّل اللي يخصه بس.', 'Everyone sees and edits only what concerns them.'),
      learn: [
        L(B('المشاريع والأدوار', 'Projects and roles'),
          B('n8n فيه **rbac** بـ **project roles**: كل عميل أو فريق في project، والـ workflows والـ credentials جواه. الأدوار: owner/admin للمنصة، وفي المشروع admin/editor/viewer. القاعدة: الموظف Member عادي، بياخد editor في مشاريع شغله بس، والـ credentials الحساسة متشاركة للاستخدام مش للعرض.', 'n8n has **rbac** with **project roles**: each client or team in a project holding its workflows and credentials. Roles: owner/admin for the platform, and admin/editor/viewer inside a project. The rule: staff are ordinary Members with editor only on their own projects, and sensitive credentials are shared for use, not for viewing.'),
          'platform: Owner (1, break-glass) · Admins (2) · Members (everyone else)\nproject "Client A — shop": Sara admin · Omar editor · client viewer (read-only runs)\nproject "Internal — billing": finance editors only\ncredential "Bank API": shared to project "Internal — billing" (use only; nobody can open the value)'),
        L(B('SSO و2FA', 'SSO and 2FA'),
          B('**sso** (SAML أو OIDC بـ Google Workspace أو Microsoft Entra) معناه: الموظف بيدخل بحساب الشركة، ولما يمشي تقفله مرة واحدة يتقفل في كل حاجة. ومن غير SSO: **2fa** إجباري لكل الحسابات (تطبيق مش SMS). وحساب owner «break-glass» بكلمة سر طويلة في خزنة، لحالات الطوارئ بس.', '**sso** (SAML or OIDC with Google Workspace or Microsoft Entra) means staff sign in with the company account, and when someone leaves you disable them once and it closes everywhere. Without SSO: mandatory **2fa** on every account (an app, not SMS). And a «break-glass» owner account with a long password in a vault, for emergencies only.'),
          'Settings → SSO → SAML (or OIDC): IdP metadata URL, attribute mapping (email, first/last name)\nenforce: "Users must sign in with SSO" (owner keeps email login as break-glass)\nno SSO: Settings → Personal → Enable 2FA (authenticator app) for every user — check monthly'),
        L(B('دخول وخروج الموظفين', 'Joiners and leavers'),
          B('أخطر لحظة: موظف ماشي ولسه معاه دخول. checklist: اقفل حسابه (SSO بيعمل ده لوحده)، انقل workflows اللي يملكها، غيّر أي credential كان بيعرف قيمتها، راجع الـ API keys اللي عملها، وراجع آخر تعديلاته في سجل الأحداث. ومراجعة صلاحيات كل 3 شهور.', 'The riskiest moment: an employee leaves and still has access. A checklist: disable the account (SSO does it automatically), transfer workflows they own, rotate any credential whose value they knew, review the API keys they created, and check their latest changes in the event log. And a permissions review every 3 months.'),
          'leaver checklist (same day)\n[ ] disable in the IdP (SSO) / remove the n8n user\n[ ] transfer owned workflows and credentials to the project admin\n[ ] rotate: credentials they could view, shared passwords, their API keys\n[ ] audit log: their changes in the last 30 days\nquarterly: export users × projects × roles → each project admin confirms or removes')
      ],
      practice: [
        B('اعمل project لكل عميل وانقل الـ workflows.', 'Create a project per client and move the workflows.'),
        B('راجع أدوار كل مستخدم.', 'Review every user’s roles.'),
        B('فعّل 2FA لكل الحسابات (أو SSO).', 'Enable 2FA on every account (or SSO).'),
        B('اكتب leaver checklist.', 'Write a leaver checklist.')
      ],
      words: [
        W('rbac', 'صلاحيات حسب الدور', 'role-based access control', 'n8n RBAC uses project roles.'),
        W('project roles', 'أدوار جوه مشروع n8n', 'roles inside an n8n project', 'Project roles: admin, editor, viewer.'),
        W('sso', 'دخول بحساب الشركة الموحّد', 'signing in with the company account', 'SSO disables leavers everywhere.'),
        W('2fa', 'تحقق بعاملين', 'two-factor authentication', 'Require 2FA for all users.'),
        W('break-glass account', 'حساب طوارئ محفوظ في خزنة', 'an emergency account kept in a vault', 'Use the break-glass account only if SSO fails.')
      ],
      read: [{ t: 'n8n Docs: RBAC', url: 'https://docs.n8n.io/administer/manage-users-and-access/set-permissions-and-roles-rbac', what: B('اقرا Project roles.', 'Read Project roles.') }],
      challenge: B('أعد تنظيم n8n بالـ projects: مشروع لكل عميل وواحد داخلي، أدوار بأقل صلاحية، credentials متشاركة للاستخدام بس، 2FA أو SSO للكل، break-glass في خزنة، وleaver checklist ومراجعة ربع سنوية في التقويم.', 'Reorganise n8n into projects: one per client plus an internal one, least-privilege roles, credentials shared for use only, 2FA or SSO for all, a break-glass account in a vault, and a leaver checklist with a quarterly review on the calendar.'),
      quiz: [
        Q(B('موظف عادي:', 'An ordinary employee:'), [['Member + editor في مشاريعه بس', 'Member + editor only on their projects'], ['Admin', 'Admin'], ['Owner', 'Owner']], 0, B('least privilege.', 'Least privilege.')),
        Q(B('ميزة SSO الأكبر:', 'SSO’s biggest benefit:'), [['قفل الموظف مرة في كل حاجة', 'disabling a leaver once, everywhere'], ['ألوان', 'colours'], ['سرعة', 'speed']], 0, B('مركزي.', 'Central.')),
        Q(B('موظف مشي وكان يعرف قيمة credential:', 'A leaver knew a credential’s value:'), [['غيّره', 'rotate it'], ['سيبه', 'leave it'], ['امسح الـ workflow', 'delete the workflow']], 0, B('rotation.', 'Rotation.'))
      ] },

    { title: B('تأمين التطبيق', 'Hardening the application'),
      goal: B('الـ webhooks والكود والـ nodes ميبقوش باب خلفي.', 'Webhooks, code and nodes never become a back door.'),
      learn: [
        L(B('webhooks', 'Webhooks'),
          B('كل webhook إنتاج ليه **webhook authentication**: Header Auth (سر في header) أو Basic أو JWT، أو HMAC من المرسل (Shopify/Stripe — أسبوع 18 JS). وrate limit على الـ proxy، وحد حجم الجسم، ورد سريع. واختار path مش متخمَّن (مش `/webhook/orders`) — مش حماية لوحده، بس بيقلل الضوضاء.', 'Every production webhook has **webhook authentication**: Header Auth (a secret header), Basic or JWT, or HMAC from the sender (Shopify/Stripe). Plus a rate limit at the proxy, a body size limit and a fast reply. Choose a non-guessable path (not `/webhook/orders`) — not protection on its own, but it cuts the noise.'),
          'Webhook node → Authentication: Header Auth → credential "Inbound shop secret" (X-Webhook-Secret)\nor: Authentication: None + first node Code verifies HMAC of the raw body (Raw Body option on)\nCaddy: @hooks path /webhook/*  →  rate_limit 60/min per IP · request_body max 1MB'),
        L(B('Code node وExecute Command', 'The Code node and Execute Command'),
          B('الـ Code node بيشغّل JS/Python — لو سايب صلاحيات، أي editor يقرا `.env` أو ينادي أنظمة داخلية (**ssrf**). احمي: `N8N_BLOCK_ENV_ACCESS_IN_NODE=true`، و**task runner** المعزول، و`NODES_EXCLUDE` (**n8n_blocked_nodes**) لـ Execute Command وRead/Write Files لو مش محتاجهم، وحد الـ modules المسموحة في Code.', 'The Code node runs JS/Python — with loose permissions any editor can read `.env` or call internal systems (**ssrf**). Protect it: `N8N_BLOCK_ENV_ACCESS_IN_NODE=true`, the isolated **task runner**, `NODES_EXCLUDE` (the **n8n_blocked_nodes** idea) for Execute Command and Read/Write Files if not needed, and limit the modules allowed in Code.'),
          'N8N_BLOCK_ENV_ACCESS_IN_NODE=true\nN8N_RUNNERS_ENABLED=true                       # Code runs in an isolated task runner\nNODES_EXCLUDE=["n8n-nodes-base.executeCommand","n8n-nodes-base.readWriteFile"]\nNODE_FUNCTION_ALLOW_BUILTIN=crypto            # only what workflows need\nNODE_FUNCTION_ALLOW_EXTERNAL=                  # no npm modules in Code\n# SSRF: HTTP Request to 169.254.169.254 / internal IPs → block egress at the firewall'),
        L(B('الـ community nodes', 'Community nodes'),
          B('community node = كود من npm بيشتغل جوه n8n بكل صلاحياته (**supply chain** — أسبوع 15 JS). **community node risk**: ثبّت بس اللي راجعته، ثبّت إصدار محدد، اقرا الكود أو استخدم verified nodes بس، واقفل التثبيت من الواجهة في الإنتاج (`N8N_COMMUNITY_PACKAGES_ENABLED=false` أو تثبيت عبر الـ image بس).', 'A community node = code from npm running inside n8n with full permissions (the **supply chain**). The **community node risk**: install only what you reviewed, pin a version, read the code or use verified nodes only, and disable installs from the UI in production (`N8N_COMMUNITY_PACKAGES_ENABLED=false`, or install through the image only).'),
          '# production Dockerfile — reviewed nodes only, pinned\nFROM n8nio/n8n:1.112.4\nUSER root\nRUN cd /home/node/.n8n && mkdir -p nodes && cd nodes && npm install n8n-nodes-fawry-lite@1.3.0 --ignore-scripts\nUSER node\n# env: N8N_COMMUNITY_PACKAGES_ENABLED=false   (no installs from the UI)')
      ],
      practice: [
        B('ضيف Header Auth لكل webhook إنتاج.', 'Add Header Auth to every production webhook.'),
        B('فعّل N8N_BLOCK_ENV_ACCESS_IN_NODE وجرّب $env.', 'Enable N8N_BLOCK_ENV_ACCESS_IN_NODE and try $env.'),
        B('امنع Execute Command لو مش محتاجه.', 'Block Execute Command if you do not need it.'),
        B('راجع كل community node مثبّت.', 'Review every installed community node.')
      ],
      words: [
        W('webhook authentication', 'التحقق إن طلب الـ webhook من مصدر مسموح', 'checking a webhook request comes from an allowed source', 'Turn on webhook authentication.'),
        W('ssrf', 'خداع السيرفر يطلب عناوين داخلية', 'tricking a server into calling internal addresses', 'Block egress to stop SSRF.'),
        W('task runner', 'عملية معزولة بتشغّل كود الـ Code node', 'an isolated process running Code-node code', 'Enable the task runner.'),
        W('n8n_blocked_nodes', 'فكرة منع nodes خطيرة بـ NODES_EXCLUDE', 'blocking dangerous nodes with NODES_EXCLUDE', 'Execute Command is in the n8n_blocked_nodes list.'),
        W('supply chain', 'الكود الخارجي اللي بتعتمد عليه', 'the outside code you depend on', 'Community nodes are part of the supply chain.'),
        W('community node risk', 'خطر كود node خارجي جوه n8n', 'the risk of outside node code inside n8n', 'Pin versions to reduce community node risk.')
      ],
      read: [{ t: 'n8n Docs: Security settings', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security', what: B('اقرا Block nodes وEnvironment variable access.', 'Read Block nodes and Environment variable access.') }, { t: 'OWASP: SSRF Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html', what: B('اقرا Network layer.', 'Read Network layer.') }],
      challenge: B('اعمل «تقوية التطبيق»: كل webhook بمصادقة، rate limit وحد جسم في Caddy، env محجوب، task runners، nodes خطيرة ممنوعة، community nodes مراجعة ومثبّتة في الـ image — وجرّب 5 هجمات بسيطة على staging وسجّل النتيجة.', 'Do an «application hardening»: authentication on every webhook, a rate limit and body limit in Caddy, env access blocked, task runners, dangerous nodes excluded, community nodes reviewed and baked into the image — then try 5 simple attacks on staging and record the results.'),
      quiz: [
        Q(B('webhook إنتاج من غير مصادقة:', 'A production webhook without authentication:'), [['أي حد يبعت طلبات مزيفة', 'anyone can send fake requests'], ['آمن لو الـ path صعب', 'safe if the path is hard'], ['عادي', 'fine']], 0, B('مصادقة.', 'Authentication.')),
        Q(B('Code node بيقرا $env في الإنتاج:', 'A Code node reading $env in production:'), [['امنع بـ BLOCK_ENV_ACCESS', 'block with BLOCK_ENV_ACCESS'], ['عادي', 'fine'], ['ضروري', 'required']], 0, B('أسرار.', 'Secrets.')),
        Q(B('تثبيت community nodes في الإنتاج:', 'Installing community nodes in production:'), [['مراجعة ومثبّت الإصدار في الـ image', 'reviewed and pinned in the image'], ['من الواجهة أي وقت', 'from the UI any time'], ['أحدث إصدار دايمًا', 'always the latest']], 0, B('supply chain.', 'Supply chain.'))
      ] },

    { title: B('السيرفر والتدقيق', 'The server and auditing'),
      goal: B('السيرفر محدّث ومقفول، وكل تغيير متسجّل.', 'The server is updated and locked down, and every change is recorded.'),
      learn: [
        L(B('السيرفر والشبكة', 'The server and network'),
          B('**tls** في كل مكان (Caddy بشهادات تلقائية)، firewall بيفتح 443 بس (SSH من IP محدد أو Tailscale)، Postgres وRedis على شبكة داخلية من غير ports عامة، n8n مش root، تحديثات النظام آلية، وصورة n8n محدّثة شهريًا على الأقل (بعد اختبار في staging). و**encryption at rest** للـ disks والنسخ.', '**tls** everywhere (Caddy with automatic certificates), a firewall opening only 443 (SSH from one IP or Tailscale), Postgres and Redis on an internal network with no public ports, n8n not running as root, automatic OS updates, and the n8n image updated at least monthly (after testing in staging). And **encryption at rest** for disks and backups.'),
          'ufw default deny incoming · ufw allow 443/tcp · ufw allow from 100.64.0.0/10 to any port 22   # Tailscale\ndocker compose: postgres/redis without "ports:" (internal network only)\nunattended-upgrades enabled · fail2ban on SSH\nmonthly: bump n8nio/n8n tag in staging → smoke tests → prod'),
        L(B('التدقيق الأمني', 'The security audit'),
          B('n8n فيه أمر **security audit** (`n8n audit`) بيفحص: credentials مش مستخدمة، webhooks من غير مصادقة، nodes خطيرة، SQL مبني بـ expressions (حقن!)، وcommunity nodes. شغّله شهريًا (أو workflow بيشغّله ويبعت التقرير) وصلّح النتايج.', 'n8n has a **security audit** command (`n8n audit`) checking: unused credentials, unauthenticated webhooks, risky nodes, SQL built from expressions (injection!), and community nodes. Run it monthly (or have a workflow run it and send the report) and fix the findings.'),
          'docker exec -u node n8n n8n audit\n# Credentials risk report: 3 credentials not used in any workflow → delete\n# Nodes risk report: Execute Command in workflow 17 · Code node in 22 workflows\n# Database risk report: workflow 31 builds SQL with expressions → use query parameters\n# Instance risk report: version 1.98 is 14 versions behind → update'),
        L(B('سجل الأحداث', 'The event log'),
          B('**audit log**: مين عمل إيه وإمتى: دخول، تعديل workflow، فتح credential، تغيير صلاحيات. في Enterprise عبر log streaming لـ SIEM؛ من غير: لوج n8n + workflow التغييرات (أسبوع 40) + Git (أسبوع 38). وتنبيهات على الحاجات الغريبة: دخول من بلد جديد، تصدير credentials، تفعيل workflow بالليل. و**penetration test** سنوي لو العميل كبير.', 'An **audit log**: who did what and when: sign-ins, workflow edits, credential access, permission changes. In Enterprise through log streaming to a SIEM; without it: n8n logs + the change workflow (week 40) + Git (week 38). Alert on oddities: a sign-in from a new country, a credentials export, a workflow activated at night. And a yearly **penetration test** for larger clients.'),
          'alert rules (SIEM or an n8n admin workflow)\n- user.login from a country not seen in 90 days → Telegram security\n- credentials.exported / CLI export:credentials  → page the owner\n- workflow.activated between 00:00–06:00        → review next morning\n- 5 failed logins in 10 min                     → block IP at the proxy')
      ],
      practice: [
        B('اقفل ports Postgres وRedis العامة.', 'Close the public Postgres and Redis ports.'),
        B('شغّل n8n audit وصلّح أول 3 نتايج.', 'Run n8n audit and fix the first 3 findings.'),
        B('اعمل تنبيه دخول من بلد جديد.', 'Create a sign-in-from-a-new-country alert.'),
        B('خطط تحديث شهري بـ staging.', 'Plan a monthly update through staging.')
      ],
      words: [
        W('tls', 'تشفير الاتصال', 'encryption of connections', 'Caddy provides TLS automatically.'),
        W('encryption at rest', 'تشفير البيانات المخزنة', 'encrypting stored data', 'Backups have encryption at rest.'),
        W('security audit', 'فحص أمني دوري', 'a regular security check', 'The security audit found 3 unused credentials.'),
        W('audit log', 'سجل مين عمل إيه وإمتى', 'a record of who did what and when', 'Check the audit log after a leaver.'),
        W('penetration test', 'محاولة اختراق متفق عليها لاكتشاف الثغرات', 'an agreed hacking attempt to find weaknesses', 'The bank asked for a penetration test.')
      ],
      read: [{ t: 'n8n Docs: Security audit', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/run-security-audits', what: B('اقرا Risk reports.', 'Read Risk reports.') }, { t: 'CIS: Docker Benchmark', url: 'https://www.cisecurity.org/benchmark/docker', what: B('اعرف إيه اللي بيتفحص.', 'See what gets checked.') }],
      challenge: B('اعمل «يوم أمان» شهري لـ n8n: n8n audit وتصليح، تحديث بعد staging، مراجعة ports وfirewall، مراجعة المستخدمين والأدوار، تدوير الأسرار المستحقة، ومراجعة تنبيهات سجل الأحداث — كله في checklist بتاريخ.', 'Run a monthly «security day» for n8n: n8n audit and fixes, an update after staging, a ports and firewall review, a users-and-roles review, due secret rotations, and a review of event-log alerts — all in a dated checklist.'),
      quiz: [
        Q(B('Postgres الخاص بـ n8n:', 'n8n’s Postgres:'), [['شبكة داخلية من غير port عام', 'an internal network, no public port'], ['port 5432 مفتوح', 'port 5432 open'], ['على النت لسهولة الوصول', 'on the internet for convenience']], 0, B('سطح هجوم.', 'Attack surface.')),
        Q(B('SQL مبني بـ expressions:', 'SQL built from expressions:'), [['خطر حقن؛ استخدم parameters', 'an injection risk; use parameters'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('audit.', 'Audit.')),
        Q(B('دخول من بلد جديد:', 'A sign-in from a new country:'), [['تنبيه ومراجعة', 'an alert and a review'], ['تجاهل', 'ignore'], ['احذف الحساب فورًا', 'delete the account at once']], 0, B('audit log.', 'Audit log.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('n8n محمي بطبقات.', 'n8n protected in layers.'),
      review: [
        B('نموذج التهديد وسطح الهجوم والدفاع في طبقات.', 'The threat model, the attack surface and defence in depth.'),
        B('الأسرار: مفتاح التشفير، Docker secrets، external secrets، التدوير والتسريب.', 'Secrets: the encryption key, Docker secrets, external secrets, rotation and leaks.'),
        B('المشاريع والأدوار وSSO و2FA ودخول/خروج الموظفين.', 'Projects, roles, SSO, 2FA, and joiners/leavers.'),
        B('webhooks محمية وCode محدود وcommunity nodes مراجعة.', 'Protected webhooks, a limited Code node and reviewed community nodes.'),
        B('السيرفر وTLS وn8n audit وسجل الأحداث والتنبيهات.', 'The server, TLS, n8n audit, the event log and alerts.')
      ],
      project: B('اعمل «تقييم أمني» كامل لـ n8n عميل (أو staging بتاعك) وطبّقه: threat model، self-check، أسرار (Docker secrets أو Vault + سجل + runbook)، projects وأدوار و2FA/SSO، webhooks بمصادقة وrate limit، env محجوب وtask runners وnodes ممنوعة، firewall وTLS وports مقفولة، n8n audit نضيف، تنبيهات أمنية — وتقرير قبل/بعد للعميل بلغة بسيطة.', 'Run a full «security assessment» of a client’s n8n (or your staging) and apply it: a threat model, the self-check, secrets (Docker secrets or Vault + register + runbook), projects, roles and 2FA/SSO, authenticated and rate-limited webhooks, env access blocked, task runners and excluded nodes, a firewall, TLS and closed ports, a clean n8n audit, security alerts — and a before/after report for the client in plain language.'),
      test: [
        Q(B('سطح الهجوم:', 'The attack surface:'), [['كل الأماكن اللي ممكن يتهاجم منها', 'every place one can attack from'], ['الـ CPU', 'the CPU'], ['اللوجو', 'the logo']], 0, B('أبواب.', 'Doors.')),
        Q(B('من غير مفتاح التشفير:', 'Without the encryption key:'), [['الـ credentials المنسوخة متتفكش', 'backed-up credentials cannot be decrypted'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('احفظه.', 'Keep it safe.')),
        Q(B('$secrets.vault.key:', '$secrets.vault.key:'), [['external secrets', 'external secrets'], ['متغير عادي', 'a plain variable'], ['$vars', '$vars']], 0, B('Vault.', 'Vault.')),
        Q(B('موظف مشي:', 'An employee left:'), [['اقفل وانقل وغيّر الأسرار وراجع', 'disable, transfer, rotate and review'], ['ولا حاجة', 'nothing'], ['امسح كل workflows', 'delete every workflow']], 0, B('checklist.', 'Checklist.')),
        Q(B('دور الموظف الافتراضي:', 'The default staff role:'), [['Member', 'Member'], ['Owner', 'Owner'], ['Admin', 'Admin']], 0, B('أقل صلاحية.', 'Least privilege.')),
        Q(B('2FA بـ:', '2FA with:'), [['تطبيق authenticator', 'an authenticator app'], ['SMS بس', 'SMS only'], ['سؤال أمان', 'a security question']], 0, B('أقوى.', 'Stronger.')),
        Q(B('webhook Shopify:', 'A Shopify webhook:'), [['HMAC على الجسم الخام', 'HMAC on the raw body'], ['من غير تحقق', 'no check'], ['IP بس', 'IP only']], 0, B('توقيع.', 'Signature.')),
        Q(B('HTTP Request لـ 169.254.169.254:', 'An HTTP Request to 169.254.169.254:'), [['SSRF؛ امنع egress', 'SSRF; block egress'], ['عادي', 'normal'], ['أسرع API', 'the fastest API']], 0, B('داخلي.', 'Internal.')),
        Q(B('Execute Command مش محتاجه:', 'You do not need Execute Command:'), [['NODES_EXCLUDE', 'NODES_EXCLUDE'], ['سيبه', 'leave it'], ['اخفي أيقونته', 'hide its icon']], 0, B('امنع.', 'Block.')),
        Q(B('n8n audit بيلاقي:', 'n8n audit finds:'), [['credentials مش مستخدمة وwebhooks مكشوفة', 'unused credentials and exposed webhooks'], ['أخطاء إملائية', 'typos'], ['البطء', 'slowness']], 0, B('مخاطر.', 'Risks.')),
        Q(B('صورة n8n:', 'The n8n image:'), [['تتحدث شهريًا بعد staging', 'updated monthly after staging'], ['متتحدثش أبدًا', 'never updated'], ['latest في الإنتاج فورًا', 'latest straight to production']], 0, B('ثغرات.', 'Vulnerabilities.')),
        Q(B('دخول owner الطوارئ:', 'The emergency owner sign-in:'), [['break-glass في خزنة', 'break-glass in a vault'], ['مشترك مع الكل', 'shared with everyone'], ['من غير كلمة سر', 'passwordless']], 0, B('طوارئ.', 'Emergencies.'))
      ] }
  ]
};
