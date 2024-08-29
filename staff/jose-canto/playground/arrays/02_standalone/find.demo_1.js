delete Array.prototype.find // Elminamos el metodo find para evitar usar el metodo.

// Recrear metodo find

function find(array, callback) {

  for (var i = 0; i < array.length; i++) {
    var element = array[i]

    var matches = callback(element, i)

    if (matches) {
      return element
    }
  }
}

console.info("--- CASE number > 10 ---")
var numbers = [5, 12, 8, 130, 44];


find(numbers, function (num, index) {

  if (num > 10) {
    console.log({ num: num, index: index });
  }
});


//? -----------------------------------------------------------------------------------

console.info("--- CASE show index that have values  ---")

// Declarar un array sin elementos en los índices 2, 3 y 4
const array = [0, 1, , , , 5, 6];

// Muestra todos los índices, no sólo aquellos que tienen valores asignados
find(array, function (value, index) {
  console.log("Visited index " + index + " with value " + value);
});