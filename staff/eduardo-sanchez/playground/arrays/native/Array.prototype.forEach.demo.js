// CASE print chars to uppercase in console

console.info('CASE print chars to uppercase in console')

var chars = ['a', 'b', 'c']

chars.forEach(function (element) { console.log(element.toUpperCase()) })
// A
// B
// C

console.info('CASE create objects with each iteration arguments')

var cars = ['lambo', 'bugatti', 'ferrari']

var data = []

cars.forEach(function (car, index, cars) {
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
]*/

////////////////////////////////////////////////


//Ejemplo Usando Metodo array forEach 

console.info(" -- CASE create objects with each iteration arguments -- ")

var cars = ["Lamgorghini", "Ferrari", "Porche", "Maserati"]

var data = []

cars.forEach(function (car, index, cars) {
    var object = { car: car, index: index, cars: cars }

    // Añadir un objeto al final del array sin utilizar el método .push().
    // Accedemos a la longitud actual del array 'data' utilizando data.length, y asignamos el objeto a la posición correspondiente.
    data[data.length] = object;

})

console.debug(data)
console.table(data)


/*
┌─────────┬───────────────┬───────┬─────────────────────────────────────────────────────────┐
│ (index) │ car           │ index │ cars                                                    │
├─────────┼───────────────┼───────┼─────────────────────────────────────────────────────────┤
│ 0       │ 'Lamgorghini' │ 0     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 1       │ 'Ferrari'     │ 1     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 2       │ 'Porche'      │ 2     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 3       │ 'Maserati'    │ 3     │ [ 'Lamgorghini', 'Ferrari', 'Porche', ... 1 more item ] │
└─────────┴───────────────┴───────┴─────────────────────────────────────────────────────────┘ 
*/