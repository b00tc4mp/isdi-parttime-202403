delete Array.prototype.slice // Eliminamos el metodo slice para evitar usarlo
// Recrear el metodo slice

function slice(array, start, end) {

  var startIndex = start
  var endIndex = end

  if (startIndex === undefined) {
    startIndex = 0
  }
  if (endIndex === undefined) {
    endIndex = array.length
  }

  if (startIndex < 0) {
    startIndex = array.length + startIndex
  }

  if (endIndex < 0) {
    endIndex = array.length + endIndex
  }

  var result = []

  for (var i = startIndex; i < endIndex; i++) {
    var element = array[i];
    result[result.length] = element
  }
  return result
}

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.info("--- CASE copy camel, duck, elephant  --- ")
var extractAnimals = slice(animals, -3)
console.log(extractAnimals);
// Expected output: Array ["camel", "duck", "elephant"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 3, 'extractAnimals length is 3')
console.assert(extractAnimals[0] === 'camel', 'animal at index 0 is camel')
console.assert(extractAnimals[1] === 'duck', 'animal at index 1 is duck')
console.assert(extractAnimals[2] === 'elephant', 'animal at index 2 is elephant')

console.assert(animals.length === 5, 'animals length is 5')

//? -----------------------------------------------------------------------

console.info("--- CASE copy camel, duck --- ")
var extractAnimals = slice(animals, 2, 4)
console.log(extractAnimals);
// Expected output: Array ["camel", "duck"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 2, 'extractAnimals length is 2')
console.assert(extractAnimals[0] === 'camel', 'animal at index 0 is camel')
console.assert(extractAnimals[1] === 'duck', 'animal at index 1 is duck')

//? -----------------------------------------------------------------------

console.info("--- CASE copy 'bison', 'camel', 'duck', 'elephant' --- ")
var extractAnimals = slice(animals, 1, 5)
console.log(extractAnimals)
// Expected output: Array ["bison", "camel", "duck", "elephant"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 4, 'extractAnimals length is 4')
console.assert(extractAnimals[0] === 'bison', 'animal at index 0 is bison')
console.assert(extractAnimals[1] === 'camel', 'animal at index 1 is camel')
console.assert(extractAnimals[2] === 'duck', 'animal at index 2 is duck')
console.assert(extractAnimals[3] === 'elephant', 'animal at index 3 is elephant')

//? -----------------------------------------------------------------------

console.info("--- CASE copy 'duck', 'elephant' --- ")
var extractAnimals = slice(animals, -2)
console.log(extractAnimals)
// Expected output: Array ["duck", "elephant"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 2, 'extractAnimals length is 2')
console.assert(extractAnimals[0] === 'duck', 'animal at index 0 is duck')
console.assert(extractAnimals[1] === 'elephant', 'animal at index 1 is elephant')

//? -----------------------------------------------------------------------

console.info("--- CASE copy 'duck', 'elephant' --- ")
var extractAnimals = slice(animals, 2, -1)
console.log(extractAnimals)
// Expected output: Array ["camel", "duck"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 2, 'extractAnimals length is 2')
console.assert(extractAnimals[0] === 'camel', 'animal at index 0 is camel')
console.assert(extractAnimals[1] === 'duck', 'animal at index 1 is duck')

//? -----------------------------------------------------------------------

console.info("--- CASE copy array --- ")
var extractAnimals = slice(animals,)
console.log(extractAnimals)
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 5, 'extractAnimals length is 5')
console.assert(extractAnimals[0] === 'ant', 'animal at index 0 is ant')
console.assert(extractAnimals[1] === 'bison', 'animal at index 1 is bison')
console.assert(extractAnimals[2] === 'camel', 'animal at index 2 is camel')
console.assert(extractAnimals[3] === 'duck', 'animal at index 3 is duck')
console.assert(extractAnimals[4] === 'elephant', 'animal at index 4 is elephant')