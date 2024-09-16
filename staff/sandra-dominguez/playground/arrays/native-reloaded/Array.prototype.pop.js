// CASO quitar el ultimo elemento
   
Array.prototype.pop = function () {
    var remove = this[this.length - 1]

    this.length--

    return remove
}

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var remove = plants.pop()
console.debug(remove)
console.debug(plants)

console.assert(plants.length === 4, 'plants length is 4')
console.assert(plants[0] === 'broccoli', 'plants 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plants 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plants 2 is cabbage')
console.assert(plants[3] === 'kale', 'plants 3 is kale')

var remove = plants.pop()
console.debug(remove)
console.debug(plants)

console.assert(plants.length === 3, 'plants length is 3')
console.assert(plants[0] === 'broccoli', 'plants 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plants 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plants 2 is cabbage')