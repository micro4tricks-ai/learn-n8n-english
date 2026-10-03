// Python week 37 — Embeddings and RAG.
// Vector maths, chunking, BM25, rank fusion and retrieval metrics run with the standard library;
// embedding models, vector databases and Claude calls are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الـ Embeddings والـ RAG', 'Embeddings and RAG'),
  goal: B('تبني مساعد بيجاوب من مستنداتك انت مش من دماغه: تفهم الـ embeddings والتشابه، تقطّع المستندات صح، تدوّر بالمعنى والكلمات مع بعض، تبني برومبت بمصادر مرقّمة واستشهادات، وتقيس جودة الاسترجاع بأرقام — مع عناية خاصة بالعربي.',
          'Build an assistant that answers from your documents, not from memory: understand embeddings and similarity, chunk documents properly, search by meaning and keywords together, build a prompt with numbered sources and citations, and measure retrieval quality with numbers — with special care for Arabic.'),
  days: [
    { title: B('الـ embeddings والتشابه', 'Embeddings and similarity'),
      goal: B('تحوّل النص لأرقام تقدر تقارنها.', 'Turn text into numbers you can compare.'),
      learn: [
        L(B('النص كمتجه', 'Text as a vector'),
          B('**embedding** = قايمة أرقام (**vector**) بتمثّل معنى النص: النصوص المتشابهة في المعنى متجهاتها قريبة. أبسط فكرة نفهم بيها: عدّ الكلمات. الموديلات الحقيقية بتعمل متجهات بمئات الأبعاد بتفهم المرادفات، بس المقارنة نفسها هي هي: **cosine similarity** (جيب تمام الزاوية بين المتجهين، من −1 لـ 1).', 'An **embedding** = a list of numbers (a **vector**) representing a text’s meaning: texts with similar meaning have nearby vectors. The simplest way to grasp it: count words. Real models produce vectors with hundreds of dimensions that understand synonyms, but the comparison is the same: **cosine similarity** (the cosine of the angle between two vectors, from −1 to 1).'),
          'import math\nfrom collections import Counter\n\ndef vec(text):\n    return Counter(text.lower().split())\n\ndef cosine(a, b):\n    dot = sum(a[w] * b[w] for w in a.keys() & b.keys())\n    na = math.sqrt(sum(v * v for v in a.values()))\n    nb = math.sqrt(sum(v * v for v in b.values()))\n    return dot / (na * nb) if na and nb else 0.0\n\nq = vec("how do I return a damaged order")\ndocs = {\n    "returns":  "you can return a damaged order within 14 days",\n    "shipping": "orders ship within two working days",\n    "payment":  "we accept cards and cash on delivery",\n}\nfor name, text in sorted(docs.items(), key=lambda kv: -cosine(q, vec(kv[1]))):\n    print(f"{cosine(q, vec(text)):.3f}  {name}")', R),
        L(B('الـ dot product والتطبيع', 'Dot product and normalising'),
          B('الـ **dot product** = مجموع حاصل ضرب العناصر. لو **normalise** كل متجه لطول 1، الـ dot product بيبقى هو الـ cosine — وده اللي قواعد البيانات بتعمله عشان أسرع. كتير من موديلات الـ embeddings بترجّع متجهات متطبّعة جاهزة.', 'The **dot product** = the sum of element-wise products. If you **normalise** every vector to length 1, the dot product equals the cosine — which is what databases do because it is faster. Many embedding models return normalised vectors already.'),
          'import math\n\ndef normalise(v):\n    n = math.sqrt(sum(x * x for x in v))\n    return [x / n for x in v]\n\ndef dot(a, b):\n    return sum(x * y for x, y in zip(a, b))\n\na, b = [3.0, 4.0, 0.0], [6.0, 8.0, 1.0]\nna, nb = normalise(a), normalise(b)\nprint("length after normalise:", round(math.sqrt(dot(na, na)), 6))\nprint("cosine via normalised dot:", round(dot(na, nb), 4))\nprint("cosine directly:          ", round(dot(a, b) / (math.sqrt(dot(a, a)) * math.sqrt(dot(b, b))), 4))', R),
        L(B('موديل embeddings حقيقي', 'A real embedding model'),
          B('للبحث بالمعنى استخدم موديل embeddings: إما API (توثيق Claude بيرشّح Voyage AI) أو موديل مفتوح على جهازك بمكتبة **sentence-transformers** (فيه موديلات بتدعم العربي زي multilingual-e5). لاحظ: بعض الموديلات محتاجة بادئة مختلفة للسؤال والمستند. وكل المستندات والأسئلة لازم تتحول بنفس الموديل — متخلطش.', 'For semantic search use an embedding model: either an API (Claude’s docs recommend Voyage AI) or an open model on your machine with **sentence-transformers** (some models support Arabic, like multilingual-e5). Note: some models need a different prefix for queries and documents. And all documents and queries must be embedded with the same model — never mix.'),
          '# pip install sentence-transformers      (downloads the model the first time)\nfrom sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer("intfloat/multilingual-e5-small")\ndocs = ["passage: يمكنك إرجاع الطلب التالف خلال 14 يومًا",\n        "passage: الشحن بياخد يومين شغل"]\nquery = "query: إزاي أرجّع طلب بايظ؟"\n\ndoc_vecs = model.encode(docs, normalize_embeddings=True)\nq_vec = model.encode(query, normalize_embeddings=True)\nprint(doc_vecs.shape)                 # (2, 384)\nprint(doc_vecs @ q_vec)               # dot product = cosine (normalised)')
      ],
      practice: [
        B('شغّل مثال العدّ وزوّد مستند تالت وشوف الترتيب.', 'Run the counting example, add a third document and watch the ranking.'),
        B('جرّب سؤال بمرادف مش موجود في المستندات وشوف الـ cosine.', 'Try a query with a synonym not in the documents and watch the cosine.'),
        B('اتأكد إن الـ dot بعد التطبيع = الـ cosine.', 'Check that the dot product after normalising equals the cosine.'),
        B('شغّل sentence-transformers على جهازك لو تقدر.', 'Run sentence-transformers on your machine if you can.')
      ],
      words: [
        W('embedding', 'تمثيل النص كأرقام بتعبّر عن معناه', 'a numeric representation of meaning', 'Store one embedding per chunk.'),
        W('vector', 'متجه: قايمة أرقام', 'a list of numbers', 'Each vector has 384 dimensions.'),
        W('cosine similarity', 'تشابه جيب التمام بين متجهين', 'the cosine of the angle between vectors', 'Cosine similarity ranks the closest chunks.'),
        W('dot product', 'حاصل الضرب النقطي', 'the sum of element-wise products', 'For normalised vectors, the dot product is the cosine.'),
        W('normalise', 'تخلّي طول المتجه 1', 'to scale a vector to length 1', 'Normalise vectors before storing them.'),
        W('dimension', 'بُعد: عدد أرقام المتجه', 'the number of values in a vector', 'The model outputs 384 dimensions.'),
        W('sentence-transformers', 'مكتبة لموديلات embeddings مفتوحة', 'a library for open embedding models', 'sentence-transformers runs locally.')
      ],
      read: [{ t: 'Claude docs: Embeddings', url: 'https://platform.claude.com/docs/en/build-with-claude/embeddings', what: B('اقرا الصفحة كلها.', 'Read the whole page.') }],
      challenge: B('اعمل «بحث بالمعنى» صغير: 20 سؤال وجواب من الأسئلة الشائعة لمتجر (عربي)، حوّلهم لمتجهات (بالعدّ أو بموديل حقيقي)، واطبع أقرب 3 لأي سؤال جديد مع الدرجة.', 'Build a small «semantic search»: 20 FAQ questions and answers for a shop (Arabic), turn them into vectors (by counting or a real model), and print the 3 closest to any new question with their scores.'),
      quiz: [
        Q(B('embedding:', 'An embedding:'), [['أرقام بتمثل معنى النص', 'numbers representing a text’s meaning'], ['ملف PDF', 'a PDF file'], ['كلمة سر', 'a password']], 0, B('معنى.', 'Meaning.')),
        Q(B('متجهين متطبّعين: الـ dot product =', 'Two normalised vectors: the dot product equals'), [['الـ cosine', 'the cosine'], ['صفر دايمًا', 'always zero'], ['الطول', 'the length']], 0, B('طول 1.', 'Length 1.')),
        Q(B('المستندات والأسئلة:', 'Documents and queries:'), [['بنفس الموديل', 'with the same model'], ['بموديلات مختلفة', 'with different models'], ['من غير موديل', 'without a model']], 0, B('نفس الفضاء.', 'The same space.'))
      ] },

    { title: B('تقطيع المستندات', 'Chunking documents'),
      goal: B('قطع بحجم مناسب ومعاها مصدرها.', 'Pieces of the right size, with their source.'),
      learn: [
        L(B('ليه نقطّع', 'Why chunk'),
          B('**chunking** = تقسيم المستند لقطع. المستند الكامل كبير على الـ **context window** وبيخفف المعنى في متجه واحد؛ والقطعة الصغيرة جدًا بتفقد السياق. البداية الكويسة: 300–800 كلمة، على حدود الفقرات، مع **chunk overlap** صغير (جملة أو اتنين) عشان المعلومة اللي على الحد متضيعش.', '**chunking** = splitting a document into pieces. A whole document is too big for the **context window** and dilutes meaning in one vector; a tiny chunk loses context. A good start: 300–800 words, on paragraph boundaries, with a small **chunk overlap** (a sentence or two) so information on a boundary is not lost.'),
          'def chunk_words(text, size=40, overlap=8):\n    words = text.split()\n    step = size - overlap\n    return [" ".join(words[i:i + size]) for i in range(0, max(len(words) - overlap, 1), step)]\n\ntext = " ".join(f"w{i}" for i in range(100))\nfor c in chunk_words(text):\n    parts = c.split()\n    print(len(parts), parts[0], "→", parts[-1])', R),
        L(B('على حدود الفقرات', 'On paragraph boundaries'),
          B('تقطيع بعدد الكلمات بس ممكن يقطع جملة في النص. الأحسن: اجمع فقرات لحد ما توصل للحجم، ولو فقرة لوحدها كبيرة قطّعها. واحتفظ بالعنوان اللي فوق القطعة — بيدّيها سياق («Returns › Damaged items»).', 'Splitting by word count alone can cut a sentence in half. Better: gather paragraphs until you reach the size, and split a paragraph only if it is too big alone. Keep the heading above the chunk — it gives context («Returns › Damaged items»).'),
          'doc = """# Returns\nYou can return items within 14 days.\n\nDamaged items are replaced free of charge. Send a photo within 48 hours.\n\n# Shipping\nOrders ship within two working days.\n\nCairo and Giza deliveries take one day; other cities take three."""\n\ndef chunks_by_heading(md, max_words=25):\n    out, heading, buf = [], "", []\n    def flush():\n        if buf:\n            out.append((heading, " ".join(buf)))\n            buf.clear()\n    for block in md.split("\\n\\n"):\n        for line in block.splitlines():\n            if line.startswith("# "):\n                flush(); heading = line[2:]\n            elif line.strip():\n                if len(" ".join(buf + [line]).split()) > max_words:\n                    flush()\n                buf.append(line.strip())\n    flush()\n    return out\n\nfor h, c in chunks_by_heading(doc):\n    print(f"[{h}] {c}")', R),
        L(B('الـ metadata', 'Metadata'),
          B('كل قطعة لازم يتحفظ معاها **metadata**: المصدر (ملف/رابط)، العنوان، الترتيب، التاريخ، اللغة، ومين مسموحله يشوفها. الـ metadata بتفلتر قبل البحث («بس سياسات 2026»، «بس مستندات القسم ده»)، وبتعمل الاستشهاد، وبتحمي الصلاحيات.', 'Every chunk must be stored with **metadata**: the source (file/URL), heading, position, date, language and who may see it. Metadata filters before the search («only 2026 policies», «only this department’s documents»), produces the citation, and protects permissions.'),
          'from dataclasses import dataclass, asdict\nfrom hashlib import sha256\n\n@dataclass(frozen=True)\nclass Chunk:\n    id: str\n    source: str\n    heading: str\n    position: int\n    lang: str\n    allowed: tuple\n    text: str\n\ndef make_chunk(source, heading, position, text, lang="en", allowed=("support",)):\n    cid = sha256(f"{source}#{position}:{text}".encode()).hexdigest()[:12]\n    return Chunk(cid, source, heading, position, lang, allowed, text)\n\nc = make_chunk("policies/returns.md", "Returns", 1, "Damaged items are replaced free of charge.")\nprint(asdict(c))\nprint("visible to sales?", "sales" in c.allowed)', R)
      ],
      practice: [
        B('غيّر size وoverlap وشوف عدد القطع.', 'Change size and overlap and watch the number of chunks.'),
        B('قطّع مستند Markdown حقيقي بالعناوين.', 'Chunk a real Markdown document by headings.'),
        B('ضيف تاريخ ولغة وصلاحيات للـ metadata.', 'Add date, language and permissions to the metadata.'),
        B('اتأكد إن id القطعة بيتغير لما النص يتغير.', 'Check that the chunk id changes when the text changes.')
      ],
      words: [
        W('chunking', 'تقطيع المستند لقطع', 'splitting a document into pieces', 'Good chunking improves answers.'),
        W('chunk overlap', 'تداخل بين القطع', 'words shared by neighbouring chunks', 'Use a small chunk overlap.'),
        W('context window', 'أقصى نص الموديل يقدر ياخده', 'the maximum text a model can read at once', 'The whole manual won’t fit the context window.'),
        W('metadata', 'بيانات عن البيانات', 'data describing other data', 'Filter chunks by metadata first.'),
        W('source document', 'المستند الأصلي', 'the original document a chunk comes from', 'Link every answer to its source document.')
      ],
      read: [{ lib: 'dataclasses', what: B('راجع frozen وasdict.', 'Review frozen and asdict.') }],
      challenge: B('اكتب chunker لمجلد Markdown/نصوص: قطع على حدود الفقرات بحجم وتداخل قابلين للضبط، عنوان كل قطعة، metadata كاملة، وid ثابت — واطبع إحصائيات (عدد القطع، متوسط الكلمات، أطول قطعة).', 'Write a chunker for a folder of Markdown/text: paragraph-boundary chunks with adjustable size and overlap, each chunk’s heading, full metadata and a stable id — and print statistics (chunk count, average words, longest chunk).'),
      quiz: [
        Q(B('قطعة صغيرة جدًا:', 'A very small chunk:'), [['بتفقد السياق', 'loses context'], ['مثالية دايمًا', 'is always ideal'], ['أغلى', 'costs more']], 0, B('توازن.', 'Balance.')),
        Q(B('chunk overlap بيحمي:', 'Chunk overlap protects:'), [['المعلومة اللي على الحد', 'information on a boundary'], ['كلمة السر', 'the password'], ['السرعة', 'speed']], 0, B('الحدود.', 'Boundaries.')),
        Q(B('الصلاحيات تتحفظ في:', 'Permissions are stored in:'), [['metadata القطعة', 'the chunk’s metadata'], ['البرومبت بس', 'the prompt only'], ['مكان', 'nowhere']], 0, B('فلترة.', 'Filtering.'))
      ] },

    { title: B('الاسترجاع: معنى وكلمات', 'Retrieval: meaning and keywords'),
      goal: B('تجيب أحسن القطع للسؤال.', 'Fetch the best chunks for a question.'),
      learn: [
        L(B('BM25: البحث بالكلمات', 'BM25: keyword search'),
          B('**semantic search** (بالمعنى) ممتاز في المرادفات، بس بيضعف مع أرقام الطلبات والأكواد والأسماء. **keyword search** بخوارزمية **bm25** بيمسك الكلمات النادرة المهمة (زي «INV-2041»). BM25 بيدّي وزن أكبر للكلمة النادرة، وبيقلل أثر تكرارها، وبيراعي طول المستند.', '**semantic search** is great with synonyms, but weak on order numbers, codes and names. **keyword search** with the **bm25** algorithm catches rare important words (like «INV-2041»). BM25 gives more weight to rare words, dampens repetition, and accounts for document length.'),
          'import math\nfrom collections import Counter\n\ndocs = ["invoice INV-2041 was paid on 3 October",\n        "how to pay an invoice by bank transfer",\n        "refund policy for damaged items",\n        "invoice reminders are sent after 7 days"]\ntoks = [d.lower().split() for d in docs]\nN, avg = len(toks), sum(map(len, toks)) / len(toks)\ndf = Counter(w for t in toks for w in set(t))\n\ndef bm25(query, k1=1.5, b=0.75):\n    scores = []\n    for t in toks:\n        tf, s = Counter(t), 0.0\n        for w in query.lower().split():\n            if w in tf:\n                idf = math.log(1 + (N - df[w] + 0.5) / (df[w] + 0.5))\n                s += idf * tf[w] * (k1 + 1) / (tf[w] + k1 * (1 - b + b * len(t) / avg))\n        scores.append(s)\n    return scores\n\nfor q in ["INV-2041", "pay invoice"]:\n    best = max(range(N), key=bm25(q).__getitem__)\n    print(f"{q!r:14} → {docs[best]}")', R),
        L(B('البحث الهجين', 'Hybrid search'),
          B('**hybrid search** = تشغّل الاتنين وتدمج النتايج. أسهل دمج وأمتنه: **reciprocal rank fusion** — كل مستند ياخد 1/(k + ترتيبه) من كل قايمة ونجمع. مش محتاج تظبط درجات مختلفة المقاييس.', '**hybrid search** = run both and merge the results. The simplest and most robust merge: **reciprocal rank fusion** — each document gets 1/(k + its rank) from each list, summed. No need to calibrate scores on different scales.'),
          'def rrf(*rankings, k=60):\n    score = {}\n    for ranking in rankings:\n        for rank, doc in enumerate(ranking, start=1):\n            score[doc] = score.get(doc, 0) + 1 / (k + rank)\n    return sorted(score, key=score.get, reverse=True)\n\nsemantic = ["refund-policy", "returns-faq", "invoice-2041", "shipping"]\nkeyword  = ["invoice-2041", "invoice-reminders", "refund-policy"]\nfor doc in rrf(semantic, keyword)[:4]:\n    print(doc)', R),
        L(B('قواعد بيانات المتجهات', 'Vector databases'),
          B('**vector database** بتخزّن المتجهات وتدوّر بسرعة على **top-k** (أقرب k). لو عندك Postgres أصلًا (أسبوع 30): إضافة **pgvector** بتديك عمود vector وفهرس **hnsw** للبحث التقريبي السريع، مع فلترة الـ metadata بـ SQL عادي. لآلاف القطع بس، حتى بحث كامل في الذاكرة كفاية.', 'A **vector database** stores vectors and quickly finds the **top-k** (k nearest). If you already have Postgres (week 30): the **pgvector** extension gives you a vector column and an **hnsw** index for fast approximate search, with metadata filtering in plain SQL. For only a few thousand chunks, even a full in-memory scan is enough.'),
          '-- PostgreSQL with pgvector\nCREATE EXTENSION IF NOT EXISTS vector;\nCREATE TABLE chunks (\n  id text PRIMARY KEY,\n  source text NOT NULL,\n  lang text NOT NULL,\n  allowed text[] NOT NULL,\n  body text NOT NULL,\n  embedding vector(384) NOT NULL\n);\nCREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops);\n\n-- top 5 for a query vector, only chunks support may see\nSELECT id, source, 1 - (embedding <=> $1) AS similarity\nFROM chunks\nWHERE \'support\' = ANY(allowed)\nORDER BY embedding <=> $1\nLIMIT 5;', { lang: 'sql' })
      ],
      practice: [
        B('جرّب BM25 على 10 مستندات بأرقام فواتير.', 'Try BM25 on 10 documents with invoice numbers.'),
        B('ادمج قايمتين بـ RRF وغيّر k.', 'Merge two lists with RRF and change k.'),
        B('اكتب SQL بفلتر لغة وتاريخ مع البحث.', 'Write SQL with language and date filters alongside the search.'),
        B('قارن نتايج المعنى بس والهجين على 5 أسئلة.', 'Compare meaning-only and hybrid results on 5 questions.')
      ],
      words: [
        W('semantic search', 'بحث بالمعنى', 'search by meaning rather than exact words', 'Semantic search finds synonyms.'),
        W('keyword search', 'بحث بالكلمات', 'search by matching words', 'Keyword search finds invoice numbers.'),
        W('bm25', 'خوارزمية ترتيب بالكلمات', 'a keyword ranking algorithm', 'BM25 favours rare words.'),
        W('hybrid search', 'بحث هجين', 'combining semantic and keyword search', 'Hybrid search fixed the code lookups.'),
        W('reciprocal rank fusion', 'دمج القوايم بالترتيب', 'merging rankings by 1/(k + rank)', 'Reciprocal rank fusion needs no score tuning.'),
        W('vector database', 'قاعدة بيانات للمتجهات', 'a store for searching vectors', 'You may not need a separate vector database.'),
        W('pgvector', 'إضافة متجهات لـ Postgres', 'a Postgres extension for vectors', 'pgvector keeps vectors next to your data.'),
        W('top-k', 'أقرب k نتيجة', 'the k best results', 'Retrieve the top-k chunks, k = 5.'),
        W('hnsw', 'فهرس بحث تقريبي سريع', 'a fast approximate nearest-neighbour index', 'An hnsw index speeds up search.')
      ],
      read: [{ t: 'pgvector (GitHub)', url: 'https://github.com/pgvector/pgvector', what: B('اقرا Getting Started وIndexing.', 'Read Getting Started and Indexing.') }],
      challenge: B('ابني retriever هجين بالـ stdlib: BM25 + بحث بالمتجهات (عدّ أو موديل) + RRF، مع فلتر metadata بالصلاحيات واللغة، ودالة `search(query, user, k=5)` بترجّع القطع ومصادرها.', 'Build a hybrid retriever with the stdlib: BM25 + vector search (counting or a model) + RRF, with a metadata filter for permissions and language, and a `search(query, user, k=5)` function returning chunks and their sources.'),
      quiz: [
        Q(B('سؤال فيه «INV-2041»:', 'A question containing «INV-2041»:'), [['البحث بالكلمات بيمسكه أحسن', 'keyword search catches it better'], ['المعنى بس كفاية دايمًا', 'meaning alone is always enough'], ['مستحيل', 'impossible']], 0, B('كلمة نادرة.', 'A rare word.')),
        Q(B('RRF بيدمج بـ:', 'RRF merges by:'), [['الترتيب', 'rank'], ['الدرجات الخام', 'raw scores'], ['الحروف', 'letters']], 0, B('1/(k+rank).', '1/(k+rank).')),
        Q(B('hnsw:', 'hnsw:'), [['فهرس بحث تقريبي سريع', 'a fast approximate search index'], ['نوع ملف', 'a file type'], ['لغة', 'a language']], 0, B('سرعة.', 'Speed.'))
      ] },

    { title: B('الإجابة بمصادر', 'Answering with sources'),
      goal: B('إجابة مبنية على القطع ومعاها استشهاد.', 'An answer grounded in the chunks, with citations.'),
      learn: [
        L(B('برومبت الـ RAG', 'The RAG prompt'),
          B('**rag** (retrieval-augmented generation) = تجيب القطع وتحطها في البرومبت وتطلب إجابة منها بس. القواعد: مصادر مرقّمة بين tags، «جاوب من المصادر بس»، «لو مش موجود قول مش عارف»، واستشهد بالرقم. ده **grounding** — بيقلل الهلوسة جدًا.', '**rag** (retrieval-augmented generation) = fetch the chunks, put them in the prompt and ask for an answer from them only. The rules: numbered sources inside tags, «answer only from the sources», «if it’s not there, say you don’t know», and cite by number. This is **grounding** — it greatly reduces hallucination.'),
          'def build_prompt(question, chunks):\n    sources = "\\n".join(\n        f\'<source id="{i}" title="{c["title"]}">{c["text"]}</source>\'\n        for i, c in enumerate(chunks, start=1))\n    return f"""Answer the customer\'s question using ONLY the sources below.\nCite sources like [1]. If the answer is not in the sources, say you don\'t know.\n\n<sources>\n{sources}\n</sources>\n\n<question>{question}</question>"""\n\nchunks = [{"title": "Returns", "text": "Damaged items are replaced free within 14 days."},\n          {"title": "Shipping", "text": "Cairo deliveries take one day."}]\nprint(build_prompt("Can I replace a broken mug?", chunks))', R),
        L(B('التحقق من الاستشهادات', 'Checking citations'),
          B('متثقش في الـ **citation** من غير ما تتحقق: اطلع الأرقام من الإجابة بـ regex، واتأكد إنها موجودة في المصادر اللي بعتّها، وإن الإجابة فيها استشهاد أصلًا. إجابة من غير مصدر أو برقم مش موجود = علّمها للمراجعة.', 'Do not trust a **citation** without checking: extract the numbers from the answer with a regex, make sure they exist among the sources you sent, and that the answer has a citation at all. An answer without a source or with a non-existent number = flag it for review.'),
          'import re\n\ndef check_citations(answer, n_sources):\n    cited = {int(x) for x in re.findall(r"\\[(\\d+)\\]", answer)}\n    bad = sorted(c for c in cited if not 1 <= c <= n_sources)\n    if not cited:\n        return "flag: no citation"\n    if bad:\n        return f"flag: unknown sources {bad}"\n    return f"ok: cites {sorted(cited)}"\n\nprint(check_citations("Yes, damaged items are replaced free [1].", 2))\nprint(check_citations("Yes, within 30 days [3].", 2))\nprint(check_citations("Probably yes.", 2))', R),
        L(B('الاستشهادات في Claude API', 'Citations in the Claude API'),
          B('Claude API بيدعم استشهادات مدمجة: ابعت القطع كـ document blocks وفعّل `citations`، والرد بيرجع text blocks معاها مواقع النص المستشهد بيه بالظبط. ده أدق من الأرقام في البرومبت. والنموذج: نفس ما اتعلمته في أسبوع 23.', 'The Claude API supports built-in citations: send the chunks as document blocks with `citations` enabled, and the reply returns text blocks carrying the exact cited text locations. This is more precise than numbers in the prompt. The model call is what you learned in week 23.'),
          'import anthropic\n\nclient = anthropic.Anthropic()\nchunks = retriever.search("Can I replace a broken mug?", user="support", k=4)\n\ncontent = [{\n    "type": "document",\n    "source": {"type": "text", "media_type": "text/plain", "data": c.text},\n    "title": f"{c.source} › {c.heading}",\n    "citations": {"enabled": True},\n} for c in chunks]\ncontent.append({"type": "text", "text": "Can I replace a broken mug? Answer only from the documents."})\n\nresponse = client.messages.create(model="claude-opus-5-5", max_tokens=16000,\n                                  messages=[{"role": "user", "content": content}])\nfor block in response.content:\n    if block.type == "text":\n        print(block.text, [c.document_title for c in (block.citations or [])])')
      ],
      practice: [
        B('ابني برومبت RAG لـ 3 قطع وسؤال.', 'Build a RAG prompt for 3 chunks and a question.'),
        B('جرّب check_citations على 5 إجابات.', 'Try check_citations on 5 answers.'),
        B('اكتب رد «مش عارف» مهذب للعميل.', 'Write a polite «I don’t know» reply for the customer.'),
        B('جرّب الـ citations في Claude API لو عندك مفتاح.', 'Try citations in the Claude API if you have a key.')
      ],
      words: [
        W('rag', 'توليد مدعوم بالاسترجاع', 'retrieval-augmented generation', 'RAG answers from your own documents.'),
        W('retrieval', 'استرجاع القطع المناسبة', 'fetching the relevant pieces', 'Bad retrieval means bad answers.'),
        W('grounding', 'ربط الإجابة بالمصادر', 'basing an answer on given sources', 'Grounding reduces made-up answers.'),
        W('citation', 'استشهاد بمصدر', 'a reference to a source', 'Every answer needs a citation.'),
        W('prompt', 'التعليمات والبيانات اللي بتتبعت للنموذج', 'the instructions and data sent to a model', 'Keep the RAG prompt in a constant.'),
        W('document block', 'جزء مستند في رسالة Claude', 'a document part in a Claude message', 'Enable citations on each document block.')
      ],
      read: [{ t: 'Claude docs: Citations', url: 'https://platform.claude.com/docs/en/build-with-claude/citations', what: B('اقرا الأمثلة وأنواع المستندات.', 'Read the examples and document types.') }],
      challenge: B('كمّل الـ retriever بتاعك بـ `answer(question, user)`: يجيب القطع، يبني البرومبت (أو document blocks)، ينادي Claude (أو fake لو مفيش مفتاح)، يتحقق من الاستشهادات، ويرجّع الإجابة والمصادر أو «مش عارف» — مع لوج لكل سؤال.', 'Extend your retriever with `answer(question, user)`: fetch chunks, build the prompt (or document blocks), call Claude (or a fake without a key), check citations, and return the answer and sources or «I don’t know» — with a log for every question.'),
      quiz: [
        Q(B('السؤال مش في المصادر:', 'The question isn’t covered by the sources:'), [['قول مش عارف', 'say you don’t know'], ['اخترع إجابة', 'invent an answer'], ['اسكت', 'stay silent']], 0, B('أمانة.', 'Honesty.')),
        Q(B('إجابة بتستشهد بـ [3] وبعت مصدرين:', 'An answer cites [3] but you sent two sources:'), [['علّمها للمراجعة', 'flag it for review'], ['انشرها', 'publish it'], ['احذف المصادر', 'delete the sources']], 0, B('تحقق.', 'Verification.')),
        Q(B('rag:', 'RAG:'), [['استرجاع ثم توليد', 'retrieve, then generate'], ['تدريب موديل جديد', 'training a new model'], ['ضغط ملفات', 'compressing files']], 0, B('مصادر.', 'Sources.'))
      ] },

    { title: B('القياس والعربي والتشغيل', 'Measuring, Arabic and operations'),
      goal: B('تعرف الـ RAG كويس ولا لأ بأرقام.', 'Know with numbers whether your RAG is good.'),
      learn: [
        L(B('مجموعة ذهبية ومقاييس', 'A golden set and metrics'),
          B('**golden set** = 30–100 سؤال حقيقي ومعاهم القطعة الصح. قيس الاسترجاع لوحده الأول: **recall at k** (القطعة الصح ظهرت في أول k؟) و**mrr** (متوسط 1/ترتيب أول إجابة صح). لو الاسترجاع وحش، تحسين البرومبت مش هيفيد.', 'A **golden set** = 30–100 real questions with the correct chunk. Measure retrieval alone first: **recall at k** (did the right chunk appear in the top k?) and **mrr** (the mean of 1/rank of the first correct answer). If retrieval is bad, improving the prompt will not help.'),
          'golden = {"how long for returns?": "returns-1", "is INV-2041 paid?": "inv-2041",\n          "cairo delivery time": "ship-2", "pay by transfer": "pay-1"}\nresults = {"how long for returns?": ["returns-1", "ship-1", "pay-1"],\n           "is INV-2041 paid?": ["pay-1", "inv-2041", "returns-1"],\n           "cairo delivery time": ["ship-1", "ship-3", "returns-1"],\n           "pay by transfer": ["pay-1", "inv-2041", "ship-2"]}\n\ndef recall_at_k(k):\n    return sum(golden[q] in results[q][:k] for q in golden) / len(golden)\n\ndef mrr():\n    total = 0.0\n    for q, right in golden.items():\n        ranks = [i for i, d in enumerate(results[q], start=1) if d == right]\n        total += 1 / ranks[0] if ranks else 0\n    return total / len(golden)\n\nprint(f"recall@1={recall_at_k(1):.2f} recall@3={recall_at_k(3):.2f} mrr={mrr():.2f}")\nprint("missed:", [q for q in golden if golden[q] not in results[q]])', R),
        L(B('تطبيع العربي', 'Arabic normalisation'),
          B('العربي فيه أشكال كتير لنفس الكلمة: أ/إ/آ/ا، ة/ه، ى/ي، تشكيل، تطويل (ـ)، وأرقام هندية. **arabic normalisation** قبل البحث بالكلمات (وأحيانًا قبل الـ embedding) بيرفع النتايج جدًا. طبّق نفس التطبيع على المستندات والأسئلة.', 'Arabic has many forms of the same word: `أ/إ/آ/ا`, `ة/ه`, `ى/ي`, diacritics, tatweel (`ـ`) and Arabic-Indic digits. **arabic normalisation** before keyword search (and sometimes before embedding) raises results a lot. Apply the same normalisation to documents and queries.'),
          'import re\n\nDIACRITICS = re.compile(r"[\\u064B-\\u0652\\u0670]")\nTABLE = str.maketrans({"أ": "ا", "إ": "ا", "آ": "ا", "ة": "ه", "ى": "ي", "ـ": None,\n                       **{chr(0x0660 + i): str(i) for i in range(10)}})\n\ndef normalise_ar(text):\n    return DIACRITICS.sub("", text).translate(TABLE)\n\nfor s in ["إرجاعُ الطلبيّة", "ارجاع الطلبيه", "الفاتورة رقم ٢٠٤١", "مُـــرتجع"]:\n    print(s, "→", normalise_ar(s))\nprint(normalise_ar("إرجاعُ الطلبيّة") == normalise_ar("ارجاع الطلبيه"))', R),
        L(B('تشغيل الـ RAG', 'Running RAG'),
          B('المستندات بتتغير: لو سياسة اتعدلت والفهرس قديم (**stale index**) المساعد هيجاوب غلط بثقة. اعمل **re-index** تلقائي لما ملف يتغير (بالـ hash زي الـ id)، احذف القطع القديمة، وسجّل كل سؤال: القطع، الإجابة، والاستشهادات. والأسئلة اللي إجابتها «مش عارف» = محتوى ناقص في المستندات.', 'Documents change: if a policy is edited and the index is old (a **stale index**), the assistant answers wrongly with confidence. **re-index** automatically when a file changes (by hash, like the id), delete old chunks, and log every question: the chunks, the answer and the citations. Questions answered «I don’t know» = content missing from the documents.'),
          'from hashlib import sha256\n\nindexed = {"returns.md": "a1b2", "shipping.md": "c3d4"}        # file → content hash at last index\ncurrent = {"returns.md": "Damaged items: 30 days now.", "shipping.md": None, "fees.md": "COD fee: 20 EGP"}\n\ndef h(text):\n    return sha256(text.encode()).hexdigest()[:4]\n\nfor name, text in current.items():\n    if text is None:\n        print("delete chunks of", name)\n    elif indexed.get(name) != h(text):\n        print("re-index", name)\nfor name in indexed.keys() - current.keys():\n    print("delete chunks of", name)', R)
      ],
      practice: [
        B('اعمل golden set من 20 سؤال حقيقي.', 'Build a golden set of 20 real questions.'),
        B('احسب recall@3 وMRR قبل وبعد تعديل.', 'Compute recall@3 and MRR before and after a change.'),
        B('جرّب التطبيع العربي على BM25 وقارن.', 'Try Arabic normalisation with BM25 and compare.'),
        B('اكتب job re-index بالـ hash.', 'Write a re-index job using hashes.')
      ],
      words: [
        W('golden set', 'مجموعة أسئلة بإجاباتها الصح', 'questions with known correct answers', 'Run the golden set after every change.'),
        W('recall at k', 'الإجابة الصح ظهرت في أول k؟', 'whether the right item is in the top k', 'Recall at 5 rose to 0.92.'),
        W('mrr', 'متوسط مقلوب ترتيب أول إجابة صح', 'mean reciprocal rank', 'MRR rewards the right chunk ranking first.'),
        W('arabic normalisation', 'توحيد أشكال الحروف العربية', 'unifying Arabic letter forms', 'Arabic normalisation unified the two forms of taa marbuta.'),
        W('stale index', 'فهرس قديم مش متحدّث', 'an index that no longer matches the documents', 'A stale index gives confident wrong answers.'),
        W('re-index', 'تعيد بناء الفهرس', 'to rebuild the search index', 'Re-index a file when its hash changes.')
      ],
      read: [{ lib: 'Claude API documentation', what: B('دوّر على «contextual retrieval» واقرا الفكرة.', 'Search for «contextual retrieval» and read the idea.') }],
      challenge: B('قيس الـ RAG بتاعك: golden set من 30 سؤال (عربي وإنجليزي)، recall@3 وMRR للمعنى بس وBM25 بس والهجين، قبل وبعد التطبيع العربي — واكتب جدول نتايج وقرار.', 'Measure your RAG: a golden set of 30 questions (Arabic and English), recall@3 and MRR for meaning-only, BM25-only and hybrid, before and after Arabic normalisation — and write a results table and a decision.'),
      quiz: [
        Q(B('الاسترجاع وحش:', 'Retrieval is bad:'), [['صلّح الاسترجاع قبل البرومبت', 'fix retrieval before the prompt'], ['طوّل البرومبت', 'make the prompt longer'], ['غيّر الألوان', 'change the colours']], 0, B('الأساس.', 'The foundation.')),
        Q(B('«ة» و«ه»:', '`ة` and `ه`:'), [['وحّدهم في التطبيع', 'unify them when normalising'], ['سيبهم مختلفين دايمًا', 'always keep them different'], ['احذفهم', 'delete them']], 0, B('تطبيع.', 'Normalisation.')),
        Q(B('سياسة اتعدلت والفهرس قديم:', 'A policy changed but the index is old:'), [['stale index: إجابات غلط بثقة', 'a stale index: confident wrong answers'], ['مفيش مشكلة', 'no problem'], ['أسرع', 'faster']], 0, B('re-index.', 'Re-index.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مساعد بيجاوب من مستنداتك بثقة مقاسة.', 'An assistant answering from your documents with measured confidence.'),
      review: [
        B('الـ embeddings والـ cosine والتطبيع وموديلات حقيقية.', 'Embeddings, cosine, normalising and real models.'),
        B('التقطيع على الفقرات بتداخل وmetadata.', 'Paragraph chunking with overlap and metadata.'),
        B('BM25 والبحث الهجين وRRF وpgvector.', 'BM25, hybrid search, RRF and pgvector.'),
        B('برومبت RAG والاستشهادات والتحقق منها.', 'The RAG prompt, citations and checking them.'),
        B('golden set وrecall@k وMRR والتطبيع العربي والـ re-index.', 'Golden sets, recall@k, MRR, Arabic normalisation and re-indexing.')
      ],
      project: B('مشروع الأسبوع «مساعد سياسات المتجر»: مجلد سياسات (عربي وإنجليزي)، chunker بـ metadata وصلاحيات، retriever هجين بتطبيع عربي، `answer()` بـ Claude واستشهادات متحقق منها (وfake للاختبار)، golden set من 30 سؤال بتقرير recall@3 وMRR، job re-index بالـ hash، وendpoint FastAPI يستخدمه n8n.', 'Week project «shop policy assistant»: a folder of policies (Arabic and English), a chunker with metadata and permissions, a hybrid retriever with Arabic normalisation, `answer()` with Claude and verified citations (and a fake for tests), a 30-question golden set with a recall@3 and MRR report, a hash-based re-index job, and a FastAPI endpoint used by n8n.'),
      test: [
        Q(B('cosine similarity بتقيس:', 'Cosine similarity measures:'), [['الزاوية بين متجهين', 'the angle between two vectors'], ['طول النص', 'text length'], ['السرعة', 'speed']], 0, B('اتجاه.', 'Direction.')),
        Q(B('normalise:', 'Normalise:'), [['طول المتجه = 1', 'vector length = 1'], ['حذف المتجه', 'delete the vector'], ['ضربه في 2', 'multiply by 2']], 0, B('طول.', 'Length.')),
        Q(B('حجم قطعة بداية كويسة:', 'A good starting chunk size:'), [['300–800 كلمة على الفقرات', '300–800 words on paragraphs'], ['حرف واحد', 'one character'], ['الكتاب كله', 'the whole book']], 0, B('توازن.', 'Balance.')),
        Q(B('metadata بتستخدم في:', 'Metadata is used for:'), [['الفلترة والاستشهاد والصلاحيات', 'filtering, citations and permissions'], ['التلوين', 'colouring'], ['ولا حاجة', 'nothing']], 0, B('سياق.', 'Context.')),
        Q(B('BM25 بيدّي وزن أكبر لـ:', 'BM25 gives more weight to:'), [['الكلمات النادرة', 'rare words'], ['الكلمات الشائعة', 'common words'], ['علامات الترقيم', 'punctuation']], 0, B('idf.', 'idf.')),
        Q(B('hybrid search:', 'Hybrid search:'), [['معنى + كلمات مدموجين', 'meaning + keywords merged'], ['بحث في الصور', 'image search'], ['بحث يدوي', 'manual search']], 0, B('الاتنين.', 'Both.')),
        Q(B('pgvector:', 'pgvector:'), [['متجهات جوه Postgres', 'vectors inside Postgres'], ['لغة برمجة', 'a programming language'], ['متصفح', 'a browser']], 0, B('إضافة.', 'An extension.')),
        Q(B('برومبت RAG كويس بيقول:', 'A good RAG prompt says:'), [['جاوب من المصادر بس وقول مش عارف', 'answer only from sources, say you don’t know'], ['اخترع لو مش عارف', 'invent if unsure'], ['تجاهل المصادر', 'ignore the sources']], 0, B('grounding.', 'Grounding.')),
        Q(B('إجابة من غير استشهاد:', 'An answer without a citation:'), [['علّمها للمراجعة', 'flag it for review'], ['أحسن إجابة', 'the best answer'], ['انشرها فورًا', 'publish at once']], 0, B('تحقق.', 'Verification.')),
        Q(B('recall@3 = 0.5 معناها:', 'recall@3 = 0.5 means:'), [['نص الأسئلة القطعة الصح في أول 3', 'half the questions had the right chunk in the top 3'], ['50 سؤال', '50 questions'], ['السرعة 0.5 ثانية', '0.5-second speed']], 0, B('نسبة.', 'A ratio.')),
        Q(B('التطبيع العربي يتطبق على:', 'Arabic normalisation applies to:'), [['المستندات والأسئلة الاتنين', 'both documents and queries'], ['الأسئلة بس', 'queries only'], ['ولا حاجة', 'neither']], 0, B('نفس الشكل.', 'The same form.')),
        Q(B('stale index:', 'A stale index:'), [['فهرس مش متحدّث بالمستندات', 'an index out of date with the documents'], ['فهرس سريع', 'a fast index'], ['ملف محذوف', 'a deleted file']], 0, B('re-index.', 'Re-index.'))
      ] }
  ]
};
