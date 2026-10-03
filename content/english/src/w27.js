// English week 27 — Technical articles and research papers.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o, a, why });
module.exports = {
  level: 'B2',
  title: B('المقالات التقنية والأوراق البحثية', 'Technical articles and research papers'),
  goal: B('تقرا مقالات المهندسين والأوراق البحثية في الـ AI والبرمجة بفهم ونقد: الهيكل، وترتيب القراءة الذكي، ولغة الادعاءات الحذرة، ووصف الأرقام والرسومات، والاقتباس الأمين.',
          'Read engineers’ articles and research papers on AI and programming with understanding and a critical eye: the structure, a smart reading order, the language of careful claims, describing numbers and charts, and honest citing.'),
  days: [
    { title: B('المقال التقني', 'The technical article'),
      goal: B('تفهم مقال هندسي طويل وتطلع منه الفكرة الأساسية.', 'Understand a long engineering article and extract its main idea.'),
      learn: [
        L(B('الهيكل المعتاد', 'The usual structure'),
          B('مقالات المهندسين (Netflix، Cloudflare، GitHub Blog) غالبًا: **hook** (مشكلة أو رقم ملفت)، السياق، المحاولات اللي فشلت، الحل، النتايج بأرقام، الدروس، والحدود. العنوان والعناوين الفرعية بيقولولك 70% من القصة.', 'Engineering articles (Netflix, Cloudflare, the GitHub Blog) usually have: a **hook** (a problem or a striking number), the context, attempts that failed, the solution, results with numbers, lessons, and limits. The title and subheadings tell you 70% of the story.'),
          '"How we cut our CI time from 40 to 9 minutes"\n→ problem · what we tried · what worked · numbers · what we would do differently'),
        L(B('رأي ولا حقيقة', 'Opinion or fact'),
          B('فرّق بين **claim** (ادعاء) و**evidence** (دليل). «Microservices are always better» رأي. «After the split, deploys went from weekly to daily (see chart)» ادعاء بدليل. **opinion piece** (مقال رأي) مفيد بس اقراه كرأي واحد.', 'Separate a **claim** from **evidence**. «Microservices are always better» is an opinion. «After the split, deploys went from weekly to daily (see chart)» is a claim with evidence. An **opinion piece** is useful but read it as one view.'),
          'claim + evidence: "p95 latency fell 35% (Figure 2)"\nopinion: "Every team should use Rust."'),
        L(B('الخلاصة', 'The takeaway'),
          B('بعد ما تخلص، اكتب **takeaway** في جملة: «إيه اللي هتعمله مختلف بسبب المقال ده؟». لو مش لاقي، يمكن المقال مش ليك — ده كويس، وفّرت وقت. واحفظ الروابط المفيدة بخلاصاتها.', 'When you finish, write the **takeaway** in one sentence: «what will I do differently because of this article?». If you cannot find one, maybe the article is not for you — that is fine; you saved time. Save useful links with their takeaways.'),
          'Takeaway: "Cache the dependency folder in CI keyed by the lock file hash."')
      ],
      practice: [
        B('اقرا مقال من مدونة هندسية واكتب الهيكل في 6 نقط.', 'Read an article from an engineering blog and write its structure in 6 points.'),
        B('طلّع 3 claims ودليل كل واحد (أو مفيش دليل).', 'Extract 3 claims and the evidence for each (or the lack of it).'),
        B('اكتب takeaway في جملة.', 'Write the takeaway in one sentence.'),
        B('ابدأ ملف «قراءات» فيه اللينك والـ takeaway.', 'Start a «reading log» with the link and the takeaway.')
      ],
      words: [
        W('hook', 'بداية بتشد القارئ', 'an opening that grabs the reader', 'The hook was a 40-minute CI build.'),
        W('claim', 'ادعاء محتاج دليل', 'a statement that needs proof', 'Check every claim against the data.'),
        W('evidence', 'الدليل اللي بيدعم الادعاء', 'the proof supporting a claim', 'The chart is the evidence.'),
        W('opinion piece', 'مقال رأي شخصي', 'an article giving a personal view', 'Read the opinion piece as one view.'),
        W('takeaway', 'الخلاصة اللي هتطبقها', 'the main lesson you will apply', 'My takeaway: cache the dependencies.')
      ],
      read: ['lib:The Cloudflare Blog', { lib: 'Netflix TechBlog', what: B('اختار مقال واحد وطبّق خطوات النهارده.', 'Pick one article and apply today’s steps.') }],
      challenge: B('اقرا 3 مقالات هندسية الأسبوع ده، ولكل واحد اكتب: الهيكل، أهم claim ودليله، والـ takeaway — وشارك أحسنهم في رسالة لزميل بالإنجليزي.', 'Read 3 engineering articles this week and for each write: the structure, the main claim and its evidence, and the takeaway — share the best one with a colleague in an English message.'),
      quiz: [
        Q(B('«Our latency fell 35% (Figure 2)» هو:', '«Our latency fell 35% (Figure 2)» is:'), ['a claim with evidence', 'an opinion', 'a hook only'], 0, B('في دليل.', 'There is evidence.')),
        Q(B('takeaway هو:', 'A takeaway is:'), ['the main lesson you will apply', 'the article title', 'the author’s name'], 0, B('خلاصة.', 'A lesson.')),
        Q(B('«Everyone should use Rust» هو:', '«Everyone should use Rust» is:'), ['an opinion', 'evidence', 'a benchmark'], 0, B('رأي.', 'An opinion.'))
      ] },

    { title: B('الورقة البحثية', 'The research paper'),
      goal: B('تقرا ورقة بحثية بذكاء من غير ما تقراها كلها بالترتيب.', 'Read a research paper smartly without reading it all in order.'),
      learn: [
        L(B('الأقسام', 'The sections'),
          B('**Abstract**، Introduction، **Related Work** (أبحاث قبلها)، Method، Experiments/Results، Discussion، **Limitations**، Conclusion، References. أوراق الـ AI كتير منها **preprint** على arXiv (لسه متراجعتش رسميًا **peer review**) — اقراها بحذر أكتر.', '**Abstract**, Introduction, **Related Work** (earlier research), Method, Experiments/Results, Discussion, **Limitations**, Conclusion, References. Many AI papers are **preprints** on arXiv (not yet formally **peer reviewed**) — read them with extra care.'),
          'arXiv:2410.xxxxx [cs.CL] — preprint\nSections: 1 Introduction · 2 Related Work · 3 Method · 4 Experiments · 5 Limitations · 6 Conclusion'),
        L(B('ترتيب القراءة', 'The reading order'),
          B('مش من الأول للآخر: (1) Abstract، (2) الرسومات والجداول، (3) Conclusion، (4) Introduction (آخر فقرة فيها «our contributions»)، وبس لو مهم: (5) Method و(6) Limitations. بعد 15 دقيقة تعرف تقرر تكمّل ولا لأ.', 'Not front to back: (1) the abstract, (2) the figures and tables, (3) the conclusion, (4) the introduction (its last paragraph lists «our contributions»), and only if relevant: (5) the method and (6) the limitations. After 15 minutes you can decide whether to continue.'),
          '15-minute pass: abstract → figures → conclusion → contributions\ndeep pass (if useful): method → experiments → limitations'),
        L(B('الحدود دايمًا', 'Always the limitations'),
          B('قسم **Limitations** هو أصدق جزء: بيقولك النتيجة متنفعش فين (لغات تانية، بيانات صغيرة، موديلات تانية). قبل ما تطبّق فكرة ورقة في شغلك، اقراه. وشوف الـ **benchmark** اللي اتقاسوا عليه: شبه مشكلتك؟', 'The **Limitations** section is the most honest part: it says where the result does not hold (other languages, small data, other models). Before applying a paper’s idea at work, read it. And check the **benchmark** they measured on: is it like your problem?'),
          '"Our evaluation is limited to English; results may not transfer to other languages."')
      ],
      practice: [
        B('اختار ورقة عن RAG أو agents على arXiv واعمل قراءة 15 دقيقة.', 'Pick a paper on RAG or agents on arXiv and do a 15-minute pass.'),
        B('اكتب contributions الورقة في 3 نقط.', 'Write the paper’s contributions in 3 points.'),
        B('اقرا Limitations واكتب: ينفع لشغلي ولا لأ؟', 'Read the limitations and write: does it apply to my work?'),
        B('اوصف جدول نتايج واحد بجملتين.', 'Describe one results table in two sentences.')
      ],
      words: [
        W('research paper', 'ورقة بحثية علمية', 'a scientific research article', 'The research paper compares five RAG methods.'),
        W('related work', 'الأبحاث السابقة في نفس الموضوع', 'earlier research on the same topic', 'Related work lists earlier approaches.'),
        W('limitation', 'حد أو نقطة ضعف في البحث', 'a boundary or weakness of a study', 'The main limitation is English-only data.'),
        W('preprint', 'ورقة منشورة قبل المراجعة الرسمية', 'a paper published before formal review', 'Treat a preprint with care.'),
        W('peer review', 'مراجعة الورقة من باحثين تانيين قبل النشر', 'review of a paper by other researchers before publication', 'The paper passed peer review in 2025.')
      ],
      read: [{ t: 'arXiv: Computation and Language (cs.CL)', url: 'https://arxiv.org/list/cs.CL/recent', what: B('اختار ورقة بعنوان مفهوم وجرّب ترتيب القراءة.', 'Choose a paper with a clear title and try the reading order.') }, { t: 'S. Keshav: How to Read a Paper', url: 'https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf', what: B('اقرا طريقة التلات قراءات.', 'Read the three-pass method.') }],
      challenge: B('اعمل «قراءة 15 دقيقة» لـ 3 أوراق في موضوع واحد (مثلًا RAG)، وجدول: الفكرة، النتيجة، الحدود، ينفع لشغلي؟', 'Do a «15-minute pass» on 3 papers on one topic (e.g. RAG), with a table: idea, result, limitations, useful for my work?'),
      quiz: [
        Q(B('أول حاجة تقراها في ورقة:', 'The first thing to read in a paper:'), ['the abstract', 'the references', 'the appendix'], 0, B('ملخص.', 'The summary.')),
        Q(B('preprint:', 'A preprint is:'), ['published before formal peer review', 'a printed book', 'a final standard'], 0, B('بحذر.', 'Read with care.')),
        Q(B('قبل ما تطبّق فكرة ورقة اقرا:', 'Before applying a paper’s idea, read:'), ['the limitations', 'only the title', 'the acknowledgements'], 0, B('فين متنفعش.', 'Where it does not hold.'))
      ] },

    { title: B('لغة الادعاء الحذر', 'The language of careful claims'),
      goal: B('تفرّق بين «أثبتنا» و«بيبان إن» وتكتب ادعاءات دقيقة.', 'Tell «we proved» from «it appears that», and write precise claims.'),
      learn: [
        L(B('الأفعال الحذرة', 'Cautious verbs'),
          B('الباحثين بيستخدموا درجات: `shows/demonstrates` (قوي)، `suggests/indicates` (متوسط)، `may/might/could` و`appears to` (ضعيف). «Our results suggest that…» معناها «فيه مؤشر» مش «أثبتنا». اقرا الفعل عشان تعرف قوة الادعاء.', 'Researchers use degrees: `shows/demonstrates` (strong), `suggests/indicates` (medium), `may/might/could` and `appears to` (weak). «Our results suggest that…» means «there is an indication», not «we proved». Read the verb to know the strength of the claim.'),
          'demonstrates  > shows  > indicates > suggests > may / appears to'),
        L(B('كلمات بتتفهم غلط', 'Words that are misread'),
          B('**significant** في الأبحاث غالبًا = «إحصائيًا مش صدفة» مش «كبير». **state of the art** (SOTA) = أحسن نتيجة منشورة على benchmark معيّن، مش «أحسن حاجة في كل حاجة». **outperform** = نتيجته أعلى على القياس ده بس.', '**Significant** in research usually means «statistically unlikely to be chance», not «large». **State of the art** (SOTA) = the best published result on a specific benchmark, not «the best at everything». **Outperform** = scores higher on that measure only.'),
          '"Model B significantly outperforms A on MMLU (p < 0.05)"\n= B scores higher on that benchmark, and the gap is unlikely to be chance'),
        L(B('اكتب ادعاءاتك صح', 'Write your own claims properly'),
          B('في تقاريرك انت: قول قوة الدليل. «The new prompt improved accuracy from 85% to 92% on our 60-example test set» أحسن من «The new prompt is much better». وقول الحدود: «We have not tested it on voice notes yet».', 'In your own reports: state the strength of the evidence. «The new prompt improved accuracy from 85% to 92% on our 60-example test set» beats «The new prompt is much better». And state the limits: «We have not tested it on voice notes yet».'),
          '✗ "The new model is way better."\n✓ "On our 60-message test set, accuracy rose from 85% to 92%; voice notes are not yet tested."')
      ],
      practice: [
        B('رتّب 10 أفعال من الأقوى للأضعف.', 'Rank 10 verbs from strongest to weakest.'),
        B('طلّع 5 جمل ادعاء من ورقة وحدد قوة كل واحدة.', 'Extract 5 claim sentences from a paper and rate each one’s strength.'),
        B('أعد كتابة 4 ادعاءات مبالغ فيها بلغة دقيقة.', 'Rewrite 4 exaggerated claims in precise language.'),
        B('اكتب نتيجة تقييم برومبت بجملة فيها رقم وحدود.', 'Write a prompt evaluation result in a sentence with a number and limits.')
      ],
      words: [
        W('suggest', 'يشير إلى (من غير ما يثبت)', 'to indicate without proving', 'The data suggest a link.'),
        W('appear to', 'يبان إنه', 'to seem to', 'The model appears to ignore long contexts.'),
        W('significant', 'في الأبحاث: مش صدفة إحصائيًا', 'in research: statistically unlikely to be chance', 'The difference is significant at p < 0.05.'),
        W('state of the art', 'أحسن نتيجة منشورة على مقياس', 'the best published result on a benchmark', 'It is state of the art on one benchmark only.'),
        W('outperform', 'يتفوّق على في قياس معيّن', 'to score higher than on a given measure', 'B outperforms A on short questions.')
      ],
      read: ['lib:Purdue OWL', { lib: 'Plain Language Guidelines', what: B('شوف إزاي الأرقام بتتكتب بوضوح.', 'See how numbers are written clearly.') }],
      challenge: B('اكتب «تقرير نتايج» بالإنجليزي (نص صفحة) عن تجربة عملتها (برومبتين، موديلين، أو طريقتين): الرقم، حجم الاختبار، قوة الادعاء، والحدود.', 'Write a half-page English «results report» on an experiment you ran (two prompts, two models or two methods): the number, the test size, the strength of the claim and the limits.'),
      quiz: [
        Q(B('الأقوى:', 'The strongest:'), ['demonstrates', 'suggests', 'may'], 0, B('إثبات.', 'Proof.')),
        Q(B('«significant» في ورقة:', '«significant» in a paper usually means:'), ['unlikely to be due to chance', 'very large', 'important to the author'], 0, B('إحصائي.', 'Statistical.')),
        Q(B('أدق ادعاء:', 'The most precise claim:'), ['«Accuracy rose from 85% to 92% on 60 test messages.»', '«It is way better.»', '«Best model ever.»'], 0, B('رقم وحجم.', 'A number and a size.'))
      ] },

    { title: B('الأرقام والرسومات', 'Numbers and charts'),
      goal: B('توصف رسمة أو جدول بالإنجليزي بدقة.', 'Describe a chart or table in English precisely.'),
      learn: [
        L(B('وصف الاتجاه', 'Describing a trend'),
          B('**sharp increase** (طلع فجأة)، gradual rise، drop/fall، **plateau** (ثبت بعد ما كان بيطلع)، fluctuate (طلع ونزل)، peak (أعلى نقطة)، **outlier** (نقطة شاذة). ودايمًا قول من كام لكام وفي قد إيه.', '**Sharp increase**, gradual rise, drop/fall, **plateau** (levelled off after rising), fluctuate (went up and down), peak (the highest point), **outlier** (an unusual point). Always say from what to what and over what period.'),
          '"Accuracy rose sharply from 60% to 85% between v1 and v3, then plateaued.\n One outlier (v5) dropped to 70%."'),
        L(B('النسبة ونقطة النسبة', 'Percent and percentage points'),
          B('من 20% لـ 30%: ده **10 percentage points** زيادة، أو **50%** زيادة نسبية. الخلط بينهم بيضلّل. و«3 times faster» يعني الوقت بقى تلت، مش «300% أسرع» (اللي ممكن يتفهم 4 أضعاف).', 'From 20% to 30%: that is a **10 percentage point** increase, or a **50%** relative increase. Mixing them misleads. And «3 times faster» means the time became a third, not «300% faster» (which some read as 4×).'),
          'error rate 20% → 10%: "fell by 10 percentage points" = "halved"\nbuild 9 min → 3 min: "three times faster"'),
        L(B('اقرا الجدول صح', 'Read the table correctly'),
          B('قبل الأرقام: إيه الوحدة؟ (ms، %، $)، الأعلى أحسن ولا الأقل؟ (latency الأقل أحسن)، حجم العينة؟، وفين الـ **baseline**؟ الخط العريض (bold) في الجداول البحثية غالبًا الأحسن في العمود.', 'Before the numbers: what is the unit (ms, %, $)? Is higher or lower better (lower is better for latency)? What is the sample size? Where is the baseline? Bold numbers in research tables usually mark the best in the column.'),
          'Model | Accuracy ↑ | Latency (ms) ↓\nA     | 81.2       | 420\nB     | **84.5**   | **310**')
      ],
      practice: [
        B('اوصف 3 رسومات من مقال أو تقرير في جملتين لكل واحدة.', 'Describe 3 charts from an article or report in two sentences each.'),
        B('حوّل 5 تغييرات لـ percentage points ونسبة.', 'Express 5 changes as percentage points and as relative change.'),
        B('اقرا جدول نتايج وقول الأحسن في كل عمود وليه.', 'Read a results table and say the best in each column and why.'),
        B('اعمل رسمة لبياناتك واكتب لها caption.', 'Make a chart of your data and write a caption for it.')
      ],
      words: [
        W('sharp increase', 'زيادة كبيرة وسريعة', 'a large, fast rise', 'There was a sharp increase in errors at 9 a.m.'),
        W('plateau', 'يثبت بعد صعود', 'to level off after rising', 'Accuracy plateaued at 92%.'),
        W('outlier', 'قيمة شاذة بعيدة عن الباقي', 'a value far from the others', 'Remove the outlier before averaging.'),
        W('percentage point', 'فرق بين نسبتين بالنقط', 'the difference between two percentages', 'Errors fell by 10 percentage points.'),
        W('benchmark', 'اختبار قياسي للمقارنة', 'a standard test for comparison', 'Compare models on the same benchmark.')
      ],
      read: ['lib:Google Technical Writing Courses', { lib: 'NN/g: How users read on the web', what: B('شوف إزاي الناس بتقرا الأرقام.', 'See how people read numbers.') }],
      challenge: B('خد بيانات من مشروعك (أداء، أخطاء، مبيعات)، اعمل رسمتين، واكتب فقرة وصف لكل واحدة بالإنجليزي باستخدام كلمات الاتجاه والأرقام الدقيقة.', 'Take data from your project (performance, errors, sales), make two charts, and write a descriptive English paragraph for each using trend words and precise numbers.'),
      quiz: [
        Q(B('من 40% لـ 50%:', 'From 40% to 50%:'), ['10 percentage points, a 25% relative rise', '10% relative rise', '50 points'], 0, B('مختلفين.', 'They differ.')),
        Q(B('«plateau» معناها:', '«plateau» means:'), ['levelled off', 'fell sharply', 'peaked once'], 0, B('ثبت.', 'Stayed flat.')),
        Q(B('في عمود latency:', 'In a latency column:'), ['lower is better', 'higher is better', 'it does not matter'], 0, B('أسرع = أقل.', 'Faster = lower.'))
      ] },

    { title: B('القراءة الناقدة والاقتباس', 'Critical reading and citing'),
      goal: B('تقرا بعين ناقدة وتستخدم كلام غيرك بأمانة.', 'Read with a critical eye and use others’ words honestly.'),
      learn: [
        L(B('أسئلة الناقد', 'The critic’s questions'),
          B('اسأل: مين كتب ده وليه (شركة بتبيع المنتج؟)، **sample size** (قاسوا على كام؟)، مقارنة بإيه؟، فيه **anecdote** (حكاية واحدة) بدل بيانات؟، والنتيجة تنفع في ظروفي؟ **critique** مش هجوم — هي تقييم عادل لنقط القوة والضعف.', 'Ask: who wrote this and why (a company selling the product?), the **sample size** (measured on how many?), compared with what?, is there an **anecdote** (one story) instead of data?, and does the result apply to my situation? A **critique** is not an attack — it is a fair assessment of strengths and weaknesses.'),
          'claim: "AI agents replace 80% of support work"\nquestions: measured where? how many tickets? which kind? who sells the tool?'),
        L(B('اقتباس ولا إعادة صياغة', 'Quote or reword'),
          B('**quote**: الكلام بالحرف بين علامات تنصيص مع المصدر — للجمل المهمة جدًا أو التعريفات. إعادة صياغة: بكلامك انت مع المصدر برضه. وفي الحالتين **cite** (اذكر المصدر). نسخ كلام حد من غير ذكر = **plagiarism**، حتى في بوست لينكدإن.', 'A **quote**: the exact words in quotation marks with the source — for very important sentences or definitions. Rewording: in your own words, still with the source. In both cases **cite** the source. Copying someone’s words without credit = **plagiarism**, even in a LinkedIn post.'),
          'Quote: As Keshav (2007) puts it, "the first pass is a quick scan".\nReworded: Keshav suggests starting with a quick scan of the paper (Keshav, 2007).'),
        L(B('شكل المرجع', 'The reference format'),
          B('في التوثيق والمقالات التقنية يكفي: الكاتب أو الجهة، العنوان، السنة، والرابط. «Anthropic (2025). Building effective agents. https://…». في الـ README أو الـ PR حط اللينك جنب المعلومة اللي أخدتها منه.', 'In docs and technical articles this is enough: the author or organisation, the title, the year and the link. «Anthropic (2025). Building effective agents. https://…». In a README or PR, put the link next to the fact you took from it.'),
          'Reference: Keshav, S. (2007). How to Read a Paper. ACM SIGCOMM CCR. https://…')
      ],
      practice: [
        B('طبّق أسئلة الناقد على مقال تسويقي عن AI.', 'Apply the critic’s questions to a marketing article about AI.'),
        B('اختار 3 جمل من ورقة: اقتبس واحدة وأعد صياغة اتنين مع المصدر.', 'Pick 3 sentences from a paper: quote one and reword two, with the source.'),
        B('اكتب 3 مراجع بالشكل البسيط.', 'Write 3 references in the simple format.'),
        B('اكتب critique متوازن من 5 سطور لمقال.', 'Write a balanced 5-line critique of an article.')
      ],
      words: [
        W('critique', 'تقييم عادل لنقط القوة والضعف', 'a fair assessment of strengths and weaknesses', 'Write a short critique of the article.'),
        W('sample size', 'عدد الحالات اللي اتقاسوا', 'the number of cases measured', 'A sample size of 12 is too small.'),
        W('anecdote', 'حكاية شخصية واحدة مش بيانات', 'a single personal story, not data', 'One anecdote is not evidence.'),
        W('cite', 'تذكر المصدر', 'to name the source', 'Cite the paper when you use its idea.'),
        W('plagiarism', 'نسخ كلام حد من غير ذكره', 'copying someone’s words without credit', 'Copying a blog post is plagiarism.')
      ],
      read: ['lib:Purdue OWL', { t: 'Purdue OWL: Quoting, paraphrasing, and summarizing', url: 'https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/index.html', what: B('اقرا الفرق بين التلاتة.', 'Read the difference between the three.') }],
      challenge: B('اكتب «مراجعة نقدية» لمقال أو ورقة (صفحة): الملخص، نقط القوة، نقط الضعف بأسئلة الناقد، هل ينفع لشغلك، واقتباس واحد وإعادة صياغة اتنين بمراجع.', 'Write a one-page «critical review» of an article or paper: a summary, strengths, weaknesses using the critic’s questions, whether it suits your work, one quote and two rewordings with references.'),
      quiz: [
        Q(B('critique هو:', 'A critique is:'), ['a fair assessment of strengths and weaknesses', 'an attack', 'a summary only'], 0, B('متوازن.', 'Balanced.')),
        Q(B('إعادة صياغة فكرة حد:', 'Rewording someone’s idea:'), ['still needs the source', 'needs no source', 'is plagiarism always'], 0, B('cite.', 'Cite it.')),
        Q(B('«one customer told us…» هو:', '«one customer told us…» is:'), ['an anecdote', 'a large sample', 'a benchmark'], 0, B('حكاية واحدة.', 'One story.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('قراءة ناقدة لمحتوى تقني متقدم.', 'Critical reading of advanced technical content.'),
      review: [
        B('هيكل المقال، الادعاء والدليل، والـ takeaway.', 'Article structure, claims and evidence, and the takeaway.'),
        B('أقسام الورقة البحثية وترتيب القراءة والحدود.', 'Research paper sections, the reading order and the limitations.'),
        B('الأفعال الحذرة وsignificant وstate of the art.', 'Cautious verbs, significant and state of the art.'),
        B('وصف الاتجاهات، percentage points، وقراءة الجداول.', 'Describing trends, percentage points and reading tables.'),
        B('أسئلة الناقد، الاقتباس وإعادة الصياغة، والمراجع.', 'The critic’s questions, quoting and rewording, and references.')
      ],
      project: B('اكتب «مراجعة أدبيات صغيرة» بالإنجليزي (2–3 صفحات) عن موضوع AI بتشتغل فيه (RAG، evals، agents): 2 أوراق + 2 مقالات هندسية، لكل واحد ملخص وقوة الادعاء والحدود، ومقارنة بينهم في جدول، وتوصية لشغلك، ومراجع كاملة.', 'Write a 2–3 page English «mini literature review» on an AI topic you work on (RAG, evals, agents): 2 papers + 2 engineering articles, each with a summary, claim strength and limits, a comparison table, a recommendation for your work, and full references.'),
      test: [
        Q(B('أصدق جزء في الورقة غالبًا:', 'Often the most honest part of a paper:'), ['Limitations', 'Abstract', 'Title'], 0, B('بيقول فين متنفعش.', 'It says where it fails.')),
        Q(B('ترتيب قراءة سريع:', 'A quick reading order:'), ['abstract, figures, conclusion', 'references first', 'appendix first'], 0, B('15 دقيقة.', '15 minutes.')),
        Q(B('الأضعف:', 'The weakest:'), ['may', 'demonstrates', 'shows'], 0, B('احتمال.', 'A possibility.')),
        Q(B('SOTA معناها:', 'SOTA means:'), ['the best published result on a benchmark', 'perfect in every task', 'the oldest method'], 0, B('على مقياس معيّن.', 'On a given benchmark.')),
        Q(B('«3 times faster» من 9 دقايق:', '«3 times faster» than 9 minutes:'), ['3 minutes', '27 minutes', '6 minutes'], 0, B('الوقت تلت.', 'A third of the time.')),
        Q(B('20% → 15% أخطاء:', 'Errors 20% → 15%:'), ['down 5 percentage points', 'down 5%', 'up 5 points'], 0, B('نقط النسبة.', 'Percentage points.')),
        Q(B('outlier:', 'An outlier is:'), ['a value far from the others', 'the average', 'the baseline'], 0, B('شاذ.', 'Unusual.')),
        Q(B('claim من غير دليل:', 'A claim without evidence:'), ['treat it as opinion', 'accept it', 'cite it as fact'], 0, B('رأي.', 'Opinion.')),
        Q(B('preprint:', 'A preprint:'), ['is not yet peer reviewed', 'is a textbook', 'is a standard'], 0, B('حذر.', 'Careful.')),
        Q(B('اقتباس بالحرف:', 'An exact quote:'), ['uses quotation marks and the source', 'needs no source', 'is always plagiarism'], 0, B('cite.', 'Cite it.')),
        Q(B('sample size صغير جدًا:', 'A very small sample size:'), ['weakens the claim', 'proves it', 'does not matter'], 0, B('دليل ضعيف.', 'Weak evidence.')),
        Q(B('مرجع بسيط فيه:', 'A simple reference has:'), ['author, title, year, link', 'only a link', 'only the year'], 0, B('مكتمل.', 'Complete.'))
      ] }
  ]
};
