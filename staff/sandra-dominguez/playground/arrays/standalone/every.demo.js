//CASO comprovar numeros inferiores a 40

function every(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        var matched = callback(element)

    }
    return matched
}


var numbers = [1, 30, 39, 29, 10, 13]

var result = numbers.every(function (num) {
    return num < 40;
})

console.log(result)
console.assert(result === true)