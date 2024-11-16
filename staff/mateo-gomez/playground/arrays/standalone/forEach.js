function forEach(array, callback)  {
    (function loop(i) {
        if (i <array.length) {
            var element = array[i]

            callback(element)

            loop(i + 1)
        }
    }) (0)
}


var chars = ['a', 'b', 'c'];

forEach(chars, function(element) {console.log(element)});



var cars = ["lambo", "bugatti", "ferrari"]

var data = []

cars.forEach(function(car, index, cars) {
var o = {car: car, index, cars: cars}

    data[data.length] = o
})

console.log(data)
console.table(data)

