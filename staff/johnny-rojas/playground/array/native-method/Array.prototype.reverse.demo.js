var array = ["one", "two", "three"]
console.log("array:", array)
// Expected output: "array:" Array ["one", "two", "three"]

var reversed = array.reverse()
console.log("reversed:", reversed)
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log("array:", array)
// Expected output: "array1:" Array ["three", "two", "one"]
