//CASO te lo multicplica por dos y te pone las letras en mayuscula

function map(array, callback) {
    var mapped = []

    for(var i = 0; i < array.length; i++) {
        var element = array[i]
        var mappedElement = callback(element)

        mapped[i] = mappedElement
    }
    return mapped
    }

    var nums = [1, 4, 9, 16]
    var numsBy2 = map(nums, function(num) { return num * 2})
    console.debug(numsBy2)

    var names = ['JaCk', 'pETer', 'jOHNnY']  
    var normalizedNames = map(names, function (name) { return name.toUpperCase() })
    console.debug(names)
    console.debug(normalizedNames)




//CASO asignar elementos y otros argumentos a objetos

function map(array, callback) {
    var mapped = []

    for(var i = 0; i < array.length; i++) {
        var element = array[i]
        var mappedElement = callback(element, i, array)

        mapped[i] = mappedElement
    }
    return mapped
    }

var colors = ['red', 'green', 'blue', 'yellow']

var data = map(colors, function(color, index, colors) {
    var o = {color: color, index: index, colors: colors}

    return o
})

console.debug(data)
console.table(data)