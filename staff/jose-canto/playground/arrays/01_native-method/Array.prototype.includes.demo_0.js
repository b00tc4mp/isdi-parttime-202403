//Ejemplo Usando Metodo array includes 

console.info(" -- CASE return true if includes 2  -- ")

var numbers = [1, 2, 3]

var checkBolean = numbers.includes(2)
console.log(checkBolean)
// Expected output: true

//! TEST ASSERT
console.assert(checkBolean === true, 'checkBolean is true')

//? ----------------------------------------------------------------------

console.info(" -- CASE return true if includes 'cat' -- ")

var pets = ['cat', 'dog', 'bat']

var checkBolean = pets.includes('cat')
console.log(checkBolean)
// Expected output: true

//! TEST ASSERT
console.assert(checkBolean === true, 'checkBolean is true')

//? -----------------------------------------------------------------------

console.info(" -- CASE return false if not includes 'Mercedes' -- ")

var carsF1 = ['Aston Martin', 'Ferrari', 'Alpine']

var checkBolean = carsF1.includes('Mercedes')
console.log(checkBolean)
// Expected output: false

//! TEST ASSERT
console.assert(checkBolean === false, 'checkBolean is false')

//? -----------------------------------------------------------------------

console.info(" -- CASE return false if not includes 'Mercedes' from index 1 -- ")

var carsF1 = ['Mercedes', 'Aston Martin', 'Ferrari', 'Alpine']

var checkBolean = carsF1.includes('Mercedes', 1)
console.log(checkBolean)
// Expected output: false

//! TEST ASSERT
console.assert(checkBolean === false, 'checkBolean is false')