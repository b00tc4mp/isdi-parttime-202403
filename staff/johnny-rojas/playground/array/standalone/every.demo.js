function every(array, callback) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i]
  
    var matches = callback(element)
    if (!matches) {
      return false
    }
  }
  return true
}

console.info('Case 1')

var numbers = [1, 30, 39, 29, 10, 13];

var isBelowThreshold = every(numbers, function (num) { return num < 40 })

console.log(isBelowThreshold)
// Expected output: true

console.assert(numbers[0] < 40, 'Es menor de 40')
console.assert(numbers[1] < 40, 'Es menor de 40')
console.assert(numbers[2] < 40, 'Es menor de 40')
console.assert(numbers[3] < 40, 'Es menor de 40')
console.assert(numbers[4] < 40, 'Es menor de 40')
console.assert(numbers[5] < 40, 'Es menor de 40')
console.assert(isBelowThreshold === true, 'Es true')


//delete Array.prototype.every // Eliminamos el metodo every para evitar usar el metodo

//Recrear Metodo array every


function every(array, callback) {


  for (var i = 0; i < array.length; i++) {

    var element = array[i]

    var matches = callback(element)

    if (!matches) {
      return false

    }
  }
  return true
}

console.info('--- CASE all elements in the array pass de condition provided function --- ')

var numbers = [1, 30, 41, 29, 10, 13];

var result = every(numbers, function (num) { return num < 40 });
console.log(result)
// Expected output: true

//! TEST ASSERT

console.assert(result === true, 'result is true')

//? --------------------------------------------------------------------

var animals = ['dog', 'dog', 'cat', 'dog']

result = every(animals, function (animal) { return animal === 'dog' })
console.log(result)
//Expected output : false

//! TEST ASSERT 

console.assert(result === false, 'result is false')
