delete Array.prototype.reverse

//menos correcto
// function reverse(array){
//     reversed = [];
//     for (var i = array.length; i > 0;i--){
//         reversed[reversed.length] = array[i-1]
//     }
//     for (var i = 0; i< reversed.length; i++){
//         array[i] = reversed[i]
//     }
//     return array
// }

// mas correcto
function reverse(array){
    for (var i = 0, j = array.length -1 ; i<j; i++, j--){
        var left = array[i]
        var rigth = array[j]
        array[i] = rigth
        array[j] = left
    }
    return array
}


console.info('CASE invert array with 3 elemets')
var array1 = ['one', 'two', 'three'];
var result = reverse(array1)
console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'three', 'result valuea at index 0 is three')
console.assert(result[1] === 'two', 'result valuea at index 1 is two')
console.assert(result[2] === 'one', 'result valuea at index 2 is one')


console.info('CASE invert array with 4 or more element')

var array2 = ['one', 'two', 'three', 'four']
var result = reverse(array2)

console.assert(result instanceof Array, 'result is an array')

console.assert(result.length === 4, 'result length is 4')

console.assert(result[0] === 'four', 'result valuea at index 0 is four')
console.assert(result[1] === 'three', 'result valuea at index 1 is three')
console.assert(result[2] === 'two', 'result valuea at index 2 is two')
console.assert(result[3] === 'one', 'result valuea at index 3 is one')




console.info('CASE invert array with 5 or more element')

var array3 = ['one', 'two', 'three', 'four','five']
var result = reverse(array3)

console.assert(result instanceof Array, 'result is an array')

console.assert(result.length === 5, 'result length is 5')

console.assert(result[0] === 'five', 'result valuea at index 0 is five')
console.assert(result[1] === 'four', 'result valuea at index 1 is four')
console.assert(result[2] === 'three', 'result valuea at index 2 is three')
console.assert(result[3] === 'two', 'result valuea at index 3 is two')
console.assert(result[4] === 'one', 'result valuea at index 4 is one')



console.info('CASE invert array with 6 or more element')

var array4 = ['one', 'two', 'three', 'four','five','six']
var result = reverse(array4)

console.assert(result instanceof Array, 'result is an array')

console.assert(result.length === 6, 'result length is 6')

console.assert(result[0] === 'six', 'result valuea at index 0 is six')
console.assert(result[1] === 'five', 'result valuea at index 0 is five')
console.assert(result[2] === 'four', 'result valuea at index 1 is four')
console.assert(result[3] === 'three', 'result valuea at index 2 is three')
console.assert(result[4] === 'two', 'result valuea at index 3 is two')
console.assert(result[5] === 'one', 'result valuea at index 4 is one')


