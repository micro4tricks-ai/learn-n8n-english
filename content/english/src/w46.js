// English week 46 — Senior-level interviews.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C2',
  title: B('مقابلات المستوى السينيور', 'Senior-level interviews'),
  goal: B('تعدّي مقابلات الوظايف الكبيرة بالإنجليزي: تحكي مسيرتك كقصة تأثير، تقود مقابلة system design بصوت عالي، تحكي قصص قيادة وفشل بنضج، تسأل أسئلة ذكية وتلاحظ العلامات الحمرا، وتتفاوض على العرض كله مش المرتب بس.',
          'Pass senior job interviews in English: tell your career as a story of impact, lead a system design interview out loud, tell leadership and failure stories with maturity, ask smart questions and spot red flags, and negotiate the whole offer, not just the salary.'),
  days: [
    { title: B('توقعات المستوى السينيور', 'Senior expectations'),
      goal: B('تفهم إيه اللي بيتقاس فعلًا.', 'Understand what is really being assessed.'),
      learn: [
        L(B('المستويات', 'Levels'),
          B('الشركات عندها **leveling** (سلم مستويات): mid → **senior engineer** (بيسلّم مشاريع لوحده ويرفع الفريق) → **staff engineer** (تأثير على فرق كتير واتجاه تقني) → principal. **tech lead** = دور قيادة فريق تقني (مش دايمًا مستوى). المقابلة بتقيس النطاق والتأثير، مش بس المعرفة.', 'Companies have **leveling** (a ladder of levels): mid → **senior engineer** (delivers projects independently and lifts the team) → **staff engineer** (influence across many teams and technical direction) → principal. A **tech lead** = a role leading a technical team (not always a level). The interview assesses scope and impact, not just knowledge.'),
          'mid:    "I built the invoice workflow."\nsenior: "I designed and delivered the invoice automation, and coached two juniors to maintain it."\nstaff:  "I set the automation standards that five teams now use, which cut incidents by 60%."'),
        L(B('قصة مسيرتك', 'Your career narrative'),
          B('«Tell me about yourself» = فرصتك لـ **career narrative**: خيط واحد بيربط خطواتك («I’ve always moved toward removing manual work at scale»)، 2–3 محطات بأرقام، وليه الوظيفة دي الخطوة المنطقية الجاية. دقيقتين بالكتير.', '«Tell me about yourself» = your chance for a **career narrative**: one thread linking your steps («I’ve always moved toward removing manual work at scale»), 2–3 milestones with numbers, and why this job is the logical next step. Two minutes at most.'),
          '"I’m an automation engineer focused on removing manual work at scale. I started in operations, where I automated our own reporting and saved 15 hours a week. Since then I’ve built n8n and Python systems for 20 clients in the Gulf, including an invoice platform processing 40,000 documents a month. I’m now looking to set direction across teams — which is why the staff role here interests me."'),
        L(B('التأثير من غير سلطة', 'Influence without authority'),
          B('أهم مهارة للسينيور: **influence without authority** = تقنع ناس مش تبعك (فرق تانية، مديرين) بالبيانات والعلاقات والنماذج. و**cross-functional** = شغل مع أقسام مختلفة (مالية، مبيعات، قانونية). جهّز قصص للاتنين.', 'The key senior skill: **influence without authority** = persuading people who do not report to you (other teams, managers) with data, relationships and prototypes. And **cross-functional** = working across departments (finance, sales, legal). Prepare stories for both.'),
          '"Finance didn’t report to me, and they were sceptical about automation. I built a two-day prototype on their real March data, showed it caught 14 errors they had missed, and offered to keep the manual process in parallel for a month. They signed up the following week."')
      ],
      practice: [
        B('اكتب نفس الإنجاز بصياغة mid وsenior وstaff.', 'Write the same achievement at mid, senior and staff levels.'),
        B('اكتب career narrative في دقيقتين وسجّلها.', 'Write a two-minute career narrative and record it.'),
        B('اكتب قصة influence without authority.', 'Write an influence-without-authority story.'),
        B('اكتب قصة شغل cross-functional.', 'Write a cross-functional work story.')
      ],
      words: [
        W('leveling', 'سلم المستويات الوظيفية', 'a company’s ladder of job levels', 'Ask how leveling works here.'),
        W('senior engineer', 'مهندس سينيور', 'an experienced independent engineer', 'Senior engineers lift the team.'),
        W('staff engineer', 'مهندس بتأثير على فرق كتير', 'an engineer with cross-team influence', 'A staff engineer sets direction.'),
        W('tech lead', 'قائد تقني لفريق', 'the technical leader of a team', 'She is the tech lead on payments.'),
        W('career narrative', 'قصة مسيرتك المهنية', 'the story linking your career', 'Practise your career narrative.'),
        W('influence without authority', 'تأثير من غير سلطة', 'persuading people who don’t report to you', 'Influence without authority is a senior skill.'),
        W('cross-functional', 'بين أقسام مختلفة', 'involving several departments', 'It was a cross-functional project.')
      ],
      read: [{ lib: 'Tech Interview Handbook', what: B('اقرا عن المقابلات السلوكية للسينيور.', 'Read about behavioural interviews for senior roles.') }],
      challenge: B('سجّل «Tell me about yourself» بالإنجليزي في دقيقتين بالظبط بخيط واحد و3 أرقام، واسمعها وقيّم: هل بتبان سينيور ولا mid؟ أعد التسجيل.', 'Record «Tell me about yourself» in English in exactly two minutes with one thread and 3 numbers, then listen and judge: do you sound senior or mid? Record it again.'),
      quiz: [
        Q(B('صياغة سينيور:', 'Senior wording:'), ['I designed and delivered it, and coached two juniors.', 'I helped a bit.', 'I was told to build it.'], 0, B('نطاق.', 'Scope.')),
        Q(B('career narrative:', 'A career narrative:'), ['one thread, milestones with numbers, why this job', 'your full CV read aloud', 'your hobbies'], 0, B('خيط.', 'A thread.')),
        Q(B('influence without authority:', 'Influence without authority:'), ['persuading people who don’t report to you', 'giving orders', 'having no influence'], 0, B('إقناع.', 'Persuasion.'))
      ] },

    { title: B('مقابلة تصميم الأنظمة', 'The system design interview'),
      goal: B('تقود النقاش وتفكر بصوت عالي.', 'Lead the discussion and think out loud.'),
      learn: [
        L(B('حدّد المشكلة', 'Scope the problem'),
          B('**system design** interview بتبدأ بسؤال مفتوح («Design a WhatsApp order bot»). أول 5 دقايق: **scope the problem** و**requirements gathering**: مين المستخدمين؟ كام؟ إيه أهم ميزة؟ إيه المش مطلوب؟ متبدأش ترسم على طول.', 'A **system design** interview starts with an open question («Design a WhatsApp order bot»). The first 5 minutes: **scope the problem** and do **requirements gathering**: who are the users? how many? what is the key feature? what is out of scope? Do not start drawing immediately.'),
          '"Before I design anything, can I check a few requirements? How many orders a day are we expecting? Do we need to support Arabic and English? Is payment in scope, or only order taking? And what matters more here — speed of delivery or cost?"'),
        L(B('الأرقام التقريبية', 'Rough numbers'),
          B('**back-of-the-envelope** calculation = حساب تقريبي سريع. **capacity estimate** = تقدير الحمل (طلبات/ثانية، تخزين). قول الحساب بصوت عالي: المحاور عايز يشوف طريقة تفكيرك أكتر من الرقم.', 'A **back-of-the-envelope** calculation = a quick rough calculation. A **capacity estimate** = estimating load (requests/second, storage). Say the calculation aloud: the interviewer wants to see your reasoning more than the number.'),
          '"Let’s do a quick back-of-the-envelope estimate. 50,000 orders a day is about 0.6 a second on average; with a 10× peak during sales, call it 6 a second. Each order is about 2 KB, so 100 MB a day, or roughly 36 GB a year — a single Postgres instance handles that easily."'),
        L(B('الموازنات بصوت عالي', 'Trade-offs out loud'),
          B('**think aloud** = تقول اللي في دماغك وانت بتفكر. **trade-off discussion** = تعرض اختيارين بمزايا وعيوب وتختار بسبب. جمل مفيدة: «One option is… the downside is…», «Given the requirement for…, I’d go with…», «If traffic grew 100×, I’d revisit…». و**single point of failure** = حتة لو وقعت النظام كله يقع.', 'To **think aloud** = to say what is in your head as you reason. A **trade-off discussion** = presenting two options with pros and cons and choosing for a reason. Useful phrases: «One option is… the downside is…», «Given the requirement for…, I’d go with…», «If traffic grew 100×, I’d revisit…». And a **single point of failure** = a part whose failure brings down the whole system.'),
          '"One option is processing orders directly in the webhook — simple, but if the ERP is slow, WhatsApp retries and we get duplicates. The other is a queue with workers — more moving parts, but it absorbs peaks. Given the 10× sales peaks, I’d go with the queue. The database is now a single point of failure, so I’d add a replica."')
      ],
      practice: [
        B('اكتب 8 أسئلة requirements لـ 3 أنظمة.', 'Write 8 requirements questions for 3 systems.'),
        B('اعمل 3 حسابات back-of-the-envelope بصوت عالي.', 'Do 3 back-of-the-envelope calculations aloud.'),
        B('اكتب trade-off discussion بالجمل المفيدة.', 'Write a trade-off discussion using the useful phrases.'),
        B('حدّد single point of failure في نظام بنيته.', 'Identify a single point of failure in a system you built.')
      ],
      words: [
        W('system design', 'تصميم الأنظمة', 'planning a system’s architecture', 'The system design round lasts an hour.'),
        W('scope the problem', 'تحدد حدود المشكلة', 'to define what the problem includes', 'Scope the problem before drawing.'),
        W('requirements gathering', 'جمع المتطلبات', 'collecting what the system must do', 'Spend five minutes on requirements gathering.'),
        W('back-of-the-envelope', 'حساب تقريبي سريع', 'a quick rough calculation', 'A back-of-the-envelope estimate is enough.'),
        W('capacity estimate', 'تقدير الحمل', 'an estimate of load and storage', 'Start with a capacity estimate.'),
        W('think aloud', 'تفكر بصوت عالي', 'to say your reasoning as you go', 'Think aloud so they follow you.'),
        W('trade-off discussion', 'نقاش الموازنات', 'comparing options’ pros and cons', 'The trade-off discussion matters most.'),
        W('single point of failure', 'نقطة فشل وحيدة', 'a part that can stop everything', 'The database is a single point of failure.')
      ],
      read: [{ lib: 'roadmap.sh', what: B('شوف مسار system design.', 'See the system design roadmap.') }],
      challenge: B('اعمل مقابلة system design تمثيلية 30 دقيقة بالإنجليزي وسجّلها («Design an invoice processing system for 200 companies»): requirements، capacity estimate بصوت عالي، رسم، 2 trade-offs، single point of failure — واسمع: سكتّ كتير؟', 'Run a 30-minute mock system design interview in English and record it («Design an invoice processing system for 200 companies»): requirements, a capacity estimate out loud, a diagram, 2 trade-offs, a single point of failure — then listen: were you silent too long?'),
      quiz: [
        Q(B('أول خطوة:', 'The first step:'), ['ask about requirements and scope', 'draw the database', 'name a cloud provider'], 0, B('تحديد.', 'Scoping.')),
        Q(B('back-of-the-envelope:', 'Back-of-the-envelope:'), ['a quick rough calculation', 'a letter', 'an exact benchmark'], 0, B('تقريبي.', 'Rough.')),
        Q(B('جملة trade-off:', 'A trade-off sentence:'), ['Given the sales peaks, I’d go with a queue.', 'Queues are always best.', 'I don’t know.'], 0, B('سبب.', 'A reason.'))
      ] },

    { title: B('قصص القيادة والفشل', 'Leadership and failure stories'),
      goal: B('تحكي قصص بتبيّن نضج.', 'Tell stories that show maturity.'),
      learn: [
        L(B('قصة الفشل', 'The failure story'),
          B('«Tell me about a time you failed» = سؤال نضج. **failure story** كويسة: فشل حقيقي (مش «I work too hard»)، مسؤوليتك فيه بوضوح، اللي اتعلمته، وإزاي غيّرت شغلك بعدها بدليل. 60% من القصة عن اللي بعد الفشل.', '«Tell me about a time you failed» = a maturity question. A good **failure story**: a real failure (not «I work too hard»), your responsibility in it clearly, what you learned, and how you changed your work afterwards, with evidence. 60% of the story is about what came after the failure.'),
          '"In 2024 I launched a WhatsApp campaign workflow without rate limiting. On the first day it hit Meta’s limits and 3,000 customers got their messages six hours late. That was my call — I skipped load testing to meet the date. I apologised to the client, fixed it that night, and since then every workflow I ship has a load test in the checklist. We haven’t had a rate-limit incident since."'),
        L(B('الخلاف والإرشاد', 'Conflict and mentoring'),
          B('**conflict resolution**: احكي خلاف حقيقي مع زميل أو عميل، ركّز على فهم وجهة نظره، البيانات اللي حلّت الخلاف، والعلاقة بعدها. **mentorship**: حد ساعدته يتطور — إيه اللي عملته بالظبط، وهو بقى فين دلوقتي.', '**conflict resolution**: tell a real disagreement with a colleague or client, focusing on understanding their view, the data that settled it, and the relationship afterwards. **mentorship**: someone you helped grow — exactly what you did, and where they are now.'),
          'conflict: "Our backend lead wanted to rewrite the integration in Go; I thought n8n was enough. Instead of debating, we agreed on three measures — latency, cost and maintenance hours — and ran both for two weeks. n8n won on two of three, and we kept Go for the one heavy endpoint. We still work together."\nmentorship: "I paired weekly with a junior for six months; she now owns our monitoring and runs the on-call rotation."'),
        L(B('القيم والمبادئ', 'Values and principles'),
          B('شركات كتير عندها **leadership principles** أو **values** (مثلًا «customer obsession»، «bias for action») وبتسأل قصة لكل واحد. اقرا قيم الشركة قبل المقابلة، وجهّز قصة لكل قيمة، واستخدم كلمتهم بشكل طبيعي («That’s an example of ownership for me…»). **culture fit** = توافقك مع طريقة الشركة.', 'Many companies have **leadership principles** or **values** (e.g. «customer obsession», «bias for action») and ask for a story for each. Read the company’s values before the interview, prepare a story for each, and use their words naturally («That’s an example of ownership for me…»). **culture fit** = how well you match the company’s way of working.'),
          'values map\nvalue                  my story\ncustomer obsession     stayed late to fix the Ramadan order flow\nbias for action        2-day prototype that won over finance\nlearn and be curious   taught myself TypeScript to build custom nodes')
      ],
      practice: [
        B('اكتب failure story حقيقية بالهيكل.', 'Write a real failure story with the structure.'),
        B('اكتب قصة conflict resolution بالبيانات.', 'Write a conflict-resolution story with data.'),
        B('اكتب قصة mentorship بنتيجة.', 'Write a mentorship story with a result.'),
        B('اعمل values map لشركة بتحلم بيها.', 'Build a values map for a company you dream of.')
      ],
      words: [
        W('failure story', 'قصة فشل', 'an interview story about a mistake', 'A good failure story shows learning.'),
        W('conflict resolution', 'حل الخلافات', 'settling disagreements', 'Give a conflict resolution example.'),
        W('mentorship', 'الإرشاد', 'guiding someone’s growth', 'Mentorship is expected at senior level.'),
        W('leadership principles', 'مبادئ القيادة للشركة', 'a company’s stated leadership values', 'Learn their leadership principles.'),
        W('values', 'القيم', 'principles a company believes in', 'Prepare a story for each of their values.'),
        W('culture fit', 'التوافق مع ثقافة الشركة', 'matching a company’s way of working', 'The last round checks culture fit.')
      ],
      read: [{ lib: 'Tech Interview Handbook', what: B('اقرا عن behavioural questions.', 'Read about behavioural questions.') }],
      challenge: B('جهّز «بنك قصص» بالإنجليزي: 8 قصص (فشل، خلاف، إرشاد، تأثير من غير سلطة، قرار صعب، عميل صعب، مشروع ناجح، غلطة تقنية) — كل واحدة 90 ثانية، وسجّل 3 منهم.', 'Prepare an English «story bank»: 8 stories (failure, conflict, mentoring, influence without authority, a hard decision, a difficult client, a successful project, a technical mistake) — each 90 seconds — and record 3 of them.'),
      quiz: [
        Q(B('failure story كويسة:', 'A good failure story:'), ['a real failure, your responsibility, what changed after', 'I work too hard', 'it was my team’s fault'], 0, B('نضج.', 'Maturity.')),
        Q(B('في قصة الخلاف ركّز على:', 'In a conflict story, focus on:'), ['understanding their view and the data that settled it', 'proving they were wrong', 'gossip'], 0, B('حل.', 'Resolution.')),
        Q(B('قبل المقابلة:', 'Before the interview:'), ['read the company’s values and map stories', 'memorise the CEO’s birthday', 'nothing'], 0, B('تحضير.', 'Preparation.'))
      ] },

    { title: B('أسئلتك والعلامات', 'Your questions and the signals'),
      goal: B('تقيّم الشركة زي ما هي بتقيّمك.', 'Evaluate the company as it evaluates you.'),
      learn: [
        L(B('مراحل المقابلات', 'The rounds'),
          B('المستوى السينيور فيه مراحل: الـ **hiring manager** (المدير اللي هتشتغل معاه)، **take-home** (مهمة في البيت)، **panel interview** (لجنة من كذا شخص)، وأحيانًا مقابلة مع مدير أعلى. في الـ panel: بص للكل، ورد على اللي سأل في الأول والآخر.', 'Senior hiring has rounds: the **hiring manager** (the manager you will work with), a **take-home** (an assignment at home), a **panel interview** (several interviewers), and sometimes a senior leader. In a panel: look at everyone, and address the person who asked at the start and the end.'),
          'take-home email: "Thanks for the assignment. I plan to spend about four hours on it, as suggested. I’ll document the trade-offs I made because of the time limit in the README."'),
        L(B('أسئلتك انت', 'Your questions'),
          B('**questions for the interviewer** بتبيّن مستواك. اسأل عن: النجاح في أول 90 يوم، أكبر تحدي تقني، إزاي القرارات بتتاخد، الـ on-call، والنمو. وجهّز إجابة **why this company** محددة (منتج، مرحلة، تحدي) مش «It’s a great company».', '**questions for the interviewer** show your level. Ask about: success in the first 90 days, the biggest technical challenge, how decisions are made, on-call, and growth. And prepare a specific **why this company** answer (product, stage, challenge), not «It’s a great company».'),
          '"What would success look like for this role in the first 90 days?"\n"What’s the biggest technical risk the team is facing this year?"\n"How are technical decisions made when two teams disagree?"\n"What does on-call look like, and how often are people paged at night?"'),
        L(B('علامات حمرا وخضرا', 'Red and green flags'),
          B('**red flag** = علامة خطر: إجابات غامضة عن سبب ترك آخر شخص، «we’re like a family» مع ساعات مفتوحة، محاور مش محضّر، أو ضغط تقبل العرض في 24 ساعة. **green flag** = علامة كويسة: عملية واضحة، أمثلة حقيقية، صراحة عن المشاكل.', 'A **red flag** = a warning sign: vague answers about why the last person left, «we’re like a family» with open-ended hours, an unprepared interviewer, or pressure to accept an offer within 24 hours. A **green flag** = a good sign: a clear process, real examples, honesty about problems.'),
          'red flag:   "We don’t really have a process; everyone just does everything."\ngreen flag: "Honestly, our biggest problem is alert fatigue — that’s part of why we’re hiring."')
      ],
      practice: [
        B('اكتب 10 أسئلة للمحاور مرتبة حسب المرحلة.', 'Write 10 questions for interviewers, ordered by round.'),
        B('اكتب why this company لشركتين.', 'Write «why this company» for two companies.'),
        B('اكتب إيميل استلام take-home.', 'Write an email acknowledging a take-home.'),
        B('اعمل قايمة red/green flags بتاعتك.', 'Make your own list of red/green flags.')
      ],
      words: [
        W('hiring manager', 'المدير اللي بيوظّف', 'the manager filling the role', 'The hiring manager asked about my projects.'),
        W('take-home', 'مهمة في البيت', 'an assignment done at home', 'The take-home took four hours.'),
        W('panel interview', 'مقابلة مع لجنة', 'an interview with several people', 'The panel interview had four people.'),
        W('questions for the interviewer', 'أسئلتك للمحاور', 'what you ask at the end', 'Prepare five questions for the interviewer.'),
        W('why this company', 'ليه الشركة دي', 'your reason for choosing them', 'Make «why this company» specific.'),
        W('red flag', 'علامة خطر', 'a warning sign', 'Pressure to sign quickly is a red flag.'),
        W('green flag', 'علامة كويسة', 'a positive sign', 'Honesty about problems is a green flag.')
      ],
      read: [{ lib: 'LinkedIn Jobs', what: B('اقرا 3 إعلانات سينيور وطلّع القيم.', 'Read 3 senior job ads and extract the values.') }],
      challenge: B('اختار 3 وظايف سينيور حقيقية بالإنجليزي: لكل واحدة اكتب why this company، 5 أسئلة للمحاور، وقصتين من بنك قصصك مربوطين بقيمهم.', 'Pick 3 real senior job ads in English: for each, write «why this company», 5 questions for the interviewer, and two stories from your story bank linked to their values.'),
      quiz: [
        Q(B('سؤال كويس للمحاور:', 'A good question for the interviewer:'), ['What would success look like in the first 90 days?', 'How many holidays?', 'No questions.'], 0, B('اهتمام.', 'Interest.')),
        Q(B('red flag:', 'A red flag:'), ['pressure to accept within 24 hours', 'a clear process', 'honest answers'], 0, B('خطر.', 'Warning.')),
        Q(B('why this company:', 'Why this company:'), ['a specific reason about product or challenge', 'It’s a great company.', 'I need a job.'], 0, B('محدد.', 'Specific.'))
      ] },

    { title: B('العرض والتفاوض', 'The offer and negotiation'),
      goal: B('تتفاوض على العرض كله بثقة.', 'Negotiate the whole offer with confidence.'),
      learn: [
        L(B('مكوّنات العرض', 'Offer components'),
          B('**offer letter** فيه أكتر من مرتب: **total compensation** = المرتب + المكافآت + **equity** (أسهم أو خيارات أسهم) + **signing bonus** (مكافأة توقيع) + مزايا (تأمين، تعليم، شغل من البيت). قارن العروض بالـ total compensation مش المرتب بس.', 'An **offer letter** contains more than a salary: **total compensation** = salary + bonuses + **equity** (shares or stock options) + a **signing bonus** + perks (insurance, learning budget, remote work). Compare offers by total compensation, not salary alone.'),
          'offer A: salary USD 70K, no equity                      → USD 70K\noffer B: salary USD 62K + 10% bonus + USD 8K equity/yr → USD 76.2K\n"Could you share the total compensation breakdown, including the equity vesting schedule?"'),
        L(B('سؤال المرتب', 'The salary question'),
          B('«What are your **salary expectations**?» بدري: حاول تأجل («I’d like to understand the role first — what range have you budgeted?»). لو لازم: قول range مبني على بحث، وطرفه الأدنى مقبول ليك. ومتقولش مرتبك الحالي لو مش لازم.', '«What are your **salary expectations**?» early on: try to defer («I’d like to understand the role first — what range have you budgeted?»). If you must answer: give a researched range whose lower end is acceptable to you. And avoid sharing your current salary if you can.'),
          '"Based on my research for senior automation roles in Dubai and the scope we discussed, I’m looking at USD 75,000 to 85,000 in total compensation. I’m flexible on the split between salary and equity."'),
        L(B('التفاوض والقبول', 'Negotiating and accepting'),
          B('بعد العرض: اشكر بحماس، اطلب وقت («Could I have until Thursday to review?»)، واتفاوض على حاجة أو اتنين بسبب. **counteroffer** = عرض مضاد منك، أو عرض من شركتك الحالية عشان تفضل. و**reference check** = بيكلموا ناس اشتغلت معاهم — بلّغهم قبلها.', 'After the offer: thank them warmly, ask for time («Could I have until Thursday to review?»), and negotiate one or two items with a reason. A **counteroffer** = your counter-proposal, or an offer from your current employer to keep you. And a **reference check** = they call people you worked with — tell them beforehand.'),
          '"Thank you — I’m really excited about the role. Having reviewed the offer, I’d like to ask whether there’s flexibility on the base salary; given the on-call responsibilities, USD 80,000 would make this an easy yes for me. If the base is fixed, a signing bonus of USD 5,000 would work too."')
      ],
      practice: [
        B('قارن عرضين بالـ total compensation.', 'Compare two offers by total compensation.'),
        B('اكتب 3 طرق تأجل سؤال المرتب.', 'Write 3 ways to defer the salary question.'),
        B('اكتب إيميل تفاوض بطلبين وأسباب.', 'Write a negotiation email with two requests and reasons.'),
        B('اكتب رسالة لـ reference تبلّغه.', 'Write a message briefing a reference.')
      ],
      words: [
        W('offer letter', 'خطاب العرض الوظيفي', 'the written job offer', 'Read the offer letter carefully.'),
        W('total compensation', 'إجمالي التعويض', 'salary plus bonus, equity and perks', 'Compare total compensation, not salary.'),
        W('equity', 'أسهم في الشركة', 'ownership shares or stock options', 'The equity vests over four years.'),
        W('signing bonus', 'مكافأة توقيع', 'a one-time payment for joining', 'They offered a signing bonus.'),
        W('salary expectations', 'المرتب المتوقع', 'the pay you hope for', 'They asked my salary expectations early.'),
        W('counteroffer', 'عرض مضاد', 'a counter-proposal or retention offer', 'My manager made a counteroffer.'),
        W('reference check', 'التحقق من المراجع', 'contacting your former colleagues', 'Brief your referees before the reference check.')
      ],
      read: [{ lib: 'Tech Interview Handbook', what: B('اقرا قسم negotiating the offer.', 'Read the section on negotiating the offer.') }],
      challenge: B('اعمل تمثيل مكالمة عرض وظيفي 10 دقايق بالإنجليزي: شكر، طلب وقت، سؤال عن total compensation، تفاوض على بندين بأسباب، وقبول مهذب — واكتب إيميل القبول النهائي.', 'Role-play a 10-minute offer call in English: thanks, asking for time, asking about total compensation, negotiating two items with reasons, and a polite acceptance — then write the final acceptance email.'),
      quiz: [
        Q(B('مقارنة عرضين:', 'Comparing two offers:'), ['by total compensation', 'by salary only', 'by office location only'], 0, B('إجمالي.', 'Total.')),
        Q(B('سؤال المرتب بدري:', 'An early salary question:'), ['What range have you budgeted for the role?', 'I want the maximum.', 'Whatever you pay.'], 0, B('تأجيل.', 'Deferring.')),
        Q(B('طلب تفاوض كويس:', 'A good negotiation request:'), ['Given the on-call duties, USD 80K would make this an easy yes.', 'Pay me more.', 'Others pay double.'], 0, B('سبب.', 'A reason.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('جاهز لمقابلات المستوى الكبير.', 'Ready for senior-level interviews.'),
      review: [
        B('المستويات وcareer narrative والتأثير من غير سلطة.', 'Levels, the career narrative and influence without authority.'),
        B('system design: المتطلبات والحسابات التقريبية والموازنات بصوت عالي.', 'System design: requirements, rough calculations and trade-offs out loud.'),
        B('قصص الفشل والخلاف والإرشاد والقيم.', 'Failure, conflict, mentoring and values stories.'),
        B('المراحل وأسئلتك والعلامات الحمرا والخضرا.', 'The rounds, your questions, and red and green flags.'),
        B('مكونات العرض وسؤال المرتب والتفاوض.', 'Offer components, the salary question and negotiation.')
      ],
      project: B('اعمل «حملة مقابلات» كاملة بالإنجليزي لوظيفة سينيور حقيقية: career narrative متسجلة، بنك 8 قصص، مقابلة system design متسجلة 30 دقيقة، values map، 10 أسئلة، جدول مقارنة عروض، وإيميل تفاوض — وقيّم نفسك بقايمة السينيور.', 'Run a complete English «interview campaign» for a real senior role: a recorded career narrative, a bank of 8 stories, a recorded 30-minute system design interview, a values map, 10 questions, an offer comparison table and a negotiation email — and score yourself against the senior checklist.'),
      test: [
        Q(B('staff engineer:', 'A staff engineer:'), ['influences direction across many teams', 'a junior role', 'a manager of people only'], 0, B('تأثير واسع.', 'Broad influence.')),
        Q(B('«Tell me about yourself»:', '«Tell me about yourself»:'), ['a two-minute career narrative', 'your life story from childhood', 'one word'], 0, B('قصة.', 'Narrative.')),
        Q(B('cross-functional:', 'Cross-functional:'), ['involving several departments', 'a broken function', 'a math term'], 0, B('أقسام.', 'Departments.')),
        Q(B('أول 5 دقايق في system design:', 'The first 5 minutes of system design:'), ['requirements and scope', 'drawing everything', 'naming tools'], 0, B('تحديد.', 'Scoping.')),
        Q(B('capacity estimate:', 'A capacity estimate:'), ['estimating load and storage', 'a room size', 'a final bill'], 0, B('حمل.', 'Load.')),
        Q(B('single point of failure:', 'A single point of failure:'), ['one part that can stop everything', 'one bug', 'a failing test'], 0, B('وحيدة.', 'Single.')),
        Q(B('think aloud:', 'Think aloud:'), ['say your reasoning as you go', 'shout', 'think silently'], 0, B('بصوت عالي.', 'Out loud.')),
        Q(B('failure story:', 'A failure story:'), ['mostly about what changed after', 'mostly about blame', 'a fake failure'], 0, B('تعلّم.', 'Learning.')),
        Q(B('culture fit:', 'Culture fit:'), ['matching the company’s way of working', 'gym membership', 'dress code only'], 0, B('توافق.', 'Fit.')),
        Q(B('panel interview:', 'A panel interview:'), ['several interviewers at once', 'a solar panel', 'an online test'], 0, B('لجنة.', 'A panel.')),
        Q(B('equity:', 'Equity:'), ['shares or stock options', 'equality', 'a bonus in cash'], 0, B('أسهم.', 'Shares.')),
        Q(B('reference check:', 'A reference check:'), ['contacting people you worked with', 'checking your code', 'a library book'], 0, B('مراجع.', 'References.'))
      ] }
  ]
};
