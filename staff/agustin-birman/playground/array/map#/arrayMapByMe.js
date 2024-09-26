debugger

function map (array, callback) {

    var newMapArray = []

    for (var i=0; i < array.length; i++) {

        var element = array[i]

        var elementMapped = callback (element)

        newMapArray[i] = elementMapped
    }
    return(newMapArray)
}

var num = [1, 2, 3, 4, 5]
var numBy3 = map(num, function(item) {return item*3})

console.log(numBy3)
