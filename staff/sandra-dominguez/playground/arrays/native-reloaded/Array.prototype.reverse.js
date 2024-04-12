Array.prototype.reverse = function() {
    var izq

    for(var i = 0, j = this.length - 1; i < j; i++, j--) {
        izq = this[i]

        this[i] = this[j]
        this[j] = izq
    }
    return this   
}

console.info('CASO invertir 3 posiciones')

var nums = ['one', 'two', 'three']
var result = nums.reverse()

console.assert(result.length === 3, 'la longitud es 3')
console.assert(result[0] === 'three', 'el resultado del indice 0 es three')
console.assert(result[1] === 'two', 'el resultado del indice 1 es two')
console.assert(result[2] === 'one', 'el resultado del indice 2 es one')
console.assert(result === nums, 'el resultado es nums')


console.info('CASO invertir 4 posiciones')

var nums = ['one', 'two', 'three', 'four']
var result = nums.reverse()

console.assert(result.length === 4, 'la longitud es 4')
console.assert(result[0] === 'four', 'el resultado del indice 0 es four')
console.assert(result[1] === 'three', 'el resultado del indice 1 es three')
console.assert(result[2] === 'two', 'el resultado del indice 2 es two')
console.assert(result[3] === 'one', 'el resultado del indice 3 es one')
console.assert(result === nums, 'el resultado es nums')