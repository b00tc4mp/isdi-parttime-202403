//Ejemplo Usando Metodo array animals.slice
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.info("--- CASE copy camel, duck, elephant  --- ")
var extractAnimals = animals.slice(2)
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
var extractAnimals = animals.slice(2, 4)
console.log(extractAnimals);
// Expected output: Array ["camel", "duck"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 2, 'extractAnimals length is 2')
console.assert(extractAnimals[0] === 'camel', 'animal at index 0 is camel')
console.assert(extractAnimals[1] === 'duck', 'animal at index 1 is duck')

//? -----------------------------------------------------------------------

console.info("--- CASE copy 'bison', 'camel', 'duck', 'elephant' --- ")
var extractAnimals = animals.slice(1, 5)
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
var extractAnimals = animals.slice(-2)
console.log(extractAnimals)
// Expected output: Array ["duck", "elephant"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 2, 'extractAnimals length is 2')
console.assert(extractAnimals[0] === 'duck', 'animal at index 0 is duck')
console.assert(extractAnimals[1] === 'elephant', 'animal at index 1 is elephant')

//? -----------------------------------------------------------------------

console.info("--- CASE copy 'duck', 'elephant' --- ")
var extractAnimals = animals.slice(2, -1)
console.log(extractAnimals)
// Expected output: Array ["camel", "duck"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 2, 'extractAnimals length is 2')
console.assert(extractAnimals[0] === 'camel', 'animal at index 0 is camel')
console.assert(extractAnimals[1] === 'duck', 'animal at index 1 is duck')

//? -----------------------------------------------------------------------

console.info("--- CASE copy array --- ")
var extractAnimals = animals.slice()
console.log(extractAnimals)
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

//! TEST ASSERT 
console.assert(extractAnimals.length === 5, 'extractAnimals length is 5')
console.assert(extractAnimals[0] === 'ant', 'animal at index 0 is ant')
console.assert(extractAnimals[1] === 'bison', 'animal at index 1 is bison')
console.assert(extractAnimals[2] === 'camel', 'animal at index 2 is camel')
console.assert(extractAnimals[3] === 'duck', 'animal at index 3 is duck')
console.assert(extractAnimals[4] === 'elephant', 'animal at index 4 is elephant')