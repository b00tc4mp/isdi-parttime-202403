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

Irriy.prototype.pop = function(){

    if(this.length === 0){
        return undefined

    }else{
        var lastElement = this[this.length - 1] 

        this.length = this.length - 1

        return lastElement
    }  
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



console.info('CASE remove the last fruit in the array')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var poped = plants.pop()

console.assert(poped === 'tomato', 'poped return tomato')
console.assert(plants.length === 4, 'plants lengths is 4')
console.assert(plants[0] === 'broccoli', 'plant index 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plant index 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plant index 2 is cabbage')
console.assert(plants[3] === 'kale', 'plant index 3 is kale')

plants.pop();

console.assert(plants.length === 3, 'plants lengths is 4')
console.assert(plants[0] === 'broccoli', 'plant index 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plant index 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plant index 2 is cabbage')



console.info('CASE remove the last fish in the array and collect it in an array')

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

var popped = myFish.pop();

console.assert(popped === 'sturgeon')
console.assert(myFish.length === 3)
console.assert(myFish[0] === 'angel', 'fish index 0 is angel')
console.assert(myFish[1] === 'clown', 'fish index 1 is clown')
console.assert(myFish[2] === 'mandarin', 'fish index 2 is mandarin')