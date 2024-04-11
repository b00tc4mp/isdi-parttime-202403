//Ejemplo Usando Metodo some


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
