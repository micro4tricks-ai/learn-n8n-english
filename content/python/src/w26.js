// Python week 26 — Context managers, dataclasses and typing in depth.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('Context managers وdataclasses والـ typing بعمق', 'Context managers, dataclasses and typing in depth'),
  goal: B('تكتب كود بايثون متين ومقروء على مستوى المحترفين: context managers بتنضّف لوحدها، dataclasses بتتحقق من نفسها، أنواع دقيقة بـ generics وProtocol، وفحص آلي بـ mypy.',
          'Write robust, readable Python at a professional level: context managers that clean up after themselves, dataclasses that validate themselves, precise types with generics and Protocol, and automatic checking with mypy.'),
  days: [
    { title: B('context managers بإيدك', 'Context managers by hand'),
      goal: B('تكتب with بتاعتك اللي بتنضّف حتى لو حصل خطأ.', 'Write your own with-blocks that clean up even when errors happen.'),
      learn: [
        L(B('__enter__ و__exit__', '__enter__ and __exit__'),
          B('`with x as y:` بتنادي `x.__enter__()` (والنتيجة تبقى y) وفي الآخر `x.__exit__(exc_type, exc, tb)` — **دايمًا**، حتى لو حصل خطأ. لو `__exit__` رجّعت True، الخطأ بيتبلع (نادرًا ما ده اللي عايزه).', '`with x as y:` calls `x.__enter__()` (its result becomes y) and at the end `x.__exit__(exc_type, exc, tb)` — **always**, even when an error happens. If `__exit__` returns True, the error is swallowed (rarely what you want).'),
          'import time\n\nclass Timer:\n    def __enter__(self):\n        self.start = time.perf_counter()\n        return self\n    def __exit__(self, exc_type, exc, tb):\n        self.seconds = time.perf_counter() - self.start\n        print(f"took {self.seconds:.4f}s", "(with error)" if exc_type else "")\n        return False  # do not hide errors\n\nwith Timer():\n    sum(range(200_000))\ntry:\n    with Timer():\n        1 / 0\nexcept ZeroDivisionError:\n    print("error still raised")', R),
        L(B('@contextmanager', '@contextmanager'),
          B('أسهل: دالة generator بـ `@contextlib.contextmanager`: اللي قبل `yield` = enter، واللي بعده (في `finally`) = exit. مثالي لتغيير مؤقت (فولدر، إعداد) وترجيعه.', 'Easier: a generator function with `@contextlib.contextmanager`: what comes before `yield` = enter, and what comes after (in `finally`) = exit. Ideal for a temporary change (folder, setting) and restoring it.'),
          'import os, tempfile\nfrom contextlib import contextmanager\n\n@contextmanager\ndef working_dir(path):\n    old = os.getcwd()\n    os.chdir(path)\n    try:\n        yield path\n    finally:\n        os.chdir(old)\n\nwith tempfile.TemporaryDirectory() as tmp:\n    with working_dir(tmp):\n        open("report.txt", "w").write("ok")\n        print(sorted(os.listdir(".")))\n    print("back:", os.getcwd() != tmp)', R),
        L(B('suppress وExitStack', 'suppress and ExitStack'),
          B('`suppress(FileNotFoundError)` بيتجاهل خطأ معيّن بوضوح (بدل try/except/pass). و`ExitStack` بيدير عدد متغير من الـ context managers (مثلًا تفتح 10 ملفات حسب القايمة) ويقفلهم كلهم.', '`suppress(FileNotFoundError)` ignores a specific error explicitly (instead of try/except/pass). `ExitStack` manages a variable number of context managers (e.g. opening 10 files from a list) and closes them all.'),
          'import os\nfrom contextlib import suppress, ExitStack\n\nwith suppress(FileNotFoundError):\n    os.remove("does-not-exist.tmp")\nprint("no crash")\n\nnames = ["a.txt", "b.txt", "c.txt"]\nwith ExitStack() as stack:\n    files = [stack.enter_context(open(n, "w")) for n in names]\n    for f in files:\n        f.write("hello")\nprint(all(f.closed for f in files))', R)
      ],
      practice: [
        B('اكتب context manager بيقيس الوقت ويسجّله في log.', 'Write a context manager that times a block and logs it.'),
        B('اكتب `@contextmanager` بيغيّر متغير بيئة مؤقتًا.', 'Write a `@contextmanager` that temporarily changes an environment variable.'),
        B('استبدل try/except/pass عندك بـ suppress.', 'Replace a try/except/pass of yours with suppress.'),
        B('افتح عدد متغير من الملفات بـ ExitStack.', 'Open a variable number of files with ExitStack.')
      ],
      words: [
        W('__enter__', 'الدالة اللي بتتنادي في أول with', 'the method called at the start of a with block', '__enter__ returns the resource.'),
        W('__exit__', 'الدالة اللي بتتنادي في آخر with حتى مع الخطأ', 'the method called at the end of with, even on error', '__exit__ closes the connection.'),
        W('contextmanager', 'decorator بيحوّل generator لـ context manager', 'a decorator turning a generator into a context manager', 'Use contextmanager for quick helpers.'),
        W('suppress', 'تجاهل خطأ معيّن بوضوح', 'explicitly ignoring a specific error', 'suppress(FileNotFoundError) when deleting temp files.'),
        W('exitstack', 'إدارة عدد متغير من context managers', 'managing a variable number of context managers', 'ExitStack closes every opened file.')
      ],
      read: [{ lib: 'The Python Standard Library', what: B('اقرا صفحة contextlib.', 'Read the contextlib page.') }, 'lib:Real Python Tutorials'],
      challenge: B('اكتب `@contextmanager` اسمه `transaction(conn)` لـ sqlite3: يعمل commit لو كله تمام وrollback لو حصل خطأ، وجرّبه بحالتين.', 'Write a `@contextmanager` called `transaction(conn)` for sqlite3: commit if all is well, roll back on error — and test both cases.'),
      quiz: [
        Q(B('__exit__ بتتنادي:', '__exit__ is called:'), [['دايمًا، حتى مع الخطأ', 'always, even on error'], ['لو مفيش خطأ بس', 'only without errors'], ['أبدًا', 'never']], 0, B('ده الهدف.', 'That is the point.')),
        Q(B('في @contextmanager الكود بعد yield:', 'In @contextmanager the code after yield:'), [['بيتنفّذ كـ exit (في finally)', 'runs as exit (in finally)'], ['مش بيتنفّذ', 'never runs'], ['قبل الـ with', 'runs before with']], 0, B('التنضيف.', 'Clean-up.')),
        Q(B('suppress أحسن من:', 'suppress is better than:'), [['try/except/pass', 'try/except/pass'], ['if', 'if'], ['for', 'for']], 0, B('أوضح.', 'Clearer.'))
      ] },

    { title: B('dataclasses متقدمة', 'Advanced dataclasses'),
      goal: B('تعمل كائنات بيانات آمنة وسريعة وبتتحقق من نفسها.', 'Build data objects that are safe, fast and self-validating.'),
      learn: [
        L(B('frozen وsame-value', 'frozen and value equality'),
          B('`@dataclass(frozen=True)` بيمنع التعديل بعد الإنشاء (**immutable**) — آمن للمشاركة وينفع يبقى مفتاح dict أو في set. لو عايز «تعدّل»، اعمل نسخة بـ `dataclasses.replace`.', '`@dataclass(frozen=True)` forbids changes after creation (immutable) — safe to share, and usable as a dict key or in a set. To «change» it, make a copy with `dataclasses.replace`.'),
          'from dataclasses import dataclass, replace\n\n@dataclass(frozen=True)\nclass Money:\n    amount: int  # piasters\n    currency: str = "EGP"\n\nprice = Money(15000)\ntry:\n    price.amount = 1\nexcept Exception as e:\n    print(type(e).__name__)\nprint(replace(price, amount=20000), {price, Money(15000)})', R),
        L(B('__post_init__ للتحقق', '__post_init__ for validation'),
          B('`__post_init__` بتتنادي بعد الإنشاء — مكان التحقق والتنضيف: «الكمية موجبة»، «الإيميل lowercase». كده مستحيل يتعمل كائن غلط.', '`__post_init__` runs after creation — the place for checks and clean-up: «quantity is positive», «email is lowercase». It then becomes impossible to create an invalid object.'),
          'from dataclasses import dataclass, field\n\n@dataclass\nclass OrderLine:\n    sku: str\n    qty: int\n    price: int\n    tags: list[str] = field(default_factory=list)\n\n    def __post_init__(self):\n        self.sku = self.sku.strip().upper()\n        if self.qty <= 0:\n            raise ValueError(f"qty must be positive, got {self.qty}")\n\nprint(OrderLine(" tea-250 ", 2, 1500))\ntry:\n    OrderLine("TEA", 0, 1500)\nexcept ValueError as e:\n    print("Error:", e)', R),
        L(B('slots وorder', 'slots and order'),
          B('`slots=True` (بايثون 3.10+) بيقلل الذاكرة ويمنع إضافة attributes بالغلط (`line.qyt = 3` يطلع خطأ). و`order=True` بيضيف `<` و`>` حسب ترتيب الحقول — مفيد للترتيب.', '`slots=True` (Python 3.10+) reduces memory and prevents adding attributes by mistake (`line.qyt = 3` raises an error). `order=True` adds `<` and `>` by field order — useful for sorting.'),
          'from dataclasses import dataclass\n\n@dataclass(slots=True, order=True)\nclass Task:\n    priority: int\n    name: str\n\ntasks = sorted([Task(3, "report"), Task(1, "invoice"), Task(2, "backup")])\nprint([t.name for t in tasks])\ntry:\n    tasks[0].prioirty = 5\nexcept AttributeError as e:\n    print("typo caught:", e)', R)
      ],
      practice: [
        B('اعمل dataclass frozen للفلوس وجرّب تعديله.', 'Make a frozen dataclass for money and try changing it.'),
        B('ضيف __post_init__ بيتحقق من 3 شروط.', 'Add a __post_init__ that checks 3 conditions.'),
        B('استخدم slots=True واعمل typo في اسم attribute.', 'Use slots=True and make a typo in an attribute name.'),
        B('رتّب مهام بـ order=True.', 'Sort tasks with order=True.')
      ],
      words: [
        W('frozen', 'dataclass مينفعش يتعدّل بعد الإنشاء', 'a dataclass that cannot change after creation', 'Use frozen=True for value objects.'),
        W('__post_init__', 'دالة بتشتغل بعد إنشاء الـ dataclass', 'a method running after a dataclass is created', 'Validate inputs in __post_init__.'),
        W('slots', 'تخزين attributes ثابت أوفر في الذاكرة', 'a fixed, memory-saving attribute layout', 'slots=True catches attribute typos.'),
        W('value object', 'كائن بيتعرّف بقيمته مش هويته', 'an object defined by its value, not its identity', 'Money is a value object.'),
        W('dataclasses.replace', 'نسخة من dataclass بقيم متغيّرة', 'a copy of a dataclass with some values changed', 'Use dataclasses.replace to change a frozen object.')
      ],
      read: [{ lib: 'dataclasses', what: B('اقرا frozen وslots و__post_init__.', 'Read about frozen, slots and __post_init__.') }],
      challenge: B('صمّم نموذج طلب بـ dataclasses: `Money` (frozen)، `OrderLine` (تحقق في __post_init__)، `Order` (slots، مجموع محسوب)، وجرّب 6 حالات غلط تتمسك.', 'Design an order model with dataclasses: `Money` (frozen), `OrderLine` (checks in __post_init__), `Order` (slots, a computed total), and test 6 invalid cases that get caught.'),
      quiz: [
        Q(B('frozen=True بيخلّي الكائن:', 'frozen=True makes an object:'), [['مينفعش يتعدّل', 'unchangeable'], ['أسرع دايمًا', 'always faster'], ['مخفي', 'hidden']], 0, B('immutable.', 'Immutable.')),
        Q(B('التحقق من المدخلات مكانه:', 'Input checks belong in:'), [['__post_init__', '__post_init__'], ['__str__', '__str__'], ['__del__', '__del__']], 0, B('بعد الإنشاء.', 'After creation.')),
        Q(B('slots=True بيمسك:', 'slots=True catches:'), [['أخطاء كتابة أسماء attributes', 'attribute name typos'], ['أخطاء الشبكة', 'network errors'], ['القسمة على صفر', 'division by zero']], 0, B('مفيش attributes جديدة.', 'No new attributes.'))
      ] },

    { title: B('أنواع دقيقة', 'Precise types'),
      goal: B('تكتب type hints بتوصف الكود بدقة وتمسك أخطاء.', 'Write type hints that describe the code precisely and catch mistakes.'),
      learn: [
        L(B('Union وNone', 'Union and None'),
          B('`str | None` (**union type**) يعني ممكن ترجع نص أو None — وده بيجبرك تتعامل مع الحالتين. استخدمها بدل ما ترجع "" أو -1 كعلامة. وفي الدوال: `def find(phone: str) -> Customer | None:`.', '`str | None` (a **union type**) means it may return text or None — and that forces you to handle both cases. Use it instead of returning "" or -1 as a signal. In functions: `def find(phone: str) -> Customer | None:`.'),
          'def find_email(customers: dict[str, str], name: str) -> str | None:\n    return customers.get(name)\n\nemail = find_email({"sara": "s@x.com"}, "omar")\nif email is None:\n    print("not found")\nelse:\n    print(email.upper())', R),
        L(B('Generics', 'Generics'),
          B('**generic** = نوع بيحافظ على نوع اللي جواه: `def first(items: list[T]) -> T` يعني لو ادّيته list[int] يرجّع int. بايثون 3.12 عندها شكل مختصر: `def first[T](items: list[T]) -> T:`. وفي الأقدم `TypeVar`.', 'A **generic** keeps the type of what it contains: `def first(items: list[T]) -> T` means give it list[int] and it returns int. Python 3.12 has a short form: `def first[T](items: list[T]) -> T:`. Older versions use `TypeVar`.'),
          'from typing import TypeVar\nT = TypeVar("T")\n\ndef first(items: list[T], default: T) -> T:\n    return items[0] if items else default\n\nprint(first([3, 1, 2], 0), first([], "none"))', R),
        L(B('Protocol: الكتابة بالشكل', 'Protocol: typing by shape'),
          B('**structural typing** بـ `Protocol`: «أي حاجة فيها `send(text) -> bool` تنفع» من غير وراثة. مثالي للـ notifiers: Telegram وEmail وFake للاختبار — كلهم بيطابقوا نفس الـ Protocol.', '**Structural typing** with `Protocol`: «anything with `send(text) -> bool` will do», without inheritance. Ideal for notifiers: Telegram, Email and a Fake for tests — all match the same Protocol.'),
          'from typing import Protocol\n\nclass Notifier(Protocol):\n    def send(self, text: str) -> bool: ...\n\nclass FakeNotifier:\n    def __init__(self):\n        self.sent: list[str] = []\n    def send(self, text: str) -> bool:\n        self.sent.append(text)\n        return True\n\ndef alert(n: Notifier, msg: str) -> None:\n    n.send(f"[ALERT] {msg}")\n\nfake = FakeNotifier()\nalert(fake, "queue backlog 120")\nprint(fake.sent)', R)
      ],
      practice: [
        B('ضيف `| None` لـ 3 دوال بترجّع قيمة ممكن متبقاش موجودة.', 'Add `| None` to 3 functions whose result may be missing.'),
        B('اكتب دالة generic بـ TypeVar.', 'Write a generic function with TypeVar.'),
        B('اعمل Protocol لـ Notifier وclassين بيطابقوه.', 'Write a Notifier Protocol and two classes matching it.'),
        B('بدّل قيم «علامة» (-1، "") بـ None.', 'Replace «signal» values (-1, "") with None.')
      ],
      words: [
        W('union type', 'نوع ممكن يبقى واحد من أكتر من نوع', 'a type that may be one of several types', 'str | None is a union type.'),
        W('generic', 'نوع بيحافظ على نوع اللي جواه', 'a type that preserves the type of its contents', 'first() is generic over T.'),
        W('typevar', 'متغير نوع للـ generics', 'a type variable for generics', 'Declare T with TypeVar.'),
        W('structural typing', 'التوافق بالشكل (الدوال) مش بالوراثة', 'compatibility by shape (methods), not inheritance', 'Protocol gives structural typing.'),
        W('optional value', 'قيمة ممكن تكون None', 'a value that may be None', 'Handle the optional value before using it.')
      ],
      read: ['lib:typing — Support for type hints', { lib: 'mypy documentation', what: B('اقرا «Protocols and structural subtyping».', 'Read «Protocols and structural subtyping».') }],
      challenge: B('اكتب طبقة إشعارات typed: `Notifier` Protocol، تلات تطبيقات (Telegram حقيقي اختياري، Email، Fake)، ودالة generic `retry_call[T]` بترجّع نفس نوع الدالة.', 'Write a typed notifications layer: a `Notifier` Protocol, three implementations (optional real Telegram, Email, Fake), and a generic `retry_call[T]` returning the wrapped function’s type.'),
      quiz: [
        Q(B('`-> str | None` بيقول:', '`-> str | None` says:'), [['ممكن ترجع نص أو None', 'may return text or None'], ['دايمًا نص', 'always text'], ['خطأ', 'an error']], 0, B('اتعامل مع الاتنين.', 'Handle both.')),
        Q(B('Protocol بيشتغل بـ:', 'Protocol works by:'), [['الشكل (الدوال الموجودة)', 'shape (the methods present)'], ['الوراثة بس', 'inheritance only'], ['الاسم', 'the name']], 0, B('structural.', 'Structural.')),
        Q(B('generic `first(list[int])` بيرجّع:', 'generic `first(list[int])` returns:'), [['int', 'int'], ['list', 'list'], ['Any دايمًا', 'always Any']], 0, B('بيحافظ على النوع.', 'It keeps the type.'))
      ] },

    { title: B('mypy في الشغل', 'mypy at work'),
      goal: B('تشغّل type checker يمسك أخطاء قبل ما الكود يشتغل.', 'Run a type checker that catches mistakes before the code runs.'),
      learn: [
        L(B('أول تشغيل', 'The first run'),
          B('**type checker** زي mypy بيقرا الـ hints ويطلّع أخطاء من غير ما يشغّل الكود: «Argument 1 has incompatible type», «Item None has no attribute». ابدأ بـ `mypy src/`، وبعدين ضيفه للـ CI.', 'A **type checker** such as mypy reads the hints and reports mistakes without running the code: «Argument 1 has incompatible type», «Item None has no attribute». Start with `mypy src/`, then add it to CI.'),
          '$ mypy app/\napp/orders.py:14: error: Item "None" of "Customer | None" has no attribute "email"  [union-attr]\napp/orders.py:22: error: Argument 1 to "send" has incompatible type "int"; expected "str"  [arg-type]\nFound 2 errors in 1 file', T),
        L(B('خطوة بخطوة', 'Step by step'),
          B('**gradual typing**: مش لازم تكتب أنواع لكل المشروع مرة واحدة. ابدأ بالأجزاء المهمة (الخدمات والنماذج)، وmypy بيتجاهل الدوال اللي من غير hints افتراضيًا. وبعدين شدّد الإعدادات تدريجيًا (`--strict` في الآخر).', '**Gradual typing**: you need not type the whole project at once. Start with the important parts (services and models); by default mypy skips functions without hints. Then tighten the settings gradually (`--strict` at the end).'),
          '# pyproject.toml\n[tool.mypy]\npython_version = "3.12"\nwarn_unused_ignores = true\n[[tool.mypy.overrides]]\nmodule = "app.services.*"\ndisallow_untyped_defs = true', T),
        L(B('reveal_type و# type: ignore', 'reveal_type and # type: ignore'),
          B('`reveal_type(x)` بيخلّي mypy يقولك هو فاهم x نوعها إيه — ممتاز للتعلّم والتشخيص. و`# type: ignore[code]` لما متأكد إن mypy غلطان — بس بكود الخطأ وتعليق ليه، ومتكترش منها.', '`reveal_type(x)` makes mypy tell you what type it thinks x is — great for learning and diagnosing. `# type: ignore[code]` is for when you are sure mypy is wrong — but with the error code and a comment why, and sparingly.'),
          'customer = find("010…")\nreveal_type(customer)   # note: Revealed type is "Customer | None"\nlegacy.call(x)  # type: ignore[no-untyped-call]  # old library without stubs', T)
      ],
      practice: [
        B('شغّل mypy على مشروع بايثون من الرحلة.', 'Run mypy on a Python project from the journey.'),
        B('صلّح أول 5 أخطاء واكتب كل واحد كان معناه إيه.', 'Fix the first 5 errors and write what each meant.'),
        B('استخدم reveal_type على 3 متغيرات.', 'Use reveal_type on 3 variables.'),
        B('ضيف mypy لـ GitHub Actions.', 'Add mypy to GitHub Actions.')
      ],
      words: [
        W('type checker', 'أداة بتفحص الأنواع من غير تشغيل', 'a tool that checks types without running code', 'Run the type checker in CI.'),
        W('gradual typing', 'إضافة الأنواع للمشروع تدريجيًا', 'adding types to a project step by step', 'Gradual typing starts with the services.'),
        W('reveal_type', 'أداة بتعرض النوع اللي mypy فهمه', 'a helper showing the type mypy inferred', 'reveal_type showed Customer | None.'),
        W('type: ignore', 'تعليق بيخلي mypy يتجاهل سطر', 'a comment telling mypy to skip a line', 'Add the error code to every type: ignore.'),
        W('strict mode', 'إعداد صارم بيطلب أنواع لكل حاجة', 'a strict setting requiring types everywhere', 'Turn on strict mode for new modules.')
      ],
      read: ['lib:mypy documentation', 'lib:GitHub Actions: Building and testing Python'],
      challenge: B('خلّي مشروع بايثون من الرحلة «typed»: hints للنماذج والخدمات، mypy من غير أخطاء على الأجزاء دي، إعدادات في pyproject، وmypy في CI.', 'Make a Python journey project «typed»: hints for models and services, mypy clean on those parts, settings in pyproject, and mypy in CI.'),
      quiz: [
        Q(B('mypy بيلاقي الأخطاء:', 'mypy finds mistakes:'), [['من غير ما يشغّل الكود', 'without running the code'], ['وقت التشغيل بس', 'only at run time'], ['في الإنتاج', 'in production']], 0, B('ثابت.', 'Statically.')),
        Q(B('gradual typing:', 'Gradual typing:'), [['تبدأ بالأجزاء المهمة', 'start with the important parts'], ['كل حاجة مرة واحدة', 'everything at once'], ['من غير أنواع', 'no types']], 0, B('تدريجي.', 'Gradual.')),
        Q(B('`# type: ignore` كويس:', 'A good `# type: ignore`:'), [['بكود الخطأ وسبب', 'with the error code and a reason'], ['في كل سطر', 'on every line'], ['من غير سبب', 'with no reason']], 0, B('نادرًا.', 'Rarely.'))
      ] },

    { title: B('حدود البيانات: Pydantic وdataclasses وEnum', 'Data boundaries: Pydantic, dataclasses and Enum'),
      goal: B('تعرف تستخدم إيه فين: تحقق عند الحدود، وأنواع خفيفة جوه.', 'Know which to use where: validation at the edges, light types inside.'),
      learn: [
        L(B('التحقق عند الحدود', 'Validate at the edges'),
          B('البيانات الجاية من بره (API، webhook، ملف) ممكن تبقى أي حاجة: اتحقق منها عند **validation boundary** بـ Pydantic (أنواع، تحويل، رسائل خطأ واضحة). وجوه البرنامج استخدم dataclasses خفيفة اتأكدت إنها سليمة.', 'Data from outside (an API, a webhook, a file) can be anything: validate it at the **validation boundary** with Pydantic (types, conversion, clear error messages). Inside the program use light dataclasses you know are valid.'),
          'webhook JSON → Pydantic model (validate, convert "1500" → 1500) → domain dataclass → business logic', T),
        L(B('Enum للقيم الثابتة', 'Enum for fixed values'),
          B('حالات زي `new/paid/shipped` متتكتبش نصوص في 20 مكان. `class Status(StrEnum)` بيمنع الأخطاء الإملائية، وبيتحوّل لنص عادي في JSON. والـ match بيشتغل معاه كويس.', 'Statuses like `new/paid/shipped` should not be strings typed in 20 places. `class Status(StrEnum)` prevents typos, and turns into a plain string in JSON. match works well with it.'),
          'from enum import StrEnum\n\nclass Status(StrEnum):\n    NEW = "new"\n    PAID = "paid"\n    SHIPPED = "shipped"\n\ns = Status("paid")\nprint(s, s == "paid", [x.value for x in Status])\ntry:\n    Status("payed")\nexcept ValueError as e:\n    print("typo caught:", e)', R),
        L(B('من الحد للداخل', 'From the edge inwards'),
          B('مثال كامل بالمكتبة القياسية: دالة `parse_order(raw: dict) -> Order` بتتحقق وتحوّل (زي ما Pydantic بيعمل)، وترجّع dataclass نضيفة أو ترمي خطأ واضح بكل المشاكل مرة واحدة.', 'A full example with the standard library: a `parse_order(raw: dict) -> Order` function validates and converts (as Pydantic would), returning a clean dataclass or raising a clear error listing every problem at once.'),
          'from dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Order:\n    id: int\n    total: int\n    phone: str\n\ndef parse_order(raw: dict) -> Order:\n    problems = []\n    try:\n        oid = int(raw.get("id", ""))\n    except ValueError:\n        problems.append("id must be a number"); oid = 0\n    total = raw.get("total")\n    if not isinstance(total, (int, float)) or total < 0:\n        problems.append("total must be a positive number")\n    phone = str(raw.get("phone", "")).strip()\n    if not phone.startswith("01") or len(phone) != 11:\n        problems.append("phone must look like 01xxxxxxxxx")\n    if problems:\n        raise ValueError("; ".join(problems))\n    return Order(oid, int(total), phone)\n\nprint(parse_order({"id": "7", "total": 300, "phone": "01012345678"}))\ntry:\n    parse_order({"id": "x", "total": -5, "phone": "123"})\nexcept ValueError as e:\n    print("Invalid:", e)', R)
      ],
      practice: [
        B('حدد في مشروعك فين حدود البيانات (كل مدخل من بره).', 'Mark where your project’s data boundaries are (every outside input).'),
        B('اعمل StrEnum للحالات واستبدل النصوص.', 'Create a StrEnum for statuses and replace the strings.'),
        B('اكتب parse function بترجّع كل المشاكل مرة واحدة.', 'Write a parse function that reports all problems at once.'),
        B('لو Pydantic متثبتة: أعد نفس التحقق بـ BaseModel وقارن.', 'If Pydantic is installed: redo the same validation with BaseModel and compare.')
      ],
      words: [
        W('validation boundary', 'المكان اللي البيانات الخارجية بتتحقق فيه', 'the place where outside data is validated', 'The webhook handler is our validation boundary.'),
        W('domain model', 'كائنات تمثّل مفاهيم البيزنس', 'objects representing business concepts', 'Order is a domain model.'),
        W('parse, don\'t validate', 'حوّل البيانات لنوع موثوق بدل الفحص المتكرر', 'turn data into a trusted type instead of re-checking it', 'Parse, don’t validate: return an Order.'),
        W('enum member', 'قيمة واحدة من Enum', 'one value of an Enum', 'Status.PAID is an enum member.'),
        W('typo-safe', 'محمي من أخطاء الكتابة', 'protected against spelling mistakes', 'StrEnum makes statuses typo-safe.')
      ],
      read: ['lib:Pydantic documentation', { lib: 'The Python Standard Library', what: B('اقرا صفحة enum.', 'Read the enum page.') }],
      challenge: B('اعمل طبقة حدود لـ webhook الطلبات: parse بيرجّع dataclass أو كل المشاكل، Status كـ StrEnum، وmypy نضيف — واختبرها بـ 8 payloads (سليمة وغلط).', 'Build an edge layer for the orders webhook: a parser returning a dataclass or every problem, Status as a StrEnum, and clean mypy — test it with 8 payloads (valid and invalid).'),
      quiz: [
        Q(B('البيانات الخارجية بتتحقق:', 'Outside data is validated:'), [['عند الحدود', 'at the boundary'], ['في كل دالة', 'in every function'], ['مش لازم', 'never']], 0, B('مرة واحدة.', 'Once.')),
        Q(B('StrEnum بيمنع:', 'StrEnum prevents:'), [['أخطاء كتابة الحالات', 'typos in statuses'], ['الأخطاء الشبكية', 'network errors'], ['الذاكرة', 'memory use']], 0, B('typo-safe.', 'Typo-safe.')),
        Q(B('parse function كويسة بترجّع:', 'A good parse function returns:'), [['كائن نضيف أو كل المشاكل', 'a clean object or every problem'], ['أول مشكلة بس', 'only the first problem'], ['None دايمًا', 'always None']], 0, B('رسالة كاملة.', 'A full message.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('كود متين: موارد بتتنضف، بيانات بتتحقق، وأنواع بتتفحص.', 'Robust code: resources cleaned up, data validated, types checked.'),
      review: [
        B('__enter__/__exit__، @contextmanager، suppress وExitStack.', '__enter__/__exit__, @contextmanager, suppress and ExitStack.'),
        B('dataclasses: frozen، __post_init__، slots وorder.', 'Dataclasses: frozen, __post_init__, slots and order.'),
        B('| None، generics، وProtocol.', '| None, generics and Protocol.'),
        B('mypy والـ gradual typing وreveal_type.', 'mypy, gradual typing and reveal_type.'),
        B('التحقق عند الحدود وEnum والـ domain models.', 'Validation at the edges, Enum and domain models.')
      ],
      project: B('ابني «نواة طلبات» typed: parse عند الحد، dataclasses (Money frozen، OrderLine بتحقق، Order بـ slots)، Status كـ StrEnum، Notifier Protocol بتلات تطبيقات، context manager للـ transaction في sqlite3، وmypy strict على الحزمة كلها في CI — مع اختبارات pytest.', 'Build a typed «orders core»: parsing at the edge, dataclasses (frozen Money, validated OrderLine, slotted Order), Status as a StrEnum, a Notifier Protocol with three implementations, a sqlite3 transaction context manager, and mypy strict on the whole package in CI — with pytest tests.'),
      test: [
        Q(B('with بتضمن:', 'with guarantees:'), [['التنضيف حتى مع الخطأ', 'clean-up even on error'], ['السرعة', 'speed'], ['عدم وجود أخطاء', 'no errors']], 0, B('__exit__.', '__exit__.')),
        Q(B('__exit__ رجّعت True:', '__exit__ returned True:'), [['الخطأ اتبلع', 'the error was swallowed'], ['الخطأ اتضاعف', 'the error doubled'], ['مفيش أثر', 'no effect']], 0, B('نادرًا تعوزه.', 'Rarely wanted.')),
        Q(B('ExitStack لـ:', 'ExitStack is for:'), [['عدد متغير من context managers', 'a variable number of context managers'], ['ملف واحد', 'one file'], ['الأخطاء الشبكية', 'network errors']], 0, B('ديناميكي.', 'Dynamic.')),
        Q(B('تغيير dataclass frozen:', 'Changing a frozen dataclass:'), [['dataclasses.replace', 'dataclasses.replace'], ['setattr', 'setattr'], ['مستحيل تمامًا', 'completely impossible']], 0, B('نسخة.', 'A copy.')),
        Q(B('slots=True:', 'slots=True:'), [['أقل ذاكرة ومفيش attributes جديدة', 'less memory and no new attributes'], ['أبطأ', 'slower'], ['frozen', 'frozen']], 0, B('مسك typos.', 'Catches typos.')),
        Q(B('`Customer | None` محتاج:', '`Customer | None` requires:'), [['التعامل مع None', 'handling None'], ['ولا حاجة', 'nothing'], ['try دايمًا', 'always try']], 0, B('حالتين.', 'Two cases.')),
        Q(B('TypeVar لـ:', 'TypeVar is for:'), [['generics', 'generics'], ['المتغيرات العادية', 'normal variables'], ['البيئة', 'the environment']], 0, B('نوع متغير.', 'A type variable.')),
        Q(B('Protocol بيسمح بـ:', 'Protocol allows:'), [['توافق من غير وراثة', 'compatibility without inheritance'], ['وراثة متعددة إجبارية', 'forced multiple inheritance'], ['أسرع تشغيل', 'faster running']], 0, B('بالشكل.', 'By shape.')),
        Q(B('mypy مكانه كمان:', 'mypy also belongs in:'), [['CI', 'CI'], ['الإنتاج بس', 'production only'], ['مفيش', 'nowhere']], 0, B('كل PR.', 'Every PR.')),
        Q(B('reveal_type:', 'reveal_type:'), [['بيعرض النوع اللي mypy فهمه', 'shows the type mypy inferred'], ['بيغيّر النوع', 'changes the type'], ['بيشغّل الكود', 'runs the code']], 0, B('تشخيص.', 'Diagnosis.')),
        Q(B('Pydantic مكانه المثالي:', 'Pydantic’s ideal place:'), [['حدود البيانات الخارجية', 'outside data boundaries'], ['كل loop', 'every loop'], ['اللوج', 'logging']], 0, B('validation boundary.', 'The validation boundary.')),
        Q(B('Status("payed") مع StrEnum:', 'Status("payed") with a StrEnum:'), [['ValueError', 'a ValueError'], ['حالة جديدة', 'a new status'], ['None', 'None']], 0, B('typo اتمسك.', 'Typo caught.'))
      ] }
  ]
};
