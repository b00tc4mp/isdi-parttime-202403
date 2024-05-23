delete Array.prototype.forEach

function forEach(array, callback){
    for(var i = 0; i < array.length;i++){
    var element = array[i]

    callback(element, i, array)
    }
}

console.info('CASE print chars to uppercase in console')

var chars = ['a', 'b', 'c'];

forEach(chars, function (element) { console.log(element.toUpperCase())});

console.info('CASE create objects with each iteration arguments')

var cars = ['bmw', ' bugatti', 'ferrari']

var data = []

forEach(cars, function(car, index, cars) {
    var o = { car: car, index: index, cars: cars}

    data[data.length] = o
})

console.debug(data)
console.table(data)