# Luther

Lexical Analysis in TypeScript

## Overview

_Disclaimer: This is experimental and subject to change. Also I'm using this readme as a notepad. Sorry._

The goal of this project is to construct the "front end" to a compiler for some language (probably Lua). This includes lexical analysis and syntactic analysis. The end result of this process will be an error message in the case of an invalid program, or some intermediary representation in the case of a valid program.

I envision this to take on a modular approach, containing modules similar to the following:

### Scanner

* Input: Source code string (presumably read from a *.lua file)
* Output: Array of Token objects consisting of a token type and optional token data. For example, the `local` keyword always means the same thing and needs no data, however the string '3.14' would generate a 'numerical constant' token with '3.14' as its data.

#### Stretch Goal: Symbol Table

Non-keyword identifiers such as variable names may at first be emitted as an 'identifier' token with the identifier text as the data. At some point, however, we must construct a symbol table to group related references (Function definitions and their calls, etc.). Identifier data will eventually be replaced with a reference to the identifier in the symbol table. This table will be returned (or mutated) from the scanner alongside the token stream.

### Parser

* Input: Token stream and symbol table
* Output: Abstract syntax tree

Parsing method is to be determined

## Development Process

Unit tests and production code will be developed concurrently through pseudo-TDD. Since I have never had any experience or formal training in TDD, I don't actually know if I'm doing it the right way. All I know is red-green-refactor.

All code will be written in TypeScript using ES6-style modules. The final library output will be bundled using Webpack. Unit tests will be ran using Jest.

## Subprojects

### Dragon2

This is an implementation of the basic infix-to-postfix arithmetic expression translater from chapter 2 of the "red dragon book".
