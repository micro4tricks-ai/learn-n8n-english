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
  function saveState(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} if(window.SITE && SITE.touch) SITE.touch(); }
  var state = loadState();

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
  // `text` in backticks becomes inline code
  function fmt(s){ return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>'); }

  var D = TDEEP(window.N8N_DATA);
  var LVL = D.LVL, TRACKS = D.TRACKS, TERMS = D.TERMS, CHEATS = D.CHEATS, ERRORS = D.ERRORS, EXAMPLES = D.EXAMPLES, LIBRARY = D.LIBRARY;
  // words introduced in the journey join the glossary
  ((window.JOURNEY_TERMS || {}).n8n || []).forEach(function(v){
    TERMS.push({c:T('من الرحلة'), t:v.t, m:JOURNEY.L(v.m), ex:JOURNEY.L(v.ex)});
  });

  // ---------------- helpers ----------------
  function termKey(t){ return 't_' + t.toLowerCase().replace(/[^a-z0-9]+/g,'_'); }
  function $(id){ return document.getElementById(id); }


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
    $('streakNum').textContent = streakShown();
    var st = JOURNEY.stats();
    $('journeyPct').textContent = st.pct + '%';
    $('weeksNum').textContent = st.weeks + '/24';
  }

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
        '<pre class="code" tabindex="0">' + esc(item.p) + '</pre>';
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
  // focus = the terms of the journey day the viewer has open
  var focusDay = null, focusWeek = 1;
  function focusList(){
    if(!focusDay) return [];
    return focusDay.words.map(function(w){
      return TERMS.filter(function(v){ return v.t === w.t; })[0] || {t:w.t, m:JOURNEY.L(w.m), ex:w.ex, c:''};
    });
  }
  function renderFocus(){
    var g = $('focusGrid');
    if(!g) return;
    g.innerHTML = '';
    var list = focusList();
    list.forEach(function(v){ g.appendChild(termCard(v, 'focus')); });
    $('focusLabel').textContent = focusDay
      ? TF('الأسبوع {w} · اليوم {d}: {n} مصطلح. بيتغيّروا مع اليوم اللي فاتحه في الرحلة.', {w:focusWeek, d:focusDay.d, n:list.length})
      : T('افتح يوم في الرحلة وهتلاقي مصطلحاته هنا.');
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
    updateTermProgress();
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
        '<div class="phrase-card"><div class="row"><div class="u">' + T('الكود / الـ Expression المهم') + '</div><button type="button" class="copy-btn">' + T('نسخ') + '</button></div><pre class="code" tabindex="0">' + esc(x.code) + '</pre></div>' +
        '<div class="ex-tip">💡 ' + fmt(x.tip) + '</div></div>';
      d.querySelector('.copy-btn').addEventListener('click', function(e){ copyText(x.code, e.currentTarget); });
      g.appendChild(d);
    });
  }

  // ---------------- library ----------------
  var libCats = [T('الكل')].concat(Array.from(new Set(LIBRARY.map(function(b){ return b.c; }))));
  var activeLib = T('الكل');
  function libKey(b){ return 'l_' + b.url.replace(/[^a-z0-9]+/gi, '_').slice(-60); }
  function renderLibTabs(){
    var tabs = $('libTabs');
    tabs.innerHTML = '';
    libCats.forEach(function(c){
      var n = c === T('الكل') ? LIBRARY.length
        : LIBRARY.filter(function(b){ return b.c === c; }).length;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activeLib ? ' active' : '');
      b.innerHTML = esc(c) + ' <span class="cnt">' + n + '</span>';
      b.addEventListener('click', function(){ activeLib = c; renderLibTabs(); renderLibrary(); });
      tabs.appendChild(b);
    });
  }
  // level filter: a range like "Beginner → intermediate" matches both ends; "All levels" matches everything
  var LVRX = { b: /مبتدئ|beginner|A1|A2/i, i: /متوسط|intermediate|B1|B2/i, a: /متقدم|advanced|C1|C2/i };
  function libFilterOk(b){
    var lv = $('libLevel').value, st = $('libStatus').value, lg = $('libLang') ? $('libLang').value : '';
    if(lv && !/كل المستويات|all levels/i.test(b.lvl) && !LVRX[lv].test(b.lvl)) return false;
    if(st && (st === 'done') !== !!state.lib[libKey(b)]) return false;
    if(lg && (lg === 'ar') !== (b.lang === T('عربي'))) return false;
    return true;
  }
  function renderLibrary(){
    var q = ($('libSearch').value || '').trim().toLowerCase();
    var list = LIBRARY.filter(function(b){
      if(activeLib !== T('الكل') && b.c !== activeLib) return false;
      if(!libFilterOk(b)) return false;
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
        '<div class="lib-url">' + esc(b.url.replace(/^https?:\/\//, '')) + '</div>' +
        '<div class="task"><input type="checkbox" id="lib_' + k + '" data-lib="' + k + '"' + (done ? ' checked' : '') + '><label for="lib_' + k + '">' + T('قريت الجزء المطلوب') + '</label></div>';
      g.appendChild(card);
    });
    if(!list.length) g.innerHTML = '<p class="sub-note">' + T('مفيش نتايج. جرّب كلمة تانية.') + '</p>';
  }
  $('libSearch').addEventListener('input', renderLibrary);
  ['libLevel', 'libStatus', 'libLang'].forEach(function(id){ if($(id)) $(id).addEventListener('change', renderLibrary); });
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
  JOURNEY.mount({
    track:'n8n', el:$('journeyApp'), storeKey:'journey_n8n_v1', legacyKey:STORE_KEY,
    copy: copyText,
    onActivity: function(){ markToday(); saveState(); },
    onChange: updateTotals,
    onExternal: updateTotals,
    onDay: function(w, day){ focusDay = day; focusWeek = w.n; renderFocus(); }
  });
  renderExamples();
  renderLibTabs();
  renderLibrary();
  renderModeRow();
  renderTracks();
  renderRef();
  renderCatTabs();
  renderTerms();
  renderErrors();
  renderFocus();
  updateTotals();

  // jump to #section links now that the page content exists
  try{ if(location.hash){ var target = document.getElementById(location.hash.slice(1)); if(target) target.scrollIntoView(); } }catch(e){}
})();
