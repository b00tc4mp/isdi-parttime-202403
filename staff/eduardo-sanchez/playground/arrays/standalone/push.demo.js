//delete Array.prototype.push


function push(array, element) {
    array[array.length] = element;

    return array.length;
}

var animals = ['lion', 'tiger', 'turtle', 'monkey', 'eagle'];

var farmAnimals = ['pigs', 'goats', 'sheep', 'cows']

for (var i = 0; i < farmAnimals.length; i++) {
    var allAnimals = push(animals, farmAnimals[i]);

}

console.debug(allAnimals)
console.debug(animals)

console.info('ejemplo Manu')

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

console.info('otra forma de hacerlo con farmAnimals')

function push(array, elements) {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        array[array.length] = element;
    }
    return array.length;
}

var animals = ['lion', 'tiger', 'turtle', 'monkey', 'eagle'];
var farmAnimals = ['pigs', 'goats', 'sheep', 'cows'];

var allAnimals = push(animals, farmAnimals);

console.debug(allAnimals);
console.debug(animals);
