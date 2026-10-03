// English week 30 — Style guides and professional documentation.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2 → C1',
  title: B('أدلة الأسلوب والتوثيق الاحترافي', 'Style guides and professional documentation'),
  goal: B('تكتب توثيق بمستوى الشركات الكبيرة: صوت ونبرة ثابتين، اختيار كلمات شامل ومحترم، تنسيق موحّد، النوع الصح من التوثيق لكل هدف، وتوثيق بيتراجع ويتحدّث زي الكود.',
          'Write documentation at the level of big companies: a consistent voice and tone, inclusive and respectful word choice, uniform formatting, the right kind of document for each purpose, and docs that are reviewed and updated like code.'),
  days: [
    { title: B('الصوت والنبرة', 'Voice and tone'),
      goal: B('تكتب بنفس الصوت في كل صفحة.', 'Write with the same voice on every page.'),
      learn: [
        L(B('ليه style guide', 'Why a style guide'),
          B('**style guide** بيوحّد الكتابة: لو 5 أشخاص كتبوا التوثيق، يبان كأنه شخص واحد. أشهرهم مجاني: Google developer documentation style guide وMicrosoft Writing Style Guide. اختار واحد واتبعه، ودوّن الاستثناءات بتاعتك.', 'A **style guide** unifies writing: if 5 people write the docs, it reads like one person. The best known are free: the Google developer documentation style guide and the Microsoft Writing Style Guide. Pick one, follow it, and record your own exceptions.'),
          'Our docs follow the Google developer documentation style guide,\nexcept: we use British spelling.'),
        L(B('المخاطب والمضارع', 'Second person and present tense'),
          B('اكتب لـ «you» (**second person**) مش «the user» ولا «we will»: «You can export…» بدل «The user is able to export…». واستخدم **present tense**: «The API returns…» مش «The API will return…». والمبني للمعلوم أوضح.', 'Write to «you» (**second person**), not «the user» or «we will»: «You can export…» instead of «The user is able to export…». Use the **present tense**: «The API returns…», not «The API will return…». The active voice is clearer.'),
          '✗ The user will be able to configure the timeout.\n✓ You can configure the timeout.'),
        L(B('صوت ونبرة', 'Voice and tone'),
          B('**voice** ثابت (شخصية البراند: ودود، واضح، محترم). **tone** بيتغيّر حسب الموقف: رسالة خطأ = هادية ومساعدة، صفحة ترحيب = متحمسة شوية، تحذير أمان = جاد ومباشر. متهزرش في رسالة خطأ.', '**Voice** is constant (the brand’s personality: friendly, clear, respectful). **Tone** changes with the situation: an error message = calm and helpful, a welcome page = a little excited, a security warning = serious and direct. Never joke in an error message.'),
          'welcome: "You’re all set — let’s build your first workflow!"\nerror: "We couldn’t save your changes. Check your connection and try again."')
      ],
      practice: [
        B('حوّل 10 جمل من توثيقك لـ second person ومضارع.', 'Convert 10 sentences from your docs to second person and present tense.'),
        B('اكتب نفس المعلومة بنبرتين (ترحيب وخطأ).', 'Write the same information in two tones (welcome and error).'),
        B('اقرا صفحة «Voice and tone» في style guide رسمي.', 'Read the «Voice and tone» page of an official style guide.'),
        B('اكتب 5 قواعد صوت لمشروعك.', 'Write 5 voice rules for your project.')
      ],
      words: [
        W('style guide', 'دليل قواعد الكتابة الموحّدة', 'a guide of shared writing rules', 'Follow the style guide in every page.'),
        W('voice', 'الشخصية الثابتة للكتابة', 'the constant personality of the writing', 'Our voice is friendly and clear.'),
        W('tone', 'النبرة حسب الموقف', 'the attitude that changes with the situation', 'Use a calm tone in error messages.'),
        W('second person', 'الكتابة للمخاطب (you)', 'writing to the reader as «you»', 'Docs are written in the second person.'),
        W('present tense', 'زمن المضارع', 'the tense for now', 'Describe behaviour in the present tense.')
      ],
      read: ['lib:Google Developer Documentation Style Guide', 'lib:Microsoft Writing Style Guide'],
      challenge: B('اكتب «دليل أسلوب صغير» لمشروعك (صفحة): الـ style guide المرجعي، الصوت، النبرة في 4 مواقف، وقواعد المخاطب والزمن — وطبّقه على README.', 'Write a one-page «mini style guide» for your project: the reference style guide, the voice, the tone in 4 situations, and the person and tense rules — then apply it to your README.'),
      quiz: [
        Q(B('الأحسن في التوثيق:', 'Better in docs:'), ['You can export the report.', 'The user will be able to export the report.', 'One may export the report.'], 0, B('you ومضارع.', 'You + present.')),
        Q(B('voice وtone:', 'Voice and tone:'), ['voice is constant, tone changes with the situation', 'they are the same', 'tone is constant'], 0, B('الفرق.', 'The difference.')),
        Q(B('رسالة خطأ:', 'An error message should be:'), ['calm and helpful', 'funny', 'blaming the user'], 0, B('نبرة مناسبة.', 'The right tone.'))
      ] },

    { title: B('اختيار الكلمات', 'Word choice'),
      goal: B('تختار كلمات واضحة وشاملة ومش متعالية.', 'Choose words that are clear, inclusive and not condescending.'),
      learn: [
        L(B('لغة شاملة', 'Inclusive language'),
          B('**inclusive language**: الـ style guides الحديثة بتستبدل `whitelist/blacklist` بـ **allowlist/denylist**، و`master/slave` بـ **primary/replica**، و`sanity check` بـ `quick check`. وبتستخدم «they» لشخص مش معروف. الهدف كلام دقيق ومحترم للكل.', '**Inclusive language**: modern style guides replace `whitelist/blacklist` with **allowlist/denylist**, `master/slave` with **primary/replica**, and `sanity check` with `quick check`. They use «they» for an unknown person. The aim is precise, respectful wording for everyone.'),
          'allowlist the domain · primary database and two replicas\n"When a user signs in, they see the dashboard."'),
        L(B('متقولش «simply»', 'Do not say «simply»'),
          B('كلمات زي `simply`، `just`، `easy`، `obviously` **condescending** (متعالية): لو القارئ تعب، بيحس إنه غبي. احذفها. وقلّل **jargon** (المصطلحات الداخلية) أو عرّفها أول مرة تظهر.', 'Words like `simply`, `just`, `easy` and `obviously` are **condescending**: if the reader struggles, they feel stupid. Delete them. And reduce **jargon** (insider terms) or define it the first time it appears.'),
          '✗ Simply run the obvious command.\n✓ Run the following command.\n✓ "idempotent (safe to repeat without extra effect)"'),
        L(B('ثبات الإملاء والمصطلحات', 'Consistent spelling and terms'),
          B('اختار أمريكي أو بريطاني والتزم (color/colour، organize/organise). ونفس المصطلح لنفس الحاجة طول التوثيق: لو قلت «workflow» متقولش «flow» و«automation» و«scenario» لنفس الحاجة. اعمل word list.', 'Choose American or British spelling and stick to it (color/colour, organize/organise). Use the same term for the same thing throughout: if you say «workflow», do not also say «flow», «automation» and «scenario» for it. Keep a word list.'),
          'word list: workflow (not flow/scenario) · sign in (verb), sign-in (noun) · email (not e-mail)')
      ],
      practice: [
        B('دوّر في توثيقك على simply/just/easy واحذفها.', 'Search your docs for simply/just/easy and delete them.'),
        B('استبدل أي مصطلحات قديمة بالبدائل الشاملة.', 'Replace any outdated terms with the inclusive alternatives.'),
        B('اعمل word list بـ 15 مصطلح لمشروعك.', 'Build a 15-term word list for your project.'),
        B('عرّف 5 مصطلحات jargon أول ما تظهر.', 'Define 5 jargon terms where they first appear.')
      ],
      words: [
        W('inclusive language', 'كلام محترم ودقيق لكل الناس', 'wording that is respectful and accurate for everyone', 'Our docs use inclusive language.'),
        W('allowlist', 'قايمة المسموح', 'a list of what is allowed', 'Add the IP to the allowlist.'),
        W('denylist', 'قايمة الممنوع', 'a list of what is blocked', 'The domain is on the denylist.'),
        W('condescending', 'متعالي وبيستصغر القارئ', 'talking down to the reader', '«Obviously» can sound condescending.'),
        W('jargon', 'مصطلحات خاصة صعبة على الغريب', 'insider terms hard for outsiders', 'Define jargon the first time.')
      ],
      read: [{ t: 'Google style guide: Inclusive documentation', url: 'https://developers.google.com/style/inclusive-documentation', what: B('اقرا البدائل المقترحة.', 'Read the suggested alternatives.') }, 'lib:Google developer style: Word list'],
      challenge: B('راجع التوثيق كله لمشروع واحد: احذف الكلمات المتعالية، وطبّق اللغة الشاملة، ووحّد المصطلحات بـ word list، وعرّف كل jargon — وسجّل عدد التعديلات.', 'Review all the docs for one project: remove condescending words, apply inclusive language, unify terms with a word list, and define every piece of jargon — record how many edits you made.'),
      quiz: [
        Q(B('بديل whitelist:', 'The alternative to whitelist:'), ['allowlist', 'greenlist', 'goodlist'], 0, B('الشائع.', 'The common one.')),
        Q(B('«Simply run…» مشكلتها:', 'The problem with «Simply run…»:'), ['it can sound condescending', 'it is too long', 'nothing'], 0, B('لو صعبة على القارئ.', 'If it is hard for the reader.')),
        Q(B('نفس الحاجة بـ 3 أسماء:', 'The same thing with 3 names:'), ['confuses readers; pick one term', 'is rich vocabulary', 'is required'], 0, B('ثبات.', 'Consistency.'))
      ] },

    { title: B('قواعد التنسيق', 'Formatting conventions'),
      goal: B('تنسّق الصفحات بشكل موحّد وسهل المسح.', 'Format pages uniformly and make them easy to scan.'),
      learn: [
        L(B('العناوين', 'Headings'),
          B('أغلب الـ style guides الحديثة بتستخدم **sentence case** للعناوين («Configure the webhook») مش **title case** («Configure The Webhook»). العنوان يبدأ بفعل للمهام («Install n8n»)، أو اسم للمفاهيم («Execution data»).', 'Most modern style guides use **sentence case** for headings («Configure the webhook»), not **title case** («Configure The Webhook»). Task headings start with a verb («Install n8n»); concept headings use a noun («Execution data»).'),
          '✓ ## Configure the webhook\n✗ ## Configuring The Webhook Settings'),
        L(B('عناصر الواجهة والكود', 'UI elements and code'),
          B('أسماء أزرار وقوايم الواجهة (**UI element**) بخط **bold**: «Click **Save**». الكود وأسماء الملفات والأوامر بـ **code font**: «Edit `config.json`». متحطش علامات تنصيص على أسماء الأزرار.', 'Names of UI buttons and menus (**UI elements**) are in **bold**: «Click **Save**». Code, file names and commands are in **code font**: «Edit `config.json`». Do not put quotation marks around button names.'),
          'Click **Settings** > **API**, then copy the key into `.env`.'),
        L(B('القوايم المتوازية', 'Parallel lists'),
          B('عناصر القايمة لازم تكون **parallel structure**: كلهم يبدأوا بنفس النوع (فعل أمر، أو اسم)، وبنفس الشكل. والخطوات المرقّمة لما الترتيب مهم، والنقط لما مش مهم. وقايمة من عنصر واحد مش قايمة.', 'List items must use **parallel structure**: all start with the same kind of word (an imperative verb, or a noun) and have the same form. Use numbered steps when order matters and bullets when it does not. A one-item list is not a list.'),
          '✗ - Install Docker  - Configuration of the volume  - You should start n8n\n✓ - Install Docker  - Configure the volume  - Start n8n')
      ],
      practice: [
        B('حوّل كل عناوين README لـ sentence case.', 'Convert all your README headings to sentence case.'),
        B('صلّح تنسيق 10 أسماء أزرار وملفات.', 'Fix the formatting of 10 button and file names.'),
        B('خلّي 3 قوايم parallel.', 'Make 3 lists parallel.'),
        B('قرّر لكل قايمة: أرقام ولا نقط.', 'Decide for each list: numbers or bullets.')
      ],
      words: [
        W('sentence case', 'أول حرف بس كبير في العنوان', 'only the first letter capitalised in a heading', 'Use sentence case for headings.'),
        W('title case', 'كل كلمة مهمة تبدأ بحرف كبير', 'every main word capitalised', 'Our old docs used title case.'),
        W('ui element', 'زر أو قايمة أو خانة في الواجهة', 'a button, menu or field in the interface', 'Write UI element names in bold.'),
        W('code font', 'خط الكود الثابت العرض', 'the fixed-width font for code', 'Put file names in code font.'),
        W('parallel structure', 'نفس الشكل النحوي لكل عناصر القايمة', 'the same grammatical form for every list item', 'Fix the list’s parallel structure.')
      ],
      read: ['lib:Markdown Guide', { lib: 'Google Developer Documentation Style Guide', what: B('اقرا «Headings» و«Lists».', 'Read «Headings» and «Lists».') }],
      challenge: B('نسّق صفحة توثيق طويلة بالكامل حسب القواعد: عناوين sentence case بأفعال، bold للواجهة، code font للكود، قوايم parallel، وأرقام للخطوات.', 'Format a long docs page entirely by the rules: sentence-case headings with verbs, bold for UI, code font for code, parallel lists, and numbers for steps.'),
      quiz: [
        Q(B('عنوان sentence case:', 'A sentence-case heading:'), ['Set up the database', 'Set Up The Database', 'SET UP THE DATABASE'], 0, B('أول حرف بس.', 'Only the first letter.')),
        Q(B('اسم زر في الواجهة:', 'A UI button name:'), ['**Save**', '"Save"', '`Save` always'], 0, B('bold.', 'Bold.')),
        Q(B('قايمة parallel:', 'A parallel list:'), ['Install · Configure · Start', 'Install · Configuration · You start', 'Installing · Configure · Started'], 0, B('نفس الشكل.', 'Same form.'))
      ] },

    { title: B('أنواع التوثيق (Diátaxis)', 'Kinds of documentation (Diátaxis)'),
      goal: B('تكتب النوع الصح من الصفحة لاحتياج القارئ.', 'Write the right kind of page for the reader’s need.'),
      learn: [
        L(B('الأربع أنواع', 'The four kinds'),
          B('إطار **Diátaxis**: **tutorial** (درس: المبتدئ يتعلم بإنه يعمل حاجة كاملة)، **how-to guide** (خطوات لهدف محدد لحد عارف الأساسيات)، **reference** (وصف دقيق: كل parameter وكل خطأ)، **explanation** (ليه وإزاي بيشتغل). خلطهم في صفحة واحدة بيتوه القارئ.', 'The **Diátaxis** framework: a **tutorial** (a lesson: a beginner learns by building something complete), a **how-to guide** (steps for a specific goal, for someone who knows the basics), **reference** (an exact description: every parameter, every error), and **explanation** (why and how it works). Mixing them on one page loses the reader.'),
          'Tutorial: Build your first booking bot\nHow-to: Add WhatsApp to an existing bot\nReference: Webhook parameters\nExplanation: How the queue prevents lost orders'),
        L(B('علامات كل نوع', 'Signs of each kind'),
          B('Tutorial: «In this tutorial, you will…»، خطوات مضمونة النتيجة. How-to: العنوان «How to…»، من غير شرح كتير. Reference: جداول وقوايم، من غير قصة. Explanation: فقرات، «why»، تاريخ وبدائل. لو صفحة فيها كل ده، قسّمها.', 'Tutorial: «In this tutorial, you will…», steps with a guaranteed result. How-to: the title «How to…», little explanation. Reference: tables and lists, no story. Explanation: paragraphs, «why», history and alternatives. If a page has all of these, split it.'),
          'Reference row: timeout · integer · default 30 · seconds before the request is cancelled'),
        L(B('فين الناقص', 'Find the gaps'),
          B('رتّب صفحات مشروعك على الأربع أنواع. غالبًا هتلاقي reference كتير وtutorial ناقص، أو كله «README» واحد. خطة التوثيق: tutorial واحد كويس، how-tos للمهام المتكررة، reference كامل، وexplanation للقرارات الكبيرة.', 'Sort your project’s pages into the four kinds. You will often find lots of reference and no tutorial, or everything in one README. A docs plan: one good tutorial, how-tos for common tasks, complete reference, and explanation for the big decisions.'),
          'tutorial ✗ · how-to 2 · reference ✓ · explanation ✗ → write a tutorial next')
      ],
      practice: [
        B('صنّف 10 صفحات من توثيق أداة بتستخدمها على الأربع أنواع.', 'Classify 10 pages from a tool’s docs into the four kinds.'),
        B('صنّف صفحات مشروعك واكتب الناقص.', 'Classify your project’s pages and list what is missing.'),
        B('اكتب صفحة reference لـ webhook بجدول.', 'Write a reference page for a webhook with a table.'),
        B('قسّم صفحة مخلوطة لصفحتين.', 'Split a mixed page into two.')
      ],
      words: [
        W('diataxis', 'إطار بيقسم التوثيق لأربع أنواع', 'a framework dividing docs into four kinds', 'We organised the docs with Diátaxis.'),
        W('tutorial', 'درس بيعلّم بالتجربة خطوة بخطوة', 'a lesson that teaches by doing, step by step', 'Write a tutorial for beginners.'),
        W('how-to guide', 'خطوات لهدف محدد', 'steps for one specific goal', 'The how-to guide adds WhatsApp.'),
        W('reference', 'وصف دقيق شامل للتفاصيل', 'an exact, complete description of details', 'Check the reference for every parameter.'),
        W('explanation', 'شرح ليه وإزاي', 'a discussion of why and how', 'The explanation page covers the design.')
      ],
      read: ['lib:Diátaxis', 'lib:Write the Docs Guide'],
      challenge: B('اعمل «خطة توثيق» لمشروعك بالأربع أنواع، واكتب tutorial واحد كامل (من الصفر لنتيجة شغالة) بأسلوب الأسبوع ده.', 'Make a «docs plan» for your project with the four kinds, and write one complete tutorial (from zero to a working result) in this week’s style.'),
      quiz: [
        Q(B('«How to add a webhook» نوعها:', '«How to add a webhook» is a:'), ['how-to guide', 'tutorial', 'explanation'], 0, B('هدف محدد.', 'A specific goal.')),
        Q(B('جدول بكل الـ parameters:', 'A table of every parameter:'), ['reference', 'tutorial', 'explanation'], 0, B('وصف دقيق.', 'Exact description.')),
        Q(B('صفحة «ليه اخترنا Postgres»:', 'A page «why we chose Postgres»:'), ['explanation', 'how-to', 'reference'], 0, B('ليه.', 'Why.'))
      ] },

    { title: B('التوثيق كالكود', 'Docs as code'),
      goal: B('توثيقك يتراجع ويتختبر ويتحدّث زي الكود.', 'Your docs are reviewed, tested and updated like code.'),
      learn: [
        L(B('الفكرة', 'The idea'),
          B('**docs as code**: التوثيق ملفات Markdown في نفس الـ repo، كل تغيير PR بمراجعة، ويتنشر آليًا (GitHub Pages، MkDocs، Docusaurus). ميزة كبيرة: الـ PR اللي بيغيّر الكود بيغيّر التوثيق في نفس الوقت.', '**Docs as code**: docs are Markdown files in the same repo, every change is a reviewed PR, and they publish automatically (GitHub Pages, MkDocs, Docusaurus). A big advantage: the PR that changes the code changes the docs at the same time.'),
          'PR #212: "Add retry option"\n  src/client.py\n  docs/reference/client.md   ← updated in the same PR'),
        L(B('linter للكتابة', 'A linter for writing'),
          B('زي ESLint للكود، فيه **linter** للنصوص: **Vale** بيطبّق قواعد الـ style guide آليًا (كلمات ممنوعة، sentence case، طول الجمل) في CI. ومعاه فحص الروابط المكسورة. الآلة تمسك الصغيرات والمراجع البشري يركّز على المعنى.', 'Like ESLint for code, there are **linters** for prose: **Vale** applies style-guide rules automatically (banned words, sentence case, sentence length) in CI. Add a broken-link check. The machine catches the small things and the human reviewer focuses on meaning.'),
          'vale docs/  →  docs/setup.md:12:1  Google.We  Try to avoid using first-person plural like "we".'),
        L(B('التوثيق القديم', 'Stale docs'),
          B('التوثيق اللي بيكذب أسوأ من مفيش توثيق. **stale docs**: حط تاريخ آخر مراجعة و**doc owner** لكل صفحة، ومراجعة كل 3 شهور، وأي bug بسبب توثيق غلط = تصليح فوري. وللإصدارات المختلفة: **versioned docs**.', 'Docs that lie are worse than no docs. Against **stale docs**: give each page a last-reviewed date and a **doc owner**, review every 3 months, and fix at once any bug caused by wrong docs. For different releases: **versioned docs**.'),
          'Last reviewed: 2026-10-01 · Owner: @mahmoud · Applies to: v3.x')
      ],
      practice: [
        B('انقل توثيق مشروع لفولدر docs/ في الـ repo.', 'Move a project’s docs into a docs/ folder in the repo.'),
        B('شغّل Vale (أو أداة مشابهة) على 3 صفحات وصلّح.', 'Run Vale (or a similar tool) on 3 pages and fix them.'),
        B('ضيف «Last reviewed» وowner لكل صفحة.', 'Add «Last reviewed» and an owner to every page.'),
        B('اعمل PR بيغيّر كود وتوثيق مع بعض.', 'Make a PR that changes code and docs together.')
      ],
      words: [
        W('docs as code', 'التوثيق بيتعامل زي الكود (Git، PR، CI)', 'treating docs like code (Git, PRs, CI)', 'We adopted docs as code last year.'),
        W('linter', 'أداة بتفحص النص أو الكود بقواعد', 'a tool that checks text or code against rules', 'The linter flagged three long sentences.'),
        W('vale', 'linter للكتابة بقواعد style guide', 'a prose linter using style-guide rules', 'Vale runs on every docs PR.'),
        W('stale docs', 'توثيق قديم مش مطابق للواقع', 'out-of-date documentation', 'Stale docs caused the wrong config.'),
        W('doc owner', 'المسؤول عن صفحة توثيق', 'the person responsible for a docs page', 'Each page has a doc owner.')
      ],
      read: [{ t: 'Vale documentation', url: 'https://docs.vale.sh/', what: B('اقرا البداية السريعة.', 'Read the quick start.') }, 'lib:Write the Docs Guide'],
      challenge: B('حوّل توثيق مشروعك لـ docs as code: docs/ في Git، Vale أو فحص مشابه، فحص روابط، تاريخ مراجعة وowner — وفعّل الفحص في GitHub Actions.', 'Turn your project’s docs into docs as code: docs/ in Git, Vale or a similar check, a link check, review dates and owners — and run the checks in GitHub Actions.'),
      quiz: [
        Q(B('ميزة docs as code الكبيرة:', 'The big advantage of docs as code:'), ['code and docs change in the same PR', 'no review needed', 'no files'], 0, B('مع بعض.', 'Together.')),
        Q(B('Vale بيعمل:', 'Vale:'), ['checks prose against style rules', 'compiles code', 'hosts websites'], 0, B('linter للنص.', 'A prose linter.')),
        Q(B('التوثيق الغلط:', 'Wrong docs are:'), ['worse than no docs', 'fine', 'better than nothing always'], 0, B('بيضلّل.', 'They mislead.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('توثيق مشروع بمستوى احترافي ثابت.', 'Project documentation at a consistent professional level.'),
      review: [
        B('الصوت والنبرة، المخاطب، والمضارع.', 'Voice and tone, second person and present tense.'),
        B('اللغة الشاملة، الكلمات المتعالية، والـ jargon، وword list.', 'Inclusive language, condescending words, jargon and a word list.'),
        B('العناوين sentence case، الواجهة bold، الكود code font، القوايم parallel.', 'Sentence-case headings, bold UI, code font, parallel lists.'),
        B('Diátaxis: tutorial وhow-to وreference وexplanation.', 'Diátaxis: tutorial, how-to, reference and explanation.'),
        B('Docs as code: Git وVale والمراجعة والتوثيق القديم.', 'Docs as code: Git, Vale, review and stale docs.')
      ],
      project: B('أعد كتابة توثيق مشروع كامل من مشاريع الرحلة بمستوى احترافي: دليل أسلوب صغير، word list، tutorial واحد، 3 how-tos، reference كامل، صفحة explanation، كله في docs/ بـ Vale وفحص روابط في CI — وقارن قبل وبعد في تقرير قصير.', 'Rewrite the full documentation of one journey project at a professional level: a mini style guide, a word list, one tutorial, 3 how-tos, complete reference, an explanation page, all in docs/ with Vale and a link check in CI — and compare before and after in a short report.'),
      test: [
        Q(B('أحسن جملة توثيق:', 'The best docs sentence:'), ['You can change the port in `.env`.', 'The user will be able to change the port.', 'Simply change the obvious port.'], 0, B('you ومضارع ومن غير simply.', 'You, present, no «simply».')),
        Q(B('النبرة في تحذير أمان:', 'The tone of a security warning:'), ['serious and direct', 'playful', 'vague'], 0, B('حسب الموقف.', 'Fits the situation.')),
        Q(B('بديل master/slave:', 'The alternative to master/slave:'), ['primary/replica', 'boss/worker', 'big/small'], 0, B('شامل ودقيق.', 'Inclusive and precise.')),
        Q(B('«obviously» في التوثيق:', '«obviously» in docs:'), ['should be removed', 'adds clarity', 'is required'], 0, B('متعالية.', 'Condescending.')),
        Q(B('word list فايدته:', 'A word list helps to:'), ['use one term per thing', 'translate', 'count words'], 0, B('ثبات.', 'Consistency.')),
        Q(B('عنوان صحيح:', 'A correct heading:'), ['Install the CLI', 'Install The CLI', 'Installing The CLI Tool'], 0, B('sentence case بفعل.', 'Sentence case with a verb.')),
        Q(B('اسم ملف في جملة:', 'A file name in a sentence:'), ['`config.json` in code font', '**config.json** in bold', '"config.json" in quotes'], 0, B('code font.', 'Code font.')),
        Q(B('درس بيبني حاجة كاملة لمبتدئ:', 'A lesson building something complete for a beginner:'), ['tutorial', 'reference', 'explanation'], 0, B('Diátaxis.', 'Diátaxis.')),
        Q(B('جدول error codes:', 'A table of error codes:'), ['reference', 'tutorial', 'how-to'], 0, B('وصف دقيق.', 'Exact description.')),
        Q(B('docs as code بيعني:', 'Docs as code means:'), ['docs in Git with PRs and checks', 'docs only in Word files', 'no docs'], 0, B('زي الكود.', 'Like code.')),
        Q(B('linter للكتابة:', 'A prose linter:'), ['Vale', 'Docker', 'Postgres'], 0, B('قواعد آلية.', 'Automatic rules.')),
        Q(B('علاج التوثيق القديم:', 'A cure for stale docs:'), ['review dates and owners', 'delete all docs', 'never edit'], 0, B('مراجعة منتظمة.', 'Regular review.'))
      ] }
  ]
};
