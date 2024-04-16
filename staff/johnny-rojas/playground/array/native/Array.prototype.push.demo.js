console.info('Case Animals Array')

var animals = ["pigs", "goats", "sheep"];

var count = animals.push("cows");
console.debug(count);
// Expected output: 4
console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

console.info('Case add some other animals to array')

var count = animals.push('chickens', 'cats', 'dogs');
console.debug(count)
// Expected output : 7
console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
