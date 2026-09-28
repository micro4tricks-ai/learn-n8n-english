// n8n week 5 — Google Sheets, Gmail and Telegram in depth.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('Google Sheets وGmail وTelegram بعمق', 'Google Sheets, Gmail and Telegram in depth'),
  goal: B('تستخدم الأدوات التلاتة اللي أغلب العملاء بيطلبوها باحتراف: تقرا وتكتب وتحدّث في Sheets من غير تكرار، وتبعت إيميلات HTML بمرفقات وتقرا الوارد، وتعمل بوت Telegram بأزرار وأوامر.',
          'Use the three tools most clients ask for like a pro: read, write and update Google Sheets without duplicates, send HTML emails with attachments and read incoming mail, and build a Telegram bot with buttons and commands.'),
  days: [
    { title: B('Google Sheets كقاعدة بيانات صغيرة', 'Google Sheets as a small database'),
      goal: B('تصمم شيت ينفع للأتمتة وتقرا منه بفلاتر وتكتب فيه صح.', 'Design a sheet that works for automation, read it with filters and write to it correctly.'),
      learn: [
        { h: B('شكل الشيت الصح', 'The right sheet shape'),
          p: B('صف أول فيه أسماء الأعمدة (بالإنجليزي من غير مسافات غريبة)، وكل صف = سجل واحد، وعمود ID فريد، ومفيش خانات مدموجة ولا صفوف فاضية في النص. ده بيخلّي n8n يقرا كل صف كـ item.', 'A first row with column names (plain English, no odd spaces), one record per row, a unique ID column, and no merged cells or blank rows in the middle. Then n8n reads each row as an item.'),
          ex: 'id | name | email | status | created_at\n1  | Ali  | a@x.com | new | 2026-09-28' },
        { h: B('القراءة بفلتر', 'Reading with filters'),
          p: B('Get Row(s) فيه Filters: تجيب الصفوف اللي status = new بس بدل الشيت كله. وأسرع كمان لو الشيت كبير.', 'Get Row(s) has Filters: fetch only rows where status = new instead of the whole sheet. It\'s faster on big sheets too.'),
          ex: 'Operation: Get Row(s) → Filters: status = "new"' },
        { h: B('Update ولا Append ولا Upsert', 'Update, Append or Upsert'),
          p: B('Append = صف جديد دايمًا. Update = يعدّل صف موجود بعمود مطابقة (Column to match on). Append or Update = لو موجود يعدّله، لو لأ يضيفه — ده اللي بيمنع التكرار.', 'Append = always a new row. Update = change an existing row by a match column (Column to match on). Append or Update = update if it exists, add if not — this is what prevents duplicates.'),
          ex: 'Append or Update → Column to match on: email' }
      ],
      practice: [
        B('صمم شيت «Leads» بـ 6 أعمدة بالقواعد.', 'Design a "Leads" sheet with 6 columns following the rules.'),
        B('اقرا الصفوف اللي status = new بس بـ Filter.', 'Read only rows with status = new using a filter.'),
        B('حدّث status لـ contacted لكل صف اتعالج بـ Update وعمود id.', 'Set status to contacted for each processed row with Update and the id column.'),
        B('ضيف نفس الـ lead مرتين بـ Append or Update واتأكد إنه صف واحد.', 'Add the same lead twice with Append or Update and check it stays one row.')
      ],
      words: [
        { t: 'header row', m: B('أول صف فيه أسماء الأعمدة', 'the first row, with the column names'), ex: 'n8n uses the header row as field names.' },
        { t: 'Column to match on', m: B('العمود اللي n8n بيدوّر بيه على الصف عشان يحدّثه', 'the column n8n uses to find the row to update'), ex: 'Match on: email' },
        { t: 'Get Row(s)', m: B('عملية قراءة صفوف من الشيت، بفلاتر اختيارية', 'the operation that reads rows from a sheet, with optional filters'), ex: 'Get Row(s) → Filters: status = new' },
        { t: 'row_number', m: B('رقم الصف اللي n8n بيرجّعه مع كل صف', 'the row number n8n returns with each row'), ex: 'Use it to update the same row later.' },
        { t: 'spreadsheet ID', m: B('الكود الطويل في لينك الشيت اللي بيحدده', 'the long code in the sheet URL that identifies it'), ex: 'docs.google.com/spreadsheets/d/<ID>/edit' }],
      read: ['lib:n8n Docs: Google Sheets node', 'lib:n8n Docs: Google credentials'],
      challenge: B('اعمل «mini CRM» في Sheets: فورم بيضيف leads من غير تكرار، وworkflow كل ساعة بيبعت الجديد ويحدّث status.', 'Build a "mini CRM" in Sheets: a form adds leads without duplicates, and an hourly workflow sends the new ones and updates their status.'),
      quiz: [
        { q: B('عشان متضيفش نفس العميل مرتين:', 'To avoid adding the same client twice:'), o: ['Append or Update', 'Append', 'Clear'], a: 0, why: B('بيحدّث لو موجود.', 'It updates when the row exists.') },
        { q: B('ليه عمود id فريد مهم؟', 'Why does a unique id column matter?'), o: [B('عشان تحدّث الصف الصح', 'to update the right row'), B('للشكل', 'for looks'), B('مش مهم', 'it doesn\'t')], a: 0, why: B('المطابقة بتحتاج قيمة فريدة.', 'Matching needs a unique value.') },
        { q: B('خانات مدموجة في الشيت:', 'Merged cells in the sheet:'), o: [B('بتلخبط القراءة، ابعد عنها', 'confuse reading; avoid them'), B('ممتازة', 'are great'), B('مطلوبة', 'are required')], a: 0, why: B('كل صف لازم سجل واضح.', 'Each row must be a clear record.') }
      ] },

    { title: B('Gmail: إرسال احترافي', 'Gmail: sending like a pro'),
      goal: B('تبعت إيميلات HTML منسقة، بمرفقات، ولأكتر من مستلم، من غير ما تقع في السبام.', 'Send formatted HTML emails with attachments to several recipients without landing in spam.'),
      learn: [
        { h: B('HTML في الإيميل', 'HTML in email'),
          p: B('Gmail node بيقبل HTML في الـ Message: `<b>`، `<p>`، `<a href>`، جداول بسيطة. خليه بسيط؛ برامج الإيميل مش بتدعم CSS كتير. وحط نسخة نص للي مش بيعرض HTML.', 'The Gmail node accepts HTML in the Message: `<b>`, `<p>`, `<a href>`, simple tables. Keep it simple; email clients support little CSS. Add a plain-text version for those that don\'t show HTML.'),
          ex: '<p>Hi {{ $json.name }},</p>\n<p>Your invoice <b>#{{ $json.id }}</b> is due on {{ $json.due }}.</p>' },
        { h: B('المرفقات', 'Attachments'),
          p: B('المرفق لازم يكون binary data في الـ item (من Convert to File أو HTTP Request أو Read file). وفي Gmail: Options ← Attachments ← اسم الـ binary property (غالبًا data).', 'An attachment must be binary data on the item (from Convert to File, HTTP Request or a file read). In Gmail: Options → Attachments → the binary property name (usually data).'),
          ex: 'Convert to File (CSV) → Gmail: Attachments = data' },
        { h: B('متتحسبش سبام', 'Staying out of spam'),
          p: B('متبعتش مئات الإيميلات مرة واحدة من حساب شخصي (فيه حدود يومية)، وحط Wait بين الرسايل، وSubject واضح، ومتستخدمش كلمات زي FREE!!!. وللإرسال الكبير استخدم خدمة إيميل مخصصة.', 'Don\'t send hundreds of emails at once from a personal account (there are daily limits), add a Wait between messages, use a clear subject, and avoid words like FREE!!!. For bulk sending use a dedicated email service.'),
          ex: 'Loop Over Items (batch 10) → Gmail → Wait 5s' }
      ],
      practice: [
        B('ابعت إيميل HTML فيه اسم العميل ورقم الفاتورة ولينك.', 'Send an HTML email with the client\'s name, the invoice number and a link.'),
        B('اعمل CSV بـ Convert to File وابعته كمرفق.', 'Create a CSV with Convert to File and send it as an attachment.'),
        B('ابعت لـ 5 مستلمين من شيت، بـ Wait بين كل واحد.', 'Send to 5 recipients from a sheet, with a Wait between each.'),
        B('اختبر شكل الإيميل على الموبايل والكمبيوتر.', 'Check how the email looks on mobile and desktop.')
      ],
      words: ['binary data', 'Convert to File',
        { t: 'binary property', m: B('اسم المكان اللي الملف متخزن فيه جوه الـ item (غالبًا data)', 'the name under which a file is stored on the item (usually data)'), ex: 'Attachments: data' },
        { t: 'HTML email', m: B('إيميل متنسق بـ HTML (خط تقيل، لينكات، جداول)', 'an email formatted with HTML (bold, links, tables)'), ex: '<p>Hi <b>Ali</b></p>' },
        { t: 'sending limit', m: B('أقصى عدد إيميلات مسموح في اليوم من الحساب', 'the maximum number of emails an account may send per day'), ex: 'Personal Gmail accounts have daily limits.' }],
      read: ['lib:n8n Docs: Gmail node', { lib: 'MDN: Structuring content with HTML', what: B('اقرا عن paragraphs وlinks وtables بس.', 'Read only about paragraphs, links and tables.') }],
      challenge: B('اعمل «monthly report email»: أول كل شهر، جدول HTML بأهم الأرقام + CSV مرفق، لـ 3 مستلمين.', 'Build a "monthly report email": on the first of each month, an HTML table of key numbers plus an attached CSV, to 3 recipients.'),
      quiz: [
        { q: B('المرفق في Gmail node لازم يكون:', 'An attachment in the Gmail node must be:'), o: [B('binary data على الـ item', 'binary data on the item'), B('لينك بس', 'just a link'), B('نص JSON', 'JSON text')], a: 0, why: B('وبتكتب اسم الـ binary property.', 'You enter the binary property name.') },
        { q: B('عشان تبعت 300 إيميل من حساب شخصي:', 'To send 300 emails from a personal account:'), o: [B('مش فكرة كويسة؛ استخدم خدمة إيميل', 'not a good idea; use an email service'), B('مرة واحدة', 'all at once'), B('من غير Subject', 'without a subject')], a: 0, why: B('حدود يومية وخطر السبام.', 'Daily limits and spam risk.') },
        { q: B('الـ CSS في الإيميل:', 'CSS in email:'), o: [B('خليه بسيط؛ الدعم محدود', 'keep it simple; support is limited'), B('زي أي موقع', 'works like any website'), B('ممنوع خالص', 'is forbidden')], a: 0, why: B('برامج الإيميل مختلفة.', 'Email clients differ.') }
      ] },

    { title: B('Gmail: قراءة الوارد', 'Gmail: reading incoming mail'),
      goal: B('تقرا الإيميلات الواردة، وتطلّع منها بيانات ومرفقات، وتعلّمها بـ labels.', 'Read incoming emails, extract data and attachments from them, and mark them with labels.'),
      learn: [
        { h: B('Gmail Trigger والبحث', 'Gmail Trigger and search'),
          p: B('استخدم Filters: search زي `from:billing@ has:attachment` أو label. وخلي Simplify شغال عشان تاخد subject وfrom والنص بشكل سهل.', 'Use Filters: a search such as `from:billing@ has:attachment`, or a label. Keep Simplify on to get subject, from and text easily.'),
          ex: 'Gmail Trigger → Filters: label "invoices", Download Attachments: on' },
        { h: B('المرفقات الواردة', 'Incoming attachments'),
          p: B('فعّل Download Attachments؛ هتلاقي الملفات في binary (attachment_0، attachment_1…). وبعدين Extract From File لو PDF أو CSV.', 'Turn on Download Attachments; files appear in binary (attachment_0, attachment_1…). Then use Extract From File for a PDF or CSV.'),
          ex: 'Gmail Trigger → Extract From File (PDF, attachment_0) → …' },
        { h: B('labels بعد المعالجة', 'Labels after processing'),
          p: B('بعد ما تعالج الإيميل، ضيفله label «processed» أو شيله من الوارد عشان متعالجوش تاني وعشان العميل يشوف إيه اتعمل.', 'After processing an email, add a "processed" label or archive it so you don\'t handle it twice and the client can see what was done.'),
          ex: 'Gmail: Add Label → processed' }
      ],
      practice: [
        B('اعمل label في Gmail وtrigger بيقرا الإيميلات اللي عليها بس.', 'Create a Gmail label and a trigger that reads only emails with it.'),
        B('نزّل مرفق PDF من إيميل واقرا النص بـ Extract From File.', 'Download a PDF attachment from an email and read its text with Extract From File.'),
        B('طلّع من الإيميل: اسم المرسل، والموضوع، وأي رقم فاتورة بـ regex.', 'Extract the sender name, the subject and any invoice number (with a regex) from the email.'),
        B('ضيف label «processed» بعد المعالجة.', 'Add a "processed" label after processing.')
      ],
      words: ['Extract From File',
        { t: 'Simplify', m: B('خيار بيرجّع بيانات الإيميل الأساسية بشكل مختصر', 'an option that returns the main email fields in a compact shape'), ex: 'Turn Simplify off to get every header.' },
        { t: 'Download Attachments', m: B('خيار بينزّل مرفقات الإيميل كـ binary', 'an option that downloads email attachments as binary data'), ex: 'attachment_0, attachment_1…' },
        { t: 'label (Gmail)', m: B('تصنيف على الإيميل زي folder', 'a tag on an email, like a folder'), ex: 'Add the label "processed".' },
        { t: 'thread', m: B('سلسلة رسايل ورا بعض على نفس الموضوع', 'a chain of messages on the same topic'), ex: 'Reply in the same thread.' }],
      read: [{ lib: 'n8n Docs: Gmail node', what: B('اقرا عمليات Message وLabel وخيارات الـ trigger.', 'Read the Message and Label operations and the trigger options.') }],
      challenge: B('اعمل «invoice inbox»: أي إيميل عليه label invoices فيه PDF، يتقري ويتسجّل (المرسل، المبلغ لو ظاهر، التاريخ) في Sheet، ويتعلّم processed.', 'Build an "invoice inbox": any email labelled invoices with a PDF is read and logged (sender, amount if visible, date) to a sheet, then labelled processed.'),
      quiz: [
        { q: B('المرفقات الواردة بتوصل في:', 'Incoming attachments arrive in:'), o: [B('binary (attachment_0…)', 'binary (attachment_0…)'), B('الـ subject', 'the subject'), B('مش بتوصل', 'they don\'t')], a: 0, why: B('لما تفعّل Download Attachments.', 'When Download Attachments is on.') },
        { q: B('ليه تحط label بعد المعالجة؟', 'Why add a label after processing?'), o: [B('عشان متعالجوش تاني', 'so you don\'t process it again'), B('للألوان', 'for colours'), B('إجباري', 'it\'s mandatory')], a: 0, why: B('ولسهولة المتابعة.', 'And for easy tracking.') },
        { q: B('`from:billing@ has:attachment` ده:', '`from:billing@ has:attachment` is:'), o: [B('بحث Gmail', 'a Gmail search'), B('regex', 'a regex'), B('SQL', 'SQL')], a: 0, why: B('نفس بحث Gmail العادي.', 'The same syntax as Gmail search.') }
      ] },

    { title: B('بوت Telegram', 'The Telegram bot'),
      goal: B('تعمل بوت Telegram بيستقبل أوامر ويرد برسايل منسقة.', 'Build a Telegram bot that receives commands and replies with formatted messages.'),
      learn: [
        { h: B('البوت من BotFather', 'Creating the bot with BotFather'),
          p: B('في Telegram كلّم @BotFather ← /newbot ← خد الـ token وحطه في credential. الـ token زي الباسورد، متشاركوش.', 'In Telegram talk to @BotFather → /newbot → take the token and store it in a credential. The token is like a password; never share it.'),
          ex: 'Telegram Trigger (updates: message) → Switch on text → replies' },
        { h: B('الأوامر', 'Commands'),
          p: B('الرسالة اللي بتبدأ بـ / أمر: /start، /report، /help. في Switch: `{{ $json.message.text }}` starts with "/report". ورد على نفس الـ chat بـ `{{ $json.message.chat.id }}`.', 'A message that starts with / is a command: /start, /report, /help. In a Switch: `{{ $json.message.text }}` starts with "/report". Reply to the same chat with `{{ $json.message.chat.id }}`.'),
          ex: '/start  → welcome message\n/report → today\'s numbers\nanything else → /help' },
        { h: B('التنسيق', 'Formatting'),
          p: B('Parse Mode: HTML يخليك تستخدم <b> و<i> و<a> و<code>. وانتبه: الحروف < > & في البيانات لازم تتبدّل وإلا الرسالة تفشل.', 'Parse Mode: HTML lets you use <b>, <i>, <a> and <code>. Careful: < > & in the data must be escaped or the message fails.'),
          ex: '<b>Sales today</b>: {{ $json.total }} EGP\n<a href="{{ $json.url }}">Open report</a>' }
      ],
      practice: [
        B('اعمل بوت من BotFather ووصّله بـ Telegram Trigger.', 'Create a bot with BotFather and connect it to a Telegram Trigger.'),
        B('اعمل 3 أوامر: /start و/help وأمر بيجيب رقم من Sheet.', 'Add 3 commands: /start, /help, and one that fetches a number from a sheet.'),
        B('ابعت رسالة HTML فيها bold ولينك.', 'Send an HTML message with bold text and a link.'),
        B('خلّي البوت يرد بس على chat ID بتاعك (أمان).', 'Make the bot reply only to your own chat ID (security).')
      ],
      words: [
        { t: 'BotFather', m: B('بوت Telegram الرسمي اللي بيعمل البوتات ويدي الـ token', 'Telegram\'s official bot that creates bots and gives their token'), ex: '/newbot → token' },
        { t: 'bot token', m: B('المفتاح السري بتاع البوت', 'the bot\'s secret key'), ex: 'Store it in a Telegram credential.' },
        { t: 'bot command', m: B('رسالة بتبدأ بـ / بتطلب من البوت حاجة', 'a message starting with / that asks the bot to do something'), ex: '/report' },
        { t: 'chat.id', m: B('رقم المحادثة اللي البوت يرد عليها', 'the ID of the chat the bot replies to'), ex: '{{ $json.message.chat.id }}' },
        { t: 'escape (HTML)', m: B('تبدّل < > & عشان متتقريش كـ HTML', 'replace < > & so they aren\'t read as HTML'), ex: '& → &amp;' }],
      read: ['lib:n8n Docs: Telegram node'],
      challenge: B('اعمل «sales bot»: /today يجيب مبيعات النهارده من Sheet، و/week الأسبوع، و/top أعلى 3 منتجات، والبوت يرد لـ 2 chat IDs مسموحين بس.', 'Build a "sales bot": /today returns today\'s sales from a sheet, /week the week, /top the top 3 products, answering only 2 allowed chat IDs.'),
      quiz: [
        { q: B('الـ bot token بيتحط في:', 'The bot token goes in:'), o: [B('credential', 'a credential'), B('اسم الـ workflow', 'the workflow name'), B('رسالة', 'a message')], a: 0, why: B('سر زي الباسورد.', 'A secret like a password.') },
        { q: B('ترد على نفس المحادثة بـ:', 'Reply to the same chat with:'), o: ['{{ $json.message.chat.id }}', '{{ $json.bot }}', '{{ $now }}'], a: 0, why: B('chat.id بيحدد المحادثة.', 'chat.id identifies the chat.') },
        { q: B('الرسالة فشلت بسبب "<" في البيانات. الحل:', 'A message failed because of "<" in the data. The fix:'), o: [B('escape للحروف دي', 'escape these characters'), B('تمسح البوت', 'delete the bot'), B('تغيّر الـ token', 'change the token')], a: 0, why: B('Parse Mode HTML بيقرا < كـ tag.', 'HTML parse mode reads < as a tag.') }
      ] },

    { title: B('Telegram: أزرار وملفات', 'Telegram: buttons and files'),
      goal: B('تضيف أزرار inline وترد على الضغط عليها، وتبعت صور وملفات.', 'Add inline buttons, handle presses, and send photos and files.'),
      learn: [
        { h: B('Inline keyboard', 'Inline keyboards'),
          p: B('في Reply Markup اختار Inline Keyboard وضيف أزرار ليها callback data. لما حد يدوس، Telegram Trigger بيستقبل callback_query فيها الـ data.', 'In Reply Markup choose Inline Keyboard and add buttons with callback data. When someone presses one, the Telegram Trigger receives a callback_query with that data.'),
          ex: 'Buttons: [Approve → "approve_42"] [Reject → "reject_42"]\nTrigger updates: message, callback_query' },
        { h: B('موافقة بشرية', 'Human approval'),
          p: B('فكرة قوية: الـ workflow يبعت طلب بأزرار Approve/Reject، ولما الشخص يدوس، workflow تاني يكمّل حسب اختياره. في n8n فيه كمان Send and Wait for Response بيستنى الرد.', 'A powerful pattern: the workflow sends a request with Approve/Reject buttons, and when someone presses, another workflow continues based on the choice. n8n also has Send and Wait for Response, which waits for the answer.'),
          ex: 'New refund > 500 → Telegram buttons → Approve → issue refund' },
        { h: B('الملفات والصور', 'Files and photos'),
          p: B('Send Photo أو Send Document بياخدوا binary أو URL. مفيد للتقارير (PDF) والرسوم البيانية.', 'Send Photo or Send Document takes binary data or a URL. Useful for reports (PDF) and charts.'),
          ex: 'Convert to File (CSV) → Telegram: Send Document (binary: data)' }
      ],
      practice: [
        B('ابعت رسالة فيها زرارين Approve/Reject.', 'Send a message with two buttons, Approve and Reject.'),
        B('استقبل الضغط (callback_query) ورد بـ «Approved ✅».', 'Receive the press (callback_query) and reply "Approved ✅".'),
        B('ابعت CSV كملف على Telegram.', 'Send a CSV as a file on Telegram.'),
        B('جرّب Send and Wait for Response في workflow بسيط.', 'Try Send and Wait for Response in a simple workflow.')
      ],
      words: [
        { t: 'inline keyboard', m: B('أزرار تحت رسالة Telegram', 'buttons under a Telegram message'), ex: 'Approve / Reject' },
        { t: 'callback data', m: B('القيمة اللي بتتبعت لما حد يدوس زرار', 'the value sent when someone presses a button'), ex: 'approve_42' },
        { t: 'callback_query', m: B('نوع update بيوصل لما حد يدوس زرار inline', 'the update type received when someone presses an inline button'), ex: 'Trigger updates: callback_query' },
        { t: 'Send and Wait for Response', m: B('عملية بتبعت رسالة وتوقف الـ workflow لحد ما يجي رد', 'an operation that sends a message and pauses the workflow until a reply comes'), ex: 'Wait for approval before paying.' },
        { t: 'Send Document', m: B('عملية Telegram لإرسال ملف', 'the Telegram operation that sends a file'), ex: 'Send the monthly PDF.' }],
      read: ['lib:n8n Blog', { lib: 'n8n Workflow Templates', what: B('دوّر على «telegram approval» وحلل template.', 'Search for "telegram approval" and study a template.') }],
      challenge: B('اعمل «refund approval»: طلب استرداد أكبر من مبلغ معين يروح لمديرك على Telegram بزرارين، والقرار يتسجّل في Sheet ويتبعت للعميل إيميل حسبه.', 'Build "refund approval": a refund above a set amount goes to your manager on Telegram with two buttons; the decision is logged in a sheet and the customer gets an email accordingly.'),
      quiz: [
        { q: B('لما حد يدوس زرار inline، الـ trigger بيستقبل:', 'When someone presses an inline button, the trigger receives:'), o: ['callback_query', 'message', 'photo'], a: 0, why: B('لازم تفعّله في updates.', 'You must enable it in updates.') },
        { q: B('Send and Wait for Response مفيد لـ:', 'Send and Wait for Response is useful for:'), o: [B('موافقة بشرية قبل خطوة', 'human approval before a step'), B('تسريع الـ workflow', 'speeding up the workflow'), B('حذف رسايل', 'deleting messages')], a: 0, why: B('human in the loop.', 'human in the loop.') },
        { q: B('تبعت CSV على Telegram بـ:', 'You send a CSV on Telegram with:'), o: ['Send Document', 'Send Message', 'Send Location'], a: 0, why: B('ملف = document.', 'A file = a document.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 6 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 6 opens when you score 70% or more.'),
      review: [
        B('شكل الشيت الصح، وGet Row(s) بفلتر، وAppend or Update.', 'The right sheet shape, Get Row(s) with filters, and Append or Update.'),
        B('إيميل HTML ومرفقات binary وحدود الإرسال.', 'HTML email, binary attachments and sending limits.'),
        B('قراءة الوارد: search، attachments، labels.', 'Reading mail: search, attachments, labels.'),
        B('بوت Telegram: token، أوامر، chat.id، Parse Mode.', 'Telegram bots: token, commands, chat.id, parse mode.'),
        B('أزرار inline وcallback_query وSend and Wait.', 'Inline buttons, callback_query and Send and Wait.')
      ],
      project: B('ابني «نظام دعم عملاء صغير»: إيميلات الدعم (label support) بتتسجّل في Sheet من غير تكرار، وكل تذكرة جديدة توصلك على Telegram بزرارين (Assign to me / Close)، والقرار يحدّث الشيت، والعميل ياخد إيميل HTML بالحالة. ووثّقه بصورة للـ workflow وREADME.',
                 'Build a "small customer-support system": support emails (label support) are logged in a sheet without duplicates; each new ticket reaches you on Telegram with two buttons (Assign to me / Close); your choice updates the sheet; and the customer gets an HTML email with the status. Document it with a workflow screenshot and a README.'),
      test: [
        { q: B('Append or Update بيحتاج:', 'Append or Update needs:'), o: [B('عمود مطابقة', 'a column to match on'), B('Wait', 'a Wait'), B('Code node', 'a Code node')], a: 0, why: B('عشان يعرف الصف موجود ولا لأ.', 'To know whether the row exists.') },
        { q: B('تقرا الصفوف الجديدة بس بـ:', 'Read only new rows with:'), o: [B('Get Row(s) بفلتر status', 'Get Row(s) filtered on status'), B('قراءة كل الشيت وحذفه', 'read the whole sheet and delete it'), B('Clear', 'Clear')], a: 0, why: B('فلتر في المصدر.', 'Filter at the source.') },
        { q: B('الـ spreadsheet ID موجود في:', 'The spreadsheet ID is in:'), o: [B('لينك الشيت', 'the sheet URL'), B('اسم التاب', 'the tab name'), B('الـ credential', 'the credential')], a: 0, why: B('بعد /d/.', 'After /d/.') },
        { q: B('إيميل فيه مرفق CSV:', 'An email with a CSV attachment:'), o: ['Convert to File → Gmail (Attachments: data)', B('Gmail بنص بس', 'Gmail with text only'), 'Telegram'], a: 0, why: B('الملف binary الأول.', 'The file must be binary first.') },
        { q: B('المرفقات الواردة من Gmail Trigger اسمها غالبًا:', 'Incoming Gmail attachments are usually named:'), o: ['attachment_0', 'file.pdf only', 'data_in'], a: 0, why: B('attachment_0، attachment_1…', 'attachment_0, attachment_1…') },
        { q: B('ليه تحط Wait بين الإيميلات الكتير؟', 'Why add a Wait between many emails?'), o: [B('عشان الحدود والسبام', 'for limits and spam'), B('للشكل', 'for looks'), B('إجباري', 'it\'s required')], a: 0, why: B('إرسال أهدى.', 'Gentler sending.') },
        { q: B('الـ bot token بتاخده من:', 'You get a bot token from:'), o: ['@BotFather', 'Gmail', 'n8n Cloud'], a: 0, why: B('/newbot.', '/newbot.') },
        { q: B('أمر Telegram بيبدأ بـ:', 'A Telegram command starts with:'), o: ['/', '#', '@'], a: 0, why: B('/start، /help…', '/start, /help…') },
        { q: B('Parse Mode: HTML بيسمح بـ:', 'Parse Mode HTML allows:'), o: [B('<b> و<a> و<i>', '<b>, <a> and <i>'), B('CSS كامل', 'full CSS'), B('JavaScript', 'JavaScript')], a: 0, why: B('tags بسيطة.', 'Simple tags.') },
        { q: B('عشان البوت يرد عليك انت بس:', 'So the bot only answers you:'), o: [B('تتحقق من chat.id', 'check the chat.id'), B('تغيّر اسمه', 'rename it'), B('تمسح الأوامر', 'remove commands')], a: 0, why: B('IF على chat.id المسموح.', 'An IF on the allowed chat.id.') },
        { q: B('callback data هي:', 'Callback data is:'), o: [B('قيمة الزرار اللي اتضغط', 'the value of the pressed button'), B('صورة', 'an image'), B('باسورد', 'a password')], a: 0, why: B('بتعرف منها الاختيار.', 'It tells you the choice.') },
        { q: B('Send and Wait for Response بيعمل:', 'Send and Wait for Response:'), o: [B('يبعت ويستنى الرد قبل ما يكمّل', 'sends and waits for the reply before continuing'), B('يبعت بس', 'only sends'), B('يمسح الرسالة', 'deletes the message')], a: 0, why: B('human in the loop.', 'human in the loop.') }
      ] }
  ]
};
