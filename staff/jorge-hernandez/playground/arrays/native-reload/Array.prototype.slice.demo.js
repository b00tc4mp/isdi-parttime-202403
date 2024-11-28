Array.prototype.slice = function slice(start, end) {
  var result = []

  if (end === undefined) {
    if (start > 0) {
      for (var i = start; i < this.length; i++) {
        result[result.length] = this[i]
      }
    } else {
      for (var i = this.length + start; i < this.length; i++) {
        result[result.length] = this[i]
      }
    }
  } else {
    if (end > 0) {
      for (var i = start; i < end; i++) {
        result[result.length] = this[i]
      }
    } else {
      //var result = slice(animals, 2, -1)
      for (var i = start; i < this.length + end; i++) {
        result[result.length] = this[i]
      }
    }
  }
  return result
}

console.info('CASE extract from index to last index')
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(2)
// Expected output: Array ["camel", "duck", "elephant"]

console.assert(result.length === 3, 'result is 3')
console.assert(result[0] === 'camel', 'result[0] is camel')
console.assert(result[1] === 'duck', 'result[1] is duck')
console.assert(result[2] === 'elephant', 'result[2] is elephant')

console.info('CASE extract from index negative to last index')
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(-2)
// Expected output: Array ["duck", "elephant"]

console.assert(result.length === 2, 'result is 2')
console.assert(result[0] === 'duck', 'result[0] is duck')
console.assert(result[1] === 'elephant', 'result[1] is elephant')

console.info('CASE end > 0')
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
var result = animals.slice(2, 4)
// Expected output: Array ["camel", "duck"]
console.assert(result.length === 2, 'result is 2')
console.assert(result[0] === 'camel', 'result[0] is camel')
console.assert(result[1] === 'duck', 'result[1] is duck')

console.info('CASE end < 0')
var result = animals.slice(2, -1)
// Expected output: Array ["camel", "duck"]
console.assert(result.length === 2, 'result is 2')
console.assert(result[0] === 'camel', 'result[0] is camel')
console.assert(result[1] === 'duck', 'result[1] is duck')
