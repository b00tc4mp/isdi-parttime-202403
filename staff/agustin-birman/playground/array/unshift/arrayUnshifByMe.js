debugger


function unshift(array) {
    var unshiftArray = []

    for (var i = 0 ; i < arguments.length -1 ; i++){
        
            unshiftArray[i]= arguments[i +1]
    }

    for (var i = unshiftArray.length, j = 0; j < array.length; i++, j++){
        unshiftArray[i] = array[j]
    }

    return unshiftArray
}

var array1 = [1, 2, 3];
unshift(array1, 1,2,3,4,5)

console.log(unshift(array1, 1,2,3,4,5))