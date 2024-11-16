//Inventandonos un Array desde cero con constructoras
function Irriy() {
   if (arguments.length === 1 && typeof arguments[0] === 'number'){
            var length = arguments[0]

            this.length = length
   }else{
   
            for(var i = 0; i < arguments.length; i++){
            var argument = argument[i]

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




console.info('CASE constructs an instance with two elements')

var fruits = new Array('Apple', 'Banana')

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 2 , 'fruits length is 2')
console.assert(fruits[0] === 'Apple' , 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana' , 'fruit at index 1 is Banana')

console.info('CASE constructs an instance with 3 elements')

var fruits = new Array('Apple', 'Banana', 'Orange')

console.assert(fruits instanceof Array, 'fruits is instance of Array')
console.assert(fruits.length === 3 , 'fruits length is 3')
console.assert(fruits[0] === 'Apple' , 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana' , 'fruit at index 1 is Banana')
console.assert(fruits[2] === 'Orange' , 'fruit at index 2 is Orange')



console.asser(count === 7, 'count is 7')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 1 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 2 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 3 is cows')
console.assert(animals[4] === 'chickens', 'animal at index 4 is chickens')
console.assert(animals[5] === 'cats', 'animal at index 5 is cats')
console.assert(animals[6] === 'dogs', 'animal at index 6 is dogs')