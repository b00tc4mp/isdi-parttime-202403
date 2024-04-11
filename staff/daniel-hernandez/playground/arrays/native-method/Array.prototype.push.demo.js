//case V
var animals = [ 'pigs', 'goats', 'sheep' ];
var count = animals.push('cows');
// console.log(count);
//Expected output: 4
 console.log(animals);
//Expected output: ['pigs', 'goats', 'sheep', 'cows']
// assert
console.assert(count === 4, 'count is incorrect');
console.assert(animals.length === 4, 'animals length is incorrect');
console.assert(animals[0] === 'pigs', 'element at index 0 is incorrect');
console.assert(animals[1] === 'goats', 'element at index 1 is incorrect');
console.assert(animals[2] === 'sheep', 'element at index 2 is incorrect');
console.assert(animals[3] === 'cows', 'element at index 3 is incorrect');

var countAgain = animals.push('chickens', 'cats', 'dogs');
//expected output 7
 console.log(animals);
//Expected output: ['pigs', 'goats', 'sheep', 'cows', 'chickens', 'cats', 'dogs']
// assert
console.assert(countAgain === 7, 'countAgain is incorrect');
console.assert(animals.length === 7, 'animals2 length is incorrect');
console.assert(animals[0] === 'pigs', 'element at index 0 is incorrect');
console.assert(animals[1] === 'goats', 'element at index 1 is incorrect');
console.assert(animals[2] === 'sheep', 'element at index 2 is incorrect');
console.assert(animals[3] === 'cows', 'element at index 3 is incorrect');
console.assert(animals[4] === 'chickens', 'element at index 4 is incorrect');
console.assert(animals[5] === 'cats', 'element at index 5 is incorrect');
console.assert(animals[6] === 'dogs', 'element at index 6 is incorrect');


//case V
var arr = [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ];
var count2 = arr.push(11, 12, [13, 14]);
// console.log(arr.push(11, 12, [13, 14]));
//expected output 13
 console.log(arr)
//expected output [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10, 11, 12, [ 13, 14 ] ]
// assert
console.assert(count2 === 13, 'count2 is incorrect');
console.assert(arr.length === 13, 'arr length is incorrect');
console.assert(arr[0] === 1, 'element at index 0 is incorrect');
console.assert(arr[1] === 2, 'element at index 1 is incorrect');
console.assert(arr[2] === 3, 'element at index 2 is incorrect');
console.assert(arr[3] === 4, 'element at index 3 is incorrect');
console.assert(arr[4] === 5, 'element at index 4 is incorrect');
console.assert(Array.isArray(arr[5]), 'element at index 5 is not an array');
console.assert(arr[5][0] === 6, 'element at index 5, 0 is incorrect');
console.assert(arr[6] === 7, 'element at index 6 is incorrect');
console.assert(arr[7] === 8, 'element at index 7 is incorrect');
console.assert(arr[8] === 9, 'element at index 8 is incorrect');
console.assert(arr[9] === 10, 'element at index 9 is incorrect');
console.assert(arr[10] === 11, 'element at index 10 is incorrect');
console.assert(arr[11] === 12, 'element at index 11 is incorrect');
console.assert(Array.isArray(arr[12]), 'element at index 12 is is not an array');
console.assert(arr[12][0] === 13, 'element at index 12, 0 is incorrect');
console.assert(arr[12][1] === 14, 'element at index 12, 1 is incorrect');

// another case V
var arr1 = [ 'pigs', 'goats', 'sheep' ];
var count3 = arr1.push('cows');
// console.log(arr1.push('cows'));
//expected output 4
 console.log(arr1);
//expected output [ 'pigs', 'goats', 'sheep', 'cows' ]
// assert
console.assert(count3 === 4, 'count3 is incorrect');
console.assert(arr1.length === 4, 'arr1 length is incorrect');
console.assert(arr1[0] === 'pigs', 'element at index 0 is incorrect');
console.assert(arr1[1] === 'goats', 'element at index 1 is incorrect');
console.assert(arr1[2] === 'sheep', 'element at index 2 is incorrect');
console.assert(arr1[3] === 'cows', 'element at index 3 is incorrect');


// another case V 
var arr2 = [ 1, 2, 3 ];
var noPush = arr2.push();
// console.log(arr2.push()); //push nothing
//expected output 3
 console.log(arr2);
//expected output [ 1, 2, 3 ]
// assert
console.assert(noPush === 3, 'noPush is incorrect');
console.assert(arr2.length === 3, 'arr2 length is incorrect');
console.assert(arr2[0] === 1, 'element at index 0 is incorrect');
console.assert(arr2[1] === 2, 'element at index 1 is incorrect');
console.assert(arr2[2] === 3, 'element at index 2 is incorrect');

//another case V
var arr3 = [ [ 1, 2, 3 ], [ 4 , 5, 6 ] ];
var objPush = arr3.push({ 1: 2, 3: 4, 5: 6, a: [ 7, 8, 9 ] } )
// console.log(arr3.push({ 1: 2, 3: 4, 5: 6, a: [ 7, 8, 9 ] } )); //push a object
//expected output 3
 console.log(arr3);
//expected output [ [ 1, 2, 3 ], [ 4, 5, 6 ], { '1': 2, '3': 4, '5': 6, a: [ 7, 8, 9 ] } ]
// assert
console.assert(objPush === 3, 'objPush is incorrect');
console.assert(arr3.length === 3);
console.assert(Array.isArray(arr3[0]), 'element at index 0 is not an array');
console.assert(arr3[0][0] === 1, 'element at index 0, 0 is incorrect');
console.assert(arr3[0][1] === 2, 'element at index 0, 1 is incorrect');
console.assert(arr3[0][2] === 3, 'element at index 0, 2 is incorrect');
console.assert(Array.isArray(arr3[1]), 'element at index 1 is not an array');
console.assert(arr3[1][0] === 4, 'element at index 1, 0 is incorrect');
console.assert(arr3[1][1] === 5, 'element at index 1, 1 is incorrect');
console.assert(arr3[1][2] === 6, 'element at index 1, 2 is incorrect');
console.assert(typeof arr3[2] === 'object' && arr3[2] !== null && !Array.isArray(arr3[2]), 'element at index 2 is not an object');

//DEPRECATED
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