// Python week 25 — Advanced functions: decorators, closures and generators.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('دوال متقدمة: decorators وclosures وgenerators', 'Advanced functions: decorators, closures and generators'),
  goal: B('تفهم الدوال في بايثون من جوه: الـ closures والمتغيرات الحرة، وتكتب decorators احترافية بمعاملات، وتبني pipelines بالـ generators وitertools، وتعمل iterators بنفسك، وتستخدم أدوات functools.',
          'Understand Python functions from the inside: closures and free variables, write professional decorators with arguments, build pipelines with generators and itertools, make your own iterators, and use the functools toolbox.'),
  days: [
    { title: B('الـ closures من جوه', 'Closures from the inside'),
      goal: B('تفهم إزاي الدالة بتفتكر متغيرات من بره وتتجنب فخاخها.', 'Understand how a function remembers outside variables, and avoid the traps.'),
      learn: [
        L(B('المتغير الحر', 'The free variable'),
          B('الدالة الداخلية بتفتكر المتغيرات اللي من الدالة الخارجية (**free variables**) حتى بعد ما الخارجية تخلص. ده الـ closure. بتشوف المتغيرات المحفوظة في `__closure__`.', 'An inner function remembers variables from the outer function (**free variables**) even after the outer one has returned. That is the closure. You can see the saved variables in `__closure__`.'),
          'def make_greeter(greeting):\n    def greet(name):\n        return f"{greeting}, {name}!"\n    return greet\n\nhello = make_greeter("Hello")\nahlan = make_greeter("Ahlan")\nprint(hello("Sara"), ahlan("Omar"))\nprint(hello.__code__.co_freevars, hello.__closure__[0].cell_contents)', R),
        L(B('nonlocal', 'nonlocal'),
          B('عشان تغيّر (مش بس تقرا) متغير من الدالة الخارجية، لازم `nonlocal`. من غيره بايثون بيعمل متغير محلي جديد ويطلع `UnboundLocalError`. مثال كلاسيكي: عدّاد.', 'To change (not just read) a variable from the outer function, you need `nonlocal`. Without it Python creates a new local variable and raises `UnboundLocalError`. A classic example: a counter.'),
          'def make_counter():\n    count = 0\n    def step():\n        nonlocal count\n        count += 1\n        return count\n    return step\n\nnext_id = make_counter()\nprint(next_id(), next_id(), next_id())', R),
        L(B('فخ الربط المتأخر', 'The late-binding trap'),
          B('الـ closures في loop بتفتكر **المتغير** مش قيمته: كلهم بيشوفوا آخر قيمة (**late binding**). الحل: قيمة افتراضية `i=i` أو `functools.partial`.', 'Closures made in a loop remember the **variable**, not its value: they all see the last value (**late binding**). The fix: a default value `i=i` or `functools.partial`.'),
          'wrong = [lambda: i for i in range(3)]\nright = [lambda i=i: i for i in range(3)]\nprint([f() for f in wrong])\nprint([f() for f in right])', R)
      ],
      practice: [
        B('اعمل factory بيرجّع دوال ضريبة بنسب مختلفة.', 'Write a factory that returns tax functions with different rates.'),
        B('اعمل عدّاد بـ nonlocal وجرّبه من غيره.', 'Make a counter with nonlocal and try it without.'),
        B('أعد إنتاج فخ الربط المتأخر وصلّحه بطريقتين.', 'Reproduce the late-binding trap and fix it two ways.'),
        B('اطبع `__closure__` لدالة واشرح اللي جواها.', 'Print a function’s `__closure__` and explain its contents.')
      ],
      words: [
        W('free variable', 'متغير بتستخدمه الدالة ومش معرّف جواها', 'a variable a function uses but does not define', 'greeting is a free variable of greet.'),
        W('nonlocal', 'كلمة بتسمح بتعديل متغير من الدالة الخارجية', 'a keyword allowing changes to an outer function’s variable', 'Use nonlocal to update the counter.'),
        W('late binding', 'المتغير بيتقري وقت التشغيل مش وقت الإنشاء', 'a variable read at call time, not creation time', 'Late binding made every lambda return 2.'),
        W('factory function', 'دالة بتصنع وترجّع دوال', 'a function that builds and returns functions', 'make_greeter is a factory function.'),
        W('first-class function', 'الدوال بتتعامل كقيم عادية', 'functions treated as ordinary values', 'Python has first-class functions.')
      ],
      read: ['lib:Python Glossary', { lib: 'Python Tutorial (python.org)', what: B('اقرا «Scopes and Namespaces» في فصل Classes.', 'Read «Scopes and Namespaces» in the Classes chapter.') }],
      challenge: B('اعمل `make_rate_limiter(max_calls)` بـ closure: بيرجّع دالة بتقول True لحد ما توصل الحد في الدقيقة وبعدين False، وجرّبها.', 'Write `make_rate_limiter(max_calls)` with a closure: it returns a function that says True until the per-minute limit is reached, then False — and test it.'),
      quiz: [
        Q(B('عشان تعدّل متغير من الدالة الخارجية:', 'To modify an outer function’s variable:'), [['nonlocal', 'nonlocal'], ['global', 'global'], ['static', 'static']], 0, B('مش global.', 'Not global.')),
        Q(B('`[lambda: i for i in range(3)]` بتطلّع:', '`[lambda: i for i in range(3)]` returns when called:'), [['2, 2, 2', '2, 2, 2'], ['0, 1, 2', '0, 1, 2'], ['خطأ', 'an error']], 0, B('late binding.', 'Late binding.')),
        Q(B('closure:', 'A closure is:'), [['دالة فاكرة متغيرات من مكان تعريفها', 'a function remembering variables from where it was defined'], ['ملف مقفول', 'a closed file'], ['loop', 'a loop']], 0, B('free variables.', 'Free variables.'))
      ] },

    { title: B('decorators احترافية', 'Professional decorators'),
      goal: B('تكتب decorators بتحافظ على اسم الدالة وتاخد معاملات.', 'Write decorators that keep the function’s name and take arguments.'),
      learn: [
        L(B('functools.wraps', 'functools.wraps'),
          B('الـ decorator بيستبدل الدالة بـ wrapper، فاسمها وdocstring بيضيعوا. `@functools.wraps(func)` بينقلهم للـ wrapper — ضروري للتوثيق والـ logging والـ debugging.', 'A decorator replaces the function with a wrapper, so its name and docstring are lost. `@functools.wraps(func)` copies them onto the wrapper — essential for docs, logging and debugging.'),
          'import functools, time\n\ndef timed(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        try:\n            return func(*args, **kwargs)\n        finally:\n            print(f"{func.__name__} took {time.perf_counter() - start:.4f}s")\n    return wrapper\n\n@timed\ndef total(n):\n    """Sum of 0..n-1."""\n    return sum(range(n))\n\nprint(total(100_000), total.__name__, total.__doc__)', R),
        L(B('decorator بمعاملات', 'A decorator with arguments'),
          B('`@retry(times=3)` محتاج طبقة زيادة: **decorator factory** بتاخد المعاملات وترجّع الـ decorator. تلات طبقات: factory ← decorator ← wrapper.', '`@retry(times=3)` needs an extra layer: a **decorator factory** takes the arguments and returns the decorator. Three layers: factory → decorator → wrapper.'),
          'import functools, random\nrandom.seed(3)\n\ndef retry(times=3, exceptions=(ConnectionError,)):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for attempt in range(1, times + 1):\n                try:\n                    return func(*args, **kwargs)\n                except exceptions as e:\n                    print(f"attempt {attempt} failed: {e}")\n            raise RuntimeError(f"{func.__name__} failed {times} times")\n        return wrapper\n    return decorator\n\n@retry(times=4)\ndef flaky():\n    if random.random() < 0.6:\n        raise ConnectionError("network")\n    return "ok"\n\nprint(flaky())', R),
        L(B('ترتيب الـ decorators', 'Stacking order'),
          B('الـ decorators المتراكبة بتتطبّق من **تحت لفوق** وبتشتغل من **فوق لتحت**. `@a @b def f` = `a(b(f))`. حط اللوج بره والـ retry جوه لو عايز تسجّل المحاولة الكاملة مرة واحدة.', 'Stacked decorators are applied **bottom-up** and run **top-down**. `@a @b def f` = `a(b(f))`. Put logging outside and retry inside if you want to log the whole attempt once.'),
          'def tag(name):\n    def deco(f):\n        def w():\n            return f"<{name}>{f()}</{name}>"\n        return w\n    return deco\n\n@tag("b")\n@tag("i")\ndef text():\n    return "hi"\n\nprint(text())', R)
      ],
      practice: [
        B('اكتب decorator بيسجّل المدخلات والمخرجات بـ wraps.', 'Write a decorator that logs inputs and outputs, with wraps.'),
        B('اكتب `@retry(times, delay)` بانتظار بيزيد.', 'Write `@retry(times, delay)` with a growing wait.'),
        B('جرّب ترتيبين لـ decoratorين وقارن الخرج.', 'Try two orders of two decorators and compare the output.'),
        B('شيل wraps وشوف إيه اللي ضاع.', 'Remove wraps and see what is lost.')
      ],
      words: [
        W('functools.wraps', 'بيحافظ على اسم ووثائق الدالة الأصلية', 'keeps the original function’s name and docs', 'Always use functools.wraps in decorators.'),
        W('decorator factory', 'دالة بتاخد معاملات وترجّع decorator', 'a function taking arguments and returning a decorator', 'retry(times=3) is a decorator factory.'),
        W('stacked decorators', 'أكتر من decorator على نفس الدالة', 'several decorators on one function', 'Stacked decorators apply bottom-up.'),
        W('retry decorator', 'decorator بيعيد المحاولة لما يفشل', 'a decorator that retries on failure', 'Wrap the API call in a retry decorator.'),
        W('timing decorator', 'decorator بيقيس وقت التنفيذ', 'a decorator that measures run time', 'The timing decorator printed 0.002s.')
      ],
      read: [{ lib: 'Python HOWTOs', what: B('اقرا «Functional Programming HOWTO».', 'Read the «Functional Programming HOWTO».') }, 'lib:Real Python Tutorials'],
      challenge: B('اكتب مكتبة decorators صغيرة: `@timed`، `@retry(times, delay, exceptions)`، `@log_calls(level)` — كلها بـ wraps وdocstrings، واختبرها على دالة بتنادي httpbin.', 'Write a small decorator library: `@timed`, `@retry(times, delay, exceptions)`, `@log_calls(level)` — all with wraps and docstrings, and test them on a function that calls httpbin.'),
      quiz: [
        Q(B('من غير functools.wraps:', 'Without functools.wraps:'), [['اسم الدالة بيبقى wrapper', 'the function’s name becomes wrapper'], ['الكود مش بيشتغل', 'the code fails'], ['أسرع', 'it is faster']], 0, B('بيضيع الاسم والوثائق.', 'Name and docs are lost.')),
        Q(B('`@retry(times=3)` محتاج:', '`@retry(times=3)` needs:'), [['تلات طبقات دوال', 'three layers of functions'], ['طبقة واحدة', 'one layer'], ['class دايمًا', 'always a class']], 0, B('factory.', 'A factory.')),
        Q(B('`@a` فوق `@b`:', '`@a` above `@b`:'), [['a(b(f))', 'a(b(f))'], ['b(a(f))', 'b(a(f))'], ['a(f) + b(f)', 'a(f) + b(f)']], 0, B('من تحت لفوق.', 'Bottom-up.'))
      ] },

    { title: B('pipelines بالـ generators', 'Pipelines with generators'),
      goal: B('تعالج بيانات كبيرة بسلسلة generators من غير ما تحمّلها كلها.', 'Process big data with a chain of generators without loading it all.'),
      learn: [
        L(B('خط معالجة', 'A processing line'),
          B('**generator pipeline**: كل مرحلة generator بياخد من اللي قبله: قراءة ← تنضيف ← فلترة ← تحويل. ولا مرحلة بتحمّل الملف كله؛ عنصر واحد بيعدّي في المرة. ده مثالي لملفات log أو CSV ضخمة.', 'A **generator pipeline**: each stage is a generator taking from the previous one: read → clean → filter → transform. No stage loads the whole file; one item passes through at a time. Ideal for huge log or CSV files.'),
          'def read(lines):\n    for line in lines:\n        yield line.strip()\n\ndef only_errors(lines):\n    return (l for l in lines if " ERROR " in l)\n\ndef parse(lines):\n    for l in lines:\n        time, _, msg = l.partition(" ERROR ")\n        yield {"time": time, "msg": msg}\n\nlog = ["10:00 INFO start", "10:01 ERROR db timeout ", "10:02 ERROR api 500", "10:03 INFO done"]\nfor row in parse(only_errors(read(log))):\n    print(row)', R),
        L(B('yield from', 'yield from'),
          B('`yield from other()` بيسلّم كل عناصر generator تاني — مفيد لتجميع مصادر أو لـ recursion على بيانات متداخلة (فولدرات جوه فولدرات).', '`yield from other()` passes through every item of another generator — useful for combining sources or for recursion over nested data (folders in folders).'),
          'def walk(node, path=""):\n    for name, child in node.items():\n        full = f"{path}/{name}"\n        if isinstance(child, dict):\n            yield from walk(child, full)\n        else:\n            yield full, child\n\ntree = {"docs": {"a.md": 120, "img": {"logo.png": 4000}}, "main.py": 800}\nfor path, size in walk(tree):\n    print(path, size)', R),
        L(B('itertools', 'itertools'),
          B('`islice` (أول N من غير ما تحمّل الكل)، `chain` (اربط مصادر)، `groupby` (جمّع المتتالي — رتّب الأول!)، و`batched` (بايثون 3.12+: دفعات بحجم ثابت). كلهم lazy.', '`islice` (the first N without loading everything), `chain` (join sources), `groupby` (group consecutive items — sort first!), and `batched` (Python 3.12+: fixed-size batches). All of them are lazy.'),
          'from itertools import islice, chain, groupby\n\ndef numbers():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\nprint(list(islice(numbers(), 5)))\nprint(list(chain("ab", [1, 2])))\norders = sorted([("Giza", 3), ("Cairo", 1), ("Giza", 2)])\nfor city, rows in groupby(orders, key=lambda r: r[0]):\n    print(city, sum(q for _, q in rows))\nitems = list(range(7))\nprint([items[i:i + 3] for i in range(0, len(items), 3)])  # like itertools.batched(items, 3)', R)
      ],
      practice: [
        B('ابني pipeline من 4 مراحل لملف log.', 'Build a 4-stage pipeline for a log file.'),
        B('استخدم yield from لمشي على JSON متداخل.', 'Use yield from to walk nested JSON.'),
        B('خد أول 10 من generator لانهائي بـ islice.', 'Take the first 10 from an infinite generator with islice.'),
        B('جمّع مبيعات بـ groupby بعد الترتيب.', 'Group sales with groupby after sorting.')
      ],
      words: [
        W('generator pipeline', 'سلسلة generators كل واحد بياخد من اللي قبله', 'a chain of generators each feeding the next', 'The generator pipeline reads a 2 GB log.'),
        W('yield from', 'تسليم كل عناصر generator تاني', 'passing through every item of another generator', 'Use yield from in recursive walks.'),
        W('islice', 'أخد جزء من iterator من غير ما تحمّله', 'taking part of an iterator without loading it', 'islice gives the first five items.'),
        W('chain', 'ربط أكتر من iterable ورا بعض', 'joining several iterables end to end', 'chain the two lists of orders.'),
        W('lazy evaluation', 'الحساب بيحصل وقت الحاجة بس', 'computing only when the value is needed', 'Generators use lazy evaluation.')
      ],
      read: [{ lib: 'The Python Standard Library', what: B('اقرا صفحة itertools وأمثلتها.', 'Read the itertools page and its recipes.') }, 'lib:Python Glossary'],
      challenge: B('اعمل pipeline بيقرا ملف CSV كبير (اعمله 100 ألف سطر)، ينضّف، يفلتر، يجمّع حسب المدينة بـ groupby، ويطبع النتيجة — وقيس الذاكرة مقارنة بـ list.', 'Build a pipeline that reads a large CSV (generate 100k lines), cleans, filters, groups by city with groupby and prints the result — and compare memory with a list approach.'),
      quiz: [
        Q(B('groupby محتاج قبله:', 'groupby needs beforehand:'), [['ترتيب بنفس المفتاح', 'sorting by the same key'], ['ولا حاجة', 'nothing'], ['list', 'a list']], 0, B('بيجمّع المتتالي بس.', 'It groups consecutive items only.')),
        Q(B('ميزة الـ pipeline:', 'The pipeline’s advantage:'), [['عنصر واحد في الذاكرة في المرة', 'one item in memory at a time'], ['أقصر كود', 'shortest code'], ['أسرع دايمًا', 'always faster']], 0, B('lazy.', 'Lazy.')),
        Q(B('`yield from walk(child)`:', '`yield from walk(child)`:'), [['يسلّم كل عناصر الـ generator الداخلي', 'passes through all items of the inner generator'], ['يرجّع generator واحد', 'returns one generator'], ['خطأ', 'an error']], 0, B('recursion.', 'Recursion.'))
      ] },

    { title: B('بروتوكول الـ iterator', 'The iterator protocol'),
      goal: B('تعمل كائنات بتشتغل في for زي القوايم.', 'Make objects that work in a for loop like lists.'),
      learn: [
        L(B('iterable وiterator', 'Iterable and iterator'),
          B('**iterable**: حاجة تقدر تلف عليها (فيها `__iter__`). **iterator**: الحاجة اللي بتلف فعلًا (فيها `__next__` وبتطلع **StopIteration** لما تخلص). `for` بتنادي `iter()` ثم `next()` لحد StopIteration.', 'An **iterable** is something you can loop over (it has `__iter__`). An **iterator** is what actually does the looping (it has `__next__` and raises **StopIteration** when finished). `for` calls `iter()` then `next()` until StopIteration.'),
          'nums = [10, 20]\nit = iter(nums)\nprint(next(it), next(it))\ntry:\n    next(it)\nexcept StopIteration:\n    print("done")', R),
        L(B('class قابلة للّف', 'An iterable class'),
          B('أسهل طريقة: `__iter__` تبقى generator (فيها yield). كده كل `for` بيبدأ من الأول. مثال: صفحات API كـ class.', 'The easiest way: make `__iter__` a generator (with yield). Each `for` then starts from the beginning. Example: API pages as a class.'),
          'class Pages:\n    def __init__(self, total, size):\n        self.total, self.size = total, size\n    def __iter__(self):\n        for start in range(0, self.total, self.size):\n            yield list(range(start, min(start + self.size, self.total)))\n\npages = Pages(7, 3)\nfor p in pages:\n    print(p)\nprint(sum(len(p) for p in pages))  # iterates again from the start', R),
        L(B('iterator بيخلص مرة', 'An iterator is used up once'),
          B('الـ iterator بيتستهلك: لو لفّيت عليه مرة، التانية فاضية. generator expression كمان. لو محتاج تلف مرتين، اعمل list أو iterable class.', 'An iterator gets used up: loop over it once and the second loop is empty. A generator expression too. If you need two passes, make a list or an iterable class.'),
          'squares = (n * n for n in range(4))\nprint(list(squares))\nprint(list(squares))  # empty: already consumed', R)
      ],
      practice: [
        B('اعمل class `Countdown(n)` بتشتغل في for.', 'Write a `Countdown(n)` class that works in a for loop.'),
        B('نادي iter وnext يدوي على dict وstring.', 'Call iter and next by hand on a dict and a string.'),
        B('أعد إنتاج مشكلة استهلاك الـ iterator.', 'Reproduce the consumed-iterator problem.'),
        B('اعمل class صفحات API بـ __iter__.', 'Make an API pages class with __iter__.')
      ],
      words: [
        W('iterator protocol', 'قواعد __iter__ و__next__', 'the rules of __iter__ and __next__', 'Implement the iterator protocol for custom loops.'),
        W('__next__', 'دالة بترجّع العنصر الجاي', 'the method returning the next item', '__next__ raises StopIteration at the end.'),
        W('stopiteration', 'الاستثناء اللي بيقول الـ iterator خلص', 'the exception signalling an iterator is finished', 'for stops at StopIteration.'),
        W('__iter__', 'دالة بترجّع iterator', 'the method returning an iterator', 'Make __iter__ a generator.'),
        W('consumed', 'اتستهلك ومبقاش فيه عناصر', 'used up, with no items left', 'The generator was already consumed.')
      ],
      read: [{ lib: 'Python Glossary', what: B('اقرا تعريف iterable وiterator.', 'Read the definitions of iterable and iterator.') }, { lib: 'Classes (tutorial)', what: B('اقرا جزء Iterators وGenerators.', 'Read the Iterators and Generators part.') }],
      challenge: B('اعمل class `CsvRows(path)` بتلف على صفوف ملف CSV كـ dicts بـ __iter__ (generator)، وتقدر تلف عليها مرتين، وتدعم `len()` لو الملف صغير.', 'Write a `CsvRows(path)` class that loops over a CSV’s rows as dicts via __iter__ (a generator), can be looped twice, and supports `len()` for small files.'),
      quiz: [
        Q(B('for بتقف لما:', 'A for loop stops when:'), [['StopIteration', 'StopIteration'], ['None', 'None'], ['False', 'False']], 0, B('آخر العناصر.', 'The end of items.')),
        Q(B('generator expression اتلفّ عليها مرة:', 'A generator expression looped once:'), [['تبقى فاضية', 'is now empty'], ['ترجع من الأول', 'starts over'], ['تطلع خطأ', 'raises an error']], 0, B('اتستهلكت.', 'Consumed.')),
        Q(B('iterable class سهلة:', 'An easy iterable class:'), [['__iter__ فيها yield', '__iter__ with yield'], ['__len__ بس', 'only __len__'], ['__str__', '__str__']], 0, B('generator.', 'A generator.'))
      ] },

    { title: B('صندوق functools', 'The functools toolbox'),
      goal: B('تستخدم أدوات functools الجاهزة بدل ما تعيد اختراعها.', 'Use functools’ ready tools instead of reinventing them.'),
      learn: [
        L(B('cache وlru_cache', 'cache and lru_cache'),
          B('`@functools.cache` (أو `lru_cache(maxsize=…)`) بيحفظ النتايج: نفس المدخلات = نتيجة محفوظة (**memoization**). مثالي للدوال pure الغالية. `cache_info()` بيوريك hits وmisses. متستخدموش مع دوال ليها أثر جانبي.', '`@functools.cache` (or `lru_cache(maxsize=…)`) stores results: the same inputs = a stored result (**memoization**). Ideal for expensive pure functions. `cache_info()` shows hits and misses. Do not use it on functions with side effects.'),
          'from functools import cache\n\n@cache\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(80))\nprint(fib.cache_info())', R),
        L(B('singledispatch', 'singledispatch'),
          B('`@singledispatch` بيخلّي دالة واحدة تتصرف حسب **نوع** أول مدخل — بديل نضيف لـ if isinstance كتير. مفيد في التحويل والتنسيق.', '`@singledispatch` lets one function behave by the **type** of its first argument — a clean replacement for many if isinstance checks. Useful for converting and formatting.'),
          'from functools import singledispatch\nfrom datetime import date\nfrom decimal import Decimal\n\n@singledispatch\ndef to_text(value):\n    return str(value)\n\n@to_text.register\ndef _(value: date):\n    return value.strftime("%d/%m/%Y")\n\n@to_text.register\ndef _(value: Decimal):\n    return f"{value:,.2f} EGP"\n\nfor v in [42, date(2026, 10, 3), Decimal("1250.5")]:\n    print(to_text(v))', R),
        L(B('cached_property', 'cached_property'),
          B('`@cached_property` في class: بيتحسب أول مرة تقراه بس ويتحفظ. مفيد لحاجة غالية زي تحميل إعدادات أو إحصائيات تقرير. وافتكر `partial` (أسبوع 6) و`reduce`.', '`@cached_property` in a class: computed only the first time you read it, then stored. Useful for something expensive such as loading settings or report statistics. And remember `partial` (week 6) and `reduce`.'),
          'from functools import cached_property\n\nclass Report:\n    def __init__(self, rows):\n        self.rows = rows\n    @cached_property\n    def total(self):\n        print("computing…")\n        return sum(self.rows)\n\nr = Report([120, 80, 300])\nprint(r.total)\nprint(r.total)  # no "computing…" the second time', R)
      ],
      practice: [
        B('حط @cache على دالة غالية وقيس الفرق.', 'Put @cache on an expensive function and measure the difference.'),
        B('اعمل singledispatch لتحويل 4 أنواع لنص.', 'Use singledispatch to format 4 types as text.'),
        B('استخدم cached_property في class تقرير.', 'Use cached_property in a report class.'),
        B('اقرا cache_info وفسّر الأرقام.', 'Read cache_info and explain the numbers.')
      ],
      words: [
        W('memoization', 'حفظ نتايج الدالة عشان متتحسبش تاني', 'storing function results to avoid recomputing', 'Memoization made fib(80) instant.'),
        W('cache', 'مخزن مؤقت للنتايج', 'a store of saved results', 'The cache has 81 entries.'),
        W('singledispatch', 'دالة بتتصرف حسب نوع المدخل', 'a function that behaves by argument type', 'singledispatch replaced ten if statements.'),
        W('cached_property', 'خاصية بتتحسب مرة وتتحفظ', 'a property computed once and stored', 'Use cached_property for the totals.'),
        W('cache hit', 'لقى النتيجة محفوظة', 'finding the result already stored', 'Most calls were cache hits.')
      ],
      read: [{ lib: 'The Python Standard Library', what: B('اقرا صفحة functools.', 'Read the functools page.') }, 'lib:Real Python Tutorials'],
      challenge: B('خد دالة بتنادي API بطيء (محاكاة بـ time.sleep) وحسّنها بـ cache بمهلة (احفظ الوقت مع النتيجة)، واعمل singledispatch لتنسيق نتايجها، واكتب doctests.', 'Take a function calling a slow API (simulated with time.sleep), improve it with a time-limited cache (store the time with the result), add singledispatch formatting for its results, and write doctests.'),
      quiz: [
        Q(B('@cache مناسب لـ:', '@cache suits:'), [['دوال pure غالية', 'expensive pure functions'], ['دوال بتبعت إيميل', 'functions that send emails'], ['كل حاجة', 'everything']], 0, B('من غير أثر جانبي.', 'No side effects.')),
        Q(B('singledispatch بيختار حسب:', 'singledispatch chooses by:'), [['نوع أول مدخل', 'the type of the first argument'], ['اسم الدالة', 'the function name'], ['الوقت', 'the time']], 0, B('النوع.', 'The type.')),
        Q(B('cached_property بتتحسب:', 'A cached_property is computed:'), [['أول مرة تتقري بس', 'only the first time it is read'], ['كل مرة', 'every time'], ['أبدًا', 'never']], 0, B('وتتحفظ.', 'Then stored.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('أدوات دوال متقدمة في مكتبة حقيقية.', 'Advanced function tools in a real library.'),
      review: [
        B('الـ closures والمتغيرات الحرة وnonlocal وفخ الربط المتأخر.', 'Closures, free variables, nonlocal and the late-binding trap.'),
        B('decorators بـ wraps وبمعاملات وترتيب التراكب.', 'Decorators with wraps, with arguments, and stacking order.'),
        B('pipelines بالـ generators وyield from وitertools.', 'Generator pipelines, yield from and itertools.'),
        B('بروتوكول الـ iterator والـ iterable classes.', 'The iterator protocol and iterable classes.'),
        B('cache وsingledispatch وcached_property.', 'cache, singledispatch and cached_property.')
      ],
      project: B('ابني مكتبة `automation_utils` صغيرة: decorators (`@retry` بمعاملات، `@timed`، `@log_calls`)، pipeline بيقرا ملفات log ضخمة ويطلّع تقرير أخطاء بـ groupby، class صفحات API قابلة للّف، وتنسيق بـ singledispatch — كلها بـ docstrings وdoctests وREADME.', 'Build a small `automation_utils` library: decorators (`@retry` with arguments, `@timed`, `@log_calls`), a pipeline that reads huge log files and produces an error report with groupby, an iterable API-pages class, and singledispatch formatting — all with docstrings, doctests and a README.'),
      test: [
        Q(B('closure بتفتكر:', 'A closure remembers:'), [['متغيرات مكان تعريفها', 'variables from where it was defined'], ['آخر سطر', 'the last line'], ['ولا حاجة', 'nothing']], 0, B('free variables.', 'Free variables.')),
        Q(B('UnboundLocalError في عدّاد closure:', 'UnboundLocalError in a closure counter:'), [['نسيت nonlocal', 'you forgot nonlocal'], ['نسيت import', 'you forgot an import'], ['خطأ شبكة', 'a network error']], 0, B('عدّل بره.', 'Modifying outside.')),
        Q(B('علاج late binding:', 'A fix for late binding:'), [['قيمة افتراضية i=i', 'a default value i=i'], ['global', 'global'], ['sleep', 'sleep']], 0, B('أو partial.', 'Or partial.')),
        Q(B('functools.wraps بيحافظ على:', 'functools.wraps keeps:'), [['الاسم والـ docstring', 'the name and docstring'], ['السرعة', 'speed'], ['الذاكرة', 'memory']], 0, B('للتوثيق.', 'For docs.')),
        Q(B('decorator factory:', 'A decorator factory:'), [['بتاخد معاملات وترجّع decorator', 'takes arguments and returns a decorator'], ['class', 'a class'], ['ملف', 'a file']], 0, B('تلات طبقات.', 'Three layers.')),
        Q(B('generator pipeline بيوفّر:', 'A generator pipeline saves:'), [['الذاكرة', 'memory'], ['الكود دايمًا', 'always code'], ['الوقت دايمًا', 'always time']], 0, B('lazy.', 'Lazy.')),
        Q(B('islice:', 'islice:'), [['ياخد جزء من iterator', 'takes part of an iterator'], ['يرتّب', 'sorts'], ['يحذف', 'deletes']], 0, B('من غير تحميل.', 'Without loading.')),
        Q(B('groupby من غير ترتيب:', 'groupby without sorting:'), [['بيعمل مجموعات مكررة لنفس المفتاح', 'makes repeated groups for the same key'], ['مثالي', 'is ideal'], ['بيرتّب لوحده', 'sorts by itself']], 0, B('رتّب الأول.', 'Sort first.')),
        Q(B('iterator بيقول خلصت بـ:', 'An iterator signals the end with:'), [['StopIteration', 'StopIteration'], ['return None', 'return None'], ['break', 'break']], 0, B('استثناء.', 'An exception.')),
        Q(B('iterable class بتلف مرتين لو:', 'An iterable class loops twice if:'), [['__iter__ بيرجّع iterator جديد', '__iter__ returns a fresh iterator'], ['__next__ بس', 'only __next__'], ['مستحيل', 'never']], 0, B('generator.', 'A generator.')),
        Q(B('memoization:', 'Memoization:'), [['حفظ نتايج الدالة', 'storing function results'], ['حفظ الكود', 'storing code'], ['تسجيل الدخول', 'logging in']], 0, B('cache.', 'Caching.')),
        Q(B('singledispatch بديل لـ:', 'singledispatch replaces:'), [['if isinstance كتير', 'many if isinstance checks'], ['loops', 'loops'], ['classes', 'classes']], 0, B('حسب النوع.', 'By type.'))
      ] }
  ]
};
