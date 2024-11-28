console.info('CASE add animal to array')

var animals = ['pigs', 'goats', 'sheep'];

var count = animals.push('cows');
console.debug(count);
// Expected output: 4
console.assert(count === 4, 'count is 4')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 0 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 0 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 0 is cows')
console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]


console.info('CASE add varius animals to array')

var animals = ['pigs', 'goats', 'sheep'];
animals.push('chickens', 'cats', 'dogs');

console.debug(count === 7,'count is 7')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 0 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 0 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 0 is cows')
console.assert(animals[4] === 'chikens', 'animal at index 0 is chikens')
console.assert(animals[5] === 'cats', 'animal at index 0 is cats')
console.assert(animals[6] === 'dogs', 'animal at index 0 is dogs')

// 7
console.log(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
