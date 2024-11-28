console.info('CASO añadir animal con array')

var animals = ['pigs', 'goats', 'sheep']
var count = animals.push('cows')

console.assert(animals.length === 4, 'animals length is 4')
console.assert(animals[0] === 'pigs', 'animals at 0 is pigs')
console.assert(animals[1] === 'goats', 'animals at 1 is goats')
console.assert(animals[2] === 'sheep', 'animals at 2 is sheep')


console.info('CASO añadir varios animales con array')

var animals = ['pigs', 'goats', 'sheep', 'cows']
var count = animals.push('chickens', 'cats', 'dogs')

console.assert(animals.length === 7, 'animals length is 7')
console.assert(animals[0] === 'pigs', 'animals at 0 is pigs')
console.assert(animals[1] === 'goats', 'animals at 1 is goats')
console.assert(animals[2] === 'sheep', 'animals at 2 is sheep')