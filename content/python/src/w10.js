// Python week 10 — Regex and cleaning text.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('Regex وتنضيف النصوص', 'Regex and cleaning text'),
  goal: B('تكتب Regular Expressions تلاقي وتطلّع وتبدّل أي شكل في النص: أرقام موبايلات وإيميلات وتواريخ وأسعار وسطور لوج، وتنضّف النص العربي (التشكيل والألف والأرقام الهندي) — وتعرف امتى متستخدمش Regex خالص.',
          'Write regular expressions that find, extract and replace any shape in text: phone numbers, emails, dates, prices and log lines; clean Arabic text (diacritics, alef forms and Arabic-Indic digits); and know when not to use regex at all.'),
  days: [
    { title: B('أول Regex: رموز وكميات', 'First regex: symbols and quantities'),
      goal: B('تستخدم re.search وre.findall، وتفهم \\d و\\w و\\s و. والكميات + و* و? و{n,m} والأقواس المربعة و^ و$.', 'Use re.search and re.findall, and understand \\d, \\w, \\s, ., the quantities +, *, ? and {n,m}, square brackets, ^ and $.'),
      learn: [
        { h: B('search وfindall', 'search and findall'),
          p: B('`re.search(pattern, text)` بيدوّر على **أول** تطابق وبيرجّع match أو None. `re.findall(pattern, text)` بيرجّع **كل** التطابقات في قايمة. اكتب الـ pattern دايمًا raw string (`r"..."`) عشان الشرطة المايلة متتفهمش رمز Python.', '`re.search(pattern, text)` finds the **first** match and returns a match object or None. `re.findall(pattern, text)` returns **every** match in a list. Always write the pattern as a raw string (`r"..."`) so backslashes are not read as Python escapes.'),
          ex: 'import re\ntext = "Order 1042 shipped, order 1043 pending, invoice 77"\nm = re.search(r"\\d+", text)\nprint(m.group(), m.start())\nprint(re.findall(r"\\d+", text))\nprint(re.search(r"refund", text))', run: 1 },
        { h: B('الرموز الأساسية', 'The basic symbols'),
          p: B('`\\d` رقم، `\\w` حرف أو رقم أو _ (بيشمل العربي)، `\\s` مسافة، `.` أي حرف غير السطر الجديد. وبالكبير عكسهم: `\\D` مش رقم. `[abc]` حرف من دول، `[0-9]` من رينج، `[^0-9]` أي حاجة إلا. الرموز الخاصة (`. + * ? ( ) [ ] { } ^ $ | \\`) لو عايزها حرف عادي حط قبلها `\\`.', '`\\d` is a digit, `\\w` a letter, digit or _ (Arabic included), `\\s` whitespace, `.` any character except a newline. Uppercase means the opposite: `\\D` is a non-digit. `[abc]` is one of these characters, `[0-9]` a range, `[^0-9]` anything but. To use a special symbol (`. + * ? ( ) [ ] { } ^ $ | \\`) as a plain character, put `\\` before it.'),
          ex: 'import re\ntext = "Prices: 45.50 EGP, 120 EGP. Call 010-1234-5678!"\nprint(re.findall(r"\\d+\\.\\d+", text))   # a dot that is really a dot\nprint(re.findall(r"[A-Z]{3}", text))\nprint(re.findall(r"\\d{3}-\\d{4}-\\d{4}", text))\nprint(re.findall(r"[^\\w\\s]", text))', run: 1 },
        { h: B('الكميات والمراسي', 'Quantities and anchors'),
          p: B('`+` مرة أو أكتر، `*` صفر أو أكتر، `?` اختياري، `{3}` بالظبط 3، `{2,4}` من 2 لـ 4. `^` أول النص و`$` آخره، و`\\b` حدود كلمة (`\\bcat\\b` ميمسكش category). `re.fullmatch` بيطلب النص كله يطابق — ده اللي بتستخدمه للتحقق من المدخلات.', '`+` is once or more, `*` zero or more, `?` optional, `{3}` exactly 3, `{2,4}` from 2 to 4. `^` is the start and `$` the end, and `\\b` a word boundary (`\\bcat\\b` does not match category). `re.fullmatch` requires the whole text to match — use it to validate input.'),
          ex: 'import re\nfor code in ["EG-123", "EG-12", "EG-1234", "XEG-123"]:\n    print(code, bool(re.fullmatch(r"EG-\\d{3}", code)))\nprint(re.findall(r"\\bcat\\b", "cat category concat cat."))\nprint(re.findall(r"colou?r", "color colour colr"))', run: 1 }
      ],
      practice: [
        B('طلّع كل الأرقام (صحيحة وعشرية) من 3 جمل فيها أسعار.', 'Extract every number (whole and decimal) from 3 sentences with prices.'),
        B('اتأكد بـ fullmatch إن كود منتج بالشكل `ABC-1234` (3 حروف كبيرة وشرطة و4 أرقام).', 'Check with fullmatch that a product code looks like `ABC-1234` (3 capitals, a dash and 4 digits).'),
        B('جرّب 5 Regex في regex101 (اختار Python) وشوف الشرح على اليمين.', 'Try 5 patterns on regex101 (choose Python) and read the explanation on the right.'),
        B('اكتب Regex بيمسك كلمة «error» لوحدها بس مش جوه «errors» أو «terror».', 'Write a pattern that matches the word «error» alone, not inside «errors» or «terror».')
      ],
      code: [
        { u: B('Regex جاهزة', 'Ready-made patterns'), p: 'import re\nPATTERNS = {\n    "eg_mobile": r"\\b01[0125]\\d{8}\\b",\n    "email": r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+",\n    "iso_date": r"\\b\\d{4}-\\d{2}-\\d{2}\\b",\n    "price": r"\\d{1,3}(?:,\\d{3})*(?:\\.\\d+)?",\n    "url": r"https?://[^\\s]+",\n}\ntext = "Mona 01012345678 mona@shop.com paid 1,250.50 on 2026-09-30 via https://pay.example.com/r/91"\nfor name, p in PATTERNS.items():\n    print(f"{name:<10}", re.findall(p, text))', run: 1 }
      ],
      words: [
        { t: 'regular expression', m: B('نمط بيوصف شكل نص عشان تدوّر عليه أو تطلّعه (regex)', 'a pattern describing the shape of text to find or extract (regex)'), ex: 'r"\\d{3}-\\d{4}"' },
        { t: 're.search()', m: B('بتدوّر على أول تطابق وبترجّع match أو None', 'finds the first match and returns a match object or None'), ex: 're.search(r"\\d+", text)' },
        { t: 're.findall()', m: B('بترجّع كل التطابقات في قايمة', 'returns every match in a list'), ex: 're.findall(r"\\w+@\\w+", text)' },
        { t: 'quantifier', m: B('رمز بيحدد عدد التكرار: + * ? {n,m}', 'a symbol setting how many times: + * ? {n,m}'), ex: '\\d{2,4}' },
        { t: 'character class', m: B('مجموعة حروف بين []، بيطابق واحد منها', 'a set of characters in [], matching one of them'), ex: '[A-Z0-9]' },
        { t: 'anchor', m: B('رمز بيطابق مكان مش حرف: ^ و$ و\\b', 'a symbol matching a position, not a character: ^, $ and \\b'), ex: '^INV-' },
        { t: 'fullmatch', m: B('بيطلب النص كله يطابق النمط؛ للتحقق', 'requires the whole text to match; for validation'), ex: 're.fullmatch(r"\\d{11}", phone)' }
      ],
      read: [{ lib: 'Regular Expression HOWTO', what: B('اقرا Simple Patterns لحد Repeating Things.', 'Read Simple Patterns up to Repeating Things.') }, 'lib:regex101'],
      challenge: B('اكتب `extract.py` بياخد ملف نص ويطبع: كل الإيميلات من غير تكرار، وكل أرقام الموبايل المصرية، وكل التواريخ بالشكل YYYY-MM-DD، وكل اللينكات — كل نوع مع عدده.', 'Write `extract.py` that takes a text file and prints every email without repeats, every Egyptian mobile number, every date as YYYY-MM-DD and every link — each type with its count.'),
      quiz: [
        { q: B('`re.findall(r"\\d+", "a1b22c333")`:', '`re.findall(r"\\d+", "a1b22c333")`:'), o: ['["1", "22", "333"]', '[1, 22, 333]', '["1", "2", "2", "3", "3", "3"]'], a: 0, why: B('+ بتلم الأرقام ورا بعض، والنتيجة نصوص.', '+ groups consecutive digits, and results are strings.') },
        { q: B('عشان تطابق نقطة حقيقية:', 'To match a literal dot:'), o: ['\\.', '.', '[.]+?'], a: 0, why: B('. لوحدها = أي حرف.', 'A bare . matches any character.') },
        { q: B('للتحقق إن المدخل كله رقم موبايل:', 'To validate that the whole input is a phone number:'), o: ['re.fullmatch', 're.search', 're.findall'], a: 0, why: B('search تقبل لو جزء بس طابق.', 'search accepts a partial match.') }
      ] },

    { title: B('المجموعات والتطابقات', 'Groups and matches'),
      goal: B('تطلّع أجزاء من التطابق بالأقواس والأسماء، وتلف على التطابقات بـ finditer، وتستخدم | والكميات الكسولة.', 'Pull parts out of a match with brackets and names, loop over matches with finditer, and use | and lazy quantities.'),
      learn: [
        { h: B('الأقواس بتمسك أجزاء', 'Brackets capture parts'),
          p: B('`(\\d{4})-(\\d{2})-(\\d{2})` كل قوس group: `m.group(1)` السنة، `m.groups()` كلهم. ولو في findall فيه groups بيرجّع tuples بالأجزاء بس. `(?:...)` أقواس للتجميع من غير ما تمسك.', '`(\\d{4})-(\\d{2})-(\\d{2})` — each bracket is a group: `m.group(1)` is the year and `m.groups()` all of them. With groups, findall returns tuples of the parts only. `(?:...)` groups without capturing.'),
          ex: 'import re\nm = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", "due on 2026-10-15 at noon")\nprint(m.group(0), m.group(1), m.groups())\nprint(re.findall(r"(\\w+)@([\\w.]+)", "sara@shop.com, omar@mail.eg"))\nprint(re.findall(r"(?:Mr|Ms)\\. (\\w+)", "Mr. Adel and Ms. Huda"))', run: 1 },
        { h: B('أسماء للمجموعات وfinditer', 'Named groups and finditer'),
          p: B('`(?P<year>\\d{4})` بتدي اسم للـ group، و`m["year"]` أو `m.groupdict()` بترجّعهم كـ dict — مثالي لتحويل سطور نص لبيانات. `re.finditer` بيرجّع match objects واحد واحد بأماكنهم، أحسن من findall لما تحتاج تفاصيل.', '`(?P<year>\\d{4})` names a group, and `m["year"]` or `m.groupdict()` return them as a dict — perfect for turning lines of text into data. `re.finditer` yields match objects one by one with their positions, better than findall when you need details.'),
          ex: 'import re\nLINE = re.compile(r"(?P<date>\\d{4}-\\d{2}-\\d{2}) (?P<level>INFO|ERROR) (?P<msg>.+)")\nlog = """2026-10-01 INFO started\n2026-10-01 ERROR db timeout\nnot a log line\n2026-10-02 INFO sent 40 emails"""\nfor m in LINE.finditer(log):\n    print(m.groupdict())', run: 1 },
        { h: B('| والجشع والكسل', '| and greedy versus lazy'),
          p: B('`cat|dog` يا ده يا ده. الكميات افتراضيًا «جشعة»: `<.+>` في `<b>hi</b>` بتمسك من أول `<` لآخر `>`. ضيف `?` تبقى «كسولة» وتمسك أقل حاجة: `<.+?>` بتمسك كل tag لوحده.', '`cat|dog` matches either. Quantities are «greedy» by default: `<.+>` in `<b>hi</b>` grabs from the first `<` to the last `>`. Adding `?` makes them «lazy», grabbing as little as possible: `<.+?>` catches each tag separately.'),
          ex: 'import re\nhtml = "<b>Sale</b> on <i>bags</i>"\nprint(re.findall(r"<.+>", html))\nprint(re.findall(r"<.+?>", html))\nprint(re.findall(r"<(\\w+)>(.*?)</\\1>", html))\nprint(re.findall(r"\\b(paid|refunded)\\b", "paid, unpaid, refunded"))', run: 1 }
      ],
      practice: [
        B('حوّل 5 تواريخ `DD/MM/YYYY` لـ `YYYY-MM-DD` بالـ groups.', 'Turn 5 dates `DD/MM/YYYY` into `YYYY-MM-DD` with groups.'),
        B('اعمل Regex بأسماء لسطر `name: Sara | city: Cairo | total: 1200` وطلّع dict.', 'Write a named-group pattern for the line `name: Sara | city: Cairo | total: 1200` and produce a dict.'),
        B('جرّب `.+` و`.+?` على نص فيه علامات تنصيص كتير وشوف الفرق.', 'Try `.+` and `.+?` on text with many quotes and see the difference.'),
        B('طلّع اسم المستخدم والدومين من 5 إيميلات بـ finditer واطبع مكان كل واحد.', 'Extract the user and domain of 5 emails with finditer and print where each one starts.')
      ],
      code: [
        { u: B('من نص لقايمة dicts', 'From text to a list of dicts'), p: 'import re\ntext = """Invoice INV-0091 | Sara Ahmed | 1,250.50 EGP | 2026-09-28\nInvoice INV-0092 | Omar Adel | 980 EGP | 2026-09-29"""\nROW = re.compile(r"Invoice (?P<id>INV-\\d+) \\| (?P<name>[^|]+?) \\| (?P<amount>[\\d,.]+) EGP \\| (?P<date>[\\d-]+)")\nrows = [m.groupdict() for m in ROW.finditer(text)]\nfor r in rows:\n    r["amount"] = float(r["amount"].replace(",", ""))\nprint(rows)', run: 1 }
      ],
      words: [
        { t: 'capturing group', m: B('جزء من النمط بين () بيتمسك لوحده', 'a part of a pattern in () captured on its own'), ex: '(\\d{4})-(\\d{2})' },
        { t: 'named group', m: B('group ليه اسم (?P<name>...)', 'a group with a name, (?P<name>...)'), ex: '(?P<year>\\d{4})' },
        { t: 'match object', m: B('نتيجة التطابق: النص ومكانه والـ groups', 'the result of a match: the text, its position and groups'), ex: 'm.group(1), m.start()' },
        { t: 'alternation', m: B('| معناها يا ده يا ده', '| meaning one or the other'), ex: 'INFO|ERROR' },
        { t: 'greedy', m: B('الكمية بتمسك أكبر حاجة ممكنة', 'a quantity grabbing as much as possible'), ex: '<.+>' },
        { t: 'lazy quantifier', m: B('كمية بـ ? بتمسك أقل حاجة ممكنة', 'a quantity with ? grabbing as little as possible'), ex: '<.+?>' }
      ],
      read: [{ lib: 'Regular Expression HOWTO', what: B('اقرا Grouping وNon-capturing and Named Groups وGreedy versus Non-Greedy.', 'Read Grouping, Non-capturing and Named Groups, and Greedy versus Non-Greedy.') }, { lib: 're — Regular expressions', what: B('اقرا جزء Match Objects.', 'Read the Match Objects part.') }],
      challenge: B('خد 10 سطور لوج سيرفر ويب (اعملهم بإيدك بالشكل `IP - - [date] "GET /path HTTP/1.1" status size`) وطلّع لكل سطر dict، واطبع: أكتر 3 مسارات، وعدد كل status، وكل IP عمل أكتر من 3 طلبات.', 'Take 10 web-server log lines (write them yourself as `IP - - [date] "GET /path HTTP/1.1" status size`), parse each into a dict, and print the top 3 paths, the count per status, and every IP with more than 3 requests.'),
      quiz: [
        { q: B('`re.search(r"(\\d+)-(\\d+)", "x 12-34").group(2)`:', '`re.search(r"(\\d+)-(\\d+)", "x 12-34").group(2)`:'), o: ['"34"', '"12"', '"12-34"'], a: 0, why: B('الـ group التانية.', 'The second group.') },
        { q: B('`(?:...)` بتعمل:', '`(?:...)` does:'), o: [B('تجمّع من غير ما تمسك', 'groups without capturing'), B('تمسك باسم', 'captures by name'), B('تكرار اختياري', 'an optional repeat')], a: 0, why: B('non-capturing.', 'Non-capturing.') },
        { q: B('`re.findall(r"a.+?b", "a1b a22b")`:', '`re.findall(r"a.+?b", "a1b a22b")`:'), o: ['["a1b", "a22b"]', '["a1b a22b"]', '[]'], a: 0, why: B('الكسولة بتقف عند أول b.', 'The lazy version stops at the first b.') }
      ] },

    { title: B('الاستبدال والتقسيم والـ flags', 'Replacing, splitting and flags'),
      goal: B('تبدّل بـ re.sub (بأجزاء من التطابق أو بدالة)، وتقسّم بـ re.split، وتستخدم IGNORECASE وMULTILINE وVERBOSE وcompile.', 'Replace with re.sub (using parts of the match or a function), split with re.split, and use IGNORECASE, MULTILINE, VERBOSE and compile.'),
      learn: [
        { h: B('re.sub', 're.sub'),
          p: B('`re.sub(pattern, replacement, text)` بيبدّل كل تطابق. في الاستبدال `\\1` أو `\\g<name>` بيرجّع أجزاء من التطابق — كده بتعيد ترتيب النص. و`count=1` يبدّل أول واحد بس.', '`re.sub(pattern, replacement, text)` replaces every match. In the replacement, `\\1` or `\\g<name>` brings back parts of the match — so you can reorder text. `count=1` replaces only the first.'),
          ex: 'import re\nprint(re.sub(r"\\s+", " ", "too    many     spaces  "))\nprint(re.sub(r"(\\d{2})/(\\d{2})/(\\d{4})", r"\\3-\\2-\\1", "from 01/10/2026 to 15/10/2026"))\nprint(re.sub(r"(?P<user>\\w)\\w*@", r"\\g<user>***@", "mona@shop.com, omar@x.eg"))', run: 1 },
        { h: B('استبدال بدالة', 'Replacing with a function'),
          p: B('بدل نص ثابت، ابعت دالة بتاخد match وترجّع النص الجديد: تحوّل عملة، تكبّر حروف، تخفي جزء. وده بيخلي re.sub أداة تحويل كاملة.', 'Instead of fixed text, pass a function that receives the match and returns the new text: convert a currency, change case, hide a part. That makes re.sub a complete transformation tool.'),
          ex: 'import re\nRATE = 0.0207   # EGP -> USD, an example rate\n\ndef to_usd(m):\n    egp = float(m.group(1).replace(",", ""))\n    return f"${egp * RATE:,.2f}"\n\ntext = "Bag 1,250 EGP, pen 30 EGP"\nprint(re.sub(r"([\\d,]+(?:\\.\\d+)?) EGP", to_usd, text))\nprint(re.sub(r"\\b[a-z]", lambda m: m.group().upper(), "cairo giza alexandria"))', run: 1 },
        { h: B('split والـ flags وcompile', 'split, flags and compile'),
          p: B('`re.split(r"[,;|]\\s*", text)` بيقسّم على أكتر من فاصل. الـ flags: `re.I` من غير فرق حروف، `re.M` ^ و$ لكل سطر، `re.X` بيسمح بمسافات وتعليقات جوه الـ pattern عشان الطويل يبقى مقروء. `re.compile` بيجهّز الـ pattern مرة لو هتستخدمه كتير.', '`re.split(r"[,;|]\\s*", text)` splits on several separators. Flags: `re.I` ignores case, `re.M` makes ^ and $ work per line, `re.X` allows spaces and comments inside a pattern so long ones stay readable. `re.compile` prepares a pattern once when you use it a lot.'),
          ex: 'import re\nprint(re.split(r"\\s*[,;|]\\s*", "Cairo, Giza;Alex | Aswan"))\nprint(re.findall(r"^error.*$", "error one\\nINFO two\\nERROR three", re.I | re.M))\nPHONE = re.compile(r"""\n    (?:\\+?20)?      # optional country code\n    0?1[0125]       # mobile prefix\n    \\d{8}           # the rest\n""", re.X)\nprint(PHONE.findall("+201012345678, 01112345678, 0221234567"))', run: 1 }
      ],
      practice: [
        B('حوّل كل المسافات والـ tabs الكتير في نص لمسافة واحدة.', 'Turn every run of spaces and tabs in a text into a single space.'),
        B('اخفي كل أرقام الموبايل في نص ماعدا آخر 3 أرقام باستبدال بدالة.', 'Hide every mobile number in a text except its last 3 digits, with a function replacement.'),
        B('قسّم قايمة tags مكتوبة بفواصل مختلفة (`, ; |`) لقايمة نضيفة.', 'Split a tag list written with different separators (`, ; |`) into a clean list.'),
        B('اكتب Regex إيميل طويل بـ `re.X` وفيه تعليق لكل جزء.', 'Write a long email pattern with `re.X` and a comment on each part.')
      ],
      code: [
        { u: B('إخفاء البيانات الشخصية من نص', 'Hiding personal data in text'), p: 'import re\nRULES = [\n    (re.compile(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+"), lambda m: m.group()[0] + "***@***"),\n    (re.compile(r"\\b01[0125]\\d{8}\\b"), lambda m: m.group()[:3] + "*****" + m.group()[-3:]),\n    (re.compile(r"\\b\\d{14}\\b"), lambda m: "<national-id>"),\n]\n\ndef redact(text: str) -> str:\n    for pattern, repl in RULES:\n        text = pattern.sub(repl, text)\n    return text\n\nprint(redact("Mona (mona@shop.com, 01012345678, id 29801011234567) asked for a refund."))', run: 1 }
      ],
      words: [
        { t: 're.sub()', m: B('بتبدّل كل تطابق بنص أو بنتيجة دالة', 'replaces each match with text or a function’s result'), ex: 're.sub(r"\\s+", " ", s)' },
        { t: 'backreference', m: B('\\1 أو \\g<name>: جزء متمسك بترجّعه في الاستبدال أو النمط', '\\1 or \\g<name>: a captured part reused in the replacement or pattern'), ex: 'r"\\3-\\2-\\1"' },
        { t: 're.split()', m: B('بتقسّم النص على نمط مش على فاصل واحد', 'splits text on a pattern, not on one separator'), ex: 're.split(r"[,;]", s)' },
        { t: 'regex flag', m: B('خيار بيغيّر طريقة المطابقة: I وM وX', 'an option changing how matching works: I, M and X'), ex: 're.I | re.M' },
        { t: 're.compile()', m: B('بتجهّز نمط مرة تستخدمه كتير', 'prepares a pattern once for repeated use'), ex: 'EMAIL = re.compile(r"...")' },
        { t: 'redaction', m: B('إخفاء البيانات الحساسة من نص قبل ما تشاركه', 'hiding sensitive data in text before sharing it'), ex: 'm***@*** 010*****678' }
      ],
      read: [{ lib: 'Regular Expression HOWTO', what: B('اقرا Modifying Strings وCompilation Flags.', 'Read Modifying Strings and Compilation Flags.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Text Pattern Matching (أو Pattern Matching with Regular Expressions).', 'The text pattern matching chapter (Pattern Matching with Regular Expressions).') }],
      challenge: B('اكتب `redact.py` بياخد ملف نص ويطلّع نسخة جديدة مخفي فيها الإيميلات والموبايلات والأرقام القومية وأرقام الكروت، ويطبع عدد كل نوع اتخفى — عشان تقدر تبعت لوجات أو بيانات لـ AI أو لزميل بأمان.', 'Write `redact.py` that takes a text file and writes a new copy with emails, mobiles, national IDs and card numbers hidden, printing how many of each were hidden — so you can safely share logs or data with an AI or a colleague.'),
      quiz: [
        { q: B('`re.sub(r"(\\w+) (\\w+)", r"\\2 \\1", "Sara Ali")`:', '`re.sub(r"(\\w+) (\\w+)", r"\\2 \\1", "Sara Ali")`:'), o: ['"Ali Sara"', '"Sara Ali"', '"\\2 \\1"'], a: 0, why: B('backreferences.', 'Backreferences.') },
        { q: B('`re.M` بيخلي:', '`re.M` makes:'), o: [B('^ و$ يشتغلوا مع كل سطر', '^ and $ work on each line'), B('النقطة تمسك السطر الجديد', 'the dot match newlines'), B('من غير فرق حروف', 'matching ignore case')], a: 0, why: B('MULTILINE.', 'MULTILINE.') },
        { q: B('`re.split(r"\\d", "a1b2c")`:', '`re.split(r"\\d", "a1b2c")`:'), o: ['["a", "b", "c"]', '["1", "2"]', '"abc"'], a: 0, why: B('بيقسّم عند كل رقم.', 'It splits at each digit.') }
      ] },

    { title: B('تنضيف بيانات حقيقية (والعربي)', 'Cleaning real data (and Arabic)'),
      goal: B('توحّد أرقام الموبايل والتواريخ والأسعار المكتوبة بأشكال مختلفة، وتنضّف النص العربي: التشكيل وأشكال الألف والياء والتاء المربوطة والأرقام الهندي.', 'Normalise phone numbers, dates and prices written in different ways, and clean Arabic text: diacritics, alef, yaa and taa marbuta forms, and Arabic-Indic digits.'),
      learn: [
        { h: B('توحيد أرقام الموبايل', 'Normalising phone numbers'),
          p: B('العملاء بيكتبوا نفس الرقم 10 أشكال: `+20 10 1234 5678` و`0020101...` و`010-1234-5678`. الخطة: شيل أي حاجة مش رقم، شيل كود البلد لو موجود، تأكد إن الباقي 11 رقم بيبدأ بـ 01، ورجّع شكل واحد (أو None لو مش صالح). ده نفس اللي هتعمله قبل ما تبعت واتساب من n8n.', 'Customers write the same number ten ways: `+20 10 1234 5678`, `0020101...`, `010-1234-5678`. The plan: strip everything that is not a digit, drop the country code if present, check the rest is 11 digits starting with 01, and return one format (or None when invalid). The same thing you do before sending WhatsApp messages from n8n.'),
          ex: 'import re\n\ndef normalise_eg_mobile(raw: str) -> str | None:\n    digits = re.sub(r"\\D", "", raw)\n    digits = re.sub(r"^(?:0020|20)(?=1)", "0", digits)\n    return digits if re.fullmatch(r"01[0125]\\d{8}", digits) else None\n\nfor raw in ["+20 10 1234 5678", "00201112345678", "010-1234-5678", "1012345678", "0221234567", "phone?"]:\n    print(f"{raw!r:<22} -> {normalise_eg_mobile(raw)}")', run: 1 },
        { h: B('الأرقام الهندي والتواريخ', 'Arabic-Indic digits and dates'),
          p: B('`٠١٢٣٤٥٦٧٨٩` (والفارسي `۰۱۲...`) لازم تتحول `0123...` قبل أي حساب: `str.maketrans` و`translate` بيعملوها في سطر. والتواريخ: جرّب أكتر من نمط وحوّل كله لـ ISO `YYYY-MM-DD`.', '`٠١٢٣٤٥٦٧٨٩` (and Persian `۰۱۲...`) must become `0123...` before any calculation: `str.maketrans` and `translate` do it in one line. For dates: try several patterns and turn them all into ISO `YYYY-MM-DD`.'),
          ex: 'import re\nDIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹", "01234567890123456789")\nprint("٠١٠١٢٣٤٥٦٧٨ - ٢٠٢٦/١٠/٠١".translate(DIGITS))\n\nDATES = [\n    (re.compile(r"(\\d{4})-(\\d{1,2})-(\\d{1,2})"), lambda m: (m[1], m[2], m[3])),\n    (re.compile(r"(\\d{1,2})/(\\d{1,2})/(\\d{4})"), lambda m: (m[3], m[2], m[1])),\n    (re.compile(r"(\\d{4})/(\\d{1,2})/(\\d{1,2})"), lambda m: (m[1], m[2], m[3])),\n]\n\ndef to_iso(text: str) -> str | None:\n    text = text.translate(DIGITS)\n    for pattern, parts in DATES:\n        m = pattern.fullmatch(text.strip())\n        if m:\n            y, mo, d = parts(m)\n            return f"{int(y):04}-{int(mo):02}-{int(d):02}"\n    return None\n\nfor d in ["2026-9-5", "05/09/2026", "٢٠٢٦/٠٩/٠٥", "Sept 5"]:\n    print(d, "->", to_iso(d))', run: 1 },
        { h: B('تطبيع النص العربي', 'Normalising Arabic text'),
          p: B('عشان البحث والمقارنة في العربي يشتغلوا: شيل التشكيل (`[\\u064B-\\u0652]`) والتطويل (ـ)، ووحّد أشكال الألف (أ إ آ → ا)، والألف المقصورة (ى → ي)، والتاء المربوطة (ة → ه) حسب احتياجك. كده «مُحَمَّد» و«محمد» يبقوا واحد، و«القاهرة» و«القاهره» يبقوا واحد.', 'For Arabic search and comparison to work: remove diacritics (`[\\u064B-\\u0652]`) and tatweel (`ـ`), unify the alef forms (`أ إ آ → ا`), alef maqsura (`ى → ي`) and taa marbuta (`ة → ه`) as you need. Then `مُحَمَّد` equals `محمد` and `القاهرة` equals `القاهره`.'),
          ex: 'import re\nDIACRITICS = re.compile(r"[\\u064B-\\u0652\\u0670]")\n\ndef normalise_ar(text: str) -> str:\n    text = DIACRITICS.sub("", text)\n    text = text.replace("ـ", "")\n    text = re.sub("[إأآ]", "ا", text)\n    text = text.replace("ى", "ي").replace("ة", "ه")\n    return re.sub(r"\\s+", " ", text).strip()\n\nnames = ["مُحَمَّد  أحمد", "محمد احمد", "القاهرة", "القاهره", "مصطفــى"]\nfor n in names:\n    print(f"{n!r} -> {normalise_ar(n)!r}")\nprint(normalise_ar(names[0]) == normalise_ar(names[1]))', run: 1 }
      ],
      practice: [
        B('شغّل `normalise_eg_mobile` على 10 أشكال كتبتها انت (منها 3 غلط).', 'Run `normalise_eg_mobile` on 10 forms you write yourself (3 of them invalid).'),
        B('حوّل سعر مكتوب بالأرقام الهندي ومعاه «ج.م» لـ float.', 'Turn a price written in Arabic-Indic digits with `ج.م` into a float.'),
        B('اعمل بحث في قايمة 10 أسماء عربي بيلاقي «احمد» حتى لو مكتوب «أَحْمَد».', 'Build a search over 10 Arabic names that finds `احمد` even when written `أَحْمَد`.'),
        B('زوّد نمط تاريخ رابع (`5 Oct 2026`) لدالة `to_iso` بـ dict لأسماء الشهور.', 'Add a fourth date pattern (`5 Oct 2026`) to `to_iso` with a dict of month names.')
      ],
      code: [
        { u: B('سعر من أي شكل', 'A price from any format'), p: 'import re\nDIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩٫٬", "0123456789.,")\n\ndef parse_price(text: str) -> float | None:\n    text = text.translate(DIGITS)\n    m = re.search(r"\\d[\\d,]*(?:\\.\\d+)?", text)\n    return float(m.group().replace(",", "")) if m else None\n\nfor t in ["1,250.50 EGP", "١٬٢٥٠٫٥٠ ج.م", "EGP 99", "free"]:\n    print(t, "->", parse_price(t))', run: 1 }
      ],
      words: [
        { t: 'normalization', m: B('توحيد الأشكال المختلفة لنفس القيمة لشكل واحد', 'turning different forms of the same value into one form'), ex: '+20 10… and 010… → 010…' },
        { t: 'diacritics', m: B('علامات التشكيل في العربي (فتحة وضمة وشدة…)', 'the Arabic vowel marks (fatha, damma, shadda…)'), ex: 'مُحَمَّد → محمد' },
        { t: 'str.translate', m: B('بتبدّل حروف بحروف حسب جدول من maketrans', 'swaps characters using a table from maketrans'), ex: 's.translate(str.maketrans("٠١", "01"))' },
        { t: 'Arabic-Indic digits', m: B('الأرقام ٠١٢٣ المستخدمة في الكتابة العربية', 'the digits `٠١٢٣` used in Arabic script'), ex: '٢٠٢٦ → 2026' },
        { t: 'ISO date', m: B('شكل التاريخ العالمي YYYY-MM-DD', 'the international date format YYYY-MM-DD'), ex: '2026-10-01' },
        { t: 'lookahead', m: B('(?=...) بيشترط حاجة بعد التطابق من غير ما ياخدها', '(?=...) requires something after the match without taking it'), ex: '(?:20)(?=1)' }
      ],
      read: [{ lib: 'Built-in Types', what: B('اقرا str.maketrans وstr.translate.', 'Read str.maketrans and str.translate.') }, { lib: 'Hsoub Wiki (docs in Arabic)', what: B('صفحة التعابير النمطية في Python بالعربي.', 'The Python regular expressions page in Arabic.') }],
      challenge: B('اكتب موديول `clean_ar.py` فيه `normalise_ar` و`normalise_eg_mobile` و`to_iso` و`parse_price` مع 20 assert، واستخدمه تنضّف قايمة 15 عميل مكتوبة بإيد ناس مختلفين (أسماء بتشكيل، موبايلات بكل الأشكال، تواريخ هندي).', 'Write a `clean_ar.py` module with `normalise_ar`, `normalise_eg_mobile`, `to_iso` and `parse_price` plus 20 asserts, and use it to clean a list of 15 customers typed by different people (names with diacritics, phones in every format, dates in Arabic digits).'),
      quiz: [
        { q: B('`"٤٥".translate(str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789"))`:', '`"٤٥".translate(str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789"))`:'), o: ['"45"', '45', '`"٤٥"`'], a: 0, why: B('نص بأرقام إنجليزي.', 'A string with Western digits.') },
        { q: B('ليه نشيل التشكيل قبل المقارنة؟', 'Why remove diacritics before comparing?'), o: [B('عشان «مُحَمَّد» و«محمد» يبقوا واحد', 'so `مُحَمَّد` and `محمد` compare equal'), B('عشان الملف يصغر', 'to shrink the file'), B('Python مبتقراش التشكيل', 'Python cannot read diacritics')], a: 0, why: B('نفس الكلمة بأشكال مختلفة.', 'The same word in different forms.') },
        { q: B('`re.sub(r"\\D", "", "+20 (10) 12")`:', '`re.sub(r"\\D", "", "+20 (10) 12")`:'), o: ['"201012"', '"+201012"', '"20 10 12"'], a: 0, why: B('\\D = أي حاجة مش رقم.', '\\D is any non-digit.') }
      ] },

    { title: B('تحليل نصوص شبه منظمة، وامتى مستخدمش Regex', 'Parsing semi-structured text, and when not to use regex'),
      goal: B('تطلّع حقول من رسايل وفواتير ولوجات، وتتحقق من المدخلات، وتعرف إن JSON وCSV وHTML ليهم أدوات أحسن من Regex، وتتجنب الأنماط اللي بتعلّق.', 'Extract fields from messages, invoices and logs, validate input, know that JSON, CSV and HTML have better tools than regex, and avoid patterns that hang.'),
      learn: [
        { h: B('رسايل بشكل ثابت', 'Messages with a fixed shape'),
          p: B('إيميلات الطلبات ورسايل البنك وإشعارات الشحن ليها شكل ثابت. اكتب Regex بأسماء لكل حقل، وجرّبه على 5 أمثلة حقيقية على الأقل، وخلّي الكود يقول بوضوح لو رسالة مطابقتش (متسكتش). ده بالظبط اللي بتعمله في n8n قبل ما تحط البيانات في شيت.', 'Order emails, bank messages and shipping notices have a fixed shape. Write a named-group pattern for each field, test it on at least 5 real examples, and make the code say clearly when a message does not match (never stay silent). This is exactly what you do in n8n before putting data in a sheet.'),
          ex: 'import re\nSMS = re.compile(r"(?:Purchase|Payment) of (?P<amount>[\\d,.]+) (?P<cur>[A-Z]{3}) at (?P<shop>.+?) on (?P<date>\\d{2}/\\d{2}/\\d{4})", re.I)\nmessages = [\n    "Purchase of 1,250.00 EGP at Nile Mart on 30/09/2026. Balance 3,400.",\n    "Payment of 89.99 USD at Cloud Host on 01/10/2026",\n    "Your OTP is 4412",\n]\nfor msg in messages:\n    m = SMS.search(msg)\n    print(m.groupdict() if m else f"no match: {msg!r}")', run: 1 },
        { h: B('التحقق من المدخلات', 'Validating input'),
          p: B('للتحقق استخدم `fullmatch` (مش search)، وخلي النمط دقيق على قد الحاجة. الإيميل مثلًا: نمط بسيط للتحقق المبدئي كفاية، والتأكيد الحقيقي بإيميل تفعيل. متحاولش تكتب Regex «كامل» لكل حالة في الدنيا.', 'For validation use `fullmatch` (not search) and keep the pattern exactly as strict as needed. For email, a simple pattern is enough as a first check; real confirmation comes from a verification email. Do not try to write the «perfect» regex for every case in the world.'),
          ex: 'import re\nRULES = {\n    "username": r"[a-z][a-z0-9_]{2,15}",\n    "postcode": r"\\d{5}",\n    "sku": r"[A-Z]{3}-\\d{4}",\n    "email": r"[^@\\s]+@[^@\\s]+\\.[a-z]{2,}",\n}\n\ndef valid(kind: str, value: str) -> bool:\n    return re.fullmatch(RULES[kind], value.strip(), re.I if kind == "email" else 0) is not None\n\nfor kind, value in [("username", "sara_88"), ("username", "8sara"), ("sku", "ABC-1234"), ("sku", "AB-12"), ("email", "a@b.co"), ("email", "a@b")]:\n    print(kind, value, valid(kind, value))', run: 1 },
        { h: B('امتى مستخدمش Regex', 'When not to use regex'),
          p: B('JSON → `json`، CSV → `csv` (الفواصل جوه علامات التنصيص هتبوّظ أي Regex)، HTML → BeautifulSoup (أسبوع 16)، التواريخ → `datetime.strptime`، الـ URLs → `urllib.parse`. وخلي بالك من الأنماط المتداخلة زي `(a+)+$` على نص طويل: ممكن تاخد دقايق (catastrophic backtracking).', 'JSON → `json`, CSV → `csv` (commas inside quotes break any regex), HTML → BeautifulSoup (week 16), dates → `datetime.strptime`, URLs → `urllib.parse`. And beware nested patterns like `(a+)+$` on long text: they can take minutes (catastrophic backtracking).'),
          ex: 'import csv, io, re\nfrom urllib.parse import urlparse, parse_qs\nline = \'1042,"Ahmed, Sara",1250\'\nprint(line.split(","))                       # wrong: 4 parts\nprint(next(csv.reader(io.StringIO(line))))  # right: 3 parts\nu = urlparse("https://shop.example.com/search?q=bag&page=2")\nprint(u.netloc, u.path, parse_qs(u.query))', run: 1 }
      ],
      practice: [
        B('اكتب Regex لإشعار شحن (رقم الشحنة، الحالة، التاريخ) وجرّبه على 5 رسايل كتبتها.', 'Write a pattern for a shipping notice (tracking number, status, date) and test it on 5 messages you write.'),
        B('اعمل `valid()` لـ 5 أنواع مدخلات في شغلك وجرّب لكل واحد حالة صح وحالة غلط.', 'Make `valid()` for 5 input types from your work and try a valid and an invalid case for each.'),
        B('قسّم سطر CSV فيه فاصلة جوه علامات تنصيص بـ split وبـ csv وشوف الفرق.', 'Split a CSV line with a comma inside quotes using split and using csv, and see the difference.'),
        B('طلّع الدومين والـ query من 3 لينكات بـ `urllib.parse` بدل Regex.', 'Get the domain and query of 3 links with `urllib.parse` instead of regex.')
      ],
      code: [
        { u: B('من إيميلات طلبات لجدول', 'From order emails to a table'), p: 'import re\nEMAIL = re.compile(r"""\nOrder\\s+\\#(?P<order>\\d+).*?\nName:\\s*(?P<name>[^\\n]+).*?\nPhone:\\s*(?P<phone>[+\\d\\s-]+).*?\nTotal:\\s*(?P<total>[\\d,.]+)\n""", re.S | re.X)\nbody = """Thanks for your order!\nOrder #5521\nName: Huda Kamal\nPhone: +20 100 222 3333\nItems: 3\nTotal: 1,480.00 EGP"""\nm = EMAIL.search(body)\nrow = m.groupdict()\nrow["total"] = float(row["total"].replace(",", ""))\nrow["phone"] = re.sub(r"\\D", "", row["phone"])\nprint(row)', run: 1 }
      ],
      words: [
        { t: 'semi-structured text', m: B('نص ليه شكل ثابت تقريبًا بس مش JSON أو CSV', 'text with a roughly fixed shape that is not JSON or CSV'), ex: 'bank SMS, order emails' },
        { t: 'validation', m: B('التأكد إن القيمة بالشكل الصح قبل ما تقبلها', 'checking a value has the right shape before accepting it'), ex: 're.fullmatch(r"\\d{5}", zip)' },
        { t: 'parser', m: B('أداة مخصوصة بتفهم شكل معيّن (json وcsv وHTML)', 'a dedicated tool that understands a format (json, csv, HTML)'), ex: 'csv.reader' },
        { t: 'urllib.parse', m: B('موديول تفكيك وبناء اللينكات', 'the module for splitting and building URLs'), ex: 'urlparse(url).netloc' },
        { t: 'catastrophic backtracking', m: B('نمط متداخل بياخد وقت ضخم على نصوص معيّنة', 'a nested pattern taking a huge time on certain text'), ex: '(a+)+$' },
        { t: 're.DOTALL', m: B('flag بيخلي النقطة تمسك السطر الجديد كمان (re.S)', 'a flag letting the dot match newlines too (re.S)'), ex: 're.search(p, body, re.S)' }
      ],
      read: [{ lib: 'Regular Expression HOWTO', what: B('اقرا Common Problems.', 'Read Common Problems.') }, { lib: 'Real Python Tutorials', what: B('دوّر على «regex python» واقرا جزء «when to avoid».', 'Search for «regex python» and read the part on when to avoid it.') }],
      challenge: B('اكتب `parse_orders.py`: ملف نصي فيه 10 إيميلات طلبات ملزوقة ورا بعض (بينهم سطر `---`). طلّع لكل إيميل dict (رقم الطلب والاسم والموبايل الموحّد والإجمالي والمنتجات)، واكتبهم في `orders.json`، واطبع أي إيميل مطابقش بوضوح.', 'Write `parse_orders.py`: a text file with 10 order emails one after another (separated by `---`). Turn each email into a dict (order number, name, normalised mobile, total and products), write them to `orders.json`, and clearly print any email that did not match.'),
      quiz: [
        { q: B('ملف CSV فيه فواصل جوه علامات تنصيص، الأحسن:', 'A CSV with commas inside quotes; best tool:'), o: [B('موديول csv', 'the csv module'), B('split(",")', 'split(",")'), B('Regex', 'a regex')], a: 0, why: B('csv بيفهم علامات التنصيص.', 'csv understands quoting.') },
        { q: B('`re.S` (DOTALL) بيعمل:', '`re.S` (DOTALL):'), o: [B('النقطة تمسك السطر الجديد', 'lets the dot match newlines'), B('من غير فرق حروف', 'ignores case'), B('مسافات في النمط', 'allows spaces in the pattern')], a: 0, why: B('مفيد لنص من كذا سطر.', 'Useful for multi-line text.') },
        { q: B('للتحقق إن كود بريدي 5 أرقام بالظبط:', 'To check a postcode is exactly 5 digits:'), o: ['re.fullmatch(r"\\d{5}", s)', 're.search(r"\\d{5}", s)', 're.findall(r"\\d", s)'], a: 0, why: B('search هتقبل "123456".', 'search would accept "123456".') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تنضّف بيانات عملاء حقيقية الشكل من نص متلخبط لبيانات جاهزة، وتعدّي الاختبار.', 'Clean realistic customer data from a messy dump into ready data, and pass the test.'),
      review: [
        B('search وfindall وfullmatch، و\\d \\w \\s . والكميات والمراسي.', 'search, findall and fullmatch, \\d \\w \\s ., quantities and anchors.'),
        B('الـ groups بالأرقام والأسماء، وfinditer، و|، والكسول.', 'Numbered and named groups, finditer, | and lazy quantities.'),
        B('re.sub بـ backreferences ودوال، وsplit، والـ flags، وcompile.', 're.sub with backreferences and functions, split, flags and compile.'),
        B('توحيد الموبايلات والتواريخ والأسعار، وتطبيع العربي والأرقام الهندي.', 'Normalising phones, dates and prices, and Arabic text and digits.'),
        B('النصوص شبه المنظمة، والتحقق، وامتى تستخدم parser بدل Regex.', 'Semi-structured text, validation, and when to use a parser instead of regex.')
      ],
      project: B('**منظّف بيانات العملاء** (`customer_cleaner/`): عندك ملف `raw_customers.txt` (اعمله بسكربت أو بإيدك) فيه 30 عميل مكتوبين بأشكال مختلفة جدًا (أسماء بتشكيل، موبايلات بكل الصيغ وأرقام هندي، إيميلات بحروف كبيرة ومسافات، تواريخ تسجيل بـ 3 صيغ، مدن مكتوبة «القاهره» و«القاهرة» و«cairo»). الأداة تطلّع `customers_clean.csv` (utf-8-sig) و`rejected.txt` بالسطور اللي فيها حاجة مش صالحة وسببها، وتطبع ملخص: كام عميل سليم، وكام رقم اتصلّح، والمكرر بعد التطبيع. استخدم موديول `clean_ar.py` بتاعك واختباراته.', '**The customer data cleaner** (`customer_cleaner/`): you have `raw_customers.txt` (made by a script or by hand) with 30 customers written very differently (names with diacritics, phones in every format and Arabic digits, emails with capitals and spaces, sign-up dates in 3 formats, cities written `القاهره`, `القاهرة` and `cairo`). The tool writes `customers_clean.csv` (utf-8-sig) and `rejected.txt` with the lines that had something invalid and why, and prints a summary: how many customers are clean, how many numbers were fixed, and the duplicates after normalising. Use your `clean_ar.py` module and its tests.'),
      test: [
        { q: B('`re.findall(r"[aeiou]", "regex")`:', '`re.findall(r"[aeiou]", "regex")`:'), o: ['["e", "e"]', '["r", "g", "x"]', '"ee"'], a: 0, why: B('حرف من المجموعة كل مرة.', 'One character from the set each time.') },
        { q: B('`\\d{2,3}` على "12345" بـ findall:', '`\\d{2,3}` on "12345" with findall:'), o: ['["123", "45"]', '["12", "34"]', '["12345"]'], a: 0, why: B('جشعة: بتاخد 3 الأول.', 'Greedy: takes 3 first.') },
        { q: B('`^` في أول النمط معناها:', '`^` at the start of a pattern means:'), o: [B('أول النص', 'the start of the text'), B('مش', 'not'), B('أس', 'a power')], a: 0, why: B('جوه [] بس معناها «مش».', 'Only inside [] does it mean «not».') },
        { q: B('`re.search(r"x", "abc")`:', '`re.search(r"x", "abc")`:'), o: ['None', '""', B('خطأ', 'an error')], a: 0, why: B('مفيش تطابق.', 'No match.') },
        { q: B('`m.groupdict()` بترجّع:', '`m.groupdict()` returns:'), o: [B('dict بالـ groups اللي ليها أسماء', 'a dict of the named groups'), B('قايمة', 'a list'), B('نص', 'a string')], a: 0, why: B('اسم → قيمة.', 'name → value.') },
        { q: B('`re.sub(r"a+", "a", "caaat")`:', '`re.sub(r"a+", "a", "caaat")`:'), o: ['"cat"', '"caaat"', '"ct"'], a: 0, why: B('كل الـ a ورا بعض بقت واحدة.', 'The run of a became one.') },
        { q: B('عشان تطابق «Error» و«ERROR» و«error»:', 'To match «Error», «ERROR» and «error»:'), o: ['re.I', 're.M', 're.X'], a: 0, why: B('IGNORECASE.', 'IGNORECASE.') },
        { q: B('`"آمال".replace("آ", "ا")` مثال على:', '`"آمال".replace("آ", "ا")` is an example of:'), o: [B('تطبيع العربي', 'Arabic normalisation'), B('تشفير', 'encryption'), B('ترجمة', 'translation')], a: 0, why: B('توحيد أشكال الألف.', 'Unifying alef forms.') },
        { q: B('`r"\\bcat\\b"` على "concat cat":', '`r"\\bcat\\b"` on "concat cat":'), o: [B('بيمسك cat التانية بس', 'matches only the second cat'), B('الاتنين', 'both'), B('ولا واحدة', 'neither')], a: 0, why: B('\\b حدود كلمة.', '\\b is a word boundary.') },
        { q: B('`(?P<id>\\d+)` الـ id هي:', 'In `(?P<id>\\d+)` id is:'), o: [B('اسم الـ group', 'the group’s name'), B('متغير Python', 'a Python variable'), B('flag', 'a flag')], a: 0, why: B('named group.', 'A named group.') },
        { q: B('أنسب أداة لاستخراج بيانات من HTML:', 'The best tool to extract data from HTML:'), o: ['BeautifulSoup', 'Regex', 'split'], a: 0, why: B('parser مخصوص.', 'A dedicated parser.') },
        { q: B('`re.split(r"\\s*,\\s*", "a , b,c")`:', '`re.split(r"\\s*,\\s*", "a , b,c")`:'), o: ['["a", "b", "c"]', '["a ", " b", "c"]', '["a,b,c"]'], a: 0, why: B('المسافات حوالين الفاصلة اتشالت.', 'The spaces around commas are gone.') }
      ] }
  ]
};
