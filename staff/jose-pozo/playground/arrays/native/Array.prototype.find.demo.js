/*El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.

const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// Expected output: 12*/

console.info('CASE first element greater than 10');

var numbers = [5, 12, 8, 130, 44];

var firstNumber = numbers.find(function (element) {
  return element > 10;
});

console.assert(firstNumber === 12, 'first number found is 12');

console.info('CASE first element greater than 50');

var numbers = [5, 12, 8, 130, 44];

var firstNumber = numbers.find(function (element) {
  return element > 50;
});

console.assert(firstNumber === 130, 'first number found is 130');
