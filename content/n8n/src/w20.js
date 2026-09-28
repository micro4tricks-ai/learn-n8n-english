// n8n week 20 — MCP and a complete AI project (end of month 5).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متقدم', 'Advanced'),
  title: B('MCP ومشروع AI كامل', 'MCP and a complete AI project'),
  goal: B('تستخدم MCP عشان توصل الـ agents بأدوات من أي مكان، وتخلّي n8n نفسه MCP server لأدوات بتاعتك، وتنظّم أكتر من agent، وتسلّم مشروع AI كامل بتكلفة ومراقبة وخطة بديلة.',
          'Use MCP to connect agents to tools from anywhere, make n8n itself an MCP server for your tools, coordinate several agents, and deliver a complete AI project with cost tracking, monitoring and a fallback plan.'),
  days: [
    { title: B('يعني إيه MCP', 'What MCP is'),
      goal: B('تفهم Model Context Protocol ودوره في ربط الـ AI بالأدوات.', 'Understand the Model Context Protocol and its role in connecting AI to tools.'),
      learn: [
        { h: B('الفكرة', 'The idea'),
          p: B('MCP بروتوكول مفتوح بيوحّد إزاي تطبيق AI (client) يكتشف ويستخدم أدوات من خدمة (server). بدل ما كل أداة ليها طريقة، أي client يقدر يكلم أي server بنفس اللغة.', 'MCP is an open protocol that standardises how an AI app (the client) discovers and uses tools from a service (the server). Instead of every tool having its own way, any client can talk to any server in the same language.'),
          ex: 'Client (an agent, Claude Desktop, an IDE) ⇄ MCP ⇄ Server (GitHub, a database, your n8n)' },
        { h: B('server وclient', 'Server and client'),
          p: B('MCP server = بيعرض أدوات (وبيانات) بأسماء ووصف ومدخلات. MCP client = بيتصل، ويشوف قايمة الأدوات (tool discovery)، ويديها للموديل يستخدمها.', 'An MCP server exposes tools (and data) with names, descriptions and inputs. An MCP client connects, lists the tools (tool discovery), and gives them to the model to use.'),
          ex: 'tools/list → [search_orders, create_ticket]\ntools/call → create_ticket({ subject: … })' },
        { h: B('الاتصال', 'Transport'),
          p: B('الاتصال بيبقى عن طريق HTTP (SSE أو streamable HTTP) لـ servers على النت، أو stdio لبرامج على نفس الجهاز. n8n بيستخدم HTTP.', 'Connections use HTTP (SSE or streamable HTTP) for servers on the network, or stdio for programs on the same machine. n8n uses HTTP.'),
          ex: 'https://n8n.example.com/mcp/<path>' }
      ],
      practice: [
        B('اقرا مقدمة MCP الرسمية واكتب ملخص 5 جمل.', 'Read the official MCP introduction and write a 5-sentence summary.'),
        B('ارسم client وserver وأمثلة أدوات.', 'Draw a client, a server and example tools.'),
        B('ادرس 3 MCP servers مشهورة وأدواتها.', 'Study 3 well-known MCP servers and their tools.'),
        B('اكتب إمتى MCP أحسن من HTTP Request Tool عادي.', 'Write when MCP beats a plain HTTP Request Tool.')
      ],
      words: [
        { t: 'MCP (Model Context Protocol)', m: B('بروتوكول مفتوح لربط تطبيقات AI بالأدوات', 'an open protocol connecting AI apps to tools'), ex: 'Any client ⇄ any server' },
        { t: 'MCP server', m: B('خدمة بتعرض أدوات عن طريق MCP', 'a service exposing tools through MCP'), ex: 'GitHub MCP server' },
        { t: 'MCP client', m: B('تطبيق AI بيتصل بـ MCP servers ويستخدم أدواتها', 'an AI app that connects to MCP servers and uses their tools'), ex: 'An n8n agent, Claude Desktop' },
        { t: 'tool discovery', m: B('الـ client بيسأل الـ server عن أدواته', 'the client asking the server what tools it has'), ex: 'tools/list' },
        { t: 'transport (SSE / HTTP)', m: B('طريقة الاتصال بين الـ client والـ server', 'how the client and server connect'), ex: 'streamable HTTP' }],
      read: [{ t: 'Model Context Protocol: Introduction', url: 'https://modelcontextprotocol.io/introduction', what: B('اقرا المقدمة وجزء architecture.', 'Read the introduction and the architecture part.') }],
      challenge: B('اكتب «MCP map» لعميل متخيّل: الأدوات اللي هيحتاجها الـ agent، ومنين (MCP server جاهز، ولا n8n، ولا API).', 'Write an "MCP map" for an imagined client: the tools the agent will need and where they come from (a ready MCP server, n8n, or an API).'),
      quiz: [
        { q: B('MCP بيوحّد:', 'MCP standardises:'), o: [B('ربط تطبيقات AI بالأدوات', 'connecting AI apps to tools'), B('تصميم المواقع', 'website design'), B('قواعد البيانات', 'databases')], a: 0, why: B('بروتوكول.', 'A protocol.') },
        { q: B('MCP server:', 'An MCP server:'), o: [B('بيعرض أدوات', 'exposes tools'), B('بيستخدم أدوات بس', 'only uses tools'), B('موديل', 'is a model')], a: 0, why: B('client بيستخدم.', 'The client uses them.') },
        { q: B('tool discovery يعني:', 'Tool discovery means:'), o: [B('الـ client بيعرف الأدوات المتاحة', 'the client learns the available tools'), B('تكتب الأدوات بإيدك', 'you type the tools by hand'), B('تمسح أدوات', 'deleting tools')], a: 0, why: B('tools/list.', 'tools/list.') }
      ] },

    { title: B('n8n كـ MCP client', 'n8n as an MCP client'),
      goal: B('توصّل AI Agent في n8n بـ MCP server خارجي وتستخدم أدواته.', 'Connect an n8n AI Agent to an external MCP server and use its tools.'),
      learn: [
        { h: B('MCP Client Tool', 'The MCP Client Tool'),
          p: B('في الـ AI Agent ضيف MCP Client Tool ← حط URL الـ server ← المصادقة (Bearer مثلًا) ← اختار الأدوات (كلها أو أدوات معينة). الـ agent بيشوفها كأدوات عادية.', 'In the AI Agent add an MCP Client Tool → enter the server URL → auth (Bearer, for example) → choose the tools (all or selected). The agent sees them as ordinary tools.'),
          ex: 'MCP Client Tool\n  Endpoint: https://mcp.example.com/sse\n  Tools to include: search_issues, create_issue' },
        { h: B('اختار الأدوات', 'Choosing tools'),
          p: B('متديش الـ agent كل أدوات الـ server لو مش محتاجها: أدوات كتير = اختيار أصعب وخطر أكبر. استخدم include للأدوات المطلوبة بس.', 'Don\'t give the agent all of a server\'s tools if it doesn\'t need them: many tools = harder choices and more risk. Include only the needed ones.'),
          ex: 'Include: read-only tools · Exclude: delete_*' },
        { h: B('ثق في الـ server؟', 'Trust the server?'),
          p: B('أي MCP server خارجي بيقدر يأثر على الـ agent (أوصاف الأدوات والنتايج). استخدم servers رسمية أو موثوقة، وافتكر إن نتايجها بيانات مش أوامر.', 'Any external MCP server can influence the agent (tool descriptions and results). Use official or trusted servers, and treat their results as data, not commands.'),
          ex: 'Prefer the vendor\'s official MCP server.' }
      ],
      practice: [
        B('وصّل MCP Client Tool بـ MCP server عام أو تجريبي.', 'Connect the MCP Client Tool to a public or test MCP server.'),
        B('اعرض قايمة الأدوات واختار 2 بس.', 'List the tools and include just 2.'),
        B('اسأل الـ agent سؤال محتاج أداة من الـ server.', 'Ask the agent a question that needs a tool from the server.'),
        B('اكتب قايمة servers موثوقة وليه.', 'Write a list of trusted servers and why.')
      ],
      words: [
        { t: 'MCP Client Tool', m: B('node بتوصّل الـ agent بـ MCP server', 'the node that connects an agent to an MCP server'), ex: 'Add it under the AI Agent\'s tools.' },
        { t: 'server URL (MCP)', m: B('عنوان الـ MCP server', 'the address of the MCP server'), ex: 'https://mcp.example.com/sse' },
        { t: 'tools to include', m: B('الأدوات اللي تديها للـ agent من الـ server', 'the tools from the server you give the agent'), ex: 'search_issues only' },
        { t: 'Bearer auth (MCP)', m: B('مصادقة بـ token للـ MCP server', 'token authentication for an MCP server'), ex: 'Authorization: Bearer …' },
        { t: 'official MCP server', m: B('server معمول من صاحب الخدمة نفسه', 'a server built by the service\'s own vendor'), ex: 'More trustworthy.' }],
      read: [{ lib: 'n8n Docs: Advanced AI', what: B('دوّر على MCP Client Tool واقرا الصفحة.', 'Search for the MCP Client Tool and read its page.') }],
      challenge: B('اعمل agent بيستخدم MCP server خارجي واحد وأداة workflow من عندك مع بعض، ويحل مهمة محتاجة الاتنين.', 'Build an agent that uses one external MCP server and one of your workflow tools together to solve a task that needs both.'),
      quiz: [
        { q: B('توصّل agent بـ MCP server بـ:', 'Connect an agent to an MCP server with:'), o: ['MCP Client Tool', 'Webhook', 'Gmail'], a: 0, why: B('client.', 'A client.') },
        { q: B('server عنده 40 أداة وانت محتاج 2:', 'A server has 40 tools and you need 2:'), o: [B('include الاتنين بس', 'include just those 2'), B('كلهم', 'all of them'), B('ولا واحدة', 'none')], a: 0, why: B('أبسط وأأمن.', 'Simpler and safer.') },
        { q: B('نتايج MCP server خارجي:', 'Results from an external MCP server:'), o: [B('بيانات مش أوامر', 'data, not commands'), B('أوامر لازم تتنفّذ', 'commands to obey'), B('مش مهمة', 'irrelevant')], a: 0, why: B('untrusted input.', 'untrusted input.') }
      ] },

    { title: B('n8n كـ MCP server', 'n8n as an MCP server'),
      goal: B('تعرض workflows بتاعتك كأدوات MCP يستخدمها أي AI client.', 'Expose your workflows as MCP tools any AI client can use.'),
      learn: [
        { h: B('MCP Server Trigger', 'The MCP Server Trigger'),
          p: B('workflow بيبدأ بـ MCP Server Trigger، وتوصّل بيه tools (زي Call n8n Workflow Tool أو أدوات جاهزة). بيطلعلك URL يديه لأي MCP client.', 'A workflow starts with an MCP Server Trigger, and you attach tools to it (such as the Call n8n Workflow Tool or ready tools). It gives you a URL for any MCP client.'),
          ex: 'MCP Server Trigger\n ├─ get_order (workflow tool)\n └─ create_ticket (workflow tool)' },
        { h: B('مين يستخدمه', 'Who uses it'),
          p: B('Claude Desktop أو IDE أو agent تاني في n8n. الفايدة: تكتب الأداة مرة في n8n (بالأمان والـ logs)، وكل أدوات الـ AI عندك تستخدمها.', 'Claude Desktop, an IDE, or another n8n agent. The benefit: you build the tool once in n8n (with safety and logs) and all your AI apps can use it.'),
          ex: 'Claude Desktop → your n8n MCP server → get_order(1042)' },
        { h: B('الحماية', 'Protection'),
          p: B('الـ URL ده باب لأدواتك: فعّل المصادقة (Bearer)، واعرض أدوات قليلة ومحددة، وسجّل كل استخدام. متعرضش أداة بتمسح أو بتدفع من غير موافقة.', 'That URL is a door to your tools: enable authentication (Bearer), expose few, narrow tools, and log every use. Never expose a tool that deletes or pays without approval.'),
          ex: 'Auth: Bearer token · Tools: read-only + create_ticket' }
      ],
      practice: [
        B('اعمل MCP Server Trigger بأداتين workflow.', 'Create an MCP Server Trigger with two workflow tools.'),
        B('فعّل Bearer auth.', 'Enable Bearer auth.'),
        B('وصّله من agent تاني في n8n بـ MCP Client Tool.', 'Connect to it from another n8n agent with the MCP Client Tool.'),
        B('لو عندك Claude Desktop أو IDE بيدعم MCP: جرّب توصّله.', 'If you have Claude Desktop or an MCP-capable IDE, try connecting it.')
      ],
      words: [
        { t: 'MCP Server Trigger', m: B('node بتخلّي n8n MCP server بأدواتك', 'the node that makes n8n an MCP server with your tools'), ex: 'Attach workflow tools to it.' },
        { t: 'exposed tools', m: B('الأدوات اللي الـ server بيعرضها للـ clients', 'the tools a server offers to clients'), ex: 'get_order, create_ticket' },
        { t: 'MCP endpoint', m: B('الـ URL اللي الـ clients بيتصلوا بيه', 'the URL clients connect to'), ex: '/mcp/company-tools' },
        { t: 'tool naming', m: B('أسماء أدوات واضحة بفعل + حاجة', 'clear tool names: verb + thing'), ex: 'get_order, not tool1' },
        { t: 'usage log', m: B('سجل بكل مرة أداة اتنادت', 'a record of every tool call'), ex: 'who, which tool, when, result' }],
      read: [{ lib: 'n8n Docs: Advanced AI', what: B('دوّر على MCP Server Trigger واقرا الصفحة.', 'Search for the MCP Server Trigger and read its page.') }, { t: 'MCP: Quickstart for server developers', url: 'https://modelcontextprotocol.io/quickstart/server', what: B('اقرا الأفكار الأساسية بس.', 'Read just the core ideas.') }],
      challenge: B('اعمل «company tools» MCP server في n8n: 3 أدوات آمنة (get_order، search_faq، create_ticket) بمصادقة وusage log، واستخدمه من agent تاني.', 'Build a "company tools" MCP server in n8n: 3 safe tools (get_order, search_faq, create_ticket) with authentication and a usage log, and use it from another agent.'),
      quiz: [
        { q: B('تعرض workflows كأدوات MCP بـ:', 'Expose workflows as MCP tools with:'), o: ['MCP Server Trigger', 'MCP Client Tool', 'Chat Trigger'], a: 0, why: B('server.', 'A server.') },
        { q: B('الـ MCP URL بتاع n8n لازم:', 'n8n\'s MCP URL must:'), o: [B('يبقى محمي بمصادقة', 'be protected by authentication'), B('عام للكل', 'be public to all'), B('من غير أدوات', 'have no tools')], a: 0, why: B('باب لأدواتك.', 'A door to your tools.') },
        { q: B('أداة بتمسح بيانات على MCP:', 'A delete-data tool on MCP:'), o: [B('متعرضهاش من غير موافقة', 'don\'t expose it without approval'), B('اعرضها عادي', 'expose it freely'), B('إجبارية', 'required')], a: 0, why: B('خطر.', 'Dangerous.') }
      ] },

    { title: B('أكتر من agent', 'Several agents'),
      goal: B('تنظّم مهام معقدة بـ orchestrator وagents متخصصة، وتعرف إمتى workflow ثابت أحسن.', 'Organise complex tasks with an orchestrator and specialised agents, and know when a fixed workflow is better.'),
      learn: [
        { h: B('orchestrator وsub-agents', 'Orchestrator and sub-agents'),
          p: B('agent رئيسي بيوزّع: «research» agent، و«writer» agent، و«reviewer» agent، كل واحد بأدواته. في n8n: AI Agent Tool بيخلّي agent أداة لـ agent تاني، أو workflow tool لكل agent.', 'A main agent delegates: a "research" agent, a "writer" agent and a "reviewer" agent, each with its own tools. In n8n: the AI Agent Tool makes one agent a tool for another, or use a workflow tool per agent.'),
          ex: 'Orchestrator\n ├─ research_agent (web + KB tools)\n ├─ writer_agent (no tools)\n └─ reviewer_agent (checks facts)' },
        { h: B('ثابت ولا agentic', 'Deterministic or agentic'),
          p: B('لو الخطوات معروفة (استخرج ← تحقق ← احفظ)، workflow عادي + AI في خطوة أحسن: أرخص وأثبت. استخدم agents بس لما الخطوات تتغيّر حسب الطلب.', 'If the steps are known (extract → validate → save), a normal workflow with AI in one step is better: cheaper and more stable. Use agents only when the steps change with each request.'),
          ex: 'Invoice extraction → fixed workflow\nOpen-ended customer questions → agent' },
        { h: B('hybrid', 'Hybrid'),
          p: B('أحسن المشاريع غالبًا: workflow ثابت للهيكل، وAI (chain أو agent صغير) في الأماكن اللي محتاجة فهم. ده أسهل في الاختبار والتكلفة.', 'The best projects are often a fixed workflow for the structure, with AI (a chain or a small agent) where understanding is needed. Easier to test and cheaper.'),
          ex: 'Webhook → classify (AI) → Switch → fixed steps → reply (AI)' }
      ],
      practice: [
        B('اعمل orchestrator بـ 2 sub-agents (باحث وكاتب).', 'Build an orchestrator with 2 sub-agents (researcher and writer).'),
        B('اعمل نفس المهمة كـ workflow ثابت وقارن التكلفة والثبات.', 'Build the same task as a fixed workflow and compare cost and stability.'),
        B('اكتب قاعدة لنفسك: إمتى agent وإمتى workflow.', 'Write your own rule: when an agent and when a workflow.'),
        B('ارسم مشروع AI بشكل hybrid.', 'Sketch an AI project in hybrid form.')
      ],
      words: [
        { t: 'orchestrator agent', m: B('agent رئيسي بيوزّع المهام على agents تانية', 'a main agent that assigns tasks to other agents'), ex: 'Delegates to research and writing' },
        { t: 'sub-agent', m: B('agent متخصص في جزء من المهمة', 'an agent specialised in part of a task'), ex: 'reviewer_agent' },
        { t: 'AI Agent Tool', m: B('بيخلّي agent أداة لـ agent تاني', 'makes one agent a tool for another'), ex: 'Orchestrator → research agent' },
        { t: 'deterministic workflow', m: B('خطوات ثابتة معروفة من الأول', 'fixed steps known in advance'), ex: 'extract → validate → save' },
        { t: 'hybrid AI workflow', m: B('workflow ثابت مع AI في خطوات معينة', 'a fixed workflow with AI in chosen steps'), ex: 'classify → Switch → reply' }],
      read: [{ t: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', what: B('اقرا الفرق بين workflows وagents والأنماط.', 'Read the difference between workflows and agents, and the patterns.') }],
      challenge: B('اعمل «content assistant»: orchestrator بياخد موضوع، research agent يجمع من KB والويب، writer يكتب، reviewer يتحقق من المصادر، والنتيجة تيجي لك للموافقة.', 'Build a "content assistant": an orchestrator takes a topic, a research agent gathers from the KB and web, a writer drafts, a reviewer checks sources, and the result comes to you for approval.'),
      quiz: [
        { q: B('استخراج فواتير بخطوات ثابتة:', 'Invoice extraction with fixed steps:'), o: [B('workflow ثابت + AI في خطوة', 'a fixed workflow + AI in one step'), B('5 agents', '5 agents'), B('agent واحد لكل حاجة', 'one agent for everything')], a: 0, why: B('أرخص وأثبت.', 'Cheaper and steadier.') },
        { q: B('agent أداة لـ agent تاني:', 'An agent as a tool for another agent:'), o: ['AI Agent Tool', 'Merge', 'Wait'], a: 0, why: B('تنظيم.', 'Coordination.') },
        { q: B('hybrid يعني:', 'Hybrid means:'), o: [B('workflow ثابت + AI في أماكن معينة', 'a fixed workflow + AI in chosen places'), B('موديلين', 'two models'), B('لغتين', 'two languages')], a: 0, why: B('الأحسن غالبًا.', 'Often the best.') }
      ] },

    { title: B('تسليم مشروع AI', 'Delivering an AI project'),
      goal: B('تسلّم مشروع AI جاهز للإنتاج: نطاق واضح، وتكلفة متراقبة، وموديل بديل، وقياس رضا المستخدمين.', 'Deliver a production-ready AI project: a clear scope, tracked cost, a fallback model and a measure of user satisfaction.'),
      learn: [
        { h: B('النطاق والتوقعات', 'Scope and expectations'),
          p: B('قول للعميل بصراحة: الـ AI بيغلط أحيانًا، ونسبة الدقة المتوقعة (من الـ evaluation set)، وإيه اللي بيروح لإنسان. اكتبه في الـ proposal.', 'Tell the client honestly: AI sometimes errs, the expected accuracy (from the evaluation set), and what goes to a human. Put it in the proposal.'),
          ex: 'Expected accuracy: ~90% · unclear cases → human review' },
        { h: B('التكلفة والمراقبة', 'Cost and monitoring'),
          p: B('سجّل لكل طلب AI: الموديل، والـ tokens، والوقت، والنتيجة. واعمل dashboard (Sheet أو Postgres) بالتكلفة اليومية، وتنبيه لو عدّت حد.', 'Log every AI call: the model, tokens, time and result. Build a dashboard (sheet or Postgres) of daily cost, and alert if it passes a limit.'),
          ex: 'ai_calls: time | model | tokens_in | tokens_out | ms | ok' },
        { h: B('بديل وتحسين', 'Fallback and improvement'),
          p: B('لو الموديل الأساسي وقع أو بطيء: fallback model (مزوّد تاني). وزرار 👍/👎 للمستخدم بيجمع أمثلة للـ evaluation set عشان تحسّن كل شهر.', 'If the main model fails or is slow: a fallback model (another provider). A 👍/👎 button for users gathers examples for the evaluation set so you improve every month.'),
          ex: 'Primary: provider A → on error → provider B' }
      ],
      practice: [
        B('اكتب قسم «AI limitations» لـ proposal.', 'Write an "AI limitations" section for a proposal.'),
        B('سجّل كل طلب AI في جدول ai_calls.', 'Log every AI call in an ai_calls table.'),
        B('اعمل fallback model بـ error output.', 'Add a fallback model using the error output.'),
        B('ضيف 👍/👎 في Telegram وسجّل الرأي.', 'Add 👍/👎 on Telegram and log the feedback.')
      ],
      words: [
        { t: 'AI limitations', m: B('حدود الـ AI اللي لازم العميل يعرفها', 'the limits of AI a client must know about'), ex: '~90% accuracy, human review for the rest' },
        { t: 'cost dashboard', m: B('لوحة بتكلفة الـ AI اليومية والشهرية', 'a board showing daily and monthly AI cost'), ex: 'Tokens and USD per day' },
        { t: 'fallback model', m: B('موديل بديل لو الأساسي وقع', 'a backup model when the main one fails'), ex: 'Provider B on error' },
        { t: 'AI observability', m: B('تسجيل ومراقبة كل طلبات الـ AI', 'logging and monitoring every AI call'), ex: 'model, tokens, time, result' },
        { t: 'feedback loop', m: B('رأي المستخدمين بيرجع يحسّن النظام', 'user feedback flowing back to improve the system'), ex: '👎 → add to the evaluation set' }],
      read: ['lib:n8n Blog', 'lib:n8n Workflow Templates'],
      challenge: B('خد «AI customer agent» أو «knowledge assistant» وخلّيه production-ready: AI limitations مكتوبة، ai_calls log، cost dashboard بتنبيه، fallback model، وfeedback 👍/👎.', 'Make your "AI customer agent" or "knowledge assistant" production-ready: written AI limitations, an ai_calls log, a cost dashboard with an alert, a fallback model and 👍/👎 feedback.'),
      quiz: [
        { q: B('تقول للعميل عن الـ AI:', 'What to tell the client about AI:'), o: [B('بيغلط أحيانًا ودقته المتوقعة', 'it sometimes errs, and its expected accuracy'), B('مبيغلطش', 'it never errs'), B('ولا حاجة', 'nothing')], a: 0, why: B('صراحة.', 'Honesty.') },
        { q: B('الموديل الأساسي وقع:', 'The main model is down:'), o: ['fallback model', 'stop the business', 'ignore it'], a: 0, why: B('استمرارية.', 'Continuity.') },
        { q: B('👍/👎 بيفيد في:', '👍/👎 helps to:'), o: [B('تحسين مستمر وevaluation set', 'improve continuously and grow the evaluation set'), B('الزينة', 'decorate'), B('التكلفة بس', 'only cost')], a: 0, why: B('feedback loop.', 'feedback loop.') }
      ] },

    { title: B('مراجعة الشهر الخامس والاختبار', 'Month 5 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 21 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 21 opens when you score 70% or more.'),
      review: [
        B('LLMs والـ prompts والمخرجات المنظمة والجودة (الأسبوع 17).', 'LLMs, prompts, structured output and quality (week 17).'),
        B('الـ agents والأدوات والذاكرة والأمان (الأسبوع 18).', 'Agents, tools, memory and safety (week 18).'),
        B('RAG والـ vectors والتقييم (الأسبوع 19).', 'RAG, vectors and evaluation (week 19).'),
        B('MCP وأكتر من agent وتسليم مشروع AI (الأسبوع 20).', 'MCP, multiple agents and delivering an AI project (week 20).')
      ],
      project: B('مشروع الشهر: «AI operations assistant» لعميل متخيّل: knowledge base بـ RAG (PGVector)، وagent بأدوات workflow آمنة (طلبات، تذاكر)، وMCP server في n8n بنفس الأدوات، على Telegram وويب، مع ذاكرة وhandoff وموافقة للأفعال الخطيرة، وai_calls log وcost dashboard وfallback model وevaluation set 30 سؤال. ومعاه proposal فيه AI limitations.',
                 'Month project: an "AI operations assistant" for an imagined client: a RAG knowledge base (PGVector), an agent with safe workflow tools (orders, tickets), an n8n MCP server with the same tools, on Telegram and the web, with memory, handoff and approval for risky actions, an ai_calls log, a cost dashboard, a fallback model and a 30-question evaluation set. Include a proposal with AI limitations.'),
      test: [
        { q: B('temperature للاستخراج:', 'Temperature for extraction:'), o: [B('قليلة', 'low'), B('عالية', 'high'), B('مش فارقة', 'irrelevant')], a: 0, why: B('ثبات.', 'Consistency.') },
        { q: B('JSON ثابت من الموديل:', 'Fixed JSON from the model:'), o: ['Structured Output Parser', 'Chat Trigger', 'Wait'], a: 0, why: B('schema.', 'A schema.') },
        { q: B('agent بيختار الأداة من:', 'An agent picks a tool from its:'), o: [B('اسمها ووصفها', 'name and description'), B('لونها', 'colour'), B('حجمها', 'size')], a: 0, why: B('وصف واضح.', 'A clear description.') },
        { q: B('session لكل مستخدم في Telegram:', 'A per-user session on Telegram:'), o: ['chat.id', 'bot token', '$now'], a: 0, why: B('فصل المحادثات.', 'Separates chats.') },
        { q: B('أداة refund:', 'A refund tool:'), o: [B('بموافقة بشرية', 'with human approval'), B('أوتوماتيك', 'automatic'), B('عامة في MCP', 'public on MCP')], a: 0, why: B('خطر.', 'Risky.') },
        { q: B('RAG بيجيب:', 'RAG retrieves:'), o: [B('أجزاء مستندات مرتبطة بالسؤال', 'document chunks related to the question'), B('موديل جديد', 'a new model'), B('صور', 'images')], a: 0, why: B('retrieval.', 'retrieval.') },
        { q: B('غيّرت موديل الـ embeddings:', 'You changed the embeddings model:'), o: ['re-ingest everything', 'nothing', 'raise top K'], a: 0, why: B('أرقام مختلفة.', 'Different numbers.') },
        { q: B('MCP client في n8n:', 'An MCP client in n8n:'), o: ['MCP Client Tool', 'MCP Server Trigger', 'Webhook'], a: 0, why: B('بيستخدم أدوات.', 'It uses tools.') },
        { q: B('تعرض أدواتك لـ Claude Desktop:', 'Expose your tools to Claude Desktop:'), o: ['MCP Server Trigger', 'Gmail node', 'Sheets'], a: 0, why: B('server.', 'A server.') },
        { q: B('مهمة خطواتها معروفة:', 'A task with known steps:'), o: [B('workflow ثابت + AI في خطوة', 'a fixed workflow + AI in one step'), B('orchestrator وخمس agents', 'an orchestrator and five agents'), B('agent واحد لكل حاجة', 'one agent for everything')], a: 0, why: B('أرخص وأثبت.', 'Cheaper and steadier.') },
        { q: B('تعرف تكلفة الـ AI يوميًا بـ:', 'Track daily AI cost with:'), o: ['an ai_calls log + dashboard', 'guessing', 'the model\'s name'], a: 0, why: B('observability.', 'observability.') },
        { q: B('الموديل الأساسي بطيء أو واقع:', 'The main model is slow or down:'), o: ['fallback model', 'more memory', 'a bigger chunk'], a: 0, why: B('بديل.', 'A backup.') }
      ] }
  ]
};
