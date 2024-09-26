function find (array, callback) {

    for( var index = 0; index <array.length; index ++) {
        var element = array [index]

        var matches = callback(element , index , array)

        if(matches) { 
            return element
        } 
    }
    return undefined
}

var array1 = [5, 12, 8, 130, 44];

function higherThan10 (element) {
    return element > 10
}

find(array1, higherThan10)