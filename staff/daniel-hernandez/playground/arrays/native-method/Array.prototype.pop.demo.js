var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// Expected output: "tomato"

console.log(plants);
// Expected output: [ 'broccoli', 'cauliflower', 'cabbage', 'kale' ]

plants.pop();

console.log(plants);
// Expected output: [ 'broccoli', 'cauliflower', 'cabbage' ]



// case V
var arr = [ 0, 1, 2, 3, 4 ];
console.log(arr.pop());
// expected output 4
console.log(arr);
// expected output [ 0, 1, 2, 3 ]
arr.pop();
console.log(arr)
// expected output [ 0, 1, 2 ]

/* 
tomato
[ 'broccoli', 'cauliflower', 'cabbage', 'kale' ]
[ 'broccoli', 'cauliflower', 'cabbage' ]
4
[ 0, 1, 2, 3 ]
[ 0, 1, 2 ]
*/