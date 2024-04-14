delete Array.prototype.findLast;

var numbers = [5, 12, 50, 130, 44];

function findLast(array, callback) {
  for (var i = array.length - 1; array.length > 0; i--) {
    var element = array[i];

    var matched = callback(element);

    if (matched) {
      return element;
    }
  }
}

console.info('CASE last number greater than 45');

var numbers = [5, 12, 50, 130, 44];

var lastNumber = findLast(numbers, function (element) {
  return element > 45;
});

console.assert(lastNumber === 130, 'last number found is 130');

console.info('CASE last number less than 45');

var numbers = [5, 12, 50, 130, 44];

var lastNumber = findLast(numbers, function (element) {
  return element < 45;
});

console.assert(lastNumber === 44, 'last number found is 44');
