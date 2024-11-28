delete Array.prototype.indexOf

//HECHO
function indexOf(array, value, startIndex) {
    for (var i = startIndex || 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}


console.info('CASE locate a value in an array')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

var locate = indexOf(beasts, 'bison');
console.debug(locate);
// Expected output: 1

 //Start from index 2
var locate2 = indexOf(beasts, 'bison', 2);
// Expected output: 4
console.debug(locate2)

var locate3 = indexOf(beasts, 'giraffe');
// Expected output: -1*/
console.debug(locate3)