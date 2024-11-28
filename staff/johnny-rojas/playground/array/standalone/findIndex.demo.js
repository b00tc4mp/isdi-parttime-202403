//delete Array.prototype.findIndex

function findIndex(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return i
    }
  }
  return undefined
}

//-----------------------------------------------------


console.info('CASE inside array')
var numbers = [1, 298, 333, 89]
var findIndexNumber = findIndex(numbers, function (element) {
  return element > 300
})

console.debug(findIndexNumber)
//output: 2

//-----------------------------------------------------

console.info('CASE not find inside array');
var count = [563, 789, 199, 856]
var findCount = findIndex(count, function (element) {
  return element > 1000
})

console.debug(findCount)
//output: undefined