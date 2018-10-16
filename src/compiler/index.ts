import { SyntaxSet } from './scanner/types';
import { Scanner } from './scanner';

const debug = require('debug')('compiler')

const scanner = new Scanner()

scanner.setText('// hello\ncode here')

// Iterate through the input string
for (let token = scanner.scan(); token != SyntaxSet.EndOfFileToken; token = scanner.scan()) {}
debug(scanner)
