import { Node, TokenType } from '@/dragon2/definitions';

class Postfixer
{
  private result: string[] = [];

  public postfix(tree?: Node): string
  {
    if (!tree)
    {
      return '';
    }

    this.result = [];

    this.handle(tree);

    return this.result.join('');
  }

  private handle(node: Node)
  {
    if (node.type === TokenType.BinOp)
    {
      this.handleBinOp(node);
    }
    else if (node.type === TokenType.Number)
    {
      this.handleNumber(node);
    }
    else
    {
      throw new Error(`Invalid node type: ${node.type}`);
    }
  }

  private handleBinOp(node: Node)
  {
    this.handle(node.children[0]);
    this.handle(node.children[1]);
    this.result.push(node.data);
  }

  private handleNumber(node: Node)
  {
    this.result.push(node.data);
  }
}

export function postfix(tree?: Node): string
{
  const postfixer = new Postfixer();
  return postfixer.postfix(tree);
}
