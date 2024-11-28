console.info('CASE nums by 2');

var numbers = [1, 5, 10, 15];
var numbersBy2 = numbers.map(function (num) {
  return num * 2;
});

// numbers is still [1, 5, 10, 15]
console.assert(numbers[0] === 1, 'numbers 0 is 1');
console.assert(numbers[1] === 5, 'numbers 1 is 5');
console.assert(numbers[2] === 10, 'numbers 2 is 10');
console.assert(numbers[3] === 15, 'numbers 3 is 15');
console.assert(numbers.length === 4, 'numbers length is 4');

// doubles is now [2, 10, 20, 30]
console.assert(numbersBy2[0] === 2, 'numbersBy2 0 is 2');
console.assert(numbersBy2[1] === 10, 'numbersBy2 1 is 10');
console.assert(numbersBy2[2] === 20, 'numbersBy2 2 is 20');
console.assert(numbersBy2[3] === 30, 'numbersBy2 3 is 30');
console.assert(numbersBy2.length === 4, 'numbersBy2 length is 4');

console.info('CASE nums square root');

var numbers = [1, 4, 9];
var roots = numbers.map(function (num) {
  return Math.sqrt(num);
});

// numbers is still [1, 4, 9]
console.assert(numbers[0] === 1, 'numbers 0 is 1');
console.assert(numbers[1] === 4, 'numbers 1 is 4');
console.assert(numbers[2] === 9, 'numbers 2 is 9');
console.assert(numbers.length === 3, 'numbers length is 3');

// roots is now [1, 2, 3]
console.assert(roots[0] === 1, 'roots 0 is 1');
console.assert(roots[1] === 2, 'roots 1 is 2');
console.assert(roots[2] === 3, 'roots 2 is 3');
console.assert(roots.length === 3, 'roots length is 3');

console.info('CASE map elements and other arguments into objects');

var animals = ['dog', 'cat', 'horse'];

var data = animals.map(function (animal, index, animals){
    var object = { animal: animal, index: index, animals: animals };
    return object;
});

/*Expected output:
Array [
    {
        animal: 'dog',
        index: 0,
        animals: animals
    },
    {
        animal: 'cat',
        index: 1,
        animals: animals
    },
    {
        animal: 'horse',
        index: 2,
        animals: animals
    }
];*/
console.assert(data[0].animal === 'dog', 'data 0 animal is dog');
console.assert(data[0].index === 0, 'data 0 index is 0');
console.assert(data[0].animals === animals, 'data 0 animals is [dog, cat, horse]');

console.assert(data[1].animal === 'cat', 'data 1 animal is cat');
console.assert(data[1].index === 1, 'data 1 index is 0');
console.assert(data[1].animals === animals, 'data 1 animals is [dog, cat, horse]');

console.assert(data[2].animal === 'horse', 'data 2 animal is horse');
console.assert(data[2].index === 2, 'data 2 index is 0');
console.assert(data[2].animals === animals, 'data 2 animals is [dog, cat, horse]');