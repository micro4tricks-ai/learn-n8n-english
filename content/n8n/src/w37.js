// n8n week 37 — Building custom nodes in TypeScript.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('بناء Nodes مخصصة بـ TypeScript', 'Building custom nodes in TypeScript'),
  goal: B('تحوّل تكامل بتكرره في كل workflow لـ node حقيقي بواجهة وcredentials: تختار بين الأسلوب declarative والـ programmatic، تكتب الـ description والـ routing، تكتب execute بأخطاء وpairedItem، تختبر محليًا، وتنشر community node بإصدارات.',
          'Turn an integration you repeat in every workflow into a real node with a UI and credentials: choose between the declarative and programmatic styles, write the description and routing, write execute with errors and pairedItem, test locally, and publish a versioned community node.'),
  days: [
    { title: B('إمتى node مخصص؟', 'When a custom node?'),
      goal: B('تعرف الأسلوب الصح والهيكل.', 'Know the right style and the structure.'),
      learn: [
        L(B('HTTP Request ولا node؟', 'HTTP Request or a node?'),
          B('HTTP Request + credential بيكفي لتكامل مرة أو اتنين. ابني **custom node** لما: نفس الـ API بيتكرر في workflows كتير، أو زملاء مش مبرمجين محتاجين واجهة بسيطة (اختار «إنشاء فاتورة» من قايمة)، أو فيه منطق متكرر (صفحات، توقيع، retry)، أو عايز تبيعه/تنشره لعملاء الوكالة.', 'HTTP Request + a credential is enough for one or two integrations. Build a **custom node** when: the same API repeats across many workflows, non-programmer colleagues need a simple UI (pick «create invoice» from a list), there is repeated logic (pagination, signing, retries), or you want to sell/publish it to agency clients.'),
          '1 workflow uses the API          → HTTP Request + credential\n5+ workflows, same 4 endpoints    → custom node (declarative)\nsigning, paging, file handling     → custom node (programmatic)\nclients install it themselves     → community node on npm'),
        L(B('declarative ولا programmatic؟', 'Declarative or programmatic?'),
          B('**declarative style**: بتوصف الطلبات (method، URL، body) جوه الـ **node description** بـ **routing** — من غير كود تنفيذ. مثالي لـ REST APIs عادية. **programmatic style**: بتكتب `execute()` بنفسك — لما محتاج منطق: GraphQL، ملفات، تحويلات معقدة، أكتر من طلب لكل item.', 'The **declarative style**: you describe requests (method, URL, body) inside the **node description** with **routing** — no execution code. Ideal for ordinary REST APIs. The **programmatic style**: you write `execute()` yourself — when you need logic: GraphQL, files, complex transformations, several requests per item.'),
          'declarative: properties[].routing = { request: { method: "POST", url: "/invoices" }, send: { type: "body", property: "amount" } }\nprogrammatic: async execute(this: IExecuteFunctions) { for each item → call the API → return [[…items]] }'),
        L(B('هيكل الباكدج', 'The package structure'),
          B('ابدأ من n8n-nodes-starter: فولدر `nodes/<Name>/` فيه `<Name>.node.ts` والأيقونة، وفولدر `credentials/` فيه **credential type**، و`package.json` فيه قسم `n8n` بيقول فين الملفات. الاسم لازم يبدأ بـ `n8n-nodes-` والـ keywords فيها `n8n-community-node-package`.', 'Start from n8n-nodes-starter: a `nodes/<Name>/` folder with `<Name>.node.ts` and the icon, a `credentials/` folder holding each **credential type**, and `package.json` with an `n8n` section saying where the files are. The name must start with `n8n-nodes-` and the keywords include `n8n-community-node-package`.'),
          'n8n-nodes-fawry-lite/\n  nodes/FawryLite/FawryLite.node.ts · fawrylite.svg\n  credentials/FawryLiteApi.credentials.ts\n  package.json  →  "name": "n8n-nodes-fawry-lite",\n                   "keywords": ["n8n-community-node-package"],\n                   "n8n": { "nodes": ["dist/nodes/FawryLite/FawryLite.node.js"],\n                            "credentials": ["dist/credentials/FawryLiteApi.credentials.js"] }')
      ],
      practice: [
        B('اختار API بتكرره وقرر: node ولا HTTP Request.', 'Pick an API you repeat and decide: a node or HTTP Request.'),
        B('استنسخ n8n-nodes-starter وشغّل build.', 'Clone n8n-nodes-starter and run build.'),
        B('اكتب قايمة الـ resources والـ operations.', 'List the resources and operations.'),
        B('قرر declarative ولا programmatic وليه.', 'Decide declarative or programmatic, and why.')
      ],
      words: [
        W('custom node', 'node بتبنيه بنفسك لخدمة', 'a node you build yourself for a service', 'The custom node wraps the billing API.'),
        W('declarative style', 'وصف الطلبات من غير كود تنفيذ', 'describing requests without execution code', 'Use the declarative style for plain REST.'),
        W('programmatic style', 'كتابة execute بنفسك', 'writing execute yourself', 'GraphQL needs the programmatic style.'),
        W('node description', 'وصف الـ node: الاسم والخصائص والواجهة', 'the node’s name, properties and UI', 'The node description lists the fields.'),
        W('routing', 'ربط خصائص الواجهة بالطلبات', 'linking UI properties to requests', 'routing sends amount in the body.')
      ],
      read: [{ t: 'n8n Docs: Create nodes overview', url: 'https://docs.n8n.io/connect/create-nodes/overview', what: B('اقرا Choose your node building approach.', 'Read Choose your node building approach.') }, { t: 'n8n-nodes-starter', url: 'https://github.com/n8n-io/n8n-nodes-starter', what: B('اقرا README.', 'Read the README.') }],
      challenge: B('صمّم node لخدمة بتستخدمها (CRM، فواتير، SMS): resources وoperations والحقول لكل واحدة، ونوع المصادقة، والأسلوب — في صفحة تصميم قبل أي كود.', 'Design a node for a service you use (a CRM, invoices, SMS): resources, operations and fields for each, the auth type, and the style — in a design page before any code.'),
      quiz: [
        Q(B('API بيتكرر في 8 workflows:', 'An API repeated in 8 workflows:'), [['custom node', 'a custom node'], ['8 HTTP Requests منسوخة', '8 copied HTTP Requests'], ['Code node في كل مكان', 'a Code node everywhere']], 0, B('مكان واحد.', 'One place.')),
        Q(B('REST API عادي:', 'An ordinary REST API:'), [['declarative', 'declarative'], ['programmatic لازم', 'programmatic is required'], ['مستحيل', 'impossible']], 0, B('من غير كود.', 'No code.')),
        Q(B('اسم الباكدج:', 'The package name:'), [['n8n-nodes-…', 'n8n-nodes-…'], ['أي اسم', 'any name'], ['@n8n/…', '@n8n/…']], 0, B('شرط.', 'A rule.'))
      ] },

    { title: B('node بالأسلوب declarative', 'A declarative node'),
      goal: B('node كامل بواجهة وطلبات من غير execute.', 'A complete node with a UI and requests, no execute.'),
      learn: [
        L(B('الـ description', 'The description'),
          B('الـ description بيحدد الاسم والأيقونة والـ inputs/outputs والـ credentials و`requestDefaults` (الـ baseURL والـ headers). وبعدين **node properties**: **resource** (Invoice، Customer) و**operation** (Create، Get، List) — والـ **displayoptions** بيظهر كل حقل بس مع الـ resource/operation بتاعته.', 'The description sets the name, icon, inputs/outputs, credentials and `requestDefaults` (the baseURL and headers). Then the **node properties**: a resource (Invoice, Customer) and an **operation** (Create, Get, List) — and **displayoptions** shows each field only with its resource/operation.'),
          'export class FawryLite implements INodeType {\n  description: INodeTypeDescription = {\n    displayName: "Fawry Lite", name: "fawryLite", icon: "file:fawrylite.svg", group: ["transform"], version: 1,\n    subtitle: \'={{$parameter["operation"] + ": " + $parameter["resource"]}}\',\n    description: "Create and read payment links",\n    defaults: { name: "Fawry Lite" }, inputs: ["main"], outputs: ["main"],\n    credentials: [{ name: "fawryLiteApi", required: true }],\n    requestDefaults: { baseURL: "={{$credentials.baseUrl}}", headers: { Accept: "application/json" } },\n    properties: [ /* resource, operation, fields — tomorrow’s day continues here */ ],\n  };\n}'),
        L(B('routing للطلبات', 'Routing the requests'),
          B('كل operation ليها `routing.request` (method وurl)، وكل حقل بيقول يتبعت فين: `send: { type: "body" | "query", property }`. و`output.postReceive` بيشكّل الرد (مثلًا ياخد `data` بس أو يقسم مصفوفة لـ items). ومع `routing.operations.pagination` بيلف على الصفحات لوحده.', 'Each operation has `routing.request` (method and url), and each field says where it goes: `send: { type: "body" | "query", property }`. And `output.postReceive` shapes the reply (take only `data`, or split an array into items). With `routing.operations.pagination` it walks the pages by itself.'),
          '{ displayName: "Operation", name: "operation", type: "options", noDataExpression: true,\n  displayOptions: { show: { resource: ["paymentLink"] } },\n  options: [\n    { name: "Create", value: "create", action: "Create a payment link",\n      routing: { request: { method: "POST", url: "/payment-links" } } },\n    { name: "Get Many", value: "getAll", action: "Get many payment links",\n      routing: { request: { method: "GET", url: "/payment-links" },\n                 output: { postReceive: [{ type: "rootProperty", properties: { property: "data" } }] } } },\n  ], default: "create" },\n{ displayName: "Amount", name: "amount", type: "number", default: 0, required: true,\n  displayOptions: { show: { resource: ["paymentLink"], operation: ["create"] } },\n  routing: { send: { type: "body", property: "amount" } } }'),
        L(B('قوائم ديناميكية', 'Dynamic lists'),
          B('**load options**: بدل ما المستخدم يكتب id القسم أو المنتج بإيده، الـ node يجيب القايمة من الـ API ويعرضها dropdown. في declarative: `typeOptions.loadOptions.routing`. ده الفرق بين node «شغال» وnode الفريق يحبه.', '**load options**: instead of the user typing a department or product id by hand, the node fetches the list from the API and shows a dropdown. In declarative: `typeOptions.loadOptions.routing`. That is the difference between a node that «works» and one the team loves.'),
          '{ displayName: "Branch", name: "branchId", type: "options", default: "",\n  typeOptions: { loadOptions: { routing: {\n    request: { method: "GET", url: "/branches" },\n    output: { postReceive: [\n      { type: "rootProperty", properties: { property: "branches" } },\n      { type: "setKeyValue", properties: { name: "={{$responseItem.name}}", value: "={{$responseItem.id}}" } },\n      { type: "sort", properties: { key: "name" } } ] } } } },\n  routing: { send: { type: "body", property: "branch_id" } } }')
      ],
      practice: [
        B('اكتب description لـ node بـ resource واحد و3 operations.', 'Write a description for a node with one resource and 3 operations.'),
        B('اربط كل حقل بالـ body أو الـ query.', 'Route each field to the body or the query.'),
        B('ضيف postReceive ياخد data بس.', 'Add a postReceive taking only data.'),
        B('اعمل dropdown بـ load options.', 'Build a dropdown with load options.')
      ],
      words: [
        W('node properties', 'حقول واجهة الـ node', 'the fields of a node’s UI', 'The node properties include Amount.'),
        W('operation', 'الفعل اللي الـ node بيعمله', 'the action a node performs', 'Choose the Create operation.'),
        W('displayoptions', 'شرط ظهور الحقل', 'the condition for showing a field', 'displayOptions hides Amount on Get.'),
        W('load options', 'قايمة اختيارات بتيجي من الـ API', 'a list of choices fetched from the API', 'Load options fill the Branch dropdown.'),
        W('requestdefaults', 'الإعدادات المشتركة لكل طلبات الـ node', 'settings shared by all the node’s requests', 'requestDefaults sets the base URL.')
      ],
      read: [{ t: 'n8n Docs: Build a declarative-style node', url: 'https://docs.n8n.io/connect/create-nodes/build-your-node/tutorial-build-a-declarative-style-node', what: B('اتبع الدرس كله.', 'Follow the whole tutorial.') }],
      challenge: B('ابني node declarative لـ API تجريبي (زي DummyJSON أو JSONPlaceholder): resources Products وUsers، operations Get وGet Many (بصفحات) وCreate، وdropdown فئات بـ load options.', 'Build a declarative node for a demo API (like DummyJSON or JSONPlaceholder): Products and Users resources, Get, Get Many (with pagination) and Create operations, and a category dropdown with load options.'),
      quiz: [
        Q(B('حقل يظهر مع Create بس:', 'A field shown only with Create:'), [['displayOptions', 'displayOptions'], ['required', 'required'], ['default', 'default']], 0, B('شرط.', 'A condition.')),
        Q(B('الحقل يتبعت في الـ body:', 'Sending a field in the body:'), [['routing.send type body', 'routing.send of type body'], ['execute', 'execute'], ['credentials', 'credentials']], 0, B('declarative.', 'Declarative.')),
        Q(B('المستخدم يختار من قايمة الفروع:', 'The user picks from the branch list:'), [['load options', 'load options'], ['كتابة يدوي', 'typing by hand'], ['Code node', 'a Code node']], 0, B('dropdown.', 'A dropdown.'))
      ] },

    { title: B('node بالأسلوب programmatic', 'A programmatic node'),
      goal: B('execute بيلف على الـ items بأمان.', 'An execute that loops over items safely.'),
      learn: [
        L(B('execute', 'execute'),
          B('**execute method**: `const items = this.getInputData()`، ولكل item: **getnodeparameter** (`this.getNodeParameter("amount", i)`) — لاحظ الـ index عشان الـ expressions تتحسب لكل item. نادي الـ API بـ `this.helpers.httpRequestWithAuthentication`، وارجّع `[returnData]` بـ pairedItem.', 'The **execute method**: `const items = this.getInputData()`, and for each item: **getnodeparameter** (`this.getNodeParameter("amount", i)`) — note the index so expressions evaluate per item. Call the API with `this.helpers.httpRequestWithAuthentication`, and return `[returnData]` with pairedItem.'),
          'async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {\n  const items = this.getInputData();\n  const out: INodeExecutionData[] = [];\n  for (let i = 0; i < items.length; i++) {\n    const amount = this.getNodeParameter("amount", i) as number;\n    const orderId = this.getNodeParameter("orderId", i) as string;\n    const res = await this.helpers.httpRequestWithAuthentication.call(this, "fawryLiteApi", {\n      method: "POST", url: "/payment-links", body: { amount, reference: orderId }, json: true,\n    });\n    out.push({ json: res, pairedItem: { item: i } });\n  }\n  return [out];\n}'),
        L(B('الأخطاء', 'Errors'),
          B('**nodeapierror** لأخطاء الـ API (بيعرض الـ status والرسالة بشكل مفهوم في n8n)، و**nodeoperationerror** لأخطاء منطقك (حقل ناقص). واحترم «Continue On Fail»: `if (this.continueOnFail())` حط الخطأ في item وكمّل بدل ما توقف الـ workflow كله.', '**nodeapierror** for API errors (shows the status and message clearly in n8n), and **nodeoperationerror** for your own logic errors (a missing field). And honour «Continue On Fail»: `if (this.continueOnFail())` put the error in an item and carry on instead of stopping the whole workflow.'),
          'try {\n  if (amount <= 0) throw new NodeOperationError(this.getNode(), "Amount must be greater than 0", { itemIndex: i });\n  const res = await this.helpers.httpRequestWithAuthentication.call(this, "fawryLiteApi", request);\n  out.push({ json: res, pairedItem: { item: i } });\n} catch (error) {\n  if (this.continueOnFail()) {\n    out.push({ json: { error: (error as Error).message, orderId }, pairedItem: { item: i } });\n    continue;\n  }\n  if (error instanceof NodeOperationError) throw error;\n  throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });\n}'),
        L(B('ملفات وصفحات', 'Files and pages'),
          B('الـ programmatic بيتألق مع: **binary** (`this.helpers.assertBinaryData(i, "data")` و`prepareBinaryData` — زي Code node أسبوع 21 في JS)، والصفحات (loop لحد ما الـ cursor يخلص مع «Return All» و«Limit»)، والـ batching (طلب واحد لـ 100 item لو الـ API بيقبل).', 'The programmatic style shines with: **binary** (`this.helpers.assertBinaryData(i, "data")` and `prepareBinaryData`), pagination (loop until the cursor ends, with «Return All» and «Limit»), and batching (one request for 100 items when the API accepts it).'),
          'const returnAll = this.getNodeParameter("returnAll", i) as boolean;\nconst limit = returnAll ? Infinity : (this.getNodeParameter("limit", i) as number);\nlet cursor: string | undefined;\nconst rows: IDataObject[] = [];\ndo {\n  const page = await this.helpers.httpRequestWithAuthentication.call(this, "fawryLiteApi", { method: "GET", url: "/payments", qs: { cursor, page_size: 100 } });\n  rows.push(...page.data);\n  cursor = page.next_cursor;\n} while (cursor && rows.length < limit);\nrows.slice(0, limit).forEach(r => out.push({ json: r, pairedItem: { item: i } }));')
      ],
      practice: [
        B('اكتب execute بيلف على الـ items بـ getNodeParameter(i).', 'Write an execute looping over items with getNodeParameter(i).'),
        B('ضيف NodeApiError وcontinueOnFail.', 'Add NodeApiError and continueOnFail.'),
        B('اعمل Return All/Limit بصفحات.', 'Add Return All/Limit with pagination.'),
        B('ارفع ملف binary لـ API من الـ node.', 'Upload a binary file to an API from the node.')
      ],
      words: [
        W('execute method', 'الدالة اللي بتشغّل الـ node', 'the function that runs the node', 'The execute method loops over items.'),
        W('getnodeparameter', 'قراءة قيمة حقل لـ item معين', 'reading a field’s value for one item', 'getNodeParameter("amount", i).'),
        W('nodeapierror', 'خطأ API بشكل n8n', 'an API error in n8n’s format', 'Wrap the 422 in a NodeApiError.'),
        W('nodeoperationerror', 'خطأ في منطق الـ node', 'an error in the node’s logic', 'A missing id throws NodeOperationError.'),
        W('continueonfail', 'احترام إعداد كمّل عند الفشل', 'honouring the continue-on-fail setting', 'Check continueOnFail before throwing.')
      ],
      read: [{ t: 'n8n Docs: Build a programmatic-style node', url: 'https://docs.n8n.io/connect/create-nodes/build-your-node/tutorial-build-a-programmatic-style-node', what: B('اتبع الدرس.', 'Follow the tutorial.') }, { t: 'n8n Docs: Node building reference', url: 'https://docs.n8n.io/connect/create-nodes/build-your-node/reference', what: B('اقرا Error handling وItem linking.', 'Read Error handling and Item linking.') }],
      challenge: B('ابني node programmatic: «Create payment link» لكل item (بأخطاء واضحة وcontinueOnFail وpairedItem)، و«Get many» بصفحات وReturn All/Limit، و«Upload receipt» بملف binary.', 'Build a programmatic node: «create payment link» per item (with clear errors, continueOnFail and pairedItem), «get many» with pagination and Return All/Limit, and «upload receipt» with a binary file.'),
      quiz: [
        Q(B('getNodeParameter من غير i:', 'getNodeParameter without i:'), [['الـ expressions تتحسب غلط لكل item', 'expressions evaluate wrongly per item'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('index.', 'The index.')),
        Q(B('API رد 422:', 'The API replied 422:'), [['NodeApiError', 'NodeApiError'], ['console.log', 'console.log'], ['تجاهل', 'ignore']], 0, B('واضح.', 'Clear.')),
        Q(B('Continue On Fail شغال:', 'Continue On Fail is on:'), [['الخطأ في item وكمّل', 'the error in an item, carry on'], ['ارمي', 'throw'], ['امسح الـ items', 'drop the items']], 0, B('احترم.', 'Honour it.'))
      ] },

    { title: B('الـ credentials والاختبار', 'Credentials and testing'),
      goal: B('مصادقة آمنة وnode بيتختبر قبل ما يتنشر.', 'Safe auth and a node tested before publishing.'),
      learn: [
        L(B('credential type', 'The credential type'),
          B('ملف credentials بيحدد الحقول (baseUrl، apiKey كـ password) و`authenticate` (يتحط في header ولا query) و`test` (طلب بسيط يتأكد إن المفتاح صح — زرار «Test» في n8n). وn8n بيخزّن القيم مشفّرة؛ الـ node نفسه عمره ما بيطبعها.', 'A credentials file defines the fields (baseUrl, apiKey as a password), `authenticate` (put in a header or the query) and `test` (a simple request checking the key — the «Test» button in n8n). n8n stores the values encrypted; the node itself never prints them.'),
          'export class FawryLiteApi implements ICredentialType {\n  name = "fawryLiteApi";\n  displayName = "Fawry Lite API";\n  documentationUrl = "https://github.com/you/n8n-nodes-fawry-lite#credentials";\n  properties: INodeProperties[] = [\n    { displayName: "Base URL", name: "baseUrl", type: "string", default: "https://api.example-pay.test/v1" },\n    { displayName: "API Key", name: "apiKey", type: "string", typeOptions: { password: true }, default: "" },\n  ];\n  authenticate: IAuthenticateGeneric = { type: "generic", properties: { headers: { Authorization: "=Bearer {{$credentials.apiKey}}" } } };\n  test: ICredentialTestRequest = { request: { baseURL: "={{$credentials.baseUrl}}", url: "/me" } };\n}'),
        L(B('التطوير المحلي', 'Local development'),
          B('`npm run build` ثم اربط الباكدج بـ n8n المحلي (`npm link` في فولدر `~/.n8n/custom`، أو `npm run dev` في الـ starter الحديث اللي بيشغّل n8n بالـ node). وجرّب بـ workflow حقيقي: items كتير، expressions، أخطاء، Continue On Fail، ملفات.', '`npm run build`, then link the package into your local n8n (`npm link` in `~/.n8n/custom`, or `npm run dev` in the modern starter, which runs n8n with your node). And try a real workflow: many items, expressions, errors, Continue On Fail, files.'),
          'cd n8n-nodes-fawry-lite && npm install && npm run build\n# modern starter: npm run dev  → n8n at http://localhost:5678 with the node loaded\n# or classic:\nmkdir -p ~/.n8n/custom && cd ~/.n8n/custom && npm init -y && npm link n8n-nodes-fawry-lite\nn8n start   # search the node panel for "Fawry Lite"'),
        L(B('الـ linter والاختبارات', 'The linter and tests'),
          B('**node linter** (`eslint-plugin-n8n-nodes-base`) بيمسك أخطاء الـ description اللي n8n بيرفضها (أسماء، أوصاف، ترتيب). واكتب unit tests لمنطقك (التحويلات، الصفحات) بـ Vitest أو node:test بـ mock لـ `this.helpers` — وworkflow اختبار متحفظ JSON في الريبو.', 'The **node linter** (`eslint-plugin-n8n-nodes-base`) catches description mistakes n8n rejects (names, descriptions, ordering). And write unit tests for your logic (transformations, paging) with Vitest or node:test using a mock of `this.helpers` — plus a test workflow saved as JSON in the repo.'),
          'npm run lint            # n8n-nodes-base rules: displayName casing, descriptions, option order…\nnpm run lintfix\nnpm test                # unit tests: mapper(), paginate() with a fake httpRequest\n# test/workflows/payment-link.json → import in n8n → run before every release')
      ],
      practice: [
        B('اكتب credential type بـ test request.', 'Write a credential type with a test request.'),
        B('شغّل الـ node في n8n محلي وجرّبه.', 'Run the node in a local n8n and try it.'),
        B('شغّل الـ linter وصلّح كل التحذيرات.', 'Run the linter and fix every warning.'),
        B('اكتب 3 unit tests لمنطق الصفحات.', 'Write 3 unit tests for the paging logic.')
      ],
      words: [
        W('credential type', 'تعريف حقول ومصادقة خدمة', 'a definition of a service’s fields and auth', 'The credential type stores the API key.'),
        W('credential test', 'طلب بيتأكد إن المفتاح صح', 'a request checking the key works', 'The credential test calls /me.'),
        W('node linter', 'أداة فحص قواعد nodes n8n', 'a checker for n8n node rules', 'The node linter flagged a description.'),
        W('local n8n', 'نسخة n8n على جهازك للتطوير', 'an n8n copy on your machine for development', 'Test the node on a local n8n.'),
        W('test workflow', 'workflow محفوظ لاختبار الـ node', 'a saved workflow for testing the node', 'Run the test workflow before releasing.')
      ],
      read: [{ t: 'n8n Docs: Credentials files', url: 'https://docs.n8n.io/connect/create-nodes/build-your-node/reference/credentials-files', what: B('اقرا authenticate وtest.', 'Read authenticate and test.') }, { t: 'n8n Docs: Node linter', url: 'https://docs.n8n.io/connect/create-nodes/test-your-node/node-linter', what: B('اقرا Setup.', 'Read Setup.') }],
      challenge: B('خلّي الـ node «جاهز للمراجعة»: credential بـ test، linter نضيف، 6 unit tests، workflow اختبار في الريبو، وREADME بصور وأمثلة.', 'Make the node «review-ready»: a credential with a test, a clean linter, 6 unit tests, a test workflow in the repo, and a README with screenshots and examples.'),
      quiz: [
        Q(B('المفتاح في credential:', 'The key in a credential:'), [['password: true ومشفّر في n8n', 'password: true, encrypted by n8n'], ['حقل نص ظاهر', 'a visible text field'], ['في الكود', 'in the code']], 0, B('أمان.', 'Safety.')),
        Q(B('زرار Test في الـ credential:', 'The Test button on a credential:'), [['بيشغّل test request', 'runs the test request'], ['بيمسح', 'deletes'], ['بينشر', 'publishes']], 0, B('تأكد.', 'Verify.')),
        Q(B('الـ linter بيمسك:', 'The linter catches:'), [['أخطاء description اللي n8n يرفضها', 'description mistakes n8n rejects'], ['أخطاء الـ API', 'API errors'], ['البطء', 'slowness']], 0, B('قواعد.', 'Rules.'))
      ] },

    { title: B('النشر والصيانة', 'Publishing and maintenance'),
      goal: B('node منشور بيتحدث بأمان سنين.', 'A published node that updates safely for years.'),
      learn: [
        L(B('النشر على npm', 'Publishing on npm'),
          B('**community node** بيتنشر على npm باسم `n8n-nodes-…` وkeyword `n8n-community-node-package` — والناس تثبّته من Settings ← Community Nodes. ولو عايز يظهر لكل مستخدمي n8n Cloud: **verified node** — بيتراجع من n8n (شروط: من غير dependencies خارجية غالبًا، وتوثيق، وجودة).', 'A community node is published on npm as `n8n-nodes-…` with the `n8n-community-node-package` keyword — people install it from Settings → Community Nodes. To show it to every n8n Cloud user: a **verified node** — reviewed by n8n (conditions: usually no external dependencies, documentation and quality).'),
          'npm version minor          # 1.2.0 → 1.3.0 (a new operation)\nnpm run build && npm run lint && npm test\nnpm publish --access public --provenance     # provenance from GitHub Actions\ngit push --follow-tags\n# then: submit for verification (optional) via the n8n Creator Portal'),
        L(B('الإصدارات والتوافق', 'Versions and compatibility'),
          B('الـ workflows القديمة بتعتمد على شكل الـ node. متكسرهاش: تغيير كاسر (اسم حقل، شكل الخرج) = **node version** جديد (`version: [1, 2]` و`defaultVersion: 2`) والقديم يفضل شغال للـ workflows القديمة. وsemver للباكدج، و**changelog** واضح لكل إصدار.', 'Old workflows depend on the node’s shape. Do not break them: a breaking change (a field name, the output shape) = a new **node version** (`version: [1, 2]` with `defaultVersion: 2`) while the old one keeps working for old workflows. Semver for the package, and a clear **changelog** per release.'),
          'description: {\n  version: [1, 2],\n  defaultVersion: 2,\n  …\n}\n// in properties: displayOptions: { show: { "@version": [2] } } for v2-only fields\n// CHANGELOG.md\n// ## 2.0.0 — node v2: "amount" is now in cents; v1 workflows keep working\n// ## 1.3.0 — Added: Refund operation'),
        L(B('الدعم والأمان', 'Support and security'),
          B('الـ node بتاعك بيشتغل جوه n8n الناس بصلاحيات واسعة — مسؤولية: dependencies قليلة (وnpm audit)، مفيش telemetry ولا طلبات لسيرفرات تانية، الأسرار من credentials بس، ونقطة تواصل للمشاكل (GitHub issues) وسياسة أمان. وراقب تغييرات الـ API بتاع الخدمة.', 'Your node runs inside people’s n8n with broad permissions — a responsibility: few dependencies (and npm audit), no telemetry or calls to other servers, secrets only from credentials, and a contact point for problems (GitHub issues) plus a security policy. And watch for changes in the service’s API.'),
          'README checklist\n- what it does + screenshot · install (Settings → Community Nodes → n8n-nodes-fawry-lite)\n- credentials: where to get the key, which scopes\n- every operation with an example · known limits (rate limits, page size)\n- compatibility: tested with n8n 1.x · Node.js 20+\n- SECURITY.md: report privately; no data leaves your n8n except to the service API')
      ],
      practice: [
        B('انشر نسخة 0.1.0 من الـ node على npm (أو dry-run).', 'Publish version 0.1.0 of the node to npm (or a dry run).'),
        B('ثبّته في n8n من Community Nodes.', 'Install it in n8n from Community Nodes.'),
        B('اعمل تغيير كاسر كـ node v2 والقديم شغال.', 'Make a breaking change as node v2 with v1 still working.'),
        B('اكتب README وCHANGELOG وSECURITY.md.', 'Write the README, CHANGELOG and SECURITY.md.')
      ],
      words: [
        W('verified node', 'node مراجَع من n8n لكل المستخدمين', 'a node reviewed by n8n for all users', 'A verified node appears in n8n Cloud.'),
        W('node version', 'إصدار شكل الـ node جوه n8n', 'a version of the node’s shape inside n8n', 'Add node version 2 for the new output.'),
        W('defaultversion', 'الإصدار اللي بيتحط في workflows جديدة', 'the version used in new workflows', 'defaultVersion is 2.'),
        W('provenance', 'إثبات إن الباكدج اتبنى من الكود ده', 'proof a package was built from this code', 'Publish with npm provenance.'),
        W('backward compatibility', 'القديم يفضل شغال بعد التحديث', 'old usage keeps working after an update', 'Node versions keep backward compatibility.')
      ],
      read: [{ t: 'n8n Docs: Submit community nodes', url: 'https://docs.n8n.io/connect/create-nodes/deploy-your-node/submit-community-nodes', what: B('اقرا Standards وSubmit for verification.', 'Read Standards and Submit for verification.') }],
      challenge: B('انشر الـ node (أو جهّزه للنشر): إصدار 1.0.0 بـ provenance من GitHub Actions، node version 2 لتغيير كاسر، CHANGELOG، README كامل، وworkflow مثال يتعمل import.', 'Publish the node (or make it ready): version 1.0.0 with provenance from GitHub Actions, node version 2 for a breaking change, a CHANGELOG, a full README and an importable example workflow.'),
      quiz: [
        Q(B('تغيير اسم حقل في node منشور:', 'Renaming a field in a published node:'), [['node version جديد', 'a new node version'], ['غيّره وخلاص', 'just change it'], ['امسح القديم', 'delete the old one']], 0, B('متكسرش workflows.', 'Break no workflows.')),
        Q(B('community node بيتثبت من:', 'A community node is installed from:'), [['Settings ← Community Nodes', 'Settings → Community Nodes'], ['Code node', 'a Code node'], ['المتصفح', 'the browser']], 0, B('npm.', 'npm.')),
        Q(B('الـ node يبعت بيانات لسيرفرك للتحليل:', 'The node sending data to your server for analytics:'), [['لأ', 'no'], ['عادي', 'fine'], ['لو مجهول', 'if anonymous']], 0, B('ثقة.', 'Trust.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('node حقيقي منشور.', 'A real published node.'),
      review: [
        B('إمتى node وإمتى HTTP Request، وdeclarative مقابل programmatic.', 'When a node and when HTTP Request; declarative vs programmatic.'),
        B('الـ description: resources وoperations وdisplayOptions وrouting وload options.', 'The description: resources, operations, displayOptions, routing and load options.'),
        B('execute: getNodeParameter(i) وpairedItem وNodeApiError وcontinueOnFail.', 'execute: getNodeParameter(i), pairedItem, NodeApiError and continueOnFail.'),
        B('credentials بـ authenticate وtest، والتطوير المحلي والـ linter.', 'Credentials with authenticate and test, local development and the linter.'),
        B('النشر وnode versions وsemver والأمان.', 'Publishing, node versions, semver and security.')
      ],
      project: B('ابني ونشر `n8n-nodes-<service>` لخدمة بتستخدمها (أو API تجريبي): 2 resources × 3 operations، load options، صفحات بـ Return All، credential بـ test، أخطاء واضحة وcontinueOnFail، linter نضيف، unit tests، workflow مثال، README وCHANGELOG — وثبّته في n8n واستبدل بيه HTTP Requests في 3 workflows قديمة.', 'Build and publish `n8n-nodes-<service>` for a service you use (or a demo API): 2 resources × 3 operations, load options, pagination with Return All, a credential with a test, clear errors and continueOnFail, a clean linter, unit tests, an example workflow, a README and a CHANGELOG — then install it in n8n and replace the HTTP Requests in 3 old workflows.'),
      test: [
        Q(B('أسلوب من غير كود تنفيذ:', 'The style with no execution code:'), [['declarative', 'declarative'], ['programmatic', 'programmatic'], ['Code node', 'Code node']], 0, B('routing.', 'Routing.')),
        Q(B('GraphQL وملفات:', 'GraphQL and files:'), [['programmatic', 'programmatic'], ['declarative', 'declarative'], ['مستحيل', 'impossible']], 0, B('منطق.', 'Logic.')),
        Q(B('حقل بيظهر حسب العملية:', 'A field shown by operation:'), [['displayOptions', 'displayOptions'], ['credentials', 'credentials'], ['icon', 'icon']], 0, B('شرط.', 'A condition.')),
        Q(B('قايمة من الـ API في الواجهة:', 'A list from the API in the UI:'), [['load options', 'load options'], ['default', 'default'], ['subtitle', 'subtitle']], 0, B('dropdown.', 'A dropdown.')),
        Q(B('items المدخلة في execute:', 'Input items in execute:'), [['this.getInputData()', 'this.getInputData()'], ['$input.all()', '$input.all()'], ['$json', '$json']], 0, B('node API.', 'The node API.')),
        Q(B('ربط كل item خارج بالداخل:', 'Linking each output item to its input:'), [['pairedItem', 'pairedItem'], ['index بس', 'the index only'], ['اسم', 'a name']], 0, B('item linking.', 'Item linking.')),
        Q(B('خطأ من الـ API:', 'An error from the API:'), [['NodeApiError', 'NodeApiError'], ['Error عادي', 'a plain Error'], ['return null', 'return null']], 0, B('رسالة واضحة.', 'A clear message.')),
        Q(B('مكان المفتاح:', 'Where the key lives:'), [['credential type مشفّر', 'an encrypted credential type'], ['node property', 'a node property'], ['README', 'the README']], 0, B('أمان.', 'Safety.')),
        Q(B('اختبار الـ node قبل النشر:', 'Testing the node before publishing:'), [['n8n محلي + linter + unit tests', 'a local n8n + linter + unit tests'], ['على عملاء حقيقيين', 'on real clients'], ['مش لازم', 'not needed']], 0, B('ثقة.', 'Confidence.')),
        Q(B('keyword لازم في package.json:', 'The required keyword in package.json:'), [['n8n-community-node-package', 'n8n-community-node-package'], ['n8n', 'n8n'], ['node', 'node']], 0, B('اكتشاف.', 'Discovery.')),
        Q(B('تغيير كاسر:', 'A breaking change:'), [['node version جديد + major', 'a new node version + a major release'], ['patch', 'a patch'], ['مفيش', 'nothing']], 0, B('توافق.', 'Compatibility.')),
        Q(B('node فيه طلبات لسيرفر غير الخدمة:', 'A node calling a server other than the service:'), [['مرفوض أمنيًا', 'unacceptable for security'], ['عادي', 'fine'], ['مطلوب', 'required']], 0, B('ثقة.', 'Trust.'))
      ] }
  ]
};
