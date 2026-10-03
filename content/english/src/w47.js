// English week 47 — Your public presence: talks and open source.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'C2',
  title: B('حضورك العام: المحاضرات والمصادر المفتوحة', 'Your public presence: talks and open source'),
  goal: B('تبني اسم في المجتمع التقني الدولي بالإنجليزي: تقدّم مقترحات محاضرات بتتقبل، تساهم في مشاريع مفتوحة المصدر بلغة محترمة ومحددة، تدير مشروعك الخاص، تكتب للجمهور بانتظام، وتحافظ على نفسك من الاحتراق.',
          'Build a name in the international tech community in English: submit talk proposals that get accepted, contribute to open-source projects with respectful, precise language, maintain your own project, write publicly on a regular basis, and protect yourself from burnout.'),
  days: [
    { title: B('على المسرح', 'On stage'),
      goal: B('من المقترح للقاعة.', 'From the proposal to the room.'),
      learn: [
        L(B('مقترح المحاضرة', 'The talk proposal'),
          B('**talk proposal** بيتقبل لما يكون: عنوان محدد بنتيجة («Cutting invoice errors by 90% with n8n and Python» مش «Automation tips»)، مين الجمهور، 3 حاجات الحاضرين هياخدوها، وليه انت (تجربة حقيقية). ابدأ بـ **meetup** محلي قبل المؤتمرات الكبيرة.', 'A **talk proposal** gets accepted when it has: a specific title with a result («Cutting invoice errors by 90% with n8n and Python», not «Automation tips»), the audience, 3 things attendees will take away, and why you (real experience). Start with a local **meetup** before big conferences.'),
          'Title: Cutting invoice errors by 90% with n8n and Python\nAudience: developers and ops teams automating finance work\nYou’ll leave with:\n1. a pattern for validating messy supplier data\n2. how to keep a human in the loop without slowing down\n3. the three mistakes that cost us a month\nWhy me: I built this system for a retailer processing 40,000 invoices a month.'),
        L(B('البايو والتقديم', 'The bio and introductions'),
          B('**speaker bio** = 2–3 جمل بضمير الغايب: إنت مين، بتعمل إيه بأرقام، وحاجة شخصية صغيرة. اكتب نسخة قصيرة (50 كلمة) وطويلة (100). و**keynote** = المحاضرة الرئيسية الافتتاحية (بتيجي بدعوة غالبًا).', 'A **speaker bio** = 2–3 sentences in the third person: who you are, what you do with numbers, and a small personal touch. Write a short version (50 words) and a long one (100). And a **keynote** = the main opening talk (usually by invitation).'),
          '"Laila Hassan is an automation engineer based in Cairo who has built n8n and Python systems for more than 20 companies in the Gulf. Her work has removed over 30,000 hours of manual data entry. Outside work, she teaches automation to Arabic-speaking beginners."'),
        L(B('النقاشات الجماعية', 'Panel discussions'),
          B('في **panel discussion** فيه **moderator** بيدير الأسئلة. اتكلم باختصار (دقيقة لكل إجابة)، ابني على كلام غيرك («Building on what Omar said…»)، واختلف بأدب («I see it slightly differently…»). ومتسيطرش على الوقت.', 'A **panel discussion** has a **moderator** who manages the questions. Speak briefly (a minute per answer), build on others («Building on what Omar said…»), and disagree politely («I see it slightly differently…»). And do not dominate the time.'),
          '"Building on Sara’s point about cost — I’d add that the hidden cost is maintenance."\n"I see it slightly differently: for small teams, no-code is often the safer choice."\n"That’s a great question. In short: start with one workflow, measure it, then expand."')
      ],
      practice: [
        B('اكتب talk proposal كامل.', 'Write a complete talk proposal.'),
        B('اكتب speaker bio بنسختين.', 'Write a speaker bio in two versions.'),
        B('اكتب 5 جمل للـ panel (بناء، اختلاف، اختصار).', 'Write 5 panel phrases (building on, disagreeing, summarising).'),
        B('دوّر على meetup تقني قريب أو أونلاين.', 'Find a nearby or online tech meetup.')
      ],
      words: [
        W('talk proposal', 'مقترح محاضرة', 'a submission to speak at an event', 'My talk proposal was accepted.'),
        W('meetup', 'لقاء مجتمع تقني', 'an informal community event', 'Start speaking at a local meetup.'),
        W('speaker bio', 'نبذة المتحدث', 'a short description of a speaker', 'Send your speaker bio in the third person.'),
        W('keynote', 'المحاضرة الرئيسية', 'the main talk at an event', 'The keynote opened the conference.'),
        W('panel discussion', 'نقاش جماعي على المسرح', 'a group conversation on stage', 'I joined a panel discussion on AI.'),
        W('moderator', 'مدير النقاش', 'the person running a discussion', 'The moderator kept time well.')
      ],
      read: [{ lib: 'GOTO Conferences', what: B('شوف محاضرة وحلّل عنوانها ووصفها.', 'Watch a talk and analyse its title and abstract.') }],
      challenge: B('قدّم talk proposal حقيقي بالإنجليزي لـ meetup أونلاين أو محلي (عنوان بنتيجة، 3 takeaways، speaker bio) — حتى لو اترفض، احتفظ بالرد.', 'Submit a real English talk proposal to an online or local meetup (a title with a result, 3 takeaways, a speaker bio) — even if it is rejected, keep the reply.'),
      quiz: [
        Q(B('عنوان محاضرة أقوى:', 'A stronger talk title:'), ['Cutting invoice errors by 90% with n8n', 'Automation tips', 'My talk'], 0, B('نتيجة.', 'A result.')),
        Q(B('speaker bio بيتكتب:', 'A speaker bio is written:'), ['in the third person', 'as a poem', 'in the future tense'], 0, B('غايب.', 'Third person.')),
        Q(B('اختلاف مهذب في panel:', 'Polite disagreement on a panel:'), ['I see it slightly differently…', 'That’s wrong.', 'No.'], 0, B('أدب.', 'Politeness.'))
      ] },

    { title: B('المساهمة في المصادر المفتوحة', 'Contributing to open source'),
      goal: B('تساهم بلغة يحبها الـ maintainers.', 'Contribute in language maintainers love.'),
      learn: [
        L(B('قبل ما تكتب كود', 'Before writing code'),
          B('كـ **contributor**: اقرا **contributing guide** (CONTRIBUTING.md) و**code of conduct** الأول. دوّر في **issue tracker** إن الموضوع مش متناقش. ولو تغيير كبير، افتح issue واسأل قبل ما تشتغل — متفاجئش الـ maintainers بـ 2000 سطر.', 'As a **contributor**: read the **contributing guide** (CONTRIBUTING.md) and the **code of conduct** first. Search the **issue tracker** to check it has not been discussed. For a big change, open an issue and ask before working — do not surprise maintainers with 2,000 lines.'),
          '"Hi! I’d like to add support for Arabic date formats to the parser (related to #412). Before I start, would you be open to a PR for this? I was thinking of adding a locale option rather than changing the default behaviour. Happy to adjust the approach."'),
        L(B('وصف الـ PR', 'The PR description'),
          B('**pull request** كويس: عنوان واضح بفعل أمر («Add Arabic locale to date parser»)، **PR description** فيها: إيه وليه، ربط بالـ issue، إزاي اختبرته، وأي حاجة مش متأكد منها. صغير ومركّز أحسن من كبير.', 'A good **pull request**: a clear imperative title («Add Arabic locale to date parser»), and a **PR description** with: what and why, the linked issue, how you tested it, and anything you are unsure about. Small and focused beats big.'),
          '## What\nAdds an optional `locale` setting to the date parser, with Arabic month names.\n\n## Why\nFixes #412 — Arabic invoices failed to parse.\n\n## How I tested\n- Added 14 unit tests (Arabic, English, mixed)\n- Ran the full suite locally: all passing\n\n## Notes\nI wasn’t sure whether `locale` should default to `en` or auto-detect — happy to change it.'),
        L(B('التعامل مع المراجعة', 'Handling review'),
          B('ردود المراجعة: اشكر، نفّذ أو ناقش بأدب، ومتاخدهاش شخصي. **nit** = ملاحظة صغيرة مش ضرورية («nit: extra space»). لو اختلفت: اشرح سببك مرة، وبعدين احترم قرار الـ maintainer — هو اللي هيصونه لسنين. وفرق مهم: **upstream** (المشروع الأصلي) و**fork** (نسختك).', 'Review replies: thank, apply or discuss politely, and do not take it personally. A **nit** = a small optional comment («nit: extra space»). If you disagree: explain your reason once, then respect the maintainer’s decision — they will maintain it for years. And an important distinction: **upstream** (the original project) and your **fork** (your copy).'),
          '"Good catch, thanks — fixed in 3f2a1c."\n"Fair point. I used a regex because the input is small, but I’m happy to switch to the existing tokenizer if you prefer."\n"Done! Also addressed the nit about naming."\n"I’ll keep the patch in my fork for now and follow the upstream discussion."')
      ],
      practice: [
        B('اكتب رسالة issue تسأل قبل ما تشتغل.', 'Write an issue message asking before you start.'),
        B('اكتب PR description كامل لتغيير حقيقي.', 'Write a full PR description for a real change.'),
        B('اكتب 5 ردود مراجعة مهذبة.', 'Write 5 polite review replies.'),
        B('اقرا CONTRIBUTING.md لمشروع بتستخدمه.', 'Read the CONTRIBUTING.md of a project you use.')
      ],
      words: [
        W('contributor', 'مساهم', 'someone who contributes to a project', 'Thank every new contributor.'),
        W('contributing guide', 'دليل المساهمة', 'the rules for contributing', 'Read the contributing guide first.'),
        W('code of conduct', 'مدونة السلوك', 'rules for respectful behaviour', 'The project has a code of conduct.'),
        W('issue tracker', 'نظام تتبع المشاكل', 'where bugs and requests are listed', 'Search the issue tracker before posting.'),
        W('pull request', 'طلب دمج تعديل', 'a proposed code change', 'I opened a pull request.'),
        W('PR description', 'وصف طلب الدمج', 'the explanation of a pull request', 'Link the issue in the PR description.'),
        W('nit', 'ملاحظة صغيرة', 'a minor optional review comment', 'Just a nit: rename this variable.'),
        W('upstream', 'المشروع الأصلي', 'the original project', 'The fix was merged upstream.'),
        W('fork', 'نسخة منفصلة من المشروع', 'your own copy of a project', 'I tested it in my fork.')
      ],
      read: [{ lib: 'GitHub Docs', what: B('اقرا «Contributing to a project».', 'Read «Contributing to a project».') }],
      challenge: B('ساهم مساهمة حقيقية صغيرة بالإنجليزي في مشروع مفتوح المصدر (تصحيح توثيق، ترجمة، أو bug صغير): اقرا الدليل، افتح issue لو لازم، واكتب PR description بالهيكل.', 'Make a small real contribution in English to an open-source project (a docs fix, a translation or a small bug): read the guide, open an issue if needed, and write a PR description with the structure.'),
      quiz: [
        Q(B('قبل تغيير كبير:', 'Before a big change:'), ['open an issue and ask', 'send 2,000 lines', 'fork silently forever'], 0, B('سؤال.', 'Ask.')),
        Q(B('nit:', 'A nit:'), ['a small optional comment', 'a blocking bug', 'a new feature'], 0, B('صغير.', 'Minor.')),
        Q(B('رد على مراجعة:', 'A review reply:'), ['Good catch, thanks — fixed in 3f2a1c.', 'You’re wrong.', 'Whatever.'], 0, B('شكر.', 'Thanks.'))
      ] },

    { title: B('مشروعك المفتوح', 'Your own open project'),
      goal: B('تدير مشروع الناس تقدر تستخدمه وتساهم فيه.', 'Run a project people can use and contribute to.'),
      learn: [
        L(B('الواجهة', 'The front door'),
          B('**README** هو باب مشروعك: سطر بيقول المشروع بيعمل إيه ولمين، صورة/GIF، تثبيت في 3 خطوات، مثال، والرخصة. **license** (MIT، Apache 2.0) لازم تبقى واضحة — من غيرها الناس قانونيًا متقدرش تستخدمه (معلومة عامة، مش استشارة قانونية).', 'The **README** is your project’s front door: one line saying what it does and for whom, a screenshot/GIF, installation in 3 steps, an example, and the licence. The **license** (MIT, Apache 2.0) must be clear — without one, people legally cannot use it (general information, not legal advice).'),
          '# n8n-nodes-arabic-dates\nParse Arabic and Hijri dates in n8n workflows.\n\n## Install\n1. Settings → Community Nodes\n2. Install `n8n-nodes-arabic-dates`\n3. Restart n8n\n\n## Example\nInput: "١٥ رمضان ١٤٤٧" → Output: 2026-03-05\n\n## License\nMIT'),
        L(B('الإصدارات', 'Releases'),
          B('**semantic versioning** = MAJOR.MINOR.PATCH (2.4.1): MAJOR لتغيير بيكسر، MINOR لميزة جديدة متوافقة، PATCH لإصلاح. **release notes** بلغة المستخدم: إيه الجديد، إيه اتصلح، وإيه لازم يغيّره. و**deprecation** = إعلان إن حاجة هتتشال بعدين، بميعاد وبديل. **backwards compatible** = الكود القديم لسه شغال.', '**semantic versioning** = MAJOR.MINOR.PATCH (2.4.1): MAJOR for breaking changes, MINOR for a compatible new feature, PATCH for a fix. **release notes** in the user’s language: what is new, what is fixed, and what they must change. A **deprecation** = announcing that something will be removed later, with a date and an alternative. **backwards compatible** = old code still works.'),
          '## v2.5.0\n### Added\n- Hijri date output (#58)\n### Fixed\n- Arabic-Indic digits in times (#61)\n### Deprecated\n- `format: "short"` will be removed in v3.0 (June 2027). Use `style: "short"` instead.\nThis release is backwards compatible.'),
        L(B('المجتمع والاستدامة', 'Community and sustainability'),
          B('ابني **community**: رد على الـ issues بلطف وفي وقت معقول، اشكر المساهمين علنًا، وحط «good first issue». **governance** = مين بيقرر إزاي (حتى لو انت لوحدك، اكتبها). **sponsor** = حد بيدعم المشروع ماليًا (GitHub Sponsors). و**bus factor** = كام شخص لو اختفوا المشروع يقف — حاول تخليه أكتر من 1.', 'Build a **community**: reply to issues kindly and in reasonable time, thank contributors publicly, and label «good first issue». **governance** = who decides and how (even if it is just you, write it down). A **sponsor** = someone funding the project (GitHub Sponsors). And the **bus factor** = how many people could disappear before the project stops — try to make it more than 1.'),
          '"Thanks for the report, and sorry for the slow reply — I maintain this in my spare time. I can reproduce it; a fix is planned for v2.5.1. If you’d like to try a PR, I’m happy to guide you."')
      ],
      practice: [
        B('اكتب README لمشروع صغير عندك.', 'Write a README for a small project of yours.'),
        B('حدد رقم الإصدار لـ 5 تغييرات.', 'Pick the version number for 5 changes.'),
        B('اكتب release notes بـ deprecation.', 'Write release notes with a deprecation.'),
        B('اكتب رد لطيف على issue متأخر.', 'Write a kind reply to an old issue.')
      ],
      words: [
        W('README', 'ملف تعريف المشروع', 'the main introduction file of a project', 'Put an example in the README.'),
        W('license', 'رخصة الاستخدام', 'the legal terms for using code', 'The project uses the MIT license.'),
        W('semantic versioning', 'ترقيم الإصدارات الدلالي', 'MAJOR.MINOR.PATCH numbering', 'We follow semantic versioning.'),
        W('release notes', 'ملاحظات الإصدار', 'a description of a new version', 'Read the release notes before upgrading.'),
        W('deprecation', 'إعلان إيقاف ميزة لاحقًا', 'marking a feature for future removal', 'The deprecation gives users six months.'),
        W('backwards compatible', 'متوافق مع القديم', 'not breaking existing use', 'This update is backwards compatible.'),
        W('community', 'مجتمع', 'the people around a project', 'A friendly community attracts contributors.'),
        W('governance', 'طريقة الحكم واتخاذ القرار', 'how decisions are made', 'Document the project’s governance.'),
        W('sponsor', 'داعم مالي', 'someone who funds a project', 'Two companies sponsor the project.'),
        W('bus factor', 'عدد الناس اللي المشروع معتمد عليهم', 'how many people a project depends on', 'Our bus factor is only one.')
      ],
      read: [{ lib: 'Write the Docs Guide', what: B('اقرا عن كتابة README.', 'Read about writing a README.') }],
      challenge: B('انشر مشروع صغير مفتوح المصدر على GitHub بالإنجليزي (n8n template، سكريبت Python، أو مكتبة JS): README كامل، license، CONTRIBUTING قصير، 2 good first issues، وrelease أول بـ release notes.', 'Publish a small open-source project on GitHub in English (an n8n template, a Python script or a JS library): a full README, a licence, a short CONTRIBUTING file, 2 good first issues, and a first release with release notes.'),
      quiz: [
        Q(B('ميزة جديدة متوافقة: 2.4.1 ←', 'A compatible new feature: 2.4.1 →'), ['2.5.0', '3.0.0', '2.4.2'], 0, B('MINOR.', 'MINOR.')),
        Q(B('deprecation:', 'A deprecation:'), ['announcing future removal with an alternative', 'deleting immediately', 'a bug'], 0, B('إعلان.', 'Notice.')),
        Q(B('bus factor = 1:', 'A bus factor of 1:'), ['the project depends on one person', 'one bus', 'one bug'], 0, B('خطر.', 'Risk.'))
      ] },

    { title: B('الكتابة للجمهور', 'Writing in public'),
      goal: B('تبني سمعة بمحتوى منتظم ومفيد.', 'Build a reputation with regular, useful content.'),
      learn: [
        L(B('العلامة الشخصية', 'Your personal brand'),
          B('**personal brand** = اللي الناس بتفتكرك بيه («the Arabic automation person»). اختار موضوع واحد ضيق وكرّره. **thought leadership** = محتوى بيقدّم رأي أو خبرة أصلية، مش تلخيص أخبار. أحسن محتوى: «what I learned building X» بأرقام.', 'A **personal brand** = what people remember you for («the Arabic automation person»). Choose one narrow topic and repeat it. **thought leadership** = content offering an original view or experience, not a news summary. The best content: «what I learned building X», with numbers.'),
          'narrow:  "I write about automating finance work for Arabic-speaking companies."\ntoo wide: "I write about tech, AI, productivity, startups and life."'),
        L(B('البوست ودراسة الحالة', 'The post and the case study'),
          B('**LinkedIn post** كويس: أول سطر يوقف الناس (رقم أو موقف)، قصة قصيرة، درس واحد، وسؤال في الآخر. **case study** = قصة مشروع: العميل، المشكلة، الحل، النتايج بالأرقام، ومعاه **testimonial** (شهادة العميل بإذنه).', 'A good **LinkedIn post**: a first line that stops people (a number or a situation), a short story, one lesson, and a question at the end. A **case study** = a project story: the client, the problem, the solution, the results in numbers, plus a **testimonial** (the client’s quote, with permission).'),
          '"We deleted 11,000 lines of code last month. And our client is happier.\n\nTheir invoice system had grown over five years… [short story]\n\nThe lesson: before automating a process, simplify it.\n\nWhat’s the biggest thing you’ve removed from a system?"'),
        L(B('الانتظام والجمهور', 'Consistency and audience'),
          B('**newsletter** = رسالة دورية بالإيميل لجمهورك (شهرية كفاية). **audience building** = بناء جمهور ببطء بالانتظام. قيس **engagement** (ردود، حفظ، رسايل) أكتر من اللايكات. ولو حد عرض ينشر مقالك باسمك (**byline**) في موقع أكبر — ده كسب كبير.', 'A **newsletter** = a regular email to your audience (monthly is enough). **audience building** = growing an audience slowly through consistency. Measure **engagement** (replies, saves, messages) more than likes. And if a bigger site offers to publish your article under your name (a **byline**), that is a big win.'),
          'monthly rhythm\nweek 1  one LinkedIn post from real work\nweek 2  one short tutorial or template\nweek 3  one case study or lesson\nweek 4  newsletter: the month’s best 3 items + one new idea')
      ],
      practice: [
        B('اكتب personal brand في جملة.', 'Write your personal brand in one sentence.'),
        B('اكتب 3 LinkedIn posts بالهيكل.', 'Write 3 LinkedIn posts with the structure.'),
        B('اكتب case study لمشروع بأرقام.', 'Write a case study of a project with numbers.'),
        B('اكتب طلب testimonial مهذب لعميل.', 'Write a polite testimonial request to a client.')
      ],
      words: [
        W('personal brand', 'العلامة الشخصية', 'what people know you for', 'Build a narrow personal brand.'),
        W('thought leadership', 'محتوى برأي وخبرة أصلية', 'content with original expert views', 'Real lessons are thought leadership.'),
        W('LinkedIn post', 'بوست لينكدإن', 'a post on LinkedIn', 'My LinkedIn post got 40 comments.'),
        W('case study', 'دراسة حالة', 'a detailed project story', 'Publish a case study with numbers.'),
        W('testimonial', 'شهادة عميل', 'a client’s quote praising your work', 'Ask for a testimonial after delivery.'),
        W('newsletter', 'نشرة بريدية', 'a regular email to subscribers', 'My newsletter goes out monthly.'),
        W('audience building', 'بناء جمهور', 'growing followers over time', 'Audience building takes years.'),
        W('engagement', 'تفاعل الجمهور', 'how much people interact', 'Replies show real engagement.'),
        W('byline', 'اسم الكاتب على المقال', 'the author’s name on an article', 'I got my first byline on a big blog.')
      ],
      read: [{ lib: 'freeCodeCamp News', what: B('اقرا مقالة «what I learned» وحلّل هيكلها.', 'Read a «what I learned» article and analyse its structure.') }],
      challenge: B('اعمل خطة محتوى شهر بالإنجليزي حول personal brand واحد، واكتب وانشر أول LinkedIn post حقيقي من شغلك — وبعد أسبوع سجّل الـ engagement.', 'Make a one-month English content plan around one personal brand, then write and publish your first real LinkedIn post from your work — and record the engagement after a week.'),
      quiz: [
        Q(B('personal brand كويس:', 'A good personal brand:'), ['automating finance work for Arabic-speaking companies', 'tech, AI, life and everything', 'no topic'], 0, B('ضيق.', 'Narrow.')),
        Q(B('أول سطر في البوست:', 'The first line of a post:'), ['a number or situation that stops people', 'Hello everyone', 'a long disclaimer'], 0, B('جذب.', 'A hook.')),
        Q(B('testimonial:', 'A testimonial:'), ['a client’s quote, with permission', 'a legal test', 'a fake review'], 0, B('شهادة.', 'Endorsement.'))
      ] },

    { title: B('حضور مستدام', 'A sustainable presence'),
      goal: B('تستمر سنين من غير ما تتحرق.', 'Keep going for years without burning out.'),
      learn: [
        L(B('الدعوات والعروض', 'Invitations and pitches'),
          B('لما تبدأ تتعرف هتجيلك دعوات: بودكاست، مؤتمرات، مراجعات. **podcast guest** = ضيف بودكاست. و**cold pitch** = رسالة لحد ماتعرفوش تعرض فكرة (مقال، حلقة، تعاون): قصيرة، شخصية، وفيها قيمة ليه هو.', 'Once you become known, invitations arrive: podcasts, conferences, reviews. A **podcast guest** = a guest on a podcast. And a **cold pitch** = a message to someone you do not know proposing an idea (an article, an episode, a collaboration): short, personal, and valuable to them.'),
          '"Hi Sam — I enjoyed your episode on AI agents, especially the point about approvals. I’ve spent two years building approval flows for finance teams in the Gulf, including one that blocked a USD 40,000 fraud attempt. Would a 30-minute episode on «human in the loop in practice» be useful for your listeners? Either way, thanks for the show."'),
        L(B('الاحتراق ومتلازمة المحتال', 'Burnout and imposter syndrome'),
          B('**burnout** = إرهاق جسدي ونفسي من ضغط طويل — شغل + محتوى + مساهمات ممكن يوصلوك له. **imposter syndrome** = إحساس إنك مش كفاية وهتتكشف، حتى مع نجاحك — شائع جدًا عند الكبار. اتكلم عنهم بصراحة، وحط حدود.', '**burnout** = physical and mental exhaustion from long pressure — work + content + contributions can lead to it. **imposter syndrome** = feeling you are not good enough and will be found out, even when successful — very common among senior people. Talk about them openly, and set limits.'),
          '"I’m stepping back from maintaining the project for three months to avoid burnout. Omar will review PRs in the meantime."\n"Honestly, I still get imposter syndrome before every talk — I remind myself that I’m sharing what I’ve done, not claiming to know everything."'),
        L(B('تقول لأ للفرص', 'Saying no to opportunities'),
          B('مش كل فرصة تستاهل. اسأل: بتخدم الـ personal brand؟ عندي وقت؟ فيها مقابل (فلوس، جمهور، تعلّم)؟ الرفض المهذب بيحافظ على العلاقة ويفتح باب بعدين.', 'Not every opportunity is worth it. Ask: does it serve my personal brand? do I have time? is there a return (money, audience, learning)? A polite refusal keeps the relationship and leaves the door open.'),
          '"Thank you so much for the invitation — I’m honoured. Unfortunately, I can’t commit to a new talk before March without cutting corners on my client work. Could we keep in touch for the spring event? In the meantime, I’d recommend Sara Ali, who knows this topic brilliantly."')
      ],
      practice: [
        B('اكتب cold pitch لبودكاست أو مدونة.', 'Write a cold pitch to a podcast or blog.'),
        B('اكتب إعلان استراحة من مشروع.', 'Write an announcement stepping back from a project.'),
        B('اكتب رفض دعوة مع اقتراح بديل.', 'Write a refusal of an invitation with an alternative.'),
        B('اكتب «قواعد الفرص» بتاعتك في 5 نقط.', 'Write your «opportunity rules» in 5 points.')
      ],
      words: [
        W('podcast guest', 'ضيف بودكاست', 'a guest on a podcast', 'I was a podcast guest last month.'),
        W('cold pitch', 'عرض لحد ماتعرفوش', 'an unsolicited proposal', 'Keep a cold pitch under 120 words.'),
        W('burnout', 'احتراق نفسي', 'exhaustion from long stress', 'Take breaks to avoid burnout.'),
        W('imposter syndrome', 'متلازمة المحتال', 'feeling like a fraud despite success', 'Many experts have imposter syndrome.'),
        W('step back', 'تاخد خطوة لورا / تبعد مؤقتًا', 'to withdraw from a role for a while', 'I’m stepping back from the project until March.'),
        W('keep in touch', 'نفضل على تواصل', 'to stay in contact', 'Let’s keep in touch for the spring event.')
      ],
      read: [{ lib: 'TED Talks', what: B('دوّر على محاضرة عن burnout.', 'Search for a talk about burnout.') }],
      challenge: B('ابعت cold pitch حقيقي بالإنجليزي لبودكاست أو مدونة تقنية في مجالك (أقل من 120 كلمة، قيمة واضحة ليهم) — واكتب «قواعد الفرص» بتاعتك.', 'Send a real English cold pitch to a tech podcast or blog in your field (under 120 words, with clear value for them) — and write your «opportunity rules».'),
      quiz: [
        Q(B('cold pitch كويس:', 'A good cold pitch:'), ['short, personal, valuable to them', 'long and about you only', 'a copy-paste to 500 people'], 0, B('قيمة.', 'Value.')),
        Q(B('imposter syndrome:', 'Imposter syndrome:'), ['feeling like a fraud despite success', 'a security attack', 'a fake account'], 0, B('شعور.', 'A feeling.')),
        Q(B('رفض دعوة:', 'Declining an invitation:'), ['thank, decline, keep in touch, recommend someone', 'ignore it', 'say yes to everything'], 0, B('علاقة.', 'Relationship.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('عندك خطة حضور عام دولي.', 'You have an international public-presence plan.'),
      review: [
        B('مقترح المحاضرة والبايو والنقاشات الجماعية.', 'The talk proposal, the bio and panel discussions.'),
        B('المساهمة: الدليل والـ issue والـ PR description وردود المراجعة.', 'Contributing: the guide, the issue, the PR description and review replies.'),
        B('مشروعك: README والرخصة والإصدارات والمجتمع.', 'Your project: README, licence, releases and community.'),
        B('الكتابة للجمهور: العلامة الشخصية والبوست ودراسة الحالة.', 'Writing in public: personal brand, posts and case studies.'),
        B('الاستدامة: الـ pitches والاحتراق ورفض الفرص.', 'Sustainability: pitches, burnout and declining opportunities.')
      ],
      project: B('ابني «خطة حضور 6 شهور» بالإنجليزي ونفّذ أول خطوة من كل جزء: talk proposal متقدَّم، مساهمة مفتوحة المصدر (PR أو issue)، مشروع صغير منشور بـ README وrelease، LinkedIn post منشور، case study، وcold pitch مبعوت — مع قواعد الفرص وحدود تمنع الاحتراق.', 'Build an English «6-month presence plan» and carry out the first step of each part: a submitted talk proposal, an open-source contribution (a PR or an issue), a small published project with a README and a release, a published LinkedIn post, a case study, and a sent cold pitch — with your opportunity rules and limits that prevent burnout.'),
      test: [
        Q(B('meetup:', 'A meetup:'), ['an informal community event', 'a business contract', 'a sports match'], 0, B('مجتمع.', 'Community.')),
        Q(B('keynote:', 'A keynote:'), ['the main talk at an event', 'a musical note', 'a password'], 0, B('رئيسي.', 'Main.')),
        Q(B('moderator:', 'A moderator:'), ['the person running a discussion', 'a speaker only', 'a camera'], 0, B('إدارة.', 'Managing.')),
        Q(B('contributing guide:', 'A contributing guide:'), ['the rules for contributing', 'a tour guide', 'a salary guide'], 0, B('قواعد.', 'Rules.')),
        Q(B('PR title كويس:', 'A good PR title:'), ['Add Arabic locale to date parser', 'changes', 'fix stuff'], 0, B('واضح.', 'Clear.')),
        Q(B('upstream:', 'Upstream:'), ['the original project', 'a river', 'your fork'], 0, B('أصلي.', 'Original.')),
        Q(B('إصلاح bug: 2.4.1 ←', 'A bug fix: 2.4.1 →'), ['2.4.2', '2.5.0', '3.0.0'], 0, B('PATCH.', 'PATCH.')),
        Q(B('backwards compatible:', 'Backwards compatible:'), ['old code still works', 'runs backwards', 'deprecated'], 0, B('متوافق.', 'Compatible.')),
        Q(B('governance:', 'Governance:'), ['how decisions are made', 'a government job', 'a license'], 0, B('قرار.', 'Decisions.')),
        Q(B('thought leadership:', 'Thought leadership:'), ['original expert views', 'news summaries', 'ads'], 0, B('أصلي.', 'Original.')),
        Q(B('engagement:', 'Engagement:'), ['how much people interact', 'a wedding ring only', 'page views only'], 0, B('تفاعل.', 'Interaction.')),
        Q(B('burnout:', 'Burnout:'), ['exhaustion from long stress', 'a fire', 'a fast build'], 0, B('إرهاق.', 'Exhaustion.'))
      ] }
  ]
};
