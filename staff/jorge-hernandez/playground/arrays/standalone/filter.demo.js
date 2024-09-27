function filter(array, callback) {
  var result = []
  for (var i = 0; i < array.length; i++) {
    var element = array[i]
    if (callback(element)) {
      result[result.length] = element
    }
  }
  return result
}
var names = ['Alice', 'Bob', 'Eve', 'Cecil']
var filtered = filter(names, function (element) {
  return element.length > 3
})
console.log(filtered)

var char = ['a', 'b', 'c', 'd']
var charA = char.filter(function (element) {
  return element === 'a'
})

console.log(charA)
