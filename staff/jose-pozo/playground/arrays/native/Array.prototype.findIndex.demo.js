/*
El método findIndex() devuelve el índice del primer elemento de un array que cumpla con la función de prueba proporcionada. En caso contrario devuelve -1.

const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
   Expected output: 3
   */

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 12;
}

console.log(array1.findIndex(isLargeNumber));
