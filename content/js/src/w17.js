// JavaScript week 17 — automation scripts and the command line with Node.js.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('سكربتات أتمتة بـ Node.js وسطر الأوامر', 'Automation scripts and the command line with Node.js'),
  goal: B('تكتب سكربتات بتشتغل لوحدها كل يوم: options واضحة، جدولة من غير تداخل، لوج منظم، فولدرات «وارد» بتتعالج تلقائي، وتنبيهات لما حاجة تقع — نفس الأفكار اللي n8n بيعملها، بس بكودك.',
          'Write scripts that run by themselves every day: clear options, scheduling without overlaps, structured logs, «inbox» folders processed automatically, and alerts when something breaks — the same ideas n8n uses, in your own code.'),
  days: [
    { title: B('options بـ parseArgs', 'Options with parseArgs'),
      goal: B('تقرا options وflags بشكل صح ومن غير مكتبات.', 'Read options and flags properly with no packages.'),
      learn: [
        L(B('util.parseArgs', 'util.parseArgs'),
          B('**parseargs** المدمج في Node بيفهم `--month 2026-09` و`-m 2026-09` و`--dry-run`: كل **option** ليها نوع (string أو boolean) واختصار وقيمة افتراضية، والـ **flag** = option بـ true/false. والباقي **positional argument** (زي اسم الأمر).', 'Node’s built-in **parseargs** understands `--month 2026-09`, `-m 2026-09` and `--dry-run`: each **option** has a type (string or boolean), a short alias and a default, and a **flag** = a true/false option. The rest are each a **positional argument** (like the command name).'),
          'import { parseArgs } from "node:util";\nconst { values, positionals } = parseArgs({\n  allowPositionals: true,\n  options: {\n    month: { type: "string", short: "m" },\n    out: { type: "string", default: "reports" },\n    "dry-run": { type: "boolean", default: false },\n    tag: { type: "string", multiple: true },\n  },\n});\nconsole.log({ command: positionals[0], ...values });', N(null, { args: ['build', '-m', '2026-09', '--dry-run', '--tag', 'vip', '--tag', 'cairo'] })),
        L(B('التحقق ورسالة usage', 'Validation and a usage message'),
          B('parseArgs بيرمي خطأ لو option مش معروفة — امسكه واطبع **usage** مختصر واخرج بكود 2. وبعدين اتحقق من القيم نفسها (الشهر بصيغة صح؟ الملف موجود؟) قبل ما تبدأ أي شغل.', 'parseArgs throws on an unknown option — catch it, print a short **usage** and exit with code 2. Then check the values themselves (is the month well-formed? does the file exist?) before starting any work.'),
          'import { parseArgs } from "node:util";\nconst USAGE = "usage: report build --month YYYY-MM [--out DIR] [--dry-run]";\nfunction cli(argv) {\n  let parsed;\n  try {\n    parsed = parseArgs({ args: argv, allowPositionals: true, options: { month: { type: "string" }, out: { type: "string", default: "reports" }, "dry-run": { type: "boolean" } } });\n  } catch (e) { return { error: e.message }; }\n  const { values, positionals } = parsed;\n  if (positionals[0] !== "build") return { error: "unknown command" };\n  if (!/^\\d{4}-(0[1-9]|1[0-2])$/.test(values.month ?? "")) return { error: "--month must look like 2026-09" };\n  return { ok: values };\n}\nfor (const argv of [["build", "--month", "2026-09"], ["build", "--month", "Sept"], ["build", "--colour", "red"], ["send"]]) {\n  const r = cli(argv);\n  console.log(argv.join(" ").padEnd(26), "→", r.ok ? JSON.stringify(r.ok) : `${r.error}\\n${" ".repeat(29)}${USAGE}`);\n}', N()),
        L(B('سكربت واحد ولا أوامر كتير؟', 'One script or many commands?'),
          B('أداة بـ 2-3 أوامر: parseArgs والـ switch كفاية. أكتر من كده (أوامر فرعية، help لكل أمر، تكملة تلقائية): مكتبة زي Commander.js. وفي الحالتين خلّي كل أمر دالة لوحدها في موديول — عشان تختبرها وتستدعيها من كود تاني (أو من n8n).', 'A tool with 2–3 commands: parseArgs and a switch are enough. More than that (subcommands, help per command, completion): a library like Commander.js. Either way, keep each command a separate function in a module — so you can test it and call it from other code (or from n8n).'),
          'import { build } from "./commands/build.mjs";\nimport { send } from "./commands/send.mjs";\nconst commands = { build, send };\nconst run = commands[positionals[0]];\nif (!run) { console.error(USAGE); process.exitCode = 2; }\nelse process.exitCode = (await run(values)) ? 0 : 1;', S)
      ],
      practice: [
        B('اعمل options لسكربت التقارير: month وout وdry-run.', 'Add options to the report script: month, out and dry-run.'),
        B('جرّب option غلط وشوف رسالتك.', 'Try a wrong option and see your message.'),
        B('ضيف option بـ multiple: true للفلاتر.', 'Add a multiple: true option for filters.'),
        B('قسّم الأوامر لموديولات منفصلة.', 'Split the commands into separate modules.')
      ],
      words: [
        W('parseargs', 'دالة Node لقراءة الـ options', 'Node’s function for reading options', 'parseArgs handles --month and -m.'),
        W('option', 'إعداد بيتبعت بـ --اسم', 'a setting passed as --name', 'The --out option sets the folder.'),
        W('flag', 'option بـ true أو false', 'a true-or-false option', 'Add the --dry-run flag.'),
        W('positional argument', 'argument من غير اسم بترتيبه', 'an unnamed argument read by its position', 'The command is the first positional argument.'),
        W('usage', 'سطر بيشرح إزاي تشغّل الأداة', 'a line explaining how to run the tool', 'Print the usage on bad input.')
      ],
      read: [{ t: 'Node.js: util.parseArgs()', url: 'https://nodejs.org/api/util.html#utilparseargsconfig', what: B('اقرا الأمثلة.', 'Read the examples.') }, { lib: 'Commander.js', what: B('قارنها بـ parseArgs.', 'Compare it with parseArgs.') }],
      challenge: B('اعمل `tasks.mjs` بأوامر add وlist وdone وoptions (`--due` و`--tag` المتكرر و`--json`)، بتحقق ورسائل usage، وأكواد خروج صح.', 'Build `tasks.mjs` with add, list and done commands and options (`--due`, a repeatable `--tag`, `--json`), with validation, usage messages and correct exit codes.'),
      quiz: [
        Q(B('--dry-run نوعه:', '--dry-run is a:'), ['boolean', 'string', 'number'], 0, B('flag.', 'A flag.')),
        Q(B('option مش معروفة:', 'An unknown option:'), [['usage وكود 2', 'usage and exit code 2'], ['تجاهل', 'ignore it'], ['كود 0', 'exit code 0']], 0, B('استخدام غلط.', 'Bad usage.')),
        Q(B('كل أمر في دالة لوحده عشان:', 'Each command is its own function so that:'), [['تختبره وتعيد استخدامه', 'you can test and reuse it'], ['الملف أطول', 'the file is longer'], ['أسرع', 'it is faster']], 0, B('موديولات.', 'Modules.'))
      ] },

    { title: B('الجدولة من غير تداخل', 'Scheduling without overlaps'),
      goal: B('تشغّل سكربت كل ساعة أو كل يوم بأمان.', 'Run a script every hour or every day safely.'),
      learn: [
        L(B('مين يشغّل السكربت؟', 'Who runs the script?'),
          B('3 طرق: **scheduler** النظام (**task scheduler** في ويندوز، أو **cron job** في لينكس) — الأبسط والأثبت؛ n8n (Schedule Trigger ← Execute Command) — لو عايز لوج ومراقبة في مكان واحد؛ أو برنامج Node شغال دايمًا بـ `node-cron`. و**cron expression** زي `0 7 * * 1-5` = 7 الصبح أيام الشغل.', 'Three ways: the system **scheduler** (the **task scheduler** on Windows, or a **cron job** on Linux) — the simplest and most solid; n8n (Schedule Trigger → Execute Command) — if you want logs and monitoring in one place; or an always-on Node program with `node-cron`. A **cron expression** like `0 7 * * 1-5` = 7 a.m. on weekdays.'),
          '# Linux crontab -e   (minute hour day month weekday)\n0 7 * * 1-5   cd /srv/orders && /usr/bin/node src/main.mjs build >> logs/cron.log 2>&1\n*/15 * * * *  cd /srv/orders && /usr/bin/node src/main.mjs fetch\n\n# Windows: Task Scheduler → Action: Start a program\n#   Program:   C:\\Program Files\\nodejs\\node.exe\n#   Arguments: src\\main.mjs build\n#   Start in:  C:\\orders            ← the working directory matters', T),
        L(B('قفل يمنع التشغيل مرتين', 'A lock that prevents double runs'),
          B('لو التشغيل خد أكتر من الفترة (15 دقيقة) والتاني بدأ، هيحصل **overlapping runs**: طلبات مكررة وملفات متضاربة. الحل **lock file**: افتح ملف بـ flag `"wx"` (اعمله بس لو مش موجود) — لو فشل، فيه نسخة شغالة. امسحه في finally، واعتبره قديم لو عمره أكبر من حد.', 'If a run takes longer than the interval (15 minutes) and the next one starts, you get **overlapping runs**: duplicate requests and clashing files. The fix is a **lock file**: open a file with the `"wx"` flag (create only if missing) — if that fails, another copy is running. Delete it in finally, and treat it as stale beyond an age limit.'),
          'import { open, rm, stat } from "node:fs/promises";\nasync function withLock(file, maxAgeMs, job) {\n  try {\n    const h = await open(file, "wx");\n    await h.writeFile(String(process.pid)); await h.close();\n  } catch (e) {\n    if (e.code !== "EEXIST") throw e;\n    const age = Date.now() - (await stat(file)).mtimeMs;\n    if (age < maxAgeMs) { console.log("another run is active — skipping"); return false; }\n    console.log("stale lock found — taking over");\n  }\n  try { await job(); return true; } finally { await rm(file, { force: true }); }\n}\nconst sleep = ms => new Promise(r => setTimeout(r, ms));\nconst job = name => async () => { console.log(name, "started"); await sleep(100); console.log(name, "finished"); };\nawait Promise.all([withLock("run.lock", 60_000, job("run A")), withLock("run.lock", 60_000, job("run B"))]);\nawait withLock("run.lock", 60_000, job("run C"));', N()),
        L(B('المنطقة الزمنية والتشغيل الجاي', 'Time zones and the next run'),
          B('السيرفر غالبًا على UTC وانت في القاهرة أو الرياض. حدد الـ **time zone** صراحة (في cron بـ `CRON_TZ` أو في n8n من إعدادات الـ workflow)، واطبع **next run** في اللوج عشان تتأكد. `Intl.DateTimeFormat` بيعرض أي وقت بأي منطقة:', 'Servers usually run on UTC while you are in Cairo or Riyadh. Set the **time zone** explicitly (in cron with `CRON_TZ`, in n8n in the workflow settings), and print the **next run** in the log to be sure. `Intl.DateTimeFormat` shows any time in any zone:'),
          'const at = new Date("2026-10-04T04:00:00Z");     // 04:00 UTC\nfor (const tz of ["UTC", "Africa/Cairo", "Asia/Riyadh", "Asia/Dubai"]) {\n  const f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "short", hour: "2-digit", minute: "2-digit", timeZoneName: "short" });\n  console.log(tz.padEnd(13), f.format(at));\n}\n// "every day at 07:00 Riyadh" = 04:00 UTC on a UTC server', N())
      ],
      practice: [
        B('جدول سكربت كل 15 دقيقة في Task Scheduler أو cron.', 'Schedule a script every 15 minutes in Task Scheduler or cron.'),
        B('شغّل مثال القفل وشوف B بيتخطّى.', 'Run the lock example and watch B skip.'),
        B('اكتب cron expression لـ «أول يوم في الشهر 9 الصبح».', 'Write a cron expression for «the 1st of the month at 9 a.m.».'),
        B('اطبع وقت التشغيل الجاي بتوقيتك في اللوج.', 'Print the next run time in your zone in the log.')
      ],
      words: [
        W('scheduler', 'أداة بتشغّل مهام في أوقات محددة', 'a tool running jobs at set times', 'The scheduler starts the backup at 2 a.m.'),
        W('task scheduler', 'مجدول المهام في ويندوز', 'the Windows job scheduler', 'Task Scheduler runs node.exe daily.'),
        W('cron job', 'مهمة مجدولة في لينكس', 'a scheduled job on Linux', 'The cron job runs every 15 minutes.'),
        W('cron expression', 'صيغة الوقت في cron', 'the time format used by cron', 'The cron expression 0 7 * * 1-5 means weekdays at 7.'),
        W('overlapping runs', 'تشغيلتين لنفس السكربت في نفس الوقت', 'two runs of one script at once', 'A lock prevents overlapping runs.'),
        W('lock file', 'ملف بيمنع نسخة تانية تشتغل', 'a file stopping a second copy from running', 'Delete the lock file in finally.'),
        W('time zone', 'المنطقة الزمنية', 'the regional time setting', 'Set the time zone to Africa/Cairo.')
      ],
      read: [{ t: 'crontab.guru', url: 'https://crontab.guru/', what: B('جرّب تعبيرات cron.', 'Try cron expressions.') }, { t: 'n8n Docs: Schedule Trigger', url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/', what: B('اقرا Cron expression.', 'Read Cron expression.') }],
      challenge: B('جدول مشروع الشهر الرابع يشتغل كل يوم 7 الصبح بتوقيتك مع lock file، وجرّب تشغّله يدويًا وهو شغال عشان تتأكد إن القفل بيمنع التكرار.', 'Schedule the month 4 project daily at 7 a.m. your time with a lock file, and start it manually while it runs to check the lock blocks the duplicate.'),
      quiz: [
        Q(B('open(file, "wx") بيفشل لو:', 'open(file, "wx") fails when:'), [['الملف موجود', 'the file exists'], ['الملف مش موجود', 'the file is missing'], ['أبدًا', 'never']], 0, B('EEXIST.', 'EEXIST.')),
        Q(B('*/15 * * * *:', '*/15 * * * *:'), [['كل 15 دقيقة', 'every 15 minutes'], ['كل 15 ساعة', 'every 15 hours'], ['يوم 15', 'on the 15th']], 0, B('الدقايق.', 'Minutes.')),
        Q(B('السيرفر على UTC وعايز 7 الرياض:', 'A UTC server and you want 7 a.m. Riyadh:'), ['04:00 UTC', '07:00 UTC', '10:00 UTC'], 0, B('+3.', '+3.'))
      ] },

    { title: B('لوج منظم', 'Structured logs'),
      goal: B('تعرف السكربت عمل إيه ووقع فين من غير ما تكون قاعد قدامه.', 'Know what the script did and where it broke without watching it.'),
      learn: [
        L(B('JSON lines', 'JSON lines'),
          B('السكربت اللي بيشتغل لوحده لازم يكتب لوج يتقري ويتبحث فيه. **json lines**: كل سطر كائن JSON فيه الوقت والمستوى والرسالة والتفاصيل. سهل تفلتره بـ grep أو تحمّله في Excel أو أداة مراقبة. ده **logger** صغير:', 'A script that runs alone must write a log that can be read and searched. **json lines**: each line is a JSON object with the time, level, message and details. Easy to filter with grep or load into Excel or a monitoring tool. Here is a small **logger**:'),
          'import { appendFileSync, readFileSync } from "node:fs";\nconst LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };\nfunction createLogger(file, min = "info", base = {}) {\n  const write = level => (msg, extra = {}) => {\n    if (LEVELS[level] < LEVELS[min]) return;\n    appendFileSync(file, JSON.stringify({ t: new Date().toISOString(), level, msg, ...base, ...extra }) + "\\n");\n  };\n  return { debug: write("debug"), info: write("info"), warn: write("warn"), error: write("error"),\n           child: more => createLogger(file, min, { ...base, ...more }) };\n}\nconst log = createLogger("app.log", "info", { app: "orders-report" });\nlog.debug("hidden at info level");\nlog.info("run started", { month: "2026-09" });\nconst runLog = log.child({ run: "r-7f3a" });\nrunLog.warn("page slow", { page: 3, ms: 2400 });\nrunLog.error("CRM rejected order", { orderId: 102, status: 422 });\nconst lines = readFileSync("app.log", "utf8").trim().split("\\n").map(JSON.parse);\nconsole.log(lines.length, "lines;", lines.filter(l => l.level === "error").map(l => `${l.run} ${l.msg} #${l.orderId}`));', N()),
        L(B('correlation id', 'The correlation id'),
          B('كل تشغيل (أو كل طلب) ياخد id قصير، وكل سطر لوج من التشغيل ده يحمله (`log.child({ run })`). كده لما تلاقي خطأ، تفلتر بالـ **correlation id** وتشوف قصة التشغيل كاملة — حتى لو تشغيلات كتير بتكتب في نفس الملف. ابعته كمان لـ n8n في الـ payload.', 'Every run (or request) gets a short id, and every log line of that run carries it (`log.child({ run })`). When you find an error, filter by the **correlation id** and see the whole story of the run — even with many runs writing to the same file. Send it to n8n in the payload too.'),
          'grep \'"run":"r-7f3a"\' app.log                       # one run, start to end\ngrep \'"level":"error"\' app.log | tail -20            # the latest errors\nnode -e \'require("fs").readFileSync("app.log","utf8").trim().split("\\n").map(JSON.parse).filter(l=>l.ms>2000).forEach(l=>console.log(l.t,l.msg,l.ms))\'', T),
        L(B('تدوير اللوج', 'Rotating logs'),
          B('لوج بيكبر للأبد بيملا الـ disk. **log rotation**: ملف لكل يوم (`logs/2026-10-04.log`)، وامسح الأقدم من 14 يوم في أول كل تشغيل. ومتكتبش في اللوج توكنات أو بيانات بطاقات أو كلمات سر — اكتب «موجود/مش موجود» أو آخر 4 حروف.', 'A log growing forever fills the disk. **log rotation**: one file per day (`logs/2026-10-04.log`), and delete those older than 14 days at the start of each run. Never write tokens, card data or passwords into logs — write «present/absent» or the last 4 characters.'),
          'import { readdir, rm, mkdir, writeFile } from "node:fs/promises";\nimport path from "node:path";\nawait mkdir("logs", { recursive: true });\nfor (const d of ["2026-09-01", "2026-09-20", "2026-10-01", "2026-10-04"]) await writeFile(path.join("logs", d + ".log"), "");\n\nconst today = new Date("2026-10-04T08:00:00Z"), keepDays = 14;\nfor (const f of await readdir("logs")) {\n  const day = new Date(f.slice(0, 10) + "T00:00:00Z");\n  if ((today - day) / 864e5 > keepDays) { await rm(path.join("logs", f)); console.log("removed", f); }\n}\nconsole.log("kept", await readdir("logs"));\nconst mask = s => s ? "…" + s.slice(-4) : "(missing)";\nconsole.log("token:", mask("demo-token-1234"));', N())
      ],
      practice: [
        B('استبدل console.log في سكربتك بالـ logger.', 'Replace console.log in your script with the logger.'),
        B('ضيف run id لكل تشغيل بـ crypto.randomUUID().slice(0, 8).', 'Add a run id per run with crypto.randomUUID().slice(0, 8).'),
        B('فلتر الأخطاء من اللوج بسطر واحد.', 'Filter errors from the log in one line.'),
        B('ضيف تدوير يومي ومسح بعد 14 يوم.', 'Add daily rotation and deletion after 14 days.')
      ],
      words: [
        W('json lines', 'ملف كل سطر فيه كائن JSON', 'a file with one JSON object per line', 'Write logs as JSON lines.'),
        W('logger', 'أداة بتكتب اللوج بمستويات', 'a tool writing logs with levels', 'The logger hides debug lines.'),
        W('correlation id', 'معرّف بيربط سطور تشغيل واحد', 'an id linking the lines of one run', 'Filter the log by correlation id.'),
        W('log rotation', 'تقسيم اللوج لملفات ومسح القديم', 'splitting logs into files and deleting old ones', 'Log rotation keeps 14 days.'),
        W('child logger', 'logger بيورث حقول ثابتة', 'a logger inheriting fixed fields', 'Create a child logger per run.')
      ],
      read: [{ t: 'Pino logger', url: 'https://getpino.io/', what: B('شوف إزاي مكتبة حقيقية بتعمل JSON logs.', 'See how a real library does JSON logs.') }, { t: 'OWASP: Logging Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html', what: B('اقرا Data to exclude.', 'Read Data to exclude.') }],
      challenge: B('ضيف لمشروع الشهر الرابع: logger بـ JSON lines، run id، مدة كل خطوة (ms)، تدوير يومي، وأمر `report logs --errors --since 2h` بيعرض آخر الأخطاء بشكل مقروء.', 'Add to the month 4 project: a JSON-lines logger, a run id, each step’s duration (ms), daily rotation, and a `report logs --errors --since 2h` command that shows recent errors readably.'),
      quiz: [
        Q(B('لوج JSON lines أحسن عشان:', 'JSON-lines logs are better because:'), [['بيتفلتر ويتحلل بسهولة', 'they are easy to filter and analyse'], ['أجمل', 'prettier'], ['أصغر دايمًا', 'always smaller']], 0, B('structured.', 'Structured.')),
        Q(B('التوكن في اللوج:', 'A token in the log:'), [['لأ؛ «موجود» أو آخر 4', 'no; «present» or the last 4'], ['كامل', 'in full'], ['base64', 'base64']], 0, B('اللوج بيتشارك.', 'Logs get shared.')),
        Q(B('run id فايدته:', 'A run id helps:'), [['تشوف قصة تشغيل واحد', 'see the story of one run'], ['السرعة', 'speed'], ['الترتيب', 'sorting']], 0, B('correlation.', 'Correlation.'))
      ] },

    { title: B('فولدرات الوارد', 'Inbox folders'),
      goal: B('تعالج ملفات بتوصل لفولدر تلقائيًا ومن غير ما تضيع حاجة.', 'Process files arriving in a folder automatically without losing any.'),
      learn: [
        L(B('inbox ← done/failed', 'inbox → done/failed'),
          B('نمط بسيط وقوي: الملفات بتنزل في **inbox folder** (من إيميل، FTP، n8n، أو الموظفين). السكربت ياخد كل ملف، يعالجه، وينقله لـ **processed folder** (`done/`) لو نجح، أو لـ **quarantine** (`failed/`) مع ملف سبب الفشل. الملف عمره ما يتعالج مرتين ولا يضيع.', 'A simple, strong pattern: files land in an **inbox folder** (from email, FTP, n8n or staff). The script takes each file, processes it, and moves it to a **processed folder** (`done/`) on success, or to **quarantine** (`failed/`) with a file explaining why. A file is never processed twice and never lost.'),
          'import { readdir, readFile, rename, writeFile, mkdir } from "node:fs/promises";\nimport path from "node:path";\nfor (const d of ["done", "failed"]) await mkdir(d, { recursive: true });\n\nasync function processOne(file) {\n  const order = JSON.parse(await readFile(path.join("inbox", file), "utf8"));\n  if (!(order.total > 0)) throw new Error("total must be positive");\n  return `order ${order.id}: ${order.total}`;\n}\nfor (const file of (await readdir("inbox")).filter(f => f.endsWith(".json")).sort()) {\n  try {\n    console.log("✓", await processOne(file));\n    await rename(path.join("inbox", file), path.join("done", file));\n  } catch (e) {\n    await rename(path.join("inbox", file), path.join("failed", file));\n    await writeFile(path.join("failed", file + ".error.txt"), e.message);\n    console.log("✗", file, "→ failed/:", e.message);\n  }\n}\nconsole.log({ inbox: await readdir("inbox"), done: await readdir("done"), failed: await readdir("failed") });', N({ 'inbox/001.json': '{"id": 1, "total": 250}', 'inbox/002.json': '{"id": 2, "total": -5}', 'inbox/003.json': '{"id": 3, "total": 90', 'inbox/004.json': '{"id": 4, "total": 45}' })),
        L(B('fs.watch ولا poll؟', 'fs.watch or polling?'),
          B('`fs.watch` بيبلّغك أول ما ملف يوصل — بس أحيانًا بيبعت الحدث مرتين، أو قبل ما الملف يخلص كتابة، وسلوكه بيختلف بين الأنظمة وعلى فولدرات الشبكة. الأثبت للأتمتة: **poll** كل دقيقة (اقرا الفولدر)، ومع fs.watch استخدم debounce واستنى الحجم يثبت.', '`fs.watch` tells you as soon as a file arrives — but it sometimes fires twice, or before the file is fully written, and behaves differently between systems and on network folders. The most solid choice for automation: **poll** every minute (read the folder), and with fs.watch use a debounce and wait for the size to settle.'),
          'import { watch, stat } from "node:fs/promises";\nconst sleep = ms => new Promise(r => setTimeout(r, ms));\nasync function settled(file) {           // wait until the size stops changing\n  let last = -1;\n  for (;;) {\n    const { size } = await stat(file);\n    if (size === last) return;\n    last = size; await sleep(500);\n  }\n}\nfor await (const ev of watch("inbox")) {\n  if (!ev.filename?.endsWith(".csv")) continue;\n  await settled(`inbox/${ev.filename}`);\n  await processFolder();                 // re-scan the folder; it is idempotent\n}', S),
        L(B('ملفات جزئية وأسماء مؤقتة', 'Partial files and temporary names'),
          B('اتفق مع اللي بيبعت الملفات: يكتب باسم مؤقت (`.part` أو `.tmp`) ويغيّر الاسم في الآخر — والسكربت يتجاهل أي امتداد مش في القايمة. ولو انت اللي بتبعت لفولدر حد تاني، اعمل نفس الحاجة (atomic write من الأسبوع اللي فات).', 'Agree with whoever sends the files: write under a temporary name (`.part` or `.tmp`) and rename at the end — and the script ignores any extension not on its list. If you are the one sending to someone else’s folder, do the same (the atomic write from last week).'),
          'sender:  write inbox/orders-0904.csv.part  →  rename → inbox/orders-0904.csv\nscript:  readdir(inbox).filter(f => f.endsWith(".csv"))   // .part is ignored\n         process → move to done/2026-10/ or failed/ + .error.txt\nalert:   failed/ not empty → message to the team (day 5)', T)
      ],
      practice: [
        B('شغّل مثال inbox وضيف ملف CSV مش JSON.', 'Run the inbox example and add a CSV file that is not JSON.'),
        B('خلّي done مقسوم بالشهر.', 'Split done by month.'),
        B('اعمل poll كل 30 ثانية بـ setInterval مع lock.', 'Poll every 30 seconds with setInterval and a lock.'),
        B('جرّب fs.watch وشوف كام حدث بيوصل لملف واحد.', 'Try fs.watch and count the events for one file.')
      ],
      words: [
        W('inbox folder', 'فولدر الملفات اللي مستنية معالجة', 'the folder of files waiting to be processed', 'Drop the CSV in the inbox folder.'),
        W('processed folder', 'فولدر الملفات اللي خلصت', 'the folder of finished files', 'Move it to the processed folder.'),
        W('quarantine', 'عزل الملفات الفاشلة لمراجعتها', 'setting failed files aside for review', 'Bad files go to quarantine.'),
        W('poll', 'الفحص الدوري بدل انتظار حدث', 'checking regularly instead of waiting for an event', 'Poll the folder every minute.'),
        W('partial file', 'ملف لسه بيتكتب', 'a file still being written', 'Ignore partial files ending in .part.')
      ],
      read: [{ lib: 'Node.js: File system', what: B('اقرا fs.watch وCaveats.', 'Read fs.watch and Caveats.') }],
      challenge: B('اعمل «معالج الفواتير»: فولدر inbox لملفات CSV، كل ملف يتحقق ويتجمّع ويتبعت ملخصه لـ webhook n8n، وينتقل لـ done/yyyy-mm أو failed مع السبب، بـ poll كل دقيقة وlock ولوج JSON.', 'Build an «invoice processor»: an inbox folder for CSV files; each file is validated, totalled and its summary sent to an n8n webhook, then moved to done/yyyy-mm or failed with the reason, polling every minute with a lock and JSON logs.'),
      quiz: [
        Q(B('ملف فشل:', 'A file that failed:'), [['failed/ مع السبب', 'failed/ with the reason'], ['يتمسح', 'is deleted'], ['يفضل في inbox', 'stays in inbox']], 0, B('ميضيعش ومبيتعادش.', 'Not lost, not repeated.')),
        Q(B('fs.watch ممكن:', 'fs.watch may:'), [['يبعت الحدث مرتين', 'fire twice'], ['ميشتغلش أبدًا', 'never work'], ['يمسح الملفات', 'delete files']], 0, B('debounce.', 'Debounce.')),
        Q(B('.part معناه:', '.part means:'), [['لسه بيتكتب', 'still being written'], ['جزء من مشروع', 'part of a project'], ['ملف مضغوط', 'a compressed file']], 0, B('تجاهله.', 'Ignore it.'))
      ] },

    { title: B('التفاعل والتنبيهات', 'Interaction and alerts'),
      goal: B('تسأل لما فيه إنسان، وتنبّه لما مفيش.', 'Ask when a person is there, and alert when nobody is.'),
      learn: [
        L(B('أسئلة بـ readline', 'Questions with readline'),
          B('`readline` بيسأل ويستنى إجابة — مفيد لـ **confirmation** قبل حاجة خطيرة («هتمسح 120 ملف، متأكد؟»). بس لو مفيش إنسان (**unattended**: cron أو n8n)، متسألش: اعتمد على flag زي `--yes`، و`process.stdin.isTTY` بيقولك فيه terminal ولا لأ.', '`readline` asks and waits for an answer — useful for a **confirmation** before something dangerous («this deletes 120 files, sure?»). But with no person (**unattended**: cron or n8n), never ask: rely on a flag like `--yes`, and `process.stdin.isTTY` tells you whether there is a terminal.'),
          'import { createInterface } from "node:readline";\n// rl.question() is fine in a terminal but can miss lines that are piped in;\n// reading through the line iterator works in both cases\nconst rl = createInterface({ input: process.stdin });\nconst lines = rl[Symbol.asyncIterator]();\nasync function ask(q) {\n  process.stdout.write(q);\n  const { value = "" } = await lines.next();\n  if (!process.stdin.isTTY) console.log(value);   // echo piped answers\n  return value.trim();\n}\nconst name = await ask("Customer name? ");\nconst qty = Number(await ask("Quantity? "));\nconst ok = (await ask(`Create order: ${qty} × notebook for ${name}? (y/N) `)).toLowerCase() === "y";\nrl.close();\nconsole.log(ok ? `\\n✓ order created for ${name} (${qty})` : "\\ncancelled");', N(null, { stdin: 'Sara\n3\ny\n' })),
        L(B('مخرجات مقروءة', 'Readable output'),
          B('للإنسان: ألوان بسيطة بـ **styletext** (أخضر نجح، أحمر فشل)، وسطر تقدم بيتحدث مكانه بـ `\\r`. بس لو المخرج رايح لملف أو برنامج (مش **tty**)، اطبع نص عادي من غير ألوان ولا `\\r` — عشان اللوج يفضل نضيف.', 'For people: simple colours with **styletext** (green done, red failed), and a progress line updating in place with `\\r`. But if output goes to a file or program (not a **tty**), print plain text without colours or `\\r` — so logs stay clean.'),
          'import { styleText } from "node:util";\nconst tty = process.stdout.isTTY;\nconst paint = (style, s) => tty ? styleText(style, s) : s;\nconst sleep = ms => new Promise(r => setTimeout(r, ms));\nconst total = 5;\nfor (let i = 1; i <= total; i++) {\n  await sleep(40);\n  const bar = "#".repeat(i) + ".".repeat(total - i);\n  if (tty) process.stdout.write(`\\r[${bar}] ${i}/${total}`); else console.log(`progress ${i}/${total}`);\n}\nif (tty) process.stdout.write("\\n");\nconsole.log(paint("green", "✓ 4 sent"), paint("red", "✗ 1 failed"));', N()),
        L(B('تنبيه لما حاجة تقع', 'An alert when something breaks'),
          B('سكربت بيشتغل لوحده لازم يقولك لما يفشل: **notification** لـ Telegram أو Slack أو webhook n8n (اللي يوزّعها). وكمان **heartbeat**: يبعت «أنا عايش» كل تشغيل ناجح، وn8n ينبّهك لو مجاش heartbeat من 26 ساعة — ده بيكشف السكربت اللي **مشتغلش خالص**.', 'A script running alone must tell you when it fails: a **notification** to Telegram, Slack or an n8n webhook (which forwards it). And a **heartbeat**: it sends «I am alive» after each good run, and n8n alerts you if no heartbeat arrived for 26 hours — that catches the script that **did not run at all**.'),
          'async function notify(level, text, extra = {}) {\n  const url = process.env.N8N_ALERT_WEBHOOK;\n  if (!url) return console.error(`[${level}] ${text}`);\n  await fetch(url, {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ app: "orders-report", level, text, host: os.hostname(), ...extra }),\n    signal: AbortSignal.timeout(5000),\n  }).catch(e => console.error("alert failed:", e.message));   // never let the alert crash the script\n}\ntry { await main(); await notify("heartbeat", "run ok", { runId }); }\ncatch (e) { await notify("error", e.message, { runId }); process.exitCode = 1; }', S)
      ],
      practice: [
        B('اعمل سؤال تأكيد قبل المسح، و--yes يتخطاه.', 'Add a confirmation before deleting, skipped by --yes.'),
        B('شغّل مثال التقدم مرة في terminal ومرة بـ > out.txt.', 'Run the progress example once in a terminal and once with > out.txt.'),
        B('اعمل workflow n8n يستقبل التنبيهات ويبعتها Telegram.', 'Build an n8n workflow receiving alerts and sending them to Telegram.'),
        B('اعمل heartbeat ومراقب «مجاش من 26 ساعة» في n8n.', 'Add a heartbeat and a «none for 26 hours» watcher in n8n.')
      ],
      words: [
        W('readline', 'موديول قراءة سطور من الإدخال', 'the module for reading input lines', 'readline asks for the name.'),
        W('confirmation', 'طلب تأكيد قبل فعل', 'asking for approval before acting', 'Ask for confirmation before deleting.'),
        W('unattended', 'شغال من غير إنسان', 'running with nobody watching', 'Unattended runs must not prompt.'),
        W('tty', 'terminal تفاعلي', 'an interactive terminal', 'Colours only when stdout is a TTY.'),
        W('styletext', 'دالة Node لتلوين النص في الترمينال', 'Node’s function for coloured terminal text', 'styleText makes errors red.'),
        W('notification', 'رسالة تنبيه', 'an alert message', 'Send a notification on failure.'),
        W('heartbeat', 'إشارة «أنا شغال» دورية', 'a regular «I am alive» signal', 'No heartbeat for a day means trouble.')
      ],
      read: [{ t: 'Node.js: Readline', url: 'https://nodejs.org/api/readline.html', what: B('اقرا Example: Tiny CLI وrl[Symbol.asyncIterator].', 'Read Example: Tiny CLI and rl[Symbol.asyncIterator].') }, { t: 'Healthchecks.io: docs', url: 'https://healthchecks.io/docs/', what: B('فكرة الـ heartbeat (dead man’s switch).', 'The heartbeat idea (a dead man’s switch).') }],
      challenge: B('ضيف لمشروع الشهر: تنبيه خطأ وheartbeat لـ n8n، ألوان وتقدم في الـ terminal بس، وسؤال تأكيد لأمر «clean» يتخطاه --yes — وجرّب التشغيل من cron للتأكد إنه مبيسألش.', 'Add to the month project: an error alert and a heartbeat to n8n, colours and progress only in a terminal, and a confirmation for a «clean» command skipped by --yes — and run it from cron to make sure it never asks.'),
      quiz: [
        Q(B('سكربت من cron عايز تأكيد:', 'A cron script needing confirmation:'), [['flag --yes', 'a --yes flag'], ['readline', 'readline'], ['يستنى للأبد', 'waits forever']], 0, B('unattended.', 'Unattended.')),
        Q(B('المخرج رايح لملف:', 'Output going to a file:'), [['نص عادي من غير ألوان', 'plain text, no colours'], ['ألوان', 'colours'], ['\\r', '\\r']], 0, B('مش TTY.', 'Not a TTY.')),
        Q(B('heartbeat بيكشف:', 'A heartbeat catches:'), [['سكربت مشتغلش خالص', 'a script that never ran'], ['أخطاء syntax', 'syntax errors'], ['البطء', 'slowness']], 0, B('الصمت مشكلة.', 'Silence is a problem.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('سكربت أتمتة «يشتغل وانت نايم».', 'An automation script that «works while you sleep».'),
      review: [
        B('parseArgs: options وflags وتحقق وusage.', 'parseArgs: options, flags, validation and usage.'),
        B('الجدولة (cron، Task Scheduler، n8n)، والـ lock، والـ time zone.', 'Scheduling (cron, Task Scheduler, n8n), the lock and the time zone.'),
        B('لوج JSON lines بـ run id وتدوير ومن غير أسرار.', 'JSON-lines logs with a run id, rotation and no secrets.'),
        B('inbox ← done/failed، وpoll مقابل watch، والملفات الجزئية.', 'inbox → done/failed, polling vs watching, and partial files.'),
        B('readline للإنسان، وflags للآلة، والتنبيهات والـ heartbeat.', 'readline for people, flags for machines, alerts and heartbeats.')
      ],
      project: B('ابني «حارس فولدر الطلبات»: سكربت Node بيشتغل كل 5 دقايق (cron أو Task Scheduler) بـ lock: ياخد ملفات CSV/JSON من inbox، يتحقق منها، يبعت كل طلب لـ webhook n8n بتوازي 2 وretry، ينقلها لـ done/yyyy-mm أو failed مع السبب، يكتب لوج JSON lines بـ run id وتدوير 14 يوم، يبعت تنبيه لـ n8n لو فيه فشل وheartbeat لو نجح، وعنده أوامر `status` و`retry-failed` و`clean --older 30d` (بتأكيد أو --yes).', 'Build an «orders folder guard»: a Node script running every 5 minutes (cron or Task Scheduler) with a lock: it takes CSV/JSON files from inbox, validates them, sends each order to an n8n webhook with concurrency 2 and retries, moves them to done/yyyy-mm or failed with the reason, writes JSON-lines logs with a run id and 14-day rotation, alerts n8n on failures and sends a heartbeat on success, and offers `status`, `retry-failed` and `clean --older 30d` (with confirmation or --yes).'),
      test: [
        Q(B('-m 2026-09 بيتقري بـ:', '-m 2026-09 is read with:'), ['short: "m"', 'alias()', 'argv[1]'], 0, B('parseArgs.', 'parseArgs.')),
        Q(B('--tag مكرر:', 'A repeated --tag:'), ['multiple: true', 'type: "array"', B('مينفعش', 'impossible')], 0, B('مصفوفة.', 'An array.')),
        Q(B('0 7 * * 1-5:', '0 7 * * 1-5:'), [['7 الصبح أيام الشغل', '7 a.m. on weekdays'], ['كل 7 دقايق', 'every 7 minutes'], ['يوم 7', 'on the 7th']], 0, B('دقيقة ساعة يوم شهر أسبوع.', 'Minute hour day month weekday.')),
        Q(B('التشغيل التاني بدأ والأول لسه شغال:', 'A second run starts while the first runs:'), [['الـ lock يخليه يتخطّى', 'the lock makes it skip'], ['الاتنين يكملوا', 'both continue'], ['الجهاز يقفل', 'the machine shuts down']], 0, B('مفيش تداخل.', 'No overlap.')),
        Q(B('lock عمره يومين:', 'A two-day-old lock:'), [['قديم؛ اتجاهله بحذر', 'stale; take over carefully'], ['استنى', 'wait'], ['امسح المشروع', 'delete the project']], 0, B('النسخة وقعت.', 'The copy crashed.')),
        Q(B('سطر اللوج الكويس فيه:', 'A good log line has:'), [['وقت ومستوى ورسالة وrun id', 'time, level, message and run id'], ['رسالة بس', 'only a message'], ['التوكن', 'the token']], 0, B('structured.', 'Structured.')),
        Q(B('اللوج بيملا الـ disk:', 'Logs fill the disk:'), ['log rotation', B('مسح المشروع', 'delete the project'), B('لوج أقل تفاصيل', 'less detailed logs')], 0, B('ملف يومي ومسح القديم.', 'Daily files, delete old ones.')),
        Q(B('ملف في inbox فشل:', 'A file in inbox failed:'), [['failed/ + السبب', 'failed/ + reason'], ['يتمسح', 'deleted'], ['يتعاد كل مرة', 'retried every run']], 0, B('quarantine.', 'Quarantine.')),
        Q(B('الأثبت للفولدرات على الشبكة:', 'The most solid choice for network folders:'), ['poll', 'fs.watch', B('الاتنين ممنوعين', 'neither')], 0, B('watch بيختلف.', 'watch varies.')),
        Q(B('ملف بينكتب لسه:', 'A file still being written:'), [['اسم مؤقت .part ويتجاهل', 'a temporary .part name that is ignored'], ['يتعالج فورًا', 'processed at once'], ['يتمسح', 'deleted']], 0, B('rename في الآخر.', 'Rename at the end.')),
        Q(B('process.stdout.isTTY = false:', 'process.stdout.isTTY = false:'), [['المخرج لملف أو برنامج', 'output goes to a file or program'], ['مفيش مخرج', 'no output'], ['خطأ', 'an error']], 0, B('من غير ألوان.', 'No colours.')),
        Q(B('التنبيه نفسه فشل:', 'The alert itself fails:'), [['امسكه ومتوقعش السكربت', 'catch it and do not crash the script'], ['اقفل البرنامج', 'crash the program'], ['أعد للأبد', 'retry forever']], 0, B('مش أهم من الشغل.', 'Not above the job.'))
      ] }
  ]
};
