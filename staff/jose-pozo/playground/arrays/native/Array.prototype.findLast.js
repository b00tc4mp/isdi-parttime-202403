/*El método findIndex encuentra el primer elemento de un array que cumpla con la condición especificada en la función (callback).

const array1 = [5, 12, 50, 130, 44];

const found = array1.findLast((element) => element > 45);

console.log(found);
// Expected output: 130*/

console.info('CASE last number greater than 45');

var numbers = [5, 12, 50, 130, 44];

var lastNumber = numbers.findLast(function (element) {
  return element > 45;
});

console.assert(lastNumber === 130, 'last number found is 130');

console.info('CASE last number less than 45');

var numbers = [5, 12, 50, 130, 44];

var lastNumber = numbers.findLast(function (element) {
  return element < 45;
});

console.assert(lastNumber === 44, 'last number found is 45');
