delete Array.prototype.findIndex;

Array.prototype.findIndex = function (callback) {
  for (var i = 0; this.length; i++) {
    element = this[i];

    var matched = callback(element);

    if (matched) {
      return i;
    }
  }
};

console.info('CASE first index greater than 10');

var numbers = [5, 12, 8, 130, 44];

var firstIndex = numbers.findIndex(function (element) {
  return element > 10;
});

console.assert(firstIndex === 1, 'first index is [1]');

console.info('CASE first index greater than 50');

var firstIndex = numbers.findIndex(function (element) {
  return element > 50;
});

console.assert(firstIndex === 3, 'first index is [3]');
