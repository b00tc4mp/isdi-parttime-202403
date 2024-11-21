// node staff/debora-garcia/playground/arrays/native-reloaded/Array.prototype.reverse.demo_r.js
delete Array.prototype.reverse;

Array.prototype.reverse=function () {
    var left

    for (var i = 0, j = this.length - 1; i < j; i++, j--) {
        left = this[i]

        this[i] = this[j]
        this[j] = left
    }

    return this
}

console.info("**CASE inverts order of 3 numbers**")

var nums = ["one", "two", "three"]

var result = nums.reverse()
// Expected output: Array ["three", "two", "one"]
console.log(result)

console.info("**CASE inverts order of 5 numbers**")

var nums = ["one", "two", "three", "four", "five"]

var result = nums.reverse()
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