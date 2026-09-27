# Writing a week

Each track (`n8n`, `english`) has 24 weeks. A week is one file, `content/<track>/weeks/wNN.js`, loaded only when a learner opens that week.

## 1. The outline

`content/<track>/outline.js` lists the six months, the 24 week titles, and `ready`: the weeks that have a file. A week that isn't in `ready` shows "coming soon" on the map. After you add `w02.js`, change `ready: [1]` to `ready: [1, 2]`.

## 2. The week file

```js
JOURNEY.week({
  track: 'english', n: 2, month: 1, level: 'A1',          // level may also be {ar, en}
  title: { ar: '…', en: '…' },
  goal:  { ar: '…', en: '…' },
  days: [
    { d: 1, title: {ar, en}, goal: {ar, en}, minutes: 120,
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
- every link is `https://`.

## 3. How a learner moves through it

- A study day (1–5) is done when every `practice` task is checked **and** at least 60% of its `quiz` is right. The next day opens after that.
- Day 6 opens when days 1–5 are done. The weekly `test` is answered in full, then submitted; every attempt is saved. The next week opens when the best attempt is **70% or more**.
- Progress keys use the day key `wNNdD`, so don't reorder `practice` or `quiz` items after a week is published — add new ones at the end instead.

## 4. Writing guidelines

- About 120 minutes a day: ~30 min understand, ~40–50 min practice, ~15–20 min words, ~15–20 min reading, ~10 min quiz.
- Examples are written for this site. Never copy text from books; link to free or official resources only.
- Arabic is Egyptian and plain; English is simple and correct. The `why` of every question explains the right answer, not just repeats it.
- Test questions check the week's goals, not trivia. Mix recall, reading code/text, and "what would you do" questions.

## 5. Check your work

```bash
node tools/test_content.js   # structure of every week file
npm test                     # plus the journey rules and both pages in Arabic and English
npm run serve                # then open http://localhost:8000/english.html#journey
```

Bump the `?v=` number on the script tags in the pages when you release, so browsers load the new files.
