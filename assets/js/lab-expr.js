/* An approximate n8n expression evaluator for practice (lab.html). It runs inside a Web Worker
 * (and in node for tools/test_lab.js): labExprInstall(root) adds root.LAB_EXPR and n8n's extra
 * methods (String/Array/Number) to that realm only. Not the real n8n engine: good for learning the
 * syntax, the result should still be checked in n8n. */
function labExprInstall(root){
  function def(proto, name, fn){ if(!Object.prototype.hasOwnProperty.call(proto, name)) Object.defineProperty(proto, name, { value: fn, configurable: true, writable: true }); }
  var S = root.String.prototype, A = root.Array.prototype, N = root.Number.prototype;
  // ---- strings ----
  def(S, 'isEmpty', function(){ return this.length === 0; });
  def(S, 'isNotEmpty', function(){ return this.length > 0; });
  def(S, 'isEmail', function(){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this); });
  def(S, 'isUrl', function(){ return /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(this); });
  def(S, 'isNumeric', function(){ return this.trim() !== '' && !isNaN(Number(this)); });
  def(S, 'extractEmail', function(){ var m = this.match(/[\w.+-]+@[\w-]+\.[\w.-]+/); return m ? m[0] : undefined; });
  def(S, 'extractDomain', function(){
    var s = String(this), m = s.match(/@([\w.-]+\.[a-z]{2,})/i);
    if(m) return m[1];
    m = s.match(/^(?:[a-z]+:\/\/)?(?:www\.)?([^\/\s:?#]+)/i);
    return m ? m[1] : undefined;
  });
  def(S, 'extractUrl', function(){ var m = this.match(/https?:\/\/[^\s"'<>]+/); return m ? m[0] : undefined; });
  def(S, 'removeTags', function(){ return this.replace(/<[^>]*>/g, ''); });
  def(S, 'toTitleCase', function(){ return this.toLowerCase().replace(/(^|\s)\S/g, function(c){ return c.toUpperCase(); }); });
  def(S, 'toSentenceCase', function(){ var s = this.toLowerCase(); return s.charAt(0).toUpperCase() + s.slice(1); });
  def(S, 'toSnakeCase', function(){ return this.trim().replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase(); });
  def(S, 'toNumber', function(){ return Number(this); });
  def(S, 'toBoolean', function(){ return !/^(false|0|no|)$/i.test(this.trim()); });
  def(S, 'urlEncode', function(){ return encodeURIComponent(this); });
  def(S, 'urlDecode', function(){ return decodeURIComponent(this); });
  def(S, 'quote', function(q){ q = q || '"'; return q + this + q; });
  // ---- arrays ----
  def(A, 'sum', function(){ return this.reduce(function(a, b){ return a + Number(b); }, 0); });
  def(A, 'average', function(){ return this.length ? this.sum() / this.length : 0; });
  def(A, 'max', function(){ return Math.max.apply(null, this); });
  def(A, 'min', function(){ return Math.min.apply(null, this); });
  def(A, 'first', function(){ return this[0]; });
  def(A, 'last', function(){ return this[this.length - 1]; });
  def(A, 'isEmpty', function(){ return this.length === 0; });
  def(A, 'isNotEmpty', function(){ return this.length > 0; });
  def(A, 'unique', function(key){ var seen = new root.Set(); return this.filter(function(x){ var k = key && x && typeof x === 'object' ? x[key] : JSON.stringify(x); if(seen.has(k)) return false; seen.add(k); return true; }); });
  def(A, 'compact', function(){ return this.filter(function(x){ return x !== null && x !== undefined && x !== ''; }); });
  def(A, 'pluck', function(){ var keys = [].slice.call(arguments); return this.map(function(x){ if(keys.length === 1) return x == null ? undefined : x[keys[0]]; var o = {}; keys.forEach(function(k){ o[k] = x == null ? undefined : x[k]; }); return o; }); });
  def(A, 'chunk', function(n){ var out = []; for(var i = 0; i < this.length; i += n) out.push(this.slice(i, i + n)); return out; });
  def(A, 'removeDuplicates', function(key){ return this.unique(key); });
  // ---- numbers ----
  def(N, 'round', function(d){ var p = Math.pow(10, d || 0); return Math.round(this * p) / p; });
  def(N, 'floor', function(){ return Math.floor(this); });
  def(N, 'ceil', function(){ return Math.ceil(this); });
  def(N, 'isEven', function(){ return this % 2 === 0; });
  def(N, 'isOdd', function(){ return Math.abs(this % 2) === 1; });
  def(N, 'toBoolean', function(){ return this !== 0; });
  def(N, 'format', function(locale){ return Number(this).toLocaleString(locale || 'en-US'); });

  // a small stand-in for Luxon's DateTime when Luxon could not load (offline)
  function MiniDate(d){ this.d = d; }
  MiniDate.prototype.toFormat = function(f){
    var d = this.d, p = function(n, w){ n = String(n); while(n.length < (w || 2)) n = '0' + n; return n; };
    return f.replace(/yyyy|MM|dd|HH|mm|ss/g, function(t){ return { yyyy: d.getFullYear(), MM: p(d.getMonth() + 1), dd: p(d.getDate()), HH: p(d.getHours()), mm: p(d.getMinutes()), ss: p(d.getSeconds()) }[t]; });
  };
  MiniDate.prototype.toISO = function(){ return this.d.toISOString(); };
  MiniDate.prototype.toString = function(){ return this.d.toISOString(); };
  MiniDate.prototype.plus = function(o){ var d = new Date(this.d); if(o.days) d.setDate(d.getDate() + o.days); if(o.hours) d.setHours(d.getHours() + o.hours); return new MiniDate(d); };
  MiniDate.prototype.minus = function(o){ var n = {}; for(var k in o) n[k] = -o[k]; return this.plus(n); };
  MiniDate.prototype.startOf = function(){ var d = new Date(this.d); d.setHours(0, 0, 0, 0); return new MiniDate(d); };
  Object.defineProperty(MiniDate.prototype, 'year', { get: function(){ return this.d.getFullYear(); } });
  Object.defineProperty(MiniDate.prototype, 'month', { get: function(){ return this.d.getMonth() + 1; } });
  Object.defineProperty(MiniDate.prototype, 'day', { get: function(){ return this.d.getDate(); } });

  // Evaluate a field value: "={{ … }}" parts are JavaScript; one whole {{ }} keeps its type (number, array…),
  // mixed text returns a string. items: [{…json…}], idx: the current item.
  function evaluate(tpl, items, idx){
    tpl = String(tpl).replace(/^=/, '');
    var DT = root.luxon && root.luxon.DateTime;
    var now = DT ? DT.now() : new MiniDate(new Date());
    var wrapped = items.map(function(j){ return { json: j }; });
    var cur = wrapped[idx || 0] || { json: {} };
    var ctx = {
      $json: cur.json,
      $input: { all: function(){ return wrapped; }, first: function(){ return wrapped[0]; }, last: function(){ return wrapped[wrapped.length - 1]; }, item: cur },
      $items: function(){ return wrapped; },
      $now: now,
      $today: DT ? DT.now().startOf('day') : now.startOf('day'),
      $if: function(c, a, b){ return c ? a : b; },
      $ifEmpty: function(v, d){ return v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length) || (typeof v === 'object' && v && !Object.keys(v).length) ? d : v; },
      $max: function(){ return Math.max.apply(null, arguments); },
      $min: function(){ return Math.min.apply(null, arguments); },
      $itemIndex: idx || 0,
      $runIndex: 0,
      $workflow: { id: '1', name: 'Practice', active: false },
      $execution: { id: 'test', mode: 'test' },
      DateTime: DT || { now: function(){ return new MiniDate(new Date()); } }
    };
    var names = Object.keys(ctx), vals = names.map(function(k){ return ctx[k]; });
    function run(code){
      var f = new root.Function(names.join(','), '"use strict"; return (' + code + '\n);');
      return f.apply(null, vals);
    }
    var parts = [], re = /\{\{([\s\S]*?)\}\}/g, m, last = 0;
    while((m = re.exec(tpl))){
      parts.push({ text: tpl.slice(last, m.index) });
      parts.push({ code: m[1] });
      last = re.lastIndex;
    }
    parts.push({ text: tpl.slice(last) });
    var codes = parts.filter(function(p){ return p.code != null; });
    if(!codes.length) return tpl;
    if(codes.length === 1 && parts.every(function(p){ return p.code != null || !p.text.trim(); })) return run(codes[0].code);
    return parts.map(function(p){
      if(p.code == null) return p.text;
      var v = run(p.code);
      if(v === undefined || v === null) return '';
      if(typeof v === 'object' && !(v instanceof MiniDate) && !(DT && v instanceof DT)) return JSON.stringify(v);
      return String(v);
    }).join('');
  }
  root.LAB_EXPR = { evaluate: evaluate };
}
if(typeof window !== 'undefined') window.labExprInstall = labExprInstall;
