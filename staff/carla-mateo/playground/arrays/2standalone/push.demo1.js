delete Array.prototype.push

console.info('CASE add animals to array')

function push(array, element) {
    array[array.length] = element

    return array.length

}

var animals = ['pigs', 'goats', 'sheep'];

var count = push(animals, 'cows');

console.debug(count);
// Expected output: 4

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows"]



