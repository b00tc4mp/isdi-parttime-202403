/* function forEach(array, callback) {
    (function loop(i) { // IIFE & closure
        if (i < array.length) {
            var element = array[i]

            callback(element)

            loop(i + 1)
        }
    })(0)
} */

// Refactorizamos la funcion usando el bucle for para optimizar la funcion forEach

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element,i,array)
        //añadimos que devuelva i y array tal y como lo hace el metodo original
    }
}

console.info('**CASE print chars to uppercase in console**')

var chars = ['a', 'b', 'c']

forEach(chars, function (element) {
    console.log(element.toUpperCase())
})

console.info('**CASE create objects with each iteration arguments**')

var cars = ['lambo', 'bugatti', 'ferrari']

var data = []

forEach(cars, function (car,index,cars) {
    var o = { car: car, index: index, cars: cars }

    data[data.length] = o  // de esta manera se actualiza el contador cada vez;

})

console.debug(data)
console.table(data)


/*
[
    { car: 'lambo', index: 0, cars: [ 'lambo', 'bugatti', 'ferrari' ] },
    { car: 'bugatti', index: 1, cars: [ 'lambo', 'bugatti', 'ferrari' ] },
    { car: 'ferrari', index: 2, cars: [ 'lambo', 'bugatti', 'ferrari' ] }
  ]
  ┌─────────┬───────────┬───────┬───────────────────────────────────┐
  │ (index) │ car       │ index │ cars                              │
  ├─────────┼───────────┼───────┼───────────────────────────────────┤
  │ 0       │ 'lambo'   │ 0     │ [ 'lambo', 'bugatti', 'ferrari' ] │
  │ 1       │ 'bugatti' │ 1     │ [ 'lambo', 'bugatti', 'ferrari' ] │
  │ 2       │ 'ferrari' │ 2     │ [ 'lambo', 'bugatti', 'ferrari' ] │
  └─────────┴───────────┴───────┴───────────────────────────────────┘
  */


// ------------------------------------------------------

// ARRAY METHODS


// push() : agregar un o varios elementos al final del arreglo          
// pop() : elimina y devuelve el ultimo elemento del arreglo                 
// shift(): quita y devuelve el primer elemento del arreglo                              
// unshift(): agrega uno o más elementos al principio del arreglo               
// splice(posicion donde comenzara a eliminar, cuantos elementos va a eliminar, elem1,elem2...)  
// slice(inicio , fin ) : extrae una porcion de los elementos del arrglo y los devuelve en un nuevo arrg
// indexOf(valor que buscamos): Devuelve la posición del valor dentro del arreglo, si no lo encuentra devuelve -1 
// lastIndexOf(): Busca el último elemento repetido en el arreglo
// filter(callback) : Crea un nuevo arreglo con todos los elementos que cumplan la condición implementada en la función
// sort(): Ordena el arreglo de acuerdo a las reglas establecidas por el comparador
// reverse(): Invierte el orden de los elementos del arreglo
// sort(): ordena los elementos en base a valores numericos o string        

// -----------------------------------------------

