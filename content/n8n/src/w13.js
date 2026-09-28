// n8n week 13 — SQL and Postgres.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('SQL وPostgres', 'SQL and Postgres'),
  goal: B('تنقل البيانات من Sheets لقاعدة بيانات حقيقية: تكتب SQL (SELECT وJOIN وGROUP BY)، وتصمم جداول صح، وتستخدم Postgres node بأمان من غير SQL injection، وتوصل بقاعدة بيانات أونلاين.',
          'Move data from Sheets to a real database: write SQL (SELECT, JOIN, GROUP BY), design tables properly, use the Postgres node safely without SQL injection, and connect to a hosted database.'),
  days: [
    { title: B('أساسيات SQL', 'SQL basics'),
      goal: B('تعمل جدول، وتقرا منه بشروط وترتيب وحد.', 'Create a table and read from it with conditions, ordering and limits.'),
      learn: [
        { h: B('ليه قاعدة بيانات', 'Why a database'),
          p: B('Sheets كويس لحد مئات الصفوف. لما البيانات تكبر، أو محتاج علاقات بين جداول، أو أكتر من workflow بيكتبوا مع بعض، قاعدة البيانات أسرع وأأمن ومبتلخبطش.', 'Sheets is fine up to a few hundred rows. When data grows, you need relations between tables, or several workflows write at once, a database is faster, safer and more consistent.'),
          ex: 'Sheets: 500 rows, one writer\nPostgres: millions of rows, many writers, relations' },
        { h: B('CREATE وSELECT', 'CREATE and SELECT'),
          p: B('`CREATE TABLE` بيعمل الجدول بأعمدته وأنواعها. `SELECT columns FROM table WHERE condition` بيقرا. والكلمات الكبيرة عادة بس مش إجبارية.', '`CREATE TABLE` creates the table with its columns and types. `SELECT columns FROM table WHERE condition` reads. Uppercase keywords are a convention, not a rule.'),
          ex: 'CREATE TABLE leads (\n  id SERIAL PRIMARY KEY,\n  email TEXT NOT NULL,\n  status TEXT DEFAULT \'new\'\n);\nSELECT id, email FROM leads WHERE status = \'new\';' },
        { h: B('الترتيب والحد', 'Ordering and limits'),
          p: B('`ORDER BY created_at DESC` الأحدث الأول، `LIMIT 10` أول 10. والنصوص بين علامات تنصيص مفردة \' في SQL.', '`ORDER BY created_at DESC` newest first, `LIMIT 10` the first 10. In SQL, text goes in single quotes \'.'),
          ex: 'SELECT * FROM orders WHERE total > 1000 ORDER BY created_at DESC LIMIT 10;' }
      ],
      practice: [
        B('حل أول 6 دروس في SQLBolt.', 'Complete the first 6 SQLBolt lessons.'),
        B('اعمل جدول leads بـ 5 أعمدة (في Postgres محلي أو أونلاين).', 'Create a leads table with 5 columns (local or hosted Postgres).'),
        B('ضيف 10 صفوف واكتب 5 استعلامات SELECT مختلفة.', 'Insert 10 rows and write 5 different SELECT queries.'),
        B('اكتب نفس الاستعلامات بالإنجليزي في جملة لكل واحد.', 'Describe each query in one English sentence.')
      ],
      words: ['table / row / column', 'query', 'SELECT / WHERE',
        { t: 'ORDER BY / LIMIT', m: B('ترتيب النتايج وتحديد عددها', 'sorting results and limiting how many'), ex: 'ORDER BY total DESC LIMIT 5' },
        { t: 'CREATE TABLE', m: B('أمر بيعمل جدول جديد بأعمدته', 'a command that creates a new table with its columns'), ex: 'CREATE TABLE leads (…)' }],
      read: ['lib:SQLBolt', 'lib:PostgreSQL Tutorial (الرسمي)'],
      challenge: B('نقل شيت leads عندك لجدول Postgres (يدوي أو CSV import) واكتب 5 استعلامات بتجاوب على أسئلة حقيقية.', 'Move your leads sheet into a Postgres table (manually or via CSV import) and write 5 queries answering real questions.'),
      quiz: [
        { q: B('تقرا leads اللي status = new:', 'Read leads with status = new:'), o: ["SELECT * FROM leads WHERE status = 'new';", 'GET leads new', 'READ leads'], a: 0, why: B('SELECT + WHERE.', 'SELECT + WHERE.') },
        { q: B('النصوص في SQL بين:', 'Text in SQL goes between:'), o: [B("علامات تنصيص مفردة '", "single quotes '"), B('علامات مزدوجة "', 'double quotes "'), B('أقواس', 'brackets')], a: 0, why: B('"" للأسماء في Postgres.', '"" is for names in Postgres.') },
        { q: B('الأحدث الأول:', 'Newest first:'), o: ['ORDER BY created_at DESC', 'ORDER BY created_at ASC', 'LIMIT 1'], a: 0, why: B('DESC = تنازلي.', 'DESC = descending.') }
      ] },

    { title: B('JOIN وGROUP BY', 'JOIN and GROUP BY'),
      goal: B('تربط جداول ببعض، وتلخّص بالأرقام.', 'Link tables together and summarise with numbers.'),
      learn: [
        { h: B('العلاقات', 'Relations'),
          p: B('جدول customers فيه id (primary key)، وجدول orders فيه customer_id (foreign key بيشاور على customers.id). ده بيمنع التكرار: بيانات العميل مكتوبة مرة واحدة.', 'A customers table has id (the primary key), and an orders table has customer_id (a foreign key pointing to customers.id). This avoids repetition: customer data is written once.'),
          ex: 'customers(id, name, email)\norders(id, customer_id → customers.id, total)' },
        { h: B('JOIN', 'JOIN'),
          p: B('`JOIN` بيجيب البيانات المرتبطة في نتيجة واحدة. INNER JOIN = اللي ليه شريك بس، LEFT JOIN = كل الشمال حتى لو ملوش شريك.', '`JOIN` brings related data into one result. INNER JOIN = only matching pairs; LEFT JOIN = everything on the left even without a match.'),
          ex: 'SELECT c.name, o.total\nFROM orders o\nJOIN customers c ON c.id = o.customer_id;' },
        { h: B('GROUP BY', 'GROUP BY'),
          p: B('`GROUP BY` بيجمّع، ومعاه COUNT وSUM وAVG وMAX. وHAVING شرط بعد التجميع.', '`GROUP BY` groups rows, with COUNT, SUM, AVG and MAX. HAVING filters after grouping.'),
          ex: 'SELECT customer_id, COUNT(*) AS orders, SUM(total) AS spent\nFROM orders GROUP BY customer_id HAVING SUM(total) > 5000;' }
      ],
      practice: [
        B('اعمل جدولين customers وorders بعلاقة.', 'Create customers and orders tables with a relation.'),
        B('اكتب JOIN يجيب اسم العميل مع كل طلب.', 'Write a JOIN that returns the customer name with each order.'),
        B('اكتب GROUP BY: عدد ومجموع طلبات كل عميل.', 'Write a GROUP BY: each customer\'s order count and total.'),
        B('اكتب LEFT JOIN يطلع العملاء اللي مالهمش طلبات.', 'Write a LEFT JOIN that finds customers without orders.')
      ],
      words: ['JOIN', 'GROUP BY', 'primary key', 'foreign key',
        { t: 'COUNT / SUM / AVG', m: B('دوال تجميع: عدد، مجموع، متوسط', 'aggregate functions: count, sum, average'), ex: 'SUM(total) AS spent' }],
      read: ['lib:Select Star SQL', 'lib:SQLZoo'],
      challenge: B('اكتب 5 استعلامات «business questions»: أعلى 5 عملاء، مبيعات كل شهر، متوسط الطلب، العملاء اللي مطلبوش من 60 يوم، المنتج الأكتر مبيعًا.', 'Write 5 "business question" queries: the top 5 customers, sales per month, the average order, customers with no order in 60 days, and the best-selling product.'),
      quiz: [
        { q: B('العملاء اللي مالهمش طلبات:', 'Customers without orders:'), o: ['LEFT JOIN … WHERE o.id IS NULL', 'INNER JOIN', 'GROUP BY'], a: 0, why: B('LEFT بيسيب الشمال كله.', 'LEFT keeps all of the left.') },
        { q: B('foreign key هو:', 'A foreign key is:'), o: [B('عمود بيشاور على id في جدول تاني', 'a column pointing to an id in another table'), B('باسورد', 'a password'), B('أول عمود', 'the first column')], a: 0, why: B('علاقة.', 'A relation.') },
        { q: B('شرط بعد التجميع:', 'A condition after grouping:'), o: ['HAVING', 'WHERE', 'ORDER BY'], a: 0, why: B('WHERE قبل التجميع.', 'WHERE is before grouping.') }
      ] },

    { title: B('Postgres node بأمان', 'The Postgres node, safely'),
      goal: B('تقرا وتكتب في Postgres من n8n بالعمليات الجاهزة أو SQL بـ parameters.', 'Read and write Postgres from n8n with the ready operations or parameterised SQL.'),
      learn: [
        { h: B('العمليات الجاهزة', 'Ready operations'),
          p: B('Postgres node فيه Select وInsert وInsert or Update (upsert) وUpdate وDelete وExecute Query. استخدم الجاهز لما يكفي؛ أبسط وأأمن.', 'The Postgres node offers Select, Insert, Insert or Update (upsert), Update, Delete and Execute Query. Use the ready ones when they\'re enough; simpler and safer.'),
          ex: 'Insert or Update → table: leads → match column: email' },
        { h: B('SQL injection', 'SQL injection'),
          p: B('متكتبش قيم المستخدم جوه الـ SQL مباشرة: `WHERE email = \'{{ $json.email }}\'` خطر. استخدم Query Parameters: `$1` في الـ SQL والقيمة في Options.', 'Never put user values straight into SQL: `WHERE email = \'{{ $json.email }}\'` is dangerous. Use query parameters: `$1` in the SQL and the value in Options.'),
          ex: 'SELECT * FROM leads WHERE email = $1;\nQuery Parameters: {{ $json.email }}' },
        { h: B('RETURNING', 'RETURNING'),
          p: B('`INSERT … RETURNING id` بيرجّعلك الـ id الجديد على طول عشان تستخدمه في الخطوة اللي بعدها.', '`INSERT … RETURNING id` returns the new id immediately so the next step can use it.'),
          ex: 'INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING id;' }
      ],
      practice: [
        B('اعمل Postgres credential ووصّل.', 'Create a Postgres credential and connect.'),
        B('Insert or Update لـ leads من webhook بالإيميل.', 'Insert or Update leads from a webhook, matching on email.'),
        B('اكتب Execute Query بـ $1 و$2.', 'Write an Execute Query using $1 and $2.'),
        B('جرّب SQL injection على نسخة غلط (في جدول تجربة) وشوف ليه خطر، وبعدين صلّحها بـ parameters.', 'Try an SQL injection on an unsafe version (in a test table) to see the danger, then fix it with parameters.')
      ],
      words: ['Postgres node', 'SQL injection',
        { t: 'query parameters ($1)', m: B('أماكن في الـ SQL بتتملى بقيم بأمان', 'placeholders in SQL filled with values safely'), ex: 'WHERE email = $1' },
        { t: 'Insert or Update (Postgres)', m: B('upsert: يضيف أو يحدّث حسب عمود مطابقة', 'upsert: insert or update by a match column'), ex: 'Match on email' },
        { t: 'RETURNING', m: B('يرجّع أعمدة من الصف اللي اتضاف أو اتعدّل', 'returns columns from the inserted or updated row'), ex: 'RETURNING id' }],
      read: [{ t: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', what: B('اقرا عن Injection.', 'Read about Injection.') }, 'lib:PostgreSQL Exercises'],
      challenge: B('حوّل «mini CRM» بتاع الأسبوع 5 من Sheets لـ Postgres: upsert بالإيميل، وكل الاستعلامات بـ parameters، وتقرير أسبوعي بـ GROUP BY.', 'Move the week-5 "mini CRM" from Sheets to Postgres: upsert by email, every query parameterised, and a weekly report with GROUP BY.'),
      quiz: [
        { q: B('الطريقة الآمنة:', 'The safe way:'), o: ['WHERE email = $1 + parameter', "WHERE email = '{{ $json.email }}'", 'no WHERE'], a: 0, why: B('parameters بتمنع injection.', 'Parameters prevent injection.') },
        { q: B('تاخد الـ id الجديد بعد INSERT:', 'Get the new id after an INSERT:'), o: ['RETURNING id', 'SELECT LAST', 'GET id'], a: 0, why: B('Postgres.', 'Postgres.') },
        { q: B('تضيف أو تحدّث حسب الإيميل:', 'Insert or update by email:'), o: ['Insert or Update', 'Delete', 'Select'], a: 0, why: B('upsert.', 'upsert.') }
      ] },

    { title: B('تصميم الجداول', 'Designing tables'),
      goal: B('تصمم جداول نظيفة بأنواع وقيود صح عشان البيانات تفضل سليمة.', 'Design clean tables with the right types and constraints so data stays sound.'),
      learn: [
        { h: B('الأنواع', 'Types'),
          p: B('TEXT للنصوص، INTEGER/BIGINT للأعداد، NUMERIC(10,2) للفلوس (مش FLOAT)، BOOLEAN، TIMESTAMPTZ للوقت بالتوقيت، JSONB لبيانات مرنة.', 'TEXT for text, INTEGER/BIGINT for counts, NUMERIC(10,2) for money (not FLOAT), BOOLEAN, TIMESTAMPTZ for time with timezone, JSONB for flexible data.'),
          ex: 'total NUMERIC(10,2) NOT NULL,\ncreated_at TIMESTAMPTZ DEFAULT now(),\nraw JSONB' },
        { h: B('القيود', 'Constraints'),
          p: B('NOT NULL (لازم قيمة)، UNIQUE (مفيش تكرار، زي الإيميل)، CHECK (total >= 0)، وDEFAULT. القاعدة بترفض البيانات الغلط قبل ما تدخل.', 'NOT NULL (a value is required), UNIQUE (no duplicates, like email), CHECK (total >= 0), and DEFAULT. The database rejects bad data before it gets in.'),
          ex: 'email TEXT NOT NULL UNIQUE,\nqty INTEGER CHECK (qty > 0)' },
        { h: B('index', 'Indexes'),
          p: B('index على العمود اللي بتدوّر بيه كتير (email، created_at) بيخلّي البحث أسرع جدًا. الـ UNIQUE بيعمل index لوحده.', 'An index on a column you search often (email, created_at) makes lookups much faster. UNIQUE creates an index automatically.'),
          ex: 'CREATE INDEX idx_orders_created ON orders (created_at);' }
      ],
      practice: [
        B('صمم 3 جداول لنظام طلبات (customers، products، orders) بأنواع وقيود.', 'Design 3 tables for an order system (customers, products, orders) with types and constraints.'),
        B('حاول تدخّل بيانات غلط (إيميل مكرر، كمية سالبة) وشوف الرفض.', 'Try inserting bad data (a duplicate email, a negative quantity) and see it rejected.'),
        B('ضيف index على created_at.', 'Add an index on created_at.'),
        B('اكتب الـ schema في ملف schema.sql في Git.', 'Save the schema in a schema.sql file in Git.')
      ],
      words: [
        { t: 'NOT NULL', m: B('العمود لازم فيه قيمة', 'the column must have a value'), ex: 'email TEXT NOT NULL' },
        { t: 'UNIQUE constraint', m: B('مينفعش قيمتين متكررين في العمود', 'no two rows may share the value'), ex: 'email TEXT UNIQUE' },
        { t: 'NUMERIC (money)', m: B('نوع أرقام دقيق للفلوس', 'an exact number type for money'), ex: 'total NUMERIC(10,2)' },
        { t: 'TIMESTAMPTZ', m: B('وقت وتاريخ بالتوقيت', 'a date and time with timezone'), ex: 'created_at TIMESTAMPTZ DEFAULT now()' },
        { t: 'index (SQL)', m: B('فهرس بيسرّع البحث في عمود', 'a structure that speeds up searching a column'), ex: 'CREATE INDEX … ON orders (email);' }],
      read: ['lib:PostgreSQL Tutorial (الرسمي)'],
      challenge: B('صمم قاعدة بيانات لـ «booking system» (العملاء، الخدمات، المواعيد) بقيود تمنع حجز نفس الميعاد مرتين، واكتب schema.sql وREADME.', 'Design a database for a "booking system" (customers, services, appointments) with constraints preventing double-booking a slot, and write schema.sql and a README.'),
      quiz: [
        { q: B('للفلوس:', 'For money:'), o: ['NUMERIC(10,2)', 'FLOAT', 'TEXT'], a: 0, why: B('دقيق.', 'Exact.') },
        { q: B('تمنع إيميل مكرر:', 'Prevent duplicate emails:'), o: ['UNIQUE', 'INDEX only', 'DEFAULT'], a: 0, why: B('قيد.', 'A constraint.') },
        { q: B('index بيعمل:', 'An index:'), o: [B('يسرّع البحث', 'speeds up lookups'), B('يمسح بيانات', 'deletes data'), B('يشفّر', 'encrypts')], a: 0, why: B('فهرس.', 'An index.') }
      ] },

    { title: B('قاعدة بيانات أونلاين والنسخ', 'Hosted databases and backups'),
      goal: B('توصل n8n بقاعدة Postgres أونلاين، وتعمل transactions، وتاخد نسخ احتياطي.', 'Connect n8n to a hosted Postgres, use transactions, and take backups.'),
      learn: [
        { h: B('Postgres أونلاين', 'Hosted Postgres'),
          p: B('خدمات زي Supabase وNeon بتديك Postgres مجاني للبداية. بتاخد host وport وuser وpassword وdatabase (أو connection string) وغالبًا SSL لازم.', 'Services such as Supabase and Neon give you free Postgres to start. You get a host, port, user, password and database (or a connection string), and SSL is usually required.'),
          ex: 'postgresql://user:pass@host:5432/db?sslmode=require' },
        { h: B('transactions', 'Transactions'),
          p: B('لو لازم خطوتين يحصلوا مع بعض أو ولا واحدة (تخصم من المخزن وتعمل الطلب)، حطهم في transaction: BEGIN … COMMIT، ولو فيه خطأ ROLLBACK.', 'If two steps must both happen or neither (reduce stock and create the order), put them in a transaction: BEGIN … COMMIT, and ROLLBACK on error.'),
          ex: 'BEGIN;\nUPDATE products SET stock = stock - 1 WHERE id = $1;\nINSERT INTO orders (product_id) VALUES ($1);\nCOMMIT;' },
        { h: B('النسخ الاحتياطي والـ migrations', 'Backups and migrations'),
          p: B('`pg_dump` بياخد نسخة كاملة. وأي تغيير في الجداول اكتبه في ملف migration مرقّم (001_create_leads.sql) في Git، عشان تعرف تبني القاعدة من الأول.', '`pg_dump` takes a full copy. Write every table change as a numbered migration file (001_create_leads.sql) in Git so you can rebuild the database from scratch.'),
          ex: 'migrations/\n  001_create_leads.sql\n  002_add_status_to_leads.sql' }
      ],
      practice: [
        B('اعمل Postgres مجاني أونلاين ووصّله بـ n8n.', 'Create a free hosted Postgres and connect n8n to it.'),
        B('اعمل transaction بخطوتين وجرّب تفشّل التانية وشوف الأولى اترجعت.', 'Run a two-step transaction, make the second fail, and see the first rolled back.'),
        B('خد نسخة بـ pg_dump (أو من لوحة الخدمة).', 'Take a copy with pg_dump (or from the service dashboard).'),
        B('اكتب أول 2 migrations لمشروعك.', 'Write the first 2 migrations for your project.')
      ],
      words: [
        { t: 'connection string', m: B('سطر واحد فيه كل بيانات الاتصال بالقاعدة', 'one line holding all the database connection details'), ex: 'postgresql://user:pass@host:5432/db' },
        { t: 'SSL mode', m: B('إعداد تشفير الاتصال بالقاعدة', 'the setting for encrypting the database connection'), ex: 'sslmode=require' },
        { t: 'BEGIN / COMMIT / ROLLBACK', m: B('بداية transaction وتأكيدها أو إلغاؤها', 'start a transaction, confirm it, or undo it'), ex: 'ROLLBACK on error' },
        { t: 'pg_dump', m: B('أداة بتاخد نسخة احتياطية من Postgres', 'a tool that backs up a Postgres database'), ex: 'pg_dump mydb > backup.sql' },
        { t: 'migration (schema)', m: B('ملف بيغيّر شكل الجداول بترتيب', 'a file that changes the table structure in order'), ex: '002_add_status.sql' }],
      read: ['lib:PostgreSQL Tutorial (الرسمي)', { t: 'DigitalOcean Tutorials', url: 'https://www.digitalocean.com/community/tutorials', what: B('دوّر على «How To Backup PostgreSQL» واقراه.', 'Search for "How To Backup PostgreSQL" and read it.') }],
      challenge: B('اعمل workflow بيعمل نسخة احتياطية أسبوعية لقاعدة البيانات (pg_dump أو تصدير جداول CSV) ويرفعها لمكان آمن ويبعتلك تأكيد.', 'Build a workflow that takes a weekly database backup (pg_dump or table CSV exports), uploads it somewhere safe, and sends you a confirmation.'),
      quiz: [
        { q: B('خطوتين لازم يحصلوا مع بعض:', 'Two steps that must happen together:'), o: ['transaction', 'two workflows', 'Wait'], a: 0, why: B('كلهم أو ولا حاجة.', 'All or nothing.') },
        { q: B('sslmode=require معناها:', 'sslmode=require means:'), o: [B('الاتصال لازم يبقى مشفّر', 'the connection must be encrypted'), B('من غير باسورد', 'no password'), B('قراءة بس', 'read-only')], a: 0, why: B('تشفير.', 'Encryption.') },
        { q: B('تغييرات الجداول تتحفظ في:', 'Table changes are saved in:'), o: [B('ملفات migrations في Git', 'migration files in Git'), B('ذاكرتك', 'your memory'), B('Sheet', 'a sheet')], a: 0, why: B('تقدر تعيد البناء.', 'So you can rebuild.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 14 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 14 opens when you score 70% or more.'),
      review: [
        B('CREATE وSELECT وWHERE وORDER BY وLIMIT.', 'CREATE, SELECT, WHERE, ORDER BY and LIMIT.'),
        B('العلاقات وJOIN وGROUP BY وHAVING.', 'Relations, JOIN, GROUP BY and HAVING.'),
        B('Postgres node والعمليات الجاهزة و$1 وRETURNING.', 'The Postgres node, ready operations, $1 and RETURNING.'),
        B('الأنواع والقيود والـ index.', 'Types, constraints and indexes.'),
        B('Postgres أونلاين وtransactions والنسخ والـ migrations.', 'Hosted Postgres, transactions, backups and migrations.')
      ],
      project: B('ابني «orders database» كاملة: schema بـ 3 جداول وقيود، وmigrations في Git، وwebhook بيضيف طلب في transaction (يخصم المخزن ويعمل الطلب)، وكل الاستعلامات بـ parameters، وتقرير يومي بـ JOIN وGROUP BY على Telegram، ونسخة احتياطية أسبوعية.',
                 'Build a complete "orders database": a schema of 3 tables with constraints, migrations in Git, a webhook that adds an order inside a transaction (reducing stock and creating the order), every query parameterised, a daily JOIN/GROUP BY report on Telegram, and a weekly backup.'),
      test: [
        { q: B('أول 5 طلبات أكبر مبلغ:', 'The 5 largest orders:'), o: ['ORDER BY total DESC LIMIT 5', 'LIMIT 5 ORDER BY total', 'TOP total 5'], a: 0, why: B('رتّب وحدّد.', 'Sort and limit.') },
        { q: B('عدد طلبات كل عميل:', 'Each customer\'s order count:'), o: ['GROUP BY customer_id + COUNT(*)', 'JOIN only', 'WHERE COUNT'], a: 0, why: B('تجميع.', 'Grouping.') },
        { q: B('INNER JOIN بيرجّع:', 'INNER JOIN returns:'), o: [B('اللي ليه شريك في الجدولين', 'rows with a match in both tables'), B('كل حاجة', 'everything'), B('ولا حاجة', 'nothing')], a: 0, why: B('التقاطع.', 'The intersection.') },
        { q: B("`WHERE email = '{{ $json.email }}'`:", "`WHERE email = '{{ $json.email }}'`:"), o: [B('خطر SQL injection', 'an SQL injection risk'), B('آمن', 'safe'), B('أسرع', 'faster')], a: 0, why: B('استخدم $1.', 'Use $1.') },
        { q: B('Postgres node تضيف أو تحدّث:', 'In the Postgres node, add or update:'), o: ['Insert or Update', 'Execute Query only', 'Select'], a: 0, why: B('upsert.', 'upsert.') },
        { q: B('الـ id الجديد بعد الإضافة:', 'The new id after inserting:'), o: ['RETURNING id', 'NEW id', 'LAST_ID()'], a: 0, why: B('Postgres.', 'Postgres.') },
        { q: B('نوع للوقت بالتوقيت:', 'A type for time with timezone:'), o: ['TIMESTAMPTZ', 'TEXT', 'INTEGER'], a: 0, why: B('with time zone.', 'with time zone.') },
        { q: B('CHECK (qty > 0) بيعمل:', 'CHECK (qty > 0):'), o: [B('يرفض كمية صفر أو سالبة', 'rejects zero or negative quantities'), B('يعدّ', 'counts'), B('يرتّب', 'sorts')], a: 0, why: B('قيد.', 'A constraint.') },
        { q: B('البحث بالإيميل بطيء في جدول كبير:', 'Searching by email is slow on a big table:'), o: [B('index على email', 'an index on email'), B('LIMIT', 'LIMIT'), B('Wait', 'a Wait')], a: 0, why: B('فهرس.', 'An index.') },
        { q: B('ROLLBACK بيعمل:', 'ROLLBACK:'), o: [B('يلغي كل خطوات الـ transaction', 'undoes every step of the transaction'), B('يأكّد', 'confirms'), B('ينسخ', 'copies')], a: 0, why: B('رجوع.', 'Undo.') },
        { q: B('نسخة احتياطية من Postgres:', 'A Postgres backup:'), o: ['pg_dump', 'SELECT *', 'DROP'], a: 0, why: B('أداة النسخ.', 'The backup tool.') },
        { q: B('ليه migrations في Git؟', 'Why migrations in Git?'), o: [B('تقدر تبني القاعدة من الأول بنفس الشكل', 'to rebuild the database the same way'), B('للزينة', 'for decoration'), B('إجباري', 'required')], a: 0, why: B('تاريخ التغييرات.', 'A history of changes.') }
      ] }
  ]
};
