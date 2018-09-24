export enum TokenType {
  // Identifiers
  Identifier,
  // Keywords
  KeywordAnd,
  KeywordBreak,
  KeywordDo,
  KeywordElse,
  KeywordElseIf,
  KeywordEnd,
  KeywordFalse,
  KeywordFor,
  KeywordFunction,
  KeywordIf,
  KeywordIn,
  KeywordLocal,
  KeywordNil,
  KeywordNot,
  KeywordOr,
  KeywordRepeat,
  KeywordReturn,
  KeywordThen,
  KeywordTrue,
  KeywordUntil,
  KeywordWhile,
  // Comments
  CommentSingle,
  CommentMultiple,
  // Literals
  LiteralNumber,
  LiteralString,
  // Open / Close Brackets
  BracketOpen,            // [
  BracketClose,           // ]
  BraceOpen,              // {
  BraceClose,             // }
  ParenOpen,              // (
  ParenClose,             // )
  // Unary / Binary Operators
  OpAdd,                  // +
  OpSub,                  // -
  OpMult,                 // *
  OpDiv,                  // /
  OpExp,                  // ^
  OpConcat,               // ..
  OpLength,               // #
  // Relational Operators
  RelOpLessThan,          // >
  RelOpGreaterThan,       // <
  RelOpLessThanEqual,     // <=
  RelOpGreaterThanEqual,  // >=
  RelOpEqual,             // ==
  RelOpNotEqual,          // ~=
  // Other
  Semicolon,              // ;
  Dot,                    // .
  Comma,                  // ,
  Assignment,             // =
  Colon,                  // :
  VarArg,                 // ...
}

export const keywords: {[key: string]: TokenType} = {
  and: TokenType.KeywordAnd,
  break: TokenType.KeywordBreak,
  do: TokenType.KeywordDo,
  else: TokenType.KeywordElse,
  elseif: TokenType.KeywordElseIf,
  end: TokenType.KeywordEnd,
  false: TokenType.KeywordFalse,
  for: TokenType.KeywordFor,
  function: TokenType.KeywordFunction,
  if: TokenType.KeywordIf,
  in: TokenType.KeywordIn,
  local: TokenType.KeywordLocal,
  nil: TokenType.KeywordNil,
  not: TokenType.KeywordNot,
  or: TokenType.KeywordOr,
  repeat: TokenType.KeywordRepeat,
  return: TokenType.KeywordReturn,
  then: TokenType.KeywordThen,
  true: TokenType.KeywordTrue,
  until: TokenType.KeywordUntil,
  while: TokenType.KeywordWhile,
};

export const keychars: {[key: string]: TokenType} = {
  '[': TokenType.BracketOpen,
  ']': TokenType.BracketClose,
  '{': TokenType.BraceOpen,
  '}': TokenType.BraceClose,
  '(': TokenType.ParenOpen,
  ')': TokenType.ParenClose,
  '+': TokenType.OpAdd,
  '-': TokenType.OpSub,
  '*': TokenType.OpMult,
  '/': TokenType.OpDiv,
  '^': TokenType.OpExp,
  '..': TokenType.OpConcat,
  '#': TokenType.OpLength,
  '<': TokenType.RelOpLessThan,
  '>': TokenType.RelOpGreaterThan,
  '<=': TokenType.RelOpLessThanEqual,
  '>=': TokenType.RelOpGreaterThanEqual,
  '==': TokenType.RelOpEqual,
  '~=': TokenType.RelOpNotEqual,
  ';': TokenType.Semicolon,
  '.': TokenType.Dot,
  ',': TokenType.Comma,
  '=': TokenType.Assignment,
  ':': TokenType.Colon,
  '...': TokenType.VarArg,
};

export default interface Token {
  type: TokenType;
  value?: any;
}
