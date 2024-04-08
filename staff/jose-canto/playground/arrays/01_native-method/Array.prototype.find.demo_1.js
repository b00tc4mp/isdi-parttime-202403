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

console.log(found);
/* Expected output: [
{ num: 12, index: 1 },
{ num: 130, index: 3 },
{ num: 44, index: 4 }
]
*/
