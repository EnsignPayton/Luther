import { Token, TokenType } from '@/dragon2/definitions';

const numbers: string[] = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

const binops: string[] =
[
  '+', '-',
];

export function lex(input: string): Token[]
{
  const result: Token[] = [];
  while (input.length)
  {
    const char = input[0];
    if (numbers.includes(char))
    {
      result.push({ type: TokenType.Number, val: char });
    }
    else if (binops.includes(char))
    {
      result.push({ type: TokenType.BinOp, val: char });
    }
    else
    {
      result.push({ type: TokenType.Error, val: char });
    }

    input = input.substr(1);
  }

  return result;
}
