console.info('CASE add animals to array')


var animals = ['pigs', 'goats', 'sheep'];

var count = animals.push('cows');

console.debug(count);
// Expected output: 4

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]


console.info('CASE addvarious animals to array')

var animals = ['pigs', 'goats', 'sheep', 'cows'];

var count = animals.push('chickens', 'cats', 'dogs');
console.debug(count)
//Exped output: 7

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]



