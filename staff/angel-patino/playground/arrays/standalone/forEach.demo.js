delete Array.prototype.forEach // para no llamar a la funcion forEach y usar la mia propia

//HECHO
//Esta es mi funcion que equivale al metodo forEach
function forEach(array, callback) { //ejemplo de IIFE - invoccacion de una funcion de forma inminente
    (function loop(i) {
        if ( i < array.length) {
            var element = array[i]

            callback(element, i, array) // element, indice, array

            loop(i + 1)
        }
    })(0)
}
//*******/


console.info('CASE print chars to uppercase in console')

var chars = ['a','b','c']
forEach(chars, function(element) { console.log(element.toUpperCase())})


console.info('\nCASE create objects with each iteration arguments\n')

var cars = ['lambo','bugatti','ferrari']

var data = []

forEach(cars,function(car, index, cars) {
    var o = { car: car, index: index, cars: cars }

    data[data.length] = o // hacer el push sin push. Cada iteración incrementa su length.
})

console.debug(data)
console.table(data)

/*
CASE create objects with each iteration arguments
[
  { car: 'lambo', index: 0, cars: [ 'lambo', 'bugatti', 'ferrari' ] },
  { car: 'bugatti', index: 1, cars: [ 'lambo', 'bugatti', 'ferrari' ] },
  { car: 'ferrari', index: 2, cars: [ 'lambo', 'bugatti', 'ferrari' ] }
]
┌─────────┬───────────┬───────┬───────────────────────────────────┐
│ (index) │ car       │ index │ cars                              │
├─────────┼───────────┼───────┼───────────────────────────────────┤
│ 0       │ 'lambo'   │ 0     │ [ 'lambo', 'bugatti', 'ferrari' ] │
│ 1       │ 'bugatti' │ 1     │ [ 'lambo', 'bugatti', 'ferrari' ] │
│ 2       │ 'ferrari' │ 2     │ [ 'lambo', 'bugatti', 'ferrari' ] │
└─────────┴───────────┴───────┴───────────────────────────────────┘
*/