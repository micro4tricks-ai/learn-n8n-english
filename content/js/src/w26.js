// JavaScript week 26 — advanced TypeScript: generics and utility types.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const TS = { lang: 'ts' };
const T = { lang: 'text' };
const R = { node: 1, ts: 1 };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('TypeScript المتقدم: الأنواع العامة والمساعدة', 'Advanced TypeScript: generics and utility types'),
  goal: B('تكتب كود مرن وآمن في نفس الوقت: generics بقيود، والأنواع المساعدة (Partial وPick وOmit وReturnType)، وkeyof وtypeof والوصول بالفهرس، والـ mapped والـ conditional types، وأنواع مستنتجة من Zod، ونمط Result للأخطاء — وتبني عميل API كامل الأنواع.',
          'Write code that is flexible and safe at once: generics with constraints, utility types (Partial, Pick, Omit, ReturnType), keyof, typeof and indexed access, mapped and conditional types, types inferred from Zod, and the Result pattern for errors — and build a fully typed API client.'),
  days: [
    { title: B('الأنواع العامة', 'Generics'),
      goal: B('تكتب دالة واحدة تشتغل مع أي نوع من غير ما تضيّع الأمان.', 'Write one function that works with any type without losing safety.'),
      learn: [
        L(B('النوع كمعامل', 'A type as a parameter'),
          B('**generics**: الدالة بتاخد **type parameter** `<T>` زي ما بتاخد قيمة. `first<T>(list: T[]): T | undefined` بترجع نفس نوع العناصر — مش any. ومعظم الوقت tsc بيستنتج T من المعاملات لوحده.', '**generics**: a function takes a **type parameter** `<T>` just as it takes values. `first<T>(list: T[]): T | undefined` returns the same type as the elements — not any. Most of the time tsc infers T from the arguments by itself.'),
          'function first<T>(list: T[]): T | undefined { return list[0]; }\nfunction groupBy<T, K extends PropertyKey>(items: T[], key: (item: T) => K): Record<K, T[]> {\n  const out = {} as Record<K, T[]>;\n  for (const item of items) (out[key(item)] ??= []).push(item);\n  return out;\n}\ntype Order = { id: number; city: "Cairo" | "Giza"; total: number };\nconst orders: Order[] = [{ id: 1, city: "Cairo", total: 250 }, { id: 2, city: "Giza", total: 90 }, { id: 3, city: "Cairo", total: 40 }];\nconst o = first(orders);              // Order | undefined\nconst byCity = groupBy(orders, x => x.city);   // Record<"Cairo" | "Giza", Order[]>\nconsole.log(o?.id, Object.keys(byCity), byCity.Cairo.length);', R),
        L(B('القيود', 'Constraints'),
          B('**generic constraint** بـ `extends`: `<T extends { id: number }>` = أي نوع، بشرط يكون فيه id. كده تقدر تستخدم `item.id` جوه الدالة بأمان. ده بيخليك تكتب دوال عامة لـ «أي حاجة ليها id» أو «أي حاجة ليها createdAt».', 'A **generic constraint** with `extends`: `<T extends { id: number }>` = any type, provided it has an id. Then you can use `item.id` inside the function safely. This lets you write general functions for «anything with an id» or «anything with createdAt».'),
          'function indexById<T extends { id: number }>(items: T[]): Map<number, T> {\n  return new Map(items.map(i => [i.id, i]));\n}\nfunction latest<T extends { createdAt: string }>(items: T[]): T | undefined {\n  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];\n}\nconst customers = [{ id: 7, name: "Sara", createdAt: "2026-09-01" }, { id: 9, name: "Omar", createdAt: "2026-10-02" }];\nconsole.log(indexById(customers).get(7)?.name, latest(customers)?.name);\n// indexById([{ name: "x" }])   ← tsc: Property \'id\' is missing', R),
        L(B('أنواع عامة للكلاسات والدوال async', 'Generic classes and async functions'),
          B('نفس الفكرة في الكلاسات: كاش عام `TtlCache<V>`، أو طابور `Queue<Job>`. ومع async: `Promise<T>`. ده بيخلّي أدواتك (الكاش، retry، mapLimit) قابلة لإعادة الاستخدام في أي مشروع بأنواع صح.', 'The same idea in classes: a generic cache `TtlCache<V>`, or a queue `Queue<Job>`. With async: `Promise<T>`. This makes your tools (the cache, retry, mapLimit) reusable in any project with correct types.'),
          'class TtlCache<V> {\n  #items = new Map<string, { value: V; at: number }>();\n  constructor(private readonly ttlMs: number) {}\n  async get(key: string, load: () => Promise<V>): Promise<V> {\n    const hit = this.#items.get(key);\n    if (hit && Date.now() - hit.at < this.ttlMs) return hit.value;\n    const value = await load();\n    this.#items.set(key, { value, at: Date.now() });\n    return value;\n  }\n}', TS)
      ],
      practice: [
        B('اكتب uniqueBy<T> بتشيل التكرار بمفتاح.', 'Write uniqueBy<T> removing duplicates by a key.'),
        B('اكتب sumBy<T> بقيد إن الدالة ترجع رقم.', 'Write sumBy<T> where the selector returns a number.'),
        B('خلّي retry من أسبوع 13 generic.', 'Make the week 13 retry generic.'),
        B('شغّل TtlCache — وليه مبيشتغلش بـ node؟ (parameter property)', 'Run TtlCache — why does node refuse it? (a parameter property)')
      ],
      words: [
        W('generics', 'أنواع بتتبعت كمعاملات', 'types passed as parameters', 'Generics keep the element type.'),
        W('type parameter', 'المتغير <T> في الدالة', 'the <T> variable of a function', 'T is the type parameter.'),
        W('generic constraint', 'شرط على النوع العام بـ extends', 'a condition on a generic with extends', 'The generic constraint requires an id.'),
        W('propertykey', 'string أو number أو symbol', 'string, number or symbol', 'Keys extend PropertyKey.'),
        W('parameter property', 'تعريف خاصية جوه معاملات الـ constructor', 'declaring a property in constructor parameters', 'A parameter property is not erasable.')
      ],
      read: [{ lib: 'TypeScript Handbook', what: B('اقرا Generics.', 'Read Generics.') }],
      challenge: B('اكتب موديول `collections.ts` فيه groupBy وuniqueBy وsumBy وindexById وchunk<T> — كلها generic بقيود مناسبة — واستخدمه في 3 أماكن بأنواع مختلفة.', 'Write a `collections.ts` module with groupBy, uniqueBy, sumBy, indexById and chunk<T> — all generic with suitable constraints — and use it in 3 places with different types.'),
      quiz: [
        Q(B('first<T>(list: T[]) على Order[] بترجع:', 'first<T>(list: T[]) on Order[] returns:'), ['Order | undefined', 'any', 'unknown'], 0, B('نفس النوع.', 'The same type.')),
        Q(B('<T extends { id: number }>:', '<T extends { id: number }>:'), [['أي نوع فيه id رقم', 'any type with a numeric id'], ['النوع id بس', 'only the id type'], ['خطأ', 'an error']], 0, B('قيد.', 'A constraint.')),
        Q(B('tsc غالبًا بيعرف T:', 'tsc usually knows T:'), [['من المعاملات', 'from the arguments'], ['لازم تكتبه', 'you must write it'], ['مبيعرفش', 'never']], 0, B('inference.', 'Inference.'))
      ] },

    { title: B('الأنواع المساعدة', 'Utility types'),
      goal: B('تشتق أنواع جديدة من القديمة بدل ما تكررها.', 'Derive new types from existing ones instead of repeating them.'),
      learn: [
        L(B('Partial وRequired وPick وOmit', 'Partial, Required, Pick and Omit'),
          B('**utility type** = نوع جاهز بيحوّل نوع تاني. **partial** (كل الحقول اختيارية — مثالي لـ PATCH)، Required (العكس)، **pick** (خد حقول معينة)، **omit** (شيل حقول — زي id وcreatedAt عند الإنشاء)، Readonly. كده نوع واحد أساسي وكل الباقي مشتق منه — تعدّل مكان واحد.', 'A **utility type** = a ready-made type transforming another. **partial** (every field optional — perfect for PATCH), Required (the opposite), **pick** (take some fields), **omit** (drop fields — like id and createdAt on create), Readonly. One base type and everything else derived — you edit one place.'),
          'type Order = { id: number; customer: string; total: number; status: "new" | "paid"; createdAt: string };\ntype NewOrder = Omit<Order, "id" | "createdAt">;      // what POST /orders accepts\ntype OrderPatch = Partial<Pick<Order, "status" | "total">>;   // what PATCH accepts\ntype OrderRow = Pick<Order, "id" | "customer" | "total">;      // what the table shows\n\nlet nextId = 100;\nconst create = (o: NewOrder): Order => ({ ...o, id: ++nextId, createdAt: new Date().toISOString().slice(0, 10) });\nconst patch = (o: Order, p: OrderPatch): Order => ({ ...o, ...p });\nconst order = create({ customer: "Sara", total: 250, status: "new" });\nconsole.log(patch(order, { status: "paid" }));\nconst row: OrderRow = { id: order.id, customer: order.customer, total: order.total };\nconsole.log(row);', R),
        L(B('ReturnType وParameters وAwaited', 'ReturnType, Parameters and Awaited'),
          B('`ReturnType<typeof fn>` = نوع اللي الدالة بترجعه، و`Parameters<typeof fn>` = معاملاتها كـ tuple، و`Awaited<…>` = اللي جوه الـ Promise. مفيد لما الدالة هي «مصدر الحقيقة» (زي mapper) وعايز النوع من غير ما تكتبه مرتين. و**record type** `Record<K, V>` شفناه.', '`ReturnType<typeof fn>` = the type a function returns, `Parameters<typeof fn>` = its parameters as a tuple, and `Awaited<…>` = what is inside a promise. Useful when the function is the «source of truth» (like a mapper) and you want its type without writing it twice. And the **record type** `Record<K, V>` we have seen.'),
          'function toProduct(raw: { id: number; title: string; price: string }) {\n  return { sku: `P-${raw.id}`, name: raw.title.trim(), price: Number(raw.price) };\n}\ntype Product = ReturnType<typeof toProduct>;          // { sku: string; name: string; price: number }\nasync function loadProducts() { return [toProduct({ id: 1, title: " Pen ", price: "12.5" })]; }\ntype Loaded = Awaited<ReturnType<typeof loadProducts>>;   // Product[]\nconst list: Loaded = await loadProducts();\nconst p: Product = list[0];\nconsole.log(p.sku, p.name, p.price + 1);', R),
        L(B('اختيار المناسب', 'Choosing well'),
          B('القاعدة: نوع واحد أساسي للكيان (Order)، والباقي مشتق: إدخال (Omit)، تعديل (Partial + Pick)، عرض (Pick)، رد API (ممكن Readonly). ولو لقيت نفسك بتنسخ نفس الحقول في نوعين — اشتق واحد من التاني.', 'The rule: one base type per entity (Order), the rest derived: input (Omit), update (Partial + Pick), display (Pick), API reply (maybe Readonly). If you find yourself copying the same fields into two types — derive one from the other.'),
          'Order (base)\n ├─ NewOrder      = Omit<Order, "id" | "createdAt">\n ├─ OrderPatch    = Partial<Pick<Order, "status" | "total">>\n ├─ OrderRow      = Pick<Order, "id" | "customer" | "total">\n └─ OrderReply    = Readonly<Order>', T)
      ],
      practice: [
        B('اعمل NewCustomer وCustomerPatch من Customer.', 'Make NewCustomer and CustomerPatch from Customer.'),
        B('خد نوع mapper بـ ReturnType.', 'Get a mapper’s type with ReturnType.'),
        B('ضيف حقل لـ Order وشوف كل الأنواع المشتقة اتحدثت.', 'Add a field to Order and watch every derived type update.'),
        B('دوّر على نوعين منسوخين في مشروعك واشتق واحد.', 'Find two copied types in your project and derive one.')
      ],
      words: [
        W('utility type', 'نوع جاهز بيحوّل نوع تاني', 'a ready-made type transforming another', 'Omit is a utility type.'),
        W('partial', 'كل الحقول اختيارية', 'every field optional', 'PATCH bodies use Partial.'),
        W('pick', 'خد حقول معينة', 'take some fields', 'Pick the fields the table shows.'),
        W('omit', 'شيل حقول معينة', 'drop some fields', 'Omit id when creating.'),
        W('returntype', 'نوع اللي الدالة بترجعه', 'the type a function returns', 'ReturnType<typeof toProduct>.'),
        W('awaited', 'النوع اللي جوه Promise', 'the type inside a promise', 'Awaited unwraps the promise.')
      ],
      read: [{ t: 'TypeScript: Utility Types', url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html', what: B('لف على الكل.', 'Skim them all.') }],
      challenge: B('في «بوابة الطلبات» بالـ TS: نوع أساسي لكل كيان، وكل أنواع الإدخال والتعديل والعرض مشتقة بـ Omit/Partial/Pick — وامسح أي نوع منسوخ.', 'In the TS «orders gateway»: one base type per entity, and every input, update and display type derived with Omit/Partial/Pick — deleting any copied type.'),
      quiz: [
        Q(B('جسم PATCH:', 'A PATCH body:'), ['Partial<…>', 'Required<…>', 'Readonly<…>'], 0, B('اختياري.', 'Optional.')),
        Q(B('Omit<Order, "id">:', 'Omit<Order, "id">:'), [['Order من غير id', 'Order without id'], ['id بس', 'only id'], ['خطأ', 'an error']], 0, B('شيل.', 'Drop.')),
        Q(B('نوع نتيجة دالة من غير ما تكتبه:', 'A function’s result type without writing it:'), ['ReturnType<typeof fn>', 'typeof fn', 'keyof fn'], 0, B('مشتق.', 'Derived.'))
      ] },

    { title: B('keyof وtypeof والفهرسة', 'keyof, typeof and indexing'),
      goal: B('تستخرج أنواع من قيم وكائنات موجودة.', 'Extract types from existing values and objects.'),
      learn: [
        L(B('keyof', 'keyof'),
          B('**keyof** `Order` = union بأسماء الحقول (`"id" | "customer" | …`). مثالي لدالة `sortBy(list, key)` تقبل بس أسماء حقول حقيقية — المحرر يقترحها وtsc يرفض الغلط.', '**keyof** `Order` = a union of the field names (`"id" | "customer" | …`). Perfect for a `sortBy(list, key)` that accepts only real field names — the editor suggests them and tsc rejects mistakes.'),
          'type Order = { id: number; customer: string; total: number };\nfunction sortBy<T, K extends keyof T>(items: T[], key: K, dir: "asc" | "desc" = "asc"): T[] {\n  const s = dir === "asc" ? 1 : -1;\n  return [...items].sort((a, b) => (a[key] > b[key] ? s : a[key] < b[key] ? -s : 0));\n}\nconst orders: Order[] = [{ id: 2, customer: "Omar", total: 90 }, { id: 1, customer: "Sara", total: 250 }];\nconsole.log(sortBy(orders, "total", "desc").map(o => o.customer));\nconsole.log(sortBy(orders, "customer").map(o => o.id));\n// sortBy(orders, "price")   ← tsc: \'"price"\' is not assignable to \'keyof Order\'', R),
        L(B('typeof للأنواع', 'typeof for types'),
          B('**typeof operator** في مكان النوع بيجيب نوع قيمة موجودة: إعدادات، كائن ثابت، دالة. مع `as const` بيطلع أنواع literal دقيقة. ده بيخلّي القيمة هي مصدر الحقيقة والنوع يتولد منها.', 'The **typeof operator** in a type position gets the type of an existing value: settings, a constant object, a function. With `as const` you get precise literal types. The value becomes the source of truth and the type is generated from it.'),
          'const PLANS = {\n  basic: { price: 99, seats: 1 },\n  team: { price: 299, seats: 5 },\n  agency: { price: 899, seats: 20 },\n} as const;\ntype Plan = keyof typeof PLANS;                 // "basic" | "team" | "agency"\ntype PlanInfo = (typeof PLANS)[Plan];           // the union of the three objects\nfunction pricePerSeat(plan: Plan): number {\n  const p: PlanInfo = PLANS[plan];\n  return Math.round((p.price / p.seats) * 100) / 100;\n}\nfor (const plan of Object.keys(PLANS) as Plan[]) console.log(plan.padEnd(7), pricePerSeat(plan));', R),
        L(B('الوصول بالفهرس', 'Indexed access'),
          B('**indexed access type** `Order["status"]` = نوع الحقل ده بس، و`Order["items"][number]` = نوع عنصر واحد من مصفوفة جوه النوع. مفيد لما نوع كبير جاي من مكتبة أو من Zod وعايز جزء منه.', 'An **indexed access type** `Order["status"]` = the type of that one field, and `Order["items"][number]` = the type of one element of an array inside the type. Useful when a big type comes from a library or Zod and you want a part of it.'),
          'type ShopifyOrder = {\n  id: number;\n  financial_status: "pending" | "paid" | "refunded";\n  line_items: { sku: string; quantity: number; price: string }[];\n  customer: { email: string; tags: string };\n};\ntype FinancialStatus = ShopifyOrder["financial_status"];\ntype LineItem = ShopifyOrder["line_items"][number];\ntype CustomerEmail = ShopifyOrder["customer"]["email"];\nconst item: LineItem = { sku: "NB-A5", quantity: 2, price: "45.00" };\nconst status: FinancialStatus = "paid";\nconsole.log(status, item.sku, Number(item.price) * item.quantity);', R)
      ],
      practice: [
        B('اكتب pluck<T, K extends keyof T>.', 'Write pluck<T, K extends keyof T>.'),
        B('ولّد نوع من كائن إعدادات بـ typeof.', 'Generate a type from a settings object with typeof.'),
        B('خد نوع عنصر مصفوفة من نوع كبير.', 'Get an array element’s type from a big type.'),
        B('جرّب sortBy بحقل مش موجود.', 'Try sortBy with a missing field.')
      ],
      words: [
        W('keyof', 'union بأسماء حقول النوع', 'a union of a type’s field names', 'keyof Order lists its fields.'),
        W('typeof operator', 'جلب نوع قيمة موجودة', 'getting the type of an existing value', 'Use the typeof operator on PLANS.'),
        W('indexed access type', 'نوع حقل بالفهرس T["k"]', 'a field’s type by index, T["k"]', 'LineItem is an indexed access type.'),
        W('derived type', 'نوع متولد من قيمة أو نوع تاني', 'a type generated from a value or another type', 'Plan is a derived type.'),
        W('lookup type', 'اسم تاني للوصول بالفهرس', 'another name for indexed access', 'A lookup type reads one field’s type.')
      ],
      read: [{ t: 'TypeScript: Keyof Type Operator', url: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html', what: B('واقرا Typeof وIndexed Access بعدها.', 'Then read Typeof and Indexed Access.') }],
      challenge: B('اكتب جدول بيانات عام `renderTable<T>(rows: T[], columns: { key: keyof T; label: string; format?: (v) => string }[])` بيرفض أي عمود مش موجود، واستخدمه للطلبات والعملاء.', 'Write a generic data table `renderTable<T>(rows: T[], columns: { key: keyof T; label: string; format?: (v) => string }[])` rejecting any missing column, and use it for orders and customers.'),
      quiz: [
        Q(B('keyof { a: 1; b: 2 }:', 'keyof { a: 1; b: 2 }:'), ['"a" | "b"', '1 | 2', 'string'], 0, B('الأسماء.', 'The names.')),
        Q(B('نوع من قيمة موجودة:', 'A type from an existing value:'), ['typeof', 'keyof', 'infer'], 0, B('في مكان النوع.', 'In a type position.')),
        Q(B('Order["items"][number]:', 'Order["items"][number]:'), [['نوع عنصر واحد', 'one element’s type'], ['عدد العناصر', 'the element count'], ['مصفوفة', 'the array']], 0, B('indexed.', 'Indexed.'))
      ] },

    { title: B('mapped وconditional types', 'Mapped and conditional types'),
      goal: B('تفهم إزاي الأنواع المساعدة متعملة وتعمل بتوعك.', 'Understand how utility types are built and make your own.'),
      learn: [
        L(B('mapped types', 'Mapped types'),
          B('**mapped type** بيلف على مفاتيح نوع ويعمل نوع جديد: `{ [K in keyof T]?: T[K] }` = Partial بالظبط. تقدر تعمل `Nullable<T>` أو `Validators<T>` (دالة تحقق لكل حقل) أو نوع فورم (كل حقل نص).', 'A **mapped type** loops over a type’s keys and builds a new type: `{ [K in keyof T]?: T[K] }` = exactly Partial. You can make `Nullable<T>`, `Validators<T>` (a check function per field) or a form type (every field a string).'),
          'type Order = { customer: string; phone: string; qty: number };\ntype FormValues<T> = { [K in keyof T]: string };                     // raw inputs are text\ntype Validators<T> = { [K in keyof T]: (v: string) => string | null };  // null = valid\n\nconst rules: Validators<Order> = {\n  customer: v => (v.trim().length >= 2 ? null : "at least 2 characters"),\n  phone: v => (/^\\+?\\d{9,15}$/.test(v) ? null : "9–15 digits"),\n  qty: v => (Number.isInteger(Number(v)) && Number(v) > 0 ? null : "a whole number ≥ 1"),\n};\nfunction validate<T>(values: FormValues<T>, v: Validators<T>) {\n  const errors = {} as Partial<Record<keyof T, string>>;\n  for (const k of Object.keys(v) as (keyof T)[]) { const e = v[k](values[k]); if (e) errors[k] = e; }\n  return errors;\n}\nconsole.log(validate<Order>({ customer: "S", phone: "0100", qty: "2" }, rules));', R),
        L(B('conditional types', 'Conditional types'),
          B('**conditional type** = if للأنواع: `T extends string ? "text" : "other"`. ومع **infer** تستخرج جزء: `T extends Promise<infer U> ? U : T` (ده Awaited ببساطة). هتستخدمهم قليل في كودك — بس هتقراهم كتير في أنواع المكتبات.', 'A **conditional type** = an if for types: `T extends string ? "text" : "other"`. With **infer** you extract a part: `T extends Promise<infer U> ? U : T` (a simple Awaited). You will write them rarely — but read them often in library types.'),
          'type Unwrap<T> = T extends Promise<infer U> ? U : T;\ntype ElementOf<T> = T extends readonly (infer E)[] ? E : never;\ntype NonNullFields<T> = { [K in keyof T]-?: Exclude<T[K], null | undefined> };\n\ntype A = Unwrap<Promise<number>>;                 // number\ntype B = ElementOf<["paid", "new"]>;              // "paid" | "new"\ntype C = NonNullFields<{ email?: string | null; name: string }>;   // { email: string; name: string }', TS),
        L(B('template literal types', 'Template literal types'),
          B('**template literal type** بيبني أنواع نصوص: `` `order.${"paid" | "refunded"}` `` = `"order.paid" | "order.refunded"`. مثالي لأسماء الأحداث ومسارات الـ API ومفاتيح الإعدادات — tsc يرفض أي اسم غلط.', 'A **template literal type** builds string types: `` `order.${"paid" | "refunded"}` `` = `"order.paid" | "order.refunded"`. Perfect for event names, API paths and settings keys — tsc rejects any wrong name.'),
          'type Entity = "order" | "customer";\ntype Action = "created" | "updated" | "deleted";\ntype EventName = `${Entity}.${Action}`;          // 6 exact names\n\nconst handlers: Partial<Record<EventName, (id: number) => string>> = {\n  "order.created": id => `new order #${id}`,\n  "customer.deleted": id => `customer ${id} removed`,\n};\nfunction emit(name: EventName, id: number) { console.log(name.padEnd(17), "→", handlers[name]?.(id) ?? "(no handler)"); }\nemit("order.created", 101);\nemit("customer.deleted", 7);\nemit("order.updated", 102);\n// emit("order.shipped", 1)   ← tsc: not assignable to EventName', R)
      ],
      practice: [
        B('اكتب Nullable<T> بـ mapped type.', 'Write Nullable<T> with a mapped type.'),
        B('اعمل Validators لفورم عميل.', 'Build Validators for a customer form.'),
        B('اكتب نوع أسماء أحداث بـ template literal.', 'Write an event-name type with a template literal.'),
        B('اقرا تعريف Partial في lib.es5.d.ts.', 'Read Partial’s definition in lib.es5.d.ts.')
      ],
      words: [
        W('mapped type', 'نوع بيلف على مفاتيح نوع تاني', 'a type looping over another type’s keys', 'Partial is a mapped type.'),
        W('conditional type', 'if على مستوى الأنواع', 'an if at the type level', 'A conditional type picks the branch.'),
        W('infer', 'استخراج جزء من نوع جوه conditional', 'extracting part of a type inside a conditional', 'infer U unwraps the promise.'),
        W('template literal type', 'نوع نصي مبني من أنواع تانية', 'a string type built from other types', 'EventName is a template literal type.'),
        W('exclude', 'شيل أنواع من union', 'removing types from a union', 'Exclude<T, null> drops null.')
      ],
      read: [{ t: 'TypeScript: Mapped Types', url: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html', what: B('واقرا Conditional Types وTemplate Literal Types.', 'Then read Conditional Types and Template Literal Types.') }, { lib: 'Type Challenges', what: B('حل 5 تحديات easy.', 'Solve 5 easy challenges.') }],
      challenge: B('اعمل نظام أحداث صغير بأنواع: EventName بـ template literal، وPayloads<EventName> بـ mapped type، وon/emit بيرفضوا أي اسم أو payload غلط.', 'Build a small typed event system: EventName via a template literal, Payloads per EventName via a mapped type, and on/emit rejecting any wrong name or payload.'),
      quiz: [
        Q(B('{ [K in keyof T]?: T[K] } هو:', '{ [K in keyof T]?: T[K] } is:'), ['Partial<T>', 'Pick<T>', 'Omit<T>'], 0, B('mapped.', 'Mapped.')),
        Q(B('infer بيستخدم في:', 'infer is used inside:'), ['conditional types', 'interfaces', 'enums'], 0, B('استخراج.', 'Extraction.')),
        Q(B('`order.${"a" | "b"}`:', '`order.${"a" | "b"}`:'), ['"order.a" | "order.b"', 'string', 'never'], 0, B('template literal.', 'Template literal.'))
      ] },

    { title: B('Zod والـ Result وعميل API بأنواع', 'Zod, Result and a typed API client'),
      goal: B('تربط التحقق وقت التشغيل بالأنواع وتتعامل مع الأخطاء صراحة.', 'Connect run-time validation to types and handle errors explicitly.'),
      learn: [
        L(B('النوع من الـ schema', 'The type from the schema'),
          B('**z.infer**: اكتب schema بـ Zod مرة، وخد منه النوع: `type Order = z.infer<typeof OrderSchema>`. كده **schema inference** بيخلّي التحقق والنوع مستحيل يختلفوا — مصدر حقيقة واحد. ده الحل لمشكلة unknown من أسبوع 25.', '**z.infer**: write a Zod schema once and get the type from it: `type Order = z.infer<typeof OrderSchema>`. This **schema inference** means validation and type can never disagree — one source of truth. It solves the unknown problem from week 25.'),
          'import { z } from "zod";\n\nexport const OrderSchema = z.object({\n  id: z.number().int(),\n  customer: z.string().min(2),\n  status: z.enum(["new", "paid", "shipped"]),\n  items: z.array(z.object({ sku: z.string(), qty: z.number().int().positive() })),\n  note: z.string().optional(),\n});\nexport type Order = z.infer<typeof OrderSchema>;     // generated from the schema\n\nconst body: unknown = await req.json();\nconst order: Order = OrderSchema.parse(body);         // throws with details if invalid', TS),
        L(B('نمط Result', 'The Result pattern'),
          B('**result type**: بدل ما الدالة ترمي، ترجّع `{ ok: true, value }` أو `{ ok: false, error }` — discriminated union. اللي بينادي **مجبر** يتعامل مع الفشل (tsc مش هيسيبه يستخدم value من غير فحص). ممتاز لعمليات متوقع تفشل (تحقق، طلب API).', 'A **result type**: instead of throwing, a function returns `{ ok: true, value }` or `{ ok: false, error }` — a discriminated union. The caller is **forced** to handle failure (tsc will not let them use value without checking). Great for operations expected to fail (validation, API calls).'),
          'type Result<T, E = string> = { ok: true; value: T } | { ok: false; error: E };\nconst ok = <T>(value: T): Result<T, never> => ({ ok: true, value });\nconst err = <E>(error: E): Result<never, E> => ({ ok: false, error });\n\nfunction parseQty(input: string): Result<number> {\n  const n = Number(input.trim());\n  if (!Number.isInteger(n)) return err(`"${input}" is not a whole number`);\n  if (n < 1 || n > 100) return err(`quantity ${n} must be 1–100`);\n  return ok(n);\n}\nfor (const s of ["3", " 12 ", "2.5", "500"]) {\n  const r = parseQty(s);\n  console.log(JSON.stringify(s).padEnd(7), r.ok ? `✓ ${r.value}` : `✗ ${r.error}`);   // r.value only after r.ok\n}', R),
        L(B('عميل API كامل الأنواع', 'A fully typed API client'),
          B('**type-safe api client**: كل endpoint معرّف مرة (المسار، الطريقة، schema الرد)، والدالة generic: `api("getOrder", { id })` بترجع النوع الصح تلقائيًا، وبتتحقق من الرد وقت التشغيل. كده لو الـ API غيّر شكله، بتعرف فورًا برسالة واضحة.', 'A **type-safe api client**: each endpoint defined once (path, method, reply schema), and a generic function: `api("getOrder", { id })` returns the right type automatically and validates the reply at run time. If the API changes shape, you know immediately with a clear message.'),
          'const endpoints = {\n  getOrder: { method: "GET", path: (p: { id: number }) => `/orders/${p.id}`, reply: OrderSchema },\n  listOrders: { method: "GET", path: () => "/orders", reply: z.array(OrderSchema) },\n} as const;\ntype Endpoints = typeof endpoints;\n\nasync function api<N extends keyof Endpoints>(name: N, params: Parameters<Endpoints[N]["path"]>[0]): Promise<z.infer<Endpoints[N]["reply"]>> {\n  const ep = endpoints[name];\n  const res = await fetch(BASE + ep.path(params as never), { method: ep.method, signal: AbortSignal.timeout(8000) });\n  if (!res.ok) throw new HttpError(res.status, await res.text());\n  return ep.reply.parse(await res.json());          // run-time check matches the compile-time type\n}\nconst order = await api("getOrder", { id: 101 });    // typed as Order', TS)
      ],
      practice: [
        B('اكتب schema لـ Customer وخد النوع بـ z.infer.', 'Write a Customer schema and take its type with z.infer.'),
        B('حوّل دالة بترمي لـ Result.', 'Turn a throwing function into a Result.'),
        B('ضيف endpoint تالت للعميل.', 'Add a third endpoint to the client.'),
        B('غيّر شكل رد وهمي وشوف رسالة Zod.', 'Change a fake reply’s shape and read Zod’s message.')
      ],
      words: [
        W('z.infer', 'استخراج نوع TS من schema Zod', 'extracting a TS type from a Zod schema', 'type Order = z.infer<typeof OrderSchema>.'),
        W('schema inference', 'توليد الأنواع من الـ schema', 'generating types from the schema', 'Schema inference keeps them in sync.'),
        W('result type', 'نوع نجاح أو فشل بدل الرمي', 'a success-or-failure type instead of throwing', 'parseQty returns a result type.'),
        W('type-safe api client', 'عميل API أنواعه مضمونة', 'an API client with guaranteed types', 'The type-safe API client validates replies.'),
        W('single source of truth', 'تعريف واحد بيتولد منه الباقي', 'one definition everything else derives from', 'The schema is the single source of truth.')
      ],
      read: [{ lib: 'Zod', what: B('اقرا Type inference.', 'Read Type inference.') }, { lib: 'Total TypeScript: free tutorials', what: B('اقرا Zod tutorial.', 'Read the Zod tutorial.') }],
      challenge: B('اعمل عميل API بأنواع لـ DummyJSON (products، carts، users) بـ Zod schemas وz.infer وendpoints map وResult للأخطاء — ومفيش ولا as على الردود.', 'Build a typed API client for DummyJSON (products, carts, users) with Zod schemas, z.infer, an endpoints map and Result for errors — with no as on the replies.'),
      quiz: [
        Q(B('z.infer بيضمن:', 'z.infer guarantees:'), [['النوع والتحقق متطابقين', 'type and validation match'], ['سرعة', 'speed'], ['مفيش أخطاء خالص', 'no errors at all']], 0, B('مصدر واحد.', 'One source.')),
        Q(B('Result بدل throw ميزته:', 'Result instead of throw:'), [['اللي بينادي مجبر يتعامل مع الفشل', 'the caller must handle failure'], ['أسرع', 'faster'], ['أقصر دايمًا', 'always shorter']], 0, B('صريح.', 'Explicit.')),
        Q(B('API غيّر شكل الرد:', 'The API changed its reply shape:'), [['Zod يرمي برسالة واضحة', 'Zod throws a clear message'], ['tsc يعرف لوحده', 'tsc knows by itself'], ['محدش يعرف', 'nobody notices']], 0, B('وقت التشغيل.', 'At run time.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مكتبة أدوات بأنواع قوية تستخدمها في كل حاجة.', 'A strongly typed utility library you use everywhere.'),
      review: [
        B('generics وtype parameters والقيود بـ extends.', 'Generics, type parameters and constraints with extends.'),
        B('Partial وPick وOmit وReturnType وAwaited ونوع أساسي واحد.', 'Partial, Pick, Omit, ReturnType, Awaited and one base type.'),
        B('keyof وtypeof والوصول بالفهرس.', 'keyof, typeof and indexed access.'),
        B('mapped وconditional وtemplate literal types.', 'Mapped, conditional and template literal types.'),
        B('Zod وz.infer، ونمط Result، وعميل API كامل الأنواع.', 'Zod and z.infer, the Result pattern and a fully typed API client.')
      ],
      project: B('ابني `@you/automation-kit` بـ TypeScript strict: collections (groupBy، uniqueBy، sumBy، chunk، sortBy بـ keyof)، async (retry، mapLimit، withTimeout — generic)، TtlCache<V>، Result وok/err، وcreateApi(endpoints) بـ Zod — كل حاجة مختبرة بـ node:test، وtsc --noEmit في CI، وREADME بأمثلة — واستخدمها في مشروعين قدام.', 'Build `@you/automation-kit` in strict TypeScript: collections (groupBy, uniqueBy, sumBy, chunk, sortBy with keyof), async (retry, mapLimit, withTimeout — generic), TtlCache<V>, Result with ok/err, and createApi(endpoints) with Zod — everything tested with node:test, tsc --noEmit in CI, and a README with examples — then use it in two earlier projects.'),
      test: [
        Q(B('<T>(x: T): T:', '<T>(x: T): T:'), [['بترجع نفس النوع', 'returns the same type'], ['any', 'any'], ['unknown', 'unknown']], 0, B('generic.', 'Generic.')),
        Q(B('<T extends { id: number }>:', '<T extends { id: number }>:'), [['قيد', 'a constraint'], ['وراثة كلاس', 'class inheritance'], ['union', 'a union']], 0, B('شرط.', 'A condition.')),
        Q(B('نوع POST من غير id:', 'A POST type without id:'), ['Omit<Order, "id">', 'Pick<Order, "id">', 'Partial<Order>'], 0, B('شيل.', 'Drop.')),
        Q(B('Partial<Pick<Order, "status">>:', 'Partial<Pick<Order, "status">>:'), [['status اختياري بس', 'only status, optional'], ['كل Order', 'all of Order'], ['خطأ', 'an error']], 0, B('مركّب.', 'Combined.')),
        Q(B('Awaited<Promise<string[]>>:', 'Awaited<Promise<string[]>>:'), ['string[]', 'Promise<string[]>', 'string'], 0, B('اللي جوه.', 'What is inside.')),
        Q(B('K extends keyof T:', 'K extends keyof T:'), [['اسم حقل حقيقي من T', 'a real field name of T'], ['أي نص', 'any string'], ['رقم', 'a number']], 0, B('آمن.', 'Safe.')),
        Q(B('type Plan = keyof typeof PLANS:', 'type Plan = keyof typeof PLANS:'), [['أسماء مفاتيح الكائن', 'the object’s key names'], ['القيم', 'the values'], ['any', 'any']], 0, B('من القيمة.', 'From the value.')),
        Q(B('T["items"][number]:', 'T["items"][number]:'), [['نوع عنصر', 'an element type'], ['طول', 'a length'], ['index', 'an index']], 0, B('indexed.', 'Indexed.')),
        Q(B('{ [K in keyof T]: string }:', '{ [K in keyof T]: string }:'), ['mapped type', 'conditional type', 'tuple'], 0, B('لف على المفاتيح.', 'Loops over keys.')),
        Q(B('T extends Promise<infer U> ? U : T:', 'T extends Promise<infer U> ? U : T:'), [['بيفك الـ Promise', 'unwraps the promise'], ['بيعمل Promise', 'makes a promise'], ['خطأ', 'an error']], 0, B('conditional + infer.', 'Conditional + infer.')),
        Q(B('النوع من schema Zod:', 'The type from a Zod schema:'), ['z.infer<typeof S>', 'typeof S', 'S.type'], 0, B('متطابق.', 'In sync.')),
        Q(B('Result<T>:', 'Result<T>:'), [['{ ok: true, value } | { ok: false, error }', '{ ok: true, value } | { ok: false, error }'], ['Promise', 'a promise'], ['any', 'any']], 0, B('discriminated.', 'Discriminated.'))
      ] }
  ]
};
