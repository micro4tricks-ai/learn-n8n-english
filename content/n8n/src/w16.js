// n8n week 16 — Python, pagination and large jobs (end of month 4).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('Python والـ Pagination والشغل الكبير', 'Python, pagination and large jobs'),
  goal: B('تستخدم Python جنب n8n: أساسيات اللغة، وPython في Code node، وسكربتات وخدمة FastAPI صغيرة n8n بيناديها، وتجيب آلاف السجلات بـ pagination، وتقسّم الشغل الكبير من غير ما الذاكرة تقع.',
          'Use Python alongside n8n: the language basics, Python in the Code node, scripts and a small FastAPI service that n8n calls, fetch thousands of records with pagination, and split large jobs without running out of memory.'),
  days: [
    { title: B('Python للي بيأتمت', 'Python for automators'),
      goal: B('تكتب Python بسيط: متغيّرات وأنواع وقوايم وقواميس وf-strings.', 'Write simple Python: variables, types, lists, dictionaries and f-strings.'),
      learn: [
        { h: B('الأساسيات', 'The basics'),
          p: B('مفيش let/const، المسافات (indentation) بتحدد البلوك مش الأقواس، وTrue/False بحرف كبير، وNone بدل null.', 'No let/const; indentation, not braces, defines blocks; True/False are capitalised; None instead of null.'),
          ex: 'name = "Ali"\nage = 30\nis_active = True\nif age >= 18:\n    print(f"{name} is an adult")' },
        { h: B('list وdict', 'list and dict'),
          p: B('list = [1, 2, 3] زي array. dict = {"name": "Ali"} زي object، وبتقرا بـ d["name"] أو d.get("name", "default").', 'list = [1, 2, 3], like an array. dict = {"name": "Ali"}, like an object; read with d["name"] or d.get("name", "default").'),
          ex: 'orders = [{"id": 1, "total": 50}, {"id": 2, "total": 120}]\nbig = [o for o in orders if o["total"] > 100]' },
        { h: B('JSON في Python', 'JSON in Python'),
          p: B('`import json` ← `json.loads(text)` نص لـ dict، و`json.dumps(obj)` العكس. ده اللي بتستخدمه لما تتبادل بيانات مع n8n.', '`import json` → `json.loads(text)` turns text into a dict, `json.dumps(obj)` the reverse. That\'s what you use when exchanging data with n8n.'),
          ex: 'data = json.loads(\'{"a": 1}\')\nprint(json.dumps(data, ensure_ascii=False))' }
      ],
      practice: [
        B('ثبّت Python واكتب سكربت بيطبع 5 أسطر عن طلبات.', 'Install Python and write a script that prints 5 lines about orders.'),
        B('اكتب list comprehension بيفلتر الطلبات الكبيرة.', 'Write a list comprehension that filters large orders.'),
        B('اقرا JSON من ملف واطبع حقل منه.', 'Read JSON from a file and print one field.'),
        B('حل 3 تمارين Python على Exercism.', 'Solve 3 Python exercises on Exercism.')
      ],
      words: ['variable', 'string / int / float / bool', 'f-string', 'list', 'dictionary'],
      read: ['lib:Python for Everybody', 'lib:The Python Tutorial (الرسمي)', { t: B('رحلة بايثون على الموقع', 'The Python journey on this site'), url: 'python.html#journey', what: B('لو عايز تتعمق: 24 أسبوع Python للأتمتة بأمثلة بتشتغل في الصفحة.', 'To go deeper: 24 weeks of Python for automation, with examples that run on the page.') }],
      challenge: B('اكتب سكربت Python بيقرا orders.json، ويحسب الإجمالي لكل عميل، ويكتب النتيجة في summary.json.', 'Write a Python script that reads orders.json, totals each customer\'s orders, and writes the result to summary.json.'),
      quiz: [
        { q: B('في Python البلوك بيتحدد بـ:', 'In Python a block is defined by:'), o: ['indentation', 'curly braces', 'semicolons'], a: 0, why: B('المسافات.', 'The spaces.') },
        { q: B('null في Python اسمها:', 'null in Python is:'), o: ['None', 'null', 'nil'], a: 0, why: B('None.', 'None.') },
        { q: B('`d.get("x", 0)` لو x مش موجود:', '`d.get("x", 0)` when x is missing:'), o: ['0', 'error', 'None always'], a: 0, why: B('القيمة الافتراضية.', 'The default value.') }
      ] },

    { title: B('الدوال والأخطاء في Python', 'Functions and errors in Python'),
      goal: B('تكتب دوال وتمسك الأخطاء عشان السكربت ميقعش.', 'Write functions and catch errors so the script doesn\'t crash.'),
      learn: [
        { h: B('الدوال', 'Functions'),
          p: B('`def name(arg, default=1):` وreturn. والـ arguments ممكن تتبعت بالاسم: `send(to="a@b.c", retries=3)`.', '`def name(arg, default=1):` and return. Arguments can be passed by name: `send(to="a@b.c", retries=3)`.'),
          ex: 'def net_price(price, tax=0.14):\n    return round(price * (1 + tax), 2)' },
        { h: B('try / except', 'try / except'),
          p: B('`try:` الكود، `except ValueError as e:` لو حصل خطأ معيّن. متمسكش كل الأخطاء بـ except عريان؛ حدد النوع.', '`try:` the code, `except ValueError as e:` for a specific error. Don\'t catch everything with a bare except; name the type.'),
          ex: 'try:\n    qty = int(row["qty"])\nexcept ValueError:\n    qty = 0' },
        { h: B('الـ exceptions الشائعة', 'Common exceptions'),
          p: B('KeyError (مفتاح مش موجود)، ValueError (قيمة غلط)، TypeError (نوع غلط)، FileNotFoundError، requests.exceptions.Timeout. اقرا آخر سطر في الـ traceback.', 'KeyError (missing key), ValueError (bad value), TypeError (wrong type), FileNotFoundError, requests.exceptions.Timeout. Read the last line of the traceback.'),
          ex: 'KeyError: \'email\' → use row.get("email")' }
      ],
      practice: [
        B('اكتب 3 دوال بـ default arguments.', 'Write 3 functions with default arguments.'),
        B('حوّط تحويل أرقام بـ try/except ValueError.', 'Wrap number conversion in try/except ValueError.'),
        B('اعمل 3 أخطاء بإيدك (KeyError، TypeError، FileNotFoundError) واقرا الـ traceback.', 'Cause 3 errors on purpose (KeyError, TypeError, FileNotFoundError) and read the traceback.'),
        B('اكتب دالة بتنضّف صف CSV وترجّع dict نظيف أو None.', 'Write a function that cleans a CSV row and returns a clean dict or None.')
      ],
      words: ['function', 'argument / parameter', 'return', 'exception', 'try / except'],
      read: ['lib:Automate the Boring Stuff with Python', 'lib:A Byte of Python'],
      challenge: B('اكتب سكربت بيقرا CSV «وسخ»، ويعدّي على كل صف بدالة تنضيف، ويكتب الصح في clean.csv والغلط في errors.csv بالسبب.', 'Write a script that reads a messy CSV, passes each row through a cleaning function, and writes good rows to clean.csv and bad ones to errors.csv with the reason.'),
      quiz: [
        { q: B('تعريف دالة في Python:', 'Defining a function in Python:'), o: ['def f(x):', 'function f(x) {', 'fn f(x) =>'], a: 0, why: B('def.', 'def.') },
        { q: B('`int("abc")` بيرمي:', '`int("abc")` raises:'), o: ['ValueError', 'KeyError', 'TypeError'], a: 0, why: B('قيمة مش رقم.', 'Not a number.') },
        { q: B('except عريان يمسك كل حاجة:', 'A bare except that catches everything:'), o: [B('بيخفي أخطاء، حدد النوع', 'hides errors; name the type'), B('ممتاز', 'excellent'), B('إجباري', 'required')], a: 0, why: B('حدد.', 'Be specific.') }
      ] },

    { title: B('Python مع n8n', 'Python with n8n'),
      goal: B('تشغّل Python في Code node، وتعرف إمتى تحتاج سكربت أو خدمة برّه.', 'Run Python in the Code node, and know when you need an outside script or service.'),
      learn: [
        { h: B('Python في Code node', 'Python in the Code node'),
          p: B('Code node فيه لغة Python: `_input.all()` بيجيب الـ items، وبترجّع list من dicts فيها "json". المكتبات المتاحة محدودة، فمش كل pip package هتشتغل جوه.', 'The Code node has a Python option: `_input.all()` gets the items and you return a list of dicts with "json". Available libraries are limited, so not every pip package works inside.'),
          ex: 'out = []\nfor item in _input.all():\n    out.append({"json": {"name": item.json["name"].upper()}})\nreturn out' },
        { h: B('سكربت برّه', 'An outside script'),
          p: B('لو محتاج مكتبات (pandas، OCR…)، اعمل سكربت في virtual environment بـ requirements.txt. على self-hosted: Execute Command يشغّله. الأنضف: خدمة صغيرة n8n يكلمها بـ HTTP.', 'If you need libraries (pandas, OCR…), write a script in a virtual environment with requirements.txt. On self-hosted: Execute Command runs it. Cleaner: a small service that n8n calls over HTTP.'),
          ex: 'python -m venv .venv\n.venv\\Scripts\\activate   (Windows)\npip install -r requirements.txt' },
        { h: B('المكتبات', 'Libraries'),
          p: B('`pip install requests` بيثبّت، و`import requests` بيستخدم. وrequirements.txt فيه كل المكتبات بأرقام نسخها عشان أي حد يبني نفس البيئة.', '`pip install requests` installs, `import requests` uses. requirements.txt lists every library with versions so anyone can rebuild the same environment.'),
          ex: 'requests==2.32.3\npandas==2.2.2' }
      ],
      practice: [
        B('اكتب Python Code node بيحوّل الأسماء لحروف كبيرة.', 'Write a Python Code node that uppercases names.'),
        B('اعمل venv وثبّت requests واعمل requirements.txt.', 'Create a venv, install requests and write requirements.txt.'),
        B('اكتب سكربت بيجيب JSON من API ويطبعه.', 'Write a script that fetches JSON from an API and prints it.'),
        B('قارن: نفس المهمة في JS Code وPython Code وسكربت برّه.', 'Compare the same job in a JS Code node, a Python Code node and an outside script.')
      ],
      words: ['module / import', 'library / package', 'pip', 'virtual environment (venv)', 'requirements.txt'],
      read: ['lib:Requests Docs', 'lib:n8n Docs: Code node'],
      challenge: B('اعمل سكربت Python بـ pandas بيعمل تقرير من CSV كبير، وn8n بيشغّله (Execute Command لو self-hosted، أو تبعتله الملف لخدمة) ويبعت النتيجة.', 'Write a pandas script that builds a report from a large CSV, run it from n8n (Execute Command if self-hosted, or send the file to a service), and send the result.'),
      quiz: [
        { q: B('في Python Code node تجيب الـ items بـ:', 'In a Python Code node you get the items with:'), o: ['_input.all()', '$input.all()', 'items()'], a: 0, why: B('_ في Python.', '_ in Python.') },
        { q: B('محتاج pandas:', 'You need pandas:'), o: [B('سكربت أو خدمة برّه n8n', 'a script or service outside n8n'), B('Code node دايمًا', 'always the Code node'), B('مستحيل', 'impossible')], a: 0, why: B('المكتبات محدودة جوه.', 'Libraries are limited inside.') },
        { q: B('requirements.txt فيه:', 'requirements.txt holds:'), o: [B('المكتبات ونسخها', 'libraries and their versions'), B('الباسوردات', 'passwords'), B('الكود', 'the code')], a: 0, why: B('بيئة قابلة لإعادة البناء.', 'A reproducible environment.') }
      ] },

    { title: B('خدمة FastAPI صغيرة', 'A small FastAPI service'),
      goal: B('تعمل API بـ Python، وn8n يناديه لشغل تقيل أو مكتبات خاصة.', 'Build an API in Python that n8n calls for heavy work or special libraries.'),
      learn: [
        { h: B('FastAPI في 10 سطور', 'FastAPI in 10 lines'),
          p: B('FastAPI بيعمل API من دوال Python. تشغّله بـ uvicorn، وn8n يكلمه بـ HTTP Request زي أي API.', 'FastAPI turns Python functions into an API. Run it with uvicorn, and n8n calls it with HTTP Request like any API.'),
          ex: 'from fastapi import FastAPI\napp = FastAPI()\n\n@app.post("/clean")\ndef clean(item: dict):\n    return {"name": item.get("name", "").strip().title()}\n\n# uvicorn main:app --port 8000' },
        { h: B('الـ logging', 'Logging'),
          p: B('`import logging` واطبع رسايل بمستويات (INFO، WARNING، ERROR) بدل print. لما حاجة تقع، الـ log بيقولك إيه اللي حصل.', '`import logging` and log messages with levels (INFO, WARNING, ERROR) instead of print. When something breaks, the log tells you what happened.'),
          ex: 'logging.basicConfig(level=logging.INFO)\nlogging.info("cleaned %s rows", n)' },
        { h: B('الشروط والتكرار', 'Conditions and loops'),
          p: B('`if / elif / else` و`for row in rows:` و`while`. نفس الأفكار اللي في JavaScript بكتابة مختلفة.', '`if / elif / else`, `for row in rows:` and `while`. The same ideas as JavaScript, written differently.'),
          ex: 'for row in rows:\n    if row["total"] > 1000:\n        tier = "vip"\n    elif row["total"] > 100:\n        tier = "regular"\n    else:\n        tier = "small"' }
      ],
      practice: [
        B('ثبّت fastapi وuvicorn واعمل endpoint /health.', 'Install fastapi and uvicorn and create a /health endpoint.'),
        B('اعمل endpoint /clean وناديه من n8n.', 'Create a /clean endpoint and call it from n8n.'),
        B('ضيف logging لكل طلب.', 'Add logging to every request.'),
        B('افتح /docs وشوف التوثيق اللي FastAPI عمله لوحده.', 'Open /docs and see the documentation FastAPI generates.')
      ],
      words: ['FastAPI', 'logging', 'condition', 'loop',
        { t: 'uvicorn', m: B('السيرفر اللي بيشغّل تطبيق FastAPI', 'the server that runs a FastAPI app'), ex: 'uvicorn main:app --port 8000' }],
      read: [{ t: 'FastAPI Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/', what: B('اقرا «First Steps» و«Request Body».', 'Read "First Steps" and "Request Body".') }, 'lib:Real Python'],
      challenge: B('اعمل خدمة FastAPI فيها endpoint بيستقبل نص عربي ويرجّع نسخة موحّدة للبحث (من غير تشكيل)، وn8n يستخدمها في workflow، ومعاها Dockerfile بسيط.', 'Build a FastAPI service with an endpoint that takes Arabic text and returns a search-normalised version (no diacritics), use it from an n8n workflow, and add a simple Dockerfile.'),
      quiz: [
        { q: B('FastAPI بيتشغّل بـ:', 'FastAPI runs with:'), o: ['uvicorn', 'pip', 'npm'], a: 0, why: B('ASGI server.', 'An ASGI server.') },
        { q: B('n8n بيكلم خدمة FastAPI بـ:', 'n8n talks to a FastAPI service with:'), o: ['HTTP Request', 'Postgres', 'Gmail'], a: 0, why: B('API عادي.', 'A normal API.') },
        { q: B('بدل print في خدمة:', 'Instead of print in a service:'), o: ['logging', 'input()', 'nothing'], a: 0, why: B('مستويات ورسايل منظمة.', 'Levels and structured messages.') }
      ] },

    { title: B('الـ pagination والشغل الكبير', 'Pagination and large jobs'),
      goal: B('تجيب آلاف السجلات من API، وتقسّم الشغل الكبير عشان n8n ميقعش.', 'Fetch thousands of records from an API, and split large jobs so n8n doesn\'t fall over.'),
      learn: [
        { h: B('أنواع الـ pagination', 'Kinds of pagination'),
          p: B('offset/page (`?page=2&limit=100`)، وcursor (`?cursor=abc` والرد بيقول next_cursor)، وlink (الرد فيه next URL). الـ cursor أثبت للبيانات اللي بتتغيّر.', 'offset/page (`?page=2&limit=100`), cursor (`?cursor=abc` with the response giving next_cursor), and link (the response contains the next URL). Cursors are more stable when data changes.'),
          ex: '{ "data": [...], "next_cursor": "eyJpZCI6MTAwfQ" }' },
        { h: B('Pagination في HTTP Request', 'Pagination in HTTP Request'),
          p: B('HTTP Request عنده Options ← Pagination: تحدد تعدّل إيه كل صفحة (parameter أو URL من الرد)، وإمتى يقف (الرد فاضي أو مفيش next)، وحد أقصى للطلبات.', 'HTTP Request has Options → Pagination: choose what changes each page (a parameter or a URL from the response), when to stop (an empty response or no next), and a maximum number of requests.'),
          ex: 'Pagination: Update a Parameter → page = {{ $pageCount + 1 }}\nComplete when: response is empty · Max requests: 100' },
        { h: B('الشغل الكبير', 'Large jobs'),
          p: B('100 ألف سجل في تنفيذ واحد ممكن يوقع الذاكرة. قسّم: workflow رئيسي بيجيب IDs أو صفحات، ويبعت كل دفعة لـ sub-workflow (الذاكرة بتتحرر بعد كل واحد)، وسجّل checkpoint عشان لو وقف تكمّل من مكانه.', '100,000 records in one execution can exhaust memory. Split it: a main workflow gets IDs or pages and sends each batch to a sub-workflow (memory is freed after each), and records a checkpoint so it can resume where it stopped.'),
          ex: 'Main: pages 1..500 → Execute Workflow (batch) per page\nCheckpoint: last_page in Postgres' }
      ],
      practice: [
        B('استخدم Pagination option في HTTP Request على API بـ page.', 'Use the Pagination option in HTTP Request on a page-based API.'),
        B('اعمل cursor pagination (GitHub API مثلًا بالـ link header أو API تاني).', 'Do cursor pagination (the GitHub API via its link header, or another API).'),
        B('حط Max requests كحماية.', 'Set Max requests as a safeguard.'),
        B('صمم (على ورق) job لـ 50 ألف سجل بـ sub-workflows وcheckpoint.', 'Design (on paper) a 50,000-record job with sub-workflows and a checkpoint.')
      ],
      words: [
        { t: 'offset pagination', m: B('صفحات برقم أو إزاحة (page / offset)', 'pages by number or offset (page / offset)'), ex: '?page=3&limit=100' },
        { t: 'cursor pagination', m: B('صفحات بعلامة من الرد اللي فات', 'pages using a marker from the previous response'), ex: '?cursor=abc123' },
        { t: 'Pagination (HTTP Request option)', m: B('إعداد بيجيب كل الصفحات أوتوماتيك', 'a setting that fetches every page automatically'), ex: 'Complete when: no next' },
        { t: 'chunking', m: B('تقسيم شغل كبير لقطع صغيرة', 'splitting a big job into small pieces'), ex: '500 pages → 500 sub-workflow runs' },
        { t: 'checkpoint', m: B('علامة محفوظة بآخر مكان وصلته عشان تكمّل منه', 'a saved marker of how far you got, to resume from'), ex: 'last_page = 237' }],
      read: ['lib:n8n Docs: HTTP Request node', 'lib:n8n Docs: Looping'],
      challenge: B('اعمل «full sync» لـ API كبير (أو محاكاة): pagination، ومعالجة كل صفحة في sub-workflow، وcheckpoint في Postgres، ولو وقفته في النص وشغّلته تاني يكمّل من مكانه.', 'Build a "full sync" of a large API (or a simulation): pagination, each page processed in a sub-workflow, a checkpoint in Postgres, and if you stop it midway and restart, it resumes where it left off.'),
      quiz: [
        { q: B('البيانات بتتغيّر وانت بتقلّب الصفحات:', 'Data changes while you page through it:'), o: ['cursor pagination', 'offset pagination', 'no pagination'], a: 0, why: B('أثبت.', 'More stable.') },
        { q: B('100 ألف سجل في تنفيذ واحد:', '100,000 records in one execution:'), o: [B('قسّم على sub-workflows', 'split into sub-workflows'), B('عادي', 'fine'), B('Wait أطول', 'a longer Wait')], a: 0, why: B('الذاكرة.', 'Memory.') },
        { q: B('checkpoint بيفيد في:', 'A checkpoint helps you:'), o: [B('تكمّل من مكان ما وقفت', 'resume where you stopped'), B('تسرّع', 'go faster'), B('تشفّر', 'encrypt')], a: 0, why: B('استكمال.', 'Resuming.') }
      ] },

    { title: B('مراجعة الشهر الرابع والاختبار', 'Month 4 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 17 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 17 opens when you score 70% or more.'),
      review: [
        B('SQL وPostgres والتصميم والأمان (الأسبوع 13).', 'SQL, Postgres, design and safety (week 13).'),
        B('الملفات: CSV وExcel وPDF والتخزين (الأسبوع 14).', 'Files: CSV, Excel, PDF and storage (week 14).'),
        B('الـ scraping باحترام، وselectors، والمراقبة (الأسبوع 15).', 'Respectful scraping, selectors and monitoring (week 15).'),
        B('Python وFastAPI والـ pagination والشغل الكبير (الأسبوع 16).', 'Python, FastAPI, pagination and large jobs (week 16).')
      ],
      project: B('مشروع الشهر: «data platform» صغيرة: بيانات من API كبير بـ pagination وcheckpoint، ومن ملفات CSV/Excel بتوصل، ومن مصدر ويب مسموح، كلها بتتنضّف (خدمة Python أو Code) وتدخل Postgres بـ schema وmigrations، وتقرير أسبوعي XLSX وملخص على Telegram، ونسخة احتياطية. كله موثّق في Git.',
                 'Month project: a small "data platform": data from a large API with pagination and checkpoints, from incoming CSV/Excel files, and from a permitted web source, all cleaned (a Python service or Code) and loaded into Postgres with a schema and migrations, plus a weekly XLSX report, a Telegram summary, and a backup. Everything is documented in Git.'),
      test: [
        { q: B('تمنع SQL injection بـ:', 'Prevent SQL injection with:'), o: ['query parameters ($1)', 'longer queries', 'LIMIT'], a: 0, why: B('parameters.', 'Parameters.') },
        { q: B('العملاء اللي مالهمش طلبات:', 'Customers without orders:'), o: ['LEFT JOIN … IS NULL', 'INNER JOIN', 'ORDER BY'], a: 0, why: B('LEFT.', 'LEFT.') },
        { q: B('للفلوس في Postgres:', 'For money in Postgres:'), o: ['NUMERIC', 'FLOAT', 'TEXT'], a: 0, why: B('دقيق.', 'Exact.') },
        { q: B('عربي مكسّر في CSV مفتوح في Excel:', 'Broken Arabic in a CSV opened in Excel:'), o: ['UTF-8 BOM', 'semicolon', 'PDF'], a: 0, why: B('Excel.', 'Excel.') },
        { q: B('PDF مصوّر:', 'A scanned PDF:'), o: ['OCR', 'Extract From File only', 'regex'], a: 0, why: B('مفيش نص.', 'No text.') },
        { q: B('لينك من <a> في HTML node:', 'A link from <a> in the HTML node:'), o: ['Attribute href', 'Text', 'HTML'], a: 0, why: B('href.', 'href.') },
        { q: B('الموقع عنده API رسمي:', 'The site has an official API:'), o: [B('استخدمه', 'use it'), B('scrape', 'scrape it'), B('تجاهله', 'ignore it')], a: 0, why: B('أأمن.', 'Safer.') },
        { q: B('Python block بيتحدد بـ:', 'A Python block is defined by:'), o: ['indentation', '{ }', 'end'], a: 0, why: B('مسافات.', 'Spaces.') },
        { q: B('`int("x")` في Python:', '`int("x")` in Python:'), o: ['ValueError', 'None', '0'], a: 0, why: B('مش رقم.', 'Not a number.') },
        { q: B('pandas مع n8n:', 'pandas with n8n:'), o: [B('سكربت أو خدمة برّه', 'an outside script or service'), B('جوه أي Code node', 'inside any Code node'), B('مستحيل', 'impossible')], a: 0, why: B('مكتبات محدودة جوه.', 'Limited libraries inside.') },
        { q: B('cursor pagination:', 'Cursor pagination:'), o: [B('الرد بيدي علامة الصفحة الجاية', 'the response gives the next-page marker'), B('رقم صفحة ثابت', 'a fixed page number'), B('مفيش صفحات', 'no pages')], a: 0, why: B('next_cursor.', 'next_cursor.') },
        { q: B('شغل كبير جدًا في n8n:', 'A very large job in n8n:'), o: ['sub-workflows + checkpoint', 'one giant execution', 'more RAM only'], a: 0, why: B('تقسيم واستكمال.', 'Split and resume.') }
      ] }
  ]
};
