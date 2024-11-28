delete Array.prototype.push

function push(array, element) {
    if (arguments.length == 2)
        array[array.length] = element
    else
        for (var i = 1; i < arguments.length; i++) {
            var argument = arguments[i]

            array[array.length] = argument
        }

    return array.length
}

console.info('CASE add animal to array')

var animals = ['pigs', 'goats', 'sheep']

var count = push(animals, 'cows')

console.debug(count)
// Expected output: 4

console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows"]

console.info('CASE add various animals to array')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = push(animals, 'chickens', 'cats', 'dogs')
console.debug(count)
// 7

console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]