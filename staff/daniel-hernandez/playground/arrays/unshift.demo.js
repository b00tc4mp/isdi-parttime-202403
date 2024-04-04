delete Array.prototype.unshift;

//call unshift as a function VVV
var unshift = function(arr) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
       args[args.length] = arguments[i];
    }
    
    for (var j = arr.length - 1; j >= 0; j--){
        arr[j + args.length] = arr[j];
    }
    for (var k = 0; k < args.length; k++) {
        arr[k] = args[k];
    }

    return arr.length;
}

//case V
var arr = [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]
console.log(unshift(arr, 11, 12, [13, 14]));
//expected output 13
console.log(arr);
//expected output [ 11, 12, [ 13, 14 ], 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]