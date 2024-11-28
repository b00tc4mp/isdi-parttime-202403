delete Array.prototype.pop
//HECHO

function pop(array){
   
    var popped = array[array.length-1]

    array.length --
    return popped
       
}


console.info('CASE extracts last sports')
var sports = ["soccer", "baseball","football","swimming"]
var zero = []
var sol = pop(sports)
console.log(sol)

const myFish = ["angel", "clown", "mandarin", "sturgeon"];

const popped = myFish.pop();

console.log(myFish); // ['angel', 'clown', 'mandarin' ]

console.log(popped); // 'sturgeon'

const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// Expected output: "tomato"

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]

plants.pop();

console.log(plants);
// Expected output: Array ["broccoli", "cauliflower", "cabbage"]