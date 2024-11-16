delete Array.prototype.some // Eliminamos el metodo some para evitar usarlo

Array.prototype.some = function (callback) {

  for (var i = 0; i < this.length; i++) {
    var element = this[i]

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
var even = numbers.some(function (num) { return num % 2 === 0 });

console.log(even);
// Expected output: true

//! TEST ASSERT

console.assert(even === true, 'even is true')

//? -------------------------------------------------------

console.info('--- CASE returns true if any element in the condition is met ---')

var animals = ['dog', 'cat', 'parrot', 'eagle'];

// Checks whether an num is even
var result = animals.some(function (animal) { return animal === 'eagle' });

console.log(result);
// Expected output: true

//! TEST ASSERT

console.assert(even === true, 'even is true')
