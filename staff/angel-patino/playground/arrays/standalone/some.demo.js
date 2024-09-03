
//HECHO
function some (array, callback) {

    for(var i = 0; i < array.lenght; i++) {
            var value = array[i]
            var el = callback(value, i, array)
            if(el)
            return true
    }

    return false

}

var arr = [1, 2, 3, 4, 5];

// Checks whether an element is even
var even = some(arr, function(element) { element % 2 === 0});

console.log(some(even));
// Expected output: true

console.assert(even === true, 'even is true')

