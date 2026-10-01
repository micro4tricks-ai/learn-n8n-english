// Reference sections of python.html: printable cheat sheets (sheets), automation projects (lessons) and the
// common errors with their fixes (cards). Section types are in assets/js/sections.js; texts are {ar, en}.
(function(){
function R(code, ar, en){ return [code, { ar: ar, en: en }]; }
function S(id, ar, en, subAr, subEn, groups){ return { id: id, t: { ar: ar, en: en }, sub: { ar: subAr, en: subEn }, groups: groups }; }
function G(ar, en, rows){ return { t: { ar: ar, en: en }, rows: rows }; }

SECTIONS.add({
  page: 'python', id: 'sheets', order: 3, type: 'sheets', kind: 's',
  title: { ar: 'ملخصات للطباعة', en: 'Printable cheat sheets' }, nav: { ar: 'الملخصات', en: 'Cheat sheets' },
  desc: { ar: 'كل ملخص صفحة A4 تتعلّق جنب الشاشة: أساسيات Python، والنصوص والقوايم والـ dict، والملفات، وRegex، والـ APIs، وpandas، وSQL، وHTML وCSS، وJavaScript، والأدوات (venv وpytest وFastAPI وDocker).', en: 'Each sheet is one A4 page to keep by your screen: Python basics; strings, lists and dicts; files; regex; APIs; pandas; SQL; HTML and CSS; JavaScript; and tools (venv, pytest, FastAPI, Docker).' },
  items: [
    S('basics', 'أساسيات Python', 'Python basics', 'المتغيرات والأنواع والشروط والتكرار والدوال والأخطاء.', 'Variables, types, conditions, loops, functions and errors.', [
      G('الأنواع والتحويل', 'Types and conversion', [
        R('x = 5; y = 2.5; s = "hi"; ok = True; n = None', 'int وfloat وstr وbool وNone', 'int, float, str, bool and None'),
        R('int("42"); float("3.5"); str(42); bool("")', 'تحويل بين الأنواع', 'Converting between types'),
        R('type(x); isinstance(x, int)', 'تعرف النوع', 'Checking the type'),
        R('17 // 5  →  3     17 % 5  →  2     2 ** 10', 'قسمة صحيحة وباقي وأس', 'Floor division, remainder and power'),
        R('round(x, 2); abs(x); min(a, b); max(a, b)', 'دوال أرقام جاهزة', 'Built-in number functions'),
        R('f"{total:,.2f} EGP  {pct:.0%}  {n:05}"', 'f-string منسّق', 'A formatted f-string')
      ]),
      G('الشروط والتكرار', 'Conditions and loops', [
        R('if x > 0: … elif x == 0: … else: …', 'شروط بفروع', 'Branching conditions'),
        R('label = "big" if total > 1000 else "small"', 'شرط في سطر', 'A one-line condition'),
        R('for i, item in enumerate(items, 1):', 'لف برقم', 'Loop with a number'),
        R('for a, b in zip(names, prices):', 'لف على قايمتين مع بعض', 'Loop over two lists together'),
        R('while True: … if done: break', 'كرّر لحد ما', 'Repeat until'),
        R('match cmd:  case "add": …  case _: …', 'اختيارات كتير', 'Many choices')
      ]),
      G('الدوال', 'Functions', [
        R('def f(a, b=2, *args, **kwargs) -> int:', 'معاملات وافتراضي وأي عدد', 'Parameters, defaults and any number'),
        R('return lo, hi          # a tuple', 'أكتر من قيمة راجعة', 'Several return values'),
        R('sorted(rows, key=lambda r: r["total"], reverse=True)', 'ترتيب بدالة', 'Sorting with a function'),
        R('if __name__ == "__main__": main()', 'نقطة البداية', 'The entry point')
      ]),
      G('الأخطاء', 'Errors', [
        R('try: … except ValueError as e: … else: … finally: …', 'امسك خطأ معيّن', 'Catch a specific error'),
        R('raise ValueError(f"qty must be positive, got {qty}")', 'اطلّع خطأ واضح', 'Raise a clear error'),
        R('logging.basicConfig(level=logging.INFO)', 'لوج بدل print', 'Logging instead of print'),
        R('breakpoint()   # n, s, p x, c, q', 'وقّف وافحص', 'Pause and inspect')
      ])
    ]),
    S('data', 'النصوص والقوايم والـ dict', 'Strings, lists and dicts', 'أكتر methods بتستخدمها في تنضيف وتجميع البيانات.', 'The methods you use most to clean and group data.', [
      G('النصوص', 'Strings', [
        R('s.strip().lower().title()', 'تنضيف وحروف', 'Trim and case'),
        R('s.split(","); ", ".join(parts)', 'تقسيم وتجميع', 'Split and join'),
        R('s.replace("-", ""); s.startswith("INV"); "@" in s', 'تبديل وبحث', 'Replace and search'),
        R('s[0]; s[-1]; s[2:5]; s[::-1]', 'فهرسة وتقطيع', 'Indexing and slicing'),
        R('s.isdigit(); len(s)', 'فحص وطول', 'Checks and length')
      ]),
      G('القوايم', 'Lists', [
        R('items.append(x); items.extend(more); items.pop(0)', 'إضافة وإزالة', 'Add and remove'),
        R('[p * 1.14 for p in prices if p > 0]', 'list comprehension بفلتر', 'A filtered list comprehension'),
        R('sum(xs); min(xs); max(xs, key=len); sorted(xs)', 'تلخيص وترتيب', 'Summarise and sort'),
        R('any(x == 0 for x in xs); all(…)', 'أي واحد / كلهم', 'Any / all'),
        R('first, *rest = row; a, b = b, a', 'فك وتبديل', 'Unpack and swap'),
        R('b = a.copy()     # b = a is NOT a copy', 'نسخة حقيقية', 'A real copy')
      ]),
      G('الـ dict والـ set', 'Dicts and sets', [
        R('d.get("k", default); d["k"] = v; del d["k"]', 'قراءة آمنة وتعديل', 'Safe read and change'),
        R('for k, v in d.items():', 'لف على المفتاح والقيمة', 'Loop over keys and values'),
        R('counts[w] = counts.get(w, 0) + 1', 'نمط العدّاد', 'The counter pattern'),
        R('Counter(xs).most_common(3); defaultdict(list)', 'عد وتجميع جاهز', 'Ready counting and grouping'),
        R('{k: v * 2 for k, v in d.items()}', 'dict comprehension', 'A dict comprehension'),
        R('a | b; a & b; a - b; list(dict.fromkeys(xs))', 'مجموعات وشيل التكرار', 'Sets and de-duplicating')
      ]),
      G('JSON', 'JSON', [
        R('json.dumps(d, ensure_ascii=False, indent=2)', 'Python → نص JSON', 'Python → JSON text'),
        R('json.loads(text)', 'نص JSON → Python', 'JSON text → Python'),
        R('json.dump(d, f); json.load(f)', 'من وإلى ملف', 'To and from a file'),
        R('d.get("user", {}).get("phone")', 'بيانات متداخلة بأمان', 'Nested data safely')
      ])
    ]),
    S('files', 'الملفات والأتمتة', 'Files and automation', 'pathlib وcsv وopenpyxl وshutil والتواريخ والجدولة.', 'pathlib, csv, openpyxl, shutil, dates and scheduling.', [
      G('المسارات', 'Paths', [
        R('Path("reports") / "2026" / "sales.xlsx"', 'بناء مسار', 'Build a path'),
        R('p.name; p.stem; p.suffix; p.parent', 'أجزاء المسار', 'The parts of a path'),
        R('p.mkdir(parents=True, exist_ok=True)', 'فولدر بأمان', 'A folder, safely'),
        R('p.read_text(encoding="utf-8"); p.write_text(t, encoding="utf-8")', 'قراءة وكتابة', 'Read and write'),
        R('Path(".").rglob("*.pdf")', 'دوّر في الفولدرات', 'Search the folders'),
        R('shutil.copy2(a, b); shutil.move(a, b)', 'نسخ ونقل', 'Copy and move')
      ]),
      G('CSV وExcel', 'CSV and Excel', [
        R('csv.DictReader(open(p, newline="", encoding="utf-8"))', 'CSV كـ dicts', 'CSV as dicts'),
        R('csv.DictWriter(f, fieldnames=cols); w.writeheader()', 'كتابة CSV', 'Write CSV'),
        R('encoding="utf-8-sig"', 'CSV عربي يفتح في Excel', 'Arabic CSV that opens in Excel'),
        R('load_workbook(p, data_only=True)["Sales"]', 'قراءة شيت', 'Read a sheet'),
        R('ws.iter_rows(min_row=2, values_only=True)', 'لف على الصفوف', 'Loop over rows'),
        R('cell.number_format = "#,##0.00"; ws.freeze_panes = "A2"', 'تنسيق', 'Formatting')
      ]),
      G('التواريخ', 'Dates', [
        R('date.today(); datetime.now(ZoneInfo("Africa/Cairo"))', 'النهارده والآن', 'Today and now'),
        R('d + timedelta(days=30); (d2 - d1).days', 'حساب مدد', 'Duration arithmetic'),
        R('d.strftime("%Y-%m-%d"); datetime.strptime(t, "%d/%m/%Y")', 'تنسيق وقراءة', 'Format and parse'),
        R('date.fromisoformat("2026-09-30")', 'من ISO', 'From ISO')
      ]),
      G('سطر الأوامر والجدولة', 'Command line and scheduling', [
        R('argparse.ArgumentParser(); p.add_argument("--dry-run", action="store_true")', 'أداة بخيارات', 'A tool with options'),
        R('sys.exit(1)', 'خروج بكود فشل', 'Exit with a failure code'),
        R('0 8 1 * *   /path/.venv/bin/python /path/report.py', 'cron: 8 أول كل شهر', 'cron: 08:00 on the 1st'),
        R('subprocess.run(["git", "status"], capture_output=True, text=True)', 'تشغيل أمر', 'Run a command')
      ])
    ]),
    S('regex', 'Regex', 'Regex', 'الرموز والمجموعات والدوال والأنماط الجاهزة.', 'Symbols, groups, functions and ready patterns.', [
      G('الرموز', 'Symbols', [
        R('\\d  \\w  \\s  .', 'رقم، حرف، مسافة، أي حرف', 'digit, word character, space, any'),
        R('+  *  ?  {3}  {2,4}', 'كميات', 'Quantities'),
        R('[A-Z]  [0-9]  [^0-9]', 'مجموعات حروف', 'Character classes'),
        R('^  $  \\b', 'أول وآخر وحدود كلمة', 'Start, end and word boundary'),
        R('(…)  (?P<name>…)  (?:…)  a|b', 'مجموعات وبدائل', 'Groups and alternatives'),
        R('.*?', 'كسول: أقل حاجة', 'Lazy: as little as possible')
      ]),
      G('الدوال', 'Functions', [
        R('re.search(p, s); re.fullmatch(p, s)', 'أول تطابق / النص كله', 'First match / whole text'),
        R('re.findall(p, s); re.finditer(p, s)', 'كل التطابقات', 'Every match'),
        R('re.sub(p, r"\\2-\\1", s); re.sub(p, func, s)', 'استبدال', 'Replace'),
        R('re.split(r"\\s*[,;]\\s*", s)', 'تقسيم بنمط', 'Split by a pattern'),
        R('re.I  re.M  re.S  re.X', 'flags', 'Flags')
      ]),
      G('أنماط جاهزة', 'Ready patterns', [
        R('\\b01[0125]\\d{8}\\b', 'موبايل مصري', 'Egyptian mobile'),
        R('[\\w.+-]+@[\\w-]+\\.[\\w.-]+', 'إيميل', 'Email'),
        R('\\b\\d{4}-\\d{2}-\\d{2}\\b', 'تاريخ ISO', 'ISO date'),
        R('\\d{1,3}(?:,\\d{3})*(?:\\.\\d+)?', 'رقم بفواصل', 'A number with separators'),
        R('[\\u064B-\\u0652]', 'التشكيل العربي', 'Arabic diacritics')
      ])
    ]),
    S('web', 'الويب والـ APIs', 'The web and APIs', 'requests وBeautiful Soup وPlaywright وFastAPI.', 'requests, Beautiful Soup, Playwright and FastAPI.', [
      G('requests', 'requests', [
        R('r = requests.get(url, params={…}, headers={…}, timeout=10)', 'GET بأمان', 'A safe GET'),
        R('r.raise_for_status(); r.json(); r.status_code', 'الرد', 'The response'),
        R('requests.post(url, json=data, timeout=10)', 'POST بـ JSON', 'POST with JSON'),
        R('s = requests.Session(); s.headers["Authorization"] = f"Bearer {token}"', 'Session بمفتاح', 'A Session with a key'),
        R('HTTPAdapter(max_retries=Retry(total=5, backoff_factor=1, status_forcelist=[429, 503]))', 'إعادة محاولة', 'Retries')
      ]),
      G('الـ status codes', 'Status codes', [
        R('200 201 204', 'نجح', 'Success'),
        R('400 401 403 404 409 422', 'غلط في الطلب أو الصلاحية', 'A request or permission problem'),
        R('429', 'طلبات كتير: استنى Retry-After', 'Too many: wait for Retry-After'),
        R('500 502 503 504', 'السيرفر: أعد المحاولة بعدين', 'The server: retry later')
      ]),
      G('Scraping', 'Scraping', [
        R('RobotFileParser(url + "/robots.txt").can_fetch(agent, url)', 'مسموح؟', 'Allowed?'),
        R('soup = BeautifulSoup(html, "html.parser")', 'تحليل HTML', 'Parse HTML'),
        R('soup.select(".item"); el.select_one("h3 a")', 'CSS selectors', 'CSS selectors'),
        R('el.get_text(strip=True); el["href"]; urljoin(page, href)', 'نص ولينكات', 'Text and links'),
        R('page.goto(url); page.wait_for_selector(".x"); page.locator(".x")', 'Playwright', 'Playwright')
      ]),
      G('FastAPI', 'FastAPI', [
        R('@app.get("/items/{id}")  def f(id: int, q: str = ""):', 'path وquery', 'Path and query'),
        R('class ItemIn(BaseModel): qty: int = Field(gt=0)', 'تحقق بـ Pydantic', 'Validation with Pydantic'),
        R('raise HTTPException(404, "not found")', 'خطأ HTTP', 'An HTTP error'),
        R('FastAPI(dependencies=[Depends(require_key)])', 'حماية بمفتاح', 'Key protection'),
        R('fastapi dev main.py      → /docs', 'تشغيل وتوثيق', 'Run and docs')
      ])
    ]),
    S('pandas', 'pandas', 'pandas', 'قراءة وفلترة وتنضيف وتجميع وتصدير.', 'Reading, filtering, cleaning, grouping and exporting.', [
      G('قراءة وفحص', 'Read and inspect', [
        R('df = pd.read_csv(p, parse_dates=["day"])', 'قراءة CSV', 'Read a CSV'),
        R('pd.read_excel(p, sheet_name="Sales")', 'قراءة Excel', 'Read Excel'),
        R('df.head(); df.info(); df.describe(); df.shape', 'فحص', 'Inspect'),
        R('df["col"].value_counts(); df["col"].unique()', 'القيم', 'Values')
      ]),
      G('اختيار وفلترة', 'Select and filter', [
        R('df[["a", "b"]]; df.loc[i, "a"]; df.iloc[0:3]', 'اختيار', 'Select'),
        R('df[(df.qty > 3) & (df.city == "Cairo")]', 'فلترة بشروط', 'Filter with conditions'),
        R('df[df.city.isin(["Cairo", "Giza"])]; df.query("qty > 3")', 'isin وquery', 'isin and query'),
        R('df.sort_values("revenue", ascending=False); df.nlargest(5, "revenue")', 'ترتيب', 'Sort'),
        R('df.assign(revenue=lambda d: d.qty * d.price)', 'عمود جديد', 'A new column')
      ]),
      G('تنضيف', 'Clean', [
        R('df.isna().sum(); df.fillna({"city": "unknown"}); df.dropna(subset=["price"])', 'الناقص', 'Gaps'),
        R('pd.to_numeric(s, errors="coerce"); pd.to_datetime(s, errors="coerce")', 'أنواع', 'Types'),
        R('df.drop_duplicates(subset=["email"])', 'مكرر', 'Duplicates'),
        R('df.col.str.strip().str.lower(); df.day.dt.month', '.str و.dt', '.str and .dt')
      ]),
      G('تجميع ودمج وتصدير', 'Group, merge and export', [
        R('df.groupby("branch").agg(n=("qty", "size"), rev=("revenue", "sum"))', 'تجميع', 'Group'),
        R('pd.pivot_table(df, index="branch", columns="month", values="revenue", aggfunc="sum")', 'pivot', 'Pivot'),
        R('df.set_index("day").resample("MS")["revenue"].sum()', 'بالشهر', 'By month'),
        R('pd.merge(a, b, on="id", how="left", validate="many_to_one")', 'دمج', 'Merge'),
        R('df.to_csv(p, index=False, encoding="utf-8-sig"); df.to_excel(w, sheet_name="S")', 'تصدير', 'Export'),
        R('df.to_json(orient="records", force_ascii=False)', 'JSON للوحة', 'JSON for a dashboard')
      ])
    ]),
    S('sql', 'SQL وsqlite3', 'SQL and sqlite3', 'الاستعلامات والتجميع والربط وPython بأمان.', 'Queries, grouping, joins and Python safely.', [
      G('الاستعلامات', 'Queries', [
        R('SELECT name, city FROM customers WHERE city = \'Cairo\' ORDER BY name LIMIT 10;', 'اختيار بشرط', 'Select with a condition'),
        R('WHERE total BETWEEN 100 AND 500 AND status IN (\'paid\', \'new\')', 'شروط', 'Conditions'),
        R('WHERE name LIKE \'%Pro%\'   ·   WHERE phone IS NULL', 'بحث وناقص', 'Search and missing'),
        R('UPDATE t SET status = \'paid\' WHERE id = 4;   DELETE FROM t WHERE …;', 'تعديل ومسح (ومتنساش WHERE)', 'Change and delete (never forget WHERE)')
      ]),
      G('التجميع والربط', 'Grouping and joins', [
        R('SELECT status, COUNT(*), SUM(total) FROM orders GROUP BY status HAVING SUM(total) > 1000;', 'تجميع', 'Grouping'),
        R('FROM orders o JOIN customers c ON c.id = o.customer_id', 'JOIN', 'JOIN'),
        R('LEFT JOIN orders o ON … WHERE o.id IS NULL', 'اللي ملهمش مقابل', 'Rows with no match'),
        R('WITH paid AS (SELECT …) SELECT … FROM paid;', 'خطوات بأسماء', 'Named steps'),
        R('strftime(\'%Y-%m\', day)', 'الشهر من تاريخ', 'The month from a date')
      ]),
      G('Python', 'Python', [
        R('db = sqlite3.connect("shop.db"); db.row_factory = sqlite3.Row', 'اتصال وصفوف بالأسماء', 'Connect, rows by name'),
        R('db.execute("SELECT … WHERE id = ?", (oid,))', 'parameters ضد injection', 'Parameters against injection'),
        R('with db: db.executemany("INSERT … VALUES (?, ?)", rows)', 'transaction ودفعة', 'A transaction and a batch'),
        R('INSERT … ON CONFLICT(email) DO UPDATE SET name = excluded.name', 'upsert', 'Upsert'),
        R('CREATE INDEX idx_orders_customer ON orders(customer_id);', 'سرعة البحث', 'Faster lookups')
      ])
    ]),
    S('front', 'HTML وCSS وJavaScript', 'HTML, CSS and JavaScript', 'الهيكل والتنسيق والـ DOM والأحداث وfetch.', 'Structure, styling, the DOM, events and fetch.', [
      G('HTML', 'HTML', [
        R('<!doctype html><html lang="ar" dir="rtl">', 'بداية الصفحة', 'The page start'),
        R('<meta name="viewport" content="width=device-width, initial-scale=1">', 'الموبايل', 'Phones'),
        R('<header> <nav> <main> <section> <article> <footer>', 'tags ليها معنى', 'Meaningful tags'),
        R('<img src="a.png" alt="description">', 'صورة بوصف', 'An image with a description'),
        R('<label for="e">Email</label><input id="e" name="email" type="email" required>', 'حقل فورم', 'A form field')
      ]),
      G('CSS', 'CSS', [
        R('.card { padding: 16px; border-radius: 12px; }   #total { }   a:hover { }', 'selectors', 'Selectors'),
        R('* { box-sizing: border-box; }', 'العرض يشمل الـ padding', 'Width includes padding'),
        R('display: flex; gap: 12px; justify-content: space-between; flex-wrap: wrap;', 'flexbox', 'Flexbox'),
        R('display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));', 'grid متجاوب', 'A responsive grid'),
        R('@media (min-width: 700px) { … }', 'شاشات أكبر', 'Bigger screens'),
        R('margin-inline-start; padding-inline-end; text-align: start;', 'عربي وإنجليزي بنفس الـ CSS', 'Arabic and English with one CSS')
      ]),
      G('JavaScript', 'JavaScript', [
        R('const x = 1; let y = 2;   `Total: ${t}`;   a === b', 'أساسيات', 'Basics'),
        R('arr.map(x => x * 2).filter(x => x > 2).reduce((s, x) => s + x, 0)', 'arrays', 'Arrays'),
        R('const { name, city = "Cairo" } = obj;  { ...obj, paid: true }', 'فك وspread', 'Destructure and spread'),
        R('obj.customer?.phone ?? "none"', 'قراءة آمنة', 'Safe reads'),
        R('document.querySelector("#t").textContent = name;', 'DOM بأمان', 'The DOM, safely'),
        R('btn.addEventListener("click", e => { … });', 'حدث', 'An event'),
        R('const r = await fetch(url); if (!r.ok) throw …; const d = await r.json();', 'fetch', 'fetch')
      ])
    ]),
    S('tools', 'الأدوات والنشر', 'Tools and deployment', 'البيئات والجودة وGit وDocker وCI.', 'Environments, quality, Git, Docker and CI.', [
      G('البيئة والحزم', 'Environment and packages', [
        R('python -m venv .venv  →  .venv\\Scripts\\Activate.ps1  |  source .venv/bin/activate', 'بيئة افتراضية', 'A virtual environment'),
        R('python -m pip install -r requirements.txt; pip freeze > requirements.txt', 'الحزم', 'Packages'),
        R('uv init; uv add requests; uv run main.py', 'uv', 'uv'),
        R('load_dotenv(); os.environ["API_KEY"]', 'الأسرار من .env', 'Secrets from .env')
      ]),
      G('الجودة', 'Quality', [
        R('pytest -q; pytest -k phone -x; pytest --cov=app', 'اختبارات', 'Tests'),
        R('@pytest.mark.parametrize("a, b", [(1, 2)])', 'حالات كتير', 'Many cases'),
        R('ruff check . --fix; ruff format .', 'فحص وتنسيق', 'Lint and format'),
        R('mypy app/', 'الأنواع', 'Types'),
        R('pre-commit install', 'فحص قبل كل commit', 'Checks before each commit')
      ]),
      G('Git', 'Git', [
        R('git status; git add -p; git commit -m "…"; git push', 'اليومي', 'Day to day'),
        R('git switch -c feature/x; git merge feature/x', 'فروع', 'Branches'),
        R('git log --oneline -10; git diff', 'التاريخ والفرق', 'History and changes')
      ]),
      G('Docker والنشر', 'Docker and deployment', [
        R('docker build -t app:1.0 .; docker run -d -p 8000:8000 --env-file .env app:1.0', 'image وcontainer', 'Image and container'),
        R('docker compose up -d; docker compose logs -f api; docker compose down', 'compose', 'compose'),
        R('docker compose exec -T postgres pg_dump -U n8n n8n | gzip > backup.sql.gz', 'نسخة احتياطية', 'A backup'),
        R('.github/workflows/ci.yml   on: [push, pull_request]', 'CI', 'CI')
      ])
    ])
  ]
});

SECTIONS.add({
  page: 'python', id: 'projects', order: 4, type: 'lessons', kind: 'pj',
  title: { ar: 'مشاريع أتمتة جاهزة للتنفيذ', en: 'Automation projects to build' }, nav: { ar: 'المشاريع', en: 'Projects' },
  desc: { ar: 'أفكار مشاريع حقيقية من شغل الشركات الصغيرة، كل واحد بخطواته والمهارات اللي بيستخدمها ورقم الأسبوع اللي اتعلمتها فيه. اعملها بعد الرحلة أو جنبها، وحط أحسنهم في الـ portfolio.', en: 'Real project ideas from small-business work, each with its steps, the skills it uses and the week you learned them. Build them after the journey or alongside it, and put the best in your portfolio.' },
  items: [
    { id: 'p-downloads', min: 90, t: { ar: 'منظّم فولدر التنزيلات', en: 'A downloads-folder organiser' },
      body: { ar: 'سكربت بيرتّب أي فولدر حسب نوع الملف والسنة، ويكشف المكرر بالـ hash، ويشتغل dry run الأول.\n\n**الخطوات:** 1. قواعد في `rules.toml`. 2. لف بـ `rglob`. 3. نقل بـ `shutil.move` مع رقم لو الاسم موجود. 4. لوج وتقرير JSON. 5. جدولة أسبوعية.\n\n**المهارات:** الأسابيع 8 و9 و20.', en: 'A script that sorts any folder by file type and year, detects duplicates by hash, and runs as a dry run first.\n\n**Steps:** 1. Rules in `rules.toml`. 2. Walk with `rglob`. 3. Move with `shutil.move`, adding a number when a name exists. 4. A log and a JSON report. 5. A weekly schedule.\n\n**Skills:** weeks 8, 9 and 20.' },
      'try': { ar: 'ابدأ بـ 20 ملف تجربة اتعملوا بسكربت.', en: 'Start with 20 test files created by a script.' } },
    { id: 'p-excel-merge', min: 120, t: { ar: 'دمج تقارير الفروع في Excel واحد', en: 'Merging branch reports into one Excel file' },
      body: { ar: 'كل فرع بيبعت Excel بشكل شبه مختلف. الأداة بتقرا الكل، وتوحّد الأعمدة، وتنضّف الأرقام والتواريخ، وتطلّع ملف منسّق بشيت ملخص وشيت مشاكل.\n\n**المهارات:** الأسابيع 10 و11 و19.', en: 'Every branch sends a slightly different Excel file. The tool reads them all, unifies the columns, cleans numbers and dates, and produces a formatted file with a summary sheet and a problems sheet.\n\n**Skills:** weeks 10, 11 and 19.' },
      'try': { ar: 'اعمل 5 ملفات فروع بأعمدة مختلفة شوية واختبر.', en: 'Create 5 branch files with slightly different columns and test.' } },
    { id: 'p-invoices', min: 180, t: { ar: 'فواتير PDF عربي بالإيميل', en: 'Arabic PDF invoices by email' },
      body: { ar: 'من شيت الطلبات لفاتورة PDF لكل عميل بلوجو وQR وخط عربي، وإيميل HTML بالفاتورة، وسجل إرسال يمنع التكرار.\n\n**المهارات:** الأسابيع 11 و12 و17.', en: 'From the orders sheet to a PDF invoice per customer with a logo, a QR and an Arabic font, an HTML email with the invoice attached, and a send log preventing duplicates.\n\n**Skills:** weeks 11, 12 and 17.' },
      'try': { ar: 'شغّله dry run بملفات .eml قبل أي إرسال.', en: 'Run it as a dry run with .eml files before sending anything.' } },
    { id: 'p-price-watch', min: 180, t: { ar: 'مراقب أسعار منافسين', en: 'A competitor price watcher' },
      body: { ar: 'سحب مسؤول (robots وتأخير وcache) لأسعار منتجات، ومقارنة باللقطة اللي فاتت، وتنبيه Telegram بالتغيير المهم بس، وتقرير HTML برسم.\n\n**المهارات:** الأسابيع 13 و15 و16.', en: 'Responsible collection (robots, delays and a cache) of product prices, comparison with the last snapshot, a Telegram alert only for meaningful changes, and an HTML report with a chart.\n\n**Skills:** weeks 13, 15 and 16.' },
      'try': { ar: 'اتمرّن على books.toscrape.com الأول.', en: 'Practise on books.toscrape.com first.' } },
    { id: 'p-monthly-report', min: 240, t: { ar: 'التقرير الشهري الأوتوماتيك', en: 'The automatic monthly report' },
      body: { ar: 'أول كل شهر 8 الصبح: يقرا المبيعات، يحلّل بـ pandas، يرسم، يطلّع Excel وPDF، ويبعت إيميل وTelegram بسطر خلاصة.\n\n**المهارات:** الأسابيع 18 و19 و20.', en: 'At 08:00 on the first of each month: read the sales, analyse with pandas, draw charts, produce Excel and PDF, and send an email plus a one-line Telegram summary.\n\n**Skills:** weeks 18, 19 and 20.' },
      'try': { ar: 'خلي الشهر افتراضيًا «الشهر اللي فات» بتوقيت القاهرة.', en: 'Default to «last month» in Cairo time.' } },
    { id: 'p-leads', min: 150, t: { ar: 'استقبال عملاء محتملين من فورم', en: 'Capturing leads from a form' },
      body: { ar: 'صفحة هبوط بفورم (HTML/CSS/JS) → n8n Webhook → تنضيف الموبايل والإيميل عن طريق API بايثون → شيت وCRM → رسالة ترحيب.\n\n**المهارات:** الأسابيع 10 و14 و15 و21.', en: 'A landing page with a form (HTML/CSS/JS) → an n8n Webhook → phone and email cleaning through a Python API → a sheet and a CRM → a welcome message.\n\n**Skills:** weeks 10, 14, 15 and 21.' },
      'try': { ar: 'فعّل CORS للدومين بتاعك بس.', en: 'Enable CORS for your domain only.' } },
    { id: 'p-inbox-ai', min: 240, t: { ar: 'تصنيف رسايل العملاء بالـ AI', en: 'Classifying customer messages with AI' },
      body: { ar: 'إخفاء البيانات الحساسة → استخراج `Ticket` منظم بـ Pydantic → SQLite → الأولوية العالية لـ n8n وTelegram → eval بـ 30 رسالة يثبت الجودة.\n\n**المهارات:** الأسابيع 10 و18 و21 و23.', en: 'Hide sensitive data → extract a structured `Ticket` with Pydantic → SQLite → high priority to n8n and Telegram → a 30-message eval proving quality.\n\n**Skills:** weeks 10, 18, 21 and 23.' },
      'try': { ar: 'ابدأ بنموذج وهمي (mock) والاختبارات قبل المفتاح.', en: 'Start with a fake model (mock) and tests before using a key.' } },
    { id: 'p-mcp', min: 150, t: { ar: 'MCP server لبيانات شغلك', en: 'An MCP server for your work data' },
      body: { ar: 'سيرفر بيعرض للمساعد أدوات قراية (مبيعات، طلبات، مخزون) وresource بالجداول، وأداة كتابة واحدة بموافقة إنسان. توصله بـ Claude Desktop أو Claude Code أو n8n.\n\n**المهارات:** الأسابيع 18 و23.', en: 'A server offering the assistant read tools (sales, orders, stock), a resource describing the tables, and one writing tool behind human approval. Connect it to Claude Desktop, Claude Code or n8n.\n\n**Skills:** weeks 18 and 23.' },
      'try': { ar: 'جرّبه بالـ MCP Inspector قبل التوصيل.', en: 'Test it with the MCP Inspector before connecting it.' } },
    { id: 'p-backup', min: 90, t: { ar: 'نسخ احتياطي أوتوماتيك بتنبيه', en: 'Automatic backups with alerts' },
      body: { ar: 'zip يومي لفولدرات مهمة + pg_dump، والاحتفاظ بآخر 14، ونسخة لمكان تاني، وتنبيه لو فشل، واختبار استرجاع شهري.\n\n**المهارات:** الأسابيع 8 و9 و20 و24.', en: 'A daily zip of important folders + pg_dump, keeping the last 14, a copy elsewhere, an alert on failure, and a monthly restore test.\n\n**Skills:** weeks 8, 9, 20 and 24.' },
      'try': { ar: 'اعمل استرجاع فعلي مرة واحدة على الأقل.', en: 'Do at least one real restore.' } },
    { id: 'p-dashboard', min: 180, t: { ar: 'لوحة مبيعات تفاعلية', en: 'An interactive sales dashboard' },
      body: { ar: 'Python بيطلّع `data.json` كل ساعة، وصفحة ثابتة (GitHub Pages أو السيرفر) بترسم بـ Chart.js وفيها بحث وفلاتر.\n\n**المهارات:** الأسابيع 14 و15 و19.', en: 'Python writes `data.json` every hour, and a static page (GitHub Pages or the server) draws it with Chart.js, with search and filters.\n\n**Skills:** weeks 14, 15 and 19.' },
      'try': { ar: 'تأكد إن مفيش أي مفتاح سري في الصفحة.', en: 'Make sure there is no secret key in the page.' } }
  ]
});

function E(id, cat, msg, ar, en, fixAr, fixEn, code){
  return { id: id, cat: cat, t: { ar: msg, en: msg }, body: { ar: ar + '\n\n**الحل:** ' + fixAr, en: en + '\n\n**Fix:** ' + fixEn }, code: code || '' };
}
SECTIONS.add({
  page: 'python', id: 'errors', order: 5, type: 'cards', kind: 'e',
  title: { ar: 'رسائل أخطاء هتقابلها', en: 'Error messages you will meet' }, nav: { ar: 'الأخطاء', en: 'Errors' },
  desc: { ar: 'أشهر أخطاء Python والأدوات اللي حواليها: معناها، وسببها الغالب، والحل، ومثال. اقرا **آخر سطر** في الـ traceback الأول.', en: 'The commonest errors in Python and its tools: what they mean, the usual cause, the fix and an example. Read the **last line** of the traceback first.' },
  searchHint: { ar: 'KeyError، encoding، 429…', en: 'KeyError, encoding, 429…' },
  cats: [{ id: 'py', t: { ar: 'Python', en: 'Python' } }, { id: 'files', t: { ar: 'الملفات والبيانات', en: 'Files and data' } }, { id: 'web', t: { ar: 'الويب والـ APIs', en: 'Web and APIs' } }, { id: 'env', t: { ar: 'البيئة والأدوات', en: 'Environment and tools' } }],
  items: [
    E('name', 'py', "NameError: name 'x' is not defined", 'استخدمت اسم Python متعرفهوش.', 'You used a name Python does not know.', 'صلّح الكتابة، أو عرّف المتغير قبل استخدامه، أو اعمل import.', 'Fix the spelling, define the variable before using it, or add the import.', 'totl = 5\nprint(total)   # NameError: total'),
    E('type', 'py', 'TypeError: can only concatenate str (not "int") to str', 'بتجمع نص على رقم.', 'You are adding text and a number.', 'حوّل بـ `str()` أو استخدم f-string.', 'Convert with `str()` or use an f-string.', 'print("Items: " + str(3))\nprint(f"Items: {3}")'),
    E('value', 'py', "ValueError: invalid literal for int() with base 10: 'abc'", 'النص مش رقم صحيح.', 'The text is not a whole number.', 'نضّف النص أو اتحقق بـ `isdigit()` أو امسك ValueError.', 'Clean the text, check with `isdigit()` or catch ValueError.', 'try:\n    qty = int(text)\nexcept ValueError:\n    qty = None'),
    E('index', 'py', 'IndexError: list index out of range', 'فهرس برّه القايمة (غالبًا قايمة فاضية).', 'An index outside the list (often an empty list).', 'اتأكد من `len()` أو استخدم `items[-1] if items else None`.', 'Check `len()` or use `items[-1] if items else None`.', 'last = items[-1] if items else None'),
    E('key', 'py', "KeyError: 'phone'", 'المفتاح مش موجود في الـ dict.', 'The key is not in the dict.', 'استخدم `d.get("phone")` أو اتأكد بـ `in`.', 'Use `d.get("phone")` or check with `in`.', 'phone = customer.get("phone", "-")'),
    E('attr-none', 'py', "AttributeError: 'NoneType' object has no attribute 'lower'", 'القيمة None (دالة رجّعت None أو re.search ملقاش).', 'The value is None (a function returned None or re.search found nothing).', 'افحص None قبل الاستخدام.', 'Check for None before using it.', 'm = re.search(r"\\d+", text)\nnumber = m.group() if m else None'),
    E('indent', 'py', 'IndentationError: unexpected indent', 'المسافات في أول السطر مش مظبوطة.', 'The leading spaces are inconsistent.', '4 مسافات لكل مستوى، ومتخلطش Tab ومسافات.', 'Use 4 spaces per level and never mix tabs and spaces.', ''),
    E('zero', 'py', 'ZeroDivisionError: division by zero', 'قسمة على صفر (غالبًا متوسط قايمة فاضية).', 'Division by zero (often the average of an empty list).', 'افحص المقام الأول.', 'Check the divisor first.', 'avg = total / count if count else 0'),
    E('recursion', 'py', 'RecursionError: maximum recursion depth exceeded', 'دالة بتنادي نفسها من غير نهاية.', 'A function calls itself with no end.', 'حط شرط توقف، أو حوّلها لوب.', 'Add a stop condition or turn it into a loop.', ''),
    E('fnf', 'files', "FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'", 'الملف مش في المسار ده (غالبًا الفولدر الحالي مختلف).', 'The file is not at that path (often the current folder differs).', 'اطبع `Path.cwd()`، واستخدم مسار كامل أو `Path(__file__).parent / "data.csv"`.', 'Print `Path.cwd()` and use a full path or `Path(__file__).parent / "data.csv"`.', 'from pathlib import Path\nDATA = Path(__file__).parent / "data.csv"'),
    E('unicode', 'files', "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe1", 'الملف مش UTF-8 (ملفات عربي قديمة غالبًا cp1256).', 'The file is not UTF-8 (old Arabic files are often cp1256).', 'جرّب `encoding="cp1256"` أو `utf-8-sig`، واكتب دايمًا بـ UTF-8.', 'Try `encoding="cp1256"` or `utf-8-sig`, and always write UTF-8.', 'text = path.read_text(encoding="cp1256")'),
    E('perm', 'files', "PermissionError: [Errno 13] Permission denied: 'report.xlsx'", 'الملف مفتوح في Excel أو مفيش صلاحية.', 'The file is open in Excel or you lack permission.', 'اقفل الملف، أو احفظ باسم جديد بالتاريخ.', 'Close the file, or save under a new dated name.', ''),
    E('json', 'files', 'json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes', 'النص مش JSON سليم (علامات مفردة أو فاصلة زيادة).', 'The text is not valid JSON (single quotes or a trailing comma).', 'صلّح المصدر، أو اطبع أول 200 حرف وشوف المشكلة.', 'Fix the source, or print the first 200 characters to see the problem.', ''),
    E('csv-blank', 'files', 'Blank lines between CSV rows on Windows', 'فتحت الملف للكتابة من غير `newline=""`.', 'You opened the file for writing without `newline=""`.', 'افتح بـ `open(p, "w", newline="", encoding="utf-8")`.', 'Open it with `open(p, "w", newline="", encoding="utf-8")`.', ''),
    E('setting-copy', 'files', 'SettingWithCopyWarning (pandas)', 'بتعدّل جزء من DataFrame ممكن يكون نسخة.', 'You are changing a slice of a DataFrame that may be a copy.', 'استخدم `.loc[...]` أو `.copy()` بعد الفلترة.', 'Use `.loc[...]` or `.copy()` after filtering.', 'cairo = df[df.city == "Cairo"].copy()\ncairo["vip"] = cairo.total > 5000'),
    E('integrity', 'files', 'sqlite3.IntegrityError: UNIQUE constraint failed: customers.email', 'بتدخّل قيمة موجودة في عمود UNIQUE.', 'You are inserting a value that already exists in a UNIQUE column.', 'استخدم upsert (`ON CONFLICT DO UPDATE`) أو افحص الأول.', 'Use an upsert (`ON CONFLICT DO UPDATE`) or check first.', ''),
    E('conn', 'web', 'requests.exceptions.ConnectionError: Max retries exceeded', 'مفيش اتصال أو العنوان غلط أو السيرفر واقع.', 'No connection, a wrong address, or the server is down.', 'اتأكد من الـ URL والنت، وأعد المحاولة بـ backoff.', 'Check the URL and the network, and retry with backoff.', ''),
    E('timeout', 'web', 'requests.exceptions.ReadTimeout', 'السيرفر مردّش في الوقت.', 'The server did not answer in time.', 'زوّد timeout شوية وأعد المحاولة للأخطاء المؤقتة بس.', 'Raise the timeout a little and retry temporary errors only.', 'r = requests.get(url, timeout=(5, 30))'),
    E('401', 'web', '401 Unauthorized', 'المفتاح أو التوكن ناقص أو غلط أو انتهى.', 'The key or token is missing, wrong or expired.', 'اتأكد من اسم الـ header (Bearer ولا X-API-Key) والقيمة في .env.', 'Check the header name (Bearer or X-API-Key) and the value in .env.', ''),
    E('429', 'web', '429 Too Many Requests', 'بعت طلبات أسرع من المسموح.', 'You sent requests faster than allowed.', 'استنى `Retry-After`، وقلّل السرعة (Semaphore أو sleep).', 'Wait for `Retry-After` and slow down (a Semaphore or sleep).', ''),
    E('422', 'web', '422 Unprocessable Entity (FastAPI)', 'البيانات اللي بعتها مش مطابقة للموديل.', 'The data you sent does not match the model.', 'اقرا `detail` فيه مكان كل غلطة بالظبط.', 'Read `detail`: it points at each error exactly.', ''),
    E('cors', 'web', 'Blocked by CORS policy: No Access-Control-Allow-Origin header', 'الصفحة بتقرا رد من دومين تاني مش سامح بيها.', 'The page reads a response from another domain that does not allow it.', 'اسمح بالدومين في السيرفر (CORSMiddleware أو Allowed Origins في n8n).', 'Allow the domain on the server (CORSMiddleware or Allowed Origins in n8n).', ''),
    E('ssl', 'web', 'SSLError: CERTIFICATE_VERIFY_FAILED', 'شهادة الموقع مش متوثقة على جهازك (أو شبكة شركة).', 'The site’s certificate is not trusted on your machine (or a corporate network).', 'حدّث `certifi`، ومتستخدمش `verify=False` غير للتجربة المحلية.', 'Update `certifi`, and never use `verify=False` except for local testing.', ''),
    E('module', 'env', "ModuleNotFoundError: No module named 'requests'", 'الحزمة مش متثبتة في البيئة اللي شغالة.', 'The package is not installed in the active environment.', 'فعّل الـ venv الصح، وثبّت بـ `python -m pip install requests`.', 'Activate the right venv and install with `python -m pip install requests`.', ''),
    E('not-recognized', 'env', "'python' is not recognized as an internal or external command", 'Python مش على الـ PATH في Windows.', 'Python is not on PATH on Windows.', 'استخدم `py`، أو أعد التثبيت وعلّم «Add to PATH».', 'Use `py`, or reinstall with «Add to PATH» ticked.', ''),
    E('ps-policy', 'env', 'Activate.ps1 cannot be loaded because running scripts is disabled', 'PowerShell مانع تشغيل السكربتات.', 'PowerShell blocks running scripts.', '`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` مرة واحدة.', 'Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.', ''),
    E('port', 'env', 'OSError: [Errno 98] Address already in use', 'البورت مستخدم من برنامج تاني (أو نسخة شغالة من سيرفرك).', 'The port is used by another program (or a running copy of your server).', 'اقفل النسخة القديمة أو غيّر البورت.', 'Stop the old copy or change the port.', ''),
    E('docker-localhost', 'env', 'Connection refused to localhost from inside Docker', 'localhost جوه الـ container هو الـ container نفسه.', 'localhost inside a container is the container itself.', 'استخدم اسم الخدمة في compose أو `host.docker.internal`.', 'Use the compose service name or `host.docker.internal`.', '')
  ]
});
})();
