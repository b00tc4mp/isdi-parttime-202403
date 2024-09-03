console.info('CASE locate a value in an array')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.debug(beasts.indexOf('bison'));
// Expected output: 1

// Start from index 2
console.log(beasts.indexOf('bison', 2));
// Expected output: 4

console.log(beasts.indexOf('giraffe'));
// Expected output: -1
