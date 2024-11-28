console.info('CASE add animal to array')

var animals = ['pigs', 'goats', 'sheep']

var count = animals.push('cows')

console.assert(count === 4, 'count is 4')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 1 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 2 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 3 is cows')

//---------------------------------------------------

console.info('CASE add various animals to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = animals.push('chickens', 'cats', 'dogs')

console.assert(count === 7, 'count is 7')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 1 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 2 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 3 is cows')
console.assert(animals[4] === 'chickens', 'animal at index 4 is chickens')
console.assert(animals[5] === 'cats', 'animal at index 5 is cats')
console.assert(animals[6] === 'dogs', 'animal at index 6 is dogs')
