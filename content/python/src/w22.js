// Python week 22 — Quality: tests, types and async.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الجودة: الاختبارات والأنواع وasync', 'Quality: tests, types and async'),
  goal: B('تكتب كود تقدر تعتمد عليه وتغيّره من غير خوف: اختبارات بـ pytest (fixtures وparametrize وmock)، وأنواع بيفحصها mypy، وكود منسّق ومفحوص بـ ruff وpre-commit، وشغل متوازي بـ asyncio وthreads — نفس عادات الفرق المحترفة.',
          'Write code you can rely on and change without fear: tests with pytest (fixtures, parametrize and mocks), types checked by mypy, code formatted and linted with ruff and pre-commit, and concurrent work with asyncio and threads — the habits of professional teams.'),
  days: [
    { title: B('pytest', 'pytest'),
      goal: B('تكتب اختبارات بـ pytest بـ assert عادي، وتختبر حالات كتير بـ parametrize، وتتأكد من الأخطاء بـ pytest.raises، وتقارن الأرقام العشرية بـ approx.', 'Write tests with pytest using plain assert, cover many cases with parametrize, check errors with pytest.raises, and compare decimals with approx.'),
      learn: [
        { h: B('أول اختبار', 'A first test'),
          p: B('ملف اسمه `test_*.py` فيه دوال بتبدأ بـ `test_` وفيها `assert`. `pytest` بيلاقيهم لوحده ويشغّلهم، ولما assert تفشل بيوريك القيمتين بالتفصيل. `pytest -q` مختصر، و`-x` يقف عند أول فشل، و`-k phone` يشغّل اللي اسمه فيه phone. ده الترقية الطبيعية لـ assert اللي كتبتها من أسبوع 6.', 'A file named `test_*.py` holds functions starting with `test_` containing `assert`. `pytest` finds and runs them by itself, and when an assert fails it shows both values in detail. `pytest -q` is brief, `-x` stops at the first failure, and `-k phone` runs tests whose name contains phone. It is the natural upgrade of the asserts you have written since week 6.'),
          ex: '# text_tools.py\nimport re\n\ndef clean_phone(raw: str) -> str | None:\n    digits = re.sub(r"\\D", "", raw)\n    digits = re.sub(r"^(?:0020|20)(?=1)", "0", digits)\n    return digits if re.fullmatch(r"01[0125]\\d{8}", digits) else None\n\n# test_text_tools.py\nfrom text_tools import clean_phone\n\ndef test_plain_number():\n    assert clean_phone("01012345678") == "01012345678"\n\ndef test_country_code():\n    assert clean_phone("+20 100 222 3333") == "01002223333"\n\ndef test_rejects_landline():\n    assert clean_phone("0221234567") is None\n\n# terminal:  python -m pip install pytest  &&  pytest -q', lang: 'text' },
        { h: B('parametrize', 'parametrize'),
          p: B('بدل 10 دوال اختبار لنفس الدالة بمدخلات مختلفة: `@pytest.mark.parametrize("raw, expected", [...])` بيشغّل نفس الاختبار على كل حالة وبيوريك أنهي واحدة فشلت. حط الحالات الطرفية دايمًا: فاضي، مسافات، عربي، أرقام هندي، قيمة كبيرة جدًا.', 'Instead of 10 test functions for one function with different inputs: `@pytest.mark.parametrize("raw, expected", [...])` runs one test over every case and shows which failed. Always include edge cases: empty, spaces, Arabic, Arabic-Indic digits, a huge value.'),
          ex: 'import pytest\nfrom text_tools import clean_phone\n\n@pytest.mark.parametrize("raw, expected", [\n    ("01012345678", "01012345678"),\n    ("010-1234-5678", "01012345678"),\n    ("+20 10 1234 5678", "01012345678"),\n    ("00201112345678", "01112345678"),\n    ("", None),\n    ("0221234567", None),\n    ("phone?", None),\n])\ndef test_clean_phone(raw, expected):\n    assert clean_phone(raw) == expected', lang: 'text' },
        { h: B('raises وapprox', 'raises and approx'),
          p: B('`with pytest.raises(ValueError, match="positive"):` بيتأكد إن الكود بيطلّع الخطأ ده برسالة فيها الكلمة دي (لو مطلعش، الاختبار يفشل). و`assert total == pytest.approx(114.0)` للأرقام العشرية عشان `0.1 + 0.2` (أسبوع 2). المثال هنا بيعمل نفس الفكرة من غير pytest عشان يشتغل في الصفحة.', '`with pytest.raises(ValueError, match="positive"):` checks the code raises that error with a message containing the word (if not, the test fails). `assert total == pytest.approx(114.0)` compares decimals despite `0.1 + 0.2` (week 2). The example shows the same idea without pytest so it runs on the page.'),
          ex: 'import math\n\ndef add_item(cart, qty):\n    if qty <= 0:\n        raise ValueError(f"qty must be positive, got {qty}")\n    cart.append(qty)\n\n# what pytest.raises checks, by hand:\ntry:\n    add_item([], 0)\n    raise AssertionError("expected ValueError")\nexcept ValueError as e:\n    assert "positive" in str(e)\n    print("raises ✓", e)\n\n# what pytest.approx checks, by hand:\nprint(0.1 + 0.2 == 0.3, math.isclose(0.1 + 0.2, 0.3, rel_tol=1e-6))', run: 1 }
      ],
      practice: [
        B('ثبّت pytest وانقل الـ asserts بتاعة `text_tools.py` (أسبوع 6) لملف `test_text_tools.py`.', 'Install pytest and move the asserts of `text_tools.py` (week 6) into `test_text_tools.py`.'),
        B('اكتب parametrize بـ 10 حالات لـ `normalise_ar` (أسبوع 10).', 'Write a 10-case parametrize for `normalise_ar` (week 10).'),
        B('اكتب اختبار raises لـ 3 دوال بتطلّع أخطاء.', 'Write raises tests for 3 functions that raise errors.'),
        B('بوّظ دالة بقصد وشوف رسالة pytest التفصيلية.', 'Break a function on purpose and read pytest’s detailed message.')
      ],
      code: [
        { u: B('إعدادات pytest في pyproject', 'pytest settings in pyproject'), p: '[tool.pytest.ini_options]\ntestpaths = ["tests"]\naddopts = "-q --strict-markers"\nmarkers = ["slow: tests that take more than a second", "network: tests that need the internet"]\n\n# run only the fast ones:  pytest -m "not slow and not network"', lang: 'text' }
      ],
      words: [
        { t: 'pytest', m: B('أشهر أداة اختبارات في Python', 'Python’s best-known testing tool'), ex: 'pytest -q' },
        { t: 'unit test', m: B('اختبار لجزء صغير (دالة) لوحده', 'a test of one small piece (a function) on its own'), ex: 'test_clean_phone' },
        { t: 'parametrize', m: B('تشغيل نفس الاختبار على حالات كتير', 'running one test over many cases'), ex: '@pytest.mark.parametrize(...)' },
        { t: 'pytest.raises', m: B('بيتأكد إن الكود بيطلّع خطأ معيّن', 'checks that code raises a given error'), ex: 'with pytest.raises(ValueError):' },
        { t: 'approx', m: B('مقارنة أرقام عشرية بتسامح صغير', 'comparing decimals with a small tolerance'), ex: 'pytest.approx(114.0)' },
        { t: 'test marker', m: B('علامة بتصنّف الاختبارات (slow وnetwork)', 'a label grouping tests (slow, network)'), ex: '@pytest.mark.slow' }
      ],
      read: [{ lib: 'pytest documentation', what: B('Get Started وHow to parametrize fixtures and test functions.', 'Get Started and How to parametrize fixtures and test functions.') }, { lib: 'Real Python Tutorials', what: B('دوّر على «effective python testing with pytest».', 'Search for «effective python testing with pytest».') }],
      challenge: B('اعمل فولدر `tests/` لمكتبة `mytools` (أسبوع 7) فيه 30 اختبار على الأقل بـ parametrize وraises، وكلهم بيعدّوا بـ `pytest -q`.', 'Create a `tests/` folder for the `mytools` library (week 7) with at least 30 tests using parametrize and raises, all passing with `pytest -q`.'),
      quiz: [
        { q: B('pytest بيلاقي الاختبارات في:', 'pytest finds tests in:'), o: [B('ملفات test_*.py ودوال test_', 'test_*.py files and test_ functions'), B('أي ملف', 'any file'), B('ملف tests.txt', 'a tests.txt file')], a: 0, why: B('بالأسماء.', 'By their names.') },
        { q: B('نفس الاختبار على 12 حالة:', 'The same test over 12 cases:'), o: ['parametrize', B('12 دالة', '12 functions'), B('لوب جوه الاختبار', 'a loop inside the test')], a: 0, why: B('وبيقولك أنهي فشلت.', 'And it tells you which failed.') },
        { q: B('مقارنة `0.1 + 0.2` بـ 0.3 في الاختبار:', 'Comparing `0.1 + 0.2` with 0.3 in a test:'), o: ['pytest.approx(0.3)', '== 0.3', 'is 0.3'], a: 0, why: B('float مش دقيق.', 'Floats are inexact.') }
      ] },

    { title: B('تصميم الاختبارات وmock', 'Designing tests and mocks'),
      goal: B('تفرّق بين unit وintegration، وتستخدم fixtures وtmp_path، وتبدّل الشبكة والوقت بـ monkeypatch وmock عشان الاختبارات تبقى سريعة وثابتة، وتقيس التغطية.', 'Tell unit from integration tests, use fixtures and tmp_path, replace the network and the clock with monkeypatch and mocks so tests stay fast and stable, and measure coverage.'),
      learn: [
        { h: B('fixtures وtmp_path', 'fixtures and tmp_path'),
          p: B('`@pytest.fixture` دالة بتجهّز حاجة الاختبار محتاجها (بيانات نموذجية، قاعدة مؤقتة، كائن)، وأي اختبار ياخدها باسمها كمعامل. `tmp_path` fixture جاهزة: فولدر مؤقت جديد لكل اختبار — اكتب ملفات فيه براحتك. الـ fixture اللي فيها `yield` بتنضّف بعد الاختبار.', '`@pytest.fixture` is a function preparing something a test needs (sample data, a temporary database, an object), and any test takes it by name as a parameter. `tmp_path` is a ready fixture: a fresh temporary folder per test — write files there freely. A fixture with `yield` cleans up after the test.'),
          ex: 'import json, pytest\nfrom report import load_orders, summarise\n\n@pytest.fixture\ndef orders_file(tmp_path):\n    data = [{"id": 1, "total": 1200, "status": "paid"}, {"id": 2, "total": 450, "status": "new"}]\n    path = tmp_path / "orders.json"\n    path.write_text(json.dumps(data), encoding="utf-8")\n    return path\n\ndef test_load(orders_file):\n    assert len(load_orders(orders_file)) == 2\n\ndef test_summary_counts_paid_only(orders_file):\n    assert summarise(load_orders(orders_file))["paid_total"] == 1200', lang: 'text' },
        { h: B('mock وmonkeypatch', 'Mocks and monkeypatch'),
          p: B('الاختبار اللي بينادي API حقيقي أو بيبعت إيميل بطيء ومش ثابت (والنت ممكن يفصل). بدّل الجزء ده بنسخة وهمية: `monkeypatch.setattr(module, "fetch", fake_fetch)` أو `unittest.mock.Mock`. وأحسن من الاتنين: صمّم الكود ياخد الحاجات دي كمعاملات (التركيب، أسبوع 17) فتبعت الوهمي بسهولة.', 'A test that calls a real API or sends an email is slow and flaky (and the network may drop). Replace that part with a fake: `monkeypatch.setattr(module, "fetch", fake_fetch)` or a `unittest.mock.Mock`. Better than both: design the code to take those things as parameters (composition, week 17) so passing a fake is easy.'),
          ex: 'from unittest.mock import Mock\n\ndef weather_alert(city: str, fetch_temp, notify) -> bool:\n    temp = fetch_temp(city)\n    if temp >= 40:\n        notify(f"Heat alert for {city}: {temp}°C")\n        return True\n    return False\n\nnotify = Mock()\nassert weather_alert("Aswan", fetch_temp=lambda c: 44, notify=notify) is True\nnotify.assert_called_once_with("Heat alert for Aswan: 44°C")\nnotify2 = Mock()\nassert weather_alert("Alex", fetch_temp=lambda c: 29, notify=notify2) is False\nnotify2.assert_not_called()\nprint("both tests passed without any network", notify.call_args)', run: 1 },
        { h: B('الوقت والتغطية', 'Time and coverage'),
          p: B('الكود اللي بيستخدم `date.today()` جوه بيدّي نتيجة مختلفة كل يوم والاختبار يفشل بكرة. خليه ياخد `today` كمعامل بقيمة افتراضية (زي `last_month(today)` أسبوع 20). و`pytest --cov=mytools` (حزمة pytest-cov) بيقولك أنهي سطور محدش اختبرها — هدف معقول 80% للدوال المهمة، مش 100% لأي حاجة.', 'Code calling `date.today()` inside gives a different result every day and the test fails tomorrow. Make it take `today` as a parameter with a default (like `last_month(today)` in week 20). `pytest --cov=mytools` (the pytest-cov package) shows which lines no test touches — a sensible target is 80% for the important functions, not 100% of everything.'),
          ex: 'from datetime import date\n\ndef is_overdue(due: date, today: date | None = None) -> bool:\n    today = today or date.today()\n    return today > due\n\n# deterministic tests: the clock is a parameter\nassert is_overdue(date(2026, 9, 30), today=date(2026, 10, 1)) is True\nassert is_overdue(date(2026, 9, 30), today=date(2026, 9, 30)) is False\nprint("time-independent tests pass")', run: 1 }
      ],
      practice: [
        B('اعمل fixture بتعمل قاعدة SQLite مؤقتة بجداول المتجر واستخدمها في 4 اختبارات.', 'Make a fixture creating a temporary SQLite database with the shop tables and use it in 4 tests.'),
        B('اختبر دالة بتنادي API (أسبوع 13) بـ monkeypatch من غير نت.', 'Test a function calling an API (week 13) with monkeypatch and no network.'),
        B('صلّح دالة بتستخدم date.today() جوه عشان تبقى قابلة للاختبار.', 'Fix a function that calls date.today() inside so it becomes testable.'),
        B('ثبّت pytest-cov وشوف تغطية مكتبتك واكتب اختبار لأهم سطر مش متغطي.', 'Install pytest-cov, check your library’s coverage and test the most important uncovered line.')
      ],
      code: [
        { u: B('monkeypatch لـ requests', 'monkeypatch for requests'), p: 'import pytest\nimport collector            # your module that uses requests.get\n\nclass FakeResponse:\n    def __init__(self, data, status=200):\n        self._data, self.status_code = data, status\n    def json(self):\n        return self._data\n    def raise_for_status(self):\n        if self.status_code >= 400:\n            raise RuntimeError(self.status_code)\n\ndef test_get_users_offline(monkeypatch):\n    monkeypatch.setattr(collector.requests, "get", lambda url, **kw: FakeResponse([{"id": 1, "name": "Sara"}]))\n    assert collector.get_users()[0]["name"] == "Sara"\n\ndef test_api_down(monkeypatch):\n    monkeypatch.setattr(collector.requests, "get", lambda url, **kw: FakeResponse({}, 503))\n    with pytest.raises(RuntimeError):\n        collector.get_users()', lang: 'text' }
      ],
      words: [
        { t: 'integration test', m: B('اختبار لأكتر من جزء شغالين مع بعض', 'a test of several parts working together'), ex: 'API + database' },
        { t: 'tmp_path', m: B('fixture بتدي فولدر مؤقت جديد لكل اختبار', 'a fixture giving a fresh temporary folder per test'), ex: 'def test_x(tmp_path):' },
        { t: 'mock', m: B('كائن وهمي بيسجّل إزاي اتنادى', 'a fake object recording how it was called'), ex: 'notify.assert_called_once_with(...)' },
        { t: 'monkeypatch', m: B('تبديل دالة أو متغير مؤقتًا في اختبار', 'temporarily replacing a function or variable in a test'), ex: 'monkeypatch.setattr(mod, "get", fake)' },
        { t: 'flaky test', m: B('اختبار بينجح مرة ويفشل مرة من غير تغيير في الكود', 'a test that passes or fails without code changes'), ex: 'depends on the network or the clock' },
        { t: 'code coverage', m: B('نسبة السطور اللي الاختبارات بتشغّلها', 'the share of lines the tests run'), ex: 'pytest --cov=mytools' }
      ],
      read: [{ lib: 'pytest documentation', what: B('How to use fixtures وHow to monkeypatch/mock modules and environments.', 'How to use fixtures and How to monkeypatch/mock modules and environments.') }, { lib: 'The Python Standard Library', what: B('افتح unittest.mock: Quick Guide.', 'Open unittest.mock: Quick Guide.') }],
      challenge: B('اكتب اختبارات لمراقب الأسعار (أسبوع 16): diff وlooks_healthy وparse على HTML محفوظ في `tests/fixtures/`، وwatch كله بـ fetch وnotify وهميين — من غير ولا طلب شبكة، وكلهم أقل من ثانية.', 'Write tests for the price watcher (week 16): diff, looks_healthy and parse on HTML saved in `tests/fixtures/`, and the whole watch with fake fetch and notify — with no network request at all, all under a second.'),
      quiz: [
        { q: B('اختبار بينادي API حقيقي:', 'A test calling a real API:'), o: [B('بطيء ومش ثابت؛ استخدم وهمي', 'is slow and flaky; use a fake'), B('هو الأحسن', 'is the best'), B('ممنوع في pytest', 'is forbidden in pytest')], a: 0, why: B('flaky.', 'Flaky.') },
        { q: B('`tmp_path` بيدّيك:', '`tmp_path` gives you:'), o: [B('فولدر مؤقت لكل اختبار', 'a temporary folder per test'), B('ملف لوج', 'a log file'), B('قاعدة بيانات', 'a database')], a: 0, why: B('fixture جاهزة.', 'A built-in fixture.') },
        { q: B('دالة جواها date.today() صعب تختبرها. الحل:', 'A function calling date.today() inside is hard to test. The fix:'), o: [B('خليها تاخد today كمعامل', 'make it take today as a parameter'), B('متختبرهاش', 'do not test it'), B('اختبرها كل يوم', 'test it daily')], a: 0, why: B('حقن الوقت.', 'Injecting the clock.') }
      ] },

    { title: B('الأنواع وmypy', 'Types and mypy'),
      goal: B('تكتب type hints أدق (list[dict[str, int]] و| None وTypedDict وProtocol وCallable)، وتشغّل mypy يلاقي الأخطاء قبل التشغيل.', 'Write sharper type hints (list[dict[str, int]], | None, TypedDict, Protocol, Callable) and run mypy to find errors before running.'),
      learn: [
        { h: B('أنواع أدق', 'Sharper types'),
          p: B('`list[str]` و`dict[str, float]` و`tuple[str, int]` و`str | None` (ممكن يرجّع None — اللي بيستخدم الدالة لازم يتعامل معاها). `type Money = float` اسم مستعار يوضح المعنى. الأنواع توثيق بيتفحص: VS Code وmypy بيقولولك قبل ما تشغّل لو بتبعت حاجة غلط.', '`list[str]`, `dict[str, float]`, `tuple[str, int]` and `str | None` (it may return None — callers must handle it). `type Money = float` is an alias that states the meaning. Types are checked documentation: VS Code and mypy tell you before running when you pass the wrong thing.'),
          ex: 'type Money = float\ntype Row = dict[str, str | float]\n\ndef totals_by_city(rows: list[Row]) -> dict[str, Money]:\n    out: dict[str, Money] = {}\n    for r in rows:\n        city = str(r["city"])\n        out[city] = out.get(city, 0.0) + float(r["total"])\n    return out\n\ndef find(rows: list[Row], order_id: float) -> Row | None:\n    return next((r for r in rows if r["id"] == order_id), None)\n\nrows: list[Row] = [{"id": 1, "city": "Cairo", "total": 1200.0}, {"id": 2, "city": "Giza", "total": 450.5}]\nprint(totals_by_city(rows))\nhit = find(rows, 9)\nprint(hit["city"] if hit is not None else "not found")', run: 1 },
        { h: B('TypedDict وProtocol وCallable', 'TypedDict, Protocol and Callable'),
          p: B('`TypedDict` بيوصف dict بمفاتيح معروفة (زي رد API) من غير ما تحوّله كلاس. `Protocol` بيقول «أي حاجة فيها method `send(text)`» من غير وراثة (duck typing بأنواع). و`Callable[[str], int]` لدالة بتاخد str وترجّع int.', '`TypedDict` describes a dict with known keys (like an API response) without turning it into a class. `Protocol` says «anything with a `send(text)` method» without inheritance (typed duck typing). `Callable[[str], int]` is a function taking a str and returning an int.'),
          ex: 'from typing import Callable, Protocol, TypedDict\n\nclass UserJSON(TypedDict):\n    id: int\n    name: str\n    email: str\n\nclass Notifier(Protocol):\n    def send(self, text: str) -> None: ...\n\nclass PrintNotifier:                 # no inheritance needed\n    def send(self, text: str) -> None:\n        print("SEND:", text)\n\ndef welcome(user: UserJSON, notifier: Notifier, clean: Callable[[str], str] = str.strip) -> None:\n    notifier.send(f"Welcome {clean(user[\'name\'])} <{user[\'email\']}>")\n\nwelcome({"id": 1, "name": "  Sara ", "email": "s@x.com"}, PrintNotifier())', run: 1 },
        { h: B('mypy', 'mypy'),
          p: B('`pip install mypy` و`mypy mytools/`: بيقرا الأنواع ويلاقي أخطاء زي «بتبعت str لدالة عايزة int» أو «ممكن تكون None وانت بتعمل .lower()». ابدأ بالملفات الجديدة، وفي `pyproject.toml` زوّد الصرامة بالتدريج. مش بديل للاختبارات — بيمسك نوع تاني من الأخطاء.', '`pip install mypy` and `mypy mytools/`: it reads the types and finds mistakes like «passing a str to a function wanting an int» or «this may be None and you call .lower()». Start with new files and raise the strictness gradually in `pyproject.toml`. It does not replace tests — it catches a different kind of mistake.'),
          ex: '# bug.py\ndef find_email(users: dict[str, str], name: str) -> str | None:\n    return users.get(name)\n\nemail = find_email({"sara": "s@x.com"}, "omar")\nprint(email.lower())            # may be None!\n\ndef vat(amount: float) -> float:\n    return amount * 0.14\n\nvat("100")                      # wrong type\n\n# $ mypy bug.py\n# bug.py:5: error: Item "None" of "str | None" has no attribute "lower"  [union-attr]\n# bug.py:10: error: Argument 1 to "vat" has incompatible type "str"; expected "float"  [arg-type]\n# Found 2 errors in 1 file (checked 1 source file)', lang: 'text' }
      ],
      practice: [
        B('حط أنواع دقيقة على كل دوال مكتبتك (mytools).', 'Add precise types to every function of your library (mytools).'),
        B('اعمل TypedDict لرد JSONPlaceholder users واستخدمه.', 'Make a TypedDict for the JSONPlaceholder users response and use it.'),
        B('حوّل Notifier ABC (أسبوع 17) لـ Protocol وشوف الفرق.', 'Turn the Notifier ABC (week 17) into a Protocol and see the difference.'),
        B('شغّل mypy وصلّح كل خطأ (من غير `# type: ignore` غير لسبب مكتوب).', 'Run mypy and fix every error (no `# type: ignore` without a written reason).')
      ],
      code: [
        { u: B('إعدادات mypy', 'mypy settings'), p: '[tool.mypy]\npython_version = "3.12"\nwarn_unused_ignores = true\nwarn_return_any = true\ndisallow_untyped_defs = true      # every function needs types\nno_implicit_optional = true\n\n[[tool.mypy.overrides]]\nmodule = ["openpyxl.*", "fpdf.*"]\nignore_missing_imports = true', lang: 'text' }
      ],
      words: [
        { t: 'generic type', m: B('نوع بيوصف محتواه زي list[str]', 'a type describing its contents, like list[str]'), ex: 'dict[str, float]' },
        { t: 'type alias', m: B('اسم بتديه لنوع عشان يوضّح المعنى', 'a name you give a type to state its meaning'), ex: 'type Money = float' },
        { t: 'TypedDict', m: B('وصف dict بمفاتيح وأنواع معروفة', 'describing a dict with known keys and types'), ex: 'class UserJSON(TypedDict):' },
        { t: 'Protocol', m: B('نوع بيقول «أي حاجة فيها الـ methods دي»', 'a type saying «anything with these methods»'), ex: 'class Notifier(Protocol)' },
        { t: 'Callable', m: B('نوع لدالة بمعاملاتها وقيمتها الراجعة', 'a type for a function with its parameters and return value'), ex: 'Callable[[str], str]' },
        { t: 'mypy', m: B('أداة بتفحص الأنواع من غير تشغيل', 'a tool that checks types without running'), ex: 'mypy mytools/' },
        { t: 'static analysis', m: B('فحص الكود من غير ما يتشغّل', 'checking code without running it'), ex: 'mypy, ruff' }
      ],
      read: [{ lib: 'mypy documentation', what: B('Getting started وType hints cheat sheet.', 'Getting started and the Type hints cheat sheet.') }, { lib: 'typing — Support for type hints', what: B('اقرا TypedDict وProtocol.', 'Read TypedDict and Protocol.') }],
      challenge: B('شغّل mypy بـ `disallow_untyped_defs` على مشروع الفواتير (أسبوع 17)، وصلّح كل الأخطاء، واكتب في README 3 أخطاء حقيقية mypy لقاها كانت هتعدّي من الاختبارات.', 'Run mypy with `disallow_untyped_defs` on the invoicing project (week 17), fix every error, and write in the README 3 real mistakes mypy found that the tests would have missed.'),
      quiz: [
        { q: B('دالة ممكن ترجّع نص أو مفيش:', 'A function that may return text or nothing:'), o: ['-> str | None', '-> str', '-> None'], a: 0, why: B('اللي بيستخدمها لازم يفحص None.', 'Callers must check for None.') },
        { q: B('«أي كائن فيه send(text)» من غير وراثة:', '«any object with send(text)» without inheritance:'), o: ['Protocol', 'ABC', 'TypedDict'], a: 0, why: B('duck typing بأنواع.', 'Typed duck typing.') },
        { q: B('mypy بيلاقي الأخطاء:', 'mypy finds mistakes:'), o: [B('من غير ما يشغّل الكود', 'without running the code'), B('وهو بيشغّله', 'while running it'), B('في الإنتاج بس', 'only in production')], a: 0, why: B('static.', 'Static analysis.') }
      ] },

    { title: B('ruff وpre-commit ومراجعة الكود', 'ruff, pre-commit and code review'),
      goal: B('تنسّق الكود وتفحصه أوتوماتيك بـ ruff، وتخلي Git يرفض أي commit مش نضيف بـ pre-commit، وتراجع كودك (وكود غيرك) بقايمة واضحة.', 'Format and lint code automatically with ruff, have Git refuse unclean commits with pre-commit, and review your code (and others’) with a clear checklist.'),
      learn: [
        { h: B('ruff: فحص وتنسيق', 'ruff: lint and format'),
          p: B('`ruff check .` بيلاقي مشاكل (import مش مستخدم، متغير متعرّف ومش مستخدم، `except:` فاضي، مقارنة بـ `== None`…) و`--fix` بيصلّح كتير منها. و`ruff format .` بينسّق الكود كله بشكل واحد (مسافات وعلامات تنصيص وطول السطر) — مفيش نقاش في الفريق على الشكل. سريع جدًا وإعداداته في `pyproject.toml`.', '`ruff check .` finds problems (an unused import, a variable set but never used, a bare `except:`, `== None` comparisons…) and `--fix` repairs many of them. `ruff format .` formats all the code one way (spacing, quotes, line length) — no more team debates about style. It is very fast and configured in `pyproject.toml`.'),
          ex: '# before ruff\nimport os, json\ndef total(items):\n  t=0\n  for i in items :\n      t+=i["price"]*i["qty"]\n  if t == None: return 0\n  try: return round(t,2)\n  except: pass\n\n# $ ruff check . --fix && ruff format .\n# F401 [*] `os` imported but unused\n# E711 Comparison to `None` should be `cond is None`\n# E722 Do not use bare `except`\n\n# after\nimport json\n\n\ndef total(items):\n    t = 0\n    for i in items:\n        t += i["price"] * i["qty"]\n    return round(t, 2)', lang: 'text' },
        { h: B('pre-commit', 'pre-commit'),
          p: B('`pre-commit` بيشغّل ruff (وأي فحص تاني) لوحده قبل كل `git commit`، ولو فيه مشكلة الـ commit ميحصلش لحد ما تصلّح. ملف `.pre-commit-config.yaml` في المشروع و`pre-commit install` مرة واحدة. ضيف فحص يمنع رفع الأسرار (زي detect-private-key) — آخر خط دفاع قبل GitHub.', '`pre-commit` runs ruff (and any other check) by itself before every `git commit`, and when there is a problem the commit does not happen until you fix it. A `.pre-commit-config.yaml` file in the project and `pre-commit install` once. Add a check that blocks secrets (such as detect-private-key) — the last line of defence before GitHub.'),
          ex: '# .pre-commit-config.yaml\nrepos:\n  - repo: https://github.com/astral-sh/ruff-pre-commit\n    rev: v0.6.9\n    hooks:\n      - id: ruff\n        args: [--fix]\n      - id: ruff-format\n  - repo: https://github.com/pre-commit/pre-commit-hooks\n    rev: v5.0.0\n    hooks:\n      - id: check-yaml\n      - id: end-of-file-fixer\n      - id: detect-private-key\n      - id: check-added-large-files\n\n# once per clone:\n# python -m pip install pre-commit && pre-commit install', lang: 'text' },
        { h: B('مراجعة الكود', 'Code review'),
          p: B('قبل ما تقول «خلصت» أو تبعت كود لعميل، راجع بالقايمة: بيعمل المطلوب؟ (اختبار لكل حالة مهمة) — أخطاء متوقعة متعالجة ومش متبلوعة؟ — أسرار في .env بس؟ — أسماء واضحة ودوال صغيرة؟ — لوج كفاية تعرف حصل إيه؟ — README بيقول إزاي تشغّله؟ واقرا الـ diff بتاعك كأنه كود حد تاني.', 'Before you say «done» or ship code to a client, review with a checklist: does it do what was asked? (a test for each important case) — are expected errors handled, not swallowed? — secrets only in .env? — clear names and small functions? — enough logging to know what happened? — does the README say how to run it? And read your own diff as if someone else wrote it.'),
          ex: 'REVIEW = [\n    "Does it do what was asked? Is there a test for each important case?",\n    "Are expected errors handled (and logged), with nothing swallowed?",\n    "Are all secrets in .env, and is .env in .gitignore?",\n    "Clear names, small functions, no dead code or leftover prints?",\n    "Inputs from outside validated (Pydantic / parameters in SQL / escaping in HTML)?",\n    "Timeouts on every network call; retries only where safe?",\n    "Can someone else run it from the README in 5 minutes?",\n]\nfor n, item in enumerate(REVIEW, 1):\n    print(f"[ ] {n}. {item}")', run: 1 }
      ],
      practice: [
        B('ثبّت ruff وشغّل `ruff check` و`ruff format` على كل مشاريع الرحلة وصلّح الباقي بإيدك.', 'Install ruff, run `ruff check` and `ruff format` on every journey project and fix the rest by hand.'),
        B('ركّب pre-commit في مشروع وجرّب تعمل commit بكود فيه import مش مستخدم.', 'Set up pre-commit in a project and try committing code with an unused import.'),
        B('راجع مشروع قديم بقايمة المراجعة واكتب 5 تحسينات.', 'Review an old project with the checklist and write down 5 improvements.'),
        B('بدّل مشروع مع زميل (أو اطلب من AI يراجع) وقارن بالقايمة.', 'Swap a project with a colleague (or ask an AI to review) and compare against the checklist.')
      ],
      code: [
        { u: B('ruff في pyproject', 'ruff in pyproject'), p: '[tool.ruff]\nline-length = 110\ntarget-version = "py312"\n\n[tool.ruff.lint]\nselect = ["E", "F", "W", "I", "B", "UP", "SIM", "S"]   # errors, pyflakes, imports, bugbear, upgrades, simplify, security\nignore = ["E501"]\n\n[tool.ruff.lint.per-file-ignores]\n"tests/*" = ["S101"]      # assert is fine in tests', lang: 'text' }
      ],
      words: [
        { t: 'linter', m: B('أداة بتلاقي أخطاء وعادات سيئة في الكود', 'a tool finding mistakes and bad habits in code'), ex: 'ruff check' },
        { t: 'ruff', m: B('linter وformatter سريع جدًا لـ Python', 'a very fast linter and formatter for Python'), ex: 'ruff check . --fix' },
        { t: 'formatter', m: B('أداة بتوحّد شكل الكود لوحدها', 'a tool that unifies code style by itself'), ex: 'ruff format .' },
        { t: 'pre-commit hook', m: B('فحص بيشتغل قبل كل commit ويمنعه لو فيه مشكلة', 'a check running before each commit, blocking it on problems'), ex: 'pre-commit install' },
        { t: 'code review', m: B('مراجعة الكود قبل ما يتدمج أو يتسلّم', 'reviewing code before it is merged or delivered'), ex: 'a checklist and a fresh eye' },
        { t: 'dead code', m: B('كود مش بيتشغّل ولا بيتستخدم', 'code that never runs or is never used'), ex: 'remove it; Git remembers' }
      ],
      read: [{ lib: 'Ruff documentation', what: B('Tutorial كله.', 'The whole Tutorial.') }, { lib: 'Beyond the Basic Stuff with Python', what: B('الفصل عن Code Formatting with Black (نفس فكرة ruff format).', 'The chapter on Code Formatting with Black (the same idea as ruff format).') }],
      challenge: B('جهّز «قالب المشروع» بتاعك (أسبوع 7) بـ ruff وmypy وpytest وpre-commit في pyproject، وارفعه على GitHub، واعمل منه مشروع جديد وتأكد إن كل الفحوصات شغالة من أول commit.', 'Equip your «project template» (week 7) with ruff, mypy, pytest and pre-commit in pyproject, push it to GitHub, create a new project from it and confirm every check works from the first commit.'),
      quiz: [
        { q: B('`ruff format .` بيعمل:', '`ruff format .`:'), o: [B('بيوحّد شكل الكود', 'unifies the code style'), B('بيشغّل الاختبارات', 'runs the tests'), B('بيفحص الأنواع', 'checks types')], a: 0, why: B('formatter.', 'A formatter.') },
        { q: B('pre-commit بيشتغل امتى؟', 'When does pre-commit run?'), o: [B('قبل كل git commit', 'before every git commit'), B('بعد الـ push', 'after a push'), B('كل ساعة', 'every hour')], a: 0, why: B('hook.', 'A hook.') },
        { q: B('أهم فحص قبل الرفع على GitHub:', 'The key check before pushing to GitHub:'), o: [B('مفيش أسرار في الكود', 'no secrets in the code'), B('الكود طويل', 'the code is long'), B('الألوان', 'the colours')], a: 0, why: B('detect-private-key.', 'detect-private-key.') }
      ] },

    { title: B('async والتوازي', 'async and concurrency'),
      goal: B('تعمل طلبات كتير في نفس الوقت بـ asyncio وhttpx، وتتحكم في العدد بـ Semaphore عشان متكسرش حدود الـ API، وتستخدم threads للشغل اللي بيستنى I/O وكوده sync، وتعرف تختار.', 'Make many requests at once with asyncio and httpx, cap the count with a Semaphore so you respect API limits, use threads for waiting I/O with sync code, and know how to choose.'),
      learn: [
        { h: B('coroutines وgather', 'Coroutines and gather'),
          p: B('`async def` بتعمل coroutine، و`await` بيستنى حاجة (طلب شبكة، sleep) من غير ما يوقف البرنامج — الـ event loop بيشغّل غيرها في الوقت ده. `asyncio.gather(*coros)` بيشغّلهم مع بعض: 100 طلب كل واحد ثانية بياخدوا ثانية تقريبًا مش 100. مفيد للشغل اللي **بيستنى** (شبكة وملفات)، مش للحسابات التقيلة.', '`async def` makes a coroutine and `await` waits for something (a network call, a sleep) without stopping the program — the event loop runs other work meanwhile. `asyncio.gather(*coros)` runs them together: 100 one-second requests take about one second, not 100. Useful for work that **waits** (network and files), not for heavy calculations.'),
          ex: 'import asyncio, time\n\nasync def fetch_price(sku: str) -> tuple[str, float]:\n    await asyncio.sleep(0.5)                 # stands in for a network call\n    return sku, len(sku) * 10.5\n\nasync def main():\n    t = time.perf_counter()\n    results = await asyncio.gather(*(fetch_price(f"SKU-{i}") for i in range(20)))\n    print(len(results), "prices in", f"{time.perf_counter() - t:.2f}s (one by one: ~10s)")\n    print(results[:3])\n\nasyncio.run(main())', run: 1 },
        { h: B('httpx.AsyncClient وSemaphore', 'httpx.AsyncClient and Semaphore'),
          p: B('`httpx.AsyncClient()` زي Session بتاع requests بس async. لو بعت 1000 طلب مرة واحدة هتاخد 429 (أو تتحظر). `asyncio.Semaphore(5)` بيسمح بـ 5 طلبات بس في نفس اللحظة والباقي يستنى دوره — توازي محترم.', '`httpx.AsyncClient()` is like a requests Session, but async. Firing 1,000 requests at once earns 429s (or a ban). `asyncio.Semaphore(5)` allows only 5 requests at the same moment while the rest wait their turn — polite concurrency.'),
          ex: '# pip install httpx\nimport asyncio, httpx\n\nasync def fetch(client, sem, url):\n    async with sem:                          # at most 5 at a time\n        r = await client.get(url, timeout=15)\n        r.raise_for_status()\n        return r.json()\n\nasync def main():\n    sem = asyncio.Semaphore(5)\n    urls = [f"https://jsonplaceholder.typicode.com/posts/{i}" for i in range(1, 51)]\n    async with httpx.AsyncClient(headers={"User-Agent": "python-journey/1.0"}) as client:\n        results = await asyncio.gather(*(fetch(client, sem, u) for u in urls), return_exceptions=True)\n    ok = [r for r in results if not isinstance(r, Exception)]\n    print(len(ok), "ok,", len(results) - len(ok), "failed")\n\nasyncio.run(main())' },
        { h: B('threads للكود الـ sync', 'Threads for sync code'),
          p: B('لو المكتبة sync (requests وboto وغيرهم) ومش عايز تعيد كتابتها: `ThreadPoolExecutor(max_workers=8)` و`executor.map(fn, items)` بيشغّلها بالتوازي في threads. للحسابات التقيلة (CPU) استخدم `ProcessPoolExecutor`. القاعدة: بيستنى شبكة → async أو threads، بيحسب كتير → processes، شوية حاجات → عادي من غير توازي (أبسط).', 'If the library is sync (requests, boto and others) and you do not want to rewrite it: `ThreadPoolExecutor(max_workers=8)` with `executor.map(fn, items)` runs it in parallel threads. For heavy (CPU) calculations use `ProcessPoolExecutor`. The rule: waiting on the network → async or threads, heavy computing → processes, only a few items → plain sequential code (simplest).'),
          ex: 'import time\nfrom concurrent.futures import ThreadPoolExecutor\n\ndef slow_lookup(order_id: int) -> str:\n    time.sleep(0.3)                          # a blocking call, like requests.get\n    return f"order {order_id}: shipped"\n\nt = time.perf_counter()\nwith ThreadPoolExecutor(max_workers=8) as pool:\n    results = list(pool.map(slow_lookup, range(16)))\nprint(results[:2], f"{time.perf_counter() - t:.1f}s with 8 threads (one by one: ~4.8s)")', run: 1 }
      ],
      practice: [
        B('حوّل جامع البيانات (أسبوع 13) لـ httpx.AsyncClient بـ Semaphore(5) وقارن الوقت.', 'Convert the data collector (week 13) to httpx.AsyncClient with Semaphore(5) and compare the time.'),
        B('اعمل نفس الحاجة بـ ThreadPoolExecutor وrequests وقارن.', 'Do the same with ThreadPoolExecutor and requests, and compare.'),
        B('جرّب Semaphore(1) و(5) و(20) واكتب الأوقات.', 'Try Semaphore(1), (5) and (20) and write down the times.'),
        B('اكتب جملة لكل مشروع عملته: محتاج توازي؟ وأنهي نوع؟', 'Write a sentence for each project you built: does it need concurrency, and which kind?')
      ],
      code: [
        { u: B('async مع retry وحد', 'async with retry and a limit'), p: 'import asyncio, random\n\nasync def call_api(i: int) -> int:\n    await asyncio.sleep(0.05)\n    if random.random() < 0.3:\n        raise ConnectionError("temporary")\n    return i\n\nasync def with_retry(i: int, sem: asyncio.Semaphore, tries: int = 3) -> int | None:\n    async with sem:\n        for attempt in range(1, tries + 1):\n            try:\n                return await call_api(i)\n            except ConnectionError:\n                await asyncio.sleep(0.05 * 2 ** attempt)\n        return None\n\nasync def main():\n    random.seed(3)\n    sem = asyncio.Semaphore(4)\n    results = await asyncio.gather(*(with_retry(i, sem) for i in range(30)))\n    print(sum(r is not None for r in results), "of 30 succeeded")\n\nasyncio.run(main())', run: 1 }
      ],
      words: [
        { t: 'coroutine', m: B('دالة async بتقدر تستنى من غير ما توقف غيرها', 'an async function that can wait without stopping others'), ex: 'async def fetch(): ...' },
        { t: 'event loop', m: B('اللي بيشغّل الـ coroutines ويبدّل بينهم وهما مستنيين', 'what runs coroutines and switches between them while they wait'), ex: 'asyncio.run(main())' },
        { t: 'httpx.AsyncClient', m: B('عميل HTTP async (زي Session)', 'an async HTTP client (like a Session)'), ex: 'async with httpx.AsyncClient() as c:' },
        { t: 'Semaphore', m: B('بيحدد عدد العمليات اللي تشتغل مع بعض', 'limits how many operations run at once'), ex: 'asyncio.Semaphore(5)' },
        { t: 'ThreadPoolExecutor', m: B('بيشغّل دوال sync في threads بالتوازي', 'runs sync functions in parallel threads'), ex: 'pool.map(fn, items)' },
        { t: 'concurrency', m: B('إن البرنامج يتقدّم في أكتر من مهمة في نفس الفترة', 'a program making progress on several tasks in the same period'), ex: 'async, threads, processes' },
        { t: 'I/O-bound', m: B('شغل أغلب وقته مستني (شبكة وملفات)', 'work that spends most of its time waiting (network, files)'), ex: 'API calls → async or threads' }
      ],
      read: [{ lib: 'asyncio', what: B('Coroutines and Tasks (أول جزء وgather).', 'Coroutines and Tasks (the first part and gather).') }, { lib: 'HTTPX documentation', what: B('Async Support.', 'Async Support.') }],
      challenge: B('خلي مراقب الأسعار (أسبوع 16) يجيب صفحات التفاصيل بـ httpx.AsyncClient وSemaphore(3) وتأخير بسيط جوه كل طلب، وقارن الوقت باللي فات، واتأكد إن الاختبارات لسه بتعدّي.', 'Make the price watcher (week 16) fetch detail pages with httpx.AsyncClient, Semaphore(3) and a small delay per request, compare the time with before, and confirm the tests still pass.'),
      quiz: [
        { q: B('async مفيد لـ:', 'async helps with:'), o: [B('شغل بيستنى شبكة', 'work waiting on the network'), B('حسابات تقيلة', 'heavy calculations'), B('كل حاجة', 'everything')], a: 0, why: B('I/O-bound.', 'I/O-bound work.') },
        { q: B('عشان متبعتش أكتر من 5 طلبات مع بعض:', 'To never send more than 5 requests at once:'), o: ['asyncio.Semaphore(5)', 'time.sleep(5)', 'gather(5)'], a: 0, why: B('حد للتوازي.', 'A concurrency limit.') },
        { q: B('مكتبة sync وعايز توازي من غير إعادة كتابة:', 'A sync library and you want concurrency without a rewrite:'), o: ['ThreadPoolExecutor', 'asyncio.run', B('ProcessPoolExecutor دايمًا', 'always ProcessPoolExecutor')], a: 0, why: B('threads للـ I/O.', 'Threads for I/O.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تحوّل مشروع لمستوى الفرق المحترفة: اختبارات وأنواع وفحص وتنسيق وتوازي محترم، وتعدّي الاختبار.', 'Bring a project to professional-team level: tests, types, linting, formatting and polite concurrency, and pass the test.'),
      review: [
        B('pytest: assert وparametrize وraises وapprox وmarkers.', 'pytest: assert, parametrize, raises, approx and markers.'),
        B('fixtures وtmp_path وmock وmonkeypatch وحقن الوقت والتغطية.', 'fixtures, tmp_path, mocks, monkeypatch, injecting the clock and coverage.'),
        B('الأنواع: generics و| None وTypedDict وProtocol وCallable وmypy.', 'Types: generics, | None, TypedDict, Protocol, Callable and mypy.'),
        B('ruff check/format وpre-commit وقايمة مراجعة الكود.', 'ruff check/format, pre-commit and the code-review checklist.'),
        B('asyncio وgather وhttpx وSemaphore وThreadPoolExecutor وامتى كل واحد.', 'asyncio, gather, httpx, Semaphore, ThreadPoolExecutor and when to use each.')
      ],
      project: B('**خدمة الأدوات بجودة الإنتاج** (`tools_api` من أسبوع 21): (1) 30 اختبار pytest على الأقل (unit للدوال، وintegration للـ API بقاعدة مؤقتة)، بـ parametrize وfixtures، ومن غير شبكة (monkeypatch للـ requests وn8n)، وتغطية 80%+ للـ routers والخدمات. (2) أنواع كاملة وmypy بـ `disallow_untyped_defs` من غير أخطاء. (3) ruff check وformat نضاف، وpre-commit فيه ruff وdetect-private-key. (4) endpoint `/clean/batch` بقى async بيكلّم خدمة تحقق خارجية وهمية بـ Semaphore. (5) README فيه أوامر: `pytest` و`mypy` و`ruff`، ونتيجة التغطية. (هنشغّلهم كلهم أوتوماتيك على GitHub Actions الأسبوع الجاي.)', '**The tools service at production quality** (`tools_api` from week 21): (1) at least 30 pytest tests (unit tests for functions, integration tests for the API on a temporary database), with parametrize and fixtures, and no network (monkeypatch for requests and n8n), with 80%+ coverage of the routers and services. (2) Complete types and mypy with `disallow_untyped_defs` and no errors. (3) Clean ruff check and format, and pre-commit with ruff and detect-private-key. (4) The `/clean/batch` endpoint becomes async, calling a fake external verification service with a Semaphore. (5) A README with the `pytest`, `mypy` and `ruff` commands and the coverage result. (We run them all automatically on GitHub Actions next week.)'),
      test: [
        { q: B('دالة اختبار في pytest لازم اسمها يبدأ بـ:', 'A pytest test function’s name must start with:'), o: ['test_', 'check_', 'assert_'], a: 0, why: B('pytest بيدوّر بالاسم.', 'pytest looks for that name.') },
        { q: B('assert فشلت في pytest:', 'An assert fails in pytest:'), o: [B('بيوريك القيمتين بالتفصيل', 'it shows both values in detail'), B('بيقفل من غير رسالة', 'it quits silently'), B('بيكمّل', 'it continues')], a: 0, why: B('assertion rewriting.', 'Assertion rewriting.') },
        { q: B('fixture اسمها `db` الاختبار بياخدها إزاي؟', 'How does a test receive a fixture named `db`?'), o: [B('معامل اسمه db', 'a parameter called db'), B('import db', 'import db'), B('global db', 'global db')], a: 0, why: B('بالاسم.', 'By name.') },
        { q: B('`Mock().assert_called_once_with(x)` بيتأكد:', '`Mock().assert_called_once_with(x)` checks:'), o: [B('اتنادى مرة واحدة بالقيمة دي', 'it was called once with that value'), B('رجّع x', 'it returned x'), B('مااتناداش', 'it was not called')], a: 0, why: B('سجل النداءات.', 'The call record.') },
        { q: B('`list[dict[str, float]]` معناها:', '`list[dict[str, float]]` means:'), o: [B('قايمة dicts مفاتيحها نصوص وقيمها أرقام', 'a list of dicts with str keys and float values'), B('dict فيه قوايم', 'a dict of lists'), B('خطأ', 'an error')], a: 0, why: B('generics.', 'Generics.') },
        { q: B('mypy قال «Item None has no attribute lower». يعني:', 'mypy says «Item None has no attribute lower». It means:'), o: [B('القيمة ممكن تكون None ومتفحصتش', 'the value may be None and was not checked'), B('mypy غلط', 'mypy is wrong'), B('النص فاضي', 'the text is empty')], a: 0, why: B('افحص None.', 'Check for None.') },
        { q: B('`ruff check --fix`:', '`ruff check --fix`:'), o: [B('بيلاقي مشاكل ويصلّح اللي يقدر', 'finds problems and fixes what it can'), B('بيشغّل الكود', 'runs the code'), B('بيرفعه', 'pushes it')], a: 0, why: B('linter.', 'A linter.') },
        { q: B('commit فيه مفتاح خاص وpre-commit فيه detect-private-key:', 'A commit containing a private key with detect-private-key in pre-commit:'), o: [B('الـ commit بيترفض', 'the commit is refused'), B('بيتعمل عادي', 'it goes through'), B('بيتشفّر', 'it is encrypted')], a: 0, why: B('آخر خط دفاع.', 'The last line of defence.') },
        { q: B('100 طلب API كل واحد ثانية بـ gather:', '100 one-second API calls with gather:'), o: [B('حوالي ثانية (لو مفيش حد)', 'about one second (with no limit)'), B('100 ثانية', '100 seconds'), B('50 ثانية', '50 seconds')], a: 0, why: B('بالتوازي.', 'Concurrently.') },
        { q: B('حساب تقيل على CPU بالتوازي:', 'Heavy CPU work in parallel:'), o: ['ProcessPoolExecutor', 'asyncio', 'ThreadPoolExecutor'], a: 0, why: B('processes للـ CPU.', 'Processes for CPU work.') },
        { q: B('اختبار بيفشل مرة وينجح مرة:', 'A test that sometimes fails and sometimes passes:'), o: ['flaky test', 'unit test', 'smoke test'], a: 0, why: B('غالبًا وقت أو شبكة.', 'Usually time or the network.') },
        { q: B('هدف تغطية معقول للدوال المهمة:', 'A sensible coverage target for important functions:'), o: ['80%+', B('100% لكل حاجة', '100% of everything'), '10%'], a: 0, why: B('مش 100% لكل سطر.', 'Not 100% of every line.') }
      ] }
  ]
};
