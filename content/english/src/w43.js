// English week 43 — Advanced grammar for precision.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1 → C2',
  title: B('قواعد متقدمة للدقة', 'Advanced grammar for precision'),
  goal: B('تستخدم القواعد اللي بتفرّق الكاتب المتمكن: الشرط المختلط والمقلوب، التوكيد بالـ cleft والقلب، الجمل المختصرة، التخلص من الغموض، والإيجاز — عشان تقول اللي تقصده بالظبط في سطور أقل.',
          'Use the grammar that marks a skilled writer: mixed and inverted conditionals, emphasis with cleft sentences and inversion, reduced clauses, removing ambiguity, and concision — so you say exactly what you mean in fewer lines.'),
  days: [
    { title: B('الشرط المتقدم', 'Advanced conditionals'),
      goal: B('تتكلم عن اللي كان ممكن يحصل ونتايجه.', 'Talk about what could have happened and its results.'),
      learn: [
        L(B('الشرط التالت والمختلط', 'Third and mixed conditionals'),
          B('**third conditional** = ماضي مختلف تمامًا ونتيجته في الماضي: If + had done, would have done. **mixed conditional** = ماضي مختلف ونتيجته دلوقتي: If + had done, would do. مفيد جدًا في الـ postmortems.', 'The **third conditional** = an unreal past with a past result: If + had done, would have done. A **mixed conditional** = an unreal past with a present result: If + had done, would do. Very useful in postmortems.'),
          'third: If we had tested the tax codes, the invoices wouldn’t have failed.\nmixed: If we had added monitoring last year, we would know about failures immediately now.\nmixed: If I were more experienced with Kubernetes, I would have chosen it. (present → past)'),
        L(B('الشرط المقلوب', 'Inverted conditionals'),
          B('في الكتابة الرسمية بتشيل «if» وتقلب: «**should you need**…» = If you need (مؤدب جدًا في آخر الإيميلات). «**had we known**…» = If we had known. «**were it not for**…» = If it weren’t for (لولا). ده **inverted conditional** — رسمي وأنيق.', 'In formal writing you drop «if» and invert: «**should you need**…» = If you need (very polite at the end of emails). «**had we known**…» = If we had known. «**were it not for**…» = If it weren’t for. This is an **inverted conditional** — formal and elegant.'),
          'Should you need any further information, please let me know.\nHad we known about the API limit, we would have planned a queue.\nWere it not for the daily backups, we would have lost a week of data.'),
        L(B('اختار الصيغة', 'Choosing the form'),
          B('في السلاك والكلام: if العادية. في العقود والتقارير الرسمية والإيميلات الرسمية: المقلوبة بتدّي وزن. ومتخلطش الأزمنة غلط: ✗ «If we would have tested…» (غلط شائع جدًا).', 'On Slack and in speech: plain if. In contracts, formal reports and formal emails: the inverted form adds weight. And do not mix tenses wrongly: ✗ «If we would have tested…» (a very common error).'),
          '✗ If we would have tested it, it wouldn’t fail.\n✓ If we had tested it, it wouldn’t have failed.\n✓ Had we tested it, it wouldn’t have failed.')
      ],
      practice: [
        B('اكتب 5 جمل third conditional عن مشروع فات.', 'Write 5 third-conditional sentences about a past project.'),
        B('اكتب 3 mixed conditionals عن قرارات قديمة وأثرها النهارده.', 'Write 3 mixed conditionals about old decisions and their effect today.'),
        B('حوّل 5 جمل if لصيغة مقلوبة.', 'Turn 5 if-sentences into inverted forms.'),
        B('صحّح 5 جمل فيها «if … would have».', 'Correct 5 sentences containing «if … would have».')
      ],
      words: [
        W('third conditional', 'الشرط التالت (ماضي غير حقيقي)', 'an unreal past condition', 'Postmortems often use the third conditional.'),
        W('mixed conditional', 'الشرط المختلط', 'a past condition with a present result', 'Use a mixed conditional for lasting effects.'),
        W('inverted conditional', 'شرط مقلوب من غير if', 'a condition without «if» using inversion', '«Should you need help» is an inverted conditional.'),
        W('should you need', 'لو احتجت (رسمي)', 'if you need (formal)', 'Should you need anything, let me know.'),
        W('had we known', 'لو كنا عرفنا', 'if we had known', 'Had we known, we would have waited.'),
        W('were it not for', 'لولا', 'if it weren’t for', 'Were it not for backups, we’d have lost data.')
      ],
      read: [{ lib: 'Perfect English Grammar', what: B('اقرا «mixed conditionals».', 'Read «mixed conditionals».') }],
      challenge: B('اكتب postmortem بالإنجليزي (150 كلمة) لمشكلة حقيقية فيه 3 third conditionals، 2 mixed، و2 inverted — وراجع إن مفيش «if … would have».', 'Write an English postmortem (150 words) about a real problem with 3 third conditionals, 2 mixed and 2 inverted — and check that there is no «if … would have».'),
      quiz: [
        Q(B('الصح:', 'Correct:'), ['If we had tested it, it wouldn’t have failed.', 'If we would have tested it, it wouldn’t fail.', 'If we tested it, it wouldn’t have fail.'], 0, B('had + would have.', 'had + would have.')),
        Q(B('«Should you need help» يعني:', '«Should you need help» means:'), ['If you need help', 'You must need help', 'You should help'], 0, B('مقلوب.', 'Inverted.')),
        Q(B('mixed conditional:', 'A mixed conditional:'), ['If we had added monitoring, we would know now.', 'If it rains, we stay.', 'If I go, I will call.'], 0, B('ماضي ← حاضر.', 'Past → present.'))
      ] },

    { title: B('التوكيد', 'Emphasis'),
      goal: B('تبرز المعلومة المهمة بالقواعد مش بالخط العريض.', 'Highlight key information with grammar, not bold text.'),
      learn: [
        L(B('جمل الـ cleft', 'Cleft sentences'),
          B('**cleft sentence** بتقسّم الجملة عشان تركّز على جزء: «It was the date format that broke the import» (مش حاجة تانية). «What we need is a queue» (ده بالظبط المطلوب). مفيدة لتصحيح سوء فهم.', 'A **cleft sentence** splits a sentence to focus on one part: «It was the date format that broke the import» (not something else). «What we need is a queue» (exactly that). Useful for correcting a misunderstanding.'),
          'neutral:  The date format broke the import.\nit-cleft: It was the date format that broke the import, not the API.\nwhat-cleft: What we need isn’t more servers — what we need is a queue.\nall-cleft: All I’m asking for is a test environment.'),
        L(B('القلب بعد النفي', 'Inversion after negatives'),
          B('**inversion** بعد ظرف نفي أو تقييد في أول الجملة (رسمي وقوي): «**not only** … but also»، «**under no circumstances**»، «**no sooner** … than»، «**seldom**/rarely». الفعل المساعد بييجي قبل الفاعل زي السؤال.', '**inversion** after a negative or limiting adverbial at the start of a sentence (formal and strong): «**not only** … but also», «**under no circumstances**», «**no sooner** … than», «**seldom**/rarely». The auxiliary comes before the subject, as in a question.'),
          'Not only does the workflow save time, but it also reduces errors.\nUnder no circumstances should API keys be stored in the workflow.\nNo sooner had we launched than the first order arrived.\nSeldom have we seen such a clean migration.'),
        L(B('do التوكيدية', 'The emphatic do'),
          B('**emphatic do** = do/does/did قبل الفعل الأساسي في جملة مثبتة عشان تأكد أو ترد على شك: «I did test it» (فعلًا اختبرته)، «We do support Arabic». بتتنطق بضغط على do.', 'The **emphatic do** = do/does/did before the main verb in a positive sentence to insist or answer a doubt: «I did test it» (I really tested it), «We do support Arabic». It is spoken with stress on do.'),
          'Client: "Did you even test the import?"\nYou:    "I did test it — with 200 sample rows. The issue only appears with dates before 2000."\n"We don’t offer phone support, but we do reply to emails within four hours."')
      ],
      practice: [
        B('حوّل 5 جمل عادية لـ it-cleft وwhat-cleft.', 'Turn 5 plain sentences into it-clefts and what-clefts.'),
        B('اكتب 4 جمل inversion رسمية.', 'Write 4 formal inversion sentences.'),
        B('رد على 3 شكوك بـ emphatic do.', 'Answer 3 doubts with the emphatic do.'),
        B('قول جمل الـ emphatic do بصوت عالي بالضغط الصح.', 'Say the emphatic-do sentences aloud with the right stress.')
      ],
      words: [
        W('cleft sentence', 'جملة توكيد مقسومة', 'a sentence split to focus one part', '«It was X that…» is a cleft sentence.'),
        W('inversion', 'قلب ترتيب الفاعل والفعل', 'putting the verb before the subject', 'Inversion makes the warning stronger.'),
        W('not only', 'مش بس', 'not just', 'Not only is it faster, it’s cheaper.'),
        W('under no circumstances', 'تحت أي ظرف لأ', 'never, in any situation', 'Under no circumstances share the key.'),
        W('no sooner', 'ما إن', 'immediately after', 'No sooner had we launched than it broke.'),
        W('seldom', 'نادرًا', 'rarely', 'Seldom do clients read the terms.'),
        W('emphatic do', 'do للتوكيد', 'do used to stress a verb', '«I did send it» uses the emphatic do.')
      ],
      read: [{ lib: 'British Council LearnEnglish', what: B('دوّر على «cleft sentences» و«inversion».', 'Search for «cleft sentences» and «inversion».') }],
      challenge: B('اكتب «سياسة أمان» قصيرة بالإنجليزي (8 قواعد) بالـ inversion والـ cleft — وإيميل بيصحح سوء فهم عميل بـ it-cleft وemphatic do.', 'Write a short English «security policy» (8 rules) using inversion and clefts — and an email correcting a client’s misunderstanding with an it-cleft and the emphatic do.'),
      quiz: [
        Q(B('الصح:', 'Correct:'), ['Under no circumstances should keys be shared.', 'Under no circumstances keys should be shared.', 'Under no circumstances shared keys.'], 0, B('قلب.', 'Inversion.')),
        Q(B('it-cleft:', 'An it-cleft:'), ['It was the date format that broke it.', 'The date format broke it.', 'Date format, broken.'], 0, B('تركيز.', 'Focus.')),
        Q(B('emphatic do:', 'Emphatic do:'), ['I did test it.', 'I tested it.', 'I do testing.'], 0, B('تأكيد.', 'Insistence.'))
      ] },

    { title: B('جمل أقصر وأدق', 'Shorter, tighter clauses'),
      goal: B('تختصر الجمل من غير ما تخسر المعنى.', 'Shorten sentences without losing meaning.'),
      learn: [
        L(B('الـ participle clauses', 'Participle clauses'),
          B('**participle clause** بتختصر جملتين بفاعل واحد: «After we checked the logs, we found…» ← «Having checked the logs, we found…». «-ing» لنفس الوقت أو السبب، «having + p.p.» لحاجة خلصت قبل، و«p.p.» للمبني للمجهول.', 'A **participle clause** shortens two clauses with the same subject: «After we checked the logs, we found…» → «Having checked the logs, we found…». «-ing» for the same time or a reason, «having + past participle» for something completed before, and a «past participle» for passive meaning.'),
          'Using a queue, the workflow handles 500 orders a minute.\nHaving reviewed the contract, we suggest two changes.\nWritten in TypeScript, the node is easy to maintain.'),
        L(B('اختصار الـ relative clause', 'Reduced relative clauses'),
          B('**reduced relative clause** = تشيل who/which/that + be: «the orders that were created yesterday» ← «the orders created yesterday»، «the client who is waiting» ← «the client waiting». أقصر وأنضف في التقارير.', 'A **reduced relative clause** = drop who/which/that + be: «the orders that were created yesterday» → «the orders created yesterday», «the client who is waiting» → «the client waiting». Shorter and cleaner in reports.'),
          'the files which are stored in Drive  → the files stored in Drive\nthe workflow that is running now       → the workflow running now\nusers who have admin rights             → users with admin rights'),
        L(B('المقيّدة وغير المقيّدة', 'Restrictive and non-restrictive'),
          B('**restrictive clause** بتحدد أنهي واحد (من غير فواصل، و that مقبولة): «The workflows that failed were retried» (بس اللي فشلوا). **non-restrictive clause** معلومة زيادة (بفواصل، وwhich مش that): «The workflows, which failed, were retried» (كلهم فشلوا). الفاصلة بتغيّر المعنى! و**ellipsis** = تشيل كلام مفهوم: «Some tests passed; others didn’t.»', 'A **restrictive clause** identifies which one (no commas, that is fine): «The workflows that failed were retried» (only the failed ones). A **non-restrictive clause** adds extra information (commas, which not that): «The workflows, which failed, were retried» (all of them failed). The comma changes the meaning! And **ellipsis** = leaving out understood words: «Some tests passed; others didn’t.»'),
          'restrictive:     Clients who pay annually get a discount. (only those)\nnon-restrictive: Our clients, who pay annually, get a discount. (all clients pay annually)\nellipsis:        Omar can deploy on Sunday, and Sara on Monday.')
      ],
      practice: [
        B('اختصر 5 أزواج جمل بـ participle clauses.', 'Combine 5 pairs of sentences with participle clauses.'),
        B('اختصر 5 relative clauses.', 'Reduce 5 relative clauses.'),
        B('اكتب نفس الجملة restrictive وnon-restrictive واشرح الفرق.', 'Write the same sentence as restrictive and non-restrictive and explain the difference.'),
        B('اختصر فقرة من تقرير بالـ ellipsis.', 'Shorten a report paragraph with ellipsis.')
      ],
      words: [
        W('participle clause', 'جملة بالـ participle', 'a clause built on -ing or -ed forms', 'Start with a participle clause: Having tested it, …'),
        W('reduced relative clause', 'جملة وصل مختصرة', 'a relative clause without who/which + be', '«The files stored in Drive» is a reduced relative clause.'),
        W('restrictive clause', 'جملة وصل بتحدد', 'a clause identifying which one', 'A restrictive clause takes no commas.'),
        W('non-restrictive clause', 'جملة وصل لمعلومة زيادة', 'a clause adding extra information', 'Use commas around a non-restrictive clause.'),
        W('ellipsis', 'حذف كلام مفهوم', 'leaving out understood words', 'Ellipsis makes lists shorter.')
      ],
      read: [{ lib: 'Grammar Monster', what: B('دوّر على «restrictive and non-restrictive clauses».', 'Search for «restrictive and non-restrictive clauses».') }],
      challenge: B('خد تقرير أو README كتبته بالإنجليزي واختصره 25% بالأدوات دي من غير ما يضيع معنى — واحسب عدد الكلمات قبل وبعد.', 'Take a report or README you wrote in English and shorten it by 25% with these tools without losing meaning — and count the words before and after.'),
      quiz: [
        Q(B('اختصار صح:', 'A correct reduction:'), ['the orders created yesterday', 'the orders were created yesterday', 'the orders which created yesterday'], 0, B('شيل which were.', 'Drop «which were».')),
        Q(B('«Our clients, who pay annually, get a discount»:', '«Our clients, who pay annually, get a discount»:'), ['all clients pay annually', 'only some clients', 'no clients'], 0, B('الفاصلة.', 'The commas.')),
        Q(B('participle clause صح:', 'A correct participle clause:'), ['Having reviewed the contract, we suggest two changes.', 'Having reviewed the contract, two changes are suggested by us.', 'Reviewed the contract, we suggest.'], 0, B('نفس الفاعل.', 'Same subject.'))
      ] },

    { title: B('التخلص من الغموض', 'Removing ambiguity'),
      goal: B('جمل ليها معنى واحد بس.', 'Sentences with only one meaning.'),
      learn: [
        L(B('الوصف في المكان الغلط', 'Misplaced and dangling modifiers'),
          B('**misplaced modifier** = وصف بعيد عن اللي بيوصفه: «We only tested the import» (اختبرنا بس؟) ↔ «We tested only the import». **dangling modifier** = participle مالوش فاعل في الجملة: ✗ «Having finished the update, the server restarted» (السيرفر خلّص؟).', 'A **misplaced modifier** = a description far from what it describes: «We only tested the import» (we just tested?) ↔ «We tested only the import». A **dangling modifier** = a participle with no subject in the sentence: ✗ «Having finished the update, the server restarted» (the server finished?).'),
          '✗ Having finished the update, the server restarted.\n✓ Having finished the update, I restarted the server.\n✗ The client sent a file to the developer with errors. (who had errors?)\n✓ The client sent a file with errors to the developer.'),
        L(B('الضماير الغامضة', 'Unclear pronouns'),
          B('**ambiguity** كتير بييجي من ضمير مش واضح بيرجع لمين: الـ **antecedent** (الاسم اللي الضمير بيرجعله) لازم يبقى واضح. «When the workflow calls the API, it fails» — مين اللي فشل؟ كرر الاسم.', '**ambiguity** often comes from a pronoun whose reference is unclear: the **antecedent** (the noun a pronoun refers to) must be clear. «When the workflow calls the API, it fails» — which one fails? Repeat the noun.'),
          '✗ When the workflow calls the API, it fails.\n✓ When the workflow calls the API, the API returns an error.\n✗ Omar told Karim that his invoice was wrong.\n✓ Omar told Karim, “Your invoice is wrong.”'),
        L(B('التوازي', 'Parallelism'),
          B('**parallelism** = العناصر في القايمة أو المقارنة تبقى بنفس الشكل النحوي. ✗ «The workflow validates data, sending emails, and logs errors». ✓ «validates data, sends emails, and logs errors». مهم جدًا في القوايم النقطية والـ requirements.', '**parallelism** = items in a list or comparison take the same grammatical form. ✗ «The workflow validates data, sending emails, and logs errors». ✓ «validates data, sends emails, and logs errors». Very important in bullet lists and requirements.'),
          '✗ Responsibilities:\n  - Building workflows\n  - Client communication\n  - To write documentation\n✓ Responsibilities:\n  - Building workflows\n  - Communicating with clients\n  - Writing documentation')
      ],
      practice: [
        B('صحّح 5 misplaced/dangling modifiers.', 'Fix 5 misplaced/dangling modifiers.'),
        B('صحّح 5 جمل بضماير غامضة.', 'Fix 5 sentences with unclear pronouns.'),
        B('ظبّط التوازي في 3 قوايم.', 'Fix the parallelism in 3 lists.'),
        B('راجع CV أو README بتاعك للتوازي.', 'Check your CV or README for parallelism.')
      ],
      words: [
        W('ambiguity', 'غموض / أكتر من معنى', 'having more than one meaning', 'Remove ambiguity from requirements.'),
        W('antecedent', 'الاسم اللي الضمير بيرجعله', 'the noun a pronoun refers to', '«It» has an unclear antecedent here.'),
        W('misplaced modifier', 'وصف في مكان غلط', 'a description in the wrong place', '«Only» is often a misplaced modifier.'),
        W('dangling modifier', 'وصف مالوش صاحب', 'a modifier with no clear subject', 'Fix the dangling modifier in line 3.'),
        W('parallelism', 'التوازي النحوي', 'using the same grammatical form', 'Bullet lists need parallelism.')
      ],
      read: [{ lib: 'Purdue OWL', what: B('دوّر على «dangling modifiers» و«parallel structure».', 'Search for «dangling modifiers» and «parallel structure».') }],
      challenge: B('اكتب 10 requirements بالإنجليزي لمشروع automation: من غير ضمير غامض، ولا modifier في مكان غلط، وبتوازي كامل — وادّيهم لحد يحاول يلاقي أي جملة ليها معنيين.', 'Write 10 English requirements for an automation project: no unclear pronouns, no misplaced modifiers, and full parallelism — and give them to someone to find any sentence with two meanings.'),
      quiz: [
        Q(B('dangling modifier:', 'A dangling modifier:'), ['Having finished the update, the server restarted.', 'Having finished the update, I restarted the server.', 'After the update, I restarted it.'], 0, B('مين خلّص؟', 'Who finished?')),
        Q(B('توازي صح:', 'Correct parallelism:'), ['validates data, sends emails, and logs errors', 'validates data, sending emails, and to log errors', 'validation, sends, logging'], 0, B('نفس الشكل.', 'Same form.')),
        Q(B('antecedent:', 'An antecedent:'), ['the noun a pronoun refers to', 'an old rule', 'a verb'], 0, B('مرجع.', 'Reference.'))
      ] },

    { title: B('الربط الدقيق والإيجاز', 'Precise linking and concision'),
      goal: B('روابط رسمية دقيقة وجمل من غير حشو.', 'Precise formal linkers and sentences without padding.'),
      learn: [
        L(B('روابط دقيقة', 'Precise linkers'),
          B('«**albeit**» = وإن كان (مع صفة أو عبارة قصيرة): «a faster, albeit more expensive, option». «**insofar as**» = بقدر ما: «insofar as the data allows». «**in that**» = من حيث إن: «The plan is risky in that it depends on one supplier».', '«**albeit**» = although (with an adjective or short phrase): «a faster, albeit more expensive, option». «**insofar as**» = to the extent that: «insofar as the data allows». «**in that**» = because, in the sense that: «The plan is risky in that it depends on one supplier».'),
          'Option B is faster, albeit more expensive.\nWe can guarantee uptime only insofar as the hosting provider meets its SLA.\nThe migration is complex in that both systems must run in parallel for a month.'),
        L(B('الـ subjunctive', 'The subjunctive'),
          B('**subjunctive** بعد recommend/suggest/insist/require/essential that: الفعل في صيغته الأصلية من غير s ولا to: «We recommend that the client **enable** two-factor authentication». «It is essential that every key **be** rotated». رسمي جدًا وشائع في التقارير والعقود الأمريكية.', 'The **subjunctive** after recommend/suggest/insist/require/essential that: the base verb, with no s and no to: «We recommend that the client **enable** two-factor authentication». «It is essential that every key **be** rotated». Very formal and common in American reports and contracts.'),
          '✓ We recommend that the client enable 2FA.\n✓ It is essential that each environment be isolated.\n✗ We recommend that the client enables 2FA. (common in British English, less formal)\n✗ We recommend the client to enable 2FA.'),
        L(B('الإيجاز', 'Concision'),
          B('**concision** = تقول المعنى بأقل كلمات. شيل **redundancy** (تكرار: «past history»، «end result»، «completely finished») و**wordiness** (حشو: «due to the fact that» ← because، «at this point in time» ← now، «in order to» ← to).', '**concision** = expressing the meaning in the fewest words. Remove **redundancy** (repetition: «past history», «end result», «completely finished») and **wordiness** (padding: «due to the fact that» → because, «at this point in time» → now, «in order to» → to).'),
          'wordy → concise\ndue to the fact that           → because\nat this point in time           → now\nin order to                     → to\nmake a decision regarding       → decide on\nthe end result                  → the result\nit is important to note that…   → (delete)')
      ],
      practice: [
        B('اكتب جملة بكل رابط: albeit, insofar as, in that.', 'Write a sentence with each linker: albeit, insofar as, in that.'),
        B('اكتب 5 توصيات بالـ subjunctive.', 'Write 5 recommendations using the subjunctive.'),
        B('شيل الحشو من 10 عبارات.', 'Remove the padding from 10 phrases.'),
        B('اختصر إيميل طويل للنص.', 'Cut a long email in half.')
      ],
      words: [
        W('albeit', 'وإن كان', 'although', 'A faster, albeit costlier, option.'),
        W('insofar as', 'بقدر ما', 'to the extent that', 'Insofar as the data allows, we will report weekly.'),
        W('in that', 'من حيث إن', 'because, in the sense that', 'It is risky in that it has one supplier.'),
        W('subjunctive', 'صيغة الطلب الرسمي', 'the base verb after «recommend that» etc.', 'Use the subjunctive: we recommend that he be told.'),
        W('concision', 'الإيجاز', 'saying things in few words', 'Concision respects the reader’s time.'),
        W('redundancy', 'تكرار زيادة', 'unnecessary repetition', '«End result» is a redundancy.'),
        W('wordiness', 'حشو', 'using too many words', 'Cut the wordiness from the introduction.')
      ],
      read: [{ lib: 'Plain Language Guidelines', what: B('دوّر على «omit unnecessary words».', 'Search for «omit unnecessary words».') }],
      challenge: B('اكتب «تقرير توصيات» رسمي بالإنجليزي (200 كلمة) لعميل: 4 توصيات بالـ subjunctive، روابط دقيقة (albeit, insofar as, in that)، ومن غير ولا عبارة حشو — وبعدين اختصره لـ 120 كلمة.', 'Write a formal English «recommendations report» (200 words) for a client: 4 recommendations using the subjunctive, precise linkers (albeit, insofar as, in that), and no padding phrases — then cut it to 120 words.'),
      quiz: [
        Q(B('subjunctive صح:', 'A correct subjunctive:'), ['We recommend that the client enable 2FA.', 'We recommend the client to enable 2FA.', 'We recommend that the client enabling 2FA.'], 0, B('الصيغة الأصلية.', 'The base form.')),
        Q(B('albeit:', 'Albeit:'), ['although', 'because', 'therefore'], 0, B('وإن كان.', 'Although.')),
        Q(B('مختصر «due to the fact that»:', 'A concise form of «due to the fact that»:'), ['because', 'owing to the reason that', 'for the purpose of'], 0, B('إيجاز.', 'Concision.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('القواعد بقت أداة دقة مش خوف.', 'Grammar is now a precision tool, not a fear.'),
      review: [
        B('الشرط التالت والمختلط والمقلوب.', 'Third, mixed and inverted conditionals.'),
        B('التوكيد: cleft والقلب بعد النفي وdo التوكيدية.', 'Emphasis: clefts, inversion after negatives and the emphatic do.'),
        B('participle clauses والـ relative clauses المختصرة والمقيدة وغير المقيدة.', 'Participle clauses, reduced relative clauses, restrictive and non-restrictive.'),
        B('الغموض: modifiers والضماير والتوازي.', 'Ambiguity: modifiers, pronouns and parallelism.'),
        B('الروابط الدقيقة والـ subjunctive والإيجاز.', 'Precise linkers, the subjunctive and concision.')
      ],
      project: B('خد 3 مستندات إنجليزي كتبتها في الرحلة (تقرير، مقترح، README) وعدّلها «تعديل محرر»: صحّح الشرط والضماير والتوازي، ضيف توكيد في المكان الصح، اختصر 20% على الأقل، واكتب سجل تغييرات بكل قاعدة استخدمتها.', 'Take 3 English documents you wrote during the journey (a report, a proposal, a README) and give them an «editor’s edit»: fix conditionals, pronouns and parallelism, add emphasis in the right places, cut at least 20%, and write a change log naming each rule you used.'),
      test: [
        Q(B('third conditional صح:', 'A correct third conditional:'), ['If we had planned, we would have finished.', 'If we planned, we would have finish.', 'If we would plan, we had finished.'], 0, B('had + would have.', 'had + would have.')),
        Q(B('«Had we known…» يعني:', '«Had we known…» means:'), ['If we had known…', 'We knew…', 'We have known…'], 0, B('مقلوب.', 'Inverted.')),
        Q(B('«Were it not for the backups…»:', '«Were it not for the backups…»:'), ['If it weren’t for the backups…', 'The backups were not…', 'We had no backups.'], 0, B('لولا.', 'If it weren’t for.')),
        Q(B('inversion صح:', 'Correct inversion:'), ['Not only does it save time, but it also…', 'Not only it saves time, but…', 'Not only saving time…'], 0, B('does قبل الفاعل.', '«does» before the subject.')),
        Q(B('what-cleft:', 'A what-cleft:'), ['What we need is a queue.', 'We need a queue.', 'A queue is needed.'], 0, B('تركيز.', 'Focus.')),
        Q(B('reduced relative:', 'A reduced relative clause:'), ['the workflow running now', 'the workflow which running now', 'the workflow is running now'], 0, B('شيل which is.', 'Drop «which is».')),
        Q(B('non-restrictive:', 'A non-restrictive clause:'), ['uses commas and «which»', 'uses no commas', 'uses «that» with commas'], 0, B('معلومة زيادة.', 'Extra information.')),
        Q(B('ellipsis:', 'Ellipsis:'), ['Some passed; others didn’t.', 'Some passed; others didn’t pass the tests at all.', 'Some of them passed and some of them did not pass.'], 0, B('حذف.', 'Omission.')),
        Q(B('ضمير غامض:', 'An unclear pronoun:'), ['When the workflow calls the API, it fails.', 'When the workflow calls the API, the API fails.', 'The API fails.'], 0, B('مين؟', 'Which one?')),
        Q(B('misplaced «only»:', 'A misplaced «only»:'), ['We only tested the import. (meaning: nothing else)', 'We tested only the import.', 'Only the import was tested.'], 0, B('مكان only.', 'The position of «only».')),
        Q(B('in that:', 'In that:'), ['because / in the sense that', 'inside that', 'therefore'], 0, B('من حيث إن.', 'In the sense that.')),
        Q(B('redundancy:', 'A redundancy:'), ['end result', 'result', 'outcome'], 0, B('تكرار.', 'Repetition.'))
      ] }
  ]
};
