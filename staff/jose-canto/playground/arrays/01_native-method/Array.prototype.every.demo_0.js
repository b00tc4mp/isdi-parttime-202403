//Ejemplo Usando Metodo array every


console.info('--- CASE all elements in the array pass de condition provided function --- ')

var numbers = [1, 30, 39, 29, 10, 13];

var result = numbers.every(function (num) { return num < 40 });
console.log(result)
// Expected output: true

//! TEST ASSERT

console.assert(result === true, 'result is true')

//? --------------------------------------------------------------------

var animals = ['dog', 'dog', 'dog', 'cat']

result = animals.every(function (animal) { return animal === 'dog' })
console.log(result)
//Expected output : false

//! TEST ASSERT 

console.assert(result === false, 'result is false')