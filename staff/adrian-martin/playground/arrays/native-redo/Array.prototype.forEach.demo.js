delete Array.prototype.forEach

Array.prototype.forEach = function (callback){
  for(var i = 0; i < this.length;i++){
  var element = this[i]

  callback(element, i, this)
  }
}


console.info ('CASE print chars to uppercase in console')

var chars = ['a', 'b', 'c'];

chars.forEach(function (element) { console.log(element.toUpperCase() )});

/*
A
B
C
*/

console.info('CASE create objects with each iteration arguments')

var cars = ['bmw', ' bugatti', 'ferrari']

var data = []

cars.forEach(function(car, index, cars) {
    var o = { car: car, index: index, cars: cars}

    data[data.length] = o
})

console.debug(data)
console.table(data)

/*
CASE print chars to uppercase in console
A
B
C
CASE create objects with each iteration arguments
[
  { car: 'bmw', index: 0, cars: [ 'bmw', ' bugatti', 'ferrari' ] },
  { car: ' bugatti', index: 1, cars: [ 'bmw', ' bugatti', 'ferrari' ] },
  { car: 'ferrari', index: 2, cars: [ 'bmw', ' bugatti', 'ferrari' ] }
]
┌─────────┬────────────┬───────┬──────────────────────────────────┐
│ (index) │ car        │ index │ cars                             │
├─────────┼────────────┼───────┼──────────────────────────────────┤
│ 0       │ 'bmw'      │ 0     │ [ 'bmw', ' bugatti', 'ferrari' ] │
│ 1       │ ' bugatti' │ 1     │ [ 'bmw', ' bugatti', 'ferrari' ] │
│ 2       │ 'ferrari'  │ 2     │ [ 'bmw', ' bugatti', 'ferrari' ] │
└─────────┴────────────┴───────┴──────────────────────────────────┘
*/