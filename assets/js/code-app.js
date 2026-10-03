/* Section types for the code journeys, python.html and js.html (`track` on the section says which):
 *   journey   — the 48-week journey (journey.js), with «Run» on the examples: Python through pyrun.js,
 *               HTML and JavaScript in the sandboxed frame (sandbox.js)
 *   pyterms   — the words of the journey weeks (content/<track>/terms.js) by month, with search
 *   pylibrary — the free library (window.PY_DATA, or the global named by `data`) with category, level, language and «read» filters */
(function(){
  var S = window.SITE, X = window.SECTIONS, B = S.B, L = S.L, esc = S.esc;

  function stats(){
    var box = document.getElementById('pageStats');
    if(!box || !window.JOURNEY || !JOURNEY.track()) return;
    var st = JOURNEY.stats();
    box.innerHTML = '<div class="streak-card"><div class="num">' + S.streak() + '</div><div class="lbl">' + esc(B('يوم متتالي 🔥', 'day streak 🔥')) + '</div></div>' +
      '<div class="streak-card"><div class="num alt">' + st.pct + '%</div><div class="lbl">' + esc(B('الرحلة', 'Journey')) + '</div></div>' +
      '<div class="streak-card"><div class="num">' + st.weeks + '/24</div><div class="lbl">' + esc(B('أسابيع عدّيتها', 'weeks passed')) + '</div></div>';
  }

  // HTML/CSS/JavaScript examples run in a sandboxed frame (scripts allowed, no access to this page or its storage);
  // console.log and errors come back by postMessage and show under the code like Python's output.
  var frameSeq = 0;
  function runWeb(code, out, btn, kind, html){
    var id = 'jr' + (++frameSeq) + '_' + Date.now(), logs = [];
    // a fresh frame for every run, showing run.html#page (sandbox.js): no origin of its own, so no access to this site
    var old = out.nextElementSibling && out.nextElementSibling.classList.contains('run-frame') ? out.nextElementSibling : null;
    var frame = document.createElement('iframe');
    frame.className = 'run-frame'; frame.title = B('معاينة المثال', 'Example preview');
    if(old) old.replaceWith(frame); else out.parentNode.insertBefore(frame, out.nextSibling);
    var hook = '<script>(function(){var ID=' + JSON.stringify(id) + ';function s(t,a){try{parent.postMessage({jr:ID,t:t,a:Array.prototype.map.call(a,function(x){return typeof x==="object"?JSON.stringify(x):String(x);}).join(" ")},"*");}catch(e){}}' +
      'console.log=function(){s("log",arguments);};console.info=console.log;console.warn=function(){s("warn",arguments);};console.error=function(){s("err",arguments);};' +
      'window.onerror=function(m,u,l){s("err",[m+(l?" (line "+l+")":"")]);};window.addEventListener("unhandledrejection",function(e){s("err",[String(e.reason)]);});})();<\/script>';
    var doc = kind === 'html' ? hook + code
      : '<!doctype html><meta charset="utf-8"><body style="font-family:system-ui;margin:12px">' + (html || '') + '</body>' + hook + '<script>\n' + code.replace(/<\/script/gi, '<\\/script') + '\n<\/script>';
    function onMsg(e){
      var d = e.data;
      if(!d || d.jr !== id || e.source !== frame.contentWindow) return;   // only this example's own frame
      logs.push((d.t === 'err' ? '✗ ' : d.t === 'warn' ? '⚠ ' : '') + d.a);
      out.hidden = false;
      out.textContent = logs.join('\n');
      if(d.t === 'err') out.classList.add('bad');
    }
    window.addEventListener('message', onMsg);
    setTimeout(function(){ window.removeEventListener('message', onMsg); }, 60000);
    out.className = 'run-out ok';
    out.textContent = kind === 'html' ? B('المعاينة تحت ↓', 'Preview below ↓') : B('(مفيش console.log لسه)', '(no console.log yet)');
    out.hidden = kind === 'html';
    frame.hidden = kind === 'js' && !html;
    window.SANDBOX.page(frame, doc);
    if(btn && btn.blur) btn.blur();
  }

  // images the example saved (a chart, a resized photo) are shown under its output
  function showImages(out, images){
    var box = out.nextElementSibling && out.nextElementSibling.classList.contains('run-images') ? out.nextElementSibling : null;
    if(box){ box.querySelectorAll('img').forEach(function(i){ URL.revokeObjectURL(i.src); }); box.remove(); }
    if(!images || !images.length) return;
    box = document.createElement('div');
    box.className = 'run-images';
    images.forEach(function(im){
      var fig = document.createElement('figure'), img = document.createElement('img'), cap = document.createElement('figcaption');
      img.src = URL.createObjectURL(new Blob([im.data], { type: im.type }));
      img.alt = im.name;
      cap.textContent = im.name;
      fig.append(img, cap);
      box.append(fig);
    });
    out.parentNode.insertBefore(box, out.nextSibling);
  }

  // the output of a run: what was printed, then the error (if any) in red
  function runCode(code, out, btn, stdin, kind, html){
    if(kind === 'html' || kind === 'js') return runWeb(code, out, btn, kind, html);
    out.hidden = false;
    out.className = 'run-out';
    out.textContent = B('بيشغّل…', 'Running…');
    btn.disabled = true;
    window.PYRUN.run(code, function(msg){ out.textContent = msg; }, stdin).then(function(r){
      btn.disabled = false;
      var text = (r.out || '').replace(/\n+$/, '');
      showImages(out, r.images);
      if(r.ok){ out.textContent = text || B('(اتشغّل من غير ما يطبع حاجة)', '(ran without printing anything)'); out.classList.add('ok'); return; }
      out.textContent = (text ? text + '\n' : '') + r.error;
      out.classList.add('bad');
    });
  }

  X.type('journey', function(el, sec){
    el.innerHTML = (sec.intro ? '<div class="sprint-intro">' + S.md(sec.intro) + '<div class="rhythm" aria-label="' + esc(B('تقسيم اليوم', 'How a day is split')) + '">' +
      (sec.rhythm || []).map(function(r){ return '<span>' + esc(L(r)) + '</span>'; }).join('') + '</div></div>' : '') + '<div class="py-journey"></div>';
    var track = sec.track || 'python';
    JOURNEY.mount({
      track: track, el: el.querySelector('.py-journey'), storeKey: 'journey_' + track + '_v1',
      copy: S.copy, runCode: runCode,
      onActivity: function(){ S.touch(); stats(); },
      onChange: stats, onExternal: stats
    });
    stats();
  });

  X.type('pyterms', function(el, sec){
    var track = sec.track || 'python', all = ((window.JOURNEY_TERMS || {})[track] || []).slice(), month = 0, q = '';
    el.innerHTML = '<div class="lib-tools"><label class="lib-search"><span>' + esc(B('ابحث في المصطلحات:', 'Search the terms:')) + '</span>' +
      '<input type="search" autocomplete="off" placeholder="' + esc(sec.placeholder || 'list, dict, request, selector…') + '"></label><span class="lib-count" aria-live="polite"></span></div>' +
      '<div class="cat-tabs"></div><div class="vocab-grid"></div>' +
      '<p class="sub-note">' + S.inline(sec.reviewNote || B('كل المصطلحات دي بتدخل مراجعتك اليومية في [صفحة المراجعة](review.html) (فعّل «مصطلحات بايثون»).', 'All of these terms join your daily review on [the review page](review.html) (turn on «Python terms»).')) + '</p>';
    var input = el.querySelector('input'), tabs = el.querySelector('.cat-tabs'), grid = el.querySelector('.vocab-grid'), count = el.querySelector('.lib-count');
    var months = (JOURNEY.outlines[track] || {}).months || [];
    function paint(){
      tabs.innerHTML = [[0, B('الكل', 'All')]].concat(months.map(function(m){ return [m.n, B('الشهر ', 'Month ') + m.n + ': ' + L(m.title)]; })).map(function(t){
        return '<button type="button" class="cat-tab' + (t[0] === month ? ' active' : '') + '" data-m="' + t[0] + '">' + esc(t[1]) + '</button>';
      }).join('');
      var ql = q.toLowerCase();
      var list = all.filter(function(v){
        if(month && Math.ceil(v.w / 4) !== month) return false;
        return !ql || [v.t, L(v.m), L(v.ex)].join(' ').toLowerCase().indexOf(ql) !== -1;
      });
      count.textContent = B(list.length + ' من ' + all.length, list.length + ' of ' + all.length);
      grid.innerHTML = list.length ? list.map(function(v){
        // `code` in a meaning shows as code; the example is code too (some are Arabic text samples)
        var mean = esc(L(v.m)).replace(/`([^`]+)`/g, '<code>$1</code>');
        return '<div class="vocab-card"><div><div class="term" dir="ltr">' + esc(v.t) + '</div><div class="mean">' + mean + '</div>' +
          (v.ex ? '<div class="tex" dir="ltr"><code>' + esc(L(v.ex)) + '</code></div>' : '') +'<div class="sub-note"><a href="#journey?w=' + v.w + '">' + esc(B('الأسبوع ', 'Week ') + v.w) + '</a></div></div></div>';
      }).join('') : '<p class="sub-note">' + esc(B('مفيش نتايج.', 'No results.')) + '</p>';
    }
    input.addEventListener('input', function(){ q = input.value.trim(); paint(); });
    tabs.addEventListener('click', function(e){ var b = e.target.closest('[data-m]'); if(!b) return; month = Number(b.dataset.m); paint(); });
    paint();
  });

  X.type('pylibrary', function(el, sec){
    var DATA = window[sec.data || 'PY_DATA'] || {}, LIB = DATA.LIBRARY || [], CATS = DATA.CATS || {}, KEY = sec.doneKey || 'pylib';
    var cat = 'all', q = '', lvl = '', lang = '', status = '';
    function read(b){ var d = S.get('done')[KEY + ':' + b.id]; return !!(d && !d.del); }
    el.innerHTML = '<div class="lib-tools">' +
      '<label class="lib-search"><span>' + esc(B('ابحث:', 'Search:')) + '</span><input type="search" autocomplete="off" placeholder="' + esc(sec.libPlaceholder || 'pandas, CSS, scraping…') + '"></label>' +
      '<label class="lib-filter"><span>' + esc(B('المستوى:', 'Level:')) + '</span><select data-f="lvl"><option value="">' + esc(B('كل المستويات', 'All levels')) + '</option>' +
        '<option value="b">' + esc(B('مبتدئ', 'Beginner')) + '</option><option value="i">' + esc(B('متوسط', 'Intermediate')) + '</option><option value="a">' + esc(B('متقدم', 'Advanced')) + '</option></select></label>' +
      '<label class="lib-filter"><span>' + esc(B('اللغة:', 'Language:')) + '</span><select data-f="lang"><option value="">' + esc(B('كل اللغات', 'All languages')) + '</option>' +
        '<option value="ar">' + esc(B('عربي', 'Arabic')) + '</option><option value="en">' + esc(B('إنجليزي', 'English')) + '</option></select></label>' +
      '<label class="lib-filter"><span>' + esc(B('الحالة:', 'Status:')) + '</span><select data-f="status"><option value="">' + esc(B('الكل', 'All')) + '</option>' +
        '<option value="todo">' + esc(B('لسه مخلّصتوش', 'Not done yet')) + '</option><option value="done">' + esc(B('خلّصته', 'Done')) + '</option></select></label>' +
      '<span class="lib-count" aria-live="polite"></span></div><div class="cat-tabs"></div><div class="lib-grid"></div>';
    var input = el.querySelector('input[type=search]'), tabs = el.querySelector('.cat-tabs'), grid = el.querySelector('.lib-grid'), count = el.querySelector('.lib-count');
    function match(b){
      if(cat !== 'all' && b.cat !== cat) return false;
      if(lvl && b.lvl !== lvl) return false;
      if(lang && b.lang !== lang) return false;
      if(status && (status === 'done') !== read(b)) return false;
      var ql = q.toLowerCase();
      return !ql || [L(b.t), L(b.c), L(b.type), L(b.why), L(b.read), b.url].join(' ').toLowerCase().indexOf(ql) !== -1;
    }
    function paint(){
      var cats = Object.keys(CATS).filter(function(k){ return LIB.some(function(b){ return b.cat === k; }); });
      tabs.innerHTML = [['all', B('الكل', 'All'), LIB.length]].concat(cats.map(function(k){ return [k, L(CATS[k]), LIB.filter(function(b){ return b.cat === k; }).length]; })).map(function(t){
        return '<button type="button" class="cat-tab' + (t[0] === cat ? ' active' : '') + '" data-cat="' + t[0] + '">' + esc(t[1]) + ' <span class="sub-note">' + t[2] + '</span></button>';
      }).join('');
      var list = LIB.filter(match), done = LIB.filter(read).length;
      count.textContent = B(list.length + ' مصدر ظاهر · خلّصت ' + done + ' من ' + LIB.length, list.length + ' shown · done ' + done + ' of ' + LIB.length);
      grid.innerHTML = list.length ? list.map(function(b){
        var r = read(b), lv = { b: B('مبتدئ', 'Beginner'), i: B('متوسط', 'Intermediate'), a: B('متقدم', 'Advanced') }[b.lvl];
        return '<div class="lib-card' + (r ? ' read' : '') + '"><div class="lib-top"><div class="lib-t"><a href="' + esc(b.url) + '" target="_blank" rel="noopener">' + esc(L(b.t)) + ' ↗</a></div></div>' +
          '<div class="lib-badges"><span class="badge free">' + esc(L(b.type)) + '</span><span class="badge' + (b.lang === 'ar' ? ' ar' : '') + '">' + esc(b.lang === 'ar' ? B('عربي', 'Arabic') : 'EN') + '</span>' +
          '<span class="badge">' + esc(lv) + '</span><span class="badge">' + esc(L(b.c)) + '</span></div>' +
          '<p class="lib-why">' + S.inline(b.why) + '</p><div class="lib-read"><b>' + esc(B('اقرا منه: ', 'Read: ')) + '</b>' + S.inline(b.read) + '</div>' +
          '<div class="lib-url" dir="ltr">' + esc(b.url.replace(/^https?:\/\//, '')) + '</div>' +
          '<label class="task"><input type="checkbox" data-lib="' + esc(b.id) + '"' + (r ? ' checked' : '') + '> ' + esc(B('قريت الجزء المطلوب', 'I read the suggested part')) + '</label></div>';
      }).join('') : '<p class="sub-note">' + esc(B('مفيش نتايج. جرّب كلمة تانية.', 'No results. Try another word.')) + '</p>';
    }
    input.addEventListener('input', function(){ q = input.value.trim(); paint(); });
    el.addEventListener('change', function(e){
      var f = e.target.dataset.f;
      if(f){ if(f === 'lvl') lvl = e.target.value; if(f === 'lang') lang = e.target.value; if(f === 'status') status = e.target.value; paint(); return; }
      var id = e.target.dataset.lib;
      if(id == null) return;
      if(e.target.checked){ S.setItem('done', KEY + ':' + id, { on: 1 }); S.touch(); } else S.removeItem('done', KEY + ':' + id);
      paint();
    });
    tabs.addEventListener('click', function(e){ var b = e.target.closest('[data-cat]'); if(!b) return; cat = b.dataset.cat; paint(); });
    paint();
  });
})();
