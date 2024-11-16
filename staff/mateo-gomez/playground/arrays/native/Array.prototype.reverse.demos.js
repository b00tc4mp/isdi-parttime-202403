console.info('CASE invert elements from an array')

var nums  = ['one', 'two', 'three'];

var result = nums.reverse()


console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 3, 'the array length is 3')
console.assert(result[0] === 'three', 'the array in 0 is three')
console.assert(result[1] === 'two', 'the array in 1 is two')
console.assert(result[2] === 'one', 'the array in 2 is one')
 console.assert(result === nums, 'result is nums')



 console.info('CASE invert 4 elements from an array')

var nums  = ['one', 'two', 'three', 'four'];

var result = nums.reverse()

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 4, 'the array length is 2')
console.assert(result[0] === 'four', 'the array in 0 is four')
console.assert(result[1] === 'three', 'the array in 1 is three')
console.assert(result[2] === 'two', 'the array in 2 is two')
console.assert(result[3] === 'one', 'the array in 3 is one')
 console.assert(result === nums, 'result is nums')



 console.info('CASE invert 5 elements from an array')

var nums  = ['one', 'two', 'three', 'four', 'five'];

var result = nums.reverse()





 console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 5, 'the array length is 5')
console.assert(result[0] === 'five', 'the array in 0 is five')
console.assert(result[1] === 'four', 'the array in 1 is four')
console.assert(result[2] === 'three', 'the array in 2 is three')
console.assert(result[3] === 'two', 'the array in 3 is two')
console.assert(result[4] === 'one', 'the array in 4 is one')
 console.assert(result === nums, 'result is nums')


 console.info('CASE invert 6 elements from an array')

 var nums  = ['one', 'two', 'three', 'four', 'five', 'six'];
 
 var result = nums.reverse()
 
 
 
 
 
  console.assert(result instanceof Array, 'result is an array')
 console.assert(result.length === 6, 'the array length is 6')
 console.assert(result[0] === 'six', 'the array in 0 is six')
 console.assert(result[1] === 'five', 'the array in 1 is five')
 console.assert(result[2] === 'four', 'the array in 2 is four')
 console.assert(result[3] === 'three', 'the array in 3 is three')
 console.assert(result[4] === 'two', 'the array in 4 is two')
 console.assert(result[5] === 'one', 'the array in 5 is one')
  console.assert(result === nums, 'result is nums')