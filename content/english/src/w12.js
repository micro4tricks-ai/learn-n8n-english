// Week 12 — Formal emails (end of month 3).
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B1',
  title: B('الإيميلات الرسمية', 'Formal emails'),
  goal: B('تكتب إيميل شغل كامل ومؤدب: موضوع واضح، وافتتاحية، وطلب واضح، ومتابعة، واعتذار، وتقفل صح، وترد على التليفون بثقة.',
          'Write a complete, polite work email — a clear subject, an opening, a clear request, a follow-up, an apology and the right closing — and answer the phone with confidence.'),
  days: [
    { title: B('هيكل الإيميل', 'The structure of an email'),
      goal: B('تكتب subject line محدد، وتحية، وجسم قصير، وخاتمة وتوقيع.', 'Write a specific subject line, a greeting, a short body, a closing and a signature.'),
      learn: [
        { h: B('الإيميل في 5 أجزاء', 'An email in five parts'),
          p: B('Subject (إيه المطلوب)، Greeting (Hi Sara, / Dear Mr Ali,)، Purpose في أول سطر، Details، Closing (Best regards,) + اسمك.', 'Subject (what you need), Greeting (Hi Sara, / Dear Mr Ali,), the purpose in the first line, details, closing (Best regards,) + your name.'),
          ex: 'Subject: Invoice #1042 — payment received?\n\nHi Sara,\n\nI\'m writing to check whether you received invoice #1042.\nPlease find attached a copy.\n\nBest regards,\nMahmoud' },
        { h: B('subject line', 'The subject line'),
          p: B('قول المحتوى والمطلوب: «Request: access to the staging server» أحسن من «Hello» أو «Question».', 'Say the content and the ask: "Request: access to the staging server" is better than "Hello" or "Question".'),
          ex: 'Action needed: approve the Q3 budget by Friday\nUpdate: the release moves to 12 Oct' },
        'g:علامة التعجب في الشغل'
      ],
      practice: [
        B('اكتب 5 subject lines محددة لإيميلات حقيقية هتبعتها.', 'Write 5 specific subject lines for real emails you will send.'),
        B('اكتب إيميل من 5 أجزاء تبعت فيه ملف لعميل.', 'Write a five-part email sending a file to a client.'),
        B('اكتب 4 تحيات و4 خواتيم من الأقل للأكثر رسمية.', 'Write 4 greetings and 4 closings, from least to most formal.'),
        B('شيل كل علامات التعجب الزيادة من إيميل قديم كتبته.', 'Remove every extra exclamation mark from an old email of yours.')
      ],
      words: ['subject line', 'recipient', 'cc / bcc', 'attachment', 'please find attached', 'regards / best regards', 'sign-off'],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على «writing emails» واقرا درس واحد.', 'Search for "writing emails" and read one lesson.') }],
      challenge: B('اكتب إيميل حقيقي لحد (عميل، مدير، أستاذ) بالهيكل ده وابعته.', 'Write a real email to someone (a client, a manager, a teacher) with this structure and send it.'),
      quiz: [
        { q: B('أحسن subject line:', 'The best subject line:'), o: ['Hi', 'Question', 'Request: VPN access for the new laptop'], a: 2, why: B('بيقول المحتوى والمطلوب.', 'It says the content and the ask.') },
        { q: B('bcc معناها:', 'bcc means:'), o: [B('نسخة مخفية محدش يشوف مين فيها', 'a hidden copy; others can\'t see who got it'), B('نسخة ظاهرة', 'a visible copy'), B('رد على الكل', 'reply all')], a: 0, why: B('blind carbon copy.', 'blind carbon copy.') },
        { q: B('خاتمة مناسبة لإيميل شغل:', 'A good closing for a work email:'), o: ['Best regards,', 'Bye bye!!!', 'Love,'], a: 0, why: B('مهذبة ومحايدة.', 'Polite and neutral.') }
      ] },

    { title: B('الافتتاحية والرد والمتابعة', 'Openings, replies and follow-ups'),
      goal: B('تبدأ إيميل وترد عليه وتتابع من غير ما تبان زهقان أو مستعجل.', 'Start, reply to and follow up on emails without sounding impatient.'),
      learn: [
        { h: B('جمل الافتتاح', 'Opening lines'),
          p: B('I\'m writing to… / I\'m reaching out about… / Thank you for your email. / Following up on our call yesterday,…', 'I\'m writing to… / I\'m reaching out about… / Thank you for your email. / Following up on our call yesterday,…'),
          ex: 'Thank you for your quick reply.\nFollowing up on my email from Monday, I wanted to check whether…' },
        'g:look forward to + ing',
        { h: B('المتابعة بأدب', 'Polite follow-ups'),
          p: B('Just a quick reminder about… / I wanted to follow up on… / Could you let me know by Thursday? ومتقولش «Why didn\'t you reply?».', 'Just a quick reminder about… / I wanted to follow up on… / Could you let me know by Thursday? Never "Why didn\'t you reply?".'),
          ex: 'Hi Omar,\nJust a quick reminder about the contract. Could you send it back by Thursday?\nThanks,\nMahmoud' }
      ],
      practice: [
        B('اكتب 5 افتتاحيات مختلفة لـ 5 مواقف.', 'Write 5 different openings for 5 situations.'),
        B('اكتب إيميل متابعة مؤدب لحد مردّش من أسبوع.', 'Write a polite follow-up to someone who hasn\'t replied for a week.'),
        B('اكتب 4 جمل بـ look forward to + ing.', 'Write 4 sentences with look forward to + -ing.'),
        B('رد على إيميل (حقيقي أو متخيّل) بـ «Thank you for… I\'ll get back to you by…».', 'Reply to an email (real or imagined) with "Thank you for… I\'ll get back to you by…".')
      ],
      words: ['to whom it may concern', 'look forward to', 'drop (someone) a line', 'get back to (someone)', 'reply all', 'forward', 'inbox'],
      read: [{ lib: 'British Council LearnEnglish', what: B('دوّر في قسم Business English على «emails» واقرا درس.', 'Search the Business English section for "emails" and read a lesson.') }],
      challenge: B('اكتب 3 إيميلات متابعة لنفس الموضوع بعد يومين وأسبوع وأسبوعين، ولاحظ النبرة بتتغير إزاي.', 'Write 3 follow-up emails on the same topic after two days, a week and two weeks, and notice how the tone changes.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I look forward to hear from you.', 'I look forward to hearing from you.', 'I look forward hear from you.'], a: 1, why: B('to هنا حرف جر، فبعده ing.', 'to is a preposition here, so -ing follows.') },
        { q: B('أحسن متابعة:', 'The best follow-up:'), o: ['Why didn\'t you answer me?', 'Just a quick reminder about my last email.', 'ANSWER PLEASE'], a: 1, why: B('مؤدبة ومش هجومية.', 'Polite, not aggressive.') },
        { q: B('«I\'ll get back to you» معناها:', '"I\'ll get back to you" means:'), o: [B('هرد عليك بعدين', 'I will reply to you later'), B('راجع لبيتك', 'I\'m going home'), B('هرجعلك الفلوس', 'I\'ll refund you')], a: 0, why: B('وعد بالرد.', 'A promise to reply.') }
      ] },

    { title: B('الطلب والاعتذار والاعتراض بأدب', 'Asking, apologising and disagreeing politely'),
      goal: B('تطلب حاجة، وتعتذر عن غلطة، وتعترض أو ترفض بأدب في الإيميل.', 'Make a request, apologise for a mistake, and disagree or say no politely in an email.'),
      learn: [
        'g:فعل الأمر المؤدب',
        'g:Would you mind + ing',
        'g:السؤال الغير مباشر',
        { h: B('الاعتذار والرفض', 'Apologising and saying no'),
          p: B('I apologise for the delay. / I\'m afraid we can\'t… / Unfortunately,… / I see your point, but… ومتبالغش في الاعتذار.', 'I apologise for the delay. / I\'m afraid we can\'t… / Unfortunately,… / I see your point, but… Don\'t over-apologise.'),
          ex: 'I\'m afraid we can\'t add this feature before the release.\nHowever, we can include it in the next version.' }
      ],
      practice: [
        B('حوّل 5 طلبات مباشرة لطلبات مؤدبة (Could you…? / Would you mind…?).', 'Turn 5 direct requests into polite ones (Could you…? / Would you mind…?).'),
        B('اكتب إيميل اعتذار عن تأخير تسليم في 5 جمل: اعتذار، سبب قصير، الموعد الجديد.', 'Write a 5-sentence apology email for a late delivery: the apology, a short reason, the new date.'),
        B('اكتب إيميل ترفض فيه طلب عميل وتقترح بديل.', 'Write an email declining a client\'s request and offering an alternative.'),
        B('حوّل 4 أسئلة مباشرة لغير مباشرة: `Where is the file?` ← `Could you tell me where the file is?`', 'Turn 4 direct questions into indirect ones: `Where is the file?` → `Could you tell me where the file is?`')
      ],
      words: ['suggestion / recommendation', 'opinion / point of view', 'agreement / disagreement', 'complaint', 'apology / apologize', 'I\'m afraid…', 'sorry to interrupt'],
      read: [{ lib: 'All Ears English', what: B('دوّر على حلقة عن «polite English» أو «saying no politely» واسمعها.', 'Find an episode about "polite English" or "saying no politely" and listen to it.') }],
      challenge: B('رد على شكوى عميل (complaint) بإيميل: تعترف بالمشكلة، وتعتذر، وتقول الحل والموعد.', 'Reply to a customer complaint by email: acknowledge the problem, apologise, and give the fix and the date.'),
      quiz: [
        { q: B('أكتر طلب مؤدب:', 'The most polite request:'), o: ['Send me the file.', 'Could you send me the file, please?', 'You must send the file.'], a: 1, why: B('Could you + please.', 'Could you + please.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Would you mind to check it?', 'Would you mind checking it?', 'Would you mind check it?'], a: 1, why: B('mind + ing.', 'mind + -ing.') },
        { q: B('اختار السؤال غير المباشر الصح:', 'Choose the correct indirect question:'), o: ['Could you tell me where is the invoice?', 'Could you tell me where the invoice is?', 'Could you tell me where invoice?'], a: 1, why: B('في السؤال غير المباشر الترتيب عادي.', 'An indirect question keeps normal word order.') }
      ] },

    { title: B('إيميلات الشغل اليومية', 'Everyday work emails'),
      goal: B('تكتب إيميلات الشغل المتكررة: تعريف بنفسك، وتواصل أول مرة، وإشعار، وحاجة سرية.', 'Write recurring work emails: introducing yourself, first contact, a notice, and something confidential.'),
      learn: [
        { h: B('أول تواصل', 'First contact'),
          p: B('اكتب إنت مين في سطر، وليه بتكلمه، وإيه المطلوب بالظبط، وسهّل عليه الرد.', 'Say who you are in one line, why you are contacting them, and exactly what you want, and make it easy to reply.'),
          ex: 'Hi Ms Nour,\nI\'m a backend developer at Micro Tricks. I\'m reaching out because we\'d like to integrate with your API.\nCould we have a 20-minute call this week?\nBest regards,' },
        'g:would like',
        { h: B('formal ولا informal؟', 'Formal or informal?'),
          p: B('Hi + الاسم الأول لأغلب الشغل. Dear + اللقب للرسمي. Hey للأصحاب بس. وجمل زي «Hope you\'re well» عادية ومش لازم.', 'Hi + first name for most work. Dear + title for formal emails. Hey only for friends. "Hope you\'re well" is fine but optional.'),
          ex: 'Formal: I would appreciate it if you could…\nNeutral: Could you…?\nInformal: Can you…?' }
      ],
      practice: [
        B('اكتب إيميل تعريف بنفسك لفريق جديد في 6 جمل.', 'Write a 6-sentence email introducing yourself to a new team.'),
        B('اكتب إيميل أول تواصل لشركة عايز تشتغل معاها.', 'Write a first-contact email to a company you want to work with.'),
        B('اكتب نفس الطلب 3 مرات: formal وneutral وinformal.', 'Write the same request three times: formal, neutral and informal.'),
        B('اكتب إشعار (notification) للفريق عن صيانة مخططة مع الميعاد والتأثير.', 'Write a team notice about planned maintenance with the time and the impact.')
      ],
      words: ['notification', 'SMTP', 'contact details', 'business card', 'confidential', 'policy', 'reach out'],
      read: [{ lib: 'Plain Language Guidelines', what: B('اقرا صفحة «Write for your audience» (أو أول قسم في الإرشادات).', 'Read "Write for your audience" (or the first section of the guidelines).') }],
      challenge: B('اكتب «email templates» شخصية: 5 قوالب بتستخدمها كتير (أول تواصل، متابعة، اعتذار، رفض، إرسال ملف).', 'Write your own email templates: 5 you use often (first contact, follow-up, apology, declining, sending a file).'),
      quiz: [
        { q: B('أنسب تحية لعميل أول مرة:', 'The best greeting for a first-time client:'), o: ['Hey dude,', 'Dear Mr Ahmed,', 'Yo,'], a: 1, why: B('رسمي في أول تواصل.', 'Formal for a first contact.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I would like to schedule a call.', 'I would like schedule a call.', 'I would like scheduling a call.'], a: 0, why: B('would like + to.', 'would like + to.') },
        { q: B('confidential معناها:', 'confidential means:'), o: [B('سري', 'secret / private'), B('مؤكد', 'confirmed'), B('واثق', 'confident')], a: 0, why: B('متتشاركش برّه.', 'Not to be shared outside.') }
      ] },

    { title: B('المكالمات', 'Phone calls'),
      goal: B('ترد على مكالمة شغل، وتطلب حد، وتسيب رسالة، وتتعامل مع خط وحش.', 'Answer a work call, ask for someone, leave a message and handle a bad line.'),
      learn: [
        { h: B('جمل المكالمة', 'Phone phrases'),
          p: B('Hello, Mahmoud speaking. / Could I speak to Sara, please? / Hold on, I\'ll put you through. / Can I take a message? / Could you call me back?', 'Hello, Mahmoud speaking. / Could I speak to Sara, please? / Hold on, I\'ll put you through. / Can I take a message? / Could you call me back?'),
          ex: 'A: Hi, could I speak to the support team?\nB: Speaking. How can I help?\nA: Sorry, you\'re breaking up. Could you say that again?' },
        'g:can و could و be able to',
        { h: B('لما متفهمش', 'When you don\'t understand'),
          p: B('Sorry, could you repeat that? / Could you speak a bit more slowly? / Could you spell that for me? / So, just to confirm, you mean…?', 'Sorry, could you repeat that? / Could you speak a bit more slowly? / Could you spell that for me? / So, just to confirm, you mean…?'),
          ex: 'Could you spell your email address? M-A-H…' }
      ],
      practice: [
        B('اكتب حوار مكالمة قصير (8 سطور) بتطلب فيه دعم فني.', 'Write a short 8-line call dialogue asking for tech support.'),
        B('سجّل نفسك وانت بتسيب voicemail (رسالة صوتية) مدتها 30 ثانية.', 'Record yourself leaving a 30-second voicemail.'),
        B('تهجّى بصوت عالي إيميلك واسمك ورقم تليفون بالإنجليزي.', 'Spell your email, your name and a phone number out loud in English.'),
        B('اكتب 5 جمل تستخدمها لما الخط وحش أو متفهمش.', 'Write 5 sentences to use when the line is bad or you don\'t understand.')
      ],
      words: ['speaking (on the phone)', 'hold on / hold the line', 'put (someone) through', 'extension (phone)', 'call back', 'leave a message', 'bad line / breaking up'],
      read: [{ lib: 'ELLLO', what: B('اسمع محادثة قصيرة عن الشغل أو مكالمة، واقرا الـ transcript بعدها.', 'Listen to a short conversation about work or a phone call, then read the transcript.') }],
      challenge: B('اعمل مكالمة حقيقية بالإنجليزي (لخدمة عملاء أو صاحب) أو مثّلها مع حد، واكتب 3 جمل اتعلمتها.', 'Make a real English phone call (to customer service or a friend) or role-play one, and write 3 phrases you learned.'),
      quiz: [
        { q: B('ترد على التليفون في الشغل:', 'Answering the phone at work:'), o: ['Hello, Mahmoud speaking.', 'Hello, I am Mahmoud talking now.', 'Who are you?'], a: 0, why: B('الصيغة المعتادة.', 'The usual form.') },
        { q: B('«You\'re breaking up» معناها:', '"You\'re breaking up" means:'), o: [B('صوتك بيقطع', 'your voice is cutting out'), B('انت بتسيبني', 'you are leaving me'), B('انت زعلان', 'you are upset')], a: 0, why: B('الخط وحش.', 'The line is bad.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I couldn\'t to hear you.', 'I couldn\'t hear you.', 'I couldn\'t heard you.'], a: 1, why: B('could + الفعل في أصله.', 'could + the base verb.') }
      ] },

    { title: B('مراجعة الشهر التالت والاختبار', 'Month 3 review and test'),
      goal: B('راجع الأسبوع والشهر كله، وسلّم مشروع الشهر، وخد الاختبار. الأسبوع 13 بيفتح لما تجيب 70% أو أكتر.', 'Review the week and the whole month, hand in the month project, and take the test. Week 13 opens when you score 70% or more.'),
      review: [
        B('commits بالأمر، ووصف PR بقالب، واختصارات الريفيو.', 'Imperative commits, a templated PR description, and review shorthand.'),
        B('README: أول 3 سطور، وUsage بأمثلة، وترقيم سليم، وكلام مختصر.', 'README: the first three lines, Usage with examples, correct punctuation and concise text.'),
        B('bug report: عنوان محدد، وخطوات، وExpected/Actual، وEnvironment.', 'Bug reports: a specific title, steps, Expected/Actual and Environment.'),
        B('الإيميل: subject واضح، وافتتاحية، وطلب مؤدب، وخاتمة.', 'Email: a clear subject, an opening, a polite request and a closing.'),
        B('look forward to + ing، وWould you mind + ing، والسؤال غير المباشر.', 'look forward to + -ing, Would you mind + -ing, and indirect questions.'),
        B('المكالمات: speaking، hold on، breaking up، could you repeat that?', 'Calls: speaking, hold on, breaking up, could you repeat that?')
      ],
      project: B('مشروع الشهر: «أسبوع شغل مكتوب»: اكتب لنفس المشروع 3 commits وPR كامل وREADME محدّث وbug report وإيميل لعميل بيبلّغه بالتحديث وبيعتذر عن تأخير صغير. كل حاجة بقواعدها. وبعدين راجع كل النصوص بـ LanguageTool وقارن قبل وبعد.',
                 'Month project: "a written work week": for the same project write 3 commits, a complete PR, an updated README, a bug report, and an email to a client announcing the update and apologising for a small delay — each by its own rules. Then check every text with LanguageTool and compare before and after.'),
      test: [
        { q: B('أحسن عنوان commit:', 'The best commit subject:'), o: ['Updated stuff.', 'Add retry to the email sender', 'adding retries and fixing things and docs'], a: 1, why: B('أمر، واحد، محدد.', 'Imperative, single, specific.') },
        { q: B('PTAL في رسالة لزميل معناها:', 'PTAL in a message to a teammate means:'), o: ['please take a look', 'push to all', 'pull the latest'], a: 0, why: B('طلب مراجعة.', 'A request to review.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Its a small change.', 'It\'s a small change.', 'Its\' a small change.'], a: 1, why: B('it\'s = it is.', 'it\'s = it is.') },
        { q: B('أول حاجة في README بعد العنوان:', 'The first thing in a README after the title:'), o: [B('وصف في جملة', 'a one-sentence description'), B('قايمة التغييرات', 'the changelog'), B('الـ License', 'the License')], a: 0, why: B('المشروع بيعمل إيه.', 'What the project does.') },
        { q: B('Expected vs Actual في bug report:', 'Expected vs. Actual in a bug report:'), o: [B('اللي المفروض ضد اللي حصل', 'what should happen vs. what happened'), B('الموعد ضد التأخير', 'the deadline vs. the delay'), B('السعر ضد التكلفة', 'price vs. cost')], a: 0, why: B('قلب الـ bug report.', 'The heart of a bug report.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I was testing the app when it crashed.', 'I tested the app when it was crashing always.', 'I have tested when it crashed.'], a: 0, why: B('past continuous + past simple.', 'past continuous + past simple.') },
        { q: B('أحسن subject line:', 'The best subject line:'), o: ['Important!!!', 'Action needed: sign the contract by Friday', 'Hello'], a: 1, why: B('المطلوب والموعد.', 'The ask and the deadline.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I look forward to work with you.', 'I look forward to working with you.', 'I look forward working with you.'], a: 1, why: B('to + ing.', 'to + -ing.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Could you tell me when is the meeting?', 'Could you tell me when the meeting is?', 'Could you tell me when meeting?'], a: 1, why: B('ترتيب عادي في السؤال غير المباشر.', 'Normal order in an indirect question.') },
        { q: B('أحسن رفض:', 'The best way to say no:'), o: ['No.', 'I\'m afraid we can\'t do that this week, but we can next week.', 'Impossible!!!'], a: 1, why: B('مؤدب ومعاه بديل.', 'Polite, with an alternative.') },
        { q: B('«Please find attached the report» معناها:', '"Please find attached the report" means:'), o: [B('التقرير مرفق', 'the report is attached'), B('دوّر على التقرير', 'look for the report'), B('التقرير ضاع', 'the report is lost')], a: 0, why: B('جملة إرفاق رسمية.', 'A formal attachment phrase.') },
        { q: B('لما متسمعش في مكالمة:', 'When you can\'t hear on a call:'), o: ['What?', 'Sorry, could you repeat that?', 'Speak!'], a: 1, why: B('مؤدب ومباشر.', 'Polite and direct.') }
      ] }
  ]
};
