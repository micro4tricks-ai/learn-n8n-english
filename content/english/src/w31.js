// English week 31 — Writing tutorials and articles.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2 → C1',
  title: B('كتابة الدروس والمقالات', 'Writing tutorials and articles'),
  goal: B('تكتب درس تقني الناس تقدر تمشي فيه لآخره، ومقال بيتقري ويتشارك: تخطيط، خطوات بنتايج، قصة، عناوين جذابة، مراجعة ذاتية، ونشر.',
          'Write a technical tutorial people can follow to the end, and an article that gets read and shared: planning, steps with results, a story, strong titles, self-editing and publishing.'),
  days: [
    { title: B('تخطيط الدرس', 'Planning a tutorial'),
      goal: B('تحدد القارئ والنتيجة قبل ما تكتب كلمة.', 'Define the reader and the result before writing a word.'),
      learn: [
        L(B('مين وإيه', 'Who and what'),
          B('قبل الكتابة جاوب: مين القارئ (مستواه)، **learning objective** (هيعرف يعمل إيه في الآخر)، **end result** (حاجة شغالة يشوفها)، والوقت (30 دقيقة؟). الدرس اللي بيحاول يعلّم كل حاجة مبيعلّمش حاجة.', 'Before writing, answer: who is the reader (their level), the **learning objective** (what they will be able to do at the end), the **end result** (something working they can see), and the time (30 minutes?). A tutorial that tries to teach everything teaches nothing.'),
          'Reader: knows basic n8n · Objective: build a Telegram bot that books appointments\nEnd result: a working bot · Time: 40 minutes'),
        L(B('المتطلبات', 'Prerequisites'),
          B('قسم **Prerequisites** في الأول: البرامج والإصدارات والحسابات والمعرفة المطلوبة، بلينكات. كده القارئ يعرف قبل ما يبدأ ومش يتعطل في النص. «You need: n8n 1.x running locally, a Telegram account, basic knowledge of expressions.»', 'A **Prerequisites** section at the start: the software, versions, accounts and knowledge needed, with links. The reader then knows before starting and does not get stuck halfway. «You need: n8n 1.x running locally, a Telegram account, basic knowledge of expressions.»'),
          '## Prerequisites\n- n8n 1.x running locally (see Install n8n)\n- A Telegram account\n- Basic expressions ({{ $json }})'),
        L(B('الهيكل', 'The outline'),
          B('اكتب **outline** الأول: عناوين الأقسام بس، كل قسم خطوة كبيرة بنتيجة. قاعدة: النتيجة الكاملة تبان في الأول (صورة أو GIF)، وكل قسم بيضيف حاجة شغالة، وفي الآخر **recap** و**next steps**.', 'Write the **outline** first: section headings only, each section a big step with a result. Rule: show the finished result at the start (an image or GIF), each section adds something that works, and end with a **recap** and **next steps**.'),
          '1 What you will build (GIF)  2 Prerequisites  3 Create the bot\n4 Receive messages  5 Book a slot  6 Recap  7 Next steps')
      ],
      practice: [
        B('اختار موضوع درس من شغلك واكتب القارئ والهدف والنتيجة والوقت.', 'Pick a tutorial topic from your work and write the reader, objective, result and time.'),
        B('اكتب قسم Prerequisites بلينكات.', 'Write a Prerequisites section with links.'),
        B('اكتب outline بـ 6–8 أقسام.', 'Write a 6–8 section outline.'),
        B('اعمل GIF أو صورة للنتيجة النهائية.', 'Make a GIF or image of the final result.')
      ],
      words: [
        W('learning objective', 'اللي القارئ هيعرف يعمله في الآخر', 'what the reader will be able to do at the end', 'State the learning objective in one sentence.'),
        W('end result', 'النتيجة النهائية الشغالة', 'the final working result', 'Show the end result at the top.'),
        W('prerequisites', 'المتطلبات قبل البداية', 'what you need before starting', 'List the prerequisites with versions.'),
        W('outline', 'هيكل الأقسام قبل الكتابة', 'the plan of sections before writing', 'Write the outline first.'),
        W('next steps', 'اللي القارئ ممكن يعمله بعد كده', 'what the reader can do afterwards', 'End with three next steps.')
      ],
      read: ['lib:Diátaxis', { lib: 'DigitalOcean: Technical writing guidelines', what: B('اقرا هيكل الدرس عندهم.', 'Read their tutorial structure.') }],
      challenge: B('خطط درس كامل: القارئ، الهدف، النتيجة، الوقت، المتطلبات، outline، وصورة النتيجة — وخلّي حد من مستوى القارئ يقولك فاهم هيتعلم إيه.', 'Plan a full tutorial: reader, objective, result, time, prerequisites, outline and a result image — and have someone at the reader’s level tell you whether they understand what they will learn.'),
      quiz: [
        Q(B('أول حاجة في التخطيط:', 'The first planning step:'), ['the reader and the objective', 'the font', 'the publishing site'], 0, B('مين وإيه.', 'Who and what.')),
        Q(B('Prerequisites مكانها:', 'Prerequisites belong:'), ['at the start', 'at the end', 'nowhere'], 0, B('قبل ما يبدأ.', 'Before starting.')),
        Q(B('النتيجة النهائية تبان:', 'The end result is shown:'), ['at the start', 'only at the end', 'never'], 0, B('تحفيز.', 'Motivation.'))
      ] },

    { title: B('كتابة الخطوات', 'Writing the steps'),
      goal: B('خطوات القارئ يمشي فيها من غير ما يتوه.', 'Steps the reader follows without getting lost.'),
      learn: [
        L(B('فعل واحد ونتيجة', 'One action and a result'),
          B('كل خطوة: فعل واحد بصيغة الأمر، وبعدها **ما المفروض يشوفه**: «Click **Execute step**. You should see three items in the output.» النتيجة دي هي اللي بتطمّن القارئ إنه ماشي صح.', 'Each step: one imperative action, followed by **what they should see**: «Click **Execute step**. You should see three items in the output.» That result reassures the reader they are on track.'),
          '3. Click **Execute step**.\n   You should see 3 items, each with `name` and `phone`.'),
        L(B('كود ينفع ينسخ', 'Copy-paste-ready code'),
          B('كل كود لازم يبقى **copy-paste** ويشتغل: كامل، من غير «...»، وفيه كل الـ imports، وبيانات وهمية واقعية. وقول فين يتحط («Paste this into the Code node»). جرّب كل كود بنفسك قبل النشر.', 'All code must work when **copy-pasted**: complete, no «...», all imports included, with realistic fake data. Say where it goes («Paste this into the Code node»). Test every snippet yourself before publishing.'),
          'Paste this into the **Code** node (mode: Run Once for All Items):\n```js\nreturn $input.all().map(i => ({ json: { name: i.json.name.trim() } }));\n```'),
        L(B('نقط التحقق', 'Checkpoints'),
          B('كل 3–4 خطوات حط **checkpoint**: «At this point, your workflow should look like this (screenshot).» و**troubleshooting tip** للغلطة المتوقعة: «If you see `Cannot read properties of undefined`, check that…».', 'Every 3–4 steps add a **checkpoint**: «At this point, your workflow should look like this (screenshot).» And a **troubleshooting tip** for the likely mistake: «If you see `Cannot read properties of undefined`, check that…».'),
          '✅ Checkpoint: the bot replies "Hello" to any message.\n💡 If it does not reply, make sure the workflow is **Active**.')
      ],
      practice: [
        B('اكتب 10 خطوات لقسم واحد بفعل ونتيجة.', 'Write 10 steps for one section with an action and a result.'),
        B('جرّب كل كود بنسخه في مكان نضيف.', 'Test every snippet by pasting it somewhere clean.'),
        B('ضيف checkpoint كل 3–4 خطوات.', 'Add a checkpoint every 3–4 steps.'),
        B('اكتب 3 troubleshooting tips لأخطاء حقيقية.', 'Write 3 troubleshooting tips for real errors.')
      ],
      words: [
        W('copy-paste', 'تنسخ وتلصق وتشتغل على طول', 'copy and paste and it works at once', 'Every snippet must be copy-paste ready.'),
        W('checkpoint', 'نقطة تتأكد فيها إنك ماشي صح', 'a point to check you are on track', 'Add a checkpoint after step 4.'),
        W('troubleshooting tip', 'نصيحة لحل مشكلة متوقعة', 'advice for solving a likely problem', 'A troubleshooting tip saved me an hour.'),
        W('snippet', 'جزء صغير من الكود', 'a small piece of code', 'Test the snippet before publishing.'),
        W('you should see', 'عبارة بتوصف النتيجة المتوقعة', 'a phrase describing the expected outcome', 'You should see three items.')
      ],
      read: ['lib:Google Technical Writing Courses', { lib: 'GitHub: Writing on GitHub', what: B('شوف code blocks والتنسيق.', 'Look at code blocks and formatting.') }],
      challenge: B('اكتب الدرس كامل من الـ outline: كل خطوة بنتيجة، كود متجرّب، checkpoints، وtroubleshooting tips — وخلّي حد يمشي فيه وسجّل فين وقف.', 'Write the whole tutorial from the outline: each step with a result, tested code, checkpoints and troubleshooting tips — have someone follow it and note where they got stuck.'),
      quiz: [
        Q(B('خطوة كويسة:', 'A good step:'), ['«Click Save. You should see “Saved”.»', '«Do the settings and stuff.»', '«Configure everything.»'], 0, B('فعل + نتيجة.', 'Action + result.')),
        Q(B('كود فيه «...»:', 'Code containing «...»:'), ['is not copy-paste ready', 'is fine', 'is shorter so better'], 0, B('لازم كامل.', 'It must be complete.')),
        Q(B('checkpoint بيعمل:', 'A checkpoint:'), ['lets the reader confirm progress', 'ends the tutorial', 'adds ads'], 0, B('تطمين.', 'Reassurance.'))
      ] },

    { title: B('المقال التقني', 'The technical article'),
      goal: B('تكتب مقال بيحكي تجربة تقنية بشكل ممتع ومفيد.', 'Write an article that tells a technical experience in an engaging, useful way.'),
      learn: [
        L(B('القصة', 'The story'),
          B('المقال مش درس: هو **narrative** (حكاية): «كان عندنا مشكلة ← جربنا ← فشلنا ← اتعلمنا ← حلّينا ← النتيجة». القصة بتشد، والأرقام بتقنع. ابدأ بـ **hook**: رقم، أو موقف، أو سؤال.', 'An article is not a tutorial: it is a **narrative**: «we had a problem → we tried → we failed → we learnt → we solved it → the result». The story engages; the numbers convince. Start with a hook: a number, a scene or a question.'),
          'Hook: "On the first night of Ramadan, our bot lost 60 orders in 5 minutes."\n→ what we tried → what worked → numbers → lessons'),
        L(B('العناوين الفرعية', 'Subheadings'),
          B('المقال لازم يبقى **scannable** (يتمسح بالعين): عناوين فرعية كل 3–4 فقرات، فقرات قصيرة، وقوايم للنقط. القارئ بيقرا العناوين الأول؛ لو العناوين لوحدها حكت القصة، انت كتبت كويس.', 'An article must be **scannable**: subheadings every 3–4 paragraphs, short paragraphs and lists for points. Readers skim the headings first; if the headings alone tell the story, you wrote well.'),
          '## The night we lost 60 orders\n## Why the webhook timed out\n## Moving to a queue\n## Results: zero lost orders\n## What we would do differently'),
        L(B('الخاتمة والدعوة', 'Conclusion and call to action'),
          B('الخاتمة: الدرس في جملتين، وإيه اللي القارئ يعمله: **call to action** («Try adding a queue before your next campaign» أو «The workflow template is on GitHub»). متخلصش بـ «That’s all, thanks for reading».', 'The conclusion: the lesson in two sentences, and what the reader should do: a **call to action** («Try adding a queue before your next campaign» or «The workflow template is on GitHub»). Do not end with «That’s all, thanks for reading».'),
          '"Bursts are predictable — campaigns cause them. Put a queue in front of your webhook\n before the next one. The template is linked below."')
      ],
      practice: [
        B('اكتب 3 hooks مختلفة لمقال عن مشروع ليك.', 'Write 3 different hooks for an article about one of your projects.'),
        B('اكتب عناوين المقال بس واقراها لوحدها.', 'Write only the article’s headings and read them alone.'),
        B('اكتب خاتمة بـ call to action.', 'Write a conclusion with a call to action.'),
        B('حوّل فقرة طويلة لقايمة.', 'Turn a long paragraph into a list.')
      ],
      words: [
        W('blog post', 'مقال على مدونة', 'an article on a blog', 'Publish the blog post on Tuesday.'),
        W('narrative', 'حكاية بترتيب أحداث', 'a story told as a sequence of events', 'The narrative keeps readers going.'),
        W('scannable', 'سهل تمسحه بعينك بسرعة', 'easy to skim quickly', 'Short paragraphs make it scannable.'),
        W('call to action', 'دعوة القارئ لفعل محدد', 'an invitation to a specific action', 'End with a clear call to action.'),
        W('intro', 'المقدمة', 'the opening section', 'Keep the intro under 80 words.')
      ],
      read: ['lib:freeCodeCamp News', { lib: 'Julia Evans (jvns.ca)', what: B('لاحظ أسلوب الحكاية البسيط.', 'Notice the simple storytelling style.') }],
      challenge: B('اكتب مقال 800–1200 كلمة عن مشكلة حلّيتها في الرحلة: hook، قصة، عناوين بتحكي لوحدها، أرقام، دروس، وcall to action.', 'Write an 800–1,200 word article about a problem you solved during the journey: a hook, a story, headings that tell it alone, numbers, lessons and a call to action.'),
      quiz: [
        Q(B('المقال الكويس شكله:', 'A good article is shaped as:'), ['a story: problem → attempts → result', 'a list of commands only', 'a reference table'], 0, B('narrative.', 'A narrative.')),
        Q(B('عناوين المقال لوحدها لازم:', 'The headings alone should:'), ['tell the story', 'be one word', 'be jokes'], 0, B('scannable.', 'Scannable.')),
        Q(B('أحسن نهاية:', 'The best ending:'), ['the lesson + a call to action', '«That’s all»', 'no ending'], 0, B('فعل للقارئ.', 'An action for the reader.'))
      ] },

    { title: B('العناوين والمقدمات', 'Titles and introductions'),
      goal: B('تكتب عنوان ومقدمة بيخلّوا الناس تكمّل.', 'Write a title and introduction that make people keep reading.'),
      learn: [
        L(B('عنوان واضح', 'A clear title'),
          B('**headline** كويس بيقول القارئ هيستفيد إيه: «How we stopped losing orders during campaigns with a queue» أحسن من «Some thoughts on webhooks». أرقام وأفعال بتساعد. واحذر الـ clickbait: الوعد لازم المقال يحققه.', 'A good **headline** says what the reader gains: «How we stopped losing orders during campaigns with a queue» beats «Some thoughts on webhooks». Numbers and verbs help. Avoid clickbait: the article must keep the promise.'),
          '✗ "Webhooks!!"\n✓ "Zero lost orders: how a queue saved our Ramadan campaign"'),
        L(B('المقدمة بتوعد', 'The intro makes a promise'),
          B('المقدمة (3–4 جمل): المشكلة، لمين المقال، وهيتعلم إيه. «If your webhook handles campaign traffic, you may be losing orders without knowing. In this post, I show how we found the problem and fixed it with a simple Postgres queue.»', 'The intro (3–4 sentences): the problem, who the article is for, and what they will learn. «If your webhook handles campaign traffic, you may be losing orders without knowing. In this post, I show how we found the problem and fixed it with a simple Postgres queue.»'),
          'problem → who it is for → what you will learn'),
        L(B('وصف مختصر', 'A short description'),
          B('المنصات ومحركات البحث بتعرض **meta description** (سطر تحت العنوان، حوالي 150 حرف) و**teaser** (اللي بيظهر في المشاركة). اكتبه بنفسك: المشكلة والنتيجة. ده اللي بيقرر الناس تضغط ولا لأ.', 'Platforms and search engines show a **meta description** (a line under the title, about 150 characters) and a **teaser** (what appears when shared). Write it yourself: the problem and the result. It decides whether people click.'),
          'meta: "Our webhook lost 60 orders in 5 minutes. A Postgres queue fixed it for $20/month — here is how."')
      ],
      practice: [
        B('اكتب 5 عناوين لمقالك واختار الأوضح.', 'Write 5 titles for your article and pick the clearest.'),
        B('أعد كتابة المقدمة بالترتيب: مشكلة، لمين، هيتعلم إيه.', 'Rewrite the intro in order: problem, who for, what they will learn.'),
        B('اكتب meta description أقل من 155 حرف.', 'Write a meta description under 155 characters.'),
        B('قارن عناوين 5 مقالات ناجحة على dev.to.', 'Compare the titles of 5 successful articles on dev.to.')
      ],
      words: [
        W('headline', 'عنوان المقال', 'the title of an article', 'The headline promises zero lost orders.'),
        W('teaser', 'جملة قصيرة بتشوّق للمقال', 'a short line that makes people curious', 'Use the result as the teaser.'),
        W('meta description', 'وصف مختصر بيظهر في البحث', 'a short description shown in search results', 'Keep the meta description under 155 characters.'),
        W('clickbait', 'عنوان مبالغ فيه عشان الضغط', 'an exaggerated title made for clicks', 'Avoid clickbait; keep your promise.'),
        W('audience', 'الجمهور المستهدف', 'the people you write for', 'The audience is n8n beginners.')
      ],
      read: ['lib:DEV Community', { lib: 'NN/g: How users read on the web', what: B('اقرا عن أول سطرين وأهميتهم.', 'Read about the first two lines and why they matter.') }],
      challenge: B('حسّن مقالك: 5 عناوين واختيار واحد، مقدمة بالترتيب الصح، meta description، وteaser للينكدإن — واسأل 3 أشخاص أنهي عنوان يخليهم يضغطوا.', 'Improve your article: 5 titles and one chosen, an intro in the right order, a meta description, and a LinkedIn teaser — ask 3 people which title makes them click.'),
      quiz: [
        Q(B('أحسن عنوان:', 'The best title:'), ['«How a queue stopped our lost orders»', '«Thoughts»', '«READ THIS NOW!!!»'], 0, B('فايدة واضحة.', 'A clear benefit.')),
        Q(B('المقدمة لازم تقول:', 'The intro must say:'), ['the problem, the reader and what they will learn', 'your life story', 'every detail'], 0, B('وعد.', 'A promise.')),
        Q(B('clickbait مشكلته:', 'The problem with clickbait:'), ['the article does not keep the promise', 'it is too short', 'it uses numbers'], 0, B('ثقة.', 'Trust.'))
      ] },

    { title: B('التحرير والنشر', 'Editing and publishing'),
      goal: B('تراجع نصك بنفسك وتنشره صح.', 'Edit your own text and publish it properly.'),
      learn: [
        L(B('قايمة المراجعة الذاتية', 'The self-edit checklist'),
          B('**self-edit** بعد يوم من الكتابة: (1) احذف 20% من الكلام، (2) فقرات أقصر من 5 سطور، (3) جمل أقل من 25 كلمة، (4) passive قليل، (5) كل كود متجرّب، (6) كل لينك شغال، (7) LanguageTool للأخطاء. اليوم الفاصل بيخليك تشوف بعين القارئ.', '**Self-edit** a day after writing: (1) cut 20% of the words, (2) paragraphs under 5 lines, (3) sentences under 25 words, (4) little passive voice, (5) every snippet tested, (6) every link working, (7) LanguageTool for mistakes. The day’s gap lets you see with the reader’s eyes.'),
          '☐ cut 20%  ☐ short paragraphs  ☐ < 25 words/sentence  ☐ active voice\n☐ code tested  ☐ links work  ☐ LanguageTool'),
        L(B('اقراه بصوت عالي', 'Read it aloud'),
          B('**read aloud**: أي جملة تتعثر فيها وانت بتقراها بصوت = جملة محتاجة تتكتب تاني. وده بيكشف التكرار والإيقاع الوحش أحسن من أي أداة. ممكن كمان تخلّي أداة text to speech تقراه لك.', '**Read aloud**: any sentence you stumble over when reading aloud needs rewriting. This reveals repetition and bad rhythm better than any tool. You can also have a text-to-speech tool read it to you.'),
          'stumbled on: "The implementation of the queue was carried out by us"\n→ "We built the queue"'),
        L(B('النشر وإعادة النشر', 'Publishing and cross-posting'),
          B('انشر على مدونتك أو dev.to أو Hashnode أو LinkedIn. لو نشرت نفس المقال في أكتر من مكان (**cross-post**)، حط **canonical URL** للنسخة الأصلية عشان محركات البحث متعتبرهوش منسوخ. وشارك بـ teaser مش بلينك لوحده.', 'Publish on your blog, dev.to, Hashnode or LinkedIn. If you publish the same article in several places (**cross-post**), set a **canonical URL** pointing to the original so search engines do not treat it as a copy. Share with a teaser, not a bare link.'),
          'dev.to front matter:\ncanonical_url: https://yourname.github.io/blog/queue-saved-ramadan')
      ],
      practice: [
        B('طبّق قايمة المراجعة الذاتية على مقالك.', 'Apply the self-edit checklist to your article.'),
        B('اقراه بصوت عالي وصلّح كل جملة اتعثرت فيها.', 'Read it aloud and fix every sentence you stumbled on.'),
        B('شغّل LanguageTool وصحّح.', 'Run LanguageTool and correct.'),
        B('انشره (أو جهّزه) بـ canonical URL وteaser.', 'Publish it (or prepare it) with a canonical URL and a teaser.')
      ],
      words: [
        W('self-edit', 'تراجع وتعدّل نصك بنفسك', 'to review and improve your own text', 'Self-edit after a day away.'),
        W('read aloud', 'تقرا بصوت عالي', 'to read out loud', 'Read aloud to find clumsy sentences.'),
        W('publish', 'تنشر', 'to make public', 'Publish on dev.to first.'),
        W('cross-post', 'تنشر نفس المحتوى في أكتر من مكان', 'to publish the same content in several places', 'Cross-post to Hashnode with a canonical URL.'),
        W('canonical url', 'رابط النسخة الأصلية للمحتوى', 'the link to the original version of content', 'Set the canonical URL to your blog.')
      ],
      read: ['lib:LanguageTool', 'lib:Hemingway Editor'],
      challenge: B('خلّص المقال: مراجعة ذاتية كاملة، قراءة بصوت عالي، LanguageTool، وانشره (أو جهّزه للنشر) بعنوان وmeta وcanonical وteaser — واكتب تقرير «ماذا تعلمت من الكتابة».', 'Finish the article: a full self-edit, reading aloud, LanguageTool, and publish it (or get it ready) with a title, meta, canonical and teaser — then write a short «what I learnt from writing» note.'),
      quiz: [
        Q(B('ليه تستنى يوم قبل المراجعة؟', 'Why wait a day before editing?'), ['to see with the reader’s eyes', 'to forget it', 'it is a rule'], 0, B('عين جديدة.', 'Fresh eyes.')),
        Q(B('جملة اتعثرت فيها وانت بتقرا بصوت:', 'A sentence you stumbled on aloud:'), ['rewrite it', 'keep it', 'make it longer'], 0, B('مش سلسة.', 'Not smooth.')),
        Q(B('canonical URL بيقول:', 'A canonical URL says:'), ['which version is the original', 'who wrote it', 'the price'], 0, B('للبحث.', 'For search engines.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('درس ومقال منشورين بجودة احترافية.', 'A tutorial and an article published at a professional standard.'),
      review: [
        B('التخطيط: القارئ والهدف والنتيجة والمتطلبات والـ outline.', 'Planning: reader, objective, result, prerequisites and outline.'),
        B('الخطوات: فعل ونتيجة، كود متجرّب، checkpoints ونصايح.', 'Steps: action and result, tested code, checkpoints and tips.'),
        B('المقال: القصة والـ hook والعناوين والـ call to action.', 'The article: story, hook, headings and call to action.'),
        B('العنوان والمقدمة والـ meta بدون clickbait.', 'The title, the intro and the meta, without clickbait.'),
        B('المراجعة الذاتية والقراءة بصوت والنشر والـ canonical.', 'Self-editing, reading aloud, publishing and the canonical URL.')
      ],
      project: B('انشر (أو جهّز للنشر) قطعتين بالإنجليزي: درس كامل (من الصفر لنتيجة شغالة) لحاجة اتعلمتها في الرحلة، ومقال 1000 كلمة عن مشكلة حلّيتها — بعناوين ومقدمات وmeta، ومراجعة ذاتية، وتجربة الدرس على شخص حقيقي وتعديله حسب ملاحظاته.', 'Publish (or get ready to publish) two English pieces: a complete tutorial (from zero to a working result) on something you learnt in the journey, and a 1,000-word article about a problem you solved — with titles, intros and meta, a self-edit, and the tutorial tested on a real person and revised from their feedback.'),
      test: [
        Q(B('learning objective:', 'A learning objective:'), ['what the reader can do at the end', 'the article length', 'the author’s goal'], 0, B('للقارئ.', 'For the reader.')),
        Q(B('قسم Prerequisites:', 'The Prerequisites section:'), ['lists what is needed before starting', 'lists references at the end', 'is optional always'], 0, B('في الأول.', 'At the start.')),
        Q(B('outline:', 'An outline:'), ['the section plan before writing', 'the final summary', 'a picture'], 0, B('هيكل.', 'A plan.')),
        Q(B('«You should see…» بعد الخطوة:', '«You should see…» after a step:'), ['describes the expected result', 'is a warning', 'is filler'], 0, B('تطمين.', 'Reassurance.')),
        Q(B('كود في درس:', 'Code in a tutorial:'), ['complete and tested', 'shortened with «...»', 'untested'], 0, B('copy-paste.', 'Copy-paste ready.')),
        Q(B('troubleshooting tip:', 'A troubleshooting tip:'), ['helps with a likely error', 'is an ad', 'is the title'], 0, B('للمشاكل.', 'For problems.')),
        Q(B('المقال بيختلف عن الدرس في:', 'An article differs from a tutorial in:'), ['telling a story and lessons', 'having no words', 'being a reference table'], 0, B('narrative.', 'A narrative.')),
        Q(B('scannable يعني:', 'Scannable means:'), ['easy to skim with headings and short paragraphs', 'very long paragraphs', 'no headings'], 0, B('بالعين.', 'By eye.')),
        Q(B('call to action:', 'A call to action:'), ['tells the reader what to do next', 'thanks the reader', 'repeats the title'], 0, B('فعل.', 'An action.')),
        Q(B('meta description حوالي:', 'A meta description is about:'), ['150 characters', '2,000 words', '3 words'], 0, B('سطر.', 'One line.')),
        Q(B('read aloud بيكشف:', 'Reading aloud reveals:'), ['clumsy sentences and repetition', 'broken links', 'code bugs'], 0, B('الإيقاع.', 'The rhythm.')),
        Q(B('cross-post من غير canonical:', 'Cross-posting without a canonical URL:'), ['may look like copied content to search engines', 'is always best', 'is illegal'], 0, B('حط canonical.', 'Set one.'))
      ] }
  ]
};
