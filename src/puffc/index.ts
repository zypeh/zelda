import * as fs from 'fs'
import * as path from 'path'

// import { createScanner } from '../compiler'

const debug = require('debug')('puffc')

function main() {
    const example = path.resolve(__dirname, '../../../', 'examples/a.txt')
    debug(fs.readFileSync(example).toString('binary'))
}

main()
