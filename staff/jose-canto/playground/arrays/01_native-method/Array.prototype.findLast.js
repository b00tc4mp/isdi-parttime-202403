//Ejemplo Usando Metodo array findLast

var numbers = [5, 12, 50, 130, 44];

var found = numbers.findLast(function (num) { return num > 45 });

console.log(found);
// Expected output: 130
