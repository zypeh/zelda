import { SyntaxSet } from "./types";
import { CharacterCodes, isLineBreak } from "./characters";

const debug = require('debug')('compiler:scanner')

export class Scanner {
  private inputText: string  = ''
  private position: number = 0

  public createScanner() {
    return {
      inputText: this.inputText,
      position: this.position,
    }
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

      case CharacterCodes.slash:
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

      /**
       * Unimplemented
       */
      default:
        debug('<unimplemented> at [' + this.position + ']')
        this.position++
        return SyntaxSet.TrueKeyword

    }
  }
}
