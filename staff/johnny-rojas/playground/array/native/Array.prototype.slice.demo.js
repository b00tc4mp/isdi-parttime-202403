console.info('CASE extract animals from index 2')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var result = animals.slice(2)
console.debug(animals.slice(2))
// Expected output: Array ['camel', 'duck', 'elephant']

console.assert(result.length === 3, 'length is 3')
console.assert(result[0] === 'camel', 'length is camel')
console.assert(result[1] === 'duck', 'length is duck')
console.assert(result[2] === 'elephant', 'length is elephant')

console.assert(animals.length === 5, 'result length is 3')
console.assert(animals[0] === 'ant', 'animals at 0 is ant')
console.assert(animals[1] === 'bison', 'animals at 1 is bison')
console.assert(animals[2] === 'camel', 'animals at 2 is camel')
console.assert(animals[3] === 'duck', 'animals at 3 is duck')
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant')


//-----------------------------------------------------------------------

console.log(animals.slice(2, 4))
// Expected output: Array ['camel', 'duck']


//-----------------------------------------------------------------------


console.log(animals.slice(1, 5))
// Expected output: Array ['bison', 'camel', 'duck', 'elephant']



//-----------------------------------------------------------------------
console.info('CASE extract last tow animals')
console.log(animals.slice(-2))
// Expected output: Array ['duck', 'elephant']

console.assert(result.length === 2, 'length is 2');
console.assert(result[0] === 'duck', 'length is duck');
console.assert(result[1] === 'elephant', 'length is elephant');

console.assert(animals.length === 5, 'result length is 3');
console.assert(animals[0] === 'ant', 'animals at 0 is ant');
console.assert(animals[1] === 'bison', 'animals at 1 is bison');
console.assert(animals[2] === 'camel', 'animals at 2 is camel');
console.assert(animals[3] === 'duck', 'animals at 3 is duck');
console.assert(animals[4] === 'elephant', 'animals at 4 is elephant');


//-----------------------------------------------------------------------

console.log(animals.slice(2, -1))
// Expected output: Array ['camel', 'duck']



//-----------------------------------------------------------------------


console.log(animals.slice())
// Expected output: Array ['ant', 'bison', 'camel', 'duck', 'elephant']



//-----------------------------------------------------------------------
