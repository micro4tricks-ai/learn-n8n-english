// JavaScript week 28 — code quality: ESLint, Prettier, Git workflows and the month 7 project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('جودة الكود: ESLint وPrettier وسير عمل Git ومشروع الشهر', 'Code quality: ESLint, Prettier, Git workflows and the month project'),
  goal: B('تشتغل زي فريق محترف حتى لو لوحدك: ESLint يمسك الأخطاء، Prettier يوحّد الشكل، Git بفروع وcommits واضحة وPRs ومراجعة، hooks بتمنع الكود الوحش، وكود مقروء ومشروع موثّق — وتسلّم مشروع الشهر السابع.',
          'Work like a professional team even when alone: ESLint catches bugs, Prettier unifies formatting, Git with branches, clear commits, PRs and review, hooks blocking bad code, readable code and a documented project — and deliver the seventh month’s project.'),
  days: [
    { title: B('ESLint', 'ESLint'),
      goal: B('أداة تمسك الأخطاء الشائعة قبل ما تشغّل.', 'A tool that catches common bugs before you run.'),
      learn: [
        L(B('الـ linter', 'The linter'),
          B('**linter** بيقرا الكود ويدوّر على أنماط خطر: متغير مش مستخدم، `==` بدل `===`، Promise محدش عمله await، كود مش هيتنفذ أبدًا. **eslint** هو الأشهر، وكل **lint rule** ليه مستوى (error/warn/off). و**autofix** (`--fix`) بيصلّح لوحده اللي يقدر.', 'A **linter** reads code looking for risky patterns: an unused variable, `==` instead of `===`, a promise nobody awaited, unreachable code. **eslint** is the best known, and each **lint rule** has a level (error/warn/off). **autofix** (`--fix`) repairs what it can by itself.'),
          'npm i -D eslint @eslint/js typescript-eslint globals\nnpx eslint .            # report\nnpx eslint . --fix      # fix what can be fixed automatically\n# src/report.ts\n#   12:7   error  \'total\' is assigned a value but never used     @typescript-eslint/no-unused-vars\n#   31:3   error  Promises must be awaited or handled             @typescript-eslint/no-floating-promises\n#   44:12  error  Expected \'===\' and instead saw \'==\'              eqeqeq', T),
        L(B('flat config', 'Flat config'),
          B('ESLint الحديث بيستخدم **flat config** (`eslint.config.js`): مصفوفة إعدادات بالترتيب. مع **typescript-eslint** وقواعد بنوع (type-aware) زي **no-floating-promises** اللي بتمسك أخطر غلطة async: Promise من غير await أو catch (أسبوع 13!).', 'Modern ESLint uses a **flat config** (`eslint.config.js`): an ordered array of settings. With **typescript-eslint** and type-aware rules such as **no-floating-promises**, which catches the most dangerous async mistake: a promise with no await or catch (week 13!).'),
          'import js from "@eslint/js";\nimport tseslint from "typescript-eslint";\nimport globals from "globals";\n\nexport default tseslint.config(\n  { ignores: ["dist", "coverage"] },\n  js.configs.recommended,\n  ...tseslint.configs.recommendedTypeChecked,\n  {\n    languageOptions: { globals: globals.node, parserOptions: { projectService: true } },\n    rules: {\n      eqeqeq: "error",\n      "no-console": ["warn", { allow: ["error"] }],\n      "@typescript-eslint/no-floating-promises": "error",\n      "@typescript-eslint/no-explicit-any": "error",\n    },\n  },\n);', S),
        L(B('قواعد بتمسك bugs', 'Rules that catch bugs'),
          B('ركّز على القواعد اللي بتمسك أخطاء حقيقية، مش ذوق: الكود ده فيه 4 مشاكل ESLint كان هيقولك عليها قبل ما العميل يلاقيها — شغّله وشوف النتيجة الغلط:', 'Focus on rules that catch real bugs, not taste: this code has 4 problems ESLint would report before a customer found them — run it and see the wrong result:'),
          'function totalPaid(orders) {\n  let total = 0, count = 0;                    // no-unused-vars: count is never read\n  for (const o of orders) {\n    if (o.status == "paid") total += o.total;   // eqeqeq: fine here, but "0" == 0 bites later\n    if (o.total = 0) console.log("free?");      // no-cond-assign: = instead of ===, sets total to 0!\n  }\n  return total;\n  console.log("done");                          // no-unreachable\n}\nconsole.log(totalPaid([{ status: "paid", total: 250 }, { status: "paid", total: 90 }]), "— expected 340");', N())
      ],
      practice: [
        B('ثبّت ESLint بالـ flat config ده على مشروعك.', 'Install ESLint with this flat config on your project.'),
        B('شغّل --fix وراجع اللي اتغير.', 'Run --fix and review what changed.'),
        B('صلّح كل no-floating-promises.', 'Fix every no-floating-promises error.'),
        B('شغّل مثال الـ 4 مشاكل وصلّحه.', 'Run the 4-problem example and fix it.')
      ],
      words: [
        W('linter', 'أداة بتدوّر على أخطاء في الكود', 'a tool looking for problems in code', 'The linter flagged an unused variable.'),
        W('eslint', 'أشهر linter لجافاسكريبت', 'the best-known JavaScript linter', 'Run ESLint in CI.'),
        W('lint rule', 'قاعدة واحدة بيفحصها الـ linter', 'one check the linter performs', 'Turn the eqeqeq lint rule on.'),
        W('flat config', 'ملف إعدادات ESLint الحديث', 'ESLint’s modern settings file', 'eslint.config.js is a flat config.'),
        W('typescript-eslint', 'قواعد ESLint لـ TypeScript', 'ESLint rules for TypeScript', 'typescript-eslint knows the types.'),
        W('no-floating-promises', 'قاعدة بتمسك Promise من غير await', 'a rule catching unawaited promises', 'no-floating-promises found the bug.'),
        W('autofix', 'تصليح تلقائي', 'automatic fixing', 'Autofix removed the unused import.')
      ],
      read: [{ lib: 'ESLint', what: B('اقرا Getting Started وConfiguration Files.', 'Read Getting Started and Configuration Files.') }, { t: 'typescript-eslint: Getting Started', url: 'https://typescript-eslint.io/getting-started/', what: B('اقرا Linting with Type Information.', 'Read Linting with Type Information.') }],
      challenge: B('ضيف ESLint لـ «بوابة الطلبات» بالـ TS بقواعد type-aware، وصلّح كل الأخطاء (من غير ما تطفي قواعد)، وضيف `npm run lint` لـ CI.', 'Add ESLint with type-aware rules to the TS «orders gateway», fix every error (without switching rules off), and add `npm run lint` to CI.'),
      quiz: [
        Q(B('Promise من غير await أو catch:', 'A promise with no await or catch:'), ['no-floating-promises', 'eqeqeq', 'no-console'], 0, B('أخطر غلطة async.', 'The most dangerous async bug.')),
        Q(B('if (x = 0):', 'if (x = 0):'), [['تعيين مش مقارنة — bug', 'an assignment, not a comparison — a bug'], ['مقارنة', 'a comparison'], ['خطأ syntax', 'a syntax error']], 0, B('no-cond-assign.', 'no-cond-assign.')),
        Q(B('eslint --fix:', 'eslint --fix:'), [['يصلّح اللي يقدر لوحده', 'fixes what it can automatically'], ['يمسح الملفات', 'deletes files'], ['يرفع على GitHub', 'pushes to GitHub']], 0, B('autofix.', 'Autofix.'))
      ] },

    { title: B('Prettier والتنسيق', 'Prettier and formatting'),
      goal: B('توقف نقاشات الشكل للأبد.', 'End formatting debates for good.'),
      learn: [
        L(B('formatter مش linter', 'A formatter, not a linter'),
          B('**prettier** = **formatter**: بيعيد كتابة الشكل (مسافات، أقواس، فواصل، طول السطر) بطريقة واحدة ثابتة. ESLint للأخطاء، Prettier للشكل — ومتخليش ESLint يتدخل في الشكل. النتيجة: diffs نضيفة ومفيش «حط مسافة هنا» في المراجعة.', '**prettier** = a **formatter**: it rewrites layout (spaces, brackets, commas, line length) one fixed way. ESLint for bugs, Prettier for looks — and keep ESLint out of formatting. The result: clean diffs and no «add a space here» in reviews.'),
          '// before (written in a hurry)\nconst order={id:101,customer:"Sara",items:[{sku:"A1",qty:2},{sku:"B2",qty:1}],total:250}\nif(order.total>100){notify(order.customer,`big order ${order.id}`)}\n\n// after `npx prettier --write .`\nconst order = {\n  id: 101,\n  customer: "Sara",\n  items: [\n    { sku: "A1", qty: 2 },\n    { sku: "B2", qty: 1 },\n  ],\n  total: 250,\n};\nif (order.total > 100) {\n  notify(order.customer, `big order ${order.id}`);\n}', S),
        L(B('الإعداد', 'Setup'),
          B('ملف `.prettierrc` صغير (أو الافتراضي)، و`.prettierignore` للملفات المولّدة، و**format on save** في VS Code. و**editorconfig** (`.editorconfig`) بيوحّد أساسيات المحرر (المسافات، نهاية السطر LF) لأي محرر — مهم على ويندوز.', 'A small `.prettierrc` (or the defaults), a `.prettierignore` for generated files, and **format on save** in VS Code. And **editorconfig** (`.editorconfig`) unifies editor basics (indentation, LF line endings) for any editor — important on Windows.'),
          '# .prettierrc\n{ "printWidth": 100, "singleQuote": false, "trailingComma": "all" }\n\n# .prettierignore\ndist\ncoverage\ncontent/*/weeks\n\n# .editorconfig\nroot = true\n[*]\nindent_style = space\nindent_size = 2\nend_of_line = lf\ncharset = utf-8\ninsert_final_newline = true\n\n# VS Code settings.json\n"editor.formatOnSave": true, "editor.defaultFormatter": "esbenp.prettier-vscode"', T),
        L(B('في CI', 'In CI'),
          B('`prettier --check .` في CI بيفشل لو حد رفع كود مش متنسّق — من غير ما يعدّل حاجة. ولو بتضيف Prettier لمشروع قديم: commit واحد «format everything» لوحده، وضيفه لـ `.git-blame-ignore-revs` عشان git blame ميتلخبطش.', '`prettier --check .` in CI fails if someone pushed unformatted code — without changing anything. Adding Prettier to an old project? One separate «format everything» commit, added to `.git-blame-ignore-revs` so git blame is not confused.'),
          'npx prettier --check .          # CI: fails on unformatted files\nnpx prettier --write .          # locally: format everything\ngit commit -am "style: format with prettier"\ngit rev-parse HEAD >> .git-blame-ignore-revs\ngit config blame.ignoreRevsFile .git-blame-ignore-revs', T)
      ],
      practice: [
        B('ضيف Prettier وformat on save.', 'Add Prettier and format on save.'),
        B('اعمل .editorconfig بـ LF وUTF-8.', 'Create an .editorconfig with LF and UTF-8.'),
        B('ضيف prettier --check لـ CI.', 'Add prettier --check to CI.'),
        B('نسّق مشروع قديم في commit لوحده.', 'Format an old project in a separate commit.')
      ],
      words: [
        W('prettier', 'أداة تنسيق كود تلقائي', 'an automatic code formatter', 'Prettier fixed the indentation.'),
        W('formatter', 'أداة بتعيد كتابة شكل الكود', 'a tool rewriting code layout', 'A formatter ends style debates.'),
        W('format on save', 'تنسيق تلقائي عند الحفظ', 'automatic formatting on save', 'Turn on format on save.'),
        W('editorconfig', 'ملف إعدادات محرر مشترك', 'a shared editor settings file', 'The editorconfig enforces LF.'),
        W('line ending', 'نهاية السطر LF أو CRLF', 'the end-of-line marker, LF or CRLF', 'Windows uses CRLF line endings.')
      ],
      read: [{ lib: 'Prettier', what: B('اقرا Why Prettier? وIntegrating with Linters.', 'Read Why Prettier? and Integrating with Linters.') }, { t: 'EditorConfig', url: 'https://editorconfig.org/', what: B('اقرا Example file.', 'Read Example file.') }],
      challenge: B('خلّي مشروعك: Prettier بإعدادات بسيطة، .editorconfig، format on save، prettier --check وeslint في CI — ومفيش تعارض بينهم.', 'Give your project: Prettier with simple settings, .editorconfig, format on save, prettier --check and eslint in CI — with no conflict between them.'),
      quiz: [
        Q(B('مين بيمسك ==:', 'Who catches ==:'), ['ESLint', 'Prettier', 'EditorConfig'], 0, B('bug.', 'A bug.')),
        Q(B('مين بيرتب المسافات:', 'Who sorts out spacing:'), ['Prettier', 'ESLint', 'tsc'], 0, B('شكل.', 'Layout.')),
        Q(B('prettier --check في CI:', 'prettier --check in CI:'), [['يفشل من غير ما يعدّل', 'fails without changing files'], ['يعدّل الملفات', 'changes the files'], ['ينشر', 'deploys']], 0, B('فحص.', 'A check.'))
      ] },

    { title: B('سير عمل Git', 'Git workflows'),
      goal: B('تاريخ Git نضيف وتغييرات بتتراجع قبل ما تدخل.', 'A clean Git history and changes reviewed before they land.'),
      learn: [
        L(B('فروع وPRs', 'Branches and PRs'),
          B('**feature branch**: كل تغيير في **git branch** لوحده (`feat/webhook-retry`)، و**pull request** يجمع التغيير والوصف والـ CI والمراجعة، وبعد الموافقة يندمج في main. main دايمًا شغال وقابل للنشر. حتى لو لوحدك: الـ PR بيدّيك مكان تراجع فيه نفسك وCI يفحص.', 'A **feature branch**: each change on its own **git branch** (`feat/webhook-retry`), and a **pull request** gathers the change, its description, CI and review, then merges into main after approval. main always works and can be deployed. Even alone: a PR gives you a place to review yourself and lets CI check.'),
          'git switch -c feat/webhook-retry          # new branch from main\n# … edit, test …\ngit add -p                                 # stage hunk by hunk (review your own diff)\ngit commit -m "feat(webhooks): retry n8n delivery with backoff"\ngit push -u origin feat/webhook-retry\ngh pr create --fill                        # open the PR; CI runs; ask for review\ngh pr merge --squash --delete-branch       # after approval', T),
        L(B('رسايل commits', 'Commit messages'),
          B('**conventional commits**: `type(scope): وصف` — feat (ميزة)، fix (تصليح)، refactor، test، docs، chore. **commit message** كويسة بتقول **ليه** مش بس إيه. وده بيخلّي التاريخ مقروء وبيسمح بتوليد CHANGELOG ورقم إصدار تلقائي.', '**conventional commits**: `type(scope): description` — feat (feature), fix, refactor, test, docs, chore. A good **commit message** says **why**, not only what. It keeps history readable and allows an automatic CHANGELOG and version number.'),
          'const commits = [\n  "feat(webhooks): retry n8n delivery with backoff",\n  "fix(phone): accept Arabic-Indic digits",\n  "docs: explain .env setup",\n  "Update stuff",\n  "feat!: drop Node 18 support",\n  "fix(report) wrong VAT",\n];\nconst re = /^(feat|fix|refactor|test|docs|chore|perf|ci|style)(\\([\\w-]+\\))?(!)?: .{3,}$/;\nfor (const c of commits) {\n  const m = c.match(re);\n  const bump = !m ? "✗ not conventional" : m[3] ? "major" : m[1] === "feat" ? "minor" : m[1] === "fix" ? "patch" : "none";\n  console.log(c.padEnd(52), "→", bump);\n}', N()),
        L(B('rebase وmerge والتعارضات', 'Rebase, merge and conflicts'),
          B('لما main يتقدم وانت لسه في فرعك: **rebase** (`git rebase main`) بيعيد تطبيق commits بتاعتك فوق آخر main — تاريخ مستقيم. merge بيعمل commit دمج. وفي الحالتين ممكن **merge conflict**: Git بيعلّم الأجزاء المتعارضة، تختار الصح، تشغّل الاختبارات، وتكمّل. ومتعملش rebase لفرع حد تاني شغال عليه.', 'When main moves on while you are on your branch: a **rebase** (`git rebase main`) replays your commits on top of the latest main — a straight history. A merge makes a merge commit. Either way you may hit a **merge conflict**: Git marks the clashing parts, you pick the right one, run the tests, and continue. Never rebase a branch someone else works on.'),
          'git fetch origin\ngit rebase origin/main\n# CONFLICT (content): Merge conflict in src/report.ts\n#   <<<<<<< HEAD (main)\n#   const VAT = 0.14;\n#   =======\n#   const VAT = Number(process.env.VAT ?? 0.14);\n#   >>>>>>> feat/vat-config\n# edit to the right version, then:\nnpm test && git add src/report.ts && git rebase --continue\ngit push --force-with-lease               # only for your own branch', T)
      ],
      practice: [
        B('اعمل فرع وPR لتغيير صغير.', 'Make a branch and a PR for a small change.'),
        B('اكتب آخر 5 commits بـ conventional commits.', 'Write your next 5 commits as conventional commits.'),
        B('اعمل تعارض متعمد وحلّه.', 'Create a deliberate conflict and resolve it.'),
        B('جرّب git add -p.', 'Try git add -p.')
      ],
      words: [
        W('git branch', 'خط تطوير منفصل', 'a separate line of development', 'Create a git branch per feature.'),
        W('feature branch', 'فرع لميزة واحدة', 'a branch for one feature', 'Merge the feature branch after review.'),
        W('pull request', 'طلب دمج تغيير بعد مراجعة', 'a request to merge a change after review', 'Open a pull request for the fix.'),
        W('conventional commits', 'صيغة موحدة لرسايل commits', 'a standard format for commit messages', 'feat: and fix: are conventional commits.'),
        W('commit message', 'وصف التغيير في Git', 'the description of a Git change', 'A good commit message says why.'),
        W('rebase', 'إعادة تطبيق commits فوق فرع تاني', 'replaying commits on top of another branch', 'Rebase onto main before merging.'),
        W('merge conflict', 'تعارض تغييرين في نفس المكان', 'two changes clashing in one place', 'Resolve the merge conflict and run tests.')
      ],
      read: [{ lib: 'Conventional Commits', what: B('اقرا Summary.', 'Read the Summary.') }, { lib: 'Pro Git (book)', what: B('اقرا Git Branching.', 'Read Git Branching.') }],
      challenge: B('اشتغل أسبوع كامل بـ feature branches وPRs على مشروعك (حتى لوحدك)، بـ conventional commits، وCI على كل PR، وsquash merge — وراجع تاريخ main في الآخر.', 'Work a full week with feature branches and PRs on your project (even alone), using conventional commits, CI on every PR and squash merges — then review main’s history.'),
      quiz: [
        Q(B('"fix(phone): accept Arabic digits":', '"fix(phone): accept Arabic digits":'), [['patch', 'a patch release'], ['major', 'a major release'], ['ولا حاجة', 'nothing']], 0, B('fix.', 'fix.')),
        Q(B('main لازم يكون:', 'main must be:'), [['شغال وقابل للنشر', 'working and deployable'], ['تجارب', 'experiments'], ['قديم', 'old']], 0, B('ثابت.', 'Stable.')),
        Q(B('rebase لفرع زميلك شغال عليه:', 'Rebasing a branch a teammate works on:'), [['لأ', 'no'], ['أيوه دايمًا', 'always'], ['كل يوم', 'daily']], 0, B('بيكسر شغلهم.', 'It breaks their work.'))
      ] },

    { title: B('الـ hooks والمراجعة والكود المقروء', 'Hooks, review and readable code'),
      goal: B('تمنع الكود الوحش من الدخول وتكتب كود حد تاني يفهمه.', 'Block bad code at the door and write code others understand.'),
      learn: [
        L(B('git hooks', 'Git hooks'),
          B('**git hook** = سكربت بيشتغل عند حدث Git. **pre-commit** بيشغّل lint وformat على الملفات المتغيرة بس (**lint-staged**) قبل كل commit، و**husky** بيركّب الـ hooks لكل الفريق تلقائيًا. سريع (ثواني) ومبيسمحش بكود مش متنسّق يدخل.', 'A **git hook** = a script run on a Git event. A **pre-commit** hook runs lint and format on changed files only (**lint-staged**) before every commit, and **husky** installs the hooks for the whole team automatically. Fast (seconds) and lets no unformatted code in.'),
          'npm i -D husky lint-staged\nnpx husky init                         # creates .husky/pre-commit\necho "npx lint-staged" > .husky/pre-commit\n\n# package.json\n"lint-staged": {\n  "*.{js,ts}": ["eslint --fix", "prettier --write"],\n  "*.{json,md,css}": ["prettier --write"]\n}', T),
        L(B('code review', 'Code review'),
          B('**code review**: حد (أو انت بعد ساعة) يقرا التغيير قبل الدمج. ركّز على: صح؟ آمن (أسرار، حقن، صلاحيات)؟ مختبر؟ مقروء؟ — مش على المسافات (ده شغل Prettier). علّق على الكود مش الشخص، واقترح بدل ما تأمر، وPR صغير (< 400 سطر) بيتراجع أحسن بكتير.', '**code review**: someone (or you an hour later) reads the change before merging. Focus on: is it correct? safe (secrets, injection, permissions)? tested? readable? — not spacing (that is Prettier’s job). Comment on code, not the person; suggest rather than order; and a small PR (< 400 lines) gets a far better review.'),
          'PR checklist\n[ ] does what the description says; edge cases handled (empty, null, Arabic, big)\n[ ] no secrets, no personal data in logs, input validated, outputs escaped\n[ ] tests added/updated; CI green\n[ ] names say what things are; no dead code; no TODO without an issue\n[ ] docs/README/.env.example updated if behaviour or config changed', T),
        L(B('كود مقروء', 'Readable code'),
          B('**code smell** = علامة إن الكود محتاج تحسين: دالة 100 سطر، **magic number** (`* 0.14` من غير اسم)، أسماء زي `data2` و`tmp`، تعليق بيشرح «إيه» بدل «ليه»، if جوه if جوه if. **refactoring** = تحسين الشكل من غير تغيير السلوك — والاختبارات بتضمن ده. المثال بيطلّع نفس النتيجة قبل وبعد:', 'A **code smell** = a sign code needs improvement: a 100-line function, a **magic number** (`* 0.14` with no name), names like `data2` and `tmp`, a comment explaining «what» instead of «why», if inside if inside if. **refactoring** = improving structure without changing behaviour — tests guarantee that. The example prints the same result before and after:'),
          '// before\nfunction f(d) { let r = 0; for (const x of d) { if (x.s === "p") { if (x.t > 0) { r += x.t + x.t * 0.14; } } } return Math.round(r * 100) / 100; }\n\n// after: same behaviour, readable\nconst VAT_RATE = 0.14;                                   // Egyptian VAT\nconst isPaid = order => order.status === "paid" && order.total > 0;\nconst withVat = amount => amount * (1 + VAT_RATE);\nconst round2 = n => Math.round(n * 100) / 100;\nfunction paidRevenueWithVat(orders) {\n  return round2(orders.filter(isPaid).reduce((sum, o) => sum + withVat(o.total), 0));\n}\nconst sample = [{ s: "p", t: 250, status: "paid", total: 250 }, { s: "n", t: 90, status: "new", total: 90 }, { s: "p", t: 40, status: "paid", total: 40 }];\nconsole.log(f(sample), paidRevenueWithVat(sample), f(sample) === paidRevenueWithVat(sample) ? "✓ same behaviour" : "✗ changed!");', N())
      ],
      practice: [
        B('ركّب husky وlint-staged.', 'Set up husky and lint-staged.'),
        B('راجع PR قديم بالـ checklist.', 'Review an old PR with the checklist.'),
        B('دوّر على 3 magic numbers وسمّيهم.', 'Find 3 magic numbers and name them.'),
        B('اعمل refactor لدالة طويلة والاختبارات خضرا.', 'Refactor a long function with the tests green.')
      ],
      words: [
        W('git hook', 'سكربت بيشتغل مع حدث Git', 'a script run on a Git event', 'A git hook runs before each commit.'),
        W('pre-commit', 'hook قبل الـ commit', 'the hook before a commit', 'The pre-commit hook formats files.'),
        W('husky', 'أداة تركيب git hooks للفريق', 'a tool installing git hooks for a team', 'husky installs the hooks on npm install.'),
        W('lint-staged', 'تشغيل الأدوات على الملفات المتغيرة بس', 'running tools on changed files only', 'lint-staged keeps commits fast.'),
        W('code review', 'مراجعة التغيير قبل الدمج', 'reviewing a change before merging', 'Code review found a leaked key.'),
        W('code smell', 'علامة إن الكود محتاج تحسين', 'a sign code needs improving', 'A 100-line function is a code smell.'),
        W('magic number', 'رقم في الكود من غير اسم', 'an unnamed number in code', 'Replace the magic number with VAT_RATE.'),
        W('refactoring', 'تحسين الكود من غير تغيير السلوك', 'improving code without changing behaviour', 'Refactoring is safe with tests.')
      ],
      read: [{ t: 'Google Engineering Practices: Code Review', url: 'https://google.github.io/eng-practices/review/', what: B('اقرا What to look for.', 'Read What to look for.') }, { lib: 'Refactoring.Guru: Design patterns', what: B('شوف قسم Refactoring: code smells.', 'See the Refactoring section: code smells.') }],
      challenge: B('ركّب husky + lint-staged، وراجع مشروع الشهر الرابع بالـ checklist، واعمل 3 refactors (magic numbers، دالة طويلة، if متداخلة) والاختبارات خضرا في كل خطوة.', 'Set up husky + lint-staged, review the month 4 project with the checklist, and do 3 refactors (magic numbers, a long function, nested ifs) with tests green at each step.'),
      quiz: [
        Q(B('lint-staged بيشغّل الأدوات على:', 'lint-staged runs tools on:'), [['الملفات المتغيرة بس', 'changed files only'], ['كل المشروع', 'the whole project'], ['main', 'main']], 0, B('سريع.', 'Fast.')),
        Q(B('المراجعة تركّز على:', 'Review focuses on:'), [['الصحة والأمان والاختبارات', 'correctness, safety and tests'], ['المسافات', 'spacing'], ['الألوان', 'colours']], 0, B('Prettier للشكل.', 'Prettier does layout.')),
        Q(B('refactoring:', 'Refactoring:'), [['نفس السلوك، كود أحسن', 'same behaviour, better code'], ['ميزة جديدة', 'a new feature'], ['تصليح bug', 'a bug fix']], 0, B('الاختبارات بتضمن.', 'Tests guarantee it.'))
      ] },

    { title: B('هيكل المشروع والتوثيق', 'Project structure and documentation'),
      goal: B('مشروع حد جديد يفهمه ويشغّله في 10 دقايق.', 'A project a newcomer understands and runs in 10 minutes.'),
      learn: [
        L(B('الهيكل', 'The structure'),
          B('هيكل بيقول المشروع بيعمل إيه: `src/` بالمجالات (orders، webhooks، reports) مش بالنوع (controllers، models)، `test/` جنبها، `scripts/` للأدوات، `docs/` للقرارات. وملفات الجذر المعروفة: package.json، tsconfig، eslint.config.js، .env.example، README.', 'A structure that tells what the project does: `src/` by domain (orders, webhooks, reports), not by kind (controllers, models), `test/` alongside, `scripts/` for tools, `docs/` for decisions. And the familiar root files: package.json, tsconfig, eslint.config.js, .env.example, README.'),
          'orders-gateway/\n  src/\n    orders/      routes.ts · service.ts · schema.ts\n    webhooks/    shop.ts · verify.ts\n    shared/      config.ts · logger.ts · http-client.ts\n    server.ts\n  test/          orders.test.ts · webhooks.test.ts · fixtures/\n  docs/adr/      0001-use-postgres.md · 0002-signed-webhooks.md\n  .env.example · README.md · CHANGELOG.md · eslint.config.js · tsconfig.json', T),
        L(B('README وCHANGELOG', 'README and CHANGELOG'),
          B('**readme**: بيعمل إيه (سطرين)، إزاي تشغّله (3 أوامر)، الإعدادات (.env)، الاختبارات، النشر، ومين تكلّم. و**changelog**: إيه اتغير في كل إصدار للبشر (Added/Changed/Fixed) — مش نسخة من git log. ممكن يتولد من conventional commits.', 'A **readme**: what it does (two lines), how to run it (3 commands), settings (.env), tests, deployment, and whom to contact. A **changelog**: what changed in each release, for humans (Added/Changed/Fixed) — not a copy of git log. It can be generated from conventional commits.'),
          '# Orders Gateway\nReceives signed shop webhooks, validates orders and forwards them to n8n.\n\n## Run\n    cp .env.example .env     # fill N8N_WEBHOOK_URL, SHOP_SECRET\n    npm ci\n    npm start                # http://localhost:3000/health\n\n## Test\n    npm test · npm run lint · npm run typecheck\n\n## Changelog (CHANGELOG.md)\n## [1.3.0] - 2026-10-04\n### Added\n- Retry n8n delivery with backoff\n### Fixed\n- Accept Arabic-Indic digits in phone numbers', T),
        L(B('القرارات والإصدارات', 'Decisions and releases'),
          B('**adr** (Architecture Decision Record): صفحة قصيرة لكل قرار مهم — السياق، القرار، البدائل، العواقب. بعد سنة محدش هيسأل «ليه Postgres؟». و**release tag** (`v1.3.0`) على كل إصدار بـ semver، فتقدر ترجع لأي نسخة. أدوات زي release-please بتعمل ده من الـ commits.', 'An **adr** (Architecture Decision Record): a short page per important decision — context, decision, alternatives, consequences. A year later nobody asks «why Postgres?». And a **release tag** (`v1.3.0`) on each release with semver, so you can return to any version. Tools like release-please do this from the commits.'),
          '# 0002 — Sign and verify every webhook\nDate: 2026-10-04 · Status: accepted\n## Context\nThe shop and n8n call our public endpoint; anyone could post fake orders.\n## Decision\nHMAC-SHA256 over the raw body with a shared secret; reject on mismatch (401); dedupe by event id.\n## Alternatives\nIP allow-list (shop IPs change), basic auth (secret sent every time).\n## Consequences\nSecrets must be rotated together; tests need fixtures signed with the test secret.', T)
      ],
      practice: [
        B('أعد ترتيب مشروع بالمجالات.', 'Reorganise a project by domain.'),
        B('اكتب README بـ «3 أوامر تشغيل».', 'Write a README with «3 commands to run».'),
        B('اكتب ADR لقرار خدته.', 'Write an ADR for a decision you made.'),
        B('اعمل release tag أول إصدار.', 'Create a release tag for the first version.')
      ],
      words: [
        W('readme', 'ملف التعريف والتشغيل للمشروع', 'the project’s introduction and run guide', 'The README has three commands.'),
        W('changelog', 'سجل التغييرات لكل إصدار', 'the record of changes per release', 'Update the changelog before releasing.'),
        W('adr', 'سجل قرار معماري', 'an architecture decision record', 'ADR 0002 explains the signatures.'),
        W('release tag', 'علامة Git على إصدار', 'a Git marker on a release', 'Push the v1.3.0 release tag.'),
        W('folder by feature', 'تنظيم الملفات حسب المجال', 'organising files by domain', 'Folder by feature keeps orders together.')
      ],
      read: [{ t: 'Keep a Changelog', url: 'https://keepachangelog.com/en/1.1.0/', what: B('اقرا How do I make a good changelog?', 'Read How do I make a good changelog?') }, { t: 'ADR GitHub organization', url: 'https://adr.github.io/', what: B('اقرا What is an ADR.', 'Read What is an ADR.') }],
      challenge: B('خلّي حد (صاحب أو زميل) يستنسخ مشروعك ويشغّله من الـ README بس وانت ساكت — وسجّل كل مكان وقف فيه وصلّحه في التوثيق.', 'Have someone (a friend or colleague) clone your project and run it from the README alone while you stay silent — note every place they got stuck and fix the docs.'),
      quiz: [
        Q(B('src بالمجالات معناه:', 'src by domain means:'), [['orders/ webhooks/ reports/', 'orders/ webhooks/ reports/'], ['controllers/ models/', 'controllers/ models/'], ['a/ b/ c/', 'a/ b/ c/']], 0, B('بيقول بيعمل إيه.', 'Says what it does.')),
        Q(B('CHANGELOG:', 'A CHANGELOG:'), [['للبشر: Added/Fixed', 'for humans: Added/Fixed'], ['نسخة git log', 'a copy of git log'], ['أسرار', 'secrets']], 0, B('مختصر.', 'Concise.')),
        Q(B('«ليه اخترنا Postgres؟» بعد سنة:', '«Why did we pick Postgres?» a year later:'), ['ADR', 'README', 'commit'], 0, B('سجل قرار.', 'A decision record.'))
      ] },

    { title: B('مراجعة الشهر السابع ومشروعه', 'Month 7 review and project'),
      goal: B('مشروع TypeScript بجودة فريق محترف.', 'A TypeScript project at professional-team quality.'),
      review: [
        B('TypeScript: الأنواع، unions، unknown، tsconfig (أسبوع 25).', 'TypeScript: types, unions, unknown, tsconfig (week 25).'),
        B('generics والأنواع المساعدة وZod وResult (أسبوع 26).', 'Generics, utility types, Zod and Result (week 26).'),
        B('الاختبارات: unit وintegration وmocks والتغطية وTDD (أسبوع 27).', 'Testing: unit, integration, mocks, coverage and TDD (week 27).'),
        B('ESLint وPrettier وGit بفروع وPRs وhooks.', 'ESLint, Prettier and Git with branches, PRs and hooks.'),
        B('كود مقروء وrefactoring وREADME وCHANGELOG وADR وإصدارات.', 'Readable code, refactoring, README, CHANGELOG, ADRs and releases.')
      ],
      project: B('مشروع الشهر السابع «بوابة الطلبات v2» بجودة فريق: TypeScript strict (Zod + z.infer، discriminated unions للأحداث، Result)، اختبارات (unit + integration + fixtures + fake timers، تغطية ≥ 85%)، ESLint type-aware + Prettier + EditorConfig، husky + lint-staged، GitHub Actions (lint، typecheck، test، prettier --check) بيمنع الدمج، شغل بفروع وPRs وconventional commits، README بـ 3 أوامر، CHANGELOG، 2 ADR، وrelease tag v2.0.0.', 'Month 7 project «orders gateway v2» at team quality: strict TypeScript (Zod + z.infer, discriminated unions for events, Result), tests (unit + integration + fixtures + fake timers, ≥ 85% coverage), type-aware ESLint + Prettier + EditorConfig, husky + lint-staged, GitHub Actions (lint, typecheck, test, prettier --check) blocking merges, work through branches, PRs and conventional commits, a 3-command README, a CHANGELOG, 2 ADRs and a v2.0.0 release tag.'),
      test: [
        Q(B('linter وظيفته:', 'A linter’s job:'), [['يمسك أنماط خطر في الكود', 'catch risky patterns in code'], ['ينسّق المسافات', 'format spacing'], ['يشغّل الكود', 'run the code']], 0, B('bugs.', 'Bugs.')),
        Q(B('eslint.config.js:', 'eslint.config.js:'), ['flat config', 'tsconfig', 'prettierrc'], 0, B('الحديث.', 'The modern one.')),
        Q(B('Promise بدون await يتمسك بـ:', 'An unawaited promise is caught by:'), ['no-floating-promises', 'prettier', 'eqeqeq'], 0, B('type-aware.', 'Type-aware.')),
        Q(B('Prettier وESLint:', 'Prettier and ESLint:'), [['Prettier للشكل وESLint للأخطاء', 'Prettier for layout, ESLint for bugs'], ['نفس الحاجة', 'the same thing'], ['ESLint للشكل', 'ESLint for layout']], 0, B('أدوار.', 'Roles.')),
        Q(B('.editorconfig بيضمن:', '.editorconfig ensures:'), [['LF وUTF-8 والمسافات في أي محرر', 'LF, UTF-8 and indentation in any editor'], ['الاختبارات', 'tests'], ['النشر', 'deployment']], 0, B('أساسيات.', 'Basics.')),
        Q(B('"feat!: …":', '"feat!: …":'), [['تغيير كاسر ← major', 'a breaking change → major'], ['patch', 'patch'], ['docs', 'docs']], 0, B('!.', '!.')),
        Q(B('تعارض في rebase:', 'A conflict during rebase:'), [['حل، اختبر، add، continue', 'resolve, test, add, continue'], ['امسح الفرع', 'delete the branch'], ['force push على main', 'force-push to main']], 0, B('بهدوء.', 'Calmly.')),
        Q(B('pre-commit hook بيشغّل:', 'A pre-commit hook runs:'), [['lint وformat على المتغير', 'lint and format on changes'], ['النشر', 'deployment'], ['قاعدة البيانات', 'the database']], 0, B('lint-staged.', 'lint-staged.')),
        Q(B('PR بـ 3000 سطر:', 'A 3000-line PR:'), [['قسّمه لصغيرين', 'split it into smaller ones'], ['ادمجه علطول', 'merge at once'], ['متراجعهوش', 'skip review']], 0, B('مراجعة أحسن.', 'Better review.')),
        Q(B('* 0.14 في 7 أماكن:', '* 0.14 in 7 places:'), [['magic number → VAT_RATE', 'a magic number → VAT_RATE'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('اسم.', 'Name it.')),
        Q(B('README كويس فيه:', 'A good README has:'), [['إزاي تشغّله في أوامر قليلة', 'how to run it in a few commands'], ['كل الكود', 'all the code'], ['الأسرار', 'the secrets']], 0, B('10 دقايق.', '10 minutes.')),
        Q(B('ADR:', 'An ADR:'), [['سياق وقرار وبدائل وعواقب', 'context, decision, alternatives, consequences'], ['قايمة مهام', 'a task list'], ['لوج', 'a log']], 0, B('ليه.', 'Why.'))
      ] }
  ]
};
