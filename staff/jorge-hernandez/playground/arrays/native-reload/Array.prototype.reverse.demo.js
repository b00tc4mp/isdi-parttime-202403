Array.prototype.reverse = function reverse() {
  var left, right

  for (var i = 0, j = this.length - 1; i < this.length / 2; i++, j--) {
    left = this[i]
    right = this[j]
    this[i] = right
    this[j] = left
  }
  return this
}

console.info('CASE reverse all elements')
var numbers = [1, 2, 3, 4]

var result = numbers.reverse()
console.log(result)

console.assert(numbers.length === 4, 'length is 4')
console.assert(result[0] === 4, 'first element is 4')
console.assert(result[1] === 3, 'second element is 3')
console.assert(result[2] === 2, 'third element is 2')
console.assert(result[3] === 1, 'fourth element is 1')
console.assert(result instanceof Array, 'result is an Array')
