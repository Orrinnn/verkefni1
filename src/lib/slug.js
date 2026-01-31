export function slugify(input) {
  const s = String(input ?? '').trim().toLowerCase();

  // Icelandic -> ascii-ish
  const map = new Map([
    ['á', 'a'],
    ['à', 'a'],
    ['ä', 'a'],
    ['â', 'a'],
    ['é', 'e'],
    ['ë', 'e'],
    ['ê', 'e'],
    ['í', 'i'],
    ['ï', 'i'],
    ['î', 'i'],
    ['ó', 'o'],
    ['ö', 'o'],
    ['ô', 'o'],
    ['ú', 'u'],
    ['ü', 'u'],
    ['û', 'u'],
    ['ý', 'y'],
    ['ÿ', 'y'],
    ['ð', 'd'],
    ['þ', 'th'],
    ['æ', 'ae'],
  ]);

  const replaced = [...s]
    .map((c) => (map.has(c) ? map.get(c) : c))
    .join('');

  // replace non-alnum with dashes
  const dashed = replaced
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return dashed || 'flokkur';
}
