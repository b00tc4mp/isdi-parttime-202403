delete Array.prototype.find;

Array.prototype.find = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    var matched = callback(element);

    if (matched) {
      return element;
    }
  }
};

console.info('CASE first element greater than 10');

var numbers = [5, 12, 8, 130, 44];

var firstNumber = numbers.find(function (element) {
  return element > 10;
});

console.assert(firstNumber === 12, 'first number found is 12');

console.info('CASE first element greater than 50');

var firstNumber = numbers.find(function (element) {
  return element > 50;
});

console.assert(firstNumber === 130, 'first number found is 130');
