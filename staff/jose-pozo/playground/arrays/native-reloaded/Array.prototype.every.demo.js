delete Array.prototype.every;

function isBelowThreshold(element) {
  return element < 40;
}

var anyArray = [1, 30, 39, 29, 10, 13];

Array.prototype.every = function every(callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    if (!callback(element)) {
      return false;
    }
  }
  return true;
};

console.log(anyArray.every(isBelowThreshold));
