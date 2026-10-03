// JavaScript week 33 — databases from Node: SQL and Postgres.
// node:sqlite (built into Node 22.5+/24) runs the SQL examples; Postgres code is shown.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
const SETUP = 'import { DatabaseSync } from "node:sqlite";\nconst db = new DatabaseSync(":memory:");\nconst rows = r => r.map(x => ({ ...x }));\n';
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('قواعد البيانات من Node: SQL وPostgres', 'Databases from Node: SQL and Postgres'),
  goal: B('تخزّن بيانات أتمتتك في قاعدة حقيقية بدل ملفات JSON: SQL من الأساسيات للـ joins والتجميع، الاستعلامات الآمنة، القيود والـ transactions والـ upsert، Postgres من Node بـ pool، والـ migrations والـ ORM — بأمثلة SQLite بتشتغل فعلًا.',
          'Store your automation data in a real database instead of JSON files: SQL from the basics to joins and aggregation, safe queries, constraints, transactions and upserts, Postgres from Node with a pool, and migrations and ORMs — with SQLite examples that really run.'),
  days: [
    { title: B('SQL من Node', 'SQL from Node'),
      goal: B('تعمل جداول وتكتب وتقرا بأمان.', 'Create tables, write and read safely.'),
      learn: [
        L(B('أول جدول', 'The first table'),
          B('**database** علائقية = **table** بأعمدة بأنواع، وكل صف ليه **primary key**. **sql** هي لغة التعامل معاها. Node 24 فيه **sqlite** مدمج (`node:sqlite`) — قاعدة في ملف واحد أو في الذاكرة، ممتازة للتعلم والأدوات الصغيرة. ونفس SQL تقريبًا بيشتغل على Postgres.', 'A relational **database** = each **table** has typed columns, and every row has a **primary key**. **sql** is the language for working with it. Node 24 has **sqlite** built in (`node:sqlite`) — a database in one file or in memory, great for learning and small tools. And nearly the same SQL works on Postgres.'),
          SETUP + 'db.exec(`\n  CREATE TABLE customers (\n    id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL,\n    phone TEXT,\n    city TEXT\n  );\n`);\nconst insert = db.prepare("INSERT INTO customers (name, phone, city) VALUES (?, ?, ?)");\nfor (const c of [["Sara", "+201001234567", "Cairo"], ["Omar", "+201112223334", "Giza"], ["Mona", null, "Cairo"]]) insert.run(...c);\nconsole.log(rows(db.prepare("SELECT id, name, city FROM customers WHERE city = ? ORDER BY name").all("Cairo")));\nconsole.log("count:", db.prepare("SELECT COUNT(*) AS n FROM customers").get().n);', N()),
        L(B('SELECT', 'SELECT'),
          B('**select** بيقرا: الأعمدة، `FROM` الجدول، `WHERE` الشرط، `ORDER BY` الترتيب، `LIMIT/OFFSET` الصفحات. القاعدة بتعمل الفلترة والترتيب أسرع بكتير من JS — هات اللي محتاجه بس بدل كل الجدول.', '**select** reads: the columns, `FROM` the table, `WHERE` the condition, `ORDER BY` the order, `LIMIT/OFFSET` the pages. The database filters and sorts far faster than JS — fetch only what you need, not the whole table.'),
          SETUP + 'db.exec("CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT, total REAL, status TEXT, created TEXT)");\nconst ins = db.prepare("INSERT INTO orders (customer, total, status, created) VALUES (?, ?, ?, ?)");\n[["Sara", 250, "paid", "2026-10-01"], ["Omar", 90.5, "new", "2026-10-02"], ["Mona", 1200, "paid", "2026-10-02"], ["Sara", 45, "shipped", "2026-10-03"], ["Ali", 610, "paid", "2026-10-03"]].forEach(o => ins.run(...o));\nconsole.log(rows(db.prepare(`\n  SELECT id, customer, total FROM orders\n  WHERE status = ? AND total >= ?\n  ORDER BY total DESC\n  LIMIT 2`).all("paid", 200)));\nconsole.log(rows(db.prepare("SELECT customer, total FROM orders WHERE customer LIKE ? ORDER BY created").all("S%")));', N()),
        L(B('الاستعلامات الآمنة', 'Safe queries'),
          B('**sql injection**: لو بنيت الاستعلام بجمع نصوص (`"... WHERE name = \'" + input + "\'"`)، حد يكتب `\' OR \'1\'=\'1` ويشوف كل البيانات — أو يمسحها. الحل الوحيد: **parameterized query** (`?` أو `$1`) — القيمة بتتبعت لوحدها ومستحيل تتفسّر كـ SQL. المثال بيوريك الفرق:', '**sql injection**: if you build a query by joining strings (`"... WHERE name = \'" + input + "\'"`), someone types `\' OR \'1\'=\'1` and sees all the data — or deletes it. The only fix: a **parameterized query** (`?` or `$1`) — the value is sent separately and can never be read as SQL. The example shows the difference:'),
          SETUP + 'db.exec("CREATE TABLE users (name TEXT, secret TEXT)");\ndb.exec("INSERT INTO users VALUES (\'sara\', \'s-111\'), (\'omar\', \'o-222\')");\nconst input = "nobody\' OR \'1\'=\'1";\nconst unsafe = db.prepare("SELECT name, secret FROM users WHERE name = \'" + input + "\'").all();\nconsole.log("✗ string-built query leaked", unsafe.length, "rows");\nconst safe = db.prepare("SELECT name, secret FROM users WHERE name = ?").all(input);\nconsole.log("✓ parameterized query returned", safe.length, "rows");', N())
      ],
      practice: [
        B('اعمل جدول products واملاه بـ 10 صفوف.', 'Create a products table and fill it with 10 rows.'),
        B('اكتب 5 استعلامات SELECT بشروط مختلفة.', 'Write 5 SELECT queries with different conditions.'),
        B('شغّل مثال الحقن وافهم ليه حصل.', 'Run the injection example and understand why it happened.'),
        B('احفظ القاعدة في ملف orders.db بدل الذاكرة.', 'Save the database to orders.db instead of memory.')
      ],
      words: [
        W('sql', 'لغة التعامل مع قواعد البيانات', 'the language for working with databases', 'Write the report in SQL.'),
        W('table', 'جدول صفوف وأعمدة في القاعدة', 'a table of rows and columns in a database', 'The orders table has 5 columns.'),
        W('primary key', 'معرّف فريد لكل صف', 'a unique identifier for each row', 'id is the primary key.'),
        W('sqlite', 'قاعدة بيانات في ملف واحد', 'a database in a single file', 'node:sqlite needs no server.'),
        W('select', 'أمر قراءة البيانات', 'the command for reading data', 'SELECT only the columns you need.'),
        W('sql injection', 'حقن أوامر SQL عبر مدخلات', 'injecting SQL commands through input', 'String-built queries invite SQL injection.'),
        W('parameterized query', 'استعلام بقيم منفصلة ? أو $1', 'a query with separate values, ? or $1', 'Always use a parameterized query.')
      ],
      read: [{ lib: 'SQLBolt', what: B('حل الدروس 1–6.', 'Do lessons 1–6.') }, { t: 'Node.js: SQLite', url: 'https://nodejs.org/api/sqlite.html', what: B('اقرا DatabaseSync وStatementSync.', 'Read DatabaseSync and StatementSync.') }],
      challenge: B('حوّل state.json وملفات الطلبات في مشروع الشهر الرابع لقاعدة SQLite: جداول orders وcustomers، إدخال بـ prepared statements، واستعلامات التقارير كلها SQL.', 'Move the month 4 project’s state.json and order files into an SQLite database: orders and customers tables, inserts with prepared statements, and every report query in SQL.'),
      quiz: [
        Q(B('أمان مدخلات المستخدم في SQL:', 'Safe user input in SQL:'), [['parameterized query', 'a parameterized query'], ['replace للعلامات', 'replacing quotes'], ['base64', 'base64']], 0, B('الوحيد.', 'The only way.')),
        Q(B('هات أعلى 10 طلبات:', 'Get the top 10 orders:'), ['ORDER BY total DESC LIMIT 10', 'WHERE TOP 10', 'GROUP BY 10'], 0, B('ترتيب وحد.', 'Order and limit.')),
        Q(B('primary key:', 'A primary key:'), [['فريد لكل صف', 'unique per row'], ['ممكن يتكرر', 'may repeat'], ['اختياري دايمًا', 'always optional']], 0, B('هوية.', 'Identity.'))
      ] },

    { title: B('الربط والتجميع والفهارس', 'Joins, aggregation and indexes'),
      goal: B('تجاوب على أسئلة البيزنس بسطر SQL.', 'Answer business questions with one SQL statement.'),
      learn: [
        L(B('JOIN', 'JOIN'),
          B('البيانات بتتقسم على جداول (عملاء، طلبات) عشان متتكررش، و**foreign key** (`orders.customer_id`) بيربطهم. `JOIN` بيجمعهم وقت القراءة. `LEFT JOIN` بيجيب كل العملاء حتى اللي ملهمش طلبات (بـ NULL).', 'Data is split across tables (customers, orders) to avoid duplication, and a **foreign key** (`orders.customer_id`) links them. `JOIN` combines them when reading. `LEFT JOIN` returns every customer, even those without orders (with NULL).'),
          SETUP + 'db.exec(`\n  CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, city TEXT);\n  CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), total REAL, status TEXT);\n  INSERT INTO customers VALUES (1, \'Sara\', \'Cairo\'), (2, \'Omar\', \'Giza\'), (3, \'Mona\', \'Cairo\');\n  INSERT INTO orders (customer_id, total, status) VALUES (1, 250, \'paid\'), (1, 45, \'shipped\'), (2, 90.5, \'new\');\n`);\nconsole.log(rows(db.prepare(`\n  SELECT o.id, c.name, c.city, o.total FROM orders o\n  JOIN customers c ON c.id = o.customer_id\n  ORDER BY o.id`).all()));\nconsole.log(rows(db.prepare(`\n  SELECT c.name, COUNT(o.id) AS orders FROM customers c\n  LEFT JOIN orders o ON o.customer_id = c.id\n  GROUP BY c.id ORDER BY c.name`).all()));', N()),
        L(B('التجميع', 'Aggregation'),
          B('`GROUP BY` مع `COUNT` و`SUM` و`AVG` و`MIN/MAX` = تقرير كامل في استعلام: المبيعات حسب المدينة، أحسن 5 عملاء، الإيراد اليومي. و**having** بيفلتر **بعد** التجميع (`HAVING SUM(total) > 1000`)، وWHERE قبله.', '`GROUP BY` with `COUNT`, `SUM`, `AVG` and `MIN/MAX` = a full report in one query: sales by city, the top 5 customers, daily revenue. And **having** filters **after** grouping (`HAVING SUM(total) > 1000`), WHERE before it.'),
          SETUP + 'db.exec("CREATE TABLE orders (id INTEGER PRIMARY KEY, city TEXT, day TEXT, total REAL, status TEXT)");\nconst ins = db.prepare("INSERT INTO orders (city, day, total, status) VALUES (?, ?, ?, ?)");\nconst cities = ["Cairo", "Giza", "Alex"];\nfor (let i = 0; i < 30; i++) ins.run(cities[i % 3], `2026-10-0${1 + (i % 3)}`, 50 + ((i * 37) % 400), i % 5 === 0 ? "cancelled" : "paid");\nconsole.log(rows(db.prepare(`\n  SELECT city, COUNT(*) AS orders, ROUND(SUM(total), 2) AS revenue, ROUND(AVG(total), 1) AS avg\n  FROM orders\n  WHERE status = \'paid\'\n  GROUP BY city\n  HAVING SUM(total) > 2000\n  ORDER BY revenue DESC`).all()));', N()),
        L(B('الفهارس', 'Indexes'),
          B('**db index** على عمود بتبحث بيه كتير (`customer_id`، `created`، `phone`) = زي فهرس الكتاب: القاعدة تروح للصف علطول بدل ما تقرا الجدول كله. `EXPLAIN QUERY PLAN` (أو `EXPLAIN ANALYZE` في Postgres) بيقولك استخدمت فهرس ولا «SCAN». الفهرس بيسرّع القراءة وبيبطّأ الكتابة شوية.', 'A **db index** on a column you search often (`customer_id`, `created`, `phone`) = like a book’s index: the database goes straight to the row instead of reading the whole table. `EXPLAIN QUERY PLAN` (or `EXPLAIN ANALYZE` in Postgres) tells you whether an index was used or a «SCAN». Indexes speed reads and slightly slow writes.'),
          SETUP + 'db.exec("CREATE TABLE orders (id INTEGER PRIMARY KEY, phone TEXT, total REAL)");\nconst ins = db.prepare("INSERT INTO orders (phone, total) VALUES (?, ?)");\ndb.exec("BEGIN"); for (let i = 0; i < 100_000; i++) ins.run(`+2010${String(i).padStart(8, "0")}`, i % 500); db.exec("COMMIT");\nconst q = db.prepare("SELECT COUNT(*) AS n FROM orders WHERE phone = ?");\nconst plan = () => db.prepare("EXPLAIN QUERY PLAN SELECT * FROM orders WHERE phone = ?").all("x").map(r => r.detail).join(" ");\nlet t = performance.now(); for (let i = 0; i < 200; i++) q.get(`+2010${String(i * 400).padStart(8, "0")}`);\nconsole.log("no index:  ", plan(), "→", Math.round(performance.now() - t), "ms for 200 lookups");\ndb.exec("CREATE INDEX idx_orders_phone ON orders(phone)");\nt = performance.now(); for (let i = 0; i < 200; i++) q.get(`+2010${String(i * 400).padStart(8, "0")}`);\nconsole.log("with index:", plan(), "→", Math.round(performance.now() - t), "ms for 200 lookups");', N())
      ],
      practice: [
        B('اكتب JOIN بين الطلبات والعملاء والمنتجات.', 'Write a JOIN across orders, customers and products.'),
        B('اعمل تقرير إيراد يومي بـ GROUP BY.', 'Build a daily revenue report with GROUP BY.'),
        B('لاقي العملاء اللي إجماليهم > 1000 بـ HAVING.', 'Find customers whose total exceeds 1000 with HAVING.'),
        B('قارن EXPLAIN قبل وبعد فهرس.', 'Compare EXPLAIN before and after an index.')
      ],
      words: [
        W('foreign key', 'عمود بيشاور على صف في جدول تاني', 'a column pointing to a row in another table', 'customer_id is a foreign key.'),
        W('left join', 'ربط بيرجّع كل صفوف الجدول الشمال', 'a join keeping every row of the left table', 'LEFT JOIN shows customers with no orders.'),
        W('having', 'فلترة بعد التجميع', 'filtering after grouping', 'HAVING SUM(total) > 1000.'),
        W('db index', 'فهرس بيسرّع البحث في عمود', 'an index speeding up searches on a column', 'Add a db index on phone.'),
        W('explain', 'عرض خطة تنفيذ الاستعلام', 'showing how a query will run', 'EXPLAIN shows a full scan.'),
        W('aggregate function', 'دالة بتجمع صفوف لقيمة', 'a function combining rows into one value', 'SUM is an aggregate function.')
      ],
      read: [{ lib: 'SQLBolt', what: B('حل الدروس 6–12.', 'Do lessons 6–12.') }, { t: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', what: B('اقرا Anatomy of an Index.', 'Read Anatomy of an Index.') }],
      challenge: B('اكتب 6 تقارير SQL لمتجرك (إيراد يومي، حسب المدينة، أحسن 5 عملاء، منتجات مبيعتش، عملاء بطلب واحد، متوسط السلة) وأضف الفهارس اللي EXPLAIN بيقول محتاجها.', 'Write 6 SQL reports for your shop (daily revenue, by city, top 5 customers, unsold products, one-order customers, average basket) and add the indexes EXPLAIN says they need.'),
      quiz: [
        Q(B('عملاء من غير طلبات يظهروا:', 'Customers without orders appear with:'), ['LEFT JOIN', 'JOIN', 'WHERE'], 0, B('NULL.', 'NULL.')),
        Q(B('فلتر على SUM:', 'A filter on SUM:'), ['HAVING', 'WHERE', 'ORDER BY'], 0, B('بعد التجميع.', 'After grouping.')),
        Q(B('بحث بطيء بالتليفون:', 'Slow lookups by phone:'), [['فهرس على phone', 'an index on phone'], ['جدول تاني', 'another table'], ['JS loop', 'a JS loop']], 0, B('index.', 'Index.'))
      ] },

    { title: B('القيود والـ transactions', 'Constraints and transactions'),
      goal: B('القاعدة نفسها تمنع البيانات الغلط وتحمي العمليات.', 'The database itself blocks bad data and protects operations.'),
      learn: [
        L(B('القيود', 'Constraints'),
          B('**constraint** = قاعدة القاعدة بتفرضها مهما كان الكود: `NOT NULL`، **unique constraint** (تليفون مايتكررش)، **check constraint** (`total >= 0`)، وforeign key (طلب لعميل موجود). آخر خط دفاع — حتى لو فيه bug في الكود، البيانات الغلط متدخلش.', 'A **constraint** = a rule the database enforces whatever the code does: `NOT NULL`, a **unique constraint** (no repeated phone), a **check constraint** (`total >= 0`), and a foreign key (an order for an existing customer). The last line of defence — even with a bug in the code, bad data does not get in.'),
          SETUP + 'db.exec("PRAGMA foreign_keys = ON");\ndb.exec(`\n  CREATE TABLE customers (id INTEGER PRIMARY KEY, phone TEXT NOT NULL UNIQUE);\n  CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(id), total REAL CHECK (total >= 0));\n  INSERT INTO customers (phone) VALUES (\'+201001234567\');\n`);\nconst tryIt = (label, sql) => { try { db.exec(sql); console.log("✓", label); } catch (e) { console.log("✗", label, "→", e.message); } };\ntryIt("duplicate phone", "INSERT INTO customers (phone) VALUES (\'+201001234567\')");\ntryIt("negative total", "INSERT INTO orders (customer_id, total) VALUES (1, -5)");\ntryIt("unknown customer", "INSERT INTO orders (customer_id, total) VALUES (99, 10)");\ntryIt("valid order", "INSERT INTO orders (customer_id, total) VALUES (1, 250)");', N()),
        L(B('transactions', 'Transactions'),
          B('**transaction**: مجموعة عمليات يا تتم كلها يا ولا واحدة. مثال: إنشاء طلب = إدخال الطلب + بنوده + تنقيص المخزون. لو التالتة فشلت (المخزون مش كفاية)، **rollback** يرجّع كل حاجة — مفيش طلب نص متسجّل.', 'A **transaction**: a group of operations that all happen or none do. Example: creating an order = insert the order + its lines + reduce stock. If the third fails (not enough stock), a **rollback** undoes everything — no half-recorded order.'),
          SETUP + 'db.exec(`\n  CREATE TABLE stock (sku TEXT PRIMARY KEY, qty INTEGER CHECK (qty >= 0));\n  CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT);\n  CREATE TABLE lines (order_id INTEGER, sku TEXT, qty INTEGER);\n  INSERT INTO stock VALUES (\'A1\', 5), (\'B2\', 1);\n`);\nfunction placeOrder(customer, items) {\n  db.exec("BEGIN");\n  try {\n    const { lastInsertRowid: id } = db.prepare("INSERT INTO orders (customer) VALUES (?)").run(customer);\n    for (const { sku, qty } of items) {\n      db.prepare("INSERT INTO lines VALUES (?, ?, ?)").run(id, sku, qty);\n      db.prepare("UPDATE stock SET qty = qty - ? WHERE sku = ?").run(qty, sku);   // CHECK fails if stock < 0\n    }\n    db.exec("COMMIT");\n    return `order ${id} placed`;\n  } catch (e) {\n    db.exec("ROLLBACK");\n    return `rolled back: ${e.message}`;\n  }\n}\nconsole.log(placeOrder("Sara", [{ sku: "A1", qty: 2 }, { sku: "B2", qty: 1 }]));\nconsole.log(placeOrder("Omar", [{ sku: "A1", qty: 1 }, { sku: "B2", qty: 1 }]));\nconsole.log("orders:", db.prepare("SELECT COUNT(*) n FROM orders").get().n, "| stock:", rows(db.prepare("SELECT * FROM stock").all()));', N()),
        L(B('upsert', 'Upsert'),
          B('**upsert** = أضف لو مش موجود، وحدّث لو موجود — في أمر واحد: `INSERT … ON CONFLICT (key) DO UPDATE`. ده الحل المثالي لـ webhooks اللي بتتكرر (أسبوع 18): نفس الحدث مرتين = صف واحد محدّث، مش صفين. idempotency على مستوى القاعدة.', 'An **upsert** = insert if missing, update if present — in one statement: `INSERT … ON CONFLICT (key) DO UPDATE`. The perfect fit for repeated webhooks (week 18): the same event twice = one updated row, not two. Idempotency at the database level.'),
          SETUP + 'db.exec("CREATE TABLE shop_orders (external_id TEXT PRIMARY KEY, status TEXT, total REAL, updated TEXT)");\nconst upsert = db.prepare(`\n  INSERT INTO shop_orders (external_id, status, total, updated) VALUES (?, ?, ?, ?)\n  ON CONFLICT (external_id) DO UPDATE SET status = excluded.status, total = excluded.total, updated = excluded.updated`);\nconst webhooks = [\n  ["SHOP-1042", "pending", 250, "10:00"],\n  ["SHOP-1042", "pending", 250, "10:00"],        // a duplicate delivery\n  ["SHOP-1043", "paid", 90.5, "10:02"],\n  ["SHOP-1042", "paid", 250, "10:05"],           // a later status change\n];\nfor (const w of webhooks) upsert.run(...w);\nconsole.log(rows(db.prepare("SELECT * FROM shop_orders ORDER BY external_id").all()));', N())
      ],
      practice: [
        B('ضيف UNIQUE وCHECK لجداولك وجرّب بيانات غلط.', 'Add UNIQUE and CHECK to your tables and try bad data.'),
        B('اعمل placeOrder بـ transaction.', 'Write placeOrder with a transaction.'),
        B('خلّي مستقبل الـ webhook يستخدم upsert.', 'Make the webhook receiver use an upsert.'),
        B('فعّل foreign_keys وجرّب طلب لعميل مش موجود.', 'Enable foreign_keys and try an order for a missing customer.')
      ],
      words: [
        W('constraint', 'قاعدة بتفرضها القاعدة على البيانات', 'a rule the database enforces on data', 'A constraint rejected the negative total.'),
        W('unique constraint', 'منع تكرار قيمة في عمود', 'preventing repeated values in a column', 'Add a unique constraint on phone.'),
        W('check constraint', 'شرط على قيمة العمود', 'a condition on a column’s value', 'CHECK (total >= 0) is a check constraint.'),
        W('transaction', 'عمليات يا كلها يا ولا واحدة', 'operations that all happen or none do', 'Wrap the order in a transaction.'),
        W('rollback', 'إلغاء كل عمليات الـ transaction', 'undoing every operation in a transaction', 'The stock error caused a rollback.'),
        W('upsert', 'أضف أو حدّث في أمر واحد', 'insert or update in one statement', 'An upsert absorbs duplicate webhooks.'),
        W('on conflict', 'جزء SQL بيحدد التصرف عند التكرار', 'the SQL clause deciding what to do on a clash', 'ON CONFLICT DO UPDATE refreshes the row.')
      ],
      read: [{ t: 'SQLite: UPSERT', url: 'https://www.sqlite.org/lang_upsert.html', what: B('اقرا الأمثلة.', 'Read the examples.') }, { lib: 'PostgreSQL Tutorial (official)', what: B('اقرا Transactions وForeign Keys.', 'Read Transactions and Foreign Keys.') }],
      challenge: B('اعمل «قلب المتجر» في SQLite: customers (تليفون UNIQUE)، products (سعر CHECK)، stock، orders، lines بـ foreign keys؛ placeOrder بـ transaction؛ وupsert للطلبات الجاية من webhooks — واختبر كل قيد بـ node:test.', 'Build the «shop core» in SQLite: customers (UNIQUE phone), products (CHECK price), stock, orders and lines with foreign keys; placeOrder in a transaction; and an upsert for webhook orders — testing every constraint with node:test.'),
      quiz: [
        Q(B('آخر خط دفاع ضد البيانات الغلط:', 'The last line of defence against bad data:'), ['constraints', 'CSS', 'README'], 0, B('في القاعدة.', 'In the database.')),
        Q(B('الخطوة التالتة فشلت في transaction:', 'Step three fails in a transaction:'), [['rollback لكل حاجة', 'roll everything back'], ['الأوليين يفضلوا', 'the first two stay'], ['خطأ في القاعدة', 'a database crash']], 0, B('كله أو مفيش.', 'All or nothing.')),
        Q(B('نفس الـ webhook مرتين:', 'The same webhook twice:'), ['ON CONFLICT DO UPDATE', B('صفين', 'two rows'), 'DELETE'], 0, B('upsert.', 'Upsert.'))
      ] },

    { title: B('Postgres من Node', 'Postgres from Node'),
      goal: B('تشتغل على قاعدة إنتاج حقيقية بأمان وكفاءة.', 'Work with a real production database safely and efficiently.'),
      learn: [
        L(B('node-postgres وpool', 'node-postgres and a pool'),
          B('للإنتاج: **postgres** (قاعدة سيرفر قوية، n8n نفسه بيستخدمها). **node-postgres** (`pg`) بـ **connection pool**: اتصالات جاهزة بيعاد استخدامها بدل فتح اتصال لكل طلب. والرابط في **database_url** من .env. والـ parameters بـ `$1, $2`.', 'For production: **postgres** (a powerful server database; n8n itself uses it). **node-postgres** (`pg`) with a **connection pool**: ready connections reused instead of opening one per request. The URL lives in **database_url** in .env. Parameters use `$1, $2`.'),
          'import pg from "pg";\nexport const pool = new pg.Pool({\n  connectionString: process.env.DATABASE_URL,      // postgres://user:pass@host:5432/shop\n  max: 10,                                          // up to 10 connections\n  idleTimeoutMillis: 30_000,\n  ssl: process.env.PGSSL === "off" ? false : { rejectUnauthorized: true },\n});\n\nexport async function ordersByStatus(status, limit = 50) {\n  const { rows } = await pool.query(\n    "SELECT id, customer_id, total, created_at FROM orders WHERE status = $1 ORDER BY created_at DESC LIMIT $2",\n    [status, limit],\n  );\n  return rows;\n}', S),
        L(B('transactions في Postgres', 'Transactions in Postgres'),
          B('للـ transaction لازم **نفس الاتصال** لكل الأوامر: `const client = await pool.connect()`، وBEGIN/COMMIT/ROLLBACK، و`client.release()` في finally — وإلا الـ pool يخلص. و**jsonb** في Postgres بيخزّن JSON (جسم الـ webhook الأصلي مثلًا) وتقدر تستعلم جواه.', 'A transaction needs **the same connection** for every statement: `const client = await pool.connect()`, BEGIN/COMMIT/ROLLBACK, and `client.release()` in finally — or the pool runs dry. And **jsonb** in Postgres stores JSON (the original webhook body, say) that you can query inside.'),
          'export async function saveWebhook(event) {\n  const client = await pool.connect();\n  try {\n    await client.query("BEGIN");\n    await client.query(\n      `INSERT INTO webhook_events (event_id, type, payload) VALUES ($1, $2, $3)\n       ON CONFLICT (event_id) DO NOTHING`,\n      [event.id, event.type, event],                 // payload is a jsonb column\n    );\n    await client.query(\n      `INSERT INTO orders (external_id, status, total) VALUES ($1, $2, $3)\n       ON CONFLICT (external_id) DO UPDATE SET status = EXCLUDED.status, total = EXCLUDED.total`,\n      [event.data.id, event.data.status, event.data.total],\n    );\n    await client.query("COMMIT");\n  } catch (e) {\n    await client.query("ROLLBACK");\n    throw e;\n  } finally {\n    client.release();                                // always give it back\n  }\n}\n// later: SELECT payload->>\'type\', payload->\'data\'->>\'total\' FROM webhook_events WHERE payload @> \'{"type":"order.paid"}\';', S),
        L(B('أخطاء شائعة', 'Common mistakes'),
          B('**n+1 query**: loop بيعمل استعلام لكل طلب عشان يجيب عميله = 1000 استعلام. الحل: JOIN واحد أو `WHERE id = ANY($1)`. وكمان: متنساش `release()`، ومتفتحش pool جديد في كل طلب، وحط timeout للاستعلامات، ومتطبعش DATABASE_URL في اللوج (فيه كلمة السر).', 'The **n+1 query**: a loop querying once per order to fetch its customer = 1000 queries. The fix: one JOIN or `WHERE id = ANY($1)`. Also: never forget `release()`, never create a new pool per request, set query timeouts, and never log DATABASE_URL (it contains the password).'),
          SETUP + 'db.exec("CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT); CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total REAL)");\nconst ic = db.prepare("INSERT INTO customers (id, name) VALUES (?, ?)"), io = db.prepare("INSERT INTO orders (customer_id, total) VALUES (?, ?)");\nfor (let i = 1; i <= 300; i++) ic.run(i, "C" + i);\nfor (let i = 0; i < 3000; i++) io.run(1 + (i % 300), i % 100);\nlet queries = 0;\nconst q = (sql, ...p) => { queries++; return db.prepare(sql).all(...p); };\n\nconst orders = q("SELECT * FROM orders");\nfor (const o of orders) o.customer = q("SELECT name FROM customers WHERE id = ?", o.customer_id)[0].name;   // N+1\nconsole.log("loop:", queries, "queries");\n\nqueries = 0;\nconst joined = q("SELECT o.*, c.name AS customer FROM orders o JOIN customers c ON c.id = o.customer_id");\nconsole.log("join:", queries, "query,", joined.length, "rows — same result:", joined[5].customer === orders[5].customer);', N())
      ],
      practice: [
        B('اعمل قاعدة Postgres مجانية (Neon أو Supabase) وجرّب الاتصال.', 'Create a free Postgres database (Neon or Supabase) and connect.'),
        B('اكتب ordersByStatus بـ pool وparameters.', 'Write ordersByStatus with a pool and parameters.'),
        B('اعمل saveWebhook بـ transaction وrelease.', 'Write saveWebhook with a transaction and release.'),
        B('اكتشف N+1 في كود عندك وصلّحه بـ JOIN.', 'Find an N+1 in your code and fix it with a JOIN.')
      ],
      words: [
        W('postgres', 'قاعدة بيانات سيرفر قوية ومفتوحة المصدر', 'a powerful open-source server database', 'n8n stores its data in Postgres.'),
        W('node-postgres', 'مكتبة pg للاتصال بـ Postgres من Node', 'the pg library for Postgres from Node', 'node-postgres uses $1 parameters.'),
        W('connection pool', 'اتصالات جاهزة بيعاد استخدامها', 'ready connections that are reused', 'The connection pool holds 10 clients.'),
        W('database_url', 'رابط الاتصال بالقاعدة في متغير بيئة', 'the database connection string in an env var', 'Never log DATABASE_URL.'),
        W('jsonb', 'نوع Postgres لتخزين JSON والاستعلام فيه', 'a Postgres type storing queryable JSON', 'Keep the raw webhook in jsonb.'),
        W('n+1 query', 'استعلام لكل عنصر بدل استعلام واحد', 'one query per item instead of one query', 'The N+1 query made the page slow.')
      ],
      read: [{ lib: 'node-postgres', what: B('اقرا Pooling وTransactions.', 'Read Pooling and Transactions.') }, { t: 'PostgreSQL: JSON types', url: 'https://www.postgresql.org/docs/current/datatype-json.html', what: B('اقرا jsonb Containment.', 'Read jsonb Containment.') }],
      challenge: B('انقل «بوابة الطلبات» من الذاكرة لـ Postgres: pool، جداول بقيود، webhook_events بـ jsonb وupsert، استعلامات من غير N+1، timeout، وintegration tests على قاعدة اختبار (Docker postgres).', 'Move the «orders gateway» from memory to Postgres: a pool, constrained tables, webhook_events with jsonb and upserts, queries without N+1, timeouts, and integration tests against a test database (Docker postgres).'),
      quiz: [
        Q(B('parameters في pg:', 'Parameters in pg:'), ['$1, $2', '?, ?', ':name'], 0, B('Postgres.', 'Postgres.')),
        Q(B('pool.connect() من غير release:', 'pool.connect() without release:'), [['الـ pool يخلص ويعلق', 'the pool runs dry and hangs'], ['عادي', 'fine'], ['أسرع', 'faster']], 0, B('finally.', 'finally.')),
        Q(B('1000 طلب وكل واحد استعلام لعميله:', '1000 orders, one query each for its customer:'), [['N+1 → JOIN', 'N+1 → use a JOIN'], ['تمام', 'fine'], ['أسرع طريقة', 'the fastest way']], 0, B('استعلام واحد.', 'One query.'))
      ] },

    { title: B('الـ migrations والـ ORM', 'Migrations and ORMs'),
      goal: B('تغيّر شكل القاعدة بأمان وتشتغل بأنواع.', 'Change the database shape safely and work with types.'),
      learn: [
        L(B('migrations', 'Migrations'),
          B('**migration** = ملف SQL مرقّم بيغيّر شكل القاعدة (`003_add_phone_index.sql`). بتتحفظ في Git وبتتطبّق بالترتيب على كل بيئة (جهازك، الاختبار، الإنتاج) — وجدول بيسجّل اللي اتطبّق. محدش يعدّل الإنتاج بإيده. المثال ده runner صغير حقيقي:', 'A **migration** = a numbered SQL file changing the database shape (`003_add_phone_index.sql`). Kept in Git and applied in order to every environment (your machine, tests, production) — with a table recording what was applied. Nobody edits production by hand. This example is a small real runner:'),
          'import { DatabaseSync } from "node:sqlite";\nimport { readdirSync, readFileSync } from "node:fs";\nconst db = new DatabaseSync("shop.db");\ndb.exec("CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TEXT)");\nfunction migrate() {\n  const done = new Set(db.prepare("SELECT name FROM schema_migrations").all().map(r => r.name));\n  for (const file of readdirSync("migrations").filter(f => f.endsWith(".sql")).sort()) {\n    if (done.has(file)) continue;\n    db.exec("BEGIN");\n    try {\n      db.exec(readFileSync(`migrations/${file}`, "utf8"));\n      db.prepare("INSERT INTO schema_migrations VALUES (?, ?)").run(file, new Date().toISOString());\n      db.exec("COMMIT");\n      console.log("applied", file);\n    } catch (e) { db.exec("ROLLBACK"); throw new Error(`${file}: ${e.message}`); }\n  }\n}\nmigrate();\nmigrate();                                           // second run: nothing to do\nconsole.log(db.prepare("PRAGMA table_info(customers)").all().map(c => c.name).join(", "));', N({
            'migrations/001_customers.sql': 'CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL);\n',
            'migrations/002_orders.sql': 'CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER REFERENCES customers(id), total REAL CHECK (total >= 0));\n',
            'migrations/003_customer_phone.sql': 'ALTER TABLE customers ADD COLUMN phone TEXT;\nCREATE UNIQUE INDEX idx_customers_phone ON customers(phone);\n'
          })),
        L(B('ORM وquery builder', 'ORMs and query builders'),
          B('**orm** أو **query builder** (Drizzle، Kysely، Prisma) بيدّيك أنواع TypeScript من شكل القاعدة: `db.select().from(orders).where(eq(orders.status, "paid"))` — المحرر بيكمّل أسماء الأعمدة وtsc يرفض الغلط. **drizzle** قريب من SQL وخفيف. بس افهم SQL الأول — الأداة مش بديل للفهم.', 'An **orm** or **query builder** (Drizzle, Kysely, Prisma) gives you TypeScript types from the database shape: `db.select().from(orders).where(eq(orders.status, "paid"))` — the editor completes column names and tsc rejects mistakes. **drizzle** stays close to SQL and is light. But learn SQL first — the tool is no substitute for understanding.'),
          'import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";\nimport { eq, desc } from "drizzle-orm";\n\nexport const orders = pgTable("orders", {\n  id: serial("id").primaryKey(),\n  externalId: text("external_id").notNull().unique(),\n  status: text("status", { enum: ["new", "paid", "shipped"] }).notNull(),\n  total: numeric("total", { precision: 10, scale: 2 }).notNull(),\n  createdAt: timestamp("created_at").defaultNow(),\n});\n\nconst paid = await db.select().from(orders).where(eq(orders.status, "paid")).orderBy(desc(orders.createdAt)).limit(20);\n// paid: { id: number; externalId: string; status: "new" | "paid" | "shipped"; … }[]', S),
        L(B('النسخ الاحتياطي والبيئات', 'Backups and environments'),
          B('**backup** يومي آلي (`pg_dump` أو خدمة الاستضافة)، و**جرّب الاسترجاع** — نسخة محدش جرّب يرجّعها مش نسخة. وقاعدة لكل بيئة (dev، test، prod) بـ DATABASE_URL مختلف، ومتختبرش على الإنتاج أبدًا. وبيانات العملاء الحقيقية مكانها الإنتاج بس.', 'A daily automatic **backup** (`pg_dump` or the host’s service), and **test the restore** — a backup nobody has restored is not a backup. One database per environment (dev, test, prod) with different DATABASE_URLs, and never test on production. Real customer data belongs in production only.'),
          '# nightly (cron or an n8n Execute Command)\npg_dump "$DATABASE_URL" --format=custom --file="backups/shop-$(date +%F).dump"\nfind backups -name "*.dump" -mtime +14 -delete\n\n# monthly restore drill into a scratch database\ncreatedb shop_restore_test\npg_restore --dbname=shop_restore_test backups/shop-2026-10-04.dump\npsql shop_restore_test -c "SELECT COUNT(*) FROM orders;"', T)
      ],
      practice: [
        B('اعمل 3 migrations لمشروعك وشغّل الـ runner.', 'Write 3 migrations for your project and run the runner.'),
        B('ضيف عمود جديد بـ migration مش بإيدك.', 'Add a new column through a migration, not by hand.'),
        B('اكتب جدول Drizzle واستعلام بأنواع.', 'Write a Drizzle table and a typed query.'),
        B('اعمل backup واسترجعه في قاعدة تجربة.', 'Make a backup and restore it into a test database.')
      ],
      words: [
        W('migration', 'ملف مرقّم بيغيّر شكل القاعدة', 'a numbered file changing the database shape', 'Add the column in a migration.'),
        W('orm', 'أداة بتربط جداول القاعدة بكائنات الكود', 'a tool mapping tables to code objects', 'An ORM gives typed queries.'),
        W('query builder', 'أداة لبناء SQL بدوال وأنواع', 'a tool building SQL with functions and types', 'Kysely is a query builder.'),
        W('drizzle', 'ORM خفيف قريب من SQL لـ TypeScript', 'a light SQL-like ORM for TypeScript', 'Drizzle infers the row type.'),
        W('backup', 'نسخة احتياطية من البيانات', 'a safety copy of the data', 'Test restoring the backup.'),
        W('schema_migrations', 'جدول بيسجّل الـ migrations اللي اتطبقت', 'a table recording applied migrations', 'schema_migrations lists 003.')
      ],
      read: [{ lib: 'Drizzle ORM', what: B('اقرا Get started وMigrations.', 'Read Get started and Migrations.') }, { t: 'PostgreSQL: pg_dump', url: 'https://www.postgresql.org/docs/current/app-pgdump.html', what: B('اقرا Examples.', 'Read Examples.') }],
      challenge: B('خلّي «بوابة الطلبات» تشتغل بـ migrations (فولدر مرقّم + runner أو Drizzle Kit)، وDrizzle بأنواع في الاستعلامات، وbackup ليلي من n8n بيمسح الأقدم من 14 يوم، وتجربة استرجاع موثّقة في README.', 'Run the «orders gateway» on migrations (a numbered folder + a runner or Drizzle Kit), with typed Drizzle queries, a nightly backup from n8n deleting copies older than 14 days, and a documented restore drill in the README.'),
      quiz: [
        Q(B('عمود جديد في الإنتاج:', 'A new column in production:'), [['migration في Git', 'a migration in Git'], ['تعديل يدوي', 'a manual edit'], ['حذف الجدول', 'drop the table']], 0, B('كل البيئات.', 'Every environment.')),
        Q(B('runner شغّل migration مرتين:', 'A runner applying a migration twice:'), [['ميحصلش؛ schema_migrations', 'cannot happen; schema_migrations'], ['عادي', 'normal'], ['مطلوب', 'required']], 0, B('مرة واحدة.', 'Once.')),
        Q(B('backup محدش جرّب يسترجعه:', 'A backup nobody has restored:'), [['مش مضمون', 'is not trustworthy'], ['كفاية', 'is enough'], ['أحسن', 'is better']], 0, B('جرّب.', 'Test it.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('خدمة Node بقاعدة بيانات بمستوى إنتاج.', 'A Node service with a production-level database.'),
      review: [
        B('SQL: CREATE وINSERT وSELECT وWHERE وORDER وLIMIT.', 'SQL: CREATE, INSERT, SELECT, WHERE, ORDER and LIMIT.'),
        B('parameterized queries ضد الحقن، دايمًا.', 'Parameterized queries against injection, always.'),
        B('JOIN وGROUP BY وHAVING والفهارس وEXPLAIN.', 'JOIN, GROUP BY, HAVING, indexes and EXPLAIN.'),
        B('القيود والـ transactions والـ upsert.', 'Constraints, transactions and upserts.'),
        B('Postgres بـ pool وjsonb، وN+1، والـ migrations، وDrizzle، والـ backups.', 'Postgres with a pool and jsonb, N+1, migrations, Drizzle and backups.')
      ],
      project: B('ابني «قاعدة عمليات المتجر»: Postgres (أو SQLite محليًا) بـ migrations (customers، products، stock، orders، lines، webhook_events jsonb)؛ قيود UNIQUE/CHECK/FK؛ placeOrder بـ transaction؛ webhook upsert؛ 6 تقارير SQL بفهارس متحققة بـ EXPLAIN؛ endpoints في بوابة الطلبات بتستخدمها (من غير N+1)؛ Drizzle بأنواع؛ integration tests على قاعدة اختبار؛ وbackup ليلي من n8n بتجربة استرجاع.', 'Build the «shop operations database»: Postgres (or SQLite locally) with migrations (customers, products, stock, orders, lines, jsonb webhook_events); UNIQUE/CHECK/FK constraints; placeOrder in a transaction; webhook upserts; 6 SQL reports with EXPLAIN-verified indexes; orders-gateway endpoints using them (no N+1); typed Drizzle; integration tests on a test database; and a nightly backup from n8n with a restore drill.'),
      test: [
        Q(B('primary key:', 'A primary key:'), [['معرّف فريد', 'a unique identifier'], ['عمود اختياري', 'an optional column'], ['فهرس نصي', 'a text index']], 0, B('هوية.', 'Identity.')),
        Q(B('"WHERE name = \'" + input + "\'":', '"WHERE name = \'" + input + "\'":'), ['SQL injection', B('آمن', 'safe'), B('أسرع', 'faster')], 0, B('parameters.', 'Parameters.')),
        Q(B('عملاء بطلباتهم:', 'Customers with their orders:'), ['JOIN', 'UNION', 'LIMIT'], 0, B('ربط.', 'Linking.')),
        Q(B('الإيراد حسب المدينة:', 'Revenue by city:'), ['GROUP BY city + SUM', 'ORDER BY city', 'DISTINCT city'], 0, B('تجميع.', 'Aggregation.')),
        Q(B('WHERE مقابل HAVING:', 'WHERE vs HAVING:'), [['قبل/بعد التجميع', 'before/after grouping'], ['نفس الحاجة', 'the same'], ['HAVING قبل', 'HAVING first']], 0, B('ترتيب.', 'Order.')),
        Q(B('EXPLAIN بيقول SCAN على جدول كبير:', 'EXPLAIN shows a SCAN on a big table:'), [['فكّر في فهرس', 'consider an index'], ['تمام', 'fine'], ['امسح الجدول', 'drop the table']], 0, B('بطء.', 'Slowness.')),
        Q(B('تليفون مايتكررش:', 'A phone that never repeats:'), ['UNIQUE', 'CHECK', 'DEFAULT'], 0, B('قيد.', 'A constraint.')),
        Q(B('طلب + بنود + مخزون:', 'Order + lines + stock:'), ['transaction', B('3 أوامر منفصلة', '3 separate statements'), 'VIEW'], 0, B('كله أو مفيش.', 'All or nothing.')),
        Q(B('webhook متكرر:', 'A repeated webhook:'), ['upsert (ON CONFLICT)', 'INSERT', 'DELETE + INSERT'], 0, B('idempotent.', 'Idempotent.')),
        Q(B('اتصال لكل طلب في السيرفر:', 'A connection per request on the server:'), [['لأ؛ connection pool', 'no; a connection pool'], ['أيوه', 'yes'], ['ساعات', 'sometimes']], 0, B('إعادة استخدام.', 'Reuse.')),
        Q(B('loop باستعلام لكل عنصر:', 'A loop with one query per item:'), ['N+1', 'JOIN', 'index'], 0, B('بطيء.', 'Slow.')),
        Q(B('تغيير شكل القاعدة:', 'Changing the database shape:'), [['migration مرقّمة', 'a numbered migration'], ['تعديل يدوي', 'a manual edit'], ['ملف Excel', 'an Excel file']], 0, B('Git.', 'Git.'))
      ] }
  ]
};
