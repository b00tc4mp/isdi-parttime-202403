function Irriy() {
    if(arguments.length === 1 && typeof arguments[0] === 'number'){
        var length = arguments[0]

        this.length = length
    }else {
        for(var i = 0; i < arguments.length; i++){
            var argument = arguments[i]
            this[i] =  argument
        }
        this.length = arguments.length
    }
}

Irriy.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++){
        var argument = arguments[i]

        this[this.length] = argument
    }
    return  this.length
}

Irriy.prototype.pop = function () {
    var popped = this[this.length]

    delete this[this.length - 1]

    this.length --

    return popped
}


Irriy.prototype.forEach = function (callback) {
    for ( var i = o; i < this.length; i++) {
      var element = this[i]
    }
  }
  
  
  Irriy.prototype.reverse = function () {
    var left
    for(var i = 0, j = array.length - 1; i<j; i++,j--){
            left = array[i]

            
    }

  }
  

console.info('CASE constructs an instance with two elements')

var fruits = new Irriy('Apple', 'Banana') 

console.assert(fruits instanceof Irriy, ' fruits is instances of Array')
console.assert(fruits.length === 2, 'fruis length is 2')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 0 is Banana')


console.info('CASE constructs an instance with 3 elements')

var fruits = new Irriy('Apple', 'Banana', 'Orange') 

console.assert(fruits instanceof Irriy, ' fruits is instances of Array')
console.assert(fruits.length === 3, 'fruis length is 3')
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple')
console.assert(fruits[1] === 'Banana', 'fruit at index 0 is Banana')
console.assert(fruits[2] === 'Orange', 'fruit at index 0 is Orange')


console.info('CASE constructs an instance with 3 length')

var fruits = new Irriy('Apple', 'Banana', 'Orange')

console.assert(fruits instanceof Irriy, ' fruits is instances of Irriy')
console.assert(fruits.length === 3, 'fruis length is 3')
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined')
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined')
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined')

var fruits = new Irriy(3) // ['3']

console.assert(fruits instanceof Irriy, ' fruits is instances of Array')
console.assert(fruits.length === 1, 'fruis length is 3')
console.assert(fruits[0] === '3', 'fruit at index 0 is "3"')


var animals = new Irriy('pigs', 'goats', 'sheep')

var count = new Irriy('cows')
console.debug(count);

console.assert(count === 4, 'count is 4')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 0 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 0 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 0 is cows')
console.debug(animals);



console.info('CASE add varius animals to array')

var animals = new Irriy('pigs', 'goats', 'sheep')

console.debug(count === 7,'count is 7')
console.assert(animals[0] === 'pigs', 'animal at index 0 is pigs')
console.assert(animals[1] === 'goats', 'animal at index 0 is goats')
console.assert(animals[2] === 'sheep', 'animal at index 0 is sheep')
console.assert(animals[3] === 'cows', 'animal at index 0 is cows')
console.assert(animals[4] === 'chikens', 'animal at index 0 is chikens')
console.assert(animals[5] === 'cats', 'animal at index 0 is cats')
console.assert(animals[6] === 'dogs', 'animal at index 0 is dogs')

console.info('CASE extracts last plant')

var plants = new Irriy('broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato')

var last = plants.pop()
console.log(last)
console.assert(last === 'tomato', 'last is tomato')


console.log(plants);

console.assert(plants.length === 4, 'length is 4')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')
console.assert(plants[3] === 'kale', 'value at 3 is kale')
console.assert(plants[4] === undefined, 'undefined')

var last = plants.pop()
console.log(last)


console.assert(last === 'kale', 'last is kale')
plants.pop();

console.log(plants);
console.assert(plants.length === 3, 'length is 3')
console.assert(plants[0] === 'broccoli', 'value at 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'value at 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'value at 2 is cabbage')


  console.info('CASE print chars to uppercase in console\n')
  
  var chars = new Irriy('a','b','c')
  
  chars.forEach(function (element) { console.log(element.toUpperCase()) })
  
  console.info('\nCASE create objects with each iteration arguments\n')
  
  var cars = new Irriy('lambo','bugatti','ferrari')
  
  var data = new Irriy()
  
  cars.forEach(function(car, index, cars) {
      var o = { car: car, index: index, cars: cars }
  
      data[data.length] = o 
  })
  
  console.debug(data)
  console.table(data)
  
 
console.info('CASE inverts number order')

var nums = new Irriy('one', 'two', 'three')

var resul = num.reverse()
console.log(resul)

console.assert(resul instanceof Irriy, 'result is an array')
console.assert(resul.length === 3, 'result length is 3')
console.assert(resul[0] === 'three', 'result value at index 0 is three')
console.assert(resul[1] === 'two', 'result value at index 1 is two')
console.assert(resul[2] === 'one', 'result value at index 2 is one')
console.assert(resul === nums, 'result is nums')

console.info('CASE inverts number 4 order')
var nums = new Irriy('one', 'two', 'three', 'four')

var resul = num.reverse()
console.log(resul)
console.assert(resul instanceof Irriy, 'result is an array')
console.assert(resul.length === 4, 'result length is 4')
console.assert(resul[0] === 'four', 'result value at index 0 is four')
console.assert(resul[1] === 'three', 'result value at index 1 is three')
console.assert(resul[2] === 'two', 'result value at index 2 is two')
console.assert(resul[3] === 'one', 'result value at index 3 is one')
console.assert(resul === nums, 'result is nums')


console.info('CASE inverts number  order')
var nums = new Irriy('one', 'two', 'three', 'four', 'five')

var resul = nums.reverse()
console.log(resul)
console.assert(resul instanceof Irriy, 'result is an array')
console.assert(resul.length === 5, 'result length is 5')
console.assert(resul[0] === 'five', 'result value at index 0 is five')
console.assert(resul[1] === 'four', 'result value at index 1 is four')
console.assert(resul[2] === 'three', 'result value at index 2 is three')
console.assert(resul[3] === 'two', 'result value at index 3 is two')
console.assert(resul[4] === 'one', 'result value at index 4 is one')
console.assert(resul === nums, 'result is nums')