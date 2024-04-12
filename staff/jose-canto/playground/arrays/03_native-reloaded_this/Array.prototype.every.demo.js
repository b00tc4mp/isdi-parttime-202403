delete Array.prototype.every // Eliminamos el metodo every para evitar usar el metodo

//Recrear Metodo array every


Array.prototype.every = function (callback) {

  for (var i = 0; i < this.length; i++) {

    var element = this[i]

    var matches = callback(element)

    if (!matches) {
      return false

    }
  }
  return true
}

console.info('--- CASE all elements in the array pass de condition provided function --- ')

var numbers = [1, 30, 39, 29, 10, 13];

var result = numbers.every(function (num) { return num < 40 });
console.log(result)
// Expected output: true

//! TEST ASSERT

console.assert(result === true, 'result is true')

//? --------------------------------------------------------------------

var animals = ['dog', 'dog', 'cat', 'dog']

result = animals.every(function (animal) { return animal === 'dog' })
console.log(result)
//Expected output : false

//! TEST ASSERT 

console.assert(result === false, 'result is false')