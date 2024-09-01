var array1 = ['one', 'two', 'three']; // [ 'one', 'two', 'three' ]
var reversed = array1.reverse(); // [ 'three', 'two', 'one' ]
// Careful: reverse is destructive -- it changes the original array.
//console.log('array1:', array1);
// Expected output: 'array1:' [ 'three', 'two', 'one' ]
// assert
console.assert(reversed instanceof Array, 'reversed should be an instance of Array');
console.assert(reversed.length === 3, 'reversed length is incorrect');
console.assert(reversed[0] === 'three', 'element at index 0 should be \'three\'');
console.assert(reversed[1] === 'two', 'element at index 1 should be \'two\'');
console.assert(reversed[2] === 'one', 'element at index 2 should be \'one\'');
console.assert(array1 instanceof Array, 'array1 should be an instance of Array');
console.assert(array1.length === 3, 'array1 length is incorrect');
console.assert(array1[0] === 'three', 'element at index 0 should be \'three\'');
console.assert(array1[1] === 'two', 'element at index 1 should be \'two\'');
console.assert(array1[2] === 'one', 'element at index 2 should be \'one\'');

// another case
var items = [1, 2, 3];
items.reverse(); // [3, 2, 1]
console.assert(items instanceof Array, 'items should be an instance of Array');
console.assert(items.length === 3, 'items length is incorrect');
console.assert(items[0] === 3, 'element at index 0 should be 3');
console.assert(items[1] === 2, 'element at index 1 should be 2');
console.assert(items[2] === 1, 'element at index 2 should be 1');

// another case
const numbers = [3, 2, 4, 1, 5];
const reversed1 = numbers.reverse();
// numbers and reversed are both in reversed order [5, 1, 4, 2, 3]
reversed1[0] = 5;
//console.log(numbers[0]); // 5
// assert
console.assert(numbers instanceof Array, 'numbers should be an instance of Array');
console.assert(numbers.length === 5, 'numbers length is incorrect');
console.assert(numbers[0] === 5, 'element at index 0 should be 5');
console.assert(numbers[1] === 1, 'element at index 1 should be 1');
console.assert(numbers[2] === 4, 'element at index 2 should be 4');
console.assert(numbers[3] === 2, 'element at index 3 should be 2');
console.assert(numbers[4] === 3, 'element at index 4 should be 3');
console.assert(reversed1 instanceof Array, 'reversed1 should be an instance of Array');
console.assert(reversed1.length === 5, 'reversed1 length is incorrect');
console.assert(reversed1[0] === 5, 'element at index 0 should be 5');
console.assert(reversed1[1] === 1, 'element at index 1 should be 1');
console.assert(reversed1[2] === 4, 'element at index 2 should be 4');
console.assert(reversed1[3] === 2, 'element at index 3 should be 2');
console.assert(reversed1[4] === 3, 'element at index 4 should be 3');

// another case
const numbers1 = [3, 2, 4, 1, 5, 6];
const reversed2 = numbers1.reverse();
// numbers and reversed are both in reversed order [6, 5, 1, 4, 2, 3]
reversed2[0] = 6;
//console.log(numbers1[0]); // 6
// assert
console.assert(numbers1 instanceof Array, 'numbers1 should be an instance of Array');
console.assert(numbers1.length === 6, 'numbers1 length is incorrect');
console.assert(numbers1[0] === 6, 'element at index 0 should be 6');
console.assert(numbers1[1] === 5, 'element at index 1 should be 5');
console.assert(numbers1[2] === 1, 'element at index 2 should be 1');
console.assert(numbers1[3] === 4, 'element at index 3 should be 4');
console.assert(numbers1[4] === 2, 'element at index 4 should be 2');
console.assert(numbers1[5] === 3, 'element at index 5 should be 3');

console.assert(reversed2 instanceof Array, 'reversed2 should be an instance of Array');
console.assert(reversed2.length === 6, 'reversed2 length is incorrect');
console.assert(reversed2[0] === 6, 'element at index 0 should be 6');
console.assert(reversed2[1] === 5, 'element at index 1 should be 5');
console.assert(reversed2[2] === 1, 'element at index 2 should be 1');
console.assert(reversed2[3] === 4, 'element at index 3 should be 4');
console.assert(reversed2[4] === 2, 'element at index 4 should be 2');
console.assert(reversed2[5] === 3, 'element at index 5 should be 3');