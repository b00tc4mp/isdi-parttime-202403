
Array.prototype.at = function (index) {
    // if (index > 0)
    //     return this[index]

    // else
    //     return this[this.length + index]
    return index > 0 ? this[index] : this[this.length + index]
}


console.info('CASE return index')

var numbers = [5, 12, 8, 130, 44];

var index = 2;

console.log('An index of ' + index + ' returns ' + numbers.at(index))
// Expected output: "An index of 2 returns 8"

index = -2;

console.log('An index of ' + index + ' returns ' + numbers.at(index))
// Expected output: "An index of -2 returns 130"

console.assert(numbers[2] === 8, 'at index two is 8')
console.assert(numbers[numbers.length - 2] === 130, 'at index -two is 130')

console.info('CASE return index')

// Our array with items
var cart = ["apple", "banana", "pear"];

// A function which returns the last item of a given array
function returnLast(array) {
    return array.at(-1);
}

var fruit = returnLast(cart)

console.assert(fruit === 'pear', 'at index -1 is pear')

console.log(fruit)