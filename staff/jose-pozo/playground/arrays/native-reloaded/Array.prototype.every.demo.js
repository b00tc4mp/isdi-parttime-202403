delete Array.prototype.every;

Array.prototype.every = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    var matched = callback(element);

    if (!matched) {
      return false;
    }
  }
  return true;
};

console.info('CASE check if all numbers are less than 40');

var numbers = [1, 30, 39, 29, 10, 13];

var checkIf = numbers.every(function (element) {
  return element < 40;
});

console.assert(checkIf === true, 'checkIf gives true');

console.info('CASE check if all numbers are greater than 40');

var numbers = [1, 30, 39, 29, 10, 13];

var checkIf = numbers.every(function (element) {
  return element > 40;
});

console.assert(checkIf === false, 'checkif gives false');
