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
  function saveState(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){} if(window.SITE && SITE.touch) SITE.touch(); }
  var state = loadState();
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
  // `text` in backticks becomes inline code
  function fmt(s){ return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>'); }

  var D = TDEEP(window.EN_DATA);
  var VOCAB = D.VOCAB, READINGS = D.READINGS, PHRASES = D.PHRASES, GRAMMAR = D.GRAMMAR, GRAMMAR_QUIZ = D.GRAMMAR_QUIZ, EXTRA_QUIZ = D.EXTRA_QUIZ, REFS = D.REFS, LIBRARY = D.LIBRARY, ERRORS = D.ERRORS, TRACKS = D.TRACKS, LVL = D.LVL;
  // words introduced in the 24-week journey join the vocabulary bank
  ((window.JOURNEY_TERMS || {}).english || []).forEach(function(v){
    VOCAB.push({cat:T('من رحلة الـ 24 أسبوع'), term:v.t, mean:JOURNEY.L(v.m), ex:JOURNEY.L(v.ex)});
  });

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
  // Male English voices only. Browsers don't report a voice's gender, so it is read from the voice name.
  var MALE = /\b(male|man|david|mark|guy|ryan|george|james|daniel|alex|fred|tom|thomas|aaron|arthur|oliver|rishi|eric|christopher|roger|steffan|brian|andrew|william|liam|connor|mitchell|reed|evan|nathan|ralph|bruce|albert|rocko|grandpa|junior|lee|gordon|jacob|kyle|sam|matthew|noah|luke)\b/i;
  var FEMALE = /\b(female|woman|zira|aria|jenny|samantha|susan|hazel|libby|sonia|emma|ava|allison|karen|moira|tessa|fiona|victoria|kate|serena|michelle|nancy|sara|ana|clara|natasha|catherine|linda|heather|elizabeth|mia|joanna|salli|kimberly|ivy|kendra|amy|olivia|nicole|grandma|shelley|flo|sandy|martha|isla|jane|lily|maisie|ruth)\b/i;
  var VOICE_KEY = 'eng_voice';
  var voices = [], voiceName = '';
  try{ voiceName = localStorage.getItem(VOICE_KEY) || ''; }catch(e){}
  function loadVoices(){
    if(!canSpeak) return;
    var all = window.speechSynthesis.getVoices().filter(function(v){ return /^en[-_]/i.test(v.lang) || v.lang === 'en'; });
    voices = all.filter(function(v){ return MALE.test(v.name) && !FEMALE.test(v.name); });
    var sel = $('voiceSel');
    if(!sel) return;
    sel.innerHTML = voices.length
      ? voices.map(function(v){ return '<option value="' + esc(v.name) + '"' + (v.name === voiceName ? ' selected' : '') + '>' +
          esc(v.name.replace(/^(Microsoft|Google)\s+/, '').replace(/\s+Online.*$/, '').replace(/\s*-\s*English.*$/, '')) + ' · ' + esc(v.lang) + '</option>'; }).join('')
      : '<option value="">' + esc(T('مفيش صوت رجالي في المتصفح ده')) + '</option>';
    sel.disabled = !voices.length;
    if(voices.length && !voices.some(function(v){ return v.name === voiceName; })) voiceName = voices[0].name;
  }
  var playingBtn = null;
  function setPlaying(btn){
    if(playingBtn) playingBtn.classList.remove('playing');
    playingBtn = btn || null;
    if(playingBtn) playingBtn.classList.add('playing');
    var stop = $('stopSpeak');
    if(stop) stop.hidden = !btn && !window.speechSynthesis.speaking;
  }
  function stopSpeaking(){
    try{ window.speechSynthesis.cancel(); }catch(e){}
    setPlaying(null);
    var stop = $('stopSpeak'); if(stop) stop.hidden = true;
  }
  function speak(text, btn){
    if(!canSpeak) return;
    try{
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text).replace(/\s*\/\s*/g, ', ').replace(/[()\[\]{}]/g, ' '));
      var v = voices.filter(function(x){ return x.name === voiceName; })[0] || voices[0];
      if(v){ u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
      u.rate = 0.9;
      var mine = btn || null;
      u.onend = u.onerror = function(){ if(playingBtn === mine) stopSpeaking(); };
      window.speechSynthesis.speak(u);
      setPlaying(btn || null);
      var stop = $('stopSpeak'); if(stop) stop.hidden = false;
    }catch(e){}
  }
  function speakBtn(text){
    return canSpeak ? '<button type="button" class="speak" data-say="' + esc(text) + '" aria-label="' + esc(TF('انطق {w}', {w:text})) + '">🔊</button>' : '';
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('[data-say]') : null;
    if(!b) return;
    e.preventDefault();
    if(b === playingBtn){ stopSpeaking(); return; }   // pressing the same button again stops it
    speak(b.getAttribute('data-say'), b);
  });
  // voice picker + stop button live in the header
  (function(){
    var lb = document.querySelector('.links .lang-btn');
    if(!canSpeak || !lb) return;
    var box = document.createElement('span');
    box.className = 'voice-ctl';
    box.innerHTML = '<label class="sr-only" for="voiceSel">' + esc(T('صوت النطق')) + '</label>' +
      '<select id="voiceSel" title="' + esc(T('صوت النطق')) + '"></select>' +
      '<button type="button" class="stop-btn" id="stopSpeak" hidden>⏹ ' + esc(T('إيقاف الصوت')) + '</button>';
    lb.parentNode.insertBefore(box, lb);
    $('voiceSel').addEventListener('change', function(){
      voiceName = this.value;
      try{ localStorage.setItem(VOICE_KEY, voiceName); }catch(e){}
      speak('Hello, this is my voice.');
    });
    $('stopSpeak').addEventListener('click', stopSpeaking);
    loadVoices();
    try{ window.speechSynthesis.addEventListener('voiceschanged', loadVoices); }catch(e){ window.speechSynthesis.onvoiceschanged = loadVoices; }
  })();

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

  // ================= quiz =================
  var quizTab = 'g';
  function quizId(d, i){ return 'q' + d + '_' + i; }
  function renderQuiz(){
    var tabs = $('quizTabs');
    tabs.innerHTML = '';
    [['g',T('اختبار القواعد')],['x',T('مراجعة شاملة')],['all',T('كل الأسئلة')],['wrong',T('اللي غلطت فيها')]].forEach(function(t){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (quizTab === t[0] ? ' active' : '');
      b.textContent = t[1];
      b.addEventListener('click', function(){ quizTab = t[0]; renderQuiz(); });
      tabs.appendChild(b);
    });
    var qs = [];
    [{d:'g', quiz:GRAMMAR_QUIZ}, {d:'x', quiz:EXTRA_QUIZ}].forEach(function(day){
      day.quiz.forEach(function(q, i){
        var id = quizId(day.d, i), ans = state.quiz[id];
        if(quizTab === 'all' || quizTab === day.d || (quizTab === 'wrong' && ans !== undefined && ans !== q.a)) qs.push({q:q, id:id, d:day.d, i:i});
      });
    });
    var answered = qs.filter(function(x){ return state.quiz[x.id] !== undefined; }).length;
    var right = qs.filter(function(x){ return state.quiz[x.id] === x.q.a; }).length;
    var sc = $('quizScore');
    sc.innerHTML = T('النتيجة:') + ' <b>' + right + ' / ' + qs.length + '</b> <span>(' + TF('جاوبت على {n}', {n:answered}) + ')</span>';
    if(answered){
      var rb = document.createElement('button');
      rb.type = 'button'; rb.className = 'ghost-btn'; rb.textContent = T('امسح الإجابات دي وابدأ من جديد');
      rb.addEventListener('click', function(){
        qs.forEach(function(x){ delete state.quiz[x.id]; });
        saveState(); renderQuiz(); updateTotals();
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
      var h = '<div class="qn">' + (x.d === 'g' ? 'GRAMMAR' : 'REVIEW') + ' · Q' + (x.i + 1) + '</div><div class="qq">' + fmt(x.q.q) + '</div><div class="q-opts">';
      SITE.order(x.q.o.length, 'english:' + x.id).forEach(function(oi){ var o = x.q.o[oi];
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
    // a wrong answer goes to the mistakes notebook, kept in both languages from the Arabic source
    var src = /^qg/.test(id) ? window.EN_DATA.GRAMMAR_QUIZ : window.EN_DATA.EXTRA_QUIZ, raw = src[Number(id.replace(/\D+/g, ''))];
    if(raw && state.quiz[id] !== raw.a && window.SITE && window.I18N){
      var bi = I18N.bi;
      SITE.mistake('english', 'english:quiz-' + id, { q: bi(raw.q), o: raw.o.map(bi), a: raw.a, why: bi(raw.why) }, state.quiz[id],
        /^qg/.test(id) ? { ar: 'اختبار القواعد', en: 'Grammar quiz' } : { ar: 'اختبار المراجعة', en: 'Review quiz' });
    }
    markToday(); saveState();
    renderQuiz(); updateTotals();
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
  // focus = the words of the journey day the viewer has open
  var focusDay = null, focusWeek = 1;
  function focusList(){
    if(!focusDay) return [];
    return focusDay.words.map(function(w){
      return VOCAB.filter(function(v){ return v.term === w.t; })[0] || {term:w.t, mean:JOURNEY.L(w.m), ex:w.ex, cat:''};
    });
  }
  function renderFocus(){
    var g = $('focusGrid');
    g.innerHTML = '';
    var list = focusList();
    list.forEach(function(v){ g.appendChild(vocabCard(v, 'focus')); });
    $('focusLabel').textContent = focusDay
      ? TF('الأسبوع {w} · اليوم {d}: {n} كلمة. بيتغيّروا مع اليوم اللي فاتحه في الرحلة.', {w:focusWeek, d:focusDay.d, n:list.length})
      : T('افتح يوم في الرحلة وهتلاقي كلماته هنا.');
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
  var gTopic = T('الكل');
  function renderGrammar(){
    var ALL = T('الكل');
    var topics = [ALL].concat(Array.from(new Set(GRAMMAR.map(function(g){ return g.c; }))));
    var tabs = $('gTabs');
    if(tabs){
      tabs.innerHTML = '';
      topics.forEach(function(c){
        var n = c === ALL ? GRAMMAR.length : GRAMMAR.filter(function(g){ return g.c === c; }).length;
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'cat-tab' + (c === gTopic ? ' active' : '');
        b.innerHTML = esc(c) + ' <span class="cnt">' + n + '</span>';
        b.addEventListener('click', function(){ gTopic = c; renderGrammar(); });
        tabs.appendChild(b);
      });
    }
    $('grammarGrid').innerHTML = GRAMMAR.filter(function(g){ return gTopic === ALL || g.c === gTopic; }).map(function(g){
      return '<div class="g-card"><span class="badge">' + esc(g.c) + '</span><h3>' + esc(g.h) + '</h3><p>' + fmt(g.p) + '</p>' +
        '<div class="g-ex"><span class="bad">✗ ' + esc(g.bad) + '</span><span class="good">✓ ' + esc(g.good) + '</span></div></div>';
    }).join('');
  }
  (function(){
    var b = $('goGrammarQuiz');
    if(b) b.addEventListener('click', function(){
      quizTab = 'g'; renderQuiz();
      if(window.openSection) openSection('quiz');
      $('quiz').scrollIntoView({behavior:'smooth', block:'start'});
    });
  })();

  // ================= library =================
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
        '<div class="lib-url">' + esc(b.url.replace(/^https?:\/\//, '')) + '</div>' +
        '<div class="task"><input type="checkbox" id="lib_' + k + '" data-lib="' + k + '"' + (done ? ' checked' : '') + '><label for="lib_' + k + '">' + T('جرّبته / قريت الجزء المطلوب') + '</label></div>';
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
    renderLibrary();
  });

  // ================= errors =================
  var errGroups = Array.from(new Set(ERRORS.map(function(er){ return er.g; })));
  var activeErr = errGroups[0];
  function renderErrors(){
    var tabs = $('errTabs');
    tabs.innerHTML = '';
    errGroups.forEach(function(g){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'cat-tab' + (g === activeErr ? ' active' : '');
      b.innerHTML = esc(g) + ' <span class="cnt">' + ERRORS.filter(function(er){ return er.g === g; }).length + '</span>';
      b.addEventListener('click', function(){ activeErr = g; renderErrors(); });
      tabs.appendChild(b);
    });
    $('errList').innerHTML = ERRORS.filter(function(er){ return er.g === activeErr; }).map(function(er){
      return '<div class="err-card"><div class="msg" style="white-space:pre-wrap">' + esc(er.msg) + '</div>' +
        '<div class="meaning">' + fmt(er.meaning) + '</div>' +
        '<div class="cause">' + T('السبب الشائع:') + ' ' + fmt(er.cause) + '</div>' +
        (er.fix ? '<div class="cause">' + T('الحل:') + ' ' + fmt(er.fix) + '</div>' : '') +
        '<div class="fix">' + T('الكلمة المهمة:') + ' <span class="mono">' + esc(er.kw) + '</span></div></div>';
    }).join('');
  }
  renderErrors();

  // ================= references =================
  function renderRefs(){
    var n = 0;
    $('refList').innerHTML = REFS.map(function(g){
      return '<div class="ref-group"><h3 class="sub-h">' + esc(g[0]) + '</h3><ol class="ref-list" start="' + (n + 1) + '">' +
        g[1].map(function(r){ n++;
          return '<li><a href="' + esc(r[2]) + '" target="_blank" rel="noopener">' + esc(r[0]) + '</a> — <span class="mono" style="font-size:13px">' + esc(r[1]) + '</span><span class="rs">' + esc(r[3]) + '</span></li>';
        }).join('') + '</ol></div>';
    }).join('') + '<p class="sub-note">' + TF('المكتبة فيها {n} مصدر إضافي. أسماء المنصات والأدوات ملك أصحابها، والصفحة دي مش تابعة لأي جهة منهم.', {n:LIBRARY.length}) + '</p>';
  }
  renderRefs();

  // ================= totals =================
  function updateTotals(){
    $('streakNum').textContent = streakShown();
    var st = JOURNEY.stats();
    $('journeyPct').textContent = st.pct + '%';
    $('weeksNum').textContent = st.weeks + '/24';
    var qs = GRAMMAR_QUIZ.map(function(q, i){ return [q, quizId('g', i)]; }).concat(EXTRA_QUIZ.map(function(q, i){ return [q, quizId('x', i)]; }));
    $('quizPct').textContent = pct(qs.filter(function(x){ return state.quiz[x[1]] === x[0].a; }).length, qs.length) + '%';
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

  // ================= boot =================
  JOURNEY.mount({
    track:'english', el:$('journeyApp'), storeKey:'journey_english_v1', legacyKey:STORE_KEY,
    copy: copyText,
    wordActions: function(w){ return speakBtn(w.t); },
    onActivity: function(){ markToday(); saveState(); },
    onChange: updateTotals,
    onExternal: updateTotals,
    onDay: function(w, day){ focusDay = day; focusWeek = w.n; renderFocus(); }
  });
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
  renderTracks();
  updateTotals();

  // jump to #section links now that the page content exists
  try{ if(location.hash){ var target = document.getElementById(location.hash.slice(1)); if(target) target.scrollIntoView(); } }catch(e){}
})();
