function at (array, index) {
    var indexAt

    if( index >= array.length) {
        return undefined 
    } else if(index >= 0) {
        var indexAt = index
    }else if (index < 0) {
        var indexAt = array.length + index
    }

    var element = array[indexAt]

    return element
}

var numbers = [5, 12, 8, 130, 44];

var indexToElement = 2

var result = at(numbers, indexToElement)

console.log(`An index of ${indexToElement} returns ${result}`);

console.assert(result === 8, 'index 2 should return 8')
// Expected output: "An index of 2 returns 8"