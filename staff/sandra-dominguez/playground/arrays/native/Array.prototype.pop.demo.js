console.info('CASO quitar ultimo elemento del array')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']
var remove = plants.pop()

console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')
console.assert(plants[4] === undefined, 'el elemento 4 tomato no ha de existir')

console.info('CASO quitar uno más')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale']
var remove = plants.pop()

console.assert(plants.length === 3, 'length is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === undefined, 'el elemento 3 kale no ha de existir')