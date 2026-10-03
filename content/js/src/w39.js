// JavaScript week 39 — Custom n8n nodes in TypeScript.
// Node and credential classes are shown (they need n8n-workflow and an n8n instance); declarative routing,
// a fake execute() context, node tests and a package.json checker run in Node with built-ins.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
const FAKE_CTX = 'export function fakeContext(items, params, { failOn, continueOnFail = false } = {}) {\n  return {\n    getInputData: () => items.map(json => ({ json })),\n    getNodeParameter: (name, i) => (typeof params[name] === "function" ? params[name](items[i], i) : params[name]),\n    getNode: () => ({ name: "Shop" }),\n    continueOnFail: () => continueOnFail,\n    helpers: {\n      httpRequestWithAuthentication: async (cred, opts) => {\n        if (failOn && opts.url.includes(failOn)) { const e = new Error("404 Not Found"); e.httpCode = "404"; throw e; }\n        return { id: Number(opts.url.split("/").pop()), status: "shipped", via: cred };\n      },\n    },\n  };\n}\nexport class NodeOperationError extends Error {\n  constructor(node, error, { itemIndex } = {}) { super(`[${node.name}] item ${itemIndex}: ${error.message ?? error}`); }\n}\n';
const EXECUTE = 'export async function execute() {\n  const items = this.getInputData();\n  const out = [];\n  for (let i = 0; i < items.length; i++) {\n    try {\n      const orderId = this.getNodeParameter("orderId", i);\n      const order = await this.helpers.httpRequestWithAuthentication("shopApi", { method: "GET", url: `https://api.example-shop.com/orders/${orderId}` });\n      out.push({ json: order, pairedItem: { item: i } });\n    } catch (error) {\n      if (this.continueOnFail()) { out.push({ json: { error: error.message }, pairedItem: { item: i } }); continue; }\n      throw new this.NodeOperationError(this.getNode(), error, { itemIndex: i });\n    }\n  }\n  return [out];\n}\n';
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('نودز n8n مخصصة بـ TypeScript', 'Custom n8n nodes in TypeScript'),
  goal: B('تبني نودز n8n بتاعتك بـ TypeScript: تفهم تشريح النود والـ credentials، تكتب نود declarative لـ REST API في سطور قليلة، ونود programmatic بـ execute() للمنطق المعقد، تختبرها وتشغّلها محليًا، وتنشرها كـ community node على npm.',
          'Build your own n8n nodes in TypeScript: understand node and credential anatomy, write a declarative node for a REST API in a few lines and a programmatic node with execute() for complex logic, test and run them locally, and publish them as a community node on npm.'),
  days: [
    { title: B('تشريح النود', 'Node anatomy'),
      goal: B('تعرف كل ملف وكل حقل.', 'Know every file and field.'),
      learn: [
        L(B('ليه نود مخصص', 'Why a custom node'),
          B('**custom node** بيستاهل لما: API بتستخدمه كتير ومفيش نود ليه، أو منطق متكرر في Code nodes كتير، أو منتج عايز تديه لعملاء n8n. ولو نشرته على npm بيبقى **community node** أي حد يثبّته. ابدأ من **n8n-nodes-starter** (أو أداة الإنشاء الرسمية) — فيها الهيكل والـ linter.', 'A **custom node** is worth it when: you use an API a lot and it has no node, logic repeats across many Code nodes, or you have a product to give n8n users. Published on npm it becomes a **community node** anyone can install. Start from **n8n-nodes-starter** (or the official scaffolding tool) — it has the structure and the linter.'),
          'n8n-nodes-shop/\n  package.json                 name: n8n-nodes-shop · keywords: ["n8n-community-node-package"] · "n8n": { nodes, credentials }\n  credentials/\n    ShopApi.credentials.ts     how to authenticate (API key, OAuth2)\n  nodes/Shop/\n    Shop.node.ts               the node class: description + (routing or execute)\n    shop.svg                   the icon\n  tsconfig.json · eslint config (n8n node linter)\n\nnpm run build → dist/  ·  npm run dev → local n8n with your node loaded', T),
        L(B('وصف النود', 'The node description'),
          B('كل نود كلاس بيطبّق **inodetype** وفيه **node description**: الاسم الظاهر، الاسم الداخلي، الأيقونة، الإصدار، الـ inputs/outputs، الـ credentials، والـ properties (الحقول اللي المستخدم بيملاها). الخاصية `usableAsTool: true` بتخلّي AI Agent يستخدمه كأداة.', 'Every node is a class implementing **inodetype** with a **node description**: display name, internal name, icon, version, inputs/outputs, credentials, and properties (the fields the user fills in). The `usableAsTool: true` property lets an AI Agent use it as a tool.'),
          'import type { INodeType, INodeTypeDescription } from "n8n-workflow";\nimport { NodeConnectionTypes } from "n8n-workflow";\n\nexport class Shop implements INodeType {\n  description: INodeTypeDescription = {\n    displayName: "Shop",\n    name: "shop",\n    icon: "file:shop.svg",\n    group: ["transform"],\n    version: 1,\n    subtitle: \'={{$parameter["operation"] + ": " + $parameter["resource"]}}\',\n    description: "Read orders and customers from the Shop API",\n    defaults: { name: "Shop" },\n    inputs: [NodeConnectionTypes.Main],\n    outputs: [NodeConnectionTypes.Main],\n    usableAsTool: true,\n    credentials: [{ name: "shopApi", required: true }],\n    properties: [ /* resource, operation, fields — next lessons */ ],\n  };\n}', { lang: 'ts' }),
        L(B('Resource وOperation', 'Resource and operation'),
          B('النمط المتعارف عليه في n8n: حقل **resource and operation** (Order ← Get / Get Many / Cancel)، وكل حقل تاني بيظهر حسب الاختيار بـ **displayoptions**. أنواع الحقول: string وnumber وboolean و**options property** (قايمة) و**collection** (حقول اختيارية) و**fixedcollection** (مجموعات متكررة).', 'The standard n8n pattern: a **resource and operation** pair (Order → Get / Get Many / Cancel), with every other field shown according to the choice via **displayoptions**. Field types: string, number, boolean, an **options property** (a list), a **collection** (optional fields) and a **fixedcollection** (repeating groups).'),
          'properties: [\n  { displayName: "Resource", name: "resource", type: "options", noDataExpression: true, default: "order",\n    options: [{ name: "Order", value: "order" }, { name: "Customer", value: "customer" }] },\n  { displayName: "Operation", name: "operation", type: "options", noDataExpression: true, default: "get",\n    displayOptions: { show: { resource: ["order"] } },\n    options: [\n      { name: "Get", value: "get", action: "Get an order" },\n      { name: "Get Many", value: "getAll", action: "Get many orders" },\n    ] },\n  { displayName: "Order ID", name: "orderId", type: "number", required: true, default: 0,\n    displayOptions: { show: { resource: ["order"], operation: ["get"] } } },\n  { displayName: "Filters", name: "filters", type: "collection", default: {}, placeholder: "Add filter",\n    displayOptions: { show: { resource: ["order"], operation: ["getAll"] } },\n    options: [{ displayName: "Status", name: "status", type: "options", default: "paid",\n               options: [{ name: "Paid", value: "paid" }, { name: "Shipped", value: "shipped" }] }] },\n]', { lang: 'ts' })
      ],
      practice: [
        B('انسخ n8n-nodes-starter وابنيه.', 'Clone n8n-nodes-starter and build it.'),
        B('اكتب description لنود API بتستخدمه.', 'Write a description for a node for an API you use.'),
        B('اعمل resource/operation بـ displayOptions.', 'Build resource/operation with displayOptions.'),
        B('ضيف collection للفلاتر الاختيارية.', 'Add a collection for optional filters.')
      ],
      words: [
        W('custom node', 'نود n8n بتعمله بنفسك', 'an n8n node you build yourself', 'We wrote a custom node for the ERP.'),
        W('community node', 'نود منشور للمجتمع على npm', 'a node published for anyone to install', 'Install the community node from Settings.'),
        W('n8n-nodes-starter', 'قالب البداية الرسمي للنودز', 'the official starter template for nodes', 'Clone n8n-nodes-starter to begin.'),
        W('inodetype', 'واجهة كلاس النود', 'the interface a node class implements', 'The class implements INodeType.'),
        W('node description', 'وصف النود وحقوله', 'the metadata and fields of a node', 'The node description lists its properties.'),
        W('usableastool', 'النود ينفع كأداة لـ AI Agent', 'a flag letting AI Agents use the node', 'Set usableAsTool to true.'),
        W('resource and operation', 'نمط المورد والعملية', 'the n8n field pattern for actions', 'Order + Get follows resource and operation.'),
        W('displayoptions', 'إظهار الحقل حسب اختيار تاني', 'rules for when a field is shown', 'displayOptions hides Order ID for Get Many.'),
        W('options property', 'حقل قايمة اختيارات', 'a field with a fixed list of choices', 'Operation is an options property.'),
        W('collection', 'مجموعة حقول اختيارية', 'a group of optional fields', 'Filters live in a collection.'),
        W('fixedcollection', 'مجموعات حقول متكررة', 'repeatable groups of fields', 'Line items use a fixedCollection.')
      ],
      read: [{ lib: 'n8n Docs: Creating nodes', what: B('اقرا Overview وPlan your node.', 'Read Overview and Plan your node.') }],
      challenge: B('صمّم نود لـ API بتستخدمه (متجر، CRM، شحن): package بالهيكل، description كامل، 2 resources و5 operations بـ displayOptions، وcollection للفلاتر — وابنيه وشوفه ظاهر في n8n محلي (من غير منطق لسه).', 'Design a node for an API you use (a shop, CRM or carrier): the package structure, a full description, 2 resources and 5 operations with displayOptions, and a collection for filters — build it and see it appear in a local n8n (no logic yet).'),
      quiz: [
        Q(B('اسم حزمة community node:', 'A community node package name:'), [['n8n-nodes-…', 'n8n-nodes-…'], ['اي اسم', 'any name'], ['@n8n/…', '@n8n/…']], 0, B('اتفاق.', 'Convention.')),
        Q(B('حقل يظهر بس مع Get:', 'A field shown only for Get:'), [['displayOptions', 'displayOptions'], ['CSS', 'CSS'], ['if في execute', 'an if in execute']], 0, B('إظهار.', 'Visibility.')),
        Q(B('AI Agent يستخدم النود:', 'An AI Agent using the node:'), [['usableAsTool: true', 'usableAsTool: true'], ['مستحيل', 'impossible'], ['Code node بس', 'only a Code node']], 0, B('أداة.', 'Tool.'))
      ] },

    { title: B('النود الـ declarative والـ credentials', 'The declarative node and credentials'),
      goal: B('نود REST كامل من غير execute.', 'A full REST node without execute.'),
      learn: [
        L(B('declarative style', 'Declarative style'),
          B('لـ REST API عادي: **declarative style** = بتوصف الطلب بدل ما تكتب كود. **requestdefaults** فيها الـ baseURL والـ headers، وكل operation فيها **routing**: method وurl (بتعبيرات زي `={{$value}}`) وquery. n8n بيبني الطلب ويرجّع النتيجة. أقل كود، أقل أخطاء. وللمنطق المعقد: **programmatic style** (بكرة).', 'For a normal REST API: **declarative style** = you describe the request instead of writing code. **requestdefaults** holds the baseURL and headers, and each operation has **routing**: method, URL (with expressions like `={{$value}}`) and query. n8n builds the request and returns the result. Less code, fewer bugs. For complex logic: **programmatic style** (tomorrow).'),
          'requestDefaults: {\n  baseURL: "https://api.example-shop.com/v1",\n  headers: { Accept: "application/json" },\n},\nproperties: [\n  // … resource / operation …\n  { displayName: "Order ID", name: "orderId", type: "number", default: 0, required: true,\n    displayOptions: { show: { resource: ["order"], operation: ["get"] } },\n    routing: { request: { method: "GET", url: "=/orders/{{$value}}" } } },\n  { displayName: "Status", name: "status", type: "options", default: "paid",\n    options: [{ name: "Paid", value: "paid" }, { name: "Shipped", value: "shipped" }],\n    displayOptions: { show: { resource: ["order"], operation: ["getAll"] } },\n    routing: { request: { method: "GET", url: "/orders", qs: { status: "={{$value}}" } } } },\n]', { lang: 'ts' }),
        L(B('n8n بيبني الطلب إزاي', 'How n8n builds the request'),
          B('عشان تفهم الـ routing: المثال بيعمل نسخة صغيرة من اللي n8n بيعمله — بياخد قيم الحقول، يقيّم التعبيرات البسيطة، ويدمج الـ routing مع الـ requestDefaults لطلب نهائي.', 'To understand routing: the example builds a small version of what n8n does — it takes the field values, evaluates simple expressions, and merges routing with requestDefaults into a final request.'),
          'const requestDefaults = { baseURL: "https://api.example-shop.com/v1", headers: { Accept: "application/json" } };\nconst properties = [\n  { name: "orderId", show: { operation: ["get"] }, routing: { request: { method: "GET", url: "=/orders/{{$value}}" } } },\n  { name: "status", show: { operation: ["getAll"] }, routing: { request: { method: "GET", url: "/orders", qs: { status: "={{$value}}" } } } },\n  { name: "limit", show: { operation: ["getAll"] }, routing: { request: { qs: { limit: "={{$value}}" } } } },\n];\nconst evalExpr = (v, value) => typeof v === "string" && v.startsWith("=") ? v.slice(1).replaceAll("{{$value}}", value) : v;\n\nfunction buildRequest(params) {\n  const req = { method: "GET", url: "", qs: {}, headers: { ...requestDefaults.headers } };\n  for (const p of properties) {\n    if (!p.show.operation.includes(params.operation) || params[p.name] === undefined) continue;\n    const r = p.routing.request;\n    if (r.method) req.method = r.method;\n    if (r.url) req.url = evalExpr(r.url, params[p.name]);\n    for (const [k, v] of Object.entries(r.qs ?? {})) req.qs[k] = evalExpr(v, params[p.name]);\n  }\n  const qs = new URLSearchParams(req.qs).toString();\n  return `${req.method} ${requestDefaults.baseURL}${req.url}${qs ? "?" + qs : ""}`;\n}\nconsole.log(buildRequest({ operation: "get", orderId: 1042 }));\nconsole.log(buildRequest({ operation: "getAll", status: "shipped", limit: 50 }));', N()),
        L(B('الـ credentials', 'Credentials'),
          B('**credential type** (كلاس يطبّق **icredentialtype**): الحقول (API key بـ `password: true`)، و**authenticate** بيقول تتحط فين (header أو query)، و**credential test** بيجرّب الاتصال لما المستخدم يحفظ. n8n بيشفّر القيم ومبيوريهاش في الـ workflow أبدًا.', 'A **credential type** (a class implementing **icredentialtype**): the fields (an API key with `password: true`), **authenticate** saying where it goes (a header or the query), and a **credential test** checking the connection when the user saves. n8n encrypts the values and never shows them in the workflow.'),
          'import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";\n\nexport class ShopApi implements ICredentialType {\n  name = "shopApi";\n  displayName = "Shop API";\n  documentationUrl = "https://example-shop.com/docs/api-keys";\n  properties: INodeProperties[] = [\n    { displayName: "API Key", name: "apiKey", type: "string", typeOptions: { password: true }, default: "" },\n    { displayName: "Region", name: "region", type: "options", default: "eg",\n      options: [{ name: "Egypt", value: "eg" }, { name: "Saudi Arabia", value: "sa" }] },\n  ];\n  authenticate: IAuthenticateGeneric = {\n    type: "generic",\n    properties: { headers: { Authorization: "=Bearer {{$credentials.apiKey}}" } },\n  };\n  test: ICredentialTestRequest = {\n    request: { baseURL: "=https://{{$credentials.region}}.api.example-shop.com/v1", url: "/me" },\n  };\n}', { lang: 'ts' })
      ],
      practice: [
        B('اكتب نود declarative لـ 3 endpoints.', 'Write a declarative node for 3 endpoints.'),
        B('ضيف query parameters بـ routing.', 'Add query parameters with routing.'),
        B('اعمل credential type بـ authenticate وtest.', 'Create a credential type with authenticate and a test.'),
        B('جرّب الـ credential test بمفتاح غلط.', 'Try the credential test with a wrong key.')
      ],
      words: [
        W('declarative style', 'نود بوصف الطلبات من غير كود', 'a node defined by request descriptions', 'Declarative style suits plain REST APIs.'),
        W('programmatic style', 'نود بدالة execute', 'a node with its own execute method', 'Use programmatic style for loops and logic.'),
        W('requestdefaults', 'الإعدادات المشتركة للطلبات', 'shared request settings for a node', 'requestDefaults sets the baseURL.'),
        W('routing', 'وصف الطلب لكل حقل', 'how a field maps to the HTTP request', 'The routing adds status to the query.'),
        W('credential type', 'نوع بيانات الدخول', 'a definition of how to authenticate', 'Create a credential type for the API key.'),
        W('icredentialtype', 'واجهة كلاس الـ credentials', 'the interface a credential class implements', 'ShopApi implements ICredentialType.'),
        W('authenticate', 'إزاي الـ credential يتحط في الطلب', 'how credentials are added to requests', 'authenticate puts the key in a header.'),
        W('credential test', 'تجربة الاتصال عند الحفظ', 'a request checking credentials on save', 'The credential test calls /me.')
      ],
      read: [{ lib: 'n8n Docs: Creating nodes', what: B('اقرا Declarative-style tutorial وCredentials file.', 'Read the declarative-style tutorial and the credentials file.') }],
      challenge: B('كمّل نود API بتاعك declarative: 5 operations بـ routing، query وbody، pagination لـ Get Many لو الـ API بيدعمها، وcredential type بـ authenticate وtest — وجرّبه في workflow حقيقي.', 'Complete your API node declaratively: 5 operations with routing, query and body, pagination for Get Many if the API supports it, and a credential type with authenticate and a test — and try it in a real workflow.'),
      quiz: [
        Q(B('REST API عادي:', 'A plain REST API:'), [['declarative style', 'declarative style'], ['programmatic دايمًا', 'always programmatic'], ['Code node', 'a Code node']], 0, B('أقل كود.', 'Less code.')),
        Q(B('={{$value}}:', '={{$value}}:'), [['تعبير بقيمة الحقل', 'an expression with the field value'], ['خطأ', 'an error'], ['تعليق', 'a comment']], 0, B('تعبير.', 'Expression.')),
        Q(B('الـ API key في الـ credential:', 'The API key in a credential:'), [['typeOptions.password وn8n بيشفّره', 'typeOptions.password and n8n encrypts it'], ['نص عادي في الـ workflow', 'plain text in the workflow'], ['في الكود', 'in the code']], 0, B('سر.', 'Secret.'))
      ] },

    { title: B('النود الـ programmatic', 'The programmatic node'),
      goal: B('منطق كامل جوه execute().', 'Full logic inside execute().'),
      learn: [
        L(B('execute()', 'execute()'),
          B('**execute method** بتاخد `this` من نوع **iexecutefunctions**: **getinputdata** (الـ items الداخلة)، **getnodeparameter** (قيمة الحقل لكل item — ممكن تكون expression مختلفة لكل واحد)، و`helpers.httpRequestWithAuthentication`. وبترجّع مصفوفة مصفوفات **inodeexecutiondata** (مصفوفة لكل output).', 'The **execute method** receives `this` of type **iexecutefunctions**: **getinputdata** (the incoming items), **getnodeparameter** (a field’s value per item — it may be a different expression for each), and `helpers.httpRequestWithAuthentication`. It returns an array of arrays of **inodeexecutiondata** (one array per output).'),
          'import type { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";\nimport { NodeOperationError } from "n8n-workflow";\n\nasync execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {\n  const items = this.getInputData();\n  const out: INodeExecutionData[] = [];\n  for (let i = 0; i < items.length; i++) {\n    try {\n      const orderId = this.getNodeParameter("orderId", i) as number;\n      const order = await this.helpers.httpRequestWithAuthentication.call(this, "shopApi",\n        { method: "GET", url: `https://api.example-shop.com/v1/orders/${orderId}`, json: true });\n      out.push({ json: order, pairedItem: { item: i } });\n    } catch (error) {\n      if (this.continueOnFail()) { out.push({ json: { error: (error as Error).message }, pairedItem: { item: i } }); continue; }\n      throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });\n    }\n  }\n  return [out];\n}', { lang: 'ts' }),
        L(B('شغّلها بـ context وهمي', 'Run it with a fake context'),
          B('أحسن طريقة تفهم وتختبر execute: شغّلها بـ `this` وهمي فيه نفس الدوال. المثال بيشغّل نفس المنطق على 3 items واحد منهم بيفشل — مرة بـ **continueonfail** (الخطأ يبقى item ويكمّل) ومرة من غيره (**nodeoperationerror** برقم الـ item).', 'The best way to understand and test execute: run it with a fake `this` offering the same functions. The example runs the same logic on 3 items where one fails — once with **continueonfail** (the error becomes an item and processing continues) and once without (a **nodeoperationerror** naming the item).'),
          'import { fakeContext, NodeOperationError } from "./fake.mjs";\nimport { execute } from "./node.mjs";\n\nconst items = [{ id: 1042 }, { id: 9999 }, { id: 1043 }];\nconst params = { orderId: item => item.id };                 // like the expression {{$json.id}}\n\nconst lenient = Object.assign(fakeContext(items, params, { failOn: "9999", continueOnFail: true }), { NodeOperationError });\nconst [out] = await execute.call(lenient);\nconsole.log(out.map(o => JSON.stringify(o)).join("\\n"));\n\nconst strict = Object.assign(fakeContext(items, params, { failOn: "9999" }), { NodeOperationError });\ntry { await execute.call(strict); } catch (e) { console.log("stopped:", e.message); }', N({ 'fake.mjs': FAKE_CTX, 'node.mjs': EXECUTE })),
        L(B('أخطاء وتعدد الـ outputs', 'Errors and multiple outputs'),
          B('**nodeapierror** للأخطاء الجاية من API (n8n بيعرض الـ status والرسالة كويس)، وNodeOperationError لأخطاء منطقك. وتقدر تعمل نود بأكتر من output (مثلًا «نجح» و«محتاج مراجعة») بإنك ترجّع مصفوفتين. و**node version**: لما تغيّر سلوك بشكل بيكسر، اعمل **versioned node** (version 2) والـ workflows القديمة تفضل على 1.', '**nodeapierror** for errors coming from an API (n8n displays the status and message nicely), and NodeOperationError for your own logic errors. You can give a node several outputs (e.g. «ok» and «needs review») by returning two arrays. And **node version**: when you change behaviour in a breaking way, make a **versioned node** (version 2) so old workflows stay on 1.'),
          'import { NodeApiError, type JsonObject } from "n8n-workflow";\n\n// two outputs: [ok, needsReview]\noutputs: [NodeConnectionTypes.Main, NodeConnectionTypes.Main],\noutputNames: ["OK", "Needs review"],\n\nasync execute(this: IExecuteFunctions) {\n  const ok: INodeExecutionData[] = [], review: INodeExecutionData[] = [];\n  for (const [i, item] of this.getInputData().entries()) {\n    try {\n      const inv = await this.helpers.httpRequestWithAuthentication.call(this, "shopApi", { url: `/invoices/${item.json.id}`, json: true });\n      (inv.total > 5000 || !inv.vat ? review : ok).push({ json: inv, pairedItem: { item: i } });\n    } catch (error) {\n      throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });\n    }\n  }\n  return [ok, review];\n}', { lang: 'ts' })
      ],
      practice: [
        B('حوّل operation لـ programmatic بـ execute.', 'Turn an operation into programmatic with execute.'),
        B('شغّل الـ execute بـ context وهمي.', 'Run execute with a fake context.'),
        B('اتعامل مع continueOnFail صح.', 'Handle continueOnFail correctly.'),
        B('اعمل نود بـ 2 outputs.', 'Build a node with 2 outputs.')
      ],
      words: [
        W('execute method', 'الدالة اللي بتشغّل النود', 'the method running a programmatic node', 'The execute method loops over items.'),
        W('iexecutefunctions', 'نوع this جوه execute', 'the type of this inside execute', 'IExecuteFunctions gives getInputData.'),
        W('getinputdata', 'جيب الـ items الداخلة', 'returns the incoming items', 'Start with this.getInputData().'),
        W('getnodeparameter', 'قيمة الحقل لـ item معين', 'a field’s value for one item', 'Call getNodeParameter with the item index.'),
        W('inodeexecutiondata', 'شكل الـ item الخارج', 'the shape of an output item', 'Return INodeExecutionData with json.'),
        W('continueonfail', 'كمّل لو item فشل', 'the setting to keep going after an item fails', 'With continueOnFail the error becomes an item.'),
        W('nodeoperationerror', 'خطأ في منطق النود', 'an error raised by node logic', 'Throw NodeOperationError with itemIndex.'),
        W('nodeapierror', 'خطأ جاي من API', 'an error wrapping an API failure', 'NodeApiError shows the HTTP status.'),
        W('node version', 'رقم إصدار النود', 'the version number of a node', 'Bump the node version for breaking changes.'),
        W('versioned node', 'نود بأكتر من إصدار', 'a node supporting several versions', 'A versioned node keeps old workflows working.')
      ],
      read: [{ lib: 'n8n Docs: Creating nodes', what: B('اقرا Programmatic-style tutorial.', 'Read the programmatic-style tutorial.') }],
      challenge: B('اكتب نود programmatic «Invoice Checker»: بيجيب الفاتورة لكل item، يتحقق من الضريبة والإجمالي، يطلّع على output «OK» أو «Needs review»، يحترم continueOnFail، ويرمي NodeApiError لأخطاء الـ API — واختبر execute بـ context وهمي.', 'Write a programmatic «Invoice Checker» node: fetch the invoice for each item, check VAT and totals, emit to an «OK» or «Needs review» output, respect continueOnFail, and throw NodeApiError for API errors — and test execute with a fake context.'),
      quiz: [
        Q(B('getNodeParameter("x", i):', 'getNodeParameter("x", i):'), [['قيمة الحقل للـ item رقم i', 'the field value for item i'], ['كل الحقول', 'all fields'], ['الـ credential', 'the credential']], 0, B('لكل item.', 'Per item.')),
        Q(B('item فشل وcontinueOnFail شغال:', 'An item fails with continueOnFail on:'), [['الخطأ يبقى item والباقي يكمّل', 'the error becomes an item, the rest continue'], ['كله يقف', 'everything stops'], ['يتجاهل', 'ignored silently']], 0, B('مرونة.', 'Resilience.')),
        Q(B('execute بترجّع:', 'execute returns:'), [['مصفوفة لكل output', 'an array per output'], ['string', 'a string'], ['undefined', 'undefined']], 0, B('[[…]]', '[[…]]'))
      ] },

    { title: B('دورة التطوير والاختبار', 'The dev loop and testing'),
      goal: B('تعدّل وتشوف النتيجة في ثواني.', 'Edit and see the result in seconds.'),
      learn: [
        L(B('التشغيل المحلي', 'Running locally'),
          B('أداة n8n الرسمية لتطوير النودز بتشغّل n8n محلي ونودك محمّل فيه وبتعيد البناء مع كل حفظ (**dev mode**). الطريقة القديمة: `npm run build` ثم **npm link** في `~/.n8n/custom`. وشغّل **node linter** (قواعد n8n لـ ESLint) — بيمسك أخطاء بتمنع القبول كـ verified node.', 'n8n’s official node-development tool runs a local n8n with your node loaded and rebuilds on every save (**dev mode**). The older way: `npm run build` then **npm link** into `~/.n8n/custom`. And run the **node linter** (n8n’s ESLint rules) — it catches mistakes that block verification.'),
          '# scaffold (or clone n8n-nodes-starter) — check the docs for the current command\nnpm create @n8n/node@latest n8n-nodes-shop\ncd n8n-nodes-shop\nnpm run dev            # local n8n at http://localhost:5678 with your node, rebuilt on save\nnpm run lint           # n8n node linter: naming, descriptions, icons, param rules\nnpm run build          # dist/ for publishing\n\n# older manual way\nnpm run build && npm link\ncd ~/.n8n/custom && npm link n8n-nodes-shop && n8n start', T),
        L(B('اختبار المنطق', 'Testing the logic'),
          B('افصل المنطق المهم (حسابات، تحويل البيانات) في دوال عادية واختبرها بـ node:test من غير n8n. وexecute نفسها اختبرها بـ context وهمي زي امبارح. المثال بيشغّل اختبارات لدالة تحويل بيانات فاتورة.', 'Split the important logic (calculations, data transformation) into plain functions and test them with node:test without n8n. Test execute itself with a fake context like yesterday. The example runs tests for an invoice-mapping function.'),
          'import { test } from "node:test";\nimport assert from "node:assert/strict";\n\n// pure logic used inside execute()\nexport function toOdooInvoice(order) {\n  const lines = order.items.map(it => ({ product: it.sku, quantity: it.qty, price_unit: it.price }));\n  const untaxed = lines.reduce((s, l) => s + l.quantity * l.price_unit, 0);\n  const vat = Math.round(untaxed * (order.country === "EG" ? 0.14 : 0) * 100) / 100;\n  return { partner: order.customer.phone, lines, untaxed, vat, total: Math.round((untaxed + vat) * 100) / 100 };\n}\n\nconst order = { country: "EG", customer: { phone: "01012345678" }, items: [{ sku: "MUG", qty: 2, price: 120 }, { sku: "BAG", qty: 1, price: 300.5 }] };\n\ntest("maps lines", () => assert.equal(toOdooInvoice(order).lines.length, 2));\ntest("computes Egyptian VAT", () => assert.deepEqual([toOdooInvoice(order).untaxed, toOdooInvoice(order).vat], [540.5, 75.67]));\ntest("no VAT outside Egypt", () => assert.equal(toOdooInvoice({ ...order, country: "AE" }).vat, 0));\ntest("total is rounded to piasters", () => assert.equal(toOdooInvoice(order).total, 616.17));', N()),
        L(B('n8n كبيئة اختبار', 'n8n as a test bed'),
          B('غير اختبارات الوحدة: workflow اختبار في n8n المحلي بيشغّل كل operation على API تجربة (sandbox) ويتحقق بنود IF، وتصدّره JSON جنب الكود. ومع كل إصدار جديد من n8n شغّله تاني — الـ APIs الداخلية بتتغير أحيانًا.', 'Beyond unit tests: a test workflow in the local n8n running every operation against a sandbox API and checking with IF nodes, exported as JSON next to the code. Run it again with each new n8n release — internal APIs sometimes change.'),
          'test/workflows/smoke.json  (imported into the dev n8n)\n  Manual Trigger\n   → Shop: Order · Get (orderId = 1042)            → IF status exists\n   → Shop: Order · Get Many (status = paid, 5)      → IF items = 5\n   → Shop: Order · Get (orderId = 999999)          → error output → IF «not found» message\n   → Set { smoke: "passed", n8nVersion: {{$n8nVersion}} }', T)
      ],
      practice: [
        B('شغّل النود في dev mode وعدّل حقل.', 'Run the node in dev mode and change a field.'),
        B('شغّل الـ linter وصلّح التحذيرات.', 'Run the linter and fix its warnings.'),
        B('افصل المنطق في دوال واكتب 5 اختبارات.', 'Split the logic into functions and write 5 tests.'),
        B('اعمل smoke workflow وصدّره.', 'Build a smoke workflow and export it.')
      ],
      words: [
        W('dev mode', 'تشغيل تطوير بإعادة بناء تلقائية', 'a development run rebuilding on save', 'npm run dev starts dev mode.'),
        W('npm link', 'ربط حزمة محلية', 'linking a local package for testing', 'npm link loads the node into n8n.'),
        W('node linter', 'فاحص قواعد نودز n8n', 'ESLint rules for n8n nodes', 'The node linter flagged a missing description.'),
        W('smoke workflow', 'workflow اختبار سريع', 'a quick end-to-end test workflow', 'Run the smoke workflow after each n8n upgrade.'),
        W('sandbox api', 'API تجربة', 'a test environment of an API', 'Point the credential at the sandbox API.')
      ],
      read: [{ lib: 'Node.js test runner', what: B('راجع test وassert.', 'Review test and assert.') }],
      challenge: B('جهّز دورة تطوير احترافية لنودك: dev mode، linter نضيف، المنطق في دوال بـ 10 اختبارات node:test، execute متختبرة بـ context وهمي، وsmoke workflow على sandbox — وCI بيشغّل lint وtest وbuild.', 'Set up a professional dev loop for your node: dev mode, a clean linter, logic in functions with 10 node:test tests, execute tested with a fake context, and a smoke workflow on a sandbox — and CI running lint, test and build.'),
      quiz: [
        Q(B('تعديل وشوف النتيجة في n8n بسرعة:', 'Edit and see it in n8n quickly:'), [['dev mode', 'dev mode'], ['نشر على npm كل مرة', 'publish to npm each time'], ['إعادة تثبيت n8n', 'reinstall n8n']], 0, B('سرعة.', 'Speed.')),
        Q(B('اختبار حساب الضريبة:', 'Testing the VAT calculation:'), [['دالة نقية بـ node:test', 'a pure function with node:test'], ['يدوي في n8n بس', 'manually in n8n only'], ['مش لازم', 'unnecessary']], 0, B('فصل.', 'Separation.')),
        Q(B('n8n اتحدّث:', 'n8n was upgraded:'), [['شغّل الـ smoke workflow تاني', 'run the smoke workflow again'], ['ولا حاجة', 'nothing'], ['احذف النود', 'delete the node']], 0, B('تأكد.', 'Verify.'))
      ] },

    { title: B('النشر كـ community node', 'Publishing as a community node'),
      goal: B('نودك متاح لأي حد يستخدم n8n.', 'Your node available to every n8n user.'),
      learn: [
        L(B('متطلبات الحزمة', 'Package requirements'),
          B('**community node package**: الاسم بيبدأ بـ `n8n-nodes-` أو `@scope/n8n-nodes-`، الكلمة المفتاحية **n8n-community-node-package**، وقسم `n8n` في package.json بيوضح ملفات النودز والـ credentials المبنية. المثال بيفحص package.json على المتطلبات دي.', 'A **community node package**: the name starts with `n8n-nodes-` or `@scope/n8n-nodes-`, has the **n8n-community-node-package** keyword, and an `n8n` section in package.json listing the built node and credential files. The example checks a package.json against these requirements.'),
          'const pkg = {\n  name: "n8n-nodes-shop",\n  version: "0.3.0",\n  keywords: ["n8n-community-node-package", "n8n", "shop"],\n  license: "MIT",\n  files: ["dist"],\n  n8n: { n8nNodesApiVersion: 1, credentials: ["dist/credentials/ShopApi.credentials.js"], nodes: ["dist/nodes/Shop/Shop.node.js"] },\n  peerDependencies: { "n8n-workflow": "*" },\n};\n\nfunction check(p) {\n  const issues = [];\n  if (!/^(@[\\w-]+\\/)?n8n-nodes-[\\w-]+$/.test(p.name)) issues.push("name must be n8n-nodes-… or @scope/n8n-nodes-…");\n  if (!p.keywords?.includes("n8n-community-node-package")) issues.push("missing keyword n8n-community-node-package");\n  if (!p.n8n?.nodes?.length) issues.push("n8n.nodes must list the built node files");\n  if (p.dependencies && Object.keys(p.dependencies).length) issues.push("avoid runtime dependencies (needed for verification)");\n  if (!p.license) issues.push("add a licence");\n  if (!p.files?.includes("dist")) issues.push("publish only dist");\n  return issues;\n}\nconsole.log("shop:", check(pkg).length ? check(pkg) : "ready");\nconsole.log("bad: ", check({ name: "shop-node", keywords: [], dependencies: { axios: "^1" } }));', N()),
        L(B('النشر والتحقق', 'Publishing and verification'),
          B('انشر على npm من GitHub Actions بـ provenance. أي مستخدم n8n self-hosted يثبّته من Settings → Community Nodes. ولـ n8n Cloud والظهور في اللوحة لازم **verified node**: n8n بيراجعه (من غير runtime dependencies، linter نضيف، توثيق كويس). وقبل كده: README بأمثلة وصور، وchangelog.', 'Publish to npm from GitHub Actions with provenance. Any self-hosted n8n user installs it from Settings → Community Nodes. For n8n Cloud and appearing in the panel it must be a **verified node**: n8n reviews it (no runtime dependencies, a clean linter, good docs). Before that: a README with examples and screenshots, and a changelog.'),
          'release checklist — n8n-nodes-shop 0.3.0\n☐ npm run lint && npm test && npm run build — all green\n☐ README: what it does, operations table, credential setup with screenshots, example workflow JSON\n☐ CHANGELOG entry; semantic version (0.x while the API may change)\n☐ no runtime dependencies (use this.helpers.httpRequest…, not axios)\n☐ npm publish --provenance (GitHub Actions)\n☐ test install: Settings → Community Nodes → n8n-nodes-shop\n☐ submit for verification (when ready)', T),
        L(B('الإصدارات والدعم', 'Versions and support'),
          B('لما تغيّر حاجة بتكسر (اسم حقل، شكل output): versioned node (v2) ومتلمسش v1، وsemver major للحزمة. وحط حدود لنفسك: issues بقالب، وقت رد واضح، وصيانة مع كل إصدار n8n كبير. نود كويس ومتصان = سمعة وعملاء (شغل حر في أسبوع 47).', 'When you change something breaking (a field name, the output shape): a versioned node (v2) leaving v1 untouched, and a semver major for the package. And set your limits: issue templates, a stated response time, and maintenance with each major n8n release. A good, maintained node = reputation and clients (freelancing in week 47).'),
          '// versioned node: keep v1 working, add v2\nimport { VersionedNodeType } from "n8n-workflow";\nexport class Shop extends VersionedNodeType {\n  constructor() {\n    const base = { displayName: "Shop", name: "shop", icon: "file:shop.svg", group: ["transform"], description: "Shop API", defaultVersion: 2 };\n    super({ 1: new ShopV1(base), 2: new ShopV2(base) }, base);\n  }\n}', { lang: 'ts' })
      ],
      practice: [
        B('شغّل الـ checker على package.json بتاعك.', 'Run the checker on your package.json.'),
        B('اكتب README بجدول operations ومثال workflow.', 'Write a README with an operations table and an example workflow.'),
        B('انشر نسخة تجربة (أو npm pack وثبّتها محليًا).', 'Publish a test version (or npm pack and install locally).'),
        B('اكتب issue template.', 'Write an issue template.')
      ],
      words: [
        W('community node package', 'حزمة نود مجتمعي', 'an npm package of n8n nodes', 'Our community node package has two nodes.'),
        W('n8n-community-node-package', 'الكلمة المفتاحية لحزم النودز', 'the keyword marking n8n node packages', 'Add the n8n-community-node-package keyword.'),
        W('verified node', 'نود متراجع من n8n', 'a community node reviewed by n8n', 'A verified node appears in n8n Cloud.'),
        W('runtime dependency', 'مكتبة مطلوبة وقت التشغيل', 'a package needed at run time', 'Avoid any runtime dependency for verification.'),
        W('issue template', 'قالب الإبلاغ عن مشكلة', 'a form for bug reports', 'The issue template asks for the n8n version.')
      ],
      read: [{ lib: 'n8n Docs: Creating nodes', what: B('اقرا Submit community nodes.', 'Read Submit community nodes.') }],
      challenge: B('انشر نودك: package.json يعدّي الـ checker، README بجدول وصور ومثال workflow، changelog، نشر بـ provenance من CI (أو npm pack لو مش جاهز)، تثبيت تجربة من Community Nodes — واكتب خطة الوصول لـ verified.', 'Publish your node: a package.json passing the checker, a README with a table, screenshots and an example workflow, a changelog, publishing with provenance from CI (or npm pack if not ready), a test install from Community Nodes — and write a plan to reach verified status.'),
      quiz: [
        Q(B('اسم حزمة صح:', 'A correct package name:'), [['n8n-nodes-shop', 'n8n-nodes-shop'], ['shop-node', 'shop-node'], ['n8n', 'n8n']], 0, B('اتفاق.', 'Convention.')),
        Q(B('للـ verification:', 'For verification:'), [['من غير runtime dependencies', 'no runtime dependencies'], ['axios إجباري', 'axios is required'], ['من غير README', 'no README']], 0, B('مراجعة.', 'Review.')),
        Q(B('تغيير بيكسر في النود:', 'A breaking change in the node:'), [['versioned node v2 وmajor', 'a versioned node v2 and a major version'], ['عدّل v1', 'edit v1'], ['متقولش لحد', 'tell nobody']], 0, B('توافق.', 'Compatibility.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('نودز n8n احترافية بإيدك.', 'Professional n8n nodes by your own hand.'),
      review: [
        B('تشريح النود والـ description وresource/operation.', 'Node anatomy, the description and resource/operation.'),
        B('declarative routing والـ credentials.', 'Declarative routing and credentials.'),
        B('execute() وcontinueOnFail والأخطاء والـ outputs.', 'execute(), continueOnFail, errors and outputs.'),
        B('dev mode والـ linter والاختبارات.', 'Dev mode, the linter and tests.'),
        B('النشر والتحقق والإصدارات.', 'Publishing, verification and versions.')
      ],
      project: B('مشروع الأسبوع `n8n-nodes-<api>` لـ API حقيقي بتستخدمه: credential بـ authenticate وtest، 2 resources و6 operations (declarative)، operation programmatic معقدة بـ 2 outputs وcontinueOnFail، usableAsTool، 15 اختبار وcontext وهمي، smoke workflow، linter نضيف، README وchangelog، ونشر (أو npm pack) — ومستخدم في workflow حقيقي ومع AI Agent.', 'Week project: `n8n-nodes-<api>` for a real API you use: a credential with authenticate and test, 2 resources and 6 operations (declarative), one complex programmatic operation with 2 outputs and continueOnFail, usableAsTool, 15 tests and a fake context, a smoke workflow, a clean linter, a README and changelog, and publishing (or npm pack) — used in a real workflow and by an AI Agent.'),
      test: [
        Q(B('community node بيتثبت من:', 'A community node is installed from:'), [['Settings → Community Nodes', 'Settings → Community Nodes'], ['Code node', 'a Code node'], ['المتصفح', 'the browser']], 0, B('npm.', 'npm.')),
        Q(B('INodeType فيه:', 'INodeType contains:'), [['description وrouting أو execute', 'a description and routing or execute'], ['CSS', 'CSS'], ['قاعدة بيانات', 'a database']], 0, B('نود.', 'A node.')),
        Q(B('noDataExpression على resource:', 'noDataExpression on resource:'), [['يمنع expressions في الحقل ده', 'prevents expressions in that field'], ['يمسح البيانات', 'deletes data'], ['تشفير', 'encryption']], 0, B('ثابت.', 'Fixed.')),
        Q(B('requestDefaults.baseURL:', 'requestDefaults.baseURL:'), [['أول جزء من كل طلب', 'the start of every request URL'], ['رابط الصورة', 'the icon link'], ['المفتاح', 'the key']], 0, B('مشترك.', 'Shared.')),
        Q(B('authenticate generic:', 'Generic authenticate:'), [['يحط الـ credential في header أو query', 'puts the credential in a header or query'], ['بيسجّل دخول المستخدم لـ n8n', 'logs the user into n8n'], ['يشفّر الـ workflow', 'encrypts the workflow']], 0, B('طلب.', 'Request.')),
        Q(B('getInputData():', 'getInputData():'), [['الـ items الداخلة', 'the incoming items'], ['الـ credentials', 'the credentials'], ['الإعدادات العامة', 'global settings']], 0, B('items.', 'Items.')),
        Q(B('pairedItem:', 'pairedItem:'), [['يربط الـ output بالـ item الأصلي', 'links an output to its source item'], ['خطأ', 'an error'], ['أيقونة', 'an icon']], 0, B('تتبع.', 'Lineage.')),
        Q(B('خطأ من الـ API:', 'An error from the API:'), [['NodeApiError', 'NodeApiError'], ['console.log', 'console.log'], ['return null', 'return null']], 0, B('عرض.', 'Display.')),
        Q(B('نود بـ outputs اتنين:', 'A node with two outputs:'), [['execute ترجّع [ok, review]', 'execute returns [ok, review]'], ['مستحيل', 'impossible'], ['نودين', 'two nodes']], 0, B('مصفوفات.', 'Arrays.')),
        Q(B('الـ linter بيمسك:', 'The node linter catches:'), [['مخالفات قواعد نودز n8n', 'violations of n8n node rules'], ['أخطاء الـ API', 'API errors'], ['الإملاء بالعربي', 'Arabic spelling']], 0, B('قواعد.', 'Rules.')),
        Q(B('الكلمة المفتاحية المطلوبة:', 'The required keyword:'), [['n8n-community-node-package', 'n8n-community-node-package'], ['node', 'node'], ['automation', 'automation']], 0, B('اكتشاف.', 'Discovery.')),
        Q(B('تغيير شكل الـ output:', 'Changing the output shape:'), [['versioned node', 'a versioned node'], ['patch', 'a patch'], ['من غير إعلان', 'without notice']], 0, B('توافق.', 'Compatibility.'))
      ] }
  ]
};
