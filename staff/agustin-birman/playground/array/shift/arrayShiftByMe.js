function shift(array) {
    var shiftElement = array[0]
    var newShiftArray = []
    delete array[0]
    

    for ( var i = 0; i < array.length-1; i ++){
        newShiftArray[i] = array[i + 1]
    }
        

    return shiftElement, newShiftArray
}

const array1 = [1, 2, 3,4,5,6,7,8,9]
var deleteFirstElement = shift(array1) 
console.log(deleteFirstElement)
// console.log(array1)