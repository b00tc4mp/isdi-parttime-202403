// delete Array.prototype.reverse

console.info('Case reverse')
function reverse(array) {
  var reversed = []
  for (var i = array.length - 1; i >= 0; i--) {
    reversed[reversed.length] = array[i]
  }
  return reversed
}

var ramdonList = [true, 1, 'Jose', 75, 'Carol', false]
var ramdonListReversed = reverse(ramdonList)
console.debug(ramdonList)
//ouput: [true, 1, 'Jose', 75, 'Carol', false]
console.debug(ramdonListReversed)
//output: [ false, 'Carol', 75, 'Jose', 1, true ]
