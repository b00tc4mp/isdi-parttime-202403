console.info('**CASE extracts last plant**')
var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var popped=plants.pop()
console.log(popped)
// Expected output: "tomato"
console.assert(popped==="tomato","last element removed ")

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')

popped=plants.pop();
console.log(popped)
// Expected output: "kale"
console.assert(popped === 'kale', 'last is kale')

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]
console.assert(plants.length === 3, 'length is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')

console.table(plants)
