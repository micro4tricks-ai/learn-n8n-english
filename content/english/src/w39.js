// English week 39 — Pricing, invoices and negotiation.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1',
  title: B('التسعير والفواتير والتفاوض', 'Pricing, invoices and negotiation'),
  goal: B('تتكلم عن الفلوس بالإنجليزي من غير كسوف: تبعت عرض سعر واضح، تبرر سعرك بالقيمة، تتفاوض بمرونة من غير ما تخسر، تكتب فواتير دولية صح، وتتابع الفواتير المتأخرة وتزوّد أسعارك بأدب وحزم.',
          'Talk about money in English without embarrassment: send a clear quote, justify your price with value, negotiate flexibly without losing out, write correct international invoices, and chase late invoices and raise your rates politely but firmly.'),
  days: [
    { title: B('عرض السعر', 'The quote'),
      goal: B('عرض سعر واضح ميسيبش مجال للتخمين.', 'A clear quote leaving no room for guessing.'),
      learn: [
        L(B('أنواع التسعير', 'Pricing models'),
          B('**quote** = سعر نهائي محدد (ملزم غالبًا)، غير estimate (تقريبي). نماذج: **fixed fee** (سعر ثابت للنطاق)، **day rate** (سعر لليوم — شائع في أوروبا)، أو **value-based pricing** (حسب قيمة النتيجة للعميل). و**rate card** = قايمة أسعارك المعتمدة لخدمات مختلفة.', 'A **quote** = a specific final price (usually binding), unlike an estimate (approximate). Models: a **fixed fee** (one price for the scope), a **day rate** (a price per day — common in Europe), or **value-based pricing** (based on the result’s value to the client). And a **rate card** = your published price list for different services.'),
          'Quote #Q-2026-031 — valid for 30 days\nOrder automation (Schedule 1)        fixed fee   USD 1,800\nAdditional integrations               day rate    USD 350 / day\nMaintenance (Business plan)           monthly     USD 220 / month\nPrices exclude VAT where applicable.'),
        L(B('صياغة العرض', 'Wording the quote'),
          B('إيميل العرض: شكر، تذكير بالمشكلة بكلامهم، النطاق باختصار، السعر والمدة، اللي مش مشمول، الصلاحية («This quote is valid for 30 days»)، والخطوة الجاية. متعتذرش عن السعر («Sorry, it’s a bit expensive») — قوله بثقة.', 'The quote email: thanks, a reminder of the problem in their words, the scope in brief, the price and timeline, what is excluded, the validity («This quote is valid for 30 days»), and the next step. Do not apologise for the price («Sorry, it’s a bit expensive») — state it with confidence.'),
          'Hi Daniel,\n\nThank you for walking me through your order process. As discussed, the goal is to get invoices out within minutes of payment and remove the manual re-typing.\n\nFor the scope in the attached Schedule 1, the fixed fee is USD 1,800, delivered in two weeks. This doesn’t include data migration of past orders.\n\nThe quote is valid for 30 days. If you’re happy to go ahead, I can start on Monday 12 October.\n\nBest regards,\nLaila'),
        L(B('عملات وضرائب', 'Currencies and tax'),
          B('مع عملاء برة: حدد الـ **currency** (USD، EUR، SAR)، ومين بيتحمل فرق الـ **exchange rate** ورسوم التحويل («Fees are payable in full; any bank charges are the Client’s responsibility»)، وهل السعر شامل الضريبة ولا لأ. وطريقة الدفع (**bank transfer**، Wise، Payoneer).', 'With clients abroad: state the **currency** (USD, EUR, SAR), who bears **exchange rate** differences and transfer fees («Fees are payable in full; any bank charges are the Client’s responsibility»), and whether the price includes tax. And the payment method (**bank transfer**, Wise, Payoneer).'),
          '"All prices are in US dollars (USD). Payment by bank transfer or Wise. Any bank or transfer charges are paid by the Client, so that the full invoiced amount is received."')
      ],
      practice: [
        B('اعمل rate card لـ 4 خدمات.', 'Make a rate card for 4 services.'),
        B('اكتب إيميل عرض سعر كامل.', 'Write a complete quote email.'),
        B('شيل أي اعتذار عن السعر من رسايلك.', 'Remove any price apologies from your messages.'),
        B('اكتب جملة العملة ورسوم التحويل.', 'Write the currency and transfer-fees sentence.')
      ],
      words: [
        W('quote', 'عرض سعر محدد', 'a specific price offer', 'The quote is valid for 30 days.'),
        W('rate card', 'قايمة أسعارك', 'your list of prices', 'Our rate card is on the website.'),
        W('day rate', 'سعر اليوم', 'a price per working day', 'My day rate is 350 dollars.'),
        W('fixed fee', 'سعر ثابت للنطاق', 'one set price for the scope', 'We charge a fixed fee for the setup.'),
        W('value-based pricing', 'تسعير حسب القيمة', 'pricing by the value delivered', 'Value-based pricing reflects the savings.'),
        W('currency', 'العملة', 'the money system used', 'Which currency should I invoice in?'),
        W('exchange rate', 'سعر الصرف', 'the rate between two currencies', 'The exchange rate changed last week.'),
        W('bank transfer', 'تحويل بنكي', 'sending money between bank accounts', 'Payment is by bank transfer.')
      ],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «talking about money».', 'Search for «talking about money».') }],
      challenge: B('ابعت (أو جهّز) عرض سعر حقيقي بالإنجليزي: إيميل + جدول سعر + الصلاحية + العملة والرسوم + المستبعد — من غير ولا اعتذار، وراجعه بـ LanguageTool.', 'Send (or prepare) a real quote in English: an email + a price table + validity + currency and fees + exclusions — with no apology, checked with LanguageTool.'),
      quiz: [
        Q(B('quote مقابل estimate:', 'A quote vs an estimate:'), ['a quote is a specific price', 'they are identical', 'an estimate is binding'], 0, B('ملزم.', 'Binding.')),
        Q(B('أحسن جملة سعر:', 'The best price sentence:'), ['The fixed fee is USD 1,800.', 'Sorry, it’s quite expensive…', 'Maybe around something?'], 0, B('ثقة.', 'Confidence.')),
        Q(B('رسوم التحويل:', 'Transfer fees:'), ['state who pays them', 'ignore them', 'always pay them yourself'], 0, B('وضوح.', 'Clarity.'))
      ] },

    { title: B('تبرير السعر', 'Justifying the price'),
      goal: B('العميل يشوف السعر مقابل القيمة.', 'The client sees the price against the value.'),
      learn: [
        L(B('صياغة القيمة', 'Value framing'),
          B('**value framing** = تقدّم السعر جنب القيمة: «For roughly the cost of one month of a part-time assistant, you’ll save about 50 hours every month». و**justify** بالأرقام اللي العميل قالها، مش بساعاتك («It took me 30 hours»).', '**value framing** = presenting the price beside the value: «For roughly the cost of one month of a part-time assistant, you’ll save about 50 hours every month». And **justify** with the numbers the client gave, not your hours («It took me 30 hours»).'),
          '✗ "It’s USD 1,800 because it’s a lot of work."\n✓ "You mentioned around 55 hours a month on manual invoicing. At your team’s cost, that’s roughly USD 900 a month — so the setup pays for itself in about two months."'),
        L(B('حساسية السعر', 'Price sensitivity'),
          B('لما العميل يقول «That’s more than we expected» — ده **price sensitivity** أو **budget constraint** حقيقي. اسأل قبل ما تنزل: «Can I ask what you had in mind?» و«Is it the total, or the timing of payments?». أحيانًا المشكلة التوقيت مش المبلغ.', 'When a client says «That’s more than we expected» — it is **price sensitivity** or a real **budget constraint**. Ask before lowering: «Can I ask what you had in mind?» and «Is it the total, or the timing of payments?». Sometimes the issue is timing, not the amount.'),
          'Client: "That’s more than we budgeted."\nYou: "I appreciate you telling me. Can I ask what range you had in mind?"\nYou: "Is the concern the total amount, or paying it all this quarter?"\nYou: "If it helps, we could split it across two phases."'),
        L(B('الباقات', 'Bundles'),
          B('**bundle** = خدمات مجمّعة بسعر واحد (إعداد + 3 شهور صيانة). بيبسّط القرار وبيرفع القيمة. وقدّم اختيارات بدل سعر واحد: «We have three options…». العميل اللي بيختار بين اختيارات أقل احتمال يقول «no».', 'A **bundle** = services grouped at one price (setup + 3 months of maintenance). It simplifies the decision and raises the value. And offer options instead of one price: «We have three options…». A client choosing between options is less likely to say «no».'),
          '"We have three options:\n• Starter — invoices only, USD 900\n• Pro — invoices, WhatsApp updates and stock, USD 1,800 (most clients choose this)\n• Complete — Pro plus AI replies and 3 months of support, USD 3,200 as a bundle"')
      ],
      practice: [
        B('اكتب 3 جمل value framing بأرقام عميل.', 'Write 3 value-framing sentences with a client’s numbers.'),
        B('اكتب ردود على «more than we expected».', 'Write replies to «more than we expected».'),
        B('صمّم bundle بسعر واحد.', 'Design a bundle with one price.'),
        B('اكتب «three options» لخدمتك.', 'Write «three options» for your service.')
      ],
      words: [
        W('value framing', 'تقديم السعر جنب القيمة', 'presenting the price beside the value', 'Value framing made the price feel fair.'),
        W('justify', 'يبرر', 'to give good reasons for', 'Justify the price with their numbers.'),
        W('price sensitivity', 'حساسية العميل للسعر', 'how much price affects a buyer', 'Small shops have high price sensitivity.'),
        W('budget constraint', 'حد الميزانية', 'a limit on available money', 'Their budget constraint is this quarter only.'),
        W('bundle', 'باقة مجمّعة', 'a group of services at one price', 'The bundle includes three months of support.')
      ],
      read: [{ lib: 'Ozdic collocations', what: B('دوّر على collocations لـ price وbudget.', 'Look up collocations for price and budget.') }],
      challenge: B('اعمل تمثيل: العميل بيقول «That’s too expensive». ارد بسؤال، value framing بأرقامه، 3 اختيارات، واقتراح مرحلتين — بالإنجليزي ومن غير ما تنزل السعر لنفس النطاق.', 'Role-play: the client says «That’s too expensive». Reply with a question, value framing with their numbers, three options and a two-phase proposal — in English, without lowering the price for the same scope.'),
      quiz: [
        Q(B('تبرير قوي:', 'A strong justification:'), ['It pays for itself in about two months.', 'It took me ages.', 'Everyone charges this.'], 0, B('قيمة.', 'Value.')),
        Q(B('بعد «more than we budgeted»:', 'After «more than we budgeted»:'), ['Can I ask what range you had in mind?', 'OK, half price.', 'Then goodbye.'], 0, B('اسأل.', 'Ask.')),
        Q(B('bundle:', 'A bundle:'), ['services grouped at one price', 'a discount code', 'a late fee'], 0, B('باقة.', 'Package.'))
      ] },

    { title: B('التفاوض على الشروط', 'Negotiating terms'),
      goal: B('تتفاوض بمرونة من غير ما تخسر قيمتك.', 'Negotiate flexibly without losing your value.'),
      learn: [
        L(B('العرض المضاد', 'The counter-offer'),
          B('لما العميل يطلب سعر أقل، اعمل **counter-offer** بتبادل: «If we… then we could…». متنزلش من غير ما تاخد حاجة: نطاق أقل، دفع أسرع، مقدم أكبر، أو شهادة. «I could do USD 1,500 if we start with invoices only and add WhatsApp next month.»', 'When a client asks for a lower price, make a **counter-offer** with an exchange: «If we… then we could…». Never lower without getting something: a smaller scope, faster payment, a bigger deposit, or a testimonial. «I could do USD 1,500 if we start with invoices only and add WhatsApp next month.»'),
          '"If you’re able to pay 50% upfront, I can offer a 5% reduction."\n"I could bring it down to USD 1,500 if we start with invoices only."\n"I can keep the price and include one extra month of support."'),
        L(B('في النص', 'Meeting halfway'),
          B('**meet halfway** = حل وسط («Shall we meet halfway at net 45?»). و**scope reduction** = بدل ما تقلل السعر، قلل النطاق — أحسن لمكانتك. وحدد اللي **non-negotiable** بهدوء: «The deposit is non-negotiable for new clients, but I’m flexible on the schedule.»', 'To **meet halfway** = a compromise («Shall we meet halfway at net 45?»). A **scope reduction** = instead of lowering the price, reduce the scope — better for your positioning. And state what is **non-negotiable** calmly: «The deposit is non-negotiable for new clients, but I’m flexible on the schedule.»'),
          '"I understand. Rather than reducing the price, could we reduce the scope? We could leave the stock alerts for phase two."\n"Shall we meet halfway: net 45 instead of 30 or 60?"\n"The deposit is non-negotiable for a first project, but I’m happy to adjust the milestones."'),
        L(B('تعرف تمشي', 'Knowing when to walk away'),
          B('مش كل صفقة تستاهل: لو السعر هيخليك تخسر، أو الشروط خطر (مسؤولية مفتوحة، net 120)، **walk away** بأدب وسيب الباب مفتوح. الرفض المهذب بيحفظ سمعتك وأحيانًا بيرجّع العميل بعرض أحسن.', 'Not every deal is worth it: if the price makes you lose money, or the terms are risky (unlimited liability, net 120), **walk away** politely and leave the door open. A polite refusal protects your reputation and sometimes brings the client back with a better offer.'),
          '"Thank you for being open about your budget. Unfortunately, at that price I couldn’t deliver the quality you’d expect, so I’d rather not take it on. If your plans change, I’d be very happy to talk again."')
      ],
      practice: [
        B('اكتب 4 counter-offers بصيغة If…then.', 'Write 4 counter-offers in the If…then form.'),
        B('اكتب جملة meet halfway وجملة scope reduction.', 'Write a meet-halfway and a scope-reduction sentence.'),
        B('حدد 2 non-negotiables بتوعك واكتبهم بأدب.', 'Define 2 of your non-negotiables and write them politely.'),
        B('اكتب رفض مهذب لصفقة خسرانة.', 'Write a polite refusal for a losing deal.')
      ],
      words: [
        W('counter-offer', 'عرض مضاد', 'an offer made in reply to another', 'My counter-offer included a bigger deposit.'),
        W('meet halfway', 'حل وسط', 'to compromise equally', 'Let’s meet halfway on the timeline.'),
        W('scope reduction', 'تقليل النطاق', 'making the scope smaller', 'A scope reduction kept our price intact.'),
        W('non-negotiable', 'مش قابل للتفاوض', 'not open to discussion', 'The deposit is non-negotiable.'),
        W('walk away', 'تنسحب من الصفقة', 'to decline a deal', 'Sometimes it’s better to walk away.')
      ],
      read: [{ lib: 'Speak English with Vanessa', what: B('دوّر على «negotiation English».', 'Search for «negotiation English».') }],
      challenge: B('اعمل تفاوض تمثيلي 10 دقايق بالإنجليزي: العميل عايز -30% وnet 60. اقفل على صفقة مقبولة بتبادل (نطاق، دفع، مقدم) أو انسحب بأدب — واكتب ملخص الاتفاق في إيميل.', 'Role-play a 10-minute negotiation in English: the client wants −30% and net 60. Close an acceptable deal through exchanges (scope, payment, deposit) or walk away politely — and write the agreed summary in an email.'),
      quiz: [
        Q(B('counter-offer كويس:', 'A good counter-offer:'), ['If you pay 50% upfront, I can offer 5% off.', 'OK, 30% off.', 'No.'], 0, B('تبادل.', 'Exchange.')),
        Q(B('بدل تقليل السعر:', 'Instead of lowering the price:'), ['reduce the scope', 'work for free', 'ignore the client'], 0, B('نطاق.', 'Scope.')),
        Q(B('صفقة خسرانة:', 'A losing deal:'), ['walk away politely', 'accept and hope', 'be rude'], 0, B('سمعة.', 'Reputation.'))
      ] },

    { title: B('الفواتير الدولية', 'International invoices'),
      goal: B('فاتورة بتتدفع بسرعة من غير أسئلة.', 'An invoice that gets paid quickly without questions.'),
      learn: [
        L(B('أجزاء الفاتورة', 'The parts of an invoice'),
          B('فاتورة كاملة: **invoice number** فريد ومتسلسل، التاريخ والاستحقاق، بياناتك وبيانات العميل (والرقم الضريبي لو موجود)، **itemised** — كل **line item** بوصف وكمية وسعر، الإجمالي، **vat** لو بتنطبق، طريقة الدفع وبيانات البنك، والشروط.', 'A complete invoice: a unique, sequential **invoice number**, the date and due date, your details and the client’s (with tax numbers if any), **itemised** — each **line item** with a description, quantity and price, the total, **vat** if applicable, the payment method and bank details, and the terms.'),
          'INVOICE INV-2026-0142\nDate: 4 October 2026 · Due: 3 November 2026 (net 30)\nBill to: Nile Shop LLC, Cairo · PO number: PO-7781\nItem                                   Qty   Unit price   Amount\nOrder automation — phase 1 (40%)        1     720.00       720.00\nAdditional integration (Odoo stock)     1.5   350.00       525.00\nNet amount                                                  1,245.00\nVAT (if applicable)                                         —\nTotal due (USD)                                             1,245.00\nPay by bank transfer to: … · Reference: INV-2026-0142'),
        L(B('أمر الشراء', 'The purchase order'),
          B('الشركات الكبيرة بتطلع **purchase order** (PO) قبل ما تتعامل: رقم لازم يتكتب على الفاتورة، وإلا الفاتورة بترجع ومحدش بيدفع. اسأل: «Do you need a PO number on the invoice?». و**net amount** = قبل الضريبة.', 'Big companies issue a **purchase order** (PO) before working with you: a number you must put on the invoice, or the invoice bounces and nobody pays. Ask: «Do you need a PO number on the invoice?». And the **net amount** = before tax.'),
          '"Before I send the first invoice, could you let me know if you need a PO number on it, and who in your finance team it should go to?"'),
        L(B('إيميل الفاتورة', 'The invoice email'),
          B('إيميل قصير: الفاتورة مرفقة، المبلغ، الاستحقاق، طريقة الدفع، وشكر. اكتب رقم الفاتورة في الـ subject عشان المحاسبة تلاقيه. ولو فيه دفعة على مرحلة، اربطها بالمرحلة («40% on acceptance in staging, as agreed»).', 'A short email: the invoice attached, the amount, the due date, the payment method, and thanks. Put the invoice number in the subject so accounts can find it. And for a milestone payment, link it to the milestone («40% on acceptance in staging, as agreed»).'),
          'Subject: Invoice INV-2026-0142 — Nile Shop order automation\n\nHi Mona,\n\nPlease find attached invoice INV-2026-0142 for USD 1,245.00 (the 40% milestone on staging acceptance, plus the additional Odoo integration), due on 3 November.\n\nPayment details are on the invoice. Thanks very much!\n\nBest,\nLaila')
      ],
      practice: [
        B('اعمل قالب فاتورة إنجليزي كامل.', 'Make a complete English invoice template.'),
        B('اكتب line items واضحة لـ 3 خدمات.', 'Write clear line items for 3 services.'),
        B('اكتب سؤال الـ PO.', 'Write the PO question.'),
        B('اكتب إيميل فاتورة قصير.', 'Write a short invoice email.')
      ],
      words: [
        W('invoice number', 'رقم الفاتورة', 'an invoice’s unique number', 'Quote the invoice number in the transfer.'),
        W('line item', 'بند في الفاتورة', 'one row on an invoice', 'Each line item has a description.'),
        W('itemised', 'مفصّل بند بند', 'listed item by item', 'They asked for an itemised invoice.'),
        W('vat', 'ضريبة القيمة المضافة', 'value added tax', 'Is VAT included in the price?'),
        W('purchase order', 'أمر شراء', 'a buyer’s official order document', 'Add the purchase order number.'),
        W('net amount', 'المبلغ قبل الضريبة', 'the amount before tax', 'The net amount is 1,245 dollars.')
      ],
      read: [{ lib: 'Cambridge Dictionary', what: B('دوّر على invoice وitemised بأمثلة.', 'Look up invoice and itemised with examples.') }],
      challenge: B('اعمل نظام فواتير صغير: قالب فاتورة إنجليزي، ترقيم تلقائي (n8n أو Sheets)، إيميل بالقالب، وسؤال PO أوتوماتيكي لأول فاتورة مع أي عميل جديد.', 'Build a small invoicing system: an English invoice template, automatic numbering (n8n or Sheets), a templated email, and an automatic PO question for the first invoice with any new client.'),
      quiz: [
        Q(B('فاتورة من غير PO لشركة كبيرة:', 'An invoice without a PO for a big company:'), ['may be rejected', 'is paid faster', 'is fine'], 0, B('PO.', 'PO.')),
        Q(B('net amount:', 'The net amount:'), ['before tax', 'after tax', 'the deposit'], 0, B('قبل.', 'Before.')),
        Q(B('subject الإيميل:', 'The email subject:'), ['includes the invoice number', 'just «hi»', 'is empty'], 0, B('يتلاقي.', 'Findable.'))
      ] },

    { title: B('المتابعة وزيادة الأسعار', 'Chasing and raising rates'),
      goal: B('تجيب فلوسك وتزوّد أسعارك من غير ما تخسر العلاقة.', 'Get paid and raise rates without losing the relationship.'),
      learn: [
        L(B('الفواتير المتأخرة', 'Late invoices'),
          B('سلّم متدرج: تذكير ودّي بعد الاستحقاق بأيام («Just a friendly reminder that invoice … was due on…»)، تاني أوضح بعد 10 أيام، وبعدين **final notice** حازم بالإجراء (إيقاف الشغل، رسوم التأخير حسب العقد). اذكر **outstanding balance** بالظبط، واطلب **remittance** (إشعار التحويل).', 'A gentle ladder: a friendly reminder a few days after the due date («Just a friendly reminder that invoice … was due on…»), a clearer second one after 10 days, then a firm **final notice** stating the action (pausing work, late fees as per the contract). State the exact **outstanding balance** and ask for the **remittance** (transfer confirmation).'),
          'reminder 1 (+3 days): "Hi Mona, just a friendly reminder that invoice INV-2026-0142 (USD 1,245) was due on 3 November. Could you let me know when we can expect payment?"\nreminder 2 (+10 days): "The invoice is now 10 days overdue. Could you confirm the payment date, or send the remittance if it has already been paid?"\nfinal notice (+20 days): "As the outstanding balance of USD 1,245 is now 20 days overdue, I’ll need to pause work from Monday, in line with clause 4.3, until it is settled."'),
        L(B('تصحيح الأخطاء', 'Correcting mistakes'),
          B('لو الفاتورة فيها غلط بعد ما اتبعتت: متعدلش الفاتورة القديمة — اعمل **credit note** (إشعار دائن) بيلغي أو يقلل، وفاتورة جديدة. وأحيانًا **goodwill gesture** (لفتة حسن نية — خصم صغير أو ساعة مجانية) بعد مشكلة حصلت منك بتحفظ العلاقة.', 'If an invoice has a mistake after sending: do not edit the old invoice — issue a **credit note** cancelling or reducing it, and a new invoice. And sometimes a **goodwill gesture** (a small discount or a free hour) after a problem on your side keeps the relationship.'),
          '"I’m sorry — I invoiced 2 days instead of 1.5 for the Odoo work. I’ve issued credit note CN-2026-007 for USD 175 and a corrected invoice INV-2026-0145."\n"As a goodwill gesture for the delay last week, I’ve added an extra hour of support this month at no charge."'),
        L(B('زيادة الأسعار', 'Raising your rates'),
          B('**price increase** بإشعار مسبق (30–60 يوم)، سبب مختصر (قيمة أعلى، تكاليف)، والجديد من إمتى — من غير اعتذار مبالغ. وللعملاء القدام ممكن تديهم فترة بالسعر القديم. الإعلان الواضح أحسن من إنك تفضل بسعر خسران.', 'A **price increase** with advance notice (30–60 days), a brief reason (more value, costs), and when it takes effect — without over-apologising. For long-standing clients you might keep the old rate for a while. A clear announcement beats staying at a losing rate.'),
          'Subject: Update to maintenance plan pricing from 1 January\n\nHi Daniel,\n\nThank you for working with us this year. From 1 January 2027, the Business maintenance plan will be USD 260 per month (currently USD 220), reflecting the added 24/7 monitoring and monthly reports.\n\nAs a long-standing client, your current rate will stay the same until 31 March.\n\nIf you have any questions, I’m happy to talk.\n\nBest,\nLaila')
      ],
      practice: [
        B('اكتب سلّم التذكير التلاتي لفاتورة.', 'Write the three-step reminder ladder for an invoice.'),
        B('اكتب إيميل credit note لغلط.', 'Write a credit-note email for a mistake.'),
        B('اكتب إعلان زيادة سعر.', 'Write a price-increase announcement.'),
        B('أتمت التذكيرات بـ n8n (رحلة n8n أسبوع 46).', 'Automate the reminders with n8n (n8n journey week 46).')
      ],
      words: [
        W('overdue', 'متأخر عن الاستحقاق', 'past the due date', 'The invoice is ten days overdue.'),
        W('outstanding balance', 'المبلغ المتبقي', 'the amount still owed', 'The outstanding balance is 1,245 dollars.'),
        W('final notice', 'إخطار أخير', 'a last formal warning', 'We sent a final notice.'),
        W('remittance', 'إشعار التحويل', 'confirmation that payment was sent', 'Could you send the remittance?'),
        W('credit note', 'إشعار دائن', 'a document reducing an invoice', 'I’ve issued a credit note.'),
        W('goodwill gesture', 'لفتة حسن نية', 'a kind act to keep good relations', 'The free hour was a goodwill gesture.'),
        W('price increase', 'زيادة السعر', 'raising a price', 'Announce the price increase 60 days ahead.')
      ],
      read: [{ lib: 'English with Lucy', what: B('دوّر على «polite emails».', 'Search for «polite emails».') }],
      challenge: B('اكتب «قوالب الفلوس» بالإنجليزي: 3 تذكيرات متدرجة، credit note، goodwill gesture، وإعلان زيادة سعر — واربط التذكيرات بـ workflow آلي.', 'Write English «money templates»: 3 escalating reminders, a credit note, a goodwill gesture and a price-increase announcement — and connect the reminders to an automatic workflow.'),
      quiz: [
        Q(B('أول تذكير:', 'The first reminder:'), ['Just a friendly reminder that…', 'You owe me money!', 'Pay now.'], 0, B('ودّي.', 'Friendly.')),
        Q(B('غلط في فاتورة اتبعتت:', 'A mistake in a sent invoice:'), ['issue a credit note and a new invoice', 'edit the old PDF', 'ignore it'], 0, B('محاسبة.', 'Accounting.')),
        Q(B('زيادة السعر:', 'A price increase:'), ['with advance notice and a reason', 'suddenly on the next invoice', 'with long apologies'], 0, B('وضوح.', 'Clarity.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('الفلوس بالإنجليزي بقت سهلة.', 'Money in English is now easy.'),
      review: [
        B('quote وrate card وfixed fee وday rate والعملات والرسوم.', 'Quotes, rate cards, fixed fees, day rates, currencies and fees.'),
        B('value framing والسؤال عن الميزانية والباقات والاختيارات.', 'Value framing, asking about budget, bundles and options.'),
        B('counter-offers وmeet halfway وscope reduction وnon-negotiables وwalk away.', 'Counter-offers, meeting halfway, scope reduction, non-negotiables and walking away.'),
        B('الفاتورة الدولية: الرقم والبنود والضريبة والـ PO.', 'The international invoice: number, items, tax and PO.'),
        B('التذكيرات والـ final notice والـ credit notes وزيادة الأسعار.', 'Reminders, final notices, credit notes and price increases.')
      ],
      project: B('ابني «حقيبة الفلوس» بالإنجليزي لشغلك الحر: rate card، قالب عرض سعر بـ 3 اختيارات وإيميله، دليل تفاوض (counter-offers وnon-negotiables وجملة الانسحاب)، قالب فاتورة دولية وإيميلها، سلّم تذكيرات آلي، credit note، وإعلان زيادة سعر — كله مراجع لغويًا.', 'Build an English «money kit» for your freelance work: a rate card, a quote template with 3 options and its email, a negotiation guide (counter-offers, non-negotiables, the walk-away line), an international invoice template and its email, an automatic reminder ladder, a credit note, and a price-increase announcement — all proofread.'),
      test: [
        Q(B('quote:', 'A quote:'), ['a specific price offer', 'a rough guess', 'a receipt'], 0, B('محدد.', 'Specific.')),
        Q(B('day rate:', 'A day rate:'), ['a price per working day', 'a daily discount', 'a deadline'], 0, B('يومي.', 'Daily.')),
        Q(B('value framing:', 'Value framing:'), ['the price beside the client’s savings', 'a nice frame', 'a cheaper price'], 0, B('قيمة.', 'Value.')),
        Q(B('«That’s more than we budgeted»:', '«That’s more than we budgeted»:'), ['ask what they had in mind', 'drop the price by half', 'end the call'], 0, B('سؤال.', 'A question.')),
        Q(B('تبادل في التفاوض:', 'An exchange in negotiation:'), ['If you…, then I could…', 'Fine, whatever you want.', 'Take it or leave it.'], 0, B('مرونة.', 'Flexibility.')),
        Q(B('meet halfway:', 'Meet halfway:'), ['compromise in the middle', 'stop negotiating', 'double the price'], 0, B('وسط.', 'Middle.')),
        Q(B('non-negotiable:', 'Non-negotiable:'), ['not open to change', 'very cheap', 'optional'], 0, B('ثابت.', 'Fixed.')),
        Q(B('PO number:', 'A PO number:'), ['the buyer’s order reference for the invoice', 'a phone number', 'a password'], 0, B('شراء.', 'Purchasing.')),
        Q(B('itemised invoice:', 'An itemised invoice:'), ['lists each item separately', 'has no details', 'is handwritten'], 0, B('بنود.', 'Items.')),
        Q(B('remittance:', 'Remittance:'), ['confirmation that payment was sent', 'a refund', 'a quote'], 0, B('تحويل.', 'Transfer.')),
        Q(B('credit note:', 'A credit note:'), ['reduces or cancels an invoice', 'a thank-you note', 'a loan'], 0, B('تصحيح.', 'Correction.')),
        Q(B('final notice:', 'A final notice:'), ['a last formal warning with an action', 'the first reminder', 'a holiday card'], 0, B('حازم.', 'Firm.'))
      ] }
  ]
};
