import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, renderIndex, renderCategoryPage } from './html.js';

test('escapeHtml escapes unsafe chars', () => {
  assert.equal(escapeHtml('<script>"&</script>'), '&lt;script&gt;&quot;&amp;&lt;/script&gt;');
});

test('renderIndex includes category links', () => {
  const html = renderIndex([{ name: 'Tónlist', slug: 'tonlist', count: 2 }]);
  assert.match(html, /tonlist\.html/);
  assert.match(html, /Tónlist/);
});

test('renderCategoryPage includes counters and script', () => {
  const html = renderCategoryPage('Tónlist', 'tonlist', [
    { question: 'Q1', answer: 'A1' },
  ]);
  assert.match(html, /id="correctCount"/);
  assert.match(html, /scripts\.js/);
  assert.match(html, /Sýna svar/);
});
