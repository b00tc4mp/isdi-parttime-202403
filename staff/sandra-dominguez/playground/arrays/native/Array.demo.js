console.info('CASO construye una instancia con 2 elementos')

var fruits = new Array('Apple', 'Banana') 

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 2, 'fruits length is 2')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')


console.info('CASO construye una instancia con longitud 3')

var fruits = new Array(3) 

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined')
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined')
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined')


console.info('CASO construye una instancia con 1 elemento')

var fruits = new Array('3') 

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 1, 'fruits length is 1')
console.assert(fruits[0] === '3', 'fruit at index 0 is "3"')