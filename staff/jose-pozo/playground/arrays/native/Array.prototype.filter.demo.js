/*El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.

const words = ["spray", "elite", "exuberant", "destruction", "present"];

const result = words.filter((word) => word.length > 6);

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]*/

console.info('CASE create new array with length greater than 6');

var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var filtered = words.filter(function (word) {
  return word.length > 6;
});

console.assert(filtered.length === 3, 'filtered length is 3');
console.assert(filtered[0] === 'exuberant', 'filtered at 0 is exuberant');
console.assert(filtered[1] === 'destruction', 'filtered at 1 is destruction');
console.assert(filtered[2] === 'present', 'filtered at 2 is present');
console.assert(words.length === 5, 'words length is 5');
