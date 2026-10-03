// JavaScript week 9 — HTML in depth: semantics and forms.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('مبتدئ · مكثّف', 'Beginner · intensive'),
  title: B('HTML بعمق: الدلالة والفورمز', 'HTML in depth: semantics and forms'),
  goal: B('تكتب صفحات HTML صح: الهيكل والعناصر الدلالية والعناوين والقوايم والروابط والصور والجداول والميديا، وفورمز كاملة بالتحقق من غير JS — ومكتوبة عشان محركات البحث وقارئ الشاشة والموبايل.',
          'Write correct HTML pages: structure, semantic elements, headings, lists, links, images, tables and media, plus complete forms validated without JS — written for search engines, screen readers and phones.'),
  days: [
    { title: B('هيكل الصفحة والعناصر الأساسية', 'Page structure and the basic elements'),
      goal: B('تكتب هيكل صفحة كامل صح، وتفهم العنصر والوسم والخاصية، وتستخدم العناوين والفقرات صح.', 'Write a complete, correct page skeleton, understand elements, tags and attributes, and use headings and paragraphs properly.'),
      learn: [
        { h: B('العنصر والوسم والخاصية', 'Elements, tags and attributes'),
          p: B('HTML بيوصف **محتوى** الصفحة ومعناه. **العنصر** = وسم فتح + محتوى + وسم قفل: `<p>Hello</p>`. بعض العناصر فاضية من غير قفل: `<img>` و`<br>` و`<input>`. **الخصايص** (attributes) جوه وسم الفتح بتدّي معلومات زيادة: `<a href="https://..." target="_blank">`. العناصر بتتداخل جوه بعض زي الصناديق، ولازم تتقفل بالترتيب.',
            'HTML describes a page’s **content** and its meaning. An **element** = an opening tag + content + a closing tag: `<p>Hello</p>`. Some elements are empty, with no closing tag: `<img>`, `<br>` and `<input>`. **Attributes** inside the opening tag give extra information: `<a href="https://..." target="_blank">`. Elements nest inside each other like boxes and must close in order.'),
          ex: '<p>This is a <strong>paragraph</strong> with a <a href="https://developer.mozilla.org" target="_blank" rel="noopener">link to MDN</a>.</p>\n<p>Line one<br>line two in the same paragraph.</p>\n<img src="https://picsum.photos/seed/books/240/90" alt="Books on a shelf" width="240" height="90">', run: 'html' },
        { h: B('الهيكل الكامل لكل صفحة', 'The full skeleton of every page'),
          p: B('كل صفحة بتبدأ بـ `<!doctype html>` (قول للمتصفح HTML الحديث)، وبعدين `<html lang="ar" dir="rtl">` (اللغة والاتجاه)، وجواه `<head>` (معلومات مش بتظهر: الترميز والعنوان والوصف والـ CSS) و`<body>` (اللي بيظهر). أهم سطرين في head: `<meta charset="utf-8">` (عشان العربي) و`<meta name="viewport" ...>` (عشان الموبايل).',
            'Every page starts with `<!doctype html>` (telling the browser it is modern HTML), then `<html lang="ar" dir="rtl">` (language and direction), holding a `<head>` (invisible information: encoding, title, description, CSS) and a `<body>` (what is shown). The two most important head lines: `<meta charset="utf-8">` (for Arabic) and `<meta name="viewport" ...>` (for phones).'),
          ex: '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>متجر النيل</title>\n  <meta name="description" content="أدوات مكتبية بأسعار الجملة">\n</head>\n<body>\n  <h1>متجر النيل</h1>\n  <p>أدوات مكتبية بأسعار الجملة، والتوصيل لكل المحافظات.</p>\n</body>\n</html>', run: 'html' },
        { h: B('العناوين h1 لـ h6', 'Headings h1 to h6'),
          p: B('العناوين بتعمل **فهرس** الصفحة: `<h1>` واحد بس (موضوع الصفحة)، وتحته `<h2>` للأقسام، وتحت كل واحد `<h3>`... **متختارش عنوان عشان حجمه** — الحجم شغل CSS. محركات البحث وقارئ الشاشة بيعتمدوا على ترتيب العناوين، والمستخدم الكفيف بيتنقّل بيها زي الفهرس.',
            'Headings build the page’s **outline**: a single `<h1>` (the page’s topic), `<h2>` for sections under it, and `<h3>` under each of those... **Never choose a heading for its size** — size is CSS’s job. Search engines and screen readers rely on heading order, and a blind user moves through them like a table of contents.'),
          ex: '<h1>Nile Store: annual report</h1>\n<h2>Sales</h2>\n<h3>By city</h3>\n<p>Cairo leads with 42% of revenue.</p>\n<h3>By product</h3>\n<p>Notebooks sold the most units.</p>\n<h2>Customers</h2>\n<p>1,240 active customers this year.</p>', run: 'html' },
        { h: B('النص: فقرات وتأكيد واقتباس', 'Text: paragraphs, emphasis and quotes'),
          p: B('`<p>` للفقرة. `<strong>` لكلام **مهم** و`<em>` للتأكيد (مش لمجرد bold/italic — دي معاني). `<blockquote>` لاقتباس طويل و`<q>` لقصير، و`<cite>` لاسم المصدر. `<mark>` لتمييز كلمة، و`<small>` للملاحظات الصغيرة، و`<code>` لكود، و`<pre>` لنص محتفظ بمسافاته. و`<sub>`/`<sup>` للأسفل والأعلى (H₂O و10²).',
            '`<p>` for a paragraph. `<strong>` for **important** words and `<em>` for emphasis (not merely bold/italic — these carry meaning). `<blockquote>` for a long quote and `<q>` for a short one, with `<cite>` for the source’s name. `<mark>` to highlight a word, `<small>` for side notes, `<code>` for code and `<pre>` for text that keeps its spacing. And `<sub>`/`<sup>` for below and above (H₂O and 10²).'),
          ex: '<p>Orders must be paid <strong>before 5 pm</strong> to ship <em>the same day</em>.</p>\n<blockquote>The best automation is the one nobody notices.<br><cite>— a happy client</cite></blockquote>\n<p>Search the log for <mark>ERROR</mark>, then run <code>npm test</code>.</p>\n<p>Area: 120 m<sup>2</sup> · Water: H<sub>2</sub>O</p>\n<pre>Item     Qty\nPen       10</pre>', run: 'html' },
        { h: B('التعليقات والتحقق من الصفحة', 'Comments and checking the page'),
          p: B('`<!-- ملاحظة -->` تعليق مش بيظهر في الصفحة (بس بيظهر لأي حد يفتح المصدر — متكتبش فيه أسرار). المتصفح متسامح جدًا: بيعرض صفحات فيها أخطاء، فمش هتعرف إنها غلط. اعمل **validation** لصفحاتك على validator.w3.org، وشوف «View page source» (Ctrl+U) و«Inspect» (كليك يمين) عشان تفهم أي موقع اتعمل إزاي.',
            '`<!-- note -->` is a comment that does not show on the page (but anyone opening the source sees it — never write secrets in it). The browser is very forgiving: it displays pages full of mistakes, so you will not know they are wrong. **Validate** your pages at validator.w3.org, and use «View page source» (Ctrl+U) and «Inspect» (right-click) to learn how any site was built.'),
          ex: '<!-- The banner below changes every season -->\n<h2>Back-to-school offer</h2>\n<p>Every notebook is 20% off until Friday.\n<p>This paragraph was never closed above, yet the browser still shows it fine.</p>', run: 'html' }
      ],
      practice: [
        B('اكتب هيكل صفحة كامل بالعربي (lang وdir وcharset وviewport وtitle وdescription).', 'Write a complete Arabic page skeleton (lang, dir, charset, viewport, title and description).'),
        B('اكتب صفحة «عن الشركة» بـ h1 واحد و3 h2 وتحت كل واحد h3 أو فقرة.', 'Write an «about the company» page with one h1, three h2s and an h3 or paragraph under each.'),
        B('استخدم strong وem وmark وcode وblockquote في فقرتين بمعناهم الصح.', 'Use strong, em, mark, code and blockquote in two paragraphs, each for its proper meaning.'),
        B('افتح «View page source» لـ 3 مواقع وعدّ الـ h1 في كل واحد.', 'Open «View page source» for 3 sites and count the h1s in each.'),
        B('اعمل validation لصفحتك على validator.w3.org وصلّح كل الأخطاء.', 'Validate your page at validator.w3.org and fix every error.'),
        B('اكتب في تعليق HTML ليه اخترت كل عنوان.', 'Write in an HTML comment why you chose each heading.')
      ],
      code: [
        { u: B('قالب صفحة عربي', 'An Arabic page template'), p: '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>عنوان الصفحة</title>\n  <meta name="description" content="وصف قصير يظهر في نتايج البحث">\n  <link rel="stylesheet" href="style.css">\n  <script src="app.js" defer></script>\n</head>\n<body>\n  <h1>عنوان الصفحة</h1>\n</body>\n</html>', lang: 'html', show: 1 }
      ],
      words: [
        { t: 'HTML', m: B('لغة وصف محتوى صفحات الويب ومعناه', 'the language describing web pages’ content and meaning'), ex: '<p>Hello</p>' },
        { t: 'tag', m: B('الوسم بين < > زي <p> و</p>', 'the marker between < > such as <p> and </p>'), ex: '<h1>' },
        { t: 'attribute', m: B('خاصية جوه وسم الفتح بتدّي معلومة زيادة', 'a setting inside an opening tag giving extra information'), ex: 'href="…"' },
        { t: 'doctype', m: B('أول سطر بيقول للمتصفح إن ده HTML حديث', 'the first line telling the browser this is modern HTML'), ex: '<!doctype html>' },
        { t: 'heading', m: B('عنوان h1 لـ h6 بيعمل فهرس الصفحة', 'an h1–h6 title building the page’s outline'), ex: '<h2>Sales</h2>' },
        { t: 'viewport', m: B('إعداد بيخلي الصفحة تتعرض صح على الموبايل', 'a setting that makes the page display correctly on phones'), ex: '<meta name="viewport" …>' },
        { t: 'validator', m: B('أداة بتفحص كود HTML وتطلّع أخطاءه', 'a tool checking HTML and listing its errors'), ex: 'validator.w3.org' }
      ],
      read: [{ lib: 'MDN: HTML basics', what: B('الصفحة كلها (Anatomy of an HTML element وAnatomy of an HTML document).', 'The whole page (Anatomy of an HTML element and Anatomy of an HTML document).') },
        { lib: 'web.dev: Learn HTML', what: B('Overview of HTML وDocument structure وHeadings and sections.', 'Overview of HTML, Document structure, and Headings and sections.') }],
      challenge: B('اعمل صفحة «تقرير شهري» حقيقية لشغلك بالعربي: هيكل كامل، وh1 واحد، و4 أقسام h2 بعناوين فرعية، وفقرات فيها strong وem وmark في أماكنها الصح، واقتباس من عميل — وتعدّي الـ validator من غير ولا خطأ.', 'Build a real «monthly report» page for your work in Arabic: a complete skeleton, one h1, four h2 sections with sub-headings, paragraphs using strong, em and mark in the right places, and a customer quote — passing the validator with zero errors.'),
      quiz: [
        { q: B('عدد h1 المثالي في الصفحة:', 'The ideal number of h1s on a page:'), o: ['1', '3', B('على حسب الحجم', 'depends on size')], a: 0, why: B('موضوع الصفحة.', 'The page’s topic.') },
        { q: B('عشان العربي يظهر صح لازم:', 'For Arabic to display correctly you need:'), o: ['<meta charset="utf-8">', '<meta name="arabic">', '<html lang="en">'], a: 0, why: B('الترميز.', 'The encoding.') },
        { q: B('`<strong>` معناه:', '`<strong>` means:'), o: [B('كلام مهم', 'important words'), B('خط تخين بس', 'just bold'), B('عنوان', 'a heading')], a: 0, why: B('معنى مش شكل.', 'Meaning, not looks.') },
        { q: B('التعليق `<!-- -->`:', 'A `<!-- -->` comment:'), o: [B('بيبان لأي حد يفتح المصدر', 'is visible to anyone viewing the source'), B('سري تمامًا', 'is completely secret'), B('بيظهر في الصفحة', 'shows on the page')], a: 0, why: B('متكتبش فيه أسرار.', 'Never write secrets in it.') }
      ] },

    { title: B('العناصر الدلالية والقوايم والروابط', 'Semantic elements, lists and links'),
      goal: B('تقسّم الصفحة بعناصر بمعنى (header وnav وmain وarticle...)، وتعمل قوايم بأنواعها، وروابط داخلية وخارجية صح.', 'Divide the page with meaningful elements (header, nav, main, article...), make every kind of list, and write correct internal and external links.'),
      learn: [
        { h: B('العناصر الدلالية بدل div', 'Semantic elements instead of div'),
          p: B('بدل `<div>` لكل حاجة، HTML عنده عناصر بتقول **الجزء ده إيه**: `<header>` (رأس الصفحة أو القسم)، و`<nav>` (روابط التنقل)، و`<main>` (المحتوى الأساسي — واحد بس)، و`<article>` (محتوى مستقل زي مقال أو منتج)، و`<section>` (قسم بعنوان)، و`<aside>` (محتوى جانبي)، و`<footer>`. ده بيفيد البحث وقارئ الشاشة وزميلك اللي بيقرا الكود.',
            'Instead of a `<div>` for everything, HTML has elements that say **what the part is**: `<header>` (the page’s or a section’s head), `<nav>` (navigation links), `<main>` (the main content — only one), `<article>` (self-contained content such as a post or a product), `<section>` (a titled section), `<aside>` (side content) and `<footer>`. It helps search, screen readers and the colleague reading your code.'),
          ex: '<header><h1>Nile Store</h1>\n  <nav><a href="#products">Products</a> · <a href="#offers">Offers</a> · <a href="#contact">Contact</a></nav>\n</header>\n<main>\n  <section id="offers"><h2>Offers</h2>\n    <article><h3>Back to school</h3><p>Notebooks 20% off.</p></article>\n  </section>\n  <aside>Free delivery above 1,000 EGP.</aside>\n</main>\n<footer>© 2026 Nile Store · <a href="#contact">Contact us</a></footer>', run: 'html' },
        { h: B('div وspan: لما مفيش معنى', 'div and span: when there is no meaning'),
          p: B('`<div>` صندوق block (بياخد سطر كامل) و`<span>` صندوق inline (جوه السطر) — **مالهمش معنى**، بيستخدموا للتنسيق وللـ JS لما مفيش عنصر دلالي مناسب. القاعدة: اسأل «فيه عنصر بيوصف ده؟» الأول؛ لو لأ، div أو span. الفرق بين block وinline هيبقى مهم جدًا في CSS.',
            '`<div>` is a block box (it takes a full line) and `<span>` an inline box (inside the line) — **they carry no meaning**, used for styling and JS when no semantic element fits. The rule: first ask «is there an element that describes this?»; if not, div or span. The block/inline difference will matter a lot in CSS.'),
          ex: '<div style="border:1px solid #ccc;padding:8px">A div takes the full width.</div>\n<div style="border:1px solid #ccc;padding:8px">Another div starts on a new line.</div>\n<p>Price: <span style="background:#fde68a">450 EGP</span> — the span stays inside the line.</p>', run: 'html' },
        { h: B('القوايم: ul وol وdl', 'Lists: ul, ol and dl'),
          p: B('`<ul>` قايمة **من غير ترتيب** (نقط)، و`<ol>` قايمة **مرقّمة** (خطوات)، وكل عنصر `<li>`. `<ol start="5">` تبدأ من 5، و`reversed` بالعكس. `<dl>` قايمة **تعريفات**: `<dt>` المصطلح و`<dd>` معناه — ممتازة لمواصفات منتج. والقوايم بتتداخل: `<ul>` جوه `<li>`. القايمة العلوية في أي موقع غالبًا `<nav><ul>...`.',
            '`<ul>` is an **unordered** list (bullets), `<ol>` an **ordered** one (steps), each item an `<li>`. `<ol start="5">` starts at 5, and `reversed` counts down. `<dl>` is a **description** list: `<dt>` the term and `<dd>` its meaning — great for product specs. Lists nest: a `<ul>` inside an `<li>`. Any site’s top menu is usually `<nav><ul>...`.'),
          ex: '<h3>How to order</h3>\n<ol>\n  <li>Pick your products</li>\n  <li>Fill in your address\n    <ul><li>Governorate</li><li>Street and building</li></ul>\n  </li>\n  <li>Pay on delivery or by card</li>\n</ol>\n<h3>Specs</h3>\n<dl>\n  <dt>Weight</dt><dd>1.2 kg</dd>\n  <dt>Warranty</dt><dd>12 months</dd>\n</dl>', run: 'html' },
        { h: B('الروابط: خارجية وداخلية وإيميل', 'Links: external, internal and email'),
          p: B('`<a href="...">نص</a>`. **خارجي**: `href="https://..."` ومعاه `target="_blank" rel="noopener"` لو هيفتح في تاب جديد. **صفحة تانية في موقعك**: `href="about.html"` (مسار نسبي). **مكان في نفس الصفحة**: `href="#contact"` لعنصر عنده `id="contact"`. **إيميل**: `href="mailto:help@x.com"` و**تليفون**: `href="tel:+201012345678"`. نص الرابط يقول هيروح فين، مش «اضغط هنا».',
            '`<a href="...">text</a>`. **External**: `href="https://..."` with `target="_blank" rel="noopener"` when it opens a new tab. **Another page of your site**: `href="about.html"` (a relative path). **A spot on the same page**: `href="#contact"` for an element with `id="contact"`. **Email**: `href="mailto:help@x.com"` and **phone**: `href="tel:+201012345678"`. The link text says where it goes, not «click here».'),
          ex: '<p><a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN web docs</a> (new tab)</p>\n<p><a href="#hours">Jump to opening hours</a></p>\n<p><a href="mailto:help@nile.example?subject=Order%20question">Email support</a> · <a href="tel:+201012345678">Call us</a></p>\n<p style="margin-top:40px" id="hours"><strong>Opening hours:</strong> 9 am – 9 pm, every day.</p>', run: 'html' },
        { h: B('المسارات النسبية والمطلقة', 'Relative and absolute paths'),
          p: B('**مطلق**: العنوان كامل `https://site.com/img/logo.png`. **نسبي** من مكان الصفحة: `img/logo.png` (فولدر img جنب الصفحة)، و`../style.css` (فولدر لفوق)، و`/img/logo.png` (من أول الموقع). النسبي أحسن لملفات موقعك (بيشتغل محلي وعلى السيرفر). أغلب «الصورة مش ظاهرة» سببها مسار غلط أو اختلاف حروف كبيرة وصغيرة على السيرفر.',
            '**Absolute**: the full address `https://site.com/img/logo.png`. **Relative** to the page’s location: `img/logo.png` (an img folder beside the page), `../style.css` (one folder up), and `/img/logo.png` (from the site root). Relative is better for your own files (it works locally and on the server). Most «the image does not show» cases are a wrong path or a capital/small letter mismatch on the server.'),
          ex: 'site/\n  index.html          ← <img src="img/logo.png">  and  <a href="shop/list.html">\n  img/logo.png\n  shop/\n    list.html         ← <img src="../img/logo.png">  and  <a href="../index.html">\n  css/style.css       ← from index.html: <link href="css/style.css">', show: 1, lang: 'text' }
      ],
      practice: [
        B('حوّل صفحة كلها div لعناصر دلالية (header وnav وmain وsection وarticle وaside وfooter).', 'Turn an all-div page into semantic elements (header, nav, main, section, article, aside, footer).'),
        B('اعمل قايمة خطوات مرقّمة فيها قايمة نقط متداخلة.', 'Make a numbered steps list with a nested bullet list.'),
        B('اكتب مواصفات منتج بـ dl وdt وdd.', 'Write product specs with dl, dt and dd.'),
        B('اعمل 6 روابط: خارجي، وصفحة تانية، ومكان في الصفحة، وإيميل بموضوع، وتليفون، وملف PDF.', 'Make 6 links: external, another page, a spot on the page, an email with a subject, a phone, and a PDF file.'),
        B('اعمل فولدر موقع بـ 3 صفحات في فولدرات مختلفة وربطهم بمسارات نسبية.', 'Build a site folder with 3 pages in different folders and link them with relative paths.'),
        B('صلّح 5 روابط نصها «اضغط هنا» لنص بيوصف.', 'Fix 5 links whose text is «click here» into descriptive text.')
      ],
      code: [
        { u: B('هيكل صفحة شركة', 'A company page outline'), p: '<header>\n  <a href="index.html">Logo</a>\n  <nav><ul><li><a href="#services">Services</a></li><li><a href="#work">Work</a></li><li><a href="#contact">Contact</a></li></ul></nav>\n</header>\n<main>\n  <section id="services"><h2>Services</h2></section>\n  <section id="work"><h2>Work</h2></section>\n  <section id="contact"><h2>Contact</h2></section>\n</main>\n<footer>…</footer>', lang: 'html', show: 1 }
      ],
      words: [
        { t: 'semantic HTML', m: B('عناصر بتقول الجزء ده معناه إيه', 'elements saying what each part means'), ex: '<nav>, <article>' },
        { t: 'nav', m: B('عنصر روابط التنقل', 'the navigation links element'), ex: '<nav>…</nav>' },
        { t: 'block element', m: B('عنصر بياخد سطر كامل لوحده', 'an element taking a full line of its own'), ex: '<div>, <p>' },
        { t: 'inline element', m: B('عنصر بيفضل جوه السطر', 'an element staying inside the line'), ex: '<span>, <a>' },
        { t: 'anchor', m: B('الرابط <a>، وكمان مكان في الصفحة بـ #id', 'the <a> link, and also a spot on the page via #id'), ex: '<a href="#contact">' },
        { t: 'relative path', m: B('مسار ملف من مكان الصفحة الحالية', 'a file path from the current page’s location'), ex: '../img/logo.png' },
        { t: 'absolute URL', m: B('عنوان كامل بالبروتوكول والدومين', 'a full address with protocol and domain'), ex: 'https://site.com/a.png' }
      ],
      read: [{ lib: 'MDN: HTML elements reference', what: B('Content sectioning وText content (اقرا أول 8 عناصر في كل جزء).', 'Content sectioning and Text content (read the first 8 elements in each).') },
        { lib: 'web.dev: Learn HTML', what: B('Lists وLinks.', 'Lists and Links.') }],
      challenge: B('اعمل موقع صغير من 3 صفحات (الرئيسية والخدمات والتواصل) في فولدرات: نفس الـ header والـ nav والـ footer في الكل، وكل صفحة عناصر دلالية بس (div واحد على الأكثر)، وقايمة خدمات مرقّمة وقايمة مواصفات dl، وروابط داخلية وخارجية وإيميل وتليفون — والتنقل بينهم شغال محلي.', 'Build a small 3-page site (home, services, contact) in folders: the same header, nav and footer on all, each page using semantic elements only (one div at most), a numbered services list and a dl of specs, plus internal, external, email and phone links — with navigation working locally.'),
      quiz: [
        { q: B('المحتوى الأساسي للصفحة في:', 'The page’s main content goes in:'), o: ['<main>', '<aside>', '<header>'], a: 0, why: B('واحد بس في الصفحة.', 'Only one per page.') },
        { q: B('قايمة خطوات بالترتيب:', 'A list of steps in order:'), o: ['<ol>', '<ul>', '<dl>'], a: 0, why: B('مرقّمة.', 'Numbered.') },
        { q: B('رابط لعنصر id="faq" في نفس الصفحة:', 'A link to an element with id="faq" on the same page:'), o: ['href="#faq"', 'href="faq"', 'href="/faq.html"'], a: 0, why: B('# + id.', '# + id.') },
        { q: B('`<span>`:', '`<span>`:'), o: [B('inline من غير معنى', 'inline with no meaning'), B('block بمعنى', 'block with meaning'), B('عنوان', 'a heading')], a: 0, why: B('للتنسيق جوه السطر.', 'For styling inside a line.') }
      ] },

    { title: B('الصور والجداول والميديا', 'Images, tables and media'),
      goal: B('تحط صور صح (alt والمقاسات والأداء)، وتعمل جداول بيانات مفهومة، وتضمّن فيديو وصوت وiframe بأمان.', 'Place images correctly (alt, sizes and performance), build understandable data tables, and embed video, audio and iframes safely.'),
      learn: [
        { h: B('img وalt', 'img and alt'),
          p: B('`<img src="..." alt="..." width="..." height="...">`. **alt** مش اختياري: بيوصف الصورة لقارئ الشاشة ولما الصورة متحمّلش ولمحركات البحث. اكتب **اللي الصورة بتوصّله**: «شنطة ظهر زرقا بجيبين» مش «صورة». لو الصورة زينة بس: `alt=""`. حط width وheight عشان الصفحة متتنططش وهي بتحمّل.',
            '`<img src="..." alt="..." width="..." height="...">`. **alt** is not optional: it describes the image to screen readers, when the image fails to load, and to search engines. Write **what the image conveys**: «a blue backpack with two pockets», not «image». If it is purely decorative: `alt=""`. Set width and height so the page does not jump while loading.'),
          ex: '<img src="https://picsum.photos/seed/bag/220/140" alt="A blue backpack with two front pockets" width="220" height="140">\n<img src="https://example.invalid/missing.jpg" alt="Sales chart for September: Cairo leads" width="220" height="60">\n<p>The second image failed to load, so its alt text shows instead.</p>', run: 'html' },
        { h: B('figure والأداء', 'figure and performance'),
          p: B('`<figure>` بيلم صورة (أو رسم أو كود) مع `<figcaption>` تعليقها. للأداء: `loading="lazy"` للصور تحت الصفحة (متحمّلش غير لما تقرب)، وصيغ حديثة (WebP/AVIF) أصغر بكتير من JPG، وصورة بمقاس العرض (متحطش صورة 4000 بكسل في مكان 300). الصور غالبًا أتقل حاجة في الصفحة.',
            '`<figure>` groups an image (or a drawing, or code) with its `<figcaption>`. For performance: `loading="lazy"` for images lower on the page (they load only as you approach), modern formats (WebP/AVIF) that are much smaller than JPG, and an image sized for its display (do not put a 4000-pixel image in a 300-pixel spot). Images are usually the heaviest thing on a page.'),
          ex: '<figure>\n  <img src="https://picsum.photos/seed/shop/300/120" alt="The shop front at night" width="300" height="120" loading="lazy">\n  <figcaption>Our Heliopolis branch, opened in 2025.</figcaption>\n</figure>', run: 'html' },
        { h: B('الجداول للبيانات', 'Tables for data'),
          p: B('`<table>` **للبيانات الجدولية بس** (مش لتنسيق الصفحة). الهيكل: `<caption>` عنوان الجدول، و`<thead>` فيه صف العناوين بـ `<th scope="col">`، و`<tbody>` فيه صفوف `<tr>` وخانات `<td>`، و`<tfoot>` للإجماليات. الـ `scope` بيخلي قارئ الشاشة يقول «المدينة: القاهرة» مع كل خانة.',
            '`<table>` is **for tabular data only** (not for page layout). The structure: `<caption>` the table’s title, `<thead>` holding the header row with `<th scope="col">`, `<tbody>` with `<tr>` rows and `<td>` cells, and `<tfoot>` for totals. `scope` lets a screen reader say «City: Cairo» with each cell.'),
          ex: '<table border="1" cellpadding="6">\n  <caption>Revenue by city — September</caption>\n  <thead><tr><th scope="col">City</th><th scope="col">Orders</th><th scope="col">Revenue (EGP)</th></tr></thead>\n  <tbody>\n    <tr><th scope="row">Cairo</th><td>42</td><td>128,500</td></tr>\n    <tr><th scope="row">Giza</th><td>25</td><td>77,300</td></tr>\n  </tbody>\n  <tfoot><tr><th scope="row">Total</th><td>67</td><td>205,800</td></tr></tfoot>\n</table>', run: 'html' },
        { h: B('دمج الخانات', 'Merging cells'),
          p: B('`colspan="2"` الخانة تاخد عمودين، و`rowspan="3"` تاخد 3 صفوف. مفيد لعناوين مجموعات (ربع أول = 3 شهور). بس استخدمه بحساب: الجداول المعقدة صعبة على الموبايل وقارئ الشاشة. لو الجدول عريض، حطه في div بـ `overflow-x: auto` عشان يتسحب جنب على الموبايل من غير ما يبوّظ الصفحة.',
            '`colspan="2"` makes a cell span two columns, and `rowspan="3"` three rows. Handy for group titles (Q1 = 3 months). But use it sparingly: complex tables are hard on phones and screen readers. If the table is wide, put it in a div with `overflow-x: auto` so it scrolls sideways on phones without breaking the page.'),
          ex: '<div style="overflow-x:auto">\n<table border="1" cellpadding="6">\n  <thead>\n    <tr><th rowspan="2" scope="col">Branch</th><th colspan="3" scope="colgroup">Q1 sales (EGP)</th></tr>\n    <tr><th scope="col">Jan</th><th scope="col">Feb</th><th scope="col">Mar</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Cairo</th><td>40,000</td><td>38,500</td><td>51,200</td></tr>\n    <tr><th scope="row">Alex</th><td>22,000</td><td>24,900</td><td>23,100</td></tr>\n  </tbody>\n</table>\n</div>', run: 'html' },
        { h: B('الفيديو والصوت والـ iframe', 'Video, audio and iframes'),
          p: B('`<video src controls width>` و`<audio src controls>` بيشغّلوا ميديا من غير مكتبات؛ `controls` بتظهر أزرار التشغيل، ومتخليش الفيديو يشتغل بصوت لوحده. `<iframe src>` بيحط صفحة جوه صفحة (خريطة، فيديو يوتيوب، فورم). للأمان: `<iframe sandbox>` بيمنع الصفحة اللي جوه من حاجات كتير، وحط `title` يوصفه. (الأمثلة هنا نفسها شغالة جوه iframe معزول!)',
            '`<video src controls width>` and `<audio src controls>` play media with no libraries; `controls` shows the play buttons, and never autoplay video with sound. `<iframe src>` puts a page inside a page (a map, a YouTube video, a form). For safety: `<iframe sandbox>` blocks the inner page from many things, and give it a `title` describing it. (The examples here themselves run inside an isolated iframe!)'),
          ex: '<video controls width="260" preload="none" poster="https://picsum.photos/seed/video/260/146">\n  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">\n  Your browser cannot play this video.\n</video>\n<audio controls preload="none" src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>\n<iframe title="A tiny embedded page" sandbox srcdoc="<p style=\'font-family:sans-serif\'>I am a page inside a page.</p>" width="260" height="60"></iframe>', run: 'html' }
      ],
      practice: [
        B('اكتب alt صح لـ 6 صور (منتج، رسم بياني، لوجو، صورة زينة، فريق العمل، خريطة).', 'Write correct alt text for 6 images (a product, a chart, a logo, a decorative image, the team, a map).'),
        B('اعمل figure بصورة lazy وتعليق.', 'Make a figure with a lazy image and a caption.'),
        B('اعمل جدول مبيعات كامل بـ caption وthead وtbody وtfoot وscope.', 'Build a complete sales table with caption, thead, tbody, tfoot and scope.'),
        B('اعمل جدول فيه colspan وrowspan لربعين في السنة.', 'Build a table with colspan and rowspan for two quarters of the year.'),
        B('حط جدول عريض في div بـ overflow-x وجرّبه بمقاس موبايل (Ctrl+Shift+M).', 'Put a wide table in a div with overflow-x and try it at phone size (Ctrl+Shift+M).'),
        B('ضمّن فيديو بـ controls وخريطة في iframe بـ title.', 'Embed a video with controls and a map in an iframe with a title.')
      ],
      code: [
        { u: B('صورة متجاوبة بأحجام', 'A responsive image with sizes'), p: '<img\n  src="bag-600.webp"\n  srcset="bag-300.webp 300w, bag-600.webp 600w, bag-1200.webp 1200w"\n  sizes="(max-width: 600px) 100vw, 300px"\n  alt="A blue backpack with two front pockets"\n  width="300" height="200" loading="lazy">', lang: 'html', show: 1 }
      ],
      words: [
        { t: 'alt text', m: B('وصف نصي للصورة لقارئ الشاشة ولو محمّلتش', 'a text description of an image for screen readers and failed loads'), ex: 'alt="A blue backpack"' },
        { t: 'lazy loading', m: B('تأجيل تحميل الصور لحد ما المستخدم يقرب منها', 'delaying images until the user nears them'), ex: 'loading="lazy"' },
        { t: 'caption', m: B('عنوان أو تعليق لجدول أو صورة', 'a title or caption for a table or image'), ex: '<caption>' },
        { t: 'table header', m: B('خانة عنوان <th> لعمود أو صف', 'a <th> heading cell for a column or row'), ex: '<th scope="col">City</th>' },
        { t: 'colspan', m: B('خانة بتاخد أكتر من عمود', 'a cell spanning several columns'), ex: 'colspan="3"' },
        { t: 'iframe', m: B('صفحة جوه صفحة', 'a page inside a page'), ex: '<iframe src="…" title="Map">' },
        { t: 'embed', m: B('تحط محتوى من مكان تاني جوه صفحتك', 'to place content from elsewhere inside your page'), ex: 'embed a video' }
      ],
      read: [{ lib: 'MDN: HTML elements reference', what: B('img وfigure وtable وvideo وiframe: Usage notes وAccessibility.', 'img, figure, table, video and iframe: Usage notes and Accessibility.') },
        { lib: 'web.dev: Learn HTML', what: B('Images وTables وAudio and video.', 'Images, Tables, and Audio and video.') }],
      challenge: B('اعمل صفحة «كتالوج» فيها 6 منتجات كـ article (صورة lazy بـ alt حقيقي وعنوان وسعر وقايمة مواصفات dl)، وجدول مقارنة أسعار بـ caption وthead وtbody وtfoot وscope وcolspan، وفيديو تعريفي بـ poster — وكلها تشتغل على الموبايل من غير سكرول جانبي للصفحة.', 'Build a «catalogue» page with 6 products as articles (a lazy image with real alt text, a title, a price and a dl of specs), a price comparison table with caption, thead, tbody, tfoot, scope and colspan, and an intro video with a poster — all working on a phone with no sideways page scroll.'),
      quiz: [
        { q: B('alt لصورة زينة بس:', 'alt for a purely decorative image:'), o: ['alt=""', B('من غير alt', 'no alt at all'), 'alt="image"'], a: 0, why: B('قارئ الشاشة يتجاهلها.', 'Screen readers skip it.') },
        { q: B('الجداول تستخدم لـ:', 'Tables are for:'), o: [B('بيانات جدولية', 'tabular data'), B('تنسيق الصفحة', 'page layout'), B('القوايم', 'lists')], a: 0, why: B('التخطيط شغل CSS.', 'Layout is CSS’s job.') },
        { q: B('`scope="col"` على th بيفيد:', '`scope="col"` on a th helps:'), o: [B('قارئ الشاشة يربط العنوان بالخانات', 'screen readers link the heading to its cells'), B('الشكل', 'the looks'), B('السرعة', 'speed')], a: 0, why: B('إمكانية الوصول.', 'Accessibility.') },
        { q: B('`loading="lazy"` على صورة:', '`loading="lazy"` on an image:'), o: [B('تتحمّل لما تقرب منها', 'loads as you approach it'), B('متتحمّلش خالص', 'never loads'), B('تتحمّل أول حاجة', 'loads first')], a: 0, why: B('أداء.', 'Performance.') }
      ] },

    { title: B('الفورمز: الحقول والتحقق', 'Forms: fields and validation'),
      goal: B('تبني فورمز كاملة بالحقول المناسبة والعناوين، وتتحقق من المدخلات من غير JS، وتعرف إزاي الفورم بيبعت بياناته.', 'Build complete forms with the right fields and labels, validate input without JS, and know how a form sends its data.'),
      learn: [
        { h: B('form وlabel وinput', 'form, label and input'),
          p: B('`<form>` بيلم الحقول. كل حقل محتاج **label** مربوط بيه: `<label for="email">الإيميل</label><input id="email" name="email">` — الضغط على العنوان بيروح للحقل، وقارئ الشاشة بيقراه. **name** هو اسم الحقل في البيانات اللي هتتبعت (زي اسم العمود). من غير name الحقل مش بيتبعت خالص.',
            '`<form>` groups the fields. Every field needs a **label** tied to it: `<label for="email">Email</label><input id="email" name="email">` — clicking the label goes to the field, and screen readers read it. **name** is the field’s name in the data that will be sent (like a column name). Without name the field is not sent at all.'),
          ex: '<form>\n  <p><label for="full">Full name</label><br><input id="full" name="fullName" autocomplete="name"></p>\n  <p><label for="em">Email</label><br><input id="em" name="email" type="email" autocomplete="email"></p>\n  <p><label><input type="checkbox" name="newsletter"> Send me offers</label></p>\n  <button type="submit">Send</button>\n</form>', run: 'html' },
        { h: B('أنواع الحقول', 'Field types'),
          p: B('`type` بيغيّر الحقل والكيبورد على الموبايل: `email` و`tel` (كيبورد أرقام) و`number` (بـ min وmax وstep) و`date` و`time` و`url` و`password` و`search` و`color` و`range` و`file`. و`<textarea>` لنص طويل، و`<select>` مع `<option>` لاختيار من قايمة، وradio لاختيار واحد من مجموعة (نفس الـ name)، وcheckbox لنعم/لا.',
            '`type` changes the field and the phone keyboard: `email`, `tel` (a number pad), `number` (with min, max and step), `date`, `time`, `url`, `password`, `search`, `color`, `range` and `file`. Plus `<textarea>` for long text, `<select>` with `<option>` for picking from a list, radio buttons for one choice in a group (same name), and checkboxes for yes/no.'),
          ex: '<form style="display:grid;gap:6px;max-width:320px">\n  <label>Phone <input type="tel" name="phone" placeholder="010…"></label>\n  <label>Quantity <input type="number" name="qty" min="1" max="99" value="1"></label>\n  <label>Delivery date <input type="date" name="date"></label>\n  <label>City <select name="city"><option value="">Choose…</option><option>Cairo</option><option>Giza</option></select></label>\n  <fieldset><legend>Payment</legend>\n    <label><input type="radio" name="pay" value="cash" checked> Cash</label>\n    <label><input type="radio" name="pay" value="card"> Card</label>\n  </fieldset>\n  <label>Notes <textarea name="notes" rows="2"></textarea></label>\n</form>', run: 'html' },
        { h: B('التحقق من غير JS', 'Validation without JS'),
          p: B('المتصفح بيتحقق لوحده لو قلتله: `required` (مطلوب)، و`minlength`/`maxlength` (طول النص)، و`min`/`max` (للأرقام والتواريخ)، و`pattern` (Regex: `pattern="01[0-9]{9}"` لموبايل مصري)، و`type="email"` بيتأكد من الشكل. لو فيه غلط، الفورم مش بيتبعت وبيظهر رسالة. حط `title` يشرح الصيغة المطلوبة. **لكن** ده للتجربة الحلوة بس — السيرفر لازم يتحقق تاني دايمًا.',
            'The browser validates by itself when told: `required`, `minlength`/`maxlength` (text length), `min`/`max` (for numbers and dates), `pattern` (a regex: `pattern="01[0-9]{9}"` for an Egyptian mobile) and `type="email"` checks the shape. If something is wrong, the form is not sent and a message appears. Add a `title` explaining the expected format. **But** this is only for a pleasant experience — the server must always validate again.'),
          ex: '<form id="f">\n  <p><label>Mobile <input name="phone" required pattern="01[0-9]{9}" title="11 digits starting with 01"></label></p>\n  <p><label>Quantity <input name="qty" type="number" required min="1" max="50"></label></p>\n  <p><label>Email <input name="email" type="email" required></label></p>\n  <button>Check</button>\n</form>\n<p id="out"></p>\n<script>\n  const f = document.querySelector("#f");\n  f.phone.value = "123"; f.qty.value = "80"; f.email.value = "nope";\n  const report = [...f.elements].filter(e => e.name).map(e => e.name + ": " + (e.validity.valid ? "ok" : e.validationMessage));\n  document.querySelector("#out").textContent = report.join(" | ");\n</script>', run: 'html' },
        { h: B('إزاي الفورم بيبعت', 'How a form sends'),
          p: B('`<form action="/orders" method="post">` بيبعت الحقول للعنوان ده: `method="get"` بيحطهم في الرابط (`?city=Cairo&qty=2` — للبحث بس)، و`post` في الـ body (للبيانات والطلبات). الإرسال العادي بيعمل **تحميل صفحة جديد**. في الأتمتة غالبًا هتمنع ده بـ JS وتبعت بـ fetch لـ webhook في n8n (أسبوع 12 و14) — بس اعرف الأساس ده.',
            '`<form action="/orders" method="post">` sends the fields to that address: `method="get"` puts them in the link (`?city=Cairo&qty=2` — for searches only), and `post` in the body (for data and orders). A normal submit **loads a new page**. In automation you will usually prevent that with JS and send with fetch to an n8n webhook (weeks 12 and 14) — but know this foundation.'),
          ex: '<form action="https://httpbin.org/get" method="get" target="_blank">\n  <label>Search <input name="q" value="notebook"></label>\n  <label>City <select name="city"><option>Cairo</option><option>Giza</option></select></label>\n  <button>Search (opens a new tab)</button>\n</form>\n<p>The new tab shows exactly which fields were sent, and how.</p>', run: 'html' },
        { h: B('فورمز سهلة الاستخدام', 'User-friendly forms'),
          p: B('حقول أقل = ناس أكتر تكمّل: اطلب الضروري بس. استخدم `autocomplete` (`name` و`email` و`tel` و`street-address`) عشان المتصفح يملا لوحده. الـ placeholder **مش** بديل للـ label (بيختفي لما تكتب). جمّع الحقول المرتبطة بـ `<fieldset>` و`<legend>`. وخلي الأخطاء واضحة جنب الحقل نفسه.',
            'Fewer fields = more people finishing: ask only for what is essential. Use `autocomplete` (`name`, `email`, `tel`, `street-address`) so the browser fills in for the user. A placeholder is **not** a replacement for a label (it disappears as you type). Group related fields with `<fieldset>` and `<legend>`. And make errors clear, next to the field itself.'),
          ex: '<form style="max-width:340px">\n  <fieldset>\n    <legend>Delivery address</legend>\n    <p><label for="st">Street and building</label><br><input id="st" name="street" autocomplete="street-address" required></p>\n    <p><label for="gov">Governorate</label><br><input id="gov" name="governorate" autocomplete="address-level1" required></p>\n    <p><label for="ph">Mobile</label><br><input id="ph" name="phone" type="tel" autocomplete="tel" required></p>\n  </fieldset>\n  <button type="submit">Confirm order</button>\n</form>', run: 'html' }
      ],
      practice: [
        B('اعمل فورم تواصل بـ 4 حقول، كل واحد بـ label مربوط وname.', 'Build a contact form with 4 fields, each with a linked label and a name.'),
        B('استخدم 8 أنواع حقول مختلفة في فورم طلب.', 'Use 8 different field types in an order form.'),
        B('ضيف required وpattern وmin/max وجرّب تبعت بيانات غلط.', 'Add required, pattern and min/max, and try submitting bad data.'),
        B('اعمل فورم بحث بـ GET لـ httpbin.org وشوف الرابط.', 'Build a search form using GET to httpbin.org and look at the link.'),
        B('جمّع حقول العنوان في fieldset بـ legend وautocomplete.', 'Group the address fields in a fieldset with a legend and autocomplete.'),
        B('قلّل فورم «تسجيل» من 12 حقل لأقل عدد ضروري واكتب ليه.', 'Cut a 12-field «sign-up» form down to the essential minimum and write why.')
      ],
      code: [
        { u: B('موبايل مصري وكود خصم', 'An Egyptian mobile and a coupon code'), p: '<input name="phone" type="tel" required pattern="01[0125][0-9]{8}" title="An Egyptian mobile: 11 digits starting with 010, 011, 012 or 015" autocomplete="tel">\n<input name="coupon" pattern="[A-Z0-9]{5,10}" title="5–10 capital letters or digits" autocapitalize="characters">', lang: 'html', show: 1 }
      ],
      words: [
        { t: 'form', m: B('مجموعة حقول بتتبعت مع بعض', 'a group of fields sent together'), ex: '<form method="post">' },
        { t: 'label', m: B('عنوان الحقل المربوط بيه', 'the title tied to a field'), ex: '<label for="email">' },
        { t: 'input type', m: B('نوع الحقل اللي بيحدد شكله والكيبورد', 'the field type deciding its look and keyboard'), ex: '<input type="email">' },
        { t: 'required', m: B('الحقل لازم يتملا', 'the field must be filled in'), ex: '<input required>' },
        { t: 'pattern', m: B('Regex لازم القيمة تطابقه', 'a regex the value must match'), ex: 'pattern="01[0-9]{9}"' },
        { t: 'client-side validation', m: B('تحقق في المتصفح قبل الإرسال (والسيرفر لازم يتحقق تاني)', 'checking in the browser before sending (the server must check again)'), ex: 'required, min, pattern' },
        { t: 'autocomplete', m: B('خاصية بتخلي المتصفح يملا الحقل لوحده', 'an attribute letting the browser fill the field in'), ex: 'autocomplete="email"' }
      ],
      read: [{ lib: 'MDN: Web forms', what: B('Your first form وBasic native form controls وClient-side form validation.', 'Your first form, Basic native form controls and Client-side form validation.') },
        { lib: 'web.dev: Learn HTML', what: B('Forms.', 'Forms.') }],
      challenge: B('اعمل فورم «طلب عرض سعر» حقيقي لشغلك: بيانات العميل (fieldset)، والمنتجات (select وnumber)، وتاريخ التسليم (date بـ min النهارده)، والدفع (radio)، والملاحظات (textarea)، وموافقة على الشروط (checkbox required) — كل حقل بـ label وname وautocomplete والتحقق المناسب، ويبعت بـ GET لـ httpbin.org عشان تشوف البيانات.', 'Build a real «quote request» form for your work: customer details (a fieldset), products (select and number), delivery date (date with min = today), payment (radio), notes (textarea) and agreement to terms (a required checkbox) — each field with a label, name, autocomplete and the right validation, sent with GET to httpbin.org so you can see the data.'),
      quiz: [
        { q: B('الحقل اللي من غير name:', 'A field without a name:'), o: [B('مش بيتبعت', 'is not sent'), B('بيتبعت باسم فاضي', 'is sent with an empty name'), B('بيتبعت عادي', 'is sent normally')], a: 0, why: B('name = اسم البيانات.', 'name is the data’s name.') },
        { q: B('اختيار واحد من مجموعة:', 'One choice from a group:'), o: [B('radio بنفس الـ name', 'radio buttons with the same name'), B('checkbox', 'checkboxes'), 'textarea'], a: 0, why: B('نفس الاسم = مجموعة.', 'Same name = one group.') },
        { q: B('التحقق في المتصفح:', 'Validation in the browser:'), o: [B('للتجربة الحلوة والسيرفر يتحقق تاني', 'for a nice experience; the server checks again'), B('كفاية لوحده', 'enough on its own'), B('بيبطّأ', 'slows things down')], a: 0, why: B('أي حد يقدر يتخطاه.', 'Anyone can bypass it.') },
        { q: B('`method="get"` بيحط البيانات في:', '`method="get"` puts the data in:'), o: [B('الرابط', 'the link'), B('الـ body', 'the body'), B('الكوكيز', 'cookies')], a: 0, why: B('?q=… للبحث بس.', '?q=…, for searches only.') }
      ] },

    { title: B('HTML لكل الناس ولمحركات البحث', 'HTML for everyone, and for search engines'),
      goal: B('تكتب صفحات يقدر يستخدمها الكل (لوحة مفاتيح وقارئ شاشة)، وتجهّزها لمحركات البحث والمشاركة، وتراجعها بأدوات.', 'Write pages everyone can use (keyboard and screen reader), prepare them for search engines and sharing, and check them with tools.'),
      learn: [
        { h: B('إمكانية الوصول (a11y)', 'Accessibility (a11y)'),
          p: B('ملايين بيستخدموا الويب بقارئ شاشة، أو بالكيبورد بس، أو بنظر ضعيف. أغلب اللي محتاجينه **HTML صح**: عناوين بالترتيب، وlabel لكل حقل، وalt لكل صورة، وأزرار `<button>` حقيقية مش div، وروابط نصها مفهوم، و`lang` صح. اختبر بنفسك: امسك الماوس بعيد واستخدم الصفحة بـ Tab وEnter وSpace بس.',
            'Millions use the web with a screen reader, the keyboard alone, or weak eyesight. Most of what they need is **correct HTML**: headings in order, a label for every field, alt text for every image, real `<button>` buttons instead of divs, meaningful link text, and the right `lang`. Test it yourself: put the mouse aside and use the page with Tab, Enter and Space only.'),
          ex: '<p><button type="button" onclick="this.textContent=\'Saved ✓\'">Save (a real button: Tab + Enter works)</button></p>\n<p><span style="border:1px solid #999;padding:4px;cursor:pointer" onclick="this.textContent=\'Clicked\'">Fake button (a span: the keyboard cannot reach it)</span></p>\n<p>Press Tab inside this frame: only the real button gets the focus.</p>', run: 'html' },
        { h: B('الكيبورد والـ focus', 'The keyboard and focus'),
          p: B('العناصر التفاعلية الحقيقية (a بـ href، وbutton، وinput، وselect) بتاخد الـ **focus** لوحدها بالترتيب اللي في الـ HTML. متغيّرش الترتيب بـ `tabindex` موجب. متشيلش الـ outline (الإطار حوالين العنصر اللي عليه الـ focus) من غير بديل — المستخدم بالكيبورد بيتوه. ورابط «تخطى للمحتوى» في أول الصفحة بيوفّر عليه ضغطات كتير.',
            'Real interactive elements (a with href, button, input, select) receive **focus** by themselves, in the order of the HTML. Do not reorder with a positive `tabindex`. Never remove the outline (the frame around the focused element) without a replacement — keyboard users get lost. And a «skip to content» link at the top saves them many key presses.'),
          ex: '<a href="#content" style="display:inline-block;padding:4px 8px;background:#1f2937;color:#fff">Skip to content</a>\n<nav><a href="#a">Home</a> · <a href="#b">Shop</a> · <a href="#c">Blog</a> · <a href="#d">Help</a></nav>\n<main id="content" tabindex="-1"><h2>Main content</h2><p>The skip link jumps straight here.</p></main>', run: 'html' },
        { h: B('ARIA بحساب', 'ARIA, with care'),
          p: B('**ARIA** خصايص بتدّي معلومات زيادة لقارئ الشاشة لما HTML مش كفاية: `aria-label="Close"` لزرار عليه أيقونة بس، و`aria-live="polite"` لمكان بيتحدّث (رسالة «اتحفظ»)، و`aria-expanded` لقايمة بتتفتح. القاعدة الأولى لـ ARIA: **متستخدمش ARIA لو فيه عنصر HTML بيعمل نفس الحاجة** — `<button>` أحسن من `<div role="button">`.',
            '**ARIA** attributes give screen readers extra information when HTML is not enough: `aria-label="Close"` for an icon-only button, `aria-live="polite"` for a region that updates (a «saved» message), and `aria-expanded` for a menu that opens. The first rule of ARIA: **do not use ARIA when an HTML element does the job** — `<button>` beats `<div role="button">`.'),
          ex: '<button type="button" aria-label="Close the offer" onclick="document.getElementById(\'msg\').textContent=\'Offer closed\'">✕</button>\n<p id="msg" aria-live="polite"></p>\n<details><summary>Shipping details</summary><p>Delivery in 2–4 days. (details/summary is accessible with no ARIA at all)</p></details>', run: 'html' },
        { h: B('محركات البحث (SEO) الأساسي', 'Search engine basics (SEO)'),
          p: B('جوجل بيقرا الـ HTML: `<title>` فريد ومحدد لكل صفحة (يظهر في نتايج البحث)، و`<meta name="description">` جملة بتقنع الناس يدوسوا، وh1 بيقول الصفحة عن إيه، وعناوين وروابط بنصوص بتوصف، وalt للصور، وURLs مقروءة (`/offers/back-to-school` مش `/p?id=8812`). المحتوى المفيد السريع أهم من أي حيلة.',
            'Google reads the HTML: a unique, specific `<title>` per page (shown in search results), a `<meta name="description">` sentence persuading people to click, an h1 saying what the page is about, headings and links with descriptive text, alt text for images, and readable URLs (`/offers/back-to-school`, not `/p?id=8812`). Useful, fast content matters more than any trick.'),
          ex: '<head>\n  <title>Back-to-school notebooks, 20% off | Nile Store</title>\n  <meta name="description" content="Every notebook 20% off until Friday, with free delivery in Cairo and Giza above 1,000 EGP.">\n  <link rel="canonical" href="https://nile.example/offers/back-to-school">\n</head>', show: 1, lang: 'html' },
        { h: B('المشاركة: Open Graph', 'Sharing: Open Graph'),
          p: B('لما حد يشارك رابطك على واتساب أو فيسبوك أو لينكدإن، بيظهر «كارت» فيه عنوان ووصف وصورة من وسوم **Open Graph** في الـ head: `og:title` و`og:description` و`og:image` (صورة 1200×630) و`og:url`. من غيرهم الكارت بيطلع فاضي أو بصورة عشوائية. ده مهم جدًا لصفحات العروض اللي هتتبعت للعملاء.',
            'When someone shares your link on WhatsApp, Facebook or LinkedIn, a «card» shows a title, a description and an image taken from the **Open Graph** tags in the head: `og:title`, `og:description`, `og:image` (a 1200×630 image) and `og:url`. Without them the card is blank or shows a random image. Very important for offer pages you will send to customers.'),
          ex: '<meta property="og:type" content="website">\n<meta property="og:title" content="Back-to-school: notebooks 20% off">\n<meta property="og:description" content="Until Friday only. Free delivery above 1,000 EGP.">\n<meta property="og:image" content="https://nile.example/img/offer-1200x630.jpg">\n<meta property="og:url" content="https://nile.example/offers/back-to-school">', show: 1, lang: 'html' }
      ],
      practice: [
        B('استخدم صفحتك بالكيبورد بس وصلّح أي حاجة مش بتتوصّل.', 'Use your page with the keyboard only and fix anything unreachable.'),
        B('حوّل 3 «أزرار» div أو span لـ button حقيقي.', 'Turn 3 div or span «buttons» into real buttons.'),
        B('ضيف رابط «تخطى للمحتوى» وaria-label لزرار أيقونة وaria-live لرسالة.', 'Add a «skip to content» link, an aria-label to an icon button and aria-live to a message.'),
        B('اكتب title وdescription لـ 5 صفحات مختلفة لموقع.', 'Write a title and description for 5 different pages of a site.'),
        B('ضيف وسوم Open Graph لصفحة عرض وجرّب الرابط في أداة معاينة.', 'Add Open Graph tags to an offer page and try the link in a preview tool.'),
        B('شغّل Lighthouse (DevTools) على صفحتك وصلّح أهم 3 ملاحظات Accessibility وSEO.', 'Run Lighthouse (DevTools) on your page and fix the top 3 Accessibility and SEO notes.')
      ],
      code: [
        { u: B('قايمة فحص سريعة', 'A quick checklist'), p: '☐ one <h1>, headings in order\n☐ every <img> has a meaningful alt (or alt="")\n☐ every field has a <label for>\n☐ buttons are <button>, links are <a href>\n☐ the page works with Tab / Enter / Space only\n☐ lang and dir on <html>\n☐ unique <title> and <meta name="description">\n☐ Open Graph tags on pages you share', show: 1, lang: 'text' }
      ],
      words: [
        { t: 'accessibility', m: B('إن الصفحة يقدر يستخدمها كل الناس (a11y)', 'making a page usable by everyone (a11y)'), ex: 'labels, alt, keyboard' },
        { t: 'screen reader', m: B('برنامج بيقرا الصفحة بصوت للمكفوفين', 'software reading the page aloud for blind users'), ex: 'NVDA, VoiceOver' },
        { t: 'focus', m: B('العنصر اللي عليه الدور حاليًا للكيبورد', 'the element currently taking keyboard input'), ex: ':focus-visible' },
        { t: 'ARIA', m: B('خصايص بتدّي معلومات زيادة لقارئ الشاشة', 'attributes giving screen readers extra information'), ex: 'aria-label="Close"' },
        { t: 'SEO', m: B('تحسين الصفحة لمحركات البحث', 'improving a page for search engines'), ex: '<title> and description' },
        { t: 'Open Graph', m: B('وسوم بتتحكم في شكل الرابط لما يتشارك', 'tags controlling how a link looks when shared'), ex: 'og:image' },
        { t: 'Lighthouse', m: B('أداة في Chrome بتقيس الأداء وإمكانية الوصول وSEO', 'a Chrome tool measuring performance, accessibility and SEO'), ex: 'run Lighthouse' }
      ],
      read: [{ lib: 'web.dev: Accessibility', what: B('Welcome to Learn Accessibility وContent structure وKeyboard focus.', 'Welcome to Learn Accessibility, Content structure and Keyboard focus.') },
        { lib: 'Lighthouse', what: B('Run Lighthouse in Chrome DevTools واقرا تقرير صفحتك.', 'Run Lighthouse in Chrome DevTools and read your page’s report.') }],
      challenge: B('خد موقع الـ 3 صفحات بتاعك ووصّله لـ 100 في Lighthouse Accessibility و90+ في SEO: رابط تخطي، وأزرار حقيقية، وlabels، وalt، وtitle وdescription فريدين، وOpen Graph للرئيسية — واكتب قبل وبعد لكل رقم.', 'Take your 3-page site to 100 in Lighthouse Accessibility and 90+ in SEO: a skip link, real buttons, labels, alt text, unique titles and descriptions, and Open Graph on the home page — recording before and after for each score.'),
      quiz: [
        { q: B('أحسن زرار:', 'The best button:'), o: ['<button type="button">', '<div onclick>', '<span class="btn">'], a: 0, why: B('بيشتغل بالكيبورد وقارئ الشاشة.', 'It works with the keyboard and screen readers.') },
        { q: B('القاعدة الأولى لـ ARIA:', 'The first rule of ARIA:'), o: [B('استخدم HTML الصح الأول', 'use the right HTML first'), B('حط ARIA على كل حاجة', 'put ARIA on everything'), B('ARIA بديل للـ label', 'ARIA replaces labels')], a: 0, why: B('ARIA آخر حل.', 'ARIA is the last resort.') },
        { q: B('اللي بيظهر عنوان في نتيجة جوجل:', 'What shows as the title in a Google result:'), o: ['<title>', '<h2>', '<meta name="keywords">'], a: 0, why: B('عنوان الصفحة.', 'The page title.') },
        { q: B('صورة الكارت لما الرابط يتشارك:', 'The card image when a link is shared:'), o: ['og:image', 'favicon', 'alt'], a: 0, why: B('Open Graph.', 'Open Graph.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تراجع HTML كله وتسلّم صفحة حقيقية كاملة، وتعدّي اختبار الأسبوع.', 'Review all of HTML, deliver a complete real page, and pass the weekly test.'),
      review: [
        B('الهيكل: doctype وhtml بـ lang/dir وhead (charset وviewport وtitle) وbody.', 'Structure: doctype, html with lang/dir, head (charset, viewport, title) and body.'),
        B('h1 واحد والعناوين بالترتيب حسب المعنى مش الحجم.', 'One h1, headings in order by meaning, not size.'),
        B('العناصر الدلالية (header وnav وmain وarticle وsection وaside وfooter) قبل div.', 'Semantic elements (header, nav, main, article, section, aside, footer) before div.'),
        B('ul/ol/dl للقوايم، وروابط بنص بيوصف ومسارات نسبية لملفاتك.', 'ul/ol/dl for lists, links with descriptive text, relative paths for your files.'),
        B('img بـ alt وwidth/height وlazy، وfigure بتعليق.', 'img with alt, width/height and lazy loading, and figure with a caption.'),
        B('الجداول للبيانات: caption وthead/tbody/tfoot وth بـ scope.', 'Tables for data: caption, thead/tbody/tfoot, th with scope.'),
        B('الفورم: label لكل حقل وname، والنوع الصح، وrequired/pattern/min/max — والسيرفر يتحقق تاني.', 'Forms: a label and name per field, the right type, required/pattern/min/max — and the server validates again.'),
        B('الكل يقدر يستخدمها: كيبورد وbutton حقيقي وARIA بحساب، وtitle وdescription وOpen Graph.', 'Usable by all: keyboard, real buttons, careful ARIA, plus title, description and Open Graph.')
      ],
      project: B('**مشروع الأسبوع: صفحة هبوط لعرض حقيقي (HTML بس، من غير CSS).** لمشروعك أو لعميل وهمي:\n1. هيكل كامل بالعربي، وtitle وdescription وOpen Graph.\n2. header فيه لوجو (img بـ alt) وnav بروابط داخلية لأقسام الصفحة، ورابط «تخطى للمحتوى».\n3. main: قسم المميزات (ul)، وقسم «إزاي تطلب» (ol)، وكروت 4 منتجات (article فيها figure وسعر وdl مواصفات)، وجدول مقارنة الباقات (caption وthead وtbody وtfoot وscope).\n4. فورم طلب كامل: بيانات العميل في fieldset، والمنتج والكمية، والتاريخ، والدفع (radio)، وملاحظات، وموافقة — بالتحقق المناسب وautocomplete، ويبعت بـ GET لـ httpbin.org.\n5. footer فيه إيميل وتليفون بروابط.\n6. تعدّي validator.w3.org من غير أخطاء، وLighthouse Accessibility 100.',
        '**Weekly project: a landing page for a real offer (HTML only, no CSS).** For your project or a made-up client:\n1. A complete Arabic skeleton with a title, a description and Open Graph.\n2. A header with a logo (img with alt) and a nav linking to the page’s sections, plus a «skip to content» link.\n3. Main: a features section (ul), a «how to order» section (ol), 4 product cards (articles with a figure, a price and a dl of specs), and a plan comparison table (caption, thead, tbody, tfoot, scope).\n4. A complete order form: customer details in a fieldset, product and quantity, date, payment (radio), notes and agreement — with suitable validation and autocomplete, sent with GET to httpbin.org.\n5. A footer with email and phone links.\n6. Zero errors on validator.w3.org, and Lighthouse Accessibility 100.'),
      test: [
        { q: B('أول سطر في صفحة HTML:', 'The first line of an HTML page:'), o: ['<!doctype html>', '<html>', '<head>'], a: 0, why: B('بيقول HTML حديث.', 'It declares modern HTML.') },
        { q: B('`dir="rtl"` بيتحط على:', '`dir="rtl"` goes on:'), o: ['<html>', '<title>', '<meta>'], a: 0, why: B('اتجاه الصفحة كلها.', 'The whole page’s direction.') },
        { q: B('عنوان قسم تحت h1:', 'A section heading under the h1:'), o: ['<h2>', '<h4>', '<strong>'], a: 0, why: B('بالترتيب.', 'In order.') },
        { q: B('روابط التنقل الأساسية في:', 'The main navigation links go in:'), o: ['<nav>', '<aside>', '<section>'], a: 0, why: B('عنصر التنقل.', 'The navigation element.') },
        { q: B('مصطلح ومعناه في قايمة:', 'A term and its meaning in a list:'), o: ['<dl><dt><dd>', '<ul><li>', '<ol><li>'], a: 0, why: B('قايمة تعريفات.', 'A description list.') },
        { q: B('رابط يفتح في تاب جديد بأمان:', 'A link opening a new tab safely:'), o: ['target="_blank" rel="noopener"', 'target="new"', 'href="_blank"'], a: 0, why: B('noopener للأمان.', 'noopener for safety.') },
        { q: B('صورة محمّلتش، اللي بيظهر:', 'When an image fails to load, what shows:'), o: [B('نص الـ alt', 'the alt text'), B('ولا حاجة', 'nothing'), B('الـ title', 'the title')], a: 0, why: B('عشان كده alt مهم.', 'That is why alt matters.') },
        { q: B('عنوان عمود في جدول:', 'A column heading in a table:'), o: ['<th scope="col">', '<td>', '<caption>'], a: 0, why: B('خانة عنوان.', 'A heading cell.') },
        { q: B('حقل بيفتح كيبورد أرقام للتليفون:', 'A field opening a phone number pad:'), o: ['type="tel"', 'type="text"', 'type="phone"'], a: 0, why: B('tel.', 'tel.') },
        { q: B('`pattern="01[0-9]{9}"` بيقبل:', '`pattern="01[0-9]{9}"` accepts:'), o: ['01012345678', '1012345678', '010-1234-5678'], a: 0, why: B('11 رقم بادئة بـ 01.', '11 digits starting with 01.') },
        { q: B('label مربوط بحقل id="em":', 'A label tied to a field with id="em":'), o: ['<label for="em">', '<label id="em">', '<label name="em">'], a: 0, why: B('for = id الحقل.', 'for = the field’s id.') },
        { q: B('زرار بأيقونة ✕ بس محتاج:', 'An icon-only ✕ button needs:'), o: ['aria-label="Close"', 'alt="Close"', 'title only'], a: 0, why: B('قارئ الشاشة يعرف بيعمل إيه.', 'So screen readers know what it does.') }
      ] }
  ]
};
