delete Array.prototype.reverse

console.info(" --- CASE reverse array ---")

Array.prototype.reverse = function () {

  var reversed = [];
  var startAtRigth = this.length - 1

  for (var i = startAtRigth; i >= 0; i--) {

    reversed[startAtRigth - i] = this[i]
  }
  return reversed
}

var numbers = ['one', 'two', 'three'];
console.log('numbers:', numbers);
// Expected output: "numbers:" ["one", "two", "three"]

var resultReverse = numbers.reverse();
console.debug(resultReverse);
// Expected output: [ 'three', 'two', 'one' ]

//! TEST ASSERT

//? -----------------------------------------------------------------------

var modelVehicle = ["Ferrari", "Porche", "Mazda", "Maserati", "Bugatti", "Lamborghini"]
console.log(modelVehicle)
// Expected output: [ 'Ferrari', 'Porche', 'Mazda', 'Maserati', 'Bugatti', 'Lamborghini' ]

var resultReverse = modelVehicle.reverse()
console.debug(resultReverse)
// Expected output: [ 'Lamborghini', 'Bugatti', 'Maserati', 'Mazda', 'Porche', 'Ferrari' ]

//! TEST ASSERT

console.assert(resultReverse[0] === "Lamborghini", "first model is Lamborghini")