import { Token, TokenType, Production, Node } from '@/dragon2/definitions';

// Pseudo-constructor but we don't want a class
function newNode(type: Production | TokenType, parent?: Node): Node
{
  return {
    type,
    parent,
    children: [],
  };
}

let tokens: Token[];

function expr(parent?: Node): Node
{
  const node = newNode(Production.Expr, parent);

  const leftChild = term(node);
  const rightChild = rest(node);

  node.children.push(leftChild);
  node.children.push(rightChild);

  return node;
}

function rest(parent: Node): Node
{
  const node = newNode(Production.Rest, parent);

  if (tokens.length === 0)
  {
    return node;
  }
  else if (tokens[0].type === TokenType.BinOp)
  {
    const leftChild = newNode(TokenType.BinOp, node);
    leftChild.data = tokens[0].val;
    tokens.shift();

    const middleChild = term(node);
    const rightChild = rest(node);

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

function term(parent: Node): Node
{
  const node = newNode(Production.Term, parent);

  if (tokens[0].type === TokenType.Number)
  {
    const child = newNode(TokenType.Number, node);
    child.data = tokens[0].val;

    node.children.push(child);
    tokens.shift();
  }
  else
  {
    throw new Error('Syntax Error');
  }

  return node;
}

export function parse(input: Token[]): Node
{
  tokens = input;

  return expr();
}
