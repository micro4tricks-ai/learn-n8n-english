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
    .filter(function(s){ return s.id !== 'sprint' && s.querySelector(':scope > h2'); });
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
    setOpen(sec, !!open[sec.id], false);
    btn.addEventListener('click', function(){ setOpen(sec, sec.classList.contains('closed'), true); });
  });
  function openSection(id){
    var sec = document.getElementById(id);
    if(sec && sec.classList.contains('fold') && sec.classList.contains('closed')) setOpen(sec, true, true);
  }
  window.openSection = openSection;

  // links like #library open their section first
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if(a && a.getAttribute('href').length > 1) openSection(a.getAttribute('href').slice(1));
  }, true);
  try{ if(location.hash){ openSection(location.hash.slice(1)); var t = document.getElementById(location.hash.slice(1)); if(t) t.scrollIntoView(); } }catch(e){}
})();
