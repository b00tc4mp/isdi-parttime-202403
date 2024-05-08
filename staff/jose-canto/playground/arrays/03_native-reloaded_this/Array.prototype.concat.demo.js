//Recrear el metodo array concat


Array.prototype.concat = function () {

  var result = []

  for (var i = 0; i < this.length; i++) {
    result[result.length] = this[i]
  }

  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {

      result[result.length] = arguments[i][j]
    }
  }

  return result
}

var numbers = [1, 2, 3];
var chars = ['d', 'e', 'f'];
var result = numbers.concat(chars);

console.log(result);
// Expected output: Array ["a", "b", "c", "d", "e", "f"]

//! TEST ASSERT
console.assert(result[0] === 1, "index 0 of result is 1")
console.assert(result[1] === 2, "index 1 of result is 2")
console.assert(result[2] === 3, "index 2 of result is 3")
console.assert(result[3] === "d", "index 3 of result is d")
console.assert(result[4] === "e", "index 4 of result is e")
console.assert(result[5] === "f", "index 5 of result is f")