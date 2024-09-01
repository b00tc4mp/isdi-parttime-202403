delete Array.prototype.findLast;

var numbers = [5, 12, 50, 130, 44];

Array.prototype.findLast = function findLast(callback) {
  for (var i = this.length - 1; this.length > 0; i--) {
    var element = this[i];

    var matched = callback(element);

    if (matched) {
      return element;
    }
  }
};

console.info('CASE last number greater than 45');

var numbers = [5, 12, 50, 130, 44];

var lastNumber = numbers.findLast(function (element) {
  return element > 45;
});

console.assert(lastNumber === 130, 'last index is 130');

console.info('CASE last number less than 45');

var numbers = [5, 12, 50, 130, 44];

var lastNumber = numbers.findLast(function (element) {
  return element < 45;
});

console.assert(lastNumber === 44, 'last index is 44');
