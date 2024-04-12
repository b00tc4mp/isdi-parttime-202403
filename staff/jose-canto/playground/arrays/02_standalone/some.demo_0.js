delete Array.prototype.some // Eliminamos el metodo some para evitar usarlo


function some(array, callback) {

  for (var i = 0; i < array.length; i++) {
    var element = array[i]

    var matches = callback(element)

    if (matches) {
      return true

    }
  }
  return false
}

console.info('--- CASE returns true if any element in the condition is met ---')

var numbers = [1, 3, 3, 7, 5];

// Checks whether an num is even
var even = some(numbers, function (num) { return num % 2 === 0 });

console.log(even);
// Expected output: true

//! TEST ASSERT

console.assert(even === true, 'even is true')

//? -------------------------------------------------------

console.info('--- CASE returns true if any element in the condition is met ---')

var animals = ['dog', 'cat', 'parrot', 'eagle'];

// Checks whether an num is even
var result = some(animals, function (animal) { return animal === 'eagle' });

console.log(result);
// Expected output: true

//! TEST ASSERT

console.assert(even === true, 'even is true')
