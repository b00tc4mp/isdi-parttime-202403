delete Array.prototype.join

// Recrear metodo forEach

Array.prototype.join = function (separator) {

  var result = this[0]

  separator = separator || ","

  for (var i = 1; i < this.length; i++) {
    var element = this[i]
    result += separator + element
  }

  return result
}

console.info("--- CASE joins all the elements of an array ---")

var elements = ['Fire', 'Air', 'Water'];
console.log(elements)
// output: [ 'Fire', 'Air', 'Water' ]

var strWithSeparator = elements.join("-")
console.log(strWithSeparator)

//! TEST ASSERT
console.assert(strWithSeparator.length === 14)