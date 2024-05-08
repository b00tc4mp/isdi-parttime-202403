
Array.prototype.unshift = function () {

    var result = []

    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        result[result.length] = argument
    }
    for (var j = this.length - 1; j >= 0; j--) {
        var element = this[j]

        this[j + result.length] = element //['gato', <empty>, <empty>, 'gato', 'perro', 'loro', 'pez']
    }
    for (var k = 0; k < result.length; k++) {
        var element1 = result[k]

        this[k] = element1
    }


    return this.length
}

var animals = ['gato', 'perro', 'loro', 'pez']

var animalslength = animals.unshift('elefante', 'girafa', 'leon')

console.debug(animalslength)
// output 7

console.debug(animals)
//['elefante', 'girafa', 'leon', 'gato', 'perro', 'loro', 'pez']