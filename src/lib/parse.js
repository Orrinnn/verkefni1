import { parseCsvLine } from './parseCsvLine.js';

/**
 * CSV format (no header) appears to be:
 * 0: set/collection (number)
 * 1: category (string)
 * 2: difficulty (number or empty)
 * 3: quality (number or empty)
 * 4: question (string)
 * 5: answer (string)
 */
export function parseQuestions(csvText) {
  const lines = csvText.split(/\r?\n/);
  const questions = [];
  let invalidRows = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i];
    if (!raw || raw.trim() === '') continue;

    let fields;
    try {
      fields = parseCsvLine(raw);
    } catch {
      invalidRows += 1;
      // Log a small hint but not the entire giant line
      console.warn(`Invalid CSV row at line ${i + 1}`);
      continue;
    }

    if (!fields || fields.length < 6) {
      invalidRows += 1;
      console.warn(`Invalid CSV row (too few fields) at line ${i + 1}`);
      continue;
    }

    const set = toInt(fields[0]);
    const category = (fields[1] ?? '').trim();
    const difficulty = toInt(fields[2]);
    const quality = toInt(fields[3]);
    const question = (fields[4] ?? '').trim();
    const answer = (fields[5] ?? '').trim();

    if (!category || !question || !answer) {
      invalidRows += 1;
      console.warn(`Invalid CSV row (missing required) at line ${i + 1}`);
      continue;
    }

    questions.push({
      set,
      category,
      difficulty,
      quality,
      question,
      answer,
      // keep original line number for debugging if needed
      line: i + 1,
    });
  }

  return { questions, invalidRows };
}

function toInt(value) {
  const v = String(value ?? '').trim();
  if (v === '') return null;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}
