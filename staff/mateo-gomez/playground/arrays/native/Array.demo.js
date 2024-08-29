console.info('CASE constructs an instance with two elements')


var fruits = new Array('Apple', 'Banana')

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 2 , 'fruits length is 2')
console.assert(fruits[0] === 'Apple' , 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana' , 'fruit at index 1 is Banana')