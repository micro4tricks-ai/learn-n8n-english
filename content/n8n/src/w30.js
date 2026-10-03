// n8n week 30 — E-commerce, payments and webhook signatures.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('التجارة الإلكترونية والمدفوعات وتوقيع الـ webhooks', 'E-commerce, payments and webhook signatures'),
  goal: B('تأتمت متجر من أول الطلب لحد التسليم: أحداث الطلب، والدفع المؤكَّد من السيرفر، والتحقق من توقيع كل webhook، والمخزون والشحن، والمرتجعات والمطابقة اليومية.',
          'Automate a shop from order to delivery: order events, payment confirmed on the server, verifying every webhook signature, stock and shipping, refunds and daily reconciliation.'),
  days: [
    { title: B('دورة حياة الطلب', 'The order lifecycle'),
      goal: B('تعرف أحداث الطلب وتبني على كل حدث الأفعال المناسبة.', 'Know the order events and build the right actions on each.'),
      learn: [
        L(B('الأحداث الأساسية', 'The core events'),
          B('الطلب بيعدّي بمراحل: **created** (اتعمل)، **paid** (اتدفع)، **fulfilled** (اتشحن)، **delivered**، و**cancelled** أو **refunded**. المتاجر (Shopify، WooCommerce، Salla، Zid) بتبعت webhook لكل حدث. اشترك في اللي محتاجه بس.', 'An order goes through stages: **created**, **paid**, **fulfilled** (shipped), **delivered**, and **cancelled** or **refunded**. Shops (Shopify, WooCommerce, Salla, Zid) send a webhook for each event. Subscribe only to what you need.'),
          'orders/create → thank-you message (not "paid" yet!)\norders/paid → invoice + fulfilment\norders/fulfilled → tracking number to the customer\nrefunds/create → update accounting'),
        L(B('شكل بيانات الطلب', 'The shape of order data'),
          B('الطلب فيه: العميل، عنوان الشحن، **line items** (كل منتج بكميته وسعره وSKU)، الخصومات، الضرايب، والإجمالي، والعملة. اقرا عينة حقيقية (Pin) قبل ما تبني، لأن الأسماء بتختلف بين المتاجر.', 'An order holds: the customer, the shipping address, **line items** (each product with quantity, price and SKU), discounts, taxes, the total and the currency. Read a real sample (Pin it) before building, because names differ between shops.'),
          '{ "id": 5531, "currency": "EGP", "total_price": "1250.00",\n  "line_items": [{ "sku": "TEA-250", "quantity": 2, "price": "150.00" }],\n  "customer": { "email": "…" }, "shipping_address": { "city": "Giza" } }'),
        L(B('الحالة في مكانك انت', 'Status in your own place'),
          B('خزّن حالة كل طلب في جدول عندك (`orders(id, status, paid_at, shipped_at, …)`) وحدّثه مع كل حدث. الأحداث ممكن توصل متلخبطة (paid قبل created) أو مكررة؛ الجدول بيخليك تتعامل صح: متشحنش طلب مش مدفوع، ومتبعتش شكر مرتين.', 'Store each order’s status in your own table (`orders(id, status, paid_at, shipped_at, …)`) and update it on every event. Events can arrive out of order (paid before created) or twice; the table lets you behave correctly: never ship an unpaid order, never thank twice.'),
          'orders/paid arrives → upsert orders SET status = \'paid\', paid_at = now()\nfulfilment step → only WHERE status = \'paid\' AND shipped_at IS NULL')
      ],
      practice: [
        B('اعمل متجر تجريبي (Shopify dev store أو WooCommerce محلي) واشترك في 3 أحداث.', 'Set up a test shop (a Shopify dev store or local WooCommerce) and subscribe to 3 events.'),
        B('ثبّت عينة طلب حقيقية واكتب أسماء الحقول المهمة.', 'Pin a real order sample and write down the important field names.'),
        B('اعمل جدول orders بالحالات وحدّثه من كل حدث.', 'Create an orders table with statuses and update it from each event.'),
        B('ابعت حدث paid قبل created واتأكد إن نظامك اتعامل صح.', 'Send a paid event before created and check your system handles it.')
      ],
      words: [
        W('order lifecycle', 'المراحل اللي الطلب بيعدّي بيها', 'the stages an order goes through', 'Map the order lifecycle before automating.'),
        W('line item', 'سطر في الطلب: منتج وكمية وسعر', 'one line of an order: product, quantity and price', 'Each line item has a SKU.'),
        W('sku', 'كود مميز لكل منتج', 'a unique code for each product', 'TEA-250 is the SKU of the small tea pack.'),
        W('fulfilment', 'تجهيز الطلب وشحنه', 'preparing and shipping an order', 'Fulfilment starts only after payment.'),
        W('order status', 'الحالة الحالية للطلب', 'the current state of an order', 'Keep the order status in your own table.')
      ],
      read: [{ t: 'Shopify: Webhooks overview', url: 'https://shopify.dev/docs/apps/build/webhooks', what: B('اقرا فكرة الـ topics والتسليم.', 'Read about topics and delivery.') }, 'lib:n8n Docs: Webhook node'],
      challenge: B('ابني «مركز الطلبات»: يستقبل created/paid/fulfilled/cancelled، يحدّث جدول الحالة، ويبعت للعميل رسالة مناسبة لكل مرحلة من غير تكرار ولا ترتيب غلط.', 'Build an «order hub»: it receives created/paid/fulfilled/cancelled, updates the status table, and sends the customer the right message per stage without repeats or wrong order.'),
      quiz: [
        Q(B('الشحن يبدأ بعد حدث:', 'Shipping starts after the event:'), [['paid', 'paid'], ['created', 'created'], ['أي حدث', 'any event']], 0, B('متشحنش غير المدفوع.', 'Never ship unpaid orders.')),
        Q(B('الأحداث وصلت متلخبطة. الحل:', 'Events arrived out of order. The fix:'), [['جدول حالة عندك', 'your own status table'], ['تتجاهلها', 'ignore them'], ['تعيد الطلب', 'redo the order']], 0, B('الحالة بتحدد التصرف.', 'The status decides.')),
        Q(B('line item فيه:', 'A line item holds:'), [['منتج وكمية وسعر', 'a product, quantity and price'], ['عنوان الشحن', 'the shipping address'], ['اسم المتجر', 'the shop name']], 0, B('سطر في الطلب.', 'One line of the order.'))
      ] },

    { title: B('المدفوعات: التأكيد من السيرفر', 'Payments: confirming on the server'),
      goal: B('متعتمدش أبدًا على كلام المتصفح إن الدفع تم.', 'Never trust the browser that a payment happened.'),
      learn: [
        L(B('صفحة «شكرًا» مش دليل دفع', 'A «thank you» page is not proof of payment'),
          B('المستخدم ممكن يفتح رابط صفحة النجاح من غير ما يدفع. الدليل الوحيد: **webhook من مزوّد الدفع** (Stripe، Paymob، PayPal…) أو سؤال الـ API بتاعه من السيرفر. على ده بس تبعت الفاتورة وتشحن.', 'A user can open the success page link without paying. The only proof: a **webhook from the payment provider** (Stripe, Paymob, PayPal…) or asking its API from the server. Only then send the invoice and ship.'),
          '✗ browser → /success?paid=1 → ship\n✓ provider webhook "payment succeeded" (signed) → confirm amount → ship'),
        L(B('الجلسة والنية', 'Sessions and intents'),
          B('مزوّدين كتير بيشتغلوا بفكرة: تعمل **checkout session** أو **payment intent** بالمبلغ ورقم طلبك (metadata)، العميل يدفع في صفحتهم، والـ webhook يرجعلك بالنتيجة ومعاه رقم طلبك. استخدم metadata عشان تربط الدفع بالطلب صح.', 'Many providers work like this: you create a **checkout session** or **payment intent** with the amount and your order number (metadata), the customer pays on their page, and the webhook returns the result with your order number. Use metadata to link the payment to the right order.'),
          'create session: amount 125000 (smallest unit), currency, metadata.order_id = 5531\nwebhook: checkout.session.completed → metadata.order_id = 5531 → mark paid'),
        L(B('أصغر وحدة عملة', 'The smallest currency unit'),
          B('مزوّدين كتير بياخدوا المبلغ بأصغر وحدة (سنت، قرش): 1,250.00 ← `125000`. ده بيمنع أخطاء الكسور العشرية. حوّل مرة واحدة في خدمة، وقارن المبلغ اللي اتدفع بالمبلغ المطلوب قبل ما تعلّم الطلب مدفوع.', 'Many providers take the amount in the smallest unit (cents, piasters): 1,250.00 → `125000`. This avoids decimal errors. Convert once in a service, and compare the paid amount with the expected amount before marking the order paid.'),
          "const toMinor = amount => Math.round(Number(amount) * 100);\ntoMinor('1250.00')   // 125000\nif (event.amount_received !== toMinor(order.total)) → alert, do not ship")
      ],
      practice: [
        B('اعمل حساب Stripe test mode (أو مزوّد محلي بوضع تجربة) واعمل checkout session من n8n.', 'Create a Stripe test-mode account (or a local provider in test mode) and make a checkout session from n8n.'),
        B('ادفع بكارت تجريبي رسمي من التوثيق واستقبل الـ webhook.', 'Pay with an official test card from the docs and receive the webhook.'),
        B('اربط الدفع بالطلب بالـ metadata.', 'Link the payment to the order with metadata.'),
        B('قارن المبلغ المدفوع بالمطلوب وابعت تنبيه لو مختلف.', 'Compare the paid and expected amounts and alert if they differ.')
      ],
      words: [
        W('checkout session', 'جلسة دفع بيعملها المزوّد للعميل', 'a payment session the provider creates for the customer', 'Create a checkout session with the order id.'),
        W('payment intent', 'نية دفع بمبلغ معيّن بتتابع حالتها', 'an intention to pay a set amount whose status you follow', 'The payment intent succeeded.'),
        W('smallest currency unit', 'أصغر وحدة عملة زي القرش أو السنت', 'the smallest unit of a currency, like a piaster or cent', 'Send 125000 in the smallest currency unit.'),
        W('server-side confirmation', 'التأكد من النتيجة من السيرفر مش من المتصفح', 'checking the result on the server, not the browser', 'Ship only after server-side confirmation.'),
        W('client-side', 'اللي بيحصل في متصفح المستخدم (مش موثوق)', 'what happens in the user’s browser (not trusted)', 'A client-side success page proves nothing.')
      ],
      read: [{ t: 'Stripe: Checkout quickstart', url: 'https://docs.stripe.com/checkout/quickstart', what: B('اقرا الفكرة العامة للجلسة والـ webhook.', 'Read the overall idea of the session and the webhook.') }, { t: 'Stripe: Testing (test cards)', url: 'https://docs.stripe.com/testing', what: B('استخدم الكروت التجريبية الرسمية بس.', 'Use only the official test cards.') }],
      challenge: B('اعمل دورة دفع كاملة في test mode: طلب ← جلسة دفع بالمتاداتا ← دفع بكارت تجريبي ← webhook ← مقارنة المبلغ ← تعليم الطلب مدفوع وبدء الشحن.', 'Build a full payment cycle in test mode: order → payment session with metadata → test-card payment → webhook → amount check → mark paid and start fulfilment.'),
      quiz: [
        Q(B('دليل الدفع الحقيقي:', 'Real proof of payment:'), [['webhook من المزوّد أو سؤال الـ API', 'a provider webhook or asking its API'], ['صفحة الشكر', 'the thank-you page'], ['رسالة من العميل', 'a message from the customer']], 0, B('من السيرفر.', 'From the server.')),
        Q(B('1,250.00 بأصغر وحدة:', '1,250.00 in the smallest unit:'), [['125000', '125000'], ['1250', '1250'], ['12.50', '12.50']], 0, B('× 100.', '× 100.')),
        Q(B('metadata في جلسة الدفع بتستخدم لـ:', 'Metadata on a payment session is used to:'), [['ربط الدفع بطلبك', 'link the payment to your order'], ['تصميم الصفحة', 'design the page'], ['السرعة', 'speed']], 0, B('رقم الطلب.', 'The order number.'))
      ] },

    { title: B('التحقق من توقيع الـ webhook', 'Verifying webhook signatures'),
      goal: B('ترفض أي webhook مش جاي فعلًا من الخدمة أو اتعدّل.', 'Reject any webhook that did not really come from the service or was altered.'),
      learn: [
        L(B('إزاي التوقيع بيشتغل', 'How the signature works'),
          B('الخدمة بتحسب HMAC-SHA256 للـ **body الخام** بسر مشترك (signing secret) وتحطه في header. Stripe مثلًا: `Stripe-Signature: t=1700000000,v1=abc…` والمحتوى الموقّع هو `t + "." + body`. Shopify: `X-Shopify-Hmac-Sha256` بـ base64. اقرا توثيق كل خدمة: التفاصيل بتختلف.', 'The service computes an HMAC-SHA256 of the **raw body** with a shared secret (the signing secret) and puts it in a header. Stripe, for example: `Stripe-Signature: t=1700000000,v1=abc…` and the signed content is `t + "." + body`. Shopify: `X-Shopify-Hmac-Sha256` in base64. Read each service’s docs: the details differ.'),
          'Stripe-Signature: t=1700000000,v1=5257a869e7…\nsigned_payload = "1700000000" + "." + raw_body\nexpected = HMAC_SHA256(signing_secret, signed_payload) → hex'),
        L(B('في n8n: body خام وCrypto', 'In n8n: raw body and Crypto'),
          B('في نود Webhook فعّل **Raw Body** عشان توصل للـ body زي ما وصل بالظبط. احسب التوقيع بنود **Crypto** (HMAC، SHA256، السر من credential أو $env) أو Code node، وقارن بالـ header. لو مختلف: رد 400 ووقّف.', 'In the Webhook node enable **Raw Body** to get the body exactly as it arrived. Compute the signature with the **Crypto** node (HMAC, SHA256, the secret from a credential or $env) or a Code node, and compare with the header. If it differs: reply 400 and stop.'),
          "const crypto = require('crypto');\nconst [t, v1] = ['t', 'v1'].map(k => header.split(',').find(p => p.startsWith(k + '='))?.split('=')[1]);\nconst expected = crypto.createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex');\nconst ok = v1 && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));"),
        L(B('نافذة الوقت ضد الإعادة', 'A time window against replays'),
          B('لو حد مسك webhook حقيقي، ممكن يبعته تاني بعد شهر — التوقيع لسه صح! عشان كده Stripe بيضيف الوقت `t`: ارفض لو أقدم من 5 دقايق مثلًا. ومع منع التكرار بالـ event id، الإعادة مالهاش أثر.', 'If someone captured a real webhook, they could resend it a month later — the signature is still valid! That is why Stripe includes the time `t`: reject it if older than, say, 5 minutes. With de-duplication by event id, a replay has no effect.'),
          "if (Math.abs(Date.now() / 1000 - Number(t)) > 300) → reject (too old)\nif event.id already processed → reply 200, do nothing")
      ],
      practice: [
        B('فعّل Raw Body في webhook الدفع واطبع الـ headers.', 'Enable Raw Body on the payment webhook and print the headers.'),
        B('احسب التوقيع بنود Crypto وقارن.', 'Compute the signature with the Crypto node and compare.'),
        B('غيّر حرف واحد في الـ body (بـ curl) واتأكد إنه اترفض.', 'Change one character of the body (with curl) and check it is rejected.'),
        B('ضيف رفض الأقدم من 5 دقايق.', 'Add rejection of anything older than 5 minutes.')
      ],
      words: [
        W('endpoint secret', 'السر الخاص بعنوان الـ webhook عند المزوّد', 'the secret tied to your webhook address at the provider', 'Each webhook URL has its own endpoint secret.'),
        W('signature header', 'الـ header اللي فيه التوقيع', 'the header that carries the signature', 'Read the Stripe-Signature header.'),
        W('tolerance window', 'أقصى عمر مقبول لطلب موقّع', 'the maximum accepted age of a signed request', 'Use a 5-minute tolerance window.'),
        W('timing-safe compare', 'مقارنة مش بتكشف معلومات من وقتها', 'a comparison that leaks nothing through its timing', 'Use a timing-safe compare for signatures.'),
        W('signed payload', 'المحتوى اللي اتحسب عليه التوقيع', 'the content the signature was computed over', 'The signed payload is t, a dot, and the body.')
      ],
      read: [{ t: 'Stripe: Webhook signature verification', url: 'https://docs.stripe.com/webhooks/signature', what: B('اقرا الخطوات اللي بتعملها يدوي.', 'Read the steps for checking by hand.') }, 'lib:n8n Docs: Crypto'],
      challenge: B('اعمل `svc: verify webhook` بيدعم Stripe وShopify: يقرا الـ header المناسب، يحسب التوقيع، يقارن بأمان، يرفض القديم، ويرجّع `{ ok, reason }` — واختبره بطلبات سليمة ومعدّلة وقديمة.', 'Build `svc: verify webhook` supporting Stripe and Shopify: read the right header, compute the signature, compare safely, reject old ones, and return `{ ok, reason }` — test it with valid, altered and old requests.'),
      quiz: [
        Q(B('التوقيع بيتحسب على:', 'The signature is computed over:'), [['الـ body الخام بالظبط', 'the exact raw body'], ['الـ JSON بعد التحويل', 'the parsed JSON'], ['الـ URL', 'the URL']], 0, B('أي تغيير بيبوّظه.', 'Any change breaks it.')),
        Q(B('الطلب الموقّع عمره ساعة:', 'A signed request is an hour old:'), [['ارفضه (خارج النافذة)', 'reject it (outside the window)'], ['اقبله', 'accept it'], ['أعد حسابه', 'recompute it']], 0, B('ضد الإعادة.', 'Against replays.')),
        Q(B('السر بيتحفظ في:', 'The secret is kept in:'), [['credential أو $env', 'a credential or $env'], ['اسم النود', 'the node name'], ['الـ webhook URL', 'the webhook URL']], 0, B('مش في النود.', 'Never in the node.'))
      ] },

    { title: B('المخزون والشحن', 'Stock and shipping'),
      goal: B('المخزون صح في كل مكان، والعميل عارف طلبه فين.', 'Stock is right everywhere, and the customer knows where their order is.'),
      learn: [
        L(B('مزامنة المخزون', 'Inventory sync'),
          B('لو بتبيع في أكتر من مكان (الموقع، أمازون، محل)، المخزون لازم يتحدّث في الكل لما حاجة تتباع. المرجع واحد (جدول أو نظام مخزون)، وكل بيع ينقص منه، وworkflow يوزّع الرقم الجديد على القنوات. والحجز بيحصل عند الدفع مش عند السلة.', 'If you sell in several places (the website, Amazon, a shop), stock must update everywhere when something sells. One reference (a table or stock system), every sale reduces it, and a workflow pushes the new number to the channels. Reserve at payment, not at the cart.'),
          'orders/paid → stock[sku] -= qty → push stock to website + marketplace\nstock[sku] < 5 → low-stock alert'),
        L(B('تنبيه نقص المخزون', 'Low-stock alerts'),
          B('لكل منتج حد أدنى (reorder point) حسب سرعة بيعه: لو بتبيع 10 في اليوم والمورّد بياخد 5 أيام، الحد لازم فوق 50. workflow يومي بيحسب متوسط البيع ويقارن ويبعت قايمة «اطلب دلوقتي».', 'Each product has a minimum (a reorder point) based on how fast it sells: if you sell 10 a day and the supplier takes 5 days, the point must be above 50. A daily workflow computes the average sales, compares, and sends an «order now» list.'),
          'reorder_point = avg_daily_sales × supplier_days × 1.2 (safety)\nTEA-250: 10/day × 5 days × 1.2 = 60 → stock 48 → reorder'),
        L(B('شركات الشحن ورقم التتبع', 'Couriers and tracking numbers'),
          B('شركات الشحن (محلية زي Bosta أو Aramex، أو عالمية) ليها APIs: تعمل شحنة ← ترجع **tracking number** ← تبعته للعميل. وبعدين webhook أو polling لحالة الشحنة ← رسالة «خرج للتوصيل» و«اتسلّم». وللدفع عند الاستلام، المبلغ بيتسجّل لما المندوب يسلّم.', 'Couriers (local ones like Bosta or Aramex, or global ones) have APIs: create a shipment → get a **tracking number** → send it to the customer. Then a webhook or polling for shipment status → «out for delivery» and «delivered» messages. For cash on delivery, the amount is recorded when the courier delivers.'),
          'paid → courier API: create shipment → tracking_number → WhatsApp to customer\ncourier webhook: out_for_delivery / delivered → message + update orders')
      ],
      practice: [
        B('اعمل جدول stock وخلّي كل طلب مدفوع ينقص منه.', 'Create a stock table and make every paid order reduce it.'),
        B('احسب reorder point لـ 5 منتجات من بيانات بيع وهمية.', 'Compute the reorder point for 5 products from fake sales data.'),
        B('اعمل تنبيه نقص مخزون يومي.', 'Build a daily low-stock alert.'),
        B('اقرا توثيق API شركة شحن واكتب خطوات إنشاء شحنة.', 'Read a courier’s API docs and write the steps to create a shipment.')
      ],
      words: [
        W('inventory sync', 'تحديث المخزون في كل قنوات البيع', 'updating stock across every sales channel', 'Inventory sync runs after each paid order.'),
        W('stock level', 'الكمية الموجودة من منتج', 'the quantity of a product on hand', 'The stock level of TEA-250 is 48.'),
        W('reorder point', 'الحد اللي لما المخزون يوصله تطلب تاني', 'the level at which you order more', 'The reorder point is 60 units.'),
        W('tracking number', 'رقم تتابع بيه الشحنة', 'a number to follow a shipment', 'Send the tracking number by WhatsApp.'),
        W('cash on delivery', 'الدفع عند الاستلام', 'paying when the order is delivered', 'Most orders here are cash on delivery.')
      ],
      read: ['lib:n8n Docs: Postgres node', { lib: 'n8n Docs: Schedule Trigger', what: B('للتقرير اليومي للمخزون.', 'For the daily stock report.') }],
      challenge: B('ابني مزامنة مخزون بين قناتين (موقع + شيت لمحل مثلًا)، وتنبيه reorder يومي بالحساب، ومحاكي شحن (webhook وهمي) يبعت للعميل رقم التتبع ورسايل الحالة.', 'Build stock sync between two channels (a website + a shop sheet, for example), a daily reorder alert with the calculation, and a shipping simulator (a fake webhook) that sends the customer a tracking number and status messages.'),
      quiz: [
        Q(B('المخزون بيتحجز عند:', 'Stock is reserved at:'), [['الدفع', 'payment'], ['إضافة للسلة', 'adding to the cart'], ['زيارة الصفحة', 'visiting the page']], 0, B('السلال بتتساب كتير.', 'Carts are often abandoned.')),
        Q(B('reorder point بيعتمد على:', 'The reorder point depends on:'), [['سرعة البيع ومدة المورّد', 'sales speed and supplier time'], ['لون المنتج', 'the product colour'], ['اسم المورّد', 'the supplier’s name']], 0, B('+ هامش أمان.', '+ a safety margin.')),
        Q(B('رقم التتبع بيتبعت لما:', 'The tracking number is sent when:'), [['الشحنة تتعمل', 'the shipment is created'], ['العميل يزور الموقع', 'the customer visits the site'], ['الطلب يتلغي', 'the order is cancelled']], 0, B('من API الشحن.', 'From the courier API.'))
      ] },

    { title: B('المرتجعات والمطابقة', 'Refunds and reconciliation'),
      goal: B('كل جنيه داخل أو خارج متطابق مع طلب.', 'Every pound in or out matches an order.'),
      learn: [
        L(B('مسار المرتجع', 'The refund flow'),
          B('طلب مرتجع ← تحقق (الطلب مدفوع؟ في المدة؟) ← موافقة إنسان لو فوق مبلغ (Wait بـ resume URL) ← استرجاع عن طريق API المزوّد بـ **idempotency key** ← تحديث الطلب والمخزون ← رسالة للعميل. ومتعملش الاسترجاع يدوي ونسيان تحدّث النظام.', 'A refund request → checks (is the order paid? within the period?) → human approval above an amount (Wait with a resume URL) → refund through the provider API with an **idempotency key** → update the order and stock → message the customer. Never refund by hand and forget to update the system.'),
          'request → checks → amount > 1000 ? approval : auto\n→ provider refund (Idempotency-Key: refund-5531) → orders.status = refunded → stock += qty'),
        L(B('المطابقة اليومية', 'Daily reconciliation'),
          B('كل يوم: هات المدفوعات من المزوّد (API) والطلبات المدفوعة من جدولك لنفس اليوم، وادمجهم برقم الطلب. النتيجة: متطابق، **دفع من غير طلب**، **طلب «مدفوع» من غير دفع**، ومبلغ مختلف. الحالات التلاتة الأخيرة تقرير للمراجعة.', 'Every day: fetch payments from the provider (API) and paid orders from your table for the same day, and merge them by order number. The result: matched, **a payment with no order**, **an order marked paid with no payment**, and a different amount. The last three go in a report for review.'),
          'Merge (order_id): provider payments ⟷ orders paid today\nKeep Non-Matches (both sides) + amount mismatch → "reconciliation issues" email'),
        L(B('النزاعات والتسويات', 'Disputes and payouts'),
          B('**chargeback/dispute**: العميل اعترض عند البنك — المزوّد بيبعت webhook ومعاه موعد لتقديم أدلة (فاتورة، إثبات تسليم). أتمت تجميع الأدلة وتنبيه بالموعد. و**payout**: الفلوس اللي المزوّد بيحوّلها لحسابك — طابقها مع مجموع المدفوعات ناقص الرسوم.', 'A **chargeback/dispute**: the customer objected at their bank — the provider sends a webhook with a deadline for evidence (invoice, proof of delivery). Automate gathering the evidence and alerting before the deadline. A **payout** is the money the provider transfers to your account — reconcile it with the total payments minus fees.'),
          'dispute.created → collect invoice + delivery proof → alert owner (deadline in 7 days)\npayout 18,420 = payments 19,000 − fees 580 ✓')
      ],
      practice: [
        B('ابني مسار مرتجع بموافقة فوق مبلغ معيّن (test mode).', 'Build a refund flow with approval above a set amount (test mode).'),
        B('اعمل مطابقة يومية بين مدفوعات المزوّد وجدول الطلبات.', 'Build a daily reconciliation between provider payments and the orders table.'),
        B('اعمل حالة «طلب مدفوع من غير دفع» عمدًا وشوفها في التقرير.', 'Create an «order paid with no payment» case on purpose and see it in the report.'),
        B('اكتب خطوات التعامل مع dispute لبيزنس صغير.', 'Write the steps for handling a dispute for a small business.')
      ],
      words: [
        W('refund', 'رجوع فلوس العميل', 'returning a customer’s money', 'Issue the refund with an idempotency key.'),
        W('reconciliation', 'مطابقة سجلين عشان تتأكد إنهم متفقين', 'matching two records to make sure they agree', 'Daily reconciliation found two mismatches.'),
        W('chargeback', 'العميل بيسحب الفلوس عن طريق البنك', 'a customer reversing a payment through the bank', 'A chargeback needs proof of delivery.'),
        W('dispute', 'اعتراض رسمي على عملية دفع', 'a formal objection to a payment', 'Answer the dispute before the deadline.'),
        W('payout', 'الفلوس اللي المزوّد بيحوّلها لحسابك', 'the money a provider transfers to your account', 'The payout equals payments minus fees.')
      ],
      read: [{ t: 'Stripe: Refunds', url: 'https://docs.stripe.com/refunds', what: B('اقرا الاسترجاع الكامل والجزئي.', 'Read about full and partial refunds.') }, { t: 'Stripe: Disputes overview', url: 'https://docs.stripe.com/disputes', what: B('اقرا مراحل النزاع والمواعيد.', 'Read the stages and deadlines of a dispute.') }],
      challenge: B('ابني «المحاسب الآلي»: مرتجعات بموافقة وidempotency، مطابقة يومية بتقرير للمشاكل، وتنبيه نزاعات بالموعد وتجميع الأدلة — كله في test mode.', 'Build an «automatic accountant»: refunds with approval and idempotency, a daily reconciliation report of issues, and dispute alerts with deadlines and evidence gathering — all in test mode.'),
      quiz: [
        Q(B('الاسترجاع عن طريق API لازم:', 'A refund through the API must:'), [['يبقى بـ idempotency key', 'use an idempotency key'], ['يتعاد لو اتأخر', 'be repeated if slow'], ['من غير تسجيل', 'go unrecorded']], 0, B('عشان ميتكررش.', 'So it is never doubled.')),
        Q(B('المطابقة بتكشف:', 'Reconciliation reveals:'), [['دفع من غير طلب والعكس ومبالغ مختلفة', 'payments with no order, the reverse, and different amounts'], ['سرعة الموقع', 'site speed'], ['المنتجات الأكتر مبيعًا', 'best-selling products']], 0, B('عدم التطابق.', 'Mismatches.')),
        Q(B('payout المفروض يساوي:', 'A payout should equal:'), [['المدفوعات ناقص الرسوم', 'payments minus fees'], ['المدفوعات بس', 'payments only'], ['صفر', 'zero']], 0, B('الرسوم بتتخصم.', 'Fees are deducted.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('متجر مؤتمت آمن من الطلب للمطابقة.', 'A safe automated shop from order to reconciliation.'),
      review: [
        B('دورة حياة الطلب، وline items، وجدول الحالة عندك.', 'The order lifecycle, line items, and your own status table.'),
        B('الدفع يتأكد من السيرفر، وmetadata، وأصغر وحدة عملة.', 'Payment confirmed on the server, metadata, and the smallest currency unit.'),
        B('توقيع الـ webhook: raw body، HMAC، مقارنة آمنة، ونافذة وقت.', 'Webhook signatures: raw body, HMAC, safe compare and a time window.'),
        B('مزامنة المخزون، وreorder point، والشحن ورقم التتبع.', 'Stock sync, the reorder point, shipping and tracking numbers.'),
        B('المرتجعات بموافقة، والمطابقة اليومية، والنزاعات والتسويات.', 'Refunds with approval, daily reconciliation, disputes and payouts.')
      ],
      project: B('ابني متجر تجريبي مؤتمت (test mode): أحداث الطلب لجدول حالة، دفع بجلسة وwebhook موقّع ومتحقق منه، مقارنة المبلغ، مخزون وتنبيه reorder، شحن وهمي برقم تتبع ورسايل، مرتجعات بموافقة، ومطابقة يومية بتقرير. وثّقه برسمة واختبره بطلبات سليمة ومزيّفة.', 'Build an automated test shop (test mode): order events into a status table, payment with a session and a verified signed webhook, an amount check, stock and reorder alerts, fake shipping with tracking and messages, refunds with approval, and a daily reconciliation report. Document it with a diagram and test it with valid and fake requests.'),
      test: [
        Q(B('الشحن بعد:', 'Ship after:'), [['تأكيد الدفع من السيرفر', 'payment confirmed on the server'], ['created', 'created'], ['صفحة الشكر', 'the thank-you page']], 0, B('مش من المتصفح.', 'Not from the browser.')),
        Q(B('ليه جدول حالة للطلبات عندك؟', 'Why keep your own order status table?'), [['الأحداث ممكن تتكرر أو تتلخبط', 'events can repeat or arrive out of order'], ['للزينة', 'for decoration'], ['مش لازم', 'not needed']], 0, B('التصرف حسب الحالة.', 'Act by status.')),
        Q(B('مبلغ الدفع اختلف عن الطلب:', 'The paid amount differs from the order:'), [['تنبيه ومتشحنش', 'alert and do not ship'], ['اشحن عادي', 'ship anyway'], ['امسح الطلب', 'delete the order']], 0, B('راجع الأول.', 'Review first.')),
        Q(B('Raw Body في الـ webhook ضروري لـ:', 'Raw Body on the webhook is needed for:'), [['حساب التوقيع', 'computing the signature'], ['السرعة', 'speed'], ['العربي', 'Arabic text']], 0, B('الـ body زي ما وصل.', 'The body as it arrived.')),
        Q(B('توقيع مختلف:', 'A different signature:'), [['ارفض بـ 400', 'reject with 400'], ['اقبل', 'accept'], ['أعد المحاولة', 'retry']], 0, B('مزيّف أو متعدّل.', 'Fake or altered.')),
        Q(B('الـ t في Stripe-Signature لـ:', 'The t in Stripe-Signature is for:'), [['رفض الطلبات القديمة', 'rejecting old requests'], ['الترتيب', 'ordering'], ['العملة', 'currency']], 0, B('نافذة الوقت.', 'The time window.')),
        Q(B('المخزون يتحدّث في:', 'Stock is updated in:'), [['كل قنوات البيع من مرجع واحد', 'every sales channel from one reference'], ['قناة واحدة بس', 'one channel only'], ['آخر الشهر', 'at month end']], 0, B('مزامنة.', 'Sync.')),
        Q(B('reorder point = متوسط البيع × مدة المورّد × …', 'reorder point = average sales × supplier days × …'), [['هامش أمان', 'a safety margin'], ['صفر', 'zero'], ['السعر', 'the price']], 0, B('مثلًا 1.2.', 'For example 1.2.')),
        Q(B('رقم التتبع بيجي من:', 'The tracking number comes from:'), [['API شركة الشحن', 'the courier API'], ['العميل', 'the customer'], ['n8n لوحده', 'n8n by itself']], 0, B('بعد إنشاء الشحنة.', 'After creating the shipment.')),
        Q(B('استرجاع فوق مبلغ كبير:', 'A refund above a large amount:'), [['موافقة إنسان أولًا', 'human approval first'], ['تلقائي دايمًا', 'always automatic'], ['مرفوض دايمًا', 'always refused']], 0, B('Wait بـ resume URL.', 'Wait with a resume URL.')),
        Q(B('المطابقة اليومية بتدمج:', 'Daily reconciliation merges:'), [['مدفوعات المزوّد وطلباتك', 'provider payments and your orders'], ['العملاء والمنتجات', 'customers and products'], ['الإيميلات', 'emails']], 0, B('برقم الطلب.', 'By order number.')),
        Q(B('chargeback:', 'A chargeback:'), [['العميل سحب الفلوس عن طريق البنك', 'the customer reversed the payment through the bank'], ['استرجاع منك', 'a refund from you'], ['تسوية', 'a payout']], 0, B('محتاج أدلة بموعد.', 'Needs evidence by a deadline.'))
      ] }
  ]
};
