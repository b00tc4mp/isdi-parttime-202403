//delete Array.prototype.pop

function pop(array) {
  if (array.length === 0) {
    return undefined
  } else {
    var lastElement = array[array.length - 1]

    array.length = array.length - 1

    return lastElement
  }
}

//--------------------------------------------------

console.info('CASE pop number 4')

var array = [1, 2, 3, 4]
var lastElement = pop(array)

console.debug(array)
// [1, 2, ,3]
console.assert(array[0] === 1, 'Value 0 is 1')
console.assert(array[1] === 2, 'Value 1 is 2')
console.assert(array[2] === 3, 'Value 2 is 3')

console.debug('Element delete:', lastElement)
//output: Element delete: 4
console.assert(lastElement === 4, 'lastElement is 4')

//--------------------------------------------------

console.info('CASE pop flower Cayenna')

var flowers = ['Rose', 'Orquidea', 'Cayenna']
var lastFlower = pop(flowers)

console.debug(flowers)
//output: [ 'Rose', 'Orquidea' ]
console.assert(flowers[0] === 'Rose', 'Value 0 is Rose')
console.assert(flowers[1] === 'Orquidea', 'Value 1 is Orquidea')

console.debug('La ultima flor es:', lastFlower)
//output: La ultima flor es: Cayenna
console.assert(lastElement === 4, 'lastElement is Cayenna')
