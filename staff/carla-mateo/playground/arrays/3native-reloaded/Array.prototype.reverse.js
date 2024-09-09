Array.prototype.reverse = function () {
    var left, right

    for (var i = 0, j = this.length - 1; i < j; i++, j--) {
        left = this[i]
        right = this[j]

        this[i] = right
        this[j] = left
    }

    return this
}

console.info('CASE inverts numbers order')

var nums = ['one', 'two', 'three']

var result = nums.reverse()

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'three', 'num at index 0 is three')
console.assert(result[1] === 'two', 'num at index 1 is two')
console.assert(result[2] === 'one', 'num at index 2 is one')
console.assert(result === nums, 'result is num')

console.info('CASE inverts order of 4 numbers')

var nums = ['one', 'two', 'three', 'four']

var result = nums.reverse()

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'four', 'num at index 0 is four')
console.assert(result[1] === 'three', 'num at index 1 is three')
console.assert(result[2] === 'two', 'num at index 2 is two')
console.assert(result[3] === 'one', 'num at index 3 is one')
console.assert(result === nums, 'result is num')

console.info('CASE inverts order of 5 numbers')

var nums = ['one', 'two', 'three', 'four', 'five']

var result = nums.reverse()

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 5, 'result length is 5')
console.assert(result[0] === 'five', 'num at index 0 is five')
console.assert(result[1] === 'four', 'num at index 1 is four')
console.assert(result[2] === 'three', 'num at index 2 is three')
console.assert(result[3] === 'two', 'num at index 3 is two')
console.assert(result[4] === 'one', 'num at index 4 is one')
console.assert(result === nums, 'result is num')

console.info('CASE inverts order of 6 numbers')

var nums = ['one', 'two', 'three', 'four', 'five', 'six']

var result = nums.reverse()

console.assert(result instanceof Array, 'result is an array')
console.assert(result.length === 6, 'result length is 6')
console.assert(result[0] === 'six', 'num at index 0 is six')
console.assert(result[1] === 'five', 'num at index 1 is five')
console.assert(result[2] === 'four', 'num at index 2 is four')
console.assert(result[3] === 'three', 'num at index 3 is three')
console.assert(result[4] === 'two', 'num at index 4 is two')
console.assert(result[5] === 'one', 'num at index 5 is one')
console.assert(result === nums, 'result is num')