// English week 41 — Idioms and phrasal verbs in tech.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C1 → C2',
  title: B('التعبيرات الاصطلاحية والأفعال المركبة في التِك', 'Idioms and phrasal verbs in tech'),
  goal: B('تفهم وتستخدم اللغة اللي الفرق التقنية بتتكلمها فعلًا في الاجتماعات والسلاك: أفعال مركبة لدورة حياة البرنامج وحل المشاكل، تعبيرات البيزنس والتِك، وإمتى تتجنبها وتكتب بإنجليزي بسيط عشان جمهور دولي.',
          'Understand and use the language tech teams really speak in meetings and on Slack: phrasal verbs for the software lifecycle and problem-solving, business and tech idioms, and when to avoid them and write plain English for an international audience.'),
  days: [
    { title: B('أفعال دورة حياة البرنامج', 'Phrasal verbs of the software lifecycle'),
      goal: B('تحكي مشروع من أوله لآخره بالأفعال المركبة الصح.', 'Tell a project from start to finish with the right phrasal verbs.'),
      learn: [
        L(B('يعني إيه phrasal verb', 'What a phrasal verb is'),
          B('**phrasal verb** = فعل + **particle** (حرف زي up/out/off/back) والمعنى بيتغير كله: run ≠ run into. أغلبها في الكلام أكتر من الكتابة الرسمية (roll out ↔ deploy). بعضها **separable**: المفعول ممكن ييجي في النص («kick the project off»)، ولو المفعول ضمير لازم ييجي في النص («kick it off» مش «kick off it»).', 'A **phrasal verb** = a verb + a **particle** (up/out/off/back…) and the meaning changes completely: run ≠ run into. Most are more common in speech than in formal writing (roll out ↔ deploy). Some are **separable**: the object can go in the middle («kick the project off»), and if the object is a pronoun it must go in the middle («kick it off», not «kick off it»).'),
          '✓ We’ll kick off the project on Monday.\n✓ We’ll kick the project off on Monday.\n✓ We’ll kick it off on Monday.\n✗ We’ll kick off it on Monday.'),
        L(B('من البداية للإطلاق', 'From start to launch'),
          B('**kick off** = تبدأ (اجتماع/مشروع). **ramp up** = تزوّد تدريجيًا (فريق، حمل، سرعة). **sign off** (on) = توافق رسميًا. **roll out** = تطلق تدريجيًا لناس أكتر. والعكس: **scale back** = تقلّل الحجم أو الطموح.', '**kick off** = to start (a meeting/project). **ramp up** = to increase gradually (a team, load, speed). **sign off** (on) = to approve formally. **roll out** = to release gradually to more people. And the opposite: **scale back** = to reduce the size or ambition.'),
          'We kicked off the migration in March and ramped up to 50 workflows a week.\nThe client signed off on the design on Tuesday.\nWe’ll roll the new version out to 10% of users first.\nBudget cuts mean we’ll have to scale back phase two.'),
        L(B('من التسليم للإيقاف', 'From handover to shutdown'),
          B('**hand off** = تسلّم شغل لحد تاني (handoff كاسم). **carry over** = تنقل لفترة تانية (مهام لسبرنت جاي، رصيد). **phase out** = توقف حاجة تدريجيًا. **tear down** = تهد بيئة/سيرفرات خلاص (عكس spin up).', '**hand off** = to pass work to someone else (handoff as a noun). **carry over** = to move into the next period (tasks to the next sprint, a balance). **phase out** = to stop something gradually. **tear down** = to destroy an environment/servers completely (the opposite of spin up).'),
          'I’ll hand off the support queue to Omar before my leave.\nTwo tickets will carry over to the next sprint.\nWe’re phasing out the old API by December.\nTear down the test environment once the demo is over.')
      ],
      practice: [
        B('احكي مشروع حقيقي في 8 جمل بالأفعال دي.', 'Tell a real project in 8 sentences with these verbs.'),
        B('اكتب كل separable verb بالمفعول في النص وبضمير.', 'Write each separable verb with the object in the middle and with a pronoun.'),
        B('حوّل 5 جمل رسمية (deploy/approve/start) لأفعال مركبة والعكس.', 'Turn 5 formal sentences (deploy/approve/start) into phrasal verbs and back.'),
        B('اكتب تحديث Slack قصير فيه 4 أفعال.', 'Write a short Slack update using 4 of them.')
      ],
      words: [
        W('phrasal verb', 'فعل مركب', 'a verb plus a particle with a new meaning', '«Roll out» is a common phrasal verb.'),
        W('particle', 'الحرف اللي بعد الفعل', 'the small word after the verb', 'In «phase out», «out» is the particle.'),
        W('separable', 'ينفصل (المفعول في النص)', 'can take the object in the middle', '«Kick off» is separable: kick it off.'),
        W('kick off', 'تبدأ', 'to start', 'Let’s kick off the meeting.'),
        W('ramp up', 'تزوّد تدريجيًا', 'to increase gradually', 'We ramped up testing before launch.'),
        W('sign off', 'توافق رسميًا', 'to approve formally', 'The manager signed off on the budget.'),
        W('roll out', 'تطلق تدريجيًا', 'to release gradually', 'The feature rolls out next week.'),
        W('scale back', 'تقلّل الحجم', 'to reduce in size', 'We scaled back the first release.'),
        W('hand off', 'تسلّم الشغل لحد', 'to pass work to someone', 'I’ll hand off the project on Friday.'),
        W('carry over', 'تنقل للفترة الجاية', 'to move into the next period', 'Unfinished tasks carry over.'),
        W('phase out', 'توقف تدريجيًا', 'to stop gradually', 'We’re phasing out the old server.'),
        W('tear down', 'تهد البيئة خالص', 'to destroy completely', 'Tear down the staging stack tonight.')
      ],
      read: [{ lib: 'Cambridge Dictionary', what: B('دوّر على كل فعل وشوف «phrasal verb».', 'Look up each verb and see «phrasal verb».') }],
      challenge: B('اكتب «قصة مشروع» بالإنجليزي (200 كلمة) من kick off لـ tear down بـ 10 أفعال مركبة على الأقل — ونسخة رسمية تانية من غير ولا فعل مركب، وقارن النبرة.', 'Write a «project story» in English (200 words) from kick-off to tear-down with at least 10 phrasal verbs — and a second formal version without any phrasal verb, then compare the tone.'),
      quiz: [
        Q(B('الصح:', 'Correct:'), ['Let’s kick it off.', 'Let’s kick off it.', 'Let’s kick it on.'], 0, B('الضمير في النص.', 'The pronoun goes in the middle.')),
        Q(B('roll out:', 'Roll out:'), ['release gradually', 'cancel', 'roll back'], 0, B('إطلاق.', 'Release.')),
        Q(B('phase out:', 'Phase out:'), ['stop gradually', 'start quickly', 'test'], 0, B('تدريجي.', 'Gradual.'))
      ] },

    { title: B('أفعال حل المشاكل والتفكير', 'Phrasal verbs for problem-solving'),
      goal: B('توصف التحقيق في مشكلة زي المهندسين.', 'Describe investigating a problem like an engineer.'),
      learn: [
        L(B('التحقيق', 'Investigating'),
          B('**drill down** (into) = تنزل في التفاصيل. **zero in on** = تركّز على السبب المحتمل. **rule out** = تستبعد احتمال. **boil down to** = في الآخر بيرجع لـ (السبب الجوهري).', '**drill down** (into) = to go deeper into the details. **zero in on** = to focus on the likely cause. **rule out** = to exclude a possibility. **boil down to** = to come down to (the essential cause).'),
          'We drilled down into the logs for the failed runs.\nWe’ve ruled out the network — other calls work fine.\nWe zeroed in on the date parser.\nIt all boils down to a timezone mismatch.'),
        L(B('التحسين', 'Refining'),
          B('**flesh out** = تكمّل فكرة بالتفاصيل. **iron out** = تحل مشاكل صغيرة متبقية. **get back to** (someone) = ترجع بالرد بعدين. اجمعهم في رسالة متابعة.', '**flesh out** = to add details to an idea. **iron out** = to fix remaining small problems. **get back to** (someone) = to reply later. Combine them in a follow-up message.'),
          'Thanks for the outline — I’ll flesh it out into a full proposal.\nWe still need to iron out a few issues with the Arabic invoices.\nLet me check with the team and get back to you by Thursday.'),
        L(B('الرسمي مقابل المركب', 'Formal versus phrasal'),
          B('في الإيميلات الرسمية والوثائق استخدم المرادف الرسمي، وفي الكلام والسلاك المركب طبيعي أكتر. اعرف الاتنين.', 'In formal emails and documents use the formal equivalent; in speech and on Slack the phrasal verb sounds more natural. Know both.'),
          'drill down into  ↔ analyse in detail\nrule out         ↔ exclude / eliminate\nboil down to     ↔ come down to / be caused by\niron out         ↔ resolve\nget back to you  ↔ reply / respond\nflesh out        ↔ develop / elaborate on')
      ],
      practice: [
        B('اوصف bug حقيقي بالأفعال دي في فقرة.', 'Describe a real bug with these verbs in a paragraph.'),
        B('اكتب نفس الفقرة بالمرادفات الرسمية.', 'Write the same paragraph with the formal equivalents.'),
        B('اكتب 3 رسايل «get back to you» بمواعيد.', 'Write 3 «get back to you» messages with times.'),
        B('اعمل بطاقات مراجعة للأفعال من الأسبوع.', 'Make review cards for this week’s verbs.')
      ],
      words: [
        W('drill down', 'تنزل في التفاصيل', 'to go deeper into details', 'Drill down into the failed runs.'),
        W('zero in on', 'تركّز على', 'to focus closely on', 'We zeroed in on the parser.'),
        W('rule out', 'تستبعد', 'to exclude a possibility', 'We ruled out a network issue.'),
        W('boil down to', 'يرجع في الآخر لـ', 'to come down to', 'It boils down to bad data.'),
        W('flesh out', 'تكمّل بالتفاصيل', 'to add detail to', 'Flesh out the plan before Monday.'),
        W('iron out', 'تحل المشاكل الصغيرة', 'to resolve small problems', 'We ironed out the last bugs.'),
        W('get back to', 'ترجع بالرد', 'to reply later', 'I’ll get back to you tomorrow.')
      ],
      read: [{ lib: 'EnglishClub', what: B('دوّر على phrasal verbs list.', 'Search for the phrasal verbs list.') }],
      challenge: B('اكتب postmortem قصير بالإنجليزي (150 كلمة) لمشكلة حقيقية واجهتك بأفعال حل المشاكل — ونسخة للعميل بالمرادفات الرسمية.', 'Write a short English postmortem (150 words) about a real problem you faced, using the problem-solving verbs — and a client version with the formal equivalents.'),
      quiz: [
        Q(B('rule out:', 'Rule out:'), ['exclude a possibility', 'draw a line', 'agree'], 0, B('استبعاد.', 'Exclusion.')),
        Q(B('It boils down to…:', 'It boils down to…:'), ['the essential cause is…', 'it’s getting hot', 'it’s finished'], 0, B('الجوهر.', 'The essence.')),
        Q(B('الرسمي لـ iron out:', 'The formal word for iron out:'), ['resolve', 'press', 'ignore'], 0, B('يحل.', 'Resolve.'))
      ] },

    { title: B('تعبيرات البيزنس', 'Business idioms'),
      goal: B('تفهم لغة الاجتماعات من غير ما تتلخبط.', 'Follow meeting language without getting lost.'),
      learn: [
        L(B('الأولويات', 'Priorities'),
          B('**low-hanging fruit** = حاجات سهلة نتيجتها كويسة. **quick win** = إنجاز سريع يبين قيمة. **move the needle** = يعمل فرق ملحوظ في الأرقام. **the big picture** = الصورة الكاملة مش التفاصيل.', '**low-hanging fruit** = easy tasks with good results. A **quick win** = a fast achievement that shows value. **move the needle** = to make a noticeable difference in the numbers. **the big picture** = the overall view, not the details.'),
          '"Let’s start with the low-hanging fruit — the duplicate emails."\n"The Slack alert is a quick win; the client will see it on day one."\n"Will a new dashboard really move the needle on sales?"\n"Before we dive into details, here’s the big picture."'),
        L(B('التواصل والتنسيق', 'Communication and alignment'),
          B('**on the same page** = متفقين في الفهم. **in the loop** / **out of the loop** = عارف/مش عارف بالتطورات. **loop in** = تضيف حد للمحادثة. **circle back** = نرجع للموضوع بعدين. **park it** = نأجل موضوع جانبي.', '**on the same page** = sharing the same understanding. **in the loop** / **out of the loop** = informed/not informed. **loop in** = to add someone to the conversation. **circle back** = to return to a topic later. **park it** = to postpone a side topic.'),
          '"Just to make sure we’re on the same page: launch is the 16th, not the 9th."\n"I’ll loop in Sara from finance."\n"Sorry, I was out of the loop — what did we decide?"\n"Good point — let’s park it and circle back on Thursday."'),
        L(B('الطاقة والعمق', 'Capacity and depth'),
          B('**bandwidth** = وقت/طاقة متاحة («I don’t have the bandwidth this week»). **deep dive** = دراسة متعمقة لموضوع. استخدمهم باعتدال — الإفراط فيهم بيبان «corporate jargon».', '**bandwidth** = available time/energy («I don’t have the bandwidth this week»). A **deep dive** = an in-depth study of a topic. Use them in moderation — overusing them sounds like «corporate jargon».'),
          '"Do you have the bandwidth to review two more workflows?"\n"Next week let’s do a deep dive into the error logs."\n✗ "Let’s circle back offline to deep dive the low-hanging bandwidth." (too much!)')
      ],
      practice: [
        B('اكتب جملة لكل تعبير من شغلك.', 'Write a sentence for each idiom from your work.'),
        B('اسمع اجتماع أو بودكاست بيزنس وعدّ التعبيرات.', 'Listen to a business meeting or podcast and count the idioms.'),
        B('ترجم كل تعبير لعربي مصري طبيعي.', 'Translate each idiom into natural Egyptian Arabic.'),
        B('صحّح فقرة مليانة jargon لإنجليزي بسيط.', 'Fix a jargon-heavy paragraph into plain English.')
      ],
      words: [
        W('low-hanging fruit', 'المكاسب السهلة', 'easy tasks with good results', 'Fix the low-hanging fruit first.'),
        W('quick win', 'إنجاز سريع', 'a fast, visible success', 'The alert was a quick win.'),
        W('move the needle', 'يعمل فرق ملحوظ', 'to make a noticeable difference', 'Will this move the needle?'),
        W('the big picture', 'الصورة الكاملة', 'the overall view', 'Start with the big picture.'),
        W('on the same page', 'متفقين في الفهم', 'sharing the same understanding', 'Let’s make sure we’re on the same page.'),
        W('in the loop', 'على اطلاع', 'informed', 'Keep me in the loop.'),
        W('out of the loop', 'مش متابع اللي بيحصل', 'not informed', 'I was out of the loop last week.'),
        W('loop in', 'تضيف حد للمحادثة', 'to include someone', 'I’ll loop in the designer.'),
        W('circle back', 'نرجع للموضوع بعدين', 'to return to a topic later', 'Let’s circle back on pricing.'),
        W('park it', 'نأجّل الموضوع', 'to postpone a topic', 'Good idea — let’s park it for now.'),
        W('bandwidth', 'وقت وطاقة متاحة', 'available capacity', 'I don’t have the bandwidth today.'),
        W('deep dive', 'دراسة متعمقة', 'an in-depth study', 'We did a deep dive into churn.')
      ],
      read: [{ lib: 'All Ears English', what: B('دوّر على business idioms.', 'Search for business idioms.') }],
      challenge: B('اعمل تمثيل اجتماع 10 دقايق بالإنجليزي (مع صاحب أو بصوتك) فيه 8 تعبيرات بيزنس بشكل طبيعي — وبعدين اكتب ملخص الاجتماع بإنجليزي بسيط من غير ولا تعبير.', 'Role-play a 10-minute meeting in English (with a friend or by yourself) using 8 business idioms naturally — then write the meeting summary in plain English with no idioms at all.'),
      quiz: [
        Q(B('low-hanging fruit:', 'Low-hanging fruit:'), ['easy tasks with good results', 'cheap food', 'old bugs'], 0, B('سهل.', 'Easy.')),
        Q(B('«I don’t have the bandwidth»:', '«I don’t have the bandwidth»:'), ['I don’t have the time/capacity', 'my internet is slow', 'I’m not allowed'], 0, B('طاقة.', 'Capacity.')),
        Q(B('loop in Sara:', 'Loop in Sara:'), ['add Sara to the conversation', 'fire Sara', 'call Sara in a loop'], 0, B('إضافة.', 'Include.'))
      ] },

    { title: B('تعبيرات التِك', 'Tech idioms'),
      goal: B('تفهم كلام المطورين والتدوينات التقنية.', 'Understand developer talk and tech blogs.'),
      learn: [
        L(B('جوّه وبرّه الصندوق', 'Inside and outside the box'),
          B('**under the hood** = في الداخل/طريقة الشغل. **out of the box** = يشتغل من غير إعداد (مش «think outside the box»). **off the shelf** = منتج جاهز مش مخصوص. **up and running** = شغّال فعلًا. **bake in** = تبني حاجة من الأساس جوه النظام.', '**under the hood** = inside/how it works. **out of the box** = works without setup (not «think outside the box»). **off the shelf** = a ready-made product, not custom. **up and running** = actually working. **bake in** = to build something into the system from the start.'),
          '"Under the hood, the node just calls the REST API."\n"Retries work out of the box; you don’t need to configure them."\n"An off-the-shelf CRM is cheaper than a custom one."\n"We had the server up and running in an hour."\n"Security should be baked in, not added at the end."'),
        L(B('ثقافة المطورين', 'Developer culture'),
          B('**rabbit hole** = موضوع بيسحبك لعمق ويضيّع وقتك. **yak shaving** = سلسلة مهام جانبية لازم تعملها قبل المهمة الأصلية. **dogfooding** = تستخدم منتجك بنفسك. ودي بتبان كتير في التدوينات والبودكاست.', 'A **rabbit hole** = a topic that pulls you deeper and wastes your time. **yak shaving** = a chain of side tasks you must do before the real task. **dogfooding** = using your own product. These show up a lot in blogs and podcasts.'),
          '"I went down a rabbit hole reading about Unicode normalisation."\n"To fix the button I had to update Node, which needed a new npm, which broke the build… total yak shaving."\n"We’re dogfooding the new support bot on our own inbox first."'),
        L(B('النقطة المثالية', 'The sweet spot'),
          B('**sweet spot** = التوازن المثالي («the sweet spot between price and quality»). وفي الإنجليزي التقني، التعبير ممكن يتحول لصفة قبل الاسم بشرطة: an off-the-shelf tool، an out-of-the-box feature، a deep-dive session.', 'A **sweet spot** = the ideal balance («the sweet spot between price and quality»). And in tech English, an idiom can become an adjective before a noun with hyphens: an off-the-shelf tool, an out-of-the-box feature, a deep-dive session.'),
          'The tool is off the shelf.        → an off-the-shelf tool\nIt works out of the box.           → out-of-the-box support\nThe batch size of 50 hits the sweet spot between speed and rate limits.')
      ],
      practice: [
        B('اوصف أداة بتستخدمها بـ 5 تعبيرات.', 'Describe a tool you use with 5 idioms.'),
        B('اكتب قصة yak shaving حقيقية حصلتلك.', 'Write a real yak-shaving story that happened to you.'),
        B('حوّل 4 تعبيرات لصفات بشرطة.', 'Turn 4 idioms into hyphenated adjectives.'),
        B('اقرا تدوينة تقنية وطلّع منها التعبيرات.', 'Read a tech blog post and extract its idioms.')
      ],
      words: [
        W('under the hood', 'من جوّه / طريقة الشغل', 'inside, how it works', 'Under the hood it uses SQLite.'),
        W('out of the box', 'يشتغل من غير إعداد', 'working without setup', 'Dark mode works out of the box.'),
        W('off the shelf', 'جاهز مش مخصوص', 'ready-made, not custom', 'We chose an off-the-shelf solution.'),
        W('up and running', 'شغّال فعلًا', 'working and operational', 'The bot is up and running.'),
        W('bake in', 'تبنيه من الأساس', 'to build in from the start', 'Bake in logging from day one.'),
        W('rabbit hole', 'موضوع بيسحبك ويضيّع وقتك', 'a distracting, deep topic', 'Don’t go down that rabbit hole now.'),
        W('yak shaving', 'مهام جانبية متسلسلة', 'a chain of side tasks', 'Updating the toolchain was pure yak shaving.'),
        W('dogfooding', 'استخدام منتجك بنفسك', 'using your own product', 'Dogfooding found three bugs.'),
        W('sweet spot', 'التوازن المثالي', 'the ideal balance', 'Fifty items is the sweet spot.')
      ],
      read: [{ lib: 'The Cloudflare Blog', what: B('اقرا تدوينة وطلّع التعبيرات.', 'Read a post and extract the idioms.') }],
      challenge: B('اكتب تدوينة تقنية قصيرة بالإنجليزي (250 كلمة) عن أداة أو workflow بنيته، فيها 6 تعبيرات تِك بشكل طبيعي — ومسرد في الآخر بيشرحهم بإنجليزي بسيط.', 'Write a short English tech blog post (250 words) about a tool or workflow you built, using 6 tech idioms naturally — with a glossary at the end explaining them in plain English.'),
      quiz: [
        Q(B('out of the box:', 'Out of the box:'), ['works without setup', 'creative thinking', 'unpacked'], 0, B('جاهز.', 'Ready.')),
        Q(B('yak shaving:', 'Yak shaving:'), ['a chain of side tasks before the real one', 'farming', 'a haircut'], 0, B('مهام جانبية.', 'Side tasks.')),
        Q(B('صفة صح:', 'A correct adjective:'), ['an off-the-shelf tool', 'an off the shelf tool', 'a tool off-the-shelf-ed'], 0, B('شُرَط.', 'Hyphens.'))
      ] },

    { title: B('المجهود والأخطاء — وإمتى تتجنب التعبيرات', 'Effort, mistakes — and when to avoid idioms'),
      goal: B('تستخدم التعبيرات بحكمة مع جمهور دولي.', 'Use idioms wisely with an international audience.'),
      learn: [
        L(B('المجهود', 'Effort'),
          B('**go the extra mile** = تعمل أكتر من المطلوب. **hit the ground running** = تبدأ بقوة من أول يوم. **ahead of schedule** = قبل الميعاد. **double down** (on) = تزوّد الالتزام بحاجة (أحيانًا بعناد).', '**go the extra mile** = to do more than required. **hit the ground running** = to start strongly from day one. **ahead of schedule** = earlier than planned. **double down** (on) = to increase commitment to something (sometimes stubbornly).'),
          '"She went the extra mile and documented every workflow."\n"With the onboarding guide, new clients hit the ground running."\n"We delivered two days ahead of schedule."\n"After the success in Egypt, we’re doubling down on the Gulf market."'),
        L(B('الأخطاء والقرارات', 'Mistakes and decisions'),
          B('**drop the ball** = تقصّر/تنسى مسؤولية. **cut corners** = تختصر بشكل يضر الجودة. **deal-breaker** = شرط لو مش متحقق مفيش اتفاق. **game changer** = حاجة بتغيّر الوضع جذريًا. **pivot** = تغيّر الاتجاه الاستراتيجي.', '**drop the ball** = to fail at a responsibility. **cut corners** = to save effort in a way that hurts quality. A **deal-breaker** = a condition that ends the deal if not met. A **game changer** = something that changes the situation completely. To **pivot** = to change strategic direction.'),
          '"I dropped the ball on the reminder — sorry, it’s sent now."\n"We won’t cut corners on testing."\n"No Arabic support was a deal-breaker for them."\n"Automatic retries were a game changer."\n"The startup pivoted from e-commerce to B2B invoicing."'),
        L(B('إمتى تتجنبها', 'When to avoid them'),
          B('مع جمهور دولي (ناس لغتهم الأم مش إنجليزي)، في الوثائق، والترجمة الآلية، والرسايل الحساسة: اكتب المعنى مباشرة. التعبيرات بتتفهم غلط، وبعضها ثقافي جدًا (رياضة أمريكية). قاعدة: لو مش متأكد إن القارئ هيفهمها، استخدم الكلام البسيط. وفي الكلام مع زمايلك بتقرّب.', 'With an international audience (non-native speakers), in documentation, machine translation, and sensitive messages: say the meaning directly. Idioms get misunderstood, and some are very cultural (American sports). Rule: if you are not sure the reader will understand it, use plain words. In conversation with colleagues they build rapport.'),
          'idiom → plain English\nWe dropped the ball.         → We missed this step.\nIt’s a game changer.          → It saves 10 hours a week.\nLet’s touch base.             → Let’s talk briefly.\nHit it out of the park.       → Did an excellent job.')
      ],
      practice: [
        B('اكتب جملة لكل تعبير من الأسبوع.', 'Write a sentence for each idiom from today.'),
        B('حوّل 10 جمل بتعبيرات لإنجليزي بسيط.', 'Turn 10 idiom sentences into plain English.'),
        B('اعترف بغلطة بـ «I dropped the ball» وحل.', 'Admit a mistake with «I dropped the ball» and a fix.'),
        B('قرر: أي تعبيرات مناسبة لعميلك؟', 'Decide: which idioms suit your client?')
      ],
      words: [
        W('go the extra mile', 'تعمل أكتر من المطلوب', 'to do more than expected', 'He went the extra mile for the client.'),
        W('hit the ground running', 'تبدأ بقوة من أول يوم', 'to start strongly at once', 'New hires hit the ground running.'),
        W('ahead of schedule', 'قبل الميعاد', 'earlier than planned', 'We’re ahead of schedule.'),
        W('double down', 'تزوّد الالتزام', 'to increase commitment', 'We’re doubling down on automation.'),
        W('drop the ball', 'تقصّر في مسؤولية', 'to fail at a task', 'I dropped the ball on that email.'),
        W('cut corners', 'تختصر على حساب الجودة', 'to skip steps and lower quality', 'Never cut corners on backups.'),
        W('deal-breaker', 'شرط لا تنازل عنه', 'a condition that ends a deal', 'Missing SSO was a deal-breaker.'),
        W('game changer', 'حاجة بتغيّر الوضع', 'something that changes everything', 'The API was a game changer.'),
        W('pivot', 'تغيّر الاتجاه', 'to change direction', 'The company pivoted to B2B.')
      ],
      read: [{ lib: 'Plain Language Guidelines', what: B('دوّر على «avoid jargon».', 'Search for «avoid jargon».') }],
      challenge: B('خد آخر 3 إيميلات أو رسايل إنجليزي كتبتها لعملاء دوليين: علّم كل تعبير اصطلاحي أو فعل مركب ممكن يتفهم غلط، واكتب نسخة بإنجليزي بسيط — وقرر قاعدتك الشخصية.', 'Take your last 3 English emails or messages to international clients: mark every idiom or phrasal verb that could be misunderstood, write a plain-English version — and decide your personal rule.'),
      quiz: [
        Q(B('I dropped the ball:', 'I dropped the ball:'), ['I failed at a responsibility', 'I played sport', 'I lost a file'], 0, B('تقصير.', 'Failure.')),
        Q(B('deal-breaker:', 'A deal-breaker:'), ['a condition that ends the deal', 'a discount', 'a contract'], 0, B('شرط.', 'Condition.')),
        Q(B('لجمهور دولي:', 'For an international audience:'), ['prefer plain English', 'use as many idioms as possible', 'use sports idioms'], 0, B('بساطة.', 'Plainness.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('لغة الفرق التقنية بقت مألوفة.', 'The language of tech teams is now familiar.'),
      review: [
        B('الأفعال المركبة: particle وseparable ومكان الضمير.', 'Phrasal verbs: particles, separable verbs and pronoun position.'),
        B('دورة الحياة: kick off وramp up وsign off وroll out وhand off وphase out وtear down.', 'The lifecycle: kick off, ramp up, sign off, roll out, hand off, phase out, tear down.'),
        B('حل المشاكل: drill down وrule out وboil down to وiron out ومرادفاتهم الرسمية.', 'Problem-solving: drill down, rule out, boil down to, iron out and their formal equivalents.'),
        B('تعبيرات البيزنس والتِك: low-hanging fruit وin the loop وunder the hood وrabbit hole.', 'Business and tech idioms: low-hanging fruit, in the loop, under the hood, rabbit hole.'),
        B('إمتى تتجنب التعبيرات وتكتب بإنجليزي بسيط.', 'When to avoid idioms and write plain English.')
      ],
      project: B('ابني «قاموس الفريق التقني» بالإنجليزي: 60 فعل مركب وتعبير مرتبين حسب الموقف (اجتماعات، تحقيق، إطلاق، أخطاء)، لكل واحد معنى بسيط، مثال من شغلك، المرادف الرسمي، و«آمن لجمهور دولي؟» نعم/لأ.', 'Build an English «tech team dictionary»: 60 phrasal verbs and idioms organised by situation (meetings, investigation, launch, mistakes), each with a plain meaning, an example from your work, the formal equivalent, and «safe for an international audience?» yes/no.'),
      test: [
        Q(B('الصح:', 'Correct:'), ['Roll it out next week.', 'Roll out it next week.', 'Out roll it next week.'], 0, B('ضمير في النص.', 'Pronoun in the middle.')),
        Q(B('sign off on:', 'Sign off on:'), ['approve formally', 'log out', 'leave the job'], 0, B('موافقة.', 'Approval.')),
        Q(B('carry over:', 'Carry over:'), ['move into the next period', 'lift something', 'cancel'], 0, B('نقل.', 'Move on.')),
        Q(B('tear down:', 'Tear down:'), ['destroy an environment', 'cry', 'write down'], 0, B('هدّ.', 'Destroy.')),
        Q(B('zero in on:', 'Zero in on:'), ['focus closely on', 'reset to zero', 'ignore'], 0, B('تركيز.', 'Focus.')),
        Q(B('flesh out:', 'Flesh out:'), ['add detail', 'remove detail', 'cook'], 0, B('تفاصيل.', 'Detail.')),
        Q(B('the big picture:', 'The big picture:'), ['the overall view', 'a large image', 'a poster'], 0, B('شامل.', 'Overall.')),
        Q(B('circle back:', 'Circle back:'), ['return to a topic later', 'drive in circles', 'refuse'], 0, B('رجوع.', 'Return.')),
        Q(B('under the hood:', 'Under the hood:'), ['how it works inside', 'in the car', 'hidden bugs only'], 0, B('داخلي.', 'Internal.')),
        Q(B('rabbit hole:', 'A rabbit hole:'), ['a distracting deep topic', 'a security hole', 'a pet'], 0, B('تشتت.', 'Distraction.')),
        Q(B('cut corners:', 'Cut corners:'), ['skip steps and lower quality', 'design rounded buttons', 'save money wisely'], 0, B('جودة أقل.', 'Lower quality.')),
        Q(B('«It’s a game changer» بإنجليزي بسيط:', '«It’s a game changer» in plain English:'), ['It saves 10 hours a week.', 'It’s a new game.', 'It changes players.'], 0, B('محدد.', 'Specific.'))
      ] }
  ]
};
