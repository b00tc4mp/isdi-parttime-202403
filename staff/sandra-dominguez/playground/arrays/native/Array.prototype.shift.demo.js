console.info('CASO eliminar primer elemento')

var number = [1, 2, 3]
var firstNum = number.shift()



console.assert(firstNum === 1, "firstNum removed is 1")

console.assert(number.length === 2, "number length is 2")
console.assert(number[0] === 2, 'number 0 is 2')
console.assert(number[1] === 3, 'number 1 is 3')