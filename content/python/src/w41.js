// Python week 41 — Performance and profiling.
// Timing, profiling, data-structure, memory, SQL and cache examples run with the standard library
// (numbers differ per machine and in the browser); py-spy and multiprocessing are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('الأداء والـ profiling', 'Performance and profiling'),
  goal: B('تسرّع كود Python بالأرقام مش بالإحساس: تقيس صح، تلاقي الجزء البطيء بالـ profiler، تختار الخوارزمية وهيكل البيانات الصح، تقلل الذاكرة، وتحل مشاكل النظام الحقيقية (استعلامات N+1، كاش، دفعات، عمليات متوازية).',
          'Speed up Python code with numbers, not feelings: measure properly, find the slow part with a profiler, choose the right algorithm and data structure, reduce memory, and fix real system problems (N+1 queries, caching, batching, parallel processes).'),
  days: [
    { title: B('قيس الأول', 'Measure first'),
      goal: B('أرقام موثوقة قبل أي تعديل.', 'Reliable numbers before any change.'),
      learn: [
        L(B('متحسّنش من غير قياس', 'Don’t optimise without measuring'),
          B('**premature optimisation** = تسرّع حاجة مش هي المشكلة — بتعقّد الكود ومبتفرقش. القاعدة: اكتب واضح ← قيس ← لاقي الـ **hot path** (الجزء اللي فيه أغلب الوقت) ← حسّنه بس ← قيس تاني. وفي الأتمتة غالبًا البطء في الشبكة وقاعدة البيانات مش في Python.', '**premature optimisation** = speeding up something that is not the problem — it complicates code and changes nothing. The rule: write clearly → measure → find the **hot path** (where most time goes) → improve only that → measure again. In automation the slowness is usually in the network and the database, not in Python.'),
          'where does a 4.2 s webhook spend its time?            (measure, don’t guess)\n  JSON parsing                     0.003 s\n  validation (pydantic)            0.010 s\n  3 × Odoo API calls (sequential)  3.600 s   ← the hot path\n  20 × SELECT (one per item)       0.550 s   ← second\n  building the PDF                 0.040 s\nfix: parallel API calls + one SELECT … IN (…)  →  1.3 s', T),
        L(B('perf_counter وtimeit', 'perf_counter and timeit'),
          B('`time.perf_counter()` لقياس جزء من البرنامج. ولمقارنة طريقتين صغيرتين: `timeit` بيشغّل الكود آلاف المرات ويتفادى أخطاء القياس. خد أقل زمن من كذا تكرار (الباقي ضوضاء من الجهاز)، وقارن على بيانات بحجم حقيقي.', '`time.perf_counter()` to time part of a program. To compare two small approaches: `timeit` runs the code thousands of times and avoids measuring mistakes. Take the minimum of several repeats (the rest is machine noise), and compare on realistically sized data.'),
          'import timeit\n\nparts = [f"line {i}" for i in range(2000)]\n\ndef plus_equals():\n    s = ""\n    for p in parts:\n        s += p + "\\n"\n    return s\n\ndef join():\n    return "\\n".join(parts) + "\\n"\n\nassert plus_equals() == join()\nfor fn in (plus_equals, join):\n    best = min(timeit.repeat(fn, number=200, repeat=5)) / 200\n    print(f"{fn.__name__:<12} {best * 1e6:8.1f} µs per call")', R),
        L(B('benchmark عادل', 'A fair benchmark'),
          B('**benchmark** عادل: نفس البيانات، نفس الجهاز، كذا تكرار، وتتأكد إن النتيجتين متساويتين (أسرع وغلط = مش أسرع). اكتب الأرقام في الـ PR. وللأداء على مدى الوقت: benchmark صغير في CI بيحذّر لو حاجة بطّأت 20%.', 'A fair **benchmark**: the same data, the same machine, several repeats, and a check that both results are equal (faster but wrong is not faster). Put the numbers in the PR. For performance over time: a small benchmark in CI that warns if something slows down by 20%.'),
          'import time, statistics\n\ndef bench(fn, *args, repeat=7):\n    times = []\n    for _ in range(repeat):\n        t0 = time.perf_counter()\n        result = fn(*args)\n        times.append(time.perf_counter() - t0)\n    return result, min(times), statistics.median(times)\n\nnums = list(range(200_000))\nr1, best1, med1 = bench(lambda xs: sum([x * x for x in xs]), nums)\nr2, best2, med2 = bench(lambda xs: sum(x * x for x in xs), nums)\nassert r1 == r2, "different results — not a fair comparison"\nprint(f"list comp  best {best1*1000:.1f} ms  median {med1*1000:.1f} ms")\nprint(f"generator  best {best2*1000:.1f} ms  median {med2*1000:.1f} ms")', R)
      ],
      practice: [
        B('قيس زمن كل خطوة في سكربت أتمتة عندك.', 'Time each step of one of your automation scripts.'),
        B('قارن 3 طرق لنفس العملية بـ timeit.', 'Compare 3 ways of doing the same thing with timeit.'),
        B('اتأكد إن النتايج متساوية قبل المقارنة.', 'Check results are equal before comparing.'),
        B('اكتب الأرقام في جدول قبل وبعد.', 'Write the numbers in a before/after table.')
      ],
      words: [
        W('premature optimisation', 'تحسين قبل ما تعرف المشكلة', 'optimising before knowing what is slow', 'Premature optimisation made the code unreadable.'),
        W('hot path', 'الجزء اللي بياخد أغلب الوقت', 'the code where most time is spent', 'The API calls are the hot path.'),
        W('perf_counter', 'ساعة دقيقة لقياس الزمن', 'a high-resolution timer', 'Wrap the step with perf_counter.'),
        W('timeit', 'أداة لقياس كود صغير بتكرار', 'a module timing small snippets repeatedly', 'Use timeit to compare join and +=.'),
        W('benchmark', 'اختبار أداء مقارن', 'a repeatable performance measurement', 'Add the benchmark numbers to the PR.')
      ],
      read: [{ t: 'timeit', url: 'https://docs.python.org/3/library/timeit.html', what: B('اقرا Basic Examples.', 'Read Basic Examples.') }],
      challenge: B('خد سكربت أتمتة حقيقي بطيء: قيس كل خطوة بـ perf_counter، حدّد الـ hot path بالأرقام، واكتب «تقرير أداء» بخطة تحسين مرتبة حسب الأثر — من غير ما تغيّر كود لسه.', 'Take a real slow automation script: time each step with perf_counter, identify the hot path with numbers, and write a «performance report» with an improvement plan ranked by impact — without changing code yet.'),
      quiz: [
        Q(B('قبل ما تحسّن:', 'Before optimising:'), [['قيس ولاقي الـ hot path', 'measure and find the hot path'], ['أعد كتابة كل حاجة', 'rewrite everything'], ['غيّر اللغة', 'change language']], 0, B('أرقام.', 'Numbers.')),
        Q(B('من تكرارات timeit خد:', 'From timeit repeats take:'), [['أقل زمن', 'the minimum'], ['أكبر زمن', 'the maximum'], ['أول واحد', 'the first']], 0, B('ضوضاء.', 'Noise.')),
        Q(B('أسرع بس النتيجة مختلفة:', 'Faster but a different result:'), [['مش مقبول', 'not acceptable'], ['ممتاز', 'excellent'], ['عادي', 'fine']], 0, B('صحة.', 'Correctness.'))
      ] },

    { title: B('الـ profiler', 'The profiler'),
      goal: B('تعرف الوقت بيروح فين بالظبط.', 'Know exactly where the time goes.'),
      learn: [
        L(B('cProfile وpstats', 'cProfile and pstats'),
          B('**profiling** = قياس الوقت لكل دالة. **cprofile** مدمج في Python: بيسجّل كل نداء وعدده ووقته. و**pstats** بيرتّب النتيجة: `cumulative` (الدالة ومعاها اللي بتناديه) و`tottime` (الدالة لوحدها). من الطرفية: `python -m cProfile -s cumulative script.py`.', '**profiling** = measuring time per function. **cprofile** is built into Python: it records every call, its count and time. **pstats** sorts the result: `cumulative` (the function plus what it calls) and `tottime` (the function alone). From the terminal: `python -m cProfile -s cumulative script.py`.'),
          'import io, pstats\ntry:\n    import cProfile as profiler\nexcept ImportError:          # some browser builds lack the C profiler\n    import profile as profiler\n\ndef parse(rows):\n    return [dict(zip(("id", "city", "total"), r.split(","))) for r in rows]\n\ndef slow_lookup(orders, cities):\n    return [o for o in orders if o["city"] in cities]        # cities is a LIST\n\ndef report():\n    rows = [f"{i},city{i % 500},{i * 3}" for i in range(20000)]\n    orders = parse(rows)\n    cities = [f"city{i}" for i in range(0, 500, 2)]\n    return len(slow_lookup(orders, cities))\n\npr = profiler.Profile()\npr.enable(); n = report(); pr.disable()\nout = io.StringIO()\npstats.Stats(pr, stream=out).sort_stats("cumulative").print_stats(6)\nprint("matched:", n)\nprint("\\n".join(l for l in out.getvalue().splitlines() if "ncalls" in l or "w41" in l or "<string>" in l or "slow_lookup" in l or "parse" in l)[:900])', R),
        L(B('اقرا النتيجة', 'Read the result'),
          B('ابدأ من أعلى `cumulative` وانزل لحد ما تلاقي دالة `tottime` بتاعها كبير — دي الـ **bottleneck**. في المثال: `slow_lookup` بتدوّر في list (O(n)) لكل طلب. الحل: set. وبعد التصليح، profile تاني — الـ bottleneck بيتنقل لمكان تاني.', 'Start at the top of `cumulative` and go down until you find a function with a large `tottime` — that is the **bottleneck**. In the example: `slow_lookup` searches a list (O(n)) for every order. The fix: a set. After fixing, profile again — the bottleneck moves somewhere else.'),
          'import time\n\norders = [{"city": f"city{i % 500}"} for i in range(20000)]\ncities_list = [f"city{i}" for i in range(0, 500, 2)]\ncities_set = set(cities_list)\n\nfor name, cities in (("list", cities_list), ("set", cities_set)):\n    t0 = time.perf_counter()\n    n = sum(1 for o in orders if o["city"] in cities)\n    print(f"{name:<4} {n} matches in {(time.perf_counter() - t0) * 1000:.1f} ms")', R),
        L(B('profiler بالعيّنات', 'Sampling profilers'),
          B('**sampling profiler** زي **py-spy** بيبص على البرنامج كل شوية من برّه — من غير ما يبطّأه تقريبًا، وتقدر تشغّله على عملية شغالة في الإنتاج. بيطلّع **flame graph**: كل عمود دالة، والعرض = الوقت. الأعرض فوق = الأتقل.', 'A **sampling profiler** like **py-spy** looks at the program from outside every few milliseconds — barely slowing it, and it can attach to a running production process. It produces a **flame graph**: each bar a function, width = time. The widest bars near the top = the heaviest.'),
          '# pip install py-spy\npy-spy top --pid 12345                          # live view of a running worker\npy-spy record -o profile.svg --pid 12345        # flame graph of a running process\npy-spy record -o profile.svg -- python etl.py   # profile a script from start to end\n# open profile.svg in a browser: wide bars = where the time goes', T)
      ],
      practice: [
        B('شغّل cProfile على سكربت عندك واقرا أول 10 سطور.', 'Run cProfile on one of your scripts and read the top 10 lines.'),
        B('صلّح الـ bottleneck الأول واعمل profile تاني.', 'Fix the first bottleneck and profile again.'),
        B('جرّب `python -m cProfile -s tottime`.', 'Try `python -m cProfile -s tottime`.'),
        B('اعمل flame graph بـ py-spy لو تقدر.', 'Make a flame graph with py-spy if you can.')
      ],
      words: [
        W('profiling', 'قياس الوقت لكل دالة', 'measuring where a program spends time', 'Profiling showed the parser was fine.'),
        W('profiler', 'أداة الـ profiling', 'a tool that profiles code', 'Run the profiler on real data.'),
        W('cprofile', 'الـ profiler المدمج في Python', 'Python’s built-in deterministic profiler', 'cProfile counts every call.'),
        W('pstats', 'ترتيب وعرض نتايج الـ profiler', 'a module to sort and print profiler stats', 'Sort pstats by cumulative time.'),
        W('bottleneck', 'عنق الزجاجة: الجزء اللي بيبطّأ الكل', 'the part limiting overall speed', 'The list lookup was the bottleneck.'),
        W('sampling profiler', 'profiler بيبص كل شوية من برّه', 'a profiler that samples a running program', 'A sampling profiler is safe in production.'),
        W('py-spy', 'sampling profiler لـ Python', 'a sampling profiler for Python', 'py-spy attached to the stuck worker.'),
        W('flame graph', 'رسم بيوضح الوقت لكل دالة', 'a chart showing time per call stack', 'The flame graph showed wide JSON bars.')
      ],
      read: [{ t: 'The Python Profilers', url: 'https://docs.python.org/3/library/profile.html', what: B('اقرا Instant User’s Manual.', 'Read the Instant User’s Manual.') }],
      challenge: B('اعمل profile لسكربت ETL أو تقرير حقيقي: لاقي أكبر 3 bottlenecks، صلّح كل واحد في commit لوحده بقياس قبل وبعد، واكتب جدول النتايج.', 'Profile a real ETL or report script: find the 3 biggest bottlenecks, fix each in its own commit with before/after numbers, and write a results table.'),
      quiz: [
        Q(B('tottime:', 'tottime:'), [['وقت الدالة لوحدها', 'time in the function itself'], ['الوقت الكلي للبرنامج', 'the program’s total time'], ['عدد النداءات', 'the call count']], 0, B('ذاتي.', 'Own time.')),
        Q(B('عملية بطيئة في الإنتاج:', 'A slow process in production:'), [['py-spy على الـ pid', 'py-spy on the pid'], ['أعد تشغيلها بس', 'just restart it'], ['خمّن', 'guess']], 0, B('عيّنات.', 'Sampling.')),
        Q(B('بعد تصليح bottleneck:', 'After fixing a bottleneck:'), [['profile تاني', 'profile again'], ['خلصنا للأبد', 'done forever'], ['احذف الاختبارات', 'delete the tests']], 0, B('بيتنقل.', 'It moves.'))
      ] },

    { title: B('الخوارزميات وهياكل البيانات', 'Algorithms and data structures'),
      goal: B('الاختيار الصح بيفرق آلاف المرات.', 'The right choice makes a thousandfold difference.'),
      learn: [
        L(B('Big O بالبلدي', 'Big O in plain words'),
          B('**big o** / **time complexity** = الوقت بيكبر إزاي مع حجم البيانات. O(1) ثابت (بحث في dict/set)، O(log n) (bisect)، O(n) (المرور على list)، O(n²) (لفتين جوه بعض — الخطر الحقيقي). 10,000 عنصر: O(n²) = 100 مليون خطوة. و**space complexity** نفس الفكرة للذاكرة.', '**big o** / **time complexity** = how time grows with data size. O(1) constant (a dict/set lookup), O(log n) (bisect), O(n) (going through a list), O(n²) (two nested loops — the real danger). With 10,000 items: O(n²) = 100 million steps. **space complexity** is the same idea for memory.'),
          'import time\n\ndef dupes_quadratic(xs):\n    return {x for i, x in enumerate(xs) for y in xs[i + 1:] if x == y}\n\ndef dupes_linear(xs):\n    seen, d = set(), set()\n    for x in xs:\n        (d if x in seen else seen).add(x)\n    return d\n\nfor n in (500, 1000, 2000):\n    xs = [i % (n - 3) for i in range(n)]\n    t0 = time.perf_counter(); a = dupes_quadratic(xs); t1 = time.perf_counter(); b = dupes_linear(xs); t2 = time.perf_counter()\n    assert a == b\n    print(f"n={n:<5} O(n²) {1000*(t1-t0):7.1f} ms   O(n) {1000*(t2-t1):5.2f} ms")', R),
        L(B('الهيكل الصح', 'The right structure'),
          B('**set lookup** و**dict lookup** = O(1). `collections.deque` للطوابير (الإضافة والسحب من الطرفين O(1)؛ `list.pop(0)` O(n)). `heapq` لأكبر/أصغر k من غير ترتيب كله. و`Counter` للعد. اختيار الهيكل غالبًا أهم من أي تحسين تاني.', 'A **set lookup** and a **dict lookup** = O(1). `collections.deque` for queues (adding and removing at both ends O(1); `list.pop(0)` is O(n)). `heapq` for the top/bottom k without sorting everything. And `Counter` for counting. Choosing the structure usually matters more than any other optimisation.'),
          'import heapq, time\nfrom collections import deque\n\norders = [{"id": i, "total": (i * 7919) % 100_003} for i in range(100_000)]\nt0 = time.perf_counter()\ntop_sorted = sorted(orders, key=lambda o: o["total"], reverse=True)[:5]\nt1 = time.perf_counter()\ntop_heap = heapq.nlargest(5, orders, key=lambda o: o["total"])\nt2 = time.perf_counter()\nassert [o["total"] for o in top_sorted] == [o["total"] for o in top_heap]\nprint(f"sorted+slice {1000*(t1-t0):.1f} ms | heapq.nlargest {1000*(t2-t1):.1f} ms | top: {[o[\'total\'] for o in top_heap]}")\n\nq_list, q_deque = list(range(20_000)), deque(range(20_000))\nt0 = time.perf_counter()\nwhile q_list: q_list.pop(0)\nt1 = time.perf_counter()\nwhile q_deque: q_deque.popleft()\nt2 = time.perf_counter()\nprint(f"list.pop(0) {1000*(t1-t0):.1f} ms | deque.popleft {1000*(t2-t1):.1f} ms")', R),
        L(B('الكاش في الذاكرة', 'In-memory caching'),
          B('لو دالة بتتنادي بنفس المدخلات كتير ونتيجتها ثابتة: `functools.cache` (أو lru_cache بحد). وكمان «اعمل الحاجة مرة برّه اللفة»: `re.compile` مرة، وقاموس lookup مرة بدل البحث في كل لفة.', 'If a function is called often with the same inputs and its result is fixed: `functools.cache` (or lru_cache with a limit). And «do it once outside the loop»: `re.compile` once, and a lookup dict once instead of searching on every iteration.'),
          'import functools, re, time\n\n@functools.cache\ndef shipping_zone(city: str) -> str:\n    sum(range(20_000))                       # pretend this is a slow lookup\n    return "A" if city in {"Cairo", "Giza"} else "B"\n\ncities = ["Cairo", "Giza", "Alex", "Mansoura"] * 250\nt0 = time.perf_counter()\nzones = [shipping_zone(c) for c in cities]\nprint(f"{len(cities)} lookups in {1000*(time.perf_counter()-t0):.0f} ms;", shipping_zone.cache_info())\n\nPHONE = re.compile(r"01[0125]\\d{8}")      # compiled once\nprint(PHONE.findall("call 01012345678 or 01198765432"))', R)
      ],
      practice: [
        B('دوّر على لفتين جوه بعض في كودك وحوّلهم لـ dict/set.', 'Find nested loops in your code and turn them into a dict/set.'),
        B('استبدل list.pop(0) بـ deque.', 'Replace list.pop(0) with a deque.'),
        B('استخدم heapq.nlargest لأكبر 10.', 'Use heapq.nlargest for the top 10.'),
        B('حط functools.cache على دالة مناسبة وشوف cache_info.', 'Put functools.cache on a suitable function and check cache_info.')
      ],
      words: [
        W('big o', 'ترميز بيوصف نمو الوقت مع الحجم', 'notation for how cost grows with size', 'Two nested loops are O(n²) in big O.'),
        W('time complexity', 'التعقيد الزمني', 'how running time grows with input size', 'The time complexity dropped to O(n).'),
        W('space complexity', 'التعقيد في الذاكرة', 'how memory use grows with input size', 'Streaming keeps space complexity constant.'),
        W('set lookup', 'البحث في set (سريع)', 'checking membership in a set', 'A set lookup is O(1).'),
        W('dict lookup', 'البحث في قاموس بالمفتاح', 'finding a value by key in a dict', 'Replace the inner loop with a dict lookup.'),
        W('heapq', 'مكتبة الـ heap لأكبر/أصغر k', 'a module for heaps and top-k', 'heapq.nlargest finds the top 5.'),
        W('deque', 'طابور سريع من الطرفين', 'a double-ended queue', 'Use a deque for the job queue.'),
        W('functools.cache', 'كاش غير محدود لنتايج دالة', 'an unbounded cache for a function’s results', 'functools.cache made zone lookups instant.')
      ],
      read: [{ t: 'Python Wiki: TimeComplexity', url: 'https://wiki.python.org/moin/TimeComplexity', what: B('اقرا list وdict وset.', 'Read list, dict and set.') }],
      challenge: B('خد 3 دوال حقيقية عندك فيها list في lookup أو لفتين متداخلتين أو pop(0): حوّلها للهيكل الصح، قيس على 10,000 و100,000 عنصر، واكتب الـ big O قبل وبعد.', 'Take 3 real functions of yours with a list lookup, nested loops or pop(0): switch to the right structure, measure on 10,000 and 100,000 items, and write the big O before and after.'),
      quiz: [
        Q(B('x in my_set:', 'x in my_set:'), [['O(1)', 'O(1)'], ['O(n)', 'O(n)'], ['O(n²)', 'O(n²)']], 0, B('hash.', 'Hashing.')),
        Q(B('أكبر 5 من مليون:', 'The top 5 of a million:'), [['heapq.nlargest', 'heapq.nlargest'], ['ترتيب كله', 'sort everything'], ['لفتين', 'two loops']], 0, B('top-k.', 'Top-k.')),
        Q(B('طابور بيتسحب من أوله كتير:', 'A queue popped from the front a lot:'), [['deque', 'a deque'], ['list.pop(0)', 'list.pop(0)'], ['string', 'a string']], 0, B('O(1).', 'O(1).'))
      ] },

    { title: B('الذاكرة', 'Memory'),
      goal: B('برامج بتعالج ملفات كبيرة من غير ما تقع.', 'Programs that process big files without crashing.'),
      learn: [
        L(B('قيس الذاكرة', 'Measure memory'),
          B('**tracemalloc** مدمج: بيقيس الذاكرة اللي Python حجزها وفين. `sys.getsizeof` بيدّي حجم كائن واحد (من غير اللي جواه). استخدمهم لما سكربت بيكبر في الذاكرة لحد ما يقع.', '**tracemalloc** is built in: it measures memory Python allocated and where. `sys.getsizeof` gives one object’s size (without what it contains). Use them when a script grows in memory until it crashes.'),
          'import sys\ntry:\n    import tracemalloc\nexcept ImportError:\n    tracemalloc = None\n\ndef build_list(n):\n    return [f"order-{i}" for i in range(n)]\n\nif tracemalloc:\n    tracemalloc.start()\n    data = build_list(100_000)\n    current, peak = tracemalloc.get_traced_memory()\n    print(f"list of {len(data):,} strings: current {current/1e6:.1f} MB, peak {peak/1e6:.1f} MB")\n    tracemalloc.stop()\nprint("one string:", sys.getsizeof("order-1"), "bytes; the list object alone:", sys.getsizeof(build_list(1000)), "bytes for 1000 refs")', R),
        L(B('الـ streaming', 'Streaming'),
          B('ملف 5 GB مش لازم يدخل الذاكرة كله: اقراه سطر سطر واستخدم generators (أسبوع 25) — الذاكرة بتفضل ثابتة مهما كبر الملف. نفس الفكرة مع قواعد البيانات (`fetchmany`) والـ APIs (صفحات).', 'A 5 GB file need not fit in memory: read it line by line and use generators (week 25) — memory stays flat however big the file is. The same idea applies to databases (`fetchmany`) and APIs (pages).'),
          'import io\ntry:\n    import tracemalloc\nexcept ImportError:\n    tracemalloc = None\n\ndef fake_file(n):\n    return io.StringIO("".join(f"{i},Cairo,{i % 900}\\n" for i in range(n)))\n\ndef total_all_at_once(f):\n    rows = f.read().splitlines()                     # everything in memory\n    return sum(int(r.split(",")[2]) for r in rows)\n\ndef total_streaming(f):\n    return sum(int(line.split(",")[2]) for line in f)   # one line at a time\n\nfor fn in (total_all_at_once, total_streaming):\n    f = fake_file(200_000)\n    if tracemalloc:\n        tracemalloc.start()\n    result = fn(f)\n    peak = tracemalloc.get_traced_memory()[1] / 1e6 if tracemalloc else float("nan")\n    if tracemalloc:\n        tracemalloc.stop()\n    print(f"{fn.__name__:<18} total={result}  peak extra memory ≈ {peak:.1f} MB")', R),
        L(B('__slots__ وتسرب الذاكرة', '__slots__ and memory leaks'),
          B('ملايين الكائنات الصغيرة: **__slots__** بيشيل الـ `__dict__` من كل كائن ويوفّر ذاكرة كتير (و`@dataclass(slots=True)` بيعملها لوحده). و**memory leak** في Python غالبًا = حاجة بتكبر من غير حد: قاموس كاش من غير سقف، أو list بتتجمع في worker شغال للأبد.', 'Millions of small objects: **__slots__** removes the `__dict__` from each object and saves a lot of memory (and `@dataclass(slots=True)` does it for you). A **memory leak** in Python is usually something growing without limit: a cache dict with no cap, or a list accumulating in a worker that runs forever.'),
          'import sys\nfrom dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\n@dataclass(slots=True)\nclass SlimPoint:\n    x: float\n    y: float\n\np, s = Point(1, 2), SlimPoint(1, 2)\nprint("with __dict__:", sys.getsizeof(p) + sys.getsizeof(p.__dict__), "bytes")\nprint("with slots:   ", sys.getsizeof(s), "bytes")\n\n# a leak: a cache that only grows\nseen = {}\ndef remember(order_id, payload):\n    seen[order_id] = payload          # never evicted → grows forever in a long-running worker\nfor i in range(10_000):\n    remember(i, "x" * 100)\nprint("cache entries:", len(seen), "→ use lru_cache(maxsize=…) or a TTL")', R)
      ],
      practice: [
        B('قيس ذروة الذاكرة لسكربت عندك بـ tracemalloc.', 'Measure your script’s peak memory with tracemalloc.'),
        B('حوّل قراية ملف كامل لـ streaming.', 'Convert a whole-file read to streaming.'),
        B('جرّب slots=True على dataclass بتستخدمه كتير.', 'Try slots=True on a dataclass you use heavily.'),
        B('دوّر على كاش أو list بتكبر للأبد في worker.', 'Look for a cache or list growing forever in a worker.')
      ],
      words: [
        W('tracemalloc', 'أداة قياس ذاكرة Python', 'a module tracing Python memory allocations', 'tracemalloc showed a 900 MB peak.'),
        W('sys.getsizeof', 'حجم كائن واحد بالبايت', 'the size of one object in bytes', 'sys.getsizeof ignores the contents.'),
        W('streaming', 'معالجة البيانات حتة حتة', 'processing data piece by piece', 'Streaming keeps memory flat.'),
        W('__slots__', 'تعريف ثابت للخصائص بيوفّر ذاكرة', 'a fixed attribute list that saves memory', 'Add __slots__ to the million small objects.'),
        W('memory leak', 'تسرب ذاكرة: حاجة بتكبر من غير حد', 'memory that grows and is never released', 'The unbounded cache was a memory leak.')
      ],
      read: [{ t: 'tracemalloc', url: 'https://docs.python.org/3/library/tracemalloc.html', what: B('اقرا Examples.', 'Read Examples.') }],
      challenge: B('اعمل سكربت بيعالج CSV بـ 2 مليون صف (ولّده بنفسك): نسخة بتقرا كله ونسخة streaming، قيس ذروة الذاكرة والوقت للاتنين، وصلّح أي كاش من غير سقف في الكود.', 'Write a script processing a 2-million-row CSV (generate it yourself): a read-everything version and a streaming version, measure peak memory and time for both, and fix any uncapped cache in the code.'),
      quiz: [
        Q(B('ملف 5 GB:', 'A 5 GB file:'), [['اقراه سطر سطر', 'read it line by line'], ['f.read() مرة واحدة', 'f.read() at once'], ['انسخه في list', 'copy it into a list']], 0, B('streaming.', 'Streaming.')),
        Q(B('ملايين كائنات صغيرة:', 'Millions of small objects:'), [['slots=True', 'slots=True'], ['dict لكل واحد', 'a dict for each'], ['global', 'global']], 0, B('ذاكرة.', 'Memory.')),
        Q(B('worker ذاكرته بتكبر كل يوم:', 'A worker whose memory grows daily:'), [['دوّر على كاش أو list من غير سقف', 'look for an uncapped cache or list'], ['زوّد RAM بس', 'just add RAM'], ['طبيعي', 'it’s normal']], 0, B('تسرب.', 'A leak.'))
      ] },

    { title: B('الأداء على مستوى النظام', 'System-level performance'),
      goal: B('أكبر مكاسب: قاعدة البيانات والشبكة والتوازي.', 'The biggest wins: database, network and parallelism.'),
      learn: [
        L(B('استعلامات N+1', 'N+1 queries'),
          B('**n+1 query** = استعلام للقايمة + استعلام لكل عنصر = 1 + N رحلة لقاعدة البيانات. مع شبكة بين السيرفر والقاعدة ده بيقتل الأداء. الحل: JOIN أو `WHERE id IN (…)` — استعلام واحد. والـ ORM (أسبوع 30) بيعمل N+1 من غير ما تاخد بالك؛ استخدم eager loading.', 'An **n+1 query** = one query for the list + one per item = 1 + N trips to the database. With a network between server and database this kills performance. The fix: a JOIN or `WHERE id IN (…)` — one query. ORMs (week 30) create N+1 silently; use eager loading.'),
          'import sqlite3, time\n\ndb = sqlite3.connect(":memory:")\ndb.executescript("""\nCREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER, total REAL);\n""")\ndb.executemany("INSERT INTO customers VALUES (?, ?)", [(i, f"c{i}") for i in range(1000)])\ndb.executemany("INSERT INTO orders VALUES (?, ?, ?)", [(i, i % 1000, i * 1.5) for i in range(10000)])\n\nt0 = time.perf_counter()\ncustomers = db.execute("SELECT id, name FROM customers").fetchall()\nn_plus_1 = {name: db.execute("SELECT SUM(total) FROM orders WHERE customer_id = ?", (cid,)).fetchone()[0]\n            for cid, name in customers}                                   # 1 + 1000 queries\nt1 = time.perf_counter()\njoined = dict(db.execute("""SELECT c.name, SUM(o.total) FROM customers c\n                            JOIN orders o ON o.customer_id = c.id GROUP BY c.id""").fetchall())   # 1 query\nt2 = time.perf_counter()\nassert n_plus_1 == joined\nprint(f"N+1: {1000*(t1-t0):.0f} ms (1001 queries) | JOIN: {1000*(t2-t1):.0f} ms (1 query)")\nprint("…and over a real network each query adds ~1 ms more.")', R),
        L(B('دفعات وكاش بمدة', 'Batching and TTL caches'),
          B('**batching** = بدل 1000 طلب API أو INSERT، دفعات من 100 (`executemany`، bulk endpoints). و**caching** لنتايج بتتغير ببطء (أسعار الصرف، إعدادات): كاش بـ **ttl** (مدة صلاحية). أصعب حاجة: **cache invalidation** — إمتى تمسح الكاش لما الأصل يتغير.', '**batching** = instead of 1,000 API calls or INSERTs, batches of 100 (`executemany`, bulk endpoints). And **caching** for slowly changing results (exchange rates, settings): a cache with a **ttl** (time to live). The hardest part: **cache invalidation** — when to clear the cache as the source changes.'),
          'import time\n\nclass TTLCache:\n    def __init__(self, ttl_s, clock=time.monotonic):\n        self.ttl, self.clock, self.data = ttl_s, clock, {}\n\n    def get(self, key, compute):\n        hit = self.data.get(key)\n        now = self.clock()\n        if hit and now - hit[1] < self.ttl:\n            return hit[0], "hit"\n        value = compute()\n        self.data[key] = (value, now)\n        return value, "miss"\n\n    def invalidate(self, key):\n        self.data.pop(key, None)\n\nfake_now = [0.0]\ncache = TTLCache(ttl_s=600, clock=lambda: fake_now[0])\nrate = lambda: 48.7                               # pretend: an exchange-rate API call\nfor t in (0, 30, 590, 610):\n    fake_now[0] = t\n    print(f"t={t:>3}s", cache.get("USD-EGP", rate))\ncache.invalidate("USD-EGP")                       # the source changed → clear it\nprint("after invalidate:", cache.get("USD-EGP", rate))', R),
        L(B('التوازي', 'Parallelism'),
          B('شغل بيستنى شبكة (I/O-bound): asyncio أو threads (أسبوع 27). شغل حسابات تقيلة (CPU-bound): **multiprocessing** (عمليات منفصلة) بسبب الـ GIL — وفي Python 3.13+ فيه نسخة **free-threaded** تجريبية من غير GIL. وقانون **amdahl**: لو 20% من الشغل مش ممكن يتوازى، أقصى تسريع 5× مهما زوّدت.', 'Network-waiting work (I/O-bound): asyncio or threads (week 27). Heavy computation (CPU-bound): **multiprocessing** (separate processes) because of the GIL — and Python 3.13+ has an experimental **free-threaded** build without the GIL. And **amdahl** (Amdahl’s law): if 20% of the work cannot run in parallel, the maximum speed-up is 5× however much you add.'),
          '# CPU-bound: generate 2,000 PDF invoices on all cores\nfrom concurrent.futures import ProcessPoolExecutor\n\ndef render(invoice_id: int) -> str:\n    return build_pdf(invoice_id)             # pure computation\n\nif __name__ == "__main__":                   # required for multiprocessing on Windows\n    with ProcessPoolExecutor() as pool:       # one process per core by default\n        paths = list(pool.map(render, range(2000), chunksize=50))\n\n# Amdahl: speed-up = 1 / ((1 - p) + p / n)\n# p = 0.8 parallel, n = 8 cores → 1 / (0.2 + 0.1) = 3.3×   (never more than 1 / 0.2 = 5×)')
      ],
      practice: [
        B('دوّر على N+1 في كودك (لفة فيها استعلام).', 'Find an N+1 in your code (a loop with a query inside).'),
        B('حوّل INSERT واحد واحد لـ executemany بدفعات.', 'Turn row-by-row INSERTs into batched executemany.'),
        B('حط TTLCache قدام API بطيء.', 'Put a TTLCache in front of a slow API.'),
        B('احسب أقصى تسريع بـ amdahl لشغلك.', 'Compute the maximum speed-up with Amdahl for your job.')
      ],
      words: [
        W('n+1 query', 'استعلام لكل عنصر بدل استعلام واحد', 'one query per item instead of one in total', 'The report had an N+1 query per customer.'),
        W('batching', 'تجميع العمليات في دفعات', 'grouping operations into batches', 'Batching cut API calls from 1000 to 10.'),
        W('caching', 'تخزين نتيجة لإعادة استخدامها', 'storing results to reuse them', 'Caching exchange rates saved 2 seconds.'),
        W('ttl', 'مدة صلاحية الكاش', 'time to live for a cached value', 'Set a TTL of ten minutes.'),
        W('cache invalidation', 'مسح الكاش لما الأصل يتغير', 'removing cached data when the source changes', 'Cache invalidation is the hard part.'),
        W('multiprocessing', 'تشغيل عمليات منفصلة بالتوازي', 'running separate processes in parallel', 'Use multiprocessing for CPU-bound work.'),
        W('free-threaded', 'Python من غير GIL (تجريبي)', 'a Python build without the GIL', 'The free-threaded build is still experimental.'),
        W('amdahl', 'قانون حد التسريع بالتوازي', 'the law limiting parallel speed-up', 'Amdahl says 20% serial caps us at 5×.')
      ],
      read: [{ t: 'concurrent.futures', url: 'https://docs.python.org/3/library/concurrent.futures.html', what: B('اقرا ProcessPoolExecutor.', 'Read ProcessPoolExecutor.') }],
      challenge: B('حسّن تقرير أو endpoint حقيقي على مستوى النظام: شيل N+1 بـ JOIN، دفعات للكتابة، TTLCache لبيانات بطيئة التغير مع invalidation، وتوازي لنداءات الـ API — بجدول أرقام قبل وبعد لكل خطوة.', 'Improve a real report or endpoint at system level: remove the N+1 with a JOIN, batch the writes, add a TTLCache for slow-changing data with invalidation, and parallelise API calls — with a before/after table for each step.'),
      quiz: [
        Q(B('لفة فيها SELECT لكل عميل:', 'A loop with a SELECT per customer:'), [['N+1؛ استخدم JOIN', 'N+1; use a JOIN'], ['تمام', 'fine'], ['أسرع طريقة', 'the fastest way']], 0, B('رحلات.', 'Round trips.')),
        Q(B('حسابات تقيلة على 8 أنوية:', 'Heavy computation on 8 cores:'), [['multiprocessing', 'multiprocessing'], ['threads عادية', 'plain threads'], ['asyncio', 'asyncio']], 0, B('GIL.', 'The GIL.')),
        Q(B('أصعب جزء في الكاش:', 'The hardest part of caching:'), [['cache invalidation', 'cache invalidation'], ['الكتابة', 'writing'], ['الاسم', 'the name']], 0, B('صحة.', 'Freshness.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('كود أسرع بأرقام تثبت.', 'Faster code with numbers to prove it.'),
      review: [
        B('القياس: perf_counter وtimeit وbenchmark عادل.', 'Measuring: perf_counter, timeit and fair benchmarks.'),
        B('cProfile وpstats وpy-spy والـ flame graph.', 'cProfile, pstats, py-spy and flame graphs.'),
        B('Big O وset وdict وdeque وheapq والكاش.', 'Big O, sets, dicts, deques, heapq and caching.'),
        B('tracemalloc والـ streaming وslots والتسرب.', 'tracemalloc, streaming, slots and leaks.'),
        B('N+1 والدفعات وTTL والتوازي وAmdahl.', 'N+1, batching, TTL, parallelism and Amdahl.')
      ],
      project: B('مشروع الأسبوع «تسريع حقيقي»: خد workflow أو سكربت ETL/تقرير بطيء من شغلك، قيس الـ baseline، profile بـ cProfile (وpy-spy لو تقدر)، صلّح 5 مشاكل (هيكل بيانات، N+1، streaming، دفعات/كاش، توازي) كل واحدة في commit بأرقام، benchmark في CI بيحذّر من التراجع، وتقرير أداء نهائي.', 'Week project «a real speed-up»: take a slow workflow or ETL/report script from your work, measure the baseline, profile with cProfile (and py-spy if you can), fix 5 problems (data structure, N+1, streaming, batching/caching, parallelism) each in its own commit with numbers, add a CI benchmark warning about regressions, and write a final performance report.'),
      test: [
        Q(B('premature optimisation:', 'Premature optimisation:'), [['تحسين قبل ما تعرف البطء فين', 'optimising before knowing what is slow'], ['تحسين ممتاز', 'excellent optimisation'], ['كاش', 'a cache']], 0, B('قيس.', 'Measure.')),
        Q(B('hot path:', 'The hot path:'), [['الجزء اللي فيه أغلب الوقت', 'where most time is spent'], ['كود جديد', 'new code'], ['ملف إعدادات', 'a config file']], 0, B('وقت.', 'Time.')),
        Q(B('cumulative في pstats:', 'cumulative in pstats:'), [['الدالة واللي بتناديه', 'the function plus what it calls'], ['الدالة لوحدها', 'the function alone'], ['عدد السطور', 'the line count']], 0, B('شامل.', 'Inclusive.')),
        Q(B('flame graph:', 'A flame graph:'), [['العرض = الوقت', 'width = time'], ['اللون = الخطأ', 'colour = error'], ['الطول = الذاكرة بس', 'height = memory only']], 0, B('عرض.', 'Width.')),
        Q(B('لفتين متداخلتين على 10,000:', 'Two nested loops over 10,000:'), [['O(n²) ≈ 100 مليون خطوة', 'O(n²) ≈ 100 million steps'], ['O(1)', 'O(1)'], ['O(log n)', 'O(log n)']], 0, B('تربيعي.', 'Quadratic.')),
        Q(B('عدّ التكرارات:', 'Counting occurrences:'), [['Counter', 'Counter'], ['لفة جوه لفة', 'a loop inside a loop'], ['list.count في لفة', 'list.count in a loop']], 0, B('O(n).', 'O(n).')),
        Q(B('tracemalloc:', 'tracemalloc:'), [['يقيس الذاكرة المحجوزة', 'measures allocated memory'], ['يسرّع', 'speeds things up'], ['يمسح', 'deletes']], 0, B('ذاكرة.', 'Memory.')),
        Q(B('memory leak في Python غالبًا:', 'A Python memory leak is usually:'), [['حاجة بتكبر من غير سقف', 'something growing without a cap'], ['باج في C', 'a C bug'], ['مستحيل', 'impossible']], 0, B('سقف.', 'A cap.')),
        Q(B('1000 INSERT واحد واحد:', '1,000 INSERTs one by one:'), [['executemany بدفعات', 'executemany in batches'], ['تمام', 'fine'], ['1000 اتصال', '1,000 connections']], 0, B('دفعات.', 'Batching.')),
        Q(B('ttl:', 'A TTL:'), [['مدة صلاحية الكاش', 'how long a cached value lives'], ['نوع ملف', 'a file type'], ['بروتوكول', 'a protocol']], 0, B('صلاحية.', 'Lifetime.')),
        Q(B('نداءات API بتستنى الشبكة:', 'API calls waiting on the network:'), [['asyncio أو threads', 'asyncio or threads'], ['multiprocessing بس', 'only multiprocessing'], ['ولا حاجة', 'nothing']], 0, B('I/O.', 'I/O.')),
        Q(B('20% مش ممكن يتوازى:', '20% cannot run in parallel:'), [['أقصى تسريع 5×', 'at most a 5× speed-up'], ['تسريع لا نهائي', 'unlimited speed-up'], ['20×', '20×']], 0, B('Amdahl.', 'Amdahl.'))
      ] }
  ]
};
