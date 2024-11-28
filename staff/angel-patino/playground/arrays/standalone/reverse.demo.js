delete Array.prototype.reverse

function reverse(array) {
    // array -> ['one','two','three']
    /*var left, right
    for( var i = 0; i < array.length / 2; i++){
        left =array[i]
        right = array[array.length -1 - i]
        array[i] = right
        array[array.length -1-i] = left
    }
        */ 
        for(var i = array.length -1, j = 0; i > j; i--, j++) {
        
                   array[j] = array[i]
            

        }
            return array
}




console.info('CASE inverts number order')

var nums = ['one', 'two', 'three']

var resul = reverse(nums)
console.log(resul)

console.assert(resul instanceof Array, 'result is an array')
console.assert(resul.length === 3, 'result length is 3')
console.assert(resul[0] === 'three', 'result value at index 0 is three')
console.assert(resul[1] === 'two', 'result value at index 1 is two')
console.assert(resul[2] === 'one', 'result value at index 2 is one')
console.assert(resul === nums, 'result is nums')

console.info('CASE inverts number 4 order')
var nums = ['one', 'two', 'three', 'four']

var resul = reverse(nums)
console.log(resul)
console.assert(resul instanceof Array, 'result is an array')
console.assert(resul.length === 4, 'result length is 4')
console.assert(resul[0] === 'four', 'result value at index 0 is four')
console.assert(resul[1] === 'three', 'result value at index 1 is three')
console.assert(resul[2] === 'two', 'result value at index 2 is two')
console.assert(resul[3] === 'one', 'result value at index 3 is one')
console.assert(resul === nums, 'result is nums')


console.info('CASE inverts number  order')
var nums = ['one', 'two', 'three', 'four', 'five']

var resul = reverse(nums)
console.log(resul)
console.assert(resul instanceof Array, 'result is an array')
console.assert(resul.length === 5, 'result length is 5')
console.assert(resul[0] === 'five', 'result value at index 0 is five')
console.assert(resul[1] === 'four', 'result value at index 1 is four')
console.assert(resul[2] === 'three', 'result value at index 2 is three')
console.assert(resul[3] === 'two', 'result value at index 3 is two')
console.assert(resul[4] === 'one', 'result value at index 4 is one')
console.assert(resul === nums, 'result is nums')