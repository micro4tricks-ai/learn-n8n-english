// Sections of speak.html. Types pronounce / shadow / dictation live in assets/js/speak.js; situations are lessons.
// Sentences are original, written for this site: the English a developer says at work.
var SPEAK_SENTENCES = [
  // beginner
  { id: 'b1', lvl: 'b', en: 'I pushed the fix to the main branch.', ar: 'رفعت التصليح على الفرع الرئيسي.' },
  { id: 'b2', lvl: 'b', en: 'The build failed again this morning.', ar: 'الـ build فشل تاني الصبح.' },
  { id: 'b3', lvl: 'b', en: 'Can you share your screen, please?', ar: 'ممكن تشارك الشاشة لو سمحت؟' },
  { id: 'b4', lvl: 'b', en: 'I will send you the link after the meeting.', ar: 'هبعتلك اللينك بعد الاجتماع.' },
  { id: 'b5', lvl: 'b', en: 'The workflow runs every hour.', ar: 'الـ workflow بيشتغل كل ساعة.' },
  { id: 'b6', lvl: 'b', en: 'Please check the error message first.', ar: 'بص على رسالة الخطأ الأول لو سمحت.' },
  { id: 'b7', lvl: 'b', en: 'I am working on the login page today.', ar: 'أنا شغال على صفحة الدخول النهارده.' },
  { id: 'b8', lvl: 'b', en: 'The data comes from a webhook.', ar: 'البيانات جاية من webhook.' },
  { id: 'b9', lvl: 'b', en: 'Let me restart the server and try again.', ar: 'خليني أعمل restart للسيرفر وأجرّب تاني.' },
  { id: 'b10', lvl: 'b', en: 'Thank you for the quick review.', ar: 'شكرًا على المراجعة السريعة.' },
  { id: 'b11', lvl: 'b', en: 'The file is too big to upload.', ar: 'الملف كبير أوي على الرفع.' },
  { id: 'b12', lvl: 'b', en: 'I have a question about the API key.', ar: 'عندي سؤال عن مفتاح الـ API.' },
  // intermediate
  { id: 'i1', lvl: 'i', en: 'Yesterday I finished the invoice workflow, and today I am testing it.', ar: 'امبارح خلّصت workflow الفواتير، والنهارده بجرّبه.' },
  { id: 'i2', lvl: 'i', en: 'I am blocked because I do not have access to the database.', ar: 'أنا واقف عشان مش عندي صلاحية على قاعدة البيانات.' },
  { id: 'i3', lvl: 'i', en: 'Could you take a look at my pull request when you have time?', ar: 'ممكن تبص على الـ pull request بتاعي لما يبقى عندك وقت؟' },
  { id: 'i4', lvl: 'i', en: 'The request times out after thirty seconds.', ar: 'الطلب بيخلص وقته بعد تلاتين ثانية.' },
  { id: 'i5', lvl: 'i', en: 'We should add a retry, because the service fails sometimes.', ar: 'لازم نضيف retry، عشان الخدمة بتقع أحيانًا.' },
  { id: 'i6', lvl: 'i', en: 'I could not reproduce the bug on my machine.', ar: 'مقدرتش أكرر الـ bug على جهازي.' },
  { id: 'i7', lvl: 'i', en: 'It works locally, but it breaks in production.', ar: 'شغال على جهازي، بس بيبوظ على الإنتاج.' },
  { id: 'i8', lvl: 'i', en: 'I think the problem is in the date format.', ar: 'أعتقد إن المشكلة في شكل التاريخ.' },
  { id: 'i9', lvl: 'i', en: 'This should take about two days, including testing.', ar: 'ده هياخد حوالي يومين، بالاختبار.' },
  { id: 'i10', lvl: 'i', en: 'Let me walk you through the main steps.', ar: 'خليني أمشي معاك على الخطوات الأساسية.' },
  { id: 'i11', lvl: 'i', en: 'The client wants a daily report by email.', ar: 'العميل عايز تقرير يومي على الإيميل.' },
  { id: 'i12', lvl: 'i', en: 'I have updated the documentation with the new steps.', ar: 'حدّثت التوثيق بالخطوات الجديدة.' },
  // advanced
  { id: 'a1', lvl: 'a', en: 'If we cache the response, we can cut the number of API calls by half.', ar: 'لو خزّنّا الرد، نقدر نقلّل عدد طلبات الـ API للنص.' },
  { id: 'a2', lvl: 'a', en: 'I would suggest splitting this workflow into smaller sub-workflows.', ar: 'أقترح نقسم الـ workflow ده لـ sub-workflows أصغر.' },
  { id: 'a3', lvl: 'a', en: 'The root cause was a missing index on the orders table.', ar: 'السبب الأساسي كان index ناقص على جدول الطلبات.' },
  { id: 'a4', lvl: 'a', en: 'I see your point, but I am worried about the extra cost.', ar: 'فاهم وجهة نظرك، بس أنا قلقان من التكلفة الزيادة.' },
  { id: 'a5', lvl: 'a', en: 'We need to handle the case where the customer has no email address.', ar: 'لازم نتعامل مع الحالة اللي العميل فيها مالوش إيميل.' },
  { id: 'a6', lvl: 'a', en: 'Before we deploy, let\'s make sure the credentials are not hardcoded.', ar: 'قبل ما ننشر، خلّينا نتأكد إن الـ credentials مش مكتوبة في الكود.' },
  { id: 'a7', lvl: 'a', en: 'The agent calls the right tool, but it sometimes ignores the instructions.', ar: 'الوكيل بينادي الأداة الصح، بس أحيانًا بيتجاهل التعليمات.' },
  { id: 'a8', lvl: 'a', en: 'In my last project, I automated the whole onboarding process for new clients.', ar: 'في آخر مشروع، عملت أتمتة لكل خطوات استقبال العملاء الجداد.' },
  { id: 'a9', lvl: 'a', en: 'Could you clarify what you mean by real time in this context?', ar: 'ممكن توضّح تقصد إيه بـ real time هنا؟' },
  { id: 'a10', lvl: 'a', en: 'We are on track for the release, apart from one minor issue.', ar: 'إحنا ماشيين في المعاد للإصدار، ما عدا مشكلة صغيرة واحدة.' }
];

SECTIONS.add({
  page: 'speak', id: 'pronounce', order: 1, type: 'pronounce', sentences: SPEAK_SENTENCES,
  title: { ar: 'النطق بتقييم', en: 'Scored pronunciation' },
  nav: { ar: 'النطق', en: 'Pronunciation' },
  desc: {
    ar: 'اسمع الجملة، وبعدين دوس 🎙 وقولها. المتصفح بيحوّل كلامك لنص ويقارنه بالجملة: كل كلمة اتفهمت بتنوّر أخضر، واللي مااتفهمتش أحمر. ده بيقيس **هل كلامك مفهوم**، مش لكنتك. شغّال على Chrome وEdge وSafari (مش Firefox)، وChrome بيبعت الصوت لخدمة Google عشان يحوّله لنص.',
    en: 'Listen to the sentence, then press 🎙 and say it. The browser turns your speech into text and compares it with the sentence: each word it understood turns green, the rest red. It measures **whether you are understood**, not your accent. It works in Chrome, Edge and Safari (not Firefox), and Chrome sends the audio to Google to turn it into text.'
  }
});
SECTIONS.add({
  page: 'speak', id: 'shadow', order: 2, type: 'shadow', sentences: SPEAK_SENTENCES,
  title: { ar: 'Shadowing: اسمع وقلّد', en: 'Shadowing: listen and copy' },
  nav: { ar: 'Shadowing', en: 'Shadowing' },
  desc: {
    ar: 'أسرع طريقة تحسّن بيها النطق والإيقاع: اسمع الجملة، وقولها ورا الصوت على طول بنفس السرعة والنغمة، وسجّل نفسك وقارن. ابدأ بسرعة أبطأ وزوّدها. التسجيل بيفضل على جهازك ومش بيترفع.',
    en: 'The quickest way to improve pronunciation and rhythm: listen to the sentence, say it right behind the voice with the same speed and tune, then record yourself and compare. Start slower and speed up. Your recording stays on your device and is not uploaded.'
  }
});
SECTIONS.add({
  page: 'speak', id: 'dictation', order: 3, type: 'dictation', sentences: SPEAK_SENTENCES,
  title: { ar: 'إملاء: اسمع واكتب', en: 'Dictation: listen and type' },
  nav: { ar: 'الإملاء', en: 'Dictation' },
  desc: {
    ar: 'اسمع الجملة (تقدر تعيدها وتبطّأها) واكتبها زي ما سمعتها بالظبط. بعد «اتأكد» هتشوف الكلمات الصح والغلط والناقصة. تمرين ممتاز للاستماع والإملاء مع بعض.',
    en: 'Listen to the sentence (replay and slow it down as you like) and type it exactly as you heard it. After «Check» you see the right, wrong and missing words. A great exercise for listening and spelling together.'
  }
});
SECTIONS.add({
  page: 'speak', id: 'situations', order: 4, type: 'lessons', kind: 'sc',
  title: { ar: 'مواقف شغل حقيقية', en: 'Real work situations' },
  nav: { ar: 'مواقف الشغل', en: 'Work situations' },
  desc: {
    ar: 'عشر مواقف هتقابلها في أي شغل مع فريق أو عميل أجنبي. في كل موقف: الجمل الجاهزة ومعناها، ومثال حوار كامل، وتمرين تعمله بصوتك أو بالكتابة. اقرا المثال بصوت عالي، وبعدين اعمل التمرين من غير ما تبص.',
    en: 'Ten situations you will meet working with a foreign team or client. Each one has ready phrases with their meaning, a full sample dialogue, and an exercise to do out loud or in writing. Read the sample aloud, then do the exercise without looking.'
  },
  items: [
    { id: 'standup', min: 15, t: { ar: 'الـ Daily standup', en: 'The daily standup' },
      body: {
        ar: 'تلات أسئلة ثابتة، وكل واحد بيجاوب في دقيقة: عملت إيه امبارح، هتعمل إيه النهارده، وفيه حاجة موقفاك؟\n\n- `Yesterday I worked on…` — امبارح اشتغلت على…\n- `Today I am going to…` — النهارده هعمل…\n- `I am blocked by…` / `No blockers.` — واقف بسبب… / مفيش حاجة موقفاني.\n- `I need help with…` — محتاج مساعدة في…\n\nاستخدم الماضي البسيط لامبارح، و`going to` للنهارده، وخلّيها قصيرة: الـ standup مش مكان حل المشاكل. لو المشكلة كبيرة قول `Let\'s take it offline.` (نتكلم فيها بعد الاجتماع).',
        en: 'Three fixed questions, a minute each: what you did yesterday, what you will do today, and whether anything is blocking you.\n\n- `Yesterday I worked on…`\n- `Today I am going to…`\n- `I am blocked by…` / `No blockers.`\n- `I need help with…`\n\nUse the past simple for yesterday and `going to` for today, and keep it short: the standup is not the place to solve problems. For a big one, say `Let\'s take it offline.` (we will talk after the meeting).'
      },
      example: 'Yesterday I finished the Telegram alerts and fixed the date bug.\nToday I am going to connect the workflow to the client\'s Google Sheet.\nI am blocked by the sheet permissions. I asked Sara for access this morning.',
      try: { ar: 'سجّل الـ standup بتاعك النهارده بصوتك (3 جمل) في قسم الـ Shadowing أو على موبايلك، واسمعه.', en: 'Record your own standup for today (3 sentences) in the Shadowing section or on your phone, and listen to it.' } },
    { id: 'help', min: 10, t: { ar: 'تطلب مساعدة صح', en: 'Asking for help the right way' },
      body: {
        ar: 'السؤال الكويس بيقول: عايز تعمل إيه، جرّبت إيه، وحصل إيه بدل المتوقع. كده اللي بيساعدك مش هيسألك 5 أسئلة.\n\n- `I am trying to…` — بحاول أعمل…\n- `I have tried… but…` — جرّبت… بس…\n- `I expected… but I got…` — كنت متوقع… بس طلعلي…\n- `Do you have a minute?` / `When you have a moment,…` — فاضي دقيقة؟\n- `Any idea what I am missing?` — عندك فكرة أنا ناسي إيه؟',
        en: 'A good question says what you want to do, what you tried, and what happened instead of what you expected. Then the person helping does not need to ask five questions first.\n\n- `I am trying to…`\n- `I have tried… but…`\n- `I expected… but I got…`\n- `Do you have a minute?` / `When you have a moment,…`\n- `Any idea what I am missing?`'
      },
      example: 'Hi Omar, do you have a minute? I am trying to send the form data to our CRM.\nI have tried the HTTP Request node with a bearer token, but I get a 401 error.\nI expected a new lead in the CRM, but nothing is created. Any idea what I am missing?',
      try: { ar: 'اكتب رسالة Slack تطلب فيها مساعدة في مشكلة حقيقية قابلتك الأسبوع ده، بنفس الترتيب.', en: 'Write a Slack message asking for help with a real problem you met this week, in the same order.' } },
    { id: 'bug', min: 15, t: { ar: 'تكتب bug report', en: 'Writing a bug report' },
      body: {
        ar: 'البلاغ الكويس فيه عنوان واضح، وخطوات تكرار المشكلة، والمتوقع، واللي حصل فعلًا، والبيئة.\n\n- `Steps to reproduce:` — خطوات التكرار\n- `Expected behavior:` / `Actual behavior:` — المتوقع / الفعلي\n- `It happens every time / sometimes / only when…` — بتحصل دايمًا / أحيانًا / بس لما…\n- `This started after…` — ده بدأ بعد…\n\nاكتب الخطوات أوامر قصيرة بالمضارع: `Open…`، `Click…`، `Submit…`.',
        en: 'A good report has a clear title, steps to reproduce, the expected result, what actually happened, and the environment.\n\n- `Steps to reproduce:`\n- `Expected behavior:` / `Actual behavior:`\n- `It happens every time / sometimes / only when…`\n- `This started after…`\n\nWrite the steps as short commands in the present: `Open…`, `Click…`, `Submit…`.'
      },
      example: 'Title: Order form sends duplicate Telegram alerts\n\nSteps to reproduce:\n1. Open the order form.\n2. Submit an order with a phone number that has spaces.\n\nExpected behavior: one alert.\nActual behavior: two identical alerts.\nEnvironment: n8n 1.x, self-hosted, Docker. It started after Monday\'s update.',
      try: { ar: 'اختار أي bug قابلته (أو اخترع واحد) واكتبله bug report كامل بالشكل ده.', en: 'Pick any bug you met (or invent one) and write a full bug report in this shape.' } },
    { id: 'review', min: 15, t: { ar: 'تعليقات مراجعة الكود', en: 'Code review comments' },
      body: {
        ar: 'في المراجعة علّق على الكود مش على الشخص، واسأل بدل ما تأمر، وقول ليه.\n\n- `Nit:` — ملاحظة صغيرة مش لازمة\n- `What do you think about…?` — إيه رأيك في…؟\n- `Could we…?` / `Should we…?` — ممكن…؟ / نعمل…؟\n- `I am not sure I follow. Could you explain…?` — مش متأكد إني فاهم، ممكن توضّح…؟\n- `LGTM` = Looks good to me — تمام وموافق\n- `Good catch!` — لقطة حلوة!\n\nولما حد يعلّق عليك: `Good point, fixed.` أو `I kept it because…`.',
        en: 'In a review, comment on the code, not the person; ask rather than order; and say why.\n\n- `Nit:` — a small, optional note\n- `What do you think about…?`\n- `Could we…?` / `Should we…?`\n- `I am not sure I follow. Could you explain…?`\n- `LGTM` = Looks good to me\n- `Good catch!`\n\nWhen someone comments on yours: `Good point, fixed.` or `I kept it because…`.'
      },
      example: 'Nit: this variable name is a bit vague. What do you think about `unpaidInvoices`?\nCould we move the API key to credentials? Right now it is visible in the workflow JSON.\nNice work on the error branch, LGTM after that.',
      try: { ar: 'افتح أي كود كتبته من أسبوعين واكتب عليه 3 تعليقات مراجعة بالأسلوب ده.', en: 'Open any code you wrote two weeks ago and write three review comments on it in this style.' } },
    { id: 'estimate', min: 10, t: { ar: 'تقدير الوقت والتأخير', en: 'Estimates and delays' },
      body: {
        ar: 'قول رقم بمدى، وقول بيعتمد على إيه، ولو هتتأخر قول بدري ومعاك خطة.\n\n- `It should take about… / between… and…` — هياخد حوالي… / ما بين… و…\n- `It depends on…` — بيعتمد على…\n- `I am running a bit behind on…` — متأخر شوية في…\n- `I need one more day to…` — محتاج يوم كمان عشان…\n- `To stay on schedule, we could…` — عشان نلحق المعاد، ممكن…',
        en: 'Give a range, say what it depends on, and when you will be late, say so early with a plan.\n\n- `It should take about… / between… and…`\n- `It depends on…`\n- `I am running a bit behind on…`\n- `I need one more day to…`\n- `To stay on schedule, we could…`'
      },
      example: 'The integration should take between three and four days. It depends on how clean the client\'s data is.\nUpdate: I am running a bit behind, because the API limits us to 100 requests a minute. I need one more day. To stay on schedule, we could ship the daily report first and add the weekly one next week.',
      try: { ar: 'اكتب رسالة لعميل بتقوله إن الشغل هيتأخر يوم، مع السبب والخطة.', en: 'Write a message telling a client the work will be one day late, with the reason and the plan.' } },
    { id: 'client', min: 15, t: { ar: 'مكالمة مع عميل', en: 'A call with a client' },
      body: {
        ar: 'في أول مكالمة: افهم المشكلة قبل ما تقترح حل، ولخّص اللي فهمته، واتفق على الخطوة الجاية.\n\n- `Could you tell me a bit about how you do this today?` — ممكن تحكيلي بتعملوا ده إزاي دلوقتي؟\n- `What is the most painful part?` — إيه أكتر حاجة متعباكم؟\n- `So, if I understand correctly,…` — يعني لو فاهم صح…\n- `Just to confirm,…` — بس عشان أتأكد…\n- `As a next step, I will send you…` — كخطوة جاية، هبعتلك…',
        en: 'On a first call: understand the problem before you propose a fix, sum up what you understood, and agree on the next step.\n\n- `Could you tell me a bit about how you do this today?`\n- `What is the most painful part?`\n- `So, if I understand correctly,…`\n- `Just to confirm,…`\n- `As a next step, I will send you…`'
      },
      example: 'Client: We copy every new order from email into a spreadsheet by hand.\nYou: So, if I understand correctly, you get about fifty orders a day and each one takes a few minutes?\nClient: Exactly, and we make mistakes.\nYou: Just to confirm, the orders always come from the same shop email? … Great. As a next step, I will send you a short proposal with a demo by Thursday.',
      try: { ar: 'اعمل Shadowing لدور «You» في الحوار ده بصوتك، وبعدين قوله من غير ما تبص.', en: 'Shadow the «You» lines of this dialogue out loud, then say them without looking.' } },
    { id: 'email', min: 15, t: { ar: 'إيميل تحديث للعميل', en: 'A status email to a client' },
      body: {
        ar: 'إيميل التحديث: سطر أول بالخلاصة، وبعدين اللي خلص، واللي جاي، واللي محتاجه منهم.\n\n- `Here is a quick update on…` — ده تحديث سريع عن…\n- `Done this week:` / `Next:` — اللي خلص الأسبوع ده / الجاي\n- `I need your input on…` — محتاج رأيك في…\n- `Please let me know if…` — قولّي لو…\n- `Best regards,` — مع التحية',
        en: 'A status email: a first line with the summary, then what is done, what is next, and what you need from them.\n\n- `Here is a quick update on…`\n- `Done this week:` / `Next:`\n- `I need your input on…`\n- `Please let me know if…`\n- `Best regards,`'
      },
      example: 'Subject: Order automation, week 2 update\n\nHi Laila,\nHere is a quick update: the order workflow is live and has handled 312 orders with no errors.\nDone this week: the daily summary email and the Telegram alert for big orders.\nNext: the monthly report.\nI need your input on one thing: should cancelled orders appear in the report?\nBest regards,\nMahmoud',
      try: { ar: 'اكتب إيميل تحديث لمشروع شغال عليه (أو مشروع الأسبوع في الرحلة) بنفس الشكل.', en: 'Write a status email for a project you are on (or this week’s journey project) in the same shape.' } },
    { id: 'interview', min: 20, t: { ar: 'مقابلة شغل: عرّف نفسك', en: 'A job interview: tell me about yourself' },
      body: {
        ar: 'جاوب في دقيقتين بترتيب: دلوقتي، قبل كده، وليه الوظيفة دي. وجهّز قصة مشروع بطريقة STAR: الموقف، المهمة، اللي عملته، والنتيجة بالأرقام.\n\n- `I am a… with… years of experience in…` — أنا… وعندي خبرة… سنين في…\n- `Most recently, I…` — آخر حاجة عملتها…\n- `One project I am proud of is…` — مشروع فخور بيه هو…\n- `As a result,…` — والنتيجة…\n- `I am interested in this role because…` — مهتم بالوظيفة دي عشان…',
        en: 'Answer in two minutes in this order: now, before, and why this job. Prepare one project story with STAR: situation, task, action and a result with numbers.\n\n- `I am a… with… years of experience in…`\n- `Most recently, I…`\n- `One project I am proud of is…`\n- `As a result,…`\n- `I am interested in this role because…`'
      },
      example: 'I am an automation developer with two years of experience in n8n and JavaScript.\nMost recently, I built workflows for a clinic that handle bookings and reminders.\nOne project I am proud of is their reminder system: patients get a WhatsApp message a day before. As a result, missed appointments dropped by about forty percent.\nI am interested in this role because you build automation for many small businesses, and that is exactly what I enjoy.',
      try: { ar: 'اكتب إجابتك الخاصة على «Tell me about yourself» وسجّلها بصوتك مرتين. المرة التانية من غير ورقة.', en: 'Write your own answer to «Tell me about yourself» and record it twice. The second time without notes.' } },
    { id: 'disagree', min: 10, t: { ar: 'تختلف بأدب', en: 'Disagreeing politely' },
      body: {
        ar: 'ابدأ بإنك تفهم وجهة النظر التانية، وبعدين قول قلقك بسبب، واقترح بديل.\n\n- `I see your point, but…` — فاهم قصدك، بس…\n- `I am a bit worried that…` — قلقان شوية إن…\n- `Have we considered…?` — فكّرنا في…؟\n- `What if we…?` — إيه رأيك لو…؟\n- `Could we try it for a week and see?` — نجرّبها أسبوع ونشوف؟',
        en: 'Start by showing you understand the other view, then give your concern with a reason, and offer an alternative.\n\n- `I see your point, but…`\n- `I am a bit worried that…`\n- `Have we considered…?`\n- `What if we…?`\n- `Could we try it for a week and see?`'
      },
      example: 'I see your point, using the AI node for every message would be flexible. But I am a bit worried about the cost and the speed.\nWhat if we handle the simple questions with a Switch node first, and send only the hard ones to the AI? Could we try it for a week and compare?',
      try: { ar: 'فكّر في قرار تقني مش موافق عليه، واكتب 3 جمل تعترض بيها بالأسلوب ده.', en: 'Think of a technical decision you disagree with and write three sentences objecting in this style.' } },
    { id: 'demo', min: 15, t: { ar: 'تعرض شغلك (Demo)', en: 'Presenting your work (a demo)' },
      body: {
        ar: 'اعرض المشكلة الأول، وبعدين الحل خطوة بخطوة وهو شغّال، والنتيجة، وفي الآخر افتح باب الأسئلة.\n\n- `Today I will show you…` — النهارده هوريكم…\n- `The problem was…` — المشكلة كانت…\n- `Let me show you how it works.` — خليني أوريكم بيشتغل إزاي.\n- `As you can see,…` — زي ما انتوا شايفين…\n- `Any questions so far?` — فيه أسئلة لحد هنا؟',
        en: 'Show the problem first, then the solution step by step while it runs, then the result, and finally invite questions.\n\n- `Today I will show you…`\n- `The problem was…`\n- `Let me show you how it works.`\n- `As you can see,…`\n- `Any questions so far?`'
      },
      example: 'Today I will show you the new support assistant. The problem was that the team answered the same ten questions every day.\nLet me show you how it works. I will ask about an order… As you can see, it looked up the order and replied in a few seconds.\nIn the first week it answered sixty percent of the questions by itself. Any questions so far?',
      try: { ar: 'اعمل Demo مدته دقيقتين لمشروع أسبوع خلّصته في الرحلة، وسجّله فيديو أو صوت.', en: 'Give a two-minute demo of a journey project you finished, and record it as video or audio.' } }
  ]
});
