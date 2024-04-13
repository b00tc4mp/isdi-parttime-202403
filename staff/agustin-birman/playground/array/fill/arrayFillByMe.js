function fill(array, value, start, end) {
    var indexFrom, indexTo

    indexFrom = start === undefined ? 0 : start < 0 ? array.length + start : start
    indexTo = end === undefined || end > array.length? array.length : (end < 0 ? array.length + end : end)

    for( indexFrom; indexFrom < indexTo; indexFrom++) {
        array[indexFrom] = value
    }

    return array
}


var array1 = [1, 2, 3, 4];

// Fill with 0 from position 2 until position 4
console.log(fill(array1,0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

var array1 = [1, 2, 3, 4];
// Fill with 5 from position 1
console.log(fill(array1,5, 1));
// Expected output: Array [1, 5, 5, 5]

var array1 = [1, 2, 3, 4];
console.log(fill(array1,6));
// Expected output: Array [6, 6, 6, 6]

var numbers = [1, 2, 3]
console.log(fill(numbers, 4)); // [4, 4, 4]
var numbers = [1, 2, 3]
console.log(fill(numbers, 4, 1)); // [1, 4, 4]
var numbers = [1, 2, 3]
console.log(fill(numbers, 4, 1, 2)); // [1, 4, 3]
var numbers = [1, 2, 3]
console.log(fill(numbers, 4, 1, 1)); // [1, 2, 3]
var numbers = [1, 2, 3]
console.log(fill(numbers, 4, 3, 3)); // [1, 2, 3]
var numbers = [1, 2, 3]
console.log(fill(numbers, 4, -3, -2)); // [4, 2, 3]
var numbers = [1, 2, 3]
console.log(fill(numbers, 4, NaN, NaN)); // [1, 2, 3]
var numbers = [1, 2, 3]
console.log(fill(numbers, 4, 3, 5)); // [1, 2, 3]
