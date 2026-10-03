// JavaScript week 10 — CSS basics: selectors, the box model and fonts.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('أساسيات CSS: المحددات والـ Box model والخطوط', 'CSS basics: selectors, the box model and fonts'),
  goal: B('تشكّل الصفحات بـ CSS: تربطه صح، وتختار العناصر بالمحددات، وتفهم الـ cascade والـ specificity، وتتحكم في الـ box model والمقاسات والألوان والخلفيات والحدود والخطوط والنصوص — بالعربي والإنجليزي.',
          'Style pages with CSS: link it properly, select elements with selectors, understand the cascade and specificity, and control the box model, sizes, colours, backgrounds, borders, fonts and text — in Arabic and English.'),
  days: [
    { title: B('CSS: ربطه وقواعده والمحددات الأساسية', 'CSS: linking it, its rules and the basic selectors'),
      goal: B('تكتب قواعد CSS صح وتربطها بالصفحة، وتختار العناصر بالنوع والكلاس والـ id والخصايص.', 'Write correct CSS rules and link them to the page, and select elements by type, class, id and attribute.'),
      learn: [
        { h: B('قاعدة CSS', 'A CSS rule'),
          p: B('CSS بيقول **شكل** المحتوى. القاعدة: **محدد** (مين) + `{ خاصية: قيمة; }` (إيه): `h1 { color: #1f6f4a; font-size: 32px; }`. كل سطر **declaration** بيخلص بـ `;`. HTML للمعنى وCSS للشكل — متحطش الشكل في HTML (زي `<font>` أو `<b>` عشان التخانة بس). التعليق في CSS: `/* ... */`.',
            'CSS says how content **looks**. A rule: a **selector** (who) + `{ property: value; }` (what): `h1 { color: #1f6f4a; font-size: 32px; }`. Each line is a **declaration** ending in `;`. HTML is for meaning and CSS for looks — never put looks in HTML (such as `<font>`, or `<b>` just for boldness). A CSS comment: `/* ... */`.'),
          ex: '<style>\n  /* every h1 on the page */\n  h1 { color: #1f6f4a; font-size: 28px; margin-bottom: 4px; }\n  p { color: #374151; line-height: 1.7; }\n</style>\n<h1>Nile Store</h1>\n<p>Office supplies at wholesale prices, delivered to every governorate.</p>', run: 'html' },
        { h: B('3 طرق تربط CSS', 'Three ways to add CSS'),
          p: B('(1) **ملف خارجي**: `<link rel="stylesheet" href="style.css">` في head — الأحسن: ملف واحد لكل الصفحات، والمتصفح بيخزّنه. (2) **داخلي**: `<style>` في head — لصفحة واحدة أو تجربة. (3) **inline**: `style="color:red"` على العنصر — تجنّبه غير لقيم بتتحسب بـ JS، لأنه بيكسب كل حاجة وصعب يتغيّر.',
            '(1) **External file**: `<link rel="stylesheet" href="style.css">` in the head — the best: one file for every page, cached by the browser. (2) **Internal**: `<style>` in the head — for a single page or a test. (3) **Inline**: `style="color:red"` on the element — avoid it except for values computed by JS, because it beats everything and is hard to change.'),
          ex: '<style>\n  .note { background: #ecfdf5; border-inline-start: 4px solid #10b981; padding: 8px 12px; }\n</style>\n<p class="note">Styled by the internal &lt;style&gt; block.</p>\n<p style="color:#b91c1c">Styled inline — hard to override later.</p>', run: 'html' },
        { h: B('النوع والكلاس والـ id', 'Type, class and id'),
          p: B('**النوع** `p` كل الفقرات. **الكلاس** `.price` أي عنصر عليه `class="price"` — **ده اللي هتستخدمه أغلب الوقت**؛ والعنصر ممكن ياخد كذا كلاس: `class="card featured"`. **الـ id** `#total` عنصر واحد بس فريد — استخدمه للروابط والـ JS أكتر من التنسيق. وأسماء الكلاسات بتوصف المعنى: `.price-old` مش `.red-text`.',
            '**Type** `p` targets every paragraph. **Class** `.price` targets any element with `class="price"` — **what you will use most**; an element may take several: `class="card featured"`. **Id** `#total` targets one unique element — use it for links and JS more than styling. And class names describe meaning: `.price-old`, not `.red-text`.'),
          ex: '<style>\n  .price { font-weight: 700; color: #065f46; }\n  .price-old { text-decoration: line-through; color: #9ca3af; }\n  .card { border: 1px solid #e5e7eb; padding: 10px; border-radius: 8px; margin: 6px 0; }\n  .featured { border-color: #f59e0b; background: #fffbeb; }\n  #total { font-size: 20px; }\n</style>\n<div class="card"><span class="price-old">60 EGP</span> <span class="price">45 EGP</span></div>\n<div class="card featured">Best seller · <span class="price">650 EGP</span></div>\n<p id="total">Total: 695 EGP</p>', run: 'html' },
        { h: B('محددات الخصايص والكل', 'Attribute and universal selectors'),
          p: B('`[type="email"]` العناصر اللي الخاصية دي عندها القيمة دي، و`[required]` أي حد عنده الخاصية، و`a[href^="https"]` الروابط اللي بتبدأ بـ https، و`a[href$=".pdf"]` اللي بتخلص بـ .pdf. و`*` كل العناصر (للضبط العام زي box-sizing). وتقدر تجمع: `input[type="email"]:focus`.',
            '`[type="email"]` targets elements whose attribute has that value, `[required]` anything with the attribute, `a[href^="https"]` links starting with https, and `a[href$=".pdf"]` those ending in .pdf. And `*` targets every element (for global settings like box-sizing). You can combine: `input[type="email"]:focus`.'),
          ex: '<style>\n  a[href$=".pdf"]::after { content: " (PDF)"; color: #b91c1c; font-size: 12px; }\n  a[href^="mailto:"] { color: #7c3aed; }\n  input[required] { border: 2px solid #f59e0b; }\n</style>\n<p><a href="price-list.pdf">Price list</a> · <a href="mailto:help@nile.example">Email us</a></p>\n<p><input placeholder="optional"> <input required placeholder="required"></p>', run: 'html' },
        { h: B('التجميع والتركيب', 'Grouping and combining'),
          p: B('`h1, h2, h3 { font-family: Cairo; }` قاعدة واحدة لكذا محدد (بفاصلة). `.card h3` (مسافة) أي h3 **جوه** card. `.menu > li` الأبناء **المباشرين** بس. `h2 + p` الفقرة اللي **بعد** h2 على طول. و`.btn.primary` (من غير مسافة) عنصر عليه الكلاسين مع بعض. خلي المحددات قصيرة — كل ما طولت، صعب تتغيّر.',
            '`h1, h2, h3 { font-family: Cairo; }` is one rule for several selectors (with commas). `.card h3` (a space) targets any h3 **inside** a card. `.menu > li` only the **direct** children. `h2 + p` the paragraph **right after** an h2. And `.btn.primary` (no space) an element with both classes. Keep selectors short — the longer they get, the harder they are to change.'),
          ex: '<style>\n  h2, h3 { font-family: system-ui, sans-serif; color: #1f2937; }\n  .card h3 { margin: 0 0 4px; color: #1f6f4a; }\n  .menu > li { display: inline-block; margin-inline-end: 12px; }\n  h2 + p { font-weight: 600; }\n  .btn.primary { background: #1f6f4a; color: #fff; padding: 6px 12px; border: 0; border-radius: 6px; }\n</style>\n<ul class="menu"><li>Home</li><li>Shop<ul><li>nested (not inline)</li></ul></li></ul>\n<h2>Offers</h2><p>The first paragraph after the h2 is bold.</p><p>The second is not.</p>\n<div class="card"><h3>Card title</h3>Inside a card.</div>\n<button class="btn primary">Order</button> <button class="btn">Cancel</button>', run: 'html' }
      ],
      practice: [
        B('اعمل ملف style.css واربطه بصفحتك واكتب 5 قواعد.', 'Create style.css, link it to your page and write 5 rules.'),
        B('اكتب نفس التنسيق مرة inline ومرة بكلاس وقارن أيهم أسهل يتغيّر.', 'Write the same style once inline and once with a class, and compare which is easier to change.'),
        B('اعمل 4 كلاسات بأسماء بتوصف المعنى لكروت منتجات.', 'Make 4 meaningfully named classes for product cards.'),
        B('ميّز روابط PDF والإيميل والروابط الخارجية بمحددات خصايص.', 'Mark PDF, email and external links with attribute selectors.'),
        B('جرّب 5 محددات مركّبة (مسافة، >، +، فاصلة، كلاسين).', 'Try 5 combined selectors (space, >, +, comma, two classes).'),
        B('افتح DevTools ← Elements واختار عنصر وشوف القواعد اللي عليه في Styles.', 'Open DevTools → Elements, pick an element and see its rules in Styles.')
      ],
      code: [
        { u: B('بداية أي ملف CSS', 'The start of any CSS file'), p: '*, *::before, *::after { box-sizing: border-box; }\nhtml { -webkit-text-size-adjust: 100%; }\nbody { margin: 0; font-family: "Cairo", system-ui, sans-serif; line-height: 1.6; color: #1f2937; background: #fafaf9; }\nimg { max-width: 100%; height: auto; display: block; }\nbutton, input, select, textarea { font: inherit; }', lang: 'css', show: 1 }
      ],
      words: [
        { t: 'CSS', m: B('لغة تحديد شكل صفحات الويب', 'the language deciding how web pages look'), ex: 'h1 { color: green; }' },
        { t: 'selector', m: B('الجزء اللي بيحدد القاعدة على أنهي عناصر', 'the part choosing which elements a rule applies to'), ex: '.price' },
        { t: 'declaration', m: B('خاصية وقيمة جوه قاعدة', 'a property and value inside a rule'), ex: 'color: red;' },
        { t: 'class selector', m: B('محدد بيبدأ بنقطة للعناصر اللي عليها كلاس', 'a selector starting with a dot for elements with a class'), ex: '.card' },
        { t: 'stylesheet', m: B('ملف أو بلوك فيه قواعد CSS', 'a file or block holding CSS rules'), ex: 'style.css' },
        { t: 'descendant selector', m: B('محدد بمسافة: عنصر جوه عنصر', 'a selector with a space: an element inside another'), ex: '.card h3' },
        { t: 'inline style', m: B('تنسيق مكتوب في خاصية style على العنصر', 'styling written in an element’s style attribute'), ex: 'style="color:red"' }
      ],
      read: [{ lib: 'MDN: CSS styling basics', what: B('What is CSS? وGetting started with CSS وBasic CSS selectors.', 'What is CSS?, Getting started with CSS, and Basic CSS selectors.') },
        { lib: 'CSS Diner', what: B('خلّص أول 14 مرحلة.', 'Finish the first 14 levels.') }],
      challenge: B('خد صفحة الهبوط بتاعة الأسبوع اللي فات واعمل لها ملف style.css: ألوان المشروع في 3 كلاسات، وكروت المنتجات، والأسعار القديمة والجديدة، والروابط الخاصة بمحددات الخصايص، والأزرار — من غير ولا style inline، وكل كلاس اسمه بيوصف المعنى.', 'Take last week’s landing page and give it a style.css: the project colours in 3 classes, the product cards, old and new prices, special links via attribute selectors, and the buttons — with no inline style at all, and every class named for its meaning.'),
      quiz: [
        { q: B('محدد الكلاس بيبدأ بـ:', 'A class selector starts with:'), o: ['.', '#', '*'], a: 0, why: B('# للـ id.', '# is for ids.') },
        { q: B('أحسن طريقة تربط CSS لموقع:', 'The best way to add CSS to a site:'), o: [B('ملف خارجي بـ link', 'an external file with link'), B('style inline', 'inline style'), B('في كل عنصر', 'on every element')], a: 0, why: B('ملف واحد لكل الصفحات.', 'One file for every page.') },
        { q: B('`.card h3` بيختار:', '`.card h3` selects:'), o: [B('h3 جوه card', 'an h3 inside a card'), B('card جوه h3', 'a card inside an h3'), B('الاتنين', 'both')], a: 0, why: B('المسافة = جوه.', 'A space means inside.') },
        { q: B('`a[href$=".pdf"]`:', '`a[href$=".pdf"]`:'), o: [B('روابط بتخلص بـ .pdf', 'links ending in .pdf'), B('روابط فيها pdf', 'links containing pdf'), B('روابط بتبدأ بـ pdf', 'links starting with pdf')], a: 0, why: B('$ = آخر.', '$ means ends with.') }
      ] },

    { title: B('الـ cascade والـ specificity والوراثة', 'The cascade, specificity and inheritance'),
      goal: B('تفهم مين بيكسب لما قاعدتين بيتعارضوا، وأنهي خصايص بتتورث، وإزاي تحل «الـ CSS مش بيشتغل» في DevTools.', 'Understand who wins when two rules clash, which properties are inherited, and how to solve «my CSS does not work» in DevTools.'),
      learn: [
        { h: B('الـ cascade: الترتيب', 'The cascade: order'),
          p: B('لو قاعدتين بنفس القوة على نفس العنصر، **اللي بعد في الملف بيكسب**. ده معنى «Cascading». عشان كده ترتيب الملفات والقواعد مهم: القواعد العامة الأول (body، العناوين)، وبعدين المكوّنات (card، btn)، وبعدين الاستثناءات. وملف CSS المكتبة يتحط **قبل** ملفك عشان تقدر تغيّر عليه.',
            'When two rules of equal strength target the same element, **the later one in the file wins**. That is what «Cascading» means. So the order of files and rules matters: general rules first (body, headings), then components (card, btn), then exceptions. And a library’s CSS goes **before** yours, so you can override it.'),
          ex: '<style>\n  p { color: #1d4ed8; }\n  p { color: #047857; }   /* same strength, later → wins */\n</style>\n<p>I am green, because the second rule came later.</p>', run: 'html' },
        { h: B('الـ specificity: قوة المحدد', 'Specificity: a selector’s strength'),
          p: B('لما المحددات مختلفة، الأقوى بيكسب بغض النظر عن الترتيب: **id** (`#total`) أقوى من **class/خاصية/حالة** (`.price` و`[type]` و`:hover`)، وده أقوى من **النوع** (`p`). والـ inline style أقوى منهم كلهم. بتتحسب كعدّاد (ids، classes، types): `#a .b p` = (1,1,1). نصيحة: اعتمد على الكلاسات بس عشان القوة تفضل قريبة وسهل تتحكم.',
            'When selectors differ, the stronger wins regardless of order: an **id** (`#total`) beats a **class/attribute/state** (`.price`, `[type]`, `:hover`), which beats a **type** (`p`). Inline style beats them all. It is counted like a tally (ids, classes, types): `#a .b p` = (1,1,1). Advice: rely on classes only, so strengths stay close and easy to control.'),
          ex: '<style>\n  #offer { color: #b91c1c; }      /* (1,0,0) */\n  .highlight { color: #047857; }  /* (0,1,0) */\n  p { color: #1d4ed8; }           /* (0,0,1) */\n</style>\n<p>Type only: blue.</p>\n<p class="highlight">Class beats type: green.</p>\n<p id="offer" class="highlight">Id beats class: red.</p>', run: 'html' },
        { h: B('!important وليه تتجنّبه', '!important, and why to avoid it'),
          p: B('`color: red !important;` بيكسب على كل حاجة تقريبًا. بيبان حل سريع، بس بيعمل حرب: بعدين محتاج !important تاني عشان تغلبه، والملف يبقى مستحيل يتفهم. استخدمه بس لحاجات «لازم تكسب دايمًا» نادرة (زي كلاس `.hidden`)، أو مؤقت وانت بتدوّر على المشكلة. الحل الصح غالبًا: محدد أوضح أو ترتيب أحسن.',
            '`color: red !important;` beats almost everything. It looks like a quick fix, but it starts a war: later you need another !important to beat it, and the file becomes impossible to follow. Use it only for rare «must always win» things (such as a `.hidden` class), or temporarily while hunting a problem. The right fix is usually a clearer selector or a better order.'),
          ex: '<style>\n  .hidden { display: none !important; }\n  #promo { display: block; }\n</style>\n<p id="promo" class="hidden">You cannot see me: !important beat the id.</p>\n<p>The promo above is hidden even though #promo says display:block.</p>', run: 'html' },
        { h: B('الوراثة: inherit', 'Inheritance: inherit'),
          p: B('بعض الخصايص **بتتورث** من الأب للأبناء: الخط (`font-family` و`font-size`) واللون (`color`) و`line-height` و`direction`. فبتحطهم مرة على `body` وكل الصفحة تاخدهم. وخصايص تانية **مش بتتورث**: `border` و`margin` و`padding` و`background`. تقدر تجبر الوراثة بـ `inherit`، وترجّع للأصل بـ `initial`.',
            'Some properties are **inherited** from parent to children: fonts (`font-family`, `font-size`), colour (`color`), `line-height` and `direction`. So you set them once on `body` and the whole page takes them. Others are **not inherited**: `border`, `margin`, `padding` and `background`. You can force inheritance with `inherit` and reset with `initial`.'),
          ex: '<style>\n  .box { color: #7c3aed; font-family: Georgia, serif; border: 2px dashed #7c3aed; padding: 8px; }\n  .box button { font: inherit; color: inherit; }\n</style>\n<div class="box">\n  <p>I inherit the purple colour and the serif font, but not the border.</p>\n  <button>I inherit them because of "inherit"</button>\n</div>', run: 'html' },
        { h: B('«الـ CSS مش شغال»: اسأل DevTools', '«My CSS does not work»: ask DevTools'),
          p: B('كليك يمين على العنصر ← **Inspect**. في لوحة **Styles** بتشوف كل القواعد اللي عليه بالترتيب من الأقوى، والقاعدة اللي اتغلبت عليها **خط في نصها** (وجنبها اللي غلبها). وفي **Computed** القيمة النهائية فعلًا ومنين جت. أسباب شائعة: محدد غلط (typo في الكلاس)، قاعدة أقوى، الملف مش متربط، أو خاصية مش بتشتغل على النوع ده (width على span).',
            'Right-click the element → **Inspect**. In the **Styles** panel you see every rule on it, strongest first, and an overridden rule is **struck through** (next to the one that beat it). In **Computed** you see the actual final value and where it came from. Common causes: a wrong selector (a class typo), a stronger rule, the file not linked, or a property that does not apply to that kind of element (width on a span).'),
          ex: '<style>\n  .title { color: #047857; }\n  section .title { color: #b91c1c; }\n  .titel { font-size: 30px; }   /* typo: never matches */\n  span.badge { width: 200px; background: #fde68a; }   /* width does nothing on an inline span */\n</style>\n<section><h2 class="title">Inspect me: which colour won, and why?</h2></section>\n<p><span class="badge">width ignored</span></p>', run: 'html' }
      ],
      practice: [
        B('اكتب قاعدتين بنفس القوة وبدّل ترتيبهم وشوف مين بيكسب.', 'Write two equally strong rules, swap their order and see who wins.'),
        B('احسب الـ specificity لـ 6 محددات ورتّبهم من الأقوى.', 'Work out the specificity of 6 selectors and rank them strongest first.'),
        B('اعمل كلاس `.hidden` بـ !important واشرح ليه ده استثناء مقبول.', 'Make a `.hidden` class with !important and explain why this is an acceptable exception.'),
        B('حط الخط واللون على body بس وشوف الصفحة كلها اتأثرت.', 'Set the font and colour on body only and watch the whole page follow.'),
        B('في DevTools لاقي قاعدة مشطوبة واعرف إيه اللي غلبها.', 'In DevTools find a struck-through rule and see what beat it.'),
        B('اعمل 3 أخطاء «CSS مش شغال» وحلهم بـ DevTools.', 'Create 3 «my CSS does not work» bugs and solve them with DevTools.')
      ],
      code: [
        { u: B('ترتيب ملف CSS', 'The order of a CSS file'), p: '/* 1. settings: variables  */  :root { --green: #1f6f4a; }\n/* 2. base: elements        */  body, h1, a { … }\n/* 3. layout                */  .container, .grid { … }\n/* 4. components            */  .card, .btn, .badge { … }\n/* 5. utilities (rare !important) */  .hidden { display: none !important; }', lang: 'css', show: 1 }
      ],
      words: [
        { t: 'cascade', m: B('ترتيب الأولوية بين القواعد: الأحدث يكسب لو متساويين', 'the order of priority between rules: the later wins when equal'), ex: 'the second rule wins' },
        { t: 'specificity', m: B('قوة المحدد: id ثم class ثم type', 'a selector’s strength: id, then class, then type'), ex: '#a beats .b' },
        { t: 'inheritance', m: B('خصايص بتنتقل من الأب للأبناء', 'properties passed from parent to children'), ex: 'color on body' },
        { t: 'override', m: B('قاعدة بتغلب قاعدة تانية', 'one rule beating another'), ex: 'override a library style' },
        { t: '!important', m: B('علامة بتخلي القيمة تكسب تقريبًا دايمًا', 'a flag making a value win almost always'), ex: 'display: none !important' },
        { t: 'computed style', m: B('القيمة النهائية الفعلية بعد كل القواعد', 'the actual final value after every rule'), ex: 'DevTools → Computed' },
        { t: 'Styles panel', m: B('لوحة في DevTools بتعرض قواعد CSS على العنصر', 'the DevTools panel showing an element’s CSS rules'), ex: 'Inspect → Styles' }
      ],
      read: [{ lib: 'MDN: CSS styling basics', what: B('Handling conflicts (cascade وspecificity وinheritance).', 'Handling conflicts (cascade, specificity and inheritance).') },
        { lib: 'Chrome DevTools docs', what: B('CSS: View and change CSS.', 'CSS: View and change CSS.') }],
      challenge: B('خد ملف CSS قديم (أو اكتب واحد عشوائي 40 قاعدة) فيه 3 !important ومحددات طويلة، وأعد ترتيبه بالطبقات الخمسة، وشيل كل !important ما عدا الـ utilities، وقصّر المحددات لكلاسات — والصفحة تفضل بنفس الشكل بالظبط.', 'Take an old CSS file (or write a messy 40-rule one) with 3 !importants and long selectors, reorganise it into the five layers, remove every !important except utilities, and shorten selectors to classes — with the page looking exactly the same.'),
      quiz: [
        { q: B('قاعدتين `p {}` بنفس القوة:', 'Two equally strong `p {}` rules:'), o: [B('اللي بعد يكسب', 'the later wins'), B('اللي قبل يكسب', 'the earlier wins'), B('مفيش واحدة تشتغل', 'neither applies')], a: 0, why: B('الـ cascade.', 'The cascade.') },
        { q: B('أقوى محدد:', 'The strongest selector:'), o: ['#total', '.price', 'p'], a: 0, why: B('id.', 'An id.') },
        { q: B('خاصية بتتورث:', 'An inherited property:'), o: ['color', 'border', 'margin'], a: 0, why: B('اللون والخط بيتورثوا.', 'Colour and font are inherited.') },
        { q: B('قاعدة مشطوبة في Styles معناها:', 'A struck-through rule in Styles means:'), o: [B('قاعدة تانية غلبتها', 'another rule beat it'), B('فيها خطأ كتابة', 'it has a typo'), B('اتمسحت', 'it was deleted')], a: 0, why: B('اتغلبت.', 'It was overridden.') }
      ] },

    { title: B('الـ Box model والمقاسات', 'The box model and sizes'),
      goal: B('تفهم إن كل عنصر صندوق (content وpadding وborder وmargin)، وتتحكم في المقاسات والوحدات والـ display والخصايص المنطقية لـ RTL.', 'Understand that every element is a box (content, padding, border and margin), and control sizes, units, display and logical properties for RTL.'),
      learn: [
        { h: B('كل عنصر صندوق', 'Every element is a box'),
          p: B('من جوه لبرّه: **content** (المحتوى)، و**padding** (مسافة جوه الصندوق حوالين المحتوى، بلون الخلفية)، و**border** (الحد)، و**margin** (مسافة برّه الصندوق بينه وبين اللي حواليه، شفافة). شوف ده في DevTools ← Computed: رسمة الصندوق بالأرقام. أغلب مشاكل التخطيط هي إن حد مش فاهم الصناديق دي.',
            'From inside out: **content**, **padding** (space inside the box around the content, in the background colour), **border**, and **margin** (transparent space outside the box between it and its neighbours). See it in DevTools → Computed: the box drawing with numbers. Most layout problems come from not understanding these boxes.'),
          ex: '<style>\n  .box { width: 220px; padding: 16px; border: 6px solid #10b981; margin: 20px; background: #ecfdf5; }\n</style>\n<div class="box">content · padding 16 · border 6 · margin 20</div>\n<div class="box">a second box: notice the 20px gap between them</div>', run: 'html' },
        { h: B('box-sizing: border-box', 'box-sizing: border-box'),
          p: B('افتراضيًا `width: 300px` للمحتوى بس، والـ padding والـ border **بيتزوّدوا** عليه (الصندوق يطلع 300 + 32 + 12 = 344). ده بيبوّظ أي حسبة. الحل اللي كل الناس بتعمله: `*, *::before, *::after { box-sizing: border-box; }` — دلوقتي width هو المقاس الكلي شامل الـ padding والـ border. حطه أول سطر في كل مشروع.',
            'By default `width: 300px` applies to the content only, and padding and border are **added** to it (the box ends up 300 + 32 + 12 = 344). That ruins every calculation. The fix everyone uses: `*, *::before, *::after { box-sizing: border-box; }` — now width is the total size, padding and border included. Make it the first line of every project.'),
          ex: '<style>\n  .a, .b { width: 260px; padding: 16px; border: 6px solid #6366f1; margin: 6px 0; background: #eef2ff; }\n  .b { box-sizing: border-box; }\n</style>\n<div class="a">content-box: really 260 + 32 + 12 = 304px wide</div>\n<div class="b">border-box: exactly 260px wide</div>', run: 'html' },
        { h: B('الوحدات: px وrem وem و% وvw', 'Units: px, rem, em, % and vw'),
          p: B('**px** ثابت (حدود رفيعة، أيقونات). **rem** نسبة لخط الصفحة الأساسي (16px غالبًا): `1.5rem` = 24px — الأحسن للخطوط والمسافات لأنه بيكبر لما المستخدم يكبّر الخط. **em** نسبة لخط العنصر نفسه. **%** نسبة للأب. **vw/vh** نسبة لعرض/طول الشاشة. **ch** عرض حرف — `max-width: 65ch` لعرض نص مريح للقراية.',
            '**px** is fixed (thin borders, icons). **rem** is relative to the page’s base font (usually 16px): `1.5rem` = 24px — best for fonts and spacing, because it grows when the user enlarges text. **em** is relative to the element’s own font. **%** relative to the parent. **vw/vh** relative to the screen’s width/height. **ch** is a character’s width — `max-width: 65ch` gives a comfortable reading width.'),
          ex: '<style>\n  .r { font-size: 1.25rem; padding: 0.5rem 1rem; background: #fef3c7; margin: 4px 0; }\n  .half { width: 50%; background: #dbeafe; padding: 6px; }\n  .read { max-width: 40ch; background: #f3f4f6; padding: 6px; }\n</style>\n<div class="r">1.25rem font, 0.5rem/1rem padding</div>\n<div class="half">50% of the parent’s width</div>\n<p class="read">This paragraph is limited to about forty characters per line, which is much easier to read than a line stretching across a wide screen.</p>', run: 'html' },
        { h: B('display: block وinline وinline-block وnone', 'display: block, inline, inline-block and none'),
          p: B('**block** (div وp وh1) بياخد سطر كامل ويقبل width وheight وmargin من كل الجهات. **inline** (span وa وstrong) جوه السطر و**مش بيقبل** width/height ولا margin فوق وتحت. **inline-block** جوه السطر بس بيقبل المقاسات (زراير وبادجات). **none** بيخفي العنصر خالص (ومش بياخد مكان). وهنشوف flex وgrid الأسبوع الجاي.',
            '**block** (div, p, h1) takes a full line and accepts width, height and margins on all sides. **inline** (span, a, strong) sits in the line and **ignores** width/height and top/bottom margins. **inline-block** sits in the line but accepts sizes (buttons and badges). **none** hides the element completely (it takes no space). flex and grid come next week.'),
          ex: '<style>\n  .tag { background: #fde68a; padding: 4px 8px; width: 120px; }\n  .ib { display: inline-block; }\n  .gone { display: none; }\n</style>\n<p>inline: <span class="tag">width ignored</span> and in the line.</p>\n<p>inline-block: <span class="tag ib">width works</span> and still in the line.</p>\n<p>hidden: <span class="gone">you will not see me</span>(nothing here)</p>', run: 'html' },
        { h: B('الخصايص المنطقية للعربي', 'Logical properties for Arabic'),
          p: B('`margin-left` بيفضل شمال حتى في صفحة عربي (RTL) — فالتصميم يتقلب غلط. الخصايص **المنطقية** بتتبع اتجاه النص: `margin-inline-start` (بداية السطر: يمين في العربي وشمال في الإنجليزي)، و`padding-inline-end`، و`border-inline-start`، و`margin-block` (فوق وتحت)، و`inline-size` بدل width. اكتبها دايمًا وصفحتك تشتغل بالاتجاهين من غير ما تكرر CSS.',
            '`margin-left` stays on the left even on an Arabic (RTL) page — so the design flips wrongly. **Logical** properties follow the text direction: `margin-inline-start` (the start of the line: right in Arabic, left in English), `padding-inline-end`, `border-inline-start`, `margin-block` (top and bottom), and `inline-size` instead of width. Always use them and your page works in both directions without duplicating CSS.'),
          ex: '<style>\n  .note { border-inline-start: 5px solid #10b981; padding-inline-start: 10px; padding-block: 6px; background: #ecfdf5; margin-block: 6px; }\n</style>\n<p class="note" dir="ltr" lang="en">English: the green bar is on the left (the start).</p>\n<p class="note" dir="rtl" lang="ar">عربي: الشريط الأخضر على اليمين (البداية).</p>', run: 'html' }
      ],
      practice: [
        B('اعمل صندوق بـ padding وborder وmargin وشوف الأرقام في DevTools ← Computed.', 'Make a box with padding, border and margin and read the numbers in DevTools → Computed.'),
        B('قارن عرض صندوقين بـ content-box وborder-box.', 'Compare the width of two boxes with content-box and border-box.'),
        B('حوّل كل المقاسات في صفحتك من px لـ rem (ما عدا الحدود الرفيعة).', 'Convert every size on your page from px to rem (except thin borders).'),
        B('اعمل بادج inline-block وزرار وجرّب width على span عادي.', 'Make an inline-block badge and a button, and try width on a plain span.'),
        B('حدد عرض الفقرات بـ max-width بالـ ch.', 'Limit paragraph width with max-width in ch.'),
        B('حوّل 6 خصايص left/right لخصايص منطقية وجرّب الصفحة بـ dir="rtl" وdir="ltr".', 'Convert 6 left/right properties to logical ones and test the page with dir="rtl" and dir="ltr".')
      ],
      code: [
        { u: B('حاوية الصفحة', 'The page container'), p: '.container {\n  max-inline-size: 72rem;\n  margin-inline: auto;          /* centre it */\n  padding-inline: 1rem;         /* breathing room on phones */\n}', lang: 'css', show: 1 }
      ],
      words: [
        { t: 'box model', m: B('كل عنصر صندوق: محتوى وpadding وborder وmargin', 'every element is a box: content, padding, border and margin'), ex: 'DevTools → Computed' },
        { t: 'content box', m: B('الجزء الداخلي من الصندوق اللي فيه المحتوى', 'the inner part of the box holding the content'), ex: 'box-sizing: content-box' },
        { t: 'margin', m: B('مسافة برّه الصندوق بينه وبين غيره', 'space outside the box between it and others'), ex: 'margin-block: 1rem' },
        { t: 'border-box', m: B('المقاس يشمل الـ padding والـ border', 'the size includes padding and border'), ex: 'box-sizing: border-box' },
        { t: 'rem', m: B('وحدة نسبة لخط الصفحة الأساسي', 'a unit relative to the page’s base font'), ex: '1.5rem = 24px' },
        { t: 'display', m: B('بيحدد إزاي العنصر بيتعرض (block وinline...)', 'decides how an element is shown (block, inline...)'), ex: 'display: inline-block' },
        { t: 'logical property', m: B('خاصية بتتبع اتجاه النص بدل يمين وشمال', 'a property following the text direction instead of left and right'), ex: 'margin-inline-start' }
      ],
      read: [{ lib: 'MDN: CSS styling basics', what: B('The box model وValues and units وSizing items in CSS.', 'The box model, Values and units, and Sizing items in CSS.') },
        { lib: 'web.dev: Learn CSS', what: B('Box Model وLogical properties.', 'Box Model and Logical properties.') }],
      challenge: B('اعمل «كارت منتج» بيشتغل بالعربي والإنجليزي من غير تغيير في CSS: border-box، ومقاسات rem، وbadge inline-block على الصورة، وسعر قديم وجديد، وزرار — وكل المسافات والحدود منطقية؛ اعرض كارتين جنب بعض واحد dir="rtl" وواحد dir="ltr".', 'Build a «product card» that works in Arabic and English with no CSS changes: border-box, rem sizes, an inline-block badge on the image, old and new prices, a button — and all spacing and borders logical; show two cards, one with dir="rtl" and one with dir="ltr".'),
      quiz: [
        { q: B('المسافة جوه الصندوق حوالين المحتوى:', 'The space inside the box around the content:'), o: ['padding', 'margin', 'border'], a: 0, why: B('margin برّه.', 'margin is outside.') },
        { q: B('مع border-box وwidth: 200px وpadding: 20px، العرض الكلي:', 'With border-box, width: 200px and padding: 20px, the total width:'), o: ['200px', '240px', '220px'], a: 0, why: B('شامل الـ padding.', 'Padding included.') },
        { q: B('وحدة الخط اللي بتكبر مع إعدادات المستخدم:', 'The font unit that grows with the user’s settings:'), o: ['rem', 'px', 'vw'], a: 0, why: B('نسبة لخط الصفحة.', 'Relative to the page font.') },
        { q: B('`margin-inline-start` في صفحة RTL:', '`margin-inline-start` on an RTL page:'), o: [B('على اليمين', 'on the right'), B('على الشمال', 'on the left'), B('فوق', 'on top')], a: 0, why: B('بداية السطر في العربي يمين.', 'An Arabic line starts on the right.') }
      ] },

    { title: B('الألوان والخلفيات والحدود', 'Colours, backgrounds and borders'),
      goal: B('تكتب الألوان بصيغها، وتعمل خلفيات وتدرّجات وحدود وزوايا وظلال، وتختار ألوان مقرية بتباين كفاية.', 'Write colours in their formats, create backgrounds, gradients, borders, corners and shadows, and pick readable colours with enough contrast.'),
      learn: [
        { h: B('صيغ الألوان', 'Colour formats'),
          p: B('**hex** `#1f6f4a` (الأشهر، من التصاميم)، و**rgb** `rgb(31 111 74)` و`rgb(31 111 74 / 0.5)` بشفافية، و**hsl** `hsl(152 56% 28%)` (درجة اللون، والتشبّع، والإضاءة — أسهل تعمل منه درجات: نفس اللون بإضاءة مختلفة)، وأسماء زي `white`. والأحدث `oklch` بيدّي درجات متساوية للعين. خلي ألوان المشروع **محدودة** (لونين وشوية رمادي).',
            '**hex** `#1f6f4a` (the most common, from designs), **rgb** `rgb(31 111 74)` and `rgb(31 111 74 / 0.5)` with transparency, **hsl** `hsl(152 56% 28%)` (hue, saturation, lightness — easiest for making shades: the same hue with different lightness), and names like `white`. The newer `oklch` gives shades that look evenly spaced. Keep a project’s palette **small** (two colours and a few greys).'),
          ex: '<style>\n  .s { display: inline-block; width: 70px; height: 40px; margin: 3px; border-radius: 6px; color: #fff; font: 12px sans-serif; padding: 4px; }\n</style>\n<span class="s" style="background:#1f6f4a">hex</span>\n<span class="s" style="background:rgb(31 111 74 / 0.6)">rgb 60%</span>\n<span class="s" style="background:hsl(152 56% 18%)">hsl dark</span>\n<span class="s" style="background:hsl(152 56% 38%)">hsl mid</span>\n<span class="s" style="background:hsl(152 56% 58%)">hsl light</span>', run: 'html' },
        { h: B('المتغيرات: ألوان المشروع في مكان واحد', 'Variables: the project’s colours in one place'),
          p: B('`:root { --brand: #1f6f4a; --text: #1f2937; --bg: #fafaf9; }` وبعدين `color: var(--text);` في كل حتة. عايز تغيّر لون الماركة؟ سطر واحد. وده اللي بيخلي الوضع الليلي سهل: تعيد تعريف نفس المتغيرات جوه `@media (prefers-color-scheme: dark)`. سمّي المتغير بدوره (`--danger`) مش بلونه (`--red`).',
            '`:root { --brand: #1f6f4a; --text: #1f2937; --bg: #fafaf9; }` then `color: var(--text);` everywhere. Want to change the brand colour? One line. And it makes dark mode easy: redefine the same variables inside `@media (prefers-color-scheme: dark)`. Name a variable by its role (`--danger`), not its colour (`--red`).'),
          ex: '<style>\n  :root { --brand: #1f6f4a; --text: #1f2937; --bg: #ffffff; --muted: #6b7280; }\n  @media (prefers-color-scheme: dark) { :root { --text: #e5e7eb; --bg: #111827; --muted: #9ca3af; --brand: #34d399; } }\n  body { color: var(--text); background: var(--bg); }\n  .brand { color: var(--brand); font-weight: 700; }\n  .muted { color: var(--muted); }\n</style>\n<p class="brand">Nile Store</p>\n<p>Normal text uses --text.</p>\n<p class="muted">Muted text uses --muted. Switch your system to dark mode and run again.</p>', run: 'html' },
        { h: B('الخلفيات والتدرّجات', 'Backgrounds and gradients'),
          p: B('`background-color` لون، و`background-image: url(...)` صورة مع `background-size: cover` (تملا وتقص) و`background-position: center`. والتدرّج من غير صور: `linear-gradient(135deg, #1f6f4a, #34d399)` و`radial-gradient(...)`. لو حاطط نص فوق صورة، حط طبقة تدرّج غامقة فوقها عشان النص يتقري.',
            '`background-color` for a colour, and `background-image: url(...)` for an image with `background-size: cover` (fill and crop) and `background-position: center`. Gradients with no images: `linear-gradient(135deg, #1f6f4a, #34d399)` and `radial-gradient(...)`. With text over a photo, add a dark gradient layer on top so the text stays readable.'),
          ex: '<style>\n  .hero { padding: 24px; color: #fff; border-radius: 10px; margin-bottom: 8px;\n    background: linear-gradient(rgb(0 0 0 / 0.55), rgb(0 0 0 / 0.55)), url("https://picsum.photos/seed/market/600/200") center / cover; }\n  .grad { padding: 18px; border-radius: 10px; color: #fff; background: linear-gradient(135deg, #1f6f4a, #34d399); }\n</style>\n<div class="hero"><strong>Back-to-school offer</strong><br>Readable text over a photo, thanks to the dark layer.</div>\n<div class="grad">A gradient with no image file at all.</div>', run: 'html' },
        { h: B('الحدود والزوايا والظلال', 'Borders, corners and shadows'),
          p: B('`border: 1px solid #e5e7eb` (العرض والنوع واللون)، وتقدر لجهة واحدة `border-block-end`. `border-radius: 8px` زوايا مدوّرة، و`50%` دايرة (للصور الشخصية). `box-shadow: 0 2px 8px rgb(0 0 0 / 0.08)` ظل ناعم (x وy والـ blur واللون) — الظلال الخفيفة أشيك من التقيلة. و`outline` زي border بس مش بياخد مكان (للـ focus).',
            '`border: 1px solid #e5e7eb` (width, style and colour), or one side with `border-block-end`. `border-radius: 8px` rounds corners, and `50%` makes a circle (for profile photos). `box-shadow: 0 2px 8px rgb(0 0 0 / 0.08)` is a soft shadow (x, y, blur and colour) — light shadows look better than heavy ones. And `outline` is like border but takes no space (for focus).'),
          ex: '<style>\n  .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 14px; box-shadow: 0 2px 8px rgb(0 0 0 / 0.08); max-width: 280px; }\n  .avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 3px solid #34d399; }\n  .line { border-block-end: 2px dashed #f59e0b; padding-block-end: 6px; }\n</style>\n<div class="card">\n  <img class="avatar" src="https://picsum.photos/seed/face/112/112" alt="Customer photo">\n  <p class="line">A soft shadow, round corners and a circle photo.</p>\n</div>', run: 'html' },
        { h: B('التباين: ألوان تتقري', 'Contrast: readable colours'),
          p: B('رمادي فاتح على أبيض **شكله شيك ومش بيتقري**. المعيار (WCAG AA): نسبة تباين **4.5:1** على الأقل للنص العادي و3:1 للنص الكبير. DevTools بيقيسها: Inspect على النص ← اضغط على مربع اللون ← بيظهر Contrast ratio بعلامة ✓ أو ✗. ومتعتمدش على اللون لوحده لمعنى (أحمر = غلط): زوّد أيقونة أو كلمة.',
            'Light grey on white **looks elegant and cannot be read**. The standard (WCAG AA): a contrast ratio of at least **4.5:1** for normal text and 3:1 for large text. DevTools measures it: Inspect the text → click the colour square → it shows the contrast ratio with ✓ or ✗. And never rely on colour alone for meaning (red = wrong): add an icon or a word.'),
          ex: '<style>\n  .bad { color: #d1d5db; background: #fff; }\n  .good { color: #4b5563; background: #fff; }\n  .err { color: #b91c1c; }\n</style>\n<p class="bad">Too light: about 1.5 : 1 — fails.</p>\n<p class="good">Readable grey: about 7.6 : 1 — passes.</p>\n<p class="err">✗ Error: the phone number must have 11 digits (icon + words, not colour alone).</p>', run: 'html' }
      ],
      practice: [
        B('اعمل لوحة ألوان مشروعك: لونين و5 درجات رمادي بـ hsl في متغيرات.', 'Build your project palette: two colours and 5 greys in hsl, as variables.'),
        B('ضيف وضع ليلي بإعادة تعريف المتغيرات في prefers-color-scheme.', 'Add a dark mode by redefining the variables in prefers-color-scheme.'),
        B('اعمل hero بصورة خلفية وطبقة تدرّج ونص مقري.', 'Make a hero with a background image, a gradient layer and readable text.'),
        B('اعمل كارت بحد وزوايا وظل خفيف وصورة دايرة.', 'Make a card with a border, rounded corners, a light shadow and a circle photo.'),
        B('قيس تباين 5 نصوص في DevTools وصلّح اللي تحت 4.5.', 'Measure the contrast of 5 texts in DevTools and fix those under 4.5.'),
        B('حوّل رسالة خطأ بتعتمد على اللون بس لرسالة بأيقونة وكلام.', 'Turn a colour-only error message into one with an icon and words.')
      ],
      code: [
        { u: B('ألوان بأدوارها', 'Colours by role'), p: ':root {\n  --brand: #1f6f4a;     --brand-ink: #ffffff;\n  --text: #1f2937;      --muted: #4b5563;\n  --bg: #fafaf9;        --surface: #ffffff;   --border: #e5e7eb;\n  --danger: #b91c1c;    --warning: #b45309;   --success: #047857;\n}\n@media (prefers-color-scheme: dark) {\n  :root { --text: #e5e7eb; --muted: #9ca3af; --bg: #111827; --surface: #1f2937; --border: #374151; --brand: #34d399; --brand-ink: #062b1c; }\n}', lang: 'css', show: 1 }
      ],
      words: [
        { t: 'hex color', m: B('لون بالصيغة #RRGGBB', 'a colour written as #RRGGBB'), ex: '#1f6f4a' },
        { t: 'HSL', m: B('لون بدرجة وتشبّع وإضاءة', 'a colour as hue, saturation and lightness'), ex: 'hsl(152 56% 28%)' },
        { t: 'custom property', m: B('متغير CSS بيبدأ بـ --', 'a CSS variable starting with --'), ex: '--brand: #1f6f4a' },
        { t: 'gradient', m: B('تدرّج بين لونين أو أكتر', 'a blend between two or more colours'), ex: 'linear-gradient(…)' },
        { t: 'border radius', m: B('تدوير زوايا الصندوق', 'rounding a box’s corners'), ex: 'border-radius: 12px' },
        { t: 'box shadow', m: B('ظل حوالين الصندوق', 'a shadow around the box'), ex: 'box-shadow: 0 2px 8px …' },
        { t: 'contrast ratio', m: B('نسبة الفرق بين لون النص والخلفية (4.5:1 على الأقل)', 'the difference between text and background colours (at least 4.5:1)'), ex: 'WCAG AA' }
      ],
      read: [{ lib: 'web.dev: Learn CSS', what: B('Color وGradients وBorders وShadows.', 'Color, Gradients, Borders and Shadows.') },
        { lib: 'MDN: CSS styling basics', what: B('Backgrounds and borders.', 'Backgrounds and borders.') }],
      challenge: B('اعمل «نظام ألوان» صغير لمشروعك في ملف `theme.css`: متغيرات بأدوار (فاتح وغامق)، وأزرار primary وsecondary وdanger، وبادجات حالة (جديد، مدفوع، متأخر) بأيقونات، وكارت بظل — وكل نص فيهم تباينه 4.5 أو أكتر في الوضعين، ومتأكد منها في DevTools.', 'Build a small «colour system» for your project in `theme.css`: role-based variables (light and dark), primary, secondary and danger buttons, status badges (new, paid, late) with icons, and a card with a shadow — every text in them at 4.5 contrast or more in both modes, checked in DevTools.'),
      quiz: [
        { q: B('أسهل صيغة تعمل منها درجات للون:', 'The easiest format for making shades of a colour:'), o: ['hsl', 'hex', B('الأسماء', 'names')], a: 0, why: B('غيّر الإضاءة بس.', 'Change only the lightness.') },
        { q: B('ميزة متغيرات CSS:', 'The advantage of CSS variables:'), o: [B('تغيّر لون في مكان واحد', 'change a colour in one place'), B('أسرع', 'faster'), B('إجبارية', 'required')], a: 0, why: B('ووضع ليلي سهل.', 'And easy dark mode.') },
        { q: B('أقل تباين للنص العادي:', 'The minimum contrast for normal text:'), o: ['4.5:1', '2:1', '10:1'], a: 0, why: B('WCAG AA.', 'WCAG AA.') },
        { q: B('صورة شخصية دايرة:', 'A round profile photo:'), o: ['border-radius: 50%', 'border: circle', 'shape: round'], a: 0, why: B('50% = دايرة.', '50% makes a circle.') }
      ] },

    { title: B('الخطوط والنصوص والعربي', 'Fonts, text and Arabic'),
      goal: B('تختار وتحمّل خطوط عربي وإنجليزي، وتظبط الحجم والوزن والمسافات والمحاذاة، وتتعامل مع النص العربي والمختلط صح.', 'Choose and load Arabic and English fonts, set size, weight, spacing and alignment, and handle Arabic and mixed text correctly.'),
      learn: [
        { h: B('font-family والخطوط الاحتياطية', 'font-family and fallback fonts'),
          p: B('`font-family: "Cairo", "Tajawal", system-ui, sans-serif;` — المتصفح بيجرّب بالترتيب، فحط **خط احتياطي** دايمًا في الآخر (`sans-serif` أو `serif`). الخطوط اللي فيها مسافة بين علامات تنصيص. `system-ui` خط النظام (سريع ومن غير تحميل). للكود: `ui-monospace, Consolas, monospace`.',
            '`font-family: "Cairo", "Tajawal", system-ui, sans-serif;` — the browser tries them in order, so always end with a **fallback** (`sans-serif` or `serif`). Fonts with spaces go in quotes. `system-ui` is the operating system’s font (fast, nothing to download). For code: `ui-monospace, Consolas, monospace`.'),
          ex: '<style>\n  .sys { font-family: system-ui, sans-serif; }\n  .serif { font-family: Georgia, "Times New Roman", serif; }\n  .mono { font-family: ui-monospace, Consolas, monospace; }\n  .missing { font-family: "A Font Nobody Has", cursive; }\n</style>\n<p class="sys">system-ui: the operating system font.</p>\n<p class="serif">A serif font for a classic look.</p>\n<p class="mono">const total = 1250; // monospace</p>\n<p class="missing">Unknown font → the fallback is used.</p>', run: 'html' },
        { h: B('تحميل خطوط من Google Fonts', 'Loading fonts from Google Fonts'),
          p: B('من fonts.google.com اختار الخط والأوزان اللي محتاجها بس (400 و700 مثلًا — كل وزن زيادة = تحميل أتقل)، وانسخ `<link>` في head، و`display=swap` بيخلي النص يظهر بخط النظام لحد ما الخط يحمّل (من غير صفحة فاضية). خطوط عربي حلوة: Cairo وTajawal وAlmarai وIBM Plex Sans Arabic وNoto Naskh Arabic (للنصوص الطويلة).',
            'At fonts.google.com pick the font and only the weights you need (say 400 and 700 — every extra weight is a heavier download), and copy the `<link>` into the head; `display=swap` shows the text in the system font until the font loads (no blank page). Good Arabic fonts: Cairo, Tajawal, Almarai, IBM Plex Sans Arabic and Noto Naskh Arabic (for long texts).'),
          ex: '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap">\n<style> body { font-family: "Cairo", system-ui, sans-serif; } </style>\n<p lang="ar" dir="rtl">خط Cairo بوزنين بس: <strong>عريض</strong> وعادي.</p>\n<p>Cairo also has Latin letters: 1,250 EGP.</p>', run: 'html' },
        { h: B('الحجم والوزن وارتفاع السطر', 'Size, weight and line height'),
          p: B('`font-size` بالـ rem (الأساس 1rem = 16px؛ العناوين 1.5–2.5rem). `font-weight: 400` عادي و`700` عريض (حسب الأوزان المتحمّلة). `line-height: 1.6` مسافة بين الأسطر (العربي محتاج 1.7–1.9 عشان النقط والتشكيل). و`clamp(1.5rem, 4vw, 2.5rem)` حجم بيكبر مع الشاشة بحد أدنى وأقصى — مثالي للعناوين.',
            '`font-size` in rem (base 1rem = 16px; headings 1.5–2.5rem). `font-weight: 400` normal and `700` bold (depending on the loaded weights). `line-height: 1.6` sets the space between lines (Arabic needs 1.7–1.9 for its dots and diacritics). And `clamp(1.5rem, 4vw, 2.5rem)` is a size that grows with the screen between a minimum and a maximum — perfect for headings.'),
          ex: '<style>\n  .t { font-size: clamp(1.4rem, 5vw, 2.4rem); font-weight: 800; line-height: 1.2; margin: 0; }\n  .ar { font-size: 1.05rem; line-height: 1.9; }\n  .tight { line-height: 1.1; }\n</style>\n<p class="t">A heading that grows with the frame</p>\n<p class="ar" dir="rtl" lang="ar">النص العربي محتاج مسافة أكبر بين السطور عشان النقط والتشكيل يبانوا مريحين، والسطر ميلزقش في اللي تحته.</p>\n<p class="tight" dir="rtl" lang="ar">نفس الفكرة بمسافة ضيقة جدًا بين السطور بيبان النص مزنوق وصعب يتقري بالشكل ده.</p>', run: 'html' },
        { h: B('المحاذاة والمسافات وتنسيق النص', 'Alignment, spacing and text styling'),
          p: B('`text-align: start` (بداية السطر — يمين في العربي) أحسن من left/right، و`center` للعناوين القصيرة بس. `letter-spacing` للإنجليزي (متستخدمهوش مع العربي — بيفصل الحروف المتصلة!). `text-transform: uppercase` للإنجليزي. `text-decoration` للخط تحت. `white-space: nowrap` يمنع كسر السطر (للأسعار). و`text-overflow: ellipsis` يحط … للنص الطويل.',
            '`text-align: start` (the line’s start — right in Arabic) beats left/right, and `center` is for short headings only. `letter-spacing` is for English (never with Arabic — it breaks the joined letters apart!). `text-transform: uppercase` for English. `text-decoration` for underlines. `white-space: nowrap` stops line breaks (for prices). And `text-overflow: ellipsis` adds … to long text.'),
          ex: '<style>\n  .badge { text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; font-weight: 700; color: #065f46; }\n  .bad-ar { letter-spacing: 0.3em; }\n  .one-line { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; border: 1px solid #e5e7eb; padding: 4px; }\n</style>\n<p class="badge">new arrival</p>\n<p class="bad-ar" dir="rtl">مسافات بين الحروف بتكسّر العربي</p>\n<p class="one-line">A very long product name that does not fit in this small box at all</p>', run: 'html' },
        { h: B('النص المختلط عربي وإنجليزي', 'Mixed Arabic and English text'),
          p: B('في جملة عربي فيها كلمة إنجليزي أو رقم أو إيميل، الترتيب ممكن يتلخبط في **العرض** (البيانات سليمة). حط الجزء الإنجليزي في `<bdi>` أو `<span dir="ltr">`، والكود والإيميلات والأرقام التليفون في `dir="ltr"`. وخلي الحقول اللي هيتكتب فيها إيميل أو رابط `dir="ltr"`. خاصية `unicode-bidi: isolate` بتعمل نفس فكرة bdi من CSS.',
            'In an Arabic sentence holding an English word, a number or an email, the order can look scrambled on **display** (the data is fine). Wrap the English part in `<bdi>` or `<span dir="ltr">`, and put code, emails and phone numbers in `dir="ltr"`. Make fields where people type an email or a link `dir="ltr"`. The `unicode-bidi: isolate` property does the same as bdi from CSS.'),
          ex: '<div dir="rtl" lang="ar" style="line-height:1.9">\n  <p>تواصل معانا على help@nile.example قبل الساعة 5!</p>\n  <p>تواصل معانا على <bdi>help@nile.example</bdi> قبل الساعة 5!</p>\n  <p>شغّل الأمر <code dir="ltr">npm run build -- --prod</code> وبعدين ارفع.</p>\n  <p>الموبايل: <span dir="ltr">+20 10 1234 5678</span></p>\n  <label>الإيميل <input dir="ltr" value="sara@mail.com"></label>\n</div>', run: 'html' }
      ],
      practice: [
        B('اكتب font-family بخطين واحتياطي، وجرّب خط مش موجود.', 'Write a font-family with two fonts and a fallback, and try a font nobody has.'),
        B('حمّل خط عربي من Google Fonts بوزنين بس بـ display=swap.', 'Load an Arabic font from Google Fonts with only two weights and display=swap.'),
        B('اعمل مقياس عناوين h1–h4 بالـ rem وh1 بـ clamp.', 'Make a heading scale h1–h4 in rem with h1 using clamp.'),
        B('ظبط line-height للعربي وقارن 1.2 و1.9.', 'Set the Arabic line-height and compare 1.2 with 1.9.'),
        B('اعمل اسم منتج طويل بـ ellipsis وسعر بـ nowrap.', 'Make a long product name with ellipsis and a price with nowrap.'),
        B('صلّح 4 جمل عربي فيها إيميل ورقم وكود بـ bdi وdir="ltr".', 'Fix 4 Arabic sentences containing an email, a number and code with bdi and dir="ltr".')
      ],
      code: [
        { u: B('خطوط مشروع عربي/إنجليزي', 'Fonts for an Arabic/English project'), p: ':root { --font-ar: "Cairo", "Tajawal", system-ui, sans-serif; --font-en: "Inter", system-ui, sans-serif; --font-code: ui-monospace, Consolas, monospace; }\nhtml[lang="ar"] body { font-family: var(--font-ar); line-height: 1.85; }\nhtml[lang="en"] body { font-family: var(--font-en); line-height: 1.6; }\ncode, pre, kbd { font-family: var(--font-code); direction: ltr; unicode-bidi: isolate; }', lang: 'css', show: 1 }
      ],
      words: [
        { t: 'font family', m: B('اسم الخط وبدائله بالترتيب', 'a font’s name and its fallbacks in order'), ex: '"Cairo", sans-serif' },
        { t: 'fallback font', m: B('خط احتياطي لو الأول مش موجود', 'a backup font if the first is missing'), ex: 'sans-serif' },
        { t: 'font weight', m: B('تخانة الخط (400 عادي، 700 عريض)', 'a font’s thickness (400 normal, 700 bold)'), ex: 'font-weight: 700' },
        { t: 'line height', m: B('المسافة بين أسطر النص', 'the space between lines of text'), ex: 'line-height: 1.8' },
        { t: 'web font', m: B('خط بيتحمّل من الإنترنت للصفحة', 'a font downloaded from the internet for the page'), ex: 'Google Fonts' },
        { t: 'bidirectional text', m: B('نص فيه اتجاهين (عربي وإنجليزي)', 'text mixing two directions (Arabic and English)'), ex: '<bdi>' },
        { t: 'ellipsis', m: B('الثلاث نقط … للنص اللي اتقص', 'the three dots … for cut-off text'), ex: 'text-overflow: ellipsis' }
      ],
      read: [{ lib: 'web.dev: Learn CSS', what: B('Typography وText and typography (فقرات line-height وfont-size).', 'Typography, and the line-height and font-size parts of Text.') },
        { lib: 'MDN: CSS styling basics', what: B('Styling text: Fundamental text and font styling.', 'Styling text: Fundamental text and font styling.') }],
      challenge: B('اعمل صفحة «مقال» بالعربي فيها: خط عربي محمّل بوزنين، ومقياس عناوين، وفقرات بعرض 65ch وline-height مريح، واقتباس، وكود إنجليزي وأمر طرفية وإيميل وأرقام جوه الجمل العربي معروضين صح، وعنوان فرعي إنجليزي بـ uppercase وletter-spacing — ونسخة إنجليزي بنفس CSS.', 'Build an Arabic «article» page with: an Arabic font loaded in two weights, a heading scale, paragraphs 65ch wide with comfortable line height, a quote, and English code, a terminal command, an email and numbers inside Arabic sentences all displayed correctly, plus an English subtitle in uppercase with letter spacing — and an English version using the same CSS.'),
      quiz: [
        { q: B('آخر حاجة في font-family:', 'The last item in font-family:'), o: [B('خط احتياطي عام زي sans-serif', 'a generic fallback like sans-serif'), B('أي خط', 'any font'), B('ولا حاجة', 'nothing')], a: 0, why: B('لو كله مش موجود.', 'In case all are missing.') },
        { q: B('letter-spacing مع العربي:', 'letter-spacing with Arabic:'), o: [B('بيفصل الحروف المتصلة — متستخدمهوش', 'it breaks joined letters — avoid it'), B('بيحسّنه', 'improves it'), B('مالوش تأثير', 'has no effect')], a: 0, why: B('العربي متصل.', 'Arabic letters join.') },
        { q: B('إيميل جوه جملة عربي يتعرض صح بـ:', 'An email inside an Arabic sentence displays correctly with:'), o: ['<bdi>', '<b>', '<small>'], a: 0, why: B('بيعزل الاتجاه.', 'It isolates the direction.') },
        { q: B('`display=swap` في رابط الخط:', '`display=swap` in the font link:'), o: [B('النص يظهر بخط النظام لحد ما الخط يحمّل', 'text shows in the system font until the font loads'), B('يبدّل الخطين', 'swaps two fonts'), B('يمنع الخط', 'blocks the font')], a: 0, why: B('من غير صفحة فاضية.', 'No blank page.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تراجع أساسيات CSS وتشكّل صفحة الهبوط بالكامل، وتعدّي اختبار الأسبوع.', 'Review CSS basics, style the whole landing page, and pass the weekly test.'),
      review: [
        B('القاعدة: محدد + { خاصية: قيمة; }، والملف الخارجي أحسن، والـ inline نادر.', 'A rule: selector + { property: value; }; external files are best, inline is rare.'),
        B('النوع والكلاس (الأكتر) والـ id والخصايص والتركيب (مسافة، >، +، فاصلة).', 'Type, class (most used), id, attribute and combinators (space, >, +, comma).'),
        B('الـ cascade (الأحدث يكسب) والـ specificity (id > class > type) ومن غير !important.', 'The cascade (later wins), specificity (id > class > type) and no !important.'),
        B('الوراثة: اللون والخط بيتورثوا، والـ border والـ margin لأ.', 'Inheritance: colour and font are inherited; border and margin are not.'),
        B('الـ box model وborder-box أول سطر، وrem للخطوط والمسافات.', 'The box model, border-box on the first line, rem for fonts and spacing.'),
        B('display: block/inline/inline-block/none، والخصايص المنطقية للعربي.', 'display: block/inline/inline-block/none, and logical properties for Arabic.'),
        B('الألوان في متغيرات بأدوار، والوضع الليلي بإعادة تعريفها، وتباين 4.5:1.', 'Colours in role-based variables, dark mode by redefining them, contrast 4.5:1.'),
        B('الخطوط باحتياطي، والعربي line-height عالي ومن غير letter-spacing، وbdi للمختلط.', 'Fonts with a fallback; Arabic with tall line height and no letter spacing; bdi for mixed text.')
      ],
      project: B('**مشروع الأسبوع: شكّل صفحة الهبوط بتاعة الأسبوع 9 (CSS بس، من غير تخطيط Flex/Grid لسه).**\n1. `style.css` مقسوم للطبقات الخمسة (المتغيرات، الأساس، التخطيط، المكوّنات، الأدوات).\n2. border-box وخطوط محمّلة (عربي وإنجليزي) ومقاسات rem ومقياس عناوين بـ clamp.\n3. لوحة ألوان بأدوار + وضع ليلي، وكل النصوص 4.5:1.\n4. header بخلفية تدرّج، وكروت المنتجات بحد وزوايا وظل، والأسعار القديمة والجديدة، وبادجات حالة بأيقونات.\n5. الجدول بخطوط فاصلة وعناوين مميزة، والفورم بحقول مريحة وfocus واضح.\n6. كل المسافات والحدود منطقية، والصفحة نفسها تشتغل بـ dir="ltr" لو غيّرته.\n7. من غير ولا style inline ولا !important (إلا .hidden).',
        '**Weekly project: style week 9’s landing page (CSS only, no Flex/Grid layout yet).**\n1. `style.css` split into the five layers (variables, base, layout, components, utilities).\n2. border-box, loaded fonts (Arabic and English), rem sizes and a clamp heading scale.\n3. A role-based palette + dark mode, with every text at 4.5:1.\n4. A header with a gradient background, product cards with borders, rounded corners and shadows, old and new prices, and status badges with icons.\n5. The table with dividing lines and distinct headings, and the form with comfortable fields and a clear focus.\n6. All spacing and borders logical, and the same page working with dir="ltr" if you switch it.\n7. No inline style and no !important (except .hidden).'),
      test: [
        { q: B('`#nav .item a` محدد قوته:', 'The strength of `#nav .item a`:'), o: ['(1,1,1)', '(0,1,1)', '(1,0,2)'], a: 0, why: B('id وclass وtype.', 'An id, a class and a type.') },
        { q: B('`.btn.primary` بيختار:', '`.btn.primary` selects:'), o: [B('عنصر عليه الكلاسين', 'an element with both classes'), B('primary جوه btn', 'primary inside btn'), B('أي واحد فيهم', 'either one')], a: 0, why: B('من غير مسافة.', 'No space.') },
        { q: B('`h2 + p`:', '`h2 + p`:'), o: [B('الفقرة اللي بعد h2 على طول', 'the paragraph right after an h2'), B('كل فقرة بعد h2', 'every paragraph after an h2'), B('p جوه h2', 'a p inside an h2')], a: 0, why: B('الأخ اللي بعده مباشرة.', 'The immediate next sibling.') },
        { q: B('width على span عادي:', 'width on a plain span:'), o: [B('مش بيشتغل', 'does nothing'), B('بيشتغل', 'works'), B('بيخفيه', 'hides it')], a: 0, why: B('inline.', 'It is inline.') },
        { q: B('بدون border-box، width: 100px وpadding: 10px وborder: 2px:', 'Without border-box, width: 100px, padding: 10px, border: 2px:'), o: ['124px', '100px', '112px'], a: 0, why: B('100 + 20 + 4.', '100 + 20 + 4.') },
        { q: B('1.5rem مع خط أساسي 16px:', '1.5rem with a 16px base font:'), o: ['24px', '15px', '1.5px'], a: 0, why: B('16 × 1.5.', '16 × 1.5.') },
        { q: B('خاصية مش بتتورث:', 'A property that is not inherited:'), o: ['padding', 'font-family', 'color'], a: 0, why: B('الصندوق مش بيتورث.', 'Box properties are not inherited.') },
        { q: B('أحسن اسم لمتغير لون الخطأ:', 'The best name for the error colour variable:'), o: ['--danger', '--red', '--color3'], a: 0, why: B('بدوره مش بلونه.', 'By role, not colour.') },
        { q: B('`border-radius: 50%` على صورة مربعة:', '`border-radius: 50%` on a square image:'), o: [B('دايرة', 'a circle'), B('مربع', 'a square'), B('بيضاوي دايمًا', 'always an oval')], a: 0, why: B('مربع ← دايرة.', 'Square → circle.') },
        { q: B('line-height مناسب للعربي:', 'A suitable line height for Arabic:'), o: ['1.8', '1.0', '0.9'], a: 0, why: B('النقط والتشكيل.', 'Dots and diacritics.') },
        { q: B('محاذاة بداية السطر في الاتجاهين:', 'Aligning to the line’s start in both directions:'), o: ['text-align: start', 'text-align: left', 'text-align: right'], a: 0, why: B('منطقي.', 'Logical.') },
        { q: B('عشان تعرف ليه CSS مش شغال:', 'To find out why CSS does not apply:'), o: [B('Inspect ← Styles', 'Inspect → Styles'), B('أعد تحميل الكمبيوتر', 'restart the computer'), B('زوّد !important', 'add !important')], a: 0, why: B('شوف مين غلب.', 'See what won.') }
      ] }
  ]
};
