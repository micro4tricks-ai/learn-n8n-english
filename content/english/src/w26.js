// English week 26 — Reading code, changelogs and issues.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2',
  title: B('قراءة الكود وسجلات التغيير والـ issues', 'Reading code, changelogs and issues'),
  goal: B('تفهم مشروع مفتوح المصدر من الإنجليزي اللي حواليه: أسماء الكود وتعليقاته، وسجل التغييرات وأدلة الترقية، ونقاشات الـ issues، وتاريخ الـ commits — وتشارك فيهم بأسلوب محترم.',
          'Understand an open-source project from the English around it: code names and comments, changelogs and upgrade guides, issue discussions and commit history — and take part in them respectfully.'),
  days: [
    { title: B('قراءة كود مش بتاعك', 'Reading code that is not yours'),
      goal: B('تستخدم الإنجليزي في الأسماء والتعليقات عشان تفهم كود جديد بسرعة.', 'Use the English in names and comments to understand new code quickly.'),
      learn: [
        L(B('الأسماء كدليل', 'Names as clues'),
          B('الأسماء الكويسة بتحكي القصة: `parse_` (يحلّل نص)، `build_` (يبني)، `ensure_` (يتأكد ولو مش موجود يعمله)، `try_` (يحاول وممكن يفشل بهدوء)، `is_/has_` (true/false)، `_unsafe` (خد بالك)، `legacy` (قديم ومحتفظين بيه). اقرا الأسماء كجمل.', 'Good names tell the story: `parse_` (analyses text), `build_` (constructs), `ensure_` (makes sure, creating it if missing), `try_` (attempts and may fail quietly), `is_/has_` (true/false), `_unsafe` (be careful), `legacy` (old, kept for compatibility). Read names as sentences.'),
          'ensure_bucket_exists()   → creates it if missing\ntry_parse_date(text)     → returns None instead of raising\nlegacy_export_v1()       → old path, avoid in new code'),
        L(B('نقطة البداية', 'The entry point'),
          B('متبدأش تقرا من أول ملف. دوّر على **entry point** (`main`، `index.js`، `app.py`، الـ CLI)، وامشي ورا طلب واحد من الأول للآخر. علّم كل **call site** للدالة اللي بتهمك (المكان اللي بتتنادي منه) عشان تفهم إزاي بتتستخدم.', 'Do not start reading from the first file. Find the **entry point** (`main`, `index.js`, `app.py`, the CLI) and follow one request from start to end. Mark every **call site** of the function you care about (where it is called from) to see how it is used.'),
          '"Where is this called?" → search the codebase for send_invoice(\n→ 3 call sites: api/orders.py, jobs/nightly.py, tests/test_billing.py'),
        L(B('اسأل عن كود بشكل محترم', 'Asking about code respectfully'),
          B('لما تسأل عن كود حد تاني: وضّح اللي فهمته الأول، وبعدين سؤال محدد: «I think `retry_after` is in seconds because of line 42. Is that right, or is it milliseconds?». ده أحسن بكتير من «I don’t understand this code».', 'When asking about someone else’s code: say what you understood first, then a specific question: «I think `retry_after` is in seconds because of line 42. Is that right, or is it milliseconds?». This is far better than «I don’t understand this code».'),
          '"From reading `sync.py`, it looks like orders are fetched before customers.\n Is there a reason for that order, or could they run in parallel?"')
      ],
      practice: [
        B('افتح مشروع صغير على GitHub ودوّر على الـ entry point.', 'Open a small project on GitHub and find the entry point.'),
        B('اقرا 15 اسم دالة واكتب بالعربي كل واحدة بتعمل إيه من اسمها بس.', 'Read 15 function names and write in Arabic what each does from its name alone.'),
        B('دوّر على call sites لدالة واحدة.', 'Find the call sites of one function.'),
        B('اكتب سؤالين عن الكود بالأسلوب ده.', 'Write two questions about the code in this style.')
      ],
      words: [
        W('codebase', 'كل كود المشروع', 'all the code of a project', 'Search the codebase for the function.'),
        W('entry point', 'المكان اللي البرنامج بيبدأ منه', 'where a program starts running', 'app.py is the entry point.'),
        W('call site', 'المكان اللي الدالة بتتنادي منه', 'a place where a function is called', 'There are three call sites.'),
        W('legacy', 'قديم ومحتفظين بيه عشان التوافق', 'old and kept for compatibility', 'Avoid the legacy export in new code.'),
        W('naming hint', 'معلومة بتفهمها من اسم في الكود', 'information you get from a name in code', 'The prefix try_ is a naming hint.')
      ],
      read: ['lib:GitHub Docs', { lib: 'Learn X in Y minutes', what: B('اقرا صفحة لغة مش بتعرفها وشوف الأسماء.', 'Read the page for a language you do not know and look at the names.') }],
      challenge: B('اختار مشروع مفتوح المصدر صغير، وامشي ورا طلب واحد من الـ entry point للآخر، واكتب نص صفحة بالإنجليزي بيشرح المسار مع أسماء الدوال.', 'Pick a small open-source project, follow one request from the entry point to the end, and write half a page in English explaining the path with the function names.'),
      quiz: [
        Q(B('`ensure_folder()` غالبًا:', '`ensure_folder()` probably:'), ['creates the folder if it is missing', 'deletes the folder', 'only reads it'], 0, B('ensure = اتأكد وجهّز.', 'ensure = make sure, preparing it.')),
        Q(B('تبدأ تقرا مشروع جديد من:', 'Start reading a new project from:'), ['the entry point', 'the longest file', 'the licence'], 0, B('ومشي ورا طلب.', 'Then follow one request.')),
        Q(B('سؤال أحسن:', 'A better question:'), ['«I think X because of line 42 — is that right?»', '«This code is bad.»', '«Explain everything.»'], 0, B('محدد ويبيّن مجهودك.', 'Specific and shows your effort.'))
      ] },

    { title: B('سجل التغييرات وأدلة الترقية', 'Changelogs and upgrade guides'),
      goal: B('تعرف قبل الترقية إيه اللي هيتكسر عندك.', 'Know before upgrading what will break for you.'),
      learn: [
        L(B('أقسام الـ changelog', 'Changelog sections'),
          B('حسب Keep a Changelog: **Added** (جديد)، **Changed** (اتغيّر)، **Deprecated** (لسه شغال بس هيتشال)، **Removed** (اتشال)، **Fixed** (اتصلّح)، **Security** (ثغرة اتقفلت). أهم حاجتين قبل أي ترقية: Removed وأي سطر فيه «BREAKING».', 'Following Keep a Changelog: **Added**, **Changed**, **Deprecated** (still works but will be removed), **Removed**, **Fixed**, **Security** (a vulnerability closed). The two most important before any upgrade: Removed and any line marked «BREAKING».'),
          '## [3.0.0] - 2026-09-30\n### Removed\n- BREAKING: `client.get_all()`; use `client.list(paginate=True)`.\n### Security\n- Fix token leak in debug logs (CVE-…).'),
        L(B('دليل الترقية', 'The migration guide'),
          B('الإصدارات الكبيرة بييجي معاها **migration guide**: «Before → After» لكل تغيير. لغته فيها: `replace X with Y`، `X has been renamed to Y`، `X now defaults to Y`، `X no longer accepts Y`، `you must now …`. اعمل checklist منه لمشروعك.', 'Major releases come with a **migration guide**: «Before → After» for each change. Its language includes: `replace X with Y`, `X has been renamed to Y`, `X now defaults to Y`, `X no longer accepts Y`, `you must now …`. Turn it into a checklist for your project.'),
          '`timeout` now defaults to 30 seconds (was unlimited).\n`fetch_all()` has been renamed to `list()`.\nThe client no longer accepts plain-text tokens.'),
        L(B('أرقام الإصدارات وطرق الترقية', 'Version numbers and upgrade paths'),
          B('major.minor.patch: الـ major ممكن يكسر، الـ minor يضيف من غير ما يكسر، الـ patch إصلاحات. **release candidate** (rc) = شبه نهائي للتجربة. **LTS** = دعم طويل. و**upgrade path**: أحيانًا لازم تعدّي على إصدار في النص (2.x ← 2.9 ← 3.0).', 'major.minor.patch: a major may break, a minor adds without breaking, a patch fixes. A **release candidate** (rc) is nearly final, for testing. **LTS** = long-term support. And the **upgrade path**: sometimes you must pass through a middle version (2.x → 2.9 → 3.0).'),
          '3.0.0-rc.1  → release candidate, test only\n2.9 (LTS)   → supported until 2027\nupgrade path: 2.4 → 2.9 → 3.0')
      ],
      practice: [
        B('اقرا changelog لمكتبة بتستخدمها لآخر 3 إصدارات.', 'Read a library you use’s changelog for the last 3 releases.'),
        B('طلّع كل البنود Removed وBREAKING.', 'Extract all the Removed and BREAKING items.'),
        B('حوّل migration guide لـ checklist لمشروعك.', 'Turn a migration guide into a checklist for your project.'),
        B('اكتب changelog لآخر إصدار في مشروعك بالأقسام الستة.', 'Write a changelog for your project’s latest release with the six sections.')
      ],
      words: [
        W('changelog entry', 'سطر في سجل التغييرات', 'one line in a changelog', 'Each PR adds a changelog entry.'),
        W('migration guide', 'دليل خطوات الانتقال لإصدار جديد', 'a step guide for moving to a new version', 'Follow the migration guide before upgrading.'),
        W('upgrade path', 'الطريق من إصدار لإصدار', 'the route from one version to another', 'The upgrade path goes through 2.9.'),
        W('release candidate', 'نسخة شبه نهائية للتجربة', 'an almost-final version for testing', 'Do not use a release candidate in production.'),
        W('lts', 'إصدار بدعم طويل المدى', 'a version with long-term support', 'Stay on the LTS release.')
      ],
      read: ['lib:Keep a Changelog', 'lib:Semantic Versioning'],
      challenge: B('اختار مكتبة عندك إصدار major جديد، واقرا الـ changelog ودليل الترقية، واكتب «خطة ترقية» بالإنجليزي: التغييرات اللي بتأثر عليك، الخطوات، والمخاطر.', 'Pick a library with a new major release, read the changelog and upgrade guide, and write an «upgrade plan» in English: the changes that affect you, the steps and the risks.'),
      quiz: [
        Q(B('قبل الترقية اقرا أولًا:', 'Before upgrading, read first:'), ['Removed and BREAKING items', 'Fixed only', 'the README title'], 0, B('اللي ممكن يكسر.', 'What can break.')),
        Q(B('«X has been renamed to Y»:', '«X has been renamed to Y»:'), ['use Y instead of X', 'X and Y both work forever', 'Y was removed'], 0, B('اسم جديد.', 'A new name.')),
        Q(B('3.0.0-rc.1:', '3.0.0-rc.1 is:'), ['a release candidate for testing', 'a final LTS', 'a patch'], 0, B('شبه نهائي.', 'Nearly final.'))
      ] },

    { title: B('قراءة الـ issues', 'Reading issues'),
      goal: B('تفهم نقاش issue طويل وتعرف حالته في دقايق.', 'Understand a long issue discussion and its status in minutes.'),
      learn: [
        L(B('الـ labels', 'Labels'),
          B('الـ **labels** بتلخّص الحالة: `bug`، `enhancement` (طلب ميزة)، `question`، **good first issue** (مناسب للمساهمين الجداد)، `help wanted`، `duplicate`، **wontfix** (مش هيتعمل)، `needs repro`، **stale** (محدش رد من فترة). اقرا الـ labels قبل النقاش.', '**Labels** summarise the status: `bug`, `enhancement` (a feature request), `question`, **good first issue** (suitable for new contributors), `help wanted`, `duplicate`, **wontfix** (will not be done), `needs repro`, **stale** (no reply for a while). Read the labels before the discussion.'),
          'labels: bug · needs repro · stale\n→ the maintainers cannot reproduce it and nobody answered for weeks'),
        L(B('جمل المشرفين', 'Maintainers’ phrases'),
          B('`Can you provide a minimal reproduction?` (ابعت أصغر مثال بيعيد المشكلة). `PRs welcome!` (مش هنعملها بس اعملها انت). `Closing as stale.` `This is working as intended.` (مش bug). `Duplicate of #123.` `Fixed in v2.4.1.` `We’ll consider this for the next major.`', '`Can you provide a minimal reproduction?` (send the smallest example showing the problem). `PRs welcome!` (we will not do it, but you can). `Closing as stale.` `This is working as intended.` (not a bug). `Duplicate of #123.` `Fixed in v2.4.1.` `We’ll consider this for the next major.`'),
          '"Thanks for the report! Can you provide a minimal reproduction?\n Without it we can’t investigate. Closing as stale if there’s no reply in 14 days."'),
        L(B('اقرا من الآخر', 'Read from the end'),
          B('في issue فيه 80 تعليق، ابدأ بـ: العنوان، وأول تعليق، وآخر 5 تعليقات، والتعليقات اللي عليها تفاعل كتير أو من **maintainer** (عليها badge). غالبًا الحل أو الـ workaround في آخر النقاش أو في تعليق متثبّت.', 'In an issue with 80 comments, start with: the title, the first comment, the last 5 comments, and comments with many reactions or from a **maintainer** (marked with a badge). The fix or workaround is usually at the end or in a pinned comment.'),
          'title → first post → last 5 comments → maintainer comments → linked PR')
      ],
      practice: [
        B('اقرا 3 issues مقفولة في مشروع مشهور ولخّص كل واحدة في سطرين.', 'Read 3 closed issues in a popular project and summarise each in two lines.'),
        B('اعمل جدول بـ 10 labels ومعناها.', 'Make a table of 10 labels and their meanings.'),
        B('طلّع 8 جمل مشرفين وترجمتها.', 'Collect 8 maintainer phrases with translations.'),
        B('دوّر على good first issue واقراه.', 'Find a good first issue and read it.')
      ],
      words: [
        W('issue thread', 'النقاش كله تحت issue', 'the whole discussion under an issue', 'Read the issue thread from the end.'),
        W('good first issue', 'مهمة سهلة للمساهمين الجداد', 'an easy task for new contributors', 'Start with a good first issue.'),
        W('wontfix', 'مش هيتعمل (قرار المشرفين)', 'will not be done (a maintainers’ decision)', 'The request was labelled wontfix.'),
        W('stale', 'متساب من غير رد فترة طويلة', 'left without a reply for a long time', 'The bot closed the stale issue.'),
        W('maintainer', 'الشخص المسؤول عن المشروع', 'a person responsible for a project', 'Wait for a maintainer to review.')
      ],
      read: [{ t: 'Open Source Guides', url: 'https://opensource.guide/', what: B('اقرا «Best practices for maintainers» عشان تفهم جملهم.', 'Read «Best practices for maintainers» to understand their phrases.') }, { lib: 'GitHub Docs', what: B('دوّر على «About issues» و«labels».', 'Search for «About issues» and «labels».') }],
      challenge: B('اختار issue طويل (40+ تعليق) في مشروع بتستخدمه، واكتب ملخص بالإنجليزي: المشكلة، الأسباب اللي اتقالت، الـ workaround، والحالة الحالية.', 'Choose a long issue (40+ comments) in a project you use and write an English summary: the problem, the causes discussed, the workaround and the current status.'),
      quiz: [
        Q(B('«PRs welcome!» معناها:', '«PRs welcome!» means:'), ['the maintainers will accept a fix from you', 'the feature is done', 'the issue is closed'], 0, B('اعملها انت.', 'You can do it.')),
        Q(B('«Working as intended»:', '«Working as intended»:'), ['it is not a bug', 'it is a bug', 'it is fixed'], 0, B('ده التصميم.', 'That is the design.')),
        Q(B('في issue طويل ابدأ بـ:', 'In a long issue start with:'), ['the title, first post and last comments', 'every comment in order', 'only the reactions'], 0, B('الحل غالبًا في الآخر.', 'The answer is often at the end.'))
      ] },

    { title: B('المشاركة في الـ issues', 'Taking part in issues'),
      goal: B('تكتب تعليقات مفيدة بتقرّب الحل.', 'Write useful comments that bring the fix closer.'),
      learn: [
        L(B('مش «+1»', 'Not «+1»'),
          B('تعليق «+1» أو «same here» بيضايق المشتركين ومبيساعدش. لو عندك نفس المشكلة: اعمل **upvote** بالتفاعل 👍، أو ضيف **معلومة جديدة**: إصدار مختلف، نظام مختلف، أو خطوة إعادة أبسط.', 'A «+1» or «same here» comment annoys subscribers and does not help. If you have the same problem: **upvote** with the 👍 reaction, or add **new information**: a different version, a different OS, or a simpler repro step.'),
          '✗ "+1, any update??"\n✓ "Same on v2.4.1 with Node 22 on Windows. It does not happen on v2.3.0,\n   so it may be a regression from #812."'),
        L(B('شارك الحل المؤقت', 'Share a workaround'),
          B('لو لقيت طريقة تمشّي بيها الشغل، اكتبها بوضوح: الخطوات، الكود، وحدودها. «Workaround until this is fixed: … Note that this disables caching.» ده بيساعد ناس كتير وبيبنيلك سمعة.', 'If you found a way to keep working, write it clearly: the steps, the code and its limits. «Workaround until this is fixed: … Note that this disables caching.» This helps many people and builds your reputation.'),
          '"Workaround until this is fixed: pin the client to 2.3.0\n (`npm i client@2.3.0`). Note that you lose the new retry option."'),
        L(B('المتابعة بأدب', 'Following up politely'),
          B('لو issue فيه مشكلة مهمة ومحدش رد أسبوعين: «Is there anything else I can provide to help investigate?» أو «Would a PR for this be welcome?». متكتبش «any update?» كل يومين، ومتعملش mention لمشرفين كتير.', 'If an important issue has had no reply for two weeks: «Is there anything else I can provide to help investigate?» or «Would a PR for this be welcome?». Do not write «any update?» every two days, and do not mention many maintainers.'),
          '"Is there anything else I can provide to help investigate?\n I’m happy to open a PR if you can point me to the right module."')
      ],
      practice: [
        B('اكتب 3 تعليقات مفيدة لـ issues مفتوحة (من غير ما تبعتهم لو مش متأكد).', 'Write 3 useful comments for open issues (do not post them if unsure).'),
        B('حوّل تعليق «+1» لتعليق فيه معلومة جديدة.', 'Turn a «+1» comment into one with new information.'),
        B('اكتب workaround بخطوات وحدود.', 'Write a workaround with steps and limits.'),
        B('اكتب رسالة متابعة مهذبة.', 'Write a polite follow-up message.')
      ],
      words: [
        W('upvote', 'تأييد بتفاعل بدل تعليق', 'support shown with a reaction instead of a comment', 'Upvote the issue instead of commenting +1.'),
        W('triage', 'فرز وترتيب الـ issues حسب الأهمية', 'sorting issues by importance', 'The team triages new issues every Monday.'),
        W('pinned issue', 'issue متثبّت فوق القايمة', 'an issue fixed at the top of the list', 'Read the pinned issue before reporting.'),
        W('mention', 'ذكر شخص بـ @ عشان يوصله إشعار', 'tagging someone with @ so they get notified', 'Avoid mentions unless needed.'),
        W('follow-up', 'متابعة بعد فترة', 'a later message checking progress', 'A polite follow-up after two weeks is fine.')
      ],
      read: ['lib:Stack Overflow: How to ask a good question', { t: 'Open Source Guides: How to contribute', url: 'https://opensource.guide/how-to-contribute/', what: B('اقرا جزء التواصل في الـ issues.', 'Read the part on communicating in issues.') }],
      challenge: B('اكتب 5 تعليقات نموذجية لمواقف مختلفة (نفس المشكلة بمعلومة جديدة، workaround، طلب توضيح، عرض PR، متابعة) وخلّي AI يراجع النبرة.', 'Write 5 model comments for different situations (same problem with new info, a workaround, asking for clarification, offering a PR, a follow-up) and have an AI review the tone.'),
      quiz: [
        Q(B('عندك نفس المشكلة ومفيش معلومة جديدة:', 'You have the same problem and no new information:'), ['add a 👍 reaction', 'comment «+1»', 'open a new issue'], 0, B('upvote.', 'Upvote.')),
        Q(B('workaround كويس فيه:', 'A good workaround includes:'), ['steps and limits', 'only «it works for me»', 'a complaint'], 0, B('واضح ومحدود.', 'Clear and bounded.')),
        Q(B('متابعة مهذبة:', 'A polite follow-up:'), ['«Is there anything else I can provide?»', '«Any update?? any update??»', '«Why is nobody answering?!»'], 0, B('بتعرض مساعدة.', 'It offers help.'))
      ] },

    { title: B('تاريخ الـ commits', 'Commit history'),
      goal: B('تفهم ليه الكود بقى كده من تاريخ الـ commits.', 'Understand why the code is the way it is from the commit history.'),
      learn: [
        L(B('أنواع الـ commits', 'Commit types'),
          B('مشاريع كتير بتستخدم **Conventional Commits**: `feat:` (ميزة)، `fix:` (إصلاح)، `docs:`، `refactor:` (تنظيم من غير تغيير سلوك)، `test:`، **chore:** (شغل صيانة)، `perf:`، و`!` أو `BREAKING CHANGE:` للتغيير اللي بيكسر. وكلمات شائعة: **bump** (رفع إصدار)، **revert** (إلغاء commit).', 'Many projects use **Conventional Commits**: `feat:` (a feature), `fix:`, `docs:`, `refactor:` (reorganise without changing behaviour), `test:`, **chore:** (maintenance work), `perf:`, and `!` or `BREAKING CHANGE:` for breaking changes. Common words: **bump** (raise a version), **revert** (undo a commit).'),
          'feat(api)!: drop support for v1 tokens\nfix: handle empty CSV files\nchore: bump axios from 1.6 to 1.7\nrevert: "feat: add caching layer"'),
        L(B('blame وسؤال «ليه؟»', 'Blame and the «why?» question'),
          B('`git blame` (أو «Blame» في GitHub) بيوريك مين غيّر كل سطر وفي أنهي commit. الاسم مخيف بس الهدف مش اللوم: هو إنك توصل لرسالة الـ commit والـ PR اللي بيشرحوا **ليه** السطر ده موجود قبل ما تغيّره.', '`git blame` (or «Blame» on GitHub) shows who changed each line and in which commit. The name sounds harsh but the goal is not blame: it is to reach the commit message and PR explaining **why** the line exists before you change it.'),
          'blame line 88 → commit a1b2c3 "fix: keep seconds in retry_after (#455)"\n→ PR #455 explains the bug → do not change it back'),
        L(B('backport والفروع', 'Backports and branches'),
          B('**backport** = نقل إصلاح من الإصدار الجديد لإصدار قديم لسه مدعوم (زي LTS). هتشوف labels زي `backport-2.x`. و**commit history** نضيف (رسايل واضحة، commit لكل تغيير) بيخلّي التاريخ ده مفيد؛ خلّي بتاعك كده.', 'A **backport** = moving a fix from the new version to an older supported one (like an LTS). You will see labels such as `backport-2.x`. A clean **commit history** (clear messages, one commit per change) makes all this useful; keep yours that way.'),
          'fix merged to main (3.x) → backport PR to 2.x (LTS)')
      ],
      practice: [
        B('اقرا آخر 30 commit في مشروع مشهور وصنّفهم بالنوع.', 'Read the last 30 commits of a popular project and classify them by type.'),
        B('اعمل blame على سطر غريب ووصل لـ PR بتاعه.', 'Run blame on an odd line and reach its PR.'),
        B('أعد كتابة 10 commits ليك بصيغة Conventional Commits.', 'Rewrite 10 of your commits in Conventional Commits form.'),
        B('دوّر على backport PR واقرا وصفه.', 'Find a backport PR and read its description.')
      ],
      words: [
        W('conventional commit', 'رسالة commit بنوع محدد زي feat: وfix:', 'a commit message with a set type like feat: and fix:', 'Use a conventional commit for every change.'),
        W('chore', 'شغل صيانة مش ميزة ولا إصلاح', 'maintenance work, neither a feature nor a fix', 'chore: update the CI config.'),
        W('bump', 'ترفع رقم إصدار', 'to raise a version number', 'Bump the version to 2.4.1.'),
        W('blame', 'عرض مين غيّر كل سطر وإمتى', 'showing who changed each line and when', 'Use blame to find the PR behind the line.'),
        W('backport', 'نقل إصلاح لإصدار قديم مدعوم', 'moving a fix to an older supported version', 'The security fix was backported to 2.x.')
      ],
      read: ['lib:Conventional Commits', 'lib:How to Write a Git Commit Message'],
      challenge: B('اختار ملف مهم في مشروع مفتوح المصدر، واقرا تاريخه (10 commits)، واكتب «قصة الملف» بالإنجليزي: إيه اللي اتغيّر وليه، من رسايل الـ commits والـ PRs.', 'Pick an important file in an open-source project, read its history (10 commits), and write «the story of the file» in English: what changed and why, from the commit messages and PRs.'),
      quiz: [
        Q(B('`chore: bump lodash`:', '`chore: bump lodash`:'), ['a maintenance commit raising a dependency version', 'a new feature', 'a bug fix'], 0, B('صيانة.', 'Maintenance.')),
        Q(B('`feat!:` معناها:', '`feat!:` means:'), ['a feature with a breaking change', 'a small fix', 'a revert'], 0, B('! = يكسر.', '! = breaking.')),
        Q(B('هدف git blame:', 'The goal of git blame:'), ['find why a line exists', 'punish someone', 'delete history'], 0, B('مش لوم.', 'Not blaming.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تقرا مشروع مفتوح المصدر من كل زواياه بالإنجليزي.', 'Read an open-source project from every angle in English.'),
      review: [
        B('قراءة الكود: الأسماء كدليل، الـ entry point، call sites، والسؤال المحترم.', 'Reading code: names as clues, the entry point, call sites and the respectful question.'),
        B('الـ changelog بأقسامه، ودليل الترقية، وأرقام الإصدارات.', 'The changelog sections, the migration guide and version numbers.'),
        B('الـ issues: labels، جمل المشرفين، والقراءة من الآخر.', 'Issues: labels, maintainers’ phrases and reading from the end.'),
        B('المشاركة: معلومة جديدة بدل +1، workaround، ومتابعة مهذبة.', 'Taking part: new information instead of +1, workarounds and polite follow-ups.'),
        B('تاريخ الـ commits: Conventional Commits، blame، وbackport.', 'Commit history: Conventional Commits, blame and backports.')
      ],
      project: B('اختار مكتبة مفتوحة المصدر بتستخدمها واكتب «تقرير قارئ» بالإنجليزي (صفحتين): المشروع بيعمل إيه ومساره الأساسي، آخر 3 إصدارات وأي تغيير بيكسر، أهم 3 issues مفتوحة بحالتها، وقصة ملف من تاريخه — وسجّل ملخص صوتي 3 دقايق.', 'Choose an open-source library you use and write a two-page «reader’s report» in English: what it does and its main path, the last 3 releases and any breaking changes, the top 3 open issues with their status, and a file’s story from its history — and record a 3-minute spoken summary.'),
      test: [
        Q(B('`try_parse()` غالبًا:', '`try_parse()` probably:'), ['returns nothing instead of raising on failure', 'always raises', 'deletes data'], 0, B('try_ = بيحاول.', 'try_ = attempts.')),
        Q(B('call site:', 'A call site is:'), ['a place where a function is called', 'a website', 'a phone number'], 0, B('مكان النداء.', 'Where it is called.')),
        Q(B('قسم في الـ changelog لثغرات اتقفلت:', 'The changelog section for closed vulnerabilities:'), ['Security', 'Added', 'Changed'], 0, B('Keep a Changelog.', 'Keep a Changelog.')),
        Q(B('«X now defaults to 30»:', '«X now defaults to 30»:'), ['if you do not set X, it is 30', 'X must be 30', 'X was removed'], 0, B('قيمة افتراضية.', 'A default value.')),
        Q(B('إصدار major:', 'A major release:'), ['may contain breaking changes', 'only fixes typos', 'never changes anything'], 0, B('semver.', 'Semver.')),
        Q(B('label wontfix:', 'The wontfix label:'), ['the maintainers will not do it', 'it is fixed', 'it is urgent'], 0, B('قرار.', 'A decision.')),
        Q(B('«Can you provide a minimal reproduction?»:', '«Can you provide a minimal reproduction?»:'), ['send the smallest example that shows the bug', 'send your whole project', 'close the issue'], 0, B('أصغر مثال.', 'The smallest example.')),
        Q(B('بدل «+1»:', 'Instead of «+1»:'), ['react 👍 or add new information', 'write +1 louder', 'open a duplicate'], 0, B('معلومة جديدة.', 'New information.')),
        Q(B('متابعة مناسبة بعد أسبوعين:', 'A suitable follow-up after two weeks:'), ['offer more information or a PR', 'tag ten maintainers', 'demand an answer'], 0, B('بأدب.', 'Politely.')),
        Q(B('`revert:` commit:', 'A `revert:` commit:'), ['undoes an earlier commit', 'adds a feature', 'bumps a version'], 0, B('إلغاء.', 'Undo.')),
        Q(B('backport:', 'A backport:'), ['moves a fix to an older supported version', 'deletes old versions', 'renames a branch'], 0, B('لإصدار قديم.', 'To an older version.')),
        Q(B('blame بيوصلك لـ:', 'Blame leads you to:'), ['the commit and PR behind a line', 'a punishment', 'the licence'], 0, B('ليه السطر موجود.', 'Why the line exists.'))
      ] }
  ]
};
