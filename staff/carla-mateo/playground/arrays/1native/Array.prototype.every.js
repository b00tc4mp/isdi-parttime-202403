
var numbers = [1, 30, 39, 29, 10, 13];

var result = numbers.every(function(num){return num < 40})

console.debug(result)
// Expected output: true

var nnumbers = [1, 30, 39, 29, 10, 13, 50];

var result = nnumbers.every(function(num){return num < 40})

console.debug(result)
// Expected output: true

var animals = ['dog', 'dog', 'dog']

var print = animals.every(function(animal){return animal === 'dog'})

console.log(print)
