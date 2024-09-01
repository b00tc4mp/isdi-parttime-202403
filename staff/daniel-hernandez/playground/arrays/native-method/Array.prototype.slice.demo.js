//tests
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

//case
var result = animals.slice(2);
console.log(result);
// Expected output: [ 'camel', 'duck', 'elephant' ]
// assert result
console.assert(result.length === 3, 'result length is incorrect');
console.assert(result[0] === 'camel', 'element at index 0 is incorrect');
console.assert(result[1] === 'duck', 'element at index 1 is incorrect');
console.assert(result[2] === 'elephant', 'element at index 2 is incorrect');
// assert animals
console.assert(animals.length === 5, 'animals length is incorrect');
console.assert(animals[0] === 'ant', 'element at index 0 is incorrect');
console.assert(animals[1] === 'bison', 'element at index 1 is incorrect');
console.assert(animals[2] === 'camel', 'element at index 2 is incorrect');
console.assert(animals[3] === 'duck', 'element at index 3 is incorrect');
console.assert(animals[4] === 'elephant', 'element at index 4 is incorrect');

//another case V
var result2 = animals.slice(2, 4);
console.log(result2);
// Expected output: [ 'camel', 'duck' ]
// assert result2
console.assert(result2.length === 2, 'result2 length is incorrect');
console.assert(result2[0] === 'camel', 'element at index 0 is incorrect');
console.assert(result2[1] === 'duck', 'element at index 1 is incorrect');
// assert animals
console.assert(animals.length === 5, 'animals length is incorrect');
console.assert(animals[0] === 'ant', 'element at index 0 is incorrect');
console.assert(animals[1] === 'bison', 'element at index 1 is incorrect');
console.assert(animals[2] === 'camel', 'element at index 2 is incorrect');
console.assert(animals[3] === 'duck', 'element at index 3 is incorrect');
console.assert(animals[4] === 'elephant', 'element at index 4 is incorrect');

//another case V
var result3 = animals.slice(1, 5);
console.log(result3);
// Expected output: [ 'bison', 'camel', 'duck', 'elephant' ]
// assert result3
console.assert(result3.length === 4, 'result3 length is incorrect');
console.assert(result3[0] === 'bison', 'element at index 0 is incorrect');
console.assert(result3[1] === 'camel', 'element at index 1 is incorrect');
console.assert(result3[2] === 'duck', 'element at index 2 is incorrect');
console.assert(result3[3] === 'elephant', 'element at index 3 is incorrect');
// assert animals
console.assert(animals.length === 5, 'animals length is incorrect');
console.assert(animals[0] === 'ant', 'element at index 0 is incorrect');
console.assert(animals[1] === 'bison', 'element at index 1 is incorrect');
console.assert(animals[2] === 'camel', 'element at index 2 is incorrect');
console.assert(animals[3] === 'duck', 'element at index 3 is incorrect');
console.assert(animals[4] === 'elephant', 'element at index 4 is incorrect');

var result4 = animals.slice(-2)
console.log(result4);
// Expected output: [ 'duck', 'elephant' ]
// assert result4
console.assert(result4.length === 2, 'result4 length is incorrect');
console.assert(result4[0] === 'duck', 'element at index 0 is incorrect');
console.assert(result4[1] === 'elephant', 'element at index 1 is incorrect');
// assert animals
console.assert(animals.length === 5, 'animals length is incorrect');
console.assert(animals[0] === 'ant', 'element at index 0 is incorrect');
console.assert(animals[1] === 'bison', 'element at index 1 is incorrect');
console.assert(animals[2] === 'camel', 'element at index 2 is incorrect');
console.assert(animals[3] === 'duck', 'element at index 3 is incorrect');
console.assert(animals[4] === 'elephant', 'element at index 4 is incorrect');

var result5 = animals.slice(2, -1)
console.log(result5);
// Expected output: [ 'camel', 'duck' ]
// assert result5
console.assert(result5.length === 2, 'result5 length is incorrect');
console.assert(result5[0] === 'camel', 'element at index 0 is incorrect');
console.assert(result5[1] === 'duck', 'element at index 1 is incorrect');
// assert animals
console.assert(animals.length === 5, 'animals length is incorrect');
console.assert(animals[0] === 'ant', 'element at index 0 is incorrect');
console.assert(animals[1] === 'bison', 'element at index 1 is incorrect');
console.assert(animals[2] === 'camel', 'element at index 2 is incorrect');
console.assert(animals[3] === 'duck', 'element at index 3 is incorrect');
console.assert(animals[4] === 'elephant', 'element at index 4 is incorrect');

var result6 = animals.slice()
console.log(result6);
// Expected output: [ 'ant', 'bison', 'camel', 'duck', 'elephant' ]
// assert result6
console.assert(result6.length === 5, 'result6 length is incorrect');
console.assert(result6[0] === 'ant', 'element at index 0 is incorrect');
console.assert(result6[1] === 'bison', 'element at index 1 is incorrect');
console.assert(result6[2] === 'camel', 'element at index 2 is incorrect');
console.assert(result6[3] === 'duck', 'element at index 3 is incorrect');
console.assert(result6[4] === 'elephant', 'element at index 4 is incorrect');
// assert animals
console.assert(animals.length === 5, 'animals length is incorrect');
console.assert(animals[0] === 'ant', 'element at index 0 is incorrect');
console.assert(animals[1] === 'bison', 'element at index 1 is incorrect');
console.assert(animals[2] === 'camel', 'element at index 2 is incorrect');
console.assert(animals[3] === 'duck', 'element at index 3 is incorrect');
console.assert(animals[4] === 'elephant', 'element at index 4 is incorrect');

console.assert(result !== animals, 'result is the same instance than animal');

var result7 = animals.slice(9, 1);
console.log(result7);