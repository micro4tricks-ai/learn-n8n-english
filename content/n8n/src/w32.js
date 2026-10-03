// n8n week 32 — Documents, OCR and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('المستندات والـ OCR ومشروع الشهر', 'Documents, OCR and the month project'),
  goal: B('تحوّل أكوام الورق والـ PDF لبيانات: تستقبل المستندات، تصنّفها، تقرا الممسوح ضوئيًا، تستخرج الحقول بموديل رؤية، تراجع اللي مش واثق منه إنسان، وتولّد مستندات جديدة وتوقّعها وتأرشفها.',
          'Turn piles of paper and PDFs into data: receive documents, classify them, read scanned ones, extract fields with a vision model, have a person review what is uncertain, and generate, sign and archive new documents.'),
  days: [
    { title: B('خط المستندات', 'The document pipeline'),
      goal: B('تصمّم مسار ثابت لأي مستند من أول ما يوصل لحد ما يتخزّن.', 'Design a fixed path for any document from arrival to storage.'),
      learn: [
        L(B('ست خطوات', 'Six steps'),
          B('**استقبال** (إيميل، Drive، فورم، واتساب) ← **تصنيف** (فاتورة؟ عقد؟ بطاقة؟) ← **استخراج** (الحقول) ← **تحقق** (القواعد) ← **مراجعة** إنسان لو لازم ← **تخزين** (قاعدة بيانات + الملف الأصلي في أرشيف). كل خطوة خدمة لوحدها.', '**Receive** (email, Drive, form, WhatsApp) → **classify** (invoice? contract? ID card?) → **extract** (the fields) → **validate** (the rules) → a person **reviews** if needed → **store** (database + the original file in an archive). Each step is its own service.'),
          'Gmail/Drive → svc: classify doc → svc: extract (by type) → svc: validate\n→ ok ? save : review queue → archive original'),
        L(B('التصنيف أولًا', 'Classify first'),
          B('كل نوع مستند ليه حقول وقواعد مختلفة. صنّف بقواعد بسيطة الأول (اسم الملف، المرسل، كلمات زي «فاتورة» / «Invoice») وبعدين AI للباقي. وخلّي فيه نوع «other» يروح لإنسان بدل ما يتصنّف غلط.', 'Each document type has different fields and rules. Classify with simple rules first (file name, sender, words like «فاتورة» / «Invoice»), then AI for the rest. Keep an «other» type that goes to a person instead of being misclassified.'),
          'rules: sender = billing@supplier.com → invoice\nAI fallback: { "type": "invoice|contract|id_card|receipt|other", "confidence": 0.0-1.0 }'),
        L(B('الملف الأصلي دايمًا', 'Always keep the original'),
          B('متمسحش الأصل أبدًا. ارفعه للأرشيف باسم منظّم (`2026/10/invoice_supplierX_INV-778.pdf`) واحفظ الرابط مع البيانات المستخرجة. لو الاستخراج غلط، ترجع للأصل وتعيد.', 'Never delete the original. Upload it to the archive with a tidy name (`2026/10/invoice_supplierX_INV-778.pdf`) and store the link with the extracted data. If extraction was wrong, you go back to the original and redo it.'),
          'archive path: {{ $now.toFormat("yyyy/MM") }}/{{ type }}_{{ supplier }}_{{ number }}.pdf\nrow: { number, total, …, file_url }')
      ],
      practice: [
        B('اجمع 10 مستندات تجريبية من 3 أنواع (من غير بيانات حقيقية).', 'Collect 10 sample documents of 3 types (no real data).'),
        B('ارسم الخطوات الست لنظامك.', 'Draw the six steps for your system.'),
        B('اعمل مصنّف بقواعد + AI ونوع other.', 'Build a classifier with rules + AI and an «other» type.'),
        B('ارفع الأصل لأرشيف Drive باسم منظّم.', 'Upload the original to a Drive archive with a tidy name.')
      ],
      words: [
        W('document pipeline', 'المسار الثابت لمعالجة المستندات', 'the fixed path for processing documents', 'Every invoice goes through the document pipeline.'),
        W('document classification', 'تحديد نوع المستند', 'deciding a document’s type', 'Document classification comes before extraction.'),
        W('field extraction', 'استخراج قيم محددة من مستند', 'pulling specific values out of a document', 'Field extraction found the total and date.'),
        W('archive naming', 'طريقة تسمية الملفات في الأرشيف', 'the way files are named in the archive', 'Archive naming starts with year and month.'),
        W('original file', 'الملف زي ما وصل من غير تعديل', 'the file exactly as received', 'Keep the original file next to the data.')
      ],
      read: ['lib:n8n Docs: Extract from File', 'lib:n8n Docs: Google Drive node'],
      challenge: B('ابني أول 3 خطوات (استقبال، تصنيف، أرشفة الأصل) لمستندات جاية من إيميل وفولدر Drive، بتقرير يومي بعدد كل نوع.', 'Build the first 3 steps (receive, classify, archive the original) for documents arriving by email and a Drive folder, with a daily report of each type’s count.'),
      quiz: [
        Q(B('ليه التصنيف قبل الاستخراج؟', 'Why classify before extracting?'), [['كل نوع ليه حقول وقواعد مختلفة', 'each type has different fields and rules'], ['أسرع', 'faster'], ['مش لازم', 'not needed']], 0, B('الاستخراج حسب النوع.', 'Extraction depends on type.')),
        Q(B('مستند مش معروف نوعه:', 'A document of unknown type:'), [['يروح لإنسان كـ other', 'goes to a person as other'], ['يتصنّف فاتورة', 'is classed as an invoice'], ['يتمسح', 'is deleted']], 0, B('أحسن من تصنيف غلط.', 'Better than a wrong class.')),
        Q(B('الملف الأصلي بعد الاستخراج:', 'The original file after extraction:'), [['يتأرشف ورابطه يتحفظ', 'is archived and its link stored'], ['يتمسح', 'is deleted'], ['يتبعت للعميل', 'is sent to the client']], 0, B('عشان ترجعله.', 'So you can go back to it.'))
      ] },

    { title: B('PDF نصي ولا ممسوح؟', 'Text PDF or scanned?'),
      goal: B('تعرف تقرا الاتنين، وتعرف إمتى تحتاج OCR.', 'Read both, and know when you need OCR.'),
      learn: [
        L(B('الفرق', 'The difference'),
          B('PDF **نصي** (طالع من برنامج) فيه نص تقدر تحدده: Extract From File بيطلّعه في ثانية ومجانًا. PDF **ممسوح ضوئيًا** (صورة ورقة) مفيهوش نص — محتاج **OCR**. الاختبار السريع: لو الاستخراج طلّع نص فاضي أو حروف قليلة جدًا، غالبًا ممسوح.', 'A **text** PDF (exported from software) has selectable text: Extract From File gets it in a second, for free. A **scanned** PDF (a photo of paper) has no text — it needs **OCR**. The quick test: if extraction returns empty text or very few characters, it is probably scanned.'),
          'Extract From File (PDF) → text.length < 50 ? → OCR path : → text path'),
        L(B('خيارات الـ OCR', 'OCR options'),
          B('**Tesseract** مفتوح المصدر ومجاني (على سيرفرك، بـ Execute Command، وفيه لغة عربي `ara`). خدمات سحابية (Google Document AI، AWS Textract، Azure) أدق وبتفهم الجداول بس بفلوس. وموديلات الرؤية (Claude، GPT، Gemini) بتقرا وتفهم في خطوة واحدة. جرّب على مستنداتك انت قبل ما تختار.', '**Tesseract** is open-source and free (on your server, via Execute Command, with Arabic `ara`). Cloud services (Google Document AI, AWS Textract, Azure) are more accurate and understand tables, but cost money. Vision models (Claude, GPT, Gemini) read and understand in one step. Test on your own documents before choosing.'),
          'Execute Command: tesseract scan.png out -l ara+eng\nor HTTP Request → cloud OCR API\nor AI node (vision) → structured output'),
        L(B('جودة الصورة', 'Image quality'),
          B('دقة الـ OCR بتعتمد على الصورة: 300 DPI على الأقل، مستقيمة (deskew)، إضاءة كويسة، من غير ظل. لو العملاء بيصوّروا بالموبايل، اطلب صورة واضحة في الفورم، وارفض الصور الصغيرة جدًا تلقائيًا.', 'OCR accuracy depends on the image: at least 300 DPI, straight (deskewed), good light, no shadows. If customers photograph with phones, ask for a clear photo in the form, and automatically reject very small images.'),
          'IF image width < 1000 px → reply "please send a clearer photo"')
      ],
      practice: [
        B('اعمل كاشف «نصي ولا ممسوح» بطول النص.', 'Build a «text or scanned» detector using text length.'),
        B('جرّب Tesseract (لو عندك سيرفر) على صورة فاتورة عربي.', 'Try Tesseract (if you have a server) on an Arabic invoice image.'),
        B('جرّب نفس الصورة على موديل رؤية وقارن الدقة.', 'Try the same image on a vision model and compare accuracy.'),
        B('اكتب قواعد رفض للصور الضعيفة.', 'Write rejection rules for poor images.')
      ],
      words: [
        W('scanned pdf', 'PDF عبارة عن صور لورق من غير نص', 'a PDF made of images of paper, with no text', 'A scanned PDF needs OCR.'),
        W('tesseract', 'محرك OCR مفتوح المصدر', 'an open-source OCR engine', 'Tesseract supports Arabic with -l ara.'),
        W('deskew', 'تعدّل ميل الصورة عشان تبقى مستقيمة', 'to straighten a tilted image', 'Deskew the scan before OCR.'),
        W('dpi', 'نقط في البوصة: دقة الصورة', 'dots per inch: an image’s resolution', 'Scan at 300 DPI.'),
        W('vision model', 'موديل AI بيفهم الصور', 'an AI model that understands images', 'The vision model read the receipt.')
      ],
      read: [{ t: 'Tesseract documentation', url: 'https://tesseract-ocr.github.io/tessdoc/', what: B('اقرا التثبيت وتحسين الجودة.', 'Read installation and improving quality.') }, 'lib:n8n Docs: Execute Command'],
      challenge: B('ابني `svc: read document`: يحدد نصي ولا ممسوح، يختار المسار (استخراج مباشر، OCR، أو موديل رؤية)، ويرجّع `{ text, method, chars }`. وقارن الطرق على 5 مستندات.', 'Build `svc: read document`: decide text or scanned, pick the path (direct extraction, OCR, or a vision model), and return `{ text, method, chars }`. Compare the methods on 5 documents.'),
      quiz: [
        Q(B('الاستخراج من PDF طلّع نص فاضي:', 'Extraction from a PDF returned empty text:'), [['غالبًا ممسوح؛ محتاج OCR', 'probably scanned; needs OCR'], ['الملف فاضي', 'the file is empty'], ['n8n عطلان', 'n8n is broken']], 0, B('مفيش طبقة نص.', 'No text layer.')),
        Q(B('أهم حاجة لدقة الـ OCR:', 'The key to OCR accuracy:'), [['جودة الصورة', 'image quality'], ['اسم الملف', 'the file name'], ['حجم الـ PDF', 'the PDF size']], 0, B('300 DPI ومستقيمة.', '300 DPI and straight.')),
        Q(B('Tesseract ميزته:', 'Tesseract’s advantage:'), [['مجاني على سيرفرك', 'free on your server'], ['بيفهم الجداول دايمًا', 'always understands tables'], ['أدق من الكل', 'most accurate of all']], 0, B('مفتوح المصدر.', 'Open source.'))
      ] },

    { title: B('الاستخراج بموديل رؤية', 'Extraction with a vision model'),
      goal: B('تطلّع حقول دقيقة بشكل ثابت وتتأكد منها بقواعد.', 'Get accurate fields in a fixed shape and check them with rules.'),
      learn: [
        L(B('schema لكل نوع', 'A schema per type'),
          B('لكل نوع مستند **extraction schema**: الحقول، نوع كل واحد، وإيه اللي إجباري. ابعت الصورة أو الـ PDF لموديل multimodal مع الـ schema في Structured Output Parser، وقول له «لو مش موجود اكتب null، متخمّنش».', 'For each document type an **extraction schema**: the fields, each one’s type, and what is required. Send the image or PDF to a multimodal model with the schema in a Structured Output Parser, and tell it «if it is missing, write null; do not guess».'),
          '{ "supplier": "string", "invoice_number": "string", "date": "YYYY-MM-DD",\n  "lines": [{ "item": "string", "qty": "number", "price": "number" }],\n  "subtotal": "number", "vat": "number", "total": "number" }'),
        L(B('قواعد التحقق', 'Validation rules'),
          B('الموديل ممكن يغلط بثقة. فاتأكد بالحساب: مجموع السطور = subtotal؟ subtotal + vat = total؟ التاريخ مش في المستقبل؟ رقم الفاتورة مش مكرر عند نفس المورّد؟ أي قاعدة تفشل ← مراجعة إنسان.', 'The model can be confidently wrong. So check with arithmetic: do the lines add up to the subtotal? subtotal + vat = total? is the date not in the future? is the invoice number not repeated for the same supplier? Any failed rule → human review.'),
          "const sum = $json.lines.reduce((s, l) => s + l.qty * l.price, 0);\nconst problems = [];\nif (Math.abs(sum - $json.subtotal) > 0.5) problems.push('lines ≠ subtotal');\nif (Math.abs($json.subtotal + $json.vat - $json.total) > 0.5) problems.push('total mismatch');"),
        L(B('درجة الثقة', 'A confidence score'),
          B('اطلب من الموديل `confidence` لكل حقل مهم (0–1)، أو احسبها انت: الحقول الناقصة، القواعد الفاشلة، جودة الصورة. فوق 0.9 ومن غير مشاكل ← تلقائي. غير كده ← مراجعة. ومع الوقت قيس: الثقة العالية بتطلع صح فعلًا؟', 'Ask the model for a `confidence` per important field (0–1), or compute it yourself: missing fields, failed rules, image quality. Above 0.9 with no problems → automatic. Otherwise → review. Over time measure: is high confidence really right?'),
          'auto = confidence >= 0.9 && problems.length === 0 → save\nelse → review queue')
      ],
      practice: [
        B('اكتب schema للفواتير وschema للإيصالات.', 'Write a schema for invoices and one for receipts.'),
        B('استخرج 5 فواتير بموديل رؤية بالـ schema.', 'Extract 5 invoices with a vision model using the schema.'),
        B('ضيف 4 قواعد تحقق بالحساب.', 'Add 4 arithmetic validation rules.'),
        B('احسب نسبة الفواتير اللي عدّت تلقائي.', 'Compute the share of invoices that passed automatically.')
      ],
      words: [
        W('multimodal', 'موديل بيفهم أكتر من نوع (نص وصور)', 'a model that understands more than one kind of input (text and images)', 'A multimodal model can read invoices.'),
        W('extraction schema', 'شكل الحقول المطلوب استخراجها', 'the shape of the fields to extract', 'The extraction schema requires a total.'),
        W('validation rule', 'قاعدة بتتأكد إن البيانات منطقية', 'a rule checking the data makes sense', 'A validation rule caught the wrong total.'),
        W('confidence score', 'رقم بيقول قد إيه النتيجة موثوقة', 'a number saying how trustworthy a result is', 'Below 0.9 confidence score → review.'),
        W('invoice parsing', 'قراءة الفاتورة وتحويلها لبيانات', 'reading an invoice and turning it into data', 'Invoice parsing saves the accountant hours.')
      ],
      read: ['lib:n8n Docs: Advanced AI', { t: 'Claude docs: Vision', url: 'https://platform.claude.com/docs/en/build-with-claude/vision', what: B('اقرا حدود الصور ونصايح الدقة.', 'Read the image limits and accuracy tips.') }],
      challenge: B('ابني `svc: extract invoice`: schema، موديل رؤية، 5 قواعد تحقق، ودرجة ثقة، ويرجّع `{ data, problems, confidence, auto }` — واختبره على 15 فاتورة متنوعة (منها 3 فيها أخطاء متعمدة).', 'Build `svc: extract invoice`: a schema, a vision model, 5 validation rules and a confidence score, returning `{ data, problems, confidence, auto }` — test it on 15 varied invoices (3 with deliberate mistakes).'),
      quiz: [
        Q(B('الحقل مش موجود في الفاتورة:', 'A field is missing from the invoice:'), [['null، من غير تخمين', 'null, no guessing'], ['أي قيمة', 'any value'], ['قيمة الفاتورة اللي فاتت', 'last invoice’s value']], 0, B('التخمين خطر.', 'Guessing is dangerous.')),
        Q(B('subtotal + vat ≠ total:', 'subtotal + vat ≠ total:'), [['مراجعة إنسان', 'human review'], ['احفظ عادي', 'save anyway'], ['امسح الفاتورة', 'delete the invoice']], 0, B('قاعدة فشلت.', 'A rule failed.')),
        Q(B('ليه قواعد بالحساب لو الموديل ذكي؟', 'Why arithmetic rules if the model is smart?'), [['الموديل ممكن يغلط بثقة', 'the model can be confidently wrong'], ['مش لازم', 'not needed'], ['للسرعة', 'for speed']], 0, B('تحقق مستقل.', 'Independent checking.'))
      ] },

    { title: B('المراجعة البشرية', 'Human review'),
      goal: B('الإنسان يراجع بسرعة اللي مش واثق منه، وتصحيحاته تحسّن النظام.', 'A person quickly reviews what is uncertain, and their corrections improve the system.'),
      learn: [
        L(B('طابور المراجعة', 'The review queue'),
          B('المستندات اللي محتاجة مراجعة تروح لـ **review queue**: جدول أو شيت فيه رابط الأصل، والقيم المستخرجة، والمشاكل. المراجع يفتح فورم n8n (أو الشيت)، يشوف الصورة والقيم جنب بعض، يصحّح ويوافق. الموافقة بتكمّل الـ workflow (Wait بـ resume أو حالة في الجدول).', 'Documents needing review go to a **review queue**: a table or sheet with the original’s link, the extracted values and the problems. The reviewer opens an n8n form (or the sheet), sees the image and values side by side, corrects and approves. Approval continues the workflow (a Wait with resume, or a status in the table).'),
          'review_queue(id, file_url, extracted jsonb, problems, status, reviewer, corrected jsonb)\nstatus: pending → approved / rejected'),
        L(B('التصحيحات = بيانات تعلّم', 'Corrections = learning data'),
          B('كل تصحيح بيقولك فين الموديل بيغلط. احفظ الفرق بين المستخرج والمصحّح، وكل أسبوع شوف الأنماط: نفس المورّد؟ نفس الحقل؟ وحسّن البرومبت أو ضيف التصحيحات كأمثلة (few-shot) لنفس المورّد. ده بيقلل المراجعة مع الوقت.', 'Every correction tells you where the model fails. Store the difference between extracted and corrected, and weekly look for patterns: the same supplier? the same field? Then improve the prompt or add corrections as examples (few-shot) for that supplier. Review shrinks over time.'),
          'diff: { field: "date", extracted: "2026-03-10", corrected: "2026-10-03" }\npattern: supplier X writes dates as dd/mm → add a rule + an example'),
        L(B('سجل التدقيق', 'The audit trail'),
          B('في المستندات المالية والقانونية لازم تعرف: مين وافق على إيه وإمتى، والقيمة كانت إيه قبل وبعد. سجّل كل فعل في جدول ميتعدلش (append-only). ده بيحميك وقت المراجعة الحسابية أو أي خلاف.', 'For financial and legal documents you must know: who approved what and when, and what the value was before and after. Record every action in a table that is never edited (append-only). This protects you during an audit or any dispute.'),
          'audit_log(at, actor, doc_id, action, before, after)\n("2026-10-03 11:02", "mona", 778, "corrected total", 1200, 1250)')
      ],
      practice: [
        B('اعمل review queue وفورم مراجعة بيعرض الرابط والقيم.', 'Build a review queue and a review form showing the link and values.'),
        B('خلّي الموافقة تكمّل الحفظ.', 'Make approval continue the save.'),
        B('احفظ الفروق واعمل تقرير أسبوعي بالأنماط.', 'Store the differences and make a weekly pattern report.'),
        B('اعمل audit_log وسجّل فيه كل تصحيح.', 'Create an audit_log and record every correction.')
      ],
      words: [
        W('review queue', 'قايمة المستندات المستنية مراجعة إنسان', 'the list of documents waiting for a person to review', 'Low-confidence invoices go to the review queue.'),
        W('human-in-the-loop', 'إنسان بيراجع جزء من الشغل الآلي', 'a person reviewing part of the automated work', 'Human-in-the-loop keeps accuracy high.'),
        W('correction loop', 'استخدام التصحيحات لتحسين النظام', 'using corrections to improve the system', 'The correction loop cut reviews by half.'),
        W('audit trail', 'سجل مين عمل إيه وإمتى', 'a record of who did what and when', 'The audit trail shows who changed the total.'),
        W('ground truth', 'القيمة الصح المؤكدة للمقارنة', 'the confirmed correct value for comparison', 'Reviewed invoices become ground truth.')
      ],
      read: ['lib:n8n Docs: n8n Form Trigger', { lib: 'n8n Docs: Wait node', what: B('اقرا وضع انتظار الـ webhook (resume).', 'Read the webhook (resume) wait mode.') }],
      challenge: B('اكمل نظام الفواتير بمراجعة بشرية: طابور، فورم بالصورة والقيم، موافقة تكمّل، سجل تدقيق، وتقرير أسبوعي بأكتر الأخطاء ونسبة التلقائي.', 'Complete the invoice system with human review: a queue, a form with image and values, approval that continues, an audit log, and a weekly report of the top errors and the automatic rate.'),
      quiz: [
        Q(B('المراجع لازم يشوف:', 'The reviewer must see:'), [['الأصل والقيم المستخرجة جنب بعض', 'the original and the extracted values side by side'], ['القيم بس', 'only the values'], ['اسم الملف بس', 'only the file name']], 0, B('عشان يقارن.', 'To compare.')),
        Q(B('التصحيحات بتستخدم في:', 'Corrections are used to:'), [['تحسين البرومبت والأمثلة', 'improve the prompt and examples'], ['ولا حاجة', 'nothing'], ['المسح', 'deletion']], 0, B('مراجعة أقل مع الوقت.', 'Less review over time.')),
        Q(B('سجل التدقيق لازم يكون:', 'The audit log must be:'), [['append-only ميتعدلش', 'append-only, never edited'], ['قابل للتعديل', 'editable'], ['مؤقت', 'temporary']], 0, B('دليل موثوق.', 'Trustworthy evidence.'))
      ] },

    { title: B('توليد المستندات وتوقيعها', 'Generating and signing documents'),
      goal: B('تعمل عقود وفواتير PDF من قوالب، تتوقّع إلكترونيًا، وتتأرشف.', 'Create contract and invoice PDFs from templates, get them e-signed, and archive them.'),
      learn: [
        L(B('قالب HTML ← PDF', 'HTML template → PDF'),
          B('اكتب المستند كـ **document template** بـ HTML وCSS (فيه خانات `{{ }}`)، املاه من البيانات، وحوّله PDF بخدمة (Gotenberg على سيرفرك، أو API تحويل، أو نود community). الخط العربي محتاج font مدعوم واتجاه `dir="rtl"`.', 'Write the document as a **document template** in HTML and CSS (with `{{ }}` slots), fill it from the data, and turn it into a PDF with a service (Gotenberg on your server, a conversion API, or a community node). Arabic text needs a supported font and `dir="rtl"`.'),
          'HTML node (template with {{ $json.client }}, {{ $json.total }})\n→ HTTP Request POST gotenberg:3000/forms/chromium/convert/html (form-data: index.html)\n→ binary PDF'),
        L(B('التوقيع الإلكتروني', 'E-signatures'),
          B('خدمات التوقيع (Docusign، Dropbox Sign، وغيرها) ليها API: تبعت الـ PDF والموقّعين ← الخدمة تبعتلهم إيميل ← webhook لما يوقّعوا ← تنزّل **النسخة الموقّعة** وتأرشفها وتحرّك الصفقة. متبعتش العقد بإيميل عادي وتستنى رد.', 'Signing services (Docusign, Dropbox Sign and others) have APIs: send the PDF and the signers → the service emails them → a webhook when they sign → download the **signed copy**, archive it and move the deal. Do not email the contract and wait for a reply.'),
          'contract PDF → e-sign API (signers: client, you) → webhook "completed"\n→ download signed copy → archive → CRM deal: contract signed'),
        L(B('مدة الحفظ', 'How long to keep'),
          B('مش كل حاجة تتحفظ للأبد: حدّد **retention period** لكل نوع (الفواتير سنين حسب القانون الضريبي، صور البطاقات أقل مدة ممكنة). workflow شهري بيمسح أو يأرشف اللي مدته خلصت، ويسجّل إنه عمل كده.', 'Not everything is kept forever: set a **retention period** per type (invoices for years per tax law, ID card images for the shortest time possible). A monthly workflow deletes or archives what has expired, and logs that it did so.'),
          'retention: invoices 5+ years (check local law) · id_card 30 days after verification\nmonthly: delete expired → audit_log "deleted by retention"')
      ],
      practice: [
        B('اعمل قالب فاتورة HTML عربي/إنجليزي.', 'Build an Arabic/English HTML invoice template.'),
        B('حوّله PDF (Gotenberg في Docker أو خدمة تجريبية).', 'Turn it into a PDF (Gotenberg in Docker or a trial service).'),
        B('اقرا توثيق API توقيع إلكتروني واكتب الخطوات.', 'Read an e-signature API’s docs and write the steps.'),
        B('اكتب جدول retention لـ 4 أنواع مستندات.', 'Write a retention table for 4 document types.')
      ],
      words: [
        W('document template', 'قالب مستند بخانات بتتملي', 'a document layout with slots to fill', 'Fill the document template with the client’s data.'),
        W('e-signature', 'توقيع إلكتروني على مستند', 'an electronic signature on a document', 'The client added an e-signature in minutes.'),
        W('signed copy', 'النسخة النهائية بعد التوقيع', 'the final version after signing', 'Archive the signed copy, not the draft.'),
        W('retention period', 'المدة اللي المستند لازم يتحفظ فيها', 'how long a document must be kept', 'The retention period for ID images is 30 days.'),
        W('pdf rendering', 'تحويل صفحة HTML لملف PDF', 'turning an HTML page into a PDF file', 'PDF rendering runs in a small Docker service.')
      ],
      read: [{ t: 'Gotenberg documentation', url: 'https://gotenberg.dev/docs/getting-started/introduction', what: B('اقرا التشغيل وتحويل HTML.', 'Read running it and converting HTML.') }, 'lib:n8n Docs: HTML node'],
      challenge: B('ابني «مولّد العقود»: بيانات الصفقة ← قالب HTML ← PDF ← توقيع إلكتروني (أو محاكاة بـ webhook) ← أرشفة النسخة الموقّعة ← تحديث الـ CRM، مع retention شهري.', 'Build a «contract generator»: deal data → HTML template → PDF → e-signature (or a webhook simulation) → archive the signed copy → update the CRM, with monthly retention.'),
      quiz: [
        Q(B('PDF عربي من HTML محتاج:', 'An Arabic PDF from HTML needs:'), [['خط مدعوم وdir="rtl"', 'a supported font and dir="rtl"'], ['صور بس', 'only images'], ['مش ممكن', 'it is impossible']], 0, B('عشان الحروف والاتجاه.', 'For letters and direction.')),
        Q(B('بعد ما العميل يوقّع:', 'After the client signs:'), [['تنزّل النسخة الموقّعة وتأرشفها', 'download and archive the signed copy'], ['تمسح العقد', 'delete the contract'], ['تستنى إيميل', 'wait for an email']], 0, B('من الـ webhook.', 'From the webhook.')),
        Q(B('صور البطاقات الشخصية:', 'ID card images:'), [['أقل مدة حفظ ممكنة', 'the shortest retention possible'], ['للأبد', 'forever'], ['في إيميل عام', 'in a shared inbox']], 0, B('بيانات حساسة.', 'Sensitive data.'))
      ] },

    { title: B('مراجعة الشهر الثامن ومشروعه', 'Month 8 review and project'),
      goal: B('أنظمة شغل حقيقية: مبيعات، تجارة، رسايل، ومستندات.', 'Real business systems: sales, commerce, messaging and documents.'),
      review: [
        B('الـ CRM: نموذج البيانات، الـ leads، التقييم والتوزيع، والـ pipeline والمزامنة (أسبوع 29).', 'The CRM: data model, leads, scoring and assignment, pipeline and sync (week 29).'),
        B('التجارة: الطلبات، الدفع المؤكد، التوقيعات، المخزون، والمطابقة (أسبوع 30).', 'Commerce: orders, confirmed payment, signatures, stock and reconciliation (week 30).'),
        B('الرسايل: قوالب واتساب، الطابور، توثيق الإيميل، الحالات، والموافقة (أسبوع 31).', 'Messaging: WhatsApp templates, the queue, email authentication, statuses and consent (week 31).'),
        B('المستندات: التصنيف، الـ OCR، الاستخراج بموديل رؤية، والقواعد والثقة.', 'Documents: classification, OCR, extraction with a vision model, rules and confidence.'),
        B('المراجعة البشرية، سجل التدقيق، التوليد والتوقيع والحفظ.', 'Human review, the audit trail, generating, signing and retention.')
      ],
      project: B('مشروع الشهر الثامن: «مكتب آلي» لشركة صغيرة: فواتير الموردين جاية بالإيميل ← تصنيف واستخراج بموديل رؤية وقواعد ← مراجعة بشرية للمشكوك فيه ← تسجيل في قاعدة بيانات وأرشيف ← تقرير شهري للمصروفات؛ وفي الاتجاه التاني: صفقة Won في الـ CRM ← عقد PDF ← توقيع ← فاتورة ← رسالة واتساب للعميل. كل حاجة بسجل تدقيق وretention. سلّم رسمة وREADME وفيديو.', 'Month 8 project: an «automated back office» for a small company: supplier invoices arriving by email → classification and extraction with a vision model and rules → human review of doubtful ones → saved to a database and archive → a monthly expense report; and the other direction: a Won deal in the CRM → a contract PDF → signature → an invoice → a WhatsApp message to the client. Everything with an audit trail and retention. Deliver a diagram, a README and a video.'),
      test: [
        Q(B('أول خطوة بعد استقبال مستند:', 'The first step after receiving a document:'), [['التصنيف', 'classification'], ['الحذف', 'deletion'], ['التوقيع', 'signing']], 0, B('النوع بيحدد الباقي.', 'The type decides the rest.')),
        Q(B('PDF ممسوح ضوئيًا محتاج:', 'A scanned PDF needs:'), [['OCR أو موديل رؤية', 'OCR or a vision model'], ['Extract From File بس', 'only Extract From File'], ['ولا حاجة', 'nothing']], 0, B('مفيش نص جواه.', 'There is no text inside.')),
        Q(B('دقة الـ OCR بتتحسن بـ:', 'OCR accuracy improves with:'), [['صورة 300 DPI مستقيمة', 'a straight 300 DPI image'], ['ملف أكبر', 'a bigger file'], ['اسم أطول', 'a longer name']], 0, B('جودة الصورة.', 'Image quality.')),
        Q(B('extraction schema بيحدد:', 'An extraction schema defines:'), [['الحقول وأنواعها', 'the fields and their types'], ['لون الفاتورة', 'the invoice colour'], ['المورّد', 'the supplier']], 0, B('شكل ثابت.', 'A fixed shape.')),
        Q(B('مجموع السطور ≠ subtotal:', 'Lines ≠ subtotal:'), [['مراجعة', 'review'], ['حفظ', 'save'], ['إرسال للعميل', 'send to the client']], 0, B('قاعدة فشلت.', 'A rule failed.')),
        Q(B('ثقة 0.95 ومفيش مشاكل:', 'Confidence 0.95 and no problems:'), [['حفظ تلقائي', 'save automatically'], ['مراجعة دايمًا', 'always review'], ['رفض', 'reject']], 0, B('فوق الحد.', 'Above the threshold.')),
        Q(B('التصحيحات البشرية:', 'Human corrections:'), [['بتتحفظ وتحسّن النظام', 'are stored and improve the system'], ['بتتنسي', 'are forgotten'], ['بتتمسح', 'are deleted']], 0, B('correction loop.', 'The correction loop.')),
        Q(B('سجل التدقيق بيسجّل:', 'The audit log records:'), [['مين وإمتى وقبل وبعد', 'who, when, before and after'], ['الكود', 'the code'], ['كلمات السر', 'passwords']], 0, B('للمراجعة الحسابية.', 'For audits.')),
        Q(B('الأرشيف بيحفظ:', 'The archive keeps:'), [['الأصل باسم منظم', 'the original with a tidy name'], ['نسخة معدّلة بس', 'only an edited copy'], ['ولا حاجة', 'nothing']], 0, B('ترجعله.', 'You can go back to it.')),
        Q(B('PDF من HTML بأداة مفتوحة المصدر:', 'PDF from HTML with an open-source tool:'), [['Gotenberg', 'Gotenberg'], ['Tesseract', 'Tesseract'], ['DMARC', 'DMARC']], 0, B('بيشتغل في Docker.', 'It runs in Docker.')),
        Q(B('العقد اتوقّع. التريجر:', 'The contract was signed. The trigger is:'), [['webhook من خدمة التوقيع', 'a webhook from the signing service'], ['إيميل يدوي', 'a manual email'], ['Schedule كل سنة', 'a yearly Schedule']], 0, B('وبعدين أرشفة.', 'Then archiving.')),
        Q(B('retention period بيتحدد:', 'A retention period is set:'), [['لكل نوع حسب القانون والحساسية', 'per type by law and sensitivity'], ['واحد لكل حاجة', 'one for everything'], ['مش مهم', 'not important']], 0, B('الحساس أقل مدة.', 'Sensitive data kept shortest.'))
      ] }
  ]
};
