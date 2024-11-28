console.info('Case 1')

var numbers = [1, 30, 39, 29, 10, 13];

var isBelowThreshold = numbers.every(function (num) { return num < 40 })

console.log(isBelowThreshold)
// Expected output: true

console.assert(numbers[0] < 40, 'Es menor de 40')
console.assert(numbers[1] < 40, 'Es menor de 40')
console.assert(numbers[2] < 40, 'Es menor de 40')
console.assert(numbers[3] < 40, 'Es menor de 40')
console.assert(numbers[4] < 40, 'Es menor de 40')
console.assert(numbers[5] < 40, 'Es menor de 40')
console.assert(isBelowThreshold === true, 'Es true')