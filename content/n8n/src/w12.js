// n8n week 12 — Errors and sub-workflows (end of month 3).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الأخطاء والـ Sub-workflows', 'Errors and sub-workflows'),
  goal: B('تبني workflows بتستحمل الأخطاء: تختار سلوك كل node عند الخطأ، وتعمل Error Workflow مركزي، وتقسّم الشغل لـ sub-workflows قابلة لإعادة الاستخدام، وتعمل debug للتنفيذات، وتحفظ الـ items اللي فشلت عشان تعيدها.',
          'Build workflows that survive errors: choose each node\'s error behaviour, create a central error workflow, split work into reusable sub-workflows, debug executions, and keep failed items so you can replay them.'),
  days: [
    { title: B('سلوك الـ node عند الخطأ', 'A node\'s behaviour on error'),
      goal: B('تختار بين Stop وContinue وerror output لكل node.', 'Choose between Stop, Continue and the error output for each node.'),
      learn: [
        { h: B('3 اختيارات', 'Three choices'),
          p: B('Settings ← On Error: Stop Workflow (الافتراضي، كله يقف)، Continue (يكمّل كأن مفيش حاجة)، Continue (using error output) (الـ items اللي فشلت تروح لمخرج أحمر منفصل).', 'Settings → On Error: Stop Workflow (the default; everything stops), Continue (carry on as if nothing happened), Continue (using error output) (failed items go to a separate red output).'),
          ex: 'HTTP Request (On Error: error output)\n  success → Sheet\n  error   → log failed + alert' },
        { h: B('فشل جزئي', 'Partial failure'),
          p: B('لو 100 طلب وفشل 3، الأحسن تكمّل الـ 97 وتسجّل الـ 3 بدل ما كل حاجة تقف. ده بالظبط اللي error output بيعمله.', 'If 3 of 100 requests fail, it\'s better to finish the 97 and record the 3 than to stop everything. That\'s exactly what the error output does.'),
          ex: '97 → success output\n3  → error output → "failed_items" sheet' },
        { h: B('إمتى Stop أحسن', 'When Stop is better'),
          p: B('لو الخطوة أساسية والباقي مالوش معنى من غيرها (مفيش بيانات، أو الدفع فشل)، خلّيه يقف ويتبعت تنبيه. متكملش ببيانات ناقصة.', 'If the step is essential and the rest is meaningless without it (no data, or the payment failed), let it stop and send an alert. Don\'t continue with incomplete data.'),
          ex: 'Payment failed → Stop → Error Workflow → alert' }
      ],
      practice: [
        B('اعمل HTTP Request على 10 URLs منهم 2 غلط بـ error output.', 'Call 10 URLs, 2 of them broken, with an error output.'),
        B('ودّي الـ errors لـ Sheet «failed_items» فيه السبب.', 'Send the errors to a "failed_items" sheet with the reason.'),
        B('جرّب نفس الـ workflow بـ Continue العادي وشوف الفرق.', 'Try the same workflow with plain Continue and see the difference.'),
        B('اكتب لكل node في workflow عندك الاختيار الصح وليه.', 'Write the right choice for every node in one of your workflows, and why.')
      ],
      words: [
        { t: 'Stop Workflow', m: B('الـ workflow كله يقف عند الخطأ', 'the whole workflow stops on error'), ex: 'The default On Error setting.' },
        { t: 'Continue (using error output)', m: B('الـ items اللي فشلت تروح لمخرج منفصل', 'failed items go to a separate output'), ex: 'error → failed_items sheet' },
        { t: 'partial failure', m: B('جزء من الـ items نجح وجزء فشل', 'some items succeeded and some failed'), ex: '97 ok, 3 failed' },
        { t: 'failed items log', m: B('مكان بتسجّل فيه الـ items اللي فشلت عشان تعيدها', 'a place recording failed items so you can retry them'), ex: 'Sheet: id, error, time' },
        { t: 'essential step', m: B('خطوة الباقي ملوش معنى من غيرها', 'a step the rest can\'t do without'), ex: 'No payment → stop.' }],
      read: ['lib:n8n Docs: Error handling'],
      challenge: B('خد workflow عندك بيتعامل مع items كتير، وخلّيه يكمّل رغم الأخطاء، ويسجّل الفاشل، ويبعت في الآخر: نجح كام وفشل كام.', 'Take one of your multi-item workflows, make it continue despite errors, log failures, and send a final "succeeded / failed" count.'),
      quiz: [
        { q: B('100 item فشل 3، عايز تكمّل الباقي:', '3 of 100 items fail and you want to finish the rest:'), o: ['Continue (using error output)', 'Stop Workflow', 'Wait'], a: 0, why: B('فشل جزئي.', 'Partial failure.') },
        { q: B('الدفع فشل:', 'The payment failed:'), o: [B('Stop وتنبيه', 'Stop and alert'), B('كمّل عادي', 'continue as normal'), B('تجاهل', 'ignore it')], a: 0, why: B('خطوة أساسية.', 'An essential step.') },
        { q: B('الافتراضي في On Error:', 'The default On Error setting:'), o: ['Stop Workflow', 'Continue', 'Retry forever'], a: 0, why: B('بيقف.', 'It stops.') }
      ] },

    { title: B('Error Workflow مركزي', 'A central error workflow'),
      goal: B('تعمل workflow واحد بيستقبل أخطاء كل workflows وبيبعت تنبيه مفيد.', 'Build one workflow that receives every workflow\'s errors and sends a useful alert.'),
      learn: [
        { h: B('الفكرة', 'The idea'),
          p: B('workflow بيبدأ بـ Error Trigger، وفي Settings كل workflow تاني تختاره كـ Error Workflow. لما أي واحد يقع، ده يشتغل ببيانات الخطأ.', 'A workflow that starts with an Error Trigger; in every other workflow\'s settings you pick it as the Error Workflow. When any of them fails, this one runs with the error details.'),
          ex: 'Error Trigger → format message → Telegram + log sheet' },
        { h: B('التنبيه المفيد', 'A useful alert'),
          p: B('فيه: اسم الـ workflow، والـ node اللي وقعت، ورسالة الخطأ، ولينك التنفيذ. من غير اللينك هتدوّر كتير.', 'It contains: the workflow name, the node that failed, the error message and a link to the execution. Without the link you\'ll search for ages.'),
          ex: '🔴 {{ $json.workflow.name }}\nNode: {{ $json.execution.lastNodeExecuted }}\n{{ $json.execution.error.message }}\n{{ $json.execution.url }}' },
        { h: B('alert fatigue', 'Alert fatigue'),
          p: B('لو التنبيهات كتير، الناس بتبطل تقراها. جمّع التكرار، وفرّق بين الخطير والعادي، وابعت ملخص يومي للحاجات الصغيرة.', 'If alerts are too frequent, people stop reading them. Group repeats, separate critical from minor, and send a daily digest for small issues.'),
          ex: 'critical → Telegram now\nminor → daily summary email' }
      ],
      practice: [
        B('اعمل Error Workflow فيه Error Trigger وTelegram.', 'Build an Error Workflow with an Error Trigger and Telegram.'),
        B('اربطه بـ 3 workflows من Settings.', 'Link it to 3 workflows in their settings.'),
        B('وقّع workflow بقصد (Stop and Error) واتأكد إن التنبيه وصل باللينك.', 'Make a workflow fail on purpose (Stop and Error) and check the alert arrives with the link.'),
        B('سجّل كل خطأ في Sheet كمان.', 'Also log every error in a sheet.')
      ],
      words: [
        { t: 'execution.url', m: B('لينك التنفيذ اللي وقع، جوه بيانات Error Trigger', 'the link to the failed execution, in the Error Trigger data'), ex: 'Put it in every alert.' },
        { t: 'lastNodeExecuted', m: B('اسم آخر node اشتغلت (غالبًا اللي وقعت)', 'the name of the last node that ran (usually the one that failed)'), ex: '$json.execution.lastNodeExecuted' },
        { t: 'alert fatigue', m: B('تنبيهات كتير لدرجة إن محدش بيقراها', 'so many alerts that nobody reads them'), ex: 'Group minor errors into a daily digest.' },
        { t: 'alert severity', m: B('درجة خطورة التنبيه', 'how serious an alert is'), ex: 'critical / warning / info' },
        { t: 'runbook', m: B('خطوات مكتوبة تعمل إيه لما خطأ معين يحصل', 'written steps for what to do when a given error occurs'), ex: 'If the token expired: reconnect the credential.' }],
      read: ['lib:n8n Docs: Error handling', { lib: 'n8n Workflow Templates', what: B('دوّر على «error workflow» وقارن template بشغلك.', 'Search for "error workflow" and compare a template with yours.') }],
      challenge: B('اعمل Error Workflow «ذكي»: يفرّق critical (الدفع، العملاء) من minor بـ tag أو اسم، والـ critical يروح Telegram فورًا، والـ minor يتجمّع في ملخص يومي، وكل واحد معاه سطر من الـ runbook.', 'Build a "smart" error workflow: it separates critical (payments, customers) from minor by tag or name; critical goes to Telegram at once, minor is grouped into a daily digest, and each carries a runbook line.'),
      quiz: [
        { q: B('Error Workflow بيبدأ بـ:', 'An error workflow starts with:'), o: ['Error Trigger', 'Schedule Trigger', 'Webhook'], a: 0, why: B('بيستقبل بيانات الخطأ.', 'It receives the error data.') },
        { q: B('أهم حاجة في التنبيه:', 'The most important thing in an alert:'), o: [B('لينك التنفيذ', 'the execution link'), B('إيموجي', 'emoji'), B('الوقت بس', 'only the time')], a: 0, why: B('تروح للخطأ على طول.', 'It takes you straight to the error.') },
        { q: B('alert fatigue حلها:', 'The fix for alert fatigue:'), o: [B('جمّع وفرّق حسب الخطورة', 'group and separate by severity'), B('تنبيه لكل حاجة', 'alert on everything'), B('اقفل التنبيهات', 'turn alerts off')], a: 0, why: B('تنبيهات أقل وأهم.', 'Fewer, more important alerts.') }
      ] },

    { title: B('تصميم sub-workflows', 'Designing sub-workflows'),
      goal: B('تقسّم workflow كبير لقطع صغيرة قابلة لإعادة الاستخدام بمدخلات ومخرجات واضحة.', 'Split a big workflow into small reusable pieces with clear inputs and outputs.'),
      learn: [
        { h: B('ليه sub-workflows', 'Why sub-workflows'),
          p: B('حاجة بتتكرر في كذا workflow (تنبيه، تنضيف عميل، إرسال فاتورة) اعملها مرة واحدة وناديها. تصلّحها في مكان واحد، والـ workflows الكبيرة تبقى أقصر وأوضح.', 'Something repeated across workflows (an alert, cleaning a customer, sending an invoice): build it once and call it. Fix it in one place, and big workflows become shorter and clearer.'),
          ex: 'Main flows → Execute Workflow: "Notify team"\n"Notify team" → Telegram + Slack + log' },
        { h: B('المدخلات والمخرجات', 'Inputs and outputs'),
          p: B('في «When Executed by Another Workflow» حدّد الحقول المتوقعة (name وtype). والـ sub-workflow بيرجّع بيانات آخر node للـ workflow اللي ناداه لو اخترت تستنى النتيجة.', 'In "When Executed by Another Workflow", define the expected fields (name and type). The sub-workflow returns its last node\'s data to the caller when you choose to wait for the result.'),
          ex: 'Inputs: email (string), name (string)\nReturns: { ok, customer_id }' },
        { h: B('تستنى ولا لأ', 'Wait or not'),
          p: B('Execute Workflow فيه «Wait for Sub-Workflow Completion»: لو محتاج النتيجة، استنى. لو مجرد تنبيه، متستناش والـ workflow الأساسي يكمّل على طول.', 'Execute Workflow has "Wait for Sub-Workflow Completion": if you need the result, wait. If it\'s just a notification, don\'t wait and the main workflow continues immediately.'),
          ex: 'Get customer ID → wait\nSend alert → don\'t wait' }
      ],
      practice: [
        B('طلّع جزء متكرر من 2 workflows لـ sub-workflow.', 'Move a repeated part of 2 workflows into a sub-workflow.'),
        B('عرّف المدخلات بأنواعها.', 'Define the inputs with their types.'),
        B('نادي الـ sub-workflow مرة مستني ومرة لأ، وقارن السرعة.', 'Call the sub-workflow once waiting and once not, and compare the speed.'),
        B('خلّي الـ sub-workflow يرجّع {ok, id} واستخدمه بعدها.', 'Make the sub-workflow return {ok, id} and use it afterwards.')
      ],
      words: [
        { t: 'workflow inputs', m: B('الحقول اللي الـ sub-workflow مستنيها من اللي بيناديه', 'the fields a sub-workflow expects from its caller'), ex: 'email (string), name (string)' },
        { t: 'Wait for Sub-Workflow Completion', m: B('خيار في Execute Workflow يستنى النتيجة', 'an Execute Workflow option that waits for the result'), ex: 'Off for fire-and-forget alerts.' },
        { t: 'return data', m: B('البيانات اللي الـ sub-workflow بيرجّعها', 'the data a sub-workflow sends back'), ex: 'The last node\'s output.' },
        { t: 'reusable module', m: B('قطعة شغل بتستخدمها في أكتر من مكان', 'a piece of work used in several places'), ex: 'Notify team, Clean customer' },
        { t: 'fire and forget', m: B('تبعت الشغل ومتستناش نتيجته', 'start a job without waiting for its result'), ex: 'Send the alert and move on.' }],
      read: ['lib:n8n Docs: Sub-workflows'],
      challenge: B('اعمل «library» من 4 sub-workflows (تنبيه، تنضيف عميل، safe API call، إرسال فاتورة) بمدخلات موثّقة، واستخدمهم في 2 workflows.', 'Build a "library" of 4 sub-workflows (alert, clean customer, safe API call, send invoice) with documented inputs, and use them in 2 workflows.'),
      quiz: [
        { q: B('إرسال تنبيه من workflow أساسي:', 'Sending an alert from a main workflow:'), o: [B('متستناش النتيجة', 'don\'t wait for the result'), B('استنى دايمًا', 'always wait'), B('Loop', 'a loop')], a: 0, why: B('fire and forget.', 'fire and forget.') },
        { q: B('الـ sub-workflow بيرجّع:', 'A sub-workflow returns:'), o: [B('بيانات آخر node فيه', 'its last node\'s data'), B('ولا حاجة', 'nothing'), B('أول node', 'its first node')], a: 0, why: B('لما تستنى.', 'When you wait.') },
        { q: B('ميزة الـ sub-workflows:', 'An advantage of sub-workflows:'), o: [B('تصلّح في مكان واحد', 'fix in one place'), B('أبطأ', 'slower'), B('مستحيل تتختبر', 'impossible to test')], a: 0, why: B('إعادة استخدام.', 'Reuse.') }
      ] },

    { title: B('الـ debug في التنفيذات', 'Debugging executions'),
      goal: B('تلاقي سبب أي فشل من Executions، وتعيد التنفيذ، وتستخدم إعدادات الحفظ صح.', 'Find the cause of any failure from Executions, rerun it, and use the saving settings well.'),
      learn: [
        { h: B('اقرا التنفيذ', 'Reading an execution'),
          p: B('افتح التنفيذ اللي فشل: الـ node الحمرا فيها الخطأ، وكل node تقدر تشوف مدخلها ومخرجها. قارن بتنفيذ ناجح لنفس الـ workflow.', 'Open the failed execution: the red node holds the error, and you can see each node\'s input and output. Compare with a successful run of the same workflow.'),
          ex: 'Executions → filter: Error → open → red node → Input / Output' },
        { h: B('Retry وDebug in editor', 'Retry and Debug in editor'),
          p: B('Retry بيعيد التنفيذ (ممكن من الـ node اللي فشلت)، وDebug in editor بيحط بيانات التنفيذ كـ pinned data في المحرر عشان تصلّح وتجرّب على نفس البيانات بالظبط.', 'Retry reruns the execution (possibly from the failed node), and Debug in editor loads that execution\'s data as pinned data so you can fix and test on exactly the same data.'),
          ex: 'Failed at "Send invoice" → fix → Retry from failed node' },
        { h: B('إعدادات الحفظ', 'Saving settings'),
          p: B('في Workflow settings: حفظ التنفيذات الناجحة والفاشلة واليدوية وSave execution progress (بيحفظ بعد كل node، أبطأ بس بيسمح بالاستكمال). على السيرفر كمان execution pruning عشان قاعدة البيانات متكبرش.', 'In workflow settings: save successful, failed and manual executions, and Save execution progress (saves after each node — slower, but allows resuming). On a server, execution pruning keeps the database from growing.'),
          ex: 'Save successful: No (busy workflow)\nSave failed: Yes' }
      ],
      practice: [
        B('افتح آخر 5 تنفيذات فاشلة عندك واكتب سبب كل واحد في سطر.', 'Open your last 5 failed executions and write each cause in one line.'),
        B('استخدم Debug in editor على تنفيذ فاشل وصلّحه.', 'Use Debug in editor on a failed execution and fix it.'),
        B('جرّب Retry from failed node.', 'Try Retry from the failed node.'),
        B('ظبّط إعدادات الحفظ لـ workflow بيشتغل كل دقيقة.', 'Set the saving options for a workflow that runs every minute.')
      ],
      words: ['execution pruning',
        { t: 'Retry execution', m: B('إعادة تشغيل تنفيذ فشل', 'rerunning a failed execution'), ex: 'Retry from the failed node.' },
        { t: 'Save execution progress', m: B('حفظ بعد كل node عشان تقدر تكمّل', 'saving after each node so you can resume'), ex: 'Slower, but safer for long workflows.' },
        { t: 'execution filter', m: B('فلترة التنفيذات حسب الحالة أو الوقت', 'filtering executions by status or time'), ex: 'Status: Error, last 24 h' },
        { t: 'workflow history', m: B('نسخ الـ workflow القديمة اللي ترجعلها', 'earlier versions of a workflow you can go back to'), ex: 'Restore yesterday\'s version.' }],
      read: [{ lib: 'n8n Docs: Error handling', what: B('اقرا الجزء عن الـ executions والـ debugging.', 'Read the part about executions and debugging.') }],
      challenge: B('اعمل «debug report» لأصعب مشكلة قابلتك الشهر ده: التنفيذ، والسبب، واللي جربته، والحل، وإزاي هتمنعها تاني.', 'Write a "debug report" for the hardest problem you met this month: the execution, the cause, what you tried, the fix, and how you\'ll prevent it.'),
      quiz: [
        { q: B('تصلّح على نفس بيانات التنفيذ الفاشل:', 'Fix using the exact data of a failed execution:'), o: ['Debug in editor', 'Execute Once', 'Wait'], a: 0, why: B('بيعمل pin للبيانات.', 'It pins the data.') },
        { q: B('workflow كل دقيقة وقاعدة البيانات بتكبر:', 'A workflow runs every minute and the database grows:'), o: [B('متحفظش الناجح + pruning', 'don\'t save successes + pruning'), B('احفظ كل حاجة', 'save everything'), B('امسح n8n', 'delete n8n')], a: 0, why: B('حفظ أقل.', 'Save less.') },
        { q: B('ترجع لنسخة قديمة من الـ workflow:', 'Go back to an older version of the workflow:'), o: ['workflow history', 'Error Trigger', 'Merge'], a: 0, why: B('النسخ القديمة.', 'Earlier versions.') }
      ] },

    { title: B('الاعتمادية والإعادة', 'Reliability and replay'),
      goal: B('تبني workflow تقدر تعيد تشغيل الفاشل فيه من غير تكرار، وتختبره ببيانات تجربة.', 'Build a workflow where you can replay failures without duplicates, and test it with test data.'),
      learn: [
        { h: B('dead letter', 'A dead-letter store'),
          p: B('أي item فشل بعد كل المحاولات يتحفظ في مكان (Sheet أو جدول) فيه البيانات والسبب والوقت. بعدين workflow «replay» يعيد تشغيله لما المشكلة تتحل.', 'Any item that fails after all retries is stored somewhere (a sheet or table) with its data, reason and time. Later a "replay" workflow reruns it once the problem is fixed.'),
          ex: 'failed_items: id | payload (JSON) | error | tries | created_at' },
        { h: B('الإعادة من غير تكرار', 'Replaying without duplicates'),
          p: B('عشان الإعادة متعملش الحاجة مرتين، الـ workflow لازم idempotent: قبل ما تعمل، اتأكد إنها معمولتش (بـ ID)، واستخدم Append or Update.', 'So a replay doesn\'t do things twice, the workflow must be idempotent: before acting, check it hasn\'t been done (by ID), and use Append or Update.'),
          ex: 'Check "invoices_sent" for order_id → skip if found' },
        { h: B('بيانات تجربة', 'Test data'),
          p: B('جهّز 10 items تجربة بتغطي الحالات: عادي، ناقص حقل، قيمة غريبة، مكرر، كبير جدًا. شغّلهم بعد أي تعديل (smoke test للـ workflow).', 'Prepare 10 test items covering the cases: normal, a missing field, an odd value, a duplicate, a very large one. Run them after every change (a smoke test for the workflow).'),
          ex: 'Manual Trigger → "Test data" (Code) → the real steps' }
      ],
      practice: [
        B('اعمل failed_items sheet ووصّل بيه الـ error output.', 'Create a failed_items sheet and connect the error output to it.'),
        B('اعمل workflow replay بيعيد الفاشل بـ Manual Trigger.', 'Build a replay workflow that retries failures from a Manual Trigger.'),
        B('اتأكد إن الإعادة مبتكررش (ابعت نفس item مرتين).', 'Confirm replay doesn\'t duplicate (send the same item twice).'),
        B('جهّز 10 items تجربة وشغّلهم.', 'Prepare 10 test items and run them.')
      ],
      words: [
        { t: 'dead-letter store', m: B('مكان للـ items اللي فشلت نهائيًا', 'a place for items that failed for good'), ex: 'failed_items sheet' },
        { t: 'replay', m: B('إعادة تشغيل items فشلت قبل كده', 'rerunning items that failed before'), ex: 'Replay after the API is back.' },
        { t: 'test data set', m: B('بيانات تجربة بتغطي الحالات المختلفة', 'test data covering the different cases'), ex: 'normal, missing field, duplicate…' },
        { t: 'workflow smoke test', m: B('تشغيل سريع ببيانات تجربة بعد أي تعديل', 'a quick run with test data after every change'), ex: 'Run it before activating.' },
        { t: 'retry count', m: B('عدد المحاولات لحد دلوقتي', 'the number of attempts so far'), ex: 'Give up after tries = 5.' }],
      read: ['lib:n8n Docs: Sub-workflows', 'lib:n8n Blog'],
      challenge: B('خد أهم workflow عندك وخلّيه «production-ready»: error output، failed_items، replay، idempotent، 10 test items، Error Workflow، وREADME فيه runbook.', 'Make your most important workflow "production-ready": an error output, failed_items, replay, idempotency, 10 test items, an Error Workflow, and a README with a runbook.'),
      quiz: [
        { q: B('dead-letter store بيحتفظ بـ:', 'A dead-letter store keeps:'), o: [B('الـ items اللي فشلت نهائيًا', 'items that failed for good'), B('كل الـ items', 'all items'), B('الـ credentials', 'credentials')], a: 0, why: B('للإعادة.', 'For replay.') },
        { q: B('عشان الإعادة متكررش الشغل:', 'So a replay doesn\'t repeat work:'), o: ['idempotency (check by ID)', 'a longer Wait', 'more retries'], a: 0, why: B('اتأكد قبل ما تعمل.', 'Check before acting.') },
        { q: B('بيانات التجربة المفروض تغطي:', 'Test data should cover:'), o: [B('العادي والناقص والغريب والمكرر', 'normal, missing, odd and duplicate cases'), B('العادي بس', 'only normal'), B('ولا حاجة', 'nothing')], a: 0, why: B('الـ edge cases.', 'The edge cases.') }
      ] },

    { title: B('مراجعة الشهر التالت والاختبار', 'Month 3 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 13 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 13 opens when you score 70% or more.'),
      review: [
        B('Code node وJavaScript المتوسط (الأسبوع 9).', 'The Code node and intermediate JavaScript (week 9).'),
        B('Regex وتنظيف النصوص (الأسبوع 10).', 'Regex and cleaning text (week 10).'),
        B('التفرع والدمج والتكرار والانتظار (الأسبوع 11).', 'Branching, merging, looping and waiting (week 11).'),
        B('الأخطاء والـ sub-workflows والـ debug والإعادة (الأسبوع 12).', 'Errors, sub-workflows, debugging and replay (week 12).')
      ],
      project: B('مشروع الشهر: «order processing pipeline» موثوق: طلبات بتوصل من webhook، وتتنضّف (regex)، وتتوجّه (Switch)، وتتبعت لـ API خارجي على دفعات (Loop + Wait)، والفاشل يروح failed_items ويتعاد بـ replay من غير تكرار، والموافقة على الطلبات الكبيرة بـ resumeUrl، وError Workflow مركزي، و3 sub-workflows قابلة لإعادة الاستخدام، و10 test items. كله في Git بـ README وrunbook.',
                 'Month project: a reliable "order processing pipeline": orders arrive by webhook, get cleaned (regex), routed (Switch), and sent to an external API in batches (Loop + Wait); failures go to failed_items and are replayed without duplicates; large orders need approval via resumeUrl; there is a central error workflow, 3 reusable sub-workflows and 10 test items. Everything is in Git with a README and a runbook.'),
      test: [
        { q: B('Code node في All Items بيرجّع:', 'A Code node in All Items mode returns:'), o: ['[{ json: {...} }]', '{...}', 'true'], a: 0, why: B('array من items.', 'An array of items.') },
        { q: B('تجمّع مبيعات حسب مدينة في الكود:', 'Group sales by city in code:'), o: ['reduce', 'find', 'some'], a: 0, why: B('تجميع.', 'Aggregation.') },
        { q: B('`/INV-(\\d+)/` الأقواس بتعمل:', 'In `/INV-(\\d+)/` the parentheses:'), o: [B('تمسك الرقم', 'capture the number'), B('اختياري', 'make it optional'), B('ولا حاجة', 'do nothing')], a: 0, why: B('capture group.', 'a capture group.') },
        { q: B('تشيل كل حاجة غير الأرقام:', 'Remove everything except digits:'), o: ['replace(/[^\\d]/g, "")', 'replace(/\\d/g, "")', 'trim()'], a: 0, why: B('^ = غير.', '^ = not.') },
        { q: B('أكتر من مسارين:', 'More than two paths:'), o: ['Switch', 'IF', 'Filter'], a: 0, why: B('مخارج كتير.', 'Many outputs.') },
        { q: B('Loop Over Items محتاجه لما:', 'You need Loop Over Items when:'), o: [B('API بحدود وWait بين الدفعات', 'an API has limits and you wait between batches'), B('دايمًا', 'always'), B('أبدًا', 'never')], a: 0, why: B('غالبًا مش محتاج.', 'Usually not needed.') },
        { q: B('تكمّل بعد موافقة بلينك:', 'Continue after approval by link:'), o: ['Wait + $execution.resumeUrl', 'Schedule', 'Error Trigger'], a: 0, why: B('resume.', 'resume.') },
        { q: B('3 من 100 فشلوا وعايز تكمّل:', '3 of 100 failed and you want to continue:'), o: ['Continue (using error output)', 'Stop Workflow', 'Execute Once'], a: 0, why: B('فشل جزئي.', 'Partial failure.') },
        { q: B('تنبيه مركزي لكل الأخطاء:', 'A central alert for every error:'), o: ['Error Workflow (Error Trigger)', 'a Sheet', 'Wait'], a: 0, why: B('workflow واحد للكل.', 'One workflow for all.') },
        { q: B('sub-workflow بيبدأ بـ:', 'A sub-workflow starts with:'), o: ['When Executed by Another Workflow', 'Chat Trigger', 'Gmail Trigger'], a: 0, why: B('بيتنده.', 'It is called.') },
        { q: B('تصلّح على بيانات تنفيذ فاشل:', 'Fix using a failed execution\'s data:'), o: ['Debug in editor', 'Retry forever', 'No Operation'], a: 0, why: B('pinned data.', 'pinned data.') },
        { q: B('الإعادة من غير تكرار محتاجة:', 'Replaying without duplicates needs:'), o: ['idempotency', 'more Wait', 'bigger batches'], a: 0, why: B('check by ID.', 'Check by ID.') }
      ] }
  ]
};
