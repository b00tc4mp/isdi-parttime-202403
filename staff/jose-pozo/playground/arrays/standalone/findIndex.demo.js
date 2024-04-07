delete Array.prototype.findIndex;

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 12;
}

function findIndex(array, callback) {
  for (var i = 0; array.length; i++) {
    element = array[i];

    if (callback(element)) {
      return i;
    }
  }
}

console.log(findIndex(array1, isLargeNumber));
