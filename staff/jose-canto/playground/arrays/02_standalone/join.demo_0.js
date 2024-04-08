delete Array.prototype.join

// Recrear metodo join

function join(array, separator) {

  var result = array[0]

  separator = separator || ","

  for (var i = 1; i < array.length; i++) {
    var element = array[i]
    result += separator + element
  }

  return result
}

console.info("--- CASE joins all the elements of an array ---")

var elements = ['Fire', 'Air', 'Water'];
console.log(elements)
// output: [ 'Fire', 'Air', 'Water' ]

var strWithSeparator = join(elements, "-")
console.log(strWithSeparator)

//! TEST ASSERT
console.assert(strWithSeparator.length === 14)