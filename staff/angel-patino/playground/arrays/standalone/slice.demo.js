delete Array.prototype.slice

function slice(array, start, end) {
    var sliced = [], from, to

    from = start === undefined ? 0 : (start < 0 ? array.length + start : start)   
    to = end === undefined ? array.length : (end < 0 ?  array.length + end : end)

        for( var i = from; i < to; i++) {
            var element   = array[i]
            sliced[sliced.length] = element
        }

        return sliced
 }
    
console.info('CASE extract animals from index 2')
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var result = slice(animals, 2)
//console.log(result)
// Expected output: Array ["camel", "duck", "elephant"]

console.assert(result.length === 3, 'lenght is 3')
console.assert(result[0] === 'camel', 'resutl animal at 0 is camel')
console.assert(result[1] === 'duck', 'resutl animal at 1 is duck')
console.assert(result[2] === 'elephant', 'resutl animal at 2 is elephant')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')



console.log(slice(animals, -2))
// Expected output: Array ["duck", "elephant"]


console.info('CASE extract animals from index 2 to 4')
console.log(slice(animals, 2, 4));
// Expected output: Array ["camel", "duck"]


console.assert(result.length === 2, 'lenght is 2')
console.assert(result[0] === 'camel', 'resutl animal at 0 is camel')
console.assert(result[1] === 'duck', 'resutl animal at 1 is duck')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract animals from index 1 to 5')
console.log(slice(animals, 1, 5));

console.assert(result.length === 4, 'lenght is 4')
console.assert(result[0] === 'bisonl', 'resutl animal at 0 is camel')
console.assert(result[1] === 'camel', 'resutl animal at 1 is duck')
console.assert(result[2] === 'duck', 'resutl animal at 2 is duck')
console.assert(result[3] === 'elephant', 'resutl animal at 3 is elephant')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')

console.info('CASE extract from index 2 to -1')
console.log(slice(animals, 2, -1));
// Expected output: Array ["camel", "duck"]

console.assert(result.length === 2, 'lenght is 2')
console.assert(result[0] === 'camel', 'resutl animal at 0 is camel')
console.assert(result[1] === 'duck', 'resutl animal at 1 is duck')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')



console.info('CASE extract from index -4 to -2')
console.log(slice(animals, -4, -2));
console.assert(result.length === 2, 'lenght is 2')
console.assert(result[0] === 'bison', 'resutl animal at 0 is bison')
console.assert(result[1] === 'camel', 'resutl animal at 1 is camel')

console.assert(animals.length === 5, 'animals length is 5')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
console.info('CASE extract from index -3 to -2')
console.log(slice(animals, -3, -2));
console.assert(result.length === 1, 'lenght is 1')
console.assert(result[0] === 'camel', 'resutl animal at 1 is camel')

console.assert(result !== animals, 'result is not the same instances as animals (different references)')