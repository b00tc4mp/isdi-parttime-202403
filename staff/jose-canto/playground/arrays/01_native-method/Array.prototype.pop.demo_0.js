//Ejemplo usando Metodo array Map 

console.info(" --- CASE delete last element ---");

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

var elementDeleted = plants.pop();
console.log(elementDeleted);
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

var elementDeleted = plants.pop();
console.log(elementDeleted)

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]