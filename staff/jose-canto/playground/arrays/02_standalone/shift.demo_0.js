delete Array.prototype.shift // Eliminamos el metodo slice para evitar usarlo
// Recrear el metodo shift

function shift(array) {

  // array -> [1, 2, 3];
  // Remove first element 
  //var removedElement = array[0] //  1

  //array[0] = array[1] // array -> [2, 2, 3]
  //array[1] = array[2] // array -> [2, 3, 3]
  //array.length = array.length - 1 // array -> [2, 3]

  var removedElement = array[0]

  for (var i = 0; i < array.length - 1; i++) {

    array[i] = array[i + 1]
  }

  array.length = array.length - 1

  return removedElement
}

console.info('--- CASE add remove first element 1, and return that removed element ---')

var numbers = [1, 2, 3, 4, 5];

var firstElement = shift(numbers);

console.log(numbers);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1

//! TEST ASSERT

console.assert(firstElement === 1, "firstElement removed is 1")

console.assert(numbers.length === 4, "numbers length is 4")
console.assert(numbers[0] === 2, 'index 0 is 2')
console.assert(numbers[1] === 3, 'index 1 is 3')
console.assert(numbers[2] === 4, 'index 2 is 4')
console.assert(numbers[3] === 5, 'index 3 is 5')

//? --------------------------------------------------------------

console.info('--- CASE add remove first element Ferrari, and return that removed element ---')

var f1Cars = ['Ferrari', 'Williams', 'Red Bull', 'Mercedes']

var removedCar = shift(f1Cars)

console.log(removedCar)

console.log(f1Cars)

//! TEST ASSERT

console.assert(removedCar === 'Ferrari', 'F1 removed is Ferrari')

console.assert(f1Cars[0] === 'Williams', 'F1 at index 0 is Williams')
console.assert(f1Cars[1] === 'Red Bull', 'F1 at index 0 is Red Bull')
console.assert(f1Cars[2] === 'Mercedes', 'F1 at index 0 is Mercedes')