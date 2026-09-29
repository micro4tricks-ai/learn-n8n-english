/* review.html: spaced review (FSRS via vendor/ts-fsrs), the mistakes notebook, stats and backup.
 * Review cards come from assets/data/deck.js (built by tools/build_index.js); their schedule is the
 * `srs` store, mistakes the `mistakes` store (both synced with the account, see site.js). */
(function(){
  var S = window.SITE, X = window.SECTIONS, B = S.B, L = S.L, esc = S.esc;
  var F = window.FSRS;
  function fmt(x){ return S.inline(x); }
  function lsGet(k, d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; }catch(e){ return d; } }
  function lsSet(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  var DECKS = [
    { id: 'english', t: ['كلمات الإنجليزي', 'English words'] },
    { id: 'n8n', t: ['مصطلحات n8n', 'n8n terms'] },
    { id: 'grammar', t: ['قواعد الجرامر', 'Grammar rules'] }
  ];

  // ---------------- today's review ----------------
  X.type('srs', function(el){
    var sched = F ? F.fsrs(F.generatorParameters({ enable_fuzz: true, request_retention: 0.9, maximum_interval: 365 })) : null;
    var prefs = lsGet('site_review_prefs', { decks: { english: true, n8n: true, grammar: false }, perDay: 15 });
    var deck = null, byId = {}, queue = [], cur = null, shown = false, again = [];
    function log(){ var l = lsGet('site_review_log', {}); return l[S.today()] || { n: 0, fresh: 0, again: 0 }; }
    function bump(rating, fresh){
      var l = lsGet('site_review_log', {}), d = S.today(), x = l[d] || { n: 0, fresh: 0, again: 0 };
      x.n++; if(fresh) x.fresh++; if(rating === 1) x.again++;
      l[d] = x;
      var keys = Object.keys(l).sort(); while(keys.length > 120) delete l[keys.shift()];
      lsSet('site_review_log', l);
    }
    function card(c){
      var o = Object.assign({}, c);
      o.due = new Date(c.due);
      if(c.last_review) o.last_review = new Date(c.last_review);
      return o;
    }
    function state(){ return S.get('srs'); }
    function build(){
      var st = state(), now = Date.now(), on = prefs.decks;
      var due = [], fresh = [];
      deck.forEach(function(d){
        if(!on[d.tr]) return;
        var s = st[d.id];
        if(s && !s.del){ if(new Date(s.c.due).getTime() <= now) due.push({ d: d, due: new Date(s.c.due).getTime() }); }
        else fresh.push(d);
      });
      due.sort(function(a, b){ return a.due - b.due; });
      // new cards: the journey's words first (by week), then the rest in bank order
      fresh.sort(function(a, b){ return (a.w || 99) - (b.w || 99); });
      var room = Math.max(0, (prefs.perDay || 0) - log().fresh);
      queue = due.map(function(x){ return x.d; }).concat(fresh.slice(0, room));
      again = [];
      cur = null; shown = false;
    }
    function ivl(ms){
      var m = Math.round(ms / 60000);
      if(m < 60) return B(Math.max(1, m) + ' د', Math.max(1, m) + 'm');
      var h = Math.round(m / 60);
      if(h < 24) return B(h + ' س', h + 'h');
      var d = Math.round(h / 24);
      if(d < 31) return B(d + ' يوم', d + 'd');
      return B(Math.round(d / 30) + ' شهر', Math.round(d / 30) + 'mo');
    }
    function next(){
      var now = Date.now();
      // learning cards that came back due during the session go before the rest
      again.sort(function(a, b){ return a.due - b.due; });
      if(again.length && again[0].due <= now){ cur = again.shift().d; }
      else cur = queue.shift() || (again.length ? again.shift().d : null);
      shown = false;
      paint();
    }
    function counts(){
      var st = state(), on = prefs.decks, now = Date.now(), dueN = 0, learned = 0, tomorrow = 0, t = new Date(); t.setHours(24 + 23, 59, 59, 0);
      deck.forEach(function(d){
        var s = st[d.id];
        if(!on[d.tr] || !s || s.del) return;
        learned++;
        var due = new Date(s.c.due).getTime();
        if(due <= now) dueN++; else if(due <= t.getTime()) tomorrow++;
      });
      return { due: dueN, learned: learned, tomorrow: tomorrow };
    }
    function bar(){
      var c = counts(), l = log();
      return '<div class="srs-bar"><div class="srs-decks" role="group" aria-label="' + esc(B('البطاقات اللي بتراجعها', 'Cards you review')) + '">' +
        DECKS.map(function(d){ return '<button type="button" class="cat-tab' + (prefs.decks[d.id] ? ' active' : '') + '" data-deck="' + d.id + '" aria-pressed="' + !!prefs.decks[d.id] + '">' + esc(B(d.t[0], d.t[1])) + '</button>'; }).join('') +
        '</div><label class="lib-filter"><span>' + esc(B('بطاقات جديدة في اليوم:', 'New cards a day:')) + '</span><select data-perday>' +
        [0, 5, 10, 15, 20, 30, 50].map(function(n){ return '<option value="' + n + '"' + (n === prefs.perDay ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label></div>' +
        '<p class="srs-counts" aria-live="polite">' + esc(B(
          'راجعت النهارده ' + l.n + ' · جديد النهارده ' + l.fresh + '/' + prefs.perDay + ' · مستحق دلوقتي ' + c.due + ' · في مراجعتك ' + c.learned + ' بطاقة · بكرة ' + c.tomorrow,
          'Reviewed today ' + l.n + ' · new today ' + l.fresh + '/' + prefs.perDay + ' · due now ' + c.due + ' · ' + c.learned + ' cards in review · tomorrow ' + c.tomorrow)) + '</p>';
    }
    function paint(){
      if(!deck){ el.innerHTML = '<p class="sub-note" aria-live="polite">' + esc(B('بيحمّل البطاقات…', 'Loading the cards…')) + '</p>'; return; }
      var h = bar();
      if(!sched){ el.innerHTML = h + '<p class="lock-note">' + esc(B('مكتبة المراجعة ما اتحمّلتش. حدّث الصفحة.', 'The review library did not load. Reload the page.')) + '</p>'; return; }
      if(!cur){
        var c = counts();
        h += '<div class="srs-card done"><p class="srs-front">🎉 ' + esc(B('خلّصت مراجعة النهارده', "You're done for today")) + '</p><p class="sub-note">' +
          esc(B('بكرة مستنيك ' + c.tomorrow + ' بطاقة. تقدر تزوّد عدد البطاقات الجديدة من فوق لو عايز تكمّل.', c.tomorrow + ' cards are waiting tomorrow. Raise the new cards a day above to keep going.')) + '</p></div>';
        el.innerHTML = h; return;
      }
      var s = state()[cur.id], fresh = !s || s.del, isWord = cur.tr !== 'grammar';
      h += '<div class="srs-card" data-card><div class="srs-meta"><span class="tag">' + esc(B(DECKS.filter(function(d){ return d.id === cur.tr; })[0].t[0], DECKS.filter(function(d){ return d.id === cur.tr; })[0].t[1])) + '</span>' +
        (cur.c ? '<span class="tag">' + esc(L(cur.c)) + '</span>' : '') + (fresh ? '<span class="tag new">' + esc(B('جديدة', 'New')) + '</span>' : '') +
        '<span class="srs-left">' + esc(B('فاضل ' + (queue.length + again.length + 1), (queue.length + again.length + 1) + ' left')) + '</span></div>' +
        '<div class="srs-front"' + (isWord ? ' dir="ltr" lang="en"' : '') + '>' + esc(L(cur.t)) +
        (isWord && S.canSpeak && cur.tr === 'english' ? ' <button type="button" class="speak" data-say aria-label="' + esc(B('انطق', 'Pronounce')) + '">🔊</button>' : '') + '</div>';
      if(!shown){
        h += '<button type="button" class="link-btn srs-show" data-show>' + esc(B('اعرض الإجابة', 'Show the answer')) + ' <kbd>Space</kbd></button>';
      }else{
        var prev = sched.repeat(s && !s.del ? card(s.c) : F.createEmptyCard(new Date()), new Date());
        h += '<div class="srs-back"><p class="srs-mean">' + fmt(cur.m) + '</p>' +
          (cur.ex ? '<p class="srs-ex" dir="ltr">' + esc(L(cur.ex)).replace(/\n/g, '<br>') + '</p>' : '') + '</div>' +
          '<div class="srs-rate" role="group" aria-label="' + esc(B('افتكرتها إزاي؟', 'How well did you recall it?')) + '">' +
          [[1, 'نسيتها', 'Again'], [2, 'صعبة', 'Hard'], [3, 'تمام', 'Good'], [4, 'سهلة', 'Easy']].map(function(r){
            return '<button type="button" class="rate r' + r[0] + '" data-rate="' + r[0] + '"><b>' + esc(B(r[1], r[2])) + '</b><span>' + ivl(prev[r[0]].card.due - Date.now()) + '</span><kbd>' + r[0] + '</kbd></button>';
          }).join('') + '</div>';
      }
      el.innerHTML = h + '</div>';
      var f = el.querySelector(shown ? '[data-rate="3"]' : '[data-show]');
      if(f && el._focus){ f.focus(); }
    }
    function rate(g){
      var st = state(), s = st[cur.id], fresh = !s || s.del;
      var r = sched.next(fresh ? F.createEmptyCard(new Date()) : card(s.c), new Date(), g);
      S.setItem('srs', cur.id, { c: r.card });
      bump(g, fresh);
      var due = new Date(r.card.due).getTime();
      if(due - Date.now() < 20 * 60000) again.push({ d: cur, due: due });
      next();
    }
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      el._focus = true;
      if(b.dataset.deck){ prefs.decks[b.dataset.deck] = !prefs.decks[b.dataset.deck]; lsSet('site_review_prefs', prefs); build(); next(); return; }
      if(b.hasAttribute('data-show')){ shown = true; paint(); return; }
      if(b.hasAttribute('data-say')){ S.speak(L(cur.t)); return; }
      if(b.dataset.rate){ rate(Number(b.dataset.rate)); }
    });
    el.addEventListener('change', function(e){
      if(e.target.hasAttribute('data-perday')){ prefs.perDay = Number(e.target.value); lsSet('site_review_prefs', prefs); build(); next(); }
    });
    document.addEventListener('keydown', function(e){
      if(!cur || !el.offsetParent || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || '') || e.ctrlKey || e.metaKey || e.altKey) return;
      if(document.querySelector('dialog[open]')) return;
      if(!shown && (e.key === ' ' || e.key === 'Enter') && !(e.target.closest && e.target.closest('button'))){ e.preventDefault(); shown = true; el._focus = true; paint(); }
      else if(shown && /^[1-4]$/.test(e.key)){ e.preventDefault(); el._focus = true; rate(Number(e.key)); }
    });
    // the other tabs (or a sync) changed the schedule: rebuild when nothing is on screen mid-answer
    document.addEventListener('site:store', function(e){ if(e.detail && e.detail.key === 'srs' && e.detail.remote && !shown){ build(); next(); } });
    paint();
    S.loadScript('assets/data/deck.js' + (S.version ? '?v=' + S.version : '')).then(function(){
      deck = window.SITE_DECK || [];
      deck.forEach(function(d){ byId[d.id] = d; });
      build(); next();
    }, function(){ el.innerHTML = '<p class="lock-note">' + esc(B('مقدرناش نحمّل البطاقات. اتأكد من النت وحدّث الصفحة.', 'Could not load the cards. Check your connection and reload.')) + '</p>'; });
  });

  // ---------------- mistakes notebook ----------------
  X.type('mistakes', function(el){
    var tab = 'all', cur = null, answered = null, sure = false;
    function list(){
      return S.items('mistakes').filter(function(m){ return tab === 'all' || m.tr === tab; }).sort(function(a, b){ return (a.ok - b.ok) || (b.n - a.n) || (a.at - b.at); });
    }
    function pick(){
      var l = list();
      // interleave: don't ask the same source twice in a row when there is a choice
      var prevFrom = cur ? L(cur.from) : '';
      cur = l.filter(function(m){ return L(m.from) !== prevFrom; })[0] || l[0] || null;
      answered = null;
    }
    function paint(){
      var all = S.items('mistakes'), l = list();
      var h = '<div class="cat-tabs">' + [['all', 'الكل', 'All'], ['n8n', 'n8n', 'n8n'], ['english', 'الإنجليزي', 'English']].map(function(t){
        var n = t[0] === 'all' ? all.length : all.filter(function(m){ return m.tr === t[0]; }).length;
        return '<button type="button" class="cat-tab' + (tab === t[0] ? ' active' : '') + '" data-tab="' + t[0] + '">' + esc(B(t[1], t[2])) + ' (' + n + ')</button>';
      }).join('') + '</div>';
      if(!cur){
        h += '<p class="sub-note">' + esc(all.length ? B('مفيش أخطاء هنا. برافو 👏', 'No mistakes here. Well done 👏') :
          B('لسه مفيش أخطاء. أي سؤال تغلط فيه في الرحلة أو الاختبارات هيظهر هنا تلقائي.', 'No mistakes yet. Any question you get wrong in the journey or the quizzes shows up here by itself.')) + '</p>';
        el.innerHTML = h; return;
      }
      var q = cur;
      h += '<div class="q-card mk-card"><div class="qn">' + esc(L(q.from)) + ' · ' + esc(B('غلطت فيه ' + q.n + ' مرة', 'wrong ' + q.n + '×')) +
        (q.ok ? ' · ' + esc(B('صح مرة، فاضل مرة', 'right once, one more to go')) : '') + '</div><div class="qq">' + fmt(q.q) + '</div><div class="q-opts">' +
        q.o.map(function(o, i){
          var cls = '';
          if(answered != null){ if(i === q.a) cls = ' right'; else if(i === answered) cls = ' wrong'; }
          return '<button type="button" class="q-opt' + cls + '" data-o="' + i + '"' + (answered != null ? ' disabled' : '') + '>' + fmt(o) + '</button>';
        }).join('') + '</div>';
      if(answered != null){
        var ok = answered === q.a;
        h += '<div class="q-why">' + (ok ? '✓ ' + esc(B('صح.', 'Right.')) : '✗ ' + esc(B('الإجابة الصح متعلّمة بالأخضر.', 'The right answer is in green.'))) + ' ' + fmt(q.why) + '</div>' +
          '<div class="jr-actions"><button type="button" class="link-btn" data-next>' + esc(B('السؤال اللي بعده', 'Next question')) + ' ' + (window.LANG === 'en' ? '→' : '←') + '</button>' + weekLink(q) + '</div>';
      }
      h += '</div>';
      h += '<details class="mk-all"><summary>' + esc(B('كل الأخطاء (' + l.length + ')', 'All mistakes (' + l.length + ')')) + '</summary><ul class="mk-list">' +
        l.map(function(m){
          return '<li><span class="mk-q">' + fmt(m.q) + '</span><span class="sub-note">' + esc(L(m.from)) + ' · ×' + m.n + '</span>' +
            '<button type="button" class="ghost-btn" data-del="' + esc(m.id) + '">' + esc(B('شيله', 'Remove')) + '</button></li>';
        }).join('') + '</ul><button type="button" class="ghost-btn" data-clear>' + esc(sure ? B('متأكد؟ دوس تاني عشان تمسح الكل', 'Sure? Click again to clear everything') : B('امسح الكل', 'Clear all')) + '</button></details>';
      el.innerHTML = h;
    }
    // a link back to where the question came from
    function weekLink(q){
      var m = /^(n8n|english):w(\d\d)(?:d(\d))?/.exec(q.id);
      if(!m) return q.tr === 'english' && /quiz-/.test(q.id) ? '<a class="ghost-btn" href="english.html#quiz">' + esc(B('افتح الاختبار', 'Open the quiz')) + '</a>' : '';
      return '<a class="ghost-btn" href="' + m[1] + '.html#journey?w=' + Number(m[2]) + (m[3] ? '&d=' + m[3] : '') + '">' + esc(B('راجع الدرس', 'Review the lesson')) + '</a>';
    }
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      if(b.dataset.tab){ tab = b.dataset.tab; cur = null; pick(); paint(); return; }
      if(b.dataset.o != null && cur && answered == null){
        answered = Number(b.dataset.o);
        var m = S.get('mistakes'), x = m[cur.id];
        if(x){
          if(answered === x.a){ x.ok = (x.ok || 0) + 1; if(x.ok >= 2){ S.removeItem('mistakes', cur.id); S.toast(B('اتشال من الدفتر ✓', 'Cleared from the notebook ✓')); } else S.setItem('mistakes', cur.id, x); }
          else { x.ok = 0; x.n = (x.n || 1) + 1; S.setItem('mistakes', cur.id, x); }
          cur = Object.assign({ id: cur.id }, x);
        }
        paint(); return;
      }
      if(b.hasAttribute('data-next')){ pick(); paint(); return; }
      if(b.dataset.del){ S.removeItem('mistakes', b.dataset.del); if(cur && cur.id === b.dataset.del) pick(); paint(); el.querySelector('.mk-all').open = true; return; }
      if(b.hasAttribute('data-clear')){
        if(!sure){ sure = true; paint(); el.querySelector('.mk-all').open = true; return; }
        sure = false;
        S.items('mistakes').forEach(function(m){ if(tab === 'all' || m.tr === tab) S.removeItem('mistakes', m.id); });
        cur = null; pick(); paint();
      }
    });
    document.addEventListener('site:store', function(e){ if(e.detail && e.detail.key === 'mistakes' && e.detail.remote && answered == null){ pick(); paint(); } });
    pick(); paint();
  });

  // ---------------- stats ----------------
  var RAMP = ['#e9ede9', '#d4e9dc', '#9ccdb0', '#5a9c7a', '#2f6149'];
  function bin(n){ return !n ? 0 : n <= 2 ? 1 : n <= 6 ? 2 : n <= 15 ? 3 : 4; }
  function heat(){
    var a = S.activity(), weeks = 26, cell = 12, gap = 2, days = [];
    var end = new Date(); end.setHours(0, 0, 0, 0);
    var start = new Date(end); start.setDate(end.getDate() - end.getDay() - (weeks - 1) * 7);   // a Sunday, 26 weeks back
    var studied = 0, best = 0, run = 0;
    var svg = '<svg class="heat" viewBox="0 0 ' + (weeks * (cell + gap) + 30) + ' ' + (7 * (cell + gap) + 18) + '" role="img" aria-label="' +
      esc(B('خريطة أيام المذاكرة لآخر 26 أسبوع', 'Study days over the last 26 weeks')) + '" dir="ltr">';
    for(var i = 0; i < weeks * 7; i++){
      var d = new Date(start); d.setDate(start.getDate() + i);
      if(d > end) break;
      var k = S.today(d), n = a[k] || 0;
      if(n){ studied++; run++; best = Math.max(best, run); } else run = 0;
      var x = Math.floor(i / 7) * (cell + gap) + 28, y = (i % 7) * (cell + gap) + 16;
      var lbl = d.toLocaleDateString(window.LANG === 'en' ? 'en-GB' : 'ar-EG', { day: 'numeric', month: 'short' }) + ': ' + (n ? B(n + ' نشاط', n + (n === 1 ? ' action' : ' actions')) : B('مفيش مذاكرة', 'no study'));
      svg += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" rx="3" fill="' + RAMP[bin(n)] + '" data-tip="' + esc(lbl) + '"><title>' + esc(lbl) + '</title></rect>';
      if(d.getDate() === 1) svg += '<text x="' + x + '" y="10" class="heat-m">' + esc(d.toLocaleDateString(window.LANG === 'en' ? 'en-GB' : 'ar-EG', { month: 'short' })) + '</text>';
    }
    svg += '</svg>';
    var legend = '<div class="heat-legend" dir="ltr"><span>' + esc(B('أقل', 'Less')) + '</span>' + RAMP.map(function(c){ return '<i style="background:' + c + '"></i>'; }).join('') + '<span>' + esc(B('أكتر', 'More')) + '</span></div>';
    return { html: svg + legend, studied: studied, best: best };
  }
  function journeyOf(track){
    var p = lsGet('journey_' + track + '_v1', null) || {}, tests = p.tests || {}, out = [];
    for(var n = 1; n <= 24; n++){
      var at = tests['w' + (n < 10 ? '0' : '') + n + '-test'] || [];
      var best = at.reduce(function(m, t){ return Math.max(m, t.total ? t.score / t.total : 0); }, 0);
      out.push({ n: n, best: at.length ? Math.round(best * 100) : null, tries: at.length });
    }
    var exams = 0;
    ['m1-exam', 'm2-exam', 'm3-exam', 'm4-exam', 'm5-exam', 'final-exam'].forEach(function(id){
      if((tests[id] || []).some(function(t){ return t.total && t.score / t.total >= 0.7; })) exams++;
    });
    return { weeks: out, passed: out.filter(function(w){ return w.best >= 70; }).length, exams: exams };
  }
  function bars(track, J){
    var w = 24 * 18 + 36, h = 130, top = 10, base = 100;
    var svg = '<svg class="bars" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(B('أحسن درجة في كل اختبار أسبوعي', 'Best score in each weekly test')) + '" dir="ltr">';
    [0, 50, 100].forEach(function(v){ var y = base - v * (base - top) / 100; svg += '<line x1="30" x2="' + (w - 4) + '" y1="' + y + '" y2="' + y + '" class="grid"/><text x="26" y="' + (y + 4) + '" class="ax" text-anchor="end">' + v + '%</text>'; });
    var y70 = base - 70 * (base - top) / 100;
    svg += '<line x1="30" x2="' + (w - 4) + '" y1="' + y70 + '" y2="' + y70 + '" class="pass"/><text x="' + (w - 4) + '" y="' + (y70 - 3) + '" class="ax" text-anchor="end">70%</text>';
    J.weeks.forEach(function(x, i){
      var bx = 34 + i * 18, bw = 14;
      var tip = B('الأسبوع ' + x.n + ': ', 'Week ' + x.n + ': ') + (x.best == null ? B('لسه ما اتختبرتش', 'not taken yet') : x.best + '% · ' + B(x.tries + ' محاولة', x.tries + (x.tries === 1 ? ' try' : ' tries')));
      if(x.best != null && x.best > 0){
        var bh = x.best * (base - top) / 100, r = Math.min(4, bh);
        // 4px rounded top, square at the baseline
        svg += '<path d="M' + bx + ' ' + base + 'V' + (base - bh + r) + 'Q' + bx + ' ' + (base - bh) + ' ' + (bx + r) + ' ' + (base - bh) + 'H' + (bx + bw - r) + 'Q' + (bx + bw) + ' ' + (base - bh) + ' ' + (bx + bw) + ' ' + (base - bh + r) + 'V' + base + 'Z" class="bar" data-tip="' + esc(tip) + '"><title>' + esc(tip) + '</title></path>';
      }
      // a wide invisible hit target per week, so the empty weeks have a tooltip too
      svg += '<rect x="' + (bx - 2) + '" y="' + top + '" width="' + (bw + 4) + '" height="' + (base - top) + '" fill="transparent" data-tip="' + esc(tip) + '"><title>' + esc(tip) + '</title></rect>';
      if(x.n === 1 || x.n % 4 === 0) svg += '<text x="' + (bx + bw / 2) + '" y="' + (base + 14) + '" class="ax" text-anchor="middle">' + x.n + '</text>';
    });
    svg += '<line x1="30" x2="' + (w - 4) + '" y1="' + base + '" y2="' + base + '" class="axis"/><text x="' + (w / 2) + '" y="' + (h - 2) + '" class="ax" text-anchor="middle">' + esc(B('الأسبوع', 'week')) + '</text></svg>';
    return svg;
  }
  X.type('stats', function(el){
    function paint(){
      var hm = heat(), srs = S.items('srs'), log = lsGet('site_review_log', {}), n = 0, ag = 0, since = new Date(); since.setDate(since.getDate() - 30);
      Object.keys(log).forEach(function(d){ if(new Date(d) >= since){ n += log[d].n; ag += log[d].again; } });
      var mature = srs.filter(function(s){ return s.c && s.c.stability >= 21; }).length;
      var tracks = [['n8n', 'رحلة n8n', 'n8n journey'], ['english', 'إنجليزي المبرمج', 'Programmer English']].map(function(t){ return { id: t[0], name: B(t[1], t[2]), J: journeyOf(t[0]) }; });
      var tile = function(num, lbl){ return '<div class="streak-card"><div class="num">' + num + '</div><div class="lbl">' + esc(lbl) + '</div></div>'; };
      var h = '<div class="stat-cards stats-tiles">' +
        tile(S.streak(), B('يوم متتالي 🔥', 'day streak 🔥')) + tile(hm.studied, B('يوم ذاكرت فيه (6 شهور)', 'study days (6 months)')) +
        tile(srs.length, B('بطاقة في مراجعتك', 'cards in review')) + tile(mature, B('بطاقة ثابتة (+21 يوم)', 'mature cards (21d+)')) +
        tile(n ? Math.round((1 - ag / n) * 100) + '%' : '—', B('افتكرت صح (30 يوم)', 'recall rate (30 days)')) + '</div>';
      h += '<div class="chart-box"><h3 class="sub-h">' + esc(B('أيام المذاكرة', 'Study days')) + '</h3>' + hm.html +
        '<p class="sub-note">' + esc(B('ذاكرت ' + hm.studied + ' يوم في آخر 26 أسبوع، وأطول سلسلة ' + hm.best + ' يوم.', 'You studied on ' + hm.studied + ' days in the last 26 weeks; your longest run is ' + hm.best + ' days.')) + '</p></div>';
      tracks.forEach(function(t){
        h += '<div class="chart-box"><h3 class="sub-h">' + esc(t.name) + ' — ' + esc(B('عدّيت ' + t.J.passed + ' من 24 أسبوع · ' + t.J.exams + ' من 6 امتحانات', t.J.passed + ' of 24 weeks passed · ' + t.J.exams + ' of 6 exams')) + '</h3>' +
          bars(t.id, t.J) + '<p class="sub-note">' + esc(B('كل عمود = أحسن درجة في اختبار الأسبوع. الخط البرتقالي = 70%، درجة النجاح اللي بتفتح الأسبوع اللي بعده.', 'Each bar is your best weekly-test score. The orange line is 70%, the pass mark that opens the next week.')) + '</p>' + '<details class="ans"><summary>' + esc(B('اعرض الأرقام كجدول', 'Show the numbers as a table')) + '</summary><table class="num-table"><tr><th>' + esc(B('الأسبوع', 'Week')) + '</th><th>' +
          esc(B('أحسن درجة', 'Best score')) + '</th><th>' + esc(B('محاولات', 'Tries')) + '</th></tr>' +
          t.J.weeks.filter(function(w){ return w.tries; }).map(function(w){ return '<tr><td>' + w.n + '</td><td>' + w.best + '%</td><td>' + w.tries + '</td></tr>'; }).join('') +
          '</table></details></div>';
      });
      // weak spots: where most mistakes come from
      var groups = {};
      S.items('mistakes').forEach(function(m){ var k = L(m.from) || '—'; (groups[k] = groups[k] || { n: 0, m: m }).n += m.n || 1; });
      var weak = Object.keys(groups).sort(function(a, b){ return groups[b].n - groups[a].n; }).slice(0, 6);
      h += '<div class="chart-box"><h3 class="sub-h">' + esc(B('نقط ضعفك', 'Your weak spots')) + '</h3>' + (weak.length ? '<ul class="weak-list">' + weak.map(function(k){
        var m = /^(n8n|english):w(\d\d)(?:d(\d))?/.exec(groups[k].m.id);
        var link = m ? '<a href="' + m[1] + '.html#journey?w=' + Number(m[2]) + (m[3] ? '&d=' + m[3] : '') + '">' + esc(B('راجع', 'Review')) + ' ↗</a>' : '';
        return '<li><b>' + esc(k) + '</b> <span class="sub-note">' + esc(B(groups[k].n + ' غلطة', groups[k].n + ' mistakes')) + '</span> ' + link + '</li>';
      }).join('') + '</ul>' : '<p class="sub-note">' + esc(B('لسه مفيش أخطاء متسجلة.', 'No mistakes recorded yet.')) + '</p>') + '</div>';
      el.innerHTML = h + '<div class="chart-tip" role="tooltip" hidden></div>';
    }
    // one tooltip for every mark with data-tip
    el.addEventListener('mousemove', function(e){
      var t = e.target.closest && e.target.closest('[data-tip]'), tip = el.querySelector('.chart-tip');
      if(!tip) return;
      if(!t){ tip.hidden = true; return; }
      tip.textContent = t.getAttribute('data-tip');
      tip.hidden = false;
      var r = el.getBoundingClientRect();
      tip.style.left = Math.min(r.width - 180, Math.max(0, e.clientX - r.left + 12)) + 'px';
      tip.style.top = (e.clientY - r.top + 14) + 'px';
    });
    el.addEventListener('mouseleave', function(){ var tip = el.querySelector('.chart-tip'); if(tip) tip.hidden = true; });
    document.addEventListener('site:store', function(e){ if(e.detail && e.detail.remote) paint(); });
    paint();
  });

  // ---------------- backup and offline ----------------
  X.type('backup', function(el){
    var pending = null, msg = '';
    function paint(){
      var sw = 'serviceWorker' in navigator, ctl = sw && navigator.serviceWorker.controller;
      el.innerHTML = '<div class="learn-grid bk-grid">' +
        '<div class="md-card"><h3>💾 ' + esc(B('نسخة احتياطية', 'Backup')) + '</h3><p>' + esc(B('ملف JSON فيه تقدّمك في الرحلتين والاختبارات والمراجعة ودفتر الأخطاء والمعمل وبرومبتاتك.', 'A JSON file with your progress in both journeys, tests, review, mistakes, lab and your prompts.')) + '</p>' +
        '<div class="jr-actions"><button type="button" class="link-btn" data-export>' + esc(B('نزّل النسخة', 'Download backup')) + '</button>' +
        '<label class="ghost-btn file-btn">' + esc(B('رجّع نسخة…', 'Restore a backup…')) + '<input type="file" accept="application/json,.json" data-import hidden></label></div>' +
        (pending ? '<p class="lock-note">' + esc(B('الملف ده هيستبدل التقدّم اللي على المتصفح ده (' + pending.n + ' عنصر، اتعمل ' + pending.at + ').', 'This file will replace the progress in this browser (' + pending.n + ' items, made ' + pending.at + ').')) +
          '</p><div class="jr-actions"><button type="button" class="link-btn" data-restore>' + esc(B('أيوه، رجّعها', 'Yes, restore it')) + '</button><button type="button" class="ghost-btn" data-cancel>' + esc(B('إلغاء', 'Cancel')) + '</button></div>' : '') +
        '<p class="acct-msg" role="alert">' + esc(msg) + '</p></div>' +
        '<div class="md-card"><h3>📴 ' + esc(B('من غير نت', 'Offline')) + '</h3><p>' + esc(!sw ? B('المتصفح ده مش بيدعم الاستخدام من غير نت.', 'This browser does not support offline use.') :
          ctl ? B('الموقع شغّال كتطبيق: الصفحات اللي فتحتها متاحة من غير نت. حمّل الأسابيع كلها عشان الرحلة كلها تبقى متاحة.', 'The site runs as an app: the pages you opened work offline. Download every week so the whole journey is available.') :
          B('افتح الموقع مرة كمان وهو متصل عشان يتجهّز للاستخدام من غير نت.', 'Open the site once more while online so it can get ready for offline use.')) + '</p>' +
        (ctl ? '<div class="jr-actions"><button type="button" class="link-btn" data-offline>' + esc(B('حمّل الـ 48 أسبوع', 'Download all 48 weeks')) + '</button><span class="sub-note" data-offmsg aria-live="polite"></span></div>' : '') +
        '<p class="sub-note">' + esc(B('وتقدر تثبّت الموقع على الموبايل أو الكمبيوتر من قايمة «المزيد» أو من قايمة المتصفح ← «إضافة للشاشة الرئيسية».', 'You can also install the site on your phone or computer from the «More» menu or the browser menu → «Add to home screen».')) + '</p></div>' +
        '<div class="md-card"><h3>☁️ ' + esc(B('الحساب', 'Account')) + '</h3><p>' + esc(B('لو سجّلت دخول (زرار «سجّل دخول» فوق)، المراجعة ودفتر الأخطاء والمعمل وبرومبتاتك بيتزامنوا أونلاين مع الرحلتين، وتكمّل من أي جهاز.', 'When you sign in (the «Sign in» button above), your review, mistakes, lab and prompts sync online along with both journeys, so you can continue on any device.')) + '</p></div></div>';
    }
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      if(b.hasAttribute('data-export')){ S.exportBackup(); return; }
      if(b.hasAttribute('data-cancel')){ pending = null; paint(); return; }
      if(b.hasAttribute('data-restore') && pending){
        try{ var n = S.importBackup(pending.text); msg = ''; S.toast(B('اترجّع ' + n + ' عنصر ✓', n + ' items restored ✓')); setTimeout(function(){ location.reload(); }, 900); }
        catch(err){ msg = err.message; }
        pending = null; paint(); return;
      }
      if(b.hasAttribute('data-offline')){
        var urls = [];
        ['n8n', 'english'].forEach(function(t){ for(var i = 1; i <= 24; i++) urls.push('content/' + t + '/weeks/w' + (i < 10 ? '0' : '') + i + '.js' + (S.version ? '?v=' + S.version : '')); });
        var out = el.querySelector('[data-offmsg]'), ch = new MessageChannel();
        b.disabled = true;
        ch.port1.onmessage = function(ev){
          out.textContent = ev.data.end ? B('✓ الرحلتين متاحين من غير نت.', '✓ Both journeys are available offline.') : B('بيحمّل ' + ev.data.done + ' من ' + ev.data.total, 'Downloading ' + ev.data.done + ' of ' + ev.data.total);
          if(ev.data.end) b.disabled = false;
        };
        navigator.serviceWorker.controller.postMessage({ type: 'cache-all', urls: urls }, [ch.port2]);
      }
    });
    el.addEventListener('change', function(e){
      if(!e.target.hasAttribute('data-import') || !e.target.files[0]) return;
      var r = new FileReader();
      r.onload = function(){
        try{
          var b = JSON.parse(r.result);
          if(!b || b.app !== 'learn-n8n-english' || !b.data) throw new Error();
          pending = { text: r.result, n: Object.keys(b.data).length, at: new Date(b.at).toLocaleString(window.LANG === 'en' ? 'en-GB' : 'ar-EG') }; msg = '';
        }catch(err){ pending = null; msg = B('الملف ده مش نسخة احتياطية من الموقع.', 'This file is not a backup of this site.'); }
        paint();
      };
      r.readAsText(e.target.files[0]);
    });
    paint();
  });
})();
