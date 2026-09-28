// Week 21 — Technical interviews.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B2 → C1',
  title: B('المقابلات التقنية', 'Technical interviews'),
  goal: B('تجهّز CV وcover letter بالإنجليزي، وتعدّي مقابلة: تعريف نفسك، وأسئلة السلوك بطريقة STAR، والجزء التقني وانت بتفكر بصوت عالي، وتسأل أسئلتك في الآخر.',
          'Prepare an English CV and cover letter, and get through an interview: introducing yourself, behavioural questions with STAR, the technical round while thinking aloud, and your own questions at the end.'),
  days: [
    { title: B('الـ CV', 'The CV'),
      goal: B('تكتب CV تقني بإنجليزي قوي: أفعال إنجاز، وأرقام، وسطر واحد لكل إنجاز.', 'Write a technical CV in strong English: achievement verbs, numbers, one line per achievement.'),
      learn: [
        { h: B('سطر الإنجاز', 'The achievement line'),
          p: B('فعل ماضي قوي + اللي عملته + النتيجة بالأرقام. من غير I ومن غير «Responsible for». Built، Automated، Reduced، Led، Migrated، Improved.', 'A strong past verb + what you did + the result in numbers. No "I", no "Responsible for". Built, Automated, Reduced, Led, Migrated, Improved.'),
          ex: '✗ Responsible for reports.\n✓ Automated weekly sales reports with n8n, saving 5 hours a week.\n✓ Reduced API errors by 60% by adding retries and alerts.' },
        { h: B('أقسام الـ CV', 'CV sections'),
          p: B('Name + job title + links، Summary (سطرين)، Skills، Experience (الأحدث الأول)، Projects، Education. صفحة واحدة لو خبرتك أقل من 5 سنين.', 'Name + job title + links, Summary (two lines), Skills, Experience (newest first), Projects, Education. One page if you have under 5 years of experience.'),
          ex: 'Automation Developer | n8n · Python · SQL\nSummary: Developer who builds reliable automations for small businesses.' },
        'g:Present perfect ولا past simple'
      ],
      practice: [
        B('اكتب 6 سطور إنجاز لشغلك أو مشاريعك بالقالب وبأرقام.', 'Write 6 achievement lines for your work or projects with the template and numbers.'),
        B('اكتب Summary من سطرين بالإنجليزي.', 'Write a two-line summary in English.'),
        B('حوّل 4 سطور «Responsible for…» لسطور إنجاز.', 'Turn 4 "Responsible for…" lines into achievement lines.'),
        B('اكتب cover letter من 3 فقرات لوظيفة حقيقية شايفها.', 'Write a three-paragraph cover letter for a real job ad you have seen.')
      ],
      words: ['resume / CV', 'cover letter', 'job title', 'position / role', 'vacancy / opening', 'apply / applicant', 'candidate'],
      read: [{ lib: 'Tech Interview Handbook', what: B('اقرا قسم «Resume» وطبّق 3 نصايح على الـ CV بتاعك.', 'Read the "Resume" section and apply 3 tips to your CV.') }],
      challenge: B('اكتب CV كامل بالإنجليزي من صفحة واحدة، وخلّي حد يقراه 30 ثانية ويقولك فاكر إيه.', 'Write a complete one-page English CV and ask someone to read it for 30 seconds and tell you what they remember.'),
      quiz: [
        { q: B('أحسن سطر CV:', 'The best CV line:'), o: ['Responsible for the database.', 'Migrated the database to Postgres, cutting query time by 40%.', 'I did database stuff.'], a: 1, why: B('فعل + عمل + نتيجة بالأرقام.', 'Verb + work + a result in numbers.') },
        { q: B('cover letter هو:', 'A cover letter is:'), o: [B('رسالة بتشرح ليه انت مناسب للوظيفة', 'a letter explaining why you fit the job'), B('غلاف الـ CV', 'the CV cover page'), B('عقد', 'a contract')], a: 0, why: B('بيتبعت مع الـ CV.', 'It goes with the CV.') },
        { q: B('في الـ CV، الخبرة بتترتب:', 'In a CV, experience is ordered:'), o: [B('الأحدث الأول', 'newest first'), B('الأقدم الأول', 'oldest first'), B('عشوائي', 'randomly')], a: 0, why: B('reverse chronological.', 'reverse chronological.') }
      ] },

    { title: B('مراحل التوظيف', 'The hiring process'),
      goal: B('تفهم مراحل التوظيف وكلامها، وتكتب رسايل للـ recruiter.', 'Understand the stages of hiring and their language, and write messages to recruiters.'),
      learn: [
        { h: B('المراحل', 'The stages'),
          p: B('Application ← HR screen (مكالمة قصيرة) ← technical round (كود أو تصميم) ← take-home task (مهمة في البيت) ← final round ← offer.', 'Application → HR screen (a short call) → technical round (coding or design) → take-home task → final round → offer.'),
          ex: 'I\'ve passed the HR screen, and the technical round is next Tuesday.' },
        { h: B('رسالة لـ recruiter', 'A message to a recruiter'),
          p: B('قصيرة ومحددة: الوظيفة، وليه مناسب في جملة، ولينك الـ CV. Hi Omar, I saw the Junior Automation Developer opening. I\'ve built 10+ n8n workflows for small businesses. Could we have a short call?', 'Short and specific: the role, why you fit in one sentence, and your CV link. Hi Omar, I saw the Junior Automation Developer opening. I\'ve built 10+ n8n workflows for small businesses. Could we have a short call?'),
          ex: 'Thank you for the update. I\'m available on Monday or Wednesday afternoon.' },
        { h: B('أنواع الشغل', 'Types of work'),
          p: B('full-time، part-time، freelance، internship، entry-level (بداية)، contract (مدة محددة)، remote.', 'full-time, part-time, freelance, internship, entry-level, contract (fixed term), remote.'),
          ex: 'I\'m looking for an entry-level, full-time role, but I\'m open to a paid internship.' }
      ],
      practice: [
        B('اكتب رسالة LinkedIn لـ recruiter عن وظيفة حقيقية.', 'Write a LinkedIn message to a recruiter about a real opening.'),
        B('اكتب رد على دعوة مقابلة فيه ميعادين متاحين.', 'Write a reply to an interview invitation with two available times.'),
        B('اكتب 5 جمل عن نوع الشغل اللي بتدوّر عليه.', 'Write 5 sentences about the kind of work you are looking for.'),
        B('اقرا 3 إعلانات وظايف واكتب Qualifications كل واحدة في 3 سطور.', 'Read 3 job ads and write each one\'s qualifications in 3 lines.')
      ],
      words: ['recruiter / HR', 'fresher / entry-level', 'internship', 'full-time / part-time', 'freelance', 'qualifications', 'degree'],
      read: [{ lib: 'LinkedIn Jobs', what: B('دوّر على وظيفة بمهاراتك واقرا الإعلان كله، وعلّم الكلمات الجديدة.', 'Search for a job with your skills, read the whole ad and mark the new words.') }],
      challenge: B('قدّم فعلًا على وظيفة واحدة بالإنجليزي (CV + cover letter أو رسالة).', 'Actually apply for one job in English (a CV + cover letter or a message).'),
      quiz: [
        { q: B('HR screen هو:', 'An HR screen is:'), o: [B('مكالمة أولى قصيرة مع الـ HR', 'a short first call with HR'), B('شاشة كمبيوتر', 'a computer screen'), B('اختبار كود', 'a coding test')], a: 0, why: B('أول مرحلة غالبًا.', 'Usually the first stage.') },
        { q: B('entry-level يعني:', 'entry-level means:'), o: [B('وظيفة للمبتدئين', 'a job for beginners'), B('وظيفة مدير', 'a manager role'), B('باب الدخول', 'an entrance')], a: 0, why: B('خبرة قليلة.', 'Little experience needed.') },
        { q: B('take-home task هي:', 'A take-home task is:'), o: [B('مهمة بتعملها في البيت وتسلّمها', 'a task you do at home and submit'), B('أكل تيك أواي', 'takeaway food'), B('أجازة', 'a holiday')], a: 0, why: B('جزء من المقابلة التقنية.', 'Part of the technical process.') }
      ] },

    { title: B('أسئلة السلوك بطريقة STAR', 'Behavioural questions with STAR'),
      goal: B('ترد على «Tell me about a time…» بقصة STAR قصيرة ومرتبة.', 'Answer "Tell me about a time…" with a short, well-ordered STAR story.'),
      learn: [
        { h: B('STAR', 'STAR'),
          p: B('Situation (الموقف، جملة)، Task (المطلوب منك)، Action (عملت إيه انت، أطول جزء)، Result (النتيجة بالأرقام + اتعلمت إيه). بالماضي البسيط، وبـ I مش we.', 'Situation (one sentence), Task (what you had to do), Action (what YOU did — the longest part), Result (the outcome in numbers + what you learned). Past simple, and "I", not "we".'),
          ex: 'S: Our daily report failed silently for a week.\nT: I had to find the cause and stop it happening again.\nA: I read the logs, found an expired token, and added an error workflow with Telegram alerts.\nR: We haven\'t missed a report since, and I now add alerts to every workflow.' },
        { h: B('تعريف نفسك', '"Tell me about yourself"'),
          p: B('60–90 ثانية: الحاضر (بتعمل إيه)، الماضي (إزاي وصلت)، المستقبل (ليه الوظيفة دي). مش قصة حياتك.', '60–90 seconds: present (what you do), past (how you got here), future (why this role). Not your life story.'),
          ex: 'I\'m an automation developer. I started with Python scripts for my family\'s shop, then moved to n8n. I\'d like to join a team where I can automate at a larger scale.' },
        { h: B('نقاط القوة والضعف', 'Strengths and weaknesses'),
          p: B('القوة بمثال: I\'m good at breaking big problems down — for example… والضعف حقيقي ومعاه خطة: I used to take on too much; now I estimate tasks and say no earlier.', 'A strength with an example: I\'m good at breaking big problems down — for example… A real weakness with a plan: I used to take on too much; now I estimate tasks and say no earlier.'),
          ex: 'My English writing was weak, so I\'ve been writing all my commits and docs in English for six months.' }
      ],
      practice: [
        B('اكتب 3 قصص STAR: مشكلة صعبة، وخلاف مع زميل، وحاجة فشلت.', 'Write 3 STAR stories: a hard problem, a disagreement with a colleague, and something that failed.'),
        B('اكتب وسجّل «Tell me about yourself» في 90 ثانية.', 'Write and record "Tell me about yourself" in 90 seconds.'),
        B('اكتب نقطة قوة ونقطة ضعف بأمثلة.', 'Write a strength and a weakness with examples.'),
        B('اكتب 7 جمل بكلمات النهارده عن خبرتك.', 'Write 7 sentences about your experience with today\'s words.')
      ],
      words: ['background', 'responsible for', 'achieve', 'improve', 'challenge', 'strength / weakness', 'collaborate'],
      read: [{ lib: 'Tech Interview Handbook', what: B('اقرا قسم «Behavioral interviews» والأسئلة الشائعة.', 'Read the "Behavioral interviews" section and the common questions.') }],
      challenge: B('خلّي حد يسألك 3 أسئلة سلوك عشوائي، ورد بـ STAR من غير ورقة، وسجّل.', 'Have someone ask you 3 random behavioural questions; answer with STAR without notes, and record it.'),
      quiz: [
        { q: B('أطول جزء في STAR:', 'The longest part of STAR:'), o: ['Situation', 'Action', 'Result'], a: 1, why: B('عملت إيه انت.', 'What you did.') },
        { q: B('في قصة STAR، الأحسن تقول:', 'In a STAR story, it is better to say:'), o: ['We did everything.', 'I found the cause and added alerts.', 'The team maybe did it.'], a: 1, why: B('دورك انت.', 'Your own role.') },
        { q: B('«Tell me about yourself» مدته المناسبة:', 'A good length for "Tell me about yourself":'), o: [B('دقيقة لدقيقة ونص', '60–90 seconds'), B('10 دقايق', '10 minutes'), B('جملة واحدة', 'one sentence')], a: 0, why: B('مختصر ومرتب.', 'Short and structured.') }
      ] },

    { title: B('الجزء التقني', 'The technical round'),
      goal: B('تفكر بصوت عالي بالإنجليزي وانت بتحل: تفهم السؤال، وتقول الفكرة، وتكتب، وتختبر، وتتكلم عن الـ complexity.', 'Think aloud in English while solving: understand the question, state the idea, code, test, and discuss complexity.'),
      learn: [
        { h: B('فكّر بصوت عالي', 'Think out loud'),
          p: B('1) Let me make sure I understand… (تعيد السؤال). 2) Can I assume…? (افتراضات). 3) My first idea is… (الفكرة). 4) Let me code it. 5) Let me test it with… 6) The time complexity is…', '1) Let me make sure I understand… (restate). 2) Can I assume…? (assumptions). 3) My first idea is… (approach). 4) Let me code it. 5) Let me test it with… 6) The time complexity is…'),
          ex: 'So the input is a sorted list and a target. Can I assume there are no duplicates?\nMy first idea is binary search, which is O(log n).' },
        { h: B('لو اتزنقت', 'If you get stuck'),
          p: B('I\'m stuck on… Could I get a hint? / Let me try a simpler case first. / A brute-force solution would be…, then I\'ll optimise. السكوت أسوأ من «مش عارف».', 'I\'m stuck on… Could I get a hint? / Let me try a simpler case first. / A brute-force solution would be…, then I\'ll optimise. Silence is worse than saying you\'re stuck.'),
          ex: 'A brute-force solution is O(n²). I think a set can make it O(n).' },
        { h: B('مصطلحات تقنية شائعة', 'Common technical terms'),
          p: B('binary search، sorting algorithm، tree / binary tree، graph، matrix، vector، DBMS / RDBMS.', 'binary search, sorting algorithm, tree / binary tree, graph, matrix, vector, DBMS / RDBMS.'),
          ex: 'I\'d store the rows in a relational database and index the email column.' }
      ],
      practice: [
        B('حل مسألة سهلة (two sum) وسجّل نفسك بتفكر بصوت عالي بالـ 6 خطوات.', 'Solve an easy problem (two sum) and record yourself thinking aloud through the 6 steps.'),
        B('اكتب 5 افتراضات ممكن تسأل عنها في مسألة.', 'Write 5 assumptions you might ask about in a problem.'),
        B('اشرح binary search في 4 جمل.', 'Explain binary search in 4 sentences.'),
        B('اكتب 3 جمل «لو اتزنقت» وقولها.', 'Write 3 "if I\'m stuck" sentences and say them.')
      ],
      words: ['tree / binary tree', 'graph (data structure)', 'binary search', 'sorting algorithm', 'matrix', 'vector', 'DBMS / RDBMS'],
      read: [{ lib: 'Exercism', what: B('حل تمرين واحد وانت بتكتب تعليق إنجليزي بتفكيرك قبل الكود.', 'Solve one exercise, writing an English comment with your thinking before the code.') }],
      challenge: B('اعمل mock interview تقني (25 دقيقة) مع صاحب أو لوحدك بتايمر، وسجّل الصوت، واكتب 3 حاجات تحسّنها.', 'Do a 25-minute mock technical interview with a friend or alone with a timer, record the audio, and write 3 things to improve.'),
      quiz: [
        { q: B('أول خطوة في مسألة المقابلة:', 'The first step in an interview problem:'), o: [B('تتأكد إنك فاهم السؤال', 'make sure you understand the question'), B('تكتب كود على طول', 'start coding at once'), B('تسكت', 'stay silent')], a: 0, why: B('restate + assumptions.', 'restate + assumptions.') },
        { q: B('لو اتزنقت:', 'If you get stuck:'), o: ['Stay silent for 5 minutes.', 'Say what you\'re stuck on and try a simpler case.', 'Give up.'], a: 1, why: B('خلّي تفكيرك مسموع.', 'Keep your thinking audible.') },
        { q: B('binary search بتشتغل على:', 'Binary search works on:'), o: [B('قايمة مرتبة', 'a sorted list'), B('أي قايمة', 'any list'), B('نص', 'a string only')], a: 0, why: B('بتقسم النص كل مرة.', 'It halves the search space each time.') }
      ] },

    { title: B('يوم المقابلة', 'Interview day'),
      goal: B('تبدأ المقابلة بـ small talk، وترد على أسئلة الخبرة، وتسأل أسئلتك، وتبعت شكر بعدها.', 'Start with small talk, answer experience questions, ask your own questions, and send a thank-you afterwards.'),
      learn: [
        { h: B('أسئلتك في الآخر', 'Your questions at the end'),
          p: B('What does a typical day look like? / How do you measure success in this role? / What\'s the biggest challenge for the team right now? / What are the next steps? ومتسألش عن المرتب في أول مقابلة.', 'What does a typical day look like? / How do you measure success in this role? / What\'s the biggest challenge for the team right now? / What are the next steps? Don\'t ask about salary in the first interview.'),
          ex: 'How does the team review code? / How is on-call organised?' },
        { h: B('إيميل الشكر', 'The thank-you email'),
          p: B('في نفس اليوم: شكر، وحاجة معينة عجبتك في الكلام، وجملة إنك متحمس. 4 سطور.', 'The same day: thanks, one specific thing you liked in the conversation, and a sentence saying you\'re excited. Four lines.'),
          ex: 'Thank you for your time today. I enjoyed hearing about how you use n8n for customer onboarding. I\'m excited about the role and look forward to the next steps.' },
        'g:look forward to + ing'
      ],
      practice: [
        B('اكتب 6 أسئلة هتسألها في آخر مقابلة.', 'Write 6 questions to ask at the end of an interview.'),
        B('اكتب إيميل شكر بعد مقابلة (حقيقية أو متخيّلة).', 'Write a thank-you email after an interview (real or imagined).'),
        B('اكتب 4 جمل small talk لأول دقيقة في المقابلة.', 'Write 4 small-talk sentences for the first minute of an interview.'),
        B('اكتب «competencies» بتاعتك: 5 soft skills بمثال لكل واحدة.', 'Write your competencies: 5 soft skills with an example each.')
      ],
      words: ['work experience', 'achievement', 'competencies / soft skills', 'aptitude test', 'technical round / HR round', 'group discussion', 'interviewer'],
      read: [{ lib: 'Microsoft Learn: Career paths', what: B('اختار career path قريب منك واقرا المهارات المطلوبة.', 'Pick a career path close to yours and read the required skills.') }],
      challenge: B('اعمل mock interview كاملة 30 دقيقة (تعريف + STAR + تقني + أسئلتك) وسجّلها، واكتب إيميل الشكر.', 'Do a full 30-minute mock interview (introduction + STAR + technical + your questions), record it, and write the thank-you email.'),
      quiz: [
        { q: B('سؤال كويس في آخر المقابلة:', 'A good question at the end of an interview:'), o: ['How much vacation do I get?', 'What does success look like in this role after six months?', 'No questions.'], a: 1, why: B('بيوري اهتمامك بالشغل.', 'It shows interest in the work.') },
        { q: B('إيميل الشكر بيتبعت:', 'The thank-you email is sent:'), o: [B('نفس اليوم', 'the same day'), B('بعد شهر', 'a month later'), B('مبيتبعتش', 'never')], a: 0, why: B('وانت لسه في دماغهم.', 'While you\'re still fresh in their minds.') },
        { q: B('soft skills زي:', 'Soft skills include:'), o: [B('التواصل والشغل في فريق', 'communication and teamwork'), B('Python', 'Python'), B('SQL', 'SQL')], a: 0, why: B('مهارات شخصية.', 'Personal skills.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 22 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 22 opens when you score 70% or more.'),
      review: [
        B('CV: فعل قوي + عمل + نتيجة بالأرقام.', 'CV: strong verb + work + a result in numbers.'),
        B('مراحل التوظيف، ورسالة الـ recruiter.', 'The hiring stages, and the recruiter message.'),
        B('STAR، وTell me about yourself، والقوة والضعف.', 'STAR, Tell me about yourself, and strengths and weaknesses.'),
        B('التفكير بصوت عالي بالـ 6 خطوات، ولو اتزنقت.', 'Thinking aloud in 6 steps, and what to say when stuck.'),
        B('أسئلتك في الآخر، وإيميل الشكر.', 'Your questions at the end, and the thank-you email.')
      ],
      project: B('جهّز «interview kit» كامل بالإنجليزي: CV صفحة، وcover letter لوظيفة حقيقية، و«Tell me about yourself» مكتوب ومسجّل، و5 قصص STAR، و5 أسئلة تسألها، وإيميل شكر. واعمل mock interview مسجّلة 30 دقيقة واكتب تقييمك لنفسك.',
                 'Build a complete English interview kit: a one-page CV, a cover letter for a real job, "Tell me about yourself" written and recorded, 5 STAR stories, 5 questions to ask, and a thank-you email. Do a recorded 30-minute mock interview and write your own evaluation.'),
      test: [
        { q: B('أحسن سطر CV:', 'The best CV line:'), o: ['I was responsible for testing.', 'Added 120 unit tests, raising coverage from 40% to 85%.', 'Testing things.'], a: 1, why: B('فعل ونتيجة بأرقام.', 'A verb and a result with numbers.') },
        { q: B('في الـ CV متكتبش:', 'In a CV, avoid:'), o: [B('I في أول كل سطر', '"I" at the start of every line'), B('أرقام', 'numbers'), B('أفعال ماضي', 'past verbs')], a: 0, why: B('الأسلوب المختصر.', 'The concise style.') },
        { q: B('internship هي:', 'An internship is:'), o: [B('تدريب في شركة', 'a training period at a company'), B('وظيفة مدير', 'a manager job'), B('امتحان', 'an exam')], a: 0, why: B('غالبًا للطلبة والمبتدئين.', 'Usually for students and beginners.') },
        { q: B('ترتيب STAR:', 'The STAR order:'), o: ['Situation, Task, Action, Result', 'Start, Test, Answer, Repeat', 'Story, Time, Action, Reason'], a: 0, why: B('S-T-A-R.', 'S-T-A-R.') },
        { q: B('نقطة ضعف كويسة في المقابلة:', 'A good weakness answer:'), o: ['I have no weaknesses.', 'I used to underestimate tasks; now I break them down and add a buffer.', 'I\'m lazy.'], a: 1, why: B('حقيقية ومعاها تحسين.', 'Real, with improvement.') },
        { q: B('أول جملة في المسألة التقنية:', 'The first sentence in a technical problem:'), o: ['Let me make sure I understand the input and output.', 'Here is the code.', 'I don\'t know.'], a: 0, why: B('تتأكد من السؤال.', 'Check the question.') },
        { q: B('«Can I assume the list is sorted?» ده:', '"Can I assume the list is sorted?" is:'), o: [B('سؤال عن افتراض', 'a question about an assumption'), B('غلط', 'a mistake'), B('إجابة', 'an answer')], a: 0, why: B('مهم تسأله.', 'Worth asking.') },
        { q: B('brute-force solution هو:', 'A brute-force solution is:'), o: [B('حل بسيط بيجرب كل حاجة', 'a simple solution that tries everything'), B('حل مثالي', 'the perfect solution'), B('خطأ', 'an error')], a: 0, why: B('بعدين تحسّنه.', 'Then you optimise.') },
        { q: B('في أول مقابلة متسألش عن:', 'In a first interview, don\'t ask about:'), o: [B('المرتب', 'salary'), B('طريقة شغل الفريق', 'how the team works'), B('الخطوات الجاية', 'next steps')], a: 0, why: B('بيتناقش في مرحلة الـ offer.', 'It is discussed at the offer stage.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I look forward to hear from you.', 'I look forward to hearing from you.', 'I looking forward to hear you.'], a: 1, why: B('to + ing.', 'to + -ing.') },
        { q: B('achievement هو:', 'An achievement is:'), o: [B('إنجاز', 'something you accomplished'), B('مهمة يومية', 'a daily task'), B('شهادة', 'a certificate')], a: 0, why: B('نتيجة ملموسة.', 'A tangible result.') },
        { q: B('«Tell me about yourself» ترتيبه:', 'The order for "Tell me about yourself":'), o: [B('الحاضر ← الماضي ← المستقبل', 'present → past → future'), B('الطفولة ← الجامعة', 'childhood → university'), B('الهوايات بس', 'hobbies only')], a: 0, why: B('مركز على الشغل.', 'Focused on work.') }
      ] }
  ]
};
