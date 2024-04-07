var array1 = ['one', 'two', 'three'];
function reverse(array){
    reversed = [];
    for (var i = array.length; i > 0;i--){
        reversed[reversed.length] = array[i-1]
    }
    return reversed
}

console.log('array1:', array1);
// Expected output: "array1:" Array ["one", "two", "three"]

var reversed = reverse(array1);
console.log('reversed:', reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);
// Expected output: "array1:" Array ["three", "two", "one"]
