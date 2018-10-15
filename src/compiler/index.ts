const debug = require('debug')('compiler')

import { sepNewline } from './scanner'

export function scan(input: string) {
  debug(sepNewline(input))
}
