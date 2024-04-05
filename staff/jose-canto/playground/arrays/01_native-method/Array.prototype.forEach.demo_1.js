//Ejemplo Usando Metodo array forEach 


console.info("-- CASE print chars to uppercase in console --")

var chars = ["a", "b", "c", "d"]

//Otra forma de escribir el metodo
// var charToUpperCase = function (char) { console.log(char.toUpperCase()) }
function charToUpperCase(char) { console.log(char.toUpperCase()) }

chars.forEach(charToUpperCase)

// Expected output: "A"
// Expected output: "B"
// Expected output: "C"