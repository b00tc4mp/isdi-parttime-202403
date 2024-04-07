/*
  El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.

const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
   Expected output: 12
*/

var array1 = [5, 12, 8, 130, 44];

function found(element) {
  return element > 10;
}

console.log(array1.find(found));
