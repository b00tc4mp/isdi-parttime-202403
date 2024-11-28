delete Array.prototype.push

console.info('CASE addvarious animals to array')

function push(array, element) {

        for(var i = 1; i < arguments.length; i++) {
            var argument = arguments[i]

            array[array.length] = argument
        }

    return array.length

}

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = push(animals, 'chickens', 'cats', 'dogs')
console.debug(count)
//Exped output: 7

console.assert(count === 7, 'count is 7')

console.debug(animals)
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]

console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals[4] === 'chickens', 'animals 4 is chickens')
console.assert(animals[5] === 'cats', 'animals 5 is cats')
console.assert(animals[6] === 'dogs', 'animals 6 is cats')
console.assert(animals.length === 7, 'animals length is 7')

