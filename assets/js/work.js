/* work.html: workplace English in scenario modules (levels A2 and B1), in the spirit of freeCodeCamp's
 * «English for Developers»: a short dialogue to listen to line by line, the key phrases, then a module quiz
 * (fill the gap / choose the answer, each with its reason). 80% marks the module done (`done` store, synced);
 * wrong answers go to the mistakes notebook. Each level ends with a 20-question exam drawn from its modules.
 * Module data (content/sections/work-a2.js, work-b1.js), compact on purpose:
 *   { id, t:{ar,en}, body:{ar,en},                       title and goal (also used by the site search)
 *     d:  [[speaker, en, ar], …],                        the dialogue
 *     ph: [[en, ar], …],                                 key phrases
 *     q:  [['f', 'sentence with ___', answer, [wrong…], whyAr, whyEn],          fill the gap
 *          ['m', questionAr, questionEn, [options…], rightIndex, whyAr, whyEn]] } choose the answer */
(function(){
  var S = window.SITE, X = window.SECTIONS, B = S.B, L = S.L, esc = S.esc;
  var PASS = 0.8, EXAM_N = 20;

  // one question shape for both kinds: {key, q:{ar,en}, o:[…], a, why:{ar,en}}
  function questions(mod){
    return (mod.q || []).map(function(r, i){
      var key = mod.id + '-q' + (i + 1);
      if(r[0] === 'f'){
        var o = [r[2]].concat(r[3]);
        return { key: key, gap: r[1], q: { ar: 'كمّل الجملة: ' + r[1], en: 'Complete the sentence: ' + r[1] }, o: o, a: 0, why: { ar: r[4], en: r[5] } };
      }
      return { key: key, q: { ar: r[1], en: r[2] }, o: r[3], a: r[4], why: { ar: r[5], en: r[6] } };
    });
  }
  X.workQuestions = questions;   // for the tests
  function gap(s){ return esc(s).replace(/_{3,}/g, '<span class="wk-gap">_____</span>'); }
  function qText(q){ return q.gap ? '<span class="wk-fill">' + esc(B('كمّل الجملة:', 'Complete the sentence:')) + '</span> <span dir="ltr" class="wk-en">' + gap(q.gap) + '</span>' : esc(L(q.q)); }
  function doneOf(id){ var d = S.get('done')[id]; return d && !d.del ? d : null; }
  function speakBtn(text){ return S.canSpeak ? '<button type="button" class="speak" data-say="' + esc(text) + '" aria-label="' + esc(B('اسمع', 'Listen')) + '">🔊</button>' : ''; }
  function arabicNote(ar){ return window.LANG === 'ar' && ar ? '<span class="wk-ar">' + esc(ar) + '</span>' : ''; }

  // a list of questions answered in place; onAnswer(q, i, right) after each answer, onEnd(score) when all are answered
  function quiz(box, qs, onEnd, from){
    var ans = {};
    function paint(){
      var n = Object.keys(ans).length;
      box.innerHTML = qs.map(function(q, k){
        var a = ans[q.key];
        return '<div class="q-card"><div class="qn">' + (k + 1) + ' / ' + qs.length + '</div><div class="qq">' + qText(q) + '</div><div class="q-opts" dir="ltr">' +
          S.order(q.o.length, q.key).map(function(i){
            var cls = '';
            if(a != null){ if(i === q.a) cls = ' right'; else if(i === a) cls = ' wrong'; }
            return '<button type="button" class="q-opt' + cls + '" data-k="' + k + '" data-o="' + i + '"' + (a != null ? ' disabled' : '') + '>' + esc(q.o[i]) + '</button>';
          }).join('') + '</div>' +
          (a != null ? '<div class="q-why">' + (a === q.a ? '✓ ' + esc(B('صح.', 'Right.')) : '✗ ' + esc(B('الإجابة الصح متعلّمة بالأخضر.', 'The right answer is in green.'))) + ' ' + esc(L(q.why)) + '</div>' : '') + '</div>';
      }).join('');
      if(n === qs.length){
        var score = qs.filter(function(q){ return ans[q.key] === q.a; }).length;
        box.insertAdjacentHTML('beforeend', onEnd(score) || '');
      }
    }
    box.addEventListener('click', function(e){
      var b = e.target.closest('[data-o]');
      if(b){
        var q = qs[+b.dataset.k], i = +b.dataset.o;
        if(ans[q.key] != null) return;
        ans[q.key] = i;
        if(i !== q.a) S.mistake('english', 'work-' + q.key, { q: q.q, o: q.o, a: q.a, why: q.why }, i, from);
        paint();
        return;
      }
      if(e.target.closest('[data-retry]')){ ans = {}; paint(); }
    });
    paint();
  }

  // ---------- a level: its modules ----------
  X.type('workmods', function(el, sec){
    var mods = sec.items || [];
    function head(){
      var n = mods.filter(function(m){ return doneOf(sec.id + ':' + m.id); }).length;
      return '<p class="progress-txt">' + esc(B('خلّصت ' + n + ' من ' + mods.length + ' موديول', 'Done ' + n + ' of ' + mods.length + ' modules')) + '</p>' +
        '<div class="progress-bar"><div class="progress-fill" style="width:' + Math.round(n / (mods.length || 1) * 100) + '%"></div></div>';
    }
    function summary(m, i){
      var d = doneOf(sec.id + ':' + m.id);
      return '<summary><span class="ln">' + (i + 1) + '</span><span class="lt">' + esc(L(m.t)) + '</span>' +
        '<span class="tag">' + (m.q || []).length + ' ' + esc(B('سؤال', 'questions')) + '</span>' + (d ? '<span class="ok">✓ ' + d.s + '/' + d.n + '</span>' : '') + '</summary>';
    }
    el.innerHTML = '<div class="wk-head">' + head() + '</div><div class="lesson-list">' + mods.map(function(m, i){
      return '<details class="md-card lesson wk-mod' + (doneOf(sec.id + ':' + m.id) ? ' done' : '') + '" data-id="' + esc(m.id) + '">' + summary(m, i) + '<div class="wk-body"></div></details>';
    }).join('') + '</div>';
    function draw(det){
      var m = mods.filter(function(x){ return x.id === det.dataset.id; })[0], body = det.querySelector('.wk-body');
      if(!m || body.childNodes.length) return;
      var lines = m.d || [];
      body.innerHTML = '<div class="md-body">' + S.md(m.body) + '</div>' +
        '<h3 class="wk-h">💬 ' + esc(B('الحوار', 'The dialogue')) + '</h3>' +
        (S.canSpeak ? '<div class="jr-actions"><button type="button" class="ghost-btn" data-play>▶ ' + esc(B('اسمع الحوار كله', 'Play the whole dialogue')) + '</button>' +
          '<button type="button" class="ghost-btn" data-stop>■ ' + esc(B('وقّف', 'Stop')) + '</button></div>' : '') +
        '<ol class="wk-dialogue">' + lines.map(function(l, k){
          return '<li data-line="' + k + '"><b class="wk-who" dir="ltr">' + esc(l[0]) + '</b> <span class="wk-en" dir="ltr">' + esc(l[1]) + '</span> ' + speakBtn(l[1]) + arabicNote(l[2]) + '</li>';
        }).join('') + '</ol>' +
        (m.ph && m.ph.length ? '<h3 class="wk-h">🧩 ' + esc(B('جمل تاخدها معاك', 'Phrases to keep')) + '</h3><ul class="wk-phrases">' + m.ph.map(function(p){
          return '<li><span class="wk-en" dir="ltr">' + esc(p[0]) + '</span> ' + speakBtn(p[0]) + arabicNote(p[1]) + '</li>';
        }).join('') + '</ul>' : '') +
        '<h3 class="wk-h">✅ ' + esc(B('اختبار الموديول', 'Module quiz')) + '</h3><p class="sub-note">' +
        esc(B('جاوب على الكل. لو جبت ' + Math.round(PASS * 100) + '% أو أكتر الموديول يتعلّم إنه خلص.', 'Answer them all. ' + Math.round(PASS * 100) + '% or more marks the module as done.')) + '</p><div class="wk-quiz"></div>';
      var qs = questions(m);
      quiz(body.querySelector('.wk-quiz'), qs, function(score){
        var need = Math.ceil(qs.length * PASS), ok = score >= need, id = sec.id + ':' + m.id, old = doneOf(id);
        if(ok && (!old || old.s < score)) S.setItem('done', id, { s: score, n: qs.length });
        refresh(det);
        return '<div class="q-why wk-result' + (ok ? ' ok' : '') + '">' + esc(ok ? B('برافو! جبت ' + score + ' من ' + qs.length + '، والموديول ده خلص ✓', 'Well done! ' + score + ' of ' + qs.length + ', this module is done ✓') :
          B('جبت ' + score + ' من ' + qs.length + '. محتاج ' + need + '. اقرا الحوار تاني وجرّب.', score + ' of ' + qs.length + '. You need ' + need + '. Read the dialogue again and retry.')) +
          ' <button type="button" class="link-btn" data-retry>' + esc(B('أعد الاختبار', 'Retry the quiz')) + '</button></div>';
      }, { ar: 'إنجليزي الشغل: ' + m.t.ar, en: 'Workplace English: ' + m.t.en });
    }
    function refresh(det){
      el.querySelector('.wk-head').innerHTML = head();
      var i = mods.map(function(x){ return x.id; }).indexOf(det.dataset.id);
      det.querySelector('summary').outerHTML = summary(mods[i], i);
      det.classList.toggle('done', !!doneOf(sec.id + ':' + det.dataset.id));
    }
    function play(det, k){
      var li = det.querySelectorAll('.wk-dialogue li');
      det.querySelectorAll('.wk-dialogue li.on').forEach(function(x){ x.classList.remove('on'); });
      if(k >= li.length) return;
      li[k].classList.add('on');
      S.speak(li[k].querySelector('.wk-en').textContent, { onend: function(){ if(det._playing) play(det, k + 1); } });
    }
    el.addEventListener('click', function(e){
      var say = e.target.closest('[data-say]');
      if(say){ S.speak(say.getAttribute('data-say')); return; }
      var det = e.target.closest('details.wk-mod');
      if(!det) return;
      if(e.target.closest('[data-play]')){ det._playing = true; play(det, 0); }
      if(e.target.closest('[data-stop]')){ det._playing = false; S.stopSpeak(); det.querySelectorAll('.wk-dialogue li.on').forEach(function(x){ x.classList.remove('on'); }); }
    });
    // one module open at a time; it is drawn on its first opening
    el.addEventListener('toggle', function(e){
      if(!e.target.open || !e.target.classList.contains('wk-mod')) return;
      draw(e.target);
      el.querySelectorAll('details.wk-mod[open]').forEach(function(d){ if(d !== e.target){ d.open = false; d._playing = false; } });
    }, true);
  });

  // ---------- the level exams ----------
  X.type('workexam', function(el, sec){
    function bank(level){
      var s = X.all('work').filter(function(x){ return x.id === level; })[0];
      return s ? [].concat.apply([], (s.items || []).map(questions)) : [];
    }
    function pick(all){
      var a = all.slice();
      for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
      return a.slice(0, EXAM_N);
    }
    el.innerHTML = '<div class="wk-exams"></div><div class="wk-run"></div>';
    function paint(){
      el.querySelector('.wk-exams').innerHTML = (sec.levels || []).map(function(lv){
        var d = doneOf('work-exam:' + lv.id), n = bank(lv.id).length;
        return '<div class="md-card wk-exam"><h3>' + esc(L(lv.t)) + '</h3><p class="sub-note">' + esc(B(EXAM_N + ' سؤال عشوائي من ' + n + ' سؤال في الموديولات. النجاح ' + Math.round(PASS * 100) + '%.',
          EXAM_N + ' random questions out of the ' + n + ' in the modules. Pass mark ' + Math.round(PASS * 100) + '%.')) + '</p>' +
          (d ? '<p class="wk-pass">🏅 ' + esc(B('عدّيت الامتحان ده: ' + d.s + ' من ' + d.n + ' (' + d.day + ')', 'You passed this exam: ' + d.s + ' of ' + d.n + ' (' + d.day + ')')) + '</p>' : '') +
          '<button type="button" class="link-btn" data-start="' + esc(lv.id) + '">' + esc(B(d ? 'امتحن تاني' : 'ابدأ الامتحان', d ? 'Take it again' : 'Start the exam')) + '</button></div>';
      }).join('');
    }
    el.addEventListener('click', function(e){
      var st = e.target.closest('[data-start]');
      if(!st) return;
      var id = st.dataset.start, lv = sec.levels.filter(function(x){ return x.id === id; })[0], qs = pick(bank(id));
      // a fresh box each time, so the old quiz's listener goes with it
      var old = el.querySelector('.wk-run'), run = document.createElement('div');
      run.className = 'wk-run';
      old.parentNode.replaceChild(run, old);
      run.innerHTML = '<h3 class="wk-h">' + esc(L(lv.t)) + '</h3><div class="wk-quiz"></div>';
      quiz(run.querySelector('.wk-quiz'), qs, function(score){
        var ok = score >= Math.ceil(qs.length * PASS), best = doneOf('work-exam:' + id);
        if(ok && (!best || best.s <= score)){ S.setItem('done', 'work-exam:' + id, { s: score, n: qs.length, day: S.today() }); paint(); }
        return '<div class="q-why wk-result' + (ok ? ' ok' : '') + '">' + esc(ok ? B('مبروك! عدّيت امتحان ' + L(lv.t) + ' بـ ' + score + ' من ' + qs.length + ' 🏅', 'Congratulations! You passed ' + L(lv.t) + ' with ' + score + ' of ' + qs.length + ' 🏅') :
          B('جبت ' + score + ' من ' + qs.length + '. ارجع للموديولات اللي غلطت فيها (هتلاقي الأسئلة في دفتر الأخطاء) وجرّب تاني.', score + ' of ' + qs.length + '. Go back to the modules you missed (the questions are in your mistakes notebook) and try again.')) + '</div>';
      }, { ar: 'امتحان ' + lv.t.ar, en: lv.t.en + ' exam' });
      run.scrollIntoView({ block: 'start' });
    });
    paint();
  });
})();
