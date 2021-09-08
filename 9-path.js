const path = require('path')

console.log(path.sep)

const filePath = path.join('/content', 'subcontent', '1.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname, 'content', 'subcontent', '1.txt')
console.log(absolute)