/* Journey engine: the 24-week plan shared by the n8n and English pages.
 * Week content lives in content/<track>/weeks/wNN.js and calls JOURNEY.week({...}).
 * Content strings are {ar, en} and are read through L(); UI strings use T(). */
(function(){
  var J = window.JOURNEY = window.JOURNEY || {};
  J.weeks = { english: {}, n8n: {} };

  J.L = function(x){
    if(x == null) return '';
    if(typeof x === 'string') return x;
    return x[window.LANG] || x.ar || x.en || '';
  };

  J.week = function(w){
    (w.days || []).forEach(function(d){ d.key = 'w' + pad(w.n) + 'd' + d.d; });
    J.weeks[w.track][w.n] = w;
  };
  J.outlines = {};
  J.outline = function(o){ J.outlines[o.track] = o; };

  function best(attempts){
    var b = 0;
    (attempts || []).forEach(function(t){ if(t && t.total) b = Math.max(b, t.score / t.total); });
    return b;
  }
  function pad(n){ return (n < 10 ? '0' : '') + n; }

  J.rules = {
    PASS: 0.7,
    pad: pad,
    testId: function(n){ return 'w' + pad(n) + '-test'; },
    best: best,
    weekPassed: function(attempts){ return best(attempts) >= J.rules.PASS; },
    weekUnlocked: function(track, n, progress){
      if(n === 1) return true;
      var tests = (progress && progress.tests) || {};
      return J.rules.weekPassed(tests[J.rules.testId(n - 1)]);
    },
    DAY_PASS: 0.6,
    // A study day is done when every practice task is checked and at least 60% of its quiz is right.
    quizRight: function(day, answers){
      answers = answers || {};
      return (day.quiz || []).filter(function(q, i){ return answers['q' + day.key + '_' + i] === q.a; }).length;
    },
    dayDone: function(day, done, answers){
      done = done || {};
      var ok = (day.practice || []).every(function(_, i){ return !!done['p' + day.key + '_' + i]; });
      var n = (day.quiz || []).length;
      return ok && J.rules.quizRight(day, answers) >= Math.ceil(n * J.rules.DAY_PASS);
    },
    // Exams: months 1-5 have a monthly exam on their 4 weeks; month 6 holds the final exam on all 24 weeks.
    // An exam opens when every weekly test in its range is passed. Each attempt draws new questions.
    examId: function(m){ return m === 6 ? 'final-exam' : 'm' + m + '-exam'; },
    examWeeks: function(m){ return m === 6 ? [1, 24] : [(m - 1) * 4 + 1, m * 4]; },
    examPerWeek: function(m){ return m === 6 ? 2 : 5; },
    examOpen: function(m, progress){
      var r = J.rules.examWeeks(m), tests = (progress && progress.tests) || {};
      for(var n = r[0]; n <= r[1]; n++){ if(!J.rules.weekPassed(tests[J.rules.testId(n)])) return false; }
      return true;
    }
  };

  // Question pool of a week: its weekly test and every day quiz, each with a stable id.
  J.pool = function(w){
    var out = [];
    w.days.forEach(function(d){
      (d.test || []).forEach(function(q, i){ out.push({ id: 'w' + pad(w.n) + 't' + i, n: w.n, q: q }); });
      (d.quiz || []).forEach(function(q, i){ out.push({ id: 'w' + pad(w.n) + 'd' + d.d + 'q' + i, n: w.n, q: q }); });
    });
    return out;
  };
  // Deterministic pick for a seed: `per` random questions from each week of the exam's range.
  J.drawExam = function(track, m, seed){
    var rnd = (function(a){ return function(){ a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })(seed);
    var r = J.rules.examWeeks(m), per = J.rules.examPerWeek(m), ids = [];
    for(var n = r[0]; n <= r[1]; n++){
      var w = J.weeks[track][n];
      if(!w) continue;
      var pool = J.pool(w);
      for(var i = pool.length - 1; i > 0; i--){ var j = Math.floor(rnd() * (i + 1)), x = pool[i]; pool[i] = pool[j]; pool[j] = x; }
      pool.slice(0, per).forEach(function(p){ ids.push(p.id); });
    }
    return ids;
  };
  J.question = function(track, id){
    var m = /^w(\d\d)(?:t(\d+)|d(\d)q(\d+))$/.exec(id), w = m && J.weeks[track][Number(m[1])];
    if(!w) return null;
    if(m[2] != null){ var t = w.days[5] && w.days[5].test; return t ? t[Number(m[2])] || null : null; }
    var d = w.days[Number(m[3]) - 1];
    return d && d.quiz ? d.quiz[Number(m[4])] || null : null;
  };

  // Union of two progress objects: anything done anywhere stays done, all test attempts are kept.
  J.mergeProgress = function(a, b){
    a = a || {}; b = b || {};
    var out = { done: {}, answers: {}, tests: {}, updatedAt: Math.max(a.updatedAt || 0, b.updatedAt || 0) };
    [a, b].forEach(function(p){
      Object.keys(p.done || {}).forEach(function(k){ if(p.done[k]) out.done[k] = true; });
      Object.keys(p.answers || {}).forEach(function(k){ if(out.answers[k] == null) out.answers[k] = p.answers[k]; });
      Object.keys(p.tests || {}).forEach(function(k){
        var list = out.tests[k] || (out.tests[k] = []);
        (p.tests[k] || []).forEach(function(t){
          var dup = list.some(function(x){ return x.at === t.at && x.score === t.score && x.total === t.total; });
          if(!dup) list.push(t);
        });
      });
      if(p.imported) out.imported = true;
    });
    return out;
  };


  // ================= UI (browser only) =================
  if(typeof document === 'undefined') return;

  function T(s){ return window.T ? window.T(s) : s; }
  function TF(s, v){
    return window.TF ? window.TF(s, v) : s.replace(/\{(\w+)\}/g, function(_, k){ return v && v[k] != null ? v[k] : ''; });
  }
  var L = J.L;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function fmt(s){ return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>'); }
  var VERSION = (function(){
    try{ var m = (document.currentScript.src || '').match(/[?&]v=(\d+)/); return m ? m[1] : ''; }catch(e){ return ''; }
  })();

  // ---- loading week files on demand ----
  var loading = {};
  J.loadWeek = function(track, n, cb){
    if(J.weeks[track][n]) return cb(true);
    var id = track + '/' + n;
    if(loading[id]){ loading[id].push(cb); return; }
    loading[id] = [cb];
    var finished = false;
    function finish(ok){
      if(finished) return;
      finished = true;
      var cbs = loading[id]; delete loading[id];
      cbs.forEach(function(f){ f(ok && !!J.weeks[track][n]); });
    }
    var s = document.createElement('script');
    s.src = 'content/' + track + '/weeks/w' + pad(n) + '.js' + (VERSION ? '?v=' + VERSION : '');
    s.onload = function(){ finish(true); };
    s.onerror = function(){ if(s.parentNode) s.parentNode.removeChild(s); finish(false); };
    setTimeout(function(){ finish(false); }, 10000);
    document.head.appendChild(s);
  };

  // ---- state ----
  var M = null;   // the mounted journey: {track, outline, key, progress, opts, el, side, main, sum, selWeek, selDay, testSel, testResult}
  function normalize(p){
    p = p || {};
    return { done: p.done || {}, answers: p.answers || {}, tests: p.tests || {}, updatedAt: p.updatedAt || 0, imported: !!p.imported };
  }
  function storeLocal(){ try{ localStorage.setItem(M.key, JSON.stringify(M.progress)); }catch(e){} }
  function save(){
    M.progress.updatedAt = Date.now();
    storeLocal();
    if(M.opts.onActivity) M.opts.onActivity();
    if(M.opts.onChange) M.opts.onChange(M.progress);
    emit('journey:change', { track: M.track, progress: M.progress });
  }
  // Other scripts (the account sync) listen for these instead of being wired into every page.
  function emit(name, detail){
    try{ document.dispatchEvent(new CustomEvent(name, { detail: detail })); }catch(e){}
  }
  // The old 7-day intensive week used keys d<day>_<i> (practice), d<day>_ch (challenge) and q<day>_<i> (quiz).
  // Its days 1-5 are week 1 now, so finished work carries over.
  function importLegacy(p, legacyKey){
    if(p.imported || !legacyKey) return;
    p.imported = true;
    var old = null;
    try{ old = JSON.parse(localStorage.getItem(legacyKey)); }catch(e){}
    if(!old) return;
    Object.keys(old.sprint || {}).forEach(function(k){
      if(!old.sprint[k]) return;
      var m = k.match(/^d([1-5])_(\d+|ch)$/);
      if(!m) return;
      if(m[2] === 'ch') p.done['chw01d' + m[1]] = true;
      else p.done['pw01d' + m[1] + '_' + m[2]] = true;
    });
    Object.keys(old.quiz || {}).forEach(function(k){
      var m = k.match(/^q([1-5])_([0-2])$/);
      if(m) p.answers['qw01d' + m[1] + '_' + m[2]] = old.quiz[k];
    });
  }

  // ---- rules applied to the mounted track ----
  function weekObj(n){ return J.weeks[M.track][n]; }
  function isReady(n){ return (M.outline.ready || []).indexOf(n) !== -1; }
  function weekOpen(n){ return J.rules.weekUnlocked(M.track, n, M.progress); }
  function attempts(n){ return M.progress.tests[J.rules.testId(n)] || []; }
  function weekPassed(n){ return J.rules.weekPassed(attempts(n)); }
  function studyDone(day){ return J.rules.dayDone(day, M.progress.done, M.progress.answers); }
  function dayOpen(w, d){ return weekOpen(w.n) && (d === 1 || studyDone(w.days[d - 2])); }
  function dayStat(w, day){
    if(day.d === 6){
      return { done: weekPassed(w.n), pct: Math.round(J.rules.best(attempts(w.n)) * 100) };
    }
    var pt = (day.practice || []).length, qt = (day.quiz || []).length;
    var p = (day.practice || []).filter(function(_, i){ return M.progress.done['p' + day.key + '_' + i]; }).length;
    var q = J.rules.quizRight(day, M.progress.answers);
    return { done: studyDone(day), pct: pt + qt ? Math.round((p + q) / (pt + qt) * 100) : 0, p: p, pt: pt, q: q, qt: qt };
  }
  // a deep link (#journey?w=5&d=2) asks for a day; it opens only if it is unlocked
  function pickDay(w){
    var d = M.wantDay; M.wantDay = 0;
    return d && d >= 1 && d <= 6 && dayOpen(w, d) ? d : firstOpenDay(w);
  }
  function firstOpenDay(w){
    for(var i = 0; i < w.days.length; i++){ if(!dayStat(w, w.days[i]).done) return w.days[i].d; }
    return 6;
  }
  function currentWeek(){
    for(var n = 1; n <= 24; n++){ if(!weekPassed(n)) return n; }
    return 24;
  }
  J.stats = function(){
    if(!M) return { weeks: 0, days: 0, pct: 0 };
    var weeks = 0, days = 0;
    for(var n = 1; n <= 24; n++){
      if(weekPassed(n)){ weeks++; days += 6; continue; }
      var w = weekObj(n);
      if(w) w.days.slice(0, 5).forEach(function(d){ if(studyDone(d)) days++; });
    }
    var exams = 0;
    for(var m = 1; m <= 6; m++){ if(examPassed(m)) exams++; }
    return { weeks: weeks, days: days, exams: exams, pct: Math.round(days / 144 * 100) };
  };
  function examAttempts(m){ return M.progress.tests[J.rules.examId(m)] || []; }
  function examPassed(m){ return J.rules.weekPassed(examAttempts(m)); }
  function examOpen(m){ return J.rules.examOpen(m, M.progress); }

  // ---- rendering ----
  function renderSum(){
    var s = J.stats();
    M.sum.textContent = TF('عدّيت {w} من 24 أسبوع · خلّصت {d} من 144 يوم', { w: s.weeks, d: s.days });
  }
  function renderSide(){
    var o = M.outline, h = '';
    o.months.forEach(function(m){
      h += '<div class="jr-month"><div class="jr-mh"><b>' + TF('الشهر {n}', { n: m.n }) + '</b> ' + esc(L(m.title)) +
        ' <span class="jr-lvl">' + esc(L(m.level)) + '</span></div><div class="jr-weeks">';
      for(var n = (m.n - 1) * 4 + 1; n <= m.n * 4; n++){
        var open = weekOpen(n), passed = weekPassed(n), ready = isReady(n);
        var icon = passed ? ' ✓' : !open ? ' 🔒' : !ready ? ' ⏳' : '';
        h += '<button type="button" class="jr-week' + (n === M.selWeek ? ' sel' : '') + (passed ? ' done' : '') + (open ? '' : ' locked') + (ready ? '' : ' soon') + '" data-week="' + n + '"' +
          (n === M.selWeek ? ' aria-current="true"' : '') + '><span class="jr-wn">' + TF('الأسبوع {n}', { n: n }) + icon + '</span><span class="jr-wt">' + esc(L(o.weeks[n - 1])) + '</span></button>';
      }
      var eo = examOpen(m.n), ep = examPassed(m.n), eb = examAttempts(m.n).length ? Math.round(J.rules.best(examAttempts(m.n)) * 100) + '%' : '';
      h += '</div><button type="button" class="jr-exam' + (M.selExam === m.n ? ' sel' : '') + (ep ? ' done' : '') + (eo ? '' : ' locked') + '" data-exam="' + m.n + '"' +
        (M.selExam === m.n ? ' aria-current="true"' : '') + '>' + (m.n === 6 ? '🎓 ' + T('الامتحان النهائي') : '📝 ' + TF('امتحان الشهر {n}', { n: m.n })) +
        ' <span>' + (ep ? '✓ ' + eb : eo ? eb : '🔒') + '</span></button></div>';
    });
    M.side.innerHTML = h;
  }
  function weekHead(n, extra){
    return '<div class="jr-whead"><div class="jr-eyebrow mono">' + TF('الشهر {m} · الأسبوع {n} من 24', { m: Math.ceil(n / 4), n: n }) + '</div>' +
      '<h3>' + esc(L(M.outline.weeks[n - 1])) + '</h3>' + (extra || '') + '</div>';
  }
  var TRACK_NAME = { n8n: { ar: 'أتمتة n8n', en: 'n8n automation' }, english: { ar: 'الإنجليزي للمبرمجين', en: 'English for developers' } };
  function examHead(m){
    var r = J.rules.examWeeks(m);
    return '<div class="jr-whead"><div class="jr-eyebrow mono">' + (m === 6 ? T('الامتحان النهائي · الأسابيع 1–24')
      : TF('امتحان الشهر {m} · الأسابيع {a}–{b}', { m: m, a: r[0], b: r[1] })) + '</div>' +
      '<h3>' + (m === 6 ? T('الامتحان النهائي') : esc(L(M.outline.months[m - 1].title))) + '</h3></div>';
  }
  // Loads every week of the exam's range, then draws the questions (a fresh seed for each attempt).
  function renderExam(){
    var m = M.selExam, r = J.rules.examWeeks(m), E = M.exam;
    if(!examOpen(m)){
      M.main.innerHTML = examHead(m) + '<p class="lock-note">' + TF('الامتحان ده بيفتح لما تعدّي اختبارات الأسابيع {a}–{b} كلها 🔒', { a: r[0], b: r[1] }) + '</p>';
      return;
    }
    var missing = [];
    for(var n = r[0]; n <= r[1]; n++){ if(!weekObj(n)) missing.push(n); }
    if(missing.length){
      M.main.innerHTML = examHead(m) + '<p class="sub-note" aria-live="polite">' + T('بيحمّل أسئلة الامتحان…') + '</p>';
      var left = missing.length, failed = false;
      missing.forEach(function(k){
        J.loadWeek(M.track, k, function(ok){
          if(!ok) failed = true;
          if(--left || !M || M.selExam !== m) return;
          if(failed){
            M.main.innerHTML = examHead(m) + '<p class="lock-note">' + T('مقدرناش نحمّل الأسابيع دي. اتأكد من النت وجرّب تاني.') + '</p>' +
              '<button type="button" class="link-btn" data-jretry>' + T('إعادة المحاولة') + '</button>';
            return;
          }
          renderExam();
        });
      });
      return;
    }
    if(!E || E.m !== m) E = M.exam = { m: m, qs: J.drawExam(M.track, m, Date.now() % 2147483647), sel: {}, result: null };
    var list = examAttempts(m), best = J.rules.best(list), res = E.result, qs = E.qs;
    var h = examHead(m) + '<p class="sub-note">' + TF('{n} سؤال مختارين من اختبارات وتمارين الأسابيع {a}–{b}. محتاج 70% أو أكتر. كل محاولة بتجيب أسئلة مختلفة، وأحسن درجة هي اللي بتتحسب.', { n: qs.length, a: r[0], b: r[1] }) + '</p>';
    if(list.length) h += '<p class="jr-attempts">' + TF('محاولاتك: {c} · أحسن درجة: {b}%', { c: list.length, b: Math.round(best * 100) }) + (examPassed(m) ? ' ✓' : '') + '</p>';
    qs.forEach(function(id, i){
      var q = J.question(M.track, id), wk = '<div class="jr-from mono">' + TF('من الأسبوع {n}', { n: Number(id.slice(1, 3)) }) + '</div>';
      if(!q) return;
      if(res){ h += quizCard(q, i, 'e' + i, res.answers[i], 'je').replace('<div class="q-card">', '<div class="q-card">' + wk); return; }
      h += '<div class="q-card">' + wk + '<div class="qn">Q' + (i + 1) + '</div><div class="qq">' + fmt(L(q.q)) + '</div><div class="q-opts">' +
        q.o.map(function(o, oi){
          var on = E.sel[i] === oi;
          return '<button type="button" class="q-opt' + (on ? ' picked' : '') + '" data-je="' + i + '" data-o="' + oi + '" aria-pressed="' + on + '">' + fmt(L(o)) + '</button>';
        }).join('') + '</div></div>';
    });
    if(res){
      var ok = res.score / res.total >= J.rules.PASS;
      h += '<div class="jr-result ' + (ok ? 'pass' : 'fail') + '" role="status"><b>' + TF('درجتك: {s} من {t} ({p}%)', { s: res.score, t: res.total, p: Math.round(res.score / res.total * 100) }) + '</b> ' +
        (ok ? (m === 6 ? T('نجحت في الامتحان النهائي 🎓 خلّصت الرحلة كلها.') : T('نجحت في امتحان الشهر 🎉')) : T('لسه أقل من 70%. راجع الأسابيع اللي الأسئلة الغلط جاية منها، وبعدين جرّب تاني بأسئلة جديدة.')) + '</div>' +
        '<div class="jr-actions"><button type="button" class="ghost-btn" data-jeretake>' + T('امتحان جديد بأسئلة تانية') + '</button></div>';
    }else{
      var picked = qs.filter(function(_, i){ return E.sel[i] != null; }).length;
      h += '<div class="jr-actions"><button type="button" class="link-btn" data-jesubmit' + (picked === qs.length ? '' : ' disabled') + '>' + T('سلّم الاختبار') + '</button>' +
        '<span class="sub-note">' + TF('جاوبت {a} من {n}', { a: picked, n: qs.length }) + '</span></div>';
    }
    if(m === 6 && examPassed(m)){
      var at = list.filter(function(t){ return t.score / t.total >= J.rules.PASS; })[0];
      h += '<div class="jr-cert" id="jrCert"><div class="jr-cert-t">🎓 ' + T('شهادة إتمام') + '</div>' +
        '<p>' + TF('خلّصت رحلة الـ 24 أسبوع في «{track}»: 144 يوم، و24 اختبار أسبوعي، و5 امتحانات شهرية، والامتحان النهائي بأحسن درجة {p}%.',
          { track: L(TRACK_NAME[M.track]), p: Math.round(best * 100) }) + '</p>' +
        '<p class="mono">' + new Date(at ? at.at : Date.now()).toISOString().slice(0, 10) + ' · micro4tricks-ai.github.io/learn-n8n-english</p>' +
        '<button type="button" class="ghost-btn" data-jprint>' + T('اطبع الشهادة') + '</button></div>';
    }
    M.main.innerHTML = h;
  }
  function renderMain(){
    if(M.selExam){ renderExam(); return; }
    var n = M.selWeek;
    if(!weekOpen(n)){
      M.main.innerHTML = weekHead(n, '<p class="lock-note">' + TF('الأسبوع {n} لسه مقفول 🔒 خد 70% أو أكتر في اختبار الأسبوع {p} عشان يفتح.', { n: n, p: n - 1 }) + '</p>');
      return;
    }
    if(!isReady(n)){
      M.main.innerHTML = weekHead(n, '<p class="sub-note">' + T('محتوى الأسبوع ده قيد الإعداد وهينزل قريب. كمّل الأسابيع اللي قبله لحد ما يجهز.') + '</p>');
      return;
    }
    var w = weekObj(n);
    if(!w){
      M.main.innerHTML = weekHead(n, '<p class="sub-note" aria-live="polite">' + T('بيحمّل الأسبوع…') + '</p>');
      J.loadWeek(M.track, n, function(ok){
        if(!M || M.selWeek !== n) return;
        if(ok){ M.selDay = pickDay(weekObj(n)); renderAll(); return; }
        M.main.innerHTML = weekHead(n, '<p class="lock-note">' + T('مقدرناش نحمّل الأسبوع ده. اتأكد من النت وجرّب تاني.') + '</p>' +
          '<button type="button" class="link-btn" data-jretry>' + T('إعادة المحاولة') + '</button>');
      });
      return;
    }
    M.main.innerHTML = weekHead(n, '<p>' + esc(L(w.goal)) + '</p>') +
      '<div class="day-tabs jr-days" id="jrTabs"></div><p class="lock-note" id="jrLock" hidden aria-live="polite"></p><div id="jrDay"></div>' +
      (window.SITE && SITE.commentsHtml ? SITE.commentsHtml(M.track + '-week-' + pad(n), L(w.title)) : '');
    renderTabs(w);
    renderDay(w);
  }
  function renderTabs(w){
    var el = document.getElementById('jrTabs');
    if(!el) return;
    el.innerHTML = w.days.map(function(day){
      var open = dayOpen(w, day.d), st = dayStat(w, day);
      return '<button type="button" class="day-tab' + (day.d === M.selDay ? ' sel' : '') + (st.done ? ' done' : '') + (open ? '' : ' locked') + '" data-day="' + day.d + '"' +
        (open ? '' : ' aria-disabled="true"') + '><span class="dn">' + (day.d === 6 ? T('يوم الاختبار') : TF('اليوم {d}', { d: day.d })) + (st.done ? ' ✓' : open ? '' : ' 🔒') + '</span>' +
        '<span class="dt">' + esc(L(day.title)) + '</span><div class="mini-bar"><div class="mini-fill" style="width:' + st.pct + '%"></div></div></button>';
    }).join('');
  }
  function block(step, title, body){
    return '<div class="sp-block"><h4><span class="step">' + step + '</span> ' + title + '</h4>' + body + '</div>';
  }
  function checkbox(id, label){
    return '<div class="task"><input type="checkbox" id="jr_' + id + '" data-jdone="' + id + '"' + (M.progress.done[id] ? ' checked' : '') + '>' +
      '<label for="jr_' + id + '">' + label + '</label></div>';
  }
  function headStats(day, st){
    return '⏱ ' + (day.minutes || 120) + ' min · practice ' + st.p + '/' + st.pt + ' · quiz ' + st.q + '/' + st.qt;
  }
  function renderDay(w){
    var day = w.days[M.selDay - 1], box = document.getElementById('jrDay');
    if(!box) return;
    if(day.d === 6){ renderTestDay(w, day, box); return; }
    var st = dayStat(w, day), step = 0, h = '';
    h += '<div class="sp-head"><h3>' + TF('اليوم {d}', { d: day.d }) + ': ' + esc(L(day.title)) + '</h3><p>' + esc(L(day.goal)) + '</p>' +
      '<div class="mono">' + headStats(day, st) + '</div></div>';
    h += block(++step, T('افهم: الشرح مع أمثلة'), '<div class="learn-grid">' + day.learn.map(function(l){
      return '<div class="learn-card"><div class="lh">' + esc(L(l.h)) + '</div><p class="lp">' + fmt(L(l.p)) + '</p>' + (l.ex ? '<pre class="code">' + esc(L(l.ex)) + '</pre>' : '') + '</div>';
    }).join('') + '</div>');
    h += block(++step, T('اتمرّن بإيدك'), '<div class="build-list">' + day.practice.map(function(t, i){
      return checkbox('p' + day.key + '_' + i, fmt(L(t)));
    }).join('') + '</div>');
    if(day.code && day.code.length){
      h += block(++step, T('انسخ واستخدم'), '<div class="phrase-grid">' + day.code.map(function(c, i){
        return '<div class="phrase-card"><div class="row"><div class="u">' + esc(L(c.u)) + '</div><button type="button" class="copy-btn" data-jcopy="' + i + '">' + T('نسخ') + '</button></div>' +
          '<pre class="code">' + esc(L(c.p)) + '</pre></div>';
      }).join('') + '</div>');
    }
    h += block(++step, T('كلمات اليوم'), '<div class="vocab-grid">' + day.words.map(function(v){
      return '<div class="vocab-card"><div><div class="term">' + esc(v.t) + '</div><div class="mean">' + esc(L(v.m)) + '</div>' +
        (v.ex ? '<div class="tex">' + esc(L(v.ex)) + '</div>' : '') + '</div>' + (M.opts.wordActions ? '<div class="acts">' + M.opts.wordActions(v) + '</div>' : '') + '</div>';
    }).join('') + '</div>');
    h += block(++step, T('اقرا واسمع'), '<div class="read-list">' + day.read.map(function(r){
      return '<div class="read-row"><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(L(r.t)) + ' ↗</a><span>' + fmt(L(r.what)) + '</span></div>';
    }).join('') + '</div>');
    if(day.challenge){
      h += block(++step, T('تحدي اليوم'), '<div class="challenge"><b>' + T('التحدي:') + ' </b>' + fmt(L(day.challenge)) +
        '<div style="margin-top:10px">' + checkbox('ch' + day.key, T('خلّصت التحدي بنفسي')) + '</div></div>');
    }
    var need = Math.ceil(day.quiz.length * J.rules.DAY_PASS);
    var answered = day.quiz.filter(function(_, i){ return M.progress.answers['q' + day.key + '_' + i] != null; }).length;
    var qh = '<p class="sub-note">' + TF('محتاج {k} من {n} صح، وكل مهام «اتمرّن بإيدك» متعلّمة، عشان اليوم اللي بعده يفتح.', { k: need, n: day.quiz.length }) + '</p>';
    qh += day.quiz.map(function(q, i){ return quizCard(q, i, 'q' + day.key + '_' + i, M.progress.answers['q' + day.key + '_' + i], 'jq'); }).join('');
    qh += '<div class="quiz-score">' + T('النتيجة:') + ' <b>' + st.q + ' / ' + st.qt + '</b>' +
      (answered ? ' <button type="button" class="ghost-btn" data-jreset>' + T('امسح الإجابات وجاوب تاني') + '</button>' : '') + '</div>';
    h += block(++step, T('اختبار اليوم'), qh);
    if(st.done) h += '<button type="button" class="link-btn jr-next" data-jnext>' + (day.d === 5 ? T('يوم الاختبار') : TF('اليوم {d}', { d: day.d + 1 })) + ' ' + T('←') + '</button>';
    box.innerHTML = h;
    if(M.opts.onDay) M.opts.onDay(w, day);
  }
  function quizCard(q, i, id, ans, kind){
    var h = '<div class="q-card"><div class="qn">Q' + (i + 1) + '</div><div class="qq">' + fmt(L(q.q)) + '</div><div class="q-opts">';
    q.o.forEach(function(o, oi){
      var cls = '';
      if(ans != null){ if(oi === q.a) cls = ' right'; else if(oi === ans) cls = ' wrong'; }
      h += '<button type="button" class="q-opt' + cls + '" data-' + kind + '="' + id + '" data-o="' + oi + '"' + (ans != null ? ' disabled' : '') + '>' + fmt(L(o)) + '</button>';
    });
    h += '</div>';
    if(ans != null) h += '<div class="q-why">' + (ans === q.a ? '✓ ' + T('صح.') + ' ' : '✗ ' + T('الإجابة الصح متعلّمة بالأخضر.') + ' ') + fmt(L(q.why)) + '</div>';
    return h + '</div>';
  }
  function renderTestDay(w, day, box){
    var list = attempts(w.n), best = J.rules.best(list), passed = weekPassed(w.n), r = M.testResult;
    var h = '<div class="sp-head"><h3>' + esc(L(day.title)) + '</h3><p>' + esc(L(day.goal)) + '</p></div>';
    h += block(1, T('راجع الأسبوع'), '<ul class="jr-review">' + day.review.map(function(x){ return '<li>' + fmt(L(x)) + '</li>'; }).join('') + '</ul>');
    h += block(2, T('مشروع الأسبوع'), '<div class="challenge">' + fmt(L(day.project)) +
      '<div style="margin-top:10px">' + checkbox('projw' + pad(w.n), T('خلّصت المشروع')) + '</div></div>');
    var th = '<p class="sub-note">' + TF('{n} سؤال. محتاج 70% أو أكتر عشان الأسبوع {next} يفتح. تقدر تعيده أكتر من مرة، وأحسن درجة هي اللي بتتحسب.', { n: day.test.length, next: w.n + 1 }) + '</p>';
    if(list.length) th += '<p class="jr-attempts">' + TF('محاولاتك: {c} · أحسن درجة: {b}%', { c: list.length, b: Math.round(best * 100) }) + (passed ? ' ✓' : '') + '</p>';
    day.test.forEach(function(q, i){
      if(r){ th += quizCard(q, i, 't' + i, r.answers[i], 'jt'); return; }
      th += '<div class="q-card"><div class="qn">Q' + (i + 1) + '</div><div class="qq">' + fmt(L(q.q)) + '</div><div class="q-opts">' +
        q.o.map(function(o, oi){
          var on = M.testSel[i] === oi;
          return '<button type="button" class="q-opt' + (on ? ' picked' : '') + '" data-jt="' + i + '" data-o="' + oi + '" aria-pressed="' + on + '">' + fmt(L(o)) + '</button>';
        }).join('') + '</div></div>';
    });
    if(r){
      var ok = r.score / r.total >= J.rules.PASS;
      th += '<div class="jr-result ' + (ok ? 'pass' : 'fail') + '" role="status"><b>' + TF('درجتك: {s} من {t} ({p}%)', { s: r.score, t: r.total, p: Math.round(r.score / r.total * 100) }) + '</b> ' +
        (ok ? (w.n < 24 ? TF('نجحت 🎉 الأسبوع {n} اتفتح.', { n: w.n + 1 }) : T('نجحت 🎉 الامتحان النهائي اتفتح.')) : T('لسه أقل من 70%. راجع الأسئلة اللي غلطت فيها وأيامها، وبعدين أعد الاختبار.')) + '</div>' +
        '<div class="jr-actions"><button type="button" class="ghost-btn" data-jretake>' + T('أعد الاختبار') + '</button>' +
        (ok && w.n % 4 === 0 && examOpen(w.n / 4) ? '<button type="button" class="ghost-btn" data-exam="' + (w.n / 4) + '">' +
          (w.n === 24 ? '🎓 ' + T('الامتحان النهائي') : '📝 ' + TF('امتحان الشهر {n}', { n: w.n / 4 })) + '</button>' : '') +
        (ok && w.n < 24 ? '<button type="button" class="link-btn" data-jweek="' + (w.n + 1) + '">' + TF('ابدأ الأسبوع {n}', { n: w.n + 1 }) + ' ' + T('←') + '</button>' : '') + '</div>';
    }else{
      var picked = day.test.filter(function(_, i){ return M.testSel[i] != null; }).length;
      th += '<div class="jr-actions"><button type="button" class="link-btn" data-jsubmit' + (picked === day.test.length ? '' : ' disabled') + '>' + T('سلّم الاختبار') + '</button>' +
        '<span class="sub-note">' + TF('جاوبت {a} من {n}', { a: picked, n: day.test.length }) + '</span></div>';
    }
    h += block(3, T('الاختبار الأسبوعي'), th);
    box.innerHTML = h;
  }
  function renderAll(){ renderSum(); renderSide(); renderMain(); }
  function scrollToMain(){ try{ M.main.scrollIntoView({ behavior: 'smooth', block: 'start' }); }catch(e){} }
  function selectExam(m){
    M.selExam = m;
    if(!M.exam || M.exam.m !== m) M.exam = null;
    M.el.classList.remove('side-open');
    var sb = M.el.querySelector('[data-jside]'); if(sb) sb.setAttribute('aria-expanded', 'false');
    renderSide(); renderMain(); scrollToMain();
  }
  function selectWeek(n, scroll){
    M.selWeek = n; M.selExam = 0; M.testSel = {}; M.testResult = null;
    var w = weekObj(n);
    M.selDay = w ? pickDay(w) : 1;
    M.el.classList.remove('side-open');
    var sb = M.el.querySelector('[data-jside]'); if(sb) sb.setAttribute('aria-expanded', 'false');
    renderSide(); renderMain();
    if(scroll) scrollToMain();
  }
  function refreshDay(w){ renderTabs(w); renderDay(w); renderSum(); renderSide(); }

  // ---- events ----
  function onClick(e){
    var t = e.target.closest ? e.target.closest('button') : null;
    if(!t || !M.el.contains(t) || t.disabled) return;
    if(t.hasAttribute('data-jtoday')){ selectWeek(currentWeek(), true); return; }
    if(t.hasAttribute('data-jside')){
      var open = M.el.classList.toggle('side-open');
      t.setAttribute('aria-expanded', open);
      return;
    }
    if(t.dataset.week){ selectWeek(Number(t.dataset.week), true); return; }
    if(t.dataset.jweek){ selectWeek(Number(t.dataset.jweek), true); return; }
    if(t.hasAttribute('data-jretry')){ renderMain(); return; }
    if(t.dataset.exam){ selectExam(Number(t.dataset.exam)); return; }
    if(M.selExam){ onExamClick(t); return; }
    var w = weekObj(M.selWeek);
    if(!w) return;
    if(t.dataset.day){
      var d = Number(t.dataset.day), lock = document.getElementById('jrLock');
      if(!dayOpen(w, d)){
        lock.textContent = d === 6 ? T('يوم الاختبار لسه مقفول 🔒 خلّص الخمس أيام الأول.')
          : TF('اليوم {d} لسه مقفول 🔒 خلّص اليوم {p} الأول: كل مهام «اتمرّن بإيدك»، ونسبة النجاح في اختباره.', { d: d, p: d - 1 });
        lock.hidden = false;
        return;
      }
      lock.hidden = true;
      M.selDay = d; M.testSel = {}; M.testResult = null;
      renderTabs(w); renderDay(w);
      return;
    }
    var day = w.days[M.selDay - 1];
    if(t.dataset.jcopy != null){ if(M.opts.copy) M.opts.copy(L(day.code[Number(t.dataset.jcopy)].p), t); return; }
    if(t.dataset.jq){
      if(M.progress.answers[t.dataset.jq] != null) return;
      M.progress.answers[t.dataset.jq] = Number(t.dataset.o);
      var qi = Number(t.dataset.jq.split('_').pop());
      if(day.quiz[qi] && Number(t.dataset.o) !== day.quiz[qi].a) wrong(t.dataset.jq.slice(1).replace('_', 'q'), day.quiz[qi], Number(t.dataset.o), { ar: 'الأسبوع {w} · اليوم {d}', en: 'Week {w} · Day {d}' }, { w: w.n, d: day.d });
      save(); refreshDay(w);
      return;
    }
    if(t.hasAttribute('data-jreset')){
      day.quiz.forEach(function(_, i){ delete M.progress.answers['q' + day.key + '_' + i]; });
      save(); refreshDay(w);
      return;
    }
    if(t.hasAttribute('data-jnext')){
      M.selDay = Math.min(6, M.selDay + 1); M.testSel = {}; M.testResult = null;
      renderTabs(w); renderDay(w); scrollToMain();
      return;
    }
    if(t.dataset.jt != null && !M.testResult){
      M.testSel[Number(t.dataset.jt)] = Number(t.dataset.o);
      renderDay(w);
      return;
    }
    if(t.hasAttribute('data-jsubmit')){
      var answers = day.test.map(function(_, i){ return M.testSel[i]; });
      if(answers.some(function(a){ return a == null; })) return;
      var score = day.test.filter(function(q, i){ return answers[i] === q.a; }).length;
      var attempt = { score: score, total: day.test.length, at: Date.now(), answers: answers };
      var id = J.rules.testId(w.n);
      (M.progress.tests[id] || (M.progress.tests[id] = [])).push(attempt);
      M.testResult = attempt;
      day.test.forEach(function(q, i){ if(answers[i] !== q.a) wrong('w' + pad(w.n) + 't' + i, q, answers[i], { ar: 'اختبار الأسبوع {w}', en: 'Week {w} test' }, { w: w.n }); });
      save();
      if(M.opts.onAttempt) M.opts.onAttempt(id, attempt);
      emit('journey:attempt', { track: M.track, testId: id, attempt: attempt });
      renderAll();
      return;
    }
    if(t.hasAttribute('data-jretake')){ M.testSel = {}; M.testResult = null; renderDay(w); }
  }
  function onExamClick(t){
    var E = M.exam, m = M.selExam;
    if(!E) return;
    if(t.dataset.je != null && !E.result){
      E.sel[Number(t.dataset.je)] = Number(t.dataset.o);
      renderExam();
      return;
    }
    if(t.hasAttribute('data-jesubmit')){
      var answers = E.qs.map(function(_, i){ return E.sel[i]; });
      if(answers.some(function(a){ return a == null; })) return;
      var score = E.qs.filter(function(id, i){ var q = J.question(M.track, id); return q && answers[i] === q.a; }).length;
      var attempt = { score: score, total: E.qs.length, at: Date.now(), answers: answers, qs: E.qs };
      var id = J.rules.examId(m);
      (M.progress.tests[id] || (M.progress.tests[id] = [])).push(attempt);
      E.result = attempt;
      E.qs.forEach(function(qid, i){ var q = J.question(M.track, qid); if(q && answers[i] !== q.a) wrong(qid, q, answers[i], m === 6 ? { ar: 'الامتحان النهائي', en: 'Final exam' } : { ar: 'امتحان الشهر {n}', en: 'Month {n} exam' }, { n: m }); });
      save();
      if(M.opts.onAttempt) M.opts.onAttempt(id, attempt);
      emit('journey:attempt', { track: M.track, testId: id, attempt: attempt });
      renderSum(); renderSide(); renderExam();
      return;
    }
    if(t.hasAttribute('data-jeretake')){ M.exam = null; renderExam(); scrollToMain(); return; }
    if(t.hasAttribute('data-jprint')){ document.body.classList.add('print-cert'); window.print(); document.body.classList.remove('print-cert'); }
  }
  function onChange(e){
    var id = e.target.dataset && e.target.dataset.jdone;
    if(!id) return;
    if(e.target.checked) M.progress.done[id] = true; else delete M.progress.done[id];
    save();
    var w = weekObj(M.selWeek);
    if(w){
      renderTabs(w);
      var day = w.days[M.selDay - 1];
      if(day.d !== 6){
        var st = dayStat(w, day), mono = document.querySelector('#jrDay .sp-head .mono'), next = document.querySelector('#jrDay [data-jnext]');
        if(mono) mono.textContent = headStats(day, st);
        if(st.done !== !!next) renderDay(w);
      }
    }
    renderSum(); renderSide();
  }

  // wrong answers go to the mistakes notebook (review page); ids match J.pool: wNNd<d>q<i> and wNNt<i>
  // `from` says where the question was ({ar, en} template with {name} placeholders)
  function wrong(id, q, chosen, from, vars){
    if(!window.SITE || !SITE.mistake) return;
    var fill = function(s){ return s.replace(/\{(\w+)\}/g, function(_, k){ return vars && vars[k] != null ? vars[k] : ''; }); };
    SITE.mistake(M.track, M.track + ':' + id, q, chosen, { ar: fill(from.ar), en: fill(from.en) });
  }
  // #journey?w=5&d=2 opens week 5 (day 2 when it is unlocked); #journey?exam=2 opens the month 2 exam
  function onDeepLink(e){
    var d = e.detail || {};
    if(!M || d.id !== 'journey') return;
    var w = Number(d.p.w), ex = Number(d.p.exam);
    if(ex >= 1 && ex <= 6){ selectExam(ex); return; }
    if(!(w >= 1 && w <= 24)) return;
    M.wantDay = Number(d.p.d) || 0;
    selectWeek(w, true);
  }

  // ---- public ----
  // opts: {track, el, storeKey, legacyKey, wordActions(word)→html, copy(text, btn), onActivity(), onChange(progress),
  //        onAttempt(testId, attempt), onDay(week, day), onExternal()}
  J.mount = function(opts){
    var outline = J.outlines[opts.track];
    if(!outline || !opts.el) return;
    var p = null;
    try{ p = JSON.parse(localStorage.getItem(opts.storeKey)); }catch(e){}
    p = normalize(p);
    var wasImported = p.imported;
    importLegacy(p, opts.legacyKey);
    M = { track: opts.track, outline: outline, key: opts.storeKey, progress: p, opts: opts, el: opts.el, testSel: {}, testResult: null, selExam: 0, exam: null };
    if(!wasImported) storeLocal();
    opts.el.innerHTML =
      '<div class="jr-bar"><button type="button" class="link-btn jr-today" data-jtoday>▶ ' + T('كمّل من حيث وقفت') + '</button>' +
      '<span class="jr-sum"></span><button type="button" class="ghost-btn jr-side-btn" data-jside aria-expanded="false">☰ ' + T('كل الأسابيع (24)') + '</button></div>' +
      '<div class="jr-layout"><nav class="jr-side" aria-label="' + esc(T('أسابيع الرحلة')) + '"></nav><div class="jr-main"></div></div>';
    M.sum = opts.el.querySelector('.jr-sum');
    M.side = opts.el.querySelector('.jr-side');
    M.main = opts.el.querySelector('.jr-main');
    opts.el.addEventListener('click', onClick);
    opts.el.addEventListener('change', onChange);
    document.addEventListener('site:deeplink', onDeepLink);
    M.selWeek = currentWeek();
    var w = weekObj(M.selWeek);
    M.selDay = w ? firstOpenDay(w) : 1;
    renderAll();
  };
  J.getProgress = function(){ return M ? M.progress : null; };
  J.storeKey = function(){ return M ? M.key : null; };
  // Replace the progress (after merging with the cloud copy). Saved locally; onChange is not called.
  J.setProgress = function(p){
    if(!M) return;
    M.progress = normalize(p);
    M.progress.imported = true;
    storeLocal();
    M.testSel = {}; M.testResult = null; M.exam = null;
    renderAll();
    if(M.opts.onExternal) M.opts.onExternal();
  };
  J.track = function(){ return M ? M.track : null; };
})();
