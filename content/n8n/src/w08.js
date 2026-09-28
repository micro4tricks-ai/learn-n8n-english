// n8n week 8 — Data transformation and JavaScript basics (end of month 2).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('تحويل البيانات وأساسيات JavaScript', 'Data transformation and JavaScript basics'),
  goal: B('تحوّل البيانات من شكل لشكل بين أي نظامين: Edit Fields بعمق، وكل أوضاع Merge، ومقارنة مجموعتين، وجداول تحويل القيم، وأساسيات JavaScript اللي هتحتاجها في Code node.',
          'Reshape data between any two systems: Edit Fields in depth, every Merge mode, comparing two datasets, value-mapping tables, and the JavaScript basics you\'ll need in the Code node.'),
  days: [
    { title: B('Edit Fields بعمق', 'Edit Fields in depth'),
      goal: B('تبني الشكل اللي النظام التاني عايزه بالظبط بـ Edit Fields من غير كود.', 'Build exactly the shape the other system expects with Edit Fields, no code.'),
      learn: [
        { h: B('Keep Only Set ولا Include', 'Keep only set, or include'),
          p: B('Include Other Input Fields: لو مقفول، الـ item بيطلع فيه الحقول اللي عرّفتها بس (نظيف للـ API). لو مفتوح، بيضيف على الموجود.', 'Include Other Input Fields: when off, the item leaves with only the fields you defined (clean for an API). When on, it adds to the existing ones.'),
          ex: 'Input: {id, first, last, email, _raw, …}\nOutput (only set): {customer_id, full_name, email}' },
        { h: B('dot notation', 'Dot notation'),
          p: B('اسم حقل زي `customer.address.city` بيعمل object متداخل. ده أسهل طريقة تعمل body API متداخل من غير JSON يدوي.', 'A field name like `customer.address.city` creates a nested object. It\'s the easiest way to build a nested API body without hand-written JSON.'),
          ex: 'customer.name = {{ $json.first }} {{ $json.last }}\ncustomer.address.city = {{ $json.city }}\n→ { "customer": { "name": "…", "address": { "city": "…" } } }' },
        { h: B('الأنواع', 'Types'),
          p: B('لكل حقل نوع: String، Number، Boolean، Array، Object. اختار النوع الصح عشان "5" تبقى 5، و"true" تبقى true.', 'Each field has a type: String, Number, Boolean, Array, Object. Pick the right type so "5" becomes 5 and "true" becomes true.'),
          ex: 'qty (Number) = {{ $json.qty }}\nactive (Boolean) = {{ $json.status === "active" }}' }
      ],
      practice: [
        B('حوّل item فيه 12 حقل لـ 4 حقول بس بأسماء جديدة.', 'Turn an item with 12 fields into just 4 fields with new names.'),
        B('اعمل body متداخل (customer وitems) بـ dot notation.', 'Build a nested body (customer and items) with dot notation.'),
        B('ظبّط أنواع 4 حقول (Number، Boolean) واتأكد في JSON view.', 'Set the types of 4 fields (Number, Boolean) and check the JSON view.'),
        B('استخدم Rename Keys أو Edit Fields عشان تغيّر أسماء حقول لشكل API.', 'Use Rename Keys or Edit Fields to rename fields into an API\'s format.')
      ],
      words: [
        { t: 'dot notation', m: B('اسم حقل بنقط بيعمل object متداخل', 'a field name with dots that creates a nested object'), ex: 'customer.address.city' },
        { t: 'Include Other Input Fields', m: B('خيار في Edit Fields: تحتفظ بالحقول القديمة ولا لأ', 'an Edit Fields option: keep the old fields or not'), ex: 'Off → only your fields leave the node.' },
        { t: 'field type', m: B('نوع قيمة الحقل: نص، رقم، boolean…', 'the type of a field\'s value: text, number, boolean…'), ex: 'qty: Number' },
        { t: 'Rename Keys', m: B('node بتغيّر أسماء الحقول', 'a node that renames fields'), ex: 'first_name → firstName' },
        { t: 'output shape', m: B('شكل البيانات اللي خارجة من node', 'the shape of the data leaving a node'), ex: 'Match the output shape to the API docs.' }],
      read: ['lib:n8n Course: Level 2', 'lib:n8n Docs: Data structure'],
      challenge: B('خد order من شكل Shopify (أو أي شكل) وحوّله لشكل فاتورة API تاني بـ Edit Fields بس، وقارن النتيجة بمثال التوثيق.', 'Take an order in Shopify\'s shape (or any) and convert it to another API\'s invoice shape with Edit Fields only, then compare with the docs example.'),
      quiz: [
        { q: B('`address.city` في Edit Fields بيعمل:', '`address.city` in Edit Fields creates:'), o: [B('object address جواه city', 'an address object containing city'), B('حقل اسمه address.city بالنقطة', 'a field literally named "address.city"'), B('خطأ', 'an error')], a: 0, why: B('dot notation.', 'dot notation.') },
        { q: B('عايز item نظيف بالحقول اللي عرّفتها بس:', 'You want a clean item with only your fields:'), o: [B('اقفل Include Other Input Fields', 'turn off Include Other Input Fields'), B('افتحه', 'turn it on'), B('Code node إجباري', 'a Code node is required')], a: 0, why: B('بيشيل الباقي.', 'It drops the rest.') },
        { q: B('ليه تحدد النوع Number؟', 'Why set the type to Number?'), o: [B('عشان "5" تبقى رقم 5', 'so "5" becomes the number 5'), B('للشكل', 'for looks'), B('مش مهم', 'it doesn\'t matter')], a: 0, why: B('APIs كتير بترفض نص مكان رقم.', 'Many APIs reject text where a number is expected.') }
      ] },

    { title: B('Merge بكل أوضاعه', 'Merge in every mode'),
      goal: B('تختار وضع Merge الصح: تلزق، أو تطابق، أو بالترتيب، أو SQL، أو تختار فرع.', 'Choose the right Merge mode: append, match, by position, SQL, or choose a branch.'),
      learn: [
        { h: B('الأوضاع', 'The modes'),
          p: B('Append = حط الاتنين ورا بعض. Combine by Matching Fields = اربط بحقل مشترك (زي JOIN). Combine by Position = الأول مع الأول. All Possible Combinations = كل واحد مع كل واحد. SQL Query = اكتب SQL على المدخلين. Choose Branch = استنى الاتنين وطلّع واحد.', 'Append = put both one after the other. Combine by Matching Fields = link by a shared field (like a JOIN). Combine by Position = first with first. All Possible Combinations = every pair. SQL Query = write SQL over both inputs. Choose Branch = wait for both, output one.'),
          ex: 'Customers (input 1) + Orders (input 2)\nCombine by Matching Fields: customer.id = order.customer_id' },
        { h: B('Keep Matches ولا كله', 'Keep matches or everything'),
          p: B('في Matching Fields تختار: Keep Matches (اللي ليه شريك بس)، Keep Non-Matches، أو Keep Everything. زي INNER وLEFT JOIN.', 'With matching fields you choose: Keep Matches (only pairs), Keep Non-Matches, or Keep Everything — like INNER and LEFT JOIN.'),
          ex: 'Customers without orders → Keep Non-Matches (input 1)' },
        { h: B('Choose Branch للانتظار', 'Choose Branch for waiting'),
          p: B('لو عندك فرعين بيشتغلوا وعايز تكمّل بعد ما الاتنين يخلصوا، Merge بـ Choose Branch بيستنى الاتنين ويطلّع بيانات فرع واحد.', 'If two branches run and you want to continue only after both finish, Merge in Choose Branch mode waits for both and outputs one branch\'s data.'),
          ex: 'Send email ─┐\n            ├─ Merge (Choose Branch: input 1) → Log done\nUpdate CRM ─┘' }
      ],
      practice: [
        B('اربط عملاء بطلباتهم بـ Matching Fields.', 'Link customers to their orders with Matching Fields.'),
        B('طلّع العملاء اللي مالهمش طلبات.', 'Find the customers with no orders.'),
        B('جرّب Combine by Position على قايمتين بنفس الترتيب.', 'Try Combine by Position on two lists in the same order.'),
        B('جرّب SQL Query mode: `SELECT * FROM input1 JOIN input2 ON …`.', 'Try the SQL Query mode: `SELECT * FROM input1 JOIN input2 ON …`.')
      ],
      words: [
        { t: 'Append (Merge)', m: B('وضع Merge بيحط المدخلين ورا بعض', 'a Merge mode that stacks both inputs'), ex: 'Leads from 2 forms → one list' },
        { t: 'Combine by Position', m: B('يربط أول item بأول item وهكذا', 'links the first item with the first, and so on'), ex: 'Names list + scores list' },
        { t: 'SQL Query (Merge)', m: B('وضع Merge بتكتب فيه SQL على المدخلين', 'a Merge mode where you write SQL over both inputs'), ex: 'SELECT * FROM input1 LEFT JOIN input2 …' },
        { t: 'Choose Branch', m: B('يستنى الفرعين ويطلّع بيانات واحد فيهم', 'waits for both branches and outputs one of them'), ex: 'Continue after both steps finish.' },
        { t: 'Keep Non-Matches', m: B('يطلّع اللي ملهوش شريك في المدخل التاني', 'outputs items with no partner in the other input'), ex: 'Customers without orders' }],
      read: ['lib:n8n Docs: Merging data'],
      challenge: B('اعمل «CRM sync check»: عملاء من Sheet وعملاء من API، وطلّع 3 قوايم: موجودين في الاتنين، في الشيت بس، في الـ API بس.', 'Build a "CRM sync check": customers from a sheet and from an API, producing 3 lists: in both, only in the sheet, only in the API.'),
      quiz: [
        { q: B('تربط طلبات بعملائها بـ customer_id:', 'Link orders to customers by customer_id:'), o: ['Combine by Matching Fields', 'Append', 'Choose Branch'], a: 0, why: B('زي JOIN.', 'Like a JOIN.') },
        { q: B('العملاء اللي مالهمش طلبات:', 'Customers without orders:'), o: ['Keep Non-Matches', 'Keep Matches', 'Append'], a: 0, why: B('اللي ملهمش شريك.', 'Those without a partner.') },
        { q: B('تكمّل بعد ما فرعين يخلصوا:', 'Continue after two branches finish:'), o: ['Merge: Choose Branch', 'Wait', 'IF'], a: 0, why: B('بيستنى الاتنين.', 'It waits for both.') }
      ] },

    { title: B('أساسيات JavaScript لـ n8n', 'JavaScript basics for n8n'),
      goal: B('تكتب JavaScript بسيط سليم: متغيّرات، وobjects، وarrays، وشروط، ودوال.', 'Write simple, correct JavaScript: variables, objects, arrays, conditions and functions.'),
      learn: [
        { h: B('const وlet', 'const and let'),
          p: B('`const` لقيمة مش هتتغيّر (الأغلب)، و`let` لقيمة هتتغيّر (عداد). متستخدمش `var`. وكل سطر يخلص بـ ;.', '`const` for a value that won\'t change (most of the time), `let` for one that will (a counter). Don\'t use `var`. End statements with ;.'),
          ex: 'const taxRate = 0.14;\nlet total = 0;\nfor (const item of items) { total += item.price; }' },
        { h: B('objects وdestructuring', 'Objects and destructuring'),
          p: B('object = مفاتيح وقيم `{ name: "Ali", age: 30 }`. destructuring بيطلّع قيم في سطر: `const { name, email } = customer;`.', 'An object = keys and values `{ name: "Ali", age: 30 }`. Destructuring pulls out values in one line: `const { name, email } = customer;`.'),
          ex: 'const { name, address: { city } } = $json;\nreturn { json: { name, city } };' },
        { h: B('الشروط والدوال', 'Conditions and functions'),
          p: B('`if (…) { } else { }`، و`===` للمقارنة (مش ==)، و`typeof x === "string"`. والدالة: `function net(p) { return p * 0.86; }` أو `const net = p => p * 0.86;`.', '`if (…) { } else { }`, `===` to compare (not ==), `typeof x === "string"`. A function: `function net(p) { return p * 0.86; }` or `const net = p => p * 0.86;`.'),
          ex: 'if (typeof $json.qty !== "number") { throw new Error("qty must be a number"); }' }
      ],
      practice: [
        B('حل 5 تمارين JavaScript صغيرة على Exercism أو javascript.info.', 'Solve 5 small JavaScript exercises on Exercism or javascript.info.'),
        B('اكتب دالة بتحسب الإجمالي بعد الخصم والضريبة.', 'Write a function that calculates the total after discount and tax.'),
        B('استخدم destructuring في Code node عشان تطلّع 3 حقول.', 'Use destructuring in a Code node to extract 3 fields.'),
        B('اكتب if/else بيصنّف العملاء لـ 3 شرايح حسب المبلغ.', 'Write if/else that sorts customers into 3 tiers by amount.')
      ],
      words: ['const / let', 'destructuring', 'throw',
        { t: 'strict equality (===)', m: B('مقارنة بالقيمة والنوع مع بعض', 'comparison of both value and type'), ex: '"5" === 5 → false' },
        { t: 'typeof', m: B('بيقولك نوع القيمة', 'tells you the type of a value'), ex: 'typeof 42 → "number"' }],
      read: ['lib:The Modern JavaScript Tutorial', 'lib:Exercism: JavaScript'],
      challenge: B('اكتب في Code node دالة `normalizeCustomer(raw)` بتنضّف اسم وإيميل وتليفون وترجّع object موحّد، واختبرها على 5 عملاء متلخبطين.', 'Write a Code-node function `normalizeCustomer(raw)` that cleans a name, email and phone and returns a uniform object; test it on 5 messy customers.'),
      quiz: [
        { q: B('`"5" === 5`:', '`"5" === 5`:'), o: ['false', 'true', 'error'], a: 0, why: B('النوع مختلف.', 'Different types.') },
        { q: B('لقيمة مش هتتغيّر:', 'For a value that won\'t change:'), o: ['const', 'let', 'var'], a: 0, why: B('const.', 'const.') },
        { q: B('`const { city } = address;` بيعمل:', '`const { city } = address;`:'), o: [B('يطلّع city من address', 'pulls city out of address'), B('يمسح city', 'deletes city'), B('يعمل address جديد', 'creates a new address')], a: 0, why: B('destructuring.', 'destructuring.') }
      ] },

    { title: B('مقارنة البيانات وتنضيفها', 'Comparing and cleaning data'),
      goal: B('تقارن مجموعتين وتعرف الجديد والمتغيّر والمحذوف، وتنضّف التكرار والقيم الغلط.', 'Compare two datasets to find new, changed and removed items, and clean duplicates and bad values.'),
      learn: [
        { h: B('Compare Datasets', 'Compare Datasets'),
          p: B('بياخد مدخلين وحقل مطابقة، ويطلّع 4 مخارج: In A only، Same، Different، In B only. مثالي للمزامنة: الجديد تضيفه، والمتغيّر تحدّثه، والمحذوف تعلّم عليه.', 'It takes two inputs and a match field and gives 4 outputs: In A only, Same, Different, In B only. Perfect for syncing: add the new, update the changed, flag the removed.'),
          ex: 'A = products in the shop, B = products in the sheet\nIn A only → add to sheet\nDifferent → update sheet\nIn B only → mark discontinued' },
        { h: B('التنضيف', 'Cleaning'),
          p: B('قبل المقارنة وحّد الشكل: trim، lowercase للإيميلات، أرقام تليفون بنفس الصيغة، تواريخ ISO. وإلا "Ali@X.com" و"ali@x.com" هيبانوا مختلفين.', 'Before comparing, normalise: trim, lowercase emails, phone numbers in one format, ISO dates. Otherwise "Ali@X.com" and "ali@x.com" look different.'),
          ex: 'email: {{ $json.email.trim().toLowerCase() }}\nphone: {{ $json.phone.replace(/\\D/g, "") }}' },
        { h: B('Limit وSort في الآخر', 'Limit and Sort at the end'),
          p: B('Sort عشان الترتيب (الأحدث الأول)، وLimit عشان تاخد أول N (أعلى 10). وRemove Duplicates بحقل معين بعد التنضيف.', 'Sort for order (newest first), Limit to take the first N (top 10), and Remove Duplicates on a field after cleaning.'),
          ex: 'Sort by total desc → Limit 10 → top customers' }
      ],
      practice: [
        B('قارن قايمتين منتجات بـ Compare Datasets ووجّه كل مخرج لخطوة.', 'Compare two product lists with Compare Datasets and route each output to a step.'),
        B('وحّد إيميلات وتليفونات قبل المقارنة وشوف الفرق في النتيجة.', 'Normalise emails and phones before comparing and see the difference in the result.'),
        B('طلّع أعلى 5 عملاء بـ Sort وLimit.', 'Get the top 5 customers with Sort and Limit.'),
        B('شيل التكرار بالإيميل بعد التنضيف.', 'Remove duplicates by email after cleaning.')
      ],
      words: ['Compare Datasets',
        { t: 'In A only / In B only', m: B('مخارج Compare Datasets للي موجود في مصدر واحد بس', 'Compare Datasets outputs for items found in only one source'), ex: 'In A only → new products' },
        { t: 'normalization (data)', m: B('توحيد شكل البيانات قبل المقارنة', 'making data consistent before comparing'), ex: 'trim + lowercase emails' },
        { t: 'sync (two-way)', m: B('مزامنة: التغيير في مكان يوصل للتاني', 'syncing: a change in one place reaches the other'), ex: 'Shop ↔ sheet' },
        { t: 'top N', m: B('أعلى N عناصر بعد الترتيب', 'the top N items after sorting'), ex: 'Sort desc → Limit 10' }],
      read: ['lib:n8n Docs: Data transformation functions'],
      challenge: B('اعمل «inventory sync»: كل ساعة يقارن المنتجات في Sheet مع API، ويضيف الجديد، ويحدّث المتغيّر، ويعلّم المحذوف، ويبعت ملخص بالأعداد.', 'Build an "inventory sync": every hour it compares products in a sheet with an API, adds new ones, updates changed ones, flags removed ones, and sends a summary with counts.'),
      quiz: [
        { q: B('المنتجات اللي اتغيّر سعرها بتطلع في:', 'Products whose price changed come out of:'), o: ['Different', 'Same', 'In A only'], a: 0, why: B('نفس المفتاح، قيم مختلفة.', 'Same key, different values.') },
        { q: B('ليه تنضّف الإيميلات قبل المقارنة؟', 'Why clean emails before comparing?'), o: [B('عشان الحروف الكبيرة والمسافات متخليهاش تبان مختلفة', 'so case and spaces don\'t make them look different'), B('للأمان', 'for security'), B('مش لازم', 'no need')], a: 0, why: B('normalization.', 'normalisation.') },
        { q: B('أعلى 10:', 'Top 10:'), o: ['Sort desc → Limit 10', 'Limit 10 → Sort', 'Merge'], a: 0, why: B('رتّب الأول.', 'Sort first.') }
      ] },

    { title: B('جداول التحويل بين الأنظمة', 'Mapping tables between systems'),
      goal: B('تحوّل قيم بين نظامين (حالات، عملات، وحدات) بجدول تحويل بدل IF كتير.', 'Translate values between two systems (statuses, currencies, units) with a mapping table instead of many IFs.'),
      learn: [
        { h: B('lookup object', 'A lookup object'),
          p: B('بدل 6 IF: object بيربط قيمة بقيمة: `{"paid":"PAID","pending":"OPEN"}[$json.status] ?? "UNKNOWN"`. أسهل تعدّله وتقراه.', 'Instead of 6 IFs, an object that maps value to value: `{"paid":"PAID","pending":"OPEN"}[$json.status] ?? "UNKNOWN"`. Easier to read and change.'),
          ex: '{{ ({ "1": "Cairo", "2": "Alexandria", "3": "Giza" })[$json.city_code] ?? "Other" }}' },
        { h: B('جدول في Sheet', 'A table in a sheet'),
          p: B('لو التحويل كبير أو بيتغيّر (أسماء منتجات، أكواد)، خليه في Sheet: اقراه مرة، واربطه بـ Merge (Matching Fields). العميل يعدّل من غير ما يلمس الـ workflow.', 'If the mapping is large or changes (product names, codes), keep it in a sheet: read it once and link with Merge (Matching Fields). The client can edit it without touching the workflow.'),
          ex: 'Sheet "mapping": shop_sku | erp_code\nMerge by shop_sku → erp_code' },
        { h: B('الأرقام والعملات', 'Numbers and currencies'),
          p: B('`Number(x).toLocaleString("en-US", { style: "currency", currency: "USD" })` بيطلع $1,234.50. والوحدات: حوّل مرة واحدة ووحّد (grams، cents).', '`Number(x).toLocaleString("en-US", { style: "currency", currency: "USD" })` gives $1,234.50. For units: convert once and standardise (grams, cents).'),
          ex: 'price_cents = {{ Math.round($json.price * 100) }}' }
      ],
      practice: [
        B('بدّل سلسلة IF بـ lookup object لحالات الطلب.', 'Replace an IF chain with a lookup object for order statuses.'),
        B('اعمل mapping sheet لـ 10 منتجات واربطه بـ Merge.', 'Build a mapping sheet for 10 products and join it with Merge.'),
        B('نسّق 5 مبالغ بعملات مختلفة بـ toLocaleString.', 'Format 5 amounts in different currencies with toLocaleString.'),
        B('حوّل أسعار لـ cents وارجعها بدقة.', 'Convert prices to cents and back without losing precision.')
      ],
      words: [
        { t: 'lookup object', m: B('object بيحوّل قيمة لقيمة تانية', 'an object that turns one value into another'), ex: '{ paid: "PAID" }[status]' },
        { t: 'mapping table', m: B('جدول بيربط قيم نظام بقيم نظام تاني', 'a table linking one system\'s values to another\'s'), ex: 'shop_sku → erp_code' },
        { t: 'toLocaleString()', m: B('بينسّق الأرقام والعملات حسب البلد', 'formats numbers and currencies by locale'), ex: '1234.5 → "$1,234.50"' },
        { t: 'cents (minor units)', m: B('تخزين الفلوس كأرقام صحيحة بأصغر وحدة', 'storing money as whole numbers of the smallest unit'), ex: '12.99 → 1299' },
        { t: 'source of truth', m: B('المكان الوحيد اللي بيانته هي المرجع', 'the one place whose data is the reference'), ex: 'The ERP is the source of truth for stock.' }],
      read: ['lib:MDN JavaScript Guide'],
      challenge: B('اعمل «order translator»: order من متجر بيتحوّل لشكل نظام محاسبة: حالات بـ lookup، ومنتجات بـ mapping sheet، وأسعار بالـ cents، وعملة منسقة في الإيميل.', 'Build an "order translator": a shop order converted to an accounting system\'s format — statuses via lookup, products via a mapping sheet, prices in cents, and a formatted currency in the email.'),
      quiz: [
        { q: B('بدل 8 IF لتحويل قيم:', 'Instead of 8 IFs to translate values:'), o: ['a lookup object', 'more IFs', 'a Wait'], a: 0, why: B('أوضح وأسهل.', 'Clearer and simpler.') },
        { q: B('ليه الفلوس بالـ cents؟', 'Why money in cents?'), o: [B('تتجنب أخطاء الكسور العشرية', 'to avoid decimal rounding errors'), B('أرخص', 'cheaper'), B('أسرع', 'faster')], a: 0, why: B('0.1 + 0.2 ≠ 0.3 في الكمبيوتر.', '0.1 + 0.2 ≠ 0.3 in floating point.') },
        { q: B('mapping في Sheet أحسن لما:', 'A mapping in a sheet is better when:'), o: [B('كبير أو بيتغيّر', 'it is large or changes'), B('قيمتين بس', 'there are only two values'), B('سري', 'it is secret')], a: 0, why: B('العميل يعدّله بنفسه.', 'The client can edit it.') }
      ] },

    { title: B('مراجعة الشهر التاني والاختبار', 'Month 2 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 9 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 9 opens when you score 70% or more.'),
      review: [
        B('Sheets وGmail وTelegram بعمق (الأسبوع 5).', 'Sheets, Gmail and Telegram in depth (week 5).'),
        B('الـ APIs والمصادقة والأخطاء والـ bodies (الأسبوع 6).', 'APIs, authentication, errors and bodies (week 6).'),
        B('بناء APIs صغيرة وتأمينها وتوثيقها (الأسبوع 7).', 'Building, securing and documenting small APIs (week 7).'),
        B('Edit Fields وMerge وCompare Datasets وجداول التحويل وJavaScript (الأسبوع 8).', 'Edit Fields, Merge, Compare Datasets, mapping tables and JavaScript (week 8).')
      ],
      project: B('مشروع الشهر: «مزامنة متجر ↔ محاسبة»: API المتجر (أو محاكاة بـ Sheet) بيتقارن كل ساعة مع نظام تاني، والطلبات الجديدة بتتحوّل (حالات وأكواد وأسعار) وتتبعت بـ API محمي، والأخطاء المؤقتة بتتعاد، والمشاكل الدائمة بتوصلك Telegram بزرار «Retry»، وملخص يومي بالإيميل. كل حاجة في Git بتوثيق كامل.',
                 'Month project: "shop ↔ accounting sync": the shop API (or a sheet simulation) is compared hourly with another system; new orders are translated (statuses, codes, prices) and sent through a protected API; transient errors are retried; permanent problems reach you on Telegram with a "Retry" button; and a daily summary arrives by email. Everything is in Git with full documentation.'),
      test: [
        { q: B('Append or Update في Sheets بيحتاج:', 'Append or Update in Sheets needs:'), o: ['Column to match on', 'Wait', 'Merge'], a: 0, why: B('عشان يلاقي الصف.', 'To find the row.') },
        { q: B('مرفق Gmail لازم يكون:', 'A Gmail attachment must be:'), o: ['binary data', 'a URL string', 'JSON'], a: 0, why: B('binary property.', 'A binary property.') },
        { q: B('زرار inline لما يتداس بيبعت:', 'A pressed inline button sends:'), o: ['callback_query', 'photo', 'location'], a: 0, why: B('فيه الـ callback data.', 'With the callback data.') },
        { q: B('API key مكانه:', 'An API key belongs in:'), o: ['a credential', B('header مكتوب يدوي', 'a hand-typed header'), B('اسم الـ workflow', 'the workflow name')], a: 0, why: B('مشفّر.', 'Encrypted.') },
        { q: B('خطأ 503 من API:', 'A 503 from an API:'), o: [B('retry بعد شوية', 'retry after a while'), B('صلّح الـ body', 'fix the body'), B('غيّر المفتاح', 'change the key')], a: 0, why: B('مؤقت.', 'Temporary.') },
        { q: B('path parameter `/orders/:id` بيوصل في:', 'The path parameter in `/orders/:id` arrives in:'), o: ['$json.params.id', '$json.query.id', '$json.id'], a: 0, why: B('params.', 'params.') },
        { q: B('الخدمة بعتت نفس الحدث مرتين. الحل:', 'The service sent the same event twice. The fix:'), o: [B('event ID + تجاهل المكرر', 'event ID + skip repeats'), B('تمسح الحدثين', 'delete both'), B('تبعت 500', 'reply 500')], a: 0, why: B('idempotency.', 'idempotency.') },
        { q: B('dot notation في Edit Fields:', 'Dot notation in Edit Fields:'), o: [B('بتعمل objects متداخلة', 'builds nested objects'), B('بتقرّب أرقام', 'rounds numbers'), B('بتمسح حقول', 'deletes fields')], a: 0, why: B('a.b.c.', 'a.b.c.') },
        { q: B('تربط عملاء بطلبات:', 'Join customers to orders:'), o: ['Merge: Combine by Matching Fields', 'Merge: Append', 'Wait'], a: 0, why: B('JOIN بحقل.', 'A JOIN on a field.') },
        { q: B('Compare Datasets مخرج «Different» معناه:', 'The Compare Datasets output "Different" means:'), o: [B('نفس المفتاح وقيم متغيّرة', 'same key, changed values'), B('جديد', 'new'), B('محذوف', 'removed')], a: 0, why: B('للتحديث.', 'For updates.') },
        { q: B('`"5" === 5` في JavaScript:', '`"5" === 5` in JavaScript:'), o: ['false', 'true', 'undefined'], a: 0, why: B('نوع مختلف.', 'Different type.') },
        { q: B('تحويل حالات بين نظامين بشكل نظيف:', 'Translate statuses between systems cleanly with:'), o: ['a lookup object', 'ten IF nodes', 'a Wait node'], a: 0, why: B('جدول تحويل.', 'A mapping table.') }
      ] }
  ]
};
