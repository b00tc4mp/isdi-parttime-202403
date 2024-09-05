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

Irriy.prototype.reverse = function () {
    var left

    for (var i = 0, j = this.length - 1; i < j; i++, j--) {
        left = this[i]

        this[i] = this[j]
        this[j] = left
    }

    return this
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

console.info('CASE inverts order of 3 numbers')

var nums = new Irriy('one', 'two', 'three')

var result = nums.reverse()

console.assert(result instanceof Irriy, 'result is an array')
console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'three', 'result value at index 0 is three')
console.assert(result[1] === 'two', 'result value at index 1 is two')
console.assert(result[2] === 'one', 'result value at index 2 is one')
console.assert(result === nums, 'result is nums')

console.info('CASE inverts order of 4 numbers')

var nums = new Irriy('one', 'two', 'three', 'four')

var result = nums.reverse()

console.assert(result instanceof Irriy, 'result is an array')
console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'four', 'result value at index 0 is four')
console.assert(result[1] === 'three', 'result value at index 1 is three')
console.assert(result[2] === 'two', 'result value at index 2 is two')
console.assert(result[3] === 'one', 'result value at index 3 is one')
console.assert(result === nums, 'result is nums')

console.info('CASE inverts order of 5 numbers')

var nums = new Irriy('one', 'two', 'three', 'four', 'five')

var result = nums.reverse()

console.assert(result instanceof Irriy, 'result is an array')
console.assert(result.length === 5, 'result length is 5')
console.assert(result[0] === 'five', 'result value at index 0 is five')
console.assert(result[1] === 'four', 'result value at index 1 is four')
console.assert(result[2] === 'three', 'result value at index 2 is three')
console.assert(result[3] === 'two', 'result value at index 3 is two')
console.assert(result[4] === 'one', 'result value at index 4 is one')
console.assert(result === nums, 'result is nums')

console.info('CASE inverts order of 6 numbers')

var nums = new Irriy('one', 'two', 'three', 'four', 'five', 'six')

var result = nums.reverse()

console.assert(result instanceof Irriy, 'result is an array')
console.assert(result.length === 6, 'result length is 6')
console.assert(result[0] === 'six', 'result value at index 0 is six')
console.assert(result[1] === 'five', 'result value at index 1 is five')
console.assert(result[2] === 'four', 'result value at index 2 is four')
console.assert(result[3] === 'three', 'result value at index 3 is three')
console.assert(result[4] === 'two', 'result value at index 4 is two')
console.assert(result[5] === 'one', 'result value at index 5 is one')
console.assert(result === nums, 'result is nums')

