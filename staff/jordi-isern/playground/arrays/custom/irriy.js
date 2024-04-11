function Irriy() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
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
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[this.length] = argument
        this.length++
    }

    return this.length
}

Irriy.prototype.pop = function () { 
    var pop = this[this.length - 1]

    delete this[this.length - 1]
    
    this.length = this.length - 1

    return pop
}

console.info('CASE constructs an instance with 2 elements')

var fruits = new Irriy('Apple', 'Banana')

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 2, 'fruits length is 2')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')

console.info('CASE constructs an instance with 3 elements')

var fruits = new Irriy('Apple', 'Banana', 'Orange')

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana')
console.assert(fruits[2] === 'Orange', 'fruit at index 1 is Orange')

console.info('CASE constructs an instance with length 3')

var fruits = new Irriy(3)

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined')
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined')
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined')

console.info('CASE constructs an instance with 1 element')

var fruits = new Irriy('3')

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(fruits.length === 1, 'fruits length is 1')
console.assert(fruits[0] === '3', 'fruit at index 0 is "3"')

console.info('CASE add animal to irriy')

var animals = new Irriy('pigs', 'goats', 'sheep')

var count = animals.push('cows')

console.assert(animals instanceof Irriy, 'animals is instance of Irriy')
console.assert(!(animals instanceof Array), 'animals is not an instance of Array')
console.assert(count === 4, 'count is 4')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 1 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 2 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 3 is cows')

console.info('CASE add various animals to irriy')

var animals = new Irriy('pigs', 'goats', 'sheep', 'cows')

var count = animals.push('chickens', 'cats', 'dogs')

console.assert(animals instanceof Irriy, 'animals is instance of Irriy')
console.assert(!(animals instanceof Array), 'animals is not an instance of Array')
console.assert(count === 7, 'count is 7')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 1 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 2 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 3 is cows')
console.assert(animals[4] === 'chickens', 'animal at index 4 is chickens')
console.assert(animals[5] === 'cats', 'animal at index 5 is cats')
console.assert(animals[6] === 'dogs', 'animal at index 6 is dogs')

console.info('CASE pop in inrriy')

var plants = new Irriy('broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato');

console.assert(plants instanceof Irriy, 'plants is instance of Irriy')

var poped = plants.pop();
console.assert(poped === 'tomato', "tiene que devolver tomato")
console.assert(plants.length === 4, "el length tiene que ser 4")

console.assert(plants[0] === 'broccoli', 'el elemento 0 ha de ser boccoli')
console.assert(plants[1] === 'cauliflower', 'el elemento 1 tiene que ser cauliflower')
console.assert(plants[2] === 'cabbage', 'el elemento 1 tiene que ser cabbage')
console.assert(plants[3] === 'kale', 'el elemento 1 tiene que ser kale')
console.assert(plants[4] === undefined, 'el elemento 4 (tomtato) no ha de existir')
plants.pop();

console.assert(plants.length === 3, 'el largo tiene que ser 3')


console.assert(plants[0] === 'broccoli', 'el elemento 0 ha de ser boccoli')
console.assert(plants[1] === 'cauliflower', 'el elemento 1 tiene que ser cauliflower')
console.assert(plants[2] === 'cabbage', 'el elemento 1 tiene que ser cabbage')

