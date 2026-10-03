// Python week 44 — Securing Python apps, and the month 11 project.
// Path, URL, archive, parsing, hashing, AST-scan and log-redaction examples run with the standard library
// (they defend; none attack a real system); cryptography, pip-audit and Bandit are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('تأمين تطبيقات Python ومشروع الشهر', 'Securing Python apps, and the month project'),
  goal: B('تحمي تطبيقات Python والأتمتة من أشهر الثغرات: الحقن بكل أشكاله، المسارات والطلبات الخطيرة، فك البيانات غير الآمن، الأسرار والتشفير، سلسلة التوريد، وتأمين الويب والعمليات — وتجمع شهر الهندسة المتقدمة في مشروع واحد.',
          'Protect Python and automation apps from the most common vulnerabilities: injection in all its forms, dangerous paths and requests, unsafe deserialisation, secrets and cryptography, the supply chain, and web and process hardening — and bring the advanced-engineering month together in one project.'),
  days: [
    { title: B('الحقن والمسارات والطلبات', 'Injection, paths and requests'),
      goal: B('مدخلات المستخدم متوصلش لمكان خطير.', 'User input never reaches a dangerous place.'),
      learn: [
        L(B('حقن الأوامر', 'Command injection'),
          B('شفنا SQL injection قبل كده. نفس الفكرة مع أوامر النظام: **command injection** لما مدخل يدخل أمر shell (`os.system`، أو `subprocess` بـ **shell=True**). الحل: `subprocess.run([...])` بقايمة معاملات من غير shell، وتحقق من المدخل بـ **allowlist validation** (قيم معروفة مسموحة بس) مش بمنع حروف معينة.', 'You met SQL injection before. Same idea with system commands: **command injection** happens when input enters a shell command (`os.system`, or `subprocess` with **shell=True**). The fix: `subprocess.run([...])` with an argument list and no shell, and validate input by **allowlist validation** (only known allowed values), not by blocking certain characters.'),
          'import subprocess\n\nfilename = "report.pdf; rm -rf ~"                       # from a webhook\n\n# ✗ the shell runs everything after ";"\n# subprocess.run(f"pdftotext {filename} out.txt", shell=True)\n\n# ✓ no shell: the whole string is ONE argument, and we validate it first\nimport re\nif not re.fullmatch(r"[\\w\\-]{1,64}\\.pdf", filename):\n    raise ValueError("invalid file name")\nsubprocess.run(["pdftotext", filename, "out.txt"], check=True, timeout=30)'),
        L(B('اختراق المسارات', 'Path traversal'),
          B('**path traversal** = مدخل زي `../../.env` بيخلّيك تقرا أو تكتب برّه المجلد المسموح. الحل: ابني المسار، اعمله `resolve()`، واتأكد إنه لسه جوه المجلد الأساسي بـ `is_relative_to`. ونفس المشكلة في فك الأرشيفات (**zip slip**): ملف جوه zip اسمه `../../app.py`.', '**path traversal** = input like `../../.env` lets someone read or write outside the allowed folder. The fix: build the path, `resolve()` it, and check it is still inside the base folder with `is_relative_to`. The same problem appears when extracting archives (**zip slip**): a file inside a zip named `../../app.py`.'),
          'from pathlib import Path\nimport tempfile\n\nBASE = Path(tempfile.gettempdir(), "invoices").resolve()\nBASE.mkdir(exist_ok=True)\n\ndef safe_path(user_name: str) -> Path:\n    p = (BASE / user_name).resolve()\n    if not p.is_relative_to(BASE):\n        raise PermissionError(f"blocked: {user_name!r} escapes the invoices folder")\n    return p\n\nfor name in ("INV-2041.pdf", "2026/10/INV-7.pdf", "../../.env", "/etc/passwd"):\n    try:\n        print("ok     ", safe_path(name).relative_to(BASE).as_posix())\n    except PermissionError as e:\n        print("blocked", e)', R),
        L(B('SSRF', 'SSRF'),
          B('**ssrf** = أداة بتجيب URL من المستخدم («استورد الصورة من الرابط ده») فالمهاجم يدّيها `http://169.254.169.254/` (أسرار السحابة) أو `http://localhost:5678` (n8n الداخلي). الحل: allowlist للدومينات لو تقدر، وإلا ارفض العناوين الخاصة والمحلية بعد ما تحل الـ DNS، ومن غير ما تتبع redirects لعناوين داخلية.', '**ssrf** = a feature fetching a user-supplied URL («import the image from this link») so an attacker supplies `http://169.254.169.254/` (cloud secrets) or `http://localhost:5678` (internal n8n). The fix: a domain allowlist if you can; otherwise reject private and local addresses after resolving DNS, and do not follow redirects to internal addresses.'),
          'import ipaddress\nfrom urllib.parse import urlsplit\n\nALLOWED_HOSTS = {"cdn.shopify.com", "images.example-supplier.com"}\n\ndef check_url(url: str, resolved_ip: str) -> str:\n    parts = urlsplit(url)\n    if parts.scheme != "https":\n        return "blocked: https only"\n    if parts.hostname not in ALLOWED_HOSTS:\n        return f"blocked: {parts.hostname} not in allowlist"\n    ip = ipaddress.ip_address(resolved_ip)          # resolve DNS yourself, then check the IP\n    if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved:\n        return f"blocked: {ip} is internal"\n    return "ok"\n\nprint(check_url("https://cdn.shopify.com/a.png", "23.227.38.65"))\nprint(check_url("http://cdn.shopify.com/a.png", "23.227.38.65"))\nprint(check_url("https://169.254.169.254/latest/meta-data/", "169.254.169.254"))\nprint(check_url("https://cdn.shopify.com/a.png", "10.0.0.5"))                # DNS rebinding trick', R)
      ],
      practice: [
        B('دوّر على shell=True وos.system في كودك وشيلهم.', 'Search for shell=True and os.system in your code and remove them.'),
        B('حط safe_path قدام أي ملف اسمه جاي من مستخدم.', 'Put safe_path in front of every user-named file.'),
        B('اعمل allowlist لأي URL بتجيبه من مدخلات.', 'Add an allowlist for any URL you fetch from input.'),
        B('اكتب اختبارات بمدخلات خبيثة لكل دالة.', 'Write tests with malicious inputs for each function.')
      ],
      words: [
        W('owasp top 10', 'أشهر 10 مخاطر لتطبيقات الويب', 'the ten most critical web app risks', 'Review the OWASP Top 10 every year.'),
        W('command injection', 'حقن أوامر نظام', 'running attacker input as a system command', 'shell=True invited command injection.'),
        W('shell=True', 'تشغيل الأمر عبر الـ shell', 'running a subprocess through the shell', 'Never use shell=True with input.'),
        W('allowlist validation', 'تحقق بقايمة المسموح', 'accepting only known good values', 'Allowlist validation beats blocking characters.'),
        W('path traversal', 'الخروج من المجلد بـ ../', 'escaping a folder with ../', 'resolve() plus is_relative_to stops path traversal.'),
        W('zip slip', 'أرشيف بيكتب برّه مجلد الفك', 'an archive writing outside the extraction folder', 'Check every member name to prevent zip slip.'),
        W('ssrf', 'تزوير طلبات من السيرفر', 'server-side request forgery', 'The image importer was open to SSRF.')
      ],
      read: [{ t: 'OWASP Top 10', url: 'https://owasp.org/Top10/', what: B('اقرا A01 وA03 وA10.', 'Read A01, A03 and A10.') }],
      challenge: B('اعمل «مراجعة حقن» لمشروع: دوّر على shell=True وos.system وf-strings في SQL وأسماء ملفات من مستخدم وURLs من مدخلات — صلّح كل واحدة واكتب اختبار بمدخل خبيث لكل إصلاح.', 'Do an «injection review» of a project: look for shell=True, os.system, f-strings in SQL, user-supplied file names and URLs from input — fix each one and write a test with a malicious input for every fix.'),
      quiz: [
        Q(B('subprocess آمن:', 'Safe subprocess:'), [['قايمة معاملات من غير shell', 'an argument list without a shell'], ['f-string مع shell=True', 'an f-string with shell=True'], ['os.system', 'os.system']], 0, B('معاملات.', 'Arguments.')),
        Q(B('اسم ملف «../../.env»:', 'A file name «../../.env»:'), [['path traversal', 'path traversal'], ['اسم عادي', 'a normal name'], ['SQL', 'SQL']], 0, B('مسار.', 'Path.')),
        Q(B('مستخدم بيدّي URL بـ 169.254.169.254:', 'A user supplies a URL with 169.254.169.254:'), [['SSRF؛ ارفض العناوين الداخلية', 'SSRF; reject internal addresses'], ['اجيبه عادي', 'fetch it normally'], ['XSS', 'XSS']], 0, B('داخلي.', 'Internal.'))
      ] },

    { title: B('فك البيانات بأمان', 'Parsing data safely'),
      goal: B('البيانات متتحولش لكود.', 'Data never turns into code.'),
      learn: [
        L(B('eval وpickle', 'eval and pickle'),
          B('**eval** على مدخل = تشغيل أي كود Python. للقيم البسيطة استخدم `ast.literal_eval` أو JSON. و**deserialization** غير الآمن: `pickle.loads` على بيانات من برّه = تنفيذ كود (pickle مصمم يبني أي كائن). استخدم pickle بين أجزاء برنامجك الموثوقة بس، وJSON لأي حاجة جاية من برّه.', '**eval** on input = running any Python code. For simple values use `ast.literal_eval` or JSON. And unsafe **deserialization**: `pickle.loads` on outside data = code execution (pickle is designed to build any object). Use pickle only between trusted parts of your own program, and JSON for anything from outside.'),
          'import ast, json\n\nuser_input = "__import__(\'os\').getcwd()"          # imagine something far worse\n\ntry:\n    print(ast.literal_eval("[1, 2, {\'city\': \'Cairo\'}]"))   # literals only: fine\n    ast.literal_eval(user_input)                           # code: refused\nexcept ValueError as e:\n    print("literal_eval refused:", type(e).__name__)\n\nprint(json.loads(\'{"order": 7, "items": ["mug"]}\'))\n# eval(user_input)        ✗ would run the code\n# pickle.loads(body)      ✗ never on data from a request, queue or file you don\'t control', R),
        L(B('YAML وXML', 'YAML and XML'),
          B('YAML: `yaml.load` القديم ممكن يبني كائنات Python — استخدم **yaml.safe_load** دايمًا. XML: المحلل العادي ممكن يتعرض لـ «XML external entities» (يقرا ملفات السيرفر) أو قنبلة تمدد — استخدم **defusedxml** لأي XML جاي من برّه (فواتير، feeds).', 'YAML: the old `yaml.load` can build Python objects — always use **yaml.safe_load**. XML: the standard parser can be exposed to «XML external entities» (reading server files) or expansion bombs — use **defusedxml** for any outside XML (invoices, feeds).'),
          '# pip install pyyaml defusedxml\nimport yaml\nfrom defusedxml import ElementTree as SafeET\n\nconfig = yaml.safe_load(open("settings.yaml", encoding="utf8"))      # ✓ plain data only\n# yaml.load(text, Loader=yaml.Loader)                                 # ✗ can construct objects\n\ninvoice = SafeET.fromstring(xml_from_supplier)                        # ✓ refuses entities and bombs\ntotal = invoice.findtext("./LegalMonetaryTotal/PayableAmount")'),
        L(B('الأرشيفات', 'Archives'),
          B('`tarfile.extractall` من غير فلتر ممكن يكتب برّه المجلد أو يعمل links خطيرة. من Python 3.12: `extractall(filter="data")` بيرفض المسارات المطلقة و`..` والـ links الخطيرة. ولـ zip: افحص كل اسم بـ safe_path قبل الفك، وحط حد لعدد وحجم الملفات (قنابل الضغط).', '`tarfile.extractall` without a filter can write outside the folder or create dangerous links. From Python 3.12: `extractall(filter="data")` rejects absolute paths, `..` and dangerous links. For zip: check every name with safe_path before extracting, and cap the number and size of files (compression bombs).'),
          'import io, tarfile, tempfile\n\nbuf = io.BytesIO()\nwith tarfile.open(fileobj=buf, mode="w") as tar:\n    for name, data in (("invoices/ok.txt", b"fine"), ("../../evil.txt", b"pwned")):\n        info = tarfile.TarInfo(name); info.size = len(data)\n        tar.addfile(info, io.BytesIO(data))\nbuf.seek(0)\n\nwith tempfile.TemporaryDirectory() as dest, tarfile.open(fileobj=buf) as tar:\n    for member in tar.getmembers():\n        try:\n            tar.extract(member, dest, filter="data")           # Python 3.12+\n            print("extracted", member.name)\n        except tarfile.FilterError as e:\n            print("refused  ", member.name, "→", type(e).__name__)', R)
      ],
      practice: [
        B('دوّر على eval وpickle.loads وyaml.load في كودك.', 'Search for eval, pickle.loads and yaml.load in your code.'),
        B('استبدل eval بـ literal_eval أو JSON.', 'Replace eval with literal_eval or JSON.'),
        B('افتح XML جاي من برّه بـ defusedxml.', 'Open outside XML with defusedxml.'),
        B('افك أرشيف بـ filter="data" وحدود للحجم.', 'Extract an archive with filter="data" and size limits.')
      ],
      words: [
        W('eval', 'تشغيل نص ككود Python', 'running a string as Python code', 'Never eval user input.'),
        W('deserialization', 'تحويل بيانات مخزّنة لكائنات', 'turning stored data back into objects', 'Unsafe deserialization runs code.'),
        W('ast.literal_eval', 'فك قيم بسيطة بأمان', 'safely parsing Python literals', 'ast.literal_eval refuses function calls.'),
        W('yaml.safe_load', 'قراية YAML كبيانات بس', 'loading YAML as plain data only', 'Always use yaml.safe_load.'),
        W('defusedxml', 'محلل XML آمن', 'a safe XML parsing library', 'Parse supplier XML with defusedxml.'),
        W('xml external entity', 'كيان XML بيقرا ملفات خارجية', 'an XML feature that can read external files', 'An XML external entity leaked /etc/passwd.')
      ],
      read: [{ t: 'OWASP Cheat Sheet: Deserialization', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html', what: B('اقرا جزء Python.', 'Read the Python section.') }],
      challenge: B('اعمل «parser آمن» لملفات الموردين: JSON وYAML وXML وZIP/TAR جاية من برّه، كل نوع بالطريقة الآمنة، حدود حجم وعدد، وأخطاء واضحة — و10 اختبارات بملفات خبيثة (مسارات، entities، قنبلة ضغط صغيرة).', 'Build a «safe parser» for supplier files: outside JSON, YAML, XML and ZIP/TAR, each the safe way, with size and count limits and clear errors — and 10 tests with malicious files (paths, entities, a small compression bomb).'),
      quiz: [
        Q(B('pickle.loads على body طلب:', 'pickle.loads on a request body:'), [['تنفيذ كود محتمل', 'possible code execution'], ['آمن', 'safe'], ['أسرع من JSON بس', 'just faster than JSON']], 0, B('خطر.', 'Danger.')),
        Q(B('YAML من مستخدم:', 'YAML from a user:'), [['yaml.safe_load', 'yaml.safe_load'], ['yaml.load بـ Loader كامل', 'yaml.load with the full Loader'], ['eval', 'eval']], 0, B('بيانات بس.', 'Data only.')),
        Q(B('فك tar من برّه (3.12+):', 'Extracting an outside tar (3.12+):'), [['filter="data"', 'filter="data"'], ['extractall من غير فلتر', 'extractall without a filter'], ['os.system("tar")', 'os.system("tar")']], 0, B('فلتر.', 'Filter.'))
      ] },

    { title: B('الأسرار والتشفير', 'Secrets and cryptography'),
      goal: B('أسرار مبتتسربش وتشفير مبتخترعهوش.', 'Secrets that don’t leak and crypto you don’t invent.'),
      learn: [
        L(B('العشوائية الآمنة', 'Secure randomness'),
          B('`random` للمحاكاة بس — متوقع. للتوكنات والأكواد وروابط إعادة كلمة السر: **secrets module** (`token_urlsafe`، `token_hex`، `randbelow`). وللمقارنة بسر: `hmac.compare_digest` بدل `==` عشان **timing attack** (المهاجم بيقيس الوقت ويخمّن حرف حرف).', '`random` is for simulations only — it is predictable. For tokens, codes and password-reset links: the **secrets module** (`token_urlsafe`, `token_hex`, `randbelow`). And to compare against a secret: `hmac.compare_digest` instead of `==` because of a **timing attack** (an attacker measures time and guesses character by character).'),
          'import secrets, hmac, string\n\napi_key = "shop_" + secrets.token_urlsafe(32)               # for a client, shown once\notp = "".join(secrets.choice(string.digits) for _ in range(6))   # a 6-digit one-time code\nprint(len(api_key), otp.isdigit(), len(otp))\n\nstored = "Zq3v-example-webhook-secret"\nfor attempt in ("Zq3v-example-webhook-secret", "Zq3v-wrong"):\n    print(attempt[:10], hmac.compare_digest(attempt.encode(), stored.encode()))', R),
        L(B('كلمات السر', 'Passwords'),
          B('كلمة السر بتتخزن hash بطيء بملح مش تشفير: **argon2** (الأفضل حاليًا) أو bcrypt، أو `hashlib.pbkdf2_hmac` من المكتبة القياسية بعدد لفات كبير. متستخدمش sha256 لوحده (سريع جدًا للتخمين). المثال بالـ stdlib؛ في الإنتاج `argon2-cffi`.', 'A password is stored as a slow, salted hash, not encrypted: **argon2** (the best today) or bcrypt, or the stdlib `hashlib.pbkdf2_hmac` with many iterations. Never plain sha256 (far too fast to guess). The example uses the stdlib; in production use `argon2-cffi`.'),
          'import hashlib, hmac, secrets, base64\n\nITER = 100_000          # demo value; OWASP suggests 600,000 for PBKDF2-SHA256 (or use argon2)\n\ndef hash_password(pw: str) -> str:\n    salt = secrets.token_bytes(16)\n    dk = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, ITER)\n    return f"pbkdf2${ITER}${base64.b64encode(salt).decode()}${base64.b64encode(dk).decode()}"\n\ndef verify(pw: str, stored: str) -> bool:\n    _, it, salt, dk = stored.split("$")\n    test = hashlib.pbkdf2_hmac("sha256", pw.encode(), base64.b64decode(salt), int(it))\n    return hmac.compare_digest(test, base64.b64decode(dk))\n\nh = hash_password("correct horse battery")\nprint(h[:40] + "…")\nprint(verify("correct horse battery", h), verify("Correct horse battery", h))\nprint("same password, different hash:", hash_password("x") != hash_password("x"))', R),
        L(B('التشفير والمفاتيح', 'Encryption and keys'),
          B('محتاج تشفّر بيانات (توكن عميل OAuth في القاعدة)؟ متخترعش: مكتبة `cryptography` و**fernet** (تشفير متماثل جاهز بتوقيع). المفتاح نفسه في **secret manager** (أو متغير بيئة على الأقل) مش في الكود. وخطط لـ **key rotation**: MultiFernet بيفك بالقديم ويشفّر بالجديد.', 'Need to encrypt data (a client’s OAuth token in the database)? Do not invent anything: the `cryptography` library and **fernet** (ready symmetric encryption with authentication). The key lives in a **secret manager** (or at least an environment variable), never in code. And plan **key rotation**: MultiFernet decrypts with the old key and encrypts with the new.'),
          '# pip install cryptography\nimport os\nfrom cryptography.fernet import Fernet, MultiFernet\n\n# keys come from a secret manager / env, generated once with Fernet.generate_key()\nnew = Fernet(os.environ["TOKENS_KEY_2026"])\nold = Fernet(os.environ["TOKENS_KEY_2025"])\nf = MultiFernet([new, old])                 # encrypt with new; decrypt with either\n\ncipher = f.encrypt(b"oauth-refresh-token-of-client-17")\nplain = f.decrypt(cipher, ttl=None)\nrotated = f.rotate(old_cipher)              # re-encrypt old rows with the new key, then retire the old key')
      ],
      practice: [
        B('بدّل أي random في توكنات بـ secrets.', 'Replace any random in tokens with secrets.'),
        B('بدّل == في مقارنة أسرار بـ compare_digest.', 'Replace == in secret comparisons with compare_digest.'),
        B('راجع تخزين كلمات السر عندك.', 'Review how you store passwords.'),
        B('اعمل خطة rotation لمفتاح تشفير.', 'Write a rotation plan for an encryption key.')
      ],
      words: [
        W('secrets module', 'مكتبة العشوائية الآمنة', 'the module for secure random values', 'Generate API keys with the secrets module.'),
        W('token_urlsafe', 'توكن عشوائي آمن للروابط', 'a random URL-safe token', 'Reset links use token_urlsafe(32).'),
        W('timing attack', 'تخمين سر من زمن المقارنة', 'guessing a secret from comparison time', 'compare_digest prevents a timing attack.'),
        W('argon2', 'أفضل خوارزمية لتخزين كلمات السر', 'a modern password-hashing algorithm', 'Hash passwords with argon2.'),
        W('fernet', 'تشفير متماثل جاهز وآمن', 'a ready authenticated symmetric encryption', 'Encrypt stored tokens with Fernet.'),
        W('secret manager', 'خزنة أسرار', 'a service storing secrets securely', 'Keys live in the secret manager.'),
        W('key rotation', 'تغيير المفاتيح دوريًا', 'replacing keys periodically', 'Key rotation runs every six months.')
      ],
      read: [{ t: 'OWASP Cheat Sheet: Password Storage', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', what: B('اقرا Argon2id والـ work factor.', 'Read Argon2id and the work factor.') }],
      challenge: B('أمّن أسرار خدمة المتجر: توكنات بـ secrets، مقارنات بـ compare_digest، كلمات سر بـ argon2، توكنات العملاء في القاعدة مشفرة بـ Fernet والمفتاح من secret manager أو env، وسكربت rotation بيعيد تشفير الصفوف — مع اختبارات.', 'Secure the shop service’s secrets: tokens with secrets, comparisons with compare_digest, passwords with argon2, client tokens in the database encrypted with Fernet and the key from a secret manager or env, and a rotation script re-encrypting rows — with tests.'),
      quiz: [
        Q(B('كود OTP:', 'An OTP code:'), [['secrets.choice', 'secrets.choice'], ['random.randint', 'random.randint'], ['time.time()', 'time.time()']], 0, B('آمن.', 'Secure.')),
        Q(B('تخزين كلمة سر:', 'Storing a password:'), [['hash بطيء بملح (argon2)', 'a slow salted hash (argon2)'], ['sha256 لوحده', 'plain sha256'], ['تشفير قابل للفك', 'reversible encryption']], 0, B('بطيء.', 'Slow.')),
        Q(B('مفتاح التشفير مكانه:', 'The encryption key belongs in:'), [['secret manager', 'a secret manager'], ['الكود', 'the code'], ['Git', 'Git']], 0, B('خزنة.', 'A vault.'))
      ] },

    { title: B('سلسلة التوريد', 'The supply chain'),
      goal: B('المكتبات اللي بتستخدمها مش باب خلفي.', 'The libraries you use are not a back door.'),
      learn: [
        L(B('مخاطر المكتبات', 'Library risks'),
          B('**supply chain** = كل المكتبات اللي بتعتمد عليها ومكتباتها. المخاطر: ثغرة معروفة (**cve**) في نسخة قديمة، مكتبة خبيثة باسم شبه المشهورة (typosquatting)، و**dependency confusion** (اسم حزمة داخلية بيتنزل من PyPI العام). الأساس: **lockfile** بنسخ ثابتة و**hash pinning**.', 'The **supply chain** = every library you depend on and theirs. Risks: a known vulnerability (a **cve**) in an old version, a malicious package with a name close to a popular one (typosquatting), and **dependency confusion** (an internal package name pulled from public PyPI). The basis: a **lockfile** with fixed versions and **hash pinning**.'),
          '# uv: a lockfile with exact versions AND hashes for every package\nuv lock                     # writes uv.lock\nuv sync --locked            # CI: install exactly what is locked, fail if it changed\n\n# pip: requirements with hashes\npip-compile --generate-hashes requirements.in      # pip-tools\npip install --require-hashes -r requirements.txt   # refuses anything without a matching hash\n\n# internal packages: use a private index with a scoped name, never «pip install mycompany-utils» from PyPI by accident', T),
        L(B('فحص الثغرات', 'Scanning for vulnerabilities'),
          B('**pip-audit** بيقارن مكتباتك بقاعدة ثغرات معروفة. **bandit** = **sast** (تحليل ساكن للأمان) بيدوّر على أنماط خطيرة في كودك (eval، shell=True، pickle، أسرار مكتوبة). شغّلهم في CI، وDependabot/Renovate يفتحوا PRs للتحديثات. والمثال بيعمل فاحص صغير بالـ ast.', '**pip-audit** compares your libraries with a database of known vulnerabilities. **bandit** = **sast** (static security analysis) looking for dangerous patterns in your code (eval, shell=True, pickle, hard-coded secrets). Run them in CI, and let Dependabot/Renovate open update PRs. The example builds a tiny scanner with ast.'),
          'import ast\n\nCODE = """\nimport pickle, subprocess, yaml\nAPI_KEY = "example-not-a-real-key"\ndef load(body):\n    return pickle.loads(body)\ndef run(name):\n    subprocess.run(f"convert {name}", shell=True)\ndef cfg(text):\n    return yaml.load(text)\ndef calc(expr):\n    return eval(expr)\n"""\n\nclass Scanner(ast.NodeVisitor):\n    def __init__(self): self.findings = []\n    def flag(self, node, msg): self.findings.append((node.lineno, msg))\n    def visit_Call(self, node):\n        name = ast.unparse(node.func)\n        if name in ("eval", "exec"): self.flag(node, f"{name}() on data")\n        if name in ("pickle.loads", "pickle.load"): self.flag(node, "unsafe deserialization")\n        if name == "yaml.load": self.flag(node, "use yaml.safe_load")\n        if any(k.arg == "shell" and getattr(k.value, "value", False) is True for k in node.keywords):\n            self.flag(node, "subprocess with shell=True")\n        self.generic_visit(node)\n    def visit_Assign(self, node):\n        if isinstance(node.value, ast.Constant) and isinstance(node.value.value, str):\n            if any(w in ast.unparse(t).lower() for t in node.targets for w in ("key", "secret", "token", "password")):\n                self.flag(node, "hard-coded secret")\n        self.generic_visit(node)\n\ns = Scanner(); s.visit(ast.parse(CODE))\nfor line, msg in sorted(s.findings):\n    print(f"line {line}: {msg}")', R),
        L(B('SBOM والتحديثات', 'SBOM and updates'),
          B('**sbom** (Software Bill of Materials) = قايمة بكل المكونات ونسخها — عملاء كبار وجهات حكومية بقوا بيطلبوها. واتفق على سياسة تحديث: ثغرة حرجة خلال 48 ساعة، تحديثات عادية كل شهر بالاختبارات. ومكتبة مهجورة من سنين = خطر حتى لو مفيهاش CVE.', 'An **sbom** (Software Bill of Materials) = a list of every component and its version — large clients and government bodies now ask for one. Agree an update policy: a critical vulnerability within 48 hours, routine updates monthly with tests. And a library abandoned for years = a risk even without a CVE.'),
          '# CI security job (GitHub Actions excerpt)\n- run: uv sync --locked\n- run: uvx pip-audit --strict                 # fail on known vulnerabilities\n- run: uvx bandit -r src -ll                  # medium+ severity findings fail the build\n- run: uvx cyclonedx-py environment -o sbom.json   # SBOM as a build artifact\n\npolicy\ncritical CVE → patch within 48 h · high → 7 days · routine updates monthly\nno new dependency without: maintainer activity, licence check, download history', T)
      ],
      practice: [
        B('اعمل lockfile بـ hashes لمشروع.', 'Create a hashed lockfile for a project.'),
        B('شغّل pip-audit وbandit وصلّح النتايج.', 'Run pip-audit and bandit and fix the findings.'),
        B('وسّع الفاحص الصغير بقاعدة جديدة.', 'Extend the tiny scanner with a new rule.'),
        B('اكتب سياسة تحديث المكتبات.', 'Write a dependency update policy.')
      ],
      words: [
        W('supply chain', 'سلسلة التوريد البرمجية', 'all the third-party code you depend on', 'Supply chain attacks target popular packages.'),
        W('cve', 'رقم ثغرة معروفة', 'an identifier for a known vulnerability', 'pip-audit reported a CVE in an old version.'),
        W('dependency confusion', 'تنزيل حزمة داخلية من المستودع العام', 'pulling an internal package name from a public index', 'A private index prevents dependency confusion.'),
        W('lockfile', 'ملف النسخ المثبّتة', 'a file pinning exact dependency versions', 'Commit the lockfile.'),
        W('hash pinning', 'تثبيت hash كل حزمة', 'pinning each package to a known hash', 'Hash pinning blocks tampered downloads.'),
        W('pip-audit', 'أداة فحص ثغرات المكتبات', 'a tool checking dependencies for known vulnerabilities', 'pip-audit runs in CI.'),
        W('bandit', 'أداة تحليل أمان لكود Python', 'a security linter for Python', 'bandit flagged shell=True.'),
        W('sast', 'تحليل أمان ساكن للكود', 'static application security testing', 'SAST runs on every pull request.'),
        W('sbom', 'قايمة مكونات البرنامج', 'a software bill of materials', 'The client asked for an SBOM.')
      ],
      read: [{ t: 'pip-audit', url: 'https://github.com/pypa/pip-audit', what: B('اقرا Usage.', 'Read Usage.') }],
      challenge: B('أمّن سلسلة توريد مشروع: lockfile بـ hashes، pip-audit وbandit في CI بيفشّلوا الـ build، SBOM كـ artifact، Dependabot أو Renovate، وصفحة SECURITY.md فيها سياسة التحديث والإبلاغ عن الثغرات.', 'Secure a project’s supply chain: a hashed lockfile, pip-audit and bandit in CI failing the build, an SBOM artifact, Dependabot or Renovate, and a SECURITY.md stating the update and vulnerability-reporting policy.'),
      quiz: [
        Q(B('pip install من غير نسخ ثابتة:', 'pip install without fixed versions:'), [['خطر: lockfile وhashes', 'risky: use a lockfile and hashes'], ['أحسن', 'better'], ['أسرع', 'faster']], 0, B('ثبات.', 'Stability.')),
        Q(B('bandit:', 'bandit:'), [['تحليل أمان ساكن', 'static security analysis'], ['قاعدة بيانات', 'a database'], ['متصفح', 'a browser']], 0, B('SAST.', 'SAST.')),
        Q(B('ثغرة حرجة في مكتبة:', 'A critical vulnerability in a library:'), [['تحديث خلال 48 ساعة', 'update within 48 hours'], ['استنى السنة الجاية', 'wait for next year'], ['تجاهلها', 'ignore it']], 0, B('سياسة.', 'Policy.'))
      ] },

    { title: B('تقوية الويب والعمليات', 'Hardening the web and operations'),
      goal: B('طبقات حماية وعملية أمان مستمرة.', 'Layers of protection and an ongoing security process.'),
      learn: [
        L(B('headers وحدود', 'Headers and limits'),
          B('**security headers** لأي تطبيق ويب: HSTS، `Content-Security-Policy`، `X-Content-Type-Options: nosniff`، و`frame-ancestors`. و**rate limiting** على تسجيل الدخول والـ webhooks العامة. وحد لحجم الطلبات. ده كله middleware في FastAPI أو في Caddy/Nginx.', '**security headers** for any web app: HSTS, `Content-Security-Policy`, `X-Content-Type-Options: nosniff` and `frame-ancestors`. And **rate limiting** on login and public webhooks. And a request size limit. All of this is middleware in FastAPI or config in Caddy/Nginx.'),
          'from fastapi import FastAPI, Request\n\napp = FastAPI()\n\nSECURITY_HEADERS = {\n    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",\n    "Content-Security-Policy": "default-src \'self\'; frame-ancestors \'none\'",\n    "X-Content-Type-Options": "nosniff",\n    "Referrer-Policy": "strict-origin-when-cross-origin",\n}\n\n@app.middleware("http")\nasync def harden(request: Request, call_next):\n    if int(request.headers.get("content-length") or 0) > 1_000_000:\n        from fastapi.responses import JSONResponse\n        return JSONResponse({"detail": "too large"}, status_code=413)\n    response = await call_next(request)\n    response.headers.update(SECURITY_HEADERS)\n    return response'),
        L(B('الأسرار في اللوج', 'Secrets in logs'),
          B('من أشهر طرق التسريب: **logging secrets** — توكن في URL، header Authorization، أو body فيه كلمة سر بيتكتب في اللوج اللي ناس كتير بتشوفه. حط logging filter بيمسح الأنماط الحساسة قبل الكتابة، ومتسجلش bodies كاملة.', 'One of the most common leaks: **logging secrets** — a token in a URL, an Authorization header, or a body with a password written to logs many people can read. Add a logging filter that masks sensitive patterns before writing, and never log full bodies.'),
          'import logging, re, sys\n\nPATTERNS = [\n    (re.compile(r"(Authorization: Bearer )\\S+"), r"\\1***"),\n    (re.compile(r"([?&](?:token|key|api_key|secret)=)[^&\\s]+"), r"\\1***"),\n    (re.compile(r"(\\"password\\"\\s*:\\s*\\")[^\\"]*"), r"\\1***"),\n    (re.compile(r"\\b\\d(?:[ -]?\\d){12,15}\\b"), "<card>"),\n]\n\nclass Redact(logging.Filter):\n    def filter(self, record):\n        msg = record.getMessage()\n        for p, repl in PATTERNS:\n            msg = p.sub(repl, msg)\n        record.msg, record.args = msg, ()\n        return True\n\nlog = logging.getLogger("shop")\nh = logging.StreamHandler(sys.stdout); h.addFilter(Redact())\nlog.addHandler(h); log.setLevel(logging.INFO)\nlog.info("GET /webhook?order=7&token=abc123secret")\nlog.info("Authorization: Bearer eyJhbGciOi.example")\nlog.info(\'login body {"user": "mona", "password": "hunter2"}\')\nlog.info("card 4111 1111 1111 1111 declined")', R),
        L(B('نموذج التهديد والعملية', 'Threat model and process'),
          B('**threat model** بإطار **stride**: Spoofing (انتحال)، Tampering (تعديل)، Repudiation (إنكار)، Information disclosure (تسريب)، Denial of service، Elevation of privilege — لكل مكوّن. و**security review** قبل أي إطلاق كبير. وصفحة **vulnerability disclosure** (و`/.well-known/security.txt`) عشان اللي يلاقي ثغرة يعرف يبلّغ إزاي.', 'A **threat model** with the **stride** framework: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege — for each component. A **security review** before any major release. And a **vulnerability disclosure** page (and `/.well-known/security.txt`) so whoever finds a flaw knows how to report it.'),
          'STRIDE for the order webhook\nS  spoofing        fake «paid» webhooks         → verify the HMAC signature (week 21)\nT  tampering       amount changed in transit    → signature covers the body; HTTPS\nR  repudiation     «we never sent that refund»  → append-only audit log with request ids\nI  disclosure      PII in logs                  → redaction filter; 30-day log retention\nD  denial          webhook flood                → rate limit + queue (week 35)\nE  elevation       support user calls admin API → per-route permissions; least privilege\n\n/.well-known/security.txt\nContact: mailto:security@example.com\nExpires: 2027-10-01T00:00:00Z\nPolicy: https://example.com/security', T)
      ],
      practice: [
        B('ضيف security headers لتطبيق FastAPI وافحصه بـ securityheaders.com.', 'Add security headers to a FastAPI app and check it with securityheaders.com.'),
        B('حط فلتر redaction على اللوج وجرّبه.', 'Add a redaction filter to logging and test it.'),
        B('اعمل STRIDE لمكوّن واحد عندك.', 'Do STRIDE for one of your components.'),
        B('اكتب security.txt لموقعك.', 'Write a security.txt for your site.')
      ],
      words: [
        W('security headers', 'ترويسات حماية الويب', 'HTTP headers that harden a web app', 'Security headers block clickjacking.'),
        W('rate limiting', 'تحديد عدد الطلبات', 'limiting how many requests are allowed', 'Rate limiting protects the login route.'),
        W('logging secrets', 'تسريب أسرار في اللوج', 'writing secrets into logs by mistake', 'Redaction stops logging secrets.'),
        W('threat model', 'تحليل التهديدات', 'an analysis of possible attacks', 'Update the threat model for the new webhook.'),
        W('stride', 'إطار تصنيف التهديدات الستة', 'a six-category threat framework', 'STRIDE found a repudiation gap.'),
        W('security review', 'مراجعة أمان قبل الإطلاق', 'a security check before release', 'The security review blocked the launch.'),
        W('vulnerability disclosure', 'سياسة الإبلاغ عن الثغرات', 'how to report security flaws', 'Publish a vulnerability disclosure policy.'),
        W('security.txt', 'ملف بيوضح إزاي تبلّغ عن ثغرة', 'a file stating how to report vulnerabilities', 'Add /.well-known/security.txt.')
      ],
      read: [{ t: 'OWASP Cheat Sheet: Logging', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html', what: B('اقرا Data to exclude.', 'Read Data to exclude.') }],
      challenge: B('قوّي خدمة المتجر: security headers وحد حجم الطلب وrate limiting، فلتر redaction على كل اللوج، STRIDE لكل مكوّن، checklist لمراجعة الأمان قبل الإطلاق، وsecurity.txt — واطلب من زميل يحاول يكسرها بإذنك.', 'Harden the shop service: security headers, a request size limit and rate limiting, a redaction filter on all logs, STRIDE for each component, a pre-release security review checklist, and security.txt — and ask a colleague to try to break it, with your permission.'),
      quiz: [
        Q(B('توكن في URL في اللوج:', 'A token in a URL in the logs:'), [['logging secrets؛ امسحه بفلتر', 'logging secrets; mask it with a filter'], ['عادي', 'fine'], ['أحسن للتصحيح', 'better for debugging']], 0, B('تسريب.', 'A leak.')),
        Q(B('S في STRIDE:', 'The S in STRIDE:'), [['Spoofing: انتحال', 'Spoofing'], ['Speed', 'Speed'], ['SQL', 'SQL']], 0, B('انتحال.', 'Impersonation.')),
        Q(B('security.txt:', 'security.txt:'), [['إزاي تبلّغ عن ثغرة', 'how to report a vulnerability'], ['كلمات السر', 'passwords'], ['إعدادات Python', 'Python settings']], 0, B('إبلاغ.', 'Reporting.'))
      ] },

    { title: B('مراجعة الشهر الحادي عشر ومشروعه', 'Month 11 review and project'),
      goal: B('هندسة Python احترافية: سريعة ونظيفة ومختبرة وآمنة.', 'Professional Python engineering: fast, clean, tested and secure.'),
      review: [
        B('الأداء: القياس والـ profiling والهياكل والذاكرة وN+1 (أسبوع 41).', 'Performance: measuring, profiling, structures, memory and N+1 (week 41).'),
        B('التصميم: refactoring وSOLID والأنماط وports and adapters (أسبوع 42).', 'Design: refactoring, SOLID, patterns and ports and adapters (week 42).'),
        B('الاختبارات: الهرم والبدائل والخصائص والطفرات والتكامل (أسبوع 43).', 'Testing: the pyramid, doubles, properties, mutations and integration (week 43).'),
        B('الأمان: الحقن والمسارات وSSRF والفك الآمن والأسرار.', 'Security: injection, paths, SSRF, safe parsing and secrets.'),
        B('سلسلة التوريد والـ headers والـ redaction وSTRIDE.', 'The supply chain, headers, redaction and STRIDE.')
      ],
      project: B('مشروع الشهر الحادي عشر «خدمة إنتاج بمعايير خبير»: خد خدمة المتجر (FastAPI + workers) وطلّعها لمستوى إنتاج: معمارية ports and adapters، حزمة اختبارات بهرم كامل وHypothesis وmutation testing للفلوس، تقرير أداء (profiling + إصلاح N+1 + كاش + benchmark في CI)، ومراجعة أمان كاملة (حقن، مسارات، SSRF، فك آمن، أسرار بـ Fernet وargon2، lockfile بـ hashes، pip-audit وbandit، headers، redaction، STRIDE، security.txt) — مع README بيشرح كل قرار.', 'Month 11 project «an expert-grade production service»: take the shop service (FastAPI + workers) to production level: a ports-and-adapters architecture, a full-pyramid test suite with Hypothesis and mutation testing for money, a performance report (profiling + N+1 fix + caching + a CI benchmark), and a complete security review (injection, paths, SSRF, safe parsing, secrets with Fernet and argon2, a hashed lockfile, pip-audit and bandit, headers, redaction, STRIDE, security.txt) — with a README explaining every decision.'),
      test: [
        Q(B('subprocess بـ shell=True ومدخل مستخدم:', 'subprocess with shell=True and user input:'), [['command injection', 'command injection'], ['آمن', 'safe'], ['أسرع', 'faster']], 0, B('حقن.', 'Injection.')),
        Q(B('منع path traversal:', 'Preventing path traversal:'), [['resolve() + is_relative_to', 'resolve() + is_relative_to'], ['منع حرف /', 'block the / character'], ['ولا حاجة', 'nothing']], 0, B('حدود.', 'Boundary.')),
        Q(B('SSRF:', 'SSRF:'), [['السيرفر يجيب URL داخلي بطلب مهاجم', 'the server fetches an internal URL for an attacker'], ['تنسيق CSS', 'CSS styling'], ['SQL', 'SQL']], 0, B('طلب.', 'Request.')),
        Q(B('قيم بسيطة من نص:', 'Simple values from text:'), [['ast.literal_eval أو JSON', 'ast.literal_eval or JSON'], ['eval', 'eval'], ['exec', 'exec']], 0, B('آمن.', 'Safe.')),
        Q(B('XML من مورد:', 'XML from a supplier:'), [['defusedxml', 'defusedxml'], ['أي parser', 'any parser'], ['eval', 'eval']], 0, B('entities.', 'Entities.')),
        Q(B('توكن إعادة كلمة السر:', 'A password-reset token:'), [['secrets.token_urlsafe', 'secrets.token_urlsafe'], ['random.random', 'random.random'], ['التاريخ', 'the date']], 0, B('عشوائية آمنة.', 'Secure randomness.')),
        Q(B('مقارنة توقيع webhook:', 'Comparing a webhook signature:'), [['hmac.compare_digest', 'hmac.compare_digest'], ['==', '=='], ['in', 'in']], 0, B('timing.', 'Timing.')),
        Q(B('تشفير توكنات العملاء:', 'Encrypting client tokens:'), [['Fernet بمفتاح من secret manager', 'Fernet with a key from a secret manager'], ['base64', 'base64'], ['خوارزمية من اختراعك', 'your own algorithm']], 0, B('متخترعش.', 'Don’t invent.')),
        Q(B('hash pinning بيمنع:', 'Hash pinning prevents:'), [['حزم متلاعب فيها', 'tampered packages'], ['البطء', 'slowness'], ['الأخطاء الإملائية', 'typos']], 0, B('سلامة.', 'Integrity.')),
        Q(B('pip-audit:', 'pip-audit:'), [['ثغرات معروفة في المكتبات', 'known vulnerabilities in libraries'], ['أخطاء الكتابة', 'style errors'], ['السرعة', 'speed']], 0, B('CVE.', 'CVEs.')),
        Q(B('Authorization header في اللوج:', 'An Authorization header in logs:'), [['امسحه بفلتر', 'mask it with a filter'], ['سيبه', 'leave it'], ['اطبعه مرتين', 'print it twice']], 0, B('redaction.', 'Redaction.')),
        Q(B('Repudiation في STRIDE بيتحل بـ:', 'Repudiation in STRIDE is addressed with:'), [['audit log مش قابل للتعديل', 'an append-only audit log'], ['كاش', 'a cache'], ['CSS', 'CSS']], 0, B('إثبات.', 'Evidence.'))
      ] }
  ]
};
