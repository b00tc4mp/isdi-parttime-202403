delete Array.prototype.slice // Eliminamos el metodo slice para evitar usarlo


function slice(array, start = 0, end = array.length) {

  if (start < 0) {
    start = array.length + start
  }

  if (end < 0) {
    end = array.length + end
  }

  var result = []

  for (var i = start; i < end; i++) {
    var element = array[i];
    result[result.length] = element
  }
  return result
}

console.info("--- CASE copy array with start and end --- ")

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var resultAnimals = slice(animals, 2, 4);

console.log(resultAnimals);
// Expected output: Array ["camel", "duck", "elephant"]

//? -----------------------------------------------------------------------

var resultAnimals = slice(animals)

console.log(resultAnimals);

//? -----------------------------------------------------------------------

var resultAnimals = slice(animals, -2)

console.log(resultAnimals);

//? -----------------------------------------------------------------------

var resultAnimals = slice(animals, 2, -1)

console.log(resultAnimals);