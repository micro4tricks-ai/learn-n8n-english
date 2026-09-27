// Week 2 — The English sentence: subject, verb, object.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'A1',
  title: B('الجملة الإنجليزية: الفاعل والفعل والمفعول', 'The English sentence: subject, verb, object'),
  goal: B('تبني جملة إنجليزي سليمة من غير ما تترجم حرفيًا من العربي: الترتيب، وفعل to be، والأسماء وأدواتها، والسؤال، والنفي.',
          'Build a correct English sentence without translating word for word from Arabic: word order, the verb to be, nouns and articles, questions, and negatives.'),
  days: [
    { title: B('ترتيب الجملة وأقسام الكلام', 'Word order and parts of speech'),
      goal: B('تعرف أقسام الكلام وترتّب أي جملة: فاعل ← فعل ← مفعول.', 'Know the parts of speech and order any sentence: subject → verb → object.'),
      learn: [
        { h: B('أقسام الكلام في سطر', 'The parts of speech in one line'),
          p: B('noun اسم (file)، verb فعل (open)، adjective صفة (large)، adverb ظرف (quickly)، pronoun ضمير (it). لما تعرف نوع الكلمة، تعرف مكانها في الجملة.',
               'noun (file), verb (open), adjective (large), adverb (quickly), pronoun (it). When you know what kind of word it is, you know where it goes in the sentence.'),
          ex: 'The script   opens   the large file   quickly.\n  subject     verb     object          adverb' },
        'g:ترتيب الجملة: فاعل ← فعل ← مفعول',
        'g:متنساش الفعل to be',
        { h: B('الصفة قبل الاسم', 'The adjective comes before the noun'),
          p: B('بالعربي بنقول «ملف كبير»، وبالإنجليزي الصفة بتيجي الأول: a large file. ومفيش جمع للصفة: new files مش news files.',
               'In Arabic the adjective follows the noun; in English it comes first: a large file. Adjectives have no plural: new files, not "news files".'),
          ex: '✗ a file large      ✓ a large file\n✗ the users actives  ✓ the active users' }
      ],
      practice: [
        B('اكتب 10 كلمات من كودك وحدد نوع كل واحدة: noun ولا verb ولا adjective.', 'Write 10 words from your code and label each one: noun, verb or adjective.'),
        B('اكتب 5 جمل بالترتيب: فاعل ← فعل ← مفعول، عن حاجات عملتها النهارده على الكمبيوتر.', 'Write 5 sentences in subject → verb → object order about things you did on your computer today.'),
        B('صلّح الجمل دي: `The server slow.` و`I happy with the result.` و`This a bug.`', 'Fix these sentences: `The server slow.`, `I happy with the result.` and `This a bug.`'),
        B('اكتب 5 جمل فيها صفة قبل الاسم عن مشروعك (a small script, a new feature…).', 'Write 5 sentences with an adjective before a noun about your project (a small script, a new feature…).')
      ],
      code: [
        { u: B('قالب الجملة البسيطة', 'The simple sentence template'), p: '[Subject] + [verb] + [object] + [where / when].\nThe script sends an email every morning.\nMy function returns a list.' }
      ],
      words: ['noun', 'verb', 'adjective', 'adverb', 'subject', 'object (grammar)', 'predicate'],
      read: [{ lib: 'British Council LearnEnglish', what: B('افتح قسم Grammar ← A1-A2 واقرا درس «Word order» وحل التمرين.', 'Open Grammar → A1-A2, read the "Word order" lesson and do the exercise.') }],
      challenge: B('اشرح مشروعك في 5 جمل قصيرة بالترتيب الصح، ومن غير ما تنسى is/are. اقراهم بصوت عالي.', 'Describe your project in 5 short sentences in the right order, without forgetting is/are. Read them out loud.'),
      quiz: [
        { q: B('أنهي جملة ترتيبها صح؟', 'Which sentence has the right word order?'), o: ['Sends the script an email.', 'The script sends an email.', 'An email the script sends.'], a: 1, why: B('الترتيب: فاعل (The script) ← فعل (sends) ← مفعول (an email).', 'The order is subject (The script) → verb (sends) → object (an email).') },
        { q: B('إيه الناقص في: `The API slow today.`؟', 'What is missing in `The API slow today.`?'), o: [B('فعل to be: is', 'the verb to be: is'), B('أداة a', 'the article a'), B('حرف جر', 'a preposition')], a: 0, why: B('slow صفة، والصفة محتاجة فعل قبلها: The API is slow today.', 'slow is an adjective, so it needs a verb before it: The API is slow today.') },
        { q: B('في `a large file`، كلمة large نوعها إيه؟', 'In `a large file`, what is large?'), o: ['noun', 'adjective', 'adverb'], a: 1, why: B('large صفة بتوصف الاسم file، وبتيجي قبله.', 'large is an adjective describing the noun file, and it comes before it.') }
      ] },

    { title: B('to be وthere is وتوافق الفعل', 'to be, there is, and agreement'),
      goal: B('تستخدم is/are وthere is/there are صح، وتخلّي الفعل على قد الفاعل.', 'Use is/are and there is/there are correctly, and make the verb agree with the subject.'),
      learn: [
        'g:there is و there are',
        'g:توافق الفاعل مع الفعل',
        'g:جمع الأسماء: s وes وies',
        { h: B('am / is / are', 'am / is / are'),
          p: B('I am، وhe/she/it is، وwe/you/they are. وفي الشغل بنختصرها كتير: I\'m وit\'s وthey\'re.', 'I am; he/she/it is; we/you/they are. At work we often shorten them: I\'m, it\'s, they\'re.'),
          ex: 'I am on the backend team.\nThe tests are green.\nIt\'s ready for review.' }
      ],
      practice: [
        B('اكتب 5 جمل بـ There is و5 بـ There are عن حاجات في مشروعك (ملفات، أخطاء، مستخدمين).', 'Write 5 sentences with There is and 5 with There are about things in your project (files, errors, users).'),
        B('اكتب جمع 10 كلمات من كودك: file, class, query, library, box…', 'Write the plural of 10 words from your code: file, class, query, library, box…'),
        B('صلّح: `There is three errors.` و`The users is active.` و`Each file have a header.`', 'Fix: `There is three errors.`, `The users is active.` and `Each file have a header.`'),
        B('اوصف شاشة التطبيق اللي قدامك في 6 جمل بـ there is/are.', 'Describe the app screen in front of you in 6 sentences with there is/are.')
      ],
      words: ['singular / plural', 'countable / uncountable', 'article (a / an / the)', 'pronoun', 'preposition', 'conjunction', 'clause'],
      read: [{ lib: 'Perfect English Grammar', what: B('دوّر على «there is / there are» وحل تمرين واحد.', 'Search for "there is / there are" and do one exercise.') }],
      challenge: B('اكتب «جولة» في مشروعك لزميل جديد في 8 جمل: There is a folder called…، There are three scripts…', 'Write a tour of your project for a new teammate in 8 sentences: There is a folder called…, There are three scripts…'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['There is two bugs in this file.', 'There are two bugs in this file.', 'There be two bugs in this file.'], a: 1, why: B('two bugs جمع، فنستخدم There are.', 'two bugs is plural, so we use There are.') },
        { q: B('جمع query إيه؟', 'What is the plural of query?'), o: ['querys', 'queries', 'queryes'], a: 1, why: B('الكلمة اللي بتخلص بحرف ساكن + y بتبقى ies: query ← queries.', 'A word ending in consonant + y changes to ies: query → queries.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The tests is passing.', 'The tests are passing.', 'The tests am passing.'], a: 1, why: B('The tests جمع، فالفعل are.', 'The tests is plural, so the verb is are.') }
      ] },

    { title: B('الأسماء وa / an / the', 'Nouns and a / an / the'),
      goal: B('تختار a ولا an ولا the ولا من غير أداة، وتعرف الاسم المعدود من غير المعدود.', 'Choose a, an, the or no article, and tell countable from uncountable nouns.'),
      learn: [
        'g:a / an / the',
        'g:Countable و uncountable',
        'g:the مع الأسماء العامة',
        'g:جموع شاذة'
      ],
      practice: [
        B('حط a أو an قبل: error, API, user, hour, HTML file, update, SQL query.', 'Put a or an before: error, API, user, hour, HTML file, update, SQL query.'),
        B('اكتب 5 جمل عامة من غير the (Users like fast apps.) و5 جمل عن حاجة معيّنة بـ the.', 'Write 5 general sentences without the (Users like fast apps.) and 5 about something specific with the.'),
        B('قسّم الكلمات دي لمعدود وغير معدود: data, file, information, bug, software, feedback, email, advice.', 'Sort these into countable and uncountable: data, file, information, bug, software, feedback, email, advice.'),
        B('صلّح: `I need an informations.` و`The software are updated.` و`Give me some advices.`', 'Fix: `I need an informations.`, `The software are updated.` and `Give me some advices.`')
      ],
      words: ['phrase', 'vowel / consonant', 'syllable', 'capital letter', 'spelling', 'period / full stop .', 'comma ,'],
      read: [{ lib: 'Cambridge English Grammar Today', what: B('اقرا صفحة «Articles» ولاحظ الأمثلة بتاعة the مع الحاجات المعروفة.', 'Read the "Articles" page and notice the examples of the with known things.') }],
      challenge: B('اختار صفحة README لأي مشروع على GitHub، ولوّن كل a وan وthe فيها، واكتب ليه كل واحدة اتستخدمت.', 'Take the README of any GitHub project, highlight every a, an and the, and write why each one is used.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['a API', 'an API', 'the an API'], a: 1, why: B('API بتبدأ بصوت متحرك (ey)، فنقول an API.', 'API starts with a vowel sound (ay), so we say an API.') },
        { q: B('أنهي كلمة مش معدودة؟', 'Which word is uncountable?'), o: ['bug', 'information', 'file'], a: 1, why: B('information مش معدودة: مفيش informations، ونقول some information.', 'information is uncountable: there is no "informations"; we say some information.') },
        { q: B('اختار الصح لجملة عامة:', 'Choose the correct general sentence:'), o: ['The users hate slow apps.', 'Users hate slow apps.', 'A users hate slow apps.'], a: 1, why: B('لما نتكلم عن الناس عمومًا، منستخدمش the.', 'When we talk about people in general, we don\'t use the.') }
      ] },

    { title: B('السؤال بالإنجليزي', 'Asking questions'),
      goal: B('تسأل سؤال سليم: do/does/is في الأول، وكلمة السؤال قبلهم، ومن غير ما تسيب ترتيب الجملة العادي.', 'Ask a correct question: do/does/is first, the question word before them, not the normal sentence order.'),
      learn: [
        'g:Questions صح',
        'g:ترتيب السؤال',
        'g:الإجابات القصيرة',
        { h: B('كلمات السؤال', 'Question words'),
          p: B('What (إيه)، Where (فين)، When (إمتى)، Why (ليه)، How (إزاي)، Which (أنهي)، Who (مين)، How many / How much (كام).', 'What, Where, When, Why, How, Which, Who, How many / How much.'),
          ex: 'Where is the config file?\nHow do I run the tests?\nWhich version do you use?' }
      ],
      practice: [
        B('اكتب 8 أسئلة لزميل عن مشروعه، كل واحد بكلمة سؤال مختلفة.', 'Write 8 questions to a teammate about their project, each with a different question word.'),
        B('حوّل الجمل دي لأسئلة: `The build failed.` و`She uses Python.` و`The API is down.`', 'Turn these into questions: `The build failed.`, `She uses Python.` and `The API is down.`'),
        B('جاوب على 5 أسئلة yes/no بإجابات قصيرة: Yes, it is. / No, I don\'t.', 'Answer 5 yes/no questions with short answers: Yes, it is. / No, I don\'t.'),
        B('اكتب سؤال واحد كامل تسأله في مجتمع برمجة عن مشكلة حقيقية قابلتك.', 'Write one complete question you would post in a developer community about a real problem you had.')
      ],
      code: [
        { u: B('ترتيب السؤال', 'Question order'), p: '[Question word] + do / does / did / is / are + [subject] + [verb]?\nWhere do you store the logs?\nWhy does the job fail at night?' }
      ],
      words: ['question mark ?', 'How\'s it going?', 'Nice to meet you', 'pardon? / sorry?', 'excuse me', 'I\'m not sure', 'it depends'],
      read: [{ lib: 'Stack Overflow: How to ask a good question', what: B('اقرا الصفحة كلها ولاحظ الأسئلة اللي بيقترحوا تسألها لنفسك قبل ما تنشر.', 'Read the whole page and notice the questions they suggest you ask yourself before posting.') }],
      challenge: B('سجّل صوتك وانت بتسأل 5 أسئلة عن شغل حد، وبعدين اسمعها واتأكد إن do/does في مكانها.', 'Record yourself asking 5 questions about someone\'s work, then listen and check that do/does is in the right place.'),
      quiz: [
        { q: B('أنهي سؤال صح؟', 'Which question is correct?'), o: ['Where the logs are?', 'Where are the logs?', 'Where logs are they?'], a: 1, why: B('في السؤال، is/are بتيجي قبل الفاعل: Where are the logs?', 'In a question, is/are comes before the subject: Where are the logs?') },
        { q: B('أنهي سؤال صح؟', 'Which question is correct?'), o: ['Why the job fails?', 'Why does the job fail?', 'Why does the job fails?'], a: 1, why: B('بعد does الفعل بيرجع لأصله من غير s.', 'After does, the verb goes back to its base form without s.') },
        { q: B('إجابة قصيرة صح لـ `Do you use Git?`', 'A correct short answer to `Do you use Git?`'), o: ['Yes, I use.', 'Yes, I do.', 'Yes, I am.'], a: 1, why: B('الإجابة القصيرة بتكرر الفعل المساعد: Yes, I do.', 'A short answer repeats the helping verb: Yes, I do.') }
      ] },

    { title: B('النفي والضماير', 'Negatives and pronouns'),
      goal: B('تنفي جملة صح (مرة واحدة بس)، وتستخدم ضماير الفاعل والمفعول والملكية من غير لخبطة.', 'Make a sentence negative correctly (only once), and use subject, object and possessive pronouns without mixing them up.'),
      learn: [
        'g:النفي في الإنجليزي مرة واحدة',
        'g:ضمائر الفاعل والمفعول',
        'g:ضمائر الملكية: my وmine',
        'g:متكررش الضمير'
      ],
      practice: [
        B('انفي 6 جمل: `It works.` ← `It doesn\'t work.` و`I have access.` و`They fixed it.`…', 'Make 6 sentences negative: `It works.` → `It doesn\'t work.`, `I have access.`, `They fixed it.`…'),
        B('صلّح: `I don\'t have no access.` و`Me and him fixed it.` و`The server it is down.`', 'Fix: `I don\'t have no access.`, `Me and him fixed it.` and `The server it is down.`'),
        B('اكتب 5 جمل فيها my/your/their و5 فيها mine/yours/theirs.', 'Write 5 sentences with my/your/their and 5 with mine/yours/theirs.'),
        B('اكتب رسالة قصيرة لزميل بتقول فيها إيه اللي مش شغال عندك، من غير ما تستخدم not أكتر من مرة في الجملة.', 'Write a short message to a teammate saying what isn\'t working for you, never using not twice in one sentence.')
      ],
      words: ['no worries', 'actually', 'absolutely', 'by the way', 'take care', 'see you later / soon', 'pleasure (my pleasure)'],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «negatives» أو «pronouns» في قسم الجرامر، واقرا درس واحد وحل تمرينه.', 'Search the grammar section for "negatives" or "pronouns", read one lesson and do its exercise.') }],
      challenge: B('اكتب «حاجات مبعملهاش في الكود» في 6 جمل نفي (I don\'t hardcode passwords…)، وحط كل جملة على ورقة جنب الشاشة.', 'Write "things I don\'t do in my code" in 6 negative sentences (I don\'t hardcode passwords…), and stick them next to your screen.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I don\'t have no access.', 'I don\'t have any access.', 'I not have access.'], a: 1, why: B('الإنجليزي بينفي مرة واحدة: don\'t + any.', 'English negates only once: don\'t + any.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Me and Sara fixed it.', 'Sara and I fixed it.', 'Sara and me fixed it.'], a: 1, why: B('في مكان الفاعل نستخدم I، والأدب إن اسم التاني ييجي الأول.', 'In the subject position we use I, and politely the other person comes first.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['This laptop is my.', 'This laptop is mine.', 'This laptop is me.'], a: 1, why: B('من غير اسم بعدها، نستخدم mine.', 'With no noun after it, we use mine.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 3 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 3 opens when you score 70% or more.'),
      review: [
        B('ترتيب الجملة: فاعل ← فعل ← مفعول، والصفة قبل الاسم.', 'Word order: subject → verb → object, and the adjective before the noun.'),
        B('متنساش is/are قبل الصفة، وخلّي الفعل على قد الفاعل.', 'Don\'t forget is/are before an adjective, and make the verb agree with the subject.'),
        B('a قبل الصوت الساكن، وan قبل الصوت المتحرك، ومن غير the للكلام العام.', 'a before a consonant sound, an before a vowel sound, and no the for general statements.'),
        B('السؤال: كلمة السؤال ← do/does/is ← الفاعل ← الفعل.', 'Questions: question word → do/does/is → subject → verb.'),
        B('النفي مرة واحدة، وI في مكان الفاعل وme في مكان المفعول.', 'Negate only once; I as the subject, me as the object.')
      ],
      project: B('اكتب «About my project» بالإنجليزي في 12 جملة: المشروع إيه (is)، فيه إيه (there is/are)، بيعمل إيه (present simple)، إيه اللي لسه مش شغال (negatives)، و3 أسئلة عايز تسألها لحد أخبر منك. استخدم 10 كلمات على الأقل من كلمات الأسبوع.',
                 'Write "About my project" in English in 12 sentences: what the project is (is), what is in it (there is/are), what it does (present simple), what doesn\'t work yet (negatives), and 3 questions you want to ask someone more experienced. Use at least 10 of this week\'s words.'),
      test: [
        { q: B('أنهي جملة صح؟', 'Which sentence is correct?'), o: ['The database very big.', 'The database is very big.', 'The database are very big.'], a: 1, why: B('صفة بعد الفاعل المفرد: is.', 'An adjective after a singular subject needs is.') },
        { q: B('أنهي جملة صح؟', 'Which sentence is correct?'), o: ['I wrote a script simple.', 'I wrote a simple script.', 'I wrote simple a script.'], a: 1, why: B('الصفة قبل الاسم، والأداة قبل الاتنين.', 'The adjective comes before the noun, and the article before both.') },
        { q: B('اختار الأداة الصح: `I found ___ error in ___ login page.`', 'Choose the right articles: `I found ___ error in ___ login page.`'), o: ['a / a', 'an / the', 'the / an'], a: 1, why: B('an قبل error (صوت متحرك)، وthe لأن صفحة الدخول معروفة.', 'an before error (vowel sound), and the because the login page is a known one.') },
        { q: B('أنهي جملة صح؟', 'Which sentence is correct?'), o: ['There are an error in line 5.', 'There is an error in line 5.', 'It has an error in line 5 there.'], a: 1, why: B('خطأ واحد: There is an error.', 'One error: There is an error.') },
        { q: B('جمع library إيه؟', 'What is the plural of library?'), o: ['librarys', 'libraries', 'libraryes'], a: 1, why: B('حرف ساكن + y ← ies.', 'Consonant + y → ies.') },
        { q: B('أنهي كلمة مش معدودة؟', 'Which word is uncountable?'), o: ['feedback', 'commit', 'request'], a: 0, why: B('feedback مش معدودة: some feedback، مش a feedback.', 'feedback is uncountable: some feedback, not "a feedback".') },
        { q: B('أنهي سؤال صح؟', 'Which question is correct?'), o: ['How I can run the tests?', 'How can I run the tests?', 'How can run I the tests?'], a: 1, why: B('can بتيجي قبل الفاعل في السؤال.', 'can comes before the subject in a question.') },
        { q: B('أنهي سؤال صح؟', 'Which question is correct?'), o: ['What does this function return?', 'What this function returns?', 'What does this function returns?'], a: 0, why: B('does + الفاعل + الفعل في أصله.', 'does + subject + the base form of the verb.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The script doesn\'t send nothing.', 'The script doesn\'t send anything.', 'The script not sends anything.'], a: 1, why: B('نفي واحد (doesn\'t) ومعاه anything.', 'One negative (doesn\'t) with anything.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Can you send it to I?', 'Can you send it to me?', 'Can you send it to mine?'], a: 1, why: B('بعد حرف الجر to بنستخدم ضمير المفعول: me.', 'After the preposition to we use the object pronoun: me.') },
        { q: B('أنهي جملة صح؟', 'Which sentence is correct?'), o: ['The server it is down.', 'The server is down.', 'The server he is down.'], a: 1, why: B('متكررش الضمير بعد الفاعل.', 'Don\'t repeat a pronoun after the subject.') },
        { q: B('في `The function returns a list.`، إيه المفعول؟', 'In `The function returns a list.`, what is the object?'), o: ['The function', 'returns', 'a list'], a: 2, why: B('المفعول هو اللي الفعل بيقع عليه: a list.', 'The object is what the verb acts on: a list.') }
      ] }
  ]
};
