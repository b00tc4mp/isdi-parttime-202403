var numbers = [1, 30, 39, 29, 10, 13]

var isBelowThreshold = every(numbers, function(currentValue) { currentValue< 40})

console.log(numbers.every(isBelowThreshold))
// Expected output: true
