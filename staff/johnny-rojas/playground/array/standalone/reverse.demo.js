// delete Array.prototype.reverse

function reverse(array) {
  var left;

  for (var i = 0, j = array.length - 1; i < j; i++, j--) {
    left = array[i]

    array[i] = array[j]
    array[j] = left
  }

  return array
}

//----------------------------------------------

console.info('CASE reverse the array')

var ramdonList = [true, 1, 'Jose', 75, 'Carol', false]
var ramdonListReversed = reverse(ramdonList)

console.debug(ramdonListReversed)
//output: [ false, 'Carol', 75, 'Jose', 1, true ]

console.assert(ramdonListReversed[0] === false, 'index 0 is equal false')
console.assert(ramdonListReversed[1] === 'Carol', 'index 1 is equal Carol')
console.assert(ramdonListReversed[2] === 75, 'index 2 is equal 75')
console.assert(ramdonListReversed[3] === 'Jose', 'index 3 is equal Jose')
console.assert(ramdonListReversed[4] === 1, 'index 4 is equal 1')
console.assert(ramdonListReversed[5] === true, 'index 5 is equal true')

//----------------------------------------------

console.info('CASE inverts order of 3 numbers')

var nums = ['one', 'two', 'three']

var result = reverse(nums)

console.debug(result)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'three', 'result value at index 0 is three')
console.assert(result[1] === 'two', 'result value at index 1 is two')
console.assert(result[2] === 'one', 'result value at index 2 is one')
console.assert(result === nums, 'result is nums')

//----------------------------------------------

console.info('CASE inverts order of 4 numbers')

var nums = ['one', 'two', 'three', 'four']

var result = reverse(nums)

console.debug(result)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'four', 'result value at index 0 is four')
console.assert(result[1] === 'three', 'result value at index 1 is three')
console.assert(result[2] === 'two', 'result value at index 2 is two')
console.assert(result[3] === 'one', 'result value at index 3 is one')
console.assert(result === nums, 'result is nums')

//----------------------------------------------

console.info('CASE inverts order of 5 numbers')

var nums = ['one', 'two', 'three', 'four', 'five']

var result = reverse(nums)

console.debug(result)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 5, 'result length is 5')
console.assert(result[0] === 'five', 'result value at index 0 is five')
console.assert(result[1] === 'four', 'result value at index 1 is four')
console.assert(result[2] === 'three', 'result value at index 2 is three')
console.assert(result[3] === 'two', 'result value at index 3 is two')
console.assert(result[4] === 'one', 'result value at index 1 is one')
console.assert(result === nums, 'result is nums')

//----------------------------------------------

console.info('CASE inverts order of 6 numbers')

var nums = ['one', 'two', 'three', 'four', 'five', 'six']

var result = reverse(nums)

console.debug(result)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 6, 'result length is 6')
console.assert(result[0] === 'six', 'result value at index 0 is six')
console.assert(result[1] === 'five', 'result value at index 1 is five')
console.assert(result[2] === 'four', 'result value at index 2 is four')
console.assert(result[3] === 'three', 'result value at index 3 is three')
console.assert(result[4] === 'two', 'result value at index 4 is two')
console.assert(result[5] === 'one', 'result value at index 5 is one')
console.assert(result === nums, 'result is nums')
