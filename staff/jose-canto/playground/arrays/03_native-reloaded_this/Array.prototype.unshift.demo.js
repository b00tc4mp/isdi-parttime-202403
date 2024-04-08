delete Array.prototype.unshift

// Recrear el metodo unshift

Array.prototype.unshift = function () {

  var result = [];

  for (var i = 0; i < arguments.length; i++) {

    var argument = arguments[i];
    result[result.length] = argument
  }

  for (var j = 0; j < this.length; j++) {
    var element = this[j];
    result[result.length] = element
  }

  return result;
}

console.info(" --- CASE add numbers to the beginning to array --- ")

var numbers = [1, 2, 3];
console.log(numbers)

var numbersAdd = numbers.unshift(4, 5);
console.debug(numbersAdd);


//! TEST ASSERT

console.assert(numbersAdd[0] === 4, "first number is 4")
console.assert(numbersAdd[1] === 5, "first number is 4")
console.assert(numbersAdd.length === 5, "numbersAdd length is 5")

//? -------------------------------------------------------