//Ejemplo Usando Metodo array at

console.info('--- CASE return element with a parameter index of array ---');

var numbers = [5, 12, 8, 130, 44];

var index = 2;

console.log(`An index of ${index} returns ${numbers.at(index)}`);
// Expected output: "An index of 2 returns 8"

index = -2;

console.log(`An index of ${index} returns ${numbers.at(index)}`);
// Expected output: "An index of -2 returns 130"


//! TEST ASSERT

console.assert(numbers[2] === 8, "number at index 2 is 8")
console.assert(numbers[numbers.length - 2] === 130, "number at index -2 is 130")