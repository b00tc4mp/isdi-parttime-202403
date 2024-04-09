delete Array.prototype.push

console.info('CASE addvarious animals to array')

function push(array, element) {

        for(var i = 1; i < arguments.length; i++) {
            var argument = arguments[i]

            array[array.length] = argument
        }

    return array.length

}

var animals = ['pigs', 'goats', 'sheep', 'cows'];

var count = push(animals, 'chickens', 'cats', 'dogs');
console.debug(count)
//Exped output: 7

console.debug(animals);
// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]

