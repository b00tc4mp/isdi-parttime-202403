console.info('CASE insert Feb in array of months')


var months = ['Jan', 'March', 'April', 'June'];

var removed = months.splice(1, 0, 'Feb')
// Inserts at index 1
console.log(removed);
//[]

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')

console.log(months)
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'Jan', 'months at 0 is Jan')
console.assert(months[1] === 'Feb', 'months at 1 is Feb')
console.assert(months[2] === 'March', 'months at 2 is March')
console.assert(months[3] === 'April', 'months at 3 is April')
console.assert(months[4] === 'June', 'months at 4 is Jan')


console.info('CASE replaces one month by another')

var months = ['Jan', 'March', 'April', 'June']

var removed = months.splice(4, 1, 'May');
// Replaces 1 element at index 4
console.denug(removed)
//['June']
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 1, 'removed legnt is 1')
console.assert(removed[0 === 'June', 'removed element is June'])

console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]


console.info('CASE insert fish drum in fishes')

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
var removed = myFish.splice(2, 0, "drum")
console.debug(removed)
// removed is [], no elements removed
    
console.debug(fishes)
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]
console.assert(months.length === 5, 'length is 5')
console.assert(months[0] === 'angel', 'months at 0 is angel')
console.assert(months[1] === 'clown', 'months at 1 is clown')
console.assert(months[2] === 'drum', 'months at 2 is drum')
console.assert(months[3] === 'mandarin', 'months at 3 is mandarin')
console.assert(months[4] === 'sturgeon', 'months at 4 is sturgeon')


console.info('CASE insert drum and guitar before mandarin')

var fishes = ['angel', 'clown', 'mandarin', 'sturgeon];
var removed = fishes.splice(2, 0, 'drum', 'guitar');

// myFish is ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// removed is [], no elements removed

var myFish = ["angel", "clown", "trumpet", "sturgeon"];
var removed = myFish.splice(0, 2, "parrot", "anemone", "blue");

// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]

console.log(removed)
// removed is ["angel", "clown"]
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 2, 'removed length is 2')
console.assert(removed[0] === 'angel', 'removed at 0 is angel')
console.assert(removed[1] === 'clown', 'removed at 0 is clown')

// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
console.assert(fishes.length === 5, 'length is 5')
console.assert(fishes[0] === )