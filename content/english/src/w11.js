// Week 11 — Bug reports.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('تقارير الأخطاء (Bug reports)', 'Bug reports'),
  goal: B('تكتب bug report بيخلّي أي حد يكرر المشكلة في دقيقتين: عنوان محدد، وخطوات، ومتوقع مقابل فعلي، والبيئة، والـ logs، وتحكي اللي حصل بالماضي المستمر والتام.',
          'Write a bug report that lets anyone reproduce the problem in two minutes: a specific title, steps, expected vs. actual, the environment and logs, telling what happened with the past continuous and past perfect.'),
  days: [
    { title: B('العنوان والخطوات', 'The title and the steps'),
      goal: B('تكتب عنوان bug محدد وخطوات تكرار مرقمة بأفعال واجهة.', 'Write a specific bug title and numbered reproduction steps with UI verbs.'),
      learn: [
        { h: B('عنوان الـ bug', 'The bug title'),
          p: B('[فين] + [إيه اللي حصل] + [إمتى]. ✗ «Login broken» ✓ «Login fails with 500 when the email has a plus sign».', '[Where] + [what happens] + [when]. ✗ "Login broken" ✓ "Login fails with 500 when the email has a plus sign".'),
          ex: 'Export button does nothing on Safari 17\nInvoice total is wrong when the discount is 100%' },
        { h: B('خطوات التكرار', 'Steps to reproduce'),
          p: B('مرقمة، كل خطوة فعل واحد، من غير «then I tried…». وابدأ من حالة معروفة: Log in as a new user.', 'Numbered, one action per step, no "then I tried…". Start from a known state: Log in as a new user.'),
          ex: 'Steps to reproduce:\n1. Log in as test@example.com.\n2. Open Reports.\n3. Press Ctrl+E.\nExpected: a CSV file downloads.\nActual: nothing happens; the console shows TypeError.' },
        'g:الجملة الناقصة (fragment)'
      ],
      practice: [
        B('أعد كتابة 5 عناوين bugs غامضة لعناوين محددة.', 'Rewrite 5 vague bug titles as specific ones.'),
        B('اختار bug حقيقي (أو اعمل واحد) واكتب خطوات تكراره في 5 خطوات.', 'Pick a real bug (or create one) and write its reproduction steps in 5 steps.'),
        B('اكتب Expected وActual لـ 4 مشاكل مختلفة.', 'Write Expected and Actual for 4 different problems.'),
        B('صلّح الجمل الناقصة: `Because the token expired.` و`When clicking Save.`', 'Fix the fragments: `Because the token expired.` and `When clicking Save.`')
      ],
      words: ['result', 'user', 'access', 'press (a key)', 'click / double-click', 'drag', 'hotkey / shortcut'],
      read: [{ lib: 'Stack Overflow: How to ask a good question', what: B('اقرا قسم «Help others reproduce the problem».', 'Read the section "Help others reproduce the problem".') }],
      challenge: B('افتح issue حقيقي (في مشروعك أو أي مشروع مفتوح) بعنوان محدد وخطوات تكرار.', 'Open a real issue (in your project or any open-source one) with a specific title and reproduction steps.'),
      quiz: [
        { q: B('أحسن عنوان bug:', 'The best bug title:'), o: ['It doesn\'t work', 'Upload fails for files over 10 MB on Firefox', 'Help!!!'], a: 1, why: B('فين، وإيه، وإمتى.', 'Where, what, and when.') },
        { q: B('خطوة تكرار كويسة:', 'A good reproduction step:'), o: ['3. Click Export.', '3. Then I clicked some buttons and tried again.', '3. Do the thing.'], a: 0, why: B('فعل واحد محدد.', 'One specific action.') },
        { q: B('Actual behavior هو:', 'Actual behavior is:'), o: [B('اللي حصل فعلًا', 'what really happened'), B('اللي المفروض يحصل', 'what should happen'), B('الحل', 'the fix')], a: 0, why: B('actual = الفعلي.', 'actual = what really happened.') }
      ] },

    { title: B('البيئة والـ logs', 'Environment and logs'),
      goal: B('تكتب قسم Environment كامل، وتلزق الـ logs صح، وتوصف أعراض الأداء.', 'Write a complete Environment section, paste logs properly, and describe performance symptoms.'),
      learn: [
        { h: B('قسم Environment', 'The Environment section'),
          p: B('OS والإصدار، والمتصفح، وإصدار التطبيق، واللغة أو الـ runtime، وأي إعداد مختلف. من غيرهم ممكن محدش يعرف يكرر.', 'The OS and version, the browser, the app version, the language or runtime, and any unusual setting. Without them, nobody may be able to reproduce it.'),
          ex: 'Environment:\n- OS: Windows 11 23H2\n- Browser: Chrome 129\n- App version: 2.4.1\n- Python 3.12' },
        { h: B('وصف الأداء', 'Describing performance'),
          p: B('The page freezes for 10 seconds. / CPU usage goes up to 100%. / Memory keeps growing until it crashes. / It only happens when the cache is empty.', 'The page freezes for 10 seconds. / CPU usage goes up to 100%. / Memory keeps growing until it crashes. / It only happens when the cache is empty.'),
          ex: 'After about 2 hours, the worker uses 4 GB of RAM and restarts.' },
        'g:even و also مكانهم'
      ],
      practice: [
        B('اكتب قسم Environment لجهازك الحالي.', 'Write an Environment section for your current machine.'),
        B('خد log حقيقي والزقه في Markdown code block، وعلّم أهم سطرين.', 'Take a real log, paste it in a Markdown code block, and point out the two most important lines.'),
        B('اكتب 5 جمل بتوصف مشاكل أداء بأرقام.', 'Write 5 sentences describing performance problems with numbers.'),
        B('حط also وeven في مكانهم في 4 جمل: It also fails on Linux. It even fails with an empty file.', 'Put also and even in the right place in 4 sentences: It also fails on Linux. It even fails with an empty file.')
      ],
      words: ['operating system (OS)', 'CPU', 'RAM / memory', 'thread', 'cache', 'storage (full)', 'restart / reboot'],
      read: [{ lib: 'GitHub Docs', what: B('دوّر على «About issue and pull request templates» واقرا مثال bug report template.', 'Search for "About issue and pull request templates" and read the bug-report template example.') }],
      challenge: B('اعمل issue template لمشروعك (bug_report.md) فيه كل الأقسام.', 'Create an issue template for your project (bug_report.md) with all the sections.'),
      quiz: [
        { q: B('ليه قسم Environment مهم؟', 'Why does the Environment section matter?'), o: [B('عشان المشكلة ممكن تحصل على نظام معيّن بس', 'because the bug may happen only on one system'), B('عشان الشكل', 'for looks'), B('مش مهم', 'it doesn\'t')], a: 0, why: B('من غيره صعب تكرر.', 'Without it, reproduction is hard.') },
        { q: B('فين also؟', 'Where does also go?'), o: ['It fails also on macOS.', 'It also fails on macOS.', 'Also it fails also.'], a: 1, why: B('قبل الفعل العادي.', 'Before the main verb.') },
        { q: B('«Memory keeps growing» معناها:', '"Memory keeps growing" means:'), o: [B('الذاكرة بتزيد باستمرار', 'memory use goes up and up'), B('الذاكرة ثابتة', 'memory is stable'), B('الذاكرة اتمسحت', 'memory was cleared')], a: 0, why: B('keep + ing = يستمر.', 'keep + -ing = continue.') }
      ] },

    { title: B('احكي اللي حصل', 'Telling what happened'),
      goal: B('تحكي قصة المشكلة: كنت بعمل إيه (past continuous)، وإيه اللي كان حصل قبلها (past perfect).', 'Tell the story of the problem: what you were doing (past continuous) and what had happened before (past perfect).'),
      learn: [
        'g:Past continuous',
        'g:Past perfect',
        { h: B('قصة bug في 3 أزمنة', 'A bug story in three tenses'),
          p: B('I was importing a CSV (past continuous) when the app crashed (past simple). I had changed the delimiter the day before (past perfect).', 'I was importing a CSV (past continuous) when the app crashed (past simple). I had changed the delimiter the day before (past perfect).'),
          ex: 'While the job was running, the database restarted.\nThe migration had already dropped the old column, so the rollback failed.' }
      ],
      practice: [
        B('احكي 3 مشاكل حصلتلك بجملة past continuous + past simple.', 'Tell 3 problems that happened to you with a past continuous + past simple sentence.'),
        B('اكتب 3 جمل past perfect عن سبب مشكلة (had changed / had deleted).', 'Write 3 past-perfect sentences about the cause of a problem (had changed / had deleted).'),
        B('اكتب try/except لكود بيقرا ملف، وجملة تشرح بيحصل إيه لو الملف مش موجود.', 'Write a try/except for code that reads a file, with a sentence explaining what happens if the file is missing.'),
        B('اكتب «Timeline» لمشكلة في 5 سطور بالأوقات والأزمنة الصح.', 'Write a 5-line "Timeline" of a problem with times and the right tenses.')
      ],
      words: ['fail-safe', 'local / global', 'try / except', 'key / value', 'nested list', 'append', 'constructor'],
      read: [{ lib: 'Perfect English Grammar', what: B('اقرا «Past continuous» و«Past perfect» وحل تمرين من كل واحد.', 'Read "Past continuous" and "Past perfect" and do one exercise from each.') }],
      challenge: B('اكتب قسم «What happened» لـ bug report في 6 جمل بالتلات أزمنة.', 'Write a 6-sentence "What happened" section for a bug report using all three tenses.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I uploaded the file when the page crashed.', 'I was uploading the file when the page crashed.', 'I have uploaded the file when the page crashed.'], a: 1, why: B('حاجة كانت مستمرة واتقطعت: was + ing.', 'Something in progress that was interrupted: was + -ing.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The rollback failed because someone deleted had the backup.', 'The rollback failed because someone had deleted the backup.', 'The rollback failed because someone has deleted the backup.'], a: 1, why: B('حاجة حصلت قبل حاجة تانية في الماضي: had + participle.', 'Something that happened before another past event: had + participle.') },
        { q: B('try / except بيستخدم لـ:', 'try / except is used to:'), o: [B('مسك الأخطاء والتعامل معاها', 'catch errors and handle them'), B('تكرار الكود', 'repeat code'), B('تعريف كلاس', 'define a class')], a: 0, why: B('exception handling.', 'exception handling.') }
      ] },

    { title: B('الأولوية والحالات الحدّية', 'Severity and edge cases'),
      goal: B('تقول الـ bug خطير قد إيه وبيأثر على مين، وتتكلم عن الـ edge cases والمتطلبات.', 'Say how serious a bug is and who it affects, and talk about edge cases and requirements.'),
      learn: [
        { h: B('severity وpriority', 'Severity and priority'),
          p: B('severity = المشكلة خطيرة قد إيه (critical، major، minor). priority = هنصلحها إمتى (high، medium، low). والتأثير: It affects all users / only admins / about 5% of orders.', 'severity = how serious it is (critical, major, minor). priority = when we will fix it (high, medium, low). Impact: It affects all users / only admins / about 5% of orders.'),
          ex: 'Severity: major — payments fail for saved cards.\nImpact: about 12% of checkouts since Monday.\nWorkaround: pay with a new card.' },
        { h: B('edge case', 'Edge cases'),
          p: B('الحالة الحدّية: قايمة فاضية، رقم صفر أو سالب، اسم فيه حروف عربي، ملف ضخم، timezone مختلف. «It only fails for this edge case.»', 'An edge case: an empty list, zero or a negative number, a name with non-Latin letters, a huge file, a different timezone. "It only fails for this edge case."'),
          ex: 'Edge cases to test:\n- an empty cart\n- a 100% discount\n- a customer in UTC+14' },
        'g:الوصف اللي في المكان الغلط (dangling modifier)'
      ],
      practice: [
        B('صنّف 5 bugs (حقيقية أو متخيّلة) بـ severity وpriority، وجملة Impact لكل واحد.', 'Classify 5 bugs (real or imagined) by severity and priority, with an Impact sentence for each.'),
        B('اكتب 6 edge cases لدالة بتحسب الخصم.', 'Write 6 edge cases for a function that calculates a discount.'),
        B('اكتب user story واحدة وacceptance criteria ليها في 3 بنود.', 'Write one user story and 3 acceptance criteria for it.'),
        B('صلّح: `After clicking Save, the page reloads.` لو المقصود المستخدم هو اللي بيدوس.', 'Fix: `After clicking Save, the page reloads.` when you mean the user clicks.')
      ],
      words: ['edge case', 'bottleneck', 'requirement', 'stakeholder', 'sprint (Agile)', 'acceptance testing', 'user story'],
      read: [{ lib: 'The Scrum Guide', what: B('اقرا تعريف «Product Backlog» و«Sprint» بس.', 'Read only the definitions of "Product Backlog" and "Sprint".') }],
      challenge: B('اكتب bug report لـ edge case في كودك، بـ severity وimpact وworkaround.', 'Write a bug report for an edge case in your code, with severity, impact and a workaround.'),
      quiz: [
        { q: B('priority بتقول:', 'priority tells:'), o: [B('هنصلحها إمتى', 'when we will fix it'), B('المشكلة خطيرة قد إيه', 'how serious it is'), B('مين لقاها', 'who found it')], a: 0, why: B('severity = خطورة، priority = ترتيب الشغل.', 'severity = seriousness; priority = order of work.') },
        { q: B('أنهي edge case؟', 'Which is an edge case?'), o: ['a normal order', 'an order with zero items', 'a logged-in user'], a: 1, why: B('حالة على الحدود.', 'A case at the boundary.') },
        { q: B('user story بتتكتب غالبًا:', 'A user story is usually written as:'), o: ['As a [user], I want [goal] so that [reason].', 'The system must crash.', 'Fix the bug.'], a: 0, why: B('القالب المشهور.', 'The well-known template.') }
      ] },

    { title: B('Regex في الـ debugging', 'Regex in debugging'),
      goal: B('توصف regex بالإنجليزي وتكتب bug report عن نمط مش بيطابق.', 'Describe a regex in English and write a bug report about a pattern that doesn\'t match.'),
      learn: [
        { h: B('اقرا regex بصوت عالي', 'Read a regex out loud'),
          p: B('`^\\d{3}-\\d{4}$` = starts with three digits, then a dash, then four digits, and ends there. و`.*` = any characters، و`[A-Z]` = one capital letter.', '`^\\d{3}-\\d{4}$` = starts with three digits, then a dash, then four digits, and ends there. `.*` = any characters, and `[A-Z]` = one capital letter.'),
          ex: 'The pattern matches "555-1234" but not "5551234".\nThe group captures the domain name.' },
        { h: B('وصف مشكلة regex', 'Describing a regex problem'),
          p: B('The pattern doesn\'t match emails with a plus sign. / It matches too much (greedy). / The search is case-sensitive, so "Error" is not found.', 'The pattern doesn\'t match emails with a plus sign. / It matches too much (greedy). / The search is case-sensitive, so "Error" is not found.'),
          ex: 'Expected: "a+b@x.com" matches.\nActual: no match.' },
        'g:الجمل المتلزقة (run-on / comma splice)'
      ],
      practice: [
        B('اشرح 4 regex patterns بالإنجليزي جملة جملة.', 'Explain 4 regex patterns in English, sentence by sentence.'),
        B('جرّب pattern على 5 نصوص في regex101 أو بايثون، واكتب matches / doesn\'t match لكل واحد.', 'Test a pattern on 5 strings in regex101 or Python, and write matches / doesn\'t match for each.'),
        B('اكتب bug report صغير لـ regex بيطابق أكتر من اللازم.', 'Write a small bug report for a regex that matches too much.'),
        B('صلّح الجمل المتلزقة: `The regex is wrong it matches spaces.`', 'Fix the run-on: `The regex is wrong it matches spaces.`')
      ],
      words: ['regular expression (regex)', 'pattern', 'match', 'search', 'group', 'wildcard', 'case-insensitive'],
      read: [{ lib: 'Automate the Boring Stuff (النسخة الإنجليزي)', what: B('اقرا فصل «Pattern Matching with Regular Expressions» لحد «Grouping».', 'Read the chapter "Pattern Matching with Regular Expressions" up to "Grouping".') }],
      challenge: B('اكتب regex بيتحقق من رقم تليفون مصري، و5 tests، وREADME صغير بيشرحه بالإنجليزي.', 'Write a regex that validates an Egyptian phone number, 5 tests, and a small English README explaining it.'),
      quiz: [
        { q: B('`^` في regex معناها:', '`^` in a regex means:'), o: ['start of the string', 'end of the string', 'any character'], a: 0, why: B('^ = البداية، $ = النهاية.', '^ = start, $ = end.') },
        { q: B('case-insensitive يعني:', 'case-insensitive means:'), o: [B('مش فارق كبير وصغير', 'capital and small letters are treated the same'), B('حساس للحروف', 'sensitive to case'), B('من غير أرقام', 'without numbers')], a: 0, why: B('Error = error.', 'Error = error.') },
        { q: B('صلّح: `The test failed it timed out.`', 'Fix: `The test failed it timed out.`'), o: ['The test failed, it timed out.', 'The test failed because it timed out.', 'The test failed it, timed out.'], a: 1, why: B('اربط الجملتين بأداة أو نقطة.', 'Join the two clauses with a linking word or a full stop.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 12 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 12 opens when you score 70% or more.'),
      review: [
        B('عنوان bug: فين + إيه + إمتى، وخطوات مرقمة بفعل واحد.', 'A bug title: where + what + when, and numbered steps with one action each.'),
        B('Expected / Actual، وEnvironment، والـ logs في code block.', 'Expected / Actual, Environment, and logs in a code block.'),
        B('was + ing للي كان بيحصل، وhad + participle للي حصل قبلها.', 'was + -ing for what was happening, had + participle for what happened before.'),
        B('severity مقابل priority، والـ impact، والـ edge cases.', 'Severity vs. priority, impact, and edge cases.'),
        B('اقرا regex بالإنجليزي، ومن غير جمل متلزقة أو ناقصة.', 'Read regexes in English, with no run-ons or fragments.')
      ],
      project: B('اكتب 3 bug reports كاملة لمشاكل حقيقية في مشروعك (أو مشروع مفتوح المصدر): عنوان، Steps، Expected/Actual، Environment، Logs، Severity، Impact، Workaround. وافتح واحد منهم فعلًا كـ issue، وصلّح واحد واكتب PR بيقفله (Fixes #12).',
                 'Write 3 complete bug reports for real problems in your project (or an open-source one): title, Steps, Expected/Actual, Environment, Logs, Severity, Impact and Workaround. Actually open one as an issue, and fix one with a PR that closes it (Fixes #12).'),
      test: [
        { q: B('أحسن عنوان bug:', 'The best bug title:'), o: ['Bug in reports', 'Report PDF is empty when the date range crosses a year', 'PDF problem!!'], a: 1, why: B('محدد: فين، وإيه، وإمتى.', 'Specific: where, what and when.') },
        { q: B('خطوات التكرار لازم تكون:', 'Reproduction steps should be:'), o: [B('مرقمة وكل خطوة فعل واحد', 'numbered, one action per step'), B('فقرة طويلة', 'one long paragraph'), B('من غير ترتيب', 'in any order')], a: 0, why: B('عشان أي حد يكررها.', 'So anyone can repeat them.') },
        { q: B('اختار الجملة الكاملة:', 'Choose the complete sentence:'), o: ['Because the cache was empty.', 'The page was slow because the cache was empty.', 'When the cache empty.'], a: 1, why: B('فيها فاعل وفعل رئيسي.', 'It has a subject and a main verb.') },
        { q: B('قسم Environment فيه:', 'The Environment section contains:'), o: [B('النظام والمتصفح والإصدارات', 'OS, browser and versions'), B('اسم المدير', 'the manager\'s name'), B('الحل', 'the fix')], a: 0, why: B('عشان المشكلة ممكن تبقى في بيئة معينة.', 'Because the bug may be environment-specific.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['It even fails with one row.', 'It fails even with one row even.', 'Even it fails with one row.'], a: 0, why: B('even قبل الفعل أو قبل الجزء اللي بتأكده.', 'even goes before the verb or the part it stresses.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I was deploying when the server went down.', 'I deployed when the server was going down always.', 'I have deployed when the server went down.'], a: 0, why: B('مستمر + حدث قطعه.', 'An ongoing action + an event that interrupted it.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The job failed because someone had changed the password.', 'The job failed because someone has changed the password.', 'The job failed because someone changes the password.'], a: 0, why: B('حصل قبل الفشل: had changed.', 'It happened before the failure: had changed.') },
        { q: B('severity critical معناها:', 'Critical severity means:'), o: [B('خطيرة جدًا وبتوقف حاجة أساسية', 'very serious; it stops something essential'), B('شكل بس', 'cosmetic only'), B('اتصلحت', 'fixed')], a: 0, why: B('أعلى درجة خطورة.', 'The highest severity.') },
        { q: B('workaround هو:', 'A workaround is:'), o: [B('طريقة مؤقتة تتجنب بيها المشكلة', 'a temporary way around the problem'), B('التصليح النهائي', 'the final fix'), B('bug جديد', 'a new bug')], a: 0, why: B('حل مؤقت.', 'A temporary solution.') },
        { q: B('bottleneck هو:', 'A bottleneck is:'), o: [B('الجزء اللي بيبطّأ السيستم كله', 'the part that slows the whole system'), B('زجاجة', 'a bottle'), B('نسخة احتياطية', 'a backup')], a: 0, why: B('عنق الزجاجة.', 'The narrow neck that limits the flow.') },
        { q: B('`[0-9]+` بتطابق:', '`[0-9]+` matches:'), o: [B('رقم واحد أو أكتر', 'one or more digits'), B('حروف بس', 'letters only'), B('مسافات', 'spaces')], a: 0, why: B('+ = واحد أو أكتر.', '+ = one or more.') },
        { q: B('في PR، «Fixes #12» بيعمل:', 'In a PR, "Fixes #12" does:'), o: [B('يقفل issue رقم 12 لما يتعمل merge', 'closes issue 12 when merged'), B('يمسح issue 12', 'deletes issue 12'), B('يفتح issue جديد', 'opens a new issue')], a: 0, why: B('كلمة مفتاحية في GitHub.', 'A GitHub keyword.') }
      ] }
  ]
};
