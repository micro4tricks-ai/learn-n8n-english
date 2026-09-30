/* lab.html: the workflow viewer and checker, the n8n template search, and the playgrounds
 * (n8n expressions, JavaScript, Python through Pyodide, SQL through sql.js). Code runs in the browser only:
 * JavaScript and expressions in a Web Worker with a time limit, Python in its own worker, SQL in memory. */
(function(){
  var S = window.SITE, X = window.SECTIONS, B = S.B, L = S.L, esc = S.esc;
  var CDN = {
    luxon: 'https://cdn.jsdelivr.net/npm/luxon@3.7.2/build/global/luxon.min.js',
    pyodide: 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/',
    sqljs: 'https://cdn.jsdelivr.net/npm/sql.js@1.14.2/dist/'
  };
  function lsGet(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } }
  function lsSet(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

  // ======================= workflow viewer =======================
  // what each common node does, for the step-by-step explanation
  var NODE = {
    webhook: ['⚡', 'بيستقبل طلب HTTP من برّه (فورم، تطبيق، خدمة تانية) ويبدأ التشغيل.', 'Receives an HTTP request from outside (a form, an app, another service) and starts the run.'],
    scheduleTrigger: ['⏰', 'بيشغّل الـ Workflow لوحده في مواعيد ثابتة.', 'Runs the workflow by itself on a schedule.'],
    cron: ['⏰', 'بيشغّل الـ Workflow لوحده في مواعيد ثابتة.', 'Runs the workflow by itself on a schedule.'],
    manualTrigger: ['▶', 'بيبدأ لما تدوس Execute بإيدك (للتجربة).', 'Starts when you click Execute (for testing).'],
    formTrigger: ['📝', 'بيعرض فورم من n8n نفسه، وكل إرسال بيبدأ تشغيل.', 'Shows a form hosted by n8n; each submission starts a run.'],
    errorTrigger: ['⚠️', 'بيشتغل لما Workflow تاني يقع، عشان تتنبّه أو تسجّل الخطأ.', 'Runs when another workflow fails, so you can alert or log it.'],
    chatTrigger: ['💬', 'بيستقبل رسايل شات ويبدأ التشغيل مع كل رسالة.', 'Receives chat messages and starts a run for each one.'],
    set: ['✏️', 'بيضيف أو يعدّل حقول في البيانات.', 'Adds or changes fields in the data.'],
    code: ['{ }', 'بيشغّل كود JavaScript أو Python على الـ items.', 'Runs JavaScript or Python code on the items.'],
    if: ['🔀', 'بيفحص شرط ويبعت البيانات لفرع «صح» أو «غلط».', 'Checks a condition and sends the data to the true or false branch.'],
    switch: ['🔀', 'بيوزّع البيانات على فروع كتير حسب قيمة.', 'Routes the data to several branches by a value.'],
    filter: ['⛃', 'بيسيب الـ items اللي بتحقق الشرط بس.', 'Keeps only the items that match a condition.'],
    merge: ['⛙', 'بيجمع بيانات من فرعين في فرع واحد.', 'Combines data from two branches into one.'],
    splitInBatches: ['🔁', 'بيقسم الـ items لدفعات ويلف عليهم واحدة واحدة.', 'Splits the items into batches and loops over them.'],
    splitOut: ['⇶', 'بيحوّل array جوه item لـ items منفصلة.', 'Turns an array inside an item into separate items.'],
    aggregate: ['Σ', 'بيجمع items كتير في item واحد.', 'Combines many items into one.'],
    wait: ['⏳', 'بيستنى وقت معيّن أو لحد ما حاجة تحصل.', 'Waits for a time or until something happens.'],
    httpRequest: ['🌐', 'بيكلّم أي API: يجيب أو يبعت بيانات.', 'Calls any API to get or send data.'],
    respondToWebhook: ['↩️', 'بيرد على اللي بعت الطلب للـ Webhook.', 'Replies to whoever sent the webhook request.'],
    googleSheets: ['📊', 'بيقرا أو يكتب صفوف في Google Sheets.', 'Reads or writes rows in Google Sheets.'],
    gmail: ['✉️', 'بيبعت أو يقرا إيميلات Gmail.', 'Sends or reads Gmail messages.'],
    emailSend: ['✉️', 'بيبعت إيميل عن طريق SMTP.', 'Sends an email over SMTP.'],
    telegram: ['✈️', 'بيبعت رسالة أو ملف على Telegram.', 'Sends a message or a file on Telegram.'],
    slack: ['#', 'بيبعت رسالة على Slack.', 'Sends a message on Slack.'],
    postgres: ['🗄', 'بينفّذ استعلام على PostgreSQL.', 'Runs a query on PostgreSQL.'],
    mySql: ['🗄', 'بينفّذ استعلام على MySQL.', 'Runs a query on MySQL.'],
    airtable: ['▦', 'بيقرا أو يكتب سجلات في Airtable.', 'Reads or writes Airtable records.'],
    notion: ['▤', 'بيقرا أو يكتب صفحات وقواعد بيانات Notion.', 'Reads or writes Notion pages and databases.'],
    dateTime: ['📅', 'بيحوّل ويحسب التواريخ.', 'Formats and computes dates.'],
    noOp: ['○', 'مبيعملش حاجة، مجرد علامة في الرسمة.', 'Does nothing; a marker in the diagram.'],
    executeWorkflow: ['↪', 'بيشغّل Workflow تاني (sub-workflow).', 'Runs another workflow (a sub-workflow).'],
    stickyNote: ['🗒', 'ملاحظة مكتوبة في الرسمة.', 'A note on the canvas.'],
    agent: ['🤖', 'وكيل ذكاء اصطناعي: بيفكّر ويختار الأدوات اللي يستخدمها عشان يرد.', 'An AI agent: it reasons and picks the tools to use to answer.'],
    chainLlm: ['🧠', 'بيبعت برومبت لموديل لغة ويرجّع رده.', 'Sends a prompt to a language model and returns its reply.'],
    lmChatOpenAi: ['🧠', 'موديل اللغة اللي الوكيل بيفكّر بيه (OpenAI).', 'The language model the agent thinks with (OpenAI).'],
    lmChatAnthropic: ['🧠', 'موديل اللغة اللي الوكيل بيفكّر بيه (Anthropic Claude).', 'The language model the agent thinks with (Anthropic Claude).'],
    lmChatGoogleGemini: ['🧠', 'موديل اللغة اللي الوكيل بيفكّر بيه (Google Gemini).', 'The language model the agent thinks with (Google Gemini).'],
    memoryBufferWindow: ['💾', 'ذاكرة المحادثة: آخر رسايل عشان الوكيل يفتكر السياق.', 'Chat memory: the last messages so the agent keeps the context.'],
    toolHttpRequest: ['🛠', 'أداة للوكيل: بيكلّم API لما يحتاج معلومة.', 'A tool for the agent: calls an API when it needs information.'],
    toolCode: ['🛠', 'أداة للوكيل مكتوبة بالكود.', 'A tool for the agent written in code.'],
    vectorStoreInMemory: ['📚', 'مخزن vectors للبحث في مستنداتك (RAG).', 'A vector store to search your documents (RAG).'],
    outputParserStructured: ['🧾', 'بيجبر رد الموديل يطلع JSON بشكل محدد.', 'Forces the model reply into a fixed JSON shape.']
  };
  function short(type){ return String(type || '').split('.').pop(); }
  function info(type){
    var k = short(type), n = NODE[k];
    if(!n){
      if(/trigger$/i.test(k)) return ['⚡', 'بيبدأ التشغيل لما حدث يحصل في الخدمة دي.', 'Starts a run when an event happens in this service.'];
      if(/^tool/i.test(k)) return ['🛠', 'أداة للوكيل.', 'A tool for the agent.'];
      if(/^lmChat|^lm/i.test(k)) return ['🧠', 'موديل لغة.', 'A language model.'];
      return ['◆', 'نود بتتعامل مع خدمة أو بيانات.', 'A node that works with a service or data.'];
    }
    return n;
  }
  function isTrigger(n){ return /trigger$/i.test(short(n.type)) || /^(webhook|cron|scheduleTrigger|manualTrigger|formTrigger|chatTrigger|errorTrigger)$/.test(short(n.type)); }
  function isAiSub(n){ return /^@n8n\/n8n-nodes-langchain\./.test(n.type) && !/agent|chainLlm|chatTrigger/.test(short(n.type)); }

  // accept a whole workflow, a copied selection, or a template API answer
  function parseWorkflow(text){
    var j = typeof text === 'string' ? JSON.parse(text) : text;
    for(var i = 0; i < 3 && j && !j.nodes && j.workflow; i++) j = j.workflow;
    if(!j || !Array.isArray(j.nodes)) throw new Error(B('ده مش JSON بتاع Workflow: مفيش `nodes`.', 'This is not workflow JSON: there are no `nodes`.'));
    j.connections = j.connections || {};
    return j;
  }
  // every edge: {from, to, kind ('main' or ai_*), out (output index)}
  function edges(wf){
    var out = [];
    Object.keys(wf.connections).forEach(function(from){
      var c = wf.connections[from];
      Object.keys(c || {}).forEach(function(kind){
        (c[kind] || []).forEach(function(list, oi){
          (list || []).forEach(function(t){ if(t && t.node) out.push({ from: from, to: t.node, kind: kind, out: oi }); });
        });
      });
    });
    return out;
  }

  var SECRET = /(sk-[A-Za-z0-9_-]{16,}|sk_live_[A-Za-z0-9]{10,}|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}|xox[abpr]-[A-Za-z0-9-]{10,}|AIza[0-9A-Za-z_-]{30,}|Bearer\s+[A-Za-z0-9._~+\/-]{16,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
  var SECRET_KEY = /^(password|passwd|secret|api[_-]?key|apikey|token|access[_-]?token|client[_-]?secret|authorization)$/i;
  // the checks: [level, {ar, en}], level: bad (fix it), warn, tip
  function lint(wf){
    var res = [], E = edges(wf), names = {};
    var nodes = wf.nodes.filter(function(n){ return short(n.type) !== 'stickyNote'; });
    nodes.forEach(function(n){ names[n.name] = n; });
    function add(l, ar, en){ res.push([l, { ar: ar, en: en }]); }
    if(!nodes.some(isTrigger)) add('warn', 'مفيش Trigger: الـ Workflow ده مش هيشتغل لوحده غير لو اتنادى من Workflow تاني.', 'No trigger: this workflow will not run by itself unless another workflow calls it.');
    // secrets typed into parameters
    nodes.forEach(function(n){
      (function walk(o, key){
        if(o == null) return;
        if(typeof o === 'string'){
          if(SECRET.test(o) || (SECRET_KEY.test(key || '') && o.length >= 6 && o.charAt(0) !== '=')) add('bad', 'في «' + n.name + '» فيه مفتاح أو باسورد مكتوب في النود نفسها. أي حد يشوف الـ JSON هيشوفه: حطّه في Credentials.', 'In «' + n.name + '» a key or password is typed into the node itself. Anyone who sees the JSON sees it: put it in Credentials.');
          return;
        }
        if(typeof o === 'object'){
          if(o.name && o.value && typeof o.value === 'string' && SECRET_KEY.test(o.name) && o.value.charAt(0) !== '=' && !SECRET.test(o.value) && o.value.length >= 6) add('bad', 'في «' + n.name + '» الهيدر «' + o.name + '» فيه قيمة سرية مكتوبة. استخدم Credentials.', 'In «' + n.name + '» the header «' + o.name + '» holds a secret typed in. Use Credentials.');
          Object.keys(o).forEach(function(k){ walk(o[k], k); });
        }
      })(n.parameters, '');
      if(short(n.type) === 'webhook' && (!n.parameters || !n.parameters.authentication || n.parameters.authentication === 'none'))
        add('warn', '«' + n.name + '» Webhook مفتوح لأي حد يعرف الرابط. فعّل Authentication (Header Auth مثلًا) أو اتأكد من توقيع الطلب.', '«' + n.name + '» is a webhook open to anyone with the link. Turn on Authentication (Header Auth, say) or verify a request signature.');
      if(n.disabled) add('tip', '«' + n.name + '» متوقفة (disabled). لو مش محتاجها امسحها عشان الرسمة تفضل واضحة.', '«' + n.name + '» is disabled. If you do not need it, delete it to keep the diagram clear.');
      if(/\d$/.test(n.name) || n.name === n.type || ['HTTP Request', 'Code', 'Edit Fields', 'Set', 'IF', 'If', 'Switch', 'Merge', 'Webhook'].indexOf(n.name) !== -1 && nodes.filter(function(x){ return short(x.type) === short(n.type); }).length > 1)
        add('tip', 'غيّر اسم «' + n.name + '» لاسم بيقول بيعمل إيه (زي «Get customer»): الأخطاء والـ Expressions بتبقى أوضح.', 'Rename «' + n.name + '» to say what it does (like «Get customer»): errors and expressions read better.');
      if(short(n.type) === 'httpRequest' && !n.retryOnFail) add('tip', '«' + n.name + '»: فعّل Retry On Fail من الإعدادات؛ الـ APIs بتقع أحيانًا لثواني.', '«' + n.name + '»: turn on Retry On Fail in the settings; APIs fail for a few seconds sometimes.');
      var code = n.parameters && (n.parameters.jsCode || n.parameters.pythonCode);
      if(code && code.split('\n').length > 80) add('tip', '«' + n.name + '» فيها كود طويل (' + code.split('\n').length + ' سطر). قسّمه على نودات أو Sub-workflow عشان يبقى أسهل في الصيانة.', '«' + n.name + '» holds long code (' + code.split('\n').length + ' lines). Split it into nodes or a sub-workflow so it is easier to maintain.');
    });
    // nodes nothing connects to
    var linked = {};
    E.forEach(function(e){ linked[e.from] = 1; linked[e.to] = 1; });
    nodes.forEach(function(n){ if(!linked[n.name] && nodes.length > 1) add('warn', '«' + n.name + '» مش متوصلة بأي نود، فمش هتشتغل.', '«' + n.name + '» is not connected to anything, so it never runs.'); });
    E.forEach(function(e){ if(!names[e.to] && !wf.nodes.some(function(n){ return n.name === e.to; })) add('bad', 'فيه وصلة لنود اسمها «' + e.to + '» مش موجودة.', 'A connection points to a node named «' + e.to + '» that does not exist.'); });
    var handles = (wf.settings && wf.settings.errorWorkflow) || nodes.some(function(n){ return short(n.type) === 'errorTrigger' || n.onError || n.continueOnFail; });
    if(!handles && nodes.length > 2) add('warn', 'مفيش معالجة أخطاء: لو خطوة وقعت محدش هيعرف. اعمل Error Workflow (Error Trigger ← تنبيه) واختاره من Settings.', 'No error handling: if a step fails, nobody finds out. Make an error workflow (Error Trigger → alert) and pick it in Settings.');
    if(wf.pinData && Object.keys(wf.pinData).length) add('warn', 'الـ JSON فيه بيانات مثبّتة (pinData) — ممكن تكون بيانات عملاء حقيقية. امسحها قبل ما تشارك الـ Workflow.', 'The JSON contains pinned data (pinData), which may be real customer data. Remove it before you share the workflow.');
    if(nodes.length > 40) add('tip', 'الـ Workflow كبير (' + nodes.length + ' نود). قسّمه على Sub-workflows بـ Execute Workflow.', 'This workflow is large (' + nodes.length + ' nodes). Split it into sub-workflows with Execute Workflow.');
    if(!res.some(function(r){ return r[0] !== 'tip'; })) res.unshift(['ok', { ar: 'مفيش مشاكل مهمة 👍', en: 'No important problems 👍' }]);
    return res;
  }
  // the steps in run order: from the triggers along the main connections
  function steps(wf){
    var E = edges(wf), byName = {}, seen = {}, order = [], q = [];
    wf.nodes.forEach(function(n){ byName[n.name] = n; });
    wf.nodes.filter(isTrigger).forEach(function(n){ q.push(n.name); });
    if(!q.length) wf.nodes.forEach(function(n){ if(!E.some(function(e){ return e.to === n.name && e.kind === 'main'; }) && short(n.type) !== 'stickyNote' && !isAiSub(n)) q.push(n.name); });
    while(q.length){
      var name = q.shift();
      if(seen[name] || !byName[name]) continue;
      seen[name] = 1; order.push(byName[name]);
      E.filter(function(e){ return e.from === name && e.kind === 'main'; }).forEach(function(e){ q.push(e.to); });
    }
    return order.map(function(n){
      var outs = E.filter(function(e){ return e.from === n.name && e.kind === 'main'; });
      var subs = E.filter(function(e){ return e.to === n.name && e.kind !== 'main'; });
      var i = info(n.type), branch = '';
      if(short(n.type) === 'if' && outs.length){
        var t = outs.filter(function(e){ return e.out === 0; }).map(function(e){ return e.to; }), f = outs.filter(function(e){ return e.out === 1; }).map(function(e){ return e.to; });
        branch = B(' لو الشرط صح ← ' + (t.join('، ') || '—') + '، ولو غلط ← ' + (f.join('، ') || '—') + '.', ' If true → ' + (t.join(', ') || '—') + '; if false → ' + (f.join(', ') || '—') + '.');
      }
      if(subs.length) branch += B(' ومتوصّل بيه: ', ' Connected to it: ') + subs.map(function(e){ return e.from; }).join(B('، ', ', ')) + '.';
      return { n: n, icon: i[0], text: B(i[1], i[2]) + branch };
    });
  }
  // the diagram: node boxes at their n8n positions, curves for the connections
  var NW = 170, NH = 58;
  function draw(wf){
    var E = edges(wf), pos = {};
    var xs = [], ys = [];
    wf.nodes.forEach(function(n){ var p = n.position || [0, 0]; pos[n.name] = { x: p[0], y: p[1], n: n }; xs.push(p[0]); ys.push(p[1]); });
    var minX = Math.min.apply(null, xs.concat([0])) - 40, minY = Math.min.apply(null, ys.concat([0])) - 60;
    var maxX = Math.max.apply(null, xs.concat([0])) + NW + 40, maxY = Math.max.apply(null, ys.concat([0])) + NH + 60;
    var h = '<defs><marker id="wfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="wf-arrow"/></marker></defs>';
    E.forEach(function(e){
      var a = pos[e.from], b = pos[e.to];
      if(!a || !b) return;
      if(e.kind === 'main'){
        var nOut = Math.max(1, (wf.connections[e.from].main || []).length);
        var y1 = a.y + NH * (e.out + 1) / (nOut + 1), x1 = a.x + NW, x2 = b.x, y2 = b.y + NH / 2, dx = Math.max(40, Math.abs(x2 - x1) / 2);
        h += '<path class="wf-edge" d="M' + x1 + ' ' + y1 + 'C' + (x1 + dx) + ' ' + y1 + ' ' + (x2 - dx) + ' ' + y2 + ' ' + x2 + ' ' + y2 + '" marker-end="url(#wfArrow)"/>';
        if(nOut > 1) h += '<text class="wf-out" x="' + (x1 + 6) + '" y="' + (y1 - 4) + '">' + esc(short(a.n.type) === 'if' ? (e.out === 0 ? 'true' : 'false') : String(e.out)) + '</text>';
      }else{
        var sx = a.x + NW / 2, sy = a.y, tx = b.x + NW / 2, ty = b.y + NH;
        h += '<path class="wf-edge ai" d="M' + sx + ' ' + sy + 'C' + sx + ' ' + (sy - 40) + ' ' + tx + ' ' + (ty + 40) + ' ' + tx + ' ' + ty + '"/>' +
          '<text class="wf-out" x="' + (sx + 4) + '" y="' + (sy - 6) + '">' + esc(e.kind.replace(/^ai_/, '')) + '</text>';
      }
    });
    wf.nodes.forEach(function(n, i){
      var p = pos[n.name], k = short(n.type), ic = info(n.type);
      if(k === 'stickyNote'){
        var txt = String((n.parameters && n.parameters.content) || '').replace(/[#*_>`]/g, '').replace(/\s+/g, ' ').trim();
        var w = (n.parameters && n.parameters.width) || 260, hh = Math.min((n.parameters && n.parameters.height) || 120, 200);
        h += '<g class="wf-sticky"><rect x="' + p.x + '" y="' + p.y + '" width="' + w + '" height="' + hh + '" rx="8"/><foreignObject x="' + (p.x + 8) + '" y="' + (p.y + 6) + '" width="' + (w - 16) + '" height="' + (hh - 12) + '"><div xmlns="http://www.w3.org/1999/xhtml" class="wf-sticky-t">' + esc(txt.slice(0, 260)) + '</div></foreignObject></g>';
        return;
      }
      var cls = 'wf-node' + (isTrigger(n) ? ' trig' : '') + (/langchain/.test(n.type) ? ' ai' : '') + (n.disabled ? ' off' : '');
      var name = n.name.length > 20 ? n.name.slice(0, 19) + '…' : n.name, type = k.length > 24 ? k.slice(0, 23) + '…' : k;
      h += '<g class="' + cls + '" data-node="' + i + '" tabindex="0" role="button" aria-label="' + esc(n.name) + '"><rect x="' + p.x + '" y="' + p.y + '" width="' + NW + '" height="' + NH + '" rx="12"/>' +
        '<text class="wf-ic" x="' + (p.x + 24) + '" y="' + (p.y + NH / 2 + 6) + '" text-anchor="middle">' + esc(ic[0]) + '</text>' +
        '<text class="wf-name" x="' + (p.x + 46) + '" y="' + (p.y + 25) + '">' + esc(name) + '</text>' +
        '<text class="wf-type" x="' + (p.x + 46) + '" y="' + (p.y + 43) + '">' + esc(type) + '</text></g>';
    });
    return { svg: h, box: [minX, minY, maxX - minX, maxY - minY] };
  }

  var viewer = null;   // the viewer API, for the templates section to open a template in it
  X.type('workflow', function(el, sec){
    var wf = null, box = null, view = null, sel = -1;
    el.innerHTML =
      '<div class="cat-tabs wf-samples">' + (sec.samples || []).map(function(s){ return '<button type="button" class="cat-tab" data-sample="' + s.id + '">' + esc(L(s.t)) + '</button>'; }).join('') + '</div>' +
      '<details class="wf-paste"><summary>' + esc(B('الصق JSON بتاعك', 'Paste your own JSON')) + '</summary>' +
      '<textarea class="lab-code" rows="6" dir="ltr" spellcheck="false" placeholder="{ &quot;nodes&quot;: [ … ], &quot;connections&quot;: { … } }" aria-label="' + esc(B('JSON الـ Workflow', 'Workflow JSON')) + '"></textarea>' +
      '<div class="jr-actions"><button type="button" class="link-btn" data-show>' + esc(B('اعرضه', 'Show it')) + '</button></div></details>' +
      '<p class="acct-msg" role="alert" data-err></p><div class="wf-out-box" hidden></div>';
    var out = el.querySelector('.wf-out-box'), err = el.querySelector('[data-err]');
    function show(json, title){
      try{ wf = parseWorkflow(json); }catch(e){ err.textContent = e.message || String(e); return; }
      err.textContent = '';
      var d = draw(wf), st = steps(wf), ls = lint(wf);
      box = d.box; view = box.slice(); sel = -1;
      var icons = { ok: '✅', bad: '⛔', warn: '⚠️', tip: '💡' };
      var creds = [];
      wf.nodes.forEach(function(n){ Object.keys(n.credentials || {}).forEach(function(k){ creds.push(k + (n.credentials[k].name ? ' (' + n.credentials[k].name + ')' : '')); }); });
      out.hidden = false;
      out.innerHTML = '<h3 class="sub-h">' + esc(title || wf.name || B('Workflow', 'Workflow')) + ' <span class="sub-note">· ' +
        esc(B(wf.nodes.filter(function(n){ return short(n.type) !== 'stickyNote'; }).length + ' نود', wf.nodes.filter(function(n){ return short(n.type) !== 'stickyNote'; }).length + ' nodes')) + '</span></h3>' +
        '<div class="wf-canvas"><div class="wf-zoom" role="group" aria-label="' + esc(B('التكبير', 'Zoom')) + '"><button type="button" data-z="in" aria-label="' + esc(B('كبّر', 'Zoom in')) + '">+</button><button type="button" data-z="out" aria-label="' + esc(B('صغّر', 'Zoom out')) + '">−</button><button type="button" data-z="fit">' + esc(B('الكل', 'Fit')) + '</button></div>' +
        '<svg class="wf-svg" dir="ltr" role="img" aria-label="' + esc(B('رسمة الـ Workflow', 'Workflow diagram')) + '" viewBox="' + box.join(' ') + '">' + d.svg + '</svg></div>' +
        '<div class="wf-detail" aria-live="polite"></div>' +
        '<div class="learn-grid wf-info"><div class="md-card"><h3>' + esc(B('بيعمل إيه خطوة بخطوة', 'What it does, step by step')) + '</h3><ol class="wf-steps">' +
        st.map(function(s){ return '<li><b>' + esc(s.icon) + ' ' + esc(s.n.name) + '</b> — ' + esc(s.text) + '</li>'; }).join('') + '</ol>' +
        (creds.length ? '<p class="sub-note">' + esc(B('بيستخدم Credentials: ', 'Uses credentials: ')) + '<span dir="ltr">' + esc(creds.join(', ')) + '</span></p>' : '') + '</div>' +
        '<div class="md-card"><h3>' + esc(B('الفحص', 'Checks')) + '</h3><ul class="wf-lint">' + ls.map(function(r){ return '<li class="' + r[0] + '">' + icons[r[0]] + ' ' + S.inline(r[1]) + '</li>'; }).join('') + '</ul>' +
        '<div class="jr-actions"><button type="button" class="ghost-btn" data-copyjson>' + esc(B('انسخ JSON للاستيراد في n8n', 'Copy JSON to import into n8n')) + '</button></div></div></div>';
      bindPan(out.querySelector('.wf-svg'));
    }
    function setView(){ var s = out.querySelector('.wf-svg'); if(s) s.setAttribute('viewBox', view.join(' ')); }
    function zoom(f, cx, cy){
      cx = cx == null ? view[0] + view[2] / 2 : cx; cy = cy == null ? view[1] + view[3] / 2 : cy;
      var w = Math.max(200, Math.min(box[2] * 4, view[2] * f)), h = w * view[3] / view[2];
      view = [cx - (cx - view[0]) * w / view[2], cy - (cy - view[1]) * h / view[3], w, h];
      setView();
    }
    function bindPan(svg){
      var drag = null;
      svg.addEventListener('pointerdown', function(e){ if(e.target.closest('.wf-node')) return; drag = { x: e.clientX, y: e.clientY, v: view.slice() }; try{ svg.setPointerCapture(e.pointerId); }catch(x){} });
      svg.addEventListener('pointermove', function(e){
        if(!drag) return;
        var r = svg.getBoundingClientRect(), k = view[2] / (r.width || 1);
        view = [drag.v[0] - (e.clientX - drag.x) * k, drag.v[1] - (e.clientY - drag.y) * k, view[2], view[3]];
        setView();
      });
      svg.addEventListener('pointerup', function(){ drag = null; });
      svg.addEventListener('wheel', function(e){
        if(!e.ctrlKey && !e.metaKey && !e.altKey) return;   // plain wheel scrolls the page
        e.preventDefault();
        var r = svg.getBoundingClientRect();
        zoom(e.deltaY > 0 ? 1.15 : 1 / 1.15, view[0] + (e.clientX - r.left) / r.width * view[2], view[1] + (e.clientY - r.top) / r.height * view[3]);
      }, { passive: false });
    }
    function detail(i){
      var n = wf.nodes[i], d = out.querySelector('.wf-detail'), ic = info(n.type);
      out.querySelectorAll('.wf-node.sel').forEach(function(g){ g.classList.remove('sel'); });
      var g = out.querySelector('[data-node="' + i + '"]'); if(g) g.classList.add('sel');
      var params = JSON.stringify(n.parameters || {}, null, 2);
      d.innerHTML = '<div class="md-card"><div class="md-top"><h3>' + esc(ic[0] + ' ' + n.name) + '</h3><button type="button" class="acct-x" data-close aria-label="' + esc(B('إغلاق', 'Close')) + '">✕</button></div>' +
        '<p class="sub-note" dir="ltr">' + esc(n.type) + (n.typeVersion ? ' · v' + n.typeVersion : '') + '</p><p>' + esc(B(ic[1], ic[2])) + '</p>' +
        '<pre tabindex="0" class="md-code" dir="ltr"><code>' + esc(params.length > 2500 ? params.slice(0, 2500) + '\n…' : params) + '</code></pre></div>';
    }
    el.addEventListener('click', function(e){
      var t = e.target.closest('button, .wf-node');
      if(!t) return;
      if(t.dataset.sample){
        var s = (sec.samples || []).filter(function(x){ return x.id === t.dataset.sample; })[0];
        el.querySelectorAll('[data-sample]').forEach(function(b){ b.classList.toggle('active', b === t); });
        show(s.json, L(s.t)); return;
      }
      if(t.hasAttribute('data-show')){ el.querySelectorAll('[data-sample]').forEach(function(b){ b.classList.remove('active'); }); show(el.querySelector('textarea').value); return; }
      if(t.dataset.z){ if(t.dataset.z === 'fit'){ view = box.slice(); setView(); } else zoom(t.dataset.z === 'in' ? 1 / 1.3 : 1.3); return; }
      if(t.hasAttribute('data-copyjson')){ S.copy(JSON.stringify({ name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings || {} }, null, 2), t); return; }
      if(t.hasAttribute('data-close')){ out.querySelector('.wf-detail').innerHTML = ''; out.querySelectorAll('.wf-node.sel').forEach(function(g){ g.classList.remove('sel'); }); return; }
      if(t.classList.contains('wf-node')) detail(Number(t.getAttribute('data-node')));
    });
    el.addEventListener('keydown', function(e){
      var g = e.target.closest && e.target.closest('.wf-node');
      if(g && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); detail(Number(g.getAttribute('data-node'))); }
    });
    viewer = { show: function(json, title){ show(json, title); el.closest('section').scrollIntoView({ behavior: 'smooth' }); } };
  });

  // ======================= templates =======================
  X.type('templates', function(el){
    el.innerHTML = '<form class="lib-tools tpl-form"><label class="lib-search"><span>' + esc(B('ابحث في القوالب:', 'Search templates:')) + '</span>' +
      '<input type="search" dir="ltr" autocomplete="off" placeholder="telegram, invoice, AI agent…"></label><button type="submit" class="link-btn">' + esc(B('ابحث', 'Search')) + '</button></form>' +
      '<p class="sub-note" data-msg aria-live="polite"></p><div class="md-grid tpl-grid"></div>';
    var grid = el.querySelector('.tpl-grid'), msg = el.querySelector('[data-msg]'), token = 0;
    function search(q){
      var my = ++token;
      msg.textContent = B('بيدوّر…', 'Searching…');
      fetch('https://api.n8n.io/templates/search?rows=12&page=1&search=' + encodeURIComponent(q)).then(function(r){ if(!r.ok) throw new Error(r.status); return r.json(); }).then(function(j){
        if(my !== token) return;
        var list = j.workflows || [];
        msg.textContent = B('لقينا ' + (j.totalWorkflows || list.length) + ' قالب — دي أول ' + list.length + '.', (j.totalWorkflows || list.length) + ' templates found — here are the first ' + list.length + '.');
        grid.innerHTML = list.map(function(w){
          var nodes = (w.nodes || []).map(function(n){ return n.displayName || short(n.name); }).filter(function(x, i, a){ return x && a.indexOf(x) === i; }).slice(0, 6);
          return '<article class="md-card"><h3 dir="auto">' + esc(w.name) + '</h3><div class="lib-badges">' +
            (w.price ? '<span class="tag">' + esc(B('مدفوع', 'Paid')) + '</span>' : '') + '<span class="tag">👁 ' + Number(w.totalViews || 0).toLocaleString('en') + '</span></div>' +
            (nodes.length ? '<p class="sub-note" dir="ltr">' + esc(nodes.join(' · ')) + '</p>' : '') +
            '<div class="jr-actions">' + (w.price ? '' : '<button type="button" class="link-btn" data-open="' + w.id + '">' + esc(B('افتحه هنا', 'Open it here')) + '</button>') +
            '<a class="ghost-btn" href="https://n8n.io/workflows/' + encodeURIComponent(w.id) + '" target="_blank" rel="noopener">n8n.io ↗</a></div></article>';
        }).join('');
      }).catch(function(){
        if(my !== token) return;
        msg.textContent = B('مقدرناش نوصل لمكتبة القوالب دلوقتي. اتأكد من النت وجرّب تاني.', 'Could not reach the template library right now. Check your connection and try again.');
      });
    }
    el.querySelector('form').addEventListener('submit', function(e){ e.preventDefault(); var q = el.querySelector('input').value.trim(); if(q) search(q); });
    el.addEventListener('click', function(e){
      var b = e.target.closest('[data-open]');
      if(!b) return;
      b.disabled = true;
      fetch('https://api.n8n.io/templates/workflows/' + encodeURIComponent(b.dataset.open)).then(function(r){ return r.json(); }).then(function(j){
        b.disabled = false;
        if(viewer) viewer.show(j, j.workflow && j.workflow.name);
      }).catch(function(){ b.disabled = false; S.toast(B('مقدرناش نحمّل القالب.', 'Could not load the template.')); });
    });
  });

  // ======================= runners =======================
  // JavaScript and expressions: a fresh worker per run, stopped after a few seconds
  var exprSrc = window.labExprInstall ? String(window.labExprInstall) : '';
  function workerSrc(){
    return exprSrc + '\n' + 'try{ importScripts(' + JSON.stringify(CDN.luxon) + '); }catch(e){}\nlabExprInstall(self);\n' +
      'function show(v){ if(v === undefined) return "undefined"; if(typeof v === "string") return v; if(v && v.isLuxonDateTime) return v.toISO(); try{ return JSON.stringify(v, null, 2); }catch(e){ return String(v); } }\n' +
      'function plain(v){ if(v && (v.isLuxonDateTime || (v.d instanceof Date && v.toFormat))) return String(v.toISO ? v.toISO() : v); return v === undefined ? null : JSON.parse(JSON.stringify(v)); }\n' +
      'self.onmessage = function(e){ var m = e.data, logs = [];\n' +
      '  self.console = { log: function(){ logs.push([].map.call(arguments, show).join(" ")); }, error: function(){ logs.push("⛔ " + [].map.call(arguments, show).join(" ")); }, warn: function(){ logs.push("⚠ " + [].map.call(arguments, show).join(" ")); }, info: function(){ logs.push([].map.call(arguments, show).join(" ")); }, table: function(t){ logs.push(show(t)); } };\n' +
      '  try{\n' +
      '    if(m.kind === "expr"){ var v = LAB_EXPR.evaluate(m.code, m.items, 0); postMessage({ ok: true, value: plain(v), text: show(v), type: Array.isArray(v) ? "array" : v === null ? "null" : typeof v, logs: logs }); return; }\n' +
      '    var body = m.code + "\\n;var __r = [];" + (m.tests || []).map(function(t){ return "try{ __r.push({ v: (" + t + ") }); }catch(__e){ __r.push({ e: String(__e) }); }"; }).join("") + "return __r;";\n' +
      '    var r = new Function(body)();\n' +
      '    postMessage({ ok: true, results: r.map(function(x){ return x.e ? x : { v: plain(x.v) }; }), logs: logs });\n' +
      '  }catch(err){ postMessage({ ok: false, error: String(err && err.stack ? err.message : err), line: err && err.lineNumber, logs: logs }); }\n' +
      '};';
  }
  var blobUrl = null;
  function runJS(msg, ms){
    return new Promise(function(resolve){
      if(!blobUrl) blobUrl = URL.createObjectURL(new Blob([workerSrc()], { type: 'text/javascript' }));
      var w = new Worker(blobUrl), done = false;
      var t = setTimeout(function(){ if(done) return; done = true; w.terminate(); resolve({ ok: false, timeout: true, error: B('الكود أخد أكتر من ' + (ms / 1000) + ' ثواني ووقفناه. غالبًا فيه loop مش بيخلص.', 'The code took more than ' + (ms / 1000) + ' seconds and was stopped. There is probably a loop that never ends.'), logs: [] }); }, ms);
      w.onmessage = function(e){ if(done) return; done = true; clearTimeout(t); w.terminate(); resolve(e.data); };
      w.onerror = function(e){ if(done) return; done = true; clearTimeout(t); w.terminate(); resolve({ ok: false, error: e.message, logs: [] }); e.preventDefault(); };
      w.postMessage(msg);
    });
  }
  // Python: one worker that keeps Pyodide loaded; a run that hangs replaces the worker
  var py = null;
  function pyWorker(){
    // a module worker: Pyodide's current builds load as an ES module
    var src = 'import { loadPyodide } from ' + JSON.stringify(CDN.pyodide + 'pyodide.mjs') + ';\n' +
      'var ready = loadPyodide({ indexURL: ' + JSON.stringify(CDN.pyodide) + ' });\n' +
      'self.onmessage = function(e){ ready.then(function(p){ var out = []; p.setStdout({ batched: function(s){ out.push(s); } }); p.setStderr({ batched: function(s){ out.push(s); } });\n' +
      '  try{ p.runPython(e.data.code, { globals: p.toPy({}) }); postMessage({ ok: true, out: out.join("\\n") }); }\n' +
      '  catch(err){ var m = String(err && err.message || err); var lines = m.split("\\n").filter(function(l){ return l && !/^  File "\\/lib|^    |_pyodide|pyodide\\/|Traceback/.test(l); }); postMessage({ ok: false, out: out.join("\\n"), error: lines.slice(-3).join("\\n") || m }); } },\n' +
      '  function(err){ postMessage({ ok: false, load: true, error: String(err) }); }); };\n' +
      'ready.then(function(){ postMessage({ ready: true }); }, function(err){ postMessage({ ok: false, load: true, error: String(err) }); });';
    var w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })), { type: 'module' });
    var st = { w: w, ready: false, wait: [] };
    st.readyP = new Promise(function(res, rej){
      w.onmessage = function(e){
        if(e.data.ready){ st.ready = true; res(); return; }
        if(e.data.load){ rej(new Error(e.data.error)); return; }
        var cb = st.wait.shift(); if(cb) cb(e.data);
      };
      w.onerror = function(e){ rej(new Error(e.message || 'worker')); };
    });
    return st;
  }
  function runPy(code, onStatus){
    if(!py) py = pyWorker();
    var mine = py;
    if(!mine.ready && onStatus) onStatus(B('بيحمّل Python (حوالي 10 ميجا، أول مرة بس)…', 'Loading Python (about 10 MB, first time only)…'));
    return mine.readyP.then(function(){
      return new Promise(function(resolve){
        var done = false;
        var t = setTimeout(function(){ if(done) return; done = true; mine.w.terminate(); if(py === mine) py = null; resolve({ ok: false, error: B('الكود أخد أكتر من 15 ثانية ووقفناه (هنحمّل Python تاني في التشغيل الجاي).', 'The code took more than 15 seconds and was stopped (Python reloads on the next run).') }); }, 15000);
        mine.wait.push(function(r){ if(done) return; done = true; clearTimeout(t); resolve(r); });
        mine.w.postMessage({ code: code });
      });
    }, function(err){ if(py === mine) py = null; return { ok: false, error: B('مقدرناش نحمّل Python. اتأكد من النت وجرّب تاني.', 'Could not load Python. Check your connection and try again.') + ' (' + err.message + ')' }; });
  }
  // SQL: sql.js on the page; the practice database is rebuilt from the section's schema
  var SQLP = null;
  function sqlLib(){
    if(!SQLP) SQLP = S.loadScript(CDN.sqljs + 'sql-wasm.js').then(function(){ return window.initSqlJs({ locateFile: function(f){ return CDN.sqljs + f; } }); });
    return SQLP;
  }
  function freshDb(SQL, schema){ var db = new SQL.Database(); db.run(schema.join('\n')); return db; }
  function sameResult(a, b, ordered){
    function rows(r){ return r ? r.values.map(function(v){ return JSON.stringify(v.map(function(x){ return typeof x === 'number' ? Math.round(x * 100) / 100 : x; })); }) : []; }
    var ra = rows(a), rb = rows(b);
    if(!a || !b) return !a && !b;
    if(a.columns.length !== b.columns.length || ra.length !== rb.length) return false;
    if(!ordered){ ra.sort(); rb.sort(); }
    return ra.every(function(x, i){ return x === rb[i]; });
  }
  function table(r){
    if(!r) return '<p class="sub-note">' + esc(B('الاستعلام اتنفّذ ومرجعش صفوف.', 'The query ran and returned no rows.')) + '</p>';
    return '<div class="sql-wrap"><table class="num-table sql-table" dir="ltr"><tr>' + r.columns.map(function(c){ return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' +
      r.values.slice(0, 200).map(function(v){ return '<tr>' + v.map(function(x){ return '<td>' + esc(x === null ? 'NULL' : x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>' +
      '<p class="sub-note">' + esc(B(r.values.length + ' صف', r.values.length + (r.values.length === 1 ? ' row' : ' rows'))) + '</p>';
  }
  function canon(v){
    if(Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
    if(v && typeof v === 'object') return '{' + Object.keys(v).sort().map(function(k){ return JSON.stringify(k) + ':' + canon(v[k]); }).join(',') + '}';
    return JSON.stringify(v);
  }

  // ======================= playground =======================
  X.type('playground', function(el, sec){
    var lang = sec.lang, items = sec.items || [], cur = items[0], db = null;
    var drafts = lsGet('site_lab_draft', {});
    function solved(it){ var s = S.get('lab')[it.id]; return !!(s && !s.del && s.ok); }
    function draftOf(it){ return drafts[it.id] != null ? drafts[it.id] : it.starter || ''; }
    function saveDraft(){ drafts[cur.id] = el.querySelector('.lab-code.main').value; lsSet('site_lab_draft', drafts); }
    function paint(){
      var n = items.filter(solved).length;
      el.innerHTML = '<div class="lab-head"><label class="lib-filter"><span>' + esc(B('التحدي:', 'Challenge:')) + '</span><select data-pick>' +
        items.map(function(it, i){ return '<option value="' + i + '"' + (it === cur ? ' selected' : '') + '>' + (solved(it) ? '✓ ' : '') + (i + 1) + '. ' + esc(L(it.t)) + '</option>'; }).join('') +
        '</select></label><span class="lab-prog">' + esc(B('حلّيت ' + n + ' من ' + items.length, 'Solved ' + n + ' of ' + items.length)) + '</span></div>' +
        '<div class="progress-bar"><div class="progress-fill" style="width:' + Math.round(n / items.length * 100) + '%"></div></div>' +
        '<div class="md-card lab-task"><div class="md-top"><h3>' + esc(L(cur.t)) + '</h3>' + X.lvl(cur.lvl) + '</div><div class="md-body">' + S.md(cur.task) + '</div>' +
        (lang === 'sql' ? '<details class="ans"><summary>' + esc(B('الجداول', 'The tables')) + '</summary><pre tabindex="0" class="md-code" dir="ltr"><code>' + esc(sec.schema.filter(function(s){ return /^CREATE/.test(s); }).join('\n')) + '</code></pre></details>' : '') + '</div>' +
        (lang === 'expr' ? '<label class="lab-lbl">' + esc(B('البيانات (الـ items اللي داخلة، JSON):', 'The data (incoming items, JSON):')) + '<textarea class="lab-code input" rows="4" dir="ltr" spellcheck="false">' + esc(JSON.stringify(cur.input || [{}], null, 2)) + '</textarea></label>' : '') +
        '<label class="lab-lbl">' + esc(lang === 'expr' ? B('الـ Expression:', 'The expression:') : B('الكود:', 'The code:')) +
        '<textarea class="lab-code main" rows="' + (lang === 'expr' ? 2 : lang === 'sql' ? 5 : 10) + '" dir="ltr" spellcheck="false" autocapitalize="off" autocomplete="off">' + esc(draftOf(cur)) + '</textarea></label>' +
        '<div class="jr-actions"><button type="button" class="link-btn" data-run>▶ ' + esc(B('شغّل', 'Run')) + ' <kbd>Ctrl+Enter</kbd></button>' +
        '<button type="button" class="ghost-btn" data-check>✓ ' + esc(B('اتأكد من الحل', 'Check')) + '</button>' +
        '<button type="button" class="ghost-btn" data-reset>' + esc(B('ابدأ من الأول', 'Start over')) + '</button>' +
        (lang === 'sql' ? '<button type="button" class="ghost-btn" data-resetdb>' + esc(B('رجّع البيانات', 'Reset data')) + '</button>' : '') + '</div>' +
        '<div class="lab-result" aria-live="polite"></div><pre class="lab-out" dir="ltr" hidden></pre><div class="lab-table"></div>' +
        '<details class="ans lab-sol"><summary>' + esc(B('اعرض الحل (بعد ما تحاول)', 'Show the solution (after you try)')) + '</summary><pre tabindex="0" class="md-code" dir="ltr"><code>' + esc(cur.solution) + '</code></pre></details>';
    }
    function result(ok, text){ var r = el.querySelector('.lab-result'); r.className = 'lab-result jr-result ' + (ok ? 'pass' : 'fail'); r.textContent = text; }
    function output(text, isErr){ var o = el.querySelector('.lab-out'); o.hidden = !text; o.textContent = text || ''; o.classList.toggle('err', !!isErr); }
    function pass(){
      if(!solved(cur)) S.setItem('lab', cur.id, { ok: 1 });
      result(true, B('✓ حل صح! ', '✓ Correct! ') + (items.indexOf(cur) < items.length - 1 ? B('روح للتحدي اللي بعده.', 'Move on to the next challenge.') : B('خلّصت كل تحديات القسم ده 🎉', 'You finished every challenge in this section 🎉')));
      var sel = el.querySelector('[data-pick]'); if(sel) sel.options[items.indexOf(cur)].textContent = '✓ ' + (items.indexOf(cur) + 1) + '. ' + L(cur.t);
      var prog = el.querySelector('.lab-prog'), n = items.filter(solved).length;
      if(prog) prog.textContent = B('حلّيت ' + n + ' من ' + items.length, 'Solved ' + n + ' of ' + items.length);
      var f = el.querySelector('.progress-fill'); if(f) f.style.width = Math.round(n / items.length * 100) + '%';
    }
    function run(check){
      saveDraft();
      var code = el.querySelector('.lab-code.main').value;
      el.querySelector('.lab-result').className = 'lab-result'; el.querySelector('.lab-result').textContent = B('بيشتغل…', 'Running…');
      el.querySelector('.lab-table').innerHTML = '';
      if(lang === 'expr'){
        var items0;
        try{ items0 = JSON.parse(el.querySelector('.lab-code.input').value); if(!Array.isArray(items0)) items0 = [items0]; }
        catch(e){ result(false, B('الـ JSON بتاع البيانات فيه غلطة: ', 'The data JSON has an error: ') + e.message); return; }
        runJS({ kind: 'expr', code: code, items: items0 }, 4000).then(function(r){
          if(!r.ok){ output(r.error, true); result(false, B('الـ Expression فيها خطأ.', 'The expression has an error.')); return; }
          output(r.text + '\n\n// ' + B('النوع: ', 'type: ') + r.type);
          if(!check){ el.querySelector('.lab-result').textContent = ''; return; }
          // the check uses the challenge's own data, so editing the data box can't fake a pass
          runJS({ kind: 'expr', code: code, items: cur.input || [{}] }, 4000).then(function(r2){
            var ok = r2.ok && (cur.match ? new RegExp(cur.match).test(String(r2.value)) : canon(r2.value) === canon(cur.expect));
            if(ok) pass(); else result(false, B('لسه مش مطابق. المتوقع: ', 'Not matching yet. Expected: ') + (cur.match ? B('نص بالشكل ', 'text shaped like ') + cur.match : JSON.stringify(cur.expect)) + B(' — نتيجتك: ', ' — yours: ') + (r2.ok ? JSON.stringify(r2.value) : r2.error));
          });
        });
        return;
      }
      if(lang === 'js'){
        runJS({ kind: 'js', code: code, tests: check ? cur.tests.map(function(t){ return t[0]; }) : [] }, 3000).then(function(r){
          output((r.logs || []).join('\n') + (r.ok ? '' : ((r.logs || []).length ? '\n' : '') + '⛔ ' + r.error), !r.ok);
          if(!r.ok){ result(false, r.timeout ? r.error : B('الكود فيه خطأ، اقرا الرسالة تحت.', 'The code has an error; read the message below.')); return; }
          if(!check){ el.querySelector('.lab-result').textContent = (r.logs || []).length ? '' : B('اتنفّذ من غير ما يطبع حاجة. استخدم console.log عشان تشوف قيم.', 'It ran without printing anything. Use console.log to see values.'); return; }
          var bad = [];
          cur.tests.forEach(function(t, i){
            var got = r.results[i];
            if(!got || got.e || canon(got.v) !== canon(t[1])) bad.push(t[0] + ' → ' + B('المتوقع ', 'expected ') + JSON.stringify(t[1]) + B('، طلع ', ', got ') + (got ? (got.e || JSON.stringify(got.v)) : '?'));
          });
          if(!bad.length) pass(); else { result(false, B('فيه ' + bad.length + ' من ' + cur.tests.length + ' حالات مش صح.', bad.length + ' of ' + cur.tests.length + ' cases are wrong.')); output(bad.join('\n'), true); }
        });
        return;
      }
      if(lang === 'py'){
        runPy(code, function(s){ el.querySelector('.lab-result').textContent = s; }).then(function(r){
          output((r.out || '') + (r.ok ? '' : (r.out ? '\n' : '') + '⛔ ' + r.error), !r.ok);
          if(!r.ok){ result(false, B('الكود فيه خطأ، اقرا الرسالة تحت.', 'The code has an error; read the message below.')); return; }
          el.querySelector('.lab-result').textContent = '';
          if(!check) return;
          if(String(r.out || '').trim() === String(cur.out).trim()) pass();
          else result(false, B('اللي اتطبع مش مطابق. المتوقع:\n', 'The printed output does not match. Expected:\n') + cur.out);
        });
        return;
      }
      if(lang === 'sql'){
        sqlLib().then(function(SQL){
          if(!db) db = freshDb(SQL, sec.schema);
          var mine;
          try{ var res = db.exec(code); mine = res[res.length - 1]; }
          catch(e){ output('⛔ ' + e.message, true); result(false, B('الاستعلام فيه خطأ.', 'The query has an error.')); return; }
          output('');
          el.querySelector('.lab-table').innerHTML = table(mine);
          el.querySelector('.lab-result').className = 'lab-result'; el.querySelector('.lab-result').textContent = '';
          if(!check) return;
          // compare on clean copies, so changed data does not decide the result
          var a = freshDb(SQL, sec.schema), b = freshDb(SQL, sec.schema), ra, rb;
          try{ ra = a.exec(code); ra = ra[ra.length - 1]; rb = b.exec(cur.solution); rb = rb[rb.length - 1]; }catch(e){ result(false, e.message); return; }
          finally{ a.close(); b.close(); }
          if(sameResult(ra, rb, /order\s+by/i.test(cur.solution))) pass();
          else { result(false, B('النتيجة مش مطابقة لنتيجة الحل. النتيجة المتوقعة:', 'The result does not match the solution. The expected result:')); el.querySelector('.lab-table').innerHTML += '<h4 class="sub-h">' + esc(B('المتوقع', 'Expected')) + '</h4>' + table(rb); }
        }, function(){ result(false, B('مقدرناش نحمّل SQLite. اتأكد من النت وجرّب تاني.', 'Could not load SQLite. Check your connection and try again.')); });
      }
    }
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      if(b.hasAttribute('data-run')) run(false);
      else if(b.hasAttribute('data-check')) run(true);
      else if(b.hasAttribute('data-reset')){ delete drafts[cur.id]; lsSet('site_lab_draft', drafts); paint(); }
      else if(b.hasAttribute('data-resetdb')){ if(db){ db.close(); db = null; } S.toast(B('البيانات رجعت زي الأول.', 'The data is back to the start.')); }
    });
    el.addEventListener('change', function(e){ if(e.target.hasAttribute('data-pick')){ saveDraft(); cur = items[Number(e.target.value)]; paint(); } });
    el.addEventListener('keydown', function(e){
      if(!e.target.classList || !e.target.classList.contains('lab-code')) return;
      if((e.ctrlKey || e.metaKey) && e.key === 'Enter'){ e.preventDefault(); run(false); return; }
      if(e.key === 'Tab' && !e.shiftKey && e.target.classList.contains('main')){
        e.preventDefault();
        var t = e.target, s = t.selectionStart;
        t.value = t.value.slice(0, s) + '  ' + t.value.slice(t.selectionEnd);
        t.selectionStart = t.selectionEnd = s + 2;
      }
    });
    paint();
  });

  // the pieces tools/test_lab.js checks without a browser
  window.LAB = { parseWorkflow: parseWorkflow, lint: lint, steps: steps, edges: edges, sameResult: sameResult, canon: canon };
})();
