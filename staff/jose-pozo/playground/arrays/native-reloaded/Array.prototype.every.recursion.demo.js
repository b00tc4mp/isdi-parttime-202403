delete Array.prototype.every;

function isBelowThreshold(element) {
  return element < 40;
}

var anyArray = [1, 30, 39, 29, 10, 13];

Array.prototype.every = function every(callback, index = 0) {
  if (index === this.length) {
    return true;
  }

  var element = this[index];

  if (!callback(element)) {
    return false;
  }

  return this.every(callback, index + 1);
};

console.log(anyArray.every(isBelowThreshold));
