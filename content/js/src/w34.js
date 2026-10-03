// JavaScript week 34 — auth and API security: JWT and OAuth.
// The building blocks run with node:crypto; real projects should use vetted libraries (jose, oslo, Auth.js…).
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const S = { lang: 'js' };
const T = { lang: 'text' };
const N = (files, more) => Object.assign(files ? { node: 1, files } : { node: 1 }, more || {});
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => Array.isArray(x) ? B(x[0], x[1]) : x), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('الصلاحيات والأمان في الـ APIs: JWT وOAuth', 'Auth and API security: JWT and OAuth'),
  goal: B('تحمي تطبيقاتك وأدواتك: الفرق بين «مين انت» و«مسموحلك بإيه»، كلمات السر المشفّرة والحماية من التخمين، الجلسات والكوكيز الآمنة، JWT بحدوده، OAuth 2.0 وPKCE وتسجيل الدخول بـ Google، والصلاحيات بالأدوار وملكية البيانات — من غير ما تخترع تشفير.',
          'Protect your apps and tools: the difference between «who you are» and «what you may do», hashed passwords and brute-force protection, safe sessions and cookies, JWT and its limits, OAuth 2.0, PKCE and «sign in with Google», and role-based permissions and data ownership — without inventing cryptography.'),
  days: [
    { title: B('كلمات السر والتخمين', 'Passwords and guessing'),
      goal: B('تخزّن كلمات السر صح وتوقف المخمّنين.', 'Store passwords correctly and stop guessers.'),
      learn: [
        L(B('authentication وauthorization', 'Authentication and authorization'),
          B('**authentication** = «انت مين؟» (كلمة سر، Google، مفتاح API). **authorization** = «مسموحلك تعمل إيه؟» (أدوار، ملكية). خطأين مختلفين: 401 (مش متعرّف عليك) و403 (متعرّف عليك بس ممنوع). وأغلب الاختراقات الحقيقية بتيجي من صلاحيات ناقصة مش تشفير مكسور.', '**authentication** = «who are you?» (a password, Google, an API key). **authorization** = «what may you do?» (roles, ownership). Two different errors: 401 (not identified) and 403 (identified but forbidden). Most real breaches come from missing permission checks, not broken cryptography.'),
          'request ─▶ authentication: who is this?      ✗ → 401 Unauthorized\n         ─▶ authorization: may they do this?   ✗ → 403 Forbidden\n         ─▶ validation: is the data correct?    ✗ → 422\n         ─▶ handler', T),
        L(B('تشفير كلمات السر', 'Hashing passwords'),
          B('**password hashing** بخوارزمية بطيئة عمدًا (**scrypt** مدمج في Node، أو **argon2** و**bcrypt**) مع salt عشوائي — زي ما شفنا في بايثون. لو القاعدة اتسربت، كل كلمة سر محتاجة سنين تخمين. والمقارنة بـ timingSafeEqual. ومتحطش حد أقصى قصير للطول، وشجّع على عبارات طويلة.', '**password hashing** with a deliberately slow algorithm (**scrypt**, built into Node, or **argon2** and **bcrypt**) and a random salt — as we saw in Python. If the database leaks, each password needs years of guessing. Compare with timingSafeEqual. Do not cap length short, and encourage long passphrases.'),
          'import { scrypt, randomBytes, timingSafeEqual } from "node:crypto";\nimport { promisify } from "node:util";\nconst scryptAsync = promisify(scrypt);\nconst PARAMS = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };\n\nasync function hashPassword(password) {\n  const salt = randomBytes(16);\n  const key = await scryptAsync(password.normalize("NFKC"), salt, 32, PARAMS);\n  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;\n}\nasync function verifyPassword(password, stored) {\n  const [, saltB64, keyB64] = stored.split("$");\n  const key = await scryptAsync(password.normalize("NFKC"), Buffer.from(saltB64, "base64"), 32, PARAMS);\n  return timingSafeEqual(key, Buffer.from(keyB64, "base64"));\n}\nconst stored = await hashPassword("correct horse battery staple");\nconsole.log(stored.slice(0, 32) + "…");\nconsole.log(await verifyPassword("correct horse battery staple", stored), await verifyPassword("wrong", stored));\nconsole.log("same password, different hash:", stored !== (await hashPassword("correct horse battery staple")));', N()),
        L(B('ضد التخمين', 'Against guessing'),
          B('**brute force**: حد بيجرّب آلاف كلمات السر. الحل: **rate limit** لكل حساب ولكل IP على تسجيل الدخول — مثلًا token bucket: 5 محاولات وبعدين محاولة كل دقيقة. ورسالة خطأ واحدة («البريد أو كلمة السر غلط») عشان ميعرفش الحساب موجود ولا لأ. وأقوى حماية: **mfa** (كود من تطبيق).', '**brute force**: someone tries thousands of passwords. The fix: a **rate limit** per account and per IP on login — say a token bucket: 5 attempts, then one per minute. One error message («email or password is wrong») so they cannot tell whether the account exists. The strongest protection: **mfa** (a code from an app).'),
          'function tokenBucket({ capacity, refillPerMs }) {\n  const buckets = new Map();\n  return (key, now = Date.now()) => {\n    const b = buckets.get(key) ?? { tokens: capacity, at: now };\n    b.tokens = Math.min(capacity, b.tokens + (now - b.at) * refillPerMs);\n    b.at = now;\n    const ok = b.tokens >= 1;\n    if (ok) b.tokens -= 1;\n    buckets.set(key, b);\n    return ok;\n  };\n}\nconst allowLogin = tokenBucket({ capacity: 5, refillPerMs: 1 / 60_000 });   // 5 tries, then 1 per minute\nlet t = 0;\nconst results = [];\nfor (let i = 1; i <= 8; i++) results.push(allowLogin("sara@example.com|203.0.113.7", t += 1000) ? "✓" : "429");\nconsole.log("8 quick attempts:", results.join(" "));\nconsole.log("after 2 minutes:", allowLogin("sara@example.com|203.0.113.7", t + 120_000) ? "✓ allowed again" : "still blocked");', N())
      ],
      practice: [
        B('شغّل مثال scrypt وقِس الوقت.', 'Run the scrypt example and time it.'),
        B('اعمل endpoint تسجيل دخول برسالة خطأ واحدة.', 'Write a login endpoint with one error message.'),
        B('ضيف token bucket لتسجيل الدخول.', 'Add a token bucket to login.'),
        B('فعّل MFA على حساباتك المهمة (GitHub، Google، n8n).', 'Turn on MFA for your key accounts (GitHub, Google, n8n).')
      ],
      words: [
        W('authentication', 'التحقق من هوية المستخدم', 'checking who the user is', 'Authentication failed: 401.'),
        W('authorization', 'التحقق من المسموح للمستخدم', 'checking what the user may do', 'Authorization failed: 403.'),
        W('password hashing', 'تحويل كلمة السر لبصمة بطيئة', 'turning a password into a slow fingerprint', 'Password hashing protects leaked data.'),
        W('scrypt', 'خوارزمية تشفير كلمات سر مدمجة في Node', 'a password-hashing algorithm built into Node', 'scrypt is in node:crypto.'),
        W('argon2', 'خوارزمية حديثة لكلمات السر', 'a modern password-hashing algorithm', 'OWASP recommends Argon2id.'),
        W('brute force', 'تجربة كلمات سر كتير', 'trying many passwords', 'Rate limits stop brute force.'),
        W('rate limit', 'حد عدد المحاولات في مدة', 'a cap on attempts per time', 'Login has a rate limit of 5.'),
        W('mfa', 'تحقق بعامل إضافي', 'multi-factor authentication', 'MFA stops stolen passwords.')
      ],
      read: [{ t: 'OWASP: Password Storage Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html', what: B('اقرا Argon2id وscrypt.', 'Read Argon2id and scrypt.') }, { t: 'OWASP: Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html', what: B('اقرا Login Throttling وError messages.', 'Read Login Throttling and Error messages.') }],
      challenge: B('ضيف لـ «بوابة الطلبات» مستخدمين: تسجيل بكلمة سر بـ scrypt (أو argon2)، تسجيل دخول برسالة خطأ واحدة، token bucket لكل حساب وIP، وجدول users بقيد UNIQUE على البريد — مع اختبارات.', 'Add users to the «orders gateway»: sign-up with scrypt (or argon2) hashing, login with one error message, a token bucket per account and IP, and a users table with a UNIQUE email — with tests.'),
      quiz: [
        Q(B('متعرّف عليك بس مش مسموحلك:', 'Identified but not allowed:'), ['403', '401', '404'], 0, B('authorization.', 'Authorization.')),
        Q(B('كلمة السر تتخزن:', 'A password is stored:'), [['scrypt/argon2 بـ salt', 'scrypt/argon2 with a salt'], ['SHA-256 بس', 'plain SHA-256'], ['نص', 'as text']], 0, B('بطيء عمدًا.', 'Slow on purpose.')),
        Q(B('رسالة خطأ تسجيل الدخول:', 'The login error message:'), [['واحدة للحالتين', 'one for both cases'], ['«البريد مش موجود»', '«email not found»'], ['تفاصيل كاملة', 'full details']], 0, B('مايكشفش الحسابات.', 'Reveals no accounts.'))
      ] },

    { title: B('الجلسات والكوكيز', 'Sessions and cookies'),
      goal: B('تحافظ على تسجيل الدخول بأمان في المتصفح.', 'Keep users signed in safely in the browser.'),
      learn: [
        L(B('session cookie', 'The session cookie'),
          B('**session**: بعد تسجيل الدخول السيرفر بيعمل id عشوائي طويل، يخزّن بيانات الجلسة عنده، ويبعت الـ id في **session cookie**. أهم خصائص الكوكي: **httponly** (JS مش شايفه — XSS ميسرقوش)، **secure cookie** (HTTPS بس)، **samesite** (`Lax` أو `Strict` — بيقلل CSRF)، و`Max-Age`.', 'A **session**: after login the server creates a long random id, stores the session data itself, and sends the id in a **session cookie**. The cookie’s key attributes: **httponly** (invisible to JS — XSS cannot steal it), **secure cookie** (HTTPS only), **samesite** (`Lax` or `Strict` — reduces CSRF), and `Max-Age`.'),
          'import { randomBytes } from "node:crypto";\nconst sessions = new Map();                  // in production: Redis or a database table\nfunction createSession(userId) {\n  const id = randomBytes(32).toString("base64url");\n  sessions.set(id, { userId, createdAt: Date.now() });\n  return [\n    `sid=${id}`,\n    "HttpOnly",                                // not readable by JS\n    "Secure",                                  // HTTPS only\n    "SameSite=Lax",                            // not sent on cross-site POSTs\n    "Path=/",\n    `Max-Age=${60 * 60 * 8}`,                  // 8 hours\n  ].join("; ");\n}\nfunction readSession(cookieHeader = "") {\n  const sid = Object.fromEntries(cookieHeader.split(/;\\s*/).filter(Boolean).map(p => p.split("="))).sid;\n  return sid ? sessions.get(sid) ?? null : null;\n}\nconst setCookie = createSession(7);\nconsole.log("Set-Cookie:", setCookie.replace(/sid=[^;]+/, "sid=<random>"));\nconsole.log("next request →", readSession(`theme=dark; ${setCookie.split(";")[0]}`));\nconsole.log("forged id →", readSession("sid=guess123"));', N()),
        L(B('تسجيل الخروج والانتهاء', 'Logout and expiry'),
          B('ميزة الجلسة على السيرفر: تقدر **تلغيها فورًا** (logout، تغيير كلمة السر، جهاز مسروق) — امسح الـ id من المخزن. واعمل id جديد بعد تسجيل الدخول (ضد session fixation)، وانتهاء بعد خمول، وصفحة «الأجهزة المسجلة».', 'The advantage of server-side sessions: you can **revoke them instantly** (logout, a password change, a stolen device) — delete the id from the store. Issue a new id after login (against session fixation), expire after inactivity, and offer a «signed-in devices» page.'),
          'app.post("/logout", (req, res) => {\n  sessions.delete(req.sessionId);\n  res.setHeader("Set-Cookie", "sid=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0");\n  res.status(204).end();\n});\napp.post("/password", requireUser, async (req, res) => {\n  await users.updatePassword(req.user.id, await hashPassword(req.body.newPassword));\n  for (const [id, s] of sessions) if (s.userId === req.user.id) sessions.delete(id);   // sign out everywhere\n  res.json({ ok: true, message: "Password changed; please sign in again." });\n});', S),
        L(B('CSRF', 'CSRF'),
          B('**csrf**: موقع شرير بيخلّي متصفحك يبعت POST لموقعك — والكوكي بتاعك بيتبعت معاه لوحده! SameSite=Lax بيمنع أغلب الحالات. ولحماية كاملة: **csrf token** عشوائي في الفورم بيتقارن بالجلسة، أو تأكد من header `Origin`. الـ APIs اللي بتاخد توكن في Authorization header مش معرّضة بنفس الشكل.', '**csrf**: an evil site makes your browser send a POST to your site — and your cookie goes along automatically! SameSite=Lax blocks most cases. For full protection: a random **csrf token** in the form compared with the session, or check the `Origin` header. APIs taking a token in the Authorization header are not exposed the same way.'),
          'function checkOrigin(req, allowed = ["https://shop.example.com"]) {\n  const origin = req.headers.origin ?? new URL(req.headers.referer ?? "null:").origin;\n  return allowed.includes(origin);\n}\nfor (const headers of [{ origin: "https://shop.example.com" }, { origin: "https://evil.example" }, { referer: "https://shop.example.com/cart" }, {}])\n  console.log(JSON.stringify(headers).padEnd(46), checkOrigin({ headers }) ? "✓ allow POST" : "✗ 403 (possible CSRF)");', N())
      ],
      practice: [
        B('اعمل login بيدّي session cookie بالخصائص الأربعة.', 'Build a login issuing a session cookie with the four attributes.'),
        B('افتح DevTools ← Application ← Cookies واتأكد من HttpOnly.', 'Open DevTools → Application → Cookies and check HttpOnly.'),
        B('اعمل «اخرج من كل الأجهزة».', 'Build «sign out everywhere».'),
        B('ضيف فحص Origin لكل POST.', 'Add an Origin check to every POST.')
      ],
      words: [
        W('session', 'حالة تسجيل الدخول على السيرفر', 'the signed-in state kept on the server', 'The session lasts 8 hours.'),
        W('session cookie', 'كوكي فيه id الجلسة', 'a cookie carrying the session id', 'The session cookie is HttpOnly.'),
        W('httponly', 'كوكي JS مش شايفه', 'a cookie hidden from JS', 'HttpOnly stops XSS theft.'),
        W('secure cookie', 'كوكي بيتبعت على HTTPS بس', 'a cookie sent over HTTPS only', 'Mark it as a secure cookie.'),
        W('samesite', 'خاصية بتتحكم في إرسال الكوكي بين المواقع', 'an attribute controlling cross-site cookie sending', 'SameSite=Lax blocks most CSRF.'),
        W('csrf', 'هجوم بيبعت طلبات باسمك من موقع تاني', 'an attack sending requests as you from another site', 'Check Origin against CSRF.'),
        W('csrf token', 'قيمة عشوائية بتثبت إن الفورم منك', 'a random value proving the form is yours', 'Every form carries a CSRF token.')
      ],
      read: [{ t: 'OWASP: Session Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html', what: B('اقرا Cookies.', 'Read Cookies.') }, { t: 'MDN: Using HTTP cookies', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies', what: B('اقرا Security.', 'Read Security.') }],
      challenge: B('اعمل تسجيل دخول بجلسات للوحة المتجر: كوكي HttpOnly/Secure/SameSite، id جديد بعد الدخول، انتهاء بعد ساعتين خمول، logout، «اخرج من كل الأجهزة»، وفحص Origin — مع اختبارات integration.', 'Build session login for the shop dashboard: an HttpOnly/Secure/SameSite cookie, a new id after login, expiry after two idle hours, logout, «sign out everywhere», and an Origin check — with integration tests.'),
      quiz: [
        Q(B('كوكي الجلسة لازم:', 'A session cookie must be:'), ['HttpOnly; Secure; SameSite', B('مقروء من JS', 'readable from JS'), B('في localStorage', 'in localStorage')], 0, B('ضد السرقة.', 'Against theft.')),
        Q(B('ميزة الجلسة على السيرفر:', 'The advantage of server sessions:'), [['تتلغي فورًا', 'they can be revoked at once'], ['أسرع دايمًا', 'always faster'], ['مفيش كوكيز', 'no cookies']], 0, B('revocation.', 'Revocation.')),
        Q(B('POST من موقع شرير بكوكيك:', 'A POST from an evil site with your cookie:'), ['CSRF', 'XSS', 'SQL injection'], 0, B('SameSite + Origin.', 'SameSite + Origin.'))
      ] },

    { title: B('JWT بحدوده', 'JWT and its limits'),
      goal: B('تستخدم JWT صح وتعرف إمتى متستخدموش.', 'Use JWT correctly and know when not to.'),
      learn: [
        L(B('الشكل والتوقيع', 'Shape and signature'),
          B('**jwt** = header.payload.signature بـ base64url، والتوقيع (HS256 بسر، أو RS256/EdDSA بمفتاح خاص) بيثبت إن الـ payload متعدلش. مش مشفّر — أي حد يقراه! والقواعد: تحقق من التوقيع **والخوارزمية** و`exp` و`iss` و`aud`. الكود ده بيبني ويتحقق بـ node:crypto:', 'A **jwt** = header.payload.signature in base64url, and the signature (HS256 with a secret, or RS256/EdDSA with a private key) proves the payload was not changed. It is not encrypted — anyone can read it! The rules: verify the signature **and the algorithm**, `exp`, `iss` and `aud`. This code builds and verifies one with node:crypto:'),
          'import { createHmac, timingSafeEqual } from "node:crypto";\nconst b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");\nconst SECRET = "demo-only-use-a-32+-byte-random-secret";\n\nfunction sign(payload, ttlSec = 900) {\n  const now = Math.floor(Date.now() / 1000);\n  const head = b64({ alg: "HS256", typ: "JWT" }), body = b64({ ...payload, iat: now, exp: now + ttlSec, iss: "orders-gateway", aud: "dashboard" });\n  return `${head}.${body}.${createHmac("sha256", SECRET).update(`${head}.${body}`).digest("base64url")}`;\n}\nfunction verify(token) {\n  const [head, body, sig] = token.split(".");\n  if (JSON.parse(Buffer.from(head, "base64url")).alg !== "HS256") return { ok: false, why: "unexpected alg" };\n  const good = Buffer.from(createHmac("sha256", SECRET).update(`${head}.${body}`).digest("base64url"));\n  if (good.length !== Buffer.from(sig).length || !timingSafeEqual(good, Buffer.from(sig))) return { ok: false, why: "bad signature" };\n  const claims = JSON.parse(Buffer.from(body, "base64url"));\n  if (claims.exp < Date.now() / 1000) return { ok: false, why: "expired" };\n  if (claims.iss !== "orders-gateway" || claims.aud !== "dashboard") return { ok: false, why: "wrong issuer/audience" };\n  return { ok: true, claims };\n}\nconst token = sign({ sub: "user-7", role: "manager" });\nconsole.log(verify(token).claims.role, "| readable by anyone:", JSON.parse(Buffer.from(token.split(".")[1], "base64url")).sub);\nconst tampered = token.split(".").map((p, i) => (i === 1 ? b64({ sub: "user-7", role: "admin", exp: 9e9, iss: "orders-gateway", aud: "dashboard" }) : p)).join(".");\nconsole.log("tampered →", verify(tampered).why);\nconst none = [b64({ alg: "none" }), token.split(".")[1], ""].join(".");\nconsole.log("alg none →", verify(none).why);\nconsole.log("expired →", verify(sign({ sub: "user-7" }, -10)).why);', N()),
        L(B('access وrefresh', 'Access and refresh'),
          B('**access token** قصير (5–15 دقيقة) بيتبعت مع كل طلب؛ و**refresh token** طويل، بيتخزّن في كوكي HttpOnly، ومتسجّل في القاعدة عشان تقدر تلغيه، وبيتغير مع كل استخدام (rotation). **token expiry** القصير هو اللي بيعوّض إن JWT مبيتلغيش بسهولة.', 'An **access token** is short (5–15 minutes) and sent with each request; a **refresh token** is long, kept in an HttpOnly cookie, recorded in the database so you can revoke it, and replaced on each use (rotation). A short **token expiry** is what compensates for JWT being hard to revoke.'),
          'POST /login         → { accessToken (15 min) } + Set-Cookie: refresh=<random>; HttpOnly; Secure; SameSite=Strict; Path=/auth\nGET  /api/orders    Authorization: Bearer <accessToken>\n     401 expired    → POST /auth/refresh (cookie sent automatically)\n                    → server checks the refresh token in the DB, revokes it, issues a new pair\nPOST /logout        → delete the refresh token row → nothing can be refreshed any more', T),
        L(B('JWT ولا جلسة؟', 'JWT or a session?'),
          B('لتطبيق ويب عادي بسيرفر واحد: الجلسة (أمس) أبسط وأأمن (إلغاء فوري). JWT مفيد لما خدمات كتير محتاجة تتحقق من غير ما تسأل قاعدة واحدة، أو للـ APIs بين أنظمة. ومتخزّنش توكنات حساسة في localStorage (أي XSS ياخدها). واستخدم مكتبة مجرّبة (`jose`) مش كودك.', 'For an ordinary web app with one server: sessions (yesterday) are simpler and safer (instant revocation). JWT helps when many services must verify without asking one database, or for system-to-system APIs. Do not keep sensitive tokens in localStorage (any XSS takes them). And use a vetted library (`jose`), not your own code.'),
          'import { SignJWT, jwtVerify } from "jose";\nconst key = new TextEncoder().encode(process.env.JWT_SECRET);        // ≥ 32 random bytes\n\nexport const issue = sub => new SignJWT({ role: "manager" })\n  .setProtectedHeader({ alg: "HS256" }).setSubject(sub)\n  .setIssuer("orders-gateway").setAudience("dashboard").setIssuedAt().setExpirationTime("15m")\n  .sign(key);\n\nexport const check = token => jwtVerify(token, key, { algorithms: ["HS256"], issuer: "orders-gateway", audience: "dashboard" });', S)
      ],
      practice: [
        B('شغّل مثال JWT وفك الـ payload بـ jwt.io.', 'Run the JWT example and decode the payload at jwt.io.'),
        B('جرّب تعدّل الـ role وشوف التوقيع بيرفض.', 'Try changing the role and watch the signature reject it.'),
        B('اعمل access + refresh بـ rotation.', 'Build access + refresh tokens with rotation.'),
        B('اكتب جملتين: جلسة ولا JWT لمشروعك وليه.', 'Write two sentences: session or JWT for your project, and why.')
      ],
      words: [
        W('jwt', 'توكن موقّع فيه بيانات مقروءة', 'a signed token with readable data', 'The JWT carries the user id.'),
        W('access token', 'توكن قصير العمر للطلبات', 'a short-lived token for requests', 'The access token expires in 15 minutes.'),
        W('refresh token', 'توكن طويل لتجديد الـ access', 'a long-lived token for renewing access', 'Store the refresh token in an HttpOnly cookie.'),
        W('token expiry', 'وقت انتهاء التوكن', 'when a token stops being valid', 'Short token expiry limits damage.'),
        W('claims', 'البيانات جوه الـ JWT', 'the data inside a JWT', 'Check the exp and aud claims.'),
        W('token rotation', 'استبدال التوكن مع كل استخدام', 'replacing a token on each use', 'Token rotation exposes stolen refresh tokens.')
      ],
      read: [{ lib: 'JWT introduction', what: B('اقرا When should you use JSON Web Tokens?', 'Read When should you use JSON Web Tokens?') }, { t: 'jose', url: 'https://github.com/panva/jose', what: B('اقرا jwtVerify.', 'Read jwtVerify.') }],
      challenge: B('ضيف لـ API بتاعك access/refresh بـ jose: refresh في كوكي HttpOnly ومتسجّل في القاعدة بـ rotation، logout بيلغيه، وmiddleware بيتحقق من alg وiss وaud وexp — واختبر 6 حالات (سليم، منتهي، متلاعب، alg none، refresh ملغي، refresh مستخدم مرتين).', 'Add access/refresh to your API with jose: refresh in an HttpOnly cookie, stored in the database with rotation, revoked on logout, and middleware checking alg, iss, aud and exp — testing 6 cases (valid, expired, tampered, alg none, revoked refresh, refresh used twice).'),
      quiz: [
        Q(B('payload الـ JWT:', 'A JWT payload is:'), [['مقروء لأي حد', 'readable by anyone'], ['مشفّر', 'encrypted'], ['سري', 'secret']], 0, B('موقّع بس.', 'Only signed.')),
        Q(B('توكن بـ alg: none:', 'A token with alg: none:'), [['ارفضه', 'reject it'], ['اقبله', 'accept it'], ['اقبله لو exp صح', 'accept if exp is fine']], 0, B('ثبّت الخوارزمية.', 'Pin the algorithm.')),
        Q(B('مكان refresh token في المتصفح:', 'Where a refresh token lives in the browser:'), [['كوكي HttpOnly', 'an HttpOnly cookie'], ['localStorage', 'localStorage'], ['URL', 'the URL']], 0, B('XSS.', 'XSS.'))
      ] },

    { title: B('OAuth 2.0 وتسجيل الدخول بـ Google', 'OAuth 2.0 and signing in with Google'),
      goal: B('تفهم OAuth وتستخدمه للدخول وللوصول للـ APIs.', 'Understand OAuth and use it for login and API access.'),
      learn: [
        L(B('الفكرة', 'The idea'),
          B('**oauth 2.0** = المستخدم يدّي تطبيقك صلاحية محدودة على حسابه في خدمة تانية (Google Sheets، Shopify، HubSpot) **من غير** ما يدّيك كلمة سره. التطبيق ياخد توكن بـ **scopes** محددة. و**openid connect** طبقة فوقه لـ «سجّل دخول بـ Google» (بيرجّع id_token فيه مين المستخدم). وده نفس اللي بيحصل لما تعمل credential في n8n.', '**oauth 2.0** = a user grants your app limited access to their account on another service (Google Sheets, Shopify, HubSpot) **without** giving you their password. The app receives a token with specific **scopes**. **openid connect** is a layer on top for «sign in with Google» (returning an id_token saying who the user is). It is exactly what happens when you create a credential in n8n.'),
          '1. your app → redirect to Google: client_id, redirect_uri, scope=openid email, state, code_challenge\n2. user signs in at Google and approves the scopes\n3. Google → redirect back to your redirect_uri?code=…&state=…\n4. your server → POST code + code_verifier (+ client secret) to Google’s token endpoint\n5. Google → access_token (+ refresh_token, + id_token for OpenID Connect)\n6. your server → calls the API with Authorization: Bearer <access_token>', T),
        L(B('PKCE وstate', 'PKCE and state'),
          B('**authorization code** flow مع **pkce**: قبل التحويل بتعمل `code_verifier` عشوائي وتبعت بصمته (`code_challenge`)؛ وعند تبديل الـ code بتبعت الأصل — فلو حد سرق الـ code ميقدرش يستخدمه. و`state` عشوائي بتقارنه لما ترجع (ضد CSRF). الكود ده بيولّدهم بـ node:crypto:', 'The **authorization code** flow with **pkce**: before redirecting you create a random `code_verifier` and send its fingerprint (`code_challenge`); when exchanging the code you send the original — so a stolen code is useless. And a random `state` you compare on return (against CSRF). This code generates them with node:crypto:'),
          'import { randomBytes, createHash } from "node:crypto";\nconst verifier = randomBytes(32).toString("base64url");                       // keep it in the session\nconst challenge = createHash("sha256").update(verifier).digest("base64url");\nconst state = randomBytes(16).toString("base64url");                         // keep it in the session too\n\nconst url = new URL("https://accounts.google.com/o/oauth2/v2/auth");\nurl.search = new URLSearchParams({\n  client_id: "1234-example.apps.googleusercontent.com",\n  redirect_uri: "https://shop.example.com/auth/callback",\n  response_type: "code",\n  scope: "openid email profile",\n  state,\n  code_challenge: challenge,\n  code_challenge_method: "S256",\n});\nconsole.log("verifier length:", verifier.length, "| challenge:", challenge.slice(0, 12) + "…");\nconsole.log(url.href.replace(/(state|code_challenge)=[^&]+/g, "$1=…"));\n// callback: if (query.state !== session.state) → 403; then exchange code + verifier for tokens', N()),
        L(B('الأمان في OAuth', 'Safety in OAuth'),
          B('**redirect uri** لازم يتسجّل بالظبط عند المزوّد (مش wildcard). **client secret** في السيرفر بس (أبدًا في المتصفح أو التطبيق). اطلب أقل scopes. اتحقق من الـ id_token (التوقيع، aud = client_id، iss، exp، nonce). وخزّن refresh tokens بتوع المستخدمين مشفّرة في القاعدة. والأسهل والأأمن غالبًا: مكتبة (Auth.js، Arctic) أو خدمة (Supabase Auth، Clerk).', 'The **redirect uri** must be registered exactly with the provider (no wildcards). The **client secret** stays on the server only (never in a browser or app). Ask for the fewest scopes. Verify the id_token (signature, aud = client_id, iss, exp, nonce). Store users’ refresh tokens encrypted in the database. And the easiest and safest is usually a library (Auth.js, Arctic) or a service (Supabase Auth, Clerk).'),
          '✓ redirect_uri registered exactly: https://shop.example.com/auth/callback\n✓ client secret only in server env (never in front-end code or Git)\n✓ PKCE (S256) + state + nonce, all checked on return\n✓ scopes: openid email   (not drive, not gmail, unless the feature needs it)\n✓ id_token verified with the provider’s keys (aud, iss, exp, nonce)\n✓ stored refresh tokens encrypted at rest; revoked on account deletion', T)
      ],
      practice: [
        B('اعمل OAuth client في Google Cloud لـ localhost.', 'Create an OAuth client in Google Cloud for localhost.'),
        B('شغّل مثال PKCE وافهم كل parameter.', 'Run the PKCE example and understand each parameter.'),
        B('اعمل callback بيقارن state ويبدّل الـ code.', 'Build a callback comparing state and exchanging the code.'),
        B('افتح credential OAuth في n8n واعرف الخطوات دي فين.', 'Open an OAuth credential in n8n and find these steps.')
      ],
      words: [
        W('oauth 2.0', 'إطار لمنح صلاحية محدودة من غير كلمة السر', 'a framework granting limited access without the password', 'n8n uses OAuth 2.0 for Google.'),
        W('authorization code', 'كود مؤقت بيتبدّل بتوكن', 'a temporary code exchanged for a token', 'Exchange the authorization code on the server.'),
        W('pkce', 'حماية الـ code بـ verifier وchallenge', 'protecting the code with a verifier and challenge', 'PKCE makes a stolen code useless.'),
        W('openid connect', 'طبقة تسجيل دخول فوق OAuth', 'a sign-in layer on top of OAuth', 'OpenID Connect returns an id_token.'),
        W('client secret', 'سر التطبيق عند المزوّد', 'the app’s secret with the provider', 'Keep the client secret on the server.'),
        W('redirect uri', 'الرابط اللي المزوّد بيرجع عليه', 'the URL the provider sends users back to', 'Register the redirect URI exactly.'),
        W('id token', 'توكن فيه هوية المستخدم من OIDC', 'a token with the user’s identity from OIDC', 'Verify the id token’s audience.')
      ],
      read: [{ lib: 'OAuth 2.0 simplified', what: B('اقرا Authorization Code Flow with PKCE.', 'Read Authorization Code Flow with PKCE.') }, { t: 'Google: OpenID Connect', url: 'https://developers.google.com/identity/openid-connect/openid-connect', what: B('اقرا Authenticating the user.', 'Read Authenticating the user.') }],
      challenge: B('ضيف «سجّل دخول بـ Google» للوحة المتجر بمكتبة (Arctic أو Auth.js): PKCE وstate وnonce، scopes openid email بس، قايمة إيميلات مسموحة، وجلسة HttpOnly بعدها — وماتخزّنش أي توكن Google لو مش محتاجه.', 'Add «sign in with Google» to the shop dashboard with a library (Arctic or Auth.js): PKCE, state and nonce, only openid email scopes, an allow-list of emails, and an HttpOnly session afterwards — and store no Google token you do not need.'),
      quiz: [
        Q(B('OAuth بيدّي تطبيقك:', 'OAuth gives your app:'), [['توكن بصلاحيات محددة', 'a token with limited scopes'], ['كلمة سر المستخدم', 'the user’s password'], ['كل حسابه', 'their whole account']], 0, B('scopes.', 'Scopes.')),
        Q(B('client secret مكانه:', 'The client secret belongs:'), [['السيرفر بس', 'on the server only'], ['JS الواجهة', 'in front-end JS'], ['README', 'in the README']], 0, B('سر.', 'A secret.')),
        Q(B('state رجع مختلف:', 'The returned state differs:'), [['ارفض (403)', 'reject (403)'], ['كمّل', 'continue'], ['أعد التحميل', 'reload']], 0, B('CSRF.', 'CSRF.'))
      ] },

    { title: B('الصلاحيات وملكية البيانات', 'Permissions and data ownership'),
      goal: B('كل مستخدم يعمل اللي مسموحله بس، على بياناته بس.', 'Every user does only what they may, on their own data only.'),
      learn: [
        L(B('الأدوار والصلاحيات', 'Roles and permissions'),
          B('**rbac**: كل **role** (admin، manager، staff، viewer) ليه قايمة **permission** (`orders:read`، `orders:refund`، `users:manage`). الكود بيسأل عن الصلاحية مش الدور (`can(user, "orders:refund")`) — كده تضيف دور جديد من غير ما تلمس الـ routes. وdeny by default: أي حاجة مش مسموحة صراحة ممنوعة.', '**rbac**: each **role** (admin, manager, staff, viewer) has a list of each **permission** (`orders:read`, `orders:refund`, `users:manage`). The code asks about the permission, not the role (`can(user, "orders:refund")`) — so you add a role without touching routes. And deny by default: anything not explicitly allowed is forbidden.'),
          'const ROLES = {\n  viewer: ["orders:read"],\n  staff: ["orders:read", "orders:update"],\n  manager: ["orders:read", "orders:update", "orders:refund", "reports:read"],\n  admin: ["*"],\n};\nconst can = (user, perm) => (ROLES[user.role] ?? []).some(p => p === "*" || p === perm);\nconst requirePerm = perm => (req, res, next) =>\n  !req.user ? res.status(401).end() : can(req.user, perm) ? next() : res.status(403).json({ error: `missing ${perm}` });\n\nfor (const role of ["viewer", "staff", "manager", "admin", "intern"])\n  console.log(role.padEnd(8), ["orders:read", "orders:refund", "users:manage"].map(p => `${p}:${can({ role }, p) ? "✓" : "✗"}`).join("  "));', N()),
        L(B('ملكية البيانات (IDOR)', 'Data ownership (IDOR)'),
          B('أخطر غلطة في الـ APIs (رقم 1 في OWASP API): `GET /orders/1043` بيرجّع الطلب لأي حد مسجّل — حتى لو مش بتاعه. ده **idor**. كل استعلام لازم يتقيّد بالمالك: `WHERE id = $1 AND customer_id = $2`، أو فحص صريح. وارجع 404 مش 403 عشان متكشفش إن الطلب موجود.', 'The most dangerous API mistake (number 1 in the OWASP API list): `GET /orders/1043` returns the order to anyone signed in — even if it is not theirs. That is **idor**. Every query must be scoped to the owner: `WHERE id = $1 AND customer_id = $2`, or an explicit check. Return 404, not 403, so you do not reveal the order exists.'),
          'const orders = [{ id: 1042, customerId: 7, total: 250 }, { id: 1043, customerId: 9, total: 90 }];\nfunction getOrder(user, id) {\n  const order = orders.find(o => o.id === id);\n  const allowed = order && (order.customerId === user.id || ["manager", "admin"].includes(user.role));\n  return allowed ? { status: 200, order } : { status: 404 };     // 404: do not reveal it exists\n}\nconst sara = { id: 7, role: "customer" }, boss = { id: 1, role: "manager" };\nconsole.log("Sara → her order 1042:", getOrder(sara, 1042).status);\nconsole.log("Sara → Omar’s 1043:  ", getOrder(sara, 1043).status);\nconsole.log("manager → 1043:      ", getOrder(boss, 1043).status);', N()),
        L(B('مفاتيح الآلات', 'Machine keys'),
          B('لـ n8n أو سكربت بيكلّم الـ API: **api key** خاص بيه (مش حساب إنسان)، بصلاحيات أقل حاجة، متخزّن **مشفّر** (hash زي كلمة السر — بتشوفه مرة واحدة وقت الإنشاء)، بتاريخ انتهاء، وقابل للإلغاء. و**api key rotation** دوري: مفتاح جديد، تحديث n8n، إلغاء القديم.', 'For n8n or a script calling the API: its own **api key** (not a human account), with the least permissions, stored **hashed** (like a password — shown once at creation), with an expiry, and revocable. And regular **api key rotation**: a new key, update n8n, revoke the old one.'),
          'import { randomBytes, createHash } from "node:crypto";\nconst keys = new Map();       // hash → { name, perms, expires }\nfunction createKey(name, perms, days = 90) {\n  const key = "ogw_" + randomBytes(24).toString("base64url");\n  keys.set(createHash("sha256").update(key).digest("hex"), { name, perms, expires: Date.now() + days * 864e5 });\n  return key;                                     // show once; store only the hash\n}\nfunction checkKey(key, perm) {\n  const rec = keys.get(createHash("sha256").update(key ?? "").digest("hex"));\n  if (!rec) return "401 unknown key";\n  if (rec.expires < Date.now()) return "401 expired key";\n  return rec.perms.includes(perm) ? `✓ ${rec.name}` : `403 ${rec.name} lacks ${perm}`;\n}\nconst n8nKey = createKey("n8n-orders-sync", ["orders:read", "orders:update"]);\nconsole.log("shown once:", n8nKey.slice(0, 8) + "…", "| stored:", [...keys.keys()][0].slice(0, 12) + "…");\nconsole.log(checkKey(n8nKey, "orders:update"), "|", checkKey(n8nKey, "users:manage"), "|", checkKey("ogw_guess", "orders:read"));', N())
      ],
      practice: [
        B('اعمل جدول أدوار وصلاحيات لمشروعك.', 'Write a roles-and-permissions table for your project.'),
        B('دوّر على endpoint فيه IDOR وصلّحه.', 'Find an endpoint with IDOR and fix it.'),
        B('اعمل مفتاح API لـ n8n بصلاحيات محددة.', 'Create an API key for n8n with specific permissions.'),
        B('اكتب خطوات rotation للمفتاح.', 'Write the rotation steps for the key.')
      ],
      words: [
        W('rbac', 'صلاحيات حسب الدور', 'role-based access control', 'RBAC maps roles to permissions.'),
        W('role', 'مجموعة صلاحيات باسم', 'a named set of permissions', 'Sara has the manager role.'),
        W('permission', 'إذن بفعل محدد', 'leave to do one specific thing', 'orders:refund is a permission.'),
        W('deny by default', 'الممنوع هو الأصل', 'forbidden unless allowed', 'Deny by default for new routes.'),
        W('idor', 'وصول لبيانات غيرك بتغيير id', 'reaching others’ data by changing an id', 'Scope every query to stop IDOR.'),
        W('api key rotation', 'استبدال مفاتيح API دوريًا', 'replacing API keys regularly', 'API key rotation every 90 days.')
      ],
      read: [{ t: 'OWASP API Security Top 10', url: 'https://api-security.owasp.org/editions/2023/en/0x11-t10/', what: B('اقرا API1 وAPI5.', 'Read API1 and API5.') }, { t: 'OWASP: Authorization Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html', what: B('اقرا Deny by Default.', 'Read Deny by Default.') }],
      challenge: B('ضيف RBAC لـ «بوابة الطلبات» (4 أدوار)، وقيّد كل استعلام بالمالك، ومفاتيح API مشفّرة بصلاحيات وانتهاء لـ n8n — واكتب اختبارات بتحاول تقرا طلب حد تاني وتعمل refund من staff.', 'Add RBAC to the «orders gateway» (4 roles), scope every query to its owner, and hashed API keys with permissions and expiry for n8n — with tests trying to read someone else’s order and to refund as staff.'),
      quiz: [
        Q(B('الكود يسأل عن:', 'The code checks:'), [['الصلاحية', 'the permission'], ['اسم الدور', 'the role name'], ['اسم المستخدم', 'the user name']], 0, B('مرونة.', 'Flexibility.')),
        Q(B('/orders/1043 لعميل مش صاحبه:', '/orders/1043 for a customer who does not own it:'), ['404', '200', '500'], 0, B('IDOR.', 'IDOR.')),
        Q(B('مفتاح API في القاعدة:', 'An API key in the database:'), [['hash بس', 'only its hash'], ['نص', 'as text'], ['base64', 'base64']], 0, B('زي كلمة السر.', 'Like a password.'))
      ] },

    { title: B('مراجعة الأسبوع ومشروعه', 'Week review and project'),
      goal: B('API محمي من كل الجهات.', 'An API protected on every side.'),
      review: [
        B('401 مقابل 403، وscrypt/argon2، وrate limit، وMFA.', '401 vs 403, scrypt/argon2, rate limits and MFA.'),
        B('الجلسات: كوكي HttpOnly/Secure/SameSite، الإلغاء، CSRF.', 'Sessions: HttpOnly/Secure/SameSite cookies, revocation, CSRF.'),
        B('JWT: التوقيع والخوارزمية وexp/iss/aud، access/refresh، وإمتى متستخدموش.', 'JWT: signature, algorithm, exp/iss/aud, access/refresh, and when not to use it.'),
        B('OAuth 2.0 وPKCE وstate وOpenID Connect والـ scopes.', 'OAuth 2.0, PKCE, state, OpenID Connect and scopes.'),
        B('RBAC وdeny by default وIDOR ومفاتيح API مشفّرة بـ rotation.', 'RBAC, deny by default, IDOR and hashed API keys with rotation.')
      ],
      project: B('أمّن «بوابة الطلبات»: مستخدمين بـ argon2/scrypt، تسجيل دخول بجلسات (أو «Google» بـ PKCE)، rate limit لتسجيل الدخول، 4 أدوار بصلاحيات، كل استعلام مقيّد بالمالك، مفاتيح API مشفّرة لـ n8n بانتهاء وrotation، فحص Origin، وhelmet — مع 20 اختبار أمان (401/403/404/429، IDOR، توكن متلاعب، مفتاح منتهي) وصفحة SECURITY.md بتشرح كل قرار.', 'Secure the «orders gateway»: users with argon2/scrypt, session login (or «Google» with PKCE), a login rate limit, 4 roles with permissions, every query scoped to its owner, hashed API keys for n8n with expiry and rotation, an Origin check and helmet — with 20 security tests (401/403/404/429, IDOR, a tampered token, an expired key) and a SECURITY.md explaining every decision.'),
      test: [
        Q(B('مش مسجّل دخول:', 'Not signed in:'), ['401', '403', '422'], 0, B('authentication.', 'Authentication.')),
        Q(B('salt فايدته:', 'A salt’s purpose:'), [['نفس كلمة السر تدّي hash مختلف', 'the same password gives a different hash'], ['يسرّع', 'speeds things up'], ['يشفّر القاعدة', 'encrypts the database']], 0, B('ضد الجداول الجاهزة.', 'Against precomputed tables.')),
        Q(B('1000 محاولة دخول في دقيقة:', '1000 login attempts a minute:'), ['rate limit (429)', B('عادي', 'normal'), B('قفل السيرفر', 'shut the server')], 0, B('brute force.', 'Brute force.')),
        Q(B('كوكي JS مش شايفه:', 'A cookie JS cannot see:'), ['HttpOnly', 'Secure', 'Path'], 0, B('ضد XSS.', 'Against XSS.')),
        Q(B('SameSite=Lax بيقلل:', 'SameSite=Lax reduces:'), ['CSRF', 'SQL injection', 'DDoS'], 0, B('عبر المواقع.', 'Cross-site.')),
        Q(B('JWT exp عدّى:', 'A JWT past its exp:'), [['ارفض', 'reject'], ['اقبل', 'accept'], ['جدّد لوحدك', 'renew it silently']], 0, B('expired.', 'Expired.')),
        Q(B('إلغاء فوري لتسجيل الدخول أسهل مع:', 'Instant sign-out is easier with:'), ['server sessions', B('JWT طويل', 'a long JWT'), 'localStorage'], 0, B('revocation.', 'Revocation.')),
        Q(B('PKCE بيحمي:', 'PKCE protects:'), [['الـ code من الاستخدام لو اتسرق', 'the code if stolen'], ['كلمة السر', 'the password'], ['الكوكيز', 'cookies']], 0, B('verifier.', 'The verifier.')),
        Q(B('scopes الأحسن:', 'The best scopes:'), [['أقل حاجة لازمة', 'the least needed'], ['كل حاجة', 'everything'], ['admin', 'admin']], 0, B('least privilege.', 'Least privilege.')),
        Q(B('can(user, "orders:refund"):', 'can(user, "orders:refund"):'), ['RBAC', 'OAuth', 'CSRF'], 0, B('صلاحيات.', 'Permissions.')),
        Q(B('WHERE id = $1 AND customer_id = $2:', 'WHERE id = $1 AND customer_id = $2:'), [['منع IDOR', 'prevents IDOR'], ['أسرع', 'is faster'], ['فهرس', 'is an index']], 0, B('ملكية.', 'Ownership.')),
        Q(B('مفتاح API لـ n8n:', 'An API key for n8n:'), [['خاص بيه، مشفّر، بانتهاء', 'its own, hashed, with an expiry'], ['حساب الأدمن', 'the admin account'], ['في الكود', 'in the code']], 0, B('machine identity.', 'A machine identity.'))
      ] }
  ]
};
