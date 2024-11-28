delete Array.prototype.slice

function slice(array, start, end) {
    var sliced = []

    if (end === undefined) {
        if (start > 0) {
            var from = start
            var to = array.length
        } else if (start < 0) {
            var from = array.length + start
            var to = array.length
        }
    } else {
        if (start >= 0) {
            if (end > 0) {
                var from = start
                var to = end
            } else if (end < 0) {
                var from = start
                var to = array.length + end
            }
        } else {
            if (end < 0) {
                var from = array.length + start
                var to = array.length + end
            } else if (end > 0) {
                var from = array.length + start
                var to = end
            }
        }
    }

    for (var i = from; i < to; i++) {
        var element = array[i]

        sliced[sliced.length] = element
    }

    return sliced
}

console.info('CASE extract 3 animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, 2)

console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'camel', 'result animal at 0 is camel')
console.assert(result[1] === 'duck', 'result animal at 1 is duck')
console.assert(result[2] === 'elephant', 'result animal at 2 is elephant')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract 4 animals from index 3')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'cocodrile', 'snake']

var result = slice(animals, 3)

console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'duck', 'result animal at 0 is duck')
console.assert(result[1] === 'elephant', 'result animal at 1 is elephant')
console.assert(result[2] === 'cocodrile', 'result animal at 2 is cocodrile')
console.assert(result[3] === 'snake', 'result animal at 3 is snake')

console.assert(animals.length === 7, 'animals length is 7')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')
console.assert(animals[5] === 'cocodrile', 'animals at 4 is cocodrile')
console.assert(animals[6] === 'snake', 'animals at 4 is snake')

console.info('CASE extract last 2 animals')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, -2)
// Expected output: Array ["duck", "elephant"]

console.assert(result.length === 2, 'result length is 2')
console.assert(result[0] === 'duck', 'result animal at 0 is duck')
console.assert(result[1] === 'elephant', 'result animal at 1 is elephant')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract last 4 animals')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'bear']

var result = slice(animals, -4)

console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'camel', 'result animal at 0 is camel')
console.assert(result[1] === 'duck', 'result animal at 1 is duck')
console.assert(result[2] === 'elephant', 'result animal at 2 is elephant')
console.assert(result[3] === 'bear', 'result animal at 3 is bear')

console.assert(animals.length === 6, 'animals length is 6')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')
console.assert(animals[5] === 'bear', 'animals at 5 is bear')

console.info('CASE extract animals from index 2 to 4')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, 2, 4)

console.assert(result.length === 2, 'result length is 2')
console.assert(result[0] === 'camel', 'result animal at 0 is camel')
console.assert(result[1] === 'duck', 'result animal at 1 is duck')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract animals from index 1 to 5')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, 1, 5)

console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'bison', 'result animal at 0 is bison')
console.assert(result[1] === 'camel', 'result animal at 1 is camel')
console.assert(result[2] === 'duck', 'result animal at 2 is duck')
console.assert(result[3] === 'elephant', 'result animal at 3 is elephant')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract from index 2 to -1')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, 2, -1)

console.assert(result.length === 2, 'result length is 2')
console.assert(result[0] === 'camel', 'result animal at 0 is camel')
console.assert(result[1] === 'duck', 'result animal at 1 is duck')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract from index 0 to -2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, 0, -2)

console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'ant', 'result animal at 0 is ant')
console.assert(result[1] === 'bison', 'result animal at 1 is bison')
console.assert(result[2] === 'camel', 'result animal at 2 is camel')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract from index -4 to -2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, -4, -2)

console.assert(result.length === 2, 'result length is 2')
console.assert(result[0] === 'bison', 'result animal at 0 is bison')
console.assert(result[1] === 'camel', 'result animal at 1 is camel')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract from index -3 to -2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, -3, -2)

console.assert(result.length === 1, 'result length is 1')
console.assert(result[0] === 'camel', 'result animal at 0 is camel')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract from index -4 to 3')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, -4, 3)

console.assert(result.length === 2, 'result length is 2')
console.assert(result[0] === 'bison', 'result animal at 0 is bison')
console.assert(result[1] === 'camel', 'result animal at 1 is camel')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract from index -5 to 4')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, -5, 4)

console.assert(result.length === 4, 'result length is 4')
console.assert(result[0] === 'ant', 'result animal at 0 is ant')
console.assert(result[1] === 'bison', 'result animal at 1 is bison')
console.assert(result[2] === 'camel', 'result animal at 2 is camel')
console.assert(result[3] === 'duck', 'result animal at 3 is duck')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')
