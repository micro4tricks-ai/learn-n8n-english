// JavaScript week 32 — an introduction to React and the month 8 project.
// JSX needs a build step, so React code is shown (lang: 'jsx'); the html preview runs React from a CDN with htm.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const H = { run: 'html' };
const X = { lang: 'jsx' };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('مقدمة React ومشروع الشهر', 'An introduction to React and the month project'),
  goal: B('تفهم React من الأفكار اللي بنيتها بنفسك الأسبوع اللي فات: مكوّنات دوال وJSX وprops، الـ state والأحداث، الـ effects وجلب البيانات، الفورمز وuseReducer وcontext، وإمتى React يستاهل وإمتى لأ — وتسلّم مشروع الشهر التامن.',
          'Understand React through the ideas you built yourself last week: function components, JSX and props, state and events, effects and data fetching, forms, useReducer and context, and when React is worth it and when not — and deliver the eighth month’s project.'),
  days: [
    { title: B('مكوّنات وJSX', 'Components and JSX'),
      goal: B('تكتب أول مكوّنات React وتشغّلها.', 'Write and run your first React components.'),
      learn: [
        L(B('React = state ← render', 'React = state → render'),
          B('**react** بياخد فكرة أسبوع 31 (الواجهة = دالة من الـ state) ويعملها بكفاءة: **function component** = دالة بترجع وصف للواجهة، وReact بيحدّث الـ DOM بأقل تغيير (**reconciliation**). **jsx** = HTML جوه JS (`<OrderCard order={o} />`) بيتحوّل لاستدعاءات دوال وقت البناء.', '**react** takes week 31’s idea (UI = a function of state) and makes it efficient: a **function component** = a function returning a description of the UI, and React updates the DOM with the fewest changes (**reconciliation**). **jsx** = HTML inside JS (`<OrderCard order={o} />`) compiled into function calls at build time.'),
          'function StatusBadge({ status }) {\n  const labels = { new: "🆕 New", paid: "💰 Paid", shipped: "🚚 Shipped" };\n  return <span className={`badge badge-${status}`}>{labels[status] ?? status}</span>;\n}\n\nfunction OrderCard({ order }) {\n  return (\n    <article className="card">\n      <h3>#{order.id} · {order.customer}</h3>       {/* text is escaped automatically */}\n      <p>{order.total.toFixed(2)} EGP <StatusBadge status={order.status} /></p>\n    </article>\n  );\n}', X),
        L(B('جرّبه من غير أدوات', 'Try it with no tools'),
          B('عشان تجرّب فورًا: React من CDN و`htm` (صيغة شبه JSX بتشتغل من غير بناء). ده للتعلم والنماذج السريعة؛ للمشاريع استخدم Vite (`npm create vite@latest -- --template react-ts`).', 'To try it at once: React from a CDN plus `htm` (a JSX-like syntax that needs no build). This is for learning and quick prototypes; for projects use Vite (`npm create vite@latest -- --template react-ts`).'),
          '<div id="root"></div>\n<script type="module">\n  import { createElement, useState } from "https://esm.sh/react@19";\n  import { createRoot } from "https://esm.sh/react-dom@19/client";\n  import htm from "https://esm.sh/htm@3";\n  const html = htm.bind(createElement);\n\n  function Counter({ label }) {\n    const [count, setCount] = useState(0);\n    return html`<p>${label}: <b>${count}</b> <button onClick=${() => setCount(c => c + 1)}>+1</button></p>`;\n  }\n  function App() {\n    return html`<div style=${{ fontFamily: "system-ui" }}><h3>Orders today</h3><${Counter} label="Paid" /><${Counter} label="Shipped" /></div>`;\n  }\n  createRoot(document.getElementById("root")).render(html`<${App} />`);\n</script>', H),
        L(B('props', 'Props'),
          B('**props** = المدخلات للمكوّن (زي attributes)، read-only. بتبعت أي حاجة: نصوص، أرقام، كائنات، دوال (callbacks)، وحتى مكوّنات (`children`). والمكوّن بيرجّع نفس الشكل لنفس الـ props — دالة نقية للواجهة.', '**props** = a component’s inputs (like attributes), read-only. You can pass anything: strings, numbers, objects, functions (callbacks), even components (`children`). And a component returns the same output for the same props — a pure function for UI.'),
          'function Panel({ title, children, onClose }) {\n  return (\n    <section className="panel" aria-labelledby="panel-title">\n      <header><h2 id="panel-title">{title}</h2><button onClick={onClose} aria-label="Close">×</button></header>\n      {children}\n    </section>\n  );\n}\n\n<Panel title="Late orders" onClose={() => setOpen(false)}>\n  {late.map(o => <OrderCard key={o.id} order={o} />)}\n</Panel>', X)
      ],
      practice: [
        B('شغّل مثال CDN وضيف عدّاد تالت.', 'Run the CDN example and add a third counter.'),
        B('اعمل مشروع Vite react-ts.', 'Create a Vite react-ts project.'),
        B('حوّل order-card بتاعك لمكوّن React.', 'Turn your order-card into a React component.'),
        B('اعمل Panel بـ children.', 'Build a Panel with children.')
      ],
      words: [
        W('react', 'مكتبة لبناء الواجهات من مكوّنات', 'a library for building UIs from components', 'The dashboard is built with React.'),
        W('jsx', 'صيغة HTML جوه JS', 'HTML-like syntax inside JS', 'JSX compiles to function calls.'),
        W('function component', 'مكوّن React كدالة', 'a React component written as a function', 'OrderCard is a function component.'),
        W('reconciliation', 'مقارنة الواجهة القديمة بالجديدة وتحديث الفرق', 'comparing old and new UI and updating the difference', 'Reconciliation updates one row only.'),
        W('children', 'المحتوى اللي بيتحط جوه المكوّن', 'the content placed inside a component', 'Panel renders its children.'),
        W('htm', 'صيغة شبه JSX من غير بناء', 'JSX-like syntax with no build step', 'htm is handy for quick demos.')
      ],
      read: [{ lib: 'React: Learn', what: B('اقرا Quick Start وYour First Component.', 'Read Quick Start and Your First Component.') }],
      challenge: B('اعمل مشروع Vite react-ts فيه مكوّنات OrderCard وStatusBadge وPanel وقايمة من مصفوفة ثابتة — بأنواع TypeScript للـ props.', 'Create a Vite react-ts project with OrderCard, StatusBadge, Panel and a list from a fixed array — with TypeScript types for the props.'),
      quiz: [
        Q(B('مكوّن React:', 'A React component:'), [['دالة بترجع واجهة', 'a function returning UI'], ['ملف CSS', 'a CSS file'], ['كلاس لازم', 'a required class']], 0, B('function component.', 'A function component.')),
        Q(B('{order.customer} في JSX:', '{order.customer} in JSX:'), [['بيتهرب تلقائي', 'escaped automatically'], ['HTML خام', 'raw HTML'], ['خطأ', 'an error']], 0, B('أمان.', 'Safety.')),
        Q(B('props:', 'Props:'), [['مدخلات read-only', 'read-only inputs'], ['state داخلي', 'internal state'], ['CSS', 'CSS']], 0, B('من الأب.', 'From the parent.'))
      ] },

    { title: B('الـ state والأحداث', 'State and events'),
      goal: B('واجهة بتتغير مع المستخدم.', 'A UI that changes with the user.'),
      learn: [
        L(B('useState', 'useState'),
          B('**usestate** = state جوه المكوّن: `const [items, setItems] = useState([])`. استدعاء setItems بقيمة **جديدة** (immutable — زي الـ store) ← React يعيد رسم المكوّن. ولو التحديث بيعتمد على القديم: `setCount(c => c + 1)`. ده **hook**: دالة بتبدأ بـ use وبتتنادى في أول المكوّن بس.', '**usestate** = state inside a component: `const [items, setItems] = useState([])`. Calling setItems with a **new** value (immutable — like the store) → React re-renders the component. When the update depends on the old value: `setCount(c => c + 1)`. This is a **hook**: a function starting with use, called only at the top of a component.'),
          'function Cart() {\n  const [items, setItems] = useState([]);\n  const total = items.reduce((s, i) => s + i.price * i.qty, 0);       // derived, not stored\n  const add = p => setItems(list => {\n    const found = list.find(i => i.sku === p.sku);\n    return found ? list.map(i => (i.sku === p.sku ? { ...i, qty: i.qty + 1 } : i)) : [...list, { ...p, qty: 1 }];\n  });\n  return (\n    <>\n      <button onClick={() => add({ sku: "A1", name: "Notebook", price: 45 })}>Add notebook</button>\n      <ul>{items.map(i => <li key={i.sku}>{i.name} × {i.qty}</li>)}</ul>\n      <p>Total: {total.toFixed(2)} EGP</p>\n    </>\n  );\n}', X),
        L(B('controlled inputs', 'Controlled inputs'),
          B('**controlled input**: قيمة الخانة من الـ state (`value={q}`) وكل تغيير بيحدّثها (`onChange`). كده الـ state هو مصدر الحقيقة — تقدر تنضّف أو تتحقق أو تفلتر وانت بتكتب. وكل عنصر في قايمة محتاج **key prop** ثابت (id مش index) عشان React يعرف مين اتحرك.', 'A **controlled input**: the field’s value comes from state (`value={q}`) and each change updates it (`onChange`). The state is the source of truth — you can clean, validate or filter while typing. And every list item needs a stable **key prop** (an id, not the index) so React knows what moved.'),
          'function OrderSearch({ orders }) {\n  const [q, setQ] = useState("");\n  const norm = s => s.normalize("NFC").replace(/[إأآ]/g, "ا").toLowerCase();\n  const visible = orders.filter(o => norm(o.customer).includes(norm(q.trim())));\n  return (\n    <>\n      <label>Search <input value={q} onChange={e => setQ(e.target.value)} /></label>\n      <p role="status">{visible.length} result(s)</p>\n      <ul>{visible.map(o => <li key={o.id}>{o.customer}</li>)}</ul>\n    </>\n  );\n}', X),
        L(B('رفع الـ state لفوق', 'Lifting state up'),
          B('لو مكوّنين أخوات محتاجين نفس الـ state (الفلتر والقايمة): **lifting state up** — حط الـ state في أقرب أب مشترك، وابعته كـ props، وابعت دوال التغيير كـ callbacks. ده نفس unidirectional data flow: البيانات بتنزل والأحداث بتطلع.', 'If two sibling components need the same state (the filter and the list): **lifting state up** — put the state in the nearest common parent, pass it down as props, and pass change functions as callbacks. It is the same unidirectional data flow: data down, events up.'),
          'function OrdersPage({ orders }) {\n  const [status, setStatus] = useState("all");                     // lifted to the parent\n  const visible = status === "all" ? orders : orders.filter(o => o.status === status);\n  return (\n    <>\n      <StatusFilter value={status} onChange={setStatus} />          {/* events up */}\n      <OrderList orders={visible} />                                {/* data down */}\n    </>\n  );\n}', X)
      ],
      practice: [
        B('اعمل سلة بـ useState وإجمالي derived.', 'Build a cart with useState and a derived total.'),
        B('اعمل بحث controlled بتطبيع عربي.', 'Build a controlled search with Arabic normalisation.'),
        B('استخدم index كـ key وشوف المشكلة لما ترتّب.', 'Use the index as key and see the problem when sorting.'),
        B('ارفع state الفلتر لأب مشترك.', 'Lift the filter state to a common parent.')
      ],
      words: [
        W('usestate', 'hook لـ state جوه المكوّن', 'a hook for state inside a component', 'useState holds the cart items.'),
        W('hook', 'دالة use… بتضيف قدرة للمكوّن', 'a use… function adding a capability to a component', 'Call hooks at the top level only.'),
        W('controlled input', 'خانة قيمتها من الـ state', 'an input whose value comes from state', 'The search box is a controlled input.'),
        W('key prop', 'معرّف ثابت لكل عنصر في قايمة', 'a stable identifier for each list item', 'Use the order id as the key prop.'),
        W('lifting state up', 'نقل الـ state لأقرب أب مشترك', 'moving state to the nearest common parent', 'Lifting state up shares the filter.')
      ],
      read: [{ lib: 'React: Learn', what: B('اقرا State: A Component’s Memory وSharing State Between Components.', 'Read State: A Component’s Memory and Sharing State Between Components.') }],
      challenge: B('اعمل صفحة طلبات React: بحث controlled بتطبيع عربي، فلتر حالة، ترتيب، وسلة — الـ state مرفوع صح، وكل قايمة بـ key ثابت، وكل الإجماليات derived.', 'Build a React orders page: a controlled search with Arabic normalisation, a status filter, sorting and a cart — state lifted correctly, every list with stable keys, and every total derived.'),
      quiz: [
        Q(B('setCount(count + 1) مرتين في نفس الحدث:', 'setCount(count + 1) twice in one event:'), [['بيزوّد 1 بس', 'adds only 1'], ['بيزوّد 2', 'adds 2'], ['خطأ', 'an error']], 0, B('استخدم c => c + 1.', 'Use c => c + 1.')),
        Q(B('key لعناصر قايمة:', 'The key for list items:'), [['id ثابت', 'a stable id'], ['index', 'the index'], ['Math.random()', 'Math.random()']], 0, B('هوية.', 'Identity.')),
        Q(B('أختين محتاجين نفس الـ state:', 'Two siblings need the same state:'), ['lifting state up', B('نسختين', 'two copies'), 'localStorage'], 0, B('أب مشترك.', 'A common parent.'))
      ] },

    { title: B('الـ effects وجلب البيانات', 'Effects and fetching data'),
      goal: B('تجيب بيانات من API بأمان من غير سباقات.', 'Fetch API data safely without races.'),
      learn: [
        L(B('useEffect', 'useEffect'),
          B('**useeffect** = كود بيشتغل **بعد** الرسم للتعامل مع العالم الخارجي: fetch، اشتراك، timer. الـ **dependency array** بيحدد إمتى يتعاد (`[id]` = لما id يتغير). و**cleanup function** اللي بترجّعها بتلغي اللي فات (AbortController من أسبوع 13!) — عشان رد قديم ميكتبش فوق جديد.', '**useeffect** = code running **after** render to deal with the outside world: fetch, a subscription, a timer. The **dependency array** says when to re-run (`[id]` = when id changes). The **cleanup function** you return cancels the previous run (AbortController from week 13!) — so an old reply never overwrites a new one.'),
          'function OrderDetails({ id }) {\n  const [state, setState] = useState({ status: "loading" });\n  useEffect(() => {\n    const ctrl = new AbortController();\n    setState({ status: "loading" });\n    fetch(`/api/orders/${id}`, { signal: ctrl.signal })\n      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))\n      .then(order => setState({ status: "done", order }))\n      .catch(e => { if (e.name !== "AbortError") setState({ status: "error", error: e.message }); });\n    return () => ctrl.abort();                       // cleanup: the id changed or the component left\n  }, [id]);\n\n  if (state.status === "loading") return <p role="status">Loading…</p>;\n  if (state.status === "error") return <p role="alert">Could not load: {state.error}</p>;\n  return <OrderCard order={state.order} />;\n}', X),
        L(B('custom hook', 'A custom hook'),
          B('**custom hook** = دالة `use…` بتجمع state وeffects لإعادة الاستخدام: `useFetch(url)` بترجّع `{ data, error, loading }`. الكود بيبقى أنضف بكتير. وفي الشغل الحقيقي: مكتبة زي TanStack Query بتضيف كاش وretry وتحديث في الخلفية.', 'A **custom hook** = a `use…` function bundling state and effects for reuse: `useFetch(url)` returns `{ data, error, loading }`. The code becomes much cleaner. In real work a library such as TanStack Query adds caching, retries and background refresh.'),
          'function useFetch(url) {\n  const [state, setState] = useState({ loading: true, data: null, error: null });\n  useEffect(() => {\n    const ctrl = new AbortController();\n    setState(s => ({ ...s, loading: true }));\n    fetch(url, { signal: ctrl.signal })\n      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))\n      .then(data => setState({ loading: false, data, error: null }))\n      .catch(e => e.name !== "AbortError" && setState({ loading: false, data: null, error: e }));\n    return () => ctrl.abort();\n  }, [url]);\n  return state;\n}\n\nconst { data, loading, error } = useFetch("https://dummyjson.com/products?limit=10");', X),
        L(B('متستخدمش effect لكل حاجة', 'Do not use an effect for everything'),
          B('أشهر غلطة: effect بيحسب قيمة من state أو props ويخزنها في state تاني — دي derived state، احسبها في الرسم! الـ effects للعالم الخارجي بس (شبكة، DOM مباشر، timers). و**strict mode react** في التطوير بيشغّل الـ effect مرتين عمدًا عشان يكشف الـ cleanup الناقص.', 'The most common mistake: an effect computing a value from state or props and storing it in another state — that is derived state, compute it during render! Effects are only for the outside world (network, direct DOM, timers). And **strict mode react** in development runs effects twice on purpose to expose missing cleanup.'),
          '// ✗ an effect for derived data (extra render, can go stale)\nconst [total, setTotal] = useState(0);\nuseEffect(() => setTotal(items.reduce((s, i) => s + i.price * i.qty, 0)), [items]);\n\n// ✓ compute during render\nconst total = items.reduce((s, i) => s + i.price * i.qty, 0);\n\n// ✓ an effect for the outside world, with cleanup\nuseEffect(() => {\n  const t = setInterval(refreshOrders, 30_000);\n  return () => clearInterval(t);\n}, []);', X)
      ],
      practice: [
        B('اجلب طلب بـ useEffect وAbortController.', 'Fetch an order with useEffect and AbortController.'),
        B('اكتب useFetch واستخدمه في مكانين.', 'Write useFetch and use it in two places.'),
        B('دوّر على effect بيحسب derived واحذفه.', 'Find an effect computing derived data and remove it.'),
        B('شوف StrictMode بيشغّل الـ effect مرتين.', 'See StrictMode run an effect twice.')
      ],
      words: [
        W('useeffect', 'hook لكود بيتعامل مع العالم الخارجي بعد الرسم', 'a hook for outside-world code after render', 'useEffect fetches the order.'),
        W('dependency array', 'قايمة بتحدد إمتى الـ effect يتعاد', 'the list deciding when an effect re-runs', 'Put id in the dependency array.'),
        W('cleanup function', 'دالة بتلغي الـ effect القديم', 'a function undoing the previous effect', 'The cleanup function aborts the fetch.'),
        W('custom hook', 'دالة use… بتعيد استخدام منطق', 'a use… function reusing logic', 'useFetch is a custom hook.'),
        W('strict mode react', 'وضع تطوير بيكشف الأخطاء', 'a development mode exposing mistakes', 'Strict mode React runs effects twice.')
      ],
      read: [{ lib: 'React: Learn', what: B('اقرا Synchronizing with Effects وYou Might Not Need an Effect.', 'Read Synchronizing with Effects and You Might Not Need an Effect.') }],
      challenge: B('اعمل صفحة منتجات React من DummyJSON: useFetch بإلغاء، loading وerror متاحين، بحث بيغيّر الرابط (مع debounce)، وصفحات — ومفيش ولا effect بيحسب derived.', 'Build a React products page from DummyJSON: a cancelling useFetch, accessible loading and error states, search changing the URL (with debounce), and pagination — with no effect computing derived data.'),
      quiz: [
        Q(B('[id] في useEffect:', '[id] in useEffect:'), [['يتعاد لما id يتغير', 're-runs when id changes'], ['مرة واحدة', 'once'], ['كل render', 'every render']], 0, B('dependencies.', 'Dependencies.')),
        Q(B('الإجمالي من items:', 'The total from items:'), [['يتحسب في الرسم', 'computed during render'], ['effect + state', 'an effect + state'], ['localStorage', 'localStorage']], 0, B('derived.', 'Derived.')),
        Q(B('رد قديم كتب فوق جديد:', 'An old reply overwrote a new one:'), [['cleanup بـ abort', 'cleanup with abort'], ['setTimeout', 'setTimeout'], ['key', 'key']], 0, B('سباق.', 'A race.'))
      ] },

    { title: B('الفورمز وuseReducer وcontext', 'Forms, useReducer and context'),
      goal: B('تدير state معقد ومشترك بنظام.', 'Manage complex and shared state in an orderly way.'),
      learn: [
        L(B('useReducer', 'useReducer'),
          B('لما الـ state يكبر (سلة بإضافة وحذف وكمية وخصم): **usereducer** = نفس فكرة الـ actions من أسبوع 31: `reducer(state, action)` بيرجّع state جديد، و`dispatch({ type: "add", item })`. كل التغييرات في مكان واحد وسهلة الاختبار (دالة نقية).', 'When state grows (a cart with add, remove, quantity and discount): **usereducer** = week 31’s actions idea: `reducer(state, action)` returns new state, and `dispatch({ type: "add", item })`. All changes in one place and easy to test (a pure function).'),
          'function cartReducer(state, action) {\n  switch (action.type) {\n    case "add": {\n      const found = state.items.find(i => i.sku === action.item.sku);\n      const items = found ? state.items.map(i => (i.sku === action.item.sku ? { ...i, qty: i.qty + 1 } : i)) : [...state.items, { ...action.item, qty: 1 }];\n      return { ...state, items };\n    }\n    case "setQty": return { ...state, items: state.items.map(i => (i.sku === action.sku ? { ...i, qty: action.qty } : i)).filter(i => i.qty > 0) };\n    case "coupon": return { ...state, coupon: action.code };\n    case "clear": return { items: [], coupon: null };\n    default: throw new Error(`unknown action ${action.type}`);\n  }\n}\nconst [cart, dispatch] = useReducer(cartReducer, { items: [], coupon: null });\n<button onClick={() => dispatch({ type: "add", item: product })}>Add</button>', X),
        L(B('context', 'Context'),
          B('**usecontext**: بيانات محتاجها أجزاء كتير بعيدة (المستخدم الحالي، الثيم، السلة) من غير ما تعدّيها props في 6 مستويات. Provider في أعلى الشجرة، و`useContext(CartContext)` في أي مكان تحته. متحطش كل حاجة في context — بس اللي فعلًا مشترك.', '**usecontext**: data many distant parts need (the current user, the theme, the cart) without passing props through 6 levels. A Provider high in the tree, and `useContext(CartContext)` anywhere below it. Do not put everything in context — only what is truly shared.'),
          'const CartContext = createContext(null);\n\nfunction CartProvider({ children }) {\n  const [cart, dispatch] = useReducer(cartReducer, { items: [], coupon: null });\n  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;\n}\nfunction useCart() {\n  const ctx = useContext(CartContext);\n  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");\n  return ctx;\n}\nfunction HeaderBadge() {\n  const { cart } = useCart();\n  return <span aria-label={`${cart.items.length} items in cart`}>🛒 {cart.items.length}</span>;\n}', X),
        L(B('فورم كامل', 'A complete form'),
          B('فورم React الكويس: state للقيم، تحقق (Zod من أسبوع 18 — نفس الـ schema في السيرفر!)، أخطاء تحت كل خانة بـ aria-describedby، الزرار معطّل أثناء الإرسال، وحالات sending/success/error. ومكتبات زي React Hook Form بتسهّل الفورمز الكبيرة.', 'A good React form: state for values, validation (Zod from week 18 — the same schema as the server!), errors under each field with aria-describedby, the button disabled while sending, and sending/success/error states. Libraries such as React Hook Form ease large forms.'),
          'function OrderForm() {\n  const [values, setValues] = useState({ customer: "", phone: "" });\n  const [errors, setErrors] = useState({});\n  const [status, setStatus] = useState("idle");\n  const set = k => e => setValues(v => ({ ...v, [k]: e.target.value }));\n  async function submit(e) {\n    e.preventDefault();\n    const parsed = OrderIn.safeParse(values);                       // the same Zod schema as the server\n    if (!parsed.success) return setErrors(z.flattenError(parsed.error).fieldErrors);\n    setErrors({}); setStatus("sending");\n    const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });\n    setStatus(res.ok ? "success" : "error");\n  }\n  return (\n    <form onSubmit={submit} noValidate>\n      <label>Name <input value={values.customer} onChange={set("customer")} aria-invalid={!!errors.customer} aria-describedby="e-customer" /></label>\n      <p id="e-customer" role="alert">{errors.customer?.[0]}</p>\n      <label>Phone <input value={values.phone} onChange={set("phone")} inputMode="tel" aria-describedby="e-phone" /></label>\n      <p id="e-phone" role="alert">{errors.phone?.[0]}</p>\n      <button disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send order"}</button>\n      <p role="status">{status === "success" ? "✓ Order received" : status === "error" ? "Something went wrong" : ""}</p>\n    </form>\n  );\n}', X)
      ],
      practice: [
        B('حوّل السلة لـ useReducer واختبر الـ reducer.', 'Convert the cart to useReducer and test the reducer.'),
        B('اعمل CartProvider وuseCart.', 'Build a CartProvider and useCart.'),
        B('اعمل فورم بنفس schema Zod بتاع السيرفر.', 'Build a form using the server’s Zod schema.'),
        B('ضيف aria-describedby للأخطاء.', 'Add aria-describedby for errors.')
      ],
      words: [
        W('usereducer', 'hook لـ state معقد بـ actions', 'a hook for complex state with actions', 'useReducer manages the cart.'),
        W('reducer', 'دالة (state, action) ← state جديد', 'a function (state, action) → new state', 'Test the reducer without React.'),
        W('dispatch', 'إرسال action للـ reducer', 'sending an action to the reducer', 'dispatch({ type: "clear" }).'),
        W('usecontext', 'قراءة بيانات مشتركة من Provider', 'reading shared data from a Provider', 'useContext reads the cart.'),
        W('provider', 'مكوّن بيوفّر context لشجرته', 'a component supplying context to its tree', 'Wrap the app in CartProvider.')
      ],
      read: [{ lib: 'React: Learn', what: B('اقرا Extracting State Logic into a Reducer وPassing Data Deeply with Context.', 'Read Extracting State Logic into a Reducer and Passing Data Deeply with Context.') }],
      challenge: B('اعمل متجر React صغير: CartProvider بـ useReducer (مختبر بـ node:test)، هيدر بعدد، صفحة منتجات (useFetch)، وفورم طلب بـ Zod وa11y بيبعت لـ webhook n8n.', 'Build a small React shop: a CartProvider with useReducer (tested with node:test), a header count, a products page (useFetch), and an order form with Zod and a11y posting to an n8n webhook.'),
      quiz: [
        Q(B('reducer لازم يكون:', 'A reducer must be:'), [['دالة نقية بترجّع state جديد', 'a pure function returning new state'], ['async', 'async'], ['بيعمل fetch', 'doing fetch']], 0, B('قابل للاختبار.', 'Testable.')),
        Q(B('المستخدم الحالي في 10 مكوّنات:', 'The current user in 10 components:'), ['context', B('props في كل مستوى', 'props at every level'), 'global variable'], 0, B('Provider.', 'A Provider.')),
        Q(B('نفس التحقق في الفورم والسيرفر:', 'The same validation in the form and server:'), [['schema Zod مشترك', 'a shared Zod schema'], ['تكتبه مرتين', 'write it twice'], ['السيرفر بس', 'only the server']], 0, B('مصدر واحد.', 'One source.'))
      ] },

    { title: B('React في الصورة الكبيرة', 'React in the bigger picture'),
      goal: B('تعرف إمتى تستخدم React وإزاي تختبره وتنشره.', 'Know when to use React and how to test and ship it.'),
      learn: [
        L(B('إمتى React؟', 'When React?'),
          B('React ممتاز لواجهات تفاعلية كبيرة بـ state كتير (لوحات تحكم، أدوات داخلية). لصفحة بسيطة أو landing: HTML وشوية JS أو Web Components أسرع وأخف. والـ **virtual dom** مش «أسرع من DOM» — هو طريقة مريحة؛ الكود اليدوي الكويس أسرع منه.', 'React is excellent for large interactive UIs with lots of state (dashboards, internal tools). For a simple page or a landing page: HTML and a little JS or Web Components are faster and lighter. And the **virtual dom** is not «faster than the DOM» — it is a convenient approach; good hand-written code beats it.'),
          'landing page, docs, a form            → HTML + a little JS (this site!)\nreusable widgets for any page         → Web Components\ndashboard / internal tool, much state → React (Vite)\nSEO-heavy app with many pages         → a meta-framework (Next.js, React Router)', T),
        L(B('الاختبار', 'Testing'),
          B('**react testing library**: بتختبر المكوّن زي المستخدم — تدوّر بالـ role والاسم (`getByRole("button", { name: "Add" })`)، تضغط، وتتأكد من اللي ظاهر. نفس فلسفة Playwright locators (أسبوع 23). ومع Vitest وjsdom.', '**react testing library**: test a component like a user — find by role and name (`getByRole("button", { name: "Add" })`), click, and check what is shown. The same philosophy as Playwright locators (week 23). With Vitest and jsdom.'),
          'import { render, screen } from "@testing-library/react";\nimport userEvent from "@testing-library/user-event";\nimport { it, expect } from "vitest";\nimport { Cart } from "./Cart";\n\nit("adds an item and shows the total", async () => {\n  render(<Cart />);\n  await userEvent.click(screen.getByRole("button", { name: "Add notebook" }));\n  await userEvent.click(screen.getByRole("button", { name: "Add notebook" }));\n  expect(screen.getByText("Notebook × 2")).toBeInTheDocument();\n  expect(screen.getByText(/Total: 90.00 EGP/)).toBeInTheDocument();\n});', X),
        L(B('الأداء والنشر', 'Performance and shipping'),
          B('ابدأ من غير تحسينات؛ لو قِست بطء: **memo** وuseMemo للحسابات التقيلة، keys صح، وتقسيم الصفحات (lazy). `npm run build` بيطلّع dist ثابتة — تتنشر على GitHub Pages أو Cloudflare. والـ **meta-framework** زي Next.js بيضيف routing ورندر على السيرفر (**hydration**) لما تحتاج SEO أو صفحات كتير.', 'Start without optimisations; if you measure slowness: **memo** and useMemo for heavy computations, correct keys, and splitting pages (lazy). `npm run build` produces a static dist — deploy it on GitHub Pages or Cloudflare. A **meta-framework** such as Next.js adds routing and server rendering (**hydration**) when you need SEO or many pages.'),
          'const ProductRow = memo(function ProductRow({ product, onAdd }) {     // re-renders only when props change\n  return <li>{product.name} <button onClick={() => onAdd(product)}>Add</button></li>;\n});\n\nconst sorted = useMemo(() => [...products].sort(byPrice), [products]);   // only when products change\nconst Reports = lazy(() => import("./Reports"));                       // a separate chunk\n\n// npm run build → dist/ → GitHub Pages / Cloudflare Pages', X)
      ],
      practice: [
        B('اكتب جدول: 5 مشاريع عندك ← أنهي أداة.', 'Write a table: 5 of your projects → which tool.'),
        B('اكتب 3 اختبارات Testing Library.', 'Write 3 Testing Library tests.'),
        B('قِس render بطيء بـ React DevTools Profiler.', 'Measure a slow render with the React DevTools Profiler.'),
        B('انشر مشروع Vite React على GitHub Pages.', 'Deploy a Vite React project to GitHub Pages.')
      ],
      words: [
        W('virtual dom', 'وصف للواجهة في الذاكرة بيتقارن', 'an in-memory description of the UI that gets compared', 'The virtual DOM is a convenience, not magic.'),
        W('react testing library', 'مكتبة اختبار المكوّنات زي المستخدم', 'a library testing components like a user', 'React Testing Library finds by role.'),
        W('memo', 'منع إعادة رسم مكوّن لو props متغيرتش', 'skipping a re-render when props are unchanged', 'memo stopped 500 row renders.'),
        W('meta-framework', 'إطار فوق React بـ routing وسيرفر', 'a framework over React with routing and a server', 'Next.js is a meta-framework.'),
        W('hydration', 'تفعيل HTML جاي من السيرفر في المتصفح', 'activating server-rendered HTML in the browser', 'Hydration attaches the event handlers.')
      ],
      read: [{ t: 'Testing Library: React', url: 'https://testing-library.com/docs/react-testing-library/intro/', what: B('اقرا The problem وThis solution.', 'Read The problem and This solution.') }, { t: 'Vite: Deploying a static site', url: 'https://vite.dev/guide/static-deploy', what: B('اقرا GitHub Pages.', 'Read GitHub Pages.') }],
      challenge: B('خد المتجر الصغير: 8 اختبارات Testing Library، Profiler وتحسين واحد مقاس، lazy لصفحة التقارير، ونشر على GitHub Pages — واكتب ليه React مناسب (أو لأ) للمشروع ده.', 'Take the small shop: 8 Testing Library tests, the Profiler and one measured optimisation, lazy for the reports page, and deployment to GitHub Pages — and write why React suits (or does not suit) this project.'),
      quiz: [
        Q(B('landing page بسيطة:', 'A simple landing page:'), [['HTML وشوية JS', 'HTML and a little JS'], ['React لازم', 'React is required'], ['Next.js', 'Next.js']], 0, B('أخف.', 'Lighter.')),
        Q(B('Testing Library بتدوّر بـ:', 'Testing Library finds by:'), [['role والاسم', 'role and name'], ['CSS class', 'CSS class'], ['index', 'index']], 0, B('زي المستخدم.', 'Like a user.')),
        Q(B('memo من أول يوم في كل مكوّن:', 'memo on every component from day one:'), [['لأ؛ قِس الأول', 'no; measure first'], ['أيوه', 'yes'], ['إجباري', 'required']], 0, B('optimise later.', 'Optimise later.'))
      ] },

    { title: B('مراجعة الشهر التامن ومشروعه', 'Month 8 review and project'),
      goal: B('واجهة إنتاج حديثة وسريعة ومتاحة.', 'A modern, fast and accessible production UI.'),
      review: [
        B('CSS المتقدم: tokens وlayers و:has() وcontainer queries والحركة والطباعة (أسبوع 29).', 'Advanced CSS: tokens, layers, :has(), container queries, motion and print (week 29).'),
        B('إمكانية الوصول والأداء: الأسماء والتركيز وCore Web Vitals والصور (أسبوع 30).', 'Accessibility and performance: names, focus, Core Web Vitals and images (week 30).'),
        B('مكوّنات من غير framework: store وWeb Components والأحداث (أسبوع 31).', 'Components without a framework: a store, Web Components and events (week 31).'),
        B('React: مكوّنات وprops وuseState وkeys ورفع الـ state.', 'React: components, props, useState, keys and lifting state.'),
        B('useEffect بإلغاء، custom hooks، useReducer، context، الفورمز، الاختبار والنشر.', 'useEffect with cancellation, custom hooks, useReducer, context, forms, testing and deployment.')
      ],
      project: B('مشروع الشهر التامن «لوحة عمليات المتجر» بـ React + TS (Vite): tokens وثيم فاتح/غامق وcontainer queries؛ صفحات الطلبات (بحث وفلتر وترتيب)، تفاصيل طلب (useFetch بإلغاء)، سلة (useReducer + context)، وفورم طلب (Zod مشترك مع السيرفر) بيبعت لبوابة الطلبات (شهر 7)؛ a11y كامل (axe صفر serious)؛ Lighthouse ≥ 90؛ 10 اختبارات Testing Library؛ نشر على GitHub Pages — وصفحة واحدة مبنية بـ Web Components للمقارنة.', 'Month 8 project «shop operations dashboard» in React + TS (Vite): tokens, a light/dark theme and container queries; orders pages (search, filter, sort), order details (a cancelling useFetch), a cart (useReducer + context), and an order form (Zod shared with the server) posting to the orders gateway (month 7); full a11y (zero serious axe issues); Lighthouse ≥ 90; 10 Testing Library tests; deployment to GitHub Pages — plus one page built with Web Components for comparison.'),
      test: [
        Q(B('JSX بيتحوّل لـ:', 'JSX becomes:'), [['استدعاءات دوال', 'function calls'], ['HTML ثابت', 'static HTML'], ['CSS', 'CSS']], 0, B('وقت البناء.', 'At build time.')),
        Q(B('props بتتغير جوه المكوّن؟', 'Are props changed inside the component?'), [['لأ؛ read-only', 'no; read-only'], ['أيوه', 'yes'], ['ساعات', 'sometimes']], 0, B('من الأب.', 'From the parent.')),
        Q(B('useState بيرجّع:', 'useState returns:'), ['[value, setValue]', '{ value }', 'value'], 0, B('مصفوفة.', 'An array.')),
        Q(B('تعديل array في الـ state:', 'Changing an array in state:'), [['نسخة جديدة', 'a new copy'], ['push', 'push'], ['splice', 'splice']], 0, B('immutable.', 'Immutable.')),
        Q(B('خانة قيمتها من الـ state:', 'An input whose value comes from state:'), ['controlled input', 'uncontrolled', 'readonly'], 0, B('مصدر الحقيقة.', 'The source of truth.')),
        Q(B('index كـ key مع ترتيب:', 'Index as key with sorting:'), [['bugs في الحالة', 'state bugs'], ['أسرع', 'faster'], ['أحسن', 'better']], 0, B('id ثابت.', 'A stable id.')),
        Q(B('fetch جوه useEffect محتاج:', 'A fetch inside useEffect needs:'), [['cleanup بـ abort', 'cleanup with abort'], ['setInterval', 'setInterval'], ['memo', 'memo']], 0, B('سباقات.', 'Races.')),
        Q(B('effect بيحسب الإجمالي:', 'An effect computing the total:'), [['غلط؛ احسبه في الرسم', 'wrong; compute it during render'], ['صح', 'right'], ['إجباري', 'required']], 0, B('derived.', 'Derived.')),
        Q(B('useFetch:', 'useFetch:'), ['custom hook', 'component', 'reducer'], 0, B('use….', 'use….')),
        Q(B('سلة بعمليات كتير:', 'A cart with many operations:'), ['useReducer', B('10 useState', '10 useState calls'), 'useRef'], 0, B('مكان واحد.', 'One place.')),
        Q(B('بيانات لـ 10 مكوّنات بعيدة:', 'Data for 10 distant components:'), ['context', 'props drilling', 'cookies'], 0, B('Provider.', 'A Provider.')),
        Q(B('اختبار مكوّن React:', 'Testing a React component:'), [['Testing Library بالـ role', 'Testing Library by role'], ['snapshot بس', 'only snapshots'], ['يدوي', 'by hand']], 0, B('زي المستخدم.', 'Like a user.'))
      ] }
  ]
};
