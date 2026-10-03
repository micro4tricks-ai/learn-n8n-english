// JavaScript week 29 — advanced CSS: variables, animation and modern features.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const H = { run: 'html' };
const C = { lang: 'css' };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('CSS المتقدم: المتغيرات والحركة والميزات الحديثة', 'Advanced CSS: variables, animation and modern features'),
  goal: B('تكتب CSS حديث بيقلل الكود ويزوّد المرونة: متغيرات وdesign tokens وثيمات، محددات زي :has() وطبقات الـ cascade والـ nesting، تصميم متجاوب من غير media queries كتير (clamp وcontainer queries)، حركة سلسة ومحترمة، وCSS للطباعة.',
          'Write modern CSS that means less code and more flexibility: variables, design tokens and themes, selectors like :has(), cascade layers and nesting, responsive design without many media queries (clamp and container queries), smooth and respectful motion, and CSS for printing.'),
  days: [
    { title: B('المتغيرات والثيمات', 'Variables and themes'),
      goal: B('قيم التصميم كلها في مكان واحد وتتغير بسطر.', 'All design values in one place, changed with one line.'),
      learn: [
        L(B('design tokens', 'Design tokens'),
          B('**css variable** (`--brand: …`) بيورث زي أي خاصية: تعرّفه على `:root` للكل، أو على عنصر لجزء بس. **design token** = قرار تصميم باسم (`--space-2`، `--radius`، `--brand`) بدل أرقام متناثرة. غيّر token واحد يتغير الموقع كله.', 'A **css variable** (`--brand: …`) inherits like any property: define it on `:root` for everything, or on an element for one part. A **design token** = a named design decision (`--space-2`, `--radius`, `--brand`) instead of scattered numbers. Change one token and the whole site follows.'),
          '<style>\n  :root { --brand: #0a7d32; --radius: 12px; --space: 12px; --text: #1b1f24; --muted: #5b6470; font-family: system-ui, sans-serif; }\n  .card { border: 1px solid #dde3ea; border-radius: var(--radius); padding: calc(var(--space) * 1.5); color: var(--text); max-width: 320px; margin: var(--space); }\n  .card h3 { margin: 0 0 6px; color: var(--brand); }\n  .card p { margin: 0; color: var(--muted); }\n  .danger { --brand: #b42318; }            /* override for this card only */\n</style>\n<div class="card"><h3>Order #1042</h3><p>Paid · 250 EGP</p></div>\n<div class="card danger"><h3>Order #1043</h3><p>Refund requested</p></div>', H),
        L(B('ثيم فاتح وغامق', 'Light and dark themes'),
          B('`color-scheme: light dark` و**light-dark()** بيختاروا اللون حسب ثيم المستخدم في سطر واحد. ومع `[data-theme]` على html تقدر تخلّي المستخدم يختار بنفسه. و**oklch** نظام ألوان بيدّي درجات متساوية الإضاءة — و**color-mix()** بيعمل درجة فاتحة أو غامقة من لون واحد.', '`color-scheme: light dark` and **light-dark()** pick a colour from the user’s theme in one line. With `[data-theme]` on html the user can choose. **oklch** is a colour system giving evenly bright shades — and **color-mix()** makes a lighter or darker shade from one colour.'),
          '<style>\n  :root { color-scheme: light dark; --brand: oklch(55% 0.15 150);\n          --bg: light-dark(#ffffff, #12161b); --fg: light-dark(#1b1f24, #e6edf3); }\n  :root[data-theme="light"] { color-scheme: light; }\n  :root[data-theme="dark"] { color-scheme: dark; }\n  body { background: var(--bg); color: var(--fg); font-family: system-ui; padding: 12px; }\n  .chip { display: inline-block; padding: 4px 10px; border-radius: 99px; margin: 4px;\n          background: color-mix(in oklch, var(--brand) 18%, transparent); color: var(--brand); }\n  .solid { background: var(--brand); color: white; }\n  .soft { background: color-mix(in oklch, var(--brand), white 70%); }\n</style>\n<button onclick="document.documentElement.dataset.theme = document.documentElement.dataset.theme === \'dark\' ? \'light\' : \'dark\'">Toggle theme</button>\n<p><span class="chip">paid</span><span class="chip solid">shipped</span><span class="chip soft">new</span></p>', H),
        L(B('المتغيرات من JS', 'Variables from JS'),
          B('`element.style.setProperty("--progress", "65%")` بيغيّر متغير، والـ CSS يكمّل الباقي (عرض، لون، حركة). ده أنضف من تعديل 5 خصائص من JS — والمنطق يفضل في CSS.', '`element.style.setProperty("--progress", "65%")` changes a variable and CSS does the rest (width, colour, motion). Cleaner than changing 5 properties from JS — and the logic stays in CSS.'),
          '<style>\n  .bar { --progress: 0%; height: 14px; border-radius: 99px; background: #e5e9ee; overflow: hidden; max-width: 360px; font-family: system-ui; }\n  .bar::after { content: ""; display: block; height: 100%; width: var(--progress); background: #0a7d32; transition: width .4s ease; }\n</style>\n<p>Orders synced: <output id="pct">0%</output></p>\n<div class="bar" id="bar"></div>\n<button id="step">+ 15%</button>\n<script>\n  let p = 0;\n  document.getElementById("step").onclick = () => {\n    p = Math.min(100, p + 15);\n    document.getElementById("bar").style.setProperty("--progress", p + "%");\n    document.getElementById("pct").textContent = p + "%";\n  };\n</script>', H)
      ],
      practice: [
        B('حوّل ألوان ومسافات مشروع لـ tokens.', 'Turn a project’s colours and spacing into tokens.'),
        B('اعمل ثيم غامق بـ light-dark().', 'Build a dark theme with light-dark().'),
        B('اعمل 3 درجات من لون بـ color-mix().', 'Make 3 shades of one colour with color-mix().'),
        B('اعمل progress bar بمتغير من JS.', 'Build a progress bar driven by a variable from JS.')
      ],
      words: [
        W('css variable', 'قيمة بتتعرّف مرة وتتستخدم في CSS', 'a value defined once and reused in CSS', 'Store the brand colour in a CSS variable.'),
        W('design token', 'قرار تصميم باسم ثابت', 'a named design decision', '--radius is a design token.'),
        W('light-dark()', 'دالة لون حسب الثيم', 'a colour function based on the theme', 'light-dark() picks the background.'),
        W('oklch', 'نظام ألوان بإضاءة منتظمة', 'a colour space with even lightness', 'Define the brand in oklch.'),
        W('color-mix()', 'خلط لونين في CSS', 'mixing two colours in CSS', 'color-mix() makes a soft badge.'),
        W('setproperty', 'تغيير خاصية أو متغير CSS من JS', 'changing a CSS property or variable from JS', 'setProperty updates --progress.')
      ],
      read: [{ t: 'MDN: Using CSS custom properties', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties', what: B('اقرا Inheritance.', 'Read Inheritance.') }, { t: 'MDN: light-dark()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark', what: B('اقرا المثال.', 'Read the example.') }],
      challenge: B('اعمل ملف `tokens.css` لمشروع الشهر التالت (ألوان oklch، مسافات، أنصاف أقطار، ظلال) بثيم فاتح وغامق وزرار تبديل بيتحفظ — ومفيش ولا لون مكتوب برة الـ tokens.', 'Write a `tokens.css` for the month 3 project (oklch colours, spacing, radii, shadows) with light and dark themes and a saved toggle — and not one colour written outside the tokens.'),
      quiz: [
        Q(B('متغير على .danger:', 'A variable on .danger:'), [['يأثر على العنصر وأولاده بس', 'affects that element and its children only'], ['يأثر على الموقع كله', 'affects the whole site'], ['خطأ', 'an error']], 0, B('وراثة.', 'Inheritance.')),
        Q(B('لون حسب ثيم المستخدم في سطر:', 'A colour by the user’s theme in one line:'), ['light-dark()', 'rgba()', 'calc()'], 0, B('color-scheme.', 'color-scheme.')),
        Q(B('من JS تغيّر:', 'From JS you change:'), [['متغير واحد والـ CSS يكمّل', 'one variable and CSS does the rest'], ['5 خصائص', '5 properties'], ['ملف CSS', 'the CSS file']], 0, B('setProperty.', 'setProperty.'))
      ] },

    { title: B('محددات وcascade حديثين', 'Modern selectors and cascade'),
      goal: B('تكتب محددات أقوى وتتحكم في مين يكسب.', 'Write stronger selectors and control who wins.'),
      learn: [
        L(B(':has()', ':has()'),
          B('**:has()** = «parent selector» اللي الكل كان عايزه: `.card:has(.badge-urgent)` = الكارت **اللي جواه** شارة عاجل. `form:has(:invalid)` = فورم فيه خانة غلط. `label:has(input:checked)`. حاجات كانت محتاجة JS بقت سطر CSS.', '**:has()** = the «parent selector» everyone wanted: `.card:has(.badge-urgent)` = the card **that contains** an urgent badge. `form:has(:invalid)` = a form with an invalid field. `label:has(input:checked)`. Things that needed JS are now one CSS line.'),
          '<style>\n  body { font-family: system-ui; }\n  .card { border: 1px solid #dde3ea; border-radius: 10px; padding: 10px; margin: 8px 0; max-width: 340px; }\n  .card:has(.urgent) { border-color: #b42318; background: #fff4f2; }\n  label { display: block; padding: 6px; border-radius: 8px; }\n  label:has(input:checked) { background: #e8f5ec; font-weight: 600; }\n  form:has(input:invalid) button { opacity: .4; pointer-events: none; }\n</style>\n<div class="card">Order #1 — normal</div>\n<div class="card">Order #2 — <span class="urgent">urgent</span></div>\n<form>\n  <label><input type="checkbox"> Gift wrap</label>\n  <label><input type="checkbox" checked> Express delivery</label>\n  <input type="email" placeholder="email" required> <button>Send</button>\n</form>', H),
        L(B(':is() و:where() والـ specificity', ':is(), :where() and specificity'),
          B('`:is(h1, h2, h3) a` بيختصر قوائم طويلة. **:where()** نفس الفكرة بس specificity بتاعته **صفر** — مثالي للأنماط الأساسية اللي عايز أي حد يغيّرها بسهولة. و`:is()` بياخد specificity أقوى عنصر جواه.', '`:is(h1, h2, h3) a` shortens long lists. **:where()** is the same idea with **zero** specificity — perfect for base styles anyone should override easily. And `:is()` takes the specificity of its strongest item.'),
          ':is(h1, h2, h3):hover { color: var(--brand); }        /* one rule instead of three */\n:where(ul, ol)[role="list"] { list-style: none; padding: 0; }   /* specificity 0,0,0 → easy to override */\n.menu { padding: 8px; }                                 /* wins over the :where() rule above */', C),
        L(B('nesting وcascade layers', 'Nesting and cascade layers'),
          B('**nesting** في CSS نفسه (من غير Sass): `.card { & h3 {…} &:hover {…} }`. و**cascade layers** (`@layer reset, base, components, utilities;`) بتحدد الترتيب: أي حاجة في طبقة متأخرة بتكسب بغض النظر عن الـ specificity — نهاية حروب `!important`.', '**nesting** in CSS itself (no Sass): `.card { & h3 {…} &:hover {…} }`. And **cascade layers** (`@layer reset, base, components, utilities;`) set the order: anything in a later layer wins regardless of specificity — the end of `!important` wars.'),
          '<style>\n  @layer base, components, utilities;\n  @layer base { body { font-family: system-ui; } #app .title { color: #444; } }\n  @layer components {\n    .card {\n      border: 1px solid #dde3ea; border-radius: 10px; padding: 10px; max-width: 320px;\n      & .title { margin: 0; font-size: 1.1rem; }\n      &:hover { border-color: #0a7d32; }\n      & + & { margin-top: 8px; }\n    }\n  }\n  @layer utilities { .text-brand { color: #0a7d32; } }   /* beats #app .title: a later layer wins */\n</style>\n<div id="app">\n  <div class="card"><h3 class="title text-brand">Layered title</h3></div>\n  <div class="card"><h3 class="title">Base colour</h3></div>\n</div>', H)
      ],
      practice: [
        B('لوّن صف جدول فيه حالة «متأخر» بـ :has().', 'Colour a table row containing a «late» status with :has().'),
        B('اعطّل زرار الإرسال لو الفورم فيه :invalid.', 'Disable the submit button when the form has :invalid.'),
        B('حوّل ملف CSS لـ nesting.', 'Convert a CSS file to nesting.'),
        B('قسّم CSS لـ 4 layers وشيل كل !important.', 'Split CSS into 4 layers and remove every !important.')
      ],
      words: [
        W(':has()', 'محدد بيختار عنصر حسب اللي جواه', 'a selector choosing an element by what it contains', '.card:has(.urgent) turns red.'),
        W(':where()', 'تجميع محددات بـ specificity صفر', 'grouping selectors with zero specificity', ':where() keeps base styles weak.'),
        W(':is()', 'تجميع محددات بأقوى specificity', 'grouping selectors with the strongest specificity', ':is(h1, h2) saves repetition.'),
        W('nesting', 'كتابة قواعد جوه قواعد', 'writing rules inside rules', 'Native nesting needs no Sass.'),
        W('cascade layers', 'طبقات بتحدد مين يكسب', 'layers deciding which rules win', 'Cascade layers ended the !important war.'),
        W('@layer', 'تعريف طبقة CSS', 'declaring a CSS layer', '@layer utilities comes last.')
      ],
      read: [{ t: 'MDN: :has()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has', what: B('اقرا الأمثلة.', 'Read the examples.') }, { t: 'MDN: Cascade layers', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers', what: B('اقرا الشرح.', 'Read the explanation.') }],
      challenge: B('أعد كتابة CSS مشروع الشهر التالت بـ @layer (reset، base، components، utilities) وnesting و:has() بدل 3 أماكن كنت بتستخدم فيها JS — ومن غير ولا !important.', 'Rewrite the month 3 project’s CSS with @layer (reset, base, components, utilities), nesting, and :has() in 3 places where you used JS — with no !important.'),
      quiz: [
        Q(B('اختيار الكارت اللي فيه صورة:', 'Selecting a card that contains an image:'), ['.card:has(img)', '.card img', 'img < .card'], 0, B('parent.', 'Parent.')),
        Q(B('specificity لـ :where(.a):', 'The specificity of :where(.a):'), ['0', B('زي .a', 'same as .a'), B('أعلى', 'higher')], 0, B('صفر.', 'Zero.')),
        Q(B('قاعدة في طبقة متأخرة:', 'A rule in a later layer:'), [['تكسب حتى لو أضعف', 'wins even if weaker'], ['تخسر دايمًا', 'always loses'], ['مالهاش تأثير', 'has no effect']], 0, B('ترتيب الطبقات.', 'Layer order.'))
      ] },

    { title: B('تجاوب ذكي', 'Smart responsiveness'),
      goal: B('تصميم بيتكيّف لوحده بأقل media queries.', 'Design that adapts by itself with few media queries.'),
      learn: [
        L(B('clamp() للخطوط والمسافات', 'clamp() for type and spacing'),
          B('**clamp()** `clamp(1rem, 2.5vw + .5rem, 2rem)` = حجم بيكبر مع الشاشة بس بين حد أدنى وأقصى — **fluid typography** من غير ولا media query. نفس الكلام للمسافات والعرض.', '**clamp()** `clamp(1rem, 2.5vw + .5rem, 2rem)` = a size that grows with the screen but stays between a minimum and maximum — **fluid typography** without a single media query. The same works for spacing and widths.'),
          '<style>\n  body { font-family: system-ui; margin: 0; }\n  .hero { padding: clamp(12px, 5vw, 48px); background: #f3f7f4; }\n  .hero h1 { font-size: clamp(1.4rem, 4vw + .5rem, 3rem); margin: 0 0 .3em; line-height: 1.15; }\n  .hero p { font-size: clamp(.95rem, 1vw + .7rem, 1.25rem); max-width: 60ch; margin: 0; }\n</style>\n<section class="hero"><h1>Automate your orders</h1><p>Resize the preview: the heading and padding grow smoothly between a minimum and a maximum, with no media queries.</p></section>', H),
        L(B('container queries', 'Container queries'),
          B('media queries بتسأل عن **الشاشة**؛ **container query** بيسأل عن **المكان اللي العنصر فيه**. نفس الكارت يبقى أفقي في عمود واسع ورأسي في sidebar ضيق — مكوّن بيتكيّف لوحده في أي مكان. `container-type: inline-size` على الأب، و`@container (width > 420px)`.', 'Media queries ask about the **screen**; a **container query** asks about **the space the element sits in**. The same card is horizontal in a wide column and vertical in a narrow sidebar — a component that adapts anywhere. `container-type: inline-size` on the parent, and `@container (width > 420px)`.'),
          '<style>\n  body { font-family: system-ui; }\n  .slot { container-type: inline-size; border: 1px dashed #c8d0d8; margin: 8px 0; padding: 6px; }\n  .wide { width: 520px; max-width: 100%; } .narrow { width: 220px; }\n  .product { display: grid; gap: 8px; }\n  .product .img { aspect-ratio: 4 / 3; background: #dfe9e2; border-radius: 8px; }\n  @container (width > 420px) { .product { grid-template-columns: 160px 1fr; align-items: center; } }\n</style>\n<div class="slot wide"><div class="product"><div class="img"></div><div><b>Notebook A5</b><br>45 EGP · in stock</div></div></div>\n<div class="slot narrow"><div class="product"><div class="img"></div><div><b>Notebook A5</b><br>45 EGP · in stock</div></div></div>', H),
        L(B('aspect-ratio وsubgrid', 'aspect-ratio and subgrid'),
          B('**aspect-ratio** بيحجز مكان الصورة أو الفيديو قبل ما يتحمّل (مفيش قفزات = CLS أقل). و**subgrid** بيخلّي عناصر جوه الكروت تلتزم بأعمدة الـ grid الأب — كل العناوين والأسعار في نفس الخط مهما اختلف طول النص.', '**aspect-ratio** reserves space for an image or video before it loads (no jumps = less CLS). And **subgrid** lets items inside cards follow the parent grid’s tracks — every title and price on the same line however long the text.'),
          '<style>\n  body { font-family: system-ui; }\n  .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 160px)); gap: 10px; }\n  .card { display: grid; grid-row: span 3; grid-template-rows: subgrid; border: 1px solid #dde3ea; border-radius: 10px; padding: 8px; }\n  .card .img { aspect-ratio: 1; background: #e8eef3; border-radius: 6px; }\n  .card .price { align-self: end; color: #0a7d32; font-weight: 700; }\n</style>\n<div class="grid">\n  <div class="card"><div class="img"></div><b>Pen</b><span class="price">12.5</span></div>\n  <div class="card"><div class="img"></div><b>Notebook A5 with a much longer product name</b><span class="price">45</span></div>\n  <div class="card"><div class="img"></div><b>Bag</b><span class="price">650</span></div>\n</div>', H)
      ],
      practice: [
        B('حوّل 3 media queries للخطوط لـ clamp().', 'Replace 3 font media queries with clamp().'),
        B('اعمل كارت منتج بـ container query.', 'Build a product card with a container query.'),
        B('ضيف aspect-ratio لكل الصور.', 'Add aspect-ratio to every image.'),
        B('خلّي أسعار الكروت على خط واحد بـ subgrid.', 'Align card prices on one line with subgrid.')
      ],
      words: [
        W('clamp()', 'قيمة بين حد أدنى وأقصى', 'a value between a minimum and a maximum', 'clamp() sizes the heading.'),
        W('fluid typography', 'خطوط بتكبر بسلاسة مع الشاشة', 'type that scales smoothly with the screen', 'Fluid typography needs no breakpoints.'),
        W('container query', 'شرط على مقاس الحاوية', 'a condition on the container’s size', 'The card uses a container query.'),
        W('aspect-ratio', 'نسبة العرض للارتفاع', 'the width-to-height ratio', 'aspect-ratio reserves the image space.'),
        W('subgrid', 'grid داخلي بيتبع أعمدة الأب', 'an inner grid following the parent’s tracks', 'subgrid aligns the prices.')
      ],
      read: [{ t: 'MDN: CSS container queries', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries', what: B('اقرا Using container size queries.', 'Read Using container size queries.') }, { lib: 'web.dev: Learn CSS', what: B('اقرا Sizing Units وGrid.', 'Read Sizing Units and Grid.') }],
      challenge: B('اعمل مكوّن «كارت طلب» واحد بيتعرض صح في 3 أماكن (لوحة واسعة، sidebar، موبايل) بـ container queries وclamp() وaspect-ratio — من غير media queries.', 'Build one «order card» component that displays well in 3 places (a wide dashboard, a sidebar, mobile) with container queries, clamp() and aspect-ratio — with no media queries.'),
      quiz: [
        Q(B('clamp(1rem, 3vw, 2rem):', 'clamp(1rem, 3vw, 2rem):'), [['بين 1 و2 rem', 'between 1 and 2 rem'], ['3vw دايمًا', 'always 3vw'], ['2rem دايمًا', 'always 2rem']], 0, B('حدود.', 'Bounds.')),
        Q(B('كارت في sidebar ضيق:', 'A card in a narrow sidebar:'), ['container query', 'media query', 'JS resize'], 0, B('مقاس المكان.', 'The space’s size.')),
        Q(B('مكان الصورة محجوز قبل التحميل:', 'Reserving an image’s space before load:'), ['aspect-ratio', 'z-index', 'opacity'], 0, B('CLS.', 'CLS.'))
      ] },

    { title: B('الحركة', 'Motion'),
      goal: B('حركة بتوضّح ومش بتزعج ومش بتبطّأ.', 'Motion that clarifies, never annoys or slows down.'),
      learn: [
        L(B('transitions', 'Transitions'),
          B('**transition** = انتقال سلس بين حالتين (hover، فتح، اختيار). حدد الخاصية والمدة و**easing** (`ease-out` للدخول). حرّك **transform** و**opacity** بس — دول بيشتغلوا على كارت الشاشة وسلسين؛ تحريك width أو top بيعيد حساب الصفحة ويقطّع.', 'A **transition** = a smooth change between two states (hover, open, selected). Set the property, duration and **easing** (`ease-out` for entering). Animate only **transform** and **opacity** — they run on the GPU and stay smooth; animating width or top recalculates the page and stutters.'),
          '<style>\n  body { font-family: system-ui; }\n  .btn { padding: 10px 16px; border: 0; border-radius: 10px; background: #0a7d32; color: #fff;\n         transition: transform .15s ease-out, box-shadow .15s ease-out; }\n  .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 16px #0a7d3244; }\n  .btn:active { transform: translateY(0) scale(.98); }\n  .toast { margin-top: 12px; padding: 10px; background: #1b1f24; color: #fff; border-radius: 10px; max-width: 280px;\n           opacity: 0; transform: translateY(8px); transition: opacity .25s ease-out, transform .25s ease-out; }\n  .toast.show { opacity: 1; transform: none; }\n</style>\n<button class="btn" onclick="document.querySelector(\'.toast\').classList.toggle(\'show\')">Save order</button>\n<div class="toast" role="status">✓ Order saved</div>', H),
        L(B('keyframes', 'Keyframes'),
          B('**keyframes** للحركة اللي ليها خطوات أو بتتكرر: مؤشر تحميل، skeleton، نبضة إشعار. `@keyframes` + **animation** (`animation: spin 1s linear infinite`). وخلّيها هادية: الحركة المستمرة بتشتت.', '**keyframes** for motion with steps or repetition: a loading spinner, a skeleton, a notification pulse. `@keyframes` + **animation** (`animation: spin 1s linear infinite`). Keep it calm: constant motion distracts.'),
          '<style>\n  body { font-family: system-ui; }\n  .spinner { width: 28px; height: 28px; border: 3px solid #dde3ea; border-top-color: #0a7d32; border-radius: 50%; animation: spin .8s linear infinite; }\n  @keyframes spin { to { transform: rotate(1turn); } }\n  .skeleton { height: 14px; width: 240px; margin: 8px 0; border-radius: 6px;\n              background: linear-gradient(90deg, #eef1f4 25%, #f7f9fa 50%, #eef1f4 75%) 0 0 / 200% 100%; animation: shimmer 1.2s infinite; }\n  @keyframes shimmer { to { background-position: -200% 0; } }\n</style>\n<div class="spinner" role="status" aria-label="Loading"></div>\n<div class="skeleton"></div><div class="skeleton" style="width:180px"></div>', H),
        L(B('احترم المستخدم', 'Respect the user'),
          B('ناس كتير الحركة بتتعبهم (دوخة). **prefers-reduced-motion** بيقولك المستخدم طلب حركة أقل — وقّف الحركات الكبيرة والمستمرة وسيب تغييرات بسيطة. و**view transition** (`document.startViewTransition`) بيعمل انتقال سلس بين حالتين للصفحة بسطر JS.', 'Motion makes many people unwell (dizziness). **prefers-reduced-motion** tells you the user asked for less motion — stop large and continuous animations and keep simple changes. And a **view transition** (`document.startViewTransition`) makes a smooth change between two page states with one line of JS.'),
          '@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after {\n    animation-duration: .01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: .01ms !important;\n    scroll-behavior: auto !important;\n  }\n}\n/* JS: if (document.startViewTransition) document.startViewTransition(() => renderList(sorted)); else renderList(sorted); */', C)
      ],
      practice: [
        B('ضيف transition لأزرار مشروعك (transform بس).', 'Add transitions to your project’s buttons (transform only).'),
        B('اعمل skeleton لجدول بيتحمّل.', 'Build a skeleton for a loading table.'),
        B('فعّل Reduce motion في نظامك وجرّب.', 'Turn on Reduce motion in your OS and test.'),
        B('جرّب startViewTransition على ترتيب قايمة.', 'Try startViewTransition when sorting a list.')
      ],
      words: [
        W('transition', 'تغيير سلس بين حالتين', 'a smooth change between two states', 'Add a transition to the toast.'),
        W('easing', 'منحنى سرعة الحركة', 'the speed curve of motion', 'Use ease-out easing for entering.'),
        W('keyframes', 'خطوات حركة متعرفة بالاسم', 'named steps of an animation', '@keyframes spin rotates the icon.'),
        W('animation', 'تشغيل keyframes على عنصر', 'running keyframes on an element', 'The animation loops forever.'),
        W('prefers-reduced-motion', 'تفضيل المستخدم لحركة أقل', 'the user’s preference for less motion', 'Honour prefers-reduced-motion.'),
        W('view transition', 'انتقال سلس بين حالتين للصفحة', 'a smooth change between two page states', 'A view transition animates the sort.')
      ],
      read: [{ t: 'web.dev: Animations', url: 'https://web.dev/learn/css/animations', what: B('اقرا الوحدة.', 'Read the module.') }, { t: 'MDN: prefers-reduced-motion', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion', what: B('اقرا User preferences.', 'Read User preferences.') }],
      challenge: B('ضيف لمشروعك: toast بيدخل ويطلع، skeleton للتحميل، hover للأزرار، view transition للترتيب — كلهم transform/opacity بس، ومحترمين prefers-reduced-motion.', 'Add to your project: an entering and leaving toast, a loading skeleton, button hovers, and a view transition for sorting — all transform/opacity only, honouring prefers-reduced-motion.'),
      quiz: [
        Q(B('أسلس خصائص للحركة:', 'The smoothest properties to animate:'), ['transform / opacity', 'width / top', 'margin / padding'], 0, B('GPU.', 'GPU.')),
        Q(B('مؤشر تحميل بيلف:', 'A spinning loader:'), ['@keyframes + animation', 'transition', ':has()'], 0, B('متكرر.', 'Repeating.')),
        Q(B('prefers-reduced-motion: reduce:', 'prefers-reduced-motion: reduce:'), [['قلّل الحركة', 'reduce motion'], ['زوّدها', 'add motion'], ['تجاهله', 'ignore it']], 0, B('احترام.', 'Respect.'))
      ] },

    { title: B('هيكلة CSS والطباعة', 'CSS architecture and printing'),
      goal: B('CSS بيكبر من غير ما يبوظ، وصفحات بتتطبع صح.', 'CSS that grows without breaking, and pages that print properly.'),
      learn: [
        L(B('هيكل يكبر', 'A structure that scales'),
          B('tokens (متغيرات) ← layers (ترتيب) ← components (`.card`، `.btn`، `.table` كل واحد ملفه) ← utilities قليلة (`.visually-hidden`، `.stack`). وأسماء classes بتقول **إيه** مش **شكله** (`.order-status` مش `.green-text`). كده تغيّر الشكل من غير ما تلمس الـ HTML.', 'tokens (variables) → layers (order) → components (`.card`, `.btn`, `.table`, each in its own file) → a few utilities (`.visually-hidden`, `.stack`). And class names say **what**, not **how it looks** (`.order-status`, not `.green-text`). Then you change the look without touching the HTML.'),
          'css/\n  tokens.css        :root { --brand…; --space-1…; --radius… }  + dark theme\n  layers.css        @layer reset, base, components, utilities;\n  base.css          @layer base { body, a, headings, forms }\n  components/       card.css · button.css · table.css · toast.css  (each @layer components)\n  utilities.css     @layer utilities { .visually-hidden, .stack, .cluster }', T),
        L(B('CSS للطباعة', 'CSS for print'),
          B('الفواتير والتقارير بتتطبع (أو تتحوّل PDF — أسبوع 19). `@media print`: اخفي القوائم والأزرار، ألوان سودا على أبيض، روابط بعنوانها. و`@page` بيحدد مقاس الورق والهوامش، و`break-inside: avoid` بيمنع صف جدول يتقسم بين صفحتين.', 'Invoices and reports get printed (or turned into PDF — week 19). `@media print`: hide menus and buttons, black on white, links with their URL. `@page` sets paper size and margins, and `break-inside: avoid` stops a table row splitting across pages.'),
          '@page { size: A4; margin: 16mm 14mm; }\n@media print {\n  nav, .btn, .toast, footer { display: none !important; }\n  body { background: #fff; color: #000; font-size: 11pt; }\n  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 9pt; }\n  table { width: 100%; border-collapse: collapse; }\n  tr, .invoice-total { break-inside: avoid; }\n  thead { display: table-header-group; }        /* repeat the header on every page */\n}', C),
        L(B('RTL والاتجاهين', 'RTL and both directions'),
          B('موقع بالعربي والإنجليزي: استخدم الخصائص المنطقية (`margin-inline-start` و`padding-inline` و`inset-inline-end`) بدل left/right — نفس الـ CSS يشتغل في الاتجاهين بـ `dir`. وللأيقونات اللي ليها اتجاه (سهم «التالي»): `:dir(rtl) .icon-next { transform: scaleX(-1); }`.', 'A site in Arabic and English: use logical properties (`margin-inline-start`, `padding-inline`, `inset-inline-end`) instead of left/right — the same CSS works both ways via `dir`. For directional icons (a «next» arrow): `:dir(rtl) .icon-next { transform: scaleX(-1); }`.'),
          '<style>\n  body { font-family: system-ui; }\n  .item { display: flex; gap: 8px; align-items: center; border-inline-start: 4px solid #0a7d32; padding-inline: 10px; margin-block: 6px; max-width: 300px; }\n  .item .next { margin-inline-start: auto; }\n  :dir(rtl) .item .next { transform: scaleX(-1); }\n</style>\n<div dir="ltr"><div class="item">Order #1042 <span class="next">➜</span></div></div>\n<div dir="rtl"><div class="item">طلب رقم ١٠٤٢ <span class="next">➜</span></div></div>', H)
      ],
      practice: [
        B('قسّم CSS مشروعك لملفات بالهيكل ده.', 'Split your project’s CSS into this structure.'),
        B('اعمل CSS طباعة لفاتورة واطبعها PDF.', 'Write print CSS for an invoice and print it to PDF.'),
        B('بدّل كل left/right بخصائص منطقية.', 'Replace every left/right with logical properties.'),
        B('اقلب سهم «التالي» في RTL.', 'Flip the «next» arrow in RTL.')
      ],
      words: [
        W('@media print', 'قواعد CSS للطباعة', 'CSS rules for printing', '@media print hides the menu.'),
        W('@page', 'إعدادات صفحة الطباعة', 'print page settings', '@page sets A4 margins.'),
        W('break-inside', 'منع تقسيم عنصر بين صفحتين', 'preventing an element splitting across pages', 'break-inside: avoid keeps rows whole.'),
        W(':dir()', 'محدد حسب اتجاه النص', 'a selector by text direction', ':dir(rtl) flips the icon.'),
        W('utility class', 'class صغير بوظيفة واحدة', 'a small single-purpose class', '.visually-hidden is a utility class.')
      ],
      read: [{ t: 'MDN: Printing', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing', what: B('اقرا Detecting print requests.', 'Read Detecting print requests.') }, { lib: 'Every Layout', what: B('اقرا Stack وCluster.', 'Read Stack and Cluster.') }],
      challenge: B('اعمل صفحة فاتورة عربي/إنجليزي واحدة: tokens، layers، خصائص منطقية تشتغل في الاتجاهين، وCSS طباعة A4 برأس جدول متكرر — واطبعها PDF بالعربي والإنجليزي.', 'Build one Arabic/English invoice page: tokens, layers, logical properties working both ways, and A4 print CSS with a repeating table header — then print it to PDF in Arabic and English.'),
      quiz: [
        Q(B('اسم class كويس:', 'A good class name:'), ['.order-status', '.green-bold', '.mt-17'], 0, B('معنى.', 'Meaning.')),
        Q(B('رأس الجدول في كل صفحة مطبوعة:', 'The table header on every printed page:'), ['thead { display: table-header-group }', 'position: fixed', 'z-index'], 0, B('طباعة.', 'Printing.')),
        Q(B('CSS يشتغل RTL وLTR:', 'CSS that works in RTL and LTR:'), [['خصائص منطقية', 'logical properties'], ['left/right', 'left/right'], ['ملفين', 'two files']], 0, B('inline.', 'Inline.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('نظام تصميم صغير بـ CSS حديث.', 'A small design system in modern CSS.'),
      review: [
        B('المتغيرات وdesign tokens والثيمات وlight-dark وoklch وcolor-mix.', 'Variables, design tokens, themes, light-dark, oklch and color-mix.'),
        B(':has() و:is() و:where() والـ nesting والـ cascade layers.', ':has(), :is(), :where(), nesting and cascade layers.'),
        B('clamp() وcontainer queries وaspect-ratio وsubgrid.', 'clamp(), container queries, aspect-ratio and subgrid.'),
        B('transitions وkeyframes وtransform/opacity وreduced motion وview transitions.', 'Transitions, keyframes, transform/opacity, reduced motion and view transitions.'),
        B('هيكلة CSS، والطباعة، والخصائص المنطقية للاتجاهين.', 'CSS architecture, printing and logical properties for both directions.')
      ],
      project: B('ابني «نظام تصميم» صغير لأدواتك: tokens.css (ألوان oklch، مسافات، خطوط clamp، ثيم فاتح وغامق)، @layer، مكوّنات (button، card بـ container query، table بطباعة، toast بحركة، badge بـ color-mix، form بـ :has(:invalid))، خصائص منطقية للعربي والإنجليزي، reduced motion — وصفحة عرض فيها كل مكوّن بحالاته (زي Storybook صغير).', 'Build a small «design system» for your tools: tokens.css (oklch colours, spacing, clamp type, light and dark themes), @layer, components (button, a card with a container query, a printable table, an animated toast, a color-mix badge, a form with :has(:invalid)), logical properties for Arabic and English, reduced motion — and a showcase page with every component in each state (a mini Storybook).'),
      test: [
        Q(B('--brand على :root:', '--brand on :root:'), [['متاح للموقع كله', 'available to the whole site'], ['لعنصر واحد', 'for one element'], ['خطأ', 'an error']], 0, B('وراثة.', 'Inheritance.')),
        Q(B('design token:', 'A design token:'), [['قرار تصميم باسم', 'a named design decision'], ['class', 'a class'], ['ملف صور', 'an image file']], 0, B('مكان واحد.', 'One place.')),
        Q(B('درجة أفتح من لون:', 'A lighter shade of a colour:'), ['color-mix()', B('opacity على الصفحة', 'page opacity'), 'filter'], 0, B('خلط.', 'Mixing.')),
        Q(B('.row:has(.late):', '.row:has(.late):'), [['الصف اللي جواه .late', 'the row containing .late'], ['.late نفسه', '.late itself'], ['كل الصفوف', 'every row']], 0, B('parent.', 'Parent.')),
        Q(B('نهاية حروب !important:', 'The end of !important wars:'), ['@layer', 'z-index', ':root'], 0, B('ترتيب.', 'Order.')),
        Q(B('& جوه .card { }:', '& inside .card { }:'), [['nesting', 'nesting'], ['خطأ', 'an error'], ['Sass بس', 'Sass only']], 0, B('CSS نفسه.', 'Native CSS.')),
        Q(B('خط بيكبر بين حدين:', 'Type growing between two limits:'), ['clamp()', 'calc()', 'min()'], 0, B('fluid.', 'Fluid.')),
        Q(B('مكوّن بيتكيّف مع مكانه:', 'A component adapting to its slot:'), ['container query', 'media query', 'iframe'], 0, B('الحاوية.', 'The container.')),
        Q(B('حركة سلسة:', 'Smooth motion:'), ['transform / opacity', 'left / width', 'margin'], 0, B('GPU.', 'GPU.')),
        Q(B('مستخدم طلب حركة أقل:', 'A user asked for less motion:'), ['prefers-reduced-motion', 'prefers-color-scheme', 'print'], 0, B('احترام.', 'Respect.')),
        Q(B('صف جدول ميتقسمش في الطباعة:', 'A table row that never splits in print:'), ['break-inside: avoid', 'overflow: hidden', 'display: none'], 0, B('طباعة.', 'Printing.')),
        Q(B('margin-inline-start في RTL:', 'margin-inline-start in RTL:'), [['يمين', 'the right side'], ['شمال', 'the left side'], ['فوق', 'the top']], 0, B('منطقي.', 'Logical.'))
      ] }
  ]
};
