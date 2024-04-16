delete Array.prototype.unshift;

Array.prototype.unshift = function () {
    var initialLength = this.length;
    this.length = this.length + arguments.length;

    for (var index = initialLength-1, j= this.length-1; index >= 0; index--, j--) {
        this[j] = this[index];
    }

    for (var index = 0; index < arguments.length; index++) {
        this[index] = arguments[index];
    }
}

console.info('CASE add one element to the beginning of animals array');

var animals = ['dog', 'cat', 'horse'];
animals.unshift('pig');

console.assert(animals.length === 4, 'animals length is 4');
console.assert(animals[0] === 'pig', 'animals at index 0 is pig');
console.assert(animals[1] === 'dog', 'animals at index 1 is dog');
console.assert(animals[2] === 'cat', 'animals at index 2 is cat');
console.assert(animals[3] === 'horse', 'animals at index 3 is horse');

console.info('CASE add one element to an empty animals array');

var nums = [];
nums.unshift(1);

console.assert(nums.length === 1, 'nums length is 1');
console.assert(nums[0] === 1, 'nums at index 0 is 1');

console.info('CASE add one negative element to the beginning of nums array');

var nums = [1, 2, 3];
nums.unshift(-4);

console.assert(nums.length === 4, 'nums length is 4');
console.assert(nums[0] === -4, 'nums at index 0 is -4');
console.assert(nums[1] === 1, 'nums at index 1 is 1');
console.assert(nums[2] === 2, 'nums at index 2 is 2');
console.assert(nums[3] === 3, 'nums at index 3 is 3');

console.info('CASE add 3 elements to the beginning of animals array');

var animals = ['dog', 'cat'];
animals.unshift('pig', ['horse', 'bear'], 'monkey');

console.assert(animals.length === 5, 'animals length is 5');
console.assert(animals[0] === 'pig', 'animals at index 0 is pig');
console.assert(animals[1][0] === 'horse', 'animals at index 1 and his first element of it is horse');
console.assert(animals[1][1] === 'bear', 'animals at index 1 and his first element of it is bear');
console.assert(animals[2] === 'monkey', 'animals at index 2 is monkey');
console.assert(animals[3] === 'dog', 'animals at index 3 is dog');
console.assert(animals[4] === 'cat', 'animals at index 4 is cat');