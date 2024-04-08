var nums = [1, 4, 9, 16]

var numsBy2 = nums.map(function(num) { return num * 2})

console.log(numsBy2)


//CASO nombres con toUpperCase

var names = ['JaCk', 'pETer', 'jOHNnY']

var normalizedNames = names.map(function (name) { return name.toUpperCase() })

console.log(names)

console.log(normalizedNames)


//CASO asignar elementos y otros argumentos a objetos

var colors = ['red', 'green', 'blue', 'yellow']

var data = colors.map(function(color, index, colors) {
    var o = {color: color, index: index, colors: colors}

    return o
})

console.debug(data)
console.table(data)