function findLastIndex (array, callback){

    for ( var index = array.length; index >=0; index-- ) {
    
    var element = array [index]

    var matches = callback(element, index, array)

    if(matches) {
        return index
        }
    }
    return - 1
}

const array1 = [5, 12, 50, 130, 44];

function higherThan45(element ) {
    return element > 45
}

findLastIndex(array1, higherThan45)