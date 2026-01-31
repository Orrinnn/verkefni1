export function groupByCategory(questions) {
  const grouped = new Map();

  for (const q of questions) {
    const key = q.category;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(q);
  }

  // return as plain object for simpler iteration
  const obj = {};
  for (const [k, v] of grouped.entries()) {
    obj[k] = v;
  }
  return obj;
}

/**
 * Select up to 100 per category.
 * Prefer entries with higher quality, then higher difficulty, otherwise stable.
 */
export function selectUpTo100PerCategory(grouped) {
  const out = {};
  for (const [category, list] of Object.entries(grouped)) {
    const sorted = [...list].sort((a, b) => {
      const aq = a.quality ?? -1;
      const bq = b.quality ?? -1;
      if (bq !== aq) return bq - aq;

      const ad = a.difficulty ?? -1;
      const bd = b.difficulty ?? -1;
      if (bd !== ad) return bd - ad;

      return (a.line ?? 0) - (b.line ?? 0);
    });

    out[category] = sorted.slice(0, 100);
  }
  return out;
}
