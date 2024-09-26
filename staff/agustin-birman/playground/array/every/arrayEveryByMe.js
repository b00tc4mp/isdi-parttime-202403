function every (array, callback, index) {
    if(index === undefined) index = 0

    for(index ; index < array.length; index++) {
        if ( callback(array[index])) { 

        } else {
            return false
        }

    }
    return true
}

var array1 = [1, 30, 39, 29, 10, 13, 55];

function below40 (element) {
    return element < 40
}

every(array1, below40)