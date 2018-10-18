import { SyntaxSet } from './scanner/types';
import { Scanner } from './scanner';

const debug = require('debug')('compiler')

const scanner = new Scanner()

/*
// hello
/// code here
/*123
= false => (aaa)
"aaa"/*what is'a'
*/

// TODO: {true} invalid
scanner.setText(`
{aaa}
`)

// Iterate through the input string
debug(scanner)
for (let token = scanner.scan(); token != SyntaxSet.EndOfFileToken; token = scanner.scan()) {}
