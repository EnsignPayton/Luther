import { Node, TokenType } from '@/dragon2/definitions';

let result: string[];

function postfixNumber(node: Node)
{
  if (node.type === TokenType.Number && node.data)
  {
    result.push(node.data);
  }
  else
  {
    throw new Error('Syntax Error');
  }
}

function postfixBinOp(node: Node)
{
  if (node.type === TokenType.BinOp && node.data)
  {
    const lhs = node.children[0];
    const rhs = node.children[1];

    // Handle Left
    if (lhs.type === TokenType.BinOp)
    {
      postfixBinOp(lhs);
    }
    else if (lhs.type === TokenType.Number)
    {
      postfixNumber(lhs);
    }
    else
    {
      throw new Error('Syntax Error');
    }

    // Handle Right
    if (rhs.type === TokenType.BinOp)
    {
      postfixBinOp(rhs);
    }
    else if (rhs.type === TokenType.Number)
    {
      postfixNumber(rhs);
    }
    else
    {
      throw new Error('Syntax Error');
    }

    result.push(node.data);
  }
  else
  {
    throw new Error('Syntax Error');
  }
}

export function postfix(tree?: Node): string
{
  if (!tree)
  {
    return '';
  }

  result = [];

  if (tree.type === TokenType.BinOp)
  {
    postfixBinOp(tree);
  }
  else if (tree.type === TokenType.Number)
  {
    postfixNumber(tree);
  }
  else
  {
    throw new Error('Syntax Error');
  }

  return result.join('');
}
