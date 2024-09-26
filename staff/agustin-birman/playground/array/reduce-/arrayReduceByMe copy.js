debugger
function reduce (array, callback) {
    var accumulator
    var elementTypeOf = array[0];

    (function(){
    if(typeof elementTypeOf === 'number' && accumulator === undefined) accumulator = 0
    if(typeof elementTypeOf === 'string' && accumulator === undefined) accumulator = ''
    if(typeof elementTypeOf === 'array' && accumulator === undefined) accumulator = []
    if(typeof elementTypeOf === 'object' && accumulator === undefined) accumulator = {}
    })()

    for ( var i = 0; i < array.length; i++) {
       
        var element = array[i]
        var result = callback(accumulator, element, i , array)
        result += result
    }
    return result
  
}

var array1 = [1, 2, 3, 4, 5];
function sum(accumulator, element) {
   return accumulator += element
}

var words = ['Hello', 'World', 'JavaScript'];

reduce(array1, sum)