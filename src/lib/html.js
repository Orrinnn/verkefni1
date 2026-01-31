export function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderIndex(categories) {
  const items = categories
    .map(
      (c) =>
        `<li><a href="./${escapeHtml(c.slug)}.html">${escapeHtml(c.name)}</a> <span class="muted">(${c.count})</span></li>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Spurningavefur</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="container">
      <h1>Spurningavefur</h1>
      <p class="muted">Veldu flokk:</p>
      <ul class="category-list">
        ${items}
      </ul>
    </main>
  </body>
</html>
`;
}

export function renderCategoryPage(categoryName, categorySlug, questions) {
  const cards = questions
    .map((q, idx) => renderQuestionCard(q, idx + 1))
    .join('\n');

  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(categoryName)}</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="container">
      <nav class="topbar">
        <a href="./index.html">← Til baka</a>
      </nav>

      <header class="header">
        <h1>${escapeHtml(categoryName)}</h1>
        <div class="scoreboard" aria-live="polite">
          <span>Rétt: <strong id="correctCount">0</strong></span>
          <span>Rangt: <strong id="wrongCount">0</strong></span>
        </div>
      </header>

      <section class="questions" data-category="${escapeHtml(categorySlug)}">
        ${cards}
      </section>
    </main>

    <script src="./scripts.js"></script>
  </body>
</html>
`;
}

function renderQuestionCard(q, number) {
  const question = escapeHtml(q.question);
  const answer = escapeHtml(q.answer);

  return `<article class="card" data-question>
  <h2 class="q-title">Spurning ${number}</h2>
  <p class="q-text">${question}</p>

  <div class="answer-block">
    <button type="button" class="btn" data-show-answer>Sýna svar</button>
    <p class="answer" data-answer hidden>${answer}</p>
  </div>

  <div class="mark-block">
    <button type="button" class="btn btn-good" data-mark="correct" disabled>Rétt</button>
    <button type="button" class="btn btn-bad" data-mark="wrong" disabled>Rangt</button>
  </div>
</article>`;
}
