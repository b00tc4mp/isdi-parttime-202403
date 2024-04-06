delete Array.prototype.concat;
delete Array.prototype.slice;
//delete Array.prototype.pop;
//delete Array.prototype.push;
// * node breaks if it doesnt have pop
// * node breaks if it doesnt have push


//call pop as a function VVV
var pop = function(arr) {
    var popped = arr[arr.length - 1];
    arr.length = arr.length - 1;

    return popped;
}

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(pop(plants));
// Expected output: tomato
console.log(plants);
// Expected output: [ 'broccoli', 'cauliflower', 'cabbage', 'kale' ]
pop(plants);
console.log(plants);
// Expected output: [ 'broccoli', 'cauliflower', 'cabbage' ]

// case V
var arr = [ 0, 1, 2, 3, 4 ];
console.log(pop(arr));
// expected output 4
console.log(arr);
// expected output [ 0, 1, 2, 3 ]
pop(arr);
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