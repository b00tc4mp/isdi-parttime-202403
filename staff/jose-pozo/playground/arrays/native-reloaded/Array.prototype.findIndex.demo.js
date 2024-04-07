delete Array.prototype.findIndex;

var array1 = [5, 12, 8, 130, 44];

function isLargeNumber(element) {
  return element > 12;
}

Array.prototype.findIndex = function findIndex(callback) {
  for (var i = 0; i < this.length; i++) {
    element = this[i];

    if (callback(element)) {
      return i;
    }
  }
};

console.log(array1.findIndex(isLargeNumber));
