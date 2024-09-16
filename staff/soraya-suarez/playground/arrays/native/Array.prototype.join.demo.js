var elements = ['Fire', 'Air', 'Water'];

console.assert(elements.join() === 'Fire,Air,Water', 'Returns string: Fire,Air,Water');
console.assert(elements.join('') === 'FireAirWater', 'Returns string: FireAirWater');
console.assert(elements.join('-') === 'Fire-Air-Water', 'Returns string: Fire-Air-Water');

var array = [];
console.assert(array.join() === '', 'Returns string: ');

var animals = ['Cow', null, 'dog', undefined];
console.assert(animals.join() === 'Cow,,dog,', 'Returns string: Cow,,dog,');

var numbers = [1,2,3];
console.assert(numbers.join('-') === '1-2-3', 'Returns string: 1-2-3');

var numbers1 = [1, [2,3]];
console.assert(numbers1.join() === '1,2,3');