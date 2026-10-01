// Python week 19 — Data analysis with pandas.
const B = (ar, en) => ({ ar, en });
const DATA = 'import io\nimport pandas as pd\ncsv_text = """day,branch,product,category,qty,price,customer\n2026-09-01,Cairo,Pen,stationery,10,7.5,Sara\n2026-09-01,Giza,Bag,bags,1,650,Omar\n2026-09-02,Cairo,Bag,bags,2,650,Mona\n2026-09-02,Alex,Notebook,stationery,5,45,Hany\n2026-09-03,Cairo,Notebook,stationery,3,45,Sara\n2026-09-03,Giza,Pen,stationery,20,7.5,Laila\n2026-09-04,Alex,Sleeve,bags,2,320,Omar\n2026-09-05,Cairo,Sleeve,bags,1,320,Karim\n2026-10-01,Cairo,Bag,bags,3,650,Sara\n2026-10-02,Giza,Notebook,stationery,8,45,Mona\n"""\ndf = pd.read_csv(io.StringIO(csv_text), parse_dates=["day"])\n';
module.exports = {
  level: B('متقدم', 'Advanced'),
  title: B('تحليل البيانات بـ pandas', 'Data analysis with pandas'),
  goal: B('تحلّل جداول بيانات كبيرة بـ pandas في سطور قليلة: تقرا وتفحص، تفلتر وترتّب، تنضّف القيم الناقصة والأنواع الغلط والمكرر، تجمّع وتعمل pivot، وتدمج جداول، وتصدّر Excel وJSON — بدل عشرات الأسطر من اللوبات.',
          'Analyse large tables with pandas in a few lines: read and inspect, filter and sort, clean missing values, wrong types and duplicates, group and pivot, merge tables, and export Excel and JSON — instead of dozens of lines of loops.'),
  days: [
    { title: B('DataFrame وSeries', 'DataFrame and Series'),
      goal: B('تقرا CSV لـ DataFrame، وتفحصه (head وinfo وdescribe)، وتختار أعمدة وصفوف بـ loc وiloc.', 'Read a CSV into a DataFrame, inspect it (head, info, describe), and select columns and rows with loc and iloc.'),
      learn: [
        { h: B('أول DataFrame', 'A first DataFrame'),
          p: B('`import pandas as pd`. الـ DataFrame جدول (زي شيت Excel) والعمود الواحد Series. `pd.read_csv("file.csv")` بيقرا ملف (هنا بنقرا من نص عشان يشتغل في الصفحة)، و`parse_dates` بيحوّل عمود التاريخ لتواريخ. أول تشغيل بيحمّل pandas في المتصفح (ثواني).', '`import pandas as pd`. A DataFrame is a table (like an Excel sheet) and one column is a Series. `pd.read_csv("file.csv")` reads a file (here we read from text so it runs on the page), and `parse_dates` turns the date column into dates. The first run loads pandas into the browser (a few seconds).'),
          ex: DATA + 'print(df.head(3))\nprint(df.shape)\nprint(df.dtypes)', run: 1 },
        { h: B('افحص قبل ما تحلّل', 'Inspect before analysing'),
          p: B('`df.info()` الأعمدة وأنواعها وعدد القيم الموجودة (يبيّن الناقص)، و`df.describe()` إحصائيات الأعمدة الرقمية (المتوسط والأقل والأكبر)، و`df["branch"].unique()` القيم المختلفة، و`.value_counts()` كل قيمة اتكررت كام مرة. دي أول 5 سطور في أي تحليل.', '`df.info()` shows the columns, their types and how many values exist (revealing gaps), `df.describe()` gives statistics for number columns (mean, min, max), `df["branch"].unique()` the distinct values, and `.value_counts()` how often each value appears. These are the first 5 lines of any analysis.'),
          ex: DATA + 'df.info()\nprint(df.describe().round(1))\nprint(df["branch"].unique())\nprint(df["product"].value_counts())', run: 1 },
        { h: B('loc وiloc', 'loc and iloc'),
          p: B('`df["qty"]` عمود (Series)، و`df[["branch", "qty"]]` أكتر من عمود. `df.loc[row_label, "col"]` بالأسماء، و`df.iloc[0:3, 0:2]` بالأرقام زي التقطيع. وبتعمل أعمدة جديدة بحساب على أعمدة كاملة مرة واحدة: `df["revenue"] = df["qty"] * df["price"]` — من غير لوب (vectorized).', '`df["qty"]` is a column (Series) and `df[["branch", "qty"]]` several. `df.loc[row_label, "col"]` selects by name and `df.iloc[0:3, 0:2]` by position, like slicing. You create new columns by computing on whole columns at once: `df["revenue"] = df["qty"] * df["price"]` — no loop (vectorised).'),
          ex: DATA + 'df["revenue"] = df["qty"] * df["price"]\nprint(df[["day", "branch", "revenue"]].head(4))\nprint(df.loc[2, "customer"], df.iloc[0, 1])\nprint("total revenue:", df["revenue"].sum(), "| mean qty:", df["qty"].mean())', run: 1 }
      ],
      practice: [
        B('اقرا ملف sales.csv بتاعك (أو بيانات الدرس) واطبع shape وinfo وdescribe.', 'Read your sales.csv (or the lesson data) and print shape, info and describe.'),
        B('اطبع القيم المختلفة لكل عمود نصي وعددها.', 'Print the distinct values of each text column and their counts.'),
        B('ضيف عمود revenue وعمود revenue_with_vat من غير لوب.', 'Add revenue and revenue_with_vat columns without a loop.'),
        B('اختار أول 5 صفوف وآخر 3 أعمدة بـ iloc، وعميل صف معيّن بـ loc.', 'Pick the first 5 rows and last 3 columns with iloc, and one row’s customer with loc.')
      ],
      code: [
        { u: B('DataFrame من قايمة dicts', 'A DataFrame from a list of dicts'), p: 'import pandas as pd\norders = [{"id": 1, "customer": "Sara", "total": 1200}, {"id": 2, "customer": "Omar", "total": 450.5}, {"id": 3, "customer": "Mona", "total": 3100}]\ndf = pd.DataFrame(orders)\nprint(df)\nprint(df["total"].sum(), df["total"].max())\nprint(df.to_dict(orient="records")[0])', run: 1 }
      ],
      words: [
        { t: 'DataFrame', m: B('جدول بيانات في pandas بأعمدة ليها أسماء', 'a pandas data table with named columns'), ex: 'df = pd.read_csv("sales.csv")' },
        { t: 'Series', m: B('عمود واحد في pandas', 'one column in pandas'), ex: 'df["qty"]' },
        { t: 'dtype', m: B('نوع بيانات العمود: int64 وfloat64 وobject وdatetime64', 'a column’s data type: int64, float64, object, datetime64'), ex: 'df.dtypes' },
        { t: 'describe()', m: B('ملخص إحصائي للأعمدة الرقمية', 'a statistical summary of number columns'), ex: 'df.describe()' },
        { t: 'loc', m: B('اختيار صفوف وأعمدة بالأسماء', 'selecting rows and columns by label'), ex: 'df.loc[2, "customer"]' },
        { t: 'iloc', m: B('اختيار صفوف وأعمدة بالأرقام', 'selecting rows and columns by position'), ex: 'df.iloc[0:3, 0:2]' },
        { t: 'vectorized operation', m: B('عملية على عمود كامل مرة واحدة من غير لوب', 'an operation on a whole column at once, with no loop'), ex: 'df["qty"] * df["price"]' }
      ],
      read: [{ lib: '10 minutes to pandas', what: B('اقرا Object creation وViewing data وSelection.', 'Read Object creation, Viewing data and Selection.') }, { lib: 'pandas: Getting started', what: B('أول 3 أسئلة في Intro to pandas.', 'The first 3 questions of Intro to pandas.') }],
      challenge: B('اكتب `inspect.py` بياخد أي CSV ويطبع تقرير فحص: الأبعاد، والأنواع، والقيم الناقصة لكل عمود كنسبة، وأكتر 3 قيم في كل عمود نصي، وdescribe للأرقام.', 'Write `inspect.py` that takes any CSV and prints an inspection report: the shape, the types, missing values per column as a percentage, the top 3 values of each text column, and describe for numbers.'),
      quiz: [
        { q: B('العمود الواحد في pandas اسمه:', 'One column in pandas is a:'), o: ['Series', 'DataFrame', 'list'], a: 0, why: B('Series.', 'A Series.') },
        { q: B('عشان تعرف القيم الناقصة وأنواع الأعمدة:', 'To see missing values and column types:'), o: ['df.info()', 'df.head()', 'df.sum()'], a: 0, why: B('info.', 'info.') },
        { q: B('`df["a"] * df["b"]`:', '`df["a"] * df["b"]`:'), o: [B('بيضرب العمودين صف صف من غير لوب', 'multiplies the columns row by row without a loop'), B('خطأ', 'an error'), B('بيضرب أول قيمة بس', 'multiplies only the first value')], a: 0, why: B('vectorized.', 'Vectorised.') }
      ] },

    { title: B('الفلترة والترتيب والأعمدة الجديدة', 'Filtering, sorting and new columns'),
      goal: B('تفلتر بشروط (masks وisin وbetween وquery)، وترتّب، وتعمل أعمدة جديدة بـ assign وmap وwhere، وتستخدم .str للنصوص و.dt للتواريخ.', 'Filter with conditions (masks, isin, between, query), sort, build new columns with assign, map and where, and use .str for text and .dt for dates.'),
      learn: [
        { h: B('الفلترة', 'Filtering'),
          p: B('`df[df["qty"] > 3]` الصفوف اللي الشرط بتاعها صح. شروط كتير: `(cond1) & (cond2)` و`|` (بأقواس حوالين كل شرط!). `df["branch"].isin(["Cairo", "Giza"])` و`df["price"].between(40, 400)`. و`df.query("qty > 3 and branch == \'Cairo\'")` أسهل في القراية.', '`df[df["qty"] > 3]` keeps rows where the condition holds. Several conditions: `(cond1) & (cond2)` and `|` (with brackets around each!). `df["branch"].isin(["Cairo", "Giza"])` and `df["price"].between(40, 400)`. `df.query("qty > 3 and branch == \'Cairo\'")` reads more easily.'),
          ex: DATA + 'print(df[df["qty"] >= 5][["day", "product", "qty"]])\nprint(df[(df["branch"] == "Cairo") & (df["category"] == "bags")][["day", "product"]])\nprint(len(df[df["branch"].isin(["Giza", "Alex"])]), "orders outside Cairo")\nprint(df.query("price > 100 and qty > 1")[["product", "qty", "price"]])', run: 1 },
        { h: B('الترتيب والأكبر', 'Sorting and the largest'),
          p: B('`df.sort_values("revenue", ascending=False)` ترتيب، وبأكتر من عمود `sort_values(["branch", "revenue"], ascending=[True, False])`. `df.nlargest(3, "revenue")` أكبر 3 مباشرة. وبعد الفلترة الأرقام بتاعة الصفوف (index) بتتلخبط؛ `reset_index(drop=True)` بيرجّعها 0 و1 و2.', '`df.sort_values("revenue", ascending=False)` sorts, and by several columns `sort_values(["branch", "revenue"], ascending=[True, False])`. `df.nlargest(3, "revenue")` gives the top 3 directly. After filtering the row numbers (the index) get jumbled; `reset_index(drop=True)` renumbers them 0, 1, 2.'),
          ex: DATA + 'df["revenue"] = df["qty"] * df["price"]\nprint(df.nlargest(3, "revenue")[["day", "branch", "product", "revenue"]])\ncairo = df[df["branch"] == "Cairo"].sort_values("revenue", ascending=False).reset_index(drop=True)\nprint(cairo[["product", "revenue"]])', run: 1 },
        { h: B('أعمدة جديدة ونصوص وتواريخ', 'New columns, text and dates'),
          p: B('`assign(revenue=lambda d: d.qty * d.price)` بيضيف أعمدة في سلسلة. `map({...})` بيحوّل قيم بقاموس، و`np.where(cond, a, b)` (أو `.where`) if في عمود. و`.str.lower()` و`.str.contains("x")` و`.str.strip()` على عمود نصوص كامل، و`.dt.month` و`.dt.day_name()` و`.dt.to_period("M")` على التواريخ.', '`assign(revenue=lambda d: d.qty * d.price)` adds columns in a chain. `map({...})` converts values with a dict, and `np.where(cond, a, b)` (or `.where`) is an if over a column. `.str.lower()`, `.str.contains("x")` and `.str.strip()` work on a whole text column, and `.dt.month`, `.dt.day_name()` and `.dt.to_period("M")` on dates.'),
          ex: DATA + 'import numpy as np\nout = (df.assign(revenue=lambda d: d.qty * d.price,\n                 size=lambda d: np.where(d.qty * d.price >= 1000, "big", "small"),\n                 month=lambda d: d.day.dt.to_period("M").astype(str),\n                 weekday=lambda d: d.day.dt.day_name(),\n                 branch_code=lambda d: d.branch.map({"Cairo": "CAI", "Giza": "GIZ", "Alex": "ALX"})))\nprint(out[["month", "weekday", "branch_code", "revenue", "size"]].head(5))\nprint(out[out["product"].str.contains("Note")]["customer"].str.upper().tolist())', run: 1 }
      ],
      practice: [
        B('اطبع الطلبات اللي كميتها فوق 2 في فرع الإسكندرية أو الجيزة.', 'Print the orders with quantity above 2 in the Alexandria or Giza branch.'),
        B('اكتب نفس الفلتر مرة بـ masks ومرة بـ query.', 'Write the same filter with masks and with query.'),
        B('ضيف أعمدة الشهر واليوم من الأسبوع وحجم الطلب بـ assign في سلسلة واحدة.', 'Add month, weekday and order-size columns with one assign chain.'),
        B('نضّف عمود أسماء عملاء فيه مسافات وحروف متلخبطة بـ .str.', 'Clean a customer-name column with spaces and mixed case using .str.')
      ],
      code: [
        { u: B('سلسلة تحليل في سطور', 'An analysis chain in a few lines'), p: DATA + 'top = (df.assign(revenue=df.qty * df.price)\n         .query("category == \'stationery\'")\n         .sort_values("revenue", ascending=False)\n         .head(3)[["day", "branch", "product", "revenue"]])\nprint(top.to_string(index=False))', run: 1 }
      ],
      words: [
        { t: 'boolean mask', m: B('Series من True/False بتختار بيها صفوف', 'a Series of True/False used to pick rows'), ex: 'df[df.qty > 3]' },
        { t: 'isin', m: B('بتشوف القيمة واحدة من قايمة', 'checks whether a value is in a list'), ex: 'df.branch.isin(["Cairo", "Giza"])' },
        { t: 'query()', m: B('فلترة بنص شبه SQL', 'filtering with SQL-like text'), ex: 'df.query("qty > 3")' },
        { t: 'nlargest', m: B('أكبر n صفوف بعمود', 'the n largest rows by a column'), ex: 'df.nlargest(3, "revenue")' },
        { t: 'assign', m: B('بتضيف أعمدة وترجّع DataFrame جديد', 'adds columns and returns a new DataFrame'), ex: 'df.assign(revenue=...)' },
        { t: '.str accessor', m: B('دوال النصوص على عمود كامل', 'string functions over a whole column'), ex: 'df.name.str.strip()' },
        { t: '.dt accessor', m: B('دوال التواريخ على عمود كامل', 'date functions over a whole column'), ex: 'df.day.dt.month' }
      ],
      read: [{ lib: 'pandas: Getting started', what: B('How do I select a subset of a DataFrame? وHow to create new columns?', 'How do I select a subset of a DataFrame? and How to create new columns?') }, { lib: 'Kaggle Learn', what: B('كورس Pandas: الدروس 2 و3.', 'The Pandas course: lessons 2 and 3.') }],
      challenge: B('على بيانات مبيعاتك: اطبع لكل فرع أكبر طلب، والطلبات اللي في نهاية الأسبوع (الجمعة والسبت)، والعملاء اللي اسمهم فيه حرف معيّن — كل واحد في سطر pandas واحد.', 'On your sales data: print each branch’s largest order, the weekend orders (Friday and Saturday), and the customers whose name contains a given letter — each in one pandas line.'),
      quiz: [
        { q: B('شرطين في فلتر pandas:', 'Two conditions in a pandas filter:'), o: ['(a > 1) & (b < 5)', 'a > 1 and b < 5', 'a > 1 & b < 5'], a: 0, why: B('& وأقواس.', '& with brackets.') },
        { q: B('`df.sort_values("x", ascending=False)`:', '`df.sort_values("x", ascending=False)`:'), o: [B('من الأكبر للأصغر', 'from largest to smallest'), B('من الأصغر', 'from smallest'), B('عشوائي', 'random')], a: 0, why: B('تنازلي.', 'Descending.') },
        { q: B('الشهر من عمود تواريخ:', 'The month from a date column:'), o: ['df.day.dt.month', 'df.day.month', 'df.day.str.month'], a: 0, why: B('.dt.', '.dt.') }
      ] },

    { title: B('تنضيف البيانات', 'Cleaning data'),
      goal: B('تلاقي القيم الناقصة وتتعامل معاها، وتصلّح الأنواع (أرقام ونصوص وتواريخ) بـ coerce، وتشيل المكرر، وتنضّف النصوص وأسماء الأعمدة، وتلاقي القيم الشاذة.', 'Find and handle missing values, fix types (numbers, text and dates) with coerce, remove duplicates, clean text and column names, and spot outliers.'),
      learn: [
        { h: B('القيم الناقصة', 'Missing values'),
          p: B('الخلية الفاضية بتبقى `NaN` (أو `NaT` للتواريخ). `df.isna().sum()` عدد الناقص في كل عمود. القرار حسب المعنى: `fillna(0)` لكمية مش مسجلة، `fillna("unknown")` لمدينة، `dropna(subset=["price"])` لصف من غير سعر ميتحسبش. متملاش الناقص بأرقام وخلاص — اسأل ليه ناقص.', 'An empty cell becomes `NaN` (or `NaT` for dates). `df.isna().sum()` counts the gaps per column. Decide by meaning: `fillna(0)` for an unrecorded quantity, `fillna("unknown")` for a city, `dropna(subset=["price"])` for a row that cannot be priced. Do not just fill gaps with numbers — ask why they are missing.'),
          ex: 'import io\nimport pandas as pd\nraw = """order,city,qty,price\n1,Cairo,2,650\n2,,1,45\n3,Giza,,7.5\n4,Alex,3,\n5,Cairo,1,320\n"""\ndf = pd.read_csv(io.StringIO(raw))\nprint(df.isna().sum())\nclean = df.dropna(subset=["price"]).fillna({"city": "unknown", "qty": 0})\nprint(clean)', run: 1 },
        { h: B('الأنواع الغلط', 'Wrong types'),
          p: B('عمود أرقام فيه `"1,200"` و`"EGP 45"` و`"-"` بيتقري object (نص). `pd.to_numeric(s.str.replace(...), errors="coerce")` بيحوّل اللي ينفع وبيخلي الباقي NaN (تعدّهم بعدين). ونفس الفكرة `pd.to_datetime(s, errors="coerce", dayfirst=True)` للتواريخ بأشكال مختلفة.', 'A number column holding `"1,200"`, `"EGP 45"` and `"-"` is read as object (text). `pd.to_numeric(s.str.replace(...), errors="coerce")` converts what it can and leaves the rest NaN (count them afterwards). The same idea, `pd.to_datetime(s, errors="coerce", dayfirst=True)`, handles dates in different shapes.'),
          ex: 'import pandas as pd\ns = pd.Series(["1,200", " 450 ", "EGP 99", "-", "n/a", "1250.5"])\nnums = pd.to_numeric(s.str.replace(r"[^\\d.]", "", regex=True).replace("", None), errors="coerce")\nprint(nums.tolist(), "| could not convert:", nums.isna().sum())\nd = pd.Series(["2026-09-30", "30/09/2026", "Sept 30"])\nprint(pd.to_datetime(d, errors="coerce", format="mixed", dayfirst=True).tolist())', run: 1 },
        { h: B('المكرر والنصوص والشاذ', 'Duplicates, text and outliers'),
          p: B('`df.duplicated().sum()` و`drop_duplicates(subset=["email"])` (بعد ما تنضّف الإيميل!). أسماء الأعمدة: `df.columns.str.strip().str.lower().str.replace(" ", "_")`. والقيم الشاذة: أي حاجة أبعد بكتير من المعتاد (`qty > q3 + 1.5*IQR`) — راجعها بإيدك قبل ما تشيلها؛ ممكن تكون أكبر طلب في السنة.', '`df.duplicated().sum()` and `drop_duplicates(subset=["email"])` (after cleaning the email!). Column names: `df.columns.str.strip().str.lower().str.replace(" ", "_")`. Outliers: anything far beyond normal (`qty > q3 + 1.5*IQR`) — review them by hand before removing; it might be the year’s biggest order.'),
          ex: 'import pandas as pd\ndf = pd.DataFrame({" Customer Email ": ["SARA@x.com", "sara@x.com ", "omar@x.com", "mona@x.com", "hany@x.com"], "Qty": [2, 2, 1, 3, 250]})\ndf.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")\ndf["customer_email"] = df["customer_email"].str.strip().str.lower()\nprint(df.duplicated(subset=["customer_email"]).sum(), "duplicate")\ndf = df.drop_duplicates(subset=["customer_email"])\nq1, q3 = df.qty.quantile([0.25, 0.75])\nlimit = q3 + 1.5 * (q3 - q1)\nprint(df[df.qty > limit], "<- check these by hand")', run: 1 }
      ],
      practice: [
        B('اعمل CSV «متلخبط» بإيدك (ناقص وأنواع غلط ومكرر وأسماء أعمدة بمسافات) ونضّفه.', 'Make a «messy» CSV by hand (gaps, wrong types, duplicates and spaced column names) and clean it.'),
        B('اطبع قبل وبعد: عدد الصفوف، والناقص، والأنواع.', 'Print before and after: the row count, the gaps and the types.'),
        B('حوّل عمود أسعار مكتوب نص لأرقام بـ coerce واعرض اللي فشل.', 'Turn a price column typed as text into numbers with coerce and show what failed.'),
        B('دوّر على قيم شاذة في الكميات وقرّر تعمل فيها إيه.', 'Look for outliers in the quantities and decide what to do with them.')
      ],
      code: [
        { u: B('دالة تنضيف قابلة لإعادة الاستخدام', 'A reusable cleaning function'), p: 'import pandas as pd\n\ndef clean_sales(df: pd.DataFrame) -> tuple[pd.DataFrame, dict]:\n    report = {"rows_in": len(df)}\n    df = df.copy()\n    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")\n    for col in ["qty", "price"]:\n        df[col] = pd.to_numeric(df[col].astype(str).str.replace(r"[^\\d.]", "", regex=True), errors="coerce")\n    df["day"] = pd.to_datetime(df["day"], errors="coerce", format="mixed", dayfirst=True)\n    report["bad_values"] = int(df[["qty", "price", "day"]].isna().sum().sum())\n    df = df.dropna(subset=["qty", "price", "day"]).drop_duplicates()\n    report["rows_out"] = len(df)\n    return df, report\n\nraw = pd.DataFrame({" Day": ["2026-09-01", "02/09/2026", "x"], "Qty ": ["2", "1", "3"], "price": ["650", "EGP 45", "7.5"]})\nprint(clean_sales(raw))', run: 1 }
      ],
      words: [
        { t: 'NaN', m: B('قيمة ناقصة في pandas (Not a Number)', 'a missing value in pandas (Not a Number)'), ex: 'df.isna().sum()' },
        { t: 'fillna', m: B('بتملا القيم الناقصة بقيمة', 'fills missing values with a value'), ex: 'df.fillna({"city": "unknown"})' },
        { t: 'dropna', m: B('بتشيل الصفوف اللي فيها ناقص', 'drops rows with missing values'), ex: 'df.dropna(subset=["price"])' },
        { t: 'errors="coerce"', m: B('اللي ميتحوّلش يبقى NaN بدل ما يطلّع خطأ', 'what cannot convert becomes NaN instead of raising'), ex: 'pd.to_numeric(s, errors="coerce")' },
        { t: 'drop_duplicates', m: B('بتشيل الصفوف المكررة', 'removes duplicate rows'), ex: 'df.drop_duplicates(subset=["email"])' },
        { t: 'outlier', m: B('قيمة بعيدة جدًا عن الباقي', 'a value far away from the rest'), ex: 'qty = 250 among 1–3' },
        { t: 'quantile', m: B('القيمة اللي نسبة معيّنة من البيانات تحتها', 'the value below which a given share of the data falls'), ex: 'df.qty.quantile(0.75)' }
      ],
      read: [{ lib: 'Python Data Science Handbook', what: B('الفصل 3: Handling Missing Data.', 'Chapter 3: Handling Missing Data.') }, { lib: 'Kaggle Learn', what: B('كورس Data Cleaning: الدروس 1 و3.', 'The Data Cleaning course: lessons 1 and 3.') }],
      challenge: B('خد ملف CSV حقيقي من شغلك (أو بيانات مفتوحة) ونضّفه بدالة `clean_*` بترجّع البيانات النضيفة وتقرير بالتغييرات (اتشال كام ومليت كام واتحوّل كام)، واكتب 5 tests بـ DataFrames صغيرة.', 'Take a real CSV from your work (or open data) and clean it with a `clean_*` function returning the clean data and a change report (rows removed, filled and converted), plus 5 tests with small DataFrames.'),
      quiz: [
        { q: B('`pd.to_numeric(["5", "x"], errors="coerce")`:', '`pd.to_numeric(["5", "x"], errors="coerce")`:'), o: ['[5, NaN]', B('خطأ', 'an error'), '[5, 0]'], a: 0, why: B('coerce = NaN.', 'coerce = NaN.') },
        { q: B('عدد القيم الناقصة في كل عمود:', 'The number of missing values per column:'), o: ['df.isna().sum()', 'df.count()', 'df.describe()'], a: 0, why: B('isna.', 'isna.') },
        { q: B('قيمة شاذة جدًا في الكمية:', 'A very unusual quantity:'), o: [B('راجعها قبل ما تشيلها', 'review it before removing it'), B('امسحها على طول', 'delete it at once'), B('خليها صفر', 'set it to zero')], a: 0, why: B('ممكن تكون حقيقية.', 'It may be real.') }
      ] },

    { title: B('التجميع والـ pivot', 'Grouping and pivots'),
      goal: B('تجمّع بـ groupby وagg بأكتر من حسبة، وتعمل pivot_table زي Excel، وتلخّص بالشهر بـ resample، وتحسب النسب والتراكمي.', 'Group with groupby and agg using several calculations, build pivot tables like Excel, summarise by month with resample, and compute shares and running totals.'),
      learn: [
        { h: B('groupby وagg', 'groupby and agg'),
          p: B('`df.groupby("branch")["revenue"].sum()` = المجموع لكل فرع (أسبوع 5 في سطر). `agg` بيعمل أكتر من حسبة بأسماء: `agg(orders=("qty", "size"), revenue=("revenue", "sum"), avg=("revenue", "mean"))`. وبأكتر من عمود: `groupby(["branch", "category"])`.', '`df.groupby("branch")["revenue"].sum()` = the total per branch (week 5 in one line). `agg` computes several named results: `agg(orders=("qty", "size"), revenue=("revenue", "sum"), avg=("revenue", "mean"))`. By several columns: `groupby(["branch", "category"])`.'),
          ex: DATA + 'df["revenue"] = df.qty * df.price\nprint(df.groupby("branch")["revenue"].sum().sort_values(ascending=False))\nsummary = df.groupby("branch").agg(orders=("qty", "size"), pieces=("qty", "sum"), revenue=("revenue", "sum"), avg_order=("revenue", "mean")).round(2)\nprint(summary)\nprint(df.groupby(["branch", "category"])["revenue"].sum())', run: 1 },
        { h: B('pivot_table', 'pivot_table'),
          p: B('`pd.pivot_table(df, index="branch", columns="category", values="revenue", aggfunc="sum", fill_value=0, margins=True)` = الـ Pivot Table بتاع Excel بالظبط: صفوف وأعمدة وقيم وإجماليات. و`pd.crosstab` بيعد التكرارات بين عمودين.', '`pd.pivot_table(df, index="branch", columns="category", values="revenue", aggfunc="sum", fill_value=0, margins=True)` is exactly Excel’s pivot table: rows, columns, values and totals. `pd.crosstab` counts combinations of two columns.'),
          ex: DATA + 'df["revenue"] = df.qty * df.price\nprint(pd.pivot_table(df, index="branch", columns="category", values="revenue", aggfunc="sum", fill_value=0, margins=True, margins_name="Total"))\nprint(pd.crosstab(df.branch, df["product"]))', run: 1 },
        { h: B('بالشهر، والنسب، والتراكمي', 'By month, shares and running totals'),
          p: B('`df.set_index("day").resample("W")["revenue"].sum()` المجموع لكل أسبوع (`"MS"` شهر، `"D"` يوم). النسبة من الكل: `s / s.sum()`. التراكمي: `.cumsum()`، والتغيّر عن الفترة اللي فاتت: `.pct_change()`. وده بالظبط اللي بيتحط في تقارير المديرين.', '`df.set_index("day").resample("W")["revenue"].sum()` totals per week (`"MS"` per month, `"D"` per day). Share of the total: `s / s.sum()`. Running total: `.cumsum()`, and change versus the previous period: `.pct_change()`. Exactly what goes into managers’ reports.'),
          ex: DATA + 'df["revenue"] = df.qty * df.price\nmonthly = df.set_index("day").resample("MS")["revenue"].sum()\nprint(monthly)\nprint((monthly.pct_change() * 100).round(1))\nshare = df.groupby("branch")["revenue"].sum()\nprint((share / share.sum() * 100).round(1).astype(str) + "%")\nprint(df.sort_values("day").set_index("day")["revenue"].cumsum().tail(3))', run: 1 }
      ],
      practice: [
        B('اطبع لكل منتج: عدد الطلبات والقطع والإيراد ومتوسط سعر البيع بـ agg.', 'Print for each product: the order count, pieces, revenue and average selling price with agg.'),
        B('اعمل pivot للإيراد: الفروع صفوف والشهور أعمدة، بإجماليات.', 'Build a revenue pivot: branches as rows and months as columns, with totals.'),
        B('احسب نسبة كل فئة من الإيراد كنسبة مئوية.', 'Compute each category’s share of revenue as a percentage.'),
        B('اعمل الإيراد الأسبوعي والتراكمي.', 'Compute weekly revenue and its running total.')
      ],
      code: [
        { u: B('أفضل منتج في كل فرع', 'The best product in each branch'), p: DATA + 'df["revenue"] = df.qty * df.price\nbest = (df.groupby(["branch", "product"], as_index=False)["revenue"].sum()\n          .sort_values("revenue", ascending=False)\n          .groupby("branch").head(1)\n          .sort_values("branch"))\nprint(best.to_string(index=False))', run: 1 }
      ],
      words: [
        { t: 'groupby', m: B('بيجمّع صفوف DataFrame حسب عمود قبل الحساب', 'groups DataFrame rows by a column before computing'), ex: 'df.groupby("branch")' },
        { t: 'agg', m: B('بيحسب أكتر من تلخيص بأسماء', 'computes several named summaries'), ex: 'agg(revenue=("revenue", "sum"))' },
        { t: 'pivot table', m: B('جدول ملخص: صفوف وأعمدة وقيم مجمعة', 'a summary table: rows, columns and aggregated values'), ex: 'pd.pivot_table(df, index=..., columns=...)' },
        { t: 'crosstab', m: B('عد التكرارات بين عمودين', 'counting combinations of two columns'), ex: 'pd.crosstab(df.branch, df.product)' },
        { t: 'resample', m: B('تجميع بيانات زمنية لفترات (يوم وأسبوع وشهر)', 'grouping time data into periods (day, week, month)'), ex: '.resample("MS").sum()' },
        { t: 'cumsum', m: B('المجموع التراكمي', 'the running total'), ex: 's.cumsum()' },
        { t: 'pct_change', m: B('نسبة التغيّر عن القيمة اللي قبلها', 'the percentage change from the previous value'), ex: 'monthly.pct_change()' }
      ],
      read: [{ lib: 'pandas: Getting started', what: B('How to calculate summary statistics? وHow to reshape the layout of tables?', 'How to calculate summary statistics? and How to reshape the layout of tables?') }, { lib: 'Python for Data Analysis, 3E', what: B('الفصل 10: Data Aggregation and Group Operations (أوله).', 'Chapter 10: Data Aggregation and Group Operations (its start).') }],
      challenge: B('اعمل «تقرير المدير» كدالة واحدة: لكل فرع الإيراد والنسبة والترتيب، وpivot فرع×شهر، والتغيّر الشهري، وأفضل منتج لكل فرع — كل ده DataFrames مرتجعة في dict.', 'Write the «manager report» as one function: per branch the revenue, share and rank, a branch × month pivot, the monthly change and the best product per branch — all returned as DataFrames in a dict.'),
      quiz: [
        { q: B('`df.groupby("a")["b"].sum()`:', '`df.groupby("a")["b"].sum()`:'), o: [B('مجموع b لكل قيمة في a', 'the sum of b for each value of a'), B('مجموع الكل', 'the overall sum'), B('عدد الصفوف', 'the row count')], a: 0, why: B('تجميع.', 'Grouping.') },
        { q: B('Pivot Table بتاع Excel في pandas:', 'Excel’s pivot table in pandas:'), o: ['pd.pivot_table', 'df.merge', 'df.melt'], a: 0, why: B('pivot_table.', 'pivot_table.') },
        { q: B('المجموع لكل شهر من عمود تواريخ:', 'The total per month from a date column:'), o: ['set_index("day").resample("MS").sum()', 'df.month.sum()', 'df.groupby("day").sum()'], a: 0, why: B('resample.', 'resample.') }
      ] },

    { title: B('الدمج والتصدير', 'Merging and exporting'),
      goal: B('تدمج جداول بـ merge (زي JOIN) وتلزقها بـ concat، وتصدّر CSV وExcel بأكتر من شيت وJSON للوحات، وتعرف تكتب pandas سريع.', 'Merge tables with merge (like JOIN) and stack them with concat, export CSV, multi-sheet Excel and JSON for dashboards, and write fast pandas.'),
      learn: [
        { h: B('merge وconcat', 'merge and concat'),
          p: B('`pd.merge(orders, customers, on="customer_id", how="left")` = LEFT JOIN بتاع أسبوع 18. `how="inner"` المشترك بس. `validate="many_to_one"` بيتأكد إن العميل مش متكرر (وإلا الصفوف هتتضاعف من غير ما تاخد بالك). و`pd.concat([jan, feb, mar])` بيلزق جداول بنفس الأعمدة تحت بعض (دمج ملفات الشهور).', '`pd.merge(orders, customers, on="customer_id", how="left")` = week 18’s LEFT JOIN. `how="inner"` keeps only matches. `validate="many_to_one"` checks a customer is not duplicated (otherwise rows silently multiply). `pd.concat([jan, feb, mar])` stacks same-column tables (merging monthly files).'),
          ex: 'import pandas as pd\norders = pd.DataFrame({"order": [1, 2, 3, 4], "customer_id": [10, 11, 10, 99], "total": [1200, 450.5, 3100, 90]})\ncustomers = pd.DataFrame({"customer_id": [10, 11, 12], "name": ["Sara", "Omar", "Mona"], "city": ["Cairo", "Giza", "Cairo"]})\nm = pd.merge(orders, customers, on="customer_id", how="left", validate="many_to_one")\nprint(m)\nprint("orders with unknown customer:", m["name"].isna().sum())\njan = pd.DataFrame({"day": ["2026-01-05"], "total": [100]}); feb = pd.DataFrame({"day": ["2026-02-03"], "total": [250]})\nprint(pd.concat([jan, feb], ignore_index=True))', run: 1 },
        { h: B('التصدير', 'Exporting'),
          p: B('`to_csv("out.csv", index=False, encoding="utf-8-sig")` (عشان Excel والعربي). Excel بأكتر من شيت: `with pd.ExcelWriter("report.xlsx") as w:` و`df.to_excel(w, sheet_name="Summary", index=False)` لكل شيت (وبعدين نسّقه بـ openpyxl من أسبوع 11). وللوحة الويب: `to_json(orient="records", date_format="iso", force_ascii=False)`.', '`to_csv("out.csv", index=False, encoding="utf-8-sig")` (for Excel and Arabic). Excel with several sheets: `with pd.ExcelWriter("report.xlsx") as w:` then `df.to_excel(w, sheet_name="Summary", index=False)` per sheet (and format it afterwards with openpyxl from week 11). For a web dashboard: `to_json(orient="records", date_format="iso", force_ascii=False)`.'),
          ex: DATA + 'df["revenue"] = df.qty * df.price\nsummary = df.groupby("branch", as_index=False)["revenue"].sum()\nprint(summary.to_csv(index=False))\nprint(summary.to_json(orient="records"))\nprint(df.head(2).to_json(orient="records", date_format="iso"))\n# with pd.ExcelWriter("report.xlsx") as w:   (needs openpyxl on your computer)\n#     summary.to_excel(w, sheet_name="Summary", index=False)\n#     df.to_excel(w, sheet_name="Orders", index=False)', run: 1 },
        { h: B('pandas سريع', 'Fast pandas'),
          p: B('اللوب على الصفوف (`iterrows`) أبطأ 100 مرة من عملية على العمود كله — دوّر دايمًا على الطريقة vectorized (`np.where` و`.str` و`.dt` و`map` وgroupby). اقرا الأعمدة اللي محتاجها بس (`usecols`)، واستخدم `category` للنصوص المتكررة. ولما تنقل الكود ده لـ n8n: pandas مش موجودة في Code node الافتراضي، خليه في سكربت أو API (أسبوع 21).', 'Looping over rows (`iterrows`) is 100× slower than an operation on the whole column — always look for the vectorised way (`np.where`, `.str`, `.dt`, `map`, groupby). Read only the columns you need (`usecols`) and use `category` for repeated text. When moving this to n8n: pandas is not in the default Code node; keep it in a script or an API (week 21).'),
          ex: 'import time\nimport numpy as np\nimport pandas as pd\nn = 200_000\ndf = pd.DataFrame({"qty": np.random.default_rng(1).integers(1, 10, n), "price": np.random.default_rng(2).choice([7.5, 45, 650], n)})\nt = time.perf_counter()\nslow = [row.qty * row.price for row in df.itertuples()]\nt_loop = time.perf_counter() - t\nt = time.perf_counter()\nfast = df.qty * df.price\nt_vec = time.perf_counter() - t\nprint(f"loop {t_loop * 1000:.0f} ms, vectorised {t_vec * 1000:.1f} ms, same: {np.allclose(slow, fast)}")', run: 1 }
      ],
      practice: [
        B('ادمج جدول طلبات مع جدول عملاء ومنتجات (merge مرتين) وتأكد إن عدد الصفوف متغيرش.', 'Merge an orders table with customers and products (two merges) and check the row count did not change.'),
        B('ادمج 3 ملفات شهور بـ concat وضيف عمود الشهر.', 'Stack 3 monthly files with concat and add a month column.'),
        B('صدّر تقرير Excel فيه 3 شيتات (على جهازك) ونسّقه بـ style_table.', 'Export a 3-sheet Excel report (on your machine) and format it with style_table.'),
        B('قيس لوب iterrows قدام عملية vectorized على 100 ألف صف.', 'Time an iterrows loop against a vectorised operation on 100,000 rows.')
      ],
      code: [
        { u: B('JSON للوحة أسبوع 15', 'JSON for the week 15 dashboard'), p: DATA + 'import json\ndf["revenue"] = df.qty * df.price\npayload = {\n    "generated_at": pd.Timestamp.now().isoformat(timespec="seconds"),\n    "cities": df.groupby("branch", as_index=False)["revenue"].sum().rename(columns={"branch": "city"}).to_dict(orient="records"),\n    "daily": df.groupby(df.day.dt.strftime("%Y-%m-%d"))["revenue"].sum().to_dict(),\n}\nprint(json.dumps(payload, indent=1)[:400])', run: 1 }
      ],
      words: [
        { t: 'pd.merge', m: B('دمج جدولين بعمود مشترك (زي JOIN)', 'joining two tables on a shared column (like JOIN)'), ex: 'pd.merge(a, b, on="id", how="left")' },
        { t: 'concat', m: B('لزق جداول بنفس الأعمدة تحت بعض', 'stacking tables with the same columns'), ex: 'pd.concat([jan, feb])' },
        { t: 'validate', m: B('خيار في merge بيتأكد من شكل العلاقة', 'a merge option checking the relationship’s shape'), ex: 'validate="many_to_one"' },
        { t: 'ExcelWriter', m: B('بيكتب أكتر من DataFrame في شيتات ملف واحد', 'writes several DataFrames to sheets of one file'), ex: 'with pd.ExcelWriter("r.xlsx") as w:' },
        { t: 'orient="records"', m: B('شكل JSON: قايمة objects صف صف', 'a JSON shape: a list of objects, row by row'), ex: 'df.to_json(orient="records")' },
        { t: 'iterrows', m: B('لوب على الصفوف؛ بطيء جدًا، تجنّبه', 'looping over rows; very slow, avoid it'), ex: 'prefer df.qty * df.price' }
      ],
      read: [{ lib: 'pandas: Getting started', what: B('How to combine data from multiple tables?', 'How to combine data from multiple tables?') }, { lib: 'Python Data Science Handbook', what: B('الفصل 3: Combining Datasets: Merge and Join.', 'Chapter 3: Combining Datasets: Merge and Join.') }],
      challenge: B('حوّل مشروع «تقرير المبيعات» (أسبوع 11) لـ pandas: نفس النتيجة (ملخص ومنتجات ويومي ومشاكل) بربع عدد السطور، ومعاه `data.json` للوحة أسبوع 15 — وقارن الناتجين إنهم متطابقين في الأرقام.', 'Rewrite the «sales report» project (week 11) with pandas: the same output (summary, products, daily, problems) in a quarter of the lines, plus `data.json` for the week 15 dashboard — and check both outputs match in their numbers.'),
      quiz: [
        { q: B('`pd.merge(a, b, how="left")` بيسيب:', '`pd.merge(a, b, how="left")` keeps:'), o: [B('كل صفوف a', 'every row of a'), B('المشترك بس', 'only matches'), B('كل صفوف b', 'every row of b')], a: 0, why: B('LEFT.', 'LEFT.') },
        { q: B('ملفات شهور بنفس الأعمدة في جدول واحد:', 'Monthly files with the same columns into one table:'), o: ['pd.concat', 'pd.merge', 'df.pivot'], a: 0, why: B('تحت بعض.', 'Stacked.') },
        { q: B('أسرع طريقة تحسب qty×price:', 'The fastest way to compute qty×price:'), o: ['df.qty * df.price', B('iterrows', 'iterrows'), B('apply على كل صف', 'apply on each row')], a: 0, why: B('vectorized.', 'Vectorised.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تحلّل مجموعة بيانات حقيقية بـ pandas من الأول للآخر، وتعدّي الاختبار.', 'Analyse a real dataset with pandas from start to finish, and pass the test.'),
      review: [
        B('DataFrame وSeries وread_csv وinfo وdescribe وloc وiloc.', 'DataFrame, Series, read_csv, info, describe, loc and iloc.'),
        B('الفلترة والـ query والترتيب وassign و.str و.dt.', 'Filtering, query, sorting, assign, .str and .dt.'),
        B('الناقص (isna/fillna/dropna) وcoerce والمكرر والشاذ.', 'Gaps (isna/fillna/dropna), coerce, duplicates and outliers.'),
        B('groupby وagg وpivot_table وresample والنسب والتراكمي.', 'groupby, agg, pivot_table, resample, shares and running totals.'),
        B('merge وconcat والتصدير CSV/Excel/JSON، والـ vectorized.', 'merge, concat, CSV/Excel/JSON export, and vectorised code.')
      ],
      project: B('**تحليل مبيعات سنة كاملة** (`analysis/`): اعمل بيانات تجريبية واقعية (سكربت بيطلّع 5000 طلب على 12 شهر و5 فروع و20 منتج، فيها 3% أخطاء مقصودة: أسعار نص، تواريخ بأشكال، مكرر، ناقص). (1) `clean.py` بيرجّع البيانات النضيفة وتقرير التنضيف. (2) `analyze.py` بيطلّع: ملخص الفروع، وpivot فرع×شهر، وأفضل 5 منتجات، والتغيّر الشهري، والعملاء الـ 10 الأكتر صرفًا، ونسبة كل فئة. (3) `report.xlsx` بشيت لكل تحليل ومنسّق، و`data.json` للوحة أسبوع 15. (4) 10 tests بـ DataFrames صغيرة. (5) README بـ 5 «اكتشافات» كتبتها انت من الأرقام.', '**A full year of sales analysed** (`analysis/`): generate realistic test data (a script producing 5,000 orders across 12 months, 5 branches and 20 products, with 3% deliberate errors: text prices, mixed date formats, duplicates, gaps). (1) `clean.py` returns the clean data and a cleaning report. (2) `analyze.py` produces: a branch summary, a branch × month pivot, the top 5 products, the monthly change, the 10 biggest-spending customers, and each category’s share. (3) `report.xlsx` with a formatted sheet per analysis, and `data.json` for the week 15 dashboard. (4) 10 tests with small DataFrames. (5) A README with 5 «findings» you wrote from the numbers.'),
      test: [
        { q: B('`df.shape` بترجّع:', '`df.shape` returns:'), o: [B('(عدد الصفوف، عدد الأعمدة)', '(rows, columns)'), B('أسماء الأعمدة', 'the column names'), B('الأنواع', 'the types')], a: 0, why: B('tuple.', 'A tuple.') },
        { q: B('`df[["a", "b"]]`:', '`df[["a", "b"]]`:'), o: [B('DataFrame بعمودين', 'a DataFrame with two columns'), B('Series', 'a Series'), B('خطأ', 'an error')], a: 0, why: B('قايمة أعمدة.', 'A list of columns.') },
        { q: B('`df.iloc[0]`:', '`df.iloc[0]`:'), o: [B('أول صف', 'the first row'), B('أول عمود', 'the first column'), B('أول قيمة بس', 'only the first value')], a: 0, why: B('بالرقم.', 'By position.') },
        { q: B('الصفوف اللي city فيها Cairo:', 'The rows whose city is Cairo:'), o: ['df[df.city == "Cairo"]', 'df.city == "Cairo"', 'df.loc["Cairo"]'], a: 0, why: B('mask.', 'A mask.') },
        { q: B('`fillna(0)` على عمود فيه NaN:', '`fillna(0)` on a column with NaN:'), o: [B('بيحط 0 مكان الناقص', 'puts 0 where values are missing'), B('بيشيل الصفوف', 'drops the rows'), B('ميعملش حاجة', 'does nothing')], a: 0, why: B('ملا.', 'Fill.') },
        { q: B('`pd.to_numeric(s, errors="coerce")` على "abc":', '`pd.to_numeric(s, errors="coerce")` on "abc":'), o: ['NaN', '0', B('خطأ', 'an error')], a: 0, why: B('coerce.', 'coerce.') },
        { q: B('`drop_duplicates(subset=["email"])` بيسيب:', '`drop_duplicates(subset=["email"])` keeps:'), o: [B('أول صف لكل إيميل', 'the first row per email'), B('آخر صف', 'the last row'), B('ولا صف', 'no rows')], a: 0, why: B('keep="first" افتراضيًا.', 'keep="first" by default.') },
        { q: B('عدد الصفوف في كل مجموعة بـ agg:', 'The row count per group with agg:'), o: ['("col", "size")', '("col", "sum")', '("col", "mean")'], a: 0, why: B('size.', 'size.') },
        { q: B('جدول فروع×شهور بمجاميع:', 'A branches × months table with totals:'), o: ['pivot_table(..., margins=True)', 'concat', 'value_counts'], a: 0, why: B('pivot.', 'A pivot.') },
        { q: B('merge ضاعف عدد الصفوف فجأة. الغالب:', 'A merge suddenly doubled the row count. Most likely:'), o: [B('المفتاح متكرر في الجدول التاني', 'the key repeats in the other table'), B('pandas قديمة', 'old pandas'), B('الملف كبير', 'the file is big')], a: 0, why: B('استخدم validate.', 'Use validate.') },
        { q: B('JSON للوحة ويب:', 'JSON for a web dashboard:'), o: ['to_json(orient="records")', 'to_excel', 'to_clipboard'], a: 0, why: B('قايمة objects.', 'A list of objects.') },
        { q: B('ليه تتجنب iterrows؟', 'Why avoid iterrows?'), o: [B('بطيء جدًا قدام الـ vectorized', 'it is very slow compared with vectorised code'), B('مش موجود', 'it does not exist'), B('بيغيّر البيانات', 'it changes the data')], a: 0, why: B('100× أبطأ.', '100× slower.') }
      ] }
  ]
};
