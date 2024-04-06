delete Array.prototype.forEach // Elminamos el metodo forEach para evitar usar el metodo.

// Recrear metodo forEach

function forEach(array, callback) {

  for (let i = 0; i < array.length; i++) {
    var element = array[i]
    callback(element)
  }
}
// Tenemos un array, llamamos a la función y le pasamos el array, y la función que queremos que se ejecute para cada elemento
//? -------------------------------------------------------------

console.info(" -- CASE print chars to uppercase in console -- ")

var chars = ['a', 'b', 'c'];
var toUpperCase = []
forEach(chars, function (char) {

  toUpperCase[toUpperCase.length] = char.toUpperCase()
})
console.info(toUpperCase)
// Expected output: [ 'A', 'B', 'C' ]

//! TEST ASSERT

console.assert(toUpperCase[0] === "A", "toUpperCase a is A")
console.assert(toUpperCase[1] === "B", "toUpperCase b is B")
console.assert(toUpperCase[2] === "C", "toUpperCase c is C")

//? ----------------------------------------------------------

console.info(" -- CASE print num multiply * 10 -- ")

var numbers = [10, 20, 30, 40,]
var numBy10 = []
forEach(numbers, function (num) {

  numBy10[numBy10.length] = num * 10
})
console.info(numBy10)
// Expected output: [ 100, 200, 300, 400 ]


//! TEST ASSERT

console.assert(numBy10[0] === 100, "(10 * 10) is 100")
console.assert(numBy10[1] === 200, "(20 * 10) is 200")
console.assert(numBy10[2] === 300, "(30 * 10) is 300")
console.assert(numBy10[3] === 400, "(40 * 10) is 400")


