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

const day = { key: 'w01d1', practice: ['a', 'b'], quiz: [{}, {}] };
assert.strictEqual(J.rules.dayDone(day, {}), false);
assert.strictEqual(J.rules.dayDone(day, { pw01d1_0: true, pw01d1_1: true }, { qw01d1_0: 1 }), false);
assert.strictEqual(J.rules.dayDone(day, { pw01d1_0: true, pw01d1_1: true }, { qw01d1_0: 1, qw01d1_1: 0 }), true);

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

console.log('journey core OK');
