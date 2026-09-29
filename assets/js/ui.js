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
    if(i !== -1) h.slice(i + 1).split('&').forEach(function(kv){ var x = kv.split('='); if(x[0]) p[decodeURIComponent(x[0])] = decodeURIComponent((x[1] || '').replace(/\+/g, ' ')); });
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
})();
