delete Array.prototype.push

function push(array, element) {
    array[array.length] = element

    return array.length
}

console.info('CASE add animal to array')

var animals = ['pigs', 'goats', 'sheep']

var count = push(animals, 'cows')

console.debug(count)
// Expected output: 4

console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

// console.info('CASE add various animals to array')

// var animals = ['pigs', 'goats', 'sheep', 'cows']

// var count = push(animals, 'chickens', 'cats', 'dogs')
// console.debug(count)
// // 7

// console.debug(animals)
// // Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]