// JavaScript week 30 — accessibility and front-end performance.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const H = { run: 'html' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('إمكانية الوصول والأداء في الواجهة', 'Accessibility and front-end performance'),
  goal: B('تبني واجهات كل الناس تقدر تستخدمها (كيبورد، قارئ شاشة، ضعف نظر) وبتفتح بسرعة على موبايل عادي ونت ضعيف: WCAG والأسماء المتاحة والتركيز والـ live regions، وCore Web Vitals والصور والخطوط والـ JS التقيل — وتقيس قبل ما تحسّن.',
          'Build interfaces everyone can use (keyboard, screen reader, low vision) that open fast on an ordinary phone and a weak connection: WCAG, accessible names, focus and live regions, Core Web Vitals, images, fonts and heavy JS — and measure before you optimise.'),
  days: [
    { title: B('الأساس: WCAG والأسماء', 'The basics: WCAG and names'),
      goal: B('كل عنصر تفاعلي له اسم ودور وحالة صح.', 'Every interactive element has a correct name, role and state.'),
      learn: [
        L(B('مين بيستخدم موقعك؟', 'Who uses your site?'),
          B('**wcag** (معايير إمكانية الوصول) بتتلخّص في 4: **مُدرك** (نص بديل، تباين، ترجمة)، **قابل للتشغيل** (كيبورد، وقت كافي)، **مفهوم** (لغة واضحة، أخطاء مفهومة)، **متين** (HTML صح). ده مش «ميزة إضافية»: كبار السن، ضعاف النظر، اللي بيستخدم موبايل بإيد واحدة، وفي بلاد كتير قانون.', '**wcag** (the accessibility guidelines) boils down to 4: **perceivable** (alt text, contrast, captions), **operable** (keyboard, enough time), **understandable** (clear language, clear errors), **robust** (correct HTML). It is not an «extra feature»: older people, low-vision users, one-handed phone users, and in many countries it is the law.'),
          'the 5 most common failures (WebAIM Million)\n1. low contrast text\n2. images without alt text\n3. empty links / buttons (icon only, no name)\n4. form inputs without labels\n5. missing document language (<html lang="ar">)', T),
        L(B('الاسم المتاح', 'The accessible name'),
          B('قارئ الشاشة بيقول لكل عنصر: **accessible name** + الدور + الحالة («زرار، حذف الطلب 1042»). الاسم بييجي من النص، أو `<label>`، أو `alt`، أو `aria-label`. زرار أيقونة 🗑 من غير اسم = «زرار» بس — مش مفهوم. المراجع ده بيلاقي المشاكل دي في أي صفحة:', 'A screen reader announces each element as **accessible name** + role + state («button, delete order 1042»). The name comes from the text, a `<label>`, `alt` or `aria-label`. An icon-only 🗑 button with no name = just «button» — meaningless. This checker finds such problems on any page:'),
          'const problems = [];\ndocument.querySelectorAll("img:not([alt])").forEach(img => problems.push(`img without alt: ${img.getAttribute("src")}`));\ndocument.querySelectorAll("button, a[href]").forEach(el => {\n  const name = (el.getAttribute("aria-label") || el.textContent || el.querySelector("img[alt]")?.alt || "").trim();\n  if (!name || /^[^\\p{L}\\p{N}]+$/u.test(name)) problems.push(`${el.tagName.toLowerCase()} without a name: ${el.outerHTML.slice(0, 50)}`);\n});\ndocument.querySelectorAll("input:not([type=hidden]), select, textarea").forEach(f => {\n  const labelled = (f.id && document.querySelector(`label[for="${f.id}"]`)) || f.closest("label") || f.getAttribute("aria-label");\n  if (!labelled) problems.push(`field without a label: ${f.outerHTML.slice(0, 50)}`);\n});\nif (!document.documentElement.lang) problems.push("<html> has no lang");\nconsole.log(problems.length + " problem(s)\\n- " + problems.join("\\n- "));', Object.assign({ html: '<img src="logo.png"><button>🗑</button><button aria-label="Delete order 1042">🗑</button><a href="/orders">Orders</a><label for="q">Search</label><input id="q"><input placeholder="Phone">' }, J)),
        L(B('HTML صح قبل ARIA', 'Correct HTML before ARIA'),
          B('أول قاعدة في **aria**: متستخدمهاش لو فيه عنصر HTML بيعمل نفس الحاجة. `<button>` جاهز بالكيبورد والدور والتركيز؛ `<div onclick>` مش جاهز في أي حاجة. استخدم **landmark** (`header`، `nav`، `main`، `footer`) عشان قارئ الشاشة ينط بين الأجزاء، وعناوين بالترتيب (h1 ← h2 ← h3).', 'The first rule of **aria**: do not use it if an HTML element already does the job. `<button>` comes with keyboard, role and focus; `<div onclick>` comes with none. Use each **landmark** (`header`, `nav`, `main`, `footer`) so screen readers can jump between sections, and headings in order (h1 → h2 → h3).'),
          '<!-- ✗ looks like a button, is not one -->\n<div class="btn" onclick="save()">Save</div>\n\n<!-- ✓ a real button: Enter/Space, focus, role, name -->\n<button type="button" onclick="save()">Save</button>\n\n<!-- ✓ landmarks and a heading outline -->\n<header>…</header>\n<nav aria-label="Main">…</nav>\n<main><h1>Orders</h1><h2>Today</h2>…</main>\n<footer>…</footer>', { lang: 'html' })
      ],
      practice: [
        B('شغّل المراجع على صفحة من مشروعك.', 'Run the checker on a page of your project.'),
        B('ادّي اسم لكل زرار أيقونة.', 'Give every icon button a name.'),
        B('بدّل كل div onclick بـ button.', 'Replace every div onclick with a button.'),
        B('جرّب قارئ الشاشة (NVDA أو VoiceOver أو TalkBack) 10 دقايق.', 'Try a screen reader (NVDA, VoiceOver or TalkBack) for 10 minutes.')
      ],
      words: [
        W('wcag', 'معايير إمكانية الوصول للويب', 'the web accessibility guidelines', 'Aim for WCAG AA.'),
        W('accessible name', 'الاسم اللي قارئ الشاشة بيقوله', 'the name a screen reader announces', 'The icon button needs an accessible name.'),
        W('landmark', 'منطقة رئيسية في الصفحة', 'a main region of the page', 'nav is a landmark.'),
        W('heading outline', 'ترتيب العناوين في الصفحة', 'the order of headings on a page', 'Fix the heading outline: h1 then h2.'),
        W('perceivable', 'ممكن يتدرك بالحواس', 'able to be perceived', 'Alt text makes images perceivable.')
      ],
      read: [{ lib: 'web.dev: Accessibility', what: B('اقرا Welcome وAccessible names.', 'Read Welcome and Accessible names.') }, { t: 'WebAIM: The WebAIM Million', url: 'https://webaim.org/projects/million/', what: B('اقرا أشهر الأخطاء.', 'Read the most common errors.') }],
      challenge: B('اعمل مراجعة a11y لمشروع الشهر التالت: شغّل المراجع وLighthouse، وصلّح كل الأسماء والـ labels والـ lang والعناوين والـ landmarks — واكتب قبل/بعد.', 'Audit the month 3 project for accessibility: run the checker and Lighthouse, fix every name, label, lang, heading and landmark — and write a before/after.'),
      quiz: [
        Q(B('زرار 🗑 من غير اسم:', 'A 🗑 button with no name:'), [['aria-label أو نص مخفي', 'aria-label or hidden text'], ['تمام', 'fine'], ['title بس', 'title only']], 0, B('accessible name.', 'An accessible name.')),
        Q(B('عنصر قابل للضغط:', 'A clickable element:'), ['<button>', '<div onclick>', '<span>'], 0, B('جاهز.', 'Built in.')),
        Q(B('أول قاعدة في ARIA:', 'The first rule of ARIA:'), [['HTML صح الأول', 'correct HTML first'], ['ARIA في كل حاجة', 'ARIA everywhere'], ['role=button دايمًا', 'always role=button']], 0, B('native.', 'Native.'))
      ] },

    { title: B('الكيبورد والتركيز والإعلانات', 'Keyboard, focus and announcements'),
      goal: B('كل حاجة بتتعمل بالكيبورد، والتغييرات بتتقال.', 'Everything works by keyboard, and changes are announced.'),
      learn: [
        L(B('التنقل بالكيبورد', 'Keyboard navigation'),
          B('**keyboard navigation**: Tab يتنقل، Enter/Space يضغط، Esc يقفل، والأسهم جوه القوائم. التركيز لازم **يبان** (`:focus-visible` بإطار واضح — متشيلش الـ outline من غير بديل). و**skip link** «انتقل للمحتوى» أول عنصر في الصفحة عشان مستخدم الكيبورد ميعدّيش على القايمة كل مرة.', '**keyboard navigation**: Tab moves, Enter/Space presses, Esc closes, arrows inside lists. Focus must be **visible** (`:focus-visible` with a clear outline — never remove the outline without a replacement). And a **skip link** «skip to content» as the first element so keyboard users do not tab through the menu every time.'),
          '<style>\n  body { font-family: system-ui; }\n  .skip { position: absolute; inset-inline-start: 8px; top: -40px; background: #0a7d32; color: #fff; padding: 6px 10px; border-radius: 6px; }\n  .skip:focus { top: 8px; }\n  :focus-visible { outline: 3px solid #1a5fb4; outline-offset: 2px; }\n  nav a { margin-inline-end: 10px; }\n</style>\n<a class="skip" href="#main">Skip to content</a>\n<nav aria-label="Main"><a href="#">Home</a><a href="#">Orders</a><a href="#">Customers</a><a href="#">Reports</a></nav>\n<main id="main" tabindex="-1"><h1>Orders</h1><p>Press Tab from the top: the skip link appears first.</p><button>New order</button></main>', H),
        L(B('إدارة التركيز', 'Managing focus'),
          B('**focus management**: لما تفتح modal ودّي التركيز جواه، واعمل **focus trap** (Tab يلف جوه بس)، ولما يتقفل رجّعه للزرار اللي فتحه. ولما تحذف عنصر أو تنتقل لصفحة: حط التركيز في مكان منطقي. `<dialog>` بـ `showModal()` بيعمل أغلب ده لوحده.', '**focus management**: when a modal opens move focus inside and keep a **focus trap** (Tab cycles inside only), and when it closes return focus to the button that opened it. After deleting an item or changing view: put focus somewhere sensible. `<dialog>` with `showModal()` does most of this for you.'),
          '<style> body { font-family: system-ui; } dialog { border-radius: 12px; border: 1px solid #ccd; } </style>\n<button id="open">Delete order #1042</button>\n<dialog id="confirm" aria-labelledby="t">\n  <h2 id="t">Delete order #1042?</h2>\n  <p>This cannot be undone.</p>\n  <form method="dialog"><button value="cancel" autofocus>Cancel</button> <button value="delete">Delete</button></form>\n</dialog>\n<p id="result" aria-live="polite"></p>\n<script>\n  const dlg = document.getElementById("confirm"), opener = document.getElementById("open");\n  opener.addEventListener("click", () => dlg.showModal());          // focus moves in, Esc closes, focus is trapped\n  dlg.addEventListener("close", () => {\n    document.getElementById("result").textContent = dlg.returnValue === "delete" ? "Order deleted" : "Kept the order";\n    opener.focus();                                                // focus returns\n  });\n</script>', H),
        L(B('الإعلانات', 'Announcements'),
          B('تغيير بيحصل من غير ما الصفحة تتحمّل (اتحفظ، 3 نتايج، خطأ) قارئ الشاشة مبيشوفوش. **live region** (`aria-live="polite"` أو `role="status"`) بيتقال أول ما محتواه يتغير. للأخطاء العاجلة `role="alert"`. خلّي الـ region موجود في الصفحة من الأول وغيّر نصه بس.', 'A change that happens without a page load (saved, 3 results, an error) is invisible to screen readers. A **live region** (`aria-live="polite"` or `role="status"`) is announced when its content changes. For urgent errors, `role="alert"`. Keep the region in the page from the start and only change its text.'),
          'const status = document.querySelector("#status");          // <p id="status" role="status"></p> exists from the start\nasync function search(q) {\n  status.textContent = "Searching…";\n  const results = await fetchResults(q);\n  render(results);\n  status.textContent = results.length ? `${results.length} results for ${q}` : `No results for ${q}`;\n}\nform.addEventListener("submit", e => {\n  if (!phone.checkValidity()) {\n    e.preventDefault();\n    phone.setAttribute("aria-invalid", "true");\n    phoneError.textContent = "Phone must be 11 digits";      // phoneError has role="alert"\n    phone.focus();\n  }\n});', S)
      ],
      practice: [
        B('استخدم مشروعك بالكيبورد بس 10 دقايق.', 'Use your project by keyboard only for 10 minutes.'),
        B('ضيف skip link و:focus-visible.', 'Add a skip link and :focus-visible.'),
        B('حوّل modal لـ <dialog> بـ showModal.', 'Turn a modal into <dialog> with showModal.'),
        B('ضيف role="status" لنتايج البحث.', 'Add role="status" to search results.')
      ],
      words: [
        W('keyboard navigation', 'استخدام الموقع بالكيبورد', 'using a site with the keyboard', 'Test keyboard navigation with Tab.'),
        W('skip link', 'رابط «انتقل للمحتوى»', 'a «skip to content» link', 'The skip link is the first focus stop.'),
        W('focus management', 'التحكم في مكان التركيز', 'controlling where focus goes', 'Focus management returns focus to the opener.'),
        W('focus trap', 'حصر التركيز جوه modal', 'keeping focus inside a modal', 'showModal creates a focus trap.'),
        W('live region', 'منطقة بيتقال تغييرها', 'a region whose changes are announced', 'Results go in a live region.'),
        W('aria-live', 'خاصية بتعلن التغييرات', 'an attribute announcing changes', 'aria-live="polite" waits for a pause.')
      ],
      read: [{ lib: 'WAI-ARIA Authoring Practices', what: B('اقرا Dialog (Modal) Pattern.', 'Read the Dialog (Modal) Pattern.') }, { t: 'MDN: <dialog>', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog', what: B('اقرا Accessibility.', 'Read Accessibility.') }],
      challenge: B('اعمل «لوحة طلبات» بالكيبورد بالكامل: skip link، focus واضح، modal تأكيد بـ dialog يرجّع التركيز، بحث بـ live region، وأخطاء فورم بـ role="alert" وaria-invalid — وجرّبها بقارئ شاشة.', 'Build a fully keyboard-operable «orders board»: a skip link, visible focus, a dialog confirmation returning focus, search with a live region, and form errors with role="alert" and aria-invalid — and test it with a screen reader.'),
      quiz: [
        Q(B('outline: none من غير بديل:', 'outline: none with no replacement:'), [['مستخدم الكيبورد يتوه', 'keyboard users get lost'], ['أجمل وخلاص', 'just prettier'], ['أسرع', 'faster']], 0, B(':focus-visible.', ':focus-visible.')),
        Q(B('بعد قفل modal التركيز:', 'After closing a modal, focus:'), [['يرجع للزرار اللي فتحه', 'returns to the opener'], ['يروح أول الصفحة', 'goes to the top'], ['يختفي', 'disappears']], 0, B('management.', 'Management.')),
        Q(B('«تم الحفظ» من غير تحميل صفحة:', '«Saved» with no page load:'), [['live region', 'a live region'], ['alert()', 'alert()'], ['console.log', 'console.log']], 0, B('بيتقال.', 'Announced.'))
      ] },

    { title: B('قياس الأداء', 'Measuring performance'),
      goal: B('تعرف موقعك بطيء فين بالأرقام قبل ما تحسّن.', 'Know where your site is slow, in numbers, before optimising.'),
      learn: [
        L(B('Core Web Vitals', 'Core Web Vitals'),
          B('**core web vitals** 3 أرقام جوجل بيقيسها من مستخدمين حقيقيين: **lcp** (أكبر عنصر ظهر إمتى — هدف < 2.5 ث)، **inp** (الصفحة بترد على الضغط بسرعة قد إيه — < 200ms)، **cls** (الحاجات بتتنطط قد إيه — < 0.1). بتأثر على تجربة المستخدم وعلى الـ SEO.', '**core web vitals** are 3 numbers Google measures from real users: **lcp** (when the largest element appeared — target < 2.5 s), **inp** (how fast the page responds to taps — < 200 ms), **cls** (how much things jump around — < 0.1). They affect user experience and SEO.'),
          'LCP  Largest Contentful Paint   ≤ 2.5 s good · > 4 s poor     → hero image, fonts, server time\nINP  Interaction to Next Paint   ≤ 200 ms good · > 500 ms poor → long JS tasks on click\nCLS  Cumulative Layout Shift     ≤ 0.1 good · > 0.25 poor     → images without size, late banners\nmeasure: Lighthouse (lab) · Chrome UX Report / web-vitals (real users)', T),
        L(B('Lighthouse والمختبر', 'Lighthouse and the lab'),
          B('Lighthouse (في DevTools) بيقيس في **مختبر**: جهاز ونت متقلّلين، ونتيجة من 100 مع اقتراحات. مفيد للمقارنة قبل/بعد. بس المستخدمين الحقيقيين غير: **real user monitoring** بمكتبة web-vitals بيبعت الأرقام الحقيقية (لـ n8n أو Analytics).', 'Lighthouse (in DevTools) measures in a **lab**: a throttled device and network, a score out of 100 with suggestions. Useful for before/after comparisons. But real users differ: **real user monitoring** with the web-vitals library sends the real numbers (to n8n or analytics).'),
          'import { onLCP, onINP, onCLS } from "https://unpkg.com/web-vitals@4?module";\n\nfunction send(metric) {\n  const body = JSON.stringify({ name: metric.name, value: Math.round(metric.value * 1000) / 1000, rating: metric.rating, page: location.pathname });\n  navigator.sendBeacon?.("/rum", body) || fetch("/rum", { method: "POST", body, keepalive: true });\n}\nonLCP(send); onINP(send); onCLS(send);', S),
        L(B('المهام الطويلة', 'Long tasks'),
          B('**long task** = كود JS بياخد أكتر من 50ms من غير توقف — والصفحة متجمدة طول الوقت ده (INP وحش). الحل: قسّم الشغل الكبير لدفعات واتنازل للمتصفح بينها (`await new Promise(r => setTimeout(r))` أو `scheduler.yield()`). الفرق بيبان في الأرقام:', 'A **long task** = JS running over 50 ms without a break — and the page is frozen the whole time (bad INP). The fix: split big work into batches and yield to the browser in between (`await new Promise(r => setTimeout(r))` or `scheduler.yield()`). The difference shows in the numbers:'),
          'const rows = Array.from({ length: 100_000 }, (_, i) => ({ id: i, total: (i * 37) % 500, city: ["Cairo", "Giza", "Alex"][i % 3] }));\nconst work = r => { let x = 0; for (let k = 0; k < 300; k++) x += Math.sqrt(r.total + k); return x; };\n\nlet t = performance.now();\nrows.forEach(work);                                   // one long task\nconst blocked = performance.now() - t;\n\n(async () => {\n  const yieldToBrowser = () => new Promise(r => setTimeout(r, 0));\n  let longest = 0;\n  for (let i = 0; i < rows.length; i += 5000) {\n    const s = performance.now();\n    rows.slice(i, i + 5000).forEach(work);\n    longest = Math.max(longest, performance.now() - s);\n    await yieldToBrowser();                           // let clicks and painting happen\n  }\n  console.log(`one block: page frozen ~${Math.round(blocked)} ms`);\n  console.log(`in batches: longest freeze ~${Math.round(longest)} ms (the page stays responsive)`);\n})();', J)
      ],
      practice: [
        B('شغّل Lighthouse على مشروعك موبايل واكتب الأرقام.', 'Run Lighthouse (mobile) on your project and write down the numbers.'),
        B('اعمل Performance recording وشوف المهام الطويلة.', 'Record in the Performance panel and find long tasks.'),
        B('ضيف web-vitals وابعت لـ webhook n8n.', 'Add web-vitals and send to an n8n webhook.'),
        B('قسّم loop تقيلة لدفعات.', 'Split a heavy loop into batches.')
      ],
      words: [
        W('core web vitals', 'مقاييس جوجل لتجربة المستخدم', 'Google’s user-experience metrics', 'Core Web Vitals affect ranking.'),
        W('lcp', 'إمتى أكبر عنصر ظهر', 'when the largest element appeared', 'The hero image drives LCP.'),
        W('inp', 'سرعة الرد على التفاعل', 'how fast the page responds to input', 'Long tasks hurt INP.'),
        W('cls', 'مقدار تنطيط العناصر', 'how much the layout shifts', 'Images without sizes raise CLS.'),
        W('long task', 'كود بياخد أكتر من 50ms متواصل', 'code running over 50 ms without a break', 'Split the long task into batches.'),
        W('real user monitoring', 'قياس الأداء من مستخدمين حقيقيين', 'measuring performance from real users', 'Real user monitoring shows slow phones.')
      ],
      read: [{ lib: 'web.dev: Learn Performance', what: B('اقرا Why speed matters وWeb Vitals.', 'Read Why speed matters and Web Vitals.') }, { t: 'web.dev: Optimize long tasks', url: 'https://web.dev/articles/optimize-long-tasks', what: B('اقرا Yield to the main thread.', 'Read Yield to the main thread.') }],
      challenge: B('قِس صفحتين من مشروعك: Lighthouse موبايل + Performance recording + web-vitals من جهازك الحقيقي — واكتب أكبر 3 مشاكل بالأرقام (مش تخمين) قبل ما تصلّح أي حاجة.', 'Measure two pages of your project: Lighthouse mobile + a Performance recording + web-vitals from your real phone — and write down the 3 biggest problems in numbers (not guesses) before fixing anything.'),
      quiz: [
        Q(B('الصفحة بطيئة في الرد على الضغط:', 'The page is slow to respond to taps:'), ['INP', 'LCP', 'CLS'], 0, B('interaction.', 'Interaction.')),
        Q(B('الحاجات بتتنطط وهي بتتحمّل:', 'Things jump while loading:'), ['CLS', 'LCP', 'INP'], 0, B('layout shift.', 'Layout shift.')),
        Q(B('loop بياخد 800ms:', 'A loop taking 800 ms:'), [['قسّمه دفعات واتنازل', 'split into batches and yield'], ['سيبه', 'leave it'], ['async بس', 'just mark it async']], 0, B('long task.', 'A long task.'))
      ] },

    { title: B('الصور والخطوط والتحميل', 'Images, fonts and loading'),
      goal: B('تقلل حجم الصفحة وتسرّع أول عرض.', 'Shrink the page and speed up the first view.'),
      learn: [
        L(B('الصور', 'Images'),
          B('الصور غالبًا أكبر حاجة في الصفحة. **image optimization**: صيغة حديثة (**webp** أو **avif** أصغر 30-50%)، مقاس مناسب بـ **srcset** (الموبايل ياخد صورة صغيرة)، `width`/`height` عشان CLS، `loading="lazy"` للصور تحت، و`fetchpriority="high"` لصورة الـ LCP.', 'Images are usually the largest thing on a page. **image optimization**: a modern format (**webp** or **avif**, 30–50% smaller), the right size with **srcset** (phones get a small image), `width`/`height` for CLS, `loading="lazy"` for images below the fold, and `fetchpriority="high"` for the LCP image.'),
          '<!-- the hero (LCP): never lazy, high priority, modern formats, right size -->\n<picture>\n  <source type="image/avif" srcset="hero-640.avif 640w, hero-1280.avif 1280w" sizes="100vw">\n  <source type="image/webp" srcset="hero-640.webp 640w, hero-1280.webp 1280w" sizes="100vw">\n  <img src="hero-1280.jpg" alt="Orders dashboard" width="1280" height="640" fetchpriority="high">\n</picture>\n\n<!-- product thumbnails further down -->\n<img src="pen-320.webp" alt="Blue pen" width="320" height="320" loading="lazy" decoding="async">', { lang: 'html' }),
        L(B('الخطوط', 'Fonts'),
          B('خط عربي ممكن يبقى 200KB! استخدم woff2، وحمّل الأوزان اللي محتاجها بس، و`unicode-range` للعربي لوحده، و**font-display** `swap` عشان النص يظهر فورًا بخط احتياطي، و`preload` للخط الأساسي. أو استخدم خط النظام للواجهات.', 'An Arabic font can be 200 KB! Use woff2, load only the weights you need, a separate `unicode-range` for Arabic, **font-display** `swap` so text appears at once in a fallback font, and `preload` for the main font. Or use the system font for interfaces.'),
          '<link rel="preload" href="/fonts/cairo-ar-400.woff2" as="font" type="font/woff2" crossorigin>\n<style>\n  @font-face {\n    font-family: "Cairo";\n    src: url("/fonts/cairo-ar-400.woff2") format("woff2");\n    font-weight: 400;\n    font-display: swap;                                  /* show text now, swap when ready */\n    unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF;   /* Arabic only */\n  }\n  body { font-family: "Cairo", system-ui, sans-serif; }\n</style>', { lang: 'html' }),
        L(B('JS وCSS اللي بيوقفوا العرض', 'JS and CSS that block rendering'),
          B('**render-blocking**: `<script>` عادي في head بيوقف العرض لحد ما يتحمّل ويشتغل. استخدم **defer** (أو `type="module"`) لكل سكربت، و**preload** للحاجات الحرجة، و**code splitting** (dynamic import من أسبوع 15) للتقيل اللي مش محتاجه أول ما الصفحة تفتح، وراقب **bundle size**.', '**render-blocking**: a plain `<script>` in head stops rendering until it downloads and runs. Use **defer** (or `type="module"`) for every script, **preload** for critical resources, **code splitting** (the dynamic import from week 15) for heavy code not needed at first, and watch the **bundle size**.'),
          '<head>\n  <link rel="stylesheet" href="/css/app.css">                <!-- small, critical -->\n  <script src="/js/app.js" defer></script>                   <!-- runs after parsing, in order -->\n  <script type="module" src="/js/orders.js"></script>        <!-- modules are deferred by default -->\n</head>\n<script type="module">\n  document.querySelector("#export").addEventListener("click", async () => {\n    const { exportPdf } = await import("/js/pdf-export.js");   // 300 KB loaded only when needed\n    exportPdf();\n  });\n</script>', { lang: 'html' })
      ],
      practice: [
        B('حوّل صور مشروعك لـ webp/avif بـ srcset.', 'Convert your project’s images to webp/avif with srcset.'),
        B('ضيف width/height لكل صورة وشوف CLS.', 'Add width/height to every image and check CLS.'),
        B('قلّل الخط العربي لوزنين وwoff2.', 'Cut the Arabic font to two weights in woff2.'),
        B('ضيف defer لكل script وdynamic import لمكتبة تقيلة.', 'Add defer to every script and a dynamic import for a heavy library.')
      ],
      words: [
        W('image optimization', 'تصغير الصور من غير ما تبوظ', 'shrinking images without spoiling them', 'Image optimization halved the page.'),
        W('srcset', 'قايمة مقاسات صورة للمتصفح يختار', 'a list of image sizes for the browser to pick', 'srcset serves small images to phones.'),
        W('webp', 'صيغة صور حديثة أصغر', 'a modern, smaller image format', 'Convert the photos to WebP.'),
        W('avif', 'صيغة صور أحدث وأصغر', 'a newer, even smaller image format', 'AVIF beats JPEG by half.'),
        W('font-display', 'سلوك النص لحد ما الخط يتحمّل', 'text behaviour until the font loads', 'font-display: swap shows text at once.'),
        W('render-blocking', 'مورد بيوقف ظهور الصفحة', 'a resource stopping the page from showing', 'A plain script in head is render-blocking.'),
        W('defer', 'تأجيل تشغيل السكربت لبعد قراءة الصفحة', 'running a script after the page is parsed', 'Add defer to every script.'),
        W('preload', 'طلب مورد حرج بدري', 'requesting a critical resource early', 'Preload the main font.'),
        W('code splitting', 'تقسيم الـ JS لأجزاء بتتحمّل وقت الحاجة', 'splitting JS into parts loaded when needed', 'Code splitting moved PDF export out.'),
        W('bundle size', 'حجم ملفات JS', 'the size of the JS files', 'Keep the bundle size under 150 KB.')
      ],
      read: [{ t: 'web.dev: Optimize Largest Contentful Paint', url: 'https://web.dev/articles/optimize-lcp', what: B('اقرا الأقسام الأربعة.', 'Read the four sections.') }, { t: 'MDN: Responsive images', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images', what: B('اقرا srcset وsizes.', 'Read srcset and sizes.') }],
      challenge: B('حسّن صفحة واحدة لحد ما Lighthouse موبايل يدّي ≥ 90 أداء: صور حديثة بمقاسات، خط أخف، defer، code splitting — واكتب كل تحسين وأثره بالأرقام.', 'Improve one page until Lighthouse mobile gives ≥ 90 performance: modern sized images, a lighter font, defer, code splitting — recording each change and its effect in numbers.'),
      quiz: [
        Q(B('صورة الـ LCP:', 'The LCP image:'), [['fetchpriority="high" ومش lazy', 'fetchpriority="high" and not lazy'], ['loading="lazy"', 'loading="lazy"'], ['CSS background', 'a CSS background']], 0, B('أول حاجة.', 'First thing.')),
        Q(B('النص ميستناش الخط:', 'Text does not wait for the font:'), ['font-display: swap', 'font-weight: 400', 'preload only'], 0, B('swap.', 'Swap.')),
        Q(B('script في head من غير defer:', 'A script in head without defer:'), ['render-blocking', B('أسرع', 'faster'), B('مفيش فرق', 'no difference')], 0, B('بيوقف العرض.', 'Blocks rendering.'))
      ] },

    { title: B('ميزانية ومراقبة', 'Budgets and monitoring'),
      goal: B('الأداء وإمكانية الوصول يفضلوا كويسين مع كل تعديل.', 'Performance and accessibility stay good with every change.'),
      learn: [
        L(B('ميزانية الأداء', 'A performance budget'),
          B('**performance budget**: حدود متفق عليها (JS < 150KB، صور الصفحة < 500KB، LCP < 2.5ث، Lighthouse ≥ 90) — وCI بيفشل لو حد عدّاها. من غير ميزانية، الموقع بيتقل ببطء ومحدش بياخد باله.', 'A **performance budget**: agreed limits (JS < 150 KB, page images < 500 KB, LCP < 2.5 s, Lighthouse ≥ 90) — and CI fails if anyone exceeds them. Without a budget, a site slows down gradually and nobody notices.'),
          '// budget.json for Lighthouse CI (lhci autorun --assert.budgetsFile=budget.json)\n[{\n  "path": "/*",\n  "resourceSizes": [\n    { "resourceType": "script", "budget": 150 },\n    { "resourceType": "image", "budget": 500 },\n    { "resourceType": "font", "budget": 120 }\n  ],\n  "timings": [{ "metric": "largest-contentful-paint", "budget": 2500 }]\n}]', T),
        L(B('a11y آلي في الاختبارات', 'Automated a11y in tests'),
          B('**axe** (axe-core) بيلاقي حوالي 40-50% من مشاكل إمكانية الوصول آليًا (تباين، أسماء، labels، ARIA غلط). شغّله في Playwright (`@axe-core/playwright`) على كل صفحة في CI. الباقي محتاج إنسان: كيبورد وقارئ شاشة.', '**axe** (axe-core) finds roughly 40–50% of accessibility problems automatically (contrast, names, labels, wrong ARIA). Run it in Playwright (`@axe-core/playwright`) on every page in CI. The rest needs a human: keyboard and screen reader.'),
          'import { test, expect } from "@playwright/test";\nimport AxeBuilder from "@axe-core/playwright";\n\nfor (const path of ["/", "/orders", "/orders/new"]) {\n  test(`no serious a11y issues on ${path}`, async ({ page }) => {\n    await page.goto(path);\n    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();\n    const serious = violations.filter(v => ["serious", "critical"].includes(v.impact));\n    expect(serious.map(v => `${v.id}: ${v.nodes.length}`)).toEqual([]);\n  });\n}', S),
        L(B('الشبكة البطيئة والـ offline', 'Slow networks and offline'),
          B('جرّب بـ Network throttling «Slow 4G» وCPU 4x slowdown — ده موبايل عادي. وللأدوات اللي الموظفين بيستخدموها في المخزن أو الطريق: Service Worker بيخلّي الصفحة تفتح من غير نت، والفورمز تتحفظ وتتبعت لما النت يرجع (زي الموقع ده!).', 'Test with Network throttling «Slow 4G» and a 4× CPU slowdown — that is an ordinary phone. For tools staff use in a warehouse or on the road: a Service Worker lets the page open offline, and forms are saved and sent when the connection returns (like this very site!).'),
          'DevTools → Performance → CPU: 4× slowdown · Network: Slow 4G → reload and record\nchecklist on a slow phone\n[ ] first content < 2 s · [ ] taps respond < 200 ms · [ ] nothing jumps\n[ ] works with the keyboard · [ ] readable at 200% zoom · [ ] usable offline (if needed)', T)
      ],
      practice: [
        B('اكتب budget.json لمشروعك.', 'Write a budget.json for your project.'),
        B('شغّل axe على 3 صفحات وصلّح الـ serious.', 'Run axe on 3 pages and fix the serious issues.'),
        B('جرّب Slow 4G و4x CPU.', 'Try Slow 4G and a 4× CPU slowdown.'),
        B('كبّر الصفحة 200% واتأكد مفيش حاجة بتتقطع.', 'Zoom to 200% and check nothing is cut off.')
      ],
      words: [
        W('performance budget', 'حدود أداء متفق عليها', 'agreed performance limits', 'The PR broke the performance budget.'),
        W('axe', 'أداة فحص إمكانية الوصول آليًا', 'an automated accessibility checker', 'axe found low contrast.'),
        W('throttling', 'تبطيء الشبكة أو المعالج للاختبار', 'slowing network or CPU for testing', 'Test with network throttling.'),
        W('zoom 200%', 'تكبير الصفحة للضعف', 'enlarging the page to double size', 'Text must work at zoom 200%.'),
        W('lighthouse ci', 'تشغيل Lighthouse آليًا في CI', 'running Lighthouse automatically in CI', 'Lighthouse CI checks every PR.')
      ],
      read: [{ lib: 'Lighthouse', what: B('اقرا Lighthouse CI.', 'Read Lighthouse CI.') }, { t: 'axe-core for Playwright', url: 'https://playwright.dev/docs/accessibility-testing', what: B('اقرا Scanning an entire page.', 'Read Scanning an entire page.') }],
      challenge: B('ضيف لـ CI مشروعك: axe على كل الصفحات (صفر serious)، وLighthouse CI بميزانية — وخلّي PR يكسر الميزانية عمدًا وشوفه بيفشل.', 'Add to your project’s CI: axe on every page (zero serious) and Lighthouse CI with a budget — then open a PR that deliberately breaks the budget and watch it fail.'),
      quiz: [
        Q(B('axe بيلاقي:', 'axe finds:'), [['جزء من المشاكل آليًا', 'part of the problems automatically'], ['كل المشاكل', 'every problem'], ['ولا حاجة', 'nothing']], 0, B('والباقي إنسان.', 'The rest needs a human.')),
        Q(B('ميزانية الأداء فايدتها:', 'A performance budget helps:'), [['تمنع التقل التدريجي', 'prevent gradual slowdown'], ['تسرّع السيرفر', 'speed up the server'], ['تقلل الاختبارات', 'reduce tests']], 0, B('CI.', 'CI.')),
        Q(B('اختبار «موبايل عادي»:', 'Testing an «ordinary phone»:'), [['Slow 4G و4x CPU', 'Slow 4G and 4× CPU'], ['واي فاي المكتب', 'the office Wi-Fi'], ['أحدث لابتوب', 'the newest laptop']], 0, B('واقعي.', 'Realistic.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('واجهة سريعة ومتاحة للكل.', 'A fast interface accessible to all.'),
      review: [
        B('WCAG والأسماء المتاحة وHTML قبل ARIA والـ landmarks.', 'WCAG, accessible names, HTML before ARIA and landmarks.'),
        B('الكيبورد وskip link وfocus-visible وdialog والـ live regions.', 'The keyboard, skip links, focus-visible, dialog and live regions.'),
        B('Core Web Vitals وLighthouse والمهام الطويلة وRUM.', 'Core Web Vitals, Lighthouse, long tasks and RUM.'),
        B('الصور الحديثة وsrcset والخطوط وdefer وcode splitting.', 'Modern images, srcset, fonts, defer and code splitting.'),
        B('ميزانية الأداء وaxe في CI والاختبار على شبكة بطيئة.', 'Performance budgets, axe in CI and testing on slow networks.')
      ],
      project: B('خلّي «بوابة طلبات العملاء» (الشهر التالت) بمستوى إنتاج: صفر مشاكل serious في axe، كيبورد بالكامل وskip link وdialog وlive regions، Lighthouse موبايل ≥ 90 في الأداء و100 في إمكانية الوصول، صور avif/webp بـ srcset، خط عربي ≤ 60KB، defer وcode splitting، web-vitals بتتبعت لـ webhook n8n بيسجّلها في شيت، وCI بميزانية — مع تقرير قبل/بعد بالأرقام.', 'Bring the «customer orders portal» (month 3) to production level: zero serious axe issues, full keyboard use with a skip link, dialog and live regions, Lighthouse mobile ≥ 90 performance and 100 accessibility, avif/webp images with srcset, an Arabic font ≤ 60 KB, defer and code splitting, web-vitals sent to an n8n webhook logging them in a sheet, and CI with a budget — plus a before/after report in numbers.'),
      test: [
        Q(B('أشهر مشكلة a11y:', 'The most common a11y failure:'), [['تباين ضعيف', 'low contrast'], ['خط كبير', 'large text'], ['ألوان كتير', 'many colours']], 0, B('WebAIM.', 'WebAIM.')),
        Q(B('اسم زرار أيقونة:', 'An icon button’s name:'), ['aria-label', B('title بس', 'title only'), 'class'], 0, B('accessible name.', 'An accessible name.')),
        Q(B('<html lang="ar"> مهم لـ:', '<html lang="ar"> matters for:'), [['نطق قارئ الشاشة', 'screen reader pronunciation'], ['الألوان', 'colours'], ['السرعة', 'speed']], 0, B('اللغة.', 'Language.')),
        Q(B('skip link:', 'A skip link:'), [['ينط للمحتوى الرئيسي', 'jumps to the main content'], ['يقفل الصفحة', 'closes the page'], ['إعلان', 'an ad']], 0, B('كيبورد.', 'Keyboard.')),
        Q(B('<dialog> بـ showModal:', '<dialog> with showModal:'), [['تركيز جوه وEsc وtrap', 'focus inside, Esc and a trap'], ['مفيش أي حاجة', 'nothing special'], ['popup جديد', 'a new popup window']], 0, B('جاهز.', 'Built in.')),
        Q(B('role="status":', 'role="status":'), ['live region', 'landmark', 'heading'], 0, B('بيتقال.', 'Announced.')),
        Q(B('LCP جيد:', 'A good LCP:'), ['≤ 2.5 s', '≤ 10 s', '≤ 0.1'], 0, B('ثواني.', 'Seconds.')),
        Q(B('صور من غير width/height:', 'Images without width/height:'), [['CLS أعلى', 'higher CLS'], ['أسرع', 'faster'], ['مفيش فرق', 'no difference']], 0, B('تنطيط.', 'Shifting.')),
        Q(B('موبايل ياخد صورة صغيرة:', 'Phones get a small image via:'), ['srcset + sizes', 'CSS zoom', 'loading="eager"'], 0, B('responsive images.', 'Responsive images.')),
        Q(B('مكتبة PDF 300KB تتحمّل عند الضغط:', 'A 300 KB PDF library loaded on click:'), ['dynamic import', B('script في head', 'a script in head'), 'preload'], 0, B('code splitting.', 'Code splitting.')),
        Q(B('INP وحش غالبًا بسبب:', 'Bad INP is usually caused by:'), ['long tasks', B('صور كبيرة', 'big images'), B('خطوط', 'fonts')], 0, B('JS تقيل.', 'Heavy JS.')),
        Q(B('مشاكل a11y آليًا في CI:', 'Automated a11y issues in CI:'), ['axe', 'Prettier', 'tsc'], 0, B('axe-core.', 'axe-core.'))
      ] }
  ]
};
