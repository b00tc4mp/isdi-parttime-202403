Array.prototype.forEach = function forEach(callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i]
    callback(element)
  }
}
var chars = ['a', 'b', 'c']

console.log(
  chars.forEach(function (char) {
    console.log(char)
  })
)
