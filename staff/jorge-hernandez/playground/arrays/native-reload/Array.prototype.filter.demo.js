Array.prototype.filter = function filter(callback) {
  var result = []
  for (var i = 0; i < this.length; i++) {
    var element = this[i]
    if (callback(element)) {
      result[result.length] = element
    }
  }
  return result
}

var numbers = [12, 5, 8, 130, 44]
function numberBig(value) {
  return value >= 10
}

var filtered = numbers.filter(numberBig)

console.debug(filtered)

console.info('CASE return numbers > 10')
console.assert(filtered.length === 3)
console.assert(filtered[0] === 12)
console.assert(filtered[1] === 130)
console.assert(filtered[2] === 44)
console.assert(filtered instanceof Array, 'result is an array')
