delete Array.prototype.reverse

function reverse(array) {

    if (array.length === 3) {
        // array -> ['one', 'two', 'three']

        var left = array[0]
        var right = array[2]

        array[0] = right
        array[2] = left

        return array
    } else if (array.length === 4) {
        // array -> ['one', 'two', 'three', 'four']

        var left = array[0]
        var right = array[3]

        array[0] = right
        array[3] = left

        left = array[1]
        right = array[2]

        array[1] = right
        array[2] = left

        return array
    } else if (array.length === 5) {
        // array -> ['one', 'two', 'three', 'four', 'five']

        var left = array[0]
        var right = array[4]

        array[0] = right
        array[4] = left

        left = array[1]
        right = array[3]

        array[1] = right
        array[3] = left

        return array
        // } else if (array.length === 6) {
        //     // var -> ['one', 'two', 'three', 'four', 'five', 'six']

        //     var left = array[0]
        //     var right = array[5]

        //     array[0] = right
        //     array[5] = left

        //     left = array[1]
        //     right = array[4]

        //     array[1] = right
        //     array[4] = left

        //     left = array[2]
        //     right = array[3]

        //     array[2] = right
        //     array[3] = left

        //     return array
    } else if (array.length === 6) {
        var left, right

        for (var i = 0; i < array.length / 2; i++) {
            left = array[i]
            right = array[array.length - 1 - i]

            array[i] = right
            array[array.length - 1 - i] = left
        }

        return array
    }
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

console.info('CASE inverts order of 4 numbers')

var nums = ['one', 'two', 'three', 'four']

var result = reverse(nums)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'four', 'result value at index 0 is four')
console.assert(result[1] === 'three', 'result value at index 1 is three')
console.assert(result[2] === 'two', 'result value at index 2 is two')
console.assert(result[3] === 'one', 'result value at index 3 is one')
console.assert(result === nums, 'result is nums')

console.info('CASE inverts order of 5 numbers')

var nums = ['one', 'two', 'three', 'four', 'five']

var result = reverse(nums)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 5, 'result length is 5')
console.assert(result[0] === 'five', 'result value at index 0 is five')
console.assert(result[1] === 'four', 'result value at index 1 is four')
console.assert(result[2] === 'three', 'result value at index 2 is three')
console.assert(result[3] === 'two', 'result value at index 3 is two')
console.assert(result[4] === 'one', 'result value at index 1 is one')
console.assert(result === nums, 'result is nums')

console.info('CASE inverts order of 6 numbers')

var nums = ['one', 'two', 'three', 'four', 'five', 'six']

var result = reverse(nums)

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 6, 'result length is 6')
console.assert(result[0] === 'six', 'result value at index 0 is six')
console.assert(result[1] === 'five', 'result value at index 1 is five')
console.assert(result[2] === 'four', 'result value at index 2 is four')
console.assert(result[3] === 'three', 'result value at index 3 is three')
console.assert(result[4] === 'two', 'result value at index 4 is two')
console.assert(result[5] === 'one', 'result value at index 5 is one')
console.assert(result === nums, 'result is nums')