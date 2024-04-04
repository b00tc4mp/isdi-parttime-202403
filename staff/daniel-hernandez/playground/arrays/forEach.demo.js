delete Array.prototype.forEach;

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var index = array[i]

        callback(index, i, array);
    }
}

// CASE print chars to uppercase in console
var chars = ['a', 'b', 'c']

forEach(chars, function (index) { console.log(index.toUpperCase()) })

// CASE create a object for each index with the iteration args
var cars = ['lambo', 'bugatti', 'ferrari']
var newArray = [];

forEach(cars, function(car, index, cars) {
    var obj = { car: car, index: index, cars: cars }

    newArray[newArray.length] = obj;
});

console.debug(newArray);
console.table(newArray);