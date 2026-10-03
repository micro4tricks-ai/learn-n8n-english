// Python week 28 — Packaging, publishing on PyPI and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('التغليف والنشر على PyPI ومشروع الشهر', 'Packaging, publishing on PyPI and the month project'),
  goal: B('تحوّل كودك لحزمة حقيقية: هيكل src، وpyproject كامل، وأمر في الطرفية، وبناء wheel، ونشر على TestPyPI ثم PyPI من GitHub Actions، وصيانة بإصدارات وتحذيرات.',
          'Turn your code into a real package: an src layout, a complete pyproject, a terminal command, building a wheel, publishing to TestPyPI then PyPI from GitHub Actions, and maintaining it with versions and warnings.'),
  days: [
    { title: B('هيكل الحزمة', 'The package layout'),
      goal: B('تنظّم مشروع بايثون كحزمة قابلة للتثبيت.', 'Organise a Python project as an installable package.'),
      learn: [
        L(B('src layout', 'The src layout'),
          B('**src layout**: الكود جوه `src/اسم_الحزمة/`، والاختبارات في `tests/`. الميزة: الاختبارات بتشتغل على الحزمة **المتثبتة** مش الملفات اللي جنبها، فبتكتشف ملفات ناقصة من التغليف بدري.', 'The **src layout**: the code lives in `src/package_name/`, the tests in `tests/`. The benefit: tests run against the **installed** package, not the files next to them, so you catch files missing from the package early.'),
          'egypt-phone/\n├── pyproject.toml\n├── README.md\n├── LICENSE\n├── src/\n│   └── egypt_phone/\n│       ├── __init__.py\n│       ├── core.py\n│       └── cli.py\n└── tests/\n    └── test_core.py', T),
        L(B('pyproject.toml كامل', 'A complete pyproject.toml'),
          B('ملف واحد فيه كل حاجة (PEP 621): الاسم، الإصدار، الوصف، الـ README، الرخصة، إصدار بايثون المطلوب، الاعتماديات، و**build backend** (مثلًا hatchling). ومنه بتتبني الحزمة وبتتنشر.', 'One file holds everything (PEP 621): the name, version, description, README, licence, required Python version, dependencies, and the **build backend** (e.g. hatchling). The package is built and published from it.'),
          '[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "egypt-phone"\nversion = "0.1.0"\ndescription = "Clean and validate Egyptian mobile numbers"\nreadme = "README.md"\nlicense = "MIT"\nrequires-python = ">=3.10"\ndependencies = []\n\n[project.scripts]\negypt-phone = "egypt_phone.cli:main"', T),
        L(B('التثبيت للتطوير', 'Installing for development'),
          B('`pip install -e .` (**editable install**) بيثبّت الحزمة بحيث أي تعديل في `src/` يظهر على طول من غير إعادة تثبيت. وفي `__init__.py` حدد الواجهة العامة: اللي الناس تعمله import.', '`pip install -e .` (an **editable install**) installs the package so that any change in `src/` shows up immediately, without reinstalling. In `__init__.py`, define the public interface: what people import.'),
          '# src/egypt_phone/__init__.py\nfrom .core import to_e164, is_valid\n__all__ = ["to_e164", "is_valid"]\n__version__ = "0.1.0"\n\n$ pip install -e .\n$ python -c "import egypt_phone; print(egypt_phone.to_e164(\'010 1234 5678\'))"', T)
      ],
      practice: [
        B('حوّل سكربت مفيد عندك لحزمة بـ src layout.', 'Turn a useful script of yours into a package with the src layout.'),
        B('اكتب pyproject.toml كامل.', 'Write a complete pyproject.toml.'),
        B('ثبّته بـ pip install -e واستورده من فولدر تاني.', 'Install it with pip install -e and import it from another folder.'),
        B('حدد الواجهة العامة في __init__.py.', 'Define the public interface in __init__.py.')
      ],
      words: [
        W('src layout', 'هيكل الكود جوه فولدر src', 'a layout with the code inside an src folder', 'The src layout catches packaging mistakes.'),
        W('build backend', 'الأداة اللي بتبني الحزمة', 'the tool that builds the package', 'We use hatchling as the build backend.'),
        W('editable install', 'تثبيت التعديلات بتظهر فيه على طول', 'an install where code changes show immediately', 'Use an editable install while developing.'),
        W('public interface', 'اللي المستخدم المفروض يستخدمه من الحزمة', 'what users are meant to use from a package', 'Keep the public interface small.'),
        W('__all__', 'قايمة الأسماء العامة في الموديول', 'the list of public names in a module', '__all__ lists to_e164 and is_valid.')
      ],
      read: ['lib:Python Packaging User Guide', { lib: 'uv documentation', what: B('اقرا «Building and publishing a package».', 'Read «Building and publishing a package».') }],
      challenge: B('اعمل حزمة `egypt-phone` (أو حاجة مفيدة ليك) بـ src layout، pyproject كامل، واجهة عامة، اختبارات pytest، واتأكد إنها بتشتغل بعد pip install -e.', 'Create an `egypt-phone` package (or something useful to you) with the src layout, a complete pyproject, a public interface and pytest tests, and check it works after pip install -e.'),
      quiz: [
        Q(B('ميزة src layout:', 'The benefit of the src layout:'), [['الاختبارات بتختبر الحزمة المتثبتة', 'tests test the installed package'], ['أسرع', 'faster'], ['أقل ملفات', 'fewer files']], 0, B('تكتشف النواقص.', 'Catches missing files.')),
        Q(B('pip install -e .:', 'pip install -e .:'), [['تعديلاتك بتظهر من غير إعادة تثبيت', 'your edits show without reinstalling'], ['بيمسح الحزمة', 'removes the package'], ['بينشر على PyPI', 'publishes to PyPI']], 0, B('editable.', 'Editable.')),
        Q(B('[project.scripts] بيعمل:', '[project.scripts] creates:'), [['أمر في الطرفية', 'a terminal command'], ['اختبار', 'a test'], ['رخصة', 'a licence']], 0, B('console script.', 'A console script.'))
      ] },

    { title: B('البناء والإصدارات', 'Building and versions'),
      goal: B('تبني ملفات التوزيع وتدير رقم الإصدار صح.', 'Build the distribution files and manage the version number correctly.'),
      learn: [
        L(B('sdist وwheel', 'sdist and wheel'),
          B('`python -m build` (أو `uv build`) بيطلّع ملفين في `dist/`: **sdist** (الكود المصدري .tar.gz) و**wheel** (.whl جاهز للتثبيت السريع). pip بيفضّل الـ wheel. افتح الـ wheel (هو zip) واتأكد إن كل الملفات جواه.', '`python -m build` (or `uv build`) produces two files in `dist/`: an **sdist** (the source, .tar.gz) and a **wheel** (.whl, ready for fast installation). pip prefers the wheel. Open the wheel (it is a zip) and check every file is inside.'),
          '$ python -m build\nSuccessfully built egypt_phone-0.1.0.tar.gz and egypt_phone-0.1.0-py3-none-any.whl\n$ python -m zipfile -l dist/egypt_phone-0.1.0-py3-none-any.whl', T),
        L(B('مصدر واحد للإصدار', 'One source for the version'),
          B('متكتبش الإصدار في 3 أماكن. خليه في pyproject، واقراه في الكود بـ `importlib.metadata.version("egypt-phone")`. كده `__version__` دايمًا مطابق للحزمة المتثبتة.', 'Do not write the version in 3 places. Keep it in pyproject and read it in code with `importlib.metadata.version("egypt-phone")`. Then `__version__` always matches the installed package.'),
          'from importlib.metadata import version, PackageNotFoundError\n\ntry:\n    __version__ = version("egypt-phone")\nexcept PackageNotFoundError:\n    __version__ = "0.0.0+local"   # running from source without installing\nprint(__version__)', R),
        L(B('أرقام الإصدارات', 'Version numbers'),
          B('semver: `1.4.2` = major.minor.patch. إصلاح ← patch. ميزة من غير ما تكسر ← minor. تغيير بيكسر ← major. قبل 1.0 (`0.x`) المستخدمين متوقعين تغييرات. وPyPI مش بيسمح تنشر نفس الرقم مرتين.', 'Semver: `1.4.2` = major.minor.patch. A fix → patch. A non-breaking feature → minor. A breaking change → major. Before 1.0 (`0.x`), users expect changes. PyPI does not allow publishing the same number twice.'),
          'from packaging.version import Version  # pip install packaging\nVersion("1.10.0") > Version("1.9.3")  # True — not string comparison!', T)
      ],
      practice: [
        B('ابني الحزمة وافتح الـ wheel وشوف محتواه.', 'Build the package, open the wheel and look at its contents.'),
        B('خلّي __version__ يتقري من metadata.', 'Make __version__ read from metadata.'),
        B('حدد رقم الإصدار الجاي لـ 3 تغييرات مختلفة.', 'Decide the next version number for 3 different changes.'),
        B('ثبّت الـ wheel في venv نضيف وجرّبه.', 'Install the wheel in a clean venv and try it.')
      ],
      words: [
        W('sdist', 'توزيع الكود المصدري', 'a source distribution', 'The sdist contains the source files.'),
        W('wheel', 'ملف حزمة جاهز للتثبيت السريع', 'a ready-to-install package file', 'pip installs the wheel quickly.'),
        W('importlib.metadata', 'قراءة معلومات الحزم المتثبتة', 'reading information about installed packages', 'Read the version with importlib.metadata.'),
        W('patch release', 'إصدار إصلاحات بس', 'a release with fixes only', '0.1.1 is a patch release.'),
        W('dist folder', 'فولدر الملفات المبنية للنشر', 'the folder holding built files for publishing', 'Upload everything in the dist folder.')
      ],
      read: ['lib:Python Packaging User Guide', { lib: 'The Python Standard Library', what: B('اقرا importlib.metadata.', 'Read importlib.metadata.') }],
      challenge: B('ابني الحزمة، اتأكد من محتوى الـ wheel، ثبّتها في venv نضيف، وطبّق semver على 3 إصدارات تجريبية (0.1.1، 0.2.0، 1.0.0) بـ CHANGELOG.', 'Build the package, check the wheel’s contents, install it in a clean venv, and apply semver to 3 practice releases (0.1.1, 0.2.0, 1.0.0) with a CHANGELOG.'),
      quiz: [
        Q(B('wheel هو:', 'A wheel is:'), [['ملف جاهز للتثبيت (.whl)', 'a ready-to-install file (.whl)'], ['الكود المصدري', 'the source code'], ['رخصة', 'a licence']], 0, B('أسرع.', 'Faster.')),
        Q(B('ميزة جديدة من غير ما تكسر من 1.4.2:', 'A non-breaking feature after 1.4.2:'), [['1.5.0', '1.5.0'], ['2.0.0', '2.0.0'], ['1.4.3', '1.4.3']], 0, B('minor.', 'Minor.')),
        Q(B('الإصدار يتكتب:', 'The version is written:'), [['في مكان واحد (pyproject)', 'in one place (pyproject)'], ['في كل ملف', 'in every file'], ['مش مهم', 'nowhere']], 0, B('مصدر واحد.', 'One source.'))
      ] },

    { title: B('أدوات سطر الأوامر', 'Command-line tools'),
      goal: B('تحوّل حزمتك لأداة طرفية محترمة.', 'Turn your package into a proper terminal tool.'),
      learn: [
        L(B('console script', 'The console script'),
          B('`[project.scripts]` بيخلّي pip يعمل أمر في الطرفية بيشغّل دالة: `egypt-phone = "egypt_phone.cli:main"`. الدالة `main()` بتقرا المدخلات وترجّع رقم خروج (0 نجاح).', '`[project.scripts]` makes pip create a terminal command that runs a function: `egypt-phone = "egypt_phone.cli:main"`. The `main()` function reads the inputs and returns an exit code (0 = success).'),
          'import argparse, sys\n\ndef to_e164(raw):\n    digits = "".join(c for c in raw if c.isdigit())\n    return "+20" + digits[1:] if digits.startswith("0") and len(digits) == 11 else None\n\ndef main(argv=None) -> int:\n    parser = argparse.ArgumentParser(prog="egypt-phone", description="Clean Egyptian mobile numbers")\n    parser.add_argument("numbers", nargs="+")\n    parser.add_argument("--strict", action="store_true", help="fail on any invalid number")\n    args = parser.parse_args(argv)\n    bad = 0\n    for n in args.numbers:\n        result = to_e164(n)\n        print(f"{n} -> {result or \'invalid\'}")\n        bad += result is None\n    return 1 if args.strict and bad else 0\n\nprint("exit code:", main(["010 1234 5678", "123", "--strict"]))', R),
        L(B('مدخلات من الـ pipe', 'Input from a pipe'),
          B('أداة طرفية محترمة بتقرا من **stdin** لو مفيش مدخلات: `cat numbers.txt | egypt-phone -`. وبتكتب النتايج لـ stdout والأخطاء لـ stderr، عشان تتربط بأدوات تانية (وn8n Execute Command).', 'A proper terminal tool reads from **stdin** when no inputs are given: `cat numbers.txt | egypt-phone -`. It writes results to stdout and errors to stderr, so it chains with other tools (and n8n’s Execute Command).'),
          'import sys\nnumbers = args.numbers if args.numbers != ["-"] else [l.strip() for l in sys.stdin if l.strip()]\nprint("invalid:", n, file=sys.stderr)', T),
        L(B('اختبار الأداة', 'Testing the tool'),
          B('خلّي `main(argv)` تاخد list عشان تختبرها من غير طرفية: `assert main(["010…"]) == 0`. وpytest عنده `capsys` يمسك اللي اتطبع. كده الأداة كلها متغطية باختبارات.', 'Make `main(argv)` accept a list so you can test it without a terminal: `assert main(["010…"]) == 0`. pytest’s `capsys` captures what was printed. The whole tool is then covered by tests.'),
          'def test_strict_fails(capsys):\n    assert main(["123", "--strict"]) == 1\n    assert "invalid" in capsys.readouterr().out', T)
      ],
      practice: [
        B('اعمل console script لحزمتك.', 'Create a console script for your package.'),
        B('ضيف قراءة من stdin بـ «-».', 'Add reading from stdin with «-».'),
        B('اكتب 4 اختبارات لـ main(argv) بـ capsys.', 'Write 4 tests for main(argv) with capsys.'),
        B('نادي الأداة من n8n Execute Command.', 'Call the tool from n8n’s Execute Command.')
      ],
      words: [
        W('console script', 'أمر طرفية بيتعمل من الحزمة', 'a terminal command created by a package', 'pip creates the console script.'),
        W('argv', 'قايمة مدخلات سطر الأوامر', 'the list of command-line arguments', 'Pass argv to main for testing.'),
        W('stdin', 'المدخل القياسي (من pipe مثلًا)', 'standard input (from a pipe, for example)', 'Read numbers from stdin.'),
        W('capsys', 'fixture في pytest بيمسك المطبوع', 'a pytest fixture capturing printed output', 'Check the output with capsys.'),
        W('pipe', 'توصيل خرج أمر لمدخل أمر تاني', 'connecting one command’s output to another’s input', 'cat file | egypt-phone - uses a pipe.')
      ],
      read: ['lib:argparse Tutorial', 'lib:pytest documentation'],
      challenge: B('خلّي حزمتك أداة طرفية كاملة: أوامر ومساعدة واضحة، stdin، رقم خروج صحيح، stderr للأخطاء، و6 اختبارات — وشغّلها من n8n على ملف أرقام.', 'Make your package a complete terminal tool: commands and clear help, stdin, correct exit codes, stderr for errors, and 6 tests — run it from n8n on a file of numbers.'),
      quiz: [
        Q(B('main(argv=None) بتساعد في:', 'main(argv=None) helps with:'), [['الاختبار من غير طرفية', 'testing without a terminal'], ['السرعة', 'speed'], ['الأمان', 'security']], 0, B('ادّيها list.', 'Pass a list.')),
        Q(B('الأخطاء تتكتب لـ:', 'Errors are written to:'), [['stderr', 'stderr'], ['stdout', 'stdout'], ['ملف عشوائي', 'a random file']], 0, B('عشان الـ pipes.', 'For pipes.')),
        Q(B('رقم خروج 1:', 'Exit code 1 means:'), [['فشل', 'failure'], ['نجاح', 'success'], ['مش مهم', 'nothing']], 0, B('0 = نجاح.', '0 = success.'))
      ] },

    { title: B('النشر على PyPI', 'Publishing on PyPI'),
      goal: B('تنشر الحزمة بأمان، والأحسن من GitHub Actions.', 'Publish the package safely, ideally from GitHub Actions.'),
      learn: [
        L(B('TestPyPI الأول', 'TestPyPI first'),
          B('**TestPyPI** نسخة تجريبية من PyPI: انشر عليها الأول، وثبّت منها في venv نضيف، واتأكد إن الـ README بيظهر صح. وبعدين PyPI الحقيقي. فكّر في اسم مش مستخدم واتأكد منه على الموقع.', '**TestPyPI** is a practice copy of PyPI: publish there first, install from it in a clean venv, and check the README renders properly. Then the real PyPI. Choose an unused name and check it on the site.'),
          '$ uv publish --publish-url https://test.pypi.org/legacy/\n$ pip install --index-url https://test.pypi.org/simple/ egypt-phone', T),
        L(B('النشر الموثوق', 'Trusted publishing'),
          B('بدل ما تحفظ API token في GitHub، **trusted publishing**: تربط مشروع PyPI بـ workflow معيّن في الـ repo، وGitHub بيثبت هويته من غير أسرار. كل ما تعمل release (tag)، الـ workflow يبني وينشر لوحده.', 'Instead of storing an API token in GitHub, use **trusted publishing**: link the PyPI project to a specific workflow in the repo, and GitHub proves its identity with no secrets. Each time you create a release (a tag), the workflow builds and publishes by itself.'),
          'on: { release: { types: [published] } }\njobs:\n  publish:\n    runs-on: ubuntu-latest\n    environment: pypi\n    permissions: { id-token: write }\n    steps:\n      - uses: actions/checkout@v4\n      - uses: astral-sh/setup-uv@v6\n      - run: uv build\n      - uses: pypa/gh-action-pypi-publish@release/v1', T),
        L(B('صفحة الحزمة', 'The package page'),
          B('الـ README بيبقى صفحة الحزمة على PyPI (**long description**): وصف في سطر، تثبيت، مثال سريع، ولينك للتوثيق. و**classifiers** في pyproject (إصدارات بايثون، الرخصة، الحالة) بتساعد الناس تلاقيها.', 'The README becomes the package page on PyPI (the **long description**): a one-line description, installation, a quick example and a docs link. **Classifiers** in pyproject (Python versions, licence, status) help people find it.'),
          'classifiers = [\n  "Programming Language :: Python :: 3.12",\n  "License :: OSI Approved :: MIT License",\n  "Development Status :: 4 - Beta",\n]', T)
      ],
      practice: [
        B('اعمل حساب TestPyPI وانشر الحزمة عليه.', 'Create a TestPyPI account and publish the package there.'),
        B('ثبّتها من TestPyPI في venv نضيف.', 'Install it from TestPyPI in a clean venv.'),
        B('اكتب workflow نشر بـ trusted publishing (حتى لو لسه مش هتنشر حقيقي).', 'Write a publish workflow with trusted publishing (even if not publishing for real yet).'),
        B('حسّن الـ README كصفحة حزمة.', 'Improve the README as a package page.')
      ],
      words: [
        W('testpypi', 'نسخة تجريبية من PyPI', 'a practice copy of PyPI', 'Publish to TestPyPI first.'),
        W('trusted publishing', 'النشر من CI من غير tokens محفوظة', 'publishing from CI without stored tokens', 'Trusted publishing removes the API token.'),
        W('long description', 'الوصف الطويل اللي بيظهر في صفحة الحزمة', 'the long text shown on the package page', 'The README is the long description.'),
        W('classifier', 'وسم بيصنّف الحزمة على PyPI', 'a tag classifying a package on PyPI', 'Add a classifier for Python 3.12.'),
        W('twine', 'أداة رفع الحزم على PyPI', 'a tool that uploads packages to PyPI', 'twine upload dist/* publishes it.')
      ],
      read: [{ t: 'PyPI: Trusted publishers', url: 'https://docs.pypi.org/trusted-publishers/', what: B('اقرا الإعداد مع GitHub Actions.', 'Read the setup with GitHub Actions.') }, 'lib:Python Packaging User Guide'],
      challenge: B('انشر حزمتك على TestPyPI، وجهّز workflow نشر موثوق بيشتغل مع كل release، وREADME مناسب لصفحة الحزمة — ولو مستعد، انشر 0.1.0 على PyPI الحقيقي.', 'Publish your package to TestPyPI, set up a trusted-publishing workflow that runs on each release, and a README fit for the package page — and if ready, publish 0.1.0 to the real PyPI.'),
      quiz: [
        Q(B('قبل PyPI الحقيقي:', 'Before the real PyPI:'), [['TestPyPI', 'TestPyPI'], ['مفيش', 'nothing'], ['GitHub Pages', 'GitHub Pages']], 0, B('تجربة.', 'Practice.')),
        Q(B('trusted publishing بيوفّر:', 'Trusted publishing removes:'), [['حفظ tokens كأسرار', 'storing tokens as secrets'], ['الاختبارات', 'tests'], ['الـ README', 'the README']], 0, B('هوية من GitHub.', 'Identity from GitHub.')),
        Q(B('صفحة الحزمة على PyPI من:', 'The PyPI package page comes from:'), [['الـ README', 'the README'], ['الكود', 'the code'], ['الرخصة', 'the licence']], 0, B('long description.', 'The long description.'))
      ] },

    { title: B('صيانة الحزمة', 'Maintaining the package'),
      goal: B('تطوّر الحزمة من غير ما تكسر المستخدمين.', 'Evolve the package without breaking its users.'),
      learn: [
        L(B('تحذير قبل الحذف', 'Warn before removing'),
          B('متشيلش دالة فجأة. في إصدار minor، خليها تطلع **DeprecationWarning** بـ `warnings.warn` وتقول البديل، وشيلها في الإصدار الـ major الجاي. المستخدمين بيشوفوا التحذير في اختباراتهم ويستعدوا.', 'Do not remove a function suddenly. In a minor release, make it emit a **DeprecationWarning** with `warnings.warn` naming the replacement, and remove it in the next major release. Users see the warning in their tests and prepare.'),
          'import warnings\n\ndef clean(number):\n    warnings.warn("clean() is deprecated; use to_e164() instead", DeprecationWarning, stacklevel=2)\n    return number.strip()\n\nwith warnings.catch_warnings(record=True) as caught:\n    warnings.simplefilter("always")\n    clean(" 010 ")\nprint(caught[0].category.__name__, "-", caught[0].message)', R),
        L(B('مصفوفة CI', 'A CI matrix'),
          B('اختبر على كل إصدارات بايثون اللي بتدعمها (**CI matrix**): 3.10 لحد 3.13، وكمان ويندوز ولينكس لو الحزمة بتتعامل مع ملفات. اللي مش مختبر مش مدعوم.', 'Test on every Python version you support (a **CI matrix**): 3.10 to 3.13, plus Windows and Linux if the package deals with files. What is not tested is not supported.'),
          'strategy:\n  matrix:\n    python: ["3.10", "3.11", "3.12", "3.13"]\n    os: [ubuntu-latest, windows-latest]\nsteps:\n  - uses: actions/setup-python@v5\n    with: { python-version: "${{ matrix.python }}" }\n  - run: pip install -e .[test] && pytest', T),
        L(B('المساهمات والإصدارات', 'Contributions and releases'),
          B('ملفات بتسهّل الصيانة: CHANGELOG (Keep a Changelog)، CONTRIBUTING (إزاي تشارك)، قوالب issues، وdependabot للاعتماديات. وكل release: حدّث CHANGELOG، رقم إصدار، tag، والـ workflow ينشر.', 'Files that ease maintenance: a CHANGELOG (Keep a Changelog), CONTRIBUTING (how to contribute), issue templates, and dependabot for dependencies. Each release: update the CHANGELOG, bump the version, tag, and the workflow publishes.'),
          'release checklist: tests green on the matrix → CHANGELOG → version bump → tag v0.2.0 → GitHub release → auto-publish', T)
      ],
      practice: [
        B('ضيف DeprecationWarning لدالة هتتشال.', 'Add a DeprecationWarning to a function you will remove.'),
        B('اعمل CI matrix لـ 3 إصدارات بايثون.', 'Set up a CI matrix for 3 Python versions.'),
        B('اكتب CONTRIBUTING قصير.', 'Write a short CONTRIBUTING file.'),
        B('اعمل release تجريبي بالـ checklist.', 'Do a practice release with the checklist.')
      ],
      words: [
        W('deprecationwarning', 'تحذير إن حاجة هتتشال', 'a warning that something will be removed', 'Raise a DeprecationWarning for one minor release.'),
        W('warnings.warn', 'دالة إطلاق تحذير', 'the function that issues a warning', 'warnings.warn names the replacement.'),
        W('ci matrix', 'تشغيل الاختبارات على تركيبات إصدارات وأنظمة', 'running tests across combinations of versions and systems', 'The CI matrix covers Python 3.10–3.13.'),
        W('supported versions', 'إصدارات بايثون اللي الحزمة بتدعمها', 'the Python versions a package supports', 'List the supported versions in the README.'),
        W('stacklevel', 'بيخلي التحذير يشاور على سطر المستخدم', 'makes a warning point at the caller’s line', 'Use stacklevel=2 in deprecation warnings.')
      ],
      read: ['lib:GitHub Actions: Building and testing Python', { lib: 'The Python Standard Library', what: B('اقرا صفحة warnings.', 'Read the warnings page.') }],
      challenge: B('جهّز حزمتك للصيانة: CI matrix (3 إصدارات × نظامين)، CHANGELOG وCONTRIBUTING، دالة deprecated بتحذير، وrelease 0.2.0 بالـ checklist.', 'Prepare your package for maintenance: a CI matrix (3 versions × two systems), a CHANGELOG and CONTRIBUTING, a deprecated function with a warning, and a 0.2.0 release following the checklist.'),
      quiz: [
        Q(B('عايز تشيل دالة:', 'You want to remove a function:'), [['تحذير في minor ثم حذف في major', 'warn in a minor, remove in a major'], ['امسحها فورًا', 'delete it at once'], ['سيبها للأبد', 'keep it forever']], 0, B('مهلة.', 'A grace period.')),
        Q(B('CI matrix بيختبر:', 'A CI matrix tests:'), [['كل الإصدارات والأنظمة المدعومة', 'every supported version and system'], ['إصدار واحد', 'one version'], ['التوثيق بس', 'only docs']], 0, B('مدعوم = مختبر.', 'Supported = tested.')),
        Q(B('stacklevel=2:', 'stacklevel=2:'), [['التحذير يشاور على سطر المستخدم', 'the warning points to the user’s line'], ['يكرر التحذير', 'repeats the warning'], ['يخفيه', 'hides it']], 0, B('أوضح.', 'Clearer.'))
      ] },

    { title: B('مراجعة الشهر السابع ومشروعه', 'Month 7 review and project'),
      goal: B('بايثون متقدم في حزمة منشورة.', 'Advanced Python in a published package.'),
      review: [
        B('closures وdecorators وgenerators وiterators وfunctools (أسبوع 25).', 'Closures, decorators, generators, iterators and functools (week 25).'),
        B('context managers وdataclasses متقدمة وtyping وmypy (أسبوع 26).', 'Context managers, advanced dataclasses, typing and mypy (week 26).'),
        B('threads وprocesses وasyncio والطوابير (أسبوع 27).', 'Threads, processes, asyncio and queues (week 27).'),
        B('src layout وpyproject والبناء والإصدارات وأداة الطرفية.', 'The src layout, pyproject, building, versions and the terminal tool.'),
        B('النشر الموثوق والصيانة والتحذيرات وCI matrix.', 'Trusted publishing, maintenance, warnings and the CI matrix.')
      ],
      project: B('مشروع الشهر السابع: حزمة أتمتة مفيدة (مثلًا `egypt-phone` أو `n8n-helpers` أو `invoice-tools`) فيها: decorators retry/timed، dataclasses typed بـ mypy strict، جزء async بطابور وعمّال، أداة طرفية بـ stdin، اختبارات pytest، CI matrix، CHANGELOG، ومنشورة على TestPyPI (أو PyPI) بـ trusted publishing.', 'Month 7 project: a useful automation package (e.g. `egypt-phone`, `n8n-helpers` or `invoice-tools`) with: retry/timed decorators, typed dataclasses under mypy strict, an async part with a queue and workers, a terminal tool with stdin, pytest tests, a CI matrix, a CHANGELOG, published to TestPyPI (or PyPI) with trusted publishing.'),
      test: [
        Q(B('nonlocal لـ:', 'nonlocal is for:'), [['تعديل متغير من الدالة الخارجية', 'modifying an outer function’s variable'], ['متغير عام', 'a global variable'], ['import', 'importing']], 0, B('closures.', 'Closures.')),
        Q(B('decorator بمعاملات محتاج:', 'A decorator with arguments needs:'), [['factory', 'a factory'], ['class', 'a class'], ['lambda', 'a lambda']], 0, B('3 طبقات.', '3 layers.')),
        Q(B('@contextmanager: الكود بعد yield:', '@contextmanager: code after yield:'), [['تنضيف', 'clean-up'], ['مش بيتنفّذ', 'never runs'], ['قبل with', 'runs before with']], 0, B('finally.', 'Finally.')),
        Q(B('dataclass frozen:', 'A frozen dataclass:'), [['مينفعش يتعدّل', 'cannot be changed'], ['أبطأ', 'is slower'], ['من غير حقول', 'has no fields']], 0, B('immutable.', 'Immutable.')),
        Q(B('Protocol:', 'Protocol:'), [['توافق بالشكل', 'compatibility by shape'], ['وراثة إجبارية', 'forced inheritance'], ['اختبار', 'a test']], 0, B('structural.', 'Structural.')),
        Q(B('حساب تقيل متوازي:', 'Heavy parallel computation:'), [['ProcessPoolExecutor', 'ProcessPoolExecutor'], ['ThreadPoolExecutor', 'ThreadPoolExecutor'], ['asyncio.sleep', 'asyncio.sleep']], 0, B('GIL.', 'The GIL.')),
        Q(B('asyncio.Semaphore:', 'asyncio.Semaphore:'), [['يحدد المهام المتزامنة', 'limits concurrent tasks'], ['يوقف البرنامج', 'stops the program'], ['يسرّع الحساب', 'speeds up maths']], 0, B('حد.', 'A limit.')),
        Q(B('src layout بيحمي من:', 'The src layout protects against:'), [['ملفات ناقصة من الحزمة', 'files missing from the package'], ['الفيروسات', 'viruses'], ['البطء', 'slowness']], 0, B('اختبار المتثبت.', 'Testing the installed copy.')),
        Q(B('wheel:', 'A wheel is:'), [['ملف تثبيت جاهز', 'a ready install file'], ['الكود المصدري', 'the source'], ['CI', 'CI']], 0, B('.whl.', '.whl.')),
        Q(B('console script بيتعرّف في:', 'A console script is defined in:'), [['[project.scripts]', '[project.scripts]'], ['README', 'README'], ['LICENSE', 'LICENSE']], 0, B('pyproject.', 'pyproject.')),
        Q(B('trusted publishing:', 'Trusted publishing:'), [['نشر من CI من غير tokens', 'publishing from CI without tokens'], ['نشر يدوي', 'manual publishing'], ['نشر على GitHub Pages', 'publishing to GitHub Pages']], 0, B('أمان.', 'Security.')),
        Q(B('دالة هتتشال:', 'A function to be removed:'), [['DeprecationWarning الأول', 'a DeprecationWarning first'], ['حذف فوري', 'immediate deletion'], ['تغيير اسمها سرًا', 'secret renaming']], 0, B('مهلة.', 'A grace period.'))
      ] }
  ]
};
