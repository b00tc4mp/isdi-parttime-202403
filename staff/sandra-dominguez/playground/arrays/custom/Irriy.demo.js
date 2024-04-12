function Irriy() {
    if (arguments.length === 1) {
        var length = arguments[0]

        this.length = length
    } else {
        for (var i = 0; i < arguments.length; i++) {
            var argument = arguments[i]

            this[i] = argument
        }

        this.length = arguments.length
    }
}


Irriy.prototype.push = function () {
    for(var i = 0; i < arguments.length; i++) { 
        var argument = arguments[i]

        this[this.length] = argument
        this.length++
    }
    return this.length
}


Irriy.prototype.pop = function () {
    var remove = this[this.length - 1]

    delete this[this.length - 1]

    this.length--

    return remove
}

Irriy.prototype.forEach = function (callback) {
    for(var i = 0; i < this.length; i++) {
        var element = this[i]

        this.length++

        callback(element, i, this)
    }
}

Irriy.prototype.reverse = function() {
    var izq

    for(var i = 0, j = this.length - 1; i < j; i++, j--) {
        izq = this[i]

        this[i] = this[j]
        this[j] = izq
    }
    return this   
}


//ARRAY
console.info('CASO construye una instancia con 2 elementos')

var fruits = new Irriy('Apple', 'Banana')

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 2, 'fruits length is 2')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')

console.info('CASO construye una instancia con 3 elementos')

var fruits = new Irriy('Apple', 'Banana', 'Orange')

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')
console.assert(fruits[2] === 'Orange', 'fruit at index 2 is Orange')

console.info('CASO construye una instancia con longitud 3')

var fruits = new Irriy(3)

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined')
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined')
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined')


//PUSH
console.info('CASO añade un animal al array')

var animals = new Irriy('pigs', 'goats', 'sheep')
var count = animals.push('cows')

console.assert(animals instanceof Irriy, 'animals is instance of Irriy')
console.assert(!(animals instanceof Array), 'animals is not an instance of Array')

console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals.length === 4, 'animals length is 4')


console.info('CASO añadir varios animales al array')

var animals = new Irriy('pigs', 'goats', 'sheep', 'cows')
var count = animals.push('chickens', 'cats', 'dogs')

console.assert(animals instanceof Irriy, 'animals is instance of Irriy')
console.assert(!(animals instanceof Array), 'animals is not an instance of Array')

console.assert(animals[0] === 'pigs', 'animals 0 is pigs')
console.assert(animals[1] === 'goats', 'animals 1 is goats')
console.assert(animals[2] === 'sheep', 'animals 2 is sheep')
console.assert(animals[3] === 'cows', 'animals 3 is cows')
console.assert(animals[4] === 'chickens', 'animals 4 is chickens')
console.assert(animals[5] === 'cats', 'animals 5 is cats')
console.assert(animals[6] === 'dogs', 'animals 6 is dogs')
console.assert(animals.length === 7, 'animals length is 7')

//POP
console.info('CASO quitar ultimo elemento')

var plants = new Irriy('broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato')
var remove = plants.pop()

console.assert(plants instanceof Irriy, 'plants is instance of Irriy')
console.assert(!(plants instanceof Array), 'plants is not an instance of Array')

console.assert(remove === 'tomato', 'returns tomato')
console.assert(plants.length === 4, 'plants length is 4')

console.assert(plants[0] === 'broccoli', 'plants 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plants 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plants 2 is cabbage')
console.assert(plants[3] === 'kale', 'plants 3 is kale')
console.assert(plants[4] === undefined, 'the tomato element must not exist')
plants.pop()

console.assert(plants.length === 3, 'plants length is 3')
console.assert(plants[0] === 'broccoli', 'plants 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plants 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plants 2 is cabbage')

//FOREACH
console.info('CASO crear un objeto con cada argumento de iteración')

var chars = new Irriy('a', 'b', 'c')

console.assert(chars instanceof Irriy, 'chars is instance of Irriy')
console.assert(!(chars instanceof Array), 'chars is not an instance of Array')

console.assert(chars.length === 3, 'chars length is 3')

console.assert(chars[0] === 'a', 'chars 0 is a')
console.assert(chars[1] === 'b', 'chars 1 is b')
console.assert(chars[2] === 'c', 'chars 2 is c')

//REVERSE
console.info('CASO invertir 3 posiciones')

var nums = new Irriy ('one', 'two', 'three')
var result = nums.reverse()

console.assert(result instanceof Irriy, 'result is instance of Irriy')
console.assert(!(result instanceof Array), 'result is not an instance of Array')
console.assert(result.length === 3, 'la longitud es 3')
console.assert(result[0] === 'three', 'el resultado del indice 0 es three')
console.assert(result[1] === 'two', 'el resultado del indice 1 es two')
console.assert(result[2] === 'one', 'el resultado del indice 2 es one')
console.assert(result === nums, 'el resultado es nums')


console.info('CASO invertir 4 posiciones')

var nums = new Irriy ('one', 'two', 'three', 'four')
var result = nums.reverse()

console.assert(result instanceof Irriy, 'result is instance of Irriy')
console.assert(!(result instanceof Array), 'result is not an instance of Array')
console.assert(result.length === 4, 'la longitud es 4')
console.assert(result[0] === 'four', 'el resultado del indice 0 es four')
console.assert(result[1] === 'three', 'el resultado del indice 1 es three')
console.assert(result[2] === 'two', 'el resultado del indice 2 es two')
console.assert(result[3] === 'one', 'el resultado del indice 3 es one')
console.assert(result === nums, 'el resultado es nums')