# Phase 1 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 24-week "journey" engine (week files, day view, gated weekly tests, recorded attempts), a responsive layout for phone/tablet/desktop, and optional email accounts on Supabase that sync progress and test attempts — without breaking the live site.

**Architecture:** Plain HTML/CSS/JS on GitHub Pages, no build step. A shared `assets/js/journey.js` renders the 24-week plan for both pages from per-week content files (`content/<track>/weeks/wNN.js`) loaded on demand; every content string is `{ar, en}` and read through `L()`. `assets/js/account.js` adds Supabase email-OTP login and merges local progress with the cloud. Development happens on branch `journey-24`; the branch is merged to `main` only when both tracks have real content (end of phases 2–3), while responsive CSS and accounts for the existing progress ship to `main` in this phase.

**Tech Stack:** Vanilla JS (ES5 style, same as the site), Supabase JS v2 (vendored UMD), Node + jsdom for tests, Python http.server for local checks.

**Spec:** `docs/superpowers/specs/2026-09-28-24-week-program-design.md`

## Global Constraints

- Week = 6 days: days 1–5 study (~120 min), day 6 review + weekly project + weekly test; day 7 rest.
- Next week unlocks at **≥ 70%** on the weekly test; days inside a week unlock in order.
- Monthly exam after weeks 4, 8, 12, 16, 20, 24 (30 questions); final exam in week 24 (60 questions).
- Site works fully **without an account** (localStorage); account is optional and merges local progress on login.
- Login: email one-time code (6 digits) plus magic link, no passwords. Separate Supabase project `developer-journey`.
- RLS: a user can read/write only their own rows.
- New content strings are `{ar, en}`; UI strings keep `T()`/`TF()` with dictionaries in `tools/i18n`.
- Breakpoints: phone < 600px (1 column), tablet 600–1024px (2 columns), desktop > 1024px (sidebar + content). No horizontal page scroll.
- Examples in content are original, never copied from the books.
- Bump the `?v=` asset version (digits only) on every release.

## Review Focus

1. A student with old progress (keys `eng_plan_v1`, `n8n_plan_v2`) opens the new plan — nothing is lost; week 1 shows the days they already finished.
2. Logging in on a second device with different local progress — both sets survive (union), nothing is overwritten.
3. Supabase unreachable / offline — the page keeps working locally and retries later, no error dialogs.
4. A week file fails to load (404, typo) — the day view shows a clear "couldn't load this week, retry" message instead of a blank page.
5. Taking a test twice — both attempts are recorded, the best score counts for unlocking, and the page never unlocks on a score below 70%.

---

## File structure

| File | Responsibility |
|---|---|
| `assets/js/journey.js` | Journey engine: `L()`, week registry and loader, progress/unlock rules, renderers for the map, day view and tests |
| `assets/js/account.js` | Supabase client, login UI (email → code), sync/merge of progress, recording test attempts |
| `assets/js/vendor/supabase.js` | Vendored Supabase JS v2 UMD build (copied from muslim-todo-list) |
| `assets/js/config.js` | Supabase URL + anon key (public by design) |
| `content/english/weeks/w01.js` … | One week per file: `JOURNEY.week({...})` |
| `content/n8n/weeks/w01.js` … | Same for n8n |
| `supabase/schema.sql` | Tables `progress`, `test_attempts` + RLS policies |
| `tools/test_content.js` | Validates every week/exam file |
| `tools/test_journey.js` | Unit tests for unlock rules and progress merge |
| `tools/migrate_week1.js` | One-off: builds week 1 of each track from the current intensive week, taking English from the existing dictionaries |
| `assets/css/site.css` | Responsive layout rules (added section) |

---

### Task 1: Journey core — `L()`, week registry, unlock rules, merge

**Files:**
- Create: `assets/js/journey.js`
- Test: `tools/test_journey.js`

**Interfaces:**
- Produces (on `window.JOURNEY`):
  - `L(x)` → string. `x` is a string (returned as is) or `{ar, en}` (returns `x[LANG] || x.ar`).
  - `week(obj)` — registers a week file: `obj = {track, n, month, level, title, goal, days:[6 day objects]}`.
  - `rules.dayDone(dayState)` → bool: all practice checked AND quiz answered.
  - `rules.weekPassed(attempts)` → bool: best weekly-test score ≥ 70%.
  - `rules.weekUnlocked(track, n, progress)` → bool: n === 1 or week n−1 passed.
  - `mergeProgress(a, b)` → progress object: union of checked keys (true wins), best score per test, newest `updatedAt`.

- [ ] **Step 1: Write the failing test** (`tools/test_journey.js`)

```js
const assert = require('assert');
global.window = { LANG: 'en' };
require('../assets/js/journey.js');
const J = window.JOURNEY;
assert.strictEqual(J.L('plain'), 'plain');
assert.strictEqual(J.L({ ar: 'أ', en: 'A' }), 'A');
window.LANG = 'ar'; assert.strictEqual(J.L({ ar: 'أ', en: 'A' }), 'أ');
assert.strictEqual(J.L({ ar: 'أ' }), 'أ');                      // falls back to Arabic
assert.strictEqual(J.rules.weekPassed([{ score: 6, total: 10 }, { score: 7, total: 10 }]), true);
assert.strictEqual(J.rules.weekPassed([{ score: 69, total: 100 }]), false);
assert.strictEqual(J.rules.weekPassed([]), false);
const p = { tests: { 'w01-test': [{ score: 8, total: 10 }] } };
assert.strictEqual(J.rules.weekUnlocked('english', 1, {}), true);
assert.strictEqual(J.rules.weekUnlocked('english', 2, p), true);
assert.strictEqual(J.rules.weekUnlocked('english', 3, p), false);
const m = J.mergeProgress(
  { done: { a: true }, tests: { t: [{ score: 5, total: 10, at: 1 }] }, updatedAt: 1 },
  { done: { b: true }, tests: { t: [{ score: 9, total: 10, at: 2 }] }, updatedAt: 2 });
assert.deepStrictEqual(Object.keys(m.done).sort(), ['a', 'b']);
assert.strictEqual(m.tests.t.length, 2);
assert.strictEqual(m.updatedAt, 2);
console.log('journey core OK');
```

- [ ] **Step 2: Run it — expect FAIL** (`Cannot find module '../assets/js/journey.js'`): `node tools/test_journey.js`

- [ ] **Step 3: Implement the core** (`assets/js/journey.js`, top part)

```js
/* Journey engine: the 24-week plan shared by the n8n and English pages. */
(function(){
  var J = window.JOURNEY = window.JOURNEY || {};
  J.weeks = { english: {}, n8n: {} };
  J.L = function(x){
    if(x == null) return '';
    if(typeof x === 'string') return x;
    return x[window.LANG] || x.ar || x.en || '';
  };
  J.week = function(w){ J.weeks[w.track][w.n] = w; if(J.onWeekLoaded) J.onWeekLoaded(w); };
  function best(attempts){
    var b = 0;
    (attempts || []).forEach(function(t){ if(t.total) b = Math.max(b, t.score / t.total); });
    return b;
  }
  J.rules = {
    PASS: 0.7,
    testId: function(n){ return 'w' + (n < 10 ? '0' : '') + n + '-test'; },
    weekPassed: function(attempts){ return best(attempts) >= J.rules.PASS; },
    weekUnlocked: function(track, n, progress){
      if(n === 1) return true;
      var tests = (progress && progress.tests) || {};
      return J.rules.weekPassed(tests[J.rules.testId(n - 1)]);
    },
    dayDone: function(day, done){
      var ok = true;
      (day.practice || []).forEach(function(_, i){ if(!done['p' + day.key + '_' + i]) ok = false; });
      (day.quiz || []).forEach(function(_, i){ if(done['q' + day.key + '_' + i] == null) ok = false; });
      return ok;
    }
  };
  J.mergeProgress = function(a, b){
    a = a || {}; b = b || {};
    var out = { done: {}, answers: {}, tests: {}, updatedAt: Math.max(a.updatedAt || 0, b.updatedAt || 0) };
    [a, b].forEach(function(p){
      Object.keys(p.done || {}).forEach(function(k){ if(p.done[k]) out.done[k] = true; });
      Object.keys(p.answers || {}).forEach(function(k){ if(out.answers[k] == null) out.answers[k] = p.answers[k]; });
      Object.keys(p.tests || {}).forEach(function(k){
        var seen = {};
        out.tests[k] = (out.tests[k] || []).concat(p.tests[k]).filter(function(t){
          var id = t.at + ':' + t.score; if(seen[id]) return false; seen[id] = true; return true;
        });
      });
    });
    return out;
  };
})();
```

- [ ] **Step 4: Run — expect `journey core OK`**: `node tools/test_journey.js`
- [ ] **Step 5: Commit** — `git add assets/js/journey.js tools/test_journey.js && git commit -m "Add journey core: L(), unlock rules, progress merge"`

---

### Task 2: Week file format, validator, and week 1 for both tracks

**Files:**
- Create: `tools/test_content.js`, `tools/migrate_week1.js`, `content/english/weeks/w01.js`, `content/n8n/weeks/w01.js`
- Modify: `package.json` (`"test"` runs smoke + journey + content tests)

**Interfaces:**
- Consumes: `JOURNEY.week()` from Task 1.
- Produces: the week file format every later phase writes:

```js
JOURNEY.week({
  track: 'english', n: 1, month: 1, level: 'A1',
  title: {ar, en}, goal: {ar, en},
  days: [
    { d: 1, title: {ar, en}, minutes: 120,
      learn:    [{ h: {ar, en}, p: {ar, en}, ex: 'code or English example' }],   // 3–6
      practice: [{ar, en}],                                                        // 3–7 tasks
      words:    [{ t: 'term', m: {ar, en}, ex: 'English example' }],               // 5–15
      read:     [{ t: 'Title', url: 'https://…', what: {ar, en} }],                // 1–3
      quiz:     [{ q: {ar, en} | 'str', o: ['…' | {ar, en}], a: 0, why: {ar, en} }] // 3–5
    },
    … days 2–5 …,
    { d: 6, title: {ar, en}, minutes: 120, review: [{ar, en}], project: {ar, en},
      test: [ /* 10–15 quiz questions, same shape as quiz */ ] }
  ]
});
```

- [ ] **Step 1: Write the validator** (`tools/test_content.js`) — loads every `content/*/weeks/*.js` in a `vm` context with a stub `JOURNEY.week` and checks: 6 days; days 1–5 have learn ≥ 3, practice ≥ 3, words ≥ 5, read ≥ 1, quiz ≥ 3; day 6 has test ≥ 10 and a project; every `{ar,en}` object has both non-empty keys; every question has 2–5 options and `0 ≤ a < o.length`; every `url` starts with `https://`; `n` matches the file name. Prints `content OK (N weeks)` or the list of problems and exits 1.

```js
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const problems = []; let count = 0;
const bi = (x, where) => { if (typeof x === 'string') return; if (!x || !x.ar || !x.en) problems.push(where + ': missing ar/en'); };
const q = (x, where) => {
  bi(x.q, where + ' q'); bi(x.why, where + ' why');
  if (!Array.isArray(x.o) || x.o.length < 2 || x.o.length > 5) problems.push(where + ': needs 2–5 options');
  else { x.o.forEach((o, i) => bi(o, where + ' option ' + i)); if (!(x.a >= 0 && x.a < x.o.length)) problems.push(where + ': bad answer index'); }
};
for (const track of ['english', 'n8n']) {
  const dir = path.join(ROOT, 'content', track, 'weeks');
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => /^w\d\d\.js$/.test(f))) {
    let wk = null;
    vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { JOURNEY: { week: w => { wk = w; } } });
    const W = track + '/' + f; count++;
    if (!wk) { problems.push(W + ': no JOURNEY.week call'); continue; }
    if (wk.track !== track || 'w' + String(wk.n).padStart(2, '0') + '.js' !== f) problems.push(W + ': track/n mismatch');
    bi(wk.title, W + ' title'); bi(wk.goal, W + ' goal');
    if (!Array.isArray(wk.days) || wk.days.length !== 6) { problems.push(W + ': needs 6 days'); continue; }
    wk.days.forEach((d, i) => {
      const D = W + ' day ' + (i + 1); bi(d.title, D + ' title');
      if (i < 5) {
        if ((d.learn || []).length < 3) problems.push(D + ': learn < 3');
        if ((d.practice || []).length < 3) problems.push(D + ': practice < 3');
        if ((d.words || []).length < 5) problems.push(D + ': words < 5');
        if ((d.read || []).length < 1) problems.push(D + ': read < 1');
        if ((d.quiz || []).length < 3) problems.push(D + ': quiz < 3');
        (d.learn || []).forEach((l, j) => { bi(l.h, D + ' learn ' + j); bi(l.p, D + ' learn ' + j); });
        (d.practice || []).forEach((p, j) => bi(p, D + ' practice ' + j));
        (d.words || []).forEach((w, j) => { if (!w.t) problems.push(D + ' word ' + j + ': no term'); bi(w.m, D + ' word ' + j); });
        (d.read || []).forEach((r, j) => { if (!/^https:\/\//.test(r.url || '')) problems.push(D + ' read ' + j + ': bad url'); bi(r.what, D + ' read ' + j); });
        (d.quiz || []).forEach((x, j) => q(x, D + ' quiz ' + j));
      } else {
        bi(d.project, D + ' project');
        if ((d.test || []).length < 10) problems.push(D + ': test < 10');
        (d.test || []).forEach((x, j) => q(x, D + ' test ' + j));
      }
    });
  }
}
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
console.log('content OK (' + count + ' weeks)');
```

- [ ] **Step 2: Run it — expect `content OK (0 weeks)`** (no files yet): `node tools/test_content.js`
- [ ] **Step 3: Write `tools/migrate_week1.js`** — reads `window.EN_DATA` / `window.N8N_DATA` (the existing data modules) and the built dictionaries (`assets/js/*-en.js`, loaded with a stub `I18N_ADD` that collects the object) and writes week 1: days 1–5 = intensive days 1–5 (learn → `{h,p,ex}`, build → practice, sprint-tagged vocabulary/terms → words, sprint-day library items → read, quiz → quiz), day 6 = review of the 5 days + the day-5 challenge as the project + a 12-question test made of the 5 days' quiz questions plus the day-6/7 questions. Every Arabic string gets `en` from the dictionary; a string with no dictionary entry makes the script stop and print it.
- [ ] **Step 4: Run migration and validator** — `node tools/migrate_week1.js && node tools/test_content.js` → `content OK (2 weeks)`
- [ ] **Step 5: Wire tests** — `package.json`: `"test": "node tools/smoke_test.js && node tools/test_journey.js && node tools/test_content.js"`; run `npm test` → all pass.
- [ ] **Step 6: Commit** — `git add content tools package.json && git commit -m "Add week file format, validator and week 1 for both tracks"`

---

### Task 3: Journey UI — map, day view, weekly test, loader

**Files:**
- Modify: `assets/js/journey.js` (renderers + loader), `english.html`, `n8n.html` (new `#journey` section replaces `#sprint`, `#map`, `#plan`, `#projects`; `#quiz` keeps grammar/review tabs only), `assets/js/english-app.js`, `assets/js/n8n-app.js` (remove the old sprint/map/plan code and the sprint-day quiz tabs), `assets/css/site.css`
- Test: `tools/smoke_test.js` (new checks)

**Interfaces:**
- Consumes: Task 1 core, Task 2 week files.
- Produces: `JOURNEY.mount({ track, el, storeKey, legacyKey, onChange })` — renders into `el`; `onChange(progress)` fires after every save (used by account sync in Task 5). `JOURNEY.getProgress()` / `JOURNEY.setProgress(p)`.

Behaviour:
- Progress lives in `localStorage[storeKey]` (`journey_english_v1`, `journey_n8n_v1`) as `{done, answers, tests, updatedAt}`. On first run it imports the legacy key: intensive days 1–5 build/quiz state → week-1 days 1–5 (`legacyKey` = `eng_plan_v1` / `n8n_plan_v2`).
- Map: 6 month rows × 4 week cards (title, level, progress bar, 🔒 when locked, ✓ when passed). Weeks without a content file show "قيد الإعداد / Coming soon".
- Loader: `loadWeek(track, n)` appends `<script src="content/<track>/weeks/wNN.js?v=…">`, resolves on `JOURNEY.week`, rejects after 10 s or on `error` → the view shows "مقدرناش نحمّل الأسبوع ده · إعادة المحاولة".
- Day view: tabs for days 1–6 (locked until the previous day is done), sections Learn / Practice (checkboxes) / Words (🔊 on the English page) / Read / Quiz (instant feedback, answer saved). Day 6: review list, project checkbox, weekly test (score shown, attempt saved with `{score,total,at,answers}`; "retry" allowed; next week unlocks at ≥ 70%).
- "Today" button at the top jumps to the first unfinished day of the first unlocked, unpassed week.

- [ ] **Step 1: Add smoke checks** — in `tools/smoke_test.js` for `english.html` and `n8n.html` in both languages: `#journey .jr-week` count is 24, week 1 is unlocked, week 2 is locked, the day view of week 1 renders 6 day tabs, and no `#sprint` element remains. Run `npm test` → FAIL.
- [ ] **Step 2: Implement renderers and loader** in `journey.js` (map, day view, quiz/test widgets, legacy import, `loadWeek`).
- [ ] **Step 3: Replace the page sections and remove the old sprint/map/plan code** from both apps; keep `T()` for UI strings and add them to the i18n keys (`npm run i18n:missing` → translate → `npm run i18n:build`).
- [ ] **Step 4: Run** `npm test` → PASS; manual check in Chromium via `python -m http.server`: finish day 1, answer the week-1 test with ≥ 70% and see week 2 unlock; a < 70% attempt keeps it locked.
- [ ] **Step 5: Commit** — `git commit -am "Journey UI: 24-week map, day view and gated weekly tests"`

---

### Task 4: Responsive layout

**Files:**
- Modify: `assets/css/site.css`, `assets/js/journey.js` (sidebar markup for desktop)
- Test: Playwright screenshots at 390×844, 820×1180, 1440×900

- [ ] **Step 1:** Add fluid type scale on `:root` (`--fs-body: clamp(15px, 1.2vw + 11px, 17px)`, `--fs-h1: clamp(24px, 3vw + 12px, 38px)`, `--fs-h2: clamp(19px, 1.5vw + 12px, 24px)`) and use them in `body`, `h1`, `h2`, `.fold-btn`.
- [ ] **Step 2:** Layout rules: `@media (max-width: 599px)` all grids 1 column, header stat cards scroll horizontally, day tabs 3 per row; `@media (min-width: 600px) and (max-width: 1024px)` grids 2 columns; `@media (min-width: 1025px)` `#journey` becomes `grid-template-columns: 280px 1fr` with the week list as a sticky sidebar.
- [ ] **Step 3:** Screenshot the three sizes (Arabic and English) and fix any overflow (`document.documentElement.scrollWidth <= innerWidth` must be true on every page).
- [ ] **Step 4: Commit** — `git commit -am "Responsive layout for phone, tablet and desktop"`

---

### Task 5: Accounts and cloud sync (Supabase)

**Files:**
- Create: `supabase/schema.sql`, `assets/js/config.js`, `assets/js/vendor/supabase.js` (copy from `muslim-todo-list/js/vendor/supabase.js`), `assets/js/account.js`
- Modify: `english.html`, `n8n.html`, `index.html` (account button in the header), `assets/css/site.css`
- Test: `tools/test_journey.js` (merge cases), manual end-to-end with a test inbox

**Prerequisite (user):** a Supabase personal access token saved to `C:\Users\Mahmoud Lab\supabase-token.txt` (not pasted in chat). With it: create project `developer-journey` in org `micro4tricks` (region Frankfurt), run `schema.sql`, set Site URL + redirect URLs to `https://micro4tricks-ai.github.io/learn-n8n-english/`, set the OTP email template to include `{{ .Token }}` and the link. Delete the token file afterwards.

- [ ] **Step 1: Schema** (`supabase/schema.sql`)

```sql
create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('english','n8n')),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, track)
);
create table if not exists public.test_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track text not null check (track in ('english','n8n')),
  test_id text not null,
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists test_attempts_user on public.test_attempts (user_id, track, test_id);
alter table public.progress enable row level security;
alter table public.test_attempts enable row level security;
create policy "own progress" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own attempts read" on public.test_attempts for select using (auth.uid() = user_id);
create policy "own attempts insert" on public.test_attempts for insert with check (auth.uid() = user_id);
```

- [ ] **Step 2: Add merge edge cases to `tools/test_journey.js`** — empty cloud row, identical attempts not duplicated, `answers` keeps the local answer when both exist. Run → PASS.
- [ ] **Step 3: `account.js`** — header button "حسابي / Account" → dialog: email field → `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: location.href.split('#')[0] } })` → 6-digit code field → `verifyOtp({ email, token, type: 'email' })`. On session: fetch `progress` rows for the track, `JOURNEY.setProgress(mergeProgress(local, cloud))`, upsert the merged row; afterwards `JOURNEY.mount({... onChange })` debounces an upsert (2 s). Test attempts are inserted into `test_attempts` when saved. Every network call is wrapped: failures set a small "offline — will sync later" note and a retry on `online`/next change; nothing blocks the page.
- [ ] **Step 4: Manual end-to-end** — log in with a test email on two browsers, finish different days on each, confirm both see the union; confirm (via the REST API with the anon key and a second user's session) that user B cannot read user A's rows.
- [ ] **Step 5: Commit** — `git add supabase assets index.html english.html n8n.html && git commit -m "Optional email accounts with cloud sync of progress and test attempts"`

---

### Task 6: Docs and release of phase 1

**Files:**
- Modify: `README.md` (24-week program, accounts, how progress is stored), create `docs/CONTENT.md` (week file format and how to add a week), `docs/SUPABASE.md` (project, schema, RLS, email template)

- [ ] **Step 1:** Write the three docs.
- [ ] **Step 2:** `npm test` → PASS; bump `?v=`; merge the responsive CSS and accounts to `main` (journey UI stays on `journey-24` until phases 2–3 fill the weeks); push; confirm the Pages build.
- [ ] **Step 3: Commit** — `git commit -am "Docs for the 24-week program, content format and Supabase"`
