import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { parseQuestions } from './lib/parse.js';
import { slugify } from './lib/slug.js';
import { groupByCategory, selectUpTo100PerCategory } from './lib/select.js';
import { renderIndex, renderCategoryPage } from './lib/html.js';

async function main() {
  console.log('generating...');

  await mkdir('dist', { recursive: true });

  const csv = await readFile('data/questions.csv', 'utf-8');
  const { questions, invalidRows } = parseQuestions(csv);

  if (invalidRows > 0) {
    console.warn(`Ignored invalid rows: ${invalidRows}`);
  }
  console.log(`Parsed questions: ${questions.length}`);

  const grouped = groupByCategory(questions);
  const selected = selectUpTo100PerCategory(grouped);

  const categories = Object.keys(selected)
    .sort((a, b) => a.localeCompare(b, 'is'))
    .map((name) => {
      const slug = slugify(name);
      return {
        name,
        slug,
        count: selected[name].length,
      };
    });

  const indexHtml = renderIndex(categories);
  await writeFile('dist/index.html', indexHtml, 'utf-8');

  // Generate each category page
  for (const cat of categories) {
    const catQuestions = selected[cat.name];
    const pageHtml = renderCategoryPage(cat.name, cat.slug, catQuestions);
    await writeFile(`dist/${cat.slug}.html`, pageHtml, 'utf-8');
  }

  console.log(`Generated ${categories.length} category pages + index.html`);
}

main().catch((error) => {
  console.error('error generating', error);
  process.exitCode = 1;
});
