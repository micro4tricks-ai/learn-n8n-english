// n8n week 26 — Advanced data: binary, merging and aggregation.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('بيانات متقدمة: الملفات والدمج والتجميع', 'Advanced data: binary, merging and aggregation'),
  goal: B('تتعامل بثقة مع الملفات (binary) وتحوّلها، وتدمج مصادر بشروط معقدة، وتجمّع وتلخّص آلاف الصفوف من غير ما الذاكرة تقع.',
          'Handle files (binary) confidently and convert them, merge sources with complex conditions, and group and summarise thousands of rows without running out of memory.'),
  days: [
    { title: B('الـ binary من جوه', 'Binary data from the inside'),
      goal: B('تفهم إزاي n8n بيخزّن الملفات وتتحكم فيها.', 'Understand how n8n stores files and control them.'),
      learn: [
        L(B('العنصر = json + binary', 'An item = json + binary'),
          B('كل عنصر فيه جزئين: `json` (البيانات) و`binary` (الملفات). الـ binary ليه **أسماء خصائص** زي `data` أو `invoice` أو `photo_1`، وكل واحدة فيها اسم الملف ونوعه (mimeType) وحجمه. ممكن العنصر الواحد يشيل أكتر من ملف.', 'Each item has two parts: `json` (the data) and `binary` (the files). Binary has **property names** like `data`, `invoice` or `photo_1`, each holding the file name, type (mimeType) and size. One item can carry several files.'),
          '{ json: { order: 1042 },\n  binary: { invoice: { fileName: "INV-1042.pdf", mimeType: "application/pdf" },\n            receipt: { fileName: "r.jpg", mimeType: "image/jpeg" } } }'),
        L(B('اسم الخاصية لازم يطابق', 'The property name must match'),
          B('أشهر غلطة: نود Gmail مستني الملف في `data` والنود اللي قبله سمّاه `attachment_0`. في خانة «Binary Property» (أو Attachments) اكتب الاسم الصح. تبويب **Binary** في الخرج بيوريك الأسماء الحقيقية.', 'The most common mistake: a Gmail node expects the file in `data` while the node before named it `attachment_0`. In the «Binary Property» (or Attachments) field, write the right name. The **Binary** tab in the output shows the real names.'),
          'Gmail Trigger (Download Attachments) → binary: attachment_0, attachment_1\nGoogle Drive Upload → Input Data Field Name: attachment_0'),
        L(B('الذاكرة ولا القرص', 'Memory or disk'),
          B('افتراضيًا n8n بيحط الملفات في الذاكرة. مع ملفات كبيرة أو كتير، شغّله بـ `N8N_DEFAULT_BINARY_DATA_MODE=filesystem` فالملفات تتحفظ على القرص والذاكرة متتملاش. ده إعداد للسيرفر بتاعك (self-hosted).', 'By default n8n keeps files in memory. With big or many files, run it with `N8N_DEFAULT_BINARY_DATA_MODE=filesystem` so files are stored on disk and memory does not fill up. This is a setting for your own server (self-hosted).'),
          'environment:\n  - N8N_DEFAULT_BINARY_DATA_MODE=filesystem')
      ],
      practice: [
        B('نزّل إيميل فيه مرفقين وشوف أسماء الـ binary في تبويب Binary.', 'Download an email with two attachments and look at the binary names in the Binary tab.'),
        B('ارفع المرفق التاني بس لـ Drive بالاسم الصح.', 'Upload only the second attachment to Drive using the right name.'),
        B('شغّل n8n محلي بوضع filesystem وارفع ملف 50MB.', 'Run a local n8n in filesystem mode and upload a 50 MB file.'),
        B('اكتب جدول: نود ← اسم الـ binary اللي بيطلّعه ← اللي بيستناه.', 'Write a table: node → binary name it outputs → the name it expects.')
      ],
      words: [
        W('binary slot', 'الخانة اللي الملف متخزّن فيها جوه العنصر', 'the slot on an item where a file is stored', 'The PDF sits in the invoice binary slot.'),
        W('mimetype', 'نوع الملف زي application/pdf', 'a file’s type, like application/pdf', 'Check the mimeType before converting.'),
        W('filesystem mode', 'وضع بيحفظ الملفات على القرص بدل الذاكرة', 'a mode that stores files on disk instead of memory', 'Use filesystem mode for large files.'),
        W('attachment_0', 'الاسم الافتراضي لأول مرفق إيميل في n8n', 'the default name of the first email attachment in n8n', 'Gmail puts the first file in attachment_0.'),
        W('file name', 'اسم الملف اللي هيتحفظ بيه', 'the name the file will be saved with', 'Set the file name to INV-{{ $json.id }}.pdf.')
      ],
      read: ['lib:n8n Docs: Binary data', { lib: 'n8n Docs: Memory-related errors', what: B('اقرا جزء الملفات الكبيرة ووضع filesystem.', 'Read the part on big files and filesystem mode.') }],
      challenge: B('اعمل workflow بيستقبل إيميلات فيها مرفقات متعددة، ويرفع كل مرفق PDF لفولدر Drive باسم منظّم (التاريخ + المرسل)، ويتجاهل الصور.', 'Build a workflow that receives emails with several attachments, uploads every PDF attachment to a Drive folder with a tidy name (date + sender), and ignores images.'),
      quiz: [
        Q(B('الملف في العنصر بيتخزّن في:', 'A file on an item is stored in:'), [['binary', 'binary'], ['json', 'json'], ['اسم النود', 'the node name']], 0, B('json للبيانات، binary للملفات.', 'json for data, binary for files.')),
        Q(B('نود مش لاقي الملف. أول حاجة تشوفها:', 'A node cannot find the file. First check:'), [['اسم الـ binary property', 'the binary property name'], ['لون النود', 'the node colour'], ['الإنترنت', 'the internet']], 0, B('غالبًا الاسم مختلف.', 'The name usually differs.')),
        Q(B('ملفات كبيرة كتير على سيرفرك:', 'Many big files on your server:'), [['وضع filesystem', 'filesystem mode'], ['الذاكرة دايمًا', 'always memory'], ['تقسيم الملف بإيدك', 'split the file by hand']], 0, B('القرص بدل الذاكرة.', 'Disk instead of memory.'))
      ] },

    { title: B('تحويل الملفات', 'Converting files'),
      goal: B('تقرا CSV وExcel وPDF لعناصر، وترجّع عناصر لملفات.', 'Read CSV, Excel and PDF into items, and turn items back into files.'),
      learn: [
        L(B('Extract From File', 'Extract From File'),
          B('بياخد binary ويطلّع عناصر: CSV وXLSX (صف = عنصر)، PDF (النص)، JSON، HTML، ICS. اختار العملية حسب نوع الملف، وفي Excel حدد اسم الشيت لو فيه أكتر من واحد. اتأكد إن الأعمدة طلعت أسماء مش «column_1».', 'It takes binary and outputs items: CSV and XLSX (a row = an item), PDF (the text), JSON, HTML, ICS. Pick the operation by file type, and for Excel set the sheet name if there are several. Check the columns came out as names, not «column_1».'),
          'Read/Write Files (read orders.xlsx) → Extract From File: XLSX, sheet "September"\n→ 240 items { order_id, customer, total }'),
        L(B('Convert to File', 'Convert to File'),
          B('العكس: عناصر ← ملف CSV أو XLSX أو JSON أو HTML أو text، أو binary من base64. الملف بيطلع في `data` وتقدر تبعته إيميل أو ترفعه. حدد اسم الملف بتعبير فيه التاريخ عشان التقارير متتكتبش فوق بعض.', 'The reverse: items → a CSV, XLSX, JSON, HTML or text file, or binary from base64. The file comes out in `data` so you can email or upload it. Set the file name with an expression including the date so reports do not overwrite each other.'),
          'Convert to File: XLSX, File Name: report-{{ $now.toFormat("yyyy-MM-dd") }}.xlsx\n→ Gmail: attach data'),
        L(B('binary في Code node', 'Binary in a Code node'),
          B('`$input.item.binary` بيوريك الملفات. لتحويل نص لملف: اعمل `Buffer` وحطه base64 في `binary.data.data` مع `mimeType` و`fileName`، أو استخدم `this.helpers.prepareBinaryData(buffer, name)` الأسهل. وللقراية: `this.helpers.getBinaryDataBuffer(i, \'data\')`.', '`$input.item.binary` shows the files. To turn text into a file: make a `Buffer` and put it as base64 into `binary.data.data` with `mimeType` and `fileName`, or use the easier `this.helpers.prepareBinaryData(buffer, name)`. To read: `this.helpers.getBinaryDataBuffer(i, \'data\')`.'),
          "const csv = 'id,total\\n1,300\\n';\nconst data = await this.helpers.prepareBinaryData(Buffer.from(csv), 'mini.csv', 'text/csv');\nreturn [{ json: {}, binary: { data } }];")
      ],
      practice: [
        B('اقرا ملف Excel فيه شيتين، كل شيت في فرع.', 'Read an Excel file with two sheets, each in its own branch.'),
        B('طلّع النص من PDF فاتورة ودوّر فيه على الإجمالي بـ regex.', 'Extract the text from an invoice PDF and find the total with a regex.'),
        B('حوّل 100 عنصر لـ XLSX باسم فيه التاريخ وابعته لنفسك.', 'Turn 100 items into an XLSX named with the date and email it to yourself.'),
        B('اعمل ملف CSV صغير من Code node بـ prepareBinaryData.', 'Create a small CSV file from a Code node with prepareBinaryData.')
      ],
      words: [
        W('file parsing', 'قراءة محتوى ملف وتحويله لبيانات', 'reading a file’s content and turning it into data', 'File parsing turns the XLSX rows into items.'),
        W('file export', 'تحويل البيانات لملف تبعته أو تحفظه', 'turning data into a file to send or store', 'The file export creates the weekly report.'),
        W('spreadsheet file', 'ملف جداول زي Excel', 'a table file such as Excel', 'Send the totals as a spreadsheet file.'),
        W('binary helper', 'دالة مساعدة بتعمل أو تقرا ملفات في Code node', 'a helper that creates or reads files in a Code node', 'Use the binary helper to attach the CSV.'),
        W('sheet tab', 'ورقة واحدة جوه ملف Excel', 'one worksheet inside an Excel file', 'Read the September sheet tab.')
      ],
      read: ['lib:n8n Docs: Extract from File', 'lib:n8n Docs: Convert to File'],
      challenge: B('اعمل «محوّل تقارير»: فورم بيرفع ملف Excel أو CSV، الـ workflow ينضّف الأعمدة، ويحسب إجمالي لكل عميل، ويرجّع ملف XLSX جديد بالإيميل.', 'Build a «report converter»: a form uploads an Excel or CSV file, the workflow cleans the columns, computes a total per customer, and returns a new XLSX file by email.'),
      quiz: [
        Q(B('عشان تحوّل PDF لنص:', 'To turn a PDF into text:'), [['Extract From File (PDF)', 'Extract From File (PDF)'], ['Convert to File', 'Convert to File'], ['Edit Fields', 'Edit Fields']], 0, B('من ملف لعناصر.', 'From a file to items.')),
        Q(B('اسم التقرير فيه التاريخ عشان:', 'The report name includes the date so:'), [['الملفات متتكتبش فوق بعض', 'files do not overwrite each other'], ['يبقى أجمل', 'it looks nicer'], ['n8n بيطلب كده', 'n8n requires it']], 0, B('كل يوم ملف.', 'One file per day.')),
        Q(B('أسهل طريقة تعمل ملف في Code node:', 'The easiest way to make a file in a Code node:'), [['prepareBinaryData', 'prepareBinaryData'], ['JSON.stringify بس', 'only JSON.stringify'], ['console.log', 'console.log']], 0, B('بيظبط الاسم والنوع.', 'It sets the name and type.'))
      ] },

    { title: B('Merge المتقدم', 'Advanced Merge'),
      goal: B('تدمج مصدرين بمفاتيح متعددة وتعرف تعمل إيه باللي ملوش مقابل.', 'Merge two sources on several keys and know what to do with non-matches.'),
      learn: [
        L(B('أنواع الخرج في Combine by matching fields', 'Output types when combining by matching fields'),
          B('**Keep Matches** (اللي ليهم مقابل بس)، **Keep Non-Matches** (اللي ملهمش)، **Keep Everything**، و**Enrich Input 1/2** (المدخل كله + بيانات من التاني لو موجودة — زي LEFT JOIN). اختار حسب السؤال: «مين اشترى؟» ولا «مين ماشتراش؟».', '**Keep Matches** (only those with a match), **Keep Non-Matches** (those without), **Keep Everything**, and **Enrich Input 1/2** (all of one input + data from the other when found — like a LEFT JOIN). Choose by the question: «who bought?» or «who did not buy?».'),
          'Customers (input 1) + Orders this month (input 2), match on customer_id\nKeep Non-Matches → customers who did not order → win-back campaign'),
        L(B('أكتر من مفتاح', 'More than one key'),
          B('أحيانًا المطابقة محتاجة حقلين: (`sku`، `warehouse`) أو (`email`، `month`). في Merge ضيف أكتر من زوج حقول. ولو الحقول مختلفة الشكل (`Sara@X.com` و`sara@x.com`)، وحّدها الأول بـ Edit Fields (lowercase، trim).', 'Sometimes matching needs two fields: (`sku`, `warehouse`) or (`email`, `month`). In Merge add more than one field pair. If the fields differ in form (`Sara@X.com` vs `sara@x.com`), normalise them first with Edit Fields (lowercase, trim).'),
          'Fields to match: sku = sku, warehouse = warehouse\nbefore: Edit Fields → email = {{ $json.email.trim().toLowerCase() }}'),
        L(B('التكرار في المطابقة', 'Duplicates in matching'),
          B('لو المدخل التاني فيه أكتر من صف لنفس المفتاح (عميل عنده 3 طلبات)، الدمج بيطلّع صف لكل تطابق — يعني العميل يتكرر 3 مرات. لو عايز صف واحد، جمّع التاني الأول (Summarize) وبعدين ادمج.', 'If the second input has several rows for the same key (a customer with 3 orders), the merge outputs a row per match — the customer appears 3 times. If you want one row, aggregate the second input first (Summarize), then merge.'),
          'Orders → Summarize (split by customer_id: count, sum total)\n→ Merge with Customers (Enrich Input 1) → one row per customer')
      ],
      practice: [
        B('اطلع العملاء اللي مشتروش الشهر ده بـ Keep Non-Matches.', 'Find customers who did not buy this month with Keep Non-Matches.'),
        B('ادمج المخزون بالمنتجات بمفتاحين (sku + المخزن).', 'Merge stock with products on two keys (sku + warehouse).'),
        B('جرّب الدمج قبل وبعد توحيد الإيميلات وقارن عدد التطابقات.', 'Try the merge before and after normalising emails and compare the match counts.'),
        B('اعمل Summarize قبل الدمج عشان كل عميل يبقى صف واحد.', 'Summarize before merging so each customer is one row.')
      ],
      words: [
        W('enrich', 'تضيف بيانات من مصدر تاني لعناصرك', 'to add data from another source to your items', 'Enrich the leads with company data.'),
        W('non-match', 'عنصر ملقالوش مقابل في المصدر التاني', 'an item with no partner in the other source', 'Keep the non-matches for follow-up.'),
        W('composite key', 'مفتاح من أكتر من حقل', 'a key made of more than one field', 'sku + warehouse is a composite key.'),
        W('fan-out rows', 'صفوف بتتكرر لما مفتاح ليه أكتر من مقابل', 'rows that repeat when a key has several matches', 'Summarize first to avoid fan-out rows.'),
        W('normalise', 'توحّد شكل القيم قبل المقارنة', 'to make values the same form before comparing', 'Normalise emails to lowercase.')
      ],
      read: ['lib:n8n Docs: Merge node', 'lib:n8n Docs: Merging data'],
      challenge: B('اعمل تقرير «عملاء محتاجين متابعة»: ادمج العملاء بالطلبات والتذاكر المفتوحة، وطلّع: اللي ماشتروش من 60 يوم، واللي عندهم تذكرة مفتوحة، مع إجمالي مشترياتهم.', 'Build a «customers needing follow-up» report: merge customers with orders and open tickets, and output: those with no purchase in 60 days and those with an open ticket, with their total spend.'),
      quiz: [
        Q(B('«مين مشتراش؟» يناسبه:', '«Who did not buy?» suits:'), [['Keep Non-Matches', 'Keep Non-Matches'], ['Keep Matches', 'Keep Matches'], ['Append', 'Append']], 0, B('اللي ملهمش طلبات.', 'Those with no orders.')),
        Q(B('عميل ليه 3 طلبات بعد الدمج بيظهر:', 'A customer with 3 orders appears after the merge:'), [['3 مرات', '3 times'], ['مرة', 'once'], ['ولا مرة', 'not at all']], 0, B('صف لكل تطابق.', 'A row per match.')),
        Q(B('الإيميلات بحروف مختلفة مش بتتطابق. الحل:', 'Emails in different cases do not match. Fix:'), [['توحيدها قبل الدمج', 'normalise them before merging'], ['تغيير وضع Merge', 'change the Merge mode'], ['تسيبها', 'leave them']], 0, B('lowercase وtrim.', 'lowercase and trim.'))
      ] },

    { title: B('التجميع والتلخيص', 'Aggregating and summarising'),
      goal: B('تحوّل آلاف الصفوف لأرقام مفهومة بنودز من غير كود.', 'Turn thousands of rows into clear numbers with nodes, no code.'),
      learn: [
        L(B('Summarize = Group By', 'Summarize = Group By'),
          B('نود **Summarize**: «Fields to Split By» زي GROUP BY (مثلًا city)، و«Fields to Summarize» بالعملية: Sum، Count، Count Unique، Average، Min، Max، Concatenate. النتيجة عنصر لكل مجموعة. أسرع وأوضح من Code لأغلب التقارير.', 'The **Summarize** node: «Fields to Split By» works like GROUP BY (for example city), and «Fields to Summarize» with an operation: Sum, Count, Count Unique, Average, Min, Max, Concatenate. The result is one item per group. Faster and clearer than Code for most reports.'),
          'Summarize\n  Split by: city, month\n  total → Sum · order_id → Count · customer_id → Count Unique'),
        L(B('Aggregate: كله في عنصر واحد', 'Aggregate: everything in one item'),
          B('**Aggregate** بيجمع حقل من كل العناصر في قايمة جوه عنصر واحد (`emails: [...]`)، أو كل البيانات (All Item Data). مفيد قبل إيميل واحد فيه جدول، أو قبل طلب API بياخد قايمة. والعكس **Split Out** بيفك قايمة لعناصر.', '**Aggregate** gathers a field from every item into a list inside one item (`emails: [...]`), or all the data (All Item Data). Useful before one email with a table, or before an API call that takes a list. The reverse, **Split Out**, unpacks a list into items.'),
          '120 items → Aggregate (All Item Data → "rows") → 1 item { rows: [...] }\n→ HTML node builds one table → one email'),
        L(B('تقرير من غير كود', 'A report without code'),
          B('سلسلة كلاسيكية: Get rows ← Filter (الفترة) ← Summarize (حسب المدينة) ← Sort (تنازلي) ← Limit (أعلى 5) ← Aggregate ← HTML (جدول) ← Gmail. كل خطوة واضحة وسهل تختبرها.', 'A classic chain: Get rows → Filter (the period) → Summarize (by city) → Sort (descending) → Limit (top 5) → Aggregate → HTML (a table) → Gmail. Every step is clear and easy to test.'),
          'Get orders → Filter (this week) → Summarize (city: sum total) → Sort desc → Limit 5\n→ Aggregate → HTML table → Gmail "Top 5 cities"')
      ],
      practice: [
        B('اعمل تقرير مبيعات أسبوعي حسب المدينة بالسلسلة دي.', 'Build a weekly sales report by city with this chain.'),
        B('احسب Count Unique للعملاء لكل شهر.', 'Compute Count Unique of customers per month.'),
        B('جمّع إيميلات المشتركين في قايمة واحدة وابعتها لـ API.', 'Aggregate subscribers’ emails into one list and send it to an API.'),
        B('فك قايمة منتجات جوه طلب بـ Split Out وارجع جمّعها.', 'Unpack a product list inside an order with Split Out and aggregate it back.')
      ],
      words: [
        W('split by', 'الحقل اللي بتقسم المجموعات على أساسه', 'the field you divide the groups by', 'Split by city to get a total per city.'),
        W('count unique', 'عدد القيم المختلفة', 'the number of different values', 'Count unique customers, not orders.'),
        W('single list', 'كل العناصر متجمعة في قايمة واحدة', 'every item gathered into one list', 'Aggregate the rows into a single list.'),
        W('leaderboard', 'ترتيب لأعلى النتايج', 'a ranking of the top results', 'The email shows a leaderboard of cities.'),
        W('rollup', 'تجميع أرقام تفصيلية لأرقام أعلى', 'combining detailed numbers into higher-level totals', 'A monthly rollup of daily sales.')
      ],
      read: ['lib:n8n Docs: Summarize', 'lib:n8n Docs: Aggregate'],
      challenge: B('اعمل تقرير إدارة أسبوعي من غير ولا Code node: إجمالي المبيعات، أعلى 5 منتجات، عدد العملاء الجداد، ومتوسط الطلب، في إيميل HTML واحد بجداول.', 'Build a weekly management report without a single Code node: total sales, top 5 products, new customer count and average order, in one HTML email with tables.'),
      quiz: [
        Q(B('GROUP BY في n8n بيتعمل بـ:', 'GROUP BY in n8n is done with:'), [['Summarize (Split By)', 'Summarize (Split By)'], ['Merge', 'Merge'], ['Wait', 'Wait']], 0, B('Fields to Split By.', 'Fields to Split By.')),
        Q(B('عايز إيميل واحد فيه جدول لـ 120 عنصر:', 'You want one email with a table of 120 items:'), [['Aggregate قبل الإيميل', 'Aggregate before the email'], ['120 إيميل', '120 emails'], ['Split Out', 'Split Out']], 0, B('عنصر واحد = إيميل واحد.', 'One item = one email.')),
        Q(B('عدد العملاء المختلفين:', 'The number of different customers:'), [['Count Unique', 'Count Unique'], ['Count', 'Count'], ['Sum', 'Sum']], 0, B('Count بيعد الطلبات.', 'Count counts orders.'))
      ] },

    { title: B('بيانات كبيرة من غير ما الذاكرة تقع', 'Big data without running out of memory'),
      goal: B('تعالج عشرات الآلاف من الصفوف بأمان.', 'Process tens of thousands of rows safely.'),
      learn: [
        L(B('ليه الذاكرة بتقع', 'Why memory runs out'),
          B('كل نود بيحتفظ بخرجه في الذاكرة لحد آخر التشغيل، وكمان بيتحفظ في سجل التنفيذ. 50 ألف صف × 20 نود = ذاكرة كتير. العلامة: التنفيذ بيقف فجأة أو رسالة «Out of memory». والحل: قطّع.', 'Each node keeps its output in memory until the run ends, and it is also saved in the execution log. 50k rows × 20 nodes = a lot of memory. The sign: the run stops suddenly or says «Out of memory». The fix: cut it into pieces.'),
          '50,000 rows → 1 workflow with 15 nodes → 💥 memory\n50,000 rows → orchestrator → 100 batches × 500 → sub-workflow each → ✓'),
        L(B('دفعات في sub-workflows', 'Batches in sub-workflows'),
          B('المنسّق يجيب IDs بس (خفيفة)، يقسّمها دفعات (Loop Over Items بحجم 500)، ويبعت كل دفعة لـ sub-workflow يجيب التفاصيل ويعالج ويرجّع ملخص صغير. ذاكرة الـ sub-workflow بتتفضّى بعد كل دفعة. وخلّي الـ sub-workflow يرجّع عدد مش البيانات كلها.', 'The orchestrator fetches only IDs (light), splits them into batches (Loop Over Items, size 500), and sends each batch to a sub-workflow that fetches details, processes, and returns a small summary. The sub-workflow’s memory is freed after each batch. Return a count, not all the data.'),
          'Get IDs (50k) → Loop Over Items (500) → Execute Workflow [Process batch]\n  ← returns { processed: 500, failed: 2 }'),
        L(B('خفّف سجل التنفيذ', 'Lighten the execution log'),
          B('في إعدادات الـ workflow تقدر متحفظش بيانات التنفيذات الناجحة (Save successful production executions: off) — بيوفّر مساحة كبيرة. وعلى السيرفر: `EXECUTIONS_DATA_PRUNE=true` و`EXECUTIONS_DATA_MAX_AGE` بالساعات عشان القديم يتمسح لوحده.', 'In the workflow settings you can stop saving data of successful runs (Save successful production executions: off) — this saves a lot of space. On the server: `EXECUTIONS_DATA_PRUNE=true` and `EXECUTIONS_DATA_MAX_AGE` in hours so old runs are deleted automatically.'),
          'Workflow settings → Save successful production executions: Do not save\nEXECUTIONS_DATA_PRUNE=true\nEXECUTIONS_DATA_MAX_AGE=336   # 14 days')
      ],
      practice: [
        B('اعمل 20 ألف عنصر وهمي وشغّلهم في workflow واحد وقيس الوقت.', 'Make 20k fake items, run them in one workflow and time it.'),
        B('أعد نفس الشغل بمنسّق ودفعات 500 وقارن.', 'Redo the same work with an orchestrator and batches of 500 and compare.'),
        B('خلّي الـ sub-workflow يرجّع ملخص بس.', 'Make the sub-workflow return only a summary.'),
        B('اقفل حفظ التنفيذات الناجحة لـ workflow كبير.', 'Turn off saving successful runs for a big workflow.')
      ],
      words: [
        W('out of memory', 'الذاكرة خلصت والبرنامج وقف', 'memory ran out and the program stopped', 'The run failed with out of memory.'),
        W('chunked processing', 'معالجة البيانات على قطع صغيرة', 'processing data in small pieces', 'Chunked processing keeps memory low.'),
        W('prune', 'تمسح البيانات القديمة بانتظام', 'to delete old data regularly', 'Prune executions older than 14 days.'),
        W('execution data', 'البيانات المحفوظة عن كل تشغيل', 'the data saved about each run', 'Execution data takes most of the disk.'),
        W('lightweight', 'خفيف ومش بياخد موارد كتير', 'light, not using many resources', 'Pass lightweight IDs to the batches.')
      ],
      read: ['lib:n8n Docs: Memory-related errors', { lib: 'n8n Docs: Execution data', what: B('اقرا عن حفظ وتنضيف بيانات التنفيذ.', 'Read about saving and pruning execution data.') }],
      challenge: B('عالج 50 ألف صف (من ملف أو قاعدة بيانات) بمنسّق ودفعات، وسجّل لكل دفعة الوقت والعدد، واتأكد إن مفيش دفعة فشلت من غير ما تتسجل.', 'Process 50k rows (from a file or database) with an orchestrator and batches, record time and count per batch, and make sure no batch fails without being recorded.'),
      quiz: [
        Q(B('ليه الدفعات في sub-workflow بتوفّر ذاكرة؟', 'Why do batches in a sub-workflow save memory?'), [['ذاكرة كل دفعة بتتفضّى بعدها', 'each batch’s memory is freed after it'], ['الـ sub-workflow أسرع', 'sub-workflows are faster'], ['مش بتوفّر', 'they do not']], 0, B('مش كله في تشغيل واحد.', 'Not everything in one run.')),
        Q(B('الـ sub-workflow المفروض يرجّع:', 'The sub-workflow should return:'), [['ملخص صغير', 'a small summary'], ['كل البيانات', 'all the data'], ['ملفات', 'files']], 0, B('عشان المنسّق يفضل خفيف.', 'So the orchestrator stays light.')),
        Q(B('`EXECUTIONS_DATA_PRUNE=true` بيعمل:', '`EXECUTIONS_DATA_PRUNE=true` does:'), [['يمسح التنفيذات القديمة', 'deletes old executions'], ['يسرّع الـ API', 'speeds up the API'], ['يقفل n8n', 'stops n8n']], 0, B('مع MAX_AGE.', 'With MAX_AGE.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('نظام بيانات كامل: ملفات داخلة، دمج، تلخيص، وملفات خارجة.', 'A complete data system: incoming files, merging, summarising and outgoing files.'),
      review: [
        B('العنصر = json + binary، وأسماء الـ binary، ووضع filesystem.', 'An item = json + binary, binary names, and filesystem mode.'),
        B('Extract From File وConvert to File وprepareBinaryData.', 'Extract From File, Convert to File and prepareBinaryData.'),
        B('Merge: Keep Non-Matches، Enrich، مفاتيح متعددة، وتوحيد القيم.', 'Merge: Keep Non-Matches, Enrich, several keys, and normalising values.'),
        B('Summarize وAggregate وSplit Out وتقرير من غير كود.', 'Summarize, Aggregate, Split Out and a report without code.'),
        B('بيانات كبيرة: منسّق ودفعات وتنضيف سجل التنفيذ.', 'Big data: an orchestrator, batches and pruning execution data.')
      ],
      project: B('ابني «مركز تقارير المبيعات»: كل يوم الصبح يقرا ملفات Excel من فولدر Drive (فرع لكل ملف)، يدمجها مع بيانات العملاء، يلخّص حسب الفرع والمنتج، يطلّع العملاء اللي مشتروش من 30 يوم، ويبعت إيميل HTML بجداول + ملف XLSX مرفق. يتحمّل 50 ألف صف بدفعات.', 'Build a «sales report hub»: every morning it reads Excel files from a Drive folder (one per branch), merges them with customer data, summarises by branch and product, lists customers with no purchase in 30 days, and sends an HTML email with tables + an attached XLSX. It handles 50k rows with batches.'),
      test: [
        Q(B('الملفات في العنصر في:', 'Files on an item live in:'), [['binary', 'binary'], ['json', 'json'], ['params', 'params']], 0, B('json للبيانات.', 'json is for data.')),
        Q(B('مرفق الإيميل الأول اسمه غالبًا:', 'The first email attachment is usually named:'), [['attachment_0', 'attachment_0'], ['file1', 'file1'], ['data_1', 'data_1']], 0, B('شوف تبويب Binary.', 'Check the Binary tab.')),
        Q(B('ملفات كبيرة على سيرفرك:', 'Big files on your server:'), [['N8N_DEFAULT_BINARY_DATA_MODE=filesystem', 'N8N_DEFAULT_BINARY_DATA_MODE=filesystem'], ['ذاكرة أكبر بس', 'just more memory'], ['ملفات أصغر', 'smaller files']], 0, B('على القرص.', 'On disk.')),
        Q(B('عناصر لملف Excel:', 'Items to an Excel file:'), [['Convert to File', 'Convert to File'], ['Extract From File', 'Extract From File'], ['Merge', 'Merge']], 0, B('العكس هو Extract.', 'The reverse is Extract.')),
        Q(B('LEFT JOIN في Merge اسمه:', 'A LEFT JOIN in Merge is called:'), [['Enrich Input 1', 'Enrich Input 1'], ['Keep Matches', 'Keep Matches'], ['Append', 'Append']], 0, B('كل المدخل الأول.', 'All of input 1.')),
        Q(B('مفتاح من sku والمخزن اسمه:', 'A key made of sku and warehouse is a:'), [['composite key', 'composite key'], ['primary node', 'primary node'], ['flag', 'flag']], 0, B('أكتر من حقل.', 'More than one field.')),
        Q(B('عشان كل عميل يبقى صف واحد بعد الدمج:', 'So each customer is one row after merging:'), [['Summarize الطلبات قبل الدمج', 'Summarize the orders before merging'], ['Append', 'Append'], ['Wait', 'Wait']], 0, B('جمّع الأول.', 'Aggregate first.')),
        Q(B('Count Unique على customer_id بيطلّع:', 'Count Unique on customer_id gives:'), [['عدد العملاء المختلفين', 'the number of different customers'], ['عدد الطلبات', 'the number of orders'], ['مجموع الفلوس', 'the money total']], 0, B('من غير تكرار.', 'Without repeats.')),
        Q(B('Aggregate (All Item Data) بيطلّع:', 'Aggregate (All Item Data) outputs:'), [['عنصر واحد فيه قايمة', 'one item holding a list'], ['عنصر لكل صف', 'an item per row'], ['ملف', 'a file']], 0, B('مفيد قبل إيميل واحد.', 'Useful before one email.')),
        Q(B('50 ألف صف في workflow واحد بـ 15 نود:', '50k rows in one workflow with 15 nodes:'), [['خطر على الذاكرة', 'a memory risk'], ['تمام دايمًا', 'always fine'], ['أسرع', 'faster']], 0, B('قطّع لدفعات.', 'Cut it into batches.')),
        Q(B('المنسّق يبعت للدفعات:', 'The orchestrator sends the batches:'), [['IDs خفيفة', 'light IDs'], ['كل البيانات', 'all the data'], ['ولا حاجة', 'nothing']], 0, B('التفاصيل جوه الدفعة.', 'Details are fetched inside the batch.')),
        Q(B('توفير مساحة سجل التنفيذات:', 'Saving execution log space:'), [['متحفظش الناجحة + prune', 'do not save successful runs + prune'], ['امسح n8n', 'delete n8n'], ['اقفل الـ workflows', 'turn off workflows']], 0, B('إعدادات + متغيّرات بيئة.', 'Settings + environment variables.'))
      ] }
  ]
};
