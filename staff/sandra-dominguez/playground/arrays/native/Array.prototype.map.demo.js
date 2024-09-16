console.info('CASO nums multiplicado por 2')


var nums = [1, 4, 9, 16]
var numsBy2 = nums.map(function(num) { return num * 2})


console.info('CASO nombres con toUpperCase')

var names = ['JaCk', 'pETer', 'jOHNnY']
var normalizedNames = names.map(function (name) { return name.toUpperCase() })


console.info('CASO asignar elementos y otros argumentos a objetos')

var colors = ['red', 'green', 'blue', 'yellow']

var data = colors.map(function(color, index, colors) {
    var o = {color: color, index: index, colors: colors}

    return o
})