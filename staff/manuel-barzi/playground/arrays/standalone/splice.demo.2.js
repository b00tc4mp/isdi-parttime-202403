function splice(array, start, deleteCount, item1, item2) {
    if (deleteCount === 0) {
        // array -> ['Jan', 'March', 'April', 'June']
        // start -> 1
        // deleteCount -> 0
        // item1 -> 'Feb'

        // array[4] = array[3] // array -> ['Jan', 'March', 'April', 'June', 'June']
        // array[3] = array[2] // array -> ['Jan', 'March', 'April', 'April', 'June']
        // array[2] = array[1] // array -> ['Jan', 'March', 'March', 'April', 'June']

        for (var i = array.length; i > start; i--) {
            array[i] = array[i - 1]
        }

        array[start] = item1 // array -> ['Jan', 'Feb', 'March', 'April', 'June']

        return []
    } else if (deleteCount === 1) {
        // array -> ['Jan', 'Feb', 'March', 'April', 'June']
        // start -> 4
        // deleteCount -> 1
        // item1 -> 'May'

        var extracted = array[start] // 'June'

        array[start] = item1 // array -> ['Jan', 'Feb', 'March', 'April', 'May']

        return [extracted]
    }
}

console.info('CASE insert Feb in array of months')

var months = ['Jan', 'March', 'April', 'June']

var removed = splice(months, 1, 0, 'Feb')
// Inserts at index 1
console.log(removed)
// []
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'March', 'month at 2 is March')
console.assert(months[3] === 'April', 'month at 3 is April')
console.assert(months[4] === 'June', 'month at 3 is June')


console.info('CASE replaces one month by another')

var months = ['Jan', 'Feb', 'March', 'April', 'June']

var removed = splice(months, 4, 1, 'May')
// Replaces 1 element at index 4
console.debug(removed)
// ['June']
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 1, 'removed length is 1')
console.assert(removed[0] === 'June', 'removed element is June')

console.debug(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'month at 0 is Jan')
console.assert(months[1] === 'Feb', 'month at 1 is Feb')
console.assert(months[2] === 'March', 'month at 2 is March')
console.assert(months[3] === 'April', 'month at 3 is April')
console.assert(months[4] === 'May', 'month at 3 is May')


console.info('CASE insert fish drum in fishes')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon']
var removed = splice(fishes, 2, 0, 'drum')

console.debug(removed)
// removed is [], no elements removed
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.debug(fishes)
// fishes is ["angel", "clown", "drum", "mandarin", "sturgeon"]
console.assert(fishes.length === 5, 'length is 5')
console.assert(fishes[0] === 'angel', 'fish at 0 is angel')
console.assert(fishes[1] === 'clown', 'fish at 1 is clown')
console.assert(fishes[2] === 'drum', 'fish at 2 is drum')
console.assert(fishes[3] === 'mandarin', 'fish at 3 is mandarin')
console.assert(fishes[4] === 'sturgeon', 'fish at 3 is sturgeon')