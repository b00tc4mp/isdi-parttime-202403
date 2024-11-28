
Array.prototype.forEach = function (callback) {
    for(var i = 0; i < this.length; i++) {
        var element = this[i]

        callback(element, i, this)
    }
}

var chars = ['a', 'b', 'c']  // new Array('a', 'b', 'c')
chars.forEach(function (element) {console.log(element.toUpperCase())})


var chars = ['a', 'b', 'c']
//var charToUpperCase = function(element) {console.log(element.toUpperCase())}  //se puede hacer de varias maneras
function charToUpperCase(element) {console.log(element.toUpperCase())}
chars.forEach(charToUpperCase)



var cars = ['lambo', 'bugatti', 'ferrari']
var data = []
   cars.forEach(function(car, index, cars) {
      var o = {car: car, index: index, cars:cars}

      data[data.length] = o  //como hacer un push sin hacer un push
})
    
   console.log(data)
   console.table(data)