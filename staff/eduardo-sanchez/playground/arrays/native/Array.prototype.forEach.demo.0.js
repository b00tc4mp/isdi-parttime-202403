// CASE print chars to uppercase in console

var chars = ['a', 'b', 'c']


//Otra forma de escribir el metodo
//var charToUpperCase = function (element) { console.log(element.toUpperCase()) }
function charToUpperCase(element) { console.log(element.toUpperCase()) }

chars.forEach(charToUpperCase)
// A
// B
// C


////////////////////////////////////////////////////////


//Ejemplo Usando Metodo array forEach


console.info(" -- CASE print chars to uppercase in console -- ")
var chars = ['a', 'b', 'c'];

chars.forEach(function (char) { console.log(char.toUpperCase()) });
// Expected output: "A"
// Expected output: "B"
// Expected output: "C"


console.info(" -- CASE print num multiply * 10 -- ")
var numbers = [10, 20, 30, 40]

numbers.forEach(function (num) {
    console.log(num * 10)
})
// Expected output: "100"
// Expected output: "200"
// Expected output: "300"
// Expected output: "400"


