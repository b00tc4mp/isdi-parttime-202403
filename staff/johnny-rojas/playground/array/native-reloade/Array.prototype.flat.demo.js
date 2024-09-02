delete Array.prototype.flat

function flat(array, depth) {
    if (depth === undefined) {
        depth = 1
    }

    function flatten(arrayInside, level) {

        var newArray = []

        for (var i = 0; i < arrayInside.length; i++) {
            var element = arrayInside[i]
            console.log(element)

            if (Array.isArray(element) && level > 0) {
                var flattenito = flatten(element, level -1)
                console.log(flattenito)
                for (var j = 0; j < flattenito.length; j++) {
                    var element2 = flattenito[j]
                    newArray[newArray.length] = element2
                    console.log(element2)
                }
            } else {
                newArray[newArray.length] = element
                console.log(newArray)
            }
        }
        return newArray
    }
    return flatten(array, depth)
}

//------------------------------------------------------------------------

console.info('Case 1 Flat')

var numbers = [0, 1, 2, [3, 4]]

var result = flat(numbers)

console.log(result)

// expected output: Array [0, 1, 2, 3, 4]

console.assert(result[0] === 0, 'result value at index 0 is 0')
console.assert(result[1] === 1, 'result value at index 1 is 1')
console.assert(result[2] === 2, 'result value at index 2 is 2')
console.assert(result[3] === 3, 'result value at index 3 is 3')
console.assert(result[4] === 4, 'result value at index 4 is 4')
console.assert(result.length === 5, 'length is 5')
console.assert(result instanceof Array, 'result is an array')

 //------------------------------------------------------------------------

console.info('Case 2 Flat')

var numbers2 = [0, 1, [2, [3, [4, 5]]]]

var result2 = flat(numbers2)

console.debug(flat(numbers2))
//expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

console.debug(flat(numbers2, 2))
// expected output: Array [0, 1, 2, 3, Array [4, 5]]

console.debug(flat(numbers2, Infinity))
// expected output: Array [0, 1, 2, 3, 4, 5]

console.assert(result2[0] === 0, 'result value at index 0 is 0')
console.assert(result2[1] === 1, 'result value at index 1 is 1')
console.assert(result2[2] === 2, 'result value at index 2 is 2')
console.assert(result2[3] === 3, 'result value at index 3 is 3')
console.assert(result2[4] === 4, 'result value at index 4 is 4')
console.assert(result2[5] === 5, 'result value at index 5 is 5')
console.assert(result2.length === 5, 'length is 5')
console.assert(result2 instanceof Array, 'result is an array')