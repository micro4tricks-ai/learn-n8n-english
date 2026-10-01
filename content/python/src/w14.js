// Python week 14 — HTML and CSS.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('HTML وCSS', 'HTML and CSS'),
  goal: B('تكتب صفحات HTML سليمة ومفهومة، وفورمز بتبعت لـ n8n، وتنسّقها بـ CSS (الـ selectors والـ box model وflexbox وgrid والشاشات الصغيرة والعربي من اليمين)، وتخلي Python يطلّع تقارير HTML جميلة — وده كمان اللي هتحتاجه عشان تفهم الصفحات وانت بتعمل scraping.',
          'Write sound, meaningful HTML pages and forms that post to n8n, style them with CSS (selectors, the box model, flexbox, grid, small screens and right-to-left Arabic), and have Python produce good-looking HTML reports — which is also what you need to understand pages when you scrape them.'),
  days: [
    { title: B('هيكل صفحة HTML', 'The structure of an HTML page'),
      goal: B('تكتب صفحة كاملة بالـ head والـ body، وتستخدم العناوين والفقرات واللينكات والصور والقوايم، والـ tags اللي ليها معنى (semantic).', 'Write a complete page with head and body, and use headings, paragraphs, links, images, lists and meaningful (semantic) tags.'),
      learn: [
        { h: B('الهيكل الأساسي', 'The basic skeleton'),
          p: B('`<!doctype html>` في الأول، وبعدين `<html lang="ar" dir="rtl">` (اللغة واتجاه الكتابة)، وجواه `<head>` (معلومات: `charset` و`viewport` عشان الموبايل و`title`) و`<body>` (اللي بيظهر). كل tag بيتفتح ويتقفل: `<p>...</p>`. دوس «اعرض» وشوف الصفحة تحت الكود.', 'Start with `<!doctype html>`, then `<html lang="ar" dir="rtl">` (the language and the writing direction), containing `<head>` (information: `charset`, `viewport` for phones, and `title`) and `<body>` (what shows). Every tag opens and closes: `<p>...</p>`. Press «Preview» to see the page under the code.'),
          ex: '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>تقرير المبيعات</title>\n</head>\n<body>\n  <h1>تقرير مبيعات سبتمبر</h1>\n  <p>إجمالي الإيراد <strong>245,910</strong> جنيه، بزيادة 12%.</p>\n  <p>التفاصيل في <a href="https://example.com/report">التقرير الكامل</a>.</p>\n</body>\n</html>', run: 'html' },
        { h: B('العناوين والقوايم والصور', 'Headings, lists and images'),
          p: B('`<h1>` لـ `<h6>` عناوين بالترتيب (h1 واحد بس في الصفحة). `<ul>` قايمة نقط و`<ol>` مترقّمة و`<li>` عنصر. `<img src="..." alt="...">` صورة، والـ `alt` وصف للي مش شايف الصورة ولمحركات البحث — متسيبهوش فاضي. `<a href="..." target="_blank">` لينك.', '`<h1>` to `<h6>` are headings in order (one h1 per page). `<ul>` is a bulleted list, `<ol>` a numbered one and `<li>` an item. `<img src="..." alt="...">` is an image, and `alt` describes it for people who cannot see it and for search engines — never leave it empty. `<a href="..." target="_blank">` is a link.'),
          ex: '<h2>Top products</h2>\n<ol>\n  <li>Backpack — 650 EGP</li>\n  <li>Notebook — 45 EGP</li>\n  <li>Pen Pro — 30 EGP</li>\n</ol>\n<h2>Next steps</h2>\n<ul>\n  <li>Restock pens</li>\n  <li>Email the <a href="https://example.com" target="_blank">supplier</a></li>\n</ul>\n<img src="https://picsum.photos/seed/shop/320/120" alt="Shop front at night" width="320">', run: 'html' },
        { h: B('Tags ليها معنى', 'Tags with meaning'),
          p: B('بدل `<div>` لكل حاجة استخدم الـ tags اللي بتوصف المحتوى: `<header>` و`<nav>` و`<main>` و`<section>` و`<article>` و`<aside>` و`<footer>`. ده بيساعد قارئات الشاشة ومحركات البحث، وبيسهّل عليك الـ scraping (أسبوع 16) لأنك تعرف المحتوى الأساسي فين.', 'Instead of a `<div>` for everything, use tags that describe the content: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` and `<footer>`. This helps screen readers and search engines, and makes scraping (week 16) easier because you know where the main content is.'),
          ex: '<header><h1>Nile Shop</h1>\n  <nav><a href="#">Home</a> · <a href="#">Products</a> · <a href="#">Contact</a></nav>\n</header>\n<main>\n  <article>\n    <h2>Back-to-school offer</h2>\n    <p>Every notebook is 20% off until Friday.</p>\n  </article>\n  <aside>Free delivery above 1,000 EGP.</aside>\n</main>\n<footer>© 2026 Nile Shop</footer>', run: 'html' }
      ],
      practice: [
        B('اكتب صفحة «عني» كاملة (doctype وhead وbody) بعنوان وفقرتين وقايمة مهارات وصورة بـ alt.', 'Write a complete «About me» page (doctype, head and body) with a title, two paragraphs, a skills list and an image with alt.'),
        B('احفظها `about.html` وافتحها في المتصفح وجرّب `dir="rtl"` و`ltr`.', 'Save it as `about.html`, open it in the browser and try `dir="rtl"` and `ltr`.'),
        B('افتح DevTools (F12) على أي موقع وشوف الـ tags في تبويب Elements.', 'Open DevTools (F12) on any site and look at the tags in the Elements tab.'),
        B('افحص صفحتك بـ W3C Validator وصلّح أي غلطة.', 'Check your page with the W3C Validator and fix any mistake.')
      ],
      code: [
        { u: B('قالب صفحة جاهز', 'A ready page template'), p: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Page title</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <header><h1>Page title</h1></header>\n  <main>\n    <p>Content goes here.</p>\n  </main>\n  <footer>Made with Python</footer>\n</body>\n</html>', lang: 'html' }
      ],
      words: [
        { t: 'HTML', m: B('اللغة اللي بتوصف محتوى وهيكل صفحات الويب', 'the language describing the content and structure of web pages'), ex: '<p>Hello</p>' },
        { t: 'tag', m: B('علامة بين < > بتحدد نوع المحتوى', 'a marker between < > naming the kind of content'), ex: '<h1>, <p>, <a>' },
        { t: 'attribute', m: B('معلومة إضافية جوه الـ tag (اسم="قيمة")', 'extra information inside a tag (name="value")'), ex: 'href="https://…"' },
        { t: 'doctype', m: B('أول سطر بيقول للمتصفح إن ده HTML حديث', 'the first line telling the browser this is modern HTML'), ex: '<!doctype html>' },
        { t: 'semantic HTML', m: B('استخدام tags بتوصف معنى المحتوى', 'using tags that describe what the content means'), ex: '<nav>, <main>, <article>' },
        { t: 'alt text', m: B('وصف الصورة للي مش شايفها', 'a description of an image for those who cannot see it'), ex: 'alt="Shop front at night"' },
        { t: 'viewport meta', m: B('السطر اللي بيخلي الصفحة تتظبط على الموبايل', 'the line that makes a page fit phones'), ex: 'width=device-width, initial-scale=1' }
      ],
      read: [{ lib: 'web.dev: Learn HTML', what: B('اقرا Overview وDocument structure وSemantic HTML.', 'Read Overview, Document structure and Semantic HTML.') }, 'lib:MDN: HTML elements reference'],
      challenge: B('اكتب صفحة «منيو مطعم» بـ header وnav و3 sections (مقبلات وأطباق وحلويات) كل واحد قايمة بأسعار، وfooter بالعنوان — من غير أي CSS، وبعدين افحصها بالـ Validator.', 'Write a «restaurant menu» page with a header, a nav and 3 sections (starters, mains, desserts), each a list with prices, and a footer with the address — no CSS yet — then check it with the Validator.'),
      quiz: [
        { q: B('اتجاه الصفحة العربي بيتحدد بـ:', 'An Arabic page’s direction is set with:'), o: ['dir="rtl"', 'lang="rtl"', 'align="right"'], a: 0, why: B('dir للاتجاه وlang للغة.', 'dir for direction, lang for language.') },
        { q: B('الـ alt في الصورة فايدته:', 'What alt on an image is for:'), o: [B('وصف للي مش شايف الصورة', 'a description for people who cannot see it'), B('حجم الصورة', 'the image size'), B('لينك', 'a link')], a: 0, why: B('accessibility وSEO.', 'Accessibility and SEO.') },
        { q: B('المحتوى الأساسي للصفحة مكانه:', 'The main content of a page goes in:'), o: ['<main>', '<head>', '<footer>'], a: 0, why: B('head مش بيظهر.', 'head is not displayed.') }
      ] },

    { title: B('الجداول والفورمز', 'Tables and forms'),
      goal: B('تعرض بيانات في جدول HTML سليم، وتعمل فورم بأنواع مدخلات وlabels وتحقق، وتبعته لـ n8n Webhook.', 'Show data in a proper HTML table, build a form with input types, labels and validation, and send it to an n8n Webhook.'),
      learn: [
        { h: B('جدول HTML', 'An HTML table'),
          p: B('`<table>` جواه `<thead>` (صف العناوين بـ `<th>`) و`<tbody>` (صفوف `<tr>` فيها خلايا `<td>`)، و`<caption>` عنوان الجدول. استخدم الجداول للبيانات اللي شكلها جدول بس، مش لترتيب الصفحة. ده الشكل اللي هتطلّعه من Python للتقارير.', '`<table>` holds `<thead>` (the header row with `<th>`) and `<tbody>` (rows `<tr>` with cells `<td>`), plus `<caption>` as the title. Use tables only for tabular data, never for page layout. This is the shape you will produce from Python for reports.'),
          ex: '<table border="1" cellpadding="6">\n  <caption>Revenue by city — September</caption>\n  <thead><tr><th>City</th><th>Orders</th><th>Revenue (EGP)</th></tr></thead>\n  <tbody>\n    <tr><td>Cairo</td><td>42</td><td>128,500.50</td></tr>\n    <tr><td>Alexandria</td><td>25</td><td>77,300.75</td></tr>\n    <tr><td>Giza</td><td>18</td><td>40,210.00</td></tr>\n  </tbody>\n</table>', run: 'html' },
        { h: B('الفورم', 'The form'),
          p: B('`<form action="URL" method="post">` وجواه `<label for="x">` لكل `<input id="x" name="x">`. الأنواع: `email` و`tel` و`number` و`date` و`checkbox`، و`<select>` و`<textarea>`. `required` و`min` و`pattern` بيتحققوا في المتصفح قبل الإرسال — بس دايمًا اتحقق تاني في السيرفر/n8n.', '`<form action="URL" method="post">` containing a `<label for="x">` for each `<input id="x" name="x">`. Types: `email`, `tel`, `number`, `date` and `checkbox`, plus `<select>` and `<textarea>`. `required`, `min` and `pattern` check in the browser before sending — but always check again on the server/in n8n.'),
          ex: '<form onsubmit="event.preventDefault(); this.insertAdjacentHTML(\'beforeend\', \'<p><b>✓ valid — not sent (a demo)</b></p>\')">\n  <p><label for="name">Name</label><br><input id="name" name="name" required></p>\n  <p><label for="email">Email</label><br><input id="email" name="email" type="email" required></p>\n  <p><label for="phone">Mobile</label><br><input id="phone" name="phone" type="tel" pattern="01[0125][0-9]{8}" placeholder="01012345678"></p>\n  <p><label for="qty">Quantity</label><br><input id="qty" name="qty" type="number" min="1" max="20" value="1"></p>\n  <p><label for="city">City</label><br><select id="city" name="city"><option>Cairo</option><option>Giza</option><option>Alexandria</option></select></p>\n  <p><label><input type="checkbox" name="news"> Send me offers</label></p>\n  <button>Order</button>\n</form>', run: 'html' },
        { h: B('الفورم يبعت لـ n8n', 'The form posts to n8n'),
          p: B('حط `action` = Production URL بتاع Webhook node و`method="post"`. البيانات بتوصل `$json.body.name` وهكذا. ولو عايز صفحة شكر من غير ما المستخدم يسيب الصفحة، ابعت بـ `fetch` في JavaScript (الأسبوع الجاي). وفي n8n نفسه فيه Form Trigger بيعمل الفورم ليك من غير HTML.', 'Set `action` to the Webhook node’s Production URL and `method="post"`. The data arrives as `$json.body.name` and so on. To show a thank-you without leaving the page, send with `fetch` in JavaScript (next week). n8n also has a Form Trigger that builds the form for you with no HTML.'),
          ex: '<form action="https://YOUR-N8N/webhook/new-order" method="post">\n  <label for="n">Name</label> <input id="n" name="name" required>\n  <label for="e">Email</label> <input id="e" name="email" type="email" required>\n  <input type="hidden" name="source" value="landing-page">\n  <button>Send</button>\n</form>', lang: 'html' }
      ],
      practice: [
        B('حوّل جدول مبيعات أسبوع 11 لجدول HTML بـ thead وtbody وcaption.', 'Turn the week 11 sales table into an HTML table with thead, tbody and caption.'),
        B('اعمل فورم «طلب منتج» بـ 6 حقول مختلفة الأنواع وlabels لكلهم.', 'Build an «order a product» form with 6 fields of different types, all labelled.'),
        B('جرّب تبعت الفورم بإيميل غلط وموبايل غلط وشوف رسايل المتصفح.', 'Try submitting with a bad email and a bad phone and see the browser’s messages.'),
        B('اربط الفورم بـ Webhook في n8n (Test URL) واتأكد إن البيانات وصلت.', 'Point the form at an n8n Webhook (Test URL) and check the data arrives.')
      ],
      code: [
        { u: B('فورم تواصل بسيط', 'A simple contact form'), p: '<form action="https://YOUR-N8N/webhook/contact" method="post">\n  <label for="name">Your name</label>\n  <input id="name" name="name" required autocomplete="name">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required autocomplete="email">\n  <label for="msg">Message</label>\n  <textarea id="msg" name="message" rows="4" required maxlength="1000"></textarea>\n  <button type="submit">Send</button>\n</form>', lang: 'html' }
      ],
      words: [
        { t: 'table row', m: B('صف في جدول HTML (<tr>)', 'a row in an HTML table (<tr>)'), ex: '<tr><td>Cairo</td></tr>' },
        { t: 'form', m: B('مجموعة حقول بتبعت بيانات لعنوان', 'a group of fields that sends data to an address'), ex: '<form action="…" method="post">' },
        { t: 'input type', m: B('نوع الحقل: email أو number أو date…', 'the kind of field: email, number, date…'), ex: '<input type="email">' },
        { t: 'label', m: B('اسم الحقل المربوط بيه بـ for', 'a field’s name, linked to it with for'), ex: '<label for="email">' },
        { t: 'form validation', m: B('التحقق من المدخلات قبل الإرسال', 'checking the input before it is sent'), ex: 'required, min, pattern' },
        { t: 'accessibility', m: B('إن الصفحة تتستخدم بقارئ الشاشة والكيبورد ومن الكل', 'making a page usable with screen readers, the keyboard and by everyone'), ex: 'labels, alt, contrast' }
      ],
      read: [{ lib: 'web.dev: Learn HTML', what: B('اقرا Tables وForms.', 'Read Tables and Forms.') }, { lib: 'MDN: Learn web development', what: B('اقرا Web forms: Your first form.', 'Read Web forms: Your first form.') }],
      challenge: B('اعمل صفحة «سجّل في الكورس» بفورم كامل (اسم وإيميل وموبايل مصري بـ pattern ومستوى من select وموافقة checkbox)، وبتبعت لـ Webhook في n8n يكتب في Google Sheet ويبعتلك Telegram.', 'Make a «register for the course» page with a full form (name, email, an Egyptian mobile with pattern, a level from a select, a consent checkbox) posting to an n8n Webhook that writes to a Google Sheet and sends you a Telegram.'),
      quiz: [
        { q: B('عنوان عمود في جدول HTML:', 'A column heading in an HTML table:'), o: ['<th>', '<td>', '<tr>'], a: 0, why: B('th = table header.', 'th = table header.') },
        { q: B('`name` في `<input name="email">` هو:', '`name` in `<input name="email">` is:'), o: [B('اسم القيمة في البيانات المبعوتة', 'the key of the value in the sent data'), B('النص اللي بيظهر', 'the visible text'), B('اسم الـ CSS', 'the CSS name')], a: 0, why: B('بيوصل $json.body.email.', 'It arrives as $json.body.email.') },
        { q: B('تحقق المتصفح بـ required وpattern:', 'Browser checks with required and pattern:'), o: [B('مش كفاية؛ اتحقق في السيرفر كمان', 'are not enough; check on the server too'), B('كفاية تمامًا', 'are fully enough'), B('بيبطّأ الصفحة', 'slow the page down')], a: 0, why: B('أي حد يقدر يبعت للـ URL مباشرة.', 'Anyone can post to the URL directly.') }
      ] },

    { title: B('CSS: الـ selectors والـ box model', 'CSS: selectors and the box model'),
      goal: B('تنسّق صفحة بـ CSS: تختار العناصر بالـ selectors، وتفهم أنهي قاعدة بتكسب، والألوان والوحدات، والـ box model (margin وborder وpadding).', 'Style a page with CSS: pick elements with selectors, understand which rule wins, colours and units, and the box model (margin, border and padding).'),
      learn: [
        { h: B('قاعدة CSS', 'A CSS rule'),
          p: B('`selector { property: value; }`. الـ selectors: `p` كل الفقرات، `.price` أي عنصر فيه `class="price"`، `#total` العنصر اللي `id="total"`، `table td` الخلايا اللي جوه جدول، `a:hover` اللينك والماوس عليه، `[type="email"]` بالـ attribute. الـ CSS بيتحط في `<style>` أو ملف `style.css`.', '`selector { property: value; }`. Selectors: `p` every paragraph, `.price` any element with `class="price"`, `#total` the element with `id="total"`, `table td` cells inside a table, `a:hover` a link under the mouse, `[type="email"]` by attribute. CSS goes in a `<style>` block or a `style.css` file.'),
          ex: '<style>\n  body { font-family: system-ui, sans-serif; color: #26302b; }\n  h1 { color: #3f8f63; }\n  .price { font-weight: bold; color: #985c2c; }\n  #total { font-size: 1.4rem; }\n  ul li:nth-child(odd) { background: #eef5f0; }\n  a:hover { text-decoration: none; }\n</style>\n<h1>Today’s offers</h1>\n<ul>\n  <li>Backpack <span class="price">650 EGP</span></li>\n  <li>Notebook <span class="price">45 EGP</span></li>\n  <li>Pen Pro <span class="price">30 EGP</span></li>\n</ul>\n<p id="total">Basket: 725 EGP</p>\n<p><a href="#">See all offers</a></p>', run: 'html' },
        { h: B('مين بيكسب؟', 'Which rule wins?'),
          p: B('لو قاعدتين على نفس العنصر: الأكثر تحديدًا بيكسب (id أقوى من class أقوى من tag)، ولو نفس القوة اللي مكتوبة **آخر** بتكسب (الـ cascade). وبعض الخصائص بتتورث من الأب (زي اللون والخط). متستخدمش `!important` غير للضرورة القصوى. DevTools بيوريك القاعدة اللي كسبت والمشطوبة.', 'When two rules hit the same element: the more specific one wins (an id beats a class beats a tag), and at equal strength the one written **last** wins (the cascade). Some properties inherit from the parent (like colour and font). Avoid `!important` except as a last resort. DevTools shows the winning rule and the crossed-out ones.'),
          ex: '<style>\n  p { color: gray; }\n  .note { color: steelblue; }\n  #main-note { color: darkgreen; }\n  p { color: crimson; }   /* later, but a tag selector is weaker than a class */\n  .card { color: #985c2c; }\n</style>\n<p>plain paragraph (crimson: the later p rule)</p>\n<p class="note">class note (steelblue)</p>\n<p class="note" id="main-note">id beats class (darkgreen)</p>\n<div class="card"><p>p inside .card stays crimson: its own rule beats inheritance</p><span>a span inherits the card colour</span></div>', run: 'html' },
        { h: B('الـ box model والوحدات', 'The box model and units'),
          p: B('كل عنصر صندوق: المحتوى، وحواليه `padding` (مسافة جوه)، وبعدين `border`، وبعدين `margin` (مسافة برّه). حط `box-sizing: border-box` عشان العرض يشمل الـ padding والـ border. الوحدات: `px` ثابت، `rem` نسبة لحجم خط الصفحة (الأحسن للخطوط)، `%` من الأب، `vw` من عرض الشاشة.', 'Every element is a box: the content, then `padding` (space inside), then `border`, then `margin` (space outside). Set `box-sizing: border-box` so the width includes padding and border. Units: `px` fixed, `rem` relative to the page font size (best for type), `%` of the parent, `vw` of the screen width.'),
          ex: '<style>\n  * { box-sizing: border-box; }\n  .card { width: 260px; padding: 16px; border: 2px solid #3f8f63; border-radius: 12px; margin: 12px; background: #f6faf7; }\n  .card h3 { margin: 0 0 .5rem; font-size: 1.2rem; }\n  .card p { margin: 0; font-size: .95rem; line-height: 1.6; }\n</style>\n<div class="card"><h3>Backpack</h3><p>Water-resistant, 25 L, two pockets.</p></div>\n<div class="card"><h3>Notebook</h3><p>A5, 120 pages, dotted.</p></div>', run: 'html' }
      ],
      practice: [
        B('نسّق صفحة «عني» بـ 6 قواعد CSS: خط ولون عناوين وclass للمهارات وhover للينكات.', 'Style your «About me» page with 6 CSS rules: a font, heading colours, a class for skills and a hover for links.'),
        B('اعمل تعارض بين قاعدتين واعرف مين كسب وليه من DevTools.', 'Create a conflict between two rules and use DevTools to see which won and why.'),
        B('اعمل «كارت منتج» بـ padding وborder وradius وmargin، وجرّب من غير border-box.', 'Make a «product card» with padding, border, radius and margin, and try it without border-box.'),
        B('غيّر حجم خط الصفحة كلها من `html { font-size }` وشوف الـ rem بيتغير والـ px لأ.', 'Change the page font size with `html { font-size }` and see rem values change while px do not.')
      ],
      code: [
        { u: B('بداية CSS لأي صفحة', 'A CSS starting point for any page'), p: '*, *::before, *::after { box-sizing: border-box; }\nhtml { font-size: 16px; }\nbody { margin: 0; font-family: system-ui, "Segoe UI", Tahoma, sans-serif; line-height: 1.6; color: #26302b; background: #fbfcfb; }\nimg { max-width: 100%; height: auto; }\na { color: #2f6f4e; }\nh1, h2, h3 { line-height: 1.25; }\n.container { max-width: 960px; margin: 0 auto; padding: 0 16px; }', lang: 'css' }
      ],
      words: [
        { t: 'CSS', m: B('اللغة اللي بتحدد شكل الصفحة: ألوان وخطوط وترتيب', 'the language that sets how a page looks: colours, fonts and layout'), ex: 'h1 { color: green; }' },
        { t: 'selector', m: B('الجزء اللي بيختار العناصر في قاعدة CSS', 'the part of a CSS rule that picks the elements'), ex: '.price, #total, table td' },
        { t: 'CSS class', m: B('اسم بتحطه على عناصر عشان تنسّقها مع بعض', 'a name you put on elements to style them together'), ex: 'class="price"' },
        { t: 'specificity', m: B('قوة الـ selector اللي بتحدد مين يكسب', 'the strength of a selector that decides which rule wins'), ex: '#id > .class > tag' },
        { t: 'cascade', m: B('ترتيب تطبيق القواعد؛ عند التساوي الأخيرة تكسب', 'the order rules apply in; on a tie the last one wins'), ex: 'two p rules: the later wins' },
        { t: 'box model', m: B('كل عنصر صندوق: محتوى وpadding وborder وmargin', 'every element is a box: content, padding, border and margin'), ex: 'padding: 16px; margin: 12px' },
        { t: 'rem', m: B('وحدة نسبة لحجم خط الصفحة', 'a unit relative to the page’s font size'), ex: 'font-size: 1.2rem' }
      ],
      read: [{ lib: 'web.dev: Learn CSS', what: B('اقرا Box Model وSelectors وThe cascade وSpecificity.', 'Read Box Model, Selectors, The cascade and Specificity.') }, 'lib:MDN: CSS reference'],
      challenge: B('نسّق صفحة «منيو المطعم» بتاعة يوم 1: خط عربي من Google Fonts، وألوان من 3 درجات، وكل section كارت بـ padding وradius، والأسعار class لوحدها، ومن غير ما تلمس الـ HTML تقريبًا.', 'Style the day 1 «restaurant menu» page: an Arabic font from Google Fonts, a 3-shade colour palette, each section a card with padding and radius, and prices in their own class — barely touching the HTML.'),
      quiz: [
        { q: B('`.price` بيختار:', '`.price` selects:'), o: [B('العناصر اللي class بتاعها price', 'elements whose class is price'), B('العنصر اللي id بتاعه price', 'the element with id price'), B('tag اسمه price', 'a tag named price')], a: 0, why: B('النقطة = class، و# = id.', 'A dot is a class, # an id.') },
        { q: B('قاعدة بـ id وقاعدة بـ class على نفس العنصر:', 'An id rule and a class rule on the same element:'), o: [B('الـ id بتكسب', 'the id wins'), B('الـ class بتكسب', 'the class wins'), B('الأخيرة دايمًا', 'always the last one')], a: 0, why: B('specificity أعلى.', 'Higher specificity.') },
        { q: B('المسافة جوه حدود العنصر اسمها:', 'The space inside an element’s border is:'), o: ['padding', 'margin', 'gap'], a: 0, why: B('margin برّه.', 'margin is outside.') }
      ] },

    { title: B('الترتيب: flexbox وgrid والموبايل والعربي', 'Layout: flexbox, grid, phones and Arabic'),
      goal: B('ترتّب العناصر جنب بعض وتحت بعض بـ flexbox وgrid، وتخلي الصفحة تتظبط على الموبايل بـ media queries، وتظبط العربي من اليمين بالخصائص المنطقية.', 'Arrange elements in rows and columns with flexbox and grid, make the page adapt to phones with media queries, and handle right-to-left Arabic with logical properties.'),
      learn: [
        { h: B('flexbox: صف أو عمود', 'flexbox: a row or a column'),
          p: B('`display: flex` على الأب يخلي الأولاد جنب بعض. `gap` مسافة بينهم، `justify-content` التوزيع على الاتجاه الأساسي (start وcenter وspace-between)، `align-items` على الاتجاه التاني، `flex-wrap: wrap` ينزّل اللي مش لاقي مكان، و`flex: 1` يخلي العنصر ياخد الباقي. ممتاز للـ navbar وصف الأزرار والكروت.', '`display: flex` on the parent puts the children side by side. `gap` spaces them, `justify-content` distributes them along the main direction (start, center, space-between), `align-items` across it, `flex-wrap: wrap` moves what does not fit to the next line, and `flex: 1` makes an item take the rest. Great for navbars, button rows and cards.'),
          ex: '<style>\n  nav { display: flex; gap: 12px; align-items: center; justify-content: space-between; padding: 10px 14px; background: #26302b; color: #fff; border-radius: 10px; }\n  nav .links { display: flex; gap: 14px; }\n  nav a { color: #cfe8d9; text-decoration: none; }\n  .cards { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 14px; }\n  .cards div { flex: 1 1 140px; padding: 14px; background: #eef5f0; border-radius: 10px; }\n</style>\n<nav><b>Nile Shop</b><div class="links"><a href="#">Home</a><a href="#">Products</a><a href="#">Contact</a></div></nav>\n<div class="cards"><div>Orders<br><b>85</b></div><div>Revenue<br><b>245,910</b></div><div>Customers<br><b>61</b></div><div>Returns<br><b>3</b></div></div>', run: 'html' },
        { h: B('grid: صفوف وأعمدة مع بعض', 'grid: rows and columns together'),
          p: B('`display: grid` و`grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))` = أعمدة على قد ما الشاشة تساع، كل واحد 180 على الأقل — سطر واحد بيعمل لوحة منتجات تتظبط على أي شاشة من غير media query. و`grid-template-areas` لتخطيط الصفحة كلها (header وsidebar وmain).', '`display: grid` with `grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))` = as many columns as fit, each at least 180 wide — one line makes a product board that fits any screen with no media query. `grid-template-areas` lays out a whole page (header, sidebar, main).'),
          ex: '<style>\n  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }\n  .grid article { padding: 12px; border: 1px solid #cfdcd3; border-radius: 10px; text-align: center; }\n  .grid img { width: 100%; border-radius: 8px; }\n</style>\n<div class="grid">\n  <article><img src="https://picsum.photos/seed/a/300/200" alt="Backpack"><p>Backpack<br><b>650</b></p></article>\n  <article><img src="https://picsum.photos/seed/b/300/200" alt="Notebook"><p>Notebook<br><b>45</b></p></article>\n  <article><img src="https://picsum.photos/seed/c/300/200" alt="Pen"><p>Pen Pro<br><b>30</b></p></article>\n  <article><img src="https://picsum.photos/seed/d/300/200" alt="Sleeve"><p>Sleeve<br><b>320</b></p></article>\n</div>', run: 'html' },
        { h: B('الموبايل والعربي', 'Phones and Arabic'),
          p: B('ابدأ بتصميم الموبايل، وبعدين `@media (min-width: 700px) { ... }` تزوّد للشاشات الكبيرة (mobile-first). وللعربي: `dir="rtl"` على html بيقلب الترتيب لوحده، واستخدم الخصائص المنطقية `margin-inline-start` و`padding-inline-end` و`text-align: start` بدل left وright، عشان نفس الـ CSS يشتغل في العربي والإنجليزي.', 'Design for phones first, then add `@media (min-width: 700px) { ... }` for bigger screens (mobile-first). For Arabic: `dir="rtl"` on html flips the order by itself, and use logical properties `margin-inline-start`, `padding-inline-end` and `text-align: start` instead of left and right, so the same CSS works in Arabic and English.'),
          ex: '<style>\n  .layout { display: grid; gap: 12px; }\n  .layout aside { background: #eef5f0; padding: 12px; border-radius: 10px; }\n  .layout main { border-inline-start: 4px solid #3f8f63; padding-inline-start: 12px; text-align: start; }\n  @media (min-width: 500px) { .layout { grid-template-columns: 180px 1fr; } }\n</style>\n<div dir="rtl" class="layout">\n  <aside>القايمة الجانبية</aside>\n  <main><h3>المحتوى</h3><p>الخط الأخضر على «بداية» السطر: يمين في العربي وشمال في الإنجليزي من غير ما نغيّر الـ CSS.</p></main>\n</div>\n<div dir="ltr" class="layout" style="margin-top:12px">\n  <aside>Sidebar</aside>\n  <main><h3>Content</h3><p>The same CSS, left-to-right.</p></main>\n</div>', run: 'html' }
      ],
      practice: [
        B('العب Flexbox Froggy كله.', 'Play all of Flexbox Froggy.'),
        B('اعمل navbar بـ flex فيها لوجو على جنب و4 لينكات على الجنب التاني.', 'Build a flex navbar with a logo on one side and 4 links on the other.'),
        B('اعمل لوحة 8 منتجات بـ grid وصغّر وكبّر نافذة المتصفح.', 'Build an 8-product board with grid and resize the browser window.'),
        B('اعمل نفس الصفحة بـ dir rtl وltr وخلّي الـ CSS واحد (خصائص منطقية).', 'Make the same page with dir rtl and ltr using one CSS (logical properties).')
      ],
      code: [
        { u: B('تخطيط صفحة بـ grid areas', 'A page layout with grid areas'), p: '.page {\n  display: grid;\n  grid-template-areas: "head" "main" "side" "foot";\n  gap: 16px;\n}\n.page > header { grid-area: head; }\n.page > main   { grid-area: main; }\n.page > aside  { grid-area: side; }\n.page > footer { grid-area: foot; }\n@media (min-width: 800px) {\n  .page { grid-template-columns: 1fr 260px; grid-template-areas: "head head" "main side" "foot foot"; }\n}', lang: 'css' }
      ],
      words: [
        { t: 'flexbox', m: B('طريقة CSS لترتيب العناصر في صف أو عمود', 'a CSS way to arrange items in a row or a column'), ex: 'display: flex; gap: 12px' },
        { t: 'CSS grid', m: B('طريقة CSS لترتيب العناصر في صفوف وأعمدة مع بعض', 'a CSS way to arrange items in rows and columns at once'), ex: 'grid-template-columns: 1fr 260px' },
        { t: 'gap', m: B('المسافة بين عناصر flex أو grid', 'the space between flex or grid items'), ex: 'gap: 12px' },
        { t: 'media query', m: B('قواعد CSS بتشتغل حسب حجم الشاشة', 'CSS rules that apply depending on the screen size'), ex: '@media (min-width: 700px)' },
        { t: 'responsive design', m: B('صفحة بتتظبط على أي حجم شاشة', 'a page that adapts to any screen size'), ex: 'one column on phones, two on laptops' },
        { t: 'mobile-first', m: B('تصمم للموبايل الأول وتزوّد للشاشات الكبيرة', 'designing for phones first, then adding for big screens'), ex: 'min-width media queries' },
        { t: 'logical property', m: B('خاصية CSS بالبداية والنهاية بدل الشمال واليمين', 'a CSS property using start and end instead of left and right'), ex: 'margin-inline-start' }
      ],
      read: [{ lib: 'CSS-Tricks: A Complete Guide to Flexbox', what: B('الصفحة كلها مع الرسومات.', 'The whole page with the drawings.') }, { lib: 'web.dev: Learn CSS', what: B('اقرا Flexbox وGrid وLogical properties.', 'Read Flexbox, Grid and Logical properties.') }],
      challenge: B('اعمل «صفحة هبوط» لمنتج: navbar بـ flex، وقسم رئيسي بصورة وكلام جنب بعض على الكمبيوتر وتحت بعض على الموبايل، و6 مميزات بـ grid، وفورم أسبوع اليوم 2 — بالعربي من اليمين، واختبرها على عرض 360 بكسل من DevTools.', 'Build a product «landing page»: a flex navbar, a hero with an image and text side by side on desktop and stacked on phones, 6 features in a grid, and the day 2 form — in right-to-left Arabic — and test it at 360 px wide in DevTools.'),
      quiz: [
        { q: B('عشان العناصر تنزل سطر جديد لما متلاقيش مكان في flex:', 'To let flex items wrap onto a new line:'), o: ['flex-wrap: wrap', 'display: block', 'gap: 0'], a: 0, why: B('wrap.', 'wrap.') },
        { q: B('`repeat(auto-fill, minmax(180px, 1fr))` بيعمل:', '`repeat(auto-fill, minmax(180px, 1fr))` creates:'), o: [B('أعمدة على قد الشاشة كل واحد 180 على الأقل', 'as many columns as fit, each at least 180'), B('180 عمود', '180 columns'), B('عمود واحد', 'one column')], a: 0, why: B('grid متجاوب من غير media query.', 'A responsive grid with no media query.') },
        { q: B('عشان نفس الـ CSS يشتغل في العربي والإنجليزي:', 'For one CSS to work in Arabic and English:'), o: [B('خصائص منطقية زي margin-inline-start', 'logical properties such as margin-inline-start'), B('margin-left دايمًا', 'always margin-left'), B('ملفين CSS', 'two CSS files')], a: 0, why: B('start/end بتتقلب مع dir.', 'start/end follow dir.') }
      ] },

    { title: B('Python بيكتب HTML', 'Python writes HTML'),
      goal: B('تخلي Python يطلّع صفحة أو تقرير HTML منسّق من البيانات، بأمان (escape)، بقوالب Jinja2، وإيميلات HTML بـ CSS جوه العناصر، وصفحة تتطبع PDF صح.', 'Have Python produce a formatted HTML page or report from data, safely (escaping), with Jinja2 templates, HTML emails with inline CSS, and a page that prints to PDF properly.'),
      learn: [
        { h: B('HTML من f-string، بأمان', 'HTML from an f-string, safely'),
          p: B('أبسط طريقة: تبني الـ HTML نص بـ f-string وتحفظه `report.html`. **لكن** أي بيانات جاية من برّه (اسم عميل، تعليق) لازم تعدّي على `html.escape()` الأول، وإلا اسم زي `<script>...` هيتنفّذ في الصفحة (XSS). ده بيشتغل هنا في الصفحة.', 'The simplest way: build the HTML as an f-string and save `report.html`. **But** any outside data (a customer name, a comment) must go through `html.escape()` first, or a name like `<script>...` runs in the page (XSS). This runs right here on the page.'),
          ex: 'import html\nrows = [("Sara Ahmed", 1200.0), ("Omar <b>Adel</b>", 450.5), ("Mona & Co", 3100.0)]\nbody = "".join(f"<tr><td>{html.escape(name)}</td><td>{amount:,.2f}</td></tr>" for name, amount in rows)\npage = f"""<!doctype html><meta charset="utf-8"><title>Report</title>\n<table><thead><tr><th>Customer</th><th>Amount</th></tr></thead><tbody>{body}</tbody></table>"""\nprint(page)', run: 1 },
        { h: B('قوالب Jinja2', 'Jinja2 templates'),
          p: B('لصفحات أكبر، افصل الشكل عن الكود: قالب `report.html.j2` فيه `{{ name }}` و`{% for row in rows %}`، وPython يملاه بـ `Environment(...).get_template(...).render(...)`. `autoescape=True` بيعمل escape لوحده. نفس الأسلوب اللي Flask وFastAPI بيستخدموه (أسبوع 21).', 'For bigger pages, separate the look from the code: a template `report.html.j2` with `{{ name }}` and `{% for row in rows %}`, filled by Python with `Environment(...).get_template(...).render(...)`. `autoescape=True` escapes for you. The same approach Flask and FastAPI use (week 21).'),
          ex: '# pip install jinja2\nfrom jinja2 import Environment, DictLoader\n\nTEMPLATE = """<h2>{{ title }}</h2>\n<table>\n  <tr><th>City</th><th>Revenue</th></tr>\n  {% for r in rows %}<tr><td>{{ r.city }}</td><td>{{ "{:,.2f}".format(r.revenue) }}</td></tr>\n  {% endfor %}\n</table>\n<p>Total: <b>{{ "{:,.2f}".format(rows | sum(attribute="revenue")) }}</b></p>"""\nenv = Environment(loader=DictLoader({"report": TEMPLATE}), autoescape=True)\nprint(env.get_template("report").render(title="September", rows=[{"city": "Cairo", "revenue": 128500.5}, {"city": "Giza", "revenue": 40210}]))' },
        { h: B('إيميل HTML وطباعة', 'HTML email and printing'),
          p: B('برامج الإيميل (Gmail وOutlook) بتشيل `<style>` أحيانًا، فإيميلات HTML بتتكتب بـ CSS جوه العناصر (`style="..."`) وجداول للترتيب وعرض أقصى 600 بكسل. وللطباعة/الـ PDF: `@media print { nav, button { display: none } }` و`page-break-inside: avoid` للجداول؛ وبعدين «اطبع → Save as PDF»، أو أوتوماتيك بـ Playwright (أسبوع 16).', 'Mail programs (Gmail, Outlook) sometimes strip `<style>`, so HTML emails use CSS inside the elements (`style="..."`), tables for layout and a 600-pixel maximum width. For printing/PDF: `@media print { nav, button { display: none } }` and `page-break-inside: avoid` for tables; then «Print → Save as PDF», or automatically with Playwright (week 16).'),
          ex: '<div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;color:#26302b">\n  <h2 style="color:#3f8f63;margin:0 0 8px">September report</h2>\n  <p style="margin:0 0 12px">Revenue: <b>245,910 EGP</b> (+12%)</p>\n  <table cellpadding="8" style="border-collapse:collapse;width:100%">\n    <tr style="background:#3f8f63;color:#fff"><th align="left">City</th><th align="right">Revenue</th></tr>\n    <tr><td>Cairo</td><td align="right">128,500.50</td></tr>\n    <tr style="background:#f1f6f2"><td>Alexandria</td><td align="right">77,300.75</td></tr>\n  </table>\n  <p style="font-size:12px;color:#6b7a71">Sent automatically by the sales bot.</p>\n</div>', run: 'html' }
      ],
      practice: [
        B('اكتب `make_report(rows) -> str` بترجّع صفحة HTML كاملة بجدول وCSS، واحفظها وافتحها.', 'Write `make_report(rows) -> str` returning a complete HTML page with a table and CSS, then save and open it.'),
        B('جرّب اسم عميل فيه `<script>alert(1)</script>` من غير escape وبيه (في ملف محلي).', 'Try a customer name containing `<script>alert(1)</script>` without and with escaping (in a local file).'),
        B('حوّل التقرير لقالب Jinja2 منفصل.', 'Turn the report into a separate Jinja2 template.'),
        B('ابعت التقرير كإيميل HTML لنفسك بدالة أسبوع 12 وشوفه في Gmail على الموبايل.', 'Send the report as an HTML email to yourself with the week 12 function and view it in Gmail on your phone.')
      ],
      code: [
        { u: B('شريط بياني بـ CSS من غير مكتبات', 'A CSS bar chart with no libraries'), p: 'import html\n\ndef bar_chart(data: dict[str, float]) -> str:\n    top = max(data.values()) or 1\n    rows = "".join(\n        f\'<div style="display:flex;align-items:center;gap:8px;margin:4px 0">\'\n        f\'<span style="width:90px">{html.escape(k)}</span>\'\n        f\'<span style="height:16px;width:{v / top * 260:.0f}px;background:#3f8f63;border-radius:4px"></span>\'\n        f\'<span>{v:,.0f}</span></div>\'\n        for k, v in sorted(data.items(), key=lambda kv: -kv[1]))\n    return f"<div>{rows}</div>"\n\nprint(bar_chart({"Cairo": 128500, "Alexandria": 77300, "Giza": 40210}))', run: 1 }
      ],
      words: [
        { t: 'html.escape', m: B('بتحوّل < و> و& لرموز آمنة قبل ما تحطها في HTML', 'turns <, > and & into safe codes before putting text in HTML'), ex: 'html.escape(name)' },
        { t: 'XSS', m: B('ثغرة: كود JavaScript غريب بيتنفّذ في صفحتك من بيانات مش متنضّفة', 'a hole where foreign JavaScript runs in your page from unescaped data'), ex: 'a name like <script>…' },
        { t: 'Jinja2', m: B('مكتبة قوالب HTML في Python', 'a Python HTML templating library'), ex: '{{ name }}  {% for r in rows %}' },
        { t: 'autoescape', m: B('خيار بيعمل escape لكل القيم في القالب لوحده', 'an option that escapes every value in a template automatically'), ex: 'Environment(autoescape=True)' },
        { t: 'inline CSS', m: B('CSS مكتوب جوه العنصر نفسه بـ style=', 'CSS written inside the element with style='), ex: 'style="color:#3f8f63"' },
        { t: 'print stylesheet', m: B('قواعد CSS بتشتغل وقت الطباعة بس', 'CSS rules that apply only when printing'), ex: '@media print { nav { display: none } }' }
      ],
      read: [{ lib: 'Real Python Tutorials', what: B('دوّر على «jinja templating» واقرا المقدمة.', 'Search for «jinja templating» and read the introduction.') }, { lib: 'The Python Standard Library', what: B('افتح صفحة html: html.escape.', 'Open the html page: html.escape.') }],
      challenge: B('خلي مشروع «تقرير المبيعات» (أسبوع 11) يطلّع كمان `report.html` بقالب Jinja2: كروت أرقام فوق بـ flex، وجدول المدن، وشريط بياني بـ CSS، وCSS للطباعة — وابعته إيميل HTML بنسخة inline.', 'Make the «sales report» project (week 11) also produce `report.html` from a Jinja2 template: number cards at the top with flex, the city table, a CSS bar chart, and print CSS — and email it as HTML with an inline version.'),
      quiz: [
        { q: B('ليه `html.escape` على اسم العميل؟', 'Why `html.escape` the customer name?'), o: [B('عشان أي HTML أو script جواه ميتنفّذش', 'so any HTML or script inside it does not run'), B('عشان العربي', 'for Arabic'), B('عشان يصغر', 'to shorten it')], a: 0, why: B('حماية من XSS.', 'Protection against XSS.') },
        { q: B('إيميلات HTML بتتكتب بـ:', 'HTML emails are written with:'), o: [B('CSS جوه العناصر وجداول', 'inline CSS and tables'), B('flexbox وgrid بس', 'only flexbox and grid'), B('JavaScript', 'JavaScript')], a: 0, why: B('برامج الإيميل محدودة.', 'Mail programs are limited.') },
        { q: B('في Jinja2، `{{ name }}` بـ autoescape:', 'In Jinja2, `{{ name }}` with autoescape:'), o: [B('بيتعمله escape لوحده', 'is escaped automatically'), B('بيتنفّذ كـ HTML', 'runs as HTML'), B('بيتمسح', 'is removed')], a: 0, why: B('أمان افتراضي.', 'Safe by default.') }
      ] },

    { title: B('مراجعة ومشروع واختبار الأسبوع', 'Review, project and weekly test'),
      goal: B('تبني تقرير/لوحة HTML بيطلّعها Python، شكلها محترف على الكمبيوتر والموبايل، وتعدّي الاختبار.', 'Build an HTML report/dashboard produced by Python that looks professional on desktop and phone, and pass the test.'),
      review: [
        B('هيكل الصفحة وlang وdir وviewport، والـ tags اللي ليها معنى، والـ alt.', 'Page structure, lang, dir and viewport, meaningful tags, and alt.'),
        B('الجداول (thead وth وtbody) والفورمز (label وtypes وrequired) وإرسالها لـ n8n.', 'Tables (thead, th, tbody) and forms (label, types, required) posting to n8n.'),
        B('الـ selectors والـ specificity والـ cascade والـ box model والوحدات.', 'Selectors, specificity, the cascade, the box model and units.'),
        B('flexbox وgrid وmedia queries وmobile-first والخصائص المنطقية للعربي.', 'flexbox, grid, media queries, mobile-first and logical properties for Arabic.'),
        B('Python بيكتب HTML: escape وJinja2 وإيميلات inline وCSS للطباعة.', 'Python writing HTML: escaping, Jinja2, inline emails and print CSS.')
      ],
      project: B('**لوحة المبيعات الثابتة** (`dashboard/`): سكربت Python بيقرا بيانات المبيعات (Excel أسبوع 11 أو JSON أسبوع 13) ويطلّع `out/dashboard.html` من قالب Jinja2 + `style.css`: header بـ nav، و4 كروت أرقام (flex)، وجدول المدن مترتب، وشريط بياني CSS للمنتجات، وgrid للفروع، ويتظبط على 360 بكسل، وبالعربي من اليمين بخط من Google Fonts، وCSS للطباعة. ونسخة `email.html` بـ CSS inline بتتبعت بدالة الإيميل (dry run). افحص الصفحة بالـ W3C Validator وصفر أخطاء. (هنزوّد عليها رسوم حقيقية وJavaScript الأسبوع الجاي.)', '**The static sales dashboard** (`dashboard/`): a Python script reads the sales data (the week 11 Excel or the week 13 JSON) and produces `out/dashboard.html` from a Jinja2 template plus `style.css`: a header with a nav, 4 number cards (flex), a sorted city table, a CSS bar chart of products, a grid of branches, working at 360 px, in right-to-left Arabic with a Google font, and print CSS. Plus an `email.html` version with inline CSS sent with your email function (dry run). Check the page with the W3C Validator and reach zero errors. (We add real charts and JavaScript next week.)'),
      test: [
        { q: B('أول سطر في أي صفحة HTML حديثة:', 'The first line of any modern HTML page:'), o: ['<!doctype html>', '<html>', '<head>'], a: 0, why: B('الـ doctype.', 'The doctype.') },
        { q: B('العنصر اللي بيظهر في تاب المتصفح:', 'The element shown in the browser tab:'), o: ['<title>', '<h1>', '<header>'], a: 0, why: B('جوه head.', 'Inside head.') },
        { q: B('لينك بيفتح في تاب جديد:', 'A link that opens in a new tab:'), o: ['target="_blank"', 'href="_new"', 'rel="tab"'], a: 0, why: B('target.', 'target.') },
        { q: B('ربط label بحقل:', 'Linking a label to a field:'), o: [B('for على الـ label = id الحقل', 'the label’s for = the field’s id'), B('name واحد', 'the same name'), B('class واحد', 'the same class')], a: 0, why: B('for ↔ id.', 'for ↔ id.') },
        { q: B('`#total` في CSS بيختار:', '`#total` in CSS selects:'), o: [B('العنصر اللي id بتاعه total', 'the element with id total'), B('كل العناصر total', 'every total element'), B('class total', 'class total')], a: 0, why: B('# = id.', '# = id.') },
        { q: B('`margin` هي المسافة:', '`margin` is the space:'), o: [B('برّه الحدود', 'outside the border'), B('جوه الحدود', 'inside the border'), B('بين الحروف', 'between letters')], a: 0, why: B('padding جوه.', 'padding is inside.') },
        { q: B('`box-sizing: border-box` بيخلي العرض:', '`box-sizing: border-box` makes the width:'), o: [B('يشمل الـ padding والـ border', 'include padding and border'), B('يتجاهل الـ padding', 'ignore padding'), B('ضعف', 'double')], a: 0, why: B('أسهل في الحسابات.', 'Easier to reason about.') },
        { q: B('عشان عنصرين يبقوا جنب بعض بمسافة:', 'To put two items side by side with a gap:'), o: ['display: flex; gap: 12px', 'display: block', 'float: none'], a: 0, why: B('flex + gap.', 'flex + gap.') },
        { q: B('`@media (min-width: 700px)` بتطبّق:', '`@media (min-width: 700px)` applies:'), o: [B('على الشاشات 700 وأكبر', 'on screens 700 wide and up'), B('على الموبايل بس', 'only on phones'), B('دايمًا', 'always')], a: 0, why: B('mobile-first.', 'Mobile-first.') },
        { q: B('خاصية بتتقلب مع الاتجاه العربي:', 'A property that flips with Arabic direction:'), o: ['padding-inline-start', 'padding-left', 'padding-top'], a: 0, why: B('منطقية.', 'Logical.') },
        { q: B('بيانات عميل هتتحط في HTML من Python:', 'Customer data placed in HTML from Python must be:'), o: [B('تعدّي على escape', 'escaped'), B('تتحط زي ما هي', 'inserted as is'), B('تتحول أرقام', 'turned into numbers')], a: 0, why: B('XSS.', 'XSS.') },
        { q: B('`{% for r in rows %}` من:', '`{% for r in rows %}` is from:'), o: ['Jinja2', 'CSS', 'HTML'], a: 0, why: B('صيغة القوالب.', 'Template syntax.') }
      ] }
  ]
};
