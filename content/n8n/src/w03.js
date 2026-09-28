// n8n week 3 — Triggers and scheduling.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الـ Triggers والجدولة', 'Triggers and scheduling'),
  goal: B('تختار الـ trigger المناسب لكل مهمة: جدول زمني، أو Webhook، أو trigger من تطبيق، أو فورم، أو شات، وتظبط المواعيد والتوقيت، وتمنع التكرار في الـ polling.',
          'Choose the right trigger for each job — a schedule, a webhook, an app trigger, a form or a chat — set times and timezones correctly, and avoid duplicates when polling.'),
  days: [
    { title: B('أنواع الـ triggers', 'Kinds of triggers'),
      goal: B('تعرف الفرق بين الـ triggers وتختار الأنسب، وتفهم يعني إيه workflow active.', 'Know the difference between triggers, choose the best one, and understand what an active workflow is.'),
      learn: [
        { h: B('4 عائلات', 'Four families'),
          p: B('Manual (للتجربة)، وSchedule (ميعاد)، وWebhook/Form/Chat (حد بيبعتلك)، وApp triggers (زي Gmail Trigger، وده غالبًا polling أو webhook من الخدمة). الـ workflow بيبدأ من trigger واحد أو أكتر.', 'Manual (for testing), Schedule (a time), Webhook/Form/Chat (someone sends you something), and app triggers (such as Gmail Trigger, usually polling or a webhook from the service). A workflow starts from one trigger or more.'),
          ex: 'Every day at 8:00        → Schedule Trigger\nNew form submission      → n8n Form Trigger\nNew email in Gmail       → Gmail Trigger (polling)\nPayment from Stripe      → Webhook / Stripe Trigger' },
        { h: B('active (published)', 'Active (published)'),
          p: B('الـ trigger بيشتغل لوحده بس لما الـ workflow يبقى active / published. وانت بتبني، Execute workflow بيجرّب مرة واحدة. متنساش تفعّله بعد ما تخلص.', 'A trigger runs on its own only when the workflow is active / published. While building, Execute workflow tests it once. Don\'t forget to activate it when you finish.'),
          ex: 'Built → tested with Execute → activated → check Executions next morning' },
        { h: B('اختار صح', 'Choosing well'),
          p: B('لو الخدمة بتبعت webhook، استخدمه (فوري وأوفر). لو مفيش، polling كل فترة. ولو المهمة مرتبطة بوقت، Schedule.', 'If the service can send a webhook, use it (instant and cheaper). If not, poll every so often. If the job depends on time, use Schedule.'),
          ex: 'Webhook: instant, 1 request per event\nPolling every 5 min: up to 5 min late, 288 checks a day' }
      ],
      practice: [
        B('اكتب 6 مهام من شغلك ولكل واحدة الـ trigger المناسب وليه.', 'List 6 tasks from your work and the right trigger for each, with the reason.'),
        B('اعمل workflow بـ Manual Trigger وبعدين بدّله بـ Schedule وفعّله.', 'Build a workflow with a Manual Trigger, then switch it to a Schedule and activate it.'),
        B('افتح Executions بعد ساعة واتأكد إنه اشتغل لوحده.', 'Open Executions an hour later and check that it ran on its own.'),
        B('اعمل workflow فيه triggerين (Schedule + Manual) لنفس الخطوات.', 'Build a workflow with two triggers (Schedule + Manual) feeding the same steps.')
      ],
      words: ['activate / publish', 'Gmail Trigger',
        { t: 'event', m: B('حدث بيحصل وبيشغّل الـ workflow (رسالة، دفع، فورم)', 'something that happens and starts a workflow (a message, a payment, a form)'), ex: 'Each new order is an event.' },
        { t: 'multiple triggers', m: B('أكتر من trigger في نفس الـ workflow', 'more than one trigger in the same workflow'), ex: 'Run it every hour, or manually when needed.' },
        { t: 'instant vs polling', m: B('فوري (الخدمة بتبعت) ضد فحص دوري (انت بتسأل)', 'instant (the service pushes) vs. periodic checks (you ask)'), ex: 'Webhooks are instant; polling can be minutes late.' }],
      read: ['lib:n8n Course: Level 1', { lib: 'n8n Docs: Webhook node', what: B('اقرا المقدمة والفرق بين Test URL وProduction URL.', 'Read the introduction and the difference between the test and production URLs.') }],
      challenge: B('اعمل جدول «trigger map» لكل workflows عندك: الـ trigger، والتكرار، وأقصى تأخير مقبول.', 'Make a "trigger map" table for all your workflows: the trigger, how often, and the maximum acceptable delay.'),
      quiz: [
        { q: B('إمتى الـ Schedule Trigger يشتغل لوحده؟', 'When does a Schedule Trigger run on its own?'), o: [B('لما الـ workflow يبقى active', 'when the workflow is active'), B('دايمًا', 'always'), B('لما تفتح n8n', 'when you open n8n')], a: 0, why: B('من غير تفعيل، بيشتغل بس لما تجرّب.', 'Without activation it only runs when you test.') },
        { q: B('الخدمة بتدعم webhooks. الأحسن:', 'The service supports webhooks. Better to use:'), o: ['webhook', 'polling every minute', 'Manual Trigger'], a: 0, why: B('فوري وأقل طلبات.', 'Instant and fewer requests.') },
        { q: B('polling كل 5 دقايق معناه:', 'Polling every 5 minutes means:'), o: [B('ممكن تتأخر لحد 5 دقايق', 'you may be up to 5 minutes late'), B('فوري', 'instant'), B('مرة في اليوم', 'once a day')], a: 0, why: B('بتسأل كل فترة.', 'You ask every interval.') }
      ] },

    { title: B('Schedule Trigger والـ cron', 'The Schedule Trigger and cron'),
      goal: B('تظبط مواعيد دقيقة بالـ intervals والـ cron، وتفهم التوقيت والتوقيت الصيفي.', 'Set precise times with intervals and cron, and understand timezones and daylight saving time.'),
      learn: [
        { h: B('interval ولا cron', 'Interval or cron'),
          p: B('Schedule Trigger فيه intervals جاهزة (كل X دقيقة، كل يوم الساعة 8، كل أسبوع يوم الأحد…) ولو محتاج حاجة أدق: Custom (cron).', 'The Schedule Trigger has ready intervals (every X minutes, every day at 8, every week on Sunday…) and, for anything finer, Custom (cron).'),
          ex: 'Every weekday at 09:00 → cron: 0 9 * * 1-5\nEvery 15 minutes       → */15 * * * *\nFirst day of the month → 0 8 1 * *' },
        { h: B('اقرا الـ cron', 'Reading cron'),
          p: B('5 خانات: الدقيقة، الساعة، يوم الشهر، الشهر، يوم الأسبوع. `*` = أي، `*/15` = كل 15، `1-5` = من الاتنين للجمعة (0 = الأحد).', 'Five fields: minute, hour, day of month, month, day of week. `*` = any, `*/15` = every 15, `1-5` = Monday to Friday (0 = Sunday).'),
          ex: '┌ minute ┌ hour ┌ day ┌ month ┌ weekday\n   30      18     *     *      5     → Fridays at 18:30' },
        { h: B('التوقيت', 'Timezones'),
          p: B('في Workflow settings فيه Timezone. لو مش مظبوط، التقرير بتاع «8 الصبح» ممكن يوصل الساعة 5. وخلي بالك من التوقيت الصيفي في البلاد اللي بتغيّر الساعة.', 'Workflow settings have a Timezone. If it\'s wrong, your "8 am" report may arrive at 5. Watch out for daylight saving time in countries that change the clock.'),
          ex: 'Workflow settings → Timezone → Africa/Cairo' }
      ],
      practice: [
        B('اكتب cron لـ 5 مواعيد: كل ساعة، كل يوم 7 الصبح، الأحد والأربع 10، أول يوم في الشهر، كل 10 دقايق في ساعات الشغل.', 'Write cron for 5 schedules: hourly, daily at 7 am, Sunday and Wednesday at 10, the first of the month, every 10 minutes during working hours.'),
        B('جرّب كل cron في crontab.guru واتأكد.', 'Check every cron in crontab.guru.'),
        B('ظبّط Timezone في workflow واتأكد من ميعاد التشغيل الجاي.', 'Set the timezone in a workflow and check the next run time.'),
        B('اعمل workflow بيبعتلك رسالة كل يوم الساعة 9 بـ `{{ $now.toFormat("cccc dd LLL") }}`.', 'Build a workflow that messages you every day at 9 with `{{ $now.toFormat("cccc dd LLL") }}`.')
      ],
      words: [
        { t: 'interval', m: B('مسافة زمنية ثابتة بين كل تشغيل', 'a fixed time between runs'), ex: 'Run every 30 minutes.' },
        { t: 'cron expression', m: B('5 خانات بتحدد ميعاد التشغيل', 'five fields that define when to run'), ex: '0 9 * * 1-5' },
        { t: 'day of week (cron)', m: B('آخر خانة في الـ cron: 0 الأحد لحد 6 السبت', 'the last cron field: 0 Sunday to 6 Saturday'), ex: '1-5 = Monday to Friday' },
        { t: 'daylight saving time', m: B('تغيير الساعة في الصيف في بعض البلاد', 'moving the clock in summer in some countries'), ex: 'The run shifts by an hour after DST.' },
        { t: 'workflow settings', m: B('إعدادات الـ workflow: التوقيت، الـ error workflow، حفظ التنفيذات', 'a workflow\'s settings: timezone, error workflow, saving executions'), ex: 'Set the timezone in workflow settings.' }],
      read: ['lib:crontab.guru', 'lib:n8n Docs: Schedule Trigger'],
      challenge: B('اعمل «daily digest»: كل يوم عمل الساعة 8:30 بيجمع حاجة (طقس أو أخبار أو مهام) ويبعتها على Telegram، والتوقيت مظبوط.', 'Build a "daily digest": every working day at 8:30 it collects something (weather, news or tasks) and sends it to Telegram, with the timezone set correctly.'),
      quiz: [
        { q: B('`0 9 * * 1-5` معناها:', '`0 9 * * 1-5` means:'), o: [B('9 الصبح من الاتنين للجمعة', '9 am Monday to Friday'), B('كل 9 دقايق', 'every 9 minutes'), B('9 بالليل كل يوم', '9 pm every day')], a: 0, why: B('دقيقة 0، ساعة 9، أيام 1-5.', 'Minute 0, hour 9, days 1–5.') },
        { q: B('`*/15 * * * *` معناها:', '`*/15 * * * *` means:'), o: [B('كل 15 دقيقة', 'every 15 minutes'), B('الساعة 15', 'at 15:00'), B('يوم 15', 'on the 15th')], a: 0, why: B('*/15 في خانة الدقايق.', '*/15 in the minute field.') },
        { q: B('التقرير بيوصل متأخر 3 ساعات. غالبًا:', 'The report arrives 3 hours off. Most likely:'), o: [B('التوقيت (timezone) غلط', 'the timezone is wrong'), B('النت بطيء', 'slow internet'), B('الـ cron غلط', 'the cron is wrong')], a: 0, why: B('فرق التوقيت.', 'A timezone difference.') }
      ] },

    { title: B('triggers التطبيقات والـ polling', 'App triggers and polling'),
      goal: B('تستخدم app triggers والـ RSS، وتمنع معالجة نفس العنصر مرتين.', 'Use app triggers and RSS, and avoid processing the same item twice.'),
      learn: [
        { h: B('إزاي الـ polling شغال', 'How polling works'),
          p: B('n8n بيسأل الخدمة كل فترة «في جديد من آخر مرة؟». triggers زي Gmail Trigger وGoogle Sheets Trigger فيها Poll Times تحدد انت كل قد إيه.', 'n8n asks the service every so often, "anything new since last time?". Triggers such as Gmail Trigger and Google Sheets Trigger have Poll Times so you choose how often.'),
          ex: 'Gmail Trigger → Poll Times: every 5 minutes → Filter: label "invoices"' },
        { h: B('منع التكرار', 'Avoiding duplicates'),
          p: B('لو بتقرا من مصدر بيرجّع كل حاجة كل مرة (زي RSS أو API)، استخدم Remove Duplicates بخيار «Remove Items Processed in Previous Executions» عشان متبعتش نفس الخبر تاني.', 'If a source returns everything each time (like RSS or an API), use Remove Duplicates with "Remove Items Processed in Previous Executions" so you don\'t send the same item again.'),
          ex: 'Schedule (hourly) → RSS Read → Remove Duplicates (by link, previous executions) → Telegram' },
        { h: B('الفلترة بدري', 'Filter early'),
          p: B('فلتر في الـ trigger لو ينفع (label، query، folder) بدل ما تجيب كل حاجة وتفلتر بعدين. أسرع وأقل استهلاك.', 'Filter in the trigger when you can (label, query, folder) instead of fetching everything and filtering later. Faster and lighter.'),
          ex: 'Gmail search: from:billing@ has:attachment newer_than:1d' }
      ],
      practice: [
        B('اعمل Gmail Trigger بفلتر (label أو search) واتأكد إنه بيلقط الإيميلات الصح.', 'Set up a Gmail Trigger with a filter (label or search) and check it catches the right emails.'),
        B('اعمل RSS لموقع أخبار تقني، كل ساعة، وابعت الجديد بس على Telegram.', 'Read a tech news RSS feed hourly and send only new items to Telegram.'),
        B('شغّل الـ workflow مرتين ورا بعض واتأكد إن مفيش حاجة اتبعتت مرتين.', 'Run the workflow twice in a row and check nothing was sent twice.'),
        B('اكتب جدول: لكل trigger في شغلك، polling ولا webhook، وكل قد إيه.', 'Write a table: for each trigger in your work, polling or webhook, and how often.')
      ],
      words: ['RSS Read', 'Remove Items Processed in Previous Executions',
        { t: 'poll times', m: B('كل قد إيه الـ trigger يسأل الخدمة', 'how often a trigger checks the service'), ex: 'Poll Times: every 10 minutes' },
        { t: 'deduplication', m: B('منع تكرار نفس العنصر', 'preventing the same item from being handled twice'), ex: 'Deduplicate by the article link.' },
        { t: 'search query (filter)', m: B('شرط بحث في الـ trigger بيجيب اللي انت عايزه بس', 'a search condition in the trigger that fetches only what you need'), ex: 'from:billing@ has:attachment' }],
      read: ['lib:n8n Docs: Gmail node', { lib: 'Public APIs', what: B('دوّر على API أو RSS مجاني تقدر تعمله polling.', 'Find a free API or RSS feed you can poll.') }],
      challenge: B('اعمل «news radar»: 3 مصادر RSS، كل ساعة، من غير تكرار، والعناوين اللي فيها كلمات معينة بس بتتبعت.', 'Build a "news radar": 3 RSS sources, hourly, no duplicates, sending only headlines that contain certain keywords.'),
      quiz: [
        { q: B('ليه RSS محتاج Remove Duplicates؟', 'Why does RSS need Remove Duplicates?'), o: [B('بيرجّع نفس الأخبار كل مرة', 'it returns the same items every time'), B('عشان السرعة', 'for speed'), B('مش محتاج', 'it doesn\'t')], a: 0, why: B('من غيره هتبعت نفس الخبر.', 'Without it you\'d resend the same item.') },
        { q: B('أحسن مكان للفلترة:', 'The best place to filter:'), o: [B('في الـ trigger لو ينفع', 'in the trigger when possible'), B('في آخر node', 'in the last node'), B('مفيش داعي', 'no need')], a: 0, why: B('بيانات أقل من الأول.', 'Less data from the start.') },
        { q: B('Poll Times بتحدد:', 'Poll Times sets:'), o: [B('كل قد إيه يسأل الخدمة', 'how often to check the service'), B('الباسورد', 'the password'), B('عدد الـ items', 'the number of items')], a: 0, why: B('تكرار الفحص.', 'The check frequency.') }
      ] },

    { title: B('Webhook بعمق', 'Webhooks in depth'),
      goal: B('تظبط Webhook للإنتاج: الـ path، والـ method، والحماية، وطريقة الرد.', 'Set up a production webhook: path, method, protection and how it responds.'),
      learn: [
        { h: B('إعدادات الـ Webhook', 'Webhook settings'),
          p: B('HTTP Method (GET/POST…)، وPath (جزء الـ URL)، وAuthentication (Basic أو Header أو JWT)، وRespond: فورًا، أو لما آخر node يخلص، أو بـ Respond to Webhook.', 'HTTP Method (GET/POST…), Path (part of the URL), Authentication (Basic, Header or JWT), and Respond: immediately, when the last node finishes, or via Respond to Webhook.'),
          ex: 'POST /webhook/new-order\nAuthentication: Header Auth (X-Api-Key)\nRespond: Using "Respond to Webhook" node' },
        { h: B('رد بسرعة', 'Respond fast'),
          p: B('خدمات كتير بتستنى رد في ثواني وإلا بتعيد الإرسال. لو الشغل تقيل: رد 200 على طول، وبعدين كمّل الشغل.', 'Many services wait only a few seconds for a reply, then retry. If the work is heavy, reply 200 right away and do the work afterwards.'),
          ex: 'Webhook → Respond to Webhook (200 {"ok":true}) → heavy processing…' },
        { h: B('الـ URL في الإنتاج', 'The production URL'),
          p: B('على سيرفر، n8n لازم يعرف عنوانه العام عشان يكتب الـ Webhook URL صح: متغيّر WEBHOOK_URL. من غيره ممكن الـ URL يطلع localhost.', 'On a server, n8n must know its public address to show the right webhook URL: the WEBHOOK_URL variable. Without it the URL may show localhost.'),
          ex: 'WEBHOOK_URL=https://n8n.example.com/' }
      ],
      practice: [
        B('اعمل Webhook بـ POST وHeader Auth، واختبره بـ curl مرة بالمفتاح ومرة من غيره.', 'Create a POST webhook with Header Auth, and test it with curl once with the key and once without.'),
        B('اعمل رد بـ Respond to Webhook بكود 201 وbody JSON.', 'Reply with Respond to Webhook using code 201 and a JSON body.'),
        B('اعمل webhook بيرد فورًا ويكمّل شغل بطيء (Wait 10 ثواني) بعدها.', 'Build a webhook that replies immediately and then does slow work (Wait 10 seconds).'),
        B('اكتب في README الـ Webhook URL والـ method والـ header المطلوب.', 'Document the webhook URL, method and required header in a README.')
      ],
      words: ['WEBHOOK_URL',
        { t: 'webhook path', m: B('الجزء الأخير من الـ URL اللي بيحدد الـ webhook', 'the last part of the URL that identifies the webhook'), ex: '/webhook/new-order' },
        { t: 'Basic Auth', m: B('حماية باسم مستخدم وباسورد في الطلب', 'protection with a username and password in the request'), ex: 'Authorization: Basic …' },
        { t: 'response code', m: B('الـ status اللي الـ webhook بيرد بيه', 'the status code the webhook replies with'), ex: 'Respond with 201 Created.' },
        { t: 'Respond immediately', m: B('الـ webhook يرد على طول قبل ما الـ workflow يخلص', 'the webhook replies at once, before the workflow finishes'), ex: 'Use it when the work takes long.' }],
      read: ['lib:n8n Docs: Webhook node', 'lib:Webhook.site'],
      challenge: B('اعمل «order intake API»: POST محمي بـ header، بيتحقق من الحقول، ويرد 400 لو ناقص حاجة و201 لو تمام، ويسجّل الطلب في Sheet.', 'Build an "order intake API": a header-protected POST that validates fields, replies 400 when something is missing and 201 when it\'s fine, and logs the order to a sheet.'),
      quiz: [
        { q: B('ليه ترد على الـ webhook بسرعة؟', 'Why reply to a webhook quickly?'), o: [B('الخدمة ممكن تعيد الإرسال لو اتأخرت', 'the sender may retry if you are slow'), B('عشان الشكل', 'for looks'), B('مش مهم', 'it doesn\'t matter')], a: 0, why: B('timeout ثم retry.', 'timeout, then retry.') },
        { q: B('على سيرفر، الـ Webhook URL طالع localhost. الحل:', 'On a server, the webhook URL shows localhost. The fix:'), o: [B('تظبط WEBHOOK_URL', 'set WEBHOOK_URL'), B('تغيّر الـ path', 'change the path'), B('تعيد تشغيل الجهاز', 'restart the machine')], a: 0, why: B('n8n محتاج عنوانه العام.', 'n8n needs its public address.') },
        { q: B('Header Auth في الـ Webhook بيعمل:', 'Header Auth on a webhook:'), o: [B('يرفض الطلبات اللي من غير header صح', 'rejects requests without the right header'), B('يشفّر البيانات', 'encrypts the data'), B('يسرّع الرد', 'speeds up the reply')], a: 0, why: B('حماية بسيطة.', 'Simple protection.') }
      ] },

    { title: B('الفورمز والشات والـ sub-workflows', 'Forms, chat and called workflows'),
      goal: B('تستقبل بيانات بـ n8n Form، وتبدأ workflow من شات، وتخلّي workflow يشغّل workflow تاني.', 'Collect data with an n8n form, start a workflow from a chat, and let one workflow call another.'),
      learn: [
        { h: B('n8n Form Trigger', 'The n8n Form Trigger'),
          p: B('بيعمل فورم ليه لينك: تختار الحقول (نص، إيميل، رقم، قايمة، ملف)، وبعد الإرسال تعرض رسالة أو تحوّل لصفحة. ومع Form node تقدر تعمل فورم من كذا صفحة.', 'It creates a form with a link: you choose the fields (text, email, number, dropdown, file), and after submission show a message or redirect. With the Form node you can build multi-page forms.'),
          ex: 'Form Trigger (name, email, service) → Google Sheets → Telegram alert → "Thanks, we\'ll reply within 24 hours."' },
        { h: B('Chat Trigger', 'The Chat Trigger'),
          p: B('بيعمل واجهة شات (أو بيستقبل من ويدجت)، وغالبًا بيتوصل بـ AI Agent. هنستخدمه كتير في الشهر الخامس.', 'It provides a chat interface (or receives messages from a widget), usually connected to an AI Agent. We\'ll use it a lot in month 5.'),
          ex: 'Chat Trigger → AI Agent → reply in the chat' },
        { h: B('When Executed by Another Workflow', 'When Executed by Another Workflow'),
          p: B('trigger بيخلّي الـ workflow ده يتنده من workflow تاني (بـ Execute Workflow)، ويستقبل بيانات منه. ده أساس الـ sub-workflows.', 'A trigger that lets this workflow be called from another (via Execute Workflow) and receive data from it. It is the basis of sub-workflows.'),
          ex: 'Main: … → Execute Workflow (Send alert)\nSub: When Executed by Another Workflow → Telegram' }
      ],
      practice: [
        B('اعمل n8n Form لطلب خدمة فيه 5 حقول، ووصّله بـ Sheet.', 'Build an n8n form for service requests with 5 fields, connected to a sheet.'),
        B('ضيف رسالة شكر بعد الإرسال فيها اسم الشخص.', 'Add a thank-you message after submission that includes the person\'s name.'),
        B('اعمل sub-workflow اسمه «Send alert» بيبعت Telegram، ونادي عليه من workflowين.', 'Build a sub-workflow called "Send alert" that sends a Telegram message, and call it from two workflows.'),
        B('جرّب Chat Trigger وشوف شكل البيانات اللي بتوصل.', 'Try the Chat Trigger and look at the shape of the incoming data.')
      ],
      words: ['n8n Form Trigger',
        { t: 'Form node', m: B('نود بتضيف صفحة تانية للفورم أو صفحة نهاية', 'a node that adds another form page or an ending page'), ex: 'Page 1: contact details → Page 2: project details' },
        { t: 'form field', m: B('خانة في الفورم (نص، إيميل، قايمة…)', 'a box in the form (text, email, dropdown…)'), ex: 'Field type: Email, required' },
        { t: 'Chat Trigger', m: B('trigger بيبدأ الـ workflow من رسالة شات', 'a trigger that starts the workflow from a chat message'), ex: 'Chat Trigger → AI Agent' },
        { t: 'When Executed by Another Workflow', m: B('trigger بيخلّي workflow تاني يشغّل الـ workflow ده', 'a trigger that lets another workflow run this one'), ex: 'The start of every sub-workflow.' }],
      read: ['lib:n8n Docs: Sub-workflows', 'lib:n8n Course: Level 2'],
      challenge: B('اعمل «lead capture»: فورم ← تحقق من الإيميل ← Sheet ← sub-workflow تنبيه ← رسالة شكر، وانشر لينك الفورم لصاحبك يجرّبه.', 'Build "lead capture": form → email check → sheet → alert sub-workflow → thank-you message, and send the form link to a friend to try.'),
      quiz: [
        { q: B('n8n Form Trigger بيعمل:', 'The n8n Form Trigger creates:'), o: [B('فورم ليه لينك وبيشغّل الـ workflow', 'a form with a link that starts the workflow'), B('إيميل', 'an email'), B('جدول', 'a table')], a: 0, why: B('فورم جاهز من غير كود.', 'A ready form with no code.') },
        { q: B('sub-workflow بيبدأ بـ:', 'A sub-workflow starts with:'), o: ['When Executed by Another Workflow', 'Schedule Trigger', 'Manual Trigger only'], a: 0, why: B('عشان يتنده من workflow تاني.', 'So another workflow can call it.') },
        { q: B('Chat Trigger غالبًا بيتوصل بـ:', 'The Chat Trigger is usually connected to:'), o: ['AI Agent', 'Google Sheets', 'Wait'], a: 0, why: B('للمحادثة بالذكاء الاصطناعي.', 'For AI conversations.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 4 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 4 opens when you score 70% or more.'),
      review: [
        B('4 عائلات triggers، والـ workflow لازم active.', 'Four trigger families, and the workflow must be active.'),
        B('interval وcron والـ timezone.', 'Intervals, cron and the timezone.'),
        B('polling وPoll Times ومنع التكرار.', 'Polling, Poll Times and avoiding duplicates.'),
        B('Webhook: method وpath وauth وطريقة الرد، وWEBHOOK_URL.', 'Webhook: method, path, auth, how it responds, and WEBHOOK_URL.'),
        B('Form Trigger وForm node وChat Trigger والـ sub-workflows.', 'Form Trigger, the Form node, Chat Trigger and sub-workflows.')
      ],
      project: B('ابني «نظام طلبات صغير» بـ 4 triggers: فورم طلب خدمة (Form)، وAPI للطلبات من موقعك (Webhook محمي)، وملخص يومي الساعة 9 (Schedule بالتوقيت الصح)، وتنبيه لما يوصل إيميل من عميل مهم (Gmail Trigger بفلتر). كلهم بيستخدموا sub-workflow واحد للتنبيه، ووثّقهم في README.',
                 'Build a "small request system" with 4 triggers: a service-request form (Form), an API for orders from your site (a protected Webhook), a daily summary at 9 (Schedule with the right timezone), and an alert when an important client emails (Gmail Trigger with a filter). All of them use one alert sub-workflow; document them in a README.'),
      test: [
        { q: B('لتقرير كل يوم الساعة 8:', 'For a report every day at 8:'), o: ['Schedule Trigger', 'Webhook', 'Chat Trigger'], a: 0, why: B('مرتبط بالوقت.', 'It depends on time.') },
        { q: B('`0 8 1 * *` معناها:', '`0 8 1 * *` means:'), o: [B('8 الصبح أول كل شهر', '8 am on the first of every month'), B('كل 8 دقايق', 'every 8 minutes'), B('يوم الاتنين 8', 'Mondays at 8')], a: 0, why: B('يوم الشهر = 1.', 'Day of month = 1.') },
        { q: B('`30 18 * * 5` معناها:', '`30 18 * * 5` means:'), o: [B('الجمعة 6:30 بالليل', 'Fridays at 18:30'), B('كل 30 دقيقة', 'every 30 minutes'), B('يوم 5 الساعة 18', 'on the 5th at 18:00')], a: 0, why: B('5 = الجمعة في آخر خانة.', '5 = Friday in the last field.') },
        { q: B('الـ workflow مبيشتغلش لوحده. أول حاجة تتأكد منها:', 'The workflow never runs on its own. First check:'), o: [B('إنه active / published', 'that it is active / published'), B('اسم الـ node', 'the node name'), B('اللون', 'the colour')], a: 0, why: B('من غير تفعيل مفيش تشغيل تلقائي.', 'No activation, no automatic runs.') },
        { q: B('Gmail Trigger بيشتغل غالبًا بـ:', 'The Gmail Trigger usually works by:'), o: ['polling', 'SMS', 'FTP'], a: 0, why: B('بيسأل كل فترة.', 'It checks at intervals.') },
        { q: B('عشان RSS ميبعتش نفس الخبر:', 'So RSS doesn\'t resend the same item:'), o: ['Remove Duplicates (previous executions)', 'Wait', 'Merge'], a: 0, why: B('بيفتكر اللي اتعالج قبل كده.', 'It remembers what was processed.') },
        { q: B('Webhook محتاج يرد في ثواني والشغل بياخد دقيقة. الحل:', 'A webhook must reply in seconds but the work takes a minute. The fix:'), o: [B('رد فورًا وكمّل بعدها', 'reply immediately, then continue'), B('خلّيه يستنى', 'make the sender wait'), B('الغي الشغل', 'cancel the work')], a: 0, why: B('Respond immediately / Respond to Webhook أولًا.', 'Respond immediately / Respond to Webhook first.') },
        { q: B('WEBHOOK_URL بيحدد:', 'WEBHOOK_URL sets:'), o: [B('العنوان العام اللي بيظهر في لينكات الـ webhooks', 'the public address shown in webhook URLs'), B('الباسورد', 'the password'), B('التوقيت', 'the timezone')], a: 0, why: B('مهم على السيرفر.', 'Important on a server.') },
        { q: B('Header Auth في الـ Webhook:', 'Header Auth on a webhook:'), o: [B('بيطلب header معين في كل طلب', 'requires a specific header on every request'), B('بيشفّر الرد', 'encrypts the reply'), B('بيعمل log', 'writes a log')], a: 0, why: B('حماية بمفتاح.', 'Protection with a key.') },
        { q: B('فورم من كذا صفحة بيستخدم:', 'A multi-page form uses:'), o: [B('Form Trigger + Form node', 'Form Trigger + the Form node'), B('Webhook بس', 'only a Webhook'), B('Schedule', 'a Schedule')], a: 0, why: B('Form node بيضيف صفحات.', 'The Form node adds pages.') },
        { q: B('Execute Workflow بينده على workflow بيبدأ بـ:', 'Execute Workflow calls a workflow that starts with:'), o: ['When Executed by Another Workflow', 'Gmail Trigger', 'RSS Read'], a: 0, why: B('ده الـ sub-workflow trigger.', 'That is the sub-workflow trigger.') },
        { q: B('الـ timezone بتاع الـ workflow بيتظبط في:', 'A workflow\'s timezone is set in:'), o: ['Workflow settings', 'the Sheet', 'the browser'], a: 0, why: B('وممكن كمان GENERIC_TIMEZONE للسيرفر كله.', 'And GENERIC_TIMEZONE for the whole server.') }
      ] }
  ]
};
