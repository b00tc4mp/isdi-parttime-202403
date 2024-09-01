delete Array.prototype.flat;
delete Array.prototype.concat;
//delete Array.prototype.push;
// * node breaks if it doesnt have push

// call flat as a function VVV
var flat = function (arr, depth) {
  var newArray = [];

  for (var i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && depth > 0) {
      var nestedArray = flat(arr[i], depth - 1);
      for (var j = 0; j < nestedArray.length; j++) {
        newArray[newArray.length] = nestedArray[j];
      }
    } else {
      newArray[newArray.length] = arr[i];
    }
  }

  return newArray;
};

// case V
var arr = [0, 1, 2, [3, 4]];
console.log(flat(arr, 2));
// expected output [ 0, 1, 2, 3, 4 ]

//another case V
var arr1 = [[1,2],[3,[4,[5,[6]]],7],[8,9,10]];
console.log(flat(arr1, 3));
// expected output [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]

//another case V
arr1 = [[1,2],[3,[4,[5,[6]]],7],[8,9,10]];
console.log(flat(arr1, Infinity));
// expected output [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

//another case V 
var arr2 = [[1,2],[3,[4,[5,[6]]],7],[8,9,10], [11, 12, { 13: 14, 15: 16, 17: [18, 19]}]];
console.log(flat(arr2, Infinity));
// expected output :

/* 
[
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    { '13': 14, '15': 16, '17': [ 18, 19 ] }
]
*/


/* total output
[ 0, 1, 2, 3, 4 ]
[
  1,  2, 3,
  4,  5, [ 6 ],
  7,  8, 9,
  10
]
[
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]
[
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  { '13': 14, '15': 16, '17': [ 18, 19 ] }
]
*/
