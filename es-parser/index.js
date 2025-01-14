const Lexer = require('./Lexer')
const Parser = require('./Parser')

const src = '2+(7-2)*4+5'
// const src = '5*4+(7-2)*3'

const tokens = new Lexer().parse(src)
const ast = new Parser().parser(tokens)

console.log(src)
console.log(tokens);
console.log(ast);