# Writing a week

Each track (`n8n`, `english`, `python`, `js`) has 48 weeks over 12 months: months 1–3 are an intensive start (about 3 hours a day), then about 2 hours a day. A week is one file, `content/<track>/weeks/wNN.js`, loaded only when a learner opens that week.

You don't edit `weeks/` by hand. You write the source in `content/<track>/src/wNN.js` and build it:

```bash
node tools/build_weeks.js n8n            # or english / python / js — writes weeks/, terms.js and outline ready[]
node tools/build_weeks.js n8n --check    # validate only
```

A source is a Node module (`module.exports = { level, title, goal, days }`, with `const B = (ar, en) => ({ ar, en })` for texts). It has the same shape as the week file below, plus shortcuts that pull shared content so it stays consistent with the rest of the page:

| In the source | Becomes |
|---|---|
| `words: ['webhook', …]` | the bank entry (n8n glossary / English vocabulary) with its meaning and example |
| `words: [{ t, m: B(…), ex }]` | a new word; it's also added to `content/<track>/terms.js` so it shows in the glossary |
| `learn: ['g:<heading>']` (English) | a grammar rule from the page: heading, explanation, wrong → right |
| `read: ['lib:<title>']` or `{ lib, what }` | a library entry (from the page data or `content/library/<track>.js`) |
| `read: [{ t, url, what: B(…) }]` | a direct link (`https://…`, or a page of this site like `python.html#journey`) |

Python and JavaScript weeks have no word bank: every word is written as `{ t, m, ex }`. A `learn` item's example can carry extra fields:

| Field | Means |
|---|---|
| `run: 1` | Python that runs on the page (Pyodide); `stdin: '…'` feeds `input()` |
| `run: 'html'` / `run: 'js'` | runs in a sandboxed frame; `html: '…'` is the page a `js` example works on |
| `err: 1` | the example fails on purpose (the checker expects an error) |
| `show: 1` | shown only, never run (needs a file, a key or a server) |
| `lang: 'html' / 'css' / 'js' / 'text'` | a snippet that isn't Python (`js` snippets must parse) |
| `node: 1` (JavaScript track) | a Node.js script, run by the checker as `main.mjs` in a fresh folder; `files: { name: text }` are written next to it, `stdin` feeds it, `err: 1` must fail, `net: 1` is skipped with `--offline` |
| `node: 1, ts: 1` | the same as TypeScript (`main.ts`, types stripped by Node 23.6+) |
| `lang: 'ts' / 'jsx'` | TypeScript or JSX shown only |

`npm test` runs every `run: 1` example in a fresh folder with your Python (`PYTHON=path/to/python` to pick one; examples whose libraries aren't installed are skipped), every `run: 'js'` example in jsdom and every `node: 1` example with your Node. `node tools/run_week_examples.js N` runs one week's examples. In sources, regex escapes are written `\\d` (the build stops on a single backslash).

The build stops when a word is already taught in another week of the same track, a reference isn't found, or a bank entry has no English.

Months 1–3 of the n8n, English and Python journeys also have an «intensive hour» per week in `content/<track>/intensive/wNN.js` (extra deep-dive examples, marked ⚡ on the page).

## 1. The outline

`content/<track>/outline.js` lists the 12 months, the 48 week titles, and `ready`: the weeks that have a file. The build updates `ready` for you. A week that isn't in `ready` shows "coming soon" on the map.

## 2. The week file

```js
JOURNEY.week({
  track: 'english', n: 2, month: 1, level: 'A1',          // level may also be {ar, en}
  title: { ar: '…', en: '…' },
  goal:  { ar: '…', en: '…' },
  days: [
    { d: 1, title: {ar, en}, goal: {ar, en}, minutes: 120,          // optional: weeks 1–12 default to 180, later weeks to 120
      learn:    [ { h: {ar, en}, p: {ar, en}, ex: 'code or an English example' } ],   // 3 or more
      practice: [ {ar, en} ],                                                          // 3 or more tasks to check off
      code:     [ { u: {ar, en}, p: 'a snippet to copy' } ],                          // optional
      words:    [ { t: 'term', m: {ar, en}, ex: 'An English example.' } ],            // 5 or more
      read:     [ { t: 'Title', url: 'https://…', what: {ar, en} } ],                 // 1 or more
      challenge: {ar, en},                                                             // optional
      quiz:     [ { q: {ar, en}, o: [ {ar, en} or 'plain', … ], a: 1, why: {ar, en} } ] // 3 or more
    },
    // … days 2–5 have the same shape …
    { d: 6, title: {ar, en}, goal: {ar, en}, minutes: 120,
      review:  [ {ar, en} ],             // 3 or more
      project: {ar, en},
      test:    [ /* 10 or more questions, same shape as quiz */ ] }
  ]
});
```

Rules the validator enforces (`node tools/test_content.js`, also part of `npm test`):

- exactly 6 days, numbered 1–6; `n` matches the file name and `track` the folder;
- every text is `{ar, en}` with both filled and no Arabic in `en` — a plain string is allowed only when it has no Arabic (code, English examples, answer options like `$json`);
- questions have 2–5 options and `a` is a valid option index;
- every link is `https://` (a `read` link may also be a page of this site).

## 3. How a learner moves through it

- A study day (1–5) is done when every `practice` task is checked **and** at least 60% of its `quiz` is right. The next day opens after that.
- Day 6 opens when days 1–5 are done. The weekly `test` is answered in full, then submitted; every attempt is saved. The next week opens when the best attempt is **70% or more**.
- Monthly exams (`m1-exam` … `m11-exam`) open when the month's 4 weekly tests are passed; each attempt draws 5 questions per week from that month's quizzes and tests. The final exam (`final-exam`) opens after week 48 and draws 1 question per week from all 48 weeks. 70% passes; passing the final shows a printable certificate. So every quiz and test question you write can also appear in an exam — write it so it makes sense on its own.
- Progress keys use the day key `wNNdD`, so don't reorder `practice` or `quiz` items after a week is published — add new ones at the end instead.

## 4. Writing guidelines

- About 120 minutes a day from month 4 (~30 min understand, ~40–50 min practice, ~15–20 min words, ~15–20 min reading, ~10 min quiz); about 180 minutes in months 1–3, with more practice and the intensive hour.
- Every word is unique within a track: check before you add one (the build tells you which week already teaches it).
- Examples are written for this site. Topics may follow a reference book, but never copy its text or examples; link to free or official resources only.
- Sample keys and secrets must never look like a real provider’s format (use `example-…` values).
- Arabic is Egyptian and plain; English is simple and correct. The `why` of every question explains the right answer, not just repeats it.
- Test questions check the week's goals, not trivia. Mix recall, reading code/text, and "what would you do" questions.

## 5. Check your work

```bash
node tools/test_content.js   # structure of every week file
npm test                     # plus the journey rules and both pages in Arabic and English
npm run serve                # then open http://localhost:8000/english.html#journey
```

Bump the `?v=` number on the script tags in the pages when you release, so browsers load the new files.

## 6. The library

The original entries live in `assets/js/<track>-data.js` (Arabic, translated through the page dictionary). New entries go in `content/library/<track>.js` as rows with both languages:

```js
// [category, title, url, type, level, whyAr, whyEn, readAr, readEn, lang?]
['n8n', 'n8n Docs: If node', D + 'if/', 'doc', 'b', 'الشروط…', 'Conditions…', 'Conditions.', 'Conditions.'],
```

- Link only free or official resources, and check every link before you add it.
- Say exactly what to read (a chapter, a page, a section), not "read it all".
- The level filter reads the `lvl` text: beginner / intermediate / advanced, a range, or "all levels".
