//Ejemplo Usando Metodo array find

console.info("--- CASE find numbers > 10 in object ---")

var numbers = [5, 12, 8, 130, 44];

var found = []
numbers.find(function (num, index) {
  var object = { num: num, index: index }

  if (num > 10) {
    found[found.length] = object
  }
});

console.table(found);
/* Expected output: [
{ num: 12, index: 1 },
{ num: 130, index: 3 },
{ num: 44, index: 4 }
]
*/

//!TEST ASSERT

console.assert(found.length === 3, 'length of found is 3')
console.assert(found[0].num === 12, 'num at index 0 is 12');
console.assert(found[1].num === 130, 'num at index 1 is 130')
console.assert(found[2].num === 44, 'num at index 2 is 44')
