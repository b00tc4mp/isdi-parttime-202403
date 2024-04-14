function splice(array, start, deleteCount, item1, item2, item3) {
  if (deleteCount === 0) {
    var displacement = arguments.length - 3
    for (var i = array.length - 1; i >= start; i--) {
      array[i + displacement] = array[i]
    }
    for (var i = start, j = 3; i < start + displacement; i++, j++) {
      array[i] = arguments[j]
    }
    return []
  } else {
    var removed = []
    for (var i = start; i < start + deleteCount; i++) {
      removed[i - start] = array[i]
    }
    var displacement = arguments.length - 3 - deleteCount
    for (var j = array.length - 1; j >= start + deleteCount; j--) {
      array[j + displacement] = array[j]
    }
    for (var i = start; i < start + arguments.length - 3; i++) {
      array[i] = arguments[3 + i - start]
    }
    return removed
  }
}

// Tests
console.info('CASE 1 insert Feb')
var months = ['Jan', 'March', 'April', 'June']
var removed = splice(months, 1, 0, 'Feb')
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is empty')
console.assert(months.length === 5, 'months has 5 elements')
console.assert(months[0] === 'Jan', 'Jan is at index 1')
console.assert(months[1] === 'Feb', 'Feb is at index 1')
console.assert(months[2] === 'March', 'March is at index 2')
console.assert(months[3] === 'April', 'April is at index 3')
console.assert(months[4] === 'June', 'June is at index 4')

console.info('CASE replace one month by another')
var months = ['Jan', 'Feb', 'March', 'April', 'June']
var removed = splice(months, 4, 1, 'May')
console.log(months)
console.log(removed)

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 1, 'removed is one')
console.assert(months.length === 5, 'months has 5 elements')
console.assert(months[0] === 'Jan', 'Jan is at index 1')
console.assert(months[1] === 'Feb', 'Feb is at index 1')
console.assert(months[2] === 'March', 'March is at index 2')
console.assert(months[3] === 'April', 'April is at index 3')
console.assert(months[4] === 'May', 'May is at index 4')

console.info(
  'CASE Remove 0 (zero) elements before index 2, and insert "drum" and "guitar"'
)
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
var removed = splice(myFish, 2, 0, 'drum', 'guitar')
console.log(myFish)
console.log(removed)
// myFish is ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// removed is [], no elements removed
console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 0, 'removed is zero')
console.assert(myFish.length === 6, 'myFish has 6 elements')
console.assert(myFish[0] === 'angel', 'angel is at index 1')
console.assert(myFish[1] === 'clown', 'clown is at index 1')
console.assert(myFish[2] === 'drum', 'drum is at index 2')
console.assert(myFish[3] === 'guitar', 'guitar is at index 3')
console.assert(myFish[4] === 'mandarin', 'mandarin is at index 4')
console.assert(myFish[5] === 'sturgeon', 'sturgeon is at index 4')

console.info(
  'CASE Remove 2 elements from index 0, and insert "parrot", "anemone" and "blue"'
)
var myFish = ['angel', 'clown', 'trumpet', 'sturgeon']
var removed = splice(myFish, 0, 2, 'parrot', 'anemone', 'blue')
console.debug(removed)
console.debug(myFish)
// myFish is ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// removed is ["angel", "clown"]

console.assert(removed instanceof Array, 'removed is an array')
console.assert(removed.length === 2, 'removed is 2')
console.assert(myFish.length === 5, 'myFish has 5 elements')
console.assert(myFish[0] === 'parrot', 'parrot is at index 0')
console.assert(myFish[1] === 'anemone', 'anemone is at index 1')
console.assert(myFish[2] === 'blue', 'blue is at index 2')
console.assert(myFish[3] === 'trumpet', 'trumpet is at index 3')
console.assert(myFish[4] === 'sturgeon', 'sturgeon is at index 4')
