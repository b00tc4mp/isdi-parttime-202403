delete Array.prototype.forEach

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element, i, array)
    }
}

console.info('CASE print chars to uppercase in console')

var characters = ['a', 'b', 'c'];

forEach(characters, function (element) {
    console.log(element.toUpperCase())
})


// Expected output: "a"
// Expected output: "b"
// Expected output: "c"


console.assert(characters.length === 3, 'length of characters is 3')
console.assert(characters[0] === 'a', 'characters in index 0 is a ')
console.assert(characters[1] === 'b', 'characters in index 1 is b ')
console.assert(characters[2] === 'c', 'characters in index 2 is c ')


console.info('CASE create objects with each iteration')

const persons = ["Ramon", "Julia", "Manu"];
const copyNames = [];


forEach(persons, function (name, index, persons) {

    var nameElement = { name: name, index: index, persons: persons }

    copyNames[copyNames.length] = nameElement


})

console.log(copyNames)
console.table(copyNames)

console.assert(persons.length === 3, 'length of persons is 3')
console.assert(persons[0] === 'Ramon', 'persons in index 0 is Ramon ')
console.assert(persons[1] === 'Julia', 'persons in index 1 is Julia ')
console.assert(persons[2] === 'Manu', 'persons in index 2 is Manu ')