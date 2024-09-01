delete Array.prototype.slice;

Array.prototype.slice = function (start = 0, end = this.length) {
  var newArray = [];

  if (start < 0) {
    start = this.length + start;
  } else if (end < 0) {
    end = this.length + end;
  }

  for (var i = start; i < end; i++) {
    var element = this[i];

    newArray[newArray.length] = element;
  }

  return newArray;
};

console.info('CASE extract animals from index 2');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var sliced = animals.slice(2);

console.assert(sliced.length === 3, 'sliced length is 3');
console.assert(sliced[0] === 'camel', 'sliced at 0 is camel');
console.assert(sliced[1] === 'duck', 'sliced at 1 is duck');
console.assert(sliced[2] === 'elephant', 'sliced at 2 is elephant');
console.assert(animals.length === 5, ' length is 5');

console.info('CASE extract animals from index 2 until 4');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var sliced = animals.slice(2, 4);

console.assert(sliced.length === 2, 'sliced length is 2');
console.assert(sliced[0] === 'camel', 'sliced at 0 is camel');
console.assert(sliced[1] === 'duck', 'sliced at 1 is duck');
console.assert(animals.length === 5, ' length is 5');

console.info('CASE extract animals from index 1 until 5');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var sliced = animals.slice(1, 5);

console.assert(sliced.length === 4, 'sliced length is 4');
console.assert(sliced[0] === 'bison', 'sliced at 0 is bison');
console.assert(sliced[1] === 'camel', 'sliced at 1 is camel');
console.assert(sliced[2] === 'duck', 'sliced at 2 is duck');
console.assert(sliced[3] === 'elephant', 'sliced at 3 is elephant');
console.assert(animals.length === 5, ' length is 5');

console.info('CASE extract animals from index -2');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var sliced = animals.slice(-2);

console.assert(sliced.length === 2, 'sliced length is 2');
console.assert(sliced[0] === 'duck', 'sliced at 0 is duck');
console.assert(sliced[1] === 'elephant', 'sliced at 1 is elephant');
console.assert(animals.length === 5, ' length is 5');

console.info('CASE extract animals from index 2 until -1');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var sliced = animals.slice(2, -1);

console.assert(sliced.length === 2, 'sliced length is 2');
console.assert(sliced[0] === 'camel', 'sliced at 0 is camel');
console.assert(sliced[1] === 'duck', 'sliced at 1 is duck');
console.assert(animals.length === 5, ' length is 5');

console.info('CASE index is undefined');

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var sliced = animals.slice();

console.assert(sliced.length === 5, 'sliced length is 5');
console.assert(sliced[0] === 'ant', 'sliced at 0 is ant');
console.assert(sliced[1] === 'bison', 'sliced at 1 is bison');
console.assert(sliced[2] === 'camel', 'sliced at 2 is camel');
console.assert(sliced[3] === 'duck', 'sliced at 3 is duck');
console.assert(sliced[4] === 'elephant', 'sliced at 4 is elephant');
console.assert(animals.length === 5, ' length is 5');
