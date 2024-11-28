//tests
var isBelowThreshold = function(currentValue) {
  return currentValue < 40; 
};
var array1 = [ 1, 30, 39, 29, 10, 13 ];
console.log(array1.every(isBelowThreshold));
//expected output true

function isBigEnough(element, index, array) {
  return element >= 10;
}
[ 12, 5, 8, 130, 44 ].every(isBigEnough);
[ 12, 54, 18, 130, 44 ].every(isBigEnough);

var isSubset = function(array1, array2) {
  return array2.every(function(element) { 
      return array1.indexOf(element) !== -1; 
  });
};
console.log(isSubset([ 1, 2, 3, 4, 5, 6, 7 ], [ 5, 7, 6 ]));
console.log(isSubset([ 1, 2, 3, 4, 5, 6, 7 ], [ 5, 8, 7 ]));
//expected output: true
//expected output: false

/* total console output
true
true
false
*/