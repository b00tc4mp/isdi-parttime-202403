console.info('CASE extract first element from animals array');
var animals = ['dog', 'cat', 'bird', 'horse', 'cow'];
var removed = animals.shift();

console.assert(removed === 'dog', 'dog is removed from animals array');
console.assert(animals.length === 4, 'animals length is 4')
console.assert(animals[0] === 'cat', 'animals at index 0 is cat');
console.assert(animals[1] === 'bird', 'animals at index 1 is bird');
console.assert(animals[2] === 'horse', 'animals at index 2 is horse');
console.assert(animals[3] === 'cow', 'animals at index 3 is cow');

console.info('CASE extract the unic element from animals array');
var animals = ['pig'];
var removed = animals.shift();

console.assert(removed === 'pig', 'pig is removed from animals array');
console.assert(animals.length === 0, 'animals length is 0')
console.assert(animals[0] === undefined, 'animals at index 0 is empty array');

console.info('CASE extract first element from a empty array');
var animals = [];
var removed = animals.shift();
console.assert(removed === undefined, 'no element could be removed from empty array');
console.assert(animals.length === 0, 'animals length is 0');
console.assert(animals[0] === undefined, 'animals at index 0 is empty array');