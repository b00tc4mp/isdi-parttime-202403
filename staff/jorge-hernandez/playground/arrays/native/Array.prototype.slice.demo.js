console.info('CASE extract from index to last index')
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(2)
console.log(result)
// Expected output: Array ["camel", "duck", "elephant"]

console.info('CASE extract from index negative to last index')
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

result = animals.slice(-2)
// Expected output: Array ["duck", "elephant"]

console.assert(result.length === 2, 'result is 2')
console.assert(result[0] === 'duck', 'result[0] is duck')
console.assert(result[1] === 'elephant', 'result[1] is elephant')

console.info('CASE end > 0')
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
var result = animals.slice(2, 4)
console.log(result)
// Expected output: Array ["camel", "duck"]
console.assert(result.length === 2, 'result is 2')
console.assert(result[0] === 'camel', 'result[0] is camel')
console.assert(result[1] === 'duck', 'result[1] is duck')

console.info('CASE end < 0')
console.log(animals.slice(2, -1))
// Expected output: Array ["camel", "duck"]
console.assert(result.length === 2, 'result is 2')
console.assert(result[0] === 'camel', 'result[0] is camel')
console.assert(result[1] === 'duck', 'result[1] is duck')
