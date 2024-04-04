delete Array.prototype.slice;
delete Array.prototype.concat;
//delete Array.prototype.push;
// * node breaks if it doesnt have push

//call push as a function VVV
var push = function(arr) {
    for(var i = 1; i < arguments.length; i++){
        arr[arr.length] = arguments[i]
    }
    return arr;
}
    
//case V
var arr = [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]
console.log(push(arr, 11, 12, [13, 14]));
//expected output [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10, 11, 12, [ 13, 14 ] ]

//another case V
var arr1 = ['pigs', 'goats', 'sheep'];
console.log(push(arr1, 'cows'))
//expected output [ 'pigs', 'goats', 'sheep', 'cows' ]
console.log(push(arr1, 'chickens', 'cats', 'dogs'))
//expected output [ 'pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs' ]