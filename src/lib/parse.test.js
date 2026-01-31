import test from 'node:test';
import assert from 'node:assert/strict';
import { parseQuestions } from './parse.js';

test('parseQuestions parses valid lines and ignores invalid', () => {
  const csv =
    '6,Tónlist,2,2,"Hvaða hljómsveit gerði lagið ""Rangur maður""",Sólstrandargæjarnir\n' +
    '6,Tónlist,2,,"Hver kvað ""Smíða skútu""",Bjartmar Guðlaugsson\n' +
    'bad,line,missing,fields\n' +
    ',,,,"",\n';

  const { questions, invalidRows } = parseQuestions(csv);

  assert.equal(questions.length, 2);
  assert.ok(invalidRows >= 2);

  assert.equal(questions[0].category, 'Tónlist');
  assert.match(questions[0].question, /Rangur maður/);
  assert.equal(questions[0].answer, 'Sólstrandargæjarnir');
});
