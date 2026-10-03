// n8n week 33 — Multi-agent systems and memory.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('أنظمة الوكلاء المتعددين والذاكرة', 'Multi-agent systems and memory'),
  goal: B('تبني فريق وكلاء: مشرف بيوزّع على متخصصين، وكل واحد بأدواته وتعليماته، بذاكرة قصيرة وطويلة، وتكلفة محسوبة، وكل خطوة متسجلة.',
          'Build a team of agents: a supervisor routing to specialists, each with its own tools and instructions, with short- and long-term memory, controlled cost, and every step logged.'),
  days: [
    { title: B('إمتى وكلاء كتير؟', 'When several agents?'),
      goal: B('تعرف حدود الوكيل الواحد وتقسم صح.', 'Know the limits of one agent and split correctly.'),
      learn: [
        L(B('حدود الوكيل الواحد', 'Limits of one agent'),
          B('وكيل واحد بـ 20 أداة و3 صفحات تعليمات بيتلخبط: بيختار أداة غلط، وبينسى قواعد، وبيبقى صعب تختبره. لما المهام مختلفة جدًا (حجز، فواتير، دعم فني)، قسّم: كل **specialist agent** بمهمة ضيقة وأدوات قليلة.', 'One agent with 20 tools and 3 pages of instructions gets confused: it picks the wrong tool, forgets rules, and is hard to test. When tasks differ a lot (booking, billing, tech support), split: each **specialist agent** with a narrow task and few tools.'),
          '✗ one agent: 20 tools, every rule\n✓ supervisor → booking agent (3 tools) · billing agent (2 tools) · support agent (RAG)'),
        L(B('المشرف والمتخصصين', 'Supervisor and specialists'),
          B('**supervisor agent** بيقرا الطلب ويقرر مين يرد، وبينادي المتخصص كأداة (في n8n: AI Agent Tool، أو Call n8n Workflow Tool لـ sub-workflow فيه وكيل). المشرف مش بيعمل الشغل نفسه — بيوزّع ويجمع.', 'A **supervisor agent** reads the request, decides who answers, and calls the specialist as a tool (in n8n: the AI Agent Tool, or the Call n8n Workflow Tool for a sub-workflow containing an agent). The supervisor does not do the work itself — it routes and combines.'),
          'Supervisor (tools: booking_agent, billing_agent, support_agent)\n"I want to move my appointment and ask about my invoice"\n→ booking_agent(...) + billing_agent(...) → one combined reply'),
        L(B('ابدأ بأبسط حاجة', 'Start with the simplest thing'),
          B('قبل الوكلاء المتعددين جرّب: Switch بقواعد أو تصنيف AI بسيط يوزّع على وكلاء منفصلين. ده أرخص وأوضح. استخدم مشرف «ذكي» بس لما الطلبات مركبة أو محتاجة أكتر من متخصص في نفس الوقت.', 'Before multiple agents try: a Switch with rules, or a simple AI classification routing to separate agents. It is cheaper and clearer. Use a «smart» supervisor only when requests are complex or need several specialists at once.'),
          'Text Classifier (booking | billing | support) → Switch → the right agent\n(cheaper than a supervisor agent for single-topic messages)')
      ],
      practice: [
        B('اكتب 20 رسالة عميل حقيقية الشكل وصنّفها: موضوع واحد ولا مركّبة؟', 'Write 20 realistic customer messages and sort them: single-topic or mixed?'),
        B('اعمل 3 وكلاء متخصصين كـ sub-workflows.', 'Build 3 specialist agents as sub-workflows.'),
        B('اعمل موزّع بتصنيف بسيط، وبعدين مشرف وكيل، وقارن النتيجة والتكلفة.', 'Build a simple classifier router, then a supervisor agent, and compare results and cost.'),
        B('اكتب لكل متخصص: مهمته، أدواته، وإيه اللي ممنوع.', 'Write for each specialist: its task, tools, and what is forbidden.')
      ],
      words: [
        W('multi-agent', 'نظام فيه أكتر من وكيل AI بيتعاونوا', 'a system with several AI agents working together', 'A multi-agent setup handles mixed requests.'),
        W('supervisor agent', 'وكيل بيوزّع الشغل على وكلاء تانيين', 'an agent that routes work to other agents', 'The supervisor agent calls the billing agent.'),
        W('specialist agent', 'وكيل بمهمة ضيقة وأدوات قليلة', 'an agent with a narrow task and few tools', 'The booking specialist agent has three tools.'),
        W('agent as tool', 'وكيل بيتنادي كأداة من وكيل تاني', 'an agent called as a tool by another agent', 'Expose the support bot as an agent as tool.'),
        W('agent handoff', 'تسليم المحادثة من وكيل لوكيل', 'passing a conversation from one agent to another', 'The agent handoff keeps the context.')
      ],
      read: ['lib:n8n Docs: AI Agent node', { lib: 'n8n Docs: Advanced AI', what: B('دوّر على AI Agent Tool والـ sub-workflow tools.', 'Look for the AI Agent Tool and sub-workflow tools.') }],
      challenge: B('ابني «مكتب استقبال» بمشرف و3 متخصصين، وجرّبه على 20 رسالة (منها 5 مركّبة)، وسجّل لكل رسالة: مين اتنادى، والرد، والتكلفة.', 'Build a «front desk» with a supervisor and 3 specialists, test it on 20 messages (5 mixed), and log for each: who was called, the reply and the cost.'),
      quiz: [
        Q(B('علامة إن الوكيل محتاج يتقسم:', 'A sign an agent should be split:'), [['أدوات كتير وأخطاء في الاختيار', 'many tools and wrong choices'], ['ردود قصيرة', 'short replies'], ['عملاء قليلين', 'few customers']], 0, B('مهام ضيقة أوضح.', 'Narrow tasks are clearer.')),
        Q(B('المشرف بيعمل:', 'The supervisor:'), [['يوزّع ويجمع الردود', 'routes and combines replies'], ['كل الشغل بنفسه', 'does all the work itself'], ['ولا حاجة', 'nothing']], 0, B('المتخصص بيشتغل.', 'Specialists do the work.')),
        Q(B('رسايل كلها موضوع واحد:', 'Messages that are all single-topic:'), [['تصنيف بسيط + Switch يكفي', 'a simple classifier + Switch is enough'], ['لازم مشرف وكيل', 'a supervisor agent is required'], ['مفيش حل', 'no solution']], 0, B('أرخص وأوضح.', 'Cheaper and clearer.'))
      ] },

    { title: B('أنواع الذاكرة', 'Kinds of memory'),
      goal: B('الوكيل يفتكر اللي محتاجه بس، في المكان الصح.', 'The agent remembers only what it needs, in the right place.'),
      learn: [
        L(B('ذاكرة قصيرة: المحادثة', 'Short-term memory: the conversation'),
          B('**chat memory** بتحفظ آخر رسايل المحادثة (مثلًا آخر 10) عشان الوكيل يفهم «هو ده» و«زي ما قلتلك». Simple Memory بتتمسح لو n8n اتعاد تشغيله؛ للإنتاج استخدم Postgres أو Redis Chat Memory. والمفتاح **session key** (رقم الموبايل أو chat id) بيفصل كل عميل.', '**Chat memory** keeps the last messages of a conversation (e.g. the last 10) so the agent understands «that one» and «as I told you». Simple Memory is lost when n8n restarts; in production use Postgres or Redis Chat Memory. The **session key** (phone number or chat id) separates each customer.'),
          'AI Agent → Memory: Postgres Chat Memory\n  Session key: {{ $json.from }}   Context window length: 10'),
        L(B('ذاكرة طويلة: الحقائق', 'Long-term memory: facts'),
          B('حاجات لازم تتفتكر بعد شهور: اسم العميل، لغته، حساسية عنده، الخدمة اللي بيحبها. دي **long-term memory**: جدول `customer_facts` أو vector store. أداة `remember_fact` يكتب فيها الوكيل، وفي أول كل محادثة بتقرا الحقائق وتحطها في التعليمات.', 'Things that must be remembered for months: the customer’s name, language, an allergy, the service they like. That is **long-term memory**: a `customer_facts` table or a vector store. A `remember_fact` tool lets the agent write to it, and at the start of each conversation you read the facts and put them in the instructions.'),
          'start of chat → SELECT facts WHERE phone = … → system prompt: "Known facts: prefers Arabic; allergic to penicillin"\ntool remember_fact(key, value) → upsert customer_facts'),
        L(B('ذاكرة ملخّصة وتنضيفها', 'Summary memory and pruning'),
          B('محادثة طويلة جدًا بتغلّي التكلفة. **summary memory**: كل فترة لخّص المحادثة القديمة في فقرة واحتفظ بآخر رسايل بس. ونضّف: امسح الذاكرة القصيرة بعد أيام، وراجع الحقائق الطويلة (ممكن تبقى قديمة)، واحترم «امسح بياناتي».', 'A very long conversation raises the cost. **Summary memory**: every so often summarise the old part in a paragraph and keep only the latest messages. And prune: delete short-term memory after a few days, review long-term facts (they can go stale), and honour «delete my data».'),
          'messages > 30 → summarise first 25 into one note → keep last 5 + note\nnightly: DELETE chat memory older than 7 days')
      ],
      practice: [
        B('اربط وكيل بـ Postgres Chat Memory بمفتاح الموبايل.', 'Connect an agent to Postgres Chat Memory keyed by phone.'),
        B('اعمل أداة remember_fact وجدول customer_facts.', 'Build a remember_fact tool and a customer_facts table.'),
        B('اقرا الحقائق في أول كل محادثة وحطها في التعليمات.', 'Read the facts at the start of each chat and add them to the instructions.'),
        B('اعمل تنضيف ليلي للذاكرة القصيرة.', 'Add a nightly cleanup of short-term memory.')
      ],
      words: [
        W('chat memory', 'ذاكرة رسايل المحادثة الأخيرة', 'memory of a conversation’s recent messages', 'Store chat memory in Postgres for production.'),
        W('session key', 'المفتاح اللي بيفصل ذاكرة كل عميل', 'the key that separates each customer’s memory', 'Use the phone number as the session key.'),
        W('long-term memory', 'حقائق بتتفتكر لفترة طويلة', 'facts remembered for a long time', 'Long-term memory keeps the customer’s language.'),
        W('summary memory', 'ملخص للمحادثة القديمة بدل نصها كامل', 'a summary of the old conversation instead of its full text', 'Summary memory cuts the token cost.'),
        W('memory pruning', 'تنضيف الذاكرة القديمة بانتظام', 'regularly cleaning out old memory', 'Memory pruning runs every night.')
      ],
      read: [{ t: 'n8n Docs: Postgres Chat Memory', url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat/', what: B('اقرا إعداد المفتاح والطول.', 'Read the key and length settings.') }, 'lib:pgvector'],
      challenge: B('اعمل وكيل «فاكر عملاءه»: ذاكرة قصيرة في Postgres، حقائق طويلة بأداة، ملخّص للمحادثات الطويلة، تنضيف ليلي، وأمر «امسح بياناتي» بيمسح الاتنين.', 'Build an agent that «remembers its customers»: short-term memory in Postgres, long-term facts via a tool, summaries for long chats, nightly cleanup, and a «delete my data» command clearing both.'),
      quiz: [
        Q(B('Simple Memory في الإنتاج:', 'Simple Memory in production:'), [['بتضيع لو n8n اتعاد تشغيله', 'is lost when n8n restarts'], ['مثالية', 'is ideal'], ['أسرع حاجة', 'is the fastest']], 0, B('استخدم Postgres أو Redis.', 'Use Postgres or Redis.')),
        Q(B('session key المناسب لواتساب:', 'A suitable session key for WhatsApp:'), [['رقم الموبايل', 'the phone number'], ['ثابت لكل الناس', 'one fixed value for everyone'], ['الوقت', 'the time']], 0, B('ذاكرة لكل عميل.', 'Memory per customer.')),
        Q(B('حساسية العميل من دوا تتحفظ في:', 'A customer’s drug allergy is stored in:'), [['الذاكرة الطويلة', 'long-term memory'], ['آخر 10 رسايل بس', 'only the last 10 messages'], ['مش بتتحفظ', 'nowhere']], 0, B('معلومة مهمة لشهور.', 'Important for months.'))
      ] },

    { title: B('تصميم المتخصصين', 'Designing specialists'),
      goal: B('كل وكيل متخصص واضح ومحدود وسهل تختبره.', 'Each specialist agent is clear, bounded and easy to test.'),
      learn: [
        L(B('بطاقة الوكيل', 'The agent card'),
          B('اكتب لكل متخصص «بطاقة»: الاسم، المهمة في سطر، الأدوات (3 بالكتير)، المدخلات اللي بيستقبلها، شكل المخرج، والحدود («متديش أسعار»، «متحجزش من غير تأكيد»). البطاقة دي هي الـ system prompt ووصف الأداة اللي المشرف بيشوفه.', 'Write a «card» for each specialist: the name, the task in one line, tools (3 at most), the inputs it receives, the output shape, and the limits («never quote prices», «never book without confirmation»). The card becomes the system prompt and the tool description the supervisor sees.'),
          'booking_agent\n task: book, move or cancel appointments\n tools: check_slots, book_slot, cancel_slot\n out: { done, summary, needs_human }\n limits: confirm date+time before booking; no medical advice'),
        L(B('مخرج منظم بين الوكلاء', 'Structured output between agents'),
          B('لما المتخصص يرجّع للمشرف، يرجّع JSON ثابت مش فقرة: `{ done, summary, data, needs_human }`. المشرف بيبني الرد النهائي منه، وتقدر تختبر كل متخصص لوحده بـ fixtures زي أي خدمة.', 'When a specialist returns to the supervisor, it returns fixed JSON, not a paragraph: `{ done, summary, data, needs_human }`. The supervisor builds the final reply from it, and you can test each specialist alone with fixtures like any service.'),
          '{ "done": true, "summary": "Moved to Thu 5 pm", "data": { "slot_id": 88 }, "needs_human": false }'),
        L(B('صلاحيات مختلفة', 'Different permissions'),
          B('كل متخصص ليه credentials بصلاحيات أقل حاجة: وكيل الدعم بيقرا بس، وكيل الحجز بيكتب في جدول المواعيد بس، ووكيل الفواتير مبيرجّعش فلوس من غير موافقة إنسان. كده لو وكيل اتخدع (prompt injection)، الضرر محدود.', 'Each specialist has credentials with the least access: the support agent only reads, the booking agent only writes to the appointments table, and the billing agent never refunds without human approval. If an agent is tricked (prompt injection), the damage is limited.'),
          'support_agent: read-only KB credential\nbooking_agent: write to appointments only\nbilling_agent: refunds → Wait for approval')
      ],
      practice: [
        B('اكتب بطاقة لكل متخصص من التلاتة.', 'Write a card for each of the three specialists.'),
        B('خلّي كل متخصص يرجّع JSON ثابت بـ Structured Output Parser.', 'Make each specialist return fixed JSON with a Structured Output Parser.'),
        B('اكتب 6 fixtures لكل متخصص واختبره لوحده.', 'Write 6 fixtures per specialist and test it alone.'),
        B('راجع صلاحيات credentials كل متخصص.', 'Review each specialist’s credential permissions.')
      ],
      words: [
        W('agent role', 'دور الوكيل ومهمته المحددة', 'an agent’s role and specific task', 'Write the agent role in one line.'),
        W('agent card', 'وصف قصير للوكيل: مهمته وأدواته وحدوده', 'a short description of an agent: task, tools and limits', 'The agent card becomes its system prompt.'),
        W('structured handoff', 'تسليم بين الوكلاء بـ JSON ثابت', 'passing data between agents as fixed JSON', 'A structured handoff is easy to test.'),
        W('least access', 'أقل صلاحيات تكفي المهمة', 'the minimum permissions the task needs', 'Give the support agent least access.'),
        W('bounded task', 'مهمة محددة ليها حدود واضحة', 'a task with clear limits', 'Each specialist has a bounded task.')
      ],
      read: ['lib:n8n Docs: AI Agent node', { lib: 'Anthropic: Prompt engineering', what: B('اقرا جزء الـ system prompts والأدوار.', 'Read the part on system prompts and roles.') }],
      challenge: B('حسّن فريق الوكلاء: بطاقات واضحة، مخرجات JSON، صلاحيات أقل، و18 اختبار (6 لكل متخصص) بتعدّي كلها.', 'Improve the agent team: clear cards, JSON outputs, least-access permissions, and 18 tests (6 per specialist) that all pass.'),
      quiz: [
        Q(B('عدد أدوات المتخصص المثالي:', 'An ideal number of tools for a specialist:'), [['قليل (2-3)', 'few (2-3)'], ['20', '20'], ['صفر دايمًا', 'always zero']], 0, B('مهمة ضيقة.', 'A narrow task.')),
        Q(B('المتخصص يرجّع للمشرف:', 'A specialist returns to the supervisor:'), [['JSON ثابت', 'fixed JSON'], ['فقرة حرة', 'a free paragraph'], ['ملف', 'a file']], 0, B('سهل يتبني عليه ويتختبر.', 'Easy to build on and test.')),
        Q(B('ليه صلاحيات مختلفة لكل وكيل؟', 'Why different permissions per agent?'), [['الضرر يبقى محدود لو اتخدع', 'damage stays limited if tricked'], ['أسرع', 'faster'], ['أرخص', 'cheaper']], 0, B('أقل صلاحية.', 'Least access.'))
      ] },

    { title: B('التكلفة والسرعة', 'Cost and speed'),
      goal: B('فريق وكلاء بتكلفة وسرعة معقولين.', 'An agent team with reasonable cost and speed.'),
      learn: [
        L(B('توجيه الموديلات', 'Model routing'),
          B('مش كل خطوة محتاجة أكبر موديل. **model routing**: التصنيف والاستخراج البسيط بموديل صغير سريع، والتفكير المعقد أو الرد الحساس بموديل كبير. ده ممكن يقلل التكلفة لأقل من النص من غير ما الجودة تقل.', 'Not every step needs the biggest model. **Model routing**: classification and simple extraction with a small fast model, complex reasoning or sensitive replies with a big one. This can cut the cost by more than half without hurting quality.'),
          'classifier: small model (fast, cheap)\nspecialists: medium model\nfinal reply on complaints: large model'),
        L(B('حدود الخطوات والوقت', 'Step and time limits'),
          B('حط حد لعدد خطوات كل وكيل (Max Iterations في إعدادات الـ AI Agent)، ومهلة للـ workflow، وحد يومي لعدد الرسايل لكل عميل. وكيل في حلقة ممكن يصرف ميزانية شهر في ساعة.', 'Set a limit on each agent’s steps (Max Iterations in the AI Agent options), a timeout for the workflow, and a daily message cap per customer. An agent stuck in a loop can spend a month’s budget in an hour.'),
          'AI Agent → Options → Max Iterations: 6\nworkflow timeout: 120 s\nper customer: ≤ 50 messages / day → then human'),
        L(B('قيس قبل ما تحسّن', 'Measure before improving'),
          B('سجّل لكل محادثة: الموديلات اللي اتنادت، التوكنز (لو النود بيطلّعها)، الوقت، والتكلفة التقريبية. اعمل تقرير أسبوعي: متوسط تكلفة المحادثة، أغلى 10 محادثات وليه. التحسين من غير قياس تخمين.', 'Log for each conversation: models called, tokens (if the node outputs them), time, and approximate cost. Make a weekly report: average cost per conversation, the 10 most expensive and why. Improving without measuring is guessing.'),
          'conversation 4411: classifier 120 tok · booking_agent 2,300 tok · 6.2 s · ≈ $0.004')
      ],
      practice: [
        B('خلّي التصنيف بموديل صغير والمتخصصين بموديل أكبر.', 'Use a small model for classification and a larger one for specialists.'),
        B('حط Max Iterations ومهلة وحد يومي.', 'Set Max Iterations, a timeout and a daily cap.'),
        B('سجّل التوكنز والوقت لكل محادثة في جدول.', 'Log tokens and time per conversation in a table.'),
        B('اعمل تقرير تكلفة أسبوعي.', 'Make a weekly cost report.')
      ],
      words: [
        W('model routing', 'اختيار الموديل المناسب لكل خطوة', 'choosing the right model for each step', 'Model routing cut our AI bill in half.'),
        W('step limit', 'أقصى عدد خطوات مسموح للوكيل', 'the most steps an agent may take', 'A step limit of 6 stops loops.'),
        W('cost per conversation', 'متوسط تكلفة المحادثة الواحدة', 'the average cost of one conversation', 'Track cost per conversation weekly.'),
        W('daily cap', 'حد أقصى يومي', 'a maximum per day', 'A daily cap of 50 messages per customer.'),
        W('response time', 'الوقت لحد ما الرد يوصل', 'the time until the reply arrives', 'Keep response time under 10 seconds.')
      ],
      read: ['lib:OpenAI Tokenizer', { lib: 'Anthropic Cookbook', what: B('دوّر على أمثلة اختيار الموديل والتكلفة.', 'Look for examples on choosing models and cost.') }],
      challenge: B('قلّل تكلفة فريق الوكلاء 40% على الأقل بتوجيه الموديلات والحدود، من غير ما الاختبارات الـ 18 تفشل، ووثّق الأرقام قبل وبعد.', 'Cut the agent team’s cost by at least 40% with model routing and limits, without any of the 18 tests failing, and document the numbers before and after.'),
      quiz: [
        Q(B('التصنيف البسيط يناسبه:', 'Simple classification suits:'), [['موديل صغير سريع', 'a small fast model'], ['أكبر موديل', 'the largest model'], ['ولا موديل', 'no model']], 0, B('أرخص بنفس الجودة.', 'Cheaper at the same quality.')),
        Q(B('Max Iterations بيحمي من:', 'Max Iterations protects against:'), [['حلقة بتصرف الميزانية', 'a loop burning the budget'], ['الأخطاء الإملائية', 'spelling mistakes'], ['البطء', 'slowness']], 0, B('حد للخطوات.', 'A step limit.')),
        Q(B('قبل ما تحسّن التكلفة:', 'Before optimising cost:'), [['قيس التوكنز والوقت', 'measure tokens and time'], ['غيّر الموديل عشوائي', 'switch models at random'], ['اقفل البوت', 'turn off the bot']], 0, B('من غير قياس = تخمين.', 'Without data it is guessing.'))
      ] },

    { title: B('مراقبة الوكلاء', 'Observing agents'),
      goal: B('تعرف الوكيل عمل إيه وليه في أي محادثة.', 'Know what the agent did and why in any conversation.'),
      learn: [
        L(B('الخطوات الوسيطة', 'Intermediate steps'),
          B('فعّل **Return Intermediate Steps** في الـ AI Agent عشان تشوف كل أداة اتنادت ومدخلاتها ونتيجتها. احفظها في جدول `agent_steps(conversation, step, tool, input, output, at)`. لما عميل يشتكي «البوت حجزلي غلط»، ترجع للخطوات وتلاقي السبب.', 'Enable **Return Intermediate Steps** in the AI Agent to see each tool called, its input and its result. Save them to a table `agent_steps(conversation, step, tool, input, output, at)`. When a customer complains «the bot booked the wrong time», you go back to the steps and find the cause.'),
          'step 1 check_slots({ day: "Thursday" }) → [17:00, 18:00]\nstep 2 book_slot({ time: "18:00" })  ← customer said 17:00 → bug found'),
        L(B('أنماط فشل الوكلاء', 'Agent failure patterns'),
          B('الأشهر: **tool misuse** (أداة غلط أو مدخلات غلط)، حلقة نداء نفس الأداة، اختراع معلومة مش من الأدوات، تجاهل قاعدة في التعليمات، ورد بلغة غلط. كل نمط ليه علاج: وصف أداة أوضح، حد خطوات، «جاوب من الأدوات بس»، أو مثال في التعليمات.', 'The common ones: **tool misuse** (the wrong tool or wrong inputs), a loop calling the same tool, inventing a fact not from the tools, ignoring a rule in the instructions, and replying in the wrong language. Each has a fix: a clearer tool description, a step limit, «answer only from the tools», or an example in the instructions.'),
          'tool misuse → rewrite the tool description (when to use / not)\ninvented price → "only quote prices returned by get_price"'),
        L(B('مراجعة المحادثات', 'Reviewing conversations'),
          B('كل أسبوع خُد عينة عشوائية (مثلًا 20 محادثة) + كل المحادثات اللي فيها شكوى أو تحويل لإنسان، وقيّمها بمعيار ثابت (صح؟ مهذب؟ اتبع القواعد؟). الأخطاء تتحول لـ fixtures جديدة عشان متتكررش.', 'Every week take a random sample (e.g. 20 conversations) + every conversation with a complaint or human handoff, and score them with a fixed rubric (correct? polite? followed the rules?). Mistakes become new fixtures so they do not repeat.'),
          'weekly: 20 random + all handoffs → rubric (correct / polite / rules / language)\nmistake → new fixture → tests')
      ],
      practice: [
        B('فعّل الخطوات الوسيطة واحفظها في جدول.', 'Enable intermediate steps and save them to a table.'),
        B('اعمل عمدًا 3 أنماط فشل وصلّح كل واحد.', 'Cause 3 failure patterns on purpose and fix each.'),
        B('اعمل فورم مراجعة أسبوعي بمعيار من 4 نقط.', 'Build a weekly review form with a 4-point rubric.'),
        B('حوّل كل غلطة لـ fixture جديد.', 'Turn every mistake into a new fixture.')
      ],
      words: [
        W('intermediate steps', 'الخطوات اللي الوكيل عملها قبل الرد', 'the steps an agent took before replying', 'Save the intermediate steps for each chat.'),
        W('trace', 'سجل كامل لمسار طلب واحد', 'a complete record of one request’s path', 'The trace showed the wrong tool input.'),
        W('tool misuse', 'استخدام الوكيل لأداة غلط أو بمدخلات غلط', 'an agent using the wrong tool or wrong inputs', 'Tool misuse dropped after a clearer description.'),
        W('rubric', 'معايير ثابتة للتقييم', 'fixed criteria for scoring', 'Score every reviewed chat with the rubric.'),
        W('random sample', 'عينة مختارة عشوائيًا', 'a randomly chosen subset', 'Review a random sample of 20 chats.')
      ],
      read: ['lib:n8n Docs: Executions', { lib: 'OWASP Top 10 for LLM Applications', what: B('اقرا عن أنماط الفشل والهجمات.', 'Read about failure patterns and attacks.') }],
      challenge: B('اعمل «لوحة مراقبة» لفريق الوكلاء: الخطوات محفوظة، تقرير أسبوعي (تكلفة، تحويلات، أنماط فشل)، مراجعة عينة بمعيار، وكل غلطة بقت اختبار.', 'Build a «monitoring board» for the agent team: steps saved, a weekly report (cost, handoffs, failure patterns), a rubric review of a sample, and every mistake turned into a test.'),
      quiz: [
        Q(B('عشان تعرف الوكيل نادى إيه:', 'To know what the agent called:'), [['Return Intermediate Steps', 'Return Intermediate Steps'], ['تسأله', 'ask it'], ['مستحيل', 'impossible']], 0, B('واحفظها.', 'And save them.')),
        Q(B('الوكيل بيخترع أسعار:', 'The agent invents prices:'), [['«الأسعار من get_price بس» في التعليمات', '«prices only from get_price» in the instructions'], ['موديل أكبر بس', 'just a bigger model'], ['تجاهل', 'ignore it']], 0, B('مصدر واحد للحقيقة.', 'One source of truth.')),
        Q(B('الغلطة اللي اكتشفتها في المراجعة:', 'A mistake found in review:'), [['تبقى fixture جديد', 'becomes a new fixture'], ['تتنسي', 'is forgotten'], ['تتمسح', 'is deleted']], 0, B('متتكررش.', 'So it does not repeat.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('فريق وكلاء بذاكرة ومراقبة وتكلفة محسوبة.', 'An agent team with memory, monitoring and controlled cost.'),
      review: [
        B('حدود الوكيل الواحد، والمشرف والمتخصصين، والبداية بالأبسط.', 'Limits of one agent, the supervisor and specialists, and starting simple.'),
        B('الذاكرة القصيرة والطويلة والملخّصة، والـ session key، والتنضيف.', 'Short, long and summary memory, the session key, and pruning.'),
        B('بطاقة الوكيل، والتسليم بـ JSON، وأقل صلاحيات.', 'The agent card, JSON handoffs, and least access.'),
        B('توجيه الموديلات، وحدود الخطوات، وقياس التكلفة.', 'Model routing, step limits and measuring cost.'),
        B('الخطوات الوسيطة، أنماط الفشل، والمراجعة الأسبوعية.', 'Intermediate steps, failure patterns and the weekly review.')
      ],
      project: B('ابني «مساعد عيادة متعدد الوكلاء» على تليجرام أو واتساب: مشرف + حجز + فواتير + دعم (RAG من أسئلة شائعة)، ذاكرة Postgres وحقائق طويلة، صلاحيات مختلفة، توجيه موديلات، حدود، الخطوات محفوظة، 24 اختبار، وتقرير أسبوعي. سلّم رسمة وفيديو.', 'Build a «multi-agent clinic assistant» on Telegram or WhatsApp: a supervisor + booking + billing + support (RAG over FAQs), Postgres memory and long-term facts, different permissions, model routing, limits, saved steps, 24 tests and a weekly report. Deliver a diagram and a video.'),
      test: [
        Q(B('وكيل واحد بـ 20 أداة:', 'One agent with 20 tools:'), [['غالبًا بيغلط في الاختيار', 'often picks the wrong tool'], ['مثالي', 'is ideal'], ['أرخص', 'is cheaper']], 0, B('قسّم.', 'Split it.')),
        Q(B('المشرف بينادي المتخصص كـ:', 'The supervisor calls a specialist as:'), [['أداة', 'a tool'], ['إيميل', 'an email'], ['cron', 'a cron job']], 0, B('AI Agent Tool أو workflow tool.', 'AI Agent Tool or a workflow tool.')),
        Q(B('ذاكرة تفضل بعد إعادة تشغيل n8n:', 'Memory that survives an n8n restart:'), [['Postgres Chat Memory', 'Postgres Chat Memory'], ['Simple Memory', 'Simple Memory'], ['متغير في Code', 'a Code variable']], 0, B('في قاعدة بيانات.', 'In a database.')),
        Q(B('session key بيفصل:', 'The session key separates:'), [['ذاكرة كل عميل', 'each customer’s memory'], ['الموديلات', 'models'], ['الأدوات', 'tools']], 0, B('مثلًا رقم الموبايل.', 'E.g. the phone number.')),
        Q(B('محادثة طويلة جدًا:', 'A very long conversation:'), [['لخّص القديم واحتفظ بالأخير', 'summarise the old part, keep the latest'], ['ابعتها كلها كل مرة', 'send all of it every time'], ['امسحها', 'delete it']], 0, B('summary memory.', 'Summary memory.')),
        Q(B('بطاقة الوكيل فيها:', 'An agent card includes:'), [['المهمة والأدوات والحدود', 'the task, tools and limits'], ['كلمة السر', 'the password'], ['لون الواجهة', 'the UI colour']], 0, B('بتبقى الـ system prompt.', 'It becomes the system prompt.')),
        Q(B('وكيل الدعم يحتاج صلاحية:', 'The support agent needs:'), [['قراءة بس', 'read-only access'], ['كتابة في كل حاجة', 'write access to everything'], ['استرجاع فلوس', 'refund access']], 0, B('أقل صلاحية.', 'Least access.')),
        Q(B('model routing يعني:', 'Model routing means:'), [['الموديل المناسب لكل خطوة', 'the right model for each step'], ['موديل واحد للكل', 'one model for everything'], ['من غير موديل', 'no model']], 0, B('صغير للبسيط.', 'Small for simple steps.')),
        Q(B('Max Iterations:', 'Max Iterations:'), [['حد خطوات الوكيل', 'a cap on the agent’s steps'], ['عدد العملاء', 'the number of customers'], ['طول الرد', 'reply length']], 0, B('ضد الحلقات.', 'Against loops.')),
        Q(B('الخطوات الوسيطة بتساعد في:', 'Intermediate steps help to:'), [['معرفة سبب الغلط', 'find the cause of a mistake'], ['تسريع الرد', 'speed up replies'], ['تقليل الأدوات', 'reduce tools']], 0, B('trace كامل.', 'A full trace.')),
        Q(B('tool misuse علاجه غالبًا:', 'Tool misuse is usually fixed by:'), [['وصف أداة أوضح', 'a clearer tool description'], ['موديل أصغر', 'a smaller model'], ['أدوات أكتر', 'more tools']], 0, B('إمتى تستخدمها وإمتى لأ.', 'When to use it and when not.')),
        Q(B('المراجعة الأسبوعية بتشمل:', 'The weekly review includes:'), [['عينة عشوائية + كل التحويلات', 'a random sample + every handoff'], ['ولا محادثة', 'no conversations'], ['المحادثات الناجحة بس', 'only successful chats']], 0, B('بمعيار ثابت.', 'With a fixed rubric.'))
      ] }
  ]
};
