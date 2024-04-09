delete Array.prototype.shift;

Array.prototype.shift = function () {
    var firstElem = this[0];
    var newArr = [];

    for (var i = 1; i < this.length; i++) {
        newArr[newArr.length] = this[i];
    }

    for (var k = 0; k < newArr.length; k++) {
        this[k] = newArr[k];
    }
    this.length = newArr.length;

    return firstElem;
};



//tests
var array1 = [ 1, 2, 3 ];
var firstElement = array1.shift();
console.log(array1);
// Expected output: [ 2, 3 ]
console.log(firstElement);
// Expected output: 1

var plants = [ 'broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato' ];
console.log(plants.shift());
// Expected output: "broccoli"
console.log(plants);
// Expected output: [ 'cauliflower', 'cabbage', 'kale', 'tomato' ]
plants.shift();
console.log(plants);
// Expected output: [ 'cabbage', 'kale', 'tomato' ]

// case V
var arr = [ 0, 1, 2, 3, 4 ];
console.log(arr.shift());
// expected output 0
console.log(arr);
// expected output [ 1, 2, 3, 4 ]
arr.shift();
console.log(arr);
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