delete Array.prototype.find;

var array1 = [5, 12, 8, 130, 44];

function found(element) {
  return element > 10;
}

Array.prototype.find = function find(callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    if (callback(element)) {
      return element;
    }
  }
};

console.log(array1.find(found));
