function forEach(array, callback) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i]
    callback(element)
  }
}
var chars = ['a', 'b', 'c']

console.log(
  forEach(chars, function (char) {
    console.log(char)
  })
)
