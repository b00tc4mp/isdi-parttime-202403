//Ejemplo Usando Metodo array push

console.info(" -- CASE add animal to array --")

var animals = ['pigs', 'goats', 'sheep'];

var count = animals.push("cows")
console.debug(count);
// Expected output: 4

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

// ?----------------------------------------------------------

console.info("-- Case add various animals to array --")

var count = animals.push('chickens', 'cats', 'dogs');
console.debug(count);
// Output: 7

console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]


