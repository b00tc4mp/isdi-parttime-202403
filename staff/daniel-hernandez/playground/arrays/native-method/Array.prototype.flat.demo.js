// case V
var arr = [ 0, 1, 2, [ 3, 4 ] ];
console.log(arr.flat(2));
// expected output [ 0, 1, 2, 3, 4 ]

//another case V
var arr1 = [ [ 1, 2 ], [ 3, [ 4, [ 5, [ 6 ] ] ], 7 ], [ 8, 9, 10 ] ];
console.log(arr1.flat(3));
// expected output [ 1, 2, 3, 4, 5, [ 6 ], 7, 8, 9, 10 ]

//another case V
arr1 = [ [ 1, 2 ], [ 3, [ 4, [ 5, [ 6 ] ] ], 7 ], [ 8, 9, 10 ] ];
console.log(arr1.flat(Infinity));
// expected output [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

//another case V 
var arr2 = [ [ 1, 2 ], [ 3, [ 4, [ 5, [ 6 ] ] ], 7 ], [ 8, 9, 10 ], [ 11, 12, { 13: 14, 15: 16, 17: [ 18, 19 ] } ] ];
console.log(arr2.flat(Infinity));
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