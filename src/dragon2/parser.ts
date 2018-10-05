import { Token, TokenType, Production, Node } from '@/dragon2/definitions';

function newNode(type: Production | TokenType, parent?: Node): Node
{
  return {
    type,
    parent,
    children: [],
  };
}

class Parser
{
  private tokens: Token[];

  constructor(tokens1: Token[])
  {
    this.tokens = tokens1;
  }

  private get next(): Token | undefined
  {
    return this.tokens[0];
  }

  public parse(): Node | undefined
  {
    if (!this.next)
    {
      return undefined;
    }

    return this.expr();
  }

  private expr(parent?: Node): Node
  {
    const node = newNode(Production.Expr, parent);

    const leftChild = this.term(node);
    const rightChild = this.rest(node);

    node.children.push(leftChild);
    node.children.push(rightChild);

    return node;
  }

  private rest(parent: Node): Node
  {
    const node = newNode(Production.Rest, parent);

    if (!this.next)
    {
      return node;
    }
    else if (this.next.type === TokenType.BinOp)
    {
      const leftChild = newNode(TokenType.BinOp, node);
      leftChild.data = this.next.val;
      this.tokens.shift();

      const middleChild = this.term(node);
      const rightChild = this.rest(node);

      node.children.push(leftChild);
      node.children.push(middleChild);
      node.children.push(rightChild);
    }
    else
    {
      throw new Error('Syntax Error');
    }

    return node;
  }

  private term(parent: Node): Node
  {
    const node = newNode(Production.Term, parent);

    if (this.next && this.next.type === TokenType.Number)
    {
      const child = newNode(TokenType.Number, node);
      child.data = this.next.val;

      node.children.push(child);
      this.tokens.shift();
    }
    else
    {
      throw new Error('Syntax Error');
    }

    return node;
  }
}

export function parse(input: Token[]): Node | undefined
{
  const parser = new Parser(input);
  return parser.parse();
}
