delete Array.prototype.unshift;

//call unshift as a function VVV
var unshift = function (arr) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args[args.length] = arguments[i];
  }
  for (var j = arr.length - 1; j >= 0; j--) {
    arr[j + args.length] = arr[j];
  }
  for (var k = 0; k < args.length; k++) {
    arr[k] = args[k];
  }

  return arr.length;
}

//tests
var animals = ['pigs', 'goats', 'sheep'];
var count = unshift(animals, 'cows');
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: [ 'cows', 'pigs', 'goats', 'sheep' ]

unshift(animals, 'chickens', 'cats', 'dogs');
console.log(animals);
// Expected output: [ "chickens", "cats", "dogs", "cows", "pigs", "goats", "sheep" ]


//case V
var arr = [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ];
console.log(unshift(arr, 11, 12, [13, 14]));
//expected output 13
console.log(arr);
//expected output [ 11, 12, [ 13, 14 ], 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]

//another case V
var arr1 = ['pigs', 'goats', 'sheep'];
console.log(unshift(arr1, 'cows'));
//expected output 4
console.log(arr1);
//expected output [ 'cows', 'pigs', 'goats', 'sheep' ]
console.log(unshift(arr1, 'chickens', 'cats', 'dogs'));
//expected output 7
console.log(arr1);
//expected output [ 'chickens', 'cats', 'dogs', 'cows', 'pigs', 'goats', 'sheep' ]

//another case V 
var arr2 = [ 1, 2, 3 ];
console.log(unshift(arr2)); //unshift nothing
//expected output 3
console.log(arr2);
//expected output [ 1, 2, 3 ]

//another case V
var arr3 = [ [ 1, 2, 3 ], [ 4 , 5, 6 ] ];
console.log(unshift(arr3, { 1: 2, 3: 4, 5: 6, a: [ 7, 8, 9 ] } )); //unshift a object
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