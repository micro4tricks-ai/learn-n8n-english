/* prompts.html: «my prompts» — the viewer's own prompts with {{variables}}, tags, versions, export/import.
 * Kept in the `prompts` store (synced with the account). A library card's «save» copies it here. */
(function(){
  var S = window.SITE, X = window.SECTIONS, B = S.B, L = S.L, esc = S.esc;
  var MAX_VERSIONS = 20;
  function uid(){ return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function save(id, p){ S.setItem('prompts', id, { t: p.t, text: p.text, tags: p.tags || [], v: (p.v || []).slice(-MAX_VERSIONS), from: p.from || '' }); }

  X.type('myprompts', function(el){
    var editing = null, q = '', vals = {}, sureDel = null, msg = '';
    function list(){
      return S.items('prompts').filter(function(p){
        if(!q) return true;
        var hay = S.norm(p.t + ' ' + p.text + ' ' + (p.tags || []).join(' '));
        return S.norm(q).split(' ').every(function(w){ return hay.indexOf(w) !== -1; });
      }).sort(function(a, b){ return b.at - a.at; });
    }
    function form(p){
      return '<form class="md-card mp-form"><h3>' + esc(p.id ? B('تعديل البرومبت', 'Edit prompt') : B('برومبت جديد', 'New prompt')) + '</h3>' +
        '<label class="lab-lbl">' + esc(B('الاسم', 'Name')) + '<input class="lab-in" name="t" required maxlength="120" dir="auto" value="' + esc(p.t || '') + '"></label>' +
        '<label class="lab-lbl">' + esc(B('البرومبت (اكتب {{اسم}} لأي خانة عايز تملاها كل مرة)', 'The prompt (write {{name}} for any box you want to fill each time)')) +
        '<textarea class="lab-code" name="text" rows="8" required maxlength="20000" dir="auto">' + esc(p.text || '') + '</textarea></label>' +
        '<label class="lab-lbl">' + esc(B('تاجز (مفصولة بفاصلة)', 'Tags (comma separated)')) + '<input class="lab-in" name="tags" maxlength="200" dir="auto" value="' + esc((p.tags || []).join(', ')) + '"></label>' +
        '<div class="jr-actions"><button type="submit" class="link-btn">' + esc(B('احفظ', 'Save')) + '</button><button type="button" class="ghost-btn" data-cancel>' + esc(B('إلغاء', 'Cancel')) + '</button></div></form>';
    }
    function card(p){
      var names = X.vars(p.text), v = vals[p.id] || (vals[p.id] = {});
      return '<article class="md-card" data-id="' + esc(p.id) + '"><div class="md-top"><h3 class="mine-user" dir="auto">' + esc(p.t) + '</h3></div>' +
        (p.tags && p.tags.length ? '<div class="lib-badges">' + p.tags.map(function(t){ return '<span class="tag mine-user">' + esc(t) + '</span>'; }).join('') + '</div>' : '') +
        (names.length ? '<div class="var-form">' + names.map(function(n){ return '<label' + (X.multi(n) ? ' class="wide"' : '') + '><span class="mine-user">' + esc(n) + '</span>' + (X.multi(n) ? '<textarea rows="3" data-var="' + esc(n) + '" dir="auto">' + esc(v[n] || '') + '</textarea>' : '<input type="text" data-var="' + esc(n) + '" value="' + esc(v[n] || '') + '" dir="auto">') + '</label>'; }).join('') + '</div>' : '') +
        '<pre class="md-code mine-user" dir="auto"><code>' + esc(X.fill(p.text, v)) + '</code></pre>' +
        '<div class="jr-actions"><button type="button" class="copy-btn" data-copy>' + esc(B('نسخ', 'Copy')) + '</button>' +
        '<button type="button" class="ghost-btn" data-edit>' + esc(B('تعديل', 'Edit')) + '</button>' +
        '<button type="button" class="ghost-btn" data-dup>' + esc(B('نسخة منه', 'Duplicate')) + '</button>' +
        '<button type="button" class="ghost-btn" data-del>' + esc(sureDel === p.id ? B('متأكد؟ دوس تاني', 'Sure? Click again') : B('امسح', 'Delete')) + '</button></div>' +
        (p.v && p.v.length ? '<details class="ans"><summary>' + esc(B('النسخ القديمة (' + p.v.length + ')', 'Older versions (' + p.v.length + ')')) + '</summary><ul class="mk-list">' +
          p.v.slice().reverse().map(function(ver, i){
            return '<li><span class="mk-q mine-user" dir="auto">' + esc(ver.text.length > 160 ? ver.text.slice(0, 160) + '…' : ver.text) + '</span><span class="sub-note">' + esc(new Date(ver.at).toLocaleString(window.LANG === 'en' ? 'en-GB' : 'ar-EG')) + '</span>' +
              '<button type="button" class="ghost-btn" data-restore="' + (p.v.length - 1 - i) + '">' + esc(B('رجّعها', 'Restore')) + '</button></li>';
          }).join('') + '</ul></details>' : '') + '</article>';
    }
    function paint(){
      var l = list(), all = S.items('prompts');
      var h = '<div class="lib-tools"><button type="button" class="link-btn" data-new>＋ ' + esc(B('برومبت جديد', 'New prompt')) + '</button>' +
        (all.length ? '<label class="lib-search"><span>' + esc(B('ابحث:', 'Search:')) + '</span><input type="search" data-q value="' + esc(q) + '" autocomplete="off"></label>' : '') +
        '<button type="button" class="ghost-btn" data-export' + (all.length ? '' : ' disabled') + '>' + esc(B('صدّر JSON', 'Export JSON')) + '</button>' +
        '<label class="ghost-btn file-btn">' + esc(B('استورد JSON', 'Import JSON')) + '<input type="file" accept=".json,application/json" data-import hidden></label></div>' +
        '<p class="acct-msg" role="alert">' + esc(msg) + '</p>';
      if(editing) h += form(editing);
      if(!all.length && !editing) h += '<p class="sub-note">' + esc(B('لسه مفيش برومبتات. دوس «برومبت جديد»، أو «احفظه في برومبتاتي» على أي كارت في المكتبة وعدّله على مزاجك.', 'No prompts yet. Click «New prompt», or «Save to my prompts» on any library card and adapt it.')) + '</p>';
      h += '<div class="md-grid">' + l.map(card).join('') + '</div>';
      el.innerHTML = h;
      var f = el.querySelector('.mp-form input[name="t"]'); if(f && !f.value) f.focus();
    }
    function item(id){ return S.items('prompts').filter(function(p){ return p.id === id; })[0]; }
    el.addEventListener('submit', function(e){
      e.preventDefault();
      var f = e.target, get = function(n){ var x = f.elements.namedItem(n); return x ? x.value : ''; }, t = get('t').trim(), text = get('text');
      if(!t || !text.trim()) return;
      var tags = get('tags').split(/[,،]/).map(function(x){ return x.trim(); }).filter(Boolean).slice(0, 8);
      var old = editing.id ? item(editing.id) : null, v = old ? (old.v || []).slice() : [];
      if(old && old.text !== text) v.push({ text: old.text, at: old.at });
      save(editing.id || uid(), { t: t, text: text, tags: tags, v: v, from: old ? old.from : editing.from });
      editing = null; msg = ''; paint();
    });
    el.addEventListener('click', function(e){
      var b = e.target.closest('button');
      if(!b) return;
      if(b.hasAttribute('data-new')){ editing = {}; paint(); return; }
      if(b.hasAttribute('data-cancel')){ editing = null; paint(); return; }
      if(b.hasAttribute('data-export')){
        var data = S.items('prompts').map(function(p){ return { t: p.t, text: p.text, tags: p.tags || [] }; });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify({ app: 'learn-n8n-english', kind: 'prompts', prompts: data }, null, 1)], { type: 'application/json' }));
        a.download = 'my-prompts-' + S.today() + '.json';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        return;
      }
      var art = b.closest('[data-id]'), p = art && item(art.dataset.id);
      if(!p) return;
      if(b.hasAttribute('data-copy')) S.copy(X.fill(p.text, vals[p.id] || {}), b);
      if(b.hasAttribute('data-edit')){ editing = p; paint(); el.scrollIntoView({ block: 'start' }); }
      if(b.hasAttribute('data-dup')){ save(uid(), { t: p.t + B(' (نسخة)', ' (copy)'), text: p.text, tags: p.tags }); paint(); }
      if(b.hasAttribute('data-del')){
        if(sureDel !== p.id){ sureDel = p.id; paint(); return; }
        sureDel = null; S.removeItem('prompts', p.id); paint();
      }
      if(b.dataset.restore != null){
        var ver = p.v[Number(b.dataset.restore)], v = p.v.slice();
        v.push({ text: p.text, at: p.at });
        save(p.id, { t: p.t, text: ver.text, tags: p.tags, v: v, from: p.from });
        S.toast(B('رجعت النسخة القديمة ✓', 'Old version restored ✓'));
        paint();
      }
    });
    el.addEventListener('input', function(e){
      if(e.target.hasAttribute('data-q')){ q = e.target.value; var pos = e.target.selectionStart; paint(); var s = el.querySelector('[data-q]'); s.focus(); try{ s.setSelectionRange(pos, pos); }catch(x){} return; }
      var n = e.target.dataset && e.target.dataset['var'];
      if(n == null) return;
      var art = e.target.closest('[data-id]'), p = item(art.dataset.id);
      (vals[p.id] = vals[p.id] || {})[n] = e.target.value;
      art.querySelector('.md-code code').textContent = X.fill(p.text, vals[p.id]);
    });
    el.addEventListener('change', function(e){
      if(!e.target.hasAttribute('data-import') || !e.target.files[0]) return;
      var r = new FileReader();
      r.onload = function(){
        try{
          var j = JSON.parse(r.result), arr = j && j.prompts;
          if(!Array.isArray(arr)) throw new Error();
          var n = 0;
          arr.forEach(function(p){ if(p && typeof p.t === 'string' && typeof p.text === 'string'){ save(uid(), { t: p.t.slice(0, 120), text: p.text.slice(0, 20000), tags: Array.isArray(p.tags) ? p.tags.slice(0, 8).map(String) : [] }); n++; } });
          msg = ''; S.toast(B('اتضاف ' + n + ' برومبت ✓', n + ' prompts added ✓'));
        }catch(err){ msg = B('الملف ده مش ملف برومبتات من الموقع.', 'This file is not a prompts file from this site.'); }
        paint();
      };
      r.readAsText(e.target.files[0]);
    });
    // «save to my prompts» on a library card: copy it with the values typed so far, then open it for editing
    document.addEventListener('sections:save', function(e){
      var it = e.detail.item, id = uid();
      save(id, { t: L(it.t), text: String(L(it.code)), tags: [L((e.detail.sec.cats || []).filter(function(c){ return c.id === it.cat; })[0] ? e.detail.sec.cats.filter(function(c){ return c.id === it.cat; })[0].t : '')].filter(Boolean), from: it.id });
      S.toast(B('اتحفظ في برومبتاتي ✓', 'Saved to my prompts ✓'));
      paint();
    });
    document.addEventListener('site:store', function(ev){ if(ev.detail && ev.detail.key === 'prompts' && ev.detail.remote && !editing) paint(); });
    paint();
  });
})();
