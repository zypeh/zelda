import { SyntaxSet } from './types'
import { CharacterCodes, isLineBreak, isWhiteSpaceSingleLine, isNumber, isAlphaNumber } from './characters'
import { TokenState } from './states'
import * as path from 'path'
import * as fs from 'fs'
const debug = require('debug')('compiler:scanner')

export class Scanner {
    private inputText: string = ''
    /** Current position of the character */
    private pos: number = 0
    private tokState: TokenState = TokenState.None
    private dir: string

    public constructor(dir: string) {
        const p = path.resolve(__dirname, '../../../../', dir)
        this.inputText = fs.readFileSync(p).toString('utf-8')
        this.dir = dir
    }

    public createScanner(input: string | undefined): { inputText: string; pos: number } {
        return {
            inputText: input || '',
            pos: this.pos,
        }
    }

    public getTokState(): TokenState {
        return this.tokState
    }

    public getDirectory(): string {
        return this.dir
    }

    public setText(str: string): void {
        this.inputText = str
    }

    public scan(): SyntaxSet {
        const input = this.inputText
        const end = this.inputText.length

        if (this.pos >= end) return SyntaxSet.EndOfFileToken

        const c = input.charCodeAt(this.pos)
        switch (c) {
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
                this.pos++
                while (this.pos < end) {
                    if (!isWhiteSpaceSingleLine(input.charCodeAt(this.pos))) break
                    this.pos++
                }
                debug('<space>')
                return SyntaxSet.WhiteSpaceToken

            case CharacterCodes.lineFeed:
            case CharacterCodes.carriageReturn:
            case CharacterCodes.lineSeparator:
            case CharacterCodes.paragraphSeparator:
                // Newline
                debug('<newline>')
                this.pos++
                return SyntaxSet.NewlineToken

            case CharacterCodes.slash:
                if (input.charCodeAt(this.pos + 1) === CharacterCodes.asterisk) {
                    // Comment block
                    let isCommentClosed = false
                    this.pos += 2
                    while (this.pos < end) {
                        if (
                            input.charCodeAt(this.pos) === CharacterCodes.asterisk &&
                            input.charCodeAt(this.pos + 1) === CharacterCodes.slash
                        ) {
                            this.pos += 2
                            isCommentClosed = true
                            break
                        }

                        this.pos++
                    }
                    debug(`<block comment isClosed: ${isCommentClosed}>`)
                    return SyntaxSet.BlockCommentKeyword
                }

                if (input.charCodeAt(this.pos + 1) === CharacterCodes.slash) {
                    if (input.charCodeAt(this.pos + 2) === CharacterCodes.slash) {
                        // Documentation comment
                        this.pos += 3
                        while (this.pos < end) {
                            if (isLineBreak(input.charCodeAt(this.pos))) break

                            this.pos++
                        }
                        debug('<doc comment>')
                        return SyntaxSet.DocCommentKeyword
                    }

                    // Single-line comment
                    this.pos += 2
                    while (this.pos < end) {
                        if (isLineBreak(input.charCodeAt(this.pos))) break

                        this.pos++
                    }
                    debug('<comment>')
                    return SyntaxSet.CommentKeyword
                }

            // true
            case CharacterCodes.t:
                if (
                    input.charCodeAt(this.pos + 1) === CharacterCodes.r &&
                    input.charCodeAt(this.pos + 2) === CharacterCodes.u &&
                    input.charCodeAt(this.pos + 3) === CharacterCodes.e &&
                    (!isAlphaNumber(input.charCodeAt(this.pos + 4)) || this.pos + 4 >= end)
                ) {
                    this.pos += 4
                    debug('<true>')
                    return SyntaxSet.TrueKeyword
                }

            // false
            case CharacterCodes.f:
                if (
                    input.charCodeAt(this.pos + 1) === CharacterCodes.a &&
                    input.charCodeAt(this.pos + 2) === CharacterCodes.l &&
                    input.charCodeAt(this.pos + 3) === CharacterCodes.s &&
                    input.charCodeAt(this.pos + 4) === CharacterCodes.e &&
                    (!isAlphaNumber(input.charCodeAt(this.pos + 5)) || this.pos + 5 >= end)
                ) {
                    this.pos += 5
                    debug('<false>')
                    return SyntaxSet.FalseKeyword
                }

            // string literal
            case CharacterCodes.doubleQuote:
                let isStringLiteralClosed = false
                this.pos++
                while (this.pos < end) {
                    if (input.charCodeAt(this.pos) === CharacterCodes.doubleQuote) {
                        this.pos++
                        isStringLiteralClosed = true
                        break
                    }

                    this.pos++
                }
                debug(`<string literal isClosed: ${isStringLiteralClosed}>`)
                return SyntaxSet.StringLiteral

            // char literal (naive)
            case CharacterCodes.singleQuote:
                // TODO: should have constant width, only 1 char
                // TODO: should have error message later
                let isCharLiteralClosed = false
                this.pos++
                while (this.pos < end) {
                    if (input.charCodeAt(this.pos) === CharacterCodes.singleQuote) {
                        this.pos++
                        isCharLiteralClosed = true
                        break
                    }

                    this.pos++
                }
                debug(`<char literal isClosed: ${isCharLiteralClosed}>`)
                return SyntaxSet.CharLiteral

            case CharacterCodes._0:
            case CharacterCodes._1:
            case CharacterCodes._2:
            case CharacterCodes._3:
            case CharacterCodes._4:
            case CharacterCodes._5:
            case CharacterCodes._6:
            case CharacterCodes._7:
            case CharacterCodes._8:
            case CharacterCodes._9:
                // Numeric literal
                this.pos++
                let isFloat = false

                while (this.pos < end) {
                    // Parsing dots in numeric literal
                    if (input.charCodeAt(this.pos) === CharacterCodes.dot) {
                        if (isNumber(input.charCodeAt(this.pos + 1))) {
                            if (isFloat == true) {
                                // TODO: should have error message, in typescript it is called DiagnosisMessage
                                debug(`Error parsing decimal number at [${this.pos}]`)
                                break
                            } else {
                                isFloat = true
                            }
                            this.pos++
                            continue
                        } else {
                            // TODO: should have error message, in typescript it is called DiagnosisMessage
                            debug(`'.' should be between numbers at [${this.pos}]`)
                            this.pos++
                            continue
                        }
                    }

                    // Parsing underscore in numeric literal
                    if (input.charCodeAt(this.pos) === CharacterCodes._) {
                        if (isNumber(input.charCodeAt(this.pos + 1))) {
                            this.pos++
                            continue
                        } else {
                            // TODO: should have error message, in typescript it is called DiagnosisMessage
                            debug(`'_' should placed between numbers at [${this.pos}]`)
                            this.pos++
                            continue
                        }
                    }

                    if (!isNumber(input.charCodeAt(this.pos))) break
                    this.pos++
                }
                debug(`<numeric literal isFloat: ${isFloat} >`)
                return SyntaxSet.NumericLiteral

            case CharacterCodes.equals:
                if (input.charCodeAt(this.pos + 1) === CharacterCodes.greaterThan) {
                    this.pos += 2
                    debug('<fat arrow keyword>')
                    return SyntaxSet.FatArrowKeyword
                }
                this.pos++
                debug('<assignment keyword>')
                return SyntaxSet.AssignKeyword

            case CharacterCodes.openParen:
                this.pos++
                debug('<Open Paren keyword>')
                return SyntaxSet.OpenParenKeyword

            case CharacterCodes.closeParen:
                this.pos++
                debug('<Close Paren keyword>')
                return SyntaxSet.CloseParenKeyword

            case CharacterCodes.openBrace:
                this.pos++
                debug('<Open Brace keyword>')
                return SyntaxSet.OpenBraceKeyword

            case CharacterCodes.closeBrace:
                this.pos++
                debug('<Close Brace keyword>')
                return SyntaxSet.CloseBraceKeyword

            case CharacterCodes.openBracket:
                this.pos++
                debug('<Open Bracket keyword>')
                return SyntaxSet.OpenBracketKeyword

            case CharacterCodes.closeBracket:
                this.pos++
                debug('<Close Bracket keyword>')
                return SyntaxSet.CloseBracketKeyword

            /**
             * Unimplemented
             */
            default:
                debug('<unimplemented> at [' + this.pos + ']')
                this.pos++
                return SyntaxSet.Unknown
        }
    }
}
