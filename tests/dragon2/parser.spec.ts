import { parse, Token, TokenType, Production, Node } from '@/dragon2';

describe('parse', () =>
{
  it('exists', () =>
  {
    expect(parse).toBeDefined();
  });

  it('handles empty', () =>
  {
    const input: Token[] = [];
    const actual = parse(input);
    expect(actual).toBeUndefined();
  });

  // expr
  // |   \
  // |    \
  // term  rest
  // |     |
  // 1     x
  it('handles single number', () =>
  {
    const input = [
      { type: TokenType.Number, val: '1' },
    ];
    const expected: Node =
    {
      type: Production.Expr,
      children: [],
    };
    const term: Node =
    {
      type: Production.Term,
      parent: expected,
      children: [],
    };
    const value: Node =
    {
      type: TokenType.Number,
      parent: term,
      data: '1',
      children: [],
    };
    const rest: Node =
    {
      type: Production.Rest,
      parent: expected,
      children: [],
    };

    expected.children.push(term);
    expected.children.push(rest);
    term.children.push(value);

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });

  // expr
  // |   \
  // |    \
  // term  rest___
  // |     |  |   \
  // |     |  |    \
  // 9     -  term  rest___
  //          |     |  |   \
  //          |     |  |    \
  //          5     +  term  rest
  //                   |     |
  //                   |     |
  //                   2     x
  it('handles basic expression', () =>
  {
    const input = [
      { type: TokenType.Number, val: '9' },
      { type: TokenType.BinOp, val: '-' },
      { type: TokenType.Number, val: '5' },
      { type: TokenType.BinOp, val: '+' },
      { type: TokenType.Number, val: '2' },
    ];
    const expected: Node =
    {
      type: Production.Expr,
      children: [],
    };
    const term1: Node =
    {
      type: Production.Term,
      parent: expected,
      children: [],
    };
    const val1: Node =
    {
      type: TokenType.Number,
      parent: term1,
      data: '9',
      children: [],
    };
    const rest1: Node =
    {
      type: Production.Rest,
      parent: expected,
      children: [],
    };
    const op1: Node =
    {
      type: TokenType.BinOp,
      parent: rest1,
      data: '-',
      children: [],
    };
    const term2: Node =
    {
      type: Production.Term,
      parent: rest1,
      children: [],
    };
    const rest2: Node =
    {
      type: Production.Rest,
      parent: rest1,
      children: [],
    };
    const val2: Node =
    {
      type: TokenType.Number,
      parent: term2,
      data: '5',
      children: [],
    };
    const op2: Node =
    {
      type: TokenType.BinOp,
      parent: rest2,
      data: '+',
      children: [],
    };
    const term3: Node =
    {
      type: Production.Term,
      parent: rest2,
      children: [],
    };
    const rest3: Node =
    {
      type: Production.Rest,
      parent: rest2,
      children: [],
    };
    const val3: Node =
    {
      type: TokenType.Number,
      parent: term3,
      data: '2',
      children: [],
    };

    expected.children.push(term1);
    expected.children.push(rest1);
    term1.children.push(val1);
    rest1.children.push(op1);
    rest1.children.push(term2);
    rest1.children.push(rest2);
    term2.children.push(val2);
    rest2.children.push(op2);
    rest2.children.push(term3);
    rest2.children.push(rest3);
    term3.children.push(val3);

    const actual = parse(input);
    expect(actual).toEqual(expected);
  });
});
