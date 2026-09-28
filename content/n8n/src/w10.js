// n8n week 10 — Regex and cleaning text.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('Regex وتنظيف النصوص', 'Regex and cleaning text'),
  goal: B('تستخدم الـ regex عشان تطلّع أرقام وإيميلات وتواريخ من نص حر، وتتحقق من المدخلات، وتنضّف وتوحّد النصوص (عربي وإنجليزي)، وتقسّم رسايل طويلة لبيانات منظمة.',
          'Use regex to extract numbers, emails and dates from free text, validate input, clean and standardise text (Arabic and English), and split long messages into structured data.'),
  days: [
    { title: B('أساسيات الـ regex', 'Regex basics'),
      goal: B('تقرا وتكتب patterns بسيطة: فئات الحروف والتكرار والبداية والنهاية.', 'Read and write simple patterns: character classes, repetition, start and end.'),
      learn: [
        { h: B('الحروف الخاصة', 'Special characters'),
          p: B('`\\d` رقم، `\\w` حرف أو رقم أو _، `\\s` مسافة، `.` أي حرف، `[abc]` واحد منهم، `[^abc]` أي حاجة غيرهم. ولو عايز نقطة حقيقية: `\\.`.', '`\\d` a digit, `\\w` a letter, digit or _, `\\s` a space, `.` any character, `[abc]` one of them, `[^abc]` anything else. For a real dot: `\\.`.'),
          ex: '\\d\\d\\d     → "123"\n[A-Z]\\w+   → "Invoice"\n\\.pdf$      → ends with .pdf' },
        { h: B('التكرار', 'Repetition'),
          p: B('`+` مرة أو أكتر، `*` صفر أو أكتر، `?` اختياري، `{3}` بالظبط 3، `{2,4}` من 2 لـ 4.', '`+` one or more, `*` zero or more, `?` optional, `{3}` exactly 3, `{2,4}` from 2 to 4.'),
          ex: '\\d{4}-\\d{2}-\\d{2}   → "2026-09-28"\ncolou?r              → "color" or "colour"' },
        { h: B('البداية والنهاية والـ flags', 'Anchors and flags'),
          p: B('`^` أول النص، `$` آخره. والـ flags: `i` مش فارق كبير/صغير، `g` كل النتايج مش أول واحدة، `m` كل سطر لوحده.', '`^` the start of the text, `$` the end. Flags: `i` ignore case, `g` all matches not just the first, `m` each line separately.'),
          ex: '/^INV-\\d+$/i   → the whole text must be an invoice code' }
      ],
      practice: [
        B('اكتب 5 patterns وجرّبهم في regex101: رقم فاتورة، سنة، كود بريد، امتداد ملف، ساعة.', 'Write 5 patterns and try them in regex101: an invoice number, a year, a postcode, a file extension, a time.'),
        B('اشرح كل pattern بالإنجليزي جزء جزء.', 'Explain each pattern in English piece by piece.'),
        B('جرّب نفس الـ pattern بـ flag i ومن غيره.', 'Try the same pattern with and without the i flag.'),
        B('حل أول 5 دروس في RegexOne.', 'Complete the first 5 lessons of RegexOne.')
      ],
      words: ['quantifier', 'flag',
        { t: 'character class', m: B('مجموعة حروف بين [ ] أو اختصار زي \\d', 'a set of characters in [ ] or a shortcut like \\d'), ex: '[0-9], \\d, \\w' },
        { t: 'anchor (^ $)', m: B('علامات أول وآخر النص', 'marks for the start and end of text'), ex: '^start … end$' },
        { t: 'escape (\\)', m: B('شرطة مايلة بتخلي الحرف الخاص عادي', 'a backslash that makes a special character literal'), ex: '\\. matches a real dot' }],
      read: ['lib:RegexOne', 'lib:regex101'],
      challenge: B('اعمل «regex cheat sheet» شخصي بـ 15 pattern بتستخدمها، كل واحد بمثال بيطابق ومثال مبيطابقش.', 'Make a personal regex cheat sheet of 15 patterns you use, each with a matching and a non-matching example.'),
      quiz: [
        { q: B('`\\d+` بتطابق:', '`\\d+` matches:'), o: [B('رقم واحد أو أكتر', 'one or more digits'), B('حروف', 'letters'), B('مسافة', 'a space')], a: 0, why: B('\\d رقم، + مرة أو أكتر.', '\\d a digit, + one or more.') },
        { q: B('عشان نقطة حقيقية:', 'For a literal dot:'), o: ['\\.', '.', '*'], a: 0, why: B('. لوحدها أي حرف.', '. alone is any character.') },
        { q: B('flag i معناه:', 'The i flag means:'), o: [B('مش فارق كبير وصغير', 'ignore case'), B('كل النتايج', 'all matches'), B('كل سطر', 'each line')], a: 0, why: B('case-insensitive.', 'case-insensitive.') }
      ] },

    { title: B('الاستخراج بالـ regex', 'Extracting with regex'),
      goal: B('تطلّع أجزاء معينة من نص بـ capture groups، وكل النتايج بـ g.', 'Pull specific parts out of text with capture groups, and every match with g.'),
      learn: [
        { h: B('capture groups', 'Capture groups'),
          p: B('الأقواس ( ) بتمسك جزء: `/Invoice #(\\d+) for (\\d+) EGP/` بيطلّع الرقم والمبلغ. في JavaScript: `text.match(re)` بيرجّع [كامل، جزء1، جزء2].', 'Parentheses ( ) capture a part: `/Invoice #(\\d+) for (\\d+) EGP/` pulls out the number and the amount. In JavaScript: `text.match(re)` returns [full, part1, part2].'),
          ex: '{{ $json.subject.match(/#(\\d+)/)?.[1] }}   → "1042"' },
        { h: B('named groups', 'Named groups'),
          p: B('`(?<amount>\\d+)` بيدي الجزء اسم: `m.groups.amount`. أوضح لما الأجزاء كتير.', '`(?<amount>\\d+)` names the part: `m.groups.amount`. Clearer when there are many parts.'),
          ex: 'const m = text.match(/(?<day>\\d{2})\\/(?<month>\\d{2})\\/(?<year>\\d{4})/);\nm.groups.year // "2026"' },
        { h: B('كل النتايج', 'All matches'),
          p: B('`text.match(/\\d+/g)` بيرجّع كل الأرقام في array. ولو محتاج الـ groups لكل نتيجة: `[...text.matchAll(re)]`.', '`text.match(/\\d+/g)` returns every number in an array. If you need the groups for each match: `[...text.matchAll(re)]`.'),
          ex: '"Order 12 and 15".match(/\\d+/g)  → ["12", "15"]' }
      ],
      practice: [
        B('طلّع رقم الطلب والمبلغ من 5 subjects إيميل.', 'Extract the order number and amount from 5 email subjects.'),
        B('طلّع كل الإيميلات من نص طويل بـ g.', 'Extract every email from a long text with g.'),
        B('استخدم named groups لتاريخ بصيغة dd/MM/yyyy.', 'Use named groups for a dd/MM/yyyy date.'),
        B('احمي الاستخراج بـ ?. عشان لو مفيش match.', 'Guard the extraction with ?. in case there\'s no match.')
      ],
      words: ['capture group',
        { t: 'named group', m: B('capture group ليه اسم (?<name>…)', 'a capture group with a name (?<name>…)'), ex: 'm.groups.amount' },
        { t: 'match()', m: B('بيطلّع النتيجة أو null', 'returns the match or null'), ex: 'text.match(/\\d+/)' },
        { t: 'matchAll()', m: B('بيرجّع كل النتايج بالـ groups', 'returns every match with its groups'), ex: '[...text.matchAll(re)]' },
        { t: 'global flag (g)', m: B('flag بيجيب كل النتايج', 'a flag that returns all matches'), ex: '/\\d+/g' }],
      read: ['lib:MDN: Regular expressions'],
      challenge: B('اعمل «order email parser»: إيميلات بصيغ مختلفة، وتطلّع (رقم الطلب، المبلغ، العملة، التاريخ) لكل واحد وتحطهم في Sheet، واللي فشل يتعلّم.', 'Build an "order email parser": emails in different formats, extracting order number, amount, currency and date for each into a sheet, flagging those that fail.'),
      quiz: [
        { q: B('`"#1042".match(/#(\\d+)/)[1]` =', '`"#1042".match(/#(\\d+)/)[1]` ='), o: ['"1042"', '"#1042"', 'null'], a: 0, why: B('[1] = الـ group الأول.', '[1] = the first group.') },
        { q: B('كل الأرقام في نص:', 'All the numbers in a text:'), o: ['text.match(/\\d+/g)', 'text.match(/\\d+/)', 'text.split()'], a: 0, why: B('g = كلهم.', 'g = all.') },
        { q: B('لو مفيش match، `match()` بيرجّع:', 'With no match, `match()` returns:'), o: ['null', '[]', '""'], a: 0, why: B('فلازم ?.', 'So use ?.') }
      ] },

    { title: B('التنضيف والاستبدال', 'Cleaning and replacing'),
      goal: B('تنضّف النصوص: مسافات زيادة، رموز، إيموجي، تشكيل عربي، وتعمل slug.', 'Clean text: extra spaces, symbols, emoji, Arabic diacritics — and make slugs.'),
      learn: [
        { h: B('replace بالـ regex', 'replace with regex'),
          p: B('`text.replace(/\\s+/g, " ").trim()` بيخلي أي مسافات متكررة مسافة واحدة. و`replace(/[^\\d]/g, "")` بيسيب الأرقام بس (للتليفونات).', '`text.replace(/\\s+/g, " ").trim()` turns repeated spaces into one. `replace(/[^\\d]/g, "")` keeps only digits (for phone numbers).'),
          ex: '"  Ali   Hassan  " → "Ali Hassan"\n"+20 (100) 123-4567" → "201001234567"' },
        { h: B('العربي', 'Arabic text'),
          p: B('شيل التشكيل: `replace(/[\\u064B-\\u0652]/g, "")`. ووحّد الألف: `replace(/[أإآ]/g, "ا")`. والتاء المربوطة والياء حسب احتياجك. ده مهم في البحث والمقارنة.', 'Remove diacritics: `replace(/[\\u064B-\\u0652]/g, "")`. Unify alef forms: `replace(/[أإآ]/g, "ا")`. Handle taa marbuta and yaa as needed. This matters for searching and comparing.'),
          ex: '"مُحَمَّد" → "محمد"\n"أحمد" → "احمد"' },
        { h: B('slug', 'Slugs'),
          p: B('slug = نص صالح للـ URL أو اسم ملف: حروف صغيرة، وشرطة بدل المسافة، ومن غير رموز.', 'A slug = text that is safe for a URL or file name: lowercase, hyphens instead of spaces, no symbols.'),
          ex: '{{ $json.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") }}\n"Hello World!" → "hello-world"' }
      ],
      practice: [
        B('نضّف 5 أسماء فيها مسافات ورموز زيادة.', 'Clean 5 names that contain extra spaces and symbols.'),
        B('وحّد 5 أرقام تليفون مصرية لصيغة واحدة.', 'Standardise 5 Egyptian phone numbers into one format.'),
        B('شيل التشكيل ووحّد الألف في 5 كلمات عربي.', 'Remove diacritics and unify alef in 5 Arabic words.'),
        B('اعمل slug لـ 5 عناوين.', 'Make slugs for 5 titles.')
      ],
      words: [
        { t: 'replace() with regex', m: B('استبدال كل اللي بيطابق الـ pattern', 'replace everything that matches the pattern'), ex: 'text.replace(/\\s+/g, " ")' },
        { t: 'whitespace collapse', m: B('تحويل المسافات المتكررة لمسافة واحدة', 'turning repeated spaces into a single space'), ex: '"a   b" → "a b"' },
        { t: 'diacritics (tashkeel)', m: B('علامات التشكيل فوق وتحت الحروف', 'marks above and below letters'), ex: 'مُحَمَّد → محمد' },
        { t: 'Unicode range', m: B('نطاق أكواد حروف في الـ regex', 'a range of character codes in a regex'), ex: '[\\u0600-\\u06FF] = Arabic letters' },
        { t: 'slug', m: B('نص صالح للـ URL: صغير وبشرطات', 'URL-safe text: lowercase with hyphens'), ex: 'hello-world' }],
      read: ['lib:Regular-Expressions.info', 'lib:موسوعة حسوب: JavaScript'],
      challenge: B('اعمل «text normalizer» sub-workflow: بياخد نص ولغة، ويرجّع نسخة نظيفة للعرض ونسخة موحّدة للبحث (من غير تشكيل، ألف موحّدة، حروف صغيرة).', 'Build a "text normaliser" sub-workflow: it takes text and a language, and returns a clean display version plus a normalised search version (no diacritics, unified alef, lowercase).'),
      quiz: [
        { q: B('`"a   b".replace(/\\s+/g, " ")` =', '`"a   b".replace(/\\s+/g, " ")` ='), o: ['"a b"', '"ab"', '"a   b"'], a: 0, why: B('مسافات كتير ← واحدة.', 'Many spaces → one.') },
        { q: B('تسيب الأرقام بس:', 'Keep only digits:'), o: ['replace(/[^\\d]/g, "")', 'replace(/\\d/g, "")', 'trim()'], a: 0, why: B('^ جوه [ ] = غير.', '^ inside [ ] = not.') },
        { q: B('ليه تشيل التشكيل قبل البحث؟', 'Why remove diacritics before searching?'), o: [B('عشان `محمد` و`مُحَمَّد` يتطابقوا', 'so `محمد` and `مُحَمَّد` match'), B('للشكل', 'for looks'), B('إجباري', 'required')], a: 0, why: B('normalization.', 'normalisation.') }
      ] },

    { title: B('التحقق بالـ regex', 'Validating with regex'),
      goal: B('تتحقق من إيميلات وتليفونات وأكواد بـ regex وtest، وتعرف حدود الـ regex.', 'Validate emails, phones and codes with regex and test, and know regex\'s limits.'),
      learn: [
        { h: B('test()', 'test()'),
          p: B('`/^pattern$/.test(text)` بيرجّع true أو false. لازم ^ و$ عشان يطابق النص كله مش جزء منه.', '`/^pattern$/.test(text)` returns true or false. You need ^ and $ so it matches the whole text, not just part of it.'),
          ex: '/^01[0125]\\d{8}$/.test("01012345678") → true (Egyptian mobile)' },
        { h: B('\\b وgreedy/lazy', '\\b and greedy/lazy'),
          p: B('`\\b` حدود كلمة: `/\\bcat\\b/` مش هيطابق «category». و`.*` greedy بياخد أكتر حاجة ممكنة، و`.*?` lazy بياخد أقل حاجة.', '`\\b` is a word boundary: `/\\bcat\\b/` won\'t match "category". `.*` is greedy and takes as much as possible; `.*?` is lazy and takes as little as possible.'),
          ex: '"<b>a</b><b>b</b>".match(/<b>.*?<\\/b>/)[0] → "<b>a</b>"' },
        { h: B('متستخدمش regex لكل حاجة', 'Don\'t use regex for everything'),
          p: B('للإيميل: n8n عنده `.isEmail()`. للـ HTML: HTML node مش regex. للـ JSON: JSON.parse. الـ regex للأنماط البسيطة والمحددة.', 'For email, n8n has `.isEmail()`. For HTML use the HTML node, not regex. For JSON use JSON.parse. Regex is for simple, specific patterns.'),
          ex: 'HTML → HTML node (CSS selectors), not regex' }
      ],
      practice: [
        B('اكتب validators لـ: موبايل مصري، كود بريد 5 أرقام، رقم فاتورة INV-2026-0001.', 'Write validators for an Egyptian mobile, a 5-digit postcode, and an invoice number like INV-2026-0001.'),
        B('جرّب كل واحد على 3 قيم صح و3 غلط.', 'Test each on 3 valid and 3 invalid values.'),
        B('جرّب \\b على كلمة جوه كلمات تانية.', 'Try \\b on a word inside other words.'),
        B('قارن greedy وlazy على نص HTML صغير.', 'Compare greedy and lazy on a small HTML string.')
      ],
      words: [
        { t: 'test()', m: B('بيرجّع true لو النص بيطابق الـ pattern', 'returns true if the text matches the pattern'), ex: '/^\\d+$/.test("42")' },
        { t: 'word boundary (\\b)', m: B('حدود كلمة في الـ regex', 'a word edge in a regex'), ex: '\\bcat\\b' },
        { t: 'greedy vs lazy', m: B('بياخد أكتر حاجة ممكنة ضد أقل حاجة', 'takes as much as possible vs. as little as possible'), ex: '.* vs .*?' },
        { t: 'full match', m: B('الـ pattern يطابق النص كله بـ ^ و$', 'the pattern matches the whole text with ^ and $'), ex: '/^INV-\\d+$/' },
        { t: 'isEmail()', m: B('دالة n8n للتحقق من الإيميل', 'n8n\'s email validation function'), ex: '{{ $json.email.isEmail() }}' }],
      read: ['lib:regex101', 'lib:Python Regex HOWTO'],
      challenge: B('اعمل «form validator» لفورم تسجيل: اسم (حروف بس)، موبايل مصري، إيميل (isEmail)، كود خصم اختياري بصيغة معيّنة، ورد برسالة لكل حقل غلط.', 'Build a "form validator" for a sign-up form: a name (letters only), an Egyptian mobile, an email (isEmail), an optional discount code in a set format, replying with a message for each bad field.'),
      quiz: [
        { q: B('ليه ^ و$ في validator؟', 'Why ^ and $ in a validator?'), o: [B('عشان النص كله يطابق', 'so the whole text must match'), B('للسرعة', 'for speed'), B('مش مهمين', 'they don\'t matter')], a: 0, why: B('من غيرهم جزء يكفي.', 'Without them, a part is enough.') },
        { q: B('`.*?` اسمه:', '`.*?` is:'), o: ['lazy', 'greedy', 'a group'], a: 0, why: B('أقل حاجة.', 'As little as possible.') },
        { q: B('لقراءة HTML استخدم:', 'To read HTML use:'), o: ['HTML node', 'a big regex', 'Wait'], a: 0, why: B('CSS selectors.', 'CSS selectors.') }
      ] },

    { title: B('معالجة النصوص في n8n', 'Text processing in n8n'),
      goal: B('تقسّم نص طويل لـ items، وتصنّف رسايل بالكلمات، وتبني نصوص من قوالب.', 'Split long text into items, classify messages by keywords, and build text from templates.'),
      learn: [
        { h: B('من نص لـ items', 'From text to items'),
          p: B('رسالة فيها سطر لكل طلب؟ `text.split("\\n")` ← filter للسطور الفاضية ← map لـ items. أو Split Out بعد ما تعمل array.', 'A message with one order per line? `text.split("\\n")` → filter empty lines → map to items. Or Split Out after building an array.'),
          ex: 'return $json.text.split("\\n").map(l => l.trim()).filter(Boolean).map(line => ({ json: { line } }));' },
        { h: B('التصنيف بالكلمات', 'Keyword classification'),
          p: B('قبل الـ AI: Switch بـ regex على الكلمات: (refund|استرداد) ← Refunds، (invoice|فاتورة) ← Billing. سريع ومجاني ومضمون للحالات الواضحة.', 'Before AI: a Switch with regex on keywords: `(refund|استرداد)` → Refunds, `(invoice|فاتورة)` → Billing. Fast, free and reliable for clear cases.'),
          ex: 'Switch rule: {{ /(refund|استرداد)/i.test($json.text) }}' },
        { h: B('قوالب النصوص', 'Text templates'),
          p: B('خلّي القوالب في مكان واحد (Sheet أو node Settings) بـ placeholders زي {name}، واستبدلها بـ replace. العميل يعدّل الرسالة من غير ما يلمس الـ workflow.', 'Keep templates in one place (a sheet or a Settings node) with placeholders such as {name}, and fill them with replace. The client edits the message without touching the workflow.'),
          ex: 'template.replace("{name}", $json.name).replace("{amount}", $json.amount)' }
      ],
      practice: [
        B('حوّل رسالة Telegram فيها 5 طلبات (سطر لكل طلب) لـ 5 items.', 'Turn a Telegram message with 5 orders (one per line) into 5 items.'),
        B('صنّف 10 رسايل بـ Switch بالكلمات عربي وإنجليزي.', 'Classify 10 messages with a keyword Switch, in Arabic and English.'),
        B('اعمل قالب رسالة في Sheet واملاه بالبيانات.', 'Store a message template in a sheet and fill it with data.'),
        B('نضّف نصوص الرسايل قبل التصنيف (مسافات، تشكيل).', 'Clean message text before classifying (spaces, diacritics).')
      ],
      words: [
        { t: 'line break (\\n)', m: B('علامة سطر جديد في النص', 'the new-line character in text'), ex: 'text.split("\\n")' },
        { t: 'keyword routing', m: B('توجيه الرسالة حسب كلمات فيها', 'routing a message by the words in it'), ex: '(refund|استرداد) → Refunds' },
        { t: 'placeholder', m: B('مكان في القالب بيتملى بقيمة', 'a spot in a template that gets filled with a value'), ex: 'Hello {name}' },
        { t: 'filter(Boolean)', m: B('بيشيل القيم الفاضية من array', 'removes empty values from an array'), ex: '["a","",null].filter(Boolean)' },
        { t: 'text parsing', m: B('تحويل نص حر لبيانات منظمة', 'turning free text into structured data'), ex: '"2 x Pizza" → { qty: 2, item: "Pizza" }' }],
      read: ['lib:Automate the Boring Stuff with Python', 'lib:n8n Docs: Splitting with conditionals'],
      challenge: B('اعمل «WhatsApp/Telegram order taker»: العميل يبعت طلبه نص حر («2 بيتزا، 1 كولا»)، والـ workflow يحوّله items بكمية وصنف، ويحسب السعر من Sheet، ويرد بملخص.', 'Build a "Telegram order taker": the customer sends an order as free text ("2 pizza, 1 cola"); the workflow turns it into items with quantity and product, prices it from a sheet, and replies with a summary.'),
      quiz: [
        { q: B('تقسّم نص لسطور:', 'Split text into lines:'), o: ['text.split("\\n")', 'text.join()', 'text.lines'], a: 0, why: B('\\n سطر جديد.', '\\n is a new line.') },
        { q: B('للحالات الواضحة، التصنيف بالكلمات:', 'For clear cases, keyword classification is:'), o: [B('سريع ومجاني ومضمون', 'fast, free and reliable'), B('أسوأ من AI دايمًا', 'always worse than AI'), B('مستحيل', 'impossible')], a: 0, why: B('ابدأ بيه.', 'Start with it.') },
        { q: B('ليه القوالب في Sheet؟', 'Why keep templates in a sheet?'), o: [B('العميل يعدّلها من غير الـ workflow', 'the client edits them without the workflow'), B('للأمان', 'security'), B('أسرع', 'faster')], a: 0, why: B('فصل المحتوى عن المنطق.', 'Separates content from logic.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 11 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 11 opens when you score 70% or more.'),
      review: [
        B('\\d \\w \\s . [ ] + * ? {n} ^ $ والـ flags.', '\\d \\w \\s . [ ] + * ? {n} ^ $ and flags.'),
        B('capture groups وnamed groups وmatch/matchAll وg.', 'Capture groups, named groups, match/matchAll and g.'),
        B('replace للتنضيف، والعربي، والـ slug.', 'replace for cleaning, Arabic text, and slugs.'),
        B('test() بـ ^$ و\\b وgreedy/lazy، ومتستخدمش regex لكل حاجة.', 'test() with ^$, \\b and greedy/lazy — and don\'t use regex for everything.'),
        B('نص ← items، والتصنيف بالكلمات، والقوالب.', 'Text → items, keyword classification and templates.')
      ],
      project: B('ابني «inbox classifier» بالعربي والإنجليزي: إيميلات أو رسايل Telegram بتتنضّف، وتتصنّف بالكلمات (billing، refunds، support، spam)، ويطلع منها رقم الطلب والمبلغ والتليفون لو موجودين، وتتسجّل في Sheet، ويتبعت رد تلقائي من قالب مناسب لكل نوع. وملف اختبار فيه 20 رسالة ونتيجتها المتوقعة.',
                 'Build an "inbox classifier" for Arabic and English: emails or Telegram messages are cleaned, classified by keywords (billing, refunds, support, spam), have the order number, amount and phone extracted when present, get logged in a sheet, and receive an automatic reply from the right template. Include a test file of 20 messages with their expected results.'),
      test: [
        { q: B('`\\w` بتطابق:', '`\\w` matches:'), o: [B('حرف أو رقم أو _', 'a letter, digit or _'), B('مسافة', 'a space'), B('نقطة', 'a dot')], a: 0, why: B('word character.', 'a word character.') },
        { q: B('`\\d{4}` بتطابق:', '`\\d{4}` matches:'), o: [B('4 أرقام', '4 digits'), B('رقم 4', 'the digit 4'), B('4 حروف', '4 letters')], a: 0, why: B('{4} بالظبط.', '{4} exactly.') },
        { q: B('`?` بعد حرف معناها:', '`?` after a character means:'), o: [B('اختياري', 'optional'), B('سؤال', 'a question'), B('كتير', 'many')], a: 0, why: B('صفر أو مرة.', 'zero or one.') },
        { q: B('الأقواس ( ) في regex:', 'Parentheses ( ) in a regex:'), o: ['capture a group', 'are ignored', 'mean optional'], a: 0, why: B('تمسك جزء.', 'They capture a part.') },
        { q: B('`m.groups.year` بيشتغل مع:', '`m.groups.year` works with:'), o: ['(?<year>\\d{4})', '(\\d{4})', '[year]'], a: 0, why: B('named group.', 'a named group.') },
        { q: B('كل الإيميلات في نص:', 'Every email in a text:'), o: [B('match مع flag g', 'match with the g flag'), B('match من غير g', 'match without g'), B('split', 'split')], a: 0, why: B('g = كلهم.', 'g = all.') },
        { q: B('تشيل التشكيل العربي بـ:', 'Remove Arabic diacritics with:'), o: ['replace(/[\\u064B-\\u0652]/g, "")', 'trim()', 'toLowerCase()'], a: 0, why: B('نطاق التشكيل.', 'The diacritics range.') },
        { q: B('slug لـ "Hello World!":', 'The slug for "Hello World!":'), o: ['hello-world', 'Hello World!', 'HELLO_WORLD!'], a: 0, why: B('صغير وشرطات.', 'Lowercase with hyphens.') },
        { q: B('`/\\bcat\\b/` مع "category":', '`/\\bcat\\b/` against "category":'), o: [B('مش بيطابق', 'no match'), B('بيطابق', 'matches'), B('خطأ', 'error')], a: 0, why: B('حدود كلمة.', 'Word boundary.') },
        { q: B('validator من غير ^ و$:', 'A validator without ^ and $:'), o: [B('ممكن يقبل نص فيه جزء صح بس', 'may accept text that is only partly valid'), B('أدق', 'is stricter'), B('نفس الحاجة', 'is the same')], a: 0, why: B('لازم full match.', 'Needs a full match.') },
        { q: B('للإيميل في n8n الأسهل:', 'For email validation in n8n the easiest is:'), o: ['.isEmail()', 'a 200-character regex', 'Wait'], a: 0, why: B('جاهزة.', 'Built in.') },
        { q: B('`["a","",null].filter(Boolean)` =', '`["a","",null].filter(Boolean)` ='), o: ['["a"]', '["a","",null]', '[]'], a: 0, why: B('بيشيل الفاضي.', 'Removes empties.') }
      ] }
  ]
};
