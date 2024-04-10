delete Array.prototype.unshift // Eliminamos el metodo unshift para evitar usarlo


// Recrear el metodo unshift

function unshift(array /*,element1, element2*/) {

  // array ->  [1, 2, 3]
  // element1 = 4
  // if (element2 === undefined) {

  //   array[3] = array[2] // array -> [1, 2, 3, 3]
  //   array[2] = array[1] // array -> [1, 2, 2, 3]
  //   array[1] = array[0] // array -> [1, 1, 2 ,3]
  //   array[0] = element1

  // } else if (element1) {
  // array [1, 2, 3]
  // element1 = 4
  //element2 = 5

  //   array[4] = array[2] // array -> [1, 2, 3, <empty>, 3]
  //   array[3] = array[1] // array -> [1, 2, <empty>, 2, 3]
  //   array[2] = array[0] // array -> [1, <empty>, 2, 2, 3]
  //   array[0] = element1 // array -> [4, <empty>, 1, 2, 3]
  //   array[1] = element2 // array -> [4, 5, 1, 2, 3]
  // }

  var result = []
  for (var i = 1; i < arguments.length; i++) {
    var argument = arguments[i];

    result[result.length] = argument
  }

  for (var j = array.length - 1; j >= 0; j--) {
    var element = array[j]

    array[j + result.length] = element
  }

  for (var k = 0; k < result.length; k++) {
    var element2 = result[k]

    array[k] = element2
  }

  return array.length
}

var numbers = [1, 2, 3]
console.log(numbers)
console.info(' --- CASE add number 4 to the beginning to array --- ');

var numbersAdd = unshift(numbers, 4);
console.log(numbersAdd) // Debería imprimir: 4
console.log(numbers) // Debería imprimir: [4, 1, 2, 3]

//! TEST ASSERT
console.assert(numbers[0] === 4, 'index 0 number is 4')
console.assert(numbers[1] === 1, 'index 0 number is 1')
console.assert(numbers[2] === 2, 'index 0 number is 2')
console.assert(numbers[3] === 3, 'index 0 number is 3')
console.assert(numbers.length === 4, 'numbers length is 4')

//? ----------------------------------------------------

var numbers = [1, 2, 3]
console.log(numbers)
console.info(' --- CASE add number 4 and 5 to the beginning to array --- ');

var numbersAdd = unshift(numbers, 4, 5);
console.log(numbersAdd) // Debería imprimir:  5
console.log(numbers) // Debería imprimir: [4, 5, 1, 2, 3]

//! TEST ASSERT
console.assert(numbers[0] === 4, 'index 0 number is 4')
console.assert(numbers[1] === 5, 'index 1 number is 5')
console.assert(numbers[2] === 1, 'index 2 number is 1')
console.assert(numbers[3] === 2, 'index 3 number is 2')
console.assert(numbers[4] === 3, 'index 4 number is 3')
console.assert(numbers.length === 5, 'numbers length is 5')

//? ----------------------------------------------------

var f1Cars = ['Ferrari', 'Williams', 'Red Bull', 'Mercedes']
console.log(f1Cars)
console.info('--- CASE add F1 cars Aston Martin, McLaren, Haas to the begining to array --- ')

var f1CarsAdd = unshift(f1Cars, 'Aston Martin', 'McLaren', 'Haas')
console.log(f1CarsAdd) // 7
console.log(f1Cars) // ['Aston Martin', 'McLaren', 'Haas', 'Ferrari', 'Williams', 'Red Bull', 'Mercedes']

//! TEST ASSERT
console.assert(f1Cars[0] === 'Aston Martin', 'index 0 F1 is Aston Martin')
console.assert(f1Cars[1] === 'McLaren', 'index 1 F1 is 5 McLaren')
console.assert(f1Cars[2] === 'Haas', 'index 2 F1 is Haas')
console.assert(f1Cars[3] === 'Ferrari', 'index 3 F1 is Ferrari')
console.assert(f1Cars[4] === 'Williams', 'index 4 F1 is Williams')
console.assert(f1Cars[5] === 'Red Bull', 'index 5 F1 is Red Bull')
console.assert(f1Cars[6] === 'Mercedes', 'index 6 F1 is Mercedes')
console.assert(f1Cars.length === 7, 'f1Cars length is 7')

console.assert(f1CarsAdd === 7, 'f1CarsAdd is 3')