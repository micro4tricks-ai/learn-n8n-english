// Python week 27 — Concurrency: threads, processes and asyncio.
// Thread and process examples are display-only: the in-browser Python (Pyodide) cannot start threads or processes.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('التزامن: threads وprocesses وasyncio', 'Concurrency: threads, processes and asyncio'),
  goal: B('تختار الأداة الصح لتسريع الشغل: threads للانتظار، processes للحساب التقيل، وasyncio لآلاف الطلبات — مع حدود، ومهلات، وإلغاء، وطوابير منتج/مستهلك، ومن غير race conditions.',
          'Choose the right tool to speed up work: threads for waiting, processes for heavy computation, and asyncio for thousands of requests — with limits, timeouts, cancellation, producer/consumer queues, and no race conditions.'),
  days: [
    { title: B('التزامن مقابل التوازي', 'Concurrency versus parallelism'),
      goal: B('تعرف نوع الشغل قبل ما تختار الأداة.', 'Know the kind of work before choosing the tool.'),
      learn: [
        L(B('مستني ولا بيحسب؟', 'Waiting or computing?'),
          B('**I/O-bound**: البرنامج أغلب وقته مستني (شبكة، قرص، قاعدة بيانات) ← threads أو asyncio. **CPU-bound**: بيحسب طول الوقت (صور، حسابات، ضغط) ← processes. قيس الأول: لو 95% من الوقت انتظار، processes مش هتفيد.', '**I/O-bound**: the program spends most of its time waiting (network, disk, database) → threads or asyncio. **CPU-bound**: it computes all the time (images, maths, compression) → processes. Measure first: if 95% of the time is waiting, processes will not help.'),
          'download 500 pages      → I/O-bound → asyncio / threads\nresize 2,000 photos     → CPU-bound → processes\ncall API + parse JSON   → mostly I/O → asyncio'),
        L(B('الـ GIL', 'The GIL'),
          B('في CPython التقليدي فيه **GIL**: thread واحد بس بيشغّل كود بايثون في اللحظة. فالـ threads بتفيد في الانتظار (بتسيب الـ GIL وهي مستنية) بس مش بتسرّع الحساب. للحساب الحقيقي على أكتر من core: processes. (بايثون 3.13+ فيها نسخة تجريبية من غير GIL.)', 'Classic CPython has the **GIL**: only one thread runs Python code at a time. So threads help with waiting (they release the GIL while waiting) but do not speed up computation. For real multi-core computation: processes. (Python 3.13+ has an experimental build without the GIL.)'),
          'threads: 4 × waiting on HTTP → ~4× faster\nthreads: 4 × CPU loops       → ~1× (GIL)\nprocesses: 4 × CPU loops     → ~4× on 4 cores'),
        L(B('قيس قبل ما تختار', 'Measure before choosing'),
          B('`time.perf_counter()` حوالين الشغل يقولك الوقت الكلي، و`time.process_time()` وقت الـ CPU بس. لو الفرق كبير، البرنامج بيستنى أغلب الوقت (I/O-bound).', '`time.perf_counter()` around the work gives the total time, and `time.process_time()` only the CPU time. If the gap is large, the program mostly waits (I/O-bound).'),
          'import time\n\ndef work():\n    time.sleep(0.3)               # waiting (like a network call)\n    sum(i * i for i in range(200_000))  # computing\n\nwall, cpu = time.perf_counter(), time.process_time()\nwork()\nwall, cpu = time.perf_counter() - wall, time.process_time() - cpu\nprint(f"total {wall:.2f}s, cpu {cpu:.2f}s → {(1 - cpu / wall):.0%} waiting")', R)
      ],
      practice: [
        B('صنّف 8 مهام أتمتة عندك I/O ولا CPU.', 'Classify 8 of your automation tasks as I/O or CPU.'),
        B('قيس wall وcpu لسكربت حقيقي عندك.', 'Measure wall and CPU time for one of your real scripts.'),
        B('اكتب في سطرين: ليه threads متسرّعش الحساب في CPython.', 'Write in two lines why threads do not speed up computation in CPython.'),
        B('اختار الأداة لكل مهمة من التمانية.', 'Pick the tool for each of the eight tasks.')
      ],
      words: [
        W('parallelism', 'تنفيذ حاجات في نفس اللحظة فعلًا على أكتر من core', 'running things at the same instant on several cores', 'Processes give true parallelism.'),
        W('cpu-bound', 'شغل وقته أغلبه حساب', 'work whose time is mostly computation', 'Resizing images is CPU-bound.'),
        W('gil', 'قفل بيخلي thread واحد يشغّل بايثون في المرة', 'a lock letting one thread run Python at a time', 'The GIL limits CPU work in threads.'),
        W('wall time', 'الوقت الحقيقي الكلي', 'the real elapsed time', 'Wall time was 3 s but CPU time 0.2 s.'),
        W('cpu time', 'الوقت اللي المعالج اشتغل فيه فعلًا', 'the time the processor actually worked', 'Low CPU time means mostly waiting.')
      ],
      read: [{ lib: 'Python Glossary', what: B('اقرا تعريف «global interpreter lock».', 'Read the definition of «global interpreter lock».') }, 'lib:Real Python Tutorials'],
      challenge: B('خد 3 سكربتات من الرحلة، قيس كل واحد (wall/cpu)، وصنّفه، واكتب خطة تسريع مناسبة لكل واحد بالأرقام المتوقعة.', 'Take 3 scripts from the journey, measure each (wall/CPU), classify it, and write a suitable speed-up plan for each with expected numbers.'),
      quiz: [
        Q(B('تنزيل 300 صفحة:', 'Downloading 300 pages:'), [['I/O-bound', 'I/O-bound'], ['CPU-bound', 'CPU-bound'], ['مش واضح', 'unclear']], 0, B('انتظار شبكة.', 'Network waiting.')),
        Q(B('حساب تقيل على 8 cores في CPython:', 'Heavy computation on 8 cores in CPython:'), [['processes', 'processes'], ['threads', 'threads'], ['asyncio', 'asyncio']], 0, B('بسبب الـ GIL.', 'Because of the GIL.')),
        Q(B('wall 5s وcpu 0.3s:', 'Wall 5 s and CPU 0.3 s:'), [['البرنامج بيستنى أغلب الوقت', 'the program mostly waits'], ['بيحسب طول الوقت', 'it computes all the time'], ['خطأ في القياس', 'a measuring error']], 0, B('I/O.', 'I/O.'))
      ] },

    { title: B('الـ threads بأمان', 'Threads, safely'),
      goal: B('تسرّع شغل الانتظار بـ threads من غير ما البيانات تبوظ.', 'Speed up waiting work with threads without corrupting data.'),
      learn: [
        L(B('as_completed', 'as_completed'),
          B('`executor.map` بيرجّع النتايج بالترتيب. `as_completed` بيرجّع كل نتيجة أول ما تخلص — مفيد لشريط تقدم أو لمعالجة الأسرع الأول. وكل future ممكن يرمي الخطأ بتاعه، فـ try حوالين `.result()`.', '`executor.map` returns results in order. `as_completed` returns each result as soon as it finishes — useful for a progress bar or handling the fastest first. Each future can raise its own error, so wrap `.result()` in try.'),
          'from concurrent.futures import ThreadPoolExecutor, as_completed\nimport time, random\n\ndef check(url):\n    time.sleep(random.uniform(0.1, 0.5))\n    if "bad" in url:\n        raise ValueError(f"{url} is down")\n    return url, 200\n\nurls = ["a.com", "bad.com", "c.com", "d.com"]\nwith ThreadPoolExecutor(max_workers=4) as pool:\n    futures = {pool.submit(check, u): u for u in urls}\n    for f in as_completed(futures):\n        try:\n            print(f.result())\n        except ValueError as e:\n            print("failed:", e)'),
        L(B('race condition', 'Race conditions'),
          B('**race condition**: اتنين threads بيعدّلوا نفس المتغير في نفس الوقت والنتيجة غلط. `counter += 1` مش عملية واحدة! الحل: `threading.Lock()` حوالين التعديل، أو الأحسن: كل thread يرجّع نتيجته وانت تجمّعها في الآخر.', 'A **race condition**: two threads change the same variable at the same time and the result is wrong. `counter += 1` is not one single step! The fix: a `threading.Lock()` around the change, or better: each thread returns its result and you combine them at the end.'),
          'import threading\n\ncounter = 0\nlock = threading.Lock()\n\ndef add_many():\n    global counter\n    for _ in range(100_000):\n        with lock:          # without the lock the total can come out wrong\n            counter += 1\n\nthreads = [threading.Thread(target=add_many) for _ in range(4)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(counter)  # 400000'),
        L(B('شارك أقل', 'Share less'),
          B('أحسن **thread safety**: متشاركش. كل مهمة بتاخد مدخلاتها وترجّع نتيجة، والـ main thread بيجمّع. لو لازم تشارك، استخدم `queue.Queue` (آمنة جاهزة) بدل list عادية. ورتّب `max_workers` حسب حد الخدمة مش أكبر رقم.', 'The best **thread safety**: do not share. Each task takes its inputs and returns a result, and the main thread combines them. If you must share, use `queue.Queue` (already safe) instead of a plain list. And set `max_workers` by the service’s limit, not the biggest number.'),
          '✗ results.append(x) from many threads + a shared counter\n✓ results = list(pool.map(fetch, ids))   # each call returns its own value', { lang: 'text' })
      ],
      practice: [
        B('شغّل مثال as_completed على جهازك (مش في المتصفح) وغيّر عدد الـ workers.', 'Run the as_completed example on your machine (not in the browser) and change the number of workers.'),
        B('شيل الـ Lock من مثال العدّاد وشوف النتيجة (جرّب كذا مرة).', 'Remove the Lock from the counter example and look at the result (try several times).'),
        B('أعد كتابة كود بيشارك list بـ map يرجّع النتايج.', 'Rewrite code that shares a list using map returning results.'),
        B('حدد max_workers لـ API حده 10 طلبات في الثانية.', 'Choose max_workers for an API limited to 10 requests per second.')
      ],
      words: [
        W('as_completed', 'بيرجّع كل نتيجة أول ما تخلص', 'yields each result as soon as it is done', 'Use as_completed for a progress bar.'),
        W('race condition', 'نتيجة غلط بسبب تعديل متزامن', 'a wrong result caused by simultaneous changes', 'The shared counter had a race condition.'),
        W('lock', 'قفل بيخلي thread واحد بس يدخل', 'a guard letting only one thread in', 'Wrap the update in a lock.'),
        W('thread safety', 'إن الكود يشتغل صح مع threads كتير', 'code working correctly with many threads', 'queue.Queue gives thread safety for free.'),
        W('max_workers', 'أقصى عدد threads أو processes في الـ pool', 'the most threads or processes in a pool', 'Set max_workers to match the API limit.')
      ],
      read: [{ lib: 'The Python Standard Library', what: B('اقرا صفحة concurrent.futures.', 'Read the concurrent.futures page.') }],
      challenge: B('اكتب «فاحص روابط» بـ ThreadPoolExecutor: 50 رابط، max_workers مناسب، as_completed مع تقدم، كل نتيجة مرتجعة (من غير مشاركة)، وتقرير بالأخطاء — شغّله محليًا.', 'Write a «link checker» with ThreadPoolExecutor: 50 links, a sensible max_workers, as_completed with progress, every result returned (no sharing), and an error report — run it locally.'),
      quiz: [
        Q(B('`counter += 1` من threads كتير من غير قفل:', '`counter += 1` from many threads without a lock:'), [['ممكن يطلع رقم غلط', 'may give a wrong total'], ['دايمًا صح', 'is always right'], ['أبطأ بس', 'is only slower']], 0, B('race condition.', 'A race condition.')),
        Q(B('as_completed بيرجّع النتايج:', 'as_completed returns results:'), [['أول ما كل واحدة تخلص', 'as each one finishes'], ['بالترتيب', 'in order'], ['في الآخر بس', 'only at the end']], 0, B('للتقدم.', 'For progress.')),
        Q(B('أحسن thread safety:', 'The best thread safety:'), [['متشاركش البيانات', 'do not share data'], ['locks في كل حتة', 'locks everywhere'], ['threads أكتر', 'more threads']], 0, B('كل واحد يرجّع نتيجته.', 'Each returns its result.'))
      ] },

    { title: B('الـ processes للحساب', 'Processes for computation'),
      goal: B('تستخدم كل cores الجهاز في الحساب التقيل.', 'Use all the machine’s cores for heavy computation.'),
      learn: [
        L(B('ProcessPoolExecutor', 'ProcessPoolExecutor'),
          B('نفس شكل الـ threads بالظبط، بس كل مهمة في process منفصل بـ GIL خاص بيه — توازي حقيقي. لازم الكود يكون تحت `if __name__ == "__main__":` (خصوصًا على ويندوز) والدالة معرّفة في أعلى الملف.', 'Exactly the same interface as threads, but each task runs in a separate process with its own GIL — true parallelism. The code must be under `if __name__ == "__main__":` (especially on Windows) and the function defined at the top level of the file.'),
          'from concurrent.futures import ProcessPoolExecutor\nimport math, time\n\ndef heavy(n: int) -> int:\n    return sum(math.isqrt(i) for i in range(n))\n\nif __name__ == "__main__":\n    jobs = [3_000_000] * 8\n    start = time.perf_counter()\n    with ProcessPoolExecutor() as pool:\n        results = list(pool.map(heavy, jobs))\n    print(len(results), f"{time.perf_counter() - start:.1f}s")'),
        L(B('pickle والتكلفة', 'Pickling and overhead'),
          B('المدخلات والنتايج بتتنقل بين الـ processes بـ **pickle** (تحويل لبايتات). ده ليه **overhead**: لو المهمة صغيرة (مللي ثانية) أو البيانات ضخمة، الـ processes ممكن تبقى أبطأ. ادّي كل process شغل كبير (مثلًا `chunksize`).', 'Inputs and results move between processes via **pickle** (conversion to bytes). That has **overhead**: if the task is tiny (milliseconds) or the data huge, processes can be slower. Give each process a big chunk of work (e.g. `chunksize`).'),
          'tiny tasks × 100,000  → slower with processes (pickling cost)\nbig tasks × 8          → ~N× faster on N cores\npool.map(f, items, chunksize=500)   # fewer, bigger batches', { lang: 'text' }),
        L(B('مثال حقيقي: صور بالجملة', 'A real example: images in bulk'),
          B('تصغير 2000 صورة بـ Pillow = CPU-bound مثالي للـ processes: دالة بتاخد مسار وترجّع المسار الجديد، و`pool.map` على القايمة. القرص ممكن يبقى هو الحد بعد كده — قيس.', 'Resizing 2,000 images with Pillow is ideal CPU-bound work for processes: a function takes a path and returns the new path, and `pool.map` runs it over the list. The disk may become the limit afterwards — measure.'),
          'def resize(path):\n    with Image.open(path) as img:\n        img.thumbnail((800, 800))\n        out = OUT / path.name\n        img.save(out, quality=85)\n    return out\n\nif __name__ == "__main__":\n    with ProcessPoolExecutor() as pool:\n        done = list(pool.map(resize, paths, chunksize=20))')
      ],
      practice: [
        B('شغّل مثال heavy محليًا بـ processes ثم threads وقارن الوقت.', 'Run the heavy example locally with processes, then threads, and compare times.'),
        B('جرّب مهام صغيرة جدًا وشوف الـ overhead.', 'Try very small tasks and observe the overhead.'),
        B('جرّب chunksize مختلف.', 'Try different chunksize values.'),
        B('اكتب متى تختار processes في 3 جمل.', 'Write when to choose processes in 3 sentences.')
      ],
      words: [
        W('processpoolexecutor', 'pool بيشغّل مهام في processes منفصلة', 'a pool running tasks in separate processes', 'Use ProcessPoolExecutor for heavy maths.'),
        W('pickle', 'تحويل كائنات بايثون لبايتات للنقل', 'turning Python objects into bytes for transfer', 'Arguments are sent to workers with pickle.'),
        W('overhead', 'تكلفة إضافية مش من الشغل نفسه', 'extra cost not part of the work itself', 'Small tasks drown in overhead.'),
        W('chunksize', 'عدد العناصر اللي بتتبعت لكل worker مرة واحدة', 'how many items are sent to each worker at once', 'A larger chunksize cuts overhead.'),
        W('core', 'نواة معالج', 'one processing unit of a CPU', 'The laptop has 8 cores.')
      ],
      read: [{ lib: 'The Python Standard Library', what: B('اقرا ProcessPoolExecutor في concurrent.futures.', 'Read ProcessPoolExecutor in concurrent.futures.') }, 'lib:Pillow (PIL) documentation'],
      challenge: B('اكتب سكربت تصغير صور بالجملة بـ ProcessPoolExecutor على 200 صورة (اعملها بـ Pillow)، قارن الوقت مع loop عادي ومع threads، واكتب النتايج في جدول.', 'Write a bulk image-resizing script with ProcessPoolExecutor on 200 images (generate them with Pillow), compare the time with a plain loop and with threads, and record the results in a table.'),
      quiz: [
        Q(B('ليه processes بتسرّع الحساب؟', 'Why do processes speed up computation?'), [['كل process ليه GIL خاص', 'each process has its own GIL'], ['بتستخدم ذاكرة أقل', 'they use less memory'], ['بتلغي الشبكة', 'they skip the network']], 0, B('توازي حقيقي.', 'True parallelism.')),
        Q(B('على ويندوز لازم:', 'On Windows you need:'), [['if __name__ == "__main__"', 'if __name__ == "__main__"'], ['global', 'global'], ['asyncio', 'asyncio']], 0, B('spawn.', 'Spawn start method.')),
        Q(B('مهام صغيرة جدًا بـ processes:', 'Very small tasks with processes:'), [['ممكن تبقى أبطأ', 'can be slower'], ['دايمًا أسرع', 'are always faster'], ['مستحيلة', 'are impossible']], 0, B('overhead.', 'Overhead.'))
      ] },

    { title: B('asyncio بعمق', 'asyncio in depth'),
      goal: B('تشغّل مئات المهام async بحدود ومهلات وأخطاء متحكم فيها.', 'Run hundreds of async tasks with limits, timeouts and controlled errors.'),
      learn: [
        L(B('TaskGroup', 'TaskGroup'),
          B('`asyncio.TaskGroup` (بايثون 3.11+) أأمن من gather: لو مهمة فشلت، الباقي بيتلغي والأخطاء بتطلع مع بعض. و`gather(..., return_exceptions=True)` لما عايز كل النتايج حتى الفاشلة كقيم.', '`asyncio.TaskGroup` (Python 3.11+) is safer than gather: if one task fails, the rest are cancelled and the errors surface together. Use `gather(..., return_exceptions=True)` when you want every result, including failures, as values.'),
          'import asyncio\n\nasync def fetch(i):\n    await asyncio.sleep(0.05 * i)\n    if i == 3:\n        raise ValueError(f"item {i} failed")\n    return i * 10\n\nasync def main():\n    results = await asyncio.gather(*(fetch(i) for i in range(5)), return_exceptions=True)\n    ok = [r for r in results if not isinstance(r, Exception)]\n    bad = [r for r in results if isinstance(r, Exception)]\n    print("ok:", ok, "failed:", bad)\n\nasyncio.run(main())', R),
        L(B('حد ومهلة', 'A limit and a timeout'),
          B('`asyncio.Semaphore(10)` بيحدد 10 طلبات في نفس الوقت (حد الخدمة). و`asyncio.wait_for(coro, timeout=5)` (أو `async with asyncio.timeout(5)` في 3.11+) بيلغي اللي اتأخر. الاتنين مع بعض = وصول محترم وسريع.', '`asyncio.Semaphore(10)` limits it to 10 requests at once (the service’s limit). `asyncio.wait_for(coro, timeout=5)` (or `async with asyncio.timeout(5)` in 3.11+) cancels whatever is late. Both together = fast, respectful access.'),
          'import asyncio, random\nrandom.seed(1)\n\nasync def call(i, sem):\n    async with sem:\n        delay = random.uniform(0.05, 0.4)\n        try:\n            await asyncio.wait_for(asyncio.sleep(delay), timeout=0.3)\n            return i, "ok"\n        except asyncio.TimeoutError:\n            return i, "timeout"\n\nasync def main():\n    sem = asyncio.Semaphore(3)\n    results = await asyncio.gather(*(call(i, sem) for i in range(8)))\n    print(results)\n\nasyncio.run(main())', R),
        L(B('الإلغاء', 'Cancellation'),
          B('مهمة async ممكن تتلغي (**cancellation**): `task.cancel()` بيرمي `CancelledError` جواها عند أقرب await. نضّف في `finally` ومتبلعش CancelledError — ارميه تاني عشان الإلغاء يكمّل.', 'An async task can be **cancelled**: `task.cancel()` raises `CancelledError` inside it at the next await. Clean up in `finally` and do not swallow CancelledError — re-raise it so cancellation completes.'),
          'import asyncio\n\nasync def worker():\n    try:\n        while True:\n            await asyncio.sleep(0.1)\n    finally:\n        print("worker cleaned up")\n\nasync def main():\n    t = asyncio.create_task(worker())\n    await asyncio.sleep(0.25)\n    t.cancel()\n    try:\n        await t\n    except asyncio.CancelledError:\n        print("cancelled")\n\nasyncio.run(main())', R)
      ],
      practice: [
        B('شغّل 20 مهمة بـ gather وreturn_exceptions وافصل الناجح عن الفاشل.', 'Run 20 tasks with gather and return_exceptions and separate successes from failures.'),
        B('حط Semaphore 5 ومهلة لكل طلب.', 'Add a Semaphore of 5 and a timeout per request.'),
        B('جرّب TaskGroup لو عندك بايثون 3.11+.', 'Try TaskGroup if you have Python 3.11+.'),
        B('الغي مهمة واتأكد إن finally اشتغلت.', 'Cancel a task and check finally ran.')
      ],
      words: [
        W('taskgroup', 'مجموعة مهام async بتتدار مع بعض', 'a group of async tasks managed together', 'TaskGroup cancels the rest on failure.'),
        W('return_exceptions', 'خيار في gather بيرجّع الأخطاء كقيم', 'a gather option returning errors as values', 'Use return_exceptions=True to keep going.'),
        W('wait_for', 'تستنى coroutine لحد مهلة', 'waiting for a coroutine up to a timeout', 'wait_for cancels slow calls.'),
        W('cancellation', 'إلغاء مهمة شغالة', 'stopping a running task', 'Handle cancellation in finally.'),
        W('cancellederror', 'الاستثناء اللي بيوصل للمهمة الملغية', 'the exception raised inside a cancelled task', 'Do not swallow CancelledError.')
      ],
      read: ['lib:asyncio', { lib: 'HTTPX documentation', what: B('اقرا جزء Async Support.', 'Read the Async Support part.') }],
      challenge: B('اكتب «جالب أسعار» async: 100 منتج، Semaphore 10، مهلة 2 ثانية لكل طلب، إعادة مرة للفاشل، gather بـ return_exceptions، وتقرير (نجح، timeout، خطأ) — جرّبه على httpbin/delay.', 'Write an async «price fetcher»: 100 products, a Semaphore of 10, a 2-second timeout per request, one retry for failures, gather with return_exceptions, and a report (ok, timeout, error) — test it against httpbin/delay.'),
      quiz: [
        Q(B('Semaphore(10) بيعمل:', 'Semaphore(10) does:'), [['10 مهام بس في نفس الوقت', 'allows only 10 tasks at once'], ['10 ثواني مهلة', 'a 10-second timeout'], ['10 إعادات', '10 retries']], 0, B('حد.', 'A limit.')),
        Q(B('gather مع return_exceptions=True:', 'gather with return_exceptions=True:'), [['الأخطاء بترجع كقيم', 'errors come back as values'], ['بيوقف عند أول خطأ', 'stops at the first error'], ['بيتجاهل كل حاجة', 'ignores everything']], 0, B('تكمّل.', 'Keep going.')),
        Q(B('CancelledError جوه المهمة:', 'CancelledError inside a task:'), [['نضّف وارميه تاني', 'clean up and re-raise'], ['ابلعه دايمًا', 'always swallow it'], ['تجاهل', 'ignore it']], 0, B('الإلغاء يكمّل.', 'Let cancellation finish.'))
      ] },

    { title: B('أنماط: منتج ومستهلك', 'Patterns: producer and consumer'),
      goal: B('تبني خط شغل async بطابور وعمّال وضغط عكسي.', 'Build an async work line with a queue, workers and backpressure.'),
      learn: [
        L(B('asyncio.Queue', 'asyncio.Queue'),
          B('**producer-consumer**: منتج بيحط مهام في `asyncio.Queue`، و N عمّال بياخدوا منها ويعالجوا. ده نفس فكرة طابور n8n بس جوه بايثون. `queue.join()` بيستنى لحد ما كل المهام تخلص.', '**Producer-consumer**: a producer puts tasks in an `asyncio.Queue`, and N workers take from it and process them. The same idea as the n8n queue, but inside Python. `queue.join()` waits until every task is done.'),
          'import asyncio\n\nasync def producer(q):\n    for order in range(1, 9):\n        await q.put(order)\n\nasync def consumer(name, q, done):\n    while True:\n        order = await q.get()\n        await asyncio.sleep(0.05)\n        done.append((name, order))\n        q.task_done()\n\nasync def main():\n    q, done = asyncio.Queue(), []\n    workers = [asyncio.create_task(consumer(f"w{i}", q, done)) for i in range(3)]\n    await producer(q)\n    await q.join()\n    for w in workers:\n        w.cancel()\n    print(len(done), "orders processed by", sorted({n for n, _ in done}))\n\nasyncio.run(main())', R),
        L(B('الضغط العكسي', 'Backpressure'),
          B('لو المنتج أسرع من العمّال، الطابور بيكبر لحد ما الذاكرة تخلص. `asyncio.Queue(maxsize=100)` بيعمل **backpressure**: `put` بيستنى لما الطابور يتملي، فالمنتج بيبطّأ تلقائيًا.', 'If the producer is faster than the workers, the queue grows until memory runs out. `asyncio.Queue(maxsize=100)` creates **backpressure**: `put` waits when the queue is full, so the producer slows down automatically.'),
          'q = asyncio.Queue(maxsize=100)\nawait q.put(item)   # waits while 100 items are already queued', { lang: 'text' }),
        L(B('worker pool ثابت', 'A fixed worker pool'),
          B('**worker pool** بعدد ثابت (مثلًا 5) أحسن من مهمة لكل عنصر لما العناصر بالآلاف: ذاكرة ثابتة، ومعدل ثابت، وسهل تحترم حد الـ API. ده نمط الأتمتة الكلاسيكي في بايثون.', 'A **worker pool** of fixed size (e.g. 5) beats one task per item when there are thousands of items: steady memory, a steady rate, and an easy way to respect an API limit. This is the classic automation pattern in Python.'),
          '10,000 orders → 1 producer → Queue(maxsize=200) → 5 workers → results\nmemory stays flat; rate ≈ 5 × (1 / avg_time)', { lang: 'text' })
      ],
      practice: [
        B('شغّل مثال المنتج/المستهلك وغيّر عدد العمّال.', 'Run the producer/consumer example and change the number of workers.'),
        B('ضيف maxsize وخلّي المنتج يطبع لما يستنى.', 'Add maxsize and make the producer print when it waits.'),
        B('خلّي العامل يعيد المهمة الفاشلة مرة.', 'Make a worker retry a failed task once.'),
        B('اكتب تقرير: كام مهمة لكل عامل.', 'Write a report: how many tasks per worker.')
      ],
      words: [
        W('producer-consumer', 'نمط منتج بيحط شغل ومستهلكين بياخدوه', 'a pattern where a producer adds work and consumers take it', 'Use producer-consumer for big imports.'),
        W('asyncio.queue', 'طابور آمن للـ coroutines', 'a queue safe for coroutines', 'Workers read from an asyncio.Queue.'),
        W('task_done', 'إشارة إن مهمة من الطابور خلصت', 'a signal that a queued task is finished', 'Call task_done after each item.'),
        W('backpressure', 'تبطيء المنتج لما المستهلكين متأخرين', 'slowing the producer when consumers fall behind', 'maxsize gives you backpressure.'),
        W('worker pool', 'عدد ثابت من العمّال', 'a fixed number of workers', 'A worker pool of 5 respects the API limit.')
      ],
      read: ['lib:asyncio', { lib: 'Python HOWTOs', what: B('دوّر على أمثلة asyncio.Queue في التوثيق.', 'Find asyncio.Queue examples in the docs.') }],
      challenge: B('ابني «مستورد طلبات» async: منتج بيقرا 1000 سطر CSV، Queue(maxsize=50)، 5 عمّال بيبعتوا لـ API وهمي (sleep + فشل عشوائي) بإعادة، وتقرير نهائي بالوقت والنجاح.', 'Build an async «order importer»: a producer reading 1,000 CSV rows, Queue(maxsize=50), 5 workers sending to a fake API (sleep + random failures) with a retry, and a final report of time and success.'),
      quiz: [
        Q(B('`q.join()` بيستنى:', '`q.join()` waits:'), [['لحد ما كل المهام تخلص', 'until every task is done'], ['ثانية', 'one second'], ['أول مهمة', 'the first task']], 0, B('مع task_done.', 'With task_done.')),
        Q(B('maxsize في الطابور بيعمل:', 'maxsize on the queue creates:'), [['backpressure', 'backpressure'], ['أخطاء', 'errors'], ['سرعة أكبر', 'more speed']], 0, B('المنتج يستنى.', 'The producer waits.')),
        Q(B('10 آلاف عنصر:', '10,000 items:'), [['worker pool ثابت', 'a fixed worker pool'], ['مهمة لكل عنصر مرة واحدة', 'one task per item at once'], ['loop عادي دايمًا', 'always a plain loop']], 0, B('ذاكرة ثابتة.', 'Steady memory.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('سكربتات أتمتة أسرع 10× بالأداة الصح.', 'Automation scripts 10× faster with the right tool.'),
      review: [
        B('I/O-bound وCPU-bound والـ GIL والقياس.', 'I/O-bound, CPU-bound, the GIL and measuring.'),
        B('threads: as_completed، race conditions، locks، ومشاركة أقل.', 'Threads: as_completed, race conditions, locks and sharing less.'),
        B('processes: ProcessPoolExecutor، pickle، overhead، وchunksize.', 'Processes: ProcessPoolExecutor, pickle, overhead and chunksize.'),
        B('asyncio: gather/TaskGroup، Semaphore، مهلات، وإلغاء.', 'asyncio: gather/TaskGroup, Semaphore, timeouts and cancellation.'),
        B('منتج/مستهلك، backpressure، وworker pool.', 'Producer/consumer, backpressure and the worker pool.')
      ],
      project: B('خد سكربت أتمتة بطيء من الرحلة (تنزيل، API، أو صور) وسرّعه: قيس الأول، اختار الأداة، طبّق (threads أو processes أو asyncio بطابور وعمّال)، احترم حدود الخدمة بمهلات وإعادة، وقدّم تقرير «قبل/بعد» بالأرقام وشرح الاختيار.', 'Take a slow automation script from the journey (downloads, an API or images) and speed it up: measure first, choose the tool, apply it (threads, processes, or asyncio with a queue and workers), respect the service’s limits with timeouts and retries, and present a before/after report with numbers and the reasoning for your choice.'),
      test: [
        Q(B('API calls كتير:', 'Many API calls:'), [['asyncio أو threads', 'asyncio or threads'], ['processes', 'processes'], ['loop بس', 'only a loop']], 0, B('I/O.', 'I/O.')),
        Q(B('الـ GIL بيمنع:', 'The GIL prevents:'), [['threads بايثون تحسب بالتوازي', 'Python threads computing in parallel'], ['الانتظار', 'waiting'], ['الشبكة', 'networking']], 0, B('في CPython.', 'In CPython.')),
        Q(B('wall أكبر بكتير من cpu:', 'Wall much bigger than CPU:'), [['البرنامج بيستنى', 'the program is waiting'], ['بيحسب', 'it is computing'], ['معطّل', 'it is broken']], 0, B('I/O-bound.', 'I/O-bound.')),
        Q(B('race condition بتتعالج بـ:', 'A race condition is fixed by:'), [['Lock أو عدم المشاركة', 'a Lock or not sharing'], ['threads أكتر', 'more threads'], ['sleep', 'sleep']], 0, B('حماية.', 'Protection.')),
        Q(B('queue.Queue بين threads:', 'queue.Queue between threads:'), [['آمنة جاهزة', 'is already safe'], ['خطر', 'is dangerous'], ['ممنوعة', 'is forbidden']], 0, B('thread-safe.', 'Thread-safe.')),
        Q(B('ProcessPoolExecutor على ويندوز محتاج:', 'ProcessPoolExecutor on Windows needs:'), [['main guard', 'a main guard'], ['admin', 'admin rights'], ['asyncio', 'asyncio']], 0, B('if __name__.', 'if __name__.')),
        Q(B('overhead الـ processes من:', 'Process overhead comes from:'), [['pickle ونقل البيانات', 'pickling and moving data'], ['الـ GIL', 'the GIL'], ['الشبكة', 'the network']], 0, B('مهام كبيرة أحسن.', 'Bigger tasks are better.')),
        Q(B('عشان تحدد طلبات API المتزامنة:', 'To limit concurrent API requests:'), [['asyncio.Semaphore', 'asyncio.Semaphore'], ['time.sleep', 'time.sleep'], ['global', 'global']], 0, B('حد.', 'A limit.')),
        Q(B('wait_for بـ timeout بيعمل:', 'wait_for with a timeout:'), [['يلغي المهمة المتأخرة', 'cancels a late task'], ['يعيدها', 'retries it'], ['يسرّعها', 'speeds it up']], 0, B('TimeoutError.', 'TimeoutError.')),
        Q(B('TaskGroup لو مهمة فشلت:', 'TaskGroup when a task fails:'), [['بيلغي الباقي', 'cancels the rest'], ['بيكمّل عادي', 'carries on'], ['بيعيد', 'retries']], 0, B('أمان.', 'Safety.')),
        Q(B('producer أسرع من العمّال:', 'A producer faster than the workers:'), [['maxsize للـ backpressure', 'maxsize for backpressure'], ['ذاكرة أكبر', 'more memory'], ['عمّال لانهائي', 'infinite workers']], 0, B('يستنى.', 'It waits.')),
        Q(B('task_done بتتنادي:', 'task_done is called:'), [['بعد معالجة كل عنصر', 'after handling each item'], ['في الأول', 'at the start'], ['مرة واحدة', 'once']], 0, B('عشان join.', 'For join.'))
      ] }
  ]
};
