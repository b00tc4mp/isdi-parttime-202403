console.info('CASE extract the last element')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
var lastElement = plants.pop()

console.assert(lastElement === 'tomato', 'lastElement is tomato')
console.assert(plants.length === 4, 'plants.length is 4')
console.assert(plants[0] === 'broccoli', 'plants[0] is broccoli')
console.assert(plants[1] === 'cauliflower', 'plants[1] is cauliflower')
console.assert(plants[2] === 'cabbage', 'plants[2] is cabbage')
console.assert(plants[3] === 'kale', 'plants[3] is kale')
