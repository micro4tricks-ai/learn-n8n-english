// Week 16 — Negotiating and agreeing with clients (end of month 4).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('التفاوض والاتفاق مع العميل', 'Negotiating and agreeing with clients'),
  goal: B('تتكلم مع عميل عن النطاق والسعر والمواعيد: تعرض، وتفاوض، وترفض بأدب، وتكتب الاتفاق وشروط الدفع بوضوح.',
          'Talk with a client about scope, price and deadlines: make an offer, negotiate, say no politely, and write the agreement and payment terms clearly.'),
  days: [
    { title: B('النطاق والعرض', 'Scope and the proposal'),
      goal: B('تكتب عرض (proposal) قصير: المشكلة، والحل، والمخرجات، والسعر، والمدة.', 'Write a short proposal: the problem, the solution, the deliverables, the price and the timeline.'),
      learn: [
        { h: B('هيكل العرض', 'Proposal structure'),
          p: B('Problem (بكلام العميل)، Solution، Deliverables (قايمة حاجات هيستلمها)، Out of scope (اللي مش ضمن الشغل)، Timeline، Price، Next steps.', 'Problem (in the client\'s words), Solution, Deliverables (a list of what they will receive), Out of scope, Timeline, Price, Next steps.'),
          ex: 'Deliverables:\n- An n8n workflow that syncs orders to Google Sheets\n- A one-page user guide\nOut of scope: changes to the website itself.\nPrice: USD 600, 50% upfront.' },
        { h: B('ليه Out of scope مهم', 'Why "Out of scope" matters'),
          p: B('بيحميك من scope creep. أي طلب جديد بعدين: That\'s outside the current scope, but I\'m happy to quote it separately.', 'It protects you from scope creep. For any new request later: That\'s outside the current scope, but I\'m happy to quote it separately.'),
          ex: 'Adding a mobile app is outside the current scope. I can send you a separate estimate.' },
        'g:الأرقام بالحروف ولا بالأرقام'
      ],
      practice: [
        B('اكتب proposal من صفحة لمشروع أتمتة صغير لعميل متخيّل.', 'Write a one-page proposal for a small automation project for an imagined client.'),
        B('اكتب قايمة deliverables من 4 بنود وقايمة out of scope من 3.', 'Write a 4-item deliverables list and a 3-item out-of-scope list.'),
        B('اكتب 4 ردود على طلبات بره النطاق.', 'Write 4 replies to out-of-scope requests.'),
        B('اكتب 5 أسعار ومبالغ بالشكل الصح: USD 1,200، EUR 50، 15%.', 'Write 5 prices and amounts correctly: USD 1,200, EUR 50, 15%.')
      ],
      words: ['client / customer', 'contract', 'invoice', 'budget', 'deliverable', 'proposal', 'expense'],
      read: [{ lib: 'freeCodeCamp News', what: B('دوّر على مقال عن «freelance proposal» أو «pricing freelance» واقراه.', 'Search for an article about "freelance proposals" or "pricing freelance work" and read it.') }],
      challenge: B('ابعت proposal حقيقي لعميل أو لمشروع على منصة freelance (أو احفظه جاهز)، واطلب رأي حد عنده خبرة.', 'Send a real proposal to a client or a freelance-platform project (or keep it ready), and ask someone experienced for feedback.'),
      quiz: [
        { q: B('deliverable هو:', 'A deliverable is:'), o: [B('حاجة هيستلمها العميل', 'something the client will receive'), B('ميعاد التسليم', 'the delivery date'), B('شركة الشحن', 'a courier company')], a: 0, why: B('مخرج ملموس.', 'A tangible output.') },
        { q: B('رد على طلب بره النطاق:', 'A reply to an out-of-scope request:'), o: ['No.', 'That\'s outside the current scope, but I can quote it separately.', 'OK, free.'], a: 1, why: B('رفض مؤدب + فرصة.', 'A polite no + an opportunity.') },
        { q: B('أنهي كتابة صح لسعر؟', 'Which is written correctly?'), o: ['1200$USD', 'USD 1,200', '1.200 dollars$'], a: 1, why: B('العملة + الرقم بفاصلة الآلاف.', 'Currency + the number with a thousands comma.') }
      ] },

    { title: B('الفلوس والدفع', 'Money and payment'),
      goal: B('تتكلم عن السعر والخصم والرسوم والاشتراك والاسترداد.', 'Talk about price, discounts, fees, subscriptions and refunds.'),
      learn: [
        { h: B('كلام الأسعار', 'Price language'),
          p: B('The price is… / It costs… / There\'s a 10% discount for annual plans. / The platform fee is 5%. / The subscription renews monthly. / We offer a full refund within 14 days.', 'The price is… / It costs… / There\'s a 10% discount for annual plans. / The platform fee is 5%. / The subscription renews monthly. / We offer a full refund within 14 days.'),
          ex: 'The total is USD 540, including a 10% discount.\nPayment is due within 14 days of the invoice date.' },
        { h: B('price وcost وfee', 'price, cost and fee'),
          p: B('price = السعر اللي بتطلبه، cost = اللي بتدفعه أو التكلفة عليك، fee = رسوم خدمة. وcheap ممكن تبان «رخيص وحش»: قول affordable.', 'price = what you ask for, cost = what it costs you, fee = a service charge. cheap can sound "low quality": say affordable.'),
          ex: 'Our price is affordable, but the hosting costs are extra.' },
        'g:ترتيب الصفات'
      ],
      practice: [
        B('اكتب جدول أسعار لخدمة (3 باقات) بجملة لكل باقة.', 'Write a price table for a service (3 packages) with a sentence for each.'),
        B('اكتب شروط دفع (payment terms) في 4 جمل.', 'Write payment terms in 4 sentences.'),
        B('اكتب إيميل رد على عميل عايز refund.', 'Write an email replying to a client who wants a refund.'),
        B('رتّب الصفات: `a (new, small, Python) script`، `a (red, big, old) button`.', 'Order the adjectives: `a (new, small, Python) script`, `a (red, big, old) button`.')
      ],
      words: ['price / cost', 'discount', 'fee', 'subscription', 'pay (by card)', 'refund', 'receipt'],
      read: [{ lib: 'Breaking News English', what: B('اختار خبر عن الاقتصاد أو الأسعار في مستوى 3 أو 4 واقراه.', 'Pick an economy or prices story at level 3 or 4 and read it.') }],
      challenge: B('اكتب صفحة Pricing لخدمة أتمتة بتقدمها: 3 باقات، وخصم سنوي، وسياسة refund.', 'Write a Pricing page for an automation service you offer: 3 packages, an annual discount and a refund policy.'),
      quiz: [
        { q: B('refund معناها:', 'refund means:'), o: [B('رجوع الفلوس', 'money given back'), B('خصم', 'a discount'), B('فاتورة', 'an invoice')], a: 0, why: B('استرداد.', 'Getting your money back.') },
        { q: B('كلمة أحسن من cheap في عرض:', 'A better word than cheap in an offer:'), o: ['affordable', 'poor', 'low'], a: 0, why: B('affordable = في المتناول، من غير إيحاء سلبي.', 'affordable = within reach, without a negative feel.') },
        { q: B('اختار الترتيب الصح:', 'Choose the correct order:'), o: ['a Python small new script', 'a small new Python script', 'a new Python small script'], a: 1, why: B('حجم ← عمر ← أصل/نوع.', 'size → age → origin/type.') }
      ] },

    { title: B('التفاوض', 'Negotiating'),
      goal: B('تفاوض على السعر والمدة: تقترح، وتتنازل مقابل حاجة، وتتكلم عن الأرقام الشهرية والسنوية.', 'Negotiate price and time: propose, concede in exchange for something, and talk about monthly and annual figures.'),
      learn: [
        { h: B('جمل التفاوض', 'Negotiation phrases'),
          p: B('Would you be open to…? / If you can…, we can… / That\'s a bit above our budget. / What if we reduce the scope to…? / Let\'s meet in the middle. / That works for us.', 'Would you be open to…? / If you can…, we can… / That\'s a bit above our budget. / What if we reduce the scope to…? / Let\'s meet in the middle. / That works for us.'),
          ex: 'If you can pay 50% upfront, we can start next Monday.\nWhat if we drop the dashboard and keep the price at USD 500?' },
        { h: B('متتنازلش ببلاش', 'Don\'t give things away'),
          p: B('أي تنازل مقابل حاجة: خصم مقابل عقد أطول، أو تسليم أسرع مقابل سعر أعلى. استخدم «if… then…».', 'Every concession for something in return: a discount for a longer contract, or faster delivery for a higher price. Use "if… then…".'),
          ex: 'We can offer 10% off if you sign for 12 months.' },
        'g:الأمريكي والبريطاني'
      ],
      practice: [
        B('اكتب حوار تفاوض (10 سطور) بين فريلانسر وعميل على السعر.', 'Write a 10-line negotiation dialogue between a freelancer and a client about price.'),
        B('اكتب 5 جمل «If you…, we can…».', 'Write 5 "If you…, we can…" sentences.'),
        B('احسب واكتب تكلفة شهرية وسنوية لاشتراك بخصم، في 4 جمل.', 'Calculate and write the monthly and annual cost of a subscription with a discount, in 4 sentences.'),
        B('اكتب 5 كلمات بالأمريكي والبريطاني (color / colour…).', 'Write 5 words in American and British spelling (color / colour…).')
      ],
      words: ['supplier / vendor', 'revenue', 'profit / loss', 'quarter (Q1, Q2…)', 'annual / monthly / weekly', 'cheap / expensive', 'transfer (money)'],
      read: [{ lib: 'All Ears English', what: B('دوّر على حلقة عن «negotiation» واسمعها.', 'Find an episode about "negotiation" and listen to it.') }],
      challenge: B('مثّل تفاوض مع صاحب (5 دقايق) بالإنجليزي على مشروع متخيّل، وسجّله، واكتب 3 جمل كان ممكن تقولها أحسن.', 'Role-play a 5-minute English negotiation with a friend about an imagined project, record it, and write 3 sentences you could have said better.'),
      quiz: [
        { q: B('تنازل مقابل حاجة:', 'A concession in exchange for something:'), o: ['OK, 30% off.', 'We can offer 10% off if you sign for a year.', 'Fine, it\'s free.'], a: 1, why: B('if = مقابل.', 'if = in return.') },
        { q: B('«That\'s a bit above our budget» معناها:', '"That\'s a bit above our budget" means:'), o: [B('السعر أعلى من ميزانيتنا شوية', 'the price is a little over our budget'), B('موافقين', 'we agree'), B('معندناش فلوس خالص', 'we have no money')], a: 0, why: B('طريقة مهذبة للتفاوض.', 'A polite way to negotiate.') },
        { q: B('Q3 معناها:', 'Q3 means:'), o: [B('الربع التالت من السنة', 'the third quarter of the year'), B('سؤال 3', 'question 3'), B('3 أسابيع', '3 weeks')], a: 0, why: B('يوليو–سبتمبر غالبًا.', 'Usually July–September.') }
      ] },

    { title: B('المواعيد والرفض بأدب', 'Deadlines and saying no'),
      goal: B('تتكلم عن المواعيد والتسليم، وتقول لأ أو «مش في الموعد ده» من غير ما تخسر العميل.', 'Talk about deadlines and delivery, and say no or "not by then" without losing the client.'),
      learn: [
        { h: B('الموعد الواقعي', 'A realistic deadline'),
          p: B('We can deliver by… / To meet this deadline, we\'d need to… / Realistically, it will take about two weeks. / I\'d rather promise less and deliver on time.', 'We can deliver by… / To meet this deadline, we\'d need to… / Realistically, it will take about two weeks. / I\'d rather promise less and deliver on time.'),
          ex: 'To meet the 1 October deadline, we\'d need the API access by this Friday.' },
        { h: B('«لأ» بأدب', 'Saying no politely'),
          p: B('Unfortunately, we can\'t… / I\'m afraid that won\'t be possible by Monday, but we could… / I\'d love to help, but my schedule is full until…', 'Unfortunately, we can\'t… / I\'m afraid that won\'t be possible by Monday, but we could… / I\'d love to help, but my schedule is full until…'),
          ex: 'I\'m afraid we can\'t add both features by Friday. We could deliver the export first and the dashboard next week.' },
        'g:who و whom'
      ],
      practice: [
        B('اكتب 4 ردود بتقول فيها موعد واقعي بدل الموعد اللي العميل عايزه.', 'Write 4 replies giving a realistic date instead of the one the client wants.'),
        B('اكتب 3 طرق تقول لأ بأدب ومعاها بديل.', 'Write 3 polite ways to say no, each with an alternative.'),
        B('اكتب 7 جمل بالأفعال بتاعة النهارده عن مشروع.', 'Write 7 sentences with today\'s verbs about a project.'),
        B('اختار who ولا whom في 4 جمل رسمية.', 'Choose who or whom in 4 formal sentences.')
      ],
      words: ['meet a deadline', 'delegate', 'leverage', 'facilitate', 'utilize', 'depict', 'manipulate (data)'],
      read: [{ lib: 'Plain Language Guidelines', what: B('اقرا صفحة عن «Use simple words and phrases» ولاحظ ليه utilize وleverage تقيلة.', 'Read a page about "Use simple words and phrases" and notice why utilize and leverage sound heavy.') }],
      challenge: B('اكتب إيميل لعميل بيطلب تسليم بدري: ترفض بأدب، وتشرح السبب في جملة، وتقترح خطة من مرحلتين.', 'Write an email to a client asking for early delivery: say no politely, give the reason in one sentence, and propose a two-phase plan.'),
      quiz: [
        { q: B('أحسن رد على موعد مستحيل:', 'The best reply to an impossible deadline:'), o: ['Sure!', 'Realistically, it will take two weeks. We could deliver part one by Friday.', 'Impossible.'], a: 1, why: B('صادق ومعاه بديل.', 'Honest, with an alternative.') },
        { q: B('meet a deadline معناها:', 'meet a deadline means:'), o: [B('تسلّم في الموعد', 'deliver on time'), B('تقابل حد', 'meet someone'), B('تلغي الموعد', 'cancel the deadline')], a: 0, why: B('تلحق الميعاد.', 'Finish by the date.') },
        { q: B('بدل utilize في كتابة بسيطة:', 'Instead of utilize in plain writing:'), o: ['use', 'employment', 'utility'], a: 0, why: B('use أبسط وأوضح.', 'use is simpler and clearer.') }
      ] },

    { title: B('الاتفاق وشروط الدفع', 'The agreement and payment terms'),
      goal: B('تقفل الاتفاق كتابةً: اللي اتفقنا عليه، والدفع، والخطوة الجاية، وتتكلم عن الفلوس اليومية.', 'Close the deal in writing — what we agreed, the payment and the next step — and talk about everyday money.'),
      learn: [
        { h: B('إيميل تأكيد الاتفاق', 'The agreement confirmation email'),
          p: B('Just to confirm what we agreed: Scope… Price… Payment: 50% upfront, 50% on delivery, by bank transfer. Timeline… Please reply to confirm, and I\'ll send the first invoice.', 'Just to confirm what we agreed: Scope… Price… Payment: 50% upfront, 50% on delivery, by bank transfer. Timeline… Please reply to confirm, and I\'ll send the first invoice.'),
          ex: 'Payment terms: 50% upfront, 50% within 7 days of delivery.\nAccepted methods: bank transfer or card.' },
        { h: B('فلوس كل يوم', 'Everyday money'),
          p: B('Can I pay by card? / Keep the change. / Could I have the receipt? / The bill, please. / I\'m trying to save money this month.', 'Can I pay by card? / Keep the change. / Could I have the receipt? / The bill, please. / I\'m trying to save money this month.'),
          ex: 'Is service included, or should I leave a tip?' },
        'g:كتابة التاريخ والوقت'
      ],
      practice: [
        B('اكتب إيميل تأكيد اتفاق كامل لمشروع متخيّل.', 'Write a complete agreement confirmation email for an imagined project.'),
        B('اكتب شروط دفع بـ 3 طرق مختلفة (milestones، شهري، مرة واحدة).', 'Write payment terms three different ways (milestones, monthly, one-off).'),
        B('اكتب حوار دفع في كافيه أو محل (6 سطور).', 'Write a 6-line dialogue about paying in a café or a shop.'),
        B('اكتب 5 جمل عن ميزانيتك الشخصية (save / spend / account).', 'Write 5 sentences about your personal budget (save / spend / account).')
      ],
      words: ['account (bank)', 'bill / check', 'cash / card', 'change (money)', 'wallet / purse', 'save / spend', 'tip'],
      read: [{ lib: 'News in Levels', what: B('اقرا خبر level 2 عن الفلوس أو الشغل واسمعه.', 'Read and listen to a level-2 story about money or work.') }],
      challenge: B('اعمل «freelance kit» بالإنجليزي: قالب proposal، وقالب تأكيد اتفاق، وقالب invoice، وقالب تذكير بالدفع.', 'Build an English "freelance kit": a proposal template, an agreement confirmation, an invoice template and a payment reminder.'),
      quiz: [
        { q: B('«50% upfront» معناها:', '"50% upfront" means:'), o: [B('نص المبلغ قبل البداية', 'half the amount before starting'), B('نص المبلغ في الآخر', 'half at the end'), B('خصم 50%', 'a 50% discount')], a: 0, why: B('upfront = مقدّمًا.', 'upfront = in advance.') },
        { q: B('«Keep the change» معناها:', '"Keep the change" means:'), o: [B('خلّي الباقي', 'keep the rest of the money'), B('متغيّرش حاجة', 'don\'t change anything'), B('رجّع الفلوس', 'give the money back')], a: 0, why: B('change = الفكة / الباقي.', 'change = the money you get back.') },
        { q: B('أول جملة في إيميل تأكيد:', 'The first line of a confirmation email:'), o: ['Just to confirm what we agreed:', 'Hey you,', 'Why so expensive?'], a: 0, why: B('بتلخص الاتفاق.', 'It sums up the agreement.') }
      ] },

    { title: B('مراجعة الشهر الرابع والاختبار', 'Month 4 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 17 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 17 opens when you score 70% or more.'),
      review: [
        B('الشات: اختصارات، ونبرة، وطلب مساعدة كامل.', 'Chat: abbreviations, tone, and a complete help request.'),
        B('الاجتماعات: agenda، stand-up، مكالمات الفيديو، action items، reported speech.', 'Meetings: agenda, stand-up, video calls, action items, reported speech.'),
        B('الريفيو: ملاحظة + سبب + اقتراح، وBig O، والرد بثقة.', 'Review: observation + reason + suggestion, Big O, and confident replies.'),
        B('العميل: proposal، وout of scope، وتفاوض بـ if، ورفض بأدب.', 'Clients: proposals, out of scope, negotiating with if, and saying no politely.'),
        B('الفلوس: price / cost / fee، والدفع، وتأكيد الاتفاق.', 'Money: price / cost / fee, payment, and confirming the agreement.')
      ],
      project: B('مشروع الشهر: «من أول رسالة لحد الاتفاق»: اكتب كل المراسلات مع عميل متخيّل لمشروع أتمتة: رد على أول رسالة، وأسئلة توضيح، وproposal كامل، ورد على طلب خصم بتفاوض، ورفض بأدب لطلب بره النطاق، وإيميل تأكيد اتفاق فيه شروط الدفع، وأول invoice. وبعدين مثّل مكالمة التفاوض بصوتك.',
                 'Month project: "from the first message to the deal": write all the correspondence with an imagined client for an automation project — a reply to the first message, clarifying questions, a full proposal, a negotiating reply to a discount request, a polite no to an out-of-scope request, an agreement confirmation with payment terms, and the first invoice. Then act out the negotiation call in your own voice.'),
      test: [
        { q: B('FYI معناها:', 'FYI means:'), o: ['for your information', 'fix your issue', 'from yesterday'], a: 0, why: B('للعلم.', 'for your information.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Please log in to your account.', 'Please login to your account.', 'Please log-in to your account.'], a: 0, why: B('فعل = log in.', 'Verb = log in.') },
        { q: B('في الـ stand-up بتقول:', 'In the stand-up you say:'), o: [B('امبارح، والنهارده، والعوائق', 'yesterday, today and blockers'), B('حياتك الشخصية', 'your personal life'), B('كل الكود', 'all the code')], a: 0, why: B('التلات أسئلة.', 'The three questions.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['She told me the demo went well.', 'She said me the demo went well.', 'She told that me the demo went well.'], a: 0, why: B('tell + شخص.', 'tell + person.') },
        { q: B('أحسن تعليق ريفيو:', 'The best review comment:'), o: ['This is terrible.', 'Could we move this query outside the loop? It runs 100 times now.', 'Fix it.'], a: 1, why: B('اقتراح + سبب.', 'A suggestion + a reason.') },
        { q: B('O(n) معناها:', 'O(n) means:'), o: ['linear time', 'constant time', 'no time'], a: 0, why: B('الوقت بيزيد مع حجم البيانات.', 'Time grows with the data size.') },
        { q: B('Out of scope معناها:', 'Out of scope means:'), o: [B('مش ضمن الشغل المتفق عليه', 'not part of the agreed work'), B('مش شغال', 'not working'), B('بره المكتب', 'out of the office')], a: 0, why: B('بره النطاق.', 'Outside the agreed scope.') },
        { q: B('تنازل ذكي في التفاوض:', 'A smart concession:'), o: ['OK, half price.', 'If you sign for 12 months, we can offer 10% off.', 'Fine, free.'], a: 1, why: B('مقابل حاجة.', 'In exchange for something.') },
        { q: B('أحسن رفض لموعد:', 'The best way to decline a deadline:'), o: ['No way.', 'I\'m afraid Friday isn\'t realistic, but we could deliver the first part then.', 'Maybe.'], a: 1, why: B('صادق وبديل.', 'Honest, with an alternative.') },
        { q: B('fee معناها:', 'fee means:'), o: [B('رسوم خدمة', 'a service charge'), B('مجاني', 'free'), B('خصم', 'a discount')], a: 0, why: B('platform fee، bank fee.', 'platform fee, bank fee.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The price is USD 500, including a 10% discount.', 'The price is 500$USD include discount.', 'Price 500 including.'], a: 0, why: B('جملة كاملة ومبلغ مكتوب صح.', 'A full sentence and a correctly written amount.') },
        { q: B('«Just to confirm what we agreed» بتستخدمها في:', '"Just to confirm what we agreed" is used in:'), o: [B('إيميل تأكيد اتفاق', 'an agreement confirmation email'), B('شكوى', 'a complaint'), B('اعتذار', 'an apology')], a: 0, why: B('بتلخص الاتفاق كتابة.', 'It records the agreement in writing.') }
      ] }
  ]
};
