//Ejemplo Usando Metodo array concat


var numbers = [1, 2, 3];
var chars = ['d', 'e', 'f'];
var result = numbers.concat(chars);

console.log(result);
// Expected output: Array [1, 2, 3, "d", "e", "f"]


//! TEST ASSERT
console.assert(result[0] === 1, "index 0 of result is 1")
console.assert(result[1] === 2, "index 1 of result is 2")
console.assert(result[2] === 3, "index 2 of result is 3")
console.assert(result[3] === "d", "index 3 of result is d")
console.assert(result[4] === "e", "index 4 of result is e")
console.assert(result[5] === "f", "index 5 of result is f")