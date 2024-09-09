delete Array.prototype.unshift


function unshift(array) {

    // array--> [1, 2, 3]
    // add--> [4]
    // if (element2 === undefined){
    // array[3] = array[2] // array--> [1, 2, 3, 3]
    // array[2] = array[1] // array--> [1, 2, 2, 3]
    // array[1] = array[0] // array--> [1, 1, 2, 3]
    // array[0] = element1
    // }else{
    // //array-->['David', 'Paul', 'Anna']
    // //add--> ['Andrea', 'Alex']
    // array[4] = array[2] // array--> ['David', 'Paul', 'Anna', <empty>, 'Anna']
    // array[3] = array[1] // array--> ['David', 'Paul', <empty>, 'Paul', 'Anna']
    // array[2] = array[0] // array--> ['David', <empty>, 'David' 'Paul', 'Anna']
    // array[1] = element1 // array--> [<empty>,'Andrea', 'David', 'Paul', 'Anna']
    // array[0] = element2// array--> ['Alex','Andrea', 'David', 'Paul', 'Anna']
    

    // }
    var result = []

    for( var i = 1; i < arguments.length; i++ ){
        var argument = arguments[i]
        
        result[result.length] = argument
        
        
    }

    for(var j = array.length-1 ; j >= 0; j--){
        var element = array[j]

        array[j + result.length] = element

    }

    for(var k = 0; k < result.length; k++){
        var elements = result[k]

        array[k] = elements
    }

    return array.length

}

console.info('CASE adds 1 element and returns the new length of the array.')

var numbers = [1, 2, 3]

var result = unshift(numbers, 4)

console.debug(result)
// Expected output: 4

console.debug(numbers);
// Expected output: Array [4, 1, 2, 3]


console.assert(result === 4, 'result is 4')
console.assert(numbers[0] === 4, 'index 0 is 4')


console.info('CASE adds 2 elements and returns the new length of the array.')

var names = ['David', 'Paul', 'Anna']

var result = unshift(names, 'Andrea', 'Alex')

console.debug(result)
// Expected output: 5

console.debug(names);
// Expected output: Array ['David', 'Paul', 'Anna', 'Andrea', 'Alex']
