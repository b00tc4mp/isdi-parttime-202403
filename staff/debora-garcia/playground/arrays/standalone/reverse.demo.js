
// node staff/debora-garcia/playground/arrays/standalone/reverse.demo.js
delete Array.prototype.reverse
function reverse(array) {
    var left

    for (var i = 0, j = array.length - 1; i < j; i++, j--) {
        left = array[i] 

        array[i] = array[j] 
        array[j] = left 
    }

    return array
}

/* 

for (var i = 0, j = array.length - 1; i < j; i++, j--) {

    i=0, j=2 
    i=1, j=1 i=j => fin del bucle

    left = array[i]     // left=one                => ["one", "two", "three"]
    array[i] = array[j] // array[0]=array[2]=three => ["three", "two", "three"]
    array[j] = left     // array[2]=one            => ["three", "two", "one"]
} 
*/
console.info("**CASE inverts order of 3 numbers**")

var nums = ["one", "two", "three"]

var result = reverse(nums)
// Expected output: Array ["three", "two", "one"]
console.log(result)

console.info("**CASE inverts order of 5 numbers**")

var nums = ["one", "two", "three", "four", "five"]

var result = reverse(nums)
// Expected output: Array ["five","four","three", "two", "one"]
console.log(result)

console.assert(result instanceof Array, "result is an array")
console.assert(result.length === 5, "result length is 5")
console.assert(result[0] === "five", "result value at index 0 is five")
console.assert(result[1] === "four", "result value at index 1 is four")
console.assert(result[2] === "three", "result value at index 2 is three")
console.assert(result[3] === "two", "result value at index 3 is two")
console.assert(result[4] === "one", "result value at index 1 is one")
console.assert(result === nums, "result is nums")