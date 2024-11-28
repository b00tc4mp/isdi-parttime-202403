delete Array.prototype.slice

function slice(array, start) {
    var sliced = []

    if (start > 0){
        for ( var i = start; i < array.length; i++) {
            var element = array[i]
            
            sliced[i - start] = array[i]
        }
    }else if (start < 0) {
        var sliced = []

        var fromIndex = array.length + start
        for (var i = fromIndex; i < array.length; i++){
            var element = array[i]

            sliced[i - fromIndex] = element
        }        
    }

    return sliced


}

console.info('CASE extract animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var result = slice(animals, 2)

console.assert(result.length === 3, 'length is 3')
console.assert(result[0] === 'camel', 'animal at 0 is camel')
console.assert(result[1] === 'duck', 'animal at 1 is duck')
console.assert(result[2] === 'elephant', 'animal at 2 is elephant')

console.info('CASE extract 4 animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'cocodrile', 'snake'];

var result = slice(animals, 3)

console.assert(result.length === 4, 'lenth is 4')
console.assert(result[0] === 'duck', 'animal at 0 is duck')
console.assert(result[1] === 'elephant', 'animal at 1 is elephant')
console.assert(result[2] === 'cocodrile', 'animal at 2 is cocodrile')
console.assert(result[3] === 'snake', 'animal at 3 is snake')

console.assert(animals.length === 7, 'animal length is 7')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract last twoanimals')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = slice(animals, -2)

console.assert(result.length === 2, 'lenth is 2')
console.assert(result[0] === 'duck', 'animal at 0 is duck')
console.assert(result[1] === 'elephant', 'animal at 1 is elephant')


console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')