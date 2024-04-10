//Ejemplo Usando Metodo array animals.slice


console.info('--- CASE remove first element 1 from array, and return that removed element ---')

var numbers = [1, 2, 3];

var firstElement = numbers.shift();

console.log(numbers);
// Expected output: Array [2, 3]

console.log(firstElement);
// Expected output: 1



//! TEST ASSERT

console.assert(firstElement === 1, "firstElement removed is 1")

console.assert(numbers.length === 2, "numbers length is 2")
console.assert(numbers[0] === 2, 'index 0 is 2')
console.assert(numbers[1] === 3, 'index 1 is 3')

//? --------------------------------------------------------------

console.info('--- CASE remove first element Ferrari from array, and return that removed element ---')

var f1Cars = ['Ferrari', 'Williams', 'Red Bull', 'Mercedes']

var removedCar = f1Cars.shift()

console.log(removedCar)

console.log(f1Cars)

//! TEST ASSERT


console.assert(removedCar === 'Ferrari', 'F1 removed is Ferrari')

console.assert(f1Cars.length === 3, "f1Cars length is 3")
console.assert(f1Cars[0] === 'Williams', 'index 0 is Williams')
console.assert(f1Cars[1] === 'Red Bull', 'index 1 is Red Bull')
console.assert(f1Cars[2] === 'Mercedes', 'index 2 is Mercedes')
