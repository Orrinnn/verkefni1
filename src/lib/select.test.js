import test from 'node:test';
import assert from 'node:assert/strict';
import { groupByCategory, selectUpTo100PerCategory } from './select.js';

test('groupByCategory groups questions', () => {
  const qs = [
    { category: 'A', line: 1 },
    { category: 'B', line: 2 },
    { category: 'A', line: 3 },
  ];
  const grouped = groupByCategory(qs);
  assert.equal(grouped.A.length, 2);
  assert.equal(grouped.B.length, 1);
});

test('selectUpTo100PerCategory limits and sorts by quality/difficulty', () => {
  const list = [];
  for (let i = 0; i < 120; i += 1) {
    list.push({ category: 'A', quality: i % 5, difficulty: i % 3, line: i + 1 });
  }
  const grouped = { A: list };
  const selected = selectUpTo100PerCategory(grouped);
  assert.equal(selected.A.length, 100);

  // Highest quality first
  const top = selected.A[0].quality;
  for (const q of selected.A) {
    assert.ok((q.quality ?? -1) <= top);
  }
});
