delete Array.prototype.find;

var array1 = [5, 12, 8, 130, 44];

function found(element) {
  return element > 10;
}

function find(array, callback, index = 0) {
  if (index === array.length) {
    return;
  }

  var element = array[index];

  if (callback(element)) {
    return element;
  }

  return find(array, callback, index + 1);
}

console.log(find(array1, found));
