//var array1 = [1, 2, 3];
//var firstElement = array1.shift();
//console.log(array1);
// expected output:  [ 2, 3 ]
//console.log(firstElement);
// expected output: 1

//case V
var arr = [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ];
console.log(arr.unshift(11, 12, [13, 14]));
//expected output 13
console.log(arr)
//expected output [ 11, 12, [ 13, 14 ], 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]
