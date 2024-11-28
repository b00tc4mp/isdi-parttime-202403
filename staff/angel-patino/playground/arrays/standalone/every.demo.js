//HECHO
console.info('CASE all elements in the array pass the test implemented by the provided function. It returns a Boolean value.')

function every (array, callback){

    for(var i = 0; i < array.length; i++){
            var element = array[i]
        var elementFind = callback(element, i, array)
        if(elementFind != true)
            return false
    }
    return true
}

console.info('CASE know if all elements in the array pass the function')
var isBelowThreshold = function (currentValue) { return currentValue < 40};

var array1 = [1, 30, 39, 29, 10, 13];

console.log(every(array1, isBelowThreshold));
// Expected output: true

console.info('CASE reads the length property with a nonnegative integer key')
const arrayLike = {
    length: 3,
    0: "a",
    1: "b",
    2: "c",
    3: 345, // ignored by every() since length is 3
  }
    console.log(every(arrayLike, function (x) {typeof x === "string"})) // true