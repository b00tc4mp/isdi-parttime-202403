var animals = ['lion', 'tiger', 'turtle', 'monkey', 'eagle']

var farmAnimals = ['pigs', 'goats', 'sheep', 'cows']

var allAnimals = animals.push(...farmAnimals)
// return animals.concat(farmAnimals)


console.debug(allAnimals)

console.debug(animals)


//////////////////////////////////////

/////////ejerciccio Manu//////////////////////

console.info('CASE add animal to array')

var animals = ['pigs', 'goats', 'sheep']

var count = animals.push('cows')

console.debug(count)
// Expected output: 4

console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

console.info('CASE add various animals to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = animals.push('chickens', 'cats', 'dogs')
console.debug(count)
// 7

console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]