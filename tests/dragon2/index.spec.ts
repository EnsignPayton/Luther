import { lex, parse, convert, postfix } from '@/dragon2';

// Putting all the pieces together
describe('dragon2', () =>
{
  const runTest = (input: string, expected: string) =>
  {
    const tokens = lex(input);
    const parseTree = parse(tokens);
    const syntaxTree = convert(parseTree);
    const actual = postfix(syntaxTree);
    expect(actual).toBe(expected);
  };

  it('has all the pieces', () =>
  {
    expect(lex).toBeDefined();
    expect(parse).toBeDefined();
    expect(convert).toBeDefined();
    expect(postfix).toBeDefined();
  });

  it('passes a number straight through', () =>
  {
    const input = '1';
    const expected = '1';
    runTest(input, expected);
  });

  it('converts simple expression', () =>
  {
    const input = '9-5+2';
    const expected = '95-2+';
    runTest(input, expected);
  });
});
