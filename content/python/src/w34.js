// Python week 34 — Scraping at scale, and its ethics.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الـ scraping على نطاق كبير وأخلاقياته', 'Scraping at scale, and its ethics'),
  goal: B('تجمع بيانات من آلاف الصفحات بمسؤولية: تحترم القانون والقواعد والسيرفر، تزحف بأدب وبطابور منظم، تقرا بثبات وتكتشف لما الموقع يتغير، وتخزّن وتعيد الزحف بذكاء.',
          'Collect data from thousands of pages responsibly: respect the law, the rules and the server, crawl politely with an organised queue, parse reliably and detect when the site changes, and store and recrawl smartly.'),
  days: [
    { title: B('القانون والأخلاق أولًا', 'Law and ethics first'),
      goal: B('تعرف إمتى الـ scraping مسموح وإزاي تعمله بمسؤولية.', 'Know when scraping is allowed and how to do it responsibly.'),
      learn: [
        L(B('أسئلة قبل البداية', 'Questions before starting'),
          B('(1) فيه API رسمي؟ استخدمه. (2) شروط الموقع بتمنع؟ احترمها. (3) البيانات فيها **personal data**؟ القوانين (زي GDPR وقانون حماية البيانات المصري) بتنطبق. (4) المحتوى عليه **copyright**؟ جمع حقايق ≠ نسخ مقالات وصور ونشرها. (5) هتضغط على سيرفر صغير؟ خفّف.', '(1) Is there an official API? Use it. (2) Do the site’s terms forbid it? Respect them. (3) Does the data contain **personal data**? Laws (like the GDPR and Egypt’s data protection law) apply. (4) Is the content under **copyright**? Collecting facts ≠ copying and republishing articles and images. (5) Will you strain a small server? Go gently.'),
          'API? → ToS? → personal data? → copyright? → server load? → then decide', T),
        L(B('robots.txt في الكود', 'robots.txt in code'),
          B('`urllib.robotparser` بيقرا robots.txt ويقولك المسار مسموح لـ User-Agent بتاعك ولا لأ، وفيه **crawl-delay** (الانتظار المطلوب بين الطلبات). robots.txt مش قانون، بس احترامه أقل حاجة في الأدب.', '`urllib.robotparser` reads robots.txt and tells you whether a path is allowed for your User-Agent, and any **crawl-delay** (the requested wait between requests). robots.txt is not law, but respecting it is basic courtesy.'),
          'from urllib.robotparser import RobotFileParser\nrules = """User-agent: *\nDisallow: /admin/\nDisallow: /search\nCrawl-delay: 2\n"""\nrp = RobotFileParser()\nrp.parse(rules.splitlines())\nfor path in ["/products/1", "/admin/users", "/search?q=tea"]:\n    print(path, "allowed" if rp.can_fetch("MyShopBot/1.0", path) else "blocked")\nprint("crawl delay:", rp.crawl_delay("MyShopBot/1.0"))', R),
        L(B('عرّف نفسك', 'Identify yourself'),
          B('حط User-Agent واضح فيه اسم البوت ووسيلة تواصل: `MyShopBot/1.0 (+mailto:you@example.com)`. لو صاحب الموقع عنده مشكلة يقدر يكلمك بدل ما يحظرك. ومتتنكرش كمتصفح عادي عشان تتهرب من الحظر.', 'Use a clear User-Agent with the bot’s name and a contact: `MyShopBot/1.0 (+mailto:you@example.com)`. If the site owner has a problem they can contact you instead of blocking you. And do not disguise yourself as a normal browser to dodge blocks.'),
          'HEADERS = {"User-Agent": "PriceWatchBot/1.0 (+mailto:ops@example.com)"}', T)
      ],
      practice: [
        B('طبّق الأسئلة الخمسة على موقع عايز تجمع منه.', 'Apply the five questions to a site you want to collect from.'),
        B('اقرا robots.txt بتاع 3 مواقع واختبر مسارات بـ robotparser.', 'Read the robots.txt of 3 sites and test paths with robotparser.'),
        B('اكتب User-Agent لبوتك.', 'Write a User-Agent for your bot.'),
        B('اكتب سياسة scraping لمشروعك في 6 نقط.', 'Write a 6-point scraping policy for your project.')
      ],
      words: [
        W('robotparser', 'موديول بيقرا قواعد robots.txt', 'a module that reads robots.txt rules', 'Check every URL with robotparser.'),
        W('crawl-delay', 'الانتظار المطلوب بين الطلبات', 'the requested wait between requests', 'The crawl-delay is two seconds.'),
        W('copyright', 'حقوق الملكية للمحتوى', 'ownership rights over content', 'Do not republish articles under copyright.'),
        W('personal data', 'بيانات بتعرّف شخص', 'data identifying a person', 'Avoid collecting personal data.'),
        W('bot identity', 'اسم البوت ووسيلة التواصل في الطلب', 'the bot’s name and contact in the request', 'State your bot identity in the User-Agent.')
      ],
      read: ['lib:Google: robots.txt introduction', { lib: 'The Python Standard Library', what: B('اقرا urllib.robotparser.', 'Read urllib.robotparser.') }],
      challenge: B('اكتب «فاحص أهلية» بياخد موقع ومسارات: يقرا robots.txt، يطبّق crawl-delay، ويطبع checklist الأسئلة الخمسة ليك تملاها قبل أي زحف.', 'Write an «eligibility checker» that takes a site and paths: it reads robots.txt, applies the crawl-delay, and prints the five-question checklist for you to fill in before any crawl.'),
      quiz: [
        Q(B('فيه API رسمي للبيانات:', 'There is an official API for the data:'), [['استخدمه', 'use it'], ['اعمل scraping برضه', 'scrape anyway'], ['تجاهله', 'ignore it']], 0, B('أنضف وأثبت.', 'Cleaner and steadier.')),
        Q(B('crawl-delay: 2:', 'crawl-delay: 2:'), [['استنى ثانيتين بين الطلبات', 'wait two seconds between requests'], ['طلبين في الثانية', 'two requests per second'], ['مسارين ممنوعين', 'two blocked paths']], 0, B('أدب.', 'Courtesy.')),
        Q(B('User-Agent بيتنكر كمتصفح عشان يتهرب من الحظر:', 'A User-Agent posing as a browser to dodge blocks:'), [['ممارسة سيئة', 'bad practice'], ['أفضل ممارسة', 'best practice'], ['مطلوب', 'required']], 0, B('عرّف نفسك.', 'Identify yourself.'))
      ] },

    { title: B('الزحف المؤدب', 'Polite crawling'),
      goal: B('تجيب آلاف الصفحات من غير ما تضغط على السيرفر أو تتحظر.', 'Fetch thousands of pages without straining the server or getting blocked.'),
      learn: [
        L(B('حد لكل دومين', 'A limit per domain'),
          B('**polite crawling**: حد طلبات لكل دومين (مثلًا طلب كل ثانية أو حسب crawl-delay)، وتوازي قليل (2–4) لنفس الدومين. **token bucket** طريقة حلوة: «رصيد» طلبات بيتملي بمعدل ثابت، وكل طلب بياخد واحد.', '**Polite crawling**: a request limit per domain (e.g. one request per second, or by crawl-delay), and low concurrency (2–4) for the same domain. A **token bucket** is a neat method: a «balance» of requests refills at a steady rate, and each request spends one.'),
          'import time\n\nclass TokenBucket:\n    def __init__(self, rate, capacity):\n        self.rate, self.capacity = rate, capacity\n        self.tokens, self.last = capacity, time.monotonic()\n    def take(self):\n        while True:\n            now = time.monotonic()\n            self.tokens = min(self.capacity, self.tokens + (now - self.last) * self.rate)\n            self.last = now\n            if self.tokens >= 1:\n                self.tokens -= 1\n                return\n            time.sleep((1 - self.tokens) / self.rate)\n\nbucket, start = TokenBucket(rate=5, capacity=2), time.monotonic()\nfor i in range(8):\n    bucket.take()\nprint(f"8 requests took {time.monotonic() - start:.1f}s at ~5/s")', R),
        L(B('الطلبات الشرطية', 'Conditional requests'),
          B('لو الصفحة متغيّرتش، متنزّلهاش تاني: احفظ `ETag` و`Last-Modified` من الرد، وفي المرة الجاية ابعت `If-None-Match` / `If-Modified-Since`. السيرفر يرد **304 Not Modified** من غير body — توفير ليك وليه.', 'If a page has not changed, do not download it again: save `ETag` and `Last-Modified` from the reply, and next time send `If-None-Match` / `If-Modified-Since`. The server answers **304 Not Modified** with no body — a saving for you and for it.'),
          'headers = {"If-None-Match": cache[url]["etag"]} if url in cache else {}\nr = client.get(url, headers=headers)\nif r.status_code == 304:\n    html = cache[url]["html"]           # unchanged, use the stored copy\nelse:\n    cache[url] = {"etag": r.headers.get("ETag"), "html": r.text}', T),
        L(B('علامات إنك زوّدتها', 'Signs you went too far'),
          B('429، أو 503 كتير، أو CAPTCHA، أو الصفحات بقت أبطأ = **وقّف وخفّف**. استخدم backoff (أسبوع 27) واحترم Retry-After. ومتحاولش تكسر CAPTCHA أو تلف على الحظر بـ proxies كتير — دي إشارة إن الموقع مش عايزك.', '429s, many 503s, a CAPTCHA, or pages getting slower = **stop and slow down**. Use backoff (week 27) and respect Retry-After. Do not try to break CAPTCHAs or rotate many proxies to get round blocks — that is a sign the site does not want you.'),
          '429 / CAPTCHA → pause the domain 30 min → halve the rate → if it repeats, stop and reconsider', T)
      ],
      practice: [
        B('شغّل token bucket وغيّر المعدل.', 'Run the token bucket and change the rate.'),
        B('اعمل كاش بـ ETag لـ 10 صفحات وقيس الـ 304.', 'Build an ETag cache for 10 pages and count the 304s.'),
        B('اكتب قاعدة «وقّف وخفّف» لـ 429.', 'Write a «stop and slow down» rule for 429.'),
        B('اعمل حد 2 طلبات متزامنة لكل دومين.', 'Limit concurrency to 2 requests per domain.')
      ],
      words: [
        W('polite crawling', 'زحف بيحترم السيرفر وقواعده', 'crawling that respects the server and its rules', 'Polite crawling keeps you unblocked.'),
        W('token bucket', 'طريقة تحديد معدل برصيد بيتملي', 'a rate-limiting method with a refilling balance', 'The token bucket allows 5 requests a second.'),
        W('per-domain limit', 'حد طلبات لكل موقع', 'a request limit per website', 'Set a per-domain limit of one per second.'),
        W('conditional request', 'طلب بيقول «ابعت لو اتغيّر بس»', 'a request saying «send only if changed»', 'A conditional request returned 304.'),
        W('etag', 'بصمة نسخة الصفحة من السيرفر', 'the server’s fingerprint of a page version', 'Store the ETag with the HTML.')
      ],
      read: [{ t: 'MDN: HTTP conditional requests', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests', what: B('اقرا ETag و304.', 'Read about ETag and 304.') }, 'lib:Requests documentation'],
      challenge: B('اعمل «جالب مؤدب»: token bucket لكل دومين، crawl-delay من robots.txt، كاش ETag، backoff على 429، وتقرير (طلبات، 304، أخطاء) بعد 100 صفحة من books.toscrape.com.', 'Build a «polite fetcher»: a token bucket per domain, crawl-delay from robots.txt, an ETag cache, backoff on 429, and a report (requests, 304s, errors) after 100 pages of books.toscrape.com.'),
      quiz: [
        Q(B('304 Not Modified معناها:', '304 Not Modified means:'), [['الصفحة متغيّرتش؛ استخدم نسختك', 'unchanged; use your copy'], ['الصفحة اتمسحت', 'the page was deleted'], ['ممنوع', 'forbidden']], 0, B('توفير.', 'A saving.')),
        Q(B('ظهر CAPTCHA:', 'A CAPTCHA appeared:'), [['وقّف وخفّف وراجع', 'stop, slow down and reconsider'], ['اكسره', 'break it'], ['غيّر proxy', 'switch proxies']], 0, B('الموقع مش عايزك.', 'The site does not want you.')),
        Q(B('token bucket بيضمن:', 'A token bucket ensures:'), [['معدل طلبات ثابت', 'a steady request rate'], ['من غير أخطاء', 'no errors'], ['كاش', 'caching']], 0, B('معدل.', 'A rate.'))
      ] },

    { title: B('معمارية الزاحف', 'Crawler architecture'),
      goal: B('تنظّم زحف آلاف الروابط من غير تكرار ولا توهان.', 'Organise a crawl of thousands of links without repeats or wandering.'),
      learn: [
        L(B('طابور الروابط', 'The URL frontier'),
          B('**URL frontier** = طابور الروابط اللي لسه هتزورها، و**visited set** = اللي زرتها. كل صفحة بتطلّع روابط جديدة ← تتنضّف ← لو مش في visited تدخل الطابور. وحدد **crawl depth** (عمق) ودومينات مسموحة عشان الزاحف ميتوهش في النت كله.', 'The **URL frontier** = the queue of links still to visit, and the **visited set** = those already visited. Each page yields new links → they are normalised → if not visited, they join the queue. Set a **crawl depth** and allowed domains so the crawler does not wander across the whole web.'),
          'from collections import deque\nfrom urllib.parse import urljoin, urlparse\n\nsite = {"/": ["/a", "/b", "https://other.com/x"], "/a": ["/b", "/c"], "/b": ["/"], "/c": []}\nfrontier, visited = deque([("/", 0)]), set()\nwhile frontier:\n    url, depth = frontier.popleft()\n    if url in visited or depth > 2:\n        continue\n    visited.add(url)\n    for link in site.get(url, []):\n        absolute = urljoin("https://shop.example", link)\n        if urlparse(absolute).netloc == "shop.example":\n            frontier.append((urlparse(absolute).path, depth + 1))\nprint(sorted(visited))', R),
        L(B('تنضيف الروابط', 'Normalising URLs'),
          B('نفس الصفحة ليها أشكال كتير: `?utm_source=fb`، `#reviews`، `/Products/1` و`/products/1/`. **url normalization**: شيل الـ fragment وبارامترات التتبع، ورتّب الباقي، ووحّد الـ slash. من غير كده الـ visited set مش هيمنع التكرار.', 'The same page has many forms: `?utm_source=fb`, `#reviews`, `/Products/1` and `/products/1/`. **URL normalisation**: drop the fragment and tracking parameters, sort the rest, and unify the slash. Without it the visited set will not stop repeats.'),
          'from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode\n\ndef normalize(url):\n    s = urlsplit(url)\n    query = sorted((k, v) for k, v in parse_qsl(s.query) if not k.startswith("utm_"))\n    path = s.path.rstrip("/") or "/"\n    return urlunsplit((s.scheme, s.netloc.lower(), path, urlencode(query), ""))\n\nfor u in ["https://Shop.example/p/1/?utm_source=fb&b=2&a=1#reviews", "https://shop.example/p/1?a=1&b=2"]:\n    print(normalize(u))', R),
        L(B('sitemaps وScrapy', 'Sitemaps and Scrapy'),
          B('قبل ما تزحف، شوف `sitemap.xml`: قايمة رسمية بكل الصفحات وتاريخ تعديلها — أسهل وأأدب من الزحف. ولو المشروع كبير، **Scrapy** فرامورك فيه كل ده جاهز: طابور، حدود، إعادة محاولة، و**item pipeline** للتنضيف والحفظ.', 'Before crawling, check `sitemap.xml`: an official list of every page with its modification date — easier and more polite than crawling. For a big project, **Scrapy** is a framework with all of this built in: a queue, limits, retries and an **item pipeline** for cleaning and saving.'),
          'import scrapy\n\nclass BooksSpider(scrapy.Spider):\n    name = "books"\n    start_urls = ["https://books.toscrape.com/"]\n    custom_settings = {"DOWNLOAD_DELAY": 1, "CONCURRENT_REQUESTS_PER_DOMAIN": 2, "ROBOTSTXT_OBEY": True}\n\n    def parse(self, response):\n        for book in response.css("article.product_pod"):\n            yield {"title": book.css("h3 a::attr(title)").get(), "price": book.css(".price_color::text").get()}\n        yield from response.follow_all(css="li.next a", callback=self.parse)', T)
      ],
      practice: [
        B('شغّل مثال الطابور وغيّر العمق.', 'Run the frontier example and change the depth.'),
        B('اكتب normalize لـ 6 أشكال روابط.', 'Write normalize for 6 link variants.'),
        B('اقرا sitemap.xml لموقع واطلع عدد الصفحات.', 'Read a site’s sitemap.xml and count its pages.'),
        B('شغّل spider Scrapy البسيط على books.toscrape.com.', 'Run the simple Scrapy spider on books.toscrape.com.')
      ],
      words: [
        W('url frontier', 'طابور الروابط اللي لسه هتتزار', 'the queue of links still to visit', 'The URL frontier holds 3,000 links.'),
        W('visited set', 'مجموعة الروابط اللي اتزارت', 'the set of links already visited', 'Check the visited set before fetching.'),
        W('url normalization', 'توحيد أشكال الروابط', 'turning link variants into one form', 'URL normalization removed utm_ parameters.'),
        W('crawl depth', 'عدد الخطوات من صفحة البداية', 'the number of steps from the start page', 'Limit the crawl depth to 3.'),
        W('scrapy', 'فرامورك scraping متكامل في بايثون', 'a full scraping framework in Python', 'Scrapy obeys robots.txt when configured.')
      ],
      read: [{ t: 'Scrapy tutorial', url: 'https://docs.scrapy.org/en/latest/intro/tutorial.html', what: B('اقرا أول spider والـ settings.', 'Read the first spider and the settings.') }, 'lib:Books to Scrape'],
      challenge: B('ابني زاحف صغير: frontier بعمق 3، normalize، visited set، دومين واحد، robots.txt، token bucket — أو نفس الحاجة بـ Scrapy — على books.toscrape.com، وصدّر الكتب لـ CSV.', 'Build a small crawler: a frontier with depth 3, normalise, a visited set, one domain, robots.txt and a token bucket — or the same with Scrapy — on books.toscrape.com, exporting the books to CSV.'),
      quiz: [
        Q(B('من غير normalize:', 'Without normalisation:'), [['نفس الصفحة بتتزار كذا مرة', 'the same page is visited several times'], ['أسرع', 'faster'], ['مفيش فرق', 'no difference']], 0, B('أشكال كتير.', 'Many forms.')),
        Q(B('crawl depth بيمنع:', 'Crawl depth prevents:'), [['الزاحف يتوه', 'the crawler wandering off'], ['الأخطاء', 'errors'], ['الكاش', 'caching']], 0, B('حدود.', 'Limits.')),
        Q(B('قبل الزحف شوف:', 'Before crawling, check:'), [['sitemap.xml', 'sitemap.xml'], ['favicon', 'the favicon'], ['الإعلانات', 'the ads']], 0, B('قايمة رسمية.', 'An official list.'))
      ] },

    { title: B('قراءة ثابتة ومراقبة التغيير', 'Robust parsing and change detection'),
      goal: B('الـ parser ميطلّعش بيانات غلط بهدوء لما الموقع يتغيّر.', 'Stop the parser from quietly producing wrong data when the site changes.'),
      learn: [
        L(B('تحقق من العناصر', 'Validate the items'),
          B('كل item اتجمع يعدّي على تحقق (dataclass أو Pydantic): السعر رقم موجب؟ العنوان مش فاضي؟ الرابط شكله صح؟ الـ item الفاشل يروح quarantine بالـ HTML بتاعه عشان تفهم ليه.', 'Every collected item passes validation (a dataclass or Pydantic): is the price a positive number? the title not empty? the link well formed? A failing item goes to quarantine with its HTML so you can see why.'),
          'from html.parser import HTMLParser\n\nclass PriceParser(HTMLParser):\n    def __init__(self):\n        super().__init__(); self.in_price = False; self.prices = []\n    def handle_starttag(self, tag, attrs):\n        self.in_price = ("class", "price_color") in attrs\n    def handle_data(self, data):\n        if self.in_price and data.strip():\n            self.prices.append(data.strip()); self.in_price = False\n\nhtml = \'<p class="price_color">£51.77</p><p class="price_color">£ —</p><p class="price_color">£13.99</p>\'\np = PriceParser(); p.feed(html)\nfor raw in p.prices:\n    try:\n        print("ok", float(raw.lstrip("£ ")))\n    except ValueError:\n        print("quarantine", repr(raw))', R),
        L(B('نسبة النجاح', 'The parse rate'),
          B('**parse rate** = نسبة الصفحات اللي اتقرت كلها صح. لو كانت 99% وبقت 40% فجأة، الموقع غيّر شكله — نبّه ووقّف بدل ما تملأ قاعدة البيانات بفراغات. ده أهم مقياس في أي scraper.', 'The **parse rate** = the share of pages parsed fully and correctly. If it was 99% and suddenly drops to 40%, the site changed its layout — alert and stop instead of filling the database with blanks. This is the most important metric of any scraper.'),
          'pages 500 · parsed ok 205 → parse rate 41% (normal 99%) → ALERT "layout changed?" → pause', T),
        L(B('اكتشاف التغيير', 'Detecting change'),
          B('**change detection**: احسب **content hash** للجزء المهم من الصفحة (السعر، الوصف)، وقارنه بالمرة اللي فاتت. لو اتغير، سجّل التغيير (السعر من كام لكام). ده أساس أدوات «تابع الأسعار».', '**Change detection**: compute a **content hash** of the important part of the page (price, description), and compare it with last time. If it changed, record the change (the price from what to what). This is the basis of «price watch» tools.'),
          'import hashlib, json\n\ndef fingerprint(item):\n    return hashlib.sha256(json.dumps(item, sort_keys=True).encode()).hexdigest()[:12]\n\nold = {"title": "Tea 250g", "price": 51.77}\nnew = {"title": "Tea 250g", "price": 49.99}\nif fingerprint(old) != fingerprint(new):\n    print(f"changed: price {old[\'price\']} → {new[\'price\']}")', R)
      ],
      practice: [
        B('اعمل validation لكل item واعزل الفاشل.', 'Validate every item and quarantine failures.'),
        B('احسب parse rate لكل تشغيل واحفظه.', 'Compute the parse rate per run and save it.'),
        B('اعمل تنبيه لو parse rate نزل تحت 90%.', 'Alert when the parse rate drops below 90%.'),
        B('ابني change detection للأسعار بـ hash.', 'Build price change detection with a hash.')
      ],
      words: [
        W('parse rate', 'نسبة الصفحات اللي اتقرت صح', 'the share of pages parsed correctly', 'The parse rate fell to 41%.'),
        W('layout change', 'تغيير شكل صفحة الموقع', 'a change in a site’s page structure', 'A layout change broke the price selector.'),
        W('change detection', 'اكتشاف إن محتوى اتغيّر', 'noticing that content has changed', 'Change detection found 12 new prices.'),
        W('content hash', 'بصمة لمحتوى معيّن', 'a fingerprint of some content', 'Compare the content hash with yesterday’s.'),
        W('html.parser', 'parser HTML في المكتبة القياسية', 'the HTML parser in the standard library', 'html.parser needs no installation.')
      ],
      read: ['lib:Beautiful Soup documentation', { lib: 'Quotes to Scrape', what: B('جرّب الـ parser على صفحاته.', 'Try your parser on its pages.') }],
      challenge: B('ضيف للزاحف: validation وquarantine، parse rate لكل تشغيل بتنبيه تحت 90%، وchange detection للأسعار — وجرّب تغيّر HTML صفحة محفوظة عمدًا وشوف التنبيه.', 'Add to the crawler: validation and quarantine, a parse rate per run with an alert below 90%, and price change detection — then deliberately change a saved page’s HTML and see the alert.'),
      quiz: [
        Q(B('parse rate نزل فجأة:', 'The parse rate suddenly dropped:'), [['الموقع غالبًا اتغيّر؛ نبّه ووقّف', 'the site probably changed; alert and pause'], ['طبيعي', 'normal'], ['زوّد السرعة', 'speed up']], 0, B('أهم مقياس.', 'The key metric.')),
        Q(B('item فشل التحقق:', 'An item failed validation:'), [['quarantine مع HTML', 'quarantine with its HTML'], ['احفظه عادي', 'save it anyway'], ['تجاهل', 'ignore it']], 0, B('للفهم.', 'To understand why.')),
        Q(B('content hash بيستخدم لـ:', 'A content hash is used for:'), [['اكتشاف التغيير', 'detecting change'], ['التشفير', 'encryption'], ['الدخول', 'logging in']], 0, B('بصمة.', 'A fingerprint.'))
      ] },

    { title: B('التخزين وإعادة الزحف', 'Storage and recrawling'),
      goal: B('تخزّن صح وتعيد الزحف للي اتغيّر بس.', 'Store properly and recrawl only what changed.'),
      learn: [
        L(B('خزّن الخام', 'Store the raw HTML'),
          B('زي ETL: احفظ الـ HTML الخام (مضغوط) بالتاريخ والرابط، والبيانات المستخرجة في جدول. لو حسّنت الـ parser، تعيد الاستخراج من الخام من غير زحف تاني. وده بيقلل الضغط على الموقع.', 'Like ETL: save the raw HTML (compressed) with the date and URL, and the extracted data in a table. If you improve the parser, re-extract from the raw copies without crawling again. This also reduces load on the site.'),
          'import gzip, hashlib\nfrom pathlib import Path\n\ndef save_raw(url, html, day="2026-10-03"):\n    name = hashlib.sha1(url.encode()).hexdigest()[:16] + ".html.gz"\n    path = Path("raw") / day / name\n    path.parent.mkdir(parents=True, exist_ok=True)\n    path.write_bytes(gzip.compress(html.encode()))\n    return path\n\np = save_raw("https://books.toscrape.com/", "<html>…</html>" * 100)\nprint(p.as_posix(), p.stat().st_size, "bytes")', R),
        L(B('جدولة إعادة الزحف', 'Scheduling recrawls'),
          B('**recrawl** ذكي: الصفحات اللي بتتغير كتير (الأسعار) كل يوم، والثابتة (صفحة «من نحن») كل شهر. احسب لكل رابط «آخر تغيير» وعدّل المعدل تلقائيًا: لو مااتغيرتش 5 مرات، قلّل الزيارات.', 'A smart **recrawl**: pages that change often (prices) daily, stable ones (an «about» page) monthly. Track each URL’s «last change» and adjust its rate automatically: if it did not change 5 times in a row, visit less often.'),
          'next_visit = last_visit + interval\nchanged → interval = max(1 day, interval / 2)\nunchanged → interval = min(30 days, interval * 1.5)', T),
        L(B('التصدير والتسليم', 'Exporting and delivering'),
          B('العميل عايز النتيجة مش الـ scraper: صدّر CSV/XLSX أو جدول Postgres أو Google Sheet، بأعمدة واضحة وتاريخ الجمع والمصدر. وتقرير التغييرات («12 سعر نزل، 3 منتجات اختفت») غالبًا هو أهم حاجة بالنسبة له.', 'The client wants results, not the scraper: export CSV/XLSX, a Postgres table or a Google Sheet, with clear columns, the collection date and the source. A change report («12 prices dropped, 3 products disappeared») is often what matters most to them.'),
          'price_changes_2026-10-03.csv: product, old_price, new_price, change_pct, url, collected_at', T)
      ],
      practice: [
        B('احفظ HTML خام مضغوط لـ 50 صفحة.', 'Save compressed raw HTML for 50 pages.'),
        B('أعد الاستخراج من الخام بعد تعديل الـ parser.', 'Re-extract from the raw copies after changing the parser.'),
        B('اعمل جدولة إعادة زحف متكيفة.', 'Implement adaptive recrawl scheduling.'),
        B('صدّر تقرير تغييرات CSV.', 'Export a change report as CSV.')
      ],
      words: [
        W('raw html', 'نص الصفحة زي ما وصل', 'the page source exactly as received', 'Keep the raw HTML for re-parsing.'),
        W('recrawl', 'زيارة صفحة تاني بعد فترة', 'visiting a page again later', 'Recrawl price pages daily.'),
        W('adaptive interval', 'فترة بتتغير حسب تغيّر الصفحة', 'an interval that adapts to how often a page changes', 'The adaptive interval grew to 20 days.'),
        W('change report', 'تقرير بالحاجات اللي اتغيرت', 'a report of what changed', 'The client reads the change report every morning.'),
        W('gzip', 'ضغط ملفات شائع', 'a common file compression format', 'gzip shrinks HTML by 80%.')
      ],
      read: [{ lib: 'The Python Standard Library', what: B('اقرا gzip وhashlib.', 'Read gzip and hashlib.') }, 'lib:Books to Scrape'],
      challenge: B('اكمل «متابع الأسعار»: خام مضغوط، استخراج قابل للإعادة، change detection، إعادة زحف متكيفة، وتقرير تغييرات يومي يتبعت على تليجرام أو إيميل.', 'Finish the «price watcher»: compressed raw storage, repeatable extraction, change detection, adaptive recrawling, and a daily change report sent by Telegram or email.'),
      quiz: [
        Q(B('ليه نخزّن الـ HTML الخام؟', 'Why store the raw HTML?'), [['نعيد الاستخراج من غير زحف', 'to re-extract without crawling again'], ['للزينة', 'for decoration'], ['مطلوب قانونًا', 'it is legally required']], 0, B('أقل ضغط.', 'Less load.')),
        Q(B('صفحة مبتتغيرش أبدًا:', 'A page that never changes:'), [['قلّل زيارتها', 'visit it less often'], ['زورها كل دقيقة', 'visit every minute'], ['امسحها', 'delete it']], 0, B('adaptive.', 'Adaptive.')),
        Q(B('اللي العميل غالبًا عايزه:', 'What the client usually wants:'), [['تقرير التغييرات', 'the change report'], ['كود الزاحف', 'the crawler code'], ['الـ logs', 'the logs']], 0, B('نتيجة.', 'Results.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('جمع بيانات كبير ومسؤول وموثوق.', 'Large, responsible, reliable data collection.'),
      review: [
        B('القانون والأخلاق: API، الشروط، البيانات الشخصية، الحقوق، robots.txt، والهوية.', 'Law and ethics: APIs, terms, personal data, copyright, robots.txt and identity.'),
        B('الزحف المؤدب: token bucket، الطلبات الشرطية، وعلامات التوقف.', 'Polite crawling: the token bucket, conditional requests and signs to stop.'),
        B('المعمارية: frontier، normalize، العمق، sitemaps، وScrapy.', 'Architecture: the frontier, normalisation, depth, sitemaps and Scrapy.'),
        B('القراءة الثابتة: validation، parse rate، وchange detection.', 'Robust parsing: validation, the parse rate and change detection.'),
        B('التخزين الخام وإعادة الزحف المتكيفة والتقارير.', 'Raw storage, adaptive recrawling and reports.')
      ],
      project: B('ابني «متابع أسعار» مسؤول لموقع تدريب (books.toscrape.com): فاحص أهلية، زاحف مؤدب (robots، token bucket، ETag)، frontier وnormalize، validation وparse rate بتنبيه، خام مضغوط، change detection، إعادة زحف متكيفة، وتقرير تغييرات يومي — مع README فيه سياسة الـ scraping.', 'Build a responsible «price watcher» for a practice site (books.toscrape.com): an eligibility checker, a polite crawler (robots, token bucket, ETag), a frontier and normalisation, validation and a parse rate with alerts, compressed raw storage, change detection, adaptive recrawling and a daily change report — with a README stating your scraping policy.'),
      test: [
        Q(B('أول سؤال قبل الـ scraping:', 'The first question before scraping:'), [['فيه API رسمي؟', 'is there an official API?'], ['أسرع لغة؟', 'which language is fastest?'], ['كام proxy؟', 'how many proxies?']], 0, B('أنضف.', 'Cleaner.')),
        Q(B('robots.txt:', 'robots.txt:'), [['قواعد الموقع للبوتات؛ احترمها', 'the site’s rules for bots; respect them'], ['ملف سري', 'a secret file'], ['قانون دولي', 'international law']], 0, B('أدب.', 'Courtesy.')),
        Q(B('User-Agent كويس:', 'A good User-Agent:'), [['اسم البوت ووسيلة تواصل', 'the bot’s name and a contact'], ['متصفح متنكر', 'a disguised browser'], ['فاضي', 'empty']], 0, B('شفافية.', 'Transparency.')),
        Q(B('token bucket:', 'A token bucket:'), [['يحدد معدل الطلبات', 'limits the request rate'], ['يخزّن الصفحات', 'stores pages'], ['يكسر CAPTCHA', 'breaks CAPTCHAs']], 0, B('معدل.', 'A rate.')),
        Q(B('If-None-Match مع ETag:', 'If-None-Match with an ETag:'), [['يرجّع 304 لو مفيش تغيير', 'returns 304 if nothing changed'], ['يحذف الصفحة', 'deletes the page'], ['يسجّل دخول', 'logs in']], 0, B('توفير.', 'A saving.')),
        Q(B('429 متكرر:', 'Repeated 429s:'), [['وقّف وخفّف', 'pause and slow down'], ['زوّد التوازي', 'increase concurrency'], ['غيّر الـ IP', 'change IP']], 0, B('احترام.', 'Respect.')),
        Q(B('visited set بيمنع:', 'The visited set prevents:'), [['زيارة نفس الصفحة تاني', 'visiting the same page again'], ['الأخطاء', 'errors'], ['البطء', 'slowness']], 0, B('مع normalize.', 'With normalisation.')),
        Q(B('utm_source في الرابط:', 'utm_source in a link:'), [['يتشال في normalize', 'is removed during normalisation'], ['مهم للصفحة', 'is essential to the page'], ['يتضاعف', 'is doubled']], 0, B('تتبع.', 'Tracking.')),
        Q(B('Scrapy بيوفّر:', 'Scrapy provides:'), [['طابور وحدود وإعادة وpipelines جاهزة', 'a queue, limits, retries and pipelines built in'], ['متصفح ظاهر', 'a visible browser'], ['قاعدة بيانات', 'a database']], 0, B('فرامورك.', 'A framework.')),
        Q(B('parse rate 40% بعد 99%:', 'A parse rate of 40% after 99%:'), [['الموقع اتغيّر غالبًا', 'the site probably changed'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('نبّه.', 'Alert.')),
        Q(B('change detection بيستخدم:', 'Change detection uses:'), [['content hash', 'a content hash'], ['كلمة سر', 'a password'], ['screenshot بس', 'only screenshots']], 0, B('بصمة.', 'A fingerprint.')),
        Q(B('إعادة الزحف الذكية:', 'Smart recrawling:'), [['حسب سرعة تغيّر الصفحة', 'based on how often a page changes'], ['كل صفحة كل دقيقة', 'every page every minute'], ['مرة في السنة', 'once a year']], 0, B('adaptive.', 'Adaptive.'))
      ] }
  ]
};
