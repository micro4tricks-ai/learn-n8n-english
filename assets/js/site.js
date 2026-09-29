/* The site shell shared by every page, loaded right after the page data and before the page app:
 * - helpers every page uses (bilingual text, escaping, a small markdown, copy, speech, script loading)
 * - the top menu and footer links, built from content/pages.js
 * - search across the whole site (Ctrl+K or /), from assets/data/search-index.js, loaded on first use
 * - small stores kept in the browser and synced with the account (review cards, mistakes, lab, prompts…)
 * - activity per day (for the streak and the heatmap), backup export/import
 * - the offline app (service worker), optional analytics and comments (assets/js/config.js) */
(function(){
  var S = window.SITE = window.SITE || {};
  var LANG = window.LANG || 'ar';
  var AR = /[؀-ۿ]/;

  // ---------- text helpers ----------
  // B('عربي', 'English') or L({ar, en}) → the text in the page language
  S.B = function(ar, en){ return LANG === 'en' ? en : ar; };
  S.L = function(x){
    if(x == null) return '';
    if(typeof x !== 'object') return String(x);
    return x[LANG] || x.ar || x.en || '';
  };
  S.esc = function(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };
  // inline: `code`, **bold**, [text](https://link)
  function inline(s){
    return S.esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  S.inline = function(x){ return inline(S.L(x)); };
  // blocks: paragraphs (blank line), "- " lists, "1. " lists, ``` code ``` blocks
  S.md = function(x){
    var src = S.L(x), out = [], parts = src.split(/```/);
    parts.forEach(function(part, i){
      if(i % 2){
        out.push('<pre class="md-code" dir="ltr"><code>' + S.esc(part.replace(/^\w*\n/, '').replace(/\n$/, '')) + '</code></pre>');
        return;
      }
      part.split(/\n{2,}/).forEach(function(b){
        b = b.replace(/^\n+|\n+$/g, '');
        if(!b) return;
        var lines = b.split('\n');
        if(lines.every(function(l){ return /^- /.test(l); })) out.push('<ul>' + lines.map(function(l){ return '<li>' + inline(l.slice(2)) + '</li>'; }).join('') + '</ul>');
        else if(lines.every(function(l){ return /^\d+\. /.test(l); })) out.push('<ol>' + lines.map(function(l){ return '<li>' + inline(l.replace(/^\d+\. /, '')) + '</li>'; }).join('') + '</ol>');
        else out.push('<p>' + lines.map(inline).join('<br>') + '</p>');
      });
    });
    return out.join('');
  };
  S.copy = function(text, btn){
    function done(){
      if(!btn) return;
      var old = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', old);
      btn.textContent = S.B('تم النسخ ✓', 'Copied ✓');
      setTimeout(function(){ btn.textContent = old; }, 1400);
    }
    function fallback(){
      try{
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        done();
      }catch(e){}
    }
    try{ navigator.clipboard.writeText(text).then(done, fallback); }catch(e){ fallback(); }
  };
  var scripts = {};
  S.loadScript = function(src){
    if(scripts[src]) return scripts[src];
    scripts[src] = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = function(){ resolve(); };
      s.onerror = function(){ delete scripts[src]; reject(new Error('load failed: ' + src)); };
      document.head.appendChild(s);
    });
    return scripts[src];
  };
  S.version = (function(){
    var s = document.querySelector('script[src*="site.js?v="]');
    return s ? s.getAttribute('src').split('v=')[1] : '';
  })();
  S.toast = function(msg){
    var t = document.getElementById('siteToast');
    if(!t){ t = document.createElement('div'); t.id = 'siteToast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove('on'); }, 2600);
  };
  S.today = function(d){
    d = d || new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  };

  // ---------- speech (English, male voices as on the English page) ----------
  var MALE = /\b(male|man|david|mark|guy|ryan|george|james|daniel|alex|fred|tom|thomas|aaron|arthur|oliver|rishi|eric|christopher|roger|steffan|brian|andrew|william|liam|connor|mitchell|reed|evan|nathan|ralph|bruce|albert|lee|gordon|jacob|kyle|sam|matthew|noah|luke)\b/i;
  var FEMALE = /\b(female|woman|zira|aria|jenny|samantha|susan|hazel|libby|sonia|emma|ava|allison|karen|moira|tessa|fiona|victoria|kate|serena|michelle|nancy|sara|ana|clara|natasha|catherine|linda|heather|elizabeth|mia|joanna|salli|kimberly|ivy|kendra|amy|olivia|nicole|shelley|flo|sandy|martha|isla|jane|lily|maisie|ruth)\b/i;
  S.canSpeak = (function(){ try{ return 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'; }catch(e){ return false; } })();
  S.speak = function(text, opts){
    if(!S.canSpeak) return false;
    opts = opts || {};
    try{
      var synth = window.speechSynthesis;
      synth.cancel();
      var u = new SpeechSynthesisUtterance(String(text));
      var all = synth.getVoices().filter(function(v){ return /^en[-_]/i.test(v.lang) || v.lang === 'en'; });
      var male = all.filter(function(v){ return MALE.test(v.name) && !FEMALE.test(v.name); });
      var name = ''; try{ name = localStorage.getItem('eng_voice') || ''; }catch(e){}
      var v = male.filter(function(x){ return x.name === name; })[0] || male[0];
      if(v){ u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
      u.rate = opts.rate || 0.95;
      if(opts.onend) u.onend = opts.onend;
      synth.speak(u);
      return true;
    }catch(e){ return false; }
  };
  S.stopSpeak = function(){ try{ window.speechSynthesis.cancel(); }catch(e){} };

  // ---------- stores (synced with the account when signed in) ----------
  // A store is a map {id: item}; every item carries `at` (ms). Merging keeps the newer item per id,
  // and a removed item stays as {del: 1, at} so the removal syncs too.
  var PREFIX = 'site_';
  S.SYNC_KEYS = ['srs', 'mistakes', 'lab', 'prompts', 'fav', 'speak', 'done'];
  S.get = function(key){ try{ return JSON.parse(localStorage.getItem(PREFIX + key)) || {}; }catch(e){ return {}; } };
  S.put = function(key, map, quiet){
    try{ localStorage.setItem(PREFIX + key, JSON.stringify(map)); }catch(e){}
    if(!quiet){ activity(); emit('site:store', { key: key }); }
  };
  S.setItem = function(key, id, item){
    var m = S.get(key);
    item.at = Date.now();
    m[id] = item;
    S.put(key, m);
    return item;
  };
  S.removeItem = function(key, id){ S.setItem(key, id, { del: 1 }); };
  S.items = function(key){
    var m = S.get(key), out = [];
    Object.keys(m).forEach(function(id){ if(m[id] && !m[id].del) out.push(Object.assign({ id: id }, m[id])); });
    return out;
  };
  S.merge = function(a, b){
    var out = {};
    [a || {}, b || {}].forEach(function(m){
      Object.keys(m).forEach(function(id){
        var x = m[id];
        if(!x || typeof x !== 'object') return;
        if(!out[id] || (x.at || 0) > (out[id].at || 0)) out[id] = x;
      });
    });
    return out;
  };
  function emit(name, detail){ try{ document.dispatchEvent(new CustomEvent(name, { detail: detail })); }catch(e){} }
  S.emit = emit;

  // ---------- mistakes notebook ----------
  // q: {q, o[], a, why} with {ar, en} texts. Wrong answers from the journey, the exams and the quizzes land here;
  // answering one right twice in the review page clears it.
  S.mistake = function(track, id, q, chosen, from){
    if(!q || !q.o) return;
    var m = S.get('mistakes'), old = m[id] && !m[id].del ? m[id] : null;
    m[id] = { tr: track, q: q.q, o: q.o, a: q.a, why: q.why || '', chosen: chosen, from: from || '', n: (old ? old.n || 1 : 0) + 1, ok: 0, at: Date.now() };
    S.put('mistakes', m);
  };

  // ---------- activity (one count per day with any study action) ----------
  function activity(){
    var a = {}; try{ a = JSON.parse(localStorage.getItem(PREFIX + 'activity')) || {}; }catch(e){}
    var d = S.today();
    a[d] = (a[d] || 0) + 1;
    var keys = Object.keys(a).sort();
    while(keys.length > 400) delete a[keys.shift()];
    try{ localStorage.setItem(PREFIX + 'activity', JSON.stringify(a)); }catch(e){}
  }
  S.activity = function(){ try{ return JSON.parse(localStorage.getItem(PREFIX + 'activity')) || {}; }catch(e){ return {}; } };
  S.streak = function(){
    var a = S.activity(), d = new Date(), n = 0;
    if(!a[S.today(d)]) d.setDate(d.getDate() - 1);
    while(a[S.today(d)]){ n++; d.setDate(d.getDate() - 1); }
    return n;
  };
  document.addEventListener('journey:change', activity);

  // ---------- backup ----------
  var BACKUP = /^(site_|journey_|eng_|n8n_)/;
  S.exportBackup = function(){
    var data = {};
    for(var i = 0; i < localStorage.length; i++){
      var k = localStorage.key(i);
      if(BACKUP.test(k) && k.indexOf('journey_logged_') !== 0) data[k] = localStorage.getItem(k);
    }
    var blob = new Blob([JSON.stringify({ app: 'learn-n8n-english', v: 1, at: new Date().toISOString(), data: data }, null, 1)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'my-progress-' + S.today() + '.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 2000);
  };
  // returns the number of keys restored; throws on a file that is not a backup of this site
  S.importBackup = function(text){
    var b = JSON.parse(text);
    if(!b || b.app !== 'learn-n8n-english' || !b.data) throw new Error(S.B('الملف ده مش نسخة احتياطية من الموقع.', 'This file is not a backup of this site.'));
    var n = 0;
    Object.keys(b.data).forEach(function(k){
      if(!BACKUP.test(k) || typeof b.data[k] !== 'string') return;
      localStorage.setItem(k, b.data[k]); n++;
    });
    return n;
  };

  // ---------- menu and footer ----------
  var PAGES = window.SITE_PAGES || [];
  var here = (location.pathname.split('/').pop() || 'index.html').replace(/^$/, 'index.html');
  if(!/\.html$/.test(here)) here = 'index.html';
  S.pages = PAGES;
  S.page = PAGES.filter(function(p){ return p.href === here; })[0] || null;
  var installEvt = null;

  function buildNav(){
    var links = document.querySelector('.topbar .links');
    if(!links || !PAGES.length) return;
    var lang = links.querySelector('.lang-btn');
    Array.prototype.slice.call(links.querySelectorAll(':scope > a, :scope > .more-menu, :scope > .search-btn')).forEach(function(a){ a.remove(); });
    PAGES.filter(function(p){ return p.nav === 'main'; }).forEach(function(p){
      var a = document.createElement('a');
      a.href = p.href;
      a.textContent = S.L(p.title);
      if(p.href === here) a.setAttribute('aria-current', 'page');
      links.insertBefore(a, lang);
    });
    var more = PAGES.filter(function(p){ return p.nav === 'more'; });
    if(more.length){
      var d = document.createElement('details');
      d.className = 'more-menu';
      var cur = more.some(function(p){ return p.href === here; });
      d.innerHTML = '<summary' + (cur ? ' class="cur"' : '') + '>' + S.B('المزيد', 'More') + ' ▾</summary><div class="more-list" role="list">' +
        more.map(function(p){
          return '<a role="listitem" href="' + p.href + '"' + (p.href === here ? ' aria-current="page"' : '') + '><span aria-hidden="true">' + p.icon + '</span> ' + S.esc(S.L(p.title)) + '</a>';
        }).join('') + '<button type="button" class="more-install" hidden>📲 ' + S.B('ثبّت الموقع كتطبيق', 'Install as an app') + '</button></div>';
      links.insertBefore(d, lang);
      document.addEventListener('click', function(e){ if(d.open && !d.contains(e.target)) d.open = false; });
      d.querySelector('.more-install').addEventListener('click', function(){
        if(!installEvt) return;
        installEvt.prompt();
        installEvt = null; this.hidden = true;
      });
    }
    var sb = document.createElement('button');
    sb.type = 'button';
    sb.className = 'search-btn';
    sb.setAttribute('aria-label', S.B('ابحث في الموقع كله', 'Search the whole site'));
    sb.title = S.B('ابحث في الموقع كله (Ctrl+K)', 'Search the whole site (Ctrl+K)');
    sb.innerHTML = '<span aria-hidden="true">🔍</span><span class="search-lbl">' + S.B('ابحث', 'Search') + '</span><kbd dir="ltr">Ctrl K</kbd>';
    sb.addEventListener('click', openSearch);
    links.insertBefore(sb, links.firstChild);
  }
  function buildFooter(){
    var f = document.querySelector('.site-foot .foot-links');
    if(!f || !PAGES.length) return;
    f.innerHTML = PAGES.map(function(p){
      return '<a href="' + p.href + '"' + (p.href === here ? ' aria-current="page"' : '') + '>' + S.esc(S.L(p.title)) + '</a>';
    }).join('') + '<a href="https://github.com/micro4tricks-ai/learn-n8n-english" target="_blank" rel="noopener">' + S.B('الكود على GitHub ↗', 'Code on GitHub ↗') + '</a>';
  }
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    installEvt = e;
    var b = document.querySelector('.more-install'); if(b) b.hidden = false;
  });

  // ---------- search ----------
  var KINDS = {
    w: ['أسبوع', 'Week'], d: ['يوم', 'Day'], v: ['كلمة', 'Word'], t: ['مصطلح', 'Term'], g: ['قاعدة', 'Grammar'],
    p: ['جملة جاهزة', 'Phrase'], e: ['رسالة خطأ', 'Error'], l: ['مكتبة', 'Library'], x: ['مثال محلول', 'Example'],
    c: ['مرجع سريع', 'Cheat'], pr: ['برومبت', 'Prompt'], ch: ['تحدّي', 'Challenge'], sc: ['موقف', 'Situation'],
    ls: ['درس', 'Lesson'], s: ['ملخص', 'Sheet'], pg: ['صفحة', 'Page'], r: ['قراءة', 'Reading']
  };
  // one form for comparing: no diacritics or tatweel, one alef, ya and ta marbuta folded, lower case
  function norm(s){
    return String(s || '').toLowerCase()
      .replace(/[ً-ْـ]/g, '')
      .replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
      .replace(/[^\w؀-ۿ$.#+-]+/g, ' ').trim();
  }
  S.norm = norm;
  var INDEX = null, dlg = null, results = [], sel = 0;
  function loadIndex(){
    if(INDEX) return Promise.resolve(INDEX);
    return S.loadScript('assets/data/search-index.js' + (S.version ? '?v=' + S.version : '')).then(function(){
      var extra = PAGES.filter(function(p){ return p.desc; }).map(function(p){ return ['pg', p.title, p.desc, p.href]; });
      INDEX = (window.SITE_INDEX || []).concat(extra).map(function(r){
        var title = r[1], snip = r[2];
        var both = function(x){ return typeof x === 'object' && x ? (x.ar || '') + ' ' + (x.en || '') : (x || ''); };
        return { k: r[0], t: title, s: snip, u: r[3], nt: ' ' + norm(both(title)), ns: ' ' + norm(both(snip)) };
      });
      return INDEX;
    });
  }
  S.search = function(q, limit){
    var words = norm(q).split(' ').filter(Boolean);
    if(!words.length || !INDEX) return [];
    var out = [];
    INDEX.forEach(function(r){
      var score = 0;
      for(var i = 0; i < words.length; i++){
        var w = words[i];
        if(r.nt.indexOf(' ' + w) !== -1) score += r.nt.indexOf(' ' + w + ' ') !== -1 || r.nt.slice(-w.length - 1) === ' ' + w ? 6 : 4;
        else if(r.nt.indexOf(w) !== -1) score += 2;
        else if(r.ns.indexOf(w) !== -1) score += 1;
        else return;
      }
      if(r.nt === ' ' + words.join(' ')) score += 10;
      out.push({ r: r, score: score - r.nt.length / 400 });
    });
    out.sort(function(a, b){ return b.score - a.score; });
    return out.slice(0, limit || 40).map(function(x){ return x.r; });
  };
  function openSearch(){
    if(!dlg){
      dlg = document.createElement('dialog');
      dlg.className = 'search-dlg';
      dlg.setAttribute('aria-label', S.B('البحث في الموقع', 'Site search'));
      dlg.innerHTML = '<div class="search-top"><span aria-hidden="true">🔍</span>' +
        '<input type="search" id="siteQ" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="siteRes" aria-autocomplete="list" placeholder="' +
        S.esc(S.B('كلمة، مصطلح، قاعدة، مصدر، برومبت، أسبوع…', 'A word, term, rule, resource, prompt, week…')) + '">' +
        '<button type="button" class="acct-x" data-sx aria-label="' + S.esc(S.B('إغلاق', 'Close')) + '">✕</button></div>' +
        '<ul class="search-res" id="siteRes" role="listbox"></ul><p class="search-hint">' +
        S.esc(S.B('↑ ↓ للتنقل · Enter للفتح · Esc للإغلاق. البحث بالعربي والإنجليزي.', '↑ ↓ to move · Enter to open · Esc to close. Search in Arabic or English.')) + '</p>';
      document.body.appendChild(dlg);
      var input = dlg.querySelector('#siteQ');
      input.addEventListener('input', function(){ sel = 0; runSearch(); });
      input.addEventListener('keydown', function(e){
        if(e.key === 'ArrowDown'){ e.preventDefault(); sel = Math.min(results.length - 1, sel + 1); paint(); }
        if(e.key === 'ArrowUp'){ e.preventDefault(); sel = Math.max(0, sel - 1); paint(); }
        if(e.key === 'Enter' && results[sel]){ e.preventDefault(); go(S.L(results[sel].u)); }
      });
      dlg.addEventListener('click', function(e){
        if(e.target === dlg || (e.target.closest && e.target.closest('[data-sx]'))) closeSearch();
        var li = e.target.closest && e.target.closest('[data-u]');
        if(li) go(li.getAttribute('data-u'));
      });
    }
    if(dlg.showModal && !dlg.open) dlg.showModal(); else dlg.setAttribute('open', '');
    var input2 = dlg.querySelector('#siteQ');
    input2.focus(); input2.select();
    dlg.querySelector('#siteRes').innerHTML = '<li class="search-empty">' + S.esc(S.B('بيحمّل الفهرس…', 'Loading the index…')) + '</li>';
    loadIndex().then(runSearch, function(){
      dlg.querySelector('#siteRes').innerHTML = '<li class="search-empty">' + S.esc(S.B('مش قادرين نحمّل فهرس البحث. جرّب تاني.', 'Could not load the search index. Try again.')) + '</li>';
    });
  }
  S.openSearch = openSearch;
  function closeSearch(){ if(dlg){ if(dlg.close) dlg.close(); else dlg.removeAttribute('open'); } }
  function go(u){
    closeSearch();
    var page = u.split('#')[0];
    if(page === here || page === ''){
      var h = u.indexOf('#') !== -1 ? u.slice(u.indexOf('#')) : '';
      if(location.hash === h) window.dispatchEvent(new Event('hashchange')); else location.hash = h;
    }else location.href = u;
  }
  function runSearch(){
    if(!dlg || !INDEX) return;
    var q = dlg.querySelector('#siteQ').value;
    results = q.trim() ? S.search(q, 40) : [];
    paint();
  }
  function paint(){
    var ul = dlg.querySelector('#siteRes'), q = dlg.querySelector('#siteQ').value.trim();
    if(!q){ ul.innerHTML = '<li class="search-empty">' + S.esc(S.B('اكتب أي حاجة: webhook، past simple، Docker، مراجعة كود…', 'Type anything: webhook, past simple, Docker, code review…')) + '</li>'; return; }
    if(!results.length){ ul.innerHTML = '<li class="search-empty">' + S.esc(S.B('مفيش نتايج. جرّب كلمة تانية أو بالإنجليزي.', 'No results. Try another word, or Arabic.')) + '</li>'; return; }
    ul.innerHTML = results.map(function(r, i){
      var k = KINDS[r.k] || ['', ''];
      var t = S.L(r.t), s = S.L(r.s);
      return '<li role="option" id="sr' + i + '" data-u="' + S.esc(S.L(r.u)) + '"' + (i === sel ? ' aria-selected="true" class="on"' : '') + '>' +
        '<span class="sk">' + S.esc(S.B(k[0], k[1])) + '</span><span class="st"' + (AR.test(t) ? '' : ' dir="auto"') + '>' + S.esc(t) + '</span>' +
        (s ? '<span class="ss">' + S.esc(s.length > 140 ? s.slice(0, 140) + '…' : s) + '</span>' : '') + '</li>';
    }).join('');
    dlg.querySelector('#siteQ').setAttribute('aria-activedescendant', 'sr' + sel);
    var on = ul.querySelector('.on'); if(on && on.scrollIntoView) on.scrollIntoView({ block: 'nearest' });
  }
  document.addEventListener('keydown', function(e){
    var tag = (e.target && e.target.tagName) || '';
    var typing = /INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable);
    if((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')){ e.preventDefault(); openSearch(); }
    else if(e.key === '/' && !typing){ e.preventDefault(); openSearch(); }
  });

  // ---------- deep links: #section?q=… ----------
  S.hashParams = function(){
    var h = location.hash.slice(1), i = h.indexOf('?'), p = {};
    if(i !== -1) h.slice(i + 1).split('&').forEach(function(kv){ var x = kv.split('='); if(x[0]) p[decodeURIComponent(x[0])] = decodeURIComponent((x[1] || '').replace(/\+/g, ' ')); });
    return { id: i === -1 ? h : h.slice(0, i), p: p };
  };

  // ---------- comments (giscus) and analytics (GoatCounter), both off until configured ----------
  var CFG = window.SITE_CONFIG || {};
  S.comments = function(el, term){
    var g = CFG.giscus;
    if(!el || !g || !g.repoId || !g.categoryId) return false;
    el.innerHTML = '';
    var s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    var attrs = { repo: g.repo, 'repo-id': g.repoId, category: g.category, 'category-id': g.categoryId, mapping: 'specific', term: term,
      strict: '1', 'reactions-enabled': '1', 'emit-metadata': '0', 'input-position': 'top', theme: 'light', lang: LANG, loading: 'lazy' };
    Object.keys(attrs).forEach(function(k){ s.setAttribute('data-' + k, attrs[k]); });
    s.crossOrigin = 'anonymous'; s.async = true;
    el.appendChild(s);
    return true;
  };
  function analytics(){
    if(!CFG.goatcounter || /^(localhost|127\.|\[::1\])/.test(location.hostname) || location.protocol === 'file:') return;
    var s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-goatcounter', 'https://' + CFG.goatcounter + '.goatcounter.com/count');
    s.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(s);
  }

  // ---------- offline app ----------
  function registerSW(){
    if(!('serviceWorker' in navigator) || !/^https:$/.test(location.protocol) && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
    window.addEventListener('load', function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); });
  }

  buildNav();
  buildFooter();
  analytics();
  registerSW();
})();
