/*
function every(array, callback){
    for(var i = 0; i < array.length; i++){
        if(callback( array, i, array))
            return true
    }
    return false
    }
*/

delete Array.prototype.every

function every(array, callback){

    for(var i = 0; i < array.length; i++){//recorre el array

        if(!callback( array[i], i, array))//llamamos a callback que recoge 3 argumentos
            return false
    }
return true
}

console.info('CASE checking the numbers under the 40')

var isBelowThreshold = function(currentValue) { return currentValue < 40;} 

var num = [1, 30, 39, 29, 10, 13];

console.debug(every(num, isBelowThreshold));
// true

console.info('CASE checking if all elements of an array are greater than 10')

function isBigEnough(element, index, array) {
    return element >= 10;
}

console.debug(every([12, 5, 8, 130, 44], isBigEnough)); 
// false

console.debug(every([12, 54, 18, 130, 44], isBigEnough)); 
// true