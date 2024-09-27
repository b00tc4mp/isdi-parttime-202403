Array.prototype.pop = function pop() {
  var popped = this[this.length - 1]
  this.length--
  return popped
}

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon']
var arrayPoped = myFish.pop()
console.info('CASE return the last element')

console.assert(arrayPoped === 'sturgeon', 'lastElement is tomato')
console.assert(myFish.length === 3, 'myFish.length is 3')
console.assert(myFish[0] === 'angel', 'myFish[0] is angel')
console.assert(myFish[1] === 'clown', 'myFish[1] is clown')
console.assert(myFish[2] === 'mandarin', 'myFish[2] is mandarin')
