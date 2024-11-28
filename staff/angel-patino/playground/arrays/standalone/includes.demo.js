//HECHO

console.info('CASE return value index from argument')

function includes (array, searchElement, fromIndex) {

    for(var i = fromIndex || 0; i < array.length; i++){
        var valueIndex = array[i]
        if(valueIndex === searchElement)
            return true
    }
    return false
}


var array1 = [1, 2, 3];

var ej = includes(array1, 2);
console.debug(ej)
// Expected output: true

var pets = ['cat', 'dog', 'bat'];

var ej2 = includes(pets, 'cat');
console.log(ej2)
// Expected output: true

var ej3 = includes(pets, 'at')
console.debug(ej3)
// Expected output: false

const arr = ["a", "b", "c"];

arr.includes("c", 3); // false
arr.includes("c", 100); // false
