// English week 42 — Tone, hedging and cultural nuance.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1 → C2',
  title: B('النبرة والتلطيف والفروق الثقافية', 'Tone, hedging and cultural nuance'),
  goal: B('تتحكم في درجة اليقين والقوة في كلامك بالظبط، تقرا اللي بين السطور في الإيميلات، تفهم إن الصراحة بتختلف من ثقافة لثقافة، وتكتب بنبرة دافية ومحترفة من غير ما تبان ضعيف أو حاد.',
          'Control exactly how certain and how strong you sound, read between the lines in emails, understand that directness differs across cultures, and write with a warm, professional tone without sounding weak or harsh.'),
  days: [
    { title: B('درجات اليقين', 'Degrees of certainty'),
      goal: B('تقول قد إيه انت متأكد بالظبط.', 'Say exactly how sure you are.'),
      learn: [
        L(B('سلّم اليقين', 'The certainty scale'),
          B('الإنجليزي بيقيس **likelihood** بكلمات دقيقة: will → will probably → is likely to → may/might → is unlikely to → won’t. اختار الدرجة اللي تعكس الحقيقة: كلام **assertive** زيادة عن اللزوم بيضيّع ثقتهم لو طلع غلط، وكلام **tentative** زيادة بيبان إنك مش فاهم.', 'English measures **likelihood** with precise words: will → will probably → is likely to → may/might → is unlikely to → won’t. Choose the level that reflects reality: being too **assertive** loses trust if you are wrong, and being too **tentative** sounds as if you do not understand.'),
          'certain:     The fix will be live today.\nvery likely: The fix will probably be live today.\nlikely:      The fix is likely to be live today.\npossible:    The fix may be live today, but it depends on Meta’s review.\nunlikely:    It’s unlikely to be live before Monday.'),
        L(B('أدوات التلطيف', 'Hedging tools'),
          B('**qualifier** = كلمة بتحدد مدى كلامك: «in most cases»، «**to some extent**»، «generally». «**tend to**» = عادة («Large files tend to time out»). «**it appears**/seems that» = بناءً على اللي شايفه. «**arguably**» = ممكن نقول (رأي قابل للنقاش). ده مش ضعف — ده دقة علمية.', 'A **qualifier** = a word limiting your claim: «in most cases», «**to some extent**», «generally». «**tend to**» = usually («Large files tend to time out»). «**it appears**/seems that» = based on what I see. «**arguably**» = one could say (a debatable opinion). This is not weakness — it is scientific precision.'),
          '✗ "The API is broken."\n✓ "It appears that the API is rejecting requests with Arabic file names."\n✗ "n8n is the best tool."\n✓ "n8n is arguably the best fit for teams that want to self-host."\n✓ "Retries solve the problem to some extent, but not for invalid data."'),
        L(B('متى تكون حاسم', 'When to be decisive'),
          B('التلطيف الزيادة بيضر: «I think maybe it might possibly be…». في التوصيات والقرارات والأمان: كن واضح وحاسم («I recommend…»، «This must be fixed before launch»). لطّف في التخمينات والآراء، وكن حاسم في الحقايق والتوصيات.', 'Too much hedging hurts: «I think maybe it might possibly be…». In recommendations, decisions and security, be clear and decisive («I recommend…», «This must be fixed before launch»). Hedge guesses and opinions; be decisive on facts and recommendations.'),
          '✗ "I was just thinking maybe we could possibly consider adding a backup?"\n✓ "I recommend adding a daily backup before launch."\n✓ "The cause is probably the date format — I’ll confirm by noon."')
      ],
      practice: [
        B('اكتب نفس التوقع بخمس درجات يقين.', 'Write the same prediction at five levels of certainty.'),
        B('لطّف 5 جمل حاسمة زيادة عن اللزوم.', 'Hedge 5 sentences that are too assertive.'),
        B('شيل التلطيف الزيادة من 5 جمل.', 'Remove the excess hedging from 5 sentences.'),
        B('اكتب توصية حاسمة ومعاها تخمين ملطّف.', 'Write a decisive recommendation with a hedged guess.')
      ],
      words: [
        W('likelihood', 'الاحتمال', 'how probable something is', 'The likelihood of another outage is low.'),
        W('assertive', 'حاسم وواثق', 'confident and direct', 'Be assertive about security risks.'),
        W('tentative', 'متردد / مبدئي', 'not certain or final', 'This is a tentative estimate.'),
        W('qualifier', 'كلمة بتحدد مدى الكلام', 'a word that limits a claim', '«In most cases» is a useful qualifier.'),
        W('to some extent', 'لحد ما', 'partly', 'Caching helps to some extent.'),
        W('tend to', 'عادة بيحصل', 'to usually happen', 'Big files tend to time out.'),
        W('it appears', 'يبدو إن', 'it seems', 'It appears that the token expired.'),
        W('arguably', 'ممكن نقول', 'it could be argued', 'This is arguably the simplest option.')
      ],
      read: [{ lib: 'British Council LearnEnglish', what: B('دوّر على «expressing certainty».', 'Search for «expressing certainty».') }],
      challenge: B('اكتب تقرير تحقيق بالإنجليزي (150 كلمة) عن مشكلة لسه مش متأكد من سببها: الحقايق حاسمة، التخمينات ملطّفة بدرجات صح، وتوصية واحدة واضحة.', 'Write an English investigation report (150 words) about a problem whose cause you are not yet sure of: facts stated decisively, guesses hedged at the right levels, and one clear recommendation.'),
      quiz: [
        Q(B('الأقوى يقينًا:', 'The most certain:'), ['will', 'is likely to', 'might'], 0, B('مؤكد.', 'Certain.')),
        Q(B('تلطيف مناسب لتخمين:', 'Suitable hedging for a guess:'), ['It appears that the token expired.', 'The token expired, 100%.', 'I think maybe it might possibly be the token.'], 0, B('متوازن.', 'Balanced.')),
        Q(B('توصية أمان:', 'A security recommendation:'), ['This must be fixed before launch.', 'Maybe we could perhaps look at it.', 'Whatever you think.'], 0, B('حاسم.', 'Decisive.'))
      ] },

    { title: B('التقوية والتخفيف', 'Intensifying and softening'),
      goal: B('تتحكم في قوة الكلمة.', 'Control the strength of a word.'),
      learn: [
        L(B('المقوّيات والمخففات', 'Intensifiers and downtoners'),
          B('**intensifier** بيقوّي (very, extremely, absolutely, highly) و**downtoner** بيخفف (slightly, somewhat, a bit, fairly). «slightly delayed» أهدى من «delayed». بس خلي بالك: absolutely/completely بتيجي مع الصفات القصوى (absolutely essential) مش العادية (✗ absolutely important).', 'An **intensifier** strengthens (very, extremely, absolutely, highly) and a **downtoner** softens (slightly, somewhat, a bit, fairly). «slightly delayed» is calmer than «delayed». But note: absolutely/completely go with extreme adjectives (absolutely essential), not ordinary ones (✗ absolutely important).'),
          '✓ highly recommended · extremely urgent · absolutely essential\n✓ slightly delayed · somewhat slower · a bit more complex\n✗ very essential · absolutely important\n"The new version is slightly slower but significantly more reliable."'),
        L(B('التهوين والتهويل', 'Understatement and overstatement'),
          B('**understatement** = تقول أقل من الحقيقة («not ideal» = سيء جدًا) — شائع جدًا في الإنجليزي البريطاني. **overstatement** = تهويل («a disaster» لمشكلة صغيرة) — بيضر مصداقيتك. اعرف تفهم الـ understatement لما تسمعه.', 'An **understatement** = saying less than the truth («not ideal» = very bad) — very common in British English. An **overstatement** = exaggeration («a disaster» for a small problem) — it hurts your credibility. Learn to recognise understatement when you hear it.'),
          'British client says…          → likely meaning\n"That’s not ideal."             → That’s a real problem.\n"I have a few small concerns."  → I have serious concerns.\n"It’s a bit of a challenge."    → It’s very difficult.\n"Interesting approach…"         → I don’t agree.'),
        L(B('دقيق بدل غامض', 'Precise instead of vague'),
          B('أقوى من أي intensifier: الرقم. **vague** («very slow», «a lot of errors») بيخلي القارئ يخمن. **precise** («12 seconds», «8% of runs») بيقنع ويقفل النقاش.', 'Stronger than any intensifier: the number. **vague** language («very slow», «a lot of errors») makes the reader guess. **precise** language («12 seconds», «8% of runs») convinces and ends the debate.'),
          '✗ "The workflow is really, really slow."\n✓ "The workflow takes 12 seconds per order, compared with 2 seconds last month."\n✗ "There are tons of errors."\n✓ "8% of runs failed yesterday (41 of 512)."')
      ],
      practice: [
        B('صنّف 15 كلمة: intensifier أو downtoner.', 'Sort 15 words into intensifiers and downtoners.'),
        B('صحّح 5 تركيبات غلط (very essential…).', 'Fix 5 wrong combinations (very essential…).'),
        B('فسّر 5 جمل understatement بريطانية.', 'Interpret 5 British understatements.'),
        B('حوّل 5 جمل vague لـ precise بأرقام.', 'Turn 5 vague sentences into precise ones with numbers.')
      ],
      words: [
        W('intensifier', 'كلمة بتقوّي', 'a word that strengthens meaning', '«Extremely» is an intensifier.'),
        W('downtoner', 'كلمة بتخفف', 'a word that softens meaning', '«Slightly» is a downtoner.'),
        W('understatement', 'تهوين / قول أقل من الحقيقة', 'saying less than the truth', '«Not ideal» was an understatement.'),
        W('overstatement', 'تهويل', 'exaggeration', 'Calling it a disaster is an overstatement.'),
        W('vague', 'غامض', 'not clear or exact', 'Vague reports waste time.'),
        W('precise', 'دقيق', 'exact', 'Give a precise number.')
      ],
      read: [{ lib: 'Perfect English Grammar', what: B('دوّر على «adverbs of degree».', 'Search for «adverbs of degree».') }],
      challenge: B('خد تقرير أو إيميل كتبته: علّم كل intensifier وكل كلمة vague، وبدّلهم بأرقام أو درجات دقيقة — وقارن طول ووضوح النسختين.', 'Take a report or email you wrote: mark every intensifier and every vague word, replace them with numbers or precise degrees — and compare the length and clarity of the two versions.'),
      quiz: [
        Q(B('صح:', 'Correct:'), ['absolutely essential', 'very essential', 'absolutely important'], 0, B('صفة قصوى.', 'An extreme adjective.')),
        Q(B('«That’s not ideal» غالبًا يعني:', '«That’s not ideal» usually means:'), ['That’s a real problem.', 'That’s perfect.', 'That’s ideal.'], 0, B('تهوين.', 'Understatement.')),
        Q(B('الأقوى إقناعًا:', 'The most convincing:'), ['8% of runs failed (41 of 512).', 'Tons of errors.', 'Really really bad.'], 0, B('أرقام.', 'Numbers.'))
      ] },

    { title: B('الصراحة عبر الثقافات', 'Directness across cultures'),
      goal: B('تظبط صراحتك حسب الطرف التاني.', 'Adjust your directness to the other side.'),
      learn: [
        L(B('سياق عالي وواطي', 'High- and low-context'),
          B('**low-context** (ألمانيا، هولندا، أمريكا لحد ما): المعنى في الكلام نفسه، صريح ومباشر. **high-context** (اليابان، الخليج، مصر لحد ما): المعنى في السياق والعلاقة، والرفض بيبقى غير مباشر. **directness** مش وقاحة و**indirectness** مش كذب — دي أعراف.', '**low-context** cultures (Germany, the Netherlands, the US to an extent): meaning is in the words, explicit and direct. **high-context** cultures (Japan, the Gulf, Egypt to an extent): meaning is in the context and relationship, and refusal is indirect. **directness** is not rudeness and **indirectness** is not lying — they are norms.'),
          'Dutch client:   "This design doesn’t work. Please change the colours."\n→ normal, not angry.\nJapanese client: "We will consider it carefully."\n→ might mean no.\nGulf client:     "Inshallah, next week."\n→ ask gently for a specific date.'),
        L(B('حفظ ماء الوجه', 'Saving face'),
          B('**face-saving** = إنك تسيب للطرف التاني مخرج كريم. انتقد الشغل مش الشخص، وفي الخاص مش قدام الكل، واستخدم «we» بدل «you». ومع **power distance** عالي (احترام كبير للمناصب)، الاقتراح على مدير يبقى في صيغة سؤال.', '**face-saving** = leaving the other person a dignified way out. Criticise the work, not the person, in private, not in front of everyone, and use «we» instead of «you». With high **power distance** (great respect for rank), a suggestion to a manager is phrased as a question.'),
          '✗ (in a group call) "You made a mistake in the mapping."\n✓ (in private) "I think we may have mixed up two fields in the mapping — shall we check it together?"\nto a senior manager: "Would it be worth considering a staging step?"'),
        L(B('بين الحاد والدبلوماسي', 'Between blunt and diplomatic'),
          B('**blunt** = صريح بشكل جارح. **tactful** = بتقول الحقيقة بحساسية. **diplomatic** = بتوصل لاتفاق من غير ما تزعّل حد. الهدف: نفس الرسالة، صيغة مناسبة للطرف التاني. مع الصريحين متلفّش كتير، ومع غير المباشرين متبقاش حاد.', '**blunt** = direct in a hurtful way. **tactful** = telling the truth with sensitivity. **diplomatic** = reaching agreement without upsetting anyone. The goal: the same message, worded for the other side. With direct people, do not go round in circles; with indirect people, do not be harsh.'),
          'blunt:      "Your data is a mess."\ntactful:    "The data has some inconsistencies we’ll need to clean first."\ndiplomatic: "To get the best results, it might help to agree on one format for the client names — would you like me to suggest one?"')
      ],
      practice: [
        B('اكتب رفض بثلاث صيغ: هولندي، ياباني، خليجي.', 'Write a refusal in three styles: Dutch, Japanese, Gulf.'),
        B('أعد صياغة 5 جمل blunt لـ tactful.', 'Rephrase 5 blunt sentences as tactful ones.'),
        B('اكتب اقتراح لمدير كبير بصيغة سؤال.', 'Write a suggestion to a senior manager as a question.'),
        B('فكّر في عميل بتتعامل معاه: low أو high context؟', 'Think of a client you work with: low or high context?')
      ],
      words: [
        W('low-context', 'ثقافة المعنى فيها في الكلام الصريح', 'meaning stated explicitly', 'Dutch business culture is low-context.'),
        W('high-context', 'ثقافة المعنى فيها في السياق', 'meaning carried by context', 'In high-context cultures, «maybe» can mean no.'),
        W('directness', 'الصراحة والمباشرة', 'saying things plainly', 'Their directness surprised me at first.'),
        W('indirectness', 'عدم المباشرة', 'saying things implicitly', 'Indirectness can protect relationships.'),
        W('face-saving', 'حفظ ماء الوجه', 'protecting someone’s dignity', 'Give feedback in private for face-saving.'),
        W('power distance', 'مسافة السلطة (احترام المناصب)', 'how much people defer to rank', 'High power distance affects meetings.'),
        W('blunt', 'صريح بشكل جارح', 'direct to the point of rudeness', 'His blunt email upset the team.'),
        W('tactful', 'لبق / حساس في الكلام', 'careful not to offend', 'She gave tactful feedback.'),
        W('diplomatic', 'دبلوماسي', 'handling people without offending', 'Give a diplomatic answer.')
      ],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «cultural differences at work».', 'Search for «cultural differences at work».') }],
      challenge: B('اكتب نفس الرسالة الصعبة (رفض طلب + اقتراح بديل) بالإنجليزي لـ 3 عملاء من ثقافات مختلفة، واشرح في سطرين لكل واحدة ليه غيّرت الصيغة.', 'Write the same difficult message (refusing a request + suggesting an alternative) in English for 3 clients from different cultures, and explain in two lines each why you changed the wording.'),
      quiz: [
        Q(B('عميل هولندي قال «This doesn’t work»:', 'A Dutch client says «This doesn’t work»:'), ['normal directness, not anger', 'they are furious', 'they will cancel'], 0, B('low-context.', 'Low-context.')),
        Q(B('face-saving:', 'Face-saving:'), ['criticise the work in private', 'criticise the person publicly', 'ignore the problem'], 0, B('كرامة.', 'Dignity.')),
        Q(B('tactful:', 'Tactful:'), ['The data has some inconsistencies.', 'Your data is a mess.', 'Bad data.'], 0, B('لبق.', 'Tactful.'))
      ] },

    { title: B('اللي بين السطور', 'Reading between the lines'),
      goal: B('تفهم النبرة الخفية في الإيميلات.', 'Understand the hidden tone in emails.'),
      learn: [
        L(B('الإيحاء', 'Connotation'),
          B('**connotation** = الإحساس اللي الكلمة بتحمله فوق معناها: cheap (سلبي) ↔ affordable (إيجابي)، stubborn ↔ determined، old ↔ proven. **nuance** = الفرق الدقيق في المعنى أو النبرة. اختيار الكلمة بيغيّر الرسالة كلها.', '**connotation** = the feeling a word carries beyond its meaning: cheap (negative) ↔ affordable (positive), stubborn ↔ determined, old ↔ proven. **nuance** = a subtle difference in meaning or tone. Word choice changes the whole message.'),
          'negative  → neutral/positive\ncheap      → affordable / cost-effective\nold system → proven / established system\nproblem    → issue / challenge\ncomplicated → detailed / comprehensive'),
        L(B('العدوانية السلبية', 'Passive-aggressive phrases'),
          B('**passive-aggressive** = ضيق مكتوم في كلام مؤدب ظاهريًا. أشهرها «**per my last email**» = «قلتلك قبل كده ومقرتش». اعرف تقراها، ومتكتبهاش — لو فيه مشكلة، قولها بصراحة وأدب.', '**passive-aggressive** = hidden annoyance in apparently polite words. The most famous is «**per my last email**» = «I already told you and you didn’t read it». Learn to read them, and do not write them — if there is a problem, say it directly and politely.'),
          'phrase                          → hidden meaning\n"Per my last email…"             → You didn’t read it.\n"As previously mentioned…"       → I’m repeating myself.\n"Thanks in advance."             → You have no choice.\n"Just to clarify…"               → You got it wrong.\nbetter: "In case it got buried, here’s the summary again: …"'),
        L(B('السخرية والتلميح', 'Sarcasm and subtext'),
          B('**sarcasm** = تقول عكس اللي تقصده بنبرة ساخرة («Great, another outage»)، و**irony** = تناقض بين المتوقع والحاصل. في الكتابة الساخرة بتتفهم غلط بسهولة — تجنبها مع العملاء. **subtext** = الرسالة غير المكتوبة. لو مش متأكد، اسأل بأدب: «Just to make sure I understand — would you prefer…?»', '**sarcasm** = saying the opposite of what you mean in a mocking tone («Great, another outage»), and **irony** = a contrast between what is expected and what happens. In writing, sarcasm is easily misunderstood — avoid it with clients. **subtext** = the unwritten message. If unsure, ask politely: «Just to make sure I understand — would you prefer…?»'),
          'sarcasm: "Oh great, the server is down again. Perfect timing."\nirony:   The backup script was the only thing that wasn’t backed up.\nsubtext: "We’ve decided to explore other options for now." → you didn’t get the project.')
      ],
      practice: [
        B('اكتب 8 أزواج كلمات: سلبي ↔ إيجابي.', 'Write 8 word pairs: negative ↔ positive.'),
        B('فسّر 5 جمل passive-aggressive.', 'Interpret 5 passive-aggressive phrases.'),
        B('أعد كتابتهم بصراحة وأدب.', 'Rewrite them directly and politely.'),
        B('اقرا إيميل حقيقي وطلّع الـ subtext.', 'Read a real email and extract its subtext.')
      ],
      words: [
        W('connotation', 'الإيحاء / الإحساس اللي في الكلمة', 'the feeling a word carries', '«Cheap» has a negative connotation.'),
        W('nuance', 'فرق دقيق', 'a subtle difference', 'Translation loses some nuance.'),
        W('passive-aggressive', 'عدوانية مستخبية في أدب', 'hostile in an indirect way', 'That reply sounded passive-aggressive.'),
        W('per my last email', 'زي ما قلت في إيميلي اللي فات (بضيق)', 'as I already wrote (annoyed)', 'Avoid writing «per my last email».'),
        W('sarcasm', 'سخرية', 'mocking by saying the opposite', 'Sarcasm rarely works in email.'),
        W('irony', 'مفارقة', 'a contrast between expected and real', 'The irony is that the test failed the tests.'),
        W('subtext', 'المعنى الضمني', 'the unstated message', 'The subtext was a polite no.'),
        W('read between the lines', 'تفهم اللي مش مكتوب', 'to understand the hidden meaning', 'Read between the lines of their reply.')
      ],
      read: [{ lib: 'Cambridge Dictionary', what: B('دوّر على connotation وأمثلتها.', 'Look up connotation and its examples.') }],
      challenge: B('جمّع 5 إيميلات إنجليزي حقيقية (ليك أو من مواقع أمثلة): لكل واحد اكتب النبرة، الـ subtext، أي كلمات بإيحاء قوي — ورد مناسب بصراحة وأدب.', 'Collect 5 real English emails (yours or from example sites): for each, write the tone, the subtext and any strongly loaded words — and a direct, polite reply.'),
      quiz: [
        Q(B('«Per my last email» يعني:', '«Per my last email» means:'), ['I already told you, read it', 'thank you', 'this is new information'], 0, B('ضيق.', 'Annoyance.')),
        Q(B('إيحاء إيجابي:', 'A positive connotation:'), ['affordable', 'cheap', 'stingy'], 0, B('إيجابي.', 'Positive.')),
        Q(B('«We’ve decided to explore other options» subtext:', 'The subtext of «We’ve decided to explore other options»:'), ['you didn’t get it', 'you got the job', 'please call us'], 0, B('رفض مهذب.', 'A polite no.'))
      ] },

    { title: B('الدفء والمستوى', 'Warmth and register'),
      goal: B('نبرة دافية ومحترفة في نفس الوقت.', 'A tone that is warm and professional at once.'),
      learn: [
        L(B('المستوى', 'Register'),
          B('**register** = مستوى الرسمية: رسمي (عقود، شكاوى رسمية)، محايد (إيميلات الشغل)، غير رسمي (سلاك مع زمايل). الغلط الشائع: رسمي زيادة مع عميل بيكتب بشكل ودّي، أو غير رسمي مع عميل جديد. قلّد مستوى الطرف التاني، ومتنزلش عنه في الأول.', '**register** = the level of formality: formal (contracts, formal complaints), neutral (work emails), informal (Slack with colleagues). The common mistake: too formal with a client who writes casually, or too casual with a new client. Mirror the other person’s register, and do not go below it at first.'),
          'formal:   "We would be grateful if you could confirm receipt of the documents."\nneutral:  "Could you confirm you’ve received the documents?"\ninformal: "Got the docs? 👍"'),
        L(B('الدفء في الكتابة', 'Warmth in writing'),
          B('**warmth** من غير ما تبقى غير محترف: اسم الشخص، جملة شخصية قصيرة («Hope the launch went well»)، شكر محدد، و**exclamation mark** واحدة بالكتير في الإيميل. **emoji** مقبولة في سلاك/واتساب مع ناس بتستخدمها، مش في أول إيميل لعميل.', '**warmth** without being unprofessional: the person’s name, a short personal line («Hope the launch went well»), specific thanks, and at most one **exclamation mark** per email. An **emoji** is fine on Slack/WhatsApp with people who use them, not in a first email to a client.'),
          'cold:  "Please find attached the report."\nwarm:  "Hi Sara, hope the launch went well! I’ve attached the September report — the highlight is that manual work dropped by 70%. Thanks again for your quick feedback on the dashboard."\ntoo much: "Hiii!!! 😍😍 Here’s the report!!!"'),
        L(B('الهزار والانطباع', 'Humour and impressions'),
          B('**humour** بيقرّب بس بيتترجم غلط بسهولة بين الثقافات — استخدمه بحذر وبعد ما العلاقة تتبني، ومتهزرش أبدًا عن العميل أو مشكلته. وراجع إيميلك: إزاي **come across as** (بيبان) — واثق؟ متوتر؟ حاد؟ اقراه بصوت عالي كأنك العميل.', '**humour** builds closeness but translates badly across cultures — use it carefully, after the relationship is built, and never joke about the client or their problem. Then check your email: how does it **come across as** — confident? nervous? harsh? Read it aloud as if you were the client.'),
          'come across as nervous:   "Sorry to bother you, I’m so sorry, I just wanted to maybe ask…"\ncome across as confident: "Quick question about the invoice format: should the PO number go in the header?"')
      ],
      practice: [
        B('اكتب نفس الطلب بتلات مستويات.', 'Write the same request in three registers.'),
        B('دفّي 3 إيميلات باردة.', 'Warm up 3 cold emails.'),
        B('اكتب نفس الإيميل بنسختين: متوتر وواثق.', 'Write the same email in two versions: nervous and confident.'),
        B('اقرا إيميلاتك بصوت عالي وقيّم النبرة.', 'Read your emails aloud and rate the tone.')
      ],
      words: [
        W('register', 'مستوى الرسمية', 'the level of formality', 'Match the client’s register.'),
        W('warmth', 'دفء في الأسلوب', 'friendliness in tone', 'Add some warmth to the opening.'),
        W('exclamation mark', 'علامة تعجب', 'the punctuation mark «!»', 'Use one exclamation mark at most.'),
        W('emoji', 'إيموجي', 'a small picture in a message', 'Skip the emoji in a first email.'),
        W('humour', 'هزار / روح الدعابة', 'the quality of being funny', 'Humour doesn’t always translate.'),
        W('come across as', 'يبان كأنه', 'to give an impression of', 'Your email comes across as nervous.')
      ],
      read: [{ lib: 'Microsoft Writing Style Guide', what: B('اقرا «Brand voice» والنبرة.', 'Read «Brand voice» and the tone section.') }],
      challenge: B('اكتب 4 رسايل بالإنجليزي لنفس الموضوع (تأكيد ميعاد تسليم): عقد رسمي، إيميل لعميل جديد، إيميل لعميل قديم ودود، وسلاك لزميل — وخلّي واحد يقراهم ويقولك كل واحدة بتبان إزاي.', 'Write 4 English messages on the same topic (confirming a delivery date): a formal contract line, an email to a new client, an email to a friendly long-term client, and a Slack message to a colleague — and ask someone to tell you how each comes across.'),
      quiz: [
        Q(B('عميل جديد:', 'A new client:'), ['neutral register, no emoji', 'informal with emoji', 'very formal legal language'], 0, B('محايد.', 'Neutral.')),
        Q(B('دفء محترف:', 'Professional warmth:'), ['Hope the launch went well!', 'Hiii!!! 😍😍', 'Please find attached.'], 0, B('متوازن.', 'Balanced.')),
        Q(B('بيبان واثق:', 'Comes across as confident:'), ['Quick question: should the PO go in the header?', 'Sorry, so sorry to bother you, maybe…', 'URGENT!!!'], 0, B('مباشر.', 'Direct.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('بتتحكم في نبرتك زي الكاتب المحترف.', 'You control your tone like a professional writer.'),
      review: [
        B('سلّم اليقين وأدوات التلطيف وإمتى تكون حاسم.', 'The certainty scale, hedging tools and when to be decisive.'),
        B('المقوّيات والمخففات والتهوين والتهويل والأرقام الدقيقة.', 'Intensifiers, downtoners, understatement, overstatement and precise numbers.'),
        B('ثقافات السياق العالي والواطي وحفظ ماء الوجه والدبلوماسية.', 'High- and low-context cultures, face-saving and diplomacy.'),
        B('الإيحاء والعدوانية السلبية والسخرية والمعنى الضمني.', 'Connotation, passive-aggressive phrases, sarcasm and subtext.'),
        B('مستوى الرسمية والدفء والانطباع.', 'Register, warmth and the impression you give.')
      ],
      project: B('ابني «دليل النبرة» الشخصي بالإنجليزي: سلّم يقين بأمثلة من شغلك، 20 زوج كلمات (إيحاء سلبي ↔ إيجابي)، 10 جمل passive-aggressive وبدايلها، ملف لكل عميل (الثقافة، المستوى، الصراحة)، وقايمة مراجعة قبل ما تبعت أي إيميل حساس.', 'Build a personal English «tone guide»: a certainty scale with examples from your work, 20 word pairs (negative ↔ positive connotation), 10 passive-aggressive phrases with alternatives, a profile for each client (culture, register, directness), and a checklist to run before sending any sensitive email.'),
      test: [
        Q(B('«is likely to»:', '«is likely to»:'), ['probable but not certain', 'certain', 'impossible'], 0, B('محتمل.', 'Probable.')),
        Q(B('qualifier:', 'A qualifier:'), ['in most cases', 'definitely', 'never'], 0, B('تحديد.', 'Limiting.')),
        Q(B('تلطيف زيادة:', 'Excessive hedging:'), ['I think maybe it might possibly be…', 'It’s probably the date format.', 'I recommend a backup.'], 0, B('كتير.', 'Too much.')),
        Q(B('downtoner:', 'A downtoner:'), ['slightly', 'extremely', 'absolutely'], 0, B('تخفيف.', 'Softening.')),
        Q(B('«I have a few small concerns» (بريطاني):', '«I have a few small concerns» (British):'), ['possibly serious concerns', 'no concerns', 'praise'], 0, B('تهوين.', 'Understatement.')),
        Q(B('high-context:', 'High-context:'), ['meaning in context and relationship', 'meaning only in words', 'very loud'], 0, B('سياق.', 'Context.')),
        Q(B('blunt:', 'Blunt:'), ['direct to the point of rudeness', 'polite', 'vague'], 0, B('حاد.', 'Harsh.')),
        Q(B('اقتراح لمدير كبير (power distance عالي):', 'A suggestion to a senior manager (high power distance):'), ['Would it be worth considering…?', 'You must…', 'Do this now.'], 0, B('سؤال.', 'A question.')),
        Q(B('connotation:', 'Connotation:'), ['the feeling a word carries', 'a connection', 'a dictionary'], 0, B('إيحاء.', 'Feeling.')),
        Q(B('بديل «per my last email»:', 'An alternative to «per my last email»:'), ['In case it got buried, here’s the summary again.', 'As I ALREADY said…', 'Read my emails.'], 0, B('لطيف.', 'Kind.')),
        Q(B('السخرية مع العملاء كتابةً:', 'Sarcasm with clients in writing:'), ['avoid it', 'use it often', 'use it in subject lines'], 0, B('سوء فهم.', 'Misunderstanding.')),
        Q(B('register:', 'Register:'), ['level of formality', 'a cash machine', 'signing up'], 0, B('رسمية.', 'Formality.'))
      ] }
  ]
};
