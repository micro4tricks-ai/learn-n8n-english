// Python week 39 — Evaluating LLM apps.
// The eval harness, metrics, judge aggregation, bootstrap and slicing run with the standard library;
// real model and judge calls are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('تقييم تطبيقات الـ LLM', 'Evaluating LLM apps'),
  goal: B('تبطّل تقول «شكله شغال» وتبدأ تقيس: تبني مجموعة اختبار وharness، تحسب precision وrecall وF1، تستخدم نموذج كحَكَم بـ rubric وتعايره بإنسان، تعرف الفرق حقيقي ولا صدفة بالإحصاء، وتحط التقييم في CI والإنتاج.',
          'Stop saying «looks like it works» and start measuring: build a test set and a harness, compute precision, recall and F1, use a model as a judge with a rubric and calibrate it against humans, tell real differences from chance with statistics, and put evaluation into CI and production.'),
  days: [
    { title: B('الـ harness', 'The harness'),
      goal: B('تشغّل نفس الاختبارات على أي نسخة.', 'Run the same tests on any version.'),
      learn: [
        L(B('ليه evals', 'Why evals'),
          B('تطبيق الـ LLM بيتغير مع كل تعديل في البرومبت أو النموذج أو الـ RAG — ومن غير قياس انت بتخمّن. **evals** = اختبارات بمدخلات ومخرجات متوقعة بتتشغّل على كل نسخة. ابدأ صغير: 30–50 **eval case** حقيقية أحسن من 0. وأول رقم تطلّعه هو الـ **baseline** اللي هتقارن بيه.', 'An LLM app changes with every edit to the prompt, model or RAG — without measurement you are guessing. **evals** = tests with inputs and expected outputs that run on every version. Start small: 30–50 real **eval case** entries beat zero. The first number you produce is the **baseline** to compare against.'),
          'eval case (one line of a JSONL test set)\n{"id": "c017", "input": "الشحنة اتأخرت أسبوع ومحدش بيرد", "expected": "shipping",\n "tags": ["arabic", "angry"], "source": "real ticket 2026-09, anonymised"}', T),
        L(B('harness بسيط', 'A simple harness'),
          B('الـ harness: يقرا الـ **test set**، يشغّل النظام على كل حالة، يقارن، ويطلّع تقرير. خلي النظام دالة (`predict(text) -> label`) عشان تبدّل بين fake وClaude ونسخ برومبت. وأبسط مقياس: **exact match**.', 'The harness: read the **test set**, run the system on every case, compare, and produce a report. Make the system a function (`predict(text) -> label`) so you can swap between a fake, Claude and prompt versions. The simplest metric: **exact match**.'),
          'TEST_SET = [\n    {"id": "c1", "input": "I was charged twice", "expected": "billing"},\n    {"id": "c2", "input": "parcel not here after 9 days", "expected": "shipping"},\n    {"id": "c3", "input": "the app crashes on login", "expected": "technical"},\n    {"id": "c4", "input": "I want my money back for the broken mug", "expected": "refund"},\n    {"id": "c5", "input": "where is my order", "expected": "shipping"},\n    {"id": "c6", "input": "refund the double charge please", "expected": "billing"},\n]\n\ndef predict_v1(text):                      # stand-in for a prompt + model\n    t = text.lower()\n    if "refund" in t or "money back" in t: return "refund"\n    if "charge" in t: return "billing"\n    if "crash" in t or "login" in t: return "technical"\n    return "shipping"\n\ndef run_eval(predict, cases):\n    rows = [(c["id"], c["expected"], predict(c["input"])) for c in cases]\n    acc = sum(e == p for _, e, p in rows) / len(rows)\n    return acc, [r for r in rows if r[1] != r[2]]\n\nacc, wrong = run_eval(predict_v1, TEST_SET)\nprint(f"exact match: {acc:.0%}")\nfor case_id, expected, got in wrong:\n    print(f"  {case_id}: expected {expected}, got {got}")', R),
        L(B('مع Claude', 'With Claude'),
          B('نفس الـ harness بيشغّل النظام الحقيقي: `predict` بتنادي Claude ببرومبت التصنيف (أسبوع 23). خلّي الـ temperature ثابتة للتصنيف، وخزّن الردود (cache) عشان متدفعش تاني على نفس الحالة لو مغيرتش حاجة.', 'The same harness runs the real system: `predict` calls Claude with the classification prompt (week 23). Keep settings fixed for classification, and cache replies so you do not pay again for an unchanged case.'),
          'import hashlib, json, pathlib\nimport anthropic\n\nclient = anthropic.Anthropic()\nCACHE = pathlib.Path(".eval_cache"); CACHE.mkdir(exist_ok=True)\nPROMPT_VERSION = "classify-v3"\n\ndef predict_claude(text: str) -> str:\n    key = hashlib.sha256(f"{PROMPT_VERSION}|{text}".encode()).hexdigest()\n    f = CACHE / f"{key}.json"\n    if f.exists():\n        return json.loads(f.read_text())["label"]\n    r = client.messages.create(model="claude-opus-5-5", max_tokens=16000,\n                               messages=[{"role": "user", "content": build_prompt(text)}])\n    label = "".join(b.text for b in r.content if b.type == "text").strip().lower()\n    f.write_text(json.dumps({"label": label}))\n    return label\n\nacc, wrong = run_eval(predict_claude, load_jsonl("test_set.jsonl"))')
      ],
      practice: [
        B('اكتب test set من 30 حالة حقيقية (مجهّلة).', 'Write a test set of 30 real (anonymised) cases.'),
        B('شغّل الـ harness على predict_v1 وصلّح حالة.', 'Run the harness on predict_v1 and fix a case.'),
        B('ضيف tags لكل حالة (عربي، غاضب، طويل).', 'Add tags to each case (Arabic, angry, long).'),
        B('خزّن الـ baseline في ملف بتاريخ.', 'Store the baseline in a dated file.')
      ],
      words: [
        W('evals', 'اختبارات تقييم لتطبيقات الـ AI', 'tests that measure an AI app', 'Run the evals before every release.'),
        W('eval case', 'حالة تقييم: مدخل ونتيجة متوقعة', 'one input with its expected output', 'Each eval case has tags.'),
        W('test set', 'مجموعة الاختبار', 'the collection of eval cases', 'Never tune the prompt on the test set alone.'),
        W('baseline', 'الرقم المرجعي للمقارنة', 'the reference result to compare with', 'The baseline accuracy was 81%.'),
        W('exact match', 'تطابق تام', 'output equal to the expected value', 'Exact match works for labels.'),
        W('offline evaluation', 'تقييم قبل الإنتاج', 'evaluation on a fixed test set', 'Offline evaluation runs in CI.')
      ],
      read: [{ t: 'Claude docs: Define success criteria and build evaluations', url: 'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests', what: B('اقرا الأمثلة وأنواع التقييم.', 'Read the examples and kinds of grading.') }],
      challenge: B('ابني harness حقيقي: test set بـ JSONL، `run_eval(predict, cases)` بتقرير (الدقة، الحالات الغلط، حسب tag)، cache للردود، وتشغيل على fake وعلى Claude (لو فيه مفتاح) — واحفظ الـ baseline.', 'Build a real harness: a JSONL test set, `run_eval(predict, cases)` with a report (accuracy, wrong cases, per tag), a reply cache, and runs on a fake and on Claude (if you have a key) — and save the baseline.'),
      quiz: [
        Q(B('من غير evals:', 'Without evals:'), [['انت بتخمّن', 'you are guessing'], ['انت متأكد', 'you are sure'], ['أسرع دايمًا', 'always faster']], 0, B('قياس.', 'Measurement.')),
        Q(B('baseline:', 'A baseline:'), [['أول رقم للمقارنة', 'the first number to compare with'], ['أحسن نتيجة ممكنة', 'the best possible result'], ['خطأ', 'an error']], 0, B('مرجع.', 'Reference.')),
        Q(B('تبديل fake وClaude بسهولة:', 'Swapping fake and Claude easily:'), [['النظام دالة predict', 'the system is a predict function'], ['نسخ الكود', 'copying code'], ['مستحيل', 'impossible']], 0, B('واجهة.', 'An interface.'))
      ] },

    { title: B('المقاييس', 'Metrics'),
      goal: B('الرقم الصح للسؤال الصح.', 'The right number for the right question.'),
      learn: [
        L(B('precision وrecall', 'Precision and recall'),
          B('الدقة الإجمالية بتخبّي الحقيقة لو الفئات مش متوازنة. لكل فئة: **precision** = من اللي قلت إنه «refund»، كام فعلًا refund؟ **recall** = من الـ refund الحقيقية، لقيت كام؟ و**f1 score** = متوسط توافقي للاتنين. و**confusion matrix** بتوريك بيتلخبط بين إيه وإيه.', 'Overall accuracy hides the truth when classes are unbalanced. Per class: **precision** = of what you called «refund», how many really were? **recall** = of the real refunds, how many did you find? The **f1 score** = their harmonic mean. And a **confusion matrix** shows what gets confused with what.'),
          'from collections import Counter\n\npairs = [("billing", "billing"), ("billing", "refund"), ("refund", "refund"), ("refund", "refund"),\n         ("refund", "billing"), ("shipping", "shipping"), ("shipping", "shipping"), ("technical", "shipping"),\n         ("technical", "technical"), ("shipping", "shipping")]          # (expected, predicted)\nlabels = sorted({e for e, _ in pairs})\nconf = Counter(pairs)\n\nprint("expected \\\\ predicted".ljust(20) + "".join(l[:8].rjust(10) for l in labels))\nfor e in labels:\n    print(e.ljust(20) + "".join(str(conf[(e, p)]).rjust(10) for p in labels))\nprint()\nfor l in labels:\n    tp = conf[(l, l)]\n    fp = sum(conf[(e, l)] for e in labels if e != l)\n    fn = sum(conf[(l, p)] for p in labels if p != l)\n    prec = tp / (tp + fp) if tp + fp else 0\n    rec = tp / (tp + fn) if tp + fn else 0\n    f1 = 2 * prec * rec / (prec + rec) if prec + rec else 0\n    print(f"{l:<10} precision {prec:.2f}  recall {rec:.2f}  f1 {f1:.2f}")', R),
        L(B('أنهي واحد أهم؟', 'Which matters more?'),
          B('حسب تكلفة الغلط: كشف احتيال أو شكوى قانونية = recall أهم (متفوّتش). إرسال تلقائي لعميل = precision أهم (متبعتش غلط). اكتب ده صراحة في معيار النجاح: «recall للشكاوى القانونية ≥ 0.95».', 'It depends on the cost of a mistake: fraud detection or a legal complaint = recall matters more (miss nothing). Auto-sending to a customer = precision matters more (send nothing wrong). Write it explicitly in the success criteria: «recall for legal complaints ≥ 0.95».'),
          'success criteria (written before building)\n- legal complaints:     recall ≥ 0.95   (a miss is expensive)\n- auto-reply «shipping»: precision ≥ 0.97 (a wrong auto-reply annoys customers)\n- overall macro F1 ≥ 0.85\n- JSON valid in 100% of cases\n- p95 latency ≤ 4 s, cost ≤ $0.01 per ticket', T),
        L(B('تقييم الاستخراج', 'Scoring extraction'),
          B('في استخراج حقول (فاتورة، طلب) قيّم كل حقل لوحده: النص بعد تطبيع (مسافات، حروف كبيرة)، الأرقام بـ **tolerance** صغيرة، والتواريخ بصيغة موحدة. وقيس **json validity** و**schema validation** كمقياس مستقل — رد مكسور = فشل كامل.', 'For field extraction (an invoice, an order), score each field separately: text after normalising (spaces, case), numbers with a small **tolerance**, and dates in one format. And measure **json validity** and **schema validation** as a separate metric — a broken reply is a full failure.'),
          'import json\n\nexpected = {"customer": "Mona Ali", "total": 650.0, "date": "2026-10-01", "city": "Mansoura"}\nreplies = [\'{"customer": "mona  ali", "total": 650.004, "date": "2026-10-01", "city": "Mansoura"}\',\n           \'{"customer": "Mona Ali", "total": 560, "date": "01/10/2026"}\',\n           \'customer: Mona, total 650\']\n\ndef norm(s):\n    return " ".join(str(s).lower().split())\n\ndef score(reply):\n    try:\n        got = json.loads(reply)\n    except json.JSONDecodeError:\n        return {"valid_json": False}\n    out = {"valid_json": True}\n    for k, v in expected.items():\n        g = got.get(k)\n        out[k] = abs(g - v) <= 0.01 if isinstance(v, float) and isinstance(g, (int, float)) else norm(g) == norm(v)\n    return out\n\nfor r in replies:\n    s = score(r)\n    fields = [k for k in expected if s.get(k)]\n    print(s["valid_json"], f"{len(fields)}/{len(expected)} fields", fields)', R)
      ],
      practice: [
        B('احسب precision وrecall لـ 4 فئات من نتايجك.', 'Compute precision and recall for 4 classes from your results.'),
        B('اكتب معايير نجاح لتطبيقك بأرقام.', 'Write numeric success criteria for your app.'),
        B('قيّم استخراج 10 فواتير حقل حقل.', 'Score the extraction of 10 invoices field by field.'),
        B('حدد الـ tolerance المناسبة لكل حقل رقمي.', 'Pick the right tolerance for each numeric field.')
      ],
      words: [
        W('precision', 'الدقة: من اللي قلت عليه صح، كام صح فعلًا', 'of the predicted positives, the share that are right', 'Auto-replies need high precision.'),
        W('recall', 'الاستدعاء: من الصح الحقيقي، لقيت كام', 'of the real positives, the share found', 'Legal complaints need high recall.'),
        W('f1 score', 'متوسط توافقي للـ precision والـ recall', 'the harmonic mean of precision and recall', 'Macro F1 averages over classes.'),
        W('confusion matrix', 'مصفوفة اللخبطة بين الفئات', 'a table of expected versus predicted classes', 'The confusion matrix shows billing vs refund mix-ups.'),
        W('tolerance', 'هامش سماح', 'an allowed small difference', 'Totals match within a tolerance of 0.01.'),
        W('json validity', 'إن الرد JSON سليم', 'whether a reply parses as JSON', 'Track JSON validity separately.'),
        W('schema validation', 'التحقق من شكل البيانات', 'checking data against a schema', 'Schema validation caught a missing field.')
      ],
      read: [{ lib: 'Pydantic documentation', what: B('راجع ValidationError لقياس الـ schema.', 'Review ValidationError for schema scoring.') }],
      challenge: B('طوّر الـ harness: confusion matrix وprecision/recall/F1 لكل فئة وmacro F1، تقييم استخراج حقل حقل بـ tolerance، json validity — وقارنهم بمعايير النجاح المكتوبة وطلّع PASS/FAIL.', 'Extend the harness: a confusion matrix, per-class precision/recall/F1 and macro F1, field-by-field extraction scoring with tolerance, JSON validity — and compare against the written success criteria with PASS/FAIL.'),
      quiz: [
        Q(B('كشف شكاوى قانونية:', 'Detecting legal complaints:'), [['recall أهم', 'recall matters more'], ['precision بس', 'precision only'], ['السرعة بس', 'speed only']], 0, B('متفوّتش.', 'Miss nothing.')),
        Q(B('رد مش JSON:', 'A reply that is not JSON:'), [['فشل كامل', 'a full failure'], ['نص نجاح', 'half a success'], ['مقبول', 'acceptable']], 0, B('صلاحية.', 'Validity.')),
        Q(B('confusion matrix بتوريك:', 'A confusion matrix shows:'), [['الفئات اللي بتتلخبط مع بعض', 'which classes get mixed up'], ['السرعة', 'speed'], ['التكلفة', 'cost']], 0, B('أخطاء.', 'Errors.'))
      ] },

    { title: B('النموذج كحَكَم', 'The model as judge'),
      goal: B('تقيّم إجابات مفتوحة بشكل موثوق.', 'Grade open-ended answers reliably.'),
      learn: [
        L(B('rubric', 'A rubric'),
          B('ردود الدعم والملخصات ملهاش «إجابة واحدة صح». **llm-as-judge** = نموذج بيقيّم الرد بـ **rubric** محدد (معايير ودرجات واضحة)، ويرجّع درجة وسبب بشكل منظم. الـ rubric الكويس: معايير منفصلة (صح، كامل، نبرة، أمان)، كل واحد بوصف لكل درجة.', 'Support replies and summaries have no «single right answer». **llm-as-judge** = a model grades the reply with a specific **rubric** (clear criteria and scores) and returns a score and a reason in a structured shape. A good rubric: separate criteria (correct, complete, tone, safety), each with a description per score.'),
          'JUDGE = """You are grading a customer-support reply. Use the rubric. Reply with JSON only.\n\n<rubric>\ncorrect  (0-2): 2 = every fact matches the policy; 1 = minor slip; 0 = wrong or invented\ncomplete (0-2): 2 = answers every question and gives the next step; 1 = partial; 0 = misses the point\ntone     (0-1): 1 = polite, calm and specific; 0 = cold, defensive or rude\nsafety   (0-1): 1 = no promises outside policy, no private data; 0 = otherwise\n</rubric>\n\n<policy>{policy}</policy>\n<customer>{question}</customer>\n<reply>{reply}</reply>\n\n{{"correct": n, "complete": n, "tone": n, "safety": n, "reason": "one sentence"}}"""\n\nprompt = JUDGE.format(policy="Damaged items are replaced within 14 days.",\n                      question="My mug arrived broken.", reply="Sorry! Send a photo and we will replace it.")\nprint(prompt[prompt.index("<policy>"):])', R),
        L(B('المقارنة الزوجية والتحيز', 'Pairwise comparison and bias'),
          B('**pairwise comparison** = «أنهي رد أحسن، A ولا B؟» أسهل وأثبت من درجات مطلقة — مفيدة لمقارنة نسختين برومبت. بس فيه **position bias**: الحَكَم ممكن يفضّل الأول. الحل: قيّم مرتين بالترتيب معكوس، واعتبر النتيجة بس لو اتفقوا.', '**pairwise comparison** = «which reply is better, A or B?» is easier and steadier than absolute scores — useful for comparing two prompt versions. But there is **position bias**: the judge may prefer the first. The fix: judge twice with the order swapped, and count the result only if both agree.'),
          'def judge(first, second):\n    """Stand-in judge with a slight preference for the first position."""\n    score = {"A": 0.62, "B": 0.58}\n    return "first" if score[first] + 0.05 >= score[second] else "second"\n\ndef fair_compare(a, b):\n    r1 = judge(a, b)                       # A shown first\n    r2 = judge(b, a)                       # B shown first\n    win1 = a if r1 == "first" else b\n    win2 = b if r2 == "first" else a\n    return win1 if win1 == win2 else "tie (position bias)"\n\nprint("A first:", judge("A", "B"), "| B first:", judge("B", "A"))\nprint("fair result:", fair_compare("A", "B"))', R),
        L(B('عايِر الحَكَم', 'Calibrate the judge'),
          B('الحَكَم نفسه محتاج اختبار. **judge calibration**: خلي إنسان (أو اتنين) يقيّموا 50 رد، وقيس اتفاق الحَكَم معاهم. لو الـ **inter-rater agreement** بين البشر نفسهم واطي، الـ rubric غامض — صلّحه الأول. واستخدم Cohen’s kappa عشان يشيل أثر الاتفاق بالصدفة.', 'The judge itself needs testing. **judge calibration**: have a person (or two) grade 50 replies and measure the judge’s agreement with them. If the **inter-rater agreement** between the humans is low, the rubric is vague — fix it first. Use Cohen’s kappa to remove agreement by chance.'),
          'from collections import Counter\n\nhuman = ["good", "good", "bad", "good", "bad", "good", "good", "bad", "good", "good"]\njudge = ["good", "good", "bad", "bad", "bad", "good", "good", "good", "good", "good"]\n\ndef kappa(a, b):\n    n = len(a)\n    observed = sum(x == y for x, y in zip(a, b)) / n\n    ca, cb = Counter(a), Counter(b)\n    expected = sum(ca[k] * cb[k] for k in ca) / (n * n)\n    return observed, (observed - expected) / (1 - expected)\n\nobs, k = kappa(human, judge)\nprint(f"raw agreement {obs:.0%}, Cohen\'s kappa {k:.2f}")\nprint("disagreements:", [i for i, (h, j) in enumerate(zip(human, judge)) if h != j])', R)
      ],
      practice: [
        B('اكتب rubric لردود الدعم بتاعتك.', 'Write a rubric for your support replies.'),
        B('قارن نسختين برومبت زوجيًا بترتيب معكوس.', 'Compare two prompt versions pairwise with swapped order.'),
        B('قيّم 20 رد بنفسك وقيس kappa مع الحَكَم.', 'Grade 20 replies yourself and measure kappa with the judge.'),
        B('صلّح الـ rubric في أكتر معيار فيه خلاف.', 'Fix the rubric criterion with the most disagreement.')
      ],
      words: [
        W('llm-as-judge', 'نموذج بيقيّم ردود نموذج', 'a model grading model outputs', 'LLM-as-judge scores tone and completeness.'),
        W('rubric', 'معايير ودرجات واضحة للتقييم', 'clear grading criteria and scores', 'A vague rubric gives random scores.'),
        W('pairwise comparison', 'مقارنة ردين ببعض', 'choosing the better of two outputs', 'Pairwise comparison picked prompt B.'),
        W('position bias', 'تحيز للترتيب', 'favouring an option because of its position', 'Swap the order to cancel position bias.'),
        W('judge calibration', 'معايرة الحَكَم بتقييم بشري', 'checking a judge against human grades', 'Judge calibration showed 88% agreement.'),
        W('inter-rater agreement', 'اتفاق المقيّمين', 'how much graders agree', 'Low inter-rater agreement means an unclear rubric.')
      ],
      read: [{ t: 'Claude docs: Define success criteria and build evaluations', url: 'https://platform.claude.com/docs/en/test-and-evaluate/develop-tests', what: B('اقرا جزء LLM-based grading.', 'Read the LLM-based grading part.') }],
      challenge: B('ابني «حَكَم ردود الدعم»: rubric بـ 4 معايير، دالة judge (fake أو Claude) بترجّع JSON متحقق منه، مقارنة زوجية بترتيب معكوس، و30 رد مقيّمين بإيدك لقياس kappa — واكتب إمتى تثق في الحَكَم.', 'Build a «support-reply judge»: a 4-criterion rubric, a judge function (fake or Claude) returning validated JSON, swapped-order pairwise comparison, and 30 hand-graded replies to measure kappa — and write when you trust the judge.'),
      quiz: [
        Q(B('الحَكَم بيفضّل الأول دايمًا:', 'The judge always prefers the first:'), [['position bias؛ اعكس الترتيب', 'position bias; swap the order'], ['الأول أحسن فعلًا', 'the first really is better'], ['مفيش مشكلة', 'no problem']], 0, B('تحيز.', 'Bias.')),
        Q(B('البشر نفسهم مش متفقين:', 'Humans themselves disagree:'), [['الـ rubric غامض', 'the rubric is vague'], ['الحَكَم ممتاز', 'the judge is excellent'], ['زوّد الحالات بس', 'just add cases']], 0, B('وضوح.', 'Clarity.')),
        Q(B('kappa بيشيل:', 'Kappa removes:'), [['الاتفاق بالصدفة', 'agreement by chance'], ['الأخطاء', 'errors'], ['البيانات', 'the data']], 0, B('صدفة.', 'Chance.'))
      ] },

    { title: B('حقيقي ولا صدفة؟', 'Real or chance?'),
      goal: B('تعرف التحسن حقيقي قبل ما تحتفل.', 'Know an improvement is real before celebrating.'),
      learn: [
        L(B('حجم العينة', 'Sample size'),
          B('82% على 50 حالة مقابل 86% = فرق حالتين بس — ممكن صدفة. كل ما الـ **sample size** يكبر، الرقم يثبت. القاعدة التقريبية: هامش الخطأ ≈ 1/√n (50 حالة ≈ ±14%، 400 ≈ ±5%). متعلنش تحسّن أصغر من الهامش.', '82% on 50 cases versus 86% = a difference of just two cases — possibly chance. The bigger the **sample size**, the steadier the number. A rough rule: the margin of error ≈ 1/√n (50 cases ≈ ±14%, 400 ≈ ±5%). Do not announce an improvement smaller than the margin.'),
          'import math\nfor n in (50, 100, 400, 1000):\n    print(f"n={n:<5} rough margin ±{1 / math.sqrt(n):.0%}")', R),
        L(B('فترة الثقة بالـ bootstrap', 'A bootstrap confidence interval'),
          B('**bootstrap** = تسحب عينات عشوائية بإرجاع من نتايجك آلاف المرات وتحسب المقياس كل مرة؛ الـ 2.5% و97.5% = **confidence interval** 95%. ولمقارنة نسختين على نفس الحالات: bootstrap للفرق. لو الفترة فيها صفر، الفرق مش مؤكد (**statistical significance** ضعيفة).', 'The **bootstrap** = resample your results randomly with replacement thousands of times and compute the metric each time; the 2.5% and 97.5% points = a 95% **confidence interval**. To compare two versions on the same cases: bootstrap the difference. If the interval includes zero, the difference is not established (weak **statistical significance**).'),
          'import random\nrandom.seed(7)\n\n# 1 = correct, 0 = wrong, on the SAME 60 cases\nv1 = [1] * 48 + [0] * 12\nv2 = v1[:]\nfor i in (50, 51, 52, 53, 55):          # v2 fixes 5 cases…\n    v2[i] = 1\nfor i in (3, 9):                        # …and breaks 2\n    v2[i] = 0\n\ndef ci(values, reps=4000):\n    n = len(values)\n    stats = sorted(sum(random.choices(values, k=n)) / n for _ in range(reps))\n    return stats[int(reps * 0.025)], stats[int(reps * 0.975)]\n\ndiff = [b - a for a, b in zip(v1, v2)]\nprint(f"v1 {sum(v1)/60:.1%}  v2 {sum(v2)/60:.1%}")\nlo, hi = ci(diff)\nprint(f"difference 95% CI: [{lo:+.1%}, {hi:+.1%}]", "→ not established" if lo <= 0 <= hi else "→ real improvement")', R),
        L(B('السرعة والتكلفة', 'Speed and cost'),
          B('الجودة مش كل حاجة: قيس **latency** بالـ **p95** (95% من الطلبات أسرع من الرقم ده — المتوسط بيخبّي البطء) و**cost per task**. نسخة أدق بـ 1% بس أبطأ مرتين وأغلى 3 مرات ممكن متستاهلش. اعرض الاتنين جنب بعض.', 'Quality is not everything: measure **latency** at **p95** (95% of requests are faster than this — the average hides slowness) and **cost per task**. A version 1% more accurate but twice as slow and three times the cost may not be worth it. Show them side by side.'),
          'import statistics\n\nlatencies = {"v1": [1.2, 1.4, 1.1, 1.3, 1.5, 1.2, 4.8, 1.3, 1.4, 1.2],\n             "v2": [2.1, 2.4, 2.2, 2.0, 2.6, 2.3, 2.2, 2.5, 2.1, 2.4]}\ncost = {"v1": 0.004, "v2": 0.011}\naccuracy = {"v1": 0.86, "v2": 0.87}\n\ndef p95(xs):\n    return statistics.quantiles(xs, n=20, method="inclusive")[-1]\n\nfor v in latencies:\n    print(f"{v}: acc {accuracy[v]:.0%}  mean {statistics.mean(latencies[v]):.2f}s  p95 {p95(latencies[v]):.2f}s  ${cost[v]:.3f}/task")', R)
      ],
      practice: [
        B('احسب هامش الخطأ لحجم الـ test set بتاعك.', 'Compute the margin of error for your test-set size.'),
        B('شغّل bootstrap للفرق بين نسختين.', 'Run a bootstrap of the difference between two versions.'),
        B('احسب p95 وcost per task لنسختين.', 'Compute p95 and cost per task for two versions.'),
        B('اكتب قرار: أنهي نسخة وليه بالأرقام.', 'Write a decision: which version and why, with numbers.')
      ],
      words: [
        W('sample size', 'حجم العينة', 'the number of cases measured', 'A larger sample size steadies the number.'),
        W('bootstrap', 'إعادة سحب عينات عشوائية', 'resampling with replacement to estimate uncertainty', 'Bootstrap the difference between prompts.'),
        W('confidence interval', 'فترة الثقة', 'the range the true value likely falls in', 'The 95% confidence interval includes zero.'),
        W('statistical significance', 'دلالة إحصائية', 'evidence that a difference is not chance', 'Two cases are not statistical significance.'),
        W('latency', 'زمن الاستجابة', 'the time to respond', 'Latency doubled with the bigger prompt.'),
        W('p95', 'الشريحة 95%: أبطأ 5% بيبدأوا هنا', 'the value 95% of requests are under', 'Report p95, not only the mean.'),
        W('cost per task', 'التكلفة لكل مهمة', 'money spent per completed task', 'Cost per task fell to half a cent.')
      ],
      read: [{ lib: 'Python Data Science Handbook', what: B('راجع الإحصاء الوصفي والتوزيعات.', 'Review descriptive statistics and distributions.') }],
      challenge: B('قارن نسختين برومبت حقيقيتين على test set بتاعك: الدقة لكل واحدة، bootstrap CI للفرق، p95 وcost per task، وقرار مكتوب «نغيّر ولا لأ» — حتى لو القرار «الفرق مش مؤكد».', 'Compare two real prompt versions on your test set: each one’s accuracy, a bootstrap CI for the difference, p95 and cost per task, and a written decision «switch or not» — even if the decision is «the difference isn’t established».'),
      quiz: [
        Q(B('فرق 2% على 50 حالة:', 'A 2% difference on 50 cases:'), [['غالبًا صدفة', 'probably chance'], ['تحسّن مؤكد', 'a certain improvement'], ['كارثة', 'a disaster']], 0, B('هامش.', 'Margin.')),
        Q(B('فترة الثقة للفرق فيها صفر:', 'The CI of the difference includes zero:'), [['الفرق مش مؤكد', 'the difference isn’t established'], ['النسخة التانية أحسن أكيد', 'the second is surely better'], ['خطأ في الكود', 'a code bug']], 0, B('دلالة.', 'Significance.')),
        Q(B('ليه p95 مش المتوسط؟', 'Why p95 and not the mean?'), [['المتوسط بيخبّي الطلبات البطيئة', 'the mean hides slow requests'], ['أسهل', 'it’s easier'], ['أصغر دايمًا', 'it’s always smaller']], 0, B('الذيل.', 'The tail.'))
      ] },

    { title: B('التقييم في CI والإنتاج', 'Evaluation in CI and production'),
      goal: B('التقييم بقى جزء من كل تغيير.', 'Evaluation is part of every change.'),
      learn: [
        L(B('اختبار رجوع في CI', 'Regression tests in CI'),
          B('**regression test** = الـ evals بتشتغل في CI مع كل تغيير في البرومبت أو الكود، والـ PR بيفشل لو المقاييس نزلت تحت حدود معينة. خزّن البرومبت بـ **prompt version** في Git زي الكود. واستخدم fake أو cache للحالات اللي متغيرتش عشان CI يفضل رخيص.', 'A **regression test** = the evals run in CI on every prompt or code change, and the PR fails if metrics fall below set thresholds. Keep the prompt under a **prompt version** in Git like code. And use a fake or cache for unchanged cases so CI stays cheap.'),
          '# tests/test_eval.py  — run with: pytest -q\nimport json, pathlib\nfrom app.classify import predict, PROMPT_VERSION\nfrom evals.harness import run_eval, per_class\n\nCASES = [json.loads(l) for l in pathlib.Path("evals/test_set.jsonl").read_text(encoding="utf8").splitlines()]\n\ndef test_overall_accuracy():\n    acc, wrong = run_eval(predict, CASES)\n    assert acc >= 0.85, f"{PROMPT_VERSION}: accuracy {acc:.2%} < 85%; wrong: {wrong[:5]}"\n\ndef test_legal_recall():\n    assert per_class(predict, CASES)["legal"]["recall"] >= 0.95\n\ndef test_json_always_valid():\n    assert all(is_valid_json(predict(c["input"], raw=True)) for c in CASES)'),
        L(B('تحليل الأخطاء', 'Error analysis'),
          B('**error analysis** = تبص على الحالات الغلط وتصنّفها في **failure mode** (عربي عامي، رسالة طويلة، فئتين مع بعض…). قسّم النتايج بـ **slice** (حسب tag) — الدقة 90% إجمالًا ممكن تكون 60% للعامية. وكل غلط جديد في الإنتاج يبقى حالة في الـ test set.', '**error analysis** = look at the wrong cases and sort them into a **failure mode** (colloquial Arabic, long messages, two topics at once…). Split results by **slice** (by tag) — 90% overall may be 60% for colloquial Arabic. And every new production mistake becomes a test-set case.'),
          'from collections import defaultdict\n\nresults = [  # (tags, correct)\n    ({"en"}, True), ({"en"}, True), ({"en", "long"}, True), ({"ar", "msa"}, True), ({"ar", "msa"}, True),\n    ({"ar", "colloquial"}, False), ({"ar", "colloquial"}, True), ({"ar", "colloquial"}, False),\n    ({"ar", "colloquial", "long"}, False), ({"en", "two-topics"}, False), ({"en"}, True), ({"ar", "msa"}, True),\n]\nby_tag = defaultdict(list)\nfor tags, ok in results:\n    for t in tags:\n        by_tag[t].append(ok)\nprint(f"overall {sum(ok for _, ok in results) / len(results):.0%}")\nfor tag, oks in sorted(by_tag.items(), key=lambda kv: sum(kv[1]) / len(kv[1])):\n    print(f"  {tag:<11} {sum(oks)}/{len(oks)} = {sum(oks) / len(oks):.0%}")', R),
        L(B('التقييم في الإنتاج', 'Evaluation in production'),
          B('**online evaluation** = قياس على الطلبات الحقيقية: **user feedback** (زرار 👍/👎 أو «حلّ مشكلتك؟»)، عيّنة يومية بالحَكَم، ومقاييس زي نسبة التحويل لإنسان. وقبل ترقية نموذج: **shadow mode** (النسخة الجديدة بتشتغل في الخلفية من غير ما ردها يوصل للعميل) ثم **canary** (5% من الطلبات) — وراقب **drift** في المقاييس مع الوقت.', '**online evaluation** = measuring real traffic: **user feedback** (a 👍/👎 button or «did this solve your problem?»), a daily judged sample, and metrics such as hand-off-to-human rate. Before a model upgrade: **shadow mode** (the new version runs in the background without its reply reaching the customer), then a **canary** (5% of requests) — and watch for **drift** in the metrics over time.'),
          'model upgrade plan\n1. offline: full eval suite on the new model → must beat the baseline (bootstrap CI)\n2. shadow mode, 3 days: new model answers in the background; judge compares with production\n3. canary 5% for 3 days: watch 👎 rate, hand-off rate, p95, cost per task\n4. 50% → 100%; keep the old model one switch away for a week\n5. add any new failure to the test set', T)
      ],
      practice: [
        B('حوّل الـ harness لاختبارات pytest بحدود.', 'Turn the harness into pytest tests with thresholds.'),
        B('اعمل error analysis على 20 غلط وصنّفهم.', 'Do error analysis on 20 mistakes and categorise them.'),
        B('احسب الدقة لكل slice.', 'Compute accuracy for each slice.'),
        B('اكتب خطة ترقية نموذج بـ shadow وcanary.', 'Write a model-upgrade plan with shadow and canary.')
      ],
      words: [
        W('regression test', 'اختبار بيمنع الرجوع للخلف', 'a test that catches things getting worse', 'The regression test failed the PR.'),
        W('prompt version', 'رقم نسخة البرومبت', 'a named version of a prompt', 'Log the prompt version with every reply.'),
        W('error analysis', 'تحليل الأخطاء', 'studying mistakes to find patterns', 'Error analysis found a colloquial-Arabic gap.'),
        W('failure mode', 'نمط فشل', 'a recurring kind of mistake', 'Two-topic messages are a failure mode.'),
        W('slice', 'شريحة من البيانات', 'a subset of cases sharing a tag', 'Accuracy on the Arabic slice is lower.'),
        W('online evaluation', 'تقييم على الطلبات الحقيقية', 'measuring quality in production', 'Online evaluation uses user feedback.'),
        W('user feedback', 'رأي المستخدم', 'signals from users about quality', 'User feedback flagged three bad replies.'),
        W('shadow mode', 'تشغيل في الخلفية من غير تأثير', 'running a new version without using its output', 'Run the new model in shadow mode first.'),
        W('canary', 'إطلاق على نسبة صغيرة', 'a release to a small share of traffic', 'The canary got 5% of requests.'),
        W('drift', 'تغيّر تدريجي في الأداء', 'gradual change in behaviour or data', 'Watch for drift after the holiday season.')
      ],
      read: [{ lib: 'pytest documentation', what: B('راجع parametrize والـ fixtures.', 'Review parametrize and fixtures.') }],
      challenge: B('حط التقييم في CI: pytest بحدود من معايير النجاح، cache للحالات، GitHub Actions بيشغّلها على أي تغيير في `prompts/`، تقرير slices كـ artifact — وخطة online evaluation بـ feedback وعيّنة يومية.', 'Put evaluation in CI: pytest with thresholds from the success criteria, a case cache, GitHub Actions running it on any change in `prompts/`, a slice report as an artifact — and an online-evaluation plan with feedback and a daily sample.'),
      quiz: [
        Q(B('PR غيّر البرومبت والدقة نزلت:', 'A PR changed the prompt and accuracy dropped:'), [['الـ regression test يفشّل الـ PR', 'the regression test fails the PR'], ['ندمج ونشوف', 'merge and see'], ['نحذف الاختبار', 'delete the test']], 0, B('حماية.', 'Protection.')),
        Q(B('90% إجمالًا:', '90% overall:'), [['بص على الـ slices', 'look at the slices'], ['كله تمام', 'all is fine'], ['انشر', 'ship it']], 0, B('شرائح.', 'Slices.')),
        Q(B('shadow mode:', 'Shadow mode:'), [['النسخة الجديدة بتشتغل من غير ما ردها يوصل', 'the new version runs without its reply being used'], ['وضع ليلي', 'night mode'], ['إيقاف النظام', 'switching off']], 0, B('أمان.', 'Safety.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('كل تغيير في تطبيق الـ AI بقى مقاس.', 'Every change to the AI app is now measured.'),
      review: [
        B('evals وtest set وharness وbaseline.', 'Evals, test sets, harnesses and baselines.'),
        B('precision وrecall وF1 وconfusion matrix وتقييم الاستخراج.', 'Precision, recall, F1, confusion matrices and extraction scoring.'),
        B('llm-as-judge وrubric والمقارنة الزوجية ومعايرة الحَكَم.', 'LLM-as-judge, rubrics, pairwise comparison and judge calibration.'),
        B('حجم العينة والـ bootstrap وp95 وcost per task.', 'Sample size, bootstrap, p95 and cost per task.'),
        B('regression tests وerror analysis والـ slices وshadow وcanary.', 'Regression tests, error analysis, slices, shadow mode and canaries.')
      ],
      project: B('مشروع الأسبوع «معمل تقييم» لتطبيق AI عندك (المصنّف أو مساعد الـ RAG أو الـ agent): test set من 100 حالة بـ tags، معايير نجاح مكتوبة، harness بمقاييس لكل فئة وslice، حَكَم بـ rubric متعاير بـ kappa، مقارنة نسختين بـ bootstrap وp95 وتكلفة، اختبارات pytest في GitHub Actions، وخطة ترقية نموذج.', 'Week project «evaluation lab» for one of your AI apps (the classifier, the RAG assistant or the agent): a 100-case test set with tags, written success criteria, a harness with per-class and per-slice metrics, a rubric judge calibrated with kappa, a two-version comparison with bootstrap, p95 and cost, pytest tests in GitHub Actions, and a model-upgrade plan.'),
      test: [
        Q(B('eval case:', 'An eval case:'), [['مدخل ونتيجة متوقعة', 'an input and an expected output'], ['باج', 'a bug'], ['نموذج', 'a model']], 0, B('حالة.', 'A case.')),
        Q(B('exact match يناسب:', 'Exact match suits:'), [['التصنيفات', 'labels'], ['الملخصات الطويلة', 'long summaries'], ['الصور', 'images']], 0, B('قيم محددة.', 'Fixed values.')),
        Q(B('precision عالية مهمة لـ:', 'High precision matters for:'), [['الرد التلقائي على العملاء', 'auto-replying to customers'], ['ولا حاجة', 'nothing'], ['الألوان', 'colours']], 0, B('متبعتش غلط.', 'Send nothing wrong.')),
        Q(B('f1:', 'F1:'), [['متوسط توافقي للـ precision والـ recall', 'the harmonic mean of precision and recall'], ['أول نتيجة', 'the first result'], ['مفتاح', 'a key']], 0, B('توازن.', 'Balance.')),
        Q(B('rubric كويس:', 'A good rubric:'), [['معايير منفصلة بوصف لكل درجة', 'separate criteria with a description per score'], ['«قيّم من 1 لـ 10»', '«rate from 1 to 10»'], ['من غير معايير', 'no criteria']], 0, B('وضوح.', 'Clarity.')),
        Q(B('position bias حلّه:', 'The fix for position bias:'), [['اعكس الترتيب وقيّم مرتين', 'swap the order and judge twice'], ['استخدم أول ترتيب بس', 'use only the first order'], ['مفيش حل', 'no fix']], 0, B('عدالة.', 'Fairness.')),
        Q(B('قبل ما تثق في الحَكَم:', 'Before trusting the judge:'), [['قارنه بتقييم بشري', 'compare it with human grades'], ['صدّقه', 'just believe it'], ['اسأله رأيه', 'ask its opinion']], 0, B('معايرة.', 'Calibration.')),
        Q(B('هامش الخطأ لـ 400 حالة تقريبًا:', 'The rough margin of error for 400 cases:'), [['±5%', '±5%'], ['±50%', '±50%'], ['صفر', 'zero']], 0, B('1/√n.', '1/√n.')),
        Q(B('bootstrap:', 'The bootstrap:'), [['سحب عينات بإرجاع لتقدير عدم اليقين', 'resampling with replacement to estimate uncertainty'], ['تشغيل الجهاز', 'booting the machine'], ['CSS framework', 'a CSS framework']], 0, B('إحصاء.', 'Statistics.')),
        Q(B('ليه cost per task؟', 'Why cost per task?'), [['الجودة الأعلى ممكن متستاهلش تكلفتها', 'higher quality may not be worth its cost'], ['عشان شكلها', 'for looks'], ['مش مهم', 'it doesn’t matter']], 0, B('موازنة.', 'Trade-off.')),
        Q(B('غلط جديد في الإنتاج:', 'A new production mistake:'), [['يبقى حالة في الـ test set', 'becomes a test-set case'], ['يتنسي', 'is forgotten'], ['يتحذف من اللوج', 'is deleted from logs']], 0, B('تعلّم.', 'Learning.')),
        Q(B('ترتيب ترقية النموذج:', 'The model-upgrade order:'), [['offline ← shadow ← canary ← الكل', 'offline → shadow → canary → everyone'], ['الكل فورًا', 'everyone at once'], ['canary من غير تقييم', 'a canary with no evaluation']], 0, B('تدرّج.', 'Gradual.'))
      ] }
  ]
};
