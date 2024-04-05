delete Array.prototype.map // Elminamos el metodo map para evitar usar el metodo.

// Recrear el metodo map

function map(array, callback) {
  var mapped = []

  for (var i = 0; i < array.length; i++) {

    var element = array[i];
    var mappedElement = callback(element)

    //mapped[mapped.length] = mappedElement // almacena al final del array el elemento
    mapped[i] = mappedElement // accede a un indice especifico, accede al indice que esta pasando en el for, lo almacena en el mismo lugar que en el indice del for.
  }
  return mapped
}

console.info(" -- Case nums multiply * 2 -- ")
var nums = [2, 4, 6, 8, 10];
var numsBy2 = map(nums, function (num) { return num * 2 })

console.debug(nums) // [ 2, 4, 6, 8, 10 ]
console.debug(numsBy2) // [ 4, 8, 12, 16, 20 ]

// TEST ASSERT

var expectedNumsBy2 = [4, 8, 12, 16, 20]
// Verifica si los arrays convertidos en cadenas JSON son iguales y muestra un mensaje de error si no lo son.
console.assert(
  // Convierte el array numsBy2 en una cadena JSON y compáralo con la cadena JSON del array esperado (expectedNumsBy2).
  JSON.stringify(numsBy2) === JSON.stringify(expectedNumsBy2),
  // Mensaje de error que se mostrará en la consola si la aserción falla.
  'El array devuelto no coincide con el array esperado.'
);

// ------------------------------------------------------------------------

console.info(" -- CASE names toUpperCase() --")
var names = ["JaCk", "peTeR", "johNnY", "luNa"]

var nameToUpperCase = map(names, function (name) { return name.toUpperCase() })

console.debug(names)
console.debug(nameToUpperCase)

// TEST ASSERT

var expectedNamesToUpperCase = ['JACK', 'PETER', 'JOHNNY', 'LUNA']

console.assert(JSON.stringify(nameToUpperCase) === JSON.stringify(expectedNamesToUpperCase), "expected --> ['JACK', 'PETER', 'JOHNNY', 'LUNA']")


