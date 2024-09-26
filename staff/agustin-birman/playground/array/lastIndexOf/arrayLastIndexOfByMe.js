function lastIndexOf ( array, value, start) {


    var indexFrom = start === undefined ? array.length - 1 : (start < 0 ? array.length + start: start )

    for (indexFrom ; indexFrom >= 0 ; indexFrom--){
        var element = array[indexFrom]
        if(value === element ) {
            return indexFrom
        }

    }

    return -1
}

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(lastIndexOf(animals, 'Dodo'));
// // Expected output: 3

console.log(lastIndexOf(animals,'Tiger'));
// Expected output: 1

const number = [2, 5, 9, 2];
console.log(lastIndexOf(number , 2)); // 3
console.log(lastIndexOf(number , 7)); // -1
console.log(lastIndexOf(number , 2, 3)); // 3
console.log(lastIndexOf(number , 2, 2)); // 0
console.log(lastIndexOf(number , 2, -2)); // 0
console.log(lastIndexOf(number , 2, -1)); // 3