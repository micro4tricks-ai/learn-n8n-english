// Python week 9 — Files and folders.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الملفات والفولدرات', 'Files and folders'),
  goal: B('تقرا وتكتب ملفات نصية وJSON صح (والعربي سليم)، وتتعامل مع المسارات بـ pathlib، وتنظّم وتنسخ وتنقل فولدرات كاملة بأمان، وتدوّر على ملفات وتكشف المكرر، وتضغط وتفك zip — أول أتمتة حقيقية لشغلك اليومي.',
          'Read and write text and JSON files correctly (with Arabic intact), handle paths with pathlib, organise, copy and move whole folders safely, search files and find duplicates, and zip and unzip — your first real automation of daily work.'),
  days: [
    { title: B('قراءة وكتابة الملفات', 'Reading and writing files'),
      goal: B('تفتح ملف بالوضع الصح والـ encoding الصح جوه with، وتقرا كله أو سطر سطر، وتكتب وتضيف.', 'Open a file with the right mode and encoding inside with, read it whole or line by line, and write or append.'),
      learn: [
        { h: B('open جوه with، ودايمًا utf-8', 'open inside with, always utf-8'),
          p: B('`with open("notes.txt", "w", encoding="utf-8") as f:` الوضع `"w"` يكتب من الأول (بيمسح القديم!)، و`"a"` يضيف في الآخر، و`"r"` يقرا (الافتراضي). اكتب `encoding="utf-8"` دايمًا: من غيرها Windows ممكن يستخدم ترميز تاني ويبوّظ العربي. الأمثلة هنا بتعمل الملفات في ذاكرة المتصفح بس.', '`with open("notes.txt", "w", encoding="utf-8") as f:` — mode `"w"` writes from scratch (it erases the old content!), `"a"` appends, and `"r"` reads (the default). Always write `encoding="utf-8"`: without it Windows may use another encoding and break Arabic. The examples here create files in the browser’s memory only.'),
          ex: 'with open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("first line\\n")\n    f.write("سطر بالعربي\\n")\nwith open("notes.txt", "a", encoding="utf-8") as f:\n    f.write("added later\\n")\nwith open("notes.txt", encoding="utf-8") as f:\n    print(f.read())', run: 1 },
        { h: B('سطر سطر', 'Line by line'),
          p: B('`for line in f:` بيقرا الملف سطر سطر من غير ما يحمّله كله في الذاكرة — مهم لملفات اللوج الكبيرة. كل سطر آخره `\\n`، فاستخدم `line.rstrip("\\n")` أو `strip()`. و`f.read().splitlines()` بترجّع قايمة سطور من غير `\\n`.', '`for line in f:` reads the file line by line without loading it all into memory — important for big log files. Each line ends with `\\n`, so use `line.rstrip("\\n")` or `strip()`. `f.read().splitlines()` returns a list of lines without `\\n`.'),
          ex: 'with open("app.log", "w", encoding="utf-8") as f:\n    f.write("INFO start\\nERROR db timeout\\nINFO sent 40\\nERROR smtp refused\\n")\nerrors = 0\nwith open("app.log", encoding="utf-8") as f:\n    for n, line in enumerate(f, 1):\n        if line.startswith("ERROR"):\n            errors += 1\n            print(n, line.rstrip())\nprint("errors:", errors)', run: 1 },
        { h: B('كتابة قايمة، وprint لملف', 'Writing a list, and print to a file'),
          p: B('`f.writelines(lines)` بتكتب قايمة نصوص (حط `\\n` بنفسك)، والأسهل `"\\n".join(lines)`. و`print(..., file=f)` بتطبع جوه الملف بنفس شكل print. الملفات اللي مش موجودة في وضع `"r"` بتطلّع `FileNotFoundError`.', '`f.writelines(lines)` writes a list of strings (add `\\n` yourself); easier is `"\\n".join(lines)`. `print(..., file=f)` prints into the file just like print. Opening a missing file in `"r"` mode raises `FileNotFoundError`.'),
          ex: 'customers = ["Sara", "Omar", "Mona"]\nwith open("customers.txt", "w", encoding="utf-8") as f:\n    f.write("\\n".join(customers) + "\\n")\n    print("total:", len(customers), file=f)\nprint(open("customers.txt", encoding="utf-8").read())\ntry:\n    open("missing.txt", encoding="utf-8")\nexcept FileNotFoundError as e:\n    print("FileNotFoundError:", e.filename)', run: 1 }
      ],
      practice: [
        B('اكتب ملف `todo.txt` فيه 5 مهام، وبعدين ضيف مهمتين بوضع `"a"`، واطبعه مترقّم.', 'Write a `todo.txt` with 5 tasks, append 2 more with mode `"a"`, and print it numbered.'),
        B('اعمل ملف لوج فيه 20 سطر بمستويات مختلفة، وعدّ كل مستوى بـ Counter.', 'Create a log file with 20 lines of different levels and count each level with Counter.'),
        B('افتح ملف بوضع `"w"` على ملف فيه كلام وشوف إنه اتمسح، عشان متنساش.', 'Open a file that has text in it with mode `"w"` and see it get wiped — so you never forget.'),
        B('اكتب ملف بالعربي من غير encoding على Windows وافتحه، وبعدين بـ utf-8، وقارن.', 'Write an Arabic file without encoding on Windows and open it, then with utf-8, and compare.')
      ],
      code: [
        { u: B('تلخيص ملف لوج', 'Summarising a log file'), p: 'from collections import Counter\nwith open("server.log", "w", encoding="utf-8") as f:\n    f.write("2026-10-01 INFO login\\n2026-10-01 ERROR timeout\\n2026-10-02 WARNING slow\\n2026-10-02 ERROR timeout\\n")\nlevels = Counter()\nwith open("server.log", encoding="utf-8") as f:\n    for line in f:\n        date, level, msg = line.split(maxsplit=2)\n        levels[level] += 1\nprint(dict(levels))', run: 1 }
      ],
      words: [
        { t: 'file mode', m: B('طريقة فتح الملف: r قراءة، w كتابة من جديد، a إضافة', 'how a file is opened: r read, w write fresh, a append'), ex: 'open(p, "a")' },
        { t: 'encoding', m: B('طريقة تحويل الحروف لبايتات في الملف', 'how characters are turned into bytes in a file'), ex: 'encoding="utf-8"' },
        { t: 'UTF-8', m: B('الترميز اللي بيدعم كل اللغات ومنها العربي', 'the encoding that supports every language, including Arabic'), ex: 'open(p, encoding="utf-8")' },
        { t: 'append mode', m: B('فتح الملف للإضافة في آخره من غير مسح', 'opening a file to add at its end without erasing'), ex: 'open("log.txt", "a")' },
        { t: 'FileNotFoundError', m: B('خطأ لما الملف أو الفولدر مش موجود', 'the error when a file or folder does not exist'), ex: 'open("nope.txt")' },
        { t: 'newline character', m: B('\\n اللي في آخر كل سطر في الملف', 'the \\n at the end of each line in a file'), ex: 'line.rstrip("\\n")' }
      ],
      read: [{ lib: 'Python Tutorial (python.org)', what: B('اقرا 7.2 Reading and Writing Files.', 'Read 7.2 Reading and Writing Files.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Reading and Writing Files لحد Saving Variables.', 'The Reading and Writing Files chapter up to saving variables.') }],
      challenge: B('اكتب `grep.py` بسيط: ياخد كلمة واسم ملف من `sys.argv`، ويطبع كل سطر فيه الكلمة (من غير فرق الحروف) برقمه، وفي الآخر عدد السطور، ويطبع رسالة واضحة لو الملف مش موجود ويخرج بكود 1.', 'Write a simple `grep.py`: take a word and a file name from `sys.argv`, print every line containing the word (ignoring case) with its number, then the count, printing a clear message and exiting with code 1 when the file is missing.'),
      quiz: [
        { q: B('`open("data.txt", "w")` على ملف فيه كلام:', '`open("data.txt", "w")` on a file with content:'), o: [B('بيمسح المحتوى', 'erases the content'), B('بيضيف في الآخر', 'appends at the end'), B('بيطلّع خطأ', 'raises an error')], a: 0, why: B('w = كتابة من جديد.', 'w writes from scratch.') },
        { q: B('ليه `encoding="utf-8"`؟', 'Why `encoding="utf-8"`?'), o: [B('عشان العربي ميتبوّظش على أي نظام', 'so Arabic stays intact on any system'), B('عشان الملف يبقى أصغر', 'to make the file smaller'), B('Python بتطلبها', 'Python requires it')], a: 0, why: B('الافتراضي بيختلف من نظام لنظام.', 'The default differs between systems.') },
        { q: B('أنسب طريقة لملف لوج 2 جيجا:', 'The best way to read a 2 GB log file:'), o: ['for line in f:', 'f.read()', 'f.readlines()'], a: 0, why: B('سطر سطر من غير ما يتحمّل كله.', 'Line by line, never loading it all.') }
      ] },

    { title: B('المسارات بـ pathlib', 'Paths with pathlib'),
      goal: B('تبني مسارات صح على أي نظام بـ Path و`/`، وتاخد الاسم والامتداد والفولدر، وتعمل فولدرات، وتدوّر بـ glob.', 'Build correct paths on any system with Path and `/`, get the name, extension and folder, create folders, and search with glob.'),
      learn: [
        { h: B('Path و/', 'Path and /'),
          p: B('`from pathlib import Path` وبعدين `Path("reports") / "2026" / "sales.xlsx"` بيبني المسار بالشرطة الصح لنظامك (\\ على Windows و/ على Linux). `Path.cwd()` الفولدر الحالي، و`Path.home()` فولدر المستخدم، و`p.resolve()` المسار الكامل.', '`from pathlib import Path`, then `Path("reports") / "2026" / "sales.xlsx"` builds the path with the right slash for your system (\\ on Windows and / on Linux). `Path.cwd()` is the current folder, `Path.home()` the user folder, and `p.resolve()` the full path.'),
          ex: 'from pathlib import Path\np = Path("reports") / "2026" / "sales_2026-09.xlsx"\nprint(p)\nprint(p.name, "|", p.stem, "|", p.suffix)\nprint(p.parent, "|", p.parent.name)\nprint(p.with_suffix(".csv"), "|", p.with_name("old.xlsx"))', run: 1 },
        { h: B('فولدرات وملفات', 'Folders and files'),
          p: B('`p.mkdir(parents=True, exist_ok=True)` يعمل الفولدر واللي قبله ومن غير خطأ لو موجود. `p.exists()` و`p.is_file()` و`p.is_dir()` بيسألوا. `p.write_text(...)` و`p.read_text()` بيكتبوا ويقروا ملف في سطر (حط encoding برضه). `p.iterdir()` محتويات الفولدر.', '`p.mkdir(parents=True, exist_ok=True)` creates the folder and its parents with no error if it exists. `p.exists()`, `p.is_file()` and `p.is_dir()` ask questions. `p.write_text(...)` and `p.read_text()` write and read a file in one line (pass encoding here too). `p.iterdir()` lists a folder.'),
          ex: 'from pathlib import Path\nout = Path("output") / "daily"\nout.mkdir(parents=True, exist_ok=True)\nfor day in ["2026-10-01", "2026-10-02"]:\n    (out / f"report_{day}.txt").write_text(f"report for {day}\\n", encoding="utf-8")\nprint(sorted(p.name for p in out.iterdir()))\nprint((out / "report_2026-10-01.txt").read_text(encoding="utf-8"))\nprint(out.exists(), out.is_dir(), (out / "x.txt").exists())', run: 1 },
        { h: B('glob وrglob', 'glob and rglob'),
          p: B('`folder.glob("*.pdf")` كل الـ PDF في الفولدر ده، و`folder.rglob("*.pdf")` في الفولدر وكل اللي جواه. `*` أي حروف، `?` حرف واحد، `[0-9]` رقم. الـ glob حساس للحروف على Linux، فلو مش متأكد افلتر بـ `p.suffix.lower()`.', '`folder.glob("*.pdf")` finds every PDF in that folder, and `folder.rglob("*.pdf")` in it and everything inside. `*` is any characters, `?` one character, `[0-9]` a digit. glob is case-sensitive on Linux, so when unsure filter with `p.suffix.lower()`.'),
          ex: 'from pathlib import Path\nbase = Path("inbox")\nfor name in ["a.pdf", "b.PDF", "notes.txt", "2026/c.pdf", "2026/09/d.pdf"]:\n    f = base / name\n    f.parent.mkdir(parents=True, exist_ok=True)\n    f.write_text("x", encoding="utf-8")\nprint([p.name for p in base.glob("*.pdf")])\nprint(sorted(str(p.relative_to(base)) for p in base.rglob("*") if p.suffix.lower() == ".pdf"))', run: 1 }
      ],
      practice: [
        B('اطبع لـ 5 مسارات: الاسم والامتداد والفولدر الأب، وغيّر امتداد واحد.', 'For 5 paths print the name, extension and parent folder, and change one extension.'),
        B('اعمل هيكل فولدرات `projects/2026/{01..12}` بلوب وmkdir.', 'Create the folder tree `projects/2026/{01..12}` with a loop and mkdir.'),
        B('اطبع كل ملفات `.py` في فولدر الرحلة بتاعك وكل اللي جواه بـ rglob.', 'Print every `.py` file in your journey folder and its subfolders with rglob.'),
        B('اكتب واقرا ملف بـ `write_text` و`read_text` بدل open.', 'Write and read a file with `write_text` and `read_text` instead of open.')
      ],
      code: [
        { u: B('فولدر اليوم للتقارير', 'Today’s report folder'), p: 'from pathlib import Path\nfrom datetime import date\ntoday = date.today()\nfolder = Path("reports") / f"{today:%Y}" / f"{today:%m}"\nfolder.mkdir(parents=True, exist_ok=True)\nreport = folder / f"sales_{today:%Y-%m-%d}.txt"\nreport.write_text("total: 0\\n", encoding="utf-8")\nprint(report, report.exists())', run: 1 }
      ],
      words: [
        { t: 'pathlib', m: B('موديول المسارات الحديث في Python', 'Python’s modern path module'), ex: 'from pathlib import Path' },
        { t: 'absolute path', m: B('مسار كامل من أول الجهاز', 'a full path from the root of the drive'), ex: 'C:\\Users\\me\\report.xlsx' },
        { t: 'relative path', m: B('مسار بالنسبة للفولدر الحالي', 'a path relative to the current folder'), ex: 'reports/2026/sales.xlsx' },
        { t: 'suffix', m: B('امتداد الملف بالنقطة', 'a file’s extension, with the dot'), ex: 'Path("a.pdf").suffix  →  ".pdf"' },
        { t: 'stem', m: B('اسم الملف من غير الامتداد', 'a file name without its extension'), ex: 'Path("a.pdf").stem  →  "a"' },
        { t: 'glob pattern', m: B('نمط بـ * و? لاختيار ملفات', 'a pattern with * and ? to pick files'), ex: '*.pdf' },
        { t: 'rglob', m: B('glob في الفولدر وكل الفولدرات اللي جواه', 'glob in a folder and every folder inside it'), ex: 'Path(".").rglob("*.csv")' }
      ],
      read: ['lib:pathlib', { lib: 'Automate the Boring Stuff with Python', what: B('فصل Reading and Writing Files: جزء Files and File Paths.', 'The Reading and Writing Files chapter: the Files and File Paths part.') }],
      challenge: B('اكتب `tree.py` بيطبع شجرة فولدر (الفولدرات والملفات بمسافات حسب العمق) وجنب كل فولدر عدد الملفات اللي جواه.', 'Write `tree.py` that prints a folder tree (folders and files indented by depth) with the number of files next to each folder.'),
      quiz: [
        { q: B('`Path("a/b/report.xlsx").stem`:', '`Path("a/b/report.xlsx").stem`:'), o: ['"report"', '"report.xlsx"', '".xlsx"'], a: 0, why: B('الاسم من غير امتداد.', 'The name without the extension.') },
        { q: B('`mkdir(parents=True, exist_ok=True)` بيعمل:', '`mkdir(parents=True, exist_ok=True)`:'), o: [B('يعمل الفولدر واللي فوقه ومن غير خطأ لو موجود', 'creates the folder and its parents, no error if it exists'), B('يمسح الفولدر', 'deletes the folder'), B('ينسخ الفولدر', 'copies the folder')], a: 0, why: B('الاتنين بيمنعوا الأخطاء المعتادة.', 'Both prevent the usual errors.') },
        { q: B('عشان تلاقي كل الـ CSV في الفولدرات اللي جوه كمان:', 'To find every CSV, including in subfolders:'), o: ['rglob("*.csv")', 'glob("*.csv")', 'iterdir()'], a: 0, why: B('r = recursive.', 'r = recursive.') }
      ] },

    { title: B('تنظيم الفولدرات بأمان', 'Organising folders safely'),
      goal: B('تنسخ وتنقل وتغيّر أسماء وتمسح بـ shutil وpathlib، ودايمًا بتجرّب بـ dry run الأول، وتعرف حجم وتاريخ أي ملف.', 'Copy, move, rename and delete with shutil and pathlib, always trying a dry run first, and get any file’s size and date.'),
      learn: [
        { h: B('نسخ ونقل وإعادة تسمية', 'Copy, move and rename'),
          p: B('`shutil.copy2(src, dst)` ينسخ الملف ومعاه تاريخه، `shutil.copytree` فولدر كامل، `shutil.move` ينقل (أو يغيّر الاسم)، و`p.rename(new)` يغيّر اسم. خد بالك: لو فيه ملف بنفس الاسم في المكان الجديد ممكن يتكتب فوقه — اسأل بـ `exists()` الأول.', '`shutil.copy2(src, dst)` copies a file with its dates, `shutil.copytree` a whole folder, `shutil.move` moves (or renames), and `p.rename(new)` renames. Careful: a file with the same name at the destination may be overwritten — check with `exists()` first.'),
          ex: 'import shutil\nfrom pathlib import Path\nsrc = Path("invoice.pdf"); src.write_text("pdf", encoding="utf-8")\nPath("archive").mkdir(exist_ok=True)\nshutil.copy2(src, Path("archive") / src.name)\nshutil.move(str(src), "archive/invoice_2026-09.pdf")\nprint(sorted(p.name for p in Path("archive").iterdir()), src.exists())', run: 1 },
        { h: B('dry run قبل أي حاجة خطيرة', 'A dry run before anything risky'),
          p: B('السكربت اللي بينقل أو يمسح 500 ملف لازم يتشغّل الأول بوضع «تجربة»: يطبع اللي **هيعمله** من غير ما يعمله. لما تتأكد، شغّله بجد. والمسح خليه آخر حاجة: انقل لفولدر «سلة» بدل `unlink()` أو `rmtree` المباشر.', 'A script that moves or deletes 500 files must first run in «trial» mode: print what it **would** do without doing it. When you are sure, run it for real. Keep deleting for last: move to a «trash» folder instead of a direct `unlink()` or `rmtree`.'),
          ex: 'from pathlib import Path\nimport shutil\nfor n in ["a.jpg", "b.png", "c.pdf", "d.docx", "e.zip"]:\n    Path(n).write_text("x", encoding="utf-8")\nGROUPS = {"images": {".jpg", ".png"}, "docs": {".pdf", ".docx"}}\n\ndef organise(folder: Path, dry_run: bool = True):\n    for f in sorted(folder.iterdir()):\n        if not f.is_file():\n            continue\n        group = next((g for g, exts in GROUPS.items() if f.suffix.lower() in exts), "other")\n        target = folder / group / f.name\n        print(("WOULD MOVE " if dry_run else "MOVE ") + f"{f.name} -> {group}/")\n        if not dry_run:\n            target.parent.mkdir(exist_ok=True)\n            shutil.move(str(f), target)\n\norganise(Path("."), dry_run=True)', run: 1 },
        { h: B('الحجم والتاريخ', 'Size and dates'),
          p: B('`p.stat().st_size` الحجم بالبايت، و`st_mtime` آخر تعديل (رقم ثواني تحوّله بـ `datetime.fromtimestamp`). كده تعمل حاجات زي: امسح اللوجات اللي أقدم من 30 يوم، أو اعرض أكبر 10 ملفات.', '`p.stat().st_size` is the size in bytes and `st_mtime` the last modification (seconds you convert with `datetime.fromtimestamp`). With them you can do things like: delete logs older than 30 days, or list the 10 largest files.'),
          ex: 'from pathlib import Path\nfrom datetime import datetime\nfor name, size in [("small.txt", 10), ("big.bin", 50_000), ("mid.csv", 2_000)]:\n    Path(name).write_bytes(b"x" * size)\n\ndef human(n):\n    for unit in ["B", "KB", "MB", "GB"]:\n        if n < 1024:\n            return f"{n:.0f} {unit}"\n        n /= 1024\n    return f"{n:.1f} TB"\n\nfiles = sorted(Path(".").glob("*.*"), key=lambda p: p.stat().st_size, reverse=True)\nfor p in files:\n    st = p.stat()\n    print(f"{p.name:<10}{human(st.st_size):>8}  {datetime.fromtimestamp(st.st_mtime):%Y-%m-%d %H:%M}")', run: 1 }
      ],
      practice: [
        B('شغّل `organise` على فولدر تجربة فيه 20 ملف بـ dry_run=True، وبعدين False.', 'Run `organise` on a test folder of 20 files with dry_run=True, then False.'),
        B('اعمل نسخة احتياطية من فولدر مشروعك بـ `copytree` لفولدر باسمه التاريخ.', 'Back up your project folder with `copytree` into a folder named with the date.'),
        B('اطبع أكبر 10 ملفات في فولدر Downloads بأحجام مقروءة.', 'Print the 10 largest files in your Downloads folder with readable sizes.'),
        B('اكتب كود بيلاقي الملفات الأقدم من 30 يوم في فولدر (من غير ما يمسحها — اطبعها بس).', 'Write code that finds files older than 30 days in a folder (do not delete them — just print).')
      ],
      code: [
        { u: B('إعادة تسمية بالجملة', 'Bulk renaming'), p: 'from pathlib import Path\nfolder = Path("photos"); folder.mkdir(exist_ok=True)\nfor n in ["IMG_0412.JPG", "IMG_0409.jpg", "IMG_0415.jpeg"]:\n    (folder / n).write_text("x", encoding="utf-8")\nfor i, f in enumerate(sorted(folder.iterdir()), 1):\n    new = f.with_name(f"trip-{i:03}{f.suffix.lower().replace(\'.jpeg\', \'.jpg\')}")\n    print(f.name, "->", new.name)\n    f.rename(new)', run: 1 }
      ],
      words: [
        { t: 'shutil', m: B('موديول نسخ ونقل ومسح الفولدرات والملفات', 'the module for copying, moving and deleting files and folders'), ex: 'shutil.copytree(src, dst)' },
        { t: 'dry run', m: B('تشغيل تجربة بيطبع اللي هيحصل من غير ما يعمله', 'a trial run that prints what would happen without doing it'), ex: 'organise(folder, dry_run=True)' },
        { t: 'overwrite', m: B('الكتابة فوق ملف موجود وضياع القديم', 'writing over an existing file and losing the old one'), ex: 'check exists() before moving' },
        { t: 'file size', m: B('حجم الملف بالبايت', 'a file’s size in bytes'), ex: 'p.stat().st_size' },
        { t: 'modification time', m: B('آخر وقت الملف اتعدّل فيه', 'the last time a file was changed'), ex: 'p.stat().st_mtime' },
        { t: 'backup', m: B('نسخة احتياطية ترجعلها لو حصلت مشكلة', 'a spare copy to go back to if something goes wrong'), ex: 'shutil.copytree("project", "backup_2026-10-01")' }
      ],
      read: ['lib:shutil', { lib: 'Automate the Boring Stuff with Python', what: B('فصل Organizing Files.', 'The Organizing Files chapter.') }],
      challenge: B('اكتب `clean_downloads.py` بيرتّب فولدر Downloads في فولدرات حسب النوع والسنة (`images/2026`)، بيبدأ dry run دايمًا، ومحتاج `--apply` عشان ينفّذ، وبيكتب لوج بكل نقلة، ولو فيه ملف بنفس الاسم بيزوّد رقم (`file (2).pdf`) بدل ما يكتب فوقه.', 'Write `clean_downloads.py` that sorts the Downloads folder into folders by type and year (`images/2026`), always starts as a dry run, needs `--apply` to act, logs every move, and adds a number (`file (2).pdf`) instead of overwriting when a name already exists.'),
      quiz: [
        { q: B('أول تشغيل لسكربت بينقل 500 ملف المفروض يبقى:', 'The first run of a script that moves 500 files should be:'), o: ['dry run', B('على طول بجد', 'straight for real'), B('بصلاحيات أدمن', 'as administrator')], a: 0, why: B('تشوف اللي هيحصل الأول.', 'See what would happen first.') },
        { q: B('`shutil.copy2` بيفرق عن copy إنه:', '`shutil.copy2` differs from copy in that it:'), o: [B('بينسخ التواريخ كمان', 'also copies the dates'), B('بينسخ فولدرات', 'copies folders'), B('أسرع', 'is faster')], a: 0, why: B('metadata زي وقت التعديل.', 'Metadata such as the modification time.') },
        { q: B('`st_size` بيرجّع الحجم بـ:', '`st_size` returns the size in:'), o: [B('بايت', 'bytes'), B('كيلوبايت', 'kilobytes'), B('ميجابايت', 'megabytes')], a: 0, why: B('حوّله بنفسك للوحدات.', 'Convert it to units yourself.') }
      ] },

    { title: B('البحث في الملفات وكشف المكرر', 'Searching files and finding duplicates'),
      goal: B('تلف على شجرة فولدرات كاملة، وتدوّر على كلام جوه الملفات، وتكشف الملفات المكررة بالـ hash حتى لو أساميها مختلفة.', 'Walk a whole folder tree, search for text inside files, and detect duplicate files by hash even when their names differ.'),
      learn: [
        { h: B('os.walk وrglob', 'os.walk and rglob'),
          p: B('`os.walk(folder)` بيلف على كل فولدر وبيديك (المسار، الفولدرات، الملفات). `Path.rglob("*")` أسهل لأغلب الحالات. عشان تتخطى فولدرات زي `.git` و`.venv` في os.walk، شيلها من قايمة الفولدرات جوه اللوب.', '`os.walk(folder)` visits every folder and gives you (path, folders, files). `Path.rglob("*")` is simpler for most cases. To skip folders such as `.git` and `.venv` in os.walk, remove them from the folder list inside the loop.'),
          ex: 'import os\nfrom pathlib import Path\nfor p in ["proj/a.py", "proj/lib/b.py", "proj/.venv/c.py", "proj/docs/readme.md"]:\n    Path(p).parent.mkdir(parents=True, exist_ok=True); Path(p).write_text("x", encoding="utf-8")\nSKIP = {".venv", ".git", "__pycache__"}\nfor root, dirs, files in os.walk("proj"):\n    dirs[:] = [d for d in dirs if d not in SKIP]\n    for f in files:\n        print(os.path.join(root, f))', run: 1 },
        { h: B('البحث جوه الملفات', 'Searching inside files'),
          p: B('لف على الملفات النصية بس (افلتر بالامتداد)، واقرا كل واحد بـ `errors="ignore"` عشان ملف واحد بترميز غريب ميوقفش البحث كله. اطبع المسار ورقم السطر والسطر نفسه — نفس اللي بيعمله Ctrl+Shift+F في VS Code.', 'Loop over text files only (filter by extension), and read each with `errors="ignore"` so one oddly encoded file does not stop the whole search. Print the path, the line number and the line — just like Ctrl+Shift+F in VS Code.'),
          ex: 'from pathlib import Path\nPath("src").mkdir(exist_ok=True)\nPath("src/a.py").write_text("API_KEY = \'x\'\\nprint(1)\\n", encoding="utf-8")\nPath("src/b.py").write_text("import os\\nkey = os.environ[\'API_KEY\']\\n", encoding="utf-8")\n\ndef search(folder, word, exts=(".py", ".txt", ".md")):\n    for f in sorted(Path(folder).rglob("*")):\n        if f.suffix not in exts:\n            continue\n        for n, line in enumerate(f.read_text(encoding="utf-8", errors="ignore").splitlines(), 1):\n            if word.lower() in line.lower():\n                yield f, n, line.strip()\n\nfor f, n, line in search("src", "api_key"):\n    print(f"{f}:{n}: {line}")', run: 1 },
        { h: B('الملفات المكررة بالـ hash', 'Duplicate files by hash'),
          p: B('ملفين محتواهم واحد ليهم نفس الـ hash (بصمة) حتى لو الاسم مختلف. `hashlib.sha256(data).hexdigest()` بيحسبها. عشان تبقى سريع: جمّع بالحجم الأول (ملفات أحجامها مختلفة أكيد مختلفة)، واحسب الـ hash للي ليهم نفس الحجم بس، واقرا الملفات الكبيرة على أجزاء.', 'Two files with the same content share a hash (a fingerprint) even with different names. `hashlib.sha256(data).hexdigest()` computes it. To be fast: group by size first (files of different sizes are surely different), hash only the files sharing a size, and read big files in chunks.'),
          ex: 'import hashlib\nfrom collections import defaultdict\nfrom pathlib import Path\nfor name, body in [("a.txt", "hello"), ("copy of a.txt", "hello"), ("b.txt", "world"), ("c.txt", "hello")]:\n    Path(name).write_text(body, encoding="utf-8")\n\ndef file_hash(p, chunk=65536):\n    h = hashlib.sha256()\n    with open(p, "rb") as f:\n        while block := f.read(chunk):\n            h.update(block)\n    return h.hexdigest()\n\nby_size = defaultdict(list)\nfor p in Path(".").glob("*.txt"):\n    by_size[p.stat().st_size].append(p)\nby_hash = defaultdict(list)\nfor group in by_size.values():\n    if len(group) > 1:\n        for p in group:\n            by_hash[file_hash(p)].append(p.name)\nfor h, names in by_hash.items():\n    if len(names) > 1:\n        print(h[:10], sorted(names))', run: 1 }
      ],
      practice: [
        B('اطبع عدد الملفات وحجمها الكلي لكل امتداد في فولدر Documents.', 'Print the number of files and total size per extension in your Documents folder.'),
        B('دوّر على كلمة «TODO» في كل ملفات .py عندك واطبع المكان.', 'Search for «TODO» in all your .py files and print where it appears.'),
        B('اعمل 3 نسخ من ملف بأسماء مختلفة واكشفهم بالـ hash.', 'Make 3 copies of a file with different names and detect them by hash.'),
        B('تخطّى `.git` و`.venv` في os.walk واتأكد إنهم مش ظاهرين.', 'Skip `.git` and `.venv` in os.walk and confirm they do not appear.')
      ],
      code: [
        { u: B('دوّر على أسرار نسيتها في الكود', 'Look for secrets left in code'), p: 'import re\nfrom pathlib import Path\nPath("app.py").write_text("token = \'demo-token-not-real-1234\'\\nurl = \'https://x.com\'\\n", encoding="utf-8")\nPATTERN = re.compile(r"(token|secret|password|api_key)\\s*=\\s*[\'\\"][^\'\\"]+", re.I)\nfor f in Path(".").rglob("*.py"):\n    for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):\n        if PATTERN.search(line):\n            print(f"possible secret: {f}:{n}")', run: 1 }
      ],
      words: [
        { t: 'os.walk', m: B('بتلف على كل الفولدرات اللي جوه فولدر', 'walks every folder inside a folder'), ex: 'for root, dirs, files in os.walk(p):' },
        { t: 'recursive', m: B('بيدخل جوه الفولدرات اللي جوه الفولدرات', 'going into the folders inside folders'), ex: 'rglob is recursive' },
        { t: 'hash', m: B('بصمة ثابتة لمحتوى: نفس المحتوى = نفس البصمة', 'a fixed fingerprint of content: same content, same hash'), ex: 'sha256' },
        { t: 'hashlib', m: B('موديول حساب الـ hash', 'the module that computes hashes'), ex: 'hashlib.sha256(data).hexdigest()' },
        { t: 'duplicate file', m: B('ملف محتواه نفس محتوى ملف تاني', 'a file with exactly the same content as another'), ex: 'photo.jpg and photo (1).jpg' },
        { t: 'generator function', m: B('دالة بـ yield بترجّع النتايج واحدة واحدة', 'a function with yield that returns results one at a time'), ex: 'def search(...): yield f, n, line' },
        { t: 'chunk', m: B('جزء من ملف بتقراه في المرة بدل الملف كله', 'a piece of a file read at a time instead of the whole file'), ex: 'f.read(65536)' }
      ],
      read: [{ lib: 'The Python Standard Library', what: B('افتح os.walk وhashlib (أول جزء).', 'Open os.walk and hashlib (the first part).') }, { lib: 'Real Python Tutorials', what: B('دوّر على «python generators» واقرا المقدمة.', 'Search for «python generators» and read the introduction.') }],
      challenge: B('اكتب `find_dupes.py` بياخد فولدر، ويطبع كل مجموعة ملفات مكررة بحجمها، والمساحة اللي ممكن توفّرها لو سبت نسخة واحدة من كل مجموعة — من غير ما يمسح حاجة.', 'Write `find_dupes.py` that takes a folder and prints each group of duplicate files with its size, plus the space you could save by keeping one copy per group — without deleting anything.'),
      quiz: [
        { q: B('ملفين ليهم نفس الـ sha256:', 'Two files with the same sha256:'), o: [B('محتواهم واحد', 'have the same content'), B('أساميهم واحدة', 'have the same name'), B('في نفس الفولدر', 'are in the same folder')], a: 0, why: B('الـ hash بصمة المحتوى.', 'The hash fingerprints the content.') },
        { q: B('ليه نجمّع بالحجم قبل الـ hash؟', 'Why group by size before hashing?'), o: [B('أسرع: الأحجام المختلفة أكيد مختلفة', 'it is faster: different sizes are surely different'), B('الـ hash مش بيشتغل من غيره', 'hashing does not work without it'), B('عشان الترتيب', 'for ordering')], a: 0, why: B('بتحسب hash لأقل عدد ملفات.', 'You hash as few files as possible.') },
        { q: B('`errors="ignore"` وقت القراءة:', '`errors="ignore"` when reading:'), o: [B('يتخطى البايتات اللي مش مفهومة بدل ما يقع', 'skips unreadable bytes instead of crashing'), B('يتجاهل الملف', 'skips the file'), B('يمسح الأخطاء', 'deletes errors')], a: 0, why: B('مفيد في البحث في ملفات كتير.', 'Useful when searching many files.') }
      ] },

    { title: B('JSON في ملفات، وzip، والترميزات', 'JSON in files, zip and encodings'),
      goal: B('تحفظ بياناتك في ملف JSON وترجّعها، وتقرا إعدادات TOML، وتضغط وتفك zip، وتتعامل مع ملفات عربي قديمة بترميز Windows.', 'Save your data to a JSON file and load it back, read TOML settings, zip and unzip, and handle old Arabic files in the Windows encoding.'),
      learn: [
        { h: B('json.dump وjson.load', 'json.dump and json.load'),
          p: B('`json.dump(data, f, ensure_ascii=False, indent=2)` بيكتب في ملف مفتوح، و`json.load(f)` بيقرا منه (من غير s: ملف؛ بالـ s: نص). كده برنامجك يفتكر بياناته بين التشغيلات: اقرا لو الملف موجود، وابدأ فاضي لو مش موجود.', '`json.dump(data, f, ensure_ascii=False, indent=2)` writes to an open file, and `json.load(f)` reads from one (no s: a file; with s: a string). Your program now remembers its data between runs: load when the file exists, start empty when it does not.'),
          ex: 'import json\nfrom pathlib import Path\nDB = Path("expenses.json")\n\ndef load():\n    if not DB.exists():\n        return []\n    with DB.open(encoding="utf-8") as f:\n        return json.load(f)\n\ndef save(items):\n    with DB.open("w", encoding="utf-8") as f:\n        json.dump(items, f, ensure_ascii=False, indent=2)\n\nitems = load()\nitems.append({"date": "2026-10-01", "category": "مواصلات", "amount": 45})\nsave(items)\nprint(DB.read_text(encoding="utf-8"))', run: 1 },
        { h: B('إعدادات TOML', 'TOML settings'),
          p: B('ملف إعدادات بشري أوضح من JSON (فيه تعليقات وأقسام). `tomllib` جاية مع Python من 3.11 للقراءة (افتح الملف بـ `"rb"`). هتشوف TOML في `pyproject.toml` وفي أدوات كتير.', 'A human-friendly settings file, clearer than JSON (it has comments and sections). `tomllib`, included since Python 3.11, reads it (open the file with `"rb"`). You will see TOML in `pyproject.toml` and many tools.'),
          ex: 'import tomllib\nfrom pathlib import Path\nPath("config.toml").write_text("""\n# settings for the report bot\ncurrency = "EGP"\nvat = 0.14\n\n[email]\nto = ["boss@example.com", "me@example.com"]\nsend_at = "08:00"\n""", encoding="utf-8")\nwith open("config.toml", "rb") as f:\n    cfg = tomllib.load(f)\nprint(cfg["vat"], cfg["email"]["to"][0], cfg["email"]["send_at"])', run: 1 },
        { h: B('zip والترميز العربي القديم', 'zip and the old Arabic encoding'),
          p: B('`zipfile.ZipFile("out.zip", "w", zipfile.ZIP_DEFLATED)` و`.write(path, arcname)` تضغط، و`.extractall(folder)` تفك. و`shutil.make_archive` تضغط فولدر كامل في سطر. ملفات CSV وTXT العربي القديمة من Windows غالبًا بترميز `cp1256`؛ لو طلعلك كلام غريب أو `UnicodeDecodeError` جرّب `encoding="cp1256"`.', '`zipfile.ZipFile("out.zip", "w", zipfile.ZIP_DEFLATED)` with `.write(path, arcname)` compresses, and `.extractall(folder)` extracts. `shutil.make_archive` zips a whole folder in one line. Old Arabic CSV and TXT files from Windows are often in `cp1256`; if you see gibberish or `UnicodeDecodeError`, try `encoding="cp1256"`.'),
          ex: 'import zipfile, shutil\nfrom pathlib import Path\nPath("report").mkdir(exist_ok=True)\nPath("report/sales.csv").write_text("city,total\\nCairo,1200\\n", encoding="utf-8")\nPath("old_arabic.txt").write_bytes("القاهرة".encode("cp1256"))\nwith zipfile.ZipFile("report.zip", "w", zipfile.ZIP_DEFLATED) as z:\n    z.write("report/sales.csv", arcname="sales.csv")\nprint(zipfile.ZipFile("report.zip").namelist())\nshutil.make_archive("report_backup", "zip", "report")\nprint(Path("report_backup.zip").exists())\ntry:\n    Path("old_arabic.txt").read_text(encoding="utf-8")\nexcept UnicodeDecodeError:\n    print("not utf-8 ->", Path("old_arabic.txt").read_text(encoding="cp1256"))', run: 1 }
      ],
      practice: [
        B('خلي مشروع المصاريف يحفظ في `expenses.json` ويقرا منه وقت ما يشتغل.', 'Make the expense project save to `expenses.json` and load from it on start.'),
        B('اعمل `config.toml` لمشروع واقراه بـ tomllib بدل الثوابت اللي في الكود.', 'Create a `config.toml` for a project and read it with tomllib instead of constants in the code.'),
        B('اضغط فولدر مشروعك (من غير `.venv`) في zip باسمه التاريخ.', 'Zip your project folder (without `.venv`) into a file named with the date.'),
        B('احفظ نص عربي بـ cp1256 واقراه بـ utf-8 (شوف الخطأ) وبعدين بـ cp1256.', 'Save Arabic text as cp1256, read it as utf-8 (see the error), then as cp1256.')
      ],
      code: [
        { u: B('تحويل ملف من cp1256 لـ UTF-8', 'Converting a file from cp1256 to UTF-8'), p: 'from pathlib import Path\nsrc = Path("customers_old.csv")\nsrc.write_bytes("الاسم,المدينة\\nسارة,القاهرة\\n".encode("cp1256"))\ntext = src.read_text(encoding="cp1256")\nPath("customers_utf8.csv").write_text(text, encoding="utf-8-sig")   # -sig helps Excel open it\nprint(Path("customers_utf8.csv").read_text(encoding="utf-8-sig"))', run: 1 }
      ],
      words: [
        { t: 'json.dump()', m: B('بتكتب بيانات JSON في ملف مفتوح', 'writes JSON data to an open file'), ex: 'json.dump(items, f, indent=2)' },
        { t: 'json.load()', m: B('بتقرا JSON من ملف مفتوح', 'reads JSON from an open file'), ex: 'items = json.load(f)' },
        { t: 'persistence', m: B('إن البيانات تفضل موجودة بعد ما البرنامج يقفل', 'data surviving after the program closes'), ex: 'save to expenses.json' },
        { t: 'TOML', m: B('شكل ملفات إعدادات سهل القراءة بأقسام وتعليقات', 'an easy-to-read settings format with sections and comments'), ex: 'pyproject.toml' },
        { t: 'zipfile', m: B('موديول عمل وفك ملفات zip', 'the module for creating and extracting zip files'), ex: 'zipfile.ZipFile("a.zip")' },
        { t: 'cp1256', m: B('ترميز Windows القديم للعربي', 'the old Windows encoding for Arabic'), ex: 'open(p, encoding="cp1256")' },
        { t: 'UnicodeDecodeError', m: B('خطأ لما الملف مش بالترميز اللي فتحته بيه', 'the error when a file is not in the encoding you opened it with'), ex: 'reading cp1256 as utf-8' },
        { t: 'BOM', m: B('علامة في أول الملف بتساعد Excel يعرف إنه UTF-8', 'a mark at the start of a file that helps Excel detect UTF-8'), ex: 'encoding="utf-8-sig"' }
      ],
      read: [{ lib: 'json', what: B('اقرا json.dump وjson.load ومعاملاتهم.', 'Read json.dump, json.load and their parameters.') }, 'lib:zipfile'],
      challenge: B('اكتب `backup.py`: بياخد فولدر من `config.toml`، ويضغطه في `backups/backup_YYYY-MM-DD_HHMM.zip` (من غير `.venv` و`__pycache__`)، ويمسح النسخ الأقدم ويسيب آخر 7 بس، ويسجّل كل ده في لوج. (هنجدوله يشتغل لوحده أسبوع 20.)', 'Write `backup.py`: take a folder from `config.toml`, zip it into `backups/backup_YYYY-MM-DD_HHMM.zip` (without `.venv` and `__pycache__`), delete older copies keeping the last 7 only, and log all of it. (We schedule it to run by itself in week 20.)'),
      quiz: [
        { q: B('الفرق بين `json.load` و`json.loads`:', 'The difference between `json.load` and `json.loads`:'), o: [B('load من ملف، loads من نص', 'load reads a file, loads a string'), B('مفيش فرق', 'none'), B('loads أسرع', 'loads is faster')], a: 0, why: B('s = string.', 's = string.') },
        { q: B('ملف عربي قديم طلع كلام غريب. جرّب:', 'An old Arabic file shows gibberish. Try:'), o: ['encoding="cp1256"', 'encoding="ascii"', B('mode="rb" وخلاص', 'just mode="rb"')], a: 0, why: B('ترميز Windows العربي.', 'The Windows Arabic encoding.') },
        { q: B('`tomllib.load` محتاجة الملف مفتوح بـ:', '`tomllib.load` needs the file opened with:'), o: ['"rb"', '"r"', '"w"'], a: 0, why: B('بتقرا بايتات.', 'It reads bytes.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تبني أداة تنظيم ملفات حقيقية آمنة، وتعدّي اختبار الأسبوع.', 'Build a real, safe file-organising tool and pass the weekly test.'),
      review: [
        B('open جوه with، والأوضاع r وw وa، وencoding="utf-8" دايمًا.', 'open inside with, modes r, w and a, and always encoding="utf-8".'),
        B('Path و/ وname وstem وsuffix وparent وmkdir وglob وrglob.', 'Path and /, name, stem, suffix, parent, mkdir, glob and rglob.'),
        B('shutil وdry run والحجم والتاريخ.', 'shutil, dry runs, sizes and dates.'),
        B('os.walk والبحث جوه الملفات والـ hash للمكرر وyield.', 'os.walk, searching inside files, hashing duplicates and yield.'),
        B('json.dump/load وTOML وzip وcp1256.', 'json.dump/load, TOML, zip and cp1256.')
      ],
      project: B('**منظّم الفولدرات** (`organizer/`): أداة بتاخد فولدر من `sys.argv` وإعداداتها من `rules.toml` (امتداد → فولدر، وفولدرات يتجاهلها). بتشتغل dry run افتراضيًا وتنفّذ بـ `--apply`: بترتّب الملفات في فولدرات حسب القواعد والسنة، ولو الاسم موجود بتزوّد رقم، وبتكشف المكرر بالـ hash وتنقله لفولدر `_duplicates` بدل ما تمسحه، وبتكتب `report.json` بملخص (كام ملف اتنقل لكل فولدر، المساحة اللي اتوفرت) ولوج كامل. اختبرها على فولدر تجربة فيه 40 ملف عملتهم بسكربت.', '**The folder organiser** (`organizer/`): a tool that takes a folder from `sys.argv` and its settings from `rules.toml` (extension → folder, and folders to ignore). It runs as a dry run by default and acts with `--apply`: it sorts files into folders by rule and year, adds a number when a name exists, detects duplicates by hash and moves them to a `_duplicates` folder instead of deleting, and writes a `report.json` summary (files moved per folder, space saved) and a full log. Test it on a trial folder of 40 files you create with a script.'),
      test: [
        { q: B('عشان تضيف لآخر ملف من غير ما تمسحه:', 'To add to the end of a file without erasing it:'), o: ['"a"', '"w"', '"r"'], a: 0, why: B('append.', 'append.') },
        { q: B('`Path("a") / "b" / "c.txt"`:', '`Path("a") / "b" / "c.txt"`:'), o: [B('مسار a/b/c.txt حسب النظام', 'the path a/b/c.txt for your system'), B('قسمة', 'a division'), B('خطأ', 'an error')], a: 0, why: B('/ بتبني مسارات.', '/ builds paths.') },
        { q: B('`Path("x.tar.gz").suffix`:', '`Path("x.tar.gz").suffix`:'), o: ['".gz"', '".tar.gz"', '"x"'], a: 0, why: B('آخر امتداد بس (suffixes بترجّعهم كلهم).', 'Only the last one (suffixes returns them all).') },
        { q: B('`for line in f:` كل line آخرها غالبًا:', 'With `for line in f:` each line usually ends with:'), o: ['"\\n"', '" "', B('ولا حاجة', 'nothing')], a: 0, why: B('شيلها بـ rstrip.', 'Remove it with rstrip.') },
        { q: B('أأمن طريقة تمسح بيها ملفات كتير:', 'The safest way to delete many files:'), o: [B('dry run وبعدين نقل لسلة', 'a dry run, then move to a trash folder'), B('rmtree على طول', 'rmtree straight away'), B('من غير لوج', 'without a log')], a: 0, why: B('تشوف وترجع لو غلطت.', 'You can see and undo mistakes.') },
        { q: B('`dirs[:] = [...]` جوه os.walk:', '`dirs[:] = [...]` inside os.walk:'), o: [B('بيمنع الدخول في الفولدرات اللي شلتها', 'stops it entering the folders you removed'), B('بيمسح الفولدرات', 'deletes the folders'), B('مالوش أثر', 'has no effect')], a: 0, why: B('بتعدّل القايمة اللي os.walk هيكمّل بيها.', 'You edit the list os.walk continues with.') },
        { q: B('الدالة اللي فيها `yield`:', 'A function containing `yield`:'), o: [B('generator بيرجّع قيم واحدة واحدة', 'is a generator returning values one by one'), B('بترجّع None', 'returns None'), B('بتطبع', 'prints')], a: 0, why: B('مفيدة للنتايج الكتير.', 'Useful for many results.') },
        { q: B('ملفين بأسماء مختلفة ونفس الـ hash:', 'Two files with different names and the same hash:'), o: [B('مكررين', 'are duplicates'), B('مختلفين', 'are different'), B('مضروبين', 'are corrupted')], a: 0, why: B('نفس المحتوى.', 'Same content.') },
        { q: B('`json.dump(d, f)` الـ f لازم تكون:', 'In `json.dump(d, f)`, f must be:'), o: [B('ملف مفتوح للكتابة', 'a file open for writing'), B('اسم الملف كنص', 'the file name as text'), B('dict', 'a dict')], a: 0, why: B('dump بتكتب في ملف مفتوح.', 'dump writes to an open file.') },
        { q: B('Excel يفتح CSV عربي صح لما تكتبه بـ:', 'Excel opens an Arabic CSV correctly when written with:'), o: ['utf-8-sig', 'ascii', 'latin-1'], a: 0, why: B('الـ BOM.', 'The BOM.') },
        { q: B('`shutil.make_archive("b", "zip", "folder")` بيعمل:', '`shutil.make_archive("b", "zip", "folder")` creates:'), o: ['b.zip', 'folder.zip', 'b/folder'], a: 0, why: B('اسم الأرشيف الأول.', 'The first argument names the archive.') },
        { q: B('فتح ملف مش موجود للقراءة بيطلّع:', 'Opening a missing file for reading raises:'), o: ['FileNotFoundError', 'KeyError', 'OSError: disk full'], a: 0, why: B('الملف مش موجود.', 'The file does not exist.') }
      ] }
  ]
};
