function* keys ( array ) {
    var index = 0

    while( index < array.length) {
        yield { index }
        index++
    }
}

const array1 = ['a', 'b', 'c'];
const iterator = keys(array1);

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// Expected output: 0
// Expected output: 1
// Expected output: 2
