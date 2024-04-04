delete Array.prototype.forEach

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element, i, array)
    }
}

console.info('CASE print chars to uppercase in console')

var chars = ['a', 'b', 'c']

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