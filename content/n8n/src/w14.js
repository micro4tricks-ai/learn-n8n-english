// n8n week 14 — Files: CSV, Excel and PDF.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الملفات: CSV وExcel وPDF', 'Files: CSV, Excel and PDF'),
  goal: B('تتعامل مع أي ملف يوصلك: تقرا وتكتب CSV وExcel من غير مشاكل encoding أو تواريخ، وتطلّع نص من PDF (حتى المصوّر)، وتعمل PDF من HTML، وتخزّن الملفات في Drive أو S3 أو FTP.',
          'Handle any file you receive: read and write CSV and Excel without encoding or date problems, extract text from PDFs (even scanned ones), generate PDFs from HTML, and store files in Drive, S3 or FTP.'),
  days: [
    { title: B('الملفات في n8n', 'Files in n8n'),
      goal: B('تفهم إزاي n8n بيمسك الملفات، وتقرا وتكتب من الديسك.', 'Understand how n8n holds files, and read and write from disk.'),
      learn: [
        { h: B('binary = ملف', 'Binary = a file'),
          p: B('الملف في n8n بيبقى جوه الـ item تحت binary، وليه اسم (data غالبًا)، وfileName، وmimeType، وfileExtension، وحجم. الـ json بتاعه ممكن يكون فاضي.', 'In n8n a file lives on the item under binary, with a name (usually data), fileName, mimeType, fileExtension and size. Its json can be empty.'),
          ex: 'binary.data: { fileName: "sales.csv", mimeType: "text/csv", fileSize: "12 kB" }' },
        { h: B('الديسك', 'The disk'),
          p: B('على n8n self-hosted: Read/Write Files from Disk بيقرا ويكتب ملفات على السيرفر. على n8n Cloud مفيش ديسك تكتب عليه؛ استخدم Drive أو S3.', 'On self-hosted n8n: Read/Write Files from Disk reads and writes files on the server. On n8n Cloud there\'s no disk to write to; use Drive or S3.'),
          ex: 'Read Files from Disk: /data/inbox/*.csv' },
        { h: B('الذاكرة', 'Memory'),
          p: B('الملفات الكبيرة بتاكل الذاكرة. على السيرفر اضبط N8N_DEFAULT_BINARY_DATA_MODE=filesystem عشان الملفات تتخزن على الديسك مش في الذاكرة.', 'Large files eat memory. On a server set N8N_DEFAULT_BINARY_DATA_MODE=filesystem so files are stored on disk, not in memory.'),
          ex: 'N8N_DEFAULT_BINARY_DATA_MODE=filesystem' }
      ],
      practice: [
        B('نزّل ملف بـ HTTP Request (Response Format: File) وشوف الـ binary.', 'Download a file with HTTP Request (Response Format: File) and inspect the binary.'),
        B('غيّر اسم الـ binary property من data لـ report وتعامل معاه.', 'Rename the binary property from data to report and work with it.'),
        B('لو self-hosted: اقرا ملفات فولدر بـ Read Files from Disk.', 'If self-hosted: read a folder\'s files with Read Files from Disk.'),
        B('اكتب ملف نص على الديسك واتأكد إنه اتعمل.', 'Write a text file to disk and confirm it exists.')
      ],
      words: [
        { t: 'Read/Write Files from Disk', m: B('node بتقرا وتكتب ملفات على السيرفر (self-hosted)', 'a node that reads and writes files on the server (self-hosted)'), ex: 'Write to /data/out/report.csv' },
        { t: 'MIME type', m: B('نوع الملف الرسمي زي text/csv', 'a file\'s official type, such as text/csv'), ex: 'application/pdf' },
        { t: 'fileName', m: B('اسم الملف جوه binary', 'the file name inside binary'), ex: 'sales-2026-09.csv' },
        { t: 'binary data mode', m: B('مكان تخزين الملفات: ذاكرة أو ديسك', 'where files are stored: memory or disk'), ex: 'filesystem for large files' },
        { t: 'Response Format: File', m: B('خيار HTTP Request ينزّل الرد كملف', 'an HTTP Request option that saves the response as a file'), ex: 'Download a PDF invoice.' }],
      read: ['lib:n8n Docs: Environment variables', 'lib:n8n Docs: Data structure'],
      challenge: B('اعمل workflow بينزّل 3 ملفات مختلفة (CSV وPDF وصورة) من URLs، ويسميهم بتاريخ النهارده، ويبعتهم على Telegram.', 'Build a workflow that downloads 3 different files (a CSV, a PDF and an image) from URLs, names them with today\'s date, and sends them on Telegram.'),
      quiz: [
        { q: B('الملف في الـ item بيبقى تحت:', 'A file on an item lives under:'), o: ['binary', 'json', 'headers'], a: 0, why: B('binary.data غالبًا.', 'Usually binary.data.') },
        { q: B('على n8n Cloud تخزّن الملفات في:', 'On n8n Cloud store files in:'), o: [B('Drive أو S3', 'Drive or S3'), B('الديسك', 'the disk'), B('الذاكرة للأبد', 'memory forever')], a: 0, why: B('مفيش ديسك.', 'There\'s no disk.') },
        { q: B('ملفات كبيرة بتوقع السيرفر:', 'Large files crash the server:'), o: ['binary data mode = filesystem', 'more Wait', 'smaller sheet'], a: 0, why: B('على الديسك مش الذاكرة.', 'On disk, not in memory.') }
      ] },

    { title: B('CSV من غير مشاكل', 'CSV without trouble'),
      goal: B('تقرا وتكتب CSV صح: الفاصل، والـ encoding، والعلامات، والأمان.', 'Read and write CSV correctly: delimiter, encoding, quotes and safety.'),
      learn: [
        { h: B('الفاصل والـ encoding', 'Delimiter and encoding'),
          p: B('Excel في بلاد كتير بيستخدم ; مش ,. والعربي محتاج UTF-8، وExcel بيفتحه صح لو فيه BOM. في Extract From File حدد الـ delimiter والـ encoding.', 'Excel in many countries uses ; instead of ,. Arabic needs UTF-8, and Excel opens it correctly only with a BOM. In Extract From File, set the delimiter and encoding.'),
          ex: 'Convert to File (CSV) → Options: Include BOM (for Excel + Arabic)' },
        { h: B('العلامات والفواصل جوه القيم', 'Quotes and commas inside values'),
          p: B('قيمة فيها فاصلة لازم تبقى بين "": "Cairo, Egypt". والـ tools الجاهزة بتعمل ده لوحدها؛ متعملش CSV بـ join يدوي.', 'A value containing a comma must be in quotes: "Cairo, Egypt". The built-in tools do this; don\'t build CSV with a manual join.'),
          ex: 'name,address\nAli,"Cairo, Egypt"' },
        { h: B('CSV injection', 'CSV injection'),
          p: B('قيمة بتبدأ بـ = أو + أو - أو @ ممكن Excel ينفّذها كمعادلة. لو البيانات من مستخدمين، حط \' قبلها أو امنعها.', 'A value starting with =, +, - or @ may be executed by Excel as a formula. If the data comes from users, prefix it with \' or block it.'),
          ex: '=HYPERLINK("http://evil") → \'=HYPERLINK(…)' }
      ],
      practice: [
        B('اقرا CSV بفاصل ; وCSV عربي UTF-8.', 'Read a CSV with ; as the delimiter and an Arabic UTF-8 CSV.'),
        B('اكتب CSV فيه عربي وافتحه في Excel بـ BOM ومن غيره.', 'Write a CSV containing Arabic and open it in Excel with and without a BOM.'),
        B('اكتب CSV فيه قيمة بفاصلة واتأكد إنه سليم.', 'Write a CSV with a value containing a comma and check it is valid.'),
        B('اعمل خطوة بتحمي من CSV injection.', 'Add a step that protects against CSV injection.')
      ],
      words: [
        { t: 'UTF-8 BOM', m: B('علامة في أول الملف بتخلي Excel يقرا UTF-8 صح', 'a marker at the start of a file that makes Excel read UTF-8 correctly'), ex: 'Include BOM for Arabic CSVs.' },
        { t: 'quoted field', m: B('قيمة بين علامات تنصيص عشان فيها فاصلة', 'a value in quotes because it contains a comma'), ex: '"Cairo, Egypt"' },
        { t: 'CSV injection', m: B('قيمة بتتنفّذ كمعادلة لما تتفتح في Excel', 'a value executed as a formula when opened in Excel'), ex: 'Values starting with =' },
        { t: 'delimiter (, ;)', m: B('العلامة اللي بتفصل الأعمدة', 'the character that separates columns'), ex: 'European Excel uses ;' },
        { t: 'row count check', m: B('تتأكد إن عدد الصفوف منطقي بعد القراءة', 'checking the number of rows makes sense after reading'), ex: 'Expected ~500, got 3 → alert' }],
      read: ['lib:n8n Docs: Data transformation functions', { lib: 'Real Python', what: B('دوّر على «Reading and Writing CSV Files» واقرا الجزء عن الـ quoting.', 'Search for "Reading and Writing CSV Files" and read the quoting part.') }],
      challenge: B('اعمل «CSV importer» بيستقبل ملف من فورم، ويتأكد من الأعمدة المطلوبة وعدد الصفوف، ويرفض الملف لو فيه مشاكل برسالة واضحة، ويدخّل الصح في Postgres.', 'Build a "CSV importer" that takes a file from a form, checks required columns and the row count, rejects bad files with a clear message, and loads good ones into Postgres.'),
      quiz: [
        { q: B('العربي في CSV باين علامات غريبة في Excel:', 'Arabic in a CSV looks garbled in Excel:'), o: ['UTF-8 with BOM', 'more commas', 'a PDF'], a: 0, why: B('Excel محتاج BOM.', 'Excel needs a BOM.') },
        { q: B('قيمة "Cairo, Egypt" في CSV:', 'The value Cairo, Egypt in a CSV:'), o: [B('لازم بين ""', 'must be quoted'), B('عادي من غير', 'is fine unquoted'), B('ممنوعة', 'is forbidden')], a: 0, why: B('فيها فاصلة.', 'It contains a comma.') },
        { q: B('قيمة بتبدأ بـ = من مستخدم:', 'A user value starting with =:'), o: [B('خطر CSV injection', 'a CSV injection risk'), B('عادي', 'fine'), B('أرقام', 'a number')], a: 0, why: B('معادلة.', 'A formula.') }
      ] },

    { title: B('Excel', 'Excel'),
      goal: B('تقرا وتكتب XLSX: الـ sheets، والتواريخ، والأعمدة.', 'Read and write XLSX: sheets, dates and columns.'),
      learn: [
        { h: B('قراءة XLSX', 'Reading XLSX'),
          p: B('Extract From File ← XLSX: اختار اسم الـ sheet، وهل أول صف عناوين، والـ range لو محتاج جزء. وكل صف بيبقى item.', 'Extract From File → XLSX: choose the sheet name, whether the first row is headers, and a range if you need part of it. Each row becomes an item.'),
          ex: 'Sheet: "Sales 2026"   Range: A1:F500   Header row: on' },
        { h: B('التواريخ في Excel', 'Dates in Excel'),
          p: B('Excel بيخزن التاريخ كرقم (عدد الأيام من 1900): 45930 مثلًا. حوّله: `DateTime.fromObject({year:1899,month:12,day:30}).plus({days: n})`، أو فعّل خيار قراءة التواريخ لو موجود.', 'Excel stores a date as a number (days since 1900), e.g. 45930. Convert it: `DateTime.fromObject({year:1899,month:12,day:30}).plus({days: n})`, or enable the read-dates option when available.'),
          ex: '45930 → 2025-09-30' },
        { h: B('كتابة XLSX', 'Writing XLSX'),
          p: B('Convert to File ← XLSX بيعمل ملف من الـ items، واسم الـ sheet تختاره. للتنسيق المتقدم (ألوان، معادلات) استخدم Microsoft Excel 365 node أو Google Sheets.', 'Convert to File → XLSX builds a file from the items, with a sheet name you choose. For advanced formatting (colours, formulas) use the Microsoft Excel 365 node or Google Sheets.'),
          ex: 'Items → Convert to File (XLSX, sheet "Report") → Gmail attachment' }
      ],
      practice: [
        B('اقرا Excel فيه 2 sheets واختار واحدة.', 'Read an Excel file with 2 sheets and choose one.'),
        B('حوّل تواريخ Excel الرقمية لتواريخ ISO.', 'Convert Excel number dates into ISO dates.'),
        B('اكتب تقرير XLSX وابعته بالإيميل.', 'Write an XLSX report and send it by email.'),
        B('قارن Excel file بـ Google Sheets لنفس التقرير.', 'Compare an Excel file with Google Sheets for the same report.')
      ],
      words: [
        { t: 'XLSX', m: B('صيغة ملفات Excel الحديثة', 'the modern Excel file format'), ex: 'report.xlsx' },
        { t: 'sheet name (Excel)', m: B('اسم التبويب جوه ملف Excel', 'the name of a tab inside an Excel file'), ex: 'Sheet: "Sales 2026"' },
        { t: 'Excel date serial', m: B('رقم Excel بيمثل تاريخ (أيام من 1900)', 'Excel\'s number for a date (days since 1900)'), ex: '45930' },
        { t: 'range (A1:F500)', m: B('جزء من الجدول بتحدده بالخانات', 'a part of the sheet defined by cells'), ex: 'A1:F500' },
        { t: 'Microsoft Excel 365 node', m: B('node بتشتغل على ملفات Excel أونلاين', 'a node that works with online Excel files'), ex: 'Append rows to a OneDrive workbook.' }],
      read: ['lib:n8n Docs: Luxon (التواريخ)'],
      challenge: B('اعمل «Excel to database»: كل يوم ملف Excel بيوصل على الإيميل، يتقري، التواريخ تتصلّح، البيانات تتحقق وتدخل Postgres، وملخص بالأعداد.', 'Build "Excel to database": each day an Excel file arrives by email; it is read, dates fixed, data validated and loaded into Postgres, with a summary of counts.'),
      quiz: [
        { q: B('تاريخ طلع 45930:', 'A date came out as 45930:'), o: [B('رقم Excel التسلسلي، حوّله', 'an Excel serial; convert it'), B('صح كده', 'correct as is'), B('خطأ', 'an error')], a: 0, why: B('أيام من 1900.', 'Days since 1900.') },
        { q: B('تقرا sheet معينة من XLSX:', 'Read a specific sheet from XLSX:'), o: [B('تحدد sheet name', 'set the sheet name'), B('مستحيل', 'impossible'), B('Code بس', 'only with Code')], a: 0, why: B('خيار في Extract From File.', 'An option in Extract From File.') },
        { q: B('تقرير XLSX من items:', 'An XLSX report from items:'), o: ['Convert to File (XLSX)', 'Extract From File', 'Wait'], a: 0, why: B('تحويل لملف.', 'Convert to a file.') }
      ] },

    { title: B('PDF', 'PDF'),
      goal: B('تطلّع نص من PDF، وتعرف تتعامل مع المصوّر، وتعمل PDF من HTML.', 'Extract text from PDFs, handle scanned ones, and generate PDFs from HTML.'),
      learn: [
        { h: B('النص من PDF', 'Text from a PDF'),
          p: B('Extract From File ← PDF بيطلّع النص لو الـ PDF فيه text layer (اتعمل من برنامج). وبعدين regex أو AI يطلّع الحقول.', 'Extract From File → PDF pulls out the text if the PDF has a text layer (made by software). Then regex or AI extracts the fields.'),
          ex: 'PDF → text → /Total:\\s*([\\d,.]+)/ → amount' },
        { h: B('PDF مصوّر', 'Scanned PDFs'),
          p: B('لو الـ PDF صورة (scan)، النص هيطلع فاضي. محتاج OCR: خدمة OCR أو موديل AI بيقرا الصور. اتأكد: لو النص فاضي أو قليل جدًا، ودّيه لـ OCR.', 'If the PDF is an image (a scan), the text comes out empty. You need OCR: an OCR service or an AI model that reads images. Check: if the text is empty or very short, send it to OCR.'),
          ex: 'IF text.length < 50 → OCR branch' },
        { h: B('عمل PDF', 'Making PDFs'),
          p: B('أسهل طريقة: تعمل HTML (فاتورة مثلًا) وتبعته لخدمة HTML→PDF (زي Gotenberg اللي تشغّلها في Docker، أو API خارجي). وترجع ملف PDF تبعته.', 'The easiest way: build HTML (an invoice, say) and send it to an HTML→PDF service (such as Gotenberg running in Docker, or an external API). You get back a PDF file to send.'),
          ex: 'HTML (invoice) → HTTP Request (Gotenberg, form-data) → PDF → Gmail' }
      ],
      practice: [
        B('طلّع نص من PDF فاتورة واستخرج الإجمالي بـ regex.', 'Extract text from an invoice PDF and pull the total with regex.'),
        B('جرّب PDF مصوّر وشوف النص فاضي.', 'Try a scanned PDF and see the empty text.'),
        B('اعمل IF بيوجّه الـ PDFs المصوّرة لفرع OCR.', 'Add an IF that routes scanned PDFs to an OCR branch.'),
        B('اعمل فاتورة HTML وحوّلها PDF (بخدمة أو Gotenberg).', 'Build an HTML invoice and turn it into a PDF (with a service or Gotenberg).')
      ],
      words: [
        { t: 'text layer', m: B('النص الحقيقي جوه PDF اللي ينفع يتنسخ', 'the real, copyable text inside a PDF'), ex: 'Scans have no text layer.' },
        { t: 'OCR', m: B('قراءة النص من صورة', 'reading text from an image'), ex: 'Send scans to an OCR service.' },
        { t: 'HTML to PDF', m: B('تحويل صفحة HTML لملف PDF', 'turning an HTML page into a PDF file'), ex: 'Invoices, reports' },
        { t: 'Gotenberg', m: B('خدمة مفتوحة المصدر بتحوّل HTML ومستندات لـ PDF', 'an open-source service that converts HTML and documents to PDF'), ex: 'Run it with Docker.' },
        { t: 'scanned document', m: B('مستند متصوّر كصورة مش نص', 'a document captured as an image, not text'), ex: 'Needs OCR.' }],
      read: [{ t: 'Gotenberg', url: 'https://gotenberg.dev/', what: B('اقرا صفحة Chromium module (HTML → PDF).', 'Read the Chromium module page (HTML → PDF).') }, 'lib:n8n Docs: Data transformation functions'],
      challenge: B('اعمل «invoice generator»: order من Postgres ← فاتورة HTML بتصميم بسيط ← PDF ← إيميل للعميل ← نسخة في Drive.', 'Build an "invoice generator": an order from Postgres → a simple HTML invoice → PDF → email to the customer → a copy in Drive.'),
      quiz: [
        { q: B('PDF مصوّر نصه طلع فاضي:', 'A scanned PDF\'s text is empty:'), o: ['OCR', 'more regex', 'Convert to File'], a: 0, why: B('مفيش text layer.', 'No text layer.') },
        { q: B('أسهل طريقة تعمل فاتورة PDF:', 'The easiest way to make a PDF invoice:'), o: [B('HTML ← خدمة HTML→PDF', 'HTML → an HTML-to-PDF service'), B('ترسمها باليد', 'draw it by hand'), B('CSV', 'CSV')], a: 0, why: B('HTML مرن.', 'HTML is flexible.') },
        { q: B('تطلّع الإجمالي من نص الفاتورة:', 'Pull the total from invoice text:'), o: ['regex or AI', 'Wait', 'Merge'], a: 0, why: B('استخراج.', 'Extraction.') }
      ] },

    { title: B('التخزين السحابي', 'Cloud storage'),
      goal: B('ترفع وتنزّل وتنظّم ملفات في Google Drive وS3 وFTP.', 'Upload, download and organise files in Google Drive, S3 and FTP.'),
      learn: [
        { h: B('Google Drive', 'Google Drive'),
          p: B('Google Drive node: Upload وDownload وSearch وCreate Folder وShare. كل فولدر ليه ID في اللينك. نظّم بفولدرات بالسنة/الشهر.', 'The Google Drive node: Upload, Download, Search, Create Folder and Share. Each folder has an ID in its URL. Organise by year/month folders.'),
          ex: 'Invoices/2026/09/INV-1042.pdf' },
        { h: B('S3 وobject storage', 'S3 and object storage'),
          p: B('S3 (أو أي خدمة متوافقة زي R2 وMinIO) بتخزن ملفات بـ bucket وkey. رخيصة وكويسة للأرشيف والنسخ. والـ presigned URL لينك مؤقت لملف خاص.', 'S3 (or any compatible service such as R2 or MinIO) stores files by bucket and key. Cheap and good for archives and backups. A presigned URL is a temporary link to a private file.'),
          ex: 'bucket: my-backups   key: n8n/2026-09-28.sql' },
        { h: B('FTP وSFTP', 'FTP and SFTP'),
          p: B('شركات كتير لسه بتبعت ملفات على FTP. استخدم SFTP (مشفّر) لو متاح. n8n عنده FTP node بيعمل List وDownload وUpload.', 'Many companies still exchange files over FTP. Use SFTP (encrypted) when available. n8n\'s FTP node can List, Download and Upload.'),
          ex: 'Every hour: SFTP list /outbox → download new → process → move to /done' }
      ],
      practice: [
        B('ارفع ملف على Drive في فولدر بالتاريخ.', 'Upload a file to Drive into a date-based folder.'),
        B('دوّر على ملفات في Drive بالاسم ونزّلها.', 'Search Drive for files by name and download them.'),
        B('لو عندك S3/R2: ارفع ملف واعمل presigned URL.', 'If you have S3/R2: upload a file and create a presigned URL.'),
        B('اعمل مسار «inbox → processed» للملفات بحيث متتعالجش مرتين.', 'Build an "inbox → processed" flow for files so none is processed twice.')
      ],
      words: [
        { t: 'Google Drive node', m: B('node لرفع وتنزيل وتنظيم ملفات Drive', 'a node to upload, download and organise Drive files'), ex: 'Upload to folder "Invoices"' },
        { t: 'folder ID', m: B('الكود اللي بيحدد فولدر في Drive', 'the code identifying a Drive folder'), ex: 'drive.google.com/drive/folders/<ID>' },
        { t: 'S3 bucket', m: B('حاوية ملفات في object storage', 'a container for files in object storage'), ex: 'my-backups' },
        { t: 'presigned URL', m: B('لينك مؤقت لملف خاص', 'a temporary link to a private file'), ex: 'Valid for 1 hour.' },
        { t: 'SFTP', m: B('نقل ملفات مشفّر عن طريق SSH', 'encrypted file transfer over SSH'), ex: 'Prefer SFTP to plain FTP.' }],
      read: [{ lib: 'n8n Docs: Credentials', what: B('اقرا صفحات Google Drive وS3 وFTP credentials.', 'Read the Google Drive, S3 and FTP credential pages.') }],
      challenge: B('اعمل «document archive»: أي مرفق PDF على label معيّن يتحفظ في Drive (سنة/شهر) باسم منظم، ونسخة في S3 لو متاح، وسجل في Postgres فيه اللينك.', 'Build a "document archive": every PDF attachment with a given label is saved in Drive (year/month) with an orderly name, copied to S3 if available, and logged in Postgres with its link.'),
      quiz: [
        { q: B('لينك مؤقت لملف خاص في S3:', 'A temporary link to a private S3 file:'), o: ['presigned URL', 'public bucket', 'FTP'], a: 0, why: B('بينتهي.', 'It expires.') },
        { q: B('بدل FTP العادي:', 'Instead of plain FTP:'), o: ['SFTP', 'HTTP', 'Telegram'], a: 0, why: B('مشفّر.', 'Encrypted.') },
        { q: B('عشان ملف متتعالجش مرتين:', 'So a file isn\'t processed twice:'), o: [B('انقله لفولدر processed', 'move it to a processed folder'), B('اقراه تاني', 'read it again'), B('Wait', 'Wait')], a: 0, why: B('inbox → processed.', 'inbox → processed.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 15 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 15 opens when you score 70% or more.'),
      review: [
        B('binary وfileName وmimeType، والديسك، وfilesystem mode.', 'binary, fileName and mimeType, the disk, and filesystem mode.'),
        B('CSV: delimiter، UTF-8 BOM، quoted fields، CSV injection.', 'CSV: delimiter, UTF-8 BOM, quoted fields, CSV injection.'),
        B('Excel: sheet name، range، تواريخ Excel.', 'Excel: sheet name, range, Excel dates.'),
        B('PDF: text layer، OCR، HTML→PDF.', 'PDF: text layer, OCR, HTML→PDF.'),
        B('Drive وS3 وSFTP وinbox → processed.', 'Drive, S3, SFTP and inbox → processed.')
      ],
      project: B('ابني «document processing pipeline»: ملفات (CSV وExcel وPDF) بتوصل على الإيميل أو فولدر Drive، كل نوع يتقري صح (encoding، تواريخ، OCR للمصوّر)، البيانات تتحقق وتدخل Postgres، الملف الأصلي يتأرشف بـ اسم منظم، وتقرير يومي XLSX يتبعت بالإيميل.',
                 'Build a "document processing pipeline": files (CSV, Excel and PDF) arrive by email or in a Drive folder; each type is read correctly (encoding, dates, OCR for scans); data is validated and loaded into Postgres; the original is archived with an orderly name; and a daily XLSX report is emailed.'),
      test: [
        { q: B('اسم الـ binary property الافتراضي غالبًا:', 'The default binary property name is usually:'), o: ['data', 'file0', 'binary'], a: 0, why: B('binary.data.', 'binary.data.') },
        { q: B('ملفات كبيرة على السيرفر:', 'Large files on a server:'), o: ['N8N_DEFAULT_BINARY_DATA_MODE=filesystem', 'GENERIC_TIMEZONE', 'WEBHOOK_URL'], a: 0, why: B('الديسك.', 'The disk.') },
        { q: B('CSV أوروبي أعمدته متلزقة:', 'A European CSV\'s columns are stuck together:'), o: [B('غيّر الـ delimiter لـ ;', 'set the delimiter to ;'), B('امسح الملف', 'delete the file'), B('PDF', 'use PDF')], a: 0, why: B('فاصل مختلف.', 'A different separator.') },
        { q: B('عربي مكسّر في Excel:', 'Broken Arabic in Excel:'), o: ['UTF-8 BOM', 'more columns', 'XML'], a: 0, why: B('Excel.', 'Excel.') },
        { q: B('CSV injection بتبدأ بـ:', 'CSV injection starts with:'), o: ['= + - @', 'a letter', 'a space'], a: 0, why: B('معادلة.', 'A formula.') },
        { q: B('Excel date serial هو:', 'An Excel date serial is:'), o: [B('رقم أيام من 1900', 'a count of days since 1900'), B('نص', 'text'), B('خطأ', 'an error')], a: 0, why: B('حوّله.', 'Convert it.') },
        { q: B('تقرأ جزء A1:F500 من Excel:', 'Read part A1:F500 of an Excel file:'), o: ['range', 'delimiter', 'BOM'], a: 0, why: B('نطاق.', 'A range.') },
        { q: B('نص PDF فاضي:', 'Empty PDF text:'), o: [B('غالبًا مصوّر ← OCR', 'probably a scan → OCR'), B('الـ PDF سليم', 'the PDF is fine'), B('امسحه', 'delete it')], a: 0, why: B('مفيش text layer.', 'No text layer.') },
        { q: B('Gotenberg بيعمل:', 'Gotenberg:'), o: [B('HTML → PDF', 'HTML → PDF'), B('OCR بس', 'only OCR'), B('إيميل', 'email')], a: 0, why: B('تحويل مستندات.', 'Document conversion.') },
        { q: B('folder ID في Drive موجود في:', 'A Drive folder ID is in:'), o: [B('لينك الفولدر', 'the folder URL'), B('اسم الفولدر', 'the folder name'), B('الـ credential', 'the credential')], a: 0, why: B('بعد folders/.', 'After folders/.') },
        { q: B('presigned URL:', 'A presigned URL:'), o: [B('لينك مؤقت لملف خاص', 'a temporary link to a private file'), B('باسورد', 'a password'), B('bucket عام', 'a public bucket')], a: 0, why: B('بينتهي.', 'It expires.') },
        { q: B('على n8n Cloud مفيش:', 'On n8n Cloud there is no:'), o: [B('ديسك تكتب عليه ملفات', 'disk to write files to'), B('Webhook', 'Webhook'), B('Code', 'Code')], a: 0, why: B('استخدم Drive/S3.', 'Use Drive/S3.') }
      ] }
  ]
};
