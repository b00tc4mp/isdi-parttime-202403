delete Array.prototype.slice

function slice(array, start) {
    var sliced = []

    for (var i = start; i < array.length; i++) {
        var element = array[i]

        sliced[i - start] = element
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