delete Array.prototype.find;

var array1 = [5, 12, 8, 130, 44];

function found(element) {
  return element > 10;
}

function find(array, callback) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    if (callback(element)) {
      return element;
    }
  }
}

console.log(find(array1, found));
