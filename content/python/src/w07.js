// Python week 7 — Modules, packages and environments.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ', 'Beginner'),
  title: B('الموديولات والحزم والبيئات', 'Modules, packages and environments'),
  goal: B('تقسّم مشروعك لملفات تستوردها، وتستخدم أهم موديولات المكتبة القياسية، وتثبّت حزم من PyPI بـ pip، وتعزل كل مشروع في بيئة افتراضية (venv أو uv)، وتنظّم المشروع زي المحترفين.',
          'Split your project into files you import, use the key standard-library modules, install packages from PyPI with pip, isolate each project in a virtual environment (venv or uv), and lay out a project like a professional.'),
  days: [
    { title: B('import وموديولاتك انت', 'import and your own modules'),
      goal: B('تعرف أشكال import كلها، وتعمل موديول من ملف بتاعك وتستورده.', 'Know every form of import, and make a module from your own file and import it.'),
      learn: [
        { h: B('أشكال import', 'The forms of import'),
          p: B('`import math` وبعدين `math.sqrt` (الاسم واضح جاي منين)، `from math import sqrt` تستخدم `sqrt` على طول، `import datetime as dt` اسم مختصر. تجنّب `from x import *`: بيرمي أسماء كتير مش معروف جت منين.', '`import math` then `math.sqrt` (clear where the name comes from), `from math import sqrt` lets you use `sqrt` directly, `import datetime as dt` gives a short name. Avoid `from x import *`: it dumps many names of unknown origin.'),
          ex: 'import math\nfrom statistics import mean, median\nimport datetime as dt\nprint(math.sqrt(81), mean([3, 4, 8]), median([3, 4, 8]))\nprint(dt.date(2026, 10, 1).isoformat())', run: 1 },
        { h: B('ملفك = موديول', 'Your file is a module'),
          p: B('أي ملف `.py` موديول. لو عندك `text_tools.py` جنب `main.py`، تكتب في main: `from text_tools import clean_phone`. Python بتدوّر في فولدر الملف اللي بتشغّله الأول، وبعدين المكتبة القياسية والحزم المتثبتة (`sys.path`).', 'Any `.py` file is a module. With `text_tools.py` next to `main.py`, write in main: `from text_tools import clean_phone`. Python searches the folder of the file you run first, then the standard library and installed packages (`sys.path`).'),
          ex: '# project/\n#   text_tools.py   ->  def clean_phone(p): ...\n#   main.py\n\n# main.py\nfrom text_tools import clean_phone\n\nprint(clean_phone("010-1234 5678"))', show: 1 },
        { h: B('الموديول بيتحمّل مرة واحدة', 'A module loads once'),
          p: B('أول import بيشغّل الملف كله مرة، وأي import بعده بياخد نفس النسخة. عشان كده الكود اللي في أعلى الموديول لازم يكون تعريفات بس، والشغل الفعلي جوه `if __name__ == "__main__":` (اللي اتعلمناه الأسبوع اللي فات).', 'The first import runs the whole file once; later imports reuse that copy. So the top level of a module should hold definitions only, with the real work inside `if __name__ == "__main__":` (from last week).'),
          ex: 'import sys\nimport json\nprint("json" in sys.modules)\nprint(sys.version.split()[0])\nprint(len(sys.modules), "modules loaded so far")', run: 1 }
      ],
      practice: [
        B('استورد 3 دوال من 3 موديولات مختلفة بالأشكال التلاتة.', 'Import 3 functions from 3 different modules using the three forms.'),
        B('انقل دوال `text_tools.py` (مشروع أسبوع 6) لملف لوحده واستوردها من `main.py`.', 'Move the `text_tools.py` functions (week 6 challenge) to their own file and import them from `main.py`.'),
        B('حط `print("loading")` في أعلى الموديول بتاعك واستورده مرتين وشوف بيتطبع كام مرة.', 'Put `print("loading")` at the top of your module, import it twice and see how many times it prints.'),
        B('سمّي ملف عندك `random.py` واعمل `import random` في ملف جنبه، وشوف المشكلة، وبعدين غيّر الاسم.', 'Name a file of yours `random.py`, `import random` from a file next to it, see the problem, then rename it.')
      ],
      code: [
        { u: B('شكل مشروع بموديولين', 'A two-module project'), p: '# prices.py\nVAT = 0.14\n\ndef with_vat(amount: float) -> float:\n    return round(amount * (1 + VAT), 2)\n\n# app.py\nimport prices\nfrom prices import with_vat\n\nprint(prices.VAT, with_vat(100))', show: 1 }
      ],
      words: [
        { t: 'from ... import', m: B('بتجيب اسم معيّن من موديول تستخدمه على طول', 'brings one name from a module to use directly'), ex: 'from math import sqrt' },
        { t: 'alias', m: B('اسم مختصر لموديول بـ as', 'a short name for a module with as'), ex: 'import pandas as pd' },
        { t: 'sys.path', m: B('قايمة الفولدرات اللي Python بتدوّر فيها على الموديولات', 'the list of folders Python searches for modules'), ex: 'import sys; print(sys.path)' },
        { t: 'namespace', m: B('مكان فيه أسماء؛ كل موديول ليه أسماؤه', 'a space of names; each module has its own'), ex: 'math.pi vs your own pi' },
        { t: 'shadowing', m: B('ملف أو متغير باسم بيغطي على حاجة جاهزة', 'a file or variable whose name hides a built-in one'), ex: 'a file called random.py' },
        { t: 'ModuleNotFoundError', m: B('خطأ لما الموديول مش متثبت أو مش في المسار', 'an error when a module is not installed or not on the path'), ex: 'No module named \'requests\'' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 6. Modules لحد 6.1.3.', 'Read 6. Modules up to 6.1.3.') }, { lib: 'Real Python Tutorials', what: B('دوّر على «Python import» واقرا الجزء الأساسي.', 'Search for «Python import» and read the basic part.') }],
      challenge: B('اعمل مشروع صغير من 3 ملفات: `config.py` (ثوابت)، و`tools.py` (دوال بتستخدم الثوابت)، و`main.py` بيستخدم الاتنين، ومفيش ولا سطر شغل برّه `main()`.', 'Make a small 3-file project: `config.py` (constants), `tools.py` (functions that use the constants) and `main.py` that uses both, with no working line outside `main()`.'),
      quiz: [
        { q: B('`from math import sqrt` بعدها تكتب:', 'After `from math import sqrt` you write:'), o: ['sqrt(9)', 'math.sqrt(9)', 'import.sqrt(9)'], a: 0, why: B('الاسم بقى متاح مباشرة.', 'The name is available directly.') },
        { q: B('ملف عندك اسمه `json.py` ممكن:', 'A file of yours named `json.py` can:'), o: [B('يغطي على موديول json الحقيقي', 'hide the real json module'), B('يسرّع json', 'speed json up'), B('مفيش مشكلة', 'cause no problem')], a: 0, why: B('Python بتلاقي ملفك الأول.', 'Python finds your file first.') },
        { q: B('`import pandas as pd` الـ pd اسمها:', 'In `import pandas as pd`, pd is an:'), o: ['alias', 'package', 'function'], a: 0, why: B('اسم مختصر.', 'A short name.') }
      ] },

    { title: B('جولة في المكتبة القياسية', 'A tour of the standard library'),
      goal: B('تعرف موديولات جاية مع Python بتوفّر عليك مكتبات برّه: os وsys وtime وitertools وfunctools وstatistics وtextwrap.', 'Know the modules that ship with Python and save you outside libraries: os, sys, time, itertools, functools, statistics and textwrap.'),
      learn: [
        { h: B('os وsys وtime', 'os, sys and time'),
          p: B('`os.environ.get("API_KEY")` تقرا متغير بيئة (مكان الأسرار، مش الكود)، و`os.getcwd()` الفولدر الحالي. `sys.argv` المعاملات اللي اتكتبت بعد اسم السكربت، و`sys.exit(1)` تخرج بكود خطأ. `time.sleep(2)` تستنى، و`time.perf_counter()` تقيس.', '`os.environ.get("API_KEY")` reads an environment variable (where secrets live, not in code), and `os.getcwd()` is the current folder. `sys.argv` holds the words typed after the script name, and `sys.exit(1)` exits with an error code. `time.sleep(2)` waits and `time.perf_counter()` measures.'),
          ex: 'import os, sys, time\nprint(os.environ.get("API_KEY", "not set"))\nprint(sys.argv[:1], sys.platform)\nstart = time.perf_counter()\ntime.sleep(0.2)\nprint(f"waited {time.perf_counter() - start:.2f} s")', run: 1 },
        { h: B('itertools', 'itertools'),
          p: B('`chain` تلزق كذا قايمة، `islice` تاخد أول n من أي iterable، `groupby` تجمّع العناصر المتتالية (رتّب الأول!)، `combinations` و`product` كل الاحتمالات، و`batched` (3.12+) تقسّم لدفعات — ممتازة للـ APIs اللي بتقبل 100 سجل في المرة.', '`chain` joins several lists, `islice` takes the first n of any iterable, `groupby` groups consecutive items (sort first!), `combinations` and `product` give every possibility, and `batched` (3.12+) splits into batches — perfect for APIs that accept 100 records at a time.'),
          ex: 'from itertools import chain, islice, groupby, product, batched\nprint(list(chain([1, 2], [3], [4, 5])))\nprint(list(islice(range(1000), 3)))\nrows = sorted([("Cairo", 5), ("Giza", 2), ("Cairo", 1)])\nfor city, group in groupby(rows, key=lambda r: r[0]):\n    print(city, sum(n for _, n in group))\nprint(list(product(["S", "M"], ["red", "blue"])))\nprint(list(batched(range(7), 3)))', run: 1 },
        { h: B('functools وstatistics وtextwrap', 'functools, statistics and textwrap'),
          p: B('`@lru_cache` بيفتكر نتايج دالة عشان متتحسبش تاني (بيفرق جدًا مع دالة بطيئة بتتنادى بنفس القيم)، و`partial` بتثبّت معامل. `statistics` فيها mean وmedian وstdev. `textwrap.shorten` و`wrap` بيقصّروا ويلفّوا النص للتقارير.', '`@lru_cache` remembers a function’s results so they are not recomputed (a big win for a slow function called with the same values), and `partial` fixes an argument. `statistics` has mean, median and stdev. `textwrap.shorten` and `wrap` shorten and wrap text for reports.'),
          ex: 'from functools import lru_cache, partial\nimport statistics, textwrap\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nprint(fib(80))\nround2 = partial(round, ndigits=2)\nprint(round2(3.14159))\nprint(statistics.median([120, 85, 300, 42]), round(statistics.stdev([120, 85, 300, 42]), 1))\nprint(textwrap.shorten("A very long product description that will not fit in the table", width=30))', run: 1 }
      ],
      practice: [
        B('اكتب سكربت بيطبع كل المعاملات اللي اتكتبت بعد اسمه (`sys.argv`) وشغّله من الطرفية بـ 3 كلمات.', 'Write a script that prints every word typed after its name (`sys.argv`) and run it from the terminal with 3 words.'),
        B('اقرا متغير بيئة عملته بنفسك في الطرفية (`set` أو `export` أو `$env:`) من Python.', 'Read an environment variable you set yourself in the terminal (`set`, `export` or `$env:`) from Python.'),
        B('قسّم قايمة 250 إيميل لدفعات 100 بـ `batched` واطبع حجم كل دفعة.', 'Split a list of 250 emails into batches of 100 with `batched` and print each batch size.'),
        B('قيس وقت `fib(32)` من غير cache ومعاه.', 'Time `fib(32)` without and with the cache.')
      ],
      code: [
        { u: B('دفعات لـ API', 'Batches for an API'), p: 'from itertools import batched\nemails = [f"user{i}@example.com" for i in range(1, 251)]\nfor n, batch in enumerate(batched(emails, 100), 1):\n    print(f"batch {n}: {len(batch)} emails, first {batch[0]}")', run: 1 }
      ],
      words: [
        { t: 'standard library', m: B('الموديولات اللي جاية مع Python من غير تثبيت', 'the modules that come with Python, nothing to install'), ex: 'json, csv, pathlib, datetime' },
        { t: 'environment variable', m: B('قيمة متخزنة في نظام التشغيل بيقراها البرنامج، مكان الأسرار', 'a value stored by the operating system that programs read; where secrets go'), ex: 'os.environ.get("API_KEY")' },
        { t: 'sys.argv', m: B('قايمة الكلام اللي اتكتب بعد اسم السكربت', 'the list of words typed after the script name'), ex: 'python tool.py report.csv' },
        { t: 'itertools', m: B('موديول أدوات للّف والتجميع والدفعات', 'a module of tools for looping, grouping and batching'), ex: 'from itertools import batched' },
        { t: 'lru_cache', m: B('decorator بيفتكر نتايج الدالة', 'a decorator that remembers a function’s results'), ex: '@lru_cache(maxsize=None)' },
        { t: 'batch', m: B('دفعة: مجموعة عناصر بتتعالج مع بعض', 'a group of items processed together'), ex: '100 records per request' }
      ],
      read: [{ lib: 'The Python Standard Library', what: B('اقرا صفحة itertools لحد الجدول الأول، وصفحة os.environ.', 'Read the itertools page up to the first table, and os.environ.') }, { lib: 'Python Tutorial (python.org)', what: B('اقرا 10. Brief Tour of the Standard Library.', 'Read 10. Brief Tour of the Standard Library.') }],
      challenge: B('اكتب `word_stats.py` بياخد اسم ملف من `sys.argv` (لو مفيش يطبع طريقة الاستخدام ويخرج بـ `sys.exit(1)`)، ويطبع عدد السطور والكلمات وأكتر 5 كلمات (الملفات بالتفصيل أسبوع 9؛ هنا كفاية `open(name, encoding="utf-8").read()`).', 'Write `word_stats.py` that takes a file name from `sys.argv` (printing usage and `sys.exit(1)` when missing) and prints the number of lines and words and the top 5 words (files in depth come in week 9; `open(name, encoding="utf-8").read()` is enough here).'),
      quiz: [
        { q: B('مكان مفتاح API الصح:', 'The right place for an API key:'), o: [B('متغير بيئة', 'an environment variable'), B('جوه الكود', 'inside the code'), B('في اسم الملف', 'in the file name')], a: 0, why: B('عشان ميترفعش على GitHub.', 'So it never reaches GitHub.') },
        { q: B('`groupby` لازم قبلها:', '`groupby` needs, before it:'), o: [B('ترتيب بنفس المفتاح', 'sorting by the same key'), B('set', 'a set'), B('JSON', 'JSON')], a: 0, why: B('بتجمّع المتتالي بس.', 'It groups consecutive items only.') },
        { q: B('`list(islice("abcdef", 2))`:', '`list(islice("abcdef", 2))`:'), o: ['["a", "b"]', '"ab"', '["c", "d", "e", "f"]'], a: 0, why: B('أول اتنين.', 'The first two.') }
      ] },

    { title: B('pip وPyPI', 'pip and PyPI'),
      goal: B('تثبّت حزم من PyPI بـ pip، وتحدد الإصدارات في requirements.txt، وتتأكد إن الحزمة موثوقة قبل ما تثبّتها.', 'Install packages from PyPI with pip, pin versions in requirements.txt, and check a package is trustworthy before installing it.'),
      learn: [
        { h: B('التثبيت', 'Installing'),
          p: B('PyPI مخزن حزم Python (أكتر من نص مليون حزمة). `python -m pip install requests` بيثبّت (استخدم `python -m pip` عشان يثبّت لنفس الـ Python اللي بتشغّله). `pip list` المتثبت، `pip show requests` تفاصيل، `pip install -U requests` تحديث، `pip uninstall` مسح.', 'PyPI is the Python package store (over half a million packages). `python -m pip install requests` installs one (use `python -m pip` so it installs for the same Python you run). `pip list` shows what is installed, `pip show requests` the details, `pip install -U requests` updates, `pip uninstall` removes.'),
          ex: 'python -m pip install requests\npython -m pip install "openpyxl>=3.1"\npython -m pip list\npython -m pip show requests\npython -m pip install -U requests' },
        { h: B('requirements.txt', 'requirements.txt'),
          p: B('ملف فيه الحزم اللي مشروعك محتاجها، سطر لكل حزمة: `requests==2.32.3` (إصدار مثبّت بالظبط) أو `requests>=2.31` (من إصدار وطالع). أي حد (أو سيرفر) يثبّت نفس البيئة بـ `pip install -r requirements.txt`. `pip freeze` بيطبع كل اللي متثبت بإصداراته.', 'A file listing what your project needs, one package per line: `requests==2.32.3` (an exact pinned version) or `requests>=2.31` (that version or newer). Anyone (or any server) installs the same setup with `pip install -r requirements.txt`. `pip freeze` prints everything installed with versions.'),
          ex: '# requirements.txt\nrequests==2.32.3\nopenpyxl==3.1.5\npython-dotenv>=1.0\n\n# install it all\npython -m pip install -r requirements.txt\n\n# save what you have now\npython -m pip freeze > requirements.txt', show: 1 },
        { h: B('ثبّت بحذر', 'Install with care'),
          p: B('الحزمة كود بيتشغّل على جهازك بصلاحياتك. قبل ما تثبّت: الاسم مكتوب صح؟ (فيه حزم خبيثة بأسماء شبه المشهورة زي `reqeusts`)، صفحتها على pypi.org فيها رابط الكود وتحديثات حديثة وتحميلات كتير؟ والتوثيق الرسمي بيقول تثبّت إيه بالظبط.', 'A package is code that runs on your machine with your permissions. Before installing: is the name spelt right? (malicious packages copy famous names, like `reqeusts`). Does its pypi.org page link to the source, show recent releases and many downloads? And what exactly do the official docs tell you to install?'),
          ex: 'python -m pip install reqeusts    # typo: never install a misspelt name\npython -m pip index versions requests   # list the published versions\npython -m pip install requests==2.32.3   # pin what you tested' }
      ],
      practice: [
        B('ثبّت `requests` و`rich` وشغّل `pip show` على الاتنين.', 'Install `requests` and `rich` and run `pip show` on both.'),
        B('اعمل `requirements.txt` لمشروعك بإصدارات مثبّتة.', 'Write a `requirements.txt` for your project with pinned versions.'),
        B('افتح صفحة `requests` على pypi.org ولاقي: آخر إصدار، ورابط الكود، والرخصة.', 'Open the `requests` page on pypi.org and find the latest version, the source link and the licence.'),
        B('استخدم `rich` تطبع جدول ملوّن صغير (من التوثيق بتاعه).', 'Use `rich` to print a small coloured table (from its docs).')
      ],
      code: [
        { u: B('جدول بـ rich (بعد التثبيت)', 'A table with rich (after installing)'), p: '# python -m pip install rich\nfrom rich.console import Console\nfrom rich.table import Table\n\ntable = Table(title="Orders")\ntable.add_column("ID")\ntable.add_column("Customer")\ntable.add_column("Total", justify="right")\ntable.add_row("1042", "Sara", "1,200.00")\ntable.add_row("1043", "Omar", "450.50")\nConsole().print(table)' }
      ],
      words: [
        { t: 'package', m: B('حزمة: مكتبة جاهزة بتثبّتها (فولدر موديولات)', 'a ready library you install (a folder of modules)'), ex: 'requests, openpyxl' },
        { t: 'PyPI', m: B('المخزن الرسمي لحزم Python', 'the official store of Python packages'), ex: 'pypi.org/project/requests' },
        { t: 'pip', m: B('أداة تثبيت الحزم من PyPI', 'the tool that installs packages from PyPI'), ex: 'python -m pip install requests' },
        { t: 'requirements.txt', m: B('ملف بقايمة الحزم وإصداراتها للمشروع', 'a file listing a project’s packages and versions'), ex: 'requests==2.32.3' },
        { t: 'version pinning', m: B('تحديد إصدار بالظبط عشان النتيجة تتكرر', 'fixing an exact version so results are repeatable'), ex: 'openpyxl==3.1.5' },
        { t: 'dependency', m: B('حزمة مشروعك (أو حزمة تانية) محتاجها عشان يشتغل', 'a package your project (or another package) needs to run'), ex: 'requests depends on urllib3' },
        { t: 'typosquatting', m: B('حزمة خبيثة باسم شبه حزمة مشهورة', 'a malicious package named like a famous one'), ex: 'reqeusts instead of requests' }
      ],
      read: [{ lib: 'Python Packaging User Guide', what: B('اقرا Installing Packages لحد Requirements files.', 'Read Installing Packages up to Requirements files.') }, { lib: 'Automate the Boring Stuff with Python', what: B('الملحق A: Installing Third-Party Packages.', 'Appendix A: Installing Third-Party Packages.') }],
      challenge: B('اختار 3 حزم هتحتاجها في الرحلة (requests وopenpyxl وbeautifulsoup4)، وثبّتها، واكتب لكل واحدة سطرين: بتعمل إيه، وآخر إصدار، ورابط توثيقها الرسمي.', 'Choose 3 packages you will need on the journey (requests, openpyxl and beautifulsoup4), install them, and write two lines for each: what it does, its latest version and its official docs link.'),
      quiz: [
        { q: B('ليه `python -m pip` بدل `pip` لوحدها؟', 'Why `python -m pip` rather than plain `pip`?'), o: [B('بيثبّت لنفس الـ Python اللي بتشغّله', 'it installs for the same Python you run'), B('أسرع', 'it is faster'), B('مفيش فرق خالص', 'there is no difference at all')], a: 0, why: B('ممكن يكون عندك أكتر من Python.', 'You may have more than one Python.') },
        { q: B('`pip install -r requirements.txt`:', '`pip install -r requirements.txt`:'), o: [B('يثبّت كل اللي في الملف', 'installs everything in the file'), B('يمسح الحزم', 'removes packages'), B('يعمل الملف', 'creates the file')], a: 0, why: B('-r = اقرا من ملف.', '-r = read from a file.') },
        { q: B('`requests==2.32.3` معناها:', '`requests==2.32.3` means:'), o: [B('الإصدار ده بالظبط', 'exactly this version'), B('الإصدار ده أو أحدث', 'this version or newer'), B('أي إصدار', 'any version')], a: 0, why: B('== تثبيت.', '== pins it.') }
      ] },

    { title: B('البيئات الافتراضية: venv وuv', 'Virtual environments: venv and uv'),
      goal: B('تعمل بيئة مستقلة لكل مشروع بـ venv وتفعّلها، وتختارها في VS Code، وتجرّب uv الأسرع وpyproject.toml.', 'Create an isolated environment per project with venv and activate it, select it in VS Code, and try the faster uv and pyproject.toml.'),
      learn: [
        { h: B('ليه بيئة لكل مشروع؟', 'Why an environment per project?'),
          p: B('مشروع A محتاج إصدار قديم من مكتبة ومشروع B محتاج الجديد. لو كله متثبت في Python الأساسي هيتخانقوا. البيئة الافتراضية فولدر (عادة `.venv`) فيه Python وحزم خاصة بالمشروع ده بس، ومبيترفعش على Git.', 'Project A needs an old version of a library and project B the new one. Installed into the main Python they clash. A virtual environment is a folder (usually `.venv`) with a Python and packages for that project only, and it is never committed to Git.'),
          ex: 'cd my-project\npython -m venv .venv\n\n# activate it\n.venv\\Scripts\\Activate.ps1      # Windows PowerShell\nsource .venv/bin/activate        # macOS / Linux\n\n(.venv) python -m pip install requests\ndeactivate' },
        { h: B('VS Code والبيئة', 'VS Code and the environment'),
          p: B('بعد ما تعمل `.venv` افتح الفولدر في VS Code، وCtrl+Shift+P → «Python: Select Interpreter» واختار اللي جوه `.venv`. الطرفية الجديدة هتفعّلها لوحدها، وزرار ▶ هيستخدمها. لو PowerShell رفض التفعيل: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` مرة واحدة.', 'After creating `.venv`, open the folder in VS Code, then Ctrl+Shift+P → «Python: Select Interpreter» and pick the one inside `.venv`. New terminals activate it by themselves and the ▶ button uses it. If PowerShell refuses to activate: run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.'),
          ex: 'import sys\nprint(sys.prefix)        # the .venv folder when active\nprint(sys.executable)    # which python.exe runs this', run: 1 },
        { h: B('uv: كل ده في أداة واحدة سريعة', 'uv: all of it in one fast tool'),
          p: B('`uv` بيعمل البيئة ويثبّت الحزم ويجيب إصدار Python نفسه، وأسرع من pip بكتير. `uv init` يعمل مشروع بملف `pyproject.toml`، `uv add requests` يثبّت ويسجّل، `uv run main.py` يشغّل جوه البيئة من غير تفعيل، و`uv.lock` بيثبّت الإصدارات بالظبط.', '`uv` creates the environment, installs packages and even fetches Python itself, much faster than pip. `uv init` creates a project with a `pyproject.toml`, `uv add requests` installs and records it, `uv run main.py` runs inside the environment with no activation, and `uv.lock` pins the exact versions.'),
          ex: 'uv init sales-report\ncd sales-report\nuv add requests openpyxl\nuv run main.py\n\n# pyproject.toml (made by uv)\n[project]\nname = "sales-report"\nrequires-python = ">=3.12"\ndependencies = ["openpyxl>=3.1.5", "requests>=2.32.3"]' }
      ],
      practice: [
        B('اعمل فولدر مشروع جديد وجواه `.venv`، وفعّلها، وثبّت `requests` جواها بس.', 'Create a new project folder with a `.venv`, activate it and install `requests` inside it only.'),
        B('اتأكد إن `requests` مش موجودة برّه البيئة (`deactivate` وبعدين `import requests`).', 'Check that `requests` is not available outside it (`deactivate`, then `import requests`).'),
        B('اختار البيئة في VS Code وشغّل المثال اللي بيطبع `sys.prefix` جوه وبرّه.', 'Select the environment in VS Code and run the `sys.prefix` example inside and outside it.'),
        B('ثبّت uv من موقعه الرسمي واعمل مشروع بـ `uv init` وزوّد حزمة بـ `uv add`.', 'Install uv from its official site, create a project with `uv init` and add a package with `uv add`.')
      ],
      code: [
        { u: B('خطوات أي مشروع جديد (venv)', 'Steps for any new project (venv)'), p: 'mkdir invoice-bot && cd invoice-bot\npython -m venv .venv\n.venv\\Scripts\\Activate.ps1\npython -m pip install -U pip\npython -m pip install requests python-dotenv\npython -m pip freeze > requirements.txt\necho .venv/ >> .gitignore' }
      ],
      words: [
        { t: 'virtual environment', m: B('فولدر فيه Python وحزم خاصة بمشروع واحد', 'a folder with a Python and packages for one project'), ex: '.venv' },
        { t: 'venv', m: B('موديول Python اللي بيعمل البيئات الافتراضية', 'the Python module that creates virtual environments'), ex: 'python -m venv .venv' },
        { t: 'activate', m: B('تفعيل البيئة عشان python وpip يشاوروا عليها', 'switching on an environment so python and pip point to it'), ex: 'source .venv/bin/activate' },
        { t: 'interpreter path', m: B('مكان ملف python اللي بيشغّل الكود', 'the location of the python program that runs the code'), ex: 'sys.executable' },
        { t: 'uv', m: B('أداة سريعة للبيئات والحزم وإصدارات Python', 'a fast tool for environments, packages and Python versions'), ex: 'uv add requests' },
        { t: 'pyproject.toml', m: B('ملف إعدادات المشروع الحديث: الاسم والحزم والأدوات', 'the modern project settings file: name, packages and tools'), ex: 'dependencies = ["requests"]' },
        { t: 'lock file', m: B('ملف بيسجّل الإصدارات بالظبط عشان التثبيت يتكرر', 'a file recording exact versions so installs repeat'), ex: 'uv.lock' }
      ],
      read: ['lib:venv — Virtual environments', { lib: 'uv documentation', what: B('اقرا Getting started وWorking on projects.', 'Read Getting started and Working on projects.') }],
      challenge: B('اعمل نفس المشروع مرتين: مرة بـ venv + requirements.txt ومرة بـ uv + pyproject.toml، وقيس وقت تثبيت `pandas` في الاتنين، واكتب رأيك في سطرين.', 'Set up the same project twice: once with venv + requirements.txt and once with uv + pyproject.toml, time installing `pandas` in both, and write your view in two lines.'),
      quiz: [
        { q: B('فولدر `.venv` المفروض:', 'The `.venv` folder should be:'), o: [B('يتحط في .gitignore', 'listed in .gitignore'), B('يترفع على GitHub', 'pushed to GitHub'), B('يتنسخ لكل مشروع', 'copied to every project')], a: 0, why: B('بيتعمل من جديد من requirements أو pyproject.', 'It is rebuilt from requirements or pyproject.') },
        { q: B('`uv run main.py`:', '`uv run main.py`:'), o: [B('يشغّل جوه بيئة المشروع من غير تفعيل', 'runs inside the project environment without activation'), B('يثبّت uv', 'installs uv'), B('يعمل ملف main.py', 'creates main.py')], a: 0, why: B('uv بيدير البيئة بنفسه.', 'uv manages the environment itself.') },
        { q: B('إزاي تعرف أنهي Python بيشغّل الكود؟', 'How do you see which Python runs your code?'), o: ['sys.executable', 'pip list', 'python --help'], a: 0, why: B('بيطبع المسار.', 'It prints the path.') }
      ] },

    { title: B('هيكل المشروع والأسرار وGit', 'Project layout, secrets and Git'),
      goal: B('تنظّم المشروع في package بـ `__init__.py`، وتحط الأسرار في `.env` وتقراها بـ python-dotenv، وتجهّز `.gitignore` وREADME.', 'Organise a project as a package with `__init__.py`, keep secrets in `.env` read with python-dotenv, and prepare `.gitignore` and a README.'),
      learn: [
        { h: B('package = فولدر موديولات', 'A package is a folder of modules'),
          p: B('فولدر فيه `__init__.py` (ممكن يكون فاضي) بيبقى package تستورد منه: `from mytools.text import clean_phone`. جوه الـ package تقدر تستخدم import نسبي: `from .text import clean_phone`. ده الشكل اللي هتلاقيه في أي مشروع حقيقي.', 'A folder with an `__init__.py` (it may be empty) becomes a package you import from: `from mytools.text import clean_phone`. Inside the package you can use relative imports: `from .text import clean_phone`. Every real project looks like this.'),
          ex: 'invoice-bot/\n├── .venv/              (not in Git)\n├── .env               (secrets, not in Git)\n├── .gitignore\n├── README.md\n├── requirements.txt\n├── main.py\n└── mytools/\n    ├── __init__.py\n    ├── text.py\n    └── money.py' },
        { h: B('الأسرار في .env', 'Secrets in .env'),
          p: B('عمرك ما تكتب API key أو باسورد في الكود: هيوصل GitHub وكل اللي يشوف الكود هيشوفه. حطه في ملف `.env` (`API_KEY=...`)، وضيف `.env` لـ `.gitignore`، واقراه بـ `load_dotenv()` وبعدين `os.environ`. اعمل `.env.example` بالأسماء من غير القيم عشان الناس تعرف تملاه.', 'Never write an API key or password in code: it will reach GitHub and anyone who sees the code sees it. Put it in a `.env` file (`API_KEY=...`), add `.env` to `.gitignore`, and read it with `load_dotenv()` then `os.environ`. Ship a `.env.example` with the names but no values so others know what to fill in.'),
          ex: '# .env  (never committed)\nSHOP_API_KEY=demo-key-not-real-123\nSMTP_PASSWORD=change-me\n\n# main.py\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()\napi_key = os.environ["SHOP_API_KEY"]\nprint("key loaded:", api_key[:4] + "…")', show: 1 },
        { h: B('.gitignore وREADME', '.gitignore and README'),
          p: B('`.gitignore` بيقول لـ Git يتجاهل إيه: `.venv/` و`.env` و`__pycache__/` وملفات الناتج. وREADME.md أول حاجة حد بيقراها: المشروع بيعمل إيه، وإزاي تثبّته، وإزاي تشغّله، وأمثلة. Git بالتفصيل في رحلة n8n أسبوع 2.', '`.gitignore` tells Git what to ignore: `.venv/`, `.env`, `__pycache__/` and output files. README.md is the first thing anyone reads: what the project does, how to install it, how to run it, and examples. Git in depth is in week 2 of the n8n journey.'),
          ex: '# .gitignore\n.venv/\n.env\n__pycache__/\n*.pyc\noutput/\n\n# README.md\n# Invoice bot\nSends the monthly invoices by email.\n## Setup\npython -m venv .venv\npip install -r requirements.txt\ncp .env.example .env   # then fill it in\n## Run\npython main.py --month 2026-09' }
      ],
      practice: [
        B('حوّل `text_tools.py` لـ package اسمه `mytools` فيه موديولين واستورد منه.', 'Turn `text_tools.py` into a package called `mytools` with two modules and import from it.'),
        B('ثبّت `python-dotenv` واقرا قيمة تجريبية من `.env` (مش مفتاح حقيقي).', 'Install `python-dotenv` and read a test value from `.env` (not a real key).'),
        B('اكتب `.gitignore` و`.env.example` وREADME لمشروعك.', 'Write a `.gitignore`, a `.env.example` and a README for your project.'),
        B('اعمل `git init` و`git status` واتأكد إن `.env` و`.venv` مش ظاهرين.', 'Run `git init` and `git status` and confirm `.env` and `.venv` do not show up.')
      ],
      code: [
        { u: B('إعدادات من البيئة بقيم افتراضية', 'Settings from the environment with defaults'), p: 'import os\n\nclass Settings:\n    api_url = os.environ.get("SHOP_API_URL", "https://jsonplaceholder.typicode.com")\n    timeout = float(os.environ.get("TIMEOUT", "10"))\n    debug = os.environ.get("DEBUG", "0") == "1"\n\nprint(Settings.api_url, Settings.timeout, Settings.debug)', run: 1 }
      ],
      words: [
        { t: '__init__.py', m: B('الملف اللي بيخلي الفولدر package', 'the file that makes a folder a package'), ex: 'mytools/__init__.py' },
        { t: 'relative import', m: B('استيراد من نفس الـ package بنقطة', 'importing from the same package with a dot'), ex: 'from .text import clean_phone' },
        { t: '.env file', m: B('ملف أسرار وإعدادات بيتقري في البيئة ومبيترفعش', 'a file of secrets and settings loaded into the environment, never committed'), ex: 'API_KEY=...' },
        { t: 'python-dotenv', m: B('حزمة بتقرا .env وتحطه في os.environ', 'a package that loads .env into os.environ'), ex: 'load_dotenv()' },
        { t: '.gitignore', m: B('ملف بيقول لـ Git يتجاهل ملفات معيّنة', 'a file telling Git which files to ignore'), ex: '.venv/\n.env' },
        { t: 'README', m: B('ملف الشرح الأساسي للمشروع', 'the main explanation file of a project'), ex: 'README.md' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 6.4 Packages.', 'Read 6.4 Packages.') }, { lib: 'The Twelve-Factor App', what: B('اقرا III. Config بس.', 'Read only III. Config.') }],
      challenge: B('جهّز «قالب مشروع» خاص بيك (فولدر فيه .gitignore و.env.example وREADME وrequirements.txt وpackage فاضي وmain.py بـ main()) وارفعه على GitHub كـ template repository.', 'Prepare your own «project template» (a folder with .gitignore, .env.example, README, requirements.txt, an empty package and a main.py with main()) and push it to GitHub as a template repository.'),
      quiz: [
        { q: B('API key المفروض يبقى في:', 'An API key belongs in:'), o: [B('.env ومتجاهل في Git', '.env, ignored by Git'), B('main.py', 'main.py'), B('README', 'the README')], a: 0, why: B('عشان ميتسربش.', 'So it never leaks.') },
        { q: B('الفولدر يبقى package لما يكون فيه:', 'A folder is a package when it has:'), o: ['__init__.py', 'main.py', 'README.md'], a: 0, why: B('ده التعريف التقليدي.', 'That is the classic definition.') },
        { q: B('`.env.example` فايدته:', 'What `.env.example` is for:'), o: [B('يوضح أسماء المتغيرات المطلوبة من غير قيم', 'shows the needed variable names without values'), B('نسخة احتياطية من الأسرار', 'a backup of the secrets'), B('بيتقري بدل .env', 'it is read instead of .env')], a: 0, why: B('دليل للي هيشغّل المشروع.', 'A guide for whoever runs the project.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تحوّل أدواتك لمشروع مرتب ببيئة وحزم وأسرار مظبوطة، وتعدّي اختبار الأسبوع.', 'Turn your tools into a tidy project with a proper environment, packages and secrets, and pass the weekly test.'),
      review: [
        B('أشكال import، وموديولاتك، والـ shadowing، و`__name__`.', 'The forms of import, your own modules, shadowing and `__name__`.'),
        B('os.environ وsys.argv وitertools وfunctools وstatistics.', 'os.environ, sys.argv, itertools, functools and statistics.'),
        B('pip وPyPI وrequirements.txt والتثبيت بحذر.', 'pip, PyPI, requirements.txt and careful installs.'),
        B('venv والتفعيل وVS Code، وuv وpyproject.toml.', 'venv, activation and VS Code, and uv and pyproject.toml.'),
        B('الـ package و`__init__.py` و.env و.gitignore وREADME.', 'Packages, `__init__.py`, .env, .gitignore and the README.')
      ],
      project: B('**مكتبة أدواتك** (`mytools`): مشروع بـ uv (أو venv) فيه package `mytools` بموديولات `text` (دوال التنضيف) و`money` (format_money وVAT بـ Decimal) و`dates` (parse_date بترجّع None لو غلط). `cli.py` بياخد أمر من `sys.argv` (`clean-phone 010-123` أو `vat 100`) ويطبع النتيجة، ولو الأمر غلط يطبع المساعدة ويخرج بـ `sys.exit(1)`. ملف `tests.py` فيه 15 assert. والمشروع فيه `.gitignore` و`.env.example` (`DEFAULT_VAT=0.14` يتقري بـ dotenv) وREADME بأمثلة، ومرفوع على GitHub من غير أي سر.', '**Your tools library** (`mytools`): a uv (or venv) project with a `mytools` package containing `text` (the cleaning functions), `money` (format_money and VAT with Decimal) and `dates` (parse_date returning None when invalid). `cli.py` takes a command from `sys.argv` (`clean-phone 010-123` or `vat 100`) and prints the result, printing help and exiting with `sys.exit(1)` on a wrong command. `tests.py` has 15 asserts. The project has `.gitignore`, `.env.example` (`DEFAULT_VAT=0.14`, read with dotenv) and a README with examples, and is pushed to GitHub with no secret in it.'),
      test: [
        { q: B('`import collections as c` بعدها:', 'After `import collections as c`:'), o: ['c.Counter', 'collections.Counter', 'Counter'], a: 0, why: B('الاسم المختصر بس متاح.', 'Only the alias is available.') },
        { q: B('`ModuleNotFoundError: No module named \'requests\'` الحل الغالب:', 'The usual fix for `ModuleNotFoundError: No module named \'requests\'`:'), o: [B('ثبّتها في البيئة الشغالة', 'install it in the active environment'), B('غيّر اسم الملف', 'rename the file'), B('أعد تشغيل الجهاز', 'restart the computer')], a: 0, why: B('غالبًا مش متثبتة في البيئة دي.', 'It is usually not installed in that environment.') },
        { q: B('`sys.argv[0]` بيكون:', '`sys.argv[0]` is:'), o: [B('اسم السكربت', 'the script name'), B('أول معامل', 'the first argument'), B('إصدار Python', 'the Python version')], a: 0, why: B('المعاملات من [1].', 'Arguments start at [1].') },
        { q: B('`list(batched("abcde", 2))`:', '`list(batched("abcde", 2))`:'), o: ['[("a", "b"), ("c", "d"), ("e",)]', '["ab", "cd", "e"]', '[("a", "b"), ("c", "d")]'], a: 0, why: B('آخر دفعة أقل.', 'The last batch is shorter.') },
        { q: B('`pip freeze`:', '`pip freeze`:'), o: [B('بيطبع الحزم المتثبتة بإصداراتها', 'prints installed packages with versions'), B('بيوقف pip', 'stops pip'), B('بيمسح الحزم', 'removes packages')], a: 0, why: B('بيتحفظ في requirements.txt.', 'Usually saved to requirements.txt.') },
        { q: B('على Windows PowerShell التفعيل:', 'Activation on Windows PowerShell:'), o: ['.venv\\Scripts\\Activate.ps1', 'source .venv/bin/activate', 'venv on'], a: 0, why: B('source للـ Mac/Linux.', 'source is for Mac/Linux.') },
        { q: B('`uv add requests` بيعمل:', '`uv add requests`:'), o: [B('يثبّت ويسجّل في pyproject.toml', 'installs and records it in pyproject.toml'), B('يثبّت بس', 'only installs'), B('يعمل venv بس', 'only makes a venv')], a: 0, why: B('التثبيت والتسجيل مع بعض.', 'Install and record together.') },
        { q: B('`from .money import vat` النقطة معناها:', 'In `from .money import vat` the dot means:'), o: [B('من نفس الـ package', 'from the same package'), B('من الفولدر الأب', 'from the parent folder'), B('ملف مخفي', 'a hidden file')], a: 0, why: B('import نسبي.', 'A relative import.') },
        { q: B('أنهي ملف ميترفعش على GitHub؟', 'Which file must not go to GitHub?'), o: ['.env', '.env.example', 'requirements.txt'], a: 0, why: B('فيه الأسرار.', 'It holds the secrets.') },
        { q: B('`@lru_cache` مفيد لما:', '`@lru_cache` helps when:'), o: [B('دالة بطيئة بتتنادى بنفس القيم كتير', 'a slow function is called with the same values a lot'), B('الدالة بتطبع', 'the function prints'), B('الدالة بتكتب ملفات', 'the function writes files')], a: 0, why: B('بيرجّع النتيجة المحفوظة.', 'It returns the saved result.') },
        { q: B('حزمة اسمها شبه حزمة مشهورة بحرف:', 'A package named like a famous one but one letter off:'), o: [B('خطر محتمل؛ متثبّتهاش', 'a likely danger; do not install it'), B('نسخة أسرع', 'a faster copy'), B('نفس الحزمة', 'the same package')], a: 0, why: B('typosquatting.', 'Typosquatting.') },
        { q: B('أول حاجة في README:', 'The first thing in a README:'), o: [B('المشروع بيعمل إيه', 'what the project does'), B('رخصة الخط', 'the font licence'), B('كل الكود', 'all of the code')], a: 0, why: B('القارئ عايز يعرف هو فين.', 'Readers want to know where they are.') }
      ] }
  ]
};
