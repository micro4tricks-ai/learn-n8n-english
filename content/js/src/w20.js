// JavaScript week 20 — regex, text processing and the month 5 project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('Regex ومعالجة النصوص ومشروع الشهر', 'Regex, text processing and the month project'),
  goal: B('تستخرج وتنضّف وتطابق النصوص: regex من الأساسيات للـ named groups والـ lookarounds، والعربي (التشكيل والهمزات والأرقام الهندية والترتيب)، واستخراج تليفونات ومبالغ وتواريخ بأمان، والمطابقة التقريبية والـ templates — وتسلّم مشروع الشهر الخامس.',
          'Extract, clean and match text: regex from the basics to named groups and lookarounds, Arabic text (diacritics, hamzas, Eastern digits and sorting), safe extraction of phones, amounts and dates, fuzzy matching and templates — and deliver the fifth month’s project.'),
  days: [
    { title: B('أساسيات regex', 'Regex basics'),
      goal: B('تقرا وتكتب أنماط بسيطة وتعرف الـ flags.', 'Read and write simple patterns and know the flags.'),
      learn: [
        L(B('النمط', 'The pattern'),
          B('**regex** (**regular expression**) = نمط بيوصف نص. **character class** `[0-9]` أو `\\d` (رقم)، `\\w` (حرف/رقم/_)، `\\s` (مسافة)، `.` (أي حرف). **quantifier** بيقول كام مرة: `+` (1 أو أكتر)، `*` (0 أو أكتر)، `?` (اختياري)، `{3}` و`{2,4}`. و`^` و`$` = أول وآخر النص.', 'A **regex** (**regular expression**) = a pattern describing text. A **character class** `[0-9]` or `\\d` (a digit), `\\w` (letter/digit/_), `\\s` (space), `.` (any character). A **quantifier** says how many: `+` (1 or more), `*` (0 or more), `?` (optional), `{3}` and `{2,4}`. And `^` and `$` = the start and end of the text.'),
          'const orderNo = /^ORD-\\d{4}-\\d{3,}$/;\nfor (const s of ["ORD-2026-101", "ORD-2026-7", "ord-2026-101", "ORD-2026-101 "]) console.log(JSON.stringify(s).padEnd(18), orderNo.test(s));\nconsole.log("A1-b2_c3 !".match(/\\w/g).join(""));\nconsole.log("total:   250.50 EGP".replace(/\\s+/g, " "));', J),
        L(B('الـ flags', 'The flags'),
          B('**global flag** `g`: كل التطابقات مش أول واحد بس. `i`: من غير فرق كبير/صغير. `m`: `^` و`$` لكل سطر. **unicode flag** `u`: يفهم الحروف كاملة (إيموجي، `\\p{…}`) — استخدمه دايمًا مع العربي. و**matchall** بيرجّع كل التطابقات بتفاصيلها.', 'The **global flag** `g`: every match, not only the first. `i`: case-insensitive. `m`: `^` and `$` per line. The **unicode flag** `u`: understands whole characters (emoji, `\\p{…}`) — always use it with Arabic. And **matchall** returns every match with its details.'),
          'const text = "Order ord-7 shipped.\\nORD-12 pending.\\nOrd-9 paid.";\nconsole.log(text.match(/ord-\\d+/gi));\nconsole.log(text.match(/^ORD-\\d+/gm));\nfor (const m of text.matchAll(/ord-(\\d+) (\\w+)/gi)) console.log(`#${m[1]} → ${m[2]} at index ${m.index}`);\nconsole.log("😀".length, [..."😀"].length, /^.$/.test("😀"), /^.$/u.test("😀"));', J),
        L(B('test وmatch وreplace وsplit', 'test, match, replace and split'),
          B('`re.test(s)` = فيه ولا لأ؟ `s.match(re)` = هات التطابق. `s.replace(re, x)` (مع g = كله، أو `replaceAll`) = استبدل. `s.split(re)` = قسّم بنمط. ودالة استبدال `(m) => …` بتحسب البديل لكل تطابق — قوية جدًا في التنضيف.', '`re.test(s)` = is it there? `s.match(re)` = get the match. `s.replace(re, x)` (with g = all, or `replaceAll`) = replace. `s.split(re)` = split by a pattern. And a replacer function `(m) => …` computes the replacement per match — very powerful for cleaning.'),
          'const raw = "Notebook ; Pen,Bag|  Ruler";\nconsole.log(raw.split(/\\s*[;,|]\\s*/));\nconst prices = "Pen 12.5, Bag 650, Book 45";\nconsole.log(prices.replace(/\\d+(\\.\\d+)?/g, n => (Number(n) * 1.14).toFixed(2)));\nconsole.log("hello world from n8n".replace(/\\b\\w/g, c => c.toUpperCase()));', J)
      ],
      practice: [
        B('اكتب نمط لكود منتج زي AB-1234.', 'Write a pattern for a product code such as AB-1234.'),
        B('استخرج كل الأرقام من جملة بـ g.', 'Extract every number from a sentence with g.'),
        B('اعمل replace بدالة بتضيف ضريبة لكل سعر.', 'Use replace with a function adding tax to each price.'),
        B('جرّب الأنماط على regex101.com.', 'Try the patterns on regex101.com.')
      ],
      words: [
        W('regex', 'نمط بحث في النصوص', 'a text search pattern', 'A regex finds every order number.'),
        W('regular expression', 'الاسم الكامل لـ regex', 'the full name of a regex', 'Write a regular expression for phones.'),
        W('character class', 'مجموعة حروف مسموحة زي [0-9]', 'a set of allowed characters such as [0-9]', '\\d is a character class for digits.'),
        W('quantifier', 'رمز بيحدد عدد التكرار', 'a symbol saying how many times', 'The quantifier {4} means exactly four.'),
        W('global flag', 'الـ flag g لكل التطابقات', 'the g flag for all matches', 'Without the global flag only one is replaced.'),
        W('unicode flag', 'الـ flag u لفهم الحروف كاملة', 'the u flag for whole characters', 'Use the unicode flag with Arabic.'),
        W('matchall', 'دالة بترجّع كل التطابقات بالتفاصيل', 'a method returning every match with details', 'matchAll gives each group and index.')
      ],
      read: [{ lib: 'MDN: Regular expressions', what: B('اقرا Writing a regular expression pattern.', 'Read Writing a regular expression pattern.') }, { t: 'regex101', url: 'https://regex101.com/', what: B('جرّب واشرح أي نمط (اختار ECMAScript).', 'Test and explain any pattern (choose ECMAScript).') }],
      challenge: B('اعمل صفحة «مختبر regex» صغيرة: خانة نمط، flags، نص، وتلوين التطابقات وعرض الـ groups — باستخدام matchAll.', 'Build a small «regex lab» page: a pattern box, flags, a text, highlighting the matches and showing the groups — using matchAll.'),
      quiz: [
        Q(B('\\d{3,}:', '\\d{3,}:'), [['3 أرقام أو أكتر', '3 or more digits'], ['3 بالظبط', 'exactly 3'], ['أقل من 3', 'fewer than 3']], 0, B('مفتوح.', 'Open-ended.')),
        Q(B('replace من غير g:', 'replace without g:'), [['أول تطابق بس', 'only the first match'], ['الكل', 'all'], ['ولا حاجة', 'none']], 0, B('أو replaceAll.', 'Or replaceAll.')),
        Q(B('مع نص عربي استخدم:', 'With Arabic text use:'), ['u', 'm', 'y'], 0, B('unicode.', 'Unicode.'))
      ] },

    { title: B('المجموعات والـ lookarounds', 'Groups and lookarounds'),
      goal: B('تستخرج أجزاء محددة من النص بأسماء واضحة.', 'Extract specific parts of text with clear names.'),
      learn: [
        L(B('capture وnamed groups', 'Capture and named groups'),
          B('`( )` = **capture group**: بيحفظ الجزء ده لوحده (`m[1]`). وأحسن منه **named group** `(?<total>…)` ← `m.groups.total` — الكود بيتقري ومبيبوظش لو ضفت group. و`(?: )` مجموعة من غير حفظ. و**alternation** `a|b` = ده أو ده.', '`( )` = a **capture group**: it keeps that part separately (`m[1]`). Better still, a **named group** `(?<total>…)` → `m.groups.total` — the code reads well and does not break when you add a group. `(?: )` groups without capturing. And **alternation** `a|b` = this or that.'),
          'const email = `Hi team,\nOrder #1042 for Sara — total 1,250.50 EGP, pay by 2026-10-15.\nOrder #1043 for Omar — total 90 EGP, pay by 2026-10-20.`;\nconst re = /Order #(?<id>\\d+) for (?<name>[^—]+?) — total (?<total>[\\d,]+(?:\\.\\d+)?) (?<cur>EGP|SAR|USD), pay by (?<due>\\d{4}-\\d{2}-\\d{2})/g;\nconst orders = [...email.matchAll(re)].map(m => ({ ...m.groups, id: Number(m.groups.id), total: Number(m.groups.total.replace(/,/g, "")) }));\nconsole.log(orders);', J),
        L(B('greedy وlazy', 'Greedy and lazy'),
          B('الـ quantifiers **greedy** بطبعها: `.*` بتاخد أكبر حتة ممكنة. ضيف `?` تبقى **lazy** (`.*?`): أصغر حتة. ده الفرق بين إنك تمسك `<b>` واحدة ولا من أول `<b>` لآخر `</b>` في السطر.', 'Quantifiers are **greedy** by nature: `.*` takes the biggest piece possible. Add `?` to make it **lazy** (`.*?`): the smallest piece. That is the difference between catching one `<b>` or everything from the first `<b>` to the last `</b>` on the line.'),
          'const s = "<b>Sara</b> ordered <b>2 notebooks</b>";\nconsole.log("greedy:", s.match(/<b>(.*)<\\/b>/)[1]);\nconsole.log("lazy:  ", s.match(/<b>(.*?)<\\/b>/)[1]);\nconsole.log("all:   ", [...s.matchAll(/<b>(.*?)<\\/b>/g)].map(m => m[1]));', J),
        L(B('lookahead وlookbehind', 'Lookahead and lookbehind'),
          B('**lookahead** `(?=…)` = «متبوع بـ» من غير ما ياخده، و`(?!…)` = «مش متبوع بـ». **lookbehind** `(?<=…)` = «مسبوق بـ». مفيدين للاستخراج الدقيق (الرقم اللي قبل EGP بس) ولتنسيق الأرقام. و**word boundary** `\\b` = حدود كلمة.', 'A **lookahead** `(?=…)` = «followed by» without taking it, and `(?!…)` = «not followed by». A **lookbehind** `(?<=…)` = «preceded by». Useful for precise extraction (only the number before EGP) and for formatting numbers. And a **word boundary** `\\b` = the edge of a word.'),
          'const t = "Paid 250 EGP, shipping 30 USD, ref 9981";\nconsole.log(t.match(/\\d+(?= EGP)/g));                  // numbers followed by EGP\nconsole.log(t.match(/(?<=ref )\\d+/)[0]);               // the number after "ref "\nconsole.log("1234567.891".replace(/\\B(?=(\\d{3})+(?!\\d))/g, ","));   // thousands separators\nconsole.log("cat category concat".match(/\\bcat\\b/g));', J)
      ],
      practice: [
        B('استخرج من إيميل: رقم الطلب والاسم والمبلغ بـ named groups.', 'Extract the order number, name and amount from an email with named groups.'),
        B('قارن .* و.*? على نص HTML.', 'Compare .* and .*? on HTML text.'),
        B('استخرج الأرقام اللي قبل SAR بس.', 'Extract only the numbers before SAR.'),
        B('ضيف فواصل آلاف لرقم بـ lookahead.', 'Add thousands separators with a lookahead.')
      ],
      words: [
        W('capture group', 'جزء من النمط بيتحفظ لوحده', 'a part of the pattern kept separately', 'The capture group holds the id.'),
        W('named group', 'مجموعة ليها اسم (?<name>)', 'a group with a name (?<name>)', 'Read m.groups.total from the named group.'),
        W('alternation', 'اختيار بين بدائل بـ |', 'choosing between options with |', 'EGP|SAR is an alternation.'),
        W('greedy', 'بياخد أكبر حتة ممكنة', 'taking the biggest possible piece', '.* is greedy.'),
        W('lazy', 'بياخد أصغر حتة ممكنة', 'taking the smallest possible piece', '.*? is lazy.'),
        W('lookahead', 'شرط على اللي بعد من غير أخده', 'a condition on what follows, without taking it', 'A lookahead finds numbers before EGP.'),
        W('lookbehind', 'شرط على اللي قبل', 'a condition on what comes before', 'The lookbehind matches after "ref ".'),
        W('word boundary', 'حدود الكلمة \\b', 'the edge of a word, \\b', 'Use a word boundary to match "cat" alone.')
      ],
      read: [{ t: 'javascript.info: Regular expressions', url: 'https://javascript.info/regular-expressions', what: B('اقرا Capturing groups وLookahead and lookbehind.', 'Read Capturing groups and Lookahead and lookbehind.') }],
      challenge: B('اكتب parseOrderEmail(text) بيستخرج كل الطلبات من إيميل عميل (رقم، صنف، كمية، سعر، عملة، تاريخ) بـ named groups، ويرجّع اللي فشل يتقري في قايمة منفصلة — وجرّبه على 5 إيميلات بأشكال مختلفة.', 'Write parseOrderEmail(text) extracting every order from a customer email (number, item, quantity, price, currency, date) with named groups, returning unparsed lines in a separate list — and test it on 5 differently written emails.'),
      quiz: [
        Q(B('m.groups.total جاي من:', 'm.groups.total comes from:'), ['(?<total>…)', '(?:…)', '(?=…)'], 0, B('named group.', 'A named group.')),
        Q(B('.*? :', '.*?:'), ['lazy', 'greedy', B('غلط', 'invalid')], 0, B('أصغر.', 'Smallest.')),
        Q(B('\\d+(?= EGP) بيرجّع:', '\\d+(?= EGP) returns:'), [['الرقم بس', 'only the number'], ['الرقم وEGP', 'the number and EGP'], ['EGP', 'EGP']], 0, B('lookahead مبياخدش.', 'A lookahead takes nothing.'))
      ] },

    { title: B('النص العربي', 'Arabic text'),
      goal: B('تنضّف وتبحث وترتّب العربي صح.', 'Clean, search and sort Arabic correctly.'),
      learn: [
        L(B('التطبيع للبحث', 'Normalising for search'),
          B('«أحمد» و«احمد» و«أَحْمَد» و«احمـــد» نفس الاسم للإنسان ومختلفين للكمبيوتر. **normalization** للبحث والمطابقة: شيل **tashkeel** (التشكيل `\\u064B-\\u065F`)، وشيل **tatweel** (ـ)، ووحّد الهمزات (أ إ آ ← ا)، وى ← ي، وة ← ه. خزّن الأصل للعرض، والنسخة المطبّعة للبحث.', '`أحمد`, `احمد`, `أَحْمَد` and `احمـــد` are the same name to a person and different to a computer. **normalization** for search and matching: remove **tashkeel** (diacritics `\\u064B-\\u065F`), remove the **tatweel** (`ـ`), unify the hamzas (`أ إ آ → ا`), `ى → ي`, and `ة → ه`. Store the original for display and the normalised copy for search.'),
          'function normalizeAr(s) {\n  return s.normalize("NFC")\n    .replace(/[\\u064B-\\u065F\\u0670]/g, "")   // tashkeel\n    .replace(/\\u0640/g, "")                   // tatweel\n    .replace(/[إأآٱ]/g, "ا")\n    .replace(/ى/g, "ي")\n    .replace(/ة/g, "ه")\n    .replace(/\\s+/g, " ").trim();\n}\nconst names = ["أَحْمَد", "احمـــد", "إحمد", "مَكَّة", "مكه", "مصطفى", "مصطفي"];\nconsole.log(names.map(normalizeAr));\nconst search = (list, q) => list.filter(n => normalizeAr(n).includes(normalizeAr(q)));\nconsole.log(search(["أحمد علي", "سارة", "محمد احمد"], "احمد"));', J),
        L(B('الأرقام الهندية', 'Eastern Arabic digits'),
          B('العملاء بيكتبوا ٠١٢٣٤٥٦٧٨٩ (**arabic-indic digits**) أو ۰۱۲ (الفارسية) — و`Number("٢٥٠")` = NaN! حوّلها لأرقام لاتينية قبل أي حساب أو تحقق. وفي العرض، `Intl.NumberFormat("ar-EG")` بيرجّعها هندي لو عايز.', 'Customers type `٠١٢٣٤٥٦٧٨٩` (**arabic-indic digits**) or `۰۱۲` (Persian) — and `Number("٢٥٠")` = NaN! Convert them to Latin digits before any calculation or validation. For display, `Intl.NumberFormat("ar-EG")` turns them back to Eastern digits if you want.'),
          'const toLatinDigits = s => s.replace(/[\\u0660-\\u0669\\u06F0-\\u06F9]/g, d => String(d.charCodeAt(0) & 0xF));\nconst input = "الكمية ٣ والسعر ٢٥٠٫٥٠ وتليفوني ٠١٠٠١٢٣٤٥٦٧";\nconst latin = toLatinDigits(input).replace(/٫/g, ".");\nconsole.log(latin);\nconsole.log(Number("٢٥٠"), Number(toLatinDigits("٢٥٠")));\nconsole.log(new Intl.NumberFormat("ar-EG").format(1250.5), new Intl.NumberFormat("ar-SA", { numberingSystem: "latn" }).format(1250.5));', J),
        L(B('الترتيب والكلمات', 'Sorting and words'),
          B('`sort()` العادي بيرتب بأكواد الحروف — غلط للعربي والأسماء. **intl.collator** بيرتب حسب قواعد اللغة. و**intl.segmenter** بيقسّم النص لكلمات أو جمل صح (أحسن من split(" ") مع علامات الترقيم) — مفيد لعدّ الكلمات و**tokenize**.', 'Plain `sort()` orders by character codes — wrong for Arabic and names. **intl.collator** sorts by the language’s rules. And **intl.segmenter** splits text into words or sentences properly (better than split(" ") with punctuation) — handy for word counts and to **tokenize**.'),
          'const names = ["يوسف", "أحمد", "إبراهيم", "آمنة", "بسمة", "Zoe", "adam"];\nconsole.log([...names].sort().join("، "));\nconsole.log([...names].sort(new Intl.Collator("ar").compare).join("، "));\nconst seg = new Intl.Segmenter("ar", { granularity: "word" });\nconst text = "الطلب وصل! شكرًا جزيلًا، الخدمة ممتازة.";\nconst words = [...seg.segment(text)].filter(s => s.isWordLike).map(s => s.segment);\nconsole.log(words.length, words);', J)
      ],
      practice: [
        B('طبّق normalizeAr على قايمة عملاء وابحث فيها.', 'Apply normalizeAr to a customer list and search it.'),
        B('حوّل أرقام هندية في رسالة واتساب لأرقام.', 'Convert Eastern digits in a WhatsApp message to numbers.'),
        B('رتّب 20 اسم عربي بـ Collator.', 'Sort 20 Arabic names with Collator.'),
        B('عدّ كلمات تعليقات العملاء بـ Segmenter.', 'Count words in customer comments with Segmenter.')
      ],
      words: [
        W('normalization', 'توحيد أشكال النص للمقارنة', 'unifying text forms for comparison', 'Normalization makes أحمد equal احمد.'),
        W('tashkeel', 'علامات التشكيل العربية', 'Arabic diacritic marks', 'Strip tashkeel before searching.'),
        W('tatweel', 'حرف المد ـ في الكلام', 'the Arabic stretching character `ـ`', 'Remove the tatweel from names.'),
        W('arabic-indic digits', 'الأرقام ٠١٢٣', 'the digits `٠١٢٣`', 'Convert Arabic-Indic digits before Number().'),
        W('intl.collator', 'أداة ترتيب نصوص حسب اللغة', 'a tool for sorting text by language rules', 'Intl.Collator sorts Arabic names.'),
        W('intl.segmenter', 'أداة تقسيم النص لكلمات وجمل', 'a tool splitting text into words and sentences', 'Intl.Segmenter counts the words.'),
        W('tokenize', 'تقسيم النص لوحدات', 'to split text into units', 'Tokenize the review before counting.')
      ],
      read: [{ lib: 'MDN: Intl', what: B('اقرا Collator وSegmenter.', 'Read Collator and Segmenter.') }, { t: 'Unicode: Arabic block chart', url: 'https://www.unicode.org/charts/PDF/U0600.pdf', what: B('بص على أماكن التشكيل والأرقام.', 'Look at where diacritics and digits sit.') }],
      challenge: B('اعمل موديول `arabic.mjs`: normalizeAr، وtoLatinDigits، وsortAr، وwordCount، وsearchAr — بـ 15 اختبار console.assert، واستخدمه في بحث فورم العملاء.', 'Write an `arabic.mjs` module: normalizeAr, toLatinDigits, sortAr, wordCount and searchAr — with 15 console.assert checks, and use it in the customer form search.'),
      quiz: [
        Q(B('Number("٢٥٠"):', '`Number("٢٥٠")`:'), ['NaN', '250', '0'], 0, B('حوّل الأول.', 'Convert first.')),
        Q(B('ترتيب أسماء عربي:', 'Sorting Arabic names:'), ['Intl.Collator("ar")', 'sort()', 'reverse()'], 0, B('قواعد اللغة.', 'Language rules.')),
        Q(B('النسخة المطبّعة بتستخدم في:', 'The normalised copy is used for:'), [['البحث والمطابقة', 'search and matching'], ['العرض للعميل', 'display to the customer'], ['الطباعة', 'printing']], 0, B('الأصل للعرض.', 'The original for display.'))
      ] },

    { title: B('الاستخراج والتحقق بأمان', 'Safe extraction and validation'),
      goal: B('تستخرج تليفونات ومبالغ وتواريخ من غير ما تقع في فخاخ regex.', 'Extract phones, amounts and dates without falling into regex traps.'),
      learn: [
        L(B('تليفونات وإيميلات', 'Phones and emails'),
          B('للتليفونات: طبّع الأول (أرقام لاتيني، شيل المسافات والشرط)، وبعدين نمط لكل دولة، ورجّع الصيغة الدولية (`+20…`). للإيميل: نمط بسيط معقول كفاية — التحقق الحقيقي إنك تبعت رسالة. والتحقق (الخانة كلها) غير الاستخراج (جوه نص طويل): `^…$` في الأول بس.', 'For phones: normalise first (Latin digits, remove spaces and dashes), then one pattern per country, and return the international form (`+20…`). For email: a simple reasonable pattern is enough — real validation is sending a message. And validation (the whole field) differs from extraction (inside long text): `^…$` only in the first.'),
          'const toLatin = s => s.replace(/[\\u0660-\\u0669]/g, d => String(d.charCodeAt(0) - 0x660));\nfunction normalizePhone(raw) {\n  const d = toLatin(raw).replace(/[\\s\\-().]/g, "");\n  let m;\n  if ((m = d.match(/^(?:\\+?20|0020|0)?(1[0125]\\d{8})$/))) return "+20" + m[1];     // Egypt mobile\n  if ((m = d.match(/^(?:\\+?966|00966|0)?(5\\d{8})$/))) return "+966" + m[1];      // Saudi mobile\n  return null;\n}\nfor (const p of ["0100 123 4567", "+20 10-0123-4567", "٠١٠٠١٢٣٤٥٦٧", "0551234567", "+966 55 123 4567", "12345"]) console.log(p.padEnd(18), "→", normalizePhone(p));\nconst text = "Call me on 01001234567 or mail sara@example.com, or omar@shop.co";\nconsole.log(text.match(/[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+/g));', J),
        L(B('مبالغ وتواريخ', 'Amounts and dates'),
          B('المبالغ بتيجي بأشكال كتير: `1,250.50` و`1.250,50` و`1250 جنيه`. التواريخ: `15/10/2026` (يوم/شهر في مصر والسعودية!) و`2026-10-15`. استخرج بـ named groups، وحوّل لصيغة واحدة (رقم، ISO)، ولو مش متأكد من الصيغة — ارفض بدل ما تخمّن غلط.', 'Amounts come in many forms: `1,250.50`, `1.250,50`, `1250 pounds`. Dates: `15/10/2026` (day/month in Egypt and Saudi!) and `2026-10-15`. Extract with named groups, convert to one form (a number, ISO), and if the format is uncertain — reject instead of guessing wrong.'),
          'function parseAmount(s) {\n  const m = s.match(/(?<num>\\d{1,3}(?:[.,\\s]\\d{3})*(?:[.,]\\d{1,2})?|\\d+(?:[.,]\\d{1,2})?)/);\n  if (!m) return null;\n  let n = m.groups.num.replace(/\\s/g, "");\n  const lastSep = Math.max(n.lastIndexOf("."), n.lastIndexOf(","));\n  if (lastSep > -1 && n.length - lastSep - 1 <= 2) n = n.slice(0, lastSep).replace(/[.,]/g, "") + "." + n.slice(lastSep + 1);\n  else n = n.replace(/[.,]/g, "");\n  return Number(n);\n}\nfunction parseDmy(s) {\n  const m = s.match(/\\b(?<d>\\d{1,2})[\\/.-](?<mo>\\d{1,2})[\\/.-](?<y>\\d{4})\\b/);\n  if (!m) return null;\n  const { d, mo, y } = m.groups;\n  const date = new Date(Date.UTC(+y, +mo - 1, +d));\n  return date.getUTCDate() === +d && date.getUTCMonth() === +mo - 1 ? date.toISOString().slice(0, 10) : null;\n}\nfor (const a of ["1,250.50 EGP", "1.250,50 €", "total 90", "SAR 12 500"]) console.log(a.padEnd(14), parseAmount(a));\nfor (const d of ["due 15/10/2026", "31/02/2026", "2026-10-15"]) console.log(d.padEnd(14), parseDmy(d));', J),
        L(B('فخ الـ backtracking', 'The backtracking trap'),
          B('أنماط زي `(a+)+$` على نص طويل مش مطابق بتاخد وقت **أُسّي**: **catastrophic backtracking**. لو النص جاي من المستخدمين، ده **redos** — حد يوقّف سيرفرك بنص واحد. تجنّب الـ quantifiers المتداخلة، وحدد طول المدخل قبل الـ regex، ومتستخدمش regex لـ HTML أو JSON (استخدم parser).', 'Patterns like `(a+)+$` on a long non-matching text take **exponential** time: **catastrophic backtracking**. When the text comes from users, that is **redos** — someone stalls your server with one string. Avoid nested quantifiers, limit the input length before the regex, and do not use regex for HTML or JSON (use a parser).'),
          'const evil = /^(a+)+$/;\nfor (const n of [20, 22, 24, 26]) {\n  const s = "a".repeat(n) + "!";\n  const t = performance.now();\n  evil.test(s);\n  console.log(`n=${n}: ${(performance.now() - t).toFixed(0)} ms`);\n}\nconsole.log("same job, safe pattern:", /^a+$/.test("a".repeat(100000) + "!"), "(instant)");', N())
      ],
      practice: [
        B('طبّع 10 أرقام تليفونات بأشكال مختلفة.', 'Normalise 10 phone numbers written in different ways.'),
        B('جرّب parseAmount على 6 أشكال مبالغ.', 'Try parseAmount on 6 amount formats.'),
        B('اتأكد إن parseDmy بيرفض 31/02.', 'Make sure parseDmy rejects 31/02.'),
        B('شغّل مثال الـ backtracking وشوف الوقت بيتضاعف.', 'Run the backtracking example and watch the time double.')
      ],
      words: [
        W('extraction', 'سحب بيانات من نص', 'pulling data out of text', 'Extraction found 3 phone numbers.'),
        W('international format', 'الرقم بكود الدولة', 'a number with the country code', 'Store phones in international format.'),
        W('catastrophic backtracking', 'regex بياخد وقت أُسّي', 'a regex taking exponential time', 'Nested quantifiers cause catastrophic backtracking.'),
        W('redos', 'هجوم بيوقّف السيرفر بنص بيبطّأ الـ regex', 'an attack stalling a server with a slow-regex string', 'Limit input length to prevent ReDoS.'),
        W('nested quantifier', 'تكرار جوه تكرار زي (a+)+', 'a repeat inside a repeat such as (a+)+', 'Avoid nested quantifiers.')
      ],
      read: [{ t: 'OWASP: Regular expression Denial of Service', url: 'https://community.owasp.org/attacks/Regular_expression_Denial_of_Service_-_ReDoS', what: B('اقرا Evil Regexes.', 'Read Evil Regexes.') }, { t: 'libphonenumber-js', url: 'https://github.com/catamphetamine/libphonenumber-js', what: B('للتليفونات في الإنتاج.', 'For phone numbers in production.') }],
      challenge: B('اعمل `extract.mjs`: من رسالة عميل (واتساب أو إيميل) يطلّع تليفونات (دولي)، وإيميلات، ومبالغ (رقم + عملة)، وتواريخ (ISO)، وأرقام طلبات — بحد طول للمدخل و20 اختبار.', 'Write `extract.mjs`: from a customer message (WhatsApp or email) extract phones (international), emails, amounts (number + currency), dates (ISO) and order numbers — with an input length limit and 20 tests.'),
      quiz: [
        Q(B('15/10/2026 في مصر:', '15/10/2026 in Egypt:'), [['15 أكتوبر', '15 October'], ['شهر 15', 'month 15'], ['مستحيل', 'impossible']], 0, B('يوم/شهر.', 'Day/month.')),
        Q(B('(a+)+$ على نص من المستخدم:', '(a+)+$ on user text:'), [['خطر ReDoS', 'a ReDoS risk'], ['آمن', 'safe'], ['أسرع', 'faster']], 0, B('متداخل.', 'Nested.')),
        Q(B('HTML بـ regex:', 'HTML with regex:'), [['استخدم parser', 'use a parser'], ['ممتاز', 'excellent'], ['الطريقة الوحيدة', 'the only way']], 0, B('Cheerio/DOM.', 'Cheerio/DOM.'))
      ] },

    { title: B('مطابقة تقريبية وقوالب رسايل', 'Fuzzy matching and message templates'),
      goal: B('تطابق أسماء فيها أخطاء إملائية وتبني رسايل من قوالب.', 'Match names with typos and build messages from templates.'),
      learn: [
        L(B('مسافة Levenshtein', 'Levenshtein distance'),
          B('«Mohamed» و«Mohammed» و«Mohamad» نفس الشخص غالبًا. **levenshtein distance** = أقل عدد تعديلات (إضافة، حذف، تغيير حرف) يحوّل كلمة للتانية. **fuzzy match**: طبّع الأول، واحسب المسافة، واقبل لو أقل من حد (مثلًا 20% من الطول).', '«Mohamed», «Mohammed» and «Mohamad» are probably the same person. **levenshtein distance** = the fewest edits (insert, delete, change a letter) turning one word into another. A **fuzzy match**: normalise first, compute the distance, and accept below a threshold (say 20% of the length).'),
          'function levenshtein(a, b) {\n  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);\n  for (let i = 1; i <= a.length; i++) {\n    const cur = [i];\n    for (let j = 1; j <= b.length; j++)\n      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));\n    prev = cur;\n  }\n  return prev[b.length];\n}\nconst customers = ["Mohammed Ali", "Sara Hassan", "Omar Khaled", "محمد علي"];\nfunction bestMatch(q) {\n  const scored = customers.map(c => ({ c, d: levenshtein(q.toLowerCase(), c.toLowerCase()) })).sort((x, y) => x.d - y.d);\n  const ok = scored[0].d <= Math.ceil(q.length * 0.2);\n  return ok ? `${scored[0].c} (distance ${scored[0].d})` : `no match (closest: ${scored[0].c}, ${scored[0].d})`;\n}\nfor (const q of ["Mohamed Ali", "sara hasan", "Omer Kaled", "Ahmed Fathy", "محمد على"]) console.log(q.padEnd(12), "→", bestMatch(q));', J),
        L(B('قوالب الرسايل', 'Message templates'),
          B('رسايل الواتساب والإيميل بتتبني من قالب فيه **placeholder** زي `{{name}}`. دالة صغيرة بتملاه، وبتسيب علامة واضحة لو قيمة ناقصة (بدل «undefined» تروح للعميل)، وبتنسّق الأرقام والتواريخ. ده نفس فكرة `{{ $json.name }}` في n8n.', 'WhatsApp and email messages are built from a template with each **placeholder** like `{{name}}`. A small function fills it, leaves a visible mark when a value is missing (instead of «undefined» reaching the customer), and formats numbers and dates. It is the same idea as `{{ $json.name }}` in n8n.'),
          'const fmt = {\n  egp: n => new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(n),\n  date: d => new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "long" }).format(new Date(d)),\n};\nfunction fill(template, data) {\n  const missing = [];\n  const text = template.replace(/\\{\\{\\s*(\\w+)(?:\\|(\\w+))?\\s*\\}\\}/g, (_, key, f) => {\n    if (data[key] == null) { missing.push(key); return `[${key}?]`; }\n    return f ? fmt[f](data[key]) : String(data[key]);\n  });\n  return { text, missing };\n}\nconst tpl = "أهلًا {{name}} 👋 طلبك رقم {{id}} بقيمة {{total|egp}} هيوصل يوم {{eta|date}}. كود الخصم: {{coupon}}";\nconsole.log(fill(tpl, { name: "سارة", id: 1042, total: 1250.5, eta: "2026-10-08" }));', J),
        L(B('خط معالجة النص', 'The text-processing pipeline'),
          B('رتّب الخطوات في كل مرة: طبّع (NFC، أرقام، مسافات، عربي) ← استخرج (regex بحدود) ← تحقق (Zod) ← طابق (exact ثم fuzzy) ← قرر (تلقائي لو واثق، إنسان لو لأ). نفس الخط ده هتبنيه في n8n Code node الأسبوع الجاي.', 'Order the steps every time: normalise (NFC, digits, spaces, Arabic) → extract (bounded regex) → validate (Zod) → match (exact, then fuzzy) → decide (automatic when confident, a person when not). You will build this same pipeline in the n8n Code node next week.'),
          'message ─▶ normalize ─▶ extract (phones, amounts, order ids)\n        ─▶ validate ─▶ match customer (exact → fuzzy ≤ 20%)\n        ─▶ confident?  yes → update CRM + reply from template\n                       no  → send to a person with the extracted fields', T)
      ],
      practice: [
        B('طابق 10 أسماء فيها أخطاء بقايمة عملاء.', 'Match 10 misspelled names against a customer list.'),
        B('جرّب حدود مختلفة (10% و30%) وشوف الأخطاء.', 'Try different thresholds (10% and 30%) and look at the mistakes.'),
        B('اعمل 3 قوالب رسايل بالعربي وجرّب قيمة ناقصة.', 'Write 3 Arabic message templates and try a missing value.'),
        B('ارسم خط المعالجة لرسالة حقيقية.', 'Draw the pipeline for a real message.')
      ],
      words: [
        W('levenshtein distance', 'عدد التعديلات بين كلمتين', 'the number of edits between two words', 'The Levenshtein distance is 1.'),
        W('fuzzy match', 'مطابقة بتسمح بأخطاء بسيطة', 'matching that tolerates small mistakes', 'A fuzzy match found «Mohammed».'),
        W('threshold', 'الحد اللي بنقبل تحته', 'the limit we accept below', 'Set the threshold at 20%.'),
        W('placeholder', 'مكان في القالب بيتملا', 'a slot in a template to be filled', 'The {{name}} placeholder became Sara.'),
        W('message template', 'قالب رسالة ثابت ببيانات متغيرة', 'a fixed message with changing data', 'Approve the message template first.')
      ],
      read: [{ t: 'MDN: String.prototype.replace() — specifying a function', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_the_replacement', what: B('اقرا معاملات الدالة.', 'Read the function parameters.') }],
      challenge: B('اعمل «مطابق العملاء»: ملف CSV بأسماء وتليفونات من مصدرين مختلفين، طابقهم (تليفون مطبّع exact، وبعدين اسم fuzzy)، وطلّع 3 ملفات: متطابق، محتاج مراجعة، مش موجود.', 'Build a «customer matcher»: two CSV files of names and phones from different sources; match them (exact normalised phone, then fuzzy name), and output 3 files: matched, needs review, not found.'),
      quiz: [
        Q(B('distance("Omar", "Omer"):', 'distance("Omar", "Omer"):'), ['1', '2', '0'], 0, B('حرف واحد.', 'One letter.')),
        Q(B('قيمة ناقصة في قالب:', 'A missing value in a template:'), [['علامة واضحة وتنبيه', 'a visible mark and a warning'], ['undefined للعميل', 'undefined to the customer'], ['تتشال بصمت', 'removed silently']], 0, B('اعرف قبل ما تبعت.', 'Know before sending.')),
        Q(B('مطابقة مش واثق منها:', 'A match you are not sure of:'), [['إنسان يراجع', 'a person reviews it'], ['اقبلها', 'accept it'], ['امسحها', 'delete it']], 0, B('human in the loop.', 'Human in the loop.'))
      ] },

    { title: B('مراجعة الشهر الخامس ومشروعه', 'Month 5 review and project'),
      goal: B('أداة أتمتة Node متكاملة للشغل اليومي.', 'A complete Node automation tool for daily work.'),
      review: [
        B('سكربتات: parseArgs وجدولة بقفل ولوج JSON وفولدرات وارد وتنبيهات (أسبوع 17).', 'Scripts: parseArgs, scheduling with a lock, JSON logs, inbox folders and alerts (week 17).'),
        B('Express وwebhooks: توقيع وdedupe وZod ورد سريع (أسبوع 18).', 'Express and webhooks: signatures, dedupe, Zod and fast replies (week 18).'),
        B('CSV وExcel وPDF والـ streams (أسبوع 19).', 'CSV, Excel, PDF and streams (week 19).'),
        B('regex: groups وlookarounds وflags، وتجنّب ReDoS.', 'Regex: groups, lookarounds and flags, and avoiding ReDoS.'),
        B('العربي: تطبيع وأرقام وترتيب، والمطابقة التقريبية والقوالب.', 'Arabic: normalisation, digits and sorting, fuzzy matching and templates.')
      ],
      project: B('مشروع الشهر الخامس «صندوق طلبات العملاء»: سيرفر Express بيستقبل رسايل (webhook من n8n لواتساب/إيميل بتوقيع)، يطبّع العربي والأرقام، يستخرج الطلب (منتج، كمية، تليفون، عنوان) بـ regex وnamed groups، يطابق العميل (تليفون ثم اسم fuzzy) من ملف عملاء xlsx، يتحقق بـ Zod، ويرد بقالب رسالة — والحالات المش واضحة تروح فولدر مراجعة. وسكربت ليلي مجدول بقفل بيطلّع تقرير xlsx وCSV للطلبات وPDF ملخص، ولوج JSON وتنبيهات وheartbeat.', 'Month 5 project «customer order inbox»: an Express server receiving messages (a signed webhook from n8n for WhatsApp/email), normalising Arabic and digits, extracting the order (product, quantity, phone, address) with regex and named groups, matching the customer (phone, then fuzzy name) from an xlsx customer file, validating with Zod, and replying from a message template — with unclear cases going to a review folder. Plus a nightly scheduled script with a lock producing an xlsx and CSV report and a PDF summary, with JSON logs, alerts and a heartbeat.'),
      test: [
        Q(B('^ و$:', '^ and $:'), [['أول وآخر النص', 'the start and end of the text'], ['أي حرف', 'any character'], ['رقم', 'a digit']], 0, B('anchors.', 'Anchors.')),
        Q(B('/x/gi:', '/x/gi:'), [['كل التطابقات ومن غير فرق حروف', 'all matches, case-insensitive'], ['أول تطابق', 'the first match'], ['خطأ', 'an error']], 0, B('flags.', 'Flags.')),
        Q(B('matchAll بيحتاج:', 'matchAll requires:'), [['flag g', 'the g flag'], ['flag i', 'the i flag'], ['مفيش', 'nothing']], 0, B('وإلا خطأ.', 'Or it throws.')),
        Q(B('(?:…) :', '(?:…):'), [['مجموعة من غير حفظ', 'a group without capturing'], ['lookahead', 'a lookahead'], ['اسم', 'a name']], 0, B('تجميع بس.', 'Grouping only.')),
        Q(B('(?<=\\$)\\d+ في "$40":', '(?<=\\$)\\d+ in "$40":'), ['40', '$40', '$'], 0, B('lookbehind.', 'A lookbehind.')),
        Q(B('أَحْمَد ← احمد:', '`أَحْمَد` → `احمد`:'), [['شيل التشكيل ووحّد الهمزة', 'remove tashkeel and unify the hamza'], ['ترجمة', 'translation'], ['تشفير', 'encryption']], 0, B('normalization.', 'Normalization.')),
        Q(B('"٣" + 1 بعد التحويل:', '`"٣" + 1` after conversion:'), ['4', '"31"', 'NaN'], 0, B('Number(toLatin).', 'Number(toLatin).')),
        Q(B('تقسيم جملة لكلمات صح:', 'Splitting a sentence into words properly:'), ['Intl.Segmenter', 'split("")', 'slice'], 0, B('مع الترقيم.', 'Handles punctuation.')),
        Q(B('31/02/2026:', '31/02/2026:'), [['ترفضه', 'reject it'], ['3 مارس', '3 March'], ['28 فبراير', '28 February']], 0, B('تاريخ مش موجود.', 'Not a real date.')),
        Q(B('حماية من ReDoS:', 'Protection from ReDoS:'), [['حد طول وتجنّب التداخل', 'a length limit and no nesting'], ['regex أطول', 'longer regexes'], ['g دايمًا', 'always g']], 0, B('أمان.', 'Safety.')),
        Q(B('«Mohamad» و«Mohammed»:', '«Mohamad» and «Mohammed»:'), [['fuzzy match', 'a fuzzy match'], ['مختلفين أكيد', 'surely different'], ['نفس النص', 'identical text']], 0, B('distance صغيرة.', 'A small distance.')),
        Q(B('{{name}} في قالب:', '{{name}} in a template:'), ['placeholder', 'regex', B('خطأ', 'an error')], 0, B('بيتملا.', 'Gets filled.'))
      ] }
  ]
};
