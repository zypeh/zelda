import { SyntaxSet } from './scanner/types';
import { Scanner } from './scanner';

const debug = require('debug')('compiler')

const scanner = new Scanner()

/*
// hello
/// code here
<<<<<<< HEAD
/*123
= false => (aaa)
"aaa"/*what is'a'
*/

// TODO: {true} invalid
scanner.setText(`
{aaa}
/*123*/
1234
true            false
.14159
"aaa"/*what is*/'a'
`)

// Iterate through the input string
debug(scanner)
for (let token = scanner.scan(); token != SyntaxSet.EndOfFileToken; token = scanner.scan()) {}
