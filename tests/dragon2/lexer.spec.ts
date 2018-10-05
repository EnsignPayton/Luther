import { lex, Token, TokenType } from '@/dragon2/lexer';

describe('lex', () =>
{
  it('exists', () =>
  {
    expect(lex).toBeDefined();
  });

  it('returns empty for empty input', () =>
  {
    const input = '';
    const expected: Token[] = [];
    const actual = lex(input);
    expect(actual).toStrictEqual(expected);
  });

  it('gets a single number', () =>
  {
    const input = '3';
    const expected = [{ type: TokenType.Number, val: input }];
    const actual = lex(input);
    expect(actual).toStrictEqual(expected);
  });

  it('gets a single operator', () =>
  {
    const input = '+';
    const expected = [{ type: TokenType.BinOp, val: input }];
    const actual = lex(input);
    expect(actual).toStrictEqual(expected);
  });

  it('gets a short expression', () =>
  {
    const input = '9+5-2';
    const expected = [
      { type: TokenType.Number, val: input[0] },
      { type: TokenType.BinOp, val: input[1] },
      { type: TokenType.Number, val: input[2] },
      { type: TokenType.BinOp, val: input[3] },
      { type: TokenType.Number, val: input[4] },
    ];
    const actual = lex(input);
    expect(actual).toStrictEqual(expected);
  });
});
