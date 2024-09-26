function findLast (array, callback){
    
    for ( var i = array.length - 1; i >= 0; i--) {

        var element = array[i]

        var matches = callback(element, i , array)

        if (matches) {
            return element
        }

    }
    return undefined
}

const array1 = [5, 12, 50, 130, 44];

function higherThan45(element ) {
    return element > 45
}

findLast(array1, higherThan45)