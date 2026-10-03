// JavaScript week 38 — MCP servers in TypeScript.
// MCP SDK code is shown (import paths differ between SDK major versions — check its README); a hand-written
// stdio server talked to over JSON-RPC, result builders, URI templates, an HTTP server with auth and a contract
// snapshot run in Node with built-ins only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
const MINI_SERVER = 'import { createInterface } from "node:readline";\nconst tools = {\n  sales_summary: { description: "Paid revenue for a month like 2026-09", inputSchema: { type: "object", properties: { month: { type: "string" } }, required: ["month"] },\n                   run: ({ month }) => ({ month, orders: 412, revenue: 268400 }) },\n};\nconst reply = (id, result) => process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\\n");\nconst fail = (id, code, message) => process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }) + "\\n");\nfor await (const line of createInterface({ input: process.stdin })) {\n  const msg = JSON.parse(line);\n  console.error("[server] got", msg.method);                 // logs go to stderr — stdout is the protocol\n  if (msg.id === undefined) continue;                         // notification\n  if (msg.method === "initialize") reply(msg.id, { protocolVersion: msg.params.protocolVersion, capabilities: { tools: {} }, serverInfo: { name: "shop", version: "0.1.0" } });\n  else if (msg.method === "tools/list") reply(msg.id, { tools: Object.entries(tools).map(([name, t]) => ({ name, description: t.description, inputSchema: t.inputSchema })) });\n  else if (msg.method === "tools/call") {\n    const t = tools[msg.params.name];\n    if (!t) fail(msg.id, -32602, "unknown tool");\n    else { const data = t.run(msg.params.arguments); reply(msg.id, { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: data, isError: false }); }\n  } else fail(msg.id, -32601, "method not found");\n}\n';
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('MCP servers بـ TypeScript', 'MCP servers in TypeScript'),
  goal: B('تبني MCP servers بـ TypeScript تشتغل مع Claude Code وClaude Desktop وn8n: أدوات بـ zod ومخرجات منظمة وعلامات أمان، resources وقوالب وprompts، تشغيل محلي بـ stdio وعن بعد بـ Streamable HTTP بمصادقة، واختبار ونشر على npm.',
          'Build MCP servers in TypeScript that work with Claude Code, Claude Desktop and n8n: tools with zod, structured output and safety hints, resources, templates and prompts, local stdio and remote Streamable HTTP with authentication, and testing and publishing to npm.'),
  days: [
    { title: B('أول server بـ TypeScript', 'A first server in TypeScript'),
      goal: B('أداة بتشتغل في Claude Code في نص ساعة.', 'A tool working in Claude Code within half an hour.'),
      learn: [
        L(B('الفكرة', 'The idea'),
          B('**mcp** (Model Context Protocol) = طريقة واحدة توصّل بيها أدواتك وبياناتك بأي مساعد AI. انت بتكتب **mcp server** فيه أدوات (**mcp tool**)، بيانات للقراية (**mcp resource**)، وبرومبتات (**mcp prompt**)؛ والـ **mcp client** (Claude Code، Claude Desktop، n8n، VS Code) بيشغّله ويستخدمه. نفس السيرفر لكل الـ clients.', '**mcp** (Model Context Protocol) = one way to connect your tools and data to any AI assistant. You write an **mcp server** with tools (**mcp tool**), readable data (**mcp resource**) and prompts (**mcp prompt**); the **mcp client** (Claude Code, Claude Desktop, n8n, VS Code) launches and uses it. One server for every client.'),
          'Claude Code / Desktop / n8n (MCP client)\n        │ JSON-RPC 2.0 over stdio (local) or Streamable HTTP (remote)\n        ▼\nshop-mcp (your TypeScript server)\n   tools      search_orders · sales_summary · cancel_order (destructive)\n   resources  shop://schema · shop://orders/{id}\n   prompts    weekly_review(week)\n        ▼\nPostgres · Shopify API · files', T),
        L(B('server بالـ SDK', 'A server with the SDK'),
          B('بالـ SDK الرسمي (`@modelcontextprotocol/sdk`): اعمل `McpServer`، سجّل أداة بـ `registerTool` واسم ووصف و**inputSchema** بـ zod، والدالة بترجّع `content`. شغّله بـ **stdio transport**. ومهم: أي `console.log` بيبوّظ البروتوكول — اللوج بـ `console.error`.', 'With the official SDK (`@modelcontextprotocol/sdk`): create an `McpServer`, register a tool with `registerTool`, a name, a description and an **inputSchema** in zod, and the handler returns `content`. Run it with the **stdio transport**. Important: any `console.log` breaks the protocol — log with `console.error`.'),
          '// npm i @modelcontextprotocol/sdk zod          (check the README: import paths changed between major versions)\nimport { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";\nimport { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";\nimport { z } from "zod";\n\nconst server = new McpServer({ name: "shop", version: "0.1.0" });\n\nserver.registerTool("sales_summary", {\n  title: "Sales summary",\n  description: "Paid revenue and order count for a month like 2026-09.",\n  inputSchema: { month: z.string().regex(/^\\d{4}-\\d{2}$/) },\n}, async ({ month }) => {\n  const { orders, revenue } = await db.sales(month);\n  return { content: [{ type: "text", text: `${month}: ${orders} orders, ${revenue} EGP` }] };\n});\n\nconsole.error("shop-mcp starting");                       // stderr only!\nawait server.connect(new StdioServerTransport());', { lang: 'ts' }),
        L(B('اللي بيحصل تحت', 'What happens underneath'),
          B('عشان تفهم الـ SDK: ده server صغير مكتوب بإيدك، والبرنامج الرئيسي بيشغّله كـ child process ويكلّمه **json-rpc** سطر بسطر على stdin/stdout — بالظبط زي ما Claude Code بيعمل: initialize ← tools/list ← tools/call. شغّل المثال وشوف اللوج على stderr منفصل.', 'To understand the SDK: here is a tiny hand-written server, and the main program launches it as a child process and talks **json-rpc** line by line over stdin/stdout — exactly as Claude Code does: initialize → tools/list → tools/call. Run the example and see the stderr logs kept separate.'),
          'import { spawn } from "node:child_process";\nimport { createInterface } from "node:readline";\n\nconst child = spawn(process.execPath, ["server.mjs"], { stdio: ["pipe", "pipe", "pipe"] });\nchild.stderr.on("data", d => process.stdout.write("  " + d));\nconst lines = createInterface({ input: child.stdout })[Symbol.asyncIterator]();\nlet id = 0;\nasync function call(method, params) {\n  const msg = { jsonrpc: "2.0", id: ++id, method, params };\n  child.stdin.write(JSON.stringify(msg) + "\\n");\n  const { value } = await lines.next();\n  return JSON.parse(value);\n}\nconsole.log(await call("initialize", { protocolVersion: "2026-07-28", capabilities: {}, clientInfo: { name: "demo", version: "1" } }));\nchild.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\\n");\nconsole.log(JSON.stringify(await call("tools/list")));\nconsole.log(JSON.stringify(await call("tools/call", { name: "sales_summary", arguments: { month: "2026-09" } })));\nconsole.log(await call("tools/call", { name: "drop_tables", arguments: {} }));\nchild.stdin.end();', N({ 'server.mjs': MINI_SERVER }))
      ],
      practice: [
        B('اعمل server بالـ SDK بأداتين.', 'Build a server with the SDK and two tools.'),
        B('جرّبه بـ `npx @modelcontextprotocol/inspector`.', 'Test it with `npx @modelcontextprotocol/inspector`.'),
        B('وصّله بـ Claude Code: `claude mcp add shop -- node dist/server.js`.', 'Connect it to Claude Code: `claude mcp add shop -- node dist/server.js`.'),
        B('شغّل مثال الـ JSON-RPC وزوّد أداة.', 'Run the JSON-RPC example and add a tool.')
      ],
      words: [
        W('mcp', 'بروتوكول توصيل الـ AI بالأدوات', 'the Model Context Protocol', 'MCP connects Claude to your tools.'),
        W('mcp server', 'برنامج بيعرض أدوات وبيانات', 'a program exposing tools and data', 'Our MCP server wraps the shop database.'),
        W('mcp client', 'التطبيق اللي بيستخدم السيرفرات', 'the app that uses MCP servers', 'Claude Code is an MCP client.'),
        W('mcp tool', 'أداة في سيرفر MCP', 'a callable action on an MCP server', 'sales_summary is an MCP tool.'),
        W('stdio transport', 'التواصل عبر stdin/stdout', 'communication over standard input/output', 'Local servers use the stdio transport.'),
        W('json-rpc', 'بروتوكول طلب ورد بـ JSON', 'a JSON request/response protocol', 'Each MCP message is JSON-RPC.'),
        W('mcp inspector', 'أداة تجرّب فيها السيرفر', 'a tool for testing MCP servers', 'Open the MCP Inspector before connecting clients.')
      ],
      read: ['lib:MCP TypeScript SDK', { lib: 'Model Context Protocol', what: B('اقرا Build a server (TypeScript).', 'Read Build a server (TypeScript).') }],
      challenge: B('اعمل `shop-mcp` بـ TypeScript: 3 أدوات قراية على قاعدة SQLite (node:sqlite) بـ zod، لوج على stderr، تجربة في الـ Inspector، وتوصيل بـ Claude Code — واسأله «إيه مبيعات سبتمبر وأكبر 5 عملاء؟».', 'Build `shop-mcp` in TypeScript: 3 read tools over a SQLite database (node:sqlite) with zod, logs on stderr, a run in the Inspector, and a connection to Claude Code — then ask it «what were September’s sales and the top 5 customers?».'),
      quiz: [
        Q(B('console.log في سيرفر stdio:', 'console.log in a stdio server:'), [['بيبوّظ البروتوكول', 'breaks the protocol'], ['عادي', 'fine'], ['مطلوب', 'required']], 0, B('stderr.', 'stderr.')),
        Q(B('مين بيشغّل سيرفر stdio؟', 'Who launches a stdio server?'), [['الـ client', 'the client'], ['المستخدم يدوي كل مرة', 'the user by hand each time'], ['السحابة', 'the cloud']], 0, B('child process.', 'A child process.')),
        Q(B('ميزة MCP:', 'MCP’s advantage:'), [['سيرفر واحد لكل الـ clients', 'one server for every client'], ['أسرع لغة', 'the fastest language'], ['مجاني دايمًا', 'always free']], 0, B('معيار.', 'A standard.'))
      ] },

    { title: B('أدوات احترافية', 'Professional tools'),
      goal: B('أدوات واضحة وآمنة ومخرجاتها منظمة.', 'Clear, safe tools with structured output.'),
      learn: [
        L(B('zod والأوصاف', 'zod and descriptions'),
          B('الـ inputSchema بـ zod بيتحوّل لـ JSON Schema لوحده، وبيتحقق من المدخلات قبل ما دالتك تشتغل. استخدم `.describe()` لكل حقل — ده اللي النموذج بيقراه. وأسماء أدوات بأفعال واضحة (`search_orders` مش `orders`)، وأدوات قليلة مش 30.', 'A zod inputSchema converts to JSON Schema automatically and validates input before your handler runs. Use `.describe()` on every field — that is what the model reads. Use clear verb names (`search_orders`, not `orders`), and few tools, not 30.'),
          'server.registerTool("search_orders", {\n  title: "Search orders",\n  description: "Find orders by customer phone and/or status. Newest first, at most 20. Not for payments.",\n  inputSchema: {\n    phone: z.string().regex(/^01[0125]\\d{8}$/).describe("Egyptian mobile, e.g. 01012345678"),\n    status: z.enum(["new", "paid", "shipped", "cancelled"]).optional().describe("Filter by status"),\n    limit: z.number().int().min(1).max(20).default(10),\n  },\n  annotations: { readOnlyHint: true, openWorldHint: false },\n}, async ({ phone, status, limit }) => {\n  const rows = await db.searchOrders({ phone, status, limit });\n  return { content: [{ type: "text", text: JSON.stringify(rows) }] };\n});', { lang: 'ts' }),
        L(B('مخرجات منظمة وأخطاء', 'Structured output and errors'),
          B('مع `outputSchema` الأداة بترجّع **structured content** (JSON يتحقق منه) جنب نص للـ clients القديمة. والأخطاء المتوقعة (طلب مش موجود) ترجع نتيجة فيها **isError** مش exception — عشان النموذج يفهم ويكمّل. المثال بيبني الشكلين ويتحقق من النتيجة.', 'With an `outputSchema` a tool returns **structured content** (validatable JSON) beside text for older clients. Expected errors (an order not found) return a result with **isError**, not an exception — so the model understands and carries on. The example builds both shapes and checks the result.'),
          'const ok = data => ({ content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: data });\nconst toolError = message => ({ content: [{ type: "text", text: message }], isError: true });\n\nconst outputSchema = { required: ["id", "status", "total"], types: { id: "number", status: "string", total: "number" } };\nconst check = (data, s) => s.required.filter(k => typeof data[k] !== s.types[k]);\n\nconst orders = new Map([[1042, { id: 1042, status: "shipped", total: 650 }]]);\nfunction getOrder({ order_id }) {\n  const o = orders.get(order_id);\n  if (!o) return toolError(`Order ${order_id} not found. Ask the customer to check the number.`);\n  const bad = check(o, outputSchema);\n  return bad.length ? toolError(`server bug: bad fields ${bad}`) : ok(o);\n}\nconsole.log(JSON.stringify(getOrder({ order_id: 1042 })));\nconsole.log(JSON.stringify(getOrder({ order_id: 9 })));', N()),
        L(B('علامات الأمان', 'Safety hints'),
          B('**tool annotations**: `readOnlyHint` للأدوات اللي بتقرا، `destructiveHint` للي بتمسح أو بتغيّر حاجة مهمة، `idempotentHint`، و`openWorldHint` للي بتكلّم برّه. الـ clients بتستخدمها عشان تطلب موافقة المستخدم. بس دي تلميحات — الحماية الحقيقية في كودك: صلاحيات وحدود وتأكيد.', '**tool annotations**: `readOnlyHint` for reading tools, `destructiveHint` for ones that delete or change something important, `idempotentHint`, and `openWorldHint` for those reaching outside. Clients use them to ask for user approval. But they are hints — real protection lives in your code: permissions, limits and confirmation.'),
          'server.registerTool("cancel_order", {\n  title: "Cancel an unpaid order",\n  description: "Cancel an order that is NOT paid yet. Paid orders are refused (refunds are a separate process).",\n  inputSchema: { order_id: z.number().int(), reason: z.string().min(3).max(200) },\n  annotations: { destructiveHint: true, idempotentHint: true, openWorldHint: false },\n}, async ({ order_id, reason }, extra) => {\n  const o = await db.orders.get(order_id);\n  if (!o) return { content: [{ type: "text", text: "not found" }], isError: true };\n  if (o.status === "paid") return { content: [{ type: "text", text: "refused: order is paid" }], isError: true };\n  await db.orders.cancel(order_id, reason, { by: extra.authInfo?.clientId ?? "local" });   // audit who did it\n  return { content: [{ type: "text", text: `order ${order_id} cancelled` }] };\n});', { lang: 'ts' })
      ],
      practice: [
        B('حط describe لكل حقل في أدواتك.', 'Add describe to every field in your tools.'),
        B('ضيف outputSchema لأداة وشوفها في الـ Inspector.', 'Add an outputSchema to a tool and see it in the Inspector.'),
        B('رجّع isError للأخطاء المتوقعة.', 'Return isError for expected errors.'),
        B('حط annotations صح لكل أداة.', 'Set correct annotations on every tool.')
      ],
      words: [
        W('registertool', 'دالة تسجيل أداة في الـ SDK', 'the SDK method registering a tool', 'Call registerTool for each action.'),
        W('inputschema', 'شكل مدخلات الأداة', 'the schema of a tool’s input', 'The inputSchema is written in zod.'),
        W('structured content', 'نتيجة JSON منظمة', 'machine-readable tool output', 'Return structured content plus text.'),
        W('output schema', 'شكل نتيجة الأداة', 'the schema of a tool’s result', 'Clients validate against the output schema.'),
        W('iserror', 'علامة إن النتيجة خطأ', 'a flag marking a tool result as an error', 'Return isError when an order is missing.'),
        W('tool annotations', 'تلميحات طبيعة الأداة', 'hints about a tool’s behaviour', 'Tool annotations mark cancel_order as destructive.')
      ],
      read: [{ lib: 'Zod', what: B('راجع describe وenum وdefault.', 'Review describe, enum and default.') }],
      challenge: B('رقّي `shop-mcp`: كل أداة بـ describe لكل حقل، 2 أدوات بـ outputSchema، أخطاء متوقعة بـ isError، annotations صح، وأداة إلغاء destructive بتسجّل مين عملها — وجرّب طلب إلغاء طلب مدفوع من Claude Code.', 'Upgrade `shop-mcp`: every tool with describe on each field, 2 tools with an outputSchema, expected errors with isError, correct annotations, and a destructive cancel tool recording who used it — then ask Claude Code to cancel a paid order.'),
      quiz: [
        Q(B('طلب مش موجود:', 'An order that doesn’t exist:'), [['نتيجة بـ isError ورسالة واضحة', 'a result with isError and a clear message'], ['throw', 'throw'], ['نتيجة فاضية', 'an empty result']], 0, B('النموذج يفهم.', 'The model understands.')),
        Q(B('destructiveHint:', 'destructiveHint:'), [['تلميح عشان الـ client يطلب موافقة', 'a hint so the client asks for approval'], ['حماية كاملة', 'complete protection'], ['يمسح السيرفر', 'deletes the server']], 0, B('تلميح.', 'A hint.')),
        Q(B('النموذج بيقرا عن كل حقل من:', 'The model learns about each field from:'), [['describe في zod', 'describe in zod'], ['اسم المتغير بس', 'the variable name only'], ['التعليقات في الكود', 'code comments']], 0, B('وصف.', 'Description.'))
      ] },

    { title: B('Resources وPrompts', 'Resources and prompts'),
      goal: B('بيانات للقراية وقوالب جاهزة.', 'Readable data and ready templates.'),
      learn: [
        L(B('resources', 'Resources'),
          B('الـ resource = بيانات بعنوان (URI) التطبيق أو المستخدم يضيفها للسياق: schema القاعدة، تقرير الشهر، سياسة المرتجعات. وفرقها عن الأداة: الأداة النموذج بيقرر يناديها، والـ resource بتتضاف كسياق. و**resource template** = عنوان بمتغيّر (`shop://orders/{id}`).', 'A resource = data at an address (URI) that the app or user adds to the context: the database schema, this month’s report, the returns policy. The difference from a tool: the model decides to call a tool, while a resource is added as context. A **resource template** = an address with a variable (`shop://orders/{id}`).'),
          'import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";\n\nserver.registerResource("schema", "shop://schema",\n  { title: "Database schema", mimeType: "text/plain" },\n  async uri => ({ contents: [{ uri: uri.href, text: await db.schemaSql() }] }));\n\nserver.registerResource("order", new ResourceTemplate("shop://orders/{id}", { list: undefined }),\n  { title: "One order", mimeType: "application/json" },\n  async (uri, { id }) => ({ contents: [{ uri: uri.href, text: JSON.stringify(await db.orders.get(Number(id))) }] }));', { lang: 'ts' }),
        L(B('مطابقة القوالب', 'Matching templates'),
          B('السيرفر لازم يطابق العنوان المطلوب مع القالب ويطلّع المتغيرات. المثال بيعمل router صغير لقوالب URI: كل `{name}` بيتحول لجزء بيتطابق مع أي حاجة غير `/`، ويتحقق من المدخلات قبل ما يقرا.', 'The server must match the requested address against templates and extract the variables. The example builds a small URI-template router: each `{name}` becomes a part matching anything but `/`, with input checked before reading.'),
          'const routes = [];\nconst template = (pattern, handler) => {\n  const names = [...pattern.matchAll(/\\{(\\w+)\\}/g)].map(m => m[1]);\n  const re = new RegExp("^" + pattern.replace(/[.*+?^$()|[\\]\\\\]/g, "\\\\$&").replace(/\\\\?\\{(\\w+)\\\\?\\}/g, "([^/]+)") + "$");\n  routes.push({ re, names, handler });\n};\nconst read = uri => {\n  for (const r of routes) {\n    const m = uri.match(r.re);\n    if (m) return r.handler(Object.fromEntries(r.names.map((n, i) => [n, decodeURIComponent(m[i + 1])])));\n  }\n  throw new Error(`no resource for ${uri}`);\n};\n\ntemplate("shop://orders/{id}", ({ id }) => /^\\d+$/.test(id) ? { id: Number(id), status: "paid" } : { error: "id must be a number" });\ntemplate("shop://customers/{phone}/orders", ({ phone }) => ({ phone, orders: [101, 102] }));\n\nconsole.log(read("shop://orders/1042"));\nconsole.log(read("shop://orders/abc"));\nconsole.log(read("shop://customers/01012345678/orders"));\ntry { read("shop://secrets/all"); } catch (e) { console.log(e.message); }', N()),
        L(B('Prompts', 'Prompts'),
          B('الـ prompt = قالب جاهز المستخدم بيختاره من قايمة (في Claude Code بيبان كـ slash command)، بمعاملات. مفيد للمهام المتكررة: «مراجعة أسبوعية»، «رد على شكوى». السيرفر بيرجّع رسايل جاهزة فيها التعليمات والبيانات.', 'A prompt = a ready template the user picks from a menu (in Claude Code it appears as a slash command), with arguments. Useful for recurring tasks: «weekly review», «reply to a complaint». The server returns ready messages containing the instructions and data.'),
          'server.registerPrompt("weekly_review", {\n  title: "Weekly sales review",\n  description: "Summarise a week of sales and suggest 3 actions.",\n  argsSchema: { week: z.string().describe("ISO week like 2026-W40") },\n}, async ({ week }) => ({\n  messages: [{\n    role: "user",\n    content: { type: "text", text:\n      `Review the shop\'s sales for ${week}.\\n<data>${JSON.stringify(await db.weekSummary(week))}</data>\\n` +\n      "Give: 3 highlights, 2 problems, 3 concrete actions. Arabic, short." },\n  }],\n}));', { lang: 'ts' })
      ],
      practice: [
        B('ضيف resource لـ schema القاعدة.', 'Add a resource for the database schema.'),
        B('اعمل resource template لطلب وعميل.', 'Build resource templates for an order and a customer.'),
        B('اعمل prompt «مراجعة أسبوعية» بمعامل.', 'Create a «weekly review» prompt with an argument.'),
        B('استخدم الـ prompt كـ slash command في Claude Code.', 'Use the prompt as a slash command in Claude Code.')
      ],
      words: [
        W('mcp resource', 'بيانات بعنوان في سيرفر MCP', 'addressable data on an MCP server', 'Attach the schema MCP resource to the chat.'),
        W('resource template', 'عنوان resource بمتغيّر', 'a resource address with variables', 'shop://orders/{id} is a resource template.'),
        W('uri', 'عنوان المورد', 'a resource identifier', 'Each resource has a URI.'),
        W('mcp prompt', 'قالب برومبت في السيرفر', 'a prompt template offered by a server', 'The weekly_review MCP prompt takes a week.'),
        W('slash command', 'أمر يبدأ بـ /', 'a command typed with a leading slash', 'MCP prompts appear as slash commands.')
      ],
      read: [{ lib: 'Model Context Protocol', what: B('اقرا Resources وPrompts في Concepts.', 'Read Resources and Prompts under Concepts.') }],
      challenge: B('كمّل `shop-mcp` بـ resources (schema، سياسة المرتجعات، تقرير الشهر)، resource template للطلبات، وprompts (مراجعة أسبوعية، رد على شكوى بمعامل رقم الطلب) — وجرّب كل واحد في Claude Code.', 'Complete `shop-mcp` with resources (schema, returns policy, monthly report), a resource template for orders, and prompts (weekly review, a complaint reply taking an order number) — and try each one in Claude Code.'),
      quiz: [
        Q(B('الفرق بين tool وresource:', 'Tool versus resource:'), [['الأداة النموذج يناديها، والـ resource سياق بيتضاف', 'the model calls a tool; a resource is added context'], ['مفيش فرق', 'no difference'], ['الـ resource أسرع بس', 'a resource is just faster']], 0, B('دور.', 'Role.')),
        Q(B('shop://orders/{id}:', 'shop://orders/{id}:'), [['resource template', 'a resource template'], ['أداة', 'a tool'], ['prompt', 'a prompt']], 0, B('متغيّر.', 'Variable.')),
        Q(B('prompt في Claude Code بيبان كـ:', 'A prompt in Claude Code appears as:'), [['slash command', 'a slash command'], ['زرار أحمر', 'a red button'], ['إيميل', 'an email']], 0, B('/', '/'))
      ] },

    { title: B('سيرفر عن بعد', 'A remote server'),
      goal: B('سيرفر واحد لفريقك وn8n على الشبكة.', 'One server for your team and n8n over the network.'),
      learn: [
        L(B('Streamable HTTP', 'Streamable HTTP'),
          B('للاستخدام عن بعد (فريق، n8n، عملاء): **streamable http** = endpoint واحد `/mcp` بيستقبل POST ويرد JSON أو stream. الجلسة ليها **session id** في header `Mcp-Session-Id`. حطه ورا HTTPS، ومن غير مصادقة أبدًا.', 'For remote use (a team, n8n, clients): **streamable http** = one `/mcp` endpoint accepting POST and replying with JSON or a stream. The session has a **session id** in the `Mcp-Session-Id` header. Put it behind HTTPS, and never without authentication.'),
          'import express from "express";\nimport { randomUUID } from "node:crypto";\nimport { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";\n\nconst app = express();\napp.use(express.json({ limit: "1mb" }));\nconst sessions = new Map();\n\napp.post("/mcp", requireToken, async (req, res) => {\n  let transport = sessions.get(req.headers["mcp-session-id"]);\n  if (!transport) {\n    transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => randomUUID(),\n                                                    onsessioninitialized: id => sessions.set(id, transport) });\n    await buildServer(req.auth).connect(transport);          // a server per session, scoped to the caller\n  }\n  await transport.handleRequest(req, res, req.body);\n});\napp.listen(8765);', { lang: 'ts' }),
        L(B('المصادقة', 'Authentication'),
          B('سيرفر عام للمستخدمين: OAuth (المواصفة بتشرحه، والـ SDK فيه أدوات). سيرفر داخلي لـ n8n أو فريقك: token لكل client في `Authorization: Bearer`، مقارنة بـ `timingSafeEqual`، وصلاحيات لكل client. المثال سيرفر HTTP حقيقي على localhost بيتحقق من التوكن والصلاحية.', 'A public server for users: OAuth (the spec explains it and the SDK has helpers). An internal server for n8n or your team: a token per client in `Authorization: Bearer`, compared with `timingSafeEqual`, and per-client permissions. The example is a real HTTP server on localhost checking the token and permission.'),
          'import { createServer } from "node:http";\nimport { createHash, timingSafeEqual } from "node:crypto";\n\nconst sha = s => createHash("sha256").update(s).digest();\nconst CLIENTS = [\n  { name: "n8n-prod", hash: sha("example-token-n8n"), tools: new Set(["sales_summary", "search_orders"]) },\n  { name: "analyst",  hash: sha("example-token-analyst"), tools: new Set(["sales_summary"]) },\n];\nconst who = header => {\n  if (!header?.startsWith("Bearer ")) return null;\n  const h = sha(header.slice(7));\n  return CLIENTS.find(c => timingSafeEqual(c.hash, h)) ?? null;\n};\n\nconst server = createServer(async (req, res) => {\n  let body = ""; for await (const chunk of req) body += chunk;\n  const msg = JSON.parse(body);\n  const client = who(req.headers.authorization);\n  const send = (status, obj) => { res.writeHead(status, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };\n  if (!client) return send(401, { error: "unauthorised" });\n  if (msg.method === "tools/call" && !client.tools.has(msg.params.name)) return send(403, { error: `${client.name} may not call ${msg.params.name}` });\n  send(200, { jsonrpc: "2.0", id: msg.id, result: { content: [{ type: "text", text: `ok for ${client.name}` }] } });\n});\nawait new Promise(r => server.listen(0, "127.0.0.1", r));\nconst url = `http://127.0.0.1:${server.address().port}/mcp`;\nconst post = (token, name) => fetch(url, { method: "POST", headers: token ? { authorization: `Bearer ${token}` } : {},\n  body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: {} } }) }).then(async r => `${r.status} ${await r.text()}`);\nconsole.log(await post("example-token-n8n", "search_orders"));\nconsole.log(await post("example-token-analyst", "search_orders"));\nconsole.log(await post("wrong", "sales_summary"));\nconsole.log(await post(null, "sales_summary"));\nserver.close();', N()),
        L(B('n8n وCloudflare', 'n8n and Cloudflare'),
          B('n8n بيستخدم سيرفرك بنود **MCP Client Tool** جوه AI Agent (بـ URL وheader التوكن). وتقدر تنشر سيرفر MCP بعيد على **cloudflare workers** (Cloudflare عندها أدوات جاهزة لـ MCP وOAuth) — قريب من المستخدمين ومن غير سيرفر تديره.', 'n8n uses your server through the **MCP Client Tool** node inside an AI Agent (with the URL and the token header). And you can deploy a remote MCP server on **cloudflare workers** (Cloudflare has ready tooling for MCP and OAuth) — close to users and with no server to manage.'),
          'n8n workflow\n  Chat Trigger → AI Agent (Claude)\n                   └─ tool: MCP Client Tool\n                        endpoint: https://mcp.example.com/mcp\n                        auth: Header  Authorization = Bearer {{ $credentials.shopMcpToken }}\n                        tools to include: sales_summary, search_orders   (not cancel_order)', T)
      ],
      practice: [
        B('شغّل سيرفرك بـ Streamable HTTP محليًا.', 'Run your server over Streamable HTTP locally.'),
        B('ضيف token لكل client بصلاحيات.', 'Add a per-client token with permissions.'),
        B('وصّل n8n بالسيرفر بـ MCP Client Tool.', 'Connect n8n to the server with the MCP Client Tool.'),
        B('اقرا عن نشر MCP على Cloudflare Workers.', 'Read about deploying MCP to Cloudflare Workers.')
      ],
      words: [
        W('streamable http', 'نقل MCP عبر HTTP', 'MCP transport over HTTP', 'Remote clients use Streamable HTTP.'),
        W('session id', 'معرّف جلسة MCP', 'the identifier of an MCP session', 'The session id travels in Mcp-Session-Id.'),
        W('client token', 'توكن خاص بكل client', 'a secret token issued to one client', 'Each client token maps to its allowed tools.'),
        W('mcp client tool', 'نود n8n بيستخدم سيرفر MCP', 'the n8n node that uses an MCP server', 'The MCP Client Tool sends the client token.'),
        W('cloudflare workers', 'تشغيل كود على شبكة Cloudflare', 'serverless functions on Cloudflare’s network', 'We host the MCP server on Cloudflare Workers.')
      ],
      read: [{ lib: 'Cloudflare Workers', what: B('دوّر على «Build a Remote MCP server».', 'Search for «Build a Remote MCP server».') }],
      challenge: B('انشر `shop-mcp` كسيرفر بعيد: Streamable HTTP ورا HTTPS، token لكل client بصلاحيات أدوات، rate limit، لوج بمين نادى إيه — ووصّل بيه n8n (بأدوات القراية بس) وClaude Code.', 'Deploy `shop-mcp` as a remote server: Streamable HTTP behind HTTPS, a token per client with tool permissions, a rate limit, a log of who called what — and connect n8n (read tools only) and Claude Code to it.'),
      quiz: [
        Q(B('سيرفر لـ n8n على الشبكة:', 'A server for n8n over the network:'), [['Streamable HTTP بمصادقة', 'Streamable HTTP with authentication'], ['stdio', 'stdio'], ['من غير توكن', 'without a token']], 0, B('بعيد.', 'Remote.')),
        Q(B('مقارنة التوكن:', 'Comparing the token:'), [['timingSafeEqual على hashes', 'timingSafeEqual on hashes'], ['===', '==='], ['includes', 'includes']], 0, B('توقيت.', 'Timing.')),
        Q(B('n8n بيكلّم MCP بـ:', 'n8n talks to MCP with:'), [['MCP Client Tool', 'the MCP Client Tool'], ['HTTP Request بس', 'only HTTP Request'], ['مستحيل', 'impossible']], 0, B('نود.', 'A node.'))
      ] },

    { title: B('الاختبار والنشر', 'Testing and publishing'),
      goal: B('سيرفر بيتطوّر من غير ما يكسر حد.', 'A server that evolves without breaking anyone.'),
      learn: [
        L(B('اختبار في الذاكرة', 'In-memory testing'),
          B('اختبر السيرفر بـ client حقيقي في نفس العملية: الـ SDK فيه **in-memory transport** (زوج متوصّل)، فالاختبار بيعمل `listTools` و`callTool` من غير processes ولا شبكة. مع node:test (أسبوع 27) ده سريع وكامل.', 'Test the server with a real client in the same process: the SDK has an **in-memory transport** (a linked pair), so a test runs `listTools` and `callTool` with no processes or network. With node:test (week 27) this is fast and thorough.'),
          'import { test } from "node:test";\nimport assert from "node:assert/strict";\nimport { Client } from "@modelcontextprotocol/sdk/client/index.js";\nimport { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";\nimport { buildServer } from "../src/server.js";\n\ntest("sales_summary returns the month", async () => {\n  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();\n  await buildServer({ db: fakeDb() }).connect(serverSide);\n  const client = new Client({ name: "test", version: "1" });\n  await client.connect(clientSide);\n\n  const { tools } = await client.listTools();\n  assert.ok(tools.some(t => t.name === "sales_summary"));\n  const r = await client.callTool({ name: "sales_summary", arguments: { month: "2026-09" } });\n  assert.match(r.content[0].text, /412 orders/);\n});', { lang: 'ts' }),
        L(B('snapshot للعقد', 'A contract snapshot'),
          B('الـ clients معتمدين على أسماء الأدوات ومعاملاتها. احفظ شكل `tools/list` في ملف، والاختبار يفشل لو أداة اتشالت أو معامل مطلوب جديد اتضاف — ده **breaking change** محتاج major version. المثال بيقارن النسختين.', 'Clients rely on tool names and parameters. Save the shape of `tools/list` to a file, and the test fails if a tool is removed or a new required parameter appears — that is a **breaking change** needing a major version. The example compares two versions.'),
          'const shape = tools => Object.fromEntries(tools.map(t => [t.name, { required: [...(t.inputSchema.required ?? [])].sort(), props: Object.keys(t.inputSchema.properties ?? {}).sort() }]));\nconst saved = { sales_summary: { required: ["month"], props: ["month"] }, search_orders: { required: ["phone"], props: ["limit", "phone", "status"] } };\nconst now = shape([\n  { name: "sales_summary", inputSchema: { required: ["month"], properties: { month: {}, branch: {} } } },\n  { name: "search_orders", inputSchema: { required: ["phone", "status"], properties: { phone: {}, status: {}, limit: {} } } },\n]);\nlet breaking = false;\nfor (const name of new Set([...Object.keys(saved), ...Object.keys(now)])) {\n  if (!now[name]) { console.log(`BREAKING: ${name} removed`); breaking = true; continue; }\n  if (!saved[name]) { console.log(`added: ${name}`); continue; }\n  const newReq = now[name].required.filter(r => !saved[name].required.includes(r));\n  const newProps = now[name].props.filter(p => !saved[name].props.includes(p));\n  if (newReq.length) { console.log(`BREAKING: ${name} now requires ${newReq}`); breaking = true; }\n  else if (newProps.length) console.log(`compatible: ${name} gained optional ${newProps}`);\n}\nconsole.log(breaking ? "→ bump the MAJOR version" : "→ minor/patch is fine");', N()),
        L(B('النشر على npm', 'Publishing to npm'),
          B('انشر سيرفرك كحزمة npm بحقل **bin field** وshebang، والناس تشغّله بـ `npx -y shop-mcp@1.2.0` في إعدادات الـ client. استخدم semantic versioning، اكتب README فيه الأدوات والصلاحيات ومتغيرات البيئة، وانشر بـ provenance من GitHub Actions.', 'Publish your server as an npm package with a **bin field** and a shebang, and people run it with `npx -y shop-mcp@1.2.0` in their client settings. Use semantic versioning, write a README listing the tools, the permissions and the environment variables, and publish with provenance from GitHub Actions.'),
          '// package.json (excerpt)\n{\n  "name": "shop-mcp",\n  "version": "1.2.0",\n  "type": "module",\n  "bin": { "shop-mcp": "dist/server.js" },          // dist/server.js starts with #!/usr/bin/env node\n  "files": ["dist"],\n  "engines": { "node": ">=22" },\n  "scripts": { "build": "tsc", "test": "node --test", "prepublishOnly": "npm run build && npm test" }\n}\n\n// Claude Desktop / Code config — pin the version:\n// { "command": "npx", "args": ["-y", "shop-mcp@1.2.0"], "env": { "SHOP_DB_URL": "…" } }\n// CI: npm publish --provenance --access public', T)
      ],
      practice: [
        B('اكتب 3 اختبارات بالـ in-memory transport.', 'Write 3 tests with the in-memory transport.'),
        B('احفظ snapshot لـ tools/list وغيّر معامل.', 'Save a tools/list snapshot and change a parameter.'),
        B('جهّز package.json بـ bin وshebang.', 'Prepare package.json with bin and a shebang.'),
        B('جرّب `npm pack` وشغّل الحزمة بـ npx محليًا.', 'Try `npm pack` and run the package with npx locally.')
      ],
      words: [
        W('in-memory transport', 'نقل في الذاكرة للاختبار', 'a linked transport pair for tests', 'Tests use the in-memory transport.'),
        W('contract snapshot', 'نسخة محفوظة من واجهة الأدوات', 'a saved copy of the tool interface', 'The contract snapshot caught a new required field.'),
        W('breaking change', 'تغيير بيكسر الـ clients', 'a change that breaks existing clients', 'Removing a tool is a breaking change.'),
        W('bin field', 'حقل الأوامر في package.json', 'the package.json field declaring commands', 'The bin field makes npx shop-mcp work.'),
        W('provenance', 'إثبات مصدر بناء الحزمة', 'proof of where a package was built', 'Publish with provenance from CI.')
      ],
      read: [{ lib: 'npm Docs', what: B('اقرا package.json: bin وfiles.', 'Read package.json: bin and files.') }],
      challenge: B('جهّز `shop-mcp` للنشر: 10 اختبارات بالـ in-memory transport، contract snapshot في CI، package.json بـ bin وengines وfiles، README بالأدوات والصلاحيات، ونشر من GitHub Actions بـ provenance (أو `npm pack` لو مش هتنشر).', 'Prepare `shop-mcp` for release: 10 tests with the in-memory transport, a contract snapshot in CI, a package.json with bin, engines and files, a README listing tools and permissions, and publishing from GitHub Actions with provenance (or `npm pack` if you will not publish).'),
      quiz: [
        Q(B('اختبار سيرفر من غير processes:', 'Testing a server without processes:'), [['in-memory transport', 'the in-memory transport'], ['يدوي', 'by hand'], ['مستحيل', 'impossible']], 0, B('سرعة.', 'Speed.')),
        Q(B('معامل مطلوب جديد:', 'A new required parameter:'), [['breaking change → major', 'a breaking change → major'], ['patch', 'patch'], ['مش مهم', 'unimportant']], 0, B('عقد.', 'Contract.')),
        Q(B('الناس تشغّل سيرفرك بـ:', 'People run your server with:'), [['npx -y shop-mcp@نسخة', 'npx -y shop-mcp@version'], ['git clone كل مرة', 'git clone every time'], ['إيميل', 'email']], 0, B('bin.', 'bin.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('أدواتك متاحة لأي مساعد AI.', 'Your tools available to any AI assistant.'),
      review: [
        B('MCP والسيرفر والـ client وstdio وJSON-RPC.', 'MCP, servers, clients, stdio and JSON-RPC.'),
        B('registerTool وzod والمخرجات المنظمة وisError والعلامات.', 'registerTool, zod, structured output, isError and annotations.'),
        B('Resources والقوالب والـ prompts.', 'Resources, templates and prompts.'),
        B('Streamable HTTP والمصادقة وn8n.', 'Streamable HTTP, authentication and n8n.'),
        B('in-memory tests والـ snapshot والنشر على npm.', 'In-memory tests, snapshots and publishing to npm.')
      ],
      project: B('مشروع الأسبوع `shop-mcp` كامل بـ TypeScript: 5 أدوات بـ zod (منهم 2 بـ outputSchema وواحدة destructive بتسجّل الفاعل)، resources وtemplate وprompts، stdio للمحلي وStreamable HTTP بتوكنات وصلاحيات للبعيد، اختبارات in-memory وcontract snapshot في CI، حزمة npm بـ bin — ومتوصّل بـ Claude Code وn8n.', 'Week project: a complete `shop-mcp` in TypeScript: 5 tools with zod (2 with an outputSchema and one destructive tool recording the caller), resources, a template and prompts, stdio locally and Streamable HTTP with tokens and permissions remotely, in-memory tests and a contract snapshot in CI, an npm package with bin — connected to Claude Code and n8n.'),
      test: [
        Q(B('MCP client مثال:', 'An MCP client example:'), [['Claude Code', 'Claude Code'], ['Postgres', 'Postgres'], ['zod', 'zod']], 0, B('بيستخدم.', 'It uses servers.')),
        Q(B('اللوج في سيرفر stdio:', 'Logs in a stdio server:'), [['console.error', 'console.error'], ['console.log', 'console.log'], ['alert', 'alert']], 0, B('stderr.', 'stderr.')),
        Q(B('أول رسالة في الجلسة:', 'The first message of a session:'), [['initialize', 'initialize'], ['tools/call', 'tools/call'], ['close', 'close']], 0, B('تفاوض.', 'Negotiation.')),
        Q(B('zod في inputSchema:', 'zod in an inputSchema:'), [['schema وتحقق تلقائي', 'a schema and automatic validation'], ['تشفير', 'encryption'], ['ستايل', 'styling']], 0, B('تحقق.', 'Validation.')),
        Q(B('structuredContent:', 'structuredContent:'), [['نتيجة JSON منظمة', 'structured JSON output'], ['HTML', 'HTML'], ['خطأ', 'an error']], 0, B('آلي.', 'Machine-readable.')),
        Q(B('readOnlyHint:', 'readOnlyHint:'), [['الأداة بتقرا بس', 'the tool only reads'], ['الأداة سرية', 'the tool is secret'], ['الأداة بطيئة', 'the tool is slow']], 0, B('تلميح.', 'Hint.')),
        Q(B('resource:', 'A resource:'), [['بيانات بعنوان تتضاف كسياق', 'addressable data added as context'], ['أداة بتمسح', 'a deleting tool'], ['مستخدم', 'a user']], 0, B('سياق.', 'Context.')),
        Q(B('prompt في MCP:', 'A prompt in MCP:'), [['قالب يختاره المستخدم', 'a template the user picks'], ['كلمة سر', 'a password'], ['خطأ', 'an error']], 0, B('قالب.', 'Template.')),
        Q(B('Mcp-Session-Id:', 'Mcp-Session-Id:'), [['header الجلسة في HTTP', 'the session header over HTTP'], ['التوكن', 'the token'], ['اسم الأداة', 'the tool name']], 0, B('جلسة.', 'Session.')),
        Q(B('client معاه توكن بس مش مسموحله بالأداة:', 'A client with a token but not allowed the tool:'), [['403', '403'], ['200', '200'], ['500', '500']], 0, B('صلاحية.', 'Permission.')),
        Q(B('إزالة أداة من السيرفر:', 'Removing a tool from the server:'), [['breaking change', 'a breaking change'], ['patch', 'a patch'], ['مش مهم', 'unimportant']], 0, B('major.', 'Major.')),
        Q(B('npx -y shop-mcp@1.2.0:', 'npx -y shop-mcp@1.2.0:'), [['يشغّل نسخة مثبّتة من npm', 'runs a pinned version from npm'], ['يحذف الحزمة', 'deletes the package'], ['ينشر', 'publishes']], 0, B('تثبيت.', 'Pinning.'))
      ] }
  ]
};
