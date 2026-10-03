// Python week 30 — PostgreSQL, SQLAlchemy and migrations.
// sqlite3 examples run everywhere; PostgreSQL, SQLAlchemy and Alembic examples are display-only.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('PostgreSQL وSQLAlchemy والـ migrations', 'PostgreSQL, SQLAlchemy and migrations'),
  goal: B('تشتغل مع PostgreSQL من بايثون بطريقة إنتاج: اتصالات آمنة ومجمّعة، تصميم جداول بقيود وأنواع صح، SQLAlchemy 2.0، تغييرات الجداول بـ Alembic من غير توقف، وأداء بالفهارس وEXPLAIN.',
          'Work with PostgreSQL from Python in a production way: safe pooled connections, table design with the right constraints and types, SQLAlchemy 2.0, schema changes with Alembic without downtime, and performance with indexes and EXPLAIN.'),
  days: [
    { title: B('PostgreSQL من بايثون', 'PostgreSQL from Python'),
      goal: B('تتصل وتستعلم بأمان وبكفاءة.', 'Connect and query safely and efficiently.'),
      learn: [
        L(B('psycopg 3', 'psycopg 3'),
          B('**psycopg** هو الـ driver الأشهر لـ PostgreSQL. الاتصال بـ `with psycopg.connect(DSN) as conn:` والـ DSN من `.env`. والقيم **دايمًا** بـ placeholders `%s` — عمرك ما تعمل f-string جوه SQL.', '**psycopg** is the most popular PostgreSQL driver. Connect with `with psycopg.connect(DSN) as conn:` with the DSN from `.env`. Values **always** go through `%s` placeholders — never build SQL with an f-string.'),
          'import os, psycopg\n\nwith psycopg.connect(os.environ["DATABASE_URL"]) as conn:\n    with conn.cursor() as cur:\n        cur.execute("SELECT id, total FROM orders WHERE city = %s AND total > %s", ("Giza", 100))\n        for order_id, total in cur:\n            print(order_id, total)\n# the with-block commits on success and rolls back on error', T),
        L(B('الاستعلام المعامَل', 'The parameterised query'),
          B('**parameterized query**: الـ driver بيبعت القيم لوحدها، فمستحيل نص زي `\'; DROP TABLE orders; --` يتنفّذ كأمر. نفس الفكرة في sqlite3 بـ `?` — المثال ده بيشتغل عندك ويوري الفرق.', 'A **parameterised query**: the driver sends values separately, so text like `\'; DROP TABLE orders; --` can never run as a command. The same idea in sqlite3 uses `?` — this example runs and shows the difference.'),
          'import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE users (name TEXT)")\ndb.executemany("INSERT INTO users VALUES (?)", [("sara",), ("omar",)])\nevil = "x\' OR \'1\'=\'1"\nunsafe = f"SELECT count(*) FROM users WHERE name = \'{evil}\'"\nprint("unsafe f-string finds:", db.execute(unsafe).fetchone()[0], "rows")\nprint("parameterised finds:", db.execute("SELECT count(*) FROM users WHERE name = ?", (evil,)).fetchone()[0], "rows")', R),
        L(B('connection pool', 'The connection pool'),
          B('فتح اتصال جديد لكل طلب بطيء ومكلف للسيرفر. **connection pool** بيحتفظ بعدد اتصالات جاهزة ويعيد استخدامها (`psycopg_pool.ConnectionPool`، أو تلقائي في SQLAlchemy). حدد الحد الأقصى أقل من `max_connections` في Postgres.', 'Opening a new connection per request is slow and costly for the server. A **connection pool** keeps some ready connections and reuses them (`psycopg_pool.ConnectionPool`, or automatic in SQLAlchemy). Keep its maximum below Postgres’s `max_connections`.'),
          'from psycopg_pool import ConnectionPool\npool = ConnectionPool(os.environ["DATABASE_URL"], min_size=2, max_size=10)\nwith pool.connection() as conn:\n    conn.execute("SELECT 1")', T)
      ],
      practice: [
        B('شغّل Postgres في Docker واتصل بـ psycopg.', 'Run Postgres in Docker and connect with psycopg.'),
        B('شغّل مثال sqlite3 وشوف ليه الـ f-string خطر.', 'Run the sqlite3 example and see why the f-string is dangerous.'),
        B('دوّر في كودك على أي SQL بـ f-string وصلّحه.', 'Search your code for any SQL built with an f-string and fix it.'),
        B('اعمل connection pool وقيس الفرق في 200 استعلام.', 'Create a connection pool and measure the difference over 200 queries.')
      ],
      words: [
        W('psycopg', 'driver بايثون لـ PostgreSQL', 'the Python driver for PostgreSQL', 'Install psycopg[binary] for quick starts.'),
        W('parameterized query', 'استعلام القيم فيه بتتبعت منفصلة', 'a query whose values are sent separately', 'Always use a parameterized query.'),
        W('bind parameter', 'قيمة بتتربط بمكانها في الاستعلام', 'a value bound to its slot in a query', 'Each %s receives a bind parameter.'),
        W('connection pool', 'مجموعة اتصالات جاهزة بتتعاد', 'a set of ready connections that are reused', 'The connection pool holds ten connections.'),
        W('dsn', 'نص بيانات الاتصال بقاعدة البيانات', 'the text holding database connection details', 'Read the DSN from the environment.')
      ],
      read: [{ t: 'psycopg 3 documentation', url: 'https://www.psycopg.org/psycopg3/docs/basic/usage.html', what: B('اقرا Basic module usage.', 'Read Basic module usage.') }, 'lib:sqlite3 — DB-API interface'],
      challenge: B('اعمل Postgres في Docker، وسكربت بيستورد CSV طلبات بـ psycopg بـ parameterized queries داخل transaction واحدة، وجرّب CSV فيه سطر بايظ وشوف الـ rollback.', 'Run Postgres in Docker and write a script that imports a CSV of orders with psycopg using parameterised queries in one transaction, then try a CSV with a broken line and watch the rollback.'),
      quiz: [
        Q(B('SQL بـ f-string فيها مدخلات مستخدم:', 'SQL built with an f-string from user input:'), [['خطر SQL injection', 'an SQL injection risk'], ['أسرع', 'faster'], ['أوضح', 'clearer']], 0, B('placeholders.', 'Use placeholders.')),
        Q(B('placeholder في psycopg:', 'The placeholder in psycopg:'), [['%s', '%s'], ['{}', '{}'], ['$var', '$var']], 0, B('وفي sqlite ?', 'And ? in sqlite.')),
        Q(B('connection pool بيوفّر:', 'A connection pool saves:'), [['وقت فتح الاتصالات', 'connection opening time'], ['مساحة القرص', 'disk space'], ['الأمان', 'security']], 0, B('إعادة استخدام.', 'Reuse.'))
      ] },

    { title: B('تصميم الجداول', 'Designing tables'),
      goal: B('تخلّي قاعدة البيانات نفسها تمنع البيانات الغلط.', 'Make the database itself block bad data.'),
      learn: [
        L(B('الأنواع الصح', 'The right types'),
          B('فلوس: `numeric(12,2)` أو أصغر وحدة `bigint` — **مش** float. وقت: `timestamptz` (بيخزّن UTC ويحوّل). بيانات مرنة: `jsonb` (تقدر تبحث جواها). نصوص: `text` مع حد بـ CHECK لو محتاج.', 'Money: `numeric(12,2)` or the smallest unit in a `bigint` — **not** float. Time: `timestamptz` (stores UTC and converts). Flexible data: `jsonb` (searchable inside). Text: `text`, with a length CHECK if needed.'),
          'CREATE TABLE orders (\n  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  customer_id bigint NOT NULL REFERENCES customers(id),\n  total       numeric(12,2) NOT NULL CHECK (total >= 0),\n  status      text NOT NULL CHECK (status IN (\'new\', \'paid\', \'shipped\')),\n  meta        jsonb NOT NULL DEFAULT \'{}\',\n  created_at  timestamptz NOT NULL DEFAULT now()\n);', T),
        L(B('القيود', 'Constraints'),
          B('`NOT NULL`، `UNIQUE`، `CHECK`، و`REFERENCES` (**foreign key**) بتخلي قاعدة البيانات ترفض الغلط حتى لو الكود فيه bug أو حد عدّل يدوي. ده خط الدفاع الأخير. المثال بـ sqlite بيوري CHECK بيشتغل.', '`NOT NULL`, `UNIQUE`, `CHECK` and `REFERENCES` (a **foreign key**) make the database reject mistakes even if the code has a bug or someone edits by hand. This is the last line of defence. The sqlite example shows CHECK working.'),
          'import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE orders (id INTEGER PRIMARY KEY, total REAL NOT NULL CHECK (total >= 0), status TEXT NOT NULL CHECK (status IN (\'new\', \'paid\')))")\nfor row in [(300, "paid"), (-5, "paid"), (100, "payed")]:\n    try:\n        db.execute("INSERT INTO orders (total, status) VALUES (?, ?)", row)\n        print("ok", row)\n    except sqlite3.IntegrityError as e:\n        print("rejected", row, "→", e)', R),
        L(B('jsonb بحكمة', 'jsonb wisely'),
          B('`jsonb` مفيد للحاجات المتغيرة (رد webhook كامل، إعدادات). بس الحقول اللي بتبحث أو بتجمّع بيها كتير (الحالة، التاريخ، الإجمالي) خليها أعمدة عادية بقيود. وتقدر تعمل index على مفتاح جوه jsonb لو محتاج.', '`jsonb` is useful for changing things (a full webhook payload, settings). But fields you search or group by often (status, date, total) should be normal columns with constraints. You can index a key inside jsonb if needed.'),
          "SELECT id, meta->>'utm_source' AS source\nFROM orders\nWHERE meta @> '{\"channel\": \"whatsapp\"}';\nCREATE INDEX orders_meta_gin ON orders USING gin (meta);", T)
      ],
      practice: [
        B('صمّم جداول customers وorders وorder_lines بالأنواع والقيود.', 'Design customers, orders and order_lines tables with types and constraints.'),
        B('شغّل مثال CHECK وضيف قيد UNIQUE.', 'Run the CHECK example and add a UNIQUE constraint.'),
        B('خزّن رد webhook كامل في jsonb واستعلم منه.', 'Store a full webhook payload in jsonb and query it.'),
        B('جرّب تحط float للفلوس واحسب 0.1 + 0.2.', 'Try float for money and compute 0.1 + 0.2.')
      ],
      words: [
        W('timestamptz', 'نوع وقت بتوقيت في PostgreSQL', 'a time type with a time zone in PostgreSQL', 'Use timestamptz for created_at.'),
        W('jsonb', 'نوع JSON ثنائي قابل للبحث في PostgreSQL', 'a searchable binary JSON type in PostgreSQL', 'Store the raw payload in jsonb.'),
        W('numeric', 'نوع رقم عشري دقيق للفلوس', 'an exact decimal type for money', 'Totals are numeric(12,2).'),
        W('check constraint', 'شرط قاعدة البيانات بترفض بيه القيم الغلط', 'a database rule that rejects wrong values', 'A check constraint blocks negative totals.'),
        W('not null', 'قيد بيمنع القيمة الفاضية', 'a constraint forbidding empty values', 'total is NOT NULL.')
      ],
      read: [{ t: 'PostgreSQL: Constraints', url: 'https://www.postgresql.org/docs/current/ddl-constraints.html', what: B('اقرا CHECK وUNIQUE وforeign keys.', 'Read CHECK, UNIQUE and foreign keys.') }, 'lib:SQLBolt'],
      challenge: B('صمّم قاعدة بيانات طلبات صغيرة (4 جداول) بأنواع وقيود كاملة، واكتب سكربت يحاول يدخل 10 سجلات غلط بأنواع مختلفة ويطبع ليه كل واحد اترفض.', 'Design a small orders database (4 tables) with full types and constraints, and write a script that tries to insert 10 bad records of different kinds and prints why each was rejected.'),
      quiz: [
        Q(B('نوع الفلوس الصح:', 'The right type for money:'), [['numeric', 'numeric'], ['float', 'float'], ['text', 'text']], 0, B('دقيق.', 'Exact.')),
        Q(B('CHECK (total >= 0) بيعمل:', 'CHECK (total >= 0) does:'), [['يرفض الإجمالي السالب', 'rejects a negative total'], ['يحسب الإجمالي', 'computes the total'], ['يعمل index', 'creates an index']], 0, B('قاعدة.', 'A rule.')),
        Q(B('حقل بتجمّع بيه كتير:', 'A field you group by often:'), [['عمود عادي', 'a normal column'], ['جوه jsonb', 'inside jsonb'], ['في ملف', 'in a file']], 0, B('قيود وأداء.', 'Constraints and speed.'))
      ] },

    { title: B('SQLAlchemy 2.0', 'SQLAlchemy 2.0'),
      goal: B('تكتب نماذج وقراءات بالأسلوب الحديث المكتوب بأنواع.', 'Write models and queries in the modern, typed style.'),
      learn: [
        L(B('نماذج بـ Mapped', 'Models with Mapped'),
          B('في SQLAlchemy 2.0 النماذج بتتكتب بـ type hints: `Mapped[int]` و`mapped_column(...)`. نفس الأنواع اللي اتعلمتها في أسبوع 26، وmypy بيفهمها.', 'In SQLAlchemy 2.0 models are written with type hints: `Mapped[int]` and `mapped_column(...)`. The same types you learnt in week 26, and mypy understands them.'),
          'from datetime import datetime\nfrom decimal import Decimal\nfrom sqlalchemy import ForeignKey, Numeric, func\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship\n\nclass Base(DeclarativeBase):\n    pass\n\nclass Customer(Base):\n    __tablename__ = "customers"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    phone: Mapped[str] = mapped_column(unique=True)\n    orders: Mapped[list["Order"]] = relationship(back_populates="customer")\n\nclass Order(Base):\n    __tablename__ = "orders"\n    id: Mapped[int] = mapped_column(primary_key=True)\n    customer_id: Mapped[int] = mapped_column(ForeignKey("customers.id"))\n    total: Mapped[Decimal] = mapped_column(Numeric(12, 2))\n    created_at: Mapped[datetime] = mapped_column(server_default=func.now())\n    customer: Mapped[Customer] = relationship(back_populates="orders")', T),
        L(B('Session وselect', 'Session and select'),
          B('`Session` بيدير وحدة شغل: إضافة، تعديل، commit. والقراءة بـ `select()`: `session.scalars(select(Order).where(Order.total > 100))`. استخدم `with Session(engine) as s, s.begin():` عشان commit/rollback تلقائي.', 'A `Session` manages a unit of work: adding, changing, committing. Reading uses `select()`: `session.scalars(select(Order).where(Order.total > 100))`. Use `with Session(engine) as s, s.begin():` for automatic commit/rollback.'),
          'from sqlalchemy import create_engine, select\nfrom sqlalchemy.orm import Session\n\nengine = create_engine(os.environ["DATABASE_URL"])\nwith Session(engine) as s, s.begin():\n    s.add(Customer(phone="+201012345678"))\nwith Session(engine) as s:\n    big = s.scalars(select(Order).where(Order.total > 100).order_by(Order.created_at.desc())).all()', T),
        L(B('العلاقات من غير N+1', 'Relationships without N+1'),
          B('loop على 100 طلب وكل واحد بيقرا `order.customer` = 101 استعلام (**N+1 problem**). الحل: `selectinload(Order.customer)` بيجيبهم في استعلامين بس. راقب الاستعلامات بـ `echo=True` في الـ engine.', 'Looping over 100 orders where each reads `order.customer` = 101 queries (the **N+1 problem**). The fix: `selectinload(Order.customer)` fetches them in just two queries. Watch the queries with `echo=True` on the engine.'),
          'from sqlalchemy.orm import selectinload\nstmt = select(Order).options(selectinload(Order.customer)).limit(100)\nfor order in s.scalars(stmt):\n    print(order.id, order.customer.phone)   # no extra query per order', T)
      ],
      practice: [
        B('اكتب النماذج التلاتة بـ Mapped.', 'Write the three models with Mapped.'),
        B('ضيف وقرا بـ Session وselect.', 'Add and read with Session and select.'),
        B('شغّل echo=True واكتشف N+1 وصلّحه.', 'Turn on echo=True, spot an N+1 and fix it.'),
        B('شغّل mypy على النماذج.', 'Run mypy on the models.')
      ],
      words: [
        W('mapped', 'نوع SQLAlchemy لعمود في نموذج', 'SQLAlchemy’s type for a model column', 'id: Mapped[int] is the primary key.'),
        W('mapped_column', 'تعريف إعدادات عمود في النموذج', 'defining a column’s settings in a model', 'mapped_column(unique=True) on phone.'),
        W('relationship', 'ربط نموذجين ببعض', 'linking two models', 'Order has a relationship to Customer.'),
        W('n+1 problem', 'استعلام لكل عنصر بدل استعلام واحد', 'one query per item instead of a single query', 'selectinload solved the N+1 problem.'),
        W('selectinload', 'تحميل العلاقات في استعلام إضافي واحد', 'loading relationships in one extra query', 'Use selectinload for the customers.')
      ],
      read: ['lib:SQLAlchemy Unified Tutorial'],
      challenge: B('ابني طبقة بيانات بـ SQLAlchemy 2.0 لقاعدة الطلبات: 3 نماذج typed، دوال (إضافة طلب بسطوره، أعلى 10 عملاء)، اختبار N+1، وmypy نضيف.', 'Build a SQLAlchemy 2.0 data layer for the orders database: 3 typed models, functions (add an order with its lines, top 10 customers), an N+1 test, and clean mypy.'),
      quiz: [
        Q(B('النماذج في SQLAlchemy 2.0 بتستخدم:', 'Models in SQLAlchemy 2.0 use:'), [['Mapped[...] وtype hints', 'Mapped[...] and type hints'], ['strings بس', 'only strings'], ['XML', 'XML']], 0, B('typed.', 'Typed.')),
        Q(B('101 استعلام لـ 100 طلب:', '101 queries for 100 orders:'), [['N+1 problem', 'the N+1 problem'], ['طبيعي', 'normal'], ['أسرع', 'faster']], 0, B('selectinload.', 'selectinload.')),
        Q(B('`with Session(engine) as s, s.begin():`', '`with Session(engine) as s, s.begin():`'), [['commit أو rollback تلقائي', 'automatic commit or rollback'], ['مفيش commit', 'no commit'], ['اتصال دايم', 'a permanent connection']], 0, B('وحدة شغل.', 'A unit of work.'))
      ] },

    { title: B('الـ migrations بـ Alembic', 'Migrations with Alembic'),
      goal: B('تغيّر شكل الجداول في الإنتاج بأمان ومن غير توقف.', 'Change table shapes in production safely and without downtime.'),
      learn: [
        L(B('ليه migrations', 'Why migrations'),
          B('كل تغيير في الجداول (عمود جديد، index، تغيير نوع) يبقى ملف migration في Git بـ `upgrade()` و`downgrade()`. كده كل البيئات (جهازك، staging، الإنتاج) بتطبّق نفس التغييرات بنفس الترتيب، وتقدر ترجع.', 'Every table change (a new column, an index, a type change) becomes a migration file in Git with `upgrade()` and `downgrade()`. Every environment (your machine, staging, production) then applies the same changes in the same order, and you can roll back.'),
          '$ alembic revision --autogenerate -m "add phone_verified to customers"\n$ alembic upgrade head\n$ alembic downgrade -1', T),
        L(B('autogenerate بحذر', 'autogenerate with care'),
          B('**autogenerate** بيقارن النماذج بقاعدة البيانات ويكتب migration. مفيد جدًا، بس **راجعه دايمًا**: ممكن يفسّر تغيير اسم عمود على إنه حذف وإضافة (= بيانات بتضيع!). عدّل يدوي لـ `op.alter_column(..., new_column_name=…)`.', '**Autogenerate** compares the models with the database and writes a migration. Very useful, but **always review it**: it may read a column rename as drop + add (= data lost!). Edit it by hand to `op.alter_column(..., new_column_name=…)`.'),
          'def upgrade():\n    op.add_column("customers", sa.Column("phone_verified", sa.Boolean(), nullable=True))\n\ndef downgrade():\n    op.drop_column("customers", "phone_verified")', T),
        L(B('تغيير من غير توقف', 'Changes without downtime'),
          B('عمود جديد إجباري على جدول فيه مليون صف: (1) ضيفه nullable، (2) انشر كود بيكتب فيه، (3) **backfill** القديم على دفعات، (4) خليه NOT NULL. كل خطوة migration لوحدها. مش خطوة واحدة بتقفل الجدول.', 'A new required column on a table with a million rows: (1) add it as nullable, (2) deploy code that writes it, (3) **backfill** old rows in batches, (4) make it NOT NULL. Each step is its own migration. Not one step that locks the table.'),
          'm1: add column nullable\nm2: (code writes it for new rows)\nm3: UPDATE customers SET phone_verified = false WHERE phone_verified IS NULL AND id BETWEEN … (batches)\nm4: ALTER COLUMN phone_verified SET NOT NULL', T)
      ],
      practice: [
        B('اعمل alembic init لمشروعك وأول migration.', 'Run alembic init for your project and create the first migration.'),
        B('ضيف عمود بـ autogenerate وراجع الملف.', 'Add a column with autogenerate and review the file.'),
        B('جرّب upgrade ثم downgrade.', 'Try upgrade then downgrade.'),
        B('اكتب خطة 4 migrations لعمود إجباري جديد.', 'Write a 4-migration plan for a new required column.')
      ],
      words: [
        W('alembic', 'أداة migrations لـ SQLAlchemy', 'the migration tool for SQLAlchemy', 'Run alembic upgrade head on deploy.'),
        W('autogenerate', 'توليد migration من الفرق بين النماذج والقاعدة', 'generating a migration from the model–database difference', 'Always review autogenerate output.'),
        W('upgrade', 'تطبيق migration للأمام', 'applying a migration forwards', 'upgrade adds the column.'),
        W('downgrade', 'التراجع عن migration', 'undoing a migration', 'downgrade drops the column again.'),
        W('backfill', 'ملء القيم القديمة لعمود جديد', 'filling old rows of a new column', 'Backfill in batches of 10,000.')
      ],
      read: [{ t: 'Alembic tutorial', url: 'https://alembic.sqlalchemy.org/en/latest/tutorial.html', what: B('اقرا إنشاء وتشغيل migrations.', 'Read creating and running migrations.') }],
      challenge: B('أضف لقاعدة الطلبات عمود `channel` إجباري بالخطة الآمنة (4 migrations)، واختبر upgrade وdowngrade لكل واحدة على قاعدة فيها 100 ألف صف وهمي.', 'Add a required `channel` column to the orders database using the safe plan (4 migrations), and test upgrade and downgrade for each on a database with 100k fake rows.'),
      quiz: [
        Q(B('ملف migration فيه:', 'A migration file has:'), [['upgrade وdowngrade', 'upgrade and downgrade'], ['البيانات', 'the data'], ['الـ passwords', 'passwords']], 0, B('للأمام وللخلف.', 'Forward and back.')),
        Q(B('autogenerate في تغيير اسم عمود:', 'autogenerate for a column rename:'), [['ممكن يحذف ويضيف؛ راجع', 'may drop and add; review it'], ['دايمًا صح', 'is always right'], ['مش بيشوفه', 'does not see it']], 0, B('بيانات ممكن تضيع.', 'Data could be lost.')),
        Q(B('عمود إجباري جديد على جدول كبير:', 'A new required column on a big table:'), [['nullable ثم backfill ثم NOT NULL', 'nullable, then backfill, then NOT NULL'], ['NOT NULL فورًا', 'NOT NULL at once'], ['جدول جديد', 'a new table']], 0, B('من غير قفل.', 'Without locking.'))
      ] },

    { title: B('الأداء في قاعدة البيانات', 'Database performance'),
      goal: B('تعرف ليه الاستعلام بطيء وتصلّحه.', 'Find out why a query is slow and fix it.'),
      learn: [
        L(B('EXPLAIN ANALYZE', 'EXPLAIN ANALYZE'),
          B('`EXPLAIN ANALYZE SELECT …` بيشغّل الاستعلام ويقولك عمل إيه: **Seq Scan** (قرا الجدول كله) ولا **Index Scan**، وكام صف، وقد إيه وقت. Seq Scan على جدول كبير بفلتر = غالبًا محتاج index.', '`EXPLAIN ANALYZE SELECT …` runs the query and tells you what it did: a **Seq Scan** (read the whole table) or an **Index Scan**, how many rows and how long. A Seq Scan on a big table with a filter = usually needs an index.'),
          'EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;\n→ Seq Scan on orders (rows=1,000,000) … Execution Time: 180 ms\nCREATE INDEX orders_customer_idx ON orders (customer_id);\n→ Index Scan using orders_customer_idx … Execution Time: 0.3 ms', T),
        L(B('index ليه تمن', 'Indexes have a price'),
          B('الـ index بيسرّع القراءة بس بيبطّأ الكتابة وبياخد مساحة. اعمل index للأعمدة اللي في WHERE وJOIN وORDER BY كتير. index مركّب `(customer_id, created_at)` لما بتفلتر بالاتنين. والمثال بـ sqlite بيوري الخطة بتتغير.', 'An index speeds up reads but slows writes and takes space. Index columns used often in WHERE, JOIN and ORDER BY. A composite index `(customer_id, created_at)` when you filter on both. The sqlite example shows the plan changing.'),
          'import sqlite3\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INT, total REAL)")\ndb.executemany("INSERT INTO orders (customer_id, total) VALUES (?, ?)", [(i % 1000, i) for i in range(50_000)])\nq = "EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 42"\nprint(db.execute(q).fetchall()[0][-1])\ndb.execute("CREATE INDEX orders_customer ON orders (customer_id)")\nprint(db.execute(q).fetchall()[0][-1])', R),
        L(B('إدخال بالجملة', 'Bulk loading'),
          B('إدخال 100 ألف صف واحد واحد بـ commit لكل صف بطيء جدًا. استخدم **bulk insert**: `executemany` داخل transaction واحدة، أو الأسرع في Postgres: `COPY` (psycopg عنده `cursor.copy()`). والـ upsert بـ `ON CONFLICT DO UPDATE`.', 'Inserting 100k rows one by one with a commit each is very slow. Use a **bulk insert**: `executemany` inside one transaction, or the fastest in Postgres: `COPY` (psycopg has `cursor.copy()`). Upserts use `ON CONFLICT DO UPDATE`.'),
          'with conn.cursor() as cur:\n    with cur.copy("COPY orders (customer_id, total) FROM STDIN") as copy:\n        for row in rows:\n            copy.write_row(row)\n# 100k rows: one-by-one ≈ minutes · COPY ≈ 1–2 seconds', T)
      ],
      practice: [
        B('شغّل مثال sqlite وشوف الخطة قبل وبعد الـ index.', 'Run the sqlite example and see the plan before and after the index.'),
        B('اعمل EXPLAIN ANALYZE على 3 استعلامات في Postgres.', 'Run EXPLAIN ANALYZE on 3 queries in Postgres.'),
        B('قارن إدخال صف صف مع COPY لـ 50 ألف صف.', 'Compare row-by-row inserts with COPY for 50k rows.'),
        B('اعمل index مركّب لاستعلام بفلترين.', 'Create a composite index for a two-filter query.')
      ],
      words: [
        W('explain analyze', 'أمر بيوري خطة الاستعلام ووقته الحقيقي', 'a command showing a query’s plan and real timing', 'EXPLAIN ANALYZE showed a Seq Scan.'),
        W('seq scan', 'قراءة الجدول كله', 'reading the whole table', 'A seq scan on a million rows is slow.'),
        W('index scan', 'قراءة باستخدام index', 'reading through an index', 'After the index it became an index scan.'),
        W('composite index', 'index على أكتر من عمود', 'an index on more than one column', 'Add a composite index on (customer_id, created_at).'),
        W('bulk insert', 'إدخال صفوف كتير مرة واحدة', 'inserting many rows at once', 'A bulk insert took two seconds.')
      ],
      read: [{ t: 'PostgreSQL: Using EXPLAIN', url: 'https://www.postgresql.org/docs/current/using-explain.html', what: B('اقرا أول جزء عن الخطط.', 'Read the first part about plans.') }, { t: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', what: B('اقرا فصل «Anatomy of an index».', 'Read the chapter «Anatomy of an index».') }],
      challenge: B('اعمل قاعدة طلبات بمليون صف (COPY)، اكتب 5 استعلامات تقارير، قيسهم بـ EXPLAIN ANALYZE، أضف indexes مناسبة، وجدول قبل/بعد بالأوقات.', 'Build an orders database with a million rows (COPY), write 5 report queries, measure them with EXPLAIN ANALYZE, add suitable indexes, and make a before/after table of timings.'),
      quiz: [
        Q(B('Seq Scan على جدول كبير بفلتر:', 'A Seq Scan on a big table with a filter:'), [['غالبًا محتاج index', 'usually needs an index'], ['مثالي', 'is ideal'], ['خطأ', 'is an error']], 0, B('قرا كله.', 'It read everything.')),
        Q(B('عيب الـ index:', 'An index’s downside:'), [['كتابة أبطأ ومساحة', 'slower writes and space'], ['قراءة أبطأ', 'slower reads'], ['مفيش', 'none']], 0, B('ليه تمن.', 'It has a price.')),
        Q(B('أسرع إدخال لـ 100 ألف صف في Postgres:', 'The fastest insert of 100k rows in Postgres:'), [['COPY', 'COPY'], ['INSERT لكل صف بـ commit', 'an INSERT per row with a commit'], ['ORM add واحد واحد', 'ORM add one by one']], 0, B('bulk.', 'Bulk.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('طبقة بيانات PostgreSQL جاهزة للإنتاج.', 'A production-ready PostgreSQL data layer.'),
      review: [
        B('psycopg، parameterized queries، transactions، وconnection pool.', 'psycopg, parameterised queries, transactions and the connection pool.'),
        B('الأنواع (numeric، timestamptz، jsonb) والقيود.', 'Types (numeric, timestamptz, jsonb) and constraints.'),
        B('SQLAlchemy 2.0: Mapped، Session، select، وselectinload.', 'SQLAlchemy 2.0: Mapped, Session, select and selectinload.'),
        B('Alembic: autogenerate بمراجعة، upgrade/downgrade، والتغيير الآمن.', 'Alembic: reviewed autogenerate, upgrade/downgrade and safe changes.'),
        B('EXPLAIN ANALYZE والفهارس وCOPY.', 'EXPLAIN ANALYZE, indexes and COPY.')
      ],
      project: B('ابني «قاعدة طلبات للإنتاج» على Postgres في Docker: تصميم بقيود، نماذج SQLAlchemy typed، Alembic migrations (منها تغيير آمن من 4 خطوات)، مستورد CSV بـ COPY، 5 استعلامات تقارير محسّنة بفهارس، واختبارات pytest على قاعدة اختبار.', 'Build a «production orders database» on Postgres in Docker: a design with constraints, typed SQLAlchemy models, Alembic migrations (including a safe 4-step change), a CSV importer using COPY, 5 report queries tuned with indexes, and pytest tests against a test database.'),
      test: [
        Q(B('القيم في SQL تتبعت بـ:', 'Values in SQL are sent with:'), [['placeholders', 'placeholders'], ['f-strings', 'f-strings'], ['+', 'string concatenation']], 0, B('ضد injection.', 'Against injection.')),
        Q(B('pool.connection() بيرجّع:', 'pool.connection() returns:'), [['اتصال جاهز من المجموعة', 'a ready connection from the pool'], ['اتصال جديد دايمًا', 'always a new connection'], ['خطأ', 'an error']], 0, B('إعادة استخدام.', 'Reuse.')),
        Q(B('الوقت في Postgres:', 'Time in Postgres:'), [['timestamptz', 'timestamptz'], ['text', 'text'], ['float', 'float']], 0, B('بتوقيت.', 'With a time zone.')),
        Q(B('آخر خط دفاع ضد البيانات الغلط:', 'The last line of defence against bad data:'), [['قيود قاعدة البيانات', 'database constraints'], ['تعليق في الكود', 'a code comment'], ['README', 'the README']], 0, B('CHECK وUNIQUE.', 'CHECK and UNIQUE.')),
        Q(B('IntegrityError:', 'IntegrityError means:'), [['قيد اتكسر', 'a constraint was broken'], ['الشبكة وقعت', 'the network failed'], ['مفيش جدول', 'no table']], 0, B('مرفوض.', 'Rejected.')),
        Q(B('Mapped[Decimal]:', 'Mapped[Decimal]:'), [['عمود رقم عشري typed', 'a typed decimal column'], ['ملف', 'a file'], ['index', 'an index']], 0, B('SQLAlchemy 2.0.', 'SQLAlchemy 2.0.')),
        Q(B('N+1 بيتحل بـ:', 'N+1 is fixed with:'), [['selectinload', 'selectinload'], ['loop أكبر', 'a bigger loop'], ['sleep', 'sleep']], 0, B('استعلامين.', 'Two queries.')),
        Q(B('downgrade:', 'downgrade:'), [['يتراجع عن migration', 'undoes a migration'], ['يحذف القاعدة', 'deletes the database'], ['يحدّث بايثون', 'updates Python']], 0, B('رجوع.', 'Back.')),
        Q(B('autogenerate لازم:', 'autogenerate output must be:'), [['تراجعه قبل التشغيل', 'reviewed before running'], ['يتشغّل على طول', 'run immediately'], ['يتمسح', 'deleted']], 0, B('أخطاء محتملة.', 'Possible mistakes.')),
        Q(B('backfill:', 'Backfill means:'), [['ملء القيم القديمة لعمود جديد', 'filling old rows of a new column'], ['حذف صفوف', 'deleting rows'], ['نسخ القاعدة', 'copying the database']], 0, B('على دفعات.', 'In batches.')),
        Q(B('Index Scan بدل Seq Scan:', 'An Index Scan instead of a Seq Scan:'), [['استعلام أسرع غالبًا', 'usually a faster query'], ['أبطأ', 'slower'], ['خطأ', 'an error']], 0, B('index.', 'Indexed.')),
        Q(B('COPY:', 'COPY is:'), [['أسرع إدخال بالجملة في Postgres', 'the fastest bulk load in Postgres'], ['نسخ ملف', 'a file copy'], ['backup', 'a backup']], 0, B('bulk.', 'Bulk.'))
      ] }
  ]
};
