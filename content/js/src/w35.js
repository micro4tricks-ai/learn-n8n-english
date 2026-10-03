// JavaScript week 35 — real time: WebSockets and SSE.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الوقت الحقيقي: WebSockets وSSE', 'Real time: WebSockets and SSE'),
  goal: B('تبعت تحديثات لحظية للوحات التحكم والفرق: تختار بين polling وSSE وWebSockets والـ webhooks، تبني SSE بإعادة اتصال، وWebSockets بنبض وغرف، وتكبّر على أكتر من سيرفر — وتوصّل n8n بلوحة حية.',
          'Push live updates to dashboards and teams: choose between polling, SSE, WebSockets and webhooks, build SSE with reconnection and WebSockets with heartbeats and rooms, scale across several servers — and connect n8n to a live board.'),
  days: [
    { title: B('اختيار الطريقة', 'Choosing the approach'),
      goal: B('تعرف أنهي طريقة لأنهي موقف.', 'Know which approach fits which situation.'),
      learn: [
        L(B('الخيارات', 'The options'),
          B('**real time** مش دايمًا WebSocket: **polling** (اسأل كل 30 ثانية — أبسط حاجة وكفاية لكتير)، **long polling** (اسأل والسيرفر يمسك الطلب لحد ما يحصل جديد)، **server-sent events** (السيرفر يبعت في اتجاه واحد على HTTP عادي)، **websocket** (اتجاهين). والـ webhooks بين سيرفرات مش متصفحات.', '**real time** is not always WebSocket: **polling** (ask every 30 seconds — simplest and often enough), **long polling** (ask and the server holds the request until something new happens), **server-sent events** (the server pushes one way over plain HTTP), **websocket** (both ways). And webhooks are for servers, not browsers.'),
          'dashboard numbers every minute          → polling (fetch + setInterval)\nlive order feed, job progress, alerts   → SSE (one way, auto-reconnect, plain HTTP)\nchat, collaborative editing, games      → WebSocket (two-way, low latency)\nshop → your server, n8n → your server   → webhooks (server to server)', T),
        L(B('long polling', 'Long polling'),
          B('الـ long polling: العميل يبعت «فيه جديد بعد رقم 5؟» والسيرفر **مبيردش** لحد ما يحصل جديد أو المهلة تخلص — وبعدين العميل يسأل تاني علطول. تحديث شبه فوري بـ HTTP عادي. المثال بيشغّل سيرفر وعميل حقيقيين:', 'Long polling: the client asks «anything new after #5?» and the server **does not reply** until something new happens or a timeout passes — then the client asks again at once. Near-instant updates over plain HTTP. The example runs a real server and client:'),
          'import { createServer } from "node:http";\nimport { EventEmitter } from "node:events";\nconst bus = new EventEmitter();\nconst events = [];\nconst server = createServer((req, res) => {\n  const after = Number(new URL(req.url, "http://x").searchParams.get("after") ?? 0);\n  const send = () => res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(events.filter(e => e.id > after)));\n  if (events.some(e => e.id > after)) return send();\n  const timer = setTimeout(send, 2000);                                   // reply empty after 2 s\n  bus.once("new", () => { clearTimeout(timer); send(); });                // or as soon as something happens\n}).listen(0);\nawait new Promise(r => server.once("listening", r));\nconst base = `http://localhost:${server.address().port}`;\n\nsetTimeout(() => { events.push({ id: 1, text: "order #1042 paid" }); bus.emit("new"); }, 300);\nsetTimeout(() => { events.push({ id: 2, text: "order #1043 shipped" }); bus.emit("new"); }, 700);\nlet last = 0, t0 = Date.now();\nwhile (last < 2) {\n  const batch = await (await fetch(`${base}/updates?after=${last}`)).json();\n  for (const e of batch) { console.log(`+${Math.round((Date.now() - t0) / 100) * 100} ms`, e.text); last = e.id; }\n}\nserver.close();', N()),
        L(B('polling ذكي', 'Smart polling'),
          B('لو اخترت polling: زوّد الفترة لما الصفحة مش ظاهرة (`document.visibilityState`)، ووقّف لما مفيش نت، واستخدم ETag (304 من غير جسم — أسبوع 24)، وbackoff لو السيرفر بيرد أخطاء. بالشكل ده polling بيبقى رخيص ومحترم.', 'If you choose polling: lengthen the interval when the page is hidden (`document.visibilityState`), stop when offline, use ETags (a 304 with no body — week 24), and back off when the server returns errors. Done this way, polling is cheap and polite.'),
          'let delay = 15_000, etag = null, timer;\nasync function poll() {\n  try {\n    const res = await fetch("/api/summary", { headers: etag ? { "If-None-Match": etag } : {} });\n    if (res.status === 200) { etag = res.headers.get("ETag"); render(await res.json()); }\n    delay = 15_000;                                          // healthy: normal pace\n  } catch {\n    delay = Math.min(delay * 2, 5 * 60_000);                 // failing: back off up to 5 min\n  }\n  const hidden = document.visibilityState === "hidden";\n  timer = setTimeout(poll, hidden ? delay * 4 : delay);\n}\ndocument.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { clearTimeout(timer); poll(); } });\npoll();', S)
      ],
      practice: [
        B('اكتب لكل جزء في لوحتك: polling ولا SSE ولا WS.', 'Decide for each part of your dashboard: polling, SSE or WS.'),
        B('شغّل مثال long polling وغيّر الأوقات.', 'Run the long-polling example and change the timings.'),
        B('اعمل polling بـ ETag وvisibility.', 'Build polling with ETag and visibility.'),
        B('قِس عدد الطلبات في ساعة لكل طريقة.', 'Count requests per hour for each approach.')
      ],
      words: [
        W('real time', 'تحديثات لحظة بلحظة', 'moment-by-moment updates', 'The board shows orders in real time.'),
        W('polling', 'السؤال الدوري عن الجديد', 'asking for news at regular intervals', 'Polling every minute is enough here.'),
        W('long polling', 'طلب بيستنى لحد ما يحصل جديد', 'a request held until something new happens', 'Long polling works over plain HTTP.'),
        W('server-sent events', 'السيرفر يبعت تحديثات في اتجاه واحد', 'the server pushing one-way updates', 'Server-sent events power the feed.'),
        W('websocket', 'اتصال مفتوح في الاتجاهين', 'an open two-way connection', 'Chat needs a WebSocket.')
      ],
      read: [{ t: 'MDN: Server-sent events', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events', what: B('اقرا المقدمة.', 'Read the introduction.') }, { lib: 'MDN: WebSockets API', what: B('اقرا المقدمة.', 'Read the introduction.') }],
      challenge: B('اكتب صفحة «اختيار الطريقة» لمشروعك: 5 أجزاء لحظية، الطريقة لكل جزء، وليه — والتكلفة (طلبات/اتصالات) لـ 100 مستخدم.', 'Write a «choosing the approach» page for your project: 5 live parts, the approach for each and why — with the cost (requests/connections) for 100 users.'),
      quiz: [
        Q(B('رقم المبيعات بيتحدث كل دقيقة:', 'A sales number updating every minute:'), ['polling', 'WebSocket', 'WebRTC'], 0, B('أبسط.', 'Simplest.')),
        Q(B('شات بين الفريق:', 'Team chat:'), ['WebSocket', B('polling كل ساعة', 'hourly polling'), 'email'], 0, B('اتجاهين.', 'Both ways.')),
        Q(B('n8n يبلّغ سيرفرك:', 'n8n notifies your server:'), ['webhook', 'SSE', B('polling من n8n', 'polling from n8n')], 0, B('سيرفر لسيرفر.', 'Server to server.'))
      ] },

    { title: B('Server-Sent Events', 'Server-Sent Events'),
      goal: B('تيار تحديثات من السيرفر بإعادة اتصال تلقائية.', 'A stream of server updates with automatic reconnection.'),
      learn: [
        L(B('السيرفر', 'The server'),
          B('SSE = رد HTTP بـ `Content-Type: **text/event-stream**` بيفضل مفتوح، والسيرفر يكتب رسايل `data: …\\n\\n`. كل رسالة ممكن يبقى ليها `id:` و`event:`. ومن غير مكتبات. المثال بيعمل سيرفر SSE ويقرا منه بـ fetch:', 'SSE = an HTTP reply with `Content-Type: **text/event-stream**` that stays open while the server writes messages `data: …\\n\\n`. Each message may have an `id:` and an `event:`. No libraries needed. The example runs an SSE server and reads it with fetch:'),
          'import { createServer } from "node:http";\nconst clients = new Set();\nconst server = createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });\n  res.write("retry: 3000\\n\\n");                              // reconnect after 3 s if dropped\n  clients.add(res);\n  req.on("close", () => clients.delete(res));\n}).listen(0);\nlet nextId = 1;\nfunction broadcast(event, data) {\n  const msg = `id: ${nextId++}\\nevent: ${event}\\ndata: ${JSON.stringify(data)}\\n\\n`;\n  for (const res of clients) res.write(msg);\n}\nawait new Promise(r => server.once("listening", r));\n\nconst res = await fetch(`http://localhost:${server.address().port}/events`);\nconst reader = res.body.pipeThrough(new TextDecoderStream()).getReader();\nsetTimeout(() => broadcast("order", { id: 1042, status: "paid" }), 50);\nsetTimeout(() => broadcast("order", { id: 1043, status: "shipped" }), 100);\nlet text = "";\nwhile ((text.match(/\\n\\n/g) ?? []).length < 3) text += (await reader.read()).value;\nconsole.log(text.trim().split("\\n\\n").slice(1).join("\\n---\\n"));\nawait reader.cancel();\nserver.close(); server.closeAllConnections();', N()),
        L(B('العميل: EventSource', 'The client: EventSource'),
          B('في المتصفح **eventsource** بيعمل كل الشغل: بيفتح الاتصال، بيقسم الرسايل، و**بيعيد الاتصال لوحده** لو اتقطع — وبيبعت `Last-Event-ID` عشان السيرفر يكمّل من آخر رسالة. انت بتسمع للأحداث وبس.', 'In the browser **eventsource** does all the work: opens the connection, splits messages, and **reconnects by itself** when dropped — sending `Last-Event-ID` so the server continues from the last message. You just listen for events.'),
          'const feed = new EventSource("/events", { withCredentials: true });   // cookies are sent: same-site sessions work\nfeed.addEventListener("order", e => {\n  const order = JSON.parse(e.data);\n  prependRow(order);                              // update the board\n  status.textContent = `Order #${order.id} ${order.status}`;   // a live region announces it\n});\nfeed.onopen = () => banner.hidden = true;\nfeed.onerror = () => banner.hidden = false;        // "reconnecting…" (EventSource retries itself)\n// later: feed.close();', S),
        L(B('Last-Event-ID', 'Last-Event-ID'),
          B('لو الاتصال وقع 10 ثواني، الرسايل اللي اتبعتت ساعتها ضاعت؟ لأ لو عملتها صح: خزّن آخر N حدث بأرقامها، ولما العميل يرجع بـ header `Last-Event-ID: 41`، ابعتله اللي بعد 41 الأول. ده بيخلّي SSE موثوق للوحات العمليات.', 'If the connection drops for 10 seconds, are the messages sent meanwhile lost? Not if done right: keep the last N events with their ids, and when the client returns with the `Last-Event-ID: 41` header, send what came after 41 first. This makes SSE reliable for operations boards.'),
          'const history = [];                                  // the last 500 events\nfunction publish(event, data) {\n  const e = { id: ++lastId, event, data };\n  history.push(e); if (history.length > 500) history.shift();\n  for (const res of clients) write(res, e);\n}\napp.get("/events", (req, res) => {\n  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });\n  const since = Number(req.headers["last-event-id"] ?? 0);\n  for (const e of history) if (e.id > since) write(res, e);      // catch up first\n  clients.add(res);\n  const ping = setInterval(() => res.write(": ping\\n\\n"), 25_000);   // a comment keeps proxies from closing it\n  req.on("close", () => { clients.delete(res); clearInterval(ping); });\n});', S)
      ],
      practice: [
        B('شغّل مثال SSE وضيف event تاني.', 'Run the SSE example and add another event.'),
        B('اعمل صفحة بـ EventSource بتعرض الطلبات.', 'Build a page with EventSource showing orders.'),
        B('اقفل السيرفر وشغّله وشوف إعادة الاتصال.', 'Stop and restart the server and watch it reconnect.'),
        B('ضيف history وLast-Event-ID.', 'Add history and Last-Event-ID.')
      ],
      words: [
        W('text/event-stream', 'نوع المحتوى بتاع SSE', 'the content type of SSE', 'Reply with text/event-stream.'),
        W('eventsource', 'واجهة المتصفح لاستقبال SSE', 'the browser API for receiving SSE', 'EventSource reconnects by itself.'),
        W('last-event-id', 'header بيقول آخر حدث وصل', 'a header naming the last event received', 'Resume after Last-Event-ID.'),
        W('reconnect', 'إعادة الاتصال بعد الانقطاع', 'connecting again after a drop', 'The client reconnects in 3 seconds.'),
        W('keep-alive comment', 'سطر تعليق بيمنع قفل الاتصال', 'a comment line preventing idle closes', 'Send a keep-alive comment every 25 s.')
      ],
      read: [{ t: 'MDN: Using server-sent events', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events', what: B('اقرا Event stream format.', 'Read Event stream format.') }, { t: 'HTML Standard: Server-sent events', url: 'https://html.spec.whatwg.org/multipage/server-sent-events.html', what: B('اقرا Parsing an event stream (اختياري).', 'Read Parsing an event stream (optional).') }],
      challenge: B('ضيف لـ «بوابة الطلبات» endpoint /events بـ SSE: أحداث order.created/updated، history آخر 500 وLast-Event-ID، ping كل 25 ثانية، وصفحة لوحة بـ EventSource ببانر «بيعيد الاتصال» وlive region.', 'Add an /events SSE endpoint to the «orders gateway»: order.created/updated events, a 500-event history with Last-Event-ID, a ping every 25 seconds, and a board page with EventSource, a «reconnecting» banner and a live region.'),
      quiz: [
        Q(B('SSE اتجاهه:', 'SSE’s direction:'), [['السيرفر ← المتصفح', 'server → browser'], ['الاتجاهين', 'both ways'], ['المتصفح ← السيرفر', 'browser → server']], 0, B('واحد.', 'One way.')),
        Q(B('إعادة الاتصال في EventSource:', 'Reconnection with EventSource:'), [['تلقائية', 'automatic'], ['يدوي لازم', 'must be manual'], ['مفيش', 'none']], 0, B('retry.', 'retry.')),
        Q(B('رسايل وقت الانقطاع:', 'Messages during a drop:'), [['history + Last-Event-ID', 'history + Last-Event-ID'], ['ضاعت', 'are lost'], ['تيجي بالإيميل', 'arrive by email']], 0, B('catch up.', 'Catch up.'))
      ] },

    { title: B('WebSockets', 'WebSockets'),
      goal: B('اتصال في الاتجاهين بنبض وإعادة اتصال.', 'A two-way connection with heartbeats and reconnection.'),
      learn: [
        L(B('السيرفر بـ ws', 'The server with ws'),
          B('WebSocket بيبدأ HTTP وبعدين بيتحوّل (upgrade) لاتصال مفتوح بيبعت رسايل في الاتجاهين. في Node: مكتبة **ws** (الأشهر والأخف). اتفق على **message format** ثابت: JSON بـ `type` (زي discriminated union من أسبوع 25!) عشان كل طرف يعرف يتصرف.', 'A WebSocket starts as HTTP and then upgrades to an open connection carrying messages both ways. In Node: the **ws** library (the most popular and lightest). Agree on a fixed **message format**: JSON with a `type` (like the week 25 discriminated union!) so each side knows how to react.'),
          'import { WebSocketServer } from "ws";\nconst wss = new WebSocketServer({ port: 8080 });\n\nwss.on("connection", (socket, req) => {\n  socket.send(JSON.stringify({ type: "hello", serverTime: Date.now() }));\n  socket.on("message", raw => {\n    let msg;\n    try { msg = JSON.parse(raw); } catch { return socket.send(JSON.stringify({ type: "error", error: "invalid JSON" })); }\n    switch (msg.type) {\n      case "ping": return socket.send(JSON.stringify({ type: "pong", t: msg.t }));\n      case "order.note": return broadcast({ type: "order.note", orderId: msg.orderId, text: String(msg.text).slice(0, 500) });\n      default: socket.send(JSON.stringify({ type: "error", error: `unknown type ${msg.type}` }));\n    }\n  });\n});\nfunction broadcast(msg) {\n  const data = JSON.stringify(msg);\n  for (const c of wss.clients) if (c.readyState === 1) c.send(data);\n}', S),
        L(B('العميل وإعادة الاتصال', 'The client and reconnection'),
          B('في المتصفح (وNode 22+) `WebSocket` جاهز. بس على عكس EventSource **مبيعيدش الاتصال لوحده** — لازم تعمله: **backoff reconnect** (1، 2، 4، 8 ثواني بحد أقصى + jitter)، وتبعت الرسايل اللي اتكتبت وانت مقطوع بعد الرجوع.', 'In the browser (and Node 22+) `WebSocket` is built in. But unlike EventSource it **does not reconnect by itself** — you must: a **backoff reconnect** (1, 2, 4, 8 seconds with a cap + jitter), and send messages written while disconnected once you are back.'),
          'function connect(url, onMessage) {\n  let socket, attempt = 0, closedByUs = false;\n  const outbox = [];\n  const open = () => {\n    socket = new WebSocket(url);\n    socket.onopen = () => { attempt = 0; while (outbox.length) socket.send(outbox.shift()); };\n    socket.onmessage = e => onMessage(JSON.parse(e.data));\n    socket.onclose = () => {\n      if (closedByUs) return;\n      const wait = Math.min(30_000, 1000 * 2 ** attempt++) + Math.random() * 500;\n      setTimeout(open, wait);                                  // reconnect with backoff\n    };\n  };\n  open();\n  return {\n    send: msg => { const s = JSON.stringify(msg); socket.readyState === WebSocket.OPEN ? socket.send(s) : outbox.push(s); },\n    close: () => { closedByUs = true; socket.close(); },\n  };\n}\nconst live = connect("wss://shop.example.com/ws", msg => msg.type === "order.note" && showNote(msg));', S),
        L(B('النبض', 'Heartbeats'),
          B('اتصال ممكن «يموت» من غير ما حد يعرف (موبايل دخل نفق، proxy قفله). **heartbeat ping**: السيرفر يبعت ping كل 30 ثانية، ولو مجاش pong — يقفل الاتصال وينضّف. ومن غير كده عندك آلاف «اتصالات» ميتة بتاكل الذاكرة.', 'A connection can «die» without anyone noticing (a phone entered a tunnel, a proxy closed it). A **heartbeat ping**: the server pings every 30 seconds, and if no pong returns — it terminates the connection and cleans up. Without it you collect thousands of dead «connections» eating memory.'),
          'function heartbeat(wss, intervalMs = 30_000) {\n  wss.on("connection", socket => {\n    socket.isAlive = true;\n    socket.on("pong", () => { socket.isAlive = true; });\n  });\n  const timer = setInterval(() => {\n    for (const socket of wss.clients) {\n      if (!socket.isAlive) { socket.terminate(); continue; }    // no pong since last round: dead\n      socket.isAlive = false;\n      socket.ping();\n    }\n  }, intervalMs);\n  wss.on("close", () => clearInterval(timer));\n}', S)
      ],
      practice: [
        B('شغّل سيرفر ws وكلّمه من المتصفح.', 'Run a ws server and talk to it from the browser.'),
        B('اتفق على 4 أنواع رسايل بـ type.', 'Agree on 4 message types with type.'),
        B('اعمل connect بـ backoff واقفل السيرفر وارجّعه.', 'Build connect with backoff, stop the server and bring it back.'),
        B('ضيف heartbeat وشوف الاتصالات الميتة بتتشال.', 'Add a heartbeat and watch dead connections go.')
      ],
      words: [
        W('ws', 'أشهر مكتبة WebSocket لـ Node', 'the best-known WebSocket library for Node', 'The server uses ws.'),
        W('upgrade', 'تحويل طلب HTTP لاتصال WebSocket', 'switching an HTTP request to a WebSocket', 'The upgrade happens on /ws.'),
        W('message format', 'شكل الرسايل المتفق عليه', 'the agreed shape of messages', 'Every message format has a type.'),
        W('backoff reconnect', 'إعادة اتصال بانتظار متزايد', 'reconnecting with growing waits', 'Backoff reconnect avoids a thundering herd.'),
        W('heartbeat ping', 'نبضة دورية للتأكد إن الاتصال عايش', 'a regular check that the connection lives', 'No pong after a heartbeat ping: terminate.')
      ],
      read: [{ t: 'ws: a Node.js WebSocket library', url: 'https://github.com/websockets/ws', what: B('اقرا How to detect and close broken connections.', 'Read How to detect and close broken connections.') }, { t: 'MDN: Writing WebSocket client applications', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications', what: B('اقرا المثال.', 'Read the example.') }],
      challenge: B('اعمل «ملاحظات الطلبات الحية»: سيرفر ws برسايل JSON بـ type (note، typing، ping)، heartbeat، عميل بـ backoff وoutbox، وصفحة بتعرض الملاحظات لحظيًا لكل الفريق.', 'Build «live order notes»: a ws server with typed JSON messages (note, typing, ping), a heartbeat, a client with backoff and an outbox, and a page showing notes live to the whole team.'),
      quiz: [
        Q(B('WebSocket بيعيد الاتصال لوحده؟', 'Does WebSocket reconnect by itself?'), [['لأ؛ انت تعمله', 'no; you do it'], ['أيوه', 'yes'], ['في Chrome بس', 'only in Chrome']], 0, B('backoff.', 'Backoff.')),
        Q(B('اتصال ميت من غير ما حد يعرف:', 'A connection dead without notice:'), ['heartbeat ping/pong', 'CORS', 'ETag'], 0, B('terminate.', 'Terminate.')),
        Q(B('شكل الرسايل:', 'The message shape:'), [['JSON بـ type', 'JSON with a type'], ['نص حر', 'free text'], ['XML', 'XML']], 0, B('discriminated.', 'Discriminated.'))
      ] },

    { title: B('الغرف والصلاحيات والتوسّع', 'Rooms, permissions and scaling'),
      goal: B('كل واحد ياخد اللي يخصّه، على أي عدد سيرفرات.', 'Everyone gets what concerns them, on any number of servers.'),
      learn: [
        L(B('غرف وقنوات', 'Rooms and channels'),
          B('مش كل حاجة لكل الناس: **room** (أو **channel**) = مجموعة اتصالات بتستقبل نفس الرسايل: `team:cairo`، `order:1042`، `user:7`. السيرفر بيحفظ Map من الغرفة للاتصالات، والعميل بيطلب يدخل غرفة — **بعد** فحص الصلاحية.', 'Not everything is for everyone: a **room** (or a **channel**) = a group of connections receiving the same messages: `team:cairo`, `order:1042`, `user:7`. The server keeps a Map from room to connections, and a client asks to join a room — **after** a permission check.'),
          'class Rooms {\n  #rooms = new Map();\n  join(room, client) { if (!this.#rooms.has(room)) this.#rooms.set(room, new Set()); this.#rooms.get(room).add(client); }\n  leaveAll(client) { for (const [room, set] of this.#rooms) { set.delete(client); if (!set.size) this.#rooms.delete(room); } }\n  emit(room, msg) { const n = this.#rooms.get(room)?.size ?? 0; for (const c of this.#rooms.get(room) ?? []) c.send(JSON.stringify(msg)); return n; }\n}\nconst rooms = new Rooms();\nconst client = name => ({ name, inbox: [], send(m) { this.inbox.push(JSON.parse(m).text); } });\nconst sara = client("sara"), omar = client("omar"), boss = client("boss");\nrooms.join("team:cairo", sara); rooms.join("team:giza", omar);\nfor (const team of ["team:cairo", "team:giza"]) rooms.join(team, boss);\nconsole.log("sent to", rooms.emit("team:cairo", { text: "new Cairo order #1042" }), "clients");\nrooms.emit("team:giza", { text: "Giza order #1043 late" });\nrooms.leaveAll(omar);\nconsole.log({ sara: sara.inbox, omar: omar.inbox, boss: boss.inbox });', N()),
        L(B('الصلاحيات على الاتصال', 'Permissions on the connection'),
          B('اتحقق من المستخدم **وقت الاتصال** (كوكي الجلسة أو توكن قصير)، ورفض لو مش مسموح. ولكل طلب دخول غرفة: هل مسموحله يشوف order:1043؟ (IDOR من أسبوع 34 بيحصل هنا كمان!). وحدد حجم الرسالة ومعدلها، ومتثقش في أي `userId` جاي من العميل.', 'Verify the user **at connection time** (a session cookie or a short-lived token) and refuse if not allowed. For each room-join request: may they see order:1043? (Week 34’s IDOR happens here too!) Limit message size and rate, and never trust a `userId` sent by the client.'),
          'const wss = new WebSocketServer({ noServer: true, maxPayload: 16 * 1024 });\nserver.on("upgrade", async (req, socket, head) => {\n  const user = await sessionFromCookie(req.headers.cookie);              // same session as the HTTP app\n  const originOk = ["https://shop.example.com"].includes(req.headers.origin);\n  if (!user || !originOk) { socket.write("HTTP/1.1 401 Unauthorized\\r\\n\\r\\n"); return socket.destroy(); }\n  wss.handleUpgrade(req, socket, head, ws => { ws.user = user; wss.emit("connection", ws, req); });\n});\n// on { type: "join", room: "order:1043" }:\n//   if (!(await canSeeOrder(ws.user, 1043))) return ws.send(JSON.stringify({ type: "error", error: "not allowed" }));', S),
        L(B('أكتر من سيرفر', 'More than one server'),
          B('لو عندك سيرفرين، عميل على A مش هيوصله رسالة اتعملت على B. الحل: **redis pub/sub** (أو Postgres LISTEN/NOTIFY): كل سيرفر بينشر الحدث في Redis، وكل السيرفرات مشتركة وبتوزّع على عملائها. و**sticky sessions** في الـ load balancer لو محتاج العميل يفضل على نفس السيرفر.', 'With two servers, a client on A misses a message created on B. The fix: **redis pub/sub** (or Postgres LISTEN/NOTIFY): each server publishes the event to Redis, and every server subscribes and delivers to its own clients. And **sticky sessions** in the load balancer if a client must stay on one server.'),
          'import { createClient } from "redis";\nconst pub = createClient({ url: process.env.REDIS_URL });\nconst sub = pub.duplicate();\nawait Promise.all([pub.connect(), sub.connect()]);\n\n// any server: publish once\nexport const publish = (room, msg) => pub.publish("rt", JSON.stringify({ room, msg }));\n\n// every server: deliver to its own local clients\nawait sub.subscribe("rt", raw => {\n  const { room, msg } = JSON.parse(raw);\n  rooms.emit(room, msg);\n});', S)
      ],
      practice: [
        B('اعمل غرف team:… وorder:….', 'Build team:… and order:… rooms.'),
        B('اتحقق من الجلسة في upgrade.', 'Check the session during upgrade.'),
        B('ارفض دخول غرفة طلب مش بتاعك.', 'Refuse joining an order room that is not yours.'),
        B('شغّل سيرفرين بـ Redis pub/sub محليًا (Docker).', 'Run two servers with Redis pub/sub locally (Docker).')
      ],
      words: [
        W('room', 'مجموعة اتصالات بتستقبل نفس الرسايل', 'a group of connections receiving the same messages', 'Join the order:1042 room.'),
        W('channel', 'اسم قناة رسايل', 'a named message stream', 'Publish on the orders channel.'),
        W('redis pub/sub', 'نشر واشتراك عبر Redis بين سيرفرات', 'publish/subscribe through Redis across servers', 'Redis pub/sub links both servers.'),
        W('sticky sessions', 'إبقاء العميل على نفس السيرفر', 'keeping a client on the same server', 'Enable sticky sessions for WebSockets.'),
        W('presence', 'معرفة مين متصل دلوقتي', 'knowing who is connected now', 'Presence shows who is online.'),
        W('maxpayload', 'أقصى حجم لرسالة WebSocket', 'the maximum size of a WebSocket message', 'Set maxPayload to 16 KB.')
      ],
      read: [{ t: 'Redis: Pub/Sub', url: 'https://redis.io/docs/latest/develop/interact/pubsub/', what: B('اقرا Format of pushed messages.', 'Read Format of pushed messages.') }, { t: 'OWASP: WebSocket Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html', what: B('اقرا Authentication وInput validation.', 'Read Authentication and Input validation.') }],
      challenge: B('ضيف للوحة الحية: غرف بالفرق والطلبات، تحقق بالجلسة وOrigin في upgrade، فحص صلاحية لكل join، حد حجم ومعدل، presence (مين أونلاين)، وRedis pub/sub بين نسختين من السيرفر.', 'Add to the live board: rooms by team and order, session and Origin checks during upgrade, a permission check on each join, size and rate limits, presence (who is online), and Redis pub/sub between two server copies.'),
      quiz: [
        Q(B('رسالة لفريق القاهرة بس:', 'A message for the Cairo team only:'), [['غرفة team:cairo', 'a team:cairo room'], ['broadcast للكل', 'broadcast to all'], ['إيميل', 'email']], 0, B('room.', 'Room.')),
        Q(B('userId جاي من العميل في رسالة:', 'A userId sent by the client in a message:'), [['متثقش فيه', 'never trust it'], ['اعتمد عليه', 'rely on it'], ['احفظه', 'store it']], 0, B('من الجلسة.', 'Use the session.')),
        Q(B('سيرفرين ورسالة لازم توصل للكل:', 'Two servers and a message for everyone:'), ['Redis pub/sub', B('سيرفر واحد بس', 'one server only'), 'localStorage'], 0, B('توزيع.', 'Distribution.'))
      ] },

    { title: B('الوقت الحقيقي مع الأتمتة', 'Real time meets automation'),
      goal: B('n8n والأنظمة الخارجية بيغذّوا لوحة حية بثبات.', 'n8n and outside systems feed a live board reliably.'),
      learn: [
        L(B('الخط الكامل', 'The full pipeline'),
          B('Shopify ← webhook ← بوابتك (تحقق، upsert في القاعدة) ← نشر حدث ← SSE/WS ← اللوحات. وn8n ممكن يكون المصدر كمان (HTTP Request لـ `/internal/events` بمفتاح API). القاعدة أولًا، والبث بعدها: لو البث فشل، البيانات موجودة واللوحة تعوّض بـ Last-Event-ID أو polling.', 'Shopify → webhook → your gateway (verify, upsert into the database) → publish an event → SSE/WS → the boards. n8n can be a source too (an HTTP Request to `/internal/events` with an API key). The database first, broadcast after: if broadcasting fails, the data is safe and boards catch up via Last-Event-ID or polling.'),
          'Shopify ──webhook──▶ gateway: verify HMAC → upsert orders (DB) → publish("team:cairo", order.updated)\n n8n ────POST /internal/events (API key)──▶ publish("ops", job.finished)\n                         publish ──Redis──▶ every server ──SSE/WS──▶ dashboards\n dashboard reconnects ──Last-Event-ID──▶ catches up from history (or reloads from the API)', T),
        L(B('متغرقش العميل', 'Do not flood the client'),
          B('1000 تحديث في الثانية = متصفح متجمد وموبايل حرّان. **throttle** أو **batch**: جمّع التحديثات وابعتها كل 500ms كرسالة واحدة، وابعت الحالة الأخيرة بس لكل طلب (لو اتغير 5 مرات في نص ثانية، العميل محتاج آخر واحدة). وفي العميل: requestAnimationFrame للرسم.', '1000 updates a second = a frozen browser and a hot phone. **throttle** or **batch**: gather updates and send them every 500 ms as one message, and send only the latest state per order (if it changed 5 times in half a second, the client needs only the last). On the client: requestAnimationFrame for drawing.'),
          'function batcher(send, everyMs = 500) {\n  let pending = new Map(), timer = null;\n  return update => {\n    pending.set(update.id, update);                       // keep only the latest per order\n    timer ??= setTimeout(() => { send([...pending.values()]); pending = new Map(); timer = null; }, everyMs);\n  };\n}\nconst sent = [];\nconst push = batcher(batch => sent.push(batch.map(u => `${u.id}:${u.status}`).join(",")), 100);\nfor (const [id, status] of [[1, "new"], [1, "paid"], [2, "new"], [1, "shipped"], [3, "new"], [2, "paid"]]) push({ id, status });\nsetTimeout(() => { push({ id: 4, status: "new" }); }, 150);\nsetTimeout(() => console.log("6+1 updates →", sent.length, "messages:", sent), 400);', N()),
        L(B('اختبار الوقت الحقيقي', 'Testing real time'),
          B('اختبر بسيرفر حقيقي على port 0 (زي أسبوع 27): افتح اتصال، ابعت حدث من الـ API، واتأكد إن الرسالة وصلت في وقت معقول. واختبر الحالات الصعبة: انقطاع وإعادة اتصال، Last-Event-ID، عميل مش مسموح، رسالة كبيرة، و100 عميل مع بعض (load test بسيط).', 'Test with a real server on port 0 (like week 27): open a connection, emit an event through the API, and check the message arrives in reasonable time. And test the hard cases: a drop and reconnect, Last-Event-ID, an unauthorised client, an oversized message, and 100 clients at once (a simple load test).'),
          'import { test } from "node:test";\nimport assert from "node:assert/strict";\n\ntest("an order update reaches a subscribed board within 500 ms", async () => {\n  const { url, close } = await startServer({ port: 0 });\n  const messages = await collectSSE(`${url}/events`, { count: 1, timeoutMs: 500, cookie: managerCookie });\n  await fetch(`${url}/internal/events`, { method: "POST", headers: { "X-API-Key": TEST_KEY }, body: JSON.stringify({ room: "ops", type: "order.updated", id: 1042 }) });\n  assert.equal((await messages)[0].event, "order.updated");\n  await close();\n});', S)
      ],
      practice: [
        B('ارسم الخط الكامل لمشروعك.', 'Draw the full pipeline for your project.'),
        B('اعمل n8n workflow بيبعت حدث للوحة.', 'Build an n8n workflow sending an event to the board.'),
        B('ضيف batcher وقِس عدد الرسايل.', 'Add a batcher and count the messages.'),
        B('اكتب اختبار SSE بسيرفر حقيقي.', 'Write an SSE test with a real server.')
      ],
      words: [
        W('throttle updates', 'تقليل عدد التحديثات المبعوتة', 'reducing how many updates are sent', 'Throttle updates to twice a second.'),
        W('batch', 'تجميع حاجات في رسالة واحدة', 'grouping things into one message', 'Send updates as one batch.'),
        W('catch up', 'تعويض اللي فات بعد الرجوع', 'recovering what was missed after returning', 'Boards catch up with Last-Event-ID.'),
        W('load test', 'اختبار بأعداد كبيرة', 'a test with large numbers', 'A load test opened 100 connections.'),
        W('internal endpoint', 'endpoint للأنظمة الداخلية بس', 'an endpoint for internal systems only', 'n8n posts to the internal endpoint.')
      ],
      read: [{ t: 'n8n Docs: HTTP Request node', url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/', what: B('للبث من n8n.', 'For broadcasting from n8n.') }],
      challenge: B('وصّل الخط كامل: webhook Shopify تجريبي ← البوابة (upsert) ← نشر ← SSE ← لوحة؛ وworkflow n8n بيبعت «تقرير خلص» للوحة؛ batcher 500ms؛ واختبار end-to-end للخط.', 'Connect the full pipeline: a test Shopify webhook → the gateway (upsert) → publish → SSE → a board; an n8n workflow sending «report finished» to the board; a 500 ms batcher; and an end-to-end test of the pipeline.'),
      quiz: [
        Q(B('الأول: القاعدة ولا البث؟', 'First: the database or the broadcast?'), [['القاعدة', 'the database'], ['البث', 'the broadcast'], ['مش مهم', 'it does not matter']], 0, B('البيانات آمنة.', 'Data stays safe.')),
        Q(B('نفس الطلب اتغير 5 مرات في ثانية:', 'One order changed 5 times in a second:'), [['ابعت آخر حالة', 'send the latest state'], ['ابعت الخمسة', 'send all five'], ['متبعتش', 'send nothing']], 0, B('batch.', 'Batch.')),
        Q(B('n8n يبعت حدث للوحة:', 'n8n sends an event to the board:'), [['POST لـ internal endpoint بمفتاح', 'POST to an internal endpoint with a key'], ['WebSocket من n8n', 'a WebSocket from n8n'], ['إيميل', 'email']], 0, B('API.', 'API.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('لوحة عمليات حية وموثوقة.', 'A live and reliable operations board.'),
      review: [
        B('polling وlong polling وSSE وWebSocket والـ webhooks — إمتى كل واحد.', 'Polling, long polling, SSE, WebSocket and webhooks — when to use each.'),
        B('SSE: text/event-stream وEventSource وLast-Event-ID وping.', 'SSE: text/event-stream, EventSource, Last-Event-ID and ping.'),
        B('WebSocket: ws ورسايل بـ type وbackoff reconnect وheartbeat.', 'WebSocket: ws, typed messages, backoff reconnect and heartbeats.'),
        B('الغرف والصلاحيات عند الاتصال وRedis pub/sub.', 'Rooms, permissions at connection time and Redis pub/sub.'),
        B('القاعدة قبل البث، batching، والاختبار بسيرفر حقيقي.', 'Database before broadcast, batching and testing with a real server.')
      ],
      project: B('ابني «لوحة العمليات الحية»: SSE لتيار الطلبات (history + Last-Event-ID + ping)، WebSocket لملاحظات الفريق (غرف لكل طلب وفريق، heartbeat، backoff، presence)، تحقق بالجلسة وOrigin وصلاحيات join، webhooks المتجر ← upsert ← نشر، n8n بيبعت أحداث المهام، batching، Redis pub/sub لنسختين، live regions للإعلان، واختبارات end-to-end.', 'Build the «live operations board»: SSE for the orders stream (history + Last-Event-ID + ping), WebSocket for team notes (rooms per order and team, heartbeat, backoff, presence), session, Origin and join-permission checks, shop webhooks → upsert → publish, n8n sending job events, batching, Redis pub/sub for two copies, live regions for announcements, and end-to-end tests.'),
      test: [
        Q(B('أبسط طريقة لتحديث كل دقيقة:', 'The simplest way to update every minute:'), ['polling', 'WebSocket', 'WebRTC'], 0, B('كفاية.', 'Enough.')),
        Q(B('long polling:', 'Long polling:'), [['السيرفر يمسك الطلب لحد الجديد', 'the server holds the request until news'], ['اتصال TCP خاص', 'a special TCP connection'], ['مفيش HTTP', 'no HTTP']], 0, B('HTTP عادي.', 'Plain HTTP.')),
        Q(B('نوع محتوى SSE:', 'SSE’s content type:'), ['text/event-stream', 'application/json', 'text/html'], 0, B('stream.', 'A stream.')),
        Q(B('رسالة SSE بتخلص بـ:', 'An SSE message ends with:'), ['\\n\\n', ';', '</msg>'], 0, B('سطر فاضي.', 'A blank line.')),
        Q(B('EventSource بعد الانقطاع:', 'EventSource after a drop:'), [['بيعيد الاتصال ويبعت Last-Event-ID', 'reconnects and sends Last-Event-ID'], ['بيقف', 'stops'], ['بيعمل reload', 'reloads the page']], 0, B('تلقائي.', 'Automatic.')),
        Q(B('WebSocket بعد الانقطاع:', 'WebSocket after a drop:'), [['انت تعيد بـ backoff', 'you reconnect with backoff'], ['بيعيد لوحده', 'reconnects by itself'], ['مستحيل', 'impossible']], 0, B('يدوي.', 'Manual.')),
        Q(B('اتصالات ميتة كتير:', 'Many dead connections:'), ['heartbeat ping/pong', 'CORS', 'gzip'], 0, B('تنضيف.', 'Cleanup.')),
        Q(B('رسايل فريق بعينه:', 'Messages for one team:'), ['room', 'broadcast', 'cookie'], 0, B('غرفة.', 'A room.')),
        Q(B('تحقق المستخدم في WebSocket:', 'Checking the user on a WebSocket:'), [['وقت الـ upgrade', 'during the upgrade'], ['من رسالة العميل', 'from the client’s message'], ['مش لازم', 'not needed']], 0, B('جلسة.', 'A session.')),
        Q(B('3 سيرفرات:', 'Three servers:'), ['Redis pub/sub', B('كل واحد لوحده', 'each on its own'), 'localStorage'], 0, B('توزيع.', 'Distribution.')),
        Q(B('1000 تحديث في الثانية للمتصفح:', '1000 updates a second to a browser:'), [['batch/throttle', 'batch/throttle'], ['ابعتهم كلهم', 'send them all'], ['اقفل الصفحة', 'close the page']], 0, B('آخر حالة.', 'Latest state.')),
        Q(B('بعد webhook جديد:', 'After a new webhook:'), [['احفظ في القاعدة ثم انشر', 'save to the database, then publish'], ['انشر بس', 'only publish'], ['استنى ساعة', 'wait an hour']], 0, B('موثوق.', 'Reliable.'))
      ] }
  ]
};
