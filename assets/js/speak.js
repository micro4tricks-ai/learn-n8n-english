/* speak.html: scored pronunciation (Web Speech recognition), shadowing (speech + your own recording)
 * and dictation. Best scores go to the `speak` store (synced with the account). Recordings stay in memory. */
(function(){
  var S = window.SITE, X = window.SECTIONS, B = S.B, L = S.L, esc = S.esc;
  var LV = [['all', 'الكل', 'All'], ['b', 'مبتدئ', 'Beginner'], ['i', 'متوسط', 'Intermediate'], ['a', 'متقدم', 'Advanced']];
  var NUM = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty', 100: 'hundred' };
  // words for comparing: lower case, no punctuation, contractions opened, digits as words
  function words(s){
    return String(s).toLowerCase()
      .replace(/[’']/g, "'").replace(/\b(\w+)n't\b/g, '$1 not').replace(/\bi'm\b/g, 'i am').replace(/\b(\w+)'re\b/g, '$1 are')
      .replace(/\b(\w+)'ll\b/g, '$1 will').replace(/\b(\w+)'ve\b/g, '$1 have').replace(/\blet's\b/g, 'let us').replace(/\bit's\b/g, 'it is')
      .replace(/(\d+)%/g, '$1 percent').replace(/[^a-z0-9'\s-]/g, ' ').replace(/-/g, ' ')
      .split(/\s+/).filter(Boolean).map(function(w){ return NUM[w] || w.replace(/'s$/, ''); });
  }
  // which target words were said, in order (longest common subsequence)
  function match(target, heard){
    var t = words(target), h = words(heard), n = t.length, m = h.length, dp = [];
    for(var i = 0; i <= n; i++){ dp.push(new Array(m + 1).fill(0)); }
    for(i = n - 1; i >= 0; i--) for(var j = m - 1; j >= 0; j--) dp[i][j] = t[i] === h[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    var ok = new Array(n).fill(false); i = 0; j = 0;
    while(i < n && j < m){ if(t[i] === h[j]){ ok[i] = true; i++; j++; } else if(dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
    var shown = String(target).split(/\s+/), k = 0;
    // map the shown tokens (with punctuation) to the compared words: tokens that split into several words take their share
    var marks = shown.map(function(tok){ var c = words(tok).length, r = true; for(var x = 0; x < c; x++) r = r && ok[k + x]; k += c; return c ? r : true; });
    return { shown: shown, marks: marks, score: n ? Math.round(ok.filter(Boolean).length / n * 100) : 0 };
  }
  S.speakMatch = match;   // for the tests
  // the Arabic meaning helps on the Arabic interface only
  function ar(s){ return window.LANG === 'ar' ? '<p class="sp-ar">' + esc(s.ar) + '</p>' : ''; }
  function best(id){ var b = S.get('speak')[id]; return b && !b.del ? b : null; }
  function saveBest(id, field, score){
    var b = best(id) || {};
    if((b[field] || 0) >= score) return;
    b[field] = score;
    S.setItem('speak', id, b);
  }
  function picker(sentences, st){
    var list = sentences.filter(function(s){ return st.lv === 'all' || s.lvl === st.lv; });
    if(st.i >= list.length) st.i = 0;
    return { list: list, cur: list[st.i] };
  }
  function lvTabs(st){
    return '<div class="cat-tabs">' + LV.map(function(l){ return '<button type="button" class="cat-tab' + (st.lv === l[0] ? ' active' : '') + '" data-lv="' + l[0] + '">' + esc(B(l[1], l[2])) + '</button>'; }).join('') + '</div>';
  }
  function nav(p, st){
    return '<div class="jr-actions sp-nav"><button type="button" class="ghost-btn" data-prev aria-label="' + esc(B('الجملة اللي قبلها', 'Previous sentence')) + '">' + (window.LANG === 'en' ? '←' : '→') + '</button>' +
      '<span class="sub-note">' + (st.i + 1) + ' / ' + p.list.length + '</span><button type="button" class="ghost-btn" data-next aria-label="' + esc(B('الجملة اللي بعدها', 'Next sentence')) + '">' + (window.LANG === 'en' ? '→' : '←') + '</button></div>';
  }
  function common(el, st, paint){
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      if(b.dataset.lv){ st.lv = b.dataset.lv; st.i = 0; st.res = null; paint(); }
      else if(b.hasAttribute('data-next')){ st.i++; st.res = null; paint(); }
      else if(b.hasAttribute('data-prev')){ st.i = Math.max(0, st.i - 1); st.res = null; paint(); }
    });
  }
  var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;

  // ---------------- pronunciation ----------------
  X.type('pronounce', function(el, sec){
    var st = { lv: 'all', i: 0, res: null, listening: false }, rec = null;
    function paint(){
      var p = picker(sec.sentences, st), s = p.cur, b = best(s.id);
      var h = lvTabs(st) + '<div class="md-card sp-card"><div class="sp-sent" dir="ltr" lang="en">';
      if(st.res){ var m = match(s.en, st.res.text); h += m.shown.map(function(w, i){ return '<span class="' + (m.marks[i] ? 'w-ok' : 'w-miss') + '">' + esc(w) + '</span>'; }).join(' '); }
      else h += esc(s.en);
      h += '</div>' + ar(s) +
        '<div class="jr-actions"><button type="button" class="ghost-btn" data-say>🔊 ' + esc(B('اسمع', 'Listen')) + '</button><button type="button" class="ghost-btn" data-slow>🐢 ' + esc(B('أبطأ', 'Slower')) + '</button>' +
        (Rec ? '<button type="button" class="link-btn' + (st.listening ? ' rec-on' : '') + '" data-rec>' + (st.listening ? '⏺ ' + esc(B('بسمعك… دوس لما تخلص', 'Listening… press when done')) : '🎙 ' + esc(B('قولها', 'Say it'))) + '</button>' : '') + '</div>';
      if(!Rec) h += '<p class="lock-note">' + esc(B('المتصفح ده مش بيدعم التعرّف على الكلام. افتح الصفحة على Chrome أو Edge أو Safari، أو استخدم الـ Shadowing تحت وقارن بودنك.', 'This browser does not support speech recognition. Open the page in Chrome, Edge or Safari, or use shadowing below and compare by ear.')) + '</p>';
      if(st.res){
        var mm = match(s.en, st.res.text);
        h += '<div class="jr-result ' + (mm.score >= 80 ? 'pass' : 'fail') + '" role="status"><b>' + mm.score + '%</b> — ' + esc(mm.score >= 95 ? B('ممتاز! كل الكلمات اتفهمت.', 'Excellent! Every word was understood.') : mm.score >= 80 ? B('كويس جدًا. ركّز على الكلمات الحمرا وقولها تاني.', 'Very good. Focus on the red words and say it again.') : B('اسمع تاني بالبطيء، وقول الجملة على أجزاء.', 'Listen again slowly and say the sentence in parts.')) +
          '</div><p class="sub-note">' + esc(B('اتفهم منك: ', 'Heard: ')) + '<span dir="ltr">«' + esc(st.res.text) + '»</span></p>';
      }
      if(st.err) h += '<p class="acct-msg" role="alert">' + esc(st.err) + '</p>';
      h += (b && b.say ? '<p class="sub-note">' + esc(B('أحسن نتيجة ليك في الجملة دي: ', 'Your best on this sentence: ')) + b.say + '%</p>' : '') + '</div>' + nav(p, st);
      el.innerHTML = h;
    }
    function listen(){
      if(st.listening && rec){ rec.stop(); return; }
      var s = picker(sec.sentences, st).cur;
      S.stopSpeak();
      rec = new Rec();
      rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 3; rec.continuous = false;
      st.err = ''; st.listening = true; paint();
      rec.onresult = function(e){
        // pick the alternative closest to the target
        var alts = [].slice.call(e.results[0]).map(function(a){ return a.transcript; });
        var pick = alts.sort(function(a, b){ return match(s.en, b).score - match(s.en, a).score; })[0] || '';
        st.res = { text: pick };
        saveBest(s.id, 'say', match(s.en, pick).score);
      };
      rec.onerror = function(e){
        st.err = e.error === 'not-allowed' || e.error === 'service-not-allowed' ? B('محتاج تسمح للصفحة تستخدم المايك (من علامة القفل جنب العنوان).', 'Allow the page to use the microphone (the lock icon next to the address).')
          : e.error === 'no-speech' ? B('ماسمعناش صوت. قرّب من المايك وجرّب تاني.', 'No speech heard. Move closer to the microphone and try again.')
          : e.error === 'network' ? B('التعرّف على الكلام محتاج نت.', 'Speech recognition needs an internet connection.') : B('حصلت مشكلة: ', 'Something went wrong: ') + e.error;
      };
      rec.onend = function(){ st.listening = false; paint(); };
      try{ rec.start(); }catch(err){ st.listening = false; st.err = String(err.message || err); paint(); }
    }
    common(el, st, paint);
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      var s = picker(sec.sentences, st).cur;
      if(b.hasAttribute('data-say')) S.speak(s.en);
      if(b.hasAttribute('data-slow')) S.speak(s.en, { rate: 0.7 });
      if(b.hasAttribute('data-rec')) listen();
    });
    paint();
  });

  // ---------------- shadowing ----------------
  X.type('shadow', function(el, sec){
    var st = { lv: 'all', i: 0, rate: 0.9, reps: 0 }, media = null, chunks = [], recUrl = null, recording = false;
    var canRec = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
    function paint(){
      var p = picker(sec.sentences, st), s = p.cur;
      el.innerHTML = lvTabs(st) + '<div class="md-card sp-card"><div class="sp-sent" dir="ltr" lang="en">' + esc(s.en) + '</div>' + ar(s) +
        '<ol class="sp-steps"><li>' + esc(B('اسمع الجملة مرة وانت بتقرا.', 'Listen once while you read.')) + '</li><li>' + esc(B('اسمعها تاني وقولها معاه في نفس الوقت.', 'Listen again and say it along with the voice.')) + '</li><li>' + esc(B('سجّل نفسك وقارن بالأصل.', 'Record yourself and compare with the original.')) + '</li></ol>' +
        '<label class="lib-filter"><span>' + esc(B('السرعة:', 'Speed:')) + '</span><input type="range" min="0.6" max="1.2" step="0.1" value="' + st.rate + '" data-rate> <b dir="ltr">' + st.rate.toFixed(1) + '×</b></label>' +
        '<div class="jr-actions"><button type="button" class="ghost-btn" data-play>🔊 ' + esc(B('اسمع', 'Listen')) + '</button>' +
        (canRec ? '<button type="button" class="link-btn' + (recording ? ' rec-on' : '') + '" data-record>' + (recording ? '⏹ ' + esc(B('وقّف التسجيل', 'Stop recording')) : '⏺ ' + esc(B('سجّل نفسك', 'Record yourself'))) + '</button>' : '') +
        (recUrl ? '<button type="button" class="ghost-btn" data-mine>▶ ' + esc(B('اسمع تسجيلك', 'Play your recording')) + '</button><button type="button" class="ghost-btn" data-both>🔁 ' + esc(B('الأصل وبعده تسجيلك', 'Original, then yours')) + '</button>' : '') +
        '<button type="button" class="ghost-btn" data-rep>✓ ' + esc(B('عدّيتها', 'Done one')) + ' (' + st.reps + ')</button></div>' +
        (canRec ? '' : '<p class="sub-note">' + esc(B('التسجيل مش مدعوم هنا، بس تقدر تعمل Shadowing من غيره.', 'Recording is not supported here, but you can shadow without it.')) + '</p>') +
        '<p class="acct-msg" role="alert">' + esc(st.err || '') + '</p></div>' + nav(p, st);
    }
    function stopTracks(){ if(media && media.stream) media.stream.getTracks().forEach(function(t){ t.stop(); }); }
    function record(){
      if(recording && media){ media.stop(); return; }
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream){
        chunks = [];
        media = new MediaRecorder(stream);
        media.ondataavailable = function(e){ if(e.data.size) chunks.push(e.data); };
        media.onstop = function(){
          recording = false; stopTracks();
          if(recUrl) URL.revokeObjectURL(recUrl);
          recUrl = URL.createObjectURL(new Blob(chunks, { type: media.mimeType || 'audio/webm' }));
          paint();
        };
        media.start(); recording = true; st.err = ''; paint();
        setTimeout(function(){ if(recording && media.state === 'recording') media.stop(); }, 15000);
      }, function(){ st.err = B('محتاج تسمح للصفحة تستخدم المايك.', 'Allow the page to use the microphone.'); paint(); });
    }
    function playMine(then){ if(!recUrl) return; var a = new Audio(recUrl); if(then) a.onended = then; a.play(); }
    common(el, st, function(){ st.reps = 0; if(recUrl){ URL.revokeObjectURL(recUrl); recUrl = null; } paint(); });
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      var s = picker(sec.sentences, st).cur;
      if(b.hasAttribute('data-play')) S.speak(s.en, { rate: st.rate });
      if(b.hasAttribute('data-record')) record();
      if(b.hasAttribute('data-mine')) playMine();
      if(b.hasAttribute('data-both')) S.speak(s.en, { rate: st.rate, onend: function(){ setTimeout(function(){ playMine(); }, 300); } });
      if(b.hasAttribute('data-rep')){ st.reps++; saveBest(s.id, 'shadow', st.reps); paint(); }
    });
    el.addEventListener('input', function(e){ if(e.target.hasAttribute('data-rate')){ st.rate = Number(e.target.value); e.target.nextElementSibling.textContent = st.rate.toFixed(1) + '×'; } });
    paint();
  });

  // ---------------- dictation ----------------
  X.type('dictation', function(el, sec){
    var st = { lv: 'b', i: 0, res: null, typed: '' };
    function paint(){
      var p = picker(sec.sentences, st), s = p.cur, b = best(s.id);
      var h = lvTabs(st) + '<div class="md-card sp-card"><div class="jr-actions"><button type="button" class="link-btn" data-say>🔊 ' + esc(B('اسمع', 'Listen')) + '</button>' +
        '<button type="button" class="ghost-btn" data-slow>🐢 ' + esc(B('أبطأ', 'Slower')) + '</button><button type="button" class="ghost-btn" data-hint>💡 ' + esc(B('تلميح', 'Hint')) + '</button></div>' +
        (st.hint ? '<p class="sp-hint" dir="ltr">' + esc(s.en.split(/\s+/).map(function(w){ return w.charAt(0) + w.slice(1).replace(/[a-z]/gi, '_'); }).join(' ')) + '</p>' : '') +
        '<label class="lab-lbl">' + esc(B('اكتب اللي سمعته:', 'Type what you heard:')) + '<textarea class="lab-code" rows="2" dir="ltr" lang="en" spellcheck="false" autocapitalize="off">' + esc(st.typed) + '</textarea></label>' +
        '<div class="jr-actions"><button type="button" class="link-btn" data-check>✓ ' + esc(B('اتأكد', 'Check')) + '</button></div>';
      if(st.res){
        var m = match(s.en, st.typed), typedWords = words(st.typed), extra = typedWords.filter(function(w){ return words(s.en).indexOf(w) === -1; });
        h += '<div class="diff" dir="ltr">' + m.shown.map(function(w, i){ return '<span class="' + (m.marks[i] ? 'w-ok' : 'w-miss') + '">' + esc(w) + '</span>'; }).join(' ') + '</div>' +
          (extra.length ? '<p class="sub-note">' + esc(B('كلمات كتبتها مش في الجملة: ', 'Words you typed that are not in the sentence: ')) + '<span dir="ltr">' + esc(extra.join(', ')) + '</span></p>' : '') +
          '<div class="jr-result ' + (m.score === 100 ? 'pass' : 'fail') + '" role="status"><b>' + m.score + '%</b> — ' + esc(m.score === 100 ? B('مظبوط! 👏', 'Spot on! 👏') : B('الكلمات الحمرا فاتتك أو اتكتبت غلط. اسمع تاني وصلّحها.', 'You missed or misspelled the red words. Listen again and fix them.')) + '</div>' +
          ar(s);
      }
      h += (b && b.dict ? '<p class="sub-note">' + esc(B('أحسن نتيجة ليك: ', 'Your best: ')) + b.dict + '%</p>' : '') + '</div>' + nav(p, st);
      el.innerHTML = h;
    }
    common(el, st, function(){ st.typed = ''; st.hint = false; paint(); });
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      var s = picker(sec.sentences, st).cur;
      if(b.hasAttribute('data-say')) S.speak(s.en);
      if(b.hasAttribute('data-slow')) S.speak(s.en, { rate: 0.65 });
      if(b.hasAttribute('data-hint')){ st.hint = !st.hint; st.typed = el.querySelector('textarea').value; paint(); }
      if(b.hasAttribute('data-check')){
        st.typed = el.querySelector('textarea').value;
        st.res = 1;
        saveBest(s.id, 'dict', match(s.en, st.typed).score);
        paint();
      }
    });
    el.addEventListener('input', function(e){ if(e.target.tagName === 'TEXTAREA') st.typed = e.target.value; });
    paint();
  });
})();
