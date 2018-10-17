import { SyntaxSet } from "./types";
import { CharacterCodes, isLineBreak, isWhiteSpaceLike, isWhiteSpaceSingleLine, isNumber } from "./characters";
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

      case CharacterCodes.space:
      case CharacterCodes.tab:
      case CharacterCodes.verticalTab:
      case CharacterCodes.formFeed:
      case CharacterCodes.nonBreakingSpace:
      case CharacterCodes.nextLine:
      case CharacterCodes.ogham:
      case CharacterCodes.narrowNoBreakSpace:
      case CharacterCodes.mathematicalSpace:
      case CharacterCodes.ideographicSpace:
      case CharacterCodes.byteOrderMark:
        this.position++
        while (this.position < end) {
          if (!isWhiteSpaceSingleLine(input.charCodeAt(this.position)))
            break
          this.position++
        }
        debug('<space>')
        return SyntaxSet.WhiteSpaceToken

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
          let isCommentClosed: boolean = false
          this.position += 2
          while (this.position < end) {

            if (input.charCodeAt(this.position) === CharacterCodes.asterisk &&
              input.charCodeAt(this.position + 1) === CharacterCodes.slash)
            {
              this.position += 2
              isCommentClosed = true
              break
            }

            this.position++
          }
          debug(`<block comment isClosed: ${isCommentClosed}>`)
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

        // string literal
        case CharacterCodes.doubleQuote:
          let isStringLiteralClosed: boolean = false
          this.position++
          while (this.position < end) {

            if (input.charCodeAt(this.position) === CharacterCodes.doubleQuote) {
              this.position++
              isStringLiteralClosed = true
              break
            }

            this.position++
          }
          debug(`<string literal isClosed: ${isStringLiteralClosed}>`)
          return SyntaxSet.StringLiteral

        // char literal (naive)
        case CharacterCodes.singleQuote:
          // TODO: should have constant width, only 1 char
          // TODO: should have error message later
          let isCharLiteralClosed: boolean = false
          this.position++
          while (this.position < end) {

            if (input.charCodeAt(this.position) === CharacterCodes.singleQuote) {
              this.position++
              isCharLiteralClosed = true
              break
            }

            this.position++
          }
          debug(`<char literal isClosed: ${isCharLiteralClosed}>`)
          return SyntaxSet.CharLiteral

        case CharacterCodes._1:
        case CharacterCodes._2:
        case CharacterCodes._3:
        case CharacterCodes._4:
        case CharacterCodes._5:
        case CharacterCodes._6:
        case CharacterCodes._7:
        case CharacterCodes._8:
        case CharacterCodes._9:
          let isFloat: boolean = false
          this.position++
          while (this.position < end) {
            const c = input.charCodeAt(this.position)
            const nextC = input.charCodeAt(this.position + 1)
            this.position++

            if (c === CharacterCodes.dot)
              isFloat = true

            if (isNumber(c) && !isNumber(nextC) && nextC !== CharacterCodes.dot)
              break
          }

          if (isFloat) {
            debug(`<float literal>`)
            return SyntaxSet.FloatLiteral
          } else {
            debug(`<int literal>`)
            return SyntaxSet.IntegerLiteral
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
