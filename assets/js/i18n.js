/* Tiny i18n layer shared by every page.
 * Arabic is the source language: every UI string, data string and static text is written in Arabic,
 * and English comes from a dictionary keyed by the exact Arabic text (see assets/js/*-en.js).
 * The chosen language is remembered per browser; switching reloads the page. */
(function(){
  var KEY = 'site_lang';
  var lang = 'ar';
  try{ lang = localStorage.getItem(KEY) || 'ar'; }catch(e){}
  if(lang !== 'en') lang = 'ar';
  window.LANG = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  var DICT = {};
  var AR = /[؀-ۿ]/;
  window.I18N_ADD = function(d){ for(var k in d) if(Object.prototype.hasOwnProperty.call(d, k)) DICT[k] = d[k]; };

  // Translate one string; surrounding whitespace is kept, the core is looked up.
  function T(s){
    if(lang === 'ar' || typeof s !== 'string') return s;
    if(s === '←') return '→';            // "next" arrow flips with the reading direction
    if(!AR.test(s)) return s;
    var m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var v = DICT[m[2]];
    if(v == null){ missing[m[2]] = 1; return s; }
    return m[1] + v + m[3];
  }
  // Template with {name} placeholders; the template itself is translated first.
  function TF(s, vars){
    return T(s).replace(/\{(\w+)\}/g, function(_, k){ return vars && vars[k] != null ? vars[k] : ''; });
  }
  // Deep-translate a data structure (arrays / objects / strings).
  function TDEEP(o){
    if(lang === 'ar') return o;
    if(typeof o === 'string') return T(o);
    if(Array.isArray(o)) return o.map(TDEEP);
    if(o && typeof o === 'object'){ var r = {}; for(var k in o) r[k] = TDEEP(o[k]); return r; }
    return o;
  }
  var missing = {};
  window.I18N_MISSING = missing;

  // Static page text: elements marked data-t translate their whole innerHTML;
  // everything else translates text nodes and a few attributes.
  function translateDOM(root){
    if(lang === 'ar') return;
    root.querySelectorAll('[data-t]').forEach(function(el){
      var k = el.innerHTML.trim().replace(/\s+/g, ' ');
      var v = DICT[k];
      if(v != null) el.innerHTML = v; else missing[k] = 1;
      el.setAttribute('data-done', '');
    });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function(t){
      if(!AR.test(t.nodeValue)) return;
      if(t.parentElement && t.parentElement.closest('[data-done],script,style')) return;
      t.nodeValue = T(t.nodeValue.replace(/\s+/g, ' '));
    });
    root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function(el){
      ['placeholder', 'aria-label', 'title'].forEach(function(a){
        var v = el.getAttribute(a);
        if(v && AR.test(v)) el.setAttribute(a, T(v));
      });
    });
    var meta = document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute('content', T(meta.getAttribute('content')));
    document.title = T(document.title);
  }

  function setLang(l){
    try{ localStorage.setItem(KEY, l); }catch(e){}
    location.reload();
  }
  function bindToggle(){
    document.querySelectorAll('[data-lang-toggle]').forEach(function(b){
      b.textContent = lang === 'ar' ? 'English' : 'العربية';
      b.setAttribute('lang', lang === 'ar' ? 'en' : 'ar');
      b.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التحويل للعربية');
      b.addEventListener('click', function(){ setLang(lang === 'ar' ? 'en' : 'ar'); });
    });
  }

  window.T = T; window.TF = TF; window.TDEEP = TDEEP;
  window.I18N = { translateDOM: translateDOM, bindToggle: bindToggle, setLang: setLang };
})();
