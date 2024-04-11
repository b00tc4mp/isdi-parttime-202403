//Ejemplo Usando Metodo array sort

console.info("--- CASE ordenar elementos de un array y devolver un nuevo array ordenado de acuerdo con su valor Unicode ")

var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// Expected output: Array ["Dec", "Feb", "Jan", "March"]

//! TEST ASSERT
console.assert(months[0] === 'Dec', 'index 0 is Dec')
console.assert(months[1] === 'Feb', 'index 1 is Feb')
console.assert(months[2] === 'Jan', 'index 2 is Jan')
console.assert(months[3] === 'March', 'index 3 is March')

//? --------------------------------------------------------------------------

var numbers = [1, 30, 4, 21, 100000];
numbers.sort();
console.log(numbers);
// Expected output: Array [1, 100000, 21, 30, 4]

//! TEST ASSERT
console.assert(numbers[0] === 1, 'index 0 is 1')
console.assert(numbers[1] === 100000, 'index 1 is 100000')
console.assert(numbers[2] === 21, 'index 2 is 21')
console.assert(numbers[3] === 30, 'index 3 is 30')
console.assert(numbers[4] === 4, 'index 4 is 4')

//? --------------------------------------------------------------------------


