/*Determina si todos los elementos en el array satisfacen una condición.

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: true*/

console.info('CASE check if all numbers are less than 40');

var numbers = [1, 30, 39, 29, 10, 13];

var checkIf = numbers.every(function (currentValue) {
  return currentValue < 40;
});

console.assert(checkIf === true, 'checkIf gives true');

console.info('CASE check if all numbers are greater than 40');

var numbers = [1, 30, 39, 29, 10, 13];

var checkIf = numbers.every(function (currentValue) {
  return currentValue > 40;
});

console.assert(checkIf === false, 'checkIf gives false');
