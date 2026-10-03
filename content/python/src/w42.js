// Python week 42 — Design patterns and clean architecture.
// Every example runs with the standard library (sqlite3 in memory for the repository).
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('أنماط التصميم والمعمارية النظيفة', 'Design patterns and clean architecture'),
  goal: B('تكتب مشاريع Python كبيرة تفضل سهلة التعديل بعد سنين: تكتشف روائح الكود وتعيد هيكلته بأمان، تطبّق SOLID بالطريقة البايثونية، تستخدم الأنماط اللي بتحل مشاكل حقيقية بس، تعزل قاعدة البيانات بـ repository، وتبني معمارية المنطق فيها في النص والأدوات على الأطراف.',
          'Write large Python projects that stay easy to change for years: spot code smells and refactor safely, apply SOLID the Pythonic way, use only the patterns that solve real problems, isolate the database behind a repository, and build an architecture with logic in the centre and tools at the edges.'),
  days: [
    { title: B('روائح الكود وإعادة الهيكلة', 'Code smells and refactoring'),
      goal: B('تحسّن الكود من غير ما تكسره.', 'Improve code without breaking it.'),
      learn: [
        L(B('روائح الكود', 'Code smells'),
          B('**code smell** = علامة إن الكود هيبقى صعب يتعدّل: دالة 200 سطر، **god object** (كلاس بيعمل كل حاجة)، تكرار، معاملات كتير، if/elif طويلة على النوع، وأسماء غامضة. و**coupling** عالي (كل حاجة معتمدة على كل حاجة) مع **cohesion** واطي (الحاجات المرتبطة متفرقة) = كل تعديل بيكسر حاجة تانية.', 'A **code smell** = a sign code will be hard to change: a 200-line function, a **god object** (a class doing everything), duplication, many parameters, long if/elif chains on a type, and vague names. High **coupling** (everything depends on everything) with low **cohesion** (related things scattered) = every change breaks something else.'),
          'def process(order, db, smtp, mode, send=True, pdf=True, retries=3, lang="ar"):   # many params\n    if mode == "shopify": ...        # type switch #1\n    elif mode == "woo": ...\n    total = 0\n    for i in order["items"]: total += i["p"] * i["q"]   # duplicated in 4 files\n    if order["country"] == "EG": tax = total * 0.14\n    elif order["country"] == "SA": tax = total * 0.15     # type switch #2\n    db.execute(f"INSERT … {total}")                         # SQL, maths, email and PDF in one place\n    if pdf: ...\n    if send: smtp.send(...)', T),
        L(B('إعادة هيكلة بأمان', 'Refactoring safely'),
          B('**refactoring** = تغيير شكل الكود من غير ما سلوكه يتغير. الأمان: اختبار بيثبّت السلوك الحالي الأول (حتى لو مش مثالي)، وبعدين خطوات صغيرة — استخرج دالة، سمّي اسم، شيل تكرار — والاختبار يشتغل بعد كل خطوة. متخلطش refactoring مع ميزة جديدة في نفس الـ commit.', '**refactoring** = changing code’s shape without changing its behaviour. Safety: first a test that pins current behaviour (even if imperfect), then small steps — extract a function, rename, remove duplication — running the test after each step. Never mix refactoring with a new feature in the same commit.'),
          'def invoice_text_old(order):\n    s = "INVOICE\\n"\n    t = 0\n    for i in order["items"]:\n        s += f"{i[\'name\']} x{i[\'qty\']} = {i[\'price\'] * i[\'qty\']:.2f}\\n"\n        t += i["price"] * i["qty"]\n    if order["country"] == "EG":\n        t = t * 1.14\n    s += f"TOTAL {t:.2f}"\n    return s\n\nVAT = {"EG": 0.14}\n\ndef line_total(item):\n    return item["price"] * item["qty"]\n\ndef subtotal(items):\n    return sum(line_total(i) for i in items)\n\ndef with_vat(amount, country):\n    return amount * (1 + VAT.get(country, 0))\n\ndef invoice_text(order):\n    lines = [f"{i[\'name\']} x{i[\'qty\']} = {line_total(i):.2f}" for i in order["items"]]\n    total = with_vat(subtotal(order["items"]), order["country"])\n    return "\\n".join(["INVOICE", *lines, f"TOTAL {total:.2f}"])\n\nsamples = [{"country": "EG", "items": [{"name": "mug", "qty": 2, "price": 120.0}]},\n           {"country": "AE", "items": [{"name": "bag", "qty": 1, "price": 300.0}, {"name": "pen", "qty": 3, "price": 5.5}]}]\nfor o in samples:\n    assert invoice_text(o) == invoice_text_old(o)       # behaviour pinned by the old version\nprint(invoice_text(samples[1]))', R),
        L(B('characterization tests', 'Characterization tests'),
          B('كود قديم من غير اختبارات؟ اكتب **characterization test**: شغّل الكود الحالي على مدخلات كتير واحفظ مخرجاته كـ «الصح» — حتى لو فيها أخطاء معروفة. بعدها أي refactoring لازم يطلّع نفس الحاجة بالظبط. تصليح الأخطاء ييجي بعدين في commit لوحده.', 'Old code with no tests? Write a **characterization test**: run the current code on many inputs and save its outputs as «correct» — even with known bugs. Afterwards any refactoring must produce exactly the same. Fixing bugs comes later in its own commit.'),
          'import json, random\n\ndef legacy_shipping_fee(city, weight_kg):           # nobody remembers why it works this way\n    fee = 50 if city in ("Cairo", "Giza") else 75\n    if weight_kg > 5:\n        fee += int(weight_kg - 5) * 10\n    return fee\n\nrandom.seed(3)\ncases = [(random.choice(["Cairo", "Giza", "Alex", "Aswan"]), round(random.uniform(0.2, 12), 1)) for _ in range(8)]\nsnapshot = {f"{c}|{w}": legacy_shipping_fee(c, w) for c, w in cases}\nprint(json.dumps(snapshot, indent=1))\n# save to tests/snapshots/shipping.json; the new code must match every entry', R)
      ],
      practice: [
        B('اكتب 5 روائح كود لقيتها في مشروعك.', 'List 5 code smells you found in your project.'),
        B('اكتب characterization test لدالة قديمة.', 'Write a characterization test for an old function.'),
        B('اعمل 3 refactorings صغيرة والاختبار شغال.', 'Do 3 small refactorings with the test passing.'),
        B('افصل refactoring وميزة في commits مختلفة.', 'Separate a refactoring and a feature into different commits.')
      ],
      words: [
        W('code smell', 'علامة إن الكود هيبقى صعب يتعدّل', 'a sign that code will be hard to change', 'A 200-line function is a code smell.'),
        W('god object', 'كلاس بيعمل كل حاجة', 'a class that does far too much', 'OrderManager became a god object.'),
        W('coupling', 'درجة اعتماد الأجزاء على بعض', 'how much parts depend on each other', 'Low coupling makes changes local.'),
        W('cohesion', 'ترابط الحاجات المتعلقة ببعض في مكان واحد', 'how closely related things are kept together', 'High cohesion keeps tax logic in one module.'),
        W('refactoring', 'إعادة هيكلة من غير تغيير السلوك', 'restructuring code without changing behaviour', 'Refactoring needs tests first.'),
        W('characterization test', 'اختبار بيثبّت سلوك الكود الحالي', 'a test pinning existing behaviour', 'A characterization test protected the legacy fee code.')
      ],
      read: [{ t: 'Refactoring.Guru: Code smells', url: 'https://refactoring.guru/refactoring/smells', what: B('اقرا Bloaters وChange Preventers.', 'Read Bloaters and Change Preventers.') }],
      challenge: B('خد أكبر دالة أو كلاس في مشروع عندك: اكتب characterization tests، اعمل refactoring على 5 خطوات (كل خطوة commit والاختبار أخضر)، وقارن طول الدوال وعدد المعاملات قبل وبعد.', 'Take the biggest function or class in one of your projects: write characterization tests, refactor in 5 steps (each a commit with green tests), and compare function length and parameter counts before and after.'),
      quiz: [
        Q(B('refactoring:', 'Refactoring:'), [['تغيير الشكل من غير السلوك', 'changing shape, not behaviour'], ['ميزة جديدة', 'a new feature'], ['إعادة كتابة كاملة', 'a full rewrite']], 0, B('نفس السلوك.', 'Same behaviour.')),
        Q(B('كود قديم من غير اختبارات:', 'Old code without tests:'), [['characterization test الأول', 'a characterization test first'], ['غيّر على طول', 'change it straight away'], ['احذفه', 'delete it']], 0, B('أمان.', 'Safety.')),
        Q(B('coupling عالي:', 'High coupling:'), [['كل تعديل بيكسر حاجة تانية', 'each change breaks something else'], ['كود أسرع', 'faster code'], ['أمان أعلى', 'more security']], 0, B('اعتماد.', 'Dependence.'))
      ] },

    { title: B('SOLID بطريقة Python', 'SOLID the Python way'),
      goal: B('مبادئ بتخلّي التعديل سهل.', 'Principles that make change easy.'),
      learn: [
        L(B('مفتوح للإضافة', 'Open for extension'),
          B('**solid** = 5 مبادئ. أهمها في الأتمتة: **open/closed** = تضيف سلوك جديد (بوابة دفع، دولة ضريبة) بإضافة كود، مش بتعديل if/elif موجودة. في Python: قاموس أو تسجيل دوال بدل سلسلة if.', '**solid** = 5 principles. The most useful in automation: **open/closed** = add new behaviour (a payment gateway, a tax country) by adding code, not by editing an existing if/elif. In Python: a dict or a function registry instead of an if chain.'),
          'from decimal import Decimal\n\nTAX_RULES = {}\n\ndef tax_rule(country):\n    def register(fn):\n        TAX_RULES[country] = fn\n        return fn\n    return register\n\n@tax_rule("EG")\ndef egypt(amount: Decimal) -> Decimal:\n    return amount * Decimal("0.14")\n\n@tax_rule("SA")\ndef saudi(amount: Decimal) -> Decimal:\n    return amount * Decimal("0.15")\n\n# a new country = a new function; nothing else changes\n@tax_rule("AE")\ndef uae(amount: Decimal) -> Decimal:\n    return amount * Decimal("0.05")\n\nfor c in ("EG", "SA", "AE"):\n    print(c, TAX_RULES[c](Decimal("1000.00")).quantize(Decimal("0.01")))', R),
        L(B('اعتمد على تجريد', 'Depend on abstractions'),
          B('**dependency inversion** = المنطق المهم ميعتمدش على أداة محددة (Gmail، Postgres) بل على واجهة؛ والأداة بتتحقن من برّه (dependency injection من أسبوع 21). في Python الواجهة = `typing.Protocol` (duck typing بأنواع) أو **abc** لو عايز تجبر التنفيذ. و**interface segregation** = واجهات صغيرة (Sender مش «EverythingService»).', '**dependency inversion** = important logic depends not on a specific tool (Gmail, Postgres) but on an interface; the tool is injected from outside (dependency injection from week 21). In Python the interface = `typing.Protocol` (typed duck typing) or an **abc** to force implementation. And **interface segregation** = small interfaces (a Sender, not an «EverythingService»).'),
          'from typing import Protocol\n\nclass Sender(Protocol):\n    def send(self, to: str, text: str) -> None: ...\n\nclass ConsoleSender:\n    def send(self, to, text):\n        print(f"[console] {to}: {text}")\n\nclass RecordingSender:                       # for tests\n    def __init__(self):\n        self.sent = []\n    def send(self, to, text):\n        self.sent.append((to, text))\n\ndef notify_late_orders(orders, sender: Sender, today: str):\n    for o in orders:\n        if o["due"] < today and o["status"] != "delivered":\n            sender.send(o["phone"], f"Sorry, order {o[\'id\']} is late. We are on it.")\n\norders = [{"id": 1, "due": "2026-10-01", "status": "shipped", "phone": "0100"},\n          {"id": 2, "due": "2026-10-09", "status": "shipped", "phone": "0111"}]\nnotify_late_orders(orders, ConsoleSender(), "2026-10-04")\nrec = RecordingSender(); notify_late_orders(orders, rec, "2026-10-04"); print("recorded:", rec.sent)', R),
        L(B('ليسكوف والتركيب', 'Liskov and composition'),
          B('**liskov** = أي نوع فرعي لازم يشتغل مكان الأصلي من غير مفاجآت (متخليش `ReadOnlyRepo.save` ترمي خطأ). وغالبًا الحل الأبسط: **composition over inheritance** — كائن «عنده» أداة بدل ما «يورث» من كلاس كبير. الوراثة العميقة في Python نادرًا ما تكون فكرة كويسة.', '**liskov** = any subtype must work in place of the original without surprises (do not make `ReadOnlyRepo.save` raise). The simpler fix is usually **composition over inheritance** — an object «has» a tool instead of «inheriting» from a big class. Deep inheritance in Python is rarely a good idea.'),
          'class RetryingSender:                         # composition: wraps any Sender\n    def __init__(self, inner, attempts=3):\n        self.inner, self.attempts = inner, attempts\n    def send(self, to, text):\n        for n in range(1, self.attempts + 1):\n            try:\n                return self.inner.send(to, text)\n            except ConnectionError as e:\n                print(f"attempt {n} failed: {e}")\n        raise ConnectionError("gave up")\n\nclass FlakySender:\n    def __init__(self):\n        self.calls = 0\n    def send(self, to, text):\n        self.calls += 1\n        if self.calls < 3:\n            raise ConnectionError("timeout")\n        print(f"sent to {to}: {text}")\n\nRetryingSender(FlakySender()).send("0100", "Your order shipped")', R)
      ],
      practice: [
        B('حوّل if/elif على النوع لـ registry.', 'Turn an if/elif on type into a registry.'),
        B('اعمل Protocol لأداة خارجية بتستخدمها.', 'Create a Protocol for an external tool you use.'),
        B('اكتب fake للاختبار بنفس الـ Protocol.', 'Write a test fake with the same Protocol.'),
        B('استبدل وراثة بـ composition في مكان واحد.', 'Replace inheritance with composition in one place.')
      ],
      words: [
        W('solid', 'خمس مبادئ لتصميم كود سهل التعديل', 'five principles for maintainable design', 'SOLID is a guide, not a law.'),
        W('open/closed', 'مفتوح للإضافة مقفول للتعديل', 'open to extension, closed to modification', 'The tax registry follows open/closed.'),
        W('dependency inversion', 'المنطق يعتمد على واجهات مش أدوات', 'depending on abstractions, not concrete tools', 'Dependency inversion lets us swap Gmail for SES.'),
        W('interface segregation', 'واجهات صغيرة متخصصة', 'small, focused interfaces', 'Interface segregation gave us Sender and Reader.'),
        W('liskov', 'النوع الفرعي يشتغل مكان الأصلي', 'subtypes must be substitutable', 'Raising in save() breaks Liskov.'),
        W('abc', 'كلاس مجرد بيجبر التنفيذ', 'an abstract base class', 'Use an abc when methods must be implemented.'),
        W('composition over inheritance', 'التركيب بدل الوراثة', 'having parts rather than inheriting', 'Composition over inheritance kept classes small.')
      ],
      read: [{ lib: 'typing — Support for type hints', what: B('اقرا Protocol.', 'Read Protocol.') }],
      challenge: B('خد workflow أتمتة بايثون عندك واعمله «قابل للتوصيل»: Protocols للإرسال والتخزين والدفع، تنفيذين لكل واحد (حقيقي وfake)، registry للقواعد اللي بتختلف حسب الدولة/البوابة — و10 اختبارات بالـ fakes.', 'Take one of your Python automation workflows and make it «pluggable»: Protocols for sending, storage and payment, two implementations of each (real and fake), a registry for rules that vary by country/gateway — and 10 tests using the fakes.'),
      quiz: [
        Q(B('دولة ضريبة جديدة = :', 'A new tax country =:'), [['دالة جديدة في registry', 'a new function in a registry'], ['تعديل if طويلة', 'editing a long if'], ['نسخ الملف', 'copying the file']], 0, B('open/closed.', 'Open/closed.')),
        Q(B('Protocol في Python:', 'A Protocol in Python:'), [['واجهة بـ duck typing وأنواع', 'an interface with typed duck typing'], ['بروتوكول شبكة', 'a network protocol'], ['قاعدة بيانات', 'a database']], 0, B('واجهة.', 'An interface.')),
        Q(B('RetryingSender بيلف أي Sender:', 'RetryingSender wraps any Sender:'), [['composition', 'composition'], ['وراثة عميقة', 'deep inheritance'], ['global', 'a global']], 0, B('تركيب.', 'Composition.'))
      ] },

    { title: B('أنماط مفيدة فعلًا', 'Patterns that actually help'),
      goal: B('أنماط بتحل مشاكل الأتمتة.', 'Patterns that solve automation problems.'),
      learn: [
        L(B('Strategy وFactory', 'Strategy and Factory'),
          B('**design pattern** = حل متكرر لمشكلة متكررة — مش هدف في نفسه. **strategy pattern** = خوارزميات قابلة للتبديل (حساب الشحن حسب الشركة) — في Python غالبًا مجرد دوال في قاموس. **factory** = دالة بتختار وتبني الكائن الصح من الإعدادات.', 'A **design pattern** = a recurring solution to a recurring problem — not a goal in itself. The **strategy pattern** = interchangeable algorithms (shipping cost per carrier) — in Python usually just functions in a dict. A **factory** = a function that picks and builds the right object from settings.'),
          'from dataclasses import dataclass\n\ndef aramex(weight):  return 60 + 12 * max(0, weight - 1)\ndef bosta(weight):   return 45 + 15 * max(0, weight - 1)\ndef pickup(weight):  return 0\n\nSHIPPING = {"aramex": aramex, "bosta": bosta, "pickup": pickup}      # strategies\n\n@dataclass\nclass Settings:\n    carrier: str\n    free_over: float\n\ndef make_fee_calculator(s: Settings):                                # factory\n    strategy = SHIPPING[s.carrier]\n    def fee(subtotal, weight):\n        return 0 if subtotal >= s.free_over else strategy(weight)\n    return fee\n\nfee = make_fee_calculator(Settings(carrier="bosta", free_over=1500))\nprint(fee(800, 2.5), fee(2000, 2.5))', R),
        L(B('Observer وأحداث الدومين', 'Observer and domain events'),
          B('**observer** / **event bus** = لما حاجة تحصل («طلب اتدفع») تعلن **domain event**، وأي عدد من المستمعين يتصرف (فاتورة، إيميل، تحديث مخزون) من غير ما الكود الأصلي يعرفهم. نفس فكرة n8n webhooks جوه برنامجك.', 'An **observer** / **event bus** = when something happens («order paid») you publish a **domain event**, and any number of listeners react (invoice, email, stock update) without the original code knowing them. The same idea as n8n webhooks, inside your program.'),
          'from collections import defaultdict\nfrom dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass OrderPaid:\n    order_id: int\n    total: float\n\nclass EventBus:\n    def __init__(self):\n        self.handlers = defaultdict(list)\n    def subscribe(self, event_type):\n        def deco(fn):\n            self.handlers[event_type].append(fn)\n            return fn\n        return deco\n    def publish(self, event):\n        for h in self.handlers[type(event)]:\n            try:\n                h(event)\n            except Exception as e:             # one failing listener must not stop the others\n                print(f"  handler {h.__name__} failed: {e}")\n\nbus = EventBus()\n\n@bus.subscribe(OrderPaid)\ndef create_invoice(e): print(f"  invoice for order {e.order_id}")\n\n@bus.subscribe(OrderPaid)\ndef update_stock(e): raise RuntimeError("stock API down")\n\n@bus.subscribe(OrderPaid)\ndef thank_customer(e): print(f"  thank-you message, total {e.total}")\n\nbus.publish(OrderPaid(1042, 650.0))', R),
        L(B('Command', 'Command'),
          B('**command pattern** = العملية نفسها بقت كائن (بياناتها + تنفيذها) — تقدر تحطها في طابور، تسجّلها، تعيدها، أو تعمل undo. مفيد لطوابير المهام (أسبوع 35) والـ approval queue (أسبوع 38): الأمر بيستنى موافقة وبعدين يتنفذ.', 'The **command pattern** = an operation becomes an object (its data + how to run it) — you can queue, log, retry or undo it. Useful for task queues (week 35) and the approval queue (week 38): the command waits for approval, then runs.'),
          'from dataclasses import dataclass, asdict\nimport json\n\n@dataclass\nclass RefundCommand:\n    order_id: int\n    amount: float\n    reason: str\n    def execute(self, ledger):\n        ledger.append(("refund", self.order_id, -self.amount))\n    def undo(self, ledger):\n        ledger.append(("refund-reversal", self.order_id, self.amount))\n\nledger, pending = [], [RefundCommand(1042, 650, "damaged"), RefundCommand(1043, 90, "late")]\nprint("queued:", [json.dumps(asdict(c)) for c in pending])      # can be stored and approved later\nfor cmd in pending:\n    cmd.execute(ledger)\npending[1].undo(ledger)                                           # reverted after review\nprint(ledger, "net:", sum(x[2] for x in ledger))', R)
      ],
      practice: [
        B('حوّل حساب شحن لـ strategies في قاموس.', 'Turn a shipping calculation into strategies in a dict.'),
        B('اعمل factory من ملف إعدادات.', 'Build a factory from a settings file.'),
        B('اعمل event bus بـ 3 مستمعين لحدث حقيقي.', 'Build an event bus with 3 listeners for a real event.'),
        B('حوّل عملية خطيرة لـ command بيستنى موافقة.', 'Turn a risky operation into a command awaiting approval.')
      ],
      words: [
        W('design pattern', 'نمط تصميم: حل متكرر لمشكلة متكررة', 'a reusable solution to a common problem', 'Use a design pattern only when it fits.'),
        W('strategy pattern', 'نمط خوارزميات قابلة للتبديل', 'interchangeable algorithms behind one interface', 'The strategy pattern picks the carrier formula.'),
        W('factory', 'دالة بتبني الكائن المناسب', 'a function creating the right object', 'The factory reads the carrier from settings.'),
        W('observer', 'نمط مستمعين بيتصرفوا على حدث', 'listeners reacting to an event', 'The observer pattern decouples invoicing.'),
        W('event bus', 'ناقل أحداث بين أجزاء البرنامج', 'a hub that delivers events to listeners', 'Publish OrderPaid on the event bus.'),
        W('domain event', 'حدث مهم في البيزنس', 'a meaningful business occurrence', 'OrderPaid is a domain event.'),
        W('command pattern', 'العملية ككائن يتنفذ أو يتأجل', 'an operation wrapped as an object', 'The command pattern lets refunds wait for approval.'),
        W('registry', 'سجل بيربط أسماء بدوال أو كلاسات', 'a mapping from names to implementations', 'Plugins add themselves to the registry.')
      ],
      read: [{ t: 'Refactoring.Guru: Design patterns', url: 'https://refactoring.guru/design-patterns', what: B('اقرا Strategy وObserver وCommand.', 'Read Strategy, Observer and Command.') }],
      challenge: B('في مشروع المتجر: strategies للشحن والضريبة بـ factory من الإعدادات، event bus لحدث OrderPaid بـ 3 مستمعين (واحد بيفشل من غير ما يوقف الباقي)، وrefunds كـ commands في طابور موافقة — مع اختبارات.', 'In the shop project: shipping and tax strategies with a factory from settings, an event bus for OrderPaid with 3 listeners (one failing without stopping the rest), and refunds as commands in an approval queue — with tests.'),
      quiz: [
        Q(B('strategy في Python غالبًا:', 'A strategy in Python is usually:'), [['دوال في قاموس', 'functions in a dict'], ['10 كلاسات', '10 classes'], ['ملف XML', 'an XML file']], 0, B('بساطة.', 'Simplicity.')),
        Q(B('مستمع واحد فشل:', 'One listener failed:'), [['الباقي يكمّل', 'the others continue'], ['كله يقف', 'everything stops'], ['الحدث يتمسح', 'the event is deleted']], 0, B('عزل.', 'Isolation.')),
        Q(B('عملية لازم تستنى موافقة:', 'An operation that must await approval:'), [['command', 'a command'], ['global', 'a global'], ['print', 'a print']], 0, B('كائن.', 'An object.'))
      ] },

    { title: B('Repository وUnit of Work', 'Repository and Unit of Work'),
      goal: B('المنطق ميعرفش SQL.', 'Logic that knows no SQL.'),
      learn: [
        L(B('الـ repository', 'The repository'),
          B('**repository pattern** = واجهة شبه collection للبيانات (`add`, `get`, `list_unpaid`) بتخبّي SQL أو API. المنطق بيكلّم الـ repository، والاختبارات بتستخدم نسخة في الذاكرة — سريعة ومن غير قاعدة بيانات.', 'The **repository pattern** = a collection-like interface for data (`add`, `get`, `list_unpaid`) hiding SQL or an API. Logic talks to the repository, and tests use an in-memory version — fast and without a database.'),
          'import sqlite3\nfrom dataclasses import dataclass\nfrom typing import Protocol\n\n@dataclass\nclass Order:\n    id: int\n    total: float\n    paid: bool = False\n\nclass OrderRepo(Protocol):\n    def add(self, o: Order) -> None: ...\n    def get(self, id: int) -> Order: ...\n    def unpaid(self) -> list[Order]: ...\n\nclass InMemoryRepo:\n    def __init__(self): self.rows = {}\n    def add(self, o): self.rows[o.id] = o\n    def get(self, id): return self.rows[id]\n    def unpaid(self): return [o for o in self.rows.values() if not o.paid]\n\nclass SqliteRepo:\n    def __init__(self, db):\n        self.db = db\n        db.execute("CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY, total REAL, paid INTEGER)")\n    def add(self, o): self.db.execute("INSERT OR REPLACE INTO orders VALUES (?, ?, ?)", (o.id, o.total, int(o.paid)))\n    def get(self, id):\n        r = self.db.execute("SELECT id, total, paid FROM orders WHERE id = ?", (id,)).fetchone()\n        return Order(r[0], r[1], bool(r[2]))\n    def unpaid(self): return [Order(i, t, False) for i, t in self.db.execute("SELECT id, total FROM orders WHERE paid = 0")]\n\ndef overdue_total(repo: OrderRepo) -> float:      # business logic: no SQL here\n    return sum(o.total for o in repo.unpaid())\n\nfor repo in (InMemoryRepo(), SqliteRepo(sqlite3.connect(":memory:"))):\n    for o in (Order(1, 100), Order(2, 250, paid=True), Order(3, 75)):\n        repo.add(o)\n    print(type(repo).__name__, overdue_total(repo))', R),
        L(B('Unit of Work', 'Unit of Work'),
          B('**unit of work** = عملية بيزنس واحدة = transaction واحدة: كل التغييرات تتحفظ مع بعض أو مفيش ولا واحدة. في Python: context manager (أسبوع 26) بيعمل commit لو كله تمام وrollback لو حصل خطأ.', 'A **unit of work** = one business operation = one transaction: all changes are saved together or none are. In Python: a context manager (week 26) that commits if all went well and rolls back on an error.'),
          'import sqlite3\n\nclass UnitOfWork:\n    def __init__(self, db):\n        self.db = db\n    def __enter__(self):\n        return self\n    def __exit__(self, exc_type, exc, tb):\n        if exc_type:\n            self.db.rollback(); print("  rolled back:", exc)\n        else:\n            self.db.commit(); print("  committed")\n        return False\n\ndb = sqlite3.connect(":memory:")\ndb.execute("CREATE TABLE stock(sku TEXT PRIMARY KEY, qty INTEGER CHECK (qty >= 0))")\ndb.execute("CREATE TABLE orders(id INTEGER, sku TEXT)")\ndb.execute("INSERT INTO stock VALUES (\'MUG\', 1)"); db.commit()\n\ndef place_order(order_id, sku):\n    with UnitOfWork(db):\n        db.execute("INSERT INTO orders VALUES (?, ?)", (order_id, sku))\n        db.execute("UPDATE stock SET qty = qty - 1 WHERE sku = ?", (sku,))   # fails if it goes below 0\n\nfor oid in (1, 2):\n    try:\n        place_order(oid, "MUG")\n    except sqlite3.IntegrityError:\n        pass\nprint("orders:", db.execute("SELECT * FROM orders").fetchall(), "stock:", db.execute("SELECT qty FROM stock").fetchone()[0])', R),
        L(B('إمتى يستاهل', 'When it’s worth it'),
          B('Repository وUnit of Work بيضيفوا طبقة. يستاهلوا لما: المنطق معقد ومحتاج اختبارات كتير، أو ممكن تغيّر مصدر البيانات (Sheet ← Postgres)، أو كذا تطبيق بيستخدم نفس المنطق. سكربت 100 سطر بيقرا CSV؟ متعملهمش. **layered architecture** مش لازم في كل حاجة.', 'Repository and Unit of Work add a layer. They pay off when: logic is complex and needs many tests, the data source may change (Sheet → Postgres), or several apps use the same logic. A 100-line script reading a CSV? Skip them. A **layered architecture** is not needed everywhere.'),
          'project size → how much structure?\nscript (≤ 300 lines)        functions + tests; no layers\nservice (FastAPI, workers)  domain + repository + unit of work + adapters\nplatform (many apps)        the above + domain events + clear module boundaries', T)
      ],
      practice: [
        B('اعمل repository لجدول عندك بنسختين.', 'Build a repository for one of your tables in two versions.'),
        B('اكتب اختبارات المنطق بالنسخة اللي في الذاكرة.', 'Write the logic tests with the in-memory version.'),
        B('لف عملية بيزنس في UnitOfWork وجرّب خطأ في النص.', 'Wrap a business operation in a UnitOfWork and try a mid-way error.'),
        B('قرر لكل مشروع عندك: محتاج layers ولا لأ.', 'Decide for each of your projects: layers or not.')
      ],
      words: [
        W('repository pattern', 'واجهة للبيانات بتخبّي SQL', 'a collection-like interface hiding storage', 'The repository pattern made tests fast.'),
        W('unit of work', 'عملية بيزنس واحدة = transaction واحدة', 'one business operation as one transaction', 'The unit of work rolled back the failed order.'),
        W('in-memory repository', 'repository في الذاكرة للاختبار', 'a repository storing data in memory for tests', 'Tests use an in-memory repository.'),
        W('layered architecture', 'معمارية طبقات', 'code organised in layers', 'A layered architecture suits the API service.'),
        W('business transaction', 'عملية بيزنس كاملة كوحدة واحدة', 'a business operation saved as one unit', 'Placing an order is one business transaction.')
      ],
      read: [{ lib: 'Architecture Patterns with Python', what: B('اقرا فصل Repository وUnit of Work.', 'Read the Repository and Unit of Work chapters.') }],
      challenge: B('طبّق repository وunit of work على خدمة الطلبات: InMemory وPostgres/SQLite بنفس الـ Protocol، كل use case في unit of work، واختبارات المنطق كلها من غير قاعدة بيانات (وشوية اختبارات تكامل على القاعدة الحقيقية).', 'Apply repository and unit of work to the orders service: InMemory and Postgres/SQLite with the same Protocol, every use case inside a unit of work, and all logic tests without a database (plus a few integration tests on the real one).'),
      quiz: [
        Q(B('اختبارات المنطق السريعة:', 'Fast logic tests:'), [['in-memory repository', 'an in-memory repository'], ['قاعدة الإنتاج', 'the production database'], ['من غير اختبارات', 'no tests']], 0, B('سرعة.', 'Speed.')),
        Q(B('خطأ في نص unit of work:', 'An error midway through a unit of work:'), [['rollback لكل التغييرات', 'roll back every change'], ['احفظ اللي اتعمل', 'save what was done'], ['تجاهل', 'ignore it']], 0, B('ذرّية.', 'Atomicity.')),
        Q(B('سكربت 100 سطر:', 'A 100-line script:'), [['من غير layers', 'no layers'], ['5 طبقات', '5 layers'], ['microservices', 'microservices']], 0, B('على قد الحاجة.', 'Fit to need.'))
      ] },

    { title: B('المعمارية النظيفة', 'Clean architecture'),
      goal: B('المنطق في النص والأدوات على الأطراف.', 'Logic in the centre, tools at the edges.'),
      learn: [
        L(B('Ports and Adapters', 'Ports and adapters'),
          B('**clean architecture** / **hexagonal architecture** (**ports and adapters**): في النص الـ domain والـ **use case** (منطق البيزنس، من غير أي import لـ FastAPI أو Postgres أو Slack). حواليه ports (Protocols) وadapters (التنفيذ الحقيقي). الاعتماد دايمًا من برّه لجوّه. النتيجة: تغيّر Telegram بـ WhatsApp من غير ما تلمس المنطق.', '**clean architecture** / **hexagonal architecture** (**ports and adapters**): in the centre the domain and the **use case** (business logic, with no import of FastAPI, Postgres or Slack). Around it ports (Protocols) and adapters (real implementations). Dependencies always point inward. The result: swap Telegram for WhatsApp without touching the logic.'),
          'shop/\n  domain/          order.py, money.py                   ← pure Python, no frameworks\n  use_cases/       place_order.py, refund.py            ← orchestrates the domain via ports\n  ports/           repos.py, notifier.py, payments.py   ← Protocols\n  adapters/        postgres_repo.py, telegram.py, paymob.py, fake_*.py\n  entrypoints/     api.py (FastAPI), worker.py, cli.py  ← wiring: build adapters, call use cases\n\nrule: domain ← use_cases ← adapters/entrypoints   (never the other way)', T),
        L(B('use case بالـ ports', 'A use case with ports'),
          B('الـ use case دالة (أو كلاس صغير) بتاخد الـ ports كمعاملات وبتنفّذ عملية بيزنس واحدة. ونمط مفيد معاها: **functional core imperative shell** — الحسابات والقرارات دوال نقية في النص (سهلة الاختبار جدًا)، والـ I/O على الأطراف.', 'A use case is a function (or a small class) taking ports as parameters and performing one business operation. A useful companion pattern: **functional core imperative shell** — calculations and decisions as pure functions in the centre (very easy to test), and I/O at the edges.'),
          'from dataclasses import dataclass\n\n# functional core: pure, no I/O\ndef decide_refund(total: float, days_since_delivery: int, damaged: bool) -> tuple[str, float]:\n    if damaged and days_since_delivery <= 14:\n        return "full", total\n    if days_since_delivery <= 3:\n        return "partial", round(total * 0.5, 2)\n    return "none", 0.0\n\n# imperative shell: the use case wires ports around the core\ndef request_refund(order_id, damaged, orders, payments, notifier, today):\n    o = orders.get(order_id)\n    kind, amount = decide_refund(o["total"], today - o["delivered_day"], damaged)\n    if amount:\n        payments.refund(order_id, amount)\n    notifier.send(o["phone"], f"Refund decision for {order_id}: {kind} ({amount} EGP)")\n    return kind, amount\n\nclass Orders:   get = staticmethod(lambda i: {"total": 650.0, "delivered_day": 10, "phone": "0100"})\nclass Payments: refund = staticmethod(lambda i, a: print(f"  [payments] refund {a} for {i}"))\nclass Notifier: send = staticmethod(lambda to, t: print(f"  [notify] {to}: {t}"))\n\nprint(decide_refund(650, 5, True), decide_refund(650, 2, False), decide_refund(650, 20, False))\nprint(request_refund(1042, True, Orders, Payments, Notifier, today=15))', R),
        L(B('طبقة منع الفساد', 'The anti-corruption layer'),
          B('بيانات Shopify أو Odoo أو Paymob ليها أشكالها وأسماءها الغريبة. **anti-corruption layer** = adapter بيترجمها لموديل الدومين بتاعك عند الحدود — عشان أسماء الـ APIs الخارجية متتسربش لكل الكود، ولما الـ API يتغير بتعدّل مكان واحد.', 'Shopify, Odoo or Paymob data has its own odd shapes and names. An **anti-corruption layer** = an adapter translating it into your domain model at the boundary — so external API names do not leak into all your code, and when the API changes you edit one place.'),
          'from dataclasses import dataclass\nfrom decimal import Decimal\n\n@dataclass(frozen=True)\nclass Order:                 # YOUR domain model\n    id: str\n    customer_phone: str\n    total: Decimal\n    currency: str\n    paid: bool\n\ndef from_shopify(p: dict) -> Order:\n    return Order(id=f"shopify-{p[\'id\']}", customer_phone=(p.get("customer") or {}).get("phone") or "",\n                 total=Decimal(p["total_price"]), currency=p["currency"], paid=p["financial_status"] == "paid")\n\ndef from_woocommerce(p: dict) -> Order:\n    return Order(id=f"woo-{p[\'id\']}", customer_phone=p["billing"]["phone"],\n                 total=Decimal(p["total"]), currency=p["currency"], paid=p["status"] in ("processing", "completed"))\n\nshopify = {"id": 5501, "total_price": "650.00", "currency": "EGP", "financial_status": "paid", "customer": {"phone": "+201012345678"}}\nwoo = {"id": 88, "total": "120.50", "currency": "EGP", "status": "on-hold", "billing": {"phone": "01198765432"}}\nfor o in (from_shopify(shopify), from_woocommerce(woo)):\n    print(o)', R)
      ],
      practice: [
        B('ارسم مشروعك الحالي كـ ports and adapters.', 'Draw your current project as ports and adapters.'),
        B('افصل دالة قرار نقية من use case فيه I/O.', 'Split a pure decision function out of a use case with I/O.'),
        B('اكتب adapter ترجمة لـ API خارجي بتستخدمه.', 'Write a translating adapter for an external API you use.'),
        B('اتأكد إن الـ domain مفيهوش import لأي framework.', 'Check that the domain imports no framework.')
      ],
      words: [
        W('clean architecture', 'معمارية المنطق فيها مستقل عن الأدوات', 'architecture keeping logic independent of tools', 'Clean architecture let us swap the database.'),
        W('hexagonal architecture', 'المعمارية السداسية', 'an architecture of a core with ports and adapters', 'Hexagonal architecture fits integration-heavy apps.'),
        W('ports and adapters', 'واجهات وتنفيذاتها على الأطراف', 'interfaces with implementations at the edges', 'With ports and adapters, Telegram is just an adapter.'),
        W('use case', 'عملية بيزنس واحدة في الكود', 'one business operation in code', 'request_refund is a use case.'),
        W('functional core imperative shell', 'قلب نقي وأطراف فيها I/O', 'pure logic inside, I/O at the edges', 'Functional core imperative shell made decisions easy to test.'),
        W('anti-corruption layer', 'طبقة ترجمة بيانات الأنظمة الخارجية', 'a layer translating external models', 'The anti-corruption layer hides Shopify’s field names.')
      ],
      read: [{ lib: 'Architecture Patterns with Python', what: B('اقرا المقدمة وفصل Service Layer.', 'Read the introduction and the Service Layer chapter.') }],
      challenge: B('أعد تنظيم خدمة المتجر (FastAPI + workers) على ports and adapters: domain نقي، use cases بـ ports، adapters لـ Postgres وTelegram وPaymob وfakes، anti-corruption layer لـ Shopify وWooCommerce — واختبار بيمنع الـ domain يعمل import لـ fastapi أو sqlalchemy.', 'Reorganise the shop service (FastAPI + workers) as ports and adapters: a pure domain, use cases with ports, adapters for Postgres, Telegram, Paymob and fakes, an anti-corruption layer for Shopify and WooCommerce — and a test that forbids the domain from importing fastapi or sqlalchemy.'),
      quiz: [
        Q(B('الـ domain يعمل import لـ:', 'The domain may import:'), [['Python العادي بس', 'plain Python only'], ['FastAPI', 'FastAPI'], ['SQLAlchemy', 'SQLAlchemy']], 0, B('مستقل.', 'Independent.')),
        Q(B('اتجاه الاعتماد:', 'The direction of dependencies:'), [['من برّه لجوّه', 'from outside inward'], ['من جوّه لبرّه', 'from inside outward'], ['عشوائي', 'random']], 0, B('للمركز.', 'Toward the core.')),
        Q(B('API خارجي غيّر أسماء الحقول:', 'An external API renamed its fields:'), [['تعدّل الـ anti-corruption layer بس', 'edit only the anti-corruption layer'], ['تعدّل كل الكود', 'edit all the code'], ['تسيبه', 'ignore it']], 0, B('حدود.', 'Boundary.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('كود كبير يفضل سهل.', 'Large code that stays easy.'),
      review: [
        B('روائح الكود وrefactoring وcharacterization tests.', 'Code smells, refactoring and characterization tests.'),
        B('SOLID بـ Protocol وregistry وcomposition.', 'SOLID with Protocols, registries and composition.'),
        B('Strategy وFactory وObserver وCommand.', 'Strategy, Factory, Observer and Command.'),
        B('Repository وUnit of Work وإمتى يستاهلوا.', 'Repository, Unit of Work and when they are worth it.'),
        B('Ports and adapters وfunctional core وanti-corruption layer.', 'Ports and adapters, functional core and the anti-corruption layer.')
      ],
      project: B('مشروع الأسبوع «إعادة معمارية»: خد مشروع متجر أو أتمتة عندك (FastAPI أو workers)، ثبّت سلوكه بـ characterization tests، وأعد تنظيمه على ports and adapters: domain نقي، use cases، repository وunit of work، event bus لأحداث الدومين، strategies بـ registry، anti-corruption layer لمنصتين، fakes لكل port، واختبار حدود للـ imports — مع README بيشرح المعمارية بالرسم.', 'Week project «re-architecture»: take a shop or automation project of yours (FastAPI or workers), pin its behaviour with characterization tests, and reorganise it as ports and adapters: a pure domain, use cases, repository and unit of work, an event bus for domain events, strategies via a registry, an anti-corruption layer for two platforms, fakes for every port, and an import-boundary test — with a README explaining the architecture with a diagram.'),
      test: [
        Q(B('god object:', 'A god object:'), [['كلاس بيعمل كل حاجة', 'a class doing everything'], ['كلاس مثالي', 'a perfect class'], ['كلاس فاضي', 'an empty class']], 0, B('رائحة.', 'A smell.')),
        Q(B('cohesion عالي:', 'High cohesion:'), [['الحاجات المرتبطة في مكان واحد', 'related things kept together'], ['كل حاجة في ملف واحد', 'everything in one file'], ['تكرار', 'duplication']], 0, B('ترابط.', 'Togetherness.')),
        Q(B('refactoring وميزة جديدة:', 'A refactoring and a new feature:'), [['في commits منفصلة', 'in separate commits'], ['في نفس الـ commit', 'in the same commit'], ['من غير commits', 'without commits']], 0, B('وضوح.', 'Clarity.')),
        Q(B('dependency inversion:', 'Dependency inversion:'), [['المنطق يعتمد على واجهات', 'logic depends on interfaces'], ['المنطق يعتمد على Gmail', 'logic depends on Gmail'], ['مفيش اعتماد', 'no dependencies']], 0, B('تجريد.', 'Abstraction.')),
        Q(B('liskov بيتكسر لما:', 'Liskov is broken when:'), [['نوع فرعي يرمي خطأ مكان الأصلي', 'a subtype raises where the original works'], ['تستخدم Protocol', 'you use a Protocol'], ['تكتب اختبار', 'you write a test']], 0, B('استبدال.', 'Substitution.')),
        Q(B('event bus بيفيد في:', 'An event bus helps:'), [['فصل اللي حصل عن رد الفعل', 'separating what happened from the reactions'], ['تسريع SQL', 'speeding up SQL'], ['الألوان', 'colours']], 0, B('فصل.', 'Decoupling.')),
        Q(B('command pattern:', 'The command pattern:'), [['العملية ككائن يتأجل أو يتسجل', 'an operation as an object to defer or log'], ['أمر طرفية', 'a terminal command'], ['دالة print', 'a print function']], 0, B('كائن.', 'An object.')),
        Q(B('repository بيخبّي:', 'A repository hides:'), [['تفاصيل التخزين', 'storage details'], ['المنطق', 'the logic'], ['الاختبارات', 'the tests']], 0, B('SQL.', 'SQL.')),
        Q(B('unit of work:', 'A unit of work:'), [['كل التغييرات أو ولا واحدة', 'all changes or none'], ['نص التغييرات', 'half the changes'], ['تغيير واحد بس', 'only one change']], 0, B('transaction.', 'Transaction.')),
        Q(B('functional core:', 'A functional core:'), [['قرارات نقية من غير I/O', 'pure decisions without I/O'], ['كل الـ I/O', 'all the I/O'], ['الواجهة', 'the UI']], 0, B('نقي.', 'Pure.')),
        Q(B('anti-corruption layer:', 'An anti-corruption layer:'), [['يترجم نماذج خارجية لنموذجك', 'translates external models into yours'], ['يمنع الفيروسات', 'blocks viruses'], ['يشفّر', 'encrypts']], 0, B('ترجمة.', 'Translation.')),
        Q(B('أنماط التصميم:', 'Design patterns:'), [['أدوات لما تحل مشكلة حقيقية', 'tools for when they solve a real problem'], ['لازم كلها في كل مشروع', 'all required in every project'], ['ممنوعة', 'forbidden']], 0, B('على قد الحاجة.', 'Fit to need.'))
      ] }
  ]
};
