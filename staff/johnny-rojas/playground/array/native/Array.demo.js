console.info('CASE constructs an instance with 2 elements')

var fruits = new Array('Apple', 'Banana') // ['Apple', 'Banana']

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 2, 'fruits length is 2')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')


console.info('CASE constructs an instance with length 3')

var fruits = new Array(3) // [empty x 3]

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined')
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined')
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined')


console.info('CASE constructs an instance with 1 element')

var fruits = new Array('3') // ['3']

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 1, 'fruits length is 1')
console.assert(fruits[0] === '3', 'fruit at index 0 is "3"')