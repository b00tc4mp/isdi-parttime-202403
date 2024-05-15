console.info('CASE adds the specified elements to the beginning of an array and returns the new length of the array.')

var array1 = [1, 2, 3];

console.debug(array1.unshift(4, 5));
// Expected output: 5

console.debug(array1);
// Expected output: Array [4, 5, 1, 2, 3]