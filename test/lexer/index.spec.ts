import { expect } from 'chai';
import { lex } from '../../src/lexer';
import { TokenType } from '../../src/lexer/token';

interface CommentArgs {
  comment: string;
  format: (text: string) => string;
  tokenType: TokenType;
  expectedComment?: string;
}

function expectComment({comment, format, tokenType, expectedComment}: CommentArgs): void {
  const input = format(comment);
  const expected = [{type: tokenType, value: expectedComment || comment}];
  const actual = lex(input);
  expect(actual).to.eql(expected);
}

function expectCommentMulti(comment: string): void {
  expectComment({
    comment,
    format: (s) => `--[[${s}]]`,
    tokenType: TokenType.CommentMultiple,
  });
}

function expectCommentSingle(comment: string): void {
  expectComment({
    comment,
    format: (s) => `--${s}`,
    tokenType: TokenType.CommentSingle,
  });
}

describe('lexer.lex', () => {
  it('exists', () => {
    expect(lex).to.not.equal(undefined);
  });

  it('lexes block comments', () => {
    const comment = ' This is a comment ';
    expectCommentMulti(comment);
  });

  it('lexes block comments multiline', () => {
    const comment = `
    Multi
    Line
    Commenting
    `;
    expectCommentMulti(comment);
  });

  it('lexes line comments', () => {
    const comment = ' This is a comment ';
    expectCommentSingle(comment);
  });

  it('prefers single line comment on first line', () => {
    const comment = ` Comment --[[
      Inside comment
    ]]`;
    const input = `--${comment}`;
    const expected = [
      {type: TokenType.CommentSingle, value: ' Comment --[['},
      {type: TokenType.Identifier, value: 'Inside'},
      {type: TokenType.Identifier, value: 'comment'},
      {type: TokenType.BracketClose},
      {type: TokenType.BracketClose},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });

  it('lexes keywords', () => {
    const input = 'and if end';
    const expected = [
      {type: TokenType.KeywordAnd},
      {type: TokenType.KeywordIf},
      {type: TokenType.KeywordEnd},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });

  it('lexes symbols', () => {
    const input = '*/+- .. # ~= ...{)';
    const expected = [
      {type: TokenType.OpMult},
      {type: TokenType.OpDiv},
      {type: TokenType.OpAdd},
      {type: TokenType.OpSub},
      {type: TokenType.OpConcat},
      {type: TokenType.OpLength},
      {type: TokenType.RelOpNotEqual},
      {type: TokenType.VarArg},
      {type: TokenType.BraceOpen},
      {type: TokenType.ParenClose},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });

  it('lexes identifiers', () => {
    const input = 'hello world';
    const expected = [
      {type: TokenType.Identifier, value: 'hello'},
      {type: TokenType.Identifier, value: 'world'},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });

  it ('lexes numbers', () => {
    const input = '1 20 3.14159 4.57e-3 0.3e12 5e+20';
    const expected = [
      {type: TokenType.LiteralNumber, value: '1'},
      {type: TokenType.LiteralNumber, value: '20'},
      {type: TokenType.LiteralNumber, value: '3.14159'},
      {type: TokenType.LiteralNumber, value: '4.57e-3'},
      {type: TokenType.LiteralNumber, value: '0.3e12'},
      {type: TokenType.LiteralNumber, value: '5e+20'},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });

  it('lexes strings', () => {
    const input = ' \'string 1\' "string 2" [[string 3]] ';
    const expected = [
      {type: TokenType.LiteralString, value: 'string 1'},
      {type: TokenType.LiteralString, value: 'string 2'},
      {type: TokenType.LiteralString, value: 'string 3'},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });

  it('lexes multiline strings', () => {
    const input = `[[
      hello world
    ]]`;
    const expected = [
      {type: TokenType.LiteralString, value: input.substr(2, input.length - 4)},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });

  it('handles a function definition', () => {
    const input = `
    local function foo(bar)
      return bar + 1
    end`;
    const expected = [
      {type: TokenType.KeywordLocal},
      {type: TokenType.KeywordFunction},
      {type: TokenType.Identifier, value: 'foo'},
      {type: TokenType.ParenOpen},
      {type: TokenType.Identifier, value: 'bar'},
      {type: TokenType.ParenClose},
      {type: TokenType.KeywordReturn},
      {type: TokenType.Identifier, value: 'bar'},
      {type: TokenType.OpAdd},
      {type: TokenType.LiteralNumber, value: '1'},
      {type: TokenType.KeywordEnd},
    ];
    const actual = lex(input);
    expect(actual).to.eql(expected);
  });
});
