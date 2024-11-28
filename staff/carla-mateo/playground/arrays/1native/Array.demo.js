console.info('CASE constructs an instance with 2 elements')

var fruits = new Array('Apple', 'Banana') //['Apple', 'Banana']

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 2, 'fruits length is 2')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')

console.info('CASE constructs an instance with length 3')

var fruits = new Array(3) //[empty x 3]

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined')
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined')
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined')

console.info('CASE constructs an instance with 1 element')

var fruits = new Array('3') //['3']

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 1, 'fruits length is 1')
console.assert(fruits[0] === '3', 'fruit at index 0 is "3"')

console.info('CASE removes the last element from an array and returns that element')

var plants = new Array('broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato')

var last = plants.pop()

console.assert(last === 'tomato', 'last is tomato')
console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')
console.assert(plants[4] === undefined, ' tomato is undefined')


console.info('CASE removes the last element from an array and returns that element')

var plants = new Array('broccoli', 'cauliflower', 'cabbage', 'kale')

var last = plants.pop()

console.assert(last === 'kale', 'last is kale')
console.assert(plants.length === 3, 'length is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
