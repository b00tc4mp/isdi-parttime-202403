Array.prototype.map = function map(callback) {
  var result = []
  for (var i = 0; i < this.length; i++) {
    var name = this[i]
    result[i] = callback(name)
  }
  return result
}

var names = ['pEdRo', 'jOrGe']
var mapped = names.map(function (name) {
  return name.toUpperCase()
})
console.log(mapped)
