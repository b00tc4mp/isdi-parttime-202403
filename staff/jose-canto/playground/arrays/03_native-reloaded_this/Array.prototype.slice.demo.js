delete Array.prototype.slice // Eliminamos el metodo slice para evitar usarlo


Array.prototype.slice = function (start = 0, end = this.length) {

  if (start < 0) {
    start = this.length + start
  }

  if (end < 0) {
    end = this.length + end
  }

  var result = []

  for (var i = start; i < end; i++) {
    var element = this[i];
    result[result.length] = element
  }
  return result
}

console.info("--- CASE copy array with start and end --- ")

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var resultAnimals = animals.slice(1, 5);

console.log(resultAnimals);
// Expected output: Array ["camel", "duck", "elephant"]

//? -----------------------------------------------------------------------

var resultAnimals = animals.slice()

console.log(resultAnimals);

//? -----------------------------------------------------------------------

var resultAnimals = animals.slice(2)

console.log(resultAnimals);

//? -----------------------------------------------------------------------

var resultAnimals = animals.slice(2, -1)

console.log(resultAnimals);