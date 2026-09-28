// Week 15 — Code review.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('الـ Code review', 'Code review'),
  goal: B('تكتب تعليقات ريفيو واضحة ومحترمة (سؤال واقتراح بدل أمر)، وتتكلم عن التصميم والأداء والأخطاء بمصطلحاتها، وترد على الريفيو بثقة من غير ما تتضايق.',
          'Write clear, respectful review comments (questions and suggestions instead of orders), discuss design, performance and bugs with the right terms, and answer reviews confidently without getting defensive.'),
  days: [
    { title: B('شكل تعليق الريفيو', 'The shape of a review comment'),
      goal: B('تكتب تعليق فيه: الملاحظة، والسبب، والاقتراح، ودرجة أهميته.', 'Write a comment with the observation, the reason, the suggestion and how important it is.'),
      learn: [
        { h: B('تعليق من 3 أجزاء', 'A three-part comment'),
          p: B('إيه اللي شفته + ليه مهم + اقتراح. وقول الأهمية: nit (صغيرة)، suggestion (اختياري)، blocking (لازم قبل الـ merge).', 'What you noticed + why it matters + a suggestion. Say how important it is: nit (small), suggestion (optional), blocking (must fix before merge).'),
          ex: 'Blocking: this query runs inside the loop, so it hits the DB 100 times.\nCould we fetch all users once before the loop?' },
        { h: B('اتكلم عن الكود مش عن الشخص', 'Talk about the code, not the person'),
          p: B('✗ «You wrote this wrong.» ✓ «This function might fail when the list is empty.» استخدم we وthis وthe code.', '✗ "You wrote this wrong." ✓ "This function might fail when the list is empty." Use we, this and the code.'),
          ex: '✗ Why did you do this?\n✓ What\'s the reason for the extra copy here? I might be missing something.' },
        { h: B('مصطلحات التصميم', 'Design terms'),
          p: B('override (تعيد كتابة method موروثة)، overload (نفس الاسم بباراميترز مختلفة)، interface، abstract class، encapsulation (تخبي التفاصيل)، abstraction (تبسيط).', 'override (rewrite an inherited method), overload (same name, different parameters), interface, abstract class, encapsulation (hide the details), abstraction (simplify).'),
          ex: 'This class overrides save() but doesn\'t call super().\nCould we hide these fields behind a method (encapsulation)?' }
      ],
      practice: [
        B('اكتب 6 تعليقات ريفيو بالقالب (ملاحظة + سبب + اقتراح) على كود حقيقي.', 'Write 6 review comments with the template (observation + reason + suggestion) on real code.'),
        B('أعد كتابة 5 تعليقات هجومية لتعليقات عن الكود.', 'Rewrite 5 harsh comments so they are about the code.'),
        B('صنّف 6 ملاحظات: nit ولا suggestion ولا blocking.', 'Classify 6 remarks as nit, suggestion or blocking.'),
        B('اشرح override وoverload بمثال كود وجملتين.', 'Explain override and overload with a code example and two sentences.')
      ],
      words: ['override', 'overload', 'static', 'interface', 'abstract class', 'encapsulation', 'abstraction'],
      read: [{ lib: 'Google Engineering Practices: Code Review', what: B('اقرا «How to write code review comments».', 'Read "How to write code review comments".') }],
      challenge: B('راجع PR مفتوح في مشروع مفتوح المصدر (من غير ما تنشر لو مش متأكد) واكتب 5 تعليقات بالقالب.', 'Review an open PR in an open-source project (don\'t post if you\'re unsure) and write 5 comments with the template.'),
      quiz: [
        { q: B('أحسن تعليق:', 'The best comment:'), o: ['This is wrong.', 'This might break for empty lists; could we add a guard?', 'Why did you write this?'], a: 1, why: B('ملاحظة + اقتراح، عن الكود.', 'An observation + a suggestion, about the code.') },
        { q: B('blocking معناها:', 'blocking means:'), o: [B('لازم تتصلح قبل الـ merge', 'must be fixed before merging'), B('ملاحظة صغيرة', 'a small note'), B('مدح', 'praise')], a: 0, why: B('بتوقف الموافقة.', 'It holds the approval.') },
        { q: B('override يعني:', 'override means:'), o: [B('تعيد كتابة method موروثة', 'rewrite an inherited method'), B('نفس الاسم بباراميترز مختلفة', 'same name, different parameters'), B('تمسح الكلاس', 'delete the class')], a: 0, why: B('overload هو التاني.', 'overload is the second one.') }
      ] },

    { title: B('الاقتراح بأدب', 'Suggesting politely'),
      goal: B('تقترح بديل بـ could/might/what about، وتتكلم عن design patterns.', 'Suggest alternatives with could/might/what about, and talk about design patterns.'),
      learn: [
        { h: B('صيغ الاقتراح', 'Ways to suggest'),
          p: B('Could we…? / What about…? / Have you considered…? / One option is… / I\'d suggest… / Consider using… / It might be cleaner to…', 'Could we…? / What about…? / Have you considered…? / One option is… / I\'d suggest… / Consider using… / It might be cleaner to…'),
          ex: 'Have you considered a dictionary instead of the if/elif chain?\nIt might be cleaner to move this into a helper.' },
        'g:could have مش could of',
        { h: B('design patterns بالكلام', 'Design patterns in words'),
          p: B('factory (بيعمل objects)، singleton (نسخة واحدة)، adapter (بيوصّل واجهتين)، strategy (سلوك قابل للتبديل)، observer (بيبلّغ لما حاجة تتغيّر).', 'factory (creates objects), singleton (one instance), adapter (connects two interfaces), strategy (swappable behaviour), observer (notifies when something changes).'),
          ex: 'A factory could instantiate the right parser for each file type.' }
      ],
      practice: [
        B('اكتب 7 اقتراحات، كل واحد بصيغة مختلفة.', 'Write 7 suggestions, each in a different form.'),
        B('اكتب 3 جمل بـ could have / should have عن قرارات قديمة.', 'Write 3 sentences with could have / should have about old decisions.'),
        B('اشرح 3 design patterns بجملة ومثال من الحياة.', 'Explain 3 design patterns with a sentence and a real-life example.'),
        B('اكتب getter/setter لـ class وجملة تشرح ليه.', 'Write a getter/setter for a class and a sentence explaining why.')
      ],
      words: ['polymorphism', 'subclass / superclass', 'getter / setter', 'generic', 'design pattern', 'instantiate', 'declare'],
      read: [{ lib: 'Real Python', what: B('دوّر على «object-oriented programming» واقرا الجزء بتاع inheritance.', 'Search for "object-oriented programming" and read the part about inheritance.') }],
      challenge: B('خد كود فيه if/elif طويل واقترح refactor بـ strategy أو dictionary، واكتب التعليق كأنه ريفيو.', 'Take code with a long if/elif chain, propose a refactor with a strategy or a dictionary, and write it as a review comment.'),
      quiz: [
        { q: B('أكتر اقتراح مؤدب:', 'The most polite suggestion:'), o: ['Use a map.', 'Have you considered using a map here?', 'You must use a map.'], a: 1, why: B('سؤال بدل أمر.', 'A question instead of an order.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We could of cached it.', 'We could have cached it.', 'We could have cache it.'], a: 1, why: B('could have + التصريف التالت.', 'could have + past participle.') },
        { q: B('instantiate يعني:', 'instantiate means:'), o: [B('تعمل object من class', 'create an object from a class'), B('تمسح object', 'delete an object'), B('تعرّف متغيّر', 'declare a variable')], a: 0, why: B('instance = نسخة.', 'instance = a copy made from the class.') }
      ] },

    { title: B('الأداء وهياكل البيانات', 'Performance and data structures'),
      goal: B('تتكلم عن الأداء بـ Big O وهياكل البيانات، وتقترح هيكل أنسب في الريفيو.', 'Discuss performance with Big O and data structures, and suggest a better structure in a review.'),
      learn: [
        { h: B('اقرا Big O', 'Reading Big O'),
          p: B('O(1) = constant time، O(n) = linear، O(n²) = quadratic (بطيئة مع البيانات الكبيرة)، O(log n) = logarithmic. وبنقول: This loop is O(n²) because of the nested search.', 'O(1) = constant time, O(n) = linear, O(n²) = quadratic (slow with big data), O(log n) = logarithmic. We say: This loop is O(n²) because of the nested search.'),
          ex: 'Looking up a key in a dict is O(1) on average.\nSearching a list is O(n), so a set would be faster here.' },
        { h: B('اختار الهيكل', 'Choosing a structure'),
          p: B('stack = آخر داخل أول خارج (undo). queue = أول داخل أول خارج (jobs). set للبحث السريع. heap لأصغر/أكبر عنصر. linked list للإضافة في النص.', 'stack = last in, first out (undo). queue = first in, first out (jobs). set for fast lookups. heap for the smallest/largest item. linked list for inserting in the middle.'),
          ex: 'We process jobs in order, so a queue fits better than a list.' },
        { h: B('وصف الذاكرة', 'Talking about memory'),
          p: B('جمل بتوصف استهلاك الذاكرة في الريفيو: النسخ بيضاعف الذاكرة، والـ pointer بيشاور من غير نسخ، والـ heap لما يكبر من غير حد العملية بتقع. This copies the whole list, so memory use doubles.', 'This copies the whole list, so memory use doubles. / We keep a pointer to the node, not a copy. / The heap grows until the process is killed.'),
          ex: 'Reading the file line by line uses far less memory than read().' }
      ],
      practice: [
        B('حدد Big O لـ 5 دوال من كودك واكتب جملة لكل واحدة.', 'Work out the Big O of 5 functions in your code and write a sentence for each.'),
        B('اكتب 3 تعليقات ريفيو بتقترح هيكل بيانات أنسب.', 'Write 3 review comments suggesting a better data structure.'),
        B('اشرح stack وqueue بمثال من الحياة.', 'Explain stack and queue with real-life examples.'),
        B('اكتب 3 جمل بـ too / enough عن الأداء.', 'Write 3 sentences with too / enough about performance.')
      ],
      words: ['time complexity (Big O)', 'data structure', 'stack (LIFO)', 'queue (FIFO)', 'linked list', 'heap', 'pointer'],
      read: [{ lib: 'Composing Programs', what: B('اقرا جزء عن «orders of growth» (نمو الوقت) وردد الجمل.', 'Read a section on "orders of growth" and repeat the sentences.') }],
      challenge: B('اكتب «performance review» لدالة بطيئة عندك: Big O قبل وبعد، والسبب، والتغيير، في 6 جمل.', 'Write a performance review of a slow function: Big O before and after, the cause and the change, in 6 sentences.'),
      quiz: [
        { q: B('O(n²) غالبًا سببها:', 'O(n²) is usually caused by:'), o: [B('loop جوه loop', 'a loop inside a loop'), B('قاموس', 'a dictionary lookup'), B('return', 'a return')], a: 0, why: B('nested loops.', 'nested loops.') },
        { q: B('queue بتشتغل:', 'A queue works:'), o: ['first in, first out', 'last in, first out', 'random'], a: 0, why: B('FIFO.', 'FIFO.') },
        { q: B('للبحث السريع عن عنصر:', 'For fast membership checks:'), o: ['a list', 'a set', 'a string'], a: 1, why: B('set = O(1) في المتوسط.', 'A set is O(1) on average.') }
      ] },

    { title: B('الأخطاء في الريفيو', 'Bugs in review'),
      goal: B('تشرح أخطاء زي null pointer وdeadlock وoverflow، وتستخدم الشرط التالت للي كان ممكن يحصل.', 'Explain bugs such as null pointers, deadlocks and overflows, and use the third conditional for what could have happened.'),
      learn: [
        { h: B('أخطاء بتتلقط في الريفيو', 'Bugs a review catches'),
          p: B('null pointer (قيمة فاضية)، overflow (رقم أكبر من المسموح)، deadlock (اتنين مستنيين بعض)، race condition، memory leak، off-by-one (غلطة بواحد في العد).', 'null pointer (an empty value), overflow (a number too large), deadlock (two threads waiting for each other), race condition, memory leak, off-by-one (miscounting by one).'),
          ex: 'If `user` is None here, this line raises AttributeError.\nThis loop is off by one: it skips the last item.' },
        'g:الشرط التالت (ندم على الماضي)',
        { h: B('compile time وruntime', 'Compile time and runtime'),
          p: B('compile time = وقت الترجمة (أخطاء syntax وأنواع). runtime = وقت التشغيل (بيانات غلط، ملف مش موجود). Python لغة interpreted، فأغلب الأخطاء runtime.', 'compile time = when the code is compiled (syntax and type errors). runtime = when it runs (bad data, a missing file). Python is interpreted, so most errors appear at runtime.'),
          ex: 'TypeScript catches this at compile time.\nIn Python, you only see it at runtime.' }
      ],
      practice: [
        B('اكتب 5 تعليقات ريفيو بتنبّه لأخطاء محتملة (null، off-by-one، race…).', 'Write 5 review comments pointing out possible bugs (null, off-by-one, race…).'),
        B('اكتب 3 جمل بالشرط التالت عن bugs كان ممكن الريفيو يلقطها.', 'Write 3 third-conditional sentences about bugs a review could have caught.'),
        B('اشرح الفرق بين compile time وruntime بمثالين.', 'Explain compile time vs. runtime with two examples.'),
        B('اشرح deadlock لحد مش مبرمج بمثال من الحياة.', 'Explain a deadlock to a non-programmer with a real-life example.')
      ],
      words: ['null pointer', 'overflow', 'deadlock', 'garbage collection', 'compile time / runtime', 'compiler / interpreter', 'invoke / call'],
      read: [{ lib: 'MDN Web Docs', what: B('دوّر على «null» و«undefined» واقرا الفرق.', 'Search for "null" and "undefined" and read the difference.') }],
      challenge: B('خد bug قديم وصل للإنتاج واكتب: لو الريفيو كان عمل كذا، كنا لقطناه. وإيه اللي هتضيفه لـ checklist الريفيو.', 'Take an old bug that reached production and write: if the review had done X, we would have caught it — and what you will add to your review checklist.'),
      quiz: [
        { q: B('off-by-one هو:', 'An off-by-one error is:'), o: [B('غلطة بواحد في العد أو الحدود', 'miscounting a boundary by one'), B('خطأ في النت', 'a network error'), B('باسورد غلط', 'a wrong password')], a: 0, why: B('زي < بدل <=.', 'Like < instead of <=.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['If we had added a test, we would have caught it.', 'If we added a test, we would catch it yesterday.', 'If we had add a test, we would caught it.'], a: 0, why: B('had + participle، would have + participle.', 'had + participle, would have + participle.') },
        { q: B('deadlock يعني:', 'A deadlock means:'), o: [B('عمليتين كل واحدة مستنية التانية', 'two processes each waiting for the other'), B('باب مقفول', 'a locked door'), B('ملف ممسوح', 'a deleted file')], a: 0, why: B('محدش بيتحرك.', 'Nobody can move.') }
      ] },

    { title: B('الرد على الريفيو', 'Responding to review'),
      goal: B('ترد على التعليقات: توافق، تشرح قرارك، تطلب توضيح، وتقفل النقاش بأدب.', 'Reply to comments: agree, explain your decision, ask for clarification, and close the thread politely.'),
      learn: [
        { h: B('ردود جاهزة', 'Ready-made replies'),
          p: B('Good catch, fixed in abc123. / Done. / I kept it because… — happy to change it if you feel strongly. / Could you clarify what you mean by…? / Let\'s handle this in a follow-up PR.', 'Good catch, fixed in abc123. / Done. / I kept it because… — happy to change it if you feel strongly. / Could you clarify what you mean by…? / Let\'s handle this in a follow-up PR.'),
          ex: 'Good catch! I\'ve added a guard for empty lists (4f2a1c).\nI kept the loop for readability; the list is always under 50 items.' },
        { h: B('متتضايقش', 'Don\'t take it personally'),
          p: B('الريفيو عن الكود، مش عنك. اشكر، وافهم، واسأل. ولو مش موافق، قول السبب بأرقام أو مثال، مش بإحساس.', 'Review is about the code, not you. Thank, understand, ask. If you disagree, give the reason with numbers or an example, not feelings.'),
          ex: 'Thanks for the review! Could we go over the caching comment in a quick call?' },
        'g:further و farther'
      ],
      practice: [
        B('رد على 6 تعليقات ريفيو (من الأيام اللي فاتت) بردود مختلفة.', 'Reply to 6 review comments (from earlier this week) with different replies.'),
        B('اكتب رد مش موافق بأدب مع سبب بالأرقام.', 'Write a polite disagreeing reply with a reason in numbers.'),
        B('اكتب 3 طلبات توضيح لتعليقات غامضة.', 'Write 3 requests for clarification on vague comments.'),
        B('اكتب 3 جمل بـ further (مزيد من) و2 بـ farther (مسافة).', 'Write 3 sentences with further (more) and 2 with farther (distance).')
      ],
      words: ['access modifier (public / private)', 'destructor', 'primitive type', 'iteration / iterative', 'traverse', 'nested loop', 'range'],
      read: [{ lib: 'Google Engineering Practices: Code Review', what: B('اقرا «Handling pushback in code reviews».', 'Read "Handling pushback in code reviews".') }],
      challenge: B('اطلب من حد يراجع كود ليك بالإنجليزي (أو استخدم تعليقات من ريفيو قديم) ورد على كل تعليق.', 'Ask someone to review your code in English (or use comments from an old review) and reply to every comment.'),
      quiz: [
        { q: B('أحسن رد على تعليق صح:', 'The best reply to a correct comment:'), o: ['OK.', 'Good catch, fixed in 4f2a1c. Thanks!', 'Whatever.'], a: 1, why: B('شكر + فين اتصلح.', 'Thanks + where it was fixed.') },
        { q: B('لو مش موافق:', 'If you disagree:'), o: ['No.', 'I kept it because the list is always small; happy to change it if you feel strongly.', 'You don\'t understand.'], a: 1, why: B('سبب + مرونة.', 'A reason + openness.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['For farther details, see the docs.', 'For further details, see the docs.', 'For more farther details.'], a: 1, why: B('further = مزيد.', 'further = more.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 16 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 16 opens when you score 70% or more.'),
      review: [
        B('تعليق: ملاحظة + سبب + اقتراح، ودرجة الأهمية.', 'A comment: observation + reason + suggestion, and its importance.'),
        B('اتكلم عن الكود مش الشخص، واقترح بـ Could we / Have you considered.', 'Talk about the code, not the person, and suggest with Could we / Have you considered.'),
        B('Big O، وstack / queue / set / heap.', 'Big O, and stack / queue / set / heap.'),
        B('null، off-by-one، deadlock، والشرط التالت.', 'null, off-by-one, deadlock, and the third conditional.'),
        B('الرد: Good catch، I kept it because…، Could you clarify…?', 'Replies: Good catch, I kept it because…, Could you clarify…?')
      ],
      project: B('اعمل ريفيو كامل بالإنجليزي على PR حقيقي (بتاعك أو مفتوح المصدر): 8 تعليقات على الأقل مصنّفة (nit / suggestion / blocking) منهم واحد عن الأداء وواحد عن التصميم وواحد عن bug محتمل، وملخص في الآخر (Overall…). وبعدين رد على الريفيو بنفسك كأنك صاحب الكود.',
                 'Do a complete English review of a real PR (yours or open source): at least 8 comments labelled nit / suggestion / blocking — including one about performance, one about design and one about a possible bug — and a summary at the end (Overall…). Then reply to the review yourself as if you were the author.'),
      test: [
        { q: B('أحسن تعليق ريفيو:', 'The best review comment:'), o: ['Bad code.', 'This makes a DB call per item; could we batch them?', 'Rewrite everything.'], a: 1, why: B('محدد ومعاه اقتراح.', 'Specific, with a suggestion.') },
        { q: B('nit معناها:', 'nit means:'), o: [B('ملاحظة صغيرة اختيارية', 'a small, optional remark'), B('bug خطير', 'a serious bug'), B('رفض', 'a rejection')], a: 0, why: B('nitpick.', 'nitpick.') },
        { q: B('أنهي تعليق عن الكود مش الشخص؟', 'Which comment is about the code, not the person?'), o: ['You always forget tests.', 'This function has no test for the error case.', 'You are careless.'], a: 1, why: B('بيوصف الكود.', 'It describes the code.') },
        { q: B('overload يعني:', 'overload means:'), o: [B('نفس اسم الدالة بباراميترز مختلفة', 'the same function name with different parameters'), B('حمل زيادة على السيرفر', 'too much load on a server'), B('وراثة', 'inheritance')], a: 0, why: B('method overloading.', 'method overloading.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We should of used a set.', 'We should have used a set.', 'We should have use a set.'], a: 1, why: B('should have + participle.', 'should have + participle.') },
        { q: B('O(1) معناها:', 'O(1) means:'), o: ['constant time', 'linear time', 'very slow'], a: 0, why: B('مش بيتأثر بحجم البيانات.', 'It doesn\'t depend on the data size.') },
        { q: B('للـ undo في محرر نصوص، أنسب هيكل:', 'For undo in a text editor, the best structure is a:'), o: ['queue', 'stack', 'set'], a: 1, why: B('آخر حاجة اتعملت أول حاجة تترجع.', 'The last action is undone first.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['If we had reviewed it, we would have found the bug.', 'If we reviewed it, we would have find the bug.', 'If we had review it, we found the bug.'], a: 0, why: B('الشرط التالت.', 'Third conditional.') },
        { q: B('runtime error بيظهر:', 'A runtime error appears:'), o: [B('وقت التشغيل', 'while the program runs'), B('وقت الكتابة', 'while typing'), B('وقت الترجمة', 'at compile time')], a: 0, why: B('run = تشغيل.', 'run = execution.') },
        { q: B('أحسن رد لو مش فاهم التعليق:', 'The best reply if you don\'t understand a comment:'), o: ['What?', 'Could you clarify what you mean by "simplify"?', 'Ignore.'], a: 1, why: B('طلب توضيح محدد.', 'A specific request for clarification.') },
        { q: B('«Let\'s handle this in a follow-up PR» معناها:', '"Let\'s handle this in a follow-up PR" means:'), o: [B('نعملها في PR بعدين', 'do it in a later PR'), B('نلغيها', 'drop it'), B('نعملها دلوقتي', 'do it now')], a: 0, why: B('تأجيل منظم.', 'An organised postponement.') },
        { q: B('encapsulation يعني:', 'encapsulation means:'), o: [B('تخبي التفاصيل جوه الكلاس', 'hiding the details inside a class'), B('تشفير', 'encryption'), B('ضغط الملفات', 'compressing files')], a: 0, why: B('تعرض واجهة بسيطة بس.', 'Expose only a simple interface.') }
      ] }
  ]
};
