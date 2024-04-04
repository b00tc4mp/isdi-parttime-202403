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