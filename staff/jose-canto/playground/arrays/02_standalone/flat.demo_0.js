delete Array.prototype.flat

// Recrear el metodo flat


function flat(array, depth) {
  if (depth === undefined) {
    depth = 1;
  }

  function flatten(arr, currentDepth) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      console.log(element)

      if (Array.isArray(element) && currentDepth > 0) {
        var flattened = flatten(element, currentDepth - 1);
        console.log(flattened)

        for (var j = 0; j < flattened.length; j++) {
          result[result.length] = flattened[j];
          console.log(result)
        }
      } else {
        result[result.length] = element;
        console.log(result)
      }
    }

    console.log(result)
    return result;
  }


  return flatten(array, depth);
}

console.info("--- CASE delete array depth ---")

var numbers = [0, 1, 2, [3, 4]];

var result = flat(numbers);
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

var result = (flat(numbersPack));
// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

var result = (flat(numbersPack, 2));
console.log(result);
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

var result = flat(numbersPack, Infinity);
// expected output: Array [0, 1, 2, 3, 4, 5]

console.assert(result.length === 6, "result length is 5")
console.assert(result instanceof Array, "result is an array")

console.assert(result[0] === 0, "result at 0 is 0")
console.assert(result[1] === 1, "result at 1 is 1")
console.assert(result[2] === 2, "result at 2 is 2")
console.assert(result[3] === 3, "result at 3 is 3")
console.assert(result[4] === 4, "result at 4 is 4")
console.assert(result[5] === 5, "result at 5 is 5")
