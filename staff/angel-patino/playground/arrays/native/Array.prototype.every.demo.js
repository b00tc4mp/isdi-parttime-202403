
console.info('CASE all elements ofthe  array past the test implemented. It returns a Boolean value')
var isBelowThreshold = function (currentValue) { return currentValue < 40};

var array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: true
