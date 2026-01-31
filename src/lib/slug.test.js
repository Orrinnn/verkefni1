import test from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from './slug.js';

test('slugify converts icelandic characters and spaces', () => {
  assert.equal(slugify('Tónlist'), 'tonlist');
  assert.equal(slugify('Íslensk bókmenntir'), 'islensk-bokmenntir');
  assert.equal(slugify('Ævintýri & Þjóðsögur'), 'aevintyri-thjodsogur');
});
