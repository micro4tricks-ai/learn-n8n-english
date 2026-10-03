// English week 36 — Talks, big presentations and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('المحاضرات والعروض الكبيرة ومشروع الشهر', 'Talks, big presentations and the month project'),
  goal: B('تقدّم talk بالإنجليزي في meetup أو مؤتمر أو أونلاين: فكرة واحدة كبيرة، شرايح بسيطة، إلقاء واثق، ديمو آمن، أسئلة وأجوبة هادية — وتختم شهر التحدث والقيادة بعرض حقيقي.',
          'Give a talk in English at a meetup, a conference or online: one big idea, simple slides, confident delivery, a safe demo, calm Q&A — and finish the speaking-and-leading month with a real presentation.'),
  days: [
    { title: B('تخطيط الـ talk', 'Planning a talk'),
      goal: B('تبني talk حوالين فكرة واحدة وتقدّمه لمؤتمر.', 'Build a talk around one idea and submit it to an event.'),
      learn: [
        L(B('فكرة واحدة كبيرة', 'One big idea'),
          B('الجمهور بيفتكر حاجة واحدة بس. حدد **big idea** في جملة: «A small queue in Postgres can make any webhook campaign-proof.» كل حاجة في الـ talk لازم تخدم الجملة دي — والباقي يتشال.', 'An audience remembers one thing. Define your **big idea** in a sentence: «A small queue in Postgres can make any webhook campaign-proof.» Everything in the talk must serve that sentence — the rest goes.'),
          'Big idea: "A small queue makes any webhook campaign-proof."\nDrop: the history of message brokers, Kafka internals'),
        L(B('قوس الحكاية', 'The story arc'),
          B('**story arc** بسيط: الموقف (كان فيه…)، المشكلة (وفي ليلة…)، المحاولات، الحل، النتيجة، والدرس للجمهور. والطول: talk 20 دقيقة = 3 نقط أساسية بس. **lightning talk** (5 دقايق) = نقطة واحدة.', 'A simple **story arc**: the situation (there was…), the problem (and one night…), the attempts, the solution, the result, and the lesson for the audience. And length: a 20-minute talk = only 3 main points. A **lightning talk** (5 minutes) = one point.'),
          '0:00 hook — 60 orders lost in 5 minutes\n2:00 why webhooks fail under bursts\n8:00 the queue (demo)\n15:00 results + 3 lessons\n18:00 Q&A'),
        L(B('التقديم للمؤتمر', 'Submitting to an event'),
          B('المؤتمرات بتفتح **call for papers** (CFP): بتطلب عنوان، وملخص (100–200 كلمة) بيقول المشكلة واللي الجمهور هياخده، ونبذة عنك. اكتب الملخص للجمهور: «You will learn how to…». الـ meetups المحلية بداية ممتازة.', 'Events open a **call for papers** (CFP): they ask for a title, a summary (100–200 words) stating the problem and what the audience will take away, and a short bio. Write the summary for the audience: «You will learn how to…». Local meetups are an excellent start.'),
          'Title: Campaign-proof webhooks with a 20-dollar queue\nSummary: … You will learn three patterns to stop losing events, with a live n8n demo.')
      ],
      practice: [
        B('اكتب big idea لـ talk عن مشروع من الرحلة.', 'Write the big idea for a talk about a journey project.'),
        B('ارسم story arc بأوقات لـ talk 15 دقيقة.', 'Draw a timed story arc for a 15-minute talk.'),
        B('اكتب ملخص CFP 150 كلمة.', 'Write a 150-word CFP summary.'),
        B('دوّر على meetup تقني (أونلاين أو قريب منك).', 'Find a tech meetup (online or near you).')
      ],
      words: [
        W('talk', 'محاضرة/عرض قصير قدام جمهور', 'a presentation given to an audience', 'My talk is 20 minutes long.'),
        W('big idea', 'الفكرة الأساسية الواحدة', 'the one central idea', 'Every slide serves the big idea.'),
        W('story arc', 'تسلسل الحكاية من البداية للنهاية', 'the shape of a story from start to end', 'The story arc starts with a failure.'),
        W('call for papers', 'دعوة المؤتمر لتقديم محاضرات', 'an event’s invitation to submit talks', 'The call for papers closes on Friday.'),
        W('lightning talk', 'محاضرة قصيرة جدًا (5 دقايق)', 'a very short talk (about 5 minutes)', 'Start with a lightning talk.')
      ],
      read: ['lib:TED Talks', { lib: 'GOTO Conferences', what: B('شوف أول 3 دقايق من talk ولاحظ الـ hook.', 'Watch the first 3 minutes of a talk and notice the hook.') }],
      challenge: B('جهّز talk 15 دقيقة: big idea، story arc بأوقات، عنوان وملخص CFP ونبذة عنك — وقدّمه لـ meetup حقيقي أو جهّزه للتقديم.', 'Prepare a 15-minute talk: a big idea, a timed story arc, a CFP title and summary and a bio — and submit it to a real meetup or get it ready to submit.'),
      quiz: [
        Q(B('talk 20 دقيقة فيه:', 'A 20-minute talk has:'), ['about 3 main points', '15 main points', 'no structure'], 0, B('قليل وواضح.', 'Few and clear.')),
        Q(B('big idea:', 'The big idea is:'), ['one sentence the audience remembers', 'the slide count', 'your job title'], 0, B('جملة.', 'One sentence.')),
        Q(B('ملخص CFP بيتكتب لـ:', 'A CFP summary is written for:'), ['the audience: what they will learn', 'your manager', 'the venue'], 0, B('الجمهور.', 'The audience.'))
      ] },

    { title: B('الشرايح', 'Slides'),
      goal: B('تعمل شرايح بتساعد الكلام مش بتقراه.', 'Make slides that support your words rather than repeat them.'),
      learn: [
        L(B('فكرة لكل شريحة', 'One idea per slide'),
          B('**one idea per slide**: عنوان بيقول الرسالة كجملة («Bursts are 40× normal traffic») مش كلمة («Traffic»)، ورسمة أو رقم كبير، وكلام قليل جدًا. لو الجمهور بيقرا، مش بيسمعك.', '**One idea per slide**: a title stating the message as a sentence («Bursts are 40× normal traffic»), not a word («Traffic»), a diagram or a big number, and very few words. If the audience is reading, they are not listening to you.'),
          '✗ Title: "Traffic" + 8 bullet points\n✓ Title: "Bursts are 40× normal traffic" + one chart'),
        L(B('كود على الشريحة', 'Code on slides'),
          B('الكود على الشريحة: أقل من 10 سطور، خط كبير (24pt+)، تظليل للسطر المهم، وشيل أي حاجة مش ضرورية. أحسن من صفحة كود كاملة: تبني الكود خطوة خطوة على أكتر من شريحة.', 'Code on a slide: under 10 lines, a big font (24pt+), highlight the important line, and remove anything unnecessary. Better than a full page of code: build it up step by step across several slides.'),
          'slide 1: the INSERT\nslide 2: + SKIP LOCKED (highlighted)\nslide 3: + status update'),
        L(B('ملاحظات المتحدث', 'Speaker notes'),
          B('اللي عايز تقوله يتكتب في **speaker notes** مش على الشريحة: نقط قصيرة مش نص كامل تقراه. واعمل **slide deck** تتشارك بعدين (بلينكات ومصادر) غير اللي بتعرضها لو محتاج.', 'What you want to say goes in the **speaker notes**, not on the slide: short points, not a full script to read. Make a **slide deck** to share afterwards (with links and sources), separate from the one you present if needed.'),
          'notes: • story: Ramadan night • 60 orders • pause • "what went wrong?"')
      ],
      practice: [
        B('حوّل 5 عناوين كلمة لعناوين جملة رسالة.', 'Turn 5 one-word titles into message-sentence titles.'),
        B('اعمل شرايح الـ talk بقاعدة فكرة لكل شريحة.', 'Build the talk’s slides with one idea per slide.'),
        B('ابني كود على 3 شرايح بالتدريج.', 'Build up code across 3 slides.'),
        B('اكتب speaker notes نقط قصيرة.', 'Write speaker notes as short points.')
      ],
      words: [
        W('slide deck', 'مجموعة الشرايح', 'the set of slides', 'Share the slide deck after the talk.'),
        W('one idea per slide', 'قاعدة فكرة واحدة لكل شريحة', 'the rule of a single idea on each slide', 'Follow one idea per slide.'),
        W('speaker notes', 'ملاحظات المتحدث المخفية', 'the presenter’s hidden notes', 'Keep the details in the speaker notes.'),
        W('visual', 'رسمة أو صورة توضيحية', 'an image or diagram', 'Use a visual instead of bullets.'),
        W('highlight', 'تبرز/تظلّل', 'to make something stand out', 'Highlight the key line of code.')
      ],
      read: [{ lib: 'Speak English with Vanessa', what: B('دوّر على «presentation English».', 'Search for «presentation English».') }, 'lib:TED Talks'],
      challenge: B('اعمل شرايح الـ talk كاملة (12–18 شريحة): عناوين جمل، فكرة لكل شريحة، كود متدرّج، رسومات، وspeaker notes — واعرضها على حد واسأله: فهمت الرسالة من العناوين لوحدها؟', 'Build the talk’s full slides (12–18): sentence titles, one idea per slide, built-up code, diagrams and speaker notes — show them to someone and ask: did you get the message from the titles alone?'),
      quiz: [
        Q(B('عنوان شريحة أحسن:', 'A better slide title:'), ['«Bursts are 40× normal traffic»', '«Traffic»', '«Slide 4»'], 0, B('جملة رسالة.', 'A message sentence.')),
        Q(B('كود على شريحة:', 'Code on a slide:'), ['few lines, big font, a highlight', 'a full file, small font', 'a screenshot of the IDE'], 0, B('مقروء.', 'Readable.')),
        Q(B('النص الكامل للكلام:', 'The full text of what you say:'), ['not on the slide; short notes only', 'on the slide', 'read word by word'], 0, B('ملاحظات.', 'Notes.'))
      ] },

    { title: B('الإلقاء', 'Delivery'),
      goal: B('تتكلم بثقة وصوت واضح ولغة جسد مريحة.', 'Speak with confidence, a clear voice and relaxed body language.'),
      learn: [
        L(B('السرعة والوقفات', 'Pace and pauses'),
          B('مع التوتر بنتكلم بسرعة. **pace** هادي (حوالي 130 كلمة في الدقيقة)، ووقفة **pause** ثانيتين بعد الجمل المهمة وبعد سؤال للجمهور. الوقفة بتبان ثقة مش نسيان. وشدّد على الكلمات المهمة.', 'Nerves make us speak fast. A calm **pace** (about 130 words a minute), and a two-second **pause** after important sentences and after a question to the audience. A pause looks like confidence, not forgetting. Stress the key words.'),
          '"We lost SIXTY orders. (pause) In FIVE minutes. (pause) Here’s what went wrong."'),
        L(B('لغة الجسد', 'Body language'),
          B('**body language**: وقفة ثابتة، إيدين مرتاحة (مش في الجيب)، اتحرك بهدف مش رايح جاي. **eye contact**: بص لأشخاص في أماكن مختلفة جملة جملة. وابتسم في الأول — الجمهور بيبقى معاك.', '**Body language**: a steady stance, relaxed hands (not in pockets), move with purpose rather than pacing. **Eye contact**: look at people in different parts of the room, one sentence each. Smile at the start — the audience will be on your side.'),
          'checklist: feet still · hands open · eyes on one person per sentence · smile'),
        L(B('التوتر', 'Nerves'),
          B('**stage fright** طبيعي حتى للمحترفين. اللي بيساعد: **rehearse** (بروفة) 3 مرات بصوت عالي، احفظ أول دقيقة كويس، نفس عميق قبل البداية، وافتكر إن الجمهور عايزك تنجح. لو نسيت: بص للملاحظات، ووقفة، وكمّل.', '**Stage fright** is normal, even for professionals. What helps: **rehearse** aloud 3 times, know the first minute well, take a deep breath before starting, and remember the audience wants you to succeed. If you forget: look at your notes, pause, and continue.'),
          'rehearsal 1: alone · 2: recorded · 3: in front of a friend\nfirst minute: memorised')
      ],
      practice: [
        B('سجّل أول 3 دقايق من الـ talk وقيس كلماتك في الدقيقة.', 'Record the first 3 minutes of your talk and measure words per minute.'),
        B('علّم الوقفات والكلمات المشددة في السكريبت.', 'Mark pauses and stressed words in your script.'),
        B('اتفرج على تسجيلك بالصوت مقفول وقيّم لغة الجسد.', 'Watch your recording muted and assess your body language.'),
        B('اعمل 3 بروفات بالترتيب.', 'Do 3 rehearsals in order.')
      ],
      words: [
        W('pace', 'سرعة الكلام', 'the speed of speaking', 'Slow your pace when you are nervous.'),
        W('pause', 'وقفة قصيرة', 'a short stop', 'Pause after the key number.'),
        W('eye contact', 'التواصل بالعين', 'looking at people’s eyes', 'Make eye contact with the whole room.'),
        W('stage fright', 'رهبة المسرح/التوتر قبل العرض', 'nervousness before performing', 'Everyone has some stage fright.'),
        W('rehearse', 'تعمل بروفة', 'to practise before the real event', 'Rehearse the talk three times.')
      ],
      read: ['lib:Rachel\'s English (YouTube)', { lib: 'Toastmasters', what: B('اقرا نصايح التوتر.', 'Read their tips on nerves.') }],
      challenge: B('اعمل 3 بروفات كاملة للـ talk بالترتيب، وسجّل الأخيرة فيديو، وقيّمها بـ 6 معايير (سرعة، وقفات، نطق، عين، جسد، وقت).', 'Do 3 full rehearsals of the talk in order, record the last on video, and rate it on 6 criteria (pace, pauses, pronunciation, eyes, body, timing).'),
      quiz: [
        Q(B('وقفة بعد رقم مهم:', 'A pause after an important number:'), ['looks confident and lets it land', 'looks like forgetting', 'is rude'], 0, B('تأثير.', 'Impact.')),
        Q(B('مع التوتر غالبًا:', 'Nerves usually make you:'), ['speak too fast', 'speak too slowly', 'whisper'], 0, B('بطّأ.', 'Slow down.')),
        Q(B('نسيت الكلام:', 'You forget your words:'), ['look at notes, pause, continue', 'apologise for a minute', 'leave the stage'], 0, B('عادي.', 'It happens.'))
      ] },

    { title: B('الديمو والأسئلة', 'Demos and Q&A'),
      goal: B('تعمل ديمو مبيبوظش وترد على الأسئلة بهدوء.', 'Run a demo that does not break and answer questions calmly.'),
      learn: [
        L(B('ديمو آمن', 'A safe demo'),
          B('**live demo** ممتع بس خطر. جهّز: بيانات ثابتة، إنترنت احتياطي، كل حاجة مفتوحة في تبويبات، وخط كبير. والأهم: **backup recording** (فيديو للديمو) — لو حاجة وقعت: «Let me switch to the recording.» من غير ارتباك.', 'A **live demo** is exciting but risky. Prepare: fixed data, a backup internet connection, everything open in tabs, and a big font. Most importantly: a **backup recording** (a video of the demo) — if something fails: «Let me switch to the recording.» without panic.'),
          'demo kit: fixed sample data · hotspot · tabs ready · font 150%\nplan B: 90-second recording of the same demo'),
        L(B('الرد على الأسئلة', 'Answering questions'),
          B('**Q&A**: أعد السؤال للجمهور (اللي ورا مسمعش)، اشكر لو مناسب، رد باختصار، واتأكد: «Does that answer your question?». ولو مش عارف: «I don’t know, but I’ll find out and **follow up later**.» — أحسن ألف مرة من التخمين.', '**Q&A**: repeat the question for the audience (people at the back did not hear), thank them if appropriate, answer briefly, and check: «Does that answer your question?». If you do not know: «I don’t know, but I’ll find out and **follow up later**.» — far better than guessing.'),
          '"The question was whether this works with MySQL. Yes, with SKIP LOCKED in MySQL 8. Does that answer it?"'),
        L(B('أسئلة صعبة', 'Hard questions'),
          B('سؤال عدائي أو طويل: خليك هادي، لخّصه («So your concern is the extra cost?»)، رد على الجزء المهم، وعرض تكمّل بعدين: «Happy to go into more detail after the talk.» والسؤال بره الموضوع: «Great question — a bit outside today’s scope; let’s talk afterwards.»', 'A hostile or long question: stay calm, summarise it («So your concern is the extra cost?»), answer the key part, and offer to continue later: «Happy to go into more detail after the talk.» An off-topic question: «Great question — a bit outside today’s scope; let’s talk afterwards.»'),
          '"So if I understand correctly, your concern is cost. Briefly: it’s about $20 a month. Happy to share numbers after the talk."')
      ],
      practice: [
        B('جهّز demo kit وسجّل backup recording دقيقتين.', 'Prepare a demo kit and record a two-minute backup recording.'),
        B('اكتب 10 أسئلة متوقعة وإجابات قصيرة.', 'Write 10 expected questions with short answers.'),
        B('اكتب 4 جمل «مش عارف، هرجعلك».', 'Write 4 «I don’t know, I’ll follow up» phrases.'),
        B('اعمل Q&A تمثيل مع AI بأسئلة صعبة.', 'Role-play a Q&A with an AI asking hard questions.')
      ],
      words: [
        W('live demo', 'عرض حي للبرنامج', 'showing the software working live', 'The live demo took four minutes.'),
        W('backup recording', 'فيديو احتياطي للديمو', 'a spare video of the demo', 'Switch to the backup recording if Wi-Fi fails.'),
        W('q&a', 'فقرة الأسئلة والأجوبة', 'the questions-and-answers part', 'We have ten minutes for Q&A.'),
        W('follow up later', 'ترجع بالإجابة بعدين', 'to answer later', 'I’ll follow up later by email.'),
        W('hostile question', 'سؤال عدائي/هجومي', 'an aggressive question', 'Stay calm with a hostile question.')
      ],
      read: ['lib:InfoQ Presentations', { lib: 'GOTO Conferences', what: B('اتفرج على Q&A في آخر talk.', 'Watch the Q&A at the end of a talk.') }],
      challenge: B('اعمل ديمو 4 دقايق للـ talk بـ demo kit وbackup recording، و«Q&A تدريب» 10 دقايق مع أصحاب أو AI فيها سؤال عدائي وسؤال مش عارف إجابته.', 'Build a 4-minute demo for the talk with a demo kit and a backup recording, and a 10-minute «practice Q&A» with friends or an AI including a hostile question and one you cannot answer.'),
      quiz: [
        Q(B('الديمو وقع:', 'The demo broke:'), ['switch calmly to the backup recording', 'debug for 10 minutes on stage', 'cancel the talk'], 0, B('خطة ب.', 'Plan B.')),
        Q(B('أول خطوة مع سؤال من الجمهور:', 'The first step with an audience question:'), ['repeat it for everyone', 'answer immediately', 'ignore it'], 0, B('الكل يسمع.', 'So all hear.')),
        Q(B('مش عارف الإجابة:', 'You do not know the answer:'), ['say so and follow up later', 'guess confidently', 'change the subject'], 0, B('صراحة.', 'Honesty.'))
      ] },

    { title: B('العروض أونلاين والتسجيل', 'Online talks and recordings'),
      goal: B('تقدّم أونلاين أو تسجّل talk بجودة كويسة.', 'Present online or record a talk at good quality.'),
      learn: [
        L(B('التجهيز التقني', 'Technical setup'),
          B('أونلاين الصوت أهم من الصورة: ميكروفون كويس ومكان هادي. **mic check** قبلها، والكاميرا في مستوى العين، وإضاءة من قدام. **screen share** لشباك واحد مش الشاشة كلها (خصوصية وإشعارات).', 'Online, sound matters more than video: a good microphone and a quiet place. Do a **mic check** beforehand, put the camera at eye level, and light from the front. **Screen share** one window, not the whole screen (privacy and notifications).'),
          'checklist: mic check · notifications off · share one window · camera at eye level · water'),
        L(B('الطاقة أونلاين', 'Energy online'),
          B('أونلاين بتفقد نص طاقتك. اتكلم بحيوية أكتر شوية، بص للكاميرا مش للشاشة في الجمل المهمة، واسأل الجمهور يكتبوا في الشات كل 5 دقايق: «Type 1 in the chat if you’ve had a webhook time out.»', 'Online you lose half your energy. Speak with a bit more liveliness, look at the camera, not the screen, for key sentences, and ask the audience to type in the chat every 5 minutes: «Type 1 in the chat if you’ve had a webhook time out.»'),
          '"Quick poll — type 1 if you’ve lost orders during a sale, 2 if not."'),
        L(B('التسجيل والنشر', 'Recording and publishing'),
          B('لـ **webinar** أو فيديو يوتيوب: اعمل **dry run** كامل، سجّل بأقسام عشان التعديل أسهل، وضيف ترجمة (captions) لأنها بتساعد كل الناس، ووصف بالروابط والوقت لكل جزء (chapters).', 'For a **webinar** or a YouTube video: do a full **dry run**, record in sections to make editing easier, add captions because they help everyone, and write a description with links and timestamps for each part (chapters).'),
          'Chapters: 0:00 Intro · 1:30 The problem · 6:00 Demo · 12:00 Lessons')
      ],
      practice: [
        B('اعمل mic check وجهّز checklist التقني.', 'Do a mic check and prepare the technical checklist.'),
        B('سجّل 5 دقايق من الـ talk أونلاين (Zoom أو OBS).', 'Record 5 minutes of the talk online (Zoom or OBS).'),
        B('اكتب 3 أسئلة تفاعل للشات.', 'Write 3 chat interaction prompts.'),
        B('اكتب وصف فيديو بـ chapters ولينكات.', 'Write a video description with chapters and links.')
      ],
      words: [
        W('webinar', 'محاضرة أونلاين', 'an online seminar', 'Join our webinar on Thursday.'),
        W('screen share', 'مشاركة الشاشة', 'showing your screen to others', 'Screen share only the browser window.'),
        W('mic check', 'اختبار الميكروفون', 'a quick microphone test', 'Do a mic check five minutes early.'),
        W('dry run', 'بروفة كاملة قبل الحقيقي', 'a full practice before the real thing', 'We did a dry run yesterday.'),
        W('captions', 'ترجمة/نص مكتوب على الفيديو', 'text of the speech shown on a video', 'Add captions for accessibility.')
      ],
      read: ['lib:Fireship (YouTube)', { lib: 'Google for Developers (YouTube)', what: B('لاحظ الطاقة والإيقاع في الفيديوهات القصيرة.', 'Notice the energy and rhythm in short videos.') }],
      challenge: B('سجّل الـ talk كاملة كفيديو (15 دقيقة) بإعداد تقني نضيف، ترجمة، وchapters — وانشرها أو شاركها مع 3 أشخاص واطلب ملاحظات SBI.', 'Record the full talk as a video (15 minutes) with a clean technical setup, captions and chapters — publish it or share it with 3 people and ask for SBI feedback.'),
      quiz: [
        Q(B('أونلاين الأهم:', 'Online, the most important is:'), ['clear sound', 'a fancy background', 'a 4K camera'], 0, B('الصوت.', 'Sound.')),
        Q(B('شارك:', 'Share:'), ['one window, not the whole screen', 'the whole screen with notifications', 'nothing'], 0, B('خصوصية.', 'Privacy.')),
        Q(B('captions بتساعد:', 'Captions help:'), ['everyone, including non-native listeners', 'nobody', 'only the speaker'], 0, B('وصول.', 'Accessibility.'))
      ] },

    { title: B('مراجعة الشهر التاسع ومشروعه', 'Month 9 review and project'),
      goal: B('متحدث وقائد بالإنجليزي.', 'A speaker and leader in English.'),
      review: [
        B('إدارة الاجتماعات من التحضير للمحضر (أسبوع 33).', 'Running meetings from preparation to minutes (week 33).'),
        B('الإقناع والاعتراضات والتفاوض والرفض المهذب (أسبوع 34).', 'Persuasion, objections, negotiation and polite refusal (week 34).'),
        B('الملاحظات والإرشاد والـ 1:1 (أسبوع 35).', 'Feedback, mentoring and 1:1s (week 35).'),
        B('تخطيط الـ talk، الشرايح، والإلقاء.', 'Planning the talk, slides and delivery.'),
        B('الديمو الآمن، الأسئلة، والعروض أونلاين.', 'The safe demo, Q&A and online talks.')
      ],
      project: B('مشروع الشهر التاسع: قدّم talk حقيقي 15–20 دقيقة بالإنجليزي (meetup، فريقك، أو تسجيل منشور) عن مشروع من الرحلة: big idea، شرايح بعناوين جمل، ديمو بخطة ب، Q&A — مع تسجيل، وملاحظات SBI من 3 أشخاص، وتقييم ذاتي، وخطة لـ talk تاني أحسن.', 'Month 9 project: give a real 15–20 minute talk in English (a meetup, your team, or a published recording) about a journey project: a big idea, sentence-title slides, a demo with a plan B and Q&A — with a recording, SBI feedback from 3 people, a self-assessment and a plan for a better second talk.'),
      test: [
        Q(B('agenda بـ timeboxes بتساعد في:', 'A timeboxed agenda helps:'), ['finishing on time', 'longer meetings', 'skipping decisions'], 0, B('وقت.', 'Time.')),
        Q(B('«Can everyone live with this?»:', '«Can everyone live with this?»:'), ['a consensus check', 'a joke', 'the opening'], 0, B('توافق.', 'Consensus.')),
        Q(B('PREP:', 'PREP:'), ['point, reason, example, point', 'prepare, rest, eat, play', 'plan, report, end, post'], 0, B('حجة.', 'An argument.')),
        Q(B('«If you…, we can…»:', '«If you…, we can…»:'), ['a negotiation trade', 'a refusal', 'a greeting'], 0, B('مقايضة.', 'A trade.')),
        Q(B('SBI:', 'SBI:'), ['situation, behaviour, impact', 'slides, budget, ideas', 'speak, breathe, improve'], 0, B('ملاحظات.', 'Feedback.')),
        Q(B('سؤال كوتشينج:', 'A coaching question:'), ['«What options do you see?»', '«Why are you so slow?»', '«Agree?»'], 0, B('مفتوح.', 'Open.')),
        Q(B('big idea:', 'The big idea:'), ['one sentence the audience remembers', 'the longest slide', 'the Q&A'], 0, B('واحدة.', 'One.')),
        Q(B('عنوان شريحة:', 'A slide title:'), ['a message sentence', 'one word', 'the slide number'], 0, B('رسالة.', 'A message.')),
        Q(B('الوقفة في الإلقاء:', 'A pause in delivery:'), ['shows confidence', 'shows fear', 'is a mistake'], 0, B('تأثير.', 'Impact.')),
        Q(B('backup recording:', 'A backup recording:'), ['saves you if the live demo fails', 'replaces the talk', 'is for the CFP'], 0, B('خطة ب.', 'Plan B.')),
        Q(B('سؤال مش عارف إجابته:', 'A question you cannot answer:'), ['«I don’t know — I’ll follow up.»', 'guess', 'ignore'], 0, B('صراحة.', 'Honesty.')),
        Q(B('أونلاين:', 'Online:'), ['share one window, mic check, chat prompts', 'whole screen, no mic test', 'no interaction'], 0, B('تجهيز.', 'Preparation.'))
      ] }
  ]
};
