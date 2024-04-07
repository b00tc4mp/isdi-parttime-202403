delete Array.prototype.findIndex;

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 12;
}

function findIndex(array, callback, index = 0) {
  if (index === array.length) {
    return;
  }

  element = array[index];

  if (callback(element)) {
    return index;
  }
  return findIndex(array, callback, index + 1);
}

console.log(findIndex(array1, isLargeNumber));
