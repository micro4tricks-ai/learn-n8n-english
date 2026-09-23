// n8n page data (Arabic source). English comes from n8n-en.js via T().
window.N8N_DATA = (function(){
  var REVIEW = 'راجع مصطلحات الأسبوع في البنك: غطّي المعنى وحاول تفتكره من الكلمة بس';

  // Each day: [ [n8n focus, [tasks]], [language focus, [tasks]] ]
  var WEEKS = [];

  // ---------------- Week 1 ----------------
  WEEKS.push({
    n:1, n8:'التشغيل والأساسيات', lg:'الطرفية وGit وGitHub',
    title:'تشغيل n8n وفهم الأساسيات',
    goal:'في آخر الأسبوع يبقى n8n شغال على جهازك، وتبني Workflow بيستقبل طلب من الإنترنت، وتحفظ شغلك على GitHub.',
    node:{name:'Edit Fields (Set)', mean:'بيضيف أو يعدّل أو يشيل حقول في البيانات — أكتر نود هتستخدمها.', ex:'greeting = Hello {{ $json.name }}', exAr:'بيبني حقل جديد من قيمة موجودة.'},
    lang:{name:'الطرفية (PowerShell) + Git وGitHub', mean:'الطرفية بتخليك تشغّل n8n وPython، وGit بيحفظ شغلك ويرفعه على GitHub كبورتفوليو.'},
    days:{
      sat:[
        ['تثبيت وتشغيل n8n',[
          'نزّل Node.js (نسخة LTS) من nodejs.org، وافتح PowerShell واكتب `npx n8n` — أو ابدأ تجربة n8n Cloud المجانية لو مش عايز تثبّت',
          'افتح `http://localhost:5678` واعمل حساب المالك (Owner) أول مرة',
          'اعمل Workflow جديد، سمّيه «01 - Hello n8n» واحفظه (Ctrl+S)'
        ]],
        ['PowerShell أساسيات',[
          'جرّب `cd` و`dir` و`mkdir n8n-journey` و`cd n8n-journey`',
          'اعمل ملف بـ `New-Item notes.txt` واكتب فيه بـ `notepad notes.txt` واقراه بـ `Get-Content notes.txt`'
        ]]
      ],
      sun:[
        ['المفاهيم الأساسية',[
          'اقرا صفحة Key concepts في docs.n8n.io (بالإنجليزي) وعلّم أي مصطلح جديد في البنك',
          'ابني: Manual Trigger ← Edit Fields، واضغط Execute Workflow',
          'افتح Output كل نود وبدّل بين Table وJSON وSchema'
        ]],
        ['Git: أول commit',[
          'نزّل Git من git-scm.com وتأكد بـ `git --version`، واضبط `git config --global user.name` و`user.email`',
          'في فولدر n8n-journey شغّل `git init` ثم `git add .` ثم `git commit -m "first commit"`'
        ]]
      ],
      mon:[
        ['الـ Items وشكل البيانات',[
          'افهم إن كل نود بتستقبل وبتطلّع قايمة items، وكل item فيه json',
          'في Edit Fields ضيف 3 حقول: `name` و`age` و`city`',
          'حط نود Code مؤقتًا بالكود ده وشوف Edit Fields بتشتغل على كل item: `return [{json:{name:"Ali"}},{json:{name:"Sara"}},{json:{name:"Omar"}}];`'
        ]],
        ['GitHub',[
          'اعمل حساب GitHub وrepository اسمه `n8n-journey`',
          'اربطه: `git remote add origin <الرابط>` ثم `git branch -M main` ثم `git push -u origin main` (أو استخدم GitHub Desktop)',
          'افتح صفحة الـ repo وتأكد إن الملف ظهر'
        ]]
      ],
      tue:[
        ['Expressions أول مرة',[
          'في حقل نصي اضغط Expression بدل Fixed واكتب: `أهلاً {{ $json.name }}`',
          'ضيف حقل `today` قيمته `{{ $now.toFormat("yyyy-MM-dd") }}`',
          'استخدم معاينة النتيجة تحت الحقل بدل التخمين'
        ]],
        ['الفروع والتاريخ',[
          'بعد كل تعديل استخدم `git status` و`git log --oneline`',
          'اعمل branch: `git switch -c experiment`، عدّل ملف، ارجع `git switch main` وادمج بـ `git merge experiment`'
        ]]
      ],
      wed:[
        ['Schedule Trigger',[
          'ابدأ Workflow جديد بـ Schedule Trigger كل دقيقة ← Edit Fields بيضيف الوقت الحالي',
          'فعّل الـ Workflow (Activate / Publish حسب الإصدار) وسيبه 3 دقايق، وبعدين افتح تبويب Executions',
          'وقّف الـ Workflow بعد التجربة'
        ]],
        ['.gitignore وMarkdown',[
          'اعمل `.gitignore` فيه `.env` و`.venv/` و`node_modules/` — ومتحطش أسرار في أي repo',
          'اكتب `README.md` بـ Markdown: عنوان `#` وقايمة `-` وكتلة كود بثلاث backticks'
        ]]
      ],
      thu:[
        ['Webhook',[
          'ابدأ Workflow بنود Webhook، انسخ الـ Test URL وافتحه في المتصفح وزوّد في آخره `?name=Ali`',
          'شوف فين ظهر `name` في الـ Output، وجرّب تبعت POST من webhook.site أو curl وشوف `body`',
          'افهم الفرق: Test URL بيشتغل مرة واحدة وانت مستني، Production URL بيشتغل لما الـ Workflow يتفعّل'
        ]],
        ['شغلك على GitHub',[
          'صدّر الـ Workflow كملف JSON وحطه في الـ repo',
          'اعمل commit بإنجليزي واضح: `Add hello-webhook workflow` وارفعه بـ `git push`'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: Webhook (GET) ← Edit Fields ← Respond to Webhook بيرد بـ «أهلاً {name}» (في Webhook اختار Respond: Using Respond to Webhook Node)'
        ]],
        ['مراجعة اللغة',[
          'اكتب من الذاكرة أوامر Git الخمسة الأساسية',
          'اشرح في جملة إنجليزي الفرق بين commit وpush'
        ]]
      ]
    }
  });

  // ---------------- Week 2 ----------------
  WEEKS.push({
    n:2, n8:'البيانات والـ APIs', lg:'JSON وHTTP وcURL',
    title:'البيانات والـ APIs',
    goal:'هتجيب بيانات حقيقية من API، وتفلترها وترتبها وتحوّلها للشكل المطلوب، وتفهم لغة الويب اللي بتتكلم بيها الـ APIs.',
    node:{name:'IF', mean:'بيقسّم مسار البيانات لاتنين حسب شرط.', ex:'{{ $json.id }}  is greater than  5', exAr:'true يروح مسار، وfalse يروح مسار تاني.'},
    lang:{name:'JSON + HTTP + cURL', mean:'كل API بيتكلم JSON فوق HTTP. لو فهمتهم مش هتتوه في أي خدمة جديدة.'},
    days:{
      sat:[
        ['أول API',[
          'نود HTTP Request: GET على `https://jsonplaceholder.typicode.com/users` — لاحظ إن الـ 10 مستخدمين بقوا 10 items',
          'افتح Output بشكل JSON وحدد مسار `address.city` لأول مستخدم'
        ]],
        ['JSON: القواعد',[
          'قواعد JSON: مفاتيح بعلامات تنصيص مزدوجة، من غير فاصلة أخيرة، والأنواع string وnumber وboolean وnull وarray وobject',
          'اكتب JSON عن كتاب فيه قايمة مؤلفين (array of objects)'
        ]]
      ],
      sun:[
        ['Query Parameters والـ Status',[
          'ضيف Query Parameter على `/posts` زي `_limit=3` وشوف الفرق',
          'من Options فعّل Include Response Headers and Status وشوف الـ status code',
          'جرّب رابط غلط وشوف الخطأ اللي n8n بيطلّعه'
        ]],
        ['JSON: أدوات وأخطاء',[
          'نسّق JSON بـ VS Code (Shift+Alt+F) أو jsonlint.com',
          'غلّط عمدًا (فاصلة زيادة، علامة تنصيص مفردة) وشوف رسالة الخطأ',
          'في Console المتصفح (F12) جرّب `JSON.parse` و`JSON.stringify`'
        ]]
      ],
      mon:[
        ['IF وFilter',[
          'IF: المستخدمين اللي `id` بتاعهم أكبر من 5 يروحوا مسار true والباقي false',
          'جرّب Filter على نفس البيانات — الفرق: Filter بيكمّل بس اللي بينطبق، وIF بيقسم لمسارين',
          'ضيف Edit Fields على كل مسار يضيف حقل `label` مختلف'
        ]],
        ['HTTP: الفكرة',[
          'افهم request وresponse: method وURL وheaders وbody وstatus',
          'افتح تبويب Network في المتصفح (F12) وشوف طلبات أي صفحة',
          'احفظ status codes: 200 و201 و400 و401 و403 و404 و429 و500'
        ]]
      ],
      tue:[
        ['Switch وMerge',[
          'Switch: وزّع المستخدمين على 3 مسارات حسب قواعد (Rules) على `id`',
          'Merge: ارجع اجمع المسارات في مسار واحد (Append)',
          'اقرا عن Fallback Output: إيه اللي بيحصل للـ items اللي مطابقتش أي قاعدة؟'
        ]],
        ['cURL',[
          'في PowerShell استخدم `curl.exe` (مش `curl` لأنها alias): `curl.exe https://jsonplaceholder.typicode.com/users/1`',
          'اعمل ملف `body.json` وابعت POST: `curl.exe -X POST -H "Content-Type: application/json" -d "@body.json" https://jsonplaceholder.typicode.com/posts`'
        ]]
      ],
      wed:[
        ['ترتيب وتجميع',[
          'Sort بالاسم، وبعدها Limit لأول 5',
          'Remove Duplicates على حقل معيّن (جرّب على بيانات فيها تكرار)',
          'Aggregate: حوّل الـ 5 items لـ item واحد فيه قايمة الأسماء'
        ]],
        ['قراءة مسارات JSON',[
          'اتدرب تقرا مسار قيمة جوه JSON: `data.users[0].address.city`',
          'قارنه بنفس المسار كـ Expression في n8n: `{{ $json.data.users[0].address.city }}`',
          'هات شكل JSON من 3 APIs مختلفة وارسم شجرته على ورقة'
        ]]
      ],
      thu:[
        ['Edit Fields المتقدم',[
          'جرّب Manual Mapping مقابل JSON mode في Edit Fields',
          'فعّل الخيار Include Other Input Fields وشوف الفرق في الـ Output',
          'استخدم مسار متداخل زي `address.city` في اسم الحقل'
        ]],
        ['URL وQuery string',[
          'قسّم URL لأجزاءه: البروتوكول والدومين والمسار والـ query والـ fragment',
          'ابني URL فيه 3 query parameters وافهم الترميز (`%20` للمسافة)',
          'في n8n جرّب تحط قيم الـ query من Expressions'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: هات `/users` ← فلتر ← رتّب ← أول 5 ← حوّلهم لـ items فيها `fullName` و`email` بس'
        ]],
        ['مراجعة اللغة',[
          'اشرح الفرق بين GET وPOST بمثال من الـ Workflow بتاعك',
          'اكتب 3 جمل إنجليزي تشرح فيها الـ Workflow (ابدأ بـ This workflow fetches …)'
        ]]
      ]
    }
  });

  // ---------------- Week 3 ----------------
  WEEKS.push({
    n:3, n8:'الربط بـ Sheets وTelegram وGmail', lg:'Python 1: الأساسيات',
    title:'الربط بالخدمات + أول Python',
    goal:'هتربط n8n بخدمات حقيقية بتستخدمها، وتبدأ Python من الصفر بحيث تكتب سكربتات صغيرة.',
    node:{name:'Google Sheets', mean:'بيقرا ويكتب ويعدّل صفوف في جداول جوجل.', ex:'Operation: Append Row · Sheet: Leads', exAr:'كل صف في الشيت بيتحول لـ item، والعكس.'},
    lang:{name:'Python 1: الأساسيات', mean:'المتغيرات والنصوص والشروط والحلقات — أساس أي سكربت أتمتة.'},
    days:{
      sat:[
        ['Credentials وOAuth',[
          'افهم إن Credentials في n8n بتتخزن مشفّرة ومبتظهرش جوه الـ Workflow',
          'لو n8n على جهازك: في Google Cloud Console اعمل Project، فعّل Sheets API وGmail API، واعمل OAuth Client (Web application). على n8n Cloud بتسجّل دخول بجوجل مباشرة',
          'حط الـ Redirect URL اللي n8n بيوريهولك في الـ Client، وأضف حسابك كـ Test user في OAuth consent screen'
        ]],
        ['Python: تثبيت وأول سكربت',[
          'نزّل Python 3.12+ من python.org وفعّل Add python.exe to PATH، وتأكد بـ `python --version`',
          'اكتب `hello.py` فيه `print("Hello")` و`input()` وشغّله بـ `python hello.py`'
        ]]
      ],
      sun:[
        ['Sheets — قراءة',[
          'اعمل Google Sheet فيه 10 صفوف بيانات وهمية (الصف الأول أسماء الأعمدة)',
          'نود Google Sheets ← Get Row(s) وشوف كل صف بقى item',
          'جرّب Filters على عمود بدل ما تسحب الشيت كله'
        ]],
        ['Python: متغيرات وأنواع',[
          'أنواع: `int` و`float` و`str` و`bool`، وتحويل بـ `int()` و`str()`',
          'f-strings: `f"Hello {name}"` وعمليات: `+ - * / // % **`'
        ]]
      ],
      mon:[
        ['Sheets — كتابة',[
          'Append Row: أضف صف من نود Edit Fields',
          'Update Row باستخدام عمود مطابقة (Column to match on)',
          'جرّب Append or Update Row وافهم إمتى تستخدمه'
        ]],
        ['Python: نصوص',[
          'جرّب `.upper()` و`.strip()` و`.split()` و`.replace()` وslicing زي `s[0:3]`',
          'اكتب سكربت ينضّف إيميل: `strip` ثم `lower`'
        ]]
      ],
      tue:[
        ['Telegram Bot',[
          'كلّم @BotFather على تيليجرام: `/newbot` وخُد الـ Token',
          'اعمل Telegram Credential في n8n وحط فيه الـ Token',
          'ابعت رسالة لنفسك بنود Telegram ← Send Message (محتاج Chat ID: ابعت رسالة للبوت وقراها بـ Telegram Trigger)'
        ]],
        ['Python: شروط',[
          '`if` و`elif` و`else` وعوامل المقارنة `== != > <` و`and` و`or` و`not`',
          'اكتب سكربت يحدد خصم حسب المبلغ'
        ]]
      ],
      wed:[
        ['Gmail',[
          'نود Gmail ← Send بنفس إعداد جوجل — أو نود Send Email بـ SMTP وApp Password لو الـ OAuth واقف معاك',
          'ابعت لنفسك إيميل فيه بيانات صف من الشيت باستخدام Expressions في الموضوع والنص',
          'اكتب نص الإيميل بالإنجليزي كتمرين كتابة'
        ]],
        ['Python: حلقات',[
          '`for` على `range()` وعلى نص، و`while` مع `break`',
          'اكتب جدول ضرب وسكربت يعدّ تكرار كل حرف في كلمة'
        ]]
      ],
      thu:[
        ['Sheets Trigger',[
          'Google Sheets Trigger على حدث Row Added (بيفحص كل فترة — polling)',
          'ضيف صف يدوي في الشيت وراقب تشغيل الـ Workflow (ممكن ياخد دقيقة)',
          'فعّل الـ Workflow وسيب الطرفية شغالة، وتأكد إنه لسه بيشتغل'
        ]],
        ['Python: مشروع صغير',[
          'سكربت يسأل عن الاسم والعمر ويطبع رسالة مخصصة مع شرط',
          'ارفعه على GitHub في repo `python-practice`'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: أي صف جديد في Sheet ← رسالة Telegram فيها بياناته بشكل مرتب'
        ]],
        ['مراجعة اللغة',[
          'راجع أخطاء SyntaxError وNameError وIndentationError من قسم الأخطاء',
          'حل 5 تمارين Python بسيطة (CS50P أو Exercism)'
        ]]
      ]
    }
  });

  // ---------------- Week 4 ----------------
  WEEKS.push({
    n:4, n8:'APIs بجد والتكرار', lg:'Python 2: قوائم ودوال وملفات',
    title:'APIs بجد + Python للبيانات',
    goal:'هتتعامل مع APIs بمفاتيح وحدود طلبات، وتكتب سكربت Python يقرا ملفات وJSON ويتعامل مع الأخطاء.',
    node:{name:'HTTP Request', mean:'بيكلّم أي API على الإنترنت — الباب لأي خدمة مالهاش نود جاهزة.', ex:'GET api.open-meteo.com/v1/forecast?latitude=30.04&longitude=31.24&current_weather=true', exAr:'طقس القاهرة الحالي، من غير مفتاح API.'},
    lang:{name:'Python 2: قوائم وقواميس ودوال وملفات', mean:'بعد الأسبوع ده تقدر تعالج بيانات JSON وCSV بكود بدل ما تعمل كل حاجة بإيدك.'},
    days:{
      sat:[
        ['Loop Over Items',[
          'افهم إن n8n بتمرّ تلقائيًا على كل item — إمتى تحتاج Loop صريح؟ (دفعات، أو حدود طلبات)',
          'جرّب Loop Over Items بـ Batch Size = 2 على 6 items وشوف مسار loop ومسار done'
        ]],
        ['Python: قوائم',[
          '`list`: `append` و`remove` و`pop` و`len` وslicing و`sort`',
          'حلقة `for` على قايمة وقارنها بـ list comprehension بسيط'
        ]]
      ],
      sun:[
        ['Wait وحدود الطلبات',[
          'ضيف Wait ثانية جوه الـ Loop قبل كل طلب',
          'اقرا عن خطأ 429 (Too Many Requests) وإزاي Wait وBatch Size بيحلوه',
          'جرّب Retry On Fail من إعدادات نود HTTP Request'
        ]],
        ['Python: قواميس',[
          '`dict`: `d["k"]` و`d.get("k", default)` و`.items()`',
          'اعمل قايمة من dicts (شبه JSON) وحلقة تطبع كل عنصر'
        ]]
      ],
      mon:[
        ['API بمفتاح',[
          'اعمل حساب مجاني على API بيحتاج مفتاح (زي OpenWeatherMap) وخُد الـ API Key',
          'استخدم Credential من نوع Header Auth أو Query Auth بدل ما تكتب المفتاح في الـ URL',
          'جرّب Import cURL: الصق أمر curl من التوثيق وسيب n8n يملا النود'
        ]],
        ['Python: دوال',[
          '`def` و`return` وparameters وقيم افتراضية',
          'اكتب دالة `clean_email(email)` ودالة تحسب مجموع قايمة'
        ]]
      ],
      tue:[
        ['POST وJSON Body',[
          'ابعت POST لـ `https://jsonplaceholder.typicode.com/posts` بـ JSON Body فيه `title` و`body`',
          'خلّي قيم الـ Body جاية بـ Expressions من نود قبلها',
          'افتح الرد وشوف الـ `id` اللي رجع (الـ API وهمي، بس بيرد فعلاً)'
        ]],
        ['Python: ملفات',[
          '`with open("f.txt", "w", encoding="utf-8") as f:` للكتابة، و`"r"` للقراءة',
          'اكتب سكربت يقرا ملف نصي سطر سطر ويعدّ الكلمات'
        ]]
      ],
      wed:[
        ['Pagination',[
          'جرّب API بيرجع صفحات: `/posts?_page=1&_limit=10`',
          'من Options في HTTP Request فعّل Pagination (Update a Parameter in Each Request)',
          'اجمع كل الصفحات في Workflow واحد وعدّ الـ items'
        ]],
        ['Python: JSON',[
          '`import json` ثم `json.load(f)` و`json.dump(data, f, indent=2, ensure_ascii=False)`',
          'اقرا ملف الـ Workflow اللي صدّرته من n8n واطبع أسماء النودات (المفتاح `nodes` وجواه `name`)'
        ]]
      ],
      thu:[
        ['Sub-workflows',[
          'اعمل Workflow صغير يبدأ بـ Execute Workflow Trigger (مثلاً بينضّف رقم تليفون)',
          'نادي عليه من Workflow تاني بنود Execute Workflow',
          'افهم إمتى تقسّم Workflow كبير لأجزاء'
        ]],
        ['Python: try / except',[
          '`try` و`except ValueError` و`finally` و`raise`',
          'اكتب دالة بتحوّل نص لرقم وترجّع 0 لو الإدخال غلط'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: Schedule الساعة 8 الصبح ← Open-Meteo لـ 3 مدن ← سطر لكل مدينة في Sheet ← ملخص على Telegram (اكتبه بالإنجليزي)'
        ]],
        ['مشروع Python',[
          'سكربت بيقرا CSV فيه (اسم، مبلغ)، يجمع المبلغ لكل اسم في dict، ويكتب النتيجة في ملف JSON',
          'ارفعه على GitHub مع README قصير'
        ]]
      ]
    }
  });

  // ---------------- Week 5 ----------------
  WEEKS.push({
    n:5, n8:'نود Code وتحويل البيانات', lg:'JavaScript 1',
    title:'نود Code + أساسيات JavaScript',
    goal:'نود Code هي الحل لأي حاجة مفيش لها نود جاهزة، واللغة اللي بتشتغل بيها JavaScript. هتتعلم الاتنين مع بعض.',
    node:{name:'Code', mean:'بتكتب فيها JavaScript بنفسك لما النودات الجاهزة متكفيش.', ex:'return $input.all().filter(i => i.json.age >= 18);', exAr:'بترجّع بس الـ items اللي عمرها 18 أو أكتر.'},
    lang:{name:'JavaScript 1: الأساسيات', mean:'نفس اللغة اللي جوه نود Code والـ Expressions، وكمان أساس أي شغل ويب.'},
    days:{
      sat:[
        ['نود Code: المفهوم',[
          'افتح نود Code واقرا الأمثلة اللي فيها',
          'الفرق بين Run Once for All Items (بتستخدم `$input.all()`) وRun Once for Each Item (بتستخدم `$json`)',
          'ارجع دايمًا items بشكل `[{ json: {...} }]`'
        ]],
        ['JS: متغيرات وأنواع',[
          '`const` و`let` (وابعد عن `var`)، والأنواع: string وnumber وboolean وnull وundefined',
          'جرّب في Console المتصفح (F12) وتأكد من النواتج',
          'Template literals: نص بين علامتي backtick وجواه `${name}`'
        ]]
      ],
      sun:[
        ['قراءة وكتابة بيانات في Code',[
          'استخدم `$input.first().json` لأول item، و`$input.all()` لكلهم',
          'ارجع items جديدة فيها حقول محسوبة',
          'استخدم `console.log` وافتح Console المتصفح (F12) وشوف الناتج'
        ]],
        ['JS: دوال',[
          '`function f(a){ return a * 2; }` و`const f = (a) => a * 2`',
          'اكتب دالة تحسب الضريبة، وافهم الفرق بين `return` و`console.log`'
        ]]
      ],
      mon:[
        ['Group by بالكود',[
          'اعمل Code بيجمّع الـ users حسب `address.city` ويرجّع عدد كل مدينة',
          'قارنه بنود Summarize وشوف أنهي أبسط'
        ]],
        ['JS: Arrays',[
          '`push` و`length` و`slice` و`includes` و`join`',
          '`for...of` على مصفوفة، واقرا `[1,2,3].map(x => x * 2)`'
        ]]
      ],
      tue:[
        ['Date & Time',[
          'نود Date & Time: format وadd وsubtract',
          'Luxon في Expressions: `{{ $now.plus({ days: 7 }).toFormat("yyyy-MM-dd") }}`',
          'اعمل حقل `dueDate` بعد 7 أيام من النهارده'
        ]],
        ['JS: map وfilter وreduce',[
          '`map` بتحوّل، `filter` بتفلتر، `reduce` بتجمّع',
          'نفّذ التلاتة على مصفوفة أسعار، ولاحظ إن `$input.all().map(...)` نفس الفكرة'
        ]]
      ],
      wed:[
        ['Split Out وAggregate',[
          'Split Out بيفتح array جوه item لـ items منفصلة',
          'Aggregate بيعمل العكس — جرّب الاتنين على حقل `tags`'
        ]],
        ['JS: Objects',[
          '`obj.key` و`obj["key"]`، وdestructuring `const { name, age } = user`',
          'spread: `{ ...a, b: 1 }` وoptional chaining: `user?.address?.city`'
        ]]
      ],
      thu:[
        ['الإشارة لنودات تانية',[
          '`$("اسم النود").all()` و`.first()` و`.item` لقراءة بيانات نود قبلها',
          'اعمل Workflow بيقارن بيانات من نودين مختلفين'
        ]],
        ['JS: JSON وDates',[
          '`JSON.parse` و`JSON.stringify(obj, null, 2)`',
          '`new Date()` و`toISOString()`، والفرق بين `==` و`===`'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: من `/users` اعمل Code node يطلّع لكل مدينة عدد المستخدمين ويرتبهم من الأكتر للأقل'
        ]],
        ['مراجعة اللغة',[
          'اكتب 3 دوال صغيرة وشغّلها في Code node بدل Console',
          'اكتب شرح كود الـ Code node بتاعك في تعليقات إنجليزي'
        ]]
      ]
    }
  });

  // ---------------- Week 6 ----------------
  WEEKS.push({
    n:6, n8:'تنظيف ومعالجة البيانات', lg:'JavaScript 2 + Regex',
    title:'معالجة البيانات + Regex',
    goal:'البيانات الحقيقية دايمًا وسخة. هتتعلم تنضّفها وتجمّعها وتقارنها، وتستخدم Regex تمسك الأنماط.',
    node:{name:'Summarize', mean:'بيحسب مجموع وعدد ومتوسط مع تجميع حسب حقل (زي pivot).', ex:'Field: amount · Sum · Group by: city', exAr:'مجموع المبالغ لكل مدينة.'},
    lang:{name:'JavaScript 2 + Regex', mean:'Regex بتمسك أرقام التليفونات والإيميلات والتواريخ من أي نص، وبتشتغل في n8n وJS وPython.'},
    days:{
      sat:[
        ['تنظيف النصوص',[
          'في Edit Fields استخدم Expressions: `trim()` و`toLowerCase()` و`replace()`',
          'وحّد شكل أرقام التليفون وشيل الرموز الزيادة'
        ]],
        ['JS: Strings',[
          '`split` و`join` و`trim` و`replace` و`slice` و`startsWith`',
          'اكتب دالة `slugify("Hello World")` بترجّع `hello-world`'
        ]]
      ],
      sun:[
        ['Regex في n8n',[
          'في IF جرّب شرط matches regex',
          'في Expression: `{{ $json.text.match(/\\d+/g) }}` بتجيب كل الأرقام',
          'استخرج رقم فاتورة من نص حر'
        ]],
        ['Regex: الأساسيات',[
          'افتح regex101.com وجرّب: `\\d` و`\\w` و`\\s` و`.` و`+` و`*` و`?` و`^` و`$`',
          'اكتب نمط موبايل مصري: `01[0125]\\d{8}`'
        ]]
      ],
      mon:[
        ['Summarize وSort',[
          'Summarize: عدّ ومجموع ومتوسط مع Group By',
          'رتّب النتيجة بـ Sort من الأكبر للأصغر',
          'قارن مع Code الأسبوع اللي فات'
        ]],
        ['Regex: Groups وFlags',[
          'الأقواس `()` للـ groups و`|` لـ أو، والـ flags: `g` و`i`',
          'اكتب نمط إيميل بسيط `[\\w.+-]+@[\\w-]+\\.[\\w.]+` واستخرج الدومين بـ group'
        ]]
      ],
      tue:[
        ['Compare Datasets',[
          'نود Compare Datasets بتقارن مصدرين وتفرّق بين: موجود في A بس، موجود في B بس، متطابق، مختلف',
          'قارن نسختين من نفس الشيت'
        ]],
        ['Regex في JS وPython',[
          'JS: `str.match(/re/g)` و`re.test(str)`',
          'Python: `import re` ثم `re.findall(r"\\d+", text)` و`re.sub`',
          'اكتب نفس النمط في اللغتين وقارن'
        ]]
      ],
      wed:[
        ['Merge المتقدم',[
          'أوضاع Merge: Append وCombine by Matching Fields (زي join) وCombine by Position',
          'اعمل join بين users وposts على `userId`'
        ]],
        ['JS: ترتيب وبحث',[
          '`sort((a, b) => a.x - b.x)` و`find` و`some` و`every`',
          '`Object.keys` و`Object.entries`'
        ]]
      ],
      thu:[
        ['مشروع: منظّف بيانات',[
          'Workflow: Sheet فيه بيانات وسخة ← تنظيف (Regex وtrim) ← تجميع ← تقرير Telegram',
          'ثبّت بيانات تجريبية (Pin Data) عشان تختبر براحتك'
        ]],
        ['JS: try/catch وthrow',[
          '`try { } catch (e) { }`',
          'في Code: `throw new Error("email is required")` بيوقف الـ Workflow برسالة واضحة'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: من نص فيه 5 أرقام تليفون مكتوبة بأشكال مختلفة، طلّعهم كلهم بشكل موحّد'
        ]],
        ['مراجعة اللغة',[
          'اكتب 5 أنماط Regex من الذاكرة (رقم، موبايل، إيميل، رابط، تاريخ)',
          'راجع أخطاء JavaScript في قسم الأخطاء'
        ]]
      ]
    }
  });

  // ---------------- Week 7 ----------------
  WEEKS.push({
    n:7, n8:'ملفات وHTML وScraping', lg:'HTML/CSS + Python 3',
    title:'الملفات وسحب البيانات من الويب',
    goal:'هتتعامل مع ملفات CSV وExcel وPDF، وتسحب بيانات من صفحات ويب بـ n8n وبـ Python.',
    node:{name:'HTML', mean:'بيستخرج محتوى من صفحة HTML باستخدام CSS selectors.', ex:'Extract HTML Content · CSS Selector: span.text', exAr:'بيسحب كل نصوص الاقتباسات من الصفحة.'},
    lang:{name:'HTML/CSS + Python 3', mean:'لازم تفهم هيكل الصفحة (HTML) والـ selectors عشان تسحب منها، وPython بتديك تحكم أكتر.'},
    days:{
      sat:[
        ['قراءة الملفات',[
          'Extract From File: CSV وXLSX وPDF',
          'افهم إن الملفات في n8n بتتنقل كـ binary data مش كنص',
          'ارفع ملف CSV صغير واقراه في Workflow'
        ]],
        ['HTML: الأساسيات',[
          'tags: `h1` و`p` و`a` و`img` و`ul` و`li` و`div` و`span` و`table`',
          'attributes: `id` و`class` و`href`',
          'اكتب صفحة بسيطة وافتحها في المتصفح'
        ]]
      ],
      sun:[
        ['Convert to File',[
          'Convert to File: من JSON لـ CSV أو XLSX',
          'ابعت الملف كمرفق في Gmail'
        ]],
        ['CSS selectors',[
          '`tag` و`.class` و`#id` و`parent > child` و`[attr=value]`',
          'في DevTools (Ctrl+Shift+C) اختار عنصر واعمل Copy selector',
          'تدرب على لعبة CSS Diner (flukeout.github.io)'
        ]]
      ],
      mon:[
        ['تحميل صفحة أو ملف',[
          'HTTP Request بـ Response Format = File لتحميل ملف',
          'حمّل صفحة HTML كنص وشوف شكلها'
        ]],
        ['HTML في الإيميل',[
          'في Gmail node اختار Email Type = HTML',
          'اعمل جدول بسيط وزرار رابط بـ inline styles'
        ]]
      ],
      tue:[
        ['نود HTML',[
          'Extract HTML Content بـ CSS selectors على `quotes.toscrape.com` (موقع تدريب مخصص)',
          'اسحب النصوص والمؤلفين كحقول منفصلة'
        ]],
        ['Python: requests',[
          '`pip install requests` ثم `requests.get(url, params=..., timeout=10)`',
          '`r.status_code` و`r.json()` و`r.raise_for_status()`'
        ]]
      ],
      wed:[
        ['Scraping بأدب',[
          'اقرا `robots.txt` وشروط استخدام أي موقع قبل السحب',
          'حط Wait بين الطلبات، وفعّل Pagination للصفحات المتعددة'
        ]],
        ['Python: BeautifulSoup',[
          '`pip install beautifulsoup4` ثم `soup.select("div.quote span.text")`',
          'اسحب نفس البيانات وقارن النتيجة مع نود HTML'
        ]]
      ],
      thu:[
        ['مشروع: Scraper',[
          'Schedule ← HTTP Request ← HTML ← Google Sheet ← Telegram',
          'خلّي الـ Workflow يتجاهل الاقتباسات المكررة (Remove Duplicates)'
        ]],
        ['Python: CSV وpandas',[
          '`csv.DictWriter` لكتابة CSV',
          '`pip install pandas openpyxl` ثم `pd.read_csv` و`df.head()` و`df.to_excel`'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: سحب اقتباسات 3 صفحات وحفظها في Sheet مع العدد الكلي'
        ]],
        ['مراجعة اللغة',[
          'قارن نفس الـ scraping في n8n وPython: امتى تستخدم كل واحد؟',
          'اكتب النتيجة في 3 جمل إنجليزي'
        ]]
      ]
    }
  });

  // ---------------- Week 8 ----------------
  WEEKS.push({
    n:8, n8:'قواعد البيانات', lg:'SQL',
    title:'قواعد البيانات و SQL',
    goal:'Sheets مش كفاية لما البيانات تكبر. هتتعلم SQL وتربط n8n بقاعدة بيانات حقيقية.',
    node:{name:'Postgres', mean:'بيتصل بقاعدة PostgreSQL وينفّذ استعلامات وعمليات إضافة وتعديل.', ex:'SELECT city, COUNT(*) FROM customers GROUP BY city;', exAr:'عدد العملاء في كل مدينة.'},
    lang:{name:'SQL', mean:'لغة الاستعلام عن البيانات. أساسية لأي شغل أتمتة فيه داتا.'},
    days:{
      sat:[
        ['إعداد قاعدة بيانات',[
          'اعمل قاعدة Postgres مجانية على Supabase أو Neon',
          'اعمل Credential في n8n بمعلومات الاتصال (host وdatabase وuser وpassword)'
        ]],
        ['SQL: SELECT',[
          'sqlbolt.com الدروس 1–4: `SELECT` و`FROM` و`WHERE` و`ORDER BY` و`LIMIT`',
          'اكتب 5 استعلامات على جدول تدريب'
        ]]
      ],
      sun:[
        ['Postgres: قراءة',[
          'نود Postgres ← Select وتنفيذ Execute Query',
          'جيب بيانات جدول وحوّلها لـ items'
        ]],
        ['SQL: تجميع',[
          '`GROUP BY` و`COUNT` و`SUM` و`AVG` و`HAVING`',
          'احسب عدد العملاء لكل مدينة'
        ]]
      ],
      mon:[
        ['Postgres: إضافة وتعديل',[
          'Insert وInsert or Update وUpdate وDelete',
          'ضيف صفوف من Edit Fields لجدول'
        ]],
        ['SQL: JOIN',[
          '`INNER JOIN` و`LEFT JOIN`، وارسم جدولين على ورقة وحدد الرابط بينهم',
          'اكتب استعلام يجيب اسم العميل مع كل طلب'
        ]]
      ],
      tue:[
        ['Sheet ← قاعدة بيانات',[
          'انقل صفوف Google Sheet لجدول في Postgres',
          'تعامل مع القيم الفاضية والتواريخ'
        ]],
        ['SQL: INSERT وUPDATE وDELETE',[
          '`INSERT INTO ... VALUES` و`UPDATE ... SET ... WHERE` و`DELETE ... WHERE`',
          'قاعدة ذهبية: اكتب `WHERE` قبل أي تعديل أو حذف'
        ]]
      ],
      wed:[
        ['أمان الاستعلامات',[
          'استخدم Query Parameters (`$1` و`$2`) بدل لصق القيم في نص SQL',
          'افهم ليه ده بيمنع SQL Injection'
        ]],
        ['SQL: تصميم الجداول',[
          '`CREATE TABLE` وأنواع البيانات و`PRIMARY KEY` و`FOREIGN KEY` و`NOT NULL` و`UNIQUE`',
          'صمم جدولين `customers` و`orders`'
        ]]
      ],
      thu:[
        ['مشروع: تقرير من DB',[
          'Schedule ← استعلام تجميع ← رسالة Telegram بملخص المبيعات',
          'خلّي الـ Workflow يسجّل نتيجة كل تشغيلة في جدول Log'
        ]],
        ['SQL: تمرين',[
          'اكتب 5 استعلامات على `customers` و`orders`',
          'جرّب استعلام بتواريخ: آخر 7 أيام'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: Workflow كامل بيسحب من API ← بيخزّن في Postgres ← بيطلّع تقرير'
        ]],
        ['مراجعة اللغة',[
          'اكتب من الذاكرة: SELECT بـ JOIN وGROUP BY',
          'راجع أخطاء SQL في قسم الأخطاء'
        ]]
      ]
    }
  });

  // ---------------- Week 9 ----------------
  WEEKS.push({
    n:9, n8:'الأخطاء والموثوقية', lg:'Python 4: كود منظّم',
    title:'الأخطاء والموثوقية',
    goal:'الـ Workflow اللي بيشتغل مرة مش كفاية. هتخليه يتحمل الأعطال ويبلّغك، وتنظّم كود Python بشكل احترافي.',
    node:{name:'Error Trigger', mean:'بيشغّل Workflow لما Workflow تاني يفشل — جرس الإنذار بتاعك.', ex:'{{ $json.workflow.name }} failed: {{ $json.execution.error.message }}', exAr:'رسالة التنبيه اللي هتوصلك على تيليجرام.'},
    lang:{name:'Python 4: بيئات وتنظيم واختبار', mean:'venv وlogging وpytest بيحوّلوا السكربت لكود تقدر تعتمد عليه.'},
    days:{
      sat:[
        ['Executions وDebugging',[
          'افتح تبويب Executions وقارن بين تشغيلة ناجحة وفاشلة',
          'على تشغيلة فاشلة جرّب Debug in editor عشان تعيد التجربة بنفس البيانات',
          'جرّب Pin Data على نود الـ API عشان تكمّل بناء من غير ما تكلّم الـ API كل مرة'
        ]],
        ['Python: venv',[
          '`python -m venv .venv` ثم `.\\.venv\\Scripts\\Activate.ps1`',
          'لو PowerShell منع التفعيل: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`',
          '`pip install requests` ثم `pip freeze > requirements.txt`'
        ]]
      ],
      sun:[
        ['الخطأ على مستوى النود',[
          'في Settings بتاعة النود: On Error ← جرّب Stop Workflow وContinue وContinue (using error output)',
          'فعّل Retry On Fail (3 محاولات) على نود بيكلّم خدمة خارجية',
          'وجّه مسار الـ error output لصفحة Sheet اسمها Failures'
        ]],
        ['Python: Modules',[
          'قسّم السكربت لملفين واستخدم `import`',
          'افهم `if __name__ == "__main__":` وليه بنكتبها'
        ]]
      ],
      mon:[
        ['Error Trigger',[
          'اعمل Workflow جديد بـ Error Trigger ← Telegram بيبعتلك اسم الـ Workflow ورسالة الخطأ',
          'من Settings بتاعة أي Workflow اختار Error Workflow ده',
          'خلّي Workflow يفشل عمدًا (URL غلط) وتأكد إن التنبيه وصلك'
        ]],
        ['Python: logging',[
          '`import logging` و`logging.basicConfig(level=logging.INFO)`',
          '`logging.info` و`warning` و`error` بدل `print`'
        ]]
      ],
      tue:[
        ['Validation وStop and Error',[
          'قبل أي عملية مهمة حط IF بيتأكد إن `email` موجود وشكله صحيح',
          'لو لأ ← Stop and Error برسالة واضحة بالإنجليزي',
          'جرّب 5 مدخلات مختلفة (فاضي، مسافات، إيميل غلط…)'
        ]],
        ['Python: أنواع الأخطاء',[
          '`ValueError` و`KeyError` و`FileNotFoundError` و`requests.RequestException`',
          'اكتب retry بسيط: 3 محاولات مع `time.sleep(2)`'
        ]]
      ],
      wed:[
        ['إعدادات الـ Workflow',[
          'Workflow Settings: Error Workflow وTimeout وSave successful/failed executions',
          'اعرف قد إيه بتخزّن الـ Executions وليه ده مهم للأداء'
        ]],
        ['Python: اختبار بسيط',[
          '`assert clean_email(" A@x.com ") == "a@x.com"`',
          '`pip install pytest` واكتب 3 tests وشغّلهم بـ `pytest`'
        ]]
      ],
      thu:[
        ['الأمان',[
          'راجع إن مفيش API key مكتوب جوه نود أو Code — كله في Credentials',
          'أمّن الـ Webhook بـ Authentication (Header Auth أو Basic Auth)',
          'قبل ما تشارك ملف JSON راجعه: اتأكد مفيهوش روابط Webhook أو بيانات شخصية'
        ]],
        ['Python: الأسرار',[
          '`os.environ.get("API_KEY")` بدل كتابة المفتاح في الكود',
          '`pip install python-dotenv` وملف `.env` (واتأكد إنه في `.gitignore`)'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: خد Workflow الطقس من الأسبوع 4 وضيف له Retry وError Workflow وتحقق من البيانات'
        ]],
        ['مراجعة اللغة',[
          'حوّل سكربت Python القديم لكود منظّم: دوال وlogging وtests',
          'اشرح في 3 جمل إنجليزي إيه اللي بيحصل لو الـ API وقع'
        ]]
      ]
    }
  });

  // ---------------- Week 10 ----------------
  WEEKS.push({
    n:10, n8:'النشر والاستضافة', lg:'Docker وYAML وLinux',
    title:'تشغيل n8n فعليًا 24 ساعة',
    goal:'n8n على جهازك بيقف لما تقفله. هتتعلم Docker وتفهم الاستضافة، عشان الـ Workflows تشتغل طول الوقت.',
    node:{name:'Webhook (Production)', mean:'الـ Webhook بيشتغل فعليًا بس لما n8n نفسه شغال ومتاح من الإنترنت.', ex:'WEBHOOK_URL=https://n8n.example.com/', exAr:'متغيّر بيقول لـ n8n عنوانه العام.'},
    lang:{name:'Docker + YAML + Linux/Bash', mean:'أغلب استضافة n8n الجدية بتتم بـ Docker على سيرفر لينكس.'},
    days:{
      sat:[
        ['خيارات النشر',[
          'اقرا خيارات الاستضافة: n8n Cloud، أو VPS + Docker، أو جهازك',
          'اكتب ملاحظة: أنهي خيار يناسب مشروعك وليه (السعر، التحكم، الصيانة)'
        ]],
        ['YAML',[
          'قواعد YAML: مسافات مش tabs، `key: value`، القوائم بـ `-`، والتعليقات بـ `#`',
          'حوّل JSON صغير لـ YAML وارجع'
        ]]
      ],
      sun:[
        ['n8n بـ Docker',[
          'نزّل Docker Desktop وشغّله',
          'شغّل: `docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`',
          'تأكد إن الـ Workflows بتفضل موجودة بعد إعادة التشغيل (بسبب الـ volume)'
        ]],
        ['Docker: المفاهيم',[
          'الفرق بين image وcontainer وvolume',
          '`docker ps` و`docker images` و`docker logs` و`docker stop`، وجرّب `docker run hello-world`'
        ]]
      ],
      mon:[
        ['docker-compose',[
          'اعمل `docker-compose.yml` لـ n8n (الصورة والمنفذ والـ volume)',
          'شغّله بـ `docker compose up -d` وراقبه بـ `docker compose logs -f`'
        ]],
        ['Docker Compose',[
          'اقرا `services` و`image` و`ports` و`volumes` و`environment`',
          'وقّف بـ `docker compose down` وارجع شغّل وتأكد إن البيانات لسه موجودة'
        ]]
      ],
      tue:[
        ['متغيرات البيئة في n8n',[
          'ضبط المنطقة الزمنية: `GENERIC_TIMEZONE` و`TZ`',
          '`WEBHOOK_URL` و`N8N_ENCRYPTION_KEY` — خد نسخة من مفتاح التشفير وخزّنها في مكان آمن',
          'راجع توثيق environment variables في docs.n8n.io'
        ]],
        ['Linux / Bash',[
          '`ls` و`cd` و`pwd` و`mkdir` و`rm` و`cp` و`mv` و`cat` و`nano`',
          'جرّبهم في WSL أو أي سيرفر تجريبي'
        ]]
      ],
      wed:[
        ['Webhook من الإنترنت',[
          'افهم ليه Production Webhook محتاج عنوان عام وHTTPS',
          'جرّب Cloudflare Tunnel أو ngrok للتجربة'
        ]],
        ['SSH',[
          '`ssh user@server_ip` للدخول لسيرفر',
          '`ssh-keygen` لعمل مفاتيح، وفكرة الـ public والـ private key'
        ]]
      ],
      thu:[
        ['Backup وتحديث',[
          'صدّر الـ Workflows، وخد نسخة من الـ volume ومن مفتاح التشفير',
          'اقرا إزاي تحدّث n8n (سحب صورة جديدة) وإزاي ترجع لو حصلت مشكلة'
        ]],
        ['Bash script وcron',[
          'اكتب `backup.sh` بسيط بيعمل نسخة احتياطية بتاريخ اليوم',
          'افهم صيغة cron: `0 8 * * *` (نفس فكرة Schedule Trigger)'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: شغّل n8n بـ docker compose واستورد فيه أحد الـ Workflows بتاعتك وتأكد إنه شغال'
        ]],
        ['مراجعة اللغة',[
          'اكتب `docker-compose.yml` من الذاكرة',
          'اكتب README بالإنجليزي بيشرح خطوات تشغيل n8n بـ Docker'
        ]]
      ]
    }
  });

  // ---------------- Week 11 ----------------
  WEEKS.push({
    n:11, n8:'Python والذكاء الاصطناعي مع n8n', lg:'Python 5: FastAPI + AI',
    title:'ربط Python والذكاء الاصطناعي بـ n8n',
    goal:'n8n بيدير الشغل، وPython بتعمل اللي مفيش له نود، والذكاء الاصطناعي بيفهم النص. هتربط التلاتة.',
    node:{name:'AI Agent', mean:'بيدّي الـ Workflow مخ بيفهم النص ويقرر ويستخدم أدوات. للتصنيف البسيط استخدم Basic LLM Chain.', ex:'Classify this message: complaint / question / request', exAr:'أمر تصنيف بسيط.'},
    lang:{name:'Python 5: FastAPI + AI + Prompting', mean:'بتبني خدمة Python صغيرة بتكلمها n8n، وتتعلم تكتب تعليمات (Prompts) للنماذج.'},
    days:{
      sat:[
        ['Python جوه n8n: الخيارات',[
          'الخيارات: (1) Code node بلغة Python لو متاحة في إصدارك، (2) خدمة FastAPI صغيرة تناديها بـ HTTP Request، (3) Execute Command على self-hosted (بيكون متعطّل افتراضيًا في الإصدارات الأحدث)',
          'اقرا توثيق Code node وشوف المتاح عندك فعلاً'
        ]],
        ['FastAPI',[
          '`pip install fastapi uvicorn`',
          'اعمل `app.py` فيه `@app.get("/ping")` وشغّله بـ `uvicorn app:app --reload` وافتح `/docs`'
        ]]
      ],
      sun:[
        ['n8n ينادي Python API',[
          'HTTP Request POST على `http://localhost:8000/clean`',
          'لو n8n جوه Docker استخدم `host.docker.internal` بدل `localhost`'
        ]],
        ['FastAPI: POST',[
          '`class Item(BaseModel)` بـ `pydantic`',
          '`@app.post("/clean")` بتاخد email وترجّعه منظّف'
        ]]
      ],
      mon:[
        ['Python ينادي n8n',[
          'سكربت Python بيبعت POST لـ Webhook في n8n باستخدام `requests`',
          'اعرض البيانات اللي وصلت في الـ Execution'
        ]],
        ['Python يكلم Claude API',[
          '`pip install anthropic` والمفتاح من `os.environ`',
          '`client.messages.create(model=..., max_tokens=..., messages=[...])` واسم الموديل خده من توثيق Anthropic'
        ]]
      ],
      tue:[
        ['Basic LLM Chain',[
          'أضف Chat Model (Anthropic أو OpenAI) وBasic LLM Chain',
          'كلّفه يصنّف رسالة: شكوى / استفسار / طلب',
          'جرّب Structured Output Parser عشان الرد يبقى JSON منظم'
        ]],
        ['Prompting: الأساسيات',[
          'عناصر الـ Prompt: الدور والمهمة والصيغة المطلوبة وأمثلة',
          'اكتب Prompt تصنيف واختبره على 10 رسائل'
        ]]
      ],
      wed:[
        ['AI Agent وTools',[
          'AI Agent مع Tool (زي HTTP Request Tool أو Calculator)',
          'أضف Simple Memory (كان اسمها Window Buffer Memory) وشوف الفرق'
        ]],
        ['JSON من النموذج',[
          'اطلب من النموذج JSON بس، وحلله بأمان بـ `try/except`',
          'اتحقق من الحقول قبل ما تكمّل'
        ]]
      ],
      thu:[
        ['AI + Sheets',[
          'Workflow: صف جديد في Sheet ← AI بيلخّص ويصنّف ← يكتب النتيجة في عمود جنبه',
          'حط حد أقصى لعدد الطلبات عشان تتحكم في التكلفة'
        ]],
        ['مشروع: Python API صغيرة',[
          'API فيها endpoint واحد ينضّف بيانات، وn8n Workflow بيناديه',
          'ارفعهم على GitHub مع README'
        ]]
      ],
      fri:[
        ['مراجعة وتحدي',[
          REVIEW,
          'تحدي: بوت يستقبل رسالة Telegram ← AI يصنّفها ← يسجّلها في Sheet ← يرد على المرسل'
        ]],
        ['مراجعة اللغة',[
          'راجع الفرق بين Code node وPython API وAI: امتى تستخدم أنهي؟',
          'اكتبها في جدول قصير في README'
        ]]
      ]
    }
  });

  // ---------------- Week 12 ----------------
  WEEKS.push({
    n:12, n8:'المشروع الختامي', lg:'Markdown وGit وتجهيز الشغل',
    title:'المشروع الختامي وتجهيزه للشغل',
    goal:'هتبني المشروع كامل وتوثّقه بالإنجليزي وترفعه على GitHub، وتحوّله لعرض تقدمه لعميل أو شركة.',
    node:{name:'Google Sheets Trigger', mean:'بيبدأ الـ Workflow لما صف جديد يتضاف في الشيت.', ex:'Event: Row Added · Poll: Every Minute', exAr:'أساس المشروع الختامي.'},
    lang:{name:'Markdown + Git + الإنجليزي التقني', mean:'README كويس وcommit history نضيف هما اللي بيقنعوا صاحب الشغل إنك محترف.'},
    days:{
      sat:[
        ['تخطيط',[
          'ارسم الـ flow على ورقة: Form ← Sheet ← Sheets Trigger ← تنظيف ← سجل ← إشعار',
          'Google Forms مالوش Trigger مباشر في n8n، فاستخدم Google Sheets Trigger على شيت الردود',
          'حدد النود المستخدم في كل خطوة ومدخلاته ومخرجاته'
        ]],
        ['Markdown',[
          'عناوين وقوايم وروابط وكتل كود وجداول',
          'اكتب README تجريبي وشوفه على GitHub'
        ]]
      ],
      sun:[
        ['بناء (1)',[
          'اعمل Google Form (الاسم، الإيميل، نوع الطلب، الرسالة) واربطه بشيت ردود',
          'ابني Google Sheets Trigger (Row Added) وتأكد إن رد تجريبي بيوصل',
          'ثبّت الـ Output (Pin Data) عشان تكمّل بناء براحتك'
        ]],
        ['README احترافي',[
          'الهيكل: What it does / Why / How it works / Setup / Screenshots',
          'اكتب المسودة الأولى بالإنجليزي'
        ]]
      ],
      mon:[
        ['بناء (2)',[
          'Edit Fields أو Code: نضّف البيانات (الاسم بدون مسافات زيادة، الإيميل lowercase، وقت الاستلام)',
          'Append Row في شيت Log أو جدول في قاعدة بيانات',
          'إشعار Telegram أو Gmail فيه ملخص الطلب'
        ]],
        ['Git: تاريخ نضيف',[
          'commit messages واضحة بالإنجليزي: `Add`, `Fix`, `Update`',
          'اعمل tag: `git tag v1.0` وارفعه'
        ]]
      ],
      tue:[
        ['اختبار',[
          'جرّب 5 مدخلات: عادية، حقل فاضي، إيميل غلط، نص طويل جدًا، نص عربي',
          'ضيف تحقق (IF ← Stop and Error) وربط الـ Error Workflow',
          'فعّل الـ Workflow وسيبه يوم كامل، وراجع Executions'
        ]],
        ['مراجعة Python',[
          'حل 3 تمارين Python',
          'اقرا سكربتاتك القديمة وحسّن أسماء المتغيرات'
        ]]
      ],
      wed:[
        ['توثيق',[
          'سمّي كل نود باسم واضح (مثلاً Clean Email مش Edit Fields1) وضيف Sticky Notes',
          'صدّر JSON وخد Screenshot للـ canvas',
          'حدّث README بالصور'
        ]],
        ['مراجعة JS وSQL وRegex',[
          'حل تمرين في كل واحدة',
          'اكتب 3 نقاط: امتى استخدمت كل واحدة في مشاريعك'
        ]]
      ],
      thu:[
        ['حوّله لشغل',[
          'سجّل فيديو 2–3 دقايق يشرح المشروع (Loom أو OBS)',
          'ارفع JSON وREADME والصور على GitHub في repository `n8n-form-to-notification`',
          'اكتب «القصة» في 3 جمل: المشكلة ← الحل ← النتيجة'
        ]],
        ['بروفايلك',[
          'حدّث LinkedIn وGitHub بمشاريعك',
          'اكتب عرض (proposal) بالإنجليزي لمشروع أتمتة حقيقي على Upwork أو مستقل'
        ]]
      ],
      fri:[
        ['جسر للذكاء الاصطناعي',[
          'ضيف نود Basic LLM Chain يصنّف كل رد: شكوى / استفسار / طلب',
          'خلّي الإشعار يوضّح التصنيف عشان الشكاوى تبان',
          'راجع المشروع كله وعلّم اللي خلصته'
        ]],
        ['تقييم نفسك',[
          'راجع مصفوفة المهارات في قسم اللغات وعلّم اللي بقى ثابت',
          'اللي لسه ضعيف: حط له أسبوع مراجعة قبل ما تبدأ موضوع الشغل'
        ]]
      ]
    }
  });

  // ---------------- Language tracks + skills matrix ----------------
  var LVL = {must:'ضروري', imp:'مهم', nice:'مفيد'};
  var TRACKS = [
    {id:'js', name:'JavaScript', lvl:'must', weeks:'الأسابيع 5–6',
     why:'اللغة اللي جوه نود Code والـ Expressions في n8n نفسها. بدونها هتفضل محدود بالنودات الجاهزة.',
     skills:['بفرّق بين const وlet وبعرف الأنواع','بكتب دوال عادية وarrow functions','بستخدم map وfilter وreduce على المصفوفات','بستخدم destructuring وspread وoptional chaining','بتعامل مع JSON.parse وJSON.stringify','بكتب try/catch وthrow','بكتب Code node بيرجّع الشكل الصح [{ json }]']},
    {id:'json', name:'JSON وHTTP وcURL', lvl:'must', weeks:'الأسبوع 2 (وبيتكرر)',
     why:'كل API بيتكلم JSON فوق HTTP. لو فهمتهم مش هتتوه في أي خدمة جديدة.',
     skills:['بكتب JSON صحيح وبعرف أكتشف الخطأ فيه','بقرا مسار قيمة داخل JSON متداخل','بفرّق بين GET وPOST وبعرف الـ status codes الأساسية','بقرا headers وبعرف أبعت Authorization','بستخدم curl.exe وبستورد cURL في n8n']},
    {id:'python', name:'Python', lvl:'imp', weeks:'الأسابيع 3–4 و7 و9 و11',
     why:'لغة الأتمتة الأولى: سكربتات وملفات وAPIs وخدمات صغيرة بتكلمها n8n.',
     skills:['بشغّل سكربت من PowerShell','بستخدم f-strings ودوال النصوص','بتعامل مع القوائم والقواميس','بكتب دوال وبستخدمها','بقرا وبكتب ملفات نصية وJSON وCSV','بكتب try/except بشكل سليم','بستخدم requests وأعالج الأخطاء','بعمل venv وبستخدم pip وrequirements.txt','بعمل endpoint بسيط بـ FastAPI']},
    {id:'git', name:'Git وGitHub', lvl:'imp', weeks:'الأسبوع 1 و12',
     why:'بتحفظ شغلك وتشوف تاريخه وترجع لو غلطت، وGitHub هو البورتفوليو اللي هتعرضه.',
     skills:['بعمل init وadd وcommit','بعمل branch وبدمجه','برفع repo على GitHub بـ push','بكتب .gitignore وبمنع الأسرار من الرفع','بكتب commit messages واضحة بالإنجليزي']},
    {id:'sql', name:'SQL', lvl:'imp', weeks:'الأسبوع 8',
     why:'لما البيانات تكبر عن Sheet، بتحتاج قاعدة بيانات ولغة تسأل بيها.',
     skills:['SELECT وWHERE وORDER BY وLIMIT','GROUP BY وCOUNT وSUM','INNER JOIN وLEFT JOIN','INSERT وUPDATE وDELETE (ودايمًا WHERE)','CREATE TABLE ومفاتيح PRIMARY/FOREIGN','بستخدم Query Parameters في n8n بدل لصق القيم']},
    {id:'shell', name:'الطرفية (PowerShell/Bash) وSSH', lvl:'imp', weeks:'الأسبوع 1 و10',
     why:'بتشغّل بيها n8n وPython وGit، ولما تروح لسيرفر هتدخله بـ SSH.',
     skills:['بتنقّل بين الفولدرات وبنشئ ملفات','بشغّل أوامر Python وpip وGit','بفهم أوامر Linux الأساسية','بدخل سيرفر بـ SSH','بفهم صيغة cron']},
    {id:'docker', name:'Docker وYAML', lvl:'imp', weeks:'الأسبوع 10',
     why:'أغلب استضافة n8n الجدية بتتم بـ Docker، وYAML هو شكل ملفات إعداده.',
     skills:['بكتب YAML صح (مسافات، قوايم، تعليقات)','بشغّل n8n بـ docker run','بكتب docker-compose.yml وبشغّله','بفهم الـ volumes وليه هم مهمين','بعمل backup وبحفظ مفتاح التشفير']},
    {id:'regex', name:'Regex', lvl:'nice', weeks:'الأسبوع 6',
     why:'بتمسك أرقام التليفون والإيميلات والتواريخ من أي نص، وبتشتغل في n8n وJS وPython.',
     skills:['بستخدم \\d و\\w و\\s والمُكمّمات + * ? {}','بستخدم groups والـ flags','بكتب نمط موبايل وإيميل ورابط','بجرّب أنماطي على regex101 قبل ما أستخدمها']},
    {id:'html', name:'HTML وCSS selectors', lvl:'nice', weeks:'الأسبوع 7',
     why:'عشان تسحب بيانات من صفحات ويب وتكتب إيميلات HTML.',
     skills:['بقرا هيكل صفحة HTML','بكتب CSS selector وبجيبه من DevTools','بستخدم نود HTML لسحب بيانات','بكتب إيميل HTML بسيط']},
    {id:'md', name:'Markdown وكتابة README', lvl:'nice', weeks:'الأسبوع 1 و12',
     why:'التوثيق الكويس هو اللي بيبيّن إن مشروعك محترف.',
     skills:['بكتب عناوين وقوايم وكتل كود وروابط','بكتب README بالإنجليزي بهيكل كامل']},
    {id:'ai', name:'Prompting والذكاء الاصطناعي', lvl:'imp', weeks:'الأسبوع 11',
     why:'بتخلّي الـ Workflow يفهم النص ويصنّف ويلخّص.',
     skills:['بكتب Prompt فيه دور ومهمة وصيغة وأمثلة','بطلب رد JSON وبحلله بأمان','بستخدم Basic LLM Chain في n8n','بفهم الفرق بين Chain وAgent','بتحكم في التكلفة بحدود الطلبات']}
  ];

  // ---------------- Glossary ----------------
  var TERMS = [
    // n8n: أساسيات
    {c:'n8n أساسيات', w:1, t:'workflow', m:'سير عمل — سلسلة نودات بتنفّذ مهمة كاملة'},
    {c:'n8n أساسيات', w:1, t:'node', m:'نود — خطوة واحدة جوه الـ Workflow'},
    {c:'n8n أساسيات', w:1, t:'trigger', m:'محفّز — النود اللي بيبدأ تشغيل الـ Workflow'},
    {c:'n8n أساسيات', w:1, t:'connection', m:'وصلة بين نودين بتنقل البيانات'},
    {c:'n8n أساسيات', w:1, t:'canvas', m:'لوحة الرسم اللي بتبني عليها الـ Workflow'},
    {c:'n8n أساسيات', w:1, t:'execution', m:'تشغيلة — مرة تنفيذ واحدة، وليها سجل'},
    {c:'n8n أساسيات', w:1, t:'activate / publish', m:'تفعيل — بيخلّي الـ Workflow يشتغل لوحده'},
    {c:'n8n أساسيات', w:1, t:'test vs production', m:'وضع التجربة مقابل التشغيل الفعلي'},
    {c:'n8n أساسيات', w:1, t:'export / import', m:'تصدير / استيراد Workflow كملف JSON'},
    {c:'n8n أساسيات', w:3, t:'credentials', m:'بيانات الدخول المحفوظة مشفّرة'},
    {c:'n8n أساسيات', w:4, t:'template', m:'قالب — Workflow جاهز من مكتبة n8n'},
    {c:'n8n أساسيات', w:12, t:'sticky note', m:'ملاحظة لاصقة على الـ canvas للتوثيق'},
    // Triggers
    {c:'Triggers', w:1, t:'Manual Trigger', m:'بتضغط Execute بإيدك — للتجربة'},
    {c:'Triggers', w:1, t:'Schedule Trigger', m:'تشغيل على جدول زمني'},
    {c:'Triggers', w:1, t:'Webhook', m:'رابط بيستقبل طلبات ويشغّل الـ Workflow'},
    {c:'Triggers', w:3, t:'Google Sheets Trigger', m:'بيشتغل لما يتضاف صف جديد'},
    {c:'Triggers', w:3, t:'polling', m:'فحص دوري بيسأل «في جديد؟» — عكس الـ Webhook'},
    {c:'Triggers', w:3, t:'Telegram Trigger', m:'بيشتغل لما البوت يستقبل رسالة'},
    {c:'Triggers', w:9, t:'Error Trigger', m:'بيشتغل لما Workflow تاني يفشل'},
    // بيانات
    {c:'بيانات', w:1, t:'item', m:'عنصر — سجل واحد من البيانات'},
    {c:'بيانات', w:1, t:'field', m:'حقل جوه الـ item (زي name)'},
    {c:'بيانات', w:1, t:'expression', m:'تعبير بين {{ }} بيحسب قيمة ديناميكية'},
    {c:'بيانات', w:2, t:'key / value', m:'مفتاح / قيمة'},
    {c:'بيانات', w:2, t:'array / object', m:'مصفوفة (قايمة) / كائن (مجموعة حقول)'},
    {c:'بيانات', w:2, t:'nested', m:'متداخل — حاجة جوه حاجة'},
    {c:'بيانات', w:3, t:'mapping', m:'ربط أعمدة الشيت بحقول البيانات'},
    {c:'بيانات', w:7, t:'binary data', m:'ملفات (صور/PDF) بتتنقل كملف مش كنص'},
    {c:'بيانات', w:9, t:'pin data', m:'تثبيت بيانات تجريبية في نود'},
    // Nodes
    {c:'Nodes شائعة', w:1, t:'Edit Fields (Set)', m:'إضافة أو تعديل حقول'},
    {c:'Nodes شائعة', w:1, t:'Respond to Webhook', m:'بيرد على اللي كلّم الـ Webhook'},
    {c:'Nodes شائعة', w:2, t:'HTTP Request', m:'بيكلّم أي API'},
    {c:'Nodes شائعة', w:2, t:'IF', m:'شرط بيقسم المسار لـ true وfalse'},
    {c:'Nodes شائعة', w:2, t:'Filter', m:'بيكمّل بس بالـ items اللي بتحقق الشرط'},
    {c:'Nodes شائعة', w:2, t:'Switch', m:'بيوزّع الـ items على أكتر من مسار'},
    {c:'Nodes شائعة', w:2, t:'Merge', m:'دمج مسارين'},
    {c:'Nodes شائعة', w:2, t:'Sort / Limit', m:'ترتيب / تحديد عدد الـ items'},
    {c:'Nodes شائعة', w:2, t:'Remove Duplicates', m:'إزالة التكرار'},
    {c:'Nodes شائعة', w:2, t:'Aggregate', m:'تجميع عدة items في item واحد'},
    {c:'Nodes شائعة', w:3, t:'Append / Update Row', m:'إضافة صف / تعديل صف'},
    {c:'Nodes شائعة', w:4, t:'Loop Over Items', m:'المرور على الـ items على دفعات'},
    {c:'Nodes شائعة', w:4, t:'Wait', m:'إيقاف مؤقت في نص الـ Workflow'},
    {c:'Nodes شائعة', w:4, t:'Execute Workflow', m:'بينادي على Workflow تاني'},
    {c:'Nodes شائعة', w:5, t:'Code node', m:'نود بتكتب فيها JavaScript'},
    {c:'Nodes شائعة', w:5, t:'Split Out', m:'بيفتح array لـ items منفصلة'},
    {c:'Nodes شائعة', w:5, t:'Date & Time', m:'نود للتعامل مع التواريخ'},
    {c:'Nodes شائعة', w:6, t:'Summarize', m:'مجموع وعدد ومتوسط مع Group By'},
    {c:'Nodes شائعة', w:6, t:'Compare Datasets', m:'مقارنة مصدرين من البيانات'},
    {c:'Nodes شائعة', w:7, t:'Extract From File', m:'قراءة CSV/XLSX/PDF'},
    {c:'Nodes شائعة', w:7, t:'Convert to File', m:'تحويل items لملف'},
    {c:'Nodes شائعة', w:7, t:'HTML node', m:'استخراج بيانات من HTML بـ selectors'},
    {c:'Nodes شائعة', w:8, t:'Postgres node', m:'نود قاعدة بيانات PostgreSQL'},
    // API
    {c:'API وربط', w:2, t:'API', m:'واجهة بيتكلم بيها برنامج مع برنامج'},
    {c:'API وربط', w:2, t:'endpoint', m:'عنوان محدد في الـ API'},
    {c:'API وربط', w:2, t:'GET / POST', m:'طلب لجلب بيانات / لإرسال بيانات'},
    {c:'API وربط', w:2, t:'query parameter', m:'قيمة في آخر الرابط بعد ؟'},
    {c:'API وربط', w:2, t:'status code', m:'رمز حالة الرد (200، 404…)'},
    {c:'API وربط', w:3, t:'OAuth2', m:'تسجيل دخول آمن بيربط n8n بحسابك'},
    {c:'API وربط', w:3, t:'token', m:'رمز دخول'},
    {c:'API وربط', w:3, t:'Chat ID', m:'رقم محادثة تيليجرام'},
    {c:'API وربط', w:4, t:'API key', m:'مفتاح بيعرّفك للـ API'},
    {c:'API وربط', w:4, t:'header', m:'معلومات إضافية بتتبعت مع الطلب'},
    {c:'API وربط', w:4, t:'body', m:'محتوى الطلب (JSON) في POST'},
    {c:'API وربط', w:4, t:'rate limit', m:'حد أقصى لعدد الطلبات'},
    {c:'API وربط', w:4, t:'pagination', m:'تقسيم النتائج على صفحات'},
    {c:'API وربط', w:4, t:'cURL', m:'أمر لإرسال طلب — n8n بيستورده'},
    // أخطاء ونشر
    {c:'أخطاء ونشر', w:9, t:'Retry On Fail', m:'إعادة المحاولة تلقائيًا'},
    {c:'أخطاء ونشر', w:9, t:'On Error', m:'إعداد بيحدد إيه يحصل لو النود فشلت'},
    {c:'أخطاء ونشر', w:9, t:'Error Workflow', m:'Workflow بيتنفذ لما تاني يفشل'},
    {c:'أخطاء ونشر', w:9, t:'Stop and Error', m:'إيقاف متعمّد برسالة خطأ'},
    {c:'أخطاء ونشر', w:9, t:'Executions log', m:'سجل التشغيلات ونتايجها'},
    {c:'أخطاء ونشر', w:10, t:'self-hosted', m:'شغّال على جهازك أو سيرفرك'},
    {c:'أخطاء ونشر', w:10, t:'n8n Cloud', m:'النسخة المستضافة (مدفوعة بعد التجربة)'},
    {c:'أخطاء ونشر', w:10, t:'VPS', m:'سيرفر افتراضي مستأجر'},
    // Python
    {c:'Python', w:3, t:'variable', m:'متغيّر — اسم بيحمل قيمة'},
    {c:'Python', w:3, t:'string / int / float / bool', m:'نص / صحيح / عشري / منطقي'},
    {c:'Python', w:3, t:'f-string', m:'نص فيه متغيرات: f"Hi {name}"'},
    {c:'Python', w:3, t:'condition', m:'شرط (if / elif / else)'},
    {c:'Python', w:3, t:'loop', m:'حلقة تكرار (for / while)'},
    {c:'Python', w:4, t:'list', m:'قائمة مرتبة'},
    {c:'Python', w:4, t:'dictionary', m:'قاموس: مفتاح وقيمة'},
    {c:'Python', w:4, t:'function', m:'دالة — كود بتستدعيه بالاسم'},
    {c:'Python', w:4, t:'argument / parameter', m:'وسيط / مُعامل'},
    {c:'Python', w:4, t:'return', m:'إرجاع قيمة من دالة'},
    {c:'Python', w:4, t:'exception', m:'استثناء — خطأ وقت التشغيل'},
    {c:'Python', w:4, t:'try / except', m:'حاول، ولو حصل خطأ نفّذ البديل'},
    {c:'Python', w:7, t:'library / package', m:'مكتبة / حزمة جاهزة'},
    {c:'Python', w:7, t:'pip', m:'أداة تثبيت حزم Python'},
    {c:'Python', w:9, t:'virtual environment (venv)', m:'بيئة معزولة لحزم المشروع'},
    {c:'Python', w:9, t:'module / import', m:'ملف Python بتستورده'},
    {c:'Python', w:9, t:'logging', m:'تسجيل رسائل التشغيل'},
    {c:'Python', w:9, t:'requirements.txt', m:'قايمة الحزم المطلوبة'},
    {c:'Python', w:11, t:'FastAPI', m:'إطار لبناء APIs بـ Python'},
    // JS
    {c:'JavaScript', w:5, t:'const / let', m:'تعريف متغيّر ثابت / متغيّر'},
    {c:'JavaScript', w:5, t:'arrow function', m:'دالة مختصرة: (a) => a * 2'},
    {c:'JavaScript', w:5, t:'template literal', m:'نص بين backticks فيه ${var}'},
    {c:'JavaScript', w:5, t:'array / object (JS)', m:'مصفوفة / كائن في JavaScript'},
    {c:'JavaScript', w:5, t:'map / filter / reduce', m:'تحويل / تصفية / تجميع مصفوفة'},
    {c:'JavaScript', w:5, t:'destructuring', m:'فك حقول من كائن: const { a } = obj'},
    {c:'JavaScript', w:5, t:'spread', m:'نسخ ودمج بـ ...'},
    {c:'JavaScript', w:5, t:'optional chaining', m:'قراءة آمنة: a?.b?.c'},
    {c:'JavaScript', w:6, t:'throw', m:'رمي خطأ متعمّد'},
    {c:'JavaScript', w:6, t:'async / await', m:'تعامل مع عمليات بتاخد وقت'},
    // Regex
    {c:'Regex', w:6, t:'regex', m:'التعبير النمطي — نمط للبحث في نص'},
    {c:'Regex', w:6, t:'quantifier', m:'مُكمّم: + * ? {n}'},
    {c:'Regex', w:6, t:'capture group', m:'جزء ملتقط بأقواس ()'},
    {c:'Regex', w:6, t:'flag', m:'خيار (g = كل التطابقات، i = تجاهل الحالة)'},
    // HTML
    {c:'HTML وويب', w:7, t:'tag / element', m:'وسم / عنصر في HTML'},
    {c:'HTML وويب', w:7, t:'attribute', m:'خاصية (id، class، href)'},
    {c:'HTML وويب', w:7, t:'CSS selector', m:'صيغة لاختيار عناصر من الصفحة'},
    {c:'HTML وويب', w:7, t:'scraping', m:'سحب بيانات من صفحات ويب'},
    {c:'HTML وويب', w:7, t:'robots.txt', m:'ملف بيحدد إيه اللي مسموح تسحبه'},
    // SQL
    {c:'SQL', w:8, t:'table / row / column', m:'جدول / صف / عمود'},
    {c:'SQL', w:8, t:'query', m:'استعلام'},
    {c:'SQL', w:8, t:'SELECT / WHERE', m:'اختيار أعمدة / شرط'},
    {c:'SQL', w:8, t:'JOIN', m:'ربط جدولين'},
    {c:'SQL', w:8, t:'GROUP BY', m:'تجميع الصفوف'},
    {c:'SQL', w:8, t:'primary key', m:'مفتاح أساسي فريد لكل صف'},
    {c:'SQL', w:8, t:'foreign key', m:'مفتاح خارجي بيربط جدولين'},
    {c:'SQL', w:8, t:'SQL injection', m:'ثغرة بتحصل لو لصقت مدخلات المستخدم في الاستعلام'},
    // Git وطرفية
    {c:'Git وطرفية', w:1, t:'terminal', m:'الطرفية — نافذة تنفيذ الأوامر'},
    {c:'Git وطرفية', w:1, t:'repository', m:'مستودع الكود'},
    {c:'Git وطرفية', w:1, t:'commit', m:'حفظ نسخة من التعديلات'},
    {c:'Git وطرفية', w:1, t:'branch / merge', m:'فرع منفصل / دمج فرعين'},
    {c:'Git وطرفية', w:1, t:'push / pull / clone', m:'رفع / سحب / نسخ مستودع'},
    {c:'Git وطرفية', w:1, t:'.gitignore', m:'ملف بيحدد إيه اللي Git يتجاهله'},
    {c:'Git وطرفية', w:10, t:'SSH', m:'دخول آمن لسيرفر من بعيد'},
    {c:'Git وطرفية', w:10, t:'cron', m:'جدولة أوامر على Linux'},
    // Docker
    {c:'Docker', w:10, t:'image', m:'قالب جاهز للتطبيق'},
    {c:'Docker', w:10, t:'container', m:'نسخة شغّالة من الـ image'},
    {c:'Docker', w:10, t:'volume', m:'تخزين بيفضل بعد ما الـ container يتقفل'},
    {c:'Docker', w:10, t:'docker compose', m:'تشغيل أكتر من container بملف واحد'},
    {c:'Docker', w:10, t:'YAML', m:'صيغة ملفات إعداد'},
    {c:'Docker', w:10, t:'environment variable', m:'متغيّر إعداد خارج الكود'},
    // AI
    {c:'ذكاء اصطناعي', w:11, t:'LLM', m:'نموذج لغوي كبير'},
    {c:'ذكاء اصطناعي', w:11, t:'prompt', m:'التعليمات اللي بتكتبها للنموذج'},
    {c:'ذكاء اصطناعي', w:11, t:'Chat Model', m:'نود بتحدد أنهي نموذج'},
    {c:'ذكاء اصطناعي', w:11, t:'Basic LLM Chain', m:'نود بتبعت prompt وتاخد رد'},
    {c:'ذكاء اصطناعي', w:11, t:'AI Agent', m:'بيقرر ويستخدم أدوات لوحده'},
    {c:'ذكاء اصطناعي', w:11, t:'tool', m:'أداة بيقدر الـ Agent يستدعيها'},
    {c:'ذكاء اصطناعي', w:11, t:'structured output', m:'رد بصيغة محددة (JSON)'}
  ];

  // ---------------- Quick reference (cheat sheets) ----------------
  // code:true → shown in a <pre> block
  var CHEATS = [
    {id:'expr', name:'n8n Expressions', items:[
      {p:'{{ $json.email }}', u:'قيمة حقل من النود اللي قبل'},
      {p:"{{ $('Google Sheets').item.json.name }}", u:'قيمة من نود معيّنة بالاسم (لازم يطابق اسم النود)'},
      {p:'{{ $json.body.name }}', u:'بيانات Webhook بتيجي جوه body'},
      {p:"{{ $now.toFormat('yyyy-MM-dd') }}", u:'تاريخ النهارده'},
      {p:"{{ $now.plus({ days: 7 }).toFormat('yyyy-MM-dd') }}", u:'تاريخ بعد 7 أيام'},
      {p:"{{ $json.fullName.split(' ')[0] }}", u:'أول كلمة من الاسم'},
      {p:'{{ $json.email.toLowerCase().trim() }}', u:'تنضيف الإيميل'},
      {p:"{{ $json.phone || 'no phone' }}", u:'قيمة بديلة لو الحقل فاضي'},
      {p:'{{ $json.price * $json.qty }}', u:'عملية حسابية'},
      {p:'{{ $input.all().length }}', u:'عدد الـ items الداخلة للنود'},
      {p:"{{ $json.tags.join(', ') }}", u:'دمج مصفوفة في نص واحد'},
      {p:'{{ JSON.stringify($json) }}', u:'الـ item كله كنص — مفيد للتشخيص'},
      {p:'{{ $json.execution.error.message }}', u:'رسالة الخطأ داخل Error Workflow'}
    ]},
    {id:'js', name:'JavaScript (Code node)', code:true, items:[
      {p:"const items = $input.all();\nconst total = items.reduce((sum, i) => sum + i.json.price, 0);\nreturn [{ json: { total } }];", u:'مجموع حقل من كل الـ items'},
      {p:'return $input.all().filter(i => i.json.age >= 18);', u:'فلترة items'},
      {p:"const counts = {};\nfor (const item of $input.all()) {\n  const city = item.json.address.city;\n  counts[city] = (counts[city] || 0) + 1;\n}\nreturn Object.entries(counts).map(([city, count]) => ({ json: { city, count } }));", u:'عدّ حسب مدينة (group by)'},
      {p:'return { json: { ...$json, email: $json.email.toLowerCase() } };', u:'وضع Run Once for Each Item: تعديل حقل'},
      {p:"const city = $json.user?.address?.city ?? 'unknown';", u:'قراءة آمنة مع قيمة بديلة'},
      {p:'if (!$json.email) throw new Error("email is required");', u:'إيقاف الـ Workflow برسالة واضحة'},
      {p:"const d = new Date();\nd.setDate(d.getDate() + 7);\nreturn [{ json: { due: d.toISOString().slice(0, 10) } }];", u:'تاريخ بعد 7 أيام'},
      {p:"const rows = $('Google Sheets').all();\nreturn rows.map(r => ({ json: { name: r.json.name } }));", u:'قراءة بيانات نود تانية'},
      {p:"return [\n  { json: { name: 'Ali' } },\n  { json: { name: 'Sara' } },\n  { json: { name: 'Omar' } }\n];", u:'إنشاء 3 items تجريبية'},
      {p:'const obj = JSON.parse(\'{"a":1}\');\nconst text = JSON.stringify(obj, null, 2);', u:'JSON ↔ نص'}
    ]},
    {id:'python', name:'Python', code:true, items:[
      {p:'name = "Ali"\nprint(f"Hello {name}")', u:'f-string'},
      {p:'emails = [" A@x.com ", "b@x.com"]\nclean = [e.strip().lower() for e in emails]', u:'list comprehension'},
      {p:'user = {"name": "Ali", "age": 30}\nprint(user.get("city", "unknown"))', u:'قاموس مع قيمة افتراضية'},
      {p:'def clean_email(email):\n    return email.strip().lower()', u:'دالة'},
      {p:'import json\nwith open("data.json", encoding="utf-8") as f:\n    data = json.load(f)', u:'قراءة JSON من ملف'},
      {p:'with open("out.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, indent=2, ensure_ascii=False)', u:'كتابة JSON في ملف'},
      {p:'try:\n    n = int(text)\nexcept ValueError:\n    n = 0', u:'try / except'},
      {p:'import requests\nr = requests.get("https://jsonplaceholder.typicode.com/users", timeout=10)\nr.raise_for_status()\nusers = r.json()', u:'استدعاء API'},
      {p:'import os\nkey = os.environ.get("API_KEY")', u:'قراءة سر من متغيّر بيئة'},
      {p:'from collections import Counter\nprint(Counter(u["address"]["city"] for u in users))', u:'عدّ التكرارات'},
      {p:'from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/ping")\ndef ping():\n    return {"ok": True}', u:'FastAPI: أبسط endpoint'},
      {p:'import re\nre.findall(r"\\d+", "order 123 and 456")', u:'Regex في Python'}
    ]},
    {id:'json', name:'JSON وHTTP وcURL', code:true, items:[
      {p:'{\n  "name": "Ali",\n  "skills": ["python", "n8n"],\n  "address": { "city": "Cairo" }\n}', u:'JSON: object فيه array وobject متداخل'},
      {p:'curl.exe https://jsonplaceholder.typicode.com/users/1', u:'GET بسيط (في PowerShell استخدم curl.exe)'},
      {p:'curl.exe -X POST -H "Content-Type: application/json" -d "@body.json" https://jsonplaceholder.typicode.com/posts', u:'POST بجسم JSON من ملف'},
      {p:'curl.exe -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/me', u:'طلب بـ Bearer token'},
      {p:'https://api.example.com/v1/users?limit=10&page=2#top', u:'أجزاء الرابط: دومين، مسار، query، fragment'},
      {p:'200 OK · 201 Created · 400 Bad Request · 401 Unauthorized\n403 Forbidden · 404 Not Found · 429 Too Many Requests · 500 Server Error', u:'أهم status codes'}
    ]},
    {id:'sql', name:'SQL', code:true, items:[
      {p:"SELECT name, city FROM customers WHERE city = 'Cairo' ORDER BY name LIMIT 10;", u:'اختيار وفلترة وترتيب'},
      {p:'SELECT city, COUNT(*) AS total FROM customers GROUP BY city HAVING COUNT(*) > 1;', u:'تجميع'},
      {p:'SELECT o.id, c.name FROM orders o JOIN customers c ON c.id = o.customer_id;', u:'JOIN'},
      {p:"INSERT INTO customers (name, email) VALUES ('Ali', 'ali@x.com');", u:'إضافة'},
      {p:"UPDATE customers SET city = 'Giza' WHERE id = 3;", u:'تعديل (WHERE ضروري)'},
      {p:'DELETE FROM customers WHERE id = 3;', u:'حذف (WHERE ضروري)'},
      {p:'CREATE TABLE customers (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE\n);', u:'إنشاء جدول (Postgres)'},
      {p:"SELECT * FROM orders WHERE created_at >= NOW() - INTERVAL '7 days';", u:'آخر 7 أيام (Postgres)'},
      {p:'SELECT * FROM customers WHERE email = $1;', u:'استعلام بـ Query Parameter في n8n'}
    ]},
    {id:'regex', name:'Regex', items:[
      {p:'\\d+', u:'رقم أو أكتر'},
      {p:'01[0125]\\d{8}', u:'موبايل مصري'},
      {p:'[\\w.+-]+@[\\w-]+\\.[\\w.]+', u:'إيميل بسيط'},
      {p:'^\\s+|\\s+$', u:'مسافات في أول أو آخر النص'},
      {p:'(\\d{4})-(\\d{2})-(\\d{2})', u:'تاريخ بـ groups'},
      {p:'https?://\\S+', u:'رابط'},
      {p:'"tel 01012345678".match(/01[0125]\\d{8}/)?.[0]', u:'JavaScript: استخراج الموبايل'},
      {p:'{{ $json.text.match(/\\d+/g) }}', u:'n8n Expression: كل الأرقام في نص'}
    ]},
    {id:'git', name:'Git', code:true, items:[
      {p:'git init\ngit add .\ngit commit -m "first commit"', u:'أول commit'},
      {p:'git status\ngit log --oneline', u:'الحالة والتاريخ'},
      {p:'git switch -c feature/x\ngit switch main\ngit merge feature/x', u:'فرع جديد ودمجه'},
      {p:'git remote add origin https://github.com/USER/REPO.git\ngit branch -M main\ngit push -u origin main', u:'ربط GitHub ورفع'},
      {p:'git pull\ngit clone https://github.com/USER/REPO.git', u:'سحب / نسخ'},
      {p:'.env\n.venv/\n__pycache__/\nnode_modules/\n*.log', u:'محتوى .gitignore مقترح'}
    ]},
    {id:'shell', name:'PowerShell وBash', code:true, items:[
      {p:'cd n8n-journey\ndir\nmkdir new-folder', u:'التنقل (PowerShell)'},
      {p:'Get-Content notes.txt', u:'قراءة ملف (PowerShell)'},
      {p:'python -m venv .venv\n.\\.venv\\Scripts\\Activate.ps1', u:'بيئة Python افتراضية'},
      {p:'Set-ExecutionPolicy -Scope CurrentUser RemoteSigned', u:'لو PowerShell منع تفعيل venv'},
      {p:'pip install -r requirements.txt', u:'تثبيت الحزم من ملف'},
      {p:'ls\ncd /path\npwd\nmkdir dir\ncp a b\nmv a b\nrm file\ncat file', u:'أوامر Linux/Bash الأساسية'},
      {p:'ssh user@server_ip', u:'دخول سيرفر'},
      {p:'0 8 * * * /home/user/backup.sh', u:'cron: كل يوم الساعة 8 صباحًا'}
    ]},
    {id:'docker', name:'Docker وYAML', code:true, items:[
      {p:'docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n', u:'تشغيل n8n بـ Docker'},
      {p:'services:\n  n8n:\n    image: docker.n8n.io/n8nio/n8n\n    ports:\n      - "5678:5678"\n    environment:\n      - GENERIC_TIMEZONE=Africa/Cairo\n      - TZ=Africa/Cairo\n    volumes:\n      - n8n_data:/home/node/.n8n\nvolumes:\n  n8n_data:', u:'docker-compose.yml لـ n8n'},
      {p:'docker compose up -d\ndocker compose logs -f n8n\ndocker compose down', u:'تشغيل ومراقبة وإيقاف'},
      {p:'docker ps\ndocker images\ndocker logs n8n\ndocker stop n8n', u:'أوامر أساسية'}
    ]}
  ];

  // ---------------- Errors ----------------
  var ERRORS = [
    // n8n
    {c:'n8n', m:'Authorization failed - please check your credentials', a:'الخدمة رفضت بيانات الدخول (401).', cs:'المفتاح أو الـ Token غلط، أو منتهي، أو في الحقل الغلط.', f:'أعد إنشاء الـ Credential وجرّب Test.'},
    {c:'n8n', m:'Forbidden - perhaps check your credentials', a:'الحساب معروف بس معندوش صلاحية (403).', cs:'الحساب مش مشارك عليه الـ Sheet، أو الـ API مش مفعّل.', f:'شارك الملف مع الحساب المربوط وراجع الـ APIs المفعّلة.'},
    {c:'n8n', m:'The resource you are requesting could not be found', a:'اللي بتطلبه مش موجود (404).', cs:'الرابط أو الـ ID غلط، أو الملف اتمسح.', f:'انسخ الـ ID من جديد وراجع الـ URL.'},
    {c:'n8n', m:'Bad request - please check your parameters', a:'الطلب نفسه فيه مشكلة (400).', cs:'حقل ناقص أو قيمة بشكل غلط أو JSON مش صحيح.', f:'افتح تفاصيل الخطأ، غالبًا بتقولك أنهي حقل.'},
    {c:'n8n', m:'The service is receiving too many requests from you', a:'عدّيت حد الطلبات (429).', cs:'طلبات كتير ورا بعض من غير راحة.', f:'Loop Over Items بدفعات صغيرة + Wait، أو Retry On Fail.'},
    {c:'n8n', m:'The service refused the connection - perhaps it is offline', a:'مفيش حد سامعك على العنوان ده (ECONNREFUSED).', cs:'السيرفر واقف، أو المنفذ غلط، أو n8n Cloud بيحاول يوصل لـ localhost على جهازك.', f:'اتأكد إن الخدمة شغالة ومتاحة من مكان n8n.'},
    {c:'n8n', m:'Error 400: redirect_uri_mismatch', a:'جوجل بتقولك عنوان الرجوع مش مطابق.', cs:'الـ Redirect URL في Google Cloud مختلف عن اللي n8n بيستخدمه.', f:'انسخ الـ URL بالظبط من نافذة الـ Credential في n8n.'},
    {c:'n8n', m:'Error 403: access_denied (app has not completed the Google verification process)', a:'التطبيق في وضع تجريبي ومحدّش مسموح له غيرك.', cs:'حسابك مش مضاف كـ Test user.', f:'OAuth consent screen ← Test users ← أضف إيميلك.'},
    {c:'n8n', m:'The requested webhook "GET hello" is not registered.', a:'الـ Webhook مش مسجّل دلوقتي.', cs:'استخدمت Test URL من غير Execute، أو Production URL والـ Workflow مش متفعّل.', f:'اضغط Execute workflow وجرّب فورًا، أو فعّل الـ Workflow.'},
    {c:'n8n', m:'Referenced node is unexecuted', a:'الـ Expression بيشاور على نود لسه معملتش تشغيل.', cs:'بتجرّب نود من نص الـ Workflow من غير ما تشغّل اللي قبلها.', f:'شغّل من البداية مرة، أو ثبّت (Pin) بيانات النود اللي قبلها.'},
    {c:'n8n', m:"Referenced node doesn't exist", a:'الـ Expression بيشاور على نود اسمها مش موجود.', cs:'غيّرت اسم النود وسبت الاسم القديم في الـ Expression.', f:'صلّح الاسم ليطابق اسم النود بالظبط.'},
    {c:'n8n', m:"Cannot read properties of undefined (reading 'name')", a:'بتقرا حقل من حاجة مش موجودة.', cs:'الحقل الأب فاضي في بعض الـ items، أو المسار غلط.', f:'استخدم `?.` زي `$json.user?.name` أو تحقق بـ IF قبلها.'},
    {c:'n8n', m:"Code doesn't return items properly", a:'نود Code رجّعت شكل بيانات غلط.', cs:'رجّعت object أو نص بدل قايمة items.', f:'ارجع دايمًا `[{ json: {...} }]`.'},
    {c:'n8n', m:'JSON parameter needs to be valid JSON', a:'الـ Body مكتوب بشكل JSON غلط.', cs:'فاصلة زيادة أو علامات تنصيص ناقصة أو Expression مش ملفوف صح.', f:'الصق الـ JSON في validator، وحط الـ Expression جوه علامات التنصيص للنصوص.'},
    // Python
    {c:'Python', m:'SyntaxError: invalid syntax', a:'صياغة الكود غلط.', cs:'ناقص `:` أو قوس أو علامة تنصيص.', f:'شوف السطر اللي فوق السطر المذكور كمان.'},
    {c:'Python', m:'IndentationError: unexpected indent', a:'المسافة البادئة غلط.', cs:'خلط بين spaces وtab أو مسافة زيادة.', f:'استخدم 4 مسافات بشكل ثابت.'},
    {c:'Python', m:"NameError: name 'x' is not defined", a:'بتستخدم اسم لسه معرّفتوش.', cs:'كتبت الاسم غلط أو استخدمته قبل تعريفه.', f:'راجع الإملاء وترتيب الكود.'},
    {c:'Python', m:'TypeError: can only concatenate str (not "int") to str', a:'بتجمع نص مع رقم.', cs:'`"a" + 1`', f:'حوّل بـ `str()` أو استخدم f-string.'},
    {c:'Python', m:"KeyError: 'city'", a:'المفتاح مش موجود في القاموس.', cs:'كتبت اسم المفتاح غلط أو مش موجود في كل العناصر.', f:'استخدم `d.get("city")`.'},
    {c:'Python', m:'IndexError: list index out of range', a:'رقم فهرس أكبر من طول القايمة.', cs:'القايمة أقصر من المتوقع.', f:'اتأكد من `len()` قبل ما توصل للعنصر.'},
    {c:'Python', m:"ModuleNotFoundError: No module named 'requests'", a:'الحزمة مش مثبتة.', cs:'نسيت `pip install`، أو بتشغّل خارج الـ venv.', f:'فعّل الـ venv وثبّت الحزمة.'},
    {c:'Python', m:'json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)', a:'اللي بتقراه مش JSON صالح.', cs:'الرد فاضي أو HTML بدل JSON.', f:'اطبع `r.text` وشوف اللي رجع فعلاً.'},
    // JavaScript
    {c:'JavaScript', m:"TypeError: Cannot read properties of undefined (reading 'x')", a:'بتقرا حقل من undefined.', cs:'الكائن الأب مش موجود.', f:'استخدم `?.` أو تحقق قبلها.'},
    {c:'JavaScript', m:'ReferenceError: x is not defined', a:'متغيّر مش معرّف.', cs:'إملاء غلط أو خارج النطاق.', f:'عرّفه بـ `const` قبل الاستخدام.'},
    {c:'JavaScript', m:'SyntaxError: Unexpected token', a:'رمز مش متوقع في الصياغة.', cs:'قوس أو فاصلة ناقصة أو زيادة.', f:'راجع الأقواس والفواصل حوالين السطر.'},
    {c:'JavaScript', m:'Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON', a:'حاولت تحلل HTML كأنه JSON.', cs:'الـ API رجّع صفحة خطأ HTML.', f:'شوف الـ status والرد الخام قبل `JSON.parse`.'},
    // Git
    {c:'Git', m:'fatal: not a git repository (or any of the parent directories): .git', a:'الفولدر ده مش repo.', cs:'مشغّلتش `git init` أو في فولدر غلط.', f:'`git init` أو `cd` للفولدر الصح.'},
    {c:'Git', m:'error: failed to push some refs', a:'الـ push اترفض.', cs:'في تعديلات على GitHub مش عندك.', f:'`git pull` الأول ثم `git push`.'},
    {c:'Git', m:'remote: Permission denied / Authentication failed', a:'GitHub رفض الدخول.', cs:'بيانات الدخول أو الـ token غلط.', f:'استخدم GitHub Desktop أو `gh auth login` أو Personal Access Token.'},
    // Docker
    {c:'Docker', m:'port is already allocated', a:'المنفذ مستخدم.', cs:'n8n تاني شغّال على 5678.', f:'وقّف الأول (`docker ps` ثم `docker stop`) أو غيّر المنفذ.'},
    {c:'Docker', m:'error during connect: ... dockerDesktopLinuxEngine ... cannot find the file specified', a:'Docker Desktop مش شغّال.', cs:'البرنامج مقفول أو لسه بيبدأ.', f:'افتح Docker Desktop واستنى يقول Running.'},
    // SQL
    {c:'SQL', m:'ERROR: syntax error at or near "..."', a:'صياغة الاستعلام غلط.', cs:'فاصلة زيادة أو كلمة مفتاحية غلط.', f:'راجع اللي قبل المكان المذكور.'},
    {c:'SQL', m:'relation "customers" does not exist', a:'الجدول مش موجود.', cs:'اسم غلط أو schema غلط أو مش متعمل.', f:'راجع الاسم وشغّل `CREATE TABLE`.'},
    {c:'SQL', m:'column "x" does not exist', a:'العمود مش موجود.', cs:'إملاء غلط أو حالة أحرف (كبير/صغير).', f:'راجع أسماء الأعمدة في الجدول.'}
  ];

  // ---------------- Projects ----------------
  var PROJECTS = [
    {w:1, t:'Hello Webhook', d:'Webhook ← Edit Fields ← Respond to Webhook، ومرفوع على GitHub.'},
    {w:2, t:'API Explorer', d:'مستخدمين من API ← فلتر ← ترتيب ← شكل جديد للبيانات.'},
    {w:3, t:'Sheet → Telegram', d:'كل صف جديد في Sheet يبعت إشعار مرتب على تيليجرام.'},
    {w:4, t:'Weather Digest + سكربت Python', d:'ملخص طقس يومي، وسكربت Python بيحوّل CSV لـ JSON.'},
    {w:5, t:'Code Toolkit', d:'3 نودات Code: group by، وفلترة، وحساب تواريخ.'},
    {w:6, t:'Data Cleaner', d:'تنظيف بيانات وسخة بـ Regex وتجميعها في تقرير.'},
    {w:7, t:'Quotes Scraper', d:'سحب بيانات صفحات بـ n8n ونسخة تانية بـ Python.'},
    {w:8, t:'SQL Daily Report', d:'تقرير يومي من قاعدة بيانات على تيليجرام.'},
    {w:9, t:'Error-proof Workflow', d:'Workflow فيه Validation وRetry وError Workflow.'},
    {w:10, t:'n8n on Docker', d:'n8n شغّال بـ docker compose مع backup.'},
    {w:11, t:'AI Classifier', d:'Python API صغيرة + n8n بيصنّف رسائل بالذكاء الاصطناعي.'},
    {w:12, t:'المشروع الختامي', d:'Form → Sheet → n8n → AI → إشعار، مع README وفيديو.'}
  ];
  var CAPSTONE = [
    'الـ Workflow بيشتغل لوحده من غير ما أضغط Execute',
    'بيتعامل مع مدخلات ناقصة أو غلط (إيميل فاضي مثلاً) من غير ما يقع',
    'بيبعتلي تنبيه لما يفشل (Error Workflow)',
    'كل نود ليها اسم واضح، وفي Sticky Notes بتشرح الأجزاء',
    'فيه جزء بكود (Code node أو Python API) في مكانه الصح',
    'ملف JSON وREADME بالإنجليزي وفيديو قصير مرفوعين على GitHub',
    'شرحته لحد بصوتي في 3 جمل: المشكلة ← الحل ← النتيجة'
  ];

  var RESOURCES = [
    {title:'n8n', items:[
      ['docs.n8n.io', 'التوثيق الرسمي — ابدأ بـ Key concepts وبعدين صفحة كل نود'],
      ['n8n Courses', 'كورسات رسمية مجانية (Level 1 وLevel 2) على docs.n8n.io/courses'],
      ['community.n8n.io', 'المنتدى — دور على رسالة الخطأ بالنص الإنجليزي كامل'],
      ['n8n.io/workflows', 'مكتبة Templates جاهزة']
    ]},
    {title:'Python', items:[
      ['CS50P', 'كورس هارفارد المجاني للبايثون'],
      ['Automate the Boring Stuff', 'كتاب أونلاين لأتمتة المهام بـ Python'],
      ['Exercism (Python)', 'تمارين صغيرة بتعليقات'],
      ['FastAPI docs', 'fastapi.tiangolo.com — التوثيق الرسمي']
    ]},
    {title:'JavaScript وWeb', items:[
      ['javascript.info', 'شرح JavaScript حديث ومنظم'],
      ['MDN Web Docs', 'المرجع الأوضح للـ JS وHTML وCSS'],
      ['CSS Diner', 'flukeout.github.io — لعبة CSS selectors']
    ]},
    {title:'SQL وRegex', items:[
      ['SQLBolt', 'sqlbolt.com — دروس SQL تفاعلية'],
      ['regex101', 'regex101.com — جرّب الأنماط وشوف الشرح'],
      ['RegexOne', 'regexone.com — دروس Regex خطوة خطوة']
    ]},
    {title:'Git وDocker', items:[
      ['Learn Git Branching', 'learngitbranching.js.org — تعلّم Git بالرسم'],
      ['docs.docker.com', 'التوثيق الرسمي مع Get started'],
      ['GitHub Docs', 'docs.github.com — بداية سريعة']
    ]},
    {title:'للتجربة من غير مفاتيح', items:[
      ['JSONPlaceholder', 'API وهمي للـ GET وPOST'],
      ['Open-Meteo', 'طقس مجاني من غير API key'],
      ['webhook.site', 'رابط تجريبي يوريك أي طلب يوصله'],
      ['quotes.toscrape.com', 'موقع مخصص لتدريب الـ scraping']
    ]},
    {title:'الإنجليزي التقني', items:[
      ['قراءة التوثيق بالإنجليزي', 'كل صفحة docs تقراها بتمرّن مفرداتك'],
      ['فيديوهات بترجمة CC إنجليزي', 'فعّل الترجمة الإنجليزية مش العربية'],
      ['بنك المصطلحات في الصفحة دي', 'علّم الكلمات اللي بتحفظها']
    ]}
  ];

  // ---------------- 7-day intensive sprint ----------------
  // learn: [heading, explanation, example]; build: checklist; code: [{u, p}]; quiz: {q, o:[...], a:index, why}
  var SPRINT = [
    {d:1, title:'عقل n8n: الـ Items وJSON والـ Expressions', short:'Items وExpressions', hours:'~3 ساعات',
     goal:'تفهم إزاي البيانات بتتحرك جوه n8n، وتكتب Expressions من غير تخمين، وتبني أول API صغيرة بـ Webhook.',
     learn:[
      ['كل حاجة عبارة عن items','البيانات بتتنقل بين النودات كـ array، وكل عنصر فيها item جواه مفتاح `json` (وممكن `binary` للملفات). مفيش «object واحد»؛ دايمًا قايمة.','[\n  { "json": { "name": "Ali",  "age": 30 } },\n  { "json": { "name": "Sara", "age": 17 } }\n]'],
      ['النود بتشتغل على كل item لوحدها','لو دخل Edit Fields تلات items، هيخرج تلاتة، والـ Expression بيتحسب مرة لكل item. عشان كده مش محتاج Loop في 90% من الحالات.','3 items ← Edit Fields ← 3 items\n{{ $json.name }}  →  "Ali" ثم "Sara" ثم "Omar"'],
      ['الـ Expression هو JavaScript بين {{ }}','أي حقل تقدر تحوله من Fixed لـ Expression. جواه JavaScript عادي، و`$json` هو الـ item الحالي من النود اللي قبلها مباشرة.','{{ $json.first + " " + $json.last }}\n{{ $json.age >= 18 ? "adult" : "minor" }}\n{{ $json.tags?.length ?? 0 }}'],
      ['القراءة من نود معيّنة','لو محتاج بيانات من نود أبعد، استخدم اسمها. `.item` بيجيب الـ item المرتبط بالحالي (paired item)، و`.first()` بيجيب أول واحد.','{{ $("Webhook").item.json.body.email }}\n{{ $("Get Settings").first().json.currency }}'],
      ['Test URL مقابل Production URL','الـ Webhook ليه رابطين: رابط التجربة (فيه `/webhook-test/`) بيستقبل طلب واحد بعد ما تضغط Execute، ورابط الإنتاج (فيه `/webhook/`) شغال طول ما الـ Workflow متفعّل.','http://localhost:5678/webhook-test/hello\nhttp://localhost:5678/webhook/hello'],
      ['Pin Data: ثبّت وكمّل','بعد ما نود تطلّع بيانات، ثبّتها (Pin). النودات اللي بعدها هتشتغل على البيانات المثبتة من غير ما تنادي الـ API أو تستنى Webhook تاني.','Output ← أيقونة الدبوس 📌 ← Pinned']
     ],
     build:[
      'شغّل n8n (`npx n8n` أو n8n Cloud) واعمل Workflow اسمه `D1 - Items Lab`',
      'Manual Trigger ← Code بيطلّع 3 items (name, age, email بحروف كبيرة ومسافات)',
      'Edit Fields: ضيف `fullName` و`emailClean` = `{{ $json.email.trim().toLowerCase() }}` و`isAdult` بـ ternary',
      'بدّل عرض الـ Output بين Table وJSON وSchema، واسحب حقل من Schema لحقل Expression (drag & drop)',
      'Workflow تاني: Webhook (GET، path = `hello`، Respond = Using Respond to Webhook Node)',
      'Respond to Webhook ← Respond With: JSON ← `{ "message": "Hello {{ $json.query.name }}" }` وجرّبه من المتصفح بـ `?name=Ali`',
      'ثبّت (Pin) Output الـ Webhook وعدّل الرد 3 مرات من غير ما تبعت طلب جديد',
      'صدّر الـ Workflow كملف JSON (Download) وافتحه واقرا `nodes` و`connections`'
     ],
     code:[
      {u:'Code node: إنشاء items تجريبية', p:'return [\n  { json: { name: "Ali",  age: 30, email: "  ALI@X.COM " } },\n  { json: { name: "Sara", age: 17, email: "sara@x.com" } },\n  { json: { name: "Omar", age: 25, email: "Omar@X.com  " } }\n];'},
      {u:'Expressions أساسية في Edit Fields', p:'{{ $json.name.toUpperCase() }}\n{{ $json.email.trim().toLowerCase() }}\n{{ $json.age >= 18 ? "adult" : "minor" }}\n{{ $now.toFormat("yyyy-MM-dd HH:mm") }}'},
      {u:'بيانات Webhook: فين بتلاقيها', p:'GET  ?name=Ali      →  {{ $json.query.name }}\nPOST JSON body      →  {{ $json.body.name }}\nHeaders             →  {{ $json.headers["user-agent"] }}'},
      {u:'رد JSON من Respond to Webhook', p:'{\n  "ok": true,\n  "message": "Hello {{ $json.query.name }}",\n  "at": "{{ $now.toISO() }}"\n}'}
     ],
     challenge:'Webhook بـ POST بيستقبل `{ "name": "...", "age": 20 }` ويرد بـ JSON فيه `greeting` و`isAdult`. ولو `name` فاضي: IF ← Respond to Webhook بـ Response Code = 400 ورسالة `name is required`. جرّبه بـ `curl.exe`.',
     quiz:[
      {q:'البيانات اللي بتتنقل بين نودين في n8n شكلها إيه؟', o:['object واحد فيه كل البيانات','array من items وكل item فيه json','نص عادي','ملف CSV'], a:1, why:'دايمًا array من items، وكل item جواه json (وممكن binary).'},
      {q:'دخل 5 items على نود Edit Fields. الـ Expression بيتحسب كام مرة؟', o:['مرة واحدة','5 مرات، مرة لكل item','مرتين','لازم Loop عشان يشتغل'], a:1, why:'النودات بتشتغل على كل item تلقائيًا، فالـ Expression بيتحسب لكل item.'},
      {q:'`{{ $json.email }}` بيقرا القيمة منين؟', o:['من أول نود في الـ Workflow','من الـ item الحالي اللي جاي من النود اللي قبلها مباشرة','من الـ Credentials','من كل الـ items مع بعض'], a:1, why:'$json = بيانات الـ item الحالي من النود السابقة مباشرة.'},
      {q:'رابط الـ Webhook اللي فيه /webhook-test/ بيشتغل إمتى؟', o:['طول الوقت','بعد ما تضغط Execute، ولطلب واحد','لما الـ Workflow يتفعّل بس','مبيشتغلش على localhost'], a:1, why:'Test URL للتجربة: بيستنى طلب واحد بعد Execute. الـ Production URL هو اللي بيشتغل مع التفعيل.'},
      {q:'فايدة Pin Data إيه؟', o:['بتحذف البيانات','بتثبت Output نود عشان تكمّل بناء من غير ما تعيد تشغيلها','بتشفّر البيانات','بتسرّع الـ Production'], a:1, why:'بتثبت البيانات وقت البناء والتجربة بس، ومبتأثرش على التشغيل الفعلي.'}
     ]},

    {d:2, title:'APIs وHTTP والمنطق: IF وSwitch وMerge', short:'APIs والمنطق', hours:'~3 ساعات',
     goal:'تكلّم أي API حتى لو مالوش نود جاهزة، وتفهم ردوده وأخطاءه، وتوجّه البيانات في مسارات حسب شروط.',
     learn:[
      ['تشريح أي طلب HTTP','أي طلب فيه: Method (GET للقراءة، POST للإرسال، PUT/PATCH للتعديل، DELETE للحذف) وURL وHeaders وBody. والرد فيه Status Code وBody.','POST https://api.example.com/v1/leads\nContent-Type: application/json\nAuthorization: Bearer sk_123\n\n{ "name": "Ali", "email": "ali@x.com" }'],
      ['Status Codes اللي لازم تحفظها','2xx نجاح، 4xx غلط منك، 5xx غلط من السيرفر. أهمهم 200 و201 و400 و401 و403 و404 و429 و500.','401 = مين انت؟ (المفتاح غلط)\n403 = عارفك بس ممنوع\n429 = بالراحة، طلبات كتير'],
      ['Query مقابل Body','الـ Query في آخر الرابط بعد `?` وبيستخدم غالبًا مع GET للفلترة. الـ Body بيتبعت مع POST وفيه البيانات نفسها كـ JSON.','GET /posts?userId=1&_limit=5\nPOST /posts   body: { "title": "Hi" }'],
      ['طرق المصادقة (Authentication)','API Key في Header أو Query، أو Bearer Token، أو Basic (user/pass)، أو OAuth2. في n8n حطها دايمًا في Credential (Header Auth مثلاً) مش جوه الـ URL.','Header Auth →  Name: Authorization\n              Value: Bearer YOUR_TOKEN'],
      ['IF وFilter وSwitch','IF بيقسم لمسارين true/false. Filter بيسيب اللي بيطابق بس ويرمي الباقي. Switch بيوزّع على أكتر من مسار بقواعد، وفيه Fallback للي مطابقش حاجة.','IF:     {{ $json.total }} > 1000  → VIP / عادي\nSwitch: status = new | paid | refunded'],
      ['Merge: رجّع المسارات لبعض','Append بيحط الاتنين ورا بعض. Combine by Matching Fields بيعمل join على حقل مشترك (زي VLOOKUP). Combine by Position بيدمج الأول مع الأول.','users.id  ⟷  posts.userId\n→ كل post معاه اسم صاحبه']
     ],
     build:[
      'HTTP Request: GET `https://jsonplaceholder.typicode.com/users` ← Filter (`id` > 5) ← Sort بالاسم ← Limit 3',
      'افتح docs أي API، انسخ مثال cURL، وفي HTTP Request اضغط Import cURL وشوف n8n ملاه لوحده',
      'طقس القاهرة من Open-Meteo (من غير مفتاح)، وEdit Fields يطلّع `temp` و`wind` بس',
      'Switch على الحرارة: حر (> 30) / معتدل / برد، وكل مسار يضيف `advice` مختلف',
      'POST على `https://jsonplaceholder.typicode.com/posts` بـ JSON Body جاي من Expressions',
      'Merge (Combine by Matching Fields): اربط `/posts` بـ `/users` على `userId` = `id`',
      'فعّل من Options: Include Response Headers and Status، وجرّب رابط غلط وشوف 404'
     ],
     code:[
      {u:'رابط Open-Meteo للقاهرة', p:'https://api.open-meteo.com/v1/forecast?latitude=30.04&longitude=31.24&current=temperature_2m,wind_speed_10m\n\n// في Edit Fields:\n{{ $json.current.temperature_2m }}\n{{ $json.current.wind_speed_10m }}'},
      {u:'JSON Body بـ Expressions (Specify Body: Using JSON)', p:'{\n  "title": "{{ $json.name }}",\n  "body": "Lead from {{ $json.address.city }}",\n  "userId": {{ $json.id }}\n}'},
      {u:'شرط Switch/IF كـ Expression', p:'{{ $json.current.temperature_2m > 30 }}\n{{ ["paid", "shipped"].includes($json.status) }}\n{{ $json.email.endsWith("@gmail.com") }}'},
      {u:'اختبار API من الطرفية قبل n8n', p:'curl.exe -s "https://jsonplaceholder.typicode.com/users/1"\ncurl.exe -X POST -H "Content-Type: application/json" -d "{\\"title\\":\\"hi\\"}" https://jsonplaceholder.typicode.com/posts'}
     ],
     challenge:'Code يطلّع 3 مدن (name, lat, lon) ← HTTP Request واحد بيستخدم `{{ $json.lat }}` و`{{ $json.lon }}` ← Sort حسب الحرارة ← Aggregate ← Edit Fields يعمل رسالة واحدة فيها المدن التلاتة مرتبة.',
     quiz:[
      {q:'الـ API رجّع 401. غالبًا المشكلة إيه؟', o:['السيرفر واقع','المفتاح أو الـ Token غلط أو ناقص','الرابط مش موجود','بعت طلبات كتير'], a:1, why:'401 Unauthorized = السيرفر مش عارف انت مين. راجع الـ Credential.'},
      {q:'عايز تقسم الطلبات على 4 مسارات حسب الحالة. هتستخدم إيه؟', o:['IF','Filter','Switch','Merge'], a:2, why:'Switch بيوزّع على أكتر من مسار. IF مساريْن بس.'},
      {q:'الفرق بين Filter وIF؟', o:['مفيش فرق','Filter بيسيب اللي بيطابق بس، وIF بيطلّع مسارين','IF أسرع','Filter بيشتغل على item واحد بس'], a:1, why:'Filter بيرمي اللي مبيطابقش، وIF بيوديه على مسار false.'},
      {q:'فين المكان الصح للـ API Key؟', o:['جوه الـ URL','في Credential (زي Header Auth)','في Sticky Note','في اسم النود'], a:1, why:'الـ Credentials بتتخزن مشفّرة ومبتطلعش لما تصدّر الـ Workflow.'},
      {q:'429 Too Many Requests معناها إيه؟', o:['الطلب غلط','عدّيت حد الطلبات المسموح','البيانات كبيرة','لازم تسجّل دخول'], a:1, why:'Rate limit. الحل: دفعات صغيرة + Wait، أو Retry On Fail.'}
     ]},

    {d:3, title:'الربط بالخدمات: Sheets وTelegram وGmail والجدولة', short:'Sheets وTelegram', hours:'~3 ساعات',
     goal:'تربط n8n بالأدوات اللي الناس بتدفع عشان يتعمل فيها أتمتة، وتشغّل الـ Workflow لوحده على جدول أو مع أي حدث.',
     learn:[
      ['Credentials وOAuth2','Credential = بيانات دخول محفوظة مشفّرة. OAuth2 (جوجل مثلاً) بيفتحلك صفحة تسجيل دخول وترجع لـ n8n من غير ما تكتب باسوورد. لو n8n على جهازك محتاج Client ID وSecret من Google Cloud.','Google Cloud → APIs & Services → Credentials\n→ OAuth client ID → Web application\n→ Redirect URI (انسخه من n8n)'],
      ['أنواع الـ Triggers','Webhook = الخدمة بتكلمك أول ما يحصل حدث. Polling = n8n بيسأل كل فترة «في جديد؟» (زي Google Sheets Trigger). Schedule = على وقت ثابت.','Webhook: فوري\nPolling: كل دقيقة مثلاً\nSchedule: 0 9 * * *'],
      ['عمليات Google Sheets','Get Row(s) بيقرا، Append Row بيضيف، Update Row بيعدّل بعمود مطابقة، وAppend or Update بيعدّل لو الصف موجود ويضيف لو مش موجود (upsert). الصف الأول لازم يكون أسماء الأعمدة.','Operation: Append or Update Row\nColumn to match on: email'],
      ['Telegram Bot','من @BotFather بتاخد Token. عشان تبعت محتاج Chat ID: ابعت أي رسالة للبوت وشغّل Telegram Trigger وهتلاقيه في `message.chat.id`.','{{ $json.message.chat.id }}\n{{ $json.message.text }}'],
      ['Cron في Schedule Trigger','5 خانات: دقيقة، ساعة، يوم في الشهر، شهر، يوم في الأسبوع (0 = الأحد). اضبط الـ Timezone في Workflow Settings.','0 9 * * 0-4    الساعة 9، من الأحد للخميس\n*/15 * * * *   كل ربع ساعة\n0 8 1 * *      أول كل شهر 8 الصبح'],
      ['رسائل منسّقة','في Telegram اختار Parse Mode = HTML عشان تستخدم <b> و<i>. وفي Gmail اختار Email Type = HTML. خلي الـ Expressions جوه النص.','<b>عميل جديد</b>\nالاسم: {{ $json.name }}\nالمصدر: {{ $json.source }}']
     ],
     build:[
      'اعمل Sheet اسمه `Leads` بأعمدة: `name, email, phone, source, status, notified_at` و5 صفوف تجريبية',
      'اعمل Google Sheets Credential (أو سجّل دخول مباشرة لو n8n Cloud)',
      'Get Row(s) بفلتر `status = new`',
      'اعمل بوت من @BotFather، وTelegram Trigger ياخد منه Chat ID، وبعدين Send Message لنفسك',
      'Append or Update Row بـ `email` كعمود مطابقة، وجرّب تبعت نفس الإيميل مرتين',
      'Gmail ← Send بـ Email Type = HTML فيه جدول صغير لبيانات العميل',
      'Schedule Trigger بـ Cron `0 9 * * 0-4` واضبط Timezone على Africa/Cairo من Settings'
     ],
     code:[
      {u:'رسالة Telegram (Parse Mode: HTML)', p:'<b>🔔 Lead جديد</b>\nالاسم: {{ $json.name }}\nالإيميل: {{ $json.email }}\nالمصدر: {{ $json.source }}\nالوقت: {{ $now.setZone("Africa/Cairo").toFormat("dd/MM HH:mm") }}'},
      {u:'إيميل HTML بسيط', p:'<h2>Hello {{ $json.name }}</h2>\n<p>Thanks for contacting us. Here is your request:</p>\n<table border="1" cellpadding="6">\n  <tr><td>Service</td><td>{{ $json.service }}</td></tr>\n  <tr><td>Date</td><td>{{ $now.toFormat("dd LLL yyyy") }}</td></tr>\n</table>'},
      {u:'تعليم الصف بعد الإرسال (Update Row)', p:'Column to match on: email\nemail:       {{ $json.email }}\nstatus:      notified\nnotified_at: {{ $now.toISO() }}'},
      {u:'Cron جاهز', p:'0 9 * * 0-4      كل يوم عمل 9 الصبح (أحد → خميس)\n0 */2 * * *      كل ساعتين\n30 17 * * 4      الخميس 5:30 العصر\n0 0 1 * *        أول كل شهر نص الليل'}
     ],
     challenge:'ملخص Leads يومي: Schedule الساعة 9 ← Get Rows (`status = new`) ← Aggregate ← رسالة Telegram واحدة فيها العدد وقايمة الأسماء ← Update Row لكل واحد: `status = notified`. ولو مفيش جديد، متبعتش رسالة (IF على العدد).',
     quiz:[
      {q:'Google Sheets Trigger بيشتغل إزاي؟', o:['جوجل بتبعت Webhook فوري','Polling: n8n بيسأل كل فترة','لازم تضغط Execute','بيشتغل مرة في اليوم بس'], a:1, why:'Polling. عشان كده ممكن ياخد دقيقة لحد ما يلاحظ الصف الجديد.'},
      {q:'Append or Update Row محتاج إيه عشان يعرف الصف موجود ولا لأ؟', o:['رقم الصف','Column to match on زي email','اسم الشيت بس','مفيش حاجة'], a:1, why:'عمود مطابقة بقيمة فريدة (email أو id) بيحدد هل يعدّل ولا يضيف.'},
      {q:'Cron `*/15 * * * *` معناه؟', o:['الساعة 3 العصر','كل 15 دقيقة','يوم 15 في الشهر','15 مرة في اليوم'], a:1, why:'الخانة الأولى هي الدقائق، و*/15 يعني كل 15 دقيقة.'},
      {q:'منين بتجيب Chat ID بتاع تيليجرام؟', o:['من @BotFather','من `message.chat.id` لما تبعت رسالة للبوت وتقراها بالـ Trigger','من إعدادات الموبايل','من الـ Token'], a:1, why:'الـ Token بيعرّف البوت، والـ Chat ID بيعرّف المحادثة، وبتلاقيه في الرسالة الجاية.'},
      {q:'الوقت في الرسائل بيطلع متأخر ساعتين أو 3. الحل؟', o:['تغيّر الساعة في الجهاز','تضبط Timezone في Workflow Settings أو تستخدم setZone','تستخدم Wait','متعملش حاجة'], a:1, why:'n8n ممكن يكون شغال بـ UTC. اضبط Timezone أو استخدم `$now.setZone("Africa/Cairo")`.'}
     ]},

    {d:4, title:'تحويل البيانات: Code node والتواريخ والدوال الجاهزة', short:'Code والتحويل', hours:'~3 ساعات',
     goal:'تحوّل أي بيانات لأي شكل: بالنودات الجاهزة لما تكفي، وبـ JavaScript لما متكفيش، وتتعامل مع التواريخ صح.',
     learn:[
      ['وضعين لنود Code','Run Once for All Items: الكود بيشتغل مرة ويشوف كل الـ items بـ `$input.all()`، وبيرجّع array. Run Once for Each Item: بيشتغل لكل item لوحده بـ `$json`، وبيرجّع item واحد.','// All Items\nreturn $input.all().map(i => ({ json: { n: i.json.name } }));\n\n// Each Item\nreturn { json: { ...$json, n: $json.name } };'],
      ['map وfilter وreduce','map بتحوّل كل عنصر، filter بتختار، reduce بتجمّع لقيمة واحدة. دي 80% من شغل Code node.','const items = $input.all();\nconst paid  = items.filter(i => i.json.status === "paid");\nconst total = paid.reduce((s, i) => s + i.json.amount, 0);'],
      ['Aggregate وSplit Out وSummarize','Aggregate بيجمّع items كتير في item واحد فيه array. Split Out العكس: array جوه item بتتحول items. Summarize زي Pivot Table: Sum وCount وAverage مع Group By.','5 items ← Aggregate ← 1 item { names: [...] }\n1 item { tags: [a,b,c] } ← Split Out ← 3 items'],
      ['التواريخ بـ Luxon','`$now` و`$today` كائنات DateTime. تقدر تضيف وتطرح وتنسّق وتحسب الفرق. النص بتحوّله لتاريخ بـ `.toDateTime()`.','{{ $now.plus({ days: 3 }).toFormat("yyyy-MM-dd") }}\n{{ $today.startOf("month").toISODate() }}\n{{ $json.due.toDateTime().diff($now, "days").days.round(0) }}'],
      ['دوال n8n الجاهزة','n8n بيضيف دوال مختصرة على النصوص والأرقام والمصفوفات جوه الـ Expressions، فبتوفر عليك كود كتير.','{{ $json.name.toTitleCase() }}\n{{ $json.text.extractEmail() }}\n{{ $json.prices.sum() }}\n{{ $json.list.removeDuplicates() }}'],
      ['Regex للتنضيف','بتستخدمه لما البيانات مكتوبة بأشكال مختلفة. `replace(/\\D/g, "")` بيشيل أي حاجة مش رقم.','{{ $json.phone.replace(/\\D/g, "").replace(/^20/, "0") }}\n"+20 100-123-4567"  →  "01001234567"']
     ],
     build:[
      'هات `/users` من JSONPlaceholder، وCode (All Items) يجمّعهم حسب `address.city` ويرجّع item لكل مدينة فيه العدد',
      'نفس النتيجة بنود Summarize (Count, Group By) وقارن بين الطريقتين',
      'Code يرجّع item فيه `tags: ["a","b","c"]` ← Split Out ← Aggregate تاني',
      'Edit Fields فيه 5 تواريخ: النهارده، بعد أسبوع، أول الشهر، آخر الشهر، وعدد الأيام لحد تاريخ معيّن',
      'نضّف 6 أرقام تليفون مكتوبة بأشكال مختلفة (`+20`، شرط، مسافات) لشكل موحد `01xxxxxxxxx`',
      'Code بيرمي Error واضح لو في item من غير email: `throw new Error("...")`'
     ],
     code:[
      {u:'Group by + ترتيب (Run Once for All Items)', p:'const counts = {};\nfor (const item of $input.all()) {\n  const city = item.json.address?.city ?? "unknown";\n  counts[city] = (counts[city] || 0) + 1;\n}\nreturn Object.entries(counts)\n  .sort((a, b) => b[1] - a[1])\n  .map(([city, count]) => ({ json: { city, count } }));'},
      {u:'تنضيف Leads كاملة', p:'return $input.all().map(({ json }) => ({\n  json: {\n    name:  (json.name || "").trim().replace(/\\s+/g, " "),\n    email: (json.email || "").trim().toLowerCase(),\n    phone: String(json.phone || "").replace(/\\D/g, "").replace(/^20/, "0"),\n    valid: /^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$/i.test(json.email || "")\n  }\n}));'},
      {u:'إجمالي وتقرير في item واحد', p:'const items = $input.all();\nconst total = items.reduce((s, i) => s + Number(i.json.amount || 0), 0);\nconst top = [...items].sort((a, b) => b.json.amount - a.json.amount)[0];\nreturn [{ json: { count: items.length, total, topCustomer: top?.json.name } }];'},
      {u:'تواريخ Luxon مفيدة', p:'{{ $now.minus({ hours: 24 }).toISO() }}\n{{ $today.endOf("month").toFormat("dd/MM/yyyy") }}\n{{ $now.setZone("Africa/Cairo").toFormat("cccc HH:mm") }}\n{{ $json.created_at.toDateTime() < $now.minus({ days: 7 }) }}'}
     ],
     challenge:'شيت فيه 20 طلب بيانات وسخة (أسماء بمسافات، إيميلات بحروف كبيرة، تليفونات بأشكال مختلفة، مبالغ نصية). ابني: Get Rows ← Code للتنضيف ← IF (valid) ← Summarize (Sum حسب المدينة) ← رسالة تقرير. والصفوف الغلط تروح شيت `Rejected`.',
     quiz:[
      {q:'في وضع Run Once for All Items، الكود لازم يرجّع إيه؟', o:['نص','object واحد','array من { json: {...} }','ولا حاجة'], a:2, why:'n8n مستني قايمة items، وكل item جواه json.'},
      {q:'عايز تحوّل 10 items لـ item واحد فيه قايمة الأسماء. أنهي نود؟', o:['Split Out','Aggregate','Merge','Filter'], a:1, why:'Aggregate بيجمّع، وSplit Out بيعمل العكس.'},
      {q:'`[1,2,3].reduce((s, x) => s + x, 0)` بترجع كام؟', o:['[1,2,3]','6','0','123'], a:1, why:'reduce بتجمّع العناصر لقيمة واحدة، والقيمة الابتدائية هنا 0.'},
      {q:'إزاي تجيب تاريخ بعد 3 أيام؟', o:['{{ $now + 3 }}','{{ $now.plus({ days: 3 }) }}','{{ $now.days(3) }}','{{ Date(3) }}'], a:1, why:'$now كائن Luxon DateTime، وplus بتاخد object فيه الوحدة.'},
      {q:'`"+20 100-123".replace(/\\D/g, "")` بترجع؟', o:['"+20 100-123"','"20100123"','"100123"','خطأ'], a:1, why:'\\D = أي حاجة مش رقم، وg = كل التطابقات، فبتتشال كلها.'}
     ]},

    {d:5, title:'التحكم والموثوقية: Loops وSub-workflows والأخطاء', short:'الموثوقية', hours:'~3 ساعات',
     goal:'تبني Workflow مبيقعش: بيحترم حدود الـ APIs، وبيتقسم لأجزاء بتتعاد، وبيبلّغك لما حاجة تفشل.',
     learn:[
      ['إمتى تحتاج Loop Over Items؟','n8n بيلف لوحده على الـ items، فالـ Loop الصريح محتاجه بس للدفعات (Batch) عشان حدود الطلبات، أو لما نود مبتدعمش items كتير، أو لما تحتاج Wait بين كل دفعة.','Loop Over Items (Batch Size: 10)\n  └─ loop → HTTP Request → Wait 1s → (يرجع للـ Loop)\n  └─ done → تقرير نهائي'],
      ['Sub-workflows','Workflow صغير بيبدأ بـ Execute Workflow Trigger (When Executed by Another Workflow)، وبتناديه من أي Workflow بنود Execute Workflow. زي الدالة: اكتبها مرة واستخدمها كتير.','Main: … → Execute Workflow ("Clean Phone")\nSub:  Execute Workflow Trigger → Code → (آخر نود = الرد)'],
      ['إعدادات النود اللي بتنقذك','Retry On Fail (عدد المحاولات والانتظار)، وOn Error (Stop / Continue / Continue using error output)، وAlways Output Data، وExecute Once.','HTTP Request → Settings\n  Retry On Fail: ✓  Max Tries: 3  Wait: 2000ms\n  On Error: Continue (using error output)'],
      ['Error Workflow','Workflow بيبدأ بـ Error Trigger، وبتختاره من Settings بتاع أي Workflow تاني. لما أي تشغيلة تفشل بيتنفذ ويبعتلك التفاصيل.','{{ $json.workflow.name }}\n{{ $json.execution.error.message }}\n{{ $json.execution.url }}'],
      ['Validation قبل ما تكمّل','اتأكد من البيانات قبل ما تكتب في شيت أو تبعت لعميل. لو غلط: Stop and Error برسالة واضحة، أو مسار «مرفوض».','IF: {{ $json.email.isEmail() && $json.name.trim() !== "" }}\n  false → Stop and Error: "Invalid lead: missing email"'],
      ['سجل التشغيلات (Executions)','كل تشغيلة ليها سجل فيه بيانات كل نود. من تشغيلة فاشلة اضغط Debug in editor (أو Copy to editor) عشان البيانات بتاعتها تتحمّل في الـ Editor وتصلّح عليها.','Executions → فاشلة → Debug in editor → صلّح → شغّل تاني']
     ],
     build:[
      'Code يطلّع 25 item ← Loop Over Items (Batch 5) ← HTTP Request ← Wait ثانية ← وشوف مسار done',
      'اعمل Sub-workflow `Clean Phone` بيستقبل `phone` ويرجّعه منضّف، وناديه من Workflow تاني',
      'على HTTP Request برابط غلط: فعّل Retry On Fail (3 محاولات) وشوف الـ Execution',
      'غيّر On Error لـ Continue (using error output) ووجّه مسار الخطأ لشيت `Failures`',
      'اعمل Workflow `Error Alert` بـ Error Trigger ← Telegram، واربطه من Settings بـ Workflow بيفشل عمدًا',
      'IF للتحقق من الإيميل ← Stop and Error برسالة إنجليزي واضحة',
      'افتح تشغيلة فاشلة واستخدم Debug in editor'
     ],
     code:[
      {u:'رسالة Error Alert على Telegram', p:'<b>⚠️ Workflow failed</b>\nName: {{ $json.workflow.name }}\nNode: {{ $json.execution.lastNodeExecuted }}\nError: {{ $json.execution.error.message }}\nLink: {{ $json.execution.url }}'},
      {u:'Validation في Code node', p:'for (const item of $input.all()) {\n  const { email, name } = item.json;\n  if (!name?.trim()) throw new Error(`Missing name in row ${item.json.row_number}`);\n  if (!/^[^@\\s]+@[^@\\s]+\\.\\w+$/.test(email || "")) {\n    throw new Error(`Invalid email: ${email}`);\n  }\n}\nreturn $input.all();'},
      {u:'Retry يدوي بسيط في Code (لـ fetch خارجي)', p:'// غالبًا Retry On Fail في إعدادات النود كفاية\nconst res = await this.helpers.httpRequest({\n  method: "GET",\n  url: "https://jsonplaceholder.typicode.com/users/1",\n  json: true\n});\nreturn [{ json: res }];'},
      {u:'Sub-workflow: آخر نود هو الرد', p:'// في الـ Sub-workflow (Execute Workflow Trigger → Code):\nreturn $input.all().map(i => ({\n  json: { phone: String(i.json.phone).replace(/\\D/g, "") }\n}));\n\n// في الـ Main: {{ $json.phone }} بعد نود Execute Workflow'}
     ],
     challenge:'خد تحدي اليوم 4 وخليه جاهز للإنتاج: Retry على كل نود خارجية، ومسار خطأ للصفوف الغلط، وError Workflow على Telegram، وتنضيف التليفون في Sub-workflow. وبعدين افصل النت دقيقة وشوف التنبيه بيوصل ولا لأ.',
     quiz:[
      {q:'إمتى فعلاً محتاج Loop Over Items؟', o:['دايمًا مع أي items','لما تحتاج دفعات أو Wait بين الطلبات عشان حدود الـ API','عمره ما بيتحتاج','مع IF بس'], a:1, why:'n8n بيلف لوحده. الـ Loop الصريح للدفعات والتحكم في السرعة.'},
      {q:'Error Trigger بيشتغل إمتى؟', o:['كل ساعة','لما Workflow تاني مربوط بيه كـ Error Workflow يفشل','لما تضغط Execute','لما الـ API يرد 200'], a:1, why:'بتربطه من Settings بتاع الـ Workflow الأصلي ← Error Workflow.'},
      {q:'عايز الـ Workflow يكمّل حتى لو نود فشلت ويسجّل الخطأ. تعمل إيه؟', o:['تمسح النود','On Error: Continue (using error output) ووجّه مسار الخطأ','تستخدم Wait','تعطّل الـ Workflow'], a:1, why:'Continue using error output بيديلك مسار منفصل للـ items اللي فشلت.'},
      {q:'الـ Sub-workflow بيرجّع إيه للـ Workflow الرئيسي؟', o:['ولا حاجة','Output آخر نود اتنفذت فيه','أول نود بس','رسالة Telegram'], a:1, why:'Output آخر نود في الـ Sub-workflow بيبقى Output نود Execute Workflow.'},
      {q:'Debug in editor بيعمل إيه؟', o:['بيمسح التشغيلة','بيحمّل بيانات تشغيلة قديمة في الـ Editor عشان تصلّح عليها','بيفعّل الـ Workflow','بيبعت تقرير'], a:1, why:'بيجيب بيانات التشغيلة الفاشلة (كأنها Pinned) عشان تجرّب الحل على نفس البيانات.'}
     ]},

    {d:6, title:'الذكاء الاصطناعي في n8n: Chains وAgents والاستخراج', short:'AI وAgents', hours:'~3 ساعات',
     goal:'تضيف AI يصنّف ويلخّص ويستخرج بيانات منظمة، وتبني Agent بيستخدم أدوات، وتتحكم في الجودة والتكلفة.',
     learn:[
      ['Root node وSub-node','نودات الـ AI بتتبني من نود رئيسية (Basic LLM Chain أو AI Agent أو Text Classifier) ونودات فرعية بتتوصل تحتها: Chat Model، وMemory، وTools، وOutput Parser.','AI Agent\n ├─ Chat Model: Anthropic / OpenAI\n ├─ Memory: Simple Memory\n └─ Tools: HTTP Request Tool, Google Sheets Tool'],
      ['Basic LLM Chain','أبسط شكل: Prompt يدخل ورد يطلع. استخدمه للتلخيص والترجمة والتصنيف البسيط. ركّب عليه Structured Output Parser عشان الرد يبقى JSON ثابت.','Prompt: Classify this message into complaint, question, or order.\nReturn JSON only.\nMessage: {{ $json.text }}'],
      ['نودات جاهزة للمهام الشائعة','Text Classifier بيصنّف لفئات بتحددها وبيطلّع مسار لكل فئة. Information Extractor بيطلّع حقول محددة من نص حر. Sentiment Analysis بيحدد إيجابي أو سلبي.','Text Classifier → complaint | question | order\nInformation Extractor → { invoice_no, amount, due_date }'],
      ['AI Agent والأدوات','الـ Agent بيقرر لوحده يستخدم أنهي أداة. كل Tool ليها وصف واضح، و`$fromAI()` بيخلي الموديل يملا قيمة الباراميتر بنفسه.','Tool: Google Sheets (Get Rows)\nFilter value: {{ $fromAI("customer_email", "email of the customer") }}'],
      ['System Message والـ Prompt الكويس','حدد الدور، والمهمة، والقيود، وشكل الرد، وحط أمثلة. قلّل الـ Temperature للمهام اللي محتاجة دقة.','You are a support triage assistant for an online store.\nRules: answer in the customer\'s language, max 3 sentences.\nIf unsure, say you will escalate to a human.'],
      ['التكلفة والأمان','كل طلب بيتحسب بالـ tokens. حط حد لطول النص، واستخدم موديل أرخص للمهام البسيطة، ومتبعتش بيانات حساسة من غير داعي، وراجع الردود قبل ما تبعتها لعملاء في الأول.','{{ $json.text.slice(0, 2000) }}\nSimple task → موديل صغير\nمهمة معقدة → موديل أقوى']
     ],
     build:[
      'اعمل Credential لموديل (Anthropic أو OpenAI أو Gemini) وحط فيها الـ API Key',
      'Basic LLM Chain يلخّص نص طويل في 3 نقاط بالعربي',
      'ركّب Structured Output Parser بـ JSON Schema (`category` و`urgency` و`summary`) وتأكد إن الرد ثابت',
      'Text Classifier على 10 رسائل عملاء: شكوى / سؤال / طلب شراء، وكل مسار يعمل حاجة مختلفة',
      'Information Extractor يطلّع `name` و`phone` و`product` من رسالة واتساب مكتوبة بشكل حر',
      'AI Agent بـ Simple Memory وTool واحدة (Google Sheets فيها أسعار المنتجات) ويجاوب على أسئلة الأسعار',
      'Telegram Trigger ← AI Agent ← Telegram Send: بوت دعم فني بسيط'
     ],
     code:[
      {u:'Prompt تصنيف ثابت', p:'Classify the customer message.\nCategories: complaint, question, order, other.\nUrgency: low, medium, high.\nReturn ONLY valid JSON: {"category": "...", "urgency": "...", "summary": "..."}\n\nMessage:\n{{ $json.text }}'},
      {u:'JSON Schema لـ Structured Output Parser', p:'{\n  "type": "object",\n  "properties": {\n    "category": { "type": "string", "enum": ["complaint", "question", "order", "other"] },\n    "urgency":  { "type": "string", "enum": ["low", "medium", "high"] },\n    "summary":  { "type": "string" }\n  },\n  "required": ["category", "urgency", "summary"]\n}'},
      {u:'System Message لـ Agent دعم', p:'You are the support assistant for "Nile Store".\n- Always check prices with the "Products" tool before answering.\n- Reply in the same language as the customer (Arabic or English).\n- Max 3 short sentences. No made-up prices.\n- If the customer is angry or asks for a refund, reply: "I will forward this to our team."'},
      {u:'قراءة رد الـ Chain والـ Agent', p:'Basic LLM Chain  → {{ $json.text }}\nمع Output Parser → {{ $json.output.category }}\nAI Agent         → {{ $json.output }}'}
     ],
     challenge:'بوت Telegram للدعم: يستقبل الرسالة ← Text Classifier ← (سؤال: Agent يجاوب من شيت FAQ) / (شكوى: يسجّل في شيت Tickets ويبعتلك تنبيه) / (طلب: Information Extractor ← شيت Orders) ← يرد على العميل في كل الحالات.',
     quiz:[
      {q:'عايز الرد يرجع JSON بنفس الشكل كل مرة. تضيف إيه؟', o:['Memory','Structured Output Parser','Wait','Merge'], a:1, why:'الـ Output Parser بيجبر الرد يطابق Schema محددة.'},
      {q:'إيه الفرق الأساسي بين Basic LLM Chain وAI Agent؟', o:['مفيش','الـ Agent بيقرر يستخدم أدوات ويعمل أكتر من خطوة، والـ Chain Prompt ورد بس','الـ Chain أغلى','الـ Agent مبيحتاجش موديل'], a:1, why:'Chain = طلب واحد. Agent = تفكير وأدوات وخطوات.'},
      {q:'`$fromAI()` بتستخدمه فين؟', o:['في Code node','في باراميتر Tool عشان الموديل يملاه بنفسه','في Cron','في اسم الـ Workflow'], a:1, why:'بيسيب للـ Agent إنه يحدد قيمة الباراميتر وقت التشغيل.'},
      {q:'عايز تطلّع رقم الفاتورة والمبلغ من إيميل. أنسب نود؟', o:['Text Classifier','Information Extractor','Sentiment Analysis','Summarize'], a:1, why:'Information Extractor مخصوص لاستخراج حقول محددة من نص حر.'},
      {q:'أحسن طريقة تقلل تكلفة الـ AI؟', o:['تبعت النص كله دايمًا','تقصّ النص الطويل وتستخدم موديل أصغر للمهام البسيطة','تشيل الـ System Message','تزود الـ Temperature'], a:1, why:'التكلفة بالـ tokens: نص أقصر وموديل مناسب للمهمة.'}
     ]},

    {d:7, title:'الإنتاج والمشروع الختامي', short:'الإنتاج والمشروع', hours:'~3–4 ساعات',
     goal:'تشغّل n8n بشكل احترافي، وتأمّنه، وتنظم شغلك، وتسلّم مشروع كامل تقدر تعرضه على عميل.',
     learn:[
      ['n8n بـ Docker Compose','الطريقة الأشهر للاستضافة. الـ volume بيحفظ البيانات، وN8N_ENCRYPTION_KEY لازم يفضل ثابت، ولو ضاع كل الـ Credentials هتبوظ.','services:\n  n8n:\n    image: docker.n8n.io/n8nio/n8n\n    ports: ["5678:5678"]\n    environment:\n      - N8N_ENCRYPTION_KEY=change-me-long-random\n      - GENERIC_TIMEZONE=Africa/Cairo\n    volumes: [n8n_data:/home/node/.n8n]\nvolumes:\n  n8n_data:'],
      ['متغيرات البيئة المهمة','WEBHOOK_URL بيحدد الرابط العام للـ Webhooks، وN8N_HOST وN8N_PROTOCOL للدومين، وGENERIC_TIMEZONE للتوقيت، وEXECUTIONS_DATA_PRUNE بيمسح التشغيلات القديمة عشان القاعدة متكبرش.','WEBHOOK_URL=https://n8n.mydomain.com/\nEXECUTIONS_DATA_PRUNE=true\nEXECUTIONS_DATA_MAX_AGE=168   # ساعات = 7 أيام'],
      ['تأمين الـ Webhooks','أي Webhook في الإنتاج لازم يتحمى: Header Auth أو Basic Auth في إعدادات الـ Webhook، أو secret تتحقق منه بـ IF.','Webhook → Authentication: Header Auth\nName: X-API-Key   Value: (قيمة طويلة عشوائية)'],
      ['تنظيم احترافي','سمّي كل نود باسم بيقول بيعمل إيه، واستخدم Sticky Notes، واعمل Tags للـ Workflows، وخلي كل Workflow يعمل حاجة واحدة، وصدّر نسخ على GitHub.','❌ HTTP Request1, Edit Fields3\n✅ Get New Leads, Clean Phone, Notify Sales'],
      ['Queue mode (للمعرفة)','لما الحمل يكبر، n8n بيشتغل بـ main بيستقبل وworkers بتنفذ، وRedis بينظم الطابور. مش محتاجه في البداية، بس لازم تعرف إنه موجود.','EXECUTIONS_MODE=queue\n+ Redis + n8n worker × N'],
      ['إزاي تسلّم لعميل','المشكلة ← الحل ← النتيجة بالأرقام، وفيديو قصير، وREADME، وملف JSON من غير أسرار، وتدريب بسيط للعميل على شاشة Executions.','"كان بياخد ساعتين يوميًا في نقل الطلبات ← بقى أوتوماتيك ← وفّر 40 ساعة في الشهر"']
     ],
     build:[
      'شغّل n8n بـ `docker compose up -d` بالملف اللي فوق، واتأكد إن البيانات بتفضل بعد `down` و`up`',
      'انقل الـ Workflows بتاعتك: Export من القديم ← Import في الجديد، وأعد ربط الـ Credentials',
      'أمّن Webhook بـ Header Auth وجرّبه بـ `curl.exe` مرة بالـ header ومرة من غيره',
      'المشروع الختامي: n8n Form Trigger (أو Google Form) ← تنضيف ← AI تصنيف ← Sheet ← إشعار Telegram ← رد إيميل للعميل',
      'ضيف: Validation، وRetry، وError Workflow، وأسماء نودات واضحة، وSticky Notes',
      'اختبر 6 مدخلات: عادي، فاضي، إيميل غلط، نص طويل جدًا، عربي، إنجليزي',
      'صدّر JSON، واكتب README بالإنجليزي، وسجّل فيديو دقيقتين، وارفع كله على GitHub'
     ],
     code:[
      {u:'تشغيل وإدارة n8n بـ Docker', p:'docker compose up -d\ndocker compose logs -f n8n\ndocker compose pull && docker compose up -d   # تحديث\ndocker compose down'},
      {u:'تجربة Webhook محمي', p:'# اعمل body.json فيه: {"name":"Ali","email":"ali@x.com"}\ncurl.exe -X POST "http://localhost:5678/webhook/lead" -H "X-API-Key: my-long-secret" -H "Content-Type: application/json" -d "@body.json"\n\n# من غير الـ header المفروض يرجع 403'},
      {u:'هيكل README للمشروع', p:'# Lead Intake Automation (n8n)\n## Problem\nLeads arrived in 3 places and took 2h/day to copy.\n## Solution\nForm → n8n → AI triage → Google Sheet → Telegram alert → auto-reply.\n## Setup\n1. Import `workflow.json`  2. Add credentials  3. Activate\n## Results\n~40 hours saved per month, response time < 1 min.'},
      {u:'فحص صحة n8n', p:'curl.exe http://localhost:5678/healthz\n# الرد المتوقع: {"status":"ok"}'}
     ],
     challenge:'سلّم المشروع الختامي كأنه لعميل: شغال على Docker، والـ Webhook محمي، وفيه Error Workflow، وREADME وفيديو. وبعدين اشرحه بصوتك في دقيقة واحدة: المشكلة ← الحل ← النتيجة.',
     quiz:[
      {q:'لو ضاع N8N_ENCRYPTION_KEY إيه اللي بيحصل؟', o:['مفيش حاجة','الـ Credentials المحفوظة مش هتتفك وهتحتاج تدخلها من جديد','الـ Workflows بتتمسح','n8n بيعمل مفتاح جديد ويكمّل عادي'], a:1, why:'الـ Credentials متشفّرة بالمفتاح ده. اعمله نسخة احتياطية دايمًا.'},
      {q:'فايدة الـ volume في Docker هنا؟', o:['بيسرّع n8n','بيحفظ البيانات حتى لو الـ container اتمسح','بيفتح المنفذ','بيحدث n8n'], a:1, why:'من غير volume كل حاجة بتضيع مع إعادة إنشاء الـ container.'},
      {q:'WEBHOOK_URL بيتضبط ليه؟', o:['عشان الألوان','عشان n8n يعرف الرابط العام اللي يطلّعه للـ Webhooks ورا Proxy أو دومين','عشان الـ AI','مش مهم'], a:1, why:'من غيره ممكن n8n يطلّع رابط localhost غلط للخدمات الخارجية.'},
      {q:'أحسن طريقة تحمي Webhook في الإنتاج؟', o:['رابط طويل وخلاص','Header Auth أو Basic Auth في إعدادات الـ Webhook','تقفل الـ Workflow','تغيّر المنفذ'], a:1, why:'الرابط الطويل مش أمان. لازم مصادقة حقيقية.'},
      {q:'EXECUTIONS_DATA_PRUNE=true بيعمل إيه؟', o:['بيمسح الـ Workflows','بيمسح بيانات التشغيلات القديمة تلقائيًا','بيقفل الـ Webhooks','بيعيد التشغيل'], a:1, why:'بيمنع قاعدة البيانات إنها تكبر بلا حدود من سجلات التشغيل.'}
     ]}
  ];

  // ---------------- Worked examples ----------------
  var EXAMPLES = [
    {t:'فورم بيسجّل العميل ويبعت تنبيه فوري', lvl:1, cat:'مبيعات', use:'أي بيزنس بيجيله عملاء من فورم: عيادة، كورسات، عقارات.',
     flow:['n8n Form Trigger','Edit Fields','Google Sheets','Telegram'],
     steps:['n8n Form Trigger بحقول: الاسم، الموبايل، الخدمة، ملاحظات','Edit Fields: نضّف الموبايل وضيف `received_at = {{ $now.toISO() }}` و`status = new`','Google Sheets ← Append Row في شيت Leads','Telegram ← رسالة HTML للمبيعات فيها كل البيانات'],
     code:'<b>عميل جديد 🔔</b>\n{{ $json.name }} — {{ $json.phone }}\nالخدمة: {{ $json.service }}', tip:'ضيف رد على الفورم (Form Ending) برسالة شكر، عشان العميل يتأكد إن طلبه وصل.'},
    {t:'تقرير طقس/أخبار يومي', lvl:1, cat:'تقارير', use:'أول Workflow مجدول: API مجاني ← رسالة كل صباح.',
     flow:['Schedule Trigger','HTTP Request','Edit Fields','Telegram'],
     steps:['Schedule: `0 8 * * *` وTimezone = Africa/Cairo','HTTP Request على Open-Meteo بـ `current=temperature_2m`','Edit Fields يبني جملة: الحرارة والنصيحة (ternary)','Telegram يبعت الرسالة'],
     code:'{{ $json.current.temperature_2m > 30\n   ? "حر النهارده 🔥 " + $json.current.temperature_2m + "°"\n   : "الجو لطيف 🌤 " + $json.current.temperature_2m + "°" }}', tip:'بدّل الـ API بأي حاجة: أسعار عملات، أو RSS أخبار، أو بيانات مبيعات من شيت.'},
    {t:'API صغيرة بـ Webhook وValidation', lvl:2, cat:'Backend', use:'موقع أو تطبيق عايز يبعت بيانات لـ n8n ويستنى رد.',
     flow:['Webhook (POST, Header Auth)','IF (valid?)','Postgres / Sheets','Respond to Webhook 200','Respond to Webhook 400'],
     steps:['Webhook: POST، Authentication = Header Auth، Respond = Using Respond to Webhook Node','IF: `{{ $json.body.email?.isEmail() && $json.body.name }}`','true: خزّن البيانات ← Respond 201 بـ `{ "ok": true }`','false: Respond بـ Response Code 400 ورسالة الخطأ'],
     code:'{\n  "ok": false,\n  "error": "email and name are required",\n  "received": {{ JSON.stringify($json.body) }}\n}', tip:'كل مسار لازم ينتهي بـ Respond to Webhook، وإلا اللي بعت الطلب هيفضل مستني لحد الـ timeout.'},
    {t:'تذكير فواتير متأخرة', lvl:2, cat:'مالية', use:'مكتب أو شركة صغيرة عندها فواتير في شيت ومحتاجة تتابع التحصيل.',
     flow:['Schedule (9 AM)','Google Sheets (Get Rows)','Filter (overdue)','Gmail','Google Sheets (Update)'],
     steps:['Get Rows من شيت Invoices (`status = unpaid`)','Filter: `{{ $json.due_date.toDateTime() < $today }}`','Gmail: إيميل مهذب بالمبلغ وعدد أيام التأخير','Update Row: `last_reminder = {{ $today.toISODate() }}` عشان ميتبعتش مرتين في نفس اليوم'],
     code:'Days late: {{ Math.floor($now.diff($json.due_date.toDateTime(), "days").days) }}\nAmount: {{ Number($json.amount).toLocaleString("en-US") }} EGP', tip:'ضيف شرط إن آخر تذكير كان من أكتر من 3 أيام، عشان متزعجش العميل.'},
    {t:'دمج جهات اتصال من مصدرين بدون تكرار', lvl:2, cat:'بيانات', use:'CRM وشيت قديم فيهم نفس العملاء بأشكال مختلفة.',
     flow:['Sheets A','Sheets B','Code (normalize)','Compare Datasets','Sheets (Append new only)'],
     steps:['اقرا المصدرين، ووحّد الإيميل (trim + lowercase) في كل واحد','Compare Datasets على `email`','«In B only» ← Append للمصدر A','«Different» ← راجعها يدوي أو Update'],
     code:'return $input.all().map(i => ({ json: {\n  ...i.json,\n  email: String(i.json.email || "").trim().toLowerCase()\n}}));', tip:'التوحيد قبل المقارنة هو السر، وإلا `Ali@x.com` و`ali@x.com ` هيتحسبوا شخصين.'},
    {t:'ملخص أخبار يومي بالـ AI على Telegram', lvl:2, cat:'محتوى', use:'صفحة أو قناة محتاجة محتوى يومي ملخّص من مصادر ثابتة.',
     flow:['Schedule','RSS Read','Remove Duplicates','Limit 5','Basic LLM Chain','Telegram'],
     steps:['RSS Read من موقع أخبار تقنية','Remove Duplicates (Remove Items Processed in Previous Executions) على `link`، عشان ميبعتش نفس الخبر تاني','Limit 5 ← LLM يلخّص كل خبر في سطرين بالعربي','Telegram يبعت الملخص مع الرابط'],
     code:'Summarize this article in 2 short Arabic sentences for a tech audience.\nTitle: {{ $json.title }}\nContent: {{ ($json.contentSnippet || "").slice(0, 1500) }}', tip:'«Remove Items Processed in Previous Executions» بيفتكر اللي اتبعت قبل كده بين التشغيلات، وده أهم إعداد هنا.'},
    {t:'بوت دعم فني بالذكاء الاصطناعي', lvl:3, cat:'AI', use:'متجر أو خدمة بترد على نفس الأسئلة كل يوم.',
     flow:['Telegram Trigger','Text Classifier','AI Agent + Sheets Tool','Google Sheets (Tickets)','Telegram Send'],
     steps:['Text Classifier: question / complaint / order','question ← AI Agent بـ Tool قراءة شيت FAQ والأسعار، وSimple Memory بـ Session Key = chat id','complaint ← Append في Tickets + تنبيه ليك','كل المسارات ← Telegram Send للعميل على `{{ $("Telegram Trigger").item.json.message.chat.id }}`'],
     code:'Session Key: {{ $("Telegram Trigger").item.json.message.chat.id }}', tip:'الـ Session Key لازم يكون مختلف لكل عميل، وإلا الـ Memory هتخلط محادثات الناس ببعض.'},
    {t:'استخراج بيانات الفواتير من الإيميل', lvl:3, cat:'AI', use:'محاسب أو شركة بيوصلها فواتير كتير بالإيميل.',
     flow:['Gmail Trigger','Filter (has attachment)','Extract From File (PDF)','Information Extractor','Google Sheets'],
     steps:['Gmail Trigger بفلتر `subject:invoice has:attachment` وفعّل Download Attachments','Extract From File ← PDF ← text','Information Extractor: `vendor`, `invoice_no`, `amount`, `currency`, `due_date`','Append في شيت Invoices ولينك الإيميل'],
     code:'Attributes:\nvendor      (string)  company that issued the invoice\ninvoice_no  (string)  invoice number\namount      (number)  total amount due\ndue_date    (date)    YYYY-MM-DD', tip:'الـ PDF المتصوّر (صورة) مفيهوش نص، ومحتاج OCR أو موديل بيقرا صور.'},
    {t:'Error Workflow مركزي', lvl:2, cat:'تشغيل', use:'أي حد عنده أكتر من 3 Workflows شغالة.',
     flow:['Error Trigger','Edit Fields','Telegram','Google Sheets (Error Log)'],
     steps:['Error Trigger ← Edit Fields يجمع: اسم الـ Workflow، وآخر نود، والرسالة، والرابط','Telegram ليك فورًا','Append في شيت Error Log عشان تشوف الأنماط','اربطه من Settings بتاع كل Workflow'],
     code:'{{ $json.workflow.name }} failed at "{{ $json.execution.lastNodeExecuted }}"\n{{ $json.execution.error.message }}\n{{ $json.execution.url }}', tip:'الـ Error Trigger مبيشتغلش لما تجرّب يدوي، لازم الـ Workflow الأصلي يكون متفعّل ويفشل في تشغيلة حقيقية.'},
    {t:'مزامنة API بصفحات لقاعدة بيانات', lvl:3, cat:'بيانات', use:'نقل بيانات من نظام (متجر، CRM) لقاعدة بيانات للتقارير.',
     flow:['Schedule','HTTP Request (Pagination)','Code (map)','Postgres (Upsert)','Telegram (summary)'],
     steps:['HTTP Request بـ Pagination: Update a Parameter in Each Request ← `page = {{ $pageCount + 1 }}`','Complete When: Response Is Empty','Code يوحّد الحقول لأعمدة الجدول','Postgres ← Insert or Update على `id`','رسالة فيها عدد الصفوف'],
     code:'Pagination → Parameters\n  Type: Query   Name: page   Value: {{ $pageCount + 1 }}\nPagination Complete When: Response Is Empty\nLimit Pages Fetched: ✓  Max Pages: 50', tip:'دايمًا حط Max Pages كحماية، عشان API فيه bug ميدخلكش في Loop مالوش آخر.'},
    {t:'موافقة بشرية قبل التنفيذ', lvl:3, cat:'تشغيل', use:'طلبات خصم أو صرف محتاجة موافقة مدير قبل ما تكمّل.',
     flow:['Webhook / Form','Gmail (Send and Wait for Response)','IF (approved)','تنفيذ / رفض'],
     steps:['استقبل الطلب','Gmail ← Operation: Send and Wait for Response ← Approval (موافقة/رفض)','الـ Workflow بيقف لحد ما المدير يضغط','IF على `{{ $json.data.approved }}` ← نفّذ أو ابعت رفض'],
     code:'Subject: Approve discount for {{ $json.customer }}?\nAmount: {{ $json.discount }}%\nReason: {{ $json.reason }}', tip:'نفس الفكرة موجودة في Telegram وSlack (Send and Wait). جرّب اللي فريقك بيستخدمه.'},
    {t:'نسخة احتياطية للـ Workflows على GitHub', lvl:3, cat:'تشغيل', use:'أي n8n في الإنتاج. لو السيرفر وقع، شغلك محفوظ.',
     flow:['Schedule (weekly)','n8n node (Get Many Workflows)','Code','GitHub (Create/Edit File)'],
     steps:['اعمل API Key من Settings ← n8n API واستخدمه في Credential نود n8n','Get Many Workflows','Code: لكل Workflow اسم ملف `{{ name }}.json` والمحتوى JSON.stringify','GitHub ← Edit File (أو Create) في repo خاص'],
     code:'return $input.all().map(i => ({ json: {\n  path: `workflows/${i.json.name.replace(/[^\\w-]+/g, "_")}.json`,\n  content: JSON.stringify(i.json, null, 2)\n}}));', tip:'خلي الـ repo خاص (Private). الـ Workflows ممكن يكون فيها روابط Webhooks وتفاصيل داخلية.'}
  ];

  // examples for every existing glossary term (keyed by term text)
  var TERM_EX = {
    'workflow':'Webhook → Clean Data → Google Sheets → Telegram',
    'node':'HTTP Request, IF, Edit Fields…',
    'trigger':'Schedule Trigger: every day at 09:00',
    'connection':'Get Rows ──▶ Filter (سهم بين نودين)',
    'canvas':'المساحة اللي بتسحب فيها النودات وتوصلها',
    'execution':'Execution #1532 · Succeeded · 1.2s',
    'activate / publish':'Inactive → Active: الـ Schedule والـ Webhook بيشتغلوا لوحدهم',
    'test vs production':'/webhook-test/lead  vs  /webhook/lead',
    'export / import':'Download → workflow.json → Import from File',
    'credentials':'Google Sheets OAuth2 account (مشفّرة)',
    'template':'n8n.io/workflows → Use workflow',
    'sticky note':'Shift+S → "This part cleans phone numbers"',
    'Manual Trigger':'Execute workflow ▶ (للتجربة)',
    'Schedule Trigger':'Cron: 0 9 * * 0-4',
    'Webhook':'POST https://n8n.me/webhook/lead',
    'Google Sheets Trigger':'Trigger On: Row Added · Poll: every minute',
    'polling':'كل دقيقة: «في صف جديد؟»',
    'Telegram Trigger':'Updates: message → {{ $json.message.text }}',
    'Error Trigger':'{{ $json.execution.error.message }}',
    'item':'{ "json": { "name": "Ali" } }',
    'field':'name, email, phone',
    'expression':'{{ $json.price * 1.14 }}',
    'key / value':'"city": "Cairo"',
    'array / object':'[1,2,3]  /  { "a": 1 }',
    'nested':'$json.address.geo.lat',
    'mapping':'Sheet column "Email" ← {{ $json.email }}',
    'binary data':'$binary.data (PDF مرفق)',
    'pin data':'📌 Output ثابت للتجربة',
    'Edit Fields (Set)':'fullName = {{ $json.first }} {{ $json.last }}',
    'Respond to Webhook':'Respond With: JSON · Code: 200',
    'HTTP Request':'GET https://api.github.com/users/n8n-io',
    'IF':'{{ $json.total }} > 1000 → true / false',
    'Filter':'Keep items where status = "paid"',
    'Switch':'Rules: new | paid | refunded | fallback',
    'Merge':'Combine by Matching Fields: id = userId',
    'Sort / Limit':'Sort: amount desc → Limit: 5',
    'Remove Duplicates':'Compare: Selected Fields → email',
    'Aggregate':'10 items → 1 item { names: [...] }',
    'Append / Update Row':'Append or Update · match on: email',
    'Loop Over Items':'Batch Size: 10 → loop / done',
    'Wait':'Resume: After Time Interval · 2 seconds',
    'Execute Workflow':'Workflow: "Clean Phone" (sub-workflow)',
    'Code node':'return $input.all().filter(i => i.json.ok);',
    'Split Out':'Field to Split Out: tags',
    'Date & Time':'Add to Date: 7 days',
    'Summarize':'Sum amount · Group by city',
    'Compare Datasets':'In A only / In B only / Same / Different',
    'Extract From File':'Operation: Extract From PDF',
    'Convert to File':'Operation: Convert to CSV',
    'HTML node':'CSS Selector: div.quote span.text',
    'Postgres node':'Execute Query: SELECT * FROM leads',
    'API':'api.open-meteo.com/v1/forecast',
    'endpoint':'GET /v1/users/{id}',
    'GET / POST':'GET /users  ·  POST /users { … }',
    'query parameter':'?page=2&limit=50',
    'status code':'200 OK · 404 Not Found',
    'OAuth2':'Sign in with Google → Allow',
    'token':'Bearer eyJhbGciOi…',
    'Chat ID':'message.chat.id = 123456789',
    'API key':'X-API-Key: sk_live_…',
    'header':'Content-Type: application/json',
    'body':'{ "title": "Hi", "userId": 1 }',
    'rate limit':'60 requests / minute',
    'pagination':'?page=1 → ?page=2 → … empty',
    'cURL':'curl -H "Authorization: Bearer X" https://…',
    'Retry On Fail':'Max Tries: 3 · Wait: 2000ms',
    'On Error':'Continue (using error output)',
    'Error Workflow':'Settings → Error Workflow: "Error Alert"',
    'Stop and Error':'Error Message: "Invalid email"',
    'Executions log':'Executions → Filter: Error',
    'self-hosted':'docker compose up -d على VPS',
    'n8n Cloud':'yourname.app.n8n.cloud',
    'VPS':'Hetzner / DigitalOcean · 2 vCPU · 4GB',
    'variable':'name = "Ali"',
    'string / int / float / bool':'"Ali" · 30 · 9.5 · True',
    'f-string':'f"Total: {total:.2f}"',
    'condition':'if age >= 18: ... else: ...',
    'loop':'for u in users: print(u["name"])',
    'list':'emails = ["a@x.com", "b@x.com"]',
    'dictionary':'user = {"name": "Ali", "age": 30}',
    'function':'def clean(e): return e.strip().lower()',
    'argument / parameter':'def f(x) ← parameter · f(5) ← argument',
    'return':'return total',
    'exception':'ValueError: invalid literal for int()',
    'try / except':'try: int(x)\nexcept ValueError: 0',
    'library / package':'requests, pandas, fastapi',
    'pip':'pip install requests',
    'virtual environment (venv)':'python -m venv .venv',
    'module / import':'from utils import clean_email',
    'logging':'logging.info("Fetched %d rows", n)',
    'requirements.txt':'requests==2.32.3',
    'FastAPI':'@app.post("/clean")',
    'const / let':'const API = "…"; let count = 0;',
    'arrow function':'const double = x => x * 2;',
    'template literal':'`Hello ${name}`',
    'array / object (JS)':'[1, 2] · { id: 1 }',
    'map / filter / reduce':'arr.map(x => x * 2)',
    'destructuring':'const { name, email } = $json;',
    'spread':'{ ...$json, status: "new" }',
    'optional chaining':'$json.user?.address?.city',
    'throw':'throw new Error("email is required");',
    'async / await':'const r = await this.helpers.httpRequest({...});',
    'regex':'/01[0125]\\d{8}/',
    'quantifier':'\\d{3,5} · a+ · b*',
    'capture group':'(\\d{4})-(\\d{2})',
    'flag':'/abc/gi',
    'tag / element':'<a href="…">link</a>',
    'attribute':'class="price"',
    'CSS selector':'div.product > span.price',
    'scraping':'HTTP Request → HTML → Extract',
    'robots.txt':'Disallow: /admin',
    'table / row / column':'customers · row 5 · email',
    'query':'SELECT * FROM leads;',
    'SELECT / WHERE':"SELECT name FROM leads WHERE city = 'Cairo';",
    'JOIN':'orders JOIN customers ON c.id = o.customer_id',
    'GROUP BY':'SELECT city, COUNT(*) … GROUP BY city',
    'primary key':'id SERIAL PRIMARY KEY',
    'foreign key':'customer_id REFERENCES customers(id)',
    'SQL injection':"'; DROP TABLE users; --",
    'terminal':'PS C:\\Users\\me> ',
    'repository':'github.com/you/n8n-journey',
    'commit':'git commit -m "Add lead workflow"',
    'branch / merge':'git switch -c fix → git merge fix',
    'push / pull / clone':'git push origin main',
    '.gitignore':'.env\nnode_modules/',
    'SSH':'ssh root@203.0.113.10',
    'cron':'0 8 * * *',
    'image':'docker.n8n.io/n8nio/n8n',
    'container':'docker ps → n8n (Up 3 days)',
    'volume':'n8n_data:/home/node/.n8n',
    'docker compose':'docker compose up -d',
    'YAML':'ports:\n  - "5678:5678"',
    'environment variable':'GENERIC_TIMEZONE=Africa/Cairo',
    'LLM':'Claude, GPT, Gemini',
    'prompt':'Summarize in 3 bullet points: {{ $json.text }}',
    'Chat Model':'Anthropic Chat Model',
    'Basic LLM Chain':'Prompt → Model → {{ $json.text }}',
    'AI Agent':'Agent + Tools + Memory',
    'tool':'Calculator, HTTP Request Tool, Sheets Tool',
    'structured output':'{ "category": "complaint" }'
  };
  TERMS.forEach(function(v){ if(TERM_EX[v.t]) v.ex = TERM_EX[v.t]; });

  // new terms, tagged with the sprint day (s) they belong to
  [
    {c:'n8n أساسيات', w:1, s:1, t:'paired item', m:'الربط بين الـ item الخارج والـ item اللي دخل وطلّعه', ex:'{{ $("Webhook").item.json.email }}'},
    {c:'n8n أساسيات', w:1, s:1, t:'$json', m:'بيانات الـ item الحالي من النود اللي قبلها', ex:'{{ $json.email }}'},
    {c:'n8n أساسيات', w:1, s:1, t:'$input', m:'كل الـ items الداخلة للنود الحالية', ex:'$input.all() · $input.first()'},
    {c:'n8n أساسيات', w:1, s:1, t:'$now / $today', m:'الوقت الحالي / بداية النهارده كـ DateTime', ex:'{{ $today.toISODate() }}'},
    {c:'n8n أساسيات', w:1, s:1, t:'parameter (node)', m:'إعداد جوه النود زي URL أو Operation', ex:'Operation: Append Row'},
    {c:'n8n أساسيات', w:1, s:1, t:'Fixed vs Expression', m:'قيمة ثابتة مقابل قيمة محسوبة لكل item', ex:'Fixed: Cairo · Expression: {{ $json.city }}'},
    {c:'n8n أساسيات', w:1, s:1, t:'Schema view', m:'عرض أسماء الحقول وأنواعها، ومنه بتسحب لأي Expression', ex:'drag "email" → {{ $json.email }}'},
    {c:'API وربط', w:2, s:2, t:'HTTP method', m:'نوع الطلب: GET وPOST وPUT وPATCH وDELETE', ex:'PATCH /users/5 { "city": "Giza" }'},
    {c:'API وربط', w:2, s:2, t:'Bearer token', m:'توكن بيتبعت في Authorization header', ex:'Authorization: Bearer abc123'},
    {c:'API وربط', w:2, s:2, t:'Header Auth', m:'Credential بتحط header ثابت في كل طلب', ex:'Name: X-API-Key · Value: sk_…'},
    {c:'API وربط', w:2, s:2, t:'Content-Type', m:'بيعرّف السيرفر شكل الـ body', ex:'application/json · multipart/form-data'},
    {c:'API وربط', w:2, s:2, t:'Import cURL', m:'لصق أمر curl من التوثيق فـ n8n يملا النود', ex:'HTTP Request → Import cURL'},
    {c:'API وربط', w:2, s:2, t:'Fallback Output', m:'مسار Switch للـ items اللي مطابقتش أي قاعدة', ex:'Switch → Options → Fallback Output: Extra Output'},
    {c:'API وربط', w:2, s:2, t:'Combine by Matching Fields', m:'وضع في Merge بيعمل join على حقل مشترك', ex:'Input1.id = Input2.userId'},
    {c:'API وربط', w:3, s:3, t:'Redirect URI', m:'العنوان اللي جوجل بترجّعك عليه بعد تسجيل الدخول', ex:'http://localhost:5678/rest/oauth2-credential/callback'},
    {c:'API وربط', w:3, s:3, t:'scope', m:'الصلاحيات اللي بتطلبها من الحساب', ex:'https://www.googleapis.com/auth/spreadsheets'},
    {c:'Nodes شائعة', w:3, s:3, t:'Append or Update (upsert)', m:'يعدّل لو موجود ويضيف لو مش موجود', ex:'Column to match on: email'},
    {c:'Nodes شائعة', w:3, s:3, t:'Parse Mode', m:'تنسيق رسالة تيليجرام: HTML أو Markdown', ex:'<b>bold</b> · <i>italic</i>'},
    {c:'n8n أساسيات', w:3, s:3, t:'Timezone', m:'منطقة التوقيت للـ Workflow أو الـ instance', ex:'Settings → Timezone: Africa/Cairo'},
    {c:'Nodes شائعة', w:5, s:4, t:'Run Once for All Items', m:'وضع Code بيشتغل مرة على كل الـ items', ex:'const items = $input.all();'},
    {c:'Nodes شائعة', w:5, s:4, t:'Run Once for Each Item', m:'وضع Code بيشتغل لكل item لوحده', ex:'return { json: { ...$json, ok: true } };'},
    {c:'بيانات', w:5, s:4, t:'Luxon', m:'مكتبة التواريخ جوه n8n', ex:'$now.plus({ days: 1 }).toFormat("dd/MM")'},
    {c:'بيانات', w:5, s:4, t:'ISO 8601', m:'الشكل القياسي للتاريخ والوقت', ex:'2026-09-23T14:30:00+03:00'},
    {c:'بيانات', w:5, s:4, t:'data transformation functions', m:'دوال n8n الجاهزة على النصوص والمصفوفات', ex:'.toTitleCase() · .sum() · .isEmail()'},
    {c:'بيانات', w:5, s:4, t:'normalize', m:'توحيد شكل البيانات قبل المقارنة أو الحفظ', ex:'" Ali@X.com " → "ali@x.com"'},
    {c:'بيانات', w:5, s:4, t:'type casting', m:'تحويل نوع لنوع (نص لرقم مثلاً)', ex:'Number("150") · String(20)'},
    {c:'بيانات', w:5, s:4, t:'null / undefined', m:'مفيش قيمة / الحقل مش موجود أصلاً', ex:'$json.phone ?? "N/A"'},
    {c:'أخطاء ونشر', w:9, s:5, t:'batch', m:'دفعة: مجموعة items بتتعالج مع بعض', ex:'Batch Size: 10'},
    {c:'أخطاء ونشر', w:9, s:5, t:'sub-workflow', m:'Workflow بيتنادى من Workflow تاني زي الدالة', ex:'Execute Workflow Trigger → … → رد'},
    {c:'أخطاء ونشر', w:9, s:5, t:'error output', m:'مسار منفصل للـ items اللي فشلت', ex:'On Error: Continue (using error output)'},
    {c:'أخطاء ونشر', w:9, s:5, t:'validation', m:'التحقق من صحة البيانات قبل استخدامها', ex:'{{ $json.email.isEmail() }}'},
    {c:'أخطاء ونشر', w:9, s:5, t:'idempotent', m:'تشغيله مرتين بيدي نفس النتيجة من غير تكرار', ex:'Upsert on email بدل Append'},
    {c:'أخطاء ونشر', w:9, s:5, t:'Debug in editor', m:'تحميل بيانات تشغيلة قديمة في الـ Editor', ex:'Executions → Debug in editor'},
    {c:'أخطاء ونشر', w:9, s:5, t:'Always Output Data', m:'النود تطلّع item فاضي بدل ما توقف المسار', ex:'Settings → Always Output Data ✓'},
    {c:'أخطاء ونشر', w:9, s:5, t:'Execute Once', m:'النود تشتغل على أول item بس', ex:'Settings → Execute Once ✓'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'root node / sub-node', m:'نود AI رئيسية ونودات بتتوصل تحتها', ex:'AI Agent ← Chat Model + Memory + Tools'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'system message', m:'تعليمات ثابتة بتحدد دور وسلوك الموديل', ex:'You are a polite support assistant…'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'temperature', m:'درجة العشوائية: قليلة = دقة، عالية = إبداع', ex:'0.2 للتصنيف · 0.8 للكتابة'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'tokens', m:'وحدات النص اللي بيتحسب عليها السعر والحد', ex:'~4 حروف إنجليزي ≈ 1 token'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'context window', m:'أقصى نص الموديل يقدر يشوفه في طلب واحد', ex:'prompt + history + response'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'memory', m:'بتخلي الـ Agent يفتكر المحادثة', ex:'Simple Memory · Session Key = chat id'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'$fromAI()', m:'الموديل بيملا قيمة باراميتر Tool بنفسه', ex:'{{ $fromAI("email", "customer email") }}'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'Text Classifier', m:'نود بتصنّف النص لفئات وتطلّع مسار لكل فئة', ex:'complaint | question | order'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'Information Extractor', m:'نود بتطلّع حقول محددة من نص حر', ex:'{ invoice_no, amount, due_date }'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'Output Parser', m:'بيجبر رد الموديل يطابق شكل محدد', ex:'Structured Output Parser + JSON Schema'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'embeddings', m:'تحويل النص لأرقام بتعبّر عن معناه', ex:'"refund policy" → [0.12, -0.4, …]'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'vector store', m:'قاعدة بتخزن embeddings للبحث بالمعنى', ex:'Pinecone · Qdrant · Supabase'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'RAG', m:'الموديل يدوّر في مستنداتك قبل ما يجاوب', ex:'Question → Vector Store → Context → Answer'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'hallucination', m:'الموديل يألّف معلومة شكلها صح وهي غلط', ex:'الحل: Tools + «If unsure, say so»'},
    {c:'ذكاء اصطناعي', w:11, s:6, t:'human in the loop', m:'موافقة بشرية قبل خطوة مهمة', ex:'Gmail → Send and Wait for Response'},
    {c:'أخطاء ونشر', w:10, s:7, t:'N8N_ENCRYPTION_KEY', m:'المفتاح اللي بيشفّر الـ Credentials', ex:'N8N_ENCRYPTION_KEY=long-random-string'},
    {c:'أخطاء ونشر', w:10, s:7, t:'WEBHOOK_URL', m:'الرابط العام اللي n8n بيطلّعه للـ Webhooks', ex:'WEBHOOK_URL=https://n8n.me/'},
    {c:'أخطاء ونشر', w:10, s:7, t:'reverse proxy', m:'سيرفر قدام n8n بيدير الدومين وHTTPS', ex:'Caddy · Nginx · Traefik'},
    {c:'أخطاء ونشر', w:10, s:7, t:'SSL / HTTPS', m:'تشفير الاتصال، ومطلوب للـ Webhooks والـ OAuth', ex:"https:// + Let's Encrypt"},
    {c:'أخطاء ونشر', w:10, s:7, t:'queue mode', m:'تشغيل n8n بـ workers وRedis للحمل العالي', ex:'EXECUTIONS_MODE=queue'},
    {c:'أخطاء ونشر', w:10, s:7, t:'execution pruning', m:'مسح سجلات التشغيل القديمة تلقائيًا', ex:'EXECUTIONS_DATA_MAX_AGE=168'},
    {c:'أخطاء ونشر', w:10, s:7, t:'healthcheck', m:'رابط بيأكد إن الخدمة شغالة', ex:'GET /healthz → {"status":"ok"}'},
    {c:'n8n أساسيات', w:12, s:7, t:'tags', m:'تصنيف الـ Workflows عشان تلاقيها', ex:'sales · finance · production'},
    {c:'n8n أساسيات', w:12, s:7, t:'n8n API', m:'API لإدارة الـ Workflows والتشغيلات برمجيًا', ex:'GET /api/v1/workflows · X-N8N-API-KEY'},
    {c:'Nodes شائعة', w:12, s:7, t:'n8n Form Trigger', m:'فورم جاهز من n8n بيشغّل الـ Workflow', ex:'Form Fields: Name, Email, Service'},
    {c:'Nodes شائعة', w:6, s:null, t:'RSS Read', m:'قراءة أخبار أو مقالات من رابط RSS', ex:'URL: https://example.com/feed'},
    {c:'Nodes شائعة', w:6, s:null, t:'Gmail Trigger', m:'بيشتغل مع كل إيميل جديد بيطابق فلتر', ex:'Search: subject:invoice has:attachment'},
    {c:'Nodes شائعة', w:4, s:null, t:'Remove Items Processed in Previous Executions', m:'وضع في Remove Duplicates بيفتكر اللي اتعالج قبل كده', ex:'Value to Dedupe On: {{ $json.link }}'}
  ].forEach(function(v){ TERMS.push(v); });

  // sprint day tags for existing terms
  var SPRINT_TAG = {
    'Respond to Webhook':1,'workflow':1,'node':1,'trigger':1,'execution':1,'item':1,'field':1,'expression':1,'pin data':1,'Edit Fields (Set)':1,'Webhook':1,'test vs production':1,'Manual Trigger':1,'export / import':1,'nested':1,
    'HTTP Request':2,'IF':2,'Filter':2,'Switch':2,'Merge':2,'API':2,'endpoint':2,'GET / POST':2,'query parameter':2,'status code':2,'header':2,'body':2,'API key':2,'cURL':2,'Sort / Limit':2,
    'credentials':3,'OAuth2':3,'token':3,'Chat ID':3,'Google Sheets Trigger':3,'polling':3,'Schedule Trigger':3,'Telegram Trigger':3,'Append / Update Row':3,'mapping':3,'cron':3,
    'Code node':4,'Aggregate':4,'Split Out':4,'Summarize':4,'Date & Time':4,'map / filter / reduce':4,'optional chaining':4,'spread':4,'regex':4,'Remove Duplicates':4,
    'Loop Over Items':5,'Wait':5,'Execute Workflow':5,'Error Trigger':5,'Retry On Fail':5,'On Error':5,'Error Workflow':5,'Stop and Error':5,'Executions log':5,'rate limit':5,'pagination':5,
    'LLM':6,'prompt':6,'Chat Model':6,'Basic LLM Chain':6,'AI Agent':6,'tool':6,'structured output':6,
    'self-hosted':7,'n8n Cloud':7,'VPS':7,'image':7,'container':7,'volume':7,'docker compose':7,'environment variable':7,'sticky note':7
  };
  TERMS.forEach(function(v){ if(v.s === undefined && SPRINT_TAG[v.t]) v.s = SPRINT_TAG[v.t]; });

  // extra quick-reference tabs
  CHEATS.splice(1, 0,
    {id:'helpers', name:'دوال n8n الجاهزة', items:[
      {p:'{{ $json.name.toTitleCase() }}', u:'"ali hassan" ← "Ali Hassan"'},
      {p:'{{ $json.text.extractEmail() }}', u:'يطلّع أول إيميل من نص حر'},
      {p:'{{ $json.url.extractDomain() }}', u:'يطلّع الدومين من رابط'},
      {p:'{{ $json.email.isEmail() }}', u:'true لو الإيميل شكله صحيح'},
      {p:'{{ $json.note.isEmpty() }}', u:'true لو النص فاضي'},
      {p:'{{ $json.prices.sum() }}', u:'مجموع مصفوفة أرقام'},
      {p:'{{ $json.prices.average() }}', u:'متوسط مصفوفة أرقام'},
      {p:'{{ $json.prices.max() }}', u:'أكبر قيمة في مصفوفة'},
      {p:'{{ $json.tags.removeDuplicates() }}', u:'شيل التكرار من مصفوفة'},
      {p:"{{ $json.users.pluck('email') }}", u:'قايمة بحقل واحد من مصفوفة objects'},
      {p:'{{ $json.price.round(2) }}', u:'تقريب لرقمين عشريين'},
      {p:"{{ $ifEmpty($json.phone, 'N/A') }}", u:'قيمة بديلة لو فاضي'},
      {p:"{{ $if($json.total > 1000, 'VIP', 'Regular') }}", u:'شرط مختصر'},
      {p:"{{ $json.created.toDateTime().toFormat('dd/MM/yyyy') }}", u:'نص تاريخ ← تاريخ منسّق'}
    ]},
    {id:'vars', name:'متغيرات n8n', items:[
      {p:'{{ $execution.id }}', u:'رقم التشغيلة الحالية (مفيد في السجلات)'},
      {p:'{{ $execution.mode }}', u:'test أو production'},
      {p:'{{ $workflow.name }}', u:'اسم الـ Workflow'},
      {p:'{{ $workflow.id }}', u:'رقم الـ Workflow'},
      {p:'{{ $itemIndex }}', u:'ترتيب الـ item الحالي (يبدأ من 0)'},
      {p:'{{ $runIndex }}', u:'رقم مرة تشغيل النود (مفيد جوه Loop)'},
      {p:'{{ $prevNode.name }}', u:'اسم النود اللي قبلها'},
      {p:'{{ $input.first().json }}', u:'أول item داخل'},
      {p:'{{ $input.last().json }}', u:'آخر item داخل'},
      {p:'{{ $("Node Name").all().length }}', u:'عدد items نود معيّنة'},
      {p:'{{ $binary.data.fileName }}', u:'اسم الملف المرفق'},
      {p:'{{ $pageCount }}', u:'رقم الصفحة في Pagination بتاع HTTP Request'}
    ]},
    {id:'dates', name:'التواريخ (Luxon)', items:[
      {p:"{{ $now.toFormat('yyyy-MM-dd HH:mm') }}", u:'الوقت الحالي منسّق'},
      {p:"{{ $now.setZone('Africa/Cairo').toFormat('HH:mm') }}", u:'بتوقيت القاهرة'},
      {p:'{{ $today.toISODate() }}', u:'تاريخ النهارده 2026-09-23'},
      {p:'{{ $now.minus({ hours: 24 }).toISO() }}', u:'من 24 ساعة (للفلترة)'},
      {p:"{{ $today.startOf('month').toISODate() }}", u:'أول الشهر'},
      {p:"{{ $today.endOf('month').toISODate() }}", u:'آخر الشهر'},
      {p:"{{ $today.startOf('week').toISODate() }}", u:'أول الأسبوع (الاثنين في Luxon)'},
      {p:"{{ $json.due.toDateTime().diff($today, 'days').days }}", u:'عدد الأيام لحد تاريخ'},
      {p:'{{ $json.due.toDateTime() < $today }}', u:'هل التاريخ فات؟'},
      {p:"{{ $now.toFormat('cccc d LLLL', { locale: 'ar' }) }}", u:'تاريخ بالعربي'},
      {p:'{{ $now.weekday }}', u:'رقم اليوم: 1 = الاثنين … 7 = الأحد'},
      {p:'{{ $now.toMillis() }}', u:'Timestamp بالمللي ثانية'}
    ]}
  );
  CHEATS.forEach(function(c){
    if(c.id === 'expr') c.items.push(
      {p:'{{ $json.items.map(i => i.name).join(", ") }}', u:'أسماء من مصفوفة في سطر واحد'},
      {p:'{{ $json.items.filter(i => i.qty > 0).length }}', u:'عدد العناصر اللي بتحقق شرط'},
      {p:'{{ Object.keys($json).join(", ") }}', u:'أسماء كل الحقول (للتشخيص)'},
      {p:'{{ $json.amount.toLocaleString("en-US") }}', u:'رقم بفواصل 1,250,000'},
      {p:'{{ encodeURIComponent($json.query) }}', u:'نص آمن جوه URL'},
      {p:'{{ $json.body?.email ?? $json.query?.email }}', u:'خد القيمة من أول مكان موجود'}
    );
  });

  // ---------------- library (free books + official docs) ----------------
  // days = sprint days where the "read" part fits
  var LIBRARY = [
    // n8n
    {c:'n8n', t:'n8n Docs: Data structure', url:'https://docs.n8n.io/data/data-structure/', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ', days:[1],
     why:'الصفحة اللي بتشرح شكل الـ items والـ json والـ binary. أهم صفحة في التوثيق كله.', read:'الصفحة كلها (10 دقايق). قارن الأمثلة باللي بتشوفه في Output بتاعك.'},
    {c:'n8n', t:'n8n Docs: Expressions', url:'https://docs.n8n.io/code/expressions/', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ', days:[1,4],
     why:'إزاي تكتب Expressions، والمتغيرات الجاهزة زي $json و$now و$input.', read:'Expressions ← وبعدين صفحة Built-in methods and variables.'},
    {c:'n8n', t:'n8n Course: Level 1', url:'https://docs.n8n.io/courses/level-one/', type:'كورس رسمي مجاني', lang:'EN', lvl:'مبتدئ', days:[1,2,3],
     why:'كورس n8n الرسمي بالنص والصور، وفيه مشروع كامل وشهادة (Badge) لو خلّصته.', read:'الفصول 1–4 في اليوم 1 و2، والباقي في اليوم 3.'},
    {c:'n8n', t:'n8n Course: Level 2', url:'https://docs.n8n.io/courses/level-two/', type:'كورس رسمي مجاني', lang:'EN', lvl:'متوسط', days:[4,5],
     why:'البيانات المعقدة، والدمج، ومعالجة الأخطاء، وAutomating a business workflow.', read:'Understanding data structures و Processing different data types في اليوم 4، وError handling في اليوم 5.'},
    {c:'n8n', t:'n8n Docs: HTTP Request node', url:'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ', days:[2],
     why:'كل إعدادات نود HTTP Request: Authentication، وPagination، وImport cURL.', read:'Node parameters و Pagination.'},
    {c:'n8n', t:'n8n Docs: Google credentials', url:'https://docs.n8n.io/integrations/builtin/credentials/google/', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ', days:[3],
     why:'خطوات إعداد OAuth لجوجل خطوة بخطوة، ولو اتزنقت في redirect_uri أو Test users.', read:'OAuth2 single service ← افتحها جنبك وانت بتعمل الإعداد.'},
    {c:'n8n', t:'n8n Docs: Schedule Trigger', url:'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ', days:[3],
     why:'أنواع الجدولة وCron والـ Timezone.', read:'Custom (Cron) و Common issues.'},
    {c:'n8n', t:'n8n Docs: Code node', url:'https://docs.n8n.io/code/code-node/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[4],
     why:'الوضعين، والمكتبات المتاحة، وإزاي ترجّع البيانات صح.', read:'الصفحة كلها + Code node cookbook.'},
    {c:'n8n', t:'n8n Docs: Data transformation functions', url:'https://docs.n8n.io/code/builtin/data-transformation-functions/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[4],
     why:'قايمة كاملة بالدوال الجاهزة على النصوص والأرقام والمصفوفات والتواريخ.', read:'Strings و Arrays الأول، والباقي مرجع.'},
    {c:'n8n', t:'n8n Docs: Luxon (التواريخ)', url:'https://docs.n8n.io/code/cookbook/luxon/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[4],
     why:'أمثلة جاهزة للتواريخ جوه n8n.', read:'الصفحة كلها، وجرّب كل مثال في Edit Fields.'},
    {c:'n8n', t:'n8n Docs: Looping', url:'https://docs.n8n.io/flow-logic/looping/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[5],
     why:'إمتى n8n بيلف لوحده وإمتى محتاج Loop Over Items.', read:'الصفحة كلها، وخصوصًا Node exceptions.'},
    {c:'n8n', t:'n8n Docs: Error handling', url:'https://docs.n8n.io/flow-logic/error-handling/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[5],
     why:'Error Workflow وError Trigger وإيه البيانات اللي بتوصلك.', read:'الصفحة كلها.'},
    {c:'n8n', t:'n8n Docs: Sub-workflows', url:'https://docs.n8n.io/flow-logic/subworkflows/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[5],
     why:'إزاي تقسم الـ Workflows وتبعت وتستقبل بيانات بينهم.', read:'Create a sub-workflow و Call a sub-workflow.'},
    {c:'n8n', t:'n8n Docs: Advanced AI', url:'https://docs.n8n.io/advanced-ai/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[6],
     why:'Chains وAgents وMemory وTools وRAG في n8n، مع Tutorial كامل.', read:'Tutorial: Build an AI workflow ← وبعدين What is an agent و RAG.'},
    {c:'n8n', t:'n8n Docs: Docker installation', url:'https://docs.n8n.io/hosting/installation/docker/', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[7],
     why:'التشغيل الرسمي بـ Docker وDocker Compose.', read:'Starting n8n و Using with PostgreSQL و Updating.'},
    {c:'n8n', t:'n8n Docs: Environment variables', url:'https://docs.n8n.io/hosting/configuration/environment-variables/', type:'توثيق رسمي', lang:'EN', lvl:'متقدم', days:[7],
     why:'كل إعدادات n8n في الإنتاج.', read:'Deployment و Executions و Timezone. الباقي مرجع وقت الحاجة.'},
    {c:'n8n', t:'n8n Workflow Templates', url:'https://n8n.io/workflows/', type:'مكتبة أمثلة', lang:'EN', lvl:'كل المستويات', days:[2,6,7],
     why:'آلاف الـ Workflows الجاهزة. أحسن طريقة تتعلم بيها إزاي المحترفين بيبنوا.', read:'كل يوم: افتح Template واحد في نفس موضوع اليوم، واستورده، واقرا كل نود فيه.'},
    {c:'n8n', t:'n8n Community Forum', url:'https://community.n8n.io/', type:'منتدى', lang:'EN', lvl:'كل المستويات', days:[],
     why:'أي خطأ هتقابله غالبًا حد سأل عنه قبلك.', read:'الصق رسالة الخطأ بالإنجليزي كاملة في البحث.'},
    // JavaScript
    {c:'JavaScript', t:'Eloquent JavaScript', url:'https://eloquentjavascript.net/', type:'كتاب مجاني', lang:'EN', lvl:'مبتدئ → متوسط', days:[4],
     why:'من أشهر كتب JavaScript، ومتاح كامل أونلاين مجانًا من المؤلف.', read:'الفصول 1–5: القيم، والدوال، وData Structures، وHigher-order functions (map/filter/reduce).'},
    {c:'JavaScript', t:'The Modern JavaScript Tutorial', url:'https://javascript.info/', type:'كتاب تفاعلي مجاني', lang:'EN', lvl:'مبتدئ → متقدم', days:[4],
     why:'شرح منظم جدًا بأمثلة وتمارين بعد كل درس.', read:'Part 1: الفصول 2 و4 و5 (Fundamentals، Objects، Data types). وابدأ بصفحة Array methods.'},
    {c:'JavaScript', t:'javascript.info: Array methods', url:'https://javascript.info/array-methods', type:'درس', lang:'EN', lvl:'مبتدئ', days:[4],
     why:'map وfilter وreduce وsort وfind بالتفصيل، وهي 80% من شغل Code node.', read:'الصفحة كلها + التمارين في الآخر.'},
    {c:'JavaScript', t:'MDN JavaScript Guide', url:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', type:'توثيق رسمي', lang:'EN', lvl:'كل المستويات', days:[],
     why:'المرجع الأدق لأي دالة أو مفهوم في JavaScript.', read:'مرجع: دوّر فيه على أي دالة مش فاهمها.'},
    {c:'JavaScript', t:"You Don't Know JS Yet", url:'https://github.com/getify/You-Dont-Know-JS', type:'سلسلة كتب مجانية', lang:'EN', lvl:'متقدم', days:[],
     why:'لما تحب تفهم JavaScript من جوه: scope وclosures والـ objects.', read:'بعد الـ 12 أسبوع: Get Started ← Scope & Closures.'},
    // Python
    {c:'Python', t:'Automate the Boring Stuff with Python', url:'https://automatetheboringstuff.com/', type:'كتاب مجاني', lang:'EN', lvl:'مبتدئ', days:[],
     why:'كتاب أتمتة بـ Python، يعني نفس عقلية n8n بس بالكود. متاح كامل أونلاين.', read:'الفصول 1–6 (الأساسيات) في الأسبوع 3–4 من خطة الـ 12، و«Web Scraping» و«JSON/CSV» في الأسبوع 7.'},
    {c:'Python', t:'Python for Everybody', url:'https://www.py4e.com/book', type:'كتاب + كورس مجاني', lang:'EN', lvl:'مبتدئ', days:[],
     why:'كتاب وفيديوهات Dr. Chuck، ومناسب جدًا لو أول لغة ليك.', read:'الفصول 1–10، وبعدين 12 (Networked programs) و13 (Web services / JSON).'},
    {c:'Python', t:'Think Python (3rd edition)', url:'https://greenteapress.com/wp/think-python-3rd-edition/', type:'كتاب مجاني', lang:'EN', lvl:'مبتدئ', days:[],
     why:'بيعلّمك تفكر زي المبرمج مش بس تحفظ Syntax.', read:'الفصول 1–11 على مدار أسابيع Python في الخطة.'},
    {c:'Python', t:'The Python Tutorial (الرسمي)', url:'https://docs.python.org/3/tutorial/', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ → متوسط', days:[],
     why:'التوثيق الرسمي، ومختصر ودقيق.', read:'الأقسام 3–8 و10 (Standard Library).'},
    // Web / HTTP / JSON
    {c:'HTTP وJSON', t:'MDN: An overview of HTTP', url:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview', type:'توثيق', lang:'EN', lvl:'مبتدئ', days:[2],
     why:'أوضح شرح لإزاي الطلب والرد بيشتغلوا.', read:'الصفحة كلها (15 دقيقة).'},
    {c:'HTTP وJSON', t:'MDN: HTTP status codes', url:'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', type:'مرجع', lang:'EN', lvl:'مبتدئ', days:[2],
     why:'معنى كل status code.', read:'اقرا 2xx و4xx كويس، والباقي مرجع.'},
    {c:'HTTP وJSON', t:'JSON.org', url:'https://www.json.org/json-en.html', type:'مواصفة رسمية', lang:'EN', lvl:'مبتدئ', days:[1],
     why:'الصفحة الرسمية لصيغة JSON بالرسومات.', read:'الرسومات بس (5 دقايق)، وهتفهم ليه JSON بيرفض فاصلة زيادة.'},
    {c:'HTTP وJSON', t:'crontab.guru', url:'https://crontab.guru/', type:'أداة', lang:'EN', lvl:'مبتدئ', days:[3],
     why:'بتكتب Cron وبيشرحهولك بالإنجليزي على طول.', read:'جرّب فيه كل الـ Cron اللي في اليوم 3.'},
    {c:'HTTP وJSON', t:'MDN: Structuring content with HTML', url:'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content', type:'كورس مجاني', lang:'EN', lvl:'مبتدئ', days:[],
     why:'أساس HTML عشان الـ Scraping وإيميلات HTML.', read:'الوحدات الأولى لحد Lists وLinks.'},
    {c:'HTTP وJSON', t:'CSS Diner', url:'https://flukeout.github.io/', type:'لعبة تعليمية', lang:'EN', lvl:'مبتدئ', days:[],
     why:'بتتعلم CSS selectors وانت بتلعب، ومفيدة لنود HTML.', read:'المراحل 1–20.'},
    // SQL
    {c:'SQL', t:'SQLBolt', url:'https://sqlbolt.com/', type:'دروس تفاعلية', lang:'EN', lvl:'مبتدئ', days:[],
     why:'بتكتب SQL في المتصفح وتشوف النتيجة على طول.', read:'الدروس 1–12 في الأسبوع 8 من الخطة.'},
    {c:'SQL', t:'Select Star SQL', url:'https://selectstarsql.com/', type:'كتاب تفاعلي مجاني', lang:'EN', lvl:'مبتدئ → متوسط', days:[],
     why:'كتاب SQL كامل على بيانات حقيقية، وبتحل جوه الصفحة.', read:'بعد SQLBolt، الكتاب كله.'},
    {c:'SQL', t:'PostgreSQL Tutorial (الرسمي)', url:'https://www.postgresql.org/docs/current/tutorial.html', type:'توثيق رسمي', lang:'EN', lvl:'متوسط', days:[],
     why:'Postgres هي القاعدة اللي n8n بيستخدمها في الإنتاج، وبتشتغل معاها كتير.', read:'Part I: The SQL Language (الفصول 2 و3).'},
    // Git / Linux
    {c:'Git وLinux', t:'Pro Git', url:'https://git-scm.com/book/en/v2', type:'كتاب مجاني', lang:'EN', lvl:'مبتدئ → متقدم', days:[],
     why:'الكتاب الرسمي لـ Git، ومتاح مجانًا على موقع Git.', read:'الفصول 1–3 (Getting Started، Basics، Branching) في الأسبوع 1 من الخطة.'},
    {c:'Git وLinux', t:'Learn Git Branching', url:'https://learngitbranching.js.org/', type:'تفاعلي', lang:'EN', lvl:'مبتدئ', days:[],
     why:'بتتعلم Git بالرسم وانت بتكتب الأوامر.', read:'Main: Introduction Sequence كلها.'},
    {c:'Git وLinux', t:'The Linux Command Line', url:'https://linuxcommand.org/tlcl.php', type:'كتاب مجاني (PDF)', lang:'EN', lvl:'مبتدئ', days:[7],
     why:'مرجع أوامر لينكس، وهتحتاجه لما تستضيف n8n على VPS.', read:'Part 1 (الفصول 1–10) قبل ما تدخل أي سيرفر.'},
    // Docker
    {c:'Docker', t:'Docker for Beginners (Docker Curriculum)', url:'https://docker-curriculum.com/', type:'دليل مجاني', lang:'EN', lvl:'مبتدئ', days:[7],
     why:'شرح Docker من الصفر بمثال عملي.', read:'Introduction و Getting Started و Docker Compose.'},
    {c:'Docker', t:'Docker Docs: Get started', url:'https://docs.docker.com/get-started/', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ', days:[7],
     why:'التوثيق الرسمي: images وcontainers وvolumes.', read:'Docker concepts: The basics.'},
    // Regex
    {c:'Regex', t:'RegexOne', url:'https://regexone.com/', type:'دروس تفاعلية', lang:'EN', lvl:'مبتدئ', days:[4],
     why:'Regex خطوة بخطوة بتمارين.', read:'الدروس 1–10 (ساعة واحدة).'},
    {c:'Regex', t:'regex101', url:'https://regex101.com/', type:'أداة', lang:'EN', lvl:'كل المستويات', days:[4],
     why:'بتجرّب أي نمط وبيشرحلك كل جزء فيه.', read:'اختار Flavor = ECMAScript (JavaScript) عشان يطابق n8n.'},
    {c:'Regex', t:'Regular-Expressions.info', url:'https://www.regular-expressions.info/', type:'مرجع', lang:'EN', lvl:'متوسط', days:[],
     why:'أشمل مرجع Regex مجاني.', read:'Quick Start ← وبعدين مرجع.'},
    // AI
    {c:'AI', t:'Anthropic: Prompt engineering', url:'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', type:'توثيق رسمي', lang:'EN', lvl:'مبتدئ → متوسط', days:[6],
     why:'قواعد كتابة Prompt واضح: الدور، والأمثلة، وشكل الرد.', read:'Be clear and direct و Use examples و Prefill / structured output.'},
    {c:'AI', t:'Prompt Engineering Interactive Tutorial', url:'https://github.com/anthropics/prompt-eng-interactive-tutorial', type:'كورس مجاني', lang:'EN', lvl:'مبتدئ', days:[6],
     why:'كورس Prompting عملي من Anthropic بتمارين.', read:'الفصول 1–6 في اليوم 6، والباقي بعد الأسبوع.'},
    // Arabic
    {c:'عربي', t:'موسوعة حسوب', url:'https://wiki.hsoub.com/', type:'توثيق مترجم', lang:'عربي', lvl:'كل المستويات', days:[],
     why:'توثيق مترجم للعربي لـ JavaScript وPython وSQL وHTML وCSS وغيرهم.', read:'افتحها جنب المرجع الإنجليزي لما تحتاج توضيح بالعربي.'},
    {c:'عربي', t:'موسوعة حسوب: JavaScript', url:'https://wiki.hsoub.com/JavaScript', type:'توثيق مترجم', lang:'عربي', lvl:'مبتدئ → متوسط', days:[4],
     why:'دوال المصفوفات والنصوص بالعربي.', read:'Array و String ← map وfilter وreduce.'},
    {c:'عربي', t:'موسوعة حسوب: Python', url:'https://wiki.hsoub.com/Python', type:'توثيق مترجم', lang:'عربي', lvl:'مبتدئ', days:[],
     why:'مرجع Python بالعربي.', read:'الأنواع الأساسية، والقوائم، والقواميس.'},
    {c:'عربي', t:'موسوعة حسوب: SQL', url:'https://wiki.hsoub.com/SQL', type:'توثيق مترجم', lang:'عربي', lvl:'مبتدئ', days:[],
     why:'أوامر SQL بالعربي.', read:'SELECT و WHERE و JOIN و GROUP BY.'},
    {c:'عربي', t:'كتب أكاديمية حسوب المجانية', url:'https://academy.hsoub.com/files/', type:'كتب مجانية', lang:'عربي', lvl:'كل المستويات', days:[],
     why:'كتب برمجة مجانية بالعربي (PDF) في Python وJavaScript ولينكس وقواعد البيانات وغيرها.', read:'دوّر على كتاب Python أو JavaScript أو لينكس، ونزّله كمرجع عربي جنب الإنجليزي.'}
  ];

  return {REVIEW:REVIEW, WEEKS:WEEKS, LVL:LVL, TRACKS:TRACKS, TERMS:TERMS, CHEATS:CHEATS, ERRORS:ERRORS, PROJECTS:PROJECTS, CAPSTONE:CAPSTONE, SPRINT:SPRINT, EXAMPLES:EXAMPLES, LIBRARY:LIBRARY};
})();
