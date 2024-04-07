/*
El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.filter((word) => word.length > 6);

console.log(result);
 Expected output: Array ["exuberant", "destruction", "present"]
*/

var words = ["spray", "elite", "exuberant", "destruction", "present"];

function result(word) {
  return word.length > 6;
}

console.log(words.filter(result));
