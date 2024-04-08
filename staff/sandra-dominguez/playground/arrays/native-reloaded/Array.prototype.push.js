
Array.prototype.push = function () {
    for(var i = 0; i < arguments.length; i++) {  // empezamos de 0 porque la funcion ya no tiene el array.
        var argument = arguments[i]

        this[this.length] = argument
    }
    return this.length
}

//CASO añade un animal al array

var animals = ['pigs', 'goats', 'sheep']
var count = animals.push('cows')

console.debug(count)
console.assert(count === 4, 'count is 4')
console.debug(animals)

console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals.length === 4, 'animals length is 4')


//CASO 2 añadir varios animales al array

var animals = ['pigs', 'goats', 'sheep', 'cows']

var count = animals.push('chickens', 'cats', 'dogs')

console.debug(count)
console.assert(count === 7, 'count is 7')

console.debug(animals)

console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals[4] === 'chickens', 'animals 4 is chickens')
console.assert(animals[5] === 'cats', 'animals 5 is cats')
console.assert(animals[6] === 'dogs', 'animals 6 is dogs')
console.assert(animals.length === 7, 'animals length is 7')