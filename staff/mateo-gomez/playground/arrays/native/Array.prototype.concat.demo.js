const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]


console.assert(array3[0] === 'a', 'index 0 is a')
console.assert(array3[1] === 'b', 'index 1 is b')
console.assert(array3[2] === 'c', 'index 2 is c')
console.assert(array3[3] === 'd', 'index 3 is d')
console.assert(array3[4] === 'e', 'index 4 is e')
console.assert(array3[5] === 'f', 'index 5 is f')
console.assert(array3.length === 6, 'length is 6')
console.assert(array3 instanceof Array, 'array3 is an Array')