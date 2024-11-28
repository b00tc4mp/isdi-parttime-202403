// CASO eliminar el primer elemento

function shift(array) {
  //var removedElement = array[0]
  //array[0] = array[1] //array --> [2, 2, 3]
  //array[1] = array[2] //array --> [2, 3, 3]
  //array.length = array.length - 1

  var removedElement = array[0]
     for(var i = 0; i < array.length - 1; i++) {
      array[i] = array[i + 1]

     }
     array.length = array.length - 1
    return removedElement
}



var number = [1, 2, 3]
var firstNum = shift(number)

console.log(firstNum)
console.log(number)

console.assert(firstNum === 1, "firstNum removed is 1")

console.assert(number.length === 2, "number length is 2")
console.assert(number[0] === 2, 'number 0 is 2')
console.assert(number[1] === 3, 'number 1 is 3')