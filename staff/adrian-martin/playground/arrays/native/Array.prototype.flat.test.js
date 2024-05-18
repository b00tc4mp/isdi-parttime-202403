console.info('CASE unify the array')

var number = [0, 1, 2, [3, 4]];

// expected output: Array [0, 1, 2, 3, 4]
var result = number.flat()

console.assert(result instanceof Array, 'result is not Array')
console.assert(result.length === 5, 'numbers length is 5')
console.assert(result[0] === 0, 'result value at index 0 is 0')
console.assert(result[1] === 1, 'result value at index 1 is 1')
console.assert(result[2] === 2, 'result value at index 2 is 2')
console.assert(result[3] === 3, 'result value at index 3 is 3')
console.assert(result[4] === 4, 'result value at index 4 is 4')

console.info('CASE unify the array with several arrays inside')

const arr2 = [0, 1, [2, [3, [4, 5]]]];

console.log(arr2.flat());
//Array [0, 1, 2, Array [3, Array [4, 5]]]

console.log(arr2.flat(2));
//Array [0, 1, 2, 3, Array [4, 5]]

console.log(arr2.flat(Infinity));
//Array [0, 1, 2, 3, 4, 5]


console.assert(result instanceof Array, 'result is not Array')
console.assert(result.length === 5, 'numbers length is 5')
console.assert(result[0] === 0, 'result value at index 0 is 0')
console.assert(result[1] === 1, 'result value at index 1 is 1')
console.assert(result[2] === 2, 'result value at index 2 is 2')
console.assert(result[3] === 3, 'result value at index 3 is 3')
console.assert(result[4] === 4, 'result value at index 4 is 4')
console.assert(result[5] === 5, 'result value at index 5 is 5')