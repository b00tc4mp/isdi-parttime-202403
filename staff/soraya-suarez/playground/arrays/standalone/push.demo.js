function push(array) {
    for (var i = 1; i < arguments.length; i++) {
        array [array.length] = arguments[i];
    }
    return array.length;
}

console.info('CASE add animal to array');

var animals = ['pigs', 'goats', 'sheep'];
var count = push(animals, 'cows');

// Expected output: 4
console.assert(count === 4, 'count is 4');

// Expected output: Array ["pigs", "goats", "sheep", "cows"]
console.assert(animals[0] === 'pigs', 'animals 0 is pigs');
console.assert(animals[1] === 'goats', 'animals 0 is goats');
console.assert(animals[2] === 'sheep', 'animals 0 is sheep');
console.assert(animals[3] === 'cows', 'animals 0 is cows');
console.assert(animals.length === 4, 'animals length is 4');

console.info('CASE add various animals to array');

var animals = ['pigs', 'goats', 'sheep', 'cows'];
var count = push(animals, 'chickens', 'cats', 'dogs');

//Expected output: 7
console.assert(count === 7, 'count is 7');

// Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
console.assert(animals[0] === 'pigs', 'animals 0 is pigs');
console.assert(animals[1] === 'goats', 'animals 0 is goats');
console.assert(animals[2] === 'sheep', 'animals 0 is sheep');
console.assert(animals[3] === 'cows', 'animals 0 is cows');
console.assert(animals[4] === 'chickens', 'animals 0 is chickens');
console.assert(animals[5] === 'cats', 'animals 0 is cats');
console.assert(animals[6] === 'dogs', 'animals 0 is dogs');
console.assert(animals.length === 7, 'animals length is 7');