console.info('CASE removes the last element from an array and returns that element')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var last = plants.pop()

console.assert(last === 'tomato', 'last is tomato')
console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')


console.info('CASE removes the last element from an array and returns that element')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale']

var last = plants.pop()

console.assert(last === 'kale', 'last is kale')
console.assert(plants.length === 3, 'length is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')