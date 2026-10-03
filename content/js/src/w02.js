// JavaScript week 2 — strings, numbers and operators.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('النصوص والأرقام والعمليات', 'Strings, numbers and operators'),
  goal: B('تتحكم في النصوص (تقطيع، بحث، تنضيف، template literals) والأرقام (الحساب والتقريب وMath ومشكلة الكسور)، وتستخدم عمليات المقارنة والمنطق صح — الأساس اللي هتنضّف بيه أي بيانات جاية من فورم أو شيت أو API.',
          'Control text (slicing, searching, cleaning, template literals) and numbers (arithmetic, rounding, Math and the decimal problem), and use comparison and logic operators correctly — the base for cleaning any data from a form, a sheet or an API.'),
  days: [
    { title: B('النصوص من جوه: الطول والحروف والتقطيع', 'Strings inside out: length, characters and slicing'),
      goal: B('تقرا حروف النص وتقطّع منه أجزاء بـ slice وتعرف إن النص مبيتغيرش.', 'Read a string’s characters, cut pieces out with slice, and know that strings never change.'),
      learn: [
        { h: B('3 طرق تكتب نص', 'Three ways to write a string'),
          p: B('`"..."` و`\'...\'` نفس الحاجة؛ اختار واحدة والتزم بيها. الـ **backticks** `` `...` `` أقوى: بتسمح بأسطر متعددة وبـ `${...}` جواها لأي قيمة أو حساب. لو النص فيه علامة التنصيص نفسها، استخدم النوع التاني أو `\\"`. والأسطر الجديدة جوه نص عادي بتتكتب `\\n`.',
            '`"..."` and `\'...\'` are the same; pick one and stick to it. **Backticks** `` `...` `` are stronger: they allow several lines and `${...}` inside for any value or calculation. If the text contains the quote itself, use the other kind or `\\"`. New lines inside a normal string are written `\\n`.'),
          ex: 'const a = "She said \'hi\'";\nconst b = \'Use "double" inside single\';\nconst qty = 3, price = 45;\nconst c = `Line one\nTotal: ${qty * price} EGP`;\nconsole.log(a);\nconsole.log(b);\nconsole.log(c);\nconsole.log("tab\\there and a new\\nline");', run: 'js' },
        { h: B('length والحروف بالفهرس', 'length and characters by index'),
          p: B('`s.length` عدد الحروف. كل حرف ليه **فهرس** بيبدأ من **0**: `s[0]` أول حرف، و`s[s.length - 1]` آخر حرف، وأسهل: `s.at(-1)`. حرف برّه النص بيرجّع undefined مش خطأ. خلي بالك: بعض الإيموجي وحروف نادرة بتتحسب حرفين في length.',
            '`s.length` is the number of characters. Each character has an **index** starting at **0**: `s[0]` is the first, and `s[s.length - 1]` the last — easier: `s.at(-1)`. A character outside the text returns undefined, not an error. Watch out: some emoji and rare characters count as two in length.'),
          ex: 'const code = "INV-2026-0042";\nconsole.log(code.length, code[0], code[4], code.at(-1));\nconsole.log(code[99]);\nconsole.log("😀".length, [..."😀"].length);', run: 'js' },
        { h: B('slice: قطّع جزء', 'slice: cut out a piece'),
          p: B('`s.slice(start, end)` بياخد من `start` لحد **قبل** `end`. من غير end يكمّل للآخر. الأرقام السالبة بتعد من الآخر: `s.slice(-4)` آخر 4 حروف. ده اللي هتستخدمه تطلّع السنة من كود فاتورة، أو آخر 4 أرقام من كارت، أو امتداد ملف. (فيه كمان `substring` بس `slice` أوضح.)',
            '`s.slice(start, end)` takes from `start` up to **before** `end`. Without end it goes to the finish. Negative numbers count from the end: `s.slice(-4)` is the last 4 characters. You will use it to pull the year out of an invoice code, the last 4 digits of a card, or a file extension. (There is also `substring`, but `slice` is clearer.)'),
          ex: 'const code = "INV-2026-0042";\nconsole.log(code.slice(4, 8));   // year\nconsole.log(code.slice(-4));     // number\nconsole.log(code.slice(0, 3));   // prefix\nconst card = "4111111111111111";\nconsole.log("**** **** **** " + card.slice(-4));', run: 'js' },
        { h: B('النص مبيتغيرش (immutable)', 'Strings never change (immutable)'),
          p: B('مفيش method بتغيّر النص الأصلي: `toUpperCase()` و`slice()` و`replace()` كلهم بيرجّعوا **نص جديد**. لو عايز تحفظ النتيجة، خزّنها: `name = name.trim();` (ولازم name يبقى let). و`s[0] = "X"` مش بيعمل حاجة. الفكرة دي هتقابلك تاني مع المصفوفات والكائنات، بس هناك الوضع مختلف.',
            'No method changes the original string: `toUpperCase()`, `slice()` and `replace()` all return a **new string**. If you want to keep the result, store it: `name = name.trim();` (and name must be let). And `s[0] = "X"` does nothing. You will meet this idea again with arrays and objects, but there things are different.'),
          ex: 'let name = "  sara  ";\nname.trim();\nconsole.log(JSON.stringify(name)); // unchanged\nname = name.trim();\nconsole.log(JSON.stringify(name)); // now trimmed\nconst upper = name.toUpperCase();\nconsole.log(name, upper);', run: 'js' },
        { h: B('النص العربي والاتجاه', 'Arabic text and direction'),
          p: B('JS بيتعامل مع العربي عادي جدًا: length وslice والبحث شغالين. الفرق في **العرض**: في HTML حط `dir="rtl"` و`lang="ar"`، ولما تخلط عربي وأرقام وإنجليزي ممكن الترتيب يتلخبط في الشاشة مش في البيانات. والمقارنة والترتيب العربي يتعمل بـ `localeCompare(b, "ar")`. وفي التنضيف هنشيل التشكيل وننظّم الألف والياء بعدين.',
            'JS handles Arabic perfectly well: length, slice and searching all work. The difference is in **display**: in HTML set `dir="rtl"` and `lang="ar"`, and when Arabic, digits and English are mixed the order may look scrambled on screen, not in the data. Arabic comparison and sorting is done with `localeCompare(b, "ar")`. When cleaning, we will remove diacritics and normalise alef and yaa later.'),
          ex: 'const city = "القاهرة";\nconsole.log(city.length, city.slice(0, 2), city.includes("قاهر"));\nconst names = ["يوسف", "أحمد", "مريم", "بسنت"];\nconsole.log([...names].sort((a, b) => a.localeCompare(b, "ar")));', run: 'js' }
      ],
      practice: [
        B('اطبع أول حرف وآخر حرف وطول 5 أسماء عملاء.', 'Print the first character, last character and length of 5 customer names.'),
        B('من كود `ORD-CAI-2026-00153` طلّع المدينة والسنة والرقم بـ slice.', 'From the code `ORD-CAI-2026-00153` pull out the city, the year and the number with slice.'),
        B('اعمل دالة بتخفي رقم موبايل: `010******78`.', 'Write a function that masks a phone number: `010******78`.'),
        B('اكتب نص بأسطر متعددة بـ backticks فيه 3 قيم محسوبة.', 'Write a multi-line backtick string with 3 calculated values.'),
        B('أثبت إن trim مش بيغيّر النص الأصلي، وبعدين خزّن النتيجة صح.', 'Prove that trim does not change the original string, then store the result properly.'),
        B('رتّب 8 أسماء عربي بـ localeCompare.', 'Sort 8 Arabic names with localeCompare.')
      ],
      code: [
        { u: B('امتداد ملف واسمه', 'A file’s extension and name'), p: 'const file = "report-september.final.xlsx";\nconst dot = file.lastIndexOf(".");\nconst ext = file.slice(dot + 1);\nconst base = file.slice(0, dot);\nconsole.log(base, ext);' }
      ],
      words: [
        { t: 'index', m: B('رقم مكان العنصر، بيبدأ من 0', 'the position number of an item, starting at 0'), ex: 's[0]' },
        { t: 'length', m: B('عدد الحروف أو العناصر', 'the number of characters or items'), ex: '"abc".length → 3' },
        { t: 'slice', m: B('ياخد جزء من نص أو مصفوفة من غير ما يغيّر الأصل', 'takes part of a string or array without changing the original'), ex: 's.slice(-4)' },
        { t: 'immutable', m: B('مبيتغيرش بعد ما يتعمل', 'cannot change once created'), ex: 'Strings are immutable' },
        { t: 'escape character', m: B('شَرطة \\ بتدّي معنى خاص للحرف اللي بعدها', 'the \\ that gives the next character a special meaning'), ex: '"line\\nnext"' },
        { t: 'backtick', m: B('علامة ` اللي بتعمل template literal', 'the ` mark that makes a template literal'), ex: '`Hi ${name}`' },
        { t: 'interpolation', m: B('حط قيمة جوه نص بـ ${}', 'putting a value inside a string with ${}'), ex: '`Total: ${total}`' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Data types: Strings (لحد Getting a substring).', 'Data types: Strings (up to Getting a substring).') },
        { lib: 'MDN: String', what: B('Instance methods: at وslice وlastIndexOf.', 'Instance methods: at, slice and lastIndexOf.') }],
      challenge: B('اكتب دالة `parseOrderCode(code)` بتاخد كود زي `ORD-ALX-2026-00731` وتطبع المدينة والسنة ورقم الطلب كرقم (من غير الأصفار)، وترفض أي كود طوله غلط أو مش بادئ بـ ORD برسالة.', 'Write `parseOrderCode(code)` taking a code like `ORD-ALX-2026-00731` and printing the city, the year and the order number as a number (without the zeros), rejecting any code of the wrong length or not starting with ORD with a message.'),
      quiz: [
        { q: B('`"hello".slice(1, 3)`:', '`"hello".slice(1, 3)`:'), o: ['"el"', '"ell"', '"he"'], a: 0, why: B('من 1 لحد قبل 3.', 'From 1 up to before 3.') },
        { q: B('آخر حرف في s:', 'The last character of s:'), o: ['s.at(-1)', 's[-1]', 's.last()'], a: 0, why: B('s[-1] بيرجّع undefined.', 's[-1] returns undefined.') },
        { q: B('`name.trim()` من غير ما تخزّن النتيجة:', '`name.trim()` without storing the result:'), o: [B('name مبيتغيرش', 'name does not change'), B('name بيتنضّف', 'name is cleaned'), B('خطأ', 'an error')], a: 0, why: B('النصوص immutable.', 'Strings are immutable.') },
        { q: B('ترتيب أسماء عربي صح:', 'Sorting Arabic names correctly:'), o: ['a.localeCompare(b, "ar")', 'a - b', 'a > b'], a: 0, why: B('localeCompare بيعرف قواعد اللغة.', 'localeCompare knows the language rules.') }
      ] },

    { title: B('methods النصوص للتنضيف والبحث', 'String methods for cleaning and searching'),
      goal: B('تنضّف نصوص حقيقية وتدوّر فيها وتقطّعها وتجمّعها: trim وcase وincludes وsplit وjoin وreplaceAll وpadStart.', 'Clean, search, split and join real text: trim, case, includes, split, join, replaceAll and padStart.'),
      learn: [
        { h: B('trim والحروف الكبيرة والصغيرة', 'trim and letter case'),
          p: B('بيانات الناس فيها مسافات زيادة وحروف كبيرة وصغيرة متلخبطة: `" SARA@Mail.COM "`. `trim()` يشيل المسافات من الطرفين (و`trimStart`/`trimEnd` من ناحية واحدة)، و`toLowerCase()` و`toUpperCase()` يوحّدوا الحالة. الإيميل دايمًا قبل ما تقارنه أو تخزّنه: `email.trim().toLowerCase()`. التسلسل ده (method ورا method) اسمه **chaining**.',
            'People’s data has extra spaces and mixed case: `" SARA@Mail.COM "`. `trim()` removes spaces at both ends (`trimStart`/`trimEnd` for one side), and `toLowerCase()` and `toUpperCase()` unify the case. Always do this to an email before comparing or storing it: `email.trim().toLowerCase()`. Writing methods one after another like that is called **chaining**.'),
          ex: 'const raw = "  SARA.Ahmed@Mail.COM ";\nconst email = raw.trim().toLowerCase();\nconsole.log(JSON.stringify(raw), "→", email);\nconsole.log("cairo".toUpperCase(), "  x  ".trimStart() + "|");', run: 'js' },
        { h: B('البحث: includes وstartsWith وindexOf', 'Searching: includes, startsWith and indexOf'),
          p: B('`s.includes("@")` هل النص فيه كذا (true/false). `startsWith("010")` و`endsWith(".pdf")` للبداية والنهاية. `indexOf("-")` بيرجّع **مكان** أول ظهور أو `-1` لو مش موجود، و`lastIndexOf` لآخر ظهور. البحث حساس للحالة: وحّد بـ toLowerCase الأول لو محتاج.',
            '`s.includes("@")` tells whether the text contains something (true/false). `startsWith("010")` and `endsWith(".pdf")` check the start and end. `indexOf("-")` returns the **position** of the first occurrence, or `-1` if it is not there, and `lastIndexOf` the last one. Searching is case-sensitive: lower-case first when needed.'),
          ex: 'const subject = "Invoice INV-77 for Order 1203";\nconsole.log(subject.includes("INV"), subject.toLowerCase().includes("order"));\nconsole.log(subject.startsWith("Invoice"), "report.PDF".toLowerCase().endsWith(".pdf"));\nconsole.log(subject.indexOf("-"), subject.indexOf("#"));', run: 'js' },
        { h: B('split وjoin', 'split and join'),
          p: B('`split(",")` بيقطّع النص لمصفوفة عند الفاصل: سطر CSV `"Sara,Cairo,1200"` يبقى `["Sara","Cairo","1200"]`. `join(" | ")` العكس: يجمّع مصفوفة لنص. `split("")` بيقطّع لحروف، و`split("\\n")` لأسطر. ده أبسط parser هتكتبه — وهتلاقيه في n8n كل يوم.',
            '`split(",")` cuts text into an array at the separator: the CSV line `"Sara,Cairo,1200"` becomes `["Sara","Cairo","1200"]`. `join(" | ")` does the opposite: it joins an array into text. `split("")` cuts into characters and `split("\\n")` into lines. It is the simplest parser you will write — and you will see it in n8n every day.'),
          ex: 'const line = "Sara,Cairo,1200";\nconst [name, city, total] = line.split(",");\nconsole.log(name, city, Number(total) + 100);\nconst tags = ["vip", "new", "cairo"];\nconsole.log(tags.join(" | "));\nconst text = "line 1\\nline 2\\nline 3";\nconsole.log(text.split("\\n").length, "lines");', run: 'js' },
        { h: B('replace وreplaceAll', 'replace and replaceAll'),
          p: B('`replace("a", "b")` بيبدّل **أول** ظهور بس، و`replaceAll("a", "b")` كل الظهورات. لتنضيف رقم موبايل من الشرط والمسافات: `phone.replaceAll("-", "").replaceAll(" ", "")`. لما الأنماط تبقى أعقد (كل حاجة مش رقم) هنستخدم Regex في أسبوع 20: `phone.replace(/\\D/g, "")`.',
            '`replace("a", "b")` swaps only the **first** occurrence, and `replaceAll("a", "b")` every one. To clean a phone number of dashes and spaces: `phone.replaceAll("-", "").replaceAll(" ", "")`. When patterns get harder (everything that is not a digit) we will use regex in week 20: `phone.replace(/\\D/g, "")`.'),
          ex: 'const phone = "010-1234 5678";\nconsole.log(phone.replace("-", ""));\nconsole.log(phone.replaceAll("-", "").replaceAll(" ", ""));\nconsole.log(phone.replace(/\\D/g, ""));\nconsole.log("a-b-c".replaceAll("-", " → "));', run: 'js' },
        { h: B('padStart وrepeat للتنسيق', 'padStart and repeat for formatting'),
          p: B('`String(42).padStart(5, "0")` يدّي `"00042"` — مفيد لأرقام الفواتير. `padEnd` من الناحية التانية. `"=".repeat(20)` يكرّر النص. مع بعض بيعملوا تقارير نصية مترتبة في الطرفية أو في رسالة Telegram بخط ثابت.',
            '`String(42).padStart(5, "0")` gives `"00042"` — handy for invoice numbers. `padEnd` works on the other side. `"=".repeat(20)` repeats text. Together they make tidy text reports in the terminal or in a Telegram message with a fixed-width font.'),
          ex: 'for (const n of [7, 42, 1203]) console.log("INV-" + String(n).padStart(5, "0"));\nconsole.log("=".repeat(24));\nconsole.log("Item".padEnd(12) + "Qty".padStart(5) + "Sum".padStart(7));\nconsole.log("Pen".padEnd(12) + "10".padStart(5) + "300".padStart(7));', run: 'js' }
      ],
      practice: [
        B('نضّف 6 إيميلات متلخبطة (مسافات وحروف كبيرة) واطبعهم.', 'Clean 6 messy emails (spaces and capitals) and print them.'),
        B('افحص 5 أرقام موبايل: بتبدأ بـ 01 وطولها 11 بعد التنضيف؟', 'Check 5 phone numbers: do they start with 01 and have 11 digits after cleaning?'),
        B('قطّع 4 أسطر CSV لحقول واطبع كل حقل باسمه.', 'Split 4 CSV lines into fields and print each field by name.'),
        B('اعمل أرقام فواتير من 1 لـ 12 بالشكل `INV-00001`.', 'Make invoice numbers 1 to 12 in the form `INV-00001`.'),
        B('اكتب «عنوان تقرير» بـ repeat وpadEnd يبان مترتب في الطرفية.', 'Write a «report header» with repeat and padEnd that lines up in the terminal.'),
        B('خد جملة واطبع عدد كلماتها بـ split.', 'Take a sentence and print its word count with split.')
      ],
      code: [
        { u: B('تنضيف حقول عميل', 'Cleaning customer fields'), p: 'function cleanCustomer(raw) {\n  return {\n    name: raw.name.trim(),\n    email: raw.email.trim().toLowerCase(),\n    phone: raw.phone.replace(/\\D/g, ""),\n    city: raw.city.trim() || "Unknown"\n  };\n}\nconsole.log(cleanCustomer({ name: " Mona ", email: "MONA@X.COM", phone: "011-22 33 44 55", city: "" }));' }
      ],
      words: [
        { t: 'trim', m: B('يشيل المسافات من أول وآخر النص', 'removes spaces from the start and end of text'), ex: '" a ".trim() → "a"' },
        { t: 'method chaining', m: B('كتابة method ورا method على نفس القيمة', 'calling one method after another on the same value'), ex: 's.trim().toLowerCase()' },
        { t: 'separator', m: B('الحرف اللي بيفصل الأجزاء (زي الفاصلة)', 'the character that separates parts (like a comma)'), ex: 'line.split(",")' },
        { t: 'case-sensitive', m: B('بيفرّق بين الحروف الكبيرة والصغيرة', 'treats capital and small letters as different'), ex: '"A" === "a" → false' },
        { t: 'occurrence', m: B('مرة ظهور النص جوه نص تاني', 'one appearance of text inside other text'), ex: 'replaceAll changes every occurrence' },
        { t: 'parse', m: B('تحلّل نص وتطلّع منه بيانات منظمة', 'to analyse text and pull structured data out of it'), ex: 'Parse a CSV line' },
        { t: 'padding', m: B('حروف بتتضاف عشان النص يوصل لطول معين', 'characters added so text reaches a set length'), ex: 'padStart(5, "0")' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Strings: من Changing the case لآخر الفصل، والتمارين.', 'Strings: from Changing the case to the end of the chapter, with the exercises.') },
        { lib: 'MDN: String', what: B('trim وincludes وsplit وreplaceAll وpadStart.', 'trim, includes, split, replaceAll and padStart.') }],
      challenge: B('اكتب `cleanLeadLine(line)` بتاخد سطر زي `"  ahmed ALI , 010-555 12 345 , AHMED@MAIL.com "` وترجّع كائن فيه الاسم بأول حرف كبير في كل كلمة، والموبايل أرقام بس، والإيميل صغير — وتطبع تحذير لو الموبايل مش 11 رقم أو الإيميل من غير @.', 'Write `cleanLeadLine(line)` taking a line like `"  ahmed ALI , 010-555 12 345 , AHMED@MAIL.com "` and returning an object with the name capitalised word by word, the phone as digits only and the email in lower case — printing a warning when the phone is not 11 digits or the email has no @.'),
      quiz: [
        { q: B('`"a-b-c".replace("-", "")`:', '`"a-b-c".replace("-", "")`:'), o: ['"ab-c"', '"abc"', '"a-b-c"'], a: 0, why: B('replace بيبدّل أول مرة بس.', 'replace swaps only the first one.') },
        { q: B('`"x,y,z".split(",")`:', '`"x,y,z".split(",")`:'), o: ['["x","y","z"]', '"xyz"', '3'], a: 0, why: B('مصفوفة من 3 أجزاء.', 'An array of 3 parts.') },
        { q: B('`"Hello".indexOf("z")`:', '`"Hello".indexOf("z")`:'), o: ['-1', '0', 'undefined'], a: 0, why: B('-1 يعني مش موجود.', '-1 means not found.') },
        { q: B('`String(7).padStart(3, "0")`:', '`String(7).padStart(3, "0")`:'), o: ['"007"', '"700"', '"7"'], a: 0, why: B('يكمّل من الشمال.', 'It pads on the left.') }
      ] },

    { title: B('الأرقام والحساب', 'Numbers and arithmetic'),
      goal: B('تحسب صح: العمليات الأساسية والباقي والأس، وترتيب العمليات، والتقريب، ومشكلة الكسور العشرية في الفلوس.', 'Calculate correctly: the basic operations, remainder and power, operator precedence, rounding, and the decimal problem with money.'),
      learn: [
        { h: B('العمليات الأساسية والباقي والأس', 'The basic operations, remainder and power'),
          p: B('`+` و`-` و`*` و`/` زي ما تتوقع (والقسمة بتدّي كسر: `7 / 2 = 3.5`). `%` **باقي القسمة**: `17 % 5 = 2` — بيستخدم تعرف الرقم زوجي (`n % 2 === 0`)، أو كل كام صف تعمل حاجة. `**` الأس: `2 ** 10 = 1024`. و`Math.floor(7 / 2)` للقسمة الصحيحة.',
            '`+`, `-`, `*` and `/` behave as you expect (division gives decimals: `7 / 2 = 3.5`). `%` is the **remainder**: `17 % 5 = 2` — use it to know whether a number is even (`n % 2 === 0`), or to do something every few rows. `**` is power: `2 ** 10 = 1024`. And `Math.floor(7 / 2)` gives whole-number division.'),
          ex: 'console.log(7 + 2, 7 - 2, 7 * 2, 7 / 2);\nconsole.log(17 % 5, 18 % 2 === 0 ? "even" : "odd");\nconsole.log(2 ** 10, Math.floor(17 / 5));\nfor (let row = 1; row <= 7; row++) if (row % 3 === 0) console.log("save checkpoint at row", row);', run: 'js' },
        { h: B('ترتيب العمليات والأقواس', 'Operator precedence and brackets'),
          p: B('`*` و`/` و`%` قبل `+` و`-`، و`**` قبلهم كلهم: `2 + 3 * 4 = 14` مش 20. الأقواس بتغيّر الترتيب: `(2 + 3) * 4 = 20`. القاعدة العملية: لو مش متأكد، **حط أقواس** — الكود بيبقى أوضح لزميلك ولنفسك بعد شهر. أكتر غلطة: `price * 1 + vat` بدل `price * (1 + vat)`.',
            '`*`, `/` and `%` come before `+` and `-`, and `**` before all of them: `2 + 3 * 4 = 14`, not 20. Brackets change the order: `(2 + 3) * 4 = 20`. The practical rule: when unsure, **add brackets** — the code is clearer for a colleague and for you in a month. The commonest mistake: `price * 1 + vat` instead of `price * (1 + vat)`.'),
          ex: 'const price = 200, vat = 0.14;\nconsole.log(2 + 3 * 4, (2 + 3) * 4);\nconsole.log("wrong:", price * 1 + vat);\nconsole.log("right:", price * (1 + vat));\nconsole.log(2 ** 3 ** 2, (2 ** 3) ** 2);', run: 'js' },
        { h: B('مشكلة الكسور العشرية', 'The decimal problem'),
          p: B('الكمبيوتر بيخزّن الكسور بالـ binary، فبعض الكسور مش دقيقة: `0.1 + 0.2` بيدّي `0.30000000000000004`. في الفلوس ده خطر. الحلول: (1) **قرّب** الناتج النهائي لخانتين: `Math.round(x * 100) / 100`. (2) احسب بالـ **قروش** (أرقام صحيحة): 12.50 جنيه = 1250 قرش، واقسم على 100 في العرض بس. (3) متقارنش كسور بـ ===.',
            'Computers store decimals in binary, so some are not exact: `0.1 + 0.2` gives `0.30000000000000004`. With money that is dangerous. The fixes: (1) **round** the final result to two decimals: `Math.round(x * 100) / 100`. (2) Calculate in **piastres/cents** (whole numbers): EGP 12.50 = 1250 piastres, dividing by 100 only for display. (3) Never compare decimals with ===.'),
          ex: 'console.log(0.1 + 0.2, 0.1 + 0.2 === 0.3);\nconst round2 = x => Math.round(x * 100) / 100;\nconsole.log(round2(0.1 + 0.2));\nconst pricesInPiastres = [1250, 999, 3001];\nconst total = pricesInPiastres.reduce((a, b) => a + b, 0);\nconsole.log("total EGP", (total / 100).toFixed(2));', run: 'js' },
        { h: B('Math: التقريب والأقصى والعشوائي', 'Math: rounding, max and random'),
          p: B('`Math.round` لأقرب صحيح، و`Math.floor` لتحت، و`Math.ceil` لفوق (مفيد: «محتاجين كام كرتونة؟» = `Math.ceil(items / 12)`)، و`Math.trunc` يشيل الكسر. `Math.max(...)` و`Math.min(...)` و`Math.abs(x)`. `Math.random()` رقم بين 0 و1 — مش آمن لكلمات سر أو أكواد خصم سرية (استخدم `crypto.randomUUID()`).',
            '`Math.round` to the nearest whole, `Math.floor` down, `Math.ceil` up (handy: «how many boxes do we need?» = `Math.ceil(items / 12)`), and `Math.trunc` drops the decimal. `Math.max(...)`, `Math.min(...)` and `Math.abs(x)`. `Math.random()` is a number between 0 and 1 — not safe for passwords or secret coupon codes (use `crypto.randomUUID()`).'),
          ex: 'console.log(Math.round(4.5), Math.floor(4.9), Math.ceil(4.1), Math.trunc(-4.7));\nconsole.log("boxes:", Math.ceil(50 / 12));\nconsole.log(Math.max(3, 18, 7), Math.min(3, 18, 7), Math.abs(-25));\nconst dice = Math.floor(Math.random() * 6) + 1;\nconsole.log("dice", dice >= 1 && dice <= 6);\nconsole.log(typeof crypto.randomUUID());', run: 'js' },
        { h: B('النسب المئوية والخصومات', 'Percentages and discounts'),
          p: B('15% يعني `0.15`. السعر بعد خصم 15%: `price * (1 - 0.15)`. الزيادة بنسبة: `price * (1 + 0.14)`. نسبة التغيّر بين شهرين: `(now - before) / before * 100`. لما تعرض نسبة: `(x * 100).toFixed(1) + "%"`. خلي النسب في متغيرات بأسماء (`discountRate`) مش أرقام مرمية في الكود.',
            '15% means `0.15`. The price after a 15% discount: `price * (1 - 0.15)`. An increase by a rate: `price * (1 + 0.14)`. The percentage change between two months: `(now - before) / before * 100`. When you show a rate: `(x * 100).toFixed(1) + "%"`. Keep rates in named variables (`discountRate`), not bare numbers in the code.'),
          ex: 'const price = 800, discountRate = 0.15, vatRate = 0.14;\nconst afterDiscount = price * (1 - discountRate);\nconst final = afterDiscount * (1 + vatRate);\nconsole.log(afterDiscount, final.toFixed(2));\nconst sept = 42000, oct = 48300;\nconsole.log("growth", ((oct - sept) / sept * 100).toFixed(1) + "%");', run: 'js' }
      ],
      practice: [
        B('اطبع الأرقام الزوجية من 1 لـ 20 بـ `%`.', 'Print the even numbers from 1 to 20 using `%`.'),
        B('احسب «كام صفحة» لـ 137 نتيجة لو كل صفحة 20، بـ Math.ceil.', 'Work out «how many pages» for 137 results at 20 per page, with Math.ceil.'),
        B('صحّح 4 معادلات ناقصها أقواس (منها حساب الضريبة).', 'Fix 4 formulas that are missing brackets (including the VAT one).'),
        B('اجمع 5 أسعار كسور مرة عادي ومرة بالقروش وقارن.', 'Add 5 decimal prices once normally and once in piastres, and compare.'),
        B('احسب نسبة النمو بين 6 شهور متتالية.', 'Work out the growth rate across 6 consecutive months.'),
        B('اعمل دالة `round2(x)` واستخدمها في كل حسبة فلوس النهارده.', 'Write `round2(x)` and use it in every money calculation today.')
      ],
      code: [
        { u: B('فلوس بالقروش', 'Money in piastres'), p: 'const toPiastres = egp => Math.round(Number(egp) * 100);\nconst toEgp = p => (p / 100).toFixed(2);\nconst lines = ["12.50", "0.99", "100"];\nconst sum = lines.map(toPiastres).reduce((a, b) => a + b, 0);\nconsole.log(toEgp(sum), "EGP");' }
      ],
      words: [
        { t: 'operator', m: B('رمز بيعمل عملية (+ و- و* و/ و%)', 'a symbol that does an operation (+, -, *, /, %)'), ex: 'a + b' },
        { t: 'remainder', m: B('باقي القسمة (%)', 'what is left after division (%)'), ex: '17 % 5 → 2' },
        { t: 'precedence', m: B('ترتيب تنفيذ العمليات', 'the order in which operations run'), ex: '2 + 3 * 4 → 14' },
        { t: 'floating point', m: B('طريقة تخزين الكسور اللي بتعمل أخطاء صغيرة', 'the way decimals are stored, causing tiny errors'), ex: '0.1 + 0.2' },
        { t: 'round', m: B('تقريب لأقرب رقم', 'to bring to the nearest number'), ex: 'Math.round(4.6) → 5' },
        { t: 'percentage', m: B('نسبة من 100', 'a part out of 100'), ex: '0.14 → 14%' },
        { t: 'integer', m: B('رقم صحيح من غير كسر', 'a whole number with no fraction'), ex: 'Number.isInteger(5)' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Basic operators, maths وData types: Numbers (Imprecise calculations).', 'Basic operators, maths, and Data types: Numbers (Imprecise calculations).') },
        { lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 1: Numbers وArithmetic.', 'Chapter 1: Numbers and Arithmetic.') }],
      challenge: B('اكتب حاسبة «قسط شهري» بسيطة: المبلغ، ونسبة المقدم، وعدد الشهور، وفايدة ثابتة سنوية — تطبع المقدم، والمبلغ المتبقي، وإجمالي الفايدة، والقسط الشهري متقرّب لأعلى قرش (Math.ceil على القروش)، وتثبت إن مجموع الأقساط + المقدم ≥ المبلغ.', 'Write a simple «monthly instalment» calculator: the amount, the down-payment rate, the number of months and a flat yearly interest rate — printing the down payment, the remaining amount, the total interest and the monthly instalment rounded up to the piastre (Math.ceil on piastres), and proving that instalments plus down payment ≥ the amount.'),
      quiz: [
        { q: B('`10 % 4`:', '`10 % 4`:'), o: ['2', '2.5', '0'], a: 0, why: B('10 = 4×2 + 2.', '10 = 4×2 + 2.') },
        { q: B('`2 + 3 * 4`:', '`2 + 3 * 4`:'), o: ['14', '20', '24'], a: 0, why: B('الضرب الأول.', 'Multiplication first.') },
        { q: B('أحسن طريقة للفلوس:', 'The best way to handle money:'), o: [B('احسب بالقروش وقرّب في الآخر', 'work in piastres and round at the end'), B('=== على الكسور', '=== on decimals'), B('تجاهل الكسور', 'ignore the decimals')], a: 0, why: B('أرقام صحيحة مفيهاش خطأ.', 'Whole numbers have no error.') },
        { q: B('عدد الكراتين لـ 25 قطعة لو الكرتونة 12:', 'Boxes for 25 items at 12 per box:'), o: ['Math.ceil(25 / 12) = 3', 'Math.floor(25 / 12) = 2', 'Math.round(25 / 12) = 2'], a: 0, why: B('لازم تقرّب لفوق.', 'You must round up.') }
      ] },

    { title: B('المقارنة والمنطق', 'Comparison and logic'),
      goal: B('تقارن صح بـ === و<، وتجمع شروط بـ && و|| و!، وتستخدم ?? و?. و`? :` من غير ما تقع في فخاخ ==.', 'Compare correctly with === and <, combine conditions with &&, || and !, and use ??, ?. and `? :` without falling into the == traps.'),
      learn: [
        { h: B('=== و!== دايمًا', 'Always === and !=='),
          p: B('`===` بيقارن **القيمة والنوع**: `5 === "5"` false. `==` بيحوّل الأنواع الأول بقواعد غريبة: `0 == ""` true و`"1" == 1` true و`null == undefined` true. القاعدة: استخدم `===` و`!==` بس، وحوّل الأنواع بنفسك قبل المقارنة. ESLint بيعلّم على == عشان كده.',
            '`===` compares **value and type**: `5 === "5"` is false. `==` converts types first by strange rules: `0 == ""` is true, `"1" == 1` is true and `null == undefined` is true. The rule: use only `===` and `!==`, and convert types yourself before comparing. ESLint flags == for exactly this reason.'),
          ex: 'console.log(5 === "5", 5 == "5");\nconsole.log(0 == "", 0 === "");\nconsole.log(null == undefined, null === undefined);\nconst fromForm = "5";\nconsole.log(Number(fromForm) === 5);', run: 'js' },
        { h: B('أكبر وأصغر ومقارنة النصوص', 'Greater, smaller and comparing text'),
          p: B('`<` و`>` و`<=` و`>=` للأرقام عادي. مع **النصوص** بيقارن حرف حرف حسب الكود: `"10" < "9"` true (لأن "1" قبل "9")! فحوّل لأرقام الأول. ولما تقارن نصوص للترتيب أو المساواة من غير حساسية للحالة استخدم `localeCompare` أو وحّد بـ toLowerCase. التواريخ بصيغة ISO (`2026-10-03`) بتتقارن صح كنصوص.',
            '`<`, `>`, `<=` and `>=` work normally on numbers. With **strings** they compare character by character by code: `"10" < "9"` is true (because "1" comes before "9")! So convert to numbers first. When comparing text for order or equality regardless of case, use `localeCompare` or lower-case both sides. Dates in ISO form (`2026-10-03`) compare correctly as text.'),
          ex: 'console.log(10 < 9, "10" < "9", Number("10") < Number("9"));\nconsole.log("apple" < "banana", "Zebra" < "apple");\nconsole.log("2026-10-03" > "2026-09-30");\nconsole.log("Cairo".toLowerCase() === "CAIRO".toLowerCase());', run: 'js' },
        { h: B('&& و|| و!', '&&, || and !'),
          p: B('`a && b` true لو الاتنين true. `a || b` true لو واحد منهم على الأقل. `!a` العكس. JS بيقف أول ما يعرف النتيجة (**short-circuit**): في `a && b` لو a false مش بيبص على b — فتقدر تكتب `user && user.name` بأمان. وبيرجّعوا القيمة نفسها مش true/false بس: `name || "Guest"` يدّي name لو موجود وإلا "Guest".',
            '`a && b` is true when both are true. `a || b` is true when at least one is. `!a` is the opposite. JS stops as soon as it knows the result (**short-circuit**): in `a && b`, if a is false it never looks at b — so `user && user.name` is safe. And they return the value itself, not just true/false: `name || "Guest"` gives name if it is set, otherwise "Guest".'),
          ex: 'const total = 1500, isPaid = true, isBlocked = false;\nconsole.log(total > 1000 && isPaid, total > 5000 || isPaid, !isBlocked);\nconst user = null;\nconsole.log(user && user.name);\nconst name = "";\nconsole.log(name || "Guest");', run: 'js' },
        { h: B('?? و?. : البيانات الناقصة', '?? and ?. : missing data'),
          p: B('`x ?? "default"` بيدّي البديل لو x **null أو undefined بس** — عكس `||` اللي بيعتبر 0 و"" فاضيين. يعني `qty ?? 1` صح لو الكمية 0. و`order.customer?.phone` بيرجّع undefined بدل ما يقع لو customer مش موجود. الاتنين مع بعض: `order.customer?.phone ?? "no phone"` — هتكتبه كتير في n8n.',
            '`x ?? "default"` gives the fallback only when x is **null or undefined** — unlike `||`, which treats 0 and "" as empty. So `qty ?? 1` is right when the quantity is 0. And `order.customer?.phone` returns undefined instead of crashing when customer is missing. Together: `order.customer?.phone ?? "no phone"` — you will write it a lot in n8n.'),
          ex: 'const order = { qty: 0, note: "", customer: null };\nconsole.log(order.qty || 1, order.qty ?? 1);\nconsole.log(order.note || "(none)", order.note ?? "(none)");\nconsole.log(order.customer?.phone ?? "no phone");\nconsole.log(order.items?.length ?? 0);', run: 'js' },
        { h: B('الشرط في سطر: ? :', 'The one-line condition: ? :'),
          p: B('`condition ? ifTrue : ifFalse` بيرجّع قيمة من اتنين حسب الشرط: `const label = total > 1000 ? "VIP" : "normal";`. ممتاز لقيمة بسيطة جوه template literal أو expression في n8n. متكتبش أكتر من مستوى جوه بعض (`a ? b : c ? d : e`) — بيبقى صعب يتقري؛ استخدم if/else اللي هنتعلمه الأسبوع الجاي.',
            '`condition ? ifTrue : ifFalse` returns one of two values depending on the condition: `const label = total > 1000 ? "VIP" : "normal";`. Great for a simple value inside a template literal or an n8n expression. Do not nest it more than one level (`a ? b : c ? d : e`) — it gets hard to read; use the if/else we learn next week.'),
          ex: 'const totals = [400, 1200, 5600];\nfor (const t of totals) {\n  const label = t > 1000 ? "VIP" : "normal";\n  console.log(`${t} EGP → ${label}`);\n}\nconst items = 1;\nconsole.log(`${items} item${items === 1 ? "" : "s"}`);', run: 'js' }
      ],
      practice: [
        B('اكتب 8 مقارنات بـ == و=== واشرح كل نتيجة في تعليق.', 'Write 8 comparisons with == and ===, explaining each result in a comment.'),
        B('اكتب شرط «عميل مميز»: إجمالي أكبر من 5000 **و** مدفوع **و** مش محظور.', 'Write a «premium customer» rule: total over 5000 **and** paid **and** not blocked.'),
        B('اعمل كائن طلب ناقص فيه بيانات واقرا 4 حقول بأمان بـ ?. و??.', 'Make an order object with missing data and read 4 fields safely with ?. and ??.'),
        B('اكتب جملة صح للمفرد والجمع بـ ? : (item/items).', 'Write a correct singular/plural sentence with ? : (item/items).'),
        B('رتّب 5 تواريخ ISO كنصوص وتأكد إن الترتيب صح.', 'Sort 5 ISO dates as text and make sure the order is right.'),
        B('بيّن الفرق بين `||` و`??` بمثال كمية = 0.', 'Show the difference between `||` and `??` with a quantity of 0.')
      ],
      code: [
        { u: B('expression في n8n', 'An n8n expression'), p: '// inside {{ }} in an n8n field:\n// {{ $json.customer?.email?.toLowerCase() ?? "" }}\n// {{ $json.total > 1000 ? "VIP" : "normal" }}\n// {{ ($json.qty ?? 1) * $json.price }}' }
      ],
      words: [
        { t: 'strict equality', m: B('=== : بيقارن القيمة والنوع من غير تحويل', '===: compares value and type with no conversion'), ex: '5 === "5" → false' },
        { t: 'logical operator', m: B('عملية منطقية (&& و|| و!)', 'a logic operator (&&, || and !)'), ex: 'a && b' },
        { t: 'short-circuit', m: B('الوقوف بدري أول ما النتيجة تتعرف', 'stopping early once the result is known'), ex: 'user && user.name' },
        { t: 'nullish coalescing', m: B('?? : بديل لـ null وundefined بس', '??: a fallback for null and undefined only'), ex: 'qty ?? 1' },
        { t: 'optional chaining', m: B('?. : اقرا خاصية من غير ما تقع لو الأب ناقص', '?.: read a property without crashing when the parent is missing'), ex: 'order.customer?.phone' },
        { t: 'ternary operator', m: B('شرط في سطر: ? :', 'a one-line condition: ? :'), ex: 'x > 0 ? "yes" : "no"' },
        { t: 'condition', m: B('تعبير نتيجته true أو false', 'an expression whose result is true or false'), ex: 'total > 1000' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Comparisons وLogical operators وNullish coalescing operator ??.', 'Comparisons, Logical operators and Nullish coalescing operator ??.') },
        { lib: 'MDN: JavaScript Reference', what: B('Optional chaining (?.) وNullish coalescing operator (??).', 'Optional chaining (?.) and Nullish coalescing operator (??).') }],
      challenge: B('اكتب `shippingFee(order)` بتحسب مصاريف الشحن من كائن ممكن يكون ناقص: مجاني لو الإجمالي ≥ 1000 أو العميل VIP، وإلا 50 للقاهرة والجيزة و80 لغيرهم، و0 لو `order.pickup === true` — وجرّبها على 8 طلبات منهم طلبات من غير مدينة أو من غير customer.', 'Write `shippingFee(order)` computing shipping from an object that may be incomplete: free when the total ≥ 1000 or the customer is VIP, otherwise 50 for Cairo and Giza and 80 for elsewhere, and 0 when `order.pickup === true` — and test it on 8 orders, including some with no city or no customer.'),
      quiz: [
        { q: B('`0 ?? 10`:', '`0 ?? 10`:'), o: ['0', '10', 'null'], a: 0, why: B('?? بيعدّي 0.', '?? keeps 0.') },
        { q: B('`0 || 10`:', '`0 || 10`:'), o: ['10', '0', 'true'], a: 0, why: B('0 falsy.', '0 is falsy.') },
        { q: B('`"10" < "9"`:', '`"10" < "9"`:'), o: ['true', 'false', B('خطأ', 'an error')], a: 0, why: B('مقارنة حرف حرف.', 'Character by character.') },
        { q: B('`null?.name`:', '`null?.name`:'), o: ['undefined', 'TypeError', 'null'], a: 0, why: B('?. بيوقف من غير خطأ.', '?. stops without an error.') }
      ] },

    { title: B('مشروع صغير: منظّف بيانات العملاء', 'A small project: a customer-data cleaner'),
      goal: B('تجمع النصوص والأرقام والمنطق في أداة بتنضّف وتتحقق من صف بيانات عميل وتطلّع تقرير.', 'Combine strings, numbers and logic in a tool that cleans and checks a customer row and produces a report.'),
      learn: [
        { h: B('قبل الكود: القواعد مكتوبة', 'Before the code: the rules in writing'),
          p: B('أي أداة تنضيف بتبدأ بقواعد واضحة: الاسم بأول حرف كبير، والإيميل صغير وفيه @ ونقطة بعدها، والموبايل 11 رقم بادئ بـ 01، والمبلغ رقم موجب. اكتب القواعد كتعليقات الأول، وبعدين حوّل كل قاعدة لسطر كود. لو الزبون (أو مديرك) غيّر قاعدة، بتعرف تغيّرها في سطر واحد.',
            'Every cleaning tool starts with clear rules: the name capitalised, the email in lower case with an @ and a dot after it, the phone 11 digits starting with 01, and the amount a positive number. Write the rules as comments first, then turn each rule into a line of code. When the client (or your manager) changes a rule, you know which single line to change.'),
          ex: '// RULES\n// name:   trimmed, each word capitalised\n// email:  trimmed, lower case, has "@" and a "." after it\n// phone:  digits only, 11 digits, starts with "01"\n// amount: a number > 0\nconsole.log("rules written first ✓");', run: 'js' },
        { h: B('أول حرف كبير في كل كلمة', 'Capitalising each word'),
          p: B('قطّع بـ split(" ")، وشيل الكلمات الفاضية (لو فيه مسافتين)، وخلي أول حرف كبير والباقي صغير، وجمّع بـ join(" "). ده بيستخدم map وfilter اللي هنتعمّق فيهم الشهر الجاي — دلوقتي اكتبه زي ما هو وافهم كل جزء. العربي مالوش حروف كبيرة فبيعدّي زي ما هو.',
            'Split with split(" "), drop empty words (in case of double spaces), make the first letter upper case and the rest lower case, and join with join(" "). It uses map and filter, which we explore next month — for now write it as is and understand each part. Arabic has no capital letters, so it passes through unchanged.'),
          ex: 'function titleCase(text) {\n  return text.trim().split(" ").filter(w => w !== "")\n    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())\n    .join(" ");\n}\nconsole.log(titleCase("  aHMED   mohamed ali "));\nconsole.log(titleCase("منى أحمد"));', run: 'js' },
        { h: B('تحقق بسيط من الإيميل والموبايل', 'A simple email and phone check'),
          p: B('مش محتاج Regex معقد عشان تمسك 90% من الأخطاء: الإيميل فيه `@` واحدة، وفيه `.` بعدها، ومفهوش مسافات. الموبايل بعد ما تشيل كل حاجة مش رقم: طوله 11 وبادئ بـ `01`. خلي كل تحقق دالة بترجّع true/false باسم واضح (`isValidEmail`) — الكود بيتقري زي الكلام.',
            'You do not need a complex regex to catch 90% of mistakes: an email has one `@`, a `.` after it, and no spaces. A phone, after removing everything that is not a digit, is 11 long and starts with `01`. Make each check a function returning true/false with a clear name (`isValidEmail`) — the code then reads like a sentence.'),
          ex: 'const isValidEmail = e => e.split("@").length === 2 && e.indexOf(".", e.indexOf("@")) > e.indexOf("@") + 1 && !e.includes(" ");\nconst cleanPhone = p => String(p).replace(/\\D/g, "");\nconst isValidPhone = p => p.length === 11 && p.startsWith("01");\nfor (const e of ["sara@mail.com", "bad.email", "a@b", "x y@z.com"]) console.log(e, isValidEmail(e));\nconsole.log(isValidPhone(cleanPhone("010-1234-5678")), isValidPhone(cleanPhone("12345")));', run: 'js' },
        { h: B('صف واحد من الأول للآخر', 'One row from start to finish'),
          p: B('دالة `cleanRow` بتاخد الصف الخام وترجّع حاجتين: الصف المتنضّف، وقايمة **مشاكل** (فاضية لو كله تمام). الفكرة دي (البيانات + المشاكل) هي اللي هتستخدمها في n8n: الصف السليم يروح للشيت، واللي فيه مشاكل يروح لـ Telegram تراجعه. متمسحش البيانات الغلط بصمت أبدًا.',
            'A `cleanRow` function takes the raw row and returns two things: the cleaned row and a list of **problems** (empty when all is well). This idea (data + problems) is what you will use in n8n: good rows go to the sheet, rows with problems go to Telegram for review. Never drop bad data silently.'),
          ex: 'function cleanRow(raw) {\n  const problems = [];\n  const email = String(raw.email ?? "").trim().toLowerCase();\n  const phone = String(raw.phone ?? "").replace(/\\D/g, "");\n  const amount = Number(raw.amount);\n  if (!email.includes("@")) problems.push("bad email");\n  if (!(phone.length === 11 && phone.startsWith("01"))) problems.push("bad phone");\n  if (!(amount > 0)) problems.push("bad amount");\n  return { row: { email, phone, amount }, problems };\n}\nconsole.log(cleanRow({ email: " A@B.COM ", phone: "010 1111 2222", amount: "350" }));\nconsole.log(cleanRow({ email: "nope", phone: "123", amount: "free" }));', run: 'js' },
        { h: B('التقرير في الآخر', 'The report at the end'),
          p: B('بعد ما تعدّي على كل الصفوف، اطبع ملخص: كام صف سليم، وكام فيه مشاكل، وأكتر مشكلة متكررة، وإجمالي المبالغ السليمة. ده اللي مديرك عايز يشوفه، مش 500 سطر لوج. هنعمل نفس التقرير يتبعت إيميل أو Telegram بعد كام أسبوع.',
            'After going through every row, print a summary: how many rows were good, how many had problems, the most frequent problem and the total of the good amounts. That is what your manager wants to see, not 500 log lines. In a few weeks we will send the same report by email or Telegram.'),
          ex: 'const results = [\n  { problems: [] , amount: 300 }, { problems: ["bad phone"], amount: 0 },\n  { problems: [], amount: 1250 }, { problems: ["bad email", "bad phone"], amount: 0 }\n];\nconst good = results.filter(r => r.problems.length === 0);\nconst counts = {};\nfor (const r of results) for (const p of r.problems) counts[p] = (counts[p] ?? 0) + 1;\nconsole.log(`good ${good.length} / ${results.length}`);\nconsole.log("problems:", counts);\nconsole.log("total good amount:", good.reduce((s, r) => s + r.amount, 0));', run: 'js' }
      ],
      practice: [
        B('اكتب القواعد بتاعة 5 حقول من شيت حقيقي عندك كتعليقات.', 'Write the rules for 5 fields of a real sheet you have, as comments.'),
        B('اعمل `titleCase` وجرّبها على 6 أسماء فيها مسافات وحروف متلخبطة.', 'Write `titleCase` and test it on 6 names with odd spaces and mixed case.'),
        B('اعمل `isValidEmail` و`isValidPhone` وجرّب كل واحدة على 8 قيم.', 'Write `isValidEmail` and `isValidPhone` and test each on 8 values.'),
        B('اكتب `cleanRow` بترجّع الصف والمشاكل، وجرّبها على 6 صفوف.', 'Write `cleanRow` returning the row and its problems, and test it on 6 rows.'),
        B('اطبع تقرير ملخص زي اللي في الدرس لـ 10 صفوف.', 'Print a summary report like the lesson’s for 10 rows.'),
        B('خلي التقرير يطبع أول 3 صفوف فيها مشاكل بالتفصيل.', 'Make the report print the first 3 problem rows in detail.')
      ],
      code: [
        { u: B('قالب: بيانات + مشاكل', 'Template: data + problems'), p: 'function check(raw) {\n  const problems = [];\n  // clean each field, then: if (!rule) problems.push("why");\n  return { row: raw, problems };\n}' }
      ],
      words: [
        { t: 'validation', m: B('التحقق إن البيانات مطابقة للقواعد', 'checking that data follows the rules'), ex: 'isValidEmail(email)' },
        { t: 'data cleaning', m: B('تنضيف البيانات وتوحيد شكلها', 'tidying data and making its format consistent'), ex: 'email.trim().toLowerCase()' },
        { t: 'rule', m: B('شرط لازم البيانات تحققه', 'a condition the data must meet'), ex: 'phone has 11 digits' },
        { t: 'edge case', m: B('حالة نادرة أو متطرفة لازم الكود يتعامل معاها', 'a rare or extreme case the code must handle'), ex: 'an empty name' },
        { t: 'summary', m: B('ملخص قصير بأهم الأرقام', 'a short report of the key numbers'), ex: 'good 8 / 10' },
        { t: 'helper function', m: B('دالة صغيرة بتعمل حاجة واحدة وبتساعد دوال تانية', 'a small function doing one job to help others'), ex: 'cleanPhone(p)' },
        { t: 'silently', m: B('من غير ما حد يعرف أو يتنبّه', 'without anyone knowing or being told'), ex: 'Never drop bad rows silently' }
      ],
      read: [{ lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 2: Program Structure (كله) والتمارين.', 'Chapter 2: Program Structure (all of it) and the exercises.') },
        { lib: 'MDN: String', what: B('اقرا toUpperCase وlocaleCompare ونماذجهم.', 'Read toUpperCase and localeCompare and their examples.') }],
      challenge: B('اعمل نسخة صفحة من المنظّف: textarea تحط فيها أسطر CSV (اسم,إيميل,موبايل,مبلغ)، وزرار بيعرض جدول الصفوف السليمة، وقايمة الصفوف اللي فيها مشاكل بسببها، وسطر ملخص — كله بـ textContent.', 'Build a page version of the cleaner: a textarea for CSV lines (name,email,phone,amount), and a button that shows a table of good rows, a list of problem rows with their reasons, and a summary line — all with textContent.'),
      quiz: [
        { q: B('أحسن حاجة تعملها في صف فيه مشاكل:', 'The best thing to do with a problem row:'), o: [B('تسجّله وتبعته للمراجعة', 'record it and send it for review'), B('تمسحه بصمت', 'drop it silently'), B('تخترع بيانات', 'invent data')], a: 0, why: B('متخسرش بيانات من غير ما حد يعرف.', 'Never lose data without anyone knowing.') },
        { q: B('`"0101234567".length === 11`:', '`"0101234567".length === 11`:'), o: ['false', 'true', B('خطأ', 'an error')], a: 0, why: B('10 أرقام بس.', 'Only 10 digits.') },
        { q: B('اسم دالة بترجّع true/false للإيميل:', 'A name for a function returning true/false for an email:'), o: ['isValidEmail', 'email2', 'doIt'], a: 0, why: B('is... بيقول إنها سؤال.', 'is... says it is a question.') },
        { q: B('تكتب القواعد:', 'You write the rules:'), o: [B('قبل الكود كتعليقات', 'before the code, as comments'), B('بعد ما الكود يخلص', 'after the code is done'), B('مش محتاجها', 'you do not need them')], a: 0, why: B('القاعدة تتحول لسطر كود.', 'Each rule becomes a line of code.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تراجع النصوص والأرقام والمنطق، وتسلّم أداة تنضيف كاملة، وتعدّي اختبار الأسبوع.', 'Review strings, numbers and logic, deliver a complete cleaning tool, and pass the weekly test.'),
      review: [
        B('النصوص: 3 أنواع علامات، والـ backticks فيها `${}` وأسطر متعددة.', 'Strings: three kinds of quotes; backticks allow `${}` and several lines.'),
        B('الفهرس بيبدأ من 0، و`at(-1)` لآخر حرف، و`slice` للأجزاء.', 'Indexes start at 0, `at(-1)` gives the last character, and `slice` cuts pieces.'),
        B('النص immutable: خزّن نتيجة أي method.', 'Strings are immutable: store the result of any method.'),
        B('trim وtoLowerCase وincludes وsplit/join وreplaceAll وpadStart.', 'trim, toLowerCase, includes, split/join, replaceAll and padStart.'),
        B('الكسور مش دقيقة: قرّب أو احسب بالقروش.', 'Decimals are not exact: round, or work in piastres.'),
        B('`%` للباقي و`**` للأس وMath.round/floor/ceil.', '`%` for remainder, `**` for power, and Math.round/floor/ceil.'),
        B('=== دايمًا، و&& و|| بيرجّعوا قيم، و?? غير ||.', 'Always ===; && and || return values; ?? is not ||.'),
        B('?. للبيانات الناقصة، و? : لقيمة بسيطة من اتنين.', '?. for missing data, and ? : for a simple choice between two values.')
      ],
      project: B('**مشروع الأسبوع: منظّف قايمة عملاء.** اكتب سكربت Node `clean-leads.mjs` فيه مصفوفة 15 عميل خام (اكتبها انت بأخطاء حقيقية: مسافات، حروف كبيرة، موبايلات بشرط، إيميلات ناقصة، مبالغ نصوص).\n1. دالة لكل حقل: `titleCase` و`cleanEmail` و`cleanPhone` و`toAmount`.\n2. `checkRow` بترجّع `{ row, problems }`.\n3. اطبع جدول مترتب بالصفوف السليمة (padEnd/padStart) والمبالغ بخانتين.\n4. اطبع الصفوف اللي فيها مشاكل بالسبب.\n5. سطر ملخص: سليم X من Y، وأكتر مشكلة، وإجمالي المبالغ.\nكل القواعد مكتوبة كتعليقات فوق، وكل الفلوس متقرّبة صح.',
        '**Weekly project: a customer-list cleaner.** Write a Node script `clean-leads.mjs` holding an array of 15 raw customers (write them yourself with real mistakes: spaces, capitals, phones with dashes, missing emails, amounts as text).\n1. A function per field: `titleCase`, `cleanEmail`, `cleanPhone` and `toAmount`.\n2. `checkRow` returning `{ row, problems }`.\n3. Print a lined-up table of the good rows (padEnd/padStart) with amounts to two decimals.\n4. Print the problem rows with their reasons.\n5. A summary line: good X of Y, the most common problem and the total amount.\nAll rules written as comments at the top, and all money rounded correctly.'),
      test: [
        { q: B('`"INV-2026".slice(4)`:', '`"INV-2026".slice(4)`:'), o: ['"2026"', '"INV-"', '"-2026"'], a: 0, why: B('من الفهرس 4 للآخر.', 'From index 4 to the end.') },
        { q: B('`"  hi ".trim().length`:', '`"  hi ".trim().length`:'), o: ['2', '5', '4'], a: 0, why: B('"hi" بس.', 'Just "hi".') },
        { q: B('`"a,b".split(",").length`:', '`"a,b".split(",").length`:'), o: ['2', '3', '1'], a: 0, why: B('جزئين.', 'Two parts.') },
        { q: B('`15 % 4`:', '`15 % 4`:'), o: ['3', '3.75', '4'], a: 0, why: B('15 = 4×3 + 3.', '15 = 4×3 + 3.') },
        { q: B('`(0.1 + 0.2).toFixed(2)`:', '`(0.1 + 0.2).toFixed(2)`:'), o: ['"0.30"', '0.30000000000000004', '"0.3"'], a: 0, why: B('التقريب بيصلّح العرض.', 'Rounding fixes the display.') },
        { q: B('`price * (1 - 0.2)` يعني:', '`price * (1 - 0.2)` means:'), o: [B('السعر بعد خصم 20%', 'the price after a 20% discount'), B('السعر بعد زيادة 20%', 'the price after a 20% increase'), B('20% من السعر', '20% of the price')], a: 0, why: B('80% من السعر.', '80% of the price.') },
        { q: B('`"" ?? "x"`:', '`"" ?? "x"`:'), o: ['""', '"x"', 'null'], a: 0, why: B('?? بيعدّي النص الفاضي.', '?? keeps the empty string.') },
        { q: B('`"" || "x"`:', '`"" || "x"`:'), o: ['"x"', '""', 'false'], a: 0, why: B('النص الفاضي falsy.', 'The empty string is falsy.') },
        { q: B('`1 === "1"`:', '`1 === "1"`:'), o: ['false', 'true', 'TypeError'], a: 0, why: B('نوعين مختلفين.', 'Different types.') },
        { q: B('قراية آمنة لـ `order.customer.phone` لو customer ممكن يبقى ناقص:', 'Safely reading `order.customer.phone` when customer may be missing:'), o: ['order.customer?.phone', 'order.customer.phone!', 'order?customer.phone'], a: 0, why: B('?. بيوقف من غير خطأ.', '?. stops without an error.') },
        { q: B('`String(5).padStart(3, "0")`:', '`String(5).padStart(3, "0")`:'), o: ['"005"', '"500"', '"5"'], a: 0, why: B('يكمّل من الشمال.', 'It pads on the left.') },
        { q: B('`Math.ceil(2.1)`:', '`Math.ceil(2.1)`:'), o: ['3', '2', '2.1'], a: 0, why: B('لفوق دايمًا.', 'Always up.') },
        { q: B('`5 > 3 && 2 > 4`:', '`5 > 3 && 2 > 4`:'), o: ['false', 'true', '2'], a: 0, why: B('التاني false.', 'The second is false.') }
      ] }
  ]
};
