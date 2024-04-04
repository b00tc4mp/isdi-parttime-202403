// function forEach(array, callback) {
//     (function loop(i) { // IIFE & closure
//         if (i < array.length) {
//             var element = array[i]

//             callback(element)

//             loop(i + 1)
//         }
//     })(0)
// }

// Recrear metodo forEach

function forEach(array, callback) {

  for (let i = 0; i < array.length; i++) {

    var element = array[i]

    callback(element)
  }
}

// Tenemos un array, llamamos a la función y le pasamos el array, y la función que queremos que se ejecute para cada elemento

var chars = ['a', 'b', 'c'];
forEach(chars, function (char) { console.log(char.toUpperCase()) })
// Expected output: "A"
// Expected output: "B"
// Expected output: "C"


var numbers = [10, 20, 30, 40,]
forEach(numbers, function (num) { console.log(num * 10) })
// Expected output: "100"
// Expected output: "200"
// Expected output: "300"
// Expected output: "400"