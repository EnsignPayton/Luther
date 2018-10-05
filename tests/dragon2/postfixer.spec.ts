import { postfix, Node, TokenType } from '@/dragon2';

describe('postfix', () =>
{
  it('exists', () =>
  {
    expect(postfix).toBeDefined();
  });

  it('handles single number', () =>
  {
    const input: Node =
    {
      type: TokenType.Number,
      data: '1',
      children: [],
    };
    const expected = '1';
    const actual = postfix(input);
    expect(actual).toBe(expected);
  });

  it('handles simple expression', () =>
  {
    const input: Node =
    {
      type: TokenType.BinOp,
      data: '+',
      children: [],
    };
    const expMinus: Node =
    {
      type: TokenType.BinOp,
      parent: input,
      data: '-',
      children: [],
    };
    const exp2: Node =
    {
      type: TokenType.Number,
      parent: input,
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

    input.children.push(expMinus);
    input.children.push(exp2);
    expMinus.children.push(exp9);
    expMinus.children.push(exp5);

    const expected = '95-2+';
    const actual = postfix(input);
    expect(actual).toBe(expected);
  });
});
