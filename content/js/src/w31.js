// JavaScript week 31 — UI components without a framework.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const J = { run: 'js' };
const S = { lang: 'js' };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('مكوّنات واجهة من غير Framework', 'UI components without a framework'),
  goal: B('تبني واجهات من قطع صغيرة قابلة لإعادة الاستخدام بالمتصفح نفسه: نمط state ← render، الـ store والاشتراك، Web Components بـ custom elements وshadow DOM وslots، أحداث مخصصة، وstate machines — وتفهم الأفكار اللي React وغيره مبنيين عليها.',
          'Build interfaces from small reusable pieces using the browser itself: the state → render pattern, a store with subscriptions, Web Components with custom elements, shadow DOM and slots, custom events, and state machines — and understand the ideas React and others are built on.'),
  days: [
    { title: B('state ← render', 'state → render'),
      goal: B('الواجهة دايمًا انعكاس للبيانات.', 'The interface is always a reflection of the data.'),
      learn: [
        L(B('الفكرة الأساسية', 'The core idea'),
          B('بدل ما تعدّل الـ DOM هنا وهناك (وتنسى مكان)، احفظ **state** واحد (كائن)، واكتب `render(state)` بيرسم الواجهة كلها منه. أي تغيير = عدّل الـ state ← نادي render. ده **unidirectional data flow**: البيانات بتنزل للواجهة، والأحداث بتطلع تغيّر الـ state.', 'Instead of editing the DOM here and there (and forgetting a spot), keep one **state** (an object) and write `render(state)` that draws the whole interface from it. Any change = update the state → call render. That is **unidirectional data flow**: data flows down to the UI, and events flow up to change the state.'),
          'const state = { filter: "all", orders: [{ id: 1, customer: "Sara", status: "paid" }, { id: 2, customer: "Omar", status: "new" }, { id: 3, customer: "Mona", status: "paid" }] };\nconst esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", \'"\': "&quot;" })[c]);\nfunction render() {\n  const visible = state.orders.filter(o => state.filter === "all" || o.status === state.filter);\n  document.querySelector("#app").innerHTML = `\n    <div role="group" aria-label="Filter">${["all", "paid", "new"].map(f => `<button data-filter="${f}" aria-pressed="${f === state.filter}">${f}</button>`).join(" ")}</div>\n    <ul>${visible.map(o => `<li>#${o.id} ${esc(o.customer)} — ${o.status}</li>`).join("")}</ul>\n    <p>${visible.length} of ${state.orders.length}</p>`;\n}\ndocument.querySelector("#app").addEventListener("click", e => {\n  const f = e.target.closest("[data-filter]")?.dataset.filter;\n  if (f) { state.filter = f; render(); }          // event → state → render\n});\nrender();\ndocument.querySelector(\'[data-filter="paid"]\').click();\nconsole.log(document.querySelector("#app ul").textContent.trim(), "|", document.querySelector("#app p").textContent);', Object.assign({ html: '<div id="app"></div>' }, J)),
        L(B('derived state', 'Derived state'),
          B('**derived state** = حاجات بتتحسب من الـ state (العدد، الإجمالي، القايمة المفلترة) — متخزنهاش لوحدها، احسبها في render. كده مستحيل تبقى «غلط» أو متأخرة. خزّن الحد الأدنى: البيانات الخام واختيارات المستخدم.', '**derived state** = things computed from the state (the count, the total, the filtered list) — do not store them separately, compute them in render. Then they can never be «wrong» or stale. Store the minimum: raw data and the user’s choices.'),
          '// ✗ duplicated state: easy to forget updating one of them\nstate.orders.push(newOrder); state.count++;   // and state.total? and state.paidCount?\n\n// ✓ minimal state, everything else derived\nconst stats = s => ({\n  count: s.orders.length,\n  total: s.orders.reduce((t, o) => t + o.total, 0),\n  paid: s.orders.filter(o => o.status === "paid").length,\n});', S),
        L(B('أمان في الـ render', 'Safety when rendering'),
          B('render بـ innerHTML سريع ومريح — بس **أي** نص جاي من بيانات لازم يتهرب (esc) زي ما عملنا في أسبوع 12، وإلا XSS. والبديل: `createElement` و`textContent`، أو `<template>` تنسخه وتملا نصوصه. وفكّر في التركيز: render كامل بيضيّع التركيز من الخانة اللي المستخدم بيكتب فيها — حدّث الأجزاء المتغيرة بس.', 'Rendering with innerHTML is fast and easy — but **every** piece of text from data must be escaped (esc) as in week 12, or you get XSS. The alternative: `createElement` and `textContent`, or a `<template>` you clone and fill. And think about focus: a full re-render loses focus in the field the user is typing in — update only the changed parts.'),
          '<template id="row"><li><b class="name"></b> <span class="status"></span></li></template>\n<script>\n  const tpl = document.querySelector("#row");\n  function renderRow(order) {\n    const li = tpl.content.firstElementChild.cloneNode(true);\n    li.querySelector(".name").textContent = order.customer;     // safe: text, never HTML\n    li.querySelector(".status").textContent = order.status;\n    return li;\n  }\n  list.replaceChildren(...orders.map(renderRow));\n</script>', { lang: 'html' })
      ],
      practice: [
        B('اعمل todo list بـ state وrender واحدة.', 'Build a todo list with a state and one render.'),
        B('شيل أي state مكرر واحسبه.', 'Remove any duplicated state and compute it.'),
        B('جرّب اسم عميل فيه <img onerror> من غير esc وبيه.', 'Try a customer name containing <img onerror> with and without esc.'),
        B('حدّث العدّاد بس بدل render كامل.', 'Update only the counter instead of a full render.')
      ],
      words: [
        W('ui component', 'قطعة واجهة قابلة لإعادة الاستخدام', 'a reusable piece of interface', 'The order card is a UI component.'),
        W('unidirectional data flow', 'البيانات بتنزل والأحداث بتطلع', 'data flows down, events flow up', 'Unidirectional data flow keeps bugs away.'),
        W('derived state', 'قيم بتتحسب من الـ state', 'values computed from the state', 'The total is derived state.'),
        W('single source of state', 'مكان واحد للبيانات', 'one place for the data', 'Keep a single source of state.'),
        W('encapsulation', 'إخفاء التفاصيل الداخلية للمكوّن', 'hiding a component’s internals', 'Encapsulation keeps styles from leaking.')
      ],
      read: [{ lib: 'javascript.info: Browser: Document, Events, Interfaces', what: B('اقرا Modifying the document.', 'Read Modifying the document.') }],
      challenge: B('أعد بناء «لوحة الطلبات» بنمط state ← render: فلتر، بحث، ترتيب، إضافة وحذف — state واحد صغير، والباقي derived، وesc لكل نص، والتركيز ميضيعش من خانة البحث.', 'Rebuild the «orders board» with state → render: filter, search, sort, add and delete — one small state, everything else derived, esc on every text, and focus never lost from the search box.'),
      quiz: [
        Q(B('الإجمالي يتخزن ولا يتحسب؟', 'Is the total stored or computed?'), [['يتحسب في render', 'computed in render'], ['يتخزن ويتحدث يدوي', 'stored and updated by hand'], ['الاتنين', 'both']], 0, B('derived.', 'Derived.')),
        Q(B('ضغطة زرار:', 'A button click:'), [['تغيّر الـ state ثم render', 'changes the state, then renders'], ['تعدّل الـ DOM مباشرة', 'edits the DOM directly'], ['تعيد تحميل الصفحة', 'reloads the page']], 0, B('unidirectional.', 'Unidirectional.')),
        Q(B('اسم عميل في innerHTML:', 'A customer name in innerHTML:'), [['لازم esc', 'must be escaped'], ['عادي', 'fine'], ['base64', 'base64']], 0, B('XSS.', 'XSS.'))
      ] },

    { title: B('store بسيط', 'A simple store'),
      goal: B('أجزاء كتير من الواجهة تشارك نفس البيانات.', 'Many parts of the UI share the same data.'),
      learn: [
        L(B('subscribe', 'subscribe'),
          B('لما 3 أجزاء (عدّاد في الهيدر، جدول، ملخص) محتاجين نفس البيانات: **store** = مكان واحد للـ state بدالتين: `setState` و**subscribe**. كل جزء بيشترك، وأي تغيير بيبلّغ الكل. ده قلب Redux وZustand وغيرهم — في 15 سطر.', 'When 3 parts (a header counter, a table, a summary) need the same data: a **store** = one place for state with two functions: `setState` and **subscribe**. Each part subscribes, and every change notifies all. That is the heart of Redux, Zustand and friends — in 15 lines.'),
          'function createStore(initial) {\n  let state = initial;\n  const listeners = new Set();\n  return {\n    get: () => state,\n    set(update) {\n      const next = typeof update === "function" ? update(state) : { ...state, ...update };\n      if (next === state) return;\n      state = next;\n      listeners.forEach(fn => fn(state));\n    },\n    subscribe(fn) { listeners.add(fn); fn(state); return () => listeners.delete(fn); },\n  };\n}\nconst cart = createStore({ items: [] });\nconst stopBadge = cart.subscribe(s => console.log("badge:", s.items.length));\ncart.subscribe(s => console.log("total:", s.items.reduce((t, i) => t + i.price * i.qty, 0)));\ncart.set(s => ({ items: [...s.items, { sku: "A1", price: 45, qty: 2 }] }));\nstopBadge();                                      // unsubscribe\ncart.set(s => ({ items: [...s.items, { sku: "B2", price: 12.5, qty: 1 }] }));', J),
        L(B('تحديثات immutable', 'Immutable updates'),
          B('في الـ store، متعدلش الكائن نفسه (`state.items.push`) — اعمل نسخة جديدة (`[...items, x]`، `{ ...o, status }`). ليه؟ عشان المقارنة `next !== state` تكشف التغيير، ولأن الـ undo والـ history بقوا سهلين، ومفيش حد بيعدّل بياناتك من وراك. ده الـ immutable update من أسبوع 7.', 'In a store, do not mutate the object (`state.items.push`) — make a new copy (`[...items, x]`, `{ ...o, status }`). Why? So the `next !== state` check detects change, undo and history become easy, and nobody changes your data behind your back. It is the immutable update from week 7.'),
          'const actions = {\n  add: (s, item) => ({ ...s, items: [...s.items, item] }),\n  setQty: (s, sku, qty) => ({ ...s, items: s.items.map(i => i.sku === sku ? { ...i, qty } : i) }),\n  remove: (s, sku) => ({ ...s, items: s.items.filter(i => i.sku !== sku) }),\n};\nlet s0 = { items: [] };\nconst s1 = actions.add(s0, { sku: "A1", qty: 1 });\nconst s2 = actions.setQty(s1, "A1", 3);\nconst s3 = actions.remove(s2, "A1");\nconsole.log(s0.items.length, s1.items[0].qty, s2.items[0].qty, s3.items.length, "| s1 untouched:", s1 !== s2 && s1.items[0].qty === 1);\nconst history = [s0, s1, s2, s3];\nconsole.log("undo to step 2 →", JSON.stringify(history[2]));', J),
        L(B('حفظ الـ store', 'Persisting the store'),
          B('اشترك مرة إضافية تحفظ في localStorage (مع try/catch)، واقرا منه في الأول. وبكده السلة متضيعش لو الصفحة اتقفلت. ولو البيانات مهمة (طلب نص مكتوب): ابعتها لـ n8n كمسودة. ودايمًا خزّن رقم إصدار عشان تعرف تتعامل مع شكل قديم.', 'Add one more subscriber that saves to localStorage (with try/catch), and read from it at start. The cart survives a closed page. If the data matters (a half-written order): send it to n8n as a draft. And always store a version number so you can handle an old shape.'),
          'const KEY = "cart:v2";\nfunction load() {\n  try { const s = JSON.parse(localStorage.getItem(KEY)); return s?.version === 2 ? s : null; } catch { return null; }\n}\nconst cart = createStore(load() ?? { version: 2, items: [] });\ncart.subscribe(s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode: ignore */ } });', S)
      ],
      practice: [
        B('اعمل store لسلة واشترك بـ 3 أجزاء.', 'Build a cart store and subscribe 3 parts.'),
        B('اكتب actions immutable للسلة.', 'Write immutable actions for the cart.'),
        B('ضيف undo بقايمة history.', 'Add undo with a history list.'),
        B('احفظ الـ store في localStorage بإصدار.', 'Persist the store in localStorage with a version.')
      ],
      words: [
        W('store', 'مكان واحد للـ state مع اشتراكات', 'one place for state with subscriptions', 'The cart store notifies the header.'),
        W('subscribe', 'التسجيل لاستلام التغييرات', 'registering to receive changes', 'The table subscribes to the store.'),
        W('unsubscribe', 'إلغاء الاشتراك', 'cancelling a subscription', 'Unsubscribe when the panel closes.'),
        W('action', 'دالة بتوصف تغيير في الـ state', 'a function describing a state change', 'The remove action filters the item.'),
        W('undo history', 'قايمة نسخ الـ state للرجوع', 'a list of state copies for going back', 'Immutable updates make undo history easy.')
      ],
      read: [{ t: 'Redux: Fundamentals — State, Actions, Reducers', url: 'https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers', what: B('اقرا الفكرة (مش لازم تستخدم Redux).', 'Read the idea (you need not use Redux).') }],
      challenge: B('اعمل سلة مشتريات بـ store: هيدر بعدد، قايمة بكميات، ملخص بالإجمالي والضريبة، undo، وحفظ في localStorage — وزرار «اطلب» بيبعت لـ webhook n8n ويفضّي السلة.', 'Build a shopping cart with a store: a header count, a list with quantities, a summary with total and VAT, undo, localStorage persistence — and an «order» button posting to an n8n webhook and emptying the cart.'),
      quiz: [
        Q(B('3 أجزاء محتاجين نفس البيانات:', 'Three parts need the same data:'), [['store واحد بـ subscribe', 'one store with subscribe'], ['3 نسخ', 'three copies'], ['global variables', 'global variables']], 0, B('مصدر واحد.', 'One source.')),
        Q(B('state.items.push(x) في store:', 'state.items.push(x) in a store:'), [['غلط: اعمل نسخة جديدة', 'wrong: make a new copy'], ['صح', 'right'], ['أسرع وأحسن', 'faster and better']], 0, B('immutable.', 'Immutable.')),
        Q(B('subscribe بيرجّع:', 'subscribe returns:'), [['دالة لإلغاء الاشتراك', 'a function to unsubscribe'], ['الـ state', 'the state'], ['undefined', 'undefined']], 0, B('cleanup.', 'Cleanup.'))
      ] },

    { title: B('Web Components', 'Web Components'),
      goal: B('تعمل عنصر HTML بتاعك يشتغل في أي صفحة أو framework.', 'Make your own HTML element that works in any page or framework.'),
      learn: [
        L(B('custom element', 'A custom element'),
          B('**web component** = عنصر HTML جديد انت بتعرّفه: `<order-card>`. **custom element** = كلاس بيرث `HTMLElement`، وبتسجله بـ `customElements.define("order-card", OrderCard)` (الاسم لازم فيه شَرطة). **lifecycle callback** زي **connectedcallback** بيشتغل لما العنصر يدخل الصفحة.', 'A **web component** = a new HTML element you define: `<order-card>`. A **custom element** = a class extending `HTMLElement`, registered with `customElements.define("order-card", OrderCard)` (the name needs a hyphen). A **lifecycle callback** such as **connectedcallback** runs when the element enters the page.'),
          'class OrderCard extends HTMLElement {\n  connectedCallback() {\n    const total = Number(this.getAttribute("total") ?? 0);\n    this.innerHTML = "";\n    const title = document.createElement("b");\n    title.textContent = `#${this.getAttribute("order-id")} · ${this.getAttribute("customer")}`;\n    const amount = document.createElement("span");\n    amount.textContent = ` ${total.toFixed(2)} EGP`;\n    this.append(title, amount);\n    if (total > 1000) this.dataset.vip = "";\n  }\n}\ncustomElements.define("order-card", OrderCard);\ndocument.body.insertAdjacentHTML("beforeend", \'<order-card order-id="1042" customer="Sara" total="1250"></order-card><order-card order-id="1043" customer="Omar" total="90"></order-card>\');\ndocument.querySelectorAll("order-card").forEach(c => console.log(c.textContent, "vip:", c.hasAttribute("data-vip")));', J),
        L(B('attributes بتتراقب', 'Observed attributes'),
          B('عشان العنصر يتحدث لما attribute يتغير: **observedattributes** (قايمة بالأسماء) و**attributechangedcallback** (بيتنادى مع كل تغيير). كده `card.setAttribute("status", "shipped")` من أي مكان بيحدّث الشكل لوحده — العنصر بيدير نفسه.', 'For the element to update when an attribute changes: **observedattributes** (a list of names) and **attributechangedcallback** (called on each change). Then `card.setAttribute("status", "shipped")` from anywhere updates the look by itself — the element manages itself.'),
          'class StatusBadge extends HTMLElement {\n  static observedAttributes = ["status"];\n  static labels = { new: "🆕 New", paid: "💰 Paid", shipped: "🚚 Shipped" };\n  attributeChangedCallback(name, oldValue, newValue) {\n    this.textContent = StatusBadge.labels[newValue] ?? newValue;\n    this.setAttribute("aria-label", `status: ${newValue}`);\n    console.log(`${name}: ${oldValue} → ${newValue}`);\n  }\n}\ncustomElements.define("status-badge", StatusBadge);\nconst badge = document.createElement("status-badge");\ndocument.body.append(badge);\nbadge.setAttribute("status", "new");\nbadge.setAttribute("status", "paid");\nbadge.setAttribute("status", "shipped");\nconsole.log("now shows:", badge.textContent);', J),
        L(B('shadow DOM وslots', 'Shadow DOM and slots'),
          B('**shadow dom** بيدّي المكوّن DOM وCSS خاصين بيه (**encapsulation**): الـ CSS بتاعه ميسربش برة، وCSS الصفحة ميكسرهوش. و**slot** بيسيب مكان للمحتوى اللي المستخدم بيحطه جوه العنصر. والـ CSS variables بتعدي جوه الـ shadow — كده تخلّيه قابل للتخصيص.', '**shadow dom** gives a component its own DOM and CSS (**encapsulation**): its CSS does not leak out, and the page’s CSS cannot break it. A **slot** leaves room for content the user places inside the element. CSS variables do pass into the shadow — that is how you make it customisable.'),
          'class InfoCard extends HTMLElement {\n  constructor() {\n    super();\n    this.attachShadow({ mode: "open" }).innerHTML = `\n      <style>\n        :host { display: block; border: 1px solid #dde3ea; border-radius: var(--card-radius, 12px); padding: 12px; }\n        h3 { margin: 0 0 6px; color: var(--card-accent, #0a7d32); }\n      </style>\n      <h3><slot name="title">Untitled</slot></h3>\n      <slot></slot>`;\n  }\n}\ncustomElements.define("info-card", InfoCard);\ndocument.body.insertAdjacentHTML("beforeend", `<style>h3 { color: red; }</style>\n  <info-card style="--card-accent:#1a5fb4"><span slot="title">Today</span><p>12 orders · 3 late</p></info-card>`);\nconst card = document.querySelector("info-card");\nconsole.log("slotted title:", card.querySelector("[slot=title]").textContent, "| shadow h3 exists:", Boolean(card.shadowRoot.querySelector("h3")));', J)
      ],
      practice: [
        B('اعمل <price-tag amount="45" currency="EGP">.', 'Build <price-tag amount="45" currency="EGP">.'),
        B('خلّي status-badge يغيّر لونه بـ CSS variable.', 'Make status-badge change colour via a CSS variable.'),
        B('اعمل <info-card> بـ slot للعنوان والمحتوى.', 'Build <info-card> with slots for title and content.'),
        B('استخدم مكوّنك في صفحة تانية بسطر import.', 'Use your component in another page with one import.')
      ],
      words: [
        W('web component', 'عنصر HTML بتعرّفه بنفسك', 'an HTML element you define yourself', 'The order card is a web component.'),
        W('custom element', 'كلاس مسجّل كعنصر HTML', 'a class registered as an HTML element', 'Define the custom element with a hyphenated name.'),
        W('lifecycle callback', 'دالة بتتنادى في مراحل حياة العنصر', 'a function called at stages of an element’s life', 'connectedCallback is a lifecycle callback.'),
        W('connectedcallback', 'بيشتغل لما العنصر يدخل الصفحة', 'runs when the element enters the page', 'Render in connectedCallback.'),
        W('observedattributes', 'قايمة الـ attributes اللي بتتراقب', 'the list of watched attributes', 'observedAttributes lists "status".'),
        W('attributechangedcallback', 'بيتنادى لما attribute يتغير', 'called when an attribute changes', 'attributeChangedCallback redraws the badge.'),
        W('shadow dom', 'DOM وCSS خاصين بالمكوّن', 'a component’s private DOM and CSS', 'Shadow DOM stops styles leaking.'),
        W('slot', 'مكان للمحتوى اللي بيتحط جوه المكوّن', 'a place for content put inside the component', 'The title goes into the named slot.')
      ],
      read: [{ lib: 'MDN: Web Components', what: B('اقرا Using custom elements وUsing shadow DOM.', 'Read Using custom elements and Using shadow DOM.') }],
      challenge: B('اعمل مكتبة مكوّنات صغيرة: <status-badge>، <price-tag>، <order-card> (بـ shadow DOM وslots وCSS variables) — واستخدمها في صفحة HTML عادية وفي صفحة فيها CSS بيحاول يكسرها.', 'Build a small component library: <status-badge>, <price-tag>, <order-card> (with shadow DOM, slots and CSS variables) — and use it in a plain HTML page and in a page whose CSS tries to break it.'),
      quiz: [
        Q(B('اسم custom element لازم:', 'A custom element name must:'), [['يكون فيه شَرطة', 'contain a hyphen'], ['يبدأ بحرف كبير', 'start with a capital'], ['يكون كلمة واحدة', 'be one word']], 0, B('order-card.', 'order-card.')),
        Q(B('CSS الصفحة يكسر مكوّن بـ shadow DOM؟', 'Can page CSS break a shadow-DOM component?'), [['لأ (إلا variables)', 'no (except variables)'], ['أيوه', 'yes'], ['دايمًا', 'always']], 0, B('encapsulation.', 'Encapsulation.')),
        Q(B('تحديث لما status يتغير:', 'Updating when status changes:'), ['observedAttributes + attributeChangedCallback', 'onload', 'setInterval'], 0, B('lifecycle.', 'Lifecycle.'))
      ] },

    { title: B('الأحداث بين المكوّنات', 'Events between components'),
      goal: B('المكوّنات تتكلم مع بعض من غير ما تعتمد على بعض.', 'Components talk to each other without depending on each other.'),
      learn: [
        L(B('CustomEvent', 'CustomEvent'),
          B('المكوّن ميعرفش مين بيستخدمه — بيبلّغ بحدث: **customevent** `new CustomEvent("order-select", { detail: { id }, bubbles: true })`. اللي فوق يسمع زي click عادي. كده `<order-card>` مبيعرفش حاجة عن الجدول ولا الـ store — قطعة مستقلة فعلًا.', 'A component does not know who uses it — it announces with an event: a **customevent** `new CustomEvent("order-select", { detail: { id }, bubbles: true })`. The parent listens like a normal click. Then `<order-card>` knows nothing about the table or the store — a truly independent piece.'),
          'class SelectableCard extends HTMLElement {\n  connectedCallback() {\n    this.tabIndex = 0;\n    this.setAttribute("role", "button");\n    this.textContent = `Order #${this.dataset.id}`;\n    const pick = () => this.dispatchEvent(new CustomEvent("order-select", { detail: { id: Number(this.dataset.id) }, bubbles: true }));\n    this.addEventListener("click", pick);\n    this.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });\n  }\n}\ncustomElements.define("selectable-card", SelectableCard);\ndocument.body.insertAdjacentHTML("beforeend", \'<section id="list"><selectable-card data-id="1042"></selectable-card><selectable-card data-id="1043"></selectable-card></section>\');\ndocument.querySelector("#list").addEventListener("order-select", e => console.log("parent got order-select:", e.detail.id));\ndocument.querySelectorAll("selectable-card")[1].click();\ndocument.querySelectorAll("selectable-card")[0].dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));', J),
        L(B('event bus', 'An event bus'),
          B('لأجزاء مش جنب بعض في الـ DOM (الهيدر والمودال): **event bus** صغير — `EventTarget` جاهز في المتصفح (وفي Node). بس متسرفش فيه: لو كل حاجة بتبعت لكل حاجة، مش هتعرف مين غيّر إيه. للـ state المشترك: الـ store أوضح.', 'For parts not near each other in the DOM (the header and a modal): a small **event bus** — `EventTarget` is built into the browser (and Node). But do not overuse it: if everything emits to everything, you cannot tell who changed what. For shared state: the store is clearer.'),
          'const bus = new EventTarget();\nconst emit = (type, detail) => bus.dispatchEvent(new CustomEvent(type, { detail }));\nconst on = (type, fn) => { const h = e => fn(e.detail); bus.addEventListener(type, h); return () => bus.removeEventListener(type, h); };\n\nconst off = on("toast", msg => console.log("🔔 toast:", msg));\non("order-saved", o => emit("toast", `Order #${o.id} saved`));\nemit("order-saved", { id: 1042 });\noff();\nemit("order-saved", { id: 1043 });          // no toast listener any more\nconsole.log("done");', J),
        L(B('state machine', 'A state machine'),
          B('فورم بيتبعت ليه حالات: idle ← sending ← success أو error ← idle. بدل 4 booleans (`isLoading`، `isError`…) ممكن يتلخبطوا (loading وerror مع بعض؟!)، اعمل **state machine**: حالة واحدة + انتقالات مسموحة بس. **finite state** = عدد محدود من الحالات — مستحيل توصل لحالة غلط.', 'A submitting form has states: idle → sending → success or error → idle. Instead of 4 booleans (`isLoading`, `isError`…) that can clash (loading and error at once?!), build a **state machine**: one state + only allowed transitions. **finite state** = a limited number of states — an invalid state is impossible.'),
          'const machine = {\n  idle: { SUBMIT: "sending" },\n  sending: { OK: "success", FAIL: "error" },\n  success: { RESET: "idle" },\n  error: { RETRY: "sending", RESET: "idle" },\n};\nfunction createMachine(start = "idle") {\n  let state = start;\n  return {\n    get state() { return state; },\n    send(event) {\n      const next = machine[state][event];\n      console.log(next ? `${state} --${event}--> ${next}` : `${state}: ignored ${event}`);\n      if (next) state = next;\n      return state;\n    },\n  };\n}\nconst form = createMachine();\nform.send("SUBMIT"); form.send("SUBMIT"); form.send("FAIL"); form.send("RETRY"); form.send("OK"); form.send("RESET");', J)
      ],
      practice: [
        B('خلّي order-card يبعت order-select.', 'Make order-card emit order-select.'),
        B('اعمل bus للتنبيهات بين جزأين بعيدين.', 'Build a bus for toasts between two distant parts.'),
        B('حوّل فورم بـ 3 booleans لـ state machine.', 'Turn a form with 3 booleans into a state machine.'),
        B('اعرض الزرار حسب الحالة (معطّل في sending).', 'Render the button by state (disabled while sending).')
      ],
      words: [
        W('customevent', 'حدث مخصص ببيانات', 'a custom event carrying data', 'The card dispatches a CustomEvent.'),
        W('dispatchevent', 'إطلاق حدث من عنصر', 'firing an event from an element', 'dispatchEvent tells the parent.'),
        W('event bus', 'قناة أحداث مشتركة بين أجزاء بعيدة', 'a shared event channel between distant parts', 'The toast listens on the event bus.'),
        W('state machine', 'حالات محددة وانتقالات مسموحة', 'fixed states and allowed transitions', 'The form is a state machine.'),
        W('finite state', 'عدد محدود من الحالات', 'a limited number of states', 'Finite states remove impossible combos.')
      ],
      read: [{ t: 'MDN: DOM events', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events', what: B('اقرا Adding custom data – CustomEvent().', 'Read Adding custom data – CustomEvent().') }, { t: 'Stately: State machines intro', url: 'https://stately.ai/docs/state-machines-and-statecharts', what: B('اقرا الفكرة.', 'Read the idea.') }],
      challenge: B('اعمل فورم «طلب جديد» كمكوّن <order-form> بـ state machine (idle/sending/success/error)، بيبعت لـ n8n، وبيطلق order-created، والهيدر بيسمع عبر bus ويعرض toast — من غير ما المكوّنات تعرف بعض.', 'Build a «new order» form as an <order-form> component with a state machine (idle/sending/success/error), posting to n8n and emitting order-created, while the header listens through a bus and shows a toast — with no component knowing the others.'),
      quiz: [
        Q(B('بيانات الحدث المخصص في:', 'A custom event’s data is in:'), ['event.detail', 'event.data', 'event.value'], 0, B('detail.', 'detail.')),
        Q(B('الحدث يوصل للأب:', 'For the event to reach the parent:'), ['bubbles: true', 'composed: false', 'cancelable'], 0, B('bubbling.', 'Bubbling.')),
        Q(B('isLoading وisError true مع بعض:', 'isLoading and isError both true:'), [['حالة مستحيلة — state machine يمنعها', 'an impossible state — a machine prevents it'], ['عادي', 'normal'], ['أحسن', 'better']], 0, B('finite.', 'Finite.'))
      ] },

    { title: B('مكوّنات حقيقية بجودة', 'Real components with quality'),
      goal: B('مكوّن متاح للكل وقابل للاختبار وسهل الاستخدام.', 'A component that is accessible, testable and easy to use.'),
      learn: [
        L(B('واجهة المكوّن', 'The component API'),
          B('واجهة المكوّن = attributes (نصوص بسيطة: `status="paid"`)، و**props** كخصائص JS (بيانات معقدة: `card.order = {...}`)، وslots (محتوى)، وأحداث (اللي بيطلع)، وCSS variables وparts (التخصيص). وثّقها في تعليق أو README — ده «عقد» المكوّن.', 'A component’s API = attributes (simple text: `status="paid"`), **props** as JS properties (complex data: `card.order = {...}`), slots (content), events (what comes out), and CSS variables and parts (customisation). Document it in a comment or README — it is the component’s «contract».'),
          '/**\n * <order-card>\n *   attributes: status="new|paid|shipped" · compact\n *   property:   .order = { id, customer, total, items[] }\n *   slots:      actions (buttons shown at the bottom)\n *   events:     order-select { id } · order-action { id, action }\n *   css vars:   --card-accent · --card-radius\n *   parts:      ::part(title) · ::part(total)\n */', S),
        L(B('إمكانية الوصول في المكوّنات', 'Accessibility inside components'),
          B('المكوّن لازم يكون متاح من جواه: لو تفاعلي — `role` و`tabindex` والكيبورد (زي selectable-card)؛ لو فيه حالة — `aria-pressed` أو `aria-expanded`؛ والـ labels بتعدي الـ shadow DOM بصعوبة، فخلّي الخانات في الـ light DOM (slots) أو استخدم `ElementInternals` للفورمز.', 'A component must be accessible from the inside: if interactive — `role`, `tabindex` and the keyboard (like selectable-card); if it has state — `aria-pressed` or `aria-expanded`; and labels cross the shadow DOM poorly, so keep fields in the light DOM (slots) or use `ElementInternals` for forms.'),
          'class ToggleSwitch extends HTMLElement {\n  connectedCallback() {\n    this.setAttribute("role", "switch");\n    this.tabIndex = 0;\n    this.render();\n    this.addEventListener("click", () => this.toggle());\n    this.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); this.toggle(); } });\n  }\n  get on() { return this.getAttribute("aria-checked") === "true"; }\n  toggle() { this.setAttribute("aria-checked", String(!this.on)); this.render(); this.dispatchEvent(new CustomEvent("change", { detail: { on: this.on }, bubbles: true })); }\n  render() { this.textContent = `${this.dataset.label}: ${this.on ? "on" : "off"}`; }\n}\ncustomElements.define("toggle-switch", ToggleSwitch);\ndocument.body.insertAdjacentHTML("beforeend", \'<toggle-switch data-label="Express delivery" aria-checked="false"></toggle-switch>\');\nconst t = document.querySelector("toggle-switch");\nt.addEventListener("change", e => console.log("changed →", e.detail.on, "| role:", t.getAttribute("role"), "| aria-checked:", t.getAttribute("aria-checked")));\nt.click();\nt.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));', J),
        L(B('اختبار المكوّنات', 'Testing components'),
          B('اختبر المكوّن زي ما المستخدم بيستخدمه: حطه في صفحة، اضغط، شوف النص والـ aria والأحداث. في Vitest بـ بيئة `jsdom` أو `happy-dom`، أو بـ Playwright في متصفح حقيقي. واختبر الحالات: attribute ناقص، بيانات فاضية، نص عربي طويل.', 'Test a component as a user uses it: put it in a page, click, check the text, aria and events. In Vitest with a `jsdom` or `happy-dom` environment, or with Playwright in a real browser. And test the cases: a missing attribute, empty data, long Arabic text.'),
          '// vitest.config.ts: test: { environment: "jsdom" }\nimport { it, expect, vi } from "vitest";\nimport "../src/toggle-switch.js";\n\nit("toggles with the keyboard and announces the state", () => {\n  document.body.innerHTML = \'<toggle-switch data-label="Gift" aria-checked="false"></toggle-switch>\';\n  const t = document.querySelector("toggle-switch");\n  const onChange = vi.fn();\n  t.addEventListener("change", e => onChange(e.detail.on));\n  t.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));\n  expect(t.getAttribute("aria-checked")).toBe("true");\n  expect(onChange).toHaveBeenCalledWith(true);\n});', S)
      ],
      practice: [
        B('اكتب «عقد» لمكوّن عندك.', 'Write the «contract» for one of your components.'),
        B('اعمل toggle-switch متاح بالكيبورد.', 'Build a keyboard-accessible toggle-switch.'),
        B('اكتب 3 اختبارات Vitest بـ jsdom لمكوّن.', 'Write 3 Vitest tests with jsdom for a component.'),
        B('جرّب المكوّن بقارئ شاشة.', 'Try the component with a screen reader.')
      ],
      words: [
        W('props', 'بيانات بتتبعت للمكوّن كخصائص', 'data passed to a component as properties', 'Pass the order object as props.'),
        W('component api', 'عقد استخدام المكوّن', 'the contract for using a component', 'Document the component API.'),
        W('::part', 'تخصيص جزء داخلي من shadow DOM', 'styling an inner part of a shadow DOM', '::part(title) changes the heading.'),
        W('elementinternals', 'واجهة لربط مكوّن بالفورمز والـ a11y', 'an API linking a component to forms and a11y', 'ElementInternals makes it a form field.'),
        W('happy-dom', 'بيئة DOM خفيفة للاختبارات', 'a light DOM environment for tests', 'Vitest can use happy-dom.')
      ],
      read: [{ t: 'MDN: ::part()', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::part', what: B('اقرا المثال.', 'Read the example.') }, { lib: 'WAI-ARIA Authoring Practices', what: B('اقرا Switch Pattern.', 'Read the Switch Pattern.') }],
      challenge: B('خلّي مكتبة مكوّناتك «جاهزة للإنتاج»: عقد موثّق لكل مكوّن، كيبورد وaria، CSS variables وparts، 10 اختبارات Vitest، وصفحة عرض — وانشرها على GitHub Pages.', 'Make your component library «production-ready»: a documented contract per component, keyboard and aria, CSS variables and parts, 10 Vitest tests and a showcase page — published on GitHub Pages.'),
      quiz: [
        Q(B('بيانات معقدة للمكوّن:', 'Complex data for a component:'), [['property (props)', 'a property (props)'], ['attribute JSON', 'a JSON attribute'], ['class', 'a class']], 0, B('كائن.', 'An object.')),
        Q(B('مفتاح switch بالكيبورد:', 'A keyboard switch:'), ['role="switch" + aria-checked + Space/Enter', 'div onclick', 'title'], 0, B('a11y.', 'A11y.')),
        Q(B('اختبار مكوّن في Vitest:', 'Testing a component in Vitest:'), [['بيئة jsdom أو happy-dom', 'a jsdom or happy-dom environment'], ['Node العادي', 'plain Node'], ['مستحيل', 'impossible']], 0, B('DOM.', 'DOM.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('تطبيق صغير كامل من مكوّنات بتاعتك.', 'A small complete app built from your own components.'),
      review: [
        B('state ← render، derived state، والأمان في الرسم.', 'state → render, derived state and safe rendering.'),
        B('store بـ subscribe، تحديثات immutable، undo، وحفظ.', 'A store with subscribe, immutable updates, undo and persistence.'),
        B('Web Components: custom elements وattributes وshadow DOM وslots.', 'Web Components: custom elements, attributes, shadow DOM and slots.'),
        B('CustomEvent وevent bus وstate machines.', 'CustomEvent, an event bus and state machines.'),
        B('عقد المكوّن وa11y والاختبار.', 'The component contract, a11y and testing.')
      ],
      project: B('ابني «لوحة الطلبات الحية» من غير framework: store (طلبات، فلتر، اختيار) بتحديثات immutable وundo وحفظ؛ مكوّنات <order-card> و<status-badge> و<order-form> (state machine) و<toast-region> (live region)؛ تواصل بـ CustomEvent وbus؛ الطلبات بتيجي من API (أسبوع 14) وبتتبعت لـ n8n؛ a11y كامل؛ 10 اختبارات؛ وصفحة عرض للمكوّنات.', 'Build a «live orders board» with no framework: a store (orders, filter, selection) with immutable updates, undo and persistence; <order-card>, <status-badge>, <order-form> (a state machine) and <toast-region> (a live region) components; communication via CustomEvent and a bus; orders loaded from an API (week 14) and sent to n8n; full a11y; 10 tests; and a component showcase page.'),
      test: [
        Q(B('render(state):', 'render(state):'), [['الواجهة من الـ state', 'the UI from the state'], ['حفظ البيانات', 'saving data'], ['طلب API', 'an API call']], 0, B('انعكاس.', 'A reflection.')),
        Q(B('العدد والإجمالي:', 'The count and total:'), ['derived state', B('state منفصل', 'separate state'), 'localStorage'], 0, B('بيتحسب.', 'Computed.')),
        Q(B('store.subscribe(fn):', 'store.subscribe(fn):'), [['fn بيتنادى مع كل تغيير', 'fn is called on every change'], ['مرة واحدة', 'once'], ['أبدًا', 'never']], 0, B('اشتراك.', 'Subscription.')),
        Q(B('تحديث immutable للكمية:', 'An immutable quantity update:'), ['items.map(i => i.sku === s ? { ...i, qty } : i)', 'items[0].qty = 3', 'items.push(qty)'], 0, B('نسخة.', 'A copy.')),
        Q(B('customElements.define:', 'customElements.define:'), [['تسجيل عنصر HTML جديد', 'registering a new HTML element'], ['CSS', 'CSS'], ['fetch', 'fetch']], 0, B('custom element.', 'A custom element.')),
        Q(B('connectedCallback:', 'connectedCallback:'), [['لما العنصر يدخل الصفحة', 'when the element enters the page'], ['لما يتمسح', 'when removed'], ['كل ثانية', 'every second']], 0, B('lifecycle.', 'Lifecycle.')),
        Q(B('CSS المكوّن ميسربش:', 'Component CSS does not leak:'), ['shadow DOM', 'iframe', '!important'], 0, B('encapsulation.', 'Encapsulation.')),
        Q(B('محتوى المستخدم جوه المكوّن:', 'User content inside the component:'), ['slot', 'part', 'template'], 0, B('مكان.', 'A place.')),
        Q(B('المكوّن يبلّغ الأب:', 'The component tells its parent:'), ['CustomEvent bubbles', 'global variable', 'alert'], 0, B('مستقل.', 'Independent.')),
        Q(B('حالات الفورم:', 'Form states:'), ['state machine', B('4 booleans', '4 booleans'), 'setTimeout'], 0, B('finite.', 'Finite.')),
        Q(B('تخصيص لون مكوّن من برة:', 'Customising a component’s colour from outside:'), [['CSS variable', 'a CSS variable'], ['تعديل الكود', 'editing its code'], ['مستحيل', 'impossible']], 0, B('بتعدي الـ shadow.', 'Crosses the shadow.')),
        Q(B('مكوّن تفاعلي من غير role:', 'An interactive component without a role:'), [['مش متاح لقارئ الشاشة', 'inaccessible to screen readers'], ['تمام', 'fine'], ['أسرع', 'faster']], 0, B('a11y.', 'A11y.'))
      ] }
  ]
};
