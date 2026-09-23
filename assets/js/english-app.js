(function(){
  // translate static page text first, then wire the AR/EN switch
  I18N.translateDOM(document.body);
  I18N.bindToggle();

  var STORE_KEY = 'eng_plan_v1';
  function freshState(){ return {tasks:{}, vocab:{}, sprint:{}, quiz:{}, lib:{}, plan:{}, skills:{}, proj:{}, cap:{}, lastDate:null, streak:0}; }
  function loadState(){
    try{
      var raw = localStorage.getItem(STORE_KEY);
      var s = raw ? JSON.parse(raw) : freshState();
      ['tasks','vocab','sprint','quiz','lib','plan','skills','proj','cap'].forEach(function(k){ s[k] = s[k] || {}; });
      return s;
    }catch(e){ return freshState(); }
  }
  function saveState(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} }
  var state = loadState();
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  // `text` in backticks becomes inline code
  function fmt(s){ return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>'); }

  var D = TDEEP(window.EN_DATA);
  var SPRINT = D.SPRINT, VOCAB = D.VOCAB, READINGS = D.READINGS, PHRASES = D.PHRASES, GRAMMAR = D.GRAMMAR, LIBRARY = D.LIBRARY, ERRORS = D.ERRORS, WEEKS = D.WEEKS, CAPSTONE = D.CAPSTONE, TRACKS = D.TRACKS, LVL = D.LVL;

  // ================= helpers =================
  function $(id){ return document.getElementById(id); }
  function pct(d, t){ return t ? Math.round(d / t * 100) : 0; }
  function dayStr(d){ return d.toDateString(); }
  function markToday(){
    var now = new Date(), y = new Date(); y.setDate(y.getDate() - 1);
    if(state.lastDate === dayStr(now)) return;
    state.streak = (state.lastDate === dayStr(y)) ? (state.streak || 0) + 1 : 1;
    state.lastDate = dayStr(now);
  }
  function streakShown(){
    var now = new Date(), y = new Date(); y.setDate(y.getDate() - 1);
    return (state.lastDate === dayStr(now) || state.lastDate === dayStr(y)) ? (state.streak || 0) : 0;
  }
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
  // pronunciation through the browser's built-in voices
  var canSpeak = false;
  try{ canSpeak = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'; }catch(e){}
  function speak(text){
    if(!canSpeak) return;
    try{
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text).replace(/\s*\/\s*/g, ', ').replace(/[()\[\]{}]/g, ' '));
      u.lang = 'en-US'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }catch(e){}
  }
  function speakBtn(text){
    return canSpeak ? '<button type="button" class="speak" data-say="' + esc(text) + '" aria-label="' + esc(TF('انطق {w}', {w:text})) + '">🔊</button>' : '';
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('[data-say]') : null;
    if(b){ e.preventDefault(); speak(b.getAttribute('data-say')); }
  });

  // ================= word of the week (kept) =================
  var daysSinceEpoch = Math.floor(Date.now() / 86400000);
  var realWeekNum = Math.floor(daysSinceEpoch / 7);
  var wordOfWeekList = TDEEP([
    {term:'variable', mean:'متغيّر — مكان بيتخزن فيه قيمة', ex:'A variable stores a value you can use later.', exAr:'المتغيّر بيخزن قيمة تقدر تستخدمها بعدين.'},
    {term:'function', mean:'دالة — كتلة كود بتنفذ مهمة', ex:'This function takes a number and returns its square.', exAr:'الدالة دي بتاخد رقم وبترجع مربعه.'},
    {term:'loop', mean:'حلقة تكرار', ex:'The loop repeats until the list is empty.', exAr:'الحلقة بتتكرر لحد ما القائمة تفضى.'},
    {term:'error', mean:'خطأ', ex:'Read the error message carefully before fixing the code.', exAr:'اقرا رسالة الخطأ كويس قبل ما تصلّح الكود.'},
    {term:'debug', mean:'تصحيح الأخطاء', ex:'I spent an hour debugging this script.', exAr:'قضيت ساعة أصلّح أخطاء السكريبت ده.'},
    {term:'module', mean:'وحدة — ملف بايثون تقدر تستورده', ex:'You need to import the os module first.', exAr:'لازم تستورد وحدة os الأول.'},
    {term:'argument', mean:'وسيط — القيمة اللي بتبعتها للدالة', ex:'Pass the filename as an argument to the function.', exAr:'ابعت اسم الملف كوسيط للدالة.'},
    {term:'exception', mean:'استثناء — خطأ وقت التشغيل', ex:'Use try/except to catch the exception.', exAr:'استخدم try/except عشان تمسك الاستثناء.'},
    {term:'index', mean:'فهرس — رقم موقع العنصر', ex:'"list index out of range" means you asked for an item that does not exist.', exAr:'الرسالة دي معناها إنك طلبت عنصر مش موجود في القائمة.'},
    {term:'dictionary', mean:'قاموس', ex:'A dictionary maps keys to values.', exAr:'القاموس بيربط كل مفتاح بقيمة.'},
    {term:'path', mean:'مسار الملف', ex:'Make sure the file path is correct.', exAr:'اتأكد إن مسار الملف صح.'},
    {term:'deprecated', mean:'قديم وهيتشال', ex:'This method is deprecated. Use the new one instead.', exAr:'التابع ده قديم، استخدم الجديد بداله.'},
    {term:'request', mean:'طلب (من متصفح لسيرفر)', ex:'The script sends a request to the server.', exAr:'السكريبت بيبعت طلب للسيرفر.'},
    {term:'default value', mean:'القيمة الافتراضية', ex:'If you do not pass a value, it uses the default.', exAr:'لو ما بعتّش قيمة، بيستخدم القيمة الافتراضية.'},
    {term:'scope', mean:'نطاق — المتغيّر متاح فين', ex:"A local variable is only visible inside its function's scope.", exAr:'المتغيّر المحلي متاح بس جوه نطاق الدالة بتاعته.'},
    {term:'workaround', mean:'حل مؤقت', ex:'Until the fix is released, use this workaround.', exAr:'لحد ما التصليح ينزل، استخدم الحل المؤقت ده.'},
    {term:'method', mean:'تابع — دالة تخص كائن معين', ex:'Call the .append() method to add an item.', exAr:'نادي على append() عشان تضيف عنصر.'},
    {term:'regex', mean:'التعبير النمطي', ex:'Use a regex pattern to find all phone numbers.', exAr:'استخدم نمط regex عشان تلاقي كل أرقام التليفونات.'},
    {term:'terminal', mean:'الطرفية — نافذة تنفيذ الأوامر', ex:'Open the terminal and type the command.', exAr:'افتح الطرفية واكتب الأمر.'},
    {term:'automation', mean:'أتمتة', ex:'This is a simple example of automation with Python.', exAr:'ده مثال بسيط على الأتمتة باستخدام بايثون.'},
    {term:'schedule', mean:'جدولة مهمة لوقت معين', ex:'You can schedule this script to run every morning.', exAr:'تقدر تجدول السكريبت ده يشتغل كل صباح.'},
    {term:'attachment', mean:'مرفق في الإيميل', ex:'The email includes a PDF attachment.', exAr:'الإيميل فيه مرفق PDF.'},
    {term:'traceback', mean:'تتبع مسار الخطأ', ex:'The traceback shows exactly where the error happened.', exAr:'الـ traceback بيوريك بالظبط الخطأ حصل فين.'},
    {term:'follow up', mean:'يتابع', ex:'I will follow up with the client tomorrow.', exAr:'هتابع مع العميل بكرة.'}
  ]);
  (function(){
    var w = wordOfWeekList[realWeekNum % wordOfWeekList.length];
    $('wowCard').innerHTML =
      '<div class="wow-row"><div>' +
        '<div class="wow-eyebrow">🌟 ' + T('كلمة الأسبوع') + '</div>' +
        '<div style="display:flex;align-items:center;gap:10px;justify-content:flex-end;flex-direction:row-reverse"><div class="wow-term">' + esc(w.term) + '</div>' + speakBtn(w.term) + '</div>' +
        '<div class="wow-mean">' + esc(w.mean) + '</div>' +
      '</div><div>' +
        '<div class="wow-example" style="display:flex;gap:8px;align-items:center;justify-content:space-between"><span>' + esc(w.ex) + '</span>' + speakBtn(w.ex) + '</div>' +
        (LANG === 'ar' ? '<div class="wow-example-ar">' + esc(w.exAr) + '</div>' : '') +
      '</div></div>';
  })();

  // ================= sprint =================
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
  var selDay = firstOpenDay();
  var quizTab = selDay;

  function renderSprintTabs(){
    var el = $('dayTabs');
    el.innerHTML = '';
    SPRINT.forEach(function(day){
      var st = dayStats(day);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'day-tab' + (day.d === selDay ? ' sel' : '') + (st.done ? ' done' : '');
      b.innerHTML = '<span class="dn">' + TF('اليوم {d}', {d:day.d}) + (st.done ? ' ✓' : '') + '</span><span class="dt">' + esc(day.short) + '</span>' +
        '<div class="mini-bar"><div class="mini-fill" style="width:' + pct(st.build + st.quiz + st.chal, st.buildT + st.quizT + 1) + '%"></div></div>';
      b.addEventListener('click', function(){
        selDay = day.d;
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
      '<div class="mono">' + esc(day.hours) + ' · practice ' + st.build + '/' + st.buildT + ' · quiz ' + st.quiz + '/' + st.quizT + '</div></div>';

    h += '<div class="sp-block"><h4><span class="step">1</span> ' + T('افهم: القاعدة مع أمثلة') + '</h4><div class="learn-grid">';
    day.learn.forEach(function(l){
      h += '<div class="learn-card"><div class="lh">' + esc(l[0]) + '</div><p class="lp">' + fmt(l[1]) + '</p><pre class="code">' + esc(l[2]) + '</pre></div>';
    });
    h += '</div></div>';

    h += '<div class="sp-block"><h4><span class="step">2</span> ' + T('اتمرّن بإيدك') + '</h4><div class="build-list">';
    day.build.forEach(function(t, i){
      var id = sprintTaskId(day.d, i);
      h += '<div class="task"><input type="checkbox" id="sp_' + id + '" data-sp="' + id + '"' + (state.sprint[id] ? ' checked' : '') + '>' +
        '<label for="sp_' + id + '">' + fmt(t) + '</label></div>';
    });
    h += '</div></div>';

    h += '<div class="sp-block"><h4><span class="step">3</span> ' + T('انسخ واستخدم') + '</h4><div class="phrase-grid" id="spCode"></div></div>';

    var words = VOCAB.filter(function(v){ return v.s === day.d; });
    h += '<div class="sp-block"><h4><span class="step">4</span> ' + T('كلمات اليوم') + '</h4>' +
      '<p class="sub-note">' + TF('{n} كلمة، وكل كلمة معاها مثال وزرار نطق. راجعهم بالبطاقات في قسم المفردات.', {n:words.length}) + '</p>' +
      '<div class="vocab-grid" id="spTerms"></div></div>';

    var reads = LIBRARY.filter(function(b){ return b.days.indexOf(day.d) !== -1; });
    h += '<div class="sp-block"><h4><span class="step">5</span> ' + T('اقرا واسمع (20 دقيقة من المكتبة)') + '</h4><div class="read-list">' +
      reads.map(function(b){
        return '<div class="read-row"><a href="' + esc(b.url) + '" target="_blank" rel="noopener">' + esc(b.t) + ' ↗</a><span>' + fmt(b.read) + '</span></div>';
      }).join('') + '</div></div>';

    var chId = 'd' + day.d + '_ch';
    h += '<div class="sp-block"><h4><span class="step">6</span> ' + T('تحدي اليوم') + '</h4><div class="challenge"><b>' + T('التحدي:') + ' </b>' + fmt(day.challenge) +
      '<div class="task" style="margin-top:10px"><input type="checkbox" id="sp_' + chId + '" data-sp="' + chId + '"' + (state.sprint[chId] ? ' checked' : '') + '>' +
      '<label for="sp_' + chId + '">' + T('خلّصت التحدي بنفسي من غير مترجم') + '</label></div></div>' +
      '<button type="button" class="link-btn" id="goQuiz">' + TF('اختبار اليوم {d} ({n} أسئلة)', {d:day.d, n:day.quiz.length}) + ' ' + T('←') + '</button></div>';

    $('sprintDay').innerHTML = h;

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
    words.forEach(function(v){ tg.appendChild(vocabCard(v, 'sp')); });
    tg.addEventListener('change', onVocabChange);
    $('goQuiz').addEventListener('click', function(){
      quizTab = day.d; renderQuiz();
      $('quiz').scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
  $('sprintDay').addEventListener('change', function(e){
    if(!e.target.matches('input[data-sp]')) return;
    state.sprint[e.target.dataset.sp] = e.target.checked;
    if(e.target.checked) markToday();
    saveState();
    renderSprintTabs(); updateTotals();
  });

  // ================= quiz =================
  function renderQuiz(){
    var tabs = $('quizTabs');
    tabs.innerHTML = '';
    [['all',T('كل الأسئلة')]].concat(SPRINT.map(function(d){ return [d.d, TF('اليوم {d}', {d:d.d})]; })).concat([['wrong',T('اللي غلطت فيها')]]).forEach(function(t){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (quizTab === t[0] ? ' active' : '');
      b.textContent = t[1];
      b.addEventListener('click', function(){ quizTab = t[0]; renderQuiz(); });
      tabs.appendChild(b);
    });
    var qs = [];
    SPRINT.forEach(function(day){
      day.quiz.forEach(function(q, i){
        var id = quizId(day.d, i), ans = state.quiz[id];
        if(quizTab === 'all' || quizTab === day.d || (quizTab === 'wrong' && ans !== undefined && ans !== q.a)) qs.push({q:q, id:id, d:day.d, i:i});
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

  // ================= readings =================
  var LV = {1:[T('مبتدئ'),'l1'], 2:[T('متوسط'),'l2'], 3:[T('متقدم'),'l3']};
  var rdCats = [T('الكل')].concat(Array.from(new Set(READINGS.map(function(r){ return r.cat; }))));
  var activeRd = T('الكل');
  function renderReadings(){
    var tabs = $('rdTabs');
    tabs.innerHTML = '';
    rdCats.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activeRd ? ' active' : '');
      b.textContent = c;
      b.addEventListener('click', function(){ activeRd = c; renderReadings(); });
      tabs.appendChild(b);
    });
    var g = $('rdGrid');
    g.innerHTML = '';
    READINGS.filter(function(r){ return activeRd === T('الكل') || r.cat === activeRd; }).forEach(function(r){
      var d = document.createElement('details');
      d.className = 'ex-card';
      d.innerHTML =
        '<summary><div class="ex-top"><span class="ex-t">' + esc(r.t) + '</span><span class="ex-lvl ' + LV[r.lvl][1] + '">' + LV[r.lvl][0] + '</span></div>' +
        '<div class="ex-use">' + esc(r.cat) + ' · ' + TF('{k} كلمات مهمة · {q} أسئلة', {k:r.kw.length, q:r.qs.length}) + '</div><div class="ex-more">' + T('افتح النص') + ' ⌄</div></summary>' +
        '<div class="ex-body">' +
          '<div class="passage' + (r.code ? ' code' : '') + '">' + esc(r.text) + '</div>' +
          (canSpeak && !r.code ? '<div><button type="button" class="cat-tab" data-say="' + esc(r.text.replace(/[#*`]/g, '')) + '">🔊 ' + T('اسمع النص') + '</button></div>' : '') +
          '<h4 class="proj-h">' + T('الكلمات المهمة') + '</h4><div class="kw-list">' +
            r.kw.map(function(k){ return '<div class="kw"><b>' + esc(k[0]) + '</b> = ' + esc(k[1]) + '</div>'; }).join('') + '</div>' +
          '<details class="ans"><summary>' + T('المعنى بالعربي') + '</summary><p class="tr">' + esc(r.tr) + '</p></details>' +
          r.qs.map(function(q, i){ return '<details class="ans"><summary>' + TF('سؤال {n}', {n:i + 1}) + ': ' + esc(q[0]) + '</summary><p class="tr">' + esc(q[1]) + '</p></details>'; }).join('') +
        '</div>';
      g.appendChild(d);
    });
  }

  // ================= vocabulary + flashcards =================
  function vocabKey(term){ return 'vocab_' + term.replace(/[^a-zA-Z]/g, ''); }
  function vocabCard(v, prefix){
    var key = vocabKey(v.term);
    var card = document.createElement('div');
    card.className = 'vocab-card';
    card.innerHTML =
      '<div><div class="term">' + esc(v.term) + '</div><div class="mean">' + esc(v.mean) + '</div>' +
        (v.ex ? '<div class="tex">' + esc(v.ex) + '</div>' : '') + '</div>' +
      '<div class="acts">' + speakBtn(v.term) +
      '<input type="checkbox" id="' + prefix + '_' + key + '" data-vocab="' + key + '"' + (state.vocab[key] ? ' checked' : '') + ' aria-label="' + esc(TF('حفظت {t}', {t:v.term})) + '"></div>';
    return card;
  }
  var cats = [T('الكل')].concat(Array.from(new Set(VOCAB.map(function(v){ return v.cat; }))));
  var activeCat = T('الكل');
  function renderCatTabs(){
    var el = $('catTabs');
    el.innerHTML = '';
    cats.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activeCat ? ' active' : '');
      b.textContent = c;
      b.addEventListener('click', function(){ activeCat = c; renderCatTabs(); renderVocab(); if(flashOn && flashScope === 'all') buildDeck(); });
      el.appendChild(b);
    });
  }
  function renderVocab(){
    var g = $('vocabGrid');
    g.innerHTML = '';
    var q = ($('termSearch').value || '').trim().toLowerCase();
    VOCAB.filter(function(v){
      if(activeCat !== T('الكل') && v.cat !== activeCat) return false;
      return !q || (v.term + ' ' + v.mean + ' ' + (v.ex || '')).toLowerCase().indexOf(q) !== -1;
    }).forEach(function(v){ g.appendChild(vocabCard(v, 'main')); });
    updateVocabProgress();
  }
  function focusList(){ return VOCAB.filter(function(v){ return v.s === selDay; }); }
  function renderFocus(){
    var g = $('focusGrid');
    g.innerHTML = '';
    var list = focusList();
    list.forEach(function(v){ g.appendChild(vocabCard(v, 'focus')); });
    $('focusLabel').textContent = TF('اليوم {d} من الأسبوع المكثّف: {n} كلمة. غيّر اليوم من فوق وهتتغيّر.', {d:selDay, n:list.length});
    if(flashOn) buildDeck();
  }
  function updateVocabProgress(){
    var known = VOCAB.filter(function(v){ return !!state.vocab[vocabKey(v.term)]; }).length;
    $('vocabFill').style.width = pct(known, VOCAB.length) + '%';
    $('vocabTxt').textContent = TF('{k} من {n} كلمة محفوظة', {k:known, n:VOCAB.length});
    $('vocabPct').textContent = pct(known, VOCAB.length) + '%';
  }
  function onVocabChange(e){
    if(!e.target.matches('input[data-vocab]')) return;
    var key = e.target.dataset.vocab;
    state.vocab[key] = e.target.checked;
    if(e.target.checked) markToday();
    saveState();
    document.querySelectorAll('input[data-vocab="' + key + '"]').forEach(function(cb){ cb.checked = e.target.checked; });
    updateVocabProgress(); updateTotals();
  }
  $('vocabGrid').addEventListener('change', onVocabChange);
  $('focusGrid').addEventListener('change', onVocabChange);
  $('termSearch').addEventListener('input', renderVocab);

  var flashOn = false, deck = [], deckPos = 0, flipped = false, flashScope = 'focus';
  function buildDeck(){
    var src = flashScope === 'focus' ? focusList()
      : VOCAB.filter(function(v){ return activeCat === T('الكل') || v.cat === activeCat; });
    var unknown = src.filter(function(v){ return !state.vocab[vocabKey(v.term)]; });
    deck = unknown.length ? unknown : src.slice();
    deckPos = 0; flipped = false;
    renderFlash();
  }
  function curCard(){ return deck.length ? deck[deckPos % deck.length] : null; }
  function renderFlash(){
    var card = $('flashCard'), v = curCard();
    if(!v){ card.innerHTML = '<div class="f-mean">' + T('مفيش كلمات هنا') + '</div>'; $('flashMeta').textContent = ''; return; }
    card.innerHTML = '<div class="f-cat">' + esc(v.cat) + '</div><div class="f-term">' + esc(v.term) + '</div>' +
      (flipped
        ? '<div class="f-mean">' + esc(v.mean) + '</div>' + (v.ex ? '<div class="f-ex">' + esc(v.ex) + '</div>' : '')
        : '<div class="f-hint">' + T('افتكر المعنى، وبعدين اضغط تقلب البطاقة') + '</div>');
    var left = deck.filter(function(x){ return !state.vocab[vocabKey(x.term)]; }).length;
    $('flashMeta').textContent = TF('بطاقة {i} من {n} · لسه {l} مش محفوظين', {i:(deckPos % deck.length) + 1, n:deck.length, l:left});
  }
  function renderModeRow(){
    var row = $('modeRow');
    row.innerHTML = '';
    [['list',T('عرض القايمة')],['focus',T('بطاقات: كلمات اليوم')],['all',T('بطاقات: التصنيف المختار')]].forEach(function(m){
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
  $('flashSpeak').hidden = !canSpeak;
  $('flashSpeak').addEventListener('click', function(){ var v = curCard(); if(v) speak(flipped && v.ex ? v.ex : v.term); });
  $('flashKnow').addEventListener('click', function(){
    var v = curCard();
    if(!v) return;
    var key = vocabKey(v.term);
    state.vocab[key] = true;
    markToday(); saveState();
    document.querySelectorAll('input[data-vocab="' + key + '"]').forEach(function(cb){ cb.checked = true; });
    updateVocabProgress(); updateTotals();
    deckPos++; flipped = false; renderFlash();
  });

  // ================= phrases =================
  var phCats = [T('الكل')].concat(Array.from(new Set(PHRASES.map(function(p){ return p.c; }))));
  var activePh = T('الكل');
  function renderPhrases(){
    var tabs = $('phTabs');
    tabs.innerHTML = '';
    phCats.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (c === activePh ? ' active' : '');
      b.textContent = c;
      b.addEventListener('click', function(){ activePh = c; renderPhrases(); });
      tabs.appendChild(b);
    });
    var g = $('phraseGrid');
    g.innerHTML = '';
    PHRASES.filter(function(p){ return activePh === T('الكل') || p.c === activePh; }).forEach(function(ph){
      var card = document.createElement('div');
      card.className = 'phrase-card';
      card.innerHTML = '<div class="row"><div class="u">' + esc(ph.u) + '</div><div style="display:flex;gap:6px">' +
        speakBtn(ph.p.replace(/_+/g, 'blank')) + '<button type="button" class="copy-btn">' + T('نسخ') + '</button></div></div>' +
        '<div class="p" style="margin-top:8px">' + esc(ph.p) + '</div>';
      card.querySelector('.copy-btn').addEventListener('click', function(e){ copyText(ph.p, e.currentTarget); });
      g.appendChild(card);
    });
  }

  // ================= grammar =================
  function renderGrammar(){
    $('grammarGrid').innerHTML = GRAMMAR.map(function(g){
      return '<div class="g-card"><h3>' + esc(g.h) + '</h3><p>' + fmt(g.p) + '</p>' +
        '<div class="g-ex"><span class="bad">✗ ' + esc(g.bad) + '</span><span class="good">✓ ' + esc(g.good) + '</span></div></div>';
    }).join('');
  }

  // ================= library =================
  var libCats = [T('الكل'), T('في الأسبوع المكثّف')].concat(Array.from(new Set(LIBRARY.map(function(b){ return b.c; }))));
  var activeLib = T('الكل');
  function libKey(b){ return 'l_' + b.url.replace(/[^a-z0-9]+/gi, '_').slice(-60); }
  function renderLibTabs(){
    var tabs = $('libTabs');
    tabs.innerHTML = '';
    libCats.forEach(function(c){
      var n = c === T('الكل') ? LIBRARY.length
        : c === T('في الأسبوع المكثّف') ? LIBRARY.filter(function(b){ return b.days.length; }).length
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
      if(activeLib === T('في الأسبوع المكثّف') && !b.days.length) return false;
      if(activeLib !== T('الكل') && activeLib !== T('في الأسبوع المكثّف') && b.c !== activeLib) return false;
      return !q || [b.t, b.c, b.type, b.why, b.read].join(' ').toLowerCase().indexOf(q) !== -1;
    });
    var readN = LIBRARY.filter(function(b){ return state.lib[libKey(b)]; }).length;
    $('libCount').textContent = TF('{n} مصدر ظاهر · استخدمت {r} من {t}', {n:list.length, r:readN, t:LIBRARY.length});
    var g = $('libGrid');
    g.innerHTML = '';
    list.forEach(function(b){
      var k = libKey(b), done = !!state.lib[k];
      var card = document.createElement('div');
      card.className = 'lib-card' + (done ? ' read' : '');
      card.innerHTML =
        '<div class="lib-top"><div class="lib-t"><a href="' + esc(b.url) + '" target="_blank" rel="noopener">' + esc(b.t) + ' ↗</a></div></div>' +
        '<div class="lib-badges"><span class="badge free">' + esc(b.type) + '</span><span class="badge">' + esc(b.lvl) + '</span><span class="badge">' + esc(b.c) + '</span></div>' +
        '<p class="lib-why">' + fmt(b.why) + '</p>' +
        '<div class="lib-read"><b>' + T('استخدمه في:') + ' </b>' + fmt(b.read) + '</div>' +
        (b.days.length ? '<div class="lib-days">Sprint day ' + b.days.join(' · ') + '</div>' : '') +
        '<div class="lib-url">' + esc(b.url.replace(/^https?:\/\//, '')) + '</div>' +
        '<div class="task"><input type="checkbox" id="lib_' + k + '" data-lib="' + k + '"' + (done ? ' checked' : '') + '><label for="lib_' + k + '">' + T('جرّبته / قريت الجزء المطلوب') + '</label></div>';
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
    renderLibrary();
  });

  // ================= errors =================
  $('errList').innerHTML = ERRORS.map(function(er){
    return '<div class="err-card"><div class="msg">' + esc(er.msg) + '</div>' +
      '<div class="meaning">' + fmt(er.meaning) + '</div>' +
      '<div class="cause">' + T('السبب الشائع:') + ' ' + fmt(er.cause) + '</div>' +
      '<div class="fix">' + T('الكلمة المهمة:') + ' <span class="mono">' + esc(er.kw) + '</span></div></div>';
  }).join('');

  // ================= totals =================
  function updateTotals(){
    $('streakNum').textContent = streakShown();
    var sd = 0, stot = 0, qr = 0, qt = 0;
    SPRINT.forEach(function(day){
      var st = dayStats(day);
      sd += st.build + st.quiz + st.chal; stot += st.buildT + st.quizT + 1;
      qr += st.quiz; qt += st.quizT;
    });
    $('sprintPct').textContent = pct(sd, stot) + '%';
    $('quizPct').textContent = pct(qr, qt) + '%';
    $('planPct').textContent = planPct() + '%';
  }

  // ================= nav scroll-spy =================
  try{
    var links = Array.prototype.slice.call(document.querySelectorAll('#snav a'));
    var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting) links.forEach(function(a){ a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, {rootMargin:'-20% 0px -70% 0px'});
    secs.forEach(function(s){ if(s) io.observe(s); });
    links.forEach(function(a){ a.addEventListener('click', function(){ links.forEach(function(x){ x.classList.toggle('on', x === a); }); }); });
  }catch(e){}

  var DAY_NAMES = {sat:T('السبت'), sun:T('الأحد'), mon:T('الاثنين'), tue:T('الثلاثاء'), wed:T('الأربعاء'), thu:T('الخميس'), fri:T('الجمعة')};
  var DAY_ORDER = ['sat','sun','mon','tue','wed','thu','fri'];
  var todayKey = ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()];

  // builds the concrete daily tasks for one week from its data
  function weekDays(w){
    var cat = w.cats.join(LANG === 'en' ? ' & ' : T(' و'));
    return {
      sat:[[T('كلمات الأسبوع'),[TF('افتح بنك المفردات على تصنيف «{c}» واسمع نطق كل كلمة 🔊', {c:cat}),T('راجعهم بالبطاقات وضيف اللي مش حافظه على Anki')]],
           [TF('قاعدة الأسبوع: {g}', {g:w.grammar.name}),[TF('اقرا القاعدة: {r}', {r:w.grammar.rule}),TF('اكتب 5 جمل عن كودك بالقاعدة، زي: `{e}`', {e:w.grammar.ex})]]],
      sun:[[T('قراءة'),[TF('اقرا: {t} — {w}', {t:w.read.t, w:w.read.what}),T('دوّن 8 كلمات جديدة وضيفهم لقاموسك')]],
           [T('القاعدة في النص'),[TF('دوّر في اللي قريته على 5 جمل فيها «{g}» وانسخهم', {g:w.grammar.name}),T('غيّر في كل جملة كلمة واحدة وخليها عن مشروعك')]]],
      mon:[[T('استماع'),[TF('اسمع: {t} — {w}', {t:w.listen.t, w:w.listen.what}),T('اعمل Shadowing لـ 3 جمل منه وسجّل صوتك')]],
           [T('مراجعة الكلمات'),[TF('اختبر نفسك في كلمات «{c}» بالبطاقات لحد ما يفضل 5 كلمات بس', {c:cat}),T('اكتب جملة لكل كلمة من الخمسة')]]],
      tue:[[T('كتابة'),[w.write,T('حط كتابتك في LanguageTool وصلّح الأخطاء واكتب أكتر خطأ اتكرر')]],
           [T('جمل جاهزة'),[T('اختار 3 قوالب من قسم «جمل جاهزة» تناسب موضوع الأسبوع واستخدمهم في كتابتك'),T('احفظهم وقولهم بصوت عالي')]]],
      wed:[[T('كلام ونطق'),[w.speak,T('اسمع التسجيل ودوّن كلمتين تصلّح نطقهم من Cambridge Dictionary')]],
           [T('القاعدة كتابة'),[TF('اكتب فقرة 6 جمل عن يومك في البرمجة بـ «{g}»', {g:w.grammar.name}),T('ارجع لقسم «قواعد المبرمج» وصلّح أي غلطة')]]],
      thu:[[T('قراءة تانية'),[w.read2,T('لخّص اللي قريته في 3 جمل إنجليزي')]],
           [T('مشروع الأسبوع'),[TF('ابدأ في: {t} — {d}', {t:w.project.t, d:w.project.d}),T('خلّص نصه على الأقل النهارده')]]],
      fri:[[T('مراجعة'),[T('راجع كل كلمات الأسبوع: غطّي المعنى وحاول تفتكره من الكلمة بس'),T('جاوب اختبار اليوم المرتبط في قسم «اختبارات» لو لسه ما جاوبتوش')]],
           [T('تسليم'),[TF('خلّص وسلّم: {t}', {t:w.project.t}),T('اكتب 3 جمل: What I learned this week / What was hard / What I will practice next')]]]
    };
  }
  function planId(w, k, b, i){ return 'p' + w + '_' + k + '_' + b + '_' + i; }
  function weekTotals(w){
    var r = {total:0, done:0}, days = weekDays(w);
    DAY_ORDER.forEach(function(k){ [0,1].forEach(function(bi){ days[k][bi][1].forEach(function(_, i){
      r.total++; if(state.plan[planId(w.n, k, bi, i)]) r.done++;
    }); }); });
    return r;
  }
  function firstOpenWeek(){
    for(var i = 0; i < WEEKS.length; i++){ var t = weekTotals(WEEKS[i]); if(t.done < t.total) return i; }
    return WEEKS.length - 1;
  }
  var currentWeek = firstOpenWeek(), selWeek = currentWeek, blockFilter = 'all';

  function renderMap(){
    var grid = $('mapGrid');
    grid.innerHTML = '';
    WEEKS.forEach(function(w, idx){
      var t = weekTotals(w);
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'map-cell' + (idx === selWeek ? ' sel' : '') + (t.done === t.total ? ' done' : '');
      b.innerHTML =
        '<div class="map-top"><span class="map-n">' + TF('الأسبوع {n}', {n:w.n}) + '</span><span class="map-cnt">' + t.done + '/' + t.total + '</span></div>' +
        '<div class="map-row"><span class="tag n8">' + T('مهارة') + '</span>' + esc(w.theme) + '</div>' +
        '<div class="map-row"><span class="tag lg">' + T('قاعدة') + '</span>' + esc(w.grammar.name) + '</div>' +
        '<div class="mini-bar"><div class="mini-fill" style="width:' + pct(t.done, t.total) + '%"></div></div>';
      b.addEventListener('click', function(){
        selWeek = idx; renderWeek(); renderMap();
        $('plan').scrollIntoView({behavior:'smooth', block:'start'});
      });
      grid.appendChild(b);
    });
  }
  function renderFilter(){
    var row = $('filterRow');
    row.innerHTML = '<span class="lbl">' + T('اعرض:') + '</span>';
    [['all',T('الكل')],['0',T('المهارة فقط')],['1',T('الكلمات والقواعد فقط')]].forEach(function(f){
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
    var w = WEEKS[selWeek], days = weekDays(w);
    $('weekHead').innerHTML = '<h3>' + TF('الأسبوع {n}', {n:w.n}) + ': ' + esc(w.theme) + '</h3><p>' + esc(w.goal) + '</p>';
    $('spotGrid').innerHTML =
      '<div class="wow-card"><div class="wow-eyebrow">📐 ' + T('قاعدة الأسبوع') + '</div>' +
        '<div class="wow-term">' + esc(w.grammar.name) + '</div>' +
        '<div class="wow-mean">' + esc(w.grammar.rule) + '</div>' +
        '<div class="wow-example">' + esc(w.grammar.ex) + '</div></div>' +
      '<div class="wow-card lang"><div class="wow-eyebrow">📚 ' + T('مصادر الأسبوع') + '</div>' +
        '<div class="read-list">' +
          '<div class="read-row"><a href="' + esc(w.read.url) + '" target="_blank" rel="noopener">' + esc(w.read.t) + ' ↗</a><span>' + esc(w.read.what) + '</span></div>' +
          '<div class="read-row"><a href="' + esc(w.listen.url) + '" target="_blank" rel="noopener">' + esc(w.listen.t) + ' ↗</a><span>' + esc(w.listen.what) + '</span></div>' +
        '</div><div class="wow-mean">' + T('كلمات الأسبوع:') + ' ' + esc(w.cats.join(LANG === 'en' ? ', ' : T('، '))) + '</div></div>';
    var grid = $('weekGrid');
    grid.innerHTML = '';
    DAY_ORDER.forEach(function(k){
      var day = days[k];
      var allDone = [0,1].every(function(bi){ return day[bi][1].every(function(_, i){ return state.plan[planId(w.n, k, bi, i)]; }); });
      var isToday = (k === todayKey && selWeek === currentWeek);
      var card = document.createElement('div');
      card.className = 'day-card' + (isToday ? ' today' : '') + (allDone ? ' complete' : '');
      var html = '<div class="day-head"><span class="day-name">' + DAY_NAMES[k] + '</span>' + (isToday ? '<span class="today-pill">' + T('النهارده') + '</span>' : '') + '</div>';
      [0,1].forEach(function(bi){
        html += '<div class="blk ' + (bi === 0 ? 'a' : 'b') + '" data-blk="' + bi + '"><div class="blk-head"><span class="tag ' + (bi === 0 ? 'n8' : 'lg') + '">' + (bi === 0 ? T('مهارة') : T('كلمات وقواعد')) + '</span>' +
          '<span class="blk-focus">' + esc(day[bi][0]) + '</span></div>';
        day[bi][1].forEach(function(t, i){
          var id = planId(w.n, k, bi, i);
          html += '<div class="task"><input type="checkbox" id="pl_' + id + '" data-plan="' + id + '"' + (state.plan[id] ? ' checked' : '') + '><label for="pl_' + id + '">' + fmt(t) + '</label></div>';
        });
        html += '</div>';
      });
      html += '<div class="day-time mono">⏱ ' + (k === 'fri' ? '30 min' : '40 min (25 skill + 15 words)') + '</div>';
      card.innerHTML = html;
      grid.appendChild(card);
    });
    applyFilter();
  }
  $('weekGrid').addEventListener('change', function(e){
    if(!e.target.matches('input[data-plan]')) return;
    state.plan[e.target.dataset.plan] = e.target.checked;
    if(e.target.checked) markToday();
    saveState();
    var card = e.target.closest('.day-card');
    if(card) card.classList.toggle('complete', Array.prototype.every.call(card.querySelectorAll('input[type=checkbox]'), function(c){ return c.checked; }));
    renderMap(); updateTotals();
  });

  function renderTracks(){
    var grid = $('trackGrid');
    grid.innerHTML = '';
    TRACKS.forEach(function(tr){
      var done = tr.skills.filter(function(_, i){ return state.skills['s_' + tr.id + '_' + i]; }).length;
      var card = document.createElement('div');
      card.className = 'track-card';
      card.innerHTML =
        '<div class="track-top"><span class="track-name">' + esc(tr.name) + '</span><span class="lvl ' + tr.lvl + '">' + LVL[tr.lvl] + '</span></div>' +
        '<div class="mini-bar"><div class="mini-fill" style="width:' + pct(done, tr.skills.length) + '%"></div></div>' +
        '<div class="skill-list">' + tr.skills.map(function(s, i){
          var key = 's_' + tr.id + '_' + i;
          return '<div class="task"><input type="checkbox" id="sk_' + key + '" data-skill="' + key + '"' + (state.skills[key] ? ' checked' : '') + '><label for="sk_' + key + '">' + esc(s) + '</label></div>';
        }).join('') + '</div>';
      grid.appendChild(card);
    });
  }
  $('trackGrid').addEventListener('change', function(e){
    if(!e.target.matches('input[data-skill]')) return;
    state.skills[e.target.dataset.skill] = e.target.checked;
    saveState(); renderTracks();
  });

  function renderProjects(){
    $('projGrid').innerHTML = WEEKS.map(function(w){
      var id = 'proj_' + w.n;
      return '<div class="proj-card"><input type="checkbox" id="' + id + '" data-proj="' + w.n + '"' + (state.proj[w.n] ? ' checked' : '') + '>' +
        '<label for="' + id + '"><div class="pw">WEEK ' + w.n + '</div><div class="pt">' + esc(w.project.t) + '</div><div class="pd">' + esc(w.project.d) + '</div></label></div>';
    }).join('');
    $('capList').innerHTML = CAPSTONE.map(function(t, i){
      var id = 'cap_' + i;
      return '<div class="task"><input type="checkbox" id="' + id + '" data-cap="' + i + '"' + (state.cap[i] ? ' checked' : '') + '><label for="' + id + '">' + esc(t) + '</label></div>';
    }).join('');
  }
  $('projGrid').addEventListener('change', function(e){
    if(!e.target.matches('input[data-proj]')) return;
    state.proj[e.target.dataset.proj] = e.target.checked; saveState();
  });
  $('capList').addEventListener('change', function(e){
    if(!e.target.matches('input[data-cap]')) return;
    state.cap[e.target.dataset.cap] = e.target.checked; saveState();
  });
  function planPct(){
    var T = 0, D = 0;
    WEEKS.forEach(function(w){ var t = weekTotals(w); T += t.total; D += t.done; });
    return pct(D, T);
  }


  // ================= boot =================
  renderSprintTabs();
  renderSprintDay();
  renderQuiz();
  renderReadings();
  renderModeRow();
  renderFocus();
  renderCatTabs();
  renderVocab();
  renderPhrases();
  renderGrammar();
  renderLibTabs();
  renderLibrary();
  renderMap();
  renderFilter();
  renderWeek();
  renderTracks();
  renderProjects();
  updateTotals();


  // jump to #section links now that the page content exists
  try{ if(location.hash){ var target = document.getElementById(location.hash.slice(1)); if(target) target.scrollIntoView(); } }catch(e){}
})();
