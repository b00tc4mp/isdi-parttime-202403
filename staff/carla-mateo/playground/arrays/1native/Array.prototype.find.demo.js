var numbers = [5, 12, 8, 130, 44]

var found = numbers.find(function (element) {
    return element > 10

})

console.log(found)

console.assert(found === 12, 'found is 12')
console.assert(numbers instanceof Array, 'numbers es un array')

var inventario = [
    { nombre: "manzanas", cantidad: 2 },
    { nombre: "bananas", cantidad: 0 },
    { nombre: "cerezas", cantidad: 5 },
]

function esCereza(fruta) {
    return fruta.nombre === "cerezas"
}

var result = inventario.find(esCereza)
console.log(result)

console.assert(inventario[0].nombre === 'manzanas', 'index 0 is manzanas')
console.assert(inventario[1].nombre === 'bananas', 'index 1 is bananas')
console.assert(inventario[2].nombre === 'cerezas', 'index 2 is cerezas')

console.assert(inventario[0].cantidad === 2, 'index 0 is 2')
console.assert(inventario[1].cantidad === 0, 'index 1 is 0')
console.assert(inventario[2].cantidad === 5, 'index 2 is 5')

console.assert(result.nombre === 'cerezas', 'name =  cerezas')
console.assert(result.cantidad === 5, 'cantidad = 5')
