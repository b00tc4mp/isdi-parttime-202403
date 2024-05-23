console.info('CASE checking the numbers under the 40')

var isBelowThreshold = function(currentValue) { return currentValue < 40;} 

var num = [1, 30, 39, 29, 10, 13];

console.debug(num.every(isBelowThreshold));
// true

console.info('CASE checking if all elements of an array are greater than 10')

function isBigEnough(element, index, array) {
    return element >= 10;
}

console.debug([12, 5, 8, 130, 44].every(isBigEnough)); 
// false

console.debug([12, 54, 18, 130, 44].every(isBigEnough)); 
// true
