
console.info('CASE return the first element that satisfies the testing function')
var array1 = [5, 12, 8, 130, 44];

var isLargeNumber = function (element) {return element > 13};

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3