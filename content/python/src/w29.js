// Python week 29 — Advanced pandas and Polars.
// pandas examples run (pandas is available in the browser and in CI); Polars examples are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('pandas المتقدم وPolars', 'Advanced pandas and Polars'),
  goal: B('تحلّل بيانات حقيقية بسرعة وبكود مقروء: دمج بتحقق، تشكيل جداول (long/wide)، تجميع متقدم، ذاكرة أقل، عمليات متجهة، سلاسل زمنية — وتعرف إمتى Polars أو DuckDB أسرع.',
          'Analyse real data quickly with readable code: validated merges, reshaping tables (long/wide), advanced aggregation, less memory, vectorised operations, time series — and know when Polars or DuckDB is faster.'),
  days: [
    { title: B('دمج بتحقق', 'Merging with checks'),
      goal: B('تدمج جداول من غير ما تكرر أو تضيّع صفوف من غير ما تاخد بالك.', 'Merge tables without silently duplicating or losing rows.'),
      learn: [
        L(B('validate', 'validate'),
          B('`merge(..., validate="many_to_one")` بيتأكد إن الجدول التاني فيه مفتاح واحد لكل قيمة — لو فيه تكرار يطلع خطأ بدل ما الصفوف تتضاعف بهدوء. أنواع: one_to_one، one_to_many، many_to_one.', '`merge(..., validate="many_to_one")` checks the right table has one row per key — if it has duplicates it raises an error instead of quietly multiplying rows. Types: one_to_one, one_to_many, many_to_one.'),
          'import pandas as pd\norders = pd.DataFrame({"order": [1, 2, 3], "cust": ["c1", "c2", "c1"]})\ncustomers = pd.DataFrame({"cust": ["c1", "c2", "c2"], "city": ["Giza", "Cairo", "Alex"]})\ntry:\n    orders.merge(customers, on="cust", validate="many_to_one")\nexcept pd.errors.MergeError as e:\n    print("MergeError:", e)\nclean = customers.drop_duplicates("cust")\nprint(orders.merge(clean, on="cust", validate="many_to_one"))', R),
        L(B('indicator', 'indicator'),
          B('`indicator=True` بيضيف عمود `_merge` بيقول كل صف جه منين: `both` أو `left_only` أو `right_only`. أسرع طريقة تلاقي الطلبات اللي ملهاش عميل أو العملاء اللي مشتروش.', '`indicator=True` adds a `_merge` column saying where each row came from: `both`, `left_only` or `right_only`. The fastest way to find orders without a customer or customers who never bought.'),
          'import pandas as pd\norders = pd.DataFrame({"cust": ["c1", "c9", "c2"], "total": [300, 50, 120]})\ncustomers = pd.DataFrame({"cust": ["c1", "c2", "c3"]})\nm = customers.merge(orders, on="cust", how="outer", indicator=True)\nprint(m)\nprint("never bought:", m.loc[m["_merge"] == "left_only", "cust"].tolist())\nprint("unknown customer:", m.loc[m["_merge"] == "right_only", "cust"].tolist())', R),
        L(B('عدد الصفوف قبل وبعد', 'Row counts before and after'),
          B('عادة بسيطة بتنقذ تقارير: اطبع/اتأكد من عدد الصفوف قبل وبعد كل دمج: `assert len(after) == len(orders)` لو المفروض الطلبات متتكررش. أي اختلاف = مفتاح متكرر أو ناقص.', 'A simple habit that saves reports: print/assert the row count before and after each merge: `assert len(after) == len(orders)` if orders must not multiply. Any difference = a duplicated or missing key.'),
          'before = len(orders)\nafter = orders.merge(customers, on="cust", how="left")\nassert len(after) == before, f"merge changed rows: {before} → {len(after)}"', T)
      ],
      practice: [
        B('اعمل دمج بـ validate واكتشف مفتاح متكرر.', 'Merge with validate and catch a duplicated key.'),
        B('استخدم indicator تلاقي العملاء اللي مشتروش.', 'Use indicator to find customers who never bought.'),
        B('ضيف assert لعدد الصفوف بعد كل دمج في تقرير عندك.', 'Add a row-count assert after each merge in one of your reports.'),
        B('اكتب في سطرين الفرق بين how=left وouter.', 'Write in two lines the difference between how=left and outer.')
      ],
      words: [
        W('merge validate', 'تحقق من نوع العلاقة وقت الدمج', 'checking the relationship type while merging', 'merge validate caught a duplicated customer.'),
        W('indicator', 'عمود بيقول كل صف جه من أنهي جدول', 'a column saying which table each row came from', 'indicator=True adds _merge.'),
        W('many_to_one', 'كتير لواحد: كل مفتاح يمين ليه صف واحد', 'many to one: each right-hand key has one row', 'Orders to customers is many_to_one.'),
        W('row explosion', 'الصفوف بتتضاعف بسبب مفتاح متكرر', 'rows multiplying because of a duplicated key', 'A duplicated key caused row explosion.'),
        W('outer join', 'دمج بيحتفظ بكل الصفوف من الجهتين', 'a join keeping all rows from both sides', 'Use an outer join to see both gaps.')
      ],
      read: ['lib:10 minutes to pandas', { lib: 'pandas: Getting started', what: B('اقرا merge وjoin في الـ user guide.', 'Read merge and join in the user guide.') }],
      challenge: B('ادمج 3 جداول (طلبات، عملاء، منتجات) بـ validate وindicator وasserts، واطلع تقرير: الطلبات اليتيمة، العملاء غير النشطين، والمنتجات اللي مبتتباعش.', 'Merge 3 tables (orders, customers, products) with validate, indicator and asserts, and produce a report: orphan orders, inactive customers, and products that never sell.'),
      quiz: [
        Q(B('validate="many_to_one" بيطلع خطأ لما:', 'validate="many_to_one" raises when:'), [['الجدول اليمين فيه مفتاح متكرر', 'the right table has a duplicated key'], ['الجدول فاضي', 'a table is empty'], ['الأعمدة كتير', 'there are many columns']], 0, B('بيمنع التضاعف.', 'It prevents multiplication.')),
        Q(B('_merge = left_only:', '_merge = left_only:'), [['الصف من الشمال بس', 'the row is only on the left'], ['في الاتنين', 'in both'], ['خطأ', 'an error']], 0, B('ملوش مقابل.', 'No match.')),
        Q(B('عدد الصفوف زاد بعد left merge:', 'Row count grew after a left merge:'), [['مفتاح متكرر في اليمين', 'a duplicated key on the right'], ['طبيعي دايمًا', 'always normal'], ['مشكلة ذاكرة', 'a memory problem']], 0, B('row explosion.', 'Row explosion.'))
      ] },

    { title: B('تشكيل الجداول', 'Reshaping tables'),
      goal: B('تحوّل بين الشكل الطويل والعريض حسب الحاجة.', 'Switch between long and wide shapes as needed.'),
      learn: [
        L(B('long وwide', 'Long and wide'),
          B('**wide format**: عمود لكل شهر (سهل للإنسان وExcel). **long format**: صف لكل (منتج، شهر، قيمة) (سهل للتحليل والرسم والقواعد). `melt` بيحوّل wide ← long، و`pivot_table` long ← wide.', '**Wide format**: a column per month (easy for people and Excel). **Long format**: a row per (product, month, value) (easy for analysis, charts and databases). `melt` turns wide → long, and `pivot_table` long → wide.'),
          'import pandas as pd\nwide = pd.DataFrame({"product": ["tea", "coffee"], "Jan": [10, 20], "Feb": [12, 18]})\nlong = wide.melt(id_vars="product", var_name="month", value_name="sold")\nprint(long)\nback = long.pivot_table(index="product", columns="month", values="sold", aggfunc="sum")\nprint(back)', R),
        L(B('pivot_table بإجماليات', 'pivot_table with totals'),
          B('`pivot_table(..., aggfunc="sum", margins=True, fill_value=0)` بيعمل جدول تقاطع بإجمالي صف وعمود — نفس pivot في Excel بس في كود يتعاد كل يوم.', '`pivot_table(..., aggfunc="sum", margins=True, fill_value=0)` builds a cross-tab with row and column totals — the same as an Excel pivot, but in code you can rerun daily.'),
          'import pandas as pd\nsales = pd.DataFrame({"city": ["Giza", "Giza", "Cairo", "Alex"], "product": ["tea", "coffee", "tea", "tea"], "total": [300, 150, 200, 90]})\nprint(sales.pivot_table(index="city", columns="product", values="total", aggfunc="sum", margins=True, fill_value=0))', R),
        L(B('تجميع بأسماء', 'Named aggregation'),
          B('**named aggregation** بيطلّع أعمدة بأسماء واضحة مرة واحدة: `.agg(orders=("id","count"), revenue=("total","sum"), avg=("total","mean"))`. و`transform` بيرجّع نتيجة المجموعة لكل صف (مثلًا نسبة الطلب من إجمالي مدينته).', '**Named aggregation** produces clearly named columns in one go: `.agg(orders=("id","count"), revenue=("total","sum"), avg=("total","mean"))`. `transform` returns the group result for each row (e.g. an order’s share of its city’s total).'),
          'import pandas as pd\ndf = pd.DataFrame({"id": [1, 2, 3, 4], "city": ["Giza", "Giza", "Cairo", "Cairo"], "total": [300, 100, 200, 600]})\nprint(df.groupby("city").agg(orders=("id", "count"), revenue=("total", "sum"), avg=("total", "mean")))\ndf["share"] = (df["total"] / df.groupby("city")["total"].transform("sum")).round(2)\nprint(df)', R)
      ],
      practice: [
        B('حوّل شيت مبيعات wide لـ long بـ melt.', 'Turn a wide sales sheet into long form with melt.'),
        B('اعمل pivot_table بإجماليات.', 'Build a pivot_table with totals.'),
        B('اعمل تجميع بأسماء لـ 4 مقاييس.', 'Do a named aggregation of 4 measures.'),
        B('احسب نسبة كل طلب من مدينته بـ transform.', 'Compute each order’s share of its city with transform.')
      ],
      words: [
        W('long format', 'صف لكل قيمة مع أعمدة وصف', 'one row per value with describing columns', 'Store data in long format.'),
        W('wide format', 'عمود لكل فئة (زي الشهور)', 'one column per category (like months)', 'Excel users prefer wide format.'),
        W('melt', 'تحويل جدول عريض لطويل', 'turning a wide table into a long one', 'melt the month columns.'),
        W('pivot_table', 'جدول تقاطع بتجميع', 'a cross-table with aggregation', 'pivot_table shows sales by city and product.'),
        W('named aggregation', 'تجميع بأسماء أعمدة واضحة', 'aggregation with clear output column names', 'Named aggregation gives a tidy summary.')
      ],
      read: ['lib:Python for Data Analysis, 3E', { lib: '10 minutes to pandas', what: B('اقرا Reshaping.', 'Read Reshaping.') }],
      challenge: B('خد بيانات مبيعات سنة (اعملها وهمية: 12 شهر × 5 منتجات × 3 مدن)، حوّلها long، واعمل 3 تقارير: pivot مدن×منتجات، تجميع شهري بأسماء، ونسبة كل مدينة.', 'Take a year of sales data (fake: 12 months × 5 products × 3 cities), make it long, and build 3 reports: a cities × products pivot, a named monthly aggregation, and each city’s share.'),
      quiz: [
        Q(B('عمود لكل شهر:', 'A column per month:'), [['wide format', 'wide format'], ['long format', 'long format'], ['JSON', 'JSON']], 0, B('عريض.', 'Wide.')),
        Q(B('melt بيحوّل:', 'melt turns:'), [['wide ← long', 'wide → long'], ['long ← wide', 'long → wide'], ['CSV ← JSON', 'CSV → JSON']], 0, B('لطويل.', 'To long.')),
        Q(B('transform بيرجّع:', 'transform returns:'), [['قيمة لكل صف', 'a value for each row'], ['صف لكل مجموعة', 'a row per group'], ['رقم واحد', 'one number']], 0, B('نفس الطول.', 'Same length.'))
      ] },

    { title: B('الأداء والذاكرة', 'Performance and memory'),
      goal: B('تخلّي pandas أسرع 10× وأخف بكتير.', 'Make pandas 10× faster and much lighter.'),
      learn: [
        L(B('العمليات المتجهة', 'Vectorised operations'),
          B('**vectorization**: عمليات على العمود كله مرة واحدة (`df["a"] * df["b"]`) أسرع جدًا من `apply` أو loop على الصفوف. `apply` بيشغّل بايثون لكل صف. وللشروط: `np.where` أو `.where` بدل apply.', '**Vectorisation**: operations on a whole column at once (`df["a"] * df["b"]`) are far faster than `apply` or a loop over rows. `apply` runs Python per row. For conditions: `np.where` or `.where` instead of apply.'),
          'import pandas as pd, numpy as np, time\ndf = pd.DataFrame({"qty": np.random.default_rng(1).integers(1, 10, 50_000), "price": 50})\nt = time.perf_counter(); a = df.apply(lambda r: r.qty * r.price, axis=1); t1 = time.perf_counter() - t\nt = time.perf_counter(); b = df["qty"] * df["price"]; t2 = time.perf_counter() - t\nprint(f"apply {t1:.3f}s vs vectorised {t2:.4f}s — same result: {a.equals(b)}")\ndf["size"] = np.where(b > 300, "big", "small")\nprint(df["size"].value_counts().to_dict())', R),
        L(B('الأنواع والذاكرة', 'Types and memory'),
          B('`df.memory_usage(deep=True)` بيوريك كل عمود واخد قد إيه. أعمدة نص متكررة (مدينة، حالة) ← **categorical** (ممكن توفّر 90%). وأرقام صغيرة ← `downcast` لـ int32/int16. واقرا الأعمدة اللي محتاجها بس (`usecols`).', '`df.memory_usage(deep=True)` shows how much each column takes. Repeated text columns (city, status) → **categorical** (can save 90%). Small numbers → `downcast` to int32/int16. And read only the columns you need (`usecols`).'),
          'import pandas as pd\ndf = pd.DataFrame({"city": ["Giza", "Cairo", "Alex"] * 100_000, "qty": [1, 2, 3] * 100_000})\nbefore = df.memory_usage(deep=True).sum() / 1e6\ndf["city"] = df["city"].astype("category")\ndf["qty"] = pd.to_numeric(df["qty"], downcast="integer")\nafter = df.memory_usage(deep=True).sum() / 1e6\nprint(f"{before:.1f} MB → {after:.1f} MB", df.dtypes.to_dict())', R),
        L(B('اقرا على أجزاء', 'Read in chunks'),
          B('ملف CSV أكبر من الذاكرة؟ `pd.read_csv(path, chunksize=100_000)` بيرجّع أجزاء: عالج كل جزء ولخّصه، واجمع الملخصات. نفس فكرة الـ generator pipeline.', 'A CSV bigger than memory? `pd.read_csv(path, chunksize=100_000)` returns pieces: process and summarise each piece, then combine the summaries. Same idea as the generator pipeline.'),
          'totals = None\nfor chunk in pd.read_csv("orders_2026.csv", chunksize=100_000, usecols=["city", "total"]):\n    part = chunk.groupby("city")["total"].sum()\n    totals = part if totals is None else totals.add(part, fill_value=0)\nprint(totals.sort_values(ascending=False))', T)
      ],
      practice: [
        B('قيس apply مقابل vectorised على 50 ألف صف.', 'Time apply versus vectorised on 50k rows.'),
        B('حوّل عمودين لـ categorical وقيس الذاكرة.', 'Convert two columns to categorical and measure memory.'),
        B('اقرا ملف كبير بـ chunksize ولخّصه.', 'Read a big file with chunksize and summarise it.'),
        B('بدّل 3 apply في كودك بعمليات متجهة.', 'Replace 3 applies in your code with vectorised operations.')
      ],
      words: [
        W('vectorization', 'عمليات على عمود كامل مرة واحدة', 'operating on a whole column at once', 'Vectorization made the report 100× faster.'),
        W('categorical', 'نوع للنصوص المتكررة بيوفّر ذاكرة', 'a type for repeated text that saves memory', 'Make city a categorical column.'),
        W('memory_usage', 'قياس ذاكرة كل عمود', 'measuring each column’s memory', 'Check memory_usage(deep=True) first.'),
        W('downcast', 'تحويل لنوع رقمي أصغر', 'converting to a smaller numeric type', 'Downcast qty to int16.'),
        W('np.where', 'شرط متجه بيختار قيمة لكل صف', 'a vectorised condition choosing a value per row', 'np.where labels big orders.')
      ],
      read: [{ lib: 'pandas: Getting started', what: B('اقرا «Scaling to large datasets».', 'Read «Scaling to large datasets».') }, 'lib:Python Data Science Handbook'],
      challenge: B('خد تقرير pandas بطيء عندك (أو اعمل واحد على مليون صف): قيس، بدّل apply بعمليات متجهة، حوّل للـ categorical، اقرا بـ usecols — ووثّق الوقت والذاكرة قبل وبعد.', 'Take a slow pandas report of yours (or build one on a million rows): measure, replace apply with vectorised operations, convert to categorical, read with usecols — and document time and memory before and after.'),
      quiz: [
        Q(B('أسرع طريقة لضرب عمودين:', 'The fastest way to multiply two columns:'), [['df["a"] * df["b"]', 'df["a"] * df["b"]'], ['apply بـ lambda', 'apply with a lambda'], ['loop', 'a loop']], 0, B('vectorised.', 'Vectorised.')),
        Q(B('عمود مدن بيتكرر:', 'A repeated city column:'), [['categorical', 'categorical'], ['float', 'float'], ['object دايمًا', 'always object']], 0, B('ذاكرة أقل.', 'Less memory.')),
        Q(B('ملف أكبر من الذاكرة:', 'A file bigger than memory:'), [['read_csv بـ chunksize', 'read_csv with chunksize'], ['ذاكرة أكبر بس', 'just more memory'], ['Excel', 'Excel']], 0, B('أجزاء.', 'Pieces.'))
      ] },

    { title: B('السلاسل الزمنية', 'Time series'),
      goal: B('تحلّل بيانات بالوقت: اتجاهات ومتوسطات متحركة ومقارنات.', 'Analyse time-based data: trends, moving averages and comparisons.'),
      learn: [
        L(B('الفهرس الزمني', 'The time index'),
          B('حوّل عمود التاريخ لـ datetime بتوقيت واضح، وخليه index. بعدها `resample("W")` تجميع أسبوعي، و`.loc["2026-09"]` شهر كامل. وخلي بالك من التوقيت: خزّن UTC واعرض بتوقيت القاهرة.', 'Convert the date column to datetime with a clear time zone and make it the index. Then `resample("W")` groups weekly, and `.loc["2026-09"]` selects a whole month. Watch the time zone: store UTC and display in Cairo time.'),
          'import pandas as pd\ns = pd.Series([5, 7, 3, 9, 4, 8, 6, 10], index=pd.date_range("2026-09-01", periods=8, freq="D", tz="UTC"))\nprint(s.tz_convert("Africa/Cairo").index[0])\nprint(s.resample("W").sum())', R),
        L(B('المتوسط المتحرك', 'The moving average'),
          B('**rolling window**: `s.rolling(7).mean()` متوسط آخر 7 أيام — بينعّم التذبذب اليومي ويبيّن الاتجاه. ولمقارنة بالأسبوع اللي فات: `s.pct_change(7)`. والتعويض عن الأيام الناقصة: `asfreq("D", fill_value=0)`.', 'A **rolling window**: `s.rolling(7).mean()` is the average of the last 7 days — it smooths daily noise and shows the trend. To compare with last week: `s.pct_change(7)`. To fill missing days: `asfreq("D", fill_value=0)`.'),
          'import pandas as pd, numpy as np\ndays = pd.date_range("2026-09-01", periods=21, freq="D")\norders = pd.Series(np.random.default_rng(2).integers(20, 60, 21), index=days)\nreport = pd.DataFrame({"orders": orders, "avg7": orders.rolling(7).mean().round(1), "vs_last_week": orders.pct_change(7).round(2)})\nprint(report.tail(5))', R),
        L(B('الأيام الناقصة', 'Missing days'),
          B('لو مفيش طلبات يوم الجمعة، اليوم ده مش موجود في البيانات خالص — والمتوسط بيبقى غلط. `asfreq("D", fill_value=0)` بيضيف الأيام الناقصة بصفر. اسأل نفسك دايمًا: «غياب الصف معناه صفر ولا مش معروف؟».', 'If there were no orders on Friday, that day is not in the data at all — and the average becomes wrong. `asfreq("D", fill_value=0)` adds the missing days as zero. Always ask: «does a missing row mean zero or unknown?».'),
          'import pandas as pd\ns = pd.Series([5, 3], index=pd.to_datetime(["2026-10-01", "2026-10-03"]))\nprint(s.asfreq("D", fill_value=0))', R)
      ],
      practice: [
        B('اعمل سلسلة طلبات يومية وجمّعها أسبوعي وشهري.', 'Build a daily order series and aggregate it weekly and monthly.'),
        B('احسب متوسط متحرك 7 أيام ونسبة التغيير الأسبوعية.', 'Compute a 7-day moving average and the weekly change.'),
        B('أضف الأيام الناقصة بصفر وشوف الفرق في المتوسط.', 'Add missing days as zero and see the difference in the average.'),
        B('حوّل من UTC لتوقيت القاهرة.', 'Convert from UTC to Cairo time.')
      ],
      words: [
        W('time series', 'بيانات مرتبة بالوقت', 'data ordered by time', 'Daily orders form a time series.'),
        W('rolling window', 'نافذة متحركة لحساب متوسط أو مجموع', 'a moving window for an average or sum', 'Use a 7-day rolling window.'),
        W('week-over-week', 'مقارنة بنفس الوقت الأسبوع اللي فات', 'compared with the same time last week', 'Orders fell 5% week-over-week.'),
        W('asfreq', 'إعادة ضبط تكرار السلسلة (وإضافة الناقص)', 'setting a series to a regular frequency (filling gaps)', 'asfreq("D") adds the missing days.'),
        W('tz_convert', 'تحويل التوقيت لمنطقة تانية', 'converting times to another time zone', 'tz_convert to Africa/Cairo for display.')
      ],
      read: ['lib:Python for Data Analysis, 3E', { lib: 'pandas: Getting started', what: B('اقرا «Time series / date functionality».', 'Read «Time series / date functionality».') }],
      challenge: B('اعمل «لوحة يومية» من بيانات طلبات وهمية لـ 90 يوم: أيام ناقصة بصفر، تجميع أسبوعي، متوسط 7 أيام، مقارنة بالأسبوع اللي فات، وأيام شاذة (فوق المتوسط بـ 50%).', 'Build a «daily dashboard» from 90 days of fake orders: missing days as zero, a weekly total, a 7-day average, a comparison with last week, and unusual days (50% above the average).'),
      quiz: [
        Q(B('rolling(7).mean():', 'rolling(7).mean():'), [['متوسط آخر 7 قيم', 'the average of the last 7 values'], ['مجموع الأسبوع', 'the week’s sum'], ['أكبر قيمة', 'the maximum']], 0, B('متحرك.', 'Moving.')),
        Q(B('يوم من غير طلبات مش موجود في البيانات:', 'A day with no orders missing from the data:'), [['asfreq بـ fill_value=0', 'asfreq with fill_value=0'], ['تجاهل', 'ignore it'], ['امسح الأسبوع', 'delete the week']], 0, B('غياب = صفر هنا.', 'Missing = zero here.')),
        Q(B('التخزين الأحسن للوقت:', 'The best way to store times:'), [['UTC والعرض بالمحلي', 'UTC, displayed in local time'], ['بالمحلي بس', 'local only'], ['نص', 'as text']], 0, B('مرجع واحد.', 'One reference.'))
      ] },

    { title: B('Polars وDuckDB', 'Polars and DuckDB'),
      goal: B('تعرف إمتى أدوات أحدث بتكون أسرع بكتير من pandas.', 'Know when newer tools are much faster than pandas.'),
      learn: [
        L(B('Polars', 'Polars'),
          B('**Polars** مكتبة DataFrames مكتوبة بـ Rust: بتستخدم كل الـ cores وأقل ذاكرة، وكتابتها بـ **expressions** (`pl.col("total").sum()`). مناسبة للملفات الكبيرة. الشكل مختلف شوية عن pandas بس الأفكار نفسها.', '**Polars** is a DataFrame library written in Rust: it uses every core and less memory, and you write **expressions** (`pl.col("total").sum()`). Good for big files. The style differs a little from pandas but the ideas are the same.'),
          'import polars as pl\n\ndf = pl.read_csv("orders.csv")\nreport = (\n    df.filter(pl.col("status") == "paid")\n      .group_by("city")\n      .agg(orders=pl.len(), revenue=pl.col("total").sum())\n      .sort("revenue", descending=True)\n)\nprint(report)', T),
        L(B('Lazy: خطة قبل التنفيذ', 'Lazy: a plan before running'),
          B('`pl.scan_csv` بيعمل **LazyFrame**: بيبني خطة ومبيقراش لحد `.collect()`. Polars بيحسّن الخطة (يقرا الأعمدة المطلوبة بس، ويطبّق الفلتر بدري) — فبيعالج ملفات أكبر من الذاكرة.', '`pl.scan_csv` creates a **LazyFrame**: it builds a plan and reads nothing until `.collect()`. Polars optimises the plan (reads only the needed columns and applies filters early) — so it handles files larger than memory.'),
          'report = (\n    pl.scan_csv("orders_2026_*.csv")\n      .filter(pl.col("total") > 0)\n      .group_by("city").agg(pl.col("total").sum())\n      .collect()\n)\nprint(pl.scan_csv("orders.csv").select("city").explain())   # shows the query plan', T),
        L(B('DuckDB: SQL على الملفات', 'DuckDB: SQL on files'),
          B('**DuckDB** قاعدة بيانات تحليلية جوه بايثون من غير سيرفر: تكتب SQL مباشرة على CSV أو **Parquet** أو DataFrame. Parquet صيغة أعمدة مضغوطة أسرع وأصغر بكتير من CSV للبيانات الكبيرة.', '**DuckDB** is an in-process analytical database with no server: you write SQL directly on CSV, **Parquet** or a DataFrame. Parquet is a compressed column format, much faster and smaller than CSV for big data.'),
          'import duckdb\n\nduckdb.sql("""\n    SELECT city, count(*) AS orders, sum(total) AS revenue\n    FROM \'orders_2026_*.csv\'\n    WHERE status = \'paid\'\n    GROUP BY city ORDER BY revenue DESC\n""").show()\nduckdb.sql("COPY (SELECT * FROM \'orders.csv\') TO \'orders.parquet\' (FORMAT parquet)")', T)
      ],
      practice: [
        B('ثبّت polars وduckdb في venv وأعد تقرير pandas بيهم.', 'Install polars and duckdb in a venv and redo a pandas report with them.'),
        B('قارن الوقت على ملف مليون صف.', 'Compare the time on a one-million-row file.'),
        B('حوّل CSV لـ Parquet وقارن الحجم.', 'Convert a CSV to Parquet and compare the size.'),
        B('اطبع query plan بـ explain.', 'Print a query plan with explain.')
      ],
      words: [
        W('polars', 'مكتبة DataFrames سريعة مكتوبة بـ Rust', 'a fast DataFrame library written in Rust', 'Polars used all eight cores.'),
        W('lazyframe', 'إطار بيانات بيبني خطة وينفّذ بعدين', 'a frame that builds a plan and runs later', 'scan_csv returns a LazyFrame.'),
        W('polars expression', 'تعبير بيوصف عملية على عمود في Polars', 'an expression describing a column operation in Polars', 'pl.col("total").sum() is a Polars expression.'),
        W('duckdb', 'قاعدة بيانات تحليلية من غير سيرفر', 'an analytical database with no server', 'DuckDB queries the CSV files directly.'),
        W('parquet', 'صيغة ملفات أعمدة مضغوطة للبيانات الكبيرة', 'a compressed columnar file format for big data', 'Parquet is ten times smaller than the CSV.')
      ],
      read: [{ t: 'Polars user guide', url: 'https://docs.pola.rs/user-guide/getting-started/', what: B('اقرا Getting started والـ expressions.', 'Read Getting started and expressions.') }, { t: 'DuckDB: Python API', url: 'https://duckdb.org/docs/stable/clients/python/overview', what: B('اقرا SQL على الملفات.', 'Read about SQL on files.') }],
      challenge: B('اعمل benchmark: نفس التقرير (فلتر + تجميع + ترتيب) على ملف 2 مليون صف بـ pandas وPolars (lazy) وDuckDB، وCSV مقابل Parquet — وجدول بالوقت والذاكرة وتوصيتك.', 'Run a benchmark: the same report (filter + group + sort) on a 2-million-row file with pandas, Polars (lazy) and DuckDB, CSV versus Parquet — with a table of time and memory and your recommendation.'),
      quiz: [
        Q(B('LazyFrame بيقرا البيانات:', 'A LazyFrame reads the data:'), [['عند collect()', 'at collect()'], ['فورًا', 'immediately'], ['أبدًا', 'never']], 0, B('خطة الأول.', 'Plan first.')),
        Q(B('DuckDB بيسمح بـ:', 'DuckDB lets you:'), [['SQL مباشرة على CSV وParquet', 'run SQL directly on CSV and Parquet'], ['تشغيل سيرفر ويب', 'run a web server'], ['رسم صور', 'draw images']], 0, B('من غير سيرفر.', 'No server.')),
        Q(B('Parquet مقابل CSV:', 'Parquet versus CSV:'), [['أصغر وأسرع للتحليل', 'smaller and faster for analysis'], ['مقروء أكتر للإنسان', 'more human-readable'], ['نفس الشيء', 'the same']], 0, B('أعمدة مضغوطة.', 'Compressed columns.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تحليل بيانات سريع ودقيق بالأداة المناسبة.', 'Fast, accurate data analysis with the right tool.'),
      review: [
        B('merge بـ validate وindicator وasserts لعدد الصفوف.', 'Merges with validate, indicator and row-count asserts.'),
        B('long/wide وmelt وpivot_table والتجميع بأسماء وtransform.', 'Long/wide, melt, pivot_table, named aggregation and transform.'),
        B('العمليات المتجهة والـ categorical والقراءة بأجزاء.', 'Vectorised operations, categoricals and reading in chunks.'),
        B('السلاسل الزمنية: resample وrolling والأيام الناقصة والتوقيت.', 'Time series: resample, rolling, missing days and time zones.'),
        B('Polars lazy وDuckDB وParquet.', 'Polars lazy, DuckDB and Parquet.')
      ],
      project: B('ابني «محرك تقارير مبيعات»: بيانات وهمية لسنة (مليون صف)، دمج آمن بالعملاء والمنتجات، تقارير (pivot، تجميع شهري، متوسط متحرك، العملاء الخاملين)، تحسين أداء موثّق، ونسخة DuckDB أو Polars للمقارنة — وتصدير XLSX وParquet.', 'Build a «sales report engine»: a year of fake data (one million rows), safe merges with customers and products, reports (a pivot, a monthly aggregation, a moving average, inactive customers), documented performance tuning, and a DuckDB or Polars version for comparison — exporting XLSX and Parquet.'),
      test: [
        Q(B('validate في merge بيمنع:', 'validate in merge prevents:'), [['تضاعف صامت للصفوف', 'silent row multiplication'], ['الدمج', 'merging'], ['القراءة', 'reading']], 0, B('مفاتيح متكررة.', 'Duplicate keys.')),
        Q(B('indicator=True بيضيف:', 'indicator=True adds:'), [['_merge', '_merge'], ['index', 'an index'], ['total', 'a total']], 0, B('مصدر الصف.', 'The row’s source.')),
        Q(B('صف لكل (منتج، شهر):', 'A row per (product, month):'), [['long', 'long'], ['wide', 'wide'], ['pivot', 'pivot']], 0, B('طويل.', 'Long.')),
        Q(B('margins=True في pivot_table:', 'margins=True in pivot_table:'), [['يضيف إجماليات', 'adds totals'], ['يحذف أعمدة', 'removes columns'], ['يرتّب', 'sorts']], 0, B('All.', 'All.')),
        Q(B('apply على الصفوف:', 'apply over rows:'), [['بطيء مقارنة بالمتجه', 'slow compared with vectorised'], ['أسرع حاجة', 'the fastest'], ['ممنوع', 'forbidden']], 0, B('بايثون لكل صف.', 'Python per row.')),
        Q(B('categorical بيوفّر:', 'categorical saves:'), [['ذاكرة للنصوص المتكررة', 'memory for repeated text'], ['وقت الكتابة', 'typing time'], ['الأخطاء', 'errors']], 0, B('حتى 90%.', 'Up to 90%.')),
        Q(B('ملف 10GB على لابتوب:', 'A 10 GB file on a laptop:'), [['chunksize أو Polars lazy أو DuckDB', 'chunksize, Polars lazy or DuckDB'], ['read_csv عادي', 'a plain read_csv'], ['Excel', 'Excel']], 0, B('من غير تحميل كامل.', 'Without loading it all.')),
        Q(B('pct_change(7) على بيانات يومية:', 'pct_change(7) on daily data:'), [['مقارنة بنفس اليوم الأسبوع اللي فات', 'comparison with the same day last week'], ['متوسط الأسبوع', 'the weekly average'], ['مجموع', 'a sum']], 0, B('أسبوعي.', 'Weekly.')),
        Q(B('الوقت يتخزّن:', 'Times are stored:'), [['UTC', 'in UTC'], ['بأي توقيت', 'in any zone'], ['نص', 'as text']], 0, B('ويتعرض محلي.', 'Displayed locally.')),
        Q(B('Polars expression مثال:', 'A Polars expression example:'), [['pl.col("total").sum()', 'pl.col("total").sum()'], ['df.apply()', 'df.apply()'], ['for row in df', 'for row in df']], 0, B('تعبير.', 'An expression.')),
        Q(B('explain() في Polars:', 'explain() in Polars:'), [['يعرض خطة الاستعلام', 'shows the query plan'], ['يشرح الكود', 'explains the code'], ['يطبع البيانات', 'prints the data']], 0, B('الخطة.', 'The plan.')),
        Q(B('DuckDB:', 'DuckDB is:'), [['SQL تحليلي من غير سيرفر', 'analytical SQL without a server'], ['خدمة سحابية بس', 'a cloud service only'], ['مكتبة رسم', 'a plotting library']], 0, B('in-process.', 'In-process.'))
      ] }
  ]
};
