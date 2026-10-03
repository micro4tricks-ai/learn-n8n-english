// Python week 43 — Testing in depth.
// unittest, unittest.mock, a seeded property checker, a mini mutation run, golden files and a settrace coverage
// counter run with the standard library; pytest, Hypothesis, respx, VCR and Testcontainers are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الاختبارات بعمق', 'Testing in depth'),
  goal: B('تبني اختبارات بتديك ثقة حقيقية مش رقم coverage: استراتيجية هرم الاختبارات وTDD، بدائل الاختبار الصح لكل موقف، اختبارات الخصائص والطفرات اللي بتلاقي أخطاء مكنتش تتخيلها، اختبار الأنظمة الخارجية من غير ما تكلمها، وصحة حزمة الاختبارات نفسها.',
          'Build tests that give real confidence, not a coverage number: a test-pyramid strategy and TDD, the right test double for each situation, property and mutation tests that find bugs you never imagined, testing external systems without calling them, and the health of the test suite itself.'),
  days: [
    { title: B('استراتيجية الاختبار', 'Testing strategy'),
      goal: B('اختبارات كتير سريعة وقليل بطيء.', 'Many fast tests, a few slow ones.'),
      learn: [
        L(B('هرم الاختبارات', 'The test pyramid'),
          B('**test pyramid**: في القاعدة اختبارات وحدة كتير (ملي ثواني، من غير شبكة)، في النص اختبارات تكامل أقل (قاعدة بيانات حقيقية، API وهمي)، وفوق **end-to-end test** قليلة (النظام كله، webhook ← n8n ← DB ← رسالة). كل طبقة بتمسك نوع أخطاء؛ الهرم المقلوب (كله e2e) = بطيء وهش.', 'The **test pyramid**: at the base many unit tests (milliseconds, no network), in the middle fewer integration tests (a real database, a fake API), and at the top a few **end-to-end test** cases (the whole system, webhook → n8n → DB → message). Each layer catches a kind of bug; an inverted pyramid (all e2e) = slow and brittle.'),
          '          ▲  e2e (5)          whole flow, staging, minutes\n         ▲▲▲  integration (40) real Postgres in a container, fake HTTP, seconds\n      ▲▲▲▲▲▲▲  unit (400)       pure functions and use cases with fakes, milliseconds\n\nCI: unit + integration on every push; e2e nightly and before releases', T),
        L(B('TDD', 'TDD'),
          B('**tdd** = اكتب الاختبار الأول، شوفه يفشل، اكتب أقل كود ينجّحه، وبعدين حسّن: **red green refactor**. بيجبرك تفكر في السلوك قبل التنفيذ، وبيدّيك اختبارات لكل حاجة. وكل اختبار بشكل **arrange act assert**: جهّز ← نفّذ ← تحقق. والمثال بيشغّل unittest جوه الصفحة.', '**tdd** = write the test first, watch it fail, write the least code to pass, then improve: **red green refactor**. It forces you to think about behaviour before implementation and gives you tests for everything. And each test follows **arrange act assert**: set up → act → check. The example runs unittest inside the page.'),
          'import unittest\n\ndef normalise_phone(raw: str) -> str:\n    """Egyptian mobile → +20XXXXXXXXXX (written to make the tests below pass)."""\n    digits = "".join(c for c in raw if c.isdigit())\n    if digits.startswith("20") and len(digits) == 12:\n        digits = "0" + digits[2:]\n    if len(digits) == 11 and digits.startswith("01"):\n        return "+20" + digits[1:]\n    raise ValueError(f"not an Egyptian mobile: {raw!r}")\n\nclass TestNormalisePhone(unittest.TestCase):\n    def test_local_format(self):\n        # arrange\n        raw = "010 1234 5678"\n        # act\n        result = normalise_phone(raw)\n        # assert\n        self.assertEqual(result, "+201012345678")\n\n    def test_international_format(self):\n        self.assertEqual(normalise_phone("+20 101 234 5678"), "+201012345678")\n\n    def test_rejects_landline(self):\n        with self.assertRaises(ValueError):\n            normalise_phone("02 2345 6789")\n\nunittest.main(argv=["tdd"], exit=False, verbosity=2)', R),
        L(B('عزل الاختبارات', 'Test isolation'),
          B('**test isolation** = كل اختبار مستقل: ملوش علاقة بترتيب التشغيل، ومبيسيبش أثر (ملفات، صفوف، متغيرات global). اختبار بينجح لوحده ويفشل مع الباقي = تسرّب حالة. pytest بيساعد: `tmp_path` و**fixture** بتنضّف بعد نفسها، و`pytest -p randomly` بيغيّر الترتيب عشان يكشف الاعتماد.', '**test isolation** = each test stands alone: it does not depend on run order and leaves no traces (files, rows, global variables). A test passing alone but failing with others = leaked state. pytest helps: `tmp_path` and a **fixture** that cleans up after itself, and `pytest -p randomly` shuffles order to expose dependencies.'),
          'import unittest\n\nCACHE = {}                                   # module-level state: a classic leak\n\ndef price_with_cache(sku):\n    return CACHE.setdefault(sku, 100)\n\nclass Leaky(unittest.TestCase):\n    def test_a_sets_price(self):\n        CACHE["MUG"] = 999\n        self.assertEqual(price_with_cache("MUG"), 999)\n    def test_b_default_price(self):\n        self.assertEqual(price_with_cache("MUG"), 100)       # fails only when test_a ran first\n\nclass Isolated(Leaky):\n    def setUp(self):\n        CACHE.clear()                         # fresh state for every test\n\nfor case in (Leaky, Isolated):\n    r = unittest.TextTestRunner(verbosity=0).run(unittest.defaultTestLoader.loadTestsFromTestCase(case))\n    print(case.__name__, "failures:", len(r.failures))', R)
      ],
      practice: [
        B('عدّ اختباراتك في كل طبقة من الهرم.', 'Count your tests in each layer of the pyramid.'),
        B('اكتب ميزة صغيرة بـ TDD (3 اختبارات الأول).', 'Write a small feature with TDD (3 tests first).'),
        B('رتّب اختباراتك بـ arrange act assert.', 'Arrange your tests as arrange act assert.'),
        B('شغّل اختباراتك بترتيب عشوائي ودوّر على تسرّب.', 'Run your tests in random order and look for leaks.')
      ],
      words: [
        W('test pyramid', 'هرم الاختبارات', 'many unit, fewer integration, few end-to-end tests', 'Our test pyramid was upside down.'),
        W('end-to-end test', 'اختبار النظام كله من أوله لآخره', 'a test of the whole system', 'The end-to-end test runs nightly.'),
        W('tdd', 'التطوير بالاختبار أولًا', 'test-driven development', 'TDD made the phone parser solid.'),
        W('red green refactor', 'فشل ← نجاح ← تحسين', 'the TDD cycle', 'Follow red green refactor in small steps.'),
        W('arrange act assert', 'جهّز ← نفّذ ← تحقق', 'the three parts of a test', 'Each test reads as arrange act assert.'),
        W('test isolation', 'استقلال كل اختبار', 'tests not affecting each other', 'Shared caches break test isolation.'),
        W('fixture', 'تجهيز مشترك للاختبارات', 'reusable setup for tests', 'A fixture creates a fresh database.')
      ],
      read: [{ t: 'unittest', url: 'https://docs.python.org/3/library/unittest.html', what: B('اقرا Basic example وsetUp.', 'Read Basic example and setUp.') }],
      challenge: B('اكتب «مكتبة تنظيف بيانات العملاء» بـ TDD: أرقام موبايل، إيميلات، أسماء عربي (تطبيع)، مدن — 25 اختبار مكتوبين قبل الكود، كلهم arrange act assert ومعزولين، وشغّلهم بترتيب عشوائي.', 'Write a «customer data cleaning library» with TDD: mobile numbers, emails, Arabic names (normalisation) and cities — 25 tests written before the code, all arrange act assert and isolated, and run them in random order.'),
      quiz: [
        Q(B('أغلب الاختبارات لازم تبقى:', 'Most tests should be:'), [['اختبارات وحدة سريعة', 'fast unit tests'], ['e2e بطيئة', 'slow e2e tests'], ['يدوية', 'manual']], 0, B('الهرم.', 'The pyramid.')),
        Q(B('ترتيب TDD:', 'The TDD order:'), [['اختبار فاشل ← كود ← تحسين', 'failing test → code → improve'], ['كود ← نشر ← اختبار', 'code → deploy → test'], ['تحسين ← كود', 'improve → code']], 0, B('red green refactor.', 'Red green refactor.')),
        Q(B('اختبار بينجح لوحده ويفشل مع الباقي:', 'A test passing alone but failing with others:'), [['تسرّب حالة', 'leaked state'], ['حظ', 'luck'], ['Python بايظ', 'Python is broken']], 0, B('عزل.', 'Isolation.'))
      ] },

    { title: B('بدائل الاختبار', 'Test doubles'),
      goal: B('البديل الصح لكل اعتماد.', 'The right stand-in for each dependency.'),
      learn: [
        L(B('أنواع البدائل', 'Kinds of doubles'),
          B('**test double** = أي بديل لاعتماد حقيقي: **stub** (بيرجّع رد ثابت)، **fake** (تنفيذ حقيقي مبسّط — repository في الذاكرة)، **spy** (بيسجّل النداءات عشان تتحقق منها)، و**mock** (بيتحقق من التوقعات). القاعدة: fakes للحالة، وmocks قليل وللحدود بس (الشبكة، الوقت، الإيميل).', 'A **test double** = any stand-in for a real dependency: a **stub** (returns a fixed answer), a **fake** (a simplified working implementation — an in-memory repository), a **spy** (records calls so you can check them), and a **mock** (verifies expectations). The rule: fakes for state, and mocks sparingly and only at boundaries (network, time, email).'),
          'class StubRates:                       # stub: fixed answer\n    def usd_to_egp(self): return 48.5\n\nclass FakeInbox:                       # fake: works, in memory\n    def __init__(self): self.messages = []\n    def send(self, to, body): self.messages.append((to, body))\n    def sent_to(self, to): return [b for t, b in self.messages if t == to]\n\ndef quote_in_egp(usd, rates, inbox, customer):\n    egp = round(usd * rates.usd_to_egp(), 2)\n    inbox.send(customer, f"Your quote: {egp} EGP")\n    return egp\n\ninbox = FakeInbox()\nassert quote_in_egp(100, StubRates(), inbox, "mona@example.com") == 4850.0\nassert inbox.sent_to("mona@example.com") == ["Your quote: 4850.0 EGP"]\nprint("stub + fake: ok", inbox.messages)', R),
        L(B('unittest.mock وpatch', 'unittest.mock and patch'),
          B('`unittest.mock.Mock` بيعمل كائن بيقبل أي نداء ويسجّله (spy + mock)، و**patch** بيبدّل اسم في موديول وقت الاختبار بس. اعمل patch في المكان اللي الاسم *بيتستخدم* فيه مش اللي اتعرّف فيه. وخلي بالك: mocks كتير = اختبارات بتختبر التنفيذ مش السلوك، وبتتكسر مع أي refactoring.', '`unittest.mock.Mock` makes an object that accepts any call and records it (spy + mock), and **patch** swaps a name in a module only during the test. Patch where the name is *used*, not where it is defined. And beware: many mocks = tests that check implementation, not behaviour, and break with every refactoring.'),
          'from unittest import mock\nimport json\n\ndef fetch_order(client, order_id):\n    r = client.get(f"/orders/{order_id}", timeout=10)\n    if r.status_code == 404:\n        return None\n    r.raise_for_status()\n    return json.loads(r.text)["order"]\n\nclient = mock.Mock()\nclient.get.return_value = mock.Mock(status_code=200, text=\'{"order": {"id": 7, "total": 90}}\')\nprint(fetch_order(client, 7))\nclient.get.assert_called_once_with("/orders/7", timeout=10)\n\nclient.get.return_value = mock.Mock(status_code=404)\nprint(fetch_order(client, 8))\nprint("calls recorded:", client.get.call_args_list)', R),
        L(B('الوقت والعشوائية', 'Time and randomness'),
          B('اختبار فيه `datetime.now()` أو `random` = نتايج مختلفة كل مرة. الحل الأنضف: حقن ساعة (`clock` كمعامل) — أو **time freezing** بمكتبة زي freezegun/time-machine. والعشوائية: `random.Random(seed)` ثابت. كده الاختبار نفسه يدّي نفس النتيجة دايمًا.', 'A test using `datetime.now()` or `random` = different results each run. The cleanest fix: inject a clock (a `clock` parameter) — or **time freezing** with a library like freezegun/time-machine. For randomness: a fixed `random.Random(seed)`. Then the same test always gives the same result.'),
          'from datetime import datetime, timedelta\nimport random\n\ndef is_overdue(due: datetime, clock=datetime.now) -> bool:\n    return clock() > due + timedelta(days=3)\n\nfixed = lambda: datetime(2026, 10, 4, 12, 0)\nprint(is_overdue(datetime(2026, 9, 30), clock=fixed), is_overdue(datetime(2026, 10, 2), clock=fixed))\n\ndef pick_reviewer(names, rng=random):\n    return rng.choice(names)\n\nrng1, rng2 = random.Random(42), random.Random(42)\nprint(pick_reviewer(["Omar", "Sara", "Laila"], rng1) == pick_reviewer(["Omar", "Sara", "Laila"], rng2))', R)
      ],
      practice: [
        B('صنّف البدائل في اختباراتك: stub/fake/spy/mock.', 'Classify the doubles in your tests: stub/fake/spy/mock.'),
        B('بدّل 3 mocks بـ fake واحد.', 'Replace 3 mocks with one fake.'),
        B('اعمل patch لنداء HTTP في المكان الصح.', 'Patch an HTTP call in the right place.'),
        B('احقن ساعة في دالة فيها datetime.now.', 'Inject a clock into a function using datetime.now.')
      ],
      words: [
        W('test double', 'بديل لاعتماد حقيقي في الاختبار', 'a stand-in for a real dependency in tests', 'Pick the simplest test double that works.'),
        W('stub', 'بديل بيرجّع رد ثابت', 'a double returning fixed answers', 'A stub returns the exchange rate.'),
        W('fake', 'تنفيذ مبسّط شغال', 'a simplified working implementation', 'The fake inbox stores messages in a list.'),
        W('spy', 'بديل بيسجّل النداءات', 'a double recording calls', 'The spy shows send was called twice.'),
        W('patch', 'تبديل اسم مؤقتًا وقت الاختبار', 'to replace a name temporarily in a test', 'Patch httpx where the module uses it.'),
        W('time freezing', 'تثبيت الوقت في الاختبار', 'fixing the current time during a test', 'Time freezing made the overdue test stable.')
      ],
      read: [{ t: 'unittest.mock', url: 'https://docs.python.org/3/library/unittest.mock.html', what: B('اقرا Quick Guide وWhere to patch.', 'Read the Quick Guide and Where to patch.') }],
      challenge: B('راجع اختبارات مشروع عندك: صنّف كل بديل، بدّل الـ mocks الزايدة بـ fakes، احقن ساعة وrandom بـ seed في كل مكان بيستخدمهم، وتأكد إن الحزمة بتنجح 20 مرة ورا بعض.', 'Review the tests of one of your projects: classify each double, replace excess mocks with fakes, inject a clock and a seeded random wherever they are used, and make sure the suite passes 20 times in a row.'),
      quiz: [
        Q(B('repository في الذاكرة:', 'An in-memory repository:'), [['fake', 'a fake'], ['stub', 'a stub'], ['mock', 'a mock']], 0, B('شغال.', 'Working.')),
        Q(B('patch يتعمل في:', 'Patch is applied:'), [['المكان اللي الاسم بيتستخدم فيه', 'where the name is used'], ['المكان اللي اتعرّف فيه دايمًا', 'always where it is defined'], ['مش مهم', 'anywhere']], 0, B('lookup.', 'Lookup.')),
        Q(B('اختبار فيه datetime.now:', 'A test with datetime.now:'), [['احقن ساعة أو ثبّت الوقت', 'inject a clock or freeze time'], ['استنى اليوم المناسب', 'wait for the right day'], ['احذفه', 'delete it']], 0, B('ثبات.', 'Stability.'))
      ] },

    { title: B('الخصائص والطفرات', 'Properties and mutations'),
      goal: B('اختبارات بتلاقي اللي مكنتش تتخيله.', 'Tests that find what you never imagined.'),
      learn: [
        L(B('اختبار الخصائص', 'Property-based testing'),
          B('بدل أمثلة بتختارها انت: **property-based testing** = تكتب خاصية لازم تبقى صح لأي مدخل («تقسيم الفاتورة على أقساط مجموعه = الإجمالي»)، والأداة بتولّد مئات المدخلات وبتصغّر أي مثال فاشل لأبسط شكل. المكتبة الأشهر **hypothesis**. المثال بيعمل نسخة مبسطة بـ random وseed.', 'Instead of examples you pick: **property-based testing** = write a property that must hold for any input («splitting an invoice into instalments sums to the total»), and the tool generates hundreds of inputs and shrinks any failing example to its simplest form. The best-known library is **hypothesis**. The example builds a simplified version with a seeded random.'),
          'import random\n\ndef split_naive(total_cents, n):\n    return [round(total_cents / n)] * n\n\ndef split_fair(total_cents, n):\n    base, extra = divmod(total_cents, n)\n    return [base + (1 if i < extra else 0) for i in range(n)]\n\ndef check(prop, gen, runs=500, seed=1):\n    rng = random.Random(seed)\n    for _ in range(runs):\n        args = gen(rng)\n        if not prop(*args):\n            return f"FAILED for {args}"\n    return f"ok ({runs} random cases)"\n\ngen = lambda rng: (rng.randint(1, 1_000_000), rng.randint(1, 12))\nfor split in (split_naive, split_fair):\n    prop = lambda total, n, s=split: sum(s(total, n)) == total and len(s(total, n)) == n\n    print(f"{split.__name__:<11}", check(prop, gen))', R),
        L(B('Hypothesis', 'Hypothesis'),
          B('مع Hypothesis الخاصية بتبقى اختبار pytest عادي فوقه `@given` و«strategies» للمدخلات. لما يلاقي فشل، بيصغّره (`total=1, n=3` بدل أرقام كبيرة) ويفتكره في الجاي. خصائص مفيدة في الأتمتة: round-trip (encode ثم decode = الأصل)، ثوابت (المجموع، الترتيب)، ومقارنة بتنفيذ بسيط مضمون.', 'With Hypothesis a property becomes a normal pytest test with `@given` and «strategies» for inputs. When it finds a failure it shrinks it (`total=1, n=3` instead of big numbers) and remembers it next time. Useful properties in automation: round-trips (encode then decode = the original), invariants (sums, ordering), and comparison with a simple, trusted implementation.'),
          '# pip install hypothesis\nimport json\nfrom hypothesis import given, strategies as st\nfrom billing import split_fair, to_csv_row, from_csv_row\n\n@given(st.integers(min_value=1, max_value=10**9), st.integers(min_value=1, max_value=36))\ndef test_instalments_sum_to_total(total_cents, n):\n    parts = split_fair(total_cents, n)\n    assert sum(parts) == total_cents and len(parts) == n\n    assert max(parts) - min(parts) <= 1            # fair: differ by at most one piaster\n\n@given(st.text(), st.decimals(allow_nan=False, allow_infinity=False, places=2))\ndef test_csv_round_trip(name, amount):\n    assert from_csv_row(to_csv_row(name, amount)) == (name, amount)'),
        L(B('اختبار الطفرات', 'Mutation testing'),
          B('**coverage** 100% مش معناها الاختبارات قوية — ممكن السطر يتنفذ من غير ما حد يتحقق من نتيجته. **mutation testing** (أداة زي mutmut) بتغيّر الكود عمدًا (`>` تبقى `>=`، `+` تبقى `-`) وتشوف الاختبارات هتمسك التغيير ولا لأ. طفرة «عايشة» = اختبار ناقص.', '100% **coverage** does not mean strong tests — a line can run without anyone checking its result. **mutation testing** (a tool like mutmut) deliberately changes the code (`>` becomes `>=`, `+` becomes `-`) and checks whether the tests catch it. A «surviving» mutant = a missing test.'),
          'SOURCE = """\ndef free_shipping(subtotal):\n    return subtotal > 1500\n"""\nMUTANTS = {"> → >=": SOURCE.replace(">", ">="), "> → <": SOURCE.replace(">", "<"), "1500 → 1501": SOURCE.replace("1500", "1501")}\n\ndef weak_tests(f):\n    return f(2000) is True and f(100) is False\n\ndef strong_tests(f):\n    return weak_tests(f) and f(1500) is False and f(1501) is True     # the boundary!\n\ndef load(src):\n    ns = {}\n    exec(src, ns)\n    return ns["free_shipping"]\n\nfor suite in (weak_tests, strong_tests):\n    assert suite(load(SOURCE))\n    survived = [name for name, src in MUTANTS.items() if suite(load(src))]\n    print(f"{suite.__name__:<12} survivors: {survived or \'none\'}")', R)
      ],
      practice: [
        B('اكتب 3 خصائص لدوال فلوس أو تواريخ عندك.', 'Write 3 properties for your money or date functions.'),
        B('جرّب Hypothesis على دالة واحدة.', 'Try Hypothesis on one function.'),
        B('شغّل mutmut على موديول صغير (أو الطفرات اليدوية).', 'Run mutmut on a small module (or the manual mutants).'),
        B('اكتب اختبار حدود لكل طفرة عاشت.', 'Write a boundary test for each surviving mutant.')
      ],
      words: [
        W('property-based testing', 'اختبار خصائص بمدخلات مولّدة', 'testing properties with generated inputs', 'Property-based testing found the rounding bug.'),
        W('hypothesis', 'مكتبة اختبار الخصائص في Python', 'Python’s property-based testing library', 'Hypothesis shrank the failure to n=3.'),
        W('shrinking', 'تصغير المثال الفاشل لأبسط شكل', 'reducing a failing input to its simplest form', 'Shrinking turned a huge input into 1 and 3.'),
        W('round-trip', 'تحويل ورجوع لنفس الأصل', 'converting and back to the original', 'Test the CSV round-trip.'),
        W('mutation testing', 'اختبار الاختبارات بتغيير الكود', 'checking tests by mutating the code', 'Mutation testing exposed a missing boundary test.'),
        W('coverage', 'نسبة الكود اللي الاختبارات شغّلته', 'the share of code run by tests', 'Coverage is a floor, not a goal.')
      ],
      read: [{ t: 'Hypothesis documentation', url: 'https://hypothesis.readthedocs.io/en/latest/', what: B('اقرا Quick start guide.', 'Read the Quick start guide.') }],
      challenge: B('لموديول الفلوس في مشروعك: 5 خصائص (مجموع، round-trip، تقريب، ترتيب، مقارنة بتنفيذ بسيط) بـ Hypothesis، ومرة mutation testing — واقفل كل الطفرات العايشة باختبارات حدود.', 'For the money module in your project: 5 properties (sums, round-trip, rounding, ordering, comparison with a simple implementation) with Hypothesis, plus one mutation-testing run — and kill every surviving mutant with boundary tests.'),
      quiz: [
        Q(B('اختبار خاصية:', 'A property test:'), [['قاعدة لازم تبقى صح لأي مدخل', 'a rule that must hold for any input'], ['مثال واحد', 'one example'], ['اختبار يدوي', 'a manual test']], 0, B('عموم.', 'Generality.')),
        Q(B('coverage 100%:', '100% coverage:'), [['مش معناها الاختبارات قوية', 'doesn’t mean the tests are strong'], ['مفيش أخطاء', 'no bugs'], ['الكود سريع', 'the code is fast']], 0, B('تنفيذ مش تحقق.', 'Run, not checked.')),
        Q(B('طفرة عاشت:', 'A surviving mutant:'), [['اختبار ناقص', 'a missing test'], ['كود ممتاز', 'excellent code'], ['خطأ في الأداة', 'a tool bug']], 0, B('ثغرة.', 'A gap.'))
      ] },

    { title: B('اختبار الأنظمة الخارجية', 'Testing external systems'),
      goal: B('تختبر التكاملات من غير ما تكلّمها.', 'Test integrations without calling them.'),
      learn: [
        L(B('HTTP وهمي', 'Fake HTTP'),
          B('متخليش الاختبارات تكلّم Shopify أو Paymob: بطيئة، بتفشل لأسباب برّه، وممكن تعمل حاجات حقيقية. لـ httpx: **respx**، ولـ requests: **responses** — بيعترضوا الطلبات ويرجّعوا ردود جاهزة، وتقدر تختبر الأخطاء (500، timeout) بسهولة.', 'Do not let tests call Shopify or Paymob: slow, failing for outside reasons, and possibly doing real things. For httpx: **respx**; for requests: **responses** — they intercept requests and return prepared replies, and you can test errors (500, timeouts) easily.'),
          '# pip install respx pytest\nimport httpx, respx, pytest\nfrom shop.shopify import get_order, ShopifyDown\n\n@respx.mock\ndef test_get_order_ok():\n    respx.get("https://shop.example.com/admin/api/2026-07/orders/5501.json").respond(\n        200, json={"order": {"id": 5501, "total_price": "650.00", "currency": "EGP", "financial_status": "paid"}})\n    assert get_order(5501).paid is True\n\n@respx.mock\ndef test_get_order_retries_then_fails():\n    route = respx.get(url__regex=r".*/orders/5501\\.json").mock(side_effect=httpx.ConnectTimeout("slow"))\n    with pytest.raises(ShopifyDown):\n        get_order(5501)\n    assert route.call_count == 3                    # our retry policy'),
        L(B('تسجيل الردود الحقيقية', 'Recording real replies'),
          B('**vcr** (vcrpy أو pytest-recording): أول مرة الاختبار بيكلّم الـ API الحقيقي ويسجّل الرد في **cassette** (ملف YAML)، وبعد كده بيعيده من الملف. ممتاز لـ APIs معقدة — بس امسح التوكنات والبيانات الشخصية من الـ cassette قبل الـ commit، وجدّدها كل فترة. و**golden file** = ملف مخرجات متوقعة (تقرير، PDF نصي) بتقارن بيه.', '**vcr** (vcrpy or pytest-recording): the first time a test calls the real API and records the reply in a **cassette** (a YAML file); afterwards it replays from the file. Great for complex APIs — but scrub tokens and personal data from the cassette before committing, and refresh it periodically. And a **golden file** = a file of expected output (a report, a text PDF) you compare against.'),
          'import difflib\n\nGOLDEN = """Daily report 2026-10-04\norders: 3\nrevenue: 1,150.00 EGP\ntop city: Cairo\n"""\n\ndef build_report(orders, day):\n    revenue = sum(o["total"] for o in orders)\n    cities = {}\n    for o in orders:\n        cities[o["city"]] = cities.get(o["city"], 0) + 1\n    return f"Daily report {day}\\norders: {len(orders)}\\nrevenue: {revenue:,.2f} EGP\\ntop city: {max(cities, key=cities.get)}\\n"\n\norders = [{"total": 650, "city": "Cairo"}, {"total": 400, "city": "Giza"}, {"total": 100, "city": "Cairo"}]\nout = build_report(orders, "2026-10-04")\nif out == GOLDEN:\n    print("matches the golden file")\nelse:\n    print("".join(difflib.unified_diff(GOLDEN.splitlines(True), out.splitlines(True), "golden", "current")))', R),
        L(B('قواعد بيانات حقيقية وعقود', 'Real databases and contracts'),
          B('SQLite مش Postgres: أنواع وJSON وlocking مختلفين. لاختبارات التكامل: **testcontainers** بيشغّل Postgres حقيقي في Docker لكل جلسة اختبار ويقفله. و**contract testing**: لما خدمتين بيكلّموا بعض (API بتاعك ← n8n)، اختبار بيتأكد إن شكل الطلب والرد متفق عليه عند الطرفين.', 'SQLite is not Postgres: types, JSON and locking differ. For integration tests: **testcontainers** starts a real Postgres in Docker for each test session and stops it. And **contract testing**: when two services talk (your API → n8n), a test makes sure the request and reply shapes agreed on hold on both sides.'),
          '# pip install "testcontainers[postgres]" sqlalchemy psycopg\nimport pytest\nfrom sqlalchemy import create_engine, text\nfrom testcontainers.postgres import PostgresContainer\n\n@pytest.fixture(scope="session")\ndef engine():\n    with PostgresContainer("postgres:17") as pg:           # real Postgres, thrown away afterwards\n        eng = create_engine(pg.get_connection_url())\n        run_migrations(eng)                                 # same migrations as production (week 30)\n        yield eng\n\ndef test_jsonb_filter(engine):\n    with engine.begin() as c:\n        c.execute(text("INSERT INTO orders(id, meta) VALUES (1, \'{\\"channel\\": \\"whatsapp\\"}\')"))\n        n = c.execute(text("SELECT count(*) FROM orders WHERE meta->>\'channel\' = \'whatsapp\'")).scalar()\n    assert n == 1')
      ],
      practice: [
        B('اختبر دالة httpx بـ respx (نجاح و500 وtimeout).', 'Test an httpx function with respx (success, 500 and timeout).'),
        B('اعمل golden file لتقرير عندك.', 'Make a golden file for one of your reports.'),
        B('سجّل cassette لـ API عام وامسح منه البيانات الحساسة.', 'Record a cassette for a public API and scrub sensitive data.'),
        B('شغّل Postgres بـ testcontainers في اختبار واحد.', 'Start Postgres with testcontainers in one test.')
      ],
      words: [
        W('respx', 'مكتبة لاعتراض طلبات httpx في الاختبار', 'a library mocking httpx requests', 'respx returns a fake Shopify reply.'),
        W('vcr', 'تسجيل ردود HTTP وإعادتها', 'recording and replaying HTTP interactions', 'VCR made the Odoo tests offline.'),
        W('cassette', 'ملف الردود المسجّلة', 'a file of recorded HTTP replies', 'Scrub tokens from the cassette.'),
        W('golden file', 'ملف المخرجات المتوقعة', 'a file of expected output', 'Update the golden file only on purpose.'),
        W('testcontainers', 'تشغيل خدمات حقيقية في Docker للاختبار', 'running real services in Docker for tests', 'testcontainers starts Postgres 17.'),
        W('contract testing', 'اختبار الاتفاق بين خدمتين', 'testing the agreed interface between services', 'Contract testing caught a renamed field.')
      ],
      read: [{ t: 'RESPX', url: 'https://lundberg.github.io/respx/', what: B('اقرا Guide.', 'Read the Guide.') }],
      challenge: B('اختبر تكامل المتجر من غير إنترنت: respx لـ Shopify وPaymob (نجاح، 429، 500، timeout)، cassette ممسوحة لـ API معقد، golden files للتقارير، وPostgres حقيقي بـ testcontainers لاستعلامات JSONB — وشغّلهم في CI.', 'Test the shop integrations offline: respx for Shopify and Paymob (success, 429, 500, timeout), a scrubbed cassette for a complex API, golden files for reports, and a real Postgres via testcontainers for JSONB queries — and run them in CI.'),
      quiz: [
        Q(B('اختبارات بتكلّم Paymob الحقيقي:', 'Tests calling the real Paymob:'), [['فكرة وحشة: بطيئة وخطرة', 'a bad idea: slow and risky'], ['أحسن طريقة', 'the best way'], ['إجبارية', 'required']], 0, B('اعتراض.', 'Intercept.')),
        Q(B('cassette قبل الـ commit:', 'A cassette before committing:'), [['امسح التوكنات والبيانات الشخصية', 'scrub tokens and personal data'], ['ارفعها زي ما هي', 'commit it as is'], ['شفّرها بس', 'just encrypt it']], 0, B('أسرار.', 'Secrets.')),
        Q(B('اختبار JSONB:', 'Testing JSONB:'), [['Postgres حقيقي (testcontainers)', 'a real Postgres (testcontainers)'], ['SQLite', 'SQLite'], ['ملف CSV', 'a CSV file']], 0, B('نفس القاعدة.', 'The same database.'))
      ] },

    { title: B('صحة حزمة الاختبارات', 'Test suite health'),
      goal: B('اختبارات سريعة ومنظمة وموثوقة.', 'Fast, organised and trustworthy tests.'),
      learn: [
        L(B('الـ coverage صح', 'Coverage, properly'),
          B('**coverage** (coverage.py: `pytest --cov --cov-branch`) بيوريك الكود اللي محدش اختبره. **branch coverage** أدق: كل فرع if اتجرّب في الاتجاهين؟ استخدمه عشان تلاقي فجوات مش كهدف — 85% بفروع مهمة متغطية أحسن من 100% بـ asserts ضعيفة. المثال بيحسب تغطية سطور بـ `sys.settrace`.', '**coverage** (coverage.py: `pytest --cov --cov-branch`) shows code nobody tested. **branch coverage** is stricter: was each if taken both ways? Use it to find gaps, not as a target — 85% with the important branches covered beats 100% with weak asserts. The example measures line coverage with `sys.settrace`.'),
          'import sys\n\ndef shipping_fee(city, subtotal):\n    if subtotal >= 1500:\n        return 0\n    if city in ("Cairo", "Giza"):\n        return 50\n    return 75\n\ndef run_with_coverage(fn, calls):\n    hit = set()\n    code = fn.__code__\n    def tracer(frame, event, arg):\n        if frame.f_code is code and event == "line":\n            hit.add(frame.f_lineno)\n        return tracer\n    sys.settrace(tracer)\n    try:\n        for args in calls:\n            fn(*args)\n    finally:\n        sys.settrace(None)\n    body = {line for _, _, line in code.co_lines() if line and line != code.co_firstlineno}\n    return hit, body\n\nfor calls in ([("Cairo", 2000)], [("Cairo", 2000), ("Giza", 100)], [("Cairo", 2000), ("Giza", 100), ("Aswan", 100)]):\n    hit, body = run_with_coverage(shipping_fee, calls)\n    print(f"{len(calls)} call(s): {len(hit & body)}/{len(body)} lines covered")', R),
        L(B('تنظيم pytest', 'Organising pytest'),
          B('**conftest** (`conftest.py`) = fixtures مشتركة لكل ملفات المجلد. **marker** = تصنيف اختبارات (`@pytest.mark.slow`، `integration`) عشان تشغّل جزء (`-m "not slow"`). **xfail** = اختبار متوقع يفشل (باج معروف) — بيوثّقه من غير ما يكسر CI. و**caplog** بيمسك اللوج عشان تتحقق منه.', '**conftest** (`conftest.py`) = fixtures shared by every file in the folder. A **marker** = a test category (`@pytest.mark.slow`, `integration`) so you can run a subset (`-m "not slow"`). **xfail** = a test expected to fail (a known bug) — it documents it without breaking CI. And **caplog** captures logs so you can assert on them.'),
          '# tests/conftest.py\nimport pytest\nfrom shop.adapters.fakes import InMemoryRepo, FakeInbox\n\n@pytest.fixture\ndef repo():\n    return InMemoryRepo()\n\n@pytest.fixture\ndef inbox():\n    return FakeInbox()\n\n# tests/test_refunds.py\nimport logging, pytest\n\ndef test_refund_logs_decision(repo, inbox, caplog):\n    caplog.set_level(logging.INFO)\n    request_refund(order_id=1, damaged=True, repo=repo, inbox=inbox)\n    assert "refund decision" in caplog.text\n\n@pytest.mark.integration\ndef test_refund_against_postgres(engine): ...\n\n@pytest.mark.xfail(reason="#212: partial refunds round half-up", strict=True)\ndef test_partial_refund_rounding(repo, inbox): ...\n\n# pytest -m "not integration"      fast loop while coding'),
        L(B('بيانات الاختبار', 'Test data'),
          B('fixtures فيها 40 حقل في كل اختبار = ضوضاء. **test data builder**: دالة بقيم افتراضية معقولة وتغيّر بس اللي يهمّ الاختبار — `make_order(total=0)`. والبيانات العشوائية بـ **seeding** ثابت عشان الفشل يتكرر. والاختبار يقرا زي جملة.', 'Fixtures with 40 fields in every test = noise. A **test data builder**: a function with sensible defaults where you change only what matters to the test — `make_order(total=0)`. Random data uses fixed **seeding** so a failure repeats. And the test reads like a sentence.'),
          'from dataclasses import dataclass, field, replace\nimport itertools, random\n\n_ids = itertools.count(1000)\n\n@dataclass\nclass Order:\n    id: int\n    total: float = 250.0\n    city: str = "Cairo"\n    paid: bool = True\n    items: list = field(default_factory=lambda: [("MUG", 1)])\n\ndef make_order(**overrides) -> Order:\n    return replace(Order(id=next(_ids)), **overrides)\n\ndef needs_review(o: Order) -> bool:\n    return o.paid and (o.total > 5000 or o.city not in {"Cairo", "Giza", "Alex"})\n\nassert not needs_review(make_order())\nassert needs_review(make_order(total=9000))\nassert needs_review(make_order(city="Aswan"))\nassert not needs_review(make_order(city="Aswan", paid=False))\n\nrng = random.Random(2026)                      # seeded: the same "random" orders every run\nbatch = [make_order(total=rng.randint(10, 9000), city=rng.choice(["Cairo", "Aswan"])) for _ in range(5)]\nprint([(o.id, o.total, o.city, needs_review(o)) for o in batch])', R)
      ],
      practice: [
        B('شغّل coverage بـ branches ولاقي 3 فجوات مهمة.', 'Run coverage with branches and find 3 important gaps.'),
        B('انقل fixtures مشتركة لـ conftest.', 'Move shared fixtures into conftest.'),
        B('علّم الاختبارات البطيئة بـ marker.', 'Mark slow tests with a marker.'),
        B('اكتب test data builder لأهم كائن عندك.', 'Write a test data builder for your main object.')
      ],
      words: [
        W('branch coverage', 'تغطية الفروع في الاتجاهين', 'whether each branch was taken both ways', 'Branch coverage showed the else was never tested.'),
        W('conftest', 'ملف fixtures المشتركة في pytest', 'pytest’s shared fixtures file', 'Put the repo fixture in conftest.'),
        W('marker', 'تصنيف للاختبارات', 'a label to group tests', 'Run pytest -m "not integration".'),
        W('xfail', 'اختبار متوقع يفشل', 'a test expected to fail', 'The known rounding bug is xfail.'),
        W('caplog', 'fixture بتمسك اللوج', 'a pytest fixture capturing logs', 'Assert on caplog.text.'),
        W('test data builder', 'دالة بتبني بيانات اختبار بقيم افتراضية', 'a helper building test objects with defaults', 'make_order is a test data builder.'),
        W('seeding', 'تثبيت بذرة العشوائية', 'fixing the random seed', 'Seeding makes random tests repeatable.')
      ],
      read: [{ t: 'coverage.py', url: 'https://coverage.readthedocs.io/', what: B('اقرا Branch coverage measurement.', 'Read Branch coverage measurement.') }],
      challenge: B('صحّح صحة حزمة اختبارات مشروع: conftest بـ fixtures مشتركة، markers للبطيء والتكامل، builders بدل البيانات الطويلة، seeding لكل عشوائية، branch coverage بتقرير — وخلّي الحزمة السريعة أقل من 10 ثواني.', 'Fix the health of a project’s test suite: a conftest with shared fixtures, markers for slow and integration tests, builders instead of long data, seeding for every randomness, a branch-coverage report — and keep the fast suite under 10 seconds.'),
      quiz: [
        Q(B('branch coverage:', 'Branch coverage:'), [['كل if اتجرّب في الاتجاهين؟', 'was each if taken both ways?'], ['عدد الملفات', 'the number of files'], ['سرعة الاختبار', 'test speed']], 0, B('فروع.', 'Branches.')),
        Q(B('باج معروف ومش هيتصلح النهارده:', 'A known bug not fixed today:'), [['xfail بالسبب ورقم التذكرة', 'xfail with the reason and ticket'], ['احذف الاختبار', 'delete the test'], ['سيبه يكسر CI', 'let it break CI']], 0, B('توثيق.', 'Documentation.')),
        Q(B('make_order(total=0):', 'make_order(total=0):'), [['test data builder', 'a test data builder'], ['mock', 'a mock'], ['migration', 'a migration']], 0, B('افتراضي.', 'Defaults.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('اختبارات بتديك ثقة تغيّر أي حاجة.', 'Tests that give you confidence to change anything.'),
      review: [
        B('هرم الاختبارات وTDD وarrange act assert والعزل.', 'The test pyramid, TDD, arrange act assert and isolation.'),
        B('stub وfake وspy وmock وpatch والوقت.', 'Stubs, fakes, spies, mocks, patching and time.'),
        B('Hypothesis واختبار الطفرات.', 'Hypothesis and mutation testing.'),
        B('respx وVCR وgolden files وtestcontainers والعقود.', 'respx, VCR, golden files, testcontainers and contracts.'),
        B('branch coverage وconftest وmarkers وbuilders.', 'Branch coverage, conftest, markers and builders.')
      ],
      project: B('مشروع الأسبوع «حزمة اختبارات احترافية» لخدمة المتجر: هرم واضح (≥ 150 وحدة، 20 تكامل، 3 e2e)، fakes لكل port، Hypothesis لموديول الفلوس، mutation testing بلا طفرات عايشة في الموديول ده، respx لكل API خارجي، Postgres بـ testcontainers، golden files للتقارير، markers وconftest وbuilders، وCI بيشغّل السريع على كل push والبطيء كل ليلة.', 'Week project «a professional test suite» for the shop service: a clear pyramid (≥ 150 unit, 20 integration, 3 e2e), fakes for every port, Hypothesis for the money module, mutation testing with no surviving mutants in that module, respx for every external API, Postgres via testcontainers, golden files for reports, markers, conftest and builders, and CI running the fast suite on every push and the slow one nightly.'),
      test: [
        Q(B('e2e:', 'End-to-end tests:'), [['قليلة وبطيئة وبتغطي النظام كله', 'few, slow, covering the whole system'], ['أغلب الاختبارات', 'most of the tests'], ['من غير قيمة', 'worthless']], 0, B('قمة الهرم.', 'The top.')),
        Q(B('TDD بيبدأ بـ:', 'TDD starts with:'), [['اختبار فاشل', 'a failing test'], ['الكود', 'the code'], ['النشر', 'deployment']], 0, B('red.', 'Red.')),
        Q(B('arrange act assert:', 'Arrange act assert:'), [['جهّز ← نفّذ ← تحقق', 'set up → act → check'], ['نفّذ ← احذف', 'act → delete'], ['تحقق بس', 'check only']], 0, B('شكل.', 'Shape.')),
        Q(B('stub:', 'A stub:'), [['بيرجّع رد ثابت', 'returns a fixed answer'], ['قاعدة بيانات', 'a database'], ['بيسجّل كل حاجة', 'records everything']], 0, B('ثابت.', 'Fixed.')),
        Q(B('mocks كتير:', 'Too many mocks:'), [['اختبارات بتتكسر مع refactoring', 'tests that break on refactoring'], ['أمان أكتر', 'more safety'], ['سرعة', 'speed']], 0, B('تنفيذ.', 'Implementation.')),
        Q(B('Hypothesis بيصغّر الفشل لـ:', 'Hypothesis shrinks a failure to:'), [['أبسط مثال', 'the simplest example'], ['أكبر مثال', 'the largest example'], ['مثال عشوائي', 'a random one']], 0, B('shrinking.', 'Shrinking.')),
        Q(B('round-trip:', 'A round-trip property:'), [['تحويل ورجوع = الأصل', 'convert and back = the original'], ['رحلة', 'a trip'], ['تكرار', 'a loop']], 0, B('رجوع.', 'Return.')),
        Q(B('mutation testing بيقيس:', 'Mutation testing measures:'), [['قوة الاختبارات', 'the strength of the tests'], ['سرعة الكود', 'code speed'], ['الذاكرة', 'memory']], 0, B('طفرات.', 'Mutants.')),
        Q(B('respx:', 'respx:'), [['يعترض طلبات httpx', 'intercepts httpx requests'], ['قاعدة بيانات', 'a database'], ['linter', 'a linter']], 0, B('HTTP.', 'HTTP.')),
        Q(B('golden file:', 'A golden file:'), [['مخرجات متوقعة للمقارنة', 'expected output to compare'], ['ملف ذهبي', 'a gold-coloured file'], ['نسخة احتياطية', 'a backup']], 0, B('مرجع.', 'Reference.')),
        Q(B('conftest.py:', 'conftest.py:'), [['fixtures مشتركة', 'shared fixtures'], ['إعدادات Docker', 'Docker settings'], ['README', 'a README']], 0, B('مشاركة.', 'Sharing.')),
        Q(B('اختبار عشوائي بيفشل مرة:', 'A random test failing once:'), [['seeding عشان يتكرر', 'seeding so it repeats'], ['تجاهله', 'ignore it'], ['احذفه', 'delete it']], 0, B('تكرار.', 'Repeatability.'))
      ] }
  ]
};
