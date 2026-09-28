// n8n week 15 — Scraping and HTML.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الـ Scraping وHTML', 'Scraping and HTML'),
  goal: B('تقرا صفحات الويب بـ n8n بشكل محترم وقانوني: تفهم HTML، وتطلّع البيانات بـ CSS selectors، وتلاقي الـ API المخفي في المواقع الديناميكية، وتراقب تغيّر الأسعار والصفحات.',
          'Read web pages with n8n respectfully and legally: understand HTML, extract data with CSS selectors, find the hidden API behind dynamic sites, and monitor prices and page changes.'),
  days: [
    { title: B('HTML بسرعة', 'HTML in a hurry'),
      goal: B('تقرا بنية صفحة HTML وتلاقي العنصر اللي محتاجه بـ DevTools.', 'Read the structure of an HTML page and find the element you need with DevTools.'),
      learn: [
        { h: B('العناصر والخصائص', 'Elements and attributes'),
          p: B('الصفحة شجرة عناصر: `<div class="product"><h2>Name</h2><span class="price">99</span></div>`. كل عنصر ليه tag وممكن attributes زي class وid وhref.', 'A page is a tree of elements: `<div class="product"><h2>Name</h2><span class="price">99</span></div>`. Each element has a tag and may have attributes such as class, id and href.'),
          ex: '<a href="/p/42" class="title">Laptop</a>\ntag: a · attributes: href, class · text: Laptop' },
        { h: B('Inspect', 'Inspect'),
          p: B('في المتصفح: كليك يمين على الحاجة ← Inspect. هتشوف العنصر في الـ HTML وclass بتاعه. ده أول خطوة في أي scraping.', 'In the browser: right-click the thing → Inspect. You\'ll see the element in the HTML and its class. That\'s the first step of any scraping.'),
          ex: 'Right-click price → Inspect → <span class="price">' },
        { h: B('class وid', 'class and id'),
          p: B('id فريد في الصفحة (#main)، وclass بيتكرر لعناصر كتير (.product). الـ scraping غالبًا بيمسك class المتكرر عشان يجيب قايمة.', 'An id is unique on the page (#main); a class repeats across many elements (.product). Scraping usually targets the repeated class to get a list.'),
          ex: '#header (one)   .product (many)' }
      ],
      practice: [
        B('افتح صفحة منتجات واعمل Inspect على الاسم والسعر والصورة.', 'Open a product page and Inspect the name, price and image.'),
        B('اكتب الـ tag والـ class لكل واحد.', 'Write down the tag and class of each.'),
        B('حل أول 10 مستويات في CSS Diner.', 'Complete the first 10 levels of CSS Diner.'),
        B('نزّل HTML صفحة بـ HTTP Request وشوفه.', 'Fetch a page\'s HTML with HTTP Request and look at it.')
      ],
      words: ['tag / element', 'attribute',
        { t: 'DOM tree', m: B('بنية الصفحة كشجرة عناصر جوه بعض', 'the page structure as a tree of nested elements'), ex: 'html > body > div > span' },
        { t: 'class / id', m: B('أسماء للعناصر: class بيتكرر، id فريد', 'element names: a class repeats, an id is unique'), ex: '.product, #main' },
        { t: 'Inspect (DevTools)', m: B('أداة المتصفح تشوف بيها HTML أي عنصر', 'the browser tool that shows an element\'s HTML'), ex: 'Right-click → Inspect' }],
      read: ['lib:CSS Diner', 'lib:MDN: Structuring content with HTML'],
      challenge: B('اختار 3 مواقع مختلفة واكتب لكل واحد: العنصر اللي فيه القايمة، والـ selectors للاسم والسعر واللينك.', 'Pick 3 different sites and write for each: the element containing the list, and the selectors for name, price and link.'),
      quiz: [
        { q: B('class بيتكرر ولا فريد؟', 'Does a class repeat or is it unique?'), o: [B('بيتكرر', 'it repeats'), B('فريد', 'unique'), B('ممنوع', 'forbidden')], a: 0, why: B('id هو الفريد.', 'id is unique.') },
        { q: B('أول خطوة في scraping:', 'The first step of scraping:'), o: [B('Inspect للعنصر', 'Inspect the element'), B('تكتب regex', 'write a regex'), B('تشتري API', 'buy an API')], a: 0, why: B('تعرف الـ HTML.', 'Learn the HTML.') },
        { q: B('في `<a href="/p/42">`، href هو:', 'In `<a href="/p/42">`, href is:'), o: ['an attribute', 'a tag', 'text'], a: 0, why: B('خاصية.', 'An attribute.') }
      ] },

    { title: B('CSS selectors وHTML node', 'CSS selectors and the HTML node'),
      goal: B('تطلّع قايمة بيانات من صفحة بـ HTML node وselectors.', 'Extract a list of data from a page with the HTML node and selectors.'),
      learn: [
        { h: B('الـ selectors', 'Selectors'),
          p: B('`.product` كل عناصر الـ class ده، `.product h2` العنوان جوه كل منتج، `a[href]` لينكات، `li:nth-child(2)` تاني عنصر، `#price` بالـ id.', '`.product` every element with that class, `.product h2` the heading inside each product, `a[href]` links, `li:nth-child(2)` the second item, `#price` by id.'),
          ex: '.product .price\n.product a::attr(href) → in n8n: Attribute = href' },
        { h: B('HTML node: Extract HTML Content', 'HTML node: Extract HTML Content'),
          p: B('HTTP Request يجيب الصفحة ← HTML node ← Extract HTML Content: لكل حقل key وselector وReturn Value (Text أو Attribute أو HTML) وReturn Array لو كذا نتيجة.', 'HTTP Request fetches the page → HTML node → Extract HTML Content: for each field a key, a selector, a return value (Text, Attribute or HTML) and Return Array for multiple results.'),
          ex: 'names:  .product h2   Text      Return Array\nprices: .product .price Text   Return Array\nlinks:  .product a     Attribute href  Return Array' },
        { h: B('من arrays لـ items', 'From arrays to items'),
          p: B('هتطلع arrays (أسماء، أسعار، لينكات). حوّلها لـ items: Code بـ map على الـ index، أو Split Out لو array واحدة من objects.', 'You get arrays (names, prices, links). Turn them into items: a Code node mapping by index, or Split Out when it\'s one array of objects.'),
          ex: 'return $json.names.map((n, i) => ({ json: { name: n, price: $json.prices[i], link: $json.links[i] } }));' }
      ],
      practice: [
        B('اسحب قايمة من books.toscrape.com (موقع للتدريب): العنوان والسعر.', 'Scrape a list from books.toscrape.com (a practice site): title and price.'),
        B('طلّع اللينكات كـ Attribute href.', 'Extract links as the href attribute.'),
        B('حوّل الـ arrays لـ items.', 'Turn the arrays into items.'),
        B('نضّف السعر (شيل العملة وحوّله رقم).', 'Clean the price (remove the currency and make it a number).')
      ],
      words: ['CSS selector', 'HTML node',
        { t: 'Extract HTML Content', m: B('عملية HTML node بتطلّع بيانات بـ selectors', 'the HTML node operation that extracts data with selectors'), ex: 'key + selector + return value' },
        { t: 'Return Array', m: B('خيار بيرجّع كل النتايج مش أول واحدة', 'an option that returns every match, not just the first'), ex: 'All product names' },
        { t: 'nth-child', m: B('selector لعنصر بترتيبه', 'a selector for an element by its position'), ex: 'li:nth-child(2)' }],
      read: [{ t: 'Books to Scrape (practice site)', url: 'https://books.toscrape.com/', what: B('موقع معمول مخصوص للتدريب على الـ scraping.', 'A site built specifically for scraping practice.') }, 'lib:CSS Diner'],
      challenge: B('اعمل scraper لـ books.toscrape.com بيجيب كل الصفحات (pagination)، ويحفظ العنوان والسعر والتقييم والتوفر في Sheet.', 'Build a scraper for books.toscrape.com that goes through every page (pagination) and saves title, price, rating and availability to a sheet.'),
      quiz: [
        { q: B('العنوان جوه كل منتج:', 'The heading inside each product:'), o: ['.product h2', 'h2.product.all', '#product'], a: 0, why: B('مسافة = جوه.', 'A space = inside.') },
        { q: B('تطلّع لينك من <a>:', 'Extract a link from <a>:'), o: ['Attribute: href', 'Text', 'HTML'], a: 0, why: B('اللينك في href.', 'The link is in href.') },
        { q: B('عايز كل النتايج مش أول واحدة:', 'You want every result, not the first:'), o: ['Return Array', 'Execute Once', 'Limit'], a: 0, why: B('array.', 'An array.') }
      ] },

    { title: B('الأخلاق والقانون', 'Ethics and legality'),
      goal: B('تعمل scraping بشكل محترم: تشوف robots.txt والشروط، ومتضغطش على الموقع، ومتاخدش بيانات شخصية.', 'Scrape respectfully: check robots.txt and the terms, don\'t overload the site, and don\'t take personal data.'),
      learn: [
        { h: B('قبل ما تبدأ', 'Before you start'),
          p: B('في API رسمي؟ استخدمه. شوف robots.txt (`/robots.txt`) والشروط (Terms of Service). مواقع كتير بتمنع الـ scraping، وده ممكن يعرّضك أو يعرّض عميلك لمشاكل.', 'Is there an official API? Use it. Check robots.txt (`/robots.txt`) and the Terms of Service. Many sites forbid scraping, and that can cause trouble for you or your client.'),
          ex: 'User-agent: *\nDisallow: /checkout\nCrawl-delay: 10' },
        { h: B('متضغطش', 'Be gentle'),
          p: B('طلب كل كام ثانية مش 100 في الثانية. Wait بين الصفحات، وجيب اللي محتاجه بس، وفي أوقات الهدوء. عرّف نفسك بـ User-Agent واضح.', 'One request every few seconds, not 100 a second. Wait between pages, fetch only what you need, at quiet times. Identify yourself with a clear User-Agent.'),
          ex: 'User-Agent: MyPriceBot/1.0 (contact@example.com)' },
        { h: B('البيانات الشخصية', 'Personal data'),
          p: B('متجمعش إيميلات وتليفونات وبيانات ناس من مواقع. ده غالبًا مخالف لقوانين الخصوصية (زي GDPR) ولشروط المواقع. اسحب بيانات عامة (أسعار، منتجات، أخبار).', 'Don\'t collect people\'s emails, phones and data from sites. That usually violates privacy laws (such as GDPR) and site terms. Scrape public data (prices, products, news).'),
          ex: '✓ product prices   ✗ user profiles and emails' }
      ],
      practice: [
        B('افتح robots.txt لـ 5 مواقع مشهورة واكتب المسموح والممنوع.', 'Open robots.txt for 5 well-known sites and write what\'s allowed and not.'),
        B('ضيف Wait 3 ثواني بين الصفحات في الـ scraper بتاعك.', 'Add a 3-second Wait between pages in your scraper.'),
        B('حط User-Agent واضح في HTTP Request.', 'Set a clear User-Agent in HTTP Request.'),
        B('اكتب «scraping policy» لنفسك في 5 قواعد.', 'Write your own 5-rule "scraping policy".')
      ],
      words: ['scraping', 'robots.txt',
        { t: 'Terms of Service', m: B('شروط استخدام الموقع', 'a site\'s rules of use'), ex: 'Check them before scraping.' },
        { t: 'User-Agent', m: B('header بيعرّف البرنامج اللي بيطلب', 'a header identifying the program making the request'), ex: 'MyPriceBot/1.0' },
        { t: 'crawl delay', m: B('مدة الانتظار بين الطلبات عشان متضغطش على الموقع', 'the pause between requests so you don\'t overload a site'), ex: 'Crawl-delay: 10' }],
      read: [{ t: 'Google: Introduction to robots.txt', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro', what: B('اقرا إزاي robots.txt بيشتغل.', 'Read how robots.txt works.') }],
      challenge: B('قبل أي scraper لعميل، اعمل «checklist» فيها: API رسمي؟ robots.txt؟ الشروط؟ بيانات شخصية؟ السرعة؟ واستخدمها على مشروع.', 'Before any scraper for a client, make a checklist — official API? robots.txt? terms? personal data? speed? — and apply it to a project.'),
      quiz: [
        { q: B('الموقع عنده API رسمي:', 'The site has an official API:'), o: [B('استخدم الـ API', 'use the API'), B('اعمل scraping برضه', 'scrape anyway'), B('اسأل Google', 'ask Google')], a: 0, why: B('أأمن وأثبت.', 'Safer and more stable.') },
        { q: B('100 طلب في الثانية لموقع صغير:', '100 requests per second to a small site:'), o: [B('غلط وضاغط', 'wrong and harmful'), B('عادي', 'fine'), B('أسرع أحسن', 'faster is better')], a: 0, why: B('Wait بين الطلبات.', 'Wait between requests.') },
        { q: B('تجمع إيميلات ناس من مواقع:', 'Collecting people\'s emails from sites:'), o: [B('غالبًا مخالف للخصوصية', 'usually breaks privacy rules'), B('مسموح دايمًا', 'always allowed'), B('فكرة كويسة', 'a good idea')], a: 0, why: B('GDPR والشروط.', 'GDPR and terms.') }
      ] },

    { title: B('المواقع الديناميكية', 'Dynamic sites'),
      goal: B('تتعامل مع مواقع بتحمّل بياناتها بـ JavaScript: تلاقي الـ API المخفي، أو تستخدم متصفح.', 'Handle sites that load their data with JavaScript: find the hidden API, or use a browser.'),
      learn: [
        { h: B('الصفحة فاضية؟', 'An empty page?'),
          p: B('لو HTTP Request رجّع HTML مفيهوش البيانات اللي بتشوفها في المتصفح، يبقى الموقع بيحمّلها بـ JavaScript بعدين.', 'If HTTP Request returns HTML without the data you see in the browser, the site loads it later with JavaScript.'),
          ex: 'Browser: 20 products\nHTTP Request HTML: <div id="app"></div>' },
        { h: B('الـ API المخفي', 'The hidden API'),
          p: B('DevTools ← Network ← Fetch/XHR ← حدّث الصفحة. هتلاقي طلب بيرجّع JSON فيه البيانات. انسخه كـ cURL واعمله Import في HTTP Request. أسهل وأنضف من HTML.', 'DevTools → Network → Fetch/XHR → reload. You\'ll find a request returning JSON with the data. Copy it as cURL and import it into HTTP Request. Easier and cleaner than HTML.'),
          ex: 'GET /api/products?page=1 → { "items": [ … ] }' },
        { h: B('متصفح headless', 'A headless browser'),
          p: B('لو مفيش API واضح، تحتاج متصفح بيشغّل JavaScript (headless) زي Browserless أو Puppeteer في Docker، وn8n يكلمه بـ HTTP. تقيل ومكلّف، فآخر حل.', 'If there\'s no clear API, you need a browser that runs JavaScript (headless), such as Browserless or Puppeteer in Docker, called from n8n over HTTP. Heavy and costly, so a last resort.'),
          ex: 'n8n → HTTP Request → Browserless /content → rendered HTML → HTML node' }
      ],
      practice: [
        B('افتح موقع ديناميكي ولاقي طلب JSON في Network.', 'Open a dynamic site and find a JSON request in Network.'),
        B('انسخه كـ cURL واعمله Import في n8n.', 'Copy it as cURL and import it into n8n.'),
        B('اعمل pagination على الـ API المخفي.', 'Paginate the hidden API.'),
        B('اكتب مقارنة: HTML scraping ضد hidden API ضد headless browser.', 'Write a comparison: HTML scraping vs. hidden API vs. headless browser.')
      ],
      words: [
        { t: 'JavaScript-rendered page', m: B('صفحة بتتملى بالبيانات بعد ما JavaScript يشتغل', 'a page filled with data after JavaScript runs'), ex: '<div id="app"></div>' },
        { t: 'Network tab', m: B('تبويب DevTools اللي بيعرض كل الطلبات', 'the DevTools tab listing every request'), ex: 'Filter: Fetch/XHR' },
        { t: 'hidden API', m: B('API داخلي الموقع بيستخدمه لبياناته', 'an internal API a site uses for its own data'), ex: '/api/products?page=1' },
        { t: 'headless browser', m: B('متصفح من غير شاشة بيشغّل JavaScript', 'a browser without a window that runs JavaScript'), ex: 'Browserless, Puppeteer' },
        { t: 'Copy as cURL', m: B('خيار في DevTools بينسخ الطلب كأمر curl', 'a DevTools option that copies a request as a curl command'), ex: 'Right-click the request → Copy → Copy as cURL' }],
      read: [{ t: 'Chrome DevTools: Network', url: 'https://developer.chrome.com/docs/devtools/network', what: B('اقرا «Inspect network activity».', 'Read "Inspect network activity".') }],
      challenge: B('اختار موقع ديناميكي (عام ومسموح) ولاقي الـ API المخفي بتاعه، واعمل workflow بيجيب البيانات بـ pagination ويحفظها.', 'Pick a dynamic site (public and allowed), find its hidden API, and build a workflow that fetches the data with pagination and saves it.'),
      quiz: [
        { q: B('HTML راجع فاضي من البيانات:', 'The HTML comes back without the data:'), o: [B('الموقع بيحمّل بـ JavaScript', 'the site loads it with JavaScript'), B('الموقع واقع', 'the site is down'), B('الـ selector غلط', 'the selector is wrong')], a: 0, why: B('دوّر على الـ API.', 'Look for the API.') },
        { q: B('أسهل حل لموقع ديناميكي:', 'The easiest fix for a dynamic site:'), o: [B('الـ API المخفي من Network', 'the hidden API from Network'), B('headless browser دايمًا', 'always a headless browser'), B('regex', 'regex')], a: 0, why: B('JSON نضيف.', 'Clean JSON.') },
        { q: B('headless browser:', 'A headless browser is:'), o: [B('آخر حل لأنه تقيل', 'a last resort because it is heavy'), B('أول حل', 'the first choice'), B('مجاني وخفيف', 'free and light')], a: 0, why: B('موارد كتير.', 'Uses many resources.') }
      ] },

    { title: B('مراقبة الصفحات والأسعار', 'Monitoring pages and prices'),
      goal: B('تراقب تغيّر صفحة أو سعر وتبلّغ لما يحصل تغيير حقيقي بس.', 'Watch a page or price and alert only on a real change.'),
      learn: [
        { h: B('اكتشاف التغيير', 'Detecting change'),
          p: B('خزّن آخر قيمة (السعر، أو hash للجزء المهم من الصفحة) في Sheet أو Postgres. كل مرة قارن: لو اتغيّرت، بلّغ وحدّث القيمة المخزنة.', 'Store the last value (the price, or a hash of the important part of the page) in a sheet or Postgres. Each time, compare: if it changed, alert and update the stored value.'),
          ex: 'last_price 1200 → now 999 → alert "Price dropped 17%"' },
        { h: B('hash للمحتوى', 'Hashing content'),
          p: B('بدل ما تخزّن الصفحة كلها، اعمل hash (Crypto node، SHA256) للجزء المهم بس. لو الـ hash اتغيّر، المحتوى اتغيّر. واستبعد الأجزاء اللي بتتغيّر كل مرة (الوقت، الإعلانات).', 'Instead of storing the whole page, hash (Crypto node, SHA256) only the important part. If the hash changes, the content changed. Exclude parts that change every time (the time, ads).'),
          ex: 'HTML node (#terms) → Crypto SHA256 → compare with stored hash' },
        { h: B('التنبيه الذكي', 'Smart alerts'),
          p: B('متبلّغش على أي تغيير صغير: حط حد (السعر نزل أكتر من 10%)، وقول القيمة القديمة والجديدة والفرق واللينك.', 'Don\'t alert on every tiny change: set a threshold (the price dropped more than 10%), and state the old and new value, the difference and the link.'),
          ex: '📉 Laptop X: 1,200 → 999 (−17%) · link' }
      ],
      practice: [
        B('اعمل price tracker لـ 3 منتجات (من موقع تدريب أو API).', 'Build a price tracker for 3 products (from a practice site or an API).'),
        B('خزّن آخر سعر وقارن كل ساعة.', 'Store the last price and compare hourly.'),
        B('راقب جزء نص من صفحة بـ hash.', 'Watch a text section of a page with a hash.'),
        B('ضيف حد 10% للتنبيه.', 'Add a 10% threshold for alerts.')
      ],
      words: [
        { t: 'change detection', m: B('اكتشاف إن صفحة أو قيمة اتغيّرت', 'noticing that a page or value changed'), ex: 'Compare with the stored value.' },
        { t: 'content hash', m: B('بصمة قصيرة للمحتوى بتتغيّر لو هو اتغيّر', 'a short fingerprint of content that changes when it does'), ex: 'SHA256 of #terms' },
        { t: 'price tracker', m: B('workflow بيراقب الأسعار ويبلّغ', 'a workflow that watches prices and alerts'), ex: 'Alert when the price drops.' },
        { t: 'threshold', m: B('حد لازم التغيير يعدّيه عشان تبلّغ', 'a limit a change must pass before alerting'), ex: '> 10% drop' },
        { t: 'stored state', m: B('آخر قيمة محفوظة عشان تقارن بيها', 'the last saved value used for comparison'), ex: 'last_price in Postgres' }],
      read: [{ lib: 'n8n Workflow Templates', what: B('دوّر على «price monitoring» أو «website change» وحلل template.', 'Search for "price monitoring" or "website change" and study a template.') }],
      challenge: B('اعمل «competitor watch»: 5 صفحات منتجات منافسين (مسموح بيها)، كل 6 ساعات، تنبيه لو السعر اتغيّر أكتر من 5% أو المنتج خلص، وتقرير أسبوعي بالرسم البياني للأسعار.', 'Build a "competitor watch": 5 competitor product pages (where allowed), every 6 hours, alerting when a price moves more than 5% or a product sells out, plus a weekly report charting the prices.'),
      quiz: [
        { q: B('عشان تعرف الصفحة اتغيّرت من غير ما تخزّنها كلها:', 'To know a page changed without storing all of it:'), o: ['a content hash', 'a screenshot', 'nothing'], a: 0, why: B('بصمة.', 'A fingerprint.') },
        { q: B('تنبيه على تغيير 0.1%:', 'Alerting on a 0.1% change:'), o: [B('ضوضاء؛ حط threshold', 'noise; set a threshold'), B('ممتاز', 'excellent'), B('إجباري', 'required')], a: 0, why: B('alert fatigue.', 'alert fatigue.') },
        { q: B('stored state بيتحفظ في:', 'Stored state is saved in:'), o: ['a sheet or Postgres', 'the browser', 'the HTML'], a: 0, why: B('للمقارنة.', 'For comparison.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 16 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 16 opens when you score 70% or more.'),
      review: [
        B('tags وattributes وclass/id وInspect.', 'Tags, attributes, class/id and Inspect.'),
        B('CSS selectors وHTML node وReturn Array.', 'CSS selectors, the HTML node and Return Array.'),
        B('API رسمي الأول، robots.txt، الشروط، الهدوء، ومفيش بيانات شخصية.', 'Official API first, robots.txt, terms, gentleness, and no personal data.'),
        B('المواقع الديناميكية: hidden API، Copy as cURL، headless.', 'Dynamic sites: hidden API, Copy as cURL, headless.'),
        B('المراقبة: stored state، hash، threshold.', 'Monitoring: stored state, hash, threshold.')
      ],
      project: B('ابني «market monitor» محترم: بيسحب بيانات عامة (أسعار أو أخبار) من 3 مصادر مسموحة (واحد HTML، وواحد hidden API، وواحد RSS)، بهدوء وUser-Agent واضح، ويخزّنها في Postgres، ويبلّغ بالتغيير المهم بس، وتقرير أسبوعي. ومعاه «scraping policy» في README.',
                 'Build a respectful "market monitor": it collects public data (prices or news) from 3 permitted sources (one HTML, one hidden API, one RSS), gently and with a clear User-Agent, stores it in Postgres, alerts only on important changes, and sends a weekly report. Include a "scraping policy" in the README.'),
      test: [
        { q: B('`#main` بيختار:', '`#main` selects:'), o: [B('عنصر id=main', 'the element with id main'), B('كل class main', 'every main class'), B('tag main', 'the main tag')], a: 0, why: B('# = id.', '# = id.') },
        { q: B('`.product .price` بيختار:', '`.product .price` selects:'), o: [B('السعر جوه كل منتج', 'the price inside each product'), B('المنتج بس', 'only products'), B('أول سعر', 'the first price')], a: 0, why: B('جوه.', 'Inside.') },
        { q: B('Return Value للينك:', 'The return value for a link:'), o: ['Attribute: href', 'Text', 'HTML'], a: 0, why: B('href.', 'href.') },
        { q: B('HTML node بيحتاج قبله:', 'The HTML node needs before it:'), o: [B('HTML من HTTP Request', 'HTML from HTTP Request'), B('Postgres', 'Postgres'), B('Wait', 'Wait')], a: 0, why: B('يقرا HTML.', 'It reads HTML.') },
        { q: B('robots.txt فين؟', 'Where is robots.txt?'), o: ['/robots.txt', '/api', '/admin'], a: 0, why: B('جذر الموقع.', 'The site root.') },
        { q: B('User-Agent واضح بيعمل:', 'A clear User-Agent:'), o: [B('بيعرّف البوت بتاعك', 'identifies your bot'), B('بيخفيك', 'hides you'), B('بيسرّع', 'speeds up')], a: 0, why: B('شفافية.', 'Transparency.') },
        { q: B('بيانات مسموح تسحبها غالبًا:', 'Data you may usually scrape:'), o: [B('أسعار ومنتجات عامة', 'public prices and products'), B('إيميلات الناس', 'people\'s emails'), B('بيانات حسابات', 'account data')], a: 0, why: B('عامة ومش شخصية.', 'Public, not personal.') },
        { q: B('البيانات بتظهر في المتصفح بس مش في HTML:', 'Data shows in the browser but not in the HTML:'), o: [B('JavaScript-rendered؛ دوّر على API', 'JavaScript-rendered; look for an API'), B('الموقع بيكدب', 'the site lies'), B('غيّر الـ selector', 'change the selector')], a: 0, why: B('Network tab.', 'The Network tab.') },
        { q: B('Copy as cURL بيفيد في:', 'Copy as cURL helps to:'), o: [B('نقل الطلب لـ HTTP Request بسرعة', 'move the request into HTTP Request quickly'), B('حذف الطلب', 'delete the request'), B('تشفيره', 'encrypt it')], a: 0, why: B('Import cURL.', 'Import cURL.') },
        { q: B('headless browser:', 'A headless browser:'), o: [B('بيشغّل JavaScript من غير شاشة', 'runs JavaScript without a screen'), B('بيعمل OCR', 'does OCR'), B('قاعدة بيانات', 'is a database')], a: 0, why: B('Puppeteer.', 'Puppeteer.') },
        { q: B('تكتشف تغيير صفحة بكفاءة:', 'Detect a page change efficiently:'), o: ['hash the important part', 'store the whole page each time', 'guess'], a: 0, why: B('بصمة.', 'A fingerprint.') },
        { q: B('threshold في التنبيه:', 'A threshold in alerts:'), o: [B('حد لازم التغيير يعدّيه', 'a limit the change must exceed'), B('ميعاد', 'a time'), B('باسورد', 'a password')], a: 0, why: B('تقليل الضوضاء.', 'Less noise.') }
      ] }
  ]
};
