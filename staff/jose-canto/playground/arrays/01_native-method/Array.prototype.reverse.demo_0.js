//Ejemplo Usando Metodo array reverse

var numbers = ['one', 'two', 'three'];
console.log('numbers:', numbers);
// Expected output: "numbers:" Array ["one", "two", "three"]

var resultReverse = numbers.reverse();
console.log('reversed:', resultReverse);
// Expected output: "reversed:" Array ["three", "two", "one"]

//! TEST ASSERT
console.assert(resultReverse.length == 3, 'resultReverse length is 3');
console.assert(resultReverse[0] === 'three', 'resultReverse at index 0 is three')
console.assert(resultReverse[1] === 'two', 'resultReverse at index 1 is two')
console.assert(resultReverse[2] === 'one', 'resultReverse at index 2 is one')

//? -----------------------------------------------------------------------