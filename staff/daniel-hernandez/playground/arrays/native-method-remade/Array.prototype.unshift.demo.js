delete Array.prototype.unshift;

Array.prototype.unshift = function() {
    var args = [];
    for(let i = 0; i < arguments.length; i++){
        args[args.length] = arguments[i];
    }
    for(j = this.length - 1; j >= 0; j--){
        this[j + args.length] = this[j];
    }
    for(var k = 0; k < args.length; k++) {
        this[k] = args[k];
    }

    return this.length;
}

//tests
var animals = ['pigs', 'goats', 'sheep'];
var count = animals.unshift('cows');
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: [ 'cows', 'pigs', 'goats', 'sheep' ]

animals.unshift('chickens', 'cats', 'dogs');
console.log(animals);
// Expected output: [ "chickens", "cats", "dogs", "cows", "pigs", "goats", "sheep" ]


//case V
var arr = [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ];
console.log(arr.unshift(11, 12, [13, 14]));
//expected output 13
console.log(arr);
//expected output [ 11, 12, [ 13, 14 ], 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]

//another case V
var arr1 = ['pigs', 'goats', 'sheep'];
console.log(arr1.unshift('cows'));
//expected output 4
console.log(arr1);
//expected output [ 'cows', 'pigs', 'goats', 'sheep' ]
console.log(arr1.unshift('chickens', 'cats', 'dogs'));
//expected output 7
console.log(arr1);
//expected output [ 'chickens', 'cats', 'dogs', 'cows', 'pigs', 'goats', 'sheep' ]

//another case V 
var arr2 = [ 1, 2, 3 ];
console.log(arr2.unshift()); //unshift nothing
//expected output 3
console.log(arr2);
//expected output [ 1, 2, 3 ]

//another case V
var arr3 = [ [ 1, 2, 3 ], [ 4 , 5, 6 ] ];
console.log(arr3.unshift({ 1: 2, 3: 4, 5: 6, a: [ 7, 8, 9 ] } )); //unshift a object
//expected output 3
console.log(arr3);
//expected output [ { '1': 2, '3': 4, '5': 6, a: [ 7, 8, 9 ] }, [ 1, 2, 3 ], [ 4, 5, 6 ] ]

/* total console log
4
[ 'cows', 'pigs', 'goats', 'sheep' ]
[
  'chickens', 'cats',
  'dogs',     'cows',
  'pigs',     'goats',
  'sheep'
]
13
[ 11, 12, [ 13, 14 ], 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]
4
[ 'cows', 'pigs', 'goats', 'sheep' ]
7
[
  'chickens', 'cats',
  'dogs',     'cows',
  'pigs',     'goats',
  'sheep'
]
3
[ 1, 2, 3 ]
3
[
  { '1': 2, '3': 4, '5': 6, a: [ 7, 8, 9 ] },
  [ 1, 2, 3 ],
  [ 4, 5, 6 ]
]
*/