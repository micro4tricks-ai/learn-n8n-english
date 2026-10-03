// Python week 32 — Data quality, validation and the month project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('جودة البيانات والتحقق ومشروع الشهر', 'Data quality, validation and the month project'),
  goal: B('تثق في أرقامك: تقيس جودة البيانات بأبعادها، وتتحقق بقواعد مكتوبة، وتتفق مع مصادر البيانات على عقد، وتكتشف القيم الشاذة، وتعزل الصفوف البايظة وتطلع تقرير جودة.',
          'Trust your numbers: measure data quality across its dimensions, validate with written rules, agree on a contract with data sources, detect anomalies, isolate bad rows and publish a quality report.'),
  days: [
    { title: B('أبعاد الجودة', 'The dimensions of quality'),
      goal: B('تقيس جودة جدول بأرقام مش بإحساس.', 'Measure a table’s quality with numbers, not feelings.'),
      learn: [
        L(B('ستة أبعاد', 'Six dimensions'),
          B('**completeness** (كام قيمة ناقصة)، **validity** (القيم في الشكل والمدى الصح)، **uniqueness** (مفيش تكرار)، **consistency** (نفس الحاجة بنفس الشكل في كل مكان)، **timeliness/freshness** (البيانات حديثة)، والدقة (مطابقة للواقع). كل بُعد ليه رقم يتقاس.', '**Completeness** (how many values are missing), **validity** (values in the right form and range), **uniqueness** (no duplicates), **consistency** (the same thing written the same way everywhere), **timeliness/freshness** (the data is recent), and accuracy (matching reality). Each dimension has a measurable number.'),
          'completeness: phone filled in 92% of rows\nvalidity: 3% of totals are negative\nuniqueness: 41 duplicate order ids\nfreshness: newest row is 26 hours old'),
        L(B('قياسها بـ pandas', 'Measuring them with pandas'),
          B('كل بُعد سطر أو اتنين: `isna().mean()` للنقص، شرط للصحة، `duplicated()` للتكرار، `max()` للحداثة. اطلعهم في جدول واحد = صورة جودة الجدول.', 'Each dimension is a line or two: `isna().mean()` for missing values, a condition for validity, `duplicated()` for duplicates, `max()` for freshness. Put them in one table = a picture of the table’s quality.'),
          'import pandas as pd\ndf = pd.DataFrame({"id": [1, 2, 2, 4, 5], "phone": ["010", None, "011", None, "012"], "total": [300, -5, 120, 90, 4000], "created": pd.to_datetime(["2026-10-01", "2026-10-02", "2026-10-02", "2026-10-02", "2026-10-03"])})\nreport = {\n    "phone_completeness": round(float(1 - df["phone"].isna().mean()), 2),\n    "total_validity": round(float((df["total"] >= 0).mean()), 2),\n    "id_uniqueness": round(float(1 - df["id"].duplicated().mean()), 2),\n    "newest_row": str(df["created"].max().date()),\n}\nprint(report)', R),
        L(B('الحدود المقبولة', 'Acceptable limits'),
          B('مفيش بيانات مثالية. اتفق على **threshold check** لكل بُعد: «الموبايل مكتمل 95%+»، «صفر id مكرر»، «أحدث صف أقل من 26 ساعة». الأرقام دي بتبقى اختبارات بتشتغل مع كل تحميل.', 'No data is perfect. Agree a **threshold check** per dimension: «phone 95%+ complete», «zero duplicate ids», «newest row under 26 hours old». These numbers become tests that run with every load.'),
          'THRESHOLDS = {"phone_completeness": 0.95, "total_validity": 1.0, "id_uniqueness": 1.0}\nfailed = {k: v for k, v in report.items() if k in THRESHOLDS and v < THRESHOLDS[k]}', T)
      ],
      practice: [
        B('قيس الأبعاد الستة لجدول حقيقي عندك.', 'Measure the six dimensions for one of your real tables.'),
        B('اكتب حدود مقبولة لكل بُعد مع صاحب البيانات.', 'Write acceptable limits for each dimension with the data owner.'),
        B('اعمل دالة quality_report(df) ترجّع dict.', 'Write a quality_report(df) function returning a dict.'),
        B('قارن التقرير بين يومين.', 'Compare the report between two days.')
      ],
      words: [
        W('data quality', 'مدى صلاحية البيانات للاستخدام', 'how fit data is for its use', 'Data quality dropped after the import.'),
        W('completeness', 'نسبة القيم الموجودة مش الناقصة', 'the share of values present, not missing', 'Phone completeness is 92%.'),
        W('validity', 'إن القيم في الشكل والمدى الصح', 'values being in the right form and range', 'Validity checks catch negative totals.'),
        W('freshness', 'حداثة البيانات', 'how recent the data is', 'Freshness: the newest row is 2 hours old.'),
        W('threshold check', 'فحص قيمة مقابل حد مقبول', 'checking a value against an acceptable limit', 'The threshold check failed for phones.')
      ],
      read: ['lib:Python for Data Analysis, 3E', { lib: 'pandas: Getting started', what: B('اقرا «Working with missing data».', 'Read «Working with missing data».') }],
      challenge: B('اعمل `quality_report(df)` لجدول طلبات (6 أبعاد)، مع حدود مقبولة، وخلّيه يشتغل بعد كل تحميل في خط الأسبوع اللي فات ويوقف الخط لو بُعد مهم فشل.', 'Write `quality_report(df)` for an orders table (6 dimensions) with acceptable limits, and run it after every load in last week’s pipeline, stopping the pipeline if an important dimension fails.'),
      quiz: [
        Q(B('نسبة القيم الناقصة بتقيس:', 'The share of missing values measures:'), [['completeness', 'completeness'], ['uniqueness', 'uniqueness'], ['freshness', 'freshness']], 0, B('اكتمال.', 'Completeness.')),
        Q(B('أحدث صف عمره 3 أيام في خط يومي:', 'The newest row is 3 days old in a daily pipeline:'), [['مشكلة freshness', 'a freshness problem'], ['طبيعي', 'normal'], ['validity', 'validity']], 0, B('مش حديثة.', 'Not recent.')),
        Q(B('الحدود المقبولة بيتفق عليها:', 'Acceptable limits are agreed:'), [['مع صاحب البيانات', 'with the data owner'], ['عشوائي', 'at random'], ['100% لكل حاجة', 'at 100% for everything']], 0, B('واقعية.', 'Realistic.'))
      ] },

    { title: B('قواعد التحقق', 'Validation rules'),
      goal: B('تكتب قواعد صريحة للبيانات وتشغّلها آليًا.', 'Write explicit rules for data and run them automatically.'),
      learn: [
        L(B('expectations', 'Expectations'),
          B('**expectation** = جملة عن البيانات لازم تبقى صح: «id مش فاضي وفريد»، «total بين 0 و100,000»، «status من القايمة». اكتبهم كبيانات (قايمة قواعد) مش كود مبعثر — كده تقراهم وتطبعهم كتقرير.', 'An **expectation** = a statement about the data that must hold: «id is not empty and unique», «total between 0 and 100,000», «status from the list». Write them as data (a list of rules), not scattered code — so you can read and print them as a report.'),
          'import pandas as pd\ndf = pd.DataFrame({"id": [1, 2, 2], "total": [300, -5, 120], "status": ["paid", "new", "payed"]})\nrules = [\n    ("id is unique", lambda d: ~d["id"].duplicated(keep=False)),\n    ("total in 0..100000", lambda d: d["total"].between(0, 100_000)),\n    ("status allowed", lambda d: d["status"].isin(["new", "paid", "shipped"])),\n]\nfor name, check in rules:\n    ok = check(df)\n    print(f"{name:<20} {\'PASS\' if ok.all() else \'FAIL\'}  bad rows: {df.index[~ok].tolist()}")', R),
        L(B('schema للـ DataFrame', 'A DataFrame schema'),
          B('مكتبات زي **pandera** بتخليك تعرّف schema للـ DataFrame: أعمدة بأنواع وقيود، وتتحقق بسطر. مناسب لما القواعد تكتر. الفكرة نفسها اللي عملتها يدوي فوق، بس منظمة وبرسائل جاهزة.', 'Libraries like **pandera** let you define a schema for a DataFrame: columns with types and constraints, validated in one line. Useful when rules grow. The same idea you built by hand above, but organised with ready messages.'),
          'import pandera.pandas as pa\nschema = pa.DataFrameSchema({\n    "id": pa.Column(int, unique=True),\n    "total": pa.Column(float, pa.Check.in_range(0, 100_000)),\n    "status": pa.Column(str, pa.Check.isin(["new", "paid", "shipped"])),\n})\nschema.validate(df, lazy=True)   # lazy: report every failure, not just the first', T),
        L(B('اتحقق فين', 'Where to validate'),
          B('اتحقق في 3 أماكن: عند الاستلام (الشكل والأنواع — ارفض الملف لو بايظ كله)، بعد التحويل (القواعد بتاعة البيزنس)، وقبل النشر/التقرير (الأرقام منطقية؟). كل مرحلة بتمسك نوع أخطاء مختلف.', 'Validate in 3 places: on receipt (shape and types — reject the file if it is broken as a whole), after transformation (business rules), and before publishing/reporting (are the numbers sensible?). Each stage catches a different kind of mistake.'),
          'receive → schema check (columns, types) → transform → business rules → report sanity (totals vs yesterday)', T)
      ],
      practice: [
        B('اكتب 8 expectations لجدول طلبات كقايمة قواعد.', 'Write 8 expectations for an orders table as a list of rules.'),
        B('اطبع تقرير PASS/FAIL مع الصفوف البايظة.', 'Print a PASS/FAIL report with the bad rows.'),
        B('لو pandera متاحة: حوّل القواعد لـ schema.', 'If pandera is available: turn the rules into a schema.'),
        B('حدد الأماكن التلاتة في خطك.', 'Mark the three places in your pipeline.')
      ],
      words: [
        W('expectation', 'قاعدة مكتوبة لازم البيانات تحققها', 'a written rule the data must satisfy', 'The uniqueness expectation failed.'),
        W('pandera', 'مكتبة للتحقق من DataFrames بـ schema', 'a library for validating DataFrames with a schema', 'pandera reports every failing row.'),
        W('schema check', 'فحص الأعمدة والأنواع', 'checking the columns and types', 'The schema check rejected the file.'),
        W('lazy validation', 'تحقق بيجمع كل الأخطاء مش بس أولها', 'validation collecting every error, not just the first', 'Use lazy validation for a full report.'),
        W('plausibility check', 'فحص إن الأرقام معقولة', 'a check that numbers are believable', 'The plausibility check compares with yesterday.')
      ],
      read: [{ t: 'pandera documentation', url: 'https://pandera.readthedocs.io/en/stable/', what: B('اقرا Quick start.', 'Read the quick start.') }, 'lib:Pydantic documentation'],
      challenge: B('ابني «مكتبة قواعد» لجدول الطلبات: 10 expectations كبيانات، تقرير PASS/FAIL بالصفوف، وتشغيل في الأماكن التلاتة في الخط — والقواعد الحرجة بتوقف الخط.', 'Build a «rule book» for the orders table: 10 expectations as data, a PASS/FAIL report with rows, run at the three places in the pipeline — with critical rules stopping the pipeline.'),
      quiz: [
        Q(B('expectation:', 'An expectation is:'), [['قاعدة البيانات لازم تحققها', 'a rule the data must satisfy'], ['توقع للمبيعات', 'a sales forecast'], ['اختبار سرعة', 'a speed test']], 0, B('قاعدة.', 'A rule.')),
        Q(B('lazy=True في pandera:', 'lazy=True in pandera:'), [['يجمع كل الأخطاء', 'collects every error'], ['يوقف عند أول خطأ', 'stops at the first error'], ['يتجاهل الأخطاء', 'ignores errors']], 0, B('تقرير كامل.', 'A full report.')),
        Q(B('ملف أعمدته غلط كلها:', 'A file with all the wrong columns:'), [['يترفض عند الاستلام', 'is rejected on receipt'], ['يتحوّل عادي', 'is transformed normally'], ['يتنشر', 'is published']], 0, B('schema check.', 'Schema check.'))
      ] },

    { title: B('عقود البيانات', 'Data contracts'),
      goal: B('تتفق مع اللي بيبعتلك البيانات على شكلها، ومتتفاجئش.', 'Agree on the data’s shape with whoever sends it, and stop being surprised.'),
      learn: [
        L(B('العقد', 'The contract'),
          B('**data contract**: اتفاق مكتوب بين **producer** (اللي بيبعت: فريق، عميل، نظام) و**consumer** (انت): الأعمدة، الأنواع، القيم المسموحة، المعنى، الحداثة، ومين المسؤول. أغلب أعطال الخطوط سببها تغيير في المصدر محدش قال عليه.', 'A **data contract**: a written agreement between the **producer** (the sender: a team, a client, a system) and the **consumer** (you): the columns, types, allowed values, meaning, freshness, and who is responsible. Most pipeline failures come from a source change nobody announced.'),
          'contract: orders_daily v2\nowner: shop team · delivery: 02:00 Cairo daily · format: CSV UTF-8\nfields: id (int, unique) · total (decimal EGP ≥ 0) · status (new|paid|shipped)\nchanges: announced 2 weeks ahead; breaking changes → v3'),
        L(B('العقد ككود', 'The contract as code'),
          B('اكتب العقد كملف (JSON أو dataclass) بإصدار، والخط بيتحقق من كل ملف جاي عليه أول حاجة. لو المصدر غيّر عمود، الخط يقف برسالة واضحة «عمود total اختفى» بدل أرقام غلط في تقرير.', 'Write the contract as a file (JSON or a dataclass) with a version, and the pipeline checks every incoming file against it first. If the source changes a column, the pipeline stops with a clear message «column total disappeared» instead of wrong numbers in a report.'),
          'import csv, io\nCONTRACT = {"version": 2, "columns": {"id": int, "total": float, "status": str}, "status": {"new", "paid", "shipped"}}\nfile = io.StringIO("id,amount,status\\n1,300,paid\\n")\nheader = next(csv.reader(file))\nmissing = set(CONTRACT["columns"]) - set(header)\nextra = set(header) - set(CONTRACT["columns"])\nif missing or extra:\n    print(f"contract v{CONTRACT[\'version\']} broken — missing: {sorted(missing)}, unexpected: {sorted(extra)}")', R),
        L(B('تطوير العقد', 'Evolving the contract'),
          B('تغيير **غير كاسر** (عمود جديد اختياري) ← نفس الإصدار أو minor. تغيير **كاسر** (حذف عمود، تغيير معنى أو نوع) ← **contract version** جديد وفترة الاتنين شغالين مع بعض. نفس منطق الـ APIs والحزم.', 'A **non-breaking** change (a new optional column) → the same version or a minor. A **breaking** change (removing a column, changing a meaning or type) → a new **contract version** and a period where both run side by side. The same logic as APIs and packages.'),
          'v2 → v2.1: add optional "channel" column (consumers ignore it)\nv2 → v3: "total" now includes VAT (breaking: meaning changed) → run v2 and v3 for a month', T)
      ],
      practice: [
        B('اكتب عقد بيانات لمصدر بتستقبل منه بيانات.', 'Write a data contract for a source you receive data from.'),
        B('حوّله لملف وتحقق منه في أول الخط.', 'Turn it into a file and check it at the start of the pipeline.'),
        B('جرّب ملف عمود اسمه اتغيّر.', 'Try a file with a renamed column.'),
        B('صنّف 5 تغييرات: كاسرة ولا لأ.', 'Classify 5 changes: breaking or not.')
      ],
      words: [
        W('data contract', 'اتفاق مكتوب على شكل ومعنى البيانات', 'a written agreement on data shape and meaning', 'The data contract lists every column.'),
        W('producer', 'الطرف اللي بيبعت البيانات', 'the party sending the data', 'The producer changed the file format.'),
        W('consumer', 'الطرف اللي بيستخدم البيانات', 'the party using the data', 'We are the consumer of the shop export.'),
        W('contract version', 'رقم إصدار العقد', 'the version number of a contract', 'Breaking changes need a new contract version.'),
        W('schema drift', 'تغيّر شكل البيانات من غير إعلان', 'data shape changing without notice', 'The contract check caught schema drift.')
      ],
      read: [{ t: 'Data Contract Specification', url: 'https://datacontract.com/', what: B('شوف شكل عقد بيانات مكتوب.', 'Look at what a written data contract looks like.') }],
      challenge: B('اكتب عقد بيانات v1 لمصدر الطلبات، حوّله لملف، خلّي الخط يتحقق منه، وجرّب 3 أنواع schema drift (عمود ناقص، نوع اتغير، قيمة جديدة في الحالة).', 'Write a v1 data contract for the orders source, turn it into a file, make the pipeline check it, and try 3 kinds of schema drift (a missing column, a changed type, a new status value).'),
      quiz: [
        Q(B('سبب شائع لأعطال الخطوط:', 'A common cause of pipeline failures:'), [['تغيير في المصدر محدش أعلن عنه', 'an unannounced source change'], ['السيرفر جديد', 'a new server'], ['الخط سريع', 'a fast pipeline']], 0, B('schema drift.', 'Schema drift.')),
        Q(B('معنى عمود اتغيّر (total بقى شامل الضريبة):', 'A column’s meaning changed (total now includes VAT):'), [['تغيير كاسر', 'a breaking change'], ['مش مهم', 'unimportant'], ['minor', 'minor']], 0, B('إصدار جديد.', 'A new version.')),
        Q(B('العقد ككود بيخلي الخط:', 'The contract as code makes the pipeline:'), [['يقف برسالة واضحة', 'stop with a clear message'], ['يكمّل بأرقام غلط', 'continue with wrong numbers'], ['أبطأ بس', 'just slower']], 0, B('بدري.', 'Early.'))
      ] },

    { title: B('القيم الشاذة', 'Anomalies'),
      goal: B('تكتشف القيم والأيام الغريبة آليًا.', 'Detect unusual values and days automatically.'),
      learn: [
        L(B('IQR للقيم', 'IQR for values'),
          B('طريقة **IQR**: المدى بين الربع الأول والتالت؛ أي قيمة أبعد من 1.5×IQR برّه تبقى شاذة. أقوى من المتوسط لأن القيم الشاذة نفسها مبتأثرش عليه كتير. مفيد لأسعار وطلبات غريبة.', 'The **IQR** method: the range between the first and third quartiles; any value more than 1.5×IQR outside it is unusual. Sturdier than the mean, because the outliers themselves barely affect it. Useful for odd prices and orders.'),
          'import pandas as pd\ntotals = pd.Series([120, 300, 90, 250, 180, 210, 4000, 160, 5, 230])\nq1, q3 = totals.quantile([0.25, 0.75])\niqr = q3 - q1\nlow, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr\nprint(f"normal range {low:.0f}..{high:.0f}; unusual:", totals[(totals < low) | (totals > high)].tolist())', R),
        L(B('z-score للأيام', 'z-score for days'),
          B('**z-score** = (القيمة − المتوسط) ÷ الانحراف المعياري. عدد طلبات يوم z-score بتاعه أكبر من 3 أو أقل من −3 = يوم غريب (إعلان نجح؟ عطل؟). احسبه على آخر 30 يوم بس عشان الموسمية.', 'A **z-score** = (value − mean) ÷ standard deviation. A day whose order count has a z-score above 3 or below −3 is unusual (a successful ad? an outage?). Compute it over the last 30 days only, because of seasonality.'),
          'import pandas as pd, numpy as np\nrng = np.random.default_rng(5)\ndays = pd.Series(rng.normal(200, 15, 30).round(), index=pd.date_range("2026-09-04", periods=30))\ndays.iloc[-1] = 40   # today looks broken\nz = (days - days.mean()) / days.std()\nprint(days[abs(z) > 3])', R),
        L(B('شاذ مش يعني غلط', 'Unusual is not wrong'),
          B('القيمة الشاذة ممكن تكون حقيقية (طلب جملة كبير، عرض رمضان). متمسحهاش أوتوماتيك: علّمها وابعتها لمراجعة، والمراجع يقرر «حقيقية» أو «غلط». ومع الوقت اتعلم من القرارات.', 'An unusual value may be real (a big wholesale order, a Ramadan offer). Do not delete it automatically: flag it and send it for review, and the reviewer decides «real» or «error». Over time, learn from the decisions.'),
          'flag: order 9921 total 40,000 (z = 6.2) → review → "real: wholesale client" → keep', T)
      ],
      practice: [
        B('طبّق IQR على أسعار طلبات حقيقية أو وهمية.', 'Apply IQR to real or fake order prices.'),
        B('احسب z-score لعدد الطلبات اليومي لـ 60 يوم.', 'Compute the z-score of daily order counts over 60 days.'),
        B('اعمل عمود flag بدل الحذف.', 'Create a flag column instead of deleting.'),
        B('اكتب 3 أسباب ممكنة لقيمة شاذة حقيقية.', 'Write 3 possible reasons for a real unusual value.')
      ],
      words: [
        W('anomaly', 'حاجة غريبة عن النمط المعتاد', 'something unusual compared with the normal pattern', 'Today’s order count is an anomaly.'),
        W('iqr', 'المدى بين الربع الأول والتالت', 'the range between the first and third quartiles', 'Use the IQR to find unusual prices.'),
        W('z-score', 'بُعد القيمة عن المتوسط بوحدات الانحراف', 'how far a value is from the mean in standard deviations', 'A z-score of 6 is very unusual.'),
        W('quartile', 'نقطة بتقسم البيانات المرتبة لأرباع', 'a point dividing sorted data into quarters', 'The first quartile is 150.'),
        W('review flag', 'علامة على صف محتاج مراجعة', 'a marker on a row that needs review', 'Set a review flag instead of deleting it.')
      ],
      read: ['lib:Python Data Science Handbook', { lib: 'Kaggle Learn', what: B('دوّر على درس عن البيانات الناقصة والشاذة.', 'Find a lesson on missing and unusual data.') }],
      challenge: B('ضيف للخط فحص شذوذ: IQR للأسعار، z-score لعدد الطلبات اليومي، عمود flag، ورسالة مراجعة بالصفوف الغريبة — ومن غير حذف أوتوماتيك.', 'Add anomaly checks to the pipeline: IQR for prices, z-score for daily order counts, a flag column, and a review message listing the unusual rows — with no automatic deletion.'),
      quiz: [
        Q(B('ميزة IQR عن المتوسط:', 'IQR’s advantage over the mean:'), [['القيم الشاذة مش بتأثر عليه كتير', 'outliers barely affect it'], ['أسرع', 'faster'], ['أسهل في الكتابة', 'easier to type']], 0, B('أقوى.', 'Sturdier.')),
        Q(B('z-score = 5:', 'A z-score of 5:'), [['بعيد جدًا عن المتوسط', 'very far from the mean'], ['طبيعي', 'normal'], ['صفر', 'zero']], 0, B('غريب.', 'Unusual.')),
        Q(B('قيمة شاذة:', 'An unusual value:'), [['تتعلّم وتتراجع', 'is flagged and reviewed'], ['تتمسح فورًا', 'is deleted at once'], ['تتجاهل', 'is ignored']], 0, B('ممكن حقيقية.', 'It may be real.'))
      ] },

    { title: B('العزل وتقرير الجودة', 'Quarantine and the quality report'),
      goal: B('الصفوف البايظة متوقفش الخط ولا تضيع، والكل شايف الجودة.', 'Bad rows neither stop the pipeline nor get lost, and everyone sees the quality.'),
      learn: [
        L(B('جدول العزل', 'The quarantine table'),
          B('الصف اللي فشل قاعدة غير حرجة يروح **quarantine** (جدول `quarantine_orders` بالصف الخام وسبب الرفض والوقت)، والباقي يكمّل. القواعد الحرجة (الملف كله غلط) بتوقف الخط. ده نفس فكرة الـ dead letter في n8n.', 'A row failing a non-critical rule goes to **quarantine** (a `quarantine_orders` table with the raw row, the reason and the time), and the rest continues. Critical rules (the whole file is wrong) stop the pipeline. The same idea as the dead letter in n8n.'),
          'import pandas as pd\ndf = pd.DataFrame({"id": [1, 2, 3], "total": [300, -5, 120], "status": ["paid", "new", "payed"]})\nreasons = pd.Series("", index=df.index)\nreasons[df["total"] < 0] += "negative total; "\nreasons[~df["status"].isin(["new", "paid", "shipped"])] += "unknown status; "\nbad = reasons != ""\nquarantine = df[bad].assign(reason=reasons[bad].str.rstrip("; "))\nprint("loaded:", df[~bad]["id"].tolist())\nprint(quarantine)', R),
        L(B('تقرير الجودة', 'The quality report'),
          B('**quality report** يومي قصير: الأبعاد الستة بأرقامها مقابل الحدود، عدد المعزول وأشهر أسبابه، القيم الشاذة، والاتجاه عن الأسبوع اللي فات. يتبعت لصاحب البيانات (**data owner**) مش بس للمبرمج.', 'A short daily **quality report**: the six dimensions with their numbers against the limits, the quarantined count and top reasons, the unusual values, and the trend versus last week. It goes to the **data owner**, not only the developer.'),
          'Orders quality · 2026-10-03\ncompleteness phone 96% ✓ (≥95) · duplicates 0 ✓ · freshness 3h ✓\nquarantined 22 (negative total 15, unknown status 7) · anomalies: 1 day (z = -4.1)'),
        L(B('صاحب البيانات', 'The data owner'),
          B('كل جدول ليه **data owner** (شخص من البيزنس مش بس IT) بيرد على «القيمة دي صح؟» ويصلّح في المصدر. الجودة مسؤولية مشتركة: الخط بيكشف، وصاحب البيانات بيصلّح الأصل عشان المشكلة متتكررش.', 'Every table has a **data owner** (a business person, not just IT) who answers «is this value right?» and fixes things at the source. Quality is shared: the pipeline detects, and the data owner fixes the origin so the problem does not repeat.'),
          'quarantine review: owner fixes 15 negative totals in the shop admin → replay those rows', T)
      ],
      practice: [
        B('اعمل جدول quarantine بالسبب والوقت.', 'Create a quarantine table with the reason and time.'),
        B('افصل القواعد الحرجة عن غير الحرجة.', 'Separate critical from non-critical rules.'),
        B('اكتب تقرير جودة يومي في 6 سطور.', 'Write a 6-line daily quality report.'),
        B('حدد data owner لكل جدول عندك.', 'Name a data owner for each of your tables.')
      ],
      words: [
        W('quarantine', 'عزل الصفوف البايظة بعيد عن الباقي', 'isolating bad rows away from the rest', 'Rows with negative totals go to quarantine.'),
        W('quality report', 'تقرير بأرقام جودة البيانات', 'a report of data quality numbers', 'Send the quality report every morning.'),
        W('data owner', 'المسؤول من البيزنس عن البيانات', 'the business person responsible for the data', 'The data owner fixed the source.'),
        W('critical rule', 'قاعدة فشلها بيوقف الخط', 'a rule whose failure stops the pipeline', 'A missing id column is a critical rule.'),
        W('replay rows', 'إعادة معالجة صفوف بعد إصلاحها', 'reprocessing rows after fixing them', 'Replay rows from quarantine after the fix.')
      ],
      read: ['lib:logging HOWTO', { lib: 'Architecture Patterns with Python', what: B('اقرا عن الفصل بين الطبقات والأخطاء.', 'Read about separating layers and errors.') }],
      challenge: B('اكمل خطك: عزل الصفوف البايظة بالسبب، قواعد حرجة بتوقف، تقرير جودة يومي لصاحب البيانات، وإعادة معالجة المعزول بعد الإصلاح.', 'Complete your pipeline: quarantine bad rows with a reason, critical rules that stop it, a daily quality report for the data owner, and replaying quarantined rows after a fix.'),
      quiz: [
        Q(B('صف فيه حالة غريبة (قاعدة غير حرجة):', 'A row with an odd status (a non-critical rule):'), [['quarantine والباقي يكمّل', 'quarantine it; the rest continue'], ['وقّف الخط', 'stop the pipeline'], ['امسحه', 'delete it']], 0, B('عزل.', 'Isolate.')),
        Q(B('تقرير الجودة يتبعت لـ:', 'The quality report goes to:'), [['صاحب البيانات كمان', 'the data owner too'], ['المبرمج بس', 'only the developer'], ['محدش', 'nobody']], 0, B('مسؤولية مشتركة.', 'Shared responsibility.')),
        Q(B('ملف من غير عمود id:', 'A file without an id column:'), [['قاعدة حرجة: وقّف', 'a critical rule: stop'], ['عزل صف صف', 'quarantine row by row'], ['تجاهل', 'ignore']], 0, B('الملف كله غلط.', 'The whole file is wrong.'))
      ] },

    { title: B('مراجعة الشهر الثامن ومشروعه', 'Month 8 review and project'),
      goal: B('هندسة بيانات من المصدر للتقرير بجودة موثوقة.', 'Data engineering from source to report with trustworthy quality.'),
      review: [
        B('pandas المتقدم وPolars وDuckDB (أسبوع 29).', 'Advanced pandas, Polars and DuckDB (week 29).'),
        B('PostgreSQL وSQLAlchemy وAlembic والأداء (أسبوع 30).', 'PostgreSQL, SQLAlchemy, Alembic and performance (week 30).'),
        B('خطوط ETL والتحميل التدريجي والجدولة والمراقبة (أسبوع 31).', 'ETL pipelines, incremental loading, scheduling and monitoring (week 31).'),
        B('أبعاد الجودة والقواعد والعقود.', 'Quality dimensions, rules and contracts.'),
        B('القيم الشاذة والعزل وتقرير الجودة.', 'Anomalies, quarantine and the quality report.')
      ],
      project: B('مشروع الشهر الثامن: «منصة بيانات صغيرة» لمتجر: خط يومي (API أو CSV) بعقد بيانات، خام محفوظ، transform نقي باختبارات، upsert في Postgres بـ Alembic، 10 قواعد جودة + عزل، فحص شذوذ، جدول runs وتنبيهات، تقرير مبيعات (pandas أو DuckDB) وتقرير جودة يومي — كله بـ README ورسمة.', 'Month 8 project: a «small data platform» for a shop: a daily pipeline (API or CSV) with a data contract, saved raw data, a pure tested transform, upserts into Postgres with Alembic, 10 quality rules + quarantine, anomaly checks, a runs table and alerts, a sales report (pandas or DuckDB) and a daily quality report — all with a README and a diagram.'),
      test: [
        Q(B('merge validate بيكشف:', 'merge validate detects:'), [['مفاتيح متكررة', 'duplicated keys'], ['أعمدة ناقصة', 'missing columns'], ['قيم سالبة', 'negative values']], 0, B('تضاعف.', 'Multiplication.')),
        Q(B('ملف أكبر من الذاكرة:', 'A file bigger than memory:'), [['chunksize أو Polars lazy أو DuckDB', 'chunksize, Polars lazy or DuckDB'], ['pandas عادي', 'plain pandas'], ['Excel', 'Excel']], 0, B('أجزاء.', 'Pieces.')),
        Q(B('الفلوس في Postgres:', 'Money in Postgres:'), [['numeric', 'numeric'], ['float', 'float'], ['text', 'text']], 0, B('دقيق.', 'Exact.')),
        Q(B('عمود إجباري جديد على جدول ضخم:', 'A new required column on a huge table:'), [['nullable ثم backfill ثم NOT NULL', 'nullable, backfill, then NOT NULL'], ['NOT NULL فورًا', 'NOT NULL at once'], ['جدول جديد', 'a new table']], 0, B('آمن.', 'Safe.')),
        Q(B('incremental load:', 'An incremental load:'), [['الجديد من آخر نجاح', 'what is new since the last success'], ['كل حاجة كل مرة', 'everything every time'], ['يدوي', 'manual']], 0, B('أسرع.', 'Faster.')),
        Q(B('rerun يوم في خط idempotent:', 'Rerunning a day in an idempotent pipeline:'), [['آمن', 'safe'], ['بيكرر', 'duplicates'], ['ممنوع', 'forbidden']], 0, B('upsert.', 'Upsert.')),
        Q(B('completeness:', 'Completeness:'), [['نسبة القيم الموجودة', 'the share of values present'], ['السرعة', 'speed'], ['الحجم', 'size']], 0, B('اكتمال.', 'Completeness.')),
        Q(B('lazy validation:', 'Lazy validation:'), [['تجمع كل الأخطاء', 'collects every error'], ['كسلانة ومبتفحصش', 'skips checking'], ['أول خطأ بس', 'only the first error']], 0, B('تقرير كامل.', 'A full report.')),
        Q(B('data contract بين:', 'A data contract is between:'), [['producer وconsumer', 'producer and consumer'], ['مبرمجين بس', 'only developers'], ['السيرفر والعميل', 'server and browser']], 0, B('اتفاق.', 'An agreement.')),
        Q(B('schema drift:', 'Schema drift:'), [['تغيّر شكل البيانات من غير إعلان', 'the data shape changing without notice'], ['نقل السيرفر', 'moving servers'], ['نسخة احتياطية', 'a backup']], 0, B('عقد بيمسكه.', 'The contract catches it.')),
        Q(B('z-score عالي جدًا:', 'A very high z-score:'), [['قيمة بعيدة عن المتوسط', 'a value far from the mean'], ['قيمة ناقصة', 'a missing value'], ['قيمة مكررة', 'a duplicate']], 0, B('شاذ.', 'Unusual.')),
        Q(B('الصف المعزول:', 'A quarantined row:'), [['محفوظ بسببه لحد الإصلاح', 'kept with its reason until fixed'], ['اتمسح', 'deleted'], ['اتحمّل عادي', 'loaded anyway']], 0, B('dead letter.', 'A dead letter.'))
      ] }
  ]
};
