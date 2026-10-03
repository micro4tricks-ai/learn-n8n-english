// English week 32 — Incident reports, postmortems and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2 → C1',
  title: B('تقارير الأعطال والـ postmortems ومشروع الشهر', 'Incident reports, postmortems and the month project'),
  goal: B('تتواصل بالإنجليزي وقت العطل وبعده بهدوء ودقة: تحديثات حالة واضحة، تقرير postmortem من غير لوم، جدول زمني دقيق، لغة الأسباب، وخطوات متابعة قابلة للتنفيذ.',
          'Communicate in English during and after an outage calmly and precisely: clear status updates, a blameless postmortem, an exact timeline, the language of causes, and actionable follow-up items.'),
  days: [
    { title: B('التواصل وقت العطل', 'Communicating during an outage'),
      goal: B('تكتب تحديثات حالة بتطمّن وبتقول الحقيقة.', 'Write status updates that reassure and tell the truth.'),
      learn: [
        L(B('مراحل التحديث', 'The update stages'),
          B('صفحات الحالة بتستخدم 4 كلمات ثابتة: **Investigating** (عارفين إن فيه مشكلة وبندوّر)، **Identified** (عرفنا السبب)، **Monitoring** (طبّقنا حل وبنراقب)، **Resolved** (رجع طبيعي). كل تحديث فيه: إيه اللي متأثر، إيه اللي بنعمله، وميعاد التحديث الجاي.', 'Status pages use 4 fixed words: **Investigating** (we know there is a problem and are looking), **Identified** (we found the cause), **Monitoring** (a fix is applied and we are watching), **Resolved** (back to normal). Each update states: what is affected, what we are doing, and when the next update comes.'),
          '14:05 Investigating — Some customers cannot place orders. We are looking into it. Next update by 14:35.\n14:30 Identified — An expired payment key. We are rotating it.\n14:50 Monitoring — Orders are succeeding again.\n15:20 Resolved — All systems normal.'),
        L(B('اللغة المناسبة للعملاء', 'Customer-facing language'),
          B('التحديث **customer-facing**: بسيط، من غير jargon ولا أسماء أنظمة داخلية، ومن غير لوم أي حد، ومن غير وعود بمواعيد مش متأكد منها. «We expect» أحسن من «It will be fixed in 10 minutes».', 'A **customer-facing** update: simple, no jargon or internal system names, no blaming anyone, and no promised times you are unsure of. «We expect» beats «It will be fixed in 10 minutes».'),
          '✗ "The Redis cluster on prod-eu-2 OOMed because Omar’s deploy…"\n✓ "Some orders are failing. We have found the cause and expect a fix within the hour."'),
        L(B('ملاحظات داخلية', 'Internal notes'),
          B('جوه الفريق، في قناة العطل، اكتب **internal note** دقيقة بالوقت: اللي اتعمل ومين بيعمل إيه. **incident commander** (قائد العطل) بيلخّص كل 30 دقيقة. ده هو المصدر اللي هيتكتب منه الـ postmortem بعدين.', 'Inside the team, in the incident channel, write precise **internal notes** with times: what was done and who is doing what. The **incident commander** summarises every 30 minutes. This becomes the source for the postmortem later.'),
          '14:12 Sara: payment API returns 401 since 13:58\n14:18 Omar: key expired at 13:58 (calendar reminder missed)\n14:25 IC: Sara rotates key, Omar prepares customer update')
      ],
      practice: [
        B('اكتب 4 تحديثات (investigating → resolved) لعطل متخيّل.', 'Write 4 updates (investigating → resolved) for an imagined outage.'),
        B('حوّل تحديث مليان jargon لتحديث للعملاء.', 'Turn a jargon-heavy update into a customer-facing one.'),
        B('اكتب 6 internal notes بالأوقات.', 'Write 6 internal notes with times.'),
        B('اقرا 3 حوادث على status page لخدمة مشهورة.', 'Read 3 incidents on a well-known service’s status page.')
      ],
      words: [
        W('outage', 'توقف الخدمة', 'a period when a service is down', 'The outage lasted 52 minutes.'),
        W('status update', 'تحديث عن حالة العطل', 'a message about the state of an incident', 'Post a status update every 30 minutes.'),
        W('identified', 'السبب اتعرف', 'the cause has been found', 'Status: Identified — expired key.'),
        W('resolved', 'اتحل ورجع طبيعي', 'fixed and back to normal', 'The incident is resolved.'),
        W('incident commander', 'الشخص اللي بيقود التعامل مع العطل', 'the person leading the incident response', 'The incident commander assigns tasks.')
      ],
      read: [{ t: 'Atlassian: Incident communication best practices', url: 'https://www.atlassian.com/incident-management/incident-communication', what: B('اقرا أمثلة التحديثات.', 'Read the example updates.') }, { lib: 'The Cloudflare Blog', what: B('دوّر على تقرير عطل واقرا التحديثات.', 'Find an outage report and read its updates.') }],
      challenge: B('اعمل «تمرين عطل» على مشروعك: 5 تحديثات للعملاء بالمراحل، 10 internal notes بالأوقات، وملخص incident commander كل نص ساعة.', 'Run an «incident drill» on your project: 5 customer updates through the stages, 10 internal notes with times, and an incident commander summary every half hour.'),
      quiz: [
        Q(B('بعد ما الحل اتطبّق والفريق بيراقب:', 'After a fix is applied and the team is watching:'), ['Monitoring', 'Investigating', 'Identified'], 0, B('قبل Resolved.', 'Before Resolved.')),
        Q(B('تحديث العملاء:', 'A customer update:'), ['simple, no blame, next update time', 'names the engineer at fault', 'full of internal names'], 0, B('بسيط.', 'Simple.')),
        Q(B('أحسن وعد:', 'The best promise:'), ['«We expect a fix within the hour.»', '«Fixed in 3 minutes for sure.»', '«No idea.»'], 0, B('حذر.', 'Careful.'))
      ] },

    { title: B('هيكل الـ postmortem', 'The postmortem structure'),
      goal: B('تكتب تقرير بعد العطل بيتعلم منه الفريق مش بيعاقب.', 'Write an after-incident report the team learns from rather than punishes.'),
      learn: [
        L(B('الأقسام', 'The sections'),
          B('**postmortem** شائع: Summary (3 جمل)، Impact (مين وقد إيه بأرقام)، Timeline، Root cause و**contributing factors**، What went well، What went poorly، Where we got lucky، Action items. ومش لازم يتكتب لكل حاجة صغيرة — للأعطال المؤثرة.', 'A typical **postmortem**: Summary (3 sentences), Impact (who and how much, with numbers), Timeline, Root cause and **contributing factors**, What went well, What went poorly, Where we got lucky, Action items. Not every small thing needs one — the impactful incidents do.'),
          'Summary: Between 13:58 and 14:50 (Cairo), 31% of checkout attempts failed\nbecause the payment API key expired. We rotated the key and added expiry alerts.'),
        L(B('من غير لوم', 'Blameless'),
          B('**blameless**: الهدف نفهم النظام اللي سمح بالغلطة، مش نلاقي حد نلومه. بدل «Omar forgot to renew the key» اكتب «Key renewal depended on a calendar reminder, which was missed». الناس اللي مش خايفة بتحكي الحقيقة كاملة.', '**Blameless**: the goal is to understand the system that allowed the mistake, not to find someone to blame. Instead of «Omar forgot to renew the key», write «Key renewal depended on a calendar reminder, which was missed». People who are not afraid tell the whole truth.'),
          '✗ "Sara deployed broken code."\n✓ "A change was deployed without the integration test, because the test suite took 40 minutes and was often skipped."'),
        L(B('الأثر بالأرقام', 'Impact in numbers'),
          B('قسم Impact: المدة (من–لحد بتوقيت محدد)، العملاء المتأثرين (عدد أو نسبة)، الفلوس أو الطلبات، وهل فيه بيانات ضاعت. «approximately» مقبولة لو قلت ليه: «approximately 210 orders (estimated from normal Friday traffic)».', 'The Impact section: the duration (from–to with a time zone), customers affected (a count or a share), money or orders, and whether any data was lost. «Approximately» is fine if you say why: «approximately 210 orders (estimated from normal Friday traffic)».'),
          'Duration: 52 min (13:58–14:50 Africa/Cairo)\nImpact: ≈ 210 failed checkouts (31%); no data lost; 14 support tickets')
      ],
      practice: [
        B('اقرا postmortem عام لشركة كبيرة ورتّب أقسامه.', 'Read a public postmortem from a big company and list its sections.'),
        B('أعد كتابة 5 جمل فيها لوم بأسلوب blameless.', 'Rewrite 5 blaming sentences in a blameless style.'),
        B('اكتب Summary في 3 جمل لعطل.', 'Write a 3-sentence Summary for an incident.'),
        B('اكتب قسم Impact بأرقام وتوقيت.', 'Write an Impact section with numbers and times.')
      ],
      words: [
        W('postmortem', 'تقرير تحليل بعد العطل', 'an analysis report after an incident', 'Publish the postmortem within a week.'),
        W('blameless', 'من غير لوم أشخاص', 'without blaming individuals', 'Our postmortems are blameless.'),
        W('contributing factor', 'عامل ساعد إن العطل يحصل أو يكبر', 'a factor that helped the incident happen or grow', 'Missing alerts were a contributing factor.'),
        W('near miss', 'حاجة كانت هتبقى عطل ونجينا منها', 'something that almost became an incident', 'Log near misses too.'),
        W('lessons learned', 'الدروس المستفادة', 'what we learnt from it', 'Share the lessons learned with all teams.')
      ],
      read: ['lib:Atlassian: Incident postmortems', { lib: 'The Cloudflare Blog', what: B('اقرا postmortem كامل ولاحظ النبرة.', 'Read a full postmortem and notice the tone.') }],
      challenge: B('اكتب الأقسام الأولى لـ postmortem لعطل حقيقي حصلك في الرحلة (أو التمرين): Summary وImpact بأرقام، وكل الجمل blameless.', 'Write the first sections of a postmortem for a real incident from your journey (or the drill): a Summary and an Impact section with numbers, every sentence blameless.'),
      quiz: [
        Q(B('blameless يعني:', 'Blameless means:'), ['focus on the system, not the person', 'nobody made a mistake', 'hide the cause'], 0, B('النظام.', 'The system.')),
        Q(B('Impact لازم فيه:', 'Impact must include:'), ['duration, who was affected and numbers', 'the engineer’s name', 'only feelings'], 0, B('أرقام.', 'Numbers.')),
        Q(B('«Where we got lucky» فايدته:', '«Where we got lucky» is useful because:'), ['it shows risks that did not hit this time', 'it is a joke section', 'it blames luck'], 0, B('مخاطر خفية.', 'Hidden risks.'))
      ] },

    { title: B('الجدول الزمني', 'The timeline'),
      goal: B('تكتب تسلسل الأحداث بدقة وبأفعال مناسبة.', 'Write the sequence of events precisely with the right verbs.'),
      learn: [
        L(B('الشكل', 'The format'),
          B('كل سطر: الوقت بتوقيت واضح (أو UTC)، والحدث بالماضي البسيط، بجمل قصيرة. ابدأ قبل العطل (السبب الأصلي) وخلّص بعد الحل (المراقبة). وفرّق بين وقت البداية الحقيقي ووقت ما عرفنا.', 'Each line: the time with a clear time zone (or UTC), and the event in the past simple, in short sentences. Start before the outage (the original cause) and end after the fix (monitoring). Separate the real start time from the time we found out.'),
          'All times Africa/Cairo (UTC+3)\n2026-09-01 — payment key created with a 30-day expiry\n13:58 key expired; checkouts began failing\n14:05 alert fired (first detection)\n14:30 cause identified\n14:42 new key deployed\n14:50 error rate back to normal'),
        L(B('أفعال العطل', 'Incident verbs'),
          B('`detected` (اكتشفنا)، `alerted/paged` (التنبيه اتبعت)، `acknowledged`، `escalated` (صعّدنا لمستوى أعلى)، `mitigated` (قللنا الضرر)، `rolled back` (رجعنا للنسخة القديمة)، `restored` (رجّعنا الخدمة)، `confirmed`. الأفعال الدقيقة بتغني عن جمل كتير.', '`detected`, `alerted/paged`, `acknowledged`, `escalated` (raised to a higher level), `mitigated` (reduced the harm), `rolled back` (returned to the old version), `restored`, `confirmed`. Precise verbs save many sentences.'),
          '14:05 alert fired; on-call acknowledged at 14:07\n14:20 escalated to the payments owner\n14:25 mitigated by switching to cash on delivery\n14:42 restored card payments'),
        L(B('المقاييس الزمنية', 'Time metrics'),
          B('من الجدول بتحسب: **time to detect** (من البداية لحد ما عرفنا)، time to mitigate، **time to resolve**. الأرقام دي بتوريك فين تتحسن: هنا الاكتشاف أخد 7 دقايق بس الحل أخد 37 لأن مكانش فيه runbook.', 'From the timeline you compute: **time to detect** (from start to discovery), time to mitigate, and **time to resolve**. These numbers show where to improve: here detection took 7 minutes but resolution took 37 because there was no runbook.'),
          'time to detect: 7 min · time to mitigate: 27 min · time to resolve: 52 min')
      ],
      practice: [
        B('اكتب جدول زمني من 10 سطور لعطل.', 'Write a 10-line timeline for an incident.'),
        B('استخدم 6 أفعال عطل مختلفة.', 'Use 6 different incident verbs.'),
        B('احسب time to detect/mitigate/resolve.', 'Compute time to detect/mitigate/resolve.'),
        B('اكتب جملة «البداية الحقيقية مقابل وقت ما عرفنا».', 'Write a sentence on «real start versus time of discovery».')
      ],
      words: [
        W('detected', 'اكتشفنا المشكلة', 'the problem was noticed', 'The error was detected at 14:05.'),
        W('escalated', 'اتصعّد لمستوى أعلى', 'raised to a higher level', 'The issue was escalated to the payments team.'),
        W('mitigated', 'الضرر اتقلل', 'the harm was reduced', 'We mitigated by enabling cash on delivery.'),
        W('rolled back', 'رجعنا للنسخة القديمة', 'returned to the previous version', 'We rolled back the deploy at 14:20.'),
        W('time to detect', 'الوقت لحد ما اكتشفنا المشكلة', 'the time until a problem is noticed', 'Time to detect was seven minutes.')
      ],
      read: [{ t: 'Google SRE Book: Postmortem Culture', url: 'https://sre.google/sre-book/postmortem-culture/', what: B('اقرا جزء blameless والأمثلة.', 'Read the blameless part and the examples.') }],
      challenge: B('اكتب جدول زمني كامل لعطل من مشاريعك (أو التمرين) بتوقيت واضح، بأفعال دقيقة، من السبب الأصلي لحد المراقبة، والمقاييس التلاتة.', 'Write a complete timeline for an incident from your projects (or the drill) with a clear time zone and precise verbs, from the original cause to monitoring, with the three metrics.'),
      quiz: [
        Q(B('الجدول الزمني بيتكتب بـ:', 'A timeline is written in:'), ['the past simple', 'the future', 'the imperative'], 0, B('أحداث حصلت.', 'Events that happened.')),
        Q(B('«mitigated» معناها:', '«mitigated» means:'), ['the harm was reduced', 'it was fully fixed', 'it was ignored'], 0, B('قللنا الضرر.', 'Reduced harm.')),
        Q(B('time to detect:', 'Time to detect is:'), ['from the start of the problem to its discovery', 'from discovery to fix', 'the meeting length'], 0, B('اكتشاف.', 'Detection.'))
      ] },

    { title: B('لغة الأسباب', 'The language of causes'),
      goal: B('تشرح ليه العطل حصل بدقة ومن غير مبالغة.', 'Explain why the outage happened precisely and without exaggeration.'),
      learn: [
        L(B('سبب ومحفّز ومضاعف', 'Cause, trigger and amplifier'),
          B('فرّق: السبب الجذري (المفتاح كان ليه تاريخ انتهاء ومفيش تنبيه)، **triggered by** (اللي بدأ العطل: انتهاء المفتاح)، و**exacerbated by** (اللي خلّاه أسوأ: رسالة الخطأ كانت عامة فالتشخيص اتأخر). «due to» و«because of» و«as a result of» للربط.', 'Separate: the root cause (the key had an expiry and no alert), **triggered by** (what started the outage: the key expiring), and **exacerbated by** (what made it worse: a generic error message delayed diagnosis). Use «due to», «because of» and «as a result of» to connect.'),
          'The outage was triggered by the payment key expiring.\nIt was exacerbated by a generic error message, which delayed diagnosis.\nThe root cause was that key expiry had no monitoring.'),
        L(B('اكتب الـ 5 whys', 'Writing the 5 whys'),
          B('اكتب سلسلة «why?» كجمل كاملة، كل واحدة سبب اللي قبلها، لحد ما توصل لحاجة في النظام أو العملية تقدر تغيّرها. لو آخر إجابة «human error»، كمّل: ليه النظام سمح بالغلطة دي؟', 'Write the chain of «why?» as full sentences, each the cause of the one before, until you reach something in the system or process you can change. If the last answer is «human error», keep going: why did the system allow that mistake?'),
          'Why did checkouts fail? The payment key was rejected.\nWhy? It had expired.\nWhy was it not renewed? Renewal relied on a calendar reminder.\nWhy was that enough? Key expiry was not monitored. ← fixable'),
        L(B('دقة من غير مبالغة', 'Precision without exaggeration'),
          B('متقولش «the system completely crashed» لو 31% فشل. ومتقولش «it was impossible to detect» لو كان فيه تنبيه اتجاهل. الكلمات الدقيقة (partially، intermittently، for some customers) بتبني ثقة.', 'Do not say «the system completely crashed» if 31% failed. Do not say «it was impossible to detect» if an alert was ignored. Precise words (partially, intermittently, for some customers) build trust.'),
          '✗ "Everything was down."\n✓ "Card checkouts failed for about 31% of customers; cash orders were unaffected."')
      ],
      practice: [
        B('اكتب جملة trigger وجملة exacerbated وجملة root cause لعطل.', 'Write a trigger sentence, an exacerbated sentence and a root-cause sentence for an incident.'),
        B('اكتب 5 whys كجمل كاملة.', 'Write the 5 whys as full sentences.'),
        B('صلّح 5 جمل فيها مبالغة.', 'Fix 5 exaggerated sentences.'),
        B('استخدم due to / because of / as a result of صح.', 'Use due to / because of / as a result of correctly.')
      ],
      words: [
        W('triggered by', 'اتبدأ بسبب', 'started by', 'The outage was triggered by a key expiring.'),
        W('exacerbated', 'اتسوّأ / زاد', 'made worse', 'Slow alerts exacerbated the impact.'),
        W('due to', 'بسبب', 'because of', 'Checkouts failed due to an expired key.'),
        W('partially', 'جزئيًا', 'in part, not completely', 'The service was partially available.'),
        W('intermittently', 'بشكل متقطع', 'on and off', 'Requests failed intermittently.')
      ],
      read: ['lib:Atlassian: Incident postmortems', { lib: 'Amazon Builders\' Library', what: B('لاحظ لغة الأسباب الدقيقة.', 'Notice the precise language of causes.') }],
      challenge: B('اكمل الـ postmortem: قسم Root cause بـ trigger وexacerbated وcontributing factors، و5 whys مكتوبة، وكل الجمل دقيقة من غير مبالغة.', 'Continue the postmortem: a Root cause section with trigger, exacerbated and contributing factors, written 5 whys, and every sentence precise without exaggeration.'),
      quiz: [
        Q(B('اللي بدأ العطل:', 'What started the outage:'), ['the trigger', 'the lesson', 'the mitigation'], 0, B('triggered by.', 'Triggered by.')),
        Q(B('5 whys تقف لما:', 'The 5 whys stop when:'), ['you reach something in the system you can change', 'you find a person to blame', 'after exactly 2'], 0, B('قابل للتغيير.', 'Changeable.')),
        Q(B('31% فشل:', '31% failed:'), ['«failed for about 31% of customers»', '«everything was down»', '«nothing happened»'], 0, B('دقة.', 'Precision.'))
      ] },

    { title: B('خطوات المتابعة', 'Follow-up actions'),
      goal: B('الـ postmortem يطلّع تحسينات حقيقية بتتنفّذ.', 'The postmortem produces real improvements that get done.'),
      learn: [
        L(B('خطوات قابلة للتنفيذ', 'Actionable items'),
          B('كل خطوة: فعل واضح، مسؤول واحد، ميعاد، ورابط تذكرة. «Add an alert 14 days before any key expires — Owner: Sara — Due: 20 Oct — #412». «Be more careful» مش خطوة.', 'Each item: a clear verb, one owner, a due date and a ticket link. «Add an alert 14 days before any key expires — Owner: Sara — Due: 20 Oct — #412». «Be more careful» is not an item.'),
          '✗ "Improve monitoring."\n✓ "Add an expiry alert 14 days before any API key expires. Owner: Sara. Due: 20 Oct. Ticket #412."'),
        L(B('أنواع الخطوات', 'Kinds of actions'),
          B('رتّبها: **prevent** (يمنع التكرار: تجديد آلي)، **detect** (يكتشف أسرع: تنبيه)، **mitigate** (يقلل الضرر: الدفع عند الاستلام كبديل تلقائي)، و**process** (runbook، تدريب). وخلّي العدد معقول (3–7) عشان فعلًا يتعمل.', 'Group them: **prevent** (stop it recurring: automatic renewal), **detect** (notice faster: an alert), **mitigate** (reduce harm: automatic cash-on-delivery fallback), and **process** (a runbook, training). Keep the number reasonable (3–7) so they actually get done.'),
          'prevent: auto-rotate keys · detect: expiry alert · mitigate: COD fallback · process: payments runbook'),
        L(B('مشاركة الدروس', 'Sharing the lessons'),
          B('اعرض الـ postmortem في اجتماع قصير، وابعت ملخص لكل الفرق: «What happened, what we learnt, what we changed». وبعد شهر راجع: الخطوات اتعملت؟ ده بيحوّل العطل لاستثمار.', 'Present the postmortem in a short meeting, and send a summary to all teams: «What happened, what we learnt, what we changed». A month later check: were the items done? This turns an outage into an investment.'),
          'Subject: Postmortem — checkout failures on 3 Oct (52 min)\nWhat happened · What we learnt · What we changed · Status of actions: 4/5 done')
      ],
      practice: [
        B('حوّل 5 خطوات غامضة لخطوات قابلة للتنفيذ.', 'Turn 5 vague items into actionable ones.'),
        B('صنّف الخطوات prevent/detect/mitigate/process.', 'Classify the items as prevent/detect/mitigate/process.'),
        B('اكتب إيميل مشاركة الدروس.', 'Write the lessons-sharing email.'),
        B('اكتب ملاحظة مراجعة بعد شهر.', 'Write a one-month review note.')
      ],
      words: [
        W('actionable', 'ينفع يتنفّذ بخطوة واضحة', 'able to be done as a clear step', 'Make every item actionable.'),
        W('owner', 'المسؤول', 'the person responsible', 'Each action has one owner.'),
        W('due date', 'الميعاد النهائي', 'the deadline', 'The due date is 20 October.'),
        W('prevent', 'يمنع', 'to stop something from happening', 'Auto-renewal prevents expiry outages.'),
        W('runbook', 'خطوات جاهزة للتعامل مع موقف', 'ready steps for handling a situation', 'Follow the payments runbook.')
      ],
      read: [{ t: 'Google SRE Book: Postmortem Culture', url: 'https://sre.google/sre-book/postmortem-culture/', what: B('اقرا جزء المتابعة ومشاركة الدروس.', 'Read the part on follow-up and sharing.') }],
      challenge: B('اكمل الـ postmortem بقسم Action items (5 خطوات قابلة للتنفيذ مصنّفة)، واكتب إيميل المشاركة، واعرضه في 3 دقايق بصوت عالي.', 'Finish the postmortem with an Action items section (5 classified actionable items), write the sharing email, and present it aloud in 3 minutes.'),
      quiz: [
        Q(B('خطوة قابلة للتنفيذ:', 'An actionable item:'), ['verb + owner + date + ticket', '«Be careful»', '«Improve things»'], 0, B('واضحة.', 'Clear.')),
        Q(B('تنبيه قبل انتهاء المفتاح نوعه:', 'An alert before a key expires is a:'), ['detect action', 'prevent action', 'process action'], 0, B('اكتشاف أسرع.', 'Faster detection.')),
        Q(B('بعد شهر:', 'A month later:'), ['check whether the items were done', 'forget it', 'write a new postmortem'], 0, B('متابعة.', 'Follow up.'))
      ] },

    { title: B('مراجعة الشهر الثامن ومشروعه', 'Month 8 review and project'),
      goal: B('كاتب تقني محترف في كل أنواع المستندات المهمة.', 'A professional technical writer across the important document types.'),
      review: [
        B('مستندات التصميم: الهيكل، الأهداف وغير الأهداف، البدائل، المقترح، والمراجعة (أسبوع 29).', 'Design docs: structure, goals and non-goals, alternatives, the proposal and review (week 29).'),
        B('أدلة الأسلوب: الصوت، الكلمات، التنسيق، Diátaxis، وdocs as code (أسبوع 30).', 'Style guides: voice, words, formatting, Diátaxis and docs as code (week 30).'),
        B('الدروس والمقالات: التخطيط، الخطوات، القصة، العناوين، والنشر (أسبوع 31).', 'Tutorials and articles: planning, steps, story, titles and publishing (week 31).'),
        B('التواصل وقت العطل، والـ postmortem بلا لوم، والجدول الزمني.', 'Communicating during outages, the blameless postmortem and the timeline.'),
        B('لغة الأسباب، والخطوات القابلة للتنفيذ، ومشاركة الدروس.', 'The language of causes, actionable items and sharing lessons.')
      ],
      project: B('مشروع الشهر الثامن: «ملف الكاتب المحترف» بالإنجليزي لمشروع واحد من الرحلة: design doc معتمد بعد مراجعة، توثيق كامل حسب Diátaxis بدليل أسلوب، درس ومقال منشورين (أو جاهزين)، وpostmortem كامل لعطل حقيقي أو تمرين — وعرض 6 دقايق بتحكي فيه رحلة المشروع.', 'Month 8 project: an English «professional writer’s file» for one journey project: an approved design doc after review, complete Diátaxis docs with a style guide, a published (or ready) tutorial and article, and a full postmortem for a real incident or drill — plus a 6-minute talk telling the project’s story.'),
      test: [
        Q(B('design doc فيه قسم:', 'A design doc has a section for:'), ['non-goals', 'jokes', 'passwords'], 0, B('اللي مش هيتعمل.', 'What will not be done.')),
        Q(B('decision matrix:', 'A decision matrix:'), ['compares options by criteria', 'lists bugs', 'is a timeline'], 0, B('مقارنة.', 'Comparison.')),
        Q(B('توثيق بـ second person:', 'Docs in the second person:'), ['«You can…»', '«The user will…»', '«One might…»'], 0, B('you.', 'You.')),
        Q(B('صفحة how-to:', 'A how-to page:'), ['steps for a specific goal', 'a full lesson for beginners', 'a list of parameters'], 0, B('Diátaxis.', 'Diátaxis.')),
        Q(B('خطوة في درس:', 'A tutorial step:'), ['one action + what you should see', 'a long story', 'only a picture'], 0, B('فعل ونتيجة.', 'Action and result.')),
        Q(B('canonical URL:', 'A canonical URL:'), ['marks the original version', 'shortens links', 'hides the post'], 0, B('للبحث.', 'For search.')),
        Q(B('مرحلة «Identified»:', 'The «Identified» stage:'), ['the cause is known', 'the issue is fixed', 'nobody knows yet'], 0, B('عرفنا السبب.', 'Cause known.')),
        Q(B('postmortem blameless:', 'A blameless postmortem:'), ['examines the system, not the person', 'names who to punish', 'skips the cause'], 0, B('تعلّم.', 'Learning.')),
        Q(B('سطر في الجدول الزمني:', 'A timeline line:'), ['time + event in the past simple', 'a future plan', 'an opinion'], 0, B('ماضي.', 'Past.')),
        Q(B('«exacerbated by»:', '«exacerbated by»:'), ['made worse by', 'started by', 'fixed by'], 0, B('سوّأه.', 'Worsened it.')),
        Q(B('«human error» كآخر سبب:', '«human error» as the final cause:'), ['keep asking why the system allowed it', 'stop there', 'blame the person'], 0, B('النظام.', 'The system.')),
        Q(B('خطوة متابعة كويسة:', 'A good follow-up item:'), ['has an owner, a date and a ticket', 'says «be careful»', 'has no owner'], 0, B('قابلة للتنفيذ.', 'Actionable.'))
      ] }
  ]
};
