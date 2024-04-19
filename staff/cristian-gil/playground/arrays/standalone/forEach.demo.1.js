// function forEach(array, callback) {
//     (function loop(i) { // IIFE & closure
//         if (i < array.length) {
//             var element = array[i]

//             callback(element)

//             loop(i + 1)
//         }
//     })(0)
// }

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element)
    }
}

// CASE print chars to uppercase in console

var chars = ['a', 'b', 'c']

forEach(chars, function (element) { console.log(element.toUpperCase()) })