delete Array.prototype.forEach // Elminamos el metodo forEach para evitar usar el metodo.

// Recrear metodo forEach

var cars = ["Lamborghini", "Ferrari", "Porche", "Maserati"]
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
  {car: 'Lamborghini', index: 0, cars: [ 'Lamborghini', 'Ferrari', 'Porche', 'Maserati' ]},
  {car: 'Ferrari', index: 1, cars: [ 'Lamborghini', 'Ferrari', 'Porche', 'Maserati' ]},
  {car: 'Porche', index: 2, cars: [ 'Lamborghini', 'Ferrari', 'Porche', 'Maserati' ]},
  {car: 'Maserati', index: 3, cars: [ 'Lamborghini', 'Ferrari', 'Porche', 'Maserati' ]}
]

┌─────────┬───────────────┬───────┬─────────────────────────────────────────────────────────┐
│ (index) │ car           │ index │ cars                                                    │
├─────────┼───────────────┼───────┼─────────────────────────────────────────────────────────┤
│ 0       │ 'Lamborghini' │ 0     │ [ 'Lamborghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 1       │ 'Ferrari'     │ 1     │ [ 'Lamborghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 2       │ 'Porche'      │ 2     │ [ 'Lamborghini', 'Ferrari', 'Porche', ... 1 more item ] │
│ 3       │ 'Maserati'    │ 3     │ [ 'Lamborghini', 'Ferrari', 'Porche', ... 1 more item ] │
└─────────┴───────────────┴───────┴─────────────────────────────────────────────────────────┘
*/

//! TEST ASSERT data[0]

console.assert(data[0].car === "Lamborghini", "Car at index 0 is Lamborghini")
console.assert(data[0].index === 0, "Index of car is 0")
console.assert(data[0].cars.length === 4, "Number of elements at cars(array) is 4")
console.assert(data[0].cars[0] === "Lamborghini", "First element at array(cars) is Lamborghini")
console.assert(data[0].cars[1] === "Ferrari", "Second element at array(cars) is Ferrari")
console.assert(data[0].cars[2] === "Porche", "Third element at array(cars) is Porche")
console.assert(data[0].cars[3] === "Maserati", "Third element at array(cars) is Maserati")
console.assert(data.length === 4, "data length is 4")

