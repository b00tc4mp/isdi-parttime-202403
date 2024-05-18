delete Array.prototype.flat

function flat(array) {

    var newArray = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]
        
        if (Array.isArray(element)) {
            for (var j = 0; j < element.length; j++) {
                var element2 = element[j]
                newArray[newArray.length] = element2
                
            }
        } else {
            newArray[newArray.length] = element
            
        }

    }
    
    return newArray
}

console.info('CASE unify the array')

var arr = [0, 1, 2, [3, 4]];
var result = flat(arr)

console.assert(result instanceof Array, 'result is not Array')
console.assert(result.length === 5, 'numbers length is 5')
console.assert(result[0] === 0, 'result value at index 0 is 0')
console.assert(result[1] === 1, 'result value at index 1 is 1')
console.assert(result[2] === 2, 'result value at index 2 is 2')
console.assert(result[3] === 3, 'result value at index 3 is 3')
console.assert(result[4] === 4, 'result value at index 4 is 4')




console.info('CASE unify the array with several arrays inside')

var arr2 = [0, 1, [2, [3, [4, 5]]]];
var result2 = flat(arr2)

console.assert(result2 instanceof Array, 'result2 is not Array')
console.assert(result2.length === 5, 'numbers length is 5')
console.assert(result2[0] === 0, 'result2 value at index 0 is 0')
console.assert(result2[1] === 1, 'result2 value at index 1 is 1')
console.assert(result2[2] === 2, 'result2 value at index 2 is 2')
console.assert(result2[3] === 3, 'result2 value at index 3 is 3')
console.assert(result2[4] === 4, 'result2 value at index 4 is 4')
console.assert(result2[5] === 5, 'result2 value at index 5 is 5')




console.info('CASE unify the array with several arrays inside with number')

var arr3 = [0, 1, [2, [3, [4, 5]]]];
var result3 = flat(arr3, 2)

console.assert(result3 instanceof Array, 'result3 is not Array')
console.assert(result3.length === 5, 'numbers length is 5')
console.assert(result3[0] === 0, 'result3 value at index 0 is 0')
console.assert(result3[1] === 1, 'result3 value at index 1 is 1')
console.assert(result3[2] === 2, 'result3 value at index 2 is 2')
console.assert(result3[3] === 3, 'result3 value at index 3 is 3')
console.assert(result3[4] === 4, 'result3 value at index 4 is 4')
console.assert(result3[5] === 5, 'result3 value at index 5 is 5')




console.info('CASE unify the array with several arrays inside with infinity')

var arr4 = [0, 1, [2, [3, [4, 5]]]];
var result4 = flat(arr4, Infinity)

console.assert(result4 instanceof Array, 'result4 is not Array')
console.assert(result4.length === 5, 'numbers length is 5')
console.assert(result4[0] === 0, 'result4 value at index 0 is 0')
console.assert(result4[1] === 1, 'result4 value at index 1 is 1')
console.assert(result4[2] === 2, 'result4 value at index 2 is 2')
console.assert(result4[3] === 3, 'result4 value at index 3 is 3')
console.assert(result4[4] === 4, 'result4 value at index 4 is 4')
console.assert(result4[5] === 5, 'result4 value at index 5 is 5')