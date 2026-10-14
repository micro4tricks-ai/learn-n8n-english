/* Your daily plan, shared by every page (loaded right before ui.js):
 * - study minutes: counted while a page is open, visible and used (no input for 90 s stops the count)
 * - pace: intensive (3 h), normal (2 h) or light (45 min) a day → the daily goal and the expected finish
 * - a daily reminder: a calendar event repeating every day (.ics), so the phone's own calendar reminds you
 * - progress of the four journeys read from the browser (resume, achievements, certificates)
 * - on a journey page: a first-day card for a new learner (instead of empty stats) or today's goal bar
 * - on the home page: «continue where you stopped» and a short quiz that picks a journey and a pace */
(function(){
  var S = window.SITE;
  if(!S || S.plan) return;   // a page may load it early (progress.html)
  var B = S.B, esc = S.esc;
  function get(k){ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } }
  function put(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function pad(n){ return (n < 10 ? '0' : '') + n; }

  var P = S.plan = {};
  P.TRACKS = [
    { id: 'n8n', href: 'n8n.html', icon: '⚙️', t: ['رحلة n8n', 'The n8n journey'] },
    { id: 'python', href: 'python.html', icon: '🐍', t: ['رحلة بايثون', 'The Python journey'] },
    { id: 'js', href: 'js.html', icon: '🟨', t: ['رحلة جافاسكريبت', 'The JavaScript journey'] },
    { id: 'english', href: 'english.html', icon: '🔤', t: ['إنجليزي المبرمج', 'English for developers'] }
  ];
  P.track = function(id){ return P.TRACKS.filter(function(t){ return t.id === id; })[0]; };

  // ---------- pace ----------
  // A journey day is planned at about 2.5 hours (3 h in the intensive first months, 2 h after), 6 days a week.
  P.PACES = {
    intense: { min: 180, t: ['مكثّف', 'Intensive'], d: ['3 ساعات في اليوم', '3 hours a day'] },
    normal: { min: 120, t: ['عادي', 'Normal'], d: ['ساعتين في اليوم', '2 hours a day'] },
    light: { min: 45, t: ['خفيف', 'Light'], d: ['45 دقيقة في اليوم', '45 minutes a day'] }
  };
  P.pace = function(){ var p = get('site_pace'); return P.PACES[p] ? p : 'normal'; };
  P.setPace = function(p){ if(P.PACES[p]){ put('site_pace', p); S.emit('site:pace', { pace: p }); } };
  P.goal = function(){ return P.PACES[P.pace()].min; };
  // months to finish the 288 journey days at a pace (26 study days a month)
  P.months = function(p){ return Math.round(288 * 150 / P.PACES[p || P.pace()].min / 26); };
  P.sessions = function(p){ var n = 150 / P.PACES[p || P.pace()].min; return n <= 1 ? 1 : Math.round(n * 2) / 2; };

  // ---------- study minutes ----------
  var MIN = 'site_minutes', lastUse = Date.now(), TICK = 30000;
  P.minutes = function(day){ var m = get(MIN) || {}; return Math.round(m[day || S.today()] || 0); };
  P.allMinutes = function(){ var m = get(MIN) || {}, n = 0; Object.keys(m).forEach(function(k){ n += m[k]; }); return Math.round(n); };
  ['pointerdown', 'keydown', 'scroll', 'input'].forEach(function(e){ window.addEventListener(e, function(){ lastUse = Date.now(); }, { passive: true, capture: true }); });
  setInterval(function(){
    if(document.visibilityState !== 'visible' || Date.now() - lastUse > 90000) return;
    var m = get(MIN) || {}, d = S.today();
    m[d] = (m[d] || 0) + TICK / 60000;
    var keys = Object.keys(m).sort();
    while(keys.length > 400) delete m[keys.shift()];
    put(MIN, m);
    paintGoal();
  }, TICK);

  // ---------- the journeys, read from the browser ----------
  function best(list){ var b = 0; (list || []).forEach(function(t){ if(t && t.total) b = Math.max(b, t.score / t.total); }); return b; }
  function passedAt(list){
    var ok = (list || []).filter(function(t){ return t && t.total && t.score / t.total >= 0.7; }).sort(function(a, b){ return a.at - b.at; })[0];
    return ok ? ok.at : 0;
  }
  // {id, started, weeks (passed), week (current), day, exams: [{m, final, best, at}], updatedAt}
  P.summary = function(id){
    var p = get('journey_' + id + '_v1') || {}, tests = p.tests || {}, done = p.done || {}, answers = p.answers || {};
    var weeks = 0, week = 0;
    for(var n = 1; n <= 48; n++){
      if(best(tests['w' + pad(n) + '-test']) >= 0.7) weeks++;
      else if(!week) week = n;
    }
    if(!week) week = 48;
    var day = 1, rx = new RegExp('^[pq]?w' + pad(week) + 'd(\\d)');
    Object.keys(done).concat(Object.keys(answers)).forEach(function(k){
      var m = rx.exec(k.replace(/^q(?=w)/, ''));
      if(m) day = Math.max(day, Number(m[1]));
    });
    var exams = [];
    for(var m = 1; m <= 12; m++){
      var tid = m === 12 ? 'final-exam' : 'm' + m + '-exam', at = passedAt(tests[tid]);
      if(at) exams.push({ m: m, final: m === 12, best: Math.round(best(tests[tid]) * 100), at: at });
    }
    var started = Object.keys(done).length > 0 || Object.keys(answers).length > 0 || Object.keys(tests).length > 0;
    return { id: id, started: started, weeks: weeks, week: week, day: day, exams: exams, updatedAt: p.updatedAt || 0 };
  };
  P.all = function(){ return P.TRACKS.map(function(t){ return P.summary(t.id); }); };
  P.resumeHref = function(s){ var t = P.track(s.id); return t.href + '#journey?w=' + s.week + '&d=' + s.day; };

  // ---------- daily reminder (.ics) ----------
  P.reminder = function(){
    var t = get('site_remind') || '20:00';
    var d = S.dialog('remindDlg', B('ذكّرني كل يوم', 'Remind me every day'),
      '<p>' + esc(B('اختار الساعة، وهننزّلك ملف تقويم بيتكرر كل يوم. افتحه على موبايلك أو الكمبيوتر وضيفه للتقويم (Google أو Outlook أو Apple)، والتقويم هو اللي هيفكّرك في ميعاد المذاكرة.',
        'Pick a time and you get a calendar file that repeats every day. Open it on your phone or computer and add it to your calendar (Google, Outlook or Apple); the calendar then reminds you when it is time to study.')) + '</p>' +
      '<label for="remindAt">' + esc(B('الساعة', 'Time')) + '</label><input id="remindAt" class="acct-in" type="time" value="' + esc(t) + '" dir="ltr">' +
      '<div class="acct-row"><button type="button" class="link-btn" data-remind>📅 ' + esc(B('نزّل التذكير', 'Download the reminder')) + '</button></div>' +
      '<p class="sub-note">' + esc(B('مدته على قد هدفك اليومي (' + P.goal() + ' دقيقة). عشان تلغيه امسحه من التقويم.', 'It lasts as long as your daily goal (' + P.goal() + ' min). To stop it, delete it from your calendar.')) + '</p>');
    d.querySelector('[data-remind]').onclick = function(){
      var v = (d.querySelector('#remindAt').value || '20:00').split(':'), now = new Date();
      put('site_remind', d.querySelector('#remindAt').value || '20:00');
      var start = now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + 'T' + pad(Number(v[0]) || 0) + pad(Number(v[1]) || 0) + '00';
      var stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
      var url = location.href.split('#')[0].replace(/[^/]*$/, '') + 'index.html';
      var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//learn-n8n-english//daily plan//AR', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
        'UID:study-' + now.getTime() + '@learn-n8n-english', 'DTSTAMP:' + stamp, 'DTSTART:' + start, 'DURATION:PT' + P.goal() + 'M', 'RRULE:FREQ=DAILY',
        'SUMMARY:' + B('وقت المذاكرة – رحلة المبرمج', 'Study time – Developer Journey'), 'DESCRIPTION:' + B('كمّل من حيث وقفت: ', 'Continue where you stopped: ') + url, 'URL:' + url,
        'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:PT0M', 'DESCRIPTION:' + B('وقت المذاكرة', 'Study time'), 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      S.download('study-reminder.ics', ics, 'text/calendar');
      S.toast(B('نزل ملف التذكير. افتحه وضيفه للتقويم.', 'The reminder file is downloaded. Open it and add it to your calendar.'));
    };
  };

  // ---------- today's goal (a bar shown on the home and the journey pages) ----------
  function goalHtml(){
    var m = P.minutes(), g = P.goal(), pct = Math.min(100, Math.round(m / g * 100)), pace = P.pace();
    return '<div class="goal-row"><span class="goal-t">🎯 ' + esc(B('هدف النهارده', "Today's goal")) + '</span>' +
      '<span class="goal-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + g + '" aria-valuenow="' + Math.min(m, g) + '" aria-label="' + esc(B('دقايق المذاكرة النهارده', 'Study minutes today')) + '"><span style="width:' + pct + '%"></span></span>' +
      '<span class="goal-n"><bdi dir="ltr">' + m + ' / ' + g + '</bdi> ' + esc(B('دقيقة', 'min')) + '</span>' + (m >= g ? '<span class="goal-ok">✓ ' + esc(B('خلّصت هدفك', 'Goal reached')) + '</span>' : '') + '</div>' +
      '<div class="goal-tools"><label class="pace-pick"><span>' + esc(B('سرعتك:', 'Your pace:')) + '</span><select data-pace>' + Object.keys(P.PACES).map(function(k){
        return '<option value="' + k + '"' + (k === pace ? ' selected' : '') + '>' + esc(B(P.PACES[k].t[0] + ' · ' + P.PACES[k].d[0], P.PACES[k].t[1] + ' · ' + P.PACES[k].d[1])) + '</option>';
      }).join('') + '</select></label>' +
      '<span class="sub-note goal-eta">' + esc(B('بالسرعة دي الرحلة بتخلص في حوالي ' + P.months() + ' شهر' + (P.sessions() > 1 ? '، واليوم الواحد من الرحلة بياخد حوالي ' + P.sessions() + ' جلسة' : ''),
        'At this pace a journey takes about ' + P.months() + ' months' + (P.sessions() > 1 ? ', and one journey day takes about ' + P.sessions() + ' sessions' : ''))) + '</span>' +
      '<button type="button" class="ghost-btn" data-remindme>📅 ' + esc(B('ذكّرني كل يوم', 'Remind me daily')) + '</button>' +
      '<a class="ghost-btn" href="progress.html">🏆 ' + esc(B('إنجازاتي', 'My achievements')) + '</a></div>';
  }
  function paintGoal(){ document.querySelectorAll('.goal-box').forEach(function(b){ if(!b.contains(document.activeElement)) b.innerHTML = goalHtml(); }); }
  P.paintGoal = paintGoal;
  document.addEventListener('change', function(e){
    if(!e.target.matches || !e.target.matches('[data-pace]')) return;
    P.setPace(e.target.value);
    e.target.blur();
    paintGoal();
    S.toast(B('اتغيّرت سرعتك: ', 'Pace changed: ') + B(P.PACES[P.pace()].d[0], P.PACES[P.pace()].d[1]));
  });
  document.addEventListener('click', function(e){
    if(e.target.closest && e.target.closest('[data-remindme]')) P.reminder();
  });

  // ---------- journey pages: a first-day card or today's goal ----------
  function journeyPage(){
    var J = window.JOURNEY, sec = document.getElementById('journey');
    var id = J && J.track && J.track();
    if(!sec || !id) return;
    var app = sec.querySelector('#journeyApp, .py-journey');
    if(!app || sec.querySelector('.plan-box')) return;
    var box = document.createElement('div');
    box.className = 'plan-box';
    app.parentNode.insertBefore(box, app);
    function paint(){
      var st = J.stats ? J.stats() : { days: 0 }, fresh = !P.summary(id).started && !st.days;
      document.body.classList.toggle('fresh-start', fresh);
      if(fresh){
        box.innerHTML = '<div class="first-day"><b>👋 ' + esc(B('أول مرة هنا؟ ابدأ بيومك الأول', 'New here? Start with your first day')) + '</b>' +
          '<p>' + esc(B('كل يوم فيه شرح قصير، وتطبيق، واختبار صغير. اليوم الأول بياخد حوالي 30 لـ 45 دقيقة، وتقدمك بيتحفظ لوحده في المتصفح. اختار السرعة اللي تناسبك، وتقدر تغيّرها في أي وقت.',
            'Every day has a short lesson, practice and a small quiz. The first day takes about 30 to 45 minutes, and your progress is saved in the browser by itself. Pick a pace that suits you; you can change it any time.')) + '</p>' +
          '<div class="pace-cards" role="radiogroup" aria-label="' + esc(B('السرعة', 'Pace')) + '">' + Object.keys(P.PACES).map(function(k){
            var on = k === P.pace();
            return '<button type="button" class="pace-card' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" data-pacecard="' + k + '"><b>' + esc(B(P.PACES[k].t[0], P.PACES[k].t[1])) + '</b><span>' + esc(B(P.PACES[k].d[0], P.PACES[k].d[1])) + '</span>' +
              '<small>' + esc(B('حوالي ' + P.months(k) + ' شهر', 'about ' + P.months(k) + ' months')) + '</small></button>';
          }).join('') + '</div>' +
          '<div class="acct-row"><button type="button" class="link-btn" data-firstday>▶ ' + esc(B('ابدأ اليوم الأول', 'Start day one')) + '</button>' +
          '<button type="button" class="ghost-btn" data-remindme>📅 ' + esc(B('ذكّرني كل يوم', 'Remind me daily')) + '</button></div></div>';
      }else box.innerHTML = '<div class="goal-box">' + goalHtml() + '</div>';
    }
    box.addEventListener('click', function(e){
      var pc = e.target.closest('[data-pacecard]');
      if(pc){ P.setPace(pc.getAttribute('data-pacecard')); paint(); return; }
      if(e.target.closest('[data-firstday]')){
        var go = sec.querySelector('[data-jtoday]');
        if(go) go.click();
        var main = sec.querySelector('.jr-main'); if(main) main.scrollIntoView({ block: 'start' });
      }
    });
    document.addEventListener('journey:change', function(){ if(document.body.classList.contains('fresh-start')) paint(); });
    paint();
  }

  // ---------- home: continue, today's goal, and the journey quiz ----------
  function homePage(){
    var el = document.getElementById('homeNow');
    if(!el) return;
    var list = P.all().filter(function(s){ return s.started; }).sort(function(a, b){ return b.updatedAt - a.updatedAt; });
    var h = '';
    if(list.length){
      h += '<div class="resume-list">' + list.map(function(s, i){
        var t = P.track(s.id);
        return '<a class="resume-card' + (i === 0 ? ' main' : '') + '" href="' + esc(P.resumeHref(s)) + '"><span class="ri" aria-hidden="true">' + t.icon + '</span>' +
          '<span class="rt"><b>' + esc(i === 0 ? B('كمّل من حيث وقفت', 'Continue where you stopped') : B(t.t[0], t.t[1])) + '</b>' +
          '<span>' + esc((i === 0 ? B(t.t[0], t.t[1]) + ' · ' : '') + B('الأسبوع ' + s.week + ' · اليوم ' + s.day + ' · عدّيت ' + s.weeks + ' من 48 أسبوع', 'Week ' + s.week + ' · day ' + s.day + ' · ' + s.weeks + ' of 48 weeks passed')) + '</span></span>' +
          '<span class="go" aria-hidden="true">' + B('←', '→') + '</span></a>';
      }).join('') + '</div><div class="goal-box">' + goalHtml() + '</div>' +
        '<p class="sub-note home-quiz-again"><button type="button" class="link-like" data-quiz>' + esc(B('عايز تبدأ رحلة تانية؟ اعرف أنهي تناسبك', 'Starting another journey? Find the one that fits you')) + '</button></p>';
    }else{
      h += '<div class="quiz-cta"><div><b>' + esc(B('مش عارف تبدأ منين؟', 'Not sure where to start?')) + '</b><span>' + esc(B('جاوب 4 أسئلة (دقيقة واحدة) ونقولك أنهي رحلة تبدأ بيها وبأي سرعة.', 'Answer 4 questions (one minute) and we tell you which journey to start and at what pace.')) + '</span></div>' +
        '<button type="button" class="link-btn" data-quiz>🧭 ' + esc(B('ساعدني أختار', 'Help me choose')) + '</button></div>';
    }
    el.innerHTML = h;
    el.addEventListener('click', function(e){ if(e.target.closest('[data-quiz]')) quiz(); });
  }

  var QUIZ = [
    { k: 'goal', q: ['عايز توصل لإيه؟', 'What do you want to reach?'], o: [
      ['n8n', '⚙️ أأتمت شغلي وأربط البرامج ببعض بأقل كود', '⚙️ Automate my work and connect apps with little code'],
      ['python', '🐍 أكتب سكربتات وأدوات وأشتغل على ملفات وبيانات', '🐍 Write scripts and tools, and work with files and data'],
      ['js', '🟨 أعمل صفحات وفورمز وأأتمت المتصفح', '🟨 Build pages and forms, and automate the browser'],
      ['english', '🔤 أفهم وأكتب وأتكلم إنجليزي الشغل', '🔤 Read, write and speak work English']] },
    { k: 'code', q: ['خبرتك في البرمجة؟', 'Your coding experience?'], o: [
      ['0', 'ولا حاجة لسه', 'None yet'], ['1', 'جربت شوية أساسيات', 'I tried some basics'], ['2', 'بكتب كود ومرتاح فيه', 'I write code comfortably']] },
    { k: 'en', q: ['الإنجليزي بتاعك؟', 'Your English?'], o: [
      ['0', 'ضعيف، بقف عند رسايل الأخطاء', 'Weak: error messages stop me'], ['1', 'بقرا وأفهم مع الترجمة', 'I read with a translator'], ['2', 'بقرا التوثيق عادي', 'I read documentation fine']] },
    { k: 'time', q: ['وقتك في اليوم؟', 'Time you have a day?'], o: [
      ['light', 'حوالي 45 دقيقة', 'About 45 minutes'], ['normal', 'حوالي ساعتين', 'About 2 hours'], ['intense', '3 ساعات أو أكتر', '3 hours or more']] }
  ];
  function quiz(){
    var ans = {}, step = 0;
    function paint(){
      var d;
      if(step < QUIZ.length){
        var q = QUIZ[step];
        d = S.dialog('quizDlg', B('أنهي رحلة تناسبك؟', 'Which journey fits you?'),
          '<p class="sub-note">' + esc(B('سؤال ' + (step + 1) + ' من ' + QUIZ.length, 'Question ' + (step + 1) + ' of ' + QUIZ.length)) + '</p><h4 class="quiz-q">' + esc(B(q.q[0], q.q[1])) + '</h4>' +
          '<div class="quiz-opts">' + q.o.map(function(o){ return '<button type="button" class="ghost-btn" data-qa="' + esc(o[0]) + '">' + esc(B(o[1], o[2])) + '</button>'; }).join('') + '</div>');
      }else{
        var t = P.track(ans.goal), pace = ans.time, tips = [];
        if(ans.code === '2' && ans.goal !== 'english') tips.push(B('عندك خبرة: الأسابيع الأولى هتعدّيها بسرعة. خلّص مهام اليوم واختباره، ومتقعدش عليه أكتر من اللازم.', 'You have experience: the first weeks will go fast. Do the day\'s tasks and quiz, and move on.'));
        if(ans.code === '0' && ans.goal !== 'english') tips.push(B('بادئ من الصفر؟ تمام. ابدأ من الأسبوع 1 ومتستعجلش، كل يوم بيبني على اللي قبله.', 'Starting from zero? Fine. Begin at week 1 and take your time: every day builds on the one before.'));
        if(ans.en === '0' && ans.goal !== 'english') tips.push(B('الإنجليزي هيسهّل عليك كل حاجة: خصّص 20–30 دقيقة في اليوم لرحلة «إنجليزي المبرمج» جنب رحلتك.', 'English will make everything easier: give 20–30 minutes a day to «English for developers» next to your journey.'));
        if(ans.goal === 'english' && ans.code !== '0') tips.push(B('ركّز على أقسام قراءة الأخطاء والتوثيق، وجرّب «تدريب الكلام» مرتين في الأسبوع.', 'Focus on reading errors and documentation, and try «Speaking practice» twice a week.'));
        tips.push(B('راجع 10 دقايق كل يوم في «مراجعتي» عشان متنساش اللي اتعلمته.', 'Review for 10 minutes a day in «My review» so you keep what you learned.'));
        d = S.dialog('quizDlg', B('رحلتك المقترحة', 'Your suggested journey'),
          '<div class="quiz-res"><span class="ri" aria-hidden="true">' + t.icon + '</span><div><b>' + esc(B(t.t[0], t.t[1])) + '</b><span>' + esc(B('بسرعة «' + P.PACES[pace].t[0] + '» (' + P.PACES[pace].d[0] + '): حوالي ' + P.months(pace) + ' شهر', 'At a «' + P.PACES[pace].t[1] + '» pace (' + P.PACES[pace].d[1] + '): about ' + P.months(pace) + ' months')) + '</span></div></div>' +
          '<ul class="quiz-tips">' + tips.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
          '<div class="acct-row"><a class="link-btn" data-qgo href="' + t.href + '#journey">▶ ' + esc(B('ابدأ ' + t.t[0], 'Start ' + t.t[1])) + '</a><button type="button" class="ghost-btn" data-qagain>' + esc(B('جاوب تاني', 'Answer again')) + '</button></div>');
        put('site_quiz', { goal: ans.goal, code: ans.code, en: ans.en, time: ans.time, at: Date.now() });
        P.setPace(pace);
      }
      d.onclick = function(e){
        var b = e.target.closest('[data-qa]');
        if(b){ ans[QUIZ[step].k] = b.getAttribute('data-qa'); step++; paint(); return; }
        if(e.target.closest('[data-qagain]')){ ans = {}; step = 0; paint(); }
      };
      var first = d.querySelector('[data-qa], [data-qgo]'); if(first) first.focus();
    }
    paint();
  }
  P.quiz = quiz;

  // ---------- phone: a long page description shows 3 lines and «read more» ----------
  function shortIntro(){
    if(!window.matchMedia || !matchMedia('(max-width: 599px)').matches) return;
    var p = document.querySelector('header.top p.sub, header.top > div > p');
    if(!p || p.textContent.length < 180 || p.nextElementSibling && p.nextElementSibling.classList.contains('more-intro')) return;
    p.classList.add('clamp');
    if(!p.id) p.id = 'pageIntro';
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'link-like more-intro';
    b.setAttribute('aria-controls', p.id); b.setAttribute('aria-expanded', 'false');
    b.textContent = B('اقرا أكتر', 'Read more');
    b.addEventListener('click', function(){
      var open = p.classList.toggle('clamp') === false;
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.textContent = open ? B('اقرا أقل', 'Read less') : B('اقرا أكتر', 'Read more');
    });
    p.parentNode.insertBefore(b, p.nextSibling);
  }

  journeyPage();
  homePage();
  shortIntro();
})();
