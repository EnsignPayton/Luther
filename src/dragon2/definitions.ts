export enum TokenType
{
  Number = 'number',
  BinOp = 'binop',
  Error = 'error',
}

export interface Token
{
  type: TokenType;
  val?: string;
}

export enum Production
{
  Expr = 'expr',
  Rest = 'rest',
  Term = 'term',
}

export interface Node
{
  type: Production | TokenType;
  data?: any;
  parent?: Node;
  children: Node[];
}
