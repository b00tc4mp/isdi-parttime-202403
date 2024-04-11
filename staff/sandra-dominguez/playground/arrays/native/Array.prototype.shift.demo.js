var number = [1, 2, 3]
var firstNum = number.shift()

console.log(firstNum)
console.debug(number)


//CASO eliminar primer elemento

var number = [2, 3]

console.log(firstNum)
console.log(number)

console.assert(number.length === 2, 'length is 2')
console.assert(number[0] === 2, 'number 0 is 2')
console.assert(number[1] === 3, 'number 1 is 3')
