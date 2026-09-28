// Week 17 — Listening to technical videos.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1 → B2',
  title: B('الاستماع للفيديوهات التقنية', 'Listening to technical videos'),
  goal: B('تفهم فيديو أو بودكاست تقني بالإنجليزي: الفكرة العامة من أول مرة، والتفاصيل بالتدوين، وتتعلم منه كلمات الذكاء الاصطناعي والأتمتة، وتكتب ملخص.',
          'Understand a technical video or podcast in English: the main idea on the first listen, the details by taking notes, the AI and automation vocabulary it uses, and write a summary.'),
  days: [
    { title: B('الفكرة العامة أولًا', 'The main idea first'),
      goal: B('تسمع مرة للفكرة العامة من غير ما توقف، وتعرف كلمات الذكاء الاصطناعي الأساسية.', 'Listen once for the main idea without pausing, and learn the core AI words.'),
      learn: [
        { h: B('3 مرات استماع', 'Three listens'),
          p: B('المرة الأولى: من غير توقف ومن غير ترجمة، اكتب الموضوع في جملة. التانية: بالتوقف ودوّن الأرقام والأسماء. التالتة: بالترجمة الإنجليزية (subtitles) واتأكد.', 'First listen: no pausing, no translation — write the topic in one sentence. Second: pause and note numbers and names. Third: with English subtitles, to check.'),
          ex: 'Listen 1 → "The video explains what RAG is."\nListen 2 → 3 steps, 2 examples, one warning\nListen 3 → check the words you missed' },
        { h: B('كلمات الـ LLM', 'LLM words'),
          p: B('prompt = اللي بتكتبه للموديل، output = اللي بيرجعه، token = جزء كلمة بيتحسب عليه، context window = أقصى نص الموديل يشوفه، hallucination = إجابة واثقة وغلط.', 'prompt = what you write to the model, output = what it returns, token = a piece of a word it counts, context window = the most text it can see, hallucination = a confident, wrong answer.'),
          ex: 'The prompt is too long for the context window.\nThe model hallucinated a function that doesn\'t exist.' },
        'g:فعل بعد حرف جر = ing'
      ],
      practice: [
        B('اختار فيديو 5–10 دقايق عن الـ LLMs واسمعه مرة واكتب الموضوع في جملة.', 'Pick a 5–10 minute video about LLMs, listen once and write the topic in one sentence.'),
        B('اسمعه مرة تانية ودوّن 10 كلمات أو أرقام.', 'Listen again and note 10 words or numbers.'),
        B('اكتب 7 جمل، كل واحدة بكلمة من كلمات النهارده.', 'Write 7 sentences, each with one of today\'s words.'),
        B('اكتب 4 جمل فيها حرف جر + ing: before starting، after testing، instead of guessing.', 'Write 4 sentences with a preposition + -ing: before starting, after testing, instead of guessing.')
      ],
      words: ['prompt', 'model', 'token (AI)', 'context window', 'hallucination', 'output', 'accuracy'],
      read: [{ lib: 'Google Machine Learning Glossary', what: B('دوّر على 5 كلمات من كلمات النهارده واقرا تعريفها.', 'Look up 5 of today\'s words and read their definitions.') }],
      challenge: B('اكتب ملخص للفيديو في 5 جمل من غير ما ترجع له، وبعدين قارن باللي فاته.', 'Write a 5-sentence summary of the video without going back to it, then compare with what you missed.'),
      quiz: [
        { q: B('في أول مرة استماع:', 'On the first listen:'), o: [B('متوقفش، اسمع للفكرة العامة', 'don\'t pause; listen for the main idea'), B('ترجم كل كلمة', 'translate every word'), B('شغّل على سرعة 2x', 'play at 2x speed')], a: 0, why: B('الـ gist الأول.', 'The gist first.') },
        { q: B('hallucination في الـ AI:', 'A hallucination in AI is:'), o: [B('إجابة واثقة بس غلط', 'a confident but wrong answer'), B('صورة', 'an image'), B('خطأ syntax', 'a syntax error')], a: 0, why: B('الموديل بيألّف.', 'The model makes something up.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Before start, read the docs.', 'Before starting, read the docs.', 'Before to start, read the docs.'], a: 1, why: B('حرف جر + ing.', 'preposition + -ing.') }
      ] },

    { title: B('التدوين والتفاصيل', 'Note-taking and details'),
      goal: B('تدوّن وانت بتسمع (كلمات مفتاحية مش جمل)، وتفهم كلمات الـ RAG والـ agents.', 'Take notes while listening (keywords, not sentences), and understand the words of RAG and agents.'),
      learn: [
        { h: B('التدوين السريع', 'Quick notes'),
          p: B('اكتب أسماء وأرقام وأفعال بس، واستخدم أسهم ورموز: → (يؤدي لـ)، ≠، ↑ ↓، vs. متكتبش جمل كاملة وانت بتسمع.', 'Write names, numbers and verbs only, with arrows and symbols: → (leads to), ≠, ↑ ↓, vs. Don\'t write full sentences while listening.'),
          ex: 'RAG = retrieve docs → add to prompt → answer\nfine-tune: $$$, slow ↔ RAG: cheap, fresh data' },
        { h: B('كلمات الـ RAG', 'RAG words'),
          p: B('embedding = تمثيل النص كأرقام، dataset / training data، fine-tuning = تدريب إضافي، inference = تشغيل الموديل، agent = موديل بيستخدم أدوات، RAG = يجيب معلومات ويضيفها للـ prompt.', 'embedding = text as numbers, dataset / training data, fine-tuning = extra training, inference = running the model, agent = a model that uses tools, RAG = fetch information and add it to the prompt.'),
          ex: 'We store embeddings in a vector database.\nThe agent calls a search tool before it answers.' },
        'g:some و any'
      ],
      practice: [
        B('اسمع فيديو عن RAG ودوّن بالرموز بس، وبعدين اكتب من تدوينك 6 جمل.', 'Listen to a video about RAG, take notes with symbols only, then write 6 sentences from your notes.'),
        B('اشرح الفرق بين RAG وfine-tuning في 4 جمل.', 'Explain the difference between RAG and fine-tuning in 4 sentences.'),
        B('اكتب 4 جمل بـ some و4 بـ any عن بيانات وموديلات.', 'Write 4 sentences with some and 4 with any about data and models.'),
        B('اكتب قايمة 10 رموز تدوين وبتعني إيه.', 'Write a list of 10 note-taking symbols and what they mean.')
      ],
      words: ['fine-tuning', 'embedding', 'inference', 'training data', 'dataset', 'agent', 'RAG'],
      read: [{ lib: 'Hugging Face Learn', what: B('افتح أي كورس واقرا مقدمة الفصل الأول.', 'Open any course and read the introduction of the first chapter.') }],
      challenge: B('اسمع حلقة بودكاست تقني (15 دقيقة) ودوّن، واكتب «5 things I learned».', 'Listen to a 15-minute tech podcast episode, take notes, and write "5 things I learned".'),
      quiz: [
        { q: B('في التدوين وانت بتسمع:', 'While taking notes as you listen:'), o: [B('كلمات مفتاحية ورموز', 'keywords and symbols'), B('جمل كاملة', 'full sentences'), B('ترجمة عربي', 'an Arabic translation')], a: 0, why: B('عشان تلحق.', 'So you can keep up.') },
        { q: B('RAG بتعمل:', 'RAG:'), o: [B('تجيب معلومات وتحطها في الـ prompt', 'fetches information and adds it to the prompt'), B('تدرّب موديل من الأول', 'trains a model from scratch'), B('تمسح بيانات', 'deletes data')], a: 0, why: B('retrieval-augmented generation.', 'retrieval-augmented generation.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Do you have some questions?', 'Do you have any questions?', 'Do you have any question?'], a: 1, why: B('any في السؤال العام.', 'any in general questions.') }
      ] },

    { title: B('إشارات المتحدث', 'The speaker\'s signposts'),
      goal: B('تلقط الكلمات اللي بتقول «جاي تعريف» أو «ده مهم» أو «هنلخّص»، وتفهم كلمات الأتمتة.', 'Catch the words that say "a definition is coming", "this matters" or "let\'s sum up", and understand automation vocabulary.'),
      learn: [
        { h: B('signposting', 'Signposting'),
          p: B('So, what is X? (تعريف جاي) / The key point is… (مهم) / For example,… / On the other hand,… (مقارنة) / To sum up,… (ملخص) / Let\'s move on to… (موضوع جديد).', 'So, what is X? (a definition is coming) / The key point is… (important) / For example,… / On the other hand,… (a contrast) / To sum up,… (a summary) / Let\'s move on to… (a new topic).'),
          ex: '"The key point is that the webhook must respond quickly.\nTo sum up, keep the workflow short and retry on failure."' },
        { h: B('كلمات الأتمتة', 'Automation words'),
          p: B('workflow، node، trigger (اللي بيبدأ)، execution (مرة تشغيل)، credential (بيانات دخول محفوظة)، temperature (عشوائية الموديل)، bias (انحياز).', 'workflow, node, trigger (what starts it), execution (one run), credential (saved login details), temperature (how random the model is), bias.'),
          ex: 'The trigger fires every hour and starts a new execution.\nA lower temperature gives more predictable output.' },
        'g:الضمائر الانعكاسية (myself)'
      ],
      practice: [
        B('اسمع فيديو واكتب كل signpost سمعته والوقت بتاعه.', 'Listen to a video and write down every signpost you hear, with its time.'),
        B('اكتب 7 جمل بكلمات الأتمتة عن workflow عندك.', 'Write 7 sentences with automation words about one of your workflows.'),
        B('اكتب 4 جمل بـ myself / itself: The workflow retries itself.', 'Write 4 sentences with myself / itself: The workflow retries itself.'),
        B('جهّز شرح دقيقة لـ workflow بتستخدم فيه 4 signposts.', 'Prepare a one-minute explanation of a workflow using 4 signposts.')
      ],
      words: ['temperature', 'bias', 'workflow', 'node', 'trigger', 'execution', 'credential'],
      read: [{ lib: 'n8n Docs', what: B('اقرا صفحة عن «Workflows» ولاحظ الـ signposts في الشرح.', 'Read a page about "Workflows" and notice the signposts in the explanation.') }],
      challenge: B('اسمع فيديو n8n بالإنجليزي، ولما يخلص قول بصوت عالي «To sum up…» واختم بملخص 3 جمل.', 'Watch an English n8n video, and when it ends say "To sum up…" out loud and give a 3-sentence summary.'),
      quiz: [
        { q: B('«To sum up» معناها:', '"To sum up" means:'), o: [B('هنلخّص', 'let\'s summarise'), B('هنجمع أرقام', 'let\'s add numbers'), B('هنبدأ', 'let\'s start')], a: 0, why: B('بداية الملخص.', 'The start of a summary.') },
        { q: B('trigger في الأتمتة:', 'A trigger in automation is:'), o: [B('اللي بيبدأ الـ workflow', 'what starts the workflow'), B('آخر خطوة', 'the last step'), B('خطأ', 'an error')], a: 0, why: B('webhook، schedule، event.', 'webhook, schedule, event.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I taught me Python.', 'I taught myself Python.', 'I taught mine Python.'], a: 1, why: B('نفس الشخص: myself.', 'The same person: myself.') }
      ] },

    { title: B('السرعة واللهجات', 'Speed and accents'),
      goal: B('تتعامل مع الكلام السريع واللهجات المختلفة: السرعة، والـ shadowing، وتسمع لهجات متنوعة، وكلمات الـ n8n المتقدمة.', 'Deal with fast speech and different accents: speed, shadowing, varied accents, and advanced n8n words.'),
      learn: [
        { h: B('ابدأ بطيء وزوّد', 'Start slow, then speed up'),
          p: B('اسمع بـ 0.75x لحد ما تفهم 80%، وبعدين 1x. واسمع لهجات مختلفة: أمريكي وبريطاني وهندي وأوروبي، لأن فريقك هيبقى من كل حتة.', 'Listen at 0.75x until you understand 80%, then 1x. Listen to different accents — American, British, Indian, European — because your team will come from everywhere.'),
          ex: 'Week plan: 2 videos at 0.75x → 2 at 1x → 1 without subtitles' },
        { h: B('Shadowing', 'Shadowing'),
          p: B('شغّل جملة، ووقّف، وكررها بنفس السرعة والنغمة، وبعدين شغّل مع المتحدث وقول معاه. 10 دقايق في اليوم بتفرق في الفهم والنطق.', 'Play a sentence, pause, repeat it with the same speed and tone, then speak along with the speaker. Ten minutes a day improves both listening and pronunciation.'),
          ex: '"So what we\'re gonna do is set up a webhook."\n→ so-what-we\'re-gonna-do-is…' },
        { h: B('كلام الـ n8n المتقدم', 'Advanced n8n words'),
          p: B('item، mapping (توصيل الحقول)، polling (فحص دوري)، idempotent (تشغيله مرتين نفس النتيجة)، sub-workflow، error workflow، integration.', 'item, mapping (connecting fields), polling (checking regularly), idempotent (running it twice gives the same result), sub-workflow, error workflow, integration.'),
          ex: 'Make the workflow idempotent, so a retry doesn\'t create duplicate orders.' }
      ],
      practice: [
        B('اسمع نفس الفيديو بـ 0.75x وبعدين 1x، واكتب نسبة فهمك كل مرة.', 'Listen to the same video at 0.75x and then 1x, and write down how much you understood each time.'),
        B('اعمل shadowing لـ 5 جمل من فيديو تقني وسجّل نفسك.', 'Shadow 5 sentences from a tech video and record yourself.'),
        B('اسمع متحدث بلهجة مختلفة عن اللي متعود عليها 10 دقايق.', 'Listen for 10 minutes to a speaker with an accent you\'re not used to.'),
        B('اشرح idempotent بمثال من شغلك.', 'Explain idempotent with an example from your work.')
      ],
      words: ['item', 'idempotent', 'mapping', 'integration', 'polling', 'sub-workflow', 'error workflow'],
      read: [{ lib: 'YouGlish', what: B('دوّر على «idempotent» و«workflow» واسمعهم من 5 متحدثين مختلفين.', 'Search for "idempotent" and "workflow" and hear them from 5 different speakers.') }],
      challenge: B('اختار دقيقة من فيديو تقني واعمل لها shadowing لحد ما تقولها مع المتحدث من غير ما تتأخر، وسجّل آخر محاولة.', 'Take one minute of a tech video and shadow it until you can say it with the speaker without falling behind; record your last try.'),
      quiz: [
        { q: B('shadowing هو:', 'Shadowing is:'), o: [B('تكرر ورا المتحدث بنفس السرعة والنغمة', 'repeating after the speaker with the same speed and tone'), B('تسمع في الضلمة', 'listening in the dark'), B('تترجم', 'translating')], a: 0, why: B('للنطق والفهم.', 'For pronunciation and listening.') },
        { q: B('idempotent يعني:', 'idempotent means:'), o: [B('تشغيله أكتر من مرة بيدي نفس النتيجة', 'running it more than once gives the same result'), B('سريع', 'fast'), B('مش شغال', 'not working')], a: 0, why: B('مهم مع retries.', 'Important with retries.') },
        { q: B('polling يعني:', 'polling means:'), o: [B('فحص دوري لو في جديد', 'checking regularly for something new'), B('تصويت', 'voting'), B('حذف', 'deleting')], a: 0, why: B('عكس الـ webhook.', 'The opposite of a webhook.') }
      ] },

    { title: B('من الفيديو للملخص', 'From video to summary'),
      goal: B('تكتب ملخص فيديو تقني منظم، وتتكلم عن الأمان والويب بكلماتهم.', 'Write an organised summary of a tech video, and talk about security and the web with their words.'),
      learn: [
        { h: B('قالب الملخص', 'The summary template'),
          p: B('The video explains… (الموضوع). The speaker first… then… (الترتيب). The key point is… (أهم نقطة). I didn\'t fully understand… (صراحة). I\'ll try… (تطبيق).', 'The video explains… (topic). The speaker first… then… (order). The key point is… (main point). I didn\'t fully understand… (honesty). I\'ll try… (action).'),
          ex: 'The video explains how webhooks work in n8n.\nThe speaker first compares webhooks with polling, then builds a small demo.\nThe key point is to respond quickly and process later.' },
        { h: B('كلام أمان وويب', 'Security and web words'),
          p: B('webhook، 2FA، phishing (رسائل نصب)، selector (في CSS)، props (في React)، responsive (بيتظبط على الشاشات)، automation.', 'webhook, 2FA, phishing (scam messages), selector (in CSS), props (in React), responsive (fits any screen), automation.'),
          ex: 'Turn on 2FA for every account that has production access.\nThis email is phishing: the link goes to a fake login page.' },
        'g:جمع الاختصارات'
      ],
      practice: [
        B('اكتب ملخص بالقالب لفيديو شفته الأسبوع ده.', 'Write a templated summary of a video you watched this week.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.'),
        B('اكتب جمع 5 اختصارات صح: APIs، PRs، URLs (من غير apostrophe).', 'Write the plural of 5 abbreviations correctly: APIs, PRs, URLs (no apostrophe).'),
        B('اعمل قايمة «watch later» فيها 5 فيديوهات تقنية بالإنجليزي للشهر ده.', 'Make a "watch later" list of 5 English tech videos for this month.')
      ],
      words: ['webhook', 'two-factor authentication (2FA)', 'phishing', 'props', 'selector', 'responsive', 'automation'],
      read: [{ lib: 'Fireship', what: B('شوف فيديو «in 100 seconds» عن تقنية جديدة عليك واكتب ملخص بالقالب.', 'Watch a "in 100 seconds" video about a technology that\'s new to you and write a templated summary.') }],
      challenge: B('ابدأ «listening log»: كل يوم فيديو أو بودكاست، واكتب الرابط والملخص في 3 سطور، لمدة 7 أيام.', 'Start a listening log: one video or podcast a day, with the link and a 3-line summary, for 7 days.'),
      quiz: [
        { q: B('أول جملة في الملخص:', 'The first sentence of the summary:'), o: ['The video explains…', 'I hate this video.', 'At minute 3…'], a: 0, why: B('الموضوع الأول.', 'The topic first.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We have three API\'s.', 'We have three APIs.', 'We have three APIes.'], a: 1, why: B('جمع الاختصار بـ s من غير apostrophe.', 'An abbreviation plural takes s without an apostrophe.') },
        { q: B('phishing هو:', 'phishing is:'), o: [B('رسايل نصب بتسرق بيانات الدخول', 'scam messages that steal login details'), B('صيد سمك', 'fishing'), B('فحص أمان', 'a security scan')], a: 0, why: B('احذر من الروابط.', 'Beware of the links.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 18 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 18 opens when you score 70% or more.'),
      review: [
        B('3 مرات استماع: الفكرة، التفاصيل، التأكيد.', 'Three listens: the idea, the details, the check.'),
        B('التدوين بالكلمات المفتاحية والرموز.', 'Notes with keywords and symbols.'),
        B('signposts: So what is…، The key point is…، To sum up…', 'Signposts: So what is…, The key point is…, To sum up…'),
        B('السرعة 0.75x ← 1x، والـ shadowing، واللهجات.', 'Speed 0.75x → 1x, shadowing, and accents.'),
        B('كلمات AI والأتمتة والأمان، وقالب الملخص.', 'AI, automation and security words, and the summary template.')
      ],
      project: B('اختار 3 فيديوهات أو بودكاست تقني (واحد عن AI، وواحد عن أتمتة، وواحد عن أي تقنية)، واعمل لكل واحد: تدوين، وملخص بالقالب، و5 كلمات جديدة بجمل، ودقيقة shadowing مسجّلة. وسجّل ملخص صوتي واحد (دقيقتين) لأحسن فيديو.',
                 'Pick 3 tech videos or podcasts (one about AI, one about automation, one about any technology), and for each make notes, a templated summary, 5 new words in sentences, and a recorded minute of shadowing. Then record a two-minute spoken summary of the best one.'),
      test: [
        { q: B('أول مرة استماع هدفها:', 'The first listen is for:'), o: [B('الفكرة العامة', 'the main idea'), B('كل كلمة', 'every word'), B('الأرقام بس', 'the numbers only')], a: 0, why: B('gist.', 'the gist.') },
        { q: B('context window هو:', 'The context window is:'), o: [B('أقصى نص الموديل يقدر يشوفه', 'the most text the model can see at once'), B('شباك البرنامج', 'the program window'), B('الـ prompt الأول', 'the first prompt')], a: 0, why: B('بالـ tokens.', 'Measured in tokens.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Instead of guess, test it.', 'Instead of guessing, test it.', 'Instead to guess, test it.'], a: 1, why: B('حرف جر + ing.', 'preposition + -ing.') },
        { q: B('embedding هو:', 'An embedding is:'), o: [B('تمثيل النص كأرقام', 'text represented as numbers'), B('صورة جوه صفحة', 'an image inside a page'), B('باسورد', 'a password')], a: 0, why: B('vectors.', 'vectors.') },
        { q: B('agent في الـ AI:', 'An AI agent:'), o: [B('موديل بيستخدم أدوات عشان ينفّذ مهمة', 'a model that uses tools to do a task'), B('موظف مبيعات', 'a sales agent'), B('فيروس', 'a virus')], a: 0, why: B('بيقرر وينادي أدوات.', 'It decides and calls tools.') },
        { q: B('«On the other hand» بتقول إن جاي:', '"On the other hand" signals:'), o: [B('مقارنة أو رأي عكسي', 'a contrast'), B('مثال', 'an example'), B('النهاية', 'the end')], a: 0, why: B('الجانب التاني.', 'The other side.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The job restarts itself after a crash.', 'The job restarts himself after a crash.', 'The job restarts it after itself.'], a: 0, why: B('للحاجة: itself.', 'For a thing: itself.') },
        { q: B('lower temperature بتدي:', 'A lower temperature gives:'), o: [B('output أكتر ثبات وتوقع', 'more predictable output'), B('output عشوائي أكتر', 'more random output'), B('موديل أسرع', 'a faster model')], a: 0, why: B('أقل عشوائية.', 'Less randomness.') },
        { q: B('shadowing بيحسّن:', 'Shadowing improves:'), o: [B('الاستماع والنطق', 'listening and pronunciation'), B('الكتابة بس', 'writing only'), B('الكود', 'code')], a: 0, why: B('بتقلّد المتحدث.', 'You imitate the speaker.') },
        { q: B('الـ webhook عكس:', 'A webhook is the opposite of:'), o: ['polling', 'a node', 'an item'], a: 0, why: B('webhook = يبلّغك، polling = انت تسأل.', 'A webhook notifies you; with polling you ask.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Two URL\'s are broken.', 'Two URLs are broken.', 'Two URL are broken.'], a: 1, why: B('URLs.', 'URLs.') },
        { q: B('«I didn\'t fully understand…» في الملخص:', '"I didn\'t fully understand…" in a summary is:'), o: [B('صراحة بتساعدك تعرف تراجع إيه', 'honest, and shows what to review'), B('غلط تكتبه', 'wrong to write'), B('نكتة', 'a joke')], a: 0, why: B('جزء من القالب.', 'Part of the template.') }
      ] }
  ]
};
