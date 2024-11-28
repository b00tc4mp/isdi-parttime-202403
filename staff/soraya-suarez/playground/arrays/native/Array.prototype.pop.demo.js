console.info('CASE delete last element of array');

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
var popped = plants.pop();

// Expected output: "tomato"
console.assert(popped === 'tomato', 'tomato element removed');

// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
console.assert(plants[0] === 'broccoli', 'plants 0 is broccoli');
console.assert(plants[1] === 'cauliflower', 'plants 1 is cauliflower');
console.assert(plants[2] === 'cabbage', 'plants 2 is cabbage');
console.assert(plants[3] === 'kale', 'plants 3 is kale');
console.assert(plants.length === 4, 'plants length is 4');

console.info('CASE delete last element of array');

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale'];
var popped = plants.pop();

// Expected output: "kale"
console.assert(popped === 'kale', ' kale element removed');

// Expected output: Array ["broccoli", "cauliflower", "cabbage"]
console.assert(plants[0] === 'broccoli', 'plants 0 is broccoli');
console.assert(plants[1] === 'cauliflower', 'plants 1 is cauliflower');
console.assert(plants[2] === 'cabbage', 'plants 2 is cabbage');
console.assert(plants.length === 3, 'plants length is 3');