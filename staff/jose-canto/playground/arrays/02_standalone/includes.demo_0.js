delete Array.prototype.includes // Elminamos el metodo includes para evitar usarlo

//Recreamos el metodo includes

function includes(array, valueToFind, fromIndex) {

  //Array ->  [1, 2, 3]
  //valueToFind -> 2

  // if (valueToFind === array[1] || valueToFind === array[2] || valueToFind === array[3]) {
  //   return true
  // } else {
  //   return false
  // }

  // if (fromIndex === undefined) {

  //   for (var i = 0; i < array.length; i++) {
  //     var element = array[i]

  //     if (element === valueToFind) {
  //       return true
  //     }
  //   }

  // } else if (fromIndex !== undefined) {

  //   for (var i = fromIndex; i < array.length; i++) {
  //     var element = array[i]

  //     if (element === valueToFind) {
  //       return true
  //     }
  //   }
  // }

  var startIndex;

  if (fromIndex === undefined) {
    startIndex = 0
  } else {
    startIndex = fromIndex
  }

  for (var i = startIndex; i < array.length; i++) {
    var element = array[i]

    if (element === valueToFind) {
      return true
    }
  }
  return false
}

console.info(" -- CASE return true if includes 2  -- ")

var numbers = [1, 2, 3]

var checkBolean = includes(numbers, 2)
console.log(checkBolean)
// Expected output: true

//! TEST ASSERT
console.assert(checkBolean === true, 'checkBolean is true')

//? ---------------------------------------------------------------------- 

console.info(" -- CASE return true if includes 'cat' -- ")

var pets = ['cat', 'dog', 'bat']

var checkBolean = includes(pets, 'cat')
console.log(checkBolean)
// Expected output: true

//! TEST ASSERT
console.assert(checkBolean === true, 'checkBolean is true')

//? -----------------------------------------------------------------------

console.info(" -- CASE return false if not includes 'Mercedes' -- ")

var carsF1 = ['Aston Martin', 'Ferrari', 'Alpine']

var checkBolean = includes(carsF1, 'Mercedes')
console.log(checkBolean)
// Expected output: false

//! TEST ASSERT
console.assert(checkBolean === false, 'checkBolean is false')

//? -----------------------------------------------------------------------

console.info(" -- CASE return false if not includes 'Mercedes' from index 1 -- ")

var carsF1 = ['Mercedes', 'Aston Martin', 'Ferrari', 'Alpine']

var checkBolean = includes(carsF1, 'Mercedes', 1)
console.log(checkBolean)
// Expected output: false

//! TEST ASSERT
console.assert(checkBolean === false, 'checkBolean is false')

//? -----------------------------------------------------------------------

console.info(" -- CASE return true if includes 'Mercedes' from index 1 -- ")

var carsF1 = ['Aston Martin', 'Ferrari', 'Mercedes', 'Alpine', 'Sauber',]

var checkBolean = includes(carsF1, 'Mercedes', 3)
console.log(checkBolean)

// Expected output: false

//! TEST ASSERT
console.assert(checkBolean === false, 'checkBolean is true')