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

// TEST ASSERT
console.assert(data[0].color === "red", "color is red")
console.assert(data[0].index === 0, "index of color red is 0")
console.assert(data[0].colors[0] === "red", "color of index 0 is red")
console.assert(data[0].colors[1] === "green", "color of index 1 is green")
console.assert(data[0].colors[2] === "blue", "color of index 2 is blue")
console.assert(data[0].colors[3] === "yellow", "color of index 3 is yellow")
console.assert(data.length === 4, "data length is 4")