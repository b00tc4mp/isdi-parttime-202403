
console.info("--- CASE delete array depth ---")

var numbers = [0, 1, 2, [3, 4]];

var result = numbers.flat();
// expected output: Array [0, 1, 2, 3, 4]

console.assert(result.length === 5, "result length is 5")
console.assert(result instanceof Array, "result is an array")

console.assert(result[0] === 0, "result at 0 is 0")
console.assert(result[1] === 1, "result at 1 is 1")
console.assert(result[2] === 2, "result at 2 is 2")
console.assert(result[3] === 3, "result at 3 is 3")
console.assert(result[4] === 4, "result at 4 is 4")


//? -----------------------------------------------------------------------------

var numbersPack = [0, 1, [2, [3, [4, 5]]]];

var result = (numbersPack.flat());
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

var result = (numbersPack.flat(2));
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

var result = (numbersPack.flat(Infinity));
// expected output: Array [0, 1, 2, 3, 4, 5]

console.assert(result.length === 6, "result length is 5")
console.assert(result instanceof Array, "result is an array")

console.assert(result[0] === 0, "result at 0 is 0")
console.assert(result[1] === 1, "result at 1 is 1")
console.assert(result[2] === 2, "result at 2 is 2")
console.assert(result[3] === 3, "result at 3 is 3")
console.assert(result[4] === 4, "result at 4 is 4")
console.assert(result[5] === 5, "result at 5 is 5")

