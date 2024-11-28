console.info('CASE extract 3 animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

var result = animals.slice(2)

console.assert(result.length === 3, 'lenth is 3')
console.assert(result[0] === 'camel', 'animal at 0 is camel')
console.assert(result[1] === 'duck', 'animal at 1 is duck')
console.assert(result[2] === 'elephant', 'animal at 2 is elephant')

console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract 4 animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'cocodrile', 'snake'];

var result = animals.slice(3)

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

var result = animals.slice(-2)

console.assert(result.length === 2, 'lenth is 2')
console.assert(result[0] === 'duck', 'animal at 0 is duck')
console.assert(result[1] === 'elephant', 'animal at 1 is elephant')


console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract animals from index 2 to 4')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(2, 4)

console.assert(result.length === 2, 'lenth is 2')
console.assert(result[0] === 'camel', 'animal at 0 is camel')
console.assert(result[1] === 'duck', 'animal at 1 is duck')


console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract animals from index 1 to 5')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(1, 5)

console.assert(result.length === 4, 'lenth is 4')
console.assert(result[0] === 'bison', 'animal at 0 is bison')
console.assert(result[1] === 'camel', 'animal at 1 is camel')
console.assert(result[2] === 'duck', 'animal at 2 is duck')
console.assert(result[3] === 'elephant', 'animal at 3 is elephant')


console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract animals from index 2 to -1')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(2, -1)

console.assert(result.length === 2, 'lenth is 2')
console.assert(result[0] === 'camel', 'animal at 0 is camel')
console.assert(result[1] === 'duck', 'animal at 1 is duck')



console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract animals from index 0 to -2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(0, -2)

console.assert(result.length === 3, 'lenth is 3')
console.assert(result[0] === 'ant', 'animal at 0 is ant')
console.assert(result[1] === 'bison', 'animal at 1 is bison')
console.assert(result[2] === 'camel', 'animal at 2 is camel')



console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract animals from index -4 to -2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(-4, -2)

console.assert(result.length === 2, 'lenth is 2')
console.assert(result[0] === 'bison', 'animal at 0 is bison')
console.assert(result[1] === 'camel', 'animal at 1 is camel')



console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract animals from index -4 to 3')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(-4, 3)

console.assert(result.length === 2, 'lenth is 2')
console.assert(result[0] === 'bison', 'animal at 0 is bison')
console.assert(result[1] === 'camel', 'animal at 1 is camel')



console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')

console.info('CASE extract animals from index -5 to 4')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(-5, 4)

console.assert(result.length === 4, 'lenth is 4')
console.assert(result[0] === 'ant', 'animal at 0 is ant')
console.assert(result[1] === 'bison', 'animal at 1 is bison')
console.assert(result[2] === 'camel', 'animal at 2 is camel')
console.assert(result[3] === 'duck', 'animal at 3 is duck')



console.assert(animals.length === 5, 'animal length is 5')
console.assert(animals[0] === 'ant', 'animal at 0 is ant')
console.assert(animals[1] === 'bison', 'animal at 1 is bison')
console.assert(animals[2] === 'camel', 'animal at 2 is camel')
console.assert(animals[3] === 'duck', 'animal at 3 is duck')
console.assert(animals[4] === 'elephant', 'animal at 4 is elephant')



