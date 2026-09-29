/* Sections: pages built from data. A content file (content/sections/<page>.js) adds sections with
 *   SECTIONS.add({ page, id, order, kind, title:{ar,en}, desc:{ar,en}, type, ...type options })
 * and the page calls SECTIONS.render() before ui.js (which makes every section collapsible).
 * Built-in types:
 *   cards    — searchable cards in category tabs: title, body (small markdown), code with {{variables}}
 *              filled from a form, copy button, favourites. Good for prompts, snippets, phrases…
 *   lessons  — numbered lessons (open one at a time) with a practice task, links and a «done» mark
 *   sheets   — printable cheat sheets: groups of [code, meaning] rows
 * A page script adds its own types with SECTIONS.type(name, function(el, sec){ … }).
 * Texts are {ar, en}; a plain string is used as is (code, English examples). See docs/ARCHITECTURE.md. */
(function(){
  var S = window.SITE;
  var list = [], types = {};
  var X = window.SECTIONS = {
    add: function(sec){ list.push(sec); return sec; },
    type: function(name, fn){ types[name] = fn; },
    all: function(page){ return list.filter(function(s){ return !page || s.page === page; }).sort(function(a, b){ return (a.order || 0) - (b.order || 0); }); }
  };
  var B = S.B, L = S.L, esc = S.esc;

  X.render = function(){
    var main = document.getElementById('page');
    if(!main) return;
    var page = main.getAttribute('data-page'), secs = X.all(page), nav = document.getElementById('snav');
    var info = (S.pages || []).filter(function(p){ return p.id === page; })[0], head = document.getElementById('pageHead');
    if(info){
      document.title = L(info.title) + ' · ' + B('رحلة المبرمج', 'Developer Journey');
      if(head) head.innerHTML = '<div><span class="brand-tag mono">learn/' + esc(page) + (info.tag ? ' ' + esc(info.tag) : '') + '</span>' +
        '<h1>' + esc(info.icon || '') + ' ' + esc(L(info.h1 || info.title)) + '</h1>' + (info.desc ? '<p class="sub">' + esc(L(info.desc)) + '</p>' : '') + '</div>' +
        '<div class="stat-cards" id="pageStats"></div>';
    }
    if(nav) nav.innerHTML = secs.map(function(s){ return '<a href="#' + s.id + '">' + esc(L(s.nav || s.title)) + '</a>'; }).join('');
    secs.forEach(function(s, i){
      var el = document.createElement('section');
      el.id = s.id;
      el.innerHTML = '<h2><span class="n">' + ('0' + (i + 1)).slice(-2) + '</span> ' + esc(L(s.title)) + '</h2>' +
        (s.desc ? '<div class="section-desc">' + S.md(s.desc) + '</div>' : '') + '<div class="sec-body"></div>';
      main.appendChild(el);
      var fn = types[s.type];
      var body = el.querySelector('.sec-body');
      if(fn) fn(body, s); else body.innerHTML = '<p class="lock-note">Unknown section type: ' + esc(s.type) + '</p>';
    });
  };

  // ---------- helpers shared by the types ----------
  // {{name}} is a box to fill; n8n expressions such as {{ $json.x }} stay as they are
  var VAR = /\{\{\s*([A-Za-z_؀-ۿ][\w؀-ۿ]*)\s*\}\}/g;
  X.vars = function(text){
    var out = [], m;
    VAR.lastIndex = 0;
    while((m = VAR.exec(text))){ if(out.indexOf(m[1]) === -1) out.push(m[1]); }
    return out;
  };
  X.fill = function(text, vals){
    return text.replace(VAR, function(all, k){ return vals[k] != null && vals[k] !== '' ? vals[k] : all; });
  };
  function lvl(l){
    var t = { b: ['مبتدئ', 'Beginner'], i: ['متوسط', 'Intermediate'], a: ['متقدم', 'Advanced'] }[l];
    return t ? '<span class="lvl l' + ({ b: 1, i: 2, a: 3 })[l] + '">' + B(t[0], t[1]) + '</span>' : '';
  }
  X.lvl = lvl;
  function favKey(sec, it){ return sec.id + ':' + it.id; }
  function isFav(sec, it){ var f = S.get('fav')[favKey(sec, it)]; return !!(f && !f.del); }

  // ---------- cards ----------
  X.type('cards', function(el, sec){
    var cats = sec.cats || [], tab = 'all', q = '', open = {};
    var vals = {};   // variable values typed per card, kept for the session
    el.innerHTML = '<div class="lib-tools"><label class="lib-search"><span>' + B('ابحث:', 'Search:') + '</span>' +
      '<input type="search" autocomplete="off" placeholder="' + esc(L(sec.searchHint || { ar: 'اكتب كلمة…', en: 'Type a word…' })) + '"></label>' +
      '<span class="lib-count" aria-live="polite"></span></div><div class="cat-tabs" role="tablist"></div><div class="md-grid"></div>';
    var input = el.querySelector('input'), tabsEl = el.querySelector('.cat-tabs'), grid = el.querySelector('.md-grid'), count = el.querySelector('.lib-count');
    function tabs(){
      var all = [['all', B('الكل', 'All')]].concat(cats.map(function(c){ return [c.id, L(c.t)]; }), [['fav', '⭐ ' + B('المفضّلة', 'Favourites')]]);
      tabsEl.innerHTML = all.map(function(t){ return '<button type="button" class="cat-tab' + (t[0] === tab ? ' active' : '') + '" data-tab="' + esc(t[0]) + '">' + esc(t[1]) + '</button>'; }).join('');
    }
    function match(it){
      if(tab === 'fav' ? !isFav(sec, it) : (tab !== 'all' && it.cat !== tab)) return false;
      if(!q) return true;
      var hay = S.norm([L(it.t), it.t && it.t.en, L(it.body), it.code, (it.tags || []).join(' ')].join(' '));
      return S.norm(q).split(' ').every(function(w){ return hay.indexOf(w) !== -1; });
    }
    function card(it){
      var fav = isFav(sec, it), code = it.code ? String(L(it.code)) : '', names = code ? X.vars(code) : [];
      var v = vals[it.id] || (vals[it.id] = {});
      var h = '<article class="md-card" data-id="' + esc(it.id) + '"><div class="md-top"><h3>' + esc(L(it.t)) + '</h3>' +
        '<button type="button" class="fav-btn" data-fav aria-pressed="' + fav + '" aria-label="' + esc(B('مفضّلة', 'Favourite')) + '">' + (fav ? '★' : '☆') + '</button></div>';
      var badges = lvl(it.lvl) + (it.cat && cats.length ? '<span class="tag">' + esc(L((cats.filter(function(c){ return c.id === it.cat; })[0] || {}).t)) + '</span>' : '') +
        (it.tags || []).map(function(t){ return '<span class="tag">' + esc(t) + '</span>'; }).join('');
      if(badges) h += '<div class="lib-badges">' + badges + '</div>';
      if(it.body) h += '<div class="md-body">' + S.md(it.body) + '</div>';
      if(code){
        var isOpen = open[it.id] || !sec.collapseCode;
        if(!isOpen) h += '<button type="button" class="ghost-btn" data-open>' + esc(L(sec.openLabel || { ar: 'اعرض البرومبت', en: 'Show the prompt' })) + '</button>';
        else{
          if(names.length) h += '<div class="var-form">' + names.map(function(n){
            var label = (it.vars && it.vars[n]) ? L(it.vars[n]) : n;
            return '<label><span>' + esc(label) + '</span><input type="text" data-var="' + esc(n) + '" value="' + esc(v[n] || '') + '" dir="auto"></label>';
          }).join('') + '</div>';
          h += '<pre class="md-code" dir="' + (it.rtl ? 'rtl' : 'ltr') + '"><code>' + esc(X.fill(code, v)) + '</code></pre>' +
            '<div class="jr-actions"><button type="button" class="copy-btn" data-copy>' + B('نسخ', 'Copy') + '</button>' +
            (sec.saveLabel ? '<button type="button" class="ghost-btn" data-save>' + esc(L(sec.saveLabel)) + '</button>' : '') +
            (names.length ? '<span class="sub-note">' + esc(B('املا الخانات والبرومبت بيتملي لوحده قبل النسخ.', 'Fill the boxes and the text updates before you copy.')) + '</span>' : '') + '</div>';
        }
      }
      if(it.tip) h += '<div class="ex-tip">💡 ' + S.inline(it.tip) + '</div>';
      if(it.bad) h += '<details class="ans"><summary>' + esc(B('قارن: نسخة ضعيفة من نفس الطلب', 'Compare: a weak version of the same request')) + '</summary><pre class="md-code weak" dir="ltr"><code>' + esc(L(it.bad)) + '</code></pre>' +
        (it.badWhy ? '<p class="sub-note">' + S.inline(it.badWhy) + '</p>' : '') + '</details>';
      if(it.links) h += '<div class="md-links">' + it.links.map(function(l){ return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(L(l.t)) + ' ↗</a>'; }).join('') + '</div>';
      return h + '</article>';
    }
    function paint(){
      var items = (sec.items || []).filter(match);
      count.textContent = B(items.length + ' من ' + sec.items.length, items.length + ' of ' + sec.items.length);
      grid.innerHTML = items.length ? items.map(card).join('') : '<p class="sub-note">' + esc(tab === 'fav' ? B('لسه ما علّمتش على حاجة ⭐.', 'Nothing starred yet ⭐.') : B('مفيش نتايج.', 'No results.')) + '</p>';
    }
    function item(id){ return (sec.items || []).filter(function(x){ return x.id === id; })[0]; }
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      if(b.dataset.tab){ tab = b.dataset.tab; tabs(); paint(); return; }
      var art = b.closest('.md-card'), it = art && item(art.dataset.id);
      if(!it) return;
      if(b.hasAttribute('data-fav')){
        if(isFav(sec, it)) S.removeItem('fav', favKey(sec, it)); else S.setItem('fav', favKey(sec, it), { on: 1 });
        if(tab === 'fav') paint(); else { b.textContent = isFav(sec, it) ? '★' : '☆'; b.setAttribute('aria-pressed', isFav(sec, it)); }
        return;
      }
      if(b.hasAttribute('data-open')){ open[it.id] = 1; art.outerHTML = card(it); return; }
      if(b.hasAttribute('data-copy')) S.copy(X.fill(String(L(it.code)), vals[it.id] || {}), b);
      // a page script can take a card (e.g. «save to my prompts»)
      if(b.hasAttribute('data-save')) S.emit('sections:save', { sec: sec, item: it, values: vals[it.id] || {} });
    });
    el.addEventListener('input', function(e){
      if(e.target === input){ q = input.value.trim(); paint(); return; }
      var n = e.target.dataset && e.target.dataset['var'];
      if(n == null) return;
      var art = e.target.closest('.md-card'), it = item(art.dataset.id);
      (vals[it.id] = vals[it.id] || {})[n] = e.target.value;
      art.querySelector('.md-code code').textContent = X.fill(String(L(it.code)), vals[it.id]);
    });
    tabs(); paint();
  });

  // ---------- lessons ----------
  X.type('lessons', function(el, sec){
    function done(it){ var d = S.get('done')[sec.id + ':' + it.id]; return !!(d && !d.del); }
    function paint(){
      var n = (sec.items || []).filter(done).length;
      el.innerHTML = '<p class="progress-txt">' + esc(B('خلّصت ' + n + ' من ' + sec.items.length, 'Done ' + n + ' of ' + sec.items.length)) + '</p>' +
        '<div class="progress-bar"><div class="progress-fill" style="width:' + Math.round(n / sec.items.length * 100) + '%"></div></div>' +
        '<div class="lesson-list">' + sec.items.map(function(it, i){
          var d = done(it);
          return '<details class="md-card lesson' + (d ? ' done' : '') + '" data-id="' + esc(it.id) + '"><summary><span class="ln">' + (i + 1) + '</span><span class="lt">' + esc(L(it.t)) + '</span>' +
            (it.min ? '<span class="tag">⏱ ' + it.min + B(' دقيقة', ' min') + '</span>' : '') + (d ? '<span class="ok">✓</span>' : '') + '</summary>' +
            '<div class="md-body">' + S.md(it.body) + '</div>' +
            (it.example ? '<pre class="md-code" dir="ltr"><code>' + esc(L(it.example)) + '</code></pre>' : '') +
            (it['try'] ? '<div class="challenge"><b>' + esc(B('جرّب بنفسك:', 'Try it:')) + '</b> ' + S.md(it['try']) + '</div>' : '') +
            (it.links ? '<div class="md-links">' + it.links.map(function(l){ return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(L(l.t)) + ' ↗</a>'; }).join('') + '</div>' : '') +
            '<label class="task"><input type="checkbox" data-done' + (d ? ' checked' : '') + '> ' + esc(B('خلّصت الدرس ده', 'I finished this lesson')) + '</label></details>';
        }).join('') + '</div>';
    }
    el.addEventListener('change', function(e){
      if(!e.target.hasAttribute('data-done')) return;
      var id = sec.id + ':' + e.target.closest('[data-id]').dataset.id;
      if(e.target.checked) S.setItem('done', id, { on: 1 }); else S.removeItem('done', id);
      var openId = e.target.closest('[data-id]').dataset.id;
      paint();
      var d = el.querySelector('[data-id="' + openId + '"]'); if(d) d.open = true;
    });
    // one lesson open at a time
    el.addEventListener('toggle', function(e){
      if(!e.target.open) return;
      el.querySelectorAll('details.lesson[open]').forEach(function(d){ if(d !== e.target) d.open = false; });
    }, true);
    paint();
  });

  // ---------- sheets ----------
  X.type('sheets', function(el, sec){
    var tab = sec.items[0] && sec.items[0].id;
    function paint(){
      var sh = sec.items.filter(function(s){ return s.id === tab; })[0];
      el.innerHTML = '<div class="cat-tabs no-print">' + sec.items.map(function(s){
        return '<button type="button" class="cat-tab' + (s.id === tab ? ' active' : '') + '" data-sheet="' + s.id + '">' + esc(L(s.t)) + '</button>';
      }).join('') + '</div>' +
        '<div class="jr-actions no-print"><button type="button" class="link-btn" data-print>🖨 ' + B('اطبع الملخص ده', 'Print this sheet') + '</button>' +
        '<button type="button" class="ghost-btn" data-printall>🖨 ' + B('اطبع كل الملخصات', 'Print every sheet') + '</button></div>' +
        sec.items.map(function(s){ return sheet(s, s.id === tab); }).join('');
    }
    function sheet(s, on){
      return '<article class="sheet' + (on ? ' on' : '') + '" data-sheet-id="' + s.id + '"><header><h3>' + esc(L(s.t)) + '</h3>' +
        (s.sub ? '<p>' + S.inline(s.sub) + '</p>' : '') + '</header><div class="sheet-cols">' +
        s.groups.map(function(g){
          return '<div class="sheet-g"><h4>' + esc(L(g.t)) + '</h4><table>' + g.rows.map(function(r){
            return '<tr><td class="c" dir="ltr">' + esc(L(r[0])) + '</td><td>' + S.inline(r[1]) + '</td></tr>';
          }).join('') + '</table></div>';
        }).join('') + '</div><footer>learn-n8n-english · ' + esc(L(s.t)) + '</footer></article>';
    }
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      if(b.dataset.sheet){ tab = b.dataset.sheet; paint(); return; }
      if(b.hasAttribute('data-print') || b.hasAttribute('data-printall')){
        document.body.classList.add(b.hasAttribute('data-print') ? 'print-sheet' : 'print-sheets');
        window.print();
        document.body.classList.remove('print-sheet', 'print-sheets');
      }
    });
    paint();
  });
})();
