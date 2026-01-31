function byId(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id}`);
  return el;
}

function main() {
  const correctEl = byId('correctCount');
  const wrongEl = byId('wrongCount');

  let correct = 0;
  let wrong = 0;

  function renderCounts() {
    correctEl.textContent = String(correct);
    wrongEl.textContent = String(wrong);
  }

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    // Show answer
    if (t.matches('[data-show-answer]')) {
      const card = t.closest('[data-question]');
      if (!card) return;

      const answer = card.querySelector('[data-answer]');
      if (!(answer instanceof HTMLElement)) return;

      answer.hidden = false;
      t.setAttribute('disabled', 'disabled');

      const correctBtn = card.querySelector('[data-mark="correct"]');
      const wrongBtn = card.querySelector('[data-mark="wrong"]');

      if (correctBtn instanceof HTMLButtonElement) correctBtn.disabled = false;
      if (wrongBtn instanceof HTMLButtonElement) wrongBtn.disabled = false;
      return;
    }

    // Mark correct/wrong
    if (t.matches('[data-mark="correct"], [data-mark="wrong"]')) {
      const card = t.closest('[data-question]');
      if (!card) return;

      const mark = t.getAttribute('data-mark');
      const correctBtn = card.querySelector('[data-mark="correct"]');
      const wrongBtn = card.querySelector('[data-mark="wrong"]');

      if (correctBtn instanceof HTMLButtonElement) correctBtn.disabled = true;
      if (wrongBtn instanceof HTMLButtonElement) wrongBtn.disabled = true;

      // Prevent double counting
      if (card.hasAttribute('data-marked')) return;
      card.setAttribute('data-marked', 'true');

      if (mark === 'correct') {
        correct += 1;
        card.classList.add('marked-correct');
      } else {
        wrong += 1;
        card.classList.add('marked-wrong');
      }
      renderCounts();
    }
  });

  renderCounts();
}

main();
