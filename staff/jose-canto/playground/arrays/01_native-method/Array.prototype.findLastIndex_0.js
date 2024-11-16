//Ejemplo Usando Metodo array findLastIndex


var numbers = [5, 12, 50, 130, 44];

var isLargeNumber = numbers.findLastIndex(function (num) { return num > 45 });

console.log(isLargeNumber);
// Expected output: 3
// Index of element with value: 130
