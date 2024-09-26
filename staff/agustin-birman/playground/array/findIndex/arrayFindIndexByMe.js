function findIndex (array, callback) {

    for(var index = 0; index < array.length; index++) {
        var element = array[index]

        var matches = callback ( element, index, array)

        if ( matches ) {
            return index
        }

    }
    return -1
}

const array1 = [5, 12, 8, 130, 44];

function higherThan13 (element) {
    return element > 13
}

findIndex ( array1, higherThan13)