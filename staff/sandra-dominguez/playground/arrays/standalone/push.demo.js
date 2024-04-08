//CASO añadir animal con array

var animals = ['pigs', 'goats', 'sheep']
var count = push(animals, 'cows')

function push(array, element) {  // lo que esta entre parentesis se le llama argumentos.
    array[array.length] = element

    return array.length
}

console.debug(count)
console.debug(animals)

//CASO añadir varios animales con array

var animals = ['pigs', 'goats', 'sheep', 'cows']
var count = push(animals, 'chickens', 'cats', 'dogs')

function push(array) {  // lo que esta entre parentesis se le llama argumentos.
    for (var i = 1; i < arguments.length; i++) {   // empezamos por 1, el 0 es el array.
        var argument = arguments[i]

        array[array.length] = argument
    }

    return array.length
}

console.debug(count)
console.debug(animals)