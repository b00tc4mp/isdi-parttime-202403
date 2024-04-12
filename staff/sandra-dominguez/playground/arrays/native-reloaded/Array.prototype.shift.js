console.info('CASO eliminar el primer elemento')

Array.prototype.shift = function() {
  var removedElement = this[0]
     for(var i = 0; i < this.length - 1; i++) {
      this[i] = this[i + 1]

     }
     this.length = this.length - 1
    return removedElement
}


var number = [1, 2, 3]
var firstNum = number.shift()

console.assert(firstNum === 1, "firstNum removed is 1")

console.assert(number.length === 2, "number length is 2")
console.assert(number[0] === 2, 'number 0 is 2')
console.assert(number[1] === 3, 'number 1 is 3')