delete Array.prototype.reverse

function reverse(array) {
    // array -> ['one', 'two', 'three']

    var left = array[0]
    var right = array[2]

    array[0] = right
    array[2] = left

    return array
}

console.info('CASE inverts order of 3 numbers')

var nums = ['one', 'two', 'three']

var result = reverse(nums)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'three', 'result value at index 0 is three')
console.assert(result[1] === 'two', 'result value at index 1 is two')
console.assert(result[2] === 'one', 'result value at index 2 is one')
console.assert(result === nums, 'result is nums')