//delete Array.prototype.shift;

//call shift as a function VVV
var shift = function(arr) {
    var firstElem = arr[0];
    var newArr = [];

    for(var j = 1; j < arr.length; j++){
        newArr[newArr.length] = arr[j];
    }
    
    for(var k = 0; k < newArr.length; k++){
        arr[k] = newArr[k];
    }
    arr.length = newArr.length;

    return firstElem
}


//tests
var array1 = [1, 2, 3];
var firstElement = shift(array1);
console.log(array1);
// Expected output: [ 2, 3 ]
console.log(firstElement);
// Expected output: 1

var plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(shift(plants));
// Expected output: "broccoli"
console.log(plants);
// Expected output: [ 'cauliflower', 'cabbage', 'kale', 'tomato' ]
shift(plants);
console.log(plants);
// Expected output: [ 'cabbage', 'kale', 'tomato' ]

// case V
var arr = [ 0, 1, 2, 3, 4 ];
console.log(shift(arr));
// expected output 0
console.log(arr);
// expected output [ 1, 2, 3, 4 ]
shift(arr);
console.log(arr)
// expected output [ 2, 3, 4 ]

/* total expected output
[ 2, 3 ]
1
broccoli
[ 'cauliflower', 'cabbage', 'kale', 'tomato' ]
[ 'cabbage', 'kale', 'tomato' ]
0
[ 1, 2, 3, 4 ]
[ 2, 3, 4 ]
*/