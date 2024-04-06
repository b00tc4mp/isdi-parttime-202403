console.info('CASE remove the last fruit in the array')

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.debug(plants.pop());
// "tomato"

console.debug(plants);
// ["broccoli", "cauliflower", "cabbage", "kale"]

plants.pop();

console.debug(plants);
// ["broccoli", "cauliflower", "cabbage"]

console.info('CASE remove the last fish in the array and collect it in an array')

var myFish = ["angel", "clown", "mandarin", "sturgeon"];

var popped = myFish.pop();

console.debug(myFish); 
// ['angel', 'clown', 'mandarin' ]

console.debug(popped); 
// 'sturgeon'