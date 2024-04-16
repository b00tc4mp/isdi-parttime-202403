console.info('CASE inverts number order of 3 numbers')

var nums = ['one', 'two', 'three']

var resul = nums.reverse()

console.assert(resul instanceof Array, 'result is an array')
console.assert(resul.length === 3, 'result length is 3')
console.assert(resul[0] === 'three', 'result value at index 0 is three')
console.assert(resul[1] === 'two', 'result value at index 0 is two')
console.assert(resul[2] === 'one', 'result value at index 0 is one')
console.assert(result === nums, 'result is nums')

console.info('CASE inverts number order of 4 numbers')

var nums = ['one', 'two', 'three', 'four']

var resul = nums.reverse()

console.assert(resul instanceof Array, 'result is an array')
console.assert(resul.length === 4, 'result length is 4')
console.assert(resul[0] === 'four', 'result value at index 0 is four')
console.assert(resul[1] === 'three', 'result value at index 0 is three')
console.assert(resul[2] === 'two', 'result value at index 0 is two')
console.assert(resul[3] === 'one', 'result value at index 0 is one')
console.assert(result === nums, 'result is nums')


console.info('CASE inverts number  order')
var nums = ['one', 'two', 'three', 'four', 'five']

var resul = nums.reverse()

console.assert(resul instanceof Array, 'result is an array')
console.assert(resul.length === 5, 'result length is 5')
console.assert(resul[0] === 'five', 'result value at index 0 is five')
console.assert(resul[1] === 'four', 'result value at index 1 is four')
console.assert(resul[2] === 'three', 'result value at index 2 is three')
console.assert(resul[3] === 'two', 'result value at index 3 is two')
console.assert(resul[4] === 'one', 'result value at index 3 is one')
console.assert(result === nums, 'result is nums')