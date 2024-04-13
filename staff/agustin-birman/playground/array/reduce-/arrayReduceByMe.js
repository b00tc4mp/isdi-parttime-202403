debugger

function reduce (array, callback, accumulator,  index) {
    
    if(index===undefined) { index = 0}
    if(accumulator===undefined) { accumulator = 0}
    

    for(index; index < array.length; index++) {

        var element = array[index]

        var result = callback(accumulator, element, index, array)

        accumulator += result

    }
    return result, accumulator
    console.log(result,'/', accumulator)
}

var array1 = [1, 2, 3, 4, 5];
function sum(accumulator, element) {
   
    return element
}

var words = ['Hello', 'World', 'JavaScript'];

reduce(array1, sum)