// JavaScript week 24 — scraping with Node and the month 6 project.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('متوسط', 'Intermediate'),
  title: B('الـ Scraping بـ Node ومشروع الشهر', 'Scraping with Node and the month project'),
  goal: B('تجمع بيانات عامة من مواقع بشكل قانوني ومحترم: تقرا robots.txt والشروط، تجيب وتحلل HTML، تمشي على صفحات وsitemaps، تحترم الموقع بالحدود والكاش، تكشف التغييرات، وتطلّع بيانات نضيفة — وتسلّم مشروع الشهر السادس.',
          'Collect public data from websites legally and politely: read robots.txt and the terms, fetch and parse HTML, walk pages and sitemaps, respect the site with limits and caching, detect changes, and produce clean data — and deliver the sixth month’s project.'),
  days: [
    { title: B('الأخلاق والقانون الأول', 'Ethics and law first'),
      goal: B('تعرف تكشط إيه وإزاي من غير ما تضر حد.', 'Know what to scrape and how, without harming anyone.'),
      learn: [
        L(B('قبل أي سطر كود', 'Before any line of code'),
          B('**web scraping** = جمع بيانات من صفحات ويب بالكود. قبل ما تبدأ: فيه API أو RSS أو تصدير رسمي؟ استخدمه. اقرا **terms of service**. متجمعش **personal data** (أسماء وتليفونات ناس) من غير أساس قانوني. خف على الموقع (طلب كل ثانيتين مش 100 في الثانية). عرّف نفسك بـ User-Agent فيه إيميل.', '**web scraping** = collecting data from web pages with code. Before you start: is there an API, an RSS feed or an official export? Use it. Read the **terms of service**. Do not collect **personal data** (people’s names and phones) without a legal basis. Go easy on the site (one request every two seconds, not 100 per second). Identify yourself with a User-Agent containing an email.'),
          '✓ public prices of products, your own site, open data, with permission\n✓ an API / RSS feed / sitemap first\n✓ User-Agent: "PriceWatch/1.0 (+mailto:ops@example.com)"\n✗ logged-in areas you were not authorised to automate\n✗ personal data, copyrighted articles republished as yours\n✗ hammering a small shop’s server', T),
        L(B('robots.txt', 'robots.txt'),
          B('**robots.txt** (في `/robots.txt`) بيقول لأي **scraper** أو **crawler** المسارات المسموحة والممنوعة، وساعات **crawl delay**. احترامه أقل حاجة. المحلل البسيط ده بيطبّق القاعدة الأطول تطابقًا لـ User-Agent بتاعك أو `*`:', '**robots.txt** (at `/robots.txt`) tells any **scraper** or **crawler** which paths are allowed or disallowed, and sometimes a **crawl delay**. Respecting it is the minimum. This simple parser applies the longest matching rule for your User-Agent or `*`:'),
          'function parseRobots(txt, agent) {\n  const groups = []; let cur = null, lastWasAgent = false;\n  for (const raw of txt.split(/\\r?\\n/)) {\n    const line = raw.replace(/#.*/, "").trim();\n    const m = line.match(/^([\\w-]+)\\s*:\\s*(.*)$/); if (!m) continue;\n    const [, key, value] = [null, m[1].toLowerCase(), m[2].trim()];\n    if (key === "user-agent") { if (!lastWasAgent) groups.push(cur = { agents: [], rules: [], delay: null }); cur.agents.push(value.toLowerCase()); lastWasAgent = true; continue; }\n    lastWasAgent = false;\n    if (!cur) continue;\n    if (key === "allow" || key === "disallow") cur.rules.push({ allow: key === "allow", path: value });\n    if (key === "crawl-delay") cur.delay = Number(value);\n  }\n  const g = groups.find(g => g.agents.some(a => agent.toLowerCase().includes(a) && a !== "*")) ?? groups.find(g => g.agents.includes("*")) ?? { rules: [], delay: null };\n  return {\n    delay: g.delay,\n    allowed(path) {\n      const hits = g.rules.filter(r => r.path && path.startsWith(r.path)).sort((a, b) => b.path.length - a.path.length);\n      return hits.length ? hits[0].allow : true;\n    },\n  };\n}\nconst robots = parseRobots(`User-agent: *\nDisallow: /cart\nDisallow: /account/\nAllow: /account/help\nCrawl-delay: 2\n\nUser-agent: BadBot\nDisallow: /`, "PriceWatch/1.0");\nfor (const p of ["/products/notebook", "/cart?id=3", "/account/orders", "/account/help"]) console.log(p.padEnd(20), robots.allowed(p) ? "allowed" : "disallowed");\nconsole.log("crawl delay:", robots.delay, "s");', J),
        L(B('البيانات العامة بس', 'Public data only'),
          B('حتى لو البيانات ظاهرة، فيه حدود: متتخطاش تسجيل دخول أو paywall أو CAPTCHA، ومتعيدش نشر محتوى غيرك، وخزّن أقل حاجة محتاجها، وامسح القديم. ولو صاحب الموقع طلب توقف — توقف. ده مش بس أخلاق: كتير من البلاد عندها قوانين بيانات وحقوق ملكية.', 'Even when data is visible, there are limits: do not bypass logins, paywalls or CAPTCHAs, do not republish others’ content, store the least you need and delete old data. If the site owner asks you to stop — stop. This is not only ethics: many countries have data-protection and copyright laws.'),
          'questions to answer in your project README:\n1. Is there an API/feed? (link)   2. robots.txt allows these paths? (yes/no)\n3. Terms of service allow it?     4. Any personal data? (no / which, why, how long kept)\n5. Request rate and User-Agent    6. Contact if the site objects', T)
      ],
      practice: [
        B('افتح robots.txt لـ 3 مواقع واقراه.', 'Open robots.txt for 3 sites and read it.'),
        B('شغّل المحلل على robots.txt حقيقي.', 'Run the parser on a real robots.txt.'),
        B('دوّر على API أو RSS لموقع كنت هتكشطه.', 'Look for an API or RSS for a site you meant to scrape.'),
        B('اكتب الـ 6 أسئلة لمشروعك.', 'Answer the 6 questions for your project.')
      ],
      words: [
        W('web scraping', 'جمع بيانات من صفحات ويب بالكود', 'collecting data from web pages with code', 'Web scraping is a last resort.'),
        W('robots.txt', 'ملف قواعد الزحف للمواقع', 'a site’s file of crawling rules', 'Check robots.txt before crawling.'),
        W('crawl delay', 'المدة المطلوبة بين الطلبات', 'the requested time between requests', 'Respect a crawl delay of 2 seconds.'),
        W('terms of service', 'شروط استخدام الموقع', 'the site’s terms of use', 'The terms of service forbid scraping.'),
        W('personal data', 'بيانات بتحدد شخص', 'data identifying a person', 'Do not collect personal data.'),
        W('scraper', 'برنامج بيستخرج بيانات من صفحات', 'a program extracting data from pages', 'The scraper reads prices.'),
        W('crawler', 'برنامج بيمشي على روابط الصفحات', 'a program following links between pages', 'The crawler stays on one domain.')
      ],
      read: [{ t: 'Google: robots.txt introduction', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro', what: B('اقرا What is robots.txt used for.', 'Read What is robots.txt used for.') }, { t: 'RFC 9309: Robots Exclusion Protocol', url: 'https://datatracker.ietf.org/doc/html/rfc9309', what: B('اقرا قسم 2.2.', 'Read section 2.2.') }],
      challenge: B('اختار موقع بيانات عامة (أسعار، أخبار مفتوحة، بيانات حكومية) واكتب صفحة «تقييم الكشط»: API موجود؟ robots.txt؟ الشروط؟ بيانات شخصية؟ المعدل؟ — وقرار: نكشط ولا لأ.', 'Pick a public-data site (prices, open news, government data) and write a «scraping assessment» page: an API? robots.txt? terms? personal data? rate? — and a decision: scrape or not.'),
      quiz: [
        Q(B('فيه RSS للمقالات:', 'There is an RSS feed for articles:'), [['استخدمه', 'use it'], ['اكشط HTML', 'scrape the HTML'], ['الاتنين', 'both']], 0, B('أبسط وأأدب.', 'Simpler and politer.')),
        Q(B('Disallow: /account/ وAllow: /account/help:', 'Disallow: /account/ and Allow: /account/help:'), [['/account/help مسموح', '/account/help is allowed'], ['كله ممنوع', 'everything is blocked'], ['كله مسموح', 'everything is allowed']], 0, B('الأطول يكسب.', 'The longest wins.')),
        Q(B('CAPTCHA في الطريق:', 'A CAPTCHA in the way:'), [['وقّف؛ ده رفض', 'stop; it is a refusal'], ['اتخطاه', 'bypass it'], ['اشتري خدمة حل', 'buy a solving service']], 0, B('احترم.', 'Respect it.'))
      ] },

    { title: B('الجلب والتحليل', 'Fetching and parsing'),
      goal: B('تحوّل صفحة HTML لبيانات منظمة.', 'Turn an HTML page into structured data.'),
      learn: [
        L(B('Cheerio في Node', 'Cheerio in Node'),
          B('fetch بيجيب HTML نص، و**cheerio** بيحلله ويدّيك محددات CSS زي jQuery — من غير متصفح (أسرع 50 مرة من Playwright). استخدمه لما البيانات موجودة في HTML الأصلي (View Source)، وPlaywright لما الصفحة بتبنيها JS.', 'fetch gets the HTML as text, and **cheerio** parses it and gives you CSS selectors like jQuery — with no browser (50× faster than Playwright). Use it when the data is in the original HTML (View Source), and Playwright when JS builds the page.'),
          'import * as cheerio from "cheerio";\n\nconst UA = "PriceWatch/1.0 (+mailto:ops@example.com)";\nconst res = await fetch("https://shop.example.com/category/notebooks", { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(15_000) });\nif (!res.ok) throw new Error(`HTTP ${res.status}`);\nconst $ = cheerio.load(await res.text());\nconst products = $(".product-card").map((_, el) => ({\n  name: $(el).find(".title").text().trim(),\n  price: $(el).find(".price").text().trim(),\n  url: new URL($(el).find("a").attr("href"), res.url).href,\n})).get();\nconsole.log(products.length, products[0]);', S),
        L(B('نفس الفكرة بـ DOMParser', 'The same idea with DOMParser'),
          B('في المتصفح (أو jsdom) **domparser** بيعمل نفس الشغل. المثال بيحلل HTML صفحة منتجات ويستخرج البيانات بـ **css selector**، ويحوّل الروابط النسبية لكاملة بـ `new URL(href, base)` — أهم تفصيلة في أي scraper:', 'In the browser (or jsdom) **domparser** does the same job. The example parses a product-page HTML, extracts the data with each **css selector**, and turns relative links into full ones with `new URL(href, base)` — the most important detail in any scraper:'),
          'const html = `<main>\n  <article class="product-card"><a href="/p/notebook-a5"><h2 class="title"> Notebook A5 </h2></a><span class="price">EGP 45.00</span><span class="stock in">In stock</span></article>\n  <article class="product-card"><a href="/p/pen-blue"><h2 class="title">Blue pen</h2></a><span class="price">EGP 12.50</span><span class="stock out">Sold out</span></article>\n  <a class="next" href="?page=2">Next</a>\n</main>`;\nconst base = "https://shop.example.com/category/stationery";\nconst doc = new DOMParser().parseFromString(html, "text/html");\nconst products = [...doc.querySelectorAll(".product-card")].map(card => ({\n  name: card.querySelector(".title")?.textContent.trim(),\n  price: Number(card.querySelector(".price")?.textContent.replace(/[^\\d.]/g, "")),\n  inStock: card.querySelector(".stock")?.classList.contains("in") ?? false,\n  url: new URL(card.querySelector("a").getAttribute("href"), base).href,\n}));\nconsole.log(products);\nconsole.log("next page:", new URL(doc.querySelector("a.next").getAttribute("href"), base).href);', J),
        L(B('محددات بتعيش', 'Selectors that last'),
          B('المواقع بتتغير. اختار محددات بالمعنى (`[itemprop=price]`، `[data-sku]`، عناوين وclasses بأسماء واضحة) مش بالمكان (`div:nth-child(3)`). واتحقق من النتيجة: لو 0 منتجات أو كل الأسعار NaN — التصميم اتغير؛ ارمي خطأ وابعت تنبيه بدل ما تحفظ بيانات فاضية.', 'Sites change. Choose selectors by meaning (`[itemprop=price]`, `[data-sku]`, clearly named headings and classes), not by position (`div:nth-child(3)`). And check the result: if there are 0 products or every price is NaN — the design changed; throw and alert instead of saving empty data.'),
          'function assertLooksRight(products, page) {\n  if (products.length === 0) throw new Error(`0 products on ${page} — layout changed?`);\n  const badPrices = products.filter(p => !(p.price > 0)).length;\n  if (badPrices / products.length > 0.2) throw new Error(`${badPrices}/${products.length} prices unreadable on ${page}`);\n}', S)
      ],
      practice: [
        B('شوف View Source لصفحة: البيانات فيها ولا JS بيجيبها؟', 'Check View Source: is the data there or loaded by JS?'),
        B('شغّل مثال DOMParser وضيف حقل الصورة.', 'Run the DOMParser example and add an image field.'),
        B('اكتب نفس المنطق بـ Cheerio في Node.', 'Write the same logic with Cheerio in Node.'),
        B('ضيف assertLooksRight وجرّب HTML متغير.', 'Add assertLooksRight and try changed HTML.')
      ],
      words: [
        W('cheerio', 'مكتبة تحليل HTML في Node', 'an HTML parsing library for Node', 'Cheerio reads the product cards.'),
        W('domparser', 'محلل HTML في المتصفح', 'the browser’s HTML parser', 'DOMParser turns text into a document.'),
        W('css selector', 'نمط لاختيار عناصر HTML', 'a pattern selecting HTML elements', 'The CSS selector .price finds prices.'),
        W('view source', 'عرض الـ HTML الأصلي للصفحة', 'showing a page’s original HTML', 'View Source shows the prices are there.'),
        W('layout change', 'تغيير تصميم بيكسر المحددات', 'a design change breaking selectors', 'A layout change returned 0 products.')
      ],
      read: [{ lib: 'Cheerio', what: B('اقرا Loading وSelecting elements.', 'Read Loading and Selecting elements.') }, { t: 'MDN: DOMParser', url: 'https://developer.mozilla.org/en-US/docs/Web/API/DOMParser', what: B('اقرا parseFromString.', 'Read parseFromString.') }],
      challenge: B('اعمل scraper لصفحة تصنيف من موقع تدريب مسموح (زي books.toscrape.com): الاسم والسعر والتوفر والتقييم والرابط الكامل لكل كتاب، مع فحص «شكلها صح» وUser-Agent.', 'Build a scraper for a category page on a practice site that allows it (such as books.toscrape.com): name, price, availability, rating and full URL of each book, with a «looks right» check and a User-Agent.'),
      quiz: [
        Q(B('البيانات في View Source:', 'The data is in View Source:'), ['fetch + Cheerio', 'Playwright', B('مستحيل', 'impossible')], 0, B('أسرع.', 'Faster.')),
        Q(B('href="/p/pen" يتحوّل:', 'href="/p/pen" becomes:'), ['new URL(href, base)', 'href + base', B('زي ما هو', 'stays as is')], 0, B('رابط كامل.', 'A full URL.')),
        Q(B('0 منتجات فجأة:', 'Suddenly 0 products:'), [['خطأ وتنبيه', 'an error and an alert'], ['احفظ فاضي', 'save empty data'], ['تجاهل', 'ignore']], 0, B('التصميم اتغير.', 'The layout changed.'))
      ] },

    { title: B('الزحف على صفحات كتير', 'Crawling many pages'),
      goal: B('تمشي على صفحات وsitemaps من غير تكرار ولا ضياع.', 'Walk pages and sitemaps without repeats or getting lost.'),
      learn: [
        L(B('طابور وsSet', 'A queue and a Set'),
          B('الـ crawler البسيط: **url queue** بيبدأ بصفحة، و**visited set** يمنع التكرار، و**crawl depth** حد للعمق، و**same origin** بس (متطلعش لمواقع تانية). وطبّع الروابط قبل المقارنة (شيل `#` وparameters التتبع) عشان نفس الصفحة متتحسبش مرتين.', 'A simple crawler: a **url queue** starting from one page, a **visited set** preventing repeats, a **crawl depth** limit, and **same origin** only (do not wander to other sites). Normalise links before comparing (drop `#` and tracking parameters) so one page is not counted twice.'),
          'const site = {   // a fake website: path → links on that page\n  "/": ["/c/notebooks", "/c/pens", "/about", "https://other.example/x"],\n  "/c/notebooks": ["/p/a5?utm_source=home", "/p/a4", "/c/notebooks?page=2#top"],\n  "/c/notebooks?page=2": ["/p/a3", "/c/notebooks"],\n  "/c/pens": ["/p/blue", "/p/red", "/c/pens"],\n  "/about": [], "/p/a5": [], "/p/a4": [], "/p/a3": [], "/p/blue": [], "/p/red": [],\n};\nconst ORIGIN = "https://shop.example.com";\nconst normalize = href => { const u = new URL(href, ORIGIN); u.hash = ""; [...u.searchParams.keys()].filter(k => k.startsWith("utm_")).forEach(k => u.searchParams.delete(k)); return u; };\nfunction crawl(start, maxDepth = 3) {\n  const queue = [{ url: normalize(start), depth: 0 }], visited = new Set(), products = [];\n  while (queue.length) {\n    const { url, depth } = queue.shift();\n    const key = url.pathname + url.search;\n    if (visited.has(key) || url.origin !== ORIGIN || depth > maxDepth) continue;\n    visited.add(key);\n    if (url.pathname.startsWith("/p/")) products.push(key);\n    for (const href of site[key] ?? []) queue.push({ url: normalize(href), depth: depth + 1 });\n  }\n  return { pages: visited.size, products };\n}\nconsole.log(crawl("/"));', J),
        L(B('sitemap', 'The sitemap'),
          B('أغلب المواقع عندها **sitemap** (`/sitemap.xml`، وغالبًا مكتوب في robots.txt): قايمة بكل الصفحات المهمة ومعاها تاريخ آخر تعديل `lastmod`. ده أسهل وأأدب من الزحف — وتقدر تجيب بس اللي اتعدل من آخر مرة.', 'Most sites have a **sitemap** (`/sitemap.xml`, often listed in robots.txt): a list of every important page with a last-modified date, `lastmod`. That is easier and politer than crawling — and you can fetch only what changed since last time.'),
          'const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://shop.example.com/p/a5</loc><lastmod>2026-10-02</lastmod></url>\n  <url><loc>https://shop.example.com/p/a4</loc><lastmod>2026-09-12</lastmod></url>\n  <url><loc>https://shop.example.com/about</loc><lastmod>2025-01-01</lastmod></url>\n</urlset>`;\nconst doc = new DOMParser().parseFromString(xml, "application/xml");\nconst entries = [...doc.getElementsByTagName("url")].map(u => ({ loc: u.getElementsByTagName("loc")[0].textContent, lastmod: u.getElementsByTagName("lastmod")[0]?.textContent }));\nconst lastRun = "2026-09-30";\nconst changed = entries.filter(e => e.loc.includes("/p/") && e.lastmod > lastRun);\nconsole.log(entries.length, "urls; changed products since", lastRun, "→", changed.map(e => e.loc));', J),
        L(B('صفحات «التالي»', '«Next» pages'),
          B('للتصنيفات: اتبع **next link** (`a[rel=next]` أو زرار «التالي») لحد ما يختفي، بحد أقصى للصفحات. ولو الرابط فيه `?page=N` تقدر تولّده — بس تأكد من آخر صفحة (صفحة فاضية أو نفس محتوى السابقة) عشان متلفش للأبد.', 'For categories: follow the **next link** (`a[rel=next]` or a «Next» button) until it disappears, with a page cap. If the URL has `?page=N` you can generate it — but detect the last page (an empty page or the same content as before) so you never loop forever.'),
          'async function* categoryPages(firstUrl, maxPages = 50) {\n  let url = firstUrl, prevFirst = null;\n  for (let n = 1; url && n <= maxPages; n++) {\n    const $ = cheerio.load(await politeFetch(url));\n    const first = $(".product-card .title").first().text();\n    if (first === prevFirst) return;                 // same content again → stop\n    prevFirst = first;\n    yield $;\n    const next = $("a[rel=next]").attr("href");\n    url = next ? new URL(next, url).href : null;\n  }\n}', S)
      ],
      practice: [
        B('شغّل الـ crawler الوهمي وضيف حد أقصى للصفحات.', 'Run the fake crawler and add a page cap.'),
        B('افتح sitemap.xml لموقع واعرف عدد الصفحات.', 'Open a site’s sitemap.xml and count the pages.'),
        B('اجلب بس الصفحات اللي اتعدلت من أسبوع.', 'Fetch only pages changed in the last week.'),
        B('اتبع روابط «التالي» على books.toscrape.com.', 'Follow «next» links on books.toscrape.com.')
      ],
      words: [
        W('url queue', 'قايمة روابط مستنية زيارة', 'a list of links waiting to be visited', 'Push new links onto the URL queue.'),
        W('visited set', 'مجموعة الروابط اللي اتزارت', 'the set of links already visited', 'The visited set stops loops.'),
        W('crawl depth', 'عدد الخطوات من صفحة البداية', 'how many steps from the start page', 'Limit the crawl depth to 3.'),
        W('same origin', 'نفس الموقع (بروتوكول ودومين وport)', 'the same site (scheme, domain and port)', 'Stay on the same origin.'),
        W('sitemap', 'ملف بكل صفحات الموقع', 'a file listing a site’s pages', 'The sitemap lists 4000 products.'),
        W('next link', 'رابط الصفحة التالية', 'the link to the following page', 'Follow the next link until it disappears.')
      ],
      read: [{ t: 'Google: Learn about sitemaps', url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', what: B('اقرا What is a sitemap.', 'Read What is a sitemap.') }, { t: 'books.toscrape.com', url: 'https://books.toscrape.com/', what: B('موقع مخصوص للتدريب على الكشط.', 'A site made for scraping practice.') }],
      challenge: B('اعمل crawler لـ books.toscrape.com: يبدأ من الرئيسية، يمشي على التصنيفات وصفحات «next»، يزور صفحات الكتب مرة واحدة (visited set)، بحد عمق وصفحات، ويطلّع NDJSON بكل الكتب.', 'Build a crawler for books.toscrape.com: start at the home page, walk categories and «next» pages, visit each book page once (a visited set), with depth and page limits, and output NDJSON of every book.'),
      quiz: [
        Q(B('نفس الصفحة بـ #top وutm_source:', 'The same page with #top and utm_source:'), [['طبّعها لرابط واحد', 'normalise to one URL'], ['صفحتين', 'two pages'], ['تجاهلها', 'ignore them']], 0, B('visited set.', 'Visited set.')),
        Q(B('أسهل طريقة لمعرفة كل المنتجات:', 'The easiest way to list every product:'), ['sitemap.xml', B('زحف كامل', 'a full crawl'), B('تخمين الروابط', 'guessing URLs')], 0, B('مع lastmod.', 'With lastmod.')),
        Q(B('رابط لموقع تاني:', 'A link to another site:'), [['متتبعهوش', 'do not follow it'], ['اتبعه', 'follow it'], ['احفظه وكمل منه', 'save it and continue from it']], 0, B('same origin.', 'Same origin.'))
      ] },

    { title: B('الأدب والكفاءة', 'Politeness and efficiency'),
      goal: B('تكشط بأقل حمل على الموقع وبأقل شغل ليك.', 'Scrape with the least load on the site and the least work for you.'),
      learn: [
        L(B('حد لكل موقع', 'A limit per site'),
          B('**politeness**: **per-host limit** = طلب واحد في نفس الوقت لكل دومين، بانتظار بينهم (crawl-delay أو ثانيتين)، وretry للـ 429/5xx باحترام Retry-After، ووقف كامل لو الأخطاء كترت. لو بتكشط 5 مواقع، كل واحد ليه طابوره — تقدر تشتغل على الخمسة بالتوازي.', '**politeness**: a **per-host limit** = one request at a time per domain, with a wait between them (the crawl-delay or two seconds), retries on 429/5xx respecting Retry-After, and a full stop if errors pile up. Scraping 5 sites? Each gets its own queue — you can work on all five in parallel.'),
          'const sleep = ms => new Promise(r => setTimeout(r, ms));\nfunction politeFetcher({ delayMs = 300 } = {}) {\n  const lastByHost = new Map(), chainByHost = new Map();\n  return function get(url) {\n    const host = new URL(url).host;\n    const prev = chainByHost.get(host) ?? Promise.resolve();\n    const job = prev.then(async () => {\n      const wait = (lastByHost.get(host) ?? 0) + delayMs - Date.now();\n      if (wait > 0) await sleep(wait);\n      lastByHost.set(host, Date.now());\n      return `${new Date().toISOString().slice(17, 23)} ${host}${new URL(url).pathname}`;   // a real fetch goes here\n    });\n    chainByHost.set(host, job.catch(() => {}));\n    return job;\n  };\n}\nconst get = politeFetcher({ delayMs: 300 });\nconst urls = ["https://a.example/1", "https://a.example/2", "https://b.example/1", "https://a.example/3", "https://b.example/2"];\nPromise.all(urls.map(get)).then(lines => console.log(lines.join("\\n")));', J),
        L(B('متجيبش اللي متغيرش', 'Do not re-fetch what did not change'),
          B('السيرفر بيبعت **etag** أو `Last-Modified`. المرة الجاية ابعت **conditional request** (`If-None-Match: <etag>`) — لو مفيش تغيير بيرد **304 not modified** من غير جسم: أسرع ليك وأخف عليه. ولو مفيش ETag: احسب **content hash** للجزء المهم واعرف اتغير ولا لأ.', 'The server sends an **etag** or `Last-Modified`. Next time send a **conditional request** (`If-None-Match: <etag>`) — if nothing changed it replies **304 not modified** with no body: faster for you and lighter for it. Without an ETag: compute a **content hash** of the important part to know whether it changed.'),
          'import { createHash } from "node:crypto";\nconst cache = new Map();          // url → { etag, hash }\nasync function fetchIfChanged(url, fakeServer) {\n  const prev = cache.get(url);\n  const res = await fakeServer(url, prev?.etag);\n  if (res.status === 304) return { url, changed: false, why: "304" };\n  const hash = createHash("sha256").update(res.body).digest("hex").slice(0, 12);\n  const changed = hash !== prev?.hash;\n  cache.set(url, { etag: res.etag, hash });\n  return { url, changed, why: changed ? "new content" : "same hash" };\n}\nlet version = 1;\nconst fakeServer = async (url, etag) => {\n  const current = `"v${version}"`;\n  return etag === current ? { status: 304 } : { status: 200, etag: current, body: `<p>price ${40 + version}</p>` };\n};\nconsole.log(await fetchIfChanged("/p/a5", fakeServer));\nconsole.log(await fetchIfChanged("/p/a5", fakeServer));\nversion = 2;\nconsole.log(await fetchIfChanged("/p/a5", fakeServer));', N()),
        L(B('كشف التغيير', 'Detecting change'),
          B('**change detection** هو الهدف في أغلب مشاريع الكشط: سعر نزل، منتج رجع، عطاء جديد اتنشر. خزّن آخر نسخة من البيانات المهمة (مش الصفحة كلها)، قارن، وابعت لـ n8n **الفرق** بس — «النوت بوك A5: 45 ← 39 (-13%)».', '**change detection** is the goal of most scraping projects: a price dropped, a product is back, a new tender was published. Store the last version of the important data (not the whole page), compare, and send n8n only the **difference** — «Notebook A5: 45 → 39 (-13%)».'),
          'const before = { A5: { price: 45, inStock: true }, A4: { price: 60, inStock: false }, PEN: { price: 12.5, inStock: true } };\nconst after = { A5: { price: 39, inStock: true }, A4: { price: 60, inStock: true }, PEN: { price: 12.5, inStock: true }, A3: { price: 30, inStock: true } };\nconst changes = [];\nfor (const [sku, now] of Object.entries(after)) {\n  const old = before[sku];\n  if (!old) { changes.push(`🆕 ${sku} added at ${now.price}`); continue; }\n  if (now.price !== old.price) changes.push(`💲 ${sku}: ${old.price} → ${now.price} (${(((now.price - old.price) / old.price) * 100).toFixed(0)}%)`);\n  if (now.inStock !== old.inStock) changes.push(`📦 ${sku}: ${now.inStock ? "back in stock" : "sold out"}`);\n}\nfor (const sku of Object.keys(before)) if (!after[sku]) changes.push(`🗑 ${sku} removed`);\nconsole.log(changes.join("\\n") || "no changes");', J)
      ],
      practice: [
        B('شغّل politeFetcher على 3 دومينات وشوف التوقيت.', 'Run politeFetcher on 3 domains and look at the timing.'),
        B('اطلب صفحة مرتين بـ If-None-Match وشوف 304.', 'Request a page twice with If-None-Match and see the 304.'),
        B('احسب hash لجزء الأسعار بس.', 'Hash only the prices part.'),
        B('اعمل رسالة الفرق لـ Telegram.', 'Format the difference as a Telegram message.')
      ],
      words: [
        W('politeness', 'التعامل بأدب مع سيرفر الموقع', 'treating the site’s server gently', 'Politeness means one request at a time.'),
        W('per-host limit', 'حد طلبات لكل دومين', 'a request limit per domain', 'A per-host limit of 1 protects small sites.'),
        W('etag', 'بصمة نسخة الصفحة من السيرفر', 'the server’s fingerprint of a page version', 'Save the ETag for next time.'),
        W('conditional request', 'طلب «ابعت لو اتغير بس»', 'a «send only if changed» request', 'A conditional request saves bandwidth.'),
        W('304 not modified', 'رد «متغيرش» من غير جسم', 'an «unchanged» reply with no body', '304 Not Modified means use your copy.'),
        W('content hash', 'بصمة للمحتوى نفسه', 'a fingerprint of the content itself', 'Compare the content hash to spot edits.'),
        W('change detection', 'اكتشاف إن حاجة اتغيرت', 'noticing that something changed', 'Change detection drives the alerts.')
      ],
      read: [{ t: 'MDN: HTTP conditional requests', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests', what: B('اقرا Cache update.', 'Read Cache update.') }, { t: 'MDN: ETag', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ETag', what: B('اقرا Avoiding mid-air collisions وCaching.', 'Read Avoiding mid-air collisions and Caching.') }],
      challenge: B('ضيف للـ crawler: politeFetcher لكل دومين، retry باحترام Retry-After، ETag وhash، وstate بآخر أسعار، وتقرير تغييرات بس.', 'Add to the crawler: a per-domain politeFetcher, retries respecting Retry-After, ETags and hashes, a state file of last prices, and a changes-only report.'),
      quiz: [
        Q(B('304:', '304:'), [['متغيرش؛ استخدم نسختك', 'unchanged; use your copy'], ['خطأ', 'an error'], ['اتمسح', 'deleted']], 0, B('من غير جسم.', 'No body.')),
        Q(B('موقعين مختلفين:', 'Two different sites:'), [['طابور لكل واحد بالتوازي', 'one queue each, in parallel'], ['طابور واحد', 'one queue'], ['من غير حد', 'no limits']], 0, B('per-host.', 'Per host.')),
        Q(B('نبعت لـ n8n:', 'Send to n8n:'), [['الفرق بس', 'only the difference'], ['الصفحة كلها', 'the whole page'], ['كل الأسعار كل مرة', 'every price every time']], 0, B('رسالة مفيدة.', 'A useful message.'))
      ] },

    { title: B('بيانات نضيفة', 'Clean data'),
      goal: B('تطلّع بيانات تتوثق فيها وتتخزن صح.', 'Produce trustworthy data stored the right way.'),
      learn: [
        L(B('JSON-LD أولًا', 'JSON-LD first'),
          B('مواقع كتير بتحط **structured data** لجوجل في `<script type="application/ld+json">` (**json-ld**): اسم المنتج والسعر والعملة والتوفر بشكل منظم. دوّر عليه **قبل** ما تكتب محددات — أثبت بكتير لأن الموقع بيحافظ عليه للـ SEO.', 'Many sites put **structured data** for Google in `<script type="application/ld+json">` (**json-ld**): the product name, price, currency and availability in a tidy form. Look for it **before** writing selectors — much more stable, since sites maintain it for SEO.'),
          'const html = `<html><head><link rel="canonical" href="https://shop.example.com/p/notebook-a5">\n<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"Notebook A5","sku":"NB-A5","offers":{"@type":"Offer","price":"45.00","priceCurrency":"EGP","availability":"https://schema.org/InStock"}}</script>\n</head><body>…</body></html>`;\nconst doc = new DOMParser().parseFromString(html, "text/html");\nconst blocks = [...doc.querySelectorAll(\'script[type="application/ld+json"]\')].flatMap(s => { try { return [JSON.parse(s.textContent)].flat(); } catch { return []; } });\nconst product = blocks.find(b => b["@type"] === "Product");\nconsole.log({\n  name: product.name, sku: product.sku,\n  price: Number(product.offers.price), currency: product.offers.priceCurrency,\n  inStock: product.offers.availability.endsWith("InStock"),\n  url: doc.querySelector("link[rel=canonical]").href,\n});', J),
        L(B('التنضيف والتكرار', 'Cleaning and duplicates'),
          B('**price parsing**: «EGP 1,250.00» و«١٢٥٠ ج.م» و«From 45» — استخدم parseAmount بتاع أسبوع 20 وخزّن العملة لوحدها. والتكرار: نفس المنتج بروابط كتير (`?ref=`، تصنيفين) — استخدم **canonical url** (`<link rel="canonical">`) أو الـ SKU كمفتاح.', '**price parsing**: «EGP 1,250.00», `١٢٥٠ ج.م` and «From 45» — use the parseAmount from week 20 and store the currency separately. Duplicates: the same product under many URLs (`?ref=`, two categories) — use the **canonical url** (`<link rel="canonical">`) or the SKU as the key.'),
          'const raw = [\n  { url: "https://shop.example.com/p/a5?ref=home", canonical: "https://shop.example.com/p/a5", sku: "NB-A5", price: "EGP 45.00" },\n  { url: "https://shop.example.com/c/notebooks/a5", canonical: "https://shop.example.com/p/a5", sku: "NB-A5", price: "45 ج.م" },\n  { url: "https://shop.example.com/p/pen", canonical: "https://shop.example.com/p/pen", sku: "PEN-B", price: "١٢٫٥٠ ج.م" },\n];\nconst toLatin = s => s.replace(/[\\u0660-\\u0669]/g, d => d.charCodeAt(0) - 0x660).replace("٫", ".");\nconst price = s => Number(toLatin(s).replace(/,/g, "").match(/\\d+(?:\\.\\d+)?/)?.[0]);   // the first number ("ج.م" has dots too)\nconst unique =new Map();\nfor (const r of raw) unique.set(r.sku || r.canonical, { sku: r.sku, url: r.canonical, price: price(r.price), currency: "EGP" });\nconsole.log([...unique.values()]);', J),
        L(B('التخزين والتسليم', 'Storage and delivery'),
          B('خزّن كل تشغيلة سطور NDJSON بتاريخ (التاريخ الكامل)، وجدول «آخر حالة» (sku ← آخر سعر). وابعت لـ n8n التغييرات بس (webhook بتوقيع)، وn8n يقرر: Telegram، شيت، CRM. ونضّف القديم (احتفظ بـ 90 يوم مثلًا).', 'Store each run as dated NDJSON lines (the full history), plus a «latest state» table (sku → last price). Send n8n only the changes (a signed webhook), and let n8n decide: Telegram, a sheet, a CRM. And clean up old data (keep 90 days, say).'),
          'data/\n  runs/2026-10-04T07-00.ndjson     ← every product seen this run (history)\n  latest.json                      ← { "NB-A5": { price: 39, inStock: true, seen: "…" } }\n  changes/2026-10-04.json          ← only what changed → POSTed to the n8n webhook\nkeep: runs 90 days · latest forever · changes 1 year', T)
      ],
      practice: [
        B('دوّر على JSON-LD في 3 صفحات منتجات حقيقية.', 'Look for JSON-LD on 3 real product pages.'),
        B('طبّع أسعار بأشكال مختلفة.', 'Normalise prices written in different ways.'),
        B('شيل التكرار بالـ canonical.', 'Remove duplicates using the canonical URL.'),
        B('صمّم فولدر data لمشروعك.', 'Design the data folder for your project.')
      ],
      words: [
        W('structured data', 'بيانات منظمة جوه الصفحة لمحركات البحث', 'tidy data inside a page for search engines', 'Read the structured data first.'),
        W('json-ld', 'صيغة structured data في script', 'the structured-data format inside a script tag', 'The JSON-LD holds the price.'),
        W('canonical url', 'الرابط الأساسي للصفحة', 'a page’s main URL', 'Deduplicate by canonical URL.'),
        W('price parsing', 'تحويل نص السعر لرقم', 'turning price text into a number', 'Price parsing handles Arabic digits.'),
        W('history', 'كل النسخ القديمة بالتاريخ', 'every old version by date', 'Keep 90 days of history.')
      ],
      read: [{ t: 'Google: Product structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/product', what: B('شوف شكل Product وOffer.', 'See the shape of Product and Offer.') }, { t: 'schema.org: Product', url: 'https://schema.org/Product', what: B('الحقول المتاحة.', 'The available fields.') }],
      challenge: B('خلّي الـ scraper يقرا JSON-LD الأول ولو مش موجود يرجع للمحددات، يطبّع الأسعار والعملات، يشيل التكرار بالـ canonical، ويخزّن history وlatest وchanges.', 'Make the scraper read JSON-LD first and fall back to selectors, normalise prices and currencies, deduplicate by canonical URL, and store history, latest and changes.'),
      quiz: [
        Q(B('أثبت مصدر للسعر:', 'The most stable price source:'), ['JSON-LD', 'div:nth-child(5)', B('صورة السعر', 'the price image')], 0, B('للـ SEO.', 'Kept for SEO.')),
        Q(B('نفس المنتج من تصنيفين:', 'The same product from two categories:'), [['canonical أو SKU كمفتاح', 'canonical or SKU as the key'], ['منتجين', 'two products'], ['امسح الاتنين', 'delete both']], 0, B('dedupe.', 'Dedupe.')),
        Q(B('لـ n8n نبعت:', 'We send n8n:'), [['التغييرات بس', 'only the changes'], ['كل الـ history', 'the whole history'], ['HTML', 'HTML']], 0, B('مفيد.', 'Useful.'))
      ] },

    { title: B('مراجعة الشهر السادس ومشروعه', 'Month 6 review and project'),
      goal: B('نظام مراقبة متكامل بجافاسكريبت وn8n.', 'A complete monitoring system with JavaScript and n8n.'),
      review: [
        B('Code node بعمق: items، وأوضاع، وLuxon، وstatic data (أسبوع 21).', 'The Code node in depth: items, modes, Luxon and static data (week 21).'),
        B('Apps Script: Sheets وtriggers وweb apps وGmail وDocs (أسبوع 22).', 'Apps Script: Sheets, triggers, web apps, Gmail and Docs (week 22).'),
        B('Playwright: locators، جلسات، شبكة، tracing (أسبوع 23).', 'Playwright: locators, sessions, network, tracing (week 23).'),
        B('الكشط: الأخلاق وrobots.txt، Cheerio/DOMParser، الزحف وsitemaps.', 'Scraping: ethics and robots.txt, Cheerio/DOMParser, crawling and sitemaps.'),
        B('الأدب (per-host، ETag، 304)، وكشف التغيير، وJSON-LD، والتخزين.', 'Politeness (per-host, ETag, 304), change detection, JSON-LD and storage.')
      ],
      project: B('مشروع الشهر السادس «مراقب الأسعار»: (1) تقييم مكتوب للمواقع (API؟ robots؟ شروط؟). (2) خدمة Node: sitemap أو crawler بحدود، fetch+Cheerio (أو Playwright للصفحات المبنية بـ JS)، JSON-LD أولًا، politeFetcher لكل دومين، ETag وhash، history/latest/changes. (3) webhook بتوقيع لـ n8n بالتغييرات. (4) workflow n8n: Code node بـ Luxon يرتب التغييرات ويقرر، Google Sheets للسجل، Telegram للتنبيه. (5) Apps Script في الشيت: قايمة «تحديث الآن» ودالة =CHANGE_PCT(). (6) tracing وتنبيهات وheartbeat وREADME.', 'Month 6 project «price watcher»: (1) a written assessment of the sites (API? robots? terms?). (2) A Node service: a sitemap or bounded crawler, fetch + Cheerio (or Playwright for JS-built pages), JSON-LD first, a per-domain politeFetcher, ETags and hashes, history/latest/changes. (3) A signed webhook to n8n with the changes. (4) An n8n workflow: a Code node with Luxon sorting and deciding, Google Sheets for the log, Telegram for alerts. (5) Apps Script in the sheet: an «update now» menu and a =CHANGE_PCT() function. (6) Tracing, alerts, a heartbeat and a README.'),
      test: [
        Q(B('أول سؤال قبل الكشط:', 'The first question before scraping:'), [['فيه API أو feed؟', 'is there an API or feed?'], ['أسرع مكتبة؟', 'the fastest library?'], ['كام صفحة؟', 'how many pages?']], 0, B('الأبسط.', 'The simplest.')),
        Q(B('robots.txt بيحدد:', 'robots.txt defines:'), [['المسارات المسموحة للزحف', 'the paths allowed for crawling'], ['الأسعار', 'the prices'], ['الألوان', 'the colours']], 0, B('احترمه.', 'Respect it.')),
        Q(B('User-Agent كويس:', 'A good User-Agent:'), [['اسم وإيميل تواصل', 'a name and a contact email'], ['متصفح مزيف', 'a fake browser'], ['فاضي', 'empty']], 0, B('شفافية.', 'Transparency.')),
        Q(B('البيانات في HTML الأصلي:', 'Data in the original HTML:'), ['Cheerio', 'Playwright', 'Apps Script'], 0, B('من غير متصفح.', 'No browser.')),
        Q(B('href نسبي:', 'A relative href:'), ['new URL(href, pageUrl)', 'href', 'base + href'], 0, B('رابط كامل.', 'A full URL.')),
        Q(B('منع زيارة نفس الصفحة:', 'Avoiding revisits:'), [['visited set بروابط مطبّعة', 'a visited set of normalised URLs'], ['ذاكرة', 'memory'], ['sleep', 'sleep']], 0, B('Set.', 'A Set.')),
        Q(B('lastmod في sitemap:', 'lastmod in a sitemap:'), [['تجيب اللي اتغير بس', 'fetch only what changed'], ['تاريخ الإنشاء', 'the creation date'], ['مش مهم', 'unimportant']], 0, B('كفاءة.', 'Efficiency.')),
        Q(B('per-host limit = 1:', 'A per-host limit of 1:'), [['طلب واحد في نفس الوقت للدومين', 'one request at a time per domain'], ['طلب واحد في اليوم', 'one request a day'], ['دومين واحد', 'one domain only']], 0, B('أدب.', 'Politeness.')),
        Q(B('If-None-Match ورد 304:', 'If-None-Match and a 304 reply:'), [['متغيرش', 'unchanged'], ['اتمسح', 'deleted'], ['ممنوع', 'forbidden']], 0, B('ETag.', 'ETag.')),
        Q(B('JSON-LD:', 'JSON-LD:'), [['بيانات منظمة جوه الصفحة', 'structured data inside the page'], ['ملف صور', 'an image file'], ['لغة برمجة', 'a programming language']], 0, B('schema.org.', 'schema.org.')),
        Q(B('مفتاح منع التكرار:', 'The dedupe key:'), [['SKU أو canonical', 'SKU or canonical URL'], ['الرابط الحالي', 'the current URL'], ['الاسم', 'the name']], 0, B('ثابت.', 'Stable.')),
        Q(B('0 منتجات فجأة:', 'Suddenly 0 products:'), [['خطأ وتنبيه وtrace', 'an error, an alert and a trace'], ['احفظ', 'save'], ['امسح الـ history', 'delete history']], 0, B('التصميم اتغير.', 'The layout changed.'))
      ] }
  ]
};
