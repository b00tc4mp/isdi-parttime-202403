delete Array.prototype.reverse

console.info(" --- CASE reverse array ---")

Array.prototype.reverse = function () {

  var left
  var rigth
  j = this.length - 1

  for (var i = 0; i < j; i++, j--) {
    left = this[i]
    rigth = this[this.length - 1 - i]

    this[i] = rigth
    this[this.length - 1 - i] = left
  }
  return this
}


var numbers = ['one', 'two', 'three'];
console.log('numbers:', numbers);
// Expected output: "numbers:" ["one", "two", "three"]

var resultReverse = numbers.reverse();
console.debug(resultReverse);
// Expected output: [ 'three', 'two', 'one' ]

//! TEST ASSERT
console.assert(resultReverse instanceof Array, 'resultReverse is an array');
console.assert(resultReverse.length == 3, 'resultReverse length is 3');
console.assert(resultReverse[0] === 'three', 'resultReverse at index 0 is three')
console.assert(resultReverse[1] === 'two', 'resultReverse at index 1 is two')
console.assert(resultReverse[2] === 'one', 'resultReverse at index 2 is one')

//? -----------------------------------------------------------------------

var numbers = ['one', 'two', 'three', 'four'];
console.log('numbers:', numbers);
// Expected output: "numbers:" ["one", "two", "three"]

var resultReverse = numbers.reverse();
console.debug(resultReverse);
// Expected output: [ 'three', 'two', 'one' ]

//! TEST ASSERT
console.assert(resultReverse instanceof Array, 'resultReverse is an array');
console.assert(resultReverse.length == 4, 'resultReverse length is 3');
console.assert(resultReverse[0] === 'four', 'resultReverse at index 0 is four')
console.assert(resultReverse[1] === 'three', 'resultReverse at index 1 is three')
console.assert(resultReverse[2] === 'two', 'resultReverse at index 2 is two')
console.assert(resultReverse[3] === 'one', 'resultReverse at index 3 is one')

//? -----------------------------------------------------------------------

var modelVehicle = ["Ferrari", "Porche", "Mazda", "Maserati", "Bugatti", "Lamborghini"]
console.log(modelVehicle)
// Expected output: [ 'Ferrari', 'Porche', 'Mazda', 'Maserati', 'Bugatti', 'Lamborghini' ]

var resultReverse = modelVehicle.reverse()
console.debug(resultReverse)
// Expected output: [ 'Lamborghini', 'Bugatti', 'Maserati', 'Mazda', 'Porche', 'Ferrari' ]

//! TEST ASSERT
console.assert(resultReverse instanceof Array, 'resultReverse is an array');
console.assert(resultReverse.length === 6, 'resultReverse length is 6')
console.assert(resultReverse[0] === "Lamborghini", "first model is Lamborghini")
console.assert(resultReverse[1] === "Bugatti", "second model is Bugatti")
console.assert(resultReverse[2] === "Maserati", "third model is Maserati")
console.assert(resultReverse[3] === "Mazda", "four model is Mazda")
console.assert(resultReverse[4] === "Porche", "five model is Porche")
console.assert(resultReverse[5] === "Ferrari", "six model is Ferrari")

