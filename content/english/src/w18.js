// Week 18 — Pronunciation and intonation.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1 → B2',
  title: B('النطق والتنغيم', 'Pronunciation and intonation'),
  goal: B('تنطق مصطلحات الشغل صح وتتفهم من أول مرة: الضغط على المقطع الصح، والأصوات اللي بتتلخبط عند العرب، والرموز التقنية، ونغمة الجملة، والكلام المتصل.',
          'Pronounce work terms correctly and be understood the first time: stressing the right syllable, the sounds Arabic speakers mix up, technical symbols, sentence intonation, and connected speech.'),
  days: [
    { title: B('الضغط على المقطع', 'Word stress'),
      goal: B('تحط الضغط على المقطع الصح في كلمات الشغل، وتعرف إن الضغط بيغيّر المعنى أحيانًا.', 'Put the stress on the right syllable in work words, and know that stress sometimes changes the meaning.'),
      learn: [
        { h: B('الضغط بيفرق', 'Stress matters'),
          p: B('لو الضغط غلط، الكلمة ممكن متتفهمش حتى لو الأصوات صح. dePLOY مش DEploy، deVELoper، ALgorithm، aNALysis، DAta أو DAYta.', 'With the wrong stress, a word may not be understood even if the sounds are right. dePLOY, not DEploy; deVELoper; ALgorithm; aNALysis; DAta or DAYta.'),
          ex: 'deVELoper   ALgorithm   configuRAtion\nauthentiCAtion   inFRAstructure   enVIronment' },
        { h: B('اسم ولا فعل', 'Noun or verb'),
          p: B('في كلمات الضغط بيتنقل: REcord (اسم) / reCORD (فعل)، PROgress / proGRESS، OBject / obJECT، PERmit / perMIT، INcrease / inCREASE.', 'In some words the stress moves: REcord (noun) / reCORD (verb), PROgress / proGRESS, OBject / obJECT, PERmit / perMIT, INcrease / inCREASE.'),
          ex: 'We need to reCORD the call. The REcord is in the database.' },
        { h: B('اسمع في القاموس', 'Check in the dictionary'),
          p: B('في Cambridge وOxford علامة ˈ قبل المقطع المضغوط: /dɪˈplɔɪ/. ودوس على الصوت US وقلّده 3 مرات.', 'Cambridge and Oxford put ˈ before the stressed syllable: /dɪˈplɔɪ/. Click the US audio and copy it three times.'),
          ex: '/ˈæl.ɡə.rɪ.ðəm/  →  AL-go-ri-thm' }
      ],
      practice: [
        B('اكتب 15 كلمة شغل وحط خط تحت المقطع المضغوط، واتأكد من القاموس.', 'Write 15 work words, underline the stressed syllable, and check in a dictionary.'),
        B('قول 5 أزواج اسم/فعل بصوت عالي وسجّلهم.', 'Say 5 noun/verb pairs out loud and record them.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.'),
        B('اسمع كلمة developer في YouGlish من 5 متحدثين وقلّدهم.', 'Hear "developer" from 5 speakers on YouGlish and copy them.')
      ],
      words: ['synonym / antonym', 'prefix / suffix', 'idiom', 'slang / jargon', 'formal / informal', 'active voice', 'passive voice'],
      read: [{ lib: 'Cambridge Dictionary', what: B('دوّر على 10 كلمات شغل واسمع النطق الأمريكي وشوف علامة الضغط.', 'Look up 10 work words, listen to the US pronunciation and find the stress mark.') }],
      challenge: B('سجّل نفسك وانت بتقول 20 مصطلح تقني، وقارن بالقاموس، وصلّح 5 كنت بتقولهم غلط.', 'Record yourself saying 20 technical terms, compare with the dictionary, and fix 5 you were saying wrong.'),
      quiz: [
        { q: B('الضغط في developer على:', 'The stress in developer is on:'), o: ['DE-', '-VEL-', '-ER'], a: 1, why: B('deVELoper.', 'deVELoper.') },
        { q: B('record كفعل بتتنطق:', 'record as a verb is pronounced:'), o: ['REcord', 'reCORD', 'RECORD'], a: 1, why: B('الفعل الضغط على التاني.', 'The verb stresses the second syllable.') },
        { q: B('علامة ˈ في القاموس معناها:', 'The ˈ mark in a dictionary means:'), o: [B('المقطع اللي بعدها مضغوط', 'the next syllable is stressed'), B('حرف ساكت', 'a silent letter'), B('نهاية الكلمة', 'the end of the word')], a: 0, why: B('primary stress.', 'primary stress.') }
      ] },

    { title: B('الأصوات اللي بتتلخبط', 'Sounds that get mixed up'),
      goal: B('تفرّق بين p/b وv/f وth، وبين الكلمات اللي شكلها أو صوتها قريب.', 'Tell p/b, v/f and th apart, and distinguish words that look or sound alike.'),
      learn: [
        'g:p و b / v و f',
        { h: B('th', 'The th sounds'),
          p: B('th ليها صوتين: /θ/ مكتوم زي «ث» (think، thread، method)، و/ð/ مجهور زي «ذ» (the، this، that). متنطقهاش s أو z أو t.', 'th has two sounds: voiceless /θ/ (think, thread, method) and voiced /ð/ (the, this, that). Don\'t say it as s, z or t.'),
          ex: 'three threads   /θriː θredz/\nthis method      /ðɪs ˈmeθ.əd/' },
        { h: B('كلمات بتتلخبط في النطق', 'Words that sound alike'),
          p: B('quite /kwaɪt/ (جدًا) و quiet /ˈkwaɪ.ət/ (هادي)، breath /breθ/ (اسم) و breathe /briːð/ (فعل)، lead /liːd/ (يقود) و led /led/ (ماضي).', 'quite /kwaɪt/ and quiet /ˈkwaɪ.ət/, breath /breθ/ (noun) and breathe /briːð/ (verb), lead /liːd/ (to guide) and led /led/ (past).'),
          ex: 'The office is quiet, and the build was quite fast.' }
      ],
      practice: [
        B('قول 10 أزواج p/b وv/f بصوت عالي (pug/bug، vile/file، very/ferry).', 'Say 10 p/b and v/f pairs out loud (pug/bug, vile/file, very/ferry).'),
        B('قول 10 كلمات بـ th وسجّلهم: thread، method، authentication، the، this…', 'Say 10 th words and record them: thread, method, authentication, the, this…'),
        B('اكتب جملة لكل زوج من كلمات النهارده بيوضح الفرق.', 'Write a sentence for each pair in today\'s words that shows the difference.'),
        B('خلّي حد يسمعك وانت بتقول «bug» و«pug» عشوائي ويقولك قلت أنهي.', 'Ask someone to listen as you say "bug" and "pug" in random order and tell you which you said.')
      ],
      words: ['through / threw', 'quite / quiet', 'breath / breathe', 'lead / led', 'raw / roar', 'bear / bare', 'dearth / death'],
      read: [{ lib: 'Rachel\'s English (YouTube)', what: B('شوف فيديو عن صوت «th» وقلّد التمارين.', 'Watch a video about the "th" sound and copy the exercises.') }],
      challenge: B('اقرا فقرة تقنية فيها p وb وv وf وth كتير وسجّلها، وبعدين اسمعها بعد يوم وعلّم الأصوات الغلط.', 'Read a technical paragraph full of p, b, v, f and th and record it; listen the next day and mark the wrong sounds.'),
      quiz: [
        { q: B('bug بتبدأ بـ:', 'bug starts with:'), o: ['/b/', '/p/', '/f/'], a: 0, why: B('/b/ مجهور، الأحبال الصوتية بتهتز.', '/b/ is voiced; the vocal cords vibrate.') },
        { q: B('th في method بتتنطق زي:', 'th in method sounds like:'), o: [B('ث', 'the sound in "think"'), B('س', 's'), B('ت', 't')], a: 0, why: B('/θ/.', '/θ/.') },
        { q: B('«The room is ___» (هادي):', '"The room is ___" (not noisy):'), o: ['quite', 'quiet', 'quit'], a: 1, why: B('quiet = هادي.', 'quiet = not noisy.') }
      ] },

    { title: B('الرموز والمصطلحات الصعبة', 'Symbols and tricky terms'),
      goal: B('تنطق الرموز والمصطلحات اللي بتتقال غلط كتير: queue، suite، sudo، cache، GUI، SQL.', 'Pronounce symbols and commonly mispronounced terms: queue, suite, sudo, cache, GUI, SQL.'),
      learn: [
        { h: B('مصطلحات بتتقال غلط', 'Often-mispronounced terms'),
          p: B('queue = /kjuː/ زي حرف Q. suite = /swiːt/ زي sweet. cache = /kæʃ/ زي cash. sudo = /ˈsuː.duː/. GUI = /ˈɡuː.i/. SQL = S-Q-L أو sequel. Linux = /ˈlɪn.əks/. char = /tʃɑːr/ أو /kɛər/.', 'queue = /kjuː/ like the letter Q. suite = /swiːt/ like sweet. cache = /kæʃ/ like cash. sudo = /ˈsuː.duː/. GUI = /ˈɡuː.i/. SQL = S-Q-L or "sequel". Linux = /ˈlɪn.əks/.'),
          ex: 'The job is in the queue.\nClear the cache.\nRun the test suite.' },
        { h: B('اقرا الرموز', 'Reading symbols'),
          p: B('@ at، # hash، / slash، \\ backslash، . dot، _ underscore، - dash/hyphen، ~ tilde، | pipe، & ampersand، ! bang/exclamation.', '@ at, # hash, / slash, \\ backslash, . dot, _ underscore, - dash/hyphen, ~ tilde, | pipe, & ampersand, ! bang/exclamation.'),
          ex: 'my_app.config.js  → my underscore app dot config dot J-S\nhttps://api.site.com/v2 → H-T-T-P-S colon slash slash api dot site dot com slash v two' },
        { h: B('الصوت والنص', 'Speech and text'),
          p: B('text-to-speech بيحوّل النص لصوت، وspeech recognition بيحوّل الصوت لنص، وOCR بيقرا الكلام من الصور.', 'text-to-speech turns text into voice, speech recognition turns voice into text, and OCR reads text from images.'),
          ex: 'We use speech recognition to create a transcript of each call.' }
      ],
      practice: [
        B('قول 10 مصطلحات من القايمة بصوت عالي واسمعهم من YouGlish.', 'Say 10 terms from the list out loud and hear them on YouGlish.'),
        B('اقرا بصوت عالي 3 URLs و3 مسارات ملفات وإيميلين.', 'Read out loud 3 URLs, 3 file paths and 2 email addresses.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.'),
        B('جرّب أداة text-to-speech على جملة إنجليزي وقارن نطقها بنطقك.', 'Try a text-to-speech tool on an English sentence and compare it with your pronunciation.')
      ],
      words: ['queue', 'width / height', 'sudo', 'spam / eggs', 'OCR', 'text-to-speech', 'speech recognition'],
      read: [{ lib: 'Forvo', what: B('دوّر على 5 مصطلحات تقنية واسمع نطقها من متحدثين أصليين.', 'Look up 5 technical terms and hear native speakers pronounce them.') }],
      challenge: B('اقرا بصوت عالي إعدادات مشروعك (URLs، مسارات، أسماء متغيّرات) كأنك بتمليها لزميل على التليفون.', 'Read your project settings out loud (URLs, paths, variable names) as if dictating them to a teammate on the phone.'),
      quiz: [
        { q: B('queue بتتنطق زي:', 'queue is pronounced like:'), o: [B('حرف Q', 'the letter Q'), B('كيو-يو', '"kyoo-yoo"'), B('كوي', '"kwee"')], a: 0, why: B('/kjuː/.', '/kjuː/.') },
        { q: B('cache بتتنطق زي:', 'cache is pronounced like:'), o: ['cash', 'catch', 'cake'], a: 0, why: B('/kæʃ/.', '/kæʃ/.') },
        { q: B('_ اسمها:', '_ is called:'), o: ['underscore', 'dash', 'hyphen'], a: 0, why: B('underscore.', 'underscore.') }
      ] },

    { title: B('نغمة الجملة', 'Sentence stress and intonation'),
      goal: B('تضغط على الكلمات المهمة في الجملة، وتستخدم النغمة الطالعة والنازلة صح.', 'Stress the important words in a sentence and use rising and falling intonation correctly.'),
      learn: [
        { h: B('الكلمات المهمة بتتضغط', 'Content words get the stress'),
          p: B('الأسماء والأفعال والصفات والأرقام بتتضغط، والكلمات الصغيرة (a، the، to، of) بتتقال بسرعة وخفيف. The BUILD FAILED on the STAGING SERVER.', 'Nouns, verbs, adjectives and numbers are stressed; small words (a, the, to, of) are quick and light. The BUILD FAILED on the STAGING SERVER.'),
          ex: 'I DIDN\'T say he BROKE it. (the meaning changes with the stressed word)\nWe need it by FRIDAY, not Monday.' },
        { h: B('النغمة', 'Intonation'),
          p: B('سؤال yes/no النغمة بتطلع ↗: Is it ready? ↗. سؤال wh- والجمل العادية بتنزل ↘: Where\'s the log? ↘. والقوايم: كل بند طالع والأخير نازل.', 'Yes/no questions rise ↗: Is it ready? ↗. Wh- questions and statements fall ↘: Where\'s the log? ↘. Lists: every item rises, the last one falls.'),
          ex: 'We need Python ↗, Docker ↗, and Postgres ↘.' },
        { h: B('مصطلحات القواعد بتتنطق إزاي', 'Saying grammar terms'),
          p: B('CONditional، reLAtive CLAUSE، compArative، suPERlative، agreement، TRANscript، MIcrophone.', 'conDItional, RElative clause, comPArative, suPERlative, aGREEment, TRANscript, MIcrophone.'),
          ex: 'This sentence has a RElative clause.' }
      ],
      practice: [
        B('خد 5 جمل من stand-up بتاعك وحط خط تحت الكلمات المضغوطة وقولها.', 'Take 5 sentences from your stand-up, underline the stressed words and say them.'),
        B('قول 5 أسئلة yes/no و5 wh- بالنغمة الصح وسجّلهم.', 'Say 5 yes/no and 5 wh- questions with the right intonation and record them.'),
        B('قول قايمة من 4 أدوات بالنغمة الصح.', 'Say a list of 4 tools with the right intonation.'),
        B('قول «I didn\'t say he broke it» 4 مرات بضغط مختلف واكتب المعنى كل مرة.', 'Say "I didn\'t say he broke it" 4 times with different stress and write the meaning each time.')
      ],
      words: ['microphone input', 'transcript', 'comparative / superlative', 'relative clause', 'conditional', 'subject-verb agreement', 'run-on sentence'],
      read: [{ lib: 'BBC Learning English (YouTube)', what: B('دوّر على فيديو عن «intonation» أو «sentence stress» وقلّد الأمثلة.', 'Find a video about "intonation" or "sentence stress" and copy the examples.') }],
      challenge: B('سجّل نفسك وانت بتقرا transcript دقيقة من فيديو تقني بنفس نغمة المتحدث، وقارن الاتنين.', 'Record yourself reading a one-minute transcript of a tech video with the speaker\'s intonation, and compare the two.'),
      quiz: [
        { q: B('في «The build failed on staging»، الكلمات المضغوطة:', 'In "The build failed on staging", the stressed words are:'), o: ['build, failed, staging', 'the, on', 'The, on, build'], a: 0, why: B('الكلمات اللي فيها المعنى.', 'The content words.') },
        { q: B('«Is it ready?» النغمة:', 'The intonation of "Is it ready?":'), o: [B('طالعة ↗', 'rising ↗'), B('نازلة ↘', 'falling ↘'), B('ثابتة', 'flat')], a: 0, why: B('سؤال yes/no.', 'A yes/no question.') },
        { q: B('«Where is the log?» النغمة:', 'The intonation of "Where is the log?":'), o: [B('نازلة ↘', 'falling ↘'), B('طالعة ↗', 'rising ↗'), B('طالعة جدًا', 'very high')], a: 0, why: B('سؤال wh-.', 'A wh- question.') }
      ] },

    { title: B('الكلام المتصل والراحة', 'Connected speech and wellbeing'),
      goal: B('تفهم وتستخدم الكلام المتصل (gonna، wanna، lemme)، وتتكلم عن التعب والراحة في الشغل.', 'Understand and use connected speech (gonna, wanna, lemme), and talk about tiredness and rest at work.'),
      learn: [
        { h: B('الكلام المتصل', 'Connected speech'),
          p: B('في الكلام السريع: going to ← gonna، want to ← wanna، let me ← lemme، did you ← didja، what are you ← whatcha. افهمهم لما تسمعهم، واكتبهم كامل في الشغل.', 'In fast speech: going to → gonna, want to → wanna, let me → lemme, did you → didja, what are you → whatcha. Understand them when you hear them; write them in full at work.'),
          ex: '"Lemme check the logs." = Let me check the logs.\n"Whatcha working on?" = What are you working on?' },
        'g:feel good و feel well',
        { h: B('التعب والراحة', 'Tiredness and rest'),
          p: B('I\'m exhausted. / I need a short break. / I\'m a bit stressed about the release. / I have a headache, I\'ll log off early. / Let\'s take five.', 'I\'m exhausted. / I need a short break. / I\'m a bit stressed about the release. / I have a headache, I\'ll log off early. / Let\'s take five.'),
          ex: 'I\'ve been coding for 4 hours; I\'m going to stretch and take a break.' }
      ],
      practice: [
        B('اسمع فيديو غير رسمي ولقط 5 أمثلة كلام متصل واكتبهم كامل.', 'Listen to an informal video, catch 5 examples of connected speech and write them in full.'),
        B('قول 5 جمل بـ gonna/wanna/lemme بسرعة طبيعية.', 'Say 5 sentences with gonna/wanna/lemme at natural speed.'),
        B('اكتب رسالة لمديرك إنك تعبان ومحتاج تخلّص بدري، بأدب.', 'Write a polite message to your manager saying you\'re unwell and need to finish early.'),
        B('اكتب 4 جمل بـ feel good / feel well / feel better.', 'Write 4 sentences with feel good / feel well / feel better.')
      ],
      words: ['sentence fragment', 'stretch', 'take a break', 'headache', 'tired / exhausted', 'stress / stressed', 'exercise / work out'],
      read: [{ lib: 'ELSA Speak', what: B('جرّب تمرين نطق واحد مجاني فيه على أصوات صعبة عليك.', 'Try one free pronunciation exercise on sounds that are hard for you.') }],
      challenge: B('سجّل «فويس نوت» دقيقة لزميل متخيّل عن يومك (فيها gonna وwanna بشكل طبيعي)، وبعدين اكتبها بالإنجليزي الرسمي.', 'Record a one-minute voice note to an imagined teammate about your day (using gonna and wanna naturally), then write it in formal English.'),
      quiz: [
        { q: B('gonna معناها:', 'gonna means:'), o: ['going to', 'got a', 'go now'], a: 0, why: B('في الكلام السريع.', 'In fast speech.') },
        { q: B('في إيميل شغل تكتب:', 'In a work email you write:'), o: ['I\'m gonna send it.', 'I\'m going to send it.', 'Im gona send it.'], a: 1, why: B('اكتب كامل في الكتابة.', 'Write it in full.') },
        { q: B('اختار الصح لو مريض:', 'If you are ill:'), o: ['I don\'t feel good at coding.', 'I don\'t feel well today.', 'I don\'t feel goodly.'], a: 1, why: B('well = صحة.', 'well = health.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 19 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 19 opens when you score 70% or more.'),
      review: [
        B('الضغط على المقطع: deVELoper، ALgorithm، REcord/reCORD.', 'Word stress: deVELoper, ALgorithm, REcord/reCORD.'),
        B('p/b، v/f، وth بصوتين، والكلمات المتشابهة.', 'p/b, v/f, the two th sounds, and look-alike words.'),
        B('queue، suite، cache، sudo، وقراءة الرموز والـ URLs.', 'queue, suite, cache, sudo, and reading symbols and URLs.'),
        B('الكلمات المهمة بتتضغط، والنغمة طالعة لـ yes/no ونازلة لـ wh-.', 'Content words are stressed; intonation rises for yes/no and falls for wh-.'),
        B('gonna / wanna / lemme في السمع، وكامل في الكتابة.', 'gonna / wanna / lemme when listening, in full when writing.')
      ],
      project: B('اعمل «pronunciation check» لنفسك: سجّل قراءة 3 دقايق لنص تقني (README أو توثيق) فيه 30 مصطلح، واعمل قايمة بالكلمات اللي كانت غلط وصحّها من القاموس، وسجّل تاني بعد 3 أيام وقارن التسجيلين. وسجّل كمان stand-up بالنغمة الصح.',
                 'Do a pronunciation check on yourself: record a 3-minute reading of a technical text (a README or docs) containing 30 terms, list the words you got wrong and correct them with a dictionary, record again after 3 days and compare. Also record a stand-up with the right intonation.'),
      test: [
        { q: B('الضغط في algorithm على:', 'The stress in algorithm is on:'), o: ['AL-', '-GO-', '-RI-'], a: 0, why: B('ALgorithm.', 'ALgorithm.') },
        { q: B('progress كفعل:', 'progress as a verb:'), o: ['PROgress', 'proGRESS', 'PROGRESS'], a: 1, why: B('الفعل على التاني.', 'The verb stresses the second syllable.') },
        { q: B('في «file» أول صوت:', 'The first sound in "file":'), o: ['/f/', '/v/', '/p/'], a: 0, why: B('f مكتوم.', 'f is voiceless.') },
        { q: B('th في «this» بتتنطق زي:', 'th in "this" sounds like:'), o: [B('ذ', 'the sound in "that"'), B('ز', 'z'), B('د', 'd')], a: 0, why: B('/ð/ مجهور.', 'voiced /ð/.') },
        { q: B('breathe (فعل) بتتنطق:', 'breathe (verb) is pronounced:'), o: ['/briːð/', '/breθ/', '/brɪθ/'], a: 0, why: B('الفعل بـ ee وذ.', 'The verb has a long ee and a voiced th.') },
        { q: B('suite بتتنطق زي:', 'suite is pronounced like:'), o: ['sweet', 'suit', 'site'], a: 0, why: B('/swiːt/.', '/swiːt/.') },
        { q: B('~ اسمها:', '~ is called:'), o: ['tilde', 'dash', 'pipe'], a: 0, why: B('tilde.', 'tilde.') },
        { q: B('في «We need it by FRIDAY»، التركيز على:', 'In "We need it by FRIDAY", the focus is on:'), o: [B('الموعد', 'the day'), B('we', 'we'), B('it', 'it')], a: 0, why: B('الكلمة المضغوطة = المهمة.', 'The stressed word is the important one.') },
        { q: B('قايمة «Python, Docker, and Postgres» النغمة:', 'The intonation of "Python, Docker, and Postgres":'), o: [B('طالعة ثم نازلة في الآخر', 'rising, then falling on the last item'), B('نازلة كلها', 'falling throughout'), B('طالعة كلها', 'rising throughout')], a: 0, why: B('القايمة بتخلص بنزول.', 'A list ends with a fall.') },
        { q: B('«Lemme check» معناها:', '"Lemme check" means:'), o: ['Let me check.', 'Lemon check.', 'Leave me check.'], a: 0, why: B('let me.', 'let me.') },
        { q: B('speech recognition بتعمل:', 'speech recognition:'), o: [B('تحوّل الصوت لنص', 'turns speech into text'), B('تحوّل النص لصوت', 'turns text into speech'), B('تترجم', 'translates')], a: 0, why: B('عكس text-to-speech.', 'The opposite of text-to-speech.') },
        { q: B('«Let\'s take five» معناها:', '"Let\'s take five" means:'), o: [B('نرتاح 5 دقايق', 'let\'s have a five-minute break'), B('ناخد 5 مهام', 'let\'s take 5 tasks'), B('نمشي الساعة 5', 'let\'s leave at 5')], a: 0, why: B('استراحة قصيرة.', 'A short break.') }
      ] }
  ]
};
