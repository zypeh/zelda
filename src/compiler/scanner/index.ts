import { SyntaxSet } from "./types";
import { CharacterCodes, isLineBreak, isWhiteSpaceLike } from "./characters";
import { TokenState } from "./states";

const debug = require('debug')('compiler:scanner')

export class Scanner {
  private inputText: string  = ''
  private position: number = 0
  private tokState: TokenState = TokenState.None

  public createScanner() {
    return {
      inputText: this.inputText,
      position: this.position,
    }
  }

  public getTokState(): TokenState {
    return this.tokState
  }

  public setText(str: string): void {
    this.inputText = str
  }

  public scan(): SyntaxSet {
    const input = this.inputText
    const end = this.inputText.length

    if (this.position >= end)
      return SyntaxSet.EndOfFileToken

    const c = input.charCodeAt(this.position)
    switch(c) {

      case CharacterCodes.lineFeed:
      case CharacterCodes.carriageReturn:
      case CharacterCodes.lineSeparator:
      case CharacterCodes.paragraphSeparator:
        // Newline
        debug('<newline>')
        this.position++
        return SyntaxSet.NewlineToken

      case CharacterCodes.slash:
        if (input.charCodeAt(this.position + 1) === CharacterCodes.asterisk) {
          // Comment block
          this.tokState |= TokenState.Unterminated
          this.position += 2
          while (this.position < end) {

            if (input.charCodeAt(this.position) === CharacterCodes.asterisk &&
              input.charCodeAt(this.position + 1) === CharacterCodes.slash &&
              (isWhiteSpaceLike(input.charCodeAt(this.position + 2)) || (this.position + 2) >= end))
            {
              this.position += 2
              this.tokState &= ~TokenState.Unterminated
              break
            }

            this.position++
          }
          debug('<block comment>')
          return SyntaxSet.BlockCommentKeyword
        }

        if (input.charCodeAt(this.position + 1) === CharacterCodes.slash) {
          if (input.charCodeAt(this.position + 2) === CharacterCodes.slash) {
            // Documentation comment
            this.position += 3
            while (this.position < end) {
              if (isLineBreak(input.charCodeAt(this.position)))
                break

              this.position++
            }
            debug('<doc comment>')
            return SyntaxSet.DocCommentKeyword
          }

          // Single-line comment
          this.position += 2
          while (this.position < end) {

            if (isLineBreak(input.charCodeAt(this.position)))
              break

            this.position++
          }
          debug("<comment>")
          return SyntaxSet.CommentKeyword
        }

        // true
        case CharacterCodes.t:
          if (input.charCodeAt(this.position + 1) === CharacterCodes.r &&
            input.charCodeAt(this.position + 2) === CharacterCodes.u &&
            input.charCodeAt(this.position + 3) === CharacterCodes.e &&
            (isWhiteSpaceLike(input.charCodeAt(this.position + 4)) || (this.position + 4) >= end))
          {
            this.position += 4
            debug('<true>')
            return SyntaxSet.TrueKeyword
          }

        // false
        case CharacterCodes.f:
          if (input.charCodeAt(this.position + 1) === CharacterCodes.a &&
            input.charCodeAt(this.position + 2) === CharacterCodes.l &&
            input.charCodeAt(this.position + 3) === CharacterCodes.s &&
            input.charCodeAt(this.position + 4) === CharacterCodes.e &&
            (isWhiteSpaceLike(input.charCodeAt(this.position + 5)) || (this.position + 5) >= end))
          {
            this.position += 5
            debug('<false>')
            return SyntaxSet.FalseKeyword
          }

      /**
       * Unimplemented
       */
      default:
        debug('<unimplemented> at [' + this.position + ']')
        this.position++
        return SyntaxSet.Unknown

    }
  }
}
