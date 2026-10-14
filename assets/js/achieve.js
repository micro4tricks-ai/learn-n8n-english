/* «My achievements» page (progress.html): what you finished in the four journeys, read from this browser
 * (and from your account once it syncs), a printable summary to show (a small portfolio), and a certificate
 * for every month whose exam you passed, plus the final one. Section types: achieve, certs.
 * The journey outlines (content/<track>/outline.js) give the month titles; journey.js is not needed here. */
(function(){
  var J = window.JOURNEY = window.JOURNEY || {};
  if(!J.outline){ J.outlines = J.outlines || {}; J.outline = function(o){ J.outlines[o.track] = o; }; }
  var S = window.SITE, X = window.SECTIONS, B = S.B, L = S.L, esc = S.esc;
  var NAMES = { n8n: { ar: 'أتمتة n8n', en: 'n8n automation' }, english: { ar: 'الإنجليزي للمبرمجين', en: 'English for developers' },
    python: { ar: 'بايثون للأتمتة والويب', en: 'Python for automation and the web' }, js: { ar: 'جافاسكريبت والويب للأتمتة', en: 'JavaScript and the web for automation' } };
  function name(){ try{ return localStorage.getItem('site_name') || ''; }catch(e){ return ''; } }
  function setName(v){ try{ localStorage.setItem('site_name', v); }catch(e){} }
  function date(ms){ return new Date(ms).toLocaleDateString(window.LANG === 'en' ? 'en-GB' : 'ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }); }
  function month(track, m){ var o = J.outlines[track], x = o && (o.months || [])[m - 1]; return x ? L(x.title) : ''; }
  // a print of one part of the page: body.print-only + .print-on on that part
  function printPart(el){
    el.classList.add('print-on');
    document.body.classList.add('print-only');
    window.print();
    document.body.classList.remove('print-only');
    el.classList.remove('print-on');
  }

  X.type('achieve', function(el){
    var P = S.plan;
    function paint(){
      var all = P.all(), mins = P.allMinutes(), act = S.activity(), days = Object.keys(act).length;
      var weeks = all.reduce(function(n, s){ return n + s.weeks; }, 0), exams = all.reduce(function(n, s){ return n + s.exams.length; }, 0);
      var h = '<div class="ach-sheet"><div class="ach-name"><label for="achName">' + esc(B('اسمك (بيظهر على الشهادات والملخص):', 'Your name (shown on the certificates and the summary):')) + '</label>' +
        '<input id="achName" class="acct-in" autocomplete="name" maxlength="60" value="' + esc(name()) + '"></div>' +
        '<h3 class="ach-print-t">' + esc(B('إنجازاتي في رحلة المبرمج', 'My achievements on Developer Journey')) + (name() ? ' — ' + esc(name()) : '') + '</h3>' +
        '<div class="stat-cards ach-stats">' +
        '<div class="streak-card"><div class="num">' + S.streak() + '</div><div class="lbl">' + esc(B('يوم متتالي 🔥', 'day streak 🔥')) + '</div></div>' +
        '<div class="streak-card"><div class="num alt">' + days + '</div><div class="lbl">' + esc(B('يوم ذاكرت فيه', 'study days')) + '</div></div>' +
        '<div class="streak-card"><div class="num" dir="ltr">' + (mins >= 60 ? Math.floor(mins / 60) + 'h ' + (mins % 60) + 'm' : mins + 'm') + '</div><div class="lbl">' + esc(B('وقت المذاكرة', 'study time')) + '</div></div>' +
        '<div class="streak-card"><div class="num">' + weeks + '</div><div class="lbl">' + esc(B('أسبوع ومشروع خلّصتهم', 'weeks and projects done')) + '</div></div>' +
        '<div class="streak-card"><div class="num alt">' + exams + '</div><div class="lbl">' + esc(B('امتحان شهري عدّيته', 'monthly exams passed')) + '</div></div></div>' +
        '<div class="ach-tracks">' + all.map(function(s){
          var t = P.track(s.id), pct = Math.round(s.weeks / 48 * 100);
          return '<article class="ach-track' + (s.started ? '' : ' idle') + '"><h4><span aria-hidden="true">' + t.icon + '</span> ' + esc(B(t.t[0], t.t[1])) + '</h4>' +
            '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
            '<p>' + esc(s.started ? B('عدّيت ' + s.weeks + ' من 48 أسبوع (' + pct + '%) · ' + s.exams.length + ' امتحان شهري', s.weeks + ' of 48 weeks passed (' + pct + '%) · ' + s.exams.length + ' monthly exams') : B('لسه ما بدأتش', 'Not started yet')) + '</p>' +
            (s.exams.length ? '<ul class="ach-months">' + s.exams.map(function(e){
              return '<li>' + esc(e.final ? B('🎓 الامتحان النهائي', '🎓 Final exam') : B('الشهر ' + e.m + ': ', 'Month ' + e.m + ': ') + month(s.id, e.m)) + ' <span class="tag">' + e.best + '%</span></li>';
            }).join('') + '</ul>' : '') +
            '<a class="ghost-btn no-print" href="' + esc(s.started ? P.resumeHref(s) : t.href + '#journey') + '">' + esc(s.started ? B('كمّل', 'Continue') : B('ابدأ', 'Start')) + ' ' + B('←', '→') + '</a></article>';
        }).join('') + '</div>' +
        '<p class="sub-note ach-foot">' + esc(B('micro4tricks-ai.github.io/learn-n8n-english · اتعمل في ', 'micro4tricks-ai.github.io/learn-n8n-english · made on ') + date(Date.now())) + '</p></div>' +
        '<div class="jr-actions no-print"><button type="button" class="link-btn" data-achprint>🖨 ' + esc(B('اطبع أو احفظ PDF (للـ CV أو LinkedIn)', 'Print or save as PDF (for a CV or LinkedIn)')) + '</button>' +
        '<button type="button" class="ghost-btn" data-achcopy>📋 ' + esc(B('انسخ ملخص نصي', 'Copy a text summary')) + '</button></div>';
      el.innerHTML = h;
    }
    function text(){
      var P = S.plan, lines = [B('إنجازاتي في رحلة المبرمج', 'My achievements on Developer Journey') + (name() ? ' — ' + name() : '')];
      P.all().filter(function(s){ return s.started; }).forEach(function(s){
        var t = P.track(s.id);
        lines.push('• ' + B(t.t[0], t.t[1]) + ': ' + B(s.weeks + ' من 48 أسبوع، ' + s.exams.length + ' امتحان شهري', s.weeks + ' of 48 weeks, ' + s.exams.length + ' monthly exams'));
      });
      lines.push('https://micro4tricks-ai.github.io/learn-n8n-english/');
      return lines.join('\n');
    }
    el.addEventListener('change', function(e){ if(e.target.id === 'achName'){ setName(e.target.value.trim()); paint(); S.emit('site:name'); } });
    el.addEventListener('click', function(e){
      if(e.target.closest('[data-achprint]')) printPart(el.querySelector('.ach-sheet'));
      var c = e.target.closest('[data-achcopy]'); if(c) S.copy(text(), c);
    });
    document.addEventListener('site:store', paint);
    paint();
  });

  X.type('certs', function(el){
    var P = S.plan;
    function paint(){
      var list = [];
      P.all().forEach(function(s){ s.exams.forEach(function(e){ list.push({ s: s, e: e }); }); });
      if(!list.length){
        el.innerHTML = '<p class="sub-note">' + esc(B('لسه مفيش شهادات. كل شهر بيخلص بامتحان، ولما تعدّيه بـ 70% أو أكتر شهادته بتظهر هنا وتقدر تطبعها.', 'No certificates yet. Every month ends with an exam; pass it with 70% or more and its certificate shows up here, ready to print.')) + '</p>';
        return;
      }
      var who = name();
      el.innerHTML = (who ? '' : '<p class="sub-note no-print">' + esc(B('اكتب اسمك في الجزء اللي فوق عشان يظهر على الشهادات.', 'Type your name in the part above so it shows on the certificates.')) + '</p>') +
        '<div class="certs">' + list.map(function(x, i){
          var nm = L(NAMES[x.s.id]), mt = month(x.s.id, x.e.m);
          return '<article class="cert" data-cert="' + i + '"><div class="cert-in"><span class="cert-k">' + esc(x.e.final ? B('شهادة إتمام الرحلة', 'Journey completion certificate') : B('شهادة إتمام شهر', 'Monthly certificate')) + '</span>' +
            '<p class="cert-who">' + esc(who || B('متعلّم في رحلة المبرمج', 'A Developer Journey learner')) + '</p>' +
            '<p>' + esc(x.e.final ? B('خلّص رحلة الـ 48 أسبوع في «' + nm + '» من مبتدئ لخبير، ونجح في الامتحان النهائي بدرجة ' + x.e.best + '%.', 'completed the 48-week «' + nm + '» journey from beginner to expert and passed the final exam with ' + x.e.best + '%.')
              : B('خلّص الشهر ' + x.e.m + ' من رحلة «' + nm + '»' + (mt ? ': ' + mt : '') + '، بمشاريعه واختباراته الأسبوعية، ونجح في امتحان الشهر بدرجة ' + x.e.best + '%.', 'completed month ' + x.e.m + ' of the «' + nm + '» journey' + (mt ? ': ' + mt : '') + ', with its weekly projects and tests, and passed the monthly exam with ' + x.e.best + '%.')) + '</p>' +
            '<p class="cert-date">' + esc(date(x.e.at)) + ' · micro4tricks-ai.github.io/learn-n8n-english</p></div>' +
            '<button type="button" class="ghost-btn no-print" data-certprint="' + i + '">🖨 ' + esc(B('اطبع الشهادة', 'Print the certificate')) + '</button></article>';
        }).join('') + '</div>';
    }
    el.addEventListener('click', function(e){
      var b = e.target.closest('[data-certprint]');
      if(b) printPart(b.closest('.cert'));
    });
    document.addEventListener('site:name', paint);
    document.addEventListener('site:store', paint);
    paint();
  });
})();
