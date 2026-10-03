// JavaScript week 3 — conditions and loops.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('الشروط والتكرار', 'Conditions and loops'),
  goal: B('تخلي البرنامج ياخد قرارات (if/else وswitch والحماية بدري) ويكرّر شغل (for وfor...of وwhile وbreak/continue)، وتكتب منطق قواعد شغل حقيقية زي التسعير والخصومات وإعادة المحاولة.',
          'Make programs decide (if/else, switch and early guards) and repeat work (for, for...of, while, break/continue), and write the logic of real business rules such as pricing, discounts and retries.'),
  days: [
    { title: B('if وelse if وelse', 'if, else if and else'),
      goal: B('تكتب قرارات بفروع، وترتّب الشروط صح، وتحط أقواس {} دايمًا.', 'Write decisions with branches, order conditions correctly, and always use {} braces.'),
      learn: [
        { h: B('القرار الأبسط: if', 'The simplest decision: if'),
          p: B('`if (condition) { ... }` بينفّذ البلوك لو الشرط truthy. الشرط بين أقواس `()`، والكود بين `{}`. حتى لو سطر واحد، **حط {} دايمًا** — من غيرها لو زوّدت سطر تاني بعدين هيتنفّذ دايمًا ومش هتاخد بالك. والمسافة الداخلية (indentation) مش بتفرق مع JS بس بتفرق مع اللي بيقرا.',
            '`if (condition) { ... }` runs the block when the condition is truthy. The condition goes in `()` and the code in `{}`. Even for one line, **always use {}** — without them, a second line you add later will always run and you will not notice. Indentation does not matter to JS, but it matters to whoever reads it.'),
          ex: 'const stock = 3;\nif (stock < 5) {\n  console.log("Reorder soon: only", stock, "left");\n}\nif (stock === 0) {\n  console.log("Out of stock");\n}\nconsole.log("check done");', run: 'js' },
        { h: B('else وelse if', 'else and else if'),
          p: B('`else` للحالة العكسية. و`else if` لفروع كتير: JS بيجرّب الشروط **بالترتيب** وبينفّذ **أول** واحد صح بس ويسيب الباقي. فرتّب من الأخص للأعم: لو كتبت `total > 1000` قبل `total > 5000`، الـ 5000 عمرها ما هتتنفّذ. آخر `else` هو «أي حاجة تانية».',
            '`else` handles the opposite case. And `else if` gives many branches: JS tries the conditions **in order** and runs only the **first** true one, skipping the rest. So order them from most specific to most general: if you write `total > 1000` before `total > 5000`, the 5000 branch never runs. The final `else` means «anything else».'),
          ex: 'function tier(total) {\n  if (total >= 5000) {\n    return "gold";\n  } else if (total >= 1000) {\n    return "silver";\n  } else if (total > 0) {\n    return "bronze";\n  } else {\n    return "none";\n  }\n}\nfor (const t of [7000, 1500, 200, 0]) console.log(t, tier(t));', run: 'js' },
        { h: B('شروط مركّبة بـ && و||', 'Combined conditions with && and ||'),
          p: B('القواعد الحقيقية فيها أكتر من شرط: «شحن مجاني لو الإجمالي ≥ 1000 **أو** العميل VIP، **و** المدينة مش برّه التغطية». حط أقواس حوالين كل مجموعة عشان المعنى يبقى واضح: `(a || b) && !c`. ولو الشرط طويل، خزّنه في متغير باسم: `const freeShipping = ...;` وبعدين `if (freeShipping)`.',
            'Real rules have more than one condition: «free shipping when the total ≥ 1000 **or** the customer is VIP, **and** the city is not outside coverage». Put brackets around each group so the meaning is clear: `(a || b) && !c`. If the condition gets long, store it in a named variable: `const freeShipping = ...;` then `if (freeShipping)`.'),
          ex: 'const order = { total: 650, vip: true, city: "Aswan" };\nconst outside = ["Halayeb", "Shalateen"];\nconst freeShipping = (order.total >= 1000 || order.vip) && !outside.includes(order.city);\nif (freeShipping) {\n  console.log("Free shipping for", order.city);\n} else {\n  console.log("Shipping fee applies");\n}', run: 'js' },
        { h: B('الحماية بدري (guard clauses)', 'Early guards (guard clauses)'),
          p: B('بدل ما تكتب if جوه if جوه if، **اخرج بدري** من الحالات الغلط: `if (!order) return "no order";` في أول الدالة، وبعدها الحالة العادية من غير تداخل. الكود بيبقى مسطّح وسهل القراية، وكل حالة غلط ليها رسالة واضحة. ده أهم نمط هتستخدمه في Code node.',
            'Instead of if inside if inside if, **leave early** in the wrong cases: `if (!order) return "no order";` at the top of the function, then the normal case with no nesting. The code stays flat and easy to read, and every wrong case has a clear message. It is the most important pattern you will use in a Code node.'),
          ex: 'function canShip(order) {\n  if (!order) return "no order";\n  if (!order.paid) return "not paid yet";\n  if (!order.address) return "missing address";\n  if (order.items === 0) return "empty order";\n  return "ready to ship";\n}\nconsole.log(canShip(null));\nconsole.log(canShip({ paid: false }));\nconsole.log(canShip({ paid: true, address: "Giza", items: 2 }));', run: 'js' },
        { h: B('النطاق: المتغيرات جوه البلوك', 'Scope: variables inside a block'),
          p: B('أي متغير let أو const اتعرّف جوه `{}` موجود **جوه البلوك بس**. لو محتاجه بعد الـ if، عرّفه قبلها بـ let وغيّر قيمته جوه الفروع. ده بيحميك إن أسماء من فرع تتلخبط مع فرع تاني. لو لقيت `ReferenceError: x is not defined` بعد if، غالبًا عرّفته جوه.',
            'Any let or const declared inside `{}` exists **only inside that block**. If you need it after the if, declare it before with let and set it inside the branches. This keeps names in one branch from clashing with another. If you see `ReferenceError: x is not defined` after an if, you probably declared it inside.'),
          ex: 'const total = 1800;\nlet discount = 0;          // declared outside, so it lives after the if\nif (total > 1000) {\n  const rate = 0.1;        // only inside this block\n  discount = total * rate;\n}\nconsole.log("discount", discount);\nconsole.log(typeof rate);   // "undefined": rate is gone', run: 'js' }
      ],
      practice: [
        B('اكتب دالة بتصنّف درجة طالب (امتياز، جيد جدًا، جيد، مقبول، راسب) بـ else if.', 'Write a function grading a student (excellent, very good, good, pass, fail) with else if.'),
        B('اعكس ترتيب الشروط عمدًا وشوف إزاي النتيجة بتغلط، وبعدين صلّحه.', 'Reverse the order of the conditions on purpose, see the results go wrong, then fix it.'),
        B('اكتب قاعدة شحن مجاني بشرطين أو أكتر في متغير باسم.', 'Write a free-shipping rule with two or more conditions in a named variable.'),
        B('حوّل دالة فيها 3 if متداخلين لـ guard clauses.', 'Turn a function with 3 nested ifs into guard clauses.'),
        B('اكتب متغير جوه بلوك وحاول تقراه برّه، وبعدين صلّح بـ let برّه.', 'Declare a variable inside a block, try to read it outside, then fix it with a let outside.'),
        B('اكتب 5 قواعد من شغلك («لو … يبقى …») كـ if.', 'Write 5 rules from your work («if … then …») as ifs.')
      ],
      code: [
        { u: B('نمط guard في Code node', 'The guard pattern in a Code node'), p: '// n8n Code node, Run Once for Each Item\nconst o = $input.item.json;\nif (!o.email) return { json: { ...o, status: "skip: no email" } };\nif (o.unsubscribed) return { json: { ...o, status: "skip: unsubscribed" } };\nreturn { json: { ...o, status: "send" } };' }
      ],
      words: [
        { t: 'branch', m: B('فرع من فروع الشرط', 'one path of a condition'), ex: 'the else branch' },
        { t: 'guard clause', m: B('شرط في أول الدالة بيخرج بدري من الحالة الغلط', 'a check at the top of a function that leaves early on a bad case'), ex: 'if (!order) return;' },
        { t: 'nested', m: B('جوه بعض (if جوه if)', 'one inside another (if inside if)'), ex: 'nested conditions' },
        { t: 'block', m: B('مجموعة أسطر بين { }', 'a group of lines between { }'), ex: 'if (x) { … }' },
        { t: 'scope', m: B('المكان اللي المتغير موجود ومقري فيه', 'where a variable exists and can be read'), ex: 'block scope' },
        { t: 'business rule', m: B('قاعدة من شغل الشركة بتتحول لكود', 'a company rule turned into code'), ex: 'free shipping over 1000' },
        { t: 'fallback', m: B('القيمة أو الفرع البديل لما مفيش غيره', 'the default value or branch when nothing else applies'), ex: 'the final else' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Conditional branching: if, \'?\' بالتمارين.', 'Conditional branching: if, \'?\' with the exercises.') },
        { lib: 'MDN: JavaScript Guide', what: B('Control flow and error handling: الجزء الخاص بـ if...else.', 'Control flow and error handling: the if...else part.') }],
      challenge: B('اكتب `priceFor(product, customer, qty)` بتطبّق 5 قواعد بالترتيب الصح: سعر الجملة لو qty ≥ 50، خصم 10% للـ VIP، خصم 5% إضافي يوم الجمعة، حد أدنى للسعر 70% من السعر الأصلي، ورفض لو المنتج متوقف — بـ guard clauses وجرّبها على 8 حالات.', 'Write `priceFor(product, customer, qty)` applying 5 rules in the right order: the wholesale price when qty ≥ 50, 10% off for VIPs, an extra 5% on Fridays, a floor of 70% of the original price, and a refusal when the product is discontinued — with guard clauses, tested on 8 cases.'),
      quiz: [
        { q: B('في else if، JS بينفّذ:', 'In else if, JS runs:'), o: [B('أول فرع شرطه صح بس', 'only the first branch whose condition is true'), B('كل الفروع الصح', 'every true branch'), B('آخر فرع', 'the last branch')], a: 0, why: B('وبيسيب الباقي.', 'And skips the rest.') },
        { q: B('ليه تحط {} حتى لسطر واحد؟', 'Why use {} even for one line?'), o: [B('عشان السطر اللي تزوّده بعدين ميهربش', 'so a line added later does not escape'), B('أسرع', 'it is faster'), B('إجباري', 'it is required')], a: 0, why: B('أمان من أخطاء التعديل.', 'Safety against editing mistakes.') },
        { q: B('الـ guard clause بيخلّي الكود:', 'A guard clause makes code:'), o: [B('مسطّح وسهل القراية', 'flat and easy to read'), B('أطول', 'longer'), B('أبطأ', 'slower')], a: 0, why: B('مفيش تداخل.', 'No nesting.') },
        { q: B('const اتعرّف جوه if، تقدر تقراه بعد الـ if؟', 'A const declared inside an if — can you read it after the if?'), o: [B('لأ', 'No'), B('أيوه', 'Yes'), B('ساعات', 'Sometimes')], a: 0, why: B('نطاقه البلوك.', 'Its scope is the block.') }
      ] },

    { title: B('switch والجداول بدل الشروط الطويلة', 'switch, and lookup tables instead of long conditions'),
      goal: B('تستخدم switch لاختيار من قيم كتير، وتعرف إمتى كائن lookup أحسن منه.', 'Use switch to choose among many values, and know when a lookup object is better.'),
      learn: [
        { h: B('switch للقيم الكتير', 'switch for many values'),
          p: B('لما بتقارن **نفس المتغير** بقيم كتير (`status === "new"` و`"paid"` و`"shipped"`...)، `switch (status) { case "new": ...; break; ... default: ... }` أوضح. كل `case` بيتقارن بـ `===`. **متنساش break** — من غيرها JS بيكمّل في الـ case اللي بعدها (fall-through). `default` للحالة اللي ملهاش case.',
            'When you compare **the same variable** with many values (`status === "new"`, `"paid"`, `"shipped"`...), `switch (status) { case "new": ...; break; ... default: ... }` is clearer. Each `case` compares with `===`. **Do not forget break** — without it JS continues into the next case (fall-through). `default` handles anything with no case.'),
          ex: 'function nextAction(status) {\n  switch (status) {\n    case "new":\n      return "send confirmation";\n    case "paid":\n      return "prepare shipment";\n    case "shipped":\n      return "send tracking link";\n    default:\n      return "check manually: " + status;\n  }\n}\nfor (const s of ["new", "paid", "shipped", "lost"]) console.log(s, "→", nextAction(s));', run: 'js' },
        { h: B('break والـ fall-through', 'break and fall-through'),
          p: B('لو حطيت `case` ورا بعض من غير كود بينهم، بيتجمّعوا: `case "sat": case "sun": return "weekend";` — ده الاستخدام المقصود الوحيد للـ fall-through. أي حاجة تانية من غير break غالبًا غلطة. لو جوه الدالة بترجّع بـ `return`، مش محتاج break لأن return بيخرج.',
            'Stacking `case` lines with no code between them groups them: `case "sat": case "sun": return "weekend";` — the only intended use of fall-through. Anything else without break is probably a bug. Inside a function that returns with `return`, you do not need break, because return already leaves.'),
          ex: 'function dayType(day) {\n  switch (day) {\n    case "fri":\n    case "sat":\n      return "weekend";\n    default:\n      return "work day";\n  }\n}\nconsole.log(dayType("fri"), dayType("mon"));\nlet log = "";\nswitch (1) {\n  case 1: log += "one ";\n  case 2: log += "two (fell through!) ";\n}\nconsole.log(log);', run: 'js' },
        { h: B('كائن lookup بدل switch', 'A lookup object instead of switch'),
          p: B('لما كل case بيرجّع **قيمة** بس (مش كود)، كائن أبسط بكتير: `const fees = { cairo: 50, giza: 50, alex: 70 };` وبعدين `fees[city] ?? 90`. سهل تزوّد مدينة، وممكن تيجي من ملف إعدادات أو شيت. ده اسمه **lookup table** وهتستخدمه كتير في n8n مكان IF nodes كتير.',
            'When every case only returns a **value** (not code), an object is much simpler: `const fees = { cairo: 50, giza: 50, alex: 70 };` then `fees[city] ?? 90`. It is easy to add a city, and the table can come from a settings file or a sheet. This is a **lookup table**, and in n8n you will use it in place of many IF nodes.'),
          ex: 'const shippingFees = { cairo: 50, giza: 50, alexandria: 70, aswan: 120 };\nfunction feeFor(city) {\n  const key = String(city ?? "").trim().toLowerCase();\n  return shippingFees[key] ?? 90;\n}\nfor (const c of ["Cairo", " ALEXANDRIA ", "Luxor", null]) console.log(c, feeFor(c));', run: 'js' },
        { h: B('switch (true) للنطاقات', 'switch (true) for ranges'),
          p: B('فيه نمط بتشوفه في الكود: `switch (true) { case total >= 5000: ... }` — كل case شرط. بيشتغل، بس غالبًا `if/else if` أوضح للنطاقات. اعرفه لما تقابله، واختار انت if/else. القاعدة: **switch** لقيم محددة، **if/else** لنطاقات وشروط مركبة، **lookup** لقيم بس.',
            'A pattern you will see: `switch (true) { case total >= 5000: ... }` — each case is a condition. It works, but `if/else if` is usually clearer for ranges. Recognise it, and choose if/else yourself. The rule: **switch** for fixed values, **if/else** for ranges and combined conditions, **lookup** when only values come back.'),
          ex: 'function band(score) {\n  switch (true) {\n    case score >= 90: return "A";\n    case score >= 75: return "B";\n    case score >= 50: return "C";\n    default: return "F";\n  }\n}\nconsole.log([95, 80, 51, 20].map(band).join(" "));', run: 'js' },
        { h: B('رسايل حسب اللغة', 'Messages by language'),
          p: B('مثال عملي للـ lookup: رسايل للعملاء بالعربي والإنجليزي حسب اللغة المحفوظة. `const messages = { ar: {...}, en: {...} };` و`messages[lang]?.thanks ?? messages.en.thanks`. نفس الفكرة للأيقونات حسب نوع الملف، والألوان حسب الحالة، والقوالب حسب نوع الطلب.',
            'A practical lookup: customer messages in Arabic and English by the saved language. `const messages = { ar: {...}, en: {...} };` and `messages[lang]?.thanks ?? messages.en.thanks`. The same idea works for icons by file type, colours by status and templates by request type.'),
          ex: 'const messages = {\n  ar: { thanks: "شكرًا لطلبك!", shipped: "طلبك اتشحن" },\n  en: { thanks: "Thanks for your order!", shipped: "Your order has shipped" }\n};\nfunction msg(lang, key) {\n  return messages[lang]?.[key] ?? messages.en[key] ?? key;\n}\nconsole.log(msg("ar", "thanks"));\nconsole.log(msg("fr", "shipped"));\nconsole.log(msg("en", "unknown_key"));', run: 'js' }
      ],
      practice: [
        B('اكتب switch لحالات طلب (6 حالات) مع default.', 'Write a switch for order statuses (6 statuses) with a default.'),
        B('شيل break من case عمدًا وشوف الـ fall-through، ورجّعه.', 'Remove a break on purpose, watch the fall-through, then put it back.'),
        B('حوّل switch بيرجّع قيم بس لكائن lookup.', 'Turn a switch that only returns values into a lookup object.'),
        B('اعمل جدول رسوم شحن لـ 8 محافظات مع قيمة افتراضية.', 'Make a shipping-fee table for 8 governorates with a default value.'),
        B('اعمل رسايل بلغتين لـ 4 مواقف (شكر، شحن، تأخير، استرجاع).', 'Write messages in two languages for 4 situations (thanks, shipped, delay, refund).'),
        B('اكتب في تعليق إمتى تستخدم switch وإمتى if وإمتى lookup.', 'Write in a comment when to use switch, when if, and when a lookup.')
      ],
      code: [
        { u: B('أيقونة حسب امتداد الملف', 'An icon by file extension'), p: 'const icons = { pdf: "📕", xlsx: "📗", csv: "📗", docx: "📘", png: "🖼", jpg: "🖼" };\nconst iconFor = file => icons[file.split(".").pop().toLowerCase()] ?? "📄";\nconsole.log(["a.PDF", "b.csv", "c.zip"].map(iconFor).join(" "));' }
      ],
      words: [
        { t: 'switch statement', m: B('اختيار فرع حسب قيمة متغير', 'choosing a branch by a variable’s value'), ex: 'switch (status) { … }' },
        { t: 'case', m: B('قيمة واحدة جوه switch', 'one value inside a switch'), ex: 'case "paid":' },
        { t: 'fall-through', m: B('التكملة للـ case اللي بعده لما مفيش break', 'continuing into the next case when there is no break'), ex: 'case "fri": case "sat":' },
        { t: 'default', m: B('الفرع اللي بيتنفّذ لو مفيش case مطابق', 'the branch that runs when no case matches'), ex: 'default: return "other";' },
        { t: 'lookup table', m: B('كائن بيربط مفتاح بقيمة بدل شروط كتير', 'an object mapping keys to values instead of many conditions'), ex: 'fees[city]' },
        { t: 'key', m: B('اسم الخاصية في الكائن', 'a property name in an object'), ex: 'fees["cairo"]' },
        { t: 'configuration', m: B('إعدادات بتتغيّر من غير ما تغيّر الكود', 'settings that change without changing the code'), ex: 'a fees table in a sheet' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('The "switch" statement بالتمارين.', 'The "switch" statement, with the exercises.') },
        { lib: 'MDN: JavaScript Reference', what: B('switch: Description والأمثلة.', 'switch: Description and the examples.') }],
      challenge: B('اكتب «راوتر رسايل» بياخد رسالة عميل (`{ type, lang, text }`) ويقرر: الشكوى لـ support، والسؤال عن السعر لـ sales، وطلب الإلغاء لـ billing، وأي حاجة تانية لـ inbox — بجدول lookup للأقسام وswitch للنوع، ويرجّع رد آلي باللغة الصح من جدول رسايل.', 'Write a «message router» that takes a customer message (`{ type, lang, text }`) and decides: complaints to support, price questions to sales, cancellations to billing and anything else to the inbox — with a lookup table for the teams and a switch for the type, returning an automatic reply in the right language from a messages table.'),
      quiz: [
        { q: B('case في switch بيقارن بـ:', 'A switch case compares with:'), o: ['===', '==', '>'], a: 0, why: B('مقارنة strict.', 'Strict comparison.') },
        { q: B('من غير break:', 'Without break:'), o: [B('بيكمّل في الـ case اللي بعده', 'it continues into the next case'), B('بيقف', 'it stops'), B('خطأ', 'an error')], a: 0, why: B('fall-through.', 'Fall-through.') },
        { q: B('أحسن حاجة لو كل case بيرجّع قيمة بس:', 'The best choice when every case only returns a value:'), o: [B('كائن lookup', 'a lookup object'), B('if متداخلة', 'nested ifs'), B('while', 'while')], a: 0, why: B('أبسط وأسهل تزوّد.', 'Simpler, and easy to extend.') },
        { q: B('`fees["luxor"] ?? 90` لو luxor مش موجود:', '`fees["luxor"] ?? 90` when luxor is missing:'), o: ['90', 'undefined', '0'], a: 0, why: B('?? بيدّي البديل.', '?? gives the fallback.') }
      ] },

    { title: B('حلقات for وfor...of', 'for and for...of loops'),
      goal: B('تكرّر شغل على قوايم وأرقام، وتحسب إجماليات وعدّادات جوه اللوب.', 'Repeat work over lists and numbers, and build totals and counters inside the loop.'),
      learn: [
        { h: B('for...of: لكل عنصر', 'for...of: for each item'),
          p: B('`for (const item of items) { ... }` بيلف على كل عنصر في مصفوفة (أو حروف نص) بالترتيب. ده أوضح شكل وأكتر واحد هتستخدمه. `item` بياخد عنصر جديد كل لفة، فاستخدم const. لو محتاج رقم العنصر كمان: `for (const [i, item] of items.entries())`.',
            '`for (const item of items) { ... }` goes over each item of an array (or the characters of a string) in order. It is the clearest form and the one you will use most. `item` gets a new element each time round, so use const. If you also need the item’s number: `for (const [i, item] of items.entries())`.'),
          ex: 'const orders = [450, 1200, 300, 5100];\nlet total = 0;\nfor (const amount of orders) {\n  total += amount;\n}\nconsole.log("total", total);\nfor (const [i, amount] of orders.entries()) console.log(i + 1, amount);', run: 'js' },
        { h: B('for الكلاسيكي بعدّاد', 'The classic for with a counter'),
          p: B('`for (let i = 0; i < n; i++) { ... }`: 3 أجزاء: البداية (`let i = 0`)، والشرط (`i < n`)، والخطوة (`i++` يعني زوّد 1). مفيد لما تحتاج أرقام (من 1 لـ 12)، أو تمشي بخطوة 2، أو بالعكس (`i--`)، أو تقارن عنصر باللي بعده (`items[i]` و`items[i + 1]`).',
            '`for (let i = 0; i < n; i++) { ... }` has 3 parts: the start (`let i = 0`), the condition (`i < n`) and the step (`i++`, meaning add 1). It is useful when you need numbers (1 to 12), a step of 2, going backwards (`i--`), or comparing an item with the next (`items[i]` and `items[i + 1]`).'),
          ex: 'for (let month = 1; month <= 12; month++) {\n  if (month % 3 === 0) console.log("quarter ends in month", month);\n}\nfor (let i = 10; i > 0; i -= 3) console.log("countdown", i);\nconst prices = [100, 120, 90, 150];\nfor (let i = 0; i < prices.length - 1; i++) {\n  console.log(`${prices[i]} → ${prices[i + 1]}: ${prices[i + 1] > prices[i] ? "up" : "down"}`);\n}', run: 'js' },
        { h: B('عدّادات وإجماليات وأكبر قيمة', 'Counters, totals and the largest value'),
          p: B('أغلب لوبات الأتمتة بتعمل واحدة من دول: **إجمالي** (`sum += x`)، **عدّاد** (`count++` لو شرط)، **أكبر/أصغر** (قارن واحفظ)، أو **تجميع** في كائن (`byCity[city] = (byCity[city] ?? 0) + amount`). عرّف المتغير برّه اللوب بـ let وغيّره جوه.',
            'Most automation loops do one of these: a **total** (`sum += x`), a **counter** (`count++` when a condition holds), the **largest/smallest** (compare and keep), or **grouping** in an object (`byCity[city] = (byCity[city] ?? 0) + amount`). Declare the variable outside the loop with let and change it inside.'),
          ex: 'const sales = [\n  { city: "Cairo", amount: 1200 }, { city: "Giza", amount: 400 },\n  { city: "Cairo", amount: 800 }, { city: "Alex", amount: 2500 }\n];\nlet big = 0, top = null;\nconst byCity = {};\nfor (const s of sales) {\n  if (s.amount >= 1000) big++;\n  if (!top || s.amount > top.amount) top = s;\n  byCity[s.city] = (byCity[s.city] ?? 0) + s.amount;\n}\nconsole.log("big sales", big, "top", top, byCity);', run: 'js' },
        { h: B('اللوب على كائن', 'Looping over an object'),
          p: B('الكائن مش بيتلف عليه بـ for...of مباشرة. استخدم `Object.entries(obj)` (أزواج [مفتاح، قيمة])، أو `Object.keys` (المفاتيح) أو `Object.values` (القيم). `for (const [city, total] of Object.entries(byCity))`. فيه `for...in` قديم بيلف على المفاتيح، بس entries أوضح وأأمن.',
            'You cannot loop over an object directly with for...of. Use `Object.entries(obj)` ([key, value] pairs), or `Object.keys` (the keys) or `Object.values` (the values): `for (const [city, total] of Object.entries(byCity))`. There is an older `for...in` that loops over keys, but entries is clearer and safer.'),
          ex: 'const stock = { notebook: 40, pen: 3, bag: 0, ruler: 12 };\nfor (const [item, qty] of Object.entries(stock)) {\n  const flag = qty === 0 ? "OUT" : qty < 5 ? "low" : "ok";\n  console.log(item.padEnd(10), String(qty).padStart(3), flag);\n}\nconsole.log("items:", Object.keys(stock).length, "units:", Object.values(stock).reduce((a, b) => a + b, 0));', run: 'js' },
        { h: B('لوب جوه لوب', 'A loop inside a loop'),
          p: B('لو عندك طلبات وكل طلب فيه سطور، بتلف على الطلبات وجوه كل طلب تلف على السطور. خلي بالك من الحجم: 1000 × 1000 = مليون لفة. لو بتدوّر عن حاجة في قايمة تانية جوه اللوب، الأحسن تعمل منها كائن lookup مرة واحدة برّه الأول (هنتعلّم Map بعدين).',
            'If you have orders and each order has lines, you loop over the orders and, inside each, over its lines. Watch the size: 1000 × 1000 = a million rounds. If you look something up in another list inside the loop, it is better to build a lookup object from it once, outside, first (we will learn Map later).'),
          ex: 'const orders = [\n  { id: 1, lines: [{ sku: "A", qty: 2, price: 50 }, { sku: "B", qty: 1, price: 120 }] },\n  { id: 2, lines: [{ sku: "A", qty: 5, price: 50 }] }\n];\nfor (const o of orders) {\n  let sum = 0;\n  for (const line of o.lines) sum += line.qty * line.price;\n  console.log("order", o.id, "total", sum);\n}', run: 'js' }
      ],
      practice: [
        B('اجمع وحسب متوسط 10 أسعار بـ for...of.', 'Add up and average 10 prices with for...of.'),
        B('اطبع جدول ضرب رقم 7 من 1 لـ 12 بـ for.', 'Print the 7 times table from 1 to 12 with for.'),
        B('عدّ الطلبات اللي فوق 1000 وطلّع أكبر طلب.', 'Count the orders above 1000 and find the biggest one.'),
        B('جمّع مبيعات حسب المدينة في كائن واطبعه بـ Object.entries.', 'Group sales by city in an object and print it with Object.entries.'),
        B('اكتب لوب جوه لوب يحسب إجمالي كل فاتورة من سطورها.', 'Write a loop inside a loop that totals each invoice from its lines.'),
        B('قارن كل يوم باللي قبله في 7 أيام مبيعات واطبع «طلع/نزل».', 'Compare each day with the one before across 7 days of sales and print «up/down».')
      ],
      code: [
        { u: B('تجميع حسب مفتاح', 'Grouping by a key'), p: 'function sumBy(rows, key, field) {\n  const out = {};\n  for (const r of rows) out[r[key]] = (out[r[key]] ?? 0) + Number(r[field]);\n  return out;\n}\nconsole.log(sumBy([{ c: "Cairo", t: "10" }, { c: "Cairo", t: 5 }, { c: "Alex", t: 7 }], "c", "t"));' }
      ],
      words: [
        { t: 'loop', m: B('تكرار نفس الكود أكتر من مرة', 'repeating the same code several times'), ex: 'for (const x of list) { … }' },
        { t: 'iteration', m: B('لفة واحدة من اللوب', 'one round of a loop'), ex: 'the third iteration' },
        { t: 'counter', m: B('متغير بيعد', 'a variable that counts'), ex: 'count++' },
        { t: 'increment', m: B('زيادة قيمة (غالبًا بـ 1)', 'increasing a value (usually by 1)'), ex: 'i++' },
        { t: 'accumulator', m: B('متغير بيتجمّع فيه الناتج لفة بعد لفة', 'a variable that builds up the result round by round'), ex: 'sum += x' },
        { t: 'entries', m: B('أزواج [مفتاح، قيمة] من كائن أو مصفوفة', '[key, value] pairs from an object or array'), ex: 'Object.entries(obj)' },
        { t: 'nested loop', m: B('لوب جوه لوب', 'a loop inside a loop'), ex: 'orders → lines' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Loops: while and for بالتمارين.', 'Loops: while and for, with the exercises.') },
        { lib: 'MDN: JavaScript Guide', what: B('Loops and iteration: for وfor...of وfor...in.', 'Loops and iteration: for, for...of and for...in.') }],
      challenge: B('عندك مصفوفة 20 طلب (اكتبها) فيها التاريخ والمدينة والسطور. اطبع: إجمالي كل طلب، وإجمالي كل مدينة، وأكبر 3 طلبات، وكام طلب فيه منتج معين، والمتوسط — كله بلوبات من غير methods جاهزة غير push.', 'You have an array of 20 orders (write it) with a date, a city and lines. Print: each order’s total, each city’s total, the three biggest orders, how many orders contain a given product, and the average — all with loops and no ready-made methods except push.'),
      quiz: [
        { q: B('أنسب لوب لكل عنصر في مصفوفة:', 'The best loop for each item of an array:'), o: ['for...of', 'for...in', 'while(true)'], a: 0, why: B('أوضح وأأمن.', 'Clearest and safest.') },
        { q: B('`for (let i = 0; i < 3; i++)` بيلف كام مرة؟', '`for (let i = 0; i < 3; i++)` runs how many times?'), o: ['3', '4', '2'], a: 0, why: B('0 و1 و2.', '0, 1 and 2.') },
        { q: B('اللوب على كائن:', 'Looping over an object:'), o: ['Object.entries(obj)', 'for (x of obj)', 'obj.forEach'], a: 0, why: B('الكائن مش iterable مباشرة.', 'An object is not directly iterable.') },
        { q: B('الإجمالي بيتعرّف:', 'A running total is declared:'), o: [B('برّه اللوب بـ let', 'outside the loop with let'), B('جوه اللوب', 'inside the loop'), B('بـ const جوه', 'with const inside')], a: 0, why: B('عشان يفضل بين اللفات.', 'So it survives between rounds.') }
      ] },

    { title: B('while وbreak وcontinue', 'while, break and continue'),
      goal: B('تكرّر لحد ما شرط يتحقق، وتوقف أو تعدّي لفة، وتتجنب اللوب اللي مبيخلصش.', 'Repeat until a condition holds, stop or skip a round, and avoid loops that never end.'),
      learn: [
        { h: B('while: كرّر طول ما الشرط صح', 'while: repeat while the condition holds'),
          p: B('`while (condition) { ... }` بيفحص الشرط **قبل** كل لفة. استخدمه لما متعرفش عدد اللفات مقدّمًا: «اسحب صفحات لحد ما الصفحة ترجع فاضية»، «حاول تاني لحد ما تنجح أو تخلص المحاولات». لازم جوه اللوب حاجة **بتقرّب** الشرط إنه يبقى false، وإلا اللوب مش هيخلص.',
            '`while (condition) { ... }` checks the condition **before** each round. Use it when you do not know the number of rounds in advance: «fetch pages until a page comes back empty», «try again until it works or the attempts run out». Something inside the loop must **move** the condition towards false, or the loop never ends.'),
          ex: 'let balance = 1000;\nlet months = 0;\nwhile (balance > 0) {\n  balance -= 230;   // monthly payment\n  months++;\n}\nconsole.log("paid off in", months, "months; last balance", balance);', run: 'js' },
        { h: B('break: اخرج دلوقتي', 'break: leave now'),
          p: B('`break` بيخرج من اللوب فورًا. مثال: بتدوّر على أول طلب متأخر — أول ما تلاقيه، مفيش داعي تكمّل. ونمط شائع: `while (true) { ...; if (done) break; }` — بس خلي شرط الخروج واضح ومضمون، وحط حد أقصى للفّات في الأتمتة عشان لو حاجة اتلخبطت.',
            '`break` leaves the loop at once. Example: looking for the first late order — once you find it, there is no need to go on. A common pattern: `while (true) { ...; if (done) break; }` — but keep the exit condition clear and certain, and in automation add a maximum number of rounds in case something goes wrong.'),
          ex: 'const orders = [{ id: 1, late: false }, { id: 2, late: true }, { id: 3, late: true }];\nlet firstLate = null;\nfor (const o of orders) {\n  if (o.late) {\n    firstLate = o;\n    break;\n  }\n}\nconsole.log("first late:", firstLate?.id);\nlet page = 1;\nwhile (true) {\n  if (page > 3) break;   // pretend page 4 is empty\n  console.log("fetch page", page);\n  page++;\n}', run: 'js' },
        { h: B('continue: عدّي اللفة دي', 'continue: skip this round'),
          p: B('`continue` بيسيب باقي اللفة الحالية ويروح للي بعدها. بيستخدم كـ guard جوه اللوب: «لو الصف فاضي أو ملغي، عدّيه». ده بيخلّي الشغل الأساسي مش جوه if كبيرة. نفس فكرة guard clauses في الدوال بالظبط.',
            '`continue` skips the rest of the current round and goes to the next. It works as a guard inside a loop: «if the row is empty or cancelled, skip it». This keeps the main work out of a big if. Exactly the same idea as guard clauses in functions.'),
          ex: 'const rows = [{ name: "Sara", total: 300 }, null, { name: "", total: 100 }, { name: "Omar", total: 0, cancelled: true }, { name: "Mona", total: 900 }];\nlet sum = 0;\nfor (const r of rows) {\n  if (!r) continue;\n  if (!r.name) continue;\n  if (r.cancelled) continue;\n  sum += r.total;\n}\nconsole.log("sum of valid rows", sum);', run: 'js' },
        { h: B('اللوب اللي مبيخلصش وحمايته', 'The never-ending loop and how to guard it'),
          p: B('لو نسيت تغيّر المتغير اللي في الشرط، اللوب هيلف للأبد والصفحة أو السكربت هيعلّق (الأمثلة هنا بتقف بعد 15 ثانية). في الأتمتة حط دايمًا **حد أقصى**: `let guard = 0; while (cond && guard++ < 1000)`. وفي n8n اللوب اللي مبيخلصش ممكن يستهلك execution ويوقع السيرفر.',
            'If you forget to change the variable in the condition, the loop spins forever and the page or script freezes (examples here stop after 15 seconds). In automation always add a **maximum**: `let guard = 0; while (cond && guard++ < 1000)`. In n8n an endless loop can eat executions and bring the server down.'),
          ex: 'let tries = 0;\nconst MAX = 5;\nlet ok = false;\nwhile (!ok && tries < MAX) {\n  tries++;\n  ok = tries === 3;          // pretend the 3rd try works\n  console.log("try", tries, ok ? "worked" : "failed");\n}\nif (!ok) console.log("gave up after", MAX, "tries");', run: 'js' },
        { h: B('do...while وإعادة المحاولة', 'do...while and retrying'),
          p: B('`do { ... } while (cond);` بينفّذ **مرة على الأقل** وبعدين يفحص — مفيد لـ «اسأل المستخدم لحد ما يكتب قيمة صح». في الأتمتة النمط الأهم هو **إعادة المحاولة بانتظار متزايد** (backoff): حاول، لو فشل استنى 1 ثانية، وبعدين 2، وبعدين 4... لحد حد أقصى. هنكتبها بجد مع async في الشهر الرابع.',
            '`do { ... } while (cond);` runs **at least once**, then checks — handy for «ask the user until they type a valid value». In automation the key pattern is **retrying with a growing wait** (backoff): try; on failure wait 1 second, then 2, then 4... up to a maximum. We will write it properly with async in month 4.'),
          ex: 'let attempt = 0;\ndo {\n  attempt++;\n  const wait = 2 ** (attempt - 1) * 500;\n  console.log(`attempt ${attempt}, would wait ${wait} ms before the next`);\n} while (attempt < 4);\nconsole.log("done after", attempt, "attempts");', run: 'js' }
      ],
      practice: [
        B('اكتب while يحسب كام سنة عشان مبلغ يتضاعف بفايدة 12% سنوي.', 'Write a while loop working out how many years an amount takes to double at 12% a year.'),
        B('دوّر على أول عميل في القايمة مديون بـ break.', 'Find the first customer in debt in the list with break.'),
        B('استخدم continue تعدّي الصفوف الفاضية والملغية في 10 صفوف.', 'Use continue to skip the empty and cancelled rows among 10 rows.'),
        B('اكتب لوب «إعادة محاولة» بحد أقصى 5 مرات واطبع كل محاولة.', 'Write a «retry» loop with a maximum of 5 attempts, printing each one.'),
        B('اكتب do...while بينفّذ مرة على الأقل.', 'Write a do...while that runs at least once.'),
        B('اكتب لوب ناقصه التغيير، افهم ليه مبيخلصش، وصلّحه بحد أقصى (من غير ما تشغّله).', 'Write a loop missing its update, understand why it never ends, and fix it with a maximum (without running it).')
      ],
      code: [
        { u: B('pagination بحد أقصى', 'Pagination with a maximum'), p: 'const MAX_PAGES = 50;\nlet page = 1;\nconst all = [];\nwhile (page <= MAX_PAGES) {\n  const rows = page <= 3 ? [page * 10, page * 10 + 1] : [];  // pretend API\n  if (rows.length === 0) break;\n  all.push(...rows);\n  page++;\n}\nconsole.log(all);' }
      ],
      words: [
        { t: 'while loop', m: B('لوب بيكرّر طول ما الشرط صح', 'a loop repeating while the condition holds'), ex: 'while (left > 0) { … }' },
        { t: 'break', m: B('بيخرج من اللوب فورًا', 'leaves the loop at once'), ex: 'if (found) break;' },
        { t: 'continue', m: B('بيعدّي باقي اللفة ويروح للي بعدها', 'skips the rest of the round and moves on'), ex: 'if (!row) continue;' },
        { t: 'infinite loop', m: B('لوب مبيخلصش أبدًا', 'a loop that never ends'), ex: 'while (true) with no break' },
        { t: 'retry', m: B('إعادة المحاولة بعد فشل', 'trying again after a failure'), ex: 'retry 3 times' },
        { t: 'backoff', m: B('انتظار بيكبر بين كل محاولة والتانية', 'a wait that grows between attempts'), ex: '1 s, 2 s, 4 s' },
        { t: 'pagination', m: B('جلب البيانات صفحة صفحة', 'fetching data page by page'), ex: '?page=2' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Loops: while and for — الأجزاء الخاصة بـ break وcontinue والتمارين الباقية.', 'Loops: while and for — the break and continue parts and the remaining exercises.') },
        { lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 2: while and do loops وBreaking Out of a Loop.', 'Chapter 2: while and do loops, and Breaking Out of a Loop.') }],
      challenge: B('اكتب «جالب صفحات» تجريبي: دالة `fakePage(n)` بترجّع 5 عناصر لحد الصفحة 7 وبعدين مصفوفة فاضية، وأحيانًا بتفشل (كل صفحة رقمها مضاعف 3 بتفشل أول مرة). اجمع كل العناصر بـ while، مع إعادة محاولة لحد 3 مرات لكل صفحة، وحد أقصى 20 صفحة، وتقرير في الآخر.', 'Write a test «page fetcher»: a function `fakePage(n)` returns 5 items up to page 7 then an empty array, and sometimes fails (every page divisible by 3 fails on the first try). Collect all items with while, retrying up to 3 times per page, with a maximum of 20 pages and a report at the end.'),
      quiz: [
        { q: B('while بيفحص الشرط:', 'while checks the condition:'), o: [B('قبل كل لفة', 'before each round'), B('بعد كل لفة', 'after each round'), B('مرة واحدة', 'once')], a: 0, why: B('do...while هو اللي بعد.', 'do...while checks after.') },
        { q: B('continue بيعمل:', 'continue does:'), o: [B('يعدّي للّفة اللي بعدها', 'skip to the next round'), B('يخرج من اللوب', 'leave the loop'), B('يكرّر نفس اللفة', 'repeat the same round')], a: 0, why: B('break هو اللي بيخرج.', 'break is what leaves.') },
        { q: B('حماية من اللوب اللي مبيخلصش:', 'Protection against an endless loop:'), o: [B('حد أقصى للّفات', 'a maximum number of rounds'), B('console.log كتير', 'lots of console.log'), B('var بدل let', 'var instead of let')], a: 0, why: B('لازم مخرج مضمون.', 'You need a guaranteed exit.') },
        { q: B('الـ backoff يعني:', 'Backoff means:'), o: [B('انتظار بيكبر بين المحاولات', 'a growing wait between attempts'), B('محاولة واحدة', 'a single attempt'), B('توقف نهائي', 'stopping for good')], a: 0, why: B('1 ثم 2 ثم 4...', '1, then 2, then 4...') }
      ] },

    { title: B('مشروع: محرك قواعد خصومات', 'A project: a discount rules engine'),
      goal: B('تبني محرك صغير بيطبّق قواعد خصم وشحن على سلة مشتريات بالشروط واللوبات، بترتيب ومع حد أقصى.', 'Build a small engine that applies discount and shipping rules to a basket with conditions and loops, in order and with limits.'),
      learn: [
        { h: B('السلة والقواعد كبيانات', 'The basket and the rules as data'),
          p: B('بدل ما القواعد تبقى if مكتوبة جوه الكود، خليها **بيانات**: قايمة قواعد، كل قاعدة ليها اسم وشرط ونوع خصم وقيمة. الكود يلف عليهم بالترتيب. كده المدير يقدر يغيّر قاعدة (أو تيجي من شيت) من غير ما تلمس الكود. ده نفس اللي بتعمله أدوات زي Shopify وn8n من جوه.',
            'Instead of writing the rules as ifs inside the code, make them **data**: a list of rules, each with a name, a condition, a discount type and a value. The code goes through them in order. That way a manager can change a rule (or it can come from a sheet) without touching the code. That is what tools like Shopify and n8n do inside.'),
          ex: 'const basket = [\n  { sku: "NB", name: "Notebook", price: 45, qty: 10 },\n  { sku: "PN", name: "Pen Pro", price: 30, qty: 3 },\n  { sku: "BG", name: "Backpack", price: 650, qty: 1 }\n];\nlet subtotal = 0;\nfor (const line of basket) subtotal += line.price * line.qty;\nconsole.log("subtotal", subtotal);', run: 'js' },
        { h: B('قاعدة = دالة شرط + خصم', 'A rule = a condition function + a discount'),
          p: B('كل قاعدة كائن: `{ name, when: ctx => ..., percent }`. `when` دالة صغيرة بتاخد «السياق» (السلة والعميل واليوم) وترجّع true/false. اللوب يجرّب كل قاعدة: لو `when(ctx)` صح، يطبّق الخصم ويسجّل اسمها. الدوال اللي جوه كائنات هتبقى طبيعية جدًا بعد الأسبوع 6.',
            'Each rule is an object: `{ name, when: ctx => ..., percent }`. `when` is a small function taking the «context» (the basket, the customer and the day) and returning true/false. The loop tries each rule: if `when(ctx)` is true, it applies the discount and records its name. Functions inside objects will feel completely natural after week 6.'),
          ex: 'const rules = [\n  { name: "bulk notebooks", when: c => c.qtyOf("NB") >= 10, percent: 5 },\n  { name: "VIP", when: c => c.customer.vip, percent: 10 },\n  { name: "big basket", when: c => c.subtotal >= 2000, percent: 7 }\n];\nconst ctx = { subtotal: 1190, customer: { vip: true }, qtyOf: sku => sku === "NB" ? 10 : 0 };\nfor (const r of rules) console.log(r.name.padEnd(16), r.when(ctx) ? "applies" : "-");', run: 'js' },
        { h: B('ترتيب وحد أقصى للخصم', 'Order and a maximum discount'),
          p: B('القواعد لازم ليها **سياسة**: هل الخصومات بتتجمع؟ ولا بناخد الأكبر بس؟ وفيه حد أقصى (مثلًا 20%)؟ اكتب السياسة كمتغيرات: `STACK = true` و`MAX_PERCENT = 20`. حط `Math.min(total, MAX_PERCENT)` في الآخر. أغلب مشاكل الخصومات في الشغل الحقيقي من غير حد أقصى بتكلّف فلوس.',
            'Rules need a **policy**: do discounts stack, or do we take only the biggest? Is there a maximum (say 20%)? Write the policy as variables: `STACK = true` and `MAX_PERCENT = 20`. Apply `Math.min(total, MAX_PERCENT)` at the end. Most real discount bugs without a maximum cost money.'),
          ex: 'const STACK = true, MAX_PERCENT = 20;\nconst matched = [5, 10, 7];\nlet percent = 0;\nif (STACK) {\n  for (const p of matched) percent += p;\n} else {\n  for (const p of matched) if (p > percent) percent = p;\n}\npercent = Math.min(percent, MAX_PERCENT);\nconsole.log("discount %", percent);', run: 'js' },
        { h: B('الشحن والضريبة بعد الخصم', 'Shipping and VAT after the discount'),
          p: B('الترتيب المحاسبي مهم: الإجمالي ← الخصم ← (الشحن) ← الضريبة على الصافي. اكتب كل خطوة في متغير وقرّب الفلوس لقرشين في الآخر بس. اطبع «فاتورة» مفصّلة: كل خطوة وقيمتها — العميل والمحاسب لازم يفهموا الرقم جه منين.',
            'The accounting order matters: subtotal → discount → (shipping) → VAT on the net. Put each step in a variable and round money to two decimals only at the end. Print a detailed «invoice»: each step and its amount — the customer and the accountant must see where the number came from.'),
          ex: 'const subtotal = 1190, percent = 15, city = "alexandria";\nconst fees = { cairo: 50, giza: 50, alexandria: 70 };\nconst discount = subtotal * percent / 100;\nconst afterDiscount = subtotal - discount;\nconst shipping = afterDiscount >= 1000 ? 0 : (fees[city] ?? 90);\nconst vat = (afterDiscount + shipping) * 0.14;\nconst total = afterDiscount + shipping + vat;\nfor (const [k, v] of Object.entries({ subtotal, discount, afterDiscount, shipping, vat, total })) {\n  console.log(k.padEnd(14), v.toFixed(2).padStart(10));\n}', run: 'js' },
        { h: B('اختبر قواعدك بحالات', 'Test your rules with cases'),
          p: B('قبل ما تثق في المحرك، اعمل **قايمة حالات**: كل حالة فيها السلة والعميل والناتج المتوقع، ولف عليهم وقارن. اطبع ✓ أو ✗ لكل حالة. ده أبسط شكل للاختبارات (هنستخدم Vitest في الشهر السابع)، ومن غيره أي تعديل على قاعدة ممكن يكسّر قاعدة تانية من غير ما تعرف.',
            'Before you trust the engine, make a **list of cases**: each with a basket, a customer and the expected result, then loop over them and compare. Print ✓ or ✗ for each. It is the simplest form of testing (we will use Vitest in month 7), and without it any change to one rule can break another without you noticing.'),
          ex: 'const discountFor = (subtotal, vip) => Math.min((subtotal >= 2000 ? 7 : 0) + (vip ? 10 : 0), 15);\nconst cases = [\n  { subtotal: 500, vip: false, want: 0 },\n  { subtotal: 500, vip: true, want: 10 },\n  { subtotal: 2500, vip: true, want: 15 },\n  { subtotal: 2500, vip: false, want: 7 }\n];\nlet passed = 0;\nfor (const c of cases) {\n  const got = discountFor(c.subtotal, c.vip);\n  const ok = got === c.want;\n  if (ok) passed++;\n  console.log(ok ? "✓" : "✗", JSON.stringify(c), "got", got);\n}\nconsole.log(`${passed}/${cases.length} passed`);', run: 'js' }
      ],
      practice: [
        B('اكتب سلة 5 منتجات واحسب الإجمالي بلوب.', 'Write a basket of 5 products and compute the subtotal with a loop.'),
        B('اكتب 4 قواعد خصم كبيانات (`name` و`when` و`percent`).', 'Write 4 discount rules as data (`name`, `when` and `percent`).'),
        B('طبّق القواعد بسياستين (تجميع / الأكبر بس) وقارن الناتج.', 'Apply the rules under two policies (stack / biggest only) and compare the result.'),
        B('ضيف حد أقصى للخصم واختبره بحالة بتعدّيه.', 'Add a maximum discount and test it with a case that goes over it.'),
        B('اطبع فاتورة مفصّلة بالترتيب المحاسبي الصح.', 'Print a detailed invoice in the correct accounting order.'),
        B('اكتب 8 حالات اختبار واطبع ✓/✗ ونسبة النجاح.', 'Write 8 test cases and print ✓/✗ and the pass rate.')
      ],
      code: [
        { u: B('قالب محرك القواعد', 'The rules-engine template'), p: 'function applyRules(ctx, rules, { stack = true, max = 20 } = {}) {\n  const applied = [];\n  for (const r of rules) if (r.when(ctx)) applied.push(r);\n  let percent = 0;\n  for (const r of applied) percent = stack ? percent + r.percent : Math.max(percent, r.percent);\n  return { percent: Math.min(percent, max), applied: applied.map(r => r.name) };\n}' }
      ],
      words: [
        { t: 'rules engine', m: B('كود بيطبّق قواعد مكتوبة كبيانات', 'code that applies rules written as data'), ex: 'a discount rules engine' },
        { t: 'basket', m: B('سلة المشتريات', 'the shopping basket'), ex: 'basket lines' },
        { t: 'subtotal', m: B('الإجمالي قبل الخصم والضريبة', 'the total before discount and tax'), ex: 'subtotal = Σ price × qty' },
        { t: 'policy', m: B('سياسة بتحدد إزاي القواعد بتتطبّق', 'a policy deciding how rules apply'), ex: 'discounts stack' },
        { t: 'cap', m: B('حد أقصى', 'an upper limit'), ex: 'a 20% cap' },
        { t: 'test case', m: B('حالة فيها مدخلات والناتج المتوقع', 'a case with inputs and the expected result'), ex: '{ subtotal: 500, want: 0 }' },
        { t: 'expected result', m: B('الناتج اللي لازم يطلع', 'the result that should come out'), ex: 'got === want' }
      ],
      read: [{ lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 2: Exercises (Looping a triangle وFizzBuzz وChessboard).', 'Chapter 2: Exercises (Looping a triangle, FizzBuzz and Chessboard).') },
        { lib: 'Exercism: JavaScript track', what: B('حل أول 3 تمارين في التراك (Hello World وLasagna وأي تمرين شروط).', 'Solve the first 3 exercises on the track (Hello World, Lasagna and any conditions exercise).') }],
      challenge: B('وسّع المحرك: قاعدة «اشتري 3 وخد الرابع ببلاش» لمنتج معين، وكوبون بكود ليه تاريخ انتهاء وحد أدنى للسلة، وقاعدة بتشتغل في ساعات معينة بس — مع 12 حالة اختبار كلها ✓.', 'Extend the engine: a «buy 3, get the 4th free» rule for one product, a coupon code with an expiry date and a minimum basket, and a rule that only works at certain hours — with 12 test cases, all ✓.'),
      quiz: [
        { q: B('ليه القواعد تبقى بيانات؟', 'Why make the rules data?'), o: [B('تتغيّر من غير ما تلمس الكود', 'they change without touching the code'), B('أسرع في التشغيل', 'they run faster'), B('إجباري في JS', 'JS requires it')], a: 0, why: B('ممكن تيجي من شيت.', 'They can come from a sheet.') },
        { q: B('الترتيب الصح:', 'The right order:'), o: [B('إجمالي ← خصم ← شحن ← ضريبة', 'subtotal → discount → shipping → VAT'), B('ضريبة ← خصم ← إجمالي', 'VAT → discount → subtotal'), B('مش فارق', 'it does not matter')], a: 0, why: B('الضريبة على الصافي.', 'VAT is on the net.') },
        { q: B('الحد الأقصى للخصم:', 'The discount cap:'), o: ['Math.min(percent, MAX)', 'Math.max(percent, MAX)', 'percent + MAX'], a: 0, why: B('الأصغر منهم.', 'The smaller of the two.') },
        { q: B('حالات الاختبار بتفيد في:', 'Test cases help to:'), o: [B('تعرف لو تعديل كسر قاعدة تانية', 'know when a change breaks another rule'), B('تسرّع الكود', 'speed the code up'), B('تقلل الأسطر', 'reduce lines')], a: 0, why: B('شبكة أمان.', 'A safety net.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تراجع القرارات والتكرار وتسلّم أداة حقيقية، وتعدّي اختبار الأسبوع.', 'Review decisions and repetition, deliver a real tool, and pass the weekly test.'),
      review: [
        B('if/else if/else: أول فرع صح بس بيتنفّذ، فرتّب من الأخص للأعم، و{} دايمًا.', 'if/else if/else: only the first true branch runs, so order from specific to general, and always use {}.'),
        B('Guard clauses: اخرج بدري من الحالات الغلط والكود يفضل مسطّح.', 'Guard clauses: leave early on bad cases and keep the code flat.'),
        B('let وconst جوه {} نطاقهم البلوك.', 'let and const inside {} are block-scoped.'),
        B('switch لقيم محددة (ومتنساش break)، وlookup object لما بترجّع قيم بس.', 'switch for fixed values (do not forget break), and a lookup object when only values come back.'),
        B('for...of لكل عنصر، وfor بعدّاد، وObject.entries للكائنات.', 'for...of for each item, for with a counter, and Object.entries for objects.'),
        B('إجمالي وعدّاد وأكبر قيمة وتجميع: كلها متغيرات برّه اللوب.', 'Totals, counters, the largest value and grouping all live in variables outside the loop.'),
        B('while لما متعرفش العدد، وbreak يخرج، وcontinue يعدّي.', 'while when you do not know the count, break to leave, continue to skip.'),
        B('أي لوب في الأتمتة ليه حد أقصى، وإعادة المحاولة بـ backoff.', 'Every automation loop has a maximum, and retries use backoff.')
      ],
      project: B('**مشروع الأسبوع: معالج طلبات اليوم.** اكتب سكربت `daily-orders.mjs` فيه 20 طلب (حالة، مدينة، عميل VIP ولا لأ، سطور).\n1. لف على الطلبات وعدّي الملغية والفاضية بـ continue.\n2. لكل طلب: الإجمالي من السطور، والخصم من محرك قواعد (3 قواعد كبيانات + حد أقصى)، والشحن من جدول lookup، والضريبة.\n3. حدد «الخطوة الجاية» لكل طلب بـ switch على الحالة.\n4. جمّع إجمالي المبيعات حسب المدينة، وطلّع أكبر طلب، وعدّ طلبات الـ VIP.\n5. اطبع تقرير مترتب، و8 حالات اختبار للخصم كلها ✓.',
        '**Weekly project: today’s order processor.** Write a script `daily-orders.mjs` holding 20 orders (status, city, VIP or not, lines).\n1. Loop over the orders, skipping cancelled and empty ones with continue.\n2. For each order: the subtotal from its lines, the discount from a rules engine (3 rules as data + a cap), the shipping from a lookup table, and the VAT.\n3. Decide each order’s «next step» with a switch on its status.\n4. Total sales by city, find the biggest order and count the VIP orders.\n5. Print a tidy report, plus 8 discount test cases, all ✓.'),
      test: [
        { q: B('الكود ده بيطبع إيه؟ `const t = 1500; if (t > 1000) { console.log("A"); } else if (t > 500) { console.log("B"); }`', 'What does this print? `const t = 1500; if (t > 1000) { console.log("A"); } else if (t > 500) { console.log("B"); }`'), o: ['A', 'B', 'A B'], a: 0, why: B('أول فرع صح بس.', 'Only the first true branch.') },
        { q: B('أحسن مكان لـ «لو مفيش طلب ارجع»:', 'The best place for «if there is no order, return»:'), o: [B('أول الدالة', 'the top of the function'), B('آخرها', 'its end'), B('جوه لوب', 'inside a loop')], a: 0, why: B('guard clause.', 'A guard clause.') },
        { q: B('switch من غير break في case:', 'switch with no break in a case:'), o: [B('يكمّل في اللي بعده', 'carries on into the next'), B('يقف', 'stops'), B('يرمي خطأ', 'throws an error')], a: 0, why: B('fall-through.', 'Fall-through.') },
        { q: B('`({ a: 1 })["b"] ?? 5`:', '`({ a: 1 })["b"] ?? 5`:'), o: ['5', 'undefined', '1'], a: 0, why: B('مفيش b فـ ?? بيدّي 5.', 'No b, so ?? gives 5.') },
        { q: B('`for (let i = 1; i <= 10; i += 3)` قيم i:', '`for (let i = 1; i <= 10; i += 3)` values of i:'), o: ['1, 4, 7, 10', '1, 3, 6, 9', '1, 4, 7'], a: 0, why: B('بخطوة 3 لحد 10.', 'Steps of 3 up to 10.') },
        { q: B('لوب على مفاتيح وقيم كائن:', 'Looping over an object’s keys and values:'), o: ['for (const [k, v] of Object.entries(o))', 'for (const k of o)', 'o.forEach((k, v) => …)'], a: 0, why: B('entries بيدّي أزواج.', 'entries gives pairs.') },
        { q: B('عشان تبطّل اللوب أول ما تلاقي اللي بتدوّر عليه:', 'To stop the loop as soon as you find what you are looking for:'), o: ['break', 'continue', 'return 0'], a: 0, why: B('break بيخرج.', 'break leaves.') },
        { q: B('`continue` جوه for...of:', '`continue` inside for...of:'), o: [B('يروح للعنصر اللي بعده', 'moves to the next item'), B('يوقف اللوب', 'stops the loop'), B('يرجع لأول القايمة', 'goes back to the start')], a: 0, why: B('يعدّي اللفة.', 'It skips the round.') },
        { q: B('لوب while في الأتمتة لازم يبقى فيه:', 'An automation while loop must have:'), o: [B('حد أقصى للّفات', 'a maximum number of rounds'), B('console.error', 'console.error'), B('var', 'var')], a: 0, why: B('عشان ميعلّقش.', 'So it cannot hang.') },
        { q: B('`do...while` بيتنفّذ:', '`do...while` runs:'), o: [B('مرة على الأقل', 'at least once'), B('ممكن ولا مرة', 'possibly never'), B('مرتين دايمًا', 'always twice')], a: 0, why: B('بيفحص بعد اللفة.', 'It checks after the round.') },
        { q: B('القواعد المكتوبة كبيانات ميزتها:', 'The advantage of rules written as data:'), o: [B('تتعدّل من غير ما تلمس الكود', 'they change without touching the code'), B('مفيش داعي تختبرها', 'they need no testing'), B('بتلغي الحد الأقصى', 'they remove the cap')], a: 0, why: B('مرونة.', 'Flexibility.') },
        { q: B('الضريبة بتتحسب على:', 'VAT is calculated on:'), o: [B('الصافي بعد الخصم', 'the net after discount'), B('الإجمالي قبل الخصم', 'the subtotal before discount'), B('الخصم', 'the discount')], a: 0, why: B('بعد الخصم.', 'After the discount.') }
      ] }
  ]
};
