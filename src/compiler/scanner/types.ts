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
  CommentKeyword,
  BlockCommentKeyword,
  DocCommentKeyword,
  TrueKeyword,
  FalseKeyword,
  StringLiteral,
  // ArrowKeyword,
}
