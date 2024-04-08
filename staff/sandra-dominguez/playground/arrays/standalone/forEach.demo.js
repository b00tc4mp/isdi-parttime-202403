 // CASO con un if

function forEach(array, callback) {
    (function loop(i) {
      if (i < array.length) {
      var element = array[i]
  
      callback(element)
      loop(i + 1)
    }
  }) (0)
    
  } 

  var chars = ['a', 'b', 'c'];

  forEach(chars, function (element) {console.log(element)})


//CASO con un for

  function forEach(array, callback) {
    for(var i = 0; i < array.length; i++) {
      var element = array[i]
      callback(element)
    }
  }

  var chars = ['a', 'b', 'c'];

forEach(chars, function (element) {console.log(element)})


//CASO crear un objeto con cada argumento de iteración

function forEach(array, callback) {
  for(var i = 0; i < array.length; i++) {
    var element = array[i]
    callback(element, i, array)
  }
}

var cars = ['lambo', 'bugatti', 'ferrari']
var data = []

   forEach(cars, function(car, index, cars) {
      var o = {car: car, index: index, cars:cars}

      data[data.length] = o  //como hacer un push sin hacer un push
})
    
   console.log(data)
   console.table(data)