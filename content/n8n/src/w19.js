// n8n week 19 — RAG and vector databases.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متقدم', 'Advanced'),
  title: B('الـ RAG وقواعد الـ vectors', 'RAG and vector databases'),
  goal: B('تبني مساعد بيجاوب من مستندات عميلك بس (مش من خياله): تقسّم المستندات وتحوّلها embeddings وتخزّنها في vector store، وتسترجع الأجزاء المناسبة، وترد بمصادر، وتحدّث البيانات وتقيس الجودة.',
          'Build an assistant that answers only from your client\'s documents, not from imagination: split documents, turn them into embeddings stored in a vector store, retrieve the right parts, answer with sources, keep the data fresh and measure quality.'),
  days: [
    { title: B('فكرة الـ RAG', 'The idea of RAG'),
      goal: B('تفهم إزاي الـ RAG بيخلّي الموديل يجاوب من بياناتك.', 'Understand how RAG makes the model answer from your data.'),
      learn: [
        { h: B('ليه RAG', 'Why RAG'),
          p: B('الموديل ميعرفش سياسات عميلك ولا منتجاته، وملفاته أكبر من الـ context. RAG = قبل ما يجاوب، دوّر في المستندات على الأجزاء المرتبطة بالسؤال وحطها في الـ prompt.', 'The model doesn\'t know your client\'s policies or products, and the files are bigger than the context. RAG = before answering, search the documents for the parts related to the question and put them in the prompt.'),
          ex: 'Question → search docs → top 4 chunks → prompt: "Answer only from <docs>…</docs>"' },
        { h: B('الـ embeddings', 'Embeddings'),
          p: B('embedding = النص متحوّل لقايمة أرقام (vector) بتمثّل معناه. نصين معناهم قريب = vectors قريبة، حتى لو الكلمات مختلفة. ده اللي بيخلّي البحث بالمعنى.', 'An embedding = text turned into a list of numbers (a vector) representing its meaning. Two texts with close meanings = close vectors, even with different words. That\'s what enables search by meaning.'),
          ex: '"refund policy" ≈ "how do I get my money back?"' },
        { h: B('semantic search', 'Semantic search'),
          p: B('بدل البحث بالكلمة، بتدوّر بالمعنى: السؤال بيتحوّل embedding، والـ vector store بيرجّع أقرب الأجزاء بـ similarity score.', 'Instead of keyword search, you search by meaning: the question becomes an embedding, and the vector store returns the nearest chunks with a similarity score.'),
          ex: 'score 0.89 → very relevant\nscore 0.42 → probably not' }
      ],
      practice: [
        B('ارسم مسار RAG على ورقة: ingestion وretrieval.', 'Draw the RAG flow on paper: ingestion and retrieval.'),
        B('اكتب 5 أسئلة وأجزاء مستندات ممكن تجاوبها، وقارن بحث بالكلمة وبالمعنى في دماغك.', 'Write 5 questions and document parts that answer them, and compare keyword vs. meaning search mentally.'),
        B('اعمل credential لموديل embeddings.', 'Create a credential for an embeddings model.'),
        B('اقرا عن RAG في توثيق n8n واكتب ملخص 5 جمل.', 'Read about RAG in the n8n docs and write a 5-sentence summary.')
      ],
      words: ['RAG', 'embeddings', 'vector store',
        { t: 'semantic search', m: B('بحث بالمعنى مش بالكلمات', 'search by meaning, not by words'), ex: '"money back" finds "refund policy"' },
        { t: 'similarity score', m: B('رقم بيقول الجزء قريب من السؤال قد إيه', 'a number showing how close a chunk is to the question'), ex: '0.89' }],
      read: ['lib:n8n Docs: Advanced AI', 'lib:Hugging Face LLM Course'],
      challenge: B('اكتب «RAG design doc» صفحة لمساعد لعميل متخيّل: المستندات، والأسئلة المتوقعة، ومكان التخزين، وإزاي هتقيس الجودة.', 'Write a one-page "RAG design doc" for an imagined client assistant: the documents, expected questions, storage and how you\'ll measure quality.'),
      quiz: [
        { q: B('RAG بيعمل إيه قبل الإجابة؟', 'What does RAG do before answering?'), o: [B('يدوّر في المستندات ويحط الأجزاء في الـ prompt', 'searches the documents and puts parts in the prompt'), B('يدرّب الموديل', 'trains the model'), B('يمسح الذاكرة', 'clears memory')], a: 0, why: B('retrieval.', 'retrieval.') },
        { q: B('embedding هو:', 'An embedding is:'), o: [B('أرقام بتمثّل معنى النص', 'numbers representing the text\'s meaning'), B('ملف PDF', 'a PDF file'), B('باسورد', 'a password')], a: 0, why: B('vector.', 'A vector.') },
        { q: B('semantic search بتلاقي:', 'Semantic search finds:'), o: [B('المعنى القريب حتى بكلمات مختلفة', 'close meaning even with different words'), B('الكلمة بالظبط بس', 'only the exact word'), B('الملفات الكبيرة', 'large files')], a: 0, why: B('بالمعنى.', 'By meaning.') }
      ] },

    { title: B('إدخال المستندات', 'Ingesting documents'),
      goal: B('تقسّم المستندات لأجزاء بمعلومات وصفية وتخزّنها.', 'Split documents into chunks with metadata and store them.'),
      learn: [
        { h: B('التقسيم', 'Splitting'),
          p: B('المستند الكبير بيتقسم chunks (500–1000 حرف مثلًا) مع overlap صغير (100) عشان الفكرة متتقطعش. Recursive Character Text Splitter بيقسم عند الفقرات والجمل.', 'A large document is split into chunks (say 500–1,000 characters) with a small overlap (100) so ideas aren\'t cut off. The Recursive Character Text Splitter splits at paragraphs and sentences.'),
          ex: 'Chunk size: 800 · Overlap: 100' },
        { h: B('الـ metadata', 'Metadata'),
          p: B('مع كل chunk خزّن: اسم المستند، والقسم، والتاريخ، واللينك. هتحتاجها للمصادر في الرد وللفلترة (سياسات 2026 بس).', 'With each chunk store the document name, section, date and link. You\'ll need them for sources in replies and for filtering (2026 policies only).'),
          ex: '{ source: "refund-policy.pdf", section: "Returns", updated: "2026-09-01" }' },
        { h: B('مسار الإدخال', 'The ingestion flow'),
          p: B('ملفات (Drive أو رفع) ← Default Data Loader (بيقرا PDF/نص) ← Text Splitter ← Embeddings ← Vector Store (Insert). workflow منفصل عن اللي بيجاوب.', 'Files (Drive or upload) → Default Data Loader (reads PDF/text) → Text Splitter → Embeddings → Vector Store (Insert). A separate workflow from the answering one.'),
          ex: 'Drive folder "KB" → loader → splitter → embeddings → vector store' }
      ],
      practice: [
        B('جهّز 3 مستندات (سياسة، FAQ، دليل منتج).', 'Prepare 3 documents (a policy, an FAQ, a product guide).'),
        B('اعمل ingestion workflow بـ Default Data Loader وText Splitter.', 'Build an ingestion workflow with the Default Data Loader and a Text Splitter.'),
        B('جرّب chunk size 300 و1000 وشوف عدد الأجزاء.', 'Try chunk sizes of 300 and 1,000 and see the chunk count.'),
        B('ضيف metadata لكل chunk.', 'Add metadata to every chunk.')
      ],
      words: [
        { t: 'Default Data Loader', m: B('node بيقرا المستندات ويجهّزها للـ vector store', 'a node that reads documents and prepares them for the vector store'), ex: 'PDF, text, JSON' },
        { t: 'text splitter', m: B('بيقسّم النص الطويل لأجزاء', 'splits long text into chunks'), ex: 'Recursive Character Text Splitter' },
        { t: 'chunk size / overlap', m: B('حجم كل جزء والتداخل بين الأجزاء', 'the size of each chunk and the overlap between them'), ex: '800 / 100' },
        { t: 'metadata (chunk)', m: B('معلومات عن الجزء: المصدر والقسم والتاريخ', 'information about a chunk: source, section, date'), ex: 'source: refund-policy.pdf' },
        { t: 'ingestion', m: B('إدخال المستندات في الـ vector store', 'loading documents into the vector store'), ex: 'A separate ingestion workflow' }],
      read: [{ lib: 'n8n Docs: Advanced AI', what: B('اقرا عن Document Loaders وText Splitters.', 'Read about document loaders and text splitters.') }],
      challenge: B('اعمل ingestion بيراقب فولدر Drive: أي ملف جديد يتقسم ويتخزّن بـ metadata، ويبعتلك عدد الأجزاء.', 'Build ingestion that watches a Drive folder: any new file is split and stored with metadata, and you get the chunk count.'),
      quiz: [
        { q: B('ليه overlap بين الأجزاء؟', 'Why overlap between chunks?'), o: [B('عشان الفكرة متتقطعش', 'so ideas aren\'t cut off'), B('للسرعة', 'for speed'), B('إجباري', 'required')], a: 0, why: B('سياق.', 'Context.') },
        { q: B('metadata بتفيد في:', 'Metadata helps with:'), o: [B('المصادر والفلترة', 'sources and filtering'), B('التشفير', 'encryption'), B('التصميم', 'design')], a: 0, why: B('معلومات عن الجزء.', 'Information about the chunk.') },
        { q: B('ingestion والإجابة:', 'Ingestion and answering:'), o: [B('workflows منفصلة', 'separate workflows'), B('لازم مع بعض', 'must be together'), B('مش مهم', 'doesn\'t matter')], a: 0, why: B('وظايف مختلفة.', 'Different jobs.') }
      ] },

    { title: B('الـ vector stores', 'Vector stores'),
      goal: B('تختار vector store مناسب للتجربة وللإنتاج.', 'Choose a suitable vector store for testing and for production.'),
      learn: [
        { h: B('للتجربة', 'For testing'),
          p: B('Simple Vector Store بيخزّن في ذاكرة n8n: سريع للتجربة، بس بيروح مع الـ restart ومش مناسب لبيانات كتير.', 'The Simple Vector Store keeps data in n8n\'s memory: quick for testing, but lost on restart and unsuitable for lots of data.'),
          ex: 'Prototype with Simple Vector Store, then switch.' },
        { h: B('للإنتاج', 'For production'),
          p: B('PGVector (امتداد Postgres، وعندك Postgres أصلًا)، وSupabase Vector Store، وQdrant (مفتوح المصدر، Docker)، وPinecone (خدمة سحابية). اختار حسب اللي العميل عنده والتكلفة.', 'PGVector (a Postgres extension — you already have Postgres), Supabase Vector Store, Qdrant (open source, Docker) and Pinecone (a cloud service). Choose by what the client has and by cost.'),
          ex: 'Already on Postgres → PGVector\nNeed a managed service → Pinecone' },
        { h: B('نفس الـ embeddings', 'The same embeddings'),
          p: B('لازم تستخدم نفس موديل الـ embeddings في الإدخال والبحث، وإلا الأرقام مش هتتقارن. لو غيّرت الموديل، أعد إدخال كل حاجة.', 'You must use the same embeddings model for ingestion and search, or the numbers won\'t compare. If you change the model, re-ingest everything.'),
          ex: 'Ingest with model A → search with model A (never B)' }
      ],
      practice: [
        B('خزّن في Simple Vector Store وجرّب بحث.', 'Store in the Simple Vector Store and try a search.'),
        B('فعّل pgvector في Postgres (أو Supabase) وانقل التخزين.', 'Enable pgvector in Postgres (or Supabase) and move storage there.'),
        B('أو شغّل Qdrant في Docker وجرّبه.', 'Or run Qdrant in Docker and try it.'),
        B('اكتب مقارنة: Simple ضد PGVector ضد Qdrant ضد Pinecone.', 'Write a comparison: Simple vs. PGVector vs. Qdrant vs. Pinecone.')
      ],
      words: [
        { t: 'Simple Vector Store', m: B('vector store في ذاكرة n8n للتجربة', 'an in-memory vector store for testing'), ex: 'Lost on restart.' },
        { t: 'PGVector', m: B('امتداد Postgres لتخزين الـ vectors', 'a Postgres extension for storing vectors'), ex: 'CREATE EXTENSION vector;' },
        { t: 'Qdrant', m: B('قاعدة vectors مفتوحة المصدر', 'an open-source vector database'), ex: 'Run it with Docker.' },
        { t: 'Pinecone', m: B('خدمة vectors سحابية مُدارة', 'a managed cloud vector service'), ex: 'No server to run.' },
        { t: 'embedding model', m: B('الموديل اللي بيحوّل النص لـ vectors', 'the model that turns text into vectors'), ex: 'Use the same one to ingest and search.' }],
      read: ['lib:Self-hosted AI Starter Kit', { t: 'pgvector on GitHub', url: 'https://github.com/pgvector/pgvector', what: B('اقرا Getting Started.', 'Read Getting Started.') }],
      challenge: B('انقل الـ ingestion بتاعك من Simple لـ PGVector (أو Qdrant)، واتأكد إن البحث بيرجّع نفس النتايج بعد restart.', 'Move your ingestion from Simple to PGVector (or Qdrant) and confirm search returns the same results after a restart.'),
      quiz: [
        { q: B('عندك Postgres أصلًا:', 'You already run Postgres:'), o: ['PGVector', 'a new service always', 'Simple Vector Store in production'], a: 0, why: B('امتداد.', 'An extension.') },
        { q: B('غيّرت موديل الـ embeddings:', 'You changed the embeddings model:'), o: [B('أعد إدخال كل المستندات', 're-ingest every document'), B('مفيش حاجة', 'nothing'), B('غيّر الـ chunk size بس', 'only change chunk size')], a: 0, why: B('الأرقام مش هتتقارن.', 'The numbers won\'t compare.') },
        { q: B('Simple Vector Store:', 'The Simple Vector Store is:'), o: [B('للتجربة؛ بيروح مع restart', 'for testing; lost on restart'), B('للإنتاج', 'for production'), B('الأسرع دايمًا', 'always fastest')], a: 0, why: B('في الذاكرة.', 'In memory.') }
      ] },

    { title: B('الاسترجاع والإجابة', 'Retrieval and answering'),
      goal: B('تسترجع أنسب الأجزاء وترد إجابة مبنية عليها بمصادر.', 'Retrieve the best chunks and give an answer based on them, with sources.'),
      learn: [
        { h: B('الـ agent بأداة بحث', 'An agent with a search tool'),
          p: B('أسهل طريقة: AI Agent + Vector Store Tool (أو vector store كأداة retrieve). الـ agent بيقرر يدوّر، وبيرد من النتايج. حدد top K (كام جزء يرجع، 4–6 غالبًا).', 'The easiest way: an AI Agent + a Vector Store Tool (or a vector store used as a retrieve tool). The agent decides to search and answers from the results. Set top K (how many chunks to return, usually 4–6).'),
          ex: 'Tool: search_kb — "Search the company knowledge base for policies and product info." Top K: 5' },
        { h: B('إجابة مبنية على المصادر', 'A grounded answer'),
          p: B('في الـ system message: «جاوب من نتايج search_kb بس. لو مفيش، قول مش عارف واعرض تحويل لموظف. واذكر اسم المستند.» ده بيقلل الهلوسة جدًا.', 'In the system message: "Answer only from search_kb results. If nothing is found, say you don\'t know and offer a human. Name the source document." This greatly reduces hallucination.'),
          ex: 'Answer: "You can return items within 14 days (source: refund-policy.pdf, Returns)."' },
        { h: B('الجودة', 'Quality'),
          p: B('لو النتايج مش مناسبة: chunks أصغر أو أكبر، metadata filter، أو reranking (ترتيب تاني بموديل أدق). وأحيانًا hybrid search (كلمات + معنى) أحسن للأكواد والأسماء.', 'If results are poor: smaller or larger chunks, a metadata filter, or reranking (re-ordering with a more precise model). Hybrid search (keywords + meaning) is sometimes better for codes and names.'),
          ex: 'Product code "X-200" → keyword search wins' }
      ],
      practice: [
        B('اعمل AI Agent بـ Vector Store Tool على مستنداتك.', 'Build an AI Agent with a Vector Store Tool over your documents.'),
        B('اكتب system message يلزمه بالمصادر وبـ «مش عارف».', 'Write a system message requiring sources and "I don\'t know".'),
        B('اسأل 10 أسئلة (منهم 3 مالهمش إجابة في المستندات).', 'Ask 10 questions (3 with no answer in the documents).'),
        B('جرّب top K 2 و8 وقارن.', 'Try top K of 2 and 8 and compare.')
      ],
      words: [
        { t: 'top K', m: B('عدد الأجزاء اللي البحث بيرجّعها', 'how many chunks a search returns'), ex: 'Top K: 5' },
        { t: 'Vector Store Tool', m: B('أداة بتخلّي الـ agent يدوّر في الـ vector store', 'a tool letting the agent search the vector store'), ex: 'search_kb' },
        { t: 'grounded answer', m: B('إجابة مبنية على مستندات مش من خيال الموديل', 'an answer based on documents, not the model\'s imagination'), ex: 'With a source name.' },
        { t: 'reranking', m: B('ترتيب النتايج تاني بطريقة أدق', 're-ordering results more precisely'), ex: 'Top 20 → rerank → best 5' },
        { t: 'hybrid search', m: B('بحث بالكلمات والمعنى مع بعض', 'search by keywords and meaning together'), ex: 'Good for product codes.' }],
      read: ['lib:n8n Docs: AI Agent node', 'lib:Anthropic Courses'],
      challenge: B('اعمل «policy assistant» لعميل متخيّل: 5 مستندات، يجاوب بالمصدر، ويقول مش عارف لو السؤال مش موجود، وعلى Telegram بذاكرة.', 'Build a "policy assistant" for an imagined client: 5 documents, answers with sources, says "I don\'t know" when the answer isn\'t there, on Telegram with memory.'),
      quiz: [
        { q: B('عشان الإجابة متبقاش مؤلفة:', 'So the answer isn\'t invented:'), o: [B('جاوب من نتايج البحث بس + المصدر', 'answer only from search results + source'), B('temperature أعلى', 'a higher temperature'), B('top K = 100', 'top K = 100')], a: 0, why: B('grounded.', 'grounded.') },
        { q: B('top K معناها:', 'top K means:'), o: [B('كام جزء يرجع', 'how many chunks come back'), B('عدد الأدوات', 'the number of tools'), B('حجم الملف', 'the file size')], a: 0, why: B('أقرب K.', 'The K nearest.') },
        { q: B('كود منتج زي X-200 مش بيتلاقي بالمعنى:', 'A product code like X-200 isn\'t found by meaning:'), o: ['hybrid search', 'more temperature', 'longer chunks only'], a: 0, why: B('الكلمات تساعد.', 'Keywords help.') }
      ] },

    { title: B('التحديث والتقييم', 'Keeping it fresh and evaluating'),
      goal: B('تحدّث البيانات لما المستندات تتغيّر، وتقيس جودة البحث والإجابات.', 'Update the data when documents change, and measure search and answer quality.'),
      learn: [
        { h: B('البيانات القديمة', 'Stale data'),
          p: B('لو سياسة اتغيّرت والنسخة القديمة لسه في الـ vector store، المساعد هيجاوب غلط. لما مستند يتعدّل: امسح أجزاءه القديمة (بالـ metadata source) وأدخل الجديد.', 'If a policy changed and the old version is still in the vector store, the assistant answers wrongly. When a document is edited, delete its old chunks (by source metadata) and ingest the new one.'),
          ex: 'On file update → delete where source = "refund-policy.pdf" → insert new chunks' },
        { h: B('إعادة البناء', 'Reindexing'),
          p: B('أحيانًا أسهل تعيد بناء الكل: workflow بيمسح الـ collection ويدخّل كل المستندات من الأول (مثلًا كل أسبوع أو لما تغيّر الإعدادات).', 'Sometimes it\'s easier to rebuild everything: a workflow that clears the collection and re-ingests every document (weekly, say, or when settings change).'),
          ex: 'Weekly: clear → ingest all → report chunk count' },
        { h: B('التقييم', 'Evaluation'),
          p: B('مجموعة أسئلة بإجاباتها والمستند الصح. قيس: البحث رجّع الجزء الصح؟ (retrieval) والإجابة صح ومن غير تأليف؟ (answer). حسّن حاجة واحدة وقيس تاني.', 'A set of questions with answers and the right document. Measure: did the search return the right chunk? (retrieval) Is the answer correct and not invented? (answer). Improve one thing and measure again.'),
          ex: 'Retrieval hit rate: 18/20 · Answer correct: 16/20' }
      ],
      practice: [
        B('عدّل مستند وحدّث أجزاءه من غير ما يبقى فيه نسختين.', 'Edit a document and update its chunks without leaving two versions.'),
        B('اعمل workflow reindex كامل.', 'Build a full reindex workflow.'),
        B('اعمل evaluation set من 15 سؤال بالمصدر الصح.', 'Build a 15-question evaluation set with the right source.'),
        B('قيس retrieval وanswer قبل وبعد تغيير chunk size.', 'Measure retrieval and answers before and after changing the chunk size.')
      ],
      words: [
        { t: 'stale data', m: B('بيانات قديمة لسه موجودة بعد ما المصدر اتغيّر', 'old data still present after the source changed'), ex: 'Last year\'s price list' },
        { t: 'reindexing', m: B('إعادة بناء الـ vector store من الأول', 'rebuilding the vector store from scratch'), ex: 'Weekly full reindex' },
        { t: 'upsert (vectors)', m: B('تحديث أجزاء مستند أو إضافتها', 'updating or adding a document\'s chunks'), ex: 'Replace chunks by source' },
        { t: 'retrieval hit rate', m: B('نسبة الأسئلة اللي البحث رجّع فيها الجزء الصح', 'the share of questions where search returned the right chunk'), ex: '18/20' },
        { t: 'collection', m: B('مجموعة vectors في الـ vector store', 'a group of vectors in the vector store'), ex: 'kb_client_x' }],
      read: ['lib:Google Machine Learning Crash Course', 'lib:Prompt Engineering Guide'],
      challenge: B('خلّي «policy assistant» يتحدّث لوحده لما ملف في Drive يتعدّل، وضيف تقرير أسبوعي بنتيجة الـ evaluation set.', 'Make the "policy assistant" update itself when a Drive file changes, and add a weekly report of the evaluation-set score.'),
      quiz: [
        { q: B('سياسة اتعدّلت:', 'A policy was edited:'), o: [B('امسح أجزاءها القديمة وأدخل الجديد', 'delete its old chunks and ingest the new one'), B('ضيف الجديد بس', 'just add the new one'), B('ولا حاجة', 'do nothing')], a: 0, why: B('منع البيانات القديمة.', 'Prevent stale data.') },
        { q: B('retrieval hit rate بيقيس:', 'Retrieval hit rate measures:'), o: [B('البحث رجّع الجزء الصح', 'whether search returned the right chunk'), B('سرعة الرد', 'reply speed'), B('التكلفة', 'cost')], a: 0, why: B('جودة البحث.', 'Search quality.') },
        { q: B('إعادة بناء كاملة:', 'A full rebuild:'), o: ['reindexing', 'rollback', 'retry'], a: 0, why: B('من الأول.', 'From scratch.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 20 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 20 opens when you score 70% or more.'),
      review: [
        B('RAG وembeddings وsemantic search.', 'RAG, embeddings and semantic search.'),
        B('Data Loader وText Splitter وchunk/overlap وmetadata.', 'Data Loader, Text Splitter, chunk/overlap and metadata.'),
        B('Simple ضد PGVector/Qdrant/Pinecone، ونفس موديل الـ embeddings.', 'Simple vs. PGVector/Qdrant/Pinecone, and the same embeddings model.'),
        B('top K وVector Store Tool وإجابة بمصادر وhybrid.', 'top K, the Vector Store Tool, answers with sources, and hybrid search.'),
        B('stale data وreindex وتقييم retrieval والإجابات.', 'Stale data, reindexing and evaluating retrieval and answers.')
      ],
      project: B('ابني «company knowledge assistant» كامل: ingestion من فولدر Drive لـ PGVector (أو Qdrant) بـ metadata وتحديث تلقائي، وagent بيجاوب بمصادر ويقول مش عارف ويحوّل لموظف، على Telegram وويب، مع ذاكرة، وevaluation set 20 سؤال بنسبة retrieval والإجابات، وتقدير تكلفة.',
                 'Build a complete "company knowledge assistant": ingestion from a Drive folder into PGVector (or Qdrant) with metadata and automatic updates, an agent that answers with sources, says "I don\'t know" and hands off to staff, on Telegram and the web with memory, plus a 20-question evaluation set with retrieval and answer scores and a cost estimate.'),
      test: [
        { q: B('RAG بيحل مشكلة:', 'RAG solves the problem that:'), o: [B('الموديل ميعرفش بيانات عميلك', 'the model doesn\'t know your client\'s data'), B('بطء النت', 'the internet is slow'), B('التصميم', 'design')], a: 0, why: B('يجيب المعلومة.', 'It fetches the information.') },
        { q: B('نصين معناهم قريب:', 'Two texts with close meanings:'), o: [B('embeddings قريبة', 'have close embeddings'), B('نفس الكلمات لازم', 'must share words'), B('مفيش علاقة', 'are unrelated')], a: 0, why: B('بالمعنى.', 'By meaning.') },
        { q: B('chunk size 800 وoverlap 100 معناها:', 'Chunk size 800 and overlap 100 means:'), o: [B('أجزاء 800 حرف بتتداخل 100', '800-character chunks overlapping by 100'), B('800 ملف', '800 files'), B('100 سؤال', '100 questions')], a: 0, why: B('تقسيم.', 'Splitting.') },
        { q: B('المصدر في الرد بيجي من:', 'The source in a reply comes from:'), o: ['chunk metadata', 'the temperature', 'the memory'], a: 0, why: B('source.', 'source.') },
        { q: B('vector store يروح بعد restart:', 'A vector store lost after restart:'), o: ['Simple Vector Store', 'PGVector', 'Qdrant'], a: 0, why: B('في الذاكرة.', 'In memory.') },
        { q: B('لازم في الإدخال والبحث:', 'Both ingestion and search must use:'), o: [B('نفس موديل الـ embeddings', 'the same embeddings model'), B('نفس الـ prompt', 'the same prompt'), B('نفس الـ temperature', 'the same temperature')], a: 0, why: B('أرقام متوافقة.', 'Compatible numbers.') },
        { q: B('top K = 5:', 'top K = 5:'), o: [B('5 أجزاء ترجع', '5 chunks are returned'), B('5 أسئلة', '5 questions'), B('5 مستندات بس في القاعدة', 'only 5 documents stored')], a: 0, why: B('الأقرب.', 'The nearest.') },
        { q: B('عشان المساعد ميألّفش:', 'So the assistant doesn\'t invent:'), o: [B('جاوب من النتايج بس، وإلا «مش عارف»', 'answer only from results, else "I don\'t know"'), B('ذاكرة أكبر', 'more memory'), B('chunks أكبر بس', 'only bigger chunks')], a: 0, why: B('grounded.', 'grounded.') },
        { q: B('reranking:', 'Reranking:'), o: [B('ترتيب النتايج تاني بدقة', 're-ordering results more precisely'), B('إعادة الإدخال', 're-ingesting'), B('حذف', 'deleting')], a: 0, why: B('جودة.', 'Quality.') },
        { q: B('مستند اتعدّل ونسخته القديمة لسه موجودة:', 'An edited document\'s old version is still stored:'), o: ['stale data', 'reranking', 'overlap'], a: 0, why: B('قديمة.', 'Outdated.') },
        { q: B('تقيس البحث بـ:', 'Measure search with:'), o: ['retrieval hit rate', 'the number of nodes', 'workflow name'], a: 0, why: B('الجزء الصح رجع؟', 'Did the right chunk come back?') },
        { q: B('ingestion workflow:', 'The ingestion workflow:'), o: [B('منفصل عن اللي بيجاوب', 'is separate from the answering one'), B('نفس الـ workflow لازم', 'must be the same workflow'), B('مش محتاج', 'is unnecessary')], a: 0, why: B('وظيفة مختلفة.', 'A different job.') }
      ] }
  ]
};
