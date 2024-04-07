delete Array.prototype.findIndex;

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 12;
}

Array.prototype.findIndex = function findIndex(callback, index = 0) {
  if (index === this.length) {
    return;
  }

  element = this[index];

  if (callback(element)) {
    return index;
  }
  return array1.findIndex(callback, index + 1);
};

console.log(array1.findIndex(isLargeNumber));
