delete Array.prototype.slice;
delete Array.prototype.concat;
//delete Array.prototype.push;
// * node breaks if it doesnt have push

//call push as a function VVV
var push = function (arr) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args[args.length] = arguments[i];
  }

  for (var k = 0; k < args.length; k++) {
    arr[arr.length] = args[k];
  }

  return arr.length;
}

//case VV
var animals = [ 'pigs', 'goats', 'sheep' ];
var count = push(animals, 'cows');
console.log(count);
// Expected output: 4
console.log(animals);
// Expected output: ['pigs', 'goats', 'sheep', 'cows']

push(animals, 'chickens', 'cats', 'dogs');
console.log(animals);
// Expected output: ['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']


//case V
var arr = [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ];
console.log(push(arr, 11, 12, [ 13, 14 ]));
//expected output 13
console.log(arr);
//expected output [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10, 11, 12, [ 13, 14 ] ]

//another case V
var arr1 = [ 'pigs', 'goats', 'sheep' ];
console.log(push(arr1, 'cows'));
//expected output 4
console.log(arr1);
//expected output [ 'pigs', 'goats', 'sheep', 'cows' ]
console.log(push(arr1, 'chickens', 'cats', 'dogs'));
//expected output 7
console.log(arr1);
//expected output [ 'pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs' ]

//another case V 
var arr2 = [ 1, 2, 3 ];
console.log(push(arr2)); //push nothing
//expected output 3
console.log(arr2);
//expected output [ 1, 2, 3 ]

//another case V
var arr3 = [ [ 1, 2, 3 ], [ 4 , 5, 6 ] ];
console.log(push(arr3, { 1: 2, 3: 4, 5: 6, a: [ 7, 8, 9 ] } )); //push a object
//expected output 3
console.log(arr3);
//expected output [ [ 1, 2, 3 ], [ 4, 5, 6 ], { '1': 2, '3': 4, '5': 6, a: [ 7, 8, 9 ] } ]

/* total console log
4
[ 'pigs', 'goats', 'sheep', 'cows' ]
[
  'pigs',     'goats',
  'sheep',    'cows',
  'chickens', 'cats',
  'dogs'
]
13
[ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10, 11, 12, [ 13, 14 ] ]
4
[ 'pigs', 'goats', 'sheep', 'cows' ]
7
[
  'pigs',     'goats',
  'sheep',    'cows',
  'chickens', 'cats',
  'dogs'
]
3
[ 1, 2, 3 ]
3
[
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  { '1': 2, '3': 4, '5': 6, a: [ 7, 8, 9 ] }
]
*/