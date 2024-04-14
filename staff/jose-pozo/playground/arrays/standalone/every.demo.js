delete Array.prototype.every;

function every(array, callback) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    var matched = callback(element);

    if (!matched) {
      return false;
    }
  }
  return true;
}

console.info('CASE check if all numbers are less than 40');

var numbers = [1, 30, 39, 29, 10, 13];

var checkIf = every(numbers, function (element) {
  return element < 40;
});

console.assert(checkIf === true, 'checkIf gives true');
// Expected output: true

console.info('CASE check if all numbers are greater than 40');

var numbers = [1, 30, 39, 29, 10, 13];

var checkIf = every(numbers, function (element) {
  return element > 40;
});

console.assert(checkIf === false, 'checkif gives false');
