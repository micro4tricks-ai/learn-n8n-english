// JavaScript week 8 — errors, debugging, DevTools and the month project.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('الأخطاء والـ Debugging وأدوات المطوّر ومشروع الشهر', 'Errors, debugging, DevTools and the month project'),
  goal: B('تقرا رسالة أي خطأ وتعرف مكانه وسببه، وتمسك الأخطاء بـ try/catch/finally وترمي أخطاء واضحة بنفسك، وتستخدم DevTools (breakpoints وwatch وNetwork) وdebugger في Node، وتسجّل لوجات مفيدة — وتسلّم مشروع الشهر التاني: أداة بيانات قوية مبتقعش.',
          'Read any error message and know where and why it happened, catch errors with try/catch/finally and throw clear ones yourself, use DevTools (breakpoints, watch and Network) and the Node debugger, and write useful logs — then deliver the second month’s project: a robust data tool that does not crash.'),
  days: [
    { title: B('قراية رسالة الخطأ', 'Reading an error message'),
      goal: B('تعرف أنواع الأخطاء الأساسية وتقرا الرسالة والـ stack عشان توصل للسطر والسبب في ثواني.', 'Know the basic error types and read the message and stack to reach the line and the cause in seconds.'),
      learn: [
        { h: B('الخطأ صاحبك مش عدوك', 'An error is your friend, not your enemy'),
          p: B('رسالة الخطأ بتقولك **3 حاجات**: النوع (`TypeError`)، والوصف (`Cannot read properties of undefined (reading \'name\')`)، والمكان (الملف ورقم السطر). اقرا الأول السطر الأول كامل ببطء — غالبًا الحل فيه. وبعدين روح للسطر ده واسأل: «القيمة دي كانت إيه فعلًا؟». أغلب المبتدئين بيقفلوا الرسالة من غير ما يقروها.',
            'An error message tells you **3 things**: the type (`TypeError`), the description (`Cannot read properties of undefined (reading \'name\')`) and the place (the file and line number). Read the first line fully and slowly — the answer is often there. Then go to that line and ask: «what was that value really?». Most beginners close the message without reading it.'),
          ex: 'try {\n  const order = {};\n  console.log(order.customer.name);\n} catch (err) {\n  console.log("type:", err.name);\n  console.log("message:", err.message);\n  console.log("where:", err.stack.split("\\n")[1]?.trim());\n}', run: 'js' },
        { h: B('أشهر 4 أنواع', 'The four commonest types'),
          p: B('**ReferenceError**: اسم مش متعرّف (غلطة كتابة أو متغير برّه نطاقه). **TypeError**: عملية على قيمة من نوع غلط (تنادي حاجة مش دالة، أو تقرا من undefined/null، أو تغيّر const). **SyntaxError**: الكود نفسه مكتوب غلط (قوس ناقص) — أو JSON بايظ. **RangeError**: رقم برّه المسموح (مصفوفة بطول سالب، recursion من غير نهاية).',
            '**ReferenceError**: a name that is not defined (a typo, or a variable outside its scope). **TypeError**: an operation on a value of the wrong type (calling something that is not a function, reading from undefined/null, changing a const). **SyntaxError**: the code itself is written wrong (a missing bracket) — or broken JSON. **RangeError**: a number outside what is allowed (an array of negative length, endless recursion).'),
          ex: 'const tests = [\n  () => totl + 1,\n  () => (5)(),\n  () => JSON.parse("{bad json}"),\n  () => new Array(-1),\n  () => { const x = 1; x = 2; }\n];\nfor (const t of tests) {\n  try { t(); } catch (err) { console.log(err.name.padEnd(15), err.message); }\n}', run: 'js' },
        { h: B('الـ stack trace: الطريق للخطأ', 'The stack trace: the road to the error'),
          p: B('الـ **stack** هو سلسلة الدوال اللي اتنادت لحد ما الخطأ حصل، من الأحدث (فوق) للأقدم (تحت): «الخطأ في `computeTotal` السطر 12، اللي اتنادت من `handle` السطر 30، اللي اتنادت من `main`». ابدأ من أول سطر في **كودك انت** (مش مكتبة). في Node بيظهر لوحده، وفي المتصفح جنب الرسالة في الـ Console ومكتوب جنبه رابط للسطر.',
            'The **stack** is the chain of functions called up to the moment the error happened, from newest (top) to oldest (bottom): «the error is in `computeTotal` line 12, called from `handle` line 30, called from `main`». Start from the first line in **your own code** (not a library). Node prints it by itself, and in the browser it sits next to the message in the Console with a link to the line.'),
          ex: 'function computeTotal(order) { return order.items.reduce((s, i) => s + i.qty * i.price, 0); }\nfunction handle(order) { return { id: order.id, total: computeTotal(order) }; }\nfunction main() { return handle({ id: 7 }); }\ntry { main(); } catch (err) {\n  console.log(err.message);\n  console.log(err.stack.split("\\n").slice(1, 4).map(l => l.trim().split(" (")[0]).join("\\n"));\n}', run: 'js' },
        { h: B('أخطاء من غير رسالة: النتيجة الغلط', 'Errors with no message: the wrong result'),
          p: B('أخطر الأخطاء اللي **ملهاش رسالة**: الكود شغال بس الرقم غلط. NaN في إجمالي، أو `"1205"` بدل 125، أو `undefined` في رسالة عميل، أو فلتر بيرجّع صفر صفوف. اتعلم تشك: اطبع القيم الوسيطة، وقارن بحسبة يدوية لصف واحد، واختبر حالات فاضية وغريبة. الرسالة الحمرا أحسن من رقم غلط بيروح للعميل.',
            'The most dangerous errors are the ones **with no message**: the code runs but the number is wrong. NaN in a total, `"1205"` instead of 125, `undefined` in a customer message, or a filter returning zero rows. Learn to be suspicious: print the intermediate values, compare with a hand calculation for one row, and test empty and odd cases. A red message beats a wrong number sent to a customer.'),
          ex: 'const rows = [{ qty: "2", price: "45" }, { qty: 3, price: 10 }, { qty: "x", price: 5 }];\nlet total = 0;\nfor (const r of rows) total += r.qty * r.price;\nconsole.log("total:", total);   // NaN — silently\nconst bad = rows.filter(r => Number.isNaN(r.qty * r.price));\nconsole.log("rows that broke it:", bad);', run: 'js' },
        { h: B('اسأل السؤال الصح', 'Asking the right question'),
          p: B('لما تتعطّل: (1) اكتب الرسالة بالظبط، (2) اعمل أصغر مثال بيعمل نفس الخطأ (5 أسطر)، (3) قول كنت متوقع إيه وحصل إيه. ده بيحل 70% من المشاكل لوحده وانت بتكتبه. ولو لسه، المثال الصغير ده هو اللي تحطه في سؤال لزميل أو منتدى أو مساعد AI — مش 300 سطر وكلمة «مش شغال».',
            'When you are stuck: (1) write down the exact message, (2) make the smallest example that gives the same error (5 lines), (3) say what you expected and what happened. That alone solves 70% of problems while you write it. If not, that small example is what you put in a question to a colleague, a forum or an AI assistant — not 300 lines and «it does not work».'),
          ex: '// A good bug report, as code comments:\n// Expected: total() returns 135 for [{qty:"2",price:"45"},{qty:3,price:15}]\n// Got:      "245" + 45 = "24545"?? → actually NaN only when qty is text\n// Smallest example:\nconst total = rows => rows.reduce((s, r) => s + Number(r.qty) * Number(r.price), 0);\nconsole.log(total([{ qty: "2", price: "45" }, { qty: 3, price: 15 }]));', run: 'js' }
      ],
      practice: [
        B('اعمل كل نوع من الأنواع الأربعة عمدًا واكتب رسالته ومعناها.', 'Cause each of the four error types on purpose and write down its message and meaning.'),
        B('اكتب 3 دوال بتنادي بعض وخلي الأخيرة تقع، واقرا الـ stack.', 'Write 3 functions calling each other, make the last one fail, and read the stack.'),
        B('اعمل حسبة بترجّع NaN بصمت ولاقي الصف السبب.', 'Write a calculation that silently returns NaN and find the guilty row.'),
        B('اكتب «تقرير مشكلة» من 3 أجزاء لخطأ قابلته.', 'Write a three-part «bug report» for an error you met.'),
        B('صغّر كود فيه خطأ لـ 5 أسطر أو أقل بنفس الخطأ.', 'Shrink buggy code down to 5 lines or fewer with the same error.'),
        B('اعمل جدول: 8 رسايل أخطاء حقيقية وسببها الغالب.', 'Make a table: 8 real error messages and their usual cause.')
      ],
      code: [
        { u: B('ورقة أسباب سريعة', 'A quick causes sheet'), p: '// Cannot read properties of undefined (reading "x")  → the thing before .x is undefined\n// x is not a function                               → wrong name, or not what you think\n// x is not defined                                  → typo, or out of scope\n// Unexpected token < in JSON                        → you got HTML, not JSON\n// Assignment to constant variable                   → use let\n// NaN in a total                                    → text or undefined in the maths', show: 1, lang: 'text' }
      ],
      words: [
        { t: 'error message', m: B('الرسالة اللي بتشرح الخطأ', 'the message explaining the error'), ex: 'Cannot read properties of undefined' },
        { t: 'TypeError', m: B('عملية على قيمة من نوع غلط', 'an operation on a value of the wrong type'), ex: 'null.name' },
        { t: 'ReferenceError', m: B('اسم مش متعرّف', 'a name that is not defined'), ex: 'totl is not defined' },
        { t: 'SyntaxError', m: B('الكود أو الـ JSON مكتوب غلط', 'the code or JSON is written wrong'), ex: 'Unexpected token' },
        { t: 'stack trace', m: B('سلسلة الدوال اللي وصلت للخطأ بأرقام السطور', 'the chain of calls that led to the error, with line numbers'), ex: 'at computeTotal (app.js:12)' },
        { t: 'bug', m: B('خطأ في البرنامج', 'a mistake in a program'), ex: 'fix the bug' },
        { t: 'minimal reproduction', m: B('أصغر كود بيعمل نفس المشكلة', 'the smallest code that shows the same problem'), ex: 'a 5-line example' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Error handling, "try...catch" (لحد Error object).', 'Error handling, "try...catch" (up to Error object).') },
        { lib: 'MDN: JavaScript Reference', what: B('Error وTypeError وReferenceError: Description.', 'Error, TypeError and ReferenceError: Description.') }],
      challenge: B('خد 6 أسطر كود فيهم 6 أخطاء مختلفة (اكتبهم لزميلك أو لنفسك من غير ما تبص على الحل): لكل خطأ اكتب الرسالة المتوقعة قبل التشغيل، وشغّل، وصلّح، واكتب سطر سبب — ولاقي كمان خطأ «من غير رسالة» واحد على الأقل.', 'Take 6 lines of code with 6 different mistakes (write them for a colleague or yourself without peeking at the fix): for each, write the expected message before running, run, fix it, and write a one-line cause — and find at least one «silent» error too.'),
      quiz: [
        { q: B('`Cannot read properties of undefined (reading \'name\')` معناها:', '`Cannot read properties of undefined (reading \'name\')` means:'), o: [B('اللي قبل .name قيمته undefined', 'the thing before .name is undefined'), B('name مش موجود في اللغة', 'name does not exist in the language'), B('الملف ناقص', 'the file is missing')], a: 0, why: B('اقرا من الشمال.', 'Read from the left.') },
        { q: B('`totl is not defined` نوعه:', '`totl is not defined` is a:'), o: ['ReferenceError', 'TypeError', 'SyntaxError'], a: 0, why: B('اسم مش متعرّف.', 'An undefined name.') },
        { q: B('في الـ stack تبدأ من:', 'In a stack you start from:'), o: [B('أول سطر في كودك انت', 'the first line in your own code'), B('آخر سطر', 'the last line'), B('سطور المكتبات', 'the library lines')], a: 0, why: B('هناك غالبًا السبب.', 'That is usually the cause.') },
        { q: B('أخطر نوع أخطاء:', 'The most dangerous kind of error:'), o: [B('النتيجة الغلط من غير رسالة', 'a wrong result with no message'), B('SyntaxError', 'a SyntaxError'), B('اللي بيوقف البرنامج', 'one that stops the program')], a: 0, why: B('بيوصل للعميل.', 'It reaches the customer.') }
      ] },

    { title: B('try وcatch وfinally وthrow', 'try, catch, finally and throw'),
      goal: B('تمسك الأخطاء المتوقعة بأدب، وترمي أخطاء برسائل واضحة، وتنضّف في finally، ومتبلعش أخطاء بصمت.', 'Catch expected errors gracefully, throw errors with clear messages, clean up in finally, and never swallow errors silently.'),
      learn: [
        { h: B('try/catch: خطة بديلة', 'try/catch: a backup plan'),
          p: B('`try { ... } catch (err) { ... }`: لو أي سطر جوه try رمى خطأ، JS بيقفز فورًا لـ catch بالخطأ في `err`، والبرنامج **يكمّل** بدل ما يقع. استخدمه حوالين الحاجات اللي ممكن تفشل لأسباب برّه إيدك: JSON من برّه، وطلبات الشبكة، وقراية ملفات. متحطّوش حوالين كل حاجة — الأخطاء البرمجية (typo) لازم تبان وتتصلّح.',
            '`try { ... } catch (err) { ... }`: if any line inside try throws, JS jumps straight to catch with the error in `err`, and the program **carries on** instead of crashing. Use it around things that can fail for reasons outside your control: outside JSON, network requests, file reading. Do not wrap everything — programming mistakes (typos) must show up and be fixed.'),
          ex: 'const bodies = [\'{"id": 1}\', "{oops}", \'{"id": 3}\'];\nconst ok = [], failed = [];\nfor (const [i, text] of bodies.entries()) {\n  try {\n    ok.push(JSON.parse(text));\n  } catch (err) {\n    failed.push({ row: i, reason: err.message });\n  }\n}\nconsole.log("ok:", ok.length, "failed:", failed);', run: 'js' },
        { h: B('throw: ارمي خطأ واضح', 'throw: raise a clear error'),
          p: B('لما دالتك تلاقي حالة مستحيلة تكمّل فيها (مدخل غلط، حقل مطلوب ناقص)، **ارمي خطأ**: `throw new Error("missing email for order 77")`. الرسالة لازم تقول **إيه** و**فين** (رقم الطلب أو الصف). ده أحسن بكتير من إنك ترجّع null والكود اللي بعده يقع بعد 10 أسطر برسالة مبهمة. وفي n8n الخطأ ده بيوقف الـ workflow ويبان في Executions.',
            'When your function meets a case it cannot continue with (bad input, a missing required field), **throw an error**: `throw new Error("missing email for order 77")`. The message must say **what** and **where** (the order or row number). Far better than returning null and having later code crash 10 lines on with a vague message. In n8n this error stops the workflow and shows in Executions.'),
          ex: 'function requireField(obj, field, where) {\n  const v = obj?.[field];\n  if (v === undefined || v === null || v === "") throw new Error(`missing ${field} in ${where}`);\n  return v;\n}\ntry {\n  const order = { id: 77, total: 500 };\n  const email = requireField(order, "email", "order " + order.id);\n  console.log(email);\n} catch (err) {\n  console.log("Stopped:", err.message);\n}', run: 'js' },
        { h: B('finally: اللي لازم يحصل في كل الأحوال', 'finally: what must happen either way'),
          p: B('`finally { ... }` بيتنفّذ **دايمًا**: لو try نجح أو فشل. مكانه للتنضيف: تقفل ملف، تشيل علامة «جاري التحميل» من الصفحة، تسجّل إن العملية خلصت، ترجّع زرار enabled. من غيره هتنسى تنضّف في فرع الخطأ وتسيب الصفحة «بتحمّل» للأبد.',
            '`finally { ... }` **always** runs, whether try succeeded or failed. It is the place for cleanup: close a file, remove a «loading» mark from the page, record that the operation ended, re-enable a button. Without it you will forget to clean up in the error branch and leave the page «loading» forever.'),
          ex: 'function process(job) {\n  console.log("start", job.name);\n  try {\n    if (job.fail) throw new Error("job " + job.name + " failed");\n    return "done";\n  } catch (err) {\n    console.log("caught:", err.message);\n    return "error";\n  } finally {\n    console.log("cleanup for", job.name);\n  }\n}\nconsole.log(process({ name: "A" }));\nconsole.log(process({ name: "B", fail: true }));', run: 'js' },
        { h: B('متبلعش الأخطاء', 'Do not swallow errors'),
          p: B('`catch (err) {}` فاضي = أسوأ حاجة: الخطأ اختفى ومحدش هيعرف ليه البيانات ناقصة. أقل حاجة: سجّله (`console.error`) بسياق. والأحسن: قرر صراحةً — يا **تعالجه** (قيمة بديلة معروفة + تسجيل)، يا **ترميه تاني** بسياق أكتر (`throw new Error("could not import row 12", { cause: err })`) عشان اللي فوق يقرر.',
            'An empty `catch (err) {}` is the worst thing: the error vanished and nobody will know why data is missing. At the very least log it (`console.error`) with context. Better: decide explicitly — either **handle** it (a known fallback + a log), or **rethrow** it with more context (`throw new Error("could not import row 12", { cause: err })`) so the code above decides.'),
          ex: 'function parseRow(text, n) {\n  try {\n    return JSON.parse(text);\n  } catch (err) {\n    throw new Error(`row ${n} is not valid JSON`, { cause: err });\n  }\n}\ntry {\n  parseRow("{x}", 12);\n} catch (err) {\n  console.log(err.message, "| because:", err.cause.message);\n}', run: 'js' },
        { h: B('أخطاء بأنواعك (custom errors)', 'Your own error types'),
          p: B('لما تحتاج تفرّق بين «بيانات غلط من العميل» (اعرض رسالة) و«السيرفر واقع» (حاول تاني) و«bug» (نبّه المطوّر)، اعمل أنواع أخطاء: `class ValidationError extends Error {}`، وفي catch: `if (err instanceof ValidationError)`. أو أبسط: حط `err.code = "VALIDATION"`. الـ APIs بتعمل كده بالـ status codes (400 و401 و500).',
            'When you need to tell apart «bad data from the customer» (show a message), «the server is down» (try again) and «a bug» (alert the developer), make error types: `class ValidationError extends Error {}`, and in catch: `if (err instanceof ValidationError)`. Or simpler: set `err.code = "VALIDATION"`. APIs do the same with status codes (400, 401, 500).'),
          ex: 'class ValidationError extends Error {\n  constructor(field, message) { super(message); this.name = "ValidationError"; this.field = field; }\n}\nfunction checkOrder(o) {\n  if (!(o.qty > 0)) throw new ValidationError("qty", "quantity must be above zero");\n  return true;\n}\nfor (const o of [{ qty: 2 }, { qty: 0 }]) {\n  try { checkOrder(o); console.log("ok"); }\n  catch (err) {\n    if (err instanceof ValidationError) console.log("tell the user:", err.field, "-", err.message);\n    else throw err;\n  }\n}', run: 'js' }
      ],
      practice: [
        B('حوّط JSON.parse لـ 6 نصوص بـ try/catch وجمّع الناجح والفاشل.', 'Wrap JSON.parse for 6 strings in try/catch and collect the successes and failures.'),
        B('اكتب `requireField` واستخدمها في دالة طلب بتتأكد من 3 حقول.', 'Write `requireField` and use it in an order function checking 3 fields.'),
        B('استخدم finally ترجّع حالة «بيحمّل» لـ false في الحالتين.', 'Use finally to reset a «loading» flag to false in both cases.'),
        B('خد catch فاضي وحوّله لتسجيل + قرار واضح.', 'Take an empty catch and turn it into a log + an explicit decision.'),
        B('ارمي خطأ تاني بـ cause وسياق، واطبع الاتنين.', 'Rethrow an error with a cause and context, and print both.'),
        B('اعمل ValidationError وفرّق بينه وبين خطأ عادي في catch.', 'Make a ValidationError and tell it apart from a normal error in catch.')
      ],
      code: [
        { u: B('safe: دالة بترجّع نتيجة أو خطأ', 'safe: a function returning a result or an error'), p: 'function safe(fn) {\n  return (...args) => {\n    try { return { ok: true, value: fn(...args) }; }\n    catch (err) { return { ok: false, error: err.message }; }\n  };\n}\nconst parse = safe(JSON.parse);\nconsole.log(parse(\'{"a":1}\'), parse("nope"));' }
      ],
      words: [
        { t: 'try...catch', m: B('تجرّب كود وتمسك خطأه لو حصل', 'trying code and catching its error if one happens'), ex: 'try { … } catch (err) { … }' },
        { t: 'throw', m: B('ترمي خطأ بنفسك', 'raising an error yourself'), ex: 'throw new Error("…")' },
        { t: 'finally', m: B('بلوك بيتنفّذ دايمًا بعد try', 'a block that always runs after try'), ex: 'finally { hideSpinner(); }' },
        { t: 'swallow an error', m: B('تمسك خطأ وتتجاهله بصمت', 'catching an error and silently ignoring it'), ex: 'catch (err) {}' },
        { t: 'rethrow', m: B('ترمي الخطأ تاني بعد ما تزوّد سياق', 'throwing the error again after adding context'), ex: 'throw new Error("…", { cause: err })' },
        { t: 'custom error', m: B('نوع خطأ خاص بيك', 'an error type of your own'), ex: 'class ValidationError extends Error' },
        { t: 'graceful', m: B('بأدب ومن غير ما البرنامج يقع', 'politely, without crashing the program'), ex: 'handle errors gracefully' }
      ],
      read: [{ lib: 'The Modern JavaScript Tutorial', what: B('Error handling: try...catch (باقي الفصل)، وCustom errors, extending Error.', 'Error handling: try...catch (the rest of the chapter), and Custom errors, extending Error.') },
        { lib: 'MDN: JavaScript Guide', what: B('Control flow and error handling: Exception handling statements.', 'Control flow and error handling: Exception handling statements.') }],
      challenge: B('اكتب `importOrders(lines)` بتاخد أسطر JSON (منها بايظ وناقص): كل سطر جوه try/catch، والحقول المطلوبة بـ requireField، والأخطاء نوعين (ValidationError وParseError)، وترجّع `{ imported, rejected: [{ line, type, message }] }` — ومفيش ولا catch فاضي.', 'Write `importOrders(lines)` taking JSON lines (some broken or incomplete): each line inside try/catch, required fields checked with requireField, two error types (ValidationError and ParseError), returning `{ imported, rejected: [{ line, type, message }] }` — and not a single empty catch.'),
      quiz: [
        { q: B('لما سطر جوه try يرمي خطأ:', 'When a line inside try throws:'), o: [B('JS يقفز لـ catch فورًا', 'JS jumps straight to catch'), B('يكمّل السطر اللي بعده', 'it runs the next line'), B('البرنامج يقف', 'the program stops')], a: 0, why: B('وباقي try بيتساب.', 'And the rest of try is skipped.') },
        { q: B('finally بيتنفّذ:', 'finally runs:'), o: [B('دايمًا', 'always'), B('لو نجح بس', 'only on success'), B('لو فشل بس', 'only on failure')], a: 0, why: B('للتنضيف.', 'For cleanup.') },
        { q: B('`catch (err) {}` فاضي:', 'An empty `catch (err) {}`:'), o: [B('بيخبّي المشاكل', 'hides problems'), B('أحسن أسلوب', 'is best practice'), B('بيصلّح الخطأ', 'fixes the error')], a: 0, why: B('محدش هيعرف.', 'Nobody will know.') },
        { q: B('رسالة خطأ كويسة:', 'A good error message:'), o: ['"missing email in order 77"', '"error"', '"oops"'], a: 0, why: B('إيه وفين.', 'What and where.') }
      ] },

    { title: B('DevTools: الـ debugging في المتصفح', 'DevTools: debugging in the browser'),
      goal: B('توقف الكود عند سطر وتشوف القيم وتمشي خطوة خطوة، وتشوف الطلبات في Network، وتستخدم console بذكاء.', 'Pause code at a line, inspect values and step through, see requests in Network, and use the console smartly.'),
      learn: [
        { h: B('breakpoints: وقّف الكود', 'Breakpoints: pause the code'),
          p: B('في DevTools افتح **Sources**، واختار ملفك، ودوس على رقم السطر: ده **breakpoint**. لما الكود يوصل للسطر ده بيقف، وتقدر تشوف قيمة كل متغير (حط الماوس عليه أو في لوحة Scope). أو اكتب `debugger;` في الكود نفسه — بيوقف هناك لما DevTools مفتوحة. ده أقوى بكتير من 20 console.log.',
            'In DevTools open **Sources**, pick your file and click a line number: that is a **breakpoint**. When the code reaches that line it pauses, and you can see every variable’s value (hover over it or look at the Scope panel). Or write `debugger;` in the code itself — it pauses there when DevTools is open. Far more powerful than 20 console.logs.'),
          ex: 'function computeTotal(lines) {\n  let total = 0;\n  for (const l of lines) {\n    // debugger;   ← remove the // and open DevTools: it pauses here every round\n    total += l.qty * l.price;\n  }\n  return total;\n}\nconsole.log(computeTotal([{ qty: 2, price: 45 }, { qty: "x", price: 10 }]));', run: 'js' },
        { h: B('تمشي خطوة خطوة', 'Stepping through'),
          p: B('وانت واقف عند breakpoint: **Step over** (F10) ينفّذ السطر ويروح للي بعده، و**Step into** (F11) يدخل جوه الدالة اللي في السطر، و**Step out** (Shift+F11) يخلّص الدالة ويرجع، و**Resume** (F8) يكمّل لحد الـ breakpoint الجاي. راقب القيم وهي بتتغيّر — هتشوف بالظبط فين `"2" * 45` بقت 90 وفين `"x"` بقت NaN.',
            'While paused at a breakpoint: **Step over** (F10) runs the line and moves to the next, **Step into** (F11) enters the function called on the line, **Step out** (Shift+F11) finishes the function and returns, and **Resume** (F8) runs to the next breakpoint. Watch the values change — you will see exactly where `"2" * 45` became 90 and where `"x"` became NaN.'),
          ex: '// Practice target: put a breakpoint on the "const vat" line in DevTools\nfunction invoice(subtotal, rate) {\n  const vat = subtotal * rate;\n  const total = subtotal + vat;\n  return { subtotal, vat, total };\n}\nconsole.log(invoice(1000, 0.14));\nconsole.log(invoice("1000", 0.14));   // step in: which line turns it into text?', run: 'js' },
        { h: B('Watch وconditional breakpoints', 'Watch and conditional breakpoints'),
          p: B('في لوحة **Watch** اكتب تعبير (`l.qty * l.price` أو `total > 5000`) ويفضل يتحدّث وانت ماشي. ولو اللوب 10,000 لفة والمشكلة في صف واحد: كليك يمين على رقم السطر ← **Add conditional breakpoint** ← `Number.isNaN(l.qty * l.price)`. هيقف بس عند الصف البايظ. ده بيوفّر ساعات.',
            'In the **Watch** panel type an expression (`l.qty * l.price` or `total > 5000`) and it keeps updating as you step. And when the loop runs 10,000 times and the problem is one row: right-click the line number → **Add conditional breakpoint** → `Number.isNaN(l.qty * l.price)`. It pauses only on the broken row. That saves hours.'),
          ex: 'const lines = Array.from({ length: 1000 }, (_, i) => ({ id: i, qty: i === 637 ? "?" : 1, price: 5 }));\nlet total = 0;\nfor (const l of lines) {\n  // conditional breakpoint idea: Number.isNaN(l.qty * l.price)\n  if (Number.isNaN(l.qty * l.price)) console.log("the broken row is", l.id);\n  total += Number(l.qty) || 0;\n}\nconsole.log("units", total);', run: 'js' },
        { h: B('Network: شوف الطلبات', 'Network: see the requests'),
          p: B('تبويب **Network** بيعرض كل طلب الصفحة عملته: العنوان، والـ status (200 و404 و500)، والـ headers، واللي اتبعت (Payload) واللي رجع (Response). لما fetch «مش شغال»، أول حاجة تفتح Network: هتعرف الطلب اتبعت ولا لأ، ورجّع إيه بالظبط (يمكن صفحة HTML خطأ بدل JSON). وفيه زرار «Copy as cURL» تجرّب الطلب برّه.',
            'The **Network** tab lists every request the page made: the address, the status (200, 404, 500), the headers, what was sent (Payload) and what came back (Response). When fetch «does not work», open Network first: you will see whether the request went out and exactly what came back (perhaps an HTML error page instead of JSON). There is also «Copy as cURL» to try the request outside.'),
          ex: '// Open DevTools → Network, then run this and click the request that appears:\nfetch("https://jsonplaceholder.typicode.com/users/1")\n  .then(r => { console.log("status", r.status, r.headers.get("content-type")); return r.json(); })\n  .then(u => console.log(u.name))\n  .catch(err => console.log("failed:", err.message));', run: 'js' },
        { h: B('console بذكاء', 'Using the console smartly'),
          p: B('`console.table(rows)` للمصفوفات، و`console.group("order 7")`/`groupEnd()` لتجميع اللوجات، و`console.time("import")`/`timeEnd` تقيس الوقت، و`console.count("retry")` تعد، و`console.assert(total > 0, "total must be positive")` تطبع بس لو الشرط فشل. واطبع `{ total, vat }` (بين أقواس) بدل `total, vat` عشان تشوف الأسماء.',
            '`console.table(rows)` for arrays, `console.group("order 7")`/`groupEnd()` to group logs, `console.time("import")`/`timeEnd` to measure time, `console.count("retry")` to count, and `console.assert(total > 0, "total must be positive")` prints only when the condition fails. And log `{ total, vat }` (in braces) rather than `total, vat` to see the names.'),
          ex: 'const total = 1250, vat = 175;\nconsole.log({ total, vat });\nconsole.group("order 7");\nconsole.log("checking stock");\nconsole.log("charging card");\nconsole.groupEnd();\nconsole.time("sum");\nlet s = 0; for (let i = 0; i < 1e6; i++) s += i;\nconsole.timeEnd("sum");\nconsole.count("retry"); console.count("retry");\nconsole.assert(total < 0, "this prints because total is not negative");', run: 'js' }
      ],
      practice: [
        B('حط breakpoint في Sources على لوب ومشي 3 لفات وراقب المتغيرات.', 'Set a breakpoint on a loop in Sources, step through 3 rounds and watch the variables.'),
        B('استخدم `debugger;` في كودك وافتح DevTools.', 'Use `debugger;` in your code and open DevTools.'),
        B('اعمل conditional breakpoint بيقف عند الصف البايظ بس من 1000.', 'Make a conditional breakpoint that pauses only on the broken row out of 1000.'),
        B('ضيف 3 تعبيرات في Watch وراقبهم وانت ماشي.', 'Add 3 expressions to Watch and follow them as you step.'),
        B('افتح Network وشوف طلب fetch: الـ status والـ headers والـ response.', 'Open Network and inspect a fetch request: status, headers and response.'),
        B('جرّب console.table وgroup وtime وcount وassert.', 'Try console.table, group, time, count and assert.')
      ],
      code: [
        { u: B('اختصارات DevTools', 'DevTools shortcuts'), p: 'F12 / Ctrl+Shift+I   open DevTools\nCtrl+Shift+J         straight to the Console\nCtrl+P (in Sources)  open a file by name\nF8                   resume\nF10                  step over\nF11                  step into\nShift+F11            step out\nCtrl+Shift+M         phone view (device toolbar)', show: 1, lang: 'text' }
      ],
      words: [
        { t: 'breakpoint', m: B('سطر الكود بيقف عنده عشان تفحص', 'a line where code pauses so you can inspect'), ex: 'click a line number in Sources' },
        { t: 'debugger', m: B('أداة (أو كلمة في الكود) بتوقف التشغيل للفحص', 'a tool (or a keyword in code) that pauses execution to inspect'), ex: 'debugger;' },
        { t: 'step over', m: B('ينفّذ السطر ويروح للي بعده', 'runs the line and moves to the next'), ex: 'F10' },
        { t: 'step into', m: B('يدخل جوه الدالة اللي في السطر', 'goes inside the function called on the line'), ex: 'F11' },
        { t: 'watch expression', m: B('تعبير بيتحدّث قيمته وانت بتمشي', 'an expression whose value updates as you step'), ex: 'total > 5000' },
        { t: 'status code', m: B('رقم بيقول نتيجة طلب HTTP', 'a number giving the result of an HTTP request'), ex: '200, 404, 500' },
        { t: 'conditional breakpoint', m: B('breakpoint بيقف بس لو شرط صح', 'a breakpoint that pauses only when a condition holds'), ex: 'Number.isNaN(x)' }
      ],
      read: [{ lib: 'Chrome DevTools docs', what: B('Debug JavaScript (الدرس كله) وNetwork panel: Inspect network activity.', 'Debug JavaScript (the whole tutorial) and Network panel: Inspect network activity.') },
        { lib: 'The Modern JavaScript Tutorial', what: B('Code quality: Debugging in the browser.', 'Code quality: Debugging in the browser.') }],
      challenge: B('خد صفحة اللوحة بتاعة الأسبوع اللي فات، وحط فيها 3 أخطاء عمدًا (فلتر بيرجّع صفر، NaN في الملخص، طلب fetch لعنوان غلط)، واطلب من زميل (أو انت بعد يوم) يلاقيهم بـ DevTools بس من غير console.log — واكتب خطوات كل واحد.', 'Take last week’s dashboard page, plant 3 bugs on purpose (a filter returning zero, NaN in the summary, a fetch to a wrong address), and ask a colleague (or yourself a day later) to find them with DevTools alone, no console.log — writing down the steps for each.'),
      quiz: [
        { q: B('عشان توقف الكود عند سطر:', 'To pause code at a line:'), o: [B('breakpoint أو debugger;', 'a breakpoint or debugger;'), 'console.log', 'alert'], a: 0, why: B('وتشوف كل القيم.', 'And see every value.') },
        { q: B('F11 وانت واقف:', 'F11 while paused:'), o: [B('يدخل جوه الدالة', 'steps into the function'), B('يكمّل للآخر', 'runs to the end'), B('يقفل DevTools', 'closes DevTools')], a: 0, why: B('step into.', 'Step into.') },
        { q: B('fetch «مش شغال»، أول حاجة:', 'fetch «does not work» — first thing:'), o: [B('افتح Network', 'open Network'), B('أعد تشغيل الجهاز', 'restart the computer'), B('امسح الكود', 'delete the code')], a: 0, why: B('تشوف الطلب والرد.', 'See the request and the reply.') },
        { q: B('`console.log({ total })` ميزته:', 'The advantage of `console.log({ total })`:'), o: [B('بيطبع الاسم والقيمة', 'it prints the name and the value'), B('أسرع', 'faster'), B('بيخفي القيمة', 'it hides the value')], a: 0, why: B('{ total: 1250 }.', '{ total: 1250 }.') }
      ] },

    { title: B('الـ debugging في Node واللوجات', 'Debugging in Node, and logs'),
      goal: B('تعمل debug لسكربتات Node من VS Code، وتكتب لوجات مفيدة بمستويات وسياق، وتخلي السكربت يقول نجح ولا فشل للي شغّله.', 'Debug Node scripts from VS Code, write useful logs with levels and context, and make a script tell whoever ran it whether it succeeded.'),
      learn: [
        { h: B('VS Code يعمل debug لـ Node', 'VS Code debugs Node'),
          p: B('في VS Code: حط breakpoint بكليك جنب رقم السطر (نقطة حمرا)، وافتح **Run and Debug** (Ctrl+Shift+D) ← «JavaScript Debug Terminal»، واكتب `node script.js` في الطرفية دي — بيقف عند الـ breakpoint بنفس أدوات المتصفح (Variables وWatch وCall Stack والخطوات). أو `node --inspect-brk script.js` وافتح `chrome://inspect`.',
            'In VS Code: set a breakpoint by clicking beside a line number (a red dot), open **Run and Debug** (Ctrl+Shift+D) → «JavaScript Debug Terminal», and type `node script.js` in that terminal — it pauses at the breakpoint with the same tools as the browser (Variables, Watch, Call Stack and stepping). Or run `node --inspect-brk script.js` and open `chrome://inspect`.'),
          ex: '// report.mjs — set a breakpoint on the "for" line, then in a JavaScript Debug Terminal: node report.mjs\nconst rows = [{ city: "Cairo", total: 300 }, { city: "Giza", total: "400" }];\nconst byCity = {};\nfor (const r of rows) byCity[r.city] = (byCity[r.city] ?? 0) + Number(r.total);\nconsole.log(byCity);', node: 1, lang: 'js' },
        { h: B('مستويات اللوج', 'Log levels'),
          p: B('مش كل لوج زي التاني: **debug** للتفاصيل وقت التطوير، و**info** للأحداث العادية («استوردنا 120 صف»)، و**warn** لحاجة غريبة بس الشغل كمّل («3 صفوف من غير مدينة»)، و**error** لفشل محتاج تدخّل. اعمل دالة log بمستوى، وخلّي فيه متغير `LOG_LEVEL` تخفي بيه الـ debug في التشغيل الحقيقي.',
            'Not every log is equal: **debug** for detail during development, **info** for normal events («imported 120 rows»), **warn** for something odd while the work went on («3 rows without a city»), and **error** for a failure needing attention. Write a log function with a level, and a `LOG_LEVEL` setting to hide debug in real runs.'),
          ex: 'const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };\nconst LOG_LEVEL = "info";\nfunction log(level, message, data) {\n  if (LEVELS[level] < LEVELS[LOG_LEVEL]) return;\n  const line = `${new Date().toISOString()} ${level.toUpperCase().padEnd(5)} ${message}`;\n  (level === "error" ? console.error : console.log)(data ? line + " " + JSON.stringify(data) : line);\n}\nlog("debug", "raw row", { a: 1 });\nlog("info", "imported rows", { count: 120 });\nlog("warn", "rows without a city", { rows: [4, 9, 31] });\nlog("error", "failed: sheet API", { status: 503 });', run: 'js' },
        { h: B('لوج مفيد = سياق', 'A useful log = context'),
          p: B('«Error!» لوج ملوش لازمة. اللوج المفيد بيرد على: **إيه** حصل، و**على مين** (رقم الطلب أو الصف أو العميل)، و**إمتى**، و**قيم مهمة** (status، عدد). اكتبه سطر JSON واحد (structured log) عشان تقدر تدوّر وتعد بعدين. ومتسجّلش أبدًا كلمات سر أو توكنز أو بيانات كروت.',
            '«Error!» is a useless log. A useful log answers: **what** happened, **to whom** (the order, row or customer number), **when**, and **key values** (status, counts). Write it as a single JSON line (a structured log) so you can search and count later. And never log passwords, tokens or card data.'),
          ex: 'const logs = [];\nfunction logEvent(event, fields) { logs.push(JSON.stringify({ at: new Date("2026-10-03T08:00:00Z").toISOString(), event, ...fields })); }\nlogEvent("order.rejected", { orderId: 77, reason: "missing email", source: "website" });\nlogEvent("order.saved", { orderId: 78, total: 1250 });\nlogEvent("order.rejected", { orderId: 81, reason: "bad qty" });\nconsole.log(logs.join("\\n"));\nconst rejected = logs.map(l => JSON.parse(l)).filter(e => e.event === "order.rejected");\nconsole.log("rejected:", rejected.length, rejected.map(e => e.reason));', run: 'js' },
        { h: B('exit code: قول للي شغّلك', 'Exit codes: tell whoever ran you'),
          p: B('سكربت بيشتغل لوحده (cron، Execute Command في n8n، CI) لازم يقول نجح ولا فشل: `process.exitCode = 1` لو فيه فشل (0 = نجاح). n8n وGitHub Actions بيقروا الرقم ده ويعرفوا يوقفوا أو ينبّهوا. ومتعملش `process.exit(1)` في نص الشغل — بيقطع قبل ما اللوجات تتكتب؛ حط exitCode وسيب السكربت يخلص.',
            'A script that runs unattended (cron, n8n’s Execute Command, CI) must say whether it succeeded: `process.exitCode = 1` on failure (0 = success). n8n and GitHub Actions read that number and can stop or alert. Avoid `process.exit(1)` in the middle of the work — it cuts off before logs are written; set exitCode and let the script finish.'),
          ex: '// import-job.mjs\nconst rows = [{ id: 1, ok: true }, { id: 2, ok: false }, { id: 3, ok: true }];\nconst failed = rows.filter(r => !r.ok);\nconsole.log(`imported ${rows.length - failed.length}, failed ${failed.length}`);\nif (failed.length) {\n  console.error("failed rows:", failed.map(r => r.id).join(", "));\n  process.exitCode = 1;   // the caller (cron, n8n, CI) sees a failure\n}', node: 1, lang: 'js', err: 1 },
        { h: B('الأخطاء اللي محدش مسكها', 'Errors nobody caught'),
          p: B('في Node، خطأ محدش مسكه بيوقف السكربت ويطبع الـ stack — ده كويس (أحسن من إنه يكمّل ببيانات غلط). ممكن تسجّل قبل ما يقع: `process.on("uncaughtException", err => { log("error", "crashed", ...); process.exitCode = 1; })`. وفي المتصفح: `window.addEventListener("error", ...)` و`"unhandledrejection"` تبعتهم لخدمة مراقبة. الهدف إنك **تعرف** إن حاجة وقعت.',
            'In Node, an error nobody caught stops the script and prints the stack — which is good (better than carrying on with bad data). You can log before it dies: `process.on("uncaughtException", err => { log("error", "crashed", ...); process.exitCode = 1; })`. In the browser: `window.addEventListener("error", ...)` and `"unhandledrejection"` to send them to a monitoring service. The goal is to **know** that something broke.'),
          ex: 'const reported = [];\nwindow.addEventListener("error", e => reported.push({ type: "error", message: e.message }));\nwindow.addEventListener("unhandledrejection", e => reported.push({ type: "promise", message: String(e.reason?.message ?? e.reason) }));\n// simulate both kinds (a real page gets them from real failures):\nwindow.dispatchEvent(new ErrorEvent("error", { message: "simulated crash" }));\nwindow.dispatchEvent(Object.assign(new Event("unhandledrejection"), { reason: new Error("API down") }));\nsetTimeout(() => console.log("reported:", JSON.stringify(reported)), 50);', run: 'js' }
      ],
      practice: [
        B('اعمل debug لسكربت Node من VS Code بـ breakpoint وخطوتين.', 'Debug a Node script from VS Code with a breakpoint and two steps.'),
        B('اكتب دالة log بـ 4 مستويات وLOG_LEVEL.', 'Write a log function with 4 levels and LOG_LEVEL.'),
        B('حوّل 5 لوجات «وحشة» للوجات بسياق (إيه، مين، قيم).', 'Turn 5 «bad» logs into logs with context (what, who, values).'),
        B('اكتب لوجات JSON وعدّ أنواع الأحداث منها.', 'Write JSON logs and count the event types from them.'),
        B('خلي سكربت يطلع exitCode 1 لو فيه صف فشل، واتأكد بـ `echo $?` أو `echo %errorlevel%`.', 'Make a script exit with code 1 when a row fails, and check it with `echo $?` or `echo %errorlevel%`.'),
        B('سجّل الأخطاء اللي محدش مسكها في صفحة.', 'Record the uncaught errors on a page.')
      ],
      code: [
        { u: B('logger صغير', 'A small logger'), p: 'export function createLogger({ level = "info", name = "app" } = {}) {\n  const L = { debug: 10, info: 20, warn: 30, error: 40 };\n  const out = (lvl, msg, data = {}) => L[lvl] >= L[level] &&\n    console[lvl === "error" ? "error" : "log"](JSON.stringify({ t: new Date().toISOString(), lvl, name, msg, ...data }));\n  return { debug: (m, d) => out("debug", m, d), info: (m, d) => out("info", m, d), warn: (m, d) => out("warn", m, d), error: (m, d) => out("error", m, d) };\n}', show: 1, lang: 'js' }
      ],
      words: [
        { t: 'log level', m: B('درجة أهمية اللوج: debug وinfo وwarn وerror', 'a log’s importance: debug, info, warn, error'), ex: 'LOG_LEVEL=info' },
        { t: 'structured log', m: B('لوج مكتوب كـ JSON بحقول', 'a log written as JSON with fields'), ex: '{"event":"order.saved"}' },
        { t: 'context', m: B('المعلومات اللي حوالين الحدث (مين، فين، إمتى)', 'the information around an event (who, where, when)'), ex: 'orderId: 77' },
        { t: 'exit code', m: B('رقم بيرجّعه البرنامج: 0 نجاح وغيره فشل', 'the number a program returns: 0 success, others failure'), ex: 'process.exitCode = 1' },
        { t: 'uncaught exception', m: B('خطأ محدش مسكه', 'an error nobody caught'), ex: 'process.on("uncaughtException")' },
        { t: 'monitoring', m: B('مراقبة البرنامج وهو شغال عشان تعرف أول ما يقع', 'watching a running program to know as soon as it breaks'), ex: 'send errors to monitoring' },
        { t: 'inspect', m: B('تفحص التشغيل من جوه بأدوات الـ debug', 'examining a run from inside with debug tools'), ex: 'node --inspect' }
      ],
      read: [{ lib: 'Visual Studio Code docs', what: B('Node.js debugging in VS Code: JavaScript Debug Terminal وBreakpoints.', 'Node.js debugging in VS Code: JavaScript Debug Terminal and Breakpoints.') },
        { lib: 'Node.js best practices', what: B('Section 2: Error Handling Practices (أول 5 نقط).', 'Section 2: Error Handling Practices (the first 5 points).') }],
      challenge: B('خد سكربت مشروع الأسبوع 6 وزوّد له: logger بمستويات ولوجات JSON بسياق، وtry/catch حوالين كل صف، وملخص في الآخر بعدد الأخطاء لكل نوع، وexitCode 1 لو أكتر من 10% صفوف فشلت — وشغّله بـ LOG_LEVEL=debug وLOG_LEVEL=warn وقارن.', 'Take your week-6 project script and add: a levelled logger and JSON logs with context, try/catch around every row, a summary at the end counting errors by type, and exitCode 1 when more than 10% of rows fail — run it with LOG_LEVEL=debug and LOG_LEVEL=warn and compare.'),
      quiz: [
        { q: B('«3 صفوف من غير مدينة بس الاستيراد كمّل» مستواه:', '«3 rows have no city, but the import went on» is level:'), o: ['warn', 'error', 'debug'], a: 0, why: B('غريب بس مش فشل.', 'Odd, but not a failure.') },
        { q: B('exit code للنجاح:', 'The success exit code:'), o: ['0', '1', '200'], a: 0, why: B('أي رقم تاني فشل.', 'Any other number is failure.') },
        { q: B('أحسن لوج:', 'The best log:'), o: ['{"event":"order.rejected","orderId":77,"reason":"missing email"}', '"Error!"', '"something went wrong"'], a: 0, why: B('إيه ومين وليه.', 'What, who and why.') },
        { q: B('ممنوع في أي لوج:', 'Never in any log:'), o: [B('كلمات السر والتوكنز', 'passwords and tokens'), B('رقم الطلب', 'the order number'), B('الوقت', 'the time')], a: 0, why: B('أمان.', 'Security.') }
      ] },

    { title: B('الكود الدفاعي والاختبار البسيط', 'Defensive code and simple testing'),
      goal: B('تكتب كود بيتوقّع البيانات الغلط (يتحقق في الحدود، ويفشل بدري بوضوح)، وتختبر دوالك بـ node:test وassert من غير مكتبات.', 'Write code that expects bad data (validates at the edges, fails early and clearly), and test your functions with node:test and assert, no libraries.'),
      learn: [
        { h: B('اتحقق في الحدود', 'Validate at the edges'),
          p: B('البيانات بتدخل برنامجك من **حدود**: فورم، وwebhook، وملف، وAPI. اتحقق من كل حاجة هناك مرة واحدة (الأنواع والحقول المطلوبة والنطاقات)، وحوّلها لشكل نضيف موثوق. جوه البرنامج بعد كده تتعامل مع بيانات سليمة من غير ما تفحص في كل دالة. ده أنضف من `if (x && x.y && ...)` في 40 مكان.',
            'Data enters your program at **edges**: a form, a webhook, a file, an API. Check everything there once (types, required fields, ranges) and convert it into a clean, trusted shape. Inside the program you then work with sound data without checking in every function. Much cleaner than `if (x && x.y && ...)` in 40 places.'),
          ex: 'function parseIncomingOrder(body) {\n  const problems = [];\n  const id = String(body?.id ?? "").trim();\n  const qty = Number(body?.qty);\n  const email = String(body?.email ?? "").trim().toLowerCase();\n  if (!id) problems.push("id is required");\n  if (!Number.isInteger(qty) || qty < 1 || qty > 999) problems.push("qty must be 1–999");\n  if (!email.includes("@")) problems.push("email looks wrong");\n  if (problems.length) throw new Error("invalid order: " + problems.join("; "));\n  return { id, qty, email };   // from here on, trusted\n}\nconsole.log(parseIncomingOrder({ id: " A-1 ", qty: "3", email: "S@X.COM" }));\ntry { parseIncomingOrder({ qty: 0 }); } catch (err) { console.log(err.message); }', run: 'js' },
        { h: B('افشل بدري وبوضوح', 'Fail early and clearly'),
          p: B('لو حاجة غلط، قول **دلوقتي** مش بعد 5 خطوات: الدالة اللي جالها مدخل غلط ترمي خطأ في أول سطر، مش ترجّع قيمة غريبة تمشي في النظام. «fail fast» بيخلي الخطأ يبان قريب من سببه — والـ stack يوديك على طول. وفي الأتمتة ده بيمنع إنك تبعت 500 إيميل فيهم «Hello undefined».',
            'If something is wrong, say so **now**, not five steps later: a function given bad input throws on its first line instead of returning an odd value that travels through the system. «Fail fast» keeps the error close to its cause — and the stack takes you straight there. In automation it stops you sending 500 emails that say «Hello undefined».'),
          ex: 'function greeting(customer) {\n  if (!customer?.name) throw new Error("greeting needs customer.name");\n  return `Hello ${customer.name}, your order is on its way!`;\n}\nconst list = [{ name: "Sara" }, {}, { name: "Omar" }];\nfor (const c of list) {\n  try { console.log(greeting(c)); }\n  catch (err) { console.log("skipped:", err.message); }\n}', run: 'js' },
        { h: B('assert: افتراضات مكتوبة', 'assert: written assumptions'),
          p: B('`assert(condition, message)` بيقول «أنا متأكد إن ده صح هنا، ولو مش صح ده bug». Node عنده `node:assert`: `assert.ok(x > 0)` و`assert.strictEqual(a, b)` و`assert.deepStrictEqual(obj1, obj2)` (بيقارن المحتوى). بيستخدم في الاختبارات، وكمان جوه الكود لحاجات «مستحيل تحصل».',
            '`assert(condition, message)` says «I am sure this holds here; if it does not, it is a bug». Node has `node:assert`: `assert.ok(x > 0)`, `assert.strictEqual(a, b)` and `assert.deepStrictEqual(obj1, obj2)` (which compares contents). It is used in tests, and also inside code for things that «cannot happen».'),
          ex: 'import assert from "node:assert/strict";\nconst round2 = n => Math.round(n * 100) / 100;\nassert.equal(round2(0.1 + 0.2), 0.3);\nassert.deepEqual({ a: [1, 2] }, { a: [1, 2] });\ntry {\n  assert.equal(round2(1.005), 1.01, "round2(1.005)");\n} catch (err) {\n  console.log("assert failed:", err.message.split("\\n")[0]);\n}\nconsole.log("asserts done");', node: 1, lang: 'js' },
        { h: B('node:test: اختبارات من غير مكتبات', 'node:test: tests with no libraries'),
          p: B('Node فيه test runner جاهز: `import test from "node:test";` و`test("name", () => { assert... })`. اكتب الاختبارات في ملف `*.test.mjs` وشغّل `node --test`. بيلاقي الملفات لوحده ويطبع نتيجة كل اختبار والإجمالي، ويطلع exit code 1 لو فيه فشل. ده كفاية جدًا لحد ما نستخدم Vitest في الشهر السابع.',
            'Node has a built-in test runner: `import test from "node:test";` and `test("name", () => { assert... })`. Put tests in a `*.test.mjs` file and run `node --test`. It finds the files by itself, prints each test’s result and the totals, and exits with code 1 on any failure. That is plenty until we use Vitest in month 7.'),
          ex: 'import test from "node:test";\nimport assert from "node:assert/strict";\nconst cleanPhone = v => String(v ?? "").replace(/\\D/g, "").replace(/^20(?=1)/, "0");\ntest("removes dashes", () => assert.equal(cleanPhone("010-1234-5678"), "01012345678"));\ntest("country code", () => assert.equal(cleanPhone("+20 10 1234 5678"), "01012345678"));\ntest("null gives empty text", () => assert.equal(cleanPhone(null), ""));', node: 1, lang: 'js' },
        { h: B('اختبر الحالات الغريبة', 'Test the odd cases'),
          p: B('الحالة العادية سهل تنجح. الأخطاء بتستخبى في **الحدود**: مصفوفة فاضية، وعنصر واحد، وnull، ونص فاضي، ومسافات، وأرقام عربي، وسالب، وصفر، ورقم كبير جدًا، وتاريخ آخر الشهر. لكل دالة مهمة اكتب حالة عادية + 3 حالات حدود على الأقل. ولما تلاقي bug، اكتب اختبار يمسكه **قبل** ما تصلّحه.',
            'The normal case passes easily. Bugs hide at the **boundaries**: an empty array, a single item, null, empty text, spaces, Arabic digits, negatives, zero, a huge number, the last day of a month. For each important function write a normal case plus at least 3 boundary cases. And when you find a bug, write a test that catches it **before** you fix it.'),
          ex: 'const median = values => {\n  if (!values.length) return null;\n  const s = values.toSorted((a, b) => a - b), m = Math.floor(s.length / 2);\n  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;\n};\nconst cases = [\n  ["normal", [3, 1, 2], 2], ["even count", [4, 1, 3, 2], 2.5], ["empty", [], null],\n  ["one item", [7], 7], ["negatives", [-5, -1, -3], -3], ["unsorted big", [100, 1, 50, 2], 26]\n];\nfor (const [name, input, want] of cases) {\n  const got = median(input);\n  console.log(got === want ? "✓" : "✗", name.padEnd(13), "got", got);\n}', run: 'js' }
      ],
      practice: [
        B('اكتب `parseIncoming...` لنوع بيانات من شغلك (فورم أو webhook) بيتحقق في الحد.', 'Write a `parseIncoming...` for a data type from your work (a form or webhook) that validates at the edge.'),
        B('حوّل دالة بترجّع null على مدخل غلط لدالة بتفشل بدري برسالة.', 'Turn a function that returns null on bad input into one that fails early with a message.'),
        B('اكتب 5 assert بـ node:assert/strict.', 'Write 5 asserts with node:assert/strict.'),
        B('اعمل ملف `utils.test.mjs` بـ node:test وشغّله بـ `node --test`.', 'Create a `utils.test.mjs` with node:test and run it with `node --test`.'),
        B('اكتب 4 حالات حدود لكل دالة من 3 دوال.', 'Write 4 boundary cases for each of 3 functions.'),
        B('لاقي bug، اكتب اختبار يفشل بسببه، وبعدين صلّحه.', 'Find a bug, write a test that fails because of it, then fix it.')
      ],
      code: [
        { u: B('ملف اختبار كامل', 'A complete test file'), p: '// money.test.mjs — run: node --test\nimport test from "node:test";\nimport assert from "node:assert/strict";\nimport { round2, toNumber } from "./utils.mjs";\n\ntest("round2 handles float noise", () => assert.equal(round2(0.1 + 0.2), 0.3));\ntest("toNumber reads Arabic digits", () => assert.equal(toNumber("١٢٥٠"), 1250));\ntest("toNumber rejects words", () => assert.equal(toNumber("free"), null));', show: 1, lang: 'js' }
      ],
      words: [
        { t: 'defensive programming', m: B('كود بيتوقّع البيانات الغلط ويتعامل معاها', 'code that expects bad data and handles it'), ex: 'validate at the edges' },
        { t: 'fail fast', m: B('تفشل بدري أول ما تلاقي مشكلة', 'failing early as soon as a problem appears'), ex: 'throw on the first line' },
        { t: 'assert', m: B('سطر بيتأكد إن شرط صح وإلا يرمي خطأ', 'a line checking a condition holds, throwing otherwise'), ex: 'assert.equal(a, b)' },
        { t: 'test runner', m: B('أداة بتشغّل الاختبارات وتطلّع النتيجة', 'a tool that runs tests and reports results'), ex: 'node --test' },
        { t: 'boundary case', m: B('حالة على الحدود: فاضي، صفر، أكبر قيمة', 'a case at the limits: empty, zero, the maximum'), ex: 'median([])' },
        { t: 'regression test', m: B('اختبار بيضمن إن bug اتصلّح ميرجعش', 'a test making sure a fixed bug does not return'), ex: 'test the bug before fixing' },
        { t: 'trusted data', m: B('بيانات اتحقق منها وبقت موثوقة', 'data that was checked and can now be trusted'), ex: 'after parseIncomingOrder' }
      ],
      read: [{ lib: 'Node.js test runner', what: B('Running tests وtest() وassert.', 'Running tests, test() and assert.') },
        { lib: 'Eloquent JavaScript, 4th edition', what: B('Chapter 8: Bugs and Errors (كله).', 'Chapter 8: Bugs and Errors (all of it).') }],
      challenge: B('اكتب لمكتبة utils بتاعتك ملف اختبارات بـ node:test فيه 30 اختبار على الأقل (منهم 15 حالة حدود)، واكتشف وصلّح bug واحد على الأقل بالطريقة دي: اختبار يفشل ← صلّح ← يعدّي — وحط أمر `"test": "node --test"` في package.json.', 'Write a node:test file for your utils library with at least 30 tests (15 of them boundary cases), and find and fix at least one bug this way: a failing test → fix → it passes — and add `"test": "node --test"` to package.json.'),
      quiz: [
        { q: B('«اتحقق في الحدود» يعني:', '«Validate at the edges» means:'), o: [B('تفحص البيانات أول ما تدخل', 'check data as soon as it enters'), B('تفحص في كل دالة', 'check in every function'), B('متفحصش', 'do not check')], a: 0, why: B('وبعدها بيانات موثوقة.', 'Then the data is trusted.') },
        { q: B('`assert.deepStrictEqual({a:1}, {a:1})`:', '`assert.deepStrictEqual({a:1}, {a:1})`:'), o: [B('ينجح', 'passes'), B('يفشل', 'fails'), B('خطأ syntax', 'a syntax error')], a: 0, why: B('بيقارن المحتوى.', 'It compares contents.') },
        { q: B('تشغّل اختبارات node:test بـ:', 'You run node:test tests with:'), o: ['node --test', 'npm start', 'node test'], a: 0, why: B('بيلاقي ملفات *.test.*.', 'It finds *.test.* files.') },
        { q: B('لما تلاقي bug الأول:', 'When you find a bug, first:'), o: [B('اكتب اختبار يفشل بسببه', 'write a test that fails because of it'), B('صلّحه على طول', 'fix it at once'), B('تجاهله', 'ignore it')], a: 0, why: B('عشان ميرجعش.', 'So it never returns.') }
      ] },

    { title: B('مراجعة الشهر التاني ومشروعه والاختبار', 'Month 2 review, project and test'),
      goal: B('تراجع الشهر (الكائنات وJSON والدوال وmethods المصفوفات والأخطاء)، وتسلّم مشروع الشهر التاني، وتعدّي اختبار الأسبوع وبعده امتحان الشهر.', 'Review the month (objects and JSON, functions, array methods and errors), deliver the second month’s project, and pass the weekly test, then the month exam.'),
      review: [
        B('الكائنات: النقطة والأقواس، و?. و??، وentries/fromEntries، والـ spread السطحي.', 'Objects: dots and brackets, ?. and ??, entries/fromEntries, and the shallow spread.'),
        B('JSON نص بقواعد، وparse جوه try/catch، وخبّي الحساس.', 'JSON is text with rules; parse inside try/catch, and hide sensitive data.'),
        B('الدوال: حاجة واحدة، وقيم افتراضية، وكائن إعدادات، ونقية لما ينفع.', 'Functions: one job, defaults, an options object, and pure whenever possible.'),
        B('Arrow وcallbacks وclosures (عدّادات، مصانع، memoize).', 'Arrows, callbacks and closures (counters, factories, memoize).'),
        B('map/filter/reduce/find/some/every/flatMap في سلاسل مقرية، وSet وMap.', 'map/filter/reduce/find/some/every/flatMap in readable chains, plus Set and Map.'),
        B('اقرا الخطأ: النوع والرسالة والسطر، والـ stack من كودك.', 'Read the error: type, message and line, and the stack from your own code.'),
        B('try/catch للمتوقع، وthrow برسالة إيه وفين، وfinally للتنضيف، ومفيش catch فاضي.', 'try/catch for the expected, throw with what and where, finally for cleanup, never an empty catch.'),
        B('DevTools وdebugger وnode:test وassert واللوجات بالسياق وexit code.', 'DevTools, debugger, node:test and assert, logs with context, and exit codes.')
      ],
      project: B('**مشروع الشهر التاني: «محرك استيراد الطلبات».** سكربت Node `import-orders.mjs` + مكتبتك `utils.mjs` + اختبارات:\n1. **المدخل:** ملف نصي (اكتبه في الكود كنص) فيه 50 سطر JSON طلبات من 3 قنوات بأشكال مختلفة، منهم سطور بايظة وناقصة.\n2. **الحدود:** `parseLine` بترمي ParseError أو ValidationError برسالة فيها رقم السطر، وadapter لكل قناة للشكل الموحّد.\n3. **المعالجة:** بـ map وfilter وreduce وflatMap وMap: سطر لكل منتج بأسعار من كتالوج، وإجمالي كل طلب محسوب، والعملاء موحّدين بالإيميل.\n4. **الملخص:** الإيراد حسب القناة والمدينة والمنتج، وأكتر 5 عملاء، والوسيط.\n5. **الأخطاء:** logger بمستويات ولوجات JSON بسياق، وتقرير بالأسطر المرفوضة حسب النوع، وexitCode 1 لو أكتر من 10% اترفضوا.\n6. **الاختبارات:** 25 اختبار بـ node:test (منهم حالات حدود) و`npm test` بيشغّلهم.\n7. **closure واحدة على الأقل** (memoize لسعر الكتالوج أو مولّد أرقام).',
        '**The second month’s project: «the order import engine».** A Node script `import-orders.mjs` + your `utils.mjs` library + tests:\n1. **Input:** a text file (written in the code as a string) holding 50 JSON order lines from 3 channels in different shapes, including broken and incomplete lines.\n2. **Edges:** `parseLine` throws a ParseError or ValidationError with the line number in the message, plus an adapter per channel to the unified shape.\n3. **Processing:** with map, filter, reduce, flatMap and Map: one line per product priced from a catalogue, each order’s total computed, and customers unified by email.\n4. **Summary:** revenue by channel, city and product, the top 5 customers, and the median.\n5. **Errors:** a levelled logger with JSON logs and context, a report of rejected lines by type, and exitCode 1 when more than 10% are rejected.\n6. **Tests:** 25 node:test tests (including boundary cases) run by `npm test`.\n7. **At least one closure** (memoize for the catalogue price, or a number generator).'),
      test: [
        { q: B('`({}).a.b`:', '`({}).a.b`:'), o: ['TypeError', 'undefined', 'ReferenceError'], a: 0, why: B('a undefined ومينفعش تقرا منه.', 'a is undefined and cannot be read from.') },
        { q: B('`JSON.parse("")`:', '`JSON.parse("")`:'), o: ['SyntaxError', '""', 'null'], a: 0, why: B('نص فاضي مش JSON.', 'Empty text is not JSON.') },
        { q: B('الكود بعد throw في نفس البلوك:', 'Code after throw in the same block:'), o: [B('مش بيتنفّذ', 'does not run'), B('بيتنفّذ', 'runs'), B('بيتنفّذ لو فيه finally', 'runs if there is a finally')], a: 0, why: B('throw بيقفز.', 'throw jumps away.') },
        { q: B('`try { return 1; } finally { console.log("x"); }`:', '`try { return 1; } finally { console.log("x"); }`:'), o: [B('بيطبع x ويرجّع 1', 'prints x and returns 1'), B('بيرجّع 1 من غير طباعة', 'returns 1 without printing'), B('خطأ', 'an error')], a: 0, why: B('finally دايمًا.', 'finally always runs.') },
        { q: B('`err.cause` بيبقى فيه:', '`err.cause` holds:'), o: [B('الخطأ الأصلي اللي سبّب ده', 'the original error behind this one'), B('رقم السطر', 'the line number'), B('اسم الملف', 'the file name')], a: 0, why: B('سياق.', 'Context.') },
        { q: B('`err instanceof ValidationError` بيفيد في:', '`err instanceof ValidationError` helps to:'), o: [B('تفرّق نوع الخطأ', 'tell the error type apart'), B('تمسح الخطأ', 'delete the error'), B('تسرّع الكود', 'speed up the code')], a: 0, why: B('معالجة مختلفة لكل نوع.', 'Different handling per type.') },
        { q: B('عشان يقف الكود هنا لما DevTools مفتوحة:', 'To pause code here when DevTools is open:'), o: ['debugger;', 'stop;', 'pause();'], a: 0, why: B('كلمة محجوزة.', 'A reserved keyword.') },
        { q: B('سكربت فشل في cron لازم:', 'A script that failed under cron must:'), o: ['process.exitCode = 1', 'console.log("ok")', 'return'], a: 0, why: B('اللي شغّله يعرف.', 'So its caller knows.') },
        { q: B('`[1, 2, 3].map(x => x * 2).filter(x => x > 2)`:', '`[1, 2, 3].map(x => x * 2).filter(x => x > 2)`:'), o: ['[4, 6]', '[2, 4, 6]', '[6]'], a: 0, why: B('[2,4,6] ثم > 2.', '[2,4,6], then > 2.') },
        { q: B('`Object.fromEntries(Object.entries({a: 1}).map(([k, v]) => [k, v * 10]))`:', '`Object.fromEntries(Object.entries({a: 1}).map(([k, v]) => [k, v * 10]))`:'), o: ['{ a: 10 }', '[["a", 10]]', '{ a: 1 }'], a: 0, why: B('تحويل القيم.', 'Transformed values.') },
        { q: B('`const f = (a, b = a * 2) => a + b; f(3)`:', '`const f = (a, b = a * 2) => a + b; f(3)`:'), o: ['9', '6', 'NaN'], a: 0, why: B('b = 6.', 'b = 6.') },
        { q: B('أحسن رد على قيمة null في مكان مطلوب:', 'The best response to null where a value is required:'), o: [B('ارمي خطأ واضح بدري', 'throw a clear error early'), B('كمّل ويمكن تنفع', 'carry on and hope'), B('حط 0', 'use 0')], a: 0, why: B('fail fast.', 'Fail fast.') },
        { q: B('اختبار regression هدفه:', 'A regression test aims to:'), o: [B('bug اتصلّح ميرجعش', 'keep a fixed bug from returning'), B('يسرّع الكود', 'speed the code up'), B('يغيّر البيانات', 'change the data')], a: 0, why: B('شبكة أمان.', 'A safety net.') }
      ] }
  ]
};
