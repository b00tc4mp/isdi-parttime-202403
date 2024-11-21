//node staff/debora-garcia/playground/arrays/native/Array.prototype.slice.demo.js  

console.info("**CASE extract animals from index 2**")

var animals = ["ant", "bison", "camel", "duck", "elephant"];
var result=animals.slice(2);

console.log(result)
// Expected output: Array ["camel","duck", "elephant"]

console.assert(result.length === 3, "result length is 3")
console.assert(result[0] === "camel", "result animal at 0 is camel")
console.assert(result[1] === "duck", "result animal at 1 is camel")
console.assert(result[2] === "elephant", "result animal at 2 is elephant")
console.assert(animals.length === 5, "animal length is 5")

console.info("**CASE extract last 2 animals**")

var animals = ["ant", "bison", "camel", "duck", "elephant"]
var result = animals.slice(-2)

console.log(animals.slice(-2))
// Expected output: Array ["duck", "elephant"]

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "duck", "result animal at 0 is duck")
console.assert(result[1] === "elephant", "result animal at 1 is elephant")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract animals from index 2 to 4")

var animals = ["ant", "bison", "camel", "duck", "elephant"]
var result = animals.slice(2, 4)

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "camel", "result animal at 0 is camel")
console.assert(result[1] === "duck", "result animal at 1 is duck")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract animals from index 1 to 5")

var animals = ["ant", "bison", "camel", "duck", "elephant"]
var result = animals.slice(1, 5)

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.assert(result.length === 4, "result length is 4")
console.assert(result[0] === "bison", "result animal at 0 is bison")
console.assert(result[1] === "camel", "result animal at 1 is camel")
console.assert(result[2] === "duck", "result animal at 2 is duck")
console.assert(result[3] === "elephant", "result animal at 3 is elephant")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index 2 to -1")

var animals = ["ant", "bison", "camel", "duck", "elephant"]
var result = animals.slice(2, -1)

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "camel", "result animal at 0 is camel")
console.assert(result[1] === "duck", "result animal at 1 is duck")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.info("CASE extract from index -4 to -2")

var animals = ["ant", "bison", "camel", "duck", "elephant"]
var result = animals.slice(-4, -2)

console.log(animals.slice( -4, -2))
// Expected output: Array ["bison", "camel"]

console.assert(result.length === 2, "result length is 2")
console.assert(result[0] === "bison", "result animal at 0 is bison")
console.assert(result[1] === "camel", "result animal at 1 is camel")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")


console.info("CASE extract a copy of animals")

var animals = ["ant", "bison", "camel", "duck", "elephant"]
var result = animals.slice()

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]

console.assert(result.length === 5, "result length is 5")
console.assert(result[0] === "ant", "result at 0 is ant")
console.assert(result[1] === "bison", "result at 1 is bison")
console.assert(result[2] === "camel", "result at 2 is camel")
console.assert(result[3] === "duck", "result at 3 is duck")
console.assert(result[4] === "elephant", "result at 4 is elephant")

console.assert(animals.length === 5, "animals length is 5")
console.assert(animals[0] === "ant", "animals at 0 is ant")
console.assert(animals[1] === "bison", "animals at 1 is bison")
console.assert(animals[2] === "camel", "animals at 2 is camel")
console.assert(animals[3] === "duck", "animals at 3 is duck")
console.assert(animals[4] === "elephant", "animals at 4 is elephant")

console.assert(result !== animals, "result is not the same instance as animals (different references)")



