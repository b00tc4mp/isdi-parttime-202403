delete Array.prototype.every;

function isBelowThreshold(element) {
  return element < 40;
}

var anyArray = [1, 30, 39, 29, 10, 13];

function every(array, callback) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    if (!callback(element)) {
      return false;
    }
  }
  return true;
}

console.log(every(anyArray, isBelowThreshold));
