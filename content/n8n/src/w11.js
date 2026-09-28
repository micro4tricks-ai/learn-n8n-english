// n8n week 11 — Branching, merging and looping.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('التفرع والدمج والتكرار', 'Branching, merging and looping'),
  goal: B('تتحكم في مسار الـ workflow بثقة: شروط مركبة، وفروع بتتنفّذ بترتيب معروف، وتكرار وقت ما تحتاجه بس، وانتظار لحدث أو ميعاد، وأنماط fan-out/fan-in.',
          'Control a workflow\'s path with confidence: compound conditions, branches that run in a known order, loops only when you need them, waiting for an event or a time, and fan-out/fan-in patterns.'),
  days: [
    { title: B('IF وSwitch بعمق', 'IF and Switch in depth'),
      goal: B('تكتب شروط مركبة وتختار بين IF وSwitch وFilter.', 'Write compound conditions and choose between IF, Switch and Filter.'),
      learn: [
        { h: B('AND وOR', 'AND and OR'),
          p: B('في IF تقدر تحط كذا شرط وتختار AND (كلهم) أو OR (أي واحد). ولو الشرط معقد، اكتبه expression واحد بيرجّع boolean.', 'In IF you can add several conditions and choose AND (all) or OR (any). If it gets complex, write one expression that returns a boolean.'),
          ex: 'AND: total > 1000 · country = "EG"\nExpression: {{ $json.total > 1000 && ["EG","SA"].includes($json.country) }}' },
        { h: B('الأنواع في المقارنة', 'Types in comparisons'),
          p: B('لو القيمة جاية نص ("100")، المقارنة كرقم ممكن تفشل. فعّل «Convert types where required» أو حوّلها بـ Number. وخلي بالك من case-sensitive في النصوص.', 'If the value arrives as text ("100"), a number comparison may fail. Turn on "Convert types where required" or convert with Number. Watch out for case-sensitivity with strings.'),
          ex: '"Paid" ≠ "paid" unless you ignore case' },
        { h: B('IF ولا Switch ولا Filter', 'IF, Switch or Filter'),
          p: B('Filter = عايز تشيل items (مخرج واحد). IF = مسارين. Switch = 3 مسارات أو أكتر (Rules أو Expression بيرجّع رقم المخرج).', 'Filter = drop items (one output). IF = two paths. Switch = three or more paths (Rules, or an Expression that returns the output number).'),
          ex: 'Switch (Expression mode): {{ ["low","mid","high"].indexOf($json.tier) }}' }
      ],
      practice: [
        B('اكتب IF بشرطين AND وواحد بـ OR.', 'Write an IF with two AND conditions and one with OR.'),
        B('اعمل مقارنة بتفشل بسبب نص وصلّحها.', 'Make a comparison that fails because of text, and fix it.'),
        B('بدّل 3 IF ورا بعض بـ Switch واحد.', 'Replace three chained IFs with one Switch.'),
        B('جرّب Switch في Expression mode.', 'Try a Switch in Expression mode.')
      ],
      words: [
        { t: 'AND / OR (conditions)', m: B('كل الشروط لازم تتحقق / أي شرط يكفي', 'all conditions must pass / any one is enough'), ex: 'total > 1000 AND country = EG' },
        { t: 'Convert types where required', m: B('خيار بيحوّل النص لرقم أو boolean وقت المقارنة', 'an option that converts text to number or boolean when comparing'), ex: '"100" > 50 → true' },
        { t: 'Rules mode (Switch)', m: B('Switch بقواعد، قاعدة لكل مخرج', 'a Switch with rules, one per output'), ex: 'Rule 1: status = paid' },
        { t: 'Expression mode (Switch)', m: B('Switch بيحدد المخرج برقم من expression', 'a Switch that picks the output by a number from an expression'), ex: '{{ $json.priority }}' },
        { t: 'case-sensitive', m: B('بيفرّق بين الحروف الكبيرة والصغيرة', 'treats capital and small letters as different'), ex: '"Paid" vs "paid"' }],
      read: ['lib:n8n Docs: Splitting with conditionals'],
      challenge: B('اعمل «order router»: طلبات بتتوجّه لـ 5 فرق حسب (الدولة، والمبلغ، ونوع المنتج) بـ Switch واحد وشروط واضحة.', 'Build an "order router": orders go to 5 teams by country, amount and product type, using one Switch with clear conditions.'),
      quiz: [
        { q: B('4 مسارات:', 'Four paths:'), o: ['Switch', 'IF', 'Filter'], a: 0, why: B('IF اتنين بس.', 'IF has only two.') },
        { q: B('المقارنة "100" > 50 بتفشل. الحل:', 'The comparison "100" > 50 fails. The fix:'), o: [B('Convert types أو Number()', 'Convert types or Number()'), B('تمسح الـ IF', 'delete the IF'), B('Wait', 'a Wait')], a: 0, why: B('النوع نص.', 'The type is text.') },
        { q: B('تشيل items مش مطلوبة:', 'Drop unwanted items:'), o: ['Filter', 'Merge', 'Switch'], a: 0, why: B('مخرج واحد.', 'One output.') }
      ] },

    { title: B('إزاي n8n بيشغّل الفروع', 'How n8n runs branches'),
      goal: B('تفهم ترتيب تنفيذ الفروع، والفروع الفاضية، وإزاي تجمّعها تاني.', 'Understand the order branches run in, empty branches, and how to bring them back together.'),
      learn: [
        { h: B('فرع ورا فرع', 'One branch after another'),
          p: B('في n8n (الترتيب v1) الفروع مش بتشتغل مع بعض في نفس اللحظة: بيخلّص فرع للآخر وبعدين اللي بعده، حسب ترتيبها على الـ canvas (من فوق لتحت). ده مهم لو فرع بيعتمد على التاني.', 'In n8n (v1 execution order) branches don\'t run at the same moment: it finishes one branch completely, then the next, in their order on the canvas (top to bottom). This matters when one branch depends on another.'),
          ex: 'IF true  (upper) → runs first to the end\nIF false (lower) → runs after' },
        { h: B('الفرع الفاضي', 'Empty branches'),
          p: B('لو مفيش items راحت لفرع، الـ nodes بتاعته مبتشتغلش خالص. لو محتاج تكمّل حتى لو فاضي: Always Output Data على الـ node اللي قبله.', 'If no items reach a branch, its nodes don\'t run at all. If you must continue even when it\'s empty, turn on Always Output Data on the node before it.'),
          ex: 'Filter → 0 items → Send email never runs' },
        { h: B('No Operation', 'No Operation'),
          p: B('«No Operation, do nothing» node مفيدة كنهاية واضحة لفرع مش عايز تعمل فيه حاجة، أو كنقطة تجميع للقراءة.', 'The "No Operation, do nothing" node is useful as a clear end of a branch where you don\'t want to do anything, or as a readable gathering point.'),
          ex: 'IF spam → No Operation (ignore)' }
      ],
      practice: [
        B('اعمل IF بفرعين كل واحد بيسجّل وقت، وشوف مين اشتغل الأول.', 'Build an IF with two branches that each log a time, and see which ran first.'),
        B('بدّل مكان الفرعين على الـ canvas وشوف الترتيب اتغيّر.', 'Swap the branches\' positions on the canvas and see the order change.'),
        B('اعمل Filter بيطلع 0 items وشوف اللي بعده مبيشتغلش، وبعدين جرّب Always Output Data.', 'Make a Filter output 0 items, see the next node not run, then try Always Output Data.'),
        B('استخدم No Operation لفرع «تجاهل».', 'Use No Operation for an "ignore" branch.')
      ],
      words: [
        { t: 'execution order', m: B('الترتيب اللي n8n بيشغّل بيه الـ nodes والفروع', 'the order in which n8n runs nodes and branches'), ex: 'Top branch first, then the next.' },
        { t: 'branch', m: B('مسار في الـ workflow بعد IF أو Switch', 'a path in the workflow after an IF or Switch'), ex: 'The "true" branch' },
        { t: 'empty branch', m: B('فرع مفيهوش items فمبيشتغلش', 'a branch with no items, so it doesn\'t run'), ex: 'Use Always Output Data if needed.' },
        { t: 'No Operation', m: B('node مبتعملش حاجة، بتستخدم كنهاية واضحة', 'a node that does nothing, used as a clear end'), ex: 'IF spam → No Operation' },
        { t: 'canvas position', m: B('مكان الـ node على الشاشة، بيأثر على ترتيب الفروع', 'a node\'s place on screen, which affects branch order'), ex: 'Upper branches run first.' }],
      read: [{ lib: 'n8n Docs: Merging data', what: B('اقرا الجزء عن ترتيب التنفيذ والـ Merge.', 'Read the part about execution order and Merge.') }],
      challenge: B('اعمل workflow فيه 3 فروع لازم يشتغلوا بترتيب (سجّل ← ابعت ← أكّد)، ورتّبهم على الـ canvas صح، واثبت الترتيب في الـ Executions.', 'Build a workflow with 3 branches that must run in order (log → send → confirm), arrange them correctly on the canvas, and prove the order in Executions.'),
      quiz: [
        { q: B('في ترتيب v1، الفروع:', 'In v1 execution order, branches:'), o: [B('بتشتغل فرع ورا فرع', 'run one after another'), B('كلها في نفس اللحظة', 'all at the same moment'), B('عشوائي', 'randomly')], a: 0, why: B('حسب المكان على الـ canvas.', 'By canvas position.') },
        { q: B('فرع مفيهوش items:', 'A branch with no items:'), o: [B('مبيشتغلش', 'doesn\'t run'), B('بيشتغل مرة', 'runs once'), B('بيطلع خطأ', 'throws an error')], a: 0, why: B('مفيش بيانات.', 'No data.') },
        { q: B('تكمّل حتى لو مفيش بيانات:', 'Continue even when there is no data:'), o: ['Always Output Data', 'Retry On Fail', 'Execute Once'], a: 0, why: B('بيطلّع item فاضي.', 'It outputs an empty item.') }
      ] },

    { title: B('التكرار', 'Looping'),
      goal: B('تعرف إمتى n8n بيكرر لوحده، وإمتى تحتاج Loop Over Items، وتتجنب الـ infinite loops.', 'Know when n8n repeats on its own, when you need Loop Over Items, and how to avoid infinite loops.'),
      learn: [
        { h: B('غالبًا مش محتاج loop', 'Usually you don\'t need a loop'),
          p: B('كل node بتشتغل على كل الـ items لوحدها. Loop Over Items محتاجها بس لو: API بيقبل item واحد في المرة بحدود، أو عايز Wait بين دفعات، أو node قديمة بتاخد أول item بس.', 'Every node already runs on all items. You need Loop Over Items only if an API accepts one item at a time with limits, you want a Wait between batches, or a node only handles the first item.'),
          ex: '100 emails → Gmail sends 100 (no loop needed)\n100 rows → API allows 10/min → Loop (10) + Wait 60s' },
        { h: B('مخارج Loop Over Items', 'Loop Over Items outputs'),
          p: B('loop = الدفعة الحالية، ترجّع آخر node لمدخل الـ Loop. done = بعد ما كل الدفعات تخلص، فيه كل النتايج. Batch Size = كام item في الدفعة.', 'loop = the current batch; wire the last node back into the Loop. done = after every batch, with all results. Batch Size = items per batch.'),
          ex: 'Loop (10) → HTTP → Wait 5s ─┐\n   ↑─────────────────────────┘\n   done → Summary' },
        { h: B('احذر الـ infinite loop', 'Beware of infinite loops'),
          p: B('لو رجّعت items جديدة للـ loop كل مرة، ممكن ميخلصش. حط شرط خروج (IF على عدد أو صفحة) وحد أقصى للتكرار.', 'If you feed new items back into the loop every time, it may never end. Add an exit condition (an IF on a count or page) and a maximum number of rounds.'),
          ex: 'IF page < 50 AND has_more → loop again\nelse → done' }
      ],
      practice: [
        B('ابعت 30 item لـ API بـ Loop Over Items (Batch 5) وWait 3 ثواني.', 'Send 30 items to an API with Loop Over Items (batch 5) and a 3-second Wait.'),
        B('اجمع النتايج من done وعدّها.', 'Collect the results from done and count them.'),
        B('اعمل نفس المهمة من غير loop وقارن.', 'Do the same job without a loop and compare.'),
        B('اعمل loop pagination بشرط خروج وحد أقصى.', 'Build a pagination loop with an exit condition and a maximum.')
      ],
      words: [
        { t: 'Batch Size', m: B('عدد الـ items في كل دفعة', 'the number of items per batch'), ex: 'Batch Size: 10' },
        { t: 'loop output', m: B('مخرج Loop Over Items للدفعة الحالية', 'the Loop Over Items output for the current batch'), ex: 'Wire it back into the loop.' },
        { t: 'done output', m: B('مخرج Loop Over Items بعد ما يخلص كله', 'the Loop Over Items output after everything is finished'), ex: 'done → summary email' },
        { t: 'exit condition', m: B('الشرط اللي بيوقف التكرار', 'the condition that stops a loop'), ex: 'has_more = false' },
        { t: 'max iterations', m: B('حد أقصى لعدد اللفات للأمان', 'a safety cap on the number of rounds'), ex: 'Stop after 50 pages.' }],
      read: ['lib:n8n Docs: Looping'],
      challenge: B('اعمل «bulk sender» بيبعت رسايل لـ 200 عميل على دفعات 20 بـ Wait دقيقة، ويكمّل لو واحد فشل، وفي الآخر يبعتلك: اتبعت كام وفشل كام.', 'Build a "bulk sender" that messages 200 customers in batches of 20 with a one-minute Wait, continues when one fails, and finally tells you how many were sent and how many failed.'),
      quiz: [
        { q: B('100 إيميل عادي من Gmail node:', '100 plain emails from the Gmail node:'), o: [B('مش محتاج loop', 'need no loop'), B('لازم loop', 'need a loop'), B('مستحيل', 'impossible')], a: 0, why: B('الـ node بتشتغل على كل item.', 'The node runs for every item.') },
        { q: B('النتايج كلها بعد ما التكرار يخلص في:', 'All results after looping come out of:'), o: ['done', 'loop', 'error'], a: 0, why: B('done.', 'done.') },
        { q: B('عشان loop ميبقاش لانهائي:', 'To keep a loop from running forever:'), o: [B('شرط خروج وحد أقصى', 'an exit condition and a maximum'), B('Wait أطول', 'a longer Wait'), B('مفيش حل', 'no fix')], a: 0, why: B('حماية.', 'Safety.') }
      ] },

    { title: B('الانتظار', 'Waiting'),
      goal: B('توقف الـ workflow لمدة، أو لميعاد، أو لحد ما حدث يحصل (webhook أو فورم).', 'Pause a workflow for a time, until a date, or until an event happens (a webhook or a form).'),
      learn: [
        { h: B('أنواع Wait', 'Kinds of Wait'),
          p: B('After Time Interval (بعد مدة)، At Specified Time (لحد ميعاد)، On Webhook Call (لحد ما حد ينادي URL)، On Form Submitted (لحد ما فورم يتملى).', 'After Time Interval, At Specified Time, On Webhook Call (until someone calls a URL), On Form Submitted (until a form is filled in).'),
          ex: 'Send quote → Wait (On Webhook Call) → client clicks Accept link → continue' },
        { h: B('resume URL', 'The resume URL'),
          p: B('في On Webhook Call، `$execution.resumeUrl` هو اللينك اللي يكمّل التنفيذ ده بالذات. تحطه في إيميل أو زرار، ولما حد يفتحه الـ workflow يكمّل من مكانه.', 'With On Webhook Call, `$execution.resumeUrl` is the link that resumes this exact execution. Put it in an email or button; when someone opens it, the workflow continues where it paused.'),
          ex: '<a href="{{ $execution.resumeUrl }}?answer=yes">Approve</a>' },
        { h: B('الانتظار الطويل', 'Long waits'),
          p: B('Wait طويل (أيام) بيتحفظ في قاعدة البيانات ومش بيستهلك ذاكرة، بس خلي بالك: لو الـ workflow اتعدّل أو السيرفر اتنقل، التنفيذات المستنية ممكن تتأثر. للمتابعات الطويلة أحيانًا Schedule بيقرا من Sheet أوضح.', 'A long Wait (days) is saved in the database and doesn\'t use memory, but be careful: editing the workflow or moving the server can affect waiting executions. For long follow-ups, a Schedule reading from a sheet is sometimes clearer.'),
          ex: 'Follow up after 3 days → Wait 3 days, or a daily Schedule checking "follow_up_at"' }
      ],
      practice: [
        B('اعمل Wait 30 ثانية وشوف التنفيذ في حالة waiting.', 'Add a 30-second Wait and see the execution in the waiting state.'),
        B('اعمل موافقة بلينك: إيميل فيه resumeUrl، ولما تفتحه يكمّل.', 'Build approval by link: an email with the resumeUrl that continues when you open it.'),
        B('ابعت query مع الـ resumeUrl (answer=yes/no) واستخدمه بعد الـ Wait.', 'Pass a query with the resumeUrl (answer=yes/no) and use it after the Wait.'),
        B('اعمل follow-up بعد يومين مرة بـ Wait ومرة بـ Schedule وقارن.', 'Build a two-day follow-up once with Wait and once with Schedule, and compare.')
      ],
      words: [{ t: 'At Specified Time', m: B('وضع Wait بيستنى لحد تاريخ وساعة محددين', 'a Wait mode that pauses until a set date and time'), ex: 'Resume at 09:00 on Monday.' },
        { t: '$execution.resumeUrl', m: B('لينك بيكمّل تنفيذ واقف في Wait', 'a link that resumes an execution paused in a Wait'), ex: 'Put it in an Approve button.' },
        { t: 'On Webhook Call', m: B('وضع Wait بيستنى لحد ما حد ينادي الـ resume URL', 'a Wait mode that pauses until the resume URL is called'), ex: 'Wait for the client to accept.' },
        { t: 'waiting execution', m: B('تنفيذ واقف بيستنى وقت أو حدث', 'an execution paused for a time or an event'), ex: 'Shown as "Waiting" in Executions.' },
        { t: 'follow-up', m: B('متابعة بعد مدة (تذكير، سؤال)', 'a later check-in (a reminder, a question)'), ex: 'Follow up after 3 days.' }],
      read: [{ lib: 'n8n Community Forum', what: B('دوّر على «wait resume url» واقرا مثالين.', 'Search for "wait resume url" and read two examples.') }],
      challenge: B('اعمل «quote approval»: عرض سعر بيتبعت للعميل بزرارين (Accept/Reject) بـ resumeUrl، ولو قبل يتعمل invoice، ولو مردّش في 3 أيام يتبعتله تذكير.', 'Build "quote approval": a quote goes to the client with Accept/Reject buttons using the resumeUrl; acceptance creates an invoice, and no answer in 3 days sends a reminder.'),
      quiz: [
        { q: B('تكمّل لما العميل يدوس لينك:', 'Continue when the client clicks a link:'), o: ['Wait: On Webhook Call + resumeUrl', 'Wait: 5 seconds', 'IF'], a: 0, why: B('الـ resume URL.', 'The resume URL.') },
        { q: B('`$execution.resumeUrl` خاص بـ:', '`$execution.resumeUrl` belongs to:'), o: [B('التنفيذ ده بالذات', 'this particular execution'), B('كل التنفيذات', 'every execution'), B('الـ workflow كله', 'the whole workflow')], a: 0, why: B('لكل تنفيذ لينك.', 'Each execution has its own.') },
        { q: B('Wait طويل أيام:', 'A Wait lasting days:'), o: [B('بيتحفظ في قاعدة البيانات', 'is saved in the database'), B('بيوقع n8n', 'crashes n8n'), B('ممنوع', 'is forbidden')], a: 0, why: B('مش في الذاكرة.', 'Not in memory.') }
      ] },

    { title: B('أنماط fan-out وfan-in', 'Fan-out and fan-in patterns'),
      goal: B('تفرّق شغل على مسارات وترجّعه في نتيجة واحدة، وتجمّع items لـ item واحد.', 'Spread work over paths and bring it back into one result, and gather items into one item.'),
      learn: [
        { h: B('fan-out', 'Fan-out'),
          p: B('item واحد بيطلع منه شغل كتير: نفس الطلب يروح لـ Sheet وEmail وSlack في فروع منفصلة من نفس الـ node.', 'One item leads to many jobs: the same order goes to a sheet, an email and Slack in separate branches from the same node.'),
          ex: 'Webhook ─┬─ Sheet\n         ├─ Email\n         └─ Slack' },
        { h: B('fan-in', 'Fan-in'),
          p: B('ترجّع الفروع لنتيجة: Merge (Append أو Choose Branch)، وبعدين Aggregate (All Item Data) عشان تعمل item واحد فيه list.', 'Bring the branches back: Merge (Append or Choose Branch), then Aggregate (All Item Data) to make one item holding a list.'),
          ex: 'Merge → Aggregate (All Item Data) → one summary email' },
        { h: B('item linking', 'Item linking'),
          p: B('بعد Aggregate أو Code، الربط بين items الأصلية بيتقطع، فـ `$("Node").item` ممكن يفشل. اقرا بـ `.first()` أو احمل الحقول اللي محتاجها معاك في الـ item.', 'After Aggregate or Code, the link to the original items is lost, so `$("Node").item` may fail. Read with `.first()` or carry the fields you need along in the item.'),
          ex: 'Keep order_id in every item instead of looking back.' }
      ],
      practice: [
        B('اعمل fan-out لـ 3 وجهات من webhook واحد.', 'Fan out to 3 destinations from one webhook.'),
        B('ارجع الفروع بـ Merge وعمل ملخص بـ Aggregate.', 'Bring the branches back with Merge and summarise with Aggregate.'),
        B('اعمل item linking error بإيدك وصلّحه بـ .first().', 'Cause an item-linking error on purpose and fix it with .first().'),
        B('ارسم الـ workflow على ورقة قبل ما تبنيه.', 'Sketch the workflow on paper before building it.')
      ],
      words: [
        { t: 'fan-out', m: B('توزيع نفس البيانات على مسارات كتير', 'sending the same data down many paths'), ex: 'Order → sheet, email, Slack' },
        { t: 'fan-in', m: B('تجميع نتايج مسارات كتير في مكان واحد', 'gathering the results of many paths into one'), ex: 'Merge → Aggregate' },
        { t: 'All Item Data', m: B('خيار Aggregate بيجمع كل الـ items في list', 'an Aggregate option that collects all items into a list'), ex: 'One item with data: [...]' },
        { t: 'item linking', m: B('الربط بين item ومصدره في nodes قبله', 'the link between an item and its source in earlier nodes'), ex: 'Broken after a Code node.' },
        { t: 'workflow diagram', m: B('رسمة الـ workflow قبل البناء', 'a sketch of the workflow before building'), ex: 'Boxes and arrows on paper.' }],
      read: ['lib:n8n Docs: Merging data', 'lib:n8n Workflow Templates'],
      challenge: B('اعمل «new customer onboarding»: عميل جديد ← (CRM، إيميل ترحيب، Telegram للفريق، مهمة في Sheet) بالتوازي، وبعدين ملخص واحد فيه نتيجة كل خطوة.', 'Build "new customer onboarding": a new customer → (CRM, welcome email, team Telegram, a sheet task) in branches, then one summary with each step\'s result.'),
      quiz: [
        { q: B('نفس الطلب لـ 3 أماكن:', 'The same order to 3 places:'), o: ['fan-out', 'fan-in', 'a loop'], a: 0, why: B('توزيع.', 'Distribution.') },
        { q: B('items كتير ← item واحد فيه list:', 'Many items → one item with a list:'), o: ['Aggregate (All Item Data)', 'Split Out', 'Filter'], a: 0, why: B('تجميع.', 'Gathering.') },
        { q: B('بعد Aggregate، `.item` فشل. الحل:', 'After Aggregate, `.item` fails. The fix:'), o: ['.first() or carry fields along', 'restart n8n', 'delete Aggregate'], a: 0, why: B('الربط اتقطع.', 'The link was broken.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 12 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 12 opens when you score 70% or more.'),
      review: [
        B('AND/OR، الأنواع في المقارنة، وIF / Switch / Filter.', 'AND/OR, types in comparisons, and IF / Switch / Filter.'),
        B('الفروع بتشتغل بالترتيب، والفرع الفاضي، وNo Operation.', 'Branches run in order, empty branches, and No Operation.'),
        B('Loop Over Items بس لما تحتاجه، loop/done، وشرط خروج.', 'Loop Over Items only when needed, loop/done, and an exit condition.'),
        B('Wait بأنواعه وresumeUrl.', 'Wait in its modes, and the resumeUrl.'),
        B('fan-out وfan-in وAggregate وitem linking.', 'Fan-out, fan-in, Aggregate and item linking.')
      ],
      project: B('ابني «approval workflow» كامل: طلب شراء بيوصل من فورم، ويتوجّه حسب المبلغ (أقل من 1000 موافقة تلقائية، أكتر يروح للمدير بلينك Approve/Reject بـ resumeUrl، أكتر من 10000 لاتنين مدرا)، ولو مفيش رد في يومين تذكير، وفي الآخر fan-out للقرار (Sheet، إيميل للطالب، Telegram للمحاسبة) وملخص واحد.',
                 'Build a complete "approval workflow": a purchase request arrives from a form and is routed by amount (under 1,000 auto-approved; above it goes to the manager with Approve/Reject links via resumeUrl; above 10,000 to two managers), with a reminder after two days without an answer, and finally a fan-out of the decision (sheet, email to the requester, Telegram to accounting) and one summary.'),
      test: [
        { q: B('IF بشرطين لازم الاتنين:', 'An IF where both conditions must pass:'), o: ['AND', 'OR', 'NOT'], a: 0, why: B('كلهم.', 'All of them.') },
        { q: B('5 مسارات حسب حالة:', 'Five paths by status:'), o: ['Switch', 'IF', 'Merge'], a: 0, why: B('أكتر من اتنين.', 'More than two.') },
        { q: B('Switch في Expression mode بيرجّع:', 'A Switch in Expression mode returns:'), o: [B('رقم المخرج', 'the output number'), B('true/false', 'true/false'), B('نص', 'text')], a: 0, why: B('0، 1، 2…', '0, 1, 2…') },
        { q: B('الفرع الأعلى على الـ canvas:', 'The upper branch on the canvas:'), o: [B('بيشتغل الأول', 'runs first'), B('بيشتغل الأخير', 'runs last'), B('مش بيشتغل', 'doesn\'t run')], a: 0, why: B('ترتيب v1.', 'v1 order.') },
        { q: B('نهاية واضحة لفرع مش عايز تعمل فيه حاجة:', 'A clear end for a do-nothing branch:'), o: ['No Operation', 'Wait', 'Code'], a: 0, why: B('do nothing.', 'do nothing.') },
        { q: B('API بيقبل 10 في الدقيقة و200 item:', 'An API allows 10 per minute and you have 200 items:'), o: ['Loop Over Items (10) + Wait', 'one HTTP call', 'Filter'], a: 0, why: B('دفعات وانتظار.', 'Batches and waits.') },
        { q: B('مخرج done في Loop Over Items:', 'The done output of Loop Over Items:'), o: [B('بعد ما كل الدفعات تخلص', 'after all batches finish'), B('كل دفعة', 'every batch'), B('عند الخطأ', 'on error')], a: 0, why: B('النتيجة النهائية.', 'The final result.') },
        { q: B('تكمّل لما العميل يوافق من إيميل:', 'Continue when the client approves from an email:'), o: ['Wait On Webhook Call + $execution.resumeUrl', 'Schedule', 'Merge'], a: 0, why: B('لينك الاستكمال.', 'The resume link.') },
        { q: B('Wait 3 أيام:', 'A 3-day Wait:'), o: [B('بيتحفظ في قاعدة البيانات', 'is stored in the database'), B('بيستهلك الذاكرة 3 أيام', 'uses memory for 3 days'), B('مستحيل', 'is impossible')], a: 0, why: B('مش في الذاكرة.', 'Not in memory.') },
        { q: B('fan-in معناه:', 'fan-in means:'), o: [B('تجميع نتايج فروع', 'gathering branch results'), B('توزيع', 'distributing'), B('حذف', 'deleting')], a: 0, why: B('عكس fan-out.', 'The opposite of fan-out.') },
        { q: B('Aggregate (All Item Data) بيطلّع:', 'Aggregate (All Item Data) outputs:'), o: [B('item واحد فيه list', 'one item with a list'), B('items كتير', 'many items'), B('ولا حاجة', 'nothing')], a: 0, why: B('تجميع.', 'Gathering.') },
        { q: B('شرط خروج في loop pagination:', 'An exit condition in a pagination loop:'), o: ['has_more = false or page limit', 'Wait 1s', 'Retry On Fail'], a: 0, why: B('عشان يقف.', 'So it stops.') }
      ] }
  ]
};
