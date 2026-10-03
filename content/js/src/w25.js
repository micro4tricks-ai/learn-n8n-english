// JavaScript week 25 — TypeScript basics.
// ts: 1 examples are saved as main.ts and run by Node, which strips the types (Node 23.6+); tsc does the checking.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const TS = { lang: 'ts' };
const T = { lang: 'text' };
const R = { node: 1, ts: 1 };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('أساسيات TypeScript', 'TypeScript basics'),
  goal: B('تكتب TypeScript يمسك الأخطاء قبل ما تشتغل: الأنواع والاستنتاج، الكائنات والـ interfaces، الـ unions والتضييق، any مقابل unknown، وإعداد مشروع Node بـ tsconfig — وتعرف إن Node بقى يشغّل .ts مباشرة.',
          'Write TypeScript that catches bugs before they run: types and inference, objects and interfaces, unions and narrowing, any vs unknown, and setting up a Node project with tsconfig — and know that Node now runs .ts directly.'),
  days: [
    { title: B('ليه TypeScript؟', 'Why TypeScript?'),
      goal: B('تفهم الأنواع وإزاي تشغّل وتفحص الكود.', 'Understand types and how to run and check code.'),
      learn: [
        L(B('الأنواع بتمسك الغلط بدري', 'Types catch mistakes early'),
          B('**typescript** = جافاسكريبت + أنواع. **type annotation** (`total: number`) بتقول نوع القيمة، و**tsc** بيفحص الكود **قبل** التشغيل: «بعت نص مكان رقم»، «الخاصية دي مش موجودة»، «نسيت حالة». المحرر كمان بيكمّل لك الأسماء. ونفس الكود بيتحوّل JS عادي.', '**typescript** = JavaScript + types. A **type annotation** (`total: number`) states a value’s type, and **tsc** checks the code **before** it runs: «you passed a string for a number», «that property does not exist», «you forgot a case». The editor also autocompletes names. And the same code becomes ordinary JS.'),
          'type Order = { id: number; customer: string; total: number; paid: boolean };\n\nfunction vat(order: Order, rate: number = 0.14): number {\n  return Math.round(order.total * rate * 100) / 100;\n}\nconst order: Order = { id: 101, customer: "Sara", total: 250, paid: true };\nconsole.log("VAT:", vat(order));\n// vat({ id: 102, customer: "Omar", total: "90" });   ← tsc: Type \'string\' is not assignable to type \'number\'', R),
        L(B('الاستنتاج', 'Inference'),
          B('مش لازم تكتب النوع في كل حتة: **type inference** بيستنتجه من القيمة (`const n = 5` ← number، و`[1, 2].map(x => x * 2)` ← number[]). اكتب الأنواع على **حدود** الكود: معاملات الدوال، والقيم الراجعة المهمة، وشكل البيانات الجاية من برة. والباقي سيبه يتستنتج.', 'You do not write types everywhere: **type inference** works them out from values (`const n = 5` → number, `[1, 2].map(x => x * 2)` → number[]). Write types at the **edges** of the code: function parameters, important return values, and the shape of outside data. Let inference do the rest.'),
          'const prices = [45, 12.5, 650];                 // number[]\nconst doubled = prices.map(p => p * 2);           // number[]\nconst names = ["Sara", "Omar"];                  // string[]\nconst byName = new Map(names.map((n, i) => [n, prices[i]]));   // Map<string, number>\nconst total = prices.reduce((s, p) => s + p, 0);  // number\nconsole.log(doubled, byName.get("Omar"), total);\n// names.push(42);   ← tsc: Argument of type \'number\' is not assignable to parameter of type \'string\'', R),
        L(B('Node بيشغّل .ts — بس مبيفحصش', 'Node runs .ts — but does not check'),
          B('Node 23.6+ بيشغّل `node main.ts` مباشرة: بيعمل **type stripping** (بيشيل الأنواع ويشغّل). يعني **مبيفحصش** الأخطاء! الفحص شغلة `tsc --noEmit` (في المحرر وفي CI). وبيدعم **erasable syntax** بس: الأنواع اللي تتشال وخلاص — مش `enum` ولا `namespace`.', 'Node 23.6+ runs `node main.ts` directly: it performs **type stripping** (removes the types and runs). That means it does **not** check for errors! Checking is the job of `tsc --noEmit` (in the editor and in CI). It supports **erasable syntax** only: types that can simply be removed — not `enum` or `namespace`.'),
          'npm i -D typescript @types/node\nnpx tsc --init                   # creates tsconfig.json\nnode src/main.ts                 # runs (types stripped, NOT checked)\nnpx tsc --noEmit                 # checks every file, emits nothing\n# package.json: "scripts": { "start": "node src/main.ts", "typecheck": "tsc --noEmit" }', T)
      ],
      practice: [
        B('شغّل أول مثال بـ node main.ts.', 'Run the first example with node main.ts.'),
        B('اعمل غلطة نوع وشوف tsc بيقول إيه.', 'Make a type mistake and read what tsc says.'),
        B('شيل annotations جوه الدالة وسيب الاستنتاج.', 'Remove annotations inside a function and rely on inference.'),
        B('جرّب enum في ملف .ts وشغّله بـ node.', 'Try an enum in a .ts file and run it with node.')
      ],
      words: [
        W('typescript', 'جافاسكريبت بأنواع', 'JavaScript with types', 'The API client is written in TypeScript.'),
        W('type annotation', 'كتابة نوع القيمة صراحة', 'writing a value’s type explicitly', 'Add a type annotation to the parameter.'),
        W('type inference', 'استنتاج النوع من القيمة', 'working out a type from the value', 'Type inference knows it is a number.'),
        W('tsc', 'مترجم وفاحص TypeScript', 'the TypeScript compiler and checker', 'Run tsc --noEmit in CI.'),
        W('type stripping', 'شيل الأنواع وتشغيل الكود', 'removing types and running the code', 'Node uses type stripping for .ts files.'),
        W('erasable syntax', 'صيغة TS تتشال من غير ما تغيّر الكود', 'TS syntax removable without changing the code', 'Enums are not erasable syntax.')
      ],
      read: [{ lib: 'TypeScript Handbook', what: B('اقرا The Basics وEveryday Types.', 'Read The Basics and Everyday Types.') }, { t: 'Node.js: Running TypeScript natively', url: 'https://nodejs.org/learn/typescript/run-natively', what: B('اقرا الحدود.', 'Read the limitations.') }],
      challenge: B('حوّل موديول money من أسبوع 15 لـ TypeScript: نوع Order وItem، دوال total وvat وformatEGP بأنواع، وشغّله بـ node، وافحصه بـ tsc --noEmit بعد ما تعمل 3 أخطاء متعمدة.', 'Convert the week 15 money module to TypeScript: Order and Item types, typed total, vat and formatEGP functions; run it with node, and check it with tsc --noEmit after making 3 deliberate mistakes.'),
      quiz: [
        Q(B('node main.ts بيفحص الأنواع؟', 'Does node main.ts check types?'), [['لأ؛ بيشيلها بس', 'no; it only strips them'], ['أيوه', 'yes'], ['ساعات', 'sometimes']], 0, B('tsc للفحص.', 'tsc checks.')),
        Q(B('الأنواع تتكتب أهم حاجة في:', 'Types matter most at:'), [['معاملات الدوال والبيانات الجاية من برة', 'function parameters and outside data'], ['كل متغير', 'every variable'], ['التعليقات', 'comments']], 0, B('الحدود.', 'The edges.')),
        Q(B('const n = 5 نوعها:', 'The type of const n = 5:'), ['5 (literal) / number', 'string', 'any'], 0, B('inference.', 'Inference.'))
      ] },

    { title: B('أنواع الكائنات', 'Object types'),
      goal: B('توصف شكل بياناتك بدقة.', 'Describe the shape of your data precisely.'),
      learn: [
        L(B('type وinterface', 'type and interface'),
          B('**type alias** (`type Customer = {...}`) و**interface** (`interface Customer {...}`) الاتنين بيوصفوا كائن. الفرق بسيط: interface ممكن يتمد (`extends`) ويتدمج، وtype بيعمل unions وحاجات أكتر. اختار واحد وامشي عليه في المشروع. و**optional property** بـ `?`، و**readonly** ميتغيرش.', 'A **type alias** (`type Customer = {...}`) and an **interface** (`interface Customer {...}`) both describe an object. The difference is small: interfaces can be extended (`extends`) and merged, types can make unions and more. Pick one and stick to it in a project. An **optional property** uses `?`, and **readonly** cannot change.'),
          'interface Customer {\n  readonly id: number;\n  name: string;\n  phone?: string;               // optional\n  tags: string[];\n}\ninterface VipCustomer extends Customer { discount: number }\n\nfunction label(c: Customer): string {\n  return `${c.name}${c.phone ? " · " + c.phone : ""}${c.tags.length ? " [" + c.tags.join(", ") + "]" : ""}`;\n}\nconst sara: VipCustomer = { id: 7, name: "Sara", tags: ["vip"], discount: 0.1 };\nconsole.log(label(sara), "discount", sara.discount);\n// sara.id = 8;   ← tsc: Cannot assign to \'id\' because it is a read-only property', R),
        L(B('مصفوفات وtuples وRecord', 'Arrays, tuples and Record'),
          B('`string[]` مصفوفة، و**tuple** `[string, number]` = مصفوفة بطول وأنواع ثابتة (زي صف CSV أو `Object.entries`). و`Record<string, number>` = كائن مفاتيحه نصوص وقيمه أرقام (زي totals حسب المدينة).', '`string[]` is an array, and a **tuple** `[string, number]` = an array with fixed length and types (like a CSV row or `Object.entries`). And `Record<string, number>` = an object with string keys and number values (like totals by city).'),
          'type Row = [id: number, city: string, total: number];\nconst rows: Row[] = [[101, "Cairo", 250], [102, "Giza", 90.5], [103, "Cairo", 1200]];\nconst byCity: Record<string, number> = {};\nfor (const [, city, total] of rows) byCity[city] = (byCity[city] ?? 0) + total;\nconst top: [string, number] = Object.entries(byCity).sort((a, b) => b[1] - a[1])[0];\nconsole.log(byCity, "top:", top[0], top[1]);', R),
        L(B('أنواع الدوال', 'Function types'),
          B('**function type**: `(order: Order) => number` — مفيد لما تبعت دالة كمعامل (callback، mapper، retry). والمعاملات الاختيارية `?` والافتراضية `= 0.14`، والدالة اللي مبترجعش حاجة `void`، واللي async بترجع `Promise<T>`.', 'A **function type**: `(order: Order) => number` — useful when passing a function as a parameter (a callback, a mapper, retry). Optional parameters use `?`, defaults `= 0.14`, a function returning nothing is `void`, and an async one returns `Promise<T>`.'),
          'type Mapper<In, Out> = (item: In, index: number) => Out;\n\nasync function mapLimit<In, Out>(items: In[], limit: number, fn: (item: In) => Promise<Out>): Promise<Out[]> {\n  const out: Out[] = new Array(items.length);\n  let next = 0;\n  const worker = async (): Promise<void> => { while (next < items.length) { const i = next++; out[i] = await fn(items[i]); } };\n  await Promise.all(Array.from({ length: limit }, worker));\n  return out;\n}\nconst toLabel: Mapper<number, string> = (n, i) => `#${i + 1}: ${n}`;\nconst squares = await mapLimit([1, 2, 3, 4], 2, async n => n * n);\nconsole.log(squares.map(toLabel));', R)
      ],
      practice: [
        B('اكتب interface لـ Order فيه Items وعنوان اختياري.', 'Write an Order interface with Items and an optional address.'),
        B('اعمل VipCustomer بـ extends.', 'Create VipCustomer with extends.'),
        B('اكتب نوع Row لصف CSV كـ tuple.', 'Write a Row type for a CSV row as a tuple.'),
        B('اكتب نوع دالة retry بتاخد دالة async.', 'Type a retry function taking an async function.')
      ],
      words: [
        W('type alias', 'اسم لنوع بـ type', 'a name for a type using type', 'type Order = {...} is a type alias.'),
        W('interface', 'وصف لشكل كائن ممكن يتمد', 'a description of an object shape that can be extended', 'The Customer interface has a name.'),
        W('optional property', 'خاصية ممكن متكونش موجودة', 'a property that may be missing', 'phone? is an optional property.'),
        W('readonly', 'ميتغيرش بعد الإنشاء', 'cannot change after creation', 'The id is readonly.'),
        W('tuple', 'مصفوفة بطول وأنواع ثابتة', 'an array with fixed length and types', 'Object.entries returns tuples.'),
        W('function type', 'نوع بيوصف دالة', 'a type describing a function', 'The callback has a function type.')
      ],
      read: [{ lib: 'TypeScript Handbook', what: B('اقرا Object Types وMore on Functions.', 'Read Object Types and More on Functions.') }],
      challenge: B('اكتب أنواع مشروع الشهر الرابع كلها (Order، Item، Customer، Report، Config) في `types.ts`، واستخدمها في كل الموديولات، وخلّي tsc --noEmit ينجح من غير any.', 'Write all the month 4 project types (Order, Item, Customer, Report, Config) in `types.ts`, use them in every module, and make tsc --noEmit pass without any.'),
      quiz: [
        Q(B('phone?: string معناه:', 'phone?: string means:'), [['ممكن تكون مش موجودة', 'it may be missing'], ['لازم تكون موجودة', 'it is required'], ['رقم', 'a number']], 0, B('optional.', 'Optional.')),
        Q(B('[string, number]:', '[string, number]:'), ['tuple', 'object', 'union'], 0, B('طول ثابت.', 'Fixed length.')),
        Q(B('دالة async بترجع رقم:', 'An async function returning a number:'), ['Promise<number>', 'number', 'async<number>'], 0, B('Promise.', 'A promise.'))
      ] },

    { title: B('الـ unions والتضييق', 'Unions and narrowing'),
      goal: B('تكتب أنواع لكل الحالات وتخلّي tsc يتأكد إنك غطيتها.', 'Type every case and let tsc confirm you handled them.'),
      learn: [
        L(B('union وliteral', 'Union and literal'),
          B('**union type** `string | number` = يا ده يا ده. و**literal type** `"paid" | "new" | "shipped"` = بالظبط القيم دي — أحسن من `string` بكتير: tsc يرفض «payed» الغلط، والمحرر يقترح القيم. ده بديل الـ enum في TS الحديث.', 'A **union type** `string | number` = one or the other. A **literal type** `"paid" | "new" | "shipped"` = exactly those values — far better than `string`: tsc rejects a misspelt «payed», and the editor suggests the values. It replaces enums in modern TS.'),
          'type Status = "new" | "paid" | "shipped" | "cancelled";\ntype Id = number | string;\n\nfunction badge(status: Status): string {\n  return { new: "🆕", paid: "💰", shipped: "🚚", cancelled: "✖" }[status];\n}\nfunction normalizeId(id: Id): string {\n  return typeof id === "number" ? `ORD-${id}` : id.toUpperCase();\n}\nconsole.log(badge("paid"), badge("shipped"), normalizeId(101), normalizeId("ord-7"));\n// badge("payed");   ← tsc: Argument of type \'"payed"\' is not assignable to parameter of type \'Status\'', R),
        L(B('التضييق', 'Narrowing'),
          B('**narrowing**: جوه `if (typeof x === "string")` tsc عارف إن x نص. وكمان بـ `in` (فيه الخاصية؟)، و`instanceof`، و`Array.isArray`، والمقارنة بـ null. و**type guard** = دالة بترجع `x is Type` عشان تستخدم نفس الفحص في أماكن كتير.', '**narrowing**: inside `if (typeof x === "string")` tsc knows x is a string. Also with `in` (does it have the property?), `instanceof`, `Array.isArray`, and null checks. A **type guard** = a function returning `x is Type` so you reuse the same check in many places.'),
          'type Card = { kind: "card"; last4: string };\ntype Wallet = { kind: "wallet"; phone: string };\ntype Payment = Card | Wallet | null;\n\nconst isCard = (p: Payment): p is Card => p !== null && p.kind === "card";\n\nfunction describe(p: Payment): string {\n  if (p === null) return "unpaid";\n  if (isCard(p)) return `card •••• ${p.last4}`;          // p is Card here\n  return `wallet ${p.phone.slice(0, 4)}…`;               // p is Wallet here\n}\nconst payments: Payment[] = [{ kind: "card", last4: "4242" }, { kind: "wallet", phone: "01001234567" }, null];\nconsole.log(payments.map(describe));\nconsole.log("cards:", payments.filter(isCard).length);', R),
        L(B('discriminated unions', 'Discriminated unions'),
          B('**discriminated union**: كل نوع فيه حقل ثابت (`type: "order.paid"`) بيفرّقه. ده الشكل المثالي للـ webhooks والأحداث. ومع `switch` و`never` في الـ default، لو حد ضاف نوع حدث جديد ونسي يتعامل معاه — tsc يقولك فورًا (**exhaustive check**).', 'A **discriminated union**: each type has a fixed field (`type: "order.paid"`) telling them apart. It is the perfect shape for webhooks and events. With a `switch` and `never` in the default, if someone adds a new event type and forgets to handle it — tsc tells you at once (an **exhaustive check**).'),
          'type ShopEvent =\n  | { type: "order.paid"; orderId: number; amount: number }\n  | { type: "order.refunded"; orderId: number; reason: string }\n  | { type: "customer.created"; email: string };\n\nfunction handle(e: ShopEvent): string {\n  switch (e.type) {\n    case "order.paid": return `+${e.amount} on #${e.orderId}`;\n    case "order.refunded": return `refund #${e.orderId}: ${e.reason}`;\n    case "customer.created": return `welcome ${e.email}`;\n    default: {\n      const unhandled: never = e;          // tsc errors here if a case is missing\n      throw new Error(`unknown event ${JSON.stringify(unhandled)}`);\n    }\n  }\n}\nconst events: ShopEvent[] = [{ type: "order.paid", orderId: 1, amount: 250 }, { type: "customer.created", email: "sara@example.com" }];\nconsole.log(events.map(handle));', R)
      ],
      practice: [
        B('حوّل حالات الطلب لـ literal union.', 'Turn order statuses into a literal union.'),
        B('اكتب type guard لـ isVip.', 'Write an isVip type guard.'),
        B('اعمل discriminated union لـ 4 أحداث webhook.', 'Build a discriminated union of 4 webhook events.'),
        B('ضيف حدث جديد وشوف tsc يشتكي في الـ switch.', 'Add a new event and watch tsc complain in the switch.')
      ],
      words: [
        W('union type', 'نوع يا ده يا ده', 'a type that is one or another', 'string | number is a union type.'),
        W('literal type', 'نوع بقيمة محددة بالظبط', 'a type with one exact value', '"paid" is a literal type.'),
        W('narrowing', 'تضييق النوع بعد فحص', 'reducing a type after a check', 'typeof checks enable narrowing.'),
        W('type guard', 'دالة بتثبت نوع قيمة', 'a function proving a value’s type', 'isCard is a type guard.'),
        W('discriminated union', 'union بحقل ثابت بيفرّق الأنواع', 'a union with a fixed field telling types apart', 'Webhook events fit a discriminated union.'),
        W('exhaustive check', 'التأكد إن كل الحالات اتغطت', 'making sure every case is handled', 'never gives an exhaustive check.'),
        W('never', 'نوع مفيش قيمة ليه', 'the type with no values', 'Assign to never in the default case.')
      ],
      read: [{ lib: 'TypeScript Handbook', what: B('اقرا Narrowing.', 'Read Narrowing.') }, { lib: 'Total TypeScript: free tutorials', what: B('اقرا Beginner’s TypeScript.', 'Read Beginner’s TypeScript.') }],
      challenge: B('اكتب أنواع webhooks متجرك كـ discriminated union (5 أحداث)، ودالة handle بـ switch وexhaustive check، وtype guards للتحقق من الـ JSON الجاي — وجرّب تضيف حدث وتنسى تتعامل معاه.', 'Type your shop’s webhooks as a discriminated union (5 events), with a handle function using a switch and an exhaustive check, and type guards for incoming JSON — then add an event and forget to handle it.'),
      quiz: [
        Q(B('"paid" | "new":', '"paid" | "new":'), [['literal union', 'a literal union'], ['string', 'string'], ['enum', 'an enum']], 0, B('قيم محددة.', 'Exact values.')),
        Q(B('if (p === null) return; بعدها p:', 'After if (p === null) return; p is:'), [['مش null', 'not null'], ['null', 'null'], ['any', 'any']], 0, B('narrowing.', 'Narrowing.')),
        Q(B('const x: never = e في default:', 'const x: never = e in default:'), [['يمسك الحالات الناقصة', 'catches missing cases'], ['خطأ دايمًا', 'always an error'], ['ملوش لازمة', 'useless']], 0, B('exhaustive.', 'Exhaustive.'))
      ] },

    { title: B('any وunknown وas const وsatisfies', 'any, unknown, as const and satisfies'),
      goal: B('تتعامل مع البيانات الغريبة من غير ما تطفي الحماية.', 'Handle unknown data without switching off the protection.'),
      learn: [
        L(B('any مقابل unknown', 'any vs unknown'),
          B('**any** = «سيبني في حالي»: tsc بيبطّل يفحص — كل حاجة مسموحة، والأخطاء بترجع. **unknown** = «مش عارف لسه»: لازم تفحص قبل ما تستخدم. JSON جاي من API أو webhook = unknown، وبعد التحقق يبقى نوعك. وفعّل `noImplicitAny` (جوه strict).', '**any** = «leave me alone»: tsc stops checking — everything is allowed and bugs come back. **unknown** = «not known yet»: you must check before use. JSON from an API or webhook = unknown, and after validation it becomes your type. And turn on `noImplicitAny` (part of strict).'),
          'type Order = { id: number; total: number };\nfunction isOrder(x: unknown): x is Order {\n  return typeof x === "object" && x !== null && typeof (x as Record<string, unknown>).id === "number" && typeof (x as Record<string, unknown>).total === "number";\n}\nconst body: unknown = JSON.parse(\'{"id": 101, "total": 250}\');\n// body.total   ← tsc: \'body\' is of type \'unknown\'\nif (isOrder(body)) console.log("valid order", body.id, body.total);\n\nconst risky: any = JSON.parse(\'{"id": 102}\');\nconsole.log("any lets this through:", typeof risky.total);   // "undefined" — risky.total.toFixed(2) would crash', R),
        L(B('as والـ assertions', 'as and assertions'),
          B('**type assertion** `x as Order` = «صدقني يا tsc» — من غير أي فحص وقت التشغيل. استخدمها نادرًا (DOM: `as HTMLInputElement`)، ومتستخدمهاش على بيانات من برة. والـ `!` (non-null) نفس الكلام: بيسكّت tsc، مش بيحميك.', 'A **type assertion** `x as Order` = «trust me, tsc» — with no runtime check at all. Use it rarely (the DOM: `as HTMLInputElement`), and never on outside data. The `!` (non-null) is the same: it silences tsc, it does not protect you.'),
          'const input = document.querySelector("#qty") as HTMLInputElement;   // fine: you wrote the HTML\nconst qty = Number(input.value);\n\nconst order = (await res.json()) as Order;     // ✗ no check: a wrong reply crashes later\nconst checked = OrderSchema.parse(await res.json());   // ✓ validated (Zod, next week)', TS),
        L(B('as const وsatisfies', 'as const and satisfies'),
          B('**as const** بيخلّي الكائن أو المصفوفة readonly بقيم literal — بديل الـ enum: `const STATUSES = ["new", "paid"] as const` ومنها `type Status = typeof STATUSES[number]`. و**satisfies** بيتأكد إن قيمة مطابقة لنوع **من غير** ما يضيّع أنواعها الدقيقة.', '**as const** makes an object or array readonly with literal values — the enum replacement: `const STATUSES = ["new", "paid"] as const` and from it `type Status = typeof STATUSES[number]`. **satisfies** checks a value matches a type **without** losing its precise types.'),
          'const STATUSES = ["new", "paid", "shipped"] as const;\ntype Status = typeof STATUSES[number];            // "new" | "paid" | "shipped"\n\nconst isStatus = (s: string): s is Status => (STATUSES as readonly string[]).includes(s);\n\nconst COLORS = { new: "#888", paid: "#0a7d32", shipped: "#1a5fb4" } satisfies Record<Status, string>;\n// forgetting "shipped" above → tsc error; and COLORS.paid stays the literal "#0a7d32"\n\nfor (const s of ["paid", "lost"]) console.log(s, isStatus(s) ? COLORS[s] : "unknown status");', R)
      ],
      practice: [
        B('دوّر على any في كودك وبدّله بـ unknown + فحص.', 'Find any in your code and replace it with unknown + a check.'),
        B('اكتب isOrder وجرّبه على 3 JSON مختلفين.', 'Write isOrder and try it on 3 different JSON values.'),
        B('بدّل enum بـ as const.', 'Replace an enum with as const.'),
        B('استخدم satisfies لكائن إعدادات.', 'Use satisfies on a settings object.')
      ],
      words: [
        W('any', 'نوع بيطفي الفحص', 'a type that switches checking off', 'Avoid any in new code.'),
        W('unknown', 'نوع لازم تفحصه قبل الاستخدام', 'a type you must check before use', 'Treat webhook bodies as unknown.'),
        W('type assertion', 'إجبار tsc على نوع من غير فحص', 'forcing a type on tsc without a check', 'A type assertion is not validation.'),
        W('as const', 'تثبيت القيم كـ literal وreadonly', 'freezing values as literal and readonly', 'Use as const instead of an enum.'),
        W('satisfies', 'فحص المطابقة مع الاحتفاظ بالنوع الدقيق', 'checking a match while keeping the precise type', 'The config satisfies Record<Status, string>.'),
        W('noimplicitany', 'إعداد بيمنع any الضمني', 'a setting forbidding implicit any', 'strict turns on noImplicitAny.')
      ],
      read: [{ t: 'TypeScript: The satisfies operator', url: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html', what: B('اقرا قسم satisfies.', 'Read the satisfies section.') }, { lib: 'TypeScript Playground', what: B('جرّب الأمثلة وشوف الأخطاء.', 'Try the examples and see the errors.') }],
      challenge: B('خلّي عميل الـ API (أسبوع 14) يرجّع unknown، واكتب type guards لكل رد، وبدّل كل as على بيانات برة بفحص حقيقي، وخلّي strict شغال من غير أخطاء.', 'Make the week 14 API client return unknown, write type guards for every reply, replace every as on outside data with a real check, and make strict pass with no errors.'),
      quiz: [
        Q(B('JSON من webhook نوعه:', 'JSON from a webhook should be:'), ['unknown', 'any', 'Order'], 0, B('افحص الأول.', 'Check first.')),
        Q(B('x as Order بيعمل فحص وقت التشغيل؟', 'Does x as Order check at run time?'), [['لأ', 'no'], ['أيوه', 'yes'], ['في strict بس', 'only in strict']], 0, B('assertion.', 'An assertion.')),
        Q(B('بديل enum في TS الحديث:', 'The enum replacement in modern TS:'), ['as const + typeof', 'namespace', 'any'], 0, B('erasable.', 'Erasable.'))
      ] },

    { title: B('TypeScript في مشروع حقيقي', 'TypeScript in a real project'),
      goal: B('تعدّ tsconfig وتنقل مشروع JS تدريجيًا.', 'Set up tsconfig and migrate a JS project gradually.'),
      learn: [
        L(B('tsconfig لـ Node', 'tsconfig for Node'),
          B('**tsconfig** بيحدد قواعد الفحص. لمشروع Node حديث: `strict: true`، و`module: "nodenext"`، و`noEmit` (Node بيشغّل .ts بنفسه)، و`verbatimModuleSyntax` و`erasableSyntaxOnly` عشان تفضل متوافق مع type stripping. والـ imports بامتداد `.ts`.', '**tsconfig** sets the checking rules. For a modern Node project: `strict: true`, `module: "nodenext"`, `noEmit` (Node runs .ts itself), and `verbatimModuleSyntax` plus `erasableSyntaxOnly` to stay compatible with type stripping. And imports use the `.ts` extension.'),
          '{\n  "compilerOptions": {\n    "target": "es2023",\n    "module": "nodenext",\n    "strict": true,\n    "noEmit": true,\n    "allowImportingTsExtensions": true,\n    "verbatimModuleSyntax": true,\n    "erasableSyntaxOnly": true,\n    "skipLibCheck": true,\n    "types": ["node"]\n  },\n  "include": ["src", "test"]\n}', T),
        L(B('أنواع المكتبات', 'Library types'),
          B('مكتبات كتير جاية بأنواعها (Zod، Luxon الحديث). لو لأ: **@types** (`npm i -D @types/express`). والأنواع دي في **declaration file** (`.d.ts`): وصف للأنواع من غير كود. وتقدر تكتب `.d.ts` صغير لمكتبة ملهاش أنواع أو لمتغيرات بيئة.', 'Many packages ship their own types (Zod, modern Luxon). If not: **@types** (`npm i -D @types/express`). These types live in a **declaration file** (`.d.ts`): a description of types with no code. You can write a small `.d.ts` for an untyped library or for environment variables.'),
          '// src/env.d.ts — teach TypeScript about our environment variables\ndeclare global {\n  namespace NodeJS {\n    interface ProcessEnv {\n      N8N_WEBHOOK_URL: string;\n      CRM_TOKEN: string;\n      PAGE_LIMIT?: string;\n    }\n  }\n}\nexport {};', TS),
        L(B('من JS لـ TS تدريجيًا', 'From JS to TS gradually'),
          B('مش لازم تحوّل كله مرة واحدة. ابدأ بـ **jsdoc types** و`// @ts-check` في أول ملف JS: المحرر وtsc بيفحصوه من غير ما تغيّر الامتداد — ده بيشتغل كمان في كود Code node اللي بتكتبه في VS Code. وبعدين حوّل ملف ملف لـ .ts، من الأطراف (types، utils) للمركز.', 'You do not have to convert everything at once. Start with **jsdoc types** and `// @ts-check` at the top of a JS file: the editor and tsc check it without changing the extension — this even works for Code-node code you write in VS Code. Then convert file by file to .ts, from the edges (types, utils) to the core.'),
          '// @ts-check\n/** @typedef {{ id: number, total: number, city?: string }} Order */\n\n/**\n * @param {Order[]} orders\n * @param {number} [rate=0.14]\n * @returns {{ count: number, total: number, vat: number }}\n */\nexport function summarize(orders, rate = 0.14) {\n  const total = orders.reduce((s, o) => s + o.total, 0);\n  return { count: orders.length, total, vat: Math.round(total * rate * 100) / 100 };\n}\nconsole.log(summarize([{ id: 1, total: 250 }, { id: 2, total: 90.5, city: "Giza" }]));\n// summarize([{ id: 3, total: "90" }])  ← the editor underlines it, even in a .js file', { node: 1 })
      ],
      practice: [
        B('اعمل tsconfig بالإعدادات دي وشغّل tsc --noEmit.', 'Create this tsconfig and run tsc --noEmit.'),
        B('ثبّت @types/express واكتب route بأنواع.', 'Install @types/express and write a typed route.'),
        B('اكتب env.d.ts لمتغيرات مشروعك.', 'Write an env.d.ts for your project’s variables.'),
        B('ضيف // @ts-check لملف JS قديم وصلّح اللي يظهر.', 'Add // @ts-check to an old JS file and fix what appears.')
      ],
      words: [
        W('tsconfig', 'ملف إعدادات TypeScript', 'the TypeScript settings file', 'Enable strict in tsconfig.'),
        W('@types', 'حزم أنواع المكتبات', 'packages with libraries’ types', 'Install @types/express.'),
        W('declaration file', 'ملف .d.ts فيه أنواع بس', 'a .d.ts file with types only', 'Write a declaration file for the old library.'),
        W('jsdoc types', 'أنواع مكتوبة في تعليقات JS', 'types written in JS comments', 'JSDoc types work in .js files.'),
        W('ts-check', 'تعليق بيفعّل الفحص في ملف JS', 'a comment enabling checks in a JS file', 'Add // @ts-check at the top.')
      ],
      read: [{ t: 'TypeScript: TSConfig reference', url: 'https://www.typescriptlang.org/tsconfig/', what: B('اقرا strict وmodule.', 'Read strict and module.') }, { t: 'TypeScript: JSDoc reference', url: 'https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html', what: B('اقرا @param و@typedef.', 'Read @param and @typedef.') }],
      challenge: B('حوّل قالب «مشروع أتمتة Node» (أسبوع 15) لـ TypeScript: tsconfig strict، src/*.ts، env.d.ts، scripts لـ start وtypecheck، وtsc --noEmit في GitHub Actions.', 'Convert the «Node automation project» template (week 15) to TypeScript: a strict tsconfig, src/*.ts, env.d.ts, start and typecheck scripts, and tsc --noEmit in GitHub Actions.'),
      quiz: [
        Q(B('noEmit معناه:', 'noEmit means:'), [['tsc يفحص بس من غير ملفات JS', 'tsc checks only, writing no JS files'], ['مفيش فحص', 'no checking'], ['مفيش تشغيل', 'no running']], 0, B('Node بيشغّل .ts.', 'Node runs .ts.')),
        Q(B('مكتبة ملهاش أنواع:', 'A package without types:'), [B('@types/… أو .d.ts', '@types/… or a .d.ts'), B('ارمي TS', 'drop TS'), B('any في كل حتة', 'any everywhere')], 0, B('declaration.', 'Declarations.')),
        Q(B('فحص ملف JS من غير تحويل:', 'Checking a JS file without converting:'), ['// @ts-check + JSDoc', 'as any', 'enum'], 0, B('تدريجي.', 'Gradual.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مشروع Node بـ TypeScript صارم.', 'A Node project in strict TypeScript.'),
      review: [
        B('الأنواع والاستنتاج، وtsc للفحص، وNode للتشغيل (type stripping).', 'Types and inference, tsc for checking, Node for running (type stripping).'),
        B('type وinterface والاختياري وreadonly والـ tuples وRecord.', 'type and interface, optional, readonly, tuples and Record.'),
        B('unions وliterals والتضييق وtype guards وdiscriminated unions.', 'Unions, literals, narrowing, type guards and discriminated unions.'),
        B('unknown مش any، وas نادرًا، وas const وsatisfies.', 'unknown not any, as rarely, as const and satisfies.'),
        B('tsconfig و@types والـ .d.ts والتحويل التدريجي بـ JSDoc.', 'tsconfig, @types, .d.ts files and gradual migration with JSDoc.')
      ],
      project: B('حوّل «بوابة الطلبات» (أسبوع 18) لـ TypeScript strict: أنواع لكل الأحداث كـ discriminated union، webhook body = unknown مع type guards، config بـ env.d.ts، statuses بـ as const، handlers بأنواع، ومفيش ولا any ولا as على بيانات برة — وtsc --noEmit وnode --test في CI، والتشغيل بـ node src/server.ts.', 'Convert the «orders gateway» (week 18) to strict TypeScript: all events as a discriminated union, the webhook body as unknown with type guards, config via env.d.ts, statuses via as const, typed handlers, and not a single any or as on outside data — with tsc --noEmit and node --test in CI, running with node src/server.ts.'),
      test: [
        Q(B('TypeScript بيمسك الأخطاء:', 'TypeScript catches mistakes:'), [['قبل التشغيل', 'before running'], ['بعد النشر', 'after deploying'], ['مبيمسكش', 'never']], 0, B('tsc.', 'tsc.')),
        Q(B('node main.ts فيه enum:', 'node main.ts containing an enum:'), [['بيفشل (مش erasable)', 'fails (not erasable)'], ['بيشتغل عادي', 'runs normally'], ['بيتجاهله', 'ignores it']], 0, B('type stripping.', 'Type stripping.')),
        Q(B('الأنواع تتكتب أكتر في:', 'Types are written mostly at:'), [['الحدود', 'the edges'], ['كل سطر', 'every line'], ['التعليقات', 'comments']], 0, B('والباقي inference.', 'Inference for the rest.')),
        Q(B('interface X extends Y:', 'interface X extends Y:'), [['X فيه كل اللي في Y وزيادة', 'X has all of Y and more'], ['X = Y', 'X equals Y'], ['خطأ', 'an error']], 0, B('امتداد.', 'Extension.')),
        Q(B('Record<string, number>:', 'Record<string, number>:'), [['مفاتيح نصوص وقيم أرقام', 'string keys, number values'], ['مصفوفة', 'an array'], ['tuple', 'a tuple']], 0, B('قاموس.', 'A dictionary.')),
        Q(B('"new" | "paid":', '"new" | "paid":'), ['literal union', 'string', 'any'], 0, B('قيم محددة.', 'Exact values.')),
        Q(B('دالة بترجع p is Card:', 'A function returning p is Card:'), ['type guard', 'assertion', 'enum'], 0, B('تضييق.', 'Narrowing.')),
        Q(B('حدث جديد مش متعالج:', 'A new unhandled event:'), [['never يمسكه في tsc', 'never catches it in tsc'], ['وقت التشغيل بس', 'only at run time'], ['مفيش', 'nothing']], 0, B('exhaustive.', 'Exhaustive.')),
        Q(B('unknown:', 'unknown:'), [['لازم تفحص قبل الاستخدام', 'must be checked before use'], ['زي any', 'same as any'], ['خطأ', 'an error']], 0, B('أأمن.', 'Safer.')),
        Q(B('as Order على رد API:', 'as Order on an API reply:'), [['مفيش فحص؛ خطر', 'no check; risky'], ['فحص كامل', 'a full check'], ['أسرع فحص', 'the fastest check']], 0, B('validate.', 'Validate.')),
        Q(B('satisfies:', 'satisfies:'), [['يفحص ويحتفظ بالنوع الدقيق', 'checks while keeping the precise type'], ['يحوّل لـ any', 'turns into any'], ['يشغّل الكود', 'runs the code']], 0, B('4.9+.', '4.9+.')),
        Q(B('فحص JS من غير تحويل:', 'Checking JS without converting:'), ['// @ts-check', 'tsc --emit', B('.d.ts بس', '.d.ts only')], 0, B('JSDoc.', 'JSDoc.'))
      ] }
  ]
};
