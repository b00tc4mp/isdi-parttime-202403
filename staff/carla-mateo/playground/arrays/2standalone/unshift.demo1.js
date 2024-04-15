debugger

delete Array.prototype.unshift

var animals = ['gato', 'perro', 'loro', 'pez']

function unshift(array){

    var result = []

    for( var i = 1; i < arguments.length; i++) {
        var argument = arguments[i]

        result[result.length] = argument
    }
    for( var j = array.length-1; j >= 0; j--){
        var element = array[j]

        array[j + result.length] = element //['gato', <empty>, <empty>, 'gato', 'perro', 'loro', 'pez']
    }
    for(var k = 0; k < result.length; k++){
        var element1 = result[k]

        array[k] = element1
    }


    return array.length
}

var animalslength = unshift(animals, 'elefante', 'girafa', 'leon')

console.debug(animalslength)
// output 7

console.debug(animals)
//['elefante', 'girafa', 'leon', 'gato', 'perro', 'loro', 'pez']