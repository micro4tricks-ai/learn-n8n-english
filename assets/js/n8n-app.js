(function(){
  // translate static page text first, then wire the AR/EN switch
  I18N.translateDOM(document.body);
  I18N.bindToggle();

  var STORE_KEY = 'n8n_plan_v2';
  function freshState(){ return {tasks:{}, terms:{}, proj:{}, cap:{}, skills:{}, sprint:{}, quiz:{}, lib:{}, lastDate:null, streak:0}; }
  function loadState(){
    try{
      var raw = localStorage.getItem(STORE_KEY);
      var s = raw ? JSON.parse(raw) : freshState();
      ['tasks','terms','proj','cap','skills','sprint','quiz','lib'].forEach(function(k){ s[k] = s[k] || {}; });
      return s;
    }catch(e){ return freshState(); }
  }
  function saveState(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} }
  var state = loadState();

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  // `text` in backticks becomes inline code
  function fmt(s){ return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>'); }

  var DAY_NAMES = {sat:T('السبت'), sun:T('الأحد'), mon:T('الاثنين'), tue:T('الثلاثاء'), wed:T('الأربعاء'), thu:T('الخميس'), fri:T('الجمعة')};
  var DAY_ORDER = ['sat','sun','mon','tue','wed','thu','fri'];
  var JS_DAY = ['sun','mon','tue','wed','thu','fri','sat'];
  var todayKey = JS_DAY[new Date().getDay()];


  var D = TDEEP(window.N8N_DATA);
  var REVIEW = D.REVIEW, WEEKS = D.WEEKS, LVL = D.LVL, TRACKS = D.TRACKS, TERMS = D.TERMS, CHEATS = D.CHEATS, ERRORS = D.ERRORS, PROJECTS = D.PROJECTS, CAPSTONE = D.CAPSTONE, SPRINT = D.SPRINT, EXAMPLES = D.EXAMPLES, LIBRARY = D.LIBRARY;

  // ---------------- helpers ----------------
  function taskId(w, k, b, i){ return 'w' + w + '_' + k + '_' + b + '_' + i; }
  function blockTasks(week, k, bi){ return week.days[k][bi][1]; }
  function weekTotals(week){
    var r = {total:0, done:0, a:{t:0,d:0}, b:{t:0,d:0}};
    DAY_ORDER.forEach(function(k){
      [0,1].forEach(function(bi){
        var key = bi === 0 ? 'a' : 'b';
        blockTasks(week, k, bi).forEach(function(_, i){
          var d = state.tasks[taskId(week.n, k, key, i)] ? 1 : 0;
          r.total++; r.done += d; r[key].t++; r[key].d += d;
        });
      });
    });
    return r;
  }
  function firstOpenWeek(){
    for(var i=0;i<WEEKS.length;i++){ var t = weekTotals(WEEKS[i]); if(t.done < t.total) return i; }
    return WEEKS.length - 1;
  }
  function termKey(t){ return 't_' + t.toLowerCase().replace(/[^a-z0-9]+/g,'_'); }
  function $(id){ return document.getElementById(id); }

  var currentWeek = firstOpenWeek();
  var selWeek = currentWeek;
  var selDay = 1;
  var blockFilter = 'all';

  // ---------------- streak + totals ----------------
  function dayStr(d){ return d.toDateString(); }
  function streakShown(){
    var now = new Date(), y = new Date(); y.setDate(y.getDate()-1);
    if(state.lastDate === dayStr(now) || state.lastDate === dayStr(y)) return state.streak || 0;
    return 0;
  }
  function markToday(){
    var now = new Date(), y = new Date(); y.setDate(y.getDate()-1);
    if(state.lastDate === dayStr(now)) return;
    state.streak = (state.lastDate === dayStr(y)) ? (state.streak || 0) + 1 : 1;
    state.lastDate = dayStr(now);
  }
  function pct(d, t){ return t ? Math.round(d / t * 100) : 0; }
  function updateTotals(){
    var T = 0, D = 0, AT = 0, AD = 0, BT = 0, BD = 0;
    WEEKS.forEach(function(w){
      var t = weekTotals(w);
      T += t.total; D += t.done; AT += t.a.t; AD += t.a.d; BT += t.b.t; BD += t.b.d;
    });
    $('totalPct').textContent = pct(D, T) + '%';
    $('n8nPct').textContent = pct(AD, AT) + '%';
    $('langPct').textContent = pct(BD, BT) + '%';
    $('streakNum').textContent = streakShown();
    var sd = 0, stot = 0, qr = 0, qt = 0;
    SPRINT.forEach(function(day){
      var st = dayStats(day);
      sd += st.build + st.quiz + st.chal; stot += st.buildT + st.quizT + 1;
      qr += st.quiz; qt += st.quizT;
    });
    $('sprintPct').textContent = pct(sd, stot) + '%';
    $('quizPct').textContent = pct(qr, qt) + '%';
  }

  // ---------------- journey map ----------------
  function renderMap(){
    var grid = $('mapGrid');
    grid.innerHTML = '';
    WEEKS.forEach(function(w, idx){
      var t = weekTotals(w);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'map-cell' + (idx === selWeek ? ' sel' : '') + (t.done === t.total ? ' done' : '');
      b.setAttribute('aria-label', TF('افتح الأسبوع {n}', {n:w.n}));
      b.innerHTML =
        '<div class="map-top"><span class="map-n">' + TF('الأسبوع {n}', {n:w.n}) + '</span><span class="map-cnt">' + t.done + '/' + t.total + '</span></div>' +
        '<div class="map-row"><span class="tag n8">n8n</span>' + esc(w.n8) + '</div>' +
        '<div class="map-row"><span class="tag lg">' + T('لغة') + '</span>' + esc(w.lg) + '</div>' +
        '<div class="mini-bar"><div class="mini-fill" style="width:' + pct(t.done, t.total) + '%"></div></div>';
      b.addEventListener('click', function(){
        selWeek = idx; focusCtx = {type:'week'}; renderWeek(); renderMap();
        if(window.openSection) openSection('plan'); $('plan').scrollIntoView({behavior:'smooth', block:'start'});
      });
      grid.appendChild(b);
    });
  }

  // ---------------- week view ----------------
  function renderFilter(){
    var row = $('filterRow');
    row.innerHTML = '<span class="lbl">' + T('اعرض:') + '</span>';
    [['all',T(T('الكل'))],['a',T('n8n فقط')],['b',T('اللغة فقط')]].forEach(function(f){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (blockFilter === f[0] ? ' active' : '');
      b.textContent = f[1];
      b.addEventListener('click', function(){ blockFilter = f[0]; renderFilter(); applyFilter(); });
      row.appendChild(b);
    });
  }
  function applyFilter(){
    document.querySelectorAll('#weekGrid .blk').forEach(function(el){
      el.hidden = (blockFilter !== 'all' && el.dataset.blk !== blockFilter);
    });
  }

  function renderWeek(){
    var w = WEEKS[selWeek];
    $('weekHead').innerHTML = '<h3>' + TF('الأسبوع {n}', {n:w.n}) + ': ' + esc(w.title) + '</h3><p>' + esc(w.goal) + '</p>';
    $('spotGrid').innerHTML =
      '<div class="wow-card"><div class="wow-eyebrow">🌟 ' + T('نود الأسبوع') + '</div>' +
        '<div class="wow-term">' + esc(w.node.name) + '</div>' +
        '<div class="wow-mean">' + esc(w.node.mean) + '</div>' +
        '<div class="wow-example">' + esc(w.node.ex) + '</div>' +
        '<div class="wow-example-ar">' + esc(w.node.exAr) + '</div></div>' +
      '<div class="wow-card lang"><div class="wow-eyebrow">💻 ' + T('لغة الأسبوع') + '</div>' +
        '<div class="wow-term">' + esc(w.lang.name) + '</div>' +
        '<div class="wow-mean">' + esc(w.lang.mean) + '</div></div>';

    var grid = $('weekGrid');
    grid.innerHTML = '';
    DAY_ORDER.forEach(function(k){
      var day = w.days[k];
      var allDone = [0,1].every(function(bi){
        var key = bi === 0 ? 'a' : 'b';
        return blockTasks(w, k, bi).every(function(_, i){ return state.tasks[taskId(w.n, k, key, i)]; });
      });
      var isToday = (k === todayKey && selWeek === currentWeek);
      var card = document.createElement('div');
      card.className = 'day-card' + (isToday ? ' today' : '') + (allDone ? ' complete' : '');
      var html = '<div class="day-head"><span class="day-name">' + DAY_NAMES[k] + '</span>' +
        (isToday ? '<span class="today-pill">' + T('النهارده') + '</span>' : '') + '</div>';
      [0,1].forEach(function(bi){
        var key = bi === 0 ? 'a' : 'b';
        html += '<div class="blk ' + key + '" data-blk="' + key + '">' +
          '<div class="blk-head"><span class="tag ' + (bi === 0 ? 'n8' : 'lg') + '">' + (bi === 0 ? 'n8n' : T('لغة')) + '</span>' +
          '<span class="blk-focus">' + esc(day[bi][0]) + '</span></div>';
        blockTasks(w, k, bi).forEach(function(t, i){
          var tid = taskId(w.n, k, key, i);
          html += '<div class="task"><input type="checkbox" id="task_' + tid + '" data-task="' + tid + '"' +
            (state.tasks[tid] ? ' checked' : '') + '><label for="task_' + tid + '">' + fmt(t) + '</label></div>';
        });
        html += '</div>';
      });
      html += '<div class="day-time mono">⏱ ' + (k === 'fri' ? '45 min' : '70 min (40 n8n + 30 lang)') + '</div>';
      card.innerHTML = html;
      grid.appendChild(card);
    });
    applyFilter();
    renderFocus();
  }

  $('weekGrid').addEventListener('change', function(e){
    if(!e.target.matches('input[type=checkbox]')) return;
    state.tasks[e.target.dataset.task] = e.target.checked;
    if(e.target.checked) markToday();
    saveState();
    var card = e.target.closest('.day-card');
    if(card) card.classList.toggle('complete', Array.prototype.every.call(card.querySelectorAll('input[type=checkbox]'), function(c){ return c.checked; }));
    renderMap();
    updateTotals();
  });

  // ---------------- language tracks ----------------
  function trackProgress(tr){
    var d = 0;
    tr.skills.forEach(function(_, i){ if(state.skills['s_' + tr.id + '_' + i]) d++; });
    return d;
  }
  function renderTracks(){
    var grid = $('trackGrid');
    grid.innerHTML = '';
    TRACKS.forEach(function(tr){
      var card = document.createElement('div');
      card.className = 'track-card';
      card.dataset.track = tr.id;
      var html =
        '<div class="track-top"><span class="track-name">' + esc(tr.name) + '</span><span class="lvl ' + tr.lvl + '">' + LVL[tr.lvl] + '</span></div>' +
        '<div class="track-weeks">' + esc(tr.weeks) + '</div>' +
        '<p class="track-why">' + esc(tr.why) + '</p>' +
        '<div class="mini-bar"><div class="mini-fill" style="width:' + pct(trackProgress(tr), tr.skills.length) + '%"></div></div>' +
        '<div class="skill-list">';
      tr.skills.forEach(function(s, i){
        var key = 's_' + tr.id + '_' + i;
        html += '<div class="task"><input type="checkbox" id="sk_' + key + '" data-skill="' + key + '"' + (state.skills[key] ? ' checked' : '') + '>' +
          '<label for="sk_' + key + '">' + esc(s) + '</label></div>';
      });
      html += '</div>';
      card.innerHTML = html;
      grid.appendChild(card);
    });
  }
  $('trackGrid').addEventListener('change', function(e){
    if(!e.target.matches('input[type=checkbox]')) return;
    state.skills[e.target.dataset.skill] = e.target.checked;
    saveState();
    var card = e.target.closest('.track-card');
    var tr = TRACKS.filter(function(x){ return x.id === card.dataset.track; })[0];
    card.querySelector('.mini-fill').style.width = pct(trackProgress(tr), tr.skills.length) + '%';
  });

  // ---------------- quick reference ----------------
  function copyText(txt, btn){
    function done(){ btn.textContent = T('تم ✓'); setTimeout(function(){ btn.textContent = T('نسخ'); }, 1400); }
    function fallback(){
      try{
        var ta = document.createElement('textarea');
        ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        done();
      }catch(e){}
    }
    try{ navigator.clipboard.writeText(txt).then(done, fallback); }catch(e){ fallback(); }
  }
  var activeRef = CHEATS[0].id;
  function renderRef(){
    var tabs = $('refTabs');
    tabs.innerHTML = '';
    CHEATS.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c.id === activeRef ? ' active' : '');
      b.textContent = c.name;
      b.addEventListener('click', function(){ activeRef = c.id; renderRef(); });
      tabs.appendChild(b);
    });
    var cur = CHEATS.filter(function(c){ return c.id === activeRef; })[0];
    var grid = $('refGrid');
    grid.innerHTML = '';
    cur.items.forEach(function(item){
      var card = document.createElement('div');
      card.className = 'phrase-card';
      card.innerHTML =
        '<div class="row"><div class="u">' + esc(item.u) + '</div><button type="button" class="copy-btn">' + T('نسخ') + '</button></div>' +
        '<pre class="code">' + esc(item.p) + '</pre>';
      card.querySelector('.copy-btn').addEventListener('click', function(e){ copyText(item.p, e.currentTarget); });
      grid.appendChild(card);
    });
  }

  // ---------------- glossary ----------------
  function termCard(v, prefix){
    var key = termKey(v.t);
    var card = document.createElement('div');
    card.className = 'vocab-card';
    card.innerHTML =
      '<div><div class="term">' + esc(v.t) + '</div><div class="mean">' + esc(v.m) + '</div>' +
        (v.ex ? '<div class="tex">' + esc(v.ex) + '</div>' : '') + '</div>' +
      '<input type="checkbox" id="' + prefix + '_' + key + '" data-term="' + key + '"' + (state.terms[key] ? ' checked' : '') +
      ' aria-label="' + esc(TF('حفظت {t}', {t:v.t})) + '">';
    return card;
  }
  var cats = [T('الكل')].concat(Array.from(new Set(TERMS.map(function(v){ return v.c; }))));
  var activeCat = T('الكل');
  function renderCatTabs(){
    var el = $('catTabs');
    el.innerHTML = '';
    cats.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activeCat ? ' active' : '');
      b.textContent = c;
      b.addEventListener('click', function(){ activeCat = c; renderCatTabs(); renderTerms(); if(flashOn && flashScope === 'all') buildDeck(); });
      el.appendChild(b);
    });
  }
  function renderTerms(){
    var g = $('vocabGrid');
    g.innerHTML = '';
    var q = ($('termSearch').value || '').trim().toLowerCase();
    TERMS.filter(function(v){
      if(activeCat !== T('الكل') && v.c !== activeCat) return false;
      return !q || (v.t + ' ' + v.m + ' ' + (v.ex || '')).toLowerCase().indexOf(q) !== -1;
    }).forEach(function(v){ g.appendChild(termCard(v, 'main')); });
    updateTermProgress();
  }
  // focus = terms of the sprint day or the plan week the viewer last opened
  var focusCtx = {type:'sprint'};
  function focusList(){
    if(focusCtx.type === 'sprint') return TERMS.filter(function(v){ return v.s === selDay; });
    return TERMS.filter(function(v){ return v.w === WEEKS[selWeek].n; });
  }
  function renderFocus(){
    var g = $('focusGrid');
    if(!g) return;
    g.innerHTML = '';
    var list = focusList();
    list.forEach(function(v){ g.appendChild(termCard(v, 'focus')); });
    $('focusLabel').textContent = (focusCtx.type === 'sprint'
      ? TF('اليوم {d} من الأسبوع المكثّف: {n} مصطلح. غيّر اليوم من فوق وهتتغيّر.', {d:selDay, n:list.length})
      : TF('الأسبوع {w} من خطة الـ 12 أسبوع: {n} مصطلح. غيّر الأسبوع من الخريطة وهتتغيّر.', {w:WEEKS[selWeek].n, n:list.length}));
    if(flashOn) buildDeck();
  }

  // ---------------- flashcards ----------------
  var flashOn = false, deck = [], deckPos = 0, flipped = false, flashScope = 'focus';
  function buildDeck(){
    var src = flashScope === 'focus' ? focusList()
      : TERMS.filter(function(v){ return activeCat === T('الكل') || v.c === activeCat; });
    var unknown = src.filter(function(v){ return !state.terms[termKey(v.t)]; });
    deck = unknown.length ? unknown : src.slice();
    deckPos = 0; flipped = false;
    renderFlash();
  }
  function renderFlash(){
    var card = $('flashCard');
    if(!deck.length){ card.innerHTML = '<div class="f-mean">' + T('مفيش مصطلحات هنا') + '</div>'; $('flashMeta').textContent = ''; return; }
    var v = deck[deckPos % deck.length];
    card.innerHTML = '<div class="f-cat">' + esc(v.c) + '</div><div class="f-term">' + esc(v.t) + '</div>' +
      (flipped
        ? '<div class="f-mean">' + esc(v.m) + '</div>' + (v.ex ? '<div class="f-ex">' + esc(v.ex) + '</div>' : '')
        : '<div class="f-hint">' + T('افتكر المعنى، وبعدين اضغط تقلب البطاقة') + '</div>');
    var left = deck.filter(function(x){ return !state.terms[termKey(x.t)]; }).length;
    $('flashMeta').textContent = TF('بطاقة {i} من {n} · لسه {l} مش محفوظين', {i:(deckPos % deck.length) + 1, n:deck.length, l:left});
  }
  function renderModeRow(){
    var row = $('modeRow');
    row.innerHTML = '';
    [['list',T('عرض القايمة')],['focus',T('بطاقات: مصطلحات اليوم')],['all',T('بطاقات: التصنيف المختار')]].forEach(function(m){
      var on = (m[0] === 'list' && !flashOn) || (flashOn && flashScope === m[0]);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (on ? ' active' : '');
      b.textContent = m[1];
      b.addEventListener('click', function(){
        flashOn = m[0] !== 'list';
        if(flashOn) flashScope = m[0];
        $('flashBox').hidden = !flashOn;
        $('listBox').hidden = flashOn;
        renderModeRow();
        if(flashOn) buildDeck();
      });
      row.appendChild(b);
    });
  }
  $('flashCard').addEventListener('click', function(){ flipped = !flipped; renderFlash(); });
  $('flashNext').addEventListener('click', function(){ deckPos++; flipped = false; renderFlash(); });
  $('flashPrev').addEventListener('click', function(){ deckPos = (deckPos - 1 + deck.length) % Math.max(deck.length, 1); flipped = false; renderFlash(); });
  $('flashShuffle').addEventListener('click', function(){
    for(var i = deck.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = deck[i]; deck[i] = deck[j]; deck[j] = t; }
    deckPos = 0; flipped = false; renderFlash();
  });
  $('flashKnow').addEventListener('click', function(){
    if(!deck.length) return;
    var v = deck[deckPos % deck.length];
    state.terms[termKey(v.t)] = true;
    markToday(); saveState();
    document.querySelectorAll('input[data-term="' + termKey(v.t) + '"]').forEach(function(cb){ cb.checked = true; });
    updateTermProgress(); renderSprintTabs();
    deckPos++; flipped = false; renderFlash();
  });
  function updateTermProgress(){
    var total = TERMS.length;
    var known = TERMS.filter(function(v){ return !!state.terms[termKey(v.t)]; }).length;
    $('vocabFill').style.width = pct(known, total) + '%';
    $('vocabTxt').textContent = TF('{k} من {n} مصطلح محفوظ', {k:known, n:total});
  }
  function onTermChange(e){
    if(!e.target.matches('input[type=checkbox]')) return;
    var key = e.target.dataset.term;
    state.terms[key] = e.target.checked;
    saveState();
    document.querySelectorAll('input[data-term="' + key + '"]').forEach(function(cb){ cb.checked = e.target.checked; });
    updateTermProgress();
  }
  $('vocabGrid').addEventListener('change', onTermChange);
  $('termSearch').addEventListener('input', function(){ renderTerms(); });
  $('focusGrid').addEventListener('change', onTermChange);

  // ---------------- projects ----------------
  function renderProjects(){
    var g = $('projGrid');
    g.innerHTML = '';
    PROJECTS.forEach(function(p){
      var id = 'proj_' + p.w;
      var card = document.createElement('div');
      card.className = 'proj-card';
      card.innerHTML =
        '<input type="checkbox" id="' + id + '" data-proj="' + p.w + '"' + (state.proj[p.w] ? ' checked' : '') + '>' +
        '<label for="' + id + '"><div class="pw">WEEK ' + p.w + '</div><div class="pt">' + esc(p.t) + '</div><div class="pd">' + esc(p.d) + '</div></label>';
      g.appendChild(card);
    });
    var cap = $('capList');
    cap.innerHTML = '';
    CAPSTONE.forEach(function(txt, i){
      var id = 'cap_' + i;
      var row = document.createElement('div');
      row.className = 'task';
      row.innerHTML = '<input type="checkbox" id="' + id + '" data-cap="' + i + '"' + (state.cap[i] ? ' checked' : '') + '>' +
                      '<label for="' + id + '">' + fmt(txt) + '</label>';
      cap.appendChild(row);
    });
  }
  $('projGrid').addEventListener('change', function(e){
    if(!e.target.matches('input[type=checkbox]')) return;
    state.proj[e.target.dataset.proj] = e.target.checked;
    saveState();
  });
  $('capList').addEventListener('change', function(e){
    if(!e.target.matches('input[type=checkbox]')) return;
    state.cap[e.target.dataset.cap] = e.target.checked;
    saveState();
  });

  // ---------------- errors ----------------
  var errCats = [T('الكل')].concat(Array.from(new Set(ERRORS.map(function(e){ return e.c; }))));
  var activeErr = 'n8n';
  function renderErrors(){
    var tabs = $('errTabs');
    tabs.innerHTML = '';
    errCats.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activeErr ? ' active' : '');
      b.textContent = c;
      b.addEventListener('click', function(){ activeErr = c; renderErrors(); });
      tabs.appendChild(b);
    });
    var list = $('errList');
    list.innerHTML = '';
    ERRORS.filter(function(e){ return activeErr === T('الكل') || e.c === activeErr; }).forEach(function(er){
      var card = document.createElement('div');
      card.className = 'err-card';
      card.innerHTML =
        '<div class="msg">' + esc(er.m) + '</div>' +
        '<div class="meaning">' + fmt(er.a) + '</div>' +
        '<div class="cause">' + T('السبب الشائع:') + ' ' + fmt(er.cs) + '</div>' +
        '<div class="fix">' + T('الحل:') + ' ' + fmt(er.f) + '</div>';
      list.appendChild(card);
    });
  }


  // ---------------- sprint ----------------
  function sprintTaskId(d, i){ return 'd' + d + '_' + i; }
  function quizId(d, i){ return 'q' + d + '_' + i; }
  function dayStats(day){
    var bd = day.build.filter(function(_, i){ return state.sprint[sprintTaskId(day.d, i)]; }).length;
    var qr = day.quiz.filter(function(q, i){ return state.quiz[quizId(day.d, i)] === q.a; }).length;
    var chal = state.sprint['d' + day.d + '_ch'] ? 1 : 0;
    return {build:bd, buildT:day.build.length, quiz:qr, quizT:day.quiz.length, chal:chal,
            done: bd === day.build.length && qr >= 4 && chal === 1};
  }
  function firstOpenDay(){
    for(var i = 0; i < SPRINT.length; i++){ if(!dayStats(SPRINT[i]).done) return SPRINT[i].d; }
    return SPRINT.length;
  }
  // a day opens once the day before it is done
  function unlocked(d){ return d === 1 || dayStats(SPRINT[d - 2]).done; }
  function showLockNote(d){
    var n = $('lockNote');
    if(!n){ n = document.createElement('p'); n.id = 'lockNote'; n.className = 'lock-note'; n.setAttribute('aria-live', 'polite'); $('dayTabs').after(n); }
    n.textContent = d ? TF('اليوم {d} لسه مقفول 🔒 خلّص اليوم {p} الأول: كل مهام «ابني» والتحدي، و4 من 5 صح في الاختبار.', {d:d, p:d - 1}) : '';
    n.hidden = !d;
  }
  function renderSprintTabs(){
    var el = $('dayTabs');
    el.innerHTML = '';
    SPRINT.forEach(function(day){
      var st = dayStats(day), open = unlocked(day.d);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'day-tab' + (day.d === selDay ? ' sel' : '') + (st.done ? ' done' : '') + (open ? '' : ' locked');
      if(!open) b.setAttribute('aria-disabled', 'true');
      b.innerHTML = '<span class="dn">' + TF('اليوم {d}', {d:day.d}) + (st.done ? ' ✓' : open ? '' : ' 🔒') + '</span><span class="dt">' + esc(day.short) + '</span>' +
        '<div class="mini-bar"><div class="mini-fill" style="width:' + pct(st.build + st.quiz + st.chal, st.buildT + st.quizT + 1) + '%"></div></div>';
      b.addEventListener('click', function(){
        if(!unlocked(day.d)){ showLockNote(day.d); return; }
        showLockNote(0);
        selDay = day.d; focusCtx = {type:'sprint'};
        renderSprintTabs(); renderSprintDay(); renderFocus();
        quizTab = day.d; renderQuiz();
      });
      el.appendChild(b);
    });
  }
  function renderSprintDay(){
    var day = SPRINT[selDay - 1];
    var st = dayStats(day);
    var h = '<div class="sp-head"><h3>' + TF('اليوم {d}', {d:day.d}) + ': ' + esc(day.title) + '</h3><p>' + esc(day.goal) + '</p>' +
      '<div class="mono">' + esc(day.hours) + ' · build ' + st.build + '/' + st.buildT + ' · quiz ' + st.quiz + '/' + st.quizT + '</div></div>';

    h += '<div class="sp-block"><h4><span class="step">1</span> ' + T('افهم: المفاهيم مع أمثلة') + '</h4><div class="learn-grid">';
    day.learn.forEach(function(l){
      h += '<div class="learn-card"><div class="lh">' + esc(l[0]) + '</div><p class="lp">' + fmt(l[1]) + '</p><pre class="code">' + esc(l[2]) + '</pre></div>';
    });
    h += '</div></div>';

    h += '<div class="sp-block"><h4><span class="step">2</span> ' + T('ابني بإيدك') + '</h4><div class="build-list">';
    day.build.forEach(function(t, i){
      var id = sprintTaskId(day.d, i);
      h += '<div class="task"><input type="checkbox" id="sp_' + id + '" data-sp="' + id + '"' + (state.sprint[id] ? ' checked' : '') + '>' +
        '<label for="sp_' + id + '">' + fmt(t) + '</label></div>';
    });
    h += '</div></div>';

    h += '<div class="sp-block"><h4><span class="step">3</span> ' + T('انسخ وجرّب') + '</h4><div class="phrase-grid" id="spCode"></div></div>';

    h += '<div class="sp-block"><h4><span class="step">4</span> ' + T('مصطلحات اليوم') + '</h4>' +
      '<p class="sub-note">' + TF('{n} مصطلح وجنب كل واحد مثال. راجعهم بالبطاقات في قسم المصطلحات.', {n:TERMS.filter(function(v){ return v.s === day.d; }).length}) + '</p>' +
      '<div class="vocab-grid" id="spTerms"></div></div>';

    var reads = LIBRARY.filter(function(b){ return b.days.indexOf(day.d) !== -1; });
    h += '<div class="sp-block"><h4><span class="step">5</span> ' + T('اقرا (30 دقيقة من المكتبة)') + '</h4><div class="read-list">' +
      reads.map(function(b){
        return '<div class="read-row"><a href="' + esc(b.url) + '" target="_blank" rel="noopener">' + esc(b.t) + ' ↗</a><span>' + fmt(b.read) + '</span></div>';
      }).join('') + '</div></div>';

    var chId = 'd' + day.d + '_ch';
    h += '<div class="sp-block"><h4><span class="step">6</span> ' + T('تحدي اليوم') + '</h4><div class="challenge"><b>' + T('التحدي:') + ' </b>' + fmt(day.challenge) +
      '<div class="task" style="margin-top:10px"><input type="checkbox" id="sp_' + chId + '" data-sp="' + chId + '"' + (state.sprint[chId] ? ' checked' : '') + '>' +
      '<label for="sp_' + chId + '">' + T('خلّصت التحدي من غير ما أبص على حلول جاهزة') + '</label></div></div>' +
      '<button type="button" class="link-btn" id="goQuiz">' + TF('اختبار اليوم {d} ({n} أسئلة)', {d:day.d, n:day.quiz.length}) + ' ' + T('←') + '</button></div>';

    var box = $('sprintDay');
    box.innerHTML = h;

    var cg = $('spCode');
    day.code.forEach(function(item){
      var card = document.createElement('div');
      card.className = 'phrase-card';
      card.innerHTML = '<div class="row"><div class="u">' + esc(item.u) + '</div><button type="button" class="copy-btn">' + T('نسخ') + '</button></div>' +
        '<pre class="code">' + esc(item.p) + '</pre>';
      card.querySelector('.copy-btn').addEventListener('click', function(e){ copyText(item.p, e.currentTarget); });
      cg.appendChild(card);
    });
    var tg = $('spTerms');
    TERMS.filter(function(v){ return v.s === day.d; }).forEach(function(v){ tg.appendChild(termCard(v, 'sp')); });
    tg.addEventListener('change', onTermChange);

    $('goQuiz').addEventListener('click', function(){
      quizTab = day.d; renderQuiz();
      if(window.openSection) openSection('quiz'); $('quiz').scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
  $('sprintDay').addEventListener('change', function(e){
    if(!e.target.matches('input[data-sp]')) return;
    state.sprint[e.target.dataset.sp] = e.target.checked;
    if(e.target.checked) markToday();
    saveState();
    renderSprintTabs(); updateTotals();
  });

  // ---------------- quiz ----------------
  var quizTab = 1;
  function renderQuiz(){
    var tabs = $('quizTabs');
    tabs.innerHTML = '';
    if(typeof quizTab === 'number' && !unlocked(quizTab)) quizTab = selDay;
    [['all',T('كل الأسئلة')]].concat(SPRINT.filter(function(d){ return unlocked(d.d); }).map(function(d){ return [d.d, TF('اليوم {d}', {d:d.d})]; })).concat([['wrong',T('اللي غلطت فيها')]]).forEach(function(t){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (quizTab === t[0] ? ' active' : '');
      b.textContent = t[1];
      b.addEventListener('click', function(){ quizTab = t[0]; renderQuiz(); });
      tabs.appendChild(b);
    });
    var qs = [];
    SPRINT.forEach(function(day){
      if(!unlocked(day.d)) return;
      day.quiz.forEach(function(q, i){
        var id = quizId(day.d, i), ans = state.quiz[id];
        var show = quizTab === 'all' || quizTab === day.d || (quizTab === 'wrong' && ans !== undefined && ans !== q.a);
        if(show) qs.push({q:q, id:id, d:day.d, i:i});
      });
    });
    var answered = qs.filter(function(x){ return state.quiz[x.id] !== undefined; }).length;
    var right = qs.filter(function(x){ return state.quiz[x.id] === x.q.a; }).length;
    var sc = $('quizScore');
    sc.innerHTML = T('النتيجة:') + ' <b>' + right + ' / ' + qs.length + '</b> <span>(' + TF('جاوبت على {n}', {n:answered}) + ')</span>';
    if(typeof quizTab === 'number'){
      sc.innerHTML += right >= 4 ? ' <span style="color:var(--accent-ink)">✓ ' + T('جاهز لليوم اللي بعده') + '</span>'
                                 : ' <span style="color:var(--accent-2)">' + T('محتاج 4 صح على الأقل عشان تنتقل لليوم اللي بعده') + '</span>';
    }
    if(answered){
      var rb = document.createElement('button');
      rb.type = 'button'; rb.className = 'ghost-btn'; rb.textContent = T('امسح الإجابات دي وابدأ من جديد');
      rb.addEventListener('click', function(){
        qs.forEach(function(x){ delete state.quiz[x.id]; });
        saveState(); renderQuiz(); renderSprintTabs(); updateTotals();
      });
      sc.appendChild(rb);
    }
    var list = $('quizList');
    list.innerHTML = '';
    if(!qs.length){ list.innerHTML = '<p class="sub-note">' + T('مفيش أسئلة هنا دلوقتي.') + '</p>'; return; }
    qs.forEach(function(x){
      var ans = state.quiz[x.id];
      var card = document.createElement('div');
      card.className = 'q-card';
      var h = '<div class="qn">DAY ' + x.d + ' · Q' + (x.i + 1) + '</div><div class="qq">' + fmt(x.q.q) + '</div><div class="q-opts">';
      x.q.o.forEach(function(o, oi){
        var cls = '';
        if(ans !== undefined){ if(oi === x.q.a) cls = ' right'; else if(oi === ans) cls = ' wrong'; }
        h += '<button type="button" class="q-opt' + cls + '" data-q="' + x.id + '" data-o="' + oi + '">' + fmt(o) + '</button>';
      });
      h += '</div>';
      if(ans !== undefined) h += '<div class="q-why">' + (ans === x.q.a ? '✓ ' + T('صح.') + ' ' : '✗ ' + T('الإجابة الصح متعلّمة بالأخضر.') + ' ') + fmt(x.q.why) + '</div>';
      card.innerHTML = h;
      list.appendChild(card);
    });
  }
  $('quizList').addEventListener('click', function(e){
    var b = e.target.closest('.q-opt');
    if(!b) return;
    var id = b.dataset.q;
    if(state.quiz[id] !== undefined) return;
    state.quiz[id] = Number(b.dataset.o);
    markToday(); saveState();
    renderQuiz(); renderSprintTabs(); updateTotals();
  });

  // ---------------- worked examples ----------------
  var LVLX = {1:[T('مبتدئ'),'l1'], 2:[T('متوسط'),'l2'], 3:[T('متقدم'),'l3']};
  var exCats = [T('الكل')].concat(Array.from(new Set(EXAMPLES.map(function(x){ return x.cat; }))));
  var activeEx = T('الكل');
  function renderExamples(){
    var tabs = $('exTabs');
    tabs.innerHTML = '';
    exCats.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activeEx ? ' active' : '');
      b.textContent = c;
      b.addEventListener('click', function(){ activeEx = c; renderExamples(); });
      tabs.appendChild(b);
    });
    var g = $('exGrid');
    g.innerHTML = '';
    EXAMPLES.filter(function(x){ return activeEx === T('الكل') || x.cat === activeEx; }).forEach(function(x){
      var d = document.createElement('details');
      d.className = 'ex-card';
      var flow = x.flow.map(function(f){ return '<span class="flow-step">' + esc(f) + '</span>'; }).join('<span class="flow-arrow">' + T('←') + '</span>');
      d.innerHTML =
        '<summary><div class="ex-top"><span class="ex-t">' + esc(x.t) + '</span><span class="ex-lvl ' + LVLX[x.lvl][1] + '">' + LVLX[x.lvl][0] + '</span></div>' +
        '<div class="ex-use">' + esc(x.use) + '</div><div class="ex-more">' + T('افتح الحل') + ' ⌄</div></summary>' +
        '<div class="ex-body"><div class="flow">' + flow + '</div>' +
        '<ol>' + x.steps.map(function(s){ return '<li>' + fmt(s) + '</li>'; }).join('') + '</ol>' +
        '<div class="phrase-card"><div class="row"><div class="u">' + T('الكود / الـ Expression المهم') + '</div><button type="button" class="copy-btn">' + T('نسخ') + '</button></div><pre class="code">' + esc(x.code) + '</pre></div>' +
        '<div class="ex-tip">💡 ' + fmt(x.tip) + '</div></div>';
      d.querySelector('.copy-btn').addEventListener('click', function(e){ copyText(x.code, e.currentTarget); });
      g.appendChild(d);
    });
  }

  // ---------------- library ----------------
  var libCats = [T('الكل'), T('اقراه في الأسبوع المكثّف')].concat(Array.from(new Set(LIBRARY.map(function(b){ return b.c; }))));
  var activeLib = T('الكل');
  function libKey(b){ return 'l_' + b.url.replace(/[^a-z0-9]+/gi, '_').slice(-60); }
  function renderLibTabs(){
    var tabs = $('libTabs');
    tabs.innerHTML = '';
    libCats.forEach(function(c){
      var n = c === T('الكل') ? LIBRARY.length
        : c === T('اقراه في الأسبوع المكثّف') ? LIBRARY.filter(function(b){ return b.days.length; }).length
        : LIBRARY.filter(function(b){ return b.c === c; }).length;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activeLib ? ' active' : '');
      b.innerHTML = esc(c) + ' <span class="cnt">' + n + '</span>';
      b.addEventListener('click', function(){ activeLib = c; renderLibTabs(); renderLibrary(); });
      tabs.appendChild(b);
    });
  }
  function renderLibrary(){
    var q = ($('libSearch').value || '').trim().toLowerCase();
    var list = LIBRARY.filter(function(b){
      if(activeLib === T('اقراه في الأسبوع المكثّف') && !b.days.length) return false;
      if(activeLib !== T('الكل') && activeLib !== T('اقراه في الأسبوع المكثّف') && b.c !== activeLib) return false;
      return !q || [b.t, b.c, b.type, b.lang, b.why, b.read].join(' ').toLowerCase().indexOf(q) !== -1;
    });
    var readN = LIBRARY.filter(function(b){ return state.lib[libKey(b)]; }).length;
    $('libCount').textContent = TF('{n} مصدر ظاهر · قريت {r} من {t}', {n:list.length, r:readN, t:LIBRARY.length});
    var g = $('libGrid');
    g.innerHTML = '';
    list.forEach(function(b){
      var k = libKey(b), done = !!state.lib[k];
      var card = document.createElement('div');
      card.className = 'lib-card' + (done ? ' read' : '');
      card.innerHTML =
        '<div class="lib-top"><div class="lib-t"><a href="' + esc(b.url) + '" target="_blank" rel="noopener">' + esc(b.t) + ' ↗</a></div></div>' +
        '<div class="lib-badges"><span class="badge free">' + esc(b.type) + '</span><span class="badge' + (b.lang === T('عربي') ? ' ar' : '') + '">' + esc(b.lang) + '</span><span class="badge">' + esc(b.lvl) + '</span><span class="badge">' + esc(b.c) + '</span></div>' +
        '<p class="lib-why">' + fmt(b.why) + '</p>' +
        '<div class="lib-read"><b>' + T('اقرا منه:') + ' </b>' + fmt(b.read) + '</div>' +
        (b.days.length ? '<div class="lib-days">Sprint day ' + b.days.join(' · ') + '</div>' : '') +
        '<div class="lib-url">' + esc(b.url.replace(/^https?:\/\//, '')) + '</div>' +
        '<div class="task"><input type="checkbox" id="lib_' + k + '" data-lib="' + k + '"' + (done ? ' checked' : '') + '><label for="lib_' + k + '">' + T('قريت الجزء المطلوب') + '</label></div>';
      g.appendChild(card);
    });
    if(!list.length) g.innerHTML = '<p class="sub-note">' + T('مفيش نتايج. جرّب كلمة تانية.') + '</p>';
  }
  $('libSearch').addEventListener('input', renderLibrary);
  $('libGrid').addEventListener('change', function(e){
    if(!e.target.matches('input[data-lib]')) return;
    state.lib[e.target.dataset.lib] = e.target.checked;
    if(e.target.checked) markToday();
    saveState();
    e.target.closest('.lib-card').classList.toggle('read', e.target.checked);
    renderLibrary();
  });

  // ---------------- nav scroll-spy ----------------
  try{
    var links = Array.prototype.slice.call(document.querySelectorAll('#snav a'));
    var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          links.forEach(function(a){ a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, {rootMargin:'-20% 0px -70% 0px'});
    secs.forEach(function(s){ if(s) io.observe(s); });
    links.forEach(function(a){ a.addEventListener('click', function(){ links.forEach(function(x){ x.classList.toggle('on', x === a); }); }); });
  }catch(e){}

  // ---------------- boot ----------------
  selDay = firstOpenDay();
  quizTab = selDay;
  renderSprintTabs();
  renderSprintDay();
  renderQuiz();
  renderExamples();
  renderLibTabs();
  renderLibrary();
  renderModeRow();
  renderMap();
  renderFilter();
  renderWeek();
  renderTracks();
  renderRef();
  renderCatTabs();
  renderTerms();
  renderProjects();
  renderErrors();
  updateTotals();

  // jump to #section links now that the page content exists
  try{ if(location.hash){ var target = document.getElementById(location.hash.slice(1)); if(target) target.scrollIntoView(); } }catch(e){}
})();
