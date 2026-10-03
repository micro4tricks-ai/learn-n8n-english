// English week 29 — Design docs and proposals.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2 → C1',
  title: B('مستندات التصميم والمقترحات', 'Design docs and proposals'),
  goal: B('تكتب مستند تصميم ومقترح تقني بالإنجليزي يقنع فريق أو عميل: هيكل واضح، وأهداف وحدود دقيقة، ومقارنة بدائل بلغة الموازنة، وطلب واضح، واستقبال الملاحظات والرد عليها.',
          'Write a design doc and a technical proposal in English that convince a team or a client: a clear structure, precise goals and limits, comparing alternatives in the language of trade-offs, a clear ask, and receiving and answering feedback.'),
  days: [
    { title: B('هيكل مستند التصميم', 'The design doc structure'),
      goal: B('تعرف الأجزاء الأساسية لـ design doc وتكتب أول مسودة.', 'Know the main parts of a design doc and write a first draft.'),
      learn: [
        L(B('الأجزاء', 'The parts'),
          B('**design doc** شائع: Title + الكاتب والتاريخ والحالة (draft / in review / approved)، **Context** (ليه دلوقتي)، Goals و**Non-goals**، Proposal (الحل)، **Alternatives considered**، Risks، **Rollout plan**، Open questions. طوله 2–6 صفحات غالبًا.', 'A typical **design doc**: Title + author, date and status (draft / in review / approved), **Context** (why now), Goals and **Non-goals**, the Proposal (the solution), **Alternatives considered**, Risks, a **Rollout plan**, and Open questions. Usually 2–6 pages.'),
          'Title: Move order intake to a queue\nStatus: In review · Author: M. · 2026-10-05\n1 Context  2 Goals / Non-goals  3 Proposal  4 Alternatives  5 Risks  6 Rollout  7 Open questions'),
        L(B('السياق في فقرة', 'Context in one paragraph'),
          B('السياق بيرد على «ليه نتكلم في ده دلوقتي؟» بحقايق وأرقام: الوضع الحالي، المشكلة، وأثرها. ابدأ بالمشكلة مش بالحل. القارئ اللي مش فاهم المشكلة مش هيقتنع بأي حل.', 'The context answers «why are we discussing this now?» with facts and numbers: the current state, the problem and its impact. Start with the problem, not the solution. A reader who does not understand the problem will not accept any solution.'),
          '"Orders arrive in bursts of up to 2,000 in five minutes during campaigns.\n Our webhook processes them one by one, so 3–5% time out and are lost."'),
        L(B('الحالة والإصدار', 'Status and version'),
          B('حط في أول المستند الحالة والإصدار وسجل تغييرات صغير. القارئ لازم يعرف: ده رأي أولي ولا قرار؟ اتعدّل إيه من آخر مرة؟ «v2: added a cost estimate; moved Redis to Alternatives».', 'Put the status, version and a small change history at the top. The reader must know: is this an early idea or a decision? What changed since last time? «v2: added a cost estimate; moved Redis to Alternatives».'),
          'Status: Approved (2026-10-12) · v3\nChanges: v2 cost estimate · v3 rollout in two phases')
      ],
      practice: [
        B('اقرا design doc عام لمشروع مفتوح المصدر واكتب أقسامه.', 'Read a public design doc from an open-source project and list its sections.'),
        B('اكتب قسم Context لتغيير عايز تعمله في مشروعك.', 'Write the Context section for a change you want to make in your project.'),
        B('ابدأ قالب design doc بالأقسام السبعة.', 'Start a design doc template with the seven sections.'),
        B('اكتب سطر الحالة والإصدار.', 'Write the status and version line.')
      ],
      words: [
        W('design doc', 'مستند بيشرح حل تقني قبل تنفيذه', 'a document explaining a technical solution before building it', 'Write a design doc before the big refactor.'),
        W('context', 'الخلفية والسبب', 'the background and the reason', 'The context explains the lost orders.'),
        W('alternatives considered', 'الحلول التانية اللي فكرنا فيها', 'other solutions that were weighed', 'List Redis under alternatives considered.'),
        W('rollout plan', 'خطة نشر التغيير على مراحل', 'the plan for releasing a change in stages', 'The rollout plan starts with one client.'),
        W('open question', 'سؤال لسه محتاج قرار', 'a question still waiting for a decision', 'Who pays for the server is an open question.')
      ],
      read: [{ t: 'Design Docs at Google (industrialempathy.com)', url: 'https://www.industrialempathy.com/posts/design-docs-at-google/', what: B('اقرا الأقسام وإمتى تكتب design doc.', 'Read the sections and when to write a design doc.') }, 'lib:Google Technical Writing Courses'],
      challenge: B('اكتب مسودة design doc (صفحتين) لتغيير حقيقي في مشروع من رحلة n8n أو بايثون، بالأقسام السبعة والحالة «draft».', 'Write a two-page draft design doc for a real change in a project from the n8n or Python journey, with the seven sections and the status «draft».'),
      quiz: [
        Q(B('مستند التصميم يبدأ بـ:', 'A design doc starts with:'), ['the context and the problem', 'the code', 'the solution only'], 0, B('ليه دلوقتي.', 'Why now.')),
        Q(B('«Status: In review» معناها:', '«Status: In review» means:'), ['people are giving feedback; not decided yet', 'it is approved', 'it is cancelled'], 0, B('لسه مش قرار.', 'Not a decision yet.')),
        Q(B('alternatives considered فيها:', 'Alternatives considered lists:'), ['other options and why they were not chosen', 'the team members', 'the deadlines'], 0, B('البدائل.', 'The alternatives.'))
      ] },

    { title: B('الأهداف وغير الأهداف', 'Goals and non-goals'),
      goal: B('تحدد اللي هيتعمل واللي مش هيتعمل بدقة تمنع سوء الفهم.', 'Define what will and will not be done precisely enough to prevent misunderstanding.'),
      learn: [
        L(B('أهداف بتتقاس', 'Measurable goals'),
          B('الهدف الكويس بيتقاس: «Reduce lost orders during campaigns to under 0.1%» أحسن من «Make intake more reliable». وحط **success metric** لكل هدف: هنعرف إننا نجحنا إزاي؟', 'A good goal is measurable: «Reduce lost orders during campaigns to under 0.1%» beats «Make intake more reliable». Add a **success metric** for each goal: how will we know we succeeded?'),
          'Goal: no order is lost during a burst of 2,000 in 5 minutes.\nSuccess metric: lost orders < 0.1% over the next two campaigns.'),
        L(B('غير الأهداف', 'Non-goals'),
          B('**non-goals** = حاجات قريبة من الموضوع **قررنا منعملهاش** دلوقتي. أهميتها: بتمنع النقاش يتوه، وبتمنع حد يفتكر إنك وعدت بيها. «Non-goal: redesigning the order form. Non-goal: real-time stock sync (separate doc).»', '**Non-goals** = things close to the topic that we **decided not to do** now. They matter because they stop the discussion drifting and stop people assuming you promised them. «Non-goal: redesigning the order form. Non-goal: real-time stock sync (separate doc).»'),
          'Goals: queue all incoming orders; process 50/min steadily.\nNon-goals: change the CRM; support SMS orders.'),
        L(B('لغة النطاق', 'Scope language'),
          B('**out of scope** = بره النطاق. «This proposal covers X only.» «Y is deferred to phase 2.» «We assume Z is already in place.» الافتراضات (assumptions) مهمة: لو اتضح إنها غلط، الخطة بتتغيّر.', '**Out of scope** = outside the agreed area. «This proposal covers X only.» «Y is deferred to phase 2.» «We assume Z is already in place.» Assumptions matter: if one turns out false, the plan changes.'),
          'In scope: website and WhatsApp orders.\nOut of scope: phone orders (deferred to phase 2).\nAssumption: Postgres is already running in production.')
      ],
      practice: [
        B('اكتب 3 أهداف قابلة للقياس لمشروعك.', 'Write 3 measurable goals for your project.'),
        B('اكتب 4 non-goals قريبين من الموضوع.', 'Write 4 non-goals close to the topic.'),
        B('حوّل 3 أهداف غامضة لأهداف بأرقام.', 'Turn 3 vague goals into goals with numbers.'),
        B('اكتب قسم assumptions بـ 3 افتراضات.', 'Write an assumptions section with 3 assumptions.')
      ],
      words: [
        W('goal', 'اللي عايز توصله', 'what you aim to achieve', 'Each goal needs a number.'),
        W('non-goal', 'حاجة قررت متعملهاش دلوقتي', 'something you decided not to do now', 'A redesign is a non-goal.'),
        W('success metric', 'الرقم اللي بيقول إنك نجحت', 'the number showing you succeeded', 'The success metric is lost orders below 0.1%.'),
        W('out of scope', 'بره النطاق المتفق عليه', 'outside the agreed area', 'Phone orders are out of scope.'),
        W('deferred', 'متأجل لبعدين', 'postponed to later', 'SMS support is deferred to phase 2.')
      ],
      read: ['lib:Google Technical Writing Courses', { lib: 'The Scrum Guide', what: B('شوف إزاي الأهداف بتتكتب.', 'See how goals are written.') }],
      challenge: B('اكمل الـ design doc: أهداف بأرقام وsuccess metrics، و4 non-goals، وin/out of scope، وassumptions — وخلّي حد يقراه ويقولك فهم إيه اللي مش هيتعمل.', 'Complete the design doc: goals with numbers and success metrics, 4 non-goals, in/out of scope, and assumptions — have someone read it and tell you what they understood will not be done.'),
      quiz: [
        Q(B('هدف قابل للقياس:', 'A measurable goal:'), ['«Lost orders under 0.1% in campaigns»', '«Better reliability»', '«Nice system»'], 0, B('رقم.', 'A number.')),
        Q(B('non-goal:', 'A non-goal is:'), ['something we decided not to do now', 'a failed goal', 'a secret goal'], 0, B('قرار واضح.', 'A clear decision.')),
        Q(B('«deferred to phase 2»:', '«deferred to phase 2»:'), ['postponed to a later phase', 'cancelled forever', 'done already'], 0, B('متأجل.', 'Postponed.'))
      ] },

    { title: B('لغة الموازنة بين البدائل', 'The language of comparing alternatives'),
      goal: B('تقارن حلول بإنصاف وتقول ليه اخترت واحد.', 'Compare solutions fairly and say why you chose one.'),
      learn: [
        L(B('كلمات الموازنة', 'Trade-off words'),
          B('`whereas` (في حين إن)، `on the other hand`، `at the cost of` (على حساب)، `in exchange for` (مقابل)، `outweigh` (يتفوق في الوزن)، `the downside is…`، `the main advantage is…`. «Redis is faster, whereas Postgres is already in our stack.»', '`whereas`, `on the other hand`, `at the cost of`, `in exchange for`, `outweigh`, `the downside is…`, `the main advantage is…`. «Redis is faster, whereas Postgres is already in our stack.»'),
          '"A Postgres queue is simpler to run, at the cost of lower throughput.\n For our volume, simplicity outweighs speed."'),
        L(B('مصفوفة القرار', 'The decision matrix'),
          B('**decision matrix**: جدول البدائل × المعايير (التكلفة، التعقيد، السرعة، المخاطرة)، ودرجة لكل خانة، وأحيانًا **weighting** (وزن) لكل معيار. بيخلّي القرار مفهوم ومش «إحساس».', 'A **decision matrix**: a table of alternatives × criteria (cost, complexity, speed, risk), with a score per cell and sometimes a **weighting** per criterion. It makes the decision understandable rather than «a feeling».'),
          '| Option          | Cost (×2) | Ops effort | Throughput | Total |\n| Postgres queue  | 5         | 5          | 3          | 18    |\n| Redis           | 4         | 3          | 5          | 16    |'),
        L(B('كن منصف', 'Be fair'),
          B('اكتب أحسن حجة للبديل اللي رفضته، مش أضعف حجة. القرّاء بيثقوا في المستند اللي بيعترف بعيوب اختياره: «The main downside of our choice is…; we mitigate it by…».', 'Write the best argument for the option you rejected, not the weakest. Readers trust a document that admits the weaknesses of its own choice: «The main downside of our choice is…; we mitigate it by…».'),
          '"Redis would give us 10× throughput. We chose Postgres because we already run it;\n if volume passes 50k orders/day we will revisit this decision."')
      ],
      practice: [
        B('اكتب 6 جمل مقارنة بكلمات الموازنة.', 'Write 6 comparison sentences with trade-off words.'),
        B('اعمل decision matrix لـ 3 بدائل بأوزان.', 'Build a weighted decision matrix for 3 alternatives.'),
        B('اكتب أقوى حجة للبديل اللي رفضته.', 'Write the strongest argument for the option you rejected.'),
        B('اكتب «downside + mitigation» لاختيارك.', 'Write «downside + mitigation» for your choice.')
      ],
      words: [
        W('whereas', 'في حين إن', 'while on the other hand', 'Option A is cheap, whereas B is fast.'),
        W('at the cost of', 'على حساب', 'with the loss of', 'It is simpler at the cost of speed.'),
        W('outweigh', 'أهم من / يتفوق على', 'to be more important than', 'Simplicity outweighs speed for us.'),
        W('decision matrix', 'جدول بيقارن البدائل بمعايير', 'a table comparing options by criteria', 'The decision matrix favours Postgres.'),
        W('mitigation', 'إجراء بيقلل خطر أو عيب', 'a step that reduces a risk or downside', 'Our mitigation is a load test before launch.')
      ],
      read: [{ lib: 'Martin Fowler', what: B('اقرا أي مقال فيه مقارنة واتعلم أسلوب الموازنة.', 'Read any comparison article and learn the trade-off style.') }, 'lib:Ludwig'],
      challenge: B('اكتب قسم «Alternatives considered» كامل: 3 بدائل، decision matrix بأوزان، أقوى حجة لكل بديل مرفوض، وdownside اختيارك والـ mitigation.', 'Write a full «Alternatives considered» section: 3 alternatives, a weighted decision matrix, the strongest case for each rejected option, and your choice’s downside with its mitigation.'),
      quiz: [
        Q(B('«simpler at the cost of speed»:', '«simpler at the cost of speed»:'), ['simpler but slower', 'simpler and faster', 'neither'], 0, B('على حساب.', 'At the expense of.')),
        Q(B('مستند أكثر إقناعًا:', 'A more convincing doc:'), ['admits its choice’s downsides', 'hides every weakness', 'compares nothing'], 0, B('ثقة.', 'Trust.')),
        Q(B('weighting في المصفوفة:', 'Weighting in a matrix:'), ['makes some criteria count more', 'adds colours', 'removes options'], 0, B('أوزان.', 'Weights.'))
      ] },

    { title: B('المقترح المقنع', 'The persuasive proposal'),
      goal: B('تكتب مقترح بيطلب قرار أو ميزانية ويتوافق عليه.', 'Write a proposal asking for a decision or budget that gets approved.'),
      learn: [
        L(B('إطار المشكلة', 'Framing the problem'),
          B('**framing**: اوصف المشكلة بلغة اللي هيقرر، مش بلغتك: المدير بيهتم بالفلوس والوقت والمخاطرة، مش بنوع قاعدة البيانات. «We lose about 60 orders per campaign (≈ 18,000 EGP)» أقوى من «Our webhook has timeouts».', '**Framing**: describe the problem in the decision-maker’s language, not yours: a manager cares about money, time and risk, not database types. «We lose about 60 orders per campaign (≈ 18,000 EGP)» beats «Our webhook has timeouts».'),
          'tech framing: "webhook timeouts under load"\nbusiness framing: "≈ 60 lost orders per campaign, about 18,000 EGP"'),
        L(B('الطلب الواضح', 'The clear ask'),
          B('**the ask** = المطلوب بالظبط: قرار، ميزانية، وقت، موافقة. اكتبه في أول المقترح وفي آخره: «We are asking for approval to spend two weeks and $20/month on a queue, starting 15 October.» من غير ask واضح، المقترح بيتقري ويتنسي.', '**The ask** = exactly what you need: a decision, a budget, time, approval. Put it at the start and the end: «We are asking for approval to spend two weeks and $20/month on a queue, starting 15 October.» Without a clear ask, the proposal is read and forgotten.'),
          'Ask: approve 2 weeks of work + $20/month · decision needed by 10 Oct'),
        L(B('رد على الاعتراضات قبل ما تيجي', 'Answer objections before they come'),
          B('**pre-empt** الاعتراضات المتوقعة في قسم «FAQ» أو «Risks»: «Why not just upgrade the server?» «What if the queue fails?» «Will customers notice?». كل سؤال جاوبته مسبقًا = اعتراض أقل في الاجتماع.', '**Pre-empt** expected objections in an «FAQ» or «Risks» section: «Why not just upgrade the server?» «What if the queue fails?» «Will customers notice?». Each question answered in advance = one fewer objection in the meeting.'),
          'Q: Why not a bigger server? A: Bursts are 40× normal load; a queue absorbs them for $20/month.\nQ: What if the queue fails? A: Orders stay in the table and are replayed.')
      ],
      practice: [
        B('أعد صياغة مشكلة تقنية بإطار بيزنس (فلوس/وقت/مخاطرة).', 'Reframe a technical problem in business terms (money/time/risk).'),
        B('اكتب «the ask» في جملة واحدة واضحة.', 'Write «the ask» in one clear sentence.'),
        B('اكتب 5 اعتراضات متوقعة وردودها.', 'Write 5 expected objections and their answers.'),
        B('اكتب مقترح صفحة واحدة لمدير.', 'Write a one-page proposal for a manager.')
      ],
      words: [
        W('framing', 'طريقة عرض المشكلة للقارئ', 'the way you present a problem to the reader', 'Use business framing for managers.'),
        W('the ask', 'المطلوب بالظبط من القارئ', 'exactly what you want from the reader', 'Put the ask in the first paragraph.'),
        W('pre-empt', 'ترد على حاجة قبل ما تتقال', 'to answer something before it is raised', 'Pre-empt the cost question in the FAQ.'),
        W('objection', 'اعتراض', 'a reason someone disagrees', 'The main objection was the cost.'),
        W('impact', 'الأثر', 'the effect', 'The impact is 18,000 EGP per campaign.')
      ],
      read: [{ lib: 'Paul Graham: Essays', what: B('لاحظ إزاي بيبدأ بالمشكلة ويقنع.', 'Notice how he starts with the problem and persuades.') }, 'lib:Plain Language Guidelines'],
      challenge: B('اكتب مقترح صفحة لمدير أو عميل: مشكلة بإطار بيزنس، الحل في فقرة، التكلفة والوقت، the ask في الأول والآخر، و5 أسئلة متوقعة بإجاباتها.', 'Write a one-page proposal for a manager or client: the problem in business framing, the solution in a paragraph, cost and time, the ask at the start and end, and 5 expected questions with answers.'),
      quiz: [
        Q(B('أقوى إطار لمدير:', 'The strongest framing for a manager:'), ['«≈ 18,000 EGP lost per campaign»', '«webhook timeouts»', '«we need Redis»'], 0, B('لغته.', 'Their language.')),
        Q(B('the ask مكانه:', 'The ask belongs:'), ['at the start and the end', 'hidden in the middle', 'nowhere'], 0, B('واضح.', 'Clearly visible.')),
        Q(B('pre-empt objections يعني:', 'To pre-empt objections means:'), ['answer them before they are raised', 'ignore them', 'argue loudly'], 0, B('FAQ.', 'An FAQ.'))
      ] },

    { title: B('الملاحظات والمراجعة', 'Feedback and review'),
      goal: B('تستقبل تعليقات على مستندك وترد عليها بشكل محترف.', 'Receive comments on your document and respond professionally.'),
      learn: [
        L(B('اطلب المراجعة صح', 'Ask for review properly'),
          B('حدد اللي عايزه: «Could you review sections 3 and 4 by Thursday? I’m especially unsure about the rollout plan.» اختار المراجعين المناسبين، وادّيهم وقت، وقول مستوى التفاصيل («high-level feedback only at this stage»).', 'Say what you need: «Could you review sections 3 and 4 by Thursday? I’m especially unsure about the rollout plan.» Choose the right reviewers, give them time, and state the level of detail («high-level feedback only at this stage»).'),
          '"Draft v1 is ready for review. High-level feedback only for now:\n does the approach make sense? Comments by Thursday, please."'),
        L(B('الرد على التعليقات', 'Replying to comments'),
          B('رد على كل تعليق: «Good point — **addressed** in v2 (section 4).»، «I see the concern, but I’d keep it because…»، «Let’s discuss this in the meeting.» وبعدين **resolve** الـ thread. متتجاهلش تعليق، ومتعدلش من غير ما ترد.', 'Reply to every comment: «Good point — **addressed** in v2 (section 4).», «I see the concern, but I’d keep it because…», «Let’s discuss this in the meeting.» Then **resolve** the thread. Never ignore a comment, and never edit silently.'),
          'Reviewer: "What about phone orders?"\nYou: "Good catch — added to Non-goals in v2, with a note for phase 2. Resolving."'),
        L(B('من مسودة لقرار', 'From draft to decision'),
          B('كل **revision** ليها رقم وملخص التغيير. لما التعليقات تخلص، اطلب **sign-off** صريح من صاحب القرار، وغيّر الحالة لـ Approved، وانقل الأسئلة المفتوحة اللي فاضلة لتذاكر.', 'Each **revision** has a number and a change summary. When comments are done, ask the decision-maker for explicit sign-off, change the status to Approved, and turn remaining open questions into tickets.'),
          'v1 draft → v2 (review comments) → v3 (final) → Approved by: Sara, 12 Oct')
      ],
      practice: [
        B('ابعت مسودتك لحد بطلب مراجعة محدد.', 'Send your draft to someone with a specific review request.'),
        B('اكتب 5 ردود على تعليقات (موافقة، اعتراض، تأجيل).', 'Write 5 replies to comments (agree, disagree, defer).'),
        B('اعمل revision تانية بملخص تغييرات.', 'Make a second revision with a change summary.'),
        B('اكتب رسالة طلب الموافقة النهائية.', 'Write the final approval request message.')
      ],
      words: [
        W('reviewer comment', 'تعليق من مراجع على المستند', 'a comment from a reviewer on the document', 'Reply to every reviewer comment.'),
        W('addressed', 'اتعامل معاه / اتحل', 'dealt with', 'Addressed in v2, section 4.'),
        W('resolve', 'تقفل نقاش بعد ما يتحل', 'to close a discussion once it is settled', 'Resolve the thread after replying.'),
        W('revision', 'نسخة معدّلة', 'an edited version', 'Revision 3 includes the cost estimate.'),
        W('draft', 'مسودة', 'an early, unfinished version', 'This is only a draft.')
      ],
      read: [{ lib: 'Google Engineering Practices: Code Review', what: B('نفس روح مراجعة الكود تنفع للمستندات.', 'The same spirit of code review fits documents.') }, 'lib:Conventional Comments'],
      challenge: B('خلّي design doc بتاعك يعدّي دورة مراجعة كاملة: طلب مراجعة، 5+ تعليقات بردودها، revision بملخص، وsign-off — ولو مفيش زميل، خلّي AI يلعب دور مراجع صعب.', 'Take your design doc through a full review cycle: a review request, 5+ comments with replies, a revision with a summary, and sign-off — if no colleague is available, have an AI play a tough reviewer.'),
      quiz: [
        Q(B('طلب مراجعة كويس:', 'A good review request:'), ['names sections, a deadline and the level of detail', '«Thoughts?»', 'no request'], 0, B('محدد.', 'Specific.')),
        Q(B('«Addressed in v2» معناها:', '«Addressed in v2» means:'), ['handled in version 2', 'ignored', 'deleted'], 0, B('اتحل.', 'Dealt with.')),
        Q(B('تعليق مش موافق عليه:', 'A comment you disagree with:'), ['reply with your reason', 'delete it', 'ignore it'], 0, B('باحترام.', 'Respectfully.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مستند تصميم كامل بيوصل لقرار.', 'A complete design doc that reaches a decision.'),
      review: [
        B('هيكل الـ design doc والسياق والحالة.', 'The design doc structure, context and status.'),
        B('أهداف بأرقام، non-goals، النطاق والافتراضات.', 'Goals with numbers, non-goals, scope and assumptions.'),
        B('لغة الموازنة ومصفوفة القرار والإنصاف.', 'Trade-off language, the decision matrix and fairness.'),
        B('الإطار المناسب والطلب الواضح والرد المسبق على الاعتراضات.', 'The right framing, a clear ask and pre-empting objections.'),
        B('طلب المراجعة، الرد على التعليقات، والـ sign-off.', 'Asking for review, replying to comments, and sign-off.')
      ],
      project: B('اكتب design doc كامل (3–5 صفحات) لتغيير حقيقي في واحد من مشاريعك: سياق بأرقام، أهداف وnon-goals، الحل، 3 بدائل بمصفوفة قرار، مخاطر، rollout، أسئلة مفتوحة — وعدّيه بدورة مراجعة، واكتب نسخة مقترح صفحة واحدة للمدير، وسجّل عرض 4 دقايق.', 'Write a complete design doc (3–5 pages) for a real change in one of your projects: context with numbers, goals and non-goals, the solution, 3 alternatives with a decision matrix, risks, a rollout and open questions — take it through a review cycle, write a one-page proposal version for a manager, and record a 4-minute presentation.'),
      test: [
        Q(B('قسم Context بيجاوب:', 'The Context section answers:'), ['why are we discussing this now?', 'who wrote the code?', 'what colour is the UI?'], 0, B('المشكلة.', 'The problem.')),
        Q(B('non-goals فايدتها:', 'Non-goals help to:'), ['stop drift and wrong expectations', 'add work', 'hide risks'], 0, B('وضوح.', 'Clarity.')),
        Q(B('success metric:', 'A success metric:'), ['a number showing success', 'a slogan', 'a deadline only'], 0, B('بيتقاس.', 'Measurable.')),
        Q(B('«out of scope»:', '«out of scope»:'), ['not part of this work', 'very important', 'already done'], 0, B('بره.', 'Outside.')),
        Q(B('«whereas» بتستخدم لـ:', '«whereas» is used for:'), ['contrast', 'time', 'cause'], 0, B('مقارنة.', 'Contrast.')),
        Q(B('مصفوفة القرار بتخلّي القرار:', 'A decision matrix makes the decision:'), ['understandable', 'secret', 'random'], 0, B('مش إحساس.', 'Not a feeling.')),
        Q(B('مستند منصف:', 'A fair document:'), ['gives the best case for rejected options', 'mocks other options', 'lists only its own strengths'], 0, B('ثقة.', 'Trust.')),
        Q(B('إطار بيزنس للمشكلة بيتكلم عن:', 'Business framing talks about:'), ['money, time and risk', 'library versions', 'variable names'], 0, B('لغة القرار.', 'The decision language.')),
        Q(B('the ask:', 'The ask is:'), ['exactly what you need from the reader', 'a question to the team', 'the title'], 0, B('مطلوب.', 'The request.')),
        Q(B('رد احترافي على تعليق اتعمل:', 'A professional reply to a handled comment:'), ['«Addressed in v2, section 4.»', '«ok»', 'no reply'], 0, B('مكان التعديل.', 'Where it changed.')),
        Q(B('بعد ما التعليقات تخلص:', 'When comments are done:'), ['ask for explicit sign-off', 'publish silently', 'start again'], 0, B('موافقة صريحة.', 'Explicit approval.')),
        Q(B('revision:', 'A revision is:'), ['an edited version with a number', 'a deletion', 'a meeting'], 0, B('نسخة.', 'A version.'))
      ] }
  ]
};
