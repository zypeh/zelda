import * as fs from 'fs'
import * as path from 'path'
import * as program from 'commander'
// import { createScanner } from '../compiler'

const debug = require('debug')('main')

function main(): void {
    program
        .version('0.0.1', '-V, --version')
        .description('A bootstrap compiler for kyuu programming language')
        .option('-i, --input <file>', 'Specific input file to compile')
        .parse(process.argv)

    if (program.input) {
        try {
            console.log(`Compiling file ${path.basename(program.input)}`)
            debug(fs.readFileSync(path.join(__dirname, program.input), { encoding: 'utf-8' }))
        } catch (err) {
            console.log(err)
        }
    }
}

main()
