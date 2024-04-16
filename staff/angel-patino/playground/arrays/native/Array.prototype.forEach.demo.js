console.info('CASE print chars to uppercase in console\n')

var chars = ['a','b','c']

chars.forEach(function (element) { console.log(element.toUpperCase()) })
// A
// B
// C

console.info('\nCASE create objects with each iteration arguments\n')

var cars = ['lambo','bugatti','ferrari']

var data = []

cars.forEach(function(car, index, cars) {
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