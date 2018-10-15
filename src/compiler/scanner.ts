// const debug = require('debug')('compiler:scanner')

/**
 * Separate all the possibly newline characters using regexp.
 * @param input {string}
 */
export function sepNewline(input: string) {
  const newline = /\r\n|\r|\n/g
  return input.split(newline)
}
