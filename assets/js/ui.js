/* Shared page UI: font size buttons, and collapsible sections on the plan pages.
 * Loaded after the page app, on every page. */
(function(){
  function get(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : v; }catch(e){ return d; } }
  function set(k, v){ try{ localStorage.setItem(k, v); }catch(e){} }

  // ---------- font size (zoom the whole page) ----------
  var STEPS = [0.85, 0.93, 1, 1.1, 1.2, 1.32];
  var step = parseInt(get('site_zoom', '2'), 10);
  if(!(step >= 0 && step < STEPS.length)) step = 2;
  function applyZoom(){
    document.body.style.zoom = STEPS[step];
    document.querySelectorAll('[data-font]').forEach(function(b){
      b.disabled = (b.dataset.font === '-' && step === 0) || (b.dataset.font === '+' && step === STEPS.length - 1);
    });
  }
  document.querySelectorAll('.links .lang-btn').forEach(function(lb){
    var box = document.createElement('span');
    box.className = 'font-ctl';
    box.dir = 'ltr';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', T('حجم الخط'));
    box.innerHTML = '<button type="button" data-font="-" aria-label="' + T('صغّر الخط') + '">A−</button>' +
                    '<button type="button" data-font="+" aria-label="' + T('كبّر الخط') + '">A+</button>';
    lb.parentNode.insertBefore(box, lb);
  });
  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('[data-font]') : null;
    if(!b) return;
    step = Math.max(0, Math.min(STEPS.length - 1, step + (b.dataset.font === '+' ? 1 : -1)));
    set('site_zoom', String(step));
    applyZoom();
  });
  applyZoom();

  // ---------- collapsible sections (everything except today's tasks) ----------
  var page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
  var KEY = 'site_open_' + page;
  var open = {};
  try{ open = JSON.parse(get(KEY, '{}')) || {}; }catch(e){ open = {}; }
  function save(){ set(KEY, JSON.stringify(open)); }

  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'))
    .filter(function(s){ return s.id !== 'journey' && s.querySelector(':scope > h2'); });
  function setOpen(sec, on, remember){
    sec.classList.toggle('closed', !on);
    var btn = sec.querySelector(':scope > h2 > .fold-btn');
    if(btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    if(remember){ open[sec.id] = on; save(); }
  }
  sections.forEach(function(sec){
    var h2 = sec.querySelector(':scope > h2');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fold-btn';
    btn.setAttribute('aria-controls', sec.id);
    // move the heading content into the button so the whole title is clickable
    while(h2.firstChild) btn.appendChild(h2.firstChild);
    var hint = document.createElement('span');
    hint.className = 'fold-hint';
    btn.appendChild(hint);
    h2.appendChild(btn);
    sec.classList.add('fold');
    // closed unless the viewer opened it before; a section marked data-open starts open until the viewer closes it
    setOpen(sec, Object.prototype.hasOwnProperty.call(open, sec.id) ? !!open[sec.id] : sec.hasAttribute('data-open'), false);
    btn.addEventListener('click', function(){ setOpen(sec, sec.classList.contains('closed'), true); });
  });
  function openSection(id){
    var sec = document.getElementById(id);
    if(sec && sec.classList.contains('fold') && sec.classList.contains('closed')) setOpen(sec, true, true);
  }
  window.openSection = openSection;

  // links like #library open their section first; #terms?q=webhook also fills the section's search box,
  // and #journey?w=5&d=2 is passed on to the page (site:deeplink) to open that week and day.
  function parse(h){
    h = (h || '').replace(/^#/, '');
    var i = h.indexOf('?'), p = {};
    var dec = function(s){ try{ return decodeURIComponent(s); }catch(e){ return s; } };   // a broken %-escape must not stop the page
    if(i !== -1) h.slice(i + 1).split('&').forEach(function(kv){ var x = kv.split('='), k = dec(x[0]); if(k && k !== '__proto__') p[k] = dec((x[1] || '').replace(/\+/g, ' ')); });
    return { id: i === -1 ? h : h.slice(0, i), p: p };
  }
  // A section without a search box: try each of its tabs until a card holding the text shows, and mark that card.
  var CARDS = '.g-card,.err-card,.phrase-card,.lib-card,.vocab-card,.q-card,.read-row,.track-card,.day-card,.proj-card,.res-card,.ex-card,.md-card,.sheet.on';
  function findCard(sec, q){
    q = q.toLowerCase();
    function look(){
      var list = sec.querySelectorAll(CARDS);
      for(var i = 0; i < list.length; i++) if(list[i].textContent.toLowerCase().indexOf(q) !== -1) return list[i];
      return null;
    }
    var hit = look(), tabs = sec.querySelectorAll('.cat-tabs .cat-tab');
    for(var i = 0; !hit && i < tabs.length; i++){ tabs[i].click(); hit = look(); }
    if(hit){
      hit.classList.add('hit');
      setTimeout(function(){ hit.classList.remove('hit'); }, 2600);
      var det = hit.tagName === 'DETAILS' ? hit : hit.querySelector('details'); if(det) det.open = true;
    }
    return hit;
  }
  function follow(h, scroll){
    var d = parse(h);
    if(!d.id) return;
    openSection(d.id);
    var t = document.getElementById(d.id);
    if(!t) return;
    if(d.p.q != null){
      var box = t.querySelector('input[type="search"]');
      if(box){ box.value = d.p.q; box.dispatchEvent(new Event('input', { bubbles: true })); }
      else if(d.p.q){ var hit = findCard(t, d.p.q); if(hit){ hit.scrollIntoView({ block: 'center' }); return; } }
    }
    try{ document.dispatchEvent(new CustomEvent('site:deeplink', { detail: d })); }catch(e){}
    if(scroll) t.scrollIntoView();
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if(a && a.getAttribute('href').length > 1) openSection(parse(a.getAttribute('href')).id);
  }, true);
  try{ if(location.hash) follow(location.hash, true); }catch(e){}
  window.addEventListener('hashchange', function(){ follow(location.hash, true); });

  var S = window.SITE;
  if(!S || !S.B) return;
  var B = S.B, esc = S.esc;

  // ---------- back to the top ----------
  // shows once the page is scrolled more than a screen and a half down
  var top = document.createElement('button');
  top.type = 'button';
  top.className = 'to-top';
  top.hidden = true;
  top.setAttribute('aria-label', B('ارجع لأول الصفحة', 'Back to the top'));
  top.title = B('ارجع لأول الصفحة (T)', 'Back to the top (T)');
  top.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(top);
  function toTop(){
    var smooth = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    var skip = document.querySelector('.topbar .home'); if(skip) skip.focus({ preventScroll: true });
  }
  top.addEventListener('click', toTop);
  var ticking = false;
  window.addEventListener('scroll', function(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){ ticking = false; top.hidden = window.scrollY < window.innerHeight * 1.5; });
  }, { passive: true });

  // ---------- data used by this session (the footer, and its details) ----------
  var foot = document.querySelector('.site-foot');
  var chip = null;
  if(foot){
    chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'net-chip';
    chip.title = B('النت اللي الجلسة دي استهلكته (تقريبي)', 'Data this session used (approximate)');
    foot.appendChild(chip);
    chip.addEventListener('click', showNet);
  }
  function paintChip(){
    if(!chip) return;
    var s = S.netSession();
    chip.innerHTML = '📶 ' + esc(B('استهلاك الجلسة: ', 'Session data: ')) + '<span dir="ltr">' + esc(S.fmtBytes(s.bytes)) + '</span>';
  }
  function showNet(){
    var p = S.netPage(), s = S.netSession(), mins = Math.max(1, Math.round((Date.now() - s.start) / 60000));
    var d = S.dialog('netDlg', B('استهلاك النت', 'Data used'),
      '<div class="net-grid">' +
      '<div class="streak-card"><div class="num" dir="ltr">' + esc(S.fmtBytes(s.bytes)) + '</div><div class="lbl">' + esc(B('الجلسة كلها (' + s.pages + ' صفحة، ' + mins + ' دقيقة)', 'This session (' + s.pages + (s.pages === 1 ? ' page, ' : ' pages, ') + mins + ' min)')) + '</div></div>' +
      '<div class="streak-card"><div class="num alt" dir="ltr">' + esc(S.fmtBytes(p.bytes)) + '</div><div class="lbl">' + esc(B('الصفحة دي', 'This page')) + '</div></div></div>' +
      '<ul class="net-list">' +
      '<li>' + esc(B('ملفات اتحمّلت من الكاش (من غير نت): ', 'Files loaded from the cache (no data): ')) + '<b dir="ltr">' + p.cached + '</b></li>' +
      (p.unknown ? '<li>' + esc(B('ملفات من مواقع تانية مش بتقول حجمها (مش محسوبة): ', 'Files from other sites that do not share their size (not counted): ')) + '<b dir="ltr">' + p.unknown + '</b></li>' : '') +
      '</ul><p class="sub-note">' + esc(B('الجلسة = التبويب ده من ساعة ما فتحته. أول زيارة بتحمّل الخطوط والصفحة، وبعدها أغلب الملفات بتيجي من الكاش. تشغيل Python أول مرة بيحمّل حوالي 10 ميجا (وpandas حوالي 20). عشان توفّر: نزّل الموقع للأوفلاين مرة واحدة من صفحة «مراجعتي».', 'A session is this tab since you opened it. The first visit loads the fonts and the page; after that most files come from the cache. Running Python the first time downloads about 10 MB (pandas about 20). To save data: download the site for offline use once from the «My review» page.')) + '</p>' +
      '<div class="acct-row"><button type="button" class="ghost-btn" data-netreset>' + esc(B('صفّر العدّاد', 'Reset the meter')) + '</button></div>');
    d.querySelector('[data-netreset]').onclick = function(){ S.netReset(); S.closeDialog(d); paintChip(); S.toast(B('العدّاد اتصفّر.', 'The meter is reset.')); };
  }
  S.showNet = showNet;
  paintChip();
  setInterval(function(){ if(document.visibilityState === 'visible') paintChip(); }, 4000);

  // ---------- keyboard shortcuts ----------
  // g then a letter opens a page; letters work only when you are not typing in a box
  var GO = { h: 'index', n: 'n8n', e: 'english', p: 'python', j: 'js', r: 'review', l: 'lab', s: 'speak', a: 'prompts', c: 'sheets' };
  function pageHref(id){ var p = (S.pages || []).filter(function(x){ return x.id === id; })[0]; return p ? p.href : null; }
  function go(id){
    var href = pageHref(id);
    if(!href) return;
    var a = document.querySelector('.topbar a[href="' + href + '"], .foot-links a[data-page="' + href + '"]');
    if(a && a.href) a.click(); else location.href = href;
  }
  function stepDay(dir){
    var tabs = Array.prototype.slice.call(document.querySelectorAll('#jrTabs .day-tab'));
    var i = tabs.findIndex(function(t){ return t.classList.contains('sel'); });
    var t = tabs[i + dir];
    if(!t) return false;
    t.click();
    var box = document.getElementById('jrTabs'); if(box) box.scrollIntoView({ block: 'start' });
    return true;
  }
  var KEYS = [
    [B('عام', 'General'), [
      ['?', B('القايمة دي', 'This list')],
      ['Ctrl K  /  /', B('ابحث في الموقع كله', 'Search the whole site')],
      ['T', B('ارجع لأول الصفحة', 'Back to the top')],
      ['+  −', B('كبّر / صغّر الخط', 'Bigger / smaller text')],
      ['L', B('بدّل اللغة (عربي / English)', 'Switch the language (Arabic / English)')],
      ['U', B('استهلاك النت في الجلسة دي', 'Data this session used')],
      ['Esc', B('اقفل أي نافذة مفتوحة', 'Close any open window')]
    ]],
    [B('روح لصفحة: اضغط G وبعدها حرف', 'Go to a page: press G, then a letter'), [
      ['G H', B('الرئيسية', 'Home')], ['G N', 'n8n'], ['G P', B('بايثون', 'Python')], ['G J', B('جافاسكريبت', 'JavaScript')],
      ['G E', B('الإنجليزي', 'English')], ['G R', B('مراجعتي', 'My review')], ['G L', B('المعمل', 'Lab')],
      ['G S', B('تدريب الكلام', 'Speaking practice')], ['G A', B('البرومبتات', 'Prompts')], ['G C', B('الملخصات', 'Cheat sheets')]
    ]],
    [B('في الرحلة', 'In a journey'), [
      ['[  ]', B('اليوم اللي قبل / اللي بعد', 'Previous / next day')],
      ['Ctrl Enter', B('شغّل الكود وانت بتعدّله (وفي المعمل)', 'Run the code while you edit it (and in the lab)')]
    ]],
    [B('في البحث والمراجعة', 'In search and review'), [
      ['↑ ↓  Enter', B('اتنقّل بين النتايج وافتح', 'Move through the results and open')],
      ['Space', B('اقلب الكارت', 'Flip the card')], ['1 2 3 4', B('قيّم الكارت', 'Rate the card')]
    ]]
  ];
  function showKeys(){
    S.dialog('keysDlg', B('اختصارات الكيبورد', 'Keyboard shortcuts'), KEYS.map(function(g){
      return '<h4 class="keys-h">' + esc(g[0]) + '</h4><dl class="keys">' + g[1].map(function(k){
        return '<dt dir="ltr">' + k[0].split(/\s{2,}/).map(function(part){ return part.split(' ').map(function(x){ return '<kbd>' + esc(x) + '</kbd>'; }).join(' '); }).join(' <span class="keys-or">' + esc(B('أو', 'or')) + '</span> ') + '</dt><dd>' + esc(k[1]) + '</dd>';
      }).join('') + '</dl>';
    }).join(''));
  }
  S.showKeys = showKeys;
  var chord = 0;
  document.addEventListener('keydown', function(e){
    var t = e.target, tag = (t && t.tagName) || '';
    if(e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    if(/INPUT|TEXTAREA|SELECT/.test(tag) || (t && t.isContentEditable)) return;
    if(document.querySelector('dialog[open]') && e.key !== '?') return;
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if(chord && Date.now() - chord < 1500){
      chord = 0;
      if(GO[k]){ e.preventDefault(); go(GO[k]); }
      return;
    }
    chord = 0;
    if(k === '?'){ e.preventDefault(); showKeys(); }
    else if(k === 'g'){ chord = Date.now(); }
    else if(k === 't'){ e.preventDefault(); toTop(); }
    else if(k === 'u'){ e.preventDefault(); showNet(); }
    else if(k === 'l'){ var lb = document.querySelector('[data-lang-toggle]'); if(lb){ e.preventDefault(); lb.click(); } }
    else if(k === '+' || k === '='){ var up = document.querySelector('[data-font="+"]'); if(up && !up.disabled){ e.preventDefault(); up.click(); } }
    else if(k === '-' || k === '_'){ var dn = document.querySelector('[data-font="-"]'); if(dn && !dn.disabled){ e.preventDefault(); dn.click(); } }
    else if(k === ']' || k === '['){
      // the next day sits on the left in Arabic, but ] always means «next»
      if(stepDay(k === "]" ? 1 : -1)) e.preventDefault();
    }
  });
  // the shortcuts and the data meter are also in the «More» menu
  var list = document.querySelector('.more-list');
  if(list){
    var install = list.querySelector('.more-install');
    [['⌨️', B('اختصارات الكيبورد', 'Keyboard shortcuts'), showKeys, 'keys'], ['📶', B('استهلاك النت', 'Data used'), showNet, 'net']].forEach(function(x){
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'more-tool'; b.setAttribute('data-tool', x[3]);
      b.innerHTML = '<span aria-hidden="true">' + x[0] + '</span> ' + esc(x[1]);
      b.addEventListener('click', function(){ var m = b.closest('details'); if(m) m.open = false; x[2](); });
      list.insertBefore(b, install);
    });
  }
})();
