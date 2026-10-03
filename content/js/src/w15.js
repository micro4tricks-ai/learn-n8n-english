// JavaScript week 15 — modules, npm and tooling.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = files => (files ? { node: 1, files } : { node: 1 });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الوحدات وnpm والأدوات', 'Modules, npm and tooling'),
  goal: B('تقسّم الكود لملفات بـ import/export، وتستخدم npm صح (الإصدارات، الـ lockfile، الـ scripts)، وتدير الإعدادات والأسرار بـ .env، وتعرف الأدوات الحديثة (Vite وأدوات Node المدمجة)، وتختار المكتبات بأمان.',
          'Split code into files with import/export, use npm properly (versions, the lockfile, scripts), manage settings and secrets with .env, know the modern tools (Vite and Node’s built-in tools), and choose packages safely.'),
  days: [
    { title: B('الوحدات: import وexport', 'Modules: import and export'),
      goal: B('تقسّم برنامجك لملفات صغيرة واضحة.', 'Split your program into small, clear files.'),
      learn: [
        L(B('named وdefault', 'Named and default'),
          B('كل ملف **es module** ليه **module scope** خاص بيه: اللي جواه مش بيظهر برة إلا لو عملتله `export`. **named export** (`export function total`) تستورده بنفس الاسم بين `{}`، و**default export** (`export default`) واحد بس في الملف وتسمّيه زي ما تحب. المثال ده بيشتغل فعلًا بـ 3 ملفات:', 'Each **es module** file has its own **module scope**: nothing inside is visible outside unless you `export` it. A **named export** (`export function total`) is imported by the same name inside `{}`, and a **default export** (`export default`) is one per file and you name it as you like. This example really runs with 3 files:'),
          'import formatEGP, { total, VAT } from "./money.mjs";\nimport * as orders from "./orders.mjs";\n\nconst list = orders.sample();\nconsole.log("VAT rate", VAT);\nconsole.log("total", formatEGP(total(list)));\nconsole.log("with VAT", formatEGP(total(list) * (1 + VAT)));', N({
            'money.mjs': 'export const VAT = 0.14;\nexport function total(items) { return items.reduce((s, i) => s + i.price * i.qty, 0); }\nexport default function formatEGP(n) { return n.toFixed(2) + " EGP"; }\n',
            'orders.mjs': 'export function sample() { return [{ name: "Notebook", price: 45, qty: 2 }, { name: "Pen", price: 12.5, qty: 4 }]; }\n'
          })),
        L(B('ESM وCommonJS', 'ESM and CommonJS'),
          B('Node عنده نظامين: **commonjs** القديم (`require` و`module.exports`) و ESM الحديث (`import`/`export`). Node بيعتبر الملف ESM لو امتداده `.mjs` أو الـ package.json فيه `"type": "module"`. للمشاريع الجديدة: ESM. وهتقابل CommonJS في كود قديم وفي Code node بتاع n8n (`require` لمكتبات مسموحة).', 'Node has two systems: the old **commonjs** (`require` and `module.exports`) and modern ESM (`import`/`export`). Node treats a file as ESM if it ends in `.mjs` or package.json has `"type": "module"`. For new projects: ESM. You will meet CommonJS in old code and in the n8n Code node (`require` for allowed libraries).'),
          '// CommonJS (old style, .cjs or no "type": "module")\nconst { readFile } = require("node:fs/promises");\nmodule.exports = { total };\n\n// ES modules (new style, .mjs or "type": "module")\nimport { readFile } from "node:fs/promises";\nexport { total };', T),
        L(B('import ديناميكي', 'Dynamic import'),
          B('`import("./file.mjs")` بيرجّع Promise بالموديول — يعني تحمّل كود **وقت الحاجة**: مكتبة تقيلة للـ PDF بس لما المستخدم يدوس «تصدير»، أو plugin حسب الإعدادات. ده **dynamic import**، وبيقلل وقت فتح الصفحة.', '`import("./file.mjs")` returns a promise of the module — so you load code **when needed**: a heavy PDF library only when the user clicks «export», or a plugin chosen by settings. That is a **dynamic import**, and it cuts page start-up time.'),
          'const format = process.argv[2] ?? "csv";\nconst exporter = await import(`./exporters/${format}.mjs`);   // loaded only now\nconsole.log(exporter.run([{ id: 1, total: 90 }, { id: 2, total: 45.5 }]));', Object.assign(N({
            'exporters/csv.mjs': 'export const run = rows => ["id,total", ...rows.map(r => `${r.id},${r.total}`)].join("\\n");\n',
            'exporters/json.mjs': 'export const run = rows => JSON.stringify(rows);\n'
          }), { args: ['json'] }))
      ],
      practice: [
        B('قسّم مشروع الشهر التالت لـ 3 موديولات.', 'Split the month 3 project into 3 modules.'),
        B('شغّل مثال dynamic import بـ csv وjson.', 'Run the dynamic import example with csv and json.'),
        B('حوّل ملف CommonJS قديم لـ ESM.', 'Convert an old CommonJS file to ESM.'),
        B('جرّب تستورد اسم مش متصدّر وشوف الخطأ.', 'Try importing a name that is not exported and read the error.')
      ],
      words: [
        W('es module', 'ملف JS بـ import/export', 'a JS file using import/export', 'Every file is an ES module.'),
        W('module scope', 'نطاق خاص بكل ملف', 'the private scope of each file', 'Variables stay in module scope.'),
        W('named export', 'تصدير باسم محدد', 'an export with a fixed name', 'Import the named export in braces.'),
        W('default export', 'التصدير الأساسي للملف', 'the main export of a file', 'A file has at most one default export.'),
        W('commonjs', 'نظام الموديولات القديم في Node', 'Node’s old module system', 'CommonJS uses require.'),
        W('dynamic import', 'تحميل موديول وقت التشغيل', 'loading a module at run time', 'Use a dynamic import for the PDF library.')
      ],
      read: [{ t: 'MDN: JavaScript modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', what: B('اقرا Exporting وImporting وDynamic module loading.', 'Read Exporting, Importing and Dynamic module loading.') }, { lib: 'javascript.info: Promises, async/await', what: B('اقرا فصل Modules في الجزء الأول من الموقع.', 'Read the Modules chapter in part one of the site.') }],
      challenge: B('اعمل مشروع Node صغير بـ 4 موديولات (data، money، report، main) وexport/import واضح، وexporter بيتحمّل ديناميكيًا حسب argument.', 'Build a small Node project with 4 modules (data, money, report, main) with clear export/import, and an exporter loaded dynamically from an argument.'),
      quiz: [
        Q(B('عدد الـ default export في الملف:', 'Default exports per file:'), [['واحد بالكتير', 'at most one'], ['أي عدد', 'any number'], ['لازم اتنين', 'exactly two']], 0, B('والـ named بلا حدود.', 'Named ones are unlimited.')),
        Q(B('Node يعتبر .js ملف ESM لو:', 'Node treats .js as ESM when:'), ['"type": "module"', '"main": "index.js"', B('دايمًا', 'always')], 0, B('في package.json.', 'In package.json.')),
        Q(B('import("./x.mjs") بيرجّع:', 'import("./x.mjs") returns:'), ['Promise', 'string', 'undefined'], 0, B('ديناميكي.', 'Dynamic.'))
      ] },

    { title: B('npm وpackage.json', 'npm and package.json'),
      goal: B('تضيف مكتبات وتتحكم في إصداراتها.', 'Add packages and control their versions.'),
      learn: [
        L(B('package.json', 'package.json'),
          B('`npm init -y` بيعمل **package.json**: اسم المشروع، الـ scripts، والمكتبات. **dependency** = محتاجها وقت التشغيل (`npm i luxon`)، و**devdependency** = للتطوير بس (`npm i -D vitest`). المكتبات بتنزل في **node_modules** — اللي **مبيتحطش في Git** أبدًا.', '`npm init -y` creates **package.json**: the project name, scripts and packages. A **dependency** is needed at run time (`npm i luxon`), a **devdependency** only for development (`npm i -D vitest`). Packages land in **node_modules** — which **never goes into Git**.'),
          '{\n  "name": "orders-bot",\n  "type": "module",\n  "scripts": {\n    "start": "node src/main.mjs",\n    "dev": "node --watch src/main.mjs",\n    "test": "node --test"\n  },\n  "dependencies": { "luxon": "^3.5.0" },\n  "devDependencies": { "vitest": "^3.2.0" }\n}', T),
        L(B('semver: ^ و~', 'semver: ^ and ~'),
          B('**semver** = MAJOR.MINOR.PATCH: الـ PATCH إصلاحات، الـ MINOR مميزات جديدة متوافقة، والـ MAJOR ممكن يكسر كودك. **caret range** `^3.5.0` = أي 3.x.x ≥ 3.5.0؛ **tilde range** `~3.5.0` = 3.5.x بس. الكود ده بيحسب بنفسه:', '**semver** = MAJOR.MINOR.PATCH: PATCH is fixes, MINOR adds compatible features, and MAJOR may break your code. A **caret range** `^3.5.0` = any 3.x.x ≥ 3.5.0; a **tilde range** `~3.5.0` = only 3.5.x. This code works it out itself:'),
          'const parse = v => v.split(".").map(Number);\nconst gte = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];\nfunction satisfies(version, range) {\n  const v = parse(version), base = parse(range.slice(1));\n  if (gte(v, base) < 0) return false;\n  if (range[0] === "^") return v[0] === base[0];\n  if (range[0] === "~") return v[0] === base[0] && v[1] === base[1];\n  return gte(v, base) === 0;\n}\nfor (const v of ["3.5.0", "3.5.9", "3.9.1", "4.0.0", "3.4.9"])\n  console.log(v.padEnd(6), "^3.5.0:", satisfies(v, "^3.5.0"), " ~3.5.0:", satisfies(v, "~3.5.0"));', N()),
        L(B('الـ lockfile وnpm ci', 'The lockfile and npm ci'),
          B('`^3.5.0` ممكن يجيب 3.5.0 النهارده و3.9.1 بكره. **package-lock.json** بيسجّل الإصدار **بالظبط** لكل مكتبة (وكل مكتباتها: **transitive dependency**). احفظه في Git، وعلى السيرفر وفي CI استخدم **npm ci**: بيثبّت اللي في الـ lockfile بالظبط وبيفشل لو مش متطابق مع package.json.', '`^3.5.0` may install 3.5.0 today and 3.9.1 tomorrow. **package-lock.json** records the **exact** version of every package (and all of theirs: each **transitive dependency**). Commit it, and on servers and in CI use **npm ci**: it installs exactly what the lockfile says and fails if it does not match package.json.'),
          'npm i luxon            # add a dependency (updates package.json + package-lock.json)\nnpm i -D vitest        # add a dev dependency\nnpm ci                 # clean, exact install from the lockfile (CI, servers)\nnpm outdated           # what has newer versions\nnpm update             # update within the allowed ranges\nnpm ls luxon           # who depends on what', T)
      ],
      practice: [
        B('اعمل مشروع جديد بـ npm init -y وضيف "type": "module".', 'Create a project with npm init -y and add "type": "module".'),
        B('ثبّت luxon واستخدمه لتنسيق تاريخ.', 'Install luxon and use it to format a date.'),
        B('شغّل مثال semver وضيف حالة ~.', 'Run the semver example and add a ~ case.'),
        B('امسح node_modules وثبّت بـ npm ci.', 'Delete node_modules and reinstall with npm ci.')
      ],
      words: [
        W('npm', 'مدير حزم Node', 'Node’s package manager', 'Install it with npm.'),
        W('dependency', 'مكتبة البرنامج محتاجها', 'a package the program needs', 'luxon is a dependency.'),
        W('devdependency', 'مكتبة للتطوير بس', 'a package needed only for development', 'vitest is a devDependency.'),
        W('node_modules', 'فولدر المكتبات المتثبتة', 'the folder of installed packages', 'Never commit node_modules.'),
        W('semver', 'نظام أرقام الإصدارات', 'the version numbering scheme', 'A semver major bump may break you.'),
        W('caret range', 'نطاق ^ بيسمح بالـ minor والـ patch', 'a ^ range allowing minor and patch updates', 'A caret range accepts 3.9.0.'),
        W('tilde range', 'نطاق ~ بيسمح بالـ patch بس', 'a ~ range allowing patch updates only', 'Use a tilde range for risky packages.'),
        W('package-lock.json', 'ملف بيثبّت الإصدارات بالظبط', 'a file pinning exact versions', 'Commit package-lock.json.'),
        W('transitive dependency', 'مكتبة جاية مع مكتبة تانية', 'a package pulled in by another package', 'The bug was in a transitive dependency.'),
        W('npm ci', 'تثبيت مطابق للـ lockfile', 'an install matching the lockfile exactly', 'CI runs npm ci.')
      ],
      read: [{ lib: 'npm Docs', what: B('اقرا About semantic versioning وpackage-lock.json.', 'Read About semantic versioning and package-lock.json.') }, { t: 'npm semver calculator', url: 'https://semver.npmjs.com/', what: B('جرّب نطاقات على مكتبة حقيقية.', 'Try ranges on a real package.') }],
      challenge: B('اعمل مشروع بـ luxon وdependency تاني، وارفعه على GitHub من غير node_modules (بـ .gitignore)، واستنسخه في فولدر تاني وشغّله بـ npm ci.', 'Make a project with luxon and one more dependency, push it to GitHub without node_modules (via .gitignore), clone it into another folder and run it with npm ci.'),
      quiz: [
        Q(B('^3.5.0 بيقبل 4.0.0؟', 'Does ^3.5.0 accept 4.0.0?'), [['لأ', 'no'], ['أيوه', 'yes'], ['ساعات', 'sometimes']], 0, B('نفس الـ major.', 'Same major.')),
        Q(B('مكان node_modules:', 'Where node_modules goes:'), [['.gitignore', '.gitignore'], ['Git', 'Git'], ['README', 'README']], 0, B('بيتعمل من الـ lockfile.', 'Rebuilt from the lockfile.')),
        Q(B('على السيرفر:', 'On the server:'), ['npm ci', 'npm update', 'npm i latest'], 0, B('مطابق.', 'Exact.'))
      ] },

    { title: B('الـ scripts والإعدادات وملف .env', 'Scripts, settings and .env'),
      goal: B('تشغّل مشروعك بأوامر ثابتة وتفصل الإعدادات عن الكود.', 'Run your project with fixed commands and keep settings out of the code.'),
      learn: [
        L(B('npm scripts وnpx', 'npm scripts and npx'),
          B('**npm script** في package.json = أمر ليه اسم: `npm start`، `npm run dev`، `npm test`. كل الفريق (وCI) يشغّل بنفس الطريقة. و**npx** بيشغّل أداة من غير ما تثبتها عالميًا (`npx prettier --check .`)، وبيستخدم النسخة المحلية لو موجودة.', 'An **npm script** in package.json = a named command: `npm start`, `npm run dev`, `npm test`. The whole team (and CI) runs things the same way. **npx** runs a tool without a global install (`npx prettier --check .`), using the local copy if there is one.'),
          'npm start                 # → node src/main.mjs\nnpm run dev               # → node --watch src/main.mjs (restarts on save)\nnpm test                  # → node --test\nnpm run report -- --month 2026-09   # pass arguments after --\nnpx prettier --check .    # a tool without a global install', T),
        L(B('متغيرات البيئة وملف .env', 'Environment variables and .env'),
          B('الإعدادات اللي بتتغير بين جهازك والسيرفر (روابط، توكنات) مكانها **environment variable** مش الكود. على جهازك بتحطها في **.env file** (في .gitignore!)، وNode 24 بيقراه لوحده بـ `process.loadEnvFile()` أو `node --env-file=.env`. وفي الريبو حط `.env.example` من غير قيم حقيقية.', 'Settings that differ between your machine and the server (URLs, tokens) belong in an **environment variable**, not the code. On your machine you put them in a **.env file** (in .gitignore!), and Node 24 reads it itself with `process.loadEnvFile()` or `node --env-file=.env`. In the repo keep a `.env.example` with no real values.'),
          'process.loadEnvFile(".env");                 // Node 21.7+; no package needed\nconst config = {\n  shop: process.env.SHOP_NAME ?? "My shop",\n  webhook: required("N8N_WEBHOOK_URL"),\n  limit: Number(process.env.PAGE_LIMIT ?? 50),\n};\nfunction required(name) {\n  const v = process.env[name];\n  if (!v) throw new Error(`Missing ${name} in the environment`);\n  return v;\n}\nconsole.log(config.shop, "·", new URL(config.webhook).host, "· limit", config.limit);\nconsole.log("token present:", Boolean(process.env.CRM_TOKEN), "(never print the token itself)");', N({ '.env': 'SHOP_NAME=Demo Shop\nN8N_WEBHOOK_URL=https://n8n.example.com/webhook/orders\nCRM_TOKEN=demo-value-not-a-real-token\n' })),
        L(B('إعدادات بتفشل بدري', 'Settings that fail early'),
          B('اقرا كل الإعدادات **مرة واحدة أول التشغيل** في موديول `config.mjs`، واتحقق منها، واقفل البرنامج برسالة واضحة لو حاجة ناقصة. أحسن بكتير من ما يقع بعد ساعة في نص الشغل. وباقي الكود يستورد `config` بدل ما يقرا `process.env` في كل حتة.', 'Read every setting **once at start-up** in a `config.mjs` module, check them, and stop with a clear message if something is missing. Far better than crashing an hour later mid-job. The rest of the code imports `config` instead of reading `process.env` everywhere.'),
          'import { config } from "./config.mjs";\nconsole.log("starting with", config.mode);', Object.assign(N({ 'config.mjs': 'const missing = ["N8N_WEBHOOK_URL", "CRM_TOKEN"].filter(k => !process.env[k]);\nif (missing.length) {\n  console.error("Missing settings: " + missing.join(", ") + " — copy .env.example to .env");\n  process.exit(1);\n}\nexport const config = { mode: process.env.NODE_ENV ?? "development" };\n' }), { err: 1 }))
      ],
      practice: [
        B('ضيف scripts لـ start وdev وtest لمشروعك.', 'Add start, dev and test scripts to your project.'),
        B('اعمل .env و.env.example وحط .env في .gitignore.', 'Create .env and .env.example and put .env in .gitignore.'),
        B('اعمل config.mjs بيفشل برسالة واضحة.', 'Write a config.mjs that fails with a clear message.'),
        B('شغّل npx لأداة من غير تثبيت.', 'Run a tool with npx without installing it.')
      ],
      words: [
        W('npm script', 'أمر باسم في package.json', 'a named command in package.json', 'Run the npm script with npm run dev.'),
        W('npx', 'تشغيل أداة npm من غير تثبيت عام', 'running an npm tool without a global install', 'npx eslint checks the code.'),
        W('environment variable', 'إعداد بييجي من البيئة مش الكود', 'a setting coming from the environment, not the code', 'Read the token from an environment variable.'),
        W('.env file', 'ملف متغيرات البيئة المحلي', 'the local file of environment variables', 'Keep the .env file out of Git.'),
        W('loadenvfile', 'دالة Node لقراءة ملف .env', 'Node’s function for reading a .env file', 'process.loadEnvFile() needs no package.'),
        W('watch mode', 'إعادة التشغيل تلقائي عند الحفظ', 'restarting automatically on save', 'node --watch is watch mode.')
      ],
      read: [{ t: 'Node.js: process.loadEnvFile()', url: 'https://nodejs.org/api/process.html#processloadenvfilepath', what: B('اقرا الوصف.', 'Read the description.') }, { lib: 'npm Docs', what: B('اقرا scripts.', 'Read scripts.') }],
      challenge: B('حوّل سكربت أتمتة قديم: كل الروابط والتوكنات لـ .env، وconfig.mjs بيتحقق، و.env.example، وscripts لـ start وdev — واتأكد إن مفيش ولا سر في Git.', 'Convert an old automation script: every URL and token into .env, a validating config.mjs, a .env.example, and start and dev scripts — and make sure no secret is in Git.'),
      quiz: [
        Q(B('توكن الـ CRM مكانه:', 'The CRM token belongs in:'), ['.env', B('الكود', 'the code'), 'README'], 0, B('ومش في Git.', 'And not in Git.')),
        Q(B('.env.example فيه:', '.env.example contains:'), [['أسماء من غير قيم حقيقية', 'names without real values'], ['التوكنات الحقيقية', 'the real tokens'], ['الكود', 'the code']], 0, B('للتوثيق.', 'Documentation.')),
        Q(B('سكربت بيقع بعد ساعة عشان إعداد ناقص:', 'A script crashing after an hour on a missing setting:'), [['اتحقق أول التشغيل', 'check at start-up'], ['عادي', 'is fine'], ['زوّد المهلة', 'raise the timeout']], 0, B('fail early.', 'Fail early.'))
      ] },

    { title: B('أدوات الواجهة: Vite والموديولات في المتصفح', 'Front-end tools: Vite and browser modules'),
      goal: B('تعرف إمتى تحتاج bundler وإزاي تشتغل من غيره.', 'Know when you need a bundler and how to work without one.'),
      learn: [
        L(B('موديولات في المتصفح', 'Modules in the browser'),
          B('`<script type="module" src="app.js">` = **module script**: يقدر يعمل import لملفات تانية، بيتأجل لحد ما الصفحة تتحمّل، وفي strict mode. ومع **import map** تقدر تسمّي المكتبات (`import { DateTime } from "luxon"`) وتوجّهها لرابط CDN — من غير أي أدوات.', '`<script type="module" src="app.js">` = a **module script**: it can import other files, is deferred until the page loads, and runs in strict mode. With an **import map** you can name packages (`import { DateTime } from "luxon"`) and point them to a CDN URL — with no tools at all.'),
          '<script type="importmap">\n{ "imports": { "luxon": "https://cdn.jsdelivr.net/npm/luxon@3/+esm" } }\n</script>\n<script type="module">\n  import { DateTime } from "luxon";\n  document.body.textContent = DateTime.now().setLocale("ar-EG").toFormat("cccc d LLLL");\n</script>', { run: 'html' }),
        L(B('Vite', 'Vite'),
          B('للمشاريع الأكبر: **vite** بيدّيك **dev server** بيحدّث الصفحة فورًا عند الحفظ (**hot reload**)، و`npm run build` بيعمل **build step**: يجمّع الملفات (**bundler**)، ويشيل الكود اللي مش مستخدم (**tree shaking**)، ويصغّر (**minify**)، ويطلع **source map** عشان الأخطاء تبان في كودك الأصلي.', 'For bigger projects: **vite** gives you a **dev server** that updates the page instantly on save (**hot reload**), and `npm run build` performs a **build step**: it combines files (a **bundler**), removes unused code (**tree shaking**), shrinks it (**minify**), and emits a **source map** so errors point at your original code.'),
          'npm create vite@latest orders-ui -- --template vanilla\ncd orders-ui && npm i\nnpm run dev       # http://localhost:5173 with hot reload\nnpm run build     # → dist/ (bundled, tree-shaken, minified, with source maps)\nnpm run preview   # serve dist/ locally before deploying', T),
        L(B('محتاج أدوات ولا لأ؟', 'Do you need tools or not?'),
          B('صفحة أداة صغيرة أو landing page: HTML وmodule scripts كفاية (زي الموقع ده نفسه!). محتاج Vite لما: ملفات كتير ومكتبات npm كتير، TypeScript أو React، أو محتاج أصغر حجم ممكن. القاعدة: ابدأ بسيط وزوّد الأداة لما الألم يظهر.', 'A small tool page or a landing page: HTML and module scripts are enough (like this very site!). You need Vite when: many files and many npm packages, TypeScript or React, or the smallest possible size. The rule: start simple and add the tool when the pain appears.'),
          'tiny tool / landing page   → plain HTML + <script type="module">\nmany modules + npm packages → Vite (vanilla)\nTypeScript / React          → Vite with the matching template\nNode scripts                → no bundler: node runs ESM directly', T)
      ],
      practice: [
        B('اعمل صفحة بـ import map وluxon من CDN.', 'Build a page with an import map and luxon from a CDN.'),
        B('اعمل مشروع Vite vanilla وشغّل dev وbuild.', 'Create a vanilla Vite project and run dev and build.'),
        B('افتح dist وشوف حجم الملفات قبل وبعد.', 'Open dist and compare file sizes before and after.'),
        B('اعمل خطأ وشوف الـ source map بيوديك فين.', 'Cause an error and see where the source map takes you.')
      ],
      words: [
        W('module script', 'سكربت بـ type="module"', 'a script with type="module"', 'A module script is deferred.'),
        W('import map', 'خريطة أسماء مكتبات لروابط', 'a map from package names to URLs', 'The import map points luxon to a CDN.'),
        W('vite', 'أداة تطوير وبناء للواجهات', 'a dev and build tool for front-ends', 'Vite starts in under a second.'),
        W('dev server', 'سيرفر محلي للتطوير', 'a local server for development', 'The dev server reloads on save.'),
        W('hot reload', 'تحديث الصفحة فورًا عند الحفظ', 'updating the page instantly on save', 'Hot reload keeps the form state.'),
        W('build step', 'تجهيز الكود للنشر', 'preparing code for deployment', 'The build step outputs dist/.'),
        W('bundler', 'أداة بتجمع الملفات في ملفات قليلة', 'a tool combining files into a few', 'The bundler resolves every import.'),
        W('tree shaking', 'شيل الكود اللي مش مستخدم', 'removing unused code', 'Tree shaking dropped 40 KB.'),
        W('minify', 'تصغير الكود بشيل المسافات والأسماء الطويلة', 'shrinking code by removing spaces and long names', 'Minify the bundle for production.'),
        W('source map', 'ملف بيربط الكود المصغّر بالأصلي', 'a file linking minified code to the original', 'The source map shows the real line.')
      ],
      read: [{ t: 'Vite: Getting Started', url: 'https://vite.dev/guide/', what: B('اقرا Scaffolding Your First Vite Project.', 'Read Scaffolding Your First Vite Project.') }, { t: 'MDN: <script type="importmap">', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap', what: B('اقرا الأمثلة.', 'Read the examples.') }],
      challenge: B('اعمل نفس الأداة الصغيرة (عدّاد طلبات بيجيب من API) مرتين: مرة HTML وmodule scripts بس، ومرة بـ Vite — وقارن الحجم وسهولة التطوير واكتب رأيك.', 'Build the same small tool (an order counter fetching from an API) twice: once with plain HTML and module scripts, once with Vite — compare size and ease of development and write your verdict.'),
      quiz: [
        Q(B('type="module" بيخلّي السكربت:', 'type="module" makes a script:'), [['يقدر يعمل import ومؤجَّل', 'able to import, and deferred'], ['أبطأ', 'slower'], ['قديم', 'legacy']], 0, B('strict كمان.', 'Strict too.')),
        Q(B('tree shaking:', 'Tree shaking:'), [['يشيل الكود المش مستخدم', 'removes unused code'], ['يزرع شجر', 'plants trees'], ['يعيد الترتيب', 'reorders code']], 0, B('حجم أقل.', 'Smaller size.')),
        Q(B('صفحة أداة صغيرة:', 'A tiny tool page:'), [['HTML وmodules كفاية', 'HTML and modules are enough'], ['لازم React', 'needs React'], ['لازم Vite', 'needs Vite']], 0, B('ابدأ بسيط.', 'Start simple.'))
      ] },

    { title: B('اختيار المكتبات بأمان', 'Choosing packages safely'),
      goal: B('تقلل المكتبات وتختار الآمن وتراقب الثغرات.', 'Use fewer packages, pick safe ones and watch for vulnerabilities.'),
      learn: [
        L(B('المدمج الأول', 'Built-ins first'),
          B('كل مكتبة = كود غريب بيشتغل بصلاحياتك. Node الحديث فيه حاجات كتير كانت محتاجة مكتبات: fetch، `crypto.randomUUID`، `structuredClone`، `util.parseArgs`، `node:test`، `fs.glob`، `.env`. اسأل الأول: فيه **built-in module** بيعملها؟', 'Every package = foreign code running with your permissions. Modern Node has many things that used to need packages: fetch, `crypto.randomUUID`, `structuredClone`, `util.parseArgs`, `node:test`, `fs.glob`, `.env`. Ask first: is there a **built-in module** for it?'),
          'import { randomUUID, createHash } from "node:crypto";\nimport { parseArgs, styleText } from "node:util";\n\nconst { values } = parseArgs({ args: ["--month", "2026-09", "--dry"], options: { month: { type: "string" }, dry: { type: "boolean" } } });\nconst order = { id: randomUUID(), month: values.month, items: [{ sku: "A1", qty: 2 }] };\nconst copy = structuredClone(order);\ncopy.items[0].qty = 99;\nconsole.log(values, order.items[0].qty, copy.items[0].qty);\nconsole.log("sha256:", createHash("sha256").update(JSON.stringify(order.items)).digest("hex").slice(0, 16));\nconsole.log(styleText("green", "no packages were installed for this"));', N()),
        L(B('سلسلة التوريد', 'The supply chain'),
          B('هجمات **supply chain**: حد يسيطر على مكتبة شعبية أو ينشر مكتبة باسم شبه اسمها (`expresss`) ويحط كود بيسرق التوكنات. احمِ نفسك: اكتب الاسم بالظبط، افحص قبل ما تضيف، ثبّت بالـ **lockfile**، وشغّل **npm audit** بانتظام، وفكّر في `npm ci --ignore-scripts` في CI.', '**supply chain** attacks: someone takes over a popular package or publishes one with a look-alike name (`expresss`) containing code that steals tokens. Protect yourself: type the name exactly, check before adding, pin with the **lockfile**, run **npm audit** regularly, and consider `npm ci --ignore-scripts` in CI.'),
          'npm audit                  # known vulnerabilities in your dependency tree\nnpm audit fix              # apply compatible fixes\nnpm view express versions --json | tail -3   # what exists\nnpm view left-pad deprecated                 # is it deprecated?\nnpm ls --all | wc -l       # how big is the tree really?', T),
        L(B('تقييم مكتبة', 'Evaluating a package'),
          B('قبل `npm i`: آخر إصدار من إمتى؟ فيه صيانة؟ كام **dependency** تحتها؟ الـ **license** يسمح (MIT، Apache)؟ هل هي **deprecated**؟ الوثائق كويسة؟ حجمها؟ مكتبة صغيرة بتعمل حاجة تقدر تكتبها في 10 سطور — اكتبها انت.', 'Before `npm i`: when was the last release? Is it maintained? How many dependencies does it pull in? Does the **license** allow it (MIT, Apache)? Is it **deprecated**? Are the docs good? How big is it? A tiny package doing something you could write in 10 lines — write it yourself.'),
          '✓ last publish < 1 year · active issues answered\n✓ few dependencies · small install size\n✓ license MIT / Apache-2.0 / BSD\n✓ typed (TypeScript types) · good docs · many dependents\n✗ deprecated · 1 maintainer gone for years · name one letter off a famous package', T)
      ],
      practice: [
        B('شغّل مثال المدمجات وضيف fs.glob.', 'Run the built-ins example and add fs.glob.'),
        B('شغّل npm audit على مشروع عندك.', 'Run npm audit on one of your projects.'),
        B('قيّم مكتبتين بالقايمة واكتب قرارك.', 'Evaluate two packages with the checklist and write your decision.'),
        B('شيل مكتبة واحدة تقدر تستبدلها بمدمج.', 'Remove one package you can replace with a built-in.')
      ],
      words: [
        W('built-in module', 'موديول جاي مع Node', 'a module that ships with Node', 'node:crypto is a built-in module.'),
        W('supply chain', 'كل الكود اللي بتعتمد عليه من برة', 'all the outside code you depend on', 'Lockfiles protect the supply chain.'),
        W('lockfile', 'ملف تثبيت الإصدارات', 'the file that pins versions', 'Commit the lockfile.'),
        W('npm audit', 'فحص الثغرات المعروفة في المكتبات', 'checking packages for known vulnerabilities', 'npm audit found 2 high issues.'),
        W('license', 'رخصة استخدام الكود', 'the terms for using the code', 'Check the license before adding.'),
        W('deprecated', 'متوقف ومش موصى بيه', 'retired and no longer recommended', 'That package is deprecated.'),
        W('registry', 'المخزن اللي npm بينزّل منه', 'the store npm downloads from', 'The npm registry hosts the package.')
      ],
      read: [{ lib: 'npm audit', what: B('اقرا الوصف والأمثلة.', 'Read the description and examples.') }, { t: 'OWASP: NPM Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html', what: B('اقرا أول 6 نقاط.', 'Read the first 6 points.') }],
      challenge: B('اعمل «تقرير صحة» لمشروع Node عندك: عدد المكتبات المباشرة وغير المباشرة، نتيجة npm audit، المكتبات القديمة (npm outdated)، ومكتبة أو اتنين ممكن تتشال لصالح المدمج — ونفّذ الإزالة.', 'Write a «health report» for one of your Node projects: direct and indirect package counts, npm audit results, outdated packages (npm outdated), and one or two packages that could go in favour of built-ins — then remove them.'),
      quiz: [
        Q(B('UUID في Node:', 'A UUID in Node:'), ['crypto.randomUUID()', B('مكتبة uuid لازم', 'the uuid package is required'), 'Math.random()'], 0, B('مدمج.', 'Built in.')),
        Q(B('expresss بـ 3 s:', 'expresss with 3 s:'), [['اسم مشبوه', 'a suspicious look-alike'], ['نسخة أحدث', 'a newer version'], ['عادي', 'normal']], 0, B('typosquatting.', 'Typosquatting.')),
        Q(B('npm audit بيكشف:', 'npm audit finds:'), [['ثغرات معروفة', 'known vulnerabilities'], ['أخطاء الكود بتاعك', 'bugs in your code'], ['البطء', 'slowness']], 0, B('في المكتبات.', 'In packages.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('مشروع Node منظم وجاهز للفريق.', 'A tidy Node project ready for a team.'),
      review: [
        B('ESM: named وdefault وimport ديناميكي، وCommonJS في الكود القديم.', 'ESM: named, default and dynamic imports, and CommonJS in old code.'),
        B('package.json والـ dependencies والـ semver والـ lockfile وnpm ci.', 'package.json, dependencies, semver, the lockfile and npm ci.'),
        B('npm scripts وnpx و.env وconfig بيفشل بدري.', 'npm scripts, npx, .env and a config that fails early.'),
        B('module scripts وimport maps، وVite لما تحتاجه.', 'Module scripts and import maps, and Vite when you need it.'),
        B('المدمج الأول، وأمان سلسلة التوريد، وتقييم المكتبات.', 'Built-ins first, supply-chain safety and evaluating packages.')
      ],
      project: B('ابني قالب «مشروع أتمتة Node» تستخدمه في كل حاجة جاية: `"type": "module"`، فولدر src بموديولات (config، api-client من أسبوع 14، jobs، main)، .env و.env.example، scripts لـ start وdev وtest، .gitignore، README بيشرح التشغيل في 3 أوامر، ومكتبة خارجية واحدة بالكتير — وارفعه على GitHub كـ template repository.', 'Build a «Node automation project» template for everything ahead: `"type": "module"`, a src folder with modules (config, the api-client from week 14, jobs, main), .env and .env.example, start, dev and test scripts, a .gitignore, a README explaining how to run it in 3 commands, and at most one outside package — and push it to GitHub as a template repository.'),
      test: [
        Q(B('import formatEGP from "./money.mjs" بيستورد:', 'import formatEGP from "./money.mjs" imports:'), ['the default export', 'a named export', 'everything'], 0, B('اسمه بإيدك.', 'You choose its name.')),
        Q(B('import * as orders:', 'import * as orders:'), [['كل الـ exports في كائن', 'every export in one object'], ['الـ default بس', 'only the default'], ['خطأ', 'an error']], 0, B('namespace.', 'A namespace.')),
        Q(B('require موجود في:', 'require belongs to:'), ['CommonJS', 'ESM', 'CSS'], 0, B('القديم.', 'The old system.')),
        Q(B('vitest نوعها:', 'vitest is a:'), ['devDependency', 'dependency', 'built-in'], 0, B('للتطوير.', 'For development.')),
        Q(B('~3.5.0 بيقبل 3.6.0؟', 'Does ~3.5.0 accept 3.6.0?'), [['لأ', 'no'], ['أيوه', 'yes'], ['ساعات', 'sometimes']], 0, B('الـ patch بس.', 'Patch only.')),
        Q(B('package-lock.json:', 'package-lock.json:'), [['يتحفظ في Git', 'is committed'], ['يتمسح', 'is deleted'], ['سري', 'is secret']], 0, B('نفس الإصدارات للكل.', 'Same versions for all.')),
        Q(B('.env:', '.env:'), [['في .gitignore', 'in .gitignore'], ['في Git', 'in Git'], ['في الصفحة', 'in the page']], 0, B('أسرار.', 'Secrets.')),
        Q(B('قراءة .env من غير مكتبة:', 'Reading .env without a package:'), ['process.loadEnvFile()', 'require("env")', 'fs.env()'], 0, B('Node 21.7+.', 'Node 21.7+.')),
        Q(B('import map بيعمل:', 'An import map:'), [['يربط اسم مكتبة برابط', 'maps a package name to a URL'], ['يضغط الصور', 'compresses images'], ['يرسم خريطة', 'draws a map']], 0, B('من غير أدوات.', 'No tools needed.')),
        Q(B('source map بيفيد في:', 'A source map helps with:'), [['الأخطاء بأرقام سطور حقيقية', 'errors with real line numbers'], ['السرعة', 'speed'], ['الـ SEO', 'SEO']], 0, B('debugging.', 'Debugging.')),
        Q(B('مكتبة بتعمل 5 سطور:', 'A package doing 5 lines of work:'), [['اكتبها انت', 'write it yourself'], ['ثبّتها', 'install it'], ['ثبّت اتنين', 'install two']], 0, B('أقل مخاطر.', 'Less risk.')),
        Q(B('npm ci --ignore-scripts:', 'npm ci --ignore-scripts:'), [['يمنع سكربتات التثبيت', 'blocks install scripts'], ['يمسح الكود', 'deletes code'], ['أبطأ', 'is slower']], 0, B('أمان.', 'Safety.'))
      ] }
  ]
};
