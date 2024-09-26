

debugger

function push(array) {
    for (var i = 1; i < arguments.length; i ++) {


        array[array.length] = arguments[i]

    }
    return array.length
}

var animals = ['pigs', 'goats', 'sheep'];

push(animals, 1, 2,3,4,5,6)

console.debug(animals)


