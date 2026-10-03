// JavaScript week 6 — functions, scope and closures.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('الدوال والنطاق والـ Closures', 'Functions, scope and closures'),
  goal: B('تكتب دوال نضيفة بمدخلات ومخرجات واضحة (وقيم افتراضية وrest وdestructuring)، وتفهم الـ arrow functions والنطاق والـ closures والـ callbacks والدوال اللي بترجّع دوال — أساس كل كود أتمتة قابل لإعادة الاستخدام.',
          'Write clean functions with clear inputs and outputs (defaults, rest and destructuring), and understand arrow functions, scope, closures, callbacks and functions that return functions — the base of all reusable automation code.'),
  days: [
    { title: B('الدالة: اسم لشغل بيتكرر', 'The function: a name for repeated work'),
      goal: B('تعرّف دوال وتناديها، وتفهم المدخلات (parameters) والمخرجات (return) وليه الدالة تعمل حاجة واحدة.', 'Declare and call functions, understand inputs (parameters) and outputs (return), and why a function should do one thing.'),
      learn: [
        { h: B('تعريف ونداء', 'Declaring and calling'),
          p: B('`function addVat(price) { return price * 1.14; }` بتعرّف دالة اسمها addVat بتاخد `price` وترجّع الناتج. `addVat(200)` **بتناديها** وبتدّي 228. الدالة بتخليك تكتب الشغل مرة واحدة وتستخدمه 100 مرة، وتصلّح غلطة في مكان واحد. لو لقيت نفسك بتنسخ نفس 3 أسطر، دي دالة مستنية تتكتب.',
            '`function addVat(price) { return price * 1.14; }` declares a function named addVat that takes `price` and returns the result. `addVat(200)` **calls** it and gives 228. A function lets you write the work once and use it a hundred times, fixing a mistake in one place. When you catch yourself copying the same 3 lines, that is a function waiting to be written.'),
          ex: 'function addVat(price) {\n  return price * 1.14;\n}\nconsole.log(addVat(200), addVat(99.5));\nconst prices = [100, 250, 40];\nfor (const p of prices) console.log(p, "→", addVat(p).toFixed(2));', run: 'js' },
        { h: B('return: الدالة بترجّع قيمة', 'return: a function gives back a value'),
          p: B('`return` بيرجّع قيمة للمكان اللي ناداها **وبيخرج من الدالة فورًا** — أي سطر بعده مش بيتنفّذ. دالة من غير return بترجّع `undefined`. فرّق بين دالة بتـ«ترجّع» قيمة (تقدر تستخدمها في حسبة) ودالة بتـ«تطبع» بس (console.log جواها) — الأولى أنفع بكتير وأسهل تختبرها.',
            '`return` gives a value back to the caller **and leaves the function at once** — no line after it runs. A function without return gives `undefined`. Tell apart a function that «returns» a value (you can use it in a calculation) from one that only «prints» (console.log inside) — the first is far more useful and easier to test.'),
          ex: 'function printTotal(a, b) { console.log("total", a + b); }\nfunction getTotal(a, b) { return a + b; }\nconst x = printTotal(2, 3);\nconst y = getTotal(2, 3);\nconsole.log("printTotal gave", x, "| getTotal gave", y, "and y * 2 =", y * 2);', run: 'js' },
        { h: B('parameters وarguments', 'Parameters and arguments'),
          p: B('**parameters** هي الأسماء في تعريف الدالة (`function fee(city, weight)`)، و**arguments** هي القيم اللي بتبعتها وانت بتنادي (`fee("Giza", 3)`). الترتيب مهم. لو بعت أقل من المطلوب، الناقص بيبقى undefined؛ ولو أكتر، الزيادة بتتجاهل. لما يبقى فيه أكتر من 3 مدخلات، ابعت **كائن** (الدرس الجاي).',
            '**Parameters** are the names in the function’s definition (`function fee(city, weight)`), and **arguments** are the values you pass when calling (`fee("Giza", 3)`). Order matters. Pass fewer than needed and the missing ones are undefined; pass more and the extra ones are ignored. Once there are more than 3 inputs, pass an **object** (next lesson).'),
          ex: 'function shippingFee(city, weightKg) {\n  const base = city === "Cairo" ? 40 : 60;\n  return base + Math.max(0, weightKg - 1) * 10;\n}\nconsole.log(shippingFee("Cairo", 1), shippingFee("Aswan", 4));\nconsole.log(shippingFee("Cairo"));          // weightKg is undefined → NaN\nconsole.log(shippingFee("Giza", 2, "extra")); // extra is ignored', run: 'js' },
        { h: B('الدالة تعمل حاجة واحدة', 'A function does one thing'),
          p: B('دالة اسمها `processOrder` بتنضّف وتحسب وتبعت إيميل وتكتب في الشيت = صعب تختبرها وصعب تغيّر جزء منها. قسّمها: `cleanOrder` و`computeTotal` و`sendEmail` و`saveRow`، ودالة رئيسية بتناديهم بالترتيب. الاسم يبدأ بفعل (`get` و`clean` و`build` و`is` و`send`) ويقول بالظبط بتعمل إيه.',
            'A function named `processOrder` that cleans, calculates, sends an email and writes to the sheet is hard to test and hard to change in part. Split it: `cleanOrder`, `computeTotal`, `sendEmail` and `saveRow`, plus a main function calling them in order. The name starts with a verb (`get`, `clean`, `build`, `is`, `send`) and says exactly what it does.'),
          ex: 'const cleanOrder = o => ({ ...o, email: o.email.trim().toLowerCase() });\nconst computeTotal = o => o.items.reduce((s, i) => s + i.qty * i.price, 0);\nconst isBigOrder = total => total >= 1000;\nfunction handle(order) {\n  const clean = cleanOrder(order);\n  const total = computeTotal(clean);\n  return { email: clean.email, total, big: isBigOrder(total) };\n}\nconsole.log(handle({ email: " A@B.COM ", items: [{ qty: 3, price: 400 }] }));', run: 'js' },
        { h: B('الـ hoisting وإمتى الدالة متاحة', 'Hoisting and when a function is available'),
          p: B('دوال `function name() {}` بتتعرف لـ JS قبل تشغيل الملف (hoisting)، فتقدر تناديها **قبل** سطر تعريفها. ده بيسمح تكتب الدالة الرئيسية فوق والتفاصيل تحت. لكن الدوال اللي في متغير (`const f = () => {}`) مش متاحة غير بعد سطرها. عرّف المهم بوضوح ورتّب الملف عشان يتقري من فوق لتحت.',
            '`function name() {}` declarations are known to JS before the file runs (hoisting), so you can call them **before** their line. That lets you put the main function at the top and the details below. But functions stored in a variable (`const f = () => {}`) only exist after their line. Name the important things clearly and arrange the file to read from top to bottom.'),
          ex: 'console.log(greet("Sara"));   // works: declarations are hoisted\nfunction greet(name) {\n  return "Hello " + name;\n}\ntry {\n  console.log(shout("hi"));\n} catch (err) {\n  console.log("not yet:", err.message);\n}\nconst shout = s => s.toUpperCase() + "!";\nconsole.log(shout("hi"));', run: 'js' }
      ],
      practice: [
        B('اكتب 5 دوال صغيرة: ضريبة، خصم، تحويل عملة، تحويل حرارة، قسط.', 'Write 5 small functions: VAT, discount, currency conversion, temperature conversion, instalment.'),
        B('اكتب نسخة «بتطبع» ونسخة «بترجّع» لنفس الحسبة واستخدم التانية في حسبة أكبر.', 'Write a «printing» and a «returning» version of the same calculation, and use the second in a bigger one.'),
        B('نادي دالة بمدخلات ناقصة وزيادة وشوف النتيجة.', 'Call a function with missing and extra arguments and look at the result.'),
        B('قسّم دالة كبيرة (اكتبها الأول) لـ 4 دوال كل واحدة حاجة واحدة.', 'Split a big function (write it first) into 4 functions doing one thing each.'),
        B('سمّي 8 دوال بأسماء تبدأ بفعل.', 'Name 8 functions with names that start with a verb.'),
        B('جرّب تنادي function قبل تعريفها وconst قبل تعريفها.', 'Try calling a function declaration before its line, and a const function before its line.')
      ],
      code: [
        { u: B('ملف بترتيب مقري', 'A file in readable order'), p: 'main();\n\nfunction main() {\n  const orders = loadOrders();\n  console.log(summarise(orders));\n}\nfunction loadOrders() { return [{ total: 300 }, { total: 900 }]; }\nfunction summarise(list) { return { count: list.length, total: list.reduce((s, o) => s + o.total, 0) }; }' }
      ],
      words: [
        { t: 'function', m: B('كود ليه اسم بياخد مدخلات ويرجّع ناتج', 'named code that takes inputs and returns a result'), ex: 'function addVat(p) { … }' },
        { t: 'call', m: B('تنادي الدالة عشان تشتغل', 'to run a function'), ex: 'addVat(200)' },
        { t: 'parameter', m: B('اسم المدخل في تعريف الدالة', 'an input’s name in the function definition'), ex: 'function f(price)' },
        { t: 'return value', m: B('القيمة اللي الدالة بترجّعها', 'the value a function gives back'), ex: 'return total;' },
        { t: 'single responsibility', m: B('الدالة تعمل حاجة واحدة بس', 'a function does only one thing'), ex: 'cleanOrder vs sendEmail' },
        { t: 'hoisting', m: B('تعريف الدوال قبل تشغيل باقي الكود', 'declarations made known before the rest of the code runs'), ex: 'call before declare' },
        { t: 'reusable', m: B('ينفع يتستخدم تاني في أماكن كتير', 'usable again in many places'), ex: 'a reusable helper' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Functions (كله بالتمارين).', 'Functions (all of it, with the exercises).') },
        { lib: 'MDN: JavaScript Guide', what: B('Functions: Defining functions وCalling functions.', 'Functions: Defining functions and Calling functions.') }],
      challenge: B('خد سكربت تقرير الشهر الأول بتاعك وأعد كتابته كدوال صغيرة (كل دالة 10 أسطر أو أقل، واسمها فعل)، ودالة `main` في الأول بتقرا زي فهرس — والناتج يفضل زي ما هو بالظبط.', 'Take your month-one report script and rewrite it as small functions (each 10 lines or fewer, named with a verb), with a `main` function at the top that reads like a table of contents — and the output exactly as before.'),
      quiz: [
        { q: B('دالة من غير return بترجّع:', 'A function without return gives:'), o: ['undefined', 'null', '0'], a: 0, why: B('undefined تلقائي.', 'undefined automatically.') },
        { q: B('السطر اللي بعد return:', 'The line after return:'), o: [B('مش بيتنفّذ', 'does not run'), B('بيتنفّذ', 'runs'), B('بيتنفّذ مرتين', 'runs twice')], a: 0, why: B('return بيخرج.', 'return leaves.') },
        { q: B('في `fee("Giza", 3)` القيم دي اسمها:', 'In `fee("Giza", 3)` those values are:'), o: ['arguments', 'parameters', 'returns'], a: 0, why: B('القيم وقت النداء.', 'The values at the call.') },
        { q: B('أحسن اسم لدالة بتفحص الإيميل:', 'The best name for a function that checks an email:'), o: ['isValidEmail', 'email', 'check2'], a: 0, why: B('فعل/سؤال واضح.', 'A clear verb/question.') }
      ] },

    { title: B('المدخلات الذكية: افتراضي وكائن وrest', 'Smart inputs: defaults, objects and rest'),
      goal: B('تدّي الدوال قيم افتراضية، وتبعت لها إعدادات ككائن مفكوك، وتاخد عدد مفتوح من القيم.', 'Give functions default values, pass them settings as a destructured object, and take any number of values.'),
      learn: [
        { h: B('القيم الافتراضية', 'Default values'),
          p: B('`function fee(city, weightKg = 1)` لو اتنادت من غير weightKg (أو بـ undefined) بتاخد 1. الافتراضي ممكن يكون حسبة أو حتى parameter قبله: `function price(base, vat = base * 0.14)`. ده بيشيل `if (x === undefined) x = ...` من أول كل دالة. خلي بالك: `null` مش بيشغّل الافتراضي، undefined بس.',
            '`function fee(city, weightKg = 1)`: called without weightKg (or with undefined) it takes 1. A default can be a calculation, or even an earlier parameter: `function price(base, vat = base * 0.14)`. It removes `if (x === undefined) x = ...` from the top of every function. Careful: `null` does not trigger the default, only undefined.'),
          ex: 'function shippingFee(city, weightKg = 1, express = false) {\n  const base = city === "Cairo" ? 40 : 60;\n  return (base + (weightKg - 1) * 10) * (express ? 1.5 : 1);\n}\nconsole.log(shippingFee("Cairo"), shippingFee("Cairo", 3), shippingFee("Giza", 2, true));\nconsole.log(shippingFee("Cairo", undefined, true), shippingFee("Cairo", null));', run: 'js' },
        { h: B('كائن إعدادات بدل مدخلات كتير', 'An options object instead of many inputs'),
          p: B('`sendInvoice("Sara", "s@x.com", true, false, "ar", 3)` — حد فاهم true وfalse دول إيه؟ ابعت كائن: `sendInvoice({ name, email, attachPdf: true, lang: "ar" })`، وفكّه في التعريف بقيم افتراضية: `function sendInvoice({ name, email, attachPdf = true, lang = "en", retries = 3 } = {})`. النداء بيتقري زي الكلام، والترتيب مش مهم.',
            '`sendInvoice("Sara", "s@x.com", true, false, "ar", 3)` — does anyone know what those trues and falses mean? Pass an object: `sendInvoice({ name, email, attachPdf: true, lang: "ar" })`, and destructure it in the definition with defaults: `function sendInvoice({ name, email, attachPdf = true, lang = "en", retries = 3 } = {})`. The call reads like a sentence, and order no longer matters.'),
          ex: 'function sendInvoice({ name, email, attachPdf = true, lang = "en", retries = 3 } = {}) {\n  if (!email) return "missing email";\n  return `to ${email} (${name ?? "customer"}) lang=${lang} pdf=${attachPdf} retries=${retries}`;\n}\nconsole.log(sendInvoice({ name: "Sara", email: "s@x.com", lang: "ar" }));\nconsole.log(sendInvoice({ email: "o@x.com", attachPdf: false }));\nconsole.log(sendInvoice());', run: 'js' },
        { h: B('rest: عدد مفتوح من القيم', 'Rest: any number of values'),
          p: B('`function sum(...numbers)` بتجمّع كل الـ arguments في مصفوفة اسمها numbers. `sum(1, 2, 3)` و`sum(5)` و`sum()` كلهم شغالين. ممكن قبلها parameters عادية: `function log(level, ...parts)`. والعكس وقت النداء: `sum(...prices)` بيفك مصفوفة لـ arguments.',
            '`function sum(...numbers)` gathers all the arguments into an array named numbers. `sum(1, 2, 3)`, `sum(5)` and `sum()` all work. Normal parameters can come first: `function log(level, ...parts)`. And the reverse at call time: `sum(...prices)` spreads an array into arguments.'),
          ex: 'function sum(...numbers) {\n  let s = 0;\n  for (const n of numbers) s += n;\n  return s;\n}\nconsole.log(sum(1, 2, 3), sum(5), sum());\nfunction log(level, ...parts) { console.log(`[${level.toUpperCase()}]`, ...parts); }\nlog("info", "order", 77, "saved");\nconst prices = [10, 20, 30];\nconsole.log(sum(...prices));', run: 'js' },
        { h: B('ترجّع أكتر من قيمة', 'Returning more than one value'),
          p: B('الدالة بترجّع قيمة واحدة، بس القيمة دي ممكن تبقى **كائن** (`return { total, vat, items }`) أو **مصفوفة** (`return [value, error]`). اللي بينادي يفكّها بـ destructuring: `const { total, vat } = calc(order);`. الكائن أوضح لأن الأسماء بتقول كل قيمة إيه.',
            'A function returns one value, but that value can be an **object** (`return { total, vat, items }`) or an **array** (`return [value, error]`). The caller unpacks it with destructuring: `const { total, vat } = calc(order);`. The object is clearer, because the names say what each value is.'),
          ex: 'function calc(lines, vatRate = 0.14) {\n  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);\n  const vat = Math.round(subtotal * vatRate * 100) / 100;\n  return { subtotal, vat, total: subtotal + vat, count: lines.length };\n}\nconst { total, vat, count } = calc([{ qty: 2, price: 45 }, { qty: 1, price: 650 }]);\nconsole.log(total, vat, count);', run: 'js' },
        { h: B('الدالة النقية (pure)', 'The pure function'),
          p: B('الدالة **النقية**: نفس المدخلات دايمًا تدّي نفس الناتج، ومبتغيّرش أي حاجة برّاها (مش بتعدّل المصفوفة اللي جاتلها، ولا متغير عام، ولا بتبعت طلبات). دي أسهل دوال في الدنيا تختبرها وتفهمها. خلي أغلب كودك نقي (الحسابات والتنضيف)، والأجزاء «غير النقية» (الشبكة والملفات والوقت) قليلة ومعزولة.',
            'A **pure** function always gives the same result for the same inputs and changes nothing outside itself (it does not edit the array it receives, nor a global variable, nor send requests). These are the easiest functions in the world to test and understand. Keep most of your code pure (calculations and cleaning), and the «impure» parts (network, files, time) few and isolated.'),
          ex: 'const cart = [{ sku: "A", qty: 1 }];\nfunction addItemImpure(list, item) { list.push(item); return list; }\nfunction addItemPure(list, item) { return [...list, item]; }\nconst a = addItemPure(cart, { sku: "B", qty: 2 });\nconsole.log(cart.length, a.length);   // 1 2: cart untouched\naddItemImpure(cart, { sku: "C", qty: 1 });\nconsole.log(cart.length);            // 2: changed!', run: 'js' }
      ],
      practice: [
        B('اكتب دالة شحن بـ 3 قيم افتراضية وناديها 4 مرات بطرق مختلفة.', 'Write a shipping function with 3 defaults and call it 4 different ways.'),
        B('حوّل دالة بـ 6 مدخلات لدالة بتاخد كائن إعدادات مفكوك.', 'Turn a 6-argument function into one taking a destructured options object.'),
        B('اكتب `average(...nums)` بترجّع 0 لو مفيش أرقام.', 'Write `average(...nums)` returning 0 when there are no numbers.'),
        B('اكتب دالة بترجّع `{ ok, value, error }` وفكّها في النداء.', 'Write a function returning `{ ok, value, error }` and unpack it at the call.'),
        B('اكتب نسختين نقية وغير نقية لنفس الشغل وأثبت الفرق.', 'Write pure and impure versions of the same job and show the difference.'),
        B('صنّف 6 دوال من شغلك: نقية ولا لأ وليه.', 'Classify 6 functions from your work: pure or not, and why.')
      ],
      code: [
        { u: B('دالة بإعدادات افتراضية كاملة', 'A function with full default options'), p: 'function report({ title = "Report", currency = "EGP", decimals = 2, rows = [] } = {}) {\n  const total = rows.reduce((s, r) => s + r, 0);\n  return `${title}: ${total.toFixed(decimals)} ${currency}`;\n}\nconsole.log(report({ rows: [10.5, 4] }), "|", report());' }
      ],
      words: [
        { t: 'default parameter', m: B('قيمة افتراضية للمدخل لو متبعتش', 'a value used when the input is not passed'), ex: 'function f(x = 1)' },
        { t: 'options object', m: B('كائن إعدادات بدل مدخلات كتير بالترتيب', 'a settings object instead of many ordered inputs'), ex: 'send({ email, lang })' },
        { t: 'rest parameter', m: B('...name بيجمّع باقي المدخلات في مصفوفة', '...name gathers the remaining arguments into an array'), ex: 'function sum(...n)' },
        { t: 'pure function', m: B('نفس المدخلات ← نفس الناتج ومن غير تأثير برّه', 'same inputs → same output, with no outside effects'), ex: 'const add = (a, b) => a + b' },
        { t: 'side effect', m: B('تأثير برّه الدالة: تغيير بيانات، شبكة، ملف، طباعة', 'an effect outside the function: data change, network, file, printing'), ex: 'list.push(x)' },
        { t: 'signature', m: B('شكل الدالة: اسمها ومدخلاتها وناتجها', 'a function’s shape: name, inputs and output'), ex: 'calc(lines, vatRate) → { total }' },
        { t: 'readability', m: B('سهولة إن الكود يتقري ويتفهم', 'how easy code is to read and understand'), ex: 'options objects help readability' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Rest parameters and spread syntax، وDestructuring assignment: Smart function parameters.', 'Rest parameters and spread syntax, and Destructuring assignment: Smart function parameters.') },
        { lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 3: Functions (لحد Closure).', 'Chapter 3: Functions (up to Closure).') }],
      challenge: B('اكتب `buildMessage({ customer, order, lang = "ar", channel = "whatsapp", includeItems = true })` بترجّع نص رسالة تأكيد طلب بالعربي أو الإنجليزي، مختصر لواتساب ومفصّل للإيميل، ونقية تمامًا (مفيش console.log جوه) — مع 6 حالات اختبار ✓.', 'Write `buildMessage({ customer, order, lang = "ar", channel = "whatsapp", includeItems = true })` returning an order-confirmation text in Arabic or English, short for WhatsApp and detailed for email, and completely pure (no console.log inside) — with 6 test cases, all ✓.'),
      quiz: [
        { q: B('`function f(x = 5) { return x; } f(null)`:', '`function f(x = 5) { return x; } f(null)`:'), o: ['null', '5', 'undefined'], a: 0, why: B('الافتراضي لـ undefined بس.', 'Defaults are for undefined only.') },
        { q: B('`function f(...a) { return a.length; } f(1, 2, 3)`:', '`function f(...a) { return a.length; } f(1, 2, 3)`:'), o: ['3', '1', '[1, 2, 3]'], a: 0, why: B('rest مصفوفة.', 'rest is an array.') },
        { q: B('الدالة النقية:', 'A pure function:'), o: [B('مبتغيّرش حاجة برّاها', 'changes nothing outside itself'), B('بتطبع دايمًا', 'always prints'), B('من غير مدخلات', 'has no inputs')], a: 0, why: B('ومن غير side effects.', 'And has no side effects.') },
        { q: B('أوضح نداء:', 'The clearest call:'), o: ['send({ email, lang: "ar", pdf: true })', 'send(e, "ar", true, false)', 'send(true, true)'], a: 0, why: B('الأسماء بتشرح.', 'The names explain.') }
      ] },

    { title: B('Arrow functions والدوال كقيم', 'Arrow functions and functions as values'),
      goal: B('تكتب arrow functions صح، وتبعت دوال لدوال (callbacks)، وتخزّن دوال في متغيرات وكائنات ومصفوفات.', 'Write arrow functions correctly, pass functions to functions (callbacks), and store functions in variables, objects and arrays.'),
      learn: [
        { h: B('شكل الـ arrow function', 'The shape of an arrow function'),
          p: B('`const double = x => x * 2;` نفس `function double(x) { return x * 2; }`. قواعد الكتابة: مدخل واحد ممكن من غير أقواس، صفر أو أكتر من واحد لازم أقواس `(a, b) =>` و`() =>`. لو الجسم تعبير واحد، بيرجّعه **تلقائي** من غير return. لو أكتر من سطر، لازم `{ }` و`return`. ولو بترجّع كائن في سطر: `x => ({ id: x })` (بين قوسين).',
            '`const double = x => x * 2;` equals `function double(x) { return x * 2; }`. Writing rules: one input may skip the brackets; zero or several need them, `(a, b) =>` and `() =>`. If the body is a single expression it is returned **automatically**, without return. With more than one line you need `{ }` and `return`. And returning an object on one line: `x => ({ id: x })` (in brackets).'),
          ex: 'const double = x => x * 2;\nconst add = (a, b) => a + b;\nconst now = () => new Date().getFullYear();\nconst toRow = (name, total) => ({ name, total, vip: total > 1000 });\nconst describe = total => {\n  const label = total > 1000 ? "big" : "small";\n  return `${total} is ${label}`;\n};\nconsole.log(double(4), add(2, 3), typeof now(), toRow("Sara", 1200), describe(50));', run: 'js' },
        { h: B('الدوال قيم زي أي قيمة', 'Functions are values like any other'),
          p: B('الدالة في JS **قيمة**: تتخزّن في متغير، وتتحط في مصفوفة أو كائن، وتتبعت لدالة تانية، وتترجّع من دالة. ده اللي بيخلي `map(fn)` و`addEventListener("click", fn)` و`setTimeout(fn, 1000)` ممكنين. لما تبعت دالة، ابعت **اسمها** من غير قوسين (`fn`)؛ القوسين `fn()` بينفّذوها.',
            'In JS a function is a **value**: it can be stored in a variable, put in an array or object, passed to another function and returned from one. That is what makes `map(fn)`, `addEventListener("click", fn)` and `setTimeout(fn, 1000)` possible. When you pass a function, pass its **name** without brackets (`fn`); `fn()` with brackets runs it.'),
          ex: 'const formatters = {\n  egp: n => n.toFixed(2) + " EGP",\n  usd: n => "$" + (n / 48).toFixed(2),\n  pct: n => (n * 100).toFixed(1) + "%"\n};\nconsole.log(formatters.egp(1250), formatters.usd(1250), formatters.pct(0.137));\nconst steps = [s => s.trim(), s => s.toLowerCase(), s => s.replaceAll(" ", "-")];\nlet slug = "  New Year Offer ";\nfor (const step of steps) slug = step(slug);\nconsole.log(slug);', run: 'js' },
        { h: B('callbacks: ابعت دالة تتنفّذ بعدين', 'Callbacks: pass a function to run later'),
          p: B('الـ **callback** دالة بتبعتها لدالة تانية عشان **هي** تناديها في الوقت المناسب: «لما الزرار يتداس نفّذ دي»، «لكل عنصر نفّذ دي»، «بعد ثانية نفّذ دي». انت بتحدد **إيه** يتعمل، والدالة التانية بتحدد **إمتى** و**على مين**. ده أساس الأحداث وmethods المصفوفات والكود غير المتزامن.',
            'A **callback** is a function you pass to another function so that **it** calls it at the right moment: «when the button is clicked, run this», «for each item, run this», «after one second, run this». You decide **what** happens; the other function decides **when** and **on what**. It is the base of events, array methods and async code.'),
          ex: 'function forEachOrder(orders, callback) {\n  for (const o of orders) callback(o);\n}\nconst orders = [{ id: 1, total: 300 }, { id: 2, total: 1800 }];\nforEachOrder(orders, o => console.log("order", o.id));\nforEachOrder(orders, o => { if (o.total > 1000) console.log("VIP order", o.id); });\nsetTimeout(() => console.log("ran later (after the rest)"), 0);\nconsole.log("this prints first");', run: 'js' },
        { h: B('اكتب دالة بتاخد callback', 'Writing a function that takes a callback'),
          p: B('لما تلاقي دالتين شبه بعض وبيختلفوا في **خطوة واحدة**، خلّي الخطوة دي callback. مثال: `countWhere(list, test)` بتعد العناصر اللي `test(x)` بترجّعلها true — تستخدمها لعدّ المدفوع، أو الكبير، أو اللي من القاهرة، من غير ما تكتب لوب جديد كل مرة. ده بالظبط اللي `filter` وأخواتها بيعملوه.',
            'When two functions are alike and differ in **one step**, make that step a callback. Example: `countWhere(list, test)` counts the items for which `test(x)` returns true — use it to count the paid ones, the big ones or the Cairo ones without writing a new loop each time. That is exactly what `filter` and its siblings do.'),
          ex: 'function countWhere(list, test) {\n  let n = 0;\n  for (const x of list) if (test(x)) n++;\n  return n;\n}\nconst orders = [\n  { total: 300, paid: true, city: "Cairo" }, { total: 1800, paid: false, city: "Giza" },\n  { total: 950, paid: true, city: "Cairo" }\n];\nconsole.log(countWhere(orders, o => o.paid));\nconsole.log(countWhere(orders, o => o.total > 900));\nconsole.log(countWhere(orders, o => o.city === "Cairo"));', run: 'js' },
        { h: B('this والـ arrow functions', 'this and arrow functions'),
          p: B('`this` جوه method عادية (`total() { return this.items... }`) بيشاور على الكائن. الـ arrow function **ملهاش this خاص بيها** — بتاخده من المكان اللي اتكتبت فيه. القاعدة العملية: استخدم method عادية للدوال **جوه الكائنات** اللي محتاجة this، وarrow في كل حتة تانية (callbacks وmap وأحداث). هنتعمّق في this مع الكلاسات.',
            '`this` inside a normal method (`total() { return this.items... }`) points at the object. An arrow function **has no this of its own** — it borrows it from where it was written. The practical rule: use normal methods for functions **inside objects** that need this, and arrows everywhere else (callbacks, map, events). We dig into this with classes.'),
          ex: 'const cart = {\n  items: [100, 250],\n  total() { return this.items.reduce((a, b) => a + b, 0); },\n  badTotal: () => typeof this === "undefined" ? "this is undefined here" : "no items on this"\n};\nconsole.log(cart.total());\nconsole.log(cart.badTotal());', run: 'js' }
      ],
      practice: [
        B('حوّل 6 دوال function لـ arrow functions (منهم واحدة بترجّع كائن).', 'Turn 6 function declarations into arrow functions (one returning an object).'),
        B('اعمل كائن formatters فيه 4 دوال تنسيق واستخدمهم.', 'Make a formatters object holding 4 formatting functions and use them.'),
        B('اعمل مصفوفة خطوات تنضيف (دوال) ولف عليها على نص.', 'Make an array of cleaning steps (functions) and run them over a string.'),
        B('اكتب `countWhere` وجرّبها بـ 4 callbacks مختلفة.', 'Write `countWhere` and try it with 4 different callbacks.'),
        B('اكتب `findFirst(list, test)` بترجّع أول عنصر يحقق الشرط.', 'Write `findFirst(list, test)` returning the first item that passes the test.'),
        B('جرّب this في method عادية وفي arrow جوه كائن وشوف الفرق.', 'Try this in a normal method and in an arrow inside an object and see the difference.')
      ],
      code: [
        { u: B('pipe: سلسلة خطوات', 'pipe: a chain of steps'), p: 'const pipe = (...fns) => input => fns.reduce((value, fn) => fn(value), input);\nconst cleanEmail = pipe(s => String(s ?? ""), s => s.trim(), s => s.toLowerCase());\nconsole.log(cleanEmail("  SARA@Mail.COM "), JSON.stringify(cleanEmail(null)));' }
      ],
      words: [
        { t: 'arrow function', m: B('دالة مختصرة بـ =>', 'a short function written with =>'), ex: 'x => x * 2' },
        { t: 'implicit return', m: B('رجوع تلقائي في arrow من سطر واحد', 'the automatic return of a one-line arrow'), ex: 'x => x + 1' },
        { t: 'callback', m: B('دالة بتتبعت لدالة تانية عشان تناديها', 'a function passed to another function to be called'), ex: 'btn.addEventListener("click", cb)' },
        { t: 'first-class function', m: B('الدوال قيم: تتخزّن وتتبعت وترجع', 'functions are values: stored, passed and returned'), ex: 'const f = add;' },
        { t: 'higher-order function', m: B('دالة بتاخد دالة أو بترجّع دالة', 'a function taking or returning a function'), ex: 'map(fn)' },
        { t: 'this', m: B('الكائن اللي الـ method اتنادت عليه', 'the object a method was called on'), ex: 'this.items' },
        { t: 'method', m: B('دالة جوه كائن', 'a function inside an object'), ex: 'cart.total()' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Function expressions وArrow functions, the basics.', 'Function expressions and Arrow functions, the basics.') },
        { lib: 'MDN: JavaScript Reference', what: B('Arrow function expressions: Description.', 'Arrow function expressions: Description.') }],
      challenge: B('اكتب مكتبة صغيرة `validators` (كائن دوال: required وemail وphone وmin وmax وoneOf) و`validate(record, rules)` بتاخد قواعد زي `{ email: [required, email], qty: [required, min(1)] }` وترجّع كل الأخطاء — الـ min وmax دوال بترجّع دوال.', 'Write a small `validators` library (an object of functions: required, email, phone, min, max, oneOf) and `validate(record, rules)` taking rules like `{ email: [required, email], qty: [required, min(1)] }` and returning every error — with min and max being functions that return functions.'),
      quiz: [
        { q: B('`const f = x => ({ x })` بترجّع:', '`const f = x => ({ x })` returns:'), o: [B('كائن', 'an object'), 'undefined', B('خطأ', 'an error')], a: 0, why: B('الأقواس حوالين الكائن.', 'The brackets around the object.') },
        { q: B('تبعت دالة كـ callback إزاي؟', 'How do you pass a function as a callback?'), o: [B('باسمها من غير ()', 'by name, without ()'), B('بـ fn()', 'as fn()'), B('بين علامات تنصيص', 'in quotes')], a: 0, why: B('() بتنفّذها.', '() runs it.') },
        { q: B('arrow function جوه كائن ومحتاجة this:', 'An arrow function inside an object that needs this:'), o: [B('استخدم method عادية بدالها', 'use a normal method instead'), B('ممتاز كده', 'that is fine'), B('حط this في الأقواس', 'put this in brackets')], a: 0, why: B('arrow ملهاش this خاص.', 'Arrows have no own this.') },
        { q: B('higher-order function:', 'A higher-order function:'), o: [B('بتاخد أو بترجّع دالة', 'takes or returns a function'), B('سريعة', 'is fast'), B('في أول الملف', 'is at the top of the file')], a: 0, why: B('زي map وfilter.', 'Like map and filter.') }
      ] },

    { title: B('النطاق والـ Closures', 'Scope and closures'),
      goal: B('تفهم مين يشوف أنهي متغير، وإزاي الدالة بتفتكر المتغيرات اللي حواليها (closure)، وتستخدم ده في عدّادات وcache وإعدادات.', 'Understand who sees which variable, how a function remembers the variables around it (closure), and use that for counters, caches and settings.'),
      learn: [
        { h: B('النطاق: من جوه بيشوف برّه', 'Scope: inside sees outside'),
          p: B('كل دالة وكل بلوك `{}` ليه نطاق. الكود **جوه** يقدر يقرا المتغيرات اللي **برّه** (وبرّه برّه لحد أعلى الملف)، لكن برّه **ميشوفش** جوه. لو فيه متغيرين بنفس الاسم، الأقرب بيكسب (shadowing) — تجنّبه لأنه بيلخبط. المتغيرات العامة (أعلى الملف) قللها: أي دالة ممكن تغيّرها.',
            'Every function and every `{}` block has a scope. Code **inside** can read variables **outside** (and further out, up to the top of the file), but outside **cannot** see inside. If two variables share a name, the nearest wins (shadowing) — avoid it, it confuses. Keep global variables (top of the file) few: any function can change them.'),
          ex: 'const shop = "Nile Store";          // outer\nfunction receipt(total) {\n  const vat = total * 0.14;           // inner to receipt\n  return `${shop}: ${total + vat}`;   // inside reads outside ✓\n}\nconsole.log(receipt(100));\nconsole.log(typeof vat);              // "undefined": outside cannot see inside\nconst name = "outer";\nfunction shadow() { const name = "inner"; return name; }\nconsole.log(shadow(), name);', run: 'js' },
        { h: B('الـ Closure: الدالة بتفتكر', 'Closure: the function remembers'),
          p: B('لما دالة بتترجّع من جوه دالة تانية، بتفضل **فاكرة** المتغيرات اللي كانت حواليها حتى بعد ما الدالة الأم خلصت. ده اسمه **closure**. مثال: `makeCounter()` بترجّع دالة كل مرة تناديها تزوّد عدّاد خاص بيها محدش برّه يقدر يلمسه. كل نداء لـ makeCounter بيعمل عدّاد جديد مستقل.',
            'When a function is returned from inside another function, it keeps **remembering** the variables that were around it, even after the outer function has finished. That is a **closure**. Example: `makeCounter()` returns a function that, each time you call it, increases its own private counter that nothing outside can touch. Each call to makeCounter makes a new, independent counter.'),
          ex: 'function makeCounter(start = 0) {\n  let count = start;\n  return () => {\n    count++;\n    return count;\n  };\n}\nconst invoices = makeCounter(1000);\nconst tickets = makeCounter();\nconsole.log(invoices(), invoices(), invoices());\nconsole.log(tickets(), tickets());\nconsole.log(typeof count);   // the counters are private', run: 'js' },
        { h: B('دوال بتصنع دوال', 'Functions that make functions'),
          p: B('Closure بيخليك تعمل «مصنع» دوال بإعدادات: `const vatFor = rate => price => price * (1 + rate);` وبعدين `const egyptVat = vatFor(0.14);` و`const ksaVat = vatFor(0.15);`. كل دالة فاكرة نسبتها. ده اسمه **partial application**، وهتستخدمه تعمل validators وformatters وقواعد بإعدادات مختلفة.',
            'Closures let you build a «factory» of functions with settings: `const vatFor = rate => price => price * (1 + rate);` then `const egyptVat = vatFor(0.14);` and `const ksaVat = vatFor(0.15);`. Each function remembers its own rate. This is **partial application**, and you will use it to build validators, formatters and rules with different settings.'),
          ex: 'const vatFor = rate => price => Math.round(price * (1 + rate) * 100) / 100;\nconst egyptVat = vatFor(0.14);\nconst ksaVat = vatFor(0.15);\nconsole.log(egyptVat(100), ksaVat(100));\nconst minLength = n => text => String(text ?? "").length >= n || `needs ${n}+ characters`;\nconst atLeast3 = minLength(3);\nconsole.log(atLeast3("ab"), atLeast3("abcd"));', run: 'js' },
        { h: B('cache بالـ closure (memoize)', 'A cache with a closure (memoize)'),
          p: B('لو دالة بطيئة أو بتكلّف (طلب API، حسبة تقيلة) وبتتنادى بنفس المدخل كتير، خزّن النتايج: closure فيها Map بيفتكر «المدخل ده ناتجه كان كذا». النداء التاني بنفس المدخل بيرجع فورًا. في الأتمتة ده بيوفّر طلبات API ومش بيخليك تعدّي حد الـ rate limit.',
            'If a function is slow or costly (an API request, a heavy calculation) and is called with the same input often, store the results: a closure holding a Map that remembers «this input gave that result». The second call with the same input returns at once. In automation this saves API requests and keeps you under the rate limit.'),
          ex: 'function memoize(fn) {\n  const cache = new Map();\n  return arg => {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}\nlet calls = 0;\nconst slowRate = currency => { calls++; return { USD: 48.5, EUR: 52.1 }[currency] ?? null; };\nconst rate = memoize(slowRate);\nconsole.log(rate("USD"), rate("USD"), rate("EUR"), rate("USD"));\nconsole.log("real calls:", calls);', run: 'js' },
        { h: B('فخ الـ closure في اللوب', 'The closure trap in loops'),
          p: B('مع `var` في لوب، كل الدوال اللي اتعملت جوه بتشوف **نفس** المتغير، فكلهم بيطبعوا آخر قيمة. مع `let` كل لفة ليها متغير جديد، فكل دالة بتفتكر قيمتها. ده سبب تاني تستخدم let/const بس. هتقابل الفخ ده في كود قديم بيستخدم setTimeout جوه for.',
            'With `var` in a loop, every function created inside sees the **same** variable, so they all print the last value. With `let` each round gets a new variable, so each function remembers its own. One more reason to use only let/const. You will meet this trap in old code using setTimeout inside for.'),
          ex: 'const withVar = [], withLet = [];\nfor (var i = 1; i <= 3; i++) withVar.push(() => i);\nfor (let j = 1; j <= 3; j++) withLet.push(() => j);\nconsole.log("var:", withVar.map(f => f()));\nconsole.log("let:", withLet.map(f => f()));', run: 'js' }
      ],
      practice: [
        B('اكتب مثال shadowing وأعد تسميته عشان يبقى واضح.', 'Write a shadowing example, then rename it to make it clear.'),
        B('اعمل `makeCounter` واعمل منه 3 عدّادات مستقلة.', 'Write `makeCounter` and make 3 independent counters with it.'),
        B('اعمل مصنع `discountFor(rate)` و3 دوال خصم منه.', 'Make a `discountFor(rate)` factory and 3 discount functions from it.'),
        B('اعمل `memoize` وأثبت بعدّاد إن الدالة الأصلية اتنادت مرة واحدة لكل مدخل.', 'Write `memoize` and prove with a counter that the original ran once per input.'),
        B('أعد فخ var في اللوب وصلّحه بـ let.', 'Reproduce the var-in-a-loop trap and fix it with let.'),
        B('اكتب `makeIdGenerator(prefix)` بيطلّع `INV-0001` و`INV-0002`...', 'Write `makeIdGenerator(prefix)` producing `INV-0001`, `INV-0002`...')
      ],
      code: [
        { u: B('once: الدالة تشتغل مرة بس', 'once: the function runs only once'), p: 'function once(fn) {\n  let done = false, result;\n  return (...args) => {\n    if (!done) { done = true; result = fn(...args); }\n    return result;\n  };\n}\nconst sendWelcome = once(email => `welcome sent to ${email}`);\nconsole.log(sendWelcome("a@x.com"), "|", sendWelcome("b@x.com"));' }
      ],
      words: [
        { t: 'scope chain', m: B('سلسلة النطاقات من جوه لبرّه اللي JS بيدوّر فيها', 'the chain of scopes from inside out that JS searches'), ex: 'inner → outer → global' },
        { t: 'closure', m: B('دالة فاكرة المتغيرات اللي كانت حواليها', 'a function remembering the variables around it'), ex: 'makeCounter()' },
        { t: 'shadowing', m: B('متغير جوه بنفس اسم متغير برّه بيغطّي عليه', 'an inner variable hiding an outer one with the same name'), ex: 'const name inside and outside' },
        { t: 'global variable', m: B('متغير في أعلى الملف أي حد يقدر يغيّره', 'a variable at the top level that anything can change'), ex: 'let config = …' },
        { t: 'factory function', m: B('دالة بتصنع وترجّع دوال أو كائنات', 'a function that makes and returns functions or objects'), ex: 'vatFor(0.14)' },
        { t: 'memoize', m: B('تخزين نتايج دالة عشان متتحسبش تاني', 'storing a function’s results so they are not recomputed'), ex: 'memoize(fetchRate)' },
        { t: 'private state', m: B('بيانات محدش برّه يقدر يوصلها', 'data nothing outside can reach'), ex: 'the counter inside a closure' }
      ],
      read: [{ lib: 'MDN: Closures', what: B('الصفحة كلها، وخصوصًا Practical closures وEmulating private methods.', 'The whole page, especially Practical closures and Emulating private methods.') },
        { lib: 'The Modern JavaScript Tutorial', what: B('Variable scope, closure (بالتمارين).', 'Variable scope, closure (with the exercises).') }],
      challenge: B('اعمل `rateLimiter(maxPerMinute)` بيرجّع دالة `tryRun(task)`: لو عدد التشغيلات في آخر 60 ثانية أقل من الحد ينفّذ ويرجّع النتيجة، وإلا يرجّع `{ waitMs }` — بـ closure فيها مصفوفة أوقات، وجرّبه بـ «ساعة وهمية» (دالة now بتتبعت) عشان الاختبار ميستناش دقيقة فعلًا.', 'Build `rateLimiter(maxPerMinute)` returning a function `tryRun(task)`: if fewer runs than the limit happened in the last 60 seconds it runs the task and returns its result, otherwise it returns `{ waitMs }` — using a closure holding an array of times, and tested with a «fake clock» (a now function passed in) so the test does not really wait a minute.'),
      quiz: [
        { q: B('الكود جوه دالة يقدر يقرا متغيرات:', 'Code inside a function can read variables:'), o: [B('اللي برّاها', 'outside it'), B('اللي جوه دوال تانية', 'inside other functions'), B('ولا حاجة', 'none')], a: 0, why: B('من جوه لبرّه.', 'Inside sees outside.') },
        { q: B('`const c = makeCounter(); c(); c();` آخر قيمة:', '`const c = makeCounter(); c(); c();` the last value:'), o: ['2', '1', '0'], a: 0, why: B('العدّاد فاكر.', 'The counter remembers.') },
        { q: B('memoize بيفيد لما:', 'memoize helps when:'), o: [B('الدالة بطيئة وبتتنادى بنفس المدخل', 'the function is slow and called with the same input'), B('الدالة بتطبع', 'the function prints'), B('مفيش مدخلات', 'there are no inputs')], a: 0, why: B('بيوفّر الحساب.', 'It saves the work.') },
        { q: B('في `for (let i...) fns.push(() => i)` كل دالة بترجّع:', 'In `for (let i...) fns.push(() => i)` each function returns:'), o: [B('قيمة i في لفتها', 'i’s value in its own round'), B('آخر قيمة', 'the last value'), 'undefined'], a: 0, why: B('let متغير جديد كل لفة.', 'let makes a new variable each round.') }
      ] },

    { title: B('مشروع: مكتبة أدوات تنضيف وتنسيق', 'A project: a cleaning and formatting toolkit'),
      goal: B('تجمع الأسبوع في مكتبة دوال صغيرة نقية وقابلة لإعادة الاستخدام، بأسماء واضحة واختبارات، تستخدمها في كل مشاريعك الجاية.', 'Bring the week together in a small library of pure, reusable functions with clear names and tests, for use in all your future projects.'),
      learn: [
        { h: B('ليه مكتبة خاصة بيك', 'Why your own library'),
          p: B('هتكتب نفس الحاجات في كل مشروع: تنضيف موبايل وإيميل، أول حرف كبير، تنسيق فلوس وتواريخ، قرّب لقرشين، شيل التكرار. اجمعهم في ملف واحد `utils.mjs` بدوال نقية مختبرة، وانسخه لأي مشروع (أو Code node). ده بيوفّر ساعات ويقلل الأخطاء، ومع الوقت بيبقى «صندوق عدّتك».',
            'You will write the same things in every project: cleaning a phone and an email, capitalising, formatting money and dates, rounding to two decimals, removing duplicates. Gather them in one `utils.mjs` file of tested pure functions, and copy it into any project (or Code node). It saves hours and reduces mistakes, and in time it becomes «your toolbox».'),
          ex: '// utils.mjs — the plan\n// text:   clean, titleCase, slugify, mask\n// numbers: round2, toNumber, money\n// people: cleanPhone, isValidPhone, cleanEmail, isValidEmail\n// lists:  unique, groupBy, sumBy\nconsole.log("toolkit plan ready");', run: 'js' },
        { h: B('دوال النصوص', 'Text functions'),
          p: B('كل دالة بتقبل أي قيمة (حتى null) وبتحوّلها لنص الأول بـ `String(v ?? "")` — عشان متقعش لو جالها حقل فاضي. `slugify` بيعمل اسم صالح لملف أو رابط، و`mask` بيخفي نص البيانات الحساسة. خلي كل دالة قصيرة ومفهومة من اسمها.',
            'Every function accepts any value (even null) and turns it into text first with `String(v ?? "")` — so it never crashes on an empty field. `slugify` makes a name safe for a file or a link, and `mask` hides part of sensitive data. Keep each function short and clear from its name.'),
          ex: 'const text = v => String(v ?? "").trim();\nconst titleCase = v => text(v).toLowerCase().split(/\\s+/).filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join(" ");\nconst slugify = v => text(v).toLowerCase().replace(/[^a-z0-9\\u0600-\\u06FF]+/g, "-").replace(/^-+|-+$/g, "");\nconst mask = (v, keep = 3) => { const s = text(v); return s.length <= keep * 2 ? "*".repeat(s.length) : s.slice(0, keep) + "*".repeat(s.length - keep * 2) + s.slice(-keep); };\nconsole.log(titleCase("  aHMED ali "), slugify("New Offer: 50% OFF!"), mask("01012345678"), JSON.stringify(titleCase(null)));', run: 'js' },
        { h: B('دوال الأرقام والفلوس', 'Number and money functions'),
          p: B('`toNumber` بيقبل `"1,250.50"` و`"١٢٥٠"` (أرقام عربي) و`" 99 "` ويرجّع رقم أو null. `round2` للفلوس. `money(n, currency)` بيرجّع نص منسّق بـ Intl. الأرقام العربي (٠١٢٣...) بتتحوّل بجدول بسيط — ده بيحصل كتير في بيانات العملاء المصرية.',
            '`toNumber` accepts `"1,250.50"`, `"١٢٥٠"` (Arabic digits) and `" 99 "` and returns a number or null. `round2` for money. `money(n, currency)` returns formatted text with Intl. Arabic digits (`٠١٢٣...`) are converted with a simple table — common in Egyptian customer data.'),
          ex: 'const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";\nconst toWestern = s => String(s ?? "").replace(/[٠-٩]/g, d => AR_DIGITS.indexOf(d));\nconst toNumber = v => { const n = Number(toWestern(v).replaceAll(",", "").trim()); return v === "" || v == null || Number.isNaN(n) ? null : n; };\nconst round2 = n => Math.round(n * 100) / 100;\nconst money = (n, currency = "EGP") => new Intl.NumberFormat("en", { style: "currency", currency }).format(n);\nconsole.log(toNumber("1,250.50"), toNumber("١٢٥٠"), toNumber("abc"), toNumber(""));\nconsole.log(round2(10.005 + 0.1), money(1250.5), money(99, "USD"));', run: 'js' },
        { h: B('دوال القوايم', 'List functions'),
          p: B('`unique` لشيل المكرر (حتى بمفتاح: نفس الإيميل)، و`groupBy` و`sumBy` بـ callback للمفتاح. لما الدالة بتاخد callback، بتشتغل على أي شكل بيانات: `sumBy(orders, o => o.total)` و`groupBy(tickets, t => t.team)`. ده نفس تصميم مكتبات زي lodash.',
            '`unique` removes duplicates (even by a key: the same email), plus `groupBy` and `sumBy` with a callback for the key. Because they take callbacks, they work on any data shape: `sumBy(orders, o => o.total)` and `groupBy(tickets, t => t.team)`. The same design as libraries such as lodash.'),
          ex: 'const unique = (list, key = x => x) => { const seen = new Set(); return list.filter(x => { const k = key(x); if (seen.has(k)) return false; seen.add(k); return true; }); };\nconst groupBy = (list, key) => list.reduce((g, x) => { (g[key(x)] ??= []).push(x); return g; }, {});\nconst sumBy = (list, value) => list.reduce((s, x) => s + value(x), 0);\nconst people = [{ e: "a@x.com", city: "Cairo", t: 10 }, { e: "A@x.com".toLowerCase(), city: "Cairo", t: 5 }, { e: "b@x.com", city: "Giza", t: 7 }];\nconsole.log(unique(people, p => p.e).length, Object.keys(groupBy(people, p => p.city)), sumBy(people, p => p.t));', run: 'js' },
        { h: B('اختبر مكتبتك', 'Test your library'),
          p: B('مكتبة من غير اختبارات مش مكتبة. اعمل دالة `test(name, got, want)` بتقارن (بـ JSON.stringify للكائنات والمصفوفات) وتطبع ✓ أو ✗ وتعد. اكتب 3 حالات على الأقل لكل دالة منهم حالة «غريبة» (null، نص فاضي، أرقام عربي). لما تعدّل دالة بعدين، شغّل الاختبارات تطمّن.',
            'A library without tests is not a library. Write a `test(name, got, want)` function that compares (with JSON.stringify for objects and arrays), prints ✓ or ✗ and keeps count. Write at least 3 cases per function, one of them «odd» (null, empty text, Arabic digits). When you change a function later, run the tests and relax.'),
          ex: 'let pass = 0, fail = 0;\nfunction test(name, got, want) {\n  const ok = JSON.stringify(got) === JSON.stringify(want);\n  ok ? pass++ : fail++;\n  console.log(ok ? "✓" : "✗", name, ok ? "" : `got ${JSON.stringify(got)} want ${JSON.stringify(want)}`);\n}\nconst cleanPhone = v => String(v ?? "").replace(/\\D/g, "").replace(/^20(?=1)/, "0");\ntest("dashes", cleanPhone("010-1234-5678"), "01012345678");\ntest("country code", cleanPhone("+20 10 1234 5678"), "01012345678");\ntest("null", cleanPhone(null), "");\nconsole.log(`${pass} passed, ${fail} failed`);', run: 'js' }
      ],
      practice: [
        B('اكتب خطة utils فيها 4 مجموعات و12 دالة.', 'Write a utils plan with 4 groups and 12 functions.'),
        B('اكتب دوال النصوص الأربعة وجرّبهم على null ونص فاضي.', 'Write the four text functions and try them on null and empty text.'),
        B('اكتب toNumber بيفهم الفواصل والأرقام العربي.', 'Write toNumber understanding separators and Arabic digits.'),
        B('اكتب unique بمفتاح وgroupBy وsumBy بـ callbacks.', 'Write unique with a key, and groupBy and sumBy with callbacks.'),
        B('اكتب دالة test و3 حالات لكل دالة.', 'Write a test function and 3 cases per function.'),
        B('استخدم المكتبة تنضّف 10 صفوف حقيقية.', 'Use the library to clean 10 real rows.')
      ],
      code: [
        { u: B('ملف utils.mjs بالتصدير', 'utils.mjs with exports'), p: '// utils.mjs\nexport const text = v => String(v ?? "").trim();\nexport const round2 = n => Math.round(n * 100) / 100;\nexport const cleanEmail = v => text(v).toLowerCase();\n// in another file:\n// import { cleanEmail, round2 } from "./utils.mjs";', show: 1, lang: 'js' }
      ],
      words: [
        { t: 'utility function', m: B('دالة مساعدة عامة بتستخدمها في كل مكان', 'a general helper function used everywhere'), ex: 'round2(n)' },
        { t: 'toolkit', m: B('مجموعة أدوات جاهزة', 'a set of ready tools'), ex: 'my utils toolkit' },
        { t: 'slug', m: B('اسم صالح لرابط أو ملف من حروف وأرقام وشرط', 'a link- or file-safe name of letters, digits and dashes'), ex: 'new-offer-50-off' },
        { t: 'mask', m: B('إخفاء جزء من بيانات حساسة', 'hiding part of sensitive data'), ex: '010*****678' },
        { t: 'assertion', m: B('سطر بيتأكد إن الناتج زي المتوقع', 'a line checking that a result is as expected'), ex: 'test("null", f(null), "")' },
        { t: 'export', m: B('تخلّي دالة متاحة لملفات تانية', 'making a function available to other files'), ex: 'export const round2 = …' },
        { t: 'import', m: B('تجيب دالة من ملف تاني', 'bringing in a function from another file'), ex: 'import { round2 } from "./utils.mjs"' }
      ],
      read: [{ lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 3: Closure وRecursion وGrowing functions وFunctions and side effects.', 'Chapter 3: Closure, Recursion, Growing functions, and Functions and side effects.') },
        { lib: 'Exercism: JavaScript track', what: B('حل تمرينين من concept «Functions» وتمرين «Closures».', 'Solve two exercises from the «Functions» concept and the «Closures» one.') }],
      challenge: B('حوّل المكتبة لملف `utils.mjs` بـ export، واعمل `utils.test.mjs` بيستورد كل الدوال ويشغّل 36 حالة اختبار ويطلع `process.exitCode = 1` لو فيه أي فشل — وشغّله بـ `node utils.test.mjs`.', 'Turn the library into a `utils.mjs` file with exports, and write `utils.test.mjs` that imports every function, runs 36 test cases and sets `process.exitCode = 1` on any failure — then run it with `node utils.test.mjs`.'),
      quiz: [
        { q: B('ليه دوال المكتبة تبدأ بـ `String(v ?? "")`؟', 'Why do the library functions start with `String(v ?? "")`?'), o: [B('عشان متقعش على null أو undefined', 'so they never crash on null or undefined'), B('أسرع', 'faster'), B('عادة بس', 'just habit')], a: 0, why: B('حقول فاضية كتير.', 'Many fields are empty.') },
        { q: B('`toNumber("١٢")` في المكتبة بيرجّع:', '`toNumber("١٢")` in the library returns:'), o: ['12', 'NaN', 'null'], a: 0, why: B('بيحوّل الأرقام العربي.', 'It converts Arabic digits.') },
        { q: B('ميزة `sumBy(list, fn)` إنها:', 'The advantage of `sumBy(list, fn)` is that it:'), o: [B('تشتغل على أي شكل بيانات', 'works on any data shape'), B('مبتحتاجش callback', 'needs no callback'), B('بترتّب', 'sorts')], a: 0, why: B('الـ callback بيحدد القيمة.', 'The callback picks the value.') },
        { q: B('كل دالة في المكتبة محتاجة:', 'Each library function needs:'), o: [B('حالات اختبار منهم حالة غريبة', 'test cases, including an odd one'), B('console.log جواها', 'a console.log inside'), B('متغير عام', 'a global variable')], a: 0, why: B('ثقة لما تعدّل.', 'Confidence when you change it.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تراجع الدوال والنطاق والـ closures، وتسلّم مكتبة مختبرة ومشروع بيستخدمها، وتعدّي اختبار الأسبوع.', 'Review functions, scope and closures, deliver a tested library and a project using it, and pass the weekly test.'),
      review: [
        B('الدالة اسم لشغل بيتكرر: parameters داخلة وreturn خارجة، وحاجة واحدة بس.', 'A function names repeated work: parameters in, return out, one job only.'),
        B('return بيخرج فورًا، ومن غيره الناتج undefined.', 'return leaves at once; without it the result is undefined.'),
        B('قيم افتراضية لـ undefined بس، وكائن إعدادات لما المدخلات تكتر.', 'Defaults are for undefined only; use an options object when inputs pile up.'),
        B('`...rest` بيجمّع، و`...spread` بيفك.', '`...rest` gathers, and `...spread` unpacks.'),
        B('الدالة النقية مبتغيّرش حاجة برّاها وأسهل في الاختبار.', 'A pure function changes nothing outside itself and is easiest to test.'),
        B('arrow: سطر واحد بيرجّع تلقائي، وكائن بين ()، وملهاش this خاص.', 'Arrows: one line returns automatically, an object goes in (), and no own this.'),
        B('الدوال قيم: تتبعت callbacks وتتخزّن في كائنات ومصفوفات.', 'Functions are values: passed as callbacks and stored in objects and arrays.'),
        B('Closure: الدالة فاكرة متغيراتها — عدّادات ومصانع دوال وcache.', 'Closures: functions remember their variables — counters, function factories and caches.')
      ],
      project: B('**مشروع الأسبوع: «مكتبة أدواتي + منظّف قايمة».**\n1. `utils.mjs` فيه 14 دالة نقية على الأقل في 4 مجموعات (نصوص، أرقام وفلوس، أشخاص، قوايم) بـ export، وكل دالة بتتحمّل null.\n2. `utils.test.mjs` فيه 3 حالات لكل دالة وبيطلع exit code 1 لو فيه فشل.\n3. `clean-list.mjs` بيستورد المكتبة ويستخدمها على 25 صف عميل (اكتبهم بأخطاء): تنضيف، تحقق، شيل المكرر بالإيميل، تجميع بالمدينة، إجمالي بـ sumBy.\n4. استخدم closure واحدة على الأقل (مثلًا `makeIdGenerator` لأرقام العملاء الجديدة، أو memoize).\n5. اطبع تقرير بالـ formatters بتاعتك، ومفيش أي console.log جوه utils.',
        '**Weekly project: «my toolkit + a list cleaner».**\n1. `utils.mjs` holding at least 14 pure functions in 4 groups (text, numbers and money, people, lists) with exports, each handling null.\n2. `utils.test.mjs` with 3 cases per function, exiting with code 1 on any failure.\n3. `clean-list.mjs` importing the library and using it on 25 customer rows (write them with mistakes): clean, validate, remove duplicates by email, group by city, total with sumBy.\n4. Use at least one closure (for instance `makeIdGenerator` for new customer numbers, or memoize).\n5. Print a report with your formatters, and no console.log at all inside utils.'),
      test: [
        { q: B('`function f(a, b = 2) { return a + b; } f(3)`:', '`function f(a, b = 2) { return a + b; } f(3)`:'), o: ['5', 'NaN', '3'], a: 0, why: B('b افتراضي 2.', 'b defaults to 2.') },
        { q: B('`const g = () => { 5 }; g()`:', '`const g = () => { 5 }; g()`:'), o: ['undefined', '5', B('خطأ', 'an error')], a: 0, why: B('مع {} لازم return.', 'With {} you need return.') },
        { q: B('`const h = () => 5; h()`:', '`const h = () => 5; h()`:'), o: ['5', 'undefined', '"5"'], a: 0, why: B('رجوع تلقائي.', 'Implicit return.') },
        { q: B('`function s(...n) { return n; } s()`:', '`function s(...n) { return n; } s()`:'), o: ['[]', 'undefined', 'null'], a: 0, why: B('مصفوفة فاضية.', 'An empty array.') },
        { q: B('أنهي دالة نقية؟', 'Which function is pure?'), o: ['const add = (a, b) => a + b', 'const log = x => console.log(x)', 'const push = x => list.push(x)'], a: 0, why: B('مفيش side effects.', 'No side effects.') },
        { q: B('تبعت دالة اسمها handle كـ callback:', 'Passing a function named handle as a callback:'), o: ['btn.addEventListener("click", handle)', 'btn.addEventListener("click", handle())', 'btn.addEventListener("click", "handle")'], a: 0, why: B('من غير ().', 'Without ().') },
        { q: B('متغير اتعرّف جوه دالة:', 'A variable declared inside a function:'), o: [B('مش متشاف برّاها', 'is not visible outside it'), B('متشاف في كل الملف', 'is visible in the whole file'), B('بيبقى global', 'becomes global')], a: 0, why: B('نطاق الدالة.', 'Function scope.') },
        { q: B('`const mk = n => () => n * 2; mk(4)()`:', '`const mk = n => () => n * 2; mk(4)()`:'), o: ['8', 'function', 'NaN'], a: 0, why: B('closure فاكرة n.', 'The closure remembers n.') },
        { q: B('العدّادين `a = makeCounter()` و`b = makeCounter()`:', 'The counters `a = makeCounter()` and `b = makeCounter()`:'), o: [B('مستقلين', 'are independent'), B('بيشتركوا في نفس العدّ', 'share the same count'), B('واحد بس شغال', 'only one works')], a: 0, why: B('كل نداء closure جديدة.', 'Each call makes a new closure.') },
        { q: B('memoize بيخزّن:', 'memoize stores:'), o: [B('نتايج الدالة لكل مدخل', 'the function’s result per input'), B('الكود', 'the code'), B('الأخطاء بس', 'only errors')], a: 0, why: B('cache.', 'A cache.') },
        { q: B('أحسن توقيع لدالة إرسال بـ 6 إعدادات:', 'The best signature for a send function with 6 settings:'), o: ['send({ to, subject, lang, pdf, cc, retries })', 'send(to, subject, lang, pdf, cc, retries)', 'send(settings1, settings2)'], a: 0, why: B('كائن مفكوك واضح.', 'A clear destructured object.') },
        { q: B('`this` جوه arrow function في كائن:', '`this` inside an arrow function in an object:'), o: [B('مش الكائن', 'is not the object'), B('هو الكائن', 'is the object'), B('هو الدالة', 'is the function')], a: 0, why: B('arrow بتاخد this من برّه.', 'Arrows take this from outside.') }
      ] }
  ]
};
