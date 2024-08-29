function pop (array){
    var pop = array[array.length -1]
    array.length = array.length -1
    return pop
}

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(pop(plants));
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

pop(plants);

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]