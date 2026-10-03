// JavaScript week 37 — The Claude API in Node and TypeScript: streaming and tools.
// SDK calls are shown only (they need a key and the network); request building, SSE parsing, the tool loop,
// validation and abort/retry logic run in Node with built-ins and a scripted fake model.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('Claude API في Node وTypeScript: streaming وأدوات', 'The Claude API in Node and TypeScript: streaming and tools'),
  goal: B('توصّل تطبيقات JavaScript بـ Claude باحتراف: نداءات بالـ SDK الرسمي وأنواع TypeScript، ردود بتظهر حرف بحرف بالـ streaming لحد المتصفح، أدوات بلفة تحت سيطرتك، مخرجات منظمة متحقق منها، وإدارة الأخطاء والتكلفة والإلغاء.',
          'Connect JavaScript apps to Claude professionally: calls with the official SDK and TypeScript types, replies appearing word by word with streaming all the way to the browser, tools in a loop you control, validated structured output, and handling errors, cost and cancellation.'),
  days: [
    { title: B('أول نداء بالـ SDK', 'A first call with the SDK'),
      goal: B('طلب ورد بأنواع واضحة.', 'A request and reply with clear types.'),
      learn: [
        L(B('الـ SDK الرسمي', 'The official SDK'),
          B('**anthropic sdk** لـ JavaScript (`@anthropic-ai/sdk`) شغال في Node وDeno وBun وWorkers. المفتاح من `ANTHROPIC_API_KEY` (متحطوش في كود المتصفح أبدًا — النداء من السيرفر). الـ **messages api**: `model` و**max_tokens** و`messages`، و**system prompt** اختياري. الرد فيه **content block** list و`stop_reason` و`usage`.', 'The JavaScript **anthropic sdk** (`@anthropic-ai/sdk`) runs in Node, Deno, Bun and Workers. The key comes from `ANTHROPIC_API_KEY` (never put it in browser code — call from the server). The **messages api**: `model`, **max_tokens** and `messages`, with an optional **system prompt**. The reply has a **content block** list, a `stop_reason` and `usage`.'),
          '// npm i @anthropic-ai/sdk        (key in .env: ANTHROPIC_API_KEY=…, loaded with process.loadEnvFile())\nimport Anthropic from "@anthropic-ai/sdk";\n\nprocess.loadEnvFile?.();\nconst client = new Anthropic();\n\nconst msg = await client.messages.create({\n  model: "claude-opus-5-5",\n  max_tokens: 16000,\n  system: "You reply to customers of a small Egyptian shop in Egyptian Arabic. Be brief and kind.",\n  messages: [{ role: "user", content: "الطلب بتاعي اتأخر يومين، هيوصل امتى؟" }],\n});\nconst text = msg.content.filter(b => b.type === "text").map(b => b.text).join("");\nconsole.log(text);\nconsole.log(msg.stop_reason, msg.usage.input_tokens, msg.usage.output_tokens);', S),
        L(B('أنواع TypeScript', 'TypeScript types'),
          B('الـ SDK مكتوب بـ TypeScript: `Anthropic.MessageParam` و`Anthropic.ContentBlock` بيمسكوا الأخطاء وقت الكتابة. استخدم type guard عشان تاخد النص من الـ blocks بأمان (`b.type === "text"` بيضيّق النوع).', 'The SDK is written in TypeScript: `Anthropic.MessageParam` and `Anthropic.ContentBlock` catch mistakes as you type. Use a type guard to take the text from blocks safely (`b.type === "text"` narrows the type).'),
          'import Anthropic from "@anthropic-ai/sdk";\n\nconst client = new Anthropic();\nconst history: Anthropic.MessageParam[] = [];\n\nfunction textOf(blocks: Anthropic.ContentBlock[]): string {\n  return blocks.filter((b): b is Anthropic.TextBlock => b.type === "text").map(b => b.text).join("");\n}\n\nexport async function chat(userText: string): Promise<string> {\n  history.push({ role: "user", content: userText });\n  const msg = await client.messages.create({ model: "claude-opus-5-5", max_tokens: 16000, messages: history });\n  history.push({ role: "assistant", content: msg.content });   // the API remembers nothing: we keep the history\n  return textOf(msg.content);\n}', { lang: 'ts' }),
        L(B('التكلفة بالتوكنز', 'Cost in tokens'),
          B('كل رد فيه `usage` بعدد الـ **token** (الداخل والخارج). سجّلهم مع كل طلب واحسب التكلفة — العربي بياخد توكنز أكتر من الإنجليزي لنفس المعنى. المثال بيحسب ميزانية شهرية (الأسعار أمثلة؛ راجع صفحة التسعير).', 'Every reply carries `usage` with the **token** counts (in and out). Log them with every request and compute the cost — Arabic takes more tokens than English for the same meaning. The example estimates a monthly budget (prices are examples; check the pricing page).'),
          'const PRICES = { "claude-opus-5-5": [4, 20], "claude-sonnet-5-5": [2, 10], "claude-haiku-4-5": [1, 5] };   // USD per million tokens — check the pricing page\nconst cost = (model, input, output) => (input * PRICES[model][0] + output * PRICES[model][1]) / 1e6;\n\nconst perMonth = { requests: 3000, input: 900, output: 250 };      // a support assistant\nfor (const model of Object.keys(PRICES)) {\n  const c = cost(model, perMonth.requests * perMonth.input, perMonth.requests * perMonth.output);\n  console.log(model.padEnd(18), "$" + c.toFixed(2), "/ month");\n}', N())
      ],
      practice: [
        B('اعمل سكربت Node بيبعت سؤال ويطبع الرد والـ usage.', 'Write a Node script sending a question and printing the reply and usage.'),
        B('حوّله لـ TypeScript بـ MessageParam.', 'Convert it to TypeScript with MessageParam.'),
        B('اعمل محادثة متعددة الأدوار بتحفظ التاريخ.', 'Build a multi-turn chat that keeps history.'),
        B('احسب تكلفة استخدامك الشهري.', 'Compute your monthly usage cost.')
      ],
      words: [
        W('anthropic sdk', 'مكتبة Claude الرسمية', 'the official Claude client library', 'Install the Anthropic SDK with npm.'),
        W('messages api', 'واجهة الرسايل في Claude', 'Claude’s main request/response API', 'The Messages API takes a list of turns.'),
        W('system prompt', 'التعليمات الثابتة للنموذج', 'standing instructions for the model', 'The system prompt sets the tone.'),
        W('max_tokens', 'أقصى طول للرد', 'the maximum reply length in tokens', 'Set max_tokens for every call.'),
        W('content block', 'جزء من محتوى الرد', 'one piece of a reply’s content', 'Read the text from each content block.'),
        W('token', 'وحدة النص اللي النموذج بيعدّها', 'the unit of text a model counts', 'Arabic uses more tokens per word.'),
        W('conversation history', 'تاريخ المحادثة', 'the earlier turns sent with each request', 'Trim the conversation history when it grows.')
      ],
      read: ['lib:Anthropic TypeScript SDK', { lib: 'Claude API docs', what: B('اقرا Messages وModels.', 'Read Messages and Models.') }],
      challenge: B('اعمل CLI بـ TypeScript (`node main.ts`) لمساعد رد على العملاء: system prompt بالمصري، محادثة بتتحفظ في ملف JSON، طباعة usage وتكلفة كل رد — والمفتاح من .env بس.', 'Build a TypeScript CLI (`node main.ts`) for a customer-reply assistant: an Egyptian-Arabic system prompt, a conversation saved to a JSON file, usage and cost printed per reply — with the key only from .env.'),
      quiz: [
        Q(B('مفتاح الـ API في كود المتصفح:', 'The API key in browser code:'), [['لأ أبدًا: النداء من السيرفر', 'never: call from the server'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('سر.', 'A secret.')),
        Q(B('الـ API بيفتكر المحادثة؟', 'Does the API remember the chat?'), [['لأ: انت بتبعت التاريخ', 'no: you send the history'], ['أيوه دايمًا', 'yes, always'], ['أحيانًا', 'sometimes']], 0, B('stateless.', 'Stateless.')),
        Q(B('usage فيه:', 'usage contains:'), [['عدد التوكنز الداخلة والخارجة', 'input and output token counts'], ['اسم المستخدم', 'the user name'], ['المفتاح', 'the key']], 0, B('تكلفة.', 'Cost.'))
      ] },

    { title: B('الـ streaming', 'Streaming'),
      goal: B('الرد يظهر وهو بيتكتب.', 'The reply appears as it is written.'),
      learn: [
        L(B('ليه streaming', 'Why streaming'),
          B('رد طويل ممكن ياخد 20 ثانية؛ المستخدم مش هيستنى شاشة فاضية. **streaming** = الرد بيوصل حتة حتة. في الـ SDK: `client.messages.stream(...)` بـ event `text`، و`finalMessage()` في الآخر فيه الرد كامل والـ usage.', 'A long reply can take 20 seconds; users will not wait at a blank screen. **streaming** = the reply arrives piece by piece. In the SDK: `client.messages.stream(...)` with a `text` event, and `finalMessage()` at the end containing the full reply and usage.'),
          'import Anthropic from "@anthropic-ai/sdk";\nconst client = new Anthropic();\n\nconst stream = client.messages.stream({\n  model: "claude-opus-5-5",\n  max_tokens: 16000,\n  messages: [{ role: "user", content: "اكتب وصف منتج لشنطة ضهر جلد في 4 جمل." }],\n});\nstream.on("text", delta => process.stdout.write(delta));      // print as it arrives\nconst final = await stream.finalMessage();\nconsole.log("\\n", final.stop_reason, final.usage.output_tokens);', S),
        L(B('شكل الـ events', 'The event format'),
          B('تحت الـ SDK الرد بيوصل events بصيغة SSE: `message_start`، `content_block_start`، **content_block_delta** فيها **text_delta**، وفي الآخر **message_stop**. لو بتكلّم الـ API من غير SDK (Workers، n8n Code node) لازم تفك ده بنفسك. المثال بيفك stream نصي.', 'Under the SDK the reply arrives as SSE events: `message_start`, `content_block_start`, **content_block_delta** carrying a **text_delta**, and finally **message_stop**. If you call the API without the SDK (Workers, an n8n Code node) you must parse this yourself. The example parses a text stream.'),
          'const raw = [\n  \'event: message_start\\ndata: {"type":"message_start","message":{"id":"msg_1","usage":{"input_tokens":12}}}\\n\\n\',\n  \'event: content_block_delta\\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"الطلب "}}\\n\\n\',\n  \'event: content_block_delta\\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"هيوصل "}}\\n\\nevent: content_block_del\',\n  \'ta\\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"بكرة."}}\\n\\n\',\n  \'event: message_delta\\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":9}}\\n\\nevent: message_stop\\ndata: {"type":"message_stop"}\\n\\n\',\n];   // chunks split anywhere — even mid-event\n\nlet buffer = "", text = "", stop = null;\nfor (const chunk of raw) {\n  buffer += chunk;\n  let i;\n  while ((i = buffer.indexOf("\\n\\n")) !== -1) {\n    const block = buffer.slice(0, i); buffer = buffer.slice(i + 2);\n    const data = block.split("\\n").find(l => l.startsWith("data: "));\n    if (!data) continue;\n    const ev = JSON.parse(data.slice(6));\n    if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") { text += ev.delta.text; console.log("so far:", text); }\n    if (ev.type === "message_delta") stop = ev.delta.stop_reason;\n  }\n}\nconsole.log("final:", text, "| stop:", stop);', N()),
        L(B('لحد المتصفح', 'All the way to the browser'),
          B('السيرفر بيستقبل stream من Claude ويبعته للمتصفح (SSE من أسبوع 35، أو body بيتكتب تدريجيًا). في المتصفح: `fetch` و`response.body.getReader()` مع **textdecoder** وبتضيف النص للصفحة. والمستخدم يقدر يلغي بـ AbortController.', 'The server receives a stream from Claude and forwards it to the browser (SSE from week 35, or a body written gradually). In the browser: `fetch` and `response.body.getReader()` with a **textdecoder**, appending text to the page. And the user can cancel with an AbortController.'),
          '// server (Express)\napp.post("/api/describe", async (req, res) => {\n  res.setHeader("Content-Type", "text/plain; charset=utf-8");\n  const stream = client.messages.stream({ model: "claude-opus-5-5", max_tokens: 16000,\n                                          messages: [{ role: "user", content: req.body.prompt }] });\n  req.on("close", () => stream.abort());              // the user left → stop paying for tokens\n  stream.on("text", t => res.write(t));\n  await stream.finalMessage(); res.end();\n});\n\n// browser\nconst ctrl = new AbortController();\nstopButton.onclick = () => ctrl.abort();\nconst res = await fetch("/api/describe", { method: "POST", body: JSON.stringify({ prompt }), headers: { "content-type": "application/json" }, signal: ctrl.signal });\nconst reader = res.body.getReader(), decoder = new TextDecoder();\nfor (;;) {\n  const { value, done } = await reader.read();\n  if (done) break;\n  output.textContent += decoder.decode(value, { stream: true });   // stream: true keeps split UTF-8 (Arabic!) intact\n}', S)
      ],
      practice: [
        B('اعمل سكربت بيطبع الرد وهو بيتكتب.', 'Write a script printing the reply as it is written.'),
        B('فك events SSE بإيدك من غير SDK.', 'Parse SSE events by hand without the SDK.'),
        B('ابعت الـ stream للمتصفح واعرضه.', 'Forward the stream to the browser and display it.'),
        B('ضيف زرار إيقاف بيلغي الطلب فعلًا.', 'Add a stop button that really cancels the request.')
      ],
      words: [
        W('streaming', 'الرد بيوصل حتة حتة', 'receiving a reply in pieces as it is generated', 'Streaming makes long replies feel fast.'),
        W('content_block_delta', 'event بحتة نص جديدة', 'the event carrying a new piece of content', 'Append each content_block_delta to the text.'),
        W('text_delta', 'حتة النص في الـ delta', 'the text fragment inside a delta', 'A text_delta may hold half a word.'),
        W('message_stop', 'event نهاية الرسالة', 'the event marking the end of a message', 'Close the connection after message_stop.'),
        W('textdecoder', 'تحويل البايتات لنص', 'converting bytes to text', 'Use TextDecoder with stream: true for Arabic.'),
        W('readablestream', 'stream للقراية في المتصفح وNode', 'a readable stream of data chunks', 'response.body is a ReadableStream.')
      ],
      read: [{ lib: 'Claude API docs', what: B('اقرا Streaming Messages.', 'Read Streaming Messages.') }],
      challenge: B('اعمل صفحة «كاتب أوصاف المنتجات»: Express بيعمل stream من Claude للمتصفح، الصفحة بتعرض النص وهو بيتكتب، زرار إيقاف بيلغي الطلب ويوقّف الدفع، وعرض الـ usage في الآخر — وجرّبه بالعربي.', 'Build a «product description writer» page: Express streams from Claude to the browser, the page shows text as it is written, a stop button cancels the request and stops the billing, and usage is shown at the end — and test it in Arabic.'),
      quiz: [
        Q(B('النص الجديد في الـ stream بييجي في:', 'New text in the stream arrives in:'), [['content_block_delta / text_delta', 'content_block_delta / text_delta'], ['message_start', 'message_start'], ['headers', 'headers']], 0, B('delta.', 'Delta.')),
        Q(B('chunk ممكن يتقطع في نص event:', 'A chunk may split mid-event:'), [['خزّن في buffer لحد سطر فاضي', 'buffer until a blank line'], ['ارمي الباقي', 'drop the rest'], ['JSON.parse على طول', 'JSON.parse at once']], 0, B('buffer.', 'Buffer.')),
        Q(B('TextDecoder مع العربي:', 'TextDecoder with Arabic:'), [['{ stream: true }', '{ stream: true }'], ['من غير خيارات', 'no options'], ['مش محتاجه', 'not needed']], 0, B('UTF-8.', 'UTF-8.'))
      ] },

    { title: B('الأدوات', 'Tools'),
      goal: B('النموذج يطلب وكودك ينفّذ.', 'The model asks, your code acts.'),
      learn: [
        L(B('تعريف الأدوات', 'Defining tools'),
          B('**tool use**: بتبعت قايمة أدوات (اسم، وصف، **input_schema** بـ JSON Schema). لو النموذج محتاج أداة، الرد بيبقى `stop_reason: "tool_use"` ومعاه block نوعه **tool_use** فيه id وname وinput. بتنفّذ وبترجّع **tool_result** بنفس الـ id في رسالة user. و**tool_choice** بيجبره يستخدم أداة معينة لو لازم.', '**tool use**: you send a list of tools (name, description, **input_schema** in JSON Schema). If the model needs a tool, the reply has `stop_reason: "tool_use"` with a **tool_use** block holding an id, name and input. You run it and return a **tool_result** with the same id in a user message. And **tool_choice** forces a specific tool when needed.'),
          'const tools = [{\n  name: "get_order",\n  description: "Look up an order by its number. Use it whenever the customer mentions an order number.",\n  input_schema: {\n    type: "object",\n    properties: { order_id: { type: "integer", description: "e.g. 1042" } },\n    required: ["order_id"],\n  },\n}];\nconst msg = await client.messages.create({ model: "claude-opus-5-5", max_tokens: 16000, tools,\n  messages: [{ role: "user", content: "فين الطلب 1042؟" }] });\nconsole.log(msg.stop_reason);                                    // "tool_use"\nconsole.log(msg.content.find(b => b.type === "tool_use"));      // { type: "tool_use", id: "toolu_…", name: "get_order", input: { order_id: 1042 } }', S),
        L(B('اللفة بإيدك', 'The loop by hand'),
          B('اللفة: ابعت ← لو tool_use نفّذ كل الـ blocks (ممكن كذا واحد مع بعض) ← رجّع كل النتايج في رسالة user واحدة ← كرر لحد end_turn أو حد أقصى. الأخطاء بترجع `is_error: true` عشان النموذج يصلّح. المثال بنموذج وهمي بيشتغل من غير API.', 'The loop: send → if tool_use, run every block (there may be several together) → return all results in one user message → repeat until end_turn or a ceiling. Errors go back with `is_error: true` so the model can correct itself. The example uses a fake model and runs without the API.'),
          'const script = [\n  { stop_reason: "tool_use", content: [{ type: "tool_use", id: "t1", name: "get_order", input: { order_id: 1042 } },\n                                     { type: "tool_use", id: "t2", name: "get_order", input: { order_id: "x" } }] },\n  { stop_reason: "end_turn", content: [{ type: "text", text: "الطلب 1042 اتشحن وهيوصل بكرة. رقم «x» مش صحيح، ابعتلي الرقم تاني." }] },\n];\nconst fakeModel = (() => { let i = 0; return async () => script[i++]; })();\nconst tools = {\n  get_order: ({ order_id }) => {\n    if (!Number.isInteger(order_id)) throw new Error("order_id must be an integer");\n    return { id: order_id, status: "shipped", eta: "2026-10-05" };\n  },\n};\n\nasync function runAgent(question, maxTurns = 6) {\n  const messages = [{ role: "user", content: question }];\n  for (let turn = 1; turn <= maxTurns; turn++) {\n    const reply = await fakeModel(messages);\n    messages.push({ role: "assistant", content: reply.content });\n    if (reply.stop_reason !== "tool_use") return reply.content.find(b => b.type === "text").text;\n    const results = reply.content.filter(b => b.type === "tool_use").map(b => {\n      try { return { type: "tool_result", tool_use_id: b.id, content: JSON.stringify(tools[b.name](b.input)) }; }\n      catch (e) { return { type: "tool_result", tool_use_id: b.id, content: e.message, is_error: true }; }\n    });\n    console.log("tool results:", results.map(r => (r.is_error ? "error: " : "") + r.content));\n    messages.push({ role: "user", content: results });          // all results in ONE message\n  }\n  return "stopped: too many turns";\n}\nconsole.log(await runAgent("فين الطلب 1042 والطلب x؟"));', N()),
        L(B('الـ tool runner', 'The tool runner'),
          B('الـ SDK فيه **tool runner** (beta) بيلف اللفة لوحده، ومع zod بيعمل الـ schema ويتحقق من المدخلات. مريح — بس افهم اللفة اليدوية الأول، وحط برضه حد أقصى وموافقة بشرية للأدوات اللي بتعمل حاجة (أسبوع 38 في رحلة Python بالتفصيل). راجع الـ README لاسم الـ helper في نسختك.', 'The SDK has a **tool runner** (beta) that runs the loop for you, and with zod it builds the schema and validates input. Convenient — but understand the manual loop first, and still add a ceiling and human approval for tools that act (covered in depth in week 38 of the Python journey). Check the README for the helper’s name in your version.'),
          'import Anthropic from "@anthropic-ai/sdk";\nimport { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";\nimport { z } from "zod";\n\nconst client = new Anthropic();\nconst getOrder = betaZodTool({\n  name: "get_order",\n  description: "Look up an order by number.",\n  inputSchema: z.object({ order_id: z.number().int() }),\n  run: async ({ order_id }) => JSON.stringify(await db.orders.find(order_id)),\n});\n\nconst final = await client.beta.messages.toolRunner({\n  model: "claude-opus-5-5", max_tokens: 16000, max_iterations: 6,\n  tools: [getOrder],\n  messages: [{ role: "user", content: "فين الطلب 1042؟" }],\n});\nconsole.log(final.content);', { lang: 'ts' })
      ],
      practice: [
        B('عرّف 3 أدوات لمتجر بأوصاف كويسة.', 'Define 3 shop tools with good descriptions.'),
        B('شغّل اللفة الوهمية وزوّد أداة.', 'Run the fake loop and add a tool.'),
        B('جرّب tool_choice تجبر أداة معينة.', 'Try tool_choice forcing a specific tool.'),
        B('جرّب الـ tool runner بـ zod لو عندك مفتاح.', 'Try the tool runner with zod if you have a key.')
      ],
      words: [
        W('tool use', 'استخدام النموذج للأدوات', 'a model calling functions you define', 'Tool use lets Claude look up orders.'),
        W('tool_use', 'block طلب تشغيل أداة', 'the block asking to run a tool', 'Each tool_use block has an id.'),
        W('tool_result', 'block نتيجة الأداة', 'the block returning a tool’s output', 'Send the tool_result with the same id.'),
        W('input_schema', 'شكل مدخلات الأداة', 'the JSON Schema of a tool’s input', 'The input_schema marks order_id as required.'),
        W('tool_choice', 'اختيار أو إجبار أداة', 'controlling which tool the model uses', 'Force extraction with tool_choice.'),
        W('tool runner', 'أداة بتلف لفة الأدوات لوحدها', 'an SDK helper running the tool loop', 'The tool runner stops at max_iterations.')
      ],
      read: [{ t: 'Claude docs: Tool use', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', what: B('اقرا How tool use works.', 'Read How tool use works.') }],
      challenge: B('ابني «مساعد الطلبات» في Node: 3 أدوات (طلب، شحنة، إلغاء بموافقة)، لفة يدوية بحد أقصى ونتايج كلها في رسالة واحدة وأخطاء بـ is_error، fake model للاختبار بـ node:test — وتشغيل حقيقي لو فيه مفتاح.', 'Build an «orders assistant» in Node: 3 tools (order, shipment, cancel with approval), a manual loop with a ceiling, all results in one message and errors with is_error, a fake model for tests with node:test — and a real run if you have a key.'),
      quiz: [
        Q(B('stop_reason = "tool_use":', 'stop_reason = "tool_use":'), [['نفّذ الأدوات ورجّع النتايج', 'run the tools and return results'], ['الرد خلص', 'the reply is done'], ['خطأ', 'an error']], 0, B('لفة.', 'Loop.')),
        Q(B('أداتين في نفس الرد:', 'Two tools in one reply:'), [['النتيجتين في رسالة user واحدة', 'both results in one user message'], ['رسالتين', 'two messages'], ['أول واحدة بس', 'only the first']], 0, B('parallel.', 'Parallel.')),
        Q(B('مدخل غلط للأداة:', 'Bad tool input:'), [['tool_result بـ is_error', 'a tool_result with is_error'], ['crash', 'crash'], ['تجاهل', 'ignore']], 0, B('تصحيح.', 'Self-correction.'))
      ] },

    { title: B('مخرجات منظمة', 'Structured output'),
      goal: B('JSON مضمون الشكل من نص حر.', 'Reliably shaped JSON from free text.'),
      learn: [
        L(B('استخراج بأداة إجبارية', 'Extraction with a forced tool'),
          B('عايز **structured output** (حقول من رسالة واتساب أو فاتورة)؟ أضمن طريقة: عرّف أداة «وهمية» بـ **json schema** للشكل المطلوب، واجبر النموذج يستخدمها بـ `tool_choice: {type: "tool", name}`. المدخلات اللي النموذج بيبعتها للأداة هي البيانات المنظمة نفسها.', 'Want **structured output** (fields from a WhatsApp message or an invoice)? The most reliable way: define a «pseudo» tool with a **json schema** for the desired shape, and force the model to use it with `tool_choice: {type: "tool", name}`. The input the model sends to the tool is the structured data itself.'),
          'const extractOrder = {\n  name: "record_order_request",\n  description: "Record the order request found in the customer message.",\n  input_schema: {\n    type: "object",\n    properties: {\n      customer_name: { type: "string" },\n      phone: { type: ["string", "null"] },\n      city: { type: ["string", "null"] },\n      items: { type: "array", items: { type: "object", properties: { name: { type: "string" }, qty: { type: "integer" } }, required: ["name", "qty"] } },\n      urgency: { type: "string", enum: ["low", "normal", "high"] },\n    },\n    required: ["customer_name", "items", "urgency"],\n  },\n};\nconst msg = await client.messages.create({\n  model: "claude-opus-5-5", max_tokens: 16000,\n  tools: [extractOrder], tool_choice: { type: "tool", name: "record_order_request" },\n  messages: [{ role: "user", content: "أنا منى من المنصورة، عايزة 2 كشكول وشنطة ضروري قبل الخميس. 01012345678" }],\n});\nconst order = msg.content.find(b => b.type === "tool_use").input;   // already shaped like the schema', S),
        L(B('اتحقق برضه', 'Validate anyway'),
          B('النموذج ممكن يغلط أحيانًا (حقل ناقص، enum غلط). اتحقق قبل ما تحفظ: بـ zod في المشروع الحقيقي، والمثال بـ validator صغير. ولو فشل: أعد الطلب مرة ومعاه رسالة الخطأ، ولو فشل تاني حوّل لإنسان.', 'The model may occasionally err (a missing field, a wrong enum). Validate before saving: with zod in a real project; the example uses a small validator. If it fails: retry once including the error message, and if it fails again, hand it to a person.'),
          'function validateOrder(o) {\n  const errors = [];\n  if (typeof o.customer_name !== "string" || !o.customer_name.trim()) errors.push("customer_name required");\n  if (!Array.isArray(o.items) || o.items.length === 0) errors.push("items must be a non-empty array");\n  for (const [i, it] of (o.items ?? []).entries())\n    if (!Number.isInteger(it.qty) || it.qty < 1) errors.push(`items[${i}].qty must be a positive integer`);\n  if (!["low", "normal", "high"].includes(o.urgency)) errors.push(`urgency «${o.urgency}» not allowed`);\n  if (o.phone && !/^01[0125]\\d{8}$/.test(o.phone)) errors.push("phone is not an Egyptian mobile");\n  return errors;\n}\nconst good = { customer_name: "منى", phone: "01012345678", city: "المنصورة", items: [{ name: "كشكول", qty: 2 }, { name: "شنطة", qty: 1 }], urgency: "high" };\nconst bad = { customer_name: "", items: [{ name: "قلم", qty: 0 }], urgency: "urgent", phone: "123" };\nconsole.log("good:", validateOrder(good));\nconsole.log("bad: ", validateOrder(bad));', N()),
        L(B('صور وPDF', 'Images and PDFs'),
          B('Claude بيقرا صور وPDF: block نوعه `image` أو `document` بـ base64 (أو URL). مفيد لفواتير الموردين وصور الإيصالات. خلي بالك من الحجم (اضغط الصور) والخصوصية (متبعتش بيانات حساسة من غير داعي). ونفس فكرة الأداة الإجبارية لاستخراج الحقول.', 'Claude reads images and PDFs: a block of type `image` or `document` in base64 (or by URL). Useful for supplier invoices and receipt photos. Mind the size (compress images) and privacy (do not send sensitive data needlessly). And the same forced-tool idea extracts the fields.'),
          'import { readFile } from "node:fs/promises";\n\nconst pdf = (await readFile("invoice.pdf")).toString("base64");\nconst msg = await client.messages.create({\n  model: "claude-opus-5-5", max_tokens: 16000,\n  tools: [recordInvoice], tool_choice: { type: "tool", name: "record_invoice" },\n  messages: [{ role: "user", content: [\n    { type: "document", source: { type: "base64", media_type: "application/pdf", data: pdf } },\n    { type: "text", text: "Extract the supplier, invoice number, date, VAT and total." },\n  ] }],\n});', S)
      ],
      practice: [
        B('اعمل أداة إجبارية لاستخراج طلب من رسالة.', 'Build a forced tool to extract an order from a message.'),
        B('اكتب validator (أو zod) للشكل.', 'Write a validator (or zod schema) for the shape.'),
        B('أعد المحاولة مرة برسالة الخطأ.', 'Retry once with the error message.'),
        B('استخرج حقول من PDF فاتورة تجربة.', 'Extract fields from a test invoice PDF.')
      ],
      words: [
        W('structured output', 'مخرجات منظمة بشكل محدد', 'output in a defined machine-readable shape', 'Use a forced tool for structured output.'),
        W('json schema', 'وصف شكل بيانات JSON', 'a description of a JSON shape', 'The JSON schema lists required fields.'),
        W('forced tool', 'أداة إجبارية للاستخراج', 'a tool the model must call', 'A forced tool returns clean fields.'),
        W('validation retry', 'إعادة المحاولة بعد فشل التحقق', 'retrying with the validation errors', 'One validation retry fixed most failures.'),
        W('base64 image', 'صورة مشفرة نصيًا', 'an image encoded as base64 text', 'Send the receipt as a base64 image.')
      ],
      read: [{ lib: 'Zod', what: B('راجع object وenum وsafeParse.', 'Review object, enum and safeParse.') }],
      challenge: B('اعمل «مستخرج طلبات واتساب» بـ TypeScript: أداة إجبارية بـ schema كامل، تحقق بـ zod، إعادة محاولة واحدة برسالة الخطأ، تحويل لإنسان بعدها، و20 رسالة اختبار (عربي وإنجليزي وفرانكو) بنتيجة متوقعة.', 'Build a «WhatsApp order extractor» in TypeScript: a forced tool with a full schema, zod validation, one retry with the error message, hand-off to a person after that, and 20 test messages (Arabic, English and Franco-Arabic) with expected results.'),
      quiz: [
        Q(B('أضمن طريقة لـ JSON بشكل محدد:', 'The most reliable way to get shaped JSON:'), [['أداة إجبارية بـ schema', 'a forced tool with a schema'], ['«رجّع JSON لو سمحت»', '«return JSON please»'], ['regex على النص', 'a regex on the text']], 0, B('schema.', 'Schema.')),
        Q(B('قبل الحفظ:', 'Before saving:'), [['اتحقق بـ zod أو validator', 'validate with zod or a validator'], ['ثق في النموذج', 'trust the model'], ['احفظ وخلاص', 'just save']], 0, B('تحقق.', 'Validation.')),
        Q(B('فشل التحقق مرتين:', 'Validation fails twice:'), [['حوّل لإنسان', 'hand it to a person'], ['أعد للأبد', 'retry forever'], ['احذف', 'delete it']], 0, B('حد.', 'A limit.'))
      ] },

    { title: B('في الإنتاج', 'In production'),
      goal: B('أخطاء وحدود وتكلفة تحت السيطرة.', 'Errors, limits and cost under control.'),
      learn: [
        L(B('الأخطاء وإعادة المحاولة', 'Errors and retries'),
          B('الـ SDK بيعيد المحاولة لوحده على 429 و5xx و**overloaded** (مرتين افتراضيًا) بـ **exponential backoff** — ظبطها بـ `maxRetries` و`timeout`. امسك الأنواع: `Anthropic.RateLimitError`، `APIConnectionError`، `APIError`. واتأكد من `stop_reason`: `max_tokens` = الرد اتقطع.', 'The SDK retries by itself on 429, 5xx and **overloaded** (twice by default) with **exponential backoff** — tune it with `maxRetries` and `timeout`. Catch the types: `Anthropic.RateLimitError`, `APIConnectionError`, `APIError`. And check `stop_reason`: `max_tokens` = the reply was cut off.'),
          'import Anthropic from "@anthropic-ai/sdk";\n\nconst client = new Anthropic({ maxRetries: 4, timeout: 60_000 });\n\nasync function ask(content) {\n  try {\n    const msg = await client.messages.create({ model: "claude-opus-5-5", max_tokens: 16000, messages: [{ role: "user", content }] });\n    if (msg.stop_reason === "max_tokens") console.warn("reply was cut off");\n    return msg;\n  } catch (e) {\n    if (e instanceof Anthropic.RateLimitError) return queueForLater(content);       // still limited after retries\n    if (e instanceof Anthropic.APIConnectionError) throw new Error("network problem", { cause: e });\n    if (e instanceof Anthropic.APIError) throw new Error(`Claude API ${e.status}`, { cause: e });\n    throw e;\n  }\n}', S),
        L(B('backoff وإلغاء', 'Backoff and cancellation'),
          B('لما بتكتب retries بنفسك (API تانية أو fetch مباشر): exponential backoff مع jitter عشوائي، واحترم header `retry-after`، وحط سقف للمحاولات والوقت الكلي. وAbortController بيلغي طلب طوّل أو المستخدم مشي. المثال بيشغّل الاتنين في Node.', 'When you write retries yourself (another API or direct fetch): exponential backoff with random jitter, respect the `retry-after` header, and cap both attempts and total time. And AbortController cancels a request that took too long or whose user left. The example runs both in Node.'),
          'const sleep = (ms, signal) => new Promise((res, rej) => {\n  const t = setTimeout(res, ms);\n  signal?.addEventListener("abort", () => { clearTimeout(t); rej(signal.reason); }, { once: true });\n});\nlet calls = 0;\nasync function flakyApi() {                                  // fails twice with 529, then succeeds\n  calls++;\n  if (calls < 3) { const e = new Error("overloaded"); e.status = 529; e.retryAfter = calls === 1 ? 0.05 : null; throw e; }\n  return { ok: true, calls };\n}\nasync function withRetry(fn, { attempts = 5, base = 40, signal } = {}) {\n  for (let i = 1; ; i++) {\n    try { return await fn(); }\n    catch (e) {\n      if (i >= attempts || ![429, 500, 502, 503, 529].includes(e.status)) throw e;\n      const wait = e.retryAfter ? e.retryAfter * 1000 : base * 2 ** (i - 1) * (0.5 + Math.random());\n      console.log(`attempt ${i} failed (${e.status}); waiting ${Math.round(wait)} ms`);\n      await sleep(wait, signal);\n    }\n  }\n}\nconsole.log(await withRetry(flakyApi));\n\nconst ctrl = new AbortController();\nsetTimeout(() => ctrl.abort(new Error("user left")), 30);\ntry { await sleep(5000, ctrl.signal); } catch (e) { console.log("cancelled:", e.message); }', N()),
        L(B('prompt caching', 'Prompt caching'),
          B('لو فيه جزء كبير ثابت بيتبعت في كل طلب (system prompt طويل، كتالوج، سياسات): **prompt caching** بـ `cache_control: { type: "ephemeral" }` على آخر block ثابت. الطلبات اللي بعده بتقرا الجزء ده من الكاش بتكلفة أقل بكتير وأسرع. شوف `usage.cache_read_input_tokens` تتأكد إنه شغال.', 'If a large fixed part is sent with every request (a long system prompt, a catalogue, policies): **prompt caching** with `cache_control: { type: "ephemeral" }` on the last fixed block. Later requests read that part from the cache at a much lower cost and faster. Check `usage.cache_read_input_tokens` to confirm it works.'),
          'const POLICIES = await readFile("policies.md", "utf8");          // ~20,000 tokens, the same for every request\n\nconst msg = await client.messages.create({\n  model: "claude-opus-5-5", max_tokens: 16000,\n  system: [\n    { type: "text", text: "You answer questions about the shop\'s policies. Cite the section." },\n    { type: "text", text: POLICIES, cache_control: { type: "ephemeral" } },   // cached prefix\n  ],\n  messages: [{ role: "user", content: question }],\n});\nconsole.log(msg.usage.cache_creation_input_tokens, msg.usage.cache_read_input_tokens);', S)
      ],
      practice: [
        B('ظبّط maxRetries وtimeout وامسك أنواع الأخطاء.', 'Set maxRetries and timeout and catch the error types.'),
        B('اكتب withRetry بـ jitter واحترم retry-after.', 'Write withRetry with jitter and respect retry-after.'),
        B('ضيف AbortController لطلب طويل.', 'Add an AbortController to a long request.'),
        B('فعّل prompt caching وقيس الفرق في التكلفة.', 'Enable prompt caching and measure the cost difference.')
      ],
      words: [
        W('overloaded', 'الخدمة عليها ضغط مؤقت', 'a temporary capacity error', 'Retry overloaded errors with backoff.'),
        W('exponential backoff', 'انتظار بيتضاعف بين المحاولات', 'waiting longer after each failure', 'Exponential backoff with jitter avoids storms.'),
        W('retry budget', 'سقف المحاولات والوقت الكلي', 'a cap on attempts and total retry time', 'A retry budget of 5 attempts or 60 s.'),
        W('maxretries', 'أقصى عدد إعادات في الـ SDK', 'the SDK’s retry limit', 'Set maxRetries to four.'),
        W('prompt caching', 'تخزين جزء البرومبت الثابت', 'reusing a fixed prompt prefix cheaply', 'Prompt caching cut costs by 70%.'),
        W('cache_control', 'علامة الجزء اللي يتخزّن', 'the marker for the cached prefix', 'Put cache_control on the policies block.')
      ],
      read: [{ lib: 'Claude API docs', what: B('اقرا Prompt caching وErrors.', 'Read Prompt caching and Errors.') }],
      challenge: B('خلّي «مساعد السياسات» جاهز للإنتاج: retries وtimeouts وأنواع أخطاء، AbortController لما المستخدم يقفل، prompt caching للسياسات بقياس قبل وبعد، لوج بـ usage وتكلفة لكل طلب، وسقف تكلفة يومي.', 'Make the «policy assistant» production-ready: retries, timeouts and error types, AbortController when the user leaves, prompt caching for the policies with before/after measurements, a log of usage and cost per request, and a daily cost cap.'),
      quiz: [
        Q(B('429 بعد كل الإعادات:', 'A 429 after every retry:'), [['حطه في طابور لبعدين', 'queue it for later'], ['أعد فورًا للأبد', 'retry instantly forever'], ['crash', 'crash']], 0, B('صبر.', 'Patience.')),
        Q(B('jitter:', 'Jitter:'), [['عشوائية في الانتظار', 'randomness in the wait'], ['خطأ', 'an error'], ['نوع ملف', 'a file type']], 0, B('توزيع.', 'Spreading.')),
        Q(B('system prompt طويل ثابت:', 'A long fixed system prompt:'), [['prompt caching', 'prompt caching'], ['ابعته مرة بس', 'send it only once'], ['احذفه', 'delete it']], 0, B('كاش.', 'Cache.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تطبيقات JavaScript بتكلّم Claude باحتراف.', 'JavaScript apps that talk to Claude professionally.'),
      review: [
        B('الـ SDK والأنواع والتاريخ والتكلفة.', 'The SDK, types, history and cost.'),
        B('الـ streaming والـ events وTextDecoder والإلغاء.', 'Streaming, events, TextDecoder and cancellation.'),
        B('الأدوات واللفة اليدوية والـ tool runner.', 'Tools, the manual loop and the tool runner.'),
        B('المخرجات المنظمة بأداة إجبارية والتحقق والصور وPDF.', 'Structured output with a forced tool, validation, images and PDFs.'),
        B('الأخطاء والـ backoff والـ prompt caching.', 'Errors, backoff and prompt caching.')
      ],
      project: B('مشروع الأسبوع «مساعد متجر بالـ AI» (Node + TypeScript): API بـ Express بيعمل streaming للمتصفح بزرار إيقاف، أدوات (طلب، شحنة، إلغاء بموافقة) في لفة بحد أقصى، مستخرج طلبات واتساب بأداة إجبارية وzod، prompt caching للسياسات، retries وتكلفة لكل طلب وسقف يومي، واختبارات node:test بنموذج وهمي.', 'Week project «AI shop assistant» (Node + TypeScript): an Express API streaming to the browser with a stop button, tools (order, shipment, cancel with approval) in a capped loop, a WhatsApp order extractor with a forced tool and zod, prompt caching for the policies, retries, per-request cost and a daily cap, and node:test tests with a fake model.'),
      test: [
        Q(B('المفتاح بيتقري من:', 'The key is read from:'), [['ANTHROPIC_API_KEY في البيئة', 'ANTHROPIC_API_KEY in the environment'], ['كود المتصفح', 'browser code'], ['Git', 'Git']], 0, B('سر.', 'Secret.')),
        Q(B('النص في الرد:', 'Text in a reply:'), [['blocks نوعها text', 'blocks of type text'], ['msg.text دايمًا', 'always msg.text'], ['الـ headers', 'the headers']], 0, B('blocks.', 'Blocks.')),
        Q(B('stop_reason = "max_tokens":', 'stop_reason = "max_tokens":'), [['الرد اتقطع', 'the reply was cut off'], ['نجاح كامل', 'full success'], ['أداة', 'a tool']], 0, B('حد.', 'A limit.')),
        Q(B('stream.on("text"):', 'stream.on("text"):'), [['كل حتة نص جديدة', 'each new piece of text'], ['الرد كامل', 'the whole reply'], ['الأخطاء', 'errors']], 0, B('delta.', 'Delta.')),
        Q(B('المستخدم قفل الصفحة أثناء الـ stream:', 'The user closed the page mid-stream:'), [['stream.abort()', 'stream.abort()'], ['كمّل للآخر', 'carry on to the end'], ['أعد الطلب', 'resend it']], 0, B('تكلفة.', 'Cost.')),
        Q(B('tool_result لازم فيه:', 'A tool_result must have:'), [['tool_use_id نفسه', 'the same tool_use_id'], ['الموديل', 'the model'], ['المفتاح', 'the key']], 0, B('ربط.', 'Matching.')),
        Q(B('tool_choice: {type: "tool", name}:', 'tool_choice: {type: "tool", name}:'), [['يجبر الأداة دي', 'forces that tool'], ['يمنع الأدوات', 'blocks tools'], ['عشوائي', 'random']], 0, B('إجبار.', 'Forcing.')),
        Q(B('بعد الاستخراج:', 'After extraction:'), [['تحقق بـ zod', 'validate with zod'], ['احفظ على طول', 'save immediately'], ['اطبع بس', 'just print']], 0, B('ثقة.', 'Trust.')),
        Q(B('PDF لـ Claude:', 'A PDF for Claude:'), [['document block بـ base64', 'a document block in base64'], ['رابط عام بس', 'only a public link'], ['مستحيل', 'impossible']], 0, B('document.', 'Document.')),
        Q(B('الـ SDK بيعيد لوحده على:', 'The SDK retries by itself on:'), [['429 و5xx وoverloaded', '429, 5xx and overloaded'], ['400', '400'], ['ولا حاجة', 'nothing']], 0, B('مؤقت.', 'Transient.')),
        Q(B('retry-after:', 'retry-after:'), [['استنى المدة دي', 'wait that long'], ['تجاهله', 'ignore it'], ['أعد فورًا', 'retry at once']], 0, B('احترام.', 'Respect.')),
        Q(B('cache_read_input_tokens > 0:', 'cache_read_input_tokens > 0:'), [['الـ prompt caching شغال', 'prompt caching is working'], ['خطأ', 'an error'], ['الرد اتقطع', 'the reply was cut']], 0, B('كاش.', 'Cache.'))
      ] }
  ]
};
