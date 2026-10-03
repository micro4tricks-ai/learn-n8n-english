// JavaScript week 13 — async code: promises and async/await.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الكود غير المتزامن: Promises وasync/await', 'Async code: promises and async/await'),
  goal: B('تفهم إزاي جافاسكريبت بتستنى من غير ما تقف: الـ event loop، والـ Promises، وasync/await، وتشغيل حاجات بالتوازي بحدود، والمهلة والإلغاء وإعادة المحاولة — الأساس لكل API وكل سكربت أتمتة.',
          'Understand how JavaScript waits without freezing: the event loop, promises, async/await, running things in parallel with limits, timeouts, cancellation and retries — the base of every API call and every automation script.'),
  days: [
    { title: B('متزامن وغير متزامن والـ event loop', 'Sync, async and the event loop'),
      goal: B('تعرف ليه الكود مش بيمشي دايمًا بالترتيب اللي مكتوب بيه.', 'Learn why code does not always run in the order it is written.'),
      learn: [
        L(B('ليه غير متزامن؟', 'Why asynchronous?'),
          B('جافاسكريبت بتشغّل سطر واحد في المرة (thread واحد). لو استنت رد API ثانيتين **بشكل متزامن** (synchronous)، الصفحة هتتجمّد والسيرفر مش هيرد على حد. الحل: **asynchronous** — تطلب الحاجة، وتكمّل شغلك، ولما الرد يوصل الكود بتاعه يشتغل. ده معنى **non-blocking**.', 'JavaScript runs one line at a time (one thread). If it waited two seconds for an API reply **synchronously**, the page would freeze and the server would answer nobody. The fix: **asynchronous** code — you ask for something, carry on, and when the reply arrives its code runs. That is what **non-blocking** means.'),
          'console.log("1. order received");\nsetTimeout(() => console.log("3. email sent (after 200 ms)"), 200);\nconsole.log("2. reply to the customer right away");', J),
        L(B('الـ call stack والطوابير', 'The call stack and the queues'),
          B('الـ **call stack** فيه الكود اللي شغال دلوقتي. لما يخلص، الـ **event loop** بياخد اللي بعده: الأول كل الـ **microtask** (ردود الـ Promises)، وبعدين مهمة واحدة من **task queue** (setTimeout، أحداث، شبكة). عشان كده `setTimeout(…, 0)` مش «فورًا» — بيستنى الـ stack يفضى والـ microtasks تخلص.', 'The **call stack** holds the code running now. When it is empty, the **event loop** takes what is next: first all **microtask** jobs (promise reactions), then one job from the **task queue** (setTimeout, events, network). That is why `setTimeout(…, 0)` is not «immediately» — it waits for the stack to empty and the microtasks to finish.'),
          'console.log("A sync");\nsetTimeout(() => console.log("D task (setTimeout 0)"), 0);\nPromise.resolve().then(() => console.log("C microtask (promise)"));\nconsole.log("B sync");\n// order: A, B, C, D', J),
        L(B('callbacks ومشكلتها', 'Callbacks and their problem'),
          B('الطريقة القديمة: تبعت دالة **callback** تتنادى لما الشغل يخلص. مع خطوات ورا بعض (هات العميل ← هات طلباته ← ابعت تقرير) بيحصل **callback hell**: تداخل لجوه، والأخطاء لازم تتعالج في كل مستوى. الـ Promises اتعملت عشان تحل ده.', 'The old way: pass a **callback** function that is called when the work is done. With steps in a row (get the customer → get their orders → send a report) you get **callback hell**: nesting deeper and deeper, and errors handled at every level. Promises were made to fix that.'),
          'getCustomer(7, (err, customer) => {\n  if (err) return report(err);\n  getOrders(customer.id, (err, orders) => {\n    if (err) return report(err);\n    sendReport(orders, (err) => {\n      if (err) return report(err);\n      console.log("done");   // three levels deep for three steps\n    });\n  });\n});', S)
      ],
      practice: [
        B('شغّل مثال الترتيب وتوقّع الناتج قبل ما تشوفه.', 'Run the ordering example and predict the output before you look.'),
        B('ضيف setTimeout بـ 100 وتاني بـ 0 وشوف الترتيب.', 'Add a setTimeout of 100 and another of 0 and see the order.'),
        B('اعمل loop تقيلة 3 ثواني وشوف الصفحة بتتجمد إزاي.', 'Write a heavy 3-second loop and see how the page freezes.'),
        B('اكتب بكلامك: ليه السيرفر لازم يكون non-blocking.', 'Write in your own words why a server must be non-blocking.')
      ],
      words: [
        W('asynchronous', 'غير متزامن: بيكمّل من غير ما يستنى', 'not waiting: the code carries on and handles the result later', 'fetch is asynchronous.'),
        W('synchronous', 'متزامن: بيستنى كل سطر يخلص', 'waiting for each line to finish', 'A synchronous loop blocks the page.'),
        W('non-blocking', 'مش بيوقّف باقي الشغل', 'not stopping other work', 'Node handles many requests because I/O is non-blocking.'),
        W('event loop', 'الحلقة اللي بتختار الكود اللي يشتغل بعد كده', 'the loop that picks the next code to run', 'The event loop runs microtasks before timers.'),
        W('call stack', 'كومة الدوال اللي شغالة دلوقتي', 'the stack of functions running now', 'The error shows the call stack.'),
        W('microtask', 'مهمة صغيرة زي رد Promise بتشتغل قبل الـ timers', 'a small job such as a promise reaction, run before timers', 'Promise callbacks are microtasks.'),
        W('callback hell', 'تداخل callbacks كتير جوه بعض', 'many nested callbacks', 'async/await removes callback hell.')
      ],
      read: [{ lib: 'javascript.info: Promises, async/await', what: B('اقرا Introduction: callbacks.', 'Read Introduction: callbacks.') }, { t: 'MDN: JavaScript execution model', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model', what: B('اقرا Job queue and event loop.', 'Read Job queue and event loop.') }],
      challenge: B('اكتب 6 سطور فيها console.log وsetTimeout وPromise.then بترتيب مختلط، واكتب الناتج المتوقع على ورقة، وبعدين شغّل وقارن واشرح كل اختلاف.', 'Write 6 lines mixing console.log, setTimeout and Promise.then, write the expected output on paper, then run, compare and explain every difference.'),
      quiz: [
        Q(B('مين يطبع الأول بعد الكود المتزامن؟', 'What prints first after the synchronous code?'), [['Promise.then', 'Promise.then'], ['setTimeout 0', 'setTimeout 0'], ['مع بعض', 'at the same time']], 0, B('microtasks قبل الـ tasks.', 'Microtasks before tasks.')),
        Q(B('جافاسكريبت في المتصفح بتشغّل:', 'JavaScript in the browser runs:'), [['سطر واحد في المرة', 'one line at a time'], ['كل الدوال مع بعض', 'all functions at once'], ['بالعشوائي', 'randomly']], 0, B('thread واحد.', 'One thread.')),
        Q(B('loop تقيلة متزامنة بتعمل إيه؟', 'What does a heavy synchronous loop do?'), [['تجمّد الصفحة', 'freezes the page'], ['تسرّعها', 'speeds it up'], ['ولا حاجة', 'nothing']], 0, B('blocking.', 'Blocking.'))
      ] },

    { title: B('الـ Promises', 'Promises'),
      goal: B('تنشئ Promise وتتعامل معاه بـ then وcatch وfinally.', 'Create a promise and handle it with then, catch and finally.'),
      learn: [
        L(B('Promise = وعد بنتيجة', 'A promise = a promise of a result'),
          B('**promise** كائن بيمثّل نتيجة لسه موصلتش. ليه 3 حالات: **pending** (مستني)، **fulfilled** (نجح بقيمة)، **rejected** (فشل بخطأ). لما يتحسم (**settled**) مبيتغيرش تاني. انت بتنشئه بـ `new Promise((resolve, reject) => …)`.', 'A **promise** is an object standing for a result that has not arrived yet. It has 3 states: **pending** (waiting), **fulfilled** (succeeded with a value), **rejected** (failed with an error). Once **settled** it never changes. You create one with `new Promise((resolve, reject) => …)`.'),
          'function checkStock(item) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (item.qty > 0) resolve(`${item.name}: ${item.qty} in stock`);\n      else reject(new Error(`${item.name} is out of stock`));\n    }, 100);\n  });\n}\nconst p = checkStock({ name: "Notebook", qty: 12 });\nconsole.log("right now:", p instanceof Promise);\np.then(msg => console.log("later:", msg));\ncheckStock({ name: "Pen", qty: 0 }).catch(err => console.log("failed:", err.message));', J),
        L(B('then وcatch وfinally', 'then, catch and finally'),
          B('`then(fn)` بيتنادى بالقيمة، و`catch(fn)` بالخطأ، و`finally(fn)` في الحالتين (لقفل مؤشر التحميل مثلًا). كل `then` بيرجّع Promise جديد بقيمة الـ return — ده الـ **chaining**: خطوات ورا بعض في سطور مستوية، وcatch واحد في الآخر بيمسك خطأ أي خطوة.', '`then(fn)` is called with the value, `catch(fn)` with the error, and `finally(fn)` in both cases (to hide a loading spinner, say). Each `then` returns a new promise holding what you return — that is **chaining**: steps in a row on flat lines, and one catch at the end catches an error from any step.'),
          'const wait = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));\nwait(50, { id: 7, name: "Sara" })\n  .then(customer => { console.log("customer", customer.name); return wait(50, [120, 80, 45]); })\n  .then(orders => orders.reduce((s, n) => s + n, 0))\n  .then(total => console.log("total", total))\n  .catch(err => console.log("failed:", err.message))\n  .finally(() => console.log("hide the spinner"));', J),
        L(B('sleep وPromise.resolve', 'sleep and Promise.resolve'),
          B('دالة **sleep** صغيرة بتحوّل setTimeout لـ Promise — هتستخدمها كتير (انتظار بين المحاولات، احترام حدود API). و`Promise.resolve(x)` بيعمل Promise ناجح فورًا، و`Promise.reject(err)` فاشل فورًا — مفيدين في الاختبارات والقيم الجاهزة من الكاش.', 'A tiny **sleep** function turns setTimeout into a promise — you will use it a lot (waiting between retries, respecting API limits). `Promise.resolve(x)` makes an already-fulfilled promise and `Promise.reject(err)` an already-rejected one — handy in tests and for cached values.'),
          'const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));\nconst cache = new Map([["EGP", 1]]);\nfunction getRate(code) {\n  if (cache.has(code)) return Promise.resolve(cache.get(code));   // same type either way\n  return sleep(100).then(() => { cache.set(code, 48.5); return 48.5; });\n}\ngetRate("EGP").then(r => console.log("EGP", r));\ngetRate("USD").then(r => console.log("USD", r));', J)
      ],
      practice: [
        B('اكتب Promise بيتحسم بعد ثانية بـ «جاهز».', 'Write a promise that settles after a second with «ready».'),
        B('حوّل مثال callback hell لسلسلة then.', 'Turn the callback-hell example into a then chain.'),
        B('ارمي خطأ في then التانية وشوف catch بيمسكه.', 'Throw an error in the second then and watch catch handle it.'),
        B('ضيف finally يطبع «تم» في الحالتين.', 'Add a finally that prints «done» in both cases.')
      ],
      words: [
        W('promise', 'كائن بيمثّل نتيجة جاية بعدين', 'an object standing for a result that comes later', 'fetch returns a promise.'),
        W('pending', 'لسه مستني', 'still waiting', 'The promise is pending until the reply arrives.'),
        W('fulfilled', 'اتحسم بنجاح بقيمة', 'settled successfully with a value', 'A fulfilled promise calls then.'),
        W('rejected', 'اتحسم بفشل بخطأ', 'settled with a failure', 'A rejected promise calls catch.'),
        W('settled', 'اتحسم: نجح أو فشل', 'finished: fulfilled or rejected', 'finally runs once the promise is settled.'),
        W('chaining', 'ربط خطوات ورا بعض', 'linking steps one after another', 'Promise chaining keeps the code flat.'),
        W('sleep', 'دالة بتستنى مدة', 'a function that waits for a time', 'await sleep(1000) between retries.')
      ],
      read: [{ lib: 'MDN: Using promises', what: B('اقرا Chaining وError handling.', 'Read Chaining and Error handling.') }],
      challenge: B('اعمل 3 دوال وهمية بترجع Promises (getCustomer وgetOrders وsendReport) بأوقات مختلفة وواحدة بتفشل عشوائيًا، واربطهم بسلسلة then بـ catch وfinally واحدة.', 'Write 3 fake functions returning promises (getCustomer, getOrders, sendReport) with different delays, one failing at random, and chain them with one catch and one finally.'),
      quiz: [
        Q(B('Promise اتحسم بنجاح ممكن يرجع rejected؟', 'Can a fulfilled promise later become rejected?'), [['لأ', 'no'], ['أيوه', 'yes'], ['بعد ثانية', 'after a second']], 0, B('settled مبيتغيرش.', 'Settled never changes.')),
        Q(B('then بيرجّع:', 'then returns:'), [['Promise جديد', 'a new promise'], ['undefined', 'undefined'], ['القيمة نفسها', 'the value itself']], 0, B('عشان الـ chaining.', 'For chaining.')),
        Q(B('مكان إخفاء مؤشر التحميل:', 'Where to hide the loading spinner:'), [['finally', 'finally'], ['then بس', 'only then'], ['catch بس', 'only catch']], 0, B('الحالتين.', 'Both cases.'))
      ] },

    { title: B('async وawait', 'async and await'),
      goal: B('تكتب كود غير متزامن بيتقري كأنه عادي.', 'Write async code that reads like normal code.'),
      learn: [
        L(B('async/await', 'async/await'),
          B('`async function` بترجّع Promise دايمًا، وجواها `await` بيستنى Promise من غير ما يوقف باقي البرنامج. الكود بيتقري من فوق لتحت، والأخطاء بـ `try...catch` عادي. ده الشكل اللي هتكتب بيه كل حاجة بعد كده.', 'An `async function` always returns a promise, and inside it `await` waits for a promise without stopping the rest of the program. The code reads top to bottom, and errors use a normal `try...catch`. This is the style you will write everything in from now on.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function getCustomer(id) { await sleep(50); return { id, name: "Sara" }; }\nasync function getOrders(id) { await sleep(50); if (id < 0) throw new Error("bad id"); return [120, 80, 45]; }\n\nasync function report(id) {\n  try {\n    const customer = await getCustomer(id);\n    const orders = await getOrders(id);\n    console.log(customer.name, "spent", orders.reduce((s, n) => s + n, 0));\n  } catch (err) {\n    console.log("failed:", err.message);\n  }\n}\nreport(7).then(() => report(-1));', J),
        L(B('ورا بعض ولا مع بعض؟', 'In sequence or in parallel?'),
          B('كل `await` ورا التاني = **sequential**: الوقت = مجموع الأوقات. لو الطلبات مش معتمدة على بعض، ابدأهم كلهم مع بعض (**parallel**) واستنى بـ `Promise.all`: الوقت = أطول واحد. ده أكبر تحسين سرعة سهل في سكربتات الأتمتة.', 'Each `await` after the other = **sequential**: total time = the sum. If the requests do not depend on each other, start them all together (**parallel**) and wait with `Promise.all`: total time = the slowest one. This is the easiest big speed-up in automation scripts.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nconst fetchPrice = async sku => { await sleep(200); return { sku, price: sku.length * 10 }; };\nconst skus = ["A1", "B22", "C333"];\n(async () => {\n  let t = Date.now();\n  for (const s of skus) await fetchPrice(s);\n  console.log("sequential ≈", Math.round((Date.now() - t) / 100) * 100, "ms");\n\n  t = Date.now();\n  const prices = await Promise.all(skus.map(fetchPrice));\n  console.log("parallel ≈", Math.round((Date.now() - t) / 100) * 100, "ms", prices.map(p => p.price));\n})();', J),
        L(B('top-level await وfor await', 'Top-level await and for await'),
          B('في ملف **module** (`.mjs` أو `type: "module"`) تقدر تكتب `await` برة أي دالة (**top-level await**) — مريح في السكربتات. و`for await (const x of source)` بيلف على مصدر بيجيب بياناته على دفعات (صفحات API، أسطر ملف كبير) — ده **async iterator**.', 'In a **module** file (`.mjs` or `type: "module"`) you can write `await` outside any function (**top-level await**) — handy in scripts. And `for await (const x of source)` loops over a source that delivers data in batches (API pages, lines of a big file) — that is an **async iterator**.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function* pages() {            // an async generator: yields one page at a time\n  for (let page = 1; page <= 3; page++) {\n    await sleep(50);\n    yield [`order-${page}a`, `order-${page}b`];\n  }\n}\n(async () => {\n  for await (const batch of pages()) console.log("got", batch.join(", "));\n  console.log("all pages done");\n})();', J)
      ],
      practice: [
        B('حوّل سلسلة then من امبارح لـ async/await.', 'Turn yesterday’s then chain into async/await.'),
        B('قِس الفرق بين sequential وparallel لـ 5 طلبات.', 'Measure sequential vs parallel for 5 requests.'),
        B('اعمل async generator بيرجّع 4 صفحات ولف عليه بـ for await.', 'Write an async generator returning 4 pages and loop over it with for await.'),
        B('انسى await قدام دالة وشوف بيطبع إيه.', 'Forget an await before a function call and see what prints.')
      ],
      words: [
        W('async', 'كلمة بتخلّي الدالة ترجع Promise', 'the keyword making a function return a promise', 'Mark the handler async.'),
        W('await', 'استنى Promise جوه دالة async', 'wait for a promise inside an async function', 'await the fetch before reading JSON.'),
        W('sequential', 'ورا بعض واحدة واحدة', 'one after another', 'Sequential requests add up their times.'),
        W('parallel', 'مع بعض في نفس الوقت', 'at the same time', 'Run independent requests in parallel.'),
        W('top-level await', 'await برة أي دالة في module', 'await outside any function in a module', 'Top-level await keeps scripts short.'),
        W('async iterator', 'مصدر بيجيب قيم على دفعات بـ for await', 'a source giving values in batches with for await', 'Read API pages with an async iterator.'),
        W('for await', 'لفّة على async iterator', 'a loop over an async iterator', 'for await reads each page in turn.')
      ],
      read: [{ lib: 'MDN: async function', what: B('اقرا الأمثلة.', 'Read the examples.') }, { lib: 'javascript.info: Promises, async/await', what: B('اقرا Async/await وAsync iteration and generators.', 'Read Async/await and Async iteration and generators.') }],
      challenge: B('اكتب سكربت «تقرير صباحي» بـ async/await: يجيب 3 مصادر وهمية بالتوازي، ولو مصدر فشل يكمّل بالباقي ويقول مين فشل، ويطبع الوقت الكلي.', 'Write a «morning report» script with async/await: fetch 3 fake sources in parallel, carry on with the rest if one fails and say which failed, and print the total time.'),
      quiz: [
        Q(B('async function بترجّع:', 'An async function returns:'), [['Promise دايمًا', 'always a promise'], ['القيمة', 'the value'], ['undefined', 'undefined']], 0, B('حتى لو return عادي.', 'Even with a plain return.')),
        Q(B('3 طلبات مستقلة كل واحد 1 ثانية بالتوازي:', 'Three independent 1-second requests in parallel:'), [['≈ 1 ثانية', '≈ 1 second'], ['≈ 3 ثواني', '≈ 3 seconds'], ['0', '0']], 0, B('أطول واحد.', 'The slowest one.')),
        Q(B('نسيت await قدام دالة async:', 'You forgot await before an async call:'), [['بتاخد Promise مش القيمة', 'you get a promise, not the value'], ['خطأ syntax', 'a syntax error'], ['عادي', 'no difference']], 0, B('Promise { <pending> }.', 'Promise { <pending> }.'))
      ] },

    { title: B('أدوات الـ Promises والمهلة والإلغاء', 'Promise tools, timeouts and cancellation'),
      goal: B('تختار الأداة الصح لكل موقف وتمنع الانتظار للأبد.', 'Pick the right tool for each case and never wait forever.'),
      learn: [
        L(B('all وallSettled وrace وany', 'all, allSettled, race and any'),
          B('**Promise.all**: الكل لازم ينجح؛ أول فشل يوقّف. **Promise.allSettled**: استنى الكل وهات نتيجة كل واحد (ممتاز للتقارير: «8 نجحوا و2 فشلوا»). **Promise.race**: أول واحد يتحسم (نجاح أو فشل). **Promise.any**: أول واحد **ينجح** (مصادر بديلة).', '**Promise.all**: all must succeed; the first failure stops it. **Promise.allSettled**: wait for all and get each result (great for reports: «8 succeeded, 2 failed»). **Promise.race**: the first to settle (success or failure). **Promise.any**: the first to **succeed** (backup sources).'),
          'const sleep = (ms, v, fail) => new Promise((res, rej) => setTimeout(() => fail ? rej(new Error(v)) : res(v), ms));\n(async () => {\n  const results = await Promise.allSettled([sleep(50, "sheet ok"), sleep(80, "crm down", true), sleep(30, "mail ok")]);\n  results.forEach(r => console.log(r.status, r.value ?? r.reason.message));\n  try { await Promise.all([sleep(50, "a"), sleep(20, "b broke", true)]); }\n  catch (e) { console.log("all → first failure:", e.message); }\n  console.log("any →", await Promise.any([sleep(60, "mirror 1"), sleep(20, "mirror 2 down", true), sleep(40, "mirror 3")]));\n  console.log("race →", await Promise.race([sleep(70, "slow"), sleep(10, "fast")]));\n})();', J),
        L(B('مهلة للانتظار', 'A timeout for waiting'),
          B('API واقع ممكن يخلّي الـ await يستنى **للأبد** والسكربت يعلق. دايمًا حط **timeout**: `Promise.race` بين الشغل وPromise بيفشل بعد مدة. ومع fetch في Node والمتصفحات الحديثة: `fetch(url, { signal: AbortSignal.timeout(5000) })`.', 'A dead API can make an await wait **forever** and hang your script. Always set a **timeout**: a `Promise.race` between the work and a promise that fails after a time. With fetch in Node and modern browsers: `fetch(url, { signal: AbortSignal.timeout(5000) })`.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nfunction withTimeout(promise, ms, label = "task") {\n  let timer;\n  const limit = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms} ms`)), ms); });\n  return Promise.race([promise, limit]).finally(() => clearTimeout(timer));\n}\n(async () => {\n  console.log(await withTimeout(sleep(50).then(() => "fast API ok"), 300, "fast API"));\n  try { await withTimeout(sleep(1000), 200, "slow API"); }\n  catch (e) { console.log("failed:", e.message); }\n})();', J),
        L(B('الإلغاء بـ AbortController', 'Cancelling with AbortController'),
          B('**AbortController** بيدّيك `signal` تبعته للشغل، و`controller.abort()` يلغيه. fetch بيفهمه مباشرة. مثال: المستخدم بيكتب في خانة بحث — الغي الطلب القديم قبل ما تبعت الجديد عشان الرد القديم ميكتبش فوق الجديد. ده **cancellation**.', '**AbortController** gives you a `signal` to pass to the work, and `controller.abort()` cancels it. fetch understands it directly. Example: the user types in a search box — cancel the old request before sending the new one so an old reply never overwrites a new one. That is **cancellation**.'),
          'function slowSearch(q, signal) {\n  return new Promise((resolve, reject) => {\n    const t = setTimeout(() => resolve(`results for "${q}"`), 150);\n    signal.addEventListener("abort", () => { clearTimeout(t); reject(new Error(`search "${q}" cancelled`)); });\n  });\n}\nlet current;\nfunction search(q) {\n  current?.abort();                    // cancel the previous request\n  current = new AbortController();\n  return slowSearch(q, current.signal).then(console.log, e => console.log("failed:", e.message));\n}\nsearch("no"); search("note"); search("notebook");', J)
      ],
      practice: [
        B('استخدم allSettled على 5 مصادر واطبع ملخص نجح/فشل.', 'Use allSettled on 5 sources and print a success/failure summary.'),
        B('ضيف withTimeout لكل مصدر بـ 300ms.', 'Add withTimeout of 300 ms to each source.'),
        B('اعمل خانة بحث بتلغي الطلب القديم بـ AbortController.', 'Build a search box that cancels the old request with AbortController.'),
        B('جرّب Promise.any لما الكل يفشل وشوف الخطأ.', 'Try Promise.any when all fail and look at the error.')
      ],
      words: [
        W('promise.all', 'استنى الكل ينجح', 'wait for all to succeed', 'Promise.all fails fast on the first error.'),
        W('promise.allsettled', 'استنى الكل وهات نتيجة كل واحد', 'wait for all and get each result', 'Use Promise.allSettled for batch reports.'),
        W('promise.race', 'أول واحد يتحسم يكسب', 'the first to settle wins', 'Promise.race builds a timeout.'),
        W('promise.any', 'أول واحد ينجح يكسب', 'the first to succeed wins', 'Promise.any tries backup mirrors.'),
        W('timeout', 'مهلة قصوى للانتظار', 'the longest time to wait', 'Every API call needs a timeout.'),
        W('abortcontroller', 'أداة لإلغاء شغل غير متزامن', 'a tool for cancelling async work', 'AbortController cancels the old search.'),
        W('cancellation', 'إلغاء شغل بدأ', 'stopping work that has started', 'Cancellation avoids stale results.')
      ],
      read: [{ t: 'MDN: Promise.allSettled()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled', what: B('قارنها بـ all.', 'Compare it with all.') }, { t: 'MDN: AbortController', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController', what: B('اقرا المثال مع fetch.', 'Read the fetch example.') }],
      challenge: B('اعمل دالة checkAll(urls) بتفحص قايمة مصادر وهمية بالتوازي، كل واحد بمهلة، وترجّع جدول: الاسم، الحالة، الوقت — باستخدام allSettled.', 'Write checkAll(urls) that checks a list of fake sources in parallel, each with a timeout, and returns a table of name, status and time — using allSettled.'),
      quiz: [
        Q(B('عايز نتيجة كل مصدر حتى لو بعضهم فشل:', 'You want every source’s result even if some fail:'), ['Promise.allSettled', 'Promise.all', 'Promise.race'], 0, B('مبيوقفش عند الفشل.', 'It does not stop on failure.')),
        Q(B('3 نسخ لنفس الملف، عايز أول واحدة تشتغل:', 'Three mirrors of a file; you want the first that works:'), ['Promise.any', 'Promise.all', 'Promise.allSettled'], 0, B('أول نجاح.', 'First success.')),
        Q(B('fetch بمهلة 5 ثواني:', 'fetch with a 5-second limit:'), ['{ signal: AbortSignal.timeout(5000) }', '{ timeout: 5 }', '{ wait: 5000 }'], 0, B('signal.', 'A signal.'))
      ] },

    { title: B('التحكم في التوازي وإعادة المحاولة', 'Concurrency control and retries'),
      goal: B('تشغّل مئات المهام من غير ما تكسر الـ API أو السكربت.', 'Run hundreds of jobs without breaking the API or the script.'),
      learn: [
        L(B('حد للتوازي', 'A concurrency limit'),
          B('`Promise.all` على 1000 طلب = 1000 طلب في نفس اللحظة: الـ API هيرد 429 أو يحظرك. الحل: **concurrency** محدود — **worker pool** صغير (مثلًا 3 عمّال) كل واحد ياخد المهمة اللي بعدها لما يخلص. ده أهم نمط في سكربتات الأتمتة.', '`Promise.all` on 1000 requests = 1000 requests at the same moment: the API answers 429 or blocks you. The fix: limited **concurrency** — a small **worker pool** (say 3 workers), each taking the next job when it finishes. This is the most important pattern in automation scripts.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function mapLimit(items, limit, fn) {\n  const results = new Array(items.length);\n  let next = 0, running = 0, peak = 0;\n  async function worker() {\n    while (next < items.length) {\n      const i = next++;\n      running++; peak = Math.max(peak, running);\n      results[i] = await fn(items[i]);\n      running--;\n    }\n  }\n  await Promise.all(Array.from({ length: limit }, worker));\n  console.log("peak at once:", peak);\n  return results;\n}\nconst ids = Array.from({ length: 10 }, (_, i) => i + 1);\nmapLimit(ids, 3, async id => { await sleep(30 + (id % 3) * 20); return id * 10; })\n  .then(r => console.log(r.join(" ")));', J),
        L(B('إعادة المحاولة بانتظار متزايد', 'Retrying with a growing wait'),
          B('الأخطاء المؤقتة (شبكة، 429، 503) بتتحل غالبًا لو استنيت وحاولت تاني. انتظر مدة **بتزيد** كل مرة (200، 400، 800ms) مع شوية عشوائية، وبحد أقصى للمحاولات. ومتعيدش على أخطاء دايمة (400، 401، 404) — دي مش هتتحل لوحدها.', 'Temporary errors (network, 429, 503) usually go away if you wait and try again. Wait a **growing** time each attempt (200, 400, 800 ms) with some randomness, and cap the attempts. Do not retry permanent errors (400, 401, 404) — they will not fix themselves.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function retry(fn, { tries = 4, base = 50 } = {}) {\n  for (let attempt = 1; ; attempt++) {\n    try { return await fn(attempt); }\n    catch (err) {\n      if (!err.temporary || attempt === tries) throw err;\n      const wait = base * 2 ** (attempt - 1) + Math.floor(Math.random() * 20);\n      console.log(`attempt ${attempt} failed (${err.message}), waiting ${wait} ms`);\n      await sleep(wait);\n    }\n  }\n}\nlet calls = 0;\nconst flakyApi = async () => {\n  calls++;\n  if (calls < 3) throw Object.assign(new Error("503 busy"), { temporary: true });\n  return "saved on call " + calls;\n};\nretry(flakyApi).then(console.log);', J),
        L(B('الأخطاء اللي محدش مسكها', 'Errors nobody caught'),
          B('Promise فشل ومفيش catch = **unhandled rejection**. في المتصفح بيطلع في الكونسول، وفي Node الحديث **بيقفل البرنامج**. القاعدة: كل Promise ليه صاحب — `await` جوه try، أو `.catch`. ومتعملش `async` جوه `forEach` (مبيستناش)؛ استخدم `for...of` أو `Promise.all(map)`.', 'A promise that fails with no catch = an **unhandled rejection**. In the browser it shows in the console, and in modern Node it **crashes the program**. The rule: every promise has an owner — `await` inside try, or `.catch`. And never use `async` inside `forEach` (it does not wait); use `for...of` or `Promise.all(map)`.'),
          '// ✗ forEach does not wait: "done" prints before any save, and errors are unhandled\nitems.forEach(async item => { await save(item); });\nconsole.log("done");\n\n// ✓ in order\nfor (const item of items) await save(item);\n// ✓ in parallel (with a limit when the list is big)\nawait Promise.all(items.map(save));', S)
      ],
      practice: [
        B('شغّل mapLimit بحد 1 و3 و10 وقارن الوقت والـ peak.', 'Run mapLimit with limits 1, 3 and 10 and compare time and peak.'),
        B('خلّي flakyApi تفشل 5 مرات وشوف retry يستسلم.', 'Make flakyApi fail 5 times and watch retry give up.'),
        B('ضيف خطأ دايم (404) واتأكد إنه مش بيتعاد.', 'Add a permanent error (404) and make sure it is not retried.'),
        B('اكتشف forEach async في كود قديم عندك وصلّحه.', 'Find an async forEach in your old code and fix it.')
      ],
      words: [
        W('concurrency', 'عدد المهام الشغالة في نفس الوقت', 'how many jobs run at the same time', 'Keep concurrency at 3 for this API.'),
        W('worker pool', 'مجموعة عمّال بتاخد المهام بالدور', 'a group of workers taking jobs in turn', 'A worker pool of 5 handles the list.'),
        W('rate limiting', 'تحديد عدد الطلبات في مدة', 'limiting how many requests are made in a time', 'Rate limiting avoids 429 errors.'),
        W('throttle', 'تبطيء معدل التنفيذ لحد معين', 'to slow the rate of calls to a limit', 'Throttle the sync to 2 calls per second.'),
        W('jitter', 'شوية عشوائية في وقت الانتظار', 'a little randomness in the wait time', 'Add jitter so clients do not retry together.'),
        W('unhandled rejection', 'Promise فشل من غير catch', 'a failed promise with no catch', 'An unhandled rejection crashed the script.'),
        W('transient error', 'خطأ مؤقت بيروح لوحده', 'a temporary error that goes away', 'Retry transient errors only.')
      ],
      read: [{ lib: 'Node.js best practices', what: B('اقرا قسم Error handling.', 'Read the Error handling section.') }, { t: 'MDN: Window: unhandledrejection event', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event', what: B('اقرا إمتى بيحصل.', 'Read when it happens.') }],
      challenge: B('اكتب runJobs(list, { limit, tries, timeout }) بيجمع mapLimit وretry وwithTimeout، ويطبع تقرير: نجح، فشل نهائي، اتعاد كام مرة، والوقت الكلي — وجرّبه على 30 مهمة وهمية.', 'Write runJobs(list, { limit, tries, timeout }) combining mapLimit, retry and withTimeout, printing a report: succeeded, failed for good, retry count and total time — and try it on 30 fake jobs.'),
      quiz: [
        Q(B('1000 طلب لـ API بحد 5 في الثانية:', '1000 requests to an API limited to 5 per second:'), [['حد للتوازي وتبطيء', 'a concurrency limit and throttling'], ['Promise.all مرة واحدة', 'one Promise.all'], ['loop من غير await', 'a loop without await']], 0, B('احترم الحد.', 'Respect the limit.')),
        Q(B('نعيد المحاولة على:', 'We retry on:'), ['503 / 429 / network', '400 / 401 / 404', B('أي خطأ', 'any error')], 0, B('المؤقت بس.', 'Temporary only.')),
        Q(B('async جوه forEach:', 'async inside forEach:'), [['مبيستناش', 'does not wait'], ['بيستنى كل واحدة', 'waits for each'], ['أسرع طريقة', 'is the fastest way']], 0, B('for...of أو Promise.all.', 'Use for...of or Promise.all.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('سكربت غير متزامن كامل بحدود ومهلة وإعادة محاولة.', 'A complete async script with limits, timeouts and retries.'),
      review: [
        B('الـ event loop: الكود المتزامن، ثم الـ microtasks، ثم الـ tasks.', 'The event loop: sync code, then microtasks, then tasks.'),
        B('Promises: الحالات، then/catch/finally، والـ chaining.', 'Promises: states, then/catch/finally and chaining.'),
        B('async/await مع try...catch، وsequential مقابل parallel.', 'async/await with try...catch, and sequential vs parallel.'),
        B('all وallSettled وrace وany، والمهلة والإلغاء.', 'all, allSettled, race and any, timeouts and cancellation.'),
        B('worker pool وretry بانتظار متزايد وعدم ترك أي Promise من غير صاحب.', 'A worker pool, retries with a growing wait, and no promise left without an owner.')
      ],
      project: B('ابني «مزامن الطلبات»: قايمة 50 طلب وهمي، كل طلب بيتبعت لـ API وهمي بيفشل أحيانًا ويتأخر أحيانًا. السكربت: حد توازي 4، مهلة 300ms لكل طلب، retry للأخطاء المؤقتة بس، زرار إلغاء (AbortController) يوقف الباقي، وفي الآخر تقرير allSettled: نجح/فشل/اتلغى، أبطأ 3 طلبات، والوقت الكلي.', 'Build an «order syncer»: a list of 50 fake orders, each sent to a fake API that sometimes fails and sometimes lags. The script: concurrency 4, a 300 ms timeout per request, retries for temporary errors only, a cancel button (AbortController) stopping the rest, and finally an allSettled report: succeeded/failed/cancelled, the 3 slowest requests and the total time.'),
      test: [
        Q(B('ترتيب الطباعة: log، setTimeout 0، Promise.then، log', 'Print order: log, setTimeout 0, Promise.then, log'), ['log, log, then, timeout', 'log, timeout, then, log', 'then, log, log, timeout'], 0, B('microtask قبل task.', 'Microtask before task.')),
        Q(B('حالات الـ Promise:', 'Promise states:'), ['pending / fulfilled / rejected', 'open / closed', 'start / stop / pause'], 0, B('3 حالات.', 'Three states.')),
        Q(B('then جوه then بيرجّع قيمة:', 'Returning a value inside then:'), [['بتوصل للـ then اللي بعده', 'reaches the next then'], ['بتضيع', 'is lost'], ['بتعمل خطأ', 'causes an error']], 0, B('chaining.', 'Chaining.')),
        Q(B('خطأ جوه await بيتمسك بـ:', 'An error inside await is caught with:'), ['try...catch', 'if', 'switch'], 0, B('زي الكود العادي.', 'Like normal code.')),
        Q(B('طلبين مستقلين:', 'Two independent requests:'), [['Promise.all بالتوازي', 'Promise.all in parallel'], ['await ورا await', 'await after await'], ['setTimeout', 'setTimeout']], 0, B('أسرع.', 'Faster.')),
        Q(B('تقرير «نجح كام وفشل كام»:', 'A «how many succeeded and failed» report:'), ['Promise.allSettled', 'Promise.race', 'Promise.any'], 0, B('كل النتايج.', 'All results.')),
        Q(B('أول رد من 3 خوادم بديلة:', 'The first good reply from 3 backup servers:'), ['Promise.any', 'Promise.all', 'Promise.allSettled'], 0, B('أول نجاح.', 'First success.')),
        Q(B('API ممكن ميردش:', 'An API that may never reply:'), [['حط timeout', 'set a timeout'], ['استنى', 'just wait'], ['أعد تشغيل الجهاز', 'restart the computer']], 0, B('دايمًا.', 'Always.')),
        Q(B('إلغاء fetch قديم:', 'Cancelling an old fetch:'), ['AbortController', 'clearTimeout', 'break'], 0, B('signal.', 'A signal.')),
        Q(B('حد التوازي بيمنع:', 'A concurrency limit prevents:'), [['ضغط الـ API والحظر', 'overloading and getting blocked by the API'], ['الأخطاء كلها', 'all errors'], ['البطء', 'slowness']], 0, B('429.', '429.')),
        Q(B('الانتظار بين المحاولات:', 'The wait between retries:'), [['بيزيد مع شوية عشوائية', 'grows, with some randomness'], ['ثابت صفر', 'always zero'], ['ساعة', 'an hour']], 0, B('backoff + jitter.', 'Backoff + jitter.')),
        Q(B('Promise فشل من غير catch في Node:', 'A promise failing with no catch in Node:'), [['بيقفل البرنامج', 'crashes the program'], ['بيتجاهل', 'is ignored'], ['بيعيد لوحده', 'retries itself']], 0, B('unhandled rejection.', 'Unhandled rejection.'))
      ] }
  ]
};
