// n8n week 17 — LLMs and prompts.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متقدم', 'Advanced'),
  title: B('الـ LLMs والـ Prompts', 'LLMs and prompts'),
  goal: B('تستخدم نماذج اللغة في n8n صح: تفهم الـ tokens والتكلفة والإعدادات، وتكتب prompts واضحة بأمثلة، وتطلّع JSON مضمون الشكل، وتصنّف وتلخّص، وتقيس الجودة قبل ما تسلّم.',
          'Use language models in n8n properly: understand tokens, cost and settings, write clear prompts with examples, get JSON in a guaranteed shape, classify and summarise, and measure quality before you deliver.'),
  days: [
    { title: B('إزاي الـ LLM بيشتغل', 'How an LLM works'),
      goal: B('تفهم الـ tokens والـ context window والـ temperature، وتختار موديل مناسب.', 'Understand tokens, the context window and temperature, and choose a suitable model.'),
      learn: [
        { h: B('الـ tokens', 'Tokens'),
          p: B('الموديل بيقرا ويكتب tokens (أجزاء كلمات). الكلمة الإنجليزي حوالي 1–2 token، والعربي غالبًا أكتر. التكلفة والحدود بالـ tokens: اللي داخل واللي خارج.', 'A model reads and writes tokens (pieces of words). An English word is about 1–2 tokens; Arabic usually more. Cost and limits are counted in tokens, both in and out.'),
          ex: 'Input: 1,200 tokens + Output: 300 tokens → the price of 1,500 tokens' },
        { h: B('context window', 'The context window'),
          p: B('أقصى عدد tokens الموديل يشوفه مرة واحدة (السؤال + الملفات + الرد). لو عدّيته، لازم تلخّص أو تقسّم أو تستخدم RAG.', 'The most tokens a model can see at once (the question + documents + the reply). If you exceed it, summarise, split or use RAG.'),
          ex: 'A 300-page PDF may not fit → split it or use RAG (week 19)' },
        { h: B('temperature واختيار الموديل', 'Temperature and choosing a model'),
          p: B('temperature قليلة (0–0.3) = إجابات ثابتة (استخراج، تصنيف). أعلى = إبداع (كتابة). الموديلات الكبيرة أذكى وأغلى، والصغيرة أسرع وأرخص؛ ابدأ بالصغير وارتقي لو احتجت.', 'Low temperature (0–0.3) = consistent answers (extraction, classification). Higher = creativity (writing). Big models are smarter and pricier; small ones faster and cheaper. Start small and move up if needed.'),
          ex: 'Classification: small model, temperature 0\nMarketing copy: bigger model, temperature 0.7' }
      ],
      practice: [
        B('اعمل credential لموديل (Anthropic أو OpenAI أو Gemini أو Ollama محلي).', 'Create a credential for a model (Anthropic, OpenAI, Gemini or a local Ollama).'),
        B('اعمل Basic LLM Chain بسيط وجرّب نفس السؤال بـ temperature 0 و1.', 'Build a simple Basic LLM Chain and try the same question at temperature 0 and 1.'),
        B('احسب تقريبًا tokens نص عربي وإنجليزي بنفس المعنى.', 'Roughly count the tokens of an Arabic and an English text with the same meaning.'),
        B('اكتب جدول: 3 مهام وأنسب نوع موديل وtemperature لكل واحدة.', 'Write a table: 3 tasks with the best model size and temperature for each.')
      ],
      words: ['tokens', 'context window', 'temperature',
        { t: 'model provider', m: B('الشركة أو الخدمة اللي بتقدّم الموديل', 'the company or service offering the model'), ex: 'Anthropic, OpenAI, Google, Ollama' },
        { t: 'cost per token', m: B('سعر الموديل حسب عدد الـ tokens الداخلة والخارجة', 'a model\'s price by input and output tokens'), ex: 'Output tokens usually cost more.' }],
      read: ['lib:n8n Docs: Advanced AI', 'lib:Anthropic: Prompt engineering'],
      challenge: B('اعمل workflow بيبعت نفس الطلب لموديلين مختلفين، ويسجّل الوقت والـ tokens والنتيجة، واكتب مقارنة بالتكلفة والجودة.', 'Build a workflow that sends the same request to two different models, logs time, tokens and result, and write a cost/quality comparison.'),
      quiz: [
        { q: B('للتصنيف والاستخراج:', 'For classification and extraction:'), o: [B('temperature قليلة', 'a low temperature'), B('temperature عالية', 'a high temperature'), B('مش فارقة', 'it doesn\'t matter')], a: 0, why: B('ثبات.', 'Consistency.') },
        { q: B('ملف أكبر من الـ context window:', 'A document larger than the context window:'), o: [B('قسّم أو لخّص أو RAG', 'split, summarise or use RAG'), B('ابعته كله', 'send it all'), B('temperature أعلى', 'raise the temperature')], a: 0, why: B('مش هيدخل.', 'It won\'t fit.') },
        { q: B('التكلفة بتتحسب بـ:', 'Cost is calculated by:'), o: ['tokens', 'minutes', 'number of nodes'], a: 0, why: B('داخل + خارج.', 'In + out.') }
      ] },

    { title: B('كتابة prompt كويس', 'Writing a good prompt'),
      goal: B('تكتب prompts واضحة: دور، ومهمة، وسياق، وقواعد، وأمثلة، وشكل الرد.', 'Write clear prompts: role, task, context, rules, examples and output format.'),
      learn: [
        { h: B('هيكل الـ prompt', 'Prompt structure'),
          p: B('system message = مين انت وقواعدك الثابتة. user message = المهمة والبيانات. وافصل البيانات بعلامات واضحة (XML tags) عشان الموديل ميلخبطهاش بالتعليمات.', 'System message = who you are and your fixed rules. User message = the task and the data. Separate data with clear markers (XML tags) so the model doesn\'t confuse it with instructions.'),
          ex: 'System: You are a support assistant for Micro Shop. Reply in the customer\'s language. Never promise refunds.\nUser: <email>{{ $json.body }}</email>\nWrite a short, polite reply.' },
        { h: B('الأمثلة (few-shot)', 'Examples (few-shot)'),
          p: B('2–3 أمثلة مدخل ← مخرج بتحسّن النتيجة أكتر من شرح طويل. خلّيها متنوعة وبنفس الشكل اللي عايزه.', '2–3 input → output examples improve results more than long explanations. Keep them varied and in exactly the format you want.'),
          ex: 'Example 1: "Where is my order?" → category: shipping\nExample 2: "I was charged twice" → category: billing' },
        { h: B('قالب الـ prompt', 'Prompt templates'),
          p: B('خلّي الـ prompt في مكان واحد (Sheet أو node Settings) بـ placeholders، ورقّم النسخ (v1، v2) عشان تعرف أنهي أحسن.', 'Keep the prompt in one place (a sheet or a Settings node) with placeholders, and number the versions (v1, v2) so you know which works better.'),
          ex: 'prompt_v3: "Summarise <text>{text}</text> in {n} bullet points for a {audience}."' }
      ],
      practice: [
        B('اكتب system message لبوت دعم فيه 5 قواعد.', 'Write a system message for a support bot with 5 rules.'),
        B('ضيف 3 أمثلة few-shot لمهمة تصنيف.', 'Add 3 few-shot examples to a classification task.'),
        B('افصل البيانات بـ XML tags وقارن بدونها.', 'Separate the data with XML tags and compare with no tags.'),
        B('احفظ الـ prompt في Sheet كـ v1 واعمل v2 أحسن.', 'Save the prompt in a sheet as v1 and create a better v2.')
      ],
      words: ['system message',
        { t: 'few-shot examples', m: B('أمثلة مدخل ومخرج جوه الـ prompt', 'input-output examples inside the prompt'), ex: '3 examples before the real task' },
        { t: 'XML tags (delimiters)', m: B('علامات بتفصل البيانات عن التعليمات', 'markers separating data from instructions'), ex: '<email>…</email>' },
        { t: 'prompt template', m: B('prompt ثابت فيه أماكن بتتملى', 'a fixed prompt with fillable placeholders'), ex: 'Summarise {text} for {audience}' },
        { t: 'prompt versioning', m: B('ترقيم نسخ الـ prompt عشان تقارن', 'numbering prompt versions to compare them'), ex: 'prompt_v1, prompt_v2' }],
      read: ['lib:Prompt Engineering Interactive Tutorial', 'lib:Prompt Engineering Guide'],
      challenge: B('اعمل «reply drafter»: إيميل عميل ← رد مقترح بنبرة الشركة وقواعدها، والـ prompt في Sheet بنسخ، والرد بيروح لك تراجعه قبل ما يتبعت.', 'Build a "reply drafter": a customer email → a suggested reply in the company\'s tone and rules, with the prompt versioned in a sheet, and the reply sent to you for review before sending.'),
      quiz: [
        { q: B('قواعد ثابتة للبوت تتحط في:', 'Fixed rules for a bot go in:'), o: ['the system message', 'the user message only', 'the email'], a: 0, why: B('دايمة.', 'Always applied.') },
        { q: B('ليه XML tags حوالين البيانات؟', 'Why XML tags around the data?'), o: [B('عشان الموديل ميلخبطهاش بالتعليمات', 'so the model doesn\'t mistake it for instructions'), B('للشكل', 'for looks'), B('إجباري', 'required')], a: 0, why: B('فصل واضح.', 'Clear separation.') },
        { q: B('few-shot يعني:', 'few-shot means:'), o: [B('أمثلة في الـ prompt', 'examples in the prompt'), B('موديل صغير', 'a small model'), B('tokens قليلة', 'few tokens')], a: 0, why: B('تعلّم بالمثال.', 'Learning by example.') }
      ] },

    { title: B('مخرجات منظمة', 'Structured output'),
      goal: B('تخلّي الموديل يرجّع JSON بشكل ثابت تقدر تستخدمه في باقي الـ workflow.', 'Make the model return JSON in a fixed shape you can use in the rest of the workflow.'),
      learn: [
        { h: B('Output Parser', 'Output Parser'),
          p: B('في Basic LLM Chain فعّل Require Specific Output Format وحط Structured Output Parser بـ JSON schema أو مثال. الرد بيطلع حقول جاهزة بدل نص.', 'In the Basic LLM Chain turn on Require Specific Output Format and add a Structured Output Parser with a JSON schema or example. The reply comes out as ready fields instead of text.'),
          ex: '{ "type": "object", "properties": { "category": { "type": "string" }, "urgent": { "type": "boolean" } }, "required": ["category","urgent"] }' },
        { h: B('Information Extractor', 'Information Extractor'),
          p: B('node جاهز لاستخراج حقول من نص: تكتب اسم كل حقل ونوعه ووصفه. مثالي للفواتير والإيميلات والطلبات.', 'A ready node for pulling fields out of text: you give each field a name, type and description. Ideal for invoices, emails and orders.'),
          ex: 'Attributes: invoice_number (string), total (number), due_date (date, "YYYY-MM-DD")' },
        { h: B('لما الشكل يبوظ', 'When the shape breaks'),
          p: B('أحيانًا الموديل بيرجّع JSON ناقص. Auto-fixing Output Parser بيطلب منه يصلّح، واعمل IF بعدها يتحقق من الحقول المطلوبة، واللي فشل يروح للمراجعة.', 'Sometimes the model returns incomplete JSON. The Auto-fixing Output Parser asks it to fix it; add an IF afterwards checking the required fields, and send failures for review.'),
          ex: 'LLM → Auto-fixing parser → IF (total is a number) → else: review queue' }
      ],
      practice: [
        B('اعمل Basic LLM Chain بـ Structured Output Parser بيرجّع category وurgent.', 'Build a Basic LLM Chain with a Structured Output Parser returning category and urgent.'),
        B('استخدم Information Extractor على 5 إيميلات طلبات.', 'Use the Information Extractor on 5 order emails.'),
        B('اكتب وصف واضح لكل حقل وشوف الدقة اتحسنت.', 'Write a clear description for each field and see accuracy improve.'),
        B('ضيف IF يتحقق من الحقول ويودّي الفاشل للمراجعة.', 'Add an IF that checks the fields and sends failures for review.')
      ],
      words: ['Output Parser', 'Information Extractor',
        { t: 'Structured Output Parser', m: B('بيخلّي رد الموديل JSON بشكل محدد', 'makes the model\'s reply JSON in a defined shape'), ex: 'category, urgent' },
        { t: 'Auto-fixing Output Parser', m: B('بيطلب من الموديل يصلّح لو الشكل غلط', 'asks the model to fix its reply if the shape is wrong'), ex: 'Wrap the structured parser with it.' },
        { t: 'field description', m: B('وصف الحقل اللي بيساعد الموديل يطلّعه صح', 'a description helping the model extract a field correctly'), ex: 'due_date: "YYYY-MM-DD, or null"' }],
      read: [{ lib: 'n8n Docs: Advanced AI', what: B('اقرا عن Output Parsers وInformation Extractor.', 'Read about output parsers and the Information Extractor.') }],
      challenge: B('اعمل «invoice extractor» بـ AI: نص PDF فاتورة ← Information Extractor (رقم، تاريخ، مورّد، بنود، إجمالي) ← تحقق ← Postgres، والفاشل لمراجعة بشرية على Telegram.', 'Build an AI "invoice extractor": invoice PDF text → Information Extractor (number, date, supplier, lines, total) → validation → Postgres, with failures sent for human review on Telegram.'),
      quiz: [
        { q: B('عايز الرد حقول JSON ثابتة:', 'You want the reply as fixed JSON fields:'), o: ['Structured Output Parser', 'higher temperature', 'longer prompt only'], a: 0, why: B('schema.', 'A schema.') },
        { q: B('استخراج حقول من إيميل:', 'Extract fields from an email:'), o: ['Information Extractor', 'Text Classifier', 'Merge'], a: 0, why: B('مخصوص للاستخراج.', 'Built for extraction.') },
        { q: B('بعد الـ AI دايمًا:', 'After the AI step, always:'), o: [B('اتحقق من الحقول', 'validate the fields'), B('صدّق النتيجة', 'trust the result'), B('امسحها', 'delete it')], a: 0, why: B('الموديل بيغلط.', 'Models make mistakes.') }
      ] },

    { title: B('التصنيف والتلخيص', 'Classification and summarisation'),
      goal: B('تصنّف رسايل وتلخّص نصوص طويلة بالـ nodes الجاهزة.', 'Classify messages and summarise long texts with the ready nodes.'),
      learn: [
        { h: B('Text Classifier', 'Text Classifier'),
          p: B('تحدد الفئات (اسم + وصف)، والـ node بيوجّه كل رسالة لمخرج الفئة بتاعتها. ضيف فئة «other» للي مش واضح، وخلّي الوصف مميز لكل فئة.', 'Define categories (a name + a description) and the node routes each message to its category\'s output. Add an "other" category for unclear cases, and make each description distinct.'),
          ex: 'billing: payments, invoices, charges\nshipping: delivery, tracking, delays\nother: anything else' },
        { h: B('التلخيص', 'Summarisation'),
          p: B('Summarization Chain بيقسّم النص الطويل ويلخّص كل جزء وبعدين يلخّص الملخصات (map-reduce). مفيد للمستندات اللي أكبر من الـ context.', 'The Summarization Chain splits long text, summarises each part and then summarises the summaries (map-reduce). Useful for documents larger than the context.'),
          ex: 'Long meeting transcript → Summarization Chain → 5 bullet points + action items' },
        { h: B('keywords الأول، AI بعدين', 'Keywords first, AI second'),
          p: B('لو ينفع تصنّف بالكلمات (أسبوع 10)، اعمله الأول: مجاني وسريع. ابعت للـ AI بس اللي مش واضح. ده بيوفّر فلوس كتير.', 'If keywords can classify it (week 10), do that first: free and fast. Send only the unclear ones to the AI. This saves a lot of money.'),
          ex: 'Switch (keywords) → matched → route\n                   → no match → Text Classifier' }
      ],
      practice: [
        B('اعمل Text Classifier بـ 4 فئات + other وجرّبه على 15 رسالة.', 'Build a Text Classifier with 4 categories + other and test it on 15 messages.'),
        B('قيس الدقة: كام واحدة اتصنّفت صح.', 'Measure accuracy: how many were classified correctly.'),
        B('لخّص نص طويل بـ Summarization Chain.', 'Summarise a long text with the Summarization Chain.'),
        B('اعمل keywords أولًا ثم AI للباقي، وقارن عدد الطلبات للموديل.', 'Do keywords first and AI for the rest, and compare the number of model calls.')
      ],
      words: ['Text Classifier',
        { t: 'Summarization Chain', m: B('node بتلخّص نصوص طويلة على أجزاء', 'a node that summarises long texts in parts'), ex: 'map-reduce summary' },
        { t: 'category description', m: B('وصف الفئة اللي بيساعد التصنيف', 'a category description that guides classification'), ex: 'billing: payments, invoices, charges' },
        { t: 'fallback category', m: B('فئة للحالات اللي مش واضحة', 'a category for unclear cases'), ex: 'other' },
        { t: 'Sentiment Analysis', m: B('تحديد نبرة النص: إيجابي أو سلبي أو محايد', 'detecting a text\'s tone: positive, negative or neutral'), ex: 'Flag angry customers first.' }],
      read: ['lib:n8n Docs: Advanced AI', 'lib:Anthropic Courses'],
      challenge: B('اعمل «support triage»: الرسايل الجاية بتتصنّف (keywords ثم AI)، وتتقاس نبرتها، والغاضب أو العاجل يوصل فورًا، والباقي في ملخص يومي.', 'Build "support triage": incoming messages are classified (keywords, then AI) and scored for sentiment; angry or urgent ones arrive instantly, the rest in a daily summary.'),
      quiz: [
        { q: B('رسالة مش واضحة في Text Classifier:', 'An unclear message in the Text Classifier:'), o: [B('تروح لفئة other', 'goes to an "other" category'), B('تتمسح', 'is deleted'), B('بتوقف الـ workflow', 'stops the workflow')], a: 0, why: B('fallback.', 'A fallback.') },
        { q: B('توفّر فلوس في التصنيف:', 'To save money on classification:'), o: [B('keywords الأول وAI للباقي', 'keywords first, AI for the rest'), B('AI لكل حاجة', 'AI for everything'), B('موديل أكبر', 'a bigger model')], a: 0, why: B('طلبات أقل للموديل.', 'Fewer model calls.') },
        { q: B('نص أكبر من الـ context:', 'Text bigger than the context:'), o: ['Summarization Chain (map-reduce)', 'higher temperature', 'Text Classifier'], a: 0, why: B('بيقسّم.', 'It splits the text.') }
      ] },

    { title: B('الجودة والتكلفة', 'Quality and cost'),
      goal: B('تقيس جودة الـ AI بمجموعة اختبار، وتقلّل الأخطاء والتكلفة قبل التسليم.', 'Measure AI quality with a test set, and reduce mistakes and cost before delivery.'),
      learn: [
        { h: B('الهلوسة', 'Hallucination'),
          p: B('الموديل ممكن يألّف معلومة بثقة. قلّلها بـ: بيانات في الـ prompt، وتعليمات «لو مش عارف قول I don\'t know»، وتحقق بعد الـ AI، ومراجعة بشرية للحاجات المهمة.', 'A model can invent facts confidently. Reduce it with data in the prompt, an instruction such as "if you don\'t know, say I don\'t know", validation after the AI, and human review for important things.'),
          ex: 'If the answer is not in <docs>, reply exactly: "I don\'t know."' },
        { h: B('مجموعة تقييم', 'An evaluation set'),
          p: B('20–50 مثال حقيقي بالإجابة الصح. شغّل الـ workflow عليهم بعد أي تعديل في الـ prompt أو الموديل، وقيس النسبة. من غيرها انت بتخمّن.', '20–50 real examples with the right answer. Run the workflow on them after any prompt or model change and measure the score. Without it you are guessing.'),
          ex: 'Sheet: input | expected_category | actual | correct?\nv2: 42/50 = 84%' },
        { h: B('التكلفة', 'Cost'),
          p: B('قلّل الـ tokens: متبعتش HTML كامل (نضّفه)، قصّر الـ prompt، استخدم موديل صغير للمهام السهلة، وخزّن النتايج بدل ما تسأل نفس السؤال مرتين.', 'Cut tokens: don\'t send full HTML (clean it), shorten the prompt, use a small model for easy tasks, and cache results instead of asking the same question twice.'),
          ex: 'Strip HTML → 8,000 tokens become 1,200' }
      ],
      practice: [
        B('اعمل evaluation set من 20 مثال لمهمة التصنيف بتاعتك.', 'Build a 20-example evaluation set for your classification task.'),
        B('شغّل عليه prompt v1 وv2 وقارن النسبة.', 'Run prompt v1 and v2 on it and compare the scores.'),
        B('ضيف تعليمة «I don\'t know» وجرّب سؤال مالوش إجابة.', 'Add an "I don\'t know" instruction and try a question with no answer.'),
        B('قلّل tokens طلب لنصه واكتب الفرق في التكلفة.', 'Halve the tokens of a request and write down the cost difference.')
      ],
      words: ['hallucination', 'human in the loop',
        { t: 'evaluation set', m: B('أمثلة بإجاباتها الصح تقيس بيها الجودة', 'examples with correct answers used to measure quality'), ex: '42/50 correct = 84%' },
        { t: 'token budget', m: B('حد للـ tokens في كل طلب عشان التكلفة', 'a per-request token limit to control cost'), ex: 'Max 2,000 input tokens' },
        { t: 'caching (AI)', m: B('تخزين نتيجة سؤال عشان متسألوش تاني', 'storing an answer so you don\'t ask again'), ex: 'Same email hash → reuse the category' }],
      read: ['lib:OpenAI: Prompt engineering guide', 'lib:Hugging Face LLM Course'],
      challenge: B('خد أي workflow AI عملته الأسبوع ده واعمله «quality report»: evaluation set، ونسبة الدقة لنسختين prompt، والتكلفة التقريبية لكل 1000 طلب، وقرار أنهي نسخة تتسلّم.', 'Take an AI workflow from this week and write a "quality report": an evaluation set, the accuracy of two prompt versions, the approximate cost per 1,000 requests, and a decision on which version ships.'),
      quiz: [
        { q: B('تقلّل الهلوسة بـ:', 'Reduce hallucination with:'), o: [B('بيانات في الـ prompt وتعليمة I don\'t know وتحقق', 'data in the prompt, an "I don\'t know" rule, and validation'), B('temperature أعلى', 'a higher temperature'), B('prompt أطول بس', 'only a longer prompt')], a: 0, why: B('أساس وتحقق.', 'Grounding and checks.') },
        { q: B('إزاي تعرف v2 أحسن من v1؟', 'How do you know v2 beats v1?'), o: ['an evaluation set', 'a feeling', 'one example'], a: 0, why: B('قياس.', 'Measurement.') },
        { q: B('HTML كامل للموديل:', 'Sending full HTML to the model:'), o: [B('tokens كتير؛ نضّفه', 'many tokens; clean it first'), B('ممتاز', 'excellent'), B('مجاني', 'free')], a: 0, why: B('تكلفة.', 'Cost.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 18 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 18 opens when you score 70% or more.'),
      review: [
        B('tokens والـ context window والـ temperature واختيار الموديل.', 'Tokens, the context window, temperature and model choice.'),
        B('system message وfew-shot وXML tags وقوالب مرقّمة.', 'System message, few-shot, XML tags and versioned templates.'),
        B('Structured Output Parser وInformation Extractor والتحقق.', 'Structured Output Parser, Information Extractor and validation.'),
        B('Text Classifier وSummarization وkeywords أولًا.', 'Text Classifier, summarisation and keywords first.'),
        B('الهلوسة وevaluation set والتكلفة.', 'Hallucination, evaluation sets and cost.')
      ],
      project: B('ابني «AI inbox assistant»: إيميلات بتتنضّف، وتتصنّف (keywords ثم Text Classifier)، ويتطلّع منها بيانات (Information Extractor) لو طلب أو فاتورة، ويتكتب رد مقترح بـ prompt من Sheet، والرد بيروح لك Telegram بزرار «Send / Edit». ومعاه evaluation set من 30 إيميل ونسبة الدقة وتقدير التكلفة الشهرية.',
                 'Build an "AI inbox assistant": emails are cleaned, classified (keywords, then Text Classifier), data is extracted (Information Extractor) from orders or invoices, a reply is drafted with a prompt from a sheet, and the draft reaches you on Telegram with "Send / Edit" buttons. Include a 30-email evaluation set, the accuracy score and a monthly cost estimate.'),
      test: [
        { q: B('الـ tokens في النص العربي غالبًا:', 'Arabic text usually uses:'), o: [B('أكتر من الإنجليزي لنفس المعنى', 'more tokens than English for the same meaning'), B('أقل', 'fewer'), B('نفس العدد', 'the same number')], a: 0, why: B('التقسيم.', 'How it is split.') },
        { q: B('temperature 0 مناسب لـ:', 'Temperature 0 suits:'), o: [B('الاستخراج والتصنيف', 'extraction and classification'), B('كتابة شعر', 'writing poetry'), B('العصف الذهني', 'brainstorming')], a: 0, why: B('ثبات.', 'Consistency.') },
        { q: B('ابدأ بموديل:', 'Start with a model that is:'), o: [B('صغير، وكبّر لو احتجت', 'small, then scale up if needed'), B('الأكبر دايمًا', 'always the biggest'), B('أي حاجة', 'anything')], a: 0, why: B('تكلفة وسرعة.', 'Cost and speed.') },
        { q: B('القواعد الدايمة للبوت:', 'A bot\'s permanent rules:'), o: ['system message', 'the output parser', 'the email subject'], a: 0, why: B('ثابتة.', 'Fixed.') },
        { q: B('few-shot:', 'few-shot:'), o: [B('أمثلة مدخل ← مخرج في الـ prompt', 'input → output examples in the prompt'), B('طلبات قليلة', 'few requests'), B('موديل مجاني', 'a free model')], a: 0, why: B('بالمثال.', 'By example.') },
        { q: B('رد AI كـ JSON ثابت:', 'An AI reply as fixed JSON:'), o: ['Structured Output Parser', 'Text Classifier', 'Wait'], a: 0, why: B('schema.', 'A schema.') },
        { q: B('الشكل باظ ساعات:', 'The shape sometimes breaks:'), o: ['Auto-fixing Output Parser + IF', 'ignore it', 'a higher temperature'], a: 0, why: B('صلّح وتحقق.', 'Fix and check.') },
        { q: B('توجيه رسايل حسب الموضوع بالـ AI:', 'Route messages by topic with AI:'), o: ['Text Classifier', 'Information Extractor', 'Summarization Chain'], a: 0, why: B('فئات.', 'Categories.') },
        { q: B('محضر اجتماع طويل ← نقاط:', 'A long meeting transcript → bullet points:'), o: ['Summarization Chain', 'Merge', 'Filter'], a: 0, why: B('تلخيص.', 'Summarisation.') },
        { q: B('hallucination:', 'A hallucination is:'), o: [B('معلومة مؤلفة بثقة', 'an invented fact stated confidently'), B('خطأ شبكة', 'a network error'), B('بطء', 'slowness')], a: 0, why: B('الموديل بيألّف.', 'The model makes it up.') },
        { q: B('evaluation set بيستخدم:', 'An evaluation set is used:'), o: [B('بعد أي تعديل في الـ prompt أو الموديل', 'after any prompt or model change'), B('مرة وخلاص', 'once only'), B('أبدًا', 'never')], a: 0, why: B('قياس دايم.', 'Ongoing measurement.') },
        { q: B('تقلّل التكلفة:', 'Reduce cost by:'), o: [B('tokens أقل وموديل مناسب وcache', 'fewer tokens, the right model, and caching'), B('temperature أعلى', 'a higher temperature'), B('prompts أطول', 'longer prompts')], a: 0, why: B('كفاءة.', 'Efficiency.') }
      ] }
  ]
};
