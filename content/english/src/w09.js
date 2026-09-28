// Week 9 — Commit messages and pull requests.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('رسائل الـ commit والـ Pull Requests', 'Commit messages and pull requests'),
  goal: B('تكتب commit message واضح بالأمر، ووصف Pull Request فيه ليه واتغيّر إيه واتجرّب إزاي، وتستخدم كلمات Git والطرفية والاختصارات اللي في الريفيو.',
          'Write clear imperative commit messages and pull-request descriptions that say why, what changed and how it was tested, and use the words of Git, the terminal and review shorthand.'),
  days: [
    { title: B('الطرفية وGit بالإنجليزي', 'The terminal and Git in English'),
      goal: B('تقرا وتكتب أوامر الطرفية وGit بالإنجليزي وتشرح بتعمل إيه.', 'Read and write terminal and Git commands in English and explain what they do.'),
      learn: [
        { h: B('اقرا الأمر كجملة', 'Read a command as a sentence'),
          p: B('`git clone <url>` = clone the repository. `git pull` = pull the latest changes. `ls -la` = list all files, with the -l and -a flags. الـ flag = option بتغيّر سلوك الأمر.', '`git clone <url>` = clone the repository. `git pull` = pull the latest changes. `ls -la` = list all files, with the -l and -a flags. A flag is an option that changes what the command does.'),
          ex: 'git checkout -b fix-login   create a new branch called fix-login\ngit push -u origin main     push and set the upstream branch\npython script.py --verbose  run the script with the verbose flag' },
        { h: B('أفعال Git', 'Git verbs'),
          p: B('stage the changes، commit، push to the remote، pull from main، create a branch، switch branches، resolve a conflict، rebase onto main.', 'stage the changes, commit, push to the remote, pull from main, create a branch, switch branches, resolve a conflict, rebase onto main.'),
          ex: 'I\'ve pushed my branch.\nCan you pull the latest main and rebase?' },
        'g:Phrasal verbs والمفعول'
      ],
      practice: [
        B('اكتب 10 أوامر بتستخدمها وجنب كل واحد جملة إنجليزي بتقول بيعمل إيه.', 'Write 10 commands you use, each with an English sentence saying what it does.'),
        B('اعمل branch جديد وcommit وpush لأي تغيير، واكتب كل خطوة بالإنجليزي.', 'Create a new branch, commit and push a change, and write every step in English.'),
        B('اشرح 4 flags في أوامر بتستخدمها (-r, -f, --force, -v).', 'Explain 4 flags in commands you use (-r, -f, --force, -v).'),
        B('اكتب 4 جمل بـ phrasal verbs والمفعول في مكانه: set it up، look it up، turn it off.', 'Write 4 sentences with phrasal verbs and the object in the right place: set it up, look it up, turn it off.')
      ],
      words: ['push / pull', 'clone', 'terminal', 'command', 'flag / option', 'execute / run', 'script'],
      read: [{ lib: 'Pro Git (الكتاب الرسمي)', what: B('اقرا فصل «Git Basics» أول قسمين، وقول كل أمر بصوت عالي.', 'Read the first two sections of "Git Basics" and say each command out loud.') }],
      challenge: B('اكتب «Git cheat sheet» شخصي: 12 أمر، كل واحد بسطر إنجليزي بيشرح إمتى تستخدمه.', 'Write a personal Git cheat sheet: 12 commands, each with an English line saying when to use it.'),
      quiz: [
        { q: B('`git pull` بيعمل:', '`git pull` does:'), o: [B('يجيب آخر التغييرات من الـ remote', 'gets the latest changes from the remote'), B('يرفع تغييراتك', 'uploads your changes'), B('يمسح الـ branch', 'deletes the branch')], a: 0, why: B('pull = اسحب، push = ادفع.', 'pull = bring in; push = send out.') },
        { q: B('flag في الأمر هو:', 'A flag in a command is:'), o: [B('option بتغيّر سلوك الأمر', 'an option that changes the command\'s behaviour'), B('اسم الملف', 'the file name'), B('خطأ', 'an error')], a: 0, why: B('زي -v أو --force.', 'Like -v or --force.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Turn off it.', 'Turn it off.', 'Turn off to it.'], a: 1, why: B('الضمير بين الفعل وoff.', 'The pronoun goes between the verb and off.') }
      ] },

    { title: B('رسالة الـ commit', 'The commit message'),
      goal: B('تكتب عنوان commit بالأمر في أقل من 50 حرف، وجسم بيشرح ليه، وتستخدم Conventional Commits.', 'Write an imperative commit subject under 50 characters, a body that explains why, and use Conventional Commits.'),
      learn: [
        { h: B('القواعد السبعة باختصار', 'The seven rules in short'),
          p: B('عنوان بالأمر (Add، Fix، Remove)، حرف كبير في الأول، من غير نقطة في الآخر، أقل من 50 حرف، سطر فاضي، وجسم بيشرح «إيه وليه» مش «إزاي».', 'An imperative subject (Add, Fix, Remove), a capital first letter, no full stop at the end, under 50 characters, a blank line, and a body that explains what and why, not how.'),
          ex: 'Fix crash when the invoice list is empty\n\nThe report assumed at least one invoice and\nraised IndexError on new accounts.' },
        { h: B('Conventional Commits', 'Conventional Commits'),
          p: B('type(scope): وصف. الأنواع: feat (ميزة)، fix (تصليح)، docs، refactor، test، chore. والتغيير اللي بيكسر حاجة: BREAKING CHANGE.', 'type(scope): description. Types: feat, fix, docs, refactor, test, chore. A change that breaks something: BREAKING CHANGE.'),
          ex: 'feat(auth): add login with Google\nfix(api): return 404 for unknown users\ndocs: explain the .env variables' },
        'g:Imperative (الأمر) للخطوات والـ commits'
      ],
      practice: [
        B('أعد كتابة آخر 10 commit messages عندك بالقواعد.', 'Rewrite your last 10 commit messages with the rules.'),
        B('اكتب 6 commits بصيغة Conventional Commits لتغييرات مختلفة.', 'Write 6 Conventional Commits for different changes.'),
        B('اكتب جسم commit (3 سطور) بيشرح ليه لتغيير عملته.', 'Write a 3-line commit body explaining why for a change you made.'),
        B('صلّح: `fixed bug.` و`Updates` و`changing the files and some stuff`.', 'Fix: `fixed bug.`, `Updates` and `changing the files and some stuff`.')
      ],
      words: ['imperative', 'tense', 'present perfect', 'contraction', 'possessive', 'gerund', 'modal verb'],
      read: [{ lib: 'How to Write a Git Commit Message', what: B('اقرا المقال كله وركّز على «The seven rules».', 'Read the whole article and focus on "The seven rules".') }],
      challenge: B('ضيف commit-msg template لمشروعك (.gitmessage) فيه تذكير بالقواعد، واستخدمه أسبوع.', 'Add a commit message template (.gitmessage) to your project with a reminder of the rules, and use it for a week.'),
      quiz: [
        { q: B('أحسن عنوان commit:', 'The best commit subject:'), o: ['fixed the bug.', 'Fix timeout in the payment webhook', 'Fixing some things'], a: 1, why: B('أمر، محدد، من غير نقطة.', 'Imperative, specific, no full stop.') },
        { q: B('في Conventional Commits، ميزة جديدة نوعها:', 'In Conventional Commits, a new feature is:'), o: ['fix', 'feat', 'chore'], a: 1, why: B('feat = feature.', 'feat = feature.') },
        { q: B('جسم الـ commit المفروض يشرح:', 'The commit body should explain:'), o: [B('إيه وليه', 'what and why'), B('كل سطر اتغيّر', 'every line changed'), B('اسمك', 'your name')], a: 0, why: B('الـ diff بيوري «إزاي».', 'The diff already shows how.') }
      ] },

    { title: B('وصف الـ Pull Request', 'The pull-request description'),
      goal: B('تكتب وصف PR: Summary، Changes، How to test، وتفهم اختصارات الريفيو.', 'Write a PR description — Summary, Changes, How to test — and understand review shorthand.'),
      learn: [
        { h: B('قالب الـ PR', 'The PR template'),
          p: B('Summary (ليه)، Changes (قايمة قصيرة)، How to test (خطوات)، Screenshots لو في واجهة، وNotes (مخاطر أو حاجات لسه).', 'Summary (why), Changes (a short list), How to test (steps), Screenshots if there is UI, and Notes (risks or open items).'),
          ex: '## Summary\nCustomers could not pay with saved cards.\n\n## Changes\n- Fix the card lookup query\n- Add a test for saved cards\n\n## How to test\n1. Log in as test@example.com\n2. Pay with the saved Visa card' },
        { h: B('اختصارات الريفيو', 'Review shorthand'),
          p: B('LGTM = looks good to me، PTAL = please take a look، WIP = لسه شغال عليه، nit = ملاحظة صغيرة مش مهمة.', 'LGTM = looks good to me, PTAL = please take a look, WIP = work in progress, nit = a small, unimportant note.'),
          ex: 'WIP: don\'t merge yet.\nPTAL, I\'ve addressed your comments.\nLGTM, just one nit about naming.' },
        'g:التوازي في القوايم'
      ],
      practice: [
        B('اكتب وصف PR كامل بالقالب لتغيير عملته (أو هتعمله).', 'Write a full PR description with the template for a change you made (or will make).'),
        B('اكتب قايمة Changes من 5 بنود بنفس الشكل (كلها أوامر).', 'Write a Changes list of 5 items in the same form (all imperatives).'),
        B('اكتب 5 تعليقات ريفيو قصيرة فيها LGTM وPTAL وnit.', 'Write 5 short review comments using LGTM, PTAL and nit.'),
        B('اقرا 3 PRs في مشروع مفتوح المصدر ولاحظ شكل الوصف، واكتب أحسن حاجة شفتها.', 'Read 3 PRs in an open-source project, notice how they are described, and write down the best thing you saw.')
      ],
      code: [
        { u: B('قالب PR تنسخه', 'A PR template to copy'), p: '## Summary\nWhy is this change needed?\n\n## Changes\n- \n\n## How to test\n1. \n\n## Notes\nRisks, follow-ups, screenshots.' }
      ],
      words: ['LGTM', 'PTAL', 'WIP', 'PR / MR', 'CI/CD', 'continuous integration', 'QA'],
      read: [{ lib: 'GitHub Docs: Pull requests', what: B('اقرا «About pull requests» و«Creating a pull request».', 'Read "About pull requests" and "Creating a pull request".') }],
      challenge: B('ضيف ملف `.github/pull_request_template.md` لمشروعك بالقالب، وافتح PR حقيقي بيه.', 'Add a `.github/pull_request_template.md` file with the template to your project and open a real PR with it.'),
      quiz: [
        { q: B('PTAL معناها:', 'PTAL means:'), o: ['please take a look', 'pull the latest', 'push to all'], a: 0, why: B('طلب ريفيو.', 'A request for review.') },
        { q: B('قسم «How to test» فيه:', 'The "How to test" section contains:'), o: [B('خطوات يجرّب بيها المراجع', 'steps the reviewer can follow to try it'), B('اسم الفرع', 'the branch name'), B('الـ commits', 'the commits')], a: 0, why: B('خطوات واضحة ومرقمة.', 'Clear, numbered steps.') },
        { q: B('WIP في عنوان PR معناها:', 'WIP in a PR title means:'), o: [B('لسه مخلصش، متعملش merge', 'not finished, don\'t merge'), B('جاهز', 'ready'), B('اتقفل', 'closed')], a: 0, why: B('work in progress.', 'work in progress.') }
      ] },

    { title: B('وصف التغييرات بالـ phrasal verbs', 'Describing changes with phrasal verbs'),
      goal: B('تستخدم الأفعال المركبة الشائعة في الشغل لوصف التغييرات والتنضيف والمراجعة.', 'Use common phrasal verbs at work to describe changes, cleanup and review.'),
      learn: [
        { h: B('أفعال مركبة في الريفيو', 'Phrasal verbs in review'),
          p: B('clean up (نضّف)، break down (قسّم)، point out (نبّه على)، go over (راجع)، sort out (حل)، wrap up (خلّص)، check out (جرّب/شوف).', 'clean up, break down (split into parts), point out, go over (review), sort out (solve), wrap up (finish), check out (try/look at).'),
          ex: 'I cleaned up the old helpers.\nCan you break this PR down into smaller ones?\nThanks for pointing that out.' },
        'g:الفاصلة في القوايم',
        'g:الفاصلة بعد الكلمات الافتتاحية'
      ],
      practice: [
        B('اكتب 7 جمل، واحدة لكل فعل مركب من كلمات النهارده، عن شغل حقيقي.', 'Write 7 sentences, one per phrasal verb from today\'s words, about real work.'),
        B('اكتب رد على ريفيو بتقول فيه إنك صلّحت 3 ملاحظات (I\'ve sorted out…, cleaned up…).', 'Write a reply to a review saying you fixed 3 comments (I\'ve sorted out…, cleaned up…).'),
        B('حط الفواصل الصح في 4 قوايم وجمل بتبدأ بـ However/First/Also.', 'Add the right commas to 4 lists and to sentences starting with However/First/Also.'),
        B('قسّم (break down) مهمة كبيرة عندك لـ 5 مهام صغيرة واكتبهم بالأمر.', 'Break down a big task of yours into 5 small tasks and write them as imperatives.')
      ],
      words: ['clean up', 'break down', 'point out', 'go over', 'sort out', 'wrap up', 'check out'],
      read: [{ lib: 'Google Engineering Practices: Code Review', what: B('اقرا «The CL author\'s guide» ← «Writing good CL descriptions».', 'Read "The CL author\'s guide" → "Writing good CL descriptions".') }],
      challenge: B('خد PR كبير (عندك أو في مشروع مفتوح) واكتب إزاي كنت هتقسّمه لـ 3 PRs أصغر، بوصف لكل واحد.', 'Take a big PR (yours or an open-source one) and write how you would break it down into 3 smaller PRs, with a description for each.'),
      quiz: [
        { q: B('«Can you go over my PR?» معناها:', '"Can you go over my PR?" means:'), o: [B('تراجعه', 'review it'), B('تمسحه', 'delete it'), B('تعمله merge', 'merge it')], a: 0, why: B('go over = راجع.', 'go over = review.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['However the tests pass.', 'However, the tests pass.', 'However the, tests pass.'], a: 1, why: B('فاصلة بعد الكلمة الافتتاحية.', 'A comma after an introductory word.') },
        { q: B('«Thanks for pointing that out» بتقولها لما:', 'You say "Thanks for pointing that out" when:'), o: [B('حد نبّهك لحاجة', 'someone drew your attention to something'), B('حد عمل merge', 'someone merged'), B('حد مشي', 'someone left')], a: 0, why: B('point out = ينبّه.', 'point out = draw attention to.') }
      ] },

    { title: B('الاختبارات في الـ PR', 'Tests in the PR'),
      goal: B('تكتب عن الاختبارات: unit tests، والنتيجة المتوقعة، ونجح/فشل، والـ mocks.', 'Write about tests: unit tests, expected results, pass/fail and mocks.'),
      learn: [
        { h: B('اسم التست جملة', 'A test name is a sentence'),
          p: B('test_returns_404_for_unknown_user، test_sends_email_when_invoice_is_overdue. اسم التست بيقول السيناريو والنتيجة المتوقعة.', 'test_returns_404_for_unknown_user, test_sends_email_when_invoice_is_overdue. A test name states the scenario and the expected result.'),
          ex: 'def test_total_is_zero_for_empty_cart():\n    assert cart_total([]) == 0' },
        { h: B('كلام عن التستات', 'Talking about tests'),
          p: B('All tests pass. / Two tests are failing. / I added a test for… / I mocked the payment API. / Coverage went up to 85%.', 'All tests pass. / Two tests are failing. / I added a test for… / I mocked the payment API. / Coverage went up to 85%.'),
          ex: 'How to test: run `pytest tests/test_invoices.py`. All 12 tests should pass.' },
        'g:Gerund ولا to + فعل'
      ],
      practice: [
        B('أعد تسمية 5 تستات عندك (أو اكتب 5 أسماء) لجمل بتقول السيناريو والنتيجة.', 'Rename 5 of your tests (or write 5 names) as sentences stating the scenario and the result.'),
        B('اكتب 3 unit tests لدالة واحدة، وجملة إنجليزي فوق كل واحد.', 'Write 3 unit tests for one function, with an English sentence above each.'),
        B('اكتب قسم «Testing» في PR: عملت إيه، وإيه اللي لسه مش متغطّي.', 'Write a "Testing" section in a PR: what you did and what is not covered yet.'),
        B('اختار gerund ولا to: avoid (to use/using)، decide (to add/adding)، enjoy (to write/writing).', 'Choose gerund or to: avoid (to use/using), decide (to add/adding), enjoy (to write/writing).')
      ],
      words: ['unit test', 'test case', 'expected result', 'pass / fail', 'mock', 'test / testing', 'suite'],
      read: [{ lib: 'Real Python', what: B('دوّر على «Getting Started With Testing in Python» واقرا أول جزء.', 'Search for "Getting Started With Testing in Python" and read the first part.') }],
      challenge: B('افتح PR فيه تست جديد وقسم Testing كامل بالإنجليزي، واطلب ريفيو بـ PTAL.', 'Open a PR with a new test and a complete English Testing section, and ask for review with PTAL.'),
      quiz: [
        { q: B('أحسن اسم تست:', 'The best test name:'), o: ['test1', 'test_returns_empty_list_when_no_orders', 'test_orders_function_check'], a: 1, why: B('بيقول السيناريو والنتيجة.', 'It says the scenario and the result.') },
        { q: B('mock يعني:', 'A mock is:'), o: [B('نسخة مزيفة من حاجة خارجية في التست', 'a fake version of an external thing in a test'), B('خطأ في التست', 'an error in a test'), B('تست بطيء', 'a slow test')], a: 0, why: B('عشان متكلمش الـ API الحقيقي.', 'So you don\'t call the real API.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Avoid to hardcode secrets.', 'Avoid hardcoding secrets.', 'Avoid hardcode secrets.'], a: 1, why: B('avoid + ing.', 'avoid + -ing.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 10 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 10 opens when you score 70% or more.'),
      review: [
        B('اقرا أوامر الطرفية وGit كجمل، والـ flags.', 'Read terminal and Git commands as sentences, and the flags.'),
        B('عنوان commit: أمر، حرف كبير، من غير نقطة، أقل من 50 حرف.', 'A commit subject: imperative, capital letter, no full stop, under 50 characters.'),
        B('Conventional Commits: feat / fix / docs / refactor / test / chore.', 'Conventional Commits: feat / fix / docs / refactor / test / chore.'),
        B('وصف PR: Summary / Changes / How to test / Notes، وLGTM وPTAL وWIP وnit.', 'A PR description: Summary / Changes / How to test / Notes, and LGTM, PTAL, WIP and nit.'),
        B('أسماء التستات جمل، وavoid/enjoy + ing.', 'Test names are sentences, and avoid/enjoy + -ing.')
      ],
      project: B('افتح PR حقيقي (في مشروعك أو مساهمة صغيرة في مشروع مفتوح المصدر): commits بقواعد الأسبوع، ووصف كامل بالقالب، وتست واحد على الأقل، ورد على أي تعليق ريفيو بالإنجليزي. لو مفيش ريفيو، راجع الـ PR بنفسك واكتب 3 تعليقات.',
                 'Open a real PR (in your project or a small open-source contribution): commits that follow this week\'s rules, a full description with the template, at least one test, and English replies to any review comment. If nobody reviews it, review it yourself and write 3 comments.'),
      test: [
        { q: B('`git checkout -b fix-login` بيعمل:', '`git checkout -b fix-login` does:'), o: [B('يعمل branch جديد ويروح عليه', 'creates a new branch and switches to it'), B('يمسح الـ branch', 'deletes the branch'), B('يعمل push', 'pushes')], a: 0, why: B('-b = اعمل branch جديد.', '-b = create a new branch.') },
        { q: B('أحسن عنوان commit:', 'The best commit subject:'), o: ['Added new feature for users.', 'Add CSV export to the reports page', 'adding export'], a: 1, why: B('أمر ومحدد ومن غير نقطة.', 'Imperative, specific, no full stop.') },
        { q: B('commit لتحديث README بس نوعه:', 'A commit that only updates the README is:'), o: ['feat', 'docs', 'fix'], a: 1, why: B('docs = توثيق.', 'docs = documentation.') },
        { q: B('LGTM معناها:', 'LGTM means:'), o: ['looks good to me', 'let\'s go to main', 'last good test merged'], a: 0, why: B('موافقة في الريفيو.', 'Approval in a review.') },
        { q: B('nit في تعليق ريفيو معناها:', 'nit in a review comment means:'), o: [B('ملاحظة صغيرة مش ضرورية', 'a small, optional remark'), B('خطأ كبير', 'a serious bug'), B('رفض', 'a rejection')], a: 0, why: B('nitpick = حاجة صغيرة.', 'nitpick = a small thing.') },
        { q: B('اختار القايمة المتوازية لـ Changes:', 'Choose the parallel Changes list:'), o: ['- Fix the query\n- Adding a test\n- The docs are updated', '- Fix the query\n- Add a test\n- Update the docs', '- Fixed\n- Add\n- Updating docs'], a: 1, why: B('كلهم أوامر.', 'All imperatives.') },
        { q: B('«Can you break this PR down?» معناها:', '"Can you break this PR down?" means:'), o: [B('تقسمه لـ PRs أصغر', 'split it into smaller PRs'), B('تكسره', 'break the code'), B('تقفله', 'close it')], a: 0, why: B('break down = قسّم.', 'break down = split up.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I\'ve sorted out the merge conflict.', 'I\'ve sorted the merge conflict out of.', 'I\'ve sort out the merge conflict.'], a: 0, why: B('sort out + المفعول، وhave + sorted.', 'sort out + object, and have + sorted.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['First we need tests.', 'First, we need tests.', 'First we, need tests.'], a: 1, why: B('فاصلة بعد الكلمة الافتتاحية.', 'A comma after the introductory word.') },
        { q: B('expected result في التست هو:', 'The expected result in a test is:'), o: [B('اللي المفروض يحصل', 'what should happen'), B('اللي حصل فعلًا', 'what actually happened'), B('اسم التست', 'the test name')], a: 0, why: B('expected = المتوقع.', 'expected = what should happen.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We decided adding a cache.', 'We decided to add a cache.', 'We decided add a cache.'], a: 1, why: B('decide + to.', 'decide + to.') },
        { q: B('CI بتعمل إيه غالبًا مع كل push؟', 'What does CI usually do on every push?'), o: [B('تبني الكود وتشغّل التستات', 'builds the code and runs the tests'), B('تمسح الـ branch', 'deletes the branch'), B('تبعت فاتورة', 'sends an invoice')], a: 0, why: B('continuous integration.', 'continuous integration.') }
      ] }
  ]
};
