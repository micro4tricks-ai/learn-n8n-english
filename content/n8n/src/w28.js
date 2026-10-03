// n8n week 28 — Testing, versions, environments and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الاختبار والإصدارات والبيئات ومشروع الشهر', 'Testing, versions, environments and the month project'),
  goal: B('تغيّر في نظام شغال من غير خوف: اختبارات آلية للـ workflows، وكل تغيير في Git، وبيئة تجربة منفصلة عن الإنتاج، وخطة نشر ورجوع.',
          'Change a live system without fear: automated tests for workflows, every change in Git, a test environment separate from production, and a deploy and rollback plan.'),
  days: [
    { title: B('اختبار الـ workflows', 'Testing workflows'),
      goal: B('تعرف إن الـ workflow لسه شغال صح بعد أي تعديل، من غير ما تجرّب بإيدك.', 'Know the workflow still works after any change, without testing by hand.'),
      learn: [
        L(B('fixtures: بيانات اختبار ثابتة', 'Fixtures: fixed test data'),
          B('**fixture** مثال مدخل ثابت ومعروف نتيجته: طلب عادي، طلب من غير موبايل، طلب بمبلغ سالب، رسالة عربي، رسالة فاضية. احفظهم في ملف JSON أو شيت `test_cases` جنب كل workflow. الحالات الغريبة أهم من العادية.', 'A **fixture** is a fixed input example with a known result: a normal order, an order without a phone, one with a negative amount, an Arabic message, an empty message. Keep them in a JSON file or a `test_cases` sheet next to each workflow. The odd cases matter more than the normal ones.'),
          '[{ "name": "normal", "input": {"phone": "01012345678"}, "expected": {"ok": true} },\n { "name": "no phone", "input": {}, "expected": {"ok": false, "error": "missing phone"} }]'),
        L(B('الـ sub-workflows سهل تختبرها', 'Sub-workflows are easy to test'),
          B('عشان الخدمة sub-workflow بمدخلات ومخرجات واضحة، تقدر تناديها بكل fixture وتقارن الرد بالمتوقع. ده سبب تاني إنك تقسم النظام لخدمات صغيرة: كل واحدة ليها اختباراتها.', 'Because a service is a sub-workflow with clear inputs and outputs, you can call it with each fixture and compare the reply with the expected one. Another reason to split the system into small services: each has its own tests.'),
          'Test runner → read test_cases → for each → Execute Workflow [svc: format phone]\n→ compare output with expected → collect pass/fail'),
        L(B('test runner workflow', 'A test runner workflow'),
          B('workflow اسمه `tests: run all` (يدوي أو كل ليلة) بيمشي على الاختبارات، ويقارن، ويطلّع تقرير: كام نجح وكام فشل وإيه الفرق. شغّله قبل أي نشر. ولو فيه فشل، الرسالة تقول الحالة واللي اتوقعته واللي طلع.', 'A workflow named `tests: run all` (manual or nightly) walks through the tests, compares, and outputs a report: how many passed, how many failed, and what differed. Run it before every deploy. If something fails, the message names the case, the expected and the actual result.'),
          "const fails = $input.all().filter(i => JSON.stringify(i.json.actual) !== JSON.stringify(i.json.expected));\nreturn [{ json: { total: $input.all().length, failed: fails.length,\n  details: fails.map(f => `${f.json.name}: expected ${JSON.stringify(f.json.expected)}, got ${JSON.stringify(f.json.actual)}`) } }];")
      ],
      practice: [
        B('اكتب 8 fixtures لخدمة عندك (4 منهم حالات غريبة).', 'Write 8 fixtures for one of your services (4 of them odd cases).'),
        B('ابني test runner بيناديها ويقارن.', 'Build a test runner that calls it and compares.'),
        B('غيّر الخدمة عمدًا بغلطة وشوف الاختبار بيمسكها.', 'Break the service on purpose and see the test catch it.'),
        B('خلّي الـ runner يشتغل كل ليلة ويبعت تقرير لو فيه فشل بس.', 'Run the runner nightly and send a report only when something fails.')
      ],
      words: [
        W('test fixture', 'مثال مدخل ثابت للاختبار نتيجته معروفة', 'a fixed test input with a known result', 'Add a test fixture for an empty message.'),
        W('expected output', 'النتيجة اللي المفروض تطلع', 'the result that should come out', 'Compare the reply with the expected output.'),
        W('test runner', 'أداة أو workflow بيشغّل الاختبارات ويقارن', 'a tool or workflow that runs tests and compares', 'Run the test runner before each deploy.'),
        W('edge input', 'مدخل غريب أو على الحدود', 'an unusual or borderline input', 'A negative amount is an edge input.'),
        W('pass rate', 'نسبة الاختبارات اللي نجحت', 'the share of tests that passed', 'The pass rate must be 100% to deploy.')
      ],
      read: ['lib:n8n Docs: Data pinning', { lib: 'n8n Docs: Sub-workflows', what: B('فكّر في كل sub-workflow كوحدة تتختبر لوحدها.', 'Think of each sub-workflow as a unit tested on its own.') }],
      challenge: B('اعمل اختبارات لـ 3 خدمات (24 fixture على الأقل) وtest runner بتقرير، واكتشف بيه غلطة حقيقية واحدة على الأقل في كودك القديم.', 'Write tests for 3 services (at least 24 fixtures) and a test runner with a report, and use it to find at least one real bug in your old work.'),
      quiz: [
        Q(B('أهم fixtures:', 'The most valuable fixtures:'), [['الحالات الغريبة والحدود', 'odd and borderline cases'], ['الحالة العادية بس', 'only the normal case'], ['بيانات عملاء حقيقية', 'real customer data']], 0, B('الأعطال بتيجي منها.', 'Failures come from them.')),
        Q(B('ليه الـ sub-workflows أسهل في الاختبار؟', 'Why are sub-workflows easier to test?'), [['مدخلات ومخرجات واضحة', 'clear inputs and outputs'], ['أسرع', 'faster'], ['مش محتاجة اختبار', 'they need no tests']], 0, B('تناديها وتقارن.', 'Call and compare.')),
        Q(B('تقرير الاختبار الفاشل لازم يقول:', 'A failed test report must say:'), [['الحالة والمتوقع واللي طلع', 'the case, the expected and the actual'], ['«فيه مشكلة» بس', 'just «there is a problem»'], ['ولا حاجة', 'nothing']], 0, B('عشان تصلّح بسرعة.', 'So you can fix it fast.'))
      ] },

    { title: B('بيانات تجريبية وخدمات وهمية', 'Mock data and fake services'),
      goal: B('تختبر من غير ما تبعت إيميلات حقيقية أو تلمس بيانات العملاء.', 'Test without sending real emails or touching customer data.'),
      learn: [
        L(B('وضع التجربة (dry run)', 'Dry-run mode'),
          B('flag في الإعدادات `dry_run: true` بيخلّي كل نود «فعل» (إيميل، رسالة، دفع، كتابة في CRM) يتبدّل بتسجيل «كان هيبعت كذا». IF قبل كل فعل، أو خدمة `svc: notify` نفسها بتحترم الـ flag. كده تختبر الـ workflow كامل بأمان.', 'A settings flag `dry_run: true` turns every «action» node (email, message, payment, CRM write) into a log line «would have sent this». An IF before each action, or `svc: notify` itself respects the flag. You can then test the whole workflow safely.'),
          'svc: notify\n  IF config.dry_run → append to test_log { channel, to, text }\n  else → send for real'),
        L(B('خدمات وهمية', 'Fake services'),
          B('بدل API الحقيقي في الاختبار، اعمل webhook صغير في n8n بيقلّد ردوده (نجاح، 429، 500، رد بطيء) حسب بارامتر. أو استخدم أدوات زي webhook.site وhttpbin. وخلّي عنوان الـ API في الإعدادات عشان تبدّله بين الحقيقي والوهمي.', 'Instead of the real API in tests, make a small n8n webhook that imitates its replies (success, 429, 500, a slow reply) depending on a parameter. Or use tools like webhook.site and httpbin. Keep the API address in settings so you can swap between real and fake.'),
          'config.crm_base_url = "https://crm.example.com/api"        # production\nconfig.crm_base_url = "https://n8n.local/webhook/fake-crm"  # tests\nfake-crm?mode=429 → Respond 429 with Retry-After: 2'),
        L(B('بيانات وهمية واقعية', 'Realistic mock data'),
          B('بيانات الاختبار لازم تشبه الحقيقة: أسماء عربي وإنجليزي، أرقام بأشكال مختلفة، حقول ناقصة، نصوص طويلة. ولّدها بـ Code node أو AI، **ومتنسخش** بيانات عملاء حقيقيين لبيئة التجربة.', 'Test data must look like the real thing: Arabic and English names, numbers in different forms, missing fields, long texts. Generate it with a Code node or an AI, and **never copy** real customers’ data into the test environment.'),
          "const names = ['سارة أحمد', 'Omar Ali', 'منى', ''];\nreturn Array.from({ length: 20 }, (_, i) => ({ json: {\n  name: names[i % names.length], phone: i % 5 ? '010' + String(10000000 + i) : null } }));")
      ],
      practice: [
        B('ضيف dry_run لـ workflow فيه 3 أفعال واختبره كامل.', 'Add dry_run to a workflow with 3 actions and test it fully.'),
        B('اعمل fake CRM webhook بيرد بأشكال مختلفة حسب mode.', 'Build a fake CRM webhook that replies differently by mode.'),
        B('ولّد 50 عميل وهمي واقعي.', 'Generate 50 realistic fake customers.'),
        B('بدّل عنوان الـ API من الإعدادات واتأكد إن مفيش عنوان مكتوب في نود.', 'Swap the API address from settings and check no address is typed into a node.')
      ],
      words: [
        W('dry run', 'تشغيل تجريبي بيسجّل الأفعال من غير ما ينفّذها', 'a trial run that logs actions without doing them', 'Run the campaign as a dry run first.'),
        W('mock data', 'بيانات وهمية شبه الحقيقية للاختبار', 'fake data that looks real, for testing', 'Generate mock data with Arabic names.'),
        W('fake service', 'خدمة وهمية بتقلّد ردود خدمة حقيقية', 'a pretend service that imitates a real one’s replies', 'The fake service returns 429 on demand.'),
        W('endpoint swap', 'تبديل عنوان API بين الحقيقي والوهمي من الإعدادات', 'switching an API address between real and fake from settings', 'An endpoint swap points tests at the fake CRM.'),
        W('test log', 'سجل بيكتب فيه اللي كان هيتعمل', 'a log of what would have been done', 'Check the test log after the dry run.')
      ],
      read: ['lib:Webhook.site', 'lib:httpbin'],
      challenge: B('خلّي مشروعك كله يتختبر في dry run بخدمات وهمية: صفر إيميلات حقيقية، وكل الأفعال في test_log، وتقرير بالمقارنة مع المتوقع.', 'Make your whole project testable in dry run with fake services: zero real emails, every action in test_log, and a report compared with the expected.'),
      quiz: [
        Q(B('dry run بيعمل:', 'A dry run:'), [['يسجّل الأفعال من غير تنفيذ', 'logs actions without doing them'], ['يبعت لكل العملاء', 'sends to every customer'], ['يمسح البيانات', 'deletes the data']], 0, B('اختبار آمن.', 'Safe testing.')),
        Q(B('بيانات عملاء حقيقيين في بيئة التجربة:', 'Real customer data in the test environment:'), [['لأ', 'no'], ['عادي', 'fine'], ['لو قليلة', 'if only a little']], 0, B('خصوصية وأمان.', 'Privacy and safety.')),
        Q(B('عشان تبدّل بين API حقيقي ووهمي:', 'To swap between a real and a fake API:'), [['العنوان في الإعدادات', 'keep the address in settings'], ['تعدّل كل نود', 'edit every node'], ['مستحيل', 'impossible']], 0, B('مكان واحد.', 'One place.'))
      ] },

    { title: B('الإصدارات في Git', 'Versions in Git'),
      goal: B('كل تغيير مسجّل ومفهوم، وتقدر ترجع لأي نسخة.', 'Every change is recorded and understood, and you can go back to any version.'),
      learn: [
        L(B('سجل الـ workflow وGit', 'Workflow history and Git'),
          B('n8n بيحفظ نسخ قديمة لكل workflow (history) — مفيد للرجوع السريع. بس Git أقوى: كل المشروع مع بعض، ورسائل commit بتشرح ليه، وdiff بيوريك اللي اتغير، وbackup بره السيرفر. صدّر بـ CLI أو n8n API واعمل commit بانتظام.', 'n8n keeps old versions of each workflow (history) — handy for a quick rollback. But Git is stronger: the whole project together, commit messages explaining why, a diff showing what changed, and a backup off the server. Export with the CLI or the n8n API and commit regularly.'),
          'n8n export:workflow --all --separate --pretty --output=workflows/\ngit add workflows/ && git commit -m "Add retry to CRM sync"'),
        L(B('diff مقروء', 'A readable diff'),
          B('ملف الـ workflow JSON فيه حاجات بتتغيّر من غير سبب (مكان النود، ids). عشان الـ diff يبقى مفهوم: صدّر بـ `--pretty`، وممكن script صغير يرتّب المفاتيح ويشيل `updatedAt`. وفي الـ commit اكتب التغيير بالكلام.', 'A workflow JSON file has fields that change for no real reason (node positions, ids). To keep the diff readable: export with `--pretty`, and maybe a small script that sorts keys and removes `updatedAt`. In the commit, describe the change in words.'),
          'git diff workflows/crm-sync.json\n-  "timeout": 10000\n+  "timeout": 15000\n+  "retryOnFail": true'),
        L(B('tags للإصدارات', 'Tags for releases'),
          B('لما تنشر نسخة مستقرة للإنتاج، اعمل tag في Git: `git tag v1.4.0 -m "Bookings: WhatsApp fallback"`. كده تعرف بالظبط إيه اللي كان شغال يوم كذا، وترجع له لو حصلت مشكلة. واكتب سطرين في ملف CHANGELOG.', 'When you deploy a stable version to production, tag it in Git: `git tag v1.4.0 -m "Bookings: WhatsApp fallback"`. You then know exactly what was running on a given day, and can go back to it if there is a problem. Add two lines to a CHANGELOG file.'),
          'git tag v1.4.0 -m "Bookings: WhatsApp fallback"\ngit push --tags\nCHANGELOG: v1.4.0 — email fallback when WhatsApp fails; retry on CRM 429')
      ],
      practice: [
        B('صدّر كل الـ workflows بـ --pretty واعمل أول commit.', 'Export every workflow with --pretty and make the first commit.'),
        B('عدّل حاجة صغيرة وشوف الـ diff، واكتب commit message كويسة.', 'Make a small change, look at the diff, and write a good commit message.'),
        B('اعمل tag لأول إصدار وCHANGELOG.', 'Tag the first release and start a CHANGELOG.'),
        B('اعمل workflow بيصدّر ويعمل commit كل ليلة (Execute Command أو API).', 'Build a workflow that exports and commits every night (Execute Command or the API).')
      ],
      words: [
        W('release tag', 'علامة في Git على نسخة اتنشرت', 'a Git marker on a version that was deployed', 'Create a release tag for v1.4.0.'),
        W('version history', 'كل النسخ القديمة لملف أو workflow', 'all the older versions of a file or workflow', 'Open the version history to compare.'),
        W('semantic versioning', 'ترقيم إصدارات كبير.متوسط.صغير', 'numbering releases major.minor.patch', 'v1.4.0 follows semantic versioning.'),
        W('pretty print', 'كتابة JSON بمسافات وسطور مقروءة', 'writing JSON with readable spaces and lines', 'Pretty print the export for clean diffs.'),
        W('change log', 'ملف بيسجّل التغييرات في كل إصدار', 'a file recording the changes in each release', 'Update the change log before tagging.')
      ],
      read: ['lib:n8n Docs: CLI commands', 'lib:Pro Git'],
      challenge: B('اعمل backup آلي لكل الـ workflows في repo خاص على GitHub كل ليلة، بـ commit message فيها أسماء اللي اتغيّر، وtags للإصدارات اللي بتنشرها.', 'Set up an automatic nightly backup of all workflows to a private GitHub repo, with a commit message naming what changed, and tags for the releases you deploy.'),
      quiz: [
        Q(B('ميزة Git عن history الـ workflow:', 'Git’s advantage over workflow history:'), [['المشروع كله وأسباب التغيير وbackup بره', 'the whole project, reasons for changes, and an off-server backup'], ['أسرع', 'faster'], ['مفيش فرق', 'no difference']], 0, B('مرجع كامل.', 'A full record.')),
        Q(B('`--pretty` في التصدير مفيد عشان:', '`--pretty` in exports helps because:'), [['الـ diff يبقى مقروء', 'the diff stays readable'], ['الملف أصغر', 'the file is smaller'], ['يشغّل أسرع', 'it runs faster']], 0, B('سطور واضحة.', 'Clear lines.')),
        Q(B('v2.0.0 بعد v1.9.3 معناها غالبًا:', 'v2.0.0 after v1.9.3 usually means:'), [['تغيير كبير ممكن يكسر', 'a big, possibly breaking change'], ['إصلاح صغير', 'a small fix'], ['نفس الإصدار', 'the same release']], 0, B('الرقم الكبير.', 'The major number.'))
      ] },

    { title: B('البيئات: تطوير وتجربة وإنتاج', 'Environments: development, staging and production'),
      goal: B('تجرّب في مكان آمن وتنقل للإنتاج بخطوات واضحة.', 'Try things in a safe place and move to production with clear steps.'),
      learn: [
        L(B('3 بيئات', 'Three environments'),
          B('**dev** (عندك: تجرب وتكسر)، **staging** (نسخة شبه الإنتاج ببيانات وهمية: الاختبار النهائي)، **production** (العملاء الحقيقيين: محدش يعدّل فيها مباشرة). أبسط تطبيق: سيرفرين n8n (أو حساب cloud + محلي)، وكل واحد ليه credentials وإعدادات خاصة بيه.', '**dev** (yours: try and break), **staging** (a near-copy of production with fake data: the final test), **production** (real customers: nobody edits it directly). The simplest setup: two n8n servers (or a cloud account + a local one), each with its own credentials and settings.'),
          'dev (laptop) → staging (small VPS, fake data) → production (main server)\neach: own credentials · own config · own webhook URLs'),
        L(B('الترقية من بيئة لبيئة', 'Promoting between environments'),
          B('الـ workflow بيتنقل كـ JSON (Git، أو export/import، أو n8n API، أو ميزة Source control في النسخ اللي بتدعمها). الحاجات اللي بتختلف بين البيئات (عناوين، chat ids، أسماء credentials) لازم تيجي من الإعدادات أو `$env` — مش مكتوبة في النود — وإلا هتبعت من staging للعملاء الحقيقيين.', 'A workflow moves as JSON (Git, export/import, the n8n API, or the Source control feature on editions that support it). Whatever differs between environments (URLs, chat ids, credential names) must come from settings or `$env` — not typed into the node — or staging will send to real customers.'),
          'staging: CRM_BASE_URL=https://n8n-staging/webhook/fake-crm\nprod:    CRM_BASE_URL=https://crm.example.com/api\nnode:    {{ $env.CRM_BASE_URL }}/contacts'),
        L(B('تطابق البيئات', 'Environment parity'),
          B('staging لازم تشبه الإنتاج: نفس إصدار n8n، نفس الـ community nodes، نفس متغيّرات البيئة (بقيم مختلفة). لو مختلفين، الاختبار في staging مالوش قيمة. اكتب ملف `.env.example` بكل المتغيّرات المطلوبة.', 'Staging must match production: the same n8n version, the same community nodes, the same environment variables (with different values). If they differ, testing on staging is worthless. Keep a `.env.example` with every required variable.'),
          '.env.example\nN8N_VERSION=1.x\nCRM_BASE_URL=\nALERTS_CHAT_ID=\nDRY_RUN=false')
      ],
      practice: [
        B('شغّل n8n تاني (Docker) كـ staging بإعدادات مختلفة.', 'Run a second n8n (Docker) as staging with different settings.'),
        B('انقل workflow من dev لـ staging بـ export/import.', 'Move a workflow from dev to staging with export/import.'),
        B('دوّر على أي قيمة خاصة بالبيئة مكتوبة في نود وطلّعها لـ $env.', 'Find any environment-specific value typed into a node and move it to $env.'),
        B('اكتب .env.example للمشروع.', 'Write a .env.example for the project.')
      ],
      words: [
        W('staging', 'بيئة شبه الإنتاج للاختبار النهائي', 'a near-production environment for final testing', 'Test the release on staging first.'),
        W('production', 'البيئة الحقيقية اللي العملاء بيستخدموها', 'the real environment customers use', 'Never edit production directly.'),
        W('promote', 'تنقل نسخة من بيئة للبيئة الأعلى', 'to move a version up to the next environment', 'Promote the workflow from staging to production.'),
        W('environment parity', 'إن البيئات تبقى شبه بعض قدر الإمكان', 'keeping environments as alike as possible', 'Environment parity makes staging tests meaningful.'),
        W('source control', 'تتبع التغييرات بأداة زي Git', 'tracking changes with a tool like Git', 'Use source control for all workflows.')
      ],
      read: ['lib:n8n Docs: Source control and environments', 'lib:n8n Docs: Environment variables'],
      challenge: B('اعمل dev وstaging حقيقيين: نفس الـ workflows بإعدادات مختلفة، وانقل تغيير من dev لـ staging عن طريق Git، واتأكد إن staging مبيبعتش لأي عنوان حقيقي.', 'Set up real dev and staging: the same workflows with different settings; move a change from dev to staging through Git, and make sure staging never sends to a real address.'),
      quiz: [
        Q(B('مين بيعدّل في الإنتاج مباشرة؟', 'Who edits production directly?'), [['محدش', 'nobody'], ['أي حد', 'anyone'], ['العميل', 'the client']], 0, B('التغيير بيعدّي على staging.', 'Changes go through staging.')),
        Q(B('عنوان API مكتوب في نود وانت بتنقل لـ staging:', 'An API address typed into a node when moving to staging:'), [['خطر: staging ممكن تكلم الإنتاج', 'danger: staging may call production'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('من $env أو الإعدادات.', 'Use $env or settings.')),
        Q(B('تطابق البيئات يعني:', 'Environment parity means:'), [['نفس الإصدارات والمتغيّرات بقيم مختلفة', 'same versions and variables, different values'], ['نفس البيانات الحقيقية', 'the same real data'], ['سيرفر واحد', 'one server']], 0, B('عشان الاختبار يبقى له معنى.', 'So testing means something.'))
      ] },

    { title: B('النشر والرجوع', 'Deploying and rolling back'),
      goal: B('تنشر بخطة، وتعرف ترجع في دقيقة لو حاجة باظت.', 'Deploy with a plan, and know how to go back in a minute if something breaks.'),
      learn: [
        L(B('checklist قبل النشر', 'The pre-deploy checklist'),
          B('قبل أي نشر: الاختبارات 100%؟ dry run في staging؟ المتغيّرات الجديدة موجودة في الإنتاج؟ الـ credentials متوصّلة؟ الـ error workflow مربوط؟ فيه backup؟ وقت النشر مناسب (مش الخميس بالليل قبل الويك إند)؟', 'Before any deploy: tests at 100%? A dry run on staging? New variables present in production? Credentials connected? Error workflow linked? A backup exists? Is the timing right (not Thursday night before the weekend)?'),
          '☐ tests 100%  ☐ staging dry run  ☐ new env vars in prod  ☐ credentials\n☐ error workflow linked  ☐ backup + tag  ☐ deploy window agreed'),
        L(B('بعد النشر: smoke test والمراقبة', 'After deploying: smoke test and watching'),
          B('أول ما تنشر: **smoke test** — حالة حقيقية صغيرة واحدة من الأول للآخر (طلب تجريبي باسمك). وبعدين راقب ساعة: التنفيذات، الأخطاء، الطابور. متمشيش بعد النشر على طول.', 'Right after deploying: a **smoke test** — one small real case from start to finish (a test order in your name). Then watch for an hour: executions, errors, the queue. Do not walk away right after a deploy.'),
          'deploy → smoke test (1 real order) → watch executions 60 min\n→ all good → announce · problems → roll back'),
        L(B('خطة الرجوع', 'The rollback plan'),
          B('قبل النشر اعرف ترجع إزاي: النسخة القديمة متصدّرة ومعمول لها tag، وخطوة الرجوع مكتوبة (import القديم + activate)، والأحداث اللي جت وقت المشكلة في الطابور تتعاد بعد الرجوع. لو الرجوع بياخد أكتر من 5 دقايق، الخطة محتاجة تتحسن.', 'Before deploying, know how to go back: the old version exported and tagged, the rollback step written (import the old one + activate), and events that arrived during the problem replayed from the queue afterwards. If rolling back takes more than 5 minutes, the plan needs work.'),
          'rollback v1.4.0 → v1.3.2:\n1. git checkout v1.3.2 -- workflows/bookings.json\n2. n8n import:workflow --input=workflows/bookings.json\n3. activate · 4. replay events from 14:00')
      ],
      practice: [
        B('اكتب checklist نشر لمشروعك واطبعه.', 'Write a deploy checklist for your project and print it.'),
        B('اعمل نشر حقيقي من staging للإنتاج باتباعه.', 'Do a real deploy from staging to production following it.'),
        B('اعمل smoke test وراقب ساعة.', 'Run a smoke test and watch for an hour.'),
        B('جرّب rollback متعمد وقيس الوقت.', 'Try a deliberate rollback and time it.')
      ],
      words: [
        W('smoke test', 'اختبار سريع لحالة واحدة من الأول للآخر بعد النشر', 'a quick end-to-end check of one case after deploying', 'Run a smoke test with a test order.'),
        W('pre-flight check', 'فحص قبل البدء زي الطيارين', 'a check before starting, like pilots do', 'The pre-flight check found a missing variable.'),
        W('deploy window', 'الوقت المتفق عليه للنشر', 'the agreed time for deploying', 'Our deploy window is Sunday morning.'),
        W('roll back', 'ترجع لنسخة قديمة شغالة', 'to return to an older working version', 'Roll back to v1.3.2 in two minutes.'),
        W('hotfix', 'إصلاح سريع ومستعجل في الإنتاج', 'a quick, urgent fix in production', 'Ship the hotfix after a staging check.')
      ],
      read: ['lib:n8n Docs: Export and import', { lib: 'n8n Docs: Updating self-hosted n8n', what: B('اقرا خطوات التحديث وفكّر في خطة الرجوع.', 'Read the update steps and think about the rollback plan.') }],
      challenge: B('اعمل «يوم نشر» كامل: checklist، نشر لنسخة جديدة، smoke test، مراقبة، وrollback متعمد ورجوع للنسخة الجديدة — واكتب تقرير قصير بالأوقات.', 'Run a full «deploy day»: checklist, deploy a new version, smoke test, watching, a deliberate rollback and back to the new version — and write a short report with the times.'),
      quiz: [
        Q(B('smoke test هو:', 'A smoke test is:'), [['حالة حقيقية صغيرة من الأول للآخر', 'one small real case end to end'], ['كل الاختبارات', 'every test'], ['اختبار الأداء', 'a performance test']], 0, B('بعد النشر على طول.', 'Right after deploying.')),
        Q(B('أحسن وقت للنشر:', 'The best time to deploy:'), [['وقت متفق عليه وانت موجود تراقب', 'an agreed time when you are there to watch'], ['قبل ما تمشي على طول', 'right before you leave'], ['بالليل في الويك إند', 'at night on the weekend']], 0, B('عشان تلحق المشاكل.', 'To catch problems.')),
        Q(B('خطة رجوع كويسة بتاخد:', 'A good rollback plan takes:'), [['دقايق قليلة', 'a few minutes'], ['يوم', 'a day'], ['مش محتاجين خطة', 'no plan needed']], 0, B('اكتبها وجرّبها.', 'Write it and test it.'))
      ] },

    { title: B('مراجعة الشهر السابع ومشروعه', 'Month 7 review and project'),
      goal: B('تجمع معمارية الشهر كله في نظام إنتاج حقيقي.', 'Bring the whole month’s architecture together in a real production system.'),
      review: [
        B('الأنماط والخدمات والإعدادات والطوابير والتوثيق (أسبوع 25).', 'Patterns, services, settings, queues and docs (week 25).'),
        B('الـ binary والتحويل والدمج والتجميع والبيانات الكبيرة (أسبوع 26).', 'Binary, conversion, merging, aggregation and big data (week 26).'),
        B('أنواع الفشل والإعادة والـ idempotency والـ DLQ وقاطع الدائرة (أسبوع 27).', 'Failure families, retries, idempotency, the DLQ and circuit breakers (week 27).'),
        B('الاختبار بالـ fixtures والـ dry run والخدمات الوهمية.', 'Testing with fixtures, dry runs and fake services.'),
        B('Git والـ tags والبيئات والنشر والرجوع.', 'Git, tags, environments, deploying and rolling back.')
      ],
      project: B('مشروع الشهر السابع: «منصة طلبات للإنتاج» لمحل أو عيادة: استقبال بطابور، خدمات (notify، find customer، format phone، call with retry)، dead letter وإعادة، قاطع دائرة وقناة بديلة، تقارير بالـ Summarize، 30 اختبار fixture وtest runner، dev وstaging، Git بـ tags، وchecklist نشر وخطة رجوع مجرّبة. سلّم رسمة Mermaid وREADME وفيديو 5 دقايق.', 'Month 7 project: a «production order platform» for a shop or clinic: queued intake, services (notify, find customer, format phone, call with retry), a dead letter and replay, a circuit breaker and fallback channel, Summarize reports, 30 fixture tests and a test runner, dev and staging, Git with tags, and a deploy checklist with a tested rollback plan. Deliver a Mermaid diagram, a README and a 5-minute video.'),
      test: [
        Q(B('fixture هو:', 'A fixture is:'), [['مدخل اختبار ثابت نتيجته معروفة', 'a fixed test input with a known result'], ['نود جديد', 'a new node'], ['credential', 'a credential']], 0, B('للمقارنة.', 'For comparing.')),
        Q(B('test runner بيشتغل إمتى؟', 'When does the test runner run?'), [['قبل كل نشر وكل ليلة', 'before each deploy and nightly'], ['مرة في السنة', 'once a year'], ['أبدًا', 'never']], 0, B('اكتشاف بدري.', 'Early detection.')),
        Q(B('dry_run في svc: notify:', 'dry_run in svc: notify:'), [['يسجّل بدل ما يبعت', 'logs instead of sending'], ['يبعت مرتين', 'sends twice'], ['يقفل الـ workflow', 'stops the workflow']], 0, B('اختبار آمن.', 'Safe testing.')),
        Q(B('بيانات الاختبار:', 'Test data should be:'), [['وهمية بس واقعية', 'fake but realistic'], ['نسخة من العملاء', 'a copy of customers'], ['فاضية', 'empty']], 0, B('من غير بيانات حقيقية.', 'No real data.')),
        Q(B('ليه Git للـ workflows؟', 'Why Git for workflows?'), [['تاريخ وأسباب وbackup', 'history, reasons and a backup'], ['أسرع تنفيذ', 'faster runs'], ['مش مهم', 'not important']], 0, B('مرجع كامل.', 'A full record.')),
        Q(B('tag v1.4.0 بيقولك:', 'A v1.4.0 tag tells you:'), [['النسخة اللي اتنشرت', 'the version that was deployed'], ['عدد العملاء', 'the customer count'], ['اسم السيرفر', 'the server name']], 0, B('ترجع لها.', 'You can return to it.')),
        Q(B('staging:', 'Staging is:'), [['شبه الإنتاج ببيانات وهمية', 'near-production with fake data'], ['الإنتاج نفسه', 'production itself'], ['جهازك بس', 'only your laptop']], 0, B('الاختبار النهائي.', 'The final test.')),
        Q(B('قيمة مختلفة بين البيئات تيجي من:', 'A value that differs between environments comes from:'), [['$env أو الإعدادات', '$env or settings'], ['النود مباشرة', 'the node directly'], ['اسم الـ workflow', 'the workflow name']], 0, B('مش مكتوبة في النود.', 'Never typed into the node.')),
        Q(B('بعد النشر على طول:', 'Right after a deploy:'), [['smoke test ومراقبة', 'a smoke test and watching'], ['تقفل اللابتوب', 'close the laptop'], ['تنشر تاني', 'deploy again']], 0, B('ساعة مراقبة.', 'An hour of watching.')),
        Q(B('الرجوع لنسخة قديمة اسمه:', 'Going back to an older version is:'), [['rollback', 'a rollback'], ['hotfix', 'a hotfix'], ['merge', 'a merge']], 0, B('بخطة مكتوبة.', 'With a written plan.')),
        Q(B('الأحداث اللي جت وقت المشكلة:', 'Events that arrived during the problem:'), [['تتعاد من الطابور بعد الرجوع', 'are replayed from the queue after rollback'], ['تضيع', 'are lost'], ['تتبعت للعميل كما هي', 'go to the client as they are']], 0, B('الطابور حافظها.', 'The queue kept them.')),
        Q(B('checklist النشر بيشمل:', 'The deploy checklist includes:'), [['الاختبارات والمتغيّرات والـ backup', 'tests, variables and a backup'], ['لون الـ canvas', 'the canvas colour'], ['عدد الـ nodes', 'the node count']], 0, B('حاجات تمنع المفاجآت.', 'Things that prevent surprises.'))
      ] }
  ]
};
