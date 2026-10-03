// English week 28 — Summarising, note-taking and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2',
  title: B('التلخيص وأخذ الملاحظات ومشروع الشهر', 'Summarising, note-taking and the month project'),
  goal: B('تحوّل اللي بتقراه وبتسمعه بالإنجليزي لملخصات وملاحظات بتفضل معاك: ملخصات بأطوال مختلفة، وطرق ملاحظات، وتلخيص الكلام المسموع، وإعادة الصياغة بأمان، وقاعدة معرفة شخصية.',
          'Turn what you read and hear in English into summaries and notes that stay with you: summaries of different lengths, note-taking methods, summarising speech, safe rewording, and a personal knowledge base.'),
  days: [
    { title: B('أنواع الملخصات', 'Kinds of summaries'),
      goal: B('تكتب ملخص بالطول المناسب للقارئ.', 'Write a summary of the right length for the reader.'),
      learn: [
        L(B('تلات أطوال', 'Three lengths'),
          B('**one-liner** (جملة: الفكرة كلها)، **executive summary** (فقرة 4–6 سطور لمدير مشغول: المشكلة، النتيجة، المطلوب)، وملخص طويل (صفحة بعناوين). قبل ما تكتب اسأل: مين القارئ وعنده وقت قد إيه؟', 'A **one-liner** (one sentence: the whole idea), an **executive summary** (a 4–6 line paragraph for a busy manager: the problem, the result, what is needed), and a long summary (a page with headings). Before writing ask: who is the reader, and how much time do they have?'),
          'One-liner: "The new cache cut page load from 3 s to 0.8 s."\nExecutive summary: problem → what we did → result in numbers → decision needed'),
        L(B('تحتفظ بإيه وتشيل إيه', 'What to keep and what to drop'),
          B('احتفظ بـ: الفكرة الأساسية، الأرقام المهمة، القرار أو الخطوة الجاية، والحدود. **omit** (اشيل): الأمثلة الكتير، التاريخ الطويل، الكلام المكرر، والتفاصيل التقنية اللي القارئ مش محتاجها. الملخص مش «النص بس أقصر» — هو اختيار.', 'Keep: the main idea, the important numbers, the decision or next step, and the limits. **Omit**: the many examples, the long history, repetition, and technical detail the reader does not need. A summary is not «the text, but shorter» — it is a selection.'),
          'keep: 3 s → 0.8 s · cost +$20/month · needs approval\nomit: the 4 libraries we tried first'),
        L(B('حدود الكلمات', 'Word limits'),
          B('اشتغل بـ **word limit**: اكتب الملخص، وبعدين **condense** (اختصره) للنص. ده بيجبرك تختار الأهم. أدوات المساعدة: احذف «In order to»، «It is important to note that»، والصفات الزيادة.', 'Work with a **word limit**: write the summary, then **condense** it to half. This forces you to choose what matters most. Helpers: delete «In order to», «It is important to note that», and extra adjectives.'),
          '120 words → 60 words → 25 words (one-liner)')
      ],
      practice: [
        B('خد مقال من الأسبوع اللي فات واكتب له الأطوال التلاتة.', 'Take an article from last week and write the three lengths for it.'),
        B('اكتب executive summary لمشروع عملته (5 سطور).', 'Write an executive summary of a project you did (5 lines).'),
        B('اختصر فقرة 120 كلمة لـ 60 ثم 25.', 'Condense a 120-word paragraph to 60, then to 25.'),
        B('اعرض الملخص على حد واسأله: فهمت المطلوب منك؟', 'Show the summary to someone and ask: did you understand what you need to do?')
      ],
      words: [
        W('one-liner', 'ملخص في جملة واحدة', 'a one-sentence summary', 'Start the email with a one-liner.'),
        W('executive summary', 'ملخص قصير لمدير مشغول', 'a short summary for a busy manager', 'Put the executive summary at the top.'),
        W('gist', 'الفكرة الأساسية', 'the main idea', 'I got the gist of the talk.'),
        W('omit', 'تشيل/متذكرش', 'to leave out', 'Omit the details the reader does not need.'),
        W('condense', 'تختصر من غير ما يضيع المعنى', 'to shorten without losing meaning', 'Condense the report to one page.')
      ],
      read: ['lib:Google Technical Writing Courses', 'lib:Plain Language Guidelines'],
      challenge: B('اختار تقرير أو مقال طويل (1500+ كلمة) واكتب له: one-liner، وexecutive summary، وملخص صفحة — وخلّي AI يقارن ملخصك بالأصل ويقولك لو فاتك حاجة مهمة.', 'Pick a long report or article (1,500+ words) and write: a one-liner, an executive summary and a one-page summary — then ask an AI to compare yours with the original and say if you missed anything important.'),
      quiz: [
        Q(B('مدير عنده دقيقة:', 'A manager has one minute:'), ['an executive summary', 'the full report', 'the appendix'], 0, B('فقرة.', 'A paragraph.')),
        Q(B('في الملخص تحتفظ بـ:', 'In a summary you keep:'), ['the main idea, key numbers and the next step', 'every example', 'the long history'], 0, B('اختيار.', 'A selection.')),
        Q(B('condense معناها:', 'condense means:'), ['shorten without losing meaning', 'translate', 'expand'], 0, B('تختصر.', 'Shorten.'))
      ] },

    { title: B('طرق أخذ الملاحظات', 'Note-taking methods'),
      goal: B('تاخد ملاحظات بالإنجليزي تفيدك بعد شهر.', 'Take notes in English that help you a month later.'),
      learn: [
        L(B('طريقة كورنيل', 'Cornell notes'),
          B('**Cornell notes**: الصفحة 3 أجزاء — يمين كبير للملاحظات وانت بتقرا أو بتسمع، شمال صغير للأسئلة والـ **cues** (كلمات مفتاحية)، وتحت ملخص في سطرين. للمراجعة: غطّي اليمين وجاوب أسئلة الشمال.', '**Cornell notes**: the page has 3 parts — a large right column for notes while reading or listening, a narrow left column for questions and **cues** (key words), and a two-line summary at the bottom. To review: cover the right side and answer the left-side questions.'),
          '| cue / question          | notes                                |\n| What is SKIP LOCKED?     | lets workers skip locked rows …      |\nsummary: queues in Postgres need SKIP LOCKED for many workers'),
        L(B('ملاحظات ذرّية', 'Atomic notes'),
          B('**atomic note** = فكرة واحدة في ملاحظة واحدة، بعنوان جملة («Retries need jitter to avoid bursts»)، بكلامك انت، ومعاها المصدر. الملاحظات الصغيرة دي بتتربط ببعض وبتتجمع لأفكار أكبر (فكرة Zettelkasten).', 'An **atomic note** = one idea per note, with a sentence as the title («Retries need jitter to avoid bursts»), in your own words, with the source. These small notes link to each other and build into bigger ideas (the Zettelkasten idea).'),
          '# Retries need jitter to avoid bursts\nWithout randomness, failed clients retry at the same moment …\nSource: AWS Builders’ Library · Links: [[Exponential backoff]]'),
        L(B('بكلامك وبالإنجليزي', 'In your words, in English'),
          B('اكتب الملاحظات **in your own words** بالإنجليزي البسيط، مش نسخ جمل من المصدر: ده بيثبت إنك فهمت وبيمرّنك على الكتابة. ولو كلمة صعبة، اكتب معناها جنبها. العربي مسموح للتوضيح بس.', 'Write notes **in your own words** in simple English, not sentences copied from the source: this proves you understood and practises your writing. If a word is hard, write its meaning beside it. Arabic is fine for clarification only.'),
          '✗ copied: "Idempotency is the property of certain operations…"\n✓ own words: "Doing it twice has the same effect as doing it once."')
      ],
      practice: [
        B('خد ملاحظات كورنيل لفيديو تقني 10 دقايق.', 'Take Cornell notes on a 10-minute tech video.'),
        B('اكتب 5 atomic notes من مقال.', 'Write 5 atomic notes from an article.'),
        B('اربط 3 ملاحظات ببعض بلينكات.', 'Link 3 notes together.'),
        B('بعد يومين غطّي الملاحظات وجاوب الأسئلة.', 'Two days later cover the notes and answer the questions.')
      ],
      words: [
        W('cornell notes', 'طريقة ملاحظات بأسئلة وملخص', 'a note method with questions and a summary', 'Cornell notes make review easy.'),
        W('cue', 'كلمة أو سؤال بيفكّرك بالفكرة', 'a word or question that reminds you of an idea', 'Write a cue in the left column.'),
        W('atomic note', 'ملاحظة فيها فكرة واحدة بس', 'a note holding exactly one idea', 'Each atomic note has one idea.'),
        W('zettelkasten', 'نظام ملاحظات صغيرة مترابطة', 'a system of small linked notes', 'My zettelkasten has 200 notes.'),
        W('in your own words', 'بأسلوبك مش نسخ', 'in your style, not copied', 'Write the definition in your own words.')
      ],
      read: [{ t: 'Cornell University: The Cornell Note-taking System', url: 'https://lsc.cornell.edu/how-to-study/taking-notes/cornell-note-taking-system/', what: B('اقرا شكل الصفحة وطريقة المراجعة.', 'Read the page layout and the review method.') }, 'lib:Anki'],
      challenge: B('ابدأ «دفتر ملاحظات تقني» بالإنجليزي (Obsidian أو Notion أو Markdown في Git): 15 atomic note من قراءات الأسبوع، مترابطة، كل واحدة بمصدرها.', 'Start an English «tech notebook» (Obsidian, Notion or Markdown in Git): 15 atomic notes from this week’s reading, linked, each with its source.'),
      quiz: [
        Q(B('atomic note فيها:', 'An atomic note holds:'), ['one idea', 'a whole book', 'only links'], 0, B('فكرة واحدة.', 'One idea.')),
        Q(B('عمود الشمال في كورنيل لـ:', 'The left column in Cornell notes is for:'), ['questions and cues', 'the full text', 'drawings only'], 0, B('للمراجعة.', 'For review.')),
        Q(B('الملاحظات الأحسن:', 'Better notes are:'), ['in your own words', 'copied sentences', 'only highlights'], 0, B('بتثبت الفهم.', 'They prove understanding.'))
      ] },

    { title: B('تلخيص الكلام المسموع', 'Summarising what you hear'),
      goal: B('تطلع بملخص صحيح من اجتماع أو محاضرة بالإنجليزي.', 'Get an accurate summary out of an English meeting or talk.'),
      learn: [
        L(B('علامات المتكلم', 'The speaker’s signposts'),
          B('المتكلمين بيقولولك امتى النقطة مهمة: «The main point is…»، «What I want you to remember is…»، «Let me stress that…»، «**The bottom line** is…»، «**To sum up**…»، «So, in short…». أول ما تسمعهم، اكتب اللي بعدهم.', 'Speakers tell you when a point matters: «The main point is…», «What I want you to remember is…», «Let me stress that…», «**The bottom line** is…», «**To sum up**…», «So, in short…». As soon as you hear them, write what follows.'),
          '"The bottom line is: we ship on Thursday, not Monday." → write it down'),
        L(B('ملاحظات بالاختصارات', 'Notes with abbreviations'),
          B('الكلام أسرع من الكتابة. استخدم: `→` (يؤدي لـ)، `w/` (with)، `w/o` (without)، `b/c` (because)، `≈`، `#` (عدد)، `?` (مش متأكد)، `!` (مهم)، وأسماء الناس بحروفهم الأولى. وبعد الاجتماع على طول اكتبها كاملة قبل ما تنسى.', 'Speech is faster than writing. Use: `→` (leads to), `w/` (with), `w/o` (without), `b/c` (because), `≈`, `#` (number), `?` (not sure), `!` (important), and people’s initials. Right after the meeting, write them out in full before you forget.'),
          'SA: deploy Thu b/c QA needs Wed ! · cost ≈ $40/mo · ? who owns alerts'),
        L(B('ملخص الاجتماع', 'The meeting summary'),
          B('ملخص اجتماع مفيد = قرارات + **action points** (مين يعمل إيه وإمتى) + أسئلة مفتوحة. ابعته في نفس اليوم: «Here’s a quick summary of today’s call. Please correct me if I missed anything.»', 'A useful meeting summary = decisions + **action points** (who does what by when) + open questions. Send it the same day: «Here’s a quick summary of today’s call. Please correct me if I missed anything.»'),
          'Decisions: ship Thursday.\nAction points: Sara — QA by Wed · Omar — alerts by Fri\nOpen: who pays for the extra server?')
      ],
      practice: [
        B('اسمع حلقة 6 Minute English وعلّم كل signpost.', 'Listen to a 6 Minute English episode and mark every signpost.'),
        B('خد ملاحظات باختصارات لفيديو 10 دقايق وبعدين اكتبها كاملة.', 'Take abbreviated notes on a 10-minute video, then write them out in full.'),
        B('اكتب ملخص اجتماع حقيقي أو متخيل بالشكل ده.', 'Write a summary of a real or imagined meeting in this format.'),
        B('اكتب جملة إرسال الملخص بـ 3 صيغ.', 'Write the «sending the summary» line in 3 ways.')
      ],
      words: [
        W('to sum up', 'باختصار / للتلخيص', 'to summarise', 'To sum up, we ship on Thursday.'),
        W('the bottom line', 'الخلاصة المهمة', 'the most important conclusion', 'The bottom line is cost.'),
        W('the main point', 'النقطة الأساسية', 'the central idea', 'The main point is that tests must pass.'),
        W('key point', 'نقطة مهمة', 'an important point', 'Write down each key point.'),
        W('action point', 'مهمة محددة لشخص بميعاد', 'a specific task for a person with a date', 'Each action point has an owner.')
      ],
      read: ['lib:6 Minute English (BBC)', { lib: 'TED Talks', what: B('اختار talk وطلّع الـ signposts.', 'Pick a talk and find its signposts.') }],
      challenge: B('اسمع talk 15 دقيقة، خد ملاحظات باختصارات، واكتب: one-liner، و5 key points، ونقطة واحدة هتطبقها — وسجّل نفسك وانت بتحكي الملخص في دقيقة.', 'Listen to a 15-minute talk, take abbreviated notes, and write: a one-liner, 5 key points and one thing you will apply — then record yourself telling the summary in one minute.'),
      quiz: [
        Q(B('لما تسمع «the bottom line is…»:', 'When you hear «the bottom line is…»:'), ['write what follows', 'stop listening', 'it is a joke'], 0, B('نقطة مهمة.', 'An important point.')),
        Q(B('`b/c` معناها:', '`b/c` means:'), ['because', 'before class', 'back-end code'], 0, B('اختصار.', 'An abbreviation.')),
        Q(B('ملخص اجتماع لازم فيه:', 'A meeting summary must include:'), ['decisions and action points with owners', 'every word said', 'only the date'], 0, B('مين يعمل إيه.', 'Who does what.'))
      ] },

    { title: B('إعادة الصياغة من غير ما يضيع المعنى', 'Rewording without losing meaning'),
      goal: B('تكتب فكرة حد بأسلوبك بدقة وأمانة.', 'Write someone’s idea in your style accurately and honestly.'),
      learn: [
        L(B('أدوات إعادة الصياغة', 'Rewording tools'),
          B('**reword** باستخدام: **synonym** (كلمة بمعنى قريب)، تغيير ترتيب الجملة (**restructure**)، تحويل active/passive، أو تحويل فعل لاسم (**nominalisation**): «we decided» ← «the decision». استخدم أكتر من أداة، مش بس بدّل الكلمات.', 'To **reword**, use: a **synonym** (a word with a close meaning), changing the sentence order (**restructure**), switching active/passive, or turning a verb into a noun (**nominalisation**): «we decided» → «the decision». Use more than one tool, not just word swaps.'),
          'original: "Retries without jitter can overload a recovering service."\nreworded: "If every client retries at the same moment, a service that is just recovering may be overwhelmed again."'),
        L(B('خلّي بالك من المعنى', 'Watch the meaning'),
          B('المرادفات مش متطابقة: «may» مش «will»، «often» مش «always»، «reduce» مش «remove». أخطر حاجة في إعادة الصياغة إنك تقوّي أو تضعّف الادعاء. قارن الأصل وكتابتك جملة جملة.', 'Synonyms are not identical: «may» is not «will», «often» is not «always», «reduce» is not «remove». The biggest danger in rewording is making a claim stronger or weaker. Compare the original and your version sentence by sentence.'),
          '✗ "Caching may reduce latency" → "Caching removes latency"\n✓ "Caching can lower latency in some cases"'),
        L(B('الـ nominalisation بحذر', 'Nominalisation with care'),
          B('تحويل الأفعال لأسماء بيخلي الكتابة رسمية: «We implemented the change» ← «The implementation of the change». مفيد في التقارير، بس الإفراط بيخلي النص تقيل. في الإيميلات العادية خلّيك بالأفعال.', 'Turning verbs into nouns makes writing formal: «We implemented the change» → «The implementation of the change». Useful in reports, but overuse makes text heavy. In everyday emails stick to verbs.'),
          'heavy: "The investigation of the failure led to the identification of the cause."\nclear: "We investigated the failure and found the cause."')
      ],
      practice: [
        B('أعد صياغة 8 جمل من مقالات بأداتين على الأقل لكل جملة.', 'Reword 8 sentences from articles using at least two tools each.'),
        B('قارن كل جملة بالأصل: المعنى اتغيّر؟', 'Compare each with the original: did the meaning change?'),
        B('اكتب 5 أزواج مرادفات مش متطابقة (may/will…).', 'Write 5 synonym pairs that are not identical (may/will…).'),
        B('حوّل فقرة تقيلة بالأسماء لفقرة بأفعال.', 'Turn a heavy noun-based paragraph into one with verbs.')
      ],
      words: [
        W('reword', 'تعيد الكتابة بكلام تاني', 'to write again in other words', 'Reword the sentence for beginners.'),
        W('synonym', 'كلمة بمعنى قريب', 'a word with a similar meaning', '«Fix» is a synonym for «repair».'),
        W('restructure', 'تغيّر ترتيب وبناء الجملة', 'to change a sentence’s order and build', 'Restructure the sentence to start with the result.'),
        W('nominalisation', 'تحويل فعل لاسم', 'turning a verb into a noun', '«Decision» is a nominalisation of «decide».'),
        W('shift in meaning', 'تغيير غير مقصود في المعنى', 'an unintended change of meaning', 'Check for any shift in meaning.')
      ],
      read: ['lib:Purdue OWL', { lib: 'Power Thesaurus', what: B('دوّر على مرادفات واقرا الأمثلة قبل ما تستخدم.', 'Look up synonyms and read the examples before using them.') }],
      challenge: B('خد فقرة 150 كلمة من ورقة أو توثيق، وأعد صياغتها لجمهورين: مبتدئين (بسيطة) ومدير (رسمية قصيرة) — من غير ما يتغيّر أي ادعاء.', 'Take a 150-word paragraph from a paper or docs and reword it for two audiences: beginners (simple) and a manager (short, formal) — without changing any claim.'),
      quiz: [
        Q(B('«may reduce» ← أحسن إعادة صياغة:', '«may reduce» → the best rewording:'), ['«can lower in some cases»', '«always removes»', '«will eliminate»'], 0, B('نفس القوة.', 'Same strength.')),
        Q(B('nominalisation:', 'Nominalisation is:'), ['turning a verb into a noun', 'adding names', 'translating'], 0, B('decide → decision.', 'decide → decision.')),
        Q(B('أخطر حاجة في إعادة الصياغة:', 'The biggest danger in rewording:'), ['changing the strength of a claim', 'using synonyms', 'shorter sentences'], 0, B('shift in meaning.', 'A shift in meaning.'))
      ] },

    { title: B('قاعدة المعرفة الشخصية', 'A personal knowledge base'),
      goal: B('تبني نظام بيخلّي اللي اتعلمته يفضل ويتلاقي.', 'Build a system that keeps what you learn and lets you find it.'),
      learn: [
        L(B('مكان واحد', 'One place'),
          B('**knowledge base** شخصي: ملاحظاتك وملخصاتك وقراءاتك في مكان واحد بتدوّر فيه (Obsidian، Notion، أو ملفات Markdown في Git). كل ملاحظة ليها **tag** (`#rag`، `#english/grammar`)، ومصدر، وتاريخ.', 'A personal **knowledge base**: your notes, summaries and reading in one searchable place (Obsidian, Notion, or Markdown files in Git). Each note has a **tag** (`#rag`, `#english/grammar`), a source and a date.'),
          'notes/\n  retries-need-jitter.md   #reliability\n  rfc-2119-keywords.md     #english/specs\n  reading-log.md'),
        L(B('الروابط', 'Links'),
          B('الملاحظة اللوحدها بتتنسي. اربطها: `[[Exponential backoff]]` جوه ملاحظة الـ jitter، والأدوات بتعمل **backlink** تلقائي (بتوريك مين بيشاور على الملاحظة). مع الوقت بتتكوّن خريطة لمعرفتك.', 'An isolated note gets forgotten. Link it: `[[Exponential backoff]]` inside the jitter note, and tools create a **backlink** automatically (showing which notes point to it). Over time a map of your knowledge forms.'),
          'retries-need-jitter.md → links to [[exponential-backoff]], [[circuit-breaker]]\nexponential-backoff.md ← backlinks: retries-need-jitter, stripe-webhooks'),
        L(B('المراجعة المنتظمة', 'Regular review'),
          B('**review session** أسبوعية 20 دقيقة: اقرا ملاحظات الأسبوع، صحّح وكمّل، حوّل الكلمات الجديدة لبطاقات Anki، واكتب ملاحظة «ماذا تعلمت هذا الأسبوع» بالإنجليزي. ده بيحوّل القراءة لمعرفة.', 'A weekly 20-minute **review session**: read the week’s notes, fix and complete them, turn new words into Anki cards, and write a «what I learnt this week» note in English. This turns reading into knowledge.'),
          'Sunday 20 min: review 15 notes · 8 new Anki cards · weekly-2026-40.md')
      ],
      practice: [
        B('اعمل هيكل فولدرات وtags لقاعدة معرفتك.', 'Create a folder and tag structure for your knowledge base.'),
        B('انقل ملاحظات الأسبوع واربطها.', 'Move this week’s notes in and link them.'),
        B('حوّل 10 كلمات جديدة لبطاقات Anki.', 'Turn 10 new words into Anki cards.'),
        B('اكتب ملاحظة «What I learnt this week».', 'Write a «What I learnt this week» note.')
      ],
      words: [
        W('knowledge base', 'مكان منظم لكل معرفتك', 'an organised place for all your knowledge', 'Search your knowledge base first.'),
        W('tag', 'وسم بيصنّف الملاحظة', 'a label that classifies a note', 'Add the tag #rag.'),
        W('backlink', 'رابط راجع بيوريك مين بيشاور على الملاحظة', 'a reverse link showing which notes point to this one', 'The backlinks show related ideas.'),
        W('review session', 'وقت ثابت لمراجعة الملاحظات', 'a set time to go over your notes', 'My review session is on Sunday.'),
        W('reading log', 'سجل باللي قريته وخلاصته', 'a record of what you read and its takeaway', 'Add the article to the reading log.')
      ],
      read: ['lib:Anki', { lib: 'Markdown Guide', what: B('اتعلم العناوين والقوايم واللينكات.', 'Learn headings, lists and links.') }],
      challenge: B('خلّي قاعدة المعرفة شغالة: 25 ملاحظة مترابطة من الشهر، reading log، 30 بطاقة Anki، وأول review session موثقة.', 'Get your knowledge base running: 25 linked notes from this month, a reading log, 30 Anki cards and a documented first review session.'),
      quiz: [
        Q(B('backlink بيوريك:', 'A backlink shows:'), ['which notes point to this note', 'the note’s size', 'the author'], 0, B('روابط راجعة.', 'Reverse links.')),
        Q(B('review session أسبوعية بتعمل:', 'A weekly review session:'), ['turns reading into lasting knowledge', 'deletes notes', 'is unnecessary'], 0, B('تثبيت.', 'It consolidates.')),
        Q(B('كل ملاحظة لازم فيها:', 'Every note should have:'), ['a source and a tag', 'a picture', 'Arabic only'], 0, B('للرجوع.', 'To find it again.'))
      ] },

    { title: B('مراجعة الشهر السابع ومشروعه', 'Month 7 review and project'),
      goal: B('قارئ تقني متقدم بيحوّل القراءة لمعرفة مكتوبة.', 'An advanced technical reader who turns reading into written knowledge.'),
      review: [
        B('المواصفات: MUST/SHOULD/MAY، الهيكل، الجمل الطويلة، المفردات الرسمية (أسبوع 25).', 'Specs: MUST/SHOULD/MAY, structure, long sentences, formal vocabulary (week 25).'),
        B('الكود والـ changelogs والـ issues وتاريخ الـ commits (أسبوع 26).', 'Code, changelogs, issues and commit history (week 26).'),
        B('المقالات والأوراق، الادعاء الحذر، الأرقام، والنقد (أسبوع 27).', 'Articles and papers, careful claims, numbers and critique (week 27).'),
        B('الملخصات بأطوالها، كورنيل والملاحظات الذرّية، وتلخيص المسموع.', 'Summaries of each length, Cornell and atomic notes, and summarising speech.'),
        B('إعادة الصياغة الأمينة وقاعدة المعرفة الشخصية.', 'Honest rewording and the personal knowledge base.')
      ],
      project: B('مشروع الشهر السابع: «ملف قراءة تقنية» بالإنجليزي عن موضوع واحد (مثلًا webhooks موثوقة، أو RAG): ورقة متطلبات من مواصفة، تقرير قارئ لمكتبة، مراجعة نقدية لورقة ومقال، ملخصات بالأطوال التلاتة، و25 ملاحظة مترابطة في قاعدة معرفتك — وعرض صوتي 5 دقايق بتلخّص فيه أهم 5 حاجات اتعلمتها.', 'Month 7 project: an English «technical reading file» on one topic (e.g. reliable webhooks, or RAG): a requirements sheet from a spec, a reader’s report on a library, a critical review of a paper and an article, summaries at the three lengths, and 25 linked notes in your knowledge base — plus a 5-minute spoken talk summarising the 5 most important things you learnt.'),
      test: [
        Q(B('«Clients MUST NOT log tokens»:', '«Clients MUST NOT log tokens»:'), ['logging tokens is forbidden', 'logging tokens is optional', 'logging tokens is recommended'], 0, B('ممنوع.', 'Forbidden.')),
        Q(B('normative text:', 'Normative text:'), ['contains requirements', 'is only an example', 'is the title'], 0, B('ملزم.', 'Binding.')),
        Q(B('«the latter» بيشير للـ:', '«the latter» refers to:'), ['second of two', 'first of two', 'last chapter'], 0, B('التاني.', 'The second.')),
        Q(B('«PRs welcome»:', '«PRs welcome»:'), ['you may contribute a fix', 'the issue is fixed', 'the project is closed'], 0, B('ساهم.', 'Contribute.')),
        Q(B('`chore:` commit:', 'A `chore:` commit:'), ['maintenance work', 'a new feature', 'a security fix only'], 0, B('صيانة.', 'Maintenance.')),
        Q(B('«Our results suggest…»:', '«Our results suggest…»:'), ['there is an indication, not proof', 'it is proven', 'it is false'], 0, B('حذر.', 'Cautious.')),
        Q(B('20% → 25%:', '20% → 25%:'), ['5 percentage points up', '5% relative up', '25 points up'], 0, B('نقط.', 'Points.')),
        Q(B('executive summary لـ:', 'An executive summary is for:'), ['a busy decision-maker', 'a compiler', 'a translator'], 0, B('قصير.', 'Short.')),
        Q(B('Cornell notes فيها:', 'Cornell notes have:'), ['cues, notes and a summary', 'only drawings', 'only quotes'], 0, B('3 أجزاء.', 'Three parts.')),
        Q(B('action point لازم فيه:', 'An action point must have:'), ['an owner and a date', 'a joke', 'a link only'], 0, B('مين وإمتى.', 'Who and when.')),
        Q(B('إعادة صياغة غلط:', 'A wrong rewording:'), ['«may help» → «always fixes»', '«may help» → «can help»', '«may help» → «might help»'], 0, B('قوّى الادعاء.', 'It strengthened the claim.')),
        Q(B('atomic note:', 'An atomic note:'), ['one idea, own words, with a source', 'a whole chapter copied', 'a random list'], 0, B('فكرة واحدة.', 'One idea.'))
      ] }
  ]
};
