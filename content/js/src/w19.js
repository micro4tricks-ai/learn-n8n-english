// JavaScript week 19 — data files in Node: CSV, Excel and PDF.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('ملفات البيانات: CSV وExcel وPDF في Node', 'Data files in Node: CSV, Excel and PDF'),
  goal: B('تتعامل مع الملفات اللي الشركات عايشة عليها: تقرا CSV صح (اقتباسات، فواصل، عربي)، وتكتب CSV يفتح في Excel من غير «كلام غريب»، وتعالج ملفات ضخمة بالـ streams، وتقرا وتكتب Excel، وتطلّع فواتير PDF.',
          'Handle the files companies live on: read CSV correctly (quotes, separators, Arabic), write CSV that opens in Excel without «garbage», process huge files with streams, read and write Excel, and produce PDF invoices.'),
  days: [
    { title: B('قراءة CSV صح', 'Reading CSV correctly'),
      goal: B('تقرا CSV حقيقي من غير ما الفواصل جوه النص تبوّظه.', 'Read real CSV without commas inside text breaking it.'),
      learn: [
        L(B('ليه split(",") بيبوظ', 'Why split(",") breaks'),
          B('**csv** حقيقي فيه **quoted field**: `"Cairo, Egypt"` (فاصلة جوه)، `"He said ""hi"""` (اقتباس جوه)، وحتى سطر جديد جوه خانة. `split(",")` بيكسّر كل ده. الـ parser ده بيمشي حرف حرف ويعرف هو جوه اقتباس ولا لأ:', 'Real **csv** has a **quoted field**: `"Cairo, Egypt"` (a comma inside), `"He said ""hi"""` (a quote inside), even a newline inside a cell. `split(",")` breaks all of that. This parser walks character by character and knows whether it is inside quotes:'),
          'function parseCsv(text, delimiter = ",") {\n  const rows = []; let row = [], field = "", quoted = false;\n  text = text.replace(/^\\uFEFF/, "");                 // drop a BOM\n  for (let i = 0; i < text.length; i++) {\n    const c = text[i];\n    if (quoted) {\n      if (c === \'"\' && text[i + 1] === \'"\') { field += \'"\'; i++; }\n      else if (c === \'"\') quoted = false;\n      else field += c;\n    } else if (c === \'"\') quoted = true;\n    else if (c === delimiter) { row.push(field); field = ""; }\n    else if (c === "\\n" || c === "\\r") {\n      if (c === "\\r" && text[i + 1] === "\\n") i++;\n      row.push(field); rows.push(row); row = []; field = "";\n    } else field += c;\n  }\n  if (field || row.length) { row.push(field); rows.push(row); }\n  return rows;\n}\nconst text = \'\\uFEFFid,customer,city,note\\r\\n101,سارة,"Cairo, Egypt","said ""asap"""\\r\\n102,Omar,Giza,"two\\nlines"\\r\\n\';\nconst [header, ...rows] = parseCsv(text);\nconst objects = rows.map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])));\nconsole.log(header);\nconsole.log(objects);', N()),
        L(B('الفاصل والـ BOM', 'The delimiter and the BOM'),
          B('Excel العربي والأوروبي بيحفظ CSV بـ **delimiter** `;` مش `,` (لأن الفاصلة العشرية `,` في لغات كتير). والملف ممكن يبدأ بـ **bom** (`\\uFEFF`) — حرف خفي بيبوظ اسم أول عمود (`"\\uFEFFid"` مش `"id"`). خمّن الفاصل من أول سطر، وشيل الـ BOM دايمًا.', 'Arabic and European Excel saves CSV with a `;` **delimiter**, not `,` (because many languages use `,` as the decimal mark). And the file may start with a **bom** (`\\uFEFF`) — a hidden character that spoils the first column name (`"\\uFEFFid"` instead of `"id"`). Guess the delimiter from the first line, and always strip the BOM.'),
          'function sniffDelimiter(firstLine) {\n  const counts = [",", ";", "\\t", "|"].map(d => [d, firstLine.split(d).length - 1]);\n  return counts.sort((a, b) => b[1] - a[1])[0][0];\n}\nfor (const line of ["id,name,total", "id;name;total", "id\\tname\\ttotal"]) console.log(JSON.stringify(line), "→", JSON.stringify(sniffDelimiter(line)));\nconst withBom = "\\uFEFFid;total";\nconsole.log(withBom.split(";")[0] === "id", withBom.replace(/^\\uFEFF/, "").split(";")[0] === "id");\nconsole.log("decimal comma:", Number("12,50".replace(",", ".")));', N()),
        L(B('المكتبات الجاهزة', 'Ready-made libraries'),
          B('كتبنا parser عشان تفهم المشكلة — بس في الشغل استخدم مكتبة مجرّبة: **csv-parse** في Node (بيدعم streams وكل الحالات الغريبة)، و**papa parse** في المتصفح. وبعد ما تقرا: كل القيم نصوص! حوّلها بالـ mapper بتاع أسبوع 14 (أرقام، تواريخ، قيم فاضية).', 'We wrote a parser so you understand the problem — but at work use a tested library: **csv-parse** in Node (it supports streams and every odd case), and **papa parse** in the browser. And after reading: every value is text! Convert it with the week 14 mapper (numbers, dates, empty values).'),
          'import { parse } from "csv-parse/sync";\nimport { readFile } from "node:fs/promises";\n\nconst rows = parse(await readFile("orders.csv"), {\n  columns: true,            // objects keyed by the header row\n  bom: true,                // strip the BOM\n  delimiter: [",", ";"],    // accept both\n  skip_empty_lines: true,\n  trim: true,\n  cast: (value, ctx) => ctx.column === "total" ? Number(value.replace(",", ".")) : value,\n});', S)
      ],
      practice: [
        B('شغّل الـ parser على CSV فيه فاصلة واقتباس وسطر جديد.', 'Run the parser on CSV with a comma, a quote and a newline inside.'),
        B('احفظ ملف من Excel بالعربي وشوف الفاصل والـ BOM.', 'Save a file from Excel in Arabic and look at the delimiter and BOM.'),
        B('جرّب sniffDelimiter على ملف TSV.', 'Try sniffDelimiter on a TSV file.'),
        B('اقرا نفس الملف بـ csv-parse وقارن.', 'Read the same file with csv-parse and compare.')
      ],
      words: [
        W('csv', 'ملف نص بقيم مفصولة بفواصل', 'a text file of comma-separated values', 'Export the orders as CSV.'),
        W('quoted field', 'خانة بين علامتي اقتباس', 'a cell wrapped in quotation marks', 'A quoted field may contain commas.'),
        W('delimiter', 'الحرف الفاصل بين الخانات', 'the character separating cells', 'Arabic Excel uses ; as the delimiter.'),
        W('bom', 'حرف خفي في أول الملف بيحدد الترميز', 'a hidden first character marking the encoding', 'Strip the BOM before reading headers.'),
        W('csv-parse', 'مكتبة قراءة CSV في Node', 'a CSV reading library for Node', 'csv-parse handles quoted newlines.'),
        W('papa parse', 'مكتبة قراءة CSV في المتصفح', 'a CSV reading library for the browser', 'Papa Parse reads the uploaded file.')
      ],
      read: [{ t: 'RFC 4180: CSV format', url: 'https://datatracker.ietf.org/doc/html/rfc4180', what: B('اقرا قسم 2 بس.', 'Read section 2 only.') }, { t: 'csv-parse', url: 'https://csv.js.org/parse/', what: B('اقرا Options: columns وbom وcast.', 'Read Options: columns, bom and cast.') }],
      challenge: B('اعمل `csv2json.mjs`: يقرا أي CSV (يخمّن الفاصل، يشيل الـ BOM، يدعم الاقتباسات)، ويحوّل الأعمدة الرقمية لأرقام، ويطلّع JSON — وجرّبه على 3 ملفات من مصادر مختلفة.', 'Write `csv2json.mjs`: read any CSV (guess the delimiter, strip the BOM, handle quotes), convert numeric columns to numbers, and output JSON — and try it on 3 files from different sources.'),
      quiz: [
        Q(B('"Cairo, Egypt" في CSV:', '"Cairo, Egypt" in a CSV:'), [['خانة واحدة', 'one cell'], ['خانتين', 'two cells'], ['خطأ', 'an error']], 0, B('quoted.', 'Quoted.')),
        Q(B('أول عمود اسمه "\\uFEFFid":', 'The first column is "\\uFEFFid":'), [['BOM لازم يتشال', 'a BOM to strip'], ['اسم عادي', 'a normal name'], ['ملف بايظ', 'a corrupt file']], 0, B('حرف خفي.', 'A hidden character.')),
        Q(B('القيم بعد قراءة CSV:', 'Values after reading CSV:'), [['نصوص', 'text'], ['أرقام', 'numbers'], ['تواريخ', 'dates']], 0, B('حوّلها.', 'Convert them.'))
      ] },

    { title: B('كتابة CSV لـ Excel', 'Writing CSV for Excel'),
      goal: B('تطلّع CSV يفتح في Excel بالعربي صح.', 'Produce CSV that opens in Excel with correct Arabic.'),
      learn: [
        L(B('الهروب الصح', 'Escaping properly'),
          B('عند الكتابة: أي قيمة فيها فاصلة أو اقتباس أو سطر جديد لازم تتحط بين اقتباسات، والاقتباس جواها يتضاعف. والقيم `null` تبقى خانة فاضية. ودالة واحدة صغيرة بتعمل ده لكل جدول:', 'When writing: any value with a comma, a quote or a newline must be wrapped in quotes, and quotes inside it doubled. `null` values become empty cells. One small function does this for any table:'),
          'const cell = v => {\n  if (v == null) return "";\n  const s = v instanceof Date ? v.toISOString().slice(0, 10) : String(v);\n  return /[",\\r\\n;]/.test(s) ? `"${s.replace(/"/g, \'""\')}"` : s;\n};\nfunction toCsv(rows, columns = Object.keys(rows[0] ?? {})) {\n  return [columns.join(","), ...rows.map(r => columns.map(c => cell(r[c])).join(","))].join("\\r\\n");\n}\nconsole.log(toCsv([\n  { id: 101, customer: "سارة", city: "Cairo, Egypt", note: \'said "asap"\', paid: new Date("2026-10-01") },\n  { id: 102, customer: "Omar", city: "Giza", note: null, paid: null },\n]));', N()),
        L(B('العربي في Excel', 'Arabic in Excel'),
          B('Excel على ويندوز بيفتح CSV بترميز قديم لو مفيش BOM — فالعربي يطلع «Ø³Ø§Ø±Ø©». الحل: **utf-8 bom** — اكتب `"\\uFEFF"` في أول الملف. ولو جمهورك بيستخدم Excel بإعدادات عربي/أوروبي، استخدم `;` كفاصل (أو اكتب `sep=,` في أول سطر).', 'Excel on Windows opens CSV in an old encoding when there is no BOM — so Arabic shows up as «Ø³Ø§Ø±Ø©». The fix: a **utf-8 bom** — write `"\\uFEFF"` at the start of the file. If your audience uses Excel with Arabic/European settings, use `;` as the delimiter (or put `sep=,` on the first line).'),
          'import { writeFile, readFile } from "node:fs/promises";\nconst rows = [["id", "customer", "total"], [101, "سارة", "250.00"], [102, "محمود", "90.50"]];\nconst csv = rows.map(r => r.join(",")).join("\\r\\n");\nawait writeFile("orders-excel.csv", "\\uFEFF" + csv, "utf8");      // Excel reads Arabic correctly\nawait writeFile("orders-plain.csv", csv, "utf8");\nconst bytes = await readFile("orders-excel.csv");\nconsole.log("first bytes:", [...bytes.subarray(0, 3)].map(b => b.toString(16)).join(" "), "(EF BB BF = the UTF-8 BOM)");\nconsole.log("what old Excel shows without it:", Buffer.from("سارة").toString("latin1"));', N()),
        L(B('أرقام وتواريخ', 'Numbers and dates'),
          B('عشان Excel يحسب: اكتب الأرقام من غير رموز (`250.00` مش `250 ج.م`)، والتواريخ ISO (`2026-10-01`). والتليفونات والأكواد اللي بتبدأ بصفر (`0100…`) Excel بيشيل الصفر — لو مهم، استخدم xlsx (يوم 4) بدل CSV.', 'So Excel can calculate: write numbers without symbols (`250.00`, not `250 EGP`), and dates as ISO (`2026-10-01`). Phone numbers and codes starting with zero (`0100…`) lose the zero in Excel — if that matters, use xlsx (day 4) instead of CSV.'),
          '✓ 250.00          ✗ 250 EGP / 250,00 (in a , file)\n✓ 2026-10-01      ✗ 1/10/26 (day or month?)\n✓ xlsx for 01001234567  (CSV → Excel shows 1001234567)\n✓ one header row, one table per file, no merged cells', T)
      ],
      practice: [
        B('اكتب CSV فيه عربي بـ BOM وافتحه في Excel.', 'Write CSV with Arabic and a BOM and open it in Excel.'),
        B('افتح نفس الملف من غير BOM وشوف الفرق.', 'Open the same file without a BOM and see the difference.'),
        B('جرّب toCsv على قيم فيها فواصل واقتباسات.', 'Try toCsv on values with commas and quotes.'),
        B('اكتب تليفون يبدأ بصفر وشوف Excel عمل إيه.', 'Write a phone number starting with 0 and see what Excel did.')
      ],
      words: [
        W('utf-8 bom', 'علامة في أول الملف بتقول UTF-8', 'a marker at the file start meaning UTF-8', 'Add a UTF-8 BOM for Excel.'),
        W('escaping', 'تعديل قيمة عشان متبوظش الصيغة', 'changing a value so it does not break the format', 'Escaping doubles the quotes.'),
        W('mojibake', 'نص بايظ بسبب ترميز غلط', 'garbled text from a wrong encoding', 'Without a BOM Arabic becomes mojibake.'),
        W('iso date', 'تاريخ بصيغة سنة-شهر-يوم', 'a date in year-month-day format', 'Write ISO dates in exports.'),
        W('leading zero', 'صفر في أول الرقم', 'a zero at the start of a number', 'Excel drops the leading zero.')
      ],
      read: [{ t: 'MDN: TextEncoder', url: 'https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder', what: B('عشان تفهم UTF-8 bytes.', 'To understand UTF-8 bytes.') }],
      challenge: B('اعمل دالة exportCsv(rows, file, { excel: true }) بتهرب صح وتحط BOM وتختار الفاصل، وجرّبها على 1000 طلب بأسماء عربي وافتحها في Excel وGoogle Sheets.', 'Write exportCsv(rows, file, { excel: true }) that escapes correctly, adds a BOM and picks the delimiter, and try it on 1000 orders with Arabic names in Excel and Google Sheets.'),
      quiz: [
        Q(B('عربي بايظ في Excel:', 'Garbled Arabic in Excel:'), [['ضيف BOM', 'add a BOM'], ['غيّر الخط', 'change the font'], ['استخدم صور', 'use images']], 0, B('\\uFEFF.', '\\uFEFF.')),
        Q(B('قيمة فيها اقتباس:', 'A value containing a quote:'), [['بين اقتباسات والاقتباس مضاعف', 'wrapped in quotes with the quote doubled'], ['تتشال', 'removed'], ['زي ما هي', 'as is']], 0, B('"" .', '"".')),
        Q(B('كود يبدأ بصفر مهم:', 'A code with an important leading zero:'), ['xlsx', 'CSV', 'TXT'], 0, B('Excel بيشيله من CSV.', 'Excel drops it from CSV.'))
      ] },

    { title: B('الملفات الضخمة والـ streams', 'Huge files and streams'),
      goal: B('تعالج ملف 2GB بذاكرة صغيرة.', 'Process a 2 GB file with little memory.'),
      learn: [
        L(B('سطر سطر', 'Line by line'),
          B('`readFile` بيحمّل الملف كله في الذاكرة — ملف 2GB هيوقّع البرنامج. **stream** بيقرا **chunk** صغير ورا التاني. أسهل استخدام: **createreadstream** مع readline واقرا سطر سطر. الذاكرة بتفضل ثابتة مهما كان حجم الملف:', '`readFile` loads the whole file into memory — a 2 GB file will crash the program. A **stream** reads one small **chunk** after another. The easiest use: **createreadstream** with readline, reading line by line. Memory stays flat whatever the file size:'),
          'import { createReadStream, createWriteStream } from "node:fs";\nimport { createInterface } from "node:readline";\nimport { once } from "node:events";\n\nconst out = createWriteStream("big.csv");\nout.write("id,city,total\\n");\nconst cities = ["Cairo", "Giza", "Alex", "Riyadh"];\nfor (let i = 1; i <= 200_000; i++) if (!out.write(`${i},${cities[i % 4]},${(i % 500) + 0.5}\\n`)) await once(out, "drain");\nout.end(); await once(out, "finish");\n\nconst totals = {}; let lines = 0;\nfor await (const line of createInterface({ input: createReadStream("big.csv") })) {\n  if (lines++ === 0) continue;\n  const [, city, total] = line.split(",");\n  totals[city] = (totals[city] ?? 0) + Number(total);\n}\nconsole.log(lines - 1, "rows", Object.fromEntries(Object.entries(totals).map(([k, v]) => [k, Math.round(v)])));\nconsole.log("heap used MB:", Math.round(process.memoryUsage().heapUsed / 1e6), "(stays small)");', N()),
        L(B('pipeline وtransform', 'pipeline and transform'),
          B('**readable stream** (مصدر) ← **transform stream** (تعديل) ← **writable stream** (هدف). `pipeline` من `node:stream/promises` بيوصّلهم ويتعامل مع الأخطاء والقفل. وبيحترم **backpressure**: لو الهدف بطيء، المصدر بيستنى — مفيش تكدّس في الذاكرة.', 'A **readable stream** (source) → a **transform stream** (change) → a **writable stream** (target). `pipeline` from `node:stream/promises` connects them and handles errors and closing. It respects **backpressure**: if the target is slow, the source waits — nothing piles up in memory.'),
          'import { pipeline } from "node:stream/promises";\nimport { Transform } from "node:stream";\nimport { createGzip } from "node:zlib";\nimport { createReadStream, createWriteStream, writeFileSync, statSync } from "node:fs";\n\nwriteFileSync("orders.ndjson", Array.from({ length: 50_000 }, (_, i) => JSON.stringify({ id: i, total: i % 300, city: i % 2 ? "Cairo" : "Giza" })).join("\\n") + "\\n");\nlet carry = "";\nconst onlyCairo = new Transform({\n  transform(chunk, _enc, done) {\n    const lines = (carry + chunk).split("\\n"); carry = lines.pop();\n    done(null, lines.filter(l => l && JSON.parse(l).city === "Cairo").join("\\n") + "\\n");\n  },\n  flush(done) { done(null, carry && JSON.parse(carry).city === "Cairo" ? carry + "\\n" : ""); },   // the last line without \\n\n});\nawait pipeline(createReadStream("orders.ndjson"), onlyCairo, createGzip(), createWriteStream("cairo.ndjson.gz"));\nconsole.log("in:", statSync("orders.ndjson").size, "bytes → out (filtered + gzipped):", statSync("cairo.ndjson.gz").size, "bytes");', N()),
        L(B('NDJSON', 'NDJSON'),
          B('لـ تصدير بيانات كبيرة بين أنظمة، **ndjson** (سطر = كائن JSON) أحسن من مصفوفة JSON ضخمة: تقدر تقراه سطر سطر وتكمّل من النص، وتضيف عليه بـ append. ده نفس شكل اللوج بتاع الأسبوع اللي فات، وكتير من الـ APIs بتصدّر بيه.', 'For exporting big data between systems, **ndjson** (one JSON object per line) beats one huge JSON array: you can read it line by line, resume from the middle, and append to it. It is the same shape as last week’s logs, and many APIs export with it.'),
          '[{"id":1},{"id":2},…]        ← must be read whole before use\n{"id":1}\n{"id":2}                       ← NDJSON: read, process and append line by line\n{"id":3}', T)
      ],
      practice: [
        B('شغّل مثال 200 ألف سطر وغيّره لمليون.', 'Run the 200k-line example and raise it to a million.'),
        B('قارن الذاكرة مع readFile لنفس الملف.', 'Compare memory with readFile for the same file.'),
        B('اعمل transform بيحوّل CSV لـ NDJSON.', 'Write a transform turning CSV into NDJSON.'),
        B('اضغط ملف بـ pipeline وgzip.', 'Compress a file with pipeline and gzip.')
      ],
      words: [
        W('stream', 'بيانات بتتقري أو تتكتب حتة حتة', 'data read or written piece by piece', 'Use a stream for big files.'),
        W('chunk', 'حتة من البيانات في stream', 'one piece of data in a stream', 'Each chunk is about 64 KB.'),
        W('createreadstream', 'فتح ملف كـ stream للقراءة', 'opening a file as a readable stream', 'createReadStream keeps memory low.'),
        W('readable stream', 'مصدر بيانات بيتقري', 'a source of data to read', 'An HTTP response is a readable stream.'),
        W('writable stream', 'هدف بتكتب فيه', 'a target you write to', 'A file is a writable stream.'),
        W('transform stream', 'stream بيعدّل البيانات وهي معدية', 'a stream changing data as it passes', 'The transform stream filters rows.'),
        W('backpressure', 'تبطيء المصدر لما الهدف مش ملاحق', 'slowing the source when the target lags', 'pipeline handles backpressure.'),
        W('ndjson', 'JSON سطر لكل كائن', 'JSON with one object per line', 'Export the orders as NDJSON.')
      ],
      read: [{ lib: 'Node.js: Streams', what: B('اقرا API for stream consumers وstream.pipeline.', 'Read API for stream consumers and stream.pipeline.') }],
      challenge: B('اعمل `bigcsv.mjs` بيقرا CSV حجمه مليون سطر بـ stream، يفلتر ويجمع حسب عمود، ويكتب الناتج CSV مضغوط — ويطبع الذاكرة والوقت.', 'Write `bigcsv.mjs` that streams a one-million-line CSV, filters and aggregates by a column, and writes a compressed CSV result — printing memory and time.'),
      quiz: [
        Q(B('ملف 2GB بـ readFile:', 'A 2 GB file with readFile:'), [['ممكن يوقّع البرنامج', 'may crash the program'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('stream.', 'Stream.')),
        Q(B('backpressure:', 'Backpressure:'), [['المصدر يستنى الهدف البطيء', 'the source waits for a slow target'], ['ضغط ملفات', 'file compression'], ['خطأ شبكة', 'a network error']], 0, B('ذاكرة ثابتة.', 'Flat memory.')),
        Q(B('NDJSON أحسن من مصفوفة كبيرة عشان:', 'NDJSON beats a big array because:'), [['يتقري سطر سطر', 'it reads line by line'], ['أجمل', 'it is prettier'], ['أقصر دايمًا', 'it is always shorter']], 0, B('streaming.', 'Streaming.'))
      ] },

    { title: B('Excel', 'Excel'),
      goal: B('تقرا وتكتب ملفات xlsx بأوراق وتنسيق.', 'Read and write xlsx files with sheets and formatting.'),
      learn: [
        L(B('القراءة بـ SheetJS', 'Reading with SheetJS'),
          B('**xlsx** ملف مضغوط فيه XML، مش نص. **sheetjs** بيفتح أي **workbook** ويحوّل أي **worksheet** لمصفوفة كائنات. انتبه: التواريخ في Excel أرقام (أيام من 1900) — استخدم `cellDates: true`.', 'An **xlsx** file is a zip of XML, not text. **sheetjs** opens any **workbook** and turns any **worksheet** into an array of objects. Careful: dates in Excel are numbers (days since 1900) — use `cellDates: true`.'),
          'import * as XLSX from "xlsx";\nimport { readFile } from "node:fs/promises";\n\nconst wb = XLSX.read(await readFile("sales.xlsx"), { cellDates: true });\nconsole.log("sheets:", wb.SheetNames);\nconst rows = XLSX.utils.sheet_to_json(wb.Sheets["Orders"], { defval: null });\nconsole.log(rows.length, rows[0]);      // { id: 101, customer: "سارة", total: 250, date: 2026-10-01T… }', S),
        L(B('الكتابة بتنسيق بـ ExcelJS', 'Writing with formatting using ExcelJS'),
          B('للتقارير اللي حد هيقراها: **exceljs** بيدّيك أعمدة بعرض، **number format** للعملة، صف عناوين ثابت وbold، **formula** للإجماليات (Excel يحسبها)، وورقة من اليمين للشمال للعربي. والـ **cell** ممكن يتلوّن حسب قيمته.', 'For reports people will read: **exceljs** gives you column widths, a **number format** for currency, a frozen bold header row, a **formula** for totals (Excel computes it), and a right-to-left sheet for Arabic. A **cell** can be coloured by its value.'),
          'import ExcelJS from "exceljs";\nconst wb = new ExcelJS.Workbook();\nconst ws = wb.addWorksheet("الطلبات", { views: [{ rightToLeft: true, state: "frozen", ySplit: 1 }] });\nws.columns = [\n  { header: "رقم", key: "id", width: 8 },\n  { header: "العميل", key: "customer", width: 22 },\n  { header: "الإجمالي", key: "total", width: 14, style: { numFmt: \'#,##0.00 "ج.م"\' } },\n];\nws.getRow(1).font = { bold: true };\norders.forEach(o => ws.addRow(o));\nconst last = ws.rowCount;\nws.addRow({ customer: "الإجمالي", total: { formula: `SUM(C2:C${last})` } }).font = { bold: true };\nws.getColumn("total").eachCell((c, i) => { if (i > 1 && c.value > 1000) c.font = { color: { argb: "FF0A7D32" } }; });\nawait wb.xlsx.writeFile("orders-report.xlsx");', S),
        L(B('Excel في الأتمتة', 'Excel in automation'),
          B('السيناريوهات الشائعة: موظف بيرفع xlsx ← تقراه وتتحقق ← تكتب في قاعدة أو CRM؛ أو تقرير أسبوعي xlsx يتبعت إيميل من n8n. نصايح: اقرا الأوراق بالاسم مش بالترتيب، اتحقق من أسماء الأعمدة قبل ما تبدأ، وتجاهل الصفوف الفاضية في الآخر.', 'Common scenarios: staff upload an xlsx → you read and validate it → write to a database or CRM; or a weekly xlsx report emailed from n8n. Tips: read sheets by name, not position; check the column names before starting; and ignore empty rows at the end.'),
          'const REQUIRED = ["id", "customer", "total"];\nconst header = Object.keys(rows[0] ?? {});\nconst missing = REQUIRED.filter(c => !header.includes(c));\nif (missing.length) throw new Error(`Sheet "Orders" is missing columns: ${missing.join(", ")}`);\nconst clean = rows.filter(r => Object.values(r).some(v => v !== null && v !== ""));', S)
      ],
      practice: [
        B('اقرا ملف xlsx فيه ورقتين بـ SheetJS.', 'Read an xlsx with two sheets using SheetJS.'),
        B('اكتب تقرير بـ ExcelJS بعملة وإجمالي بـ formula.', 'Write an ExcelJS report with currency and a formula total.'),
        B('خلّي الورقة من اليمين للشمال.', 'Make the sheet right-to-left.'),
        B('اتحقق من الأعمدة المطلوبة قبل المعالجة.', 'Check required columns before processing.')
      ],
      words: [
        W('xlsx', 'صيغة ملفات Excel الحديثة', 'the modern Excel file format', 'Send the report as xlsx.'),
        W('sheetjs', 'مكتبة قراءة وكتابة جداول', 'a library for reading and writing spreadsheets', 'SheetJS reads old .xls too.'),
        W('exceljs', 'مكتبة كتابة Excel بتنسيق', 'a library for writing formatted Excel', 'ExcelJS sets column widths.'),
        W('workbook', 'ملف Excel كامل', 'a whole Excel file', 'The workbook has three sheets.'),
        W('worksheet', 'ورقة واحدة جوه الملف', 'one sheet inside the file', 'Read the Orders worksheet.'),
        W('cell', 'خانة في الجدول', 'one box in the grid', 'Colour the cell red when negative.'),
        W('formula', 'معادلة Excel بتحسب', 'an Excel calculation', 'Use a SUM formula for the total.'),
        W('number format', 'شكل عرض الرقم', 'how a number is displayed', 'Set a currency number format.')
      ],
      read: [{ lib: 'SheetJS Community Edition', what: B('اقرا Getting Started.', 'Read Getting Started.') }, { t: 'ExcelJS', url: 'https://github.com/exceljs/exceljs', what: B('اقرا Worksheet Views وStyles.', 'Read Worksheet Views and Styles.') }],
      challenge: B('اعمل «مستورد أسعار»: يقرا xlsx من المورد، يتحقق من الأعمدة والقيم، يطلّع ملف xlsx بالأخطاء ملوّنة لو فيه، أو JSON نضيف لو سليم — وn8n يبعت ملف الأخطاء للمورد.', 'Build a «price importer»: read the supplier’s xlsx, validate columns and values, output an xlsx with errors highlighted if any, or clean JSON if valid — and have n8n email the error file to the supplier.'),
      quiz: [
        Q(B('تاريخ Excel من غير cellDates:', 'An Excel date without cellDates:'), [['رقم أيام', 'a number of days'], ['Date', 'a Date'], ['نص', 'text']], 0, B('من 1900.', 'Since 1900.')),
        Q(B('إجمالي يتحدث لو حد عدّل:', 'A total that updates when someone edits:'), [['formula', 'a formula'], ['رقم محسوب', 'a computed number'], ['صورة', 'an image']], 0, B('Excel يحسب.', 'Excel computes.')),
        Q(B('اقرا الورقة بـ:', 'Read the sheet by:'), [['الاسم', 'its name'], ['الترتيب', 'its position'], ['اللون', 'its colour']], 0, B('الترتيب بيتغير.', 'Order changes.'))
      ] },

    { title: B('PDF', 'PDF'),
      goal: B('تطلّع فواتير PDF وتقرا نص من PDF.', 'Produce PDF invoices and read text from PDFs.'),
      learn: [
        L(B('HTML ← PDF', 'HTML → PDF'),
          B('أسهل طريقة لفاتورة جميلة بالعربي: اعمل **template** HTML وCSS (عندك الخبرة من الشهر التالت!)، واطبعه PDF بمتصفح: Playwright `page.pdf()`. المتصفح بيعمل **text shaping** للعربي (توصيل الحروف واتجاه RTL) صح — المكتبات اللي بترسم مباشرة غالبًا لأ. المثال بيبني الـ HTML:', 'The easiest way to a beautiful Arabic invoice: build an HTML and CSS **template** (you have the skills from month 3!), and print it to PDF with a browser: Playwright `page.pdf()`. The browser does proper **text shaping** for Arabic (joining letters and RTL direction) — libraries that draw directly often do not. The example builds the HTML:'),
          'import { writeFile } from "node:fs/promises";\nconst esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", \'"\': "&quot;" })[c]);\nconst egp = n => new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(n);\nfunction invoiceHtml(inv) {\n  const rows = inv.items.map(i => `<tr><td>${esc(i.name)}</td><td>${i.qty}</td><td>${egp(i.price)}</td><td>${egp(i.qty * i.price)}</td></tr>`).join("");\n  const total = inv.items.reduce((s, i) => s + i.qty * i.price, 0);\n  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8">\n<style>body{font-family:"Cairo",sans-serif;margin:40px}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #ddd;padding:8px}</style>\n<h1>فاتورة رقم ${esc(inv.no)}</h1><p>العميل: ${esc(inv.customer)}</p>\n<table><tr><th>الصنف</th><th>الكمية</th><th>السعر</th><th>الإجمالي</th></tr>${rows}</table>\n<h2>الإجمالي: ${egp(total)}</h2></html>`;\n}\nconst html = invoiceHtml({ no: "2026-0101", customer: "سارة <VIP>", items: [{ name: "كشكول", qty: 2, price: 45 }, { name: "قلم", qty: 4, price: 12.5 }] });\nawait writeFile("invoice.html", html);\nconsole.log(html.length, "chars;", html.includes("&lt;VIP&gt;") ? "customer name escaped ✓" : "✗");\n// then: await page.setContent(html); await page.pdf({ path: "invoice.pdf", format: "A4" });   (week 23)', N()),
        L(B('pdf-lib للتعديل', 'pdf-lib for editing'),
          B('**pdf-lib** ممتاز لتعديل PDF موجود: تملا فورم، تحط ختم أو رقم صفحة، تدمج ملفات، تقسّم. للكتابة العربية فيه محتاج **font embedding** لخط عربي — وبرضه التشكيل والتوصيل مش مضمونين، فخلّي النص العربي في الـ HTML.', '**pdf-lib** is great for editing an existing PDF: fill a form, stamp a mark or page number, merge files, split. For Arabic text it needs **font embedding** of an Arabic font — and joining and shaping are still not guaranteed, so keep Arabic text in the HTML route.'),
          'import { PDFDocument, rgb, StandardFonts } from "pdf-lib";\nimport { readFile, writeFile } from "node:fs/promises";\n\nconst merged = await PDFDocument.create();\nfor (const f of ["invoice-101.pdf", "terms.pdf"]) {\n  const src = await PDFDocument.load(await readFile(f));\n  (await merged.copyPages(src, src.getPageIndices())).forEach(p => merged.addPage(p));\n}\nconst font = await merged.embedFont(StandardFonts.Helvetica);\nmerged.getPages().forEach((p, i, all) => p.drawText(`${i + 1} / ${all.length}`, { x: 280, y: 20, size: 9, font, color: rgb(0.4, 0.4, 0.4) }));\nawait writeFile("invoice-101-full.pdf", await merged.save());', S),
        L(B('استخراج نص من PDF', 'Extracting text from PDF'),
          B('**pdf extraction**: PDF فيه نص حقيقي (من برنامج) بيتقري بمكتبة زي pdfjs-dist أو `unpdf`؛ أما PDF ممسوح (صورة) فمحتاج OCR (أو نموذج ذكاء اصطناعي بيقرا صور — شهر 10). وجداول الـ PDF صعبة: النص بييجي سطور متلخبطة، فاستخدم مكان الكلمات أو اطلب الملف الأصلي (Excel) لو ممكن.', '**pdf extraction**: a PDF with real text (from software) is read with a library such as pdfjs-dist or `unpdf`; a scanned PDF (an image) needs OCR (or an AI model that reads images — month 10). PDF tables are hard: text arrives as jumbled lines, so use word positions or ask for the original file (Excel) when you can.'),
          'import { extractText, getDocumentProxy } from "unpdf";\nimport { readFile } from "node:fs/promises";\n\nconst pdf = await getDocumentProxy(new Uint8Array(await readFile("supplier-invoice.pdf")));\nconst { totalPages, text } = await extractText(pdf, { mergePages: true });\nconst total = text.match(/Total\\s*:?\\s*([\\d,.]+)/i)?.[1];\nconsole.log(totalPages, "pages; total =", total ?? "not found → send to a person / AI");', S)
      ],
      practice: [
        B('شغّل invoiceHtml وافتح invoice.html في المتصفح واطبعه PDF.', 'Run invoiceHtml, open invoice.html in the browser and print to PDF.'),
        B('ادمج ملفين PDF بـ pdf-lib.', 'Merge two PDFs with pdf-lib.'),
        B('استخرج نص من فاتورة PDF ودوّر على الإجمالي.', 'Extract text from a PDF invoice and find the total.'),
        B('جرّب PDF ممسوح وشوف الاستخراج فشل.', 'Try a scanned PDF and see extraction fail.')
      ],
      words: [
        W('html to pdf', 'طباعة صفحة HTML كملف PDF', 'printing an HTML page as a PDF', 'HTML to PDF keeps Arabic shaping.'),
        W('page.pdf', 'دالة Playwright للطباعة PDF', 'Playwright’s print-to-PDF function', 'page.pdf writes an A4 invoice.'),
        W('text shaping', 'توصيل الحروف وترتيبها صح', 'joining and ordering letters correctly', 'Arabic needs text shaping.'),
        W('pdf-lib', 'مكتبة تعديل ودمج PDF', 'a library to edit and merge PDFs', 'pdf-lib adds page numbers.'),
        W('font embedding', 'تضمين خط جوه الملف', 'including a font inside the file', 'Font embedding makes it print anywhere.'),
        W('pdf extraction', 'سحب النص من PDF', 'pulling text out of a PDF', 'PDF extraction fails on scans.'),
        W('template', 'قالب بيتملا ببيانات', 'a pattern filled with data', 'The invoice template uses HTML.')
      ],
      read: [{ lib: 'PDF-LIB', what: B('اقرا Merge PDFs وDraw text.', 'Read Merge PDFs and Draw text.') }, { t: 'Playwright: page.pdf()', url: 'https://playwright.dev/docs/api/class-page#page-pdf', what: B('اقرا الـ options.', 'Read the options.') }],
      challenge: B('اعمل مولّد فواتير: JSON طلب ← HTML template عربي بـ CSS طباعة ← PDF (بـ Playwright لو متاح أو طباعة المتصفح) ← دمج صفحة الشروط برقم صفحات — والاسم بالتاريخ ورقم الفاتورة.', 'Build an invoice generator: order JSON → an Arabic HTML template with print CSS → PDF (with Playwright if available, or browser printing) → merge a terms page with page numbers — named by date and invoice number.'),
      quiz: [
        Q(B('فاتورة عربي جميلة:', 'A beautiful Arabic invoice:'), [['HTML وCSS ثم page.pdf', 'HTML and CSS, then page.pdf'], ['pdf-lib بالخط الافتراضي', 'pdf-lib with the default font'], ['صورة', 'an image']], 0, B('الشكل والتوصيل.', 'Shaping and layout.')),
        Q(B('دمج ملفات PDF:', 'Merging PDFs:'), ['pdf-lib', 'SheetJS', 'csv-parse'], 0, B('copyPages.', 'copyPages.')),
        Q(B('PDF ممسوح:', 'A scanned PDF:'), [['محتاج OCR', 'needs OCR'], ['نصه جاهز', 'has ready text'], ['مستحيل', 'is impossible']], 0, B('صورة.', 'An image.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('خط معالجة ملفات كامل.', 'A complete file-processing pipeline.'),
      review: [
        B('CSV: الاقتباسات، الفاصل، الـ BOM، وcsv-parse.', 'CSV: quotes, delimiters, the BOM and csv-parse.'),
        B('كتابة CSV لـ Excel بـ BOM وأرقام وتواريخ صح.', 'Writing CSV for Excel with a BOM and proper numbers and dates.'),
        B('streams: سطر سطر، pipeline، transform، backpressure، NDJSON.', 'Streams: line by line, pipeline, transform, backpressure, NDJSON.'),
        B('Excel: SheetJS للقراءة وExcelJS للتقارير المنسقة.', 'Excel: SheetJS for reading and ExcelJS for formatted reports.'),
        B('PDF: HTML ← PDF، وpdf-lib للتعديل، والاستخراج وحدوده.', 'PDF: HTML → PDF, pdf-lib for editing, and extraction with its limits.')
      ],
      project: B('ابني «محوّل التقارير الشهري»: يقرا كل ملفات المبيعات في inbox (CSV بأي فاصل وxlsx) بـ streams للكبير، يوحّد الأعمدة ويتحقق، ويطلّع 3 مخرجات: CSV لـ Excel (BOM)، وتقرير xlsx منسّق RTL بإجماليات formula، وملخص PDF بالعربي من HTML template — وينقل الملفات لـ done/failed ويبعت الملخص لـ n8n.', 'Build a «monthly report converter»: read every sales file in inbox (CSV with any delimiter and xlsx) using streams for big ones, unify columns and validate, and produce 3 outputs: an Excel CSV (BOM), a formatted RTL xlsx report with formula totals, and an Arabic PDF summary from an HTML template — then move files to done/failed and send the summary to n8n.'),
      test: [
        Q(B('split(",") على CSV حقيقي:', 'split(",") on real CSV:'), [['بيبوظ مع الاقتباسات', 'breaks on quoted fields'], ['دايمًا صح', 'is always right'], ['أسرع وأدق', 'is faster and more accurate']], 0, B('parser.', 'Use a parser.')),
        Q(B('"" جوه خانة مقتبسة:', '"" inside a quoted cell:'), [['اقتباس واحد', 'one quote'], ['خانة فاضية', 'an empty cell'], ['خطأ', 'an error']], 0, B('مضاعف.', 'Doubled.')),
        Q(B('Excel العربي غالبًا بيحفظ بـ:', 'Arabic Excel often saves with:'), ['; delimiter', 'tab', '|'], 0, B('الفاصلة العشرية.', 'The decimal comma.')),
        Q(B('\\uFEFF في أول CSV:', '\\uFEFF at the start of a CSV:'), ['BOM', B('خطأ', 'an error'), B('مسافة', 'a space')], 0, B('UTF-8 marker.', 'A UTF-8 marker.')),
        Q(B('ملف مليون سطر:', 'A million-line file:'), ['stream', 'readFile', 'JSON.parse'], 0, B('ذاكرة ثابتة.', 'Flat memory.')),
        Q(B('pipeline بيعمل:', 'pipeline:'), [['يوصّل streams ويتعامل مع الأخطاء', 'connects streams and handles errors'], ['يرسم', 'draws'], ['يرفع ملفات', 'uploads files']], 0, B('من stream/promises.', 'From stream/promises.')),
        Q(B('NDJSON:', 'NDJSON:'), [['سطر = كائن', 'one object per line'], ['مصفوفة واحدة', 'one array'], ['XML', 'XML']], 0, B('streaming.', 'Streaming.')),
        Q(B('تقرير Excel بعملة وbold:', 'An Excel report with currency and bold:'), ['ExcelJS', 'CSV', 'TXT'], 0, B('تنسيق.', 'Formatting.')),
        Q(B('تاريخ من Excel:', 'A date from Excel:'), ['cellDates: true', B('نص', 'treat as text'), B('تجاهله', 'ignore it')], 0, B('رقم أيام.', 'A day count.')),
        Q(B('العربي في PDF مولّد:', 'Arabic in a generated PDF:'), [['HTML في متصفح', 'HTML in a browser'], ['pdf-lib مباشرة', 'pdf-lib directly'], ['Base64', 'Base64']], 0, B('shaping.', 'Shaping.')),
        Q(B('اسم عميل في HTML template:', 'A customer name in an HTML template:'), [['يتهرب (esc)', 'is escaped (esc)'], ['زي ما هو', 'as is'], ['يتشال', 'removed']], 0, B('XSS.', 'XSS.')),
        Q(B('PDF ممسوح فيه فاتورة:', 'A scanned PDF invoice:'), [['OCR أو نموذج رؤية', 'OCR or a vision model'], ['regex', 'regex'], ['SheetJS', 'SheetJS']], 0, B('مفيش نص.', 'No text layer.'))
      ] }
  ]
};
