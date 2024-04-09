//CASO quitar ultimo elemento del array

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

var remove = plants.pop()
console.debug(remove)
console.debug(plants)

//CASO quitar uno más

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale']

console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')

var remove = plants.pop()
console.debug(remove)
console.debug(plants)