/*El método findIndex() devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// Expected output: 3*/

console.info('CASE first index greater than 10');

var numbers = [5, 12, 8, 130, 44];

var firstIndex = numbers.findIndex(function (element) {
  return element > 10;
});

console.assert(firstIndex === 1, 'first index is [1]');

console.info('CASE first index greater than 50');

var numbers = [5, 12, 8, 130, 44];

var firstIndex = numbers.findIndex(function (element) {
  return element > 50;
});

console.assert(firstIndex === 3, 'first index is [3]');
