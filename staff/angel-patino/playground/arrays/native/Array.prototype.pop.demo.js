console.info('CASE extracts last plant')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var last = plants.pop()
console.log(last)
// Expected output: "tomato"
console.assert(last === 'tomato', 'last is tomato')


console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')


var last = plants.pop()
console.log(last)
// Expected output: "kale"

console.assert(last === 'kale', 'last is kale')
plants.pop();

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]
console.assert(plants.length === 3, 'length is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')