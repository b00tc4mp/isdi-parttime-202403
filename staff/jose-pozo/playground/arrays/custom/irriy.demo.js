function Irriy() {
  if (arguments.length === 1 && typeof arguments[0] === 'number') {
    var length = arguments[0];

    this.length = length;
  } else {
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments[i];

      this[i] = argument;
    }
    this.length = arguments.length;
  }
}

Irriy.prototype.every = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    var matched = callback(element);

    if (!matched) {
      return false;
    }
  }
  return true;
};

Irriy.prototype.filter = function (callback) {
  var filterArr = [];

  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    var matched = callback(element);

    if (matched) {
      filterArr[filterArr.length] = element;
    }
  }

  return filterArr;
};

Irriy.prototype.find = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var element = this[i];

    var matched = callback(element);

    if (matched) {
      return element;
    }
  }
};

console.info('CASE constructs an instance with 2 elements');

var fruits = new Irriy('Apple', 'Banana');

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy');
console.assert(
  !(fruits instanceof Array),
  'fruits is not an instance of Array'
);
console.assert(fruits.length === 2, 'fruits length is 2');
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple');
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana');

console.info('CASE constructs an instance with 3 elements');

var fruits = new Irriy('Apple', 'Banana', 'Orange');

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy');
console.assert(
  !(fruits instanceof Array),
  'fruits is not an instance of Array'
);
console.assert(fruits.length === 3, 'fruits length is 3');
console.assert(fruits[0] === 'Apple', 'fruit at index 0 is Apple');
console.assert(fruits[1] === 'Banana', 'fruit at index 1 is Banana');
console.assert(fruits[2] === 'Orange', 'fruit at index 2 is Orange');

console.info('CASE constructs an instance with length 3');

var fruits = new Irriy(3);

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy');
console.assert(
  !(fruits instanceof Array),
  'fruits is not an instance of Array'
);
console.assert(fruits.length === 3, 'fruits length is 3');
console.assert(fruits[0] === undefined, 'fruit at index 0 is undefined');
console.assert(fruits[1] === undefined, 'fruit at index 1 is undefined');
console.assert(fruits[2] === undefined, 'fruit at index 2 is undefined');

console.info('CASE constructs an instance with 1 element');

var fruits = new Irriy('3');

console.assert(fruits instanceof Irriy, 'fruits is instance of Irriy');
console.assert(
  !(fruits instanceof Array),
  'fruits is not an instance of Array'
);
console.assert(fruits.length === 1, 'fruits length is 1');
console.assert(fruits[0] === '3', 'fruit at index 0 is "3"');

console.info('CASE check if all numbers are less than 40');

var numbers = new Irriy(1, 30, 39, 29, 10, 13);

var checkIf = numbers.every(function (element) {
  return element < 40;
});

console.assert(numbers instanceof Irriy, 'animals is instance of Irriy');
console.assert(
  !(numbers instanceof Array),
  'animals is not an instance of Array'
);
console.assert(checkIf === true, 'checkIf gives true');
console.assert(numbers.length === 6, 'numbers length is 6');

console.info('CASE create new array with length greater than 6');

var words = new Irriy('spray', 'elite', 'exuberant', 'destruction', 'present');

var filtered = words.filter(function (element) {
  return element.length > 6;
});

console.assert(words instanceof Irriy, 'words is instance of Irriy');
console.assert(!(words instanceof Array), 'words is not an instance of Array');
console.assert(filtered.length === 3, 'filtered length is 3');
console.assert(filtered[0] === 'exuberant', 'filtered at index 0 is exuberant');
console.assert(
  filtered[1] === 'destruction',
  'filtered at index 1 is destruction'
);
console.assert(filtered[2] === 'present', 'filtered at index 2 is present');
console.assert(words.length === 5, 'words length is 5');

console.info('CASE first element greater than 10');

var numbers = new Irriy(5, 12, 8, 130, 44);

var firstNumber = numbers.find(function (element) {
  return element > 10;
});

console.assert(numbers instanceof Irriy, 'numbers is instance of Irriy');
console.assert(
  !(numbers instanceof Array),
  'numbers is not an instance of Array'
);
console.assert(firstNumber === 12, 'first number found is 12');
