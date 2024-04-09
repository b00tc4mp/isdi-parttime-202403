delete Array.prototype.map

function map(array, callback) {

    var mapped = []

    for ( var i = 0; i < array.length; i++) {
        var element = array[i]

        var mappedElement = callback(element, i, array)

        mapped[i] = mappedElement
    }

    return mapped

}


console.info('CASE nums by 2')

var nums = [1, 4, 9, 16]

var numsBy2 = map(nums, function (num) { return num * 2})

console.debug(nums)
//[1, 4, 9, 16]

console.debug(numsBy2)
//[2, 8, 18, 32]


console.info('CASE names to uppercase')

var names = ['JacK', 'PetTeR', 'aNdrEW' ]

var normalizedName = map( names, function (name) { return name.toUpperCase() })

console.debug(names)

console.debug(normalizedName)
//['JACK', 'PETER', 'ANDREW']

console.info('CASE map elements and other arguments into objects')

var colors = ['red', 'green', 'blue', 'yellow']

var data = map(colors, function ( color, index, colors ) {
    var o = { color: color, index: index, colors: colors}

    return o
})

console.debug(data)
console.table(data)




