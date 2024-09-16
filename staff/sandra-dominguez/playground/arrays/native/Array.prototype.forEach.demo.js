console.info('CASO imprimir chars')


var chars = ['a', 'b', 'c']

//chars.forEach(function (element) {console.log(element)})

console.assert(chars.length === 3, 'chars length is 3')
console.assert(chars[0] === 'a', 'chars 0 is a')
console.assert(chars[1] === 'b', 'chars 1 is b')
console.assert(chars[2] === 'c', 'chars 2 is c')

console.info('CASO imprimir caracteres con upperCase en la consola')

var chars = ['a', 'b', 'c']

               //var charToUpperCase = function(element) {console.log(element.toUpperCase())}  //se puede hacer de varias maneras
function charToUpperCase(element) {console.log(element.toUpperCase())}


console.info('CASO crear un objeto con cada argumento de iteración')

var cars = ['lambo', 'bugatti', 'ferrari']
var data = []

   cars.forEach(function(car, index, cars) {
      var o = {car: car, index: index, cars:cars}

      data[data.length] = o  //como hacer un push sin hacer un push
})