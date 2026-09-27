/* Optional account: sign in with an email link or code (Supabase), then the journey progress and every
 * test attempt are kept online and merged across devices. Without an account (or offline) the
 * site keeps working from localStorage; sync retries when the connection comes back. */
(function(){
  var cfg = window.JOURNEY_SUPABASE || {};
  var links = document.querySelector('.topbar .links');
  if(!cfg.url || !cfg.anonKey || !window.supabase || !links) return;
  var J = window.JOURNEY;

  function T(s){ return window.T ? window.T(s) : s; }
  function TF(s, v){ return window.TF ? window.TF(s, v) : s; }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  var client = window.supabase.createClient(cfg.url, cfg.anonKey, {
    // "implicit" lets the email link open on a different device from the one that asked for it.
    auth: { flowType: 'implicit', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'journey-auth' }
  });
  var user = null, pendingEmail = '', status = 'idle', lastSync = 0, lastError = '';

  // ---------------- UI ----------------
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'acct-btn';
  links.insertBefore(btn, links.querySelector('.lang-btn'));
  var dlg = document.createElement('dialog');
  dlg.className = 'acct-dlg';
  dlg.setAttribute('aria-labelledby', 'acctTitle');
  document.body.appendChild(dlg);

  function renderBtn(){
    btn.innerHTML = '<span class="acct-dot ' + (user ? (status === 'error' ? 'err' : 'on') : '') + '" aria-hidden="true"></span>' + (user ? T('حسابي') : T('سجّل دخول'));
    btn.title = user ? TF('داخل بـ {e}', { e: user.email }) : T('احفظ تقدمك أونلاين');
  }
  function statusLine(){
    if(status === 'syncing') return T('بيزامن…');
    if(status === 'error') return T('مش قادرين نوصل للسيرفر دلوقتي. تقدمك محفوظ على الجهاز ده، وهنزامن تاني لما النت يرجع.');
    if(lastSync) return TF('آخر مزامنة: {t}', { t: new Date(lastSync).toLocaleTimeString(window.LANG === 'en' ? 'en-US' : 'ar-EG', { hour: '2-digit', minute: '2-digit' }) });
    return J && J.track() ? T('لسه ما زامنّاش.') : T('التقدم بيتزامن لما تفتح صفحة n8n أو الإنجليزي.');
  }
  function render(){
    renderBtn();
    var h = '<button type="button" class="acct-x" data-a="close" aria-label="' + esc(T('إغلاق')) + '">✕</button><h3 id="acctTitle">' + T('حسابك') + '</h3>';
    if(user){
      h += '<p>' + TF('داخل بـ {e}', { e: '<b>' + esc(user.email) + '</b>' }) + '</p>' +
        '<p class="acct-status" role="status">' + esc(statusLine()) + '</p>' +
        '<div class="acct-row"><button type="button" class="link-btn" data-a="sync">' + T('زامن دلوقتي') + '</button>' +
        '<button type="button" class="ghost-btn" data-a="out">' + T('اخرج') + '</button></div>' +
        '<p class="sub-note">' + T('لما تخرج، تقدمك بيفضل على الجهاز ده، ونسخته الأونلاين بتفضل محفوظة في حسابك.') + '</p>';
    }else if(pendingEmail){
      h += '<p>' + TF('بعتنا رابط دخول على {e}. افتح الإيميل ودوس على الرابط وهتدخل على طول. ولو الإيميل فيه كود أرقام، اكتبه هنا.', { e: '<b>' + esc(pendingEmail) + '</b>' }) + '</p>' +
        '<form data-f="code"><label for="acctCode">' + T('الكود (لو وصلك)') + '</label>' +
        '<input id="acctCode" class="acct-in mono" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6,10}" maxlength="10" required>' +
        '<div class="acct-row"><button type="submit" class="link-btn">' + T('ادخل') + '</button>' +
        '<button type="button" class="ghost-btn" data-a="back">' + T('غيّر الإيميل') + '</button></div></form>';
    }else{
      h += '<p>' + T('سجّل بالإيميل عشان تقدمك ونتايج اختباراتك تتحفظ أونلاين وتكمّل من أي جهاز. مفيش باسورد: هيوصلك رابط دخول على الإيميل.') + '</p>' +
        '<form data-f="email"><label for="acctEmail">' + T('الإيميل') + '</label>' +
        '<input id="acctEmail" class="acct-in" type="email" autocomplete="email" dir="ltr" required>' +
        '<div class="acct-row"><button type="submit" class="link-btn">' + T('ابعت رابط الدخول') + '</button></div></form>' +
        '<p class="sub-note">' + T('الحساب اختياري. من غيره تقدمك بيتحفظ في المتصفح بس.') + '</p>';
    }
    h += '<p class="acct-msg" role="alert">' + esc(lastError) + '</p>';
    dlg.innerHTML = h;
  }
  function open(){
    lastError = '';
    render();
    if(dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var f = dlg.querySelector('input'); if(f) f.focus();
  }
  function close(){ if(dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
  function fail(e){ lastError = T('حصلت مشكلة:') + ' ' + ((e && e.message) || e); render(); }

  btn.addEventListener('click', open);
  dlg.addEventListener('click', function(e){
    if(e.target === dlg){ close(); return; }
    var a = e.target.closest && e.target.closest('[data-a]');
    if(!a) return;
    var act = a.getAttribute('data-a');
    if(act === 'close') close();
    if(act === 'back'){ pendingEmail = ''; lastError = ''; render(); }
    if(act === 'sync') syncNow();
    if(act === 'out') client.auth.signOut().then(function(){ user = null; lastSync = 0; status = 'idle'; render(); }, fail);
  });
  dlg.addEventListener('submit', function(e){
    e.preventDefault();
    var f = e.target.getAttribute('data-f');
    lastError = '';
    if(f === 'email'){
      var email = dlg.querySelector('#acctEmail').value.trim();
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ lastError = T('اكتب إيميل صحيح.'); render(); return; }
      client.auth.signInWithOtp({ email: email, options: { emailRedirectTo: location.href.split('#')[0] } }).then(function(r){
        if(r.error) return fail(r.error);
        pendingEmail = email; render();
        var c = dlg.querySelector('#acctCode'); if(c) c.focus();
      }, fail);
    }
    if(f === 'code'){
      var code = dlg.querySelector('#acctCode').value.replace(/\D/g, '');
      client.auth.verifyOtp({ email: pendingEmail, token: code, type: 'email' }).then(function(r){
        if(r.error){ lastError = T('الكود مش صح أو خلص وقته. جرّب تاني أو اطلب كود جديد.'); render(); return; }
        pendingEmail = '';
      }, fail);
    }
  });

  // ---------------- sync ----------------
  function canon(o){
    if(Array.isArray(o)) return '[' + o.map(canon).join(',') + ']';
    if(o && typeof o === 'object') return '{' + Object.keys(o).filter(function(k){ return k !== 'updatedAt'; }).sort().map(function(k){ return JSON.stringify(k) + ':' + canon(o[k]); }).join(',') + '}';
    return JSON.stringify(o);
  }
  var LOG_KEY = function(){ return 'journey_logged_' + user.id; };
  function loggedSet(){ try{ return JSON.parse(localStorage.getItem(LOG_KEY())) || {}; }catch(e){ return {}; } }
  // Every attempt in the progress also goes to the test_attempts log, once.
  function uploadAttempts(track, progress){
    var logged = loggedSet(), rows = [], ids = [];
    Object.keys(progress.tests || {}).forEach(function(testId){
      (progress.tests[testId] || []).forEach(function(t){
        var id = track + ':' + testId + ':' + t.at;
        if(logged[id] || !t.total) return;
        ids.push(id);
        rows.push({ user_id: user.id, track: track, test_id: testId, score: t.score, total: t.total, answers: t.answers || [], taken_at: new Date(t.at).toISOString() });
      });
    });
    if(!rows.length) return Promise.resolve();
    return client.from('test_attempts').upsert(rows, { onConflict: 'user_id,track,test_id,taken_at', ignoreDuplicates: true }).then(function(r){
      if(r.error) throw r.error;
      ids.forEach(function(id){ logged[id] = 1; });
      try{ localStorage.setItem(LOG_KEY(), JSON.stringify(logged)); }catch(e){}
    });
  }
  var busy = false, again = false, timer = null;
  function syncNow(){
    if(!user || !J || !J.track()) { render(); return; }
    if(busy){ again = true; return; }
    busy = true; status = 'syncing'; render();
    var track = J.track(), local = J.getProgress();
    client.from('progress').select('data').eq('track', track).maybeSingle().then(function(r){
      if(r.error) throw r.error;
      var cloud = r.data ? r.data.data : null;
      var merged = J.mergeProgress(local, cloud);
      if(canon(merged) !== canon(J.getProgress())) J.setProgress(merged);
      var push = !cloud || canon(merged) !== canon(cloud)
        ? client.from('progress').upsert({ user_id: user.id, track: track, data: merged, updated_at: new Date().toISOString() }).then(function(u){ if(u.error) throw u.error; })
        : Promise.resolve();
      return push.then(function(){ return uploadAttempts(track, merged); });
    }).then(function(){
      status = 'ok'; lastSync = Date.now(); lastError = '';
    }, function(e){
      status = 'error';
      if(e && e.message && navigator.onLine !== false) lastError = T('حصلت مشكلة:') + ' ' + e.message;
    }).then(function(){
      busy = false;
      if(dlg.open) render(); else renderBtn();
      if(again){ again = false; schedule(1000); }
    });
  }
  function schedule(ms){
    clearTimeout(timer);
    timer = setTimeout(syncNow, ms);
  }
  document.addEventListener('journey:change', function(){ if(user) schedule(2000); });
  document.addEventListener('journey:attempt', function(){ if(user) schedule(300); });
  window.addEventListener('online', function(){ if(user) schedule(500); });
  document.addEventListener('visibilitychange', function(){ if(user && document.visibilityState === 'visible') schedule(500); });

  client.auth.onAuthStateChange(function(event, session){
    var was = user && user.id;
    user = session ? session.user : null;
    if(user && user.id !== was){
      if(dlg.open) render(); else renderBtn();
      schedule(50);
    }
    if(!user) renderBtn();
  });
  renderBtn();
})();
