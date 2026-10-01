// Python week 11 — CSV and Excel.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('CSV وExcel', 'CSV and Excel'),
  goal: B('تقرا وتكتب CSV صح بالعربي، وتشتغل على ملفات Excel بـ openpyxl: تقرا الشيتات، وتكتب تقارير منسّقة بعناوين وأرقام وألوان ومعادلات، وتدمج ملفات كتير في ملف واحد — أكتر أتمتة مطلوبة في أي شركة.',
          'Read and write CSV correctly with Arabic, and work with Excel files using openpyxl: read sheets, write formatted reports with headers, numbers, colours and formulas, and merge many files into one — the most requested automation in any company.'),
  days: [
    { title: B('CSV صح', 'CSV done right'),
      goal: B('تقرا وتكتب CSV بموديول csv (مش split)، بـ DictReader وDictWriter، والعربي يفتح صح في Excel.', 'Read and write CSV with the csv module (not split), using DictReader and DictWriter, with Arabic opening correctly in Excel.'),
      learn: [
        { h: B('csv.reader وDictReader', 'csv.reader and DictReader'),
          p: B('افتح الملف بـ `newline=""` و`encoding="utf-8"`، و`csv.DictReader(f)` بيرجّع كل صف dict بأسماء الأعمدة من أول سطر. كل القيم بتيجي **نصوص** — حوّل الأرقام بنفسك. `csv.reader` بيرجّع قوايم لو مفيش عناوين.', 'Open the file with `newline=""` and `encoding="utf-8"`, and `csv.DictReader(f)` returns each row as a dict keyed by the header names. Every value arrives as **text** — convert numbers yourself. `csv.reader` returns lists when there is no header.'),
          ex: 'import csv\nfrom pathlib import Path\nPath("sales.csv").write_text("date,city,amount\\n2026-09-01,Cairo,1200\\n2026-09-01,Giza,450.5\\n2026-09-02,Cairo,3100\\n", encoding="utf-8")\nwith open("sales.csv", newline="", encoding="utf-8") as f:\n    rows = list(csv.DictReader(f))\nprint(rows[0])\ntotal = sum(float(r["amount"]) for r in rows)\nprint("total:", total)', run: 1 },
        { h: B('DictWriter', 'DictWriter'),
          p: B('`csv.DictWriter(f, fieldnames=[...])` و`writeheader()` و`writerows(list_of_dicts)`. افتح بـ `"w"` و`newline=""` (من غيرها بيظهر سطر فاضي بين الصفوف على Windows). لو الملف هيتفتح في Excel وفيه عربي استخدم `encoding="utf-8-sig"`.', '`csv.DictWriter(f, fieldnames=[...])`, then `writeheader()` and `writerows(list_of_dicts)`. Open with `"w"` and `newline=""` (without it Windows shows an empty line between rows). If the file will open in Excel and has Arabic, use `encoding="utf-8-sig"`.'),
          ex: 'import csv\ncustomers = [\n    {"name": "سارة أحمد", "city": "القاهرة", "orders": 3},\n    {"name": "Omar Adel", "city": "Giza", "orders": 1},\n]\nwith open("customers.csv", "w", newline="", encoding="utf-8-sig") as f:\n    w = csv.DictWriter(f, fieldnames=["name", "city", "orders"])\n    w.writeheader()\n    w.writerows(customers)\nprint(open("customers.csv", encoding="utf-8-sig").read())', run: 1 },
        { h: B('الفواصل والمشاكل الشائعة', 'Delimiters and common problems'),
          p: B('بعض الملفات (من Excel الأوروبي أو أنظمة قديمة) بتستخدم `;` بدل `,`: `delimiter=";"`. قيمة فيها فاصلة بتتحط بين علامات تنصيص لوحدها مع csv. ولو مش عارف الفاصل، `csv.Sniffer().sniff(sample)` بيخمّنه. وأي عمود مالوش قيمة بيجي نص فاضي `""` مش None.', 'Some files (from European Excel or old systems) use `;` instead of `,`: `delimiter=";"`. A value containing a comma is quoted automatically by csv. If you do not know the delimiter, `csv.Sniffer().sniff(sample)` guesses it. An empty column arrives as `""`, not None.'),
          ex: 'import csv, io\ntext = \'id;name;note\\n1;"Ahmed, Sara";\\n2;Omar;"VIP; pays cash"\\n\'\ndialect = csv.Sniffer().sniff(text.splitlines()[0])\nprint("delimiter:", repr(dialect.delimiter))\nfor row in csv.DictReader(io.StringIO(text), delimiter=";"):\n    print(row, "| note empty:", row["note"] == "")', run: 1 }
      ],
      practice: [
        B('صدّر قايمة منتجات (من أسبوع 5) لـ CSV وافتحه في Excel أو Google Sheets.', 'Export a product list (from week 5) to CSV and open it in Excel or Google Sheets.'),
        B('اقرا CSV مبيعات واحسب المجموع لكل مدينة بـ defaultdict.', 'Read a sales CSV and total it per city with defaultdict.'),
        B('اكتب نفس الملف مرة بـ utf-8 ومرة بـ utf-8-sig وافتح الاتنين في Excel.', 'Write the same file with utf-8 and with utf-8-sig and open both in Excel.'),
        B('اقرا ملف فاصله `;` من غير ما تقوله الفاصل، بـ Sniffer.', 'Read a `;`-separated file without telling it the delimiter, using Sniffer.')
      ],
      code: [
        { u: B('فلترة CSV لملف جديد', 'Filtering a CSV into a new file'), p: 'import csv\nfrom pathlib import Path\nPath("orders.csv").write_text("id,status,total\\n1,paid,1200\\n2,new,90\\n3,paid,3100\\n4,cancelled,45\\n", encoding="utf-8")\nwith open("orders.csv", newline="", encoding="utf-8") as src, open("paid.csv", "w", newline="", encoding="utf-8") as dst:\n    reader = csv.DictReader(src)\n    writer = csv.DictWriter(dst, fieldnames=reader.fieldnames)\n    writer.writeheader()\n    kept = 0\n    for row in reader:\n        if row["status"] == "paid":\n            writer.writerow(row)\n            kept += 1\nprint(kept, "rows written")\nprint(Path("paid.csv").read_text(encoding="utf-8"))', run: 1 }
      ],
      words: [
        { t: 'CSV', m: B('ملف نصي جدول: كل سطر صف والقيم بينها فواصل', 'a text-file table: each line a row, values separated by commas'), ex: 'name,city\\nSara,Cairo' },
        { t: 'DictReader', m: B('بيقرا كل صف CSV كـ dict بأسماء الأعمدة', 'reads each CSV row as a dict keyed by column names'), ex: 'csv.DictReader(f)' },
        { t: 'DictWriter', m: B('بيكتب dicts كصفوف CSV', 'writes dicts as CSV rows'), ex: 'csv.DictWriter(f, fieldnames=cols)' },
        { t: 'delimiter', m: B('الحرف اللي بيفصل بين القيم: , أو ; أو tab', 'the character separating values: , or ; or a tab'), ex: 'delimiter=";"' },
        { t: 'quoting', m: B('حط القيمة بين علامات تنصيص لما يكون فيها فاصلة', 'putting a value in quotes when it contains a delimiter'), ex: '"Ahmed, Sara"' },
        { t: 'fieldnames', m: B('أسماء الأعمدة بالترتيب', 'the column names, in order'), ex: 'reader.fieldnames' }
      ],
      read: ['lib:csv — CSV File Reading and Writing', { lib: 'Automate the Boring Stuff with Python', what: B('فصل CSV وJSON: جزء The csv Module.', 'The CSV and JSON chapter: the csv module part.') }],
      challenge: B('اكتب `merge_csv.py` بيدمج كل ملفات CSV في فولدر (نفس الأعمدة) في ملف واحد، وبيزوّد عمود `source` باسم الملف، ويشيل الصفوف المكررة تمامًا، ويطبع عدد الصفوف من كل ملف.', 'Write `merge_csv.py` that merges every CSV in a folder (same columns) into one file, adds a `source` column with the file name, removes fully duplicate rows, and prints the row count from each file.'),
      quiz: [
        { q: B('القيم اللي بتيجي من DictReader نوعها:', 'Values from DictReader have the type:'), o: ['str', B('حسب العمود', 'it depends on the column'), 'float'], a: 0, why: B('CSV كله نص.', 'CSV is all text.') },
        { q: B('ليه `newline=""` وقت فتح CSV؟', 'Why `newline=""` when opening a CSV?'), o: [B('عشان متظهرش سطور فاضية وتتقرا القيم متعددة السطور صح', 'to avoid blank lines and read multi-line values correctly'), B('عشان العربي', 'for Arabic'), B('أسرع', 'it is faster')], a: 0, why: B('csv بيدير نهايات السطور بنفسه.', 'csv manages line endings itself.') },
        { q: B('CSV عربي هيتفتح في Excel، الترميز الأحسن:', 'An Arabic CSV for Excel; best encoding:'), o: ['utf-8-sig', 'ascii', 'cp437'], a: 0, why: B('الـ BOM بيعرّف Excel إنه UTF-8.', 'The BOM tells Excel it is UTF-8.') }
      ] },

    { title: B('قراءة Excel بـ openpyxl', 'Reading Excel with openpyxl'),
      goal: B('تفتح ملف xlsx، وتختار الشيت، وتقرا خلايا وصفوف، وتحوّل الشيت لقايمة dicts.', 'Open an xlsx file, pick the sheet, read cells and rows, and turn a sheet into a list of dicts.'),
      learn: [
        { h: B('ملف تجريبي من Python', 'A test file made in Python'),
          p: B('عشان تتمرّن من غير ملفات حقيقية فيها بيانات حساسة، اعمل ملف Excel تجريبي بكود: `Workbook()` و`ws.append([...])` لكل صف و`wb.save(...)`. كده بتختبر سكربتك على بيانات انت عارفها.', 'To practise without real files holding sensitive data, create a test Excel file in code: `Workbook()`, `ws.append([...])` for each row and `wb.save(...)`. That way you test your script on data you know.'),
          ex: 'from openpyxl import Workbook\nimport random\nfrom datetime import date, timedelta\n\nrandom.seed(1)\nwb = Workbook()\nws = wb.active\nws.title = "Sales"\nws.append(["date", "city", "product", "qty", "price"])\nfor i in range(50):\n    ws.append([date(2026, 9, 1) + timedelta(days=i % 30), random.choice(["Cairo", "Giza", "Alex"]),\n               random.choice(["Pen", "Bag", "Notebook"]), random.randint(1, 10), random.choice([30, 650, 45])])\nwb.save("sales.xlsx")\nprint("sales.xlsx ready")' },
        { h: B('الملف والشيت والخلية', 'Workbook, sheet and cell'),
          p: B('`pip install openpyxl`. `wb = load_workbook("sales.xlsx", data_only=True)` (data_only بيجيب نتيجة المعادلات مش المعادلة نفسها). `wb.sheetnames` أسماء الشيتات، `ws = wb["Sales"]` شيت معيّن، `ws["B2"].value` قيمة خلية، و`ws.max_row` عدد الصفوف.', '`pip install openpyxl`. `wb = load_workbook("sales.xlsx", data_only=True)` (data_only returns formula results instead of the formulas). `wb.sheetnames` lists the sheets, `ws = wb["Sales"]` picks one, `ws["B2"].value` reads a cell, and `ws.max_row` is the number of rows.'),
          ex: '# pip install openpyxl\nfrom openpyxl import load_workbook\n\nwb = load_workbook("sales.xlsx", data_only=True)\nprint(wb.sheetnames)\nws = wb["Sales"]\nprint(ws["A1"].value, ws["B2"].value)\nprint(ws.max_row, ws.max_column)' },
        { h: B('اللف على الصفوف', 'Looping over rows'),
          p: B('`ws.iter_rows(min_row=2, values_only=True)` بيرجّع كل صف tuple قيم (من غير العناوين). اعمل dicts: خد العناوين من الصف الأول و`zip`. اتخطى الصفوف الفاضية (`if not any(row)`). الأرقام بتيجي أرقام والتواريخ datetime — عكس CSV.', '`ws.iter_rows(min_row=2, values_only=True)` yields each row as a tuple of values (skipping the headers). To make dicts, take the headers from the first row and `zip`. Skip empty rows (`if not any(row)`). Numbers arrive as numbers and dates as datetime — unlike CSV.'),
          ex: 'from openpyxl import load_workbook\n\ndef sheet_to_dicts(path, sheet=None):\n    wb = load_workbook(path, data_only=True, read_only=True)\n    ws = wb[sheet] if sheet else wb.active\n    rows = ws.iter_rows(values_only=True)\n    headers = [str(h).strip() for h in next(rows)]\n    return [dict(zip(headers, r)) for r in rows if any(v is not None for v in r)]\n\nfor row in sheet_to_dicts("sales.xlsx", "Sales")[:3]:\n    print(row)' }
      ],
      practice: [
        B('اعمل `sales.xlsx` التجريبي (50 صف) بالكود اللي فوق.', 'Create the test `sales.xlsx` (50 rows) with the code above.'),
        B('اقراه بـ `sheet_to_dicts` واحسب الإجمالي `qty * price` لكل مدينة.', 'Read it with `sheet_to_dicts` and compute `qty * price` per city.'),
        B('افتح ملف Excel حقيقي عندك فيه أكتر من شيت واطبع أسماء الشيتات وعدد الصفوف في كل واحد.', 'Open a real Excel file of yours with several sheets and print the sheet names and the row count of each.'),
        B('جرّب `data_only=True` و`False` على خلية فيها معادلة وشوف الفرق.', 'Try `data_only=True` and `False` on a cell with a formula and see the difference.')
      ],
      code: [
        { u: B('ملخص من Excel', 'A summary from Excel'), p: 'from collections import defaultdict\nfrom openpyxl import load_workbook\n\nwb = load_workbook("sales.xlsx", data_only=True, read_only=True)\nws = wb["Sales"]\ntotals = defaultdict(float)\nfor date, city, product, qty, price in ws.iter_rows(min_row=2, values_only=True):\n    if city:\n        totals[city] += qty * price\nfor city, total in sorted(totals.items(), key=lambda kv: -kv[1]):\n    print(f"{city:<6}{total:>12,.2f}")' }
      ],
      words: [
        { t: 'openpyxl', m: B('مكتبة Python لقراءة وكتابة ملفات Excel (xlsx)', 'a Python library for reading and writing Excel (xlsx) files'), ex: 'from openpyxl import load_workbook' },
        { t: 'workbook', m: B('ملف Excel كله', 'a whole Excel file'), ex: 'wb = load_workbook("a.xlsx")' },
        { t: 'worksheet', m: B('شيت واحد جوه الملف', 'one sheet inside the file'), ex: 'ws = wb["Sales"]' },
        { t: 'cell', m: B('خانة واحدة بعنوان زي B2', 'one box with an address such as B2'), ex: 'ws["B2"].value' },
        { t: 'data_only', m: B('خيار بيقرا نتيجة المعادلات بدل المعادلة', 'an option that reads formula results instead of formulas'), ex: 'load_workbook(p, data_only=True)' },
        { t: 'iter_rows', m: B('بيلف على صفوف الشيت', 'loops over a sheet’s rows'), ex: 'ws.iter_rows(min_row=2, values_only=True)' }
      ],
      read: [{ lib: 'openpyxl documentation', what: B('اقرا Tutorial: Loading from a file وAccessing many cells.', 'Read the Tutorial: Loading from a file and Accessing many cells.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Excel Spreadsheets لحد Writing Excel Documents.', 'The Excel Spreadsheets chapter up to Writing Excel Documents.') }],
      challenge: B('اكتب `excel_audit.py` بياخد ملف Excel ويطبع لكل شيت: عدد الصفوف والأعمدة، والعناوين، وأي عمود فيه خلايا فاضية (وكام)، وأي عمود أرقامه فيها نص (زي "1,200" مكتوبة نص).', 'Write `excel_audit.py` that takes an Excel file and prints for each sheet: rows and columns, the headers, every column with empty cells (and how many), and every number column containing text (like "1,200" typed as text).'),
      quiz: [
        { q: B('عشان تاخد نتيجة المعادلة مش المعادلة:', 'To get a formula’s result instead of the formula:'), o: ['data_only=True', 'read_only=True', 'values=True'], a: 0, why: B('data_only.', 'data_only.') },
        { q: B('`ws.iter_rows(min_row=2, values_only=True)` بيرجّع:', '`ws.iter_rows(min_row=2, values_only=True)` yields:'), o: [B('tuples قيم من الصف التاني', 'tuples of values from row two'), B('dicts', 'dicts'), B('خلايا بتنسيقها', 'cells with formatting')], a: 0, why: B('values_only = القيم بس.', 'values_only = just the values.') },
        { q: B('التاريخ في Excel بيتقري بـ openpyxl كـ:', 'A date in Excel is read by openpyxl as:'), o: ['datetime', B('نص دايمًا', 'always text'), B('رقم دايمًا', 'always a number')], a: 0, why: B('عكس CSV.', 'Unlike CSV.') }
      ] },

    { title: B('كتابة تقارير Excel منسّقة', 'Writing formatted Excel reports'),
      goal: B('تكتب تقرير Excel يبان شغل محترف: عناوين بخط تقيل ولون، وعرض أعمدة مناسب، وأرقام بتنسيق فلوس، وتجميد الصف الأول، وفلتر.', 'Write an Excel report that looks professional: bold coloured headers, sensible column widths, money number formats, a frozen first row and a filter.'),
      learn: [
        { h: B('الكتابة', 'Writing'),
          p: B('`wb = Workbook()`، `ws = wb.active`، `ws.title = "Report"`، و`ws.append(row)` لكل صف، و`wb.save("report.xlsx")`. شيت جديد: `wb.create_sheet("Cairo")`. خلية مباشرة: `ws["E1"] = "Total"` أو `ws.cell(row=1, column=5, value=...)`.', '`wb = Workbook()`, `ws = wb.active`, `ws.title = "Report"`, `ws.append(row)` for each row, and `wb.save("report.xlsx")`. A new sheet: `wb.create_sheet("Cairo")`. A cell directly: `ws["E1"] = "Total"` or `ws.cell(row=1, column=5, value=...)`.'),
          ex: 'from openpyxl import Workbook\nwb = Workbook()\nws = wb.active\nws.title = "Report"\nws.append(["City", "Orders", "Revenue"])\nfor row in [["Cairo", 42, 128500.5], ["Giza", 18, 40210], ["Alex", 25, 77300.75]]:\n    ws.append(row)\nwb.save("report.xlsx")' },
        { h: B('التنسيق', 'Formatting'),
          p: B('`Font(bold=True, color="FFFFFF")` و`PatternFill("solid", fgColor="3F8F63")` للعناوين، و`cell.number_format = "#,##0.00"` للفلوس، و`"0.0%"` للنسب، و`ws.column_dimensions["A"].width = 18`، و`ws.freeze_panes = "A2"` يثبّت العناوين، و`ws.auto_filter.ref = ws.dimensions` يحط فلتر.', '`Font(bold=True, color="FFFFFF")` and `PatternFill("solid", fgColor="3F8F63")` for headers, `cell.number_format = "#,##0.00"` for money and `"0.0%"` for percentages, `ws.column_dimensions["A"].width = 18`, `ws.freeze_panes = "A2"` keeps the headers visible, and `ws.auto_filter.ref = ws.dimensions` adds a filter.'),
          ex: 'from openpyxl import load_workbook\nfrom openpyxl.styles import Font, PatternFill, Alignment\n\nwb = load_workbook("report.xlsx")\nws = wb["Report"]\nfor cell in ws[1]:\n    cell.font = Font(bold=True, color="FFFFFF")\n    cell.fill = PatternFill("solid", fgColor="3F8F63")\n    cell.alignment = Alignment(horizontal="center")\nfor (cell,) in ws.iter_rows(min_row=2, min_col=3, max_col=3):\n    cell.number_format = "#,##0.00"\nfor col, width in {"A": 16, "B": 10, "C": 16}.items():\n    ws.column_dimensions[col].width = width\nws.freeze_panes = "A2"\nws.auto_filter.ref = ws.dimensions\nwb.save("report.xlsx")' },
        { h: B('من غير ما تبوّظ ملف حد', 'Without breaking anyone’s file'),
          p: B('اكتب تقريرك في ملف **جديد** باسم فيه التاريخ، متكتبش فوق ملف الأصل. ولو لازم تعدّل ملف موجود: اعمل نسخة الأول، وافتكر إن openpyxl ممكن يضيّع حاجات زي الـ charts والـ macros (ملفات xlsm). والملف المفتوح في Excel على Windows مش هيتحفظ (`PermissionError`) — اقفله.', 'Write your report to a **new** file with the date in its name; never write over the source file. If you must edit an existing file: copy it first, and remember openpyxl can lose things like charts and macros (xlsm files). A file open in Excel on Windows cannot be saved (`PermissionError`) — close it.'),
          ex: 'from datetime import date\nfrom pathlib import Path\nimport shutil\n\nsrc = Path("sales.xlsx")\nout = Path("reports") / f"sales_report_{date.today():%Y-%m-%d}.xlsx"\nout.parent.mkdir(exist_ok=True)\nshutil.copy2(src, Path("reports") / "sales_backup.xlsx")\ntry:\n    # build the workbook, then:\n    # wb.save(out)\n    pass\nexcept PermissionError:\n    print(f"{out} is open in Excel — close it and run again")' }
      ],
      practice: [
        B('اعمل تقرير المدن بالتنسيق كله (عناوين ملوّنة، فلوس، عرض، تجميد، فلتر).', 'Build the city report with all the formatting (coloured headers, money, widths, freeze, filter).'),
        B('زوّد عمود «النسبة من الكل» بتنسيق `0.0%`.', 'Add a «share of total» column formatted `0.0%`.'),
        B('اعمل شيت لكل مدينة فيه طلباتها بس.', 'Create a sheet per city containing only its orders.'),
        B('جرّب تحفظ والملف مفتوح في Excel واقرا الخطأ.', 'Try saving while the file is open in Excel and read the error.')
      ],
      code: [
        { u: B('دالة تنسيق جاهزة', 'A ready formatting function'), p: 'from openpyxl.styles import Font, PatternFill, Alignment\nfrom openpyxl.utils import get_column_letter\n\ndef style_table(ws, money_cols=(), pct_cols=()):\n    """Bold coloured header, number formats, widths from content, frozen header and a filter."""\n    for cell in ws[1]:\n        cell.font = Font(bold=True, color="FFFFFF")\n        cell.fill = PatternFill("solid", fgColor="3F8F63")\n        cell.alignment = Alignment(horizontal="center", vertical="center")\n    for col in range(1, ws.max_column + 1):\n        letter = get_column_letter(col)\n        longest = max(len(str(c.value or "")) for c in ws[letter])\n        ws.column_dimensions[letter].width = min(max(10, longest + 2), 45)\n        fmt = "#,##0.00" if col in money_cols else "0.0%" if col in pct_cols else None\n        if fmt:\n            for c in ws[letter][1:]:\n                c.number_format = fmt\n    ws.freeze_panes = "A2"\n    ws.auto_filter.ref = ws.dimensions' }
      ],
      words: [
        { t: 'number format', m: B('شكل عرض الرقم في الخلية من غير ما تتغير قيمته', 'how a number shows in a cell without changing its value'), ex: 'cell.number_format = "#,##0.00"' },
        { t: 'fill', m: B('لون خلفية الخلية', 'a cell’s background colour'), ex: 'PatternFill("solid", fgColor="3F8F63")' },
        { t: 'freeze panes', m: B('تثبيت صفوف أو أعمدة وانت بتسكرول', 'keeping rows or columns in place while scrolling'), ex: 'ws.freeze_panes = "A2"' },
        { t: 'auto filter', m: B('أسهم الفلترة فوق الأعمدة', 'the filter arrows above the columns'), ex: 'ws.auto_filter.ref = ws.dimensions' },
        { t: 'column width', m: B('عرض العمود', 'how wide a column is'), ex: 'ws.column_dimensions["A"].width = 18' },
        { t: 'PermissionError', m: B('خطأ لما الملف مقفول أو مفتوح في برنامج تاني', 'the error when a file is locked or open in another program'), ex: 'saving a workbook open in Excel' }
      ],
      read: [{ lib: 'openpyxl documentation', what: B('اقرا Working with styles لحد Applying Styles.', 'Read Working with styles up to Applying Styles.') }, { lib: 'Automate the Boring Stuff with Python', what: B('فصل Excel: Writing Excel Documents وSetting the Font Style.', 'The Excel chapter: Writing Excel Documents and Setting the Font Style.') }],
      challenge: B('اعمل `monthly_report.py` بياخد `sales.xlsx` ويطلّع ملف تقرير جديد فيه 3 شيتات: «ملخص» (المدن بالإيراد والنسبة)، «المنتجات» (كل منتج بالكمية والإيراد)، و«الطلبات» (كل الصفوف)، كلهم بـ `style_table`.', 'Write `monthly_report.py` that takes `sales.xlsx` and produces a new report file with 3 sheets: «Summary» (cities with revenue and share), «Products» (each product with quantity and revenue) and «Orders» (every row), all with `style_table`.'),
      quiz: [
        { q: B('`number_format = "#,##0.00"` بيغيّر:', '`number_format = "#,##0.00"` changes:'), o: [B('شكل العرض بس', 'only how it is shown'), B('القيمة نفسها', 'the value itself'), B('نوع الخلية لنص', 'the cell type to text')], a: 0, why: B('القيمة بتفضل رقم.', 'The value stays a number.') },
        { q: B('عشان العناوين تفضل ظاهرة وانت بتنزل:', 'To keep the headers visible while scrolling:'), o: ['ws.freeze_panes = "A2"', 'ws.auto_filter', 'Font(bold=True)'], a: 0, why: B('تجميد أول صف.', 'Freezing the first row.') },
        { q: B('الأأمن لتقرير جديد:', 'The safest choice for a new report:'), o: [B('ملف جديد باسم فيه التاريخ', 'a new file named with the date'), B('الكتابة فوق ملف الأصل', 'writing over the source file'), B('حذف الأصل', 'deleting the source')], a: 0, why: B('الأصل يفضل سليم.', 'The source stays intact.') }
      ] },

    { title: B('معادلات وأرقام وتواريخ في Excel', 'Formulas, numbers and dates in Excel'),
      goal: B('تحط معادلات Excel من Python، وتتعامل مع التواريخ والأرقام اللي متخزنة نص، وتعرف امتى تحسب في Python وامتى في Excel.', 'Put Excel formulas in from Python, handle dates and numbers stored as text, and know when to calculate in Python and when in Excel.'),
      learn: [
        { h: B('معادلات', 'Formulas'),
          p: B('اكتب المعادلة كنص يبدأ بـ `=`: `ws["D2"] = "=B2*C2"` و`ws["D20"] = "=SUM(D2:D19)"`. Excel هو اللي بيحسبها لما يفتح الملف، فلو قريت الملف بـ openpyxl قبل ما يتفتح في Excel هتلاقي `data_only` بيرجّع None. عشان كده: معادلات لو حد هيعدّل في الشيت، وأرقام محسوبة في Python لو تقرير ثابت.', 'Write the formula as text starting with `=`: `ws["D2"] = "=B2*C2"` and `ws["D20"] = "=SUM(D2:D19)"`. Excel computes it when it opens the file, so reading it with openpyxl before Excel has opened it gives None with `data_only`. Hence: formulas when people will edit the sheet, numbers computed in Python for a fixed report.'),
          ex: 'from openpyxl import Workbook\nwb = Workbook(); ws = wb.active\nws.append(["Item", "Qty", "Price", "Total"])\nitems = [("Pen", 4, 7.5), ("Bag", 1, 650), ("Notebook", 3, 45)]\nfor i, (name, qty, price) in enumerate(items, start=2):\n    ws.append([name, qty, price, f"=B{i}*C{i}"])\nlast = len(items) + 1\nws[f"C{last + 1}"] = "Grand total"\nws[f"D{last + 1}"] = f"=SUM(D2:D{last})"\nwb.save("invoice.xlsx")' },
        { h: B('التواريخ', 'Dates'),
          p: B('اكتب `datetime` أو `date` في الخلية و Excel هيفهمها تاريخ، وحط `number_format = "yyyy-mm-dd"`. ولو قريت عمود تاريخ مكتوب نص (`"30/09/2026"`) حوّله بـ `datetime.strptime(text, "%d/%m/%Y")`. أحيانًا التاريخ بيتقري رقم (زي 46296) — ده رقم اليوم من 1900، وopenpyxl بيحوّله لو التنسيق صح.', 'Write a `datetime` or `date` into a cell and Excel treats it as a date; set `number_format = "yyyy-mm-dd"`. If you read a date column typed as text (`"30/09/2026"`), convert it with `datetime.strptime(text, "%d/%m/%Y")`. Sometimes a date reads as a number (like 46296) — the day count from 1900, which openpyxl converts when the cell format is right.'),
          ex: 'from datetime import datetime, date\n\ndef to_date(v):\n    if isinstance(v, datetime):\n        return v.date()\n    if isinstance(v, date):\n        return v\n    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y"):\n        try:\n            return datetime.strptime(str(v).strip(), fmt).date()\n        except ValueError:\n            pass\n    return None\n\nfor v in [datetime(2026, 9, 30, 14, 5), "2026-09-30", "30/09/2026", "Sept 30"]:\n    print(repr(v), "->", to_date(v))', run: 1 },
        { h: B('أرقام متخزنة نص', 'Numbers stored as text'),
          p: B('أشهر مشكلة في ملفات Excel اللي جاية من ناس: `"1,200"` و`" 450 "` و`"EGP 99"` و`"-"` بدل صفر. اعمل دالة `to_number` واحدة بتعالج كل الحالات وترجّع float أو None، واستخدمها على كل عمود أرقام قبل أي حساب، وعد القيم اللي مقدرتش تتحوّل عشان تعرف.', 'The most common problem in Excel files from people: `"1,200"`, `" 450 "`, `"EGP 99"` and `"-"` for zero. Write one `to_number` function that handles every case and returns a float or None, apply it to every number column before any calculation, and count the values it could not convert so you know.'),
          ex: 'import re\n\ndef to_number(v):\n    if v is None:\n        return None\n    if isinstance(v, (int, float)):\n        return float(v)\n    text = str(v).strip().replace(",", "")\n    if text in {"", "-", "—"}:\n        return 0.0\n    m = re.search(r"-?\\d+(?:\\.\\d+)?", text)\n    return float(m.group()) if m else None\n\nvalues = [1200, " 450 ", "1,250.5", "EGP 99", "-", "n/a", None]\nprint([to_number(v) for v in values])', run: 1 }
      ],
      practice: [
        B('اعمل فاتورة Excel فيها معادلة لكل سطر وSUM في الآخر، وافتحها في Excel.', 'Build an Excel invoice with a formula on each line and a SUM at the end, and open it in Excel.'),
        B('اكتب عمود تواريخ بتنسيق `yyyy-mm-dd` وعمود تاني `dd/mm/yyyy` وشوف الفرق في Excel.', 'Write a date column formatted `yyyy-mm-dd` and another `dd/mm/yyyy` and see the difference in Excel.'),
        B('نضّف عمود أرقام فيه 10 قيم بأشكال غريبة بـ `to_number`.', 'Clean a number column of 10 oddly written values with `to_number`.'),
        B('اقرا الفاتورة بـ data_only=True قبل وبعد ما تفتحها وتحفظها في Excel.', 'Read the invoice with data_only=True before and after opening and saving it in Excel.')
      ],
      code: [
        { u: B('عمود بمعادلة نسبة', 'A share-of-total formula column'), p: 'from openpyxl import Workbook\nwb = Workbook(); ws = wb.active\nws.append(["City", "Revenue", "Share"])\ndata = [("Cairo", 128500), ("Giza", 40210), ("Alex", 77300)]\nfor city, revenue in data:\n    ws.append([city, revenue])\nlast = ws.max_row\nfor r in range(2, last + 1):\n    ws[f"C{r}"] = f"=B{r}/SUM($B$2:$B${last})"\n    ws[f"C{r}"].number_format = "0.0%"\nwb.save("share.xlsx")' }
      ],
      words: [
        { t: 'formula', m: B('حسبة في Excel بتبدأ بـ = وExcel بيحسبها', 'an Excel calculation starting with =, computed by Excel'), ex: '"=SUM(D2:D19)"' },
        { t: 'cell reference', m: B('عنوان خلية أو مدى في معادلة', 'the address of a cell or range in a formula'), ex: 'B2, D2:D19' },
        { t: 'absolute reference', m: B('عنوان بـ $ ميتغيرش لما المعادلة تتنسخ', 'an address with $ that stays fixed when the formula is copied'), ex: '$B$2:$B$10' },
        { t: 'strptime', m: B('بتحوّل نص لتاريخ حسب شكل بتحدده', 'turns text into a date using a format you give'), ex: 'datetime.strptime(t, "%d/%m/%Y")' },
        { t: 'number stored as text', m: B('رقم مكتوب كنص في الخلية فمبيتحسبش', 'a number typed as text in a cell, so it is not calculated'), ex: '"1,200"' },
        { t: 'data cleaning', m: B('تصليح البيانات قبل استخدامها', 'fixing data before using it'), ex: 'to_number(), to_date()' }
      ],
      read: [{ lib: 'openpyxl documentation', what: B('اقرا Simple usage: Using formulae.', 'Read Simple usage: Using formulae.') }, { lib: 'datetime', what: B('اقرا جدول strftime() and strptime() Format Codes.', 'Read the strftime() and strptime() Format Codes table.') }],
      challenge: B('خد ملف Excel «متلخبط» (اعمله بنفسك: أرقام نص، تواريخ بـ 3 أشكال، خلايا فاضية، صفوف مكررة)، وطلّع نسخة نضيفة في شيت جديد + شيت «مشاكل» فيه كل خلية اتصلّحت أو اترفضت ورقم صفها.', 'Take a «messy» Excel file (make it yourself: text numbers, dates in 3 formats, blank cells, duplicate rows) and produce a clean copy in a new sheet plus a «Problems» sheet listing every fixed or rejected cell with its row number.'),
      quiz: [
        { q: B('معادلة كتبتها بـ openpyxl، قرّيتها بـ data_only قبل ما تتفتح في Excel:', 'A formula written with openpyxl, read with data_only before Excel opened it:'), o: ['None', B('النتيجة', 'the result'), B('خطأ', 'an error')], a: 0, why: B('Excel لسه ما حسبهاش.', 'Excel has not computed it yet.') },
        { q: B('`$B$2` معناها:', '`$B$2` means:'), o: [B('عنوان ثابت', 'a fixed reference'), B('عملة', 'a currency'), B('متغير', 'a variable')], a: 0, why: B('absolute reference.', 'An absolute reference.') },
        { q: B('`datetime.strptime("30/09/2026", "%d/%m/%Y")`:', '`datetime.strptime("30/09/2026", "%d/%m/%Y")`:'), o: [B('تاريخ 30 سبتمبر', 'a 30 September date'), B('خطأ', 'an error'), B('نص', 'text')], a: 0, why: B('الشكل مطابق.', 'The format matches.') }
      ] },

    { title: B('دمج وتقسيم ملفات Excel', 'Merging and splitting Excel files'),
      goal: B('تدمج عشرات ملفات Excel (فروع أو شهور) في ملف واحد، وتقسّم ملف كبير لملفات حسب عمود، وتعمل ده كله بأمان وبلوج.', 'Merge dozens of Excel files (branches or months) into one, split a big file into files by a column, and do it all safely with a log.'),
      learn: [
        { h: B('دمج كل الملفات', 'Merging every file'),
          p: B('لف على `folder.glob("*.xlsx")` (واتخطى الملفات اللي بتبدأ بـ `~$`، دي ملفات Excel المؤقتة)، واقرا كل واحد بـ `sheet_to_dicts`، وزوّد حقل `source`، وحطهم في قايمة واحدة، واكتبها في ملف جديد. اتأكد إن الأعمدة واحدة، ولو مختلفة سجّل تحذير.', 'Loop over `folder.glob("*.xlsx")` (skip files starting with `~$` — Excel’s temporary files), read each with `sheet_to_dicts`, add a `source` field, collect them in one list, and write it to a new file. Check the columns match, and log a warning when they differ.'),
          ex: 'from pathlib import Path\nfrom openpyxl import load_workbook, Workbook\n\ndef read_rows(path):\n    ws = load_workbook(path, data_only=True, read_only=True).active\n    rows = ws.iter_rows(values_only=True)\n    headers = [str(h) for h in next(rows)]\n    return headers, [dict(zip(headers, r)) for r in rows if any(r)]\n\ndef merge(folder, out):\n    all_rows, columns = [], None\n    for f in sorted(Path(folder).glob("*.xlsx")):\n        if f.name.startswith("~$"):\n            continue\n        headers, rows = read_rows(f)\n        if columns and headers != columns:\n            print(f"warning: {f.name} has different columns")\n        columns = columns or headers\n        all_rows += [{**r, "source": f.stem} for r in rows]\n    if columns is None:\n        print("no Excel files in", folder)\n        return 0\n    wb = Workbook(); ws = wb.active\n    ws.append(columns + ["source"])\n    for r in all_rows:\n        ws.append([r.get(c) for c in columns + ["source"]])\n    wb.save(out)\n    return len(all_rows)\n\nprint(merge("branches", "all_branches.xlsx"), "rows merged")' },
        { h: B('تقسيم حسب عمود', 'Splitting by a column'),
          p: B('العكس: ملف فيه كل الفروع وعايز ملف لكل فرع (عشان تبعته لمديره). جمّع الصفوف بـ defaultdict حسب العمود، واكتب لكل مجموعة ملف باسم نضيف (شيل الحروف اللي مينفعش في أسماء الملفات زي `/ \\ : * ?`).', 'The reverse: one file with every branch, and you want a file per branch (to send to each manager). Group the rows with defaultdict by the column, and write each group to a file with a safe name (remove characters not allowed in file names such as `/ \\ : * ?`).'),
          ex: 'import re\nfrom collections import defaultdict\n\ndef safe_name(text: str) -> str:\n    return re.sub(r\'[\\\\/:*?"<>|]+\', "-", str(text)).strip() or "unknown"\n\nrows = [{"branch": "Cairo/Downtown", "total": 10}, {"branch": "Giza", "total": 5}, {"branch": "Cairo/Downtown", "total": 7}]\ngroups = defaultdict(list)\nfor r in rows:\n    groups[r["branch"]].append(r)\nfor branch, items in groups.items():\n    print(f"report_{safe_name(branch)}.xlsx", len(items), "rows")', run: 1 },
        { h: B('pandas للشغل الأكبر (لمحة)', 'pandas for bigger work (a preview)'),
          p: B('لما الحسابات تكبر (تجميع وجداول pivot ودمج بأعمدة) `pandas` بتختصر 30 سطر لـ 3: `pd.read_excel` و`groupby` و`to_excel`. هنتعلمها بالتفصيل أسبوع 19؛ دلوقتي افهم الفكرة بس، واعرف إن openpyxl هو اللي pandas بيستخدمه تحت عشان يكتب xlsx.', 'When the calculations grow (grouping, pivot tables, merging by columns) `pandas` shrinks 30 lines to 3: `pd.read_excel`, `groupby` and `to_excel`. We learn it properly in week 19; for now just get the idea, and know that pandas uses openpyxl underneath to write xlsx.'),
          ex: '# pip install pandas openpyxl   (week 19)\nimport pandas as pd\n\ndf = pd.read_excel("sales.xlsx", sheet_name="Sales")\ndf["revenue"] = df["qty"] * df["price"]\nsummary = df.groupby("city", as_index=False)["revenue"].sum().sort_values("revenue", ascending=False)\nsummary.to_excel("summary.xlsx", index=False)\nprint(summary)' }
      ],
      practice: [
        B('اعمل 5 ملفات فروع تجريبية بسكربت (كل واحد 20 صف) وادمجهم.', 'Create 5 test branch files with a script (20 rows each) and merge them.'),
        B('اعمل ملف فرع بعمود زيادة وشوف التحذير.', 'Make one branch file with an extra column and see the warning.'),
        B('قسّم الملف المدموج لملف لكل مدينة.', 'Split the merged file into one file per city.'),
        B('افتح ملف Excel في Excel وشوف ملف `~$` اللي بيظهر جنبه، واتأكد إن السكربت بيتخطاه.', 'Open an Excel file in Excel, notice the `~$` file next to it, and make sure the script skips it.')
      ],
      code: [
        { u: B('ملفات فروع تجريبية', 'Test branch files'), p: 'import random\nfrom pathlib import Path\nfrom openpyxl import Workbook\nrandom.seed(4)\nfolder = Path("branches"); folder.mkdir(exist_ok=True)\nfor branch in ["Cairo", "Giza", "Alex", "Mansoura", "Aswan"]:\n    wb = Workbook(); ws = wb.active\n    ws.append(["date", "product", "qty", "price"])\n    for d in range(1, 21):\n        ws.append([f"2026-09-{d:02}", random.choice(["Pen", "Bag", "Notebook"]), random.randint(1, 9), random.choice([30, 45, 650])])\n    wb.save(folder / f"{branch}.xlsx")\nprint(sorted(p.name for p in folder.glob("*.xlsx")))' }
      ],
      words: [
        { t: 'merge files', m: B('دمج ملفات كتير بنفس الشكل في ملف واحد', 'combining many same-shaped files into one'), ex: 'all_branches.xlsx' },
        { t: 'split by column', m: B('تقسيم ملف لملفات حسب قيمة عمود', 'splitting a file into files by a column’s value'), ex: 'one file per city' },
        { t: 'temporary file', m: B('ملف مؤقت بيعمله برنامج وهو شغال', 'a temporary file a program creates while running'), ex: '~$sales.xlsx' },
        { t: 'safe file name', m: B('اسم ملف من غير حروف ممنوعة', 'a file name without forbidden characters'), ex: 'Cairo-Downtown.xlsx' },
        { t: 'pandas', m: B('مكتبة تحليل جداول البيانات في Python', 'Python’s library for analysing tables of data'), ex: 'import pandas as pd' },
        { t: 'schema mismatch', m: B('ملفات مفروض شكلها واحد وأعمدتها مختلفة', 'files meant to share a shape whose columns differ'), ex: 'an extra column in one branch' }
      ],
      read: [{ lib: 'Automate the Boring Stuff with Python', what: B('مشروعات آخر فصل Excel.', 'The projects at the end of the Excel chapter.') }, { lib: 'pandas: Getting started', what: B('اقرا How do I read and write tabular data? بس.', 'Read only «How do I read and write tabular data?».') }],
      challenge: B('اعمل `consolidate.py`: يدمج ملفات الشهور في فولدر، ويطلّع ملف واحد فيه شيت «كل البيانات» وشيت «ملخص» (الإيراد لكل شهر ولكل منتج، منسّق)، ويكتب لوج بكل ملف اتقرا وعدد صفوفه وأي ملف اتخطى وليه.', 'Write `consolidate.py`: merge the monthly files in a folder into one file with an «All data» sheet and a formatted «Summary» sheet (revenue per month and per product), logging each file read with its row count and any file skipped and why.'),
      quiz: [
        { q: B('ملف بيبدأ بـ `~$` جنب ملف Excel:', 'A file starting with `~$` next to an Excel file:'), o: [B('ملف مؤقت؛ اتخطاه', 'a temporary file; skip it'), B('نسخة احتياطية', 'a backup copy'), B('ملف مضروب', 'a corrupted file')], a: 0, why: B('Excel بيعمله وهو مفتوح.', 'Excel creates it while the file is open.') },
        { q: B('ليه `safe_name` قبل ما تعمل ملف باسم فرع؟', 'Why `safe_name` before naming a file after a branch?'), o: [B('عشان حروف زي / مينفعش في أسماء الملفات', 'because characters like / are not allowed in file names'), B('عشان العربي', 'for Arabic'), B('عشان الطول', 'for length')], a: 0, why: B('/ هتتفهم فولدر.', '/ would be read as a folder.') },
        { q: B('pandas بتكتب xlsx باستخدام:', 'pandas writes xlsx using:'), o: ['openpyxl', 'csv', 'json'], a: 0, why: B('engine افتراضي.', 'The default engine.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تبني أداة تقارير Excel كاملة بالشكل اللي بيطلبه مدير حقيقي، وتعدّي الاختبار.', 'Build a complete Excel reporting tool of the kind a real manager asks for, and pass the test.'),
      review: [
        B('csv.DictReader/DictWriter وnewline="" وutf-8-sig والفواصل.', 'csv.DictReader/DictWriter, newline="", utf-8-sig and delimiters.'),
        B('load_workbook وdata_only وiter_rows وتحويل الشيت لـ dicts.', 'load_workbook, data_only, iter_rows and turning a sheet into dicts.'),
        B('Workbook وappend والتنسيق (Font وFill وnumber_format والعرض والتجميد والفلتر).', 'Workbook and append, and formatting (Font, Fill, number_format, widths, freeze and filter).'),
        B('المعادلات، والتواريخ، والأرقام اللي متخزنة نص.', 'Formulas, dates and numbers stored as text.'),
        B('دمج وتقسيم الملفات بأمان وبلوج.', 'Merging and splitting files safely, with a log.')
      ],
      project: B('**تقرير المبيعات الشهري الأوتوماتيك** (`sales_report/`): الأداة بتقرا كل ملفات الفروع من فولدر `input/` (Excel أو CSV)، بتنضّف الأرقام والتواريخ (دوال `to_number` و`to_date` باختبارات)، وتطلّع `output/sales_report_YYYY-MM.xlsx` فيه: شيت «ملخص» (إيراد كل فرع ونسبته وترتيبه + سطر إجمالي بمعادلة SUM)، شيت «المنتجات»، شيت «يومي» (إيراد كل يوم)، شيت «مشاكل» (أي قيمة اترفضت)، كله بـ `style_table`، وCSV نسخة من الملخص. الإعدادات (الفولدرات والعملة) من `config.toml`، ولوج كامل، وdry run بيطبع اللي هيتعمل. (هنبعت التقرير بالإيميل أسبوع 12، ونشغّله أوتوماتيك أول كل شهر أسبوع 20.)', '**The automatic monthly sales report** (`sales_report/`): the tool reads every branch file in an `input/` folder (Excel or CSV), cleans numbers and dates (`to_number` and `to_date` with tests), and produces `output/sales_report_YYYY-MM.xlsx` with: a «Summary» sheet (each branch’s revenue, share and rank + a total row using SUM), a «Products» sheet, a «Daily» sheet (revenue per day), and a «Problems» sheet (every rejected value), all with `style_table`, plus a CSV copy of the summary. Settings (folders and currency) come from `config.toml`, with a full log and a dry run that prints what would happen. (We email the report in week 12 and run it automatically on the first of each month in week 20.)'),
      test: [
        { q: B('`csv.DictReader` بيجيب أسماء الأعمدة من:', '`csv.DictReader` takes the column names from:'), o: [B('أول سطر', 'the first line'), B('fieldnames لازم', 'fieldnames, always'), B('آخر سطر', 'the last line')], a: 0, why: B('إلا لو اديتله fieldnames.', 'Unless you give it fieldnames.') },
        { q: B('سطر فاضي بين كل صف في CSV على Windows سببه:', 'A blank line between every row of a CSV on Windows comes from:'), o: [B('نسيان newline=""', 'forgetting newline=""'), B('العربي', 'Arabic'), B('Excel', 'Excel')], a: 0, why: B('csv بيكتب نهاية السطر بنفسه.', 'csv writes the line ending itself.') },
        { q: B('`wb["Sales"]` بيرجّع:', '`wb["Sales"]` returns:'), o: [B('الشيت اللي اسمه Sales', 'the sheet named Sales'), B('عمود', 'a column'), B('خلية', 'a cell')], a: 0, why: B('بالاسم.', 'By name.') },
        { q: B('`ws.append(["a", 1])` بيكتب:', '`ws.append(["a", 1])` writes:'), o: [B('صف جديد تحت آخر صف', 'a new row below the last one'), B('في A1 دايمًا', 'always at A1'), B('عمود جديد', 'a new column')], a: 0, why: B('بيضيف في الآخر.', 'It adds at the end.') },
        { q: B('تنسيق نسبة مئوية برقم عشري واحد:', 'A percentage format with one decimal:'), o: ['"0.0%"', '"#,##0.00"', '"yyyy-mm-dd"'], a: 0, why: B('% بتضرب في 100 في العرض.', '% multiplies by 100 for display.') },
        { q: B('`"=SUM(B2:B9)"` في خلية:', '`"=SUM(B2:B9)"` in a cell:'), o: [B('معادلة Excel هيحسبها', 'a formula Excel will compute'), B('نص عادي', 'plain text'), B('خطأ في openpyxl', 'an openpyxl error')], a: 0, why: B('أي نص بيبدأ بـ =.', 'Any text starting with =.') },
        { q: B('`to_number("1,250.5")`:', '`to_number("1,250.5")`:'), o: ['1250.5', '"1250.5"', 'None'], a: 0, why: B('شلنا الفاصلة وحوّلنا.', 'The comma was removed and it was converted.') },
        { q: B('حفظ ملف مفتوح في Excel على Windows:', 'Saving a file open in Excel on Windows:'), o: ['PermissionError', B('بيتحفظ عادي', 'saves fine'), 'KeyError'], a: 0, why: B('الملف مقفول.', 'The file is locked.') },
        { q: B('`freeze_panes = "B2"` بيثبّت:', '`freeze_panes = "B2"` freezes:'), o: [B('أول صف وأول عمود', 'the first row and the first column'), B('B2 بس', 'only B2'), B('ولا حاجة', 'nothing')], a: 0, why: B('كل اللي فوق وشمال الخلية.', 'Everything above and left of the cell.') },
        { q: B('أنسب حاجة لملف ضخم للقراءة بس:', 'Best for reading a huge file only:'), o: ['read_only=True', 'data_only=False', 'Workbook()'], a: 0, why: B('أسرع وأقل ذاكرة.', 'Faster and lighter on memory.') },
        { q: B('القيمة الفاضية في CSV بتتقري:', 'An empty CSV value reads as:'), o: ['""', 'None', '0'], a: 0, why: B('نص فاضي.', 'An empty string.') },
        { q: B('ليه التقرير في ملف جديد مش فوق الأصل؟', 'Why write the report to a new file, not over the source?'), o: [B('عشان الأصل ميتبوّظش', 'so the source is never damaged'), B('أسرع', 'faster'), B('openpyxl مبيكتبش فوق ملفات', 'openpyxl cannot overwrite')], a: 0, why: B('الأمان أولًا.', 'Safety first.') }
      ] }
  ]
};
