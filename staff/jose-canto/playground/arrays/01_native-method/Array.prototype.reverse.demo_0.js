//Ejemplo Usando Metodo array reverse

var numbers = ['one', 'two', 'three'];
console.log('numbers:', numbers);
// Expected output: "numbers:" Array ["one", "two", "three"]

var reversed = numbers.reverse();
console.log('reversed:', reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('numbers:', numbers);
// Expected output: "numbers:" Array ["three", "two", "one"]
