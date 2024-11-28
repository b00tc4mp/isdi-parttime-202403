console.info('CASO insertar Feb en el array de months')

var months = ['Jan', 'March', 'April', 'June']
var removed = months.splice(1, 0, 'Feb')

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'months at 0 is Jan')
console.assert(months[1] === 'Feb', 'months at 1 is Feb')
console.assert(months[2] === 'March', 'months at 2 is March')
console.assert(months[3] === 'April', 'months at 3 is April')
console.assert(months[4] === 'June', 'months at 4 is June')

console.info('CASO reemplazar un mes por otro')

var months = ['Jan', 'Feb', 'March', 'April', 'June']
var removed = months.splice(4, 1, 'May')

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 1, 'removed length is 1')
console.assert(removed[0] === 'June', 'removed element is June')

console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'March', 'month at 2 is March')
console.assert(months[3] === 'April', 'month at 3 is April')
console.assert(months[4] === 'May', 'month at 4 is May')