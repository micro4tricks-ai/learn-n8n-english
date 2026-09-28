// Unit tests for the journey engine core (no DOM needed).
const assert = require('assert');
global.window = { LANG: 'en' };
require('../assets/js/journey.js');
const J = window.JOURNEY;

assert.strictEqual(J.L('plain'), 'plain');
assert.strictEqual(J.L({ ar: 'أ', en: 'A' }), 'A');
window.LANG = 'ar'; assert.strictEqual(J.L({ ar: 'أ', en: 'A' }), 'أ');
window.LANG = 'en'; assert.strictEqual(J.L({ ar: 'أ' }), 'أ');           // falls back to Arabic
assert.strictEqual(J.L(null), '');

assert.strictEqual(J.rules.testId(1), 'w01-test');
assert.strictEqual(J.rules.testId(12), 'w12-test');
assert.strictEqual(J.rules.weekPassed([{ score: 6, total: 10 }, { score: 7, total: 10 }]), true);
assert.strictEqual(J.rules.weekPassed([{ score: 69, total: 100 }]), false);
assert.strictEqual(J.rules.weekPassed([]), false);
assert.strictEqual(J.rules.weekPassed(undefined), false);

const p = { tests: { 'w01-test': [{ score: 8, total: 10 }] } };
assert.strictEqual(J.rules.weekUnlocked('english', 1, {}), true);
assert.strictEqual(J.rules.weekUnlocked('english', 2, p), true);
assert.strictEqual(J.rules.weekUnlocked('english', 3, p), false);

// a study day needs every practice task checked and at least 60% of its quiz right
const day = { key: 'w01d1', practice: ['a', 'b'], quiz: [{ a: 1 }, { a: 0 }, { a: 2 }] };
const allDone = { pw01d1_0: true, pw01d1_1: true };
assert.strictEqual(J.rules.dayDone(day, {}, {}), false);
assert.strictEqual(J.rules.dayDone(day, allDone, { qw01d1_0: 1 }), false);
assert.strictEqual(J.rules.dayDone(day, allDone, { qw01d1_0: 1, qw01d1_1: 1, qw01d1_2: 1 }), false);
assert.strictEqual(J.rules.dayDone(day, allDone, { qw01d1_0: 1, qw01d1_1: 0, qw01d1_2: 1 }), true);
assert.strictEqual(J.rules.dayDone(day, { pw01d1_0: true }, { qw01d1_0: 1, qw01d1_1: 0, qw01d1_2: 2 }), false);

const m = J.mergeProgress(
  { done: { a: true }, answers: { q1: 0 }, tests: { t: [{ score: 5, total: 10, at: 1 }] }, updatedAt: 1 },
  { done: { b: true }, answers: { q1: 2, q2: 1 }, tests: { t: [{ score: 9, total: 10, at: 2 }, { score: 5, total: 10, at: 1 }] }, updatedAt: 2 });
assert.deepStrictEqual(Object.keys(m.done).sort(), ['a', 'b']);
assert.strictEqual(m.answers.q1, 0);                 // first (local) answer kept
assert.strictEqual(m.answers.q2, 1);
assert.strictEqual(m.tests.t.length, 2);             // identical attempt not duplicated
assert.strictEqual(m.updatedAt, 2);
const e = J.mergeProgress({ done: { a: true } }, null);
assert.deepStrictEqual(e.done, { a: true });
assert.deepStrictEqual(e.tests, {});

// exams: months 1-5 cover their 4 weeks, month 6 is the final on all 24; each opens after its weekly tests are passed
assert.strictEqual(J.rules.examId(2), 'm2-exam');
assert.strictEqual(J.rules.examId(6), 'final-exam');
assert.deepStrictEqual(J.rules.examWeeks(3), [9, 12]);
assert.deepStrictEqual(J.rules.examWeeks(6), [1, 24]);
const passed = n => ({ tests: Object.fromEntries(Array.from({ length: n }, (_, i) => [J.rules.testId(i + 1), [{ score: 7, total: 10 }]])) });
assert.strictEqual(J.rules.examOpen(1, passed(3)), false);
assert.strictEqual(J.rules.examOpen(1, passed(4)), true);
assert.strictEqual(J.rules.examOpen(2, passed(4)), false);
assert.strictEqual(J.rules.examOpen(6, passed(23)), false);
assert.strictEqual(J.rules.examOpen(6, passed(24)), true);

// the question draw: 5 per week for a month exam, 2 per week for the final, stable for a seed, ids resolve back
const mk = n => ({ track: 'n8n', n, days: [1, 2, 3, 4, 5].map(d => ({ d, quiz: [0, 1, 2].map(i => ({ q: n + '-' + d + '-' + i, o: ['a', 'b'], a: 0 })) }))
  .concat([{ d: 6, test: Array.from({ length: 12 }, (_, i) => ({ q: n + '-t-' + i, o: ['a', 'b'], a: 1 })) }]) });
for (let n = 1; n <= 24; n++) J.week(mk(n));
assert.strictEqual(J.pool(J.weeks.n8n[1]).length, 27);
const a1 = J.drawExam('n8n', 1, 42), a2 = J.drawExam('n8n', 1, 42), b1 = J.drawExam('n8n', 1, 43);
assert.strictEqual(a1.length, 20);
assert.deepStrictEqual(a1, a2);
assert.notDeepStrictEqual(a1, b1);
assert.strictEqual(new Set(a1).size, 20);
[1, 2, 3, 4].forEach(n => assert.strictEqual(a1.filter(id => id.startsWith('w0' + n)).length, 5));
assert.strictEqual(J.drawExam('n8n', 6, 7).length, 48);
assert.strictEqual(J.question('n8n', 'w03t5').q, '3-t-5');
assert.strictEqual(J.question('n8n', 'w12d4q2').q, '12-4-2');
assert.strictEqual(J.question('n8n', 'w30t1'), null);
a1.forEach(id => assert.ok(J.question('n8n', id), id));

console.log('journey core OK');
