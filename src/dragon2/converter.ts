import { Node, Production } from '@/dragon2/definitions';

function convertRest(rest: Node, lhs: Node): Node
{
  if (rest.children.length === 0)
  {
    lhs.parent = undefined;
    return lhs;
  }

  const node = rest.children[0];

  node.children.push(lhs);
  lhs.parent = node;

  const term = rest.children[1];
  const rhs = term.children[0];

  node.children.push(rhs);
  rhs.parent = node;

  const childRest = rest.children[2];

  return convertRest(childRest, node);
}

function convertExpr(expr: Node): Node
{
  const term = expr.children[0];
  const value = term.children[0];
  value.parent = undefined;

  const rest = expr.children[1];

  return convertRest(rest, value);
}

export function convert(tree?: Node): Node | undefined
{
  if (!tree)
  {
    return undefined;
  }

  if (tree.type === Production.Expr)
  {
    return convertExpr(tree);
  }
  else
  {
    throw new Error('Syntax Error');
  }
}
