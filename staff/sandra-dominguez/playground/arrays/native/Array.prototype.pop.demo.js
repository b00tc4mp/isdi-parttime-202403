//CASO quitar ultimo elemento del array

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']

var remove = plants.pop()
console.debug(remove)

console.debug(plants)

//CASO quitar uno más

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale']

var remove = plants.pop('kale')

console.debug(remove)
console.debug(plants)