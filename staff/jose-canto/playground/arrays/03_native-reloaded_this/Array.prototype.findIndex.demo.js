delete Array.prototype.findIndex // Elminamos el metodo findIndex para evitar usar el metodo.

// Recrear metodo findIndex

Array.prototype.findIndex = function (callback) {

  for (var i = 0; i < this.length; i++) {

    var element = this[i];

    var matches = callback(element);

    if (matches) {
      return i
    }
  }
}

console.info("--- CASE find the index with numbers greater than 12 ---")

var numbers = [5, 12, 8, 130, 44];

var indexNumber = numbers.findIndex(function (num) {
  return num > 12
})

console.log(`Index number is: ${indexNumber}`)

//! TEST ASSERT

console.assert(indexNumber === 3, "index of indexNumber is 3")