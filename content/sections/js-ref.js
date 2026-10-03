// Reference sections of js.html: printable cheat sheets (sheets), automation projects (lessons) and the
// common errors with their fixes (cards). Section types are in assets/js/sections.js; texts are {ar, en}.
(function(){
function R(code, ar, en){ return [code, { ar: ar, en: en }]; }
function S(id, ar, en, subAr, subEn, groups){ return { id: id, t: { ar: ar, en: en }, sub: { ar: subAr, en: subEn }, groups: groups }; }
function G(ar, en, rows){ return { t: { ar: ar, en: en }, rows: rows }; }

SECTIONS.add({
  page: 'js', id: 'sheets', order: 3, type: 'sheets', kind: 's',
  title: { ar: 'ملخصات للطباعة', en: 'Printable cheat sheets' }, nav: { ar: 'الملخصات', en: 'Cheat sheets' },
  desc: { ar: 'كل ملخص صفحة A4 تتعلّق جنب الشاشة: أساسيات جافاسكريبت، والمصفوفات والكائنات، والنصوص وRegex، والكود غير المتزامن، والـ DOM، وHTML، وتخطيط CSS، وNode.js، وTypeScript، وCode node في n8n، وPlaywright، وnpm وGit.', en: 'Each sheet is one A4 page to keep by your screen: JavaScript basics, arrays and objects, strings and regex, async code, the DOM, HTML, CSS layout, Node.js, TypeScript, the n8n Code node, Playwright, and npm and Git.' },
  items: [
    S('basics', 'أساسيات جافاسكريبت', 'JavaScript basics', 'المتغيرات والأنواع والعمليات والشروط والتكرار والدوال.', 'Variables, types, operators, conditions, loops and functions.', [
      G('المتغيرات والأنواع', 'Variables and types', [
        R('const rate = 0.14;  let count = 0;', 'const افتراضيًا، let لو هتغيّر القيمة', 'const by default, let when the value changes'),
        R('typeof 5 → "number"   typeof "a" → "string"   typeof null → "object"', 'تعرف النوع (null استثناء قديم)', 'Checking the type (null is an old quirk)'),
        R('Number("42")  String(42)  Boolean("")  parseInt("08", 10)', 'تحويل بين الأنواع', 'Converting between types'),
        R('Number.isNaN(x)  Number.isInteger(x)  Number.isFinite(x)', 'فحص الأرقام', 'Checking numbers'),
        R('`Total: ${total.toFixed(2)} EGP`', 'نص فيه قيم (template literal)', 'Text with values (a template literal)'),
        R('0.1 + 0.2 → 0.30000000000000004', 'الكسور العشرية مش دقيقة: قرّب', 'Decimals are not exact: round them')
      ]),
      G('المقارنة والمنطق', 'Comparison and logic', [
        R('a === b   a !== b', 'قارن دايمًا بـ === و!==', 'Always compare with === and !=='),
        R('a && b   a || b   !a', 'و، أو، مش', 'and, or, not'),
        R('x ?? "default"', 'بديل لو null أو undefined بس', 'A fallback for null or undefined only'),
        R('user?.address?.city', 'اقرا خاصية ممكن تكون ناقصة', 'Read a property that may be missing'),
        R('const label = n > 1000 ? "big" : "small";', 'شرط في سطر', 'A one-line condition'),
        R('falsy: false 0 "" null undefined NaN', 'القيم اللي بتعتبر false', 'The values that count as false')
      ]),
      G('التكرار', 'Loops', [
        R('for (const item of items) { … }', 'لف على العناصر', 'Loop over the items'),
        R('for (let i = 0; i < n; i++) { … }', 'لف بعدّاد', 'Loop with a counter'),
        R('for (const [key, value] of Object.entries(obj)) { … }', 'لف على كائن', 'Loop over an object'),
        R('while (queue.length) { const job = queue.shift(); … }', 'كرّر لحد ما تخلص', 'Repeat until done'),
        R('break   continue', 'اخرج من اللوب / روح للي بعده', 'Leave the loop / skip to the next one'),
        R('items.forEach((item, i) => …)', 'لف بدالة (من غير break)', 'Loop with a function (no break)')
      ]),
      G('الدوال', 'Functions', [
        R('function addVat(price, rate = 0.14) { return price * (1 + rate); }', 'دالة بقيمة افتراضية', 'A function with a default value'),
        R('const double = x => x * 2;', 'arrow function في سطر', 'A one-line arrow function'),
        R('function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }', 'عدد مفتوح من القيم', 'Any number of arguments'),
        R('const { name, city = "Cairo" } = customer;', 'فك خصايص بقيمة افتراضية', 'Destructuring with a default'),
        R('function counter() { let n = 0; return () => ++n; }', 'closure: دالة فاكرة متغيرها', 'A closure: a function that remembers its variable'),
        R('try { … } catch (err) { console.error(err.message); } finally { … }', 'امسك الأخطاء', 'Catching errors')
      ])
    ]),
    S('arrays', 'المصفوفات والكائنات', 'Arrays and objects', 'map وfilter وreduce والنسخ والدمج والترتيب وJSON.', 'map, filter, reduce, copying, merging, sorting and JSON.', [
      G('methods المصفوفات', 'Array methods', [
        R('items.map(x => x.total)', 'مصفوفة جديدة متحوّلة', 'A new, transformed array'),
        R('items.filter(x => x.paid)', 'سيب اللي بيحقق الشرط', 'Keep what matches'),
        R('items.reduce((sum, x) => sum + x.total, 0)', 'لخّص لقيمة واحدة', 'Summarise to one value'),
        R('items.find(x => x.id === 7)  items.findIndex(…)', 'أول عنصر مطابق', 'The first match'),
        R('items.some(x => x.late)  items.every(x => x.ok)', 'فيه واحد؟ / كلهم؟', 'Any? / All?'),
        R('items.includes("vip")  items.indexOf("vip")', 'موجود؟ فين؟', 'Is it there? Where?'),
        R('items.slice(0, 10)  items.at(-1)', 'جزء منها / آخر عنصر', 'A part / the last item'),
        R('items.flat()  items.flatMap(x => x.lines)', 'فك المصفوفات المتداخلة', 'Flatten nested arrays')
      ]),
      G('الترتيب والتجميع', 'Sorting and grouping', [
        R('[...items].sort((a, b) => b.total - a.total)', 'رتّب أرقام تنازلي على نسخة', 'Sort numbers descending, on a copy'),
        R('names.sort((a, b) => a.localeCompare(b, "ar"))', 'رتّب أسماء عربي', 'Sort Arabic names'),
        R('items.toSorted(…)  items.toReversed()', 'ترتيب من غير ما تغيّر الأصل', 'Sort without changing the original'),
        R('Object.groupBy(orders, o => o.city)', 'جمّع حسب قيمة', 'Group by a value'),
        R('[...new Set(emails)]', 'شيل المكرر', 'Remove duplicates'),
        R('Array.from({ length: 5 }, (_, i) => i + 1)', 'مصفوفة من 1 لـ 5', 'An array from 1 to 5')
      ]),
      G('الكائنات', 'Objects', [
        R('Object.keys(o)  Object.values(o)  Object.entries(o)', 'المفاتيح / القيم / الأزواج', 'Keys / values / pairs'),
        R('Object.fromEntries(pairs)', 'من أزواج لكائن', 'From pairs to an object'),
        R('const copy = { ...order, status: "paid" };', 'نسخة متعدلة', 'An edited copy'),
        R('structuredClone(data)', 'نسخة عميقة كاملة', 'A full deep copy'),
        R('"phone" in customer   customer.hasOwnProperty("phone")', 'الخاصية موجودة؟', 'Is the property there?'),
        R('delete o.secret', 'امسح خاصية', 'Delete a property')
      ]),
      G('JSON', 'JSON', [
        R('JSON.stringify(obj)  JSON.stringify(obj, null, 2)', 'من كائن لنص (ومنسّق)', 'Object to text (and indented)'),
        R('JSON.parse(text)', 'من نص لكائن', 'Text to object'),
        R('try { data = JSON.parse(text); } catch { data = null; }', 'نص ممكن يكون مش JSON', 'Text that may not be JSON'),
        R('JSON.stringify({ d: new Date() })  → "2026-10-03T08:00:00.000Z"', 'التواريخ بتتحوّل نص ISO', 'Dates become ISO text')
      ])
    ]),
    S('strings', 'النصوص وRegex', 'Strings and regex', 'تقطيع وتنضيف ونصوص عربي وتعبيرات منتظمة.', 'Slicing, cleaning, Arabic text and regular expressions.', [
      G('methods النصوص', 'String methods', [
        R('s.trim()  s.toLowerCase()  s.toUpperCase()', 'تنضيف وحالة الحروف', 'Cleaning and letter case'),
        R('s.split(",")  parts.join(" | ")', 'قطّع / اجمع', 'Split / join'),
        R('s.slice(0, 3)  s.slice(-4)', 'جزء من النص', 'Part of the text'),
        R('s.startsWith("010")  s.endsWith(".pdf")  s.includes("@")', 'فحص سريع', 'Quick checks'),
        R('s.replaceAll("-", "")', 'استبدال كل مرة', 'Replace every occurrence'),
        R('String(n).padStart(5, "0")', 'كمّل بأصفار من الشمال', 'Pad with zeros on the left'),
        R('s.normalize("NFC")', 'وحّد شكل الحروف قبل المقارنة', 'Normalise characters before comparing')
      ]),
      G('Regex', 'Regex', [
        R('/\\d+/g   /^\\w+@\\w+\\.\\w+$/i', 'أرقام / إيميل بسيط', 'Digits / a simple email'),
        R('text.match(/\\d+/g)', 'كل الأرقام في مصفوفة', 'Every number in an array'),
        R('/(?<year>\\d{4})-(?<month>\\d{2})/.exec(s).groups.year', 'مجموعات بأسماء', 'Named groups'),
        R('s.replace(/\\s+/g, " ")', 'وحّد المسافات', 'Collapse spaces'),
        R('[...s.matchAll(/#(\\w+)/g)].map(m => m[1])', 'كل الهاشتاجات', 'Every hashtag'),
        R('/[\\u064B-\\u0652]/g', 'التشكيل العربي (عشان تشيله)', 'Arabic diacritics (to remove them)')
      ]),
      G('الأرقام والتواريخ للعرض', 'Numbers and dates for display', [
        R('new Intl.NumberFormat("ar-EG").format(1234567)', 'رقم بالعربي ١٬٢٣٤٬٥٦٧', 'A number in Arabic digits'),
        R('new Intl.NumberFormat("en", { style: "currency", currency: "EGP" }).format(99.5)', 'عملة', 'A currency'),
        R('new Date().toISOString()', 'التاريخ والوقت بصيغة ISO', 'Date and time in ISO form'),
        R('new Intl.DateTimeFormat("ar-EG", { dateStyle: "long", timeZone: "Africa/Cairo" }).format(d)', 'تاريخ مكتوب بتوقيت القاهرة', 'A written date in Cairo time')
      ])
    ]),
    S('async', 'الكود غير المتزامن وfetch', 'Async code and fetch', 'Promises وasync/await وfetch والأخطاء والتوازي.', 'Promises, async/await, fetch, errors and running in parallel.', [
      G('async / await', 'async / await', [
        R('async function load() { const r = await fetch(url); return r.json(); }', 'دالة غير متزامنة', 'An async function'),
        R('const [a, b] = await Promise.all([getA(), getB()]);', 'شغّل مع بعض واستنى الكل', 'Run together, wait for all'),
        R('const results = await Promise.allSettled(jobs);', 'الكل حتى لو فيه فشل', 'All of them, even with failures'),
        R('await new Promise(r => setTimeout(r, 1000));', 'استنى ثانية', 'Wait one second'),
        R('try { await job(); } catch (err) { … }', 'امسك خطأ await', 'Catch an await error')
      ]),
      G('fetch', 'fetch', [
        R('const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });', 'GET بتوكن', 'A GET with a token'),
        R('if (!r.ok) throw new Error(`HTTP ${r.status}`);', 'fetch مش بيرمي خطأ لـ 404 أو 500', 'fetch does not throw on 404 or 500'),
        R('await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });', 'POST بـ JSON', 'A JSON POST'),
        R('new URLSearchParams({ q: "laptop", page: 2 }).toString()', 'query string آمن', 'A safe query string'),
        R('fetch(url, { signal: AbortSignal.timeout(10000) })', 'وقف الطلب بعد 10 ثواني', 'Stop the request after 10 s')
      ]),
      G('أنماط الأتمتة', 'Automation patterns', [
        R('for (let i = 1; i <= 3; i++) { try { return await job(); } catch { await sleep(2 ** i * 500); } }', 'إعادة محاولة بانتظار متزايد', 'Retry with growing waits'),
        R('for (const chunk of chunks) await Promise.all(chunk.map(send));', 'دفعات بدل كله مرة واحدة', 'Batches instead of all at once'),
        R('let page = 1; while (true) { const d = await get(page++); if (!d.length) break; }', 'Pagination', 'Pagination'),
        R('const cache = new Map();', 'خزّن النتايج عشان متطلبش تاني', 'Cache results so you do not ask twice')
      ])
    ]),
    S('dom', 'الـ DOM والأحداث', 'The DOM and events', 'تختار العناصر وتغيّرها وتسمع للأحداث والفورمز.', 'Selecting and changing elements, events and forms.', [
      G('اختيار العناصر', 'Selecting elements', [
        R('document.querySelector("#total")', 'أول عنصر مطابق', 'The first match'),
        R('document.querySelectorAll(".row")', 'كل العناصر المطابقة', 'Every match'),
        R('el.closest(".card")   el.querySelector("button")', 'اطلع لأب / انزل لابن', 'Up to a parent / down to a child'),
        R('el.dataset.id  ←  <div data-id="7">', 'قراية data-*', 'Reading data-*')
      ]),
      G('التغيير', 'Changing', [
        R('el.textContent = "Saved ✓";', 'نص آمن (مش HTML)', 'Safe text (not HTML)'),
        R('el.classList.add("on")  .remove  .toggle', 'الكلاسات', 'Classes'),
        R('el.setAttribute("aria-pressed", "true")', 'الخصايص', 'Attributes'),
        R('const li = document.createElement("li"); list.append(li);', 'عنصر جديد', 'A new element'),
        R('el.hidden = true;   el.remove();', 'إخفاء / حذف', 'Hide / remove'),
        R('el.innerHTML = html;  // only HTML you wrote yourself', 'innerHTML بس لـ HTML انت كاتبه', 'innerHTML only for HTML you wrote')
      ]),
      G('الأحداث', 'Events', [
        R('btn.addEventListener("click", e => { … });', 'اسمع لضغطة', 'Listen for a click'),
        R('list.addEventListener("click", e => { const b = e.target.closest("button"); });', 'حدث واحد لعناصر كتير', 'One listener for many elements'),
        R('form.addEventListener("submit", e => { e.preventDefault(); … });', 'امنع إعادة تحميل الصفحة', 'Stop the page from reloading'),
        R('input.addEventListener("input", …)', 'مع كل حرف', 'On every keystroke'),
        R('document.addEventListener("keydown", e => e.key === "Escape" && close());', 'الكيبورد', 'The keyboard')
      ]),
      G('الفورمز والتخزين', 'Forms and storage', [
        R('Object.fromEntries(new FormData(form))', 'كل حقول الفورم في كائن', 'Every form field in an object'),
        R('input.checkValidity()  input.setCustomValidity("…")', 'التحقق من الحقول', 'Field validation'),
        R('localStorage.setItem("prefs", JSON.stringify(p));', 'حفظ في المتصفح', 'Saving in the browser'),
        R('JSON.parse(localStorage.getItem("prefs") || "{}")', 'قراية مع قيمة افتراضية', 'Reading with a default')
      ])
    ]),
    S('html', 'HTML', 'HTML', 'هيكل الصفحة والعناصر الدلالية والفورمز والجداول والصور.', 'Page structure, semantic elements, forms, tables and images.', [
      G('هيكل الصفحة', 'Page structure', [
        R('<!doctype html><html lang="ar" dir="rtl">', 'أول سطرين في كل صفحة', 'The first two lines of every page'),
        R('<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', 'العربي والموبايل', 'Arabic and mobile'),
        R('<header> <nav> <main> <section> <article> <aside> <footer>', 'العناصر الدلالية', 'Semantic elements'),
        R('<h1>…</h1> once, then <h2>, <h3> in order', 'العناوين بترتيبها', 'Headings in order'),
        R('<script src="app.js" defer></script>', 'السكربت بعد ما الصفحة تتقري', 'The script after the page is read')
      ]),
      G('المحتوى', 'Content', [
        R('<a href="https://…" target="_blank" rel="noopener">', 'لينك في تاب جديد', 'A link in a new tab'),
        R('<img src="shop.jpg" alt="Shop front at night" width="320" height="200">', 'صورة بوصف ومقاس', 'An image with a description and size'),
        R('<ul><li>…</li></ul>  <ol>  <dl><dt><dd>', 'القوايم', 'Lists'),
        R('<table><thead><tr><th scope="col">…</th></tr></thead><tbody>…</tbody></table>', 'جدول بيانات صح', 'A proper data table'),
        R('<figure><img …><figcaption>…</figcaption></figure>', 'صورة بتعليق', 'An image with a caption'),
        R('<details><summary>…</summary>…</details>', 'جزء بيتفتح ويتقفل من غير JS', 'A section that opens and closes with no JS')
      ]),
      G('الفورمز', 'Forms', [
        R('<label for="email">Email</label><input id="email" type="email" required>', 'حقل بعنوان', 'A labelled field'),
        R('type="tel" "number" "date" "url" "password" "search"', 'أنواع الحقول', 'Field types'),
        R('required minlength="3" maxlength="40" pattern="01[0-9]{9}"', 'تحقق من غير JS', 'Validation with no JS'),
        R('<select><option value="cairo">Cairo</option></select>', 'اختيار من قايمة', 'Picking from a list'),
        R('<button type="submit">  <button type="button">', 'زرار إرسال / زرار عادي', 'A submit button / a plain button')
      ])
    ]),
    S('css', 'CSS والتخطيط', 'CSS and layout', 'المحددات والـ box model وFlexbox وGrid والتصميم المتجاوب والمتغيرات.', 'Selectors, the box model, Flexbox, Grid, responsive design and variables.', [
      G('المحددات', 'Selectors', [
        R('p  .card  #total  [type="email"]', 'عنصر / كلاس / id / خاصية', 'Element / class / id / attribute'),
        R('.card h3   .menu > li   h2 + p', 'جوه / ابن مباشر / اللي بعده', 'Inside / direct child / next sibling'),
        R('a:hover  input:focus-visible  li:nth-child(odd)', 'حالات العناصر', 'Element states'),
        R('.card:has(img)  :is(h1, h2)', 'محددات حديثة', 'Modern selectors')
      ]),
      G('الـ Box model', 'The box model', [
        R('*, *::before, *::after { box-sizing: border-box; }', 'المقاس يشمل الـ padding والـ border', 'Sizes include padding and border'),
        R('margin  border  padding  content', 'من برّه لجوه', 'From outside in'),
        R('margin-inline: auto;  padding-block: 1rem;', 'خصايص منطقية بتشتغل RTL وLTR', 'Logical properties that work in RTL and LTR'),
        R('rem  em  %  vw  vh  ch', 'الوحدات', 'Units')
      ]),
      G('Flexbox وGrid', 'Flexbox and Grid', [
        R('display: flex; gap: 1rem; align-items: center; justify-content: space-between;', 'صف عناصر', 'A row of items'),
        R('flex-wrap: wrap;  flex: 1 1 200px;', 'تنزل سطر جديد لما الشاشة تضيق', 'Wrap onto new lines on small screens'),
        R('display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;', 'كروت متجاوبة من غير media query', 'Responsive cards with no media query'),
        R('grid-template-areas: "head head" "side main";', 'تخطيط بالأسماء', 'Layout by names'),
        R('place-items: center;', 'في النص بالظبط', 'Dead centre')
      ]),
      G('متجاوب ومتغيرات', 'Responsive and variables', [
        R('@media (max-width: 640px) { … }', 'للشاشات الصغيرة', 'For small screens'),
        R(':root { --accent: #3f8f63; }  color: var(--accent);', 'متغيرات CSS', 'CSS variables'),
        R('@media (prefers-color-scheme: dark) { :root { … } }', 'الوضع الليلي', 'Dark mode'),
        R('font-size: clamp(1rem, 2.5vw, 1.5rem);', 'خط بيكبر مع الشاشة بحدود', 'A font that grows with the screen, within limits'),
        R('transition: background .2s ease;', 'حركة ناعمة', 'A smooth change')
      ])
    ]),
    S('node', 'Node.js', 'Node.js', 'الملفات والمسارات والمتغيرات والعمليات وخادم HTTP.', 'Files, paths, environment variables, processes and an HTTP server.', [
      G('الملفات', 'Files', [
        R('import { readFile, writeFile } from "node:fs/promises";', 'الملفات بـ async', 'Files with async'),
        R('const text = await readFile("data.csv", "utf8");', 'اقرا ملف نص', 'Read a text file'),
        R('await writeFile("out.json", JSON.stringify(data, null, 2));', 'اكتب JSON', 'Write JSON'),
        R('await mkdir("reports", { recursive: true });', 'فولدر حتى لو موجود', 'A folder, even if it exists'),
        R('for (const f of await readdir("in")) …', 'لف على ملفات فولدر', 'Loop over a folder’s files')
      ]),
      G('المسارات والبيئة', 'Paths and environment', [
        R('import path from "node:path";  path.join(dir, "a.txt")', 'مسار صح في كل الأنظمة', 'A path that works on every system'),
        R('path.extname(f)  path.basename(f, ".pdf")', 'الامتداد والاسم', 'Extension and name'),
        R('process.env.API_KEY', 'متغير بيئة (الأسرار هنا مش في الكود)', 'An environment variable (secrets go here, not in code)'),
        R('node --env-file=.env app.js', 'تحميل .env من غير مكتبة', 'Load .env with no library'),
        R('process.argv.slice(2)', 'خيارات سطر الأوامر', 'Command-line arguments'),
        R('process.exitCode = 1;', 'قول للنظام إن فيه فشل', 'Tell the system something failed')
      ]),
      G('الشبكة والعمليات', 'Network and processes', [
        R('import http from "node:http"; http.createServer((req, res) => res.end("ok")).listen(3000);', 'أصغر سيرفر', 'The smallest server'),
        R('import express from "express"; app.post("/hook", express.json(), (req, res) => …)', 'Webhook بـ Express', 'A webhook with Express'),
        R('import { execFile } from "node:child_process";', 'شغّل برنامج تاني بأمان', 'Run another program safely'),
        R('setInterval(job, 60 * 60 * 1000);', 'كرّر كل ساعة (والسكربت شغّال)', 'Repeat hourly (while the script runs)'),
        R('node --watch app.js', 'إعادة تشغيل مع كل حفظ', 'Restart on every save')
      ])
    ]),
    S('ts', 'TypeScript', 'TypeScript', 'الأنواع والواجهات والأنواع العامة والمساعدة.', 'Types, interfaces, generics and utility types.', [
      G('الأنواع الأساسية', 'Basic types', [
        R('let n: number; let s: string; let ok: boolean;', 'أنواع بسيطة', 'Simple types'),
        R('let ids: number[];  let pair: [string, number];', 'مصفوفة / tuple', 'An array / a tuple'),
        R('type Status = "new" | "paid" | "shipped";', 'قيم محددة بس', 'Only certain values'),
        R('let x: string | null = null;', 'نوع أو null', 'A type or null'),
        R('let data: unknown = JSON.parse(text);  // safer than any', 'unknown بدل any', 'unknown instead of any')
      ]),
      G('الكائنات والدوال', 'Objects and functions', [
        R('interface Order { id: number; total: number; note?: string }', 'شكل كائن (note اختياري)', 'An object shape (note is optional)'),
        R('function total(lines: Line[]): number { … }', 'دالة بأنواع', 'A typed function'),
        R('const save = async (o: Order): Promise<void> => { … };', 'دالة async بأنواع', 'A typed async function'),
        R('readonly id: number;', 'خاصية متتغيرش', 'A property that cannot change'),
        R('if ("email" in user) { … }  if (typeof x === "string") { … }', 'تضييق النوع', 'Narrowing the type')
      ]),
      G('العام والمساعد', 'Generic and utility', [
        R('function first<T>(items: T[]): T | undefined { return items[0]; }', 'دالة عامة', 'A generic function'),
        R('Partial<Order>  Required<Order>  Readonly<Order>', 'نسخ من نوع', 'Versions of a type'),
        R('Pick<Order, "id" | "total">  Omit<Order, "note">', 'اختار / شيل خصايص', 'Pick / drop properties'),
        R('Record<string, number>', 'قاموس مفاتيح وقيم', 'A key-value dictionary'),
        R('npx tsc --noEmit', 'افحص الأنواع من غير ما تبني', 'Type-check without building')
      ])
    ]),
    S('n8n', 'جافاسكريبت في n8n', 'JavaScript in n8n', 'الـ Code node والـ items والـ expressions والتواريخ.', 'The Code node, items, expressions and dates.', [
      G('الـ Code node', 'The Code node', [
        R('const items = $input.all();', 'كل الـ items الداخلة (Run Once for All Items)', 'Every incoming item (Run Once for All Items)'),
        R('return items.map(i => ({ json: { ...i.json, total: i.json.qty * i.json.price } }));', 'رجّع items بنفس الشكل', 'Return items in the same shape'),
        R('const item = $input.item;  return { json: { … } };', 'Run Once for Each Item', 'Run Once for Each Item'),
        R('$("Get orders").all()', 'بيانات نود قبلها بالاسم', 'Data from an earlier node, by name'),
        R('return [{ json: { count: items.length } }];', 'item واحد ملخّص', 'One summary item')
      ]),
      G('الـ Expressions', 'Expressions', [
        R('{{ $json.customer.name }}', 'خاصية من الـ item الحالي', 'A property of the current item'),
        R('{{ $json.email?.toLowerCase() ?? "" }}', 'آمن لو الحقل ناقص', 'Safe when the field is missing'),
        R('{{ $now.setZone("Africa/Cairo").toFormat("yyyy-MM-dd") }}', 'تاريخ النهارده بتوقيت القاهرة', 'Today in Cairo time'),
        R('{{ $json.items.length }}  {{ $json.tags.join(", ") }}', 'methods جافاسكريبت عادية', 'Ordinary JavaScript methods'),
        R('{{ $if($json.total > 1000, "VIP", "normal") }}', 'شرط في expression', 'A condition in an expression')
      ]),
      G('نصايح', 'Tips', [
        R('console.log(x)  // shows in the browser console while testing', 'الـ debugging', 'Debugging'),
        R('DateTime.fromISO(s).plus({ days: 3 })', 'Luxon متاح من غير import', 'Luxon is there with no import'),
        R('throw new Error("Missing email in item " + i);', 'أوقف الـ workflow برسالة واضحة', 'Stop the workflow with a clear message'),
        R('$getWorkflowStaticData("global")', 'بيانات بتفضل بين التشغيلات', 'Data that survives between runs')
      ])
    ]),
    S('playwright', 'Playwright', 'Playwright', 'تفتح متصفح وتدوس وتملا فورمز وتسحب بيانات وتاخد صور.', 'Open a browser, click, fill forms, pull data and take screenshots.', [
      G('البداية', 'Getting started', [
        R('npm i -D playwright  &&  npx playwright install chromium', 'التثبيت', 'Installing'),
        R('import { chromium } from "playwright"; const browser = await chromium.launch();', 'افتح متصفح', 'Open a browser'),
        R('const page = await browser.newPage(); await page.goto(url);', 'افتح صفحة', 'Open a page'),
        R('await browser.close();', 'اقفل في الآخر دايمًا', 'Always close at the end')
      ]),
      G('التحكم', 'Driving the page', [
        R('page.getByRole("button", { name: "Save" })', 'اختار عنصر زي ما المستخدم بيشوفه', 'Pick an element the way a user sees it'),
        R('await page.getByLabel("Email").fill("a@b.com");', 'املا حقل', 'Fill a field'),
        R('await page.getByText("Next").click();', 'دوس', 'Click'),
        R('await page.waitForURL("**/dashboard");', 'استنى صفحة', 'Wait for a page'),
        R('await page.screenshot({ path: "shot.png", fullPage: true });', 'صورة للصفحة', 'A screenshot')
      ]),
      G('سحب البيانات', 'Pulling data', [
        R('await page.locator(".price").allTextContents()', 'كل النصوص', 'All the texts'),
        R('await page.$$eval("tr", rows => rows.map(r => r.innerText))', 'شغّل كود جوه الصفحة', 'Run code inside the page'),
        R('page.on("response", r => …)', 'اقرا ردود الـ API اللي الصفحة بتطلبها', 'Read the API responses the page asks for'),
        R('robots.txt + the site terms + await page.waitForTimeout(1500)', 'الأخلاق', 'Ethics')
      ])
    ]),
    S('tools', 'npm وGit والأدوات', 'npm, Git and tools', 'الحزم والـ scripts وGit والفحص والتنسيق.', 'Packages, scripts, Git, linting and formatting.', [
      G('npm', 'npm', [
        R('npm init -y', 'مشروع جديد (package.json)', 'A new project (package.json)'),
        R('npm i express   npm i -D vitest', 'حزمة / حزمة للتطوير بس', 'A package / a dev-only package'),
        R('"scripts": { "start": "node app.js", "test": "vitest" }', 'أوامر المشروع', 'Project commands'),
        R('npm run test   npx eslint .', 'شغّل script / أداة من غير تثبيت عام', 'Run a script / a tool without a global install'),
        R('"type": "module"', 'استخدم import بدل require', 'Use import instead of require'),
        R('npm ci   npm audit   npm outdated', 'تثبيت ثابت / ثغرات / تحديثات', 'Clean install / vulnerabilities / updates')
      ]),
      G('Git', 'Git', [
        R('git status   git diff', 'إيه اللي اتغيّر', 'What changed'),
        R('git add -p   git commit -m "feat: add invoice export"', 'commit بأجزاء واضحة', 'Commit in clear pieces'),
        R('git switch -c fix/phone-format', 'فرع جديد', 'A new branch'),
        R('git log --oneline --graph', 'التاريخ', 'The history'),
        R('git restore file.js   git stash', 'رجّع ملف / شيل التغييرات مؤقتًا', 'Restore a file / park changes'),
        R('.gitignore: node_modules/ .env dist/', 'متحطش دول في Git أبدًا', 'Never put these in Git')
      ]),
      G('الجودة', 'Quality', [
        R('npx eslint . --fix', 'الأخطاء والكود المريب', 'Mistakes and suspicious code'),
        R('npx prettier . --write', 'تنسيق موحّد', 'Consistent formatting'),
        R('npx vitest run --coverage', 'الاختبارات ونسبة التغطية', 'Tests and coverage'),
        R('node --test', 'اختبارات Node المدمجة', 'Node’s built-in tests')
      ])
    ])
  ]
});

SECTIONS.add({
  page: 'js', id: 'projects', order: 4, type: 'lessons', kind: 'pj',
  title: { ar: 'مشاريع أتمتة جاهزة للتنفيذ', en: 'Automation projects to build' }, nav: { ar: 'المشاريع', en: 'Projects' },
  desc: { ar: 'أفكار مشاريع حقيقية بجافاسكريبت من شغل الشركات الصغيرة، كل واحد بخطواته والمهارات اللي بيستخدمها ورقم الأسبوع اللي اتعلمتها فيه. اعملها جنب الرحلة وحط أحسنهم في الـ portfolio.', en: 'Real JavaScript project ideas from small-business work, each with its steps, the skills it uses and the week you learned them. Build them alongside the journey and put the best in your portfolio.' },
  items: [
    { id: 'j-landing', min: 120, t: { ar: 'صفحة هبوط بفورم بيوصل لـ n8n', en: 'A landing page whose form reaches n8n' },
      body: { ar: 'صفحة متجاوبة بـ HTML وCSS، وفورم بيتحقق من الموبايل والإيميل بجافاسكريبت، ويبعت بـ fetch لـ Webhook في n8n، ويعرض رسالة نجاح أو خطأ من غير إعادة تحميل.\n\n**الخطوات:** 1. الهيكل والدلالة. 2. Grid وFlexbox وmedia query. 3. التحقق بـ JS. 4. fetch بـ JSON. 5. حالات التحميل والخطأ.\n\n**المهارات:** الأسابيع 9–12 و14.', en: 'A responsive page in HTML and CSS, with a form that checks the phone and email in JavaScript, sends them with fetch to an n8n webhook, and shows a success or error message without reloading.\n\n**Steps:** 1. Structure and semantics. 2. Grid, Flexbox and a media query. 3. Validation in JS. 4. A JSON fetch. 5. Loading and error states.\n\n**Skills:** weeks 9–12 and 14.' },
      'try': { ar: 'جرّبها على موبايل حقيقي وبالكيبورد بس.', en: 'Try it on a real phone and with the keyboard only.' } },
    { id: 'j-sheet-bot', min: 90, t: { ar: 'تقرير يومي من Google Sheets بـ Apps Script', en: 'A daily report from Google Sheets with Apps Script' },
      body: { ar: 'Apps Script بيقرا شيت الطلبات كل يوم 8 الصبح، يحسب الإجماليات حسب المدينة، ويكتب شيت ملخص، ويبعت إيميل HTML بأهم 5 أرقام.\n\n**المهارات:** الأسابيع 5 و7 و22.', en: 'Apps Script reads the orders sheet at 08:00 every day, totals by city, writes a summary sheet and sends an HTML email with the top five numbers.\n\n**Skills:** weeks 5, 7 and 22.' },
      'try': { ar: 'استخدم trigger بالوقت، وابعت لنفسك الأول.', en: 'Use a time trigger, and send to yourself first.' } },
    { id: 'j-cli-rename', min: 90, t: { ar: 'أداة سطر أوامر لترتيب الملفات', en: 'A command-line tool that tidies files' },
      body: { ar: 'سكربت Node بيرتب فولدر حسب النوع والتاريخ، بخيارات `--dry-run` و`--by=month`، ولوج JSON بكل نقلة، ومن غير ما يكتب فوق ملف موجود.\n\n**المهارات:** الأسابيع 16 و17.', en: 'A Node script that sorts a folder by type and date, with `--dry-run` and `--by=month` options, a JSON log of every move, and never overwriting an existing file.\n\n**Skills:** weeks 16 and 17.' },
      'try': { ar: 'شغّله على نسخة من فولدر حقيقي.', en: 'Run it on a copy of a real folder.' } },
    { id: 'j-webhook-api', min: 150, t: { ar: 'خدمة Webhook بتتحقق من التوقيع', en: 'A webhook service that verifies signatures' },
      body: { ar: 'خادم Express بيستقبل webhooks من متجر أو بوابة دفع، ويتحقق من توقيع HMAC، ويمنع التكرار بالـ id، ويحفظ في Postgres، ويبعت لـ n8n.\n\n**المهارات:** الأسابيع 18 و33 و34.', en: 'An Express server that receives webhooks from a shop or payment gateway, verifies the HMAC signature, blocks duplicates by id, saves to Postgres and forwards to n8n.\n\n**Skills:** weeks 18, 33 and 34.' },
      'try': { ar: 'اختبره بطلب توقيعه غلط لازم يترفض.', en: 'Test it with a badly signed request that must be refused.' } },
    { id: 'j-excel-merge', min: 120, t: { ar: 'دمج ملفات Excel الفروع بـ Node', en: 'Merging branch Excel files with Node' },
      body: { ar: 'يقرا كل ملفات الفروع بـ SheetJS، يوحّد الأعمدة، ينضّف الأرقام العربي والتواريخ، ويطلّع ملف واحد بشيت ملخص وشيت مشاكل.\n\n**المهارات:** الأسابيع 19 و20.', en: 'Reads every branch file with SheetJS, unifies the columns, cleans Arabic digits and dates, and writes one file with a summary sheet and a problems sheet.\n\n**Skills:** weeks 19 and 20.' },
      'try': { ar: 'اعمل 4 ملفات تجربة بأعمدة مختلفة شوية.', en: 'Make four test files with slightly different columns.' } },
    { id: 'j-price-watch', min: 180, t: { ar: 'مراقب أسعار بـ Playwright', en: 'A price watcher with Playwright' },
      body: { ar: 'يفتح صفحات منتجات، يسحب السعر والتوفر، يقارن باللقطة اللي فاتت، ويبعت لـ n8n التغييرات المهمة بس، بتأخير بين الطلبات واحترام شروط الموقع.\n\n**المهارات:** الأسابيع 23 و24.', en: 'Opens product pages, pulls the price and availability, compares with the last snapshot and sends only the important changes to n8n, with delays between requests and respect for the site’s terms.\n\n**Skills:** weeks 23 and 24.' },
      'try': { ar: 'اتمرّن على books.toscrape.com الأول.', en: 'Practise on books.toscrape.com first.' } },
    { id: 'j-dashboard', min: 180, t: { ar: 'لوحة مبيعات تفاعلية', en: 'An interactive sales dashboard' },
      body: { ar: 'صفحة بتقرا `data.json`، فيها فلاتر وبحث وترتيب ورسوم بـ SVG أو Chart.js، ووضع ليلي، وبتشتغل كويس على الموبايل.\n\n**المهارات:** الأسابيع 11 و12 و29 و31.', en: 'A page that reads `data.json`, with filters, search, sorting and SVG or Chart.js charts, a dark mode, and a good phone layout.\n\n**Skills:** weeks 11, 12, 29 and 31.' },
      'try': { ar: 'قيسها بـ Lighthouse وصلّح أي حاجة تحت 90.', en: 'Measure it with Lighthouse and fix anything under 90.' } },
    { id: 'j-custom-node', min: 240, t: { ar: 'Node مخصصة لـ n8n', en: 'A custom n8n node' },
      body: { ar: 'Node بـ TypeScript لخدمة محلية مالهاش node جاهزة: credentials، وعمليات قراية وكتابة، وأيقونة، واختبارات، ونشرها كحزمة npm.\n\n**المهارات:** الأسابيع 25 و26 و39.', en: 'A TypeScript node for a local service with no ready-made node: credentials, read and write operations, an icon, tests, and publishing it as an npm package.\n\n**Skills:** weeks 25, 26 and 39.' },
      'try': { ar: 'ابدأ بالقالب الرسمي n8n-nodes-starter.', en: 'Start from the official n8n-nodes-starter template.' } },
    { id: 'j-mcp', min: 150, t: { ar: 'خادم MCP لبيانات شغلك بـ TypeScript', en: 'An MCP server for your work data in TypeScript' },
      body: { ar: 'خادم بيعرض أدوات قراية (الطلبات والعملاء) وأداة كتابة واحدة بموافقة، بأنواع Zod للمدخلات، وبتوصله بـ Claude Desktop أو n8n.\n\n**المهارات:** الأسابيع 26 و37 و38.', en: 'A server offering read tools (orders and customers) and one write tool that needs approval, with Zod types for the inputs, connected to Claude Desktop or n8n.\n\n**Skills:** weeks 26, 37 and 38.' },
      'try': { ar: 'جرّبه بالـ MCP Inspector قبل التوصيل.', en: 'Test it with the MCP Inspector before connecting it.' } },
    { id: 'j-extension', min: 150, t: { ar: 'إضافة متصفح بتملا الفورمز', en: 'A browser extension that fills forms' },
      body: { ar: 'إضافة Chrome بتحفظ قوالب بيانات (عميل، شحنة) وتملا بيها فورم أي موقع بضغطة، وبتبعت نسخة لـ n8n لو حبيت.\n\n**المهارات:** الأسابيع 12 و40.', en: 'A Chrome extension that keeps data templates (a customer, a shipment), fills any site’s form with them in one click, and can send a copy to n8n.\n\n**Skills:** weeks 12 and 40.' },
      'try': { ar: 'اطلب أقل صلاحيات ممكنة في manifest.json.', en: 'Ask for the fewest permissions possible in manifest.json.' } },
    { id: 'j-ai-inbox', min: 240, t: { ar: 'تصنيف رسايل العملاء بالـ AI', en: 'Classifying customer messages with AI' },
      body: { ar: 'خدمة Node بتاخد رسالة، تخفي البيانات الحساسة، وتطلب من Claude تصنيف منظم بأداة (tool use)، وتتحقق بـ Zod، وتحفظ، وتبعت العاجل لـ n8n، ومعاها 30 رسالة تقييم.\n\n**المهارات:** الأسابيع 26 و37 و27.', en: 'A Node service that takes a message, hides sensitive data, asks Claude for a structured classification through a tool, validates it with Zod, saves it and sends urgent ones to n8n, with 30 evaluation messages.\n\n**Skills:** weeks 26, 37 and 27.' },
      'try': { ar: 'ابدأ بنموذج وهمي في الاختبارات قبل المفتاح.', en: 'Start with a fake model in the tests before using a key.' } },
    { id: 'j-deploy', min: 180, t: { ar: 'نشر خدمة Node بـ Docker وCI', en: 'Deploying a Node service with Docker and CI' },
      body: { ar: 'Dockerfile متعدد المراحل، وGitHub Actions بيختبر ويبني، ونشر على VPS ورا Caddy بـ HTTPS، وhealth check، ولوجات، وتنبيه لو الخدمة وقعت.\n\n**المهارات:** الأسابيع 45 و46.', en: 'A multi-stage Dockerfile, GitHub Actions that tests and builds, a deploy to a VPS behind Caddy with HTTPS, a health check, logs, and an alert when the service is down.\n\n**Skills:** weeks 45 and 46.' },
      'try': { ar: 'جرّب ترجّع لنسخة قديمة مرة على الأقل.', en: 'Roll back to an older version at least once.' } }
  ]
});

function E(id, cat, msg, ar, en, fixAr, fixEn, code){
  return { id: id, cat: cat, t: { ar: msg, en: msg }, body: { ar: ar + '\n\n**الحل:** ' + fixAr, en: en + '\n\n**Fix:** ' + fixEn }, code: code || '' };
}
SECTIONS.add({
  page: 'js', id: 'errors', order: 5, type: 'cards', kind: 'e',
  title: { ar: 'رسائل أخطاء هتقابلها', en: 'Error messages you will meet' }, nav: { ar: 'الأخطاء', en: 'Errors' },
  desc: { ar: 'أشهر أخطاء جافاسكريبت والمتصفح وNode والأدوات: معناها، وسببها الغالب، والحل، ومثال. اقرا **أول سطر** في الخطأ والملف ورقم السطر اللي جنبه.', en: 'The commonest errors in JavaScript, the browser, Node and the tools: what they mean, the usual cause, the fix and an example. Read the **first line** of the error and the file and line number next to it.' },
  searchHint: { ar: 'undefined، CORS، EADDRINUSE…', en: 'undefined, CORS, EADDRINUSE…' },
  cats: [{ id: 'js', t: { ar: 'جافاسكريبت', en: 'JavaScript' } }, { id: 'dom', t: { ar: 'المتصفح والـ DOM', en: 'Browser and DOM' } }, { id: 'node', t: { ar: 'Node.js وnpm', en: 'Node.js and npm' } }, { id: 'web', t: { ar: 'الويب والـ APIs', en: 'Web and APIs' } }, { id: 'ts', t: { ar: 'TypeScript والأدوات', en: 'TypeScript and tools' } }],
  items: [
    E('undef-prop', 'js', "TypeError: Cannot read properties of undefined (reading 'name')", 'بتقرا خاصية من حاجة undefined (غالبًا كائن ناقص أو مصفوفة فاضية).', 'You are reading a property of something undefined (often a missing object or an empty array).', 'استخدم `?.` و`??`، واطبع القيمة قبلها بسطر.', 'Use `?.` and `??`, and log the value one line earlier.', 'const name = order.customer?.name ?? "-";'),
    E('null-prop', 'js', "TypeError: Cannot read properties of null (reading 'addEventListener')", 'querySelector ملقاش العنصر (غلط في المحدد أو السكربت اشتغل قبل الصفحة).', 'querySelector found nothing (a wrong selector, or the script ran before the page).', 'صحّح المحدد، وحط `defer` على السكربت.', 'Fix the selector and add `defer` to the script.', '<script src="app.js" defer></script>'),
    E('not-fn', 'js', 'TypeError: x.map is not a function', 'القيمة مش مصفوفة (كائن أو نص أو undefined).', 'The value is not an array (an object, a string or undefined).', 'اطبع `Array.isArray(x)`، وحوّل بـ `Object.values()` أو `[x]`.', 'Log `Array.isArray(x)`, and convert with `Object.values()` or `[x]`.', 'const list = Array.isArray(data) ? data : Object.values(data ?? {});'),
    E('not-defined', 'js', 'ReferenceError: total is not defined', 'اسم متعرّفش، أو اتعرّف جوه بلوك تاني.', 'A name that was never declared, or was declared inside another block.', 'عرّفه بـ const أو let في النطاق الصح، وصحّح الكتابة.', 'Declare it with const or let in the right scope, and fix the spelling.', ''),
    E('tdz', 'js', "ReferenceError: Cannot access 'rate' before initialization", 'استخدمت متغير let أو const قبل سطر تعريفه.', 'You used a let or const variable before the line that declares it.', 'انقل التعريف لفوق.', 'Move the declaration up.', ''),
    E('const-assign', 'js', 'TypeError: Assignment to constant variable.', 'بتدّي قيمة جديدة لمتغير const.', 'You are giving a const variable a new value.', 'استخدم let لو القيمة هتتغير.', 'Use let when the value changes.', 'let count = 0;\ncount += 1;'),
    E('syntax-token', 'js', 'SyntaxError: Unexpected token', 'قوس أو فاصلة أو علامة ناقصة أو زيادة قريب من السطر ده.', 'A bracket, comma or quote is missing or extra near that line.', 'شوف السطر واللي قبله، وخلي المحرر يرتّب الكود.', 'Look at that line and the one before, and let the editor format the code.', ''),
    E('json-parse', 'js', 'SyntaxError: Unexpected token < in JSON at position 0', 'اللي جالك HTML مش JSON (صفحة خطأ 404 أو 500 أو تسجيل دخول).', 'What you got is HTML, not JSON (a 404 or 500 page, or a login page).', 'افحص `r.ok` و`r.headers.get("content-type")` قبل `r.json()`.', 'Check `r.ok` and `r.headers.get("content-type")` before `r.json()`.', 'if (!r.ok) throw new Error(`HTTP ${r.status}`);'),
    E('nan', 'js', 'NaN in a total', 'بتحسب على نص أو undefined، فالنتيجة NaN.', 'You are calculating with text or undefined, so the result is NaN.', 'حوّل بـ `Number()` وافحص بـ `Number.isNaN`.', 'Convert with `Number()` and check with `Number.isNaN`.', 'const qty = Number(row.qty);\nif (Number.isNaN(qty)) throw new Error("bad qty");'),
    E('unhandled', 'js', 'Uncaught (in promise) Error', 'Promise فشلت ومحدش مسك الخطأ.', 'A promise failed and nobody caught the error.', 'حط `await` جوه `try/catch` أو `.catch()`.', 'Put the `await` inside `try/catch`, or add `.catch()`.', 'try {\n  await save();\n} catch (err) {\n  console.error(err);\n}'),
    E('await-top', 'js', 'SyntaxError: await is only valid in async functions and the top level bodies of modules', 'استخدمت await في دالة مش async أو ملف مش module.', 'You used await in a function that is not async, or a file that is not a module.', 'اكتب `async` قبل الدالة، أو `"type": "module"`.', 'Add `async` to the function, or set `"type": "module"`.', ''),
    E('max-stack', 'js', 'RangeError: Maximum call stack size exceeded', 'دالة بتنادي نفسها من غير نهاية.', 'A function calls itself with no end.', 'حط شرط توقف أو حوّلها لوب.', 'Add a stop condition or turn it into a loop.', ''),
    E('cors', 'dom', "Access to fetch at '…' has been blocked by CORS policy", 'السيرفر مش سامح لصفحتك تقرا رده.', 'The server does not let your page read its response.', 'السيرفر لازم يرد بـ `Access-Control-Allow-Origin` لدومينك، أو اطلب من سيرفرك أو n8n بدل المتصفح.', 'The server must reply with `Access-Control-Allow-Origin` for your domain, or call it from your server or n8n instead of the browser.', ''),
    E('mixed', 'dom', 'Mixed Content: the page was loaded over HTTPS, but requested an insecure resource', 'صفحة HTTPS بتطلب حاجة بـ http.', 'An HTTPS page is asking for something over http.', 'استخدم https في كل الروابط.', 'Use https for every link.', ''),
    E('csp', 'dom', 'Refused to execute inline script because it violates the Content Security Policy', 'سياسة الأمان في الصفحة بتمنع السكربتات المكتوبة جوه HTML.', 'The page’s security policy blocks scripts written inside the HTML.', 'انقل الكود لملف .js، أو زوّد الـ hash بتاعه في السياسة.', 'Move the code into a .js file, or add its hash to the policy.', ''),
    E('form-reload', 'dom', 'The page reloads when the form is sent', 'الفورم بيتبعت بالطريقة العادية.', 'The form is being sent the normal way.', 'اكتب `e.preventDefault()` في حدث submit.', 'Call `e.preventDefault()` in the submit event.', 'form.addEventListener("submit", e => {\n  e.preventDefault();\n});'),
    E('quota', 'dom', 'QuotaExceededError: The quota has been exceeded (localStorage)', 'localStorage اتملا (حوالي 5 ميجا).', 'localStorage is full (about 5 MB).', 'خزّن أقل، أو استخدم IndexedDB، وحط try/catch حوالين الكتابة.', 'Store less or use IndexedDB, and wrap writes in try/catch.', ''),
    E('module-nf', 'node', "Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express'", 'الحزمة مش متثبتة في المشروع ده.', 'The package is not installed in this project.', 'شغّل `npm i express` في فولدر المشروع.', 'Run `npm i express` in the project folder.', ''),
    E('require-esm', 'node', 'ReferenceError: require is not defined in ES module scope', 'الملف module (import) وانت بتستخدم require.', 'The file is a module (import) and you used require.', 'استخدم `import`، أو شيل `"type": "module"`.', 'Use `import`, or remove `"type": "module"`.', 'import fs from "node:fs/promises";'),
    E('cannot-use-import', 'node', 'SyntaxError: Cannot use import statement outside a module', 'ملف CommonJS وانت بتستخدم import.', 'A CommonJS file using import.', 'زوّد `"type": "module"` في package.json أو سمّي الملف .mjs.', 'Add `"type": "module"` to package.json or name the file .mjs.', ''),
    E('enoent', 'node', "Error: ENOENT: no such file or directory, open 'data.csv'", 'الملف مش في المسار ده (الفولدر الحالي مختلف).', 'The file is not at that path (the current folder differs).', 'اطبع `process.cwd()`، واستخدم `new URL("./data.csv", import.meta.url)`.', 'Log `process.cwd()`, and use `new URL("./data.csv", import.meta.url)`.', ''),
    E('eaddr', 'node', 'Error: listen EADDRINUSE: address already in use :::3000', 'فيه برنامج تاني شغّال على البورت ده.', 'Another program is already using that port.', 'اقفل البرنامج التاني أو غيّر البورت بـ `PORT`.', 'Close the other program or change the port with `PORT`.', 'const port = Number(process.env.PORT) || 3000;'),
    E('eacces', 'node', 'Error: EACCES: permission denied', 'مفيش صلاحية على الملف أو البورت (البورتات تحت 1024 محتاجة صلاحيات).', 'No permission on the file or port (ports under 1024 need privileges).', 'استخدم بورت فوق 1024 ورا Caddy أو Nginx، ومتشغّلش بـ sudo.', 'Use a port above 1024 behind Caddy or Nginx, and do not run as root.', ''),
    E('npm-eresolve', 'node', 'npm ERR! ERESOLVE unable to resolve dependency tree', 'حزمتين عايزين نسخ مختلفة من حزمة تالتة.', 'Two packages want different versions of a third.', 'حدّث الحزمة القديمة، أو اقرا الرسالة وشوف مين محتاج إيه.', 'Update the older package, or read the message to see who needs what.', ''),
    E('heap', 'node', 'FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory', 'بتحمّل ملف أو بيانات أكبر من الذاكرة مرة واحدة.', 'You are loading a file or data bigger than memory in one go.', 'استخدم streams ومعالجة سطر سطر.', 'Use streams and process line by line.', ''),
    E('401', 'web', '401 Unauthorized', 'المفتاح أو التوكن ناقص أو غلط أو انتهى.', 'The key or token is missing, wrong or expired.', 'اتأكد من اسم الـ header (Bearer ولا x-api-key) والقيمة في .env.', 'Check the header name (Bearer or x-api-key) and the value in .env.', ''),
    E('429', 'web', '429 Too Many Requests', 'بعت طلبات أسرع من المسموح.', 'You sent requests faster than allowed.', 'استنى `Retry-After` وقلّل السرعة بدفعات.', 'Wait for `Retry-After` and slow down with batches.', ''),
    E('fetch-failed', 'web', 'TypeError: fetch failed', 'مفيش اتصال، أو الدومين غلط، أو شهادة HTTPS مشكلتها.', 'No connection, a wrong domain, or an HTTPS certificate problem.', 'اطبع `err.cause` عشان تعرف السبب الحقيقي.', 'Log `err.cause` to see the real reason.', 'try { await fetch(url); } catch (err) { console.error(err.cause); }'),
    E('413', 'web', '413 Payload Too Large', 'الـ body أكبر من الحد المسموح على السيرفر.', 'The body is larger than the server allows.', 'ابعت الملفات بطريقة multipart أو قسّمها، أو زوّد الحد في السيرفر بتاعك.', 'Send files as multipart or in parts, or raise the limit on your own server.', ''),
    E('ts-undefined', 'ts', "TS2532: Object is possibly 'undefined'.", 'TypeScript شايف إن القيمة ممكن تكون undefined.', 'TypeScript sees that the value may be undefined.', 'افحصها أو استخدم `?.` و`??`.', 'Check it, or use `?.` and `??`.', 'const city = user.address?.city ?? "Cairo";'),
    E('ts-assign', 'ts', "TS2322: Type 'string' is not assignable to type 'number'.", 'بتحط قيمة من نوع غلط.', 'You are assigning a value of the wrong type.', 'حوّل القيمة بـ `Number()` أو صحّح النوع.', 'Convert the value with `Number()` or fix the type.', ''),
    E('ts-any', 'ts', "TS7006: Parameter 'x' implicitly has an 'any' type.", 'دالة من غير نوع للمدخل في وضع strict.', 'A function with no type for its parameter under strict mode.', 'اكتب النوع: `(x: Order) => …`.', 'Write the type: `(x: Order) => …`.', ''),
    E('eslint-unused', 'ts', "ESLint: 'data' is assigned a value but never used. (no-unused-vars)", 'متغير مش مستخدم (غالبًا نسيت تكمّل أو غلط في الاسم).', 'An unused variable (often unfinished work or a typo).', 'استخدمه أو امسحه.', 'Use it or delete it.', '')
  ]
});
})();
