/**
 * Type of objects whose values are all of the same type.
 * The `in` and `for-in` operators can *not* be safely used,
 * since `Object.prototype` may be modified by outside code.
 *
 * Inspired by Typescript and [kodebox-io/language](https://github.com/kodebox-io/language-solidity/blob/master/src/compiler/types.ts)
 */
export interface MapLike<T> {
  [index: string]: T;
}

export interface Token {
  kind: SyntaxSet,
  parent: Token,
  pos: number,
  end: number
}

/**
 * Much alike typescript's SyntaxKind,
 * Contains statements and language semantics
 */
export const enum SyntaxSet {
  Unknown,
  AssignKeyword,
  TypeDeclKeyword,
  TrueKeyword,
  FalseKeyword,
  CommentKeyword,
  DocCommentKeyword,
  EndOfFileToken,
  NewlineToken,
  // BlockCommentKeyword,
  // ArrowKeyword,
}
