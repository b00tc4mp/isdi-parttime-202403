delete Array.prototype.every;

function isBelowThreshold(element) {
  return element < 40;
}

var anyArray = [1, 30, 39, 29, 10, 13];

function every(array, index, callback) {
  if (index === array.length) {
    return true;
  }

  var element = array[index];

  if (!callback(element)) {
    return false;
  }

  return every(array, index + 1, callback);
}

console.log(every(anyArray, 0, isBelowThreshold));
