function some (array, callback) {


    for(var i = 0; i < array.length; i++) {

        var element = array[i]

        var matches = callback(element, i, array)

        if(matches) {
            return true
        }

    }
    return false
}

var array = [1, 2, 3, 4, 5];

function evenCheck (element) {
    if(element % 2 === 0) {
        return true
    }
}

some(array, evenCheck)
