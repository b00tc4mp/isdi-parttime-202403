var fruits = new Array('Apple', 'Banana'); 
console.log(fruits); 
// [ 'Apple', 'Banana' ]
// assert fruits
console.assert(fruits instanceof Array, 'fruits should be an instance of Array');
console.assert(fruits.length === 2, 'fruits length is incorrect');
console.assert(fruits[0] === 'Apple', 'element at index 0 should be Apple');
console.assert(fruits[1] === 'Banana', 'element at index 1 should be Banana');


// another case V
var fruits = new Array(3); 
console.log(fruits); 
// [ <3 empty items> ]
// assert fruits
console.assert(fruits instanceof Array, 'fruits should be an instance of Array');
console.assert(fruits.length === 3, 'fruits length is incorrect');
console.assert(fruits[0] === undefined, 'element at index 0 should be undefined');
console.assert(fruits[1] === undefined, 'element at index 1 should be undefined');
console.assert(fruits[2] === undefined, 'element at index 2 should be undefined');


// another case V
var fruits = new Array('3'); 
console.log(fruits); 
// [ '3' ]
// assert fruits
console.assert(fruits instanceof Array, 'fruits should be an instance of Array');
console.assert(fruits.length === 1, 'fruits length is incorrect');
console.assert(fruits[0] === '3', 'element at index 0 should be "3"');