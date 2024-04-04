delete Array.prototype.forEach // Elminamos el metodo forEach para evitar usar el metodo.

// Recrear metodo forEach

function forEach(array, callback) {

  for (let i = 0; i < array.length; i++) {
    var element = array[i]
    callback(element)
  }
}

// Tenemos un array, llamamos a la función y le pasamos el array, y la función que queremos que se ejecute para cada elemento


console.info(" -- CASE print chars to uppercase in console -- ")

var chars = ['a', 'b', 'c'];
forEach(chars, function (char) { console.log(char.toUpperCase()) })
// Expected output: "A"
// Expected output: "B"
// Expected output: "C"

console.info(" -- CASE print num multiply * 10 -- ")

var numbers = [10, 20, 30, 40,]
forEach(numbers, function (num) { console.log(num * 10) })
// Expected output: "100"
// Expected output: "200"
// Expected output: "300"
// Expected output: "400"


