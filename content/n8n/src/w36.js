// n8n week 36 — Voice, vision and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الصوت والصورة ومشروع الشهر', 'Voice, vision and the month project'),
  goal: B('توسّع أنظمتك لما بعد النص: تفهم الرسايل الصوتية، وترد بصوت، وتربط وكلاء بالتليفون، وتفهم الصور، وتولّد صور بأمان — وتختم الشهر بمساعد AI كامل.',
          'Extend your systems beyond text: understand voice notes, reply with voice, connect agents to the phone, understand images, and generate images safely — and finish the month with a complete AI assistant.'),
  days: [
    { title: B('من الصوت للنص', 'From speech to text'),
      goal: B('الرسايل الصوتية تتفهم وتدخل نفس مسار النص.', 'Voice notes are understood and enter the same path as text.'),
      learn: [
        L(B('مسار الرسالة الصوتية', 'The voice-note path'),
          B('في مصر الناس بتبعت **voice note** أكتر من النص. المسار: التريجر بيوصل فيه media id ← **media download** (Telegram: Get File، واتساب: Get Media URL ثم تنزيل بالتوكن) ← **transcription** بخدمة speech to text ← النص يدخل نفس الـ workflow بتاع الرسايل النصية.', 'In Egypt people send more **voice notes** than text. The path: the trigger carries a media id → **media download** (Telegram: Get File; WhatsApp: get the media URL then download with the token) → **transcription** with a speech-to-text service → the text enters the same workflow as text messages.'),
          'WhatsApp Trigger (type audio) → get media URL → HTTP download (binary)\n→ transcribe (audio → text) → same router as text messages'),
        L(B('اختيار خدمة التفريغ', 'Choosing a transcription service'),
          B('خدمات كتير (OpenAI audio، Groq Whisper، ElevenLabs، Google، Azure). جرّب على **رسايل حقيقية بلهجتك**: المصري والكلام السريع والضوضاء بيفرقوا جدًا بين الخدمات. قيس نسبة الكلمات الغلط والسعر لكل دقيقة.', 'There are many services (OpenAI audio, Groq Whisper, ElevenLabs, Google, Azure). Test on **real messages in your dialect**: Egyptian Arabic, fast speech and noise make big differences between services. Measure the word error rate and the price per minute.'),
          'test: 20 real voice notes · service A WER 12% $0.006/min · service B WER 19% $0.002/min'),
        L(B('الملفات الطويلة', 'Long files'),
          B('الخدمات ليها حد لحجم الملف أو مدته. للتسجيلات الطويلة (اجتماع ساعة) قسّمها **audio chunks** (مثلًا 10 دقايق) بأداة زي ffmpeg، فرّغ كل جزء، واجمع. وللاجتماعات، **diarization** (مين قال إيه) بيفرق في الملخص.', 'Services have limits on file size or length. For long recordings (an hour-long meeting) split into **audio chunks** (e.g. 10 minutes) with a tool like ffmpeg, transcribe each and join. For meetings, **diarization** (who said what) makes a big difference to the summary.'),
          'ffmpeg -i meeting.m4a -f segment -segment_time 600 -c copy part_%02d.m4a\n→ transcribe each part → join → summarise')
      ],
      practice: [
        B('خلّي بوت تليجرام يستقبل voice note ويفرّغه.', 'Make a Telegram bot receive a voice note and transcribe it.'),
        B('جرّب خدمتين على 10 رسايل بلهجتك وقارن.', 'Try two services on 10 messages in your dialect and compare.'),
        B('دخّل النص المفرّغ لنفس موزّع الرسايل النصية.', 'Feed the transcribed text into the same router as text messages.'),
        B('قسّم تسجيل طويل لأجزاء وفرّغه.', 'Split a long recording into parts and transcribe it.')
      ],
      words: [
        W('voice note', 'رسالة صوتية قصيرة', 'a short recorded voice message', 'Most customers send a voice note.'),
        W('speech to text', 'تحويل الكلام لنص', 'turning speech into text', 'Speech to text handles the voice notes.'),
        W('transcription', 'النص المكتوب من التسجيل', 'the written text from a recording', 'Check the transcription for names.'),
        W('media download', 'تنزيل ملف الصوت أو الصورة من المنصة', 'downloading the audio or image file from the platform', 'The media download needs the access token.'),
        W('diarization', 'تحديد مين اتكلم في كل جزء', 'identifying who spoke in each part', 'Diarization separates the doctor and the patient.')
      ],
      read: ['lib:n8n Docs: Telegram node', { t: 'OpenAI: Speech to text guide', url: 'https://developers.openai.com/api/docs/guides/speech-to-text', what: B('اقرا الحدود والصيغ المدعومة.', 'Read the limits and supported formats.') }],
      challenge: B('خلّي مساعدك يفهم الصوت: voice note ← تفريغ ← نفس مسار النص، مع حفظ التفريغ، ورسالة «مسمعتش كويس، ممكن تعيد؟» لو التفريغ فاضي أو قصير جدًا.', 'Make your assistant understand voice: voice note → transcription → the same path as text, saving the transcript, with a «I did not catch that, could you repeat?» message when the transcript is empty or very short.'),
      quiz: [
        Q(B('أهم اختبار لخدمة تفريغ:', 'The key test for a transcription service:'), [['رسايل حقيقية بلهجتك', 'real messages in your dialect'], ['الإعلان بتاعها', 'its advert'], ['السعر بس', 'price only']], 0, B('اللهجة بتفرق.', 'Dialect matters.')),
        Q(B('تسجيل ساعة:', 'A one-hour recording:'), [['قسّمه لأجزاء', 'split it into parts'], ['ابعته مرة واحدة دايمًا', 'always send it in one go'], ['مينفعش', 'impossible']], 0, B('حدود الحجم.', 'Size limits.')),
        Q(B('النص المفرّغ يدخل:', 'The transcript goes into:'), [['نفس مسار الرسايل النصية', 'the same path as text messages'], ['مسار منفصل تمامًا', 'a completely separate path'], ['سلة المهملات', 'the bin']], 0, B('منطق واحد.', 'One logic.'))
      ] },

    { title: B('الرد بالصوت', 'Replying with voice'),
      goal: B('ترد بصوت لما ده أحسن للعميل.', 'Reply with voice when that is better for the customer.'),
      learn: [
        L(B('إمتى الصوت مفيد', 'When voice helps'),
          B('**text to speech** مفيد لـ: عملاء بيفضلوا الصوت أو مش بيقروا كويس، تعليمات طويلة (طريقة استخدام)، وتذكيرات ودودة. بس مش لكل حاجة: الأرقام والعناوين والروابط أحسن نص عشان العميل ينسخها. أحسن حل غالبًا: صوت + نص.', '**Text to speech** helps for: customers who prefer voice or do not read well, long instructions (how to use something), and friendly reminders. But not for everything: numbers, addresses and links are better as text so the customer can copy them. Often best: voice + text.'),
          'customer sent a voice note → reply with voice + the key details as text'),
        L(B('التوليد والصيغة', 'Generation and format'),
          B('خدمات TTS (OpenAI، ElevenLabs، Google، Azure) بترجّع ملف صوت. واتساب وتليجرام بيعرضوا الرسالة كـ «voice note» لو الصيغة **ogg/opus**؛ صيغ تانية بتتبعت كملف صوت عادي. اختار صوت ثابت للبراند واختبر النطق العربي للأسماء.', 'TTS services (OpenAI, ElevenLabs, Google, Azure) return an audio file. WhatsApp and Telegram show it as a «voice note» if the format is **ogg/opus**; other formats are sent as a normal audio file. Choose one consistent voice for the brand and test Arabic pronunciation of names.'),
          'TTS → format: opus (ogg) → Telegram: Send Voice / WhatsApp: send audio (voice)'),
        L(B('اكتب للودن', 'Write for the ear'),
          B('النص اللي هيتقال لازم يتكتب للسماع: جمل قصيرة، أرقام مكتوبة بطريقة تتنطق صح («الساعة خمسة العصر» مش 17:00)، من غير رموز وإيموجي، وتحية وختام. ممكن تطلب من الموديل «اكتب ده للنطق».', 'Text that will be spoken must be written for the ear: short sentences, numbers written to be pronounced correctly («five in the afternoon», not 17:00), no symbols or emoji, and a greeting and closing. You can ask the model to «rewrite this for speech».'),
          '✗ "Appt: 08/10 @17:00 📅"\n✓ "Your appointment is on Thursday, the eighth of October, at five in the afternoon."')
      ],
      practice: [
        B('حوّل رد نصي لصوت ogg وابعته على تليجرام.', 'Turn a text reply into ogg audio and send it on Telegram.'),
        B('اعمل خطوة «إعادة كتابة للنطق» قبل TTS.', 'Add a «rewrite for speech» step before TTS.'),
        B('اختبر نطق 10 أسماء عربي.', 'Test the pronunciation of 10 Arabic names.'),
        B('اعمل قاعدة: لو العميل بعت صوت، رد صوت + نص.', 'Make a rule: if the customer sent voice, reply with voice + text.')
      ],
      words: [
        W('text to speech', 'تحويل النص لكلام مسموع', 'turning text into spoken audio', 'Text to speech reads the reminder aloud.'),
        W('tts', 'اختصار text to speech', 'short for text to speech', 'The TTS voice sounds natural.'),
        W('ogg', 'صيغة صوت بتتعرض كرسالة صوتية', 'an audio format shown as a voice message', 'Send the reply as ogg with opus.'),
        W('voice reply', 'رد بالصوت بدل النص', 'a reply in voice instead of text', 'A voice reply suits older customers.'),
        W('spoken style', 'كتابة مناسبة للسماع', 'writing suited to listening', 'Rewrite the answer in spoken style first.')
      ],
      read: [{ t: 'OpenAI: Text to speech guide', url: 'https://developers.openai.com/api/docs/guides/text-to-speech', what: B('اقرا الأصوات والصيغ.', 'Read about voices and formats.') }, 'lib:Telegram Bot API'],
      challenge: B('خلّي مساعدك يرد بصوت لما العميل يبعت صوت: إعادة كتابة للنطق، TTS بصوت ثابت، ogg، ونفس التفاصيل المهمة كنص.', 'Make your assistant reply with voice when the customer sends voice: a rewrite for speech, TTS with one voice, ogg, and the same key details as text.'),
      quiz: [
        Q(B('رقم حجز ولينك دفع:', 'A booking number and payment link:'), [['نص', 'as text'], ['صوت بس', 'voice only'], ['صورة', 'an image']], 0, B('العميل ينسخها.', 'The customer copies them.')),
        Q(B('عشان الصوت يظهر كـ voice note:', 'To show audio as a voice note:'), [['ogg/opus', 'ogg/opus'], ['wav دايمًا', 'always wav'], ['pdf', 'pdf']], 0, B('حسب المنصة.', 'Depending on the platform.')),
        Q(B('«17:00 📅» قبل TTS:', '«17:00 📅» before TTS:'), [['اكتبها «الخامسة مساءً»', 'write it as «five in the afternoon»'], ['سيبها', 'leave it'], ['احذف الرسالة', 'delete the message']], 0, B('اكتب للودن.', 'Write for the ear.'))
      ] },

    { title: B('وكلاء التليفون', 'Phone agents'),
      goal: B('تفهم إزاي وكيل صوتي على التليفون بيتربط بـ n8n.', 'Understand how a voice agent on the phone connects to n8n.'),
      learn: [
        L(B('المكونات', 'The parts'),
          B('**voice agent** على التليفون محتاج: رقم وخدمة **telephony** (Twilio وغيرها)، منصة صوت بتعمل الاستماع والكلام والـ **turn-taking** في الوقت الحقيقي (Vapi، Retell، ElevenLabs Agents وغيرها)، وأدوات. n8n غالبًا دوره **الأدوات**: webhook المنصة بتناديه لما الوكيل يحتاج يحجز أو يدوّر.', 'A phone **voice agent** needs: a number and a **telephony** service (Twilio and others), a voice platform handling listening, speaking and **turn-taking** in real time (Vapi, Retell, ElevenLabs Agents and others), and tools. n8n’s role is usually **the tools**: the platform calls its webhook when the agent needs to book or look something up.'),
          'caller → phone number → voice platform (STT + LLM + TTS)\n   tool call → n8n webhook /tools/check-slots → { free: [...] } → spoken reply'),
        L(B('السرعة أهم حاجة', 'Speed matters most'),
          B('في المكالمة، 3 ثواني سكوت تبان دهر. **voice latency** لازم قليلة: أدوات n8n ترد في أقل من ثانية (استعلام سريع، من غير خطوات تقيلة)، والحاجات البطيئة (إيميل، تقرير) تتعمل بعد المكالمة. رد الأداة قصير عشان يتقال بسرعة.', 'On a call, 3 seconds of silence feels endless. **Voice latency** must be low: n8n tools answer in under a second (a quick query, no heavy steps), and slow things (emails, reports) happen after the call. Tool replies are short so they can be spoken quickly.'),
          'tool webhook: Respond immediately with result (≤ 800 ms)\nafter call: webhook "call ended" → summary email, CRM update'),
        L(B('بعد المكالمة', 'After the call'),
          B('المنصة بتبعت webhook بانتهاء المكالمة فيه التفريغ والمدة. n8n يعمل **call summary** (السبب، النتيجة، الخطوة الجاية)، ويحدّث الـ CRM، ويبعت تنبيه لو العميل زعلان أو طلب إنسان. وأعلن في أول المكالمة إنها مع مساعد آلي وإنها ممكن تتسجل.', 'The platform sends an «ended» webhook with the transcript and duration. n8n creates a **call summary** (reason, outcome, next step), updates the CRM, and alerts if the customer was upset or asked for a person. And announce at the start that this is an automated assistant and the call may be recorded.'),
          'call.ended → AI summary { reason, outcome, next_step, sentiment }\n→ CRM activity → IF sentiment negative → alert manager')
      ],
      practice: [
        B('اقرا توثيق منصة وكلاء صوت (حساب تجريبي لو متاح).', 'Read a voice-agent platform’s docs (a trial account if available).'),
        B('اعمل webhook أداة في n8n يرد في أقل من ثانية.', 'Build a tool webhook in n8n that answers in under a second.'),
        B('اعمل webhook «انتهاء المكالمة» بملخص AI.', 'Build a «call ended» webhook with an AI summary.'),
        B('اكتب جملة البداية (مساعد آلي + تسجيل).', 'Write the opening line (automated assistant + recording).')
      ],
      words: [
        W('voice agent', 'وكيل AI بيتكلم ويسمع', 'an AI agent that listens and speaks', 'The voice agent books appointments by phone.'),
        W('telephony', 'خدمات الأرقام والمكالمات', 'phone number and calling services', 'The telephony provider routes the call.'),
        W('turn-taking', 'تبادل الكلام بين المتصلين من غير مقاطعة', 'taking turns to speak without interrupting', 'Good turn-taking feels natural.'),
        W('voice latency', 'التأخير بين كلام العميل ورد الوكيل', 'the delay between the caller speaking and the agent replying', 'Keep voice latency under a second.'),
        W('call summary', 'ملخص المكالمة بعد ما تخلص', 'a summary of a call after it ends', 'Save the call summary in the CRM.')
      ],
      read: [{ t: 'Twilio: Programmable Voice docs', url: 'https://www.twilio.com/docs/voice', what: B('اقرا الفكرة العامة للأرقام والـ webhooks.', 'Read the overall idea of numbers and webhooks.') }, 'lib:n8n Docs: Respond to Webhook'],
      challenge: B('صمّم (وابني الجزء بتاع n8n) وكيل تليفون لعيادة: 3 أدوات webhook سريعة، webhook انتهاء بملخص وتحديث CRM وتنبيه، وجملة بداية مناسبة — واختبر الأدوات بـ curl وقيس الوقت.', 'Design (and build n8n’s part of) a phone agent for a clinic: 3 fast tool webhooks, an «ended» webhook with a summary, CRM update and alert, and a suitable opening line — test the tools with curl and time them.'),
      quiz: [
        Q(B('دور n8n في وكيل التليفون غالبًا:', 'n8n’s usual role in a phone agent:'), [['الأدوات وما بعد المكالمة', 'the tools and after-call work'], ['الصوت نفسه', 'the voice itself'], ['شبكة التليفون', 'the phone network']], 0, B('webhooks.', 'Webhooks.')),
        Q(B('أداة بترد في 5 ثواني:', 'A tool that answers in 5 seconds:'), [['بطيئة جدًا للمكالمة', 'too slow for a call'], ['مثالية', 'ideal'], ['مش مهم', 'irrelevant']], 0, B('السكوت مزعج.', 'Silence is painful.')),
        Q(B('في أول المكالمة:', 'At the start of the call:'), [['قول إنه مساعد آلي والتسجيل', 'say it is an automated assistant and about recording'], ['خبّي ده', 'hide it'], ['ابدأ بالبيع', 'start selling']], 0, B('شفافية.', 'Transparency.'))
      ] },

    { title: B('فهم الصور', 'Understanding images'),
      goal: B('تستخدم الصور في الشغل: إيصالات، منتجات، أضرار، ومحتوى.', 'Use images at work: receipts, products, damage and content.'),
      learn: [
        L(B('استخدامات عملية', 'Practical uses'),
          B('**image understanding** في الشغل: عميل بعت صورة منتج تالف ← وصف الضرر وتصنيفه للمرتجع. صورة إيصال تحويل بنكي ← استخراج المبلغ والتاريخ للمطابقة. صورة رف ← عد المنتجات. اطلب دايمًا JSON منظم، مش وصف حر.', '**Image understanding** at work: a customer sent a photo of a damaged product → describe and classify the damage for a return. A photo of a bank-transfer receipt → extract the amount and date for reconciliation. A shelf photo → count products. Always ask for structured JSON, not a free description.'),
          '{ "damage": "cracked screen", "severity": "high", "matches_order_item": true, "photo_quality": "good" }'),
        L(B('حدود وأخطاء', 'Limits and mistakes'),
          B('موديلات الرؤية بتغلط في: العد الدقيق لحاجات كتير، الأرقام الصغيرة والمكتوبة بخط اليد، والصور الضعيفة. وممكن حد يبعت صورة متعدّلة (إيصال مزوّر). فالقرارات المالية: قارن بمصدر تاني (البنك، الطلب) ومتعتمدش على الصورة لوحدها.', 'Vision models make mistakes on: exact counts of many items, small or handwritten numbers, and poor photos. And someone may send an edited image (a forged receipt). So for money decisions: compare with another source (the bank, the order) and never rely on the image alone.'),
          'receipt photo says 1,500 EGP → check the bank statement API before marking paid'),
        L(B('فحص الصور المرفوعة', 'Checking uploaded images'),
          B('أي نظام بيستقبل صور من الناس محتاج **image moderation**: محتوى غير لائق، بيانات حساسة (بطاقة، كارت) اتصورت بالغلط، أو صورة مالهاش علاقة. صنّفها الأول، والمرفوض متتحفظش، والحساس يتخفي أو يتمسح بعد الاستخدام.', 'Any system receiving images from people needs **image moderation**: inappropriate content, sensitive data (an ID, a card) photographed by mistake, or an unrelated image. Classify first; rejected images are not stored, and sensitive ones are masked or deleted after use.'),
          'classify → { safe, contains_id_card, relevant } → not relevant → ask again\ncontains_id_card → use, then delete within 24 h')
      ],
      practice: [
        B('اعمل تصنيف صور أضرار بـ JSON (5 صور تجريبية).', 'Build damage-photo classification as JSON (5 sample photos).'),
        B('استخرج مبلغ وتاريخ من صورة إيصال وقارنهم بطلب.', 'Extract an amount and date from a receipt photo and compare them with an order.'),
        B('اعمل فحص moderation قبل حفظ أي صورة.', 'Add a moderation check before storing any image.'),
        B('اختبر صورة ضعيفة وشوف الموديل بيقول إيه.', 'Test a poor photo and see what the model says.')
      ],
      words: [
        W('image understanding', 'فهم محتوى الصورة بموديل', 'understanding an image’s content with a model', 'Image understanding classifies the damage.'),
        W('damage photo', 'صورة بتوضّح ضرر في منتج', 'a photo showing damage to a product', 'Ask for a damage photo for every return.'),
        W('image moderation', 'فحص الصور قبل قبولها', 'checking images before accepting them', 'Image moderation rejects unrelated photos.'),
        W('photo quality', 'وضوح الصورة وإضاءتها', 'how clear and well-lit a photo is', 'Low photo quality → ask for another.'),
        W('forged receipt', 'إيصال متزوّر أو متعدّل', 'a faked or edited receipt', 'Check the bank to catch a forged receipt.')
      ],
      read: [{ t: 'Claude docs: Vision', url: 'https://platform.claude.com/docs/en/build-with-claude/vision', what: B('اقرا الحدود ونصايح الصور.', 'Read the limits and image tips.') }, 'lib:Gemini API docs'],
      challenge: B('ابني مسار مرتجعات بالصور: العميل يبعت صورة ← moderation ← تصنيف الضرر JSON ← مطابقة مع المنتج في الطلب ← قرار (موافقة تلقائية للبسيط، مراجعة للباقي).', 'Build a photo-based returns path: the customer sends a photo → moderation → damage classification as JSON → matching with the product in the order → a decision (auto-approve simple cases, review the rest).'),
      quiz: [
        Q(B('صورة إيصال بنكي:', 'A bank receipt photo:'), [['تتأكد من مصدر تاني', 'is confirmed from another source'], ['كفاية لوحدها', 'is enough alone'], ['تتجاهل', 'is ignored']], 0, B('ممكن تتزوّر.', 'It can be forged.')),
        Q(B('موديلات الرؤية بتغلط غالبًا في:', 'Vision models often fail at:'), [['العد الدقيق والأرقام الصغيرة', 'exact counts and small numbers'], ['الألوان الأساسية', 'basic colours'], ['الأشكال الكبيرة', 'large shapes']], 0, B('راجع.', 'Double-check.')),
        Q(B('صورة بطاقة شخصية اتبعتت بالغلط:', 'An ID card photo sent by mistake:'), [['متتحفظش أو تتمسح بسرعة', 'is not stored or is deleted quickly'], ['تتحفظ للأبد', 'is kept forever'], ['تتنشر', 'is published']], 0, B('بيانات حساسة.', 'Sensitive data.'))
      ] },

    { title: B('توليد الصور بأمان', 'Generating images safely'),
      goal: B('تولّد صور مفيدة للشغل من غير مشاكل براند أو حقوق.', 'Generate useful images for work without brand or rights problems.'),
      learn: [
        L(B('استخدامات', 'Uses'),
          B('**image generation**: صور منتجات بخلفيات مختلفة، بانرات عروض، صور للسوشيال، أيقونات. ابدأ ببرومبت فيه: الموضوع، الأسلوب، الألوان (ألوان البراند)، المقاس، والممنوعات (نص، وشوش حقيقية، لوجوهات تانية).', '**Image generation**: product photos on different backgrounds, offer banners, social images, icons. Start with a prompt including: the subject, the style, colours (brand colours), the size, and what is forbidden (text, real faces, other logos).'),
          'prompt: "product photo of a 250 g tea pack on a wooden table, soft morning light,\n green #2f6f4f accents, square 1:1, no text, no people, no logos"'),
        L(B('اتساق البراند', 'Brand consistency'),
          B('كل صورة لازم تبان من نفس البراند: نفس الأسلوب والألوان. احفظ «برومبت أساسي» للبراند في الإعدادات وضيف عليه التفاصيل. والنص العربي جوه الصور المولّدة غالبًا بيطلع غلط — حط النص بعدين بأداة تصميم أو HTML.', 'Every image must look like the same brand: the same style and colours. Keep a base «brand prompt» in settings and add the details to it. Arabic text inside generated images often comes out wrong — add the text afterwards with a design tool or HTML.'),
          'config.brand_prompt = "clean flat style, green #2f6f4f and cream, soft shadows"\nfinal = brand_prompt + subject · text added later in a template'),
        L(B('موافقة وحقوق', 'Approval and rights'),
          B('**brand safety**: محدش ينشر صورة مولّدة من غير موافقة إنسان. متولّدش وشوش أشخاص حقيقيين أو علامات تجارية لغيرك، واقرا شروط الخدمة عن الاستخدام التجاري. وسجّل البرومبت والموديل لكل صورة اتنشرت.', '**Brand safety**: nobody publishes a generated image without a person’s approval. Do not generate real people’s faces or other companies’ trademarks, and read the service’s terms on commercial use. Log the prompt and model for every published image.'),
          'generate 4 options → Telegram to the owner with buttons (approve / redo)\napproved → publish + log { prompt, model, approved_by }')
      ],
      practice: [
        B('اكتب برومبت أساسي لبراند وولّد 4 صور.', 'Write a base brand prompt and generate 4 images.'),
        B('حط نص عربي على صورة بقالب HTML بدل التوليد.', 'Put Arabic text on an image with an HTML template instead of generating it.'),
        B('اعمل موافقة بأزرار قبل النشر.', 'Add button approval before publishing.'),
        B('اقرا شروط الاستخدام التجاري لخدمة توليد.', 'Read a generation service’s commercial-use terms.')
      ],
      words: [
        W('image generation', 'إنشاء صور بموديل AI', 'creating images with an AI model', 'Use image generation for offer banners.'),
        W('brand prompt', 'برومبت أساسي ثابت لأسلوب البراند', 'a fixed base prompt for the brand style', 'Start every image from the brand prompt.'),
        W('brand safety', 'حماية سمعة البراند من محتوى غلط', 'protecting a brand’s reputation from bad content', 'Brand safety requires human approval.'),
        W('aspect ratio', 'نسبة عرض الصورة لطولها', 'an image’s width-to-height ratio', 'Use a 9:16 aspect ratio for stories.'),
        W('commercial use', 'استخدام في شغل بيكسب فلوس', 'use in work that earns money', 'Check the terms for commercial use.')
      ],
      read: [{ t: 'OpenAI: Image generation guide', url: 'https://developers.openai.com/api/docs/guides/image-generation', what: B('اقرا الخيارات والحدود.', 'Read the options and limits.') }, 'lib:Gemini API docs'],
      challenge: B('اعمل «مصنع بانرات»: عرض جديد في شيت ← 4 صور ببرومبت البراند ← نص عربي بقالب HTML ← موافقة صاحب الشغل بأزرار ← نشر وتسجيل.', 'Build a «banner factory»: a new offer in a sheet → 4 images from the brand prompt → Arabic text via an HTML template → owner approval with buttons → publish and log.'),
      quiz: [
        Q(B('نص عربي جوه صورة مولّدة:', 'Arabic text inside a generated image:'), [['حطه بعدين بقالب', 'add it afterwards with a template'], ['اطلبه من الموديل دايمًا', 'always ask the model for it'], ['مستحيل يتحط', 'cannot be added']], 0, B('غالبًا بيطلع غلط.', 'It often comes out wrong.')),
        Q(B('صورة مولّدة قبل النشر:', 'A generated image before publishing:'), [['موافقة إنسان', 'human approval'], ['نشر فوري', 'instant publishing'], ['من غير تسجيل', 'no logging']], 0, B('brand safety.', 'Brand safety.')),
        Q(B('صور بنفس أسلوب البراند:', 'Images in the same brand style:'), [['برومبت أساسي ثابت', 'a fixed base prompt'], ['برومبت جديد كل مرة', 'a new prompt every time'], ['صور عشوائية', 'random images']], 0, B('اتساق.', 'Consistency.'))
      ] },

    { title: B('مراجعة الشهر التاسع ومشروعه', 'Month 9 review and project'),
      goal: B('مساعد AI متكامل: وكلاء، تقييم، أدوات، صوت وصورة.', 'A complete AI assistant: agents, evaluation, tools, voice and images.'),
      review: [
        B('الوكلاء المتعددين والذاكرة والتكلفة والمراقبة (أسبوع 33).', 'Multiple agents, memory, cost and monitoring (week 33).'),
        B('التقييم والحكم وحواجز المدخلات والمخرجات (أسبوع 34).', 'Evaluation, the judge, and input and output guardrails (week 34).'),
        B('الأدوات المخصصة وMCP server وclient بأمان (أسبوع 35).', 'Custom tools and MCP server and client, safely (week 35).'),
        B('الصوت: تفريغ ورد صوتي ووكلاء تليفون.', 'Voice: transcription, voice replies and phone agents.'),
        B('الصورة: فهم وmoderation وتوليد بموافقة.', 'Images: understanding, moderation and generation with approval.')
      ],
      project: B('مشروع الشهر التاسع: «مساعد بيزنس متكامل» على واتساب أو تليجرام: مشرف ومتخصصين بذاكرة، بيفهم صوت وصور ويرد بصوت لما يناسب، أدوات workflow معروضة كـ MCP server محمي، حواجز مدخلات ومخرجات، تقييم آلي قبل النشر بحكم معاير، مراقبة وتقرير أسبوعي بالتكلفة والجودة. سلّم رسمة معمارية، وREADME، وفيديو 7 دقايق.', 'Month 9 project: a «complete business assistant» on WhatsApp or Telegram: a supervisor and specialists with memory, understanding voice and images and replying with voice when suitable, workflow tools exposed as a protected MCP server, input and output guardrails, an automatic pre-deploy evaluation with a calibrated judge, monitoring and a weekly cost and quality report. Deliver an architecture diagram, a README and a 7-minute video.'),
      test: [
        Q(B('voice note يدخل:', 'A voice note enters:'), [['تفريغ ثم نفس مسار النص', 'transcription then the same path as text'], ['مسار منفصل تمامًا', 'a totally separate path'], ['ولا حاجة', 'nothing']], 0, B('منطق واحد.', 'One logic.')),
        Q(B('اختيار خدمة التفريغ بـ:', 'Choose a transcription service by:'), [['اختبار على رسايل حقيقية بلهجتك', 'testing on real messages in your dialect'], ['السمعة بس', 'reputation only'], ['أول نتيجة في البحث', 'the first search result']], 0, B('قيس.', 'Measure.')),
        Q(B('diarization:', 'Diarization is:'), [['مين قال إيه', 'who said what'], ['ترجمة', 'translation'], ['ضغط الصوت', 'audio compression']], 0, B('للاجتماعات.', 'For meetings.')),
        Q(B('صوت يظهر كرسالة صوتية:', 'Audio shown as a voice message:'), [['ogg/opus', 'ogg/opus'], ['mp4', 'mp4'], ['png', 'png']], 0, B('حسب المنصة.', 'Platform-dependent.')),
        Q(B('النص قبل TTS:', 'Text before TTS:'), [['مكتوب للسماع', 'written for listening'], ['فيه رموز وإيموجي', 'full of symbols and emoji'], ['أطول', 'longer']], 0, B('spoken style.', 'Spoken style.')),
        Q(B('دور n8n في وكيل التليفون:', 'n8n’s role in a phone agent:'), [['أدوات سريعة وما بعد المكالمة', 'fast tools and after-call work'], ['تحويل الصوت', 'voice conversion'], ['شبكة الاتصال', 'the phone network']], 0, B('webhooks.', 'Webhooks.')),
        Q(B('أداة وكيل التليفون لازم ترد في:', 'A phone-agent tool must answer within:'), [['أقل من ثانية تقريبًا', 'about a second or less'], ['دقيقة', 'a minute'], ['مش مهم', 'any time']], 0, B('voice latency.', 'Voice latency.')),
        Q(B('صورة إيصال تحويل:', 'A transfer receipt photo:'), [['تتأكد بمصدر تاني', 'is confirmed with another source'], ['دليل كافي', 'is enough proof'], ['تتنشر', 'is published']], 0, B('ممكن تتزوّر.', 'It can be forged.')),
        Q(B('image moderation بيرفض:', 'Image moderation rejects:'), [['المحتوى غير اللائق وغير المتعلق', 'inappropriate and unrelated content'], ['كل الصور', 'every image'], ['الصور الواضحة', 'clear images']], 0, B('قبل الحفظ.', 'Before storing.')),
        Q(B('نص عربي على بانر مولّد:', 'Arabic text on a generated banner:'), [['بقالب بعد التوليد', 'via a template after generating'], ['من الموديل', 'from the model'], ['من غير نص', 'no text ever']], 0, B('أدق.', 'More accurate.')),
        Q(B('النشر لصورة مولّدة:', 'Publishing a generated image:'), [['بعد موافقة وتسجيل', 'after approval and logging'], ['فوري', 'instant'], ['سري', 'secret']], 0, B('brand safety.', 'Brand safety.')),
        Q(B('مشروع الشهر بيجمع:', 'The month project combines:'), [['وكلاء وتقييم وأدوات وصوت وصورة', 'agents, evaluation, tools, voice and images'], ['جدول واحد', 'one table'], ['إيميل بس', 'email only']], 0, B('مساعد متكامل.', 'A complete assistant.'))
      ] }
  ]
};
