console.info('CASE unshift only one element')


var array1 = [1, 2, 3];

console.log(array1.unshift(4));
// Expected output: 4

console.log(array1);
// Expected output: Array [4, 1, 2, 3]


console.info('CASE unchist more than one element')

var array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// Expected output: 5

console.log(array1);
// Expected output: Array [4, 5, 1, 2, 3]

