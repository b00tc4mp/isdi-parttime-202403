// CASE print chars to uppercase in console

var chars = ['a', 'b', 'c']

chars.forEach(function (element) { console.log(element.toUpperCase()) })
// A
// B
// C

//CASE create a object for each index
var cars = ['lambo', 'bugatti', 'ferrari']

var data = []

cars.forEach(function (car, index, cars) {
    var o = { car: car, index: index, cars: cars }

    data[data.length] = o
})

console.debug(data)
console.table(data)