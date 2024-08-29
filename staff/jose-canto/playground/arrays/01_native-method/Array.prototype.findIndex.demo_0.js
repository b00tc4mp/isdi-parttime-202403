//Ejemplo Usando Metodo array findIndex


console.info("--- CASE find the index with numbers greater than 12 ---")

var numbers = [5, 12, 8, 130, 44];

function isLargeNumber(element) { return element > 13 };

console.log(numbers.findIndex(isLargeNumber));
// Expected output: 3
