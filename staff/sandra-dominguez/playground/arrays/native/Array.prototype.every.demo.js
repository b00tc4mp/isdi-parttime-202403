console.info('CASO comprovar numeros inferiores a 40')

var numbers = [1, 30, 39, 29, 10, 13]
var result = numbers.every(function (num) { return num < 40 })

console.assert(result === true)

//--------------------------------------------------------------

var numbers = [1, 30, 39, 29, 10, 13]

var result = numbers.every(function (num) {
    return num < 40;
})

console.assert(result === true)