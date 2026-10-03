// n8n week 31 — WhatsApp, email and messaging at scale.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('واتساب والإيميل والرسايل على نطاق كبير', 'WhatsApp, email and messaging at scale'),
  goal: B('تبعت آلاف الرسايل من غير ما تتحظر أو توصل spam: قوالب واتساب المعتمدة، والإرسال بدفعات، وتوثيق الإيميل (SPF/DKIM/DMARC)، والرسايل الواردة وحالاتها، والموافقة وإلغاء الاشتراك.',
          'Send thousands of messages without being blocked or landing in spam: approved WhatsApp templates, sending in batches, email authentication (SPF/DKIM/DMARC), incoming messages and their statuses, and consent and unsubscribing.'),
  days: [
    { title: B('WhatsApp Business Cloud API', 'The WhatsApp Business Cloud API'),
      goal: B('تفهم قواعد واتساب الرسمية قبل ما تبعت أول رسالة.', 'Understand WhatsApp’s official rules before sending your first message.'),
      learn: [
        L(B('الإعداد الأساسي', 'The basic setup'),
          B('محتاج حساب Meta Business، وتطبيق في Meta for Developers، ورقم واتساب Business، و**phone number id** وtoken دائم (system user). n8n فيه نود WhatsApp Business Cloud للإرسال وتريجر للاستقبال. ابدأ برقم الاختبار اللي Meta بتديه.', 'You need a Meta Business account, an app in Meta for Developers, a WhatsApp Business number, its **phone number id**, and a permanent token (a system user). n8n has a WhatsApp Business Cloud node for sending and a trigger for receiving. Start with the test number Meta gives you.'),
          'Meta Business → App (WhatsApp) → phone number id: 1234567890\nn8n credential: WhatsApp API (access token + business account id)'),
        L(B('القوالب ونافذة الـ 24 ساعة', 'Templates and the 24-hour window'),
          B('لو العميل بعتلك رسالة، عندك **24 ساعة** ترد بأي نص (customer service window). بره النافذة دي لازم **message template** معتمد من Meta: utility (تأكيد حجز، فاتورة)، أو marketing (عروض)، أو authentication (أكواد). القالب فيه متغيّرات `{{1}}` بتملاها.', 'If a customer messaged you, you have **24 hours** to reply with any text (the customer service window). Outside it you must use a Meta-approved **message template**: utility (booking confirmation, invoice), marketing (offers) or authentication (codes). The template has variables `{{1}}` that you fill in.'),
          'Template "booking_reminder" (utility, ar):\n"أهلًا {{1}}، معادك يوم {{2}} الساعة {{3}}. للتأكيد اكتب 1"'),
        L(B('جودة الرقم وحدوده', 'Number quality and limits'),
          B('Meta بتقيّم جودة رقمك (quality rating) من تفاعل الناس: بلوك كتير أو بلاغات = جودة أقل وحدود إرسال أقل أو إيقاف. وفيه **messaging limits** لعدد العملاء الجداد في اليوم بتزيد مع الجودة والحجم — شوف القيم الحالية في توثيق Meta.', 'Meta rates your number’s quality from how people react: many blocks or reports = lower quality and lower sending limits, or suspension. There are **messaging limits** on new customers per day that grow with quality and volume — check the current values in Meta’s docs.'),
          'quality: high ✓ · messaging limit tier grows with good quality\nmany blocks → quality low → limits drop → risk of restriction')
      ],
      practice: [
        B('اعمل تطبيق WhatsApp في Meta for Developers وابعت رسالة من رقم الاختبار.', 'Create a WhatsApp app in Meta for Developers and send a message from the test number.'),
        B('اكتب 3 قوالب (utility) لبيزنس تعرفه واطلب اعتماد واحد.', 'Write 3 utility templates for a business you know and submit one for approval.'),
        B('ابعت قالب بمتغيّرات من n8n.', 'Send a template with variables from n8n.'),
        B('اكتب قواعد: إمتى نص حر وإمتى قالب.', 'Write the rules: when free text and when a template.')
      ],
      words: [
        W('message template', 'رسالة متعمدة مسبقًا من Meta بخانات', 'a message pre-approved by Meta, with slots', 'Use the booking_reminder message template.'),
        W('customer service window', 'الـ 24 ساعة بعد رسالة العميل اللي تقدر ترد فيها بحرية', 'the 24 hours after a customer’s message when you may reply freely', 'Reply inside the customer service window.'),
        W('phone number id', 'رقم تعريف رقم الواتساب في API', 'the API identifier of a WhatsApp number', 'Send from this phone number id.'),
        W('quality rating', 'تقييم Meta لجودة رسايل رقمك', 'Meta’s rating of your number’s message quality', 'Our quality rating dropped after the campaign.'),
        W('messaging limit', 'حد عدد العملاء اللي تقدر تراسلهم في اليوم', 'the cap on customers you may message per day', 'The messaging limit grows with good quality.')
      ],
      read: ['lib:n8n Docs: WhatsApp Business Cloud', { t: 'Meta: WhatsApp Cloud API — Get started', url: 'https://developers.facebook.com/documentation/business-messaging/whatsapp/get-started', what: B('اتبع الخطوات لحد أول رسالة.', 'Follow the steps up to your first message.') }],
      challenge: B('اعمل تذكير مواعيد بقالب utility معتمد (أو جاهز للاعتماد): يقرا المواعيد بكرة، يبعت القالب بالمتغيّرات، ويسجّل كل رسالة اتبعتت.', 'Build appointment reminders with an approved (or ready-to-approve) utility template: read tomorrow’s appointments, send the template with variables, and log every message sent.'),
      quiz: [
        Q(B('عميل بعتلك من 3 ساعات:', 'A customer messaged you 3 hours ago:'), [['ترد بنص حر', 'reply with free text'], ['لازم قالب', 'a template is required'], ['مينفعش ترد', 'you cannot reply']], 0, B('جوه نافذة الـ 24 ساعة.', 'Inside the 24-hour window.')),
        Q(B('تذكير بمعاد لعميل مبعتش من أسبوع:', 'A reminder to a customer silent for a week:'), [['قالب utility معتمد', 'an approved utility template'], ['نص حر', 'free text'], ['مينفعش', 'not allowed']], 0, B('بره النافذة.', 'Outside the window.')),
        Q(B('بلوك كتير من الناس بيأدي لـ:', 'Many blocks lead to:'), [['جودة أقل وحدود أقل', 'lower quality and lower limits'], ['حدود أعلى', 'higher limits'], ['ولا حاجة', 'nothing']], 0, B('ابعت للي عايز بس.', 'Message only those who want it.'))
      ] },

    { title: B('الإرسال بالجملة بأمان', 'Bulk sending safely'),
      goal: B('توصّل لآلاف الناس بدفعات منظمة ومن غير إزعاج.', 'Reach thousands of people in orderly batches without annoying them.'),
      learn: [
        L(B('طابور الإرسال', 'The sending queue'),
          B('الحملة متتبعتش في loop واحد. حطها في **طابور** (جدول `outbox(to, template, vars, status, send_after)`)، وعامل كل دقيقة بياخد دفعة صغيرة (مثلًا 30) ويبعت ويسجّل الحالة. كده تقدر توقف الحملة في نصها، وتكمّل لو حاجة وقعت، وتحترم الحدود.', 'A campaign is not sent in one loop. Put it in a **queue** (a table `outbox(to, template, vars, status, send_after)`), and a worker every minute takes a small batch (e.g. 30), sends, and records the status. You can then pause the campaign mid-way, resume after a failure, and respect limits.'),
          'Campaign → INSERT 3,000 rows into outbox (status pending)\nWorker every minute → 30 pending where send_after <= now → send → status sent/failed'),
        L(B('التخصيص بالمتغيّرات', 'Personalising with variables'),
          B('رسالة فيها اسم العميل ومعلومة تخصه (آخر منتج، معاده) بتتقري وتتفاعل أكتر بكتير من رسالة عامة. جهّز المتغيّرات قبل ما تدخل الطابور، واتأكد إن مفيش متغيّر فاضي («أهلًا ،» شكلها وحش) — حط قيمة بديلة.', 'A message with the customer’s name and something specific to them (their last product, their appointment) gets read and answered far more than a generic one. Prepare the variables before queueing, and make sure none is empty («Hello ,» looks bad) — use a fallback.'),
          "vars: [ $json.first_name || 'عميلنا العزيز', $json.last_product, $json.date ]"),
        L(B('ساعات الهدوء', 'Quiet hours'),
          B('محدش عايز رسالة تسويق الساعة 2 بالليل. حط **quiet hours** (مثلًا من 9 بالليل لـ 9 الصبح بتوقيت العميل)، والعامل يأجّل `send_after` للصبح. وفي رمضان والأعياد اظبط المواعيد حسب عادات الناس.', 'Nobody wants a marketing message at 2 a.m. Set **quiet hours** (e.g. from 9 p.m. to 9 a.m. in the customer’s time zone), and the worker postpones `send_after` to the morning. In Ramadan and holidays adjust the times to people’s habits.'),
          "const h = DateTime.now().setZone('Africa/Cairo').hour;\nif (h >= 21 || h < 9) → send_after = tomorrow 09:00")
      ],
      practice: [
        B('اعمل جدول outbox وعامل بيبعت 10 في الدقيقة (لنفسك أو أرقام اختبار).', 'Create an outbox table and a worker sending 10 per minute (to yourself or test numbers).'),
        B('اعمل flag يوقف الحملة ويكمّلها.', 'Add a flag that pauses and resumes the campaign.'),
        B('جهّز متغيّرات بقيم بديلة واختبر عميل من غير اسم.', 'Prepare variables with fallbacks and test a customer with no name.'),
        B('ضيف quiet hours بتوقيت القاهرة.', 'Add quiet hours in Cairo time.')
      ],
      words: [
        W('broadcast', 'رسالة واحدة لناس كتير', 'one message to many people', 'Queue the broadcast instead of a loop.'),
        W('outbox', 'جدول الرسايل اللي مستنية تتبعت', 'the table of messages waiting to be sent', 'The outbox holds 3,000 pending messages.'),
        W('template variable', 'خانة في القالب بتتملي لكل عميل', 'a slot in a template filled for each customer', 'The first template variable is the name.'),
        W('quiet hours', 'ساعات ممنوع فيها الإرسال', 'hours when sending is not allowed', 'Respect quiet hours after 9 p.m.'),
        W('media message', 'رسالة فيها صورة أو ملف أو فيديو', 'a message with an image, file or video', 'Send the invoice as a media message.')
      ],
      read: [{ t: 'Meta: WhatsApp message templates', url: 'https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview', what: B('اقرا الأنواع والمتغيّرات.', 'Read the categories and variables.') }, 'lib:n8n Docs: Loop Over Items'],
      challenge: B('ابني «محرك حملات»: رفع قايمة ← تنضيف الأرقام ← استبعاد الملغين ← outbox بمتغيّرات ← عامل بدفعات وquiet hours ← إيقاف/استكمال ← تقرير (اتبعت، فشل، اتقرا).', 'Build a «campaign engine»: upload a list → clean numbers → exclude unsubscribed → an outbox with variables → a batch worker with quiet hours → pause/resume → a report (sent, failed, read).'),
      quiz: [
        Q(B('ليه طابور بدل loop للحملة؟', 'Why a queue instead of a loop for a campaign?'), [['توقف وتكمّل وتحترم الحدود', 'pause, resume and respect limits'], ['أسرع', 'faster'], ['أرخص', 'cheaper']], 0, B('تحكم كامل.', 'Full control.')),
        Q(B('متغيّر الاسم فاضي:', 'The name variable is empty:'), [['قيمة بديلة', 'use a fallback'], ['ابعت فاضي', 'send it empty'], ['الغي الحملة', 'cancel the campaign']], 0, B('«عميلنا العزيز».', '«Dear customer».')),
        Q(B('رسالة تسويق الساعة 11 بالليل:', 'A marketing message at 11 p.m.:'), [['تتأجل للصبح', 'postpone to the morning'], ['تتبعت', 'send it'], ['تتلغي', 'cancel it']], 0, B('quiet hours.', 'Quiet hours.'))
      ] },

    { title: B('الإيميل اللي بيوصل', 'Email that arrives'),
      goal: B('إيميلاتك توصل الـ inbox مش الـ spam.', 'Your emails reach the inbox, not spam.'),
      learn: [
        L(B('SPF وDKIM وDMARC', 'SPF, DKIM and DMARC'),
          B('تلات سجلات DNS بتثبت إن الإيميل جاي منك فعلًا: **SPF** (مين مسموحله يبعت باسم الدومين)، **DKIM** (توقيع على كل إيميل)، **DMARC** (يعمل إيه السيرفر لو الفحص فشل، ويبعتلك تقارير). من غيرهم، Gmail وYahoo بيرفضوا أو يحطوا في spam، خصوصًا للإرسال الكبير.', 'Three DNS records prove an email really comes from you: **SPF** (who may send for the domain), **DKIM** (a signature on each email), **DMARC** (what servers do if the checks fail, and reports to you). Without them, Gmail and Yahoo reject or spam your mail, especially bulk sending.'),
          'TXT @       "v=spf1 include:_spf.provider.com ~all"\nTXT s1._domainkey  "v=DKIM1; k=rsa; p=MIGf…"\nTXT _dmarc  "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"'),
        L(B('خدمة إرسال مناسبة', 'The right sending service'),
          B('Gmail الشخصي للإرسال الكبير = حظر. استخدم خدمة إرسال (Amazon SES، Postmark، Mailgun، Brevo…): واحدة للإيميلات **transactional** (فاتورة، تأكيد، كلمة سر) وإعداد أو خدمة منفصلة للتسويق، عشان سمعة التسويق متأثرش على الفواتير.', 'Personal Gmail for bulk sending = blocked. Use a sending service (Amazon SES, Postmark, Mailgun, Brevo…): one for **transactional** email (invoices, confirmations, passwords) and a separate setup or service for marketing, so marketing reputation does not hurt your invoices.'),
          'transactional: billing@yourdomain.com via provider A (dedicated stream)\nmarketing:     news@mail.yourdomain.com via provider B (separate subdomain)'),
        L(B('الارتداد وإلغاء الاشتراك بضغطة', 'Bounces and one-click unsubscribe'),
          B('**hard bounce** (العنوان مش موجود): شيله فورًا ومتبعتلوش تاني. **soft bounce** (الصندوق مليان): أعد بعدين ولو تكرر شيله. وللإيميلات التسويقية لازم رابط إلغاء اشتراك واضح وheader `List-Unsubscribe` بضغطة واحدة — Gmail وYahoo بيطلبوه للمرسلين الكبار.', 'A **hard bounce** (the address does not exist): remove it at once and never send again. A **soft bounce** (mailbox full): retry later, and remove it if it repeats. Marketing emails need a clear unsubscribe link and a one-click `List-Unsubscribe` header — Gmail and Yahoo require it for bulk senders.'),
          'List-Unsubscribe: <https://yourdomain.com/unsub?t=abc>, <mailto:unsub@yourdomain.com>\nList-Unsubscribe-Post: List-Unsubscribe=One-Click')
      ],
      practice: [
        B('افحص دومين (بتاعك أو مثال) بأداة DMARC/SPF checker.', 'Check a domain (yours or an example) with a DMARC/SPF checker.'),
        B('اعمل حساب في خدمة إرسال بنسخة تجريبية واربطها بـ n8n (SMTP أو نودها).', 'Open a trial account with a sending service and connect it to n8n (SMTP or its node).'),
        B('اعمل webhook للارتدادات يحط العناوين في suppression list.', 'Build a bounce webhook that puts addresses on a suppression list.'),
        B('ضيف رابط وheader إلغاء الاشتراك لإيميل تسويق.', 'Add an unsubscribe link and header to a marketing email.')
      ],
      words: [
        W('spf', 'سجل DNS بيحدد مين مسموحله يبعت باسم الدومين', 'a DNS record listing who may send for a domain', 'Add the provider to your SPF record.'),
        W('dkim', 'توقيع رقمي على كل إيميل بيثبت مصدره', 'a digital signature on each email proving its source', 'DKIM passed for every message.'),
        W('dmarc', 'سياسة بتقول تعمل إيه لو SPF/DKIM فشلوا', 'a policy saying what to do if SPF/DKIM fail', 'Start DMARC with p=none and reports.'),
        W('hard bounce', 'إيميل رجع لأن العنوان مش موجود', 'an email returned because the address does not exist', 'Remove an address after a hard bounce.'),
        W('one-click unsubscribe', 'إلغاء الاشتراك بضغطة واحدة', 'unsubscribing with a single click', 'Bulk senders must offer one-click unsubscribe.')
      ],
      read: [{ t: 'Google: Email sender guidelines', url: 'https://support.google.com/mail/answer/81126', what: B('اقرا متطلبات المرسلين الكبار.', 'Read the requirements for bulk senders.') }, { t: 'dmarc.org: Overview', url: 'https://dmarc.org/overview/', what: B('اقرا إزاي DMARC بيشتغل.', 'Read how DMARC works.') }],
      challenge: B('جهّز إرسال إيميل احترافي: دومين أو subdomain بـ SPF وDKIM وDMARC (أو خطة مكتوبة لو مفيش دومين)، خدمة إرسال، تيار transactional منفصل، معالجة الارتدادات، وإلغاء اشتراك بضغطة.', 'Prepare professional email sending: a domain or subdomain with SPF, DKIM and DMARC (or a written plan if you have no domain), a sending service, a separate transactional stream, bounce handling, and one-click unsubscribe.'),
      quiz: [
        Q(B('DKIM هو:', 'DKIM is:'), [['توقيع على الإيميل', 'a signature on the email'], ['قايمة مرسلين', 'a list of senders'], ['سياسة الرفض', 'the rejection policy']], 0, B('بيثبت المصدر.', 'It proves the source.')),
        Q(B('hard bounce:', 'A hard bounce:'), [['شيل العنوان فورًا', 'remove the address at once'], ['أعد بكرة', 'retry tomorrow'], ['تجاهل', 'ignore it']], 0, B('العنوان مش موجود.', 'The address does not exist.')),
        Q(B('ليه نفصل التسويق عن الفواتير؟', 'Why separate marketing from invoices?'), [['سمعة التسويق متأثرش على الفواتير', 'so marketing reputation does not hurt invoices'], ['أرخص', 'cheaper'], ['أسرع', 'faster']], 0, B('الفواتير لازم توصل.', 'Invoices must arrive.'))
      ] },

    { title: B('الرسايل الواردة وحالاتها', 'Incoming messages and statuses'),
      goal: B('ترد على العملاء بنظام، وتعرف كل رسالة حصلها إيه.', 'Reply to customers systematically, and know what happened to every message.'),
      learn: [
        L(B('webhook الرسايل والحالات', 'The messages and statuses webhook'),
          B('واتساب بيبعت لنفس الـ webhook نوعين: **messages** (رسالة جديدة من عميل: نص، صورة، صوت، زر) و**statuses** (رسالتك: sent ← delivered ← read، أو failed مع سبب). افصلهم في أول خطوة. وحدّث حالة كل رسالة في outbox بالـ message id.', 'WhatsApp sends two kinds to the same webhook: **messages** (a new customer message: text, image, voice, a button) and **statuses** (your message: sent → delivered → read, or failed with a reason). Separate them in the first step. Update each message’s status in the outbox by message id.'),
          'WhatsApp Trigger → IF entry.changes[0].value.statuses\n  statuses → UPDATE outbox SET status = s.status WHERE wa_id = s.id\n  messages → handle incoming'),
        L(B('حالة المحادثة', 'Conversation state'),
          B('المحادثة الآلية محتاجة **ذاكرة صغيرة**: العميل في أنهي خطوة؟ (اختار خدمة ← اختار يوم ← تأكيد). خزّن `conversation(phone, step, data, updated_at)` واقراها مع كل رسالة. لو عدّى وقت طويل، ابدأ من الأول.', 'An automated conversation needs a **small memory**: which step is the customer at? (choose service → choose day → confirm). Store `conversation(phone, step, data, updated_at)` and read it on each message. If a long time passed, start over.'),
          'step: choose_service → reply "1) Cleaning 2) Whitening"\nstep: choose_day → reply available days\nstep: confirm → book + clear state'),
        L(B('التحويل لإنسان', 'Handing over to a person'),
          B('لما العميل يكتب «عايز أكلم حد» أو الـ AI مش واثق أو المحادثة زعلانة: **human handoff** — وقّف الرد الآلي للرقم ده (flag في الـ conversation)، وابعت للفريق رابط المحادثة، ولما الموظف يخلص يرجّع الآلي. ومتسيبش العميل من غير رد: «هيكلمك زميل خلال 15 دقيقة».', 'When the customer writes «I want to talk to someone», or the AI is unsure, or the conversation is upset: a **human handoff** — stop auto-replies for this number (a flag on the conversation), send the team a link to the chat, and when the agent finishes, turn automation back on. Never leave the customer without a reply: «a colleague will talk to you within 15 minutes».'),
          'IF intent = human OR sentiment = angry → conversation.bot_paused = true\n→ team alert with chat link → auto reply "a colleague will reply within 15 min"')
      ],
      practice: [
        B('افصل messages عن statuses في webhook واتساب.', 'Separate messages from statuses in the WhatsApp webhook.'),
        B('حدّث حالة الرسايل في outbox واحسب نسبة القراءة.', 'Update message statuses in the outbox and compute the read rate.'),
        B('ابني محادثة حجز من 3 خطوات بجدول conversation.', 'Build a 3-step booking conversation with a conversation table.'),
        B('ضيف تحويل لإنسان بكلمة «موظف».', 'Add a handoff to a person on the word «agent».')
      ],
      words: [
        W('delivery status', 'حالة الرسالة: اتبعتت، وصلت، اتقرت، فشلت', 'a message’s state: sent, delivered, read, failed', 'Store each delivery status by message id.'),
        W('read receipt', 'إشعار إن الرسالة اتقرت', 'a notice that a message was read', 'Read receipts give the read rate.'),
        W('conversation state', 'الخطوة اللي المحادثة الآلية واقفة فيها', 'the step an automated conversation is at', 'Save the conversation state per phone.'),
        W('human handoff', 'تحويل المحادثة من الآلي لإنسان', 'passing a conversation from the bot to a person', 'Trigger a human handoff when the customer is angry.'),
        W('bot pause', 'إيقاف الرد الآلي لرقم معيّن مؤقتًا', 'temporarily stopping auto-replies for one number', 'Set a bot pause while the agent replies.')
      ],
      read: [{ t: 'Meta: WhatsApp Cloud API webhooks', url: 'https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages', what: B('اقرا شكل messages وstatuses.', 'Read the shape of messages and statuses.') }, 'lib:n8n Docs: WhatsApp Business Cloud'],
      challenge: B('ابني «موظف استقبال واتساب»: محادثة حجز بحالة، فهم «موظف/عايز حد» وتحويل لإنسان مع إيقاف البوت، تسجيل حالات كل الرسايل، وتقرير يومي (رسايل، تحويلات، نسبة قراءة).', 'Build a «WhatsApp receptionist»: a booking conversation with state, understanding «agent/I want someone» and handing over with the bot paused, logging every message status, and a daily report (messages, handoffs, read rate).'),
      quiz: [
        Q(B('statuses في webhook واتساب بتقول:', 'statuses in the WhatsApp webhook tell you:'), [['حصل إيه لرسالتك', 'what happened to your message'], ['رسالة جديدة من عميل', 'a new customer message'], ['سعر الرسالة', 'the message price']], 0, B('sent/delivered/read/failed.', 'sent/delivered/read/failed.')),
        Q(B('المحادثة الآلية محتاجة تفتكر:', 'An automated conversation must remember:'), [['الخطوة الحالية والبيانات', 'the current step and data'], ['كل الرسايل للأبد', 'every message forever'], ['ولا حاجة', 'nothing']], 0, B('جدول conversation.', 'A conversation table.')),
        Q(B('وقت التحويل لإنسان:', 'During a human handoff:'), [['إيقاف البوت للرقم ورد «هيكلمك زميل»', 'pause the bot for that number and reply «a colleague will answer»'], ['البوت يكمّل', 'the bot continues'], ['تجاهل العميل', 'ignore the customer']], 0, B('من غير رد مزدوج.', 'No double replies.'))
      ] },

    { title: B('الموافقة والقانون وإلغاء الاشتراك', 'Consent, the law and unsubscribing'),
      goal: B('تبعت للي وافق بس، وتحترم أي حد عايز يوقف.', 'Message only people who agreed, and respect anyone who wants to stop.'),
      learn: [
        L(B('سجل الموافقة', 'The consent record'),
          B('قبل أي رسالة تسويقية لازم **opt-in** واضح: خانة في الفورم (مش متعلّمة مسبقًا)، أو رسالة من العميل بيطلب. خزّن: مين، وافق على إيه، إمتى، ومنين (الفورم، النص اللي شافه). ده دليلك لو حد اشتكى.', 'Before any marketing message you need a clear **opt-in**: a form checkbox (not pre-ticked), or a message from the customer asking. Store: who, agreed to what, when, and from where (the form, the text they saw). This is your proof if someone complains.'),
          'consent(phone, channel, purpose, granted_at, source, text_shown)\n("01012345678", "whatsapp", "offers", "2026-10-03 14:20", "booking form", "I agree to receive offers")'),
        L(B('كلمات الإيقاف والـ suppression list', 'Stop words and the suppression list'),
          B('لو العميل كتب «stop» أو «إلغاء» أو «مش عايز»، شيله **فورًا** من التسويق وضيفه لـ **suppression list**، ورد بتأكيد قصير. والـ outbox قبل أي إرسال يقارن بالقايمة دي. الرسايل الـ transactional (فاتورته، معاده) ممكن تكمّل لأنها جزء من خدمته.', 'If a customer writes «stop», «إلغاء» or «not interested», remove them from marketing **at once** and add them to the **suppression list**, with a short confirmation. The outbox checks this list before every send. Transactional messages (their invoice, their appointment) may continue because they are part of the service.'),
          "IF /^(stop|unsubscribe|إلغاء|الغاء|مش عايز)/i.test(text)\n→ INSERT suppression(phone, channel, at) → reply \"تم إلغاء الاشتراك ✅\"\noutbox worker: skip WHERE phone IN suppression AND purpose = 'marketing'"),
        L(B('حدود التكرار والقانون', 'Frequency caps and the law'),
          B('**frequency cap**: مثلًا رسالتين تسويق في الأسبوع بالكتير لنفس الشخص. وقوانين حماية البيانات (زي قانون حماية البيانات الشخصية المصري 151 لسنة 2020، وGDPR في أوروبا) بتطلب موافقة واضحة، والحق في المسح، وحماية البيانات. لو شغلك فيه بيانات كتير، استشير مختص قانوني.', 'A **frequency cap**: for example at most two marketing messages a week to the same person. Data protection laws (such as Egypt’s Personal Data Protection Law No. 151 of 2020, and the GDPR in Europe) require clear consent, the right to deletion, and protection of the data. If your work involves a lot of data, consult a legal specialist.'),
          'frequency cap: marketing ≤ 2 / person / 7 days\nright to erasure: "delete my data" → remove from CRM, outbox, logs (keep only what law requires)')
      ],
      practice: [
        B('ضيف خانة موافقة (مش متعلّمة) لفورم وسجّل الموافقات.', 'Add an (unticked) consent checkbox to a form and record consents.'),
        B('اعمل كاشف كلمات الإيقاف بالعربي والإنجليزي.', 'Build a stop-word detector in Arabic and English.'),
        B('خلّي الـ outbox يتخطى الـ suppression list.', 'Make the outbox skip the suppression list.'),
        B('ضيف frequency cap وجرّبه.', 'Add a frequency cap and test it.')
      ],
      words: [
        W('opt-in', 'موافقة صريحة على استلام الرسايل', 'explicit agreement to receive messages', 'Store every opt-in with its date.'),
        W('opt-out', 'طلب إيقاف الرسايل', 'a request to stop messages', 'Honour an opt-out immediately.'),
        W('suppression list', 'قايمة ممنوع الإرسال ليها', 'a list of people you must not message', 'Check the suppression list before sending.'),
        W('consent record', 'سجل بيثبت مين وافق على إيه وإمتى', 'a record proving who agreed to what and when', 'Keep the consent record for each customer.'),
        W('frequency cap', 'حد أقصى لعدد الرسايل لنفس الشخص', 'a maximum number of messages to the same person', 'The frequency cap is two per week.')
      ],
      read: ['lib:GDPR summary (gdpr.eu)', { t: 'Meta: WhatsApp Business Messaging Policy', url: 'https://whatsappbusiness.com/policy/', what: B('اقرا جزء الموافقة (opt-in).', 'Read the consent (opt-in) part.') }],
      challenge: B('خلّي محرك الحملات «ملتزم»: موافقات مسجّلة بنص الموافقة، كلمات إيقاف بلغتين، suppression list، frequency cap، فصل transactional عن marketing، وworkflow «امسح بياناتي».', 'Make the campaign engine «compliant»: recorded consents with the consent text, stop words in two languages, a suppression list, a frequency cap, transactional separated from marketing, and a «delete my data» workflow.'),
      quiz: [
        Q(B('خانة الموافقة في الفورم:', 'The consent checkbox on the form:'), [['مش متعلّمة مسبقًا', 'not pre-ticked'], ['متعلّمة مسبقًا', 'pre-ticked'], ['مخفية', 'hidden']], 0, B('موافقة صريحة.', 'Explicit consent.')),
        Q(B('العميل كتب «إلغاء»:', 'The customer wrote «إلغاء» (cancel):'), [['شيله من التسويق فورًا وأكّد', 'remove from marketing at once and confirm'], ['ابعتله عرض أخير', 'send a last offer'], ['تجاهل', 'ignore']], 0, B('احترم طلبه.', 'Respect the request.')),
        Q(B('رسالة فاتورة لعميل ألغى التسويق:', 'An invoice message to someone who unsubscribed from marketing:'), [['مسموحة (transactional)', 'allowed (transactional)'], ['ممنوعة', 'forbidden'], ['مش مهم', 'irrelevant']], 0, B('جزء من الخدمة.', 'Part of the service.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('منصة رسايل محترمة وآمنة على نطاق كبير.', 'A respectful, safe messaging platform at scale.'),
      review: [
        B('WhatsApp Cloud API: القوالب ونافذة الـ 24 ساعة والجودة والحدود.', 'The WhatsApp Cloud API: templates, the 24-hour window, quality and limits.'),
        B('الإرسال بطابور outbox ودفعات وتخصيص وquiet hours.', 'Sending with an outbox queue, batches, personalisation and quiet hours.'),
        B('الإيميل: SPF وDKIM وDMARC، خدمة إرسال، الارتدادات، وإلغاء بضغطة.', 'Email: SPF, DKIM and DMARC, a sending service, bounces, and one-click unsubscribe.'),
        B('الرسايل الواردة، الحالات، حالة المحادثة، والتحويل لإنسان.', 'Incoming messages, statuses, conversation state, and handing over to a person.'),
        B('الموافقة، كلمات الإيقاف، suppression list، frequency cap والقانون.', 'Consent, stop words, the suppression list, frequency caps and the law.')
      ],
      project: B('ابني «منصة رسايل» لعيادة أو متجر: تذكيرات بقوالب واتساب، حملة شهرية بطابور ودفعات وquiet hours، إيميل transactional موثّق، webhook للحالات والرسايل الواردة، محادثة حجز بحالة وتحويل لإنسان، وموافقات وإلغاء اشتراك وfrequency cap، وتقرير أسبوعي. استخدم أرقام وإيميلات اختبار بس.', 'Build a «messaging platform» for a clinic or shop: reminders with WhatsApp templates, a monthly campaign with a queue, batches and quiet hours, authenticated transactional email, a webhook for statuses and incoming messages, a booking conversation with state and human handoff, and consent, unsubscribing and a frequency cap, plus a weekly report. Use test numbers and emails only.'),
      test: [
        Q(B('نافذة خدمة العملاء في واتساب:', 'The WhatsApp customer service window:'), [['24 ساعة بعد رسالة العميل', '24 hours after the customer’s message'], ['أسبوع', 'a week'], ['مفيش', 'none']], 0, B('بعدها قالب.', 'After it, a template.')),
        Q(B('قالب تأكيد حجز نوعه غالبًا:', 'A booking confirmation template is usually:'), [['utility', 'utility'], ['marketing', 'marketing'], ['authentication', 'authentication']], 0, B('خدمة مش عرض.', 'Service, not an offer.')),
        Q(B('جودة الرقم بتقل بسبب:', 'Number quality drops because of:'), [['بلوك وبلاغات كتير', 'many blocks and reports'], ['رسايل قليلة', 'few messages'], ['القوالب', 'templates']], 0, B('ابعت للمهتم بس.', 'Message only interested people.')),
        Q(B('الحملة الكبيرة بتتبعت عن طريق:', 'A big campaign is sent through:'), [['outbox وعامل بدفعات', 'an outbox and a batch worker'], ['loop واحد', 'one loop'], ['يدوي', 'by hand']], 0, B('تحكم وحدود.', 'Control and limits.')),
        Q(B('quiet hours بتأجل الرسايل:', 'Quiet hours postpone messages:'), [['لوقت مناسب بتوقيت العميل', 'to a suitable time in the customer’s zone'], ['للأبد', 'forever'], ['لثانية', 'by a second']], 0, B('مثلًا 9 الصبح.', 'For example 9 a.m.')),
        Q(B('SPF بيحدد:', 'SPF defines:'), [['مين مسموحله يبعت باسم الدومين', 'who may send for the domain'], ['محتوى الإيميل', 'the email content'], ['سرعة الإرسال', 'sending speed']], 0, B('سجل DNS.', 'A DNS record.')),
        Q(B('soft bounce متكرر:', 'A repeated soft bounce:'), [['شيل العنوان', 'remove the address'], ['ابعت أكتر', 'send more'], ['غيّر الموضوع', 'change the subject']], 0, B('بعد محاولات.', 'After some tries.')),
        Q(B('List-Unsubscribe header لـ:', 'The List-Unsubscribe header is for:'), [['إلغاء اشتراك بضغطة', 'one-click unsubscribing'], ['التوقيع', 'signing'], ['المرفقات', 'attachments']], 0, B('مطلوب للمرسلين الكبار.', 'Required for bulk senders.')),
        Q(B('statuses: failed معناها:', 'statuses: failed means:'), [['رسالتك موصلتش (ومعاها سبب)', 'your message did not arrive (with a reason)'], ['العميل رد', 'the customer replied'], ['اتقرت', 'it was read']], 0, B('سجّل السبب.', 'Record the reason.')),
        Q(B('human handoff بيشمل:', 'A human handoff includes:'), [['إيقاف البوت للرقم وتنبيه الفريق', 'pausing the bot for the number and alerting the team'], ['مسح المحادثة', 'deleting the chat'], ['حظر العميل', 'blocking the customer']], 0, B('ورد للعميل.', 'And a reply to the customer.')),
        Q(B('suppression list بتتشاف:', 'The suppression list is checked:'), [['قبل كل إرسال تسويقي', 'before every marketing send'], ['مرة في السنة', 'once a year'], ['بعد الإرسال', 'after sending']], 0, B('عشان متبعتش لملغي.', 'So you never message an opt-out.')),
        Q(B('frequency cap:', 'A frequency cap:'), [['حد لعدد الرسايل لنفس الشخص', 'a limit on messages to the same person'], ['حد السرعة', 'a speed limit'], ['حد الحجم', 'a size limit']], 0, B('مثلًا 2 في الأسبوع.', 'For example 2 a week.'))
      ] }
  ]
};
