delete Array.prototype.pop()
//delete Array.prototype.push()
delete Array.prototype.reverse()

function Irriy() {
    if (arguments.length === 1 && typeof arguments[0] === "number") {
        // si Irriy(numero): array vacio con longitud= numero
        var length = arguments[0] // longitud= al valor numerico del argumento

        this.length = length

    } else {
        for (var i = 0; i < arguments.length; i++) {
            var argument = arguments[i];
            this[i] = argument // "Irriy"[i]=argument
        }

        this.length = arguments.length
    }

}

// creamos los metodos asociados al prototipo Irriy como hariamos con el Array:

// METODO PUSH 

Irriy.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[this.length] = argument
        this.length++
        //añadimos esta linea ya que nuestro "Array" Irriy no es capa de autoincrementar su longitud.

    }
    return this.length

}

//METODO REVERSE

Irriy.prototype.reverse = function () {
    var left

    for (var i = 0, j = this.length - 1; i < j; i++, j--) {
        left = this[i]

        this[i] = this[j]
        this[j] = left
    }

    return this
}

//METODO POP

Irriy.prototype.pop = function () {
    var element = this[this.length - 1]
    delete this[this.length - 1] 
    // añadimos esta fila ya que el irriy no tiene el mismo comportamiento que un Array y al reducir la longitud no se elimina el ultimo elemento
    this.length--

    return element

}

console.info("***CASE constructs an instance whith two elements***")

var fruits = new Irriy("Apple", "Banana")

console.assert(fruits instanceof Irriy, "fruits is instance of Irriy")
console.assert(!(fruits instanceof Array), "fruits is not an instance of Array")
console.assert(fruits.length === 2, "fruits length is 2")
console.assert(fruits[0] === "Apple", "fruit at index 0 is Apple")
console.assert(fruits[1] === "Banana", "fruit at index 1 is Banana")

console.info("**CASE constructs an instance with length 3**")

var fruits = new Irriy(3)

console.assert(fruits instanceof Irriy, "fruits is instance of Irriy")
console.assert(!(fruits instanceof Array), "fruits is not an instance of Array")
console.assert(fruits.length === 3, "fruits length is 3")
console.assert(fruits[0] === undefined, "fruit at index 0 is undefined")
console.assert(fruits[1] === undefined, "fruit at index 1 is undefined")
console.assert(fruits[2] === undefined, "fruit at index 2 is undefined")

console.info("**CASE constructs an instance with 1 element**")

var fruits = new Irriy("3")

console.assert(fruits instanceof Irriy, "fruits is instance of Irriy")
console.assert(fruits.length === 1, "fruits length is 1")
console.assert(fruits[0] === "3", "fruit at index 0 is '3'")

console.info("**CASE extracts last plant**")

var plants = new Irriy("broccoli", "cauliflower", "cabbage", "kale", "tomato");
console.log(plants.length)
var popped=plants.pop()
console.log(popped)
// Expected output: "tomato"
console.assert(popped==="tomato","last element removed ")
console.log(plants)
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
console.assert(plants.length === 4, "length is 4")
console.assert(plants[0] === "broccoli", "value at 0 is broccoli")
console.assert(plants[1] === "cauliflower", "value at 1 is cauliflower")
console.assert(plants[2] === "cabbage", "value at 2 is cabbage")
console.assert(plants[3] === "kale", "value at 3 is kale")
console.info("**CASE add various animals to irriy**")

var animals = new Irriy("pigs", "goats", "sheep", "cows")

var count = animals.push("chickens", "cats", "dogs")

console.assert(animals instanceof Irriy, "animals is instance of Irriy")
console.assert(!(animals instanceof Array), "animals is not an instance of Array")
console.assert(count === 7, "count is 7")
console.assert(animals[0] === "pigs", "animal at index 0 is pigs")
console.assert(animals[1] === "goats", "animal at index 1 is goats")
console.assert(animals[2] === "sheep", "animal at index 2 is sheep")
console.assert(animals[3] === "cows", "animal at index 3 is cows")
console.assert(animals[4] === "chickens", "animal at index 4 is chickens")
console.assert(animals[5] === "cats", "animal at index 5 is cats")
console.assert(animals[6] === "dogs", "animal at index 6 is dogs")

console.info("**CASE inverts order of 5 numbers**")

var nums = new Irriy("one", "two", "three", "four", "five")

var result = nums.reverse()

console.assert(result instanceof Irriy, "result is an array")
console.assert(result.length === 5, "result length is 5")
console.assert(result[0] === "five", "result value at index 0 is five")
console.assert(result[1] === "four", "result value at index 1 is four")
console.assert(result[2] === "three", "result value at index 2 is three")
console.assert(result[3] === "two", "result value at index 3 is two")
console.assert(result[4] === "one", "result value at index 4 is one")
console.assert(result === nums, "result is nums")


