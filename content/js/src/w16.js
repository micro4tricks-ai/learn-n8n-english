// JavaScript week 16 — Node.js basics: files, paths, processes and the month 4 project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('أساسيات Node.js: الملفات والمسارات والعمليات ومشروع الشهر', 'Node.js basics: files, paths, processes and the month project'),
  goal: B('تشتغل بـ Node على جهازك أو سيرفرك: تقرا وتكتب ملفات وفولدرات، وتبني مسارات تشتغل على ويندوز ولينكس، وتتعامل مع arguments والـ stdin وأكواد الخروج، وتشغّل برامج تانية — وتسلّم مشروع الشهر الرابع: أداة سطر أوامر بتجيب من API وتطلّع تقارير.',
          'Work with Node on your computer or server: read and write files and folders, build paths that work on Windows and Linux, handle arguments, stdin and exit codes, run other programs — and deliver the fourth month’s project: a command-line tool that fetches from an API and produces reports.'),
  days: [
    { title: B('الملفات بـ fs/promises', 'Files with fs/promises'),
      goal: B('تقرا وتكتب ملفات JSON ونصوص وفولدرات بأمان.', 'Read and write JSON, text files and folders safely.'),
      learn: [
        L(B('قراءة وكتابة', 'Reading and writing'),
          B('`node:fs/promises` فيه نسخ async من كل حاجة: **readfile** و**writefile** و`appendFile` و`mkdir` و`readdir`. حدد الـ **encoding** (`"utf8"`) عشان ترجع نص مش bytes — ومهم للعربي. و`mkdir(dir, { recursive: true })` بيعمل الفولدرات الناقصة ومبيزعلش لو موجودة.', '`node:fs/promises` has async versions of everything: **readfile**, **writefile**, `appendFile`, `mkdir` and `readdir`. Set the **encoding** (`"utf8"`) to get text, not bytes — important for Arabic. And `mkdir(dir, { recursive: true })` creates missing folders and does not complain if they exist.'),
          'import { mkdir, writeFile, readFile, appendFile, readdir } from "node:fs/promises";\n\nawait mkdir("data/2026-10", { recursive: true });\nconst orders = [{ id: 101, customer: "سارة", total: 250 }, { id: 102, customer: "Omar", total: 90.5 }];\nawait writeFile("data/2026-10/orders.json", JSON.stringify(orders, null, 2), "utf8");\nawait appendFile("data/log.txt", `${new Date().toISOString()} saved ${orders.length} orders\\n`);\n\nconst back = JSON.parse(await readFile("data/2026-10/orders.json", "utf8"));\nconsole.log(back[0].customer, back.reduce((s, o) => s + o.total, 0));\nconsole.log(await readdir("data", { recursive: true }));', N()),
        L(B('لو الملف مش موجود', 'When the file is missing'),
          B('قراءة ملف مش موجود بترمي خطأ بكود **enoent**. متعملش «اتأكد إنه موجود وبعدين اقرا» (ممكن يتمسح بين الخطوتين) — اقرا علطول وامسك الخطأ، وفرّق بين «مش موجود» (رجّع قيمة افتراضية) وأي خطأ تاني (ارميه).', 'Reading a missing file throws an error with the code **enoent**. Do not «check it exists, then read» (it may vanish in between) — read directly and catch the error, telling «not found» (return a default) apart from any other error (rethrow).'),
          'import { readFile } from "node:fs/promises";\n\nasync function readJson(file, fallback) {\n  try {\n    return JSON.parse(await readFile(file, "utf8"));\n  } catch (err) {\n    if (err.code === "ENOENT") return fallback;     // first run: no state yet\n    throw err;                                      // bad JSON, no permission… must be seen\n  }\n}\nconst state = await readJson("state.json", { lastId: 0 });\nconsole.log("start from", state.lastId);\ntry { await readJson("broken.json", {}); } catch (e) { console.log("failed:", e.name, "-", e.message.slice(0, 40)); }', N({ 'broken.json': '{ "lastId": 12, ' })),
        L(B('حالة بين التشغيلات', 'State between runs'),
          B('سكربت بيشتغل كل ساعة محتاج يفتكر «وقفت فين» (آخر id، آخر وقت). ملف `state.json` صغير بيكفي: اقرا في الأول، واكتب في الآخر **بعد** ما الشغل ينجح بس. كده لو وقع في النص، المرة الجاية بيعيد من آخر نقطة سليمة.', 'A script running every hour needs to remember «where it stopped» (the last id, the last time). A small `state.json` is enough: read it at the start, and write it at the end **only after** the work succeeds. If it crashes midway, the next run resumes from the last good point.'),
          'import { readFile, writeFile } from "node:fs/promises";\nconst load = async () => { try { return JSON.parse(await readFile("state.json", "utf8")); } catch { return { lastId: 0 }; } };\n\nasync function run(newOrders) {\n  const state = await load();\n  const fresh = newOrders.filter(o => o.id > state.lastId);\n  console.log(`processing ${fresh.length} new (after id ${state.lastId})`);\n  // … send them to n8n here; if this throws, state.json is not updated\n  if (fresh.length) await writeFile("state.json", JSON.stringify({ lastId: Math.max(...fresh.map(o => o.id)), at: new Date().toISOString() }));\n}\nconst feed = [{ id: 1 }, { id: 2 }, { id: 3 }];\nawait run(feed);\nawait run([...feed, { id: 4 }]);\nawait run([...feed, { id: 4 }]);', N())
      ],
      practice: [
        B('اكتب ملف JSON بأسماء عربي واقراه تاني.', 'Write a JSON file with Arabic names and read it back.'),
        B('اعمل readJson بقيمة افتراضية وجرّب ملف بايظ.', 'Write readJson with a default and try a broken file.'),
        B('اعمل سكربت بيفتكر آخر id بين التشغيلات.', 'Build a script remembering the last id between runs.'),
        B('اعرض كل الملفات في فولدر بـ readdir recursive.', 'List every file in a folder with readdir recursive.')
      ],
      words: [
        W('fs/promises', 'نسخة fs اللي بترجع Promises', 'the version of fs returning promises', 'Import readFile from node:fs/promises.'),
        W('readfile', 'قراءة ملف كامل', 'reading a whole file', 'readFile with "utf8" returns text.'),
        W('writefile', 'كتابة ملف كامل (بيستبدل)', 'writing a whole file (replacing it)', 'writeFile overwrites the old report.'),
        W('encoding', 'طريقة تحويل النص لـ bytes', 'how text is turned into bytes', 'Use utf8 encoding for Arabic.'),
        W('enoent', 'كود خطأ «الملف مش موجود»', 'the «no such file» error code', 'ENOENT means the file is missing.'),
        W('state file', 'ملف بيحفظ آخر نقطة وصلها السكربت', 'a file saving where the script got to', 'The state file holds the last id.')
      ],
      read: [{ lib: 'Node.js: File system', what: B('اقرا Promises API: readFile وwriteFile وmkdir.', 'Read the Promises API: readFile, writeFile and mkdir.') }, { lib: 'Node.js: Learn', what: B('اقرا Working with files.', 'Read Working with files.') }],
      challenge: B('اعمل سكربت «سجل المصروفات»: `node expenses.mjs add 120 "مواصلات"` يضيف سطر لملف JSON، و`list` يعرض الكل، و`total` يجمع الشهر — والملف يتعمل أول مرة لوحده.', 'Write an «expenses log» script: `node expenses.mjs add 120 "transport"` adds a line to a JSON file, `list` shows all, `total` sums the month — and the file is created on the first run.'),
      quiz: [
        Q(B('readFile من غير encoding بيرجّع:', 'readFile without an encoding returns:'), ['Buffer', 'string', 'JSON'], 0, B('bytes.', 'Bytes.')),
        Q(B('الطريقة الصح لملف ممكن ميكونش موجود:', 'The right way for a file that may be missing:'), [['اقرا وامسك ENOENT', 'read and catch ENOENT'], ['افحص وبعدين اقرا', 'check, then read'], ['متقراش', 'do not read']], 0, B('مفيش سباق.', 'No race.')),
        Q(B('state.json يتكتب إمتى؟', 'When is state.json written?'), [['بعد نجاح الشغل', 'after the work succeeds'], ['في الأول', 'at the start'], ['أبدًا', 'never']], 0, B('نقطة سليمة.', 'A good checkpoint.'))
      ] },

    { title: B('المسارات', 'Paths'),
      goal: B('تبني مسارات صح على أي نظام ومن أي مكان.', 'Build correct paths on any system and from any place.'),
      learn: [
        L(B('path.join وpath.resolve', 'path.join and path.resolve'),
          B('ويندوز بيستخدم `\\` ولينكس `/`. متجمعش المسارات بنصوص — **path.join** بيحط الفاصل الصح ويشيل الزيادات، و**path.resolve** بيطلّع **absolute path** كامل. و`basename` و`extname` و`dirname` بيفكّوا المسار لأجزاء.', 'Windows uses `\\` and Linux `/`. Do not glue paths as strings — **path.join** puts the right separator and removes extras, and **path.resolve** gives a full **absolute path**. `basename`, `extname` and `dirname` split a path into parts.'),
          'import path from "node:path";\n\nconst file = path.join("reports", "2026-10", "..", "2026-09", "sales.csv");\nconsole.log(file);\nconsole.log(path.basename(file), path.extname(file), path.basename(file, ".csv"), path.dirname(file));\nconsole.log("windows style:", path.win32.join("C:\\\\data", "reports", "sales.csv"));\nconsole.log("absolute:", path.isAbsolute(path.resolve(file)));', N()),
        L(B('مسار ملف الكود نفسه', 'The path of the code file itself'),
          B('المسارات النسبية بتتحسب من **working directory** (`process.cwd()`) — يعني المكان اللي شغّلت منه الأمر، مش مكان الملف! لو السكربت محتاج ملف جنبه (template، config)، استخدم **import.meta.dirname** (Node 20.11+) عشان يشتغل من أي مكان (Task Scheduler، cron، n8n Execute Command).', 'Relative paths are resolved from the **working directory** (`process.cwd()`) — where you ran the command, not where the file is! If the script needs a file next to it (a template, a config), use **import.meta.dirname** (Node 20.11+) so it works from anywhere (Task Scheduler, cron, n8n Execute Command).'),
          'import path from "node:path";\nimport { readFile } from "node:fs/promises";\n\nconsole.log("cwd (where you ran node):", process.cwd());\nconsole.log("script folder:", import.meta.dirname);\nconsole.log("same here?", process.cwd() === import.meta.dirname, "— run it from another folder and they differ");\nconst template = await readFile(path.join(import.meta.dirname, "templates", "greeting.txt"), "utf8");\nconsole.log(template.replace("{name}", "Sara"));', N({ 'templates/greeting.txt': 'Hello {name}, your order has shipped.' })),
        L(B('أسماء ملفات آمنة', 'Safe file names'),
          B('أسماء الملفات اللي جاية من بيانات (اسم عميل، عنوان) ممكن يكون فيها `/` أو `..` أو رموز ممنوعة في ويندوز (`: * ? " < > |`). نضّفها قبل ما تعمل بيها ملف، وإلا ممكن تكتب برة الفولدر بتاعك (**path traversal**).', 'File names coming from data (a customer’s name, a title) may contain `/`, `..` or characters forbidden on Windows (`: * ? " < > |`). Clean them before making a file, or you may write outside your folder (**path traversal**).'),
          'import path from "node:path";\nconst safeName = s => s.normalize("NFC").replace(/[\\\\/:*?"<>|\\x00-\\x1f]/g, "-").replace(/\\.\\.+/g, ".").replace(/^[.\\s]+|[.\\s]+$/g, "").slice(0, 80) || "file";\nconst base = path.resolve("invoices");\nfor (const name of ["فاتورة سارة 2026/10", "../../etc/passwd", "Q3: report?", "  .hidden. "]) {\n  const full = path.join(base, safeName(name) + ".pdf");\n  console.log(JSON.stringify(name).padEnd(28), "→", path.basename(full), full.startsWith(base + path.sep) ? "✓ inside" : "✗ outside");\n}', N())
      ],
      practice: [
        B('ابني مسار reports/السنة/الشهر بـ path.join.', 'Build a reports/year/month path with path.join.'),
        B('شغّل سكربت من فولدر تاني وشوف cwd بيتغير.', 'Run a script from another folder and watch cwd change.'),
        B('استخدم import.meta.dirname لقراءة template.', 'Use import.meta.dirname to read a template.'),
        B('جرّب safeName على 5 أسماء غريبة.', 'Try safeName on 5 odd names.')
      ],
      words: [
        W('path.join', 'جمع أجزاء مسار بالفاصل الصح', 'joining path parts with the right separator', 'path.join works on Windows and Linux.'),
        W('path.resolve', 'تحويل مسار لمسار كامل', 'turning a path into an absolute one', 'path.resolve starts from cwd.'),
        W('absolute path', 'مسار كامل من الجذر', 'a full path from the root', 'Log the absolute path of the report.'),
        W('working directory', 'الفولدر اللي شغّلت منه الأمر', 'the folder you ran the command from', 'Relative paths use the working directory.'),
        W('import.meta.dirname', 'فولدر ملف الموديول الحالي', 'the folder of the current module file', 'Read the template via import.meta.dirname.'),
        W('path traversal', 'الخروج من الفولدر بـ ../', 'escaping a folder with ../', 'Clean names to stop path traversal.')
      ],
      read: [{ t: 'Node.js: Path', url: 'https://nodejs.org/api/path.html', what: B('اقرا join وresolve وparse.', 'Read join, resolve and parse.') }],
      challenge: B('اعمل دالة reportPath(kind, date, name) بترجّع `reports/<kind>/<yyyy>/<mm>/<safe-name>.<ext>` مطلق، وبتعمل الفولدرات، ومستحيل تطلع برة reports — واكتب 6 اختبارات بسيطة بـ console.assert.', 'Write reportPath(kind, date, name) returning an absolute `reports/<kind>/<yyyy>/<mm>/<safe-name>.<ext>`, creating the folders, and never escaping reports — with 6 simple console.assert checks.'),
      quiz: [
        Q(B('ملف جنب السكربت يتقري بـ:', 'A file next to the script is read with:'), ['import.meta.dirname', 'process.cwd()', B('مسار نسبي', 'a relative path')], 0, B('من أي مكان.', 'From anywhere.')),
        Q(B('path.join("a", "..", "b"):', 'path.join("a", "..", "b"):'), ['b', 'a/../b', 'a/b'], 0, B('بيبسّط.', 'It normalises.')),
        Q(B('اسم ملف من بيانات العميل:', 'A file name from customer data:'), [['نضّفه الأول', 'clean it first'], ['استخدمه زي ما هو', 'use it as is'], ['مستحيل', 'impossible']], 0, B('path traversal.', 'Path traversal.'))
      ] },

    { title: B('العملية: arguments والإدخال والخروج', 'The process: arguments, input and exit'),
      goal: B('تكتب سكربت بيتكلم صح مع سطر الأوامر والأدوات التانية.', 'Write a script that talks properly with the command line and other tools.'),
      learn: [
        L(B('argv وexit codes', 'argv and exit codes'),
          B('**process.argv** فيه الأمر: `[node, script, ...args]` — الـ arguments من 2. ولما تخلص: **process.exit** بكود 0 = نجح، وأي رقم تاني = فشل. ده اللي n8n (Execute Command) وTask Scheduler وCI بيشوفوه عشان يعرفوا السكربت نجح ولا لأ.', '**process.argv** holds the command: `[node, script, ...args]` — the arguments start at 2. When done: **process.exit** with 0 = success, any other number = failure. That is what n8n (Execute Command), Task Scheduler and CI look at to know whether the script worked.'),
          'const [cmd, ...rest] = process.argv.slice(2);\nconsole.log("command:", cmd, "args:", rest);\nif (cmd !== "report") {\n  console.error("usage: node main.mjs report <month>");\n  process.exitCode = 2;          // set the code and let the program end normally\n} else {\n  console.log(`building the ${rest[0] ?? "current"} report…`);\n}', N(null, { args: ['report', '2026-09'] })),
        L(B('stdout وstderr وstdin', 'stdout, stderr and stdin'),
          B('**stdout** للنتيجة (اللي ممكن يتحوّل لملف أو برنامج تاني بـ `|`)، و**stderr** للرسايل والأخطاء. و**stdin** بيقرا المدخل — فتقدر توصّل سكربتات ببعض: `cat orders.csv | node total.mjs > total.txt`. المثال بيقرا أرقام من stdin:', '**stdout** is for the result (which can be redirected to a file or another program with `|`), and **stderr** for messages and errors. **stdin** reads input — so you can chain scripts: `cat orders.csv | node total.mjs > total.txt`. This example reads numbers from stdin:'),
          'import { createInterface } from "node:readline";\nlet sum = 0, bad = 0;\nfor await (const line of createInterface({ input: process.stdin })) {\n  const n = Number(line.split(",")[1]);\n  if (Number.isFinite(n)) sum += n; else bad++;\n}\nconsole.error(`skipped ${bad} line(s)`);   // a message → stderr\nconsole.log(sum.toFixed(2));               // the result → stdout', N(null, { stdin: 'id,total\n101,250\n102,90.5\n103,oops\n104,45\n' })),
        L(B('الإيقاف بنظافة', 'Stopping cleanly'),
          B('لما حد يدوس Ctrl+C أو السيرفر يقفل البرنامج، Node بياخد **signal** (`SIGINT` أو `SIGTERM`). اعمل **graceful shutdown**: وقّف استقبال شغل جديد، كمّل اللي في الإيد أو احفظ الحالة، واقفل الاتصالات — وبعدين اخرج. وإلا ممكن تسيب ملف نص مكتوب.', 'When someone presses Ctrl+C or the server stops the program, Node receives a **signal** (`SIGINT` or `SIGTERM`). Do a **graceful shutdown**: stop taking new work, finish or save what is in hand, close connections — then exit. Otherwise you may leave a half-written file.'),
          'let stopping = false;\nfor (const sig of ["SIGINT", "SIGTERM"]) {\n  process.on(sig, async () => {\n    if (stopping) return;\n    stopping = true;\n    console.error(`${sig}: finishing the current order, then exiting…`);\n    await queue.drain();        // finish what is in hand\n    await saveState();          // remember where we stopped\n    process.exit(0);\n  });\n}', S)
      ],
      practice: [
        B('اعمل سكربت بأمرين add وlist من argv.', 'Write a script with add and list commands from argv.'),
        B('شغّل مثال stdin بملف CSV حقيقي بـ |.', 'Run the stdin example with a real CSV file using |.'),
        B('خلّي الأخطاء تروح stderr وجرّب `2> errors.txt`.', 'Send errors to stderr and try `2> errors.txt`.'),
        B('ضيف SIGINT handler لسكربت طويل.', 'Add a SIGINT handler to a long script.')
      ],
      words: [
        W('process.argv', 'الأمر والـ arguments اللي اتشغّل بيها السكربت', 'the command and arguments the script ran with', 'Read the month from process.argv.'),
        W('process.exit', 'إنهاء البرنامج بكود', 'ending the program with a code', 'Prefer process.exitCode to process.exit.'),
        W('stdout', 'مخرج النتيجة', 'the output stream for results', 'Pipe stdout into a file.'),
        W('stderr', 'مخرج الرسايل والأخطاء', 'the output stream for messages and errors', 'Warnings go to stderr.'),
        W('stdin', 'مدخل البيانات للبرنامج', 'the input stream of a program', 'Read CSV lines from stdin.'),
        W('signal', 'إشارة من النظام للبرنامج', 'a notice from the system to a program', 'SIGTERM is the stop signal.'),
        W('graceful shutdown', 'إيقاف بعد إنهاء الشغل الحالي', 'stopping after finishing current work', 'Graceful shutdown saves the state.')
      ],
      read: [{ t: 'Node.js: Process', url: 'https://nodejs.org/api/process.html', what: B('اقرا process.argv وexitCode وSignal events.', 'Read process.argv, exitCode and Signal events.') }, { lib: 'Node.js: Learn', what: B('اقرا Command Line: accept input وoutput to the command line.', 'Read Command Line: accept input and output to the command line.') }],
      challenge: B('اعمل `csvtotal.mjs`: يقرا CSV من stdin أو من ملف (argument)، يجمع عمود بالاسم (`--col total`)، يطبع النتيجة على stdout والتحذيرات على stderr، ويخرج بكود 1 لو مفيش ولا سطر سليم.', 'Write `csvtotal.mjs`: read CSV from stdin or a file (argument), sum a column by name (`--col total`), print the result on stdout and warnings on stderr, and exit with code 1 if no line was valid.'),
      quiz: [
        Q(B('أول argument بتاعك في:', 'Your first argument is in:'), ['process.argv[2]', 'process.argv[0]', 'process.argv[1]'], 0, B('0 node و1 السكربت.', '0 is node, 1 the script.')),
        Q(B('exit code 0:', 'Exit code 0:'), [['نجاح', 'success'], ['فشل', 'failure'], ['تحذير', 'a warning']], 0, B('أي حاجة تانية فشل.', 'Anything else fails.')),
        Q(B('رسالة «تخطيت سطر»:', 'A «skipped a line» message:'), ['stderr', 'stdout', 'stdin'], 0, B('النتيجة تفضل نضيفة.', 'Keeps the result clean.'))
      ] },

    { title: B('تشغيل برامج تانية ومعلومات النظام', 'Running other programs and system info'),
      goal: B('تشغّل أوامر النظام من Node بأمان.', 'Run system commands from Node safely.'),
      learn: [
        L(B('execFile', 'execFile'),
          B('**child process** = برنامج تاني بتشغّله من Node (git، ffmpeg، python، سكربت تاني). **execfile** بياخد البرنامج والـ arguments **كمصفوفة** — مفيش shell، فمفيش حقن أوامر. استخدمه بدل `exec` اللي بياخد نص كامل للـ shell.', 'A **child process** = another program you start from Node (git, ffmpeg, python, another script). **execfile** takes the program and the arguments **as an array** — no shell, so no command injection. Use it instead of `exec`, which passes one string to the shell.'),
          'import { execFile } from "node:child_process";\nimport { promisify } from "node:util";\nconst run = promisify(execFile);\n\nconst { stdout } = await run(process.execPath, ["-e", "console.log(JSON.stringify({ node: process.version, ok: true }))"]);\nconsole.log("child said:", JSON.parse(stdout));\n\ntry { await run(process.execPath, ["-e", "process.exit(3)"]); }\ncatch (e) { console.log("failed: child exited with code", e.code); }', N()),
        L(B('spawn للمخرجات الطويلة', 'spawn for long output'),
          B('**spawn** بيدّيك المخرج **أول بأول** (stream) — مناسب لأوامر طويلة (backup، تحويل فيديو) عشان تعرض التقدم ومتملاش الذاكرة. واسمع لحدث `close` عشان تعرف الكود.', '**spawn** hands you the output **as it comes** (a stream) — right for long commands (a backup, a video conversion) so you can show progress without filling memory. Listen for `close` to learn the exit code.'),
          'import { spawn } from "node:child_process";\nconst child = spawn(process.execPath, ["-e", "let i = 0; const t = setInterval(() => { console.log(`step ${++i}/3`); if (i === 3) clearInterval(t); }, 50);"]);\nchild.stdout.on("data", chunk => process.stdout.write("  > " + chunk));\nchild.on("close", code => console.log("finished with code", code));', N()),
        L(B('os والفولدر المؤقت', 'os and the temp folder'),
          B('**os module** بيقولك عن الجهاز: النظام، عدد المعالجات، الذاكرة، والـ **temp folder**. الملفات المؤقتة (تحميلات قبل المعالجة) مكانها `os.tmpdir()` في فولدر خاص بـ `mkdtemp` — وامسحه في الآخر.', 'The **os module** tells you about the machine: the system, CPU count, memory and the **temp folder**. Temporary files (downloads before processing) go in `os.tmpdir()`, in a private folder from `mkdtemp` — and delete it at the end.'),
          'import os from "node:os";\nimport path from "node:path";\nimport { mkdtemp, writeFile, rm, readdir } from "node:fs/promises";\n\nconsole.log("platform:", typeof os.platform(), "· cpus:", os.availableParallelism() > 0, "· free MB > 0:", os.freemem() > 0);\nconst dir = await mkdtemp(path.join(os.tmpdir(), "orders-"));\ntry {\n  await writeFile(path.join(dir, "raw.json"), "[]");\n  console.log("temp files:", await readdir(dir));\n} finally {\n  await rm(dir, { recursive: true, force: true });\n  console.log("temp folder removed");\n}', N())
      ],
      practice: [
        B('شغّل `git --version` بـ execFile واطبع الإصدار.', 'Run `git --version` with execFile and print the version.'),
        B('اعمل spawn لأمر طويل واعرض تقدمه.', 'spawn a long command and show its progress.'),
        B('اعمل فولدر مؤقت واكتب فيه وامسحه في finally.', 'Create a temp folder, write into it and delete it in finally.'),
        B('اشرح ليه execFile أأمن من exec.', 'Explain why execFile is safer than exec.')
      ],
      words: [
        W('child process', 'برنامج بتشغّله من برنامجك', 'a program started by your program', 'ffmpeg runs as a child process.'),
        W('execfile', 'تشغيل برنامج بـ arguments من غير shell', 'running a program with arguments and no shell', 'execFile avoids command injection.'),
        W('spawn', 'تشغيل برنامج ومتابعة مخرجه أول بأول', 'starting a program and streaming its output', 'spawn shows the backup progress.'),
        W('command injection', 'حقن أوامر عبر مدخلات', 'injecting commands through input', 'exec with user input risks command injection.'),
        W('os module', 'موديول معلومات النظام', 'the module for system information', 'The os module gives the temp folder.'),
        W('temp folder', 'فولدر الملفات المؤقتة', 'the folder for temporary files', 'Delete the temp folder in finally.')
      ],
      read: [{ t: 'Node.js: Child process', url: 'https://nodejs.org/api/child_process.html', what: B('اقرا execFile وspawn.', 'Read execFile and spawn.') }, { t: 'Node.js: OS', url: 'https://nodejs.org/api/os.html', what: B('لف على الدوال.', 'Skim the functions.') }],
      challenge: B('اعمل `backup.mjs` بيضغط فولدر (بـ tar أو PowerShell Compress-Archive عن طريق execFile حسب النظام)، يكتب الأرشيف باسم بالتاريخ، ويمسح النسخ الأقدم من 7 أيام، ويطبع ملخص.', 'Write `backup.mjs` that compresses a folder (tar or PowerShell Compress-Archive via execFile depending on the system), names the archive by date, deletes copies older than 7 days and prints a summary.'),
      quiz: [
        Q(B('أمر فيه اسم ملف من المستخدم:', 'A command with a user-supplied file name:'), ['execFile', 'exec', 'eval'], 0, B('من غير shell.', 'No shell.')),
        Q(B('أمر بيطلع مخرج لساعة:', 'A command producing output for an hour:'), ['spawn', 'execFile', B('في الذاكرة', 'buffer it in memory')], 0, B('stream.', 'A stream.')),
        Q(B('مسح الفولدر المؤقت مكانه:', 'Deleting the temp folder belongs in:'), ['finally', 'catch', B('مش مهم', 'nowhere')], 0, B('حتى لو حصل خطأ.', 'Even after an error.'))
      ] },

    { title: B('أداة سطر أوامر حقيقية', 'A real command-line tool'),
      goal: B('تجمع الأسبوع في أداة تشتغل يوميًا من غير مشاكل.', 'Bring the week together in a tool that runs daily without trouble.'),
      learn: [
        L(B('كتابة آمنة', 'Safe writes'),
          B('لو البرنامج وقع وهو بيكتب `report.json`، الملف هيبقى نص مكتوب وبايظ. **atomic write**: اكتب في ملف مؤقت جنبه، وبعدين **rename** للاسم النهائي — والـ rename على نفس الـ disk بيحصل مرة واحدة: يا القديم يا الجديد كامل.', 'If the program crashes while writing `report.json`, the file ends up half-written and broken. An **atomic write**: write to a temp file next to it, then **rename** it to the final name — a rename on the same disk happens in one step: either the old or the complete new file.'),
          'import { writeFile, rename, readFile } from "node:fs/promises";\nasync function writeAtomic(file, text) {\n  const tmp = `${file}.${process.pid}.tmp`;\n  await writeFile(tmp, text, "utf8");\n  await rename(tmp, file);            // all or nothing\n}\nawait writeAtomic("report.json", JSON.stringify({ month: "2026-09", total: 12500 }));\nconsole.log(await readFile("report.json", "utf8"));', N()),
        L(B('البحث عن ملفات بـ glob', 'Finding files with glob'),
          B('**glob** = نمط لاختيار ملفات: `reports/**/*.csv` = كل ملفات CSV في reports وفولدراتها. Node 22+ فيه `fs.glob` مدمج. مفيد لـ «اجمع كل فواتير الشهر» أو «امسح الملفات القديمة».', 'A **glob** = a pattern for picking files: `reports/**/*.csv` = every CSV file in reports and its folders. Node 22+ has a built-in `fs.glob`. Handy for «collect every invoice of the month» or «delete old files».'),
          'import { glob, readFile } from "node:fs/promises";\nlet total = 0, files = 0;\nfor await (const file of glob("invoices/**/*.json")) {\n  const inv = JSON.parse(await readFile(file, "utf8"));\n  total += inv.total; files++;\n}\nconsole.log(`${files} invoices, total ${total}`);', N({ 'invoices/2026-09/a.json': '{"total": 120}', 'invoices/2026-09/b.json': '{"total": 80}', 'invoices/2026-10/c.json': '{"total": 45.5}', 'invoices/readme.txt': 'not json' })),
        L(B('شكل الأداة', 'The shape of the tool'),
          B('أداة **cli** محترمة: `--help` واضح، أوامر بأسماء، قيم افتراضية معقولة، `--dry-run` يوريك هيعمل إيه من غير ما يعمله، لوج في ملف، أكواد خروج صح، ومبتسألش أسئلة لو شغالة من غير إنسان (cron، n8n). و`#!/usr/bin/env node` (**shebang**) في أول سطر عشان تشتغل كأمر على لينكس.', 'A decent **cli** tool: a clear `--help`, named commands, sensible defaults, a `--dry-run` that shows what it would do without doing it, a log file, correct exit codes, and no questions when running unattended (cron, n8n). And `#!/usr/bin/env node` (a **shebang**) on the first line so it runs as a command on Linux.'),
          '#!/usr/bin/env node\n// orders-report — usage:\n//   orders-report fetch  [--since 2026-09-01] [--dry-run]\n//   orders-report build  --month 2026-09 [--out reports]\n//   orders-report send   --month 2026-09            (POST the summary to n8n)\n// exit codes: 0 ok · 1 failed · 2 bad usage', T)
      ],
      practice: [
        B('استبدل writeFile بـ writeAtomic في سكربت عندك.', 'Replace writeFile with writeAtomic in one of your scripts.'),
        B('اجمع كل ملفات CSV في فولدر بـ glob.', 'Collect every CSV file in a folder with glob.'),
        B('اكتب --help لأداتك قبل الكود.', 'Write your tool’s --help before the code.'),
        B('ضيف --dry-run بيطبع الخطة بس.', 'Add a --dry-run that only prints the plan.')
      ],
      words: [
        W('atomic write', 'كتابة يا كاملة يا مفيش', 'a write that is all or nothing', 'Use an atomic write for the report.'),
        W('rename', 'تغيير اسم ملف أو نقله', 'changing a file’s name or moving it', 'rename swaps in the finished file.'),
        W('glob', 'نمط لاختيار ملفات', 'a pattern for picking files', 'The glob **/*.csv finds every CSV.'),
        W('cli', 'برنامج بيشتغل من سطر الأوامر', 'a program run from the command line', 'The CLI has a --help flag.'),
        W('dry run', 'تجربة بتوريك الخطة من غير تنفيذ', 'a trial showing the plan without doing it', 'Run with --dry-run first.'),
        W('shebang', 'السطر #! اللي بيحدد مشغّل السكربت', 'the #! line naming the script’s interpreter', 'The shebang makes it executable on Linux.')
      ],
      read: [{ lib: 'Commander.js', what: B('اقرا Quick Start (لو احتجت أوامر كتير).', 'Read the Quick Start (for when you need many commands).') }, { t: 'Command Line Interface Guidelines', url: 'https://clig.dev/', what: B('اقرا The Basics.', 'Read The Basics.') }],
      challenge: B('اكتب --help كامل وهيكل الأوامر لمشروع الشهر قبل ما تكتب كوده، ووريه لحد يقولك فاهمه ولا لأ.', 'Write the full --help and the command structure for the month project before writing its code, and show it to someone to see if they understand it.'),
      quiz: [
        Q(B('كتابة ملف ممكن تتقطع:', 'A file write that may be interrupted:'), [['اكتب مؤقت وrename', 'write a temp file and rename'], ['writeFile عادي', 'a plain writeFile'], ['appendFile', 'appendFile']], 0, B('atomic.', 'Atomic.')),
        Q(B('reports/**/*.csv:', 'reports/**/*.csv:'), [['كل CSV في reports وجواها', 'every CSV in reports and below'], ['ملف واحد', 'one file'], ['الفولدرات بس', 'only folders']], 0, B('glob.', 'A glob.')),
        Q(B('--dry-run:', '--dry-run:'), [['يوري الخطة من غير تنفيذ', 'shows the plan without acting'], ['يمسح كل حاجة', 'deletes everything'], ['أسرع تشغيل', 'the fastest run']], 0, B('أمان.', 'Safety.'))
      ] },

    { title: B('مراجعة الشهر الرابع ومشروعه', 'Month 4 review and project'),
      goal: B('أداة تقارير حقيقية من API لملفات لـ n8n.', 'A real reporting tool from an API to files to n8n.'),
      review: [
        B('async/await، والتوازي المحدود، والمهلة، وretry (أسبوع 13).', 'async/await, limited concurrency, timeouts and retries (week 13).'),
        B('fetch، وres.ok، والـ headers، والصفحات، وعميل API (أسبوع 14).', 'fetch, res.ok, headers, pages and an API client (week 14).'),
        B('الموديولات، وnpm، و.env، والمكتبات الآمنة (أسبوع 15).', 'Modules, npm, .env and safe packages (week 15).'),
        B('fs/promises، والمسارات، وargv/stdin/exit codes، وchild processes.', 'fs/promises, paths, argv/stdin/exit codes and child processes.'),
        B('atomic write، وglob، وشكل أداة CLI محترمة.', 'Atomic writes, glob and the shape of a decent CLI tool.')
      ],
      project: B('مشروع الشهر الرابع «orders-report»: أداة Node CLI بـ `fetch` (تجيب السلال والمنتجات من DummyJSON بالصفحات بتوازي 3 وretry ومهلة)، و`build --month` (تحسب الإجماليات حسب المنتج والفئة واليوم وتكتب JSON وCSV بـ UTF-8 BOM عشان Excel يقرا العربي، بكتابة atomic في reports/yyyy/mm)، و`send` (تبعت الملخص لـ webhook n8n من .env)، مع state.json، و--dry-run، و--help، ولوج في ملف، وأكواد خروج صح — وشغّلها يوميًا من n8n (Execute Command) أو Task Scheduler.', 'Month 4 project «orders-report»: a Node CLI with `fetch` (getting carts and products from DummyJSON by pages with concurrency 3, retries and a timeout), `build --month` (computing totals by product, category and day and writing JSON and CSV with a UTF-8 BOM so Excel reads Arabic, using atomic writes into reports/yyyy/mm), and `send` (posting the summary to an n8n webhook from .env), with state.json, --dry-run, --help, a log file and correct exit codes — and run it daily from n8n (Execute Command) or Task Scheduler.'),
      test: [
        Q(B('readFile(file, "utf8") بيرجّع:', 'readFile(file, "utf8") returns:'), ['a string', 'a Buffer', 'an object'], 0, B('نص.', 'Text.')),
        Q(B('ENOENT معناه:', 'ENOENT means:'), [['الملف مش موجود', 'the file does not exist'], ['مفيش صلاحية', 'no permission'], ['JSON بايظ', 'bad JSON']], 0, B('No ENTry.', 'No ENTry.')),
        Q(B('mkdir بـ recursive: true:', 'mkdir with recursive: true:'), [['يعمل الناقص ومبيزعلش لو موجود', 'creates what is missing and is fine if it exists'], ['يمسح', 'deletes'], ['يفشل لو موجود', 'fails if it exists']], 0, B('آمن.', 'Safe.')),
        Q(B('مسار يشتغل على ويندوز ولينكس:', 'A path working on Windows and Linux:'), ['path.join', B('جمع بـ "/"', 'joining with "/"'), B('جمع بـ "\\\\"', 'joining with "\\\\"')], 0, B('الفاصل الصح.', 'The right separator.')),
        Q(B('السكربت شغال من n8n ومش لاقي template جنبه:', 'Run from n8n, the script cannot find the template next to it:'), ['import.meta.dirname', 'process.cwd()', B('مسار نسبي', 'a relative path')], 0, B('مكان الملف.', 'The file’s folder.')),
        Q(B('process.argv[2]:', 'process.argv[2]:'), [['أول argument', 'the first argument'], ['اسم السكربت', 'the script name'], ['node', 'node']], 0, B('من 2.', 'From 2.')),
        Q(B('الأخطاء والتحذيرات تروح:', 'Errors and warnings go to:'), ['stderr', 'stdout', 'stdin'], 0, B('النتيجة نضيفة.', 'Clean results.')),
        Q(B('Ctrl+C في نص الشغل:', 'Ctrl+C mid-job:'), [['SIGINT وإيقاف بنظافة', 'SIGINT and a graceful shutdown'], ['مفيش حاجة', 'nothing'], ['يعيد التشغيل', 'a restart']], 0, B('احفظ الحالة.', 'Save the state.')),
        Q(B('تشغيل git من Node:', 'Running git from Node:'), ['execFile("git", [...])', 'exec("git " + input)', 'eval'], 0, B('من غير shell.', 'No shell.')),
        Q(B('الملفات المؤقتة:', 'Temporary files:'), [['mkdtemp في os.tmpdir والمسح في finally', 'mkdtemp in os.tmpdir, deleted in finally'], ['في فولدر المشروع للأبد', 'in the project folder forever'], ['في Git', 'in Git']], 0, B('نضافة.', 'Tidiness.')),
        Q(B('report.json ميبوظش لو وقع البرنامج:', 'report.json survives a crash with:'), [['atomic write', 'an atomic write'], ['appendFile', 'appendFile'], ['كتابة أسرع', 'a faster write']], 0, B('temp + rename.', 'Temp + rename.')),
        Q(B('سكربت شغال من cron:', 'A script run by cron:'), [['ميسألش أسئلة ويرجع exit code صح', 'asks no questions and returns the right exit code'], ['يستنى إدخال', 'waits for input'], ['يفتح نافذة', 'opens a window']], 0, B('من غير إنسان.', 'Unattended.'))
      ] }
  ]
};
