// Week 22 — The job offer, the workplace and business travel.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'B2 → C1',
  title: B('العرض الوظيفي وبيئة الشغل والسفر', 'The job offer, the workplace and business travel'),
  goal: B('تتفاوض على عرض شغل، وتفهم كلام الموارد البشرية والأجازات والاستقالة، وتسافر لشغل بالإنجليزي من المطار للفندق للمكتب.',
          'Negotiate a job offer, understand the language of HR, leave and resignation, and travel for work in English from the airport to the hotel to the office.'),
  days: [
    { title: B('العرض الوظيفي', 'The job offer'),
      goal: B('ترد على عرض شغل: تشكر، وتسأل عن التفاصيل، وتتفاوض على المرتب والمزايا بأدب.', 'Reply to a job offer: thank them, ask about the details, and negotiate salary and benefits politely.'),
      learn: [
        { h: B('مكونات العرض', 'What an offer includes'),
          p: B('salary (المرتب، سنوي غالبًا)، benefits (تأمين صحي، أجازات، تدريب)، start date، probation period (فترة اختبار)، notice period (مدة الإخطار قبل الاستقالة)، remote policy.', 'salary (usually yearly), benefits (health insurance, leave, training), start date, probation period, notice period, remote policy.'),
          ex: 'The offer includes a salary of USD 30,000 a year, 21 days of paid leave and a training budget.' },
        { h: B('التفاوض بأدب', 'Negotiating politely'),
          p: B('Thank you for the offer — I\'m excited about the role. / Based on my experience and the market, I was hoping for… / Is there any flexibility on…? / Could we discuss the start date?', 'Thank you for the offer — I\'m excited about the role. / Based on my experience and the market, I was hoping for… / Is there any flexibility on…? / Could we discuss the start date?'),
          ex: 'I\'m very happy to receive the offer. Is there any flexibility on the salary, perhaps closer to USD 34,000?' },
        { h: B('الأهداف والمراجع', 'Goals and references'),
          p: B('career goals = أهدافك المهنية. references = ناس تشهد لشغلك. promotion = ترقية. relocate = تنقل لمدينة أو بلد تانية.', 'career goals, references (people who vouch for your work), promotion, relocate (move to another city or country).'),
          ex: 'I can provide two references from my previous clients.\nThe role requires relocating to Dubai within three months.' }
      ],
      practice: [
        B('اكتب رد على عرض شغل بتشكر فيه وتسأل 3 أسئلة.', 'Write a reply to a job offer that thanks them and asks 3 questions.'),
        B('اكتب إيميل تفاوض مؤدب على المرتب.', 'Write a polite salary negotiation email.'),
        B('اكتب «career goals» بتاعتك في 4 جمل.', 'Write your career goals in 4 sentences.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['job offer', 'salary', 'benefits', 'references', 'relocate', 'career goals', 'promotion'],
      read: [{ lib: 'Tech Interview Handbook', what: B('اقرا قسم «Negotiation» وطلّع 3 نصايح.', 'Read the "Negotiation" section and pick out 3 tips.') }],
      challenge: B('مثّل مكالمة تفاوض على عرض شغل (5 دقايق) مع حد، واكتب بعدها إيميل بيأكد اللي اتفقتوا عليه.', 'Role-play a 5-minute job-offer negotiation call with someone, then write an email confirming what you agreed.'),
      quiz: [
        { q: B('notice period هي:', 'The notice period is:'), o: [B('المدة اللي لازم تبلّغ بيها قبل ما تسيب الشغل', 'how long you must warn before leaving a job'), B('فترة الأجازة', 'the holiday period'), B('وقت الاجتماع', 'meeting time')], a: 0, why: B('غالبًا شهر.', 'Often one month.') },
        { q: B('تفاوض مؤدب:', 'Polite negotiation:'), o: ['Give me more money.', 'Is there any flexibility on the salary?', 'This is too low, no.'], a: 1, why: B('سؤال مفتوح.', 'An open question.') },
        { q: B('benefits هي:', 'benefits are:'), o: [B('مزايا زي التأمين والأجازات', 'extras such as insurance and leave'), B('الأرباح', 'profits'), B('المرتب بس', 'only the salary')], a: 0, why: B('حاجات غير المرتب.', 'Things besides salary.') }
      ] },

    { title: B('بيئة الشغل', 'The workplace'),
      goal: B('توصف شركة ومكان شغل: المقر والفروع، والناس، وremote ولا hybrid، والشيفتات.', 'Describe a company and a workplace: HQ and branches, the people, remote or hybrid, and shifts.'),
      learn: [
        { h: B('وصف الشركة', 'Describing a company'),
          p: B('The company has about 200 staff. Its headquarters are in Cairo, with branches in Dubai and Riyadh. Most engineers work remotely; the sales team is on-site.', 'The company has about 200 staff. Its headquarters are in Cairo, with branches in Dubai and Riyadh. Most engineers work remotely; the sales team is on-site.'),
          ex: 'We have a hybrid policy: three days in the office, two from home.' },
        { h: B('employer وemployee', 'employer and employee'),
          p: B('employer = صاحب الشغل (الشركة)، employee = الموظف، staff = الموظفين كلهم (بدون s)، colleague = زميل. وreceptionist = موظف الاستقبال.', 'employer = the company that hires, employee = the person hired, staff = all the employees (no s), colleague = a co-worker, receptionist = front-desk staff.'),
          ex: '✗ We have 50 staffs.  ✓ We have 50 staff members.' },
        'g:Countable و uncountable'
      ],
      practice: [
        B('اوصف شركتك أو شركة تحلم تشتغل فيها في 6 جمل.', 'Describe your company, or one you dream of joining, in 6 sentences.'),
        B('اكتب سياسة شغل remote/hybrid لفريق صغير في 5 جمل.', 'Write a remote/hybrid policy for a small team in 5 sentences.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.'),
        B('اكتب حوار في الاستقبال في أول يوم شغل (6 سطور).', 'Write a 6-line dialogue at reception on your first day.')
      ],
      words: ['employee / employer', 'staff', 'receptionist', 'headquarters (HQ)', 'branch (office)', 'remote / on-site / hybrid', 'shift'],
      read: [{ lib: 'BBC Learning English', what: B('دوّر على درس عن «the workplace» أو «office English».', 'Search for a lesson about "the workplace" or "office English".') }],
      challenge: B('اكتب «first week plan» لنفسك في شغل جديد: تقابل مين، وتقرا إيه، وتسأل إيه، بالإنجليزي.', 'Write your own English "first week plan" for a new job: who to meet, what to read and what to ask.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['We have 50 staffs.', 'We have 50 staff.', 'We have 50 staff\'s.'], a: 1, why: B('staff جماعي من غير s.', 'staff is a collective noun without s.') },
        { q: B('hybrid يعني:', 'hybrid means:'), o: [B('شوية من البيت وشوية من المكتب', 'partly from home, partly in the office'), B('من البيت بس', 'only from home'), B('في المكتب بس', 'only in the office')], a: 0, why: B('مزيج.', 'A mix.') },
        { q: B('employer هو:', 'The employer is:'), o: [B('الشركة اللي بتشغّلك', 'the company that employs you'), B('الموظف', 'the employee'), B('العميل', 'the client')], a: 0, why: B('er = اللي بيعمل الفعل.', '-er = the one who employs.') }
      ] },

    { title: B('الأجازات والموارد البشرية', 'Leave and HR'),
      goal: B('تطلب أجازة، وتبلّغ إنك عيّان، وتتكلم عن الـ overtime، وتكتب استقالة محترمة.', 'Request leave, report sick, talk about overtime, and write a respectful resignation.'),
      learn: [
        { h: B('طلب أجازة', 'Requesting leave'),
          p: B('I\'d like to request annual leave from 10 to 14 March. / I\'m sick today and won\'t be able to work. / I\'ll be on sick leave until Thursday. وقول مين يغطّي.', 'I\'d like to request annual leave from 10 to 14 March. / I\'m sick today and won\'t be able to work. / I\'ll be on sick leave until Thursday. Say who is covering.'),
          ex: 'Hi Sara, I\'m not feeling well today, so I\'ll take a sick day. Ali can cover the deploy. I hope to feel better tomorrow.' },
        { h: B('الاستقالة', 'Resigning'),
          p: B('رسالة قصيرة وشاكرة: القرار، وآخر يوم حسب الـ notice period، والشكر، وعرض تساعد في التسليم. من غير شكاوى.', 'A short, grateful letter: the decision, your last day according to the notice period, thanks, and an offer to help with the handover. No complaints.'),
          ex: 'I\'m writing to resign from my position as Backend Developer. My last day will be 30 November. Thank you for the support over the past two years. I\'m happy to help with the handover.' },
        'g:would like'
      ],
      practice: [
        B('اكتب طلب أجازة سنوية بمواعيد ومين يغطّي.', 'Write an annual-leave request with dates and who will cover.'),
        B('اكتب رسالة sick day قصيرة.', 'Write a short sick-day message.'),
        B('اكتب خطاب استقالة محترم (5 سطور).', 'Write a respectful resignation letter (5 lines).'),
        B('اكتب 3 جمل عن الـ overtime وإنه لازم يبقى استثناء.', 'Write 3 sentences about overtime and why it should be the exception.')
      ],
      words: ['overtime', 'leave / day off', 'resign / resignation', 'sick / ill', 'sick leave', 'medicine', 'feel better'],
      read: [{ lib: 'Breaking News English', what: B('اقرا خبر عن الشغل أو الصحة في مستوى 4.', 'Read a level-4 story about work or health.') }],
      challenge: B('اكتب «HR messages kit»: طلب أجازة، وsick day، وطلب شغل من البيت، واستقالة، كقوالب جاهزة.', 'Write an "HR messages kit": leave request, sick day, work-from-home request and resignation, as ready templates.'),
      quiz: [
        { q: B('sick leave هي:', 'sick leave is:'), o: [B('أجازة مرضية', 'time off because you are ill'), B('أجازة سنوية', 'annual holiday'), B('استقالة', 'resignation')], a: 0, why: B('sick = مريض.', 'sick = ill.') },
        { q: B('خطاب الاستقالة الكويس:', 'A good resignation letter:'), o: [B('قصير وشاكر ومن غير شكاوى', 'short, grateful and without complaints'), B('فيه كل المشاكل', 'lists every problem'), B('من غير تاريخ', 'has no date')], a: 0, why: B('سيب الباب مفتوح.', 'Leave on good terms.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I would like request leave.', 'I would like to request leave.', 'I would like requesting leave.'], a: 1, why: B('would like + to.', 'would like + to.') }
      ] },

    { title: B('السفر للشغل: الحجز والمطار', 'Business travel: booking and the airport'),
      goal: B('تحجز وتسافر: الطيران، والجواز والفيزا، والـ check-in، والشنط.', 'Book and travel: flights, passport and visa, check-in and luggage.'),
      learn: [
        { h: B('في المطار', 'At the airport'),
          p: B('Where\'s the check-in desk for…? / I\'d like a window seat. / How many bags can I check in? / Is the flight on time? / My flight is delayed by two hours.', 'Where\'s the check-in desk for…? / I\'d like a window seat. / How many bags can I check in? / Is the flight on time? / My flight is delayed by two hours.'),
          ex: 'I have one carry-on bag and one checked bag.\nBoarding starts at gate 12 at 10:40.' },
        { h: B('الحجز', 'Booking'),
          p: B('I\'d like to book a flight / a room for two nights. / Is breakfast included? / Could you send me the booking confirmation? / I need to change my reservation.', 'I\'d like to book a flight / a room for two nights. / Is breakfast included? / Could you send me the booking confirmation? / I need to change my reservation.'),
          ex: 'I booked a return ticket to Riyadh, leaving on Sunday and coming back on Thursday.' },
        'g:حروف الجر للمكان'
      ],
      practice: [
        B('اكتب حوار check-in في المطار (8 سطور).', 'Write an 8-line check-in dialogue at the airport.'),
        B('اكتب إيميل حجز فندق لرحلة شغل.', 'Write an email booking a hotel for a work trip.'),
        B('اكتب رسالة لفريقك إن رحلتك اتأخرت وهتوصل إمتى.', 'Write a team message saying your flight is delayed and when you will arrive.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['flight', 'passport', 'ticket', 'booking / reservation', 'check in / check out', 'luggage / bags', 'visa'],
      read: [{ lib: 'ELLLO', what: B('اسمع محادثة عن السفر أو المطار واقرا الـ transcript.', 'Listen to a conversation about travel or airports and read the transcript.') }],
      challenge: B('خطط رحلة شغل متخيّلة كاملة بالإنجليزي: الحجوزات، والمواعيد، ورسالة للعميل إنك واصل.', 'Plan an imagined business trip entirely in English: bookings, times, and a message telling the client you have arrived.'),
      quiz: [
        { q: B('«My flight is delayed» معناها:', '"My flight is delayed" means:'), o: [B('الرحلة اتأخرت', 'the flight is late'), B('الرحلة اتلغت', 'the flight is cancelled'), B('الرحلة بدري', 'the flight is early')], a: 0, why: B('delay = تأخير.', 'delay = lateness.') },
        { q: B('luggage هي:', 'luggage is:'), o: [B('الشنط', 'bags'), B('التذكرة', 'the ticket'), B('الجواز', 'the passport')], a: 0, why: B('ومش معدودة: luggage مش luggages.', 'Uncountable: not "luggages".') },
        { q: B('check in في الفندق يعني:', 'check in at a hotel means:'), o: [B('تسجّل وصولك', 'register your arrival'), B('تمشي', 'leave'), B('تدفع بس', 'only pay')], a: 0, why: B('check out = تمشي.', 'check out = leave.') }
      ] },

    { title: B('التحرك في المدينة', 'Getting around the city'),
      goal: B('تسأل عن الطريق وتفهم الاتجاهات، وتاخد تاكسي، وتوصل للمكتب في الميعاد.', 'Ask for and understand directions, take a taxi, and get to the office on time.'),
      learn: [
        { h: B('الاتجاهات', 'Directions'),
          p: B('Go straight ahead. / Turn left at the traffic lights. / It\'s next to the bank, opposite the station. / Take the second right. / It\'s about a 10-minute walk.', 'Go straight ahead. / Turn left at the traffic lights. / It\'s next to the bank, opposite the station. / Take the second right. / It\'s about a 10-minute walk.'),
          ex: 'Excuse me, could you tell me how to get to the Tech Hub building?' },
        { h: B('التاكسي والزحمة', 'Taxis and traffic'),
          p: B('Could you take me to…, please? / How long will it take? / There\'s heavy traffic, so I\'ll be about 15 minutes late. / Can I pay by card?', 'Could you take me to…, please? / How long will it take? / There\'s heavy traffic, so I\'ll be about 15 minutes late. / Can I pay by card?'),
          ex: 'Hi Omar, I\'m stuck in traffic. I\'ll be there by 10:15. Sorry for the delay.' },
        'g:السؤال الغير مباشر'
      ],
      practice: [
        B('اكتب اتجاهات من بيتك لأقرب محطة بالإنجليزي.', 'Write directions from your home to the nearest station in English.'),
        B('اكتب رسالة إنك متأخر بسبب الزحمة.', 'Write a message saying you\'re late because of traffic.'),
        B('اكتب 4 أسئلة غير مباشرة عن الطريق.', 'Write 4 indirect questions about the way.'),
        B('اكتب 7 جمل بكلمات النهارده.', 'Write 7 sentences with today\'s words.')
      ],
      words: ['delay / delayed', 'airport / station', 'taxi / ride', 'traffic', 'directions', 'turn left / right', 'straight ahead'],
      read: [{ lib: 'VOA Learning English', what: B('اسمع قصة قصيرة عن مدينة أو سفر بالسرعة البطيئة.', 'Listen to a short story about a city or travel at the slow speed.') }],
      challenge: B('افتح خريطة لمدينة أجنبية واكتب اتجاهات من الفندق للمكتب، وقولها بصوت عالي كأنك بتشرحها لزميل.', 'Open a map of a foreign city, write directions from the hotel to the office, and say them out loud as if explaining to a colleague.'),
      quiz: [
        { q: B('«It\'s opposite the station» معناها:', '"It\'s opposite the station" means:'), o: [B('قصاد المحطة', 'across from the station'), B('جوه المحطة', 'inside the station'), B('بعيد عن المحطة', 'far from the station')], a: 0, why: B('opposite = في الناحية التانية قصاده.', 'opposite = facing it on the other side.') },
        { q: B('اختار السؤال غير المباشر الصح:', 'Choose the correct indirect question:'), o: ['Could you tell me where is the office?', 'Could you tell me where the office is?', 'Could you tell me the office where?'], a: 1, why: B('ترتيب عادي.', 'Normal word order.') },
        { q: B('straight ahead يعني:', 'straight ahead means:'), o: [B('على طول قدامك', 'directly forward'), B('يمين', 'right'), B('ارجع', 'go back')], a: 0, why: B('من غير لف.', 'Without turning.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 23 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 23 opens when you score 70% or more.'),
      review: [
        B('العرض: salary / benefits / notice period، والتفاوض بـ Is there any flexibility…?', 'The offer: salary / benefits / notice period, and negotiating with Is there any flexibility…?'),
        B('بيئة الشغل: HQ / branch / hybrid / staff.', 'The workplace: HQ / branch / hybrid / staff.'),
        B('HR: طلب أجازة، sick day، استقالة محترمة.', 'HR: leave requests, sick days, a respectful resignation.'),
        B('المطار والحجز: check in، delayed، luggage.', 'The airport and bookings: check in, delayed, luggage.'),
        B('الاتجاهات: straight ahead، turn left، opposite، next to.', 'Directions: straight ahead, turn left, opposite, next to.')
      ],
      project: B('اكتب «relocation pack» لنفسك كأنك اتقبلت في شغل في بلد تانية: رد على العرض بتفاوض بسيط، وإيميل للـ HR عن الـ start date والأجازة، وحجز طيران وفندق، ورسالة للفريق يوم الوصول، واتجاهات من الفندق للمكتب. وسجّل مكالمة تفاوض قصيرة.',
                 'Write your own "relocation pack" as if you had accepted a job abroad: a reply to the offer with light negotiation, an email to HR about the start date and leave, a flight and hotel booking, a message to the team on arrival day, and directions from the hotel to the office. Record a short negotiation call.'),
      test: [
        { q: B('probation period هي:', 'A probation period is:'), o: [B('فترة اختبار في أول الشغل', 'a trial period at the start of a job'), B('أجازة', 'a holiday'), B('عقوبة', 'a punishment')], a: 0, why: B('غالبًا 3 شهور.', 'Often three months.') },
        { q: B('أحسن رد على عرض شغل:', 'The best reply to a job offer:'), o: ['OK.', 'Thank you for the offer — I\'m excited. Could we discuss the start date?', 'Too low.'], a: 1, why: B('شكر + سؤال.', 'Thanks + a question.') },
        { q: B('relocate يعني:', 'relocate means:'), o: [B('تنقل لمكان تاني', 'move to another place'), B('تستقيل', 'resign'), B('تترقى', 'get promoted')], a: 0, why: B('location = مكان.', 'location = place.') },
        { q: B('headquarters هو:', 'headquarters is:'), o: [B('المقر الرئيسي', 'the main office'), B('فرع', 'a branch'), B('مخزن', 'a warehouse')], a: 0, why: B('HQ.', 'HQ.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The staff is 30 peoples.', 'We have 30 staff members.', 'We have 30 staffs.'], a: 1, why: B('staff members.', 'staff members.') },
        { q: B('أحسن رسالة sick day:', 'The best sick-day message:'), o: ['Not coming.', 'I\'m not feeling well, so I\'ll take a sick day. Ali can cover the deploy.', 'I\'m sick, bye.'], a: 1, why: B('السبب ومين يغطّي.', 'The reason and who covers.') },
        { q: B('في خطاب الاستقالة:', 'In a resignation letter:'), o: [B('آخر يوم + شكر + مساعدة في التسليم', 'last day + thanks + help with handover'), B('كل الشكاوى', 'all your complaints'), B('من غير تاريخ', 'no date')], a: 0, why: B('احترافي.', 'Professional.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I have two luggages.', 'I have two bags.', 'I have two luggage.'], a: 1, why: B('luggage مش معدودة؛ bags معدودة.', 'luggage is uncountable; bags are countable.') },
        { q: B('visa هي:', 'A visa is:'), o: [B('تصريح دخول بلد', 'permission to enter a country'), B('كارت فلوس بس', 'only a credit card'), B('تذكرة', 'a ticket')], a: 0, why: B('في السفر.', 'In travel.') },
        { q: B('«Take the second right» معناها:', '"Take the second right" means:'), o: [B('خد تاني شارع يمين', 'turn into the second street on the right'), B('ارجع مرتين', 'go back twice'), B('خد تاكسي', 'take a taxi')], a: 0, why: B('اتجاهات.', 'Directions.') },
        { q: B('أحسن رسالة لو متأخر:', 'The best message if you\'re late:'), o: ['Late.', 'I\'m stuck in traffic and will be there by 10:15. Sorry for the delay.', 'Traffic!!!'], a: 1, why: B('السبب والميعاد الجديد.', 'The reason and the new time.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Could you tell me how I get to the station?', 'Could you tell me how do I get to the station?', 'Could you tell me how get I to the station?'], a: 0, why: B('ترتيب عادي في السؤال غير المباشر.', 'Normal order in an indirect question.') }
      ] }
  ]
};
