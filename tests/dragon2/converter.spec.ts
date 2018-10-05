import { convert, TokenType, Production, Node } from '@/dragon2';

describe('convert', () =>
{
  it('exists', () =>
  {
    expect(convert).toBeDefined();
  });

  // 1
  it('handles single number', () =>
  {
    const input: Node =
    {
      type: Production.Expr,
      children: [],
    };
    const term: Node =
    {
      type: Production.Term,
      parent: input,
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
      parent: input,
      children: [],
    };

    input.children.push(term);
    input.children.push(rest);
    term.children.push(value);

    const expected: Node =
    {
      type: TokenType.Number,
      data: '1',
      children: [],
    };

    const actual = convert(input);
    expect(actual).toEqual(expected);
  });

  //       +
  //      / \
  //     /   \
  //    -     2
  //   / \
  //  /   \
  // 9     5
  it('handles simple expression', () =>
  {
    const input: Node =
    {
      type: Production.Expr,
      children: [],
    };
    const term1: Node =
    {
      type: Production.Term,
      parent: input,
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
      parent: input,
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

    input.children.push(term1);
    input.children.push(rest1);
    term1.children.push(val1);
    rest1.children.push(op1);
    rest1.children.push(term2);
    rest1.children.push(rest2);
    term2.children.push(val2);
    rest2.children.push(op2);
    rest2.children.push(term3);
    rest2.children.push(rest3);
    term3.children.push(val3);

    const expected: Node =
    {
      type: TokenType.BinOp,
      data: '+',
      children: [],
    };
    const expMinus: Node =
    {
      type: TokenType.BinOp,
      parent: expected,
      data: '-',
      children: [],
    };
    const exp2: Node =
    {
      type: TokenType.Number,
      parent: expected,
      data: '2',
      children: [],
    };
    const exp9: Node =
    {
      type: TokenType.Number,
      parent: expMinus,
      data: '9',
      children: [],
    };
    const exp5: Node =
    {
      type: TokenType.Number,
      parent: expMinus,
      data: '5',
      children: [],
    };

    expected.children.push(expMinus);
    expected.children.push(exp2);
    expMinus.children.push(exp9);
    expMinus.children.push(exp5);

    const actual = convert(input);
    expect(actual).toEqual(expected);
  });
});
