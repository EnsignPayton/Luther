import Token, { keychars, keywords, TokenType } from './token';

type ResultTuple = [string, Token | null];

function testRegexp(input: string, regexp: RegExp): string | null {
  const res = regexp.exec(input);
  return res !== null ? res[0] : null;
}

function extract(input: string, text: string | null, token: Token): ResultTuple {
  return text !== null ? [input.substr(text.length), token] : [input, null];
}

function extractToken(text: string | null, fromStart: number, fromEnd: number, tokenType: TokenType): Token {
  const innerText = text && text.substr(fromStart, text.length - (fromStart + fromEnd));
  return {type: tokenType, value: innerText};
}

function extractComment(input: string, regexp: RegExp, getToken: (text: string) => Token): ResultTuple {
  const text = testRegexp(input, regexp);
  if (text !== null) {
    const token = getToken(text);
    return [input.substr(text.length), token];
  }

  return [input, null];
}

function extractCommentMulti(input: string): ResultTuple {
  return extractComment(input, /^--\[\[[^(\]\])]*\]\]/,
    (s) => extractToken(s, 4, 2, TokenType.CommentMultiple),
  );
}

function extractCommentSingle(input: string): ResultTuple {
  return extractComment(input, /^--.*/,
    (s) => extractToken(s, 2, 0, TokenType.CommentSingle),
  );
}

function extractKeyword(input: string): ResultTuple {
  return Object.keys(keywords)
    .map((key) => {
      const regexp = new RegExp(`^${key}([^_a-zA-Z0-9]|$)`);
      const text = testRegexp(input, regexp);
      return extract(input, text, {type: keywords[key]});
    })
    .find((res) => res[1] !== null) || [input, null];
}

function extractSymbolSpecific(input: string, symbol: string): ResultTuple {
  const key = symbol.split('').map((c) => '\\' + c).join('');
  const regexp = new RegExp(`^${key}`);
  const text = testRegexp(input, regexp);
  return extract(input, text, {type: keychars[symbol]});
}

function extractSymbol(input: string): ResultTuple {
  return Object.keys(keychars)
    .map((key) => {
      const escapeKey = key.split('').map((c) => '\\' + c).join('');
      const regexp = new RegExp(`^${escapeKey}`);
      const text = testRegexp(input, regexp);
      return extract(input, text, {type: keychars[key]});
    })
    .find((res) => res[1] !== null) || [input, null];
}

function extractIdentifier(input: string): ResultTuple {
  const text = testRegexp(input, /^[_a-zA-Z][_a-zA-Z0-9]*/);
  return extract(input, text, {type: TokenType.Identifier, value: text});
}

function extractLiteralNumber(input: string): ResultTuple {
  const text = testRegexp(input, /^[0-9]+(\.[0-9]+)?((e|e\+|e\-)[0-9]+)?/);
  return extract(input, text, {type: TokenType.LiteralNumber, value: text});
}

function extractString(text: string | null, fromStart: number, fromEnd: number): Token {
  const innerText = text && text.substr(fromStart, text.length - (fromStart + fromEnd));
  return {type: TokenType.LiteralString, value: innerText};
}

function extractLiteralStringSingle(input: string): ResultTuple {
  const text = testRegexp(input, /^\'[^\n]*\'/);
  return extract(input, text, extractString(text, 1, 1));
}

function extractLiteralStringDouble(input: string): ResultTuple {
  const text = testRegexp(input, /^\"[^\n]*\"/);
  return extract(input, text, extractString(text, 1, 1));
}

function extractLiteralStringMulti(input: string): ResultTuple {
  const text = testRegexp(input, /^\[\[[^(\]\])]*\]\]/);
  return extract(input, text, extractString(text, 2, 2));
}

export function lex(input: string): Token[] {
  const tokens: Token[] = [];

  function resolve(result: ResultTuple): boolean {
    const text = result[0];
    const token = result[1];
    if (token !== null) {
      tokens.push(token);
      input = text;
      return true;
    }

    return false;
  }

  while (input && input.length) {
    // Prefer multi-line comments
    if (resolve(extractCommentMulti(input))
      || resolve(extractCommentSingle(input))
      || resolve(extractKeyword(input))
      // Literals before symbols - grab multi-line strings
      || resolve(extractLiteralNumber(input))
      || resolve(extractLiteralStringSingle(input))
      || resolve(extractLiteralStringDouble(input))
      || resolve(extractLiteralStringMulti(input))
      // Must check longer symbols first
      || resolve(extractSymbolSpecific(input, '...'))
      || resolve(extractSymbolSpecific(input, '..'))
      || resolve(extractSymbolSpecific(input, '<='))
      || resolve(extractSymbolSpecific(input, '>='))
      || resolve(extractSymbolSpecific(input, '=='))
      || resolve(extractSymbol(input))
      || resolve(extractIdentifier(input))) {
        continue;
    }

    // Skip whitespace
    if (input[0] === ' ' || input[0] === '\t' || input[0] === '\n') {
      input = input.substr(1);
      continue;
    }

    // If we've made it this far, there's an error
    // TODO: Fail gracefully
    throw new Error(`Unknown symbol ${input[0]}`);
  }

  return tokens;
}
