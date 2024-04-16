var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = array1.concat(array2);

console.info('CASE concatenate two arrays');

// Expected output: Array ["a", "b", "c", "d", "e", "f"]
console.assert(array3[0] === 'a', 'array3 0 is a');
console.assert(array3[1] === 'b', 'array3 1 is b');
console.assert(array3[2] === 'c', 'array3 2 is c');
console.assert(array3[3] === 'd', 'array3 3 is d');
console.assert(array3[4] === 'e', 'array3 4 is e');
console.assert(array3[5] === 'f', 'array3 5 is f');
console.assert(array3.length === 6, 'array3 length is 6');