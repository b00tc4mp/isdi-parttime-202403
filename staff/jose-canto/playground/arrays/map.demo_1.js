delete Array.prototype.map // Elminamos el metodo map para evitar usar el metodo.

// Recrear el metodo map

function map(array, callback) {
  var mapped = []

  for (var i = 0; i < array.length; i++) {

    var element = array[i];
    var mappedElement = callback(element, i, array)

    //mapped[mapped.length] = mappedElement // almacena al final del array el elemento
    mapped[i] = mappedElement // accede a un indice especifico, accede al indice que esta pasando en el for, lo almacena en el mismo lugar que en el indice del for.
  }
  return mapped
}

console.info("-- CASE map elements and other arguments into objects --")

var colors = ['red', 'green', 'blue', 'yellow']

var data = map(colors, function (color, index, colors) {
  var object = { color: color, index: index, colors: colors }

  return object
})

console.debug(data)
console.table(data)