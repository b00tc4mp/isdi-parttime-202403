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
console.assert(fruits[2] === 'Orange', 'fruit at index 2 is Orange')

console.info('CASE constructs an instance with length 3')

var fruits = new Irriy(3) //[empty x 3]

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 3, 'fruits length is 3')
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined')
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined')
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined')

console.info('CASE constructs an instance with 1 element')

var fruits = new Irriy('3') //['3']

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy')
console.assert(!(fruits instanceof Array), 'fruits is not an instance of Array')
console.assert(fruits.length === 1, 'fruits length is 1')
console.assert(fruits[0] === '3', 'fruit at index 0 is "3"')

console.info('CASE addvarious animals to Irriy')

var animals = new Irriy('pigs', 'goats', 'sheep', 'cows')

var count = animals.push('chickens', 'cats', 'dogs')

console.assert(animals instanceof Irriy, 'animals is instance of Irriy')
console.assert(!(animals instanceof Array), 'animals is not an instance of Array')
console.assert(count === 7, 'count is 7')
console.assert(animals[0] === 'pigs', 'animal 0 is pigs')
console.assert(animals[1] === 'goats', 'animal 1 is goats')
console.assert(animals[2] === 'sheep', 'animal 2 is sheep')
console.assert(animals[3] === 'cows', 'animal 3 is cows')
console.assert(animals[4] === 'chickens', 'animal 4 is chickens')
console.assert(animals[5] === 'cats', 'animal 5 is cats')
console.assert(animals[6] === 'dogs', 'animal 6 is dogs')

console.info('CASE removes the last element from an Irriy')

var plants = new Irriy('broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato')

var last = plants.pop()

console.assert(animals instanceof Irriy, 'animals is instance of Irriy')
console.assert(!(animals instanceof Array), 'animals is not an instance of Array')
console.assert(last === 'tomato', 'last is tomato')
console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')
console.assert(plants[4] === undefined, 'tomato is undefined')


console.info('CASE removes the last element from an Irriy')

var plants = new Irriy('broccoli', 'cauliflower', 'cabbage', 'kale')

var last = plants.pop()

console.assert(animals instanceof Irriy, 'animals is instance of Irriy')
console.assert(!(animals instanceof Array), 'animals is not an instance of Array')
console.assert(last === 'kale', 'last is kale')
console.assert(plants.length === 3, 'length is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === undefined, 'kale is undefined')

