// n8n week 21 — Docker and a VPS.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('Docker والـ VPS', 'Docker and a VPS'),
  goal: B('تشغّل n8n في الإنتاج على سيرفر بتاعك: تختار بين Cloud وself-hosted، وتفهم Docker وdocker compose، وتجهّز VPS آمن، وتنشر n8n على دومين بـ HTTPS.',
          'Run n8n in production on your own server: choose between Cloud and self-hosted, understand Docker and docker compose, prepare a secure VPS, and publish n8n on a domain with HTTPS.'),
  days: [
    { title: B('Cloud ولا self-hosted', 'Cloud or self-hosted'),
      goal: B('تختار طريقة التشغيل المناسبة للعميل وتحدد حجم السيرفر.', 'Choose the right hosting for the client and size the server.'),
      learn: [
        { h: B('المقارنة', 'The comparison'),
          p: B('n8n Cloud: من غير سيرفر ولا صيانة، بسعر شهري وحدود تنفيذات. Self-hosted: تحكم كامل وبيانات عندك وأرخص في الحجم الكبير، بس انت مسؤول عن التحديث والأمان والنسخ.', 'n8n Cloud: no server and no maintenance, for a monthly fee with execution limits. Self-hosted: full control, data stays with you, cheaper at scale — but you own updates, security and backups.'),
          ex: 'Small client, no tech team → Cloud\nSensitive data or heavy use → self-hosted' },
        { h: B('الرخصة', 'The licence'),
          p: B('n8n «fair-code»: الـ Community Edition مجانية تشغّلها لنفسك ولشغلك الداخلي. لو هتبيع n8n نفسه كخدمة للناس أو تعيد بيعه، راجع الرخصة. وفيه مزايا في الخطط المدفوعة (SSO، Git sync…).', 'n8n is "fair-code": the Community Edition is free to run for yourself and internal business use. If you plan to sell n8n itself as a service or resell it, check the licence. Some features are in paid plans (SSO, Git sync…).'),
          ex: 'Internal automations for a client → fine\nReselling hosted n8n to the public → read the licence' },
        { h: B('حجم السيرفر', 'Server size'),
          p: B('للبداية: 2 CPU و4 GB RAM بيكفّوا workflows عادية. زوّد لو فيه ملفات كبيرة، أو AI محلي، أو تنفيذات كتير. والديسك لقاعدة البيانات والملفات.', 'To start: 2 CPUs and 4 GB RAM handle ordinary workflows. Add more for large files, local AI or many executions. The disk holds the database and files.'),
          ex: '2 vCPU · 4 GB RAM · 40 GB SSD' }
      ],
      practice: [
        B('اكتب جدول مقارنة Cloud وself-hosted لـ 3 عملاء متخيلين.', 'Write a Cloud vs. self-hosted comparison for 3 imagined clients.'),
        B('اقرا صفحة الرخصة واكتب في 3 جمل المسموح.', 'Read the licence page and write what is allowed in 3 sentences.'),
        B('قارن أسعار 3 مزودي VPS لنفس المواصفات.', 'Compare 3 VPS providers\' prices for the same specs.'),
        B('اكتب «hosting recommendation» لعميل في فقرة.', 'Write a one-paragraph "hosting recommendation" for a client.')
      ],
      words: ['self-hosted', 'n8n Cloud', 'VPS',
        { t: 'fair-code licence', m: B('رخصة n8n: الكود متاح بس بقيود على بيعه كخدمة', 'n8n\'s licence: the code is open but reselling it as a service is restricted'), ex: 'Sustainable Use License' },
        { t: 'server sizing', m: B('تحديد CPU وRAM والديسك المناسبين', 'choosing the right CPU, RAM and disk'), ex: '2 vCPU · 4 GB RAM' }],
      read: ['lib:n8n Docs: Docker installation', { t: 'n8n license (fair-code)', url: 'https://docs.n8n.io/n8n-community-license', what: B('اقرا ملخص المسموح والممنوع.', 'Read the summary of what is and isn\'t allowed.') }],
      challenge: B('اكتب «hosting decision» لعميلين مختلفين (مطعم صغير وشركة بيانات حساسة) بالتكلفة الشهرية والمسؤوليات.', 'Write a "hosting decision" for two different clients (a small restaurant and a company with sensitive data), with monthly cost and responsibilities.'),
      quiz: [
        { q: B('عميل صغير من غير فريق تقني:', 'A small client with no tech team:'), o: ['n8n Cloud', 'a Kubernetes cluster', 'a home server'], a: 0, why: B('من غير صيانة.', 'No maintenance.') },
        { q: B('في self-hosted مسؤول عن:', 'With self-hosted you are responsible for:'), o: [B('التحديث والأمان والنسخ', 'updates, security and backups'), B('ولا حاجة', 'nothing'), B('التصميم بس', 'only design')], a: 0, why: B('تحكم = مسؤولية.', 'Control = responsibility.') },
        { q: B('بداية مناسبة لسيرفر n8n:', 'A reasonable starting n8n server:'), o: ['2 vCPU · 4 GB RAM', '64 vCPU', '512 MB RAM'], a: 0, why: B('للشغل العادي.', 'For ordinary workloads.') }
      ] },

    { title: B('Docker بالأساس', 'Docker basics'),
      goal: B('تفهم image وcontainer وvolume، وتشغّل n8n في Docker.', 'Understand images, containers and volumes, and run n8n in Docker.'),
      learn: [
        { h: B('image وcontainer', 'Image and container'),
          p: B('image = قالب جاهز (n8n بكل اللي محتاجه). container = نسخة شغالة منه. تقدر تمسح الـ container وتعمل واحد جديد من نفس الـ image في ثواني.', 'An image = a ready template (n8n with everything it needs). A container = a running copy of it. You can delete a container and create a new one from the same image in seconds.'),
          ex: 'docker pull docker.n8n.io/n8nio/n8n\ndocker ps   (running containers)' },
        { h: B('volume', 'Volumes'),
          p: B('الـ container بيتمسح بكل اللي جواه. عشان بياناتك (الـ workflows والـ credentials) تفضل، لازم volume مربوط بـ /home/node/.n8n.', 'A container is deleted with everything inside it. For your data (workflows and credentials) to survive, you need a volume mounted at /home/node/.n8n.'),
          ex: 'docker volume create n8n_data\n-v n8n_data:/home/node/.n8n' },
        { h: B('docker run', 'docker run'),
          p: B('`-p 5678:5678` بيربط البورت، `-e` متغيّر بيئة، `--name` اسم، `-d` في الخلفية.', '`-p 5678:5678` maps the port, `-e` sets an environment variable, `--name` a name, `-d` runs in the background.'),
          ex: 'docker run -d --name n8n -p 5678:5678 \\\n  -e GENERIC_TIMEZONE=Africa/Cairo \\\n  -v n8n_data:/home/node/.n8n \\\n  docker.n8n.io/n8nio/n8n' }
      ],
      practice: [
        B('ثبّت Docker Desktop (أو Docker على Linux).', 'Install Docker Desktop (or Docker on Linux).'),
        B('شغّل n8n بـ docker run وvolume.', 'Run n8n with docker run and a volume.'),
        B('اعمل workflow، وامسح الـ container، واعمل واحد جديد، واتأكد إن الـ workflow موجود.', 'Create a workflow, delete the container, create a new one, and confirm the workflow survived.'),
        B('جرّب docker logs n8n وdocker stop/start.', 'Try docker logs n8n and docker stop/start.')
      ],
      words: ['image', 'container', 'volume',
        { t: 'docker run', m: B('أمر بيعمل ويشغّل container', 'the command that creates and starts a container'), ex: 'docker run -d --name n8n …' },
        { t: 'port mapping', m: B('ربط بورت الجهاز ببورت الـ container', 'linking a host port to a container port'), ex: '-p 5678:5678' }],
      read: ['lib:Docker for Beginners (Docker Curriculum)', 'lib:Play with Docker'],
      challenge: B('اكتب «Docker cheat sheet» لـ n8n: run، logs، stop/start، update (pull + recreate)، backup للـ volume.', 'Write a Docker cheat sheet for n8n: run, logs, stop/start, update (pull + recreate) and volume backup.'),
      quiz: [
        { q: B('من غير volume ومسحت الـ container:', 'Without a volume, when you delete the container:'), o: [B('الـ workflows بتروح', 'the workflows are lost'), B('مفيش مشكلة', 'no problem'), B('بتتنقل لوحدها', 'they move automatically')], a: 0, why: B('البيانات جوه الـ container.', 'The data was inside the container.') },
        { q: B('`-p 5678:5678`:', '`-p 5678:5678`:'), o: [B('بيربط البورت', 'maps the port'), B('باسورد', 'is a password'), B('عدد CPU', 'CPU count')], a: 0, why: B('host:container.', 'host:container.') },
        { q: B('image مقابل container:', 'Image vs. container:'), o: [B('قالب ضد نسخة شغالة', 'a template vs. a running copy'), B('نفس الحاجة', 'the same thing'), B('ملف ضد فولدر', 'a file vs. a folder')], a: 0, why: B('من image بتعمل containers.', 'Containers come from images.') }
      ] },

    { title: B('docker compose', 'docker compose'),
      goal: B('تشغّل n8n وPostgres مع بعض بملف compose واحد.', 'Run n8n and Postgres together with one compose file.'),
      learn: [
        { h: B('ليه compose', 'Why compose'),
          p: B('بدل أوامر docker run طويلة، ملف YAML واحد بيوصف كل الخدمات (n8n، Postgres، Caddy) وإعداداتها. `docker compose up -d` يشغّل الكل.', 'Instead of long docker run commands, one YAML file describes every service (n8n, Postgres, Caddy) and its settings. `docker compose up -d` starts them all.'),
          ex: 'services:\n  n8n:\n    image: docker.n8n.io/n8nio/n8n\n    restart: unless-stopped\n    ports: ["5678:5678"]\n    env_file: .env\n    volumes: ["n8n_data:/home/node/.n8n"]' },
        { h: B('YAML', 'YAML'),
          p: B('YAML بيعتمد على المسافات (مش tabs)، و`key: value`، والقوايم بـ `-`. غلطة مسافة واحدة بتبوّظ الملف.', 'YAML depends on spaces (not tabs), `key: value`, and lists with `-`. One wrong space breaks the file.'),
          ex: 'environment:\n  - GENERIC_TIMEZONE=Africa/Cairo\n  - DB_TYPE=postgresdb' },
        { h: B('.env وrestart', '.env and restart'),
          p: B('الأسرار (باسوردات، N8N_ENCRYPTION_KEY) في ملف .env مش في compose. و`restart: unless-stopped` بيرجّع الخدمة لوحدها بعد reboot أو crash.', 'Secrets (passwords, N8N_ENCRYPTION_KEY) go in a .env file, not the compose file. `restart: unless-stopped` brings the service back after a reboot or crash.'),
          ex: '.env\nN8N_ENCRYPTION_KEY=••••\nDB_POSTGRESDB_PASSWORD=••••' }
      ],
      practice: [
        B('اكتب docker-compose.yml لـ n8n + Postgres.', 'Write a docker-compose.yml for n8n + Postgres.'),
        B('حط الأسرار في .env وضيفه لـ .gitignore.', 'Put the secrets in .env and add it to .gitignore.'),
        B('شغّل بـ docker compose up -d واتأكد إن n8n بيستخدم Postgres.', 'Start with docker compose up -d and confirm n8n uses Postgres.'),
        B('اعمل restart للجهاز (أو docker) واتأكد إنهم رجعوا لوحدهم.', 'Restart the machine (or Docker) and confirm they came back on their own.')
      ],
      words: ['docker compose', 'YAML',
        { t: '.env file', m: B('ملف فيه متغيّرات البيئة والأسرار', 'a file holding environment variables and secrets'), ex: 'Never commit it.' },
        { t: 'restart policy', m: B('إمتى Docker يعيد تشغيل الخدمة لوحده', 'when Docker restarts a service automatically'), ex: 'restart: unless-stopped' },
        { t: 'service (compose)', m: B('خدمة واحدة في ملف compose', 'one service in a compose file'), ex: 'n8n, postgres, caddy' }],
      read: ['lib:Docker Compose Docs', 'lib:n8n Docs: Docker installation'],
      challenge: B('اعمل repo «n8n-server» فيه docker-compose.yml (n8n + Postgres)، و.env.example، وREADME بخطوات التشغيل والتحديث والنسخ.', 'Create an "n8n-server" repo with docker-compose.yml (n8n + Postgres), .env.example, and a README with start, update and backup steps.'),
      quiz: [
        { q: B('تشغّل كل الخدمات:', 'Start every service:'), o: ['docker compose up -d', 'docker build', 'docker pull'], a: 0, why: B('compose.', 'compose.') },
        { q: B('الأسرار مكانها:', 'Secrets belong in:'), o: ['.env (not committed)', 'docker-compose.yml', 'README'], a: 0, why: B('مش في Git.', 'Not in Git.') },
        { q: B('YAML بيبوظ من:', 'YAML breaks because of:'), o: [B('مسافات غلط أو tabs', 'wrong spaces or tabs'), B('حروف كبيرة', 'capital letters'), B('أرقام', 'numbers')], a: 0, why: B('indentation.', 'indentation.') }
      ] },

    { title: B('تجهيز الـ VPS', 'Preparing the VPS'),
      goal: B('تجهّز سيرفر Linux آمن: SSH بمفتاح، ومستخدم مش root، وfirewall، ودومين.', 'Prepare a secure Linux server: SSH with a key, a non-root user, a firewall and a domain.'),
      learn: [
        { h: B('SSH بمفتاح', 'SSH with a key'),
          p: B('اعمل مفتاح على جهازك (`ssh-keygen`)، وحط الـ public key على السيرفر، واقفل الدخول بالباسورد. أأمن بكتير.', 'Create a key on your machine (`ssh-keygen`), put the public key on the server, and disable password login. Much safer.'),
          ex: 'ssh-keygen -t ed25519\nssh-copy-id deploy@your-server\n# then: PasswordAuthentication no' },
        { h: B('مستخدم وfirewall', 'User and firewall'),
          p: B('اشتغل بمستخدم عادي بـ sudo مش root. وfirewall (ufw) يفتح بس 22 (SSH) و80 و443، ويقفل الباقي (حتى 5678؛ n8n هيتعرض من الـ reverse proxy).', 'Work as a normal user with sudo, not root. A firewall (ufw) opens only 22 (SSH), 80 and 443 and closes the rest (even 5678; n8n will be exposed through the reverse proxy).'),
          ex: 'ufw allow OpenSSH\nufw allow 80\nufw allow 443\nufw enable' },
        { h: B('الدومين', 'The domain'),
          p: B('في لوحة الدومين اعمل A record لـ subdomain (n8n.example.com) بيشاور على IP السيرفر. التغيير بياخد دقايق لساعات.', 'In the domain panel create an A record for a subdomain (n8n.example.com) pointing to the server\'s IP. It takes minutes to hours to spread.'),
          ex: 'Type A · Name n8n · Value 203.0.113.10' }
      ],
      practice: [
        B('اعمل VPS تجريبي (أو VM محلي) وادخل بـ SSH key.', 'Create a test VPS (or a local VM) and log in with an SSH key.'),
        B('اعمل مستخدم deploy بـ sudo واقفل دخول root بالباسورد.', 'Create a deploy user with sudo and disable root password login.'),
        B('فعّل ufw بالبورتات التلاتة بس.', 'Enable ufw with just the three ports.'),
        B('اعمل A record لـ subdomain وجرّب ping.', 'Create an A record for a subdomain and try ping.')
      ],
      words: ['SSH',
        { t: 'SSH key', m: B('مفتاح بدل الباسورد للدخول على السيرفر', 'a key used instead of a password to log in'), ex: 'ssh-keygen -t ed25519' },
        { t: 'firewall (ufw)', m: B('بيقفل كل البورتات ما عدا اللي بتحددها', 'blocks every port except the ones you allow'), ex: 'ufw allow 443' },
        { t: 'non-root user', m: B('مستخدم عادي بدل root للأمان', 'a normal user instead of root, for safety'), ex: 'deploy (with sudo)' },
        { t: 'DNS A record', m: B('بيربط اسم الدومين بـ IP السيرفر', 'links a domain name to the server\'s IP'), ex: 'n8n.example.com → 203.0.113.10' }],
      read: ['lib:Linux Journey', 'lib:The Linux Command Line'],
      challenge: B('اكتب «server hardening checklist» من 10 بنود واعملها على سيرفر تجريبي، وخد screenshot لكل خطوة.', 'Write a 10-item "server hardening checklist", apply it to a test server, and take a screenshot of each step.'),
      quiz: [
        { q: B('الدخول الأأمن على السيرفر:', 'The safest way to log in:'), o: ['an SSH key', 'a short password', 'root with a password'], a: 0, why: B('مفتاح.', 'A key.') },
        { q: B('بورت 5678 في الـ firewall:', 'Port 5678 in the firewall:'), o: [B('مقفول؛ n8n من الـ reverse proxy', 'closed; n8n goes through the reverse proxy'), B('مفتوح للكل', 'open to everyone'), B('مش مهم', 'doesn\'t matter')], a: 0, why: B('HTTPS بس.', 'HTTPS only.') },
        { q: B('A record بيعمل:', 'An A record:'), o: [B('يربط الدومين بـ IP', 'links the domain to an IP'), B('يعمل إيميل', 'creates email'), B('يشفّر', 'encrypts')], a: 0, why: B('DNS.', 'DNS.') }
      ] },

    { title: B('reverse proxy وHTTPS', 'Reverse proxy and HTTPS'),
      goal: B('تنشر n8n على دومين بـ HTTPS تلقائي بـ Caddy، وتظبط متغيرات n8n.', 'Publish n8n on a domain with automatic HTTPS using Caddy, and set n8n\'s variables.'),
      learn: [
        { h: B('reverse proxy', 'The reverse proxy'),
          p: B('Caddy (أو Nginx/Traefik) بيستقبل على 443، ويعمل HTTPS، ويوصّل الطلبات لـ n8n جوه على 5678. الناس بتشوف الدومين بس.', 'Caddy (or Nginx/Traefik) listens on 443, handles HTTPS and forwards requests to n8n on 5678 inside. People only see the domain.'),
          ex: 'Caddyfile:\nn8n.example.com {\n  reverse_proxy n8n:5678\n}' },
        { h: B('HTTPS تلقائي', 'Automatic HTTPS'),
          p: B('Caddy بيجيب شهادة Let\'s Encrypt ويجددها لوحده لما الدومين يشاور على السيرفر والبورتين 80/443 مفتوحين.', 'Caddy obtains a Let\'s Encrypt certificate and renews it automatically when the domain points to the server and ports 80/443 are open.'),
          ex: 'https://n8n.example.com 🔒' },
        { h: B('متغيّرات n8n', 'n8n variables'),
          p: B('N8N_HOST=n8n.example.com، N8N_PROTOCOL=https، WEBHOOK_URL=https://n8n.example.com/، وN8N_ENCRYPTION_KEY ثابت (خزّنه في مكان آمن؛ لو ضاع الـ credentials مش هتتقري).', 'N8N_HOST=n8n.example.com, N8N_PROTOCOL=https, WEBHOOK_URL=https://n8n.example.com/, and a fixed N8N_ENCRYPTION_KEY (store it safely; lose it and credentials can\'t be read).'),
          ex: 'N8N_HOST=n8n.example.com\nN8N_PROTOCOL=https\nWEBHOOK_URL=https://n8n.example.com/' }
      ],
      practice: [
        B('ضيف Caddy لملف compose بـ Caddyfile.', 'Add Caddy to the compose file with a Caddyfile.'),
        B('ظبّط N8N_HOST وN8N_PROTOCOL وWEBHOOK_URL.', 'Set N8N_HOST, N8N_PROTOCOL and WEBHOOK_URL.'),
        B('افتح n8n على الدومين بـ HTTPS واتأكد من القفل.', 'Open n8n on the domain with HTTPS and check the padlock.'),
        B('اعمل webhook واتأكد إن الـ URL بيطلع بالدومين.', 'Create a webhook and confirm the URL shows the domain.')
      ],
      words: ['reverse proxy', 'SSL / HTTPS',
        { t: 'Caddy', m: B('reverse proxy بيعمل HTTPS تلقائي', 'a reverse proxy with automatic HTTPS'), ex: 'reverse_proxy n8n:5678' },
        { t: 'Let\'s Encrypt', m: B('جهة بتدي شهادات HTTPS مجانًا', 'an authority that issues free HTTPS certificates'), ex: 'Renewed automatically by Caddy.' },
        { t: 'N8N_HOST / N8N_PROTOCOL', m: B('الدومين والبروتوكول اللي n8n شغال عليهم', 'the domain and protocol n8n runs on'), ex: 'n8n.example.com / https' }],
      read: ['lib:Caddy Docs', 'lib:n8n Docs: Environment variables'],
      challenge: B('انشر n8n كامل على VPS: compose (n8n + Postgres + Caddy)، دومين بـ HTTPS، firewall، SSH key، وREADME بكل خطوة، واختبر webhook من برّه.', 'Deploy full n8n on a VPS: compose (n8n + Postgres + Caddy), a domain with HTTPS, a firewall, an SSH key, and a README for every step; test a webhook from outside.'),
      quiz: [
        { q: B('Caddy بيعمل:', 'Caddy:'), o: [B('HTTPS وتوصيل الطلبات لـ n8n', 'handles HTTPS and forwards requests to n8n'), B('قاعدة بيانات', 'is a database'), B('backup', 'is a backup')], a: 0, why: B('reverse proxy.', 'A reverse proxy.') },
        { q: B('webhook URL بيطلع localhost على السيرفر:', 'The webhook URL shows localhost on the server:'), o: ['set WEBHOOK_URL', 'open 5678', 'restart Docker'], a: 0, why: B('العنوان العام.', 'The public address.') },
        { q: B('N8N_ENCRYPTION_KEY ضاع:', 'N8N_ENCRYPTION_KEY is lost:'), o: [B('الـ credentials مش هتتقري', 'credentials can\'t be decrypted'), B('مفيش مشكلة', 'no problem'), B('بيتعمل تاني لوحده', 'it regenerates')], a: 0, why: B('خزّنه بأمان.', 'Store it safely.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 22 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 22 opens when you score 70% or more.'),
      review: [
        B('Cloud ضد self-hosted، الرخصة، حجم السيرفر.', 'Cloud vs. self-hosted, the licence, server size.'),
        B('image وcontainer وvolume وdocker run.', 'Images, containers, volumes and docker run.'),
        B('docker compose وYAML و.env وrestart.', 'docker compose, YAML, .env and restart.'),
        B('SSH key، مستخدم عادي، firewall، A record.', 'SSH key, a normal user, the firewall, an A record.'),
        B('Caddy وHTTPS وN8N_HOST وWEBHOOK_URL.', 'Caddy, HTTPS, N8N_HOST and WEBHOOK_URL.')
      ],
      project: B('انشر «n8n production server» لنفسك أو لعميل تجريبي: VPS آمن، compose بـ n8n وPostgres وCaddy، دومين بـ HTTPS، .env برّه Git، وrepo فيه كل الملفات وREADME بـ runbook (تشغيل، تحديث، نسخ، استرجاع). وانقل عليه workflow حقيقي واتأكد إنه شغال.',
                 'Deploy an "n8n production server" for yourself or a test client: a secure VPS, compose with n8n, Postgres and Caddy, a domain with HTTPS, .env outside Git, and a repo with every file and a README runbook (start, update, back up, restore). Move a real workflow onto it and confirm it runs.'),
      test: [
        { q: B('بيانات حساسة واستخدام كبير:', 'Sensitive data and heavy use:'), o: ['self-hosted', 'the free trial only', 'a laptop'], a: 0, why: B('تحكم.', 'Control.') },
        { q: B('container بيتعمل من:', 'A container is created from:'), o: ['an image', 'a volume', 'a YAML key'], a: 0, why: B('قالب.', 'A template.') },
        { q: B('بيانات n8n في Docker لازم في:', 'n8n data in Docker must live in:'), o: ['a volume', 'the container only', 'RAM'], a: 0, why: B('تفضل.', 'It survives.') },
        { q: B('ملف compose بلغة:', 'A compose file is written in:'), o: ['YAML', 'SQL', 'CSV'], a: 0, why: B('docker-compose.yml.', 'docker-compose.yml.') },
        { q: B('الخدمة ترجع بعد reboot:', 'The service returns after a reboot with:'), o: ['restart: unless-stopped', 'ports', 'image'], a: 0, why: B('restart policy.', 'restart policy.') },
        { q: B('كلمة سر قاعدة البيانات مكانها:', 'The database password belongs in:'), o: ['.env', 'docker-compose.yml in Git', 'README'], a: 0, why: B('مش في Git.', 'Not in Git.') },
        { q: B('الدخول على السيرفر:', 'Logging into the server:'), o: ['SSH key, password login off', 'root + password', 'FTP'], a: 0, why: B('أمان.', 'Security.') },
        { q: B('ufw بيفتح:', 'ufw opens:'), o: ['22, 80, 443', 'every port', '5678 only'], a: 0, why: B('أقل حاجة.', 'The minimum.') },
        { q: B('n8n.example.com يشاور على السيرفر بـ:', 'Point n8n.example.com to the server with:'), o: ['an A record', 'a CNAME to Gmail', 'a TXT only'], a: 0, why: B('IP.', 'An IP.') },
        { q: B('HTTPS تلقائي:', 'Automatic HTTPS:'), o: ['Caddy + Let\'s Encrypt', 'Postgres', 'a volume'], a: 0, why: B('شهادة مجانية.', 'A free certificate.') },
        { q: B('reverse_proxy n8n:5678 معناها:', 'reverse_proxy n8n:5678 means:'), o: [B('ودّي الطلبات لخدمة n8n على 5678', 'forward requests to the n8n service on 5678'), B('افتح 5678 للكل', 'open 5678 to all'), B('امسح n8n', 'delete n8n')], a: 0, why: B('جوه الشبكة.', 'Inside the network.') },
        { q: B('N8N_PROTOCOL على دومين بشهادة:', 'N8N_PROTOCOL on a domain with a certificate:'), o: ['https', 'http', 'ftp'], a: 0, why: B('آمن.', 'Secure.') }
      ] }
  ]
};
