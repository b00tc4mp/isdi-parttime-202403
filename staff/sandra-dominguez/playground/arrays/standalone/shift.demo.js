function shift(array) {
    var remove = array[0]
  
    for (var i = 0; i < array.length - 1; i++) {
      array[i] = array[i + 1]
    }
  
    array.length = array.length - 1
  
    return remove
}


var number = [1, 2, 3]
var firstNum = number.shift()

console.log(firstNum)
console.debug(number)

console.assert(number.length === 2, 'length is 2')
console.assert(number[0] === 2, 'number 0 is 2')
console.assert(number[1] === 3, 'number 1 is 3')