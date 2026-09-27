// Week 7 — The present perfect at work.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'A2',
  title: B('Present perfect في الشغل', 'The present perfect at work'),
  goal: B('تقول اللي خلّصته والنتيجة لسه موجودة، وتكتب تقارير تقدم وتحديثات حوادث بـ have/has + التصريف التالت، وتفرّقه عن الماضي البسيط.',
          'Say what you have finished while the result still matters, and write progress reports and incident updates with have/has + past participle, telling it apart from the past simple.'),
  days: [
    { title: B('have / has + التصريف التالت', 'have / has + past participle'),
      goal: B('تبني جمل present perfect وتستخدمها للنتايج اللي لسه ليها أثر.', 'Build present-perfect sentences and use them for results that still matter now.'),
      learn: [
        'g:Present perfect للمحاولات والنتايج',
        { h: B('التصريف التالت', 'The past participle'),
          p: B('الأفعال المنتظمة: ed (fixed، deployed). والشاذة ليها شكل تالت: write ← written، do ← done، go ← gone، break ← broken، see ← seen.', 'Regular verbs: -ed (fixed, deployed). Irregular verbs have a third form: write → written, do → done, go → gone, break → broken, see → seen.'),
          ex: 'I have written the tests.\nThe deploy has broken the login page.\nWe have deployed the hotfix to production.' },
        { h: B('ليه present perfect في الشغل؟', 'Why the present perfect at work?'),
          p: B('لأن الناس عايزة تعرف الحالة دلوقتي: «I\'ve fixed it» = هو متصلح دلوقتي. من غير ما تقول إمتى بالظبط.', 'Because people want to know the state now: "I\'ve fixed it" = it is fixed now. You don\'t say exactly when.'),
          ex: 'Status: We have released version 2.1.\nThe pipeline has passed.' }
      ],
      practice: [
        B('اكتب 8 جمل عن حاجات خلّصتها في مشروعك (I\'ve set up…, I\'ve added…).', 'Write 8 sentences about things you have finished in your project (I\'ve set up…, I\'ve added…).'),
        B('اكتب التصريف التالت لـ 15 فعل بتستخدمها في الشغل.', 'Write the past participle of 15 verbs you use at work.'),
        B('اكتب 4 جمل has و4 have بفاعل مفرد وجمع.', 'Write 4 sentences with has and 4 with have, with singular and plural subjects.'),
        B('اكتب «release note» صغير من 4 سطور بالـ present perfect.', 'Write a small 4-line release note in the present perfect.')
      ],
      words: ['deploy', 'release', 'hotfix', 'patch', 'build', 'pipeline', 'staging / production'],
      read: [{ lib: 'Keep a Changelog', what: B('اقرا الصفحة ولاحظ أقسام Added وChanged وFixed.', 'Read the page and notice the sections Added, Changed and Fixed.') }],
      challenge: B('اكتب «What I\'ve done this month» في 10 جمل present perfect، كأنك بتبعتها لمديرك.', 'Write "What I\'ve done this month" in 10 present-perfect sentences, as if you were sending it to your manager.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I have wrote the tests.', 'I have written the tests.', 'I has written the tests.'], a: 1, why: B('have + التصريف التالت: written.', 'have + past participle: written.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The build have passed.', 'The build has passed.', 'The build has pass.'], a: 1, why: B('مفرد: has + passed.', 'Singular: has + passed.') },
        { q: B('«We\'ve deployed the fix» معناها إن:', '"We\'ve deployed the fix" means that:'), o: [B('التصليح شغال دلوقتي', 'the fix is live now'), B('هيتنشر بكرة', 'it will be deployed tomorrow'), B('اتلغى', 'it was cancelled')], a: 0, why: B('النتيجة موجودة دلوقتي.', 'The result exists now.') }
      ] },

    { title: B('present perfect ولا past simple؟', 'Present perfect or past simple?'),
      goal: B('تختار الزمن الصح: لو قلت إمتى بالظبط = past simple، ولو النتيجة المهمة = present perfect.', 'Pick the right tense: if you say exactly when = past simple; if the result matters = present perfect.'),
      learn: [
        'g:Present perfect ولا past simple',
        { h: B('كلمات بتحدد الزمن', 'Words that choose the tense'),
          p: B('yesterday، last week، in 2023، at 9 am ← past simple. already، yet، just، ever، never، so far، recently ← present perfect.', 'yesterday, last week, in 2023, at 9 am → past simple. already, yet, just, ever, never, so far, recently → present perfect.'),
          ex: 'I deployed it yesterday.       (past simple)\nI have already deployed it.    (present perfect)' },
        { h: B('تحديث حادثة (incident)', 'An incident update'),
          p: B('بنبدأ بالحالة (present perfect) وبعدين نحكي اللي حصل (past simple).', 'Start with the state (present perfect), then tell what happened (past simple).'),
          ex: 'We have restored the service.\nAt 14:05 the database ran out of memory, and the API returned 500 errors for 12 minutes.' }
      ],
      practice: [
        B('اكتب 5 أزواج جمل: واحدة past simple بوقت، وواحدة present perfect من غير وقت.', 'Write 5 pairs of sentences: one past simple with a time, one present perfect without.'),
        B('صلّح: `I have fixed it yesterday.` و`Did you ever use Docker?` و`We released it already.`', 'Fix: `I have fixed it yesterday.`, `Did you ever use Docker?` and `We released it already.`'),
        B('اكتب incident update من 5 جمل عن مشكلة حقيقية أو متخيّلة.', 'Write a 5-sentence incident update about a real or imagined problem.'),
        B('اقرا postmortem حقيقي منشور واستخرج 5 جمل present perfect و5 past simple.', 'Read a real published postmortem and pick out 5 present-perfect and 5 past-simple sentences.')
      ],
      words: ['log / logs', 'monitoring', 'uptime / downtime', 'latency', 'hosting', 'domain / DNS', 'SSH'],
      read: [{ lib: 'Atlassian: Incident postmortems', what: B('اقرا الصفحة ولاحظ الجمل اللي بتحكي الـ timeline بالماضي.', 'Read the page and notice the sentences that tell the timeline in the past.') }],
      challenge: B('اكتب postmortem قصير (Summary، Timeline، Cause، Fix) لمشكلة قابلتك، بالزمنين في مكانهم.', 'Write a short postmortem (Summary, Timeline, Cause, Fix) for a problem you had, with both tenses in the right places.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I have fixed the bug yesterday.', 'I fixed the bug yesterday.', 'I fix the bug yesterday.'], a: 1, why: B('yesterday = وقت محدد، فـ past simple.', 'yesterday is a specific time, so past simple.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Have you ever used Kubernetes?', 'Did you ever used Kubernetes?', 'Have you ever use Kubernetes?'], a: 0, why: B('ever مع present perfect: Have you ever used.', 'ever goes with the present perfect: Have you ever used.') },
        { q: B('في incident update، أول جملة غالبًا:', 'In an incident update, the first sentence is usually:'), o: ['We have restored the service.', 'At 14:05 the database crashed.', 'The database will crash.'], a: 0, why: B('ابدأ بالحالة دلوقتي.', 'Start with the state now.') }
      ] },

    { title: B('present perfect continuous', 'The present perfect continuous'),
      goal: B('تقول بقالك قد إيه بتعمل حاجة لسه مستمرة: I\'ve been working on it for 2 hours.', 'Say how long you have been doing something that is still going on: I\'ve been working on it for 2 hours.'),
      learn: [
        'g:Present perfect continuous',
        { h: B('بقالي… = have been + ing', 'For "I have been…"'),
          p: B('بالعربي «بقالي ساعتين بدوّر على الـ bug» = I\'ve been looking for the bug for two hours. ومتقولش I am looking since two hours.', 'The Arabic "baqali" idea = I\'ve been looking for the bug for two hours. Don\'t say "I am looking since two hours".'),
          ex: 'The server has been restarting every 10 minutes since this morning.\nWe\'ve been using this library for three years.' },
        'g:since مش من'
      ],
      practice: [
        B('اكتب 6 جمل «بقالي» عن حاجات شغال فيها (I\'ve been learning…, I\'ve been working on…).', 'Write 6 sentences about things you have been doing (I\'ve been learning…, I\'ve been working on…).'),
        B('اكتب 3 جمل عن مشاكل مستمرة في سيستم: has been failing / has been returning.', 'Write 3 sentences about ongoing problems in a system: has been failing / has been returning.'),
        B('صلّح: `I am working here since 2022.` و`It is failing from Monday.`', 'Fix: `I am working here since 2022.` and `It is failing from Monday.`'),
        B('اكتب رسالة لزميل تقول إنك بقالك وقت بتحاول تحل مشكلة ومحتاج مساعدة.', 'Write a message to a teammate saying you have been trying to solve a problem for a while and need help.')
      ],
      words: ['container', 'Docker image', 'load balancer', 'scalability', 'port', 'localhost', 'cron job'],
      read: [{ lib: 'EnglishPage', what: B('اقرا «Present Perfect Continuous» وحل التمرين.', 'Read "Present Perfect Continuous" and do the exercise.') }],
      challenge: B('اكتب رسالة «I\'m stuck» احترافية: بقالك قد إيه، جربت إيه، وعايز إيه، في 5 جمل.', 'Write a professional "I\'m stuck" message: how long, what you tried, and what you need, in 5 sentences.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I work on this bug since 10 am.', 'I\'ve been working on this bug since 10 am.', 'I am working on this bug from 10 am.'], a: 1, why: B('حاجة بدأت ولسه مستمرة: have been + ing + since.', 'Something that started and is still going on: have been + -ing + since.') },
        { q: B('«بقالنا 3 سنين بنستخدمه»:', '"We have used it for 3 years" as an ongoing action:'), o: ['We use it since 3 years.', 'We\'ve been using it for 3 years.', 'We are using it from 3 years.'], a: 1, why: B('for + مدة.', 'for + a length of time.') },
        { q: B('localhost معناها:', 'localhost means:'), o: [B('جهازك انت', 'your own machine'), B('سيرفر الشركة', 'the company server'), B('موقع على النت', 'a website on the internet')], a: 0, why: B('localhost = الجهاز اللي شغال عليه.', 'localhost = the machine you are on.') }
      ] },

    { title: B('already وyet وjust وever', 'already, yet, just and ever'),
      goal: B('تحط already وyet وjust وever وnever في مكانها وتستخدمها في رسايل الحالة.', 'Put already, yet, just, ever and never in the right place and use them in status messages.'),
      learn: [
        { h: B('مكانهم فين', 'Where they go'),
          p: B('already وjust وever وnever بين have والتصريف التالت: I\'ve just pushed. وyet في آخر الجملة في السؤال والنفي: Have you merged it yet? I haven\'t merged it yet.', 'already, just, ever and never go between have and the participle: I\'ve just pushed. yet goes at the end of questions and negatives: Have you merged it yet? I haven\'t merged it yet.'),
          ex: 'I\'ve already updated the docs.\nThe tests haven\'t finished yet.\nHave you ever used Terraform?' },
        { h: B('ردود جاهزة', 'Ready-made replies'),
          p: B('Not yet, I\'ll do it today. / Yes, I\'ve just done it. / I\'ve never used it, but I can learn.', 'Not yet, I\'ll do it today. / Yes, I\'ve just done it. / I\'ve never used it, but I can learn.'),
          ex: 'A: Have you reviewed my PR yet?\nB: Not yet, I\'ll look at it after lunch.' },
        'g:الإجابات القصيرة'
      ],
      practice: [
        B('اكتب 10 جمل: 2 بكل كلمة (already، yet، just، ever، never).', 'Write 10 sentences: 2 with each word (already, yet, just, ever, never).'),
        B('جاوب 5 أسئلة «Have you… yet?» بردود جاهزة مختلفة.', 'Answer 5 "Have you… yet?" questions with different ready-made replies.'),
        B('اكتب قايمة «Done / Not yet» لمشروعك: 5 حاجات خلصت و5 لسه.', 'Write a "Done / Not yet" list for your project: 5 things done and 5 not yet.'),
        B('ثبّت بيئة Python جديدة (venv) واكتب الخطوات والنتيجة بالـ present perfect.', 'Set up a new Python environment (venv) and write the steps and the result in the present perfect.')
      ],
      words: ['virtual environment', 'requirements file', 'upgrade / downgrade', 'package manager', 'npm', 'console', 'undefined / null'],
      read: [{ lib: 'Python Tutorial (الرسمي)', what: B('اقرا فصل «Virtual Environments and Packages» ونفّذ خطواته.', 'Read the "Virtual Environments and Packages" chapter and follow its steps.') }],
      challenge: B('اكتب checklist لـ release بالإنجليزي، وجنب كل بند اكتب حالته بجملة (I\'ve already… / not yet).', 'Write an English release checklist, and next to each item write its status in a sentence (I\'ve already… / not yet).'),
      quiz: [
        { q: B('فين yet؟', 'Where does yet go?'), o: ['I haven\'t yet merged it.', 'I haven\'t merged it yet.', 'I yet haven\'t merged it.'], a: 1, why: B('yet في آخر الجملة.', 'yet goes at the end.') },
        { q: B('فين just؟', 'Where does just go?'), o: ['I\'ve just pushed the code.', 'I just\'ve pushed the code.', 'I\'ve pushed just the code.'], a: 0, why: B('بين have والتصريف التالت.', 'Between have and the participle.') },
        { q: B('رد مناسب على «Have you fixed it yet?» لو لسه:', 'A good reply to "Have you fixed it yet?" if you haven\'t:'), o: ['No, I didn\'t yet.', 'Not yet, I\'ll finish it today.', 'Yes, not yet.'], a: 1, why: B('Not yet + خطة.', 'Not yet + a plan.') }
      ] },

    { title: B('تقرير التقدم', 'The progress report'),
      goal: B('تكتب تقرير تقدم أسبوعي منظم: اللي خلص، واللي شغال، والعوائق، والخطوة الجاية.', 'Write an organised weekly progress report: done, in progress, blockers and next steps.'),
      learn: [
        { h: B('قالب تقرير التقدم', 'The progress-report template'),
          p: B('Done: (present perfect) — In progress: (present continuous) — Blockers: (present simple) — Next: (will / going to).', 'Done: (present perfect) — In progress: (present continuous) — Blockers: (present simple) — Next: (will / going to).'),
          ex: 'Done: I\'ve finished the login page.\nIn progress: I\'m writing the API tests.\nBlockers: I need access to the staging server.\nNext: I\'ll start the payment integration.' },
        'g:good و well',
        { h: B('so far وrecently', 'so far and recently'),
          p: B('so far = لحد دلوقتي، وrecently = مؤخرًا. الاتنين مع present perfect: So far we\'ve migrated 60% of the data.', 'so far = up to now; recently = lately. Both go with the present perfect: So far we\'ve migrated 60% of the data.'),
          ex: 'So far, everything has worked well.\nWe\'ve recently moved to GitHub Actions.' }
      ],
      practice: [
        B('اكتب تقرير تقدم لأسبوعك بالقالب.', 'Write a progress report for your week with the template.'),
        B('اكتب 4 جمل بـ so far و4 بـ recently.', 'Write 4 sentences with so far and 4 with recently.'),
        B('اختار good ولا well في 6 جمل عن الشغل.', 'Choose good or well in 6 sentences about work.'),
        B('اكتب «milestone update» لعميل: وصلنا لإيه، وفاضل إيه، والموعد الجاي.', 'Write a milestone update for a client: what we have reached, what is left, and the next date.')
      ],
      words: ['milestone', 'deliver', 'ownership', 'estimate', 'priority', 'backlog', 'feedback'],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «present perfect» في قسم الجرامر واسمع الدرس الصوتي لو موجود.', 'Search the grammar section for "present perfect" and listen to the audio lesson if there is one.') }],
      challenge: B('ابعت تقرير التقدم ده فعلًا لحد (زميل، صاحب، مجموعة مذاكرة) واطلب منه feedback على الإنجليزي.', 'Actually send this progress report to someone (a colleague, a friend, a study group) and ask for feedback on the English.'),
      quiz: [
        { q: B('في قالب التقرير، قسم «Done» بيتكتب بـ:', 'In the report template, the "Done" section uses the:'), o: ['present perfect', 'present continuous', 'future'], a: 0, why: B('حاجات خلصت ونتيجتها موجودة.', 'Finished things whose results exist now.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The demo went good.', 'The demo went well.', 'The demo went goodly.'], a: 1, why: B('well ظرف بيوصف الفعل went.', 'well is the adverb that describes went.') },
        { q: B('backlog هو:', 'A backlog is:'), o: [B('قايمة الشغل اللي لسه متعملش', 'the list of work not done yet'), B('ملف log قديم', 'an old log file'), B('نسخة احتياطية', 'a backup')], a: 0, why: B('backlog = المهام المستنية.', 'backlog = the waiting tasks.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 8 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 8 opens when you score 70% or more.'),
      review: [
        B('have/has + التصريف التالت للنتايج اللي ليها أثر دلوقتي.', 'have/has + past participle for results that matter now.'),
        B('وقت محدد (yesterday، in 2023) = past simple.', 'A specific time (yesterday, in 2023) = past simple.'),
        B('بقالي = have been + ing + for/since.', '"I have been…" = have been + -ing + for/since.'),
        B('already/just/ever/never في النص، وyet في الآخر.', 'already/just/ever/never in the middle, yet at the end.'),
        B('تقرير التقدم: Done / In progress / Blockers / Next.', 'The progress report: Done / In progress / Blockers / Next.')
      ],
      project: B('اكتب «changelog + progress report» لمشروعك: قسم Changelog لآخر إصدار (Added / Changed / Fixed بالـ present perfect أو الأمر)، وتقرير تقدم بالقالب، وincident update لمشكلة واحدة بالزمنين. وسجّل التقرير بصوتك كأنه stand-up.',
                 'Write a "changelog + progress report" for your project: a Changelog section for the latest version (Added / Changed / Fixed), a progress report with the template, and an incident update for one problem using both tenses. Record the report in your voice as if it were a stand-up.'),
      test: [
        { q: B('التصريف التالت لـ break:', 'The past participle of break:'), o: ['breaked', 'broke', 'broken'], a: 2, why: B('break – broke – broken.', 'break – broke – broken.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['She has finish the report.', 'She has finished the report.', 'She have finished the report.'], a: 1, why: B('has + finished.', 'has + finished.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We have launched the app in May.', 'We launched the app in May.', 'We launch the app in May last.'], a: 1, why: B('in May = وقت محدد في الماضي.', 'in May = a specific past time.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Did you ever deploy to AWS?', 'Have you ever deployed to AWS?', 'Have you ever deploy to AWS?'], a: 1, why: B('ever + present perfect.', 'ever + present perfect.') },
        { q: B('«بقالي ساعة بستنى الـ build»:', '"I\'ve waited an hour and I\'m still waiting for the build":'), o: ['I wait the build since one hour.', 'I\'ve been waiting for the build for an hour.', 'I\'m waiting the build from an hour.'], a: 1, why: B('have been + ing + for.', 'have been + -ing + for.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The job has been failing since Monday.', 'The job is failing since Monday.', 'The job fails from Monday.'], a: 0, why: B('مستمر من نقطة بداية.', 'Ongoing from a starting point.') },
        { q: B('فين already؟', 'Where does already go?'), o: ['I\'ve already sent the invoice.', 'I\'ve sent already the invoice.', 'Already I\'ve sent already the invoice.'], a: 0, why: B('بين have والتصريف التالت.', 'Between have and the participle.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The tests haven\'t finished yet.', 'The tests haven\'t yet finish.', 'The tests didn\'t finished yet.'], a: 0, why: B('haven\'t + finished + yet.', 'haven\'t + finished + yet.') },
        { q: B('«Blockers» في تقرير التقدم معناها:', '"Blockers" in a progress report means:'), o: [B('حاجات موقفاك', 'things that stop you'), B('حاجات خلصت', 'things you finished'), B('الخطة الجاية', 'the next plan')], a: 0, why: B('blocker = عائق.', 'blocker = an obstacle.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['So far, we have migrated half of the users.', 'So far, we migrate half of the users.', 'So far, we will migrate half of the users.'], a: 0, why: B('so far + present perfect.', 'so far + present perfect.') },
        { q: B('hotfix هو:', 'A hotfix is:'), o: [B('تصليح سريع للإنتاج', 'a quick fix for production'), B('ميزة جديدة', 'a new feature'), B('اختبار', 'a test')], a: 0, why: B('تصليح عاجل بيتنشر على طول.', 'An urgent fix that is released right away.') },
        { q: B('downtime معناها:', 'downtime means:'), o: [B('الوقت اللي الخدمة كانت واقعة فيه', 'the time the service was down'), B('وقت الراحة', 'break time'), B('وقت التحميل', 'download time')], a: 0, why: B('عكس uptime.', 'The opposite of uptime.') }
      ] }
  ]
};
