/* Journey engine: the 24-week plan shared by the n8n and English pages.
 * Week content lives in content/<track>/weeks/wNN.js and calls JOURNEY.week({...}).
 * Content strings are {ar, en} and are read through L(); UI strings use T(). */
(function(){
  var J = window.JOURNEY = window.JOURNEY || {};
  J.weeks = { english: {}, n8n: {} };

  J.L = function(x){
    if(x == null) return '';
    if(typeof x === 'string') return x;
    return x[window.LANG] || x.ar || x.en || '';
  };

  J.week = function(w){
    J.weeks[w.track][w.n] = w;
    if(J.onWeekLoaded) J.onWeekLoaded(w);
  };

  function best(attempts){
    var b = 0;
    (attempts || []).forEach(function(t){ if(t && t.total) b = Math.max(b, t.score / t.total); });
    return b;
  }
  function pad(n){ return (n < 10 ? '0' : '') + n; }

  J.rules = {
    PASS: 0.7,
    pad: pad,
    testId: function(n){ return 'w' + pad(n) + '-test'; },
    best: best,
    weekPassed: function(attempts){ return best(attempts) >= J.rules.PASS; },
    weekUnlocked: function(track, n, progress){
      if(n === 1) return true;
      var tests = (progress && progress.tests) || {};
      return J.rules.weekPassed(tests[J.rules.testId(n - 1)]);
    },
    // A study day is done when every practice task is checked and every quiz question answered.
    dayDone: function(day, done, answers){
      done = done || {}; answers = answers || {};
      var ok = true;
      (day.practice || []).forEach(function(_, i){ if(!done['p' + day.key + '_' + i]) ok = false; });
      (day.quiz || []).forEach(function(_, i){ if(answers['q' + day.key + '_' + i] == null) ok = false; });
      return ok;
    }
  };

  // Union of two progress objects: anything done anywhere stays done, all test attempts are kept.
  J.mergeProgress = function(a, b){
    a = a || {}; b = b || {};
    var out = { done: {}, answers: {}, tests: {}, updatedAt: Math.max(a.updatedAt || 0, b.updatedAt || 0) };
    [a, b].forEach(function(p){
      Object.keys(p.done || {}).forEach(function(k){ if(p.done[k]) out.done[k] = true; });
      Object.keys(p.answers || {}).forEach(function(k){ if(out.answers[k] == null) out.answers[k] = p.answers[k]; });
      Object.keys(p.tests || {}).forEach(function(k){
        var list = out.tests[k] || (out.tests[k] = []);
        (p.tests[k] || []).forEach(function(t){
          var dup = list.some(function(x){ return x.at === t.at && x.score === t.score && x.total === t.total; });
          if(!dup) list.push(t);
        });
      });
    });
    return out;
  };
})();
