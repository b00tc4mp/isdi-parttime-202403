delete Array.prototype.find;

var array1 = [5, 12, 8, 130, 44];

function found(element) {
  return element > 100;
}

Array.prototype.find = function find(callback, index = 0) {
  if (index === this.length) {
    return;
  }

  var element = this[index];

  if (callback(element)) {
    return element;
  }

  return this.find(callback, index + 1);
};

console.log(array1.find(found));
