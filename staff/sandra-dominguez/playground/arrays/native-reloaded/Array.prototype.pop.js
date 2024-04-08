// CASO quitar el ultimo elemento
   
Array.prototype.push = function () {
    for(var i = 0; i < arguments.length; i++) {  // empezamos de 0 porque la funcion ya no tiene el array.
        var argument = arguments[i]

        this[this.length] = argument
    }
    return this.length
}

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
var removePlant = plants.pop(function(remove) {return remove.pop()})

console.debug(removePlant)
console.debug(plants)

console.assert(plants[0] === 'broccoli', 'plants 0 is broccoli')
console.assert(plants[1] === 'cauliflower', 'plants 1 is cauliflower')
console.assert(plants[2] === 'cabbage', 'plants 2 is cabbage')
console.assert(plants[3] === 'kale', 'plants 3 is kale')
console.assert(plants.length === 4, 'plants length is 4')