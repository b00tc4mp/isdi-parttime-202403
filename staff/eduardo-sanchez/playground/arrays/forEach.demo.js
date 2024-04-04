
// function forEach(array, callback) {
//     (function loop(i) { // IIFE & closure
//         if (i < array.length) {
//             var element = array[i]

//             callback(element)

//             loop(i + 1)
//         }
//     })(0)
// }

delete Array.prototype.forEach

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element)
        callback(element, i, array)
    }
}

// CASE print chars to uppercase in console
console.info('CASE print chars to uppercase in console')

var chars = ['a', 'b', 'c']

forEach(chars, function (element) { console.log(element.toUpperCase()) })
forEach(chars, function (element) { console.log(element.toUpperCase()) })

console.info('CASE create objects with each iteration arguments')

var cars = ['lambo', 'bugatti', 'ferrari']

var data = []

forEach(cars, function (car, index, cars) {
    var o = { car: car, index: index, cars: cars }

    data[data.length] = o
})

console.debug(data)
console.table(data)
/*
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



/////////////////////////////////////////////

delete Array.prototype.forEach // Elminamos el metodo forEach para evitar usar el metodo.

// Recrear metodo forEach


var cars = ["Lamgorghini", "Ferrari", "Porche", "Maserati"]
var data = []

function forEach(array, callback) {

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        callback(element, i, cars)
    }
}

forEach(cars, function (car, index, cars) {
    var object = { car: car, index: index, cars: cars }

    data[data.length] = object
})

console.debug(data)
console.table(data)


/*
[
  {car: 'Lamgorghini', index: 0, cars: [ 'Lamgorghini', 'Ferrari', 'Porche', 'Maserati' ]},
  {car: 'Ferrari', index: 1, cars: [ 'Lamgorghini', 'Ferrari', 'Porche', 'Maserati' ]},
  {car: 'Porche', index: 2, cars: [ 'Lamgorghini', 'Ferrari', 'Porche', 'Maserati' ]},
  {car: 'Maserati', index: 3, cars: [ 'Lamgorghini', 'Ferrari', 'Porche', 'Maserati' ]}
]
┌─────────┬───────────────┬───────┬─────────────────────────────────────────────────────────┐
│ (index) │ car           │ index │ cars                                                    │
├─────────┼───────────────┼───────┼─────────────────────────────────────────────────────────┤
│ 0       │ 'Lamgorghini' │ 0     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 1       │ 'Ferrari'     │ 1     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 2       │ 'Porche'      │ 2     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 3       │ 'Maserati'    │ 3     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
└─────────┴───────────────┴───────┴─────────────────────────────────────────────────────────┘ 
*/

