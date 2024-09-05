delete Array.prototype.slice

function slice(array, start) {
    // array -> ['ant', 'bison', 'camel', 'duck', 'elephant']
    // start -> 2

    var sliced = []

    sliced[0] = array[2]
    sliced[1] = array[3]
    sliced[2] = array[4]

    return sliced
}

console.info('CASE extract animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, 2)
// console.log(result)
// Expected output: Array ["camel", "duck", "elephant"]

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
