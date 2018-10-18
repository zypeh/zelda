// export interface Token {
//   kind: SyntaxSet,
//   parent: Token,
//   pos: number,
//   end: number
// }

/**
 * Much alike typescript's SyntaxKind,
 * Contains statements and language semantics
 */
export const enum SyntaxSet {
  Unknown,
  EndOfFileToken,
  NewlineToken,
  WhiteSpaceToken,
  CommentKeyword,
  BlockCommentKeyword,
  DocCommentKeyword,
  TrueKeyword,
  FalseKeyword,
  StringLiteral,
  CharLiteral,
  IntegerLiteral,
  FloatLiteral,
  AssignKeyword,
  FatArrowKeyword,
  OpenParenKeyword,
  CloseParenKeyword,
  OpenBraceKeyword,
  CloseBraceKeyword,
  OpenBracketKeyword,
  CloseBracketKeyword,
}
